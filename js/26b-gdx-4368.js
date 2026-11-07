/* ==========================================================
   3.493 (anh 07/11/2026 "các mẫu nào dựng nhanh đơn giản em cứ dựng theo đúng chuẩn gắn mẫu đã làm — mẫu 12 đã làm ổn rồi"):
   MẪU GIAO DỊCH XÃ THEO VB 4368/HD-NHCS (hiệu lực 01/10/2026, Phụ lục II) — tab 🏢 Giao dịch xã, gắn như 12/GDX:
     03/GDX Bảng kê theo dõi giao dịch xã (A4 ngang, 2 tờ) · 06/GDX Giấy đề nghị tiếp quỹ kiêm tạm ứng tiền và thẻ tiết kiệm
     07/GDX Nội dung phổ biến cho khách hàng vay vốn · 09/GDX Báo cáo thẻ tiết kiệm tại điểm GD (A4 ngang)
     10/GDX Bảng kê kiểm quỹ cuối phiên GD · 11/GDX Biên bản xác định thẻ tiết kiệm hỏng, mất · 14/GDX Phiếu xuất kho · 15/GDX Phiếu nhập kho
   - Bố cục, chữ, cột theo đúng mẫu in trong văn bản; số liệu không có thì để chấm / ô trống ghi tay (không tự tạo số).
   - DÙNG CHUNG với 12/GDX (cùng phiên giao dịch): đầu mẫu (2 dòng tên cơ quan), điểm GD (khối LỌC ĐỊA BÀN), ngày GD, GDV · KSV · Tổ trưởng tổ GD.
   - Cắm vào js/26 qua GDX_THEM (gdxChup / gdxDung / gdxMucHTML / gdxTom / tên file / thanh xem). Bỏ dòng <script> là mất các mẫu này, mẫu cũ không đổi.
   - Chưa làm (để sau, anh 07/11): 01, 02, 04, 05, 13/GDX; 08/GDX lấy bản chuẩn bên Giao ban.
   ========================================================== */
GDX_MD.g4Dong03 = '1|8'; GDX_MD.g4Sdt = ''; GDX_MD.g4NgayKho = 'cham';   /* mặc định khai báo riêng (gdxC tự điền khi thiếu) */
GDX_MAU.push(
  {k:'g03', ma:'03/GDX', bt:'🚐', ten:'Bảng kê theo dõi giao dịch xã', nhom:'Tổ giao dịch', cap:'diem'},
  {k:'g06', ma:'06/GDX', bt:'💼', ten:'Giấy đề nghị tiếp quỹ kiêm tạm ứng tiền và thẻ tiết kiệm', nhom:'Tổ giao dịch', cap:'diem'},
  {k:'g07', ma:'07/GDX', bt:'📣', ten:'Nội dung phổ biến cho khách hàng vay vốn', nhom:'Khách hàng', cap:'khong'},
  {k:'g09', ma:'09/GDX', bt:'📒', ten:'Báo cáo thẻ tiết kiệm tại điểm giao dịch', nhom:'Tổ giao dịch', cap:'diem'},
  {k:'g10', ma:'10/GDX', bt:'💰', ten:'Bảng kê kiểm quỹ cuối phiên giao dịch', nhom:'Tổ giao dịch', cap:'diem'},
  {k:'g11', ma:'11/GDX', bt:'📕', ten:'Biên bản xác định thẻ tiết kiệm hỏng, mất', nhom:'Tổ giao dịch', cap:'diem'},
  {k:'g14', ma:'14/GDX', bt:'📤', ten:'Phiếu xuất kho', nhom:'Ấn chỉ', cap:'khong'},
  {k:'g15', ma:'15/GDX', bt:'📥', ten:'Phiếu nhập kho', nhom:'Ấn chỉ', cap:'khong'});
(function(){
  var dau = {k:'dau12', ten:'Tên cơ quan đầu mẫu (chung với 12/GDX)', nhanh:0}, ngay = {k:'ngaygd', ten:'Ngày giao dịch (chung với 12/GDX)', nhanh:1},
    ba = {k:'ba', ten:'GDV · KSV · Tổ trưởng tổ GD (chung với 12/GDX)', nhanh:1};
  GDX_MUC.g03 = [dau, ngay, {k:'g4dong03', ten:'Số dòng Phần II (tờ 1 · tờ 2)', nhanh:0}];
  GDX_MUC.g06 = [dau, ngay, {k:'ba', ten:'Thủ quỹ / GDV (= Giao dịch viên của 12/GDX)', nhanh:1}];
  GDX_MUC.g07 = [{k:'g4sdt', ten:'Số điện thoại Phòng giao dịch (mục III.5)', nhanh:1}];
  GDX_MUC.g09 = [dau, ngay, ba];
  GDX_MUC.g10 = [dau, ngay, ba];
  GDX_MUC.g11 = [dau, ngay, ba];
  GDX_MUC.g14 = [dau, {k:'g4ngaykho', ten:'Ngày trên phiếu', nhanh:1}];
  GDX_MUC.g15 = GDX_MUC.g14;
})();

