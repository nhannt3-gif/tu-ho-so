// 3.493 (anh 07/11 "mẫu nào dựng nhanh đơn giản em cứ dựng theo đúng chuẩn gắn mẫu đã làm"): mẫu GDX theo VB 4368 ở tab 🏢 Giao dịch xã —
//   03, 06, 07, 09, 10, 11, 14, 15/GDX: có chip mẫu, xem trước đúng tiêu đề / Mẫu số, dùng chung điểm GD · ngày GD · GDV / KSV / Tổ trưởng tổ GD với 12/GDX,
//   ô không có thông tin để chấm, in trọn trang (03 = 2 tờ A4 ngang, còn lại 1 trang), nhật ký in lại được, mẫu cũ (04/TD, 12/GDX) vẫn chạy. Dữ liệu GIẢ (gianho31).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const chu = h => String(h||'').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.gdx; localStorage.removeItem(GDX_NK);
   gdxC().danhSachCanBo = ['Cán Bộ Giả A','Cán Bộ Giả B','Cán Bộ Giả C'];
   const S = gdxCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.to = '';
   slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(500);
   const fd = () => document.getElementById('gdx-khung').contentDocument;
   const MOI = {g03:['03/GDX', 'BẢNG KÊ THEO DÕI GIAO DỊCH XÃ'], g06:['06/GDX', 'GIẤY ĐỀ NGHỊ TIẾP QUỸ'], g07:['07/GDX', 'Phổ biến cho khách hàng vay vốn'], g09:['09/GDX', 'BÁO CÁO THẺ TIẾT KIỆM TẠI ĐIỂM GIAO DỊCH'],
     g10:['10/GDX', 'BẢNG KÊ KIỂM QUỸ CUỐI PHIÊN GIAO DỊCH'], g11:['11/GDX', 'BIÊN BẢN XÁC ĐỊNH THẺ TIẾT KIỆM HỎNG, MẤT'], g14:['14/GDX', 'PHIẾU XUẤT KHO'], g15:['15/GDX', 'PHIẾU NHẬP KHO']};
   const chip = [...document.querySelectorAll('.gdx2-mau .gdx-c')].map(e=>e.textContent);
   ok('8 chip mẫu mới ở dải mẫu (sau 5 mẫu cũ)', Object.keys(MOI).every(k=>chip.some(t=>t.indexOf(MOI[k][0])>=0)) && chip.length===14, chip.length);   /* 3.496: + 📘 Nhiệm vụ Tổ giao dịch */
   const kq = {};
   for(const k of Object.keys(MOI)){ gdxDoiMau(k); await w(350);
     const t = chu(fd().body.innerHTML).toUpperCase();
     kq[k] = t.indexOf('MẪU SỐ '+MOI[k][0])>=0 && t.indexOf(MOI[k][1].toUpperCase())>=0; }
   ok('xem trước từng mẫu: đúng "Mẫu số …" + tiêu đề', Object.keys(kq).every(k=>kq[k]), JSON.stringify(kq));
   /* dùng chung với 12/GDX */
   gdxDoiMau('m12'); await w(300); const d = gdxDiem(gdxC().m12SelectedDiem);
   gdxDat('m12GDV', 'Cán Bộ Giả A', 1); gdxDat('m12KSV', 'Cán Bộ Giả B', 1); gdxDat('m12ToTruong', 'Cán Bộ Giả C', 1);
   gdxDoiMau('g10'); await w(350); let t10 = chu(fd().body.innerHTML);
   ok('10/GDX dùng chung với 12/GDX: điểm, mã điểm, ngày GD, GDV / KSV / Tổ trưởng tổ GD', !!d && t10.indexOf(d.tenDiem)>=0 && t10.indexOf(d.maDiem)>=0 && t10.indexOf('Cán Bộ Giả A')>=0 && t10.indexOf('Cán Bộ Giả C')>=0
     && (gdxC().m12NgayGD ? t10.indexOf(gdxNgay(gdxC().m12NgayGD).day+'/'+gdxNgay(gdxC().m12NgayGD).month)>=0 : true), d && d.tenDiem);
   ok('10/GDX: đủ 12 mệnh giá 500.000 → 100 + phần điều chuyển về quỹ trung tâm', ['500.000','200.000','100.000','50.000','20.000','10.000','5.000','2.000','1.000'].every(m=>t10.indexOf(m)>=0) && /ĐIỀU CHUYỂN TIỀN MẶT VỀ QUỸ TRUNG TÂM/i.test(t10));
   ok('khai báo riêng 10/GDX có mục chung 12/GDX (ngày GD, GDV · KSV · TT tổ GD)', GDX_MUC.g10.map(x=>x.k).join()==='dau12,ngaygd,ba' && !!document.getElementById('gdx-m-ngaygd') && !!document.getElementById('gdx-m-ba'));
   /* 06: Thủ quỹ/GDV = GDV; kính gửi đủ tên PGD */
   gdxDoiMau('g06'); await w(300); const t06 = chu(fd().body.innerHTML);
   ok('06/GDX: Thủ quỹ/GDV = GDV 12/GDX, kính gửi Giám đốc + tên PGD, ô số tiền để chấm', t06.indexOf('Thủ quỹ/GDV: Cán Bộ Giả A')>=0 && t06.indexOf('Kính gửi: Giám đốc '+gdxC().tenPGDTrongVanBan)>=0 && [...fd().querySelectorAll('.g4-fl')].some(e=>/tạm ứng, tiếp quỹ:/.test(e.textContent) && e.querySelector('.g4-f')));
   /* 07: SĐT chấm → cảnh báo vàng; khai SĐT → in */
   gdxDoiMau('g07'); await w(300);
   ok('07/GDX chưa khai SĐT → mục III.5 để chấm + cảnh báo vàng (không chặn)', /Phòng giao dịch NHCSXH Gò Dầu: …/.test(chu(fd().body.innerHTML)) && gdxTom().canh.some(c=>c.muc==='vang' && c.k==='g4sdt'));
   gdxDat('g4Sdt', '0000 000 000', 1); await w(300);
   ok('07/GDX khai SĐT → in ở III.5; đủ 3 phần I · II · III (5 · 6 · 5 ý)', chu(fd().body.innerHTML).indexOf('Gò Dầu: 0000 000 000')>=0 && fd().querySelectorAll('.g4-p').length===16 && gdxTom().canh.length===0);
   /* 09 / 11: mã thẻ, nhóm */
   gdxDoiMau('g09'); await w(300); const t09 = chu(fd().body.innerHTML);
   ok('09/GDX: PASSBOOKTIDE + PASSBOOKCASA, Cộng từng nhóm, Tổng cộng', t09.indexOf('PASSBOOKTIDE')>=0 && t09.indexOf('PASSBOOKCASA')>=0 && (t09.match(/Cộng/g)||[]).length===8 && t09.indexOf('Tổng cộng')>=0);
   ok('09/GDX: mọi hàng bảng đủ 14 cột', [...fd().querySelectorAll('.g4-b tbody tr')].every(r=>[...r.cells].reduce((a, c)=>a+(+c.colSpan||1), 0)===14));
   gdxDoiMau('g11'); await w(300); const t11 = chu(fd().body.innerHTML);
   ok('11/GDX: nhóm Mất · Hỏng, Cộng, Tổng cộng, 3 người ký', /1 Mất/.test(t11) && /2 Hỏng/.test(t11) && t11.indexOf('Tổng cộng')>=0 && t11.indexOf('TỔ TRƯỞNG TỔ GIAO DỊCH')>=0);
   /* 14 / 15: cột cuối khác nhau, người ký thứ 2 khác nhau, ngày */
   gdxDoiMau('g14'); await w(300); const t14 = chu(fd().body.innerHTML);
   gdxDoiMau('g15'); gdxDat('g4NgayKho', 'hom', 1); await w(300); const t15 = chu(fd().body.innerHTML), hp = gdxNgay(gdxHom());
   ok('14/GDX cột GHI CHÚ + Người nhận; 15/GDX cột TÌNH TRẠNG + Người giao', /GHI CHÚ/.test(t14) && t14.indexOf('Người nhận Thủ kho')>=0 && /TÌNH TRẠNG/.test(t15) && t15.indexOf('Người giao Thủ kho')>=0);
   ok('15/GDX ngày = Hôm nay; 14/GDX ngày để chấm', t15.indexOf('Ngày '+hp.day+' tháng '+hp.month+' năm '+hp.year)>=0 && /Ngày …+ tháng …+ năm …+/.test(t14), t15.slice(t15.indexOf('Ngày'), t15.indexOf('Ngày')+26));
   /* chưa chọn điểm → cảnh báo đỏ (vẫn in được) */
   const giu = gdxC().m12SelectedDiem; gdxC().m12SelectedDiem = ''; gdxC().form = 'g09';
   ok('09/GDX chưa chọn điểm → cảnh báo đỏ, tên / mã điểm để chấm', gdxTom().canh.some(c=>c.muc==='do') && /điểm giao dịch …/i.test(chu(gdxDung(gdxChup()).than)));
   gdxC().m12SelectedDiem = giu; gdxDoiMau('g03'); await w(300);
   /* bản in đầy đủ cho từng mẫu (đếm trang ở ngoài) */
   const ban = {}; for(const k of Object.keys(MOI)){ gdxC().form = k; const X = gdxChup(), B = gdxDung(X); ban[k] = {h:gdxTrang(B.than, B.css), f:gdxTenFile(X)}; }
   ok('tên file PDF theo mẫu (Mau03GDX_<điểm>_<ngày>…)', /^Mau03GDX_/.test(ban.g03.f) && /^Mau14GDX_PhieuXuatKho_/.test(ban.g14.f) && ban.g07.f==='Mau07GDX_NoiDungPhoBien', ban.g03.f);
   /* nhật ký in: in 10/GDX → có dòng, tên mẫu đúng */
   gdxDoiMau('g10'); await w(200); gdxNKThem(gdxChup()); gdxNKMo(); await w(200);
   ok('📜 nhật ký in: dòng 💰 10/GDX', document.getElementById('hop').textContent.indexOf('💰 10/GDX')>=0); dongHop();
   /* mẫu cũ vẫn chạy */
   gdxDoiMau('m12'); await w(300); const t12 = chu(fd().body.innerHTML);
   gdxDoiMau('m04'); await w(300); const t04 = chu(fd().body.innerHTML);
   ok('mẫu cũ vẫn xem được: 12/GDX (GDV chung) · 04/TD', /BẢNG KÊ GIAO, NHẬN, TIÊU HỦY BIÊN LAI/.test(t12) && t12.indexOf('Cán Bộ Giả A')>=0 && /THÔNG BÁO/.test(t04));
   return {o:o, ban:ban}; }, files);
 R.o.forEach(x=>console.log(x));
 /* đếm trang khi in (Chromium PDF, khổ theo @page của mẫu) */
 const can = {g03:2, g06:1, g07:1, g09:1, g10:1, g11:1, g14:1, g15:1}, dem = {};
 for(const k of Object.keys(R.ban)){ const q = await b.newPage(); await q.setContent(R.ban[k].h); await q.emulateMedia({media:'print'});
   const pdf = await q.pdf({preferCSSPageSize:true}); dem[k] = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)||[]).length; await q.close(); }
 console.log((Object.keys(can).every(k=>dem[k]===can[k]) ? '✓ ' : '✗ ')+'in trọn trang: 03/GDX 2 tờ, các mẫu khác 1 trang — '+JSON.stringify(dem));
 if(process.env.T380_SNAP) for(const k of Object.keys(R.ban)) fs.writeFileSync(path.join(process.env.T380_SNAP, k+'.html'), R.ban[k].h);
 if(process.env.T380_ANH){ for(const k of Object.keys(R.ban)){ const q = await b.newPage({viewport:{width:1250, height:900}}); await q.setContent(R.ban[k].h); await q.emulateMedia({media:'print'});
   fs.writeFileSync(path.join(process.env.T380_ANH, k+'.pdf'), await q.pdf({preferCSSPageSize:true})); await q.close(); } }
 if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 await b.close(); })();
