// 3.496 (anh 07/11): 🏢 Giao dịch xã — 👥 Tổ giao dịch khai tay + chip vai (03/GDX trực quan) và 📘 Nhiệm vụ Tổ giao dịch (1 mặt A4).
//   ① tổ trống → lấy sẵn Tổ trưởng · KSV · GDV của 12/GDX · thêm người, gõ tên, bấm vai; 1 Tổ trưởng · 1 GDV chính; đồng bộ ngược 12/GDX (tên khai tay vẫn hiện ở ô chọn)
//   ② quy tắc VB 4368: < 3 người, thiếu Tổ trưởng / GDV chính / KSV, Tổ trưởng bảo vệ tại điểm + kiêm KSV, GDV chính lái xe / bảo vệ, lái xe = bảo vệ — cảnh báo, không chặn
//   ③ ⭐ lưu / chọn lại tổ hay dùng (PA 1/2/3 bỏ ở 3.511)
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
   gdxC().danhSachCanBo = ['Cán Bộ Giả A', 'Cán Bộ Giả B', 'Kiểm Soát Giả C', 'Giao Dịch Giả D', 'Gõ Phím Giả'];   /* 3.510: ô chọn lấy từ khai báo cán bộ */ gdxC().m12ToTruong = 'Cán Bộ Giả A'; gdxC().m12GDV = 'Cán Bộ Giả B';
   const S = gdxCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.to = '';
   slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(400);
   const fd = () => chu(document.getElementById('gdx-khung').contentDocument.body.innerHTML);
   const bam = async (sel) => { const e = document.querySelector(sel); if(!e) return false; e.click(); await w(250); return true; };
   /* 3.510 (anh 10/11 "khung cố định theo thứ tự tổ trưởng, ksv, gdv chính, gdv"): mỗi vai 1 ô; cùng tên ở 2 ô = kiêm */
   const oGo = async (v, ten, cu) => { const e = [...document.querySelectorAll('[data-lenh="g4.o"][data-v="'+v+'"]')].find(x => cu ? x.getAttribute('data-cu')===cu : !x.getAttribute('data-cu')); if(!e) return false; e.value = ten; e.dispatchEvent(new Event('change', {bubbles:true})); await w(250); return true; };
   const ai = t => gdxC().g4To.find(x => x.ten===t) || {vai:[]}, co = (t, v) => ai(t).vai.indexOf(v)>=0;
   o.chip = [...document.querySelectorAll('.gdx2-mau .gdx-c')].some(e => /📘 Nhiệm vụ/.test(e.textContent));
   gdxDoiMau('g03'); await w(400);
   const to = () => gdxC().g4To;
   o.moi = to().length===2 && to()[0].ten==='Cán Bộ Giả A' && to()[0].vai.join()==='tt' && to()[1].vai.join()==='gdvc' && !!document.getElementById('gdx-m-g4to');
   const thuTu = [...document.querySelectorAll('#gdx-m-g4to .g4-o-vai')].map(e => e.textContent).filter(Boolean).join('|');
   o.khung = thuTu==='Tổ trưởng|Kiểm soát viên|GDV chính|Giao dịch viên|Giao dịch viên|Giao dịch viên' && !document.querySelector('#gdx-m-g4to [data-lenh="g4.vai"]') && !!document.querySelector('[data-lenh="g4.oThem"][data-v="ksv"]') && !!document.querySelector('[data-lenh="g4.oThem"][data-v="gdv"]'); o.thuTu = thuTu;
   /* điền KSV, GDV vào đúng ô */
   await oGo('ksv', 'Kiểm Soát Giả C'); await oGo('gdv', 'Giao Dịch Giả D');
   o.tuThem = to().length===4 && co('Kiểm Soát Giả C', 'ksv') && co('Giao Dịch Giả D', 'gdv') && document.querySelectorAll('[data-lenh="g4.o"][data-v="gdv"]').length===3;
   /* GDV: ＋ thêm → 4 dòng · × dòng trống → bớt */
   await bam('[data-lenh="g4.oThem"][data-v="gdv"]'); const g4n = document.querySelectorAll('[data-lenh="g4.o"][data-v="gdv"]').length;
   await bam('[data-lenh="g4.oBo"][data-v="gdv"]:not([data-cu])'); await bam('[data-lenh="g4.oBo"][data-v="gdv"]:not([data-cu])');
   o.themXoa = g4n===4 && document.querySelectorAll('[data-lenh="g4.o"][data-v="gdv"]').length===2;
   /* 1 GDV chính: gõ D vào ô GDV chính → D thôi GDV, B thôi GDV chính (không còn vai → bỏ) */
   /* 3.510 loại trừ (anh "tổ trưởng có thể kiêm KSV, còn các nơi khác loại trừ cán bộ như cũ"): gợi ý từng ô bỏ người giữ vai khác; gõ người đang là GDV vào ô GDV chính → không nhận */
   const goiY = v => [...document.querySelector('select[data-lenh="g4.o"][data-v="'+v+'"]').options].map(x => x.value).filter(Boolean);
   o.loaiTru = goiY('gdvc').indexOf('Kiểm Soát Giả C')<0 && goiY('gdvc').indexOf('Giao Dịch Giả D')<0 && goiY('ksv').indexOf('Cán Bộ Giả A')>=0 && goiY('tt').indexOf('Kiểm Soát Giả C')>=0 && goiY('gdv').indexOf('Cán Bộ Giả A')<0; o.goiY = goiY('gdvc').join(',')+' / '+goiY('ksv').join(',');
   o.motChi = [document.querySelectorAll('select[data-lenh="g4.o"]').length, !!document.querySelector('#gdx-m-g4to input.g4-to-ten'), goiY('gdvc').join(';'), ai('Giao Dịch Giả D').vai.join(), co('Cán Bộ Giả B', 'gdvc')].join(' · ');
   o.mot = document.querySelectorAll('select[data-lenh="g4.o"]').length>=4 && !document.querySelector('#gdx-m-g4to input.g4-to-ten') && goiY('gdvc').indexOf('Giao Dịch Giả D')<0 && ai('Giao Dịch Giả D').vai.join()==='gdv' && co('Cán Bộ Giả B', 'gdvc');
   o.dongBo = gdxC().m12GDV==='Cán Bộ Giả B' && gdxC().m12KSV==='Kiểm Soát Giả C' && gdxC().m12ToTruong==='Cán Bộ Giả A';
   await oGo('gdvc', 'Cán Bộ Giả B'); await oGo('gdv', 'Giao Dịch Giả D');   /* trả lại: B GDV chính, D GDV */
   /* quy tắc: chưa có lái xe / bảo vệ đường */
   const canh = () => gdxTom().canh.map(x => x.muc+':'+x.chu).join(' | ');
   o.thieuDuong = /vang:Đi đường: chưa có lái xe/.test(canh()) && /vang:Đi đường: chưa có bảo vệ/.test(canh());
   o.khongPA = !document.querySelector('[data-lenh="g4.pa"]') && !document.getElementById('gdx-m-g4pa');   /* 3.511 anh "phần phương án bỏ" */
   /* 3.510 kiêm nhiệm (anh "Tổ trưởng kiêm bảo vệ, KSV hoặc GDV kiêm lái xe"): nút 🚗 Lái xe · 🛡 Bảo vệ ở dòng; Bảo vệ = đường + tại điểm */
   const kiem = (t, k) => bam('[data-lenh="g4.kiem"][data-cu="'+t+'"][data-k="'+k+'"]');
   await kiem('Cán Bộ Giả A', 'bv'); await kiem('Kiểm Soát Giả C', 'lx');
   o.kiem = co('Cán Bộ Giả A', 'bvd') && co('Cán Bộ Giả A', 'bvt') && !co('Cán Bộ Giả A', 'lx') && co('Kiểm Soát Giả C', 'lx') && !co('Kiểm Soát Giả C', 'bvd') && document.querySelector('[data-lenh="g4.kiem"][data-cu="Cán Bộ Giả A"][data-k="bv"]').classList.contains('bat');
   await kiem('Giao Dịch Giả D', 'lx'); o.motLai = co('Giao Dịch Giả D', 'lx') && !co('Kiểm Soát Giả C', 'lx'); await kiem('Kiểm Soát Giả C', 'lx');
   const nutK = t => [...document.querySelectorAll('[data-lenh="g4.kiem"][data-cu="'+t+'"]')].map(e => e.getAttribute('data-k')).join(',');
   o.chiKiem = nutK('Cán Bộ Giả A')==='bv' && nutK('Kiểm Soát Giả C')==='lx' && nutK('Giao Dịch Giả D')==='lx' && nutK('Cán Bộ Giả B')===''; o.chiKiemChi = [nutK('Cán Bộ Giả A'), nutK('Kiểm Soát Giả C'), nutK('Giao Dịch Giả D')].join(' | ');
   { const t = [{ten:'T', vai:['tt']}, {ten:'K', vai:['ksv']}]; g4KiemDoi(t, 'T', 'lx'); g4KiemDoi(t, 'K', 'bv'); o.chiKiem = o.chiKiem && t[0].vai.join()==='tt' && t[1].vai.join()==='ksv'; }
   o.dungQD = !canh() && /Đúng quy định thành phần/.test(document.querySelector('.g4-to-canh').textContent);
   /* Tổ trưởng kiêm KSV (＋ thêm KSV, gõ cùng tên) + bảo vệ → đỏ */
   await bam('[data-lenh="g4.oThem"][data-v="ksv"]'); await oGo('ksv', 'Cán Bộ Giả A'); o.ttKiem = /do:Tổ trưởng làm bảo vệ tại điểm thì không kiêm Kiểm soát viên/.test(canh()) && document.querySelectorAll('[data-lenh="g4.o"][data-v="ksv"][data-cu]').length===2;
   await bam('[data-lenh="g4.oBo"][data-v="ksv"][data-cu="Cán Bộ Giả A"]'); await bam('[data-lenh="g4.oBo"][data-v="ksv"]:not([data-cu])');
   /* GDV chính (áp tải) không có nút kiêm */
   o.gdvcLai = !document.querySelector('[data-lenh="g4.kiem"][data-cu="Cán Bộ Giả B"]') && !!document.querySelector('[data-lenh="g4.kiem"][data-cu="Giao Dịch Giả D"]');
   /* 3.510 💾 phiên giao dịch theo điểm */
   { gdxDat('m12NgayGD', '2026-08-10', 1); await w(300); const dm = gdxC().m12SelectedDiem, ch = [];
     ch.push(!!document.querySelector('[data-lenh="g4.phLuu"]:not([disabled])')); await bam('[data-lenh="g4.phLuu"]');
     const ph = () => gdxC().g4Phien || []; ch.push(ph().length===1 && ph()[0].id===dm+'|2026-08-10' && ph()[0].d.g4To.length===4);
     const cu = JSON.stringify(to()); gdxC().g4To = [{ten:'Khác Giả', vai:['tt']}]; gdxC().m12GDV = ''; gdxVe(); await w(200);
     await bam('[data-lenh="g4.phMo"]'); ch.push(document.querySelectorAll('#hop-in .g4-ph-bang tbody tr').length===1 && /Cán Bộ Giả A/.test(document.querySelector('#hop-in .g4-ph-bang').textContent));
     await bam('#hop-in [data-lenh="g4.phThang"][data-v="-1"]'); ch.push(!document.querySelector('#hop-in .g4-ph-bang') && /Tháng 07\/2026/.test(document.getElementById('hop-in').textContent));
     await bam('#hop-in [data-lenh="g4.phThang"][data-v="1"]'); await bam('#hop-in [data-lenh="g4.phDung"]'); await w(300);
     ch.push(JSON.stringify(to())===cu && gdxC().form==='g03');
     gdxC().m12GDV = ''; await bam('[data-lenh="g4.phMo"]'); await bam('#hop-in [data-lenh="g4.phM12"]'); await w(400);
     ch.push(gdxC().form==='m12' && gdxC().m12GDV==='Cán Bộ Giả B' && gdxC().m12KSV==='Kiểm Soát Giả C' && gdxC().m12ToTruong==='Cán Bộ Giả A' && /Cán Bộ Giả B/.test(fd()));
     gdxDoiMau('g03'); await w(300);
     /* 3.510 khai báo riêng giờ cố định + km theo điểm → lưu kèm phiên; 📊 Excel tháng = bảng phân công */
     gdxDat('g4GioBD', '07:00', 1); gdxDat('g4GioKT', '10:30', 1); await w(200); const km = document.querySelector('[data-lenh="g4.km"]'); if(km){ km.value = '32'; km.dispatchEvent(new Event('change', {bubbles:true})); await w(200); }
     await bam('[data-lenh="g4.phLuu"]'); ch.push(ph().length===1 && ph()[0].v===1 && ph()[0].gio.bd==='07:00' && ph()[0].gio.kt==='10:30' && ph()[0].km===32);
     { let bl = null, ten = ''; const tx = window.taiXuongBlob; window.taiXuongBlob = (b, t) => { bl = b; ten = t; }; await bam('[data-lenh="g4.phMo"]'); await bam('#hop-in [data-lenh="g4.phExcel"]'); for(let i=0;i<40 && !bl;i++) await w(100); window.taiXuongBlob = tx;
       let okx = false; if(bl){ const wb = XLSX.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}), a = XLSX.utils.sheet_to_json(wb.Sheets['Phan cong'], {header:1}); const lx = a.find(r => r[3]==='Kiểm Soát Giả C'); okx = /Phan cong To GD 2026-08/.test(ten) && a.length===3+4 && !!lx && lx[5]==='x' && lx[12]===32 && lx[9]==='07:00'; }
       ch.push(okx); try { dongHop(); } catch(e){} }
     const cf = window.confirm; window.confirm = () => true; gdxC().g4Phien.push({id:'x|2026-08-11', diem:'x', tenDiem:'Giả', ngay:'2026-08-11', luc:'', d:{g4To:[]}}); await bam('[data-lenh="g4.phMo"]');
     await bam('#hop-in [data-lenh="g4.phXoa"][data-id="x|2026-08-11"]'); window.confirm = cf; ch.push(ph().length===1); try { dongHop(); } catch(e){}
     o.phien = ch.every(Boolean); o.phienChi = ch.map(x => x ? 1 : 0).join(''); o.nkPh = !('g4Phien' in gdxChup().C);
     /* thiếu phiên từ 11/2026 (giả lập hôm nay 31/12/2026) → cảnh báo + hộp tháng 11 có ＋ Khai bổ sung → chọn đúng điểm + ngày ở 03/GDX */
     const nayCu = window.nay; window.nay = () => new Date(2026, 11, 31); const dsd = gdxDsDiem().filter(x => +String(x.ngayGD || '').replace(/\D/g, '')), th = [];
     gdxVe(); await w(200); th.push(dsd.length>0 && /Thiếu \d+ phiên \(từ tháng 11\/2026\)/.test(document.getElementById('gdx-m-g4phien').textContent));
     await bam('#gdx-m-g4phien [data-lenh="g4.phMo"][data-v="thieu"]'); const bs = document.querySelector('#hop-in [data-lenh="g4.phBoSung"]');
     th.push(!!bs && /Tháng 11\/2026/.test(document.getElementById('hop-in').textContent) && document.querySelectorAll('#hop-in [data-lenh="g4.phBoSung"]').length===dsd.length);
     const dB = bs && bs.getAttribute('data-diem'), nB = bs && bs.getAttribute('data-ngay'); if(bs){ bs.click(); await w(400); }
     th.push(gdxC().m12SelectedDiem===dB && gdxC().m12NgayGD===nB && /^2026-11-/.test(nB) && gdxC().form==='g03'); const dbg = [dB, nB, gdxC().m12SelectedDiem, gdxC().m12NgayGD, gdxC().form].join(',');
     await bam('[data-lenh="g4.phLuu"]'); th.push(gdxC().g4Phien.some(p => p.id===dB+'|'+nB) && g4PhienThieu(gdxDsDiem(), gdxC().g4Phien, '2026-12-31').every(x => !(x.diem===dB && x.ngay.slice(0, 7)==='2026-11')));
     window.nay = nayCu; gdxC().g4Phien = gdxC().g4Phien.filter(p => p.id!==dB+'|'+nB); try { dongHop(); } catch(e){} gdxDat('m12NgayGD', '2026-08-10', 1); await w(200);
     o.thieu = th.every(Boolean); o.thieuChi = th.map(x => x ? 1 : 0).join('')+' · '+dsd.length+' điểm · '+dbg; }
   /* 03/GDX */
   gdxDat('g4Xe', 'Ô tô / 70A-000.00', 1); gdxDat('g4CCHT', 'Dùi cui điện / 000 / 000', 1); await w(300);
   const t3 = fd(), d = gdxDiem(gdxC().m12SelectedDiem);
   o.p1 = /1 Cán Bộ Giả B Áp tải/.test(t3) && /2 Kiểm Soát Giả C Lái xe/.test(t3) && /3 Cán Bộ Giả A Bảo vệ/.test(t3) && t3.indexOf('Ô tô / 70A-000.00')>=0 && t3.indexOf('Dùi cui điện / 000 / 000')>=0;
   o.noi = t3.indexOf('Nơi đi: Trụ sở Phòng giao dịch NHCSXH Gò Dầu')>=0 && t3.indexOf('Nơi đến: Điểm giao dịch '+d.tenDiem)>=0;
   o.p2 = /1 Cán Bộ Giả A Tổ trưởng Thiết bị kết nối mạng/.test(t3) && /2 Kiểm Soát Giả C Kiểm soát viên/.test(t3) && /3 Cán Bộ Giả B Giao dịch viên chính Thùng đựng tiền/.test(t3) && /4 Giao Dịch Giả D Giao dịch viên/.test(t3) && /5 Cán Bộ Giả A Bảo vệ Dùi cui điện/.test(t3);
   o.to2 = document.getElementById('gdx-khung').contentDocument.querySelectorAll('.sheet-a4').length;
   /* 3.497 — bàn phím (QUY_CHUAN 11): Enter ở ô tên → ô kế; ở ô cuối → thêm người; Shift+Enter → ô trước */
   { const phim = (e, k, sh) => e.dispatchEvent(new KeyboardEvent('keydown', {key:k, shiftKey:!!sh, bubbles:true}));
     let e0 = document.querySelectorAll('.g4-to-ten')[0]; e0.focus(); phim(e0, 'Enter'); await w(150);
     o.phimKe = document.activeElement===document.querySelectorAll('.g4-to-ten')[1];
     phim(document.activeElement, 'Enter', 1); await w(150); o.phimLui = document.activeElement===document.querySelectorAll('.g4-to-ten')[0];
     const n0 = to().length, ds = document.querySelectorAll('.g4-to-ten'), cuoi = ds[ds.length-1]; cuoi.focus(); phim(cuoi, 'Enter'); await w(300);
     o.phimThem = to().length===n0 && document.activeElement===cuoi;   /* 3.510 khung cố định: ô cuối không thêm dòng */
     const e2 = document.querySelectorAll('[data-lenh="g4.o"][data-v="gdv"]:not([data-cu])')[0]; e2.focus(); e2.value = 'Gõ Phím Giả'; e2.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
     o.phimGiu = co('Gõ Phím Giả', 'gdv') && document.activeElement && document.activeElement.classList.contains('g4-to-ten');
     await bam('[data-lenh="g4.oBo"][data-v="gdv"][data-cu="Gõ Phím Giả"]'); o.oBo = !to().some(x => x.ten==='Gõ Phím Giả'); }
   /* thuần (QT-19): g4KiemTo không cần màn hình */
   { const ds = [{ten:'A', vai:['tt', 'ksv', 'bvt']}, {ten:'B', vai:['gdvc', 'lx']}];
     const k = g4KiemTo({g4To:ds}).map(x => x.muc+':'+x.chu).join('|');
     o.thuan = /do:Tổ trưởng làm bảo vệ/.test(k) && /do:GDV chính là người áp tải/.test(k) && /tối thiểu 03/.test(k); }
   /* ⭐ tổ hay dùng */
   const pr = window.prompt; window.prompt = () => 'Tổ Giả'; await bam('[data-lenh="g4.hayLuu"]'); window.prompt = pr;
   gdxC().g4To = []; gdxVe(); await w(200); gdxC().g4To = [{ten:'X', vai:[]}]; gdxVe(); await w(200);
   await bam('[data-lenh="g4.hay"][data-i="0"]'); o.hay = to().length===4 && co('Cán Bộ Giả A', 'bvt') && co('Kiểm Soát Giả C', 'lx') && gdxC().g4ToHay[0].ten==='Tổ Giả';
   o.nk = o.nkPh && !('g4ToHay' in gdxChup().C) && Array.isArray(gdxChup().C.g4To);
   /* 12/GDX: tên khai tay hiện ở ô chọn */
   gdxDoiMau('m12'); await w(300); const sel = [...document.querySelectorAll('select[data-a1="m12KSV"] option')].map(e => e.value);
   o.m12 = sel.indexOf('Kiểm Soát Giả C')>=0 && /Kiểm Soát Giả C/.test(fd());
   /* 📘 Nhiệm vụ */
   gdxDoiMau('gnv'); await w(400); const tn = fd();
   o.nv = ['NHIỆM VỤ TỔ GIAO DỊCH XÃ', 'Quy định chung', 'Trước khi đi', 'Tại điểm giao dịch', 'Sau phiên', 'Kiểm soát viên', 'Lái xe', 'Bảo vệ', '4368/HD-NHCS'].filter(x => tn.indexOf(x)<0);
   o.nvTen = /Tổ trưởng Cán Bộ Giả A/.test(tn) && /Kiểm Soát Giả C/.test(tn) && /Giao Dịch Giả D/.test(tn) && tn.indexOf('Điểm GD: '+d.tenDiem)>=0;
   const X = gdxChup(), B = gdxDung(X); o.ban = gdxTrang(B.than, B.css); o.file = gdxTenFile(X);
   gdxDat('g4CoNV', 9.5, 1); await w(200); o.coCanh = /vang:Chữ 9,5 pt có thể sang mặt 2/.test(canh()); const B2 = gdxDung(gdxChup()); o.ban95 = gdxTrang(B2.than, B2.css); gdxDat('g4CoNV', 8.5, 1);
   gdxDoiMau('g03'); await w(200); const B3 = gdxDung(gdxChup()); o.ban03 = gdxTrang(B3.than, B3.css);
   return o; }, files);
 const trang = async h => { const q = await b.newPage(); await q.setContent(h); await q.emulateMedia({media:'print'}); const pdf = await q.pdf({preferCSSPageSize:true}); await q.close(); return (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length; };
 const n85 = await trang(r.ban), n95 = await trang(r.ban95), n03 = await trang(r.ban03);
 ok('chip 📘 Nhiệm vụ ở dải mẫu', r.chip);
 ok('03/GDX: tổ trống → lấy sẵn Tổ trưởng · GDV (chính) của 12/GDX', r.moi);
 ok('3.510 khung cố định: Tổ trưởng · KSV · GDV chính · GDV ×3 đúng thứ tự, nút ＋ thêm KSV / GDV, không còn chip vai', r.khung, r.thuTu);
 ok('gõ tên vào ô KSV / GDV → đúng người, đúng vai; GDV mặc định 3 dòng', r.tuThem);
 ok('＋ thêm GDV → thêm dòng; × dòng trống → bớt', r.themXoa);
 ok('loại trừ: gợi ý ô GDV chính không có KSV / GDV; ô KSV có Tổ trưởng (được kiêm); ô GDV không có Tổ trưởng', r.loaiTru, r.goiY);
 ok('ô chọn từ danh sách khai báo cán bộ (không ô gõ tự do); người đang là GDV không có trong ô GDV chính', r.mot, r.motChi);
 ok('đồng bộ 12/GDX: Tổ trưởng · KSV · GDV = GDV chính', r.dongBo);
 ok('3.510 ⚠ thiếu phiên từ 11/2026: cảnh báo, hộp tháng 11 liệt kê điểm thiếu, ＋ Khai bổ sung chọn đúng điểm + ngày, lưu xong hết thiếu', r.thieu, r.thieuChi);
 ok('3.510 💾 phiên: lưu theo điểm + ngày; 📂 xem theo tháng (‹ tháng trước trống); Mở điền lại 03/GDX; 🖨 12/GDX điền GDV · KSV · Tổ trưởng; lưu lại cùng ngày = ghi đè; xóa', r.phien, r.phienChi);
 ok('quy tắc: chưa có lái xe / bảo vệ đường → cảnh báo vàng', r.thieuDuong);
 ok('3.511 bỏ mục Phương án đi đường (PA 1/2/3)', r.khongPA);
 ok('kiêm nhiệm: Tổ trưởng 🛡 Bảo vệ (đường + tại điểm), KSV 🚗 Lái xe; chỉ 1 lái xe', r.kiem && r.motLai);
 ok('3.511 chỉ Tổ trưởng kiêm 🛡 Bảo vệ; KSV / GDV kiêm 🚗 Lái xe; GDV chính không kiêm (nút + hàm thuần)', r.chiKiem, r.chiKiemChi);
 ok('đủ thành phần → không cảnh báo, báo ✓ đúng quy định', r.dungQD);
 ok('＋ thêm KSV, Tổ trưởng kiêm KSV + bảo vệ → ⛔', r.ttKiem);
 ok('GDV chính (áp tải) không có nút kiêm lái xe / bảo vệ', r.gdvcLai);
 ok('03/GDX Phần I: áp tải = GDV chính, lái xe, bảo vệ, phương tiện, công cụ hỗ trợ', r.p1);
 ok('03/GDX Phần I: nơi đi / nơi đến tự ghi (trụ sở PGD ↔ điểm GD)', r.noi);
 ok('03/GDX Phần II: mỗi vai 1 dòng + CCDC theo vai', r.p2);
 ok('03/GDX vẫn 2 tờ (xem trước) · in 2 trang', r.to2===2 && n03===2, r.to2+'/'+n03);
 ok('bàn phím: Enter ô tên → ô kế, Shift+Enter → ô trước', r.phimKe && r.phimLui);
 ok('bàn phím: Enter ở ô cuối không thêm dòng (khung cố định); gõ xong vẫn đứng ở ô tên; × bỏ người khỏi vai', r.phimThem && r.phimGiu && r.oBo);
 ok('QT-19 thuần: g4KiemTo chạy không cần màn hình', r.thuan);
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
