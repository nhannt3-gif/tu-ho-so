// 3.309 — gọn tab Scan (anh 21/10): menu ⋯ bỏ "Chế độ quét", "📷 Webcam", "📁 Chữ ký · CCCD"; điện thoại bỏ Thẻ / Tài liệu + 📁;
// khung xem: chọn 1 khách → CCCD + dải chữ ký phía dưới (nếu có); ✍ Rà chữ ký đọc thử số thẻ cả ảnh "nét giống chữ ký" (ảnh CCCD mờ),
// hiện cả nhóm app nhận đúng để anh tích tay; bản cũ đã rà ở 3.306 tự rà lại 1 lần; Hồ sơ của khách bỏ 🧑 Ảnh. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const anh = (W, H, ve) => { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); ve(g); return new Promise(r=>c.toBlob(r, 'image/jpeg', 0.92)); };
   const bKy = await anh(600, 220, g => { g.strokeStyle = '#1b2a8a'; g.lineWidth = 3; g.beginPath(); g.moveTo(50, 150); g.bezierCurveTo(150, 30, 250, 200, 350, 100); g.bezierCurveTo(420, 40, 480, 180, 550, 90); g.stroke(); });
   const bay = new Date().toISOString(), ma = '9990002291';
   D.scan.push({id:'t229s', che:'the', ten:'Nguyễn Văn Giả', maKH:ma, tag:['CCCD'], matTruoc:true, ngay:bay.slice(0,10), taoLuc:bay});
   const bMo = await anh(640, 400, g => { g.strokeStyle = '#333'; g.lineWidth = 2; g.beginPath(); g.moveTo(40, 300); g.bezierCurveTo(200, 80, 380, 330, 600, 120); g.stroke(); });
   await luuAnhHS('t229s_matTruoc', bKy); await luuAnhHS('kat229a', bKy); await luuAnhHS('kat229b', bMo);
   D.kyAnh = [{id:'kat229a', loai:'ky', khach:'Nguyễn Văn Giả', maKH:ma, ten:ma+' - Nguyễn Văn Giả - Chữ ký.jpg', ngay:bay.slice(0,10), luc:bay, kyXet:'ky'},
     {id:'kat229b', loai:'ky', khach:'Khách Ảnh Mờ', maKH:'9990002292', ten:'x.jpg', ngay:bay.slice(0,10), luc:bay, kyXet:'ky'},
     {id:'kat229c', loai:'anh', khach:'Nguyễn Văn Giả', maKH:ma, ten:'a.jpg', ngay:bay.slice(0,10), luc:bay}];
   D.cauHinh.kyRa = '3.309'; HS.ds = D.scan; doiNgan(4); await w(300);
   /* menu ⋯ */
   document.querySelector('#tr4 button[onclick^="moThemTab"]').click(); await w(150);
   const mn = Array.prototype.map.call(document.querySelectorAll('[class*=menu] button'), x=>x.textContent.trim()).join(' / ');
   ok('menu ⋯ tab Scan: bỏ Chế độ quét, Webcam, 📁 Chữ ký · CCCD', !/Chế độ quét|Webcam|Chữ ký · CCCD/.test(mn), mn);
   try{ dongMenu(); }catch(e){}
   /* điện thoại */
   const dt = dauScanDT();
   ok('điện thoại: bỏ nút Thẻ / Tài liệu và 📁', !/datChe\(|moKyAnh\(/.test(dt));
   /* khung xem: CCCD + dải chữ ký */
   xemScanCP('t229s'); await w(500);
   const dai = document.querySelector('#cotphai .sx-ck-xem'), im = dai && dai.querySelector('img');
   ok('chọn khách → khung xem có dải ✍ Chữ ký ngay dưới nội dung CCCD, có ảnh', !!dai && dai.previousElementSibling && dai.previousElementSibling.id==='cp-than' && !!(im && im.src), dai ? dai.outerHTML.slice(0, 80) : 'không có');
   const hs = (document.getElementById('cp-phu')||{}).textContent || '';
   ok('Hồ sơ của khách: không còn mục 🧑 Ảnh', !/🧑 Ảnh/.test(document.querySelector('#cotphai').textContent), hs.slice(0, 120));
   D.scan.push({id:'t229t', che:'tailieu', ten:'Tài liệu Giả', maKH:ma, tag:['Giấy xác nhận'], ngay:bay.slice(0,10), taoLuc:bay}); xemScanCP('t229t'); await w(300);
   ok('xem tài liệu → không có dải chữ ký', !document.querySelector('.sx-ck-xem'));
   /* Rà: ảnh "nét giống chữ ký" nhưng đọc được số thẻ → ảnh CCCD (giả lập bộ đọc) */
   const docCu = docCCCD; window.docCCCD = (b1) => Promise.resolve(b1 && window.__bThe && b1.size===window.__bThe.size ? {cccd:'079000002292', nguon:'QR'} : null);
   window.__bThe = await docAnhHS('kat229b');
   const lp = await kyPhanLoai(window.__bThe), lp2 = await kyPhanLoai(await docAnhHS('kat229a'));
   ok('nét giống chữ ký nhưng đọc được số thẻ → Ảnh CCCD; chữ ký thật vẫn là chữ ký', lp.loai==='the' && lp2.loai==='ky', lp.loai+' · '+lp2.loai);
   /* bản đã rà ở 3.306 → tự rà lại 1 lần */
   D.cauHinh.kyRa = '3.306'; veScan(); await w(4600);
   window.docCCCD = docCu;
   const hop = document.querySelector('#hop.hien'), t = id => { const x = hop && hop.querySelector('[data-k="'+id+'"]'); return x ? x.checked : null; };
   ok('dữ liệu rà ở 3.306 → tự rà lại: ảnh CCCD "nét giống chữ ký" tích sẵn, ảnh khách tích sẵn, chữ ký đúng hiện ở nhóm cuối (không tích)', t('kat229b')===true && t('kat229c')===true && t('kat229a')===false && /App nhận là chữ ký/.test(hop.textContent),
     JSON.stringify([t('kat229b'), t('kat229c'), t('kat229a')]));
   ok('rà xong ghi mốc 3.309', D.cauHinh.kyRa==='3.309');
   /* moKyAnh cũ → đóng, về tab Scan */
   moKyAnh(); await w(100);
   ok('moKyAnh (nút Đóng / Về danh sách cũ) → đóng hộp, không mở hộp Chữ ký · CCCD', !document.querySelector('#hop.hien'));
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
