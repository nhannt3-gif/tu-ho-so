# -*- coding: utf-8 -*-
"""3.93 — dựng khuôn Word (Mẫu 06/TD, Mẫu 16/TD) cho tab KTGS từ file mẫu GỐC (.docx trắng anh Nhân gửi).
Chạy:  python3 tools/khuon_docx.py <Mau06.docx> <Mau16.docx>   → in ra khối JS `var KT_KHUON = {...};` để dán vào index.html
Giữ nguyên 100% chữ / bố cục / phông / lề / đường kẻ (shape) của mẫu; chỉ:
  - bỏ thuộc tính rsid, proofErr, bookmark, w:lang, ảnh dự phòng VML (giữ bản DrawingML) — không hiện ra khi in;
  - bỏ trang 2 "MẪU THAM KHẢO CÁCH GHI CHÉP" của Mẫu 06;
  - thay dòng chấm của ô có số liệu bằng dấu {{KHOA|dòng chấm gốc}} (phần chấm nằm ở run sau: {{KHOA~|…}}) — app điền giá trị,
    trống thì trả lại đúng dòng chấm gốc ở đúng run (giữ nguyên định dạng, không xô dòng);
  - Mẫu 06: hàng tiêu đề bảng lặp lại khi sang trang, không cắt đôi dòng, dòng cuối + Cộng + nhận xét + chữ ký đi liền nhau.
Không có dữ liệu thật nào trong khuôn (mẫu trắng)."""
import re, sys, json, zipfile

def clean(x):
    x = re.sub(r' w:rsid\w*="[^"]*"', '', x)
    x = re.sub(r'<w:proofErr[^>]*/>', '', x)
    x = re.sub(r'<w:lang [^>]*/>', '', x)
    x = re.sub(r'<w:noProof/>', '', x)
    x = re.sub(r'<mc:AlternateContent[^>]*>\s*<mc:Choice[^>]*>((?:(?!<mc:AlternateContent).)*?)</mc:Choice>\s*<mc:Fallback[^>]*>.*?</mc:Fallback>\s*</mc:AlternateContent>', r'\1', x, flags=re.S)
    x = re.sub(r'<w:bookmark(Start|End)[^>]*/>', '', x)
    x = re.sub(r' wp14:(anchorId|editId)="[^"]*"', '', x)
    return x

def top(body):
    out = []; i = 0
    while True:
        m = re.compile(r'<(w:p|w:tbl|w:sectPr)[ >]').search(body, i)
        if not m: break
        tag = m.group(1); s = m.start(); d = 0; j = s
        pat = re.compile(r'<(/?)' + tag + r'([ >/])')
        while True:
            mm = pat.search(body, j); e = body.find('>', mm.start())
            if mm.group(1) == '':
                if body[e-1] == '/':
                    if d == 0: j = e+1; break
                else: d += 1
                j = e+1
            else:
                d -= 1; j = e+1
                if d == 0: break
        out.append([tag, body[s:j]]); i = j
    return out

T_RE = re.compile(r'(<w:t(?: [^>]*)?>)([^<]*)(</w:t>)')

def dien(p, truong):
    """truong = [(mốc regex, KHOA, regex dòng chấm)] theo thứ tự trong đoạn → thay dòng chấm bằng {{KHOA|chấm}}"""
    ts = list(T_RE.finditer(p)); S = ''.join(m.group(2) for m in ts)
    vt = []; o = 0
    for m in ts: vt.append((o, o+len(m.group(2)))); o += len(m.group(2))
    nhan = []; cur = 0
    for moc, khoa, cham in truong:
        a = re.compile(moc).search(S, cur)
        assert a, ('không thấy mốc', moc, S)
        b = re.compile(cham).match(S, a.end())
        assert b and b.end() > b.start(), ('không thấy dòng chấm sau', moc, S[a.end():a.end()+30])
        nhan.append((b.start(), b.end(), khoa)); cur = b.end()
    moi = [m.group(2) for m in ts]
    for s, e, khoa in reversed(nhan):
        dau = True
        for k in range(len(ts)-1, -1, -1):
            x0, x1 = vt[k]
            if x1 <= s or x0 >= e: continue
            a = max(s, x0) - x0; b = min(e, x1) - x0
            t = moi[k]
            if x0 <= s < x1: t = t[:a] + '{{' + khoa + '|' + S[x0+a:x0+b] + '}}' + t[b:]
            else: t = t[:a] + '{{' + khoa + '~|' + t[a:b] + '}}' + t[b:]   # phần chấm ở run sau: có giá trị thì bỏ, trống thì giữ đúng run gốc
            moi[k] = t
    r = []; last = 0
    for k, m in enumerate(ts):
        r.append(p[last:m.start()]); g = m.group(1)
        if 'xml:space' not in g: g = '<w:t xml:space="preserve">'
        r.append(g + moi[k] + m.group(3)); last = m.end()
    r.append(p[last:])
    return ''.join(r)

