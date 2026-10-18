// 3.237 (R4): PHÉP THỬ NHANH lớp Nghiệp vụ — node, không trình duyệt, < 1 giây. Dữ liệu GIẢ. Chạy: node tests/nhanh/thu.js (kiem.py tự gọi).
// Thêm phép thử: 1 dòng thu('tên', () => điều kiện, () => chi tiết khi trượt). Hàm app gọi qua A.tênHàm (đã nạp toàn bộ code app).
const {nap} = require('./nen.js');
const t0 = Date.now(), R = nap(), A = R.ctx, o = [];
A.nay = () => new Date('2026-10-17T08:00:00');   /* "hôm nay" cố định → kết quả không đổi theo ngày chạy */
function thu(ten, dk, chi){ let d = false, c; try { d = !!dk(); } catch(e){ c = 'LỖI '+(e && e.message); } if(!d && c===undefined && chi) try { c = JSON.stringify(chi()); } catch(e){} o.push((d ? '✓ ' : '✗ ')+ten+(d || c===undefined ? '' : ' — '+c)); }
const J = x => JSON.stringify(x);

thu('nạp đủ code app vào node, không lỗi', () => !R.loi.length, () => R.loi);
/* chữ & ngày */
thu('slChuan: bỏ dấu, thường, gọn khoảng trắng', () => A.slChuan('  Nguyễn  Văn Á!! ')==='nguyen van a', () => A.slChuan('  Nguyễn  Văn Á!! '));
thu('slChuan: Đ / đ → d', () => A.slChuan('Đặng Đình')==='dang dinh', () => A.slChuan('Đặng Đình'));
thu('boDauTen: tên file không dấu, hoa chữ đầu', () => A.boDauTen('nguyễn thị hoa')==='Nguyen Thi Hoa', () => A.boDauTen('nguyễn thị hoa'));
thu('ngayVNsl: yyyy-mm-dd → dd/mm/yyyy', () => A.ngayVNsl('2026-10-01')==='01/10/2026' && A.ngayVNsl('')==='');
thu('gõ ngày: 25/04/2021', () => A.gdxDocNgay('25/04/2021')==='2021-04-25', () => A.gdxDocNgay('25/04/2021'));
thu('gõ ngày liền số 7 chữ số: 2542021 = 25/04/2021', () => A.gdxDocNgay('2542021')==='2021-04-25', () => A.gdxDocNgay('2542021'));
/* CCCD — hạn theo mốc 14 / 25 / 40 / 60 tuổi (hôm nay 17/10/2026) */
const han = (ns, nc, so) => A.toCCCDHan(so || '079090001234', ns, nc);
thu('CCCD còn hạn: sinh 15/05/1990, cấp 2016 → đến 15/05/2030 (mốc 40)', () => han('1990-05-15', '2016-01-01').kq==='ok' && han('1990-05-15', '2016-01-01').den==='2030-05-15', () => han('1990-05-15', '2016-01-01'));
thu('CCCD hết hạn: cấp lúc 20 tuổi, qua mốc 25', () => han('1990-05-15', '2010-06-01').kq==='het', () => han('1990-05-15', '2010-06-01'));
thu('CCCD sắp hết hạn (còn < 30 ngày): sinh 30/10/2001, cấp lúc 15 tuổi', () => han('2001-10-30', '2016-12-01').kq==='sap', () => han('2001-10-30', '2016-12-01'));
thu('CMND 9 số → hết hiệu lực từ 01/01/2025', () => han('', '', '123456789').kq==='het');
thu('cấp sau 58 tuổi → không thời hạn', () => han('1950-01-01', '2016-01-01').kq==='ok' && !han('1950-01-01', '2016-01-01').den, () => han('1950-01-01', '2016-01-01'));
/* Sổ hộ vay: thiếu / cần sửa */
thu('hmThieu: CCCD sai số, thiếu ngày sinh, ngày cấp, địa chỉ', () => J(A.hmThieu({to:''}, {cccd:'123', ns:'', ncap:''}))===J(['CCCD 3 số', 'ngày sinh', 'ngày cấp', 'địa chỉ / tổ']), () => A.hmThieu({to:''}, {cccd:'123', ns:'', ncap:''}));
thu('hmThieu: đủ → rỗng', () => A.hmThieu({to:'T1'}, {cccd:'079090001234', ns:'1990-05-15', ncap:'2016-01-01'}).length===0, () => A.hmThieu({to:'T1'}, {cccd:'079090001234', ns:'1990-05-15', ncap:'2016-01-01'}));
/* Kiểm tra hộ vay (luật mặc định) */
const ma = o2 => A.khKiem(o2).map(x => x.ma);
thu('khKiem: người đứng tên 76 tuổi → cảnh báo tuổi65', () => ma({tv:[{ten:'Người Già', ns:'1950-01-01', cccd:''}], dung:0}).indexOf('tuoi65')>=0, () => ma({tv:[{ten:'Người Già', ns:'1950-01-01', cccd:''}], dung:0}));
thu('khKiem: 16 tuổi → chặn tuoi18', () => ma({tv:[{ten:'Trẻ', ns:'2010-03-01', cccd:''}], dung:0}).indexOf('tuoi18')>=0, () => ma({tv:[{ten:'Trẻ', ns:'2010-03-01', cccd:''}], dung:0}));
thu('khKiem: 40 tuổi → không cảnh báo tuổi', () => !ma({tv:[{ten:'Bình Thường', ns:'1986-03-01', cccd:''}], dung:0}).some(m => /^tuoi/.test(m)), () => ma({tv:[{ten:'Bình Thường', ns:'1986-03-01', cccd:''}], dung:0}));
/* Phạm vi địa bàn */
const T = {ma:'T1', xa:'X1', khoaDiem:'D1', dv:'3'};
thu('pvLoc: toàn PGD gồm mọi tổ', () => A.pvLoc({}, T));
thu('pvLoc: đúng xã · điểm · hội · tổ', () => A.pvLoc({xa:'X1', diem:'D1', hoi:'3', to:'T1'}, T) && !A.pvLoc({xa:'X2'}, T) && !A.pvLoc({xa:'X1', diem:'D2'}, T) && !A.pvLoc({xa:'X1', hoi:'4'}, T) && !A.pvLoc({xa:'X1', to:'T2'}, T));
thu('pvLoc: chọn Hội toàn PGD (chưa chọn xã)', () => A.pvLoc({hoi:'3'}, T) && !A.pvLoc({hoi:'4'}, T));
thu('hmTrongDB: hộ nhập bản cũ (chưa tổ, chưa xã) luôn hiện khi lọc địa bàn; hộ chưa tổ có xã → theo xã / điểm', () => { const k = A.KHO.coKy, to = A.KHO.to; A.KHO.coKy = () => true; A.KHO.to = () => null;
  try { return A.hmTrongDB({to:'', xa:''}, {xa:'X1', diem:'D1'}) && A.hmTrongDB({to:'', xa:'X1', diem:'D1'}, {xa:'X1', diem:'D1'}) && !A.hmTrongDB({to:'', xa:'X2'}, {xa:'X1'}) && !A.hmTrongDB({to:'', xa:'X1'}, {xa:'X1', hoi:'3'}); } finally { A.KHO.coKy = k; A.KHO.to = to; } });
