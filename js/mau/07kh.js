/* ===== 3.494 (anh 07/11/2026 — QĐ 4686/QĐ-NHCS ngày 21/10/2026 "Quy định về xây dựng và tổ chức thực hiện kế hoạch tín dụng"): MẪU MỚI cạnh Biểu 07 cũ =====
   - 07/KH  QĐ của Ban Đại diện HĐQT NHCSXH xã giao (điều chỉnh) chỉ tiêu KH tín dụng cho các thôn (…/QĐ-BĐD · TM. BAN ĐẠI DIỆN · TRƯỞNG BAN)
   - 08/KH  QĐ của Giám đốc PGD điều chỉnh chỉ tiêu KH tín dụng cho các thôn (khi Ban Đại diện HĐQT xã có Nghị quyết giao GĐ PGD quyết định)
   - 09/KH  Tờ trình của Ban Đại diện HĐQT xã đề nghị tỉnh điều chỉnh chỉ tiêu KH tín dụng (quy trình ngược — số đã giao theo QĐ trước, js/48c)
   Bố cục, chữ theo file mẫu trắng anh gửi 07/11 (Biểu số 07, 08, 09/KH kèm QĐ 4686 — file không đưa vào repo). BIỂU 07 CŨ (Thông báo UBND, js/mau/07pb.js) GIỮ NGUYÊN — anh 07/11
   "để in lại cái cũ khi cần". 07/KH · 08/KH dùng CHUNG dữ liệu phân bổ của Biểu 07 (pbBieu07DL — khớp QĐ QT-16) và hộp xem / In / PDF / Word của Biểu 07 (chọn mẫu ở đầu hộp).
   Khai báo riêng kiểu nền ô (PB07_CACH) — lưu chung 1 chỗ cho 3 mẫu mới: KHO1 'pb' → ch.bKH = {cach, gt, co} (ô trùng tên dùng chung: Trưởng ban, tỉnh, PGD…). */
var PBKH_M = {
  '07kh':{k:'07kh', ma:'07/KH', ten:'07/KH — QĐ Ban Đại diện HĐQT xã', mg:typeof omMg==='function' ? omMg([20, 20, 20, 30]) : [20, 19.6, 20, 29.6], ngang:false},
  '08kh':{k:'08kh', ma:'08/KH', ten:'08/KH — QĐ Giám đốc PGD', mg:typeof omMg==='function' ? omMg([20, 20, 20, 30]) : [20, 19.6, 20, 29.6], ngang:false},
  '09kh':{k:'09kh', ma:'09/KH', ten:'09/KH — Tờ trình điều chỉnh', mg:typeof omMg==='function' ? omMg([20, 20, 20, 30]) : [20, 19.6, 20, 29.6], ngang:false}};