def them_ppr(p, the):
    """thêm thẻ (vd <w:keepNext/>) vào mọi pPr của đoạn / hàng (tạo pPr nếu chưa có) — đúng thứ tự lược đồ: ngay sau pStyle"""
    def mot(m):
        x = m.group(0)
        if the in x: return x
        if '<w:pPr/>' in x: return x.replace('<w:pPr/>', '<w:pPr>' + the + '</w:pPr>', 1)
        if '<w:pPr>' in x:
            ps = re.match(r'(<w:p(?: [^>]*)?><w:pPr>(?:<w:pStyle [^>]*/>)?)', x)
            if ps: return ps.group(1) + the + x[ps.end():]
            return x.replace('<w:pPr>', '<w:pPr>' + the, 1)
        return re.sub(r'^(<w:p(?: [^>]*)?>)', r'\1<w:pPr>' + the + '</w:pPr>', x)
    return re.sub(r'<w:p(?: [^>]*)?>(?:(?!<w:p[ >]).)*?</w:p>', mot, p, flags=re.S)

def them_trpr(r, the):
    if '<w:trPr>' in r: return r.replace('<w:trPr>', '<w:trPr>' + the, 1)
    return re.sub(r'^(<w:tr(?: [^>]*)?>)', r'\1<w:trPr>' + the + '</w:trPr>', r)

def o_trong(tc, khoa):
    """ô bảng trống → chèn run {{khoa|}} (định dạng chữ lấy theo dấu đoạn của ô)"""
    m = re.search(r'<w:pPr>.*?(<w:rPr>.*?</w:rPr>).*?</w:pPr>', tc, re.S)
    rpr = m.group(1) if m else ''
    i = tc.rfind('</w:p>')
    return tc[:i] + '<w:r>' + rpr + '<w:t xml:space="preserve">{{' + khoa + '|}}</w:t></w:r>' + tc[i:]

def goi(path):
    z = zipfile.ZipFile(path); f = {n: z.read(n).decode('utf8') for n in z.namelist() if n.endswith('.xml') or n.endswith('.rels')}
    d = f['word/document.xml']; b = d.find('<w:body>') + 8; e = d.find('</w:body>')
    return f, d[:b], clean(d[b:e])

def phan_phu(f):
    st = clean(f['word/styles.xml']); st = re.sub(r'<w:latentStyles.*?</w:latentStyles>', '', st, flags=re.S)
    se = clean(f['word/settings.xml']); se = re.sub(r'<w:rsids>.*?</w:rsids>', '', se, flags=re.S)
    se = re.sub(r'<w:attachedTemplate[^>]*/>', '', se)
    return {'styles': st, 'settings': se, 'fontTable': clean(f['word/fontTable.xml']), 'theme': f['word/theme/theme1.xml'],
            'header': clean(f['word/header1.xml']), 'footnotes': clean(f['word/footnotes.xml']), 'endnotes': clean(f['word/endnotes.xml'])}

