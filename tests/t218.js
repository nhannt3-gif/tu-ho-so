// 3.285 — 🪪 Đọc số CCCD cạnh 🔎 Tra Mẫu 31 (tab Scan): tài liệu → đọc chữ số trên trang, tìm số CCCD → điền + tự tra;
// không thấy số → mở hộp quét CCCD (đọc xong tự điền + tra); gõ đủ 12 số → tự tra không cần Enter. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   const DB = KHO.dsKhach(), ma = Object.keys(DB).find(m=>/^0\d{11}$/.test(String(DB[m].cccd||'')) && DB[m].ten), c = DB[ma], bay = new Date().toISOString();
   HS.mo = true; doiNgan(4); await w(300);
   /* trang tài liệu giả: chữ in có số CCCD (nhóm 3 số cách nhau) + số khác không phải CCCD */
   const so = String(c.cccd), cv = document.createElement('canvas'); cv.width = 1240; cv.height = 1754; const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 1240, 1754); g.fillStyle = '#000';
   g.font = '44px Arial'; g.fillText('DON DE NGHI VAY VON', 300, 160); g.fillText('Ho ten: NGUYEN VAN GIA', 100, 300); g.fillText('So CCCD: '+so.replace(/(\d{3})(?=\d)/g, '$1 '), 100, 400); g.fillText('Dien thoai: 0912345678', 100, 500);
   const bl = await new Promise(r=>cv.toBlob(r, 'image/jpeg', 0.95)); await luuAnhHS('t218p1', bl);
   const tl = {id:'t218a', che:'tailieu', ten:'don vay', tag:[], trang:['t218p1'], ngay:bay.slice(0,10), suaLuc:bay}; D.scan.push(tl); HS.ds = D.scan;
   themKhach('t218a'); await w(300);
   const nut = document.querySelector('#hop-in [data-lenh="tr.doc"][data-o="k-ten"]');
   ok('hộp Sửa: nút 🪪 Đọc số CCCD cạnh ô tên (trước 🔎 Tra Mẫu 31)', !!nut && nut.nextElementSibling && nut.nextElementSibling.getAttribute('data-lenh')==='tr.tra');
   nut.click(); for(let i=0;i<120 && !tl.maKH;i++) await w(250);
   const kq = (document.getElementById('tr-kq-k-ten')||{textContent:'(không có ô kết quả; hộp: '+((document.querySelector('#hop-in .hop-tit')||{}).textContent||'đóng')+')'}).textContent;
   ok('tài liệu: đọc chữ số trên trang ra số CCCD → điền + tự tra Mẫu 31 → gắn đúng khách, tên chuẩn', tl.maKH===ma && document.getElementById('k-ten').value===c.ten && /Lưu thành/.test(kq), JSON.stringify({ma:tl.maKH, kq:kq.slice(0, 200)}));
   dongHop(); await w(200);
   /* không thấy số → mở hộp quét CCCD; đọc xong tự điền + tra */
   const cv2 = document.createElement('canvas'); cv2.width = 800; cv2.height = 600; const g2 = cv2.getContext('2d'); g2.fillStyle = '#fff'; g2.fillRect(0, 0, 800, 600); g2.fillStyle = '#000'; g2.font = '40px Arial'; g2.fillText('HOP DONG', 200, 200);
   await luuAnhHS('t218p2', await new Promise(r=>cv2.toBlob(r, 'image/jpeg', 0.95)));
   const tl2 = {id:'t218b', che:'tailieu', ten:'hop dong', tag:[], trang:['t218p2'], ngay:bay.slice(0,10), suaLuc:bay}; D.scan.push(tl2);
   themKhach('t218b'); await w(300);
   document.querySelector('#hop-in [data-lenh="tr.doc"][data-o="k-ten"]').click(); for(let i=0;i<120 && !/Quét CCCD/.test((document.querySelector('#hop-in .hop-tit')||{}).textContent||'');i++) await w(250);
   const tit = (document.querySelector('#hop-in .hop-tit')||{}).textContent||'';
   ok('không thấy số trên trang → mở hộp quét CCCD (chụp / ảnh có sẵn / lấy từ tủ)', /Quét CCCD — đọc số rồi tra Mẫu 31/.test(tit) && !!document.querySelector('#hop-in [data-lenh="qc.cam"]'), tit);
   trQuetXong({cccd:so}); for(let i=0;i<40 && !tl2.maKH;i++) await w(100);
   ok('đọc thẻ xong → về hộp Sửa, điền số + tự tra → gắn khách', tl2.maKH===ma && document.getElementById('k-ten').value===c.ten, tl2.maKH);
   dongHop(); await w(200);
   /* gõ đủ 12 số → tự tra không cần Enter */
   const tl3 = {id:'t218c', che:'tailieu', ten:'x', tag:[], trang:[], ngay:bay.slice(0,10), suaLuc:bay}; D.scan.push(tl3);
   themKhach('t218c'); await w(300); const e3 = document.getElementById('k-ten'); e3.value = so; e3.dispatchEvent(new Event('input', {bubbles:true})); await w(900);
   ok('gõ đủ 12 số CCCD vào ô → tự tra (không cần Enter / bấm nút)', tl3.maKH===ma, tl3.maKH);
   dongHop();
   /* trSoTrongChu: số có trên Mẫu 31 lên trước; số 10 chữ số (điện thoại) không lấy */
   const ds = trSoTrongChu('So: 079 000 000 999\nCCCD '+so+'\nDT 0912345678');
   ok('nhiều số trên trang → số có trên Mẫu 31 lên trước; số điện thoại 10 số không lấy', ds[0]===so && ds.length===2 && ds.indexOf('0912345678')<0, JSON.stringify(ds));
   /* 3.285: nút 🗑 Xóa đỏ cạnh Quét bản mới; tích ☐ bản → thanh "Đã chọn" có 🗑 Xóa n bản → vào thùng rác */
   doiNgan(4); await w(300); const nx = document.querySelector('#tr4 .nut-bot');
   ok('nút 🗑 Xóa cạnh Quét bản mới màu đỏ', !!nx && nx.previousElementSibling && /Quét bản mới/.test(nx.previousElementSibling.textContent) && getComputedStyle(nx).color===getComputedStyle(document.documentElement).getPropertyValue('--do').trim().replace(/^#(..)(..)(..)$/, (_, r, g2, b2)=>'rgb('+parseInt(r,16)+', '+parseInt(g2,16)+', '+parseInt(b2,16)+')') || /rgb\(2[0-5]\d, \d{1,2}, \d{1,2}\)|rgb\(1[5-9]\d, \d{1,2}, \d{1,2}\)/.test(getComputedStyle(nx).color), getComputedStyle(nx).color);
   HS.chon = {t218b:1, t218c:1}; veScan(); await w(200);
   const nxc = document.querySelector('#tr4 .thanh-in [data-lenh="ql.xoaChon"]');
   ok('tích 2 bản → thanh "Đã chọn" có nút đỏ 🗑 Xóa 2 bản', !!nxc && /Xóa 2 bản/.test(nxc.textContent) && nxc.classList.contains('xau'));
   nxc.click(); await w(200); const hoiTit = (document.querySelector('#hop-in .hop-tit')||{}).textContent||'';
   const okNut = Array.prototype.find.call(document.querySelectorAll('#hop-in button'), x=>/Xóa 2 bản/.test(x.textContent)); if(okNut) okNut.click(); await w(400);
   ok('xóa nhiều bản hỏi 1 lần → vào thùng rác, bỏ chọn', /Xóa 2 bản scan/.test(hoiTit) && !timScan('t218b') && !timScan('t218c') && (D.rac||[]).some(x=>x.id==='t218b') && !Object.keys(HS.chon).length, hoiTit);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