/* Gói số liệu điện thoại: tổng 1 nhóm */
thu('gxTong: cộng dư nợ / quá hạn / khoanh, đếm hộ còn nợ, món còn dư nợ', () => J(A.gxTong([{dn:100, qh:10, kn:0, conNo:1, mon:[{dn:60}, {dn:40}, {dn:0}]}, {dn:50, kn:5, conNo:1, mon:[{dn:50}]}, {dn:0, mon:[{dn:0}]}]))===J({dn:150, qh:10, kn:5, ho:2, mon:3}),
  () => A.gxTong([{dn:100, qh:10, kn:0, conNo:1, mon:[{dn:60}, {dn:40}, {dn:0}]}, {dn:50, kn:5, conNo:1, mon:[{dn:50}]}, {dn:0, mon:[{dn:0}]}]));
/* Đồng bộ cài đặt theo khối */
thu('chKhoiCua: khóa → khối đồng bộ', () => J(['ktA', 'hoMoi', 'gdxB', 'slTab', 'scanX', 'loaiVB', 'nhanGhiChu', 'khongRo'].map(A.chKhoiCua))===J(['ktgs', 'hoso', 'gdx', 'solieu', 'scan', 'vanban', 'lich', 'chung']),
  () => ['ktA', 'hoMoi', 'gdxB', 'slTab', 'scanX', 'loaiVB', 'nhanGhiChu', 'khongRo'].map(A.chKhoiCua));
