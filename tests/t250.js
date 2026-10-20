// P1 🎯 PHÂN BỔ KH — lõi nghiệp vụ js/47-phan-bo.js (QT-15…17, docs/KE_HOACH_PHAN_BO_KH.md). Chạy bằng node, không cần trình duyệt.
//   Chuyển từ bộ phép thử bản WPF v9.20 + 3.000 tình huống ngẫu nhiên (hạt cố định). Dữ liệu GIẢ hoàn toàn.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = vm.createContext({console}); vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', '47-phan-bo.js'), 'utf8'), ctx);
const P = ctx, R = [];
const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
const sum = a => P.pbSum(a);
const AP = n => Array.from({length:n}, (_, i) => ({k:'T'+(i+1), ten:'Ấp Giả '+(i+1)}));
const QD = (loai, ma, dg, tg, den, nguon) => ({id:'q', so:'G1', xa:'X1', tenXa:'Xã Giả', loai, nguon:nguon || 1, ngay:'2026-05-15', ct:[{ma, ten:'CT giả', daGiao:dg, tangGiam:tg, den3112:den}]});
const DN = (k, ma, trieu) => ({k, ten:'Ấp Giả '+k.slice(1), ct:ma, nguon:1, dn:trieu});
const kiem = k => P.pbKiem(k);
const soLe = (k, b) => k.ap.filter(a => P.pbR(a.dc % b) !== 0).length;
const batKha = (k, b) => { const t = k.ap.reduce((s, a) => s + Math.floor(Math.max(0, a.truoc)/b)*b, 0) + Math.max(0, ...k.ap.map(a => P.pbR(Math.max(0, a.truoc) % b)));
  return k.so < 0 && -k.so > t + 1e-9; };

