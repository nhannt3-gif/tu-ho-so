// 3.172 → 3.174 (anh chốt 12/10) — tab 🏢 Giao dịch xã KHI CHƯA CÓ SỐ LIỆU (điểm GD theo Cài đặt › Địa bàn): 04/TD + 12/GDX.
//   Mẫu in chép nguyên file HTML anh đã in thử đúng mẫu thật (so ảnh in với file gốc làm ở máy làm việc — file gốc có dữ liệu thật, không đưa vào repo).
//   3.174: bố cục mới (chọn nhanh + ⚙ khai báo riêng + 📋 Tóm tắt bản in), mở tab tự chọn điểm có ngày GD gần nhất (thay hộp "Kiểm tra trước đợt"),
//   ngày ký Hôm nay / chọn ngày, ngày phát mặc định = ngày GD gần nhất (+ chọn tay, ↺ Mặc định), PGĐ ký, 1 / 2 bản, 12/GDX: đầu mẫu theo mẫu trắng,
//   3 tên ký cùng hàng, giờ / ngày tiêu hủy tách riêng, 3 vai GDV · KSV · TT không trùng người, số dòng luôn trọn 1 trang A4. Địa bàn GIẢ.
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
   ok('3.174: không còn hộp "Kiểm tra trước đợt" — mở tab tự chọn điểm có ngày GD gần nhất', !document.getElementById('hop').classList.contains('hien') && gdxC().ma04==='TXN9000001' && gdxC().m12SelectedDiem==='TXN9000001');
   let C = gdxC(), X = gdxChup();
   ok('ngày phát mặc định = ngày GD gần nhất của điểm; ngày ký = hôm nay', X.C.ngayPhatISO===ngayISO(nA) && X.C.ngayThongBao===ngayISO(nay()), X.C.ngayPhatISO);
   ok('tên UBND ghi đầy đủ (không viết tắt), kính gửi + địa điểm theo điểm / xã', C.tenUBNDVietTat==='Ủy ban nhân dân phường Giả Một' && C.kinhGui==='Ủy ban nhân dân phường Giả Một' && C.diaDiemPhatTien==='Điểm giao dịch Điểm Giả A (phường Giả Một)');
   const tom = () => document.getElementById('gdx-tom').textContent;
   ok('3.245 (anh 18/10): bỏ dòng chip tóm tắt 📋 — thanh dưới chỉ còn cảnh báo + nút IN 2 bản; chip vẫn ghi nhật ký in', !document.querySelector('#gdx-tom .gdx-tc') && !/📋/.test(tom()) && /IN 2 bản/.test(tom()) && gdxTom().chip.length>3);
   ok('khung chọn nhanh mặc định: ngày ký, loại TB, số hộ · tiền, lịch phát, nơi phát, người lập, người ký, số bản (theo thứ tự trên mẫu)', [...document.querySelectorAll('#gdx-trai .gdx2-hang')].map(e=>e.id.replace('gdx-m-','')).join(',')==='ngayky,gq,mh,ngayphat,noi,nguoilap,ky,soban');
   /* ---- 04/TD ---- */
   const fd = () => document.getElementById('gdx-khung').contentDocument;
   C.nguoiLap = 'Người Lập Giả'; C.soNguoi = '3'; C.soTien = '1.005.000'; gdxVe(); await w(200);
   let t = chu(fd().body.innerHTML);
   ok('04/TD: mặc định in 2 bản giống nhau', fd().querySelectorAll('.sheet-a4').length===2);
   ok('04/TD: nội dung khung chuẩn — số người 03, bằng chữ, mục 3 giờ / ngày / địa điểm, câu đề nghị đầy đủ tên UBND', /được vay vốn đợt này \(kèm danh sách mẫu 03\/TD nếu có\): 03 người/.test(t) && /Bằng chữ: Một triệu không trăm lẻ năm nghìn đồng\./.test(t) && /Lịch phát tiền vay vào 9 giờ 30 phút, ngày \d\d tháng \d\d năm \d{4}, tại địa điểm/.test(t) && /Đề nghị Ủy ban nhân dân phường Giả Một thông báo/.test(t));
   const h0 = fd().querySelector('.sheet-a4').innerHTML;
   ok('04/TD: gạch dưới tên PGD = ½ chữ (3.241 anh chốt, NĐ 30), nét mảnh, gạch dưới tiêu ngữ, Mẫu số 04/TD 02 liên', /<span class="org-chu" style="display:inline-block;">[^<]+<span class="org-line" style="display:block; width:50%; height:1px; [^"]*scaleY\(\.55\)/.test(h0) && /class="nation-motto-line" style="width:100%; height:1px; [^"]*scaleY\(\.55\)/.test(h0) && /Mẫu số 04\/TD/.test(h0) && /- 01 liên lưu NH/.test(h0));
   ok('04/TD (3.243): "Gò Dầu" không rớt nửa tên, "03 người" liền, "tại địa điểm:" nối liền tên điểm (không tách dòng riêng)', /NHCSXH&nbsp;\S+ thông báo|Gò&nbsp;Dầu thông báo|&nbsp;[^ <]+ thông báo kết quả/.test(h0) && /03&nbsp;người/.test(h0) && /tại&nbsp;địa&nbsp;điểm: [^<]*\S/.test(h0), (h0.match(/tại&nbsp;địa&nbsp;điểm:[^<]{0,60}/)||[''])[0]);
   ok('04/TD (3.243): mục 2 không số liệu → 3 nét gạch tay mảnh trên 3 dòng chấm (mặc định hiện)', (h0.match(/<svg class="gach-tay"/g)||[]).length===3);
   gdxDat('gach04', 'an', 1); await w(200); ok('⚙ Khai báo riêng: chọn Ẩn nét gạch → không còn nét gạch', !/gach-tay/.test(fd().querySelector('.sheet-a4').innerHTML)); gdxDat('gach04', 'hien', 1); await w(200);
   gdxDat('isGQVL', true, 1); await w(200); t = chu(fd().body.innerHTML);
   ok('GQVL: "người" → "người lao động", "những người lao động"', /03 người lao động/.test(t) && /những người lao động được vay vốn/.test(t));
   gdxDat('isGQVL', false, 1);
   gdxDat('soBan', 1, 1); await w(150);
   ok('chọn 1 bản → in 1 bản, nút "IN 1 bản"', fd().querySelectorAll('.sheet-a4').length===1 && /IN 1 bản/.test(tom()));
   gdxDat('soBan', 2, 1);
   gdxDat('kyPGD', true, 1); await w(150);
   ok('Phó Giám đốc ký → "KT. GIÁM ĐỐC / PHÓ GIÁM ĐỐC"', /KT\. GIÁM ĐỐC<br>PHÓ GIÁM ĐỐC/.test(fd().body.innerHTML));
   gdxDat('kyPGD', false, 1);
   /* ngày ký: Hôm nay / chọn ngày */
   C.ngayThongBao = ngayISO(cong(1)); gdxDat('ky04Hom', false, 1);
   ok('ngày ký chọn tay → in đúng ngày đó, Hôm nay → quay về hôm nay', gdxChup().C.ngayThongBao===ngayISO(cong(1)) && (gdxDat('ky04Hom', true, 1), gdxChup().C.ngayThongBao===ngayISO(nay())));
   /* ngày phát: chọn tay → ↺ Mặc định */
   C.ngayPhatISO = ngayISO(cong(20)); gdxDat('ngayPhatTay', true, 1); await w(100);
   ok('lịch phát tiền chọn tay → hiện ↺ Mặc định, bấm → về ngày GD gần nhất', gdxChup().C.ngayPhatISO===ngayISO(cong(20)) && /↺ Mặc định/.test(document.getElementById('gdx-m-ngayphat').textContent) && (gdxDat('ngayPhatTay', false, 1), gdxChup().C.ngayPhatISO===ngayISO(nA)));
   /* ⭐ chip số hộ + số tiền */
   C.soNguoi = '2'; C.soTien = '80.000.000'; gdxLuuMauHay(); C.soNguoi = '1'; C.soTien = '40.000.000'; gdxLuuMauHay(); gdxLuuMauHay();
   ok('⭐ lưu thành chip: số hộ + số tiền, trùng không lưu thêm, sắp theo số hộ', C.mauHay.length===2 && C.mauHay[0].h===1 && C.mauHay[0].t===40000000 && C.mauHay[1].t===80000000);
   C.soNguoi = '9'; C.soTien = '1'; gdxMauHay(1); await w(200);
   ok('bấm chip → điền 2 hộ · 80.000.000, bằng chữ tự đổi; ô số hộ + số tiền là 2 ô nhập', C.soNguoi==='2' && C.soTien==='80.000.000' && /Tám mươi triệu đồng/.test(document.getElementById('gdx-chu').textContent) && !!document.getElementById('gdx-songuoi') && !!document.getElementById('gdx-sotien'));
   localStorage.removeItem(GDX_NK);
   gdxIn(); await w(400);
   ok('🖨 IN (không cảnh báo) → in ngay ở khung ẩn + ghi 📜 nhật ký in', !!document.getElementById('gdx-in-tam') && gdxNKDs().length===1 && gdxNKDs()[0].mau==='m04');
   gdxBoMauHay(0); ok('bỏ chip (×)', C.mauHay.length===1);
   C.soNguoi = '2'; C.soTien = '80.000.000'; gdxBuoc('soNguoi', 1); gdxBuoc('soTien', 5000000); gdxBuoc('soTien', 5000000); gdxBuoc('soTien', -5000000);
   ok('3.175: ▲▼ số hộ bước 1, số tiền bước 5 triệu (giữ dấu chấm)', C.soNguoi==='3' && C.soTien==='85.000.000' && document.querySelectorAll('#gdx-m-mh .gdx-buoc').length===2);
   C.soTien = '83.000.000'; gdxBuoc('soTien', 5000000); ok('số tiền lẻ → ▲ làm tròn lên bước 5 triệu kế tiếp', C.soTien==='85.000.000');
   ok('3.175: mức tiền gợi ý mặc định 25 · 30 · 40 · 50 · 80 · 100 · 120 · 160 triệu', JSON.stringify(GDX_MD.quickAmounts)===JSON.stringify([25,30,40,50,80,100,120,160].map(x=>x*1e6)));
   const hn = nay(), y = hn.getFullYear();
   ok('3.187: ngày gõ liền 5 / 7 số và năm 2 số cũ (ngày cấp)', gdxDocNgay('2542021')==='2021-04-25' && gdxDocNgay('252021')==='2021-05-02' && gdxDocNgay('25421')==='2021-04-25' && gdxDocNgay('250299')==='1999-02-25' && gdxDocNgay('230421')==='2021-04-23' && gdxDocNgay('99999')==='');
   ok('3.175: ngày gõ nhanh không cần / hay - (1410 · 141026 · 14102026 · 14/10/26), sai thì không nhận', gdxDocNgay('1410')===y+'-10-14' && gdxDocNgay('141026')==='2026-10-14' && gdxDocNgay('14102026')==='2026-10-14' && gdxDocNgay('14/10/26')==='2026-10-14' && gdxDocNgay('3102')==='' && gdxDocNgay('110')===y+'-10-01' && gdxDocNgay('310226')==='' && gdxDocNgay('abc')==='');
   const oN = document.querySelector('#gdx-m-ngayky .gdx-ngay'); oN.value = '1511'; oN.onchange(); await w(100);
   ok('gõ "1511" vào ô ngày ký → ngày ký 15/11 (không mở lịch)', gdxChup().C.ngayThongBao===y+'-11-15' && C.ky04Hom===false);
   gdxDat('ky04Hom', true, 1);
   gdxKBRieng(); await w(100); dongHop(); await w(50);
   gdxMauHay(0); await w(100); document.querySelector('#gdx-m-ngayky .gdx-c').click(); await w(100);
   ok('3.175 sửa lỗi: đã mở rồi đóng ⚙ → bấm chip ⭐ / Hôm nay KHÔNG mở lại hộp cài đặt', !document.getElementById('hop').classList.contains('hien'));
   /* mức tiền hay dùng · cán bộ */
   const n0 = C.quickAmounts.length; gdxThemMuc('60.000.000'); gdxThemMuc('60.000.000');
   ok('mức tiền hay dùng: thêm, không trùng, sắp tăng dần', C.quickAmounts.length===n0+1 && C.quickAmounts.join()===C.quickAmounts.slice().sort((a,b)=>a-b).join());
   gdxChonTien(60000000); ok('bấm mức tiền → điền số tiền', C.soTien==='60.000.000');
   gdxKBChung(); await w(100); for(const n of ['Cán Bộ Giả A','Cán Bộ Giả B','Cán Bộ Giả A','Cán Bộ Giả C']){ document.getElementById('gdx-cbmoi').value = n; gdxThemCanBo(); }
   ok('⚙ Khai báo chung: danh sách cán bộ thêm / không trùng', C.danhSachCanBo.join('|')==='Cán Bộ Giả A|Cán Bộ Giả B|Cán Bộ Giả C'); dongHop();
   gdxKBRieng(); await w(100);
   const kbr = document.getElementById('hop-in').textContent;
   ok('⚙ Khai báo riêng 04/TD: đủ mục của file gốc theo thứ tự trên mẫu + ô Chọn nhanh từng mục', ['Đầu mẫu','Ngày ký','Kính gửi','Loại thông báo','Số hộ','Giờ phát tiền','Lịch phát','Nơi phát','Địa điểm','Tên UBND','Người lập','Người ký','Số bản','Khôi phục'].every(k=>kbr.indexOf(k)>=0) && document.querySelectorAll('#hop-in .gdx-kbr-nhanh input').length===GDX_MUC.m04.length);
   const tb = [...document.querySelectorAll('#hop-in .gdx-kbr-dong')].find(e=>e.id==='gdx-kbr-gio').querySelector('.gdx-kbr-nhanh input'); tb.checked = true; tb.onchange(); await w(100);
   ok('tích Chọn nhanh "Giờ phát tiền" → mục ra khung trái, lưu cài đặt', !!document.getElementById('gdx-m-gio') && C.nhanh['m04.gio']===true);
   gdxDatNhanh('m04', 'gio', false); dongHop();
   C.donViTren = 'SỬA THỬ'; await new Promise(r=>{ const h0 = hoi; hoi = (a,b2,c2,fn)=>{ fn(); hoi = h0; r(); }; gdxMacDinh(); });
   ok('Khôi phục thông tin mẫu ban đầu: trả ô khai báo, giữ cán bộ / mức tiền / chip', C.donViTren==='NHCSXH TỈNH TÂY NINH' && C.danhSachCanBo.length===3 && C.mauHay.length===1);
   /* nơi giải ngân tại PGD */
   gdxDat04('pgd', 'Xã Giả Hai', true); gdxVe(); await w(200); t = chu(fd().body.innerHTML);
   const mai = cong(1);
   ok('Tại PGD: địa điểm = PGD (khai báo), ngày gợi ý ngày mai, kính gửi theo xã đã chọn', gdxChup().C.diaDiemPhatTien==='Phòng giao dịch NHCSXH Gò Dầu' && gdxChup().C.ngayPhatISO===ngayISO(mai) && /Kính gửi: Ủy ban nhân dân xã Giả Hai/.test(t) && /tại địa điểm: Phòng giao dịch NHCSXH Gò Dầu\./.test(t));
   gdxNoi('diem'); await w(100);
   ok('quay về Tại điểm GD → địa điểm theo điểm đang chọn', C.noiGN==='diem' && C.diaDiemPhatTien==='Điểm giao dịch Điểm Giả A (phường Giả Một)');
   /* cảnh báo không chặn: hỏi 1 lần */
   C.soTien = ''; gdxVe(); let hoiN = 0; const hoiGoc = moHop; window.moHop = function(h){ if(/In khi còn cảnh báo/.test(h)) hoiN++; return hoiGoc.apply(this, arguments); };
   gdxIn(); await w(100); window.moHop = hoiGoc; dongHop();
   ok('còn cảnh báo đỏ (chưa có số tiền) → hỏi trước khi in, không chặn', hoiN===1 && /Chưa nhập số tiền/.test(tom()));
   C.soTien = '60.000.000';
   /* ngày GD: cả ngày nghỉ, ngày 31 ở tháng 30 ngày → cuối tháng */
   const ds31 = gdxNgayToi('31', 3);
   ok('ngày GD gần nhất: không dời ngày nghỉ; ngày 31 ở tháng ít ngày → ngày cuối tháng', ds31.length===3 && ds31.every(x=>{ const d = new Date(x); const cuoi = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); return d.getDate()===Math.min(31, cuoi); }), ds31.join(','));
   /* ---- 12/GDX ---- */
   gdxDoiMau('m12'); await w(300); C = gdxC();
   ok('12/GDX: điểm ngày GD gần nhất, mã điểm, xã, ngày GD gần nhất', C.m12SelectedDiem==='TXN9000001' && C.m12NgayGD===ngayISO(nA) && /TXN9000001/.test(document.getElementById('gdx-trai').textContent));
   gdxDat('m12TenToOption', 'fill', 1); gdxDat('m12GDV', 'Cán Bộ Giả A', 1); await w(200); t = chu(fd().body.innerHTML);
   const h12 = fd().querySelector('.sheet-m12').innerHTML;
   ok('12/GDX: in sẵn tên tổ trưởng (cả dạng "mã | tên"), giao dịch viên, Phường: Giả Một, mã điểm', /1 Tổ Trưởng Giả Một 2 Tổ Trưởng Giả Hai 3 Tổ Trưởng Giả Ba/.test(t) && /Giao dịch viên: Cán Bộ Giả A/.test(t) && /Phường: Giả Một/.test(t) && /Mã điểm giao dịch: TXN9000001/.test(t));
   ok('3.196: đường kẻ mọi mẫu ≤ 0,9 px (04/TD, 12/GDX, Giấy lĩnh); 12/GDX kẻ ngang giữa dòng xám mảnh', !/border[a-z-]*:\s*1\.[0-9]+px/.test(h0+h12+GDX_CSS+GL_CSS) && /\.m12-table tbody td\{border-top:\.5px solid #888/.test(GDX_CSS) && /\.gl-c\{[^}]*border-bottom:\.7px dotted #333/.test(GL_CSS));
   ok('12/GDX đầu mẫu (mẫu trắng): kẻ dưới tên cơ quan 55 % sát lên; nhãn Điểm / Mã điểm / Xã không in đậm, mã điểm đứng gần; dòng Giao dịch viên giãn thêm', /width:55%; height:1px; [^"]*scaleY\(\.55\)[^"]*margin:1px auto/.test(h12) && !/<b>Điểm giao dịch:<\/b>/.test(h12) && !/<b>Mã điểm giao dịch:<\/b>/.test(h12) && /justify-content:flex-start; gap:36px/.test(h12) && !/<b>Phường: /.test(h12) && /margin-top:7px; margin-bottom:9px; font-size:12\.5pt;">\s*Giao dịch viên/.test(h12));
   ok('12/GDX ô ký (3.175): "GIAO DỊCH VIÊN" 1 dòng, "(Ký, ghi rõ họ tên)" sát tiêu đề — bù chiều cao vào khoảng ký cột GDV', />GIAO DỊCH VIÊN<\/div>\s*<div class="sig-guide"/.test(h12) && !/min-height:2\.5em/.test(h12));
   ok('12/GDX (3.175): giá trị điểm GD, mã điểm, xã, tên GDV in đậm; nhãn chữ thường', /Điểm giao dịch: <b>Điểm Giả A<\/b>/.test(h12) && /Mã điểm giao dịch: <b>TXN9000001<\/b>/.test(h12) && /Phường: <b>Giả Một<\/b>/.test(h12) && /Giao dịch viên: <b>Cán Bộ Giả A<\/b>/.test(h12));
   ok('12/GDX ngày GD (3.175): chỉ 1 chip ngày GD kế gần nhất + ô chọn ngày', document.querySelectorAll('#gdx-m-ngaygd .gdx-c').length===1 && !!document.querySelector('#gdx-m-ngaygd .gdx-ngay'));
   const sel = [...document.querySelectorAll('#gdx-m-ba select')];
   ok('3 ô GDV · KSV · TT tổ GD đặt cạnh nhau; người đã là GDV không còn trong ô KSV / TT', sel.length===3 && ![...sel[1].options].some(x=>x.value==='Cán Bộ Giả A') && ![...sel[2].options].some(x=>x.value==='Cán Bộ Giả A') && [...sel[0].options].some(x=>x.value==='Cán Bộ Giả A'));
   ok('12/GDX: số dòng "Theo số tổ (3)"', /Theo số tổ \(3\)/.test(document.getElementById('gdx-trai').textContent));
   ok('Phần II mặc định: giờ và ngày tiêu hủy để chấm', /3\. Thời gian tiêu hủy: …….. giờ…… phút, ngày …..\/ …..\/……….\b|3\. Thời gian tiêu hủy: …….. giờ…… phút, ngày …..\/ …..\/………./.test(t));
   gdxDat('m12NgayHuy', 'gd', 1); await w(100); t = chu(fd().body.innerHTML);
   ok('chọn "Ngày tiêu hủy = ngày GD" (riêng) → ngày in sẵn, giờ vẫn chấm', /3\. Thời gian tiêu hủy: …….. giờ…… phút, ngày \d\d\/\d\d\/\d{4}/.test(t));
   gdxDat('m12GioHuy', 'san', 1); await w(100); t = chu(fd().body.innerHTML);
   ok('giờ ghi sẵn (khai báo ⚙, mặc định 11 giờ 30 phút) — chọn riêng', /3\. Thời gian tiêu hủy: 11 giờ 30 phút, ngày \d\d\/\d\d\/\d{4}/.test(t));
   const html = {}; for(const n of [10, 15, 20, 30, 36, 45]){ C.m12NumRows = n; html[n] = gdxTrang(gdxThan()); }
   C.m12NumRows = 12;
   /* khai báo cũ "ghi sẵn giờ, ngày" (3.172) → 2 lựa chọn riêng */
   D.cauHinh.gdx = {m12TimeMode:'prefill', quickAmounts:[20000000, 30000000, 50000000, 80000000, 90000000, 100000000]}; const Cm = gdxC();
   ok('máy còn bộ mức tiền cũ chưa sửa (20…100 triệu) → tự đổi bộ mới', Cm.quickAmounts.length===8 && Cm.quickAmounts[0]===25000000);
   ok('khai báo cũ 3.172 "ghi sẵn giờ, ngày" đọc được → giờ ghi sẵn + ngày = ngày GD', Cm.m12GioHuy==='san' && Cm.m12NgayHuy==='gd');
   D.cauHinh.gdx = C;
   /* lưu: cài đặt (đồng bộ Drive) */
   gdxDoiMau('m04'); luu();
   const luuDu = JSON.parse(localStorage.getItem(KHOA)).cauHinh.gdx;
   ok('khai báo lưu trong cài đặt app (đồng bộ Drive cùng cài đặt)', luuDu && luuDu.mauHay.length===1 && luuDu.danhSachCanBo.length===3 && luuDu.nguoiLap==='Người Lập Giả');
   ok('04/TD đã rời tab Hồ sơ vay', !HSO_MAU.hsv.some(m=>m.k==='04td'));
   return {o, html};
 });
 /* 12/GDX luôn trọn 1 trang A4 khi in; 3 tên ký cùng hàng */
 const v = await b.newPage({viewport:{width:794,height:1123}}); const cao = [], hang = [];
 for(const n of [10, 15, 20, 30, 36, 45]){ await v.setContent(R.html[n]); await v.emulateMedia({media:'print'}); await v.waitForTimeout(100);
   cao.push(await v.evaluate(()=>document.documentElement.scrollHeight));
   hang.push(await v.evaluate(()=>{ const y = [...document.querySelectorAll('.m12-signatures .sig-signer')].map(e=>Math.round(e.getBoundingClientRect().top)); return y.every(x=>x===y[0]) && (y[0] - document.querySelector('.m12-signatures .sig-guide').getBoundingClientRect().bottom) >= 50; })); }
 R.o.push((cao.every(h=>h<=1123) ? '✓ ' : '✗ ')+'12/GDX 10 / 15 / 20 / 30 / 36 / 45 dòng: trọn 1 trang A4 khi in — '+cao.join(' / ')+' px');
 R.o.push((hang.every(Boolean) ? '✓ ' : '✗ ')+'12/GDX: 3 tên ký cùng 1 hàng, chỗ ký ≥ 50 px kể cả trên 15 dòng — '+hang.join(','));
 R.o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.o.join('\n')); const dat = R.o.filter(x=>x[0]==='✓').length; console.log(dat+'/'+R.o.length+' đạt');
 await b.close(); })();