/* ---------- phần dùng chung ---------- */
var G4_CHAM = '<span class="dots-fine">………………</span>';
function g4Cham(n){ return '<span class="dots-fine">'+new Array((n||16)+1).join('…')+'</span>'; }
function g4F(lop){ return '<span class="g4-f'+(lop ? ' '+lop : '')+'"></span>'; }   /* chấm lấp đầy chỗ còn lại của dòng (không tràn, không xuống dòng) */
function g4L(x, lop){ return '<div class="g4-l g4-fl'+(lop ? ' '+lop : '')+'">'+x+'</div>'; }
function g4O(v, n){ v = String(v==null ? '' : v).trim(); return v ? '<b>'+gdxE(v)+'</b>' : g4Cham(n); }
function g4D(X){ return X.d || {tenDiem:'', maDiem:'', tenXa:'', to:[]}; }
function g4NgayP(iso){ return iso ? gdxNgay(iso) : null; }
function g4NgayCo(iso){ var p = g4NgayP(iso); return p ? 'Ngày '+p.day+' tháng '+p.month+' năm '+p.year : 'Ngày '+g4Cham(3)+' tháng '+g4Cham(3)+' năm '+g4Cham(4); }
function g4NgaySo(iso){ var p = g4NgayP(iso); return p ? 'Ngày '+p.day+'/'+p.month+'/'+p.year : 'Ngày '+g4Cham(3)+'/'+g4Cham(3)+'/'+g4Cham(3); }
function g4Mau(so){ return '<div class="g4-mauso">Mẫu số '+so+'</div>'; }
/* đầu mẫu kiểu 05/09/11/13/GDX: logo + 2 dòng cơ quan (dòng 2 đậm, gạch chân) */
function g4DauLogo(c, so){ var lg = gdxLogo();
  return '<div class="g4-dau">'+(lg ? '<img class="g4-logo" src="'+lg+'" alt="">' : '')+'<div class="g4-cq"><div>'+gdxE(c.m12DonVi1 || '')+'</div><div class="g4-cq2">'+gdxE(c.m12DonVi2 || '')+'</div></div>'+g4Mau(so)+'</div>'; }
/* đầu mẫu kiểu 03/10/12/GDX: 2 dòng cơ quan, không logo */
function g4DauChu(c, so){ return '<div class="g4-dau"><div class="g4-cq"><div>'+gdxE(c.m12DonVi1 || '')+'</div><div class="g4-cq2">'+gdxE(c.m12DonVi2 || '')+'</div></div>'+g4Mau(so)+'</div>'; }
/* đầu mẫu kiểu 06/14/15/GDX: NGÂN HÀNG / CHÍNH SÁCH XÃ HỘI · quốc hiệu, dòng chi nhánh / PGD, dòng ngày (tùy mẫu) */
function g4DauQH(c, so, ngayDong){
  return g4Mau(so)+'<table class="g4-qh"><tr><td class="g4-qh-t"><b>NGÂN HÀNG<br><span class="g4-gach">CHÍNH SÁCH XÃ HỘI</span></b></td>'+
    '<td class="g4-qh-p"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b class="g4-gach">Độc lập - Tự do - Hạnh phúc</b></td></tr>'+
    '<tr><td class="g4-qh-t g4-cn">'+gdxE(gdxTenPGD(c.donViDuoi) || 'CHI NHÁNH/PHÒNG GIAO DỊCH…')+'</td><td class="g4-qh-p g4-nd">'+(ngayDong || '')+'</td></tr></table>'; }
function g4Ky(ds, h){ return '<table class="g4-ky"><tr>'+ds.map(function(o){ return '<td><b>'+o[0]+'</b>'+(o[1]===false ? '' : '<div class="g4-kyhd">('+(o[1] || 'Ký, ghi rõ họ tên')+')</div>')+
  '<div style="height:'+(h || 22)+'mm"></div><b>'+gdxE(o[2] || '')+'</b></td>'; }).join('')+'</tr></table>'; }
function g4Ky3(c, h){ return g4Ky([['GIAO DỊCH VIÊN<br>CHÍNH', '', c.m12GDV], ['KIỂM SOÁT VIÊN/<br>GIAO DỊCH VIÊN', '', c.m12KSV], ['TỔ TRƯỞNG<br>TỔ GIAO DỊCH', '', c.m12ToTruong]], h); }
function g4File(ma, X){ var d = X.d; return 'Mau'+ma+'GDX_'+(d ? boDauTen(d.tenDiem).replace(/ /g, '')+'_' : '')+(X.C.m12NgayGD || gdxHom()); }
function g4TomDiem(X, lk, cb, canTen){ var C = X.C, d = X.d;
  if(canTen!==false){ lk('diem', d ? 'Điểm '+d.tenDiem : 'chưa chọn điểm', d ? '' : 'do'); if(!d) cb('do', 'Chưa chọn điểm giao dịch.', 'diem'); }
  lk('ngaygd', C.m12NgayGD ? 'ngày GD '+gdxDMY(C.m12NgayGD) : 'ngày GD: chấm', C.m12NgayGD ? '' : 'vang'); }
function g4TomBa(X, lk){ var C = X.C;
  lk('ba', 'GDV: '+(C.m12GDV || 'trống'), C.m12GDV ? '' : 'vang'); lk('ba', 'KSV: '+(C.m12KSV || 'trống'), C.m12KSV ? '' : 'vang'); lk('ba', 'TT tổ GD: '+(C.m12ToTruong || 'trống'), C.m12ToTruong ? '' : 'vang'); }
