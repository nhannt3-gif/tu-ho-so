#!/usr/bin/env python3
"""Sinh docs/COT_FILE_MAU.md — từ điển tên cột các file hệ thống (anh 26/10: "các tên cột của Mẫu 31 và các mẫu em luôn lưu trong code để suy luận khi cần, không cần nạp lại file").
Nguồn tên cột: file GIẢ trong tests/ (giữ đúng khuôn cột file thật, không dữ liệu thật) + dòng tên cột dựng trong phép thử.
Cột → trường app: so khớp tên cột đã chuẩn hóa (slChuan) với SL_TRUONG (js/22-so-lieu.js) — trùng hẳn mới nhận;
Mẫu 31 (giuHet) giữ cả cột chưa khai báo dưới tên c_<tên chuẩn> (vd "Thu lãi TH tháng" → c_thu_lai_th_thang), nên KHÔNG cần nạp lại file khi dùng thêm cột.
Chạy: python3 tools/cot_mau.py"""
import re, os, zipfile, html, unicodedata, glob
G = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def bo_dau(s):
    s = unicodedata.normalize('NFD', str(s).replace('đ', 'd').replace('Đ', 'D'))
    return ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower()
def chuan(s): return re.sub(r'[^a-z0-9]+', ' ', bo_dau(s)).strip()

js = open(os.path.join(G, 'js/22-so-lieu.js'), encoding='utf8').read()
i = js.index('var SL_TRUONG = {'); j = js.index('\n};', i)
TRUONG = {}
for k, a in re.findall(r"(\w+):\{a:\[([^\]]*)\]", js[i:j]):
    for x in re.findall(r"'([^']*)'", a): TRUONG.setdefault(x, k)

def doc_xlsx(p):
    z = zipfile.ZipFile(p); ss = []
    if 'xl/sharedStrings.xml' in z.namelist():
        ss = [html.unescape(''.join(re.findall(r'<t[^>]*>([^<]*)</t>', si))) for si in re.findall(r'<si>(.*?)</si>', z.read('xl/sharedStrings.xml').decode('utf8'), re.S)]
    s = z.read('xl/worksheets/sheet1.xml').decode('utf8')
    for r in re.findall(r'<row[^>]*>(.*?)</row>', s, re.S)[:30]:
        o = []
        for c in re.findall(r'<c [^>]*?(?:/>|>.*?</c>)', r, re.S):
            t = re.search(r't="(\w+)"', c); v = re.search(r'<v>([^<]*)</v>', c); it = re.search(r'<is><t[^>]*>([^<]*)</t></is>', c)
            o.append(html.unescape(it.group(1)) if it else (ss[int(v.group(1))] if t and t.group(1) == 's' and v else (v.group(1) if v else '')))
        o = [x for x in o if str(x).strip()]
        if len(o) >= 8 and sum(1 for x in o if re.search('[A-Za-zÀ-ỹ]', str(x))) >= len(o) * 0.8: return o
    return []

MAU = [  # (tên mẫu, loại app, file giả trong tests/gianho31 hoặc danh sách cột)
  ('Mẫu 31 · Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu (175 cột)', 'hstd', 'gianho31/Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX'),
  ('Nợ quá hạn', 'nqh', 'gianho31/No qua han  31-08-2026.xlsx'),
  ('Nợ khoanh', 'nk', 'gianho31/Khoanh No_2026-08-31.xlsx'),
  ('Món vay 3 tháng không hoạt động (mẫu 14)', 'khd', 'gianho31/Mon_vay_03_thang_KHD_2026-08-31.xlsx'),
  ('Tổng dư nợ theo chương trình', 'tdn', 'gianho31/Tong_du_no_2026-08-31.xlsx'),
  ('Thông tin tổ trưởng (cũ)', 'tt', 'gianho31/Thong tin to truong T8 2026.xlsx'),
  ('Sao kê TK 104 / TK 105 — "9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)" (đọc riêng js/28 tkSKDoc; cột Sản phẩm = 104 / 105)', 'tk104 · tk105',
   ['Mã PGD', 'Mã xã', 'Mã thôn', 'Mã khách hàng', 'Tên khách hàng', 'Tên TK', 'Tài khoản', 'Số Dư Ngày báo cáo', 'Số dư tháng trước', 'Sản phẩm', 'Ngày đăng ký', 'Ngày BC']),
  ('Danh sách tổ TK&VV hệ thống (baocao_…, đọc riêng js/28)', 'dsto',
   ['NGAYBC', 'MADGD', 'TENDGD', 'MADP', 'TENXA', 'TENTHON', 'DVUT', 'TENDVUT', 'MATO', 'MATT', 'TENTT', 'CMT', 'NGAYCAP', 'MOBILE', 'NGAYSINHTT', 'SOTV', 'DUNO', 'TK104', 'MATP', 'TENTP', 'MOBILETP']),
]
GHI_TK = {'Tài khoản':'stk', 'Số Dư Ngày báo cáo':'t105 (số dư ngày BC)', 'Số dư tháng trước':'t105d (số dư cuối tháng trước)', 'Mã khách hàng':'kh', 'Tên khách hàng':'ten', 'Mã xã':'xa', 'Mã thôn':'thon', 'Ngày đăng ký':'ndk', 'Sản phẩm':'sp', 'Ngày BC':'nbc'}

