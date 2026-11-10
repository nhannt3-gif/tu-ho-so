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
GDX_MD.g4GioDi = ''; GDX_MD.g4GioBD = '07:30'; GDX_MD.g4GioKT = '11:00'; GDX_MD.g4GioVe = ''; GDX_MD.g4Km = {};   /* 3.510 giờ phiên cố định (⚙ khai báo riêng) · km đi – về theo điểm */
GDX_MD.g4Dong03 = '1|8'; GDX_MD.g4Sdt = ''; GDX_MD.g4NgayKho = 'cham';   /* mặc định khai báo riêng (gdxC tự điền khi thiếu) */
GDX_MD.g4Xe = ''; GDX_MD.g4CCHT = ''; GDX_MD.g4Noi = 'tu'; GDX_MD.g4CCDC = 'in'; GDX_MD.g4CoNV = 8.5;   /* 3.496: khai báo riêng 03/GDX · Nhiệm vụ (Tổ giao dịch: js/26c) */
GDX_MAU.push(
  {k:'g03', ma:'03/GDX', bt:'🚐', ten:'Bảng kê theo dõi giao dịch xã', nhom:'Tổ giao dịch', cap:'diem'},
  {k:'gnv', ma:'Nhiệm vụ', bt:'📘', ten:'Nhiệm vụ Tổ giao dịch (tóm tắt VB 4368 — 1 mặt A4)', nhom:'Tổ giao dịch', cap:'diem'},
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
  var to = {k:'g4to', ten:'👥 Tổ giao dịch — chọn từ danh sách cán bộ', nhanh:1};
  GDX_MUC.g03 = [dau, ngay, to, {k:'g4phien', ten:'💾 Phiên giao dịch — lưu theo điểm · xem lại theo tháng (liên kết 12/GDX)', nhanh:1},
    {k:'g4km', ten:'Km đi – về của điểm (thanh toán xăng)', nhanh:1}, {k:'g4gio', ten:'Giờ phiên giao dịch cố định (chấm công)', nhanh:0}, {k:'g4xe', ten:'Phương tiện · công cụ hỗ trợ (Phần I)', nhanh:0}, {k:'g4noi', ten:'Nơi đi / nơi đến (Phần I)', nhanh:0},
    {k:'g4ccdc', ten:'Công cụ dụng cụ theo vai (Phần II)', nhanh:0}, {k:'g4dong03', ten:'Số dòng Phần II (tờ 1 · tờ 2)', nhanh:0}];
  GDX_MUC.gnv = [dau, ngay, to, {k:'g4conv', ten:'Cỡ chữ', nhanh:0}];
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
  '.g4-cc{font-size:10pt;line-height:1.2}.g4-noi{white-space:normal;margin:.6mm 0;line-height:1.25}.g4-cat{border-top:.9px solid #000;margin:5mm 10mm 2mm}.g4-fl{display:flex;align-items:baseline;white-space:nowrap}.g4-fl>b{white-space:nowrap}'+
  '.g4-f{flex:1 1 0;min-width:6mm;margin:0 .8mm;overflow:hidden;white-space:nowrap;font-size:10.5pt;font-weight:300;letter-spacing:1.5px;color:#333}.g4-f::after{content:"'+new Array(160).join('…')+'"}.g4-f.f2{flex-grow:2}'+
  'table.g4-b{table-layout:fixed}table.g4-b tbody tr{height:7mm}table.g4-b.g4-03b tbody tr{height:15mm}table.g4-b.g4-03a tbody tr{height:8mm}table.g4-b.g4-11 tbody tr{height:8.5mm}table.g4-b.g4-kho tbody tr{height:9.5mm}table.g4-b.g4-10 tbody tr{height:5.4mm}.g4-10 td{padding:0 1.5mm;font-size:11pt}'+
  'table.g4-b td .g4-fl{margin:.6mm 0}'+
  '@media print{.sheet-a4.g4{padding:14mm 15mm 12mm 20mm !important}.sheet-a4.g4n{padding:10mm 12mm 8mm 14mm !important;width:100% !important}}';
var G4_CSS_NGANG = '@media print{@page{size:A4 landscape;margin:0}}';
function g4Dung(than, ngang){ return {than:than, css:GDX_CSS+G4_CSS+(ngang ? G4_CSS_NGANG : '')}; }

/* ---------- 03/GDX Bảng kê theo dõi giao dịch xã (A4 ngang, 2 tờ) ---------- */
function g4Dong03(c){ var a = String(c.g4Dong03 || '1|8').split('|'); return [Math.max(1, +a[0] || 1), Math.max(0, +a[1] || 0)]; }
function g4HTML03(X){
  var c = X.C, d = g4D(X), p = g4NgayP(c.m12NgayGD), n = g4Dong03(c).slice(), ngay = p ? p.day+'/'+p.month+'/'+p.year : g4Cham(14);
  var dau2 = '<thead><tr><th rowspan="3" style="width:9mm">Stt</th><th rowspan="3" style="width:42mm">Họ và tên</th><th colspan="2">Phân công</th><th colspan="5">Theo dõi giao - nhận công cụ dụng cụ, công cụ hỗ trợ</th></tr>'+
    '<tr><th rowspan="2" style="width:30mm">Nhiệm vụ</th><th rowspan="2" style="width:24mm">Ký tên</th><th rowspan="2">Công cụ dụng cụ,<br>Công cụ hỗ trợ</th><th colspan="2">Lượt đi</th><th colspan="2">Lượt về</th></tr>'+
    '<tr><th style="width:24mm">Người giao<br><i>(ký tên)</i></th><th style="width:24mm">Người nhận<br><i>(ký tên)</i></th><th style="width:24mm">Người giao<br><i>(ký tên)</i></th><th style="width:24mm">Người nhận<br><i>(ký tên)</i></th></tr></thead>';
  var cg = '<colgroup><col style="width:9mm"><col style="width:40mm"><col style="width:28mm"><col style="width:20mm"><col><col style="width:25mm"><col style="width:25mm"><col style="width:25mm"><col style="width:25mm"></colgroup>';
  var coTo = typeof g4AiTen==='function', nm = function(v){ return coTo ? g4AiTen(c, v).map(gdxE).join(', ') : ''; }, ds2 = coTo ? g4Dong03II(c) : [], ii = 0;   /* Tổ giao dịch: js/26c */
  var hang2 = function(o){ return o ? '<tr class="g4-trong"><td class="c">'+o.stt+'</td><td>'+gdxE(o.ten)+'</td><td class="c">'+o.nv+'</td><td></td><td class="g g4-cc">'+o.cc+'</td>'+g4Td(4)+'</tr>' : '<tr class="g4-trong">'+g4Td(9)+'</tr>'; };
  var dong2 = function(k){ var h = ''; for(var j=0;j<k;j++) h += hang2(ds2[ii++]); return '<tbody>'+h+'</tbody>'; };
  if(ds2.length > n[0]+n[1]) n = n[1] ? [n[0], ds2.length-n[0]] : [ds2.length, 0];
  var tu = c.g4Noi!=='cham', noiPGD = 'Trụ sở '+(c.tenPGDTrongVanBan || 'Phòng giao dịch NHCSXH'), noiDiem = d.tenDiem ? 'Điểm giao dịch '+d.tenDiem+(d.tenXa ? ' ('+d.tenXa+')' : '') : '';
  var noi = function(a, b){ return tu && b ? '<div class="g4-noi">Nơi đi: <i>'+gdxE(a)+'</i></div><div class="g4-noi">Nơi đến: <i>'+gdxE(b)+'</i></div>' : g4NoiDiDen(); };
  var t1 = '<div class="sheet-a4 g4 g4n">'+g4DauChu(c, '03/GDX')+'<div class="g4-tit">Bảng kê theo dõi giao dịch xã</div>'+
    '<div class="g4-dong"><div>Tên điểm giao dịch: '+g4O(d.tenDiem, 30)+'</div><div>Mã điểm giao dịch: '+g4O(d.maDiem, 16)+'</div></div>'+
    '<div class="g4-dong"><div>Tên xã: '+g4O(d.tenXa, 34)+'</div><div>Ngày giao dịch: '+(p ? '<b>'+ngay+'</b>' : ngay)+'</div></div>'+
    '<div class="g4-phan">PHẦN I. THEO DÕI VẬN CHUYỂN TIỀN ĐI GIAO DỊCH</div>'+
    '<table class="g4-b g4-03a"><colgroup><col style="width:9mm"><col style="width:40mm"><col style="width:24mm"><col style="width:20mm"><col style="width:44mm"><col><col><col><col></colgroup>'+
    '<thead><tr><th rowspan="2">Stt</th><th rowspan="2">Họ và tên</th><th colspan="2">Phân công</th><th rowspan="2">Phương tiện sử dụng,<br>Công cụ hỗ trợ</th><th rowspan="2" colspan="2">Lượt đi</th><th rowspan="2" colspan="2">Lượt về</th></tr>'+
    '<tr><th style="width:30mm">Nhiệm vụ</th><th style="width:24mm">Ký tên</th></tr></thead><tbody>'+
    '<tr><td class="c">1</td><td>'+nm('gdvc')+'</td><td class="c">Áp tải</td><td></td><td></td><td colspan="2" class="c g">&lt;Số tiền tạm ứng đầu ngày&gt;</td><td colspan="2" class="c g">&lt;Số tiền đóng phiên điều về&gt;</td></tr>'+
    '<tr><td class="c">2</td><td>'+nm('lx')+'</td><td class="c">Lái xe</td><td></td><td class="c g">'+(c.g4Xe ? gdxE(c.g4Xe) : '&lt;Phương tiện/ biển số…&gt;')+'</td><td colspan="2">'+noi(noiPGD, noiDiem)+'</td><td colspan="2">'+(tu && noiDiem ? noi(noiDiem, noiPGD) : g4NoiDiDen())+'</td></tr>'+
    '<tr><td class="c" rowspan="2">3</td><td rowspan="2">'+nm('bvd')+'</td><td class="c" rowspan="2">Bảo vệ</td><td rowspan="2"></td><td class="c g" rowspan="2">'+(c.g4CCHT ? gdxE(c.g4CCHT) : '&lt;Loại công cụ hỗ trợ/ số ký hiệu/ số giấy phép&gt;')+'</td>'+
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
  if(k==='g4to') return typeof g4ToHTML==='function' ? g4ToHTML() : '';   /* js/26c */
  if(k==='g4phien') return typeof g4PhienHTML==='function' ? g4PhienHTML() : '';   /* 3.510 js/26c */
  if(k==='g4gio') return '<div class="gdx-luoi">'+[['g4GioDi', 'Giờ đi (rời PGD)'], ['g4GioBD', 'Bắt đầu giao dịch'], ['g4GioKT', 'Kết thúc giao dịch'], ['g4GioVe', 'Giờ về (tới PGD)']].map(function(x){ return '<label><span>'+x[1]+'</span>'+gdxIn1(x[0], 'hh:mm', 'time')+'</label>'; }).join('')+'</div>'+
    '<small class="gdx-ghi">Giờ cố định của mọi phiên — lưu kèm mỗi phiên (chấm công giao dịch xã). Phiên đã lưu giữ giờ lúc lưu.</small>';   /* 3.510 anh 10/11 "khai báo riêng cho mẫu này để tùy biến, ví dụ giờ giao dịch của phiên là cố định" */
  if(k==='g4km'){ var dk = gdxDiem(C.m12SelectedDiem); return dk ?
    '<label class="gdx-hang">'+gdxE(dk.tenDiem)+': <input class="gdx-i gdx-so" inputmode="decimal" value="'+gdxE((C.g4Km || {})[dk.k] || '')+'" placeholder="km" data-lenh="g4.km" data-su="change" data-diem="'+gdxE(dk.k)+'"> km đi – về</label>'+
      '<small class="gdx-ghi">Nhớ theo điểm — khai 1 lần (thanh toán xăng, lệnh điều xe).</small>' : '<small class="gdx-ghi">Chọn điểm giao dịch trước.</small>'; }
  /* 3.511 (anh 10/11 "phần phương án bỏ, chưa cần"): bỏ mục Phương án đi đường PA 1/2/3 — kiêm Lái xe / Bảo vệ khai ở Tổ giao dịch */
  if(k==='g4xe') return '<div class="gdx-luoi"><label><span>Phương tiện / biển số</span>'+gdxIn1('g4Xe', 'vd Ô tô / 70A-xxx.xx — trống = mẫu gốc')+'</label><label><span>Công cụ hỗ trợ / số hiệu / số giấy phép</span>'+gdxIn1('g4CCHT', 'trống = mẫu gốc')+'</label></div>';
  if(k==='g4noi') return gdxRadio('g4Noi', [['tu', 'Tự ghi: trụ sở PGD ↔ điểm giao dịch'], ['cham', 'Để chấm ghi tay']]);
  if(k==='g4ccdc') return gdxRadio('g4CCDC', [['in', 'In sẵn CCDC theo vai (VB 4368)'], ['trong', 'Để trống ghi tay']]);
  if(k==='g4conv') return gdxRadio('g4CoNV', [[8.5, '8,5 pt — vừa 1 mặt A4'], [9, '9 pt'], [9.5, '9,5 pt']])+'<small class="gdx-ghi">Trên 8,5 pt có thể sang mặt 2.</small>';
  if(k==='g4dong03') return gdxRadio('g4Dong03', [['1|8', 'Như mẫu: tờ 1 có 1 dòng, tờ 2 có 8 dòng'], ['3|8', 'Tờ 1 có 3 dòng, tờ 2 có 8 dòng'], ['4|0', '1 tờ: 4 dòng']]);
  if(k==='g4sdt') return gdxIn1('g4Sdt', 'vd 0276 xxx xxx — trống = chấm ghi tay')+'<small class="gdx-ghi">In ở mục III.5: "… số điện thoại của Phòng giao dịch '+gdxE(String(C.tenPGDTrongVanBan || '').replace(/^Phòng giao dịch\s*/i, ''))+': …"</small>';
  if(k==='g4ngaykho') return gdxRadio('g4NgayKho', [['cham', 'Để chấm ghi tay'], ['hom', 'Hôm nay']])+(C.g4NgayKho==='hom' ? '<b class="gdx-hien">→ '+gdxDMY(gdxHom())+'</b>' : '');
  return '';
}
(function(){
  var dk = function(k, ma, ham, nhan, ngang, tom){ GDX_THEM[k] = {ngang:!!ngang, muc:g4Muc, nhan:function(){ return nhan; }, dung:function(X){ return g4Dung(ham(X), ngang); }, file:function(X){ return g4File(ma, X); }, tom:tom}; };
  var tomDiem = function(ba){ return function(X, lk, cb){ g4TomDiem(X, lk, cb); if(ba) g4TomBa(X, lk); }; };
  dk('g03', '03', g4HTML03, '03/GDX · A4 ngang · Phần I + Phần II', 1, function(X, lk, cb){ g4TomDiem(X, lk, cb); if(typeof g4TomTo==='function') g4TomTo(X, lk, cb); var n = g4Dong03(X.C); lk('g4dong03', 'Phần II: '+n[0]+(n[1] ? ' + '+n[1] : '')+' dòng'+(n[1] ? ' (2 tờ)' : ' (1 tờ)')); });
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
  GDX_THEM.gnv = {ngang:false, muc:g4Muc, nhan:function(C){ return 'Nhiệm vụ Tổ giao dịch · A4 dọc · 1 mặt · chữ '+String(+C.g4CoNV || 8.5).replace('.', ',')+' pt'; },
    dung:function(X){ return {than:g4HTMLNV(X), css:GDX_CSS+G4_CSS+g4NVCSS(+X.C.g4CoNV || 8.5)}; }, file:function(X){ return g4File('NhiemVuTo', X).replace('MauNhiemVuToGDX', 'NhiemVuToGD'); },
    tom:function(X, lk, cb){ g4TomDiem(X, lk, cb, false); if(typeof g4TomTo==='function') g4TomTo(X, lk, cb); var co = +X.C.g4CoNV || 8.5; lk('g4conv', 'chữ '+String(co).replace('.', ',')+' pt'); if(co > 8.5) cb('vang', 'Chữ '+String(co).replace('.', ',')+' pt có thể sang mặt 2 — 8,5 pt vừa 1 mặt A4.', 'g4conv'); }};
})();

/* ---------- 📘 NHIỆM VỤ TỔ GIAO DỊCH — 1 mặt A4 dọc (anh 07/11 "1 tờ chung bố trí gọn, đủ nhiệm vụ, chữ nhỏ") — tóm tắt VB 4368 mục II, III ---------- */
var G4NV_CHUNG = [
 'Tổ có <b>tối thiểu 03 cán bộ</b>: Tổ trưởng, Kiểm soát viên (KSV), Giao dịch viên (GDV — 01 người là <b>GDV chính</b>), Lái xe, Bảo vệ. Các thành viên <b>không có quan hệ gia đình</b>.',
 '<b>Tổ trưởng</b> là CBTD theo dõi địa bàn điểm GD, được ủy quyền ký thẻ tiết kiệm (02/GDX), <b>có thể kiêm KSV</b> — trừ khi Tổ trưởng làm bảo vệ tại điểm. <b>Không</b> bố trí CBTD làm GDV tại địa bàn mình theo dõi.',
 'Đi đường <b>tối thiểu 03 người</b>: <b>áp tải = GDV chính</b> · lái xe · bảo vệ (trong tổ hoặc lái xe NHCSXH, bảo vệ thuê, công an). Theo phương án bảo vệ 04/GDX.',
 'Làm việc độc lập, đúng nhiệm vụ; <b>không làm hộ, làm thay, sai vị trí</b>; mặc đồng phục, đeo thẻ, có bảng chức danh; camera ghi hình suốt phiên; mọi người <b>ký nhận trên Bảng kê 03/GDX</b>.'];
var G4NV_VAI = [
 ['Tổ trưởng', [
   'Nhận, kiểm tra: thiết bị kết nối mạng, camera, phao cứu sinh + túi ni lông (nếu có); chìa khóa hòm thư góp ý, 01 ổ khóa thùng tiền GDV chính.',
   'Triển khai phương án bảo vệ; ký 03/GDX.'],
  ['Bố trí vị trí làm việc; lắp camera, treo biển "Khu vực có camera giám sát"; triển khai bảo vệ tại điểm.',
   'Đôn đốc Hội, Tổ trưởng TK&VV hướng dẫn KH lập bảng kê tiền nộp; phổ biến 07/GDX trước giải ngân; GD tiền gửi tiết kiệm (PL01); tiếp nhận hồ sơ cho vay, xử lý nợ.',
   'Mở hòm thư góp ý trước giao ban; tổ chức họp giao ban; kiểm tra biển hiệu, bảng công khai.',
   'Kiểm quỹ: <b>trực tiếp kiểm đếm</b> tiền mặt, thẻ TK. Nhận biên lai không sử dụng, <b>trực tiếp kiểm đếm, tiêu hủy</b>. Xử lý phát sinh.'],
  ['Báo cáo GĐ kết quả phiên; trình TB kết luận 08/GDX (≤ 03 ngày làm việc).',
   'Bàn giao 03/GDX, 12/GDX cho kế toán; dữ liệu camera cho TP KH-TD; bàn giao CCDC, ký 03/GDX.']],
 ['Kiểm soát viên', [
   'Nhận, kiểm tra: máy tính xách tay (nếu không giao riêng), máy in, thiết bị khác; giấy in, kẹp ghim.',
   'Kiểm tra phần mềm Offline mới nhất, cập nhật dữ liệu đầu ngày, mở phiên GD; ký 03/GDX.'],
  ['Kiểm soát, phê duyệt GD trên hệ thống; in, ký kiểm soát chứng từ (PL01); ghi rõ lý do từ chối / chỉnh sửa.',
   'In, giao Tổ trưởng biểu mẫu công khai; in 13/GDX gửi Hội.',
   'Kiểm quỹ: nhập số tồn thực tế, in <b>10/GDX</b>; đối chiếu thẻ TK với 09/GDX. Ghi <b>12/GDX</b> khi tiêu hủy biên lai.',
   'Đóng phiên, xuất dữ liệu cuối ngày.'],
  ['Bàn giao file dữ liệu GD cho người cập nhật hệ thống; file sao lưu (.bak) cho TP KH-TD.',
   'Bàn giao CCDC, ký 03/GDX.']],
 ['GDV chính<br><small>(người áp tải)</small>', [
   'Nhận, kiểm tra: máy tính, thùng tiền / sổ sách, máy đếm tiền, máy phát hiện tiền giả, máy in; bảng kê nộp / lĩnh tiền, dây buộc tiền, dao, kéo, kẹp; photo thẻ lưu TK.',
   'Kiểm tra phần mềm Offline. Lập <b>06/GDX</b>, nhận tiền, thẻ TK tạm ứng; nhận hồ sơ giải ngân, <b>05/GDX</b>; ký 03/GDX.',
   '<b>Áp tải:</b> quản lý, giám sát thùng tiền, để đúng nơi quy định, giao nhận tiền an toàn.'],
  ['Làm nhiệm vụ GDV + nhận và chi trả tiền gửi tiết kiệm (PL01); quản lý thẻ tiết kiệm.',
   'Cuối phiên: đối chiếu tồn quỹ Nhật ký quỹ với tiền mặt thực tế, thẻ TK tồn với <b>09/GDX</b>; in Nhật ký quỹ, liệt kê GD, 09/GDX, 11/GDX (nếu có).',
   'Kiểm quỹ: <b>chứng kiến, không trực tiếp kiểm đếm</b>. Tập hợp, bàn giao biên lai không sử dụng cho Tổ trưởng; chứng kiến tiêu hủy.'],
  ['Điều chuyển tiền mặt, thẻ TK tồn về kho trung tâm trên hệ thống; nộp tiền, thẻ TK (cả thẻ hỏng) về quỹ.',
   'Bàn giao Nhật ký quỹ, liệt kê GD, hồ sơ chứng từ cho kế toán; bàn giao CCDC, ký 03/GDX.']],
 ['Giao dịch viên', [
   'Nhận, kiểm tra: máy tính, thùng tiền / sổ sách, máy đếm tiền, máy phát hiện tiền giả, máy in (nếu có); bảng kê nộp / lĩnh tiền, dây buộc tiền, dao, kéo, kẹp.',
   'Kiểm tra phần mềm Offline; ký 03/GDX.'],
  ['Tiếp nhận yêu cầu KH, tạo GD; thu, chi tiền mặt theo PL01; chịu trách nhiệm GD mình lập; bảo quản tiền, hồ sơ; dùng Nhật ký quỹ thay sổ quỹ.',
   'In, giao Tổ trưởng TK&VV bảng kê, biên lai; thu lại biên lai tháng trước (ghi 12/GDX).',
   'Cuối phiên: đối chiếu tồn quỹ, điều chuyển tiền về quỹ GDV chính; giao biên lai không sử dụng cho Tổ trưởng; in Nhật ký quỹ, liệt kê GD, bàn giao chứng từ cho GDV chính. Kiểm quỹ khi được phân công.'],
  ['Bàn giao CCDC, ký 03/GDX.']],
 ['Lái xe', [
   'Nhận phương tiện (ô tô có thiết bị chống cháy nổ, hòm tiền, camera hành trình); ký 03/GDX.'],
  ['Chịu trách nhiệm kỹ thuật phương tiện; <b>đi đúng cung đường</b> được giao (đổi sang cung đường dự phòng phải báo GĐ); chấp hành luật giao thông, quy định vận chuyển hàng đặc biệt; quản lý phương tiện suốt phiên.'],
  ['Bàn giao phương tiện; ký 03/GDX.']],
 ['Bảo vệ', [
   'Nhận, kiểm tra công cụ hỗ trợ (có giấy chứng nhận sử dụng); ký 03/GDX.',
   'Lưu số điện thoại lãnh đạo NHCSXH, UBND xã, công an xã.'],
  ['Đường đi, về: bảo vệ người, tiền, phương tiện — tài sản luôn trong tầm quan sát; phát hiện khả nghi báo ngay cho tổ.',
   'Tại điểm: phối hợp lực lượng bảo vệ UBND xã bố trí. Người bảo vệ tại điểm khác người đi đường thì nhận công cụ hỗ trợ, cuối phiên giao lại, ký 03/GDX.'],
  ['Bàn giao công cụ hỗ trợ cho bộ phận quản lý; ký 03/GDX.']]];;
var G4NV_MA = [['tt'], ['ksv'], ['gdvc'], ['gdv'], ['lx'], ['bvd', 'bvt']];
function g4NVCSS(co){ var t = function(d){ return (co+d)+'pt'; };
  return '.sheet-a4.gnv{padding:8mm 9mm 8mm 11mm;font-size:'+t(0)+';line-height:1.18}.gnv .nv-dau{display:flex;justify-content:space-between;font-size:'+t(.5)+'}.gnv .nv-cq{text-align:center}.gnv .nv-cq b{text-decoration:underline;text-underline-offset:1.5px}'+
    '.gnv h1{text-align:center;font-size:'+t(4)+';margin:1.5mm 0 .5mm}.gnv .nv-phu{text-align:center;font-style:italic;margin-bottom:1.5mm}.gnv .nv-chung{border:.8px solid #000;padding:1mm 2mm;margin-bottom:1.5mm}'+
    '.gnv table{width:100%;border-collapse:collapse;table-layout:fixed}.gnv td,.gnv th{border:.8px solid #000;vertical-align:top;padding:.6mm 1.2mm}.gnv th{font-size:'+t(.5)+'}'+
    '.gnv td.v{font-weight:bold;text-align:center;vertical-align:middle}.gnv td.v small{font-weight:normal;font-style:italic}.gnv .nv-ten{margin-top:1mm;font-weight:normal;font-size:'+t(-.5)+'}'+
    '.gnv ul{margin:0;padding-left:3.2mm}.gnv li{margin:0 0 .3mm}.gnv .nv-chan{font-size:'+t(-1)+';font-style:italic;margin-top:1mm}'+
    '@media print{.sheet-a4.g4.gnv{padding:8mm 9mm 8mm 11mm !important}}'; }
function g4HTMLNV(X){
  var c = X.C, d = g4D(X), p = g4NgayP(c.m12NgayGD), li = function(a){ return '<ul>'+a.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul>'; };
  var ten = function(i){ var t = []; G4NV_MA[i].forEach(function(v){ (typeof g4AiTen==='function' ? g4AiTen(c, v) : []).forEach(function(n){ if(t.indexOf(n)<0) t.push(n); }); });
    return '<div class="nv-ten">'+(t.length ? t.map(gdxE).join('<br>') : g4Cham(9)+'<br>'+g4Cham(9))+'</div>'; };
  return '<div class="sheet-a4 g4 gnv"><div class="nv-dau"><div class="nv-cq">'+gdxE(c.m12DonVi1 || '')+'<br><b>'+gdxE(c.m12DonVi2 || '')+'</b></div>'+
    '<div>Điểm GD: '+g4O(d.tenDiem, 8)+' · Ngày GD: '+(p ? '<b>'+p.day+'/'+p.month+'/'+p.year+'</b>' : g4Cham(8))+'</div></div>'+
    '<h1>NHIỆM VỤ TỔ GIAO DỊCH XÃ</h1><div class="nv-phu">(Tóm tắt theo văn bản số 4368/HD-NHCS ngày 29/9/2026, hiệu lực từ 01/10/2026)</div>'+
    '<div class="nv-chung"><b>Quy định chung</b>'+li(G4NV_CHUNG)+'</div>'+
    '<table><colgroup><col style="width:21mm"><col style="width:28%"><col><col style="width:22%"></colgroup><thead><tr><th>Vai trò<br><small>Họ tên</small></th><th>① Trước khi đi (tại trụ sở)</th><th>② Tại điểm giao dịch</th><th>③ Sau phiên (về trụ sở)</th></tr></thead><tbody>'+
    G4NV_VAI.map(function(v, i){ return '<tr><td class="v">'+v[0]+ten(i)+'</td><td>'+li(v[1])+'</td><td>'+li(v[2])+'</td><td>'+li(v[3])+'</td></tr>'; }).join('')+'</tbody></table>'+
    '<div class="nv-chan">PL01: Phụ lục 01 — quy trình giao dịch tại điểm giao dịch. Biểu mẫu: 03 Bảng kê theo dõi GDX · 05 DS khoản vay duyệt giải ngân · 06 Đề nghị tiếp quỹ · 07 Phổ biến KH vay · 08 TB kết luận giao ban · 09 Báo cáo thẻ TK · 10 Kiểm quỹ · 11 Thẻ TK hỏng, mất · 12 Biên lai · 13 Kết quả GD.</div></div>';
}
