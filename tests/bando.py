#!/usr/bin/env python3
# Sinh docs/BAN_DO_MA.md — bản đồ mã (file, mục, nhóm hàm theo tiền tố) để phiên Claude mới
# KHÔNG phải đọc cả mã: xem bản đồ → grep đúng chỗ. Chạy lại sau mỗi bản: python3 tests/bando.py
# 3.142 (đợt A): app tách thành index.html + css/app.css + js/NN-*.js → vị trí ghi dạng `file:dòng`.
import re, os, sys, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ghep
GOC = ghep.GOC
TEP = [('html', 'index.html')] + ghep.tep()
NOI = {t: open(os.path.join(GOC, t), encoding='utf-8').read() for _, t in TEP}
dong = lambda s, i: s.count('\n', 0, i) + 1
tat = '\n'.join(NOI[t] for _, t in TEP if t.endswith('.js'))
ra = []
ban = re.search(r"var APP_BAN = '([^']+)', APP_LUC = '([^']+)'", tat)
ra.append('# BẢN ĐỒ MÃ (tự sinh bởi `tests/bando.py`, đừng sửa tay)\n')
ra.append('Bản %s · %s · %d file · %d dòng · %d hàm cấp ngoài · %d biến toàn cục.\n' % (ban.group(1), ban.group(2), len(TEP),
          sum(NOI[t].count('\n') for _, t in TEP), len(re.findall(r'^function ', tat, re.M)), len(re.findall(r'^var ', tat, re.M))))
ra.append('Cách dùng: tìm file / mục dưới đây rồi `grep -n "function tênHàm" js/*.js` hoặc đọc đúng khoảng dòng (Read offset/limit). '
          'Thứ tự nạp = thứ tự bảng 1 (đúng như các khối <script> trước khi tách). `python3 tests/ghep.py ra.html` ghép lại 1 file. '
          'Số dòng đổi theo bản — chạy lại script khi cần.\n')
ra.append('\n## 1. Các file (thứ tự nạp)\n\n| File | Số dòng | Số hàm | Mở đầu |\n|---|---|---|---|')
for loai, t in TEP:
    s = NOI[t]
    dau = ' '.join(x.strip() for x in s.strip().split('\n')[:3]) if loai != 'html' else 'Khung trang (thẻ HTML tĩnh) + thẻ nạp css / js'
    dau = re.sub(r'[/*=\-]{3,}', ' ', dau).replace('|', '/').strip()[:110]
    ra.append('| `%s` | %d | %d | %s |' % (t, s.count('\n'), len(re.findall(r'^function ', s, re.M)), dau))
ra.append('\n## 2. Mục trong mã (chú thích tiêu đề)\n')
for _, t in TEP:
    if not t.endswith('.js'): continue
    s = NOI[t]
    for m in re.finditer(r'^/\* (?:-{6,}|={6,}\n)\s*([^\n]{3,140})', s, re.M):
        x = re.sub(r'-{3,}\s*\*?/?\s*$', '', m.group(1)).strip()
        if x.startswith('='): continue
        ra.append('- `%s:%d` · %s' % (t, dong(s, m.start()), x[:120]))
ra.append('\n## 3. Nhóm hàm theo tiền tố (khối chức năng)\n\n| Tiền tố | Số hàm | File | Ví dụ |\n|---|---|---|---|')
TT = {'sl': 'Số liệu (nạp, kho kỳ, ma trận)', 'to': 'Tổ TK&VV', 'kt': 'KTGS Hội (Mẫu 06/16/04, KH…)', 'sk': 'Sao kê', 'th': 'Tổng hợp',
      'tc': 'Tra cứu KH', 'pv': 'Bộ chọn phạm vi (cây địa bàn)', 'tdn': 'Theo dõi nợ', 'hs': 'Hồ sơ CCCD / hộ', 'lc': 'Lịch',
      'bm': 'Biểu mẫu', 'ch': 'Đồng bộ cài đặt', 'tg': 'Tìm / gợi ý', 'ka': 'Chữ ký · CCCD (khay ảnh)', 'gb': 'Giao ban', 'bgd': 'Buổi GD xã',
      'ln': 'Lưu nhanh', 'cg': 'Chỉnh gốc ảnh', 'tr': 'Bộ in chuẩn', 'sc': 'Scan', 'hssv': 'HSSV'}
nhom = collections.defaultdict(list)
for _, t in TEP:
    if not t.endswith('.js'): continue
    for m in re.finditer(r'^function ([A-Za-z0-9_]+)', NOI[t], re.M):
        f = m.group(1)
        for k in sorted(TT, key=len, reverse=True):
            if f.startswith(k) and (len(f) == len(k) or f[len(k)].isupper()):
                nhom[k].append((t, f)); break
for k in sorted(nhom, key=lambda x: -len(nhom[x])):
    v = nhom[k]; ds = collections.Counter(x[0] for x in v)
    ra.append('| `%s` %s | %d | %s | %s |' % (k, TT[k], len(v), ', '.join('`%s` %d' % (os.path.basename(a), b) for a, b in ds.most_common(3)),
                                             ', '.join(x[1] for x in v[:4])))
ra.append('\n## 4. Điểm vào hay dùng\n')
for f in ['ve', 'doiNgan', 'luu', 'luuFile', 'docFile', 'moHop', 'dongHop', 'hoi', 'bao', 'veHomNay', 'veVanBan', 'veThang', 'veGhiChu', 'veScan',
          'veBieuMau', 'veThem', 'veSoLieu', 'slDocFile', 'slGhi', 'slBo', 'slKyDung', 'toNap', 'toVe', 'veKTGS', 'veSaoKe', 'veTongHop', 'inChuan',
          'inBlob', 'xemChuan', 'pvLuaChon', 'chTheoDoi', 'slDay', 'slDayMeta', 'henDongBoChiMuc', 'batDau', 'khoiDong']:
    for _, t in TEP:
        if not t.endswith('.js'): continue
        m = re.search(r'^function ' + f + r'\(', NOI[t], re.M)
        if m: ra.append('- `%s` `%s:%d`' % (f, t, dong(NOI[t], m.start()))); break
ra.append('\nTab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · '
          '5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).')
open(os.path.join(GOC, 'docs', 'BAN_DO_MA.md'), 'w', encoding='utf-8').write('\n'.join(ra) + '\n')
print('Đã ghi docs/BAN_DO_MA.md (%d dòng)' % len(ra))