CHAM = r'[.…]+'
def m06(path):
    f, mo, body = goi(path); T = top(body)
    i2 = [k for k, t in enumerate(T) if 'sectPr' in t[1]][0]   # hết trang 1 (đoạn mang sectPr của mục 1)
    T = T[:i2+1]
    # đoạn mang sectPr mục 1 → sectPr thật của tài liệu (cuối body)
    sect = re.search(r'<w:sectPr.*?</w:sectPr>', T[i2][1], re.S).group(0)
    # đoạn trống cuối (mang sectPr ở mẫu gốc) — Word bắt buộc có đoạn sau bảng; thu nhỏ 1 pt để không đẩy sang trang trắng khi bảng chạm đáy trang
    T[i2][1] = '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/><w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr></w:pPr></w:p>'
    # bảng đầu: Đơn vị kiểm tra
    T[0][1] = dien(T[0][1], [(r'Đơn vị kiểm tra: ', 'DV', CHAM)])
    T[1][1] = dien(T[1][1], [(r'1\. Ông \(bà\): ', 'CB1', CHAM), (r'hức vụ ', 'CV1', CHAM)])
    T[2][1] = dien(T[2][1], [(r'2\. Ông \(bà\): ', 'CB2', CHAM), (r'hức vụ ', 'CV2', CHAM)])
    T[3][1] = dien(T[3][1], [(r'Thời điểm kiểm tra: ', 'TD', CHAM), (r'ịa bàn kiểm tra: ', 'DB', CHAM), (r'Tổ TK&amp;VV: ', 'TO', CHAM)])
    for k in range(6, 12): T[k][1] = them_ppr(T[k][1], '<w:keepNext/>')
    T[12][1] = dien(T[12][1], [(r'Ngày ', 'ND', CHAM), (r' tháng ', 'NM', CHAM), (r' năm ', 'NY', CHAM)])
    T[12][1] = re.sub(r'<w:tr[ >].*?</w:tr>', lambda m: them_trpr(m.group(0), '<w:cantSplit/>'), T[12][1], flags=re.S)   # khối chữ ký không bị cắt ngang trang
    tb = T[5][1]; rows = list(re.finditer(r'<w:tr[ >].*?</w:tr>', tb, re.S))
    dau = tb[:rows[0].start()]
    hd = ''.join(them_trpr(r.group(0), '<w:cantSplit/><w:tblHeader/>') for r in rows[:3])
    def dong(r):
        cells = list(re.finditer(r'<w:tc>.*?</w:tc>', r, re.S)); out = r[:cells[0].start()]; last = cells[0].start()
        for c, m in enumerate(cells):
            out += r[last:m.start()]; out += o_trong(m.group(0), 'R%d' % (c+1)) if c < 7 else m.group(0); last = m.end()
        return them_trpr(out + r[last:], '<w:cantSplit/>')
    d0 = dong(rows[3].group(0))
    cong = rows[6].group(0); cc = list(re.finditer(r'<w:tc>.*?</w:tc>', cong, re.S))
    out = cong[:cc[0].start()]; last = cc[0].start()
    for c, m in enumerate(cc):
        out += cong[last:m.start()]; out += o_trong(m.group(0), {4: 'TGN', 5: 'TDN'}[c]) if c in (4, 5) else m.group(0); last = m.end()
    cong = them_ppr(them_trpr(out + cong[last:], '<w:cantSplit/>'), '<w:keepNext/>')
    cuoi = tb[rows[-1].end():]
    truoc = ''.join(t[1] for t in T[:5]) + dau + hd
    sau = cong + cuoi + ''.join(t[1] for t in T[6:])
    return dict(mo=mo, truoc=truoc, dong=d0, dongKN=them_ppr(d0, '<w:keepNext/>'), sau=sau, sect=sect, **phan_phu(f))

def m16(path):
    f, mo, body = goi(path); T = top(body)
    sect = T[-1][1]; T = T[:-1]
    T[6][1] = dien(T[6][1], [(r'ngày ', 'ND', r'[.…]+'), (r' tháng ', 'NM', CHAM), (r' năm 20', 'NY', CHAM),
                             (r'tổ dân phố ', 'THON', r'[.…]+'), (r'đặc khu ', 'XA', r'[.…]+'), (r'thành phố ', 'TINH', r'[.…]+')])
    T[7][1] = dien(T[7][1], [(r'ĐOÀN KIỂM TRA: ', 'DOAN', CHAM)])
    T[8][1] = dien(T[8][1], [(r'Ông \(bà\): ', 'CB1', CHAM), (r'Chức vụ: ', 'CV1', CHAM)])
    T[9][1] = dien(T[9][1], [(r'Ông \(bà\): ', 'CB2', CHAM), (r'Chức vụ: ', 'CV2', CHAM)])
    T[10][1] = dien(T[10][1], [(r'thuộc Hội ', 'HOI', CHAM)])
    T[11][1] = dien(T[11][1], [(r'Ông \(bà\): ', 'TT', CHAM)])
    T[14][1] = dien(T[14][1], [(r'thời điểm ', 'SD', CHAM), (r'/', 'SM', CHAM), (r'/20', 'SY', CHAM)])
    T[15][1] = dien(T[15][1], [(r'Tổ: ', 'DN', CHAM), (r', ', 'STV', CHAM), (r'hạn ', 'QH', CHAM), (r'tỷ lệ ', 'TLQH', r'[.…]+'),
                               (r'khoanh ', 'KN', CHAM), (r'tỷ lệ', 'TLKN', CHAM)])
    T[16][1] = dien(T[16][1], [(r'lãi tồn của Tổ: ', 'LT', CHAM)])
    T[17][1] = dien(T[17][1], [(r'của Tổ: ', 'TG', CHAM)])
    T[18][1] = dien(T[18][1], [(r'\(tháng ', 'XM', CHAM), (r'/20', 'XY', CHAM), (r'\): ', 'XL', CHAM)])
    T[25][1] = dien(T[25][1], [(r'thực tế tại ', 'SKH', CHAM)])
    T[32][1] = dien(T[32][1], [(r'này là ', 'SPH', CHAM)])
    for k in (32, 33): T[k][1] = them_ppr(T[k][1], '<w:keepNext/>')
    T[34][1] = re.sub(r'<w:tr[ >].*?</w:tr>', lambda m: them_trpr(m.group(0), '<w:cantSplit/>'), T[34][1], flags=re.S)
    return dict(mo=mo, than=''.join(t[1] for t in T), sect=sect, **phan_phu(f))

