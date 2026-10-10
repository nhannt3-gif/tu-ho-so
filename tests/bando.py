#!/usr/bin/env python3
# Sinh docs/BAN_DO_MA.md — bản đồ mã index.html (khối, mục, nhóm hàm theo tiền tố) để phiên Claude mới
# KHÔNG phải đọc cả file 28.000 dòng: xem bản đồ → grep đúng chỗ. Chạy lại sau mỗi bản: python3 tests/bando.py
import re, os, collections
GOC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
s = open(os.path.join(GOC, 'index.html'), encoding='utf-8').read()
dong = lambda i: s.count('\n', 0, i) + 1
ra = []
ban = re.search(r"var APP_BAN = '([^']+)', APP_LUC = '([^']+)'", s)
ra.append('# BẢN ĐỒ MÃ — index.html (tự sinh bởi `tests/bando.py`, đừng sửa tay)\n')
ra.append('Bản %s · %s · %d dòng · %d hàm cấp ngoài · %d biến toàn cục.\n' % (ban.group(1), ban.group(2), s.count('\n') + 1,
          len(re.findall(r'^function ', s, re.M)), len(re.findall(r'^var ', s, re.M))))
ra.append('Cách dùng: tìm khối / mục theo dòng dưới đây rồi `grep -n "function tênHàm"` hoặc đọc đúng khoảng dòng (Read offset/limit). Số dòng đổi theo bản — chạy lại script khi cần.\n')
ra.append('\n## 1. Khối <style> / <script> (≥ 50 dòng)\n\n| Loại | Dòng | Số dòng | Mở đầu |\n|---|---|---|---|')
for m in re.finditer(r'<(style|script)([^>]*)>', s):
    a = dong(m.start()); e = s.find('</' + m.group(1) + '>', m.end()); b = dong(e)
    if b - a < 50: continue
    dau = ' '.join(x.strip() for x in s[m.end():m.end() + 500].strip().split('\n')[:3])
    dau = re.sub(r'[/*=\-]{3,}', ' ', dau).replace('|', '/').strip()[:110]
    ra.append('| %s | %d–%d | %d | %s |' % (m.group(1), a, b, b - a, dau))
ra.append('\n## 2. Mục trong mã (chú thích tiêu đề)\n')
for m in re.finditer(r'^/\* (?:-{6,}|={6,}\n)\s*([^\n]{3,140})', s, re.M):
    t = re.sub(r'-{3,}\s*\*?/?\s*$', '', m.group(1)).strip()
    if t.startswith('='): continue
    ra.append('- %d · %s' % (dong(m.start()), t[:120]))
ra.append('\n## 3. Nhóm hàm theo tiền tố (khối chức năng)\n\n| Tiền tố | Số hàm | Dòng đầu – cuối | Ví dụ |\n|---|---|---|---|')
TT = {'sl': 'Số liệu (nạp, kho kỳ, ma trận)', 'to': 'Tổ TK&VV', 'kt': 'KTGS Hội (Mẫu 06/16/04, KH…)', 'sk': 'Sao kê', 'th': 'Tổng hợp',
      'tc': 'Tra cứu KH', 'pv': 'Bộ chọn phạm vi (cây địa bàn)', 'tdn': 'Theo dõi nợ', 'hs': 'Hồ sơ CCCD / hộ', 'lc': 'Lịch',
      'bm': 'Biểu mẫu', 'ch': 'Đồng bộ cài đặt', 'tg': 'Tìm / gợi ý', 'ka': 'Chữ ký · CCCD (khay ảnh)', 'gb': 'Giao ban', 'bgd': 'Buổi GD xã',
      'ln': 'Lưu nhanh', 'cg': 'Chỉnh gốc ảnh', 'tr': 'Bộ in chuẩn', 'sc': 'Scan', 'hssv': 'HSSV'}
nhom = collections.defaultdict(list)
for m in re.finditer(r'^function ([A-Za-z0-9_]+)', s, re.M):
    f = m.group(1)
    for k in sorted(TT, key=len, reverse=True):
        if f.startswith(k) and (len(f) == len(k) or f[len(k)].isupper()):
            nhom[k].append((dong(m.start()), f)); break
for k in sorted(nhom, key=lambda x: -len(nhom[x])):
    v = nhom[k]
    ra.append('| `%s` %s | %d | %d – %d | %s |' % (k, TT[k], len(v), v[0][0], v[-1][0], ', '.join(x[1] for x in v[:4])))
ra.append('\n## 4. Điểm vào hay dùng\n')
for f in ['ve', 'doiNgan', 'luu', 'luuFile', 'docFile', 'moHop', 'dongHop', 'hoi', 'bao', 'veHomNay', 'veVanBan', 'veThang', 'veGhiChu', 'veScan',
          'veBieuMau', 'veThem', 'veSoLieu', 'slDocFile', 'slGhi', 'slBo', 'slKyDung', 'toNap', 'toVe', 'veKTGS', 'veSaoKe', 'veTongHop', 'inChuan',
          'inBlob', 'xemChuan', 'pvLuaChon', 'chTheoDoi', 'slDay', 'slDayMeta', 'henDongBoChiMuc', 'batDau', 'khoiDong']:
    m = re.search(r'^function ' + f + r'\(', s, re.M)
    if m: ra.append('- `%s` dòng %d' % (f, dong(m.start())))
ra.append('\nTab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · '
          '5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).')
open(os.path.join(GOC, 'docs', 'BAN_DO_MA.md'), 'w', encoding='utf-8').write('\n'.join(ra) + '\n')
print('Đã ghi docs/BAN_DO_MA.md (%d dòng)' % len(ra))