// 1. Chia đều (tương đối)
[50, 100, 101, 1500, 2776, -500, -2776, 1234.5, 99999].forEach(t => {
  const a = P.pbChiaDeu(t, 10, 100), ab = a.map(Math.abs);
  ok('chia đều '+t+': tổng khớp, ≤ 10 phần', sum(a)===P.pbR(t) && a.length<=10, JSON.stringify(a));
  if(Math.abs(t) > 100) ok('chia đều '+t+': chẵn 100 trừ phần cuối, mỗi phần ≥ 100, chênh ≤ 100', a.slice(0, -1).every(x => x%100===0) && ab.every(x => x>=100) && Math.max(...ab)-Math.min(...ab) <= 100, JSON.stringify(a));
});
ok('chia đều bước 50: 1000 → bội 50, chênh ≤ 50', (a => sum(a)===1000 && a.every(x => x%50===0) && Math.max(...a)-Math.min(...a)<=50)(P.pbChiaDeu(1000, 10, 50)));
// 2. Chia theo tỷ lệ (chính xác)
[[777, 10], [-1300, 10], [1234.5, 10], [500, 1], [95, 100], [777, 50]].forEach(([t, b]) => {
  const ds = [{k:'A', dn:1000}, {k:'B', dn:300}, {k:'C', dn:60}, {k:'D', dn:0}], a = P.pbChiaTyLe(t, ds, b);
  ok('tỷ lệ '+t+' bước '+b+': tổng khớp, ấp không dư nợ = 0, chỉ ấp dư nợ lớn nhất lẻ', sum(a)===P.pbR(t) && a[3]===0 && a.slice(1).every(x => P.pbR(x % b)===0), JSON.stringify(a));
});
ok('tỷ lệ 777 bước 1: theo thứ tự dư nợ', (a => a[0]>a[1] && a[1]>a[2])(P.pbChiaTyLe(777, [{k:'A', dn:1000}, {k:'B', dn:300}, {k:'C', dn:60.4}], 1)));
// 3. Dòng nào phân bổ (QT-15.1)
ok('điều chỉnh có tăng/giảm → phân bổ số tăng/giảm', P.pbSoCanPhanBo(QD('Điều chỉnh', '03', 5000, 1500, 6500), {daGiao:5000, tangGiam:1500, den3112:6500}).so===1500);
ok('dòng chỉ có số dư (không tăng/giảm) → bỏ qua', P.pbSoCanPhanBo(QD('Điều chỉnh'), {daGiao:5000, tangGiam:null, den3112:5000})===null);
ok('giao mới thật → phân bổ số đến 31/12', (s => s && s.so===8000 && s.giaoMoi)(P.pbSoCanPhanBo({loai:'Giao mới'}, {daGiao:null, tangGiam:null, den3112:8000})));
ok('"Giao mới" nhưng đã có Đã giao, không tăng/giảm → bỏ qua', P.pbSoCanPhanBo({loai:'Giao mới'}, {daGiao:5000, tangGiam:null, den3112:5000})===null);
// 4. Tương đối
const k1 = P.pbPhanBo(QD('Điều chỉnh', '03', 6000, 300, 6300), {cheDo:'td', ap:AP(6)})[0];
ok('tương đối: khớp QT-16 + chỉ tiêu trước = Đã giao chia đều (6000 / 6 = 1000)', kiem(k1).xuatDuoc && k1.ap.every(a => a.truoc===1000), JSON.stringify(kiem(k1).lyDo));
ok('tương đối: 300 chia 3 ấp × 100, mọi ấp vẫn có trong kết quả', P.pbApCoThayDoi(k1).length===3 && k1.ap.length===6);
const k2 = P.pbPhanBo(QD('Điều chỉnh', '03', 1044, -900, 144), {cheDo:'td', ap:AP(11)})[0];
ok('tương đối: giảm 900 / 1.044, 11 ấp → chỉ tiêu trước chẵn 100 (1 ấp lẻ), giảm chẵn hết', kiem(k2).xuatDuoc && soLe(k2, 100)<=1 && !kiem(k2).coAm, JSON.stringify(k2.ap.map(a => [a.truoc, a.dc])));
const k3 = P.pbPhanBo(QD('Điều chỉnh', '03', 600, -550, 50), {cheDo:'td', ap:AP(6)})[0];
ok('tương đối: giảm 550 / 600 → không âm, khớp', kiem(k3).xuatDuoc && !kiem(k3).coAm && !k3.canhBao);
const k4 = P.pbPhanBo(QD('Điều chỉnh', '03', 600, -700, -100), {cheDo:'td', ap:AP(6)})[0];
ok('tương đối: giảm 700 > 600 → cảnh báo, tổng vẫn khớp', kiem(k4).khop && /GIẢM lớn hơn/.test(k4.canhBao));
const k5 = P.pbPhanBo(QD('Điều chỉnh', '03', 1000, 300, 1300), {cheDo:'td', ap:[]})[0];
ok('xã chưa có ấp → "Đơn vị 1…" + cảnh báo', /chưa có danh sách ấp/.test(k5.canhBao) && k5.ap[0].ten==='Đơn vị 1' && kiem(k5).xuatDuoc);
ok('số ấp tối đa = 3 → 3000 chỉ chia 3 ấp, vẫn đủ 6 ấp', (k => P.pbApCoThayDoi(k).length===3 && k.ap.length===6 && kiem(k).xuatDuoc)(P.pbPhanBo(QD('Điều chỉnh', '03', 6000, 3000, 9000), {cheDo:'td', ap:AP(6), ch:{soApToiDa:3}})[0]));
// 5. Chính xác (cách A: dư nợ thật + chênh dồn 1 ấp)
const dn1 = [DN('T1', '03', 1000), DN('T2', '03', 300), DN('T2', '03', 0.4)];
const c1 = P.pbPhanBo(QD('Điều chỉnh', '03', 1400, 500, 1900), {cheDo:'cx', ap:AP(6), duNo:dn1})[0];
ok('chính xác: chỉ tiêu trước ấp lớn = 1000 + chênh 100, ấp khác ĐÚNG dư nợ thật, ấp không dư nợ = 0', c1.ap[0].truoc===1100 && c1.ap[1].truoc===300 && c1.ap[1].dnThat===300 && c1.ap[2].truoc===0, JSON.stringify(c1.ap.map(a => [a.k, a.truoc, a.dnThat])));
ok('chính xác: khớp QT-16 (Σ trước = 1400, Σ năm = 1900), số giao chẵn 50 (1 ấp lẻ)', kiem(c1).xuatDuoc && kiem(c1).tongTruoc===1400 && kiem(c1).tongNam===1900 && soLe(c1, 50)<=1);
const c2 = P.pbPhanBo(QD('Giao mới', '03', null, null, 800), {cheDo:'cx', ap:AP(6), duNo:dn1})[0];
ok('chính xác giao mới: chỉ tiêu trước 0', c2.ap.every(a => a.truoc===0) && kiem(c2).xuatDuoc);
const c3 = P.pbPhanBo(QD('Điều chỉnh', '03', 114, -72, 42), {cheDo:'cx', ap:AP(6), duNo:[DN('T3', '03', 42)]})[0];
ok('chính xác: giảm 72 khi dư nợ thật chỉ 42 (Đã giao 114) → ấp đó 114 − 72 = 42, không âm', c3.ap[0].k==='T3' && c3.ap[0].truoc===114 && c3.ap[0].nam===42 && kiem(c3).xuatDuoc);
const c4 = P.pbPhanBo(QD('Điều chỉnh', '06', 1000, 400, 1400), {cheDo:'cx', ap:AP(6), duNo:dn1})[0];
ok('chính xác: CT không có dư nợ ở xã (tăng) → chia đều + cảnh báo', /CHIA ĐỀU/.test(c4.canhBao) && kiem(c4).xuatDuoc);
const c5 = P.pbPhanBo(QD('Điều chỉnh', '06', 1000, -400, 600), {cheDo:'cx', ap:AP(6), duNo:[]})[0];
ok('chính xác: CT không có dư nợ (giảm) → chia đều theo Đã giao, không âm', kiem(c5).xuatDuoc && !kiem(c5).coAm);
ok('chính xác: chỉ lấy dư nợ đúng nguồn của QĐ', (k => k.ap[0].k==='T1' && k.ap[0].dnThat===1000 && k.ap[1].dnThat===0)(P.pbPhanBo(QD('Điều chỉnh', '03', 1000, 100, 1100), {cheDo:'cx', ap:AP(3), duNo:[DN('T1', '03', 1000), Object.assign(DN('T2', '03', 900), {nguon:2})]})[0]));
const c6 = P.pbPhanBo(QD('Điều chỉnh', '03', 2000, 200, 2200), {cheDo:'cx', ap:AP(3), duNo:[DN('T1', '03', 500), {k:'', ten:'', ct:'03', nguon:1, dn:1200}]})[0];
ok('chính xác: dư nợ không gắn được ấp (tên thôn trống) → "(Chưa rõ ấp)" xếp CUỐI nhóm có dư nợ + cảnh báo', c6.ap[1].ten==='(Chưa rõ ấp)' && c6.ap[0].k==='T1' && /không gắn được ấp/.test(c6.canhBao) && kiem(c6).xuatDuoc, JSON.stringify(c6.ap.map(a => a.ten)));
// 6. QT-16 + sửa tay
const l1 = P.pbPhanBo(QD('Điều chỉnh', '03', 1000, 300, 1350), {cheDo:'td', ap:AP(6)})[0];
ok('QĐ nhập lệch (1000 + 300 ≠ 1350) → chặn xuất', kiem(l1).khop && l1.loiNhap && !kiem(l1).xuatDuoc);
const s1 = P.pbPhanBo(QD('Điều chỉnh', '03', 6000, 300, 6300), {cheDo:'td', ap:AP(6)})[0];
P.pbSuaTay(s1, 0, s1.ap[0].dc - 100);
const s1a = kiem(s1).khop; P.pbSuaTay(s1, 5, 100);
ok('sửa tay: bớt 1 ấp → lệch; dồn sang ấp khác → khớp lại, chỉ tiêu năm tính lại', !s1a && kiem(s1).xuatDuoc && s1.suaTay && s1.ap[5].nam===s1.ap[5].truoc+100);
const s2 = P.pbPhanBo(QD('Điều chỉnh', '03', 600, -100, 500), {cheDo:'td', ap:AP(6)})[0]; P.pbSuaTay(s2, 0, -500); P.pbSuaTay(s2, 1, 0);
ok('sửa tay giảm quá chỉ tiêu → báo âm', kiem(s2).coAm);
// 7. Dư nợ thật + chênh
ok('chênh dương dồn ấp lớn nhất', JSON.stringify(P.pbDuNoThatChenh([1000, 300, 0], 1400))==='[1100,300,0]');
ok('chênh âm nhỏ trừ ấp lớn nhất', JSON.stringify(P.pbDuNoThatChenh([49560, 0], 49244))==='[49244,0]');
ok('chênh âm lớn hơn ấp lớn nhất → lấy tiếp ấp kế, không âm', (a => sum(a)===50 && a.every(v => v>=0) && a[0]===0)(P.pbDuNoThatChenh([100, 80, 20], 50)));
// 8. Ngẫu nhiên 3.000 lần (hạt cố định): khớp QT-16, không âm (trừ khi đã cảnh báo), số chẵn — 1 ấp lẻ (trừ bất khả)
let hat = 20261020; const rnd = n => { hat = (hat*1103515245 + 12345) % 2147483648; return Math.floor(hat/2147483648*n); };
let saiTD = [], saiCX = [];
for(let lan=0; lan<3000; lan++){
  const daGiao = rnd(60000); let tg = rnd(Math.min(daGiao, 20000) + 20000) - Math.min(daGiao, 20000); if(tg===0) tg = 37;
  const qd = QD('Điều chỉnh', '03', daGiao, tg, daGiao+tg), ap = AP(9), soDn = 1 + rnd(8);
  const duNo = ap.slice(0, soDn).map(a => DN(a.k, '03', rnd(3)===0 ? 1 + rnd(79) : 100 + rnd(8900)));
  [['td', 100, saiTD], ['cx', 50, saiCX]].forEach(([cd, b, sai]) => {
    const k = P.pbPhanBo(qd, {cheDo:cd, ap, duNo})[0], r = kiem(k);
    if(!r.xuatDuoc || (r.coAm && !k.canhBao) || (soLe(k, b) > 1 && !batKha(k, b))) sai.push(lan+': '+daGiao+' '+tg+' '+JSON.stringify(r.lyDo)+' lẻ '+soLe(k, b));
  });
}
ok('3.000 tình huống ngẫu nhiên — tương đối', !saiTD.length, saiTD.slice(0, 3).join(' | '));
ok('3.000 tình huống ngẫu nhiên — chính xác', !saiCX.length, saiCX.slice(0, 3).join(' | '));
// 9. QT-17 gợi ý Đã giao + tổng hợp đầu năm
const q = (id, so, ngay, dg, tg, luc) => ({id, so, ngay, xa:'X1', nguon:1, luc:luc || ngay, ct:[{ma:'03', daGiao:dg, tangGiam:tg, den3112:dg+tg}]});
const ds = [q('c', 'G3', '2026-04-01', 37685, 2000), q('a', 'G1', '2026-02-02', 34685, 2000), q('b', 'G2', '2026-03-26', 36685, 1000)];
ok('gợi ý Đã giao = Đến 31/12 QĐ gần nhất trước', (g => g.v===39685 && g.tuQD && /G3/.test(g.moTa))(P.pbGoiYDaGiao(ds, 'X1', '03', 1, '2026-06-01', null, null)));
ok('đang sửa chính QĐ đó → lấy QĐ trước nó', P.pbGoiYDaGiao(ds, 'X1', '03', 1, '2026-04-01', ['c'], null).v===37685);
ok('khác nguồn, chưa có QĐ → dư nợ 31/12 năm trước', (g => g.v===1234 && !g.tuQD)(P.pbGoiYDaGiao(ds, 'X1', '03', 2, '2026-06-01', null, 1234.4)));
ok('không có gì → null', P.pbGoiYDaGiao(ds, 'X1', '06', 1, '2026-06-01', null, null).v===null);
const th = P.pbTongHopCT(ds, 2026)['X1|03|1'];
ok('đầu năm theo QĐ đầu tiên nhắc CT; KH cuối năm = QĐ mới nhất', th && th.daGiaoDau===34685 && th.khCuoiNam===39685 && th.tongTG===5000 && th.soQD===3, JSON.stringify(th));
// 10. Kỳ dư nợ, nguồn, nhập file WPF
ok('kỳ tự động = kỳ gần nhất ≤ ngày QĐ', P.pbChonKy(['2026-07', '2026-08', '2026-09'], '2026-09-04').ky==='2026-08');
ok('kỳ anh chọn được ưu tiên', P.pbChonKy(['2026-07', '2026-08'], '2026-09-04', '2026-07').ky==='2026-07');
ok('không có kỳ trước QĐ → kỳ mới nhất', P.pbChonKy(['2026-07'], '2026-01-15').ky==='2026-07');
ok('nguồn: TW / ĐP / DP / Địa phương / 1 / 2', [P.pbNguon('TW'), P.pbNguon('ĐP'), P.pbNguon('DP'), P.pbNguon('Địa phương'), P.pbNguon('1'), P.pbNguon(2)].join()==='1,2,2,2,1,2');
const w = P.pbTuWPF({DanhSachQD:[{Id:'abc', SoQD:' G9 ', KyHieuVanBan:'/QĐ-GIẢ', NgayQD:'2026-05-17T00:00:00.0000000+07:00', NguonVon:2, Loai:'Điều chỉnh', Dot:'3', TenXa:'Xã  Giả ', NgayGhiNhan:'2026-05-18T08:00:00',
  ChiTiet:[{MaChuongTrinh:3, TenChuongTrinh:'CT giả', ChiTieuDaGiao:100, GiaoTangGiam:50, ChiTieuDen3112:150}]}]})[0];
