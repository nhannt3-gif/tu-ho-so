# Dùng: python3 tools/bump.py <spec.json> — nâng bản + tài liệu (chạy ở thư mục gốc repo). Mẫu spec: tools/mau_spec.json (xem docs/BAN_GIAO_3161.md mục 4)
import json, re, sys, datetime
sp = json.load(open(sys.argv[1], encoding='utf-8'))
v, cu = sp['ban'], sp['cu']
for x in sp['moi']:   # 3.399.1: dạng [chữ hiển thị, lệnh mở] — khai ngược [biểu tượng, chữ] làm "Có gì mới" chỉ hiện biểu tượng
    assert len(re.sub(r'[^\w]', '', x[0]))>=8 and (x[1]=='' or re.match(r'^[A-Za-z_$][\w$.]*\(', x[1])), 'moi phải là [chữ, lệnh JS hoặc ""] — sai: %r' % (x,)
luc = (datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(hours=7)).strftime('%d/%m/%Y %H:%M')
def rw(p, f):
    s = open(p, encoding='utf-8').read(); t = f(s); assert t != s, p; open(p, 'w', encoding='utf-8').write(t)
rw('js/02-nen.js', lambda s: re.sub(r"var APP_BAN = '[0-9.]+', APP_LUC = '[^']*'", "var APP_BAN = '%s', APP_LUC = '%s'" % (v, luc), s))
rw('index.html', lambda s: s.replace('?v='+cu, '?v='+v))
import os
if os.path.exists('dt-sw.js'): rw('dt-sw.js', lambda s: s.replace("'tuhoso-dt-%s'" % cu, "'tuhoso-dt-%s'" % v) if ("'tuhoso-dt-%s'" % cu) in s else s+'')   # 3.233 bộ đệm chạy không mạng
if os.path.exists('dt.html'): rw('dt.html', lambda s: s.replace('?v='+cu, '?v='+v) if ('?v='+cu) in s else s+'')   # 3.231 bản điện thoại
rw('tests/hoiquy2.js', lambda s: s.replace("APP_BAN==='%s'" % cu, "APP_BAN==='%s'" % v))
moi = ''.join("  [%s, %s],\n" % (json.dumps(x[0], ensure_ascii=False), json.dumps(x[1], ensure_ascii=False)) for x in sp['moi'])
rw('js/06-hop-thoai.js', lambda s: s.replace("var CO_GI_MOI = {ban:'%s', ds:[\n" % cu, "var CO_GI_MOI = {ban:'%s', ds:[\n" % v + moi, 1))
def cat15(s):   # 3.230: "Có gì mới" chỉ giữ 15 dòng gần nhất (lịch sử đủ ở CHANGELOG)
    i = s.index("var CO_GI_MOI = {ban:'"); a = s.index('\n', i)+1; j = s.index('],   /* 3.230', a)
    ds = s[a:j].split('\n')
    if len(ds) <= 15: return s
    ds = ds[:15]; ds[-1] = ds[-1].rstrip(',')
    return s[:a] + '\n'.join(ds) + s[j:]
s0 = open('js/06-hop-thoai.js', encoding='utf-8').read(); s1 = cat15(s0)
if s1 != s0: open('js/06-hop-thoai.js', 'w', encoding='utf-8').write(s1)
rw('docs/CHANGELOG.md', lambda s: s.replace('\n## ', '\n' + sp['changelog'].rstrip() + '\n\n## ', 1))
rw('docs/BAN_GIAO_VIEC_CON_LAI.md', lambda s: s.replace('### Danh sách thử trên máy thật (', sp['bangiao'].rstrip() + '\n\n### Danh sách thử trên máy thật (', 1))
def rd(s):
    dong = [l for l in s.split('\n') if l.startswith('| `node tests/')]
    return s.replace(dong[-1], dong[-1] + '\n' + sp['readme'], 1)
rw('tests/README.md', rd)
if sp.get('batdau'):
    rw('docs/BAT_DAU.md', lambda s: re.sub(r"- \*\*`main` = [^\n]*", sp['batdau'], s, count=1))
print('ok', v, luc)
