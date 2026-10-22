/* ==========================================================
   3.312 (anh 22/10/2026 gửi bản scan Giấy nộp tiền NHCSXH — "tạo mẫu tương tự Giấy lĩnh tiền kèm bảng kê nộp"):
   🏦 GIẤY NỘP TIỀN (nộp để ghi vào tài khoản) + 🧾 BẢNG KÊ CÁC LOẠI TIỀN NỘP — tab Giao dịch xã, cùng cách Giấy lĩnh tiền:
   - chung ô chọn người · tài khoản (TK 105 khách / TK 104 tổ trưởng) · số tiền, ngày, khổ giấy của 💵 Giấy lĩnh;
   - in 🏦 Nộp · 🧾 Bảng kê (A4 ngang 1 tờ, tự chia mệnh giá) · 🏦+🧾 (1 tờ A4 dọc: Giấy nộp nửa trên + Bảng kê dưới);
   - dòng có thông tin bỏ chấm, trống giữ chấm ghi tay; 📄 Mẫu trắng in đúng form.
   Bố cục dựng theo bản scan (khung, chữ, vị trí); in mực đen trên giấy trắng.
   ========================================================== */
GDX_MUC.gn = [
  {k:'gncn', ten:'Chi nhánh (dưới tên Ngân hàng)', nhanh:0},
  {k:'glngay', ten:'Ngày nộp', nhanh:1},
  {k:'gnso', ten:'Số · Loại tiền tệ · Loại N.V', nhanh:0},
  {k:'glphieu', ten:'Người nộp · tài khoản Có · số tiền', nhanh:1},
  {k:'gnnhan', ten:'Người nhận', nhanh:1},
  {k:'gnnd', ten:'Nội dung nộp', nhanh:1},
  {k:'gnkho', ten:'Khổ giấy', nhanh:1}];
