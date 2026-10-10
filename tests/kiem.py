# 3 phép kiểm mục 0.5 (bản mở rộng): cú pháp, trùng tên hàm, thiếu hàm (onclick + mọi lời gọi)
import re,subprocess,sys,os,tempfile
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import ghep
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
toan_cuc=set('''_ThungRac chimuc lý alert prompt confirm setTimeout clearTimeout setInterval clearInterval parseInt parseFloat isNaN isFinite String Number Array Object JSON Math Date Promise Blob File FileReader URL Uint8Array Float32Array Float64Array Int32Array Uint32Array TextEncoder Error RegExp encodeURIComponent decodeURIComponent unescape escape fetch getComputedStyle requestAnimationFrame Boolean Symbol Map Set structuredClone indexedDB atob btoa Image DataTransfer event IntersectionObserver MutationObserver ClipboardItem createImageBitmap TextDecoder Worker ArrayBuffer DataView'''.split())
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
print('Cú pháp', 'OK' if not loi else 'LỖI '+'; '.join(loi), '· Trùng tên:', ', '.join(dup) or 'không', '· Thiếu hàm:', ', '.join(sorted(set(thieu)|set(thieu_onc))) or 'không')
