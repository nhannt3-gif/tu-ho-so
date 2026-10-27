#!/usr/bin/env python3
"""Hồi quy theo phụ thuộc (anh 26/10: "chức năng nào đã chốt đánh dấu ổn thì chỉ đọc từ nó, không làm thay đổi nên không cần chạy lại").

Mỗi phép thử (tests/t*.js, hoiquy, hoiquy2) dựa vào:
  - PHẦN CHUNG (khung app, KHO, bộ lọc, hộp thoại…): đổi 1 file chung → mọi phép thử chạy lại (đúng luật CLAUDE.md "đụng phần chung → hồi quy đủ");
  - file JS định nghĩa hàm / biến mà phép thử gọi tên (dò theo chữ trong phép thử, 1 tầng);
  - css/app.css nếu phép thử đo bố cục; tệp phụ phép thử nạp (tv.js, fakedrive.js, chuan_lay.js…); bộ sinh dữ liệu giả (taogia.py) nếu dùng gianho31 / gia31.
Phép thử đạt → lưu "dấu vân tay" (sha1 các file trên) vào tests/hoiquy_moc.json = ĐÃ CHỐT.
Chế độ `doi` của tools/hoiquy.sh chỉ chạy phép thử chưa chốt hoặc có file phụ thuộc đã đổi. Phép dò 1 tầng có thể sót → hồi quy đủ định kỳ 3–4 bản.

Lệnh:
  python3 tools/hoiquy_pt.py chon [--goc DIR]          in danh sách phép thử cần chạy (stderr: tóm tắt)
  python3 tools/hoiquy_pt.py ghi TONG.txt [--goc DIR]  ghi mốc theo kết quả 1 lượt (đạt → chốt, trượt → bỏ chốt)
  python3 tools/hoiquy_pt.py xem TEN [--goc DIR]       phép thử TEN dựa vào file nào, đổi gì so với mốc
  python3 tools/hoiquy_pt.py bang                      sinh docs/DA_CHOT.md (bảng chức năng đã chốt)
"""
import sys, os, re, json, glob, hashlib, datetime

G = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MOC = os.path.join(G, 'tests', 'hoiquy_moc.json')
# phần chung: đổi → chạy lại hết (khung, khởi động, lưu, KHO, bộ lọc địa bàn, hộp thoại, lệnh GD, giao diện chung)
CHUNG = ['index.html', 'js/01-thu-vien.js', 'js/02-nen.js', 'js/04-giao-dien.js', 'js/06-hop-thoai.js', 'js/11-khung-tab.js',
         'js/17-dong-bo-cai-dat.js', 'js/20-khoi-dong.js', 'js/22-so-lieu.js', 'js/22g-to.js', 'js/22ga-pham-vi.js', 'js/23-dieu-huong.js',
         'js/29-kho.js', 'js/34-luu-ngan.js', 'js/36-dong-bo-khoi.js', 'js/39-gd.js', 'js/69-bo-cuc-a.js', 'js/73-kho-chuan.js', 'tests/tv.js']
DO_BO_CUC = re.compile(r'getBoundingClientRect|getComputedStyle|scrollWidth|offsetWidth|offsetParent|clientWidth|screenshot|setViewportSize')
LUON = re.compile(r'kiem\.py|bando\.py|CO_GI_MOI|CHANGELOG')   # phép thử chạy công cụ / đọc tài liệu đổi mỗi bản → luôn chạy


def doc(goc, f):
    p = os.path.join(goc, f)
    if os.path.isdir(p):
        return ''.join(doc(goc, os.path.relpath(x, goc)) for x in sorted(glob.glob(p + '/**', recursive=True)) if os.path.isfile(x))
    try:
        return open(p, encoding='utf-8', errors='replace').read()
    except OSError:
        return ''


def chuan(f, s):
    """bỏ phần đổi theo MỖI bản (số bản, giờ, Có gì mới) — không phải đổi chức năng"""
    if f in ('index.html', 'dt.html', 'dt-sw.js'):
        s = re.sub(r'\?v=[\w.\-]+', '', s)
        s = re.sub(r'\b3\.\d{3}(\.\d+)*\b', 'V', s)
    if f == 'js/02-nen.js':
        s = re.sub(r'var APP_BAN = .*', '', s)
    if f == 'js/06-hop-thoai.js':
        a, b = s.find('var CO_GI_MOI'), s.find('function noiDungCoGiMoi')
        if a >= 0 and b > a:
            s = s[:a] + s[b:]
    return s


def dau(goc, f):
    return hashlib.sha1(chuan(f, doc(goc, f)).encode('utf-8', 'replace')).hexdigest()[:12]


def dinh_nghia(goc):
    m = {}
    for f in sorted(glob.glob(os.path.join(goc, 'js', '*.js'))):
        rel = os.path.relpath(f, goc)
        for l in open(f, encoding='utf-8', errors='replace'):
            for r in (r'^function\s+([A-Za-z_$][\w$]*)', r'^var\s+([A-Za-z_$][\w$]*)', r'^([A-Z][A-Z0-9_]+)\s*='):
                x = re.match(r, l)
                if x:
                    m.setdefault(x.group(1), rel)
    return m


def ds_phep(goc):
    ds = ['hoiquy', 'hoiquy2'] + sorted(os.path.basename(f)[:-3] for f in glob.glob(os.path.join(goc, 'tests', 't[1-3][0-9][0-9].js')))
    return [t for t in ds if os.path.exists(os.path.join(goc, 'tests', t + '.js'))]