function g4Dong(n, o){ var r = ''; for(var i = 0; i < n; i++) r += '<tr class="g4-trong">'+o+'</tr>'; return r; }
function g4Td(n){ return new Array(n+1).join('<td></td>'); }

/* ---------- CSS chung các mẫu (thêm sau GDX_CSS; đường kẻ theo QUY_TAC_SOAN_MAU: chính ≤ 0,9 px đen, phụ mảnh xám) ---------- */
var G4_CSS = '.sheet-a4.g4{padding:14mm 15mm 12mm 20mm;font-size:13pt;line-height:1.3}.sheet-a4.g4n{width:297mm;min-height:210mm;padding:10mm 12mm 8mm 14mm;font-size:12pt}'+
  '.g4-mauso{text-align:right;font-size:11pt}.g4-dau{display:flex;align-items:flex-start;gap:3mm;margin-bottom:2mm}.g4-dau .g4-mauso{margin-left:auto}.g4-logo{height:13mm}'+
  '.g4-cq{text-align:center;font-size:11.5pt;line-height:1.25}.g4-cq2{font-weight:bold;text-decoration:underline;text-underline-offset:2px}'+
  '.g4-tit{text-align:center;font-weight:bold;font-size:14pt;margin:2mm 0 1mm;text-transform:uppercase}.g4-tit2{text-align:center;font-style:italic;margin-bottom:2mm}.g4-dv{text-align:right;font-style:italic;font-size:11pt}'+
  '.g4-dong{display:flex;justify-content:space-between;gap:6mm;margin:1mm 0}.g4-dong>div{white-space:nowrap}.g4-phan{font-weight:bold;margin:3mm 0 1.5mm}'+
  'table.g4-b{width:100%;border-collapse:collapse;font-size:11.5pt}table.g4-b th,table.g4-b td{border:.9px solid #000;padding:1mm 1.5mm;vertical-align:middle}'+
  'table.g4-b th{text-align:center;font-weight:bold}table.g4-b td.c{text-align:center}table.g4-b td.r{text-align:right}table.g4-b tbody tr.g4-trong td{border-top:.5px solid #888;border-bottom:.5px solid #888}'+
  'table.g4-b th i{font-weight:normal}table.g4-b td.g{font-style:italic}.g4-b tr.cong td{font-style:italic;font-weight:bold}.g4-b tr.tong td{font-weight:bold}'+
  'table.g4-ky{width:100%;border-collapse:collapse;margin-top:4mm;page-break-inside:avoid;break-inside:avoid}table.g4-ky td{border:0;text-align:center;vertical-align:top;font-size:12pt;padding:0 1mm}'+
  '.g4-kyhd{font-style:italic;font-size:10.5pt}table.g4-qh{width:100%;border-collapse:collapse}table.g4-qh td{border:0;vertical-align:top;padding:0}.g4-qh-t{width:42%;text-align:center;font-size:12.5pt}'+
  '.g4-qh-p{text-align:center;font-size:12.5pt}.g4-gach{text-decoration:underline;text-underline-offset:2px}.g4-cn{font-size:10.5pt;font-weight:bold;padding-top:2mm !important}.g4-nd{font-style:italic;padding-top:2mm !important}'+
  '.g4-p{text-align:justify;text-indent:10mm;margin:1.2mm 0}.g4-h{font-weight:bold;margin:2mm 0 1mm 10mm}.g4-l{margin:2.4mm 0 0 10mm}.g4-l2{margin:1.2mm 0 0 10mm}'+
  '.g4-ml0{margin-left:0 !important;margin-top:3mm !important}.g4-s10{font-size:12pt !important;padding-top:10mm !important;padding-bottom:6mm !important}.g4-s10 .g4-tit{margin:1mm 0 .5mm}.g4-s10 .g4-l2{margin:1.6mm 0 0 10mm}.g4-s10 .g4-ky{margin-top:2mm}'+
  '.g4-07{font-size:13pt !important;line-height:1.25 !important}.g4-07 .g4-p{margin:.9mm 0}.g4-07 .g4-h{margin:1.6mm 0 .6mm 10mm}.g4-mt8{margin-top:8mm !important}'+
  '.g4-cat{border-top:.9px solid #000;margin:5mm 10mm 2mm}.g4-fl{display:flex;align-items:baseline;white-space:nowrap}.g4-fl>b{white-space:nowrap}'+
  '.g4-f{flex:1 1 0;min-width:6mm;margin:0 .8mm;overflow:hidden;white-space:nowrap;font-size:10.5pt;font-weight:300;letter-spacing:1.5px;color:#333}.g4-f::after{content:"'+new Array(160).join('…')+'"}.g4-f.f2{flex-grow:2}'+
  'table.g4-b{table-layout:fixed}table.g4-b tbody tr{height:7mm}table.g4-b.g4-03b tbody tr{height:15mm}table.g4-b.g4-03a tbody tr{height:8mm}table.g4-b.g4-11 tbody tr{height:8.5mm}table.g4-b.g4-kho tbody tr{height:9.5mm}table.g4-b.g4-10 tbody tr{height:5.4mm}.g4-10 td{padding:0 1.5mm;font-size:11pt}'+
  'table.g4-b td .g4-fl{margin:.6mm 0}'+
  '@media print{.sheet-a4.g4{padding:14mm 15mm 12mm 20mm !important}.sheet-a4.g4n{padding:10mm 12mm 8mm 14mm !important;width:100% !important}}';
