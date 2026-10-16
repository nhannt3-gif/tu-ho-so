/* ===== 3.222 (anh 16/10/2026, phương án B): ⚙ KHAI BÁO ĐƠN VỊ — 1 cửa sổ dùng chung mọi tab =====
   - Mở từ nút "⚙ Khai báo đơn vị" ở Hồ sơ Tổ / Hồ sơ vay / Giao dịch xã (hsoKBHop, gdxKBChung → cùng cửa sổ).
   - Tab: 🏦 PGD · logo · tên đơn vị trên từng mẫu · 👤 Cán bộ · 🤝 Hội · 🏘 Trưởng ấp · 👥 Tổ phó · 📋 Chương trình vay · 🏦 TK 104 / 105.
   - Dữ liệu GIỮ NGUYÊN CHỖ LƯU cũ (D.cauHinh.hsoKB, gdx, ktHoiKB…) → không phải chuyển, bản in mẫu khóa (Giao dịch xã, KTGS) không đổi.
   - Khai báo Hội vẫn sửa ở KTGS (gói riêng, mẫu khóa) — ở đây xem danh sách + nút sang KTGS.
   - Xuất / nhập khai báo ra file (bổ sung 4): anh hẹn làm sau khi bản này ổn. */

/* tên đơn vị in trên các mẫu Giao dịch xã — cùng khóa gdxC() (sửa ở đây = sửa ở khai báo riêng của mẫu) */
var KB_TEN_GDX = [['04/TD Thông báo', [['donViTren', 'Tên NH cấp trên'], ['donViDuoi', 'Phòng giao dịch'], ['tenPGDTrongVanBan', 'Tên PGD trong văn bản'], ['diaDanh', 'Địa danh ("…, ngày")']]],
  ['12/GDX Bảng kê biên lai', [['m12DonVi1', 'Đơn vị dòng 1'], ['m12DonVi2', 'Đơn vị dòng 2']]],
  ['💵 Giấy lĩnh', [['glPGD', 'Tên PGD (dòng đầu, trống = chấm)']]],
  ['🧾 Bảng kê', [['bkCQ1', 'Cơ quan dòng 1'], ['bkCQ2', 'Cơ quan dòng 2'], ['bkPGD', 'Phòng giao dịch (trống = chấm)']]]];
function kbTenGDXHTML(){
  if(typeof gdxC!=='function') return '';
  var C = gdxC();
  return '<div class="hso-kb-nhom"><b>🏷 Tên đơn vị in trên từng mẫu Giao dịch xã</b> <small>(mỗi mẫu ghi theo đúng mẫu giấy — sửa ở đây hoặc ở khai báo riêng của mẫu, cùng 1 chỗ lưu)</small>'+
    KB_TEN_GDX.map(function(g){ return '<div class="kb-tenm"><i>'+coChuHTML(g[0])+'</i><div class="hso-kb-luoi">'+g[1].map(function(x){
      return '<label class="kt-kb"><span>'+coChuHTML(x[1])+'</span><input value="'+coChuHTML(C[x[0]]==null ? '' : C[x[0]])+'" oninput="gdxC()[\''+x[0]+'\']=this.value;luu()"></label>'; }).join('')+'</div></div>'; }).join('')+'</div>';
}
function kbHoiHTML(){
  var S = D.cauHinh.ktHoiKB || {}, ds = Object.keys(S).filter(function(k){ var x = S[k] || {}; return x.ten || x.ct || x.ky || x.pct || x.cb; }).sort();
  return '<div class="hso-kb-nhom"><b>🤝 Hội đoàn thể đã khai — '+ds.length+' Hội – xã</b> <small>(dùng cho chỗ ký Hội ở 10C, 10A, 10B, 01/BG, 02/BG và các mẫu KTGS)</small>'+
    (ds.length ? '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>Hội – xã</th><th>Chủ tịch</th><th>Phó Chủ tịch</th></tr></thead><tbody>'+
      ds.slice(0, 300).map(function(k){ var x = S[k] || {}; return '<tr><td>'+coChuHTML(x.ten || k.replace('|', ' · '))+'</td><td>'+coChuHTML(x.ct || x.ky || '')+'</td><td>'+coChuHTML(x.pct || x.cb || '')+'</td></tr>'; }).join('')+'</tbody></table></div>'
      : '<div class="sl-phu">Chưa khai Hội nào.</div>')+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop();ktCH().che=\'hdt\';ktCH().hdtTab=\'hoi\';luu();slDoiTab(\'kt\')">🏛 Sửa ở KTGS › Khai báo Hội</button></div>'+
    '<div class="sl-phu">KTGS là gói riêng, mẫu đã khóa — khai báo Hội sửa tại KTGS để không ảnh hưởng mẫu KTGS; mọi tab khác đọc chung.</div></div>';
}
