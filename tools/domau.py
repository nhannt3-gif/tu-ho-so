# 3.223 M0 (anh chốt 16/10): ĐO MẪU GỐC — đọc file Word anh gửi (tests/mau_goc/*.docx) → tests/mau_goc/so_do.json
#   khổ, lề (mm), số trang (LibreOffice → PDF; Word có thể chênh 1 trang trắng), phông / cỡ chữ chính, độ rộng cột từng bảng (mm), chữ theo thứ tự đoạn.
#   Dùng: python3 tools/domau.py   (chạy lại khi thêm / thay file gốc). Cần soffice + pdfinfo.
import zipfile, re, json, os, subprocess, tempfile, glob, collections
G = os.path.join(os.path.dirname(__file__), '..', 'tests', 'mau_goc')
MM = lambda tw: round(int(tw)/56.6929, 1)   # twip → mm
def chu(x): return re.sub(r'\s+', ' ', x).strip()
def doc(f):
    z = zipfile.ZipFile(f); s = z.read('word/document.xml').decode('utf-8')
    pg = re.findall(r'<w:pgSz([^>]*)/>', s); mar = re.findall(r'<w:pgMar([^>]*)/>', s)
    a = lambda t, k: (re.search(k+r'="(\d+)"', t) or [None, '0'])[1]
    w, h = MM(a(pg[0], 'w:w')), MM(a(pg[0], 'w:h'))
    le = [MM(a(mar[0], 'w:'+k)) for k in ('top', 'right', 'bottom', 'left')]
    bang = [[MM(x) for x in re.findall(r'<w:gridCol w:w="(\d+)"', t)] for t in re.findall(r'<w:tblGrid>(.*?)</w:tblGrid>', s, re.S)]
    doan = []
    for p in re.findall(r'<w:p[ >].*?</w:p>', s, re.S):
        t = ''.join(re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>|<w:tab/>', p) and [m if m else '\t' for m in re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>|(?:<w:tab/>)', p)])
        t = chu(t.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>'))
        if t: doan.append(t)
    co = collections.Counter(re.findall(r'<w:sz w:val="(\d+)"', s)).most_common(1)
    ph = collections.Counter(re.findall(r'<w:rFonts [^>]*w:ascii="([^"]+)"', s)).most_common(1)
    return {'kho':[w, h], 'ngang':w>h, 'le':le, 'co':int(co[0][0])/2 if co else None, 'phong':ph[0][0] if ph else None, 'bang':bang, 'doan':doan}
def trang(f):   # → (số trang, [[trang, y mm, x mm, chữ đầu dòng]]) — vị trí dòng theo bản PDF LibreOffice của file Word
    d = tempfile.mkdtemp(); subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', d, f], capture_output=True, timeout=180)
    p = glob.glob(d+'/*.pdf')
    if not p: return None, []
    o = subprocess.run(['pdfinfo', p[0]], capture_output=True, text=True).stdout
    b = subprocess.run(['pdftotext', '-bbox', p[0], '-'], capture_output=True, text=True).stdout
    dong = []; pg = 0
    for m in re.finditer(r'<page |<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="[\d.]+" yMax="[\d.]+">([^<]*)</word>', b):
        if m.group(0).startswith('<page'): pg += 1; continue
        x, y, w = float(m.group(1))*25.4/72, float(m.group(2))*25.4/72, m.group(3)
        if dong and dong[-1][0]==pg and abs(dong[-1][1]-y)<1.2 and x>dong[-1][4]: dong[-1][3] += ' '+w; dong[-1][4] = x; continue
        dong.append([pg, round(y, 1), round(x, 1), w, x])
    return int(re.search(r'Pages:\s+(\d+)', o).group(1)), [x[:4] for x in dong]
R = {}
for f in sorted(glob.glob(os.path.join(G, '*.docx'))):
    k = os.path.basename(f)[:-5]; R[k] = doc(f); R[k]['trang'], R[k]['dong'] = trang(f)
    print(k, R[k]['kho'], R[k]['le'], R[k]['trang'], 'trang', R[k]['co'], 'pt', R[k]['phong'], len(R[k]['doan']), 'đoạn', len(R[k]['bang']), 'bảng')
json.dump(R, open(os.path.join(G, 'so_do.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
