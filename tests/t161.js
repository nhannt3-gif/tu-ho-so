// 3.166 (anh chốt, BAN_GIAO_3161.md §2.5) — thanh chọn nhiều có cả 📋 Chép n file và 🗑 Xóa n file; chưa cầu nối → hộp chia sẻ (Windows: nút Sao chép);
//   không hộp chia sẻ → tải về; có cầu nối → chép (chepNhieu). Khung xem 1 file trên máy tính: thêm 🪟 Hộp chia sẻ Windows. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const bl = new Blob(['%PDF-1.4 gia'], {type:'application/pdf'});
   D.vanBan = [{id:'v1', nhom:'vanBan', tenMoi:'2026-09-25 01-GIA Van ban 1.pdf', ngay:'2026-09-25', co:bl.size}, {id:'v2', nhom:'vanBan', tenMoi:'2026-09-26 02-GIA Van ban 2.pdf', ngay:'2026-09-26', co:bl.size}];
   await luuFile('v1', bl); await luuFile('v2', bl); luu(); doiNgan(1); await w(400);
   batBot('vanBan'); await w(300); BOT.chon = {v1:1, v2:1}; capNhatBot();
   const th = document.querySelector('.thanh-bot'), cp = th && th.querySelector('.bot-chep'), xo = th && th.querySelector('.bot-nut');
   ok('thanh chọn nhiều có cả 📋 Chép n file và Xóa n file', !!cp && /📋 Chép 2 file/.test(cp.textContent) && !cp.disabled && /Xóa 2 file/.test(xo.textContent), cp && cp.textContent);
   /* chưa cầu nối + có hộp chia sẻ */
   let chia = null; const cs0 = navigator.canShare, sh0 = navigator.share;
   navigator.canShare = () => true; navigator.share = d => { chia = d; return Promise.resolve(); };
   window.coCauNoi = () => false; botChep(); for(let i=0;i<20 && !chia;i++) await w(100);
   ok('chưa cầu nối → mở hộp chia sẻ với đủ 2 file', !!chia && chia.files.length===2 && chia.files[0].name==='2026-09-25 01-GIA Van ban 1.pdf', chia && chia.files.map(f=>f.name).join(' | '));
   /* không hộp chia sẻ → tải về */
   navigator.canShare = undefined; let tai = []; const tx = window.taiXuongBlob; window.taiXuongBlob = (b, n) => tai.push(n);
   botChep(); await w(1200);
   ok('không có hộp chia sẻ → tải về từng file', tai.length===2, tai.join(' | ')); window.taiXuongBlob = tx;
   /* có cầu nối → chepNhieu */
   let goi = null; const cn = window.chepNhieu; window.coCauNoi = () => true; window.chepNhieu = ds => { goi = ds; };
   capNhatBot(); botChep();
   ok('có cầu nối → chép bằng cầu nối (chepNhieu) đủ 2 mục', !!goi && goi.length===2); window.chepNhieu = cn;
   thoiBot();
   /* khung xem 1 file: nút hộp chia sẻ Windows */
   navigator.canShare = () => true; mucDangXem = D.vanBan[0]; const lmb = window.laMayBan; window.laMayBan = () => true;
   guiFileMenu({stopPropagation(){}, currentTarget:document.body, target:document.body}); await w(100);
   ok('khung xem 1 file (máy tính): menu Gửi có 🪟 Hộp chia sẻ Windows (Sao chép)', /Hộp chia sẻ Windows/.test(document.getElementById('menu').textContent));
   chia = null; guiChiaSeFile(); for(let i=0;i<20 && !chia;i++) await w(100);
   ok('bấm → mở hộp chia sẻ với file đang xem', !!chia && chia.files.length===1);
   window.laMayBan = lmb; navigator.canShare = cs0; navigator.share = sh0;
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