# ---------- 3.95: Mẫu 04/BC-TH (Báo cáo tổng hợp kết quả kiểm tra hoạt động nhận ủy thác cho vay) ----------
# Từ file mẫu gốc anh gửi (mẫu trắng). Giữ chữ / phông / lề / bảng / khung "Mẫu số 04/BC-TH" / đường kẻ của mẫu; chỉ:
#  - bỏ khung "MẪU THAM KHẢO";
#  - 2 dòng đầu (ĐƠN VỊ KIỂM TRA ↔ Quốc hiệu, căn bằng dấu cách) → bảng 2 cột không viền cùng vị trí, để điền tên đơn vị không xô dòng
#    (cột phải canh giữa đúng tâm đường kẻ dưới Quốc hiệu của mẫu);
#  - chèn dấu {{@...}} cho app bung: dòng chấm ghi tay (tab dẫn chấm hết dòng), dòng Đoàn kiểm tra, các dòng bảng mục II;
#  - VI.1 số phiếu → {{SP|chấm}}; hàng tiêu đề bảng lặp khi sang trang; khối Nơi nhận / Trưởng đoàn đi liền nhau.
W04 = 9213   # bề rộng vùng chữ (twip) = 11907 - 1560 - 1134

def cham04(rpr_sz='24'):
    return ('<w:p><w:pPr><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="%d"/></w:tabs><w:spacing w:before="0" w:after="0" w:line="440" w:lineRule="exact"/>'
            '<w:rPr><w:sz w:val="%s"/><w:szCs w:val="%s"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="%s"/><w:szCs w:val="%s"/></w:rPr><w:tab/></w:r></w:p>') % (W04, rpr_sz, rpr_sz, rpr_sz, rpr_sz)

