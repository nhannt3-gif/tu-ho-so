// 3.172 (anh chốt 11/10) — tab 🏢 Giao dịch xã: in nhanh 04/TD + 12/GDX, không cần số liệu hộ vay.
//   Mẫu in chép nguyên file HTML anh đã in thử đúng mẫu thật (so ảnh in với file gốc làm ở máy làm việc — file gốc có dữ liệu thật, không đưa vào repo).
//   Ở đây kiểm: kiểm tra trước đợt + ngày GD gần nhất (cả ngày nghỉ), nơi giải ngân điểm / PGD, tên UBND đầy đủ, GQVL, 2 bản, ⭐ Mẫu hay in,
//   mức tiền / cán bộ, 12/GDX (tổ từ Địa bàn, số dòng luôn 1 trang A4), lưu cài đặt, 04/TD đã rời Hồ sơ vay. Địa bàn GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const chu = h => String(h||'').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   const cong = n => { const x = nay(); x.setDate(x.getDate()+n); return x; };
   const nA = cong(3), nB = cong(10);
   /* địa bàn GIẢ: 2 xã, 3 điểm; điểm A gần nhất (hôm nay + 3), điểm B + 10, điểm C chưa khai ngày */
   D.cauHinh.diaBan = [
     {xa:'Phường Giả Một', ma:'900001', diem:[
       {ten:'Điểm Giả A', ma:'TXN9000001', ngay:String(nA.getDate()).padStart(2,'0'), ap:[{ten:'Ấp Giả 1', ma:'90000101', to:[{ma:'T1', ten:'Tổ Trưởng Giả Một'}, {ma:'T2', ten:'Tổ Trưởng Giả Hai'}]}, {ten:'Ấp Giả 2', ma:'90000102', to:['T3 | Tổ Trưởng Giả Ba']}]},
       {ten:'Điểm Giả C', ma:'TXN9000003', ngay:'', ap:[]}]},
     {xa:'Xã Giả Hai', ma:'900002', diem:[{ten:'Điểm Giả B', ma:'TXN9000002', ngay:String(nB.getDate()).padStart(2,'0'), ap:[]}]}];
   delete D.cauHinh.gdx;
   /* ---- mở tab: không cần số liệu ---- */
   slDoiTab('gdx'); doiNgan(7); await w(500);
   ok('tab con Số liệu + thanh bên có 🏢 Giao dịch xã; mở được khi chưa nạp số liệu', /Giao dịch xã/.test(document.querySelector('#tr7 .sl-con').textContent) && DH_MUC.some(m=>m.k==='gdx') && !!document.getElementById('gdx-khung'));
   ok('mở tab đợt chưa kiểm tra → tự hiện "Kiểm tra khai báo trước đợt"', /Kiểm tra khai báo trước đợt/.test(document.getElementById('hop-in').textContent));
   let C = gdxC();
   ok('đề xuất điểm có ngày GD gần nhất + ngày phát = ngày GD gần nhất (ngày ký = hôm nay)', C.ma04==='TXN9000001' && C.ngayPhatISO===ngayISO(nA) && C.ngayThongBao===ngayISO(nay()), C.ma04+' '+C.ngayPhatISO);
   ok('tên UBND ghi đầy đủ (không viết tắt), kính gửi + địa điểm theo điểm / xã', C.tenUBNDVietTat==='Ủy ban nhân dân phường Giả Một' && C.kinhGui==='Ủy ban nhân dân phường Giả Một' && C.diaDiemPhatTien==='Điểm giao dịch Điểm Giả A (phường Giả Một)');
   ok('thiếu người lập → cảnh báo trong bảng kiểm tra', /Thiếu người lập/.test(document.getElementById('hop-in').textContent));
   const r3 = document.querySelectorAll('#hop-in input[name="gdx-n3"]');
   ok('chọn được trong 3 ngày GD gần nhất của điểm', r3.length===3);
   C.nguoiLap = 'Người Lập Giả'; gdxDotXN(); await w(300);
   ok('✓ Đúng, bắt đầu in → lưu đợt, đóng hộp, hiện tóm tắt đợt', !!C.dotXN && !document.getElementById('hop').classList.contains('hien') && /Điểm GD Điểm Giả A/.test(document.querySelector('.gdx-dot').textContent));
   /* ---- 04/TD ---- */
   const fd = () => document.getElementById('gdx-khung').contentDocument;
   C.soNguoi = '3'; C.soTien = '1.005.000'; gdxXem(); await w(200);
   let t = chu(fd().body.innerHTML);
   ok('04/TD: 1 lần in 2 bản giống nhau', fd().querySelectorAll('.sheet-a4').length===2);
   ok('04/TD: nội dung khung chuẩn — số người 03, bằng chữ, mục 3 giờ / ngày / địa điểm, câu đề nghị đầy đủ tên UBND', /được vay vốn đợt này \(kèm danh sách mẫu 03\/TD nếu có\): 03 người/.test(t) && /Bằng chữ: Một triệu không trăm lẻ năm nghìn đồng\./.test(t) && /Lịch phát tiền vay vào 9 giờ 30 phút, ngày \d\d tháng \d\d năm \d{4}, tại địa điểm/.test(t) && /Đề nghị Ủy ban nhân dân phường Giả Một thông báo cho những người được vay vốn/.test(t) && /Người Lập Giả/.test(t));
   const h0 = fd().querySelector('.sheet-a4').innerHTML;
   ok('04/TD: gạch dưới tên PGD 1/2 dòng, gạch dưới tiêu ngữ vừa chữ, Mẫu số 04/TD 02 liên (khuôn file gốc)', /class="org-line" style="width:50%/.test(h0) && /class="nation-motto-line"/.test(h0) && /Mẫu số 04\/TD/.test(h0) && /- 01 liên lưu NH/.test(h0));
   gdxGQVL(true); await w(200); t = chu(fd().body.innerHTML);
   ok('GQVL: "người" → "người lao động", "những người lao động"', /03 người lao động/.test(t) && /những người lao động được vay vốn/.test(t));
   gdxGQVL(false); await w(100);
   gdxDinhDang01(); ok('Định dạng 01: 3 → 03', C.soNguoi==='03');
   /* ⭐ Mẫu hay in */
   C.soNguoi = '2'; C.soTien = '80.000.000'; gdxLuuMauHay(); C.soNguoi = '1'; C.soTien = '40.000.000'; gdxLuuMauHay(); gdxLuuMauHay();
   ok('⭐ Mẫu hay in: lưu số hộ + số tiền, trùng không lưu thêm, sắp theo số hộ', C.mauHay.length===2 && C.mauHay[0].h===1 && C.mauHay[0].t===40000000 && C.mauHay[1].t===80000000);
   C.soNguoi = '9'; C.soTien = '1'; gdxMauHay(1); await w(200);
   ok('bấm mẫu → điền 2 hộ · 80.000.000, bằng chữ tự đổi', C.soNguoi==='2' && C.soTien==='80.000.000' && /Tám mươi triệu đồng/.test(document.getElementById('gdx-chu').textContent));
   let inGoi = 0; const f = document.getElementById('gdx-khung'); const goc = f.contentWindow.print;
   window.__gdxIn = () => { inGoi++; }; const pIn = HTMLIFrameElement.prototype;
   const cw = f.contentWindow; cw.print = () => { inGoi++; };
   gdxMauHay(0, 1); await w(400);
   ok('🖨 ở mẫu → in ngay (2 bản 1 hộ · 40 triệu)', inGoi>=1 && C.soNguoi==='1', inGoi);
   gdxBoMauHay(0); ok('bỏ mẫu (×)', C.mauHay.length===1);
   /* mức tiền hay dùng · cán bộ */
   const n0 = C.quickAmounts.length; gdxThemMuc('60.000.000'); gdxThemMuc('60.000.000');
   ok('mức tiền hay dùng: thêm, không trùng, sắp tăng dần', C.quickAmounts.length===n0+1 && C.quickAmounts.join()===C.quickAmounts.slice().sort((a,b)=>a-b).join());
   gdxChonTien(60000000); ok('bấm mức tiền → điền số tiền', C.soTien==='60.000.000');
   gdxTab04('kb'); await w(100); document.getElementById('gdx-cbmoi').value = 'Cán Bộ Giả A'; gdxThemCanBo(); document.getElementById('gdx-cbmoi').value = 'Cán Bộ Giả B'; gdxThemCanBo(); document.getElementById('gdx-cbmoi').value = 'Cán Bộ Giả A'; gdxThemCanBo();
   ok('khai báo sẵn: danh sách cán bộ thêm / không trùng; đủ ô khai báo của file gốc', C.danhSachCanBo.join('|')==='Cán Bộ Giả A|Cán Bộ Giả B' && ['Tên NH cấp trên','Phòng giao dịch','Tên đầy đủ PGD','Địa danh','Ngày ký','Kính gửi','Tên UBND','Giờ phát tiền','Ngày phát tiền','Địa điểm phát tiền','Người lập','Chức danh duyệt','mức tiền','cán bộ','Khôi phục'].every(k=>document.getElementById('gdx-trai').textContent.indexOf(k)>=0));
   C.donViTren = 'SỬA THỬ'; await new Promise(r=>{ hoi = (a,b2,c2,fn)=>{ fn(); r(); }; gdxMacDinh(); });
   ok('Khôi phục thông tin mẫu ban đầu: trả ô khai báo, giữ cán bộ / mức tiền / mẫu hay in', C.donViTren==='NHCSXH TỈNH TÂY NINH' && C.danhSachCanBo.length===2 && C.mauHay.length===1);
   /* nơi giải ngân tại PGD */
   gdxDat04('pgd', 'Xã Giả Hai'); gdxXem(); await w(200); t = chu(fd().body.innerHTML);
   const mai = cong(1);
   ok('Tại PGD: địa điểm = PGD (khai báo), ngày gợi ý ngày mai, kính gửi theo xã đã chọn', C.diaDiemPhatTien==='Phòng giao dịch NHCSXH Gò Dầu' && C.ngayPhatISO===ngayISO(mai) && /Kính gửi: Ủy ban nhân dân xã Giả Hai/.test(t) && /tại địa điểm: Phòng giao dịch NHCSXH Gò Dầu\./.test(t));
   gdxDat04('diem', 'TXN9000001');
   /* ngày GD: cả ngày nghỉ, ngày 31 ở tháng 30 ngày → cuối tháng */
   const ds31 = gdxNgayToi('31', 3);
   ok('ngày GD gần nhất: không dời ngày nghỉ; ngày 31 ở tháng ít ngày → ngày cuối tháng', ds31.length===3 && ds31.every(x=>{ const d = new Date(x); const cuoi = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); return d.getDate()===Math.min(31, cuoi); }), ds31.join(','));
   /* ---- 12/GDX ---- */
   gdxDoiMau('m12'); await w(300); C = gdxC();
   ok('12/GDX: điểm ngày GD gần nhất, mã điểm, xã, số tổ từ Địa bàn, ngày GD gần nhất', C.m12SelectedDiem==='TXN9000001' && C.m12NgayGD===ngayISO(nA) && /TXN9000001/.test(document.getElementById('gdx-trai').textContent) && /3 Tổ/.test(document.getElementById('gdx-trai').textContent));
   gdxDat('m12TenToOption', 'fill', 1); gdxDat('m12GDV', 'Cán Bộ Giả A'); await w(200); t = chu(fd().body.innerHTML);
   ok('12/GDX: in sẵn tên tổ trưởng (cả dạng "mã | tên"), giao dịch viên, Phường: Giả Một', /1 Tổ Trưởng Giả Một 2 Tổ Trưởng Giả Hai 3 Tổ Trưởng Giả Ba/.test(t) && /Giao dịch viên: Cán Bộ Giả A/.test(t) && /Phường: Giả Một/.test(t) && /Mã điểm giao dịch: TXN9000001/.test(t));
   const html = {}; for(const n of [10, 20, 30]){ C.m12NumRows = n; html[n] = gdxTrang(gdxThan()); }
   gdxDat('m12NumRows', 3, 1); await w(100);
   ok('12/GDX: số dòng = số tổ (nút "Theo số tổ điểm này")', /Theo số tổ điểm này/.test(document.getElementById('gdx-trai').textContent));
   gdxDat('m12TimeMode', 'prefill', 1); await w(100); t = chu(fd().body.innerHTML);
   ok('Phần II: ghi sẵn giờ, ngày (mặc định 11 giờ 30 phút, ngày GD)', /3\. Thời gian tiêu hủy: 11 giờ 30 phút, ngày \d\d\/\d\d\/\d{4}/.test(t));
   /* lưu: cài đặt (đồng bộ Drive) */
   gdxDoiMau('m04'); luu();
   const luuDu = JSON.parse(localStorage.getItem(KHOA)).cauHinh.gdx;
   ok('khai báo lưu trong cài đặt app (đồng bộ Drive cùng cài đặt)', luuDu && luuDu.mauHay.length===1 && luuDu.danhSachCanBo.length===2 && luuDu.nguoiLap==='Người Lập Giả');
   ok('04/TD đã rời tab Hồ sơ vay', !HSO_MAU.hsv.some(m=>m.k==='04td'));
   return {o, html};
 });
 /* 12/GDX luôn trọn 1 trang A4 khi in (10 / 20 / 30 dòng) */
 const v = await b.newPage({viewport:{width:794,height:1123}}); const cao = [];
 for(const n of [10, 20, 30]){ await v.setContent(R.html[n]); await v.emulateMedia({media:'print'}); await v.waitForTimeout(100); cao.push(await v.evaluate(()=>document.documentElement.scrollHeight)); }
 R.o.push((cao.every(h=>h<=1123) ? '✓ ' : '✗ ')+'12/GDX 10 / 20 / 30 dòng: trọn 1 trang A4 khi in — '+cao.join(' / ')+' px');
 R.o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.o.join('\n')); const dat = R.o.filter(x=>x[0]==='✓').length; console.log(dat+'/'+R.o.length+' đạt');
 await b.close(); })();
