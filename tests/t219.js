// 3.287 — Ctrl+V file: tab Văn bản → văn bản; tab Scan → ảnh CCCD vào hàng quét (chế độ Thẻ); hộp 🪪 Quét CCCD đang mở → ảnh vào hộp; tab khác → chỉ báo. Ảnh GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const anh = await new Promise(r=>{ const c=document.createElement('canvas'); c.width=856; c.height=540; const g=c.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,856,540); g.fillStyle='#c33'; g.fillRect(60,60,736,420); c.toBlob(r,'image/jpeg',0.9); });
   const dan = (fs) => { const dt = new DataTransfer(); fs.forEach(f=>dt.items.add(f)); document.dispatchEvent(new ClipboardEvent('paste', {clipboardData:dt, bubbles:true, cancelable:true})); };
   let goi = 0; const gtf = gioiThieuFile; gioiThieuFile = function(){ goi++; };
   const vb0 = D.vanBan.length;
   /* tab Hôm nay → không thêm gì */
   doiNgan(0); await w(200); let baoChu = ''; const gb = bao; bao = t=>{ baoChu = t; };
   dan([new File([anh], 'cccd.jpg', {type:'image/jpeg'})]); await w(300);
   ok('tab khác (Hôm nay): dán file không thêm văn bản, chỉ báo chỗ dán', goi===0 && D.vanBan.length===vb0 && /tab 📄 Văn bản.*tab Scan/.test(baoChu), baoChu);
   /* tab Văn bản → như cũ */
   doiNgan(1); await w(200); dan([new File(['x'], 'cong-van.pdf', {type:'application/pdf'})]); await w(200);
   ok('tab Văn bản: dán file → thêm văn bản như cũ', goi===1);
   /* tab Scan → ảnh CCCD vào hàng quét chế độ Thẻ */
   doiNgan(4); await w(300); SC.che = 'tailieu'; HANG.length = 0;
   dan([new File([anh], 'cccd.jpg', {type:'image/jpeg'})]); for(let i=0;i<40 && !HANG.length;i++) await w(200); await w(300);
   ok('tab Scan: dán ảnh → vào hàng quét chế độ Thẻ (CCCD), không thành văn bản', HANG.length>=1 && SC.che==='the' && goi===1 && D.vanBan.length===vb0, JSON.stringify({n:HANG.length, che:SC.che}));
   try{ dongHop(); }catch(e){} HANG.length = 0;
   /* hộp Quét CCCD đang mở → ảnh vào hộp */
   qcMo({loai:'tra', o:'x'}); await w(200); let doc = 0; const gq = qcDoc; qcDoc = function(){ doc++; };
   dan([new File([anh], 'the.png', {type:'image/png'})]); await w(300); qcDoc = gq;
   ok('hộp 🪪 Quét CCCD đang mở: dán ảnh → hộp đọc ảnh đó', doc===1 && QC.anh.length===1 && QC.tu==='file');
   dongHop(); bao = gb; gioiThieuFile = gtf;
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
