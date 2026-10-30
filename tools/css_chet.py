# Dùng: python3 tools/css_chet.py [n] — dò luật CSS (css/app.css) không còn màn nào dùng (lớp không xuất hiện trong js/**, *.html); --xoa để xóa (3.417 D1).
# Lớp ghép động ('gl-c'+x, 'tc-dn-'+x, x+'-dong') coi là còn dùng; lớp thư viện ngoài (pdf.js) giữ. Chỉ đọc, trừ khi --xoa.
import re, glob, sys
css = open('css/app.css', encoding='utf-8').read()
src = ''.join(open(f, encoding='utf-8').read() for f in glob.glob('js/**/*.js', recursive=True) + glob.glob('*.html') + glob.glob('*.js'))
# tokens of class-ish strings in src
lit = set(re.findall(r'[A-Za-z0-9_-]+', src))
pref = set(m for m in re.findall(r"[\"' ]([a-z0-9][A-Za-z0-9_-]*-)['\"]", src))
pref |= set(re.findall(r"([A-Za-z][A-Za-z0-9_-]*)['\"]\s*\+", src))
duoi = set(x for x in re.findall(r"\+\s*['\"](-[A-Za-z0-9_-]+)", src) if len(x)>=3)
NGOAI = {'active','endOfContent','markedContent','textLayer','highlight','selected'}   # lớp của thư viện ngoài (pdf.js…)
def dung(c):
    if c in lit or c in NGOAI: return True
    return any(c.startswith(p) for p in pref if len(p)>=2) or any(c.endswith(d) for d in duoi)
# iterate top-level rules (ignore @media nesting crude: handle by regex over selectors before '{' that are not @)
chet = []; tong = 0
for m in re.finditer(r'([^{}@;]+)\{[^{}]*\}', css):
    sel = m.group(1).strip()
    if not sel or sel.startswith('/*') and '*/' not in sel: continue
    sel = re.sub(r'/\*.*?\*/', '', sel, flags=re.S).strip()
    if not sel or re.match(r'^(from|to|\d+%)', sel): continue
    tong += 1
    parts = [p.strip() for p in sel.split(',')]
    def phan_chet(p):
        cs = re.findall(r'\.([A-Za-z_][A-Za-z0-9_-]*)', p)
        return any(not dung(c) for c in cs)
    if all(phan_chet(p) for p in parts):
        g = m.group(1); k = g.rfind('*/'); k = k+2 if k>=0 else 0   # bỏ chú thích đứng trước: chỉ xóa từ đầu bộ chọn
        while k<len(g) and g[k] in ' \t\r\n': k += 1
        chet.append((m.start(1)+k, m.end(), sel))
print('quy tắc:', tong, '· chết:', len(chet), '· byte:', sum(e-s for s,e,_ in chet))
if '--xoa' in sys.argv:
    t = css
    for s0,e0,_ in reversed(chet): t = t[:s0] + t[e0:]
    t = re.sub(r'@media[^{}]*\{\s*\}', '', t)
    open('css/app.css', 'w', encoding='utf-8').write(t); print('đã xóa', len(chet), 'luật,', len(css)-len(t), 'byte')
elif len(sys.argv)>1:
    for s,e,sel in chet[:int(sys.argv[1])]: print(sel[:120])