var PBKH_BX = ' Việc bình xét cho vay phải đảm bảo nguyên tắc công khai, dân chủ, đúng đối tượng và có sự tham gia, giám sát của Trưởng thôn và tổ chức chính trị - xã hội nhận ủy thác.';   /* câu chung Điều 2 (07/KH · 08/KH) */
var PBKH_QD4686 = '4686/QĐ-NHCS ngày 21/10/2026', PBKH_QC = '56/QĐ-HĐQT ngày 27/8/2026';   /* văn bản công khai — chữ sẵn, anh sửa được (⌨) */
/* ô khai báo: chi = mẫu dùng ô (không ghi = cả 3) · tuFn / chungFn: nguồn 🤖 / ⚙ riêng (pb07GT ở js/mau/07pb.js gọi) */
var PBKH_O = [
  {k:'khNoi', n:'Nơi lập ("…, ngày")', ds:['cham', 'tu', 'chung', 'kb'], md:'tu', tu:'tên xã / phường (bỏ chữ "xã", "phường")', chung:'noi', tuFn:function(d){ return pb07Ten0(d && d.dv); }},
  {k:'khSo', n:'Số văn bản', ds:['cham', 'go'], md:'cham'},
  {k:'khNgay', n:'Ngày văn bản', ds:['cham', 'tu', 'go'], md:'tu', ngay:1, chi:['07kh', '08kh'], tu:'ngày QĐ của tỉnh + 1, né thứ 7 / CN', tuFn:function(d){ return pbNgayTB(d && d.ngayQD, (typeof pbDL==='function' ? pbDL().ch : {})); }},
  {k:'khNgayTT', n:'Ngày tờ trình', ds:['cham', 'tu', 'go'], md:'tu', ngay:1, chi:['09kh'], tu:'hôm nay', tuFn:function(){ return ngayISO(nay()); }},
  {k:'khTinh', n:'Tỉnh', ds:['cham', 'chung', 'kb'], md:'chung', chung:'tinh'},
  {k:'khPGD', n:'Tên PGD (sau chữ "NHCSXH")', ds:['cham', 'chung', 'kb'], md:'chung', chung:'ngan'},
  {k:'khQC', n:'QĐ Quy chế Ban Đại diện HĐQT (số, ngày)', ds:['cham', 'kb'], md:'kb', mau:PBKH_QC, chi:['07kh']},
  {k:'kh4686', n:'QĐ Tổng Giám đốc về KH tín dụng (số, ngày)', ds:['cham', 'kb'], md:'kb', mau:PBKH_QD4686},
  {k:'khNQ', n:'Nghị quyết Ban Đại diện HĐQT xã (số, ngày)', ds:['cham', 'go', 'kb'], md:'cham', chi:['07kh', '08kh']},
  {k:'khTruongBan', n:'Trưởng ban (dưới chữ ký)', ds:['cham', 'kb'], md:'cham', chi:['07kh', '09kh']},
  {k:'khGD', n:'Giám đốc PGD (dưới chữ ký)', ds:['cham', 'chung', 'kb'], md:'cham', chung:'daiDien', chi:['08kh']},
  {k:'khNN07', n:'Nơi nhận', ds:['kb'], md:'kb', mau:'- Như Điều 3;\n- Lưu: BĐD HĐQT cấp xã,\n  PGD NHCSXH.', nhieu:1, chi:['07kh']},
  {k:'khNN08', n:'Nơi nhận', ds:['kb'], md:'kb', mau:'- Như Điều 3;\n- Ban Đại diện HĐQT {xã};\n- Lưu: Phòng giao dịch NHCSXH.', nhieu:1, chi:['08kh']},
  {k:'khNN09', n:'Nơi nhận', ds:['kb'], md:'kb', mau:'- Như trên;\n- Ban Đại diện HĐQT NHCSXH cấp xã;\n- Lưu: PGD NHCSXH.', nhieu:1, chi:['09kh']}];
function pbKHDsO(mau){ return PBKH_O.filter(function(x){ return !x.chi || x.chi.indexOf(mau)>=0; }); }

