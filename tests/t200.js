// 3.242 (anh 17/10, ý 1–19): FORM LẬP 01/TD theo thứ tự tờ giấy — gõ người vay mới (Tab / Enter đi ô kế, ngày liền số, nơi cấp tự điền) → hộ mới vào 📒 Sổ hộ vay;
//   địa chỉ Xã → Thôn → Tổ (xã quản lý lên đầu, Hội lọc tổ); đề nghị vay HSSV / NSVSMT, tự tính; 💾 Lưu (tên không dấu + tổ + ấp), danh sách bản đã lưu, mở lại; Làm trống;
//   In / Gửi / Mẫu 03 hỏi lưu khi chưa lưu; hộ cũ (mã KH) khóa ô nhân thân. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const w = t=>p.waitForTimeout(t), ev = f=>p.evaluate(f);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; D.cauHinh.hsoO = {}; window.hoi = function(a, b, c, f){ window.__hoi = a; f(); }; }, files);
 await ev(async()=>{ slDoiTab('hsv'); doiNgan(7); await new Promise(r=>setTimeout(r, 1200)); hsoChonMau('01td'); await new Promise(r=>setTimeout(r, 800)); });
 /* 1. thứ tự form theo tờ giấy */
 let r = await ev(()=>[...document.querySelectorAll('#hso-tuy .l01 .l01-o > span:first-child, #hso-tuy .l01 .nhan-nhom')].map(x=>x.textContent.trim()).join(' | '));
 ok('form 01/TD đúng thứ tự tờ giấy: Chương trình → Kính gửi → 1. Người vay (họ tên, năm sinh, CCCD, ngày cấp, nơi cấp, xã, thôn, tổ)', /Chương trình cho vay \| Kính gửi \| 1\. Người vay .*Họ tên người vay \| Năm sinh \| Số CC \/ CCCD \| Ngày cấp \| Nơi cấp \| Địa chỉ — Xã \| Thôn \(ấp\) \| Hội \(lọc tổ\) \| Tổ TK&VV/.test(r), r.slice(0, 200));
 r = await ev(()=>[...document.querySelectorAll('#hso-tuy [data-lenh="l01.ct"]')].map(x=>x.getAttribute('data-ma')));
 ok('chương trình trên 01/TD không có GQVL (GQVL dùng mẫu riêng 01/GQVL — anh 17/10)', r.length>0 && r.indexOf('GQVL')<0, r.join(','));
 r = await ev(()=>{ const s = document.querySelector('[data-l01="xa"]'); const ql = D.cauHinh.xaQuanLy || []; return {dau:s.options[1] && s.options[1].text, ql:ql}; });
 ok('xã anh quản lý đứng đầu danh sách xã', r.ql.indexOf(r.dau)>=0, JSON.stringify(r));
 /* 2. gõ người vay mới — Tab / Enter, ngày liền số */
 await p.click('[data-l01="ng-ten"]'); await p.keyboard.type('Nguyễn Văn Giả'); await p.keyboard.press('Tab'); await w(500);
 await p.keyboard.type('150378'); await p.keyboard.press('Enter'); await w(500);
 await p.keyboard.type('079078001234'); await p.keyboard.press('Tab'); await w(500);
 await p.keyboard.type('9112021'); await p.keyboard.press('Tab'); await w(500);
 r = await ev(()=>{ const B = hsoBo(), x = B && hmTim(B.hoId), n = x ? x.tv[0] : {}; return {ten:n.ten, ns:n.ns, cccd:n.cccd, ncap:n.ncap, noiCap:n.noiCap, coSo:!!x, kh:x && x.kh, focus:document.activeElement && document.activeElement.getAttribute('data-l01')}; });
 ok('gõ liền Tab / Enter: họ tên, năm sinh (150378), CCCD, ngày cấp (9112021) vào đúng ô, nơi cấp tự điền', r.ten==='Nguyễn Văn Giả' && r.ns==='1978-03-15' && r.cccd==='079078001234' && r.ncap==='2021-11-09' && r.noiCap==='Cục CS QLHC', JSON.stringify(r));
 ok('người vay mới → thêm hộ mới vào 📒 Sổ hộ vay (một nguồn)', r.coSo && !r.kh);
 ok('con trỏ đứng ở ô kế (Xã) sau ngày cấp', r.focus==='xa', r.focus);
 /* 2b. gõ liền tay không dừng (vẽ lại không được nuốt / đè ký tự ô kế) */
 await ev(()=>{ const B = hsoBo(), x = hmTim(B.hoId); x.tv[0].ns = ''; x.tv[0].cccd = ''; hsoVe(); }); await w(500);
 await p.click('[data-l01="ng-ten"]'); await p.keyboard.press('End'); await p.keyboard.type(' A'); await p.keyboard.press('Tab'); await p.keyboard.type('150378'); await p.keyboard.press('Tab'); await p.keyboard.type('079078001234'); await p.keyboard.press('Tab'); await w(600);
 r = await ev(()=>{ const x = hmTim(hsoBo().hoId).tv[0]; return {ten:x.ten, ns:x.ns, cccd:x.cccd}; });
 ok('gõ liền tay (không dừng giữa các ô): không mất / đè ký tự', r.ten==='Nguyễn Văn Giả A' && r.ns==='1978-03-15' && r.cccd==='079078001234', JSON.stringify(r));
 await ev(()=>{ const x = hmTim(hsoBo().hoId).tv[0]; x.ten = 'Nguyễn Văn Giả'; hsoVe(); }); await w(500);
 /* 3. địa chỉ Xã → Thôn → Tổ, Hội lọc tổ */
 r = await ev(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)), dat=(k, i)=>{ const s = document.querySelector('[data-l01="'+k+'"]'); s.selectedIndex = i; s.dispatchEvent(new Event('change', {bubbles:true})); };
   dat('xa', 1); await w(400); const nThon = document.querySelector('[data-l01="thon"]').options.length; dat('thon', 1); await w(400);
   const nToAll = document.querySelector('[data-l01="to"]').options.length; const hoi = document.querySelector('[data-l01="hoi"]'); let nToHoi = nToAll;
   if(hoi.options.length>1){ dat('hoi', 1); await w(400); nToHoi = document.querySelector('[data-l01="to"]').options.length; }
   dat('to', 1); await w(600); const B = hsoBo(), x = hmTim(B.hoId), T = hsoBoT(B);
   return {nThon, nToAll, nToHoi, to:x.to, thon:x.tenThon, xa:x.tenXa, tt:T.tt, hoiTen:hsoBoHoiTen(T), tuDien:document.querySelector('#hso-tuy .l01').textContent.indexOf(T.tt)>=0}; });
 ok('chọn Xã → danh sách Thôn; Thôn → Tổ; chọn Hội → chỉ còn tổ của Hội', r.nThon>1 && r.nToAll>1 && r.nToHoi<=r.nToAll, JSON.stringify(r));
 ok('chọn tổ → hộ gắn tổ, tổ trưởng + Hội tự hiện', !!r.to && !!r.tt && r.tuDien, JSON.stringify(r));
 /* 4. đề nghị vay */
 r = await ev(async()=>{ const B = hsoBo(); B.ct = 'NSVSMT'; B.pa = {loai:'moi', nuoc:true, vs:true}; hsoBoLuu(); hsoVe(); await new Promise(r=>setTimeout(r, 600));
   const t = document.querySelector('#hso-tuy .l01-tinh'); return {tinh:t ? t.textContent : '', dau:/2\. Đề nghị vay — NSVSMT/.test(document.getElementById('hso-tuy').textContent)}; });
 ok('2. Đề nghị vay: NSVSMT 2 công trình → tự tính 50.000.000 đ + bằng chữ + tổng nhu cầu', r.dau && /50\.000\.000 đ/.test(r.tinh) && /Năm mươi triệu/i.test(r.tinh), r.tinh);
 r = await ev(async()=>{ const C = hsoCTV('NSVSMT'); const cu = C.loaiDs; C.loaiDs = ['Xây mới', 'Sửa chữa', 'Cải tạo']; hsoVe(); await new Promise(r=>setTimeout(r, 600));
   const nut = [...document.querySelectorAll('#hso-tuy input[name="hso-loai"]')].map(i=>i.parentNode.textContent.trim()); const ct = [...document.querySelectorAll('#hso-tuy input[name="hso-loai"]')][2]; ct.checked = true; ct.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(r=>setTimeout(r, 600));
   const B = hsoBo(), A = hsoPA(B), tinh = document.querySelector('#hso-tuy .l01-tinh').textContent, h = hsoLap().h; C.loaiDs = cu; return {nut, loai:B.pa.loai, md:A.md, tinh, tuCo:B.tuCo, inTuCo:/5\.000\.000/.test(h), inTong:/55\.000\.000/.test(h), nhcsxh:/NHCSXH cho vay/.test(h)}; });
 ok('loại công trình theo thẻ (Xây mới · Sửa chữa · Cải tạo) → chọn "Cải tạo" vào mục đích', r.nut.join('|')==='Xây mới|Sửa chữa|Cải tạo' && r.loai==='Cải tạo' && /^Cải tạo /.test(r.md), JSON.stringify(r));
 ok('vốn tự có trống → mặc định thẻ NSVSMT 5 triệu: tổng = vay + tự có (55.000.000), in đủ', !r.tuCo && /55\.000\.000 đ/.test(r.tinh) && r.inTuCo && r.inTong, JSON.stringify(r));
 ok('câu đề nghị theo mẫu gốc: "Đề nghị cho vay" (bỏ biến thể NHCSXH)', !r.nhcsxh);
 ok('form 01/TD giữ khối "In kèm" (03/TD · 10C · 01/UQ · 01/TGTV) như cột cũ', await ev(()=>{ const t = document.getElementById('hso-tuy').textContent; return /In kèm/.test(t) && /01\/UQ giấy ủy quyền/.test(t) && /03\/TD danh sách/.test(t); }));
 /* 5. lưu, danh sách, làm trống, mở lại */
 await p.click('[data-lenh="l01.luu"]'); await w(500);
 r = await ev(()=>{ const B = hsoBo(); return {ten:B.tenBan, ds:[...document.querySelectorAll('#hso-tuy .l01-dong a')].map(a=>a.textContent), phu:(document.querySelector('#hso-tuy .l01-dong small')||{}).textContent||''}; });
 ok('💾 Lưu (3.296): tên chuẩn "số CCCD (hộ mới) - Họ tên có dấu - 01TD", tổ · ấp ở dòng phụ, hiện trong danh sách', r.ten==='079078001234 - Nguyễn Văn Giả - 01TD' && r.ds.indexOf(r.ten)>=0 && /Tổ .*·/.test(r.phu), JSON.stringify(r));
 r = await ev(()=>{ const B = hsoBo(); B.tenBan = 'Nguyen Van Gia - To X - Ap Y'; delete B.tenCu; hsoVe(); return {ten:B.tenBan, cu:B.tenCu}; });
 ok('bản lưu trước 3.296 (tên không dấu - tổ - ấp) → đổi tên chuẩn 1 lần, giữ tên cũ', r.ten==='079078001234 - Nguyễn Văn Giả - 01TD' && r.cu==='Nguyen Van Gia - To X - Ap Y', JSON.stringify(r));
 /* 3.297: 📷 Quét bản đã ký → sang Scan (Tài liệu), khách + loại 01TD điền sẵn */
 r = await ev(()=>{ const nut = document.querySelector('[data-lenh="l01.quet"]'); if(!nut) return {nut:false}; HS.mo = true; nut.click(); return new Promise(ok=>setTimeout(()=>{ const x = {nut:true, dat:JSON.parse(JSON.stringify(SC_DAT||null)), che:SC.che, loai:SC.loai, ngan:nganHienTai, hop:(document.querySelector('#hop-in .hop-tit')||{}).textContent||''}; try{dongHop()}catch(e){} SC_DAT = null; slDoiTab('hsv'); doiNgan(7); ok(x); }, 600)); });
 ok('01/TD › 📷 Quét bản đã ký → tab Scan chế độ Tài liệu, khách + loại 01TD điền sẵn', r.nut && r.dat && r.dat.loai==='01TD' && r.dat.cccd==='079078001234' && r.dat.ten==='Nguyễn Văn Giả' && r.che==='tailieu' && r.loai==='tailieu' && r.ngan===4 && /Lấy từ đâu|Quét gì/.test(r.hop), JSON.stringify(r));
 await w(500);
 await p.click('[data-lenh="l01.trong"]'); await w(500);
 r = await ev(()=>({bo:hsoCH().boId, ten:document.querySelector('[data-l01="ng-ten"]').value, thanh:document.querySelector('.l01-ban').textContent}));
 ok('Làm trống → form trống (bản cũ vẫn trong danh sách)', !r.bo && !r.ten && /Form trống/.test(r.thanh), JSON.stringify(r));
 await p.click('#hso-tuy .l01-dong a'); await w(600);
 ok('bấm bản đã lưu → mở lại đúng hộ', await ev(()=>document.querySelector('[data-l01="ng-ten"]').value==='Nguyễn Văn Giả'));
 /* 6. hỏi lưu khi In / Mẫu 03 lúc chưa lưu thay đổi */
 r = await ev(async()=>{ window.__hoi = ''; const B = hsoBo(); B.sua = new Date(Date.now()+1000).toISOString(); window.xuatIn = function(){ window.__in = 1; }; document.querySelector('[data-lenh="l01.in"]').click(); await new Promise(r=>setTimeout(r, 300)); return {hoi:window.__hoi, in:window.__in, luu:!!B.luu && B.luu>=B.sua.slice(0, 19)}; });
 ok('In khi có thay đổi chưa lưu → hỏi "Lưu bản 01/TD này trước?" rồi in', /Lưu bản 01\/TD/.test(r.hoi) && r.in===1, JSON.stringify(r));
 await p.click('[data-lenh="l01.m03"]'); await w(800);
 ok('📄 Mẫu 03 → sang 03/TD, hộ vừa lập có trong danh sách', await ev(()=>hsoMau().k==='03td' && /Nguyễn Văn Giả/.test(hsoLap().h)));
 /* 7. hộ cũ (mã KH) khóa nhân thân */
 r = await ev(async()=>{ const C = hsoCH(); const x = pvLuaChon(TO_K.to, C, 'xa', true)[0].k; pvChon('hsv','xa', x); await new Promise(r=>setTimeout(r, 300)); pvChon('hsv','to', pvLuaChon(TO_K.to, hsoCH(), 'to', true)[0].k); await new Promise(r=>setTimeout(r, 500));
   const tv = hsoTVTo(TO_K.to[hsoCH().to]), h = hmTuM31(tv[0].kh); hmLamHS(h.id, '01td'); await new Promise(r=>setTimeout(r, 800)); const i = document.querySelector('[data-l01="ng-ten"]'); return {khoa:i.disabled, gt:i.value}; });
 ok('hộ cũ (mã KH): ô nhân thân khóa, đọc Mẫu 31', r.khoa && !!r.gt, JSON.stringify(r));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