def m04(path):
    f, mo, body = goi(path); T = top(body)
    tx = lambda x: ''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', x))
    assert 'Mẫu số 04/BC' in tx(T[0][1]) and 'BÁO CÁO TỔNG HỢP' in tx(T[4][1]) and T[10][0] == 'w:tbl', 'không đúng khuôn Mẫu 04/BC-TH'
    sect = T[-1][1]; T = T[:-1]
    # bỏ khung MẪU THAM KHẢO (run có drawing chứa chữ đó)
    T[3][1] = re.sub(r'<w:r>(?:(?!</w:r>).)*?<w:drawing>.*?</w:drawing></w:r>', lambda m: '' if 'MẪU THAM KHẢO' in m.group(0) else m.group(0), T[3][1], flags=re.S)
    assert 'MẪU THAM KHẢO' not in T[3][1]
    # 2 dòng đầu → bảng 2 cột (trái 3341 twip: tâm cột phải = tâm đường kẻ dưới Quốc hiệu 4650 + 3255/2 ≈ 6277)
    L = 3341; R = W04 - L
    def o(w, ps):
        return '<w:tc><w:tcPr><w:tcW w:w="%d" w:type="dxa"/></w:tcPr>%s</w:tc>' % (w, ''.join(ps))
    def pc(txt, sz='26', b=True):
        rp = '<w:rPr>' + ('<w:b/><w:bCs/>' if b else '') + '<w:sz w:val="%s"/><w:szCs w:val="%s"/></w:rPr>' % (sz, sz)
        return '<w:p><w:pPr><w:spacing w:before="0" w:after="0"/><w:jc w:val="center"/>' + rp + '</w:pPr><w:r>' + rp + '<w:t xml:space="preserve">' + txt + '</w:t></w:r></w:p>'
    bang = ('<w:tbl><w:tblPr><w:tblW w:w="%d" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar>'
            '<w:tblLook w:val="0000" w:firstRow="0" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="0"/></w:tblPr>'
            '<w:tblGrid><w:gridCol w:w="%d"/><w:gridCol w:w="%d"/></w:tblGrid><w:tr>' % (W04, L, R) +
            o(L, [pc('ĐƠN VỊ KIỂM TRA'), pc('{{DV|........................................}}')]) +
            o(R, [pc('CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM'), pc('Độc lập - Tự do - Hạnh phúc', '27')]) + '</w:tr></w:tbl>')
    assert 'ĐƠN VỊ KIỂM TRA' in tx(T[1][1]) and 'Độc lập' in tx(T[2][1])
    T[1][1] = bang; T[2][1] = ''
    C = cham04()
    chu = re.sub(r'<w:r>.*</w:r>', '<w:r><w:rPr><w:bCs/><w:sz w:val="27"/><w:szCs w:val="27"/></w:rPr><w:t xml:space="preserve">{{X|}}</w:t></w:r>', T[7][1], flags=re.S)
    chu = re.sub(r' w14:(paraId|textId)="[^"]*"', '', chu)
    T[7][1] += '{{@DOAN}}'          # I.1 Đoàn kiểm tra: các dòng khai báo + dòng chấm cho đủ 4
    T[8][1] += '{{@CHAM2}}'         # I.2 Cấp ủy, chính quyền: 2 dòng
    # bảng II: tiêu đề lặp khi sang trang; 2 dòng trống mẫu → 1 dòng khuôn {{@DONG}}
    tb = T[10][1]; rows = list(re.finditer(r'<w:tr[ >].*?</w:tr>', tb, re.S))
    hd = them_trpr(rows[0].group(0), '<w:cantSplit/><w:tblHeader/>')
    d = rows[1].group(0); cells = list(re.finditer(r'<w:tc>.*?</w:tc>', d, re.S))
    dd = d[:cells[0].start()]; last = cells[0].start()
    for c, m in enumerate(cells):
        x = m.group(0).replace('<w:jc w:val="both"/>', '<w:jc w:val="%s"/>' % ('center' if c < 2 else 'left')).replace('w:val="27"', 'w:val="26"')
        dd += d[last:m.start()] + o_trong(x, 'C%d' % (c+1)); last = m.end()
    dd = them_trpr(dd + d[last:], '<w:cantSplit/>').replace('<w:trHeight w:val="275"/>', '<w:trHeight w:val="567" w:hRule="atLeast"/>')
    T[10][1] = tb[:rows[0].start()] + hd + '{{@DONG}}' + tb[rows[-1].end():]
    DONG = dd
    # III: 1… 2… + 2 dòng chấm (4 dòng)
    for k, so in ((12, '1.'), (13, '2.')):
        T[k][1] = re.sub(r'<w:pPr>', '<w:pPr><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="%d"/></w:tabs>' % W04, T[k][1], count=1)
        T[k][1] = re.sub(r'<w:t>%s\.+</w:t>' % re.escape(so[0]), '<w:t>%s</w:t></w:r><w:r><w:rPr><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:tab/>' % so, T[k][1])
        assert '<w:tab/>' in T[k][1], k
    T[14][1] = '{{@CHAM2}}'
    # IV: mỗi mục a) b) … 3 dòng chấm
    for k in list(range(17, 20)) + list(range(21, 26)) + [27, 28]:
        assert re.match(r'^[a-dđ]\)', tx(T[k][1])), (k, tx(T[k][1]))
        T[k][1] += '{{@CHAM3}}'
    # VI.1 số phiếu
    T[30][1] = dien(T[30][1], [(r'/TD\):', 'SP', r'\.+')])
    for k in range(29, 34): T[k][1] = them_ppr(T[k][1], '<w:keepNext/>')
    than = ''.join(t[1] for t in T)
    than = re.sub(r' w14:(paraId|textId)="[^"]*"', '', than)
    return dict(mo=mo, than=than, dong=DONG, cham=C, chu=chu, sect=sect, **phan_phu(f))