/* ---------- dùng chung 3 mẫu ---------- */
function pbKHO(v, cham){ return pb07O(v, cham); }
function pbKHNgay(iso){ return pbKHO(pb07NgayDai(iso), '...... tháng ...... năm ......'); }
function pbKHDong(v, lop, xa){ return String(v || '').split(/\n/).map(function(s){ return s.replace(/\{xã\}/g, xa || '').trim(); }).filter(Boolean).map(function(s){ return '<p class="'+lop+'">'+pbKHO(s, '')+'</p>'; }).join(''); }
function pbKHP(noi, lop){ return '<p class="'+(lop || 'j thut tr')+'" style="line-height:1.15">'+noi+'</p>'; }
function pbKHSoQD(d){ return pbKHO(pb07SoQD(d), '..........'); }
/* bảng thôn → CT (07/KH · 08/KH): dòng thôn đậm không STT, CT đánh số 1, 2… trong thôn (như mẫu) */
function pbKHBangThon(d, du){
  var ds = du && d.apDu ? d.apDu : d.ap, nguonT = d.nguon===2 ? 'địa phương' : 'trung ương';
  var h = '<thead><tr style="height:13mm"><td class="c b">STT</td><td class="c b">Chỉ tiêu kế hoạch dư nợ<br>từ nguồn vốn '+nguonT+'</td><td class="c b">Số tăng trưởng<br>(tăng/giảm)</td><td class="c b">Số dư nợ<br>năm '+d.nam+'</td></tr></thead><tbody>';
  ds.forEach(function(a){
    h += '<tr style="height:8mm"><td></td><td class="b">'+pbKHO(a.ten, '')+'</td><td></td><td></td></tr>';
    a.ds.forEach(function(c, j){ h += '<tr style="height:8mm"><td class="c">'+(j+1)+'</td><td>'+pbKHO(c.ten, '')+'</td><td class="r" style="padding-right:5pt">'+pbKHO(pbSoVN(c.dc), '')+'</td><td class="r" style="padding-right:5pt">'+pbKHO(pbSoVN(c.nam), '')+'</td></tr>'; }); });
  if(!ds.length) h += '<tr style="height:8mm"><td></td><td></td><td></td><td></td></tr>';
  return hsoBang('luoi pb07-bang', [13, 83, 32, 32], h+'</tbody>');
}
/* khối ký: Nơi nhận (trái) · chức danh + chỗ ký + tên (phải) */
function pbKHKy(noiNhan, chuc, ten){
  return '<p class="tr">&nbsp;</p>'+hsoBang('khung0', [80, 80], '<tr><td><p class="b i s12">Nơi nhận:</p>'+noiNhan+'</td><td class="c">'+chuc+
    '<p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p>'+(ten ? '<p class="c b">'+pbKHO(ten, '')+'</p>' : '')+'</td></tr>'); }

