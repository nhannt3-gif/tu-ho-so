// 3.300 — tối ưu tốc độ + đồng hồ: bộ đọc chữ dùng lại 1 lần khởi động; ảnh đã cắt đúng 1 thẻ không đọc 4 mảnh; bộ nhớ tạm PDF (Drive / dựng từ ảnh);
// việc chạy đếm giây ở ô trạng thái, xong ≥ 1,5 giây → thông báo kèm "⏱ x giây"; khung xem đang mở đếm giây. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* đồng hồ */
   batChay(false, 'Đang thử đồng hồ…', true); await w(1300); const dang = (document.getElementById('dl-chu')||{}).textContent||'', tt = TTB.chay;
   await w(400); tatChay(); bao('Xong việc thử'); await w(50); const baoChu = TTB.chu || '';
   ok('việc đang chạy đếm giây: "… · ⏱ 1,x giây" ở thanh đang làm + ô trạng thái', /⏱ 1,\d giây/.test(dang) && /⏱/.test(tt), JSON.stringify([dang, tt]));
   ok('xong việc ≥ 1,5 giây → thông báo kết quả (ô trạng thái, không che màn hình) kèm thời gian', /Xong việc thử · ⏱ 1,\d giây/.test(baoChu), baoChu);
   batChay(false, 'Việc nhanh'); await w(200); tatChay(); bao('Xong nhanh'); await w(50);
   ok('việc nhanh (< 1,5 giây) → không ghi thời gian', TTB.chu==='Xong nhanh', TTB.chu);
   /* bộ đọc chữ dùng lại */
   await napOCR(); const gc = Tesseract.createWorker; let tao = 0; Tesseract.createWorker = function(){ tao++; return gc.apply(this, arguments); };
   SX_OCR.w = null; const cv = document.createElement('canvas'); cv.width = 300; cv.height = 80; const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0,0,300,80); g.fillStyle = '#000'; g.font = '40px Arial'; g.fillText('123456', 20, 55);
   const t0 = performance.now(); const kq = await Promise.all([sxOCR(cv, '0123456789'), sxOCR(cv, '0123456789'), sxOCR(cv)]); const ms = performance.now()-t0; Tesseract.createWorker = gc;
   ok('bộ đọc chữ khởi động 1 lần cho nhiều lượt đọc (trước: mỗi lượt 1 lần)', tao===1 && kq.every(x=>/123456/.test(x)), JSON.stringify({tao, kq, ms:Math.round(ms)}));
   /* ảnh đã cắt đúng 1 thẻ → không đọc 4 mảnh */
   const gm = sxManh; let manh = 0; sxManh = function(c){ manh++; return gm(c); };
   const the = document.createElement('canvas'); the.width = 1012; the.height = 638; the.getContext('2d').fillStyle = '#eef'; the.getContext('2d').fillRect(0,0,1012,638);
   const bl = await new Promise(r=>the.toBlob(r, 'image/jpeg', 0.9)); const t1 = performance.now(); await docCCCD(bl, bl).catch(()=>null); const ms2 = performance.now()-t1;
   const to = document.createElement('canvas'); to.width = 2000; to.height = 2800; to.getContext('2d').fillStyle = '#eef'; to.getContext('2d').fillRect(0,0,2000,2800);
   const bl2 = await new Promise(r=>to.toBlob(r, 'image/jpeg', 0.9)); manh = 0 + manh; const m0 = manh; await docCCCD(bl2, null).catch(()=>null); sxManh = gm;
   ok('ảnh đã cắt đúng 1 thẻ: không đọc thêm 4 mảnh phóng to (thẻ khó đọc < 3 giây); ảnh cả tờ vẫn đọc mảnh', m0===0 && manh>m0 && ms2<3000, JSON.stringify({m0, manh, ms2:Math.round(ms2)}));
   /* bộ nhớ tạm PDF */
   const gt = SX_TAI_PDF_CU; let tai = 0; SX_TAI_PDF_CU = function(id){ tai++; return Promise.resolve(new Blob(['%PDF-'+id], {type:'application/pdf'})); };
   const a1 = await taiPDFDrive('dX'), a2 = await taiPDFDrive('dX'), a3 = await taiPDFDrive('dY'); SX_TAI_PDF_CU = gt;
   ok('PDF tải từ Drive giữ trong phiên: mở lại không tải lại', tai===2 && a1===a2 && a3!==a1, tai);
   const gp = SX_PDF_SCAN_CU; let dung = 0; SX_PDF_SCAN_CU = function(k){ dung++; return Promise.resolve(new Blob(['%PDF'], {type:'application/pdf'})); };
   const k = {id:'kt', che:'tailieu', trang:['a'], suaLuc:'1'}; await pdfCuaScan(k); await pdfCuaScan(k); k.trang.push('b'); await pdfCuaScan(k); SX_PDF_SCAN_CU = gp;
   ok('PDF dựng từ ảnh (scan tài liệu) giữ lại; thêm / bớt trang → dựng lại', dung===2, dung);
   /* khung xem đang mở đếm giây */
   const S = XEM.lon, e = document.getElementById(S.id), mm = {id:'zz'}; S.m = mm; e.innerHTML = '<div class="rong">Đang mở…</div>'; dongHoKhung(mm, 'lon'); await w(1400);
   ok('khung xem "Đang mở…" đếm giây', /⏱ 1,\d giây/.test(e.textContent), e.textContent); S.m = null;
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
