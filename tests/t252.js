// 3.288 P2 🎯 PHÂN BỔ KH — giao diện tab con (js/48-phan-bo-gd.js) trên trình duyệt, bộ GIẢ tests/gianho31 (taogia.py 300 tests/gianho31 m31 — 2 kỳ Mẫu 31 31/07, 31/08/2026).
//   Nút tab con · cây xã → ấp (tiền tố Ấp / Kp) · 📥 nạp QĐ Excel mẫu giả (3.439 — ghép xã, xã lạ báo, trùng → bỏ qua) · phân bổ tương đối / chính xác (kỳ tự động trước QĐ) · sửa tay → lệch → khớp lại
//   · hộp QĐ mới: ngày gõ liền số, tích xã, thêm CT, gợi ý Đã giao theo QĐ trước, Đến 31/12 tự tính, ⚠ đứt chuỗi, lưu · mở lại tích thêm xã · Tab giữ ô · không lỗi trang.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500); await p.evaluate(require('./pb_gia.js'));
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const wpf = {DanhSachQD:[
   {Id:'w1', SoQD:'G100', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-15T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'1', TenXa:'Phường Gò Dầu', NgayGhiNhan:'2026-08-16T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:1000, GiaoTangGiam:300, ChiTieuDen3112:1300}, {MaChuongTrinh:6, TenChuongTrinh:'', ChiTieuDaGiao:800, GiaoTangGiam:-150, ChiTieuDen3112:650}]},
   {Id:'w2', SoQD:'G100', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-15T00:00:00', NguonVon:1, Loai:'Điều chỉnh', Dot:'1', TenXa:'Xã Truông Mít', NgayGhiNhan:'2026-08-16T08:00:00',
    ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'', ChiTieuDaGiao:500, GiaoTangGiam:200, ChiTieuDen3112:700}]},
   {Id:'w3', SoQD:'G101', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-08-20T00:00:00', NguonVon:2, Loai:'Điều chỉnh', TenXa:'Xã Lạ Giả', NgayGhiNhan:'2026-08-21T08:00:00',
    ChiTiet:[{MaChuongTrinh:1, TenChuongTrinh:'', ChiTieuDaGiao:100, GiaoTangGiam:100, ChiTieuDen3112:200}]}]};
 const r = await p.evaluate(async([files, wpf]) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   doiNgan(7); slDoiTab('pb'); for(let i=0;i<80 && !(PB.K && document.getElementById('pb-trai'));i++) await w(250);
   o.nut = Array.from(document.querySelectorAll('.sl-con button')).some(x => /Phân bổ KH/.test(x.textContent) && x.classList.contains('bat'));
   o.thanhBen = DH_MUC.some(m => m.k==='pb') && /Phân bổ KH/.test((document.getElementById('thanh-ben') || {}).textContent || '');   /* máy tính ≥ 1100 px dùng thanh bên */
   o.xa = PB.dsXa.map(x => x.ten+':'+x.ap.length).join(' | ');
   o.kp = (PB.dsXa.find(x => /Phường/.test(x.ten)) || {ap:[]}).ap.every(a => /^(Kp|Khu phố|Thôn) /.test(a.ten)) && pbTenAp('Phường Giả', 'Bàu Giả')==='Kp Bàu Giả';   /* bộ giả ghi "Thôn 01" → giữ, không thành "Kp Thôn 01" */
   o.trong = /Chưa có QĐ/.test(document.getElementById('pb-trai').textContent);
   // 📥 nhập file WPF giả
   o.nhapBao = await pbNhapGia(wpf, 'moi');   /* 3.439: nạp qua mẫu Excel, xem trước rồi Lưu */
   for(let i=0;i<40 && pbDL().qd.length<3;i++) await w(100);
   o.nhap = pbDL().qd.length;
   o.ghepXa = pbDL().qd.filter(q => q.xa).length; dongHop(); await w(100);
   // nhập lại cùng file → bỏ qua giống hệt
   const bao2 = await pbNhapGia(wpf, 'bo');   /* nạp lại cùng file → báo trùng, chọn bỏ qua */
   o.nhapLai = pbDL().qd.length+' · '+(/đã có trong app/.test(bao2) ? 'trùng' : bao2.slice(0, 60)); dongHop(); await w(100);
   // chọn xã Gò Dầu → phân bổ tương đối
   const dong = Array.from(document.querySelectorAll('.pb-dong')).find(x => /Gò Dầu/.test(x.textContent)); dong.click(); await w(100);
   document.querySelector('[data-lenh="pb.chay"]').click(); await w(300);
   o.td = PB.kq ? PB.kq.map(k => k.ma+':'+pbKiem(k).xuatDuoc).join(' ') : 'chưa';
   o.tdChan = PB.kq ? PB.kq.every(k => k.ap.filter(a => Math.round(a.dc*1e4) % 1000000).length <= 1) : false;
   o.tdHien = /Khớp/.test(document.getElementById('pb-kq').textContent) && document.querySelectorAll('#pb-kq table.pb-ap').length===2;
   // chính xác — kỳ tự động: QĐ 15/08 → Mẫu 31 31/07
   document.querySelector('[data-lenh="pb.cheDo"][data-v="cx"]').click(); await w(100);
   document.querySelector('[data-lenh="pb.chay"]').click(); for(let i=0;i<40 && !(PB.kq && PB.kqLuc.indexOf('|cx|')>0);i++) await w(150);
   o.cx = PB.kq ? PB.kq.map(k => k.ma+':'+pbKiem(k).xuatDuoc+(k.canhBao ? '(cb)' : '')).join(' ') : 'chưa';
   o.cxKy = PB.kqMoTa || ''; o.cxCot = /Dư nợ thật/.test(document.getElementById('pb-kq').innerHTML) || PB.kq.some(k => /CHIA ĐỀU/.test(k.canhBao));
   // sửa tay: ô đầu bảng CT đầu tiên +100 → lệch; ô thứ 2 −100 → khớp lại
   const o1 = document.querySelectorAll('#pb-kq input[data-lenh="pb.suaTay"][data-ct="0"]');
   o1[0].value = String((PB.kq[0].ap[0].dc || 0) + 100); o1[0].dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.suaLech = !pbKiem(PB.kq[0]).khop && /LỆCH/.test(document.getElementById('pb-kq').textContent);
   const o2 = document.querySelectorAll('#pb-kq input[data-lenh="pb.suaTay"][data-ct="0"]');
   o2[1].value = String((PB.kq[0].ap[1].dc || 0) - 100); o2[1].dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.suaKhop = pbKiem(PB.kq[0]).xuatDuoc && /chỉnh tay/.test(document.getElementById('pb-kq').textContent);
   // giữ ô: focus ô thứ 3 rồi đổi ô thứ 2 (như Tab) → vẽ lại vẫn ở ô thứ 3
   const o3 = document.querySelectorAll('#pb-kq input[data-lenh="pb.suaTay"][data-ct="0"]'); o3[2].focus(); o3[1].value = o3[1].value; o3[1].dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.giuO = document.activeElement && document.activeElement.getAttribute('data-i')==='2';
   // hộp QĐ mới
   document.querySelector('[data-lenh="pb.moi"]').click(); await w(150);
   const dat = (sel, v) => { const e = document.querySelector('#pb-f '+sel); e.value = v; e.dispatchEvent(new Event('change', {bubbles:true})); };
   dat('input[data-f="so"]', 'G200'); dat('input[data-f="ngay"]', '1592026'); dat('select[data-f="nguon"]', '1'); dat('select[data-f="loai"]', 'Điều chỉnh'); await w(100);
   o.ngay = PB.F.ngay;
   const goDau = PB.dsXa.find(x => /Gò Dầu/.test(x.ten));
   const cb = document.querySelector('#pb-f input[data-lenh="pb.fXa"][data-ma="'+goDau.ma+'"]'); cb.checked = true; cb.dispatchEvent(new Event('change', {bubbles:true})); await w(100);
   dat('select[data-f="ctChon"]', '03'); document.querySelector('#pb-f [data-lenh="pb.fThemCT"]').click(); await w(150);
   o.goiY = PB.F.dong[0] && PB.F.dong[0].daGiao;   // = Đến 31/12 QĐ G100 (1300)
   const tg = document.querySelector('#pb-f input[data-lenh="pb.fSo"][data-f="tangGiam"]'); tg.value = '+200'; tg.dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.den = PB.F.dong[0].den3112; o.kiemTra = (document.querySelector('#pb-f-bang tbody tr:nth-child(2) td:nth-child(5)') || {}).textContent || '';
   const dg = document.querySelector('#pb-f input[data-lenh="pb.fSo"][data-f="daGiao"]'); dg.value = '1250'; dg.dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.dutChuoi = /khác QĐ G100/.test(document.getElementById('pb-f-bang').textContent) && PB.F.dong[0].den3112===1450;
   dg.value = ''; document.querySelector('#pb-f input[data-lenh="pb.fSo"][data-f="daGiao"]').value = ''; document.querySelector('#pb-f input[data-lenh="pb.fSo"][data-f="daGiao"]').dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.veTuDong = PB.F.dong[0].daGiao===1300 && PB.F.dong[0].den3112===1500;
   window.confirm = () => true; document.querySelector('#pb-f [data-lenh="pb.fLuu"]').click(); await w(200);
   o.luu = pbDL().qd.filter(q => q.so==='G200').length+' · hộp '+(document.getElementById('hop').classList.contains('hien') ? 'còn' : 'đóng');
   // mở lại → tích thêm Truông Mít → tự thêm dòng 03 → nhập → lưu
   const k200 = pbNhom().find(g => g.ds[0].so==='G200').k; document.querySelector('[data-lenh="pb.sua"][data-k="'+k200+'"]').click(); await w(150);
   const tm = PB.dsXa.find(x => /Truông Mít/.test(x.ten)), cb2 = document.querySelector('#pb-f input[data-lenh="pb.fXa"][data-ma="'+tm.ma+'"]');
   cb2.checked = true; cb2.dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   o.themXaDong = PB.F.dong.filter(d => d.xa===tm.ma && d.ma==='03').length;
   const tg2 = Array.from(document.querySelectorAll('#pb-f input[data-lenh="pb.fSo"][data-f="tangGiam"]')).find(e => PB.F.dong[+e.getAttribute('data-i')].xa===tm.ma);
   tg2.value = '100'; tg2.dispatchEvent(new Event('change', {bubbles:true})); await w(150);
   document.querySelector('#pb-f [data-lenh="pb.fLuu"]').click(); await w(200);
   o.haiXa = pbDL().qd.filter(q => q.so==='G200').map(q => q.tenXa+':'+q.ct[0].daGiao+'+'+q.ct[0].tangGiam+'='+q.ct[0].den3112).sort().join(' | ');
   o.nhom = pbNhom().length+' QĐ'; o.luuKho = JSON.stringify(KHO1.doc('pb')).length > 100;
   return o; }, [files, wpf]);
 ok('nút 🎯 Phân bổ KH ở thanh tab con, đang bật', r.nut);
 ok('mục 🎯 Phân bổ KH ở thanh bên (máy tính)', r.thanhBen);
 ok('cây địa bàn: 3 xã, có ấp', /Gò Dầu:\d+/.test(r.xa) && r.xa.split(' | ').length===3, r.xa);
 ok('phường → tên ấp có tiền tố Kp / Khu phố', r.kp);
 ok('chưa có QĐ → hướng dẫn', r.trong);
 ok('📥 3.439 nạp QĐ Excel mẫu: xem trước báo xã lạ, Lưu → 3 lượt xã, 2 ghép được xã', r.nhap===3 && r.ghepXa===2 && /Xã Lạ Giả.*chưa ghép được xã/.test(r.nhapBao), r.nhap+' · '+r.ghepXa+' · '+r.nhapBao.slice(0, 200));
 ok('nạp lại cùng file → báo QĐ đã có, chọn bỏ qua → vẫn 3', r.nhapLai==='3 · trùng', r.nhapLai);
 ok('phân bổ tương đối: 2 CT khớp QĐ, hiện bảng ấp', r.td==='03:true 06:true' && r.tdHien, r.td);
 ok('tương đối: số giao chẵn (≤ 1 ấp lẻ)', r.tdChan);
 ok('chính xác: kỳ tự động = Mẫu 31 trước QĐ (T7/2026), khớp QĐ', /T7\/2026/.test(r.cxKy) && /03:true/.test(r.cx) && /06:true/.test(r.cx) && r.cxCot, r.cxKy+' · '+r.cx);
 ok('sửa tay +100 → LỆCH; dồn −100 ấp khác → khớp lại (chỉnh tay)', r.suaLech && r.suaKhop);
 ok('đổi 1 ô → vẽ lại vẫn giữ ô đang đứng (Tab)', r.giuO);
 ok('hộp QĐ: ngày gõ liền số 1592026 → 2026-09-15', r.ngay==='2026-09-15', r.ngay);
 ok('gợi ý Đã giao = Đến 31/12 QĐ trước (1300); Đến 31/12 tự tính 1300 + 200 = 1500', r.goiY===1300 && r.den===1500 && /gợi ý/.test(r.kiemTra), r.goiY+' · '+r.den+' · '+r.kiemTra);
 ok('sửa Đã giao 1250 → ⚠ đứt chuỗi (khác QĐ G100), Đến 31/12 tính lại 1450', r.dutChuoi);
 ok('xóa trắng Đã giao → trở lại gợi ý tự động', r.veTuDong);
 ok('lưu QĐ mới → 1 lượt xã, đóng hộp', r.luu==='1 · hộp đóng', r.luu);
 ok('mở lại QĐ, tích thêm xã → tự thêm dòng CT đang có cho xã mới', r.themXaDong===1);
 ok('lưu → QĐ G200 có 2 xã, số đúng', /Gò Dầu:1300\+200=1500/.test(r.haiXa) && /Truông Mít:700\+100=800/.test(r.haiXa), r.haiXa);
 ok('danh sách nhóm theo QĐ; lưu qua KHO1', r.nhom==='3 QĐ' && r.luuKho, r.nhom);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); console.log(R.filter(x => x[0]==='✓').length+'/'+R.length+' đạt');
 await b.close();
})();
