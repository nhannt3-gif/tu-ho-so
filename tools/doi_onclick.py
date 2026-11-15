#!/usr/bin/env python3
"""3.476 (Đ4 kế hoạch dọn — KE_HOACH_DON_NEN mục 8): CHUYỂN onclick / onchange / oninput VIẾT THẲNG → data-lenh (bộ nghe chung GD, js/39).

  python3 tools/doi_onclick.py js/<file>.js <khối> [--thu]     (--thu: chỉ báo, không ghi)

Chỉ chuyển DẠNG CHUẨN (an toàn, giữ nguyên hàm + tham số):
  on<sự kiện>="[dongHop();]HÀM(thamSố, …)[;return false]"   — HÀM là tên hàm trơn (không dấu chấm)
  tham số: \\''+biểu thức+'\\'  (chuỗi)  ·  \\'chữ\\'  ·  số  ·  true / false / null  ·  this.value · this.checked · this · event
Sinh: data-lenh="<khối>.<lệnh>" [data-su] [data-dong="1"] data-a1… và khối gdDangKy('<khối>', {...}) cuối file (mỗi lệnh gọi đúng HÀM cũ).
BỎ QUA (để làm tay, in ra danh sách): event.stopPropagation() (cần cha cũng chuyển), biểu thức chuỗi có .replace(/'/g, …) (thoát nháy kiểu JS),
  tham số ghép thô '+x+' (không biết kiểu), câu lệnh gán / nhiều lệnh, tên hàm động.
"""
import re, sys

TOK = re.compile(r"""\s*(?:
   \\''\+(?P<s>.+?)\+'\\'          # chuỗi từ biểu thức: \''+x+'\'
 | \\'(?P<l>[^\\']*)\\'             # chuỗi cố định: \'abc\'
 | (?P<n>-?\d+(?:\.\d+)?)(?![\w.])  # số
 | (?P<b>true|false|null)\b
 | (?P<v>this\.value|this\.checked|this|event)\b
)\s*(?:,|$)""", re.X)
ATTR = re.compile(r"""\bon(?P<su>click|change|input)="(?P<dong>dongHop\(\);)?(?P<fn>[A-Za-z_$][\w$]*)\((?P<args>[^"]*)\)(?P<rf>;return false)?\"""")

def tach(args):
    """→ [(loại, giá trị)] hoặc None nếu không phải dạng chuẩn"""
    if not args.strip(): return []
    ra, i = [], 0
    while i < len(args):
        m = TOK.match(args, i)
        if not m or m.end() == i: return None
        if m.group('s') is not None:
            x = m.group('s')
            if "replace(/'/g" in x or '\\' in x or "'+" in x or "+'" in x: return None
            ra.append(('s', x))
        elif m.group('l') is not None: ra.append(('l', m.group('l')))
        elif m.group('n') is not None: ra.append(('n', m.group('n')))
        elif m.group('b') is not None: ra.append(('b', m.group('b')))
        else: ra.append(('v', m.group('v')))
        i = m.end()
    return ra

LOAI_V = {'this.value':'v', 'this.checked':'c', 'this':'e', 'event':'E'}
def ky_hieu(a):   # chữ ký kiểu tham số: s chuỗi · n số · b true/false · z null · v this.value · c this.checked · e this · E event
    return ''.join('s' if k in 's l' else 'n' if k=='n' else ('z' if v=='null' else 'b') if k=='b' else LOAI_V[v] for k, v in a)

# Hàm mà chỗ khác TRA THEO CHỮ onclick (đánh dấu dòng chọn, nút đang bật…) — giữ onclick tới khi sửa chỗ tra (3.476)
BO_HAM = {'chonDong', 'doiNgan', 'doiCD', 'ktKHXepLai', 'ktKHXoa', 'ktKHApDoi', 'ktKHApMacDinhVe', 'boChonHS', 'quetThemHang', 'ccMo'}
def chuyen(src, khoi):
    theo_ham, lenh, bo, dem = {}, {}, [], [0]
    def trong_chu_thich(i):   # chỗ khớp nằm trong chú thích /* … */ hoặc // … cùng dòng → bỏ
        dau = src.rfind('\n', 0, i)+1; l = src[dau:i]
        return l.rfind('/*') > l.rfind('*/') or re.search(r"(^|[;{}\s])//", l) is not None
    def thay(m):
        if trong_chu_thich(m.start()): return m.group(0)
        a = tach(m.group('args'))
        if a is None: bo.append(m.group(0)[:140]); return m.group(0)
        fn, su, ky = m.group('fn'), m.group('su'), ky_hieu(a)
        if fn in BO_HAM: return m.group(0)
        if fn == 'dongHop' and not a and not m.group('dong') and su == 'click': dem[0] += 1; return 'data-lenh="hop.dong"'   # lệnh chung có sẵn (js/39)
        ds = theo_ham.setdefault(fn, {})
        if ky not in ds: ds[ky] = fn if not ds else fn+'_'+ky   # cùng hàm, khác kiểu tham số → lệnh riêng
        ten = ds[ky]; lenh[ten] = (fn, ky)
        du, j = '', 0
        for k, v in a:
            if k == 'v' or (k == 'b' and v == 'null'): continue
            j += 1
            du += ' data-a%d="%s"' % (j, "'+%s+'" % v if k == 's' else '1' if v == 'true' else '' if v == 'false' else v)
        dem[0] += 1
        return 'data-lenh="%s.%s"%s%s%s' % (khoi, ten, '' if su == 'click' else ' data-su="%s"' % su, ' data-dong="1"' if m.group('dong') else '', du)
    return ATTR.sub(thay, src), lenh, bo, dem[0]

def khoi_js(khoi, lenh, ban):
    dong = []
    for ten in sorted(lenh, key=str.lower):
        fn, ky = lenh[ten]; ts, j = [], 0
        for c in ky:
            if c in 'vceE': ts.append({'v':'el.value', 'c':'el.checked', 'e':'el', 'E':'ev'}[c]); continue
            if c == 'z': ts.append('null'); continue
            j += 1; ts.append({'s':'gdA(el, %d)', 'n':'+gdA(el, %d)', 'b':'!!gdA(el, %d)'}[c] % j)
        dong.append('  %s:function(el, ev){ %s(%s); }' % (ten, fn, ', '.join(ts)))
    return ('\n/* ---------- %s (Đ4 kế hoạch dọn): LỆNH data-lenh="%s.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng hàm cũ, tham số ở data-a1…, data-dong="1" = đóng hộp trước ---------- */\n'
            "gdDangKy('%s', gdLenh({\n%s\n}));\n") % (ban, khoi, khoi, ',\n'.join(dong))

if __name__ == '__main__':
    p, khoi = sys.argv[1], sys.argv[2]; thu = '--thu' in sys.argv
    src = open(p, encoding='utf-8').read()
    if "gdDangKy('%s'" % khoi in src: sys.exit('Đã có khối %s trong %s — chạy lại phải gộp tay.' % (khoi, p))
    ra, lenh, bo, n = chuyen(src, khoi)
    print('%s: chuyển %d chỗ · %d lệnh · bỏ qua %d' % (p, n, len(lenh), len(bo)))
    for b in bo: print('   bỏ qua:', b)
    if not thu and n and lenh:
        ban = sys.argv[sys.argv.index('--ban')+1] if '--ban' in sys.argv else '3.476'
        open(p, 'w', encoding='utf-8').write(ra.rstrip('\n')+'\n'+khoi_js(khoi, lenh, ban))