var G4_CSS_NGANG = '@media print{@page{size:A4 landscape;margin:0}}';
function g4Dung(than, ngang){ return {than:than, css:GDX_CSS+G4_CSS+(ngang ? G4_CSS_NGANG : '')}; }

/* ---------- 03/GDX Bảng kê theo dõi giao dịch xã (A4 ngang, 2 tờ) ---------- */
function g4Dong03(c){ var a = String(c.g4Dong03 || '1|8').split('|'); return [Math.max(1, +a[0] || 1), Math.max(0, +a[1] || 0)]; }
function g4HTML03(X){
  var c = X.C, d = g4D(X), p = g4NgayP(c.m12NgayGD), n = g4Dong03(c), ngay = p ? p.day+'/'+p.month+'/'+p.year : g4Cham(14);
  var dau2 = '<thead><tr><th rowspan="3" style="width:9mm">Stt</th><th rowspan="3" style="width:42mm">Họ và tên</th><th colspan="2">Phân công</th><th colspan="5">Theo dõi giao - nhận công cụ dụng cụ, công cụ hỗ trợ</th></tr>'+
    '<tr><th rowspan="2" style="width:30mm">Nhiệm vụ</th><th rowspan="2" style="width:24mm">Ký tên</th><th rowspan="2">Công cụ dụng cụ,<br>Công cụ hỗ trợ</th><th colspan="2">Lượt đi</th><th colspan="2">Lượt về</th></tr>'+
    '<tr><th style="width:24mm">Người giao<br><i>(ký tên)</i></th><th style="width:24mm">Người nhận<br><i>(ký tên)</i></th><th style="width:24mm">Người giao<br><i>(ký tên)</i></th><th style="width:24mm">Người nhận<br><i>(ký tên)</i></th></tr></thead>';
  var cg = '<colgroup><col style="width:9mm"><col style="width:40mm"><col style="width:28mm"><col style="width:20mm"><col><col style="width:25mm"><col style="width:25mm"><col style="width:25mm"><col style="width:25mm"></colgroup>';
  var dong2 = function(k){ return '<tbody>'+g4Dong(k, g4Td(9))+'</tbody>'; };
  var t1 = '<div class="sheet-a4 g4 g4n">'+g4DauChu(c, '03/GDX')+'<div class="g4-tit">Bảng kê theo dõi giao dịch xã</div>'+
    '<div class="g4-dong"><div>Tên điểm giao dịch: '+g4O(d.tenDiem, 30)+'</div><div>Mã điểm giao dịch: '+g4O(d.maDiem, 16)+'</div></div>'+
    '<div class="g4-dong"><div>Tên xã: '+g4O(d.tenXa, 34)+'</div><div>Ngày giao dịch: '+(p ? '<b>'+ngay+'</b>' : ngay)+'</div></div>'+
    '<div class="g4-phan">PHẦN I. THEO DÕI VẬN CHUYỂN TIỀN ĐI GIAO DỊCH</div>'+
    '<table class="g4-b g4-03a"><colgroup><col style="width:9mm"><col style="width:40mm"><col style="width:24mm"><col style="width:20mm"><col style="width:44mm"><col><col><col><col></colgroup>'+
    '<thead><tr><th rowspan="2">Stt</th><th rowspan="2">Họ và tên</th><th colspan="2">Phân công</th><th rowspan="2">Phương tiện sử dụng,<br>Công cụ hỗ trợ</th><th rowspan="2" colspan="2">Lượt đi</th><th rowspan="2" colspan="2">Lượt về</th></tr>'+
    '<tr><th style="width:30mm">Nhiệm vụ</th><th style="width:24mm">Ký tên</th></tr></thead><tbody>'+
    '<tr><td class="c">1</td><td></td><td class="c">Áp tải</td><td></td><td></td><td colspan="2" class="c g">&lt;Số tiền tạm ứng đầu ngày&gt;</td><td colspan="2" class="c g">&lt;Số tiền đóng phiên điều về&gt;</td></tr>'+
    '<tr><td class="c">2</td><td></td><td class="c">Lái xe</td><td></td><td class="c g">&lt;Phương tiện/ biển số…&gt;</td><td colspan="2">'+g4NoiDiDen()+'</td><td colspan="2">'+g4NoiDiDen()+'</td></tr>'+
    '<tr><td class="c" rowspan="2">3</td><td rowspan="2"></td><td class="c" rowspan="2">Bảo vệ</td><td rowspan="2"></td><td class="c g" rowspan="2">&lt;Loại công cụ hỗ trợ/ số ký hiệu/ số giấy phép&gt;</td>'+
    '<th>Người giao<br><i>(ký tên)</i></th><th>Người nhận<br><i>(ký tên)</i></th><th>Người giao<br><i>(ký tên)</i></th><th>Người nhận<br><i>(ký tên)</i></th></tr><tr style="height:12mm"><td></td><td></td><td></td><td></td></tr></tbody></table>'+
    '<div class="g4-phan">PHẦN II. PHÂN CÔNG TỔ GIAO DỊCH VÀ GIAO - NHẬN CÔNG CỤ DỤNG CỤ, CÔNG CỤ HỖ TRỢ</div><table class="g4-b g4-03b">'+cg+dau2+dong2(n[0])+'</table>'+(n[1] ? '' : g4Ky03())+'</div>';
  return t1+(n[1] ? '<div class="sheet-a4 g4 g4n"><table class="g4-b g4-03b">'+cg+dau2+dong2(n[1])+'</table>'+g4Ky03()+'</div>' : '');
}
function g4NoiDiDen(){ return g4L('Nơi đi: '+g4F())+g4L(g4F())+g4L(g4F())+g4L('Nơi đến: '+g4F())+g4L(g4F())+g4L(g4F()); }   /* như mẫu: mỗi nơi 1 dòng nhãn + 2 dòng chấm */
function g4Ky03(){ return g4Ky([['TRƯỞNG/PHÓ TRƯỞNG PHÒNG KH-TD/<br>TỔ TRƯỞNG TỔ KH-TD'], ['GIÁM ĐỐC']], 20); }

