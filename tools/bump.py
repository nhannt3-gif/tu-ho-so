# Dùng: python3 tools/bump.py <spec.json> — nâng bản + tài liệu (chạy ở thư mục gốc repo). Mẫu spec: tools/mau_spec.json (xem docs/BAN_GIAO_3161.md mục 4)
import json, re, sys, datetime
sp = json.load(open(sys.argv[1], encoding='utf-8'))
v, cu = sp['ban'], sp['cu']
luc = (datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(hours=7)).strftime('%d/%m/%Y %H:%M')
def rw(p, f):
    s = open(p, encoding='utf-8').read(); t = f(s); assert t != s, p; open(p, 'w', encoding='utf-8').write(t)
rw('js/02-nen.js', lambda s: re.sub(r"var APP_BAN = '[0-9.]+', APP_LUC = '[^']*'", "var APP_BAN = '%s', APP_LUC = '%s'" % (v, luc), s))
rw('index.html', lambda s: s.replace('?v='+cu, '?v='+v))
rw('tests/hoiquy2.js', lambda s: s.replace("APP_BAN==='%s'" % cu, "APP_BAN==='%s'" % v))
moi = ''.join("  [%s, %s],\n" % (json.dumps(x[0], ensure_ascii=False), json.dumps(x[1], ensure_ascii=False)) for x in sp['moi'])
rw('js/06-hop-thoai.js', lambda s: s.replace("var CO_GI_MOI = {ban:'%s', ds:[\n" % cu, "var CO_GI_MOI = {ban:'%s', ds:[\n" % v + moi, 1))
rw('docs/CHANGELOG.md', lambda s: s.replace('\n## ', '\n' + sp['changelog'].rstrip() + '\n\n## ', 1))
rw('docs/BAN_GIAO_VIEC_CON_LAI.md', lambda s: s.replace('### Danh sách thử trên máy thật (', sp['bangiao'].rstrip() + '\n\n### Danh sách thử trên máy thật (', 1))
def rd(s):
    dong = [l for l in s.split('\n') if l.startswith('| `node tests/')]
    return s.replace(dong[-1], dong[-1] + '\n' + sp['readme'], 1)
rw('tests/README.md', rd)
if sp.get('batdau'):
    rw('docs/BAT_DAU.md', lambda s: re.sub(r"- \*\*`main` = [^\n]*", sp['batdau'], s, count=1))
print('ok', v, luc)
