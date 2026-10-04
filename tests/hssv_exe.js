// So công thức Hạn trả HSSV giữa app (index.html) và công cụ riêng tools/hssv/HanTraHSSV.exe (cần mono).
// Chạy: tools/hssv/dung.sh && node tests/hssv_exe.js [số ca, mặc định 3000]
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const a = html.indexOf('function hsDoc('), b = html.indexOf('function hsGT(');
const ctx = {homNay: new Date(2026, 9, 4, 12)};
vm.createContext(ctx);
vm.runInContext('function hai(n){ return (n<10?"0":"")+n; } function nay(){ return homNay; }\n' + html.slice(a, b), ctx);
const N = +process.argv[2] || 3000;
let seed = 20261004; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const ng = d => ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();
const ca = [];
/* ca cố định (anh chốt) + ngẫu nhiên; thêm vài ca lỗi / biên */
[['07/10/2026','30/08/2030','07','160','tren','04/10/2026'],['15/09/2026','15/12/2028','7','','tren','04/10/2026'],['15/09/2026','15/02/2030','31','140','duoi','04/10/2026'],
 ['15/09/2026','15/01/2030','30','120','tren','15/02/2026'],['31/01/2027','29/02/2028','29','40','tren','30/11/2026'],['abc','30/08/2030','07','160','tren','04/10/2026'],
 ['07/10/2026','01/10/2026','07','160','tren','04/10/2026'],['07/10/2026','30/08/2030','0','160','tren','04/10/2026'],['071026','300830','15','33,5','tren','04/10/2026'],['07102026','30082030','15','7','duoi','31/12/2026']].forEach(x=>ca.push(x));
for(let i=0; i<N; i++){
  const v = new Date(2024 + Math.floor(rnd()*4), Math.floor(rnd()*12), 1 + Math.floor(rnd()*31), 12);
  const r = new Date(v.getTime() + (30 + Math.floor(rnd()*1900))*864e5);
  const h = new Date(2025 + Math.floor(rnd()*3), Math.floor(rnd()*12), 1 + Math.floor(rnd()*28), 12);
  const tien = rnd()<0.2 ? '' : String(Math.round(rnd()*30)*5 + (rnd()<0.1 ? 0.3 : 0));
  ca.push([ng(v), ng(r), String(1 + Math.floor(rnd()*31)), tien, rnd()<0.25 ? 'duoi' : 'tren', ng(h)]);
}
const jsRa = ca.map(c => {
  vm.runInContext('homNay = hsDoc('+JSON.stringify(c[5])+')', ctx);
  const v = {vay:c[0], rt:c[1], gdx:c[2], tien:c[3], loai:c[4]};
  const kq = ctx.hsTinh(v), gy = ctx.hsGoiY(v);
  let s = ctx.hsVayGoiY(c[2]) + '|' + (gy ? [gy.nua, gy.thang, gy.trieu, gy.nam, gy.ds.join(';')].join(',') : '') + '|';
  if(kq.loi.length) s += 'LOI:' + kq.loi.join(';');
  else s += [kq.tp, kq.soNgay, kq.ttn, kq.thoiHan, ctx.hsNgay(kq.hc), ctx.hsNgay(kq.hcGD), kq.kiem?1:0, kq.T||0, kq.moi||0, kq.cuoiTien||0].join(',') + '|' +
    kq.ky.map(x => ctx.hsNgay(x.ngay)+':'+(x.tien!==undefined ? x.tien : '')).join(';') + '|' + kq.cau;
  return s;
});
const exe = path.join(__dirname, '..', 'tools', 'hssv', 'HanTraHSSV.exe');
const out = cp.execFileSync('mono', [exe, '--kiem'], {input: ca.map(c=>c.join('|')).join('\n')+'\n', maxBuffer: 1<<28}).toString().replace(/﻿/g, '').split('\n').filter(Boolean);
let sai = 0;
ca.forEach((c, i) => { if(out[i]!==jsRa[i]){ if(sai<8) console.log('✗ '+c.join('|')+'\n   app: '+jsRa[i]+'\n   exe: '+out[i]); sai++; } });
console.log((sai ? '✗ ' : '✓ ') + 'HSSV app ↔ exe: ' + (ca.length - sai) + '/' + ca.length + ' ca khớp');
process.exit(sai ? 1 : 0);
