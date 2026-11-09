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
/* 3.295: sổ quy tắc tên + nơi lưu chung (js/49) */
thu('tcTen: "Khóa - Họ tên - Loại"; bản thứ 2 trở đi thêm " (n)"', () => A.tcTen('4800000033', ' Võ Thị A ', 'CCCD', '.pdf')==='4800000033 - Võ Thị A - CCCD.pdf' && A.tcTen('072123456789', 'Võ Thị A', '01TD', '.pdf', 2)==='072123456789 - Võ Thị A - 01TD (2).pdf', () => A.tcTen('4800000033', ' Võ Thị A ', 'CCCD', '.pdf'));
thu('tcKhoa: mã KH; hộ mới → số CCCD 12 số; không có → rỗng', () => A.tcKhoa({maKH:'4800000033', cccd:'079078001234'})==='4800000033' && A.tcKhoa({cccd:'079 078 001 234'})==='079078001234' && A.tcKhoa({cccd:'123'})==='' && A.tcTen('', 'Võ A', '01TD', '')==='Võ A - 01TD');
thu('tcLoaiMau: 01/TD → 01TD, UQ → 01UQ, 07b/GQVL → 07BGQVL, lạ → viết liền hoa', () => A.tcLoaiMau('01/TD')==='01TD' && A.tcLoaiMau('uq')==='01UQ' && A.tcLoaiMau('07b/GQVL')==='07BGQVL' && A.tcLoaiMau('09a/td')==='09ATD', () => [A.tcLoaiMau('01/TD'), A.tcLoaiMau('09a/td')]);
thu('tcSoThu: thứ tự theo lúc tạo (1, 2, 3)', () => { const a = {id:'a', taoLuc:'2026-10-02'}, b = {id:'b', taoLuc:'2026-10-01'}, c = {id:'c', taoLuc:'2026-10-03'}; return A.tcSoThu([a, b, c], a)===2 && A.tcSoThu([a, b, c], b)===1 && A.tcSoThu([a], a)===1; });
thu('tcDuong + Scan dùng chung: CCCD / Hồ sơ scan / Chờ sắp xếp / Hồ sơ vay', () => { const t = A.D.cauHinh.thumuc; A.D.cauHinh.thumuc = 'Tủ'; try { return A.tcDuong('hsv')==='Tủ / Hồ sơ vay' && A.duongScan({maKH:'1', che:'the'})==='Tủ / CCCD' && A.duongScan({maKH:'1', che:'tailieu'})==='Tủ / Hồ sơ scan' && A.duongScan({})==='Tủ / Scan chờ sắp xếp'; } finally { A.D.cauHinh.thumuc = t; } });
thu('3.485 tcLoaiMau: 06A · 06A/TD · BBLV giữ chữ cũ (06A, 06ATD, BBLV) và có trong sổ mẫu hồ sơ vay', () => { const v = Object.values(A.TC.loaiMau); return A.tcLoaiMau('06A')==='06A' && A.tcLoaiMau('06A/TD')==='06ATD' && A.tcLoaiMau('bblv')==='BBLV' && ['06A', '06ATD', 'BBLV'].every(x => v.indexOf(x)>=0); });
/* Giao diện chung (chuỗi HTML — không cần trình duyệt) */
thu('coChuHTML: thoát & < > " (dùng được cả trong thuộc tính)', () => A.coChuHTML('a"b<c>&')==='a&quot;b&lt;c&gt;&amp;', () => A.coChuHTML('a"b<c>&'));
thu('GD.nut: thoát dấu nháy trong title, gắn data-lenh', () => /title="a&quot;b"/.test(A.GD.nut({chu:'x', lenh:'k.l', tit:'a"b'})) && /data-lenh="k.l"/.test(A.GD.nut({chu:'x', lenh:'k.l'})));
thu('xuatHang: thứ tự Đóng · In · Lưu vào app · PDF · Word · Excel · Gửi', () => { const h = A.xuatHang({ten:'x', html:()=>'<p>x</p>', vaoApp:'void 0'}); return (h.match(/>([^<>]+)<\/button>/g) || []).map(x => x.slice(1, -9).trim()).join('|')==='Đóng (Esc)|🖨 In|💾 Lưu vào app|📄 PDF|📝 Word|📊 Excel|📤 Gửi'; },
  () => (A.xuatHang({ten:'x', html:()=>'<p>x</p>', vaoApp:'void 0'}).match(/>([^<>]+)<\/button>/g) || []));

/* 3.504 (rà soát 08/11 — Đợt 2 mục 5): THỬ NHANH CÁC QT MỚI (hàm thuần, không trình duyệt) */
const toGD = ds => ({g4To:ds}), loiTo = ds => A.g4KiemTo(toGD(ds)).map(x => x.muc+':'+x.chu);
thu('QT-19 Tổ GD đủ (TT kiêm KSV, GDV chính, lái xe, bảo vệ đường, bảo vệ điểm) → không lỗi đỏ', () => !loiTo([{ten:'An', vai:['tt', 'ksv']}, {ten:'Bình', vai:['gdvc']}, {ten:'Chi', vai:['lx']}, {ten:'Dũng', vai:['bvd']}, {ten:'Em', vai:['bvt']}]).some(x => /^do:/.test(x)),
  () => loiTo([{ten:'An', vai:['tt', 'ksv']}, {ten:'Bình', vai:['gdvc']}, {ten:'Chi', vai:['lx']}, {ten:'Dũng', vai:['bvd']}, {ten:'Em', vai:['bvt']}]));
