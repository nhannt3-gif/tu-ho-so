// 3.494 (anh 07/11 — QĐ 4686): 🎯 Phân bổ KH — MẪU MỚI cạnh Biểu 07 cũ: 07/KH (QĐ Ban Đại diện HĐQT xã) · 08/KH (QĐ Giám đốc PGD) · 09/KH (Tờ trình điều chỉnh — quy trình ngược).
//   ① hộp Biểu 07 mặc định vẫn là Biểu 07 cũ (Thông báo UBND), chọn mẫu ở đầu hộp, đổi qua lại không làm đổi bản Biểu 07 cũ; nhớ mẫu chọn lần sau
//   ② 07/KH · 08/KH: đúng chữ mẫu (căn cứ, Điều 1–3, ký), số khớp QĐ (Σ tăng/giảm = số giao), "đủ các thôn" · khai báo riêng tách khỏi Biểu 07 cũ · Word tạo được
//   ③ 📤 Tờ trình 09/KH: số tăng trưởng đã giao = cộng dồn các QĐ trong năm (sửa tay được), KH hiện tại = Đến 31/12 QĐ gần nhất, đề nghị lưu, số dư nợ năm = KH + đề nghị,
//      tờ trình căn cứ QĐ gần nhất, danh mục chỉ CT có đề nghị (hoặc đủ CT) · không lỗi trang. Dữ liệu GIẢ (gianho31 + QĐ giả).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500); await p.evaluate(require('./pb_gia.js'));
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const wpf = {DanhSachQD:[
   {Id:'w1', SoQD:'G100', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-14T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'1', TenXa:'Phường Gò Dầu', NgayGhiNhan:'2026-08-16T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:1000, GiaoTangGiam:300, ChiTieuDen3112:1300}, {MaChuongTrinh:6, TenChuongTrinh:'', ChiTieuDaGiao:800, GiaoTangGiam:-150, ChiTieuDen3112:650}]},
   {Id:'w2', SoQD:'G100', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-14T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'1', TenXa:'Xã Truông Mít', NgayGhiNhan:'2026-08-16T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:500, GiaoTangGiam:200, ChiTieuDen3112:700}]},
   {Id:'w3', SoQD:'G101', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-09-21T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'2', TenXa:'Phường Gò Dầu', NgayGhiNhan:'2026-09-22T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:1300, GiaoTangGiam:100, ChiTieuDen3112:1400}]}]};
 const r = await p.evaluate(async([files, wpf]) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   doiNgan(7); slDoiTab('pb'); for(let i=0;i<80 && !(PB.K && document.getElementById('pb-trai'));i++) await w(250);
   pbDoiMuc('qd'); await w(200);
   await pbNhapGia(wpf, 'de'); for(let i=0;i<40 && pbDL().qd.length<3;i++) await w(100); dongHop(); await w(100);
   o.soQD = pbDL().qd.length;
   pbDoiMuc(''); await w(200);
   PB.chon = {khoa:pbKhoa(pbDL().qd.find(q => q.so==='G100')), xa:pbDL().qd.find(q => q.so==='G100' && /Gò Dầu/.test(q.tenXa)).xa}; PB.kq = null; pbVePhai(); await w(200);
   document.querySelector('[data-lenh="pb.chay"]').click(); await w(400);
   const T = () => PB07.x.trang.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
   const nut = document.querySelector('[data-lenh="pb.b07"]'); o.nutChu = nut ? nut.textContent : '';
   nut.click(); for(let i=0;i<40 && !(PB07.x && document.getElementById('pb07-khung'));i++) await w(100); await w(300);
   /* ① mặc định Biểu 07 cũ */
   const cu0 = PB07.x.trang; o.cuMacDinh = PB07.mau==='07pb' && /THÔNG BÁO ĐIỀU CHỈNH KẾ HOẠCH DƯ NỢ/.test(T()) && document.querySelectorAll('[data-lenh="pb.b07Mau"]').length===3;
   const mau = v => { document.querySelector('[data-lenh="pb.b07Mau"][data-v="'+v+'"]').click(); return w(300); };
   /* ② 07/KH */
   o.anh = {}; await mau('07kh'); const t7 = T(); o.anh.kh07 = PB07.x.trang;
   o.kh07 = [/QUYẾT ĐỊNH Về việc điều chỉnh chỉ tiêu kế hoạch tín dụng năm 2026/, /BAN ĐẠI DIỆN HỘI ĐỒNG QUẢN TRỊ NGÂN HÀNG CHÍNH SÁCH XÃ HỘI PHƯỜNG GÒ DẦU/, /\/QĐ-BĐD/,
     /Căn cứ Quyết định số 56\/QĐ-HĐQT ngày 27\/8\/2026 của Hội đồng quản trị/, /Căn cứ Quyết định số 4686\/QĐ-NHCS ngày 21\/10\/2026 của Tổng Giám đốc/,
     /Căn cứ Quyết định số G100\/QĐ-GIẢ ngày 14\/08\/2026 của Ban Đại diện Hội đồng quản trị NHCSXH tỉnh/, /Căn cứ Nghị quyết số …\/NQ-BĐD/,
     /Điều 1\. Điều chỉnh chỉ tiêu kế hoạch tín dụng năm 2026 cho các thôn \(làng, ấp, bản\) theo Danh mục đính kèm/, /Điều 2\. Phòng giao dịch NHCSXH phối hợp/,
     /Điều 3\. Giám đốc Phòng giao dịch NHCSXH/, /TM\. BAN ĐẠI DIỆN HĐQT NHCSXH PHƯỜNG GÒ DẦU TRƯỞNG BAN/, /DANH MỤC ĐIỀU CHỈNH CHỈ TIÊU KẾ HOẠCH TÍN DỤNG NĂM 2026 ĐỐI VỚI CÁC THÔN/,
     /Số tăng trưởng \(tăng\/giảm\)/, /Số dư nợ năm 2026/, /từ nguồn vốn trung ương/].filter(re => !re.test(t7)).map(String);
   { const fk = document.getElementById('pb07-khung'); await w(600); for(let i=0;i<30 && !(fk.contentDocument && fk.contentDocument.querySelectorAll('.tr-tg').length);i++) await w(200); o.trang07 = fk.contentDocument.querySelectorAll('.tr-tg').length; }
   o.kh07ds = PB07.x.ds.length===2 && PB07.x.ds[0].M.ma==='07/KH' && !/THÔNG BÁO ĐIỀU CHỈNH KẾ HOẠCH DƯ NỢ/.test(t7) && pbDL().ch.b07Mau==='07kh';
   const d0 = PB07.dl[0], tong = {}; d0.ap.forEach(a => a.ds.forEach(c => { tong[c.ma] = (tong[c.ma] || 0) + c.dc; })); o.tong = JSON.stringify(tong);
   /* đủ các thôn */
   document.querySelector('[data-lenh="pb.b07Du"][data-v="1"]').click(); await w(300);
   o.du = PB07.du && d0.apDu.length >= d0.ap.length && d0.apDu.every(a => T().indexOf(a.ten)>=0) && d0.apDu.every(a => a.ds.length===2);
   document.querySelector('[data-lenh="pb.b07Du"][data-v=""]').click(); await w(300);
   /* khai báo riêng tách Biểu 07 cũ */
   document.querySelector('[data-lenh="pb.b07KB"]').click(); await w(300);
   const chip = (k, v) => document.querySelector('[data-lenh="pb.b07KC"][data-k="'+k+'"][data-v="'+v+'"]');
   const go = async (k, v) => { const e = document.querySelector('[data-lenh="pb.b07KG"][data-k="'+k+'"]'); e.value = v; e.dispatchEvent(new Event('change', {bubbles:true})); await w(300); };
   chip('khTruongBan', 'kb').click(); await w(200); await go('khTruongBan', 'Trưởng Ban Giả');
   chip('khNQ', 'kb').click(); await w(200); await go('khNQ', '05/NQ-BĐD ngày 01/09/2026');
   document.querySelector('[data-lenh="pb.b07KLuu"]').click(); await w(300);
   o.kb = /Trưởng Ban Giả/.test(T()) && /Nghị quyết số 05\/NQ-BĐD ngày 01\/09\/2026/.test(T()) && pbDL().ch.bKH && pbDL().ch.bKH.gt.khTruongBan==='Trưởng Ban Giả' && !(pbDL().ch.b07 && pbDL().ch.b07.gt && pbDL().ch.b07.gt.khTruongBan);
   /* 08/KH */
   await mau('08kh'); const t8 = T(); o.anh.kh08 = PB07.x.trang;
   o.kh08 = [/CHI NHÁNH NHCSXH TỈNH/, /PHÒNG GIAO DỊCH NHCSXH/, /\/QĐ-NHCS/, /GIÁM ĐỐC PHÒNG GIAO DỊCH NGÂN HÀNG CHÍNH SÁCH XÃ HỘI/, /Xét đề nghị của Tổ trưởng Tổ Kế hoạch - Tín dụng/,
     /về việc giao Giám đốc Phòng giao dịch NHCSXH quyết định điều chỉnh kế hoạch tín dụng/, /Điều 1\. Điều chỉnh chỉ tiêu kế hoạch tín dụng năm 2026 cho các thôn \(làng, ấp, bản\) của phường Gò Dầu/,
     /Ban Đại diện HĐQT NHCSXH phường Gò Dầu;/, /ĐỐI VỚI CÁC THÔN \(LÀNG, ẤP, BẢN\) CỦA PHƯỜNG GÒ DẦU/, /của Giám đốc Phòng giao dịch NHCSXH/].filter(re => !re.test(t8)).map(String);
   o.kh08ky = /GIÁM ĐỐC/.test(t8) && !/TRƯỞNG BAN/.test(t8) && !/56\/QĐ-HĐQT/.test(t8) && PB07.x.ds[0].M.ma==='08/KH';
   let wd = null; try { const bl = await hsoDocx({ds:PB07.x.ds}); wd = bl && bl.size; } catch(e){ wd = 'lỗi '+e.message; } o.word = wd;
   /* về Biểu 07 cũ: y hệt lúc đầu */
   await mau('07pb'); o.cuGiu = PB07.x.trang===cu0;
   dongHop(); await w(100); document.querySelector('[data-lenh="pb.b07"]').click(); for(let i=0;i<30 && !document.getElementById('pb07-khung');i++) await w(100); await w(300);
   o.nho = PB07.mau==='07pb';   /* lần cuối chọn 07pb → mở lại là 07pb */
   await mau('08kh'); dongHop(); await w(100); document.querySelector('[data-lenh="pb.b07"]').click(); for(let i=0;i<30 && !document.getElementById('pb07-khung');i++) await w(100); await w(300);
   o.nho = o.nho && PB07.mau==='08kh'; await mau('07pb'); dongHop(); await w(100);
   /* ③ 📤 Tờ trình 09/KH */
   o.thanh = !!document.querySelector('.pb-thanh [data-v="tt"]');
   pbDoiMuc('tt'); await w(300); const xaGD = pbDL().qd.find(q => /Gò Dầu/.test(q.tenXa)).xa;
   PB.tt.xa = xaGD; PB.tt.nam = '2026'; PB.tt.nguon = 1; pbTTVe(); for(let i=0;i<40 && !document.querySelector('.pb-tt');i++) await w(150);
   const Rt = pbTTTinh(PB.tt), r3 = Rt.dong.find(d => d.ma==='03'), r6 = Rt.dong.find(d => d.ma==='06');
   o.ttSo = !!r3 && !!r6 && r3.tg===400 && r3.kh===1400 && r6.tg===-150 && r6.kh===650 && Rt.q && Rt.q.so==='G101';
   const o3 = document.querySelector('[data-lenh="pb.ttDn"][data-ct="03"]'); o3.value = '+200'; o3.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   const g6 = document.querySelector('[data-lenh="pb.ttDg"][data-ct="06"]'); g6.value = '-100'; g6.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   const R2 = pbTTTinh(PB.tt), s3 = R2.dong.find(d => d.ma==='03'), s6 = R2.dong.find(d => d.ma==='06'), luu = pbDL().tt['2026|'+xaGD+'|1'];
   o.ttLuu = s3.dn===200 && s3.nam===1600 && s6.dg===-100 && s6.suaDg && luu && luu.dn['03']===200 && luu.dg['06']===-100;
   const bo = document.querySelector('[data-lenh="pb.ttDgBo"][data-ct="06"]'); if(bo) bo.click(); await w(200);
   o.ttBoSua = pbTTTinh(PB.tt).dong.find(d => d.ma==='06').dg===-150;
   document.querySelector('[data-lenh="pb.ttXem"]').click(); for(let i=0;i<30 && !(PB07.x && PB07.mau==='09kh');i++) await w(100); await w(300);
   const t9 = T(); o.anh.kh09 = PB07.x.trang;
   const fk = document.getElementById('pb07-khung'); for(let i=0;i<30 && !(fk.contentDocument && fk.contentDocument.querySelectorAll('.tr-tg').length);i++) await w(200); o.trang09 = fk.contentDocument.querySelectorAll('.tr-tg').length;
   o.tt09 = [/TỜ TRÌNH Về việc điều chỉnh chỉ tiêu kế hoạch tín dụng năm 2026/, /\/TTr-BĐD/, /Kính gửi: Ban Đại diện HĐQT NHCSXH tỉnh/, /4686\/QĐ-NHCS ngày 21\/10\/2026/,
     /Căn cứ Quyết định số G101\/QĐ-GIẢ ngày 21\/09\/2026 của Ban Đại diện HĐQT NHCSXH tỉnh/, /Căn cứ tình hình thực hiện và khả năng thực hiện chỉ tiêu kế hoạch tín dụng được giao năm 2026/,
     /Kính đề nghị Ban Đại diện HĐQT NHCSXH tỉnh/, /TM\. BAN ĐẠI DIỆN HĐQT NHCSXH PHƯỜNG GÒ DẦU TRƯỞNG BAN/, /Trưởng Ban Giả/, /DANH MỤC ĐIỀU CHỈNH CHỈ TIÊU KẾ HOẠCH TÍN DỤNG NĂM 2026 CỦA PHƯỜNG GÒ DẦU/,
     /Số tăng trưởng đã giao/, /Đề nghị điều chỉnh số tăng trưởng/, /\+200/, /1\.600/].filter(re => !re.test(t9)).map(String);
   const bang = () => { const t = document.createElement('div'); t.innerHTML = PB07.x.trang.replace(/^[\s\S]*<body>|<\/body>[\s\S]*$/g, ''); return t.querySelectorAll('table.luoi tbody tr').length; };
   o.tt09dong = bang(); o.tt09chip = !document.querySelector('[data-lenh="pb.b07Mau"]');
   document.querySelector('[data-lenh="pb.b07Du"][data-v="1"]').click(); await w(300); o.tt09du = bang();
   pb07Luu('in'); o.b09 = (pbDL().b09 || []).length===1 && pbDL().b09[0].ct.length===1 && !(pbDL().b07 || []).some(x => x.mau==='09kh');
   dongHop(); return o; }, [files, wpf]);
 ok('nạp 3 QĐ giả', r.soQD===3, r.soQD);
 ok('nút mở hộp ghi rõ Biểu 07 · 07/KH · 08/KH', /07\/KH · 08\/KH/.test(r.nutChu), r.nutChu);
 ok('hộp mặc định Biểu 07 cũ (Thông báo UBND) + 3 chip chọn mẫu', r.cuMacDinh);
 ok('07/KH: đủ chữ mẫu (căn cứ QĐ 56 · 4686 · QĐ tỉnh · Nghị quyết, Điều 1–3, TM. Ban Đại diện – Trưởng ban, Danh mục 2 cột)', !r.kh07.length, r.kh07.join(' | '));
 ok('07/KH: 2 trang (khung xem chia trang), không lẫn chữ Biểu 07 cũ, nhớ mẫu đã chọn', r.kh07ds && r.trang07===2, r.trang07);
 ok('07/KH: Σ tăng/giảm các thôn = số giao QĐ (03 +300 · 06 −150)', r.tong==='{"03":300,"06":-150}', r.tong);
 ok('07/KH "đủ các thôn": in mọi thôn, mỗi thôn đủ CT', r.du);
 ok('khai báo riêng 07/KH lưu riêng (ch.bKH), không đụng khai báo Biểu 07 cũ', r.kb);
 ok('08/KH: đủ chữ mẫu (CN tỉnh / PGD, /QĐ-NHCS, Nghị quyết giao GĐ, Tổ KH-TD, của xã)', !r.kh08.length, r.kh08.join(' | '));
 ok('08/KH: ký GIÁM ĐỐC, không có Trưởng ban / QĐ 56', r.kh08ky);
 ok('08/KH: tạo được file Word', typeof r.word==='number' && r.word>5000, r.word);
 ok('đổi về Biểu 07 cũ → bản in y hệt lúc đầu', r.cuGiu);
 ok('mở lại hộp → nhớ mẫu chọn lần trước', r.nho);
 ok('thanh mục có 📤 Tờ trình 09/KH', r.thanh);
 ok('09/KH: đã giao = cộng dồn QĐ trong năm (03 +400, 06 −150), KH = Đến 31/12 QĐ gần nhất (1.400 · 650), căn cứ QĐ G101', r.ttSo);
 ok('09/KH: đề nghị +200 → số dư nợ năm 1.600; sửa tay "đã giao" — lưu KHO1', r.ttLuu);
 ok('09/KH: ↺ bỏ sửa tay → về cộng dồn', r.ttBoSua);
 ok('09/KH: tờ trình đủ chữ mẫu, số đề nghị, Trưởng ban dùng chung khai báo 07/KH', !r.tt09.length, r.tt09.join(' | '));
 ok('09/KH: danh mục chỉ CT có đề nghị (1 dòng), "đủ chương trình" → 2 dòng; không chip chọn mẫu Biểu 07', r.tt09dong===1 && r.tt09du===2 && r.tt09chip, r.tt09dong+'/'+r.tt09du);
 ok('09/KH: khung xem chia đúng 2 trang (Tờ trình · Danh mục)', r.trang09===2, r.trang09);
 ok('09/KH: in → lưu bản chụp b09 (không ghi vào nhật ký Biểu 07)', r.b09);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 if(process.env.T381_ANH) for(const k of Object.keys(r.anh)){ const q = await b.newPage(); await q.setContent(r.anh[k]); await q.waitForTimeout(800); fs.writeFileSync(path.join(process.env.T381_ANH, k+'.pdf'), await q.pdf({preferCSSPageSize:true})); await q.close(); }
 R.forEach(x => console.log(x)); const sai = R.filter(x => x[0]==='✗').length; console.log(sai ? '✗='+sai+' '+(R.length-sai)+'/'+R.length+' đạt' : '✗=0 '+R.length+'/'+R.length+' đạt');
 await b.close(); })();