/* ---------- 06/GDX Giấy đề nghị tiếp quỹ kiêm tạm ứng tiền và thẻ tiết kiệm (A4 dọc) ---------- */
function g4HTML06(X){
  var c = X.C, p = g4NgayP(c.m12NgayGD), dd = gdxE(c.diaDanh || ''), b = function(nhan, v, sau){ return v ? '<div class="g4-l">'+nhan+'<b>'+gdxE(v)+'</b></div>' : g4L(nhan+g4F()+(sau || '')); }, bc = g4L('(Bằng chữ'+g4F()+')');
  var ngay = (dd || g4Cham(4))+', ngày '+(p ? p.day : g4Cham(2))+' tháng '+(p ? p.month : g4Cham(2))+' năm '+(p ? p.year : g4Cham(2));
  return '<div class="sheet-a4 g4">'+g4DauQH(c, '06/GDX', ngay)+
    '<div class="g4-tit" style="margin-top:10mm">Giấy đề nghị tiếp quỹ<br>kiêm tạm ứng tiền và thẻ tiết kiệm</div>'+
    '<div class="g4-l" style="margin-top:8mm;text-align:center">Kính gửi: Giám đốc '+(c.tenPGDTrongVanBan ? gdxE(c.tenPGDTrongVanBan) : 'chi nhánh/Phòng giao dịch NHCSXH'+g4Cham(10))+'</div>'+
    g4L('Thủ quỹ/GDV:&nbsp;'+(c.m12GDV ? '<b>'+gdxE(c.m12GDV)+'</b>' : g4F('f2'))+'; ID: '+g4F(), 'g4-mt8')+b('Đơn vị: ', c.tenPGDTrongVanBan)+
    '<div class="g4-l">Đề nghị Giám đốc phê duyệt cho tạm ứng, tiếp quỹ tiền mặt, tạm ứng thẻ tiết kiệm lần thứ (trong ngày): '+g4Cham(14)+'</div>'+
    b('Số tiền đề nghị tạm ứng, tiếp quỹ: ', '', 'đ')+bc+b('Số lượng thẻ tiết kiệm có kỳ hạn đề nghị tạm ứng: ')+bc+b('Số lượng thẻ tiết kiệm không kỳ hạn đề nghị tạm ứng: ')+bc+
    '<div style="height:8mm"></div>'+g4Ky([['NGƯỜI ĐỀ NGHỊ', '', c.m12GDV], ['TRƯỞNG/PHÓ TRƯỞNG<br>PHÒNG KẾ TOÁN'], ['GIÁM ĐỐC', 'Ký tên, đóng dấu']], 26)+'</div>';
}