out = ['# Từ điển cột file hệ thống (tự sinh — `python3 tools/cot_mau.py`)', '',
  '> Anh 26/10: "các tên cột của Mẫu 31 và các mẫu em luôn lưu trong code để suy luận khi cần, không cần nạp lại file để test".',
  '> Tên cột lấy từ file GIẢ trong `tests/` (đúng khuôn file thật). **Trường app**: tên trường sau khi nạp (`SL_TRUONG` trong `js/22-so-lieu.js`, khớp tên cột đã bỏ dấu, viết thường).',
  '> Mẫu 31 giữ **mọi** cột: cột chưa khai báo lưu là `c_<tên chuẩn>` (vd `c_thu_lai_th_thang`) → dùng thêm cột KHÔNG cần nạp lại file. Muốn tên ngắn thì khai báo thêm vào `SL_TRUONG` (dữ liệu cũ vẫn đọc qua `c_…`).', '']
for ten, loai, nguon in MAU:
    cot = nguon if isinstance(nguon, list) else doc_xlsx(os.path.join(G, 'tests', nguon))
    out += ['## %s — loại `%s`' % (ten, loai), '', '| # | Tên cột | Trường app |', '|---|---|---|']
    dung = {}
    for n, c in enumerate(cot, 1):
        k = chuan(c)
        if loai.startswith('tk'): f = GHI_TK.get(c, '')
        elif loai == 'dsto': f = '(js/28 dstoDoc)'
        else:
            f = TRUONG.get(k, '')
            if f and f in dung: f = ''
            if f: dung[f] = 1
            elif loai == 'hstd': f = '`c_%s`' % k.replace(' ', '_')
        out.append('| %d | %s | %s |' % (n, c, f if not f or f.startswith('`') or f.startswith('(') else '`%s`' % f))
    out.append('')
out += ['## Ghi chú nghiệp vụ (đã xác minh với anh)', '',
  '- **Mẫu 31 lãi**: `Lũy kế thu lãi*` = cộng dồn từ khi vay; **trong tháng** = `Lãi DT trong tháng` (dự thu) · `Lãi TT trong tháng` (thực thu) · `Thu lãi TH tháng` + `Thu lãi QH Tháng`; quý / năm có cột riêng.',
  '- **Mẫu 31 gốc trong tháng**: `Thu nợ TH tháng` + `Thu nợ QH tháng` + `Thu nợ khoanh tháng`.',
  '- **TK 105**: Mẫu 31 chỉ có `Số dư tiền gửi 105` tại ngày số liệu (không có số dư đầu tháng) — số dư cuối tháng trước lấy Mẫu 31 chốt tháng trước hoặc Sao kê TK 105 cột `Số dư tháng trước`.',
  '- **Đã kiểm trên file thật 19/10 (chỉ đếm, không lưu số liệu)**: `Tài khoản TH / QH / khoanh / thu lãi` là **tài khoản hạch toán** (212x/252x/213x · 292x/293x · 702x/714x), KHÔNG phải TK 105 → Mẫu 31 không tách được thu qua 105 hay tiền mặt. `Lãi TT trong tháng` = `Thu lãi TH tháng` + `Thu lãi QH Tháng` (gần như mọi món). `Sổ tiết kiệm 105` 13–14 ký tự, khoảng 1/4 món trống.',
  '- Thu lãi bằng chuyển khoản (anh 26/10): khách CK vào TK 105 của mình → ngày GD tổ trưởng trích 105 nộp lãi / gốc. Khách CK vào = (số dư 105 ngày chọn − cuối tháng trước) + thu lãi tháng + thu gốc tháng.', '']
open(os.path.join(G, 'docs/COT_FILE_MAU.md'), 'w', encoding='utf8').write('\n'.join(out))
print('Đã ghi docs/COT_FILE_MAU.md')