# ---------- 3.96: Kế hoạch KTGS năm của Hội cấp xã (01/KH) — khuôn = DỰ THẢO HĐT cấp xã anh gửi (.doc → .docx bằng LibreOffice, mẫu trắng) ----------
# Anh chốt: căn cứ đổi sang 727/HD-NHCS 11/02/2026 · chỉ ghi 90% (Gò Dầu không thuộc vùng khó khăn) · bỏ khung "MẪU THAM KHẢO HĐT CẤP XÃ" ·
# ngày lập để trống · không ghi số hộ cụ thể · khổ A4 · chữ đỏ / tô vàng của dự thảo → đen.
# Dấu {{…}}: HT (Hội tỉnh, in hoa) HX (Hội xã, in hoa) NOI (nơi lập) NAM NT (năm trước) TU DEN (tháng) KH KHN (kế hoạch Hội tỉnh) HOIT (Hội … tỉnh)
#   HD HDN (hợp đồng ủy thác) NH (NHCSXH …) HXT (Hội … xã …) HOI1 (Hội …) CT (CHỦ TỊCH …) KY (người ký) · {{@DOAN}} {{@LICH}}.
def thay(p, cap):
    """cap = [(chuỗi cũ, chuỗi mới)] theo thứ tự trong đoạn → thay trên chữ nối các run (giữ định dạng run đầu)"""
    ts = list(T_RE.finditer(p)); S = ''.join(m.group(2) for m in ts)
    vt = []; o = 0
    for m in ts: vt.append((o, o+len(m.group(2)))); o += len(m.group(2))
    nhan = []; cur = 0
    for cu, moi in cap:
        a = S.find(cu, cur); assert a >= 0, ('không thấy', cu, S)
        nhan.append((a, a+len(cu), moi)); cur = a+len(cu)
    moi_t = [m.group(2) for m in ts]
    for s0, e0, moi in reversed(nhan):
        for k in range(len(ts)-1, -1, -1):
            x0, x1 = vt[k]
            if x1 <= s0 or x0 >= e0: continue
            a = max(s0, x0) - x0; b = min(e0, x1) - x0
            moi_t[k] = moi_t[k][:a] + (moi if x0 <= s0 < x1 else '') + moi_t[k][b:]
    r = []; last = 0
    for k, m in enumerate(ts):
        r.append(p[last:m.start()]); g = m.group(1)
        if 'xml:space' not in g: g = '<w:t xml:space="preserve">'
        r.append(g + moi_t[k] + m.group(3)); last = m.end()
    r.append(p[last:])
    return ''.join(r)

