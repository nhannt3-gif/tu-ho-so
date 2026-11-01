#!/usr/bin/env python3
# Dùng: python3 tools/trang_thai_chung.py — tự sinh docs/TRANG_THAI_CHUNG.md (BẢNG TRẠNG THÁI CHUNG, 1 trang) từ tài liệu sẵn có:
#   sổ luật docs/QUY_TAC_SO_LIEU.md (mục 1 luật · mục 2 chờ chốt · mục 3 phép thử chung) + docs/PHOI_HOP_CHUNG.md (mục 13 chờ anh · mục 14 hộp thư)
#   + bản app (js/02-nen.js) + bản trường hợp mẫu. Không ai ghi tay file đầu ra — sửa nguồn rồi chạy lại (tools/bump.py tự chạy mỗi bản). Anh duyệt 01/11 (ý 1 TK 2 đề xuất).
import re, json, os, datetime
G = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
doc = lambda p: open(os.path.join(G, p), encoding='utf-8').read()
def muc(s, so):   # thân 1 mục "## <so>." đến mục kế
    m = re.search(r'^## ' + re.escape(so) + r'\.[^\n]*\n(.*?)(?=^## |\Z)', s, re.M | re.S); return m.group(1) if m else ''
def bang(t):      # các dòng bảng (bỏ tiêu đề, dòng kẻ)
    r = [[c.strip() for c in l.strip().strip('|').split('|')] for l in t.split('\n') if l.startswith('|')]
    return [x for x in r[2:] if x and not re.match(r'^-+$', x[0])] if len(r) > 2 else []
gon = lambda s, n=110: re.sub(r'\*\*|`|~~', '', s)[:n] + ('…' if len(re.sub(r'\*\*|`|~~', '', s)) > n else '')
Q, P = doc('docs/QUY_TAC_SO_LIEU.md'), doc('docs/PHOI_HOP_CHUNG.md')
ban = (re.search(r"APP_BAN = '([0-9.]+)'", doc('js/02-nen.js')) or [None, '?'])[1]
try: ban_mau = json.load(open(os.path.join(G, 'tests/chung/truong_hop_mau.json'), encoding='utf-8')).get('ban', '?')
except Exception: ban_mau = '?'
so = (re.findall(r'^\| (1\.\d+) \(TK \d\)', Q, re.M) or ['?'])[-1]
luat = [r for r in bang(muc(Q, '1')) if r[0].startswith('QT-C')]
dem = {k: sum(1 for r in luat if len(r) > 2 and k in r[2]) for k in ('✅', '🔧', '⏳')}
chua_ap = [r for r in luat if len(r) > 5 and re.search(r'🔧|⏳|chưa áp|chưa làm', r[4] + ' ' + r[5])]
cho = [r for r in bang(muc(Q, '2')) if r and not r[0].startswith('~~')]
thu = [r for r in bang(muc(Q, '3')) if r and r[0].startswith('QT-C')]
thu_lech = [r for r in thu if len(r) > 3 and not (r[2].startswith('✓') and r[3].startswith('✓'))]
anh = [r for r in bang(muc(P, '13')) if r and not r[0].startswith('~~') and r[0].startswith('C')]
hop = [r for r in bang(muc(P, '14')) if r and len(r) >= 4 and r[-1].strip().startswith('mở')]
theo = {}
for r in hop:
    nhan = re.sub(r'\s+', ' ', r[1]).split('→')[-1].strip() if '→' in r[1] else r[1]
    theo.setdefault(nhan, []).append(r)
L = ['# Bảng trạng thái chung — App · Giao ban (tự sinh — không sửa tay)', '',
     '> Sinh bởi `python3 tools/trang_thai_chung.py` lúc ' + (datetime.datetime.utcnow() + datetime.timedelta(hours=7)).strftime('%d/%m/%Y %H:%M') +
     ' từ `QUY_TAC_SO_LIEU.md` + `PHOI_HOP_CHUNG.md`. Sửa nguồn rồi chạy lại.', '',
     '| Mục | Hiện trạng |', '|---|---|',
     '| App | **%s** |' % ban, '| Sổ luật | bản %s · ✅ %d · 🔧 %d · ⏳ %d luật · %d luật chờ chốt (mục 2) |' % (so, dem['✅'], dem['🔧'], dem['⏳'], len(cho)),
     '| Phép thử chung | `tests/chung/truong_hop_mau.json` bản %s · %d luật có trường hợp mẫu · %d luật chưa đạt / chưa chạy ở một bên |' % (ban_mau, len(thu), len(thu_lech)),
     '| Chờ anh quyết | %d việc (mục 13) |' % len(anh), '| Hộp thư còn mở | %d dòng |' % len(hop), '']
if chua_ap: L += ['## Luật đã chốt nhưng một bên chưa áp', ''] + ['- **%s** — app: %s · giao ban: %s' % (r[0], gon(r[4], 80), gon(r[5], 80)) for r in chua_ap] + ['']
if thu_lech: L += ['## Phép thử chung chưa đạt hai bên', ''] + ['- **%s** — giao ban: %s · app: %s' % (r[0], gon(r[2], 60), gon(r[3], 90)) for r in thu_lech] + ['']
if cho: L += ['## Luật chờ anh chốt', ''] + ['- %s — %s' % (gon(r[0], 30), gon(r[1], 90)) for r in cho] + ['']
if anh: L += ['## Chờ anh quyết', ''] + ['- **%s** %s _(cần: %s)_' % (r[0], gon(r[1], 120), gon(r[2], 30) if len(r) > 2 else '') for r in anh] + ['']
if theo:
    L += ['## Hộp thư còn mở — theo bên nhận', '']
    for nhan in sorted(theo):
        L.append('**→ %s** (%d)' % (nhan, len(theo[nhan])))
        L += ['- %s · %s: %s' % (r[0], gon(r[1], 30), gon(r[2], 120)) for r in theo[nhan]]
        L.append('')
open(os.path.join(G, 'docs/TRANG_THAI_CHUNG.md'), 'w', encoding='utf-8').write('\n'.join(L).rstrip() + '\n')
print('Đã ghi docs/TRANG_THAI_CHUNG.md — hộp thư mở %d, chờ anh %d, luật chờ chốt %d' % (len(hop), len(anh), len(cho)))