/* ---------- 07/GDX Nội dung phổ biến cho khách hàng vay vốn (A4 dọc, chữ cố định) ---------- */
var G4_ND07 = [
  ['I. QUYỀN CỦA KHÁCH HÀNG', [
    'Yêu cầu NHCSXH thực hiện đúng các quy định cho vay và những thỏa thuận đã ghi trong Sổ vay vốn.',
    'Được cấp miễn phí hồ sơ vay vốn; không phải nộp cho NHCSXH bất kỳ khoản phí nào liên quan đến việc tiếp nhận, thẩm định và giải quyết hồ sơ vay vốn.',
    'Được trả nợ trước hạn mà không phải chịu phí phạt trả nợ trước hạn.',
    'Khiếu nại nếu NHCSXH vi phạm quy định cho vay và những thỏa thuận đã được ghi trong Sổ vay vốn/ Hợp đồng vay vốn.',
    'Được đề nghị NHCSXH xem xét điều chỉnh kỳ hạn trả nợ, gia hạn nợ, xử lý nợ rủi ro theo quy định của NHCSXH khi khách hàng gặp khó khăn về tài chính, bị rủi ro do nguyên nhân khách quan.']],
  ['II. NGHĨA VỤ CỦA KHÁCH HÀNG', [
    'Chấp hành đúng các quy định cho vay của NHCSXH và những thỏa thuận đã được ghi trong Sổ vay vốn/ Hợp đồng vay vốn.',
    'Cung cấp đầy đủ, trung thực thông tin, tài liệu liên quan đến việc vay vốn và chịu trách nhiệm về tính chính xác, hợp pháp của thông tin, tài liệu đã cung cấp.',
    'Sử dụng tiền vay đúng mục đích; không vay hộ, không cho người khác vay ké; trả nợ gốc, lãi đầy đủ, đúng hạn.',
    'Thực hiện trả nợ gốc trực tiếp cho NHCSXH tại điểm giao dịch hoặc trụ sở NHCSXH nơi cho vay; hoặc trả nợ gốc bằng chuyển khoản vào tài khoản của khách hàng mở tại NHCSXH.',
    'Chịu trách nhiệm trước pháp luật khi không thực hiện đúng các quy định cho vay của NHCSXH và những thỏa thuận đã được ghi trong Sổ vay vốn/Hợp đồng vay vốn.',
    'Chịu sự kiểm tra, giám sát của Ban quản lý Tổ TK&VV, tổ chức chính trị - xã hội nhận ủy thác, chính quyền địa phương, NHCSXH, cơ quan nhà nước có thẩm quyền.']],
  ['III. LƯU Ý ĐỐI VỚI KHÁCH HÀNG', [
    'Phải nhận và lưu giữ đầy đủ biên lai thu tiền (có chữ ký của Tổ trưởng) nếu nộp tiền lãi, tiền gửi tổ viên cho Tổ trưởng Tổ TK&VV.',
    'Không đưa tiền hoặc chuyển khoản tiền để nhờ Tổ trưởng Tổ TK&VV, cán bộ tổ chức chính trị - xã hội nhận ủy thác, cán bộ Ngân hàng trả nợ gốc thay.',
    'Trường hợp trả nợ gốc trực tiếp bằng tiền mặt, khách hàng chỉ nộp tiền cho giao dịch viên tại quầy giao dịch thuộc trụ sở ngân hàng hoặc điểm giao dịch, không nộp tiền tại các địa điểm khác; đồng thời, nhận và lưu giữ phiếu giao dịch thu tiền.',
    'Lưu giữ Sổ vay vốn; khi bị thất lạc Sổ thì thông báo Ngân hàng nơi cho vay xem xét cấp lại Sổ vay vốn mới.',
    '@SDT']]];
function g4HTML07(X){
  var c = X.C, sdt = String(c.g4Sdt || '').trim(), pgd = String(c.tenPGDTrongVanBan || '').replace(/^Phòng giao dịch\s*/i, '').trim();
  var cuoi = 'Nếu có phản ánh, kiến nghị, liên hệ theo số điện thoại của Phòng giao dịch '+(pgd ? gdxE(pgd)+': ' : '')+(sdt ? '<b>'+gdxE(sdt)+'</b>' : g4Cham(24));
  return '<div class="sheet-a4 g4 g4-07">'+g4Mau('07/GDX')+'<div class="g4-tit" style="margin-top:3mm">Nội dung</div><div style="text-align:center;font-weight:bold;margin-bottom:4mm"><span class="g4-gach">Phổ biến cho khách hàng vay vốn</span></div>'+
    G4_ND07.map(function(m){ return '<div class="g4-h">'+m[0]+'</div>'+m[1].map(function(x, i){ return '<div class="g4-p">'+(i+1)+'. '+(x==='@SDT' ? cuoi : gdxE(x))+'</div>'; }).join(''); }).join('')+'</div>';
}

/* ---------- 09/GDX Báo cáo thẻ tiết kiệm tại điểm giao dịch (A4 ngang) ---------- */
function g4HTML09(X){
  var c = X.C, d = g4D(X), nhom = function(i, ma, k){ return '<tr><td class="c">'+i+'</td><td>'+ma+'</td>'+g4Td(12)+'</tr>'+g4Dong(k, g4Td(14))+
    '<tr class="cong"><td></td><td></td><td colspan="2" class="c">Cộng</td><td></td><td colspan="2" class="c">Cộng</td><td></td><td colspan="2" class="c">Cộng</td><td></td><td colspan="2" class="c">Cộng</td><td></td></tr>'; };
  var ba = '<th style="width:21mm">Từ số Seri</th><th style="width:21mm">Đến số Seri</th><th style="width:15mm">Số lượng</th>';
  return '<div class="sheet-a4 g4 g4n">'+g4DauLogo(c, '09/GDX')+'<div class="g4-tit">Báo cáo thẻ tiết kiệm tại điểm giao dịch '+(d.tenDiem ? gdxE(d.tenDiem) : g4Cham(10))+'</div>'+
    '<div class="g4-tit2">'+g4NgayCo(c.m12NgayGD)+'</div>'+
    '<table class="g4-b"><colgroup><col style="width:8mm"><col style="width:33mm">'+new Array(13).join('<col>')+'</colgroup><thead><tr><th rowspan="3">Stt</th><th rowspan="3">Mã Thẻ tiết kiệm</th><th rowspan="2" colspan="3">Tạm ứng đầu ngày</th><th colspan="6">Sử dụng trong ngày</th><th rowspan="2" colspan="3">Tồn cuối ngày</th></tr>'+
    '<tr><th colspan="3">Khách hàng</th><th colspan="3">Mất/hỏng</th></tr><tr>'+ba+ba+ba+ba+'</tr></thead><tbody>'+
    nhom(1, 'PASSBOOKTIDE', 3)+nhom(2, 'PASSBOOKCASA', 2)+g4Dong(1, g4Td(14))+
    '<tr class="tong"><td></td><td>Tổng cộng</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>'+
    g4Ky3(c, 18)+'</div>';
}

