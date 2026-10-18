# 3 phép kiểm mục 0.5 (bản mở rộng): cú pháp, trùng tên hàm, thiếu hàm (onclick + mọi lời gọi)
import re,subprocess,sys,os,tempfile
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import ghep
MO_COI='--mo-coi' in sys.argv   # 3.227: in đủ danh sách hàm mồ côi
if MO_COI: sys.argv.remove('--mo-coi')
MOC='--moc' in sys.argv   # 3.230: ghi số đo hiện tại làm mốc mới (sau khi dọn bớt / anh duyệt tăng)
if MOC: sys.argv.remove('--moc')
# 3.142: app tách nhiều file → ghép lại (index.html + css/ + js/) rồi kiểm như một file; có đối số = kiểm 1 file HTML đã ghép
s=open(sys.argv[1],encoding='utf-8').read() if len(sys.argv)>1 else ghep.ghep()
ban=re.search(r"var APP_BAN = '([^']+)'",s)
lech=sorted({v for v in re.findall(r'\?v=([^"]+)"',open(os.path.join(ghep.GOC,'index.html'),encoding='utf-8').read())}-{ban.group(1) if ban else ''}) if len(sys.argv)<2 else []
blocks=re.findall(r'<script>(.*?)</script>',s,re.S)
loi=[]
for i,bk in enumerate(blocks):
    t=tempfile.NamedTemporaryFile('w',suffix='.js',delete=False,encoding='utf-8'); t.write(bk); t.close()
    r=subprocess.run(['node','--check',t.name],capture_output=True,text=True)
    if r.returncode: loi.append('khối %d: %s'%(i,r.stderr.strip().splitlines()[-1] if r.stderr else '?'))
    os.unlink(t.name)
js='\n'.join(blocks)
top=re.findall(r'^function\s+([\w$]+)',js,re.M)
dup=sorted({x for x in top if top.count(x)>1})
defs=set(re.findall(r'function\s+([\w$]+)',js))|set(re.findall(r'(?:var|let|const)\s+([\w$]+)',js))|set(re.findall(r'\bwindow\.([\w$]+)\s*=',js))
defs|=set(re.findall(r'(?:var|let|const)\s+[^;]*?,\s*([\w$]+)\s*=',js))
# tham số hàm
for ps in re.findall(r'function\s*[\w$]*\s*\(([^)]*)\)',js): defs|=set(x.strip() for x in ps.split(',') if x.strip())
toan_cuc=set('''_ThungRac chimuc lý alert prompt confirm setTimeout clearTimeout setInterval clearInterval parseInt parseFloat isNaN isFinite String Number Array Object JSON Math Date Promise Blob File FileReader URL Uint8Array Float32Array Float64Array Int32Array Uint32Array TextEncoder Error RegExp encodeURIComponent decodeURIComponent unescape escape fetch getComputedStyle requestAnimationFrame Boolean Symbol Map Set structuredClone indexedDB atob btoa Image DataTransfer event IntersectionObserver MutationObserver ClipboardItem createImageBitmap TextDecoder Worker ArrayBuffer DataView DOMParser XMLSerializer Event matchMedia'''.split())
kw=set('if for while switch catch function return typeof new delete in of do else case void throw'.split())
def boChuoi(t):
    out=[];i=0;n=len(t)
    while i<n:
        c=t[i]
        if t.startswith('/*',i): j=t.find('*/',i+2); i=n if j<0 else j+2; continue
        if t.startswith('//',i) and (i==0 or t[i-1] not in ':\\'): j=t.find('\n',i); i=n if j<0 else j; continue
        if c in '"\'`':
            j=i+1
            while j<n and t[j]!=c:
                if t[j]=='\\': j+=1
                elif t[j]=='\n' and c!='`': break
                j+=1
            out.append('""'); i=j+1; continue
        out.append(c); i+=1
    return ''.join(out)
