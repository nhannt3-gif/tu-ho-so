// t369 (3.465, anh 04/11 "QĐ của tỉnh có cấu trúc theo từng chương trình vay, khi nhập liệu cũng cho nhập như vậy"): LÕI ĐỌC DANH MỤC QĐ (js/47) — chạy bằng node, không trình duyệt.
//   pbDauQD (số / ký hiệu / ngày / nguồn / loại / đợt — kể cả số + ngày đóng thêm ở dòng riêng) · pbChuDM (chữ PDF, dấu cách là ký tự rỗng) · pbDanhMuc (chương trình → PGD → xã, kiểm 5 = 3 + 4, tổng)
//   pbCTMa (tên CT trên QĐ → mã) · pbPgdTen (khoảng trắng dính) · pbQDTuDM (bản ghi mỗi xã của 1 PGD, dòng tổng PGD) · pbXlsDM (Excel DANH_MUC). Số liệu GIẢ.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = vm.createContext({console}); vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', '47-phan-bo.js'), 'utf8'), ctx);
const o = [], ok = (t, d, c)=>o.push((d ? '✓ ' : '✗ ')+t+(c!==undefined ? ' — '+c : '')), R = (code, v)=>{ ctx.v = v; return vm.runInContext(code, ctx); };
const N = '\u0000';   /* QĐ thật: font dùng ký tự rỗng làm dấu cách */
const dau = ['ỦY BAN NHÂN DÂN TỈNH GIẢ', 'Số: /QĐ-BĐDHĐQT Tỉnh Giả, ngày tháng 7 năm 2026', 'QUYẾT ĐỊNH', 'Về việc điều chỉnh chỉ tiêu kế hoạch tín dụng nguồn vốn', 'Trung ương năm 2026 (đợt 7)',
  'Căn cứ Quyết định số 162/QĐ-HĐQT ngày 17/4/2003 của Hội đồng quản trị;', '99999 30'].join('\n');
const bang = ['DANH MỤC ĐIỀU CHỈNH', '1 2 3 4 5=3+4', 'KẾ HOẠCH DƯ NỢ',
  'I Chương'+N+'trình'+N+'Hộ'+N+'nghèo 1.500 +'+N+'100 1.600',
  '1 Phòng'+N+'giao'+N+'dịch'+N+'NHCSXH'+N+'Giả'+N+'Một 1.000 +'+N+'50 1.050', '1.1 Xã'+N+'Giả'+N+'A 600 - 600', '1.2 Xã'+N+'Giả'+N+'B 400 +'+N+'50 450',
  '2 Phòng'+N+'giao'+N+'dịch'+N+'NHCSXH'+N+'GiảHai 500 +'+N+'50 550', '2.1 Phường'+N+'Giả'+N+'C 75 -'+N+'92 -17', '2.2 Xã'+N+'Giả'+N+'D 425 +'+N+'142 567',
  'II Chương'+N+'trình'+N+'Hộ'+N+'Cận'+N+'Nghèo 2.000 -'+N+'20 1.980',
  '1 Phòng'+N+'giao'+N+'dịch'+N+'NHCSXH'+N+'Giả'+N+'Một 2.000 -'+N+'20 1.980', '1.1 Xã'+N+'Giả'+N+'A 1.200 -'+N+'20 1.180', '1.2 Xã'+N+'Giả'+N+'B 800 - 800',
  'III Chương trình Cho vay Hộ mới thoát nghèo 300 +10 310', '1 Phòng giao dịch NHCSXH Giả Một 300 +10 310', '1.1 Xã Giả A 300 +10 300'].join('\n');