ok('nhập file sao lưu WPF: ngày, nguồn, mã CT 2 số, tên xã gọn', w.so==='G9' && w.ngay==='2026-05-17' && w.nguon===2 && w.ct[0].ma==='03' && w.ct[0].den3112===150 && w.tenXa==='Xã Giả');
let loiFile = ''; try { P.pbTuWPF({abc:1}); } catch(e){ loiFile = e.message; }
ok('file không đúng → báo', /không phải sao lưu/.test(loiFile));
// 11. Tiện ích giao diện (P2)
ok('tên ấp: xã → "Ấp …", phường → "Kp …", đã có tiền tố giữ, trống → (Chưa rõ ấp)', P.pbTenAp('Xã Giả', 'Bàu Giả')==='Ấp Bàu Giả' && P.pbTenAp('Phường Giả', 'Khu Giả')==='Kp Khu Giả' && P.pbTenAp('Xã Giả', 'Ấp  Giả 1')==='Ấp Giả 1' && P.pbTenAp('Xã Giả', '')==='(Chưa rõ ấp)');
const dsX = [{ma:'480001', ten:'Xã Giả Một'}, {ma:'480002', ten:'Phường Giả Hai'}];
ok('ghép tên xã file WPF với cây địa bàn (bỏ dấu, bỏ chữ Xã / Phường)', P.pbKhopXa('Xã Giả Một', dsX)==='480001' && P.pbKhopXa('gia hai', dsX)==='480002' && P.pbKhopXa('Phường  Giả Hai ', dsX)==='480002' && P.pbKhopXa('Xã Khác', dsX)==='');
ok('đọc số anh gõ', [P.pbDocSo('1.500'), P.pbDocSo('+1.500'), P.pbDocSo('−200'), P.pbDocSo('1.234,5'), P.pbDocSo('1,234.5'), P.pbDocSo('0.5'), P.pbDocSo(''), P.pbDocSo('abc')].join('|')==='1500|1500|-200|1234.5|1234.5|0.5||');

R.forEach(x => console.log(x));
const dat = R.filter(x => x[0]==='✓').length;
console.log(dat+'/'+R.length+' đạt');
