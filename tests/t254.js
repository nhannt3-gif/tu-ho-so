// 3.301 🔎 ĐỐI CHIẾU CHÉO phân bổ KH (anh 21/10: "tại mỗi QĐ tổng giao của Biểu 07 phải khớp số giao của QĐ và dư nợ đến cuối năm cũng khớp theo QĐ";
//   "chỉ tiêu đến 31/12 ghi trên QĐ, còn thực tế sẽ có chênh lệch") — pbDoiChieu (js/47) + màn đối chiếu (js/48), bộ GIẢ tests/gianho31 + QĐ giả.
//   ① từng QĐ: nhập lệch · Biểu 07 Σ tăng/giảm = số giao, Σ năm = Đến 31/12, Σ trước = Đã giao · ② chuỗi Đã giao = Đến 31/12 QĐ trước (ngưỡng) · ③ đầu năm ↔ dư nợ 31/12 năm trước · ④ cả năm ↔ Đến 31/12 QĐ cuối
//   ⑤ màn hình: tóm tắt, chỉ nhóm lệch, bấm dòng → mở QĐ để phân bổ, dư nợ thực tế chỉ tham khảo, bản in · không lỗi trang.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const Q = (Id, So, Ngay, TenXa, ChiTiet, Loai) => ({Id, SoQD:So, KyHieuVanBan:'/QĐ-GIẢ', NgayQD:Ngay+'T00:00:00', NguonVon:1, Loai:Loai || 'Điều chỉnh', Dot:'', TenXa, NgayGhiNhan:Ngay+'T09:00:00', ChiTiet});
 const C = (Ma, dg, tg, den) => ({MaChuongTrinh:Ma, TenChuongTrinh:'', ChiTieuDaGiao:dg, GiaoTangGiam:tg, ChiTieuDen3112:den});
 const wpf = {DanhSachQD:[
   Q('a1', 'G100', '2026-08-14', 'Phường Gò Dầu', [C(3, 1000, 300, 1300), C(6, 800, -150, 650)]),
   Q('a2', 'G101', '2026-09-10', 'Phường Gò Dầu', [C(3, 1300, 200, 1500)]),          /* chuỗi đúng */
   Q('a3', 'G102', '2026-10-05', 'Phường Gò Dầu', [C(6, 600, 100, 700)]),            /* đứt chuỗi: Đã giao 600 ≠ 650 */
   Q('b1', 'G100', '2026-08-14', 'Xã Truông Mít', [C(3, 500, 200, 800)])]};          /* nhập lệch: 500 + 200 ≠ 800 */
 const r = await p.evaluate(async([files, wpf]) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   /* ① – ④ hàm thuần */
   const ap = [{k:'a', ten:'Ấp A'}, {k:'b', ten:'Ấp B'}, {k:'c', ten:'Ấp C'}];
   const qd = [
     {id:'1', so:'1', ngay:'2026-02-01', luc:'1', nguon:1, loai:'Điều chỉnh', xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1000, tangGiam:300, den3112:1300}, {ma:'06', daGiao:500, tangGiam:100, den3112:700}]},
     {id:'2', so:'2', ngay:'2026-06-01', luc:'2', nguon:1, loai:'Điều chỉnh', xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1300.5, tangGiam:-100, den3112:1200.5}]},
     {id:'3', so:'3', ngay:'2026-09-01', luc:'3', nguon:1, loai:'Điều chỉnh', xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1250, tangGiam:50, den3112:1300}]},
     {id:'4', so:'4', ngay:'2025-09-01', luc:'4', nguon:1, loai:'Điều chỉnh', xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1, tangGiam:1, den3112:2}]}];   /* năm khác — bỏ */
   const tinh = q => pbPhanBo(q, {cheDo:'td', ap:ap, ch:{}});
   const dn = (xa, ma) => ma==='03' ? 1000.4 : ma==='06' ? 450 : null;
   const d = pbDoiChieu(qd, 2026, tinh, dn, 1), g3 = d.dong.find(x => x.ma==='03'), g6 = d.dong.find(x => x.ma==='06');
   o.nhom = d.tong.nhom+' nhóm · '+d.tong.dong+' lượt · '+d.tong.loi+' lệch';
   o.q1 = g3.ds[0].ok && g3.ds[0].b07 && g3.ds[0].b07.khopGiao && g3.ds[0].b07.khopDen && g3.ds[0].b07.dc===300 && g3.ds[0].b07.nam===1300;
   o.nguong = g3.ds[1].ok && g3.ds[1].dut===0.5;                       /* Đã giao 1300,5 vs 1300 — lệch 0,5 ≤ ngưỡng 1 */
   o.dut = !g3.ds[2].ok && g3.ds[2].dut===49.5 && /đứt chuỗi/.test(g3.ds[2].lyDo.join());
   o.dau = g3.dau.duNo===1000 && g3.dau.ok && !g6.dau.ok && g6.dau.lech===50;
   o.cuoi = g3.cuoi.tinh===1250 && g3.cuoi.den===1300 && !g3.cuoi.ok && g3.cuoi.lech===-50;
   o.nhap = !g6.ds[0].ok && /QĐ nhập lệch/.test(g6.ds[0].lyDo.join());
   const tinhSai = q => { const k = pbPhanBo(q, {cheDo:'td', ap:ap, ch:{}}); if(q.id==='1'){ pbSuaTay(k[0], 0, k[0].ap[0].dc + 100); } return k; };   /* như sửa tay lệch */
   const d2 = pbDoiChieu(qd, 2026, tinhSai, null, 1), x1 = d2.dong.find(x => x.ma==='03').ds[0];
   o.b07Lech = !x1.ok && /Biểu 07: Σ tăng\/giảm \+400 ≠ số giao QĐ \+300/.test(x1.lyDo.join()) && /Σ chỉ tiêu năm/.test(x1.lyDo.join());
   const d3 = pbDoiChieu(qd, 2026, () => null, null, 1);
   o.chuaAp = d3.dong[0].ds[0].b07 && d3.dong[0].ds[0].b07.chua===true;
   o.namKhac = !d.dong.some(g => g.ds.some(x => x.q.id==='4'));
   /* ⑤ màn hình */
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   doiNgan(7); slDoiTab('pb'); for(let i=0;i<80 && !(PB.K && document.getElementById('pb-trai'));i++) await w(250);
   const inp = document.querySelector('input[data-lenh="pb.nhapWPF"]'), dt = new DataTransfer();
   dt.items.add(new File([JSON.stringify(wpf)], 'SaoLuu_QD_gia.json', {type:'application/json'})); inp.files = dt.files; inp.dispatchEvent(new Event('change', {bubbles:true}));
   for(let i=0;i<40 && pbDL().qd.length<4;i++) await w(100); dongHop(); await w(100);
   document.querySelector('[data-lenh="pb.dc"]').click(); for(let i=0;i<40 && !document.querySelector('.pb-dc-tom');i++) await w(150);
   o.tom = (document.querySelector('.pb-dc-tom') || {}).textContent || '';
   o.nhomUI = document.querySelectorAll('#pb-dc .pb-dc-nhom').length+' · lệch '+document.querySelectorAll('#pb-dc .pb-dc-nhom.pb-loi').length;
   const txt = document.getElementById('pb-dc').textContent;
   o.uiLyDo = /đứt chuỗi/.test(txt) && /QĐ nhập lệch/.test(txt) && /Khớp Đến 31\/12 QĐ cuối/.test(txt);
   o.thucTe = /Thực tế T8\/2026/.test(txt) && /tham khảo/.test(txt) && /đạt [\d.]+ %/.test(txt);
   o.chuaDau = /chưa có Mẫu 31 kỳ 12\/2025/.test(o.tom);
   o.nutIn = Array.from(document.querySelectorAll('#pb-phai .xuat-hang button')).map(x => x.textContent.trim()+(x.disabled ? '(mờ)' : '')).join(' ');
   const h = pbDCIn(); o.in = /ĐỐI CHIẾU CHÉO PHÂN BỔ KẾ HOẠCH NĂM 2026/.test(h) && /A4 landscape/.test(h) && !/data-lenh/.test(h);
   document.querySelector('[data-lenh="pb.dcLech"]').click(); await w(300);
   o.chiLech = document.querySelectorAll('#pb-dc .pb-dc-nhom').length===document.querySelectorAll('#pb-dc .pb-dc-nhom.pb-loi').length && document.querySelectorAll('#pb-dc .pb-dc-nhom').length>0;
   const dong = Array.from(document.querySelectorAll('#pb-dc tr[data-lenh="pb.dcMo"]')).find(x => /G102/.test(x.textContent)); dong.click(); await w(600);
   const q = pbQDChon(); o.mo = PB.che==='' && q && q.so==='G102' && !!document.querySelector('[data-lenh="pb.b07"]') && !!PB.kq;
   return o; }, [files, wpf]);
 ok('gom theo xã · CT · nguồn trong năm (bỏ QĐ năm khác)', r.nhom==='2 nhóm · 4 lượt · 2 lệch' && r.namKhac, r.nhom);
 ok('QĐ khớp: Biểu 07 Σ tăng/giảm = số giao (+300), Σ năm = Đến 31/12 (1.300)', r.q1);
 ok('chuỗi: Đã giao lệch QĐ trước ≤ ngưỡng 1 tr → coi như khớp', r.nguong);
 ok('chuỗi: Đã giao ≠ Đến 31/12 QĐ trước → ✗ đứt chuỗi', r.dut);
 ok('đầu năm: Đã giao QĐ đầu ↔ dư nợ 31/12 năm trước (làm tròn triệu; lệch 50 → ✗)', r.dau);
 ok('cả năm: Đã giao đầu + Σ tăng/giảm ↔ Đến 31/12 QĐ cuối (1.250 ≠ 1.300 → ✗)', r.cuoi);
 ok('QĐ nhập lệch (Đã giao + Tăng/giảm ≠ Đến 31/12) → ✗', r.nhap);
 ok('Biểu 07 lệch (sửa tay) → ✗ Σ tăng/giảm ≠ số giao, Σ năm ≠ Đến 31/12', r.b07Lech);
 ok('xã chưa có danh sách ấp → Biểu 07 "chưa có ấp"', r.chuaAp);
 ok('màn 🔎: tóm tắt số nhóm lệch', /✗ 2 \/ 3 nhóm/.test(r.tom) && /5 lượt QĐ năm 2026/.test(r.tom), r.tom.slice(0, 120));
 ok('màn 🔎: 3 nhóm (Gò Dầu 03, 06 · Truông Mít 03), 2 lệch', r.nhomUI==='3 · lệch 2', r.nhomUI);
 ok('màn 🔎: lý do đứt chuỗi / nhập lệch, dòng cả năm khớp', r.uiLyDo);
 ok('dư nợ thực tế (Mẫu 31 kỳ mới nhất trong năm) chỉ để tham khảo, có % đạt', r.thucTe);
 ok('chưa có Mẫu 31 kỳ 12 năm trước → báo, không so đầu năm', r.chuaDau);
 ok('bộ nút xuất: In · PDF bật', /🖨 In/.test(r.nutIn) && !/In\(mờ\)/.test(r.nutIn) && /PDF/.test(r.nutIn) && !/PDF\(mờ\)/.test(r.nutIn), r.nutIn);
 ok('bản in A4 ngang, không dòng bấm', r.in);
 ok('chỉ nhóm lệch', r.chiLech);
 ok('bấm dòng QĐ → về phân bổ QĐ đó, đã chạy phân bổ', r.mo);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); const dat = R.filter(x => x[0]==='✓').length; console.log(dat+'/'+R.length+' đạt');
 await b.close(); process.exit(dat===R.length ? 0 : 1);
})();
