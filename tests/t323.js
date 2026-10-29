// 3.403 (anh 29/10: CCCD đã lưu dạng PDF — thẻ nhỏ giữa trang trắng — "nhận biết và cắt được luôn"): js/81 (cắm rút).
//   scDoThe: 1 thẻ / trang, 2 thẻ / trang, trang tài liệu không cắt · ① chế độ Thẻ nhận PDF → ảnh mặt thẻ (tỉ lệ thẻ, đúng luồng ảnh) + "+ Thêm PDF" ở hàng chờ thẻ
//   · ② chế độ Tài liệu: PDF toàn thẻ → giữ trang + nhắc "Chuyển sang Quét CCCD", bấm → thành ảnh thẻ; PDF tài liệu → không nhắc. PDF GIẢ (thẻ vẽ giả, không dữ liệu thật).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:850}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* trang A4 trắng (1240 × 1754) vẽ thẻ giả 86 × 54 tỉ lệ */
   const trang = (ve) => { const c = document.createElement('canvas'); c.width = 1240; c.height = 1754; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 1240, 1754); ve(g); return c; };
   const theMau = (g, x, y, rw, mau, chu) => { const rh = Math.round(rw/1.585); g.fillStyle = mau; g.fillRect(x, y, rw, rh); g.fillStyle = chu;
     for(let k=0;k<6;k++) g.fillRect(x+rw*0.38, y+rh*(0.2+k*0.11), rw*0.5, rh*0.04); g.fillRect(x+rw*0.06, y+rh*0.25, rw*0.25, rh*0.5); };
   const p1 = trang(g=>theMau(g, 170, 600, 900, '#9fd3b8', '#235')), p2 = trang(g=>theMau(g, 170, 620, 900, '#e9ecef', '#222'));
   const p3 = trang(g=>{ theMau(g, 120, 150, 480, '#9fd3b8', '#235'); theMau(g, 640, 150, 480, '#e9ecef', '#222'); });
   const tl = trang(g=>{ g.fillStyle = '#222'; for(let y=120;y<1650;y+=40) g.fillRect(110, y, 1000*(0.6+0.4*((y/40)%3)/3), 10); g.fillStyle = '#9fd3b8'; g.fillRect(400, 700, 400, 250); });
   const r1 = scDoThe(p1), r2 = scDoThe(p2), r3 = scDoThe(p3), r4 = scDoThe(tl);
   const tlThe = c => c.width/c.height;
   ok('1 thẻ màu / trang → cắt 1 thẻ, tỉ lệ ~1,58 (có lề trắng)', r1 && r1.length===1 && Math.abs(tlThe(r1[0])-1.53)<0.12, r1 && r1.map(c=>c.width+'x'+c.height).join());
   ok('mặt sau sáng (xám nhạt + chữ) / trang → vẫn cắt được', r2 && r2.length===1 && Math.abs(tlThe(r2[0])-1.53)<0.12, r2 && r2.map(c=>c.width+'x'+c.height).join());
   ok('2 mặt cạnh nhau 1 trang → 2 thẻ, trái → phải', r3 && r3.length===2, r3 && r3.map(c=>c.width+'x'+c.height).join());
   ok('trang tài liệu (chữ khắp trang + ảnh dán) → không cắt', r4===null);
   /* PDF giả */
   const pdfTu = async(ds, ten) => { const pdf = await PDFLib.PDFDocument.create();
     for(const c of ds){ const b = await new Promise(r=>c.toBlob(r, 'image/jpeg', 0.9)); const im = await pdf.embedJpg(new Uint8Array(await b.arrayBuffer())); const pg = pdf.addPage([595, 842]); pg.drawImage(im, {x:0, y:0, width:595, height:842}); }
     return new File([await pdf.save()], ten, {type:'application/pdf'}); };
   const fThe = await pdfTu([p1, p2], 'cccd gia.pdf'), fTL = await pdfTu([tl], 'tai lieu gia.pdf');
   const kq = await scPDFThe(fThe), kq2 = await scPDFThe(fTL);
   ok('scPDFThe: PDF 2 trang thẻ → 2 ảnh, mọi trang là thẻ', kq.anh.length===2 && kq.moiTrang && kq.anh.every(f=>f.type==='image/jpeg'), kq.anh.map(f=>f.name).join());
   ok('scPDFThe: PDF tài liệu → không ảnh, không phải thẻ', !kq2.anh.length && !kq2.moiTrang);
   /* ① chế độ Thẻ */
   HS.mo = true; doiNgan(4); await w(300); HANG = []; ghiHang(); SC.che = 'the';
   await nhanVaoScan([fThe], 'file', 1); for(let i=0;i<80 && HANG.filter(x=>x.kieu==='anh').length<2;i++) await w(200); await w(400);
   const anh = HANG.filter(x=>x.kieu==='anh');
   ok('① chế độ Thẻ: PDF → 2 ảnh mặt thẻ trong hàng chờ (trước bỏ qua PDF)', anh.length===2 && !HANG.some(x=>x.kieu==='trang'), JSON.stringify(HANG.map(x=>x.kieu+':'+x.ten)));
   const hop = document.getElementById('hop-in');
   ok('① hàng chờ thẻ có "+ Thêm PDF"', !!(hop && hop.querySelector('[data-lenh="scpdf.them"]')));
   HANG.forEach(x=>xoaFileHang(x, [])); HANG = []; ghiHang(); try{dongHop()}catch(e){}
   /* ② chế độ Tài liệu */
   SC.che = 'tailieu';
   await nhanVaoScan([fThe], 'file', 1); for(let i=0;i<60 && !document.querySelector('.sc-nhac-the');i++) await w(200);
   ok('② Tài liệu: PDF toàn thẻ → giữ 2 trang PDF + nhắc chuyển sang Quét CCCD', HANG.filter(x=>x.kieu==='trang').length===2 && !!document.querySelector('.sc-nhac-the'), JSON.stringify(HANG.map(x=>x.kieu)));
   document.querySelector('[data-lenh="scpdf.the"]').click(); for(let i=0;i<80 && HANG.filter(x=>x.kieu==='anh').length<2;i++) await w(200); await w(400);
   ok('② bấm → chế độ Thẻ, 2 ảnh mặt thẻ, bỏ trang PDF', SC.che==='the' && HANG.filter(x=>x.kieu==='anh').length===2 && !HANG.some(x=>x.kieu==='trang'), SC.che+' '+JSON.stringify(HANG.map(x=>x.kieu)));
   HANG.forEach(x=>xoaFileHang(x, [])); HANG = []; ghiHang(); try{dongHop()}catch(e){}
   SC.che = 'tailieu'; await nhanVaoScan([fTL], 'file', 1); await w(2500);
   ok('② PDF tài liệu → giữ trang, không nhắc', HANG.filter(x=>x.kieu==='trang').length===1 && !document.querySelector('.sc-nhac-the'));
   HANG.forEach(x=>xoaFileHang(x, [])); HANG = []; ghiHang(); try{dongHop()}catch(e){}
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
