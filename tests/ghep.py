#!/usr/bin/env python3
# 3.142 (đợt A): ghép index.html + css/*.css + js/*.js thành MỘT file HTML (như bản trước khi tách).
# Dùng cho kiem.py / bando.py, và để đối chiếu: python3 tests/ghep.py [file ra] (mặc định in kích thước).
import os, re, sys
GOC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
# 3.392: cho phép chú thích <!-- … --> sau thẻ và media="…" ở CSS (trước đây các dòng này bị bỏ qua → js/70–75, css/dt-may*.css không được kiem.py / bando.py đọc)
CSS = re.compile(r'^<link rel="stylesheet" href="([^"?]+)(?:\?v=[^"]*)?"(?: media="([^"]*)")?>(?:\s*<!--.*-->)?\s*$')
JS = re.compile(r'^<script src="([^"?]+)(?:\?v=[^"]*)?"></script>(?:\s*<!--.*-->)?\s*$')

def tep(goc=GOC):
    """Danh sách (loại, đường dẫn tương đối) theo đúng thứ tự index.html nạp."""
    ra = []
    for x in open(os.path.join(goc, 'index.html'), encoding='utf-8').read().split('\n'):
        m = CSS.match(x) or JS.match(x)
        if m: ra.append(('css' if m.re is CSS else 'js', m.group(1)))
    return ra

def ghep(goc=GOC):
    ra = []
    for x in open(os.path.join(goc, 'index.html'), encoding='utf-8').read().split('\n'):
        m = CSS.match(x) or JS.match(x)
        if m:
            the = 'style' if m.re is CSS else 'script'
            noi = open(os.path.join(goc, m.group(1)), encoding='utf-8').read()
            mo = ' media="%s"' % m.group(2) if m.re is CSS and m.group(2) else ''
            ra.append('<%s%s>\n%s</%s>' % (the, mo, noi, the))
        else:
            ra.append(x)
    return '\n'.join(ra)

if __name__ == '__main__':
    s = ghep()
    if len(sys.argv) > 1:
        open(sys.argv[1], 'w', encoding='utf-8').write(s); print('Đã ghép →', sys.argv[1])
    else:
        print('Ghép %d file · %d dòng · %d byte' % (len(tep()) + 1, s.count('\n') + 1, len(s.encode('utf-8'))))