def phu_thuoc(goc, t, dn=None):
    dn = dn if dn is not None else dinh_nghia(goc)
    s = doc(goc, 'tests/%s.js' % t)
    pt = set(CHUNG) | {'tests/%s.js' % t}
    for x in re.findall(r"require\('\./([\w.]+\.js)'\)", s):
        pt.add('tests/' + x)
        if x == 'chuan_lay.js':
            pt.add('tests/chuan')
            s += doc(goc, 'tests/chuan_lay.js')
    if re.search(r'gianho31|gia31|gianho\b|\bgia\b', s):
        pt.add('tests/taogia.py')
    if DO_BO_CUC.search(s):
        pt.add('css/app.css')
    for f in re.findall(r"['\"/]((?:js|css)/[\w\-]+\.(?:js|css))", s):
        pt.add(f)
    if re.search(r'dt\.html', s):
        pt |= {'dt.html', 'dt-sw.js'}
    for w in set(re.findall(r'\b[A-Za-z_$][\w$]*\b', s)):
        if w in dn:
            pt.add(dn[w])
    return sorted(x for x in pt if os.path.exists(os.path.join(goc, x))), bool(LUON.search(s))


def doc_moc():
    return json.load(open(MOC, encoding='utf-8')) if os.path.exists(MOC) else {}


def lay_goc():
    if '--goc' in sys.argv:
        i = sys.argv.index('--goc'); g = sys.argv[i + 1]; del sys.argv[i:i + 2]; return os.path.abspath(g)
    return G


def chon(goc):
    moc, dn, chay, ly = doc_moc(), dinh_nghia(goc), [], {'chua': 0, 'doi': 0, 'luon': 0, 'chot': 0}
    for t in ds_phep(goc):
        pt, luon = phu_thuoc(goc, t, dn)
        m = moc.get(t)
        if luon:
            chay.append(t); ly['luon'] += 1
        elif not m:
            chay.append(t); ly['chua'] += 1
        elif any(m['dau'].get(f) != dau(goc, f) for f in pt) or set(m['dau']) != set(pt):
            chay.append(t); ly['doi'] += 1
        else:
            ly['chot'] += 1
    sys.stderr.write('Hồi quy theo đổi: chạy %d (chưa chốt %d · file phụ thuộc đổi %d · luôn chạy %d) · bỏ qua %d đã chốt không đổi\n'
                     % (len(chay), ly['chua'], ly['doi'], ly['luon'], ly['chot']))
    print(' '.join(chay))


def ban(goc):
    x = re.search(r"var APP_BAN = '([^']+)'", doc(goc, 'js/02-nen.js'))
    return x.group(1) if x else ''


def ghi(goc, tong):
    moc, dn, b, hom = doc_moc(), dinh_nghia(goc), ban(goc), datetime.date.today().isoformat()
    dat = truot = 0
    for l in open(tong, encoding='utf-8', errors='replace'):
        p = l.split()
        if len(p) < 3 or not p[2].startswith('✗='):
            continue
        t, ma, sai = p[0], p[1], p[2][2:]
        if ma == '0' and sai == '0':
            pt, _ = phu_thuoc(goc, t, dn)
            cu = moc.get(t, {})
            moc[t] = {'ban': cu.get('ban') if cu.get('dau') == {f: dau(goc, f) for f in pt} else b, 'ngay': hom, 'kq': ' '.join(p[3:])[:60],
                      'dau': {f: dau(goc, f) for f in pt}}
            moc[t]['ban'] = moc[t]['ban'] or b
            dat += 1
        else:
            moc.pop(t, None); truot += 1
    json.dump(dict(sorted(moc.items())), open(MOC, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print('Mốc hồi quy: %d phép đạt → đã chốt, %d trượt → bỏ chốt · tổng đã chốt %d' % (dat, truot, len(moc)))


def xem(goc, t):
    moc, (pt, luon) = doc_moc().get(t), phu_thuoc(goc, t)
    print('%s%s — dựa vào %d file:' % (t, ' (luôn chạy)' if luon else '', len(pt)))
    for f in pt:
        d = dau(goc, f)
        print('  %s %s' % ('  ' if moc and moc['dau'].get(f) == d else ('✱ ' if moc else '? '), f))
    print('Mốc:', ('đã chốt từ bản %s (%s)' % (moc['ban'], moc['ngay'])) if moc else 'chưa chốt')


def mo_ta(t):
    for l in doc(G, 'tests/%s.js' % t).split('\n')[:3]:
        l = l.strip()
        if l.startswith('//'):
            return re.sub(r'\s+', ' ', l.lstrip('/ ').strip())[:150]
    return ''


def bang():
    moc = doc_moc()
    h = ['# Chức năng đã chốt (tự sinh — `python3 tools/hoiquy_pt.py bang`, đừng sửa tay)', '',
         'Phép thử đạt và các file nó dựa vào chưa đổi từ lần đạt đó → chức năng coi là **đã chốt**; chế độ hồi quy `doi` không chạy lại (luật: `tests/README.md`).', '',
         '| Phép thử | Chốt từ bản | Lần đạt | Kiểm gì |', '|---|---|---|---|']
    for t, m in moc.items():
        h.append('| %s | %s | %s | %s |' % (t, m.get('ban', ''), m.get('ngay', ''), mo_ta(t).replace('|', '/')))
    h.append(''); h.append('Tổng %d phép đã chốt / %d phép thử.' % (len(moc), len(ds_phep(G))))
    open(os.path.join(G, 'docs', 'DA_CHOT.md'), 'w', encoding='utf-8').write('\n'.join(h) + '\n')
    print('docs/DA_CHOT.md: %d phép đã chốt' % len(moc))


if __name__ == '__main__':
    goc = lay_goc(); a = sys.argv[1:] or ['chon']
    {'chon': lambda: chon(goc), 'ghi': lambda: ghi(goc, a[1]), 'xem': lambda: xem(goc, a[1]), 'bang': bang}[a[0]]()
