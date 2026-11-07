# -*- coding: utf-8 -*-
"""3.502 (anh duyệt 08/11/2026 — rà soát tổng thể, Đợt 1): SỔ CẤU HÌNH `D.cauHinh`.
Quét js/*.js + js/mau/*.js tìm khóa `cauHinh.<khóa>` (đọc / ghi trực tiếp; khóa động `D.cauHinh[k]` không quét được — ghi tay vào sổ nếu cần).
  python3 tools/so_cau_hinh.py          → ghi docs/SO_CAU_HINH.md (khóa · chủ = file đầu tiên theo thứ tự nạp · số chỗ · các file dùng · mô tả)
  python3 tools/so_cau_hinh.py --them   → thêm khóa mới vào tests/cau_hinh.json (mô tả trống — ghi tay 1 dòng)
  python3 tools/so_cau_hinh.py --la     → in các khóa trong code chưa có trong tests/cau_hinh.json (tests/kiem.py dùng; mốc 0)
"""
import re, sys, os, json, glob
G = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SO = os.path.join(G, 'tests', 'cau_hinh.json')
KHOA = re.compile(r'\bcauHinh\.([A-Za-z_$][\w$]*)')

def thu_tu():
    """thứ tự nạp theo index.html (chủ = file khai đầu tiên)"""
    h = open(os.path.join(G, 'index.html'), encoding='utf-8').read()
    ds = re.findall(r'<script src="(js/[^"?]+)', h)
    return ds + sorted(p for p in (os.path.relpath(x, G) for x in glob.glob(os.path.join(G, 'js', '*.js')) + glob.glob(os.path.join(G, 'js', 'mau', '*.js'))) if p not in ds)

def quet():
    ra = {}
    for p in thu_tu():
        f = os.path.join(G, p)
        if not os.path.exists(f): continue
        for k in KHOA.findall(open(f, encoding='utf-8').read()):
            r = ra.setdefault(k, {'chu': p, 'n': 0, 'tep': []}); r['n'] += 1
            if p not in r['tep']: r['tep'].append(p)
    return ra

def doc_so():
    return json.load(open(SO, encoding='utf-8')) if os.path.exists(SO) else {'ghi': '', 'khoa': {}}

def main():
    ra = quet(); so = doc_so(); kh = so.setdefault('khoa', {})
    if '--la' in sys.argv:
        for k in sorted(set(ra) - set(kh)): print(k)
        return
    if '--them' in sys.argv or not os.path.exists(SO):
        for k in ra:
            kh.setdefault(k, '')
        so['ghi'] = 'Sổ khóa D.cauHinh (3.502): {khóa: mô tả 1 dòng}. Khóa mới trong code → python3 tools/so_cau_hinh.py --them rồi ghi mô tả. Bảng đầy đủ: docs/SO_CAU_HINH.md (tự sinh).'
        json.dump(so, open(SO, 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
    L = ['# Sổ cấu hình `D.cauHinh` (tự sinh — `python3 tools/so_cau_hinh.py`, đừng sửa tay)', '',
         '> Mỗi khóa: **chủ** = file khai đầu tiên theo thứ tự nạp · số chỗ dùng · các file dùng · mô tả (ghi ở `tests/cau_hinh.json`). Luật: `docs/QUY_CHUAN_KIEN_TRUC.md` mục 13 (08/11/2026).',
         '> Khóa động (`D.cauHinh[k]`) không quét được. Khóa có trong sổ mà code không còn dùng → cột "dùng" = 0 (xem có bỏ được không — dữ liệu cũ vẫn phải đọc được).', '',
         '**%d khóa** trong code · %d khóa trong sổ.' % (len(ra), len(kh)), '',
         '| Khóa | Chủ | Dùng | File | Mô tả |', '|---|---|---|---|---|']
    for k in sorted(set(ra) | set(kh), key=lambda x: x.lower()):
        r = ra.get(k, {'chu': '—', 'n': 0, 'tep': []})
        L.append('| `%s` | %s | %d | %s | %s |' % (k, r['chu'].replace('js/', ''), r['n'], ' · '.join(t.replace('js/', '') for t in r['tep'][:6]) + (' …+%d' % (len(r['tep']) - 6) if len(r['tep']) > 6 else ''), kh.get(k, '')))
    open(os.path.join(G, 'docs', 'SO_CAU_HINH.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    print('Đã ghi docs/SO_CAU_HINH.md (%d khóa) · khóa chưa ghi sổ: %d' % (len(ra), len(set(ra) - set(kh))))

if __name__ == '__main__':
    main()
