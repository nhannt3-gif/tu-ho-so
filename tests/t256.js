// 3.308 🎯 PHÂN BỔ KH — điều hướng + sửa lỗi rà soát (anh 21/10): thanh tab ngang 4 mục (nhớ mục, phím 1 – 4, số đỏ lệch), chọn nhanh QĐ · xã,
//   L1 vượt KH đỏ · L3 QĐ chưa ghép xã không cộng · L5 CT phát sinh giữa năm không bỏ sót · L6 sửa tay giữ khi đổi xã · bản chụp Biểu 07 đã xuất. Bộ GIẢ tests/gianho31 + QĐ giả.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const Q = (Id, So, Ngay, TenXa, ChiTiet) => ({Id, SoQD:So, KyHieuVanBan:'/QĐ-GIẢ', NgayQD:Ngay+'T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'', TenXa, NgayGhiNhan:Ngay+'T09:00:00', ChiTiet});
 const C = (Ma, dg, tg, den) => ({MaChuongTrinh:Ma, TenChuongTrinh:'', ChiTieuDaGiao:dg, GiaoTangGiam:tg, ChiTieuDen3112:den});
 const wpf = {DanhSachQD:[Q('a1', 'G100', '2026-07-20', 'Phường Gò Dầu', [C(3, 1000, 300, 1300)]), Q('b1', 'G100', '2026-07-20', 'Xã Truông Mít', [C(3, 500, 200, 800)])]};   /* Truông Mít nhập lệch → đối chiếu báo lệch */
 const r = await p.evaluate(async([files, wpf]) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   /* hàm thuần: L1 · L3 · L5 */
   o.l1 = pbDBMuc(101)==='vuot' && pbDBMuc(99)==='tot' && pbDBMuc(90)==='cham' && /vượt \+50/.test(pbChipCh(50)) && /còn 30/.test(pbChipCh(-30)) && /đúng KH/.test(pbChipCh(0));
   const qd = [{id:'1', so:'1', kyHieu:'', ngay:'2026-03-01', nguon:1, xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:100, tangGiam:50, den3112:150}]},
               {id:'2', so:'2', kyHieu:'', ngay:'2026-03-01', nguon:1, xa:'', tenXa:'Xã Lạ', ct:[{ma:'03', daGiao:900, tangGiam:100, den3112:1000}]}];
   const d = pbDienBien(qd, 2026, {}, {}), dc = pbDoiChieu(qd, 2026, () => null, null, 1);
   o.l3 = d.tong.chuaGhep===1 && d.tong.khCuoi===150 && dc.tong.chuaGhep===1 && dc.tong.nhom===1;
   const thang = [{ky:'2026-03', f:(xa, ma) => xa==='Y' && ma==='19' ? 0 : xa==='X' && ma==='03' ? 140 : 0}, {ky:'2026-06', f:(xa, ma) => xa==='Y' && ma==='19' ? 80 : xa==='X' && ma==='03' ? 150 : 0}, {ky:'2026-09', f:(xa, ma) => xa==='X' && ma==='03' ? 150 : 0}];
   const d5 = pbDienBien(qd, 2026, {}, {dau:(xa, ma) => xa==='X' && ma==='03' ? 100 : 0, kyDau:'2025-12', thang:thang, ds:[{xa:'Y', tenXa:'Xã Y', ct:'19', nguon:1}]});
   const y = d5.nhom.find(n => n.xa==='Y'); o.l5 = !!y && y.khongGiao && y.moi && d5.thang.find(t => t.ky==='2026-06').dn===230;   /* CT Y·19 chỉ có dư nợ tháng 6 → vẫn cộng */
   /* màn hình */
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   delete D.cauHinh.pbMuc; PB.daMoMuc = 0;
   doiNgan(7); slDoiTab('pb'); for(let i=0;i<80 && !(PB.K && document.getElementById('pb-trai'));i++) await w(250);
   const inp = document.querySelector('input[data-lenh="pb.nhapWPF"]'), dt = new DataTransfer();
   dt.items.add(new File([JSON.stringify(wpf)], 'SaoLuu_QD_gia.json', {type:'application/json'})); inp.files = dt.files; inp.dispatchEvent(new Event('change', {bubbles:true}));
   for(let i=0;i<40 && pbDL().qd.length<2;i++) await w(100); dongHop(); await w(300);
   const thanh = () => Array.from(document.querySelectorAll('.pb-thanh .pb-thanh-nut')), lop = () => (document.querySelector('.pb-bo') || {}).className || '';
   o.thanh = thanh().map(x => x.textContent.replace(/\s+/g, ' ').trim()).join(' | ');
   o.macDinh = /muc-qd/.test(lop()) && getComputedStyle(document.getElementById('pb-phai')).display==='none' && getComputedStyle(document.getElementById('pb-trai')).display!=='none';
   o.so = (document.querySelector('.pb-thanh-so') || {}).textContent || '';
   document.dispatchEvent(new KeyboardEvent('keydown', {key:'3', bubbles:true})); await w(300);
   o.phim = /muc-db/.test(lop()) && D.cauHinh.pbMuc==='db' && thanh()[2].classList.contains('bat');
   thanh()[0].click(); await w(200);
   Array.from(document.querySelectorAll('.pb-dong')).find(x => /Gò Dầu/.test(x.textContent)).click(); await w(200);
   const sel = document.querySelector('#pb-phai select[data-lenh="pb.chonSel"]');
   o.sangPB = /muc-pb/.test(lop()) && !!sel && /Gò Dầu/.test(sel.options[sel.selectedIndex].textContent) && sel.options.length===3;
   /* L6: sửa tay → đổi xã → quay lại vẫn giữ */
   document.querySelector('[data-lenh="pb.chay"]').click(); await w(300);
   const o1 = document.querySelector('#pb-kq input[data-lenh="pb.suaTay"][data-ct="0"]'), goc = PB.kq[0].ap[0].dc; o1.value = String(goc + 100); o1.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   const sel2 = document.querySelector('#pb-phai select[data-lenh="pb.chonSel"]'); sel2.value = Array.from(sel2.options).find(x => /Truông Mít/.test(x.textContent)).value; sel2.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   const sel3 = document.querySelector('#pb-phai select[data-lenh="pb.chonSel"]'); sel3.value = Array.from(sel3.options).find(x => /Gò Dầu/.test(x.textContent)).value; sel3.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   o.l6 = !!PB.kq && PB.kq[0].ap[0].dc===goc + 100 && /Có ấp sửa tay/.test(document.getElementById('pb-kq').textContent);
   /* ↺ Chia lại → hết sửa tay → Biểu 07 → Word → bản chụp */
   window.confirm = () => true; document.querySelector('[data-lenh="pb.chiaLai"]').click(); await w(300);
   o.chiaLai = PB.kq && PB.kq[0].ap[0].dc===goc && !document.querySelector('[data-lenh="pb.chiaLai"]');
   document.querySelector('[data-lenh="pb.b07"]').click(); for(let i=0;i<40 && !(PB07.x && document.getElementById('pb07-khung'));i++) await w(100); await w(300);
   o.nut07 = Array.from(document.querySelectorAll('#pb07-nut button')).map(x => (x.getAttribute('onclick') || '')).join(' ');
   let bl = null; const gf = window.giaoFile; window.giaoFile = x => { bl = x; }; pb07Word(); for(let i=0;i<50 && !bl;i++) await w(100); window.giaoFile = gf;
   const b07 = pbDL().b07 || []; o.chup = b07.length===1 && b07[0].kieu==='word' && b07[0].so==='G100' && b07[0].ap.length>0 && Array.isArray(b07[0].ap[0].ds[0]);
   dongHop(); await w(100); pbVePhai(); await w(200);
   o.daXuat = /Biểu 07 đã xuất/.test(document.getElementById('pb-phai').textContent);
   /* đối chiếu: số đỏ + ghi nhận; diễn biến: tô vượt */
   document.querySelector('[data-lenh="pb.dc"]').click(); for(let i=0;i<40 && !document.querySelector('.pb-dc-tom');i++) await w(150);
   o.dc = /muc-dc/.test(lop()) && !!document.querySelector('.pb-dc-tom');
   document.querySelector('[data-lenh="pb.db"]').click(); for(let i=0;i<40 && !document.querySelector('#pb-phai table.pb-mt');i++) await w(150);
   o.vuot = !!document.querySelector('#pb-phai td.pb-mt-o.vuot') && /vượt/.test(document.getElementById('pb-phai').textContent);
   o.gon = (() => { const t = document.querySelector('#pb-phai .pb-mt-cuon'); return t && t.getBoundingClientRect().width <= 1121; })();
   return o; }, [files, wpf]);
 ok('L1 dư nợ vượt KH → đỏ (vuot), ≥ 98 % xanh, < 92 % vàng; chênh: vượt + / còn / đúng KH', r.l1);
 ok('L3 QĐ chưa ghép xã không cộng vào diễn biến / đối chiếu, có đếm để báo', r.l3);
 ok('L5 CT phát sinh dư nợ giữa năm (đầu năm, cuối kỳ = 0) vẫn cộng, gắn "mới"', r.l5);
 ok('thanh tab 4 mục: Quyết định (số QĐ) · Phân bổ · Biểu 07 · Diễn biến · Đối chiếu', /Quyết định 1/.test(r.thanh) && /Phân bổ · Biểu 07/.test(r.thanh) && /Diễn biến/.test(r.thanh) && /Đối chiếu/.test(r.thanh), r.thanh);
 ok('mặc định mục Quyết định: danh sách QĐ hiện, màn phân bổ ẩn', r.macDinh);
 ok('nút Đối chiếu có số đỏ = số nhóm lệch', /^\d+$/.test(r.so) && +r.so>=1, r.so);
 ok('phím 3 → Diễn biến, nhớ mục (D.cauHinh.pbMuc)', r.phim);
 ok('bấm xã ở mục Quyết định → sang Phân bổ, ô chọn nhanh QĐ · xã đúng dòng', r.sangPB);
 ok('L6 sửa tay giữ khi đổi sang xã khác rồi quay lại, có nhãn "Có ấp sửa tay"', r.l6);
 ok('↺ Chia lại → bỏ sửa tay', r.chiaLai);
 ok('Biểu 07: In / PDF qua pb07Xuat (lưu bản chụp)', /pb07Xuat\('in'\)/.test(r.nut07) && /pb07Xuat\('pdf'\)/.test(r.nut07), r.nut07);
 ok('xuất Word → lưu bản chụp nhẹ (số từng ấp, cách xuất) vào KHO1 pb.b07', r.chup);
 ok('màn phân bổ hiện "📜 Biểu 07 đã xuất …"', r.daXuat);
 ok('mục Đối chiếu mở đúng', r.dc);
 ok('mục Diễn biến: ma trận có ô vượt KH tô đỏ', r.vuot);
 ok('bảng gọn: ma trận không kéo quá 1.120 px', r.gon);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); const dat = R.filter(x => x[0]==='✓').length; console.log(dat+'/'+R.length+' đạt');
 await b.close(); process.exit(dat===R.length ? 0 : 1);
})();
