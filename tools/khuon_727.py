# -*- coding: utf-8 -*-
"""3.498 — khuôn Word KTGS cho 2 mẫu VB 727/HD-NHCS (anh 07/11/2026: "Word dùng khuôn từ file gốc"):
  15/TD  Danh sách đối chiếu số dư tiền vay và tiền gửi   (tests/mau_goc/15td.docx)
  03/BB-CX Biên bản kiểm tra hoạt động nhận ủy thác của tổ chức CT-XH cấp xã (tests/mau_goc/03bbcx.docx — anh chốt sửa IV → III, V → IV)
Chạy:  python3 tools/khuon_727.py > js/khuon/kt727.js   (3.503: khung MAU_IN — js/31b)
Dùng lại hàm của tools/khuon_docx.py: clean, top, dien ({{KHOA|chấm gốc}}), o_trong, phan_phu, goi. Mẫu trắng — không có dữ liệu thật
(15/TD: bỏ 7 dòng ví dụ "Nguyễn Văn A…" của mẫu, giữ dòng khuôn để app sinh dòng theo số liệu)."""
import re, sys, json
sys.path.insert(0, 'tools')
import khuon_docx as K

CH = K.CHAM
ROW = re.compile(r'<w:tr[ >].*?</w:tr>', re.S)
TC = re.compile(r'<w:tc>.*?</w:tc>', re.S)

def o_xoa(tc, khoa):
    """ô bảng → bỏ hết chữ, chèn {{khoa|}} theo định dạng run đầu tiên (hoặc dấu đoạn)"""
    m = re.search(r'<w:r>(?:(?!</w:r>).)*?(<w:rPr>.*?</w:rPr>)', tc, re.S)
    tc2 = re.sub(r'<w:r>(?:(?!</w:r>).)*?</w:r>', '', tc, flags=re.S)
    tc2 = re.sub(r'<w:r [^>]*>(?:(?!</w:r>).)*?</w:r>', '', tc2, flags=re.S)
    if m:
        i = tc2.rfind('</w:p>'); return tc2[:i] + '<w:r>' + m.group(1) + '<w:t xml:space="preserve">{{' + khoa + '|}}</w:t></w:r>' + tc2[i:]
    return K.o_trong(tc2, khoa)

def dong_khuon(r, ten):
    cs = TC.findall(r); out = r
    for j, c in enumerate(cs):
        c2 = o_xoa(c, ten + str(j))
        if 2 <= j <= 12:                                # cột số / mã khoản vay: nợ gốc 10 pt, mã + cột hẹp 9 pt cho số tiền không bị ngắt dòng
            z = '20' if j == 3 else '18'; c2 = c2.replace('<w:sz w:val="24"/>', '<w:sz w:val="%s"/>' % z).replace('<w:szCs w:val="24"/>', '<w:szCs w:val="%s"/>' % z)
        out = out.replace(c, c2, 1)
    return out

def m15(path):
    f, mo, body = K.goi(path); T = K.top(body)
    sect = T[-1][1]; T = T[:-1]
    T[0][1] = K.dien(T[0][1], [(r'PHÒNG GIAO DỊCH NHCSXH', 'PGD', CH), (r'Xã', 'XA', CH), (r'Hội', 'HOI', CH)])
    T[2][1] = K.dien(T[2][1], [(r'Đến ngày ', 'DEN', r'[.…]+/[.…]+/[.…]+')])
    T[4][1] = K.dien(T[4][1], [(r'Tổ trưởng:', 'TT', CH), (r'Mã Tổ:', 'MATO', CH), (r'Địa chỉ:', 'DC', CH)])
    tb = T[6][1]; rs = ROW.findall(tb)
    assert len(rs) == 11, len(rs)
    dau = tb[:tb.find(rs[3])]                       # tblPr + 3 hàng tiêu đề (lặp mỗi trang)
    def lap(m):                                     # hàng tiêu đề → <w:tblHeader/> (lặp đầu mỗi trang)
        a = m.group(1)
        if '<w:tblHeader/>' not in a:
            a = a.replace('<w:trPr>', '<w:trPr><w:tblHeader/>', 1) if '<w:trPr>' in a else re.sub(r'^(<w:tr(?: [^>]*)?>)', r'\1<w:trPr><w:tblHeader/></w:trPr>', a)
        return a + m.group(2)
    dau = re.sub(r'(<w:tr[ >](?:(?!</w:tr>).)*?)(<w:tc>)', lap, dau, flags=re.S)
    kh = dong_khuon(rs[3], 'K'); ct = dong_khuon(rs[4], 'C'); tong = dong_khuon(rs[10], 'T')
    cuoi = tb[tb.find(rs[10]) + len(rs[10]):]
    truoc = ''.join(x for _, x in T[:6])
    sau = cuoi + ''.join(x for _, x in T[7:])
    r = {'mo': mo, 'truoc': truoc + dau, 'dongK': kh, 'dongC': ct, 'tong': tong, 'sau': sau, 'sect': sect}
    r.update(K.phan_phu(f)); return r

