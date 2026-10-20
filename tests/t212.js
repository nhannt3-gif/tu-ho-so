// 3.273 — 🪪 Quét CCCD điền form: nút cạnh Họ tên (Sổ hộ vay mỗi người · 01/TD người vay), ảnh có sẵn (QR giả) → hộp xác nhận
// (Trên thẻ · Đang có trong form, mặc định tích ô trống, ô khác tô màu) → Điền (nơi cấp theo ngày cấp) + lưu ảnh vào tủ; tên không dấu → tên Mẫu 31;
// lấy từ tủ; camera giả của trình duyệt. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch({args:['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']}); const loi=[];
 const ctx = await b.newContext({viewport:{width:1366,height:900}, permissions:['camera']}); const p = await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const qrLib = fs.readFileSync(path.join(__dirname,'lib','qrcode-generator-1.4.4','package','qrcode.js'),'utf8');
 const R = await p.evaluate(async([files, qrLib])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   eval(qrLib); qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
   const theQR = txt => { const qr = qrcode(0, 'M'); qr.addData(txt); qr.make(); const c = document.createElement('canvas'); c.width = 856; c.height = 540; const g = c.getContext('2d'); g.fillStyle = '#e8eee0'; g.fillRect(0, 0, 856, 540);
     const n = qr.getModuleCount(), z = 4; g.fillStyle = '#fff'; g.fillRect(856-(n+8)*z-20, 20, (n+8)*z, (n+8)*z); g.fillStyle = '#000'; for(let r=0;r<n;r++) for(let q=0;q<n;q++) if(qr.isDark(r, q)) g.fillRect(856-(n+8)*z-20+(q+4)*z, 20+(r+4)*z, z, z);
     return new Promise(r=>c.toBlob(r, 'image/jpeg', 0.92)); };
   const nScan0 = (D.scan||[]).length;
   /* 1. Sổ hộ vay: nút 🪪 Quét cạnh Họ tên mỗi người */
   hmMo(); await w(300); HM.tv.push(hmNguoi()); hmVe(); await w(200);
   const nuts = document.querySelectorAll('#hop-in [data-lenh="qc.mo"][data-dich="hm"]');
   ok('Sổ hộ vay: mỗi người có nút 🪪 Quét cạnh ô Họ tên', nuts.length===2 && nuts[0].closest('.qc-o') && nuts[0].closest('.qc-o').querySelector('input[data-hm="0:ten"]'), nuts.length+' nút');
   nuts[1].click(); await w(300);
   const ht = document.getElementById('hop-in').textContent;
   ok('bấm → hộp con "Quét CCCD": 📷 Chụp · 🖼 Ảnh có sẵn · 🗂 Lấy từ tủ', /Quét CCCD — điền cho người 2/.test(ht) && /Chụp/.test(ht) && /Ảnh có sẵn/.test(ht) && /Lấy từ tủ/.test(ht), ht.slice(0, 80));
   QC.tu = 'file'; QC.anh = [await theQR('079000000456|123456789|NGUYỄN THỊ GIẢ BỐN|02031985|Nữ|Ấp Giả, Xã Thử|20082021')]; qcDoc();
   for(let i=0;i<60 && !QC.r;i++) await w(200); await w(200);
   const kq = document.getElementById('qc-kq');
   ok('đọc QR → bảng Trên thẻ · Đang có trong form; ô trống tích sẵn; nơi cấp theo ngày cấp', QC.r && kq.querySelectorAll('input[data-lenh="qc.tich"]:checked').length===4 && /Cục CS QLHC/.test(kq.textContent) && /CMND cũ/.test(kq.textContent) && /Nơi thường trú/.test(kq.textContent), kq.textContent.slice(0, 160));
   ok('nút ✔ Điền đếm 4 ô; có ô "Lưu ảnh CCCD vào tủ"', /Điền 4 ô/.test(document.querySelector('#hop-in [data-lenh="qc.dien"]').textContent) && kq.querySelector('[data-lenh="qc.luuTu"]:checked'));
   document.querySelector('#hop-in [data-lenh="qc.dien"]').click(); await w(800);
   const n1 = HM.tv[1];
   ok('✔ Điền → người 2: họ tên có dấu, ngày sinh, số CCCD, ngày cấp, nơi cấp; CMND 9 số lưu kèm', n1.ten==='Nguyễn Thị Giả Bốn' && n1.ns==='1985-03-02' && n1.cccd==='079000000456' && n1.ncap==='2021-08-20' && n1.noiCap==='Cục CS QLHC' && n1.cmnd==='123456789', JSON.stringify(n1));
   ok('đóng hộp con → về form Sổ hộ vay, ô hiện giá trị mới', document.querySelector('#hop-in input[data-hm="1:ten"]') && document.querySelector('#hop-in input[data-hm="1:ten"]').value==='Nguyễn Thị Giả Bốn');
   const kT = (D.scan||[]).slice(nScan0).find(k=>k.tuForm);
   ok('lưu ảnh vào tủ: chưa có mã KH → "cccd-Họ tên - số", thư mục chờ sắp xếp, có ảnh + kết quả đọc', kT && kT.ten==='cccd-Nguyễn Thị Giả Bốn - 079000000456' && !kT.maKH && duongScan(kT)===D.cauHinh.thumuc+' / Scan chờ sắp xếp' && !!(await docAnhHS(kT.id+'_matTruoc')) && kT.cccdDoc.cccd==='079000000456', kT && kT.ten);
   /* 2. form đã có chữ khác → ô khác tô màu, không tích sẵn; lấy từ tủ */
   HM.tv[1].ten = 'Tên Khác Hẳn'; qcMo({loai:'hm', i:1}); await w(200);
   ok('🗂 Lấy từ tủ: có CCCD vừa lưu (khớp số CCCD trong form)', qcTuDs().some(k=>k===kT));
   qcTu(); await w(100); document.querySelector('#hop-in [data-lenh="qc.chonTu"][data-id="'+kT.id+'"]').click();
   for(let i=0;i<60 && !QC.r;i++) await w(200); await w(200);
   const lech = document.querySelector('#qc-kq tr.sx-lech'), tTen = document.querySelector('#qc-kq input[data-f="ten"]');
   ok('ô Họ tên khác form → tô màu, không tích sẵn (anh tự tích nếu muốn thay); ô đã đủ không tích', lech && /Họ tên/.test(lech.textContent) && tTen && !tTen.checked && !document.querySelector('#qc-kq input[data-f="cccd"]').checked, lech && lech.textContent);
   ok('lấy từ tủ → không hiện ô lưu tủ (đã có)', !document.querySelector('#qc-kq [data-lenh="qc.luuTu"]'));
   dongHop(); await w(100);
   /* 3. tên không dấu (mã máy đọc) + số khớp Mẫu 31 → tên có dấu theo Mẫu 31 */
   const DB = KHO.dsKhach(), ma = Object.keys(DB).find(m=>/^\d{12}$/.test(String(DB[m].cccd||'')) && /[^\x00-\x7F]/.test(DB[m].ten||'')), c = DB[ma];
   QC = {dich:{loai:'hm', i:0}, anh:[], r:{cccd:c.cccd, ten:boDau(c.ten).toUpperCase(), ns:'1980-01-01', nguon:'mã máy đọc'}, tu:'file'};
   const G = qcGiaTri();
   ok('thẻ chỉ có tên không dấu (mã máy đọc), số khớp Mẫu 31 → tên có dấu theo Mẫu 31', G.ma===ma && boDau(G.ten)===boDau(c.ten) && /[^\x00-\x7F]/.test(G.ten) && /Mẫu 31/.test(G.tenNguon), G.ten+' · '+G.tenNguon);
   dongHop(); QC = null;
   /* 4. 01/TD: nút cạnh Họ tên người vay */
   const f01 = L01.form({}, {});
   ok('01/TD: nút 🪪 Quét cạnh "Họ tên người vay"', /Họ tên người vay<\/span><span class="qc-o"><input[^>]*data-f="ten"[^>]*>[^]*?data-lenh="qc.mo" data-dich="l01"/.test(f01));
   try{ hsoCH().boId = ''; }catch(e){}
   QC = {dich:{loai:'l01'}, anh:[], r:{cccd:'079000000777', ten:'TRẦN VĂN GIẢ BẢY', ns:'1990-05-06', ncap:'2024-08-01', nguon:'QR'}, tu:'tu'}; QC.G = qcGiaTri(); QC.chon = {ten:true, ns:true, cccd:true, ncap:true};
   qcDien(); await w(300);
   const B1 = hsoBo(), o1 = B1 && hmTim(B1.hoId), m1 = o1 && o1.tv[o1.dung||0];
   ok('01/TD: ✔ Điền → người vay của bản (hộ mới trong Sổ hộ vay) có họ tên, ngày sinh, CCCD, ngày cấp; cấp từ 01/7/2024 → nơi cấp "Bộ Công an"', m1 && m1.ten==='Trần Văn Giả Bảy' && m1.ns==='1990-05-06' && m1.cccd==='079000000777' && m1.noiCap==='Bộ Công an', JSON.stringify(m1));
   if(o1){ D.cauHinh.hoMoi = hmDs().filter(x=>x!==o1); }
   /* 5. camera (camera giả của trình duyệt) */
   qcMo({loai:'hm', i:0}); await w(200); qcCam(); for(let i=0;i<30 && !(document.getElementById('qc-v')||{}).videoWidth;i++) await w(200);
   const v = document.getElementById('qc-v');
   ok('📷 Chụp: mở camera trong hộp', v && v.videoWidth>0, v && v.videoWidth);
   qcChup(); for(let i=0;i<60 && !/Chưa đọc được|Đọc được/.test((document.getElementById('qc-kq')||{}).textContent||'');i++) await w(200);
   ok('chụp khung không có thẻ → báo "Chưa đọc được — chụp thêm mặt còn lại / rõ hơn", giữ ảnh vừa chụp', QC.anh.length===1 && /Chưa đọc được/.test(document.getElementById('qc-kq').textContent), document.getElementById('qc-kq').textContent);
   dongHop(); await w(1300);
   ok('đóng hộp → tắt camera', !QC.st || QC.st.getTracks().every(t=>t.readyState==='ended'));
   try{ dongHop(); }catch(e){}
   D.scan = (D.scan||[]).filter(k=>!k.tuForm); luu();
   return o; }, [files, qrLib]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