/* ---------- 10/GDX Bảng kê kiểm quỹ cuối phiên giao dịch (A4 dọc) ---------- */
var G4_MENH = ['500.000', '200.000', '100.000', '50.000', '20.000', '10.000', '5.000', '2.000', '1.000', '500', '200', '100'];
function g4HTML10(X){
  var c = X.C, d = g4D(X), l = function(x){ return g4L(x, 'g4-l2'); };
  return '<div class="sheet-a4 g4 g4-s10">'+g4DauChu(c, '10/GDX')+'<div class="g4-tit">Bảng kê kiểm quỹ cuối phiên giao dịch</div><div class="g4-tit2" style="font-style:normal">'+g4NgaySo(c.m12NgayGD)+'</div>'+
    '<div class="g4-dong"><div>Điểm giao dịch: '+g4O(d.tenDiem, 22)+'</div><div>Mã điểm giao dịch: '+g4O(d.maDiem, 8)+'</div></div>'+
    '<table class="g4-b g4-10" style="margin-top:2mm"><thead><tr><th style="width:42mm">Loại tiền (VNĐ)</th><th style="width:30mm">Số tờ</th><th>Thành tiền</th></tr></thead><tbody>'+
    G4_MENH.map(function(m){ return '<tr class="g4-trong"><td class="c">'+m+'</td><td></td><td></td></tr>'; }).join('')+'<tr class="tong"><td class="c">Tổng số</td><td></td><td></td></tr></tbody></table>'+
    l('Tổng số tiền tồn quỹ thực tế: '+g4F())+l('<i>Bằng chữ:</i> '+g4F())+l('Tổng số tiền tồn quỹ trên sổ sách kế toán: '+g4F())+l('<i>Bằng chữ:</i> '+g4F())+
    l('Chênh lệch (bằng số): Thừa '+g4F()+' Thiếu '+g4F())+l('<i>Nguyên nhân chênh lệch:</i> '+g4F())+g4Ky3(c, 10)+
    '<div class="g4-cat"></div><div class="g4-tit" style="font-size:13pt">Điều chuyển tiền mặt về quỹ trung tâm</div><div class="g4-tit2" style="font-style:normal">Ngày '+g4Cham(3)+'/'+g4Cham(3)+'/'+g4Cham(4)+'</div>'+
    l('Số tiền bằng số: '+g4F())+l('<i>Bằng chữ:</i> '+g4F())+g4Ky([['NGƯỜI GIAO'], ['NGƯỜI NHẬN'], ['KIỂM SOÁT']], 12)+'</div>';
}

/* ---------- 11/GDX Biên bản xác định thẻ tiết kiệm hỏng, mất (A4 dọc) ---------- */
function g4HTML11(X){
  var c = X.C, d = g4D(X), nhom = function(i, tt, k){ return '<tr class="g4-trong"><td class="c">'+i+'</td><td class="c"><b>'+tt+'</b></td><td></td><td></td><td></td></tr>'+g4Dong(k-1, g4Td(5))+
    '<tr class="cong"><td></td><td></td><td>Cộng</td><td></td><td></td></tr>'; };
  return '<div class="sheet-a4 g4">'+g4DauLogo(c, '11/GDX')+'<div class="g4-tit">Biên bản xác định thẻ tiết kiệm hỏng, mất<br>tại điểm giao dịch '+(d.tenDiem ? gdxE(d.tenDiem) : g4Cham(10))+'</div>'+
    '<div class="g4-tit2">'+g4NgayCo(c.m12NgayGD)+'</div>'+
    '<table class="g4-b g4-11" style="font-size:12pt"><thead><tr><th style="width:12mm">Stt</th><th style="width:30mm">Tình trạng</th><th style="width:46mm">Mã ấn chỉ</th><th style="width:30mm">Số Seri</th><th>Nguyên nhân</th></tr></thead><tbody>'+
    nhom(1, 'Mất', 4)+nhom(2, 'Hỏng', 6)+g4Dong(1, g4Td(5))+'<tr class="tong"><td></td><td>Tổng cộng</td><td></td><td></td><td></td></tr></tbody></table>'+g4Ky3(c, 22)+'</div>';
}

/* ---------- 14/GDX Phiếu xuất kho · 15/GDX Phiếu nhập kho (A4 dọc) ---------- */
function g4HTMLKho(X, nhap){
  var c = X.C, iso = c.g4NgayKho==='hom' ? gdxHom() : '', p = g4NgayP(iso), cot8 = nhap ? 'TÌNH<br>TRẠNG' : 'GHI<br>CHÚ', l = function(x){ return g4L(x, 'g4-ml0'); };
  var dong = '<tr><td class="c">1</td>'+g4Td(7)+'</tr><tr><td class="c">2</td>'+g4Td(7)+'</tr><tr><td class="c">…</td>'+g4Td(7)+'</tr>'+g4Dong(3, g4Td(8));
  return '<div class="sheet-a4 g4">'+g4DauQH(c, nhap ? '15/GDX' : '14/GDX', '')+'<div class="g4-tit" style="margin-top:8mm">'+(nhap ? 'Phiếu nhập kho' : 'Phiếu xuất kho')+'</div>'+
    '<div class="g4-tit2">Ngày'+(p ? ' '+p.day+' tháng '+p.month+' năm '+p.year : g4Cham(3)+' tháng'+g4Cham(3)+' năm'+g4Cham(3))+'</div><div style="height:4mm"></div>'+
    l('Họ tên người giao: '+g4F('f2')+' Chức vụ: '+g4F())+l('Họ tên người nhận: '+g4F('f2')+' Chức vụ: '+g4F())+l('Địa điểm giao nhận: '+g4F())+
    '<table class="g4-b g4-kho" style="margin-top:3mm;font-size:11pt"><thead><tr><th style="width:12mm">STT</th><th style="width:34mm">LOẠI ẤN CHỈ</th><th>TỪ SỐ<br>SERI</th><th>ĐẾN SỐ<br>SERI</th><th>SỐ<br>LƯỢNG</th><th>ĐƠN<br>GIÁ</th><th>THÀNH<br>TIỀN</th><th>'+cot8+'</th></tr></thead>'+
    '<tbody>'+dong+'<tr class="tong" style="height:9mm"><td></td><td>TỔNG CỘNG</td>'+g4Td(6)+'</tr></tbody></table>'+
    g4Ky([['Lập phiếu', false], [nhap ? 'Người giao' : 'Người nhận', false], ['Thủ kho', false], ['Kiểm soát', false], ['Giám đốc', false]], 24)+'</div>';
}