thu('QT-19 Tổ trưởng làm bảo vệ tại điểm thì không kiêm KSV → đỏ', () => loiTo([{ten:'An', vai:['tt', 'ksv', 'bvt']}, {ten:'Bình', vai:['gdvc']}, {ten:'Chi', vai:['lx']}]).some(x => /không kiêm Kiểm soát viên/.test(x)));
thu('QT-19 GDV chính không lái xe / bảo vệ đường → đỏ', () => loiTo([{ten:'An', vai:['tt']}, {ten:'Bình', vai:['gdvc', 'lx']}, {ten:'Chi', vai:['ksv']}]).some(x => /GDV chính là người áp tải/.test(x)));
thu('QT-19 thiếu Tổ trưởng / 2 GDV chính → đỏ; dưới 3 người → vàng', () => { const l = loiTo([{ten:'An', vai:['gdvc']}, {ten:'Bình', vai:['gdvc']}]); return l.some(x => /Chưa có Tổ trưởng/.test(x)) && l.some(x => /tối thiểu 03/.test(x)); }, () => loiTo([{ten:'An', vai:['gdvc']}, {ten:'Bình', vai:['gdvc']}]));
thu('QT-19 bấm vai: 1 Tổ trưởng duy nhất, GDV chính thay GDV', () => { const ds = [{ten:'A', vai:['tt']}, {ten:'B', vai:['gdv']}]; A.g4VaiDoi(ds, 1, 'tt'); A.g4VaiDoi(ds, 1, 'gdvc');
  return J(ds[0].vai)==='[]' && J(ds[1].vai)==='["tt","gdvc"]'; });
thu('QT-19 phương án đi đường 1: Tổ trưởng lái xe, người còn lại bảo vệ đường', () => { const ds = [{ten:'A', vai:['tt']}, {ten:'B', vai:['gdvc']}, {ten:'C', vai:['ksv']}]; const e = A.g4PaGan(ds, '1');
  return !e && ds[0].vai.indexOf('lx')>=0 && ds[2].vai.indexOf('bvd')>=0 && ds[1].vai.indexOf('bvd')<0; });
const QD = [{ngay:'2026-03-01', xa:'X1', nguon:1, luc:'a'}, {ngay:'2026-09-15', xa:'X1', nguon:1, luc:'b'}, {ngay:'2026-09-15', xa:'X1', nguon:1, luc:'c'}, {ngay:'2026-10-01', xa:'X1', nguon:2}, {ngay:'2025-12-01', xa:'X1', nguon:1}];
thu('QT-20 Tờ trình 09/KH lấy QĐ gần nhất trong năm của đúng xã + nguồn (cùng ngày → lập sau)', () => A.pbQDCuoi(QD, '2026', 'X1', 1).luc==='c' && A.pbQDCuoi(QD, '2026', 'X1', 2).ngay==='2026-10-01' && A.pbQDCuoi(QD, '2026', 'X2', 1)===null,
  () => A.pbQDCuoi(QD, '2026', 'X1', 1));
thu('QT-22 danh sách đối chiếu: còn nợ / còn lãi tồn / còn tiền gửi 105; hết cả 3 thì bỏ', () => { const g = A.KHO.toVien; A.KHO.toVien = () => [{ten:'Nợ', conNo:1}, {ten:'Lãi', lt:5}, {ten:'Gửi', t105:9}, {ten:'Hết', lt:0, t105:0}];
  try { return J(A.KHO.doiChieu('T').map(k => k.ten))===J(['Nợ', 'Lãi', 'Gửi']); } finally { A.KHO.toVien = g; } });
thu('Khung mẫu in: điền ô thêm cách khi nhãn dính chấm, trống giữ chấm, thoát XML', () => A.MAU_IN.dien('<w:t>Hội{{H|....}}, {{T|..}}</w:t>', {H:'Nông dân', T:''})==='<w:t>Hội Nông dân, ..</w:t>' && A.MAU_IN.dien('<w:t>{{A|.}}</w:t>', {A:'x&y'})==='<w:t>x&amp;y</w:t>',
  () => A.MAU_IN.dien('<w:t>Hội{{H|....}}, {{T|..}}</w:t>', {H:'Nông dân', T:''}));
thu('Khung mẫu in: chưa đăng ký mẫu → lỗi rõ', () => { try { A.MAU_IN.lay('khong-co'); return false; } catch(e){ return /Chưa đăng ký mẫu/.test(e.message); } });

/* 3.507 (anh 09/11): tên chương trình GQVL mới trên mẫu Phân bổ */
const MOI = 'Cho vay hỗ trợ tạo việc làm, duy trì và mở rộng việc làm';
thu('Phân bổ: CT 03 tên cũ / trống → tên mới; CT khác, tên khác giữ nguyên', () => A.pbTenDung('03', 'Cho vay giải quyết việc làm')===MOI && A.pbTenDung('03', '')===MOI && A.pbTenDung('03', 'CHO VAY GIẢI QUYẾT VIỆC LÀM')===MOI && A.pbTenDung('01', 'Cho vay hộ nghèo')==='Cho vay hộ nghèo' && A.pbTenCT('03')===MOI);
thu('Phân bổ đọc QĐ: tên mới / tên cũ đều nhận là mã 03', () => A.pbCTMa('Cho vay hỗ trợ tạo việc làm, duy trì và mở rộng việc làm')==='03' && A.pbCTMa('Cho vay giải quyết việc làm')==='03' && A.pbCTMa('Hỗ trợ tạo việc làm')==='03', () => [A.pbCTMa(MOI), A.pbCTMa('Hỗ trợ tạo việc làm')]);

const sai = o.filter(x => x[0]==='✗');
console.log(o.join('\n')); console.log((o.length-sai.length)+'/'+o.length+' đạt · '+(Date.now()-t0)+' ms');
process.exitCode = sai.length ? 1 : 0;
