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

if __name__ == '__main__':
    K = {'m06': m06(sys.argv[1]), 'm16': m16(sys.argv[2])}
    chung = {}
    for k in list(K['m06'].keys()):   # phần giống hệt nhau giữa 2 mẫu thì dùng chung
        if k in K['m16'] and K['m06'][k] == K['m16'][k]: chung[k] = K['m06'].pop(k); K['m16'].pop(k)
    K['chung'] = chung
    print('/* 3.93: khuôn Word Mẫu 06/TD, 16/TD — dựng từ file mẫu gốc bằng tools/khuon_docx.py (mẫu trắng, không có dữ liệu thật) */')
    print('var KT_KHUON = ' + json.dumps(K, ensure_ascii=False, separators=(',', ':')) + ';')
