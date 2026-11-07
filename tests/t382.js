// 3.496 (anh 07/11): 🏢 Giao dịch xã — 👥 Tổ giao dịch khai tay + chip vai (03/GDX trực quan) và 📘 Nhiệm vụ Tổ giao dịch (1 mặt A4).
//   ① tổ trống → lấy sẵn Tổ trưởng · KSV · GDV của 12/GDX · thêm người, gõ tên, bấm vai; 1 Tổ trưởng · 1 GDV chính; đồng bộ ngược 12/GDX (tên khai tay vẫn hiện ở ô chọn)
//   ② quy tắc VB 4368: < 3 người, thiếu Tổ trưởng / GDV chính / KSV, Tổ trưởng bảo vệ tại điểm + kiêm KSV, GDV chính lái xe / bảo vệ, lái xe = bảo vệ — cảnh báo, không chặn
//   ③ PA 1 / 2 / 3 gán lái xe, bảo vệ đường · ⭐ lưu / chọn lại tổ hay dùng
//   ④ 03/GDX: Phần I áp tải = GDV chính, lái xe, bảo vệ, phương tiện, nơi đi / đến; Phần II mỗi vai 1 dòng + CCDC; vẫn 2 tờ
//   ⑤ 📘 Nhiệm vụ: đủ 6 vai, tên cạnh vai, 1 mặt A4 ở 8,5 pt · nhật ký in không chụp tổ hay dùng · không lỗi trang. Dữ liệu GIẢ (gianho31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1536, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const r = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   const chu = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try { await slGhi(kq); } catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.gdx; localStorage.removeItem(GDX_NK);
   gdxC().danhSachCanBo = ['Cán Bộ Giả A', 'Cán Bộ Giả B']; gdxC().m12ToTruong = 'Cán Bộ Giả A'; gdxC().m12GDV = 'Cán Bộ Giả B';
   const S = gdxCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.to = '';
   slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(400);
   const fd = () => chu(document.getElementById('gdx-khung').contentDocument.body.innerHTML);
   const bam = async (sel) => { const e = document.querySelector(sel); if(!e) return false; e.click(); await w(250); return true; };
   const go = async (i, v) => { const e = document.querySelectorAll('.g4-to-ten')[i]; e.value = v; e.dispatchEvent(new Event('change', {bubbles:true})); await w(250); };
   const vai = (i, v) => bam('[data-lenh="g4.vai"][data-i="'+i+'"][data-v="'+v+'"]');
   o.chip = [...document.querySelectorAll('.gdx2-mau .gdx-c')].some(e => /📘 Nhiệm vụ/.test(e.textContent));
   gdxDoiMau('g03'); await w(400);
   const to = () => gdxC().g4To;
   o.moi = to().length===2 && to()[0].ten==='Cán Bộ Giả A' && to()[0].vai.join()==='tt' && to()[1].vai.join()==='gdvc' && !!document.getElementById('gdx-m-g4to');
   /* thêm 3 người: KSV, GDV, người ngoài bảo vệ */
   await bam('[data-lenh="g4.them"]'); await go(2, 'Kiểm Soát Giả C'); await vai(2, 'ksv');
   await bam('[data-lenh="g4.them"]'); await go(3, 'Giao Dịch Giả D'); await vai(3, 'gdv');
   await bam('[data-lenh="g4.them"]'); await go(4, 'Bảo Vệ Thuê Giả E'); await vai(4, 'bvt');
   o.tuThem = to().length===5 && to()[2].ten==='Kiểm Soát Giả C' && to()[2].vai.join()==='ksv';
   /* 1 GDV chính: bấm GDV chính ở D → B mất vai */
   await vai(3, 'gdvc'); o.mot = to()[3].vai.join()==='gdvc' && to()[1].vai.indexOf('gdvc')<0;
   o.dongBo = gdxC().m12GDV==='Giao Dịch Giả D' && gdxC().m12KSV==='Kiểm Soát Giả C' && gdxC().m12ToTruong==='Cán Bộ Giả A';
   await vai(1, 'gdvc'); await vai(3, 'gdv');   /* trả lại: B GDV chính, D GDV */
   /* quy tắc: chưa có lái xe / bảo vệ đường */
   const canh = () => gdxTom().canh.map(x => x.muc+':'+x.chu).join(' | ');
   o.thieuDuong = /vang:Đi đường: chưa có lái xe/.test(canh()) && /vang:Đi đường: chưa có bảo vệ/.test(canh());
   /* PA 2: thành viên còn lại lái xe, Tổ trưởng bảo vệ */
   await bam('[data-lenh="g4.pa"][data-v="2"]');
   o.pa2 = to()[0].vai.indexOf('bvd')>=0 && to()[2].vai.indexOf('lx')>=0 && !/Đi đường/.test(canh());
   await bam('[data-lenh="g4.pa"][data-v="1"]');
   o.pa1 = to()[0].vai.indexOf('lx')>=0 && to()[0].vai.indexOf('bvd')<0 && to()[2].vai.indexOf('bvd')>=0 && to()[2].vai.indexOf('lx')<0;
   o.dungQD = !canh() && /Đúng quy định thành phần/.test(document.querySelector('.g4-to-canh').textContent);
   /* Tổ trưởng kiêm KSV + bảo vệ tại điểm → đỏ */
   await vai(0, 'ksv'); await vai(0, 'bvt'); o.ttKiem = /do:Tổ trưởng làm bảo vệ tại điểm thì không kiêm Kiểm soát viên/.test(canh()); await vai(0, 'bvt'); await vai(0, 'ksv');
   /* GDV chính lái xe → đỏ */
   await vai(1, 'lx'); o.gdvcLai = /do:GDV chính là người áp tải/.test(canh()); await vai(1, 'lx');
   /* 03/GDX */
   gdxDat('g4Xe', 'Ô tô / 70A-000.00', 1); gdxDat('g4CCHT', 'Dùi cui điện / 000 / 000', 1); await w(300);
   const t3 = fd(), d = gdxDiem(gdxC().m12SelectedDiem);
   o.p1 = /1 Cán Bộ Giả B Áp tải/.test(t3) && /2 Cán Bộ Giả A Lái xe/.test(t3) && /3 Kiểm Soát Giả C Bảo vệ/.test(t3) && t3.indexOf('Ô tô / 70A-000.00')>=0 && t3.indexOf('Dùi cui điện / 000 / 000')>=0;
   o.noi = t3.indexOf('Nơi đi: Trụ sở Phòng giao dịch NHCSXH Gò Dầu')>=0 && t3.indexOf('Nơi đến: Điểm giao dịch '+d.tenDiem)>=0;
   o.p2 = /1 Cán Bộ Giả A Tổ trưởng Thiết bị kết nối mạng/.test(t3) && /2 Kiểm Soát Giả C Kiểm soát viên/.test(t3) && /3 Cán Bộ Giả B Giao dịch viên chính Thùng đựng tiền/.test(t3) && /4 Giao Dịch Giả D Giao dịch viên/.test(t3) && /5 Bảo Vệ Thuê Giả E Bảo vệ Dùi cui điện/.test(t3);
   o.to2 = document.getElementById('gdx-khung').contentDocument.querySelectorAll('.sheet-a4').length;
   /* 3.497 — bàn phím (QUY_CHUAN 11): Enter ở ô tên → ô kế; ở ô cuối → thêm người; Shift+Enter → ô trước */
   { const phim = (e, k, sh) => e.dispatchEvent(new KeyboardEvent('keydown', {key:k, shiftKey:!!sh, bubbles:true}));
     let e0 = document.querySelectorAll('.g4-to-ten')[0]; e0.focus(); phim(e0, 'Enter'); await w(150);
     o.phimKe = document.activeElement===document.querySelectorAll('.g4-to-ten')[1];
     phim(document.activeElement, 'Enter', 1); await w(150); o.phimLui = document.activeElement===document.querySelectorAll('.g4-to-ten')[0];
     const n0 = to().length, ds = document.querySelectorAll('.g4-to-ten'), cuoi = ds[ds.length-1]; cuoi.focus(); phim(cuoi, 'Enter'); await w(300);
     o.phimThem = to().length===n0+1 && document.activeElement===document.querySelectorAll('.g4-to-ten')[n0];
     const e2 = document.querySelectorAll('.g4-to-ten')[n0]; e2.value = 'Gõ Phím Giả'; e2.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
     o.phimGiu = to()[n0].ten==='Gõ Phím Giả' && document.activeElement && document.activeElement.classList.contains('g4-to-ten');
     to().splice(n0, 1); gdxVe(); await w(200); }
   /* thuần (QT-19): g4KiemTo · g4PaGan không cần màn hình */
   { const ds = [{ten:'A', vai:['tt', 'ksv', 'bvt']}, {ten:'B', vai:['gdvc', 'lx']}];
     const k = g4KiemTo({g4To:ds}).map(x => x.muc+':'+x.chu).join('|'); const loi = g4PaGan([{ten:'X', vai:['gdv']}], '1');
     o.thuan = /do:Tổ trưởng làm bảo vệ/.test(k) && /do:GDV chính là người áp tải/.test(k) && /tối thiểu 03/.test(k) && /Tổ trưởng trước/.test(loi); }
   /* ⭐ tổ hay dùng */
   const pr = window.prompt; window.prompt = () => 'Tổ Giả'; await bam('[data-lenh="g4.hayLuu"]'); window.prompt = pr;
   gdxC().g4To = []; gdxVe(); await w(200); gdxC().g4To = [{ten:'X', vai:[]}]; gdxVe(); await w(200);
   await bam('[data-lenh="g4.hay"][data-i="0"]'); o.hay = to().length===5 && to()[4].ten==='Bảo Vệ Thuê Giả E' && gdxC().g4ToHay[0].ten==='Tổ Giả';
   o.nk = !('g4ToHay' in gdxChup().C) && Array.isArray(gdxChup().C.g4To);
   /* 12/GDX: tên khai tay hiện ở ô chọn */
   gdxDoiMau('m12'); await w(300); const sel = [...document.querySelectorAll('select[data-a1="m12KSV"] option')].map(e => e.value);
   o.m12 = sel.indexOf('Kiểm Soát Giả C')>=0 && /Kiểm Soát Giả C/.test(fd());
   /* 📘 Nhiệm vụ */
   gdxDoiMau('gnv'); await w(400); const tn = fd();
   o.nv = ['NHIỆM VỤ TỔ GIAO DỊCH XÃ', 'Quy định chung', 'Trước khi đi', 'Tại điểm giao dịch', 'Sau phiên', 'Kiểm soát viên', 'Lái xe', 'Bảo vệ', '4368/HD-NHCS'].filter(x => tn.indexOf(x)<0);
   o.nvTen = /Tổ trưởng Cán Bộ Giả A/.test(tn) && /Kiểm Soát Giả C/.test(tn) && /Bảo Vệ Thuê Giả E/.test(tn) && tn.indexOf('Điểm GD: '+d.tenDiem)>=0;
   const X = gdxChup(), B = gdxDung(X); o.ban = gdxTrang(B.than, B.css); o.file = gdxTenFile(X);
   gdxDat('g4CoNV', 9.5, 1); await w(200); o.coCanh = /vang:Chữ 9,5 pt có thể sang mặt 2/.test(canh()); const B2 = gdxDung(gdxChup()); o.ban95 = gdxTrang(B2.than, B2.css); gdxDat('g4CoNV', 8.5, 1);
   gdxDoiMau('g03'); await w(200); const B3 = gdxDung(gdxChup()); o.ban03 = gdxTrang(B3.than, B3.css);
   return o; }, files);
 const trang = async h => { const q = await b.newPage(); await q.setContent(h); await q.emulateMedia({media:'print'}); const pdf = await q.pdf({preferCSSPageSize:true}); await q.close(); return (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length; };
 const n85 = await trang(r.ban), n95 = await trang(r.ban95), n03 = await trang(r.ban03);
 ok('chip 📘 Nhiệm vụ ở dải mẫu', r.chip);
 ok('03/GDX: tổ trống → lấy sẵn Tổ trưởng · GDV (chính) của 12/GDX', r.moi);
 ok('thêm người, gõ tên, bấm vai', r.tuThem);
 ok('chỉ 1 GDV chính: bấm ở người khác → người cũ mất vai', r.mot);
 ok('đồng bộ 12/GDX: Tổ trưởng · KSV · GDV = GDV chính', r.dongBo);
 ok('quy tắc: chưa có lái xe / bảo vệ đường → cảnh báo vàng', r.thieuDuong);
 ok('PA 2: thành viên còn lại lái xe, Tổ trưởng bảo vệ', r.pa2);
 ok('PA 1: Tổ trưởng lái xe, thành viên còn lại bảo vệ (bỏ gán cũ)', r.pa1);
 ok('đủ thành phần → không cảnh báo, báo ✓ đúng quy định', r.dungQD);
 ok('Tổ trưởng bảo vệ tại điểm + kiêm KSV → ⛔', r.ttKiem);
 ok('GDV chính lái xe → ⛔ (áp tải)', r.gdvcLai);
 ok('03/GDX Phần I: áp tải = GDV chính, lái xe, bảo vệ, phương tiện, công cụ hỗ trợ', r.p1);
 ok('03/GDX Phần I: nơi đi / nơi đến tự ghi (trụ sở PGD ↔ điểm GD)', r.noi);
 ok('03/GDX Phần II: mỗi vai 1 dòng + CCDC theo vai', r.p2);
 ok('03/GDX vẫn 2 tờ (xem trước) · in 2 trang', r.to2===2 && n03===2, r.to2+'/'+n03);
 ok('bàn phím: Enter ô tên → ô kế, Shift+Enter → ô trước', r.phimKe && r.phimLui);
 ok('bàn phím: Enter ở ô cuối → thêm người, con trỏ vào ô mới; gõ xong vẫn đứng ở ô tên', r.phimThem && r.phimGiu);
 ok('QT-19 thuần: g4KiemTo · g4PaGan chạy không cần màn hình', r.thuan);
 ok('⭐ lưu tổ hay dùng → chọn lại đủ người', r.hay);
 ok('nhật ký in: chụp tổ đang khai, không chụp tổ hay dùng', r.nk);
 ok('12/GDX: tên khai tay hiện ở ô chọn KSV + bản in', r.m12);
 ok('📘 Nhiệm vụ: đủ quy định chung, 3 giai đoạn, 6 vai, căn cứ VB 4368', !r.nv.length, r.nv.join(', '));
 ok('📘 Nhiệm vụ: tên thành viên cạnh vai, điểm GD ở đầu trang', r.nvTen);
 ok('📘 Nhiệm vụ 8,5 pt vừa 1 mặt A4', n85===1, n85);
 ok('📘 Nhiệm vụ 9,5 pt → cảnh báo có thể sang mặt 2', r.coCanh, n95);
 ok('tên file NhiemVuToGD_…', /^NhiemVuToGD_/.test(r.file), r.file);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 if(process.env.T382_SNAP){ fs.writeFileSync(path.join(process.env.T382_SNAP, 'nv.html'), r.ban); fs.writeFileSync(path.join(process.env.T382_SNAP, 'g03to.html'), r.ban03); }
 if(process.env.T382_ANH){ fs.writeFileSync(path.join(process.env.T382_ANH, 'nv.html'), r.ban); fs.writeFileSync(path.join(process.env.T382_ANH, 'g03.html'), r.ban03); }
 await b.close(); })();