/* ---------- khai báo riêng của mẫu (ngoài mục chung với 12/GDX) ---------- */
function g4Muc(k){
  var C = gdxC();
  if(k==='g4dong03') return gdxRadio('g4Dong03', [['1|8', 'Như mẫu: tờ 1 có 1 dòng, tờ 2 có 8 dòng'], ['3|8', 'Tờ 1 có 3 dòng, tờ 2 có 8 dòng'], ['4|0', '1 tờ: 4 dòng']]);
  if(k==='g4sdt') return gdxIn1('g4Sdt', 'vd 0276 xxx xxx — trống = chấm ghi tay')+'<small class="gdx-ghi">In ở mục III.5: "… số điện thoại của Phòng giao dịch '+gdxE(String(C.tenPGDTrongVanBan || '').replace(/^Phòng giao dịch\s*/i, ''))+': …"</small>';
  if(k==='g4ngaykho') return gdxRadio('g4NgayKho', [['cham', 'Để chấm ghi tay'], ['hom', 'Hôm nay']])+(C.g4NgayKho==='hom' ? '<b class="gdx-hien">→ '+gdxDMY(gdxHom())+'</b>' : '');
  return '';
}
(function(){
  var dk = function(k, ma, ham, nhan, ngang, tom){ GDX_THEM[k] = {ngang:!!ngang, muc:g4Muc, nhan:function(){ return nhan; }, dung:function(X){ return g4Dung(ham(X), ngang); }, file:function(X){ return g4File(ma, X); }, tom:tom}; };
  var tomDiem = function(ba){ return function(X, lk, cb){ g4TomDiem(X, lk, cb); if(ba) g4TomBa(X, lk); }; };
  dk('g03', '03', g4HTML03, '03/GDX · A4 ngang · Phần I + Phần II', 1, function(X, lk, cb){ g4TomDiem(X, lk, cb); var n = g4Dong03(X.C); lk('g4dong03', 'Phần II: '+n[0]+(n[1] ? ' + '+n[1] : '')+' dòng'+(n[1] ? ' (2 tờ)' : ' (1 tờ)')); });
  dk('g06', '06', g4HTML06, '06/GDX · A4 dọc · 1 trang', 0, function(X, lk){ g4TomDiem(X, lk, null, false); lk('ba', 'Thủ quỹ/GDV: '+(X.C.m12GDV || 'chấm'), X.C.m12GDV ? '' : 'vang'); });
  dk('g07', '07', g4HTML07, '07/GDX · A4 dọc · 1 trang', 0, function(X, lk, cb){ lk('g4sdt', X.C.g4Sdt ? 'SĐT PGD: '+X.C.g4Sdt : 'SĐT PGD: chấm', X.C.g4Sdt ? '' : 'vang'); if(!X.C.g4Sdt) cb('vang', 'Chưa khai số điện thoại Phòng giao dịch (mục III.5) — để chấm.', 'g4sdt'); });
  dk('g09', '09', g4HTML09, '09/GDX · A4 ngang · 1 trang', 1, tomDiem(1));
  dk('g10', '10', g4HTML10, '10/GDX · A4 dọc · 1 trang', 0, tomDiem(1));
  dk('g11', '11', g4HTML11, '11/GDX · A4 dọc · 1 trang', 0, tomDiem(1));
  var tomKho = function(X, lk){ lk('g4ngaykho', X.C.g4NgayKho==='hom' ? 'ngày '+gdxDMY(gdxHom()) : 'ngày: chấm'); };
  dk('g14', '14', function(X){ return g4HTMLKho(X, false); }, '14/GDX · A4 dọc · 1 trang', 0, tomKho);
  dk('g15', '15', function(X){ return g4HTMLKho(X, true); }, '15/GDX · A4 dọc · 1 trang', 0, tomKho);
  GDX_THEM.g14.file = function(){ return 'Mau14GDX_PhieuXuatKho_'+gdxHom(); }; GDX_THEM.g15.file = function(){ return 'Mau15GDX_PhieuNhapKho_'+gdxHom(); };
  GDX_THEM.g07.file = function(){ return 'Mau07GDX_NoiDungPhoBien'; };
})();