/* ---------- 07/KH · 08/KH: d = pbBieu07DL(...) (1 xã) · K = khai báo · du = liệt kê đủ các thôn ---------- */
function pbKHLap(d, K, mau, du){
  K = K || {}; var gt = function(k){ return pb07GT(K, k, d); }, dv = d.dv, nam = pbKHO(d.nam, '.......'), laDC = mau==='08kh' || d.laDC, loai = laDC ? 'điều chỉnh' : 'giao', LOAI = laDC ? 'ĐIỀU CHỈNH' : 'GIAO';
  var so = gt('khSo'), soT = so ? pbKHO(so, '') : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', ng = gt('khNgay'), ngD = pbKHNgay(ng), ngS = pbKHO(pbNgayVN(ng), '...../...../........');
  var tinh = pbKHO(gt('khTinh'), '..........'), pgd = pbKHO(gt('khPGD'), '..........'), xaH = pbKHO(dv.hoa, '..................'), xaT = pbKHO(dv.thuong, '..................');
  var nq = gt('khNQ'), nqT = nq ? pbKHO(nq, '') : '…/NQ-BĐD ngày …/…/…', qdT = pbKHSoQD(d)+' ngày '+pbKHO(pbNgayVN(d.ngayQD), '...../...../........');
  var noi = pbKHO(gt('khNoi'), '..............')+', ngày '+ngD, t1, t2;
  if(mau==='08kh'){
    var donVi = '<p class="c" style="font-size:10.5pt">CHI NHÁNH NHCSXH TỈNH '+pbKHO(String(gt('khTinh') || '').toUpperCase(), '..........')+'</p><p class="c b" style="font-size:10.5pt">PHÒNG GIAO DỊCH NHCSXH '+pbKHO(String(gt('khPGD') || '').toUpperCase(), '..........')+'</p>'+hsoKe(22);
    t1 = hsoBang('khung0', [70, 90], '<tr><td class="c">'+donVi+'</td><td class="c">'+hsoQH('-', 12).replace(/class="c b"/g, 'class="c b s12"')+'</td></tr>'+
        '<tr><td class="c"><p class="c s13">Số:'+(so ? ' ' : '&nbsp;&nbsp;&nbsp;')+soT+'/QĐ-NHCS</p></td><td class="c"><p class="c i">'+noi+'</p></td></tr>')+
      '<p class="c b tr3">QUYẾT ĐỊNH</p><p class="c b">Về việc điều chỉnh chỉ tiêu kế hoạch tín dụng năm '+nam+'</p>'+hsoKe(30)+
      '<p class="c b tr">GIÁM ĐỐC PHÒNG GIAO DỊCH NGÂN HÀNG CHÍNH SÁCH XÃ HỘI '+pbKHO(String(gt('khPGD') || '').toUpperCase(), '..........')+'</p>'+
      pbKHP('Căn cứ Quyết định số '+pbKHO(gt('kh4686'), '…/QĐ-NHCS ngày …/…/…')+' của Tổng Giám đốc Ngân hàng Chính sách xã hội (NHCSXH) quy định về việc xây dựng và tổ chức thực hiện kế hoạch tín dụng trong hệ thống NHCSXH;', 'j thut tr i')+
      pbKHP('Căn cứ Quyết định số '+qdT+' của Ban Đại diện Hội đồng quản trị NHCSXH tỉnh '+tinh+' về việc '+(d.laDC ? 'điều chỉnh' : 'giao')+' chỉ tiêu kế hoạch tín dụng năm '+nam+' cho các xã (phường, đặc khu);', 'j thut i')+
      pbKHP('Căn cứ Nghị quyết số '+nqT+' của Ban Đại diện HĐQT NHCSXH '+xaT+' về việc giao Giám đốc Phòng giao dịch NHCSXH quyết định điều chỉnh kế hoạch tín dụng;', 'j thut i')+
      pbKHP('Xét đề nghị của Tổ trưởng Tổ Kế hoạch - Tín dụng.', 'j thut i')+
      '<p class="c b tr">QUYẾT ĐỊNH:</p>'+
      pbKHP('<b>Điều 1.</b> Điều chỉnh chỉ tiêu kế hoạch tín dụng năm '+nam+' cho các thôn (làng, ấp, bản) của '+xaT+' theo Danh mục đính kèm.')+
      pbKHP('<b>Điều 2.</b> Trưởng thôn (làng, ấp, bản) căn cứ chỉ tiêu kế hoạch tín dụng được giao theo Quyết định này chỉ đạo các Tổ Tiết kiệm và vay vốn tổ chức bình xét cho vay và lập hồ sơ vay vốn theo quy định của NHCSXH.'+PBKH_BX)+
      pbKHP('<b>Điều 3.</b> Các tổ chức chính trị - xã hội nhận ủy thác, các Trưởng thôn (làng, ấp, bản) và các đơn vị có liên quan chịu trách nhiệm thi hành Quyết định này./.')+
      pbKHKy(pbKHDong(gt('khNN08'), 's11', 'NHCSXH '+dv.thuong), '<p class="c b">GIÁM ĐỐC</p>', gt('khGD'));
    t2 = '<p class="c b">DANH MỤC ĐIỀU CHỈNH CHỈ TIÊU KẾ HOẠCH TÍN DỤNG NĂM '+nam+'</p><p class="c b">ĐỐI VỚI CÁC THÔN (LÀNG, ẤP, BẢN) CỦA '+xaH+'</p>'+
      pbKHP('(Kèm theo Quyết định số '+(so ? pbKHO(so, '') : '.......')+'/QĐ-NHCS ngày '+ngD+' của Giám đốc Phòng giao dịch NHCSXH '+pgd+')', 'c i s13 tr');
  } else {
    var donViX = '<p class="c b s13">BAN ĐẠI DIỆN HĐQT</p><p class="c b s13">NHCSXH '+xaH+'</p>'+hsoKe(22);
    t1 = hsoBang('khung0', [62, 98], '<tr><td class="c">'+donViX+'</td><td class="c">'+hsoQH('-', 13).replace(/class="c b"/g, 'class="c b s13"')+'</td></tr>'+
        '<tr><td class="c"><p class="c s13">Số:'+(so ? ' ' : '&nbsp;&nbsp;&nbsp;')+soT+'/QĐ-BĐD</p></td><td class="c"><p class="c i">'+noi+'</p></td></tr>')+
      '<p class="c b tr3">QUYẾT ĐỊNH</p><p class="c b">Về việc '+loai+' chỉ tiêu kế hoạch tín dụng năm '+nam+'</p>'+hsoKe(30)+
      '<p class="c b tr">BAN ĐẠI DIỆN HỘI ĐỒNG QUẢN TRỊ</p><p class="c b">NGÂN HÀNG CHÍNH SÁCH XÃ HỘI '+xaH+'</p>'+
      pbKHP('Căn cứ Quyết định số '+pbKHO(gt('khQC'), '…/QĐ-HĐQT ngày …/…/…')+' của Hội đồng quản trị Ngân hàng Chính sách xã hội (NHCSXH) về Quy chế hoạt động của Ban Đại diện Hội đồng quản trị NHCSXH các cấp;', 'j thut tr i')+
      pbKHP('Căn cứ Quyết định số '+pbKHO(gt('kh4686'), '…/QĐ-NHCS ngày …/…/…')+' của Tổng Giám đốc NHCSXH quy định về việc xây dựng và tổ chức thực hiện kế hoạch tín dụng trong hệ thống NHCSXH;', 'j thut i')+
      pbKHP('Căn cứ Quyết định số '+qdT+' của Ban Đại diện Hội đồng quản trị NHCSXH tỉnh '+tinh+' về việc '+loai+' chỉ tiêu kế hoạch tín dụng năm '+nam+' cho các xã (phường, đặc khu);', 'j thut i')+
      pbKHP('Căn cứ Nghị quyết số '+nqT+' của Ban Đại diện HĐQT NHCSXH '+xaT+' về việc '+loai+' chỉ tiêu kế hoạch tín dụng;', 'j thut i')+
      pbKHP('Xét đề nghị của Giám đốc Phòng giao dịch NHCSXH '+pgd+'.', 'j thut i')+
      '<p class="c b tr">QUYẾT ĐỊNH:</p>'+
      pbKHP('<b>Điều 1.</b> '+(laDC ? 'Điều chỉnh' : 'Giao')+' chỉ tiêu kế hoạch tín dụng năm '+nam+' cho các thôn (làng, ấp, bản) theo Danh mục đính kèm.')+
      pbKHP('<b>Điều 2.</b> Phòng giao dịch NHCSXH phối hợp các tổ chức chính trị - xã hội nhận ủy thác cùng các Trưởng thôn (làng, ấp, bản) căn cứ chỉ tiêu kế hoạch tín dụng được giao theo Quyết định này chỉ đạo các Tổ Tiết kiệm và vay vốn tổ chức bình xét cho vay và lập hồ sơ vay vốn theo quy định của NHCSXH.'+PBKH_BX)+
      pbKHP('<b>Điều 3.</b> Giám đốc Phòng giao dịch NHCSXH '+pgd+', các tổ chức chính trị - xã hội nhận ủy thác, các Trưởng thôn (làng, ấp, bản) và các đơn vị có liên quan chịu trách nhiệm thi hành Quyết định này./.')+
      pbKHKy(pbKHDong(gt('khNN07'), 's11'), '<p class="c b">TM. BAN ĐẠI DIỆN HĐQT NHCSXH</p><p class="c b">'+xaH+'</p><p class="c b">TRƯỞNG BAN</p>', gt('khTruongBan'));
    t2 = '<p class="c b">DANH MỤC '+LOAI+' CHỈ TIÊU KẾ HOẠCH TÍN DỤNG NĂM '+nam+'</p><p class="c b">ĐỐI VỚI CÁC THÔN (LÀNG, ẤP, BẢN)</p>'+
      pbKHP('(Kèm theo Quyết định số '+(so ? pbKHO(so, '') : '.......')+'/QĐ-BĐD ngày '+ngD+' của Ban Đại diện HĐQT NHCSXH '+xaT+')', 'c i s13 tr');
  }
  t2 += pbKHP('Đơn vị: triệu đồng', 'r i tr')+pbKHBangThon(d, du);
  var M = PBKH_M[mau]; return [{M:M, h:pb07Boc(t1, K)}, {M:M, h:pb07Boc(t2, K)}];
}

