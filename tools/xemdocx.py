# 3.223: XEM CẤU TRÚC file Word gốc (đoạn: canh, thụt, cách dòng, cỡ, đậm; bảng: độ rộng cột) — để dựng mẫu đúng form. Dùng: python3 tools/xemdocx.py tests/mau_goc/01td.docx
import zipfile, re, sys
s = zipfile.ZipFile(sys.argv[1]).read('word/document.xml').decode('utf-8')
body = re.search(r'<w:body>(.*)</w:body>', s, re.S).group(1)
tw = lambda x: round(int(x)/56.6929, 1)
def doan(p, lui=''):
    pp = (re.search(r'<w:pPr>(.*?)</w:pPr>', p, re.S) or [None, ''])[1]
    jc = (re.search(r'<w:jc w:val="(\w+)"', pp) or [None, ''])[1]
    ind = ' '.join('%s=%s' % (k[0], tw(v)) for k, v in re.findall(r'w:(left|right|firstLine|hanging|start|end)="(-?\d+)"', (re.search(r'<w:ind [^>]*>', pp) or [''])[0]))
    sp = (re.search(r'<w:spacing [^>]*>', pp) or [''])[0]; sp = ' '.join('%s=%s' % (k, v) for k, v in re.findall(r'w:(before|after|line|lineRule)="(\w+)"', sp))
    runs = []
    for r in re.findall(r'<w:r[ >].*?</w:r>', p, re.S):
        rp = (re.search(r'<w:rPr>(.*?)</w:rPr>', r, re.S) or [None, ''])[1]
        t = ''.join(m if m else '⇥' for m in re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>|<w:tab/>', r))
        if not t: continue
        f = ('B' if re.search(r'<w:b/>|<w:b w:val="(1|true)"', rp) else '')+('I' if re.search(r'<w:i/>|<w:i w:val="(1|true)"', rp) else '')+('U' if '<w:u ' in rp else '')
        sz = (re.search(r'<w:sz w:val="(\d+)"', rp) or [None, ''])[1]
        runs.append(('[%s%s]' % (f, (str(int(sz)/2) if sz else '')) if (f or sz) else '')+t)
    tabs = re.findall(r'<w:tab w:val="(\w+)"[^>]*w:pos="(\d+)"', pp)
    print(lui+'P', jc or '-', ind, sp, ('tabs='+','.join('%s@%s' % (a, tw(b)) for a, b in tabs)) if tabs else '', '|', ''.join(runs)[:220])
i = 0
for m in re.finditer(r'<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>', body, re.S):
    x = m.group(0)
    if x.startswith('<w:tbl>'):
        g = [tw(v) for v in re.findall(r'<w:gridCol w:w="(\d+)"', x)]; print('TABLE cols(mm)=', g)
        for ri, row in enumerate(re.findall(r'<w:tr[ >].*?</w:tr>', x, re.S)):
            for ci, c in enumerate(re.findall(r'<w:tc>.*?</w:tc>', row, re.S)):
                for p in re.findall(r'<w:p[ >].*?</w:p>', c, re.S): doan(p, '   r%d c%d ' % (ri, ci))
    else: doan(x)