function gdxGNND(c){ c = c || gdxC(); return c.gnND==null || c.gnND==='' ? (c.glLoai==='104' ? 'Nộp tiền vào tài khoản 104' : 'Gửi tiết kiệm') : c.gnND; }
function gdxGNMuc(k){
  var C = gdxC(), h = '';
  if(C.gnNhan==null || C.gnNhan==='') C.gnNhan = 'nop'; if(!C.gnKho) C.gnKho = 'a5';   /* mặc định hiện sẵn trên ô chọn */
  if(k==='gncn') h = gdxIn1('gnCN', 'vd Tây Ninh — trống = chấm');
  else if(k==='gnso') h = '<div class="gdx-luoi"><label><span>Số</span>'+gdxIn1('gnSo', 'trống = chấm')+'</label><label><span>Loại tiền tệ</span>'+gdxIn1('gnTT', 'VND')+'</label><label><span>Loại N.V</span>'+gdxIn1('gnNV', 'trống = chấm')+'</label></div>';
  else if(k==='gnnhan') h = gdxRadio('gnNhan', [['nop','Chính người nộp (gửi vào TK của mình)'], ['cham','Để chấm ghi tay']]);
  else if(k==='gnnd') h = gdxIn1('gnND', gdxGNND(Object.assign({}, C, {gnND:''})))+'<small class="gdx-ghi">Dòng đầu bảng "Nội dung nộp" — số tiền ghi cùng dòng; 3 dòng dưới để ghi tay.</small>';
  else if(k==='gnkho') h = gdxRadio('gnKho', [['a5','A5 ngang'], ['a4','A4 dọc · in nửa trên']]);
  return h;
}
/* 1 tờ Giấy nộp — g = dữ liệu người nộp (gdxGLDuLieu), trang = mẫu trắng */
function gdxGNTrang(g, c, trang){
  g = trang ? {} : (g || {}); c = c || gdxC();
  var kb = function(k, md){ return trang ? '' : (c[k]==null || c[k]==='' ? (md||'') : c[k]); };
  var tien = g.tien ? gdxTien(g.tien) : '', chu = g.tien ? gdxDocTien(g.tien) : '', nhan = !trang && c.gnNhan!=='cham';
  var r = function(nhan, gt, lop){ return '<div class="gl-r'+(lop ? ' '+lop : '')+'"><span class="gl-n">'+nhan+'</span>'+gt+'</div>'; };
  var p = String(g.ngay||'').split('-'), o = function(v, w){ return v ? '<span class="gl-vn">'+v+'</span>' : '<span class="gl-cn" style="width:'+w+'"></span>'; };
  var dong = function(nd, so){ return '<tr><td>'+(nd ? '<span class="gn-nd">'+gdxE(nd)+'</span>' : '')+'</td><td class="gn-so">'+(so || '')+'</td></tr>'; };
  return '<div class="gl-trang gn-trang">'+
    '<div class="gn-dau"><div class="gn-nh"><div>NGÂN HÀNG</div><div>CHÍNH SÁCH XÃ HỘI</div>'+r('<i>Chi nhánh:</i>', gdxGLO(kb('gnCN')), 'gn-cn')+'</div>'+
      '<div class="gn-giua"><div class="gn-tit">GIẤY NỘP TIỀN</div><div class="gn-tit2">NỘP ĐỂ GHI VÀO TÀI KHOẢN</div>'+
        '<div class="gn-ngay">Ngày '+o(p[2], '9mm')+' tháng '+o(p[1], '11mm')+' năm '+(p[0] ? '<span class="gl-vn">'+p[0]+'</span>' : '20'+o('', '8mm'))+'</div>'+
        r('<i>Loại tiền tệ:</i>', gdxGLO(kb('gnTT', 'VND')), 'gn-tt')+'</div>'+
      '<div class="gn-so-dau">'+r('Số:', gdxGLO(kb('gnSo')))+'</div></div>'+
    '<div class="gn-than"><div class="gn-trai">'+
      r('<i>Người nộp:</i>', gdxGLO(g.ten, 'gl-dam'))+r('<i>Địa chỉ:</i>', gdxGLO(g.diaChi))+
      r('<i>Người nhận:</i>', gdxGLO(nhan ? g.ten : '', 'gl-dam'))+r('<i>Địa chỉ:</i>', gdxGLO(nhan ? g.diaChi : ''))+
    '</div><div class="gn-phai">'+r('Loại N.V:', gdxGLO(kb('gnNV')))+r('Tài khoản <span class="gn-co">CÓ</span>', gdxGLO(g.tk, 'gl-dam'))+'<div class="gl-r"></div>'+r('Số:', gdxGLO(''))+'</div></div>'+
    '<table class="gn-bang"><colgroup><col><col style="width:47mm"></colgroup><thead><tr><th><b>NỘI DUNG NỘP</b><i>(Khi nộp tiền phải ghi chi tiết từng khoản)</i></th><th><b>SỐ TIỀN</b></th></tr></thead><tbody>'+
      dong(trang ? '' : kb('gnND', gdxGNND(c)), tien)+dong('', '')+dong('', '')+dong('', '')+
      '<tr class="gn-tong"><td><div class="gl-r"><span class="gl-n"><i>Tổng số tiền bằng chữ:</i></span>'+(chu ? '<span class="gl-v gl-bc1 gn-chu">'+gdxE(chu)+'</span>' : gdxGLO(''))+'<span class="gl-n gn-cong"><i>Cộng:</i></span></div></td><td class="gn-so"><b>'+tien+'</b></td></tr>'+
    '</tbody></table>'+
    '<div class="gn-ky"><div>Người nộp tiền</div><div>Thủ quỹ</div><div>Sổ phụ</div><div>Kiểm soát</div><div>Giám đốc Ngân hàng</div></div>'+
  '</div>';
}
function gdxHTMLGN(g, c){
  c = c || gdxC(); var kho = c.gnKho;
  if(kho==='a4x2') return '<div class="sheet-gl gl-a4 gl-x2">'+gdxGNTrang(g, c, c.glTrang)+'<div class="gl-cat"></div>'+gdxGNTrang(g, c, c.glTrang)+'</div>';
  if(kho==='a4bk') return '<div class="sheet-gl gl-a4 gl-kem">'+gdxGNTrang(g, c, c.glTrang)+'<div class="gl-bkk">'+gdxBKTrang(c, c.glTrang ? null : g, true)+'</div><div class="gl-cat-n"></div></div>'+GL_JS;
  return '<div class="sheet-gl'+(kho==='a4' ? ' gl-a4' : '')+'">'+gdxGNTrang(g, c, c.glTrang)+'</div>';
}
function gdxDungGN(X){
  var c = X.C;
  if(X.bk) return {than:gdxHTMLBKDL(X.gl, c, true), css:BK_CSS};
  if(X.kh){ c = JSON.parse(JSON.stringify(c)); c.gnKho = 'a4bk'; }
  return {than:gdxHTMLGN(X.gl, c), css:GL_CSS+GN_CSS+(c.gnKho==='a4bk' ? GL_CSS_A4+BK_CSS_LOI+BK_CSS_TO+GL_CSS_KEM : c.gnKho==='a4' || c.gnKho==='a4x2' ? GL_CSS_A4 : GL_CSS_A5)};
}
/* 📄 Mẫu trắng: n = 1 (1 mẫu / A4 nửa trên) · 2 (2 mẫu / A4 cắt đôi) · 3 (Giấy nộp + Bảng kê nộp 1 tờ A4) */
function gdxGNTrangIn(n){ var c = JSON.parse(JSON.stringify(gdxC())); c.gnKho = n===3 ? 'a4bk' : n===2 ? 'a4x2' : 'a4'; c.glTrang = true; gdxInBan({mau:'gn', C:c, gl:{}}); }
function gdxGNNutIn(){
  var C = gdxC();
  return '<span class="gdx-seg">'+gdxChip('🏦 Nộp', C.gnIn!=='bk' && C.gnIn!=='kh', 'gdxDat(\'gnIn\', \'gn\', 1)', '', 'Chỉ in Giấy nộp tiền (khổ theo ⚙ Khổ giấy)')+
    gdxChip('🧾 Bảng kê', C.gnIn==='bk', 'gdxDat(\'gnIn\', \'bk\', 1)', '', 'Chỉ in Bảng kê các loại tiền nộp — A4 ngang, tự chia mệnh giá')+
    gdxChip('🏦+🧾', C.gnIn==='kh', 'gdxDat(\'gnIn\', \'kh\', 1)', '', 'Giấy nộp + Bảng kê nộp chung 1 tờ A4 dọc — cùng số tiền')+'</span>'+
    gdxMenu((function(d){ d.nhan = '📄 Mẫu trắng'; return d; })([['🏦 Giấy nộp · 1 mẫu / A4 (nửa trên)', 'gdxGNTrangIn(1)', 'Giấy nộp trắng đúng form'], ['🏦 Giấy nộp · 2 mẫu / A4 (cắt đôi)', 'gdxGNTrangIn(2)', 'Cắt đôi theo vạch giữa'],
      ['🏦+🧾 Giấy nộp + Bảng kê nộp · 1 tờ A4 dọc', 'gdxGNTrangIn(3)', 'Giấy nộp nửa trên + Bảng kê nộp dưới — giấy trắng']]), 'len');
}
function gdxGNTom(X, lk, cb){
  var C = gdxC(), g = X.gl || {};
  lk('glphieu', C.glLoai==='104' ? 'TK 104 tổ trưởng' : 'TK 105 khách');
  lk('glphieu', g.ten || 'chưa chọn người nộp', g.ten ? '' : 'do');
  lk('glphieu', 'TK '+(g.tk || 'chấm'), g.tk ? '' : 'vang');
  lk('glphieu', g.tien ? gdxTien(g.tien)+' đ' : 'số tiền: chấm', g.tien ? '' : 'vang');
  lk('glngay', g.ngay ? 'ngày '+gdxDMY(g.ngay) : 'ngày: chấm'); lk('gnkho', C.gnKho==='a4' ? 'A4 nửa trang' : 'A5');
  if(!g.ten) cb('do', 'Chưa chọn người nộp — tìm tên hoặc chọn tổ ở khối LỌC ĐỊA BÀN.', 'glphieu');
  if(g.ten && !g.tk) cb('vang', 'Chưa có số tài khoản'+(C.glLoai==='104' ? ' 104' : ' 105')+(g.tkLy ? ' ('+g.tkLy+')' : '')+' — để chấm.', 'glphieu');
  if(g.tkTrung) cb('vang', (C.glLoai==='104' ? 'Tổ trưởng' : 'Khách')+' có '+g.tkDs.length+' TK '+(C.glLoai==='104' ? '104' : '105')+' — chọn TK đang dùng (ô TK ở form).', 'glphieu');
}
var GN_CSS = '.gn-trang{padding:9mm 11mm 5mm 13mm;font-size:12.5pt;line-height:1.25}'+
  '.gn-dau{display:grid;grid-template-columns:58mm 1fr 42mm;align-items:start;margin-bottom:3mm}'+
  '.gn-nh{text-align:center;font-weight:bold;font-size:12pt;line-height:1.2}.gn-nh .gn-cn{margin-top:1.5mm;font-weight:normal;text-align:left}'+
  '.gn-giua{text-align:center}.gn-tit{font-weight:bold;font-size:19pt;letter-spacing:.3px;line-height:1.1}.gn-tit2{font-weight:bold;font-size:8.5pt;margin-top:.5mm}'+
  '.gn-ngay{font-size:11.5pt;margin-top:1.5mm}.gn-giua .gn-tt{margin:0 4mm 0 10mm;min-height:6.5mm}.gn-giua .gn-tt .gl-v{flex:0 1 auto}.gn-giua .gn-tt .gl-c{max-width:30mm}.gn-so-dau{padding-left:6mm}'+
  '.gn-than{display:grid;grid-template-columns:1fr 64mm;gap:5mm}.gn-trai .gl-r,.gn-phai .gl-r{min-height:6.8mm}.gn-co{margin-left:3mm}'+
  '.gn-bang{width:100%;border-collapse:collapse;margin-top:1.5mm}.gn-bang th,.gn-bang td{border:.8px solid #000;padding:0 1.5mm}'+
  '.gn-bang th{font-weight:normal;text-align:center;line-height:1.15;padding:1mm}.gn-bang th b{display:block}.gn-bang th i{display:block;font-size:10.5pt}'+
  '.gn-bang tbody td{height:6.6mm;border-top:.6px dotted #555;border-bottom:.6px dotted #555}.gn-bang tbody tr:first-child td{border-top:.8px solid #000}'+
  '.gn-so{text-align:right;font-weight:bold;white-space:nowrap}.gn-nd{font-style:italic}.gn-tong td{border-top:.8px solid #000 !important;border-bottom:.8px solid #000 !important}'+
  '.gn-tong .gl-r{min-height:6.6mm}.gn-chu{font-style:italic}.gn-cong{margin-left:2mm}'+
  '.gn-ky{display:grid;grid-template-columns:1.1fr .9fr .9fr 1fr 1.3fr;text-align:center;font-weight:bold;font-size:11.5pt;margin-top:2mm;flex:1;min-height:20mm}';
