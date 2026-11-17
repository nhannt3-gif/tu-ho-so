// 3.556 (anh 17/11: "scan cccd 2 mặt trên 1 tờ app chỉ đọc ảnh, ko đọc từ file pdf mà anh scan pdf" — "mở pdf luôn"): js/82 (cắm rút).
//   ① 🗎 Bản photo CCCD / 🪪 CCCD › 🖼 Ảnh có sẵn: hộp chọn file nhận PDF, chữ "Ảnh hoặc PDF trong máy"; 📄 Tài liệu không đổi
//   ② Bản photo + PDF tờ photo (nền xám, 2 thẻ trên 1 tờ) → 2 ảnh mặt thẻ; PDF 2 trang → 4 ảnh; PDF hỏng → báo tên, ảnh kèm vẫn vào
//   ③ 🪪 CCCD + PDF thẻ trên nền trắng → vẫn lối js/81. PDF GIẢ (thẻ vẽ giả, không dữ liệu thật).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:850}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* bắt hộp chọn file */
   let mo = null; const clickCu = HTMLInputElement.prototype.click;
   HTMLInputElement.prototype.click = function(){ if(this.type==='file'){ mo = this; return; } return clickCu.call(this); };
   HS.mo = true; doiNgan(4); await w(300); HANG = []; ghiHang();
   const chonNguonTu = async(loai) => { mo = null; batDauScan(loai); await w(100);
     const nut = document.querySelector('#hop-in button[data-lenh="f35.scChonNguon"][data-a1="photo"]'); const chu = nut && nut.querySelector('.mo-ta').textContent;
     nut.click(); await w(100); return {chu, accept: mo && mo.accept, multi: mo && mo.multiple}; };
   const a1 = await chonNguonTu('photo'), a2 = await chonNguonTu('cccd'), a3 = await chonNguonTu('tailieu');
   ok('① Bản photo CCCD › Ảnh có sẵn: nhận PDF, chữ "Ảnh hoặc PDF trong máy"', /pdf/.test(a1.accept||'') && /image\//.test(a1.accept) && a1.multi && a1.chu==='Ảnh hoặc PDF trong máy', JSON.stringify(a1));
   ok('① 🪪 CCCD › Ảnh có sẵn: nhận PDF', /pdf/.test(a2.accept||'') && a2.chu==='Ảnh hoặc PDF trong máy', JSON.stringify(a2));
   ok('① 📄 Tài liệu › Ảnh có sẵn: như cũ (chỉ ảnh)', !/pdf/.test(a3.accept||'') && a3.chu==='Ảnh trong máy', JSON.stringify(a3));
   HTMLInputElement.prototype.click = clickCu;
   /* tờ photo giả: A4 nền xám lấm tấm, 2 thẻ xếp dọc */
   const toPhoto = (lech) => { const c = document.createElement('canvas'); c.width = 1240; c.height = 1754; const g = c.getContext('2d');
     g.fillStyle = '#d4d4d4'; g.fillRect(0, 0, 1240, 1754); for(let k=0;k<6000;k++){ g.fillStyle = 'rgba(80,80,80,0.35)'; g.fillRect(Math.random()*1240, Math.random()*1754, 2, 2); }
     const the = (x, y) => { const rw = 860, rh = Math.round(rw/1.585); g.fillStyle = '#f2f2f2'; g.fillRect(x, y, rw, rh); g.strokeStyle = '#333'; g.lineWidth = 4; g.strokeRect(x, y, rw, rh); g.fillStyle = '#444';
       for(let k=0;k<6;k++) g.fillRect(x+rw*0.38, y+rh*(0.2+k*0.11), rw*0.5, rh*0.04); g.fillRect(x+rw*0.06, y+rh*0.25, rw*0.25, rh*0.5); };
     the(190+lech, 180); the(190+lech, 960); return c; };
   const pdfTu = async(ds, ten) => { const pdf = await PDFLib.PDFDocument.create();
     for(const c of ds){ const bl = await new Promise(r=>c.toBlob(r, 'image/jpeg', 0.9)); const im = await pdf.embedJpg(new Uint8Array(await bl.arrayBuffer())); const pg = pdf.addPage([595, 842]); pg.drawImage(im, {x:0, y:0, width:595, height:842}); }
     return new File([await pdf.save()], ten, {type:'application/pdf'}); };
   const cho = async(n) => { for(let i=0;i<120 && HANG.filter(x=>x.kieu==='anh').length<n;i++) await w(200); await w(600); };
   const don = () => { HANG.forEach(x=>xoaFileHang(x, [])); HANG = []; ghiHang(); try{dongHop()}catch(e){} };
   const vao = (loai) => { SC.loai = loai; scChonNguon('photo'); };   /* đặt chế độ như bấm nút (hộp chọn file bị bắt) */
   const clickCu2 = HTMLInputElement.prototype.click; HTMLInputElement.prototype.click = function(){ if(this.type!=='file') return clickCu2.call(this); };
   /* ② Bản photo + PDF 1 trang */
   don(); batDauScan('photo'); vao('photo');
   ok('② chế độ photo: SC.che = the, photo2 bật', SC.che==='the' && SC.photo2===true);
   const f1 = await pdfTu([toPhoto(0)], 'photo gia.pdf');
   await nhanVaoScan([f1], 'photo'); await cho(2);
   let anh = HANG.filter(x=>x.kieu==='anh');
   ok('② PDF tờ photo 1 trang → 2 ảnh mặt thẻ, không còn trang PDF', anh.length===2 && !HANG.some(x=>x.kieu==='trang'), JSON.stringify(HANG.map(x=>x.kieu+':'+x.ten)));
   const kt = []; for(const x of anh){ const bl = await docAnhHS(x.id); const im = bl && await createImageBitmap(bl); kt.push(im ? [im.width, im.height] : null); }
   ok('② ảnh mặt thẻ đúng tỉ lệ thẻ (ngang ~1,58)', kt.length===2 && kt.every(k=>k && k[0]/k[1]>1.35 && k[0]/k[1]<1.8), JSON.stringify(kt));
   don();
   /* ② PDF 2 trang → 4 ảnh */
   batDauScan('photo'); vao('photo');
   const f2 = await pdfTu([toPhoto(0), toPhoto(30)], 'photo 2 nguoi.pdf');
   await nhanVaoScan([f2], 'photo'); await cho(4);
   ok('② PDF 2 trang (2 người) → 4 ảnh mặt thẻ', HANG.filter(x=>x.kieu==='anh').length===4, HANG.length+'');
   don();
   /* ② PDF hỏng + 1 ảnh tờ photo kèm */
   batDauScan('photo'); vao('photo');
   let baoL = ''; const blCu = baoLoi; baoLoi = function(s){ baoL += s; return blCu.apply(this, arguments); };
   const hong = new File([new Uint8Array([1, 2, 3, 4, 5])], 'hong gia.pdf', {type:'application/pdf'});
   const anhKem = await new Promise(r=>toPhoto(0).toBlob(b=>r(new File([b], 'kem.jpg', {type:'image/jpeg'})), 'image/jpeg', 0.9));
   await nhanVaoScan([hong, anhKem], 'photo'); await cho(2); await w(900); baoLoi = blCu;
   ok('② PDF hỏng → báo đúng tên file, ảnh kèm vẫn vào 2 mặt', /hong gia\.pdf/.test(baoL) && HANG.filter(x=>x.kieu==='anh').length===2, baoL.slice(0, 120)+' | '+HANG.length);
   don();
   /* ③ 🪪 CCCD + PDF thẻ nền trắng (lối js/81) */
   batDauScan('cccd'); vao('cccd');
   const trang = () => { const c = document.createElement('canvas'); c.width = 1240; c.height = 1754; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 1240, 1754);
     const rw = 900, rh = Math.round(rw/1.585); g.fillStyle = '#9fd3b8'; g.fillRect(170, 600, rw, rh); g.fillStyle = '#235'; for(let k=0;k<6;k++) g.fillRect(170+rw*0.38, 600+rh*(0.2+k*0.11), rw*0.5, rh*0.04); return c; };
   ok('③ chế độ CCCD: photo2 tắt', SC.che==='the' && !SC.photo2);
   const f3 = await pdfTu([trang(), trang()], 'cccd gia.pdf');
   await nhanVaoScan([f3], 'file', 1); await cho(2);
   ok('③ 🪪 CCCD + PDF (2 trang, 1 thẻ / trang) → 2 ảnh như 3.403', HANG.filter(x=>x.kieu==='anh').length===2, HANG.length+'');
   don(); HTMLInputElement.prototype.click = clickCu2;
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