js2=boChuoi(js)
goi=set(re.findall(r'(?<![\w$.\\])([A-Za-z_$][\w$]*)\s*\(',js2))
thieu=sorted(x for x in goi if x not in defs and x not in toan_cuc and x not in kw)
onc=set(re.findall(r'on(?:click|change|input|keydown|blur|drop|dragstart|dragover)=\\?["\'](?:[^"\']*?;)?\s*([A-Za-z_$][\w$]*)\(',s))
thieu_onc=sorted(x for x in onc if x not in defs and x not in toan_cuc and x not in kw)
if lech: loi.append('?v= trong index.html (%s) khác APP_BAN' % ', '.join(lech))
# 3.231: bản điện thoại dt.html + js/dt/*.js — cú pháp từng file, ?v= cùng APP_BAN
if len(sys.argv)<2 and os.path.exists(os.path.join(ghep.GOC,'dt.html')):
    import glob as _g
    for p in sorted(_g.glob(os.path.join(ghep.GOC,'js','dt','*.js'))+_g.glob(os.path.join(ghep.GOC,'js','khuon','*.js'))):   # 3.236: + khuôn nạp khi dùng
        r=subprocess.run(['node','--check',p],capture_output=True,text=True)
        if r.returncode: loi.append(os.path.basename(p)+': '+(r.stderr.strip().splitlines()[-1] if r.stderr else '?'))
    lv=sorted({v for v in re.findall(r'\?v=([^"]+)"',open(os.path.join(ghep.GOC,'dt.html'),encoding='utf-8').read())}-{ban.group(1) if ban else ''})
    if lv: loi.append('?v= trong dt.html (%s) khác APP_BAN' % ', '.join(lv))
    sw=os.path.join(ghep.GOC,'dt-sw.js')
    if os.path.exists(sw):
        r=subprocess.run(['node','--check',sw],capture_output=True,text=True)
        if r.returncode: loi.append('dt-sw.js: lỗi cú pháp')
        if ban and ("'tuhoso-dt-%s'" % ban.group(1)) not in open(sw,encoding='utf-8').read(): loi.append('dt-sw.js: tên bộ đệm khác APP_BAN')
# 3.237 (R4): phép thử nhanh lớp Nghiệp vụ (node, < 1 giây) — trượt là lỗi
if len(sys.argv)<2 or '--nhanh' in sys.argv:
    _r=subprocess.run(['node',os.path.join(ghep.GOC,'tests','nhanh','thu.js')],capture_output=True,text=True)
    _d=(_r.stdout.strip().splitlines() or ['?'])[-1]
    if _r.returncode: loi.append('phép thử nhanh: '+_d+' — '+'; '.join(x[2:] for x in _r.stdout.splitlines() if x.startswith('✗'))[:300])
    NHANH=_d
else: NHANH=''
# 3.234 (anh 17/10: dòng trắng ở chế độ tối): biến màu chưa khai mà dự phòng là màu sáng cố định → chế độ tối ra mảng trắng
_cs=open(os.path.join(ghep.GOC,'css','app.css'),encoding='utf-8').read(); _khai=set(re.findall(r'(--[\w-]+)\s*:',_cs+s))
for v,du in re.findall(r'var\((--[\w-]+)\s*,\s*(#[0-9a-fA-F]{3,6}|white)\)',_cs):
    if v not in _khai and (du=='white' or int(du[1:2],16)>=12): loi.append('css: var(%s,%s) — biến chưa khai, chế độ tối ra màu sáng'%(v,du))
