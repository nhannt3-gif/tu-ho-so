// 3.223 M3 (anh chốt 16/10) — NỀN Ô MẪU (js/31-o-mau.js) trên 01/TD: 3 kiểu in (📄 trắng · 🖨 thật · 📝 mẫu + mức điền), cách từng ô (✍ / 🤖 / ✎ / ⌨),
//   giá trị cũ 'in' đọc được, ô có chữ = khung cố định đúng bề rộng chuỗi chấm gốc, chữ dài thu nhỏ + ⚠ báo, Chọn nhanh, 🖼 khai báo trực quan (bấm ô → khai),
//   cả phần một lần, chữ mẫu, tên file, Word, in kèm. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; D.cauHinh.hsoO = {};
   const chu = h=>String(h).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const tv = hsoTVTo(TO_K.to[C.to]), ho = hmTuM31(tv[0].kh); hmLamHS(ho.id, '01td'); await w(300); const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Con Giả', soThang:'12'}); B.tien = '40000000'; B.th = '60'; hsoBoLuu(); hsoVe(); await w(500);
   ok('01/TD đã lên nền ô (mô-đun js/mau/01td.js), 33 ô có nhãn + phần', omCo('01td') && OM_MAU['01td'].o.length>=30 && OM_MAU['01td'].o.every(x=>x.n && x.p));
   /* 1. bản thật mặc định = như cũ */
   let h = chu(hsoLap().h);
   ok('🖨 bản thật mặc định: số liệu người vay in sẵn, ngày ký + phê duyệt NH chấm', h.indexOf(B.nv.ten)>=0 && /Ngày [.…]+ tháng [.…]+ năm [.…]+/.test(h) && /Lãi suất: [.…]+ %\/năm/.test(h));
   /* 2. bản trắng */
   omKieuDat('trang'); await w(300); h = chu(hsoLap().h);
   ok('📄 bản trắng: không in số liệu người vay, chương trình; vẫn in sẵn phần NH (kính gửi)', h.indexOf(B.nv.ten)<0 && !/Học sinh sinh viên/.test(h) && /Kính gửi: Ngân hàng Chính sách xã hội/.test(h));
   hsoLuu().omNHS = false; h = chu(hsoLap().h); ok('bỏ tích "In sẵn phần Ngân hàng" → kính gửi cũng chấm', /Kính gửi: [.…]{20,}/.test(h)); hsoLuu().omNHS = true;
   ok('cột trái có 3 nút kiểu in + công tắc in sẵn NH', /Bản trắng/.test(document.getElementById('hso-tuy').textContent) && /In sẵn phần Ngân hàng/.test(document.getElementById('hso-tuy').textContent));
   ok('tên file bản trắng có "Trang"', /Trang/.test(hsoLap().ten));
   /* 3. bản mẫu + mức điền */
   omDatChuMau('01td', 'nhLai', '6,6'); omDatChuMau('01td', 'ubYK', 'cư trú hợp pháp tại địa phương');
   omKieuDat('mau'); omMucDat('01td', 'het'); await w(200); h = chu(hsoLap().h);
   ok('📝 bản mẫu "Điền hết": số liệu thật + chữ mẫu ô NH (lãi 6,6) + UBND', h.indexOf(B.nv.ten)>=0 && /Lãi suất: 6,6 %\/năm/.test(h) && /cư trú hợp pháp tại địa phương/.test(h));
   omMucDat('01td', 'chuaNH'); h = chu(hsoLap().h); ok('"Chừa phê duyệt NH": NH chấm, UBND vẫn điền', /Lãi suất: [.…]+ %\/năm/.test(h) && /cư trú hợp pháp/.test(h));
   omMucDat('01td', 'chuaUBNH'); h = chu(hsoLap().h); ok('"Chừa UBND + NH": cả hai chấm, người vay vẫn điền', /Lãi suất: [.…]+ %\/năm/.test(h) && !/cư trú hợp pháp/.test(h) && h.indexOf(B.nv.ten)>=0);
   omMucDat('01td', 'tuy'); omMucPhan('01td', 'kh', false); omMucPhan('01td', 'ub', false); omMucPhan('01td', 'nh', true); h = chu(hsoLap().h);
   ok('"Tùy chọn": bỏ phần người vay + UBND, tích NH → tên người vay không in, NH điền', h.indexOf(B.nv.ten)<0 && /Lãi suất: 6,6 %\/năm/.test(h));
   ok('mức điền nhớ theo mẫu; kiểu in KHÔNG lưu (chỉ lần làm)', hsoLuu().omMuc['01td'].kieu==='tuy' && !('omKieu' in hsoLuu()));
   ok('tên file bản mẫu có "Mau"', /Mau/.test(hsoLap().ten)); omKieuDat('that'); await w(200);
   /* 4. cách từng ô */
   hsoLuu().cham = {'01td':{nhLai:'in', ngayKy:'in'}}; ok('giá trị cũ "in" (3.215–3.222) đọc thành ✎ / ⌨', omCachLuu('01td', 'nhLai')==='kb' && omCachLuu('01td', 'ngayKy')==='go');
   omDatCach('01td', 'ten', 'cham'); h = chu(hsoLap().h); ok('đổi ô Họ tên → ✍: tên không in, chấm đúng chuỗi gốc', h.indexOf(B.nv.ten)<0 && h.indexOf('Họ tên người vay: ...............................................................')>=0);
   omDatCach('01td', 'ten', 'tu'); omDatPhan('01td', 'nh', 'in'); omDatKB('01td', 'nhLai', '6,9'); h = chu(hsoLap().h);
   ok('🖨 cả phần NH: số tiền cho vay = đề nghị, lãi theo khai (6,9 theo chương trình HSSV)', h.indexOf('Số tiền cho vay: 40.000.000')>=0 && /Lãi suất: 6,9 %\/năm/.test(h) && hsoLuu().chamGT['01td']['nhLai|HSSV']==='6,9');
   omDatPhan('01td', 'nh', 'cham'); h = chu(hsoLap().h); ok('✍ cả phần NH → chấm lại, giá trị khai vẫn nhớ', /Lãi suất: [.…]+ %\/năm/.test(h) && hsoLuu().chamGT['01td']['nhLai|HSSV']==='6,9');
   /* 5. khung cố định + chữ dài */
   const x = hsoLap().h, s = x.match(/<span class="om om-tu" data-o="ten"( style="[^"]*")?>([^<]*)<\/span>(<span style="display:inline-block;width:([\d.]+)mm"><\/span>)?Năm sinh/);
   ok('3.248 (anh 18/10): ô Họ tên có chữ → in liền như đánh máy (không khung), "Năm sinh" cách tên 1 tab (≤ 12,7 mm)', !!s && !s[1] && s[2]===B.nv.ten && !!s[4] && +s[4]<=12.7 && +s[4]>=3, s && s[0].slice(0, 200));
   B.nv.ten = 'Nguyễn Thị Bé Ba Tư Năm Sáu Bảy Tám Chín Mười Một Mười Hai Mười Ba'; hsoBoLuu(); const x2 = hsoLap(), g2 = (x2.h.match(/<\/span><span style="display:inline-block;width:([\d.]+)mm"><\/span>Năm sinh/)||[])[1];
   ok('tên dài → khoảng trước "Năm sinh" co lại (≥ 3 mm) cho vừa dòng', !!g2 && +g2<12.7 && +g2>=3, g2);
   OM_DAI = []; const G9 = omG('09a', {ten:'Nguyễn Thị Bé Ba Tư Năm Sáu Bảy Tám Chín Mười Một Mười Hai Mười Ba'}, 13), h9 = G9.o('ten', '......................................................');
   ok('ô khung cố định (vd 09A Họ tên) chữ dài quá khung: thu nhỏ chữ (font-size) + ⚠ ghi vào danh sách báo trước khi in', /font-size:[\d.]+pt/.test(h9) && OM_DAI.some(d=>d.k==='ten'));
   hmDongBo(hmTim(ho.id), B); hsoBoLuu(); hsoVe(); await w(300);
   /* 6. Chọn nhanh + khai báo trực quan */
   ok('cột trái: ⚙ Khai báo riêng — tóm tắt số ô theo nguồn (3.229: 📊 / ⚙ / 🤖 / ⌨ / ✏ / ✍) + nút 🖼 Khai báo trực quan + 9 ô Chọn nhanh', /ô: \d+ (📊|⚙|🤖)/.test(document.getElementById('hso-tuy').textContent) && /Khai báo trực quan/.test(document.getElementById('hso-tuy').textContent) && omNhanh('01td').length===9);
   omKBHop('01td'); await w(800); const f = document.getElementById('om-kbt-khung'), d = f.contentDocument;
   ok('🖼 cửa sổ rộng: mẫu như giấy (mọi ô có data-o) + khung phải', document.getElementById('hop-in').classList.contains('xem-rong') && d.querySelectorAll('[data-o]').length>=40 && !!document.getElementById('om-kbt-phai'));
   d.querySelector('[data-o="nhNgayLai"]').click(); await w(200);
   ok('bấm ô "ngày trả lãi" trên mẫu → khung phải hiện ô đó, chọn cách + giá trị khai + chữ mẫu + Chọn nhanh', OM_KBT.k==='nhNgayLai' && /Lãi trả hàng tháng vào ngày/.test(document.getElementById('om-kbt-phai').textContent) && document.querySelectorAll('#om-kbt-phai input[name="om-cach"]').length===2);
   omDatCach('01td', 'nhNgayLai', 'kb'); omDatKB('01td', 'nhNgayLai', '25'); await w(300);
   ok('khai trong cửa sổ → mẫu vẽ lại có giá trị, bản in có "vào ngày 25"', /vào ngày 25/.test(chu(document.getElementById('om-kbt-khung').contentDocument.body.innerHTML)) && /vào ngày 25/.test(chu(hsoLap().h)));
   omDatNhanh('01td', 'tuCo', true); ok('tích Chọn nhanh ô mới → ra cột trái', omNhanh('01td').indexOf('tuCo')>=0);
   omKBLuu(); await w(200);   /* 3.252: 💾 Lưu (đóng mà không lưu = hủy) */
   /* 7. Word + in kèm */
   const x3 = hsoLap(); let wd = null; try { wd = await hsoDocx(x3); } catch(e){ wd = e; }
   ok('xuất Word 01/TD trên nền ô vẫn tạo được file', wd && wd.size>3000, wd && (wd.size || wd.message));
   B.kem = {ds:1, bb:1}; hsoBoLuu(); const x4 = hsoLap(); ok('in kèm 03/TD + 10C vẫn chạy (01/TD dùng nền ô trong bộ)', x4.ds && x4.ds.length>=3 && /PHÊ DUYỆT CỦA NGÂN HÀNG/.test(x4.ds[0].h)); B.kem = {}; hsoBoLuu();
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5)); const dat = R.filter(x=>x[0]==='✓').length;
 console.log(dat+'/'+R.length+' đạt'+(loi.length ? ' · có lỗi trang' : '')); await b.close(); process.exit(dat===R.length && !loi.length ? 0 : 1); })();