def cx03(path):
    f, mo, body = K.goi(path); T = K.top(body)
    sect = T[-1][1]; T = T[:-1]
    tx = lambda x: ''.join(m[1] for m in K.T_RE.findall(x))
    def tim(s, bat=0):
        for i in range(bat, len(T)):
            if s in tx(T[i][1]): return i
        raise AssertionError(s)
    i = tim('Độc lập - Tự do'); T[i][1] = K.dien(T[i][1], [(r'^', 'DVKT', CH)])
    i = tim('Hôm nay, ngày'); T[i][1] = K.dien(T[i][1], [(r'ngày ', 'NG', r'[.…]+'), (r'tháng ', 'TH', r'[.…]+'), (r'năm ', 'NAM', r'20[.…]+')])
    i = tim('ĐOÀN KIỂM TRA:'); T[i][1] = K.dien(T[i][1], [(r'ĐOÀN KIỂM TRA: ?', 'DOAN', CH)])
    T[i+1][1] = K.dien(T[i+1][1], [(r'Ông \(bà\): ?', 'CB1', CH), (r'Chức vụ: ?', 'CV1', CH)])
    T[i+2][1] = K.dien(T[i+2][1], [(r'Ông \(bà\): ?', 'CB2', CH), (r'Chức vụ: ?', 'CV2', CH)])
    i = tim('ĐƠN VỊ ĐƯỢC KIỂM TRA:'); T[i][1] = K.dien(T[i][1], [(r'Hội ?', 'HOI', CH), (r'xã ?', 'XA', CH)])
    T[i+1][1] = K.dien(T[i+1][1], [(r'Ông \(bà\): ?', 'HB1', CH), (r'Chức vụ: ?', 'HV1', CH)])
    T[i+2][1] = K.dien(T[i+2][1], [(r'Ông \(bà\): ?', 'HB2', CH), (r'Chức vụ: ?', 'HV2', CH)])
    i = tim('Cùng tiến hành'); T[i][1] = K.dien(T[i][1], [(r'của Hội', 'HOIXA', r'[.…]+ ?xã/phường/đặc khu')])
    i = tim('KẾT QUẢ HOẠT ĐỘNG ỦY THÁC'); T[i][1] = K.dien(T[i][1], [(r'thời điểm ', 'TDIEM', r'[.…]+/[.…]+/20[.…]+')])
    i = tim('Tổng số Tổ TK'); T[i][1] = K.dien(T[i][1], [(r'quản lý: ?', 'STO', CH), (r'tại ', 'STH1', CH), (r'/', 'STH2', CH)])
    i = tim('Tổng số khách hàng'); T[i][1] = K.dien(T[i][1], [(r'quản lý: ', 'SKH', CH)])
    i = tim('Tổng dư nợ nhận'); T[i][1] = K.dien(T[i][1], [(r'quản lý: ', 'DN', CH)])
    i = tim('Trong đó: Nợ quá hạn'); T[i][1] = K.dien(T[i][1], [(r'Nợ quá hạn', 'NQH', CH), (r'tỷ lệ', 'TLQH', CH), (r'Nợ khoanh', 'NK', CH), (r'tỷ lệ', 'TLNK', CH)])
    # bảng chấm điểm: hàng 2 = Hội (khai tay), hàng 3 = Tổ TK&VV (theo BC0437)
    i = tim('Trung bình'); tb = T[i][1]; rs = ROW.findall(tb)
    for r, ten in ((rs[1], 'H'), (rs[2], 'X')):
        cs = TC.findall(r); r2 = r
        for j, c in enumerate(cs[1:]): r2 = r2.replace(c, K.o_trong(c, ten + str(j)), 1)
        tb = tb.replace(r, r2, 1)
    T[i][1] = tb
    # anh chốt 07/11: mẫu gốc thiếu mục III → IV thành III, V thành IV
    for cu, moi in (('IV. ĐÁNH GIÁ', 'III. ĐÁNH GIÁ'), ('V. Ý KIẾN', 'IV. Ý KIẾN')):
        i = tim(cu.split('. ')[1]); x = T[i][1]; a = cu.split('. ')[0] + '.'; b = moi.split('. ')[0] + '.'
        m = re.search(r'(<w:t(?: [^>]*)?>)' + re.escape(a), x); assert m, cu
        T[i][1] = x[:m.start()] + m.group(1) + b + x[m.end():]
    i = tim('Qua kiểm tra tại'); T[i][1] = K.dien(T[i][1], [(r'cấp xã, ', 'SOTOKT', r'[.…]+'), (r'TK&amp;VV \(', 'TOKT', CH), (r'và ', 'SOKHKT', r'[.…]+')])
    i = tim('Kèm theo Biên bản'); T[i][1] = K.dien(T[i][1], [(r'là ', 'SBB16', r'[.…]+'), (r'và ', 'SP06', r'[.…]+')])
    r = {'mo': mo, 'than': ''.join(x for _, x in T), 'sect': sect}
    r.update(K.phan_phu(f)); return r

if __name__ == '__main__':
    a = m15('tests/mau_goc/15td.docx'); b = cx03('tests/mau_goc/03bbcx.docx')
    print('/* 3.498 · 3.503 — khuôn Word VB 727: 15/TD · 03/BB-CX — dựng bằng tools/khuon_727.py từ tests/mau_goc (mẫu trắng, không dữ liệu thật). Nạp khi cần qua khung MAU_IN.khuon(\'kt727\') (js/31b). */')
    print('window.MAU_KHUON = window.MAU_KHUON || {};')
    print('MAU_KHUON.kt727 = {m15: ' + json.dumps(a, ensure_ascii=False) + ', cx03: ' + json.dumps(b, ensure_ascii=False) + '};')   # 1 dòng dữ liệu (thước đo dòng >400)