# 3.260 (R4 phần 2): khóa cài đặt dùng thẳng trong mã (D.cauHinh.<khóa> hoặc D.cauHinh["<khóa>"]) phải có trong sổ js/17b-so-cai-dat.js
_so=open(os.path.join(ghep.GOC,'js','17b-so-cai-dat.js'),encoding='utf-8').read().split('var CH_SO = {')[1].split('\n};')[0]
_dk=set(re.findall(r"([A-Za-z_]\w*):'",_so))
_dung=set(a or b for a,b in re.findall(r"D\.cauHinh(?:\.([A-Za-z_]\w*)|\[['\"]([A-Za-z_]\w*)['\"]\])",s))
_chua=sorted(_dung-_dk)
if _chua: loi.append('khóa cài đặt chưa ghi vào sổ js/17b-so-cai-dat.js: '+', '.join(_chua))
# 3.227 (anh 17/10: dọn rác, kiểm toàn vẹn): hàm mồ côi = khai báo nhưng tên không xuất hiện ở chỗ nào khác (kể cả onclick trong chuỗi) — chỉ báo, không làm trượt
dem={}
for w in re.findall(r'[A-Za-z_$][\w$]*',s): dem[w]=dem.get(w,0)+1
mo_coi=sorted({x for x in top if dem.get(x,0)<=1})
# 3.260 (phần C): hàm chỉ phép thử gọi (giữ có chủ ý — vd thXem đối chiếu 9 báo cáo 1 lượt) tách riêng, không tính là mồ côi
_thu=''.join(open(os.path.join(ghep.GOC,'tests',f),encoding='utf-8').read() for f in os.listdir(os.path.join(ghep.GOC,'tests')) if f.endswith('.js'))
chi_thu=[x for x in mo_coi if re.search(r'\b'+re.escape(x)+r'\b',_thu)]
mo_coi=[x for x in mo_coi if x not in chi_thu]
print('Cú pháp', 'OK' if not loi else 'LỖI '+'; '.join(loi), '· Trùng tên:', ', '.join(dup) or 'không', '· Thiếu hàm:', ', '.join(sorted(set(thieu)|set(thieu_onc))) or 'không')
if NHANH: print('Phép thử nhanh (tests/nhanh):', NHANH)
print('Hàm mồ côi (chỉ báo, dọn dần):', len(mo_coi), ('— '+', '.join(mo_coi)) if MO_COI else '— xem danh sách: python3 tests/kiem.py --mo-coi', '· chỉ phép thử gọi: %d%s'%(len(chi_thu), (' ('+', '.join(chi_thu)+')') if MO_COI else ''))
# 3.230 (R1 — KE_HOACH_CHUAN_HOA mục 2.7): THƯỚC ĐO chống lệch hướng — so với mốc tests/do_moc.json; tăng → ⚠ (giải thích trong CHANGELOG hoặc dọn bớt), giảm → hạ mốc bằng --moc
if len(sys.argv)<2:
    import json, glob
    G=ghep.GOC; tepjs=[p for l,p in ghep.tep() if l=='js']
    nd={p:open(os.path.join(G,p),encoding='utf-8').read() for p in tepjs}
    css=sum(os.path.getsize(os.path.join(G,p)) for l,p in ghep.tep() if l=='css')
    kho=sum(len(re.findall(r'\b(TO_K|SL_DB|SL_KHMON|SL_PHU)\b', boChuoi(t))) for p,t in nd.items() if not re.search(r'js/(22[a-z]?-[\w-]+|29-kho)\.js$', p))
    do={'js_kb':sum(len(t.encode()) for t in nd.values())//1024, 'css_kb':css//1024, 'ham':len(top), 'bien':len(set(re.findall(r'^var\s+([\w$]+)',js,re.M))),
        'mo_coi':len(mo_coi), 'dong_dai':sum(1 for t in nd.values() for l in t.split('\n') if len(l)>400), 'onclick':len(re.findall(r'on(?:click|change|input)=\\?"',js)),
        'file_lon':sum(1 for t in nd.values() if len(t.encode())>150*1024), 'kho_thang':kho}
    ten={'js_kb':'JS KB','css_kb':'CSS KB','ham':'hàm chung','bien':'biến chung','mo_coi':'mồ côi','dong_dai':'dòng >400','onclick':'onclick','file_lon':'file >150 KB','kho_thang':'đọc thẳng biến kho'}
    pm=os.path.join(G,'tests','do_moc.json'); moc=json.load(open(pm,encoding='utf-8')) if os.path.exists(pm) else {}
    if MOC or not moc: json.dump(do,open(pm,'w',encoding='utf-8'),ensure_ascii=False,indent=1); moc=do
    vuot=[k for k in do if k in moc and do[k]>moc[k] and k not in ('js_kb','css_kb','ham','bien')]
    print('Thước đo:', ' · '.join('%s %d%s'%(ten[k],do[k],('' if k not in moc or do[k]==moc[k] else ' (%+d)'%(do[k]-moc[k]))) for k in do), ('— ⚠ VƯỢT MỐC: '+', '.join(ten[k] for k in vuot)) if vuot else '— trong mốc')