def m01(path):
    z = zipfile.ZipFile(path); f = {n: z.read(n).decode('utf8') for n in z.namelist() if n.endswith('.xml') or n.endswith('.rels')}
    d = f['word/document.xml']; b = d.find('<w:body>') + 8; e = d.find('</w:body>')
    mo = d[:b]; body = clean(d[b:e])
    body = re.sub(r'<w:highlight [^>]*/>', '', body)
    body = re.sub(r'<w:color w:val="(?!000000)[0-9A-Fa-f]{6}"/>', '<w:color w:val="000000"/>', body)
    T = top(body)
    tx = lambda x: ''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', x))
    assert 'MẪU THAM KHẢO HĐT' in tx(T[0][1]) and 'KẾ HOẠCH' == tx(T[1][1]) and T[25][0] == 'w:tbl', 'không đúng khuôn dự thảo kế hoạch HĐT cấp xã'
    sect = T[-1][1]; T = T[:-1]
    sect = sect.replace('<w:pgSz w:w="12240" w:h="15840"/>', '<w:pgSz w:w="11907" w:h="16840"/>').replace('r:id="rId2"', 'r:id="rId11"')
    # đầu trang
    h = re.sub(r'<w:r>(?:(?!</w:r>).)*?<w:drawing>.*?</w:drawing></w:r>', lambda m: '' if 'MẪU THAM KHẢO' in m.group(0) else m.group(0), T[0][1], flags=re.S)
    assert 'MẪU THAM KHẢO' not in h
    # đường kẻ dưới tên Hội xã: dời sang đầu dòng "Số:" (đặt ngay trên dòng đó) để tên Hội dài xuống 2 dòng vẫn kẻ dưới đúng chỗ
    ps = list(re.finditer(r'<w:p>.*?</w:p>', h, re.S)); iHX = [i for i, m in enumerate(ps) if 'HỘI………XÃ' in m.group(0)][0]; iSo = iHX+1
    assert 'Số:' in ps[iSo].group(0)
    ke = re.search(r'<w:r><w:drawing>.*?</w:drawing></w:r>', ps[iHX].group(0), re.S).group(0)
    ke2 = re.sub(r'(<wp:positionV relativeFrom="paragraph"><wp:posOffset>)-?\d+', r'\g<1>10000', ke)
    pHX = ps[iHX].group(0).replace(ke, ''); pSo = ps[iSo].group(0).replace('</w:pPr>', '</w:pPr>'+ke2, 1)
    h = h[:ps[iHX].start()] + pHX + h[ps[iHX].end():ps[iSo].start()] + pSo + h[ps[iSo].end():]
    h = thay(h, [('HỘI………TỈNH TÂY NINH', '{{HT|HỘI………TỈNH TÂY NINH}}'), ('HỘI………XÃ……….', '{{HX|HỘI………XÃ……….}}'),
                 ('   …………, ngày     tháng  01  năm 2026', '   {{NOI|…………}}, ngày      tháng      năm {{NAM|2026}}')])
    T[0][1] = h
    T[3][1] = thay(T[3][1], [('CỦA HỘI…………XÃ………. TỈNH TÂY NINH NĂM 2026', 'CỦA {{HX|HỘI…………XÃ……….}} TỈNH TÂY NINH NĂM {{NAM|2026}}')])
    T[5][1] = thay(T[5][1], [('hướng dẫn 10566/HD-NHCS ngày 29/12/2022 của Tổng Giám đốc NHCSXH về việc hướng dẫn quy trình, phương pháp kiểm tra, giám sát hoạt động ủy thác cho vay;',
                              'văn bản số 727/HD-NHCS ngày 11/02/2026 của Tổng Giám đốc NHCSXH hướng dẫn phương pháp, quy trình kiểm tra, giám sát hoạt động ủy thác;')])
    T[6][1] = thay(T[6][1], [('số………, ngày ……. của Hội……… tỉnh Tây Ninh;', 'số {{KH|………}}, ngày {{KHN|…….}} của {{HOIT|Hội………}} tỉnh Tây Ninh;')])
    T[7][1] = thay(T[7][1], [('số…..../HĐUT ngày …/…/…. giữa NHCSXH ….. với Hội……..xã…….., tỉnh', 'số {{HD|…..../HĐUT}} ngày {{HDN|…/…/….}} giữa NHCSXH {{NH|…..}} với {{HXT|Hội……..xã……..}}, tỉnh'),
                             ('hội ……….xã ……. tỉnh Tây Ninh xây dựng Kế hoạch kiểm tra, giám sát hoạt động nhận ủy thác năm 2026', '{{HXT|hội ……….xã …….}} tỉnh Tây Ninh xây dựng Kế hoạch kiểm tra, giám sát hoạt động nhận ủy thác năm {{NAM|2026}}')])
    T[13][1] = thay(T[13][1], [('thuộc Hội……quản lý.', 'thuộc {{HOI1|Hội……}} quản lý.')])
    S16 = tx(T[16][1]); a = S16.index('tối thiểu 75%'); b2 = S16.index('khó khăn.', S16.index('tối thiểu 90%')) + len('khó khăn.')
    T[16][1] = thay(T[16][1], [(S16[a:b2], 'tối thiểu 90% khoản vay đang còn dư nợ được giải ngân từ các năm trước.')])
    # II.1 thành phần: 3 dòng "-" → {{@DOAN}}
    assert [tx(T[k][1]) for k in (19, 20, 21)] == ['-', '-', '-']
    chu = thay(T[19][1], [('-', '- {{X|}}')])
    cham = re.sub(r'<w:pPr>', '<w:pPr><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9355"/></w:tabs>', T[19][1], count=1).replace('<w:t>-</w:t>', '<w:t xml:space="preserve">- </w:t><w:tab/>')
    T[19][1] = '{{@DOAN}}'; T[20][1] = ''; T[21][1] = ''
    T[22][1] = thay(T[22][1], [('Năm 2025', 'Năm {{NT|2025}}')])
    T[23][1] = thay(T[23][1], [('từ tháng 02/2026 đến tháng 10/2026.', 'từ tháng {{TU|02/2026}} đến tháng {{DEN|10/2026}}.')])
    T[24][1] = thay(T[24][1], [('CỦA HỘI………XÃ…….…NĂM 2026', 'CỦA {{HX|HỘI………XÃ…….…}} NĂM {{NAM|2026}}')])
    # bảng lịch: tiêu đề lặp + 1 dòng khuôn
    tb = T[25][1]; rows = list(re.finditer(r'<w:tr[ >].*?</w:tr>', tb, re.S))
    hd = them_trpr(rows[0].group(0).replace('<w:trPr></w:trPr>', ''), '<w:cantSplit/><w:tblHeader/>')
    d = rows[1].group(0).replace('<w:trPr></w:trPr>', '')
    d = thay(d, [('02', '{{L1|}}'), ('Tổ.....', '{{L2|}}'), ('90% món vay', '{{L3|}}')])
    d = them_trpr(d, '<w:cantSplit/>').replace('<w:jc w:val="both"/>', '<w:jc w:val="left"/>')
    T[25][1] = tb[:rows[0].start()] + hd + '{{@LICH}}' + tb[rows[-1].end():]
    T[73][1] = thay(T[73][1], [('năm 2026', 'năm {{NAM|2026}}'), ('Hội……..xã………….tỉnh', '{{HXT|Hội……..xã………….}} tỉnh')])
    # ký: bỏ đánh số tự động (chữ đã có "- "), CHỦ TỊCH …, bớt đoạn trống thừa (dự thảo dư → trang trắng), thêm dòng tên người ký
    k = T[74][1]
    k = re.sub(r'<w:numPr>.*?</w:numPr>', '', k, flags=re.S).replace('<w:pStyle w:val="ListParagraph"/>', '<w:pStyle w:val="Normal"/>').replace('<w:ind w:hanging="284" w:start="0" w:end="0"/>', '')
    k = thay(k, [('CHỦ TỊCH HỘI.........', '{{CT|CHỦ TỊCH HỘI.........}}')])
    cells = list(re.finditer(r'<w:tc>.*?</w:tc>', k, re.S)); c2 = cells[1].group(0)
    ps = list(re.finditer(r'<w:p>.*?</w:p>', c2, re.S)); i_ct = [i for i, m in enumerate(ps) if '{{CT|' in m.group(0)][0]
    trong = ps[i_ct+1].group(0)
    ky = trong.replace('</w:rPr></w:r>', '</w:rPr><w:t xml:space="preserve">{{KY|}}</w:t></w:r>', 1)
    c2m = c2[:ps[i_ct].end()] + trong*4 + ky + c2[ps[-1].end():]
    k = k[:cells[1].start()] + c2m + k[cells[1].end():]
    k = re.sub(r'<w:tr>', '<w:tr><w:trPr><w:cantSplit/></w:trPr>', k, count=1) if '<w:trPr>' not in k else re.sub(r'(<w:tr>)<w:trPr>', r'\1<w:trPr><w:cantSplit/>', k, count=1)
    T[74][1] = k
    T[73][1] = them_ppr(T[73][1], '<w:keepNext/>')
    than = ''.join(t[1] for t in T)
    return dict(mo=mo, than=than, dong=d, chu=chu, cham=cham, sect=sect,
                styles=clean(f['word/styles.xml']), settings=f['word/settings.xml'], fontTable=clean(f['word/fontTable.xml']),
                theme=f['word/theme/theme1.xml'], footer=clean(f['word/footer1.xml']), header=None, footnotes=None, endnotes=None)

