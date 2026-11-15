// 3.504 (rà soát 08/11 — Đợt 2 mục 6, QUY_CHUAN §18.3): BỘ GIẢ "GIỐNG FILE THẬT" — biến thể của tests/gianho31 theo các kiểu file hệ thống hay gặp
//   (không dữ liệu thật): Thông tin tổ trưởng ghi Tên xã / Tên thôn TOÀN CHỮ HOA + khoảng trắng thừa, tên tổ trưởng có "Ông" và 2 khoảng trắng;
//   Mẫu 31: tên khách thừa khoảng trắng (giữa / cuối), 1 phần ô SĐT · ngày sinh trống, mã tổ mất số 0 đầu (ô số).
// Dùng: const that = require('./gia_that.js'); const files = that.docBo(); → [{n, b}] (base64) như gianho31 nhưng đã biến đổi trong trình duyệt bằng that.bienDoi(p, files)
const fs = require('fs'), path = require('path');
exports.docBo = function(){ const dir = path.join(__dirname, 'gianho31'); return fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')})); };
/* chạy trong trang (có XLSX của app): trả mảng File đã biến đổi + đếm số ô đã đổi */
exports.bienDoi = function(p, files){
  return p.evaluate(files => {
    const N = c => String(c == null ? '' : c).trim(), dem = {xa:0, thon:0, tt:0, ten:0, trong:0, ma:0}, ra = [];
    for(const f of files){
      const bin = atob(f.b); let u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i);
      const tt = /^Thong tin to truong/i.test(f.n), m31 = /^Ho_so_tin_dung_chi_tiet_31-08-2026/i.test(f.n);
      if(tt || m31){
        const wb = XLSX.read(u, {type:'array'}), sh = wb.Sheets[wb.SheetNames[0]], a = XLSX.utils.sheet_to_json(sh, {header:1, defval:''});
        const h = a.findIndex(r => r.some(c => N(c)==='Tên xã')), cot = t => a[h].findIndex(c => N(c)===t);
        for(let r=h+1, k=0; r<a.length; r++){ const d = a[r]; if(!d.some(c => N(c))) continue; k++;
          if(tt){
            const cx = cot('Tên xã'), ct = cot('Tên thôn'), cn = cot('Tên tổ trưởng');
            if(cx>=0 && N(d[cx])){ d[cx] = ' '+N(d[cx]).toUpperCase()+'  '; dem.xa++; }
            if(ct>=0 && N(d[ct])){ d[ct] = N(d[ct]).toUpperCase()+' '; dem.thon++; }
            if(cn>=0 && N(d[cn]) && k%3===0){ d[cn] = 'Ông  '+N(d[cn]).replace(/ /g, '  '); dem.tt++; }
          } else {
            const ck = cot('Tên KH'), cs = cot('Số điện thoại'), cns = cot('Ngày sinh'), cm = cot('Mã tổ');
            if(ck>=0 && k%5===0){ d[ck] = N(d[ck]).replace(' ', '  ')+' '; dem.ten++; }
            if(k%9===0){ if(cs>=0) d[cs] = ''; if(cns>=0) d[cns] = ''; dem.trong++; }
            if(cm>=0 && /^0\d+$/.test(N(d[cm])) && k%4===0){ d[cm] = +N(d[cm]); dem.ma++; }
          }
        }
        wb.Sheets[wb.SheetNames[0]] = XLSX.utils.aoa_to_sheet(a); u = new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'}));
      }
      let s = ''; for(let i=0;i<u.length;i++) s += String.fromCharCode(u[i]); ra.push({n:f.n, b:btoa(s)});
    }
    return {files:ra, dem};
  }, files);
};
