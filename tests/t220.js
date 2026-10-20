// 3.290 — lưu 1 lượt quét nhiều người vào Chờ sắp xếp: mỗi người đọc được thẻ → tên "cccd-Họ tên - số CCCD" + lưu số CCCD;
// bản cũ tên tự đặt "Scan … - người n" → ⏳ Chờ sắp xếp đọc ra số thì đổi tên theo thẻ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const anh = await new Promise(r=>{ const c=document.createElement('canvas'); c.width=856; c.height=540; c.getContext('2d').fillRect(0,0,10,10); c.toBlob(r,'image/jpeg',0.9); });
   doiNgan(4); await w(200); SC.che = 'the'; HANG = [];
   for(let i=0;i<6;i++){ const id = 't220h'+i; await luuAnhHS(id, anh); HANG.push({id, kieu:'anh', che:'the'}); }
   SX = {ten:'Scan 20-10-2026 - nguoi', bl:new Blob(['x'])};
   SX_DOC = [{cccd:'079000000101', ten:'NGUYỄN VĂN GIẢ', cmnd:'111222333', tim:{}}, {}, {cccd:'079000000303', ten:'TRAN THI GIA', tim:{}}];
   const n0 = D.scan.length; henDongBoScan = function(){};
   scanLuuApp(); for(let i=0;i<40 && D.scan.length<n0+3;i++) await w(150); await w(300);
   const moi = D.scan.slice(n0);
   ok('lượt quét 3 người → 3 bản ở Chờ sắp xếp', moi.length===3, moi.length);
   ok('người đọc được thẻ → tên "cccd-Họ tên - số CCCD", lưu số CCCD + CMND 9 số', moi[0] && moi[0].ten==='cccd-NGUYỄN VĂN GIẢ - 079000000101' && moi[0].cccd==='079000000101' && moi[0].cmnd==='111222333' && moi[2].ten==='cccd-TRAN THI GIA - 079000000303', JSON.stringify(moi.map(k=>k.ten)));
   ok('người chưa đọc được → giữ tên tự đặt "… - người 2"', moi[1] && / - người 2$/.test(moi[1].ten), moi[1] && moi[1].ten);
   /* bản cũ tên tự đặt: Chờ sắp xếp đọc ra số → đổi tên theo thẻ */
   const k = moi[1]; const gd = docCCCD; docCCCD = () => Promise.resolve({cccd:'079000000202', ten:'LE VAN GIA', nguon:'QR'});
   await sxDocTuAnh(); docCCCD = gd;
   ok('bản cũ "Scan … - người n": ⏳ Chờ sắp xếp đọc ra số → đổi tên "cccd-Họ tên - số", lưu số', k.ten==='cccd-LE VAN GIA - 079000000202' && k.cccd==='079000000202', k.ten);
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