if __name__ == '__main__':
    if sys.argv[1] == 'm04':   # 3.95: python3 tools/khuon_docx.py m04 <Mau04.docx> → khối JS KT_KHUON.m04 = {...};
        print('/* 3.95: khuôn Word Mẫu 04/BC-TH — dựng từ file mẫu gốc bằng tools/khuon_docx.py m04 (mẫu trắng, không có dữ liệu thật) */')
        print('KT_KHUON.m04 = ' + json.dumps(m04(sys.argv[2]), ensure_ascii=False, separators=(',', ':')) + ';')
        sys.exit(0)
    if sys.argv[1] == 'm01':   # 3.96: python3 tools/khuon_docx.py m01 <Du_thao_KH.docx> (bản .doc → .docx bằng LibreOffice) → KT_KHUON.m01 = {...};
        print('/* 3.96: khuôn Word Kế hoạch KTGS năm (01/KH) — dựng từ dự thảo HĐT cấp xã bằng tools/khuon_docx.py m01 (mẫu trắng, không có dữ liệu thật) */')
        print('KT_KHUON.m01 = ' + json.dumps(m01(sys.argv[2]), ensure_ascii=False, separators=(',', ':')) + ';')
        sys.exit(0)
    K = {'m06': m06(sys.argv[1]), 'm16': m16(sys.argv[2])}
    chung = {}
    for k in list(K['m06'].keys()):   # phần giống hệt nhau giữa 2 mẫu thì dùng chung
        if k in K['m16'] and K['m06'][k] == K['m16'][k]: chung[k] = K['m06'].pop(k); K['m16'].pop(k)
    K['chung'] = chung
    print('/* 3.93: khuôn Word Mẫu 06/TD, 16/TD — dựng từ file mẫu gốc bằng tools/khuon_docx.py (mẫu trắng, không có dữ liệu thật) */')
    print('var KT_KHUON = ' + json.dumps(K, ensure_ascii=False, separators=(',', ':')) + ';')
