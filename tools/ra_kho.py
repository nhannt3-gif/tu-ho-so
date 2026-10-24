# Rà soát đọc thẳng biến kho số liệu theo file (docs/RA_SOAT_KHO_2410.md) — chạy: python3 tools/ra_kho.py
import re,glob,os,collections
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
# biến kho số liệu + hàm đọc thấp tầng
PAT={'TO_K':r'\bTO_K\b','SL_DB':r'\bSL_DB\b','SL_KHMON':r'\bSL_KHMON\b','SL_PHU':r'\bSL_PHU\b','SL_TIM':r'\bSL_TIM\b',
 'SLM.bang':r'\bSLM\.bang\b','slBo(':r'\bslBo\(','slDocBang(':r'\bslDocBang\(','toNap(':r'\btoNap\(','tkBang(':r'\btkBang\(',
 'TC_K/KT_K/TH_K…':r'\b(TC_K|KT_K|TH_K|SK_K|TT_K|GDX_K|HSO_K)\b','KHO.':r'\bKHO\.\w+'}
def bo(t): # bỏ chuỗi & chú thích đơn giản
    t=re.sub(r'/\*.*?\*/','',t,flags=re.S); t=re.sub(r'(?m)//.*$','',t); return t
rows=[]
for f in sorted(glob.glob('js/*.js')):
    t=bo(open(f,encoding='utf-8').read())
    c={k:len(re.findall(p,t)) for k,p in PAT.items()}
    if any(v for k,v in c.items() if k!='KHO.'): rows.append((f,c))
ks=list(PAT)
print('file | '+' | '.join(ks))
for f,c in rows: print(f.replace('js/','')+' | '+' | '.join(str(c[k]) for k in ks))
