// 3.307 — chế độ lọc cho bản photo (anh 21/10: "xám hay trắng vẫn chưa đạt, magic cũng vậy"): thẻ giả → giả lập bản photo (nền xám không đều,
// chữ nhạt, lấm tấm chấm, mờ nhẹ) → đo từng chế độ CŨ và MỚI: nền (trắng chưa), chữ (đậm chưa), độ tách nền – chữ, chấm còn lại trên nền,
// ảnh chân dung không bị tẩy trắng. Dữ liệu GIẢ (thẻ tự vẽ).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const qrLib = fs.readFileSync(path.join(__dirname,'lib','qrcode-generator-1.4.4','package','qrcode.js'),'utf8');
 const R = await p.evaluate(async(qrLib)=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   eval(qrLib); qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
   /* thẻ sạch */
   const W = 856, H = 540, sach = document.createElement('canvas'); sach.width = W; sach.height = H; const g = sach.getContext('2d');
   g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
   const grd = g.createLinearGradient(40, 170, 240, 430); grd.addColorStop(0, '#444'); grd.addColorStop(1, '#888'); g.fillStyle = grd; g.fillRect(40, 170, 200, 260);   /* ảnh chân dung */
   g.fillStyle = '#000'; g.font = 'bold 30px sans-serif';
   ['CĂN CƯỚC CÔNG DÂN', 'Số: 079000002281', 'Họ tên: NGUYEN VAN GIA', 'Ngày sinh: 01/01/1980', 'Quê quán: Ấp Giả, Xã Giả'].forEach((t, i) => g.fillText(t, 270, 200+i*55));
   const qr = qrcode(0, 'M'); qr.addData('079000002281|111222333|NGUYEN VAN GIA|01011980|Nam|Ấp Giả|01012021'); qr.make(); const n = qr.getModuleCount(), z = 4, qx = W-(n+8)*z-20, qy = 20;
   for(let r=0;r<n;r++) for(let q=0;q<n;q++) if(qr.isDark(r, q)) g.fillRect(qx+(q+4)*z, qy+(r+4)*z, z, z);
   const ds = g.getImageData(0, 0, W, H).data, L = i => ds[i*4]*0.299+ds[i*4+1]*0.587+ds[i*4+2]*0.114;
   const chuM = [], nenM = [], anhM = [];
   for(let y=0;y<H;y++) for(let x=0;x<W;x++){ const i = y*W+x;
     if(x>=60 && x<220 && y>=190 && y<410) anhM.push(i);
     else if(x>=270 && x<800 && y>=170 && y<430 && L(i)<60) chuM.push(i);
     else if(L(i)>250 && !(x>=qx-10 && y<qy+(n+8)*z+10) && !(x>=30 && x<250 && y>=160 && y<440) && y%3===0 && x%3===0) nenM.push(i); }
   /* giả lập bản photo */
   const photo = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.filter = 'blur(0.8px)'; x.drawImage(sach, 0, 0); x.filter = 'none';
     const im = x.getImageData(0, 0, W, H), d = im.data; let s = 12345; const rnd = () => (s = (s*16807) % 2147483647)/2147483647;
     for(let i=0;i<W*H;i++){ const xx = i%W, yy = (i/W)|0, l = d[i*4]*0.299+d[i*4+1]*0.587+d[i*4+2]*0.114;
       let v = (105+l*0.42)*(0.84+0.16*xx/W)*(0.93+0.07*Math.cos(yy/H*3)) + (rnd()-0.5)*30; v = Math.max(0, Math.min(255, v)); d[i*4] = d[i*4+1] = d[i*4+2] = v; }
     for(let k=0;k<2500;k++){ const xx = (rnd()*(W-2))|0, yy = (rnd()*(H-2))|0; [0, 1, W, W+1].forEach(o => { const j = (yy*W+xx+o)*4; d[j] = d[j+1] = d[j+2] = 70; }); }
     x.putImageData(im, 0, 0); return c; };
   const goc = photo(), sao = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d').drawImage(goc, 0, 0); return c; };
   const do_ = async (ten, ham) => { const c = sao(); ham(c); const d = c.getContext('2d').getImageData(0, 0, W, H).data, l = i => d[i*4]*0.299+d[i*4+1]*0.587+d[i*4+2]*0.114;
     const tb = m => m.reduce((a, i) => a+l(i), 0)/m.length, nen = tb(nenM), chu = tb(chuM), anh = tb(anhM), cham = nenM.filter(i => l(i)<128).length/nenM.length*100;
     let qrDoc = false; try{ qrDoc = !!cccdQR(await sxQR(c)); }catch(e){}
     return {ten, nen:Math.round(nen), chu:Math.round(chu), tach:Math.round(nen-chu), cham:+cham.toFixed(2), anh:Math.round(anh), qr:qrDoc}; };
   const KQ = {};
   KQ.goc = await do_('gốc (bản photo)', c => c);
   KQ.xamCu = await do_('Xám cũ', c => locXam(c, 'magic')); KQ.xam = await do_('Xám mới', c => apLoc(c, 'xam', 'the'));
   KQ.trangCu = await do_('Giấy trắng cũ', c => locGiayTrang(c)); KQ.trang = await do_('Giấy trắng mới', c => apLoc(c, 'giay', 'the'));
   KQ.magicCu = await do_('Magic cũ', c => locMagic(c)); KQ.magic = await do_('Magic mới', c => apLoc(c, 'magic', 'the'));
   KQ.dtCu = await do_('Đen trắng cũ', c => locDenTrang(c)); KQ.dt = await do_('Đen trắng mới', c => apLoc(c, 'dentrang', 'the'));
   KQ.photo = await do_('Photo rõ', c => apLoc(c, 'photo', 'the'));
   Object.keys(KQ).forEach(k => o.push('  · '+JSON.stringify(KQ[k])));
   const tot = (m, c) => m.nen>=c.nen-2 && m.tach>=c.tach;
   ok('📠 Photo rõ: nền trắng (≥ 245), chữ đậm (≤ 60), chấm nền ≤ 0,5%, ảnh chân dung không bị tẩy (≤ 170)', KQ.photo.nen>=245 && KQ.photo.chu<=60 && KQ.photo.cham<=0.5 && KQ.photo.anh<=170, JSON.stringify(KQ.photo));
   ok('Xám mới: nền trắng hơn + tách nền – chữ hơn + ít chấm hơn Xám cũ, ảnh chân dung không bị tẩy', tot(KQ.xam, KQ.xamCu) && KQ.xam.cham<KQ.xamCu.cham && KQ.xam.anh<=KQ.xamCu.anh, JSON.stringify([KQ.xamCu, KQ.xam].map(x=>[x.nen, x.chu, x.tach])));
   ok('Giấy trắng mới: tách nền – chữ hơn cũ, ít chấm hơn, nền không xám lại', tot(KQ.trang, KQ.trangCu) && KQ.trang.cham<KQ.trangCu.cham, JSON.stringify([KQ.trangCu, KQ.trang].map(x=>[x.nen, x.chu, x.tach])));
   ok('Magic mới (ảnh không màu): nền trắng hơn + tách hơn + ít chấm hơn Magic cũ', tot(KQ.magic, KQ.magicCu) && KQ.magic.cham<KQ.magicCu.cham, JSON.stringify([KQ.magicCu, KQ.magic].map(x=>[x.nen, x.chu, x.tach])));
   ok('Đen trắng mới: ít chấm trên nền hơn, chữ không mất, ảnh chân dung không thành mảng trắng', KQ.dt.cham<KQ.dtCu.cham && KQ.dt.chu<=80 && KQ.dt.anh<KQ.dtCu.anh, JSON.stringify([KQ.dtCu, KQ.dt].map(x=>[x.nen, x.chu, x.cham, x.anh])));
   /* ảnh có màu: Magic giữ như cũ */
   const mau = document.createElement('canvas'); mau.width = 300; mau.height = 200; const mg = mau.getContext('2d'); mg.fillStyle = '#cfe3ee'; mg.fillRect(0, 0, 300, 200); mg.fillStyle = '#c62828'; mg.beginPath(); mg.arc(60, 60, 40, 0, 7); mg.fill();
   const m1 = document.createElement('canvas'), m2 = document.createElement('canvas'); [m1, m2].forEach(c => { c.width = 300; c.height = 200; c.getContext('2d').drawImage(mau, 0, 0); });
   locMagic(m1); apLoc(m2, 'magic', 'the'); const a1 = m1.getContext('2d').getImageData(0, 0, 300, 200).data, a2 = m2.getContext('2d').getImageData(0, 0, 300, 200).data;
   let khac = 0; for(let i=0;i<a1.length;i++) if(a1[i]!==a2[i]) khac++;
   ok('ảnh có màu (thẻ thật): Magic giữ y như cũ (dấu đỏ còn màu)', khac===0, khac);
   ok('nút lọc có "Photo rõ"; quét 🗎 Bản photo CCCD mặc định Photo rõ, CCCD thường giữ mặc định cũ', /Photo rõ/.test(TEN_LOC_NGAN.photo) && (SC.photo2 = true, locMacDinh('the'))==='photo' && (SC.photo2 = false, locMacDinh('the'))!=='photo');
   return o; }, qrLib);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 const kq = R.filter(x=>x[0]==='✓' || x[0]==='✗'); console.log(kq.filter(x=>x[0]==='✓').length+'/'+kq.length+' đạt'); await b.close(); process.exit(kq.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
