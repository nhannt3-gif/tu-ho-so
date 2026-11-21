#!/usr/bin/env python3
"""3.558 (chuẩn hóa — thước đo "dòng > 400"): tách dòng JS dài AN TOÀN.
Chỉ xuống dòng ngay sau dấu + hoặc , nằm NGOÀI chuỗi / chú thích (biểu thức còn tiếp → JS không tự chèn ;, ý nghĩa không đổi).
Dòng thụt theo dòng gốc + 2. Kiểm: bỏ phần xuống dòng đã thêm phải ra đúng file cũ; `node --check` sau khi tách.
Dùng: python3 tools/tach_dong.py js/22c-ktgs-m06.js [js/…] [--max 400] [--dich 200]"""
import sys, re, subprocess
def tach(dong, dich):
    thut = re.match(r'\s*', dong).group(0) + '  '
    ra, bd, q, i, n, dem = [], 0, None, 0, len(dong), 0
    while i < n:
        c = dong[i]
        if q:
            if c == '\\': i += 2; continue
            if c == q: q = None
        elif c in '\'"`': q = c
        elif c == '/' and i+1 < n and dong[i+1] == '/': break   # chú thích cuối dòng — để nguyên
        elif c == '/' and i+1 < n and dong[i+1] == '*':
            j = dong.find('*/', i+2); i = (j+2) if j >= 0 else n; continue
        elif c == '/':   # có thể là regex — bỏ qua tới / đóng trên cùng dòng nếu trước đó là toán tử
            k = i-1
            while k >= 0 and dong[k] == ' ': k -= 1
            if k < 0 or dong[k] in '(,=:[!&|?{};+': 
                j, lop = i+1, False
                while j < n:
                    if dong[j] == '\\': j += 2; continue
                    if dong[j] == '[': lop = True
                    elif dong[j] == ']': lop = False
                    elif dong[j] == '/' and not lop: break
                    j += 1
                i = j+1; continue
        elif c in '+,' and i - bd >= dich and i+1 < n and dong[i+1] != '+' and (c != '+' or dong[i-1] != '+'):
            ra.append(dong[bd:i+1].rstrip()); bd = i+1
            while bd < n and dong[bd] == ' ': bd += 1
            dem += 1
        i += 1
    ra.append(dong[bd:])
    return ra[0] + ''.join('\n' + thut + x for x in ra[1:]), dem
def main():
    a = sys.argv[1:]; mx = 400; dich = 200
    if '--max' in a: k = a.index('--max'); mx = int(a[k+1]); del a[k:k+2]
    if '--dich' in a: k = a.index('--dich'); dich = int(a[k+1]); del a[k:k+2]
    for f in a:
        goc = open(f, encoding='utf-8').read(); dong = goc.split('\n'); moi = []; tong = 0
        for d in dong:
            if len(d) > mx: x, k = tach(d, dich); moi.append(x); tong += k
            else: moi.append(d)
        s = '\n'.join(moi)
        if re.sub(r'\s+', '', s) != re.sub(r'\s+', '', goc): print(f, 'SAI — bỏ xuống dòng không ra file cũ'); continue
        open(f, 'w', encoding='utf-8').write(s)
        r = subprocess.run(['node', '--check', f], capture_output=True, text=True)
        if r.returncode: open(f, 'w', encoding='utf-8').write(goc); print(f, 'LỖI CÚ PHÁP — trả lại file cũ:', r.stderr.strip()[:200]); continue
        con = sum(1 for d in s.split('\n') if len(d) > mx)
        print(f, 'tách', tong, 'chỗ · còn', con, 'dòng >', mx)
main()
