// 3.427 (anh 01/11 chốt ý 3): 🔎 so file giao ban DOI_CHIEU_GB (js/90) — đọc CSV hợp đồng (dòng "#" ghi chú), so từng tổ × cột với số app,
//   tự phân loại A (cùng luật lệch) · B (so_tv QT-C-14 / so_mon_khd K5) · C (khác ngày) · D (làm tròn ≤ 1 đ) · ? (dòng 1 bên) — không đoán. Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; const K = await KHO.nap('2026-08'), dong = slDCGBTinh(K).dong, C = SL_DC_COT;
   const gb = dong.map(r=>r.slice()); const i = (c)=>C.indexOf(c);
   gb[0][i('du_no')] += 1000000;   /* A */
   gb[1][i('so_tv')] += 2;          /* B (QT-C-14) */
   gb[2][i('tien_gui')] += 1;       /* D */
   gb[3][i('hoi')] = gb[3][i('hoi')]==='ĐTN' ? 'DTN' : gb[3][i('hoi')];   /* DTN ≡ ĐTN — không lệch */
   const bo = gb.splice(4, 1)[0];   /* ? dòng chỉ có ở app */
   const csv = '﻿# bên=GB · ngày số liệu=2026-08-31\r\n'+[C].concat(gb).map(r=>r.join(',')).join('\r\n');
   const G = sgDoc(csv); ok('đọc CSV: bỏ dòng "#", lấy ngày số liệu, đủ dòng', !G.loi && G.ngay==='2026-08-31' && Object.keys(G.ds).length===gb.length, G.ngay+' · '+Object.keys(G.ds).length);
   const q = sgSo(dong, G, K.ngay), co = (k, c, l)=>q.dong.some(x=>x.khoa===String(k) && x.cot===c && x.loai===l);
   ok('A: dư nợ lệch 1 triệu', co(dong[0][0], 'du_no', 'A') && q.dem.A===1, JSON.stringify(q.dem));
   ok('B: so_tv lệch → khác định nghĩa QT-C-14', co(dong[1][0], 'so_tv', 'B'));
   ok('D: tiền gửi lệch 1 đồng → làm tròn', co(dong[2][0], 'tien_gui', 'D'));
   ok('DTN ≡ ĐTN không tính lệch', !q.dong.some(x=>x.khoa===String(dong[3][0]) && x.cot==='hoi'));
   ok('?: dòng chỉ có ở app → chưa phân loại (không đoán)', q.dong.some(x=>x.khoa===String(bo[0]) && x.loai==='?'));
   ok('tổng tiền 2 bên: chênh dư nợ = tổng lệch', Math.round(q.tong.du_no.app - q.tong.du_no.gb)===Math.round(+bo[i('du_no')] - 1000000), Math.round(q.tong.du_no.app - q.tong.du_no.gb));
   const q2 = sgSo(dong, sgDoc(csv.replace('2026-08-31', '2026-08-30')), K.ngay);
   ok('khác ngày số liệu → lệch cùng luật chuyển thành C', q2.dem.A===0 && q2.dem.C===1, JSON.stringify(q2.dem));
   ok('nút 🔎 So file giao ban cạnh 📤 File đối chiếu giao ban', /sg\.mo/.test(slDCNut('2026-08')));
   SG.kq = q; SG.kq.ten = 'DOI_CHIEU_GB_2026-08-31.csv'; SG.loc = 'A'; sgVe();
   ok('hộp kết quả: chip A–D/?, bảng tổng tiền, bảng lệch, nút CSV', /Tổng giao ban/.test(document.getElementById('hop-in').textContent) && document.querySelectorAll('[data-lenh="sg.loc"]').length===6 && !!document.querySelector('[data-lenh="sg.csv"]'));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