const d = R('pbDauQD(v)', dau+'\n'+bang);
ok('đầu QĐ: số đóng thêm ở dòng riêng, không lấy số của Căn cứ (162), ngày 30/7/2026, TW, Điều chỉnh, đợt 7', d.so==='99999' && d.kyHieu==='/QĐ-BĐDHĐQT' && d.ngay==='2026-07-30' && d.nguon===1 && d.loai==='Điều chỉnh' && d.dot==='7', JSON.stringify(d));
ok('đầu QĐ: số in sẵn trên dòng "Số:" · địa phương · giao mới', (()=>{ const x = R('pbDauQD(v)', 'Số: 1234/QĐ-BĐDHĐQT Tỉnh Giả, ngày 05 tháng 01 năm 2026\nVề việc giao chỉ tiêu kế hoạch tín dụng nguồn vốn ngân sách địa phương'); return x.so==='1234' && x.ngay==='2026-01-05' && x.nguon===2 && x.loai==='Giao mới'; })());
const dm = R('pbDanhMuc(pbChuDM(v))', bang);
ok('danh mục: 3 chương trình, mã tự ghép 01 / 19 / 09 (cận nghèo, mới thoát nghèo xét trước hộ nghèo)', dm.ct.map(c=>c.ma).join(',')==='01,19,09', dm.ct.map(c=>c.ten+'→'+c.ma).join(' | '));
ok('danh mục: ký tự rỗng thành dấu cách — tên xã đọc đúng', dm.ct[0].pgd[0].xa[0].ten==='Xã Giả A' && dm.ct[0].pgd.length===2);
ok('cột điều chỉnh "-" = 0; "- 92" giảm; đến 31/12 âm "-17"', JSON.stringify(dm.ct[0].pgd[0].xa[0].so)==='[600,0,600]' && JSON.stringify(dm.ct[0].pgd[1].xa[0].so)==='[75,-92,-17]');
ok('kiểm: dòng 3 + 4 ≠ 5 (Xã Giả A ở III) được báo', dm.canh.some(c=>/Giả A/.test(c.xa) && /≠/.test(c.ly)));
ok('kiểm: tổng các xã = dòng PGD, tổng PGD = dòng chương trình — khớp ở I, II (không báo nhầm)', !dm.canh.some(c=>/Hộ nghèo|Cận/.test(c.ct) && /tổng/.test(c.ly)), JSON.stringify(dm.canh));
const dm2 = R('pbDanhMuc(pbChuDM(v))', bang.replace('1.2 Xã'+N+'Giả'+N+'B 400 +'+N+'50 450\n', ''));
ok('kiểm: đọc sót 1 xã → báo tổng các xã ≠ dòng PGD', dm2.canh.some(c=>/tổng các xã/.test(c.ly)));
ok('PGD: bỏ khoảng trắng khi so ("GiảHai" = "Giả Hai"); danh sách 2 PGD', R('pbPgdTen("Phòng giao dịch NHCSXH GiảHai")===pbPgdTen("PGD Giả Hai") && pbPgdDs(v).length===2', dm));
const q = R('pbQDTuDM(v.d, v.dm, {pgd:pbPgdTen("Giả Một"), xa:{"xa gia b":false}})', {d, dm});
ok('bản ghi PGD Giả Một: bỏ tích Xã Giả B → chỉ Xã Giả A, 3 chương trình đúng thứ tự QĐ', q.qd.length===1 && q.qd[0].tenXa==='Xã Giả A' && q.qd[0].ct.map(c=>c.ma).join(',')==='01,19,09');
ok('bản ghi giữ đầu QĐ + dòng tổng PGD theo mã (đối chiếu khi xem / sửa)', q.qd[0].so==='99999' && JSON.stringify(q.qd[0].tong['01'])==='[1000,50,1050]' && /Giả Một/.test(q.qd[0].pgd));
ok('mã CT: dân tộc thiểu số → chưa ghép (hỏi anh); tên đã chọn lần trước → nhớ', R('pbCTMa("Chương trình cho vay hộ dân tộc thiểu số")===""') && R('pbCTMa("Chương trình cho vay hộ dân tộc thiểu số", {"ho dan toc thieu so":"11"})==="11"'));
const q2 = R('pbQDTuDM(v.d, v.dm, {pgd:pbPgdTen("Giả Một"), ma:{"ho can ngheo":""}})', {d, dm:R('pbDanhMuc(pbChuDM(v))', bang.replace('Hộ'+N+'Cận'+N+'Nghèo', 'Hộ'+N+'dân'+N+'tộc'+N+'thiểu'+N+'số'))});
ok('chương trình chưa có mã → không lấy, báo "chưa chọn mã"', q2.canh.some(c=>/chưa chọn mã/.test(c.ly)) && q2.qd[0].ct.length===2);
const xl = R('pbXlsDM(v)', [['stt', 'don_vi_chi_tieu', 'da_giao', 'dieu_chinh', 'den_31_12'], ['', 'KẾ HOẠCH DƯ NỢ', '', '', ''], ['I', 'Chương trình Hộ nghèo', 1500, '+100', 1600],
  ['1', 'Phòng giao dịch NHCSXH Giả Một', 1000, 50, 1050], ['1.1', 'Xã Giả A', 600, '-', 600], ['1.2', 'Xã Giả B', 400, '+50', 450]]);
const dx = R('pbDanhMuc(v)', xl);
ok('Excel DANH_MUC: cùng cấu trúc (ô "-" = 0, "+50" = 50)', dx.ct.length===1 && dx.ct[0].ma==='01' && JSON.stringify(dx.ct[0].pgd[0].xa[0].so)==='[600,0,600]' && dx.ct[0].pgd[0].xa[1].so[1]===50 && !dx.canh.some(c=>/PGD/.test(c.pgd) && /tổng các xã/.test(c.ly)));
ok('Excel thiếu cột → null (báo tải lại mẫu)', R('pbXlsDM([["stt","ten"],["I","x"]])===null'));
console.log(o.join('\n')); const sai = o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t369 SAI '+sai : '✓ t369 đạt '+o.length); process.exit(sai ? 1 : 0);