/* ---------- 09/KH Tờ trình: d = {dv, nam, nguon, qd:{so, kyHieu, ngay, laDC} (QĐ gần nhất của tỉnh), ct:[{ma, ten, dg, dn, nam}]} ---------- */
function pb09Lap(d, K, du){
  K = K || {}; var gt = function(k){ return pb07GT(K, k, d); }, dv = d.dv, nam = pbKHO(d.nam, '.......');
  var so = gt('khSo'), soT = so ? pbKHO(so, '') : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', ng = gt('khNgayTT'), ngD = pbKHNgay(ng), ngS = pbKHO(pbNgayVN(ng), '…/…/…');
  var tinh = pbKHO(gt('khTinh'), '..........'), pgd = pbKHO(gt('khPGD'), '..........'), xaH = pbKHO(dv.hoa, '..................'), xaT = pbKHO(dv.thuong, '..................'), q = d.qd || {};
  var qdT = q.so ? pbKHO(pb07SoQD({so:q.so, kyHieu:q.kyHieu}), '')+' ngày '+pbKHO(pbNgayVN(q.ngay), '') : '..../QĐ-BĐD ngày …/…/…';
  var donViX = '<p class="c b s13">BAN ĐẠI DIỆN HĐQT</p><p class="c b s13">NHCSXH '+xaH+'</p>'+hsoKe(22);
  var t1 = hsoBang('khung0', [62, 98], '<tr><td class="c">'+donViX+'</td><td class="c">'+hsoQH('-', 13).replace(/class="c b"/g, 'class="c b s13"')+'</td></tr>'+
      '<tr><td class="c"><p class="c s13">Số:'+(so ? ' ' : '&nbsp;&nbsp;&nbsp;')+soT+'/TTr-BĐD</p></td><td class="c"><p class="c i">'+pbKHO(gt('khNoi'), '..............')+', ngày '+ngD+'</p></td></tr>')+
    '<p class="c b tr3">TỜ TRÌNH</p><p class="c b">Về việc điều chỉnh chỉ tiêu kế hoạch tín dụng năm '+nam+'</p>'+hsoKe(30)+
    pbKHP('Kính gửi: Ban Đại diện HĐQT NHCSXH tỉnh '+tinh, 'c tr')+
    pbKHP('Căn cứ Quyết định số '+pbKHO(gt('kh4686'), '…/QĐ-NHCS ngày …/…/…')+' của Tổng Giám đốc Ngân hàng Chính sách xã hội (NHCSXH) quy định về xây dựng và tổ chức thực hiện kế hoạch tín dụng trong hệ thống NHCSXH;', 'j thut tr i')+
    pbKHP('Căn cứ Quyết định số '+qdT+' của Ban Đại diện HĐQT NHCSXH tỉnh '+tinh+' về việc '+(q.laDC ? 'điều chỉnh' : 'giao')+' chỉ tiêu kế hoạch tín dụng năm '+nam+' cho xã (phường, đặc khu);', 'j thut i')+
    pbKHP('Căn cứ tình hình thực hiện và khả năng thực hiện chỉ tiêu kế hoạch tín dụng được giao năm '+nam+';', 'j thut i')+
    pbKHP('Căn cứ đề nghị của Giám đốc Phòng giao dịch NHCSXH '+pgd+'.', 'j thut i')+
    pbKHP('Kính đề nghị Ban Đại diện HĐQT NHCSXH tỉnh '+tinh+' xem xét phê duyệt điều chỉnh chỉ tiêu kế hoạch tín dụng năm '+nam+' theo Danh mục đính kèm.')+
    pbKHKy(pbKHDong(gt('khNN09'), 's11'), '<p class="c b">TM. BAN ĐẠI DIỆN HĐQT NHCSXH</p><p class="c b">'+xaH+'</p><p class="c b">TRƯỞNG BAN</p>', gt('khTruongBan'));
  var ds = du ? d.ct : d.ct.filter(function(c){ return c.dn; }), nguonT = d.nguon===2 ? 'địa phương' : 'trung ương';
  var h = '<thead><tr style="height:15mm"><td class="c b">TT</td><td class="c b">Chỉ tiêu kế hoạch dư nợ<br>từ nguồn vốn '+nguonT+'</td><td class="c b">Số tăng trưởng đã giao<br>(tăng/giảm)</td><td class="c b">Đề nghị điều chỉnh số tăng trưởng<br>(tăng/giảm)</td><td class="c b">Số dư nợ<br>năm '+d.nam+'</td></tr></thead><tbody>';
  ds.forEach(function(c, i){ h += '<tr style="height:8mm"><td class="c">'+(i+1)+'</td><td>'+pbKHO(c.ten, '')+'</td><td class="r" style="padding-right:5pt">'+pbKHO(pbSoVN(c.dg), '')+'</td><td class="r" style="padding-right:5pt">'+
    pbKHO(c.dn ? pbSoDau(c.dn) : '', '')+'</td><td class="r" style="padding-right:5pt">'+pbKHO(pbSoVN(c.nam), '')+'</td></tr>'; });
  if(!ds.length) h += '<tr style="height:8mm"><td></td><td></td><td></td><td></td><td></td></tr>';
  var t2 = '<p class="c b">DANH MỤC ĐIỀU CHỈNH CHỈ TIÊU KẾ HOẠCH TÍN DỤNG NĂM '+nam+'</p><p class="c b">CỦA '+xaH+'</p>'+
    pbKHP('(Kèm Tờ trình số '+(so ? pbKHO(so, '') : '.......')+'/TTr-BĐD ngày '+ngS+' của Ban Đại diện HĐQT NHCSXH '+xaT+')', 'c i s13 tr')+pbKHP('Đơn vị: triệu đồng', 'r i tr')+
    hsoBang('luoi pb07-bang', [11, 63, 29, 31, 26], h+'</tbody>');
  return [{M:PBKH_M['09kh'], h:pb07Boc(t1, K)}, {M:PBKH_M['09kh'], h:pb07Boc(t2, K)}];
}
/* nhiều xã → 1 bản in / 1 file Word (mỗi xã 2 trang) */
function pbKHTrang(dsDL, K, ten, mau, du){ var ds = [];
  dsDL.forEach(function(d){ ds = ds.concat(mau==='09kh' ? pb09Lap(d, K, du) : pbKHLap(d, K, mau, du)); });
  return {ds:ds, trang:hsoTrang(ds, null, ten).replace('<head>', '<head><meta name="kt-hai-mat" content="0">')}; }
function pbKHTen(dsDL, mau){ var d = dsDL[0] || {}, M = PBKH_M[mau];
  if(mau==='09kh') return xuatTen('Bieu 09KH To trinh', (d.dv || {}).thuong || '', ngayISO(nay()));
  return xuatTen('Bieu '+M.ma.replace('/', ''), 'QD '+String(d.so || '').replace(/\//g, ' ')+' '+(dsDL.length>1 ? dsDL.length+' xa' : (d.dv || {}).thuong || ''), d.ngayQD || ''); }