/* 3.260: sổ đăng ký cài đặt */
thu('chSoKiem: khóa trong sổ chia theo khối, khóa lạ tách riêng, riêng máy riêng', () => { const c0 = A.D.cauHinh; A.D.cauHinh = {kyChung:'2026-08', ktHoiKB:{a:1}, camId:'x', khoaLaGia:1};
  try { const R = A.chSoKiem(); return R.tong===4 && R.la.length===1 && R.la[0].k==='khoaLaGia' && R.khoi.solieu && R.khoi.ktgs && R.khoi['riêng máy'] && R.khoi['riêng máy'][0].k==='camId'; } finally { A.D.cauHinh = c0; } });
thu('chSoCo: mọi khóa mặc định + riêng máy đều có trong sổ', () => Object.keys(A.MAC_DINH).concat(A.CH_RIENG).every(A.chSoCo), () => Object.keys(A.MAC_DINH).concat(A.CH_RIENG).filter(k => !A.chSoCo(k)));
/* Tìm kiếm văn bản (3.239: nhớ sẵn chữ bỏ dấu từng trường — điểm giữ nguyên thứ tự ưu tiên) */
thu('diem: số hiệu 100 · trích yếu 50 · ghi chú 20 · không khớp 0', () => { const m = {soHieu:'12/HD-NHCS', trichYeu:'Hướng dẫn cho vay', ghiChu:'Lưu ý ấp Một'};
  return A.diem(m, 'hd-nhcs')===100 && A.diem(m, 'huong dan')===50 && A.diem(m, 'ap mot')===20 && A.diem(m, 'khong co')===0; });
thu('diem: sửa trích yếu → tìm theo chữ mới (không dùng chữ nhớ cũ)', () => { const m = {trichYeu:'Cũ'}; A.diem(m, 'cu'); m.trichYeu = 'Mới đổi'; return A.diem(m, 'moi doi')===50 && A.diem(m, 'cu')===0; });
thu('diem: chữ nhớ sẵn không lọt vào dữ liệu lưu (JSON)', () => { const m = {trichYeu:'Có dấu'}; A.diem(m, 'co'); return JSON.stringify(m).indexOf('__tim')<0 && !!m.__tim; });
thu('loc: xếp số hiệu trước trích yếu', () => J(A.loc([{id:1, trichYeu:'quyết định 70'}, {id:2, soHieu:'70/QĐ'}], '70').map(x => x.id))===J([2, 1]));
/* Giao diện chung (chuỗi HTML — không cần trình duyệt) */
thu('coChuHTML: thoát & < > " (dùng được cả trong thuộc tính)', () => A.coChuHTML('a"b<c>&')==='a&quot;b&lt;c&gt;&amp;', () => A.coChuHTML('a"b<c>&'));
thu('GD.nut: thoát dấu nháy trong title, gắn data-lenh', () => /title="a&quot;b"/.test(A.GD.nut({chu:'x', lenh:'k.l', tit:'a"b'})) && /data-lenh="k.l"/.test(A.GD.nut({chu:'x', lenh:'k.l'})));
thu('xuatHang: thứ tự Đóng · In · Lưu vào app · PDF · Word · Excel · Gửi', () => { const h = A.xuatHang({ten:'x', html:()=>'<p>x</p>', vaoApp:'void 0'}); return (h.match(/>([^<>]+)<\/button>/g) || []).map(x => x.slice(1, -9).trim()).join('|')==='Đóng (Esc)|🖨 In|💾 Lưu vào app|📄 PDF|📝 Word|📊 Excel|📤 Gửi'; },
  () => (A.xuatHang({ten:'x', html:()=>'<p>x</p>', vaoApp:'void 0'}).match(/>([^<>]+)<\/button>/g) || []));

const sai = o.filter(x => x[0]==='✗');
console.log(o.join('\n')); console.log((o.length-sai.length)+'/'+o.length+' đạt · '+(Date.now()-t0)+' ms');
process.exitCode = sai.length ? 1 : 0;
