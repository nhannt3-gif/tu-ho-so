/* ==========================================================
   3.278 (rà soát tab Scan 20/10 — anh: "em cứ code theo ý em và gộp lên"): BỐ CỤC GỌN
   - Thanh tab Scan: 1 nút 🗂 Quản lý hồ sơ scan (thay 🧹 Sắp xếp · 📊 Kiểm tra · 🔎 Rà) → 1 màn 3 thẻ:
     ⏳ Chờ sắp xếp (n) · 🔎 Rà CCCD đã lưu · 📊 Kiểm tra theo tổ (mỗi thẻ là màn đã có, thêm dải thẻ trên đầu).
   - Sau khi quét: 1 nút 🗄 Lưu vào tủ (thay "Lưu vào app" + "Lưu vào app + khai ngay"): tự nhận khách — đọc CCCD (3.264),
     khách đã chọn / 🔎 Tra Mẫu 31 ở ô Tên file (3.275), hoặc tên file nhận ra chắc 1 khách — rồi lưu tên chuẩn; chưa rõ → Chờ sắp xếp.
   ========================================================== */
function qlThe(dang){
  var n = sxDemCho(), c = function(k, chu, lenh){ return '<button type="button" class="gdx-c gd-chip'+(dang===k ? ' bat' : '')+'" data-lenh="'+lenh+'">'+chu+'</button>'; };
  return '<div class="ql-the">'+c('sx', '⏳ Chờ sắp xếp'+(n ? ' ('+n+')' : ''), 'sx.sapXep')+c('rs', '🔎 Rà CCCD đã lưu', 'rs.mo')+c('kt', '📊 Kiểm tra theo tổ', 'sx.kiem')+'</div>';
}
function qlGanThe(dang){ var h = document.getElementById('hop-in'); if(h && !h.querySelector('.ql-the')) h.insertAdjacentHTML('afterbegin', qlThe(dang)); }
var QL_VE_SX = sxVeSapXep; sxVeSapXep = function(){ QL_VE_SX(); qlGanThe('sx');
  var nk = (D.scan||[]).filter(function(k){ return k.chuaKhai; }).length, ch = document.querySelector('#hop-in .sx-chan .gd-hang');
  if(nk && ch) ch.insertAdjacentHTML('afterbegin', GD.nut({chu:'✎ Khai hàng loạt ('+nk+')', lenh:'sx.khaiHL', tit:'Gõ tên + chọn địa bàn cho nhiều bản chưa khai cùng lúc'})); };
var QL_VE_RS = rsVe; rsVe = function(){ QL_VE_RS(); qlGanThe('rs'); };
var QL_VE_KT = sxKiemVe; sxKiemVe = function(m){ QL_VE_KT(m); qlGanThe('kt'); };
function qlMo(){ if(sxDemCho()) return moSapXep(); moKiemScan(); }
/* thanh tab Scan: 1 nút */
var QL_VE_SCAN = veScan;
veScan = function(){
  QL_VE_SCAN();
  var t = document.querySelector('#tr4 .sx-thanh'); if(!t) return;
  Array.prototype.forEach.call(t.querySelectorAll('button'), function(b){ b.remove(); });
  t.insertAdjacentHTML('beforeend', '<button data-lenh="ql.mo" class="chinh" title="Chờ sắp xếp · Rà CCCD đã lưu · Kiểm tra theo tổ">🗂 Quản lý hồ sơ scan</button>');
};
/* 🗄 Lưu vào tủ: tự nhận khách */
function qlLuuTu(){
  if(!SX) return;
  var nh = scanNhom(), e = document.getElementById('sx-ten');
  if(SC.che==='the' && SX_DOC.length===nh.length && SX_DOC.every(function(x){ return x.tim && x.tim.ma; })) return sxLuuTuDoc();   /* đọc CCCD ra đủ khách */
  if(nh.length && nh.every(function(_, i){ return SXK[i]; })) return scanLuuTu();   /* đã chọn / Tra Mẫu 31 */
  if(nh.length===1 && e && e.value.trim()){
    var R = trTim(e.value); if(R.ma){ SXK[0] = sxKhach(R.ma); return scanLuuTu(); }   /* tên file nhận ra chắc 1 khách */
  }
  scanLuuApp();   /* chưa rõ → ⏳ Chờ sắp xếp */
}
GD.dangKy('ql', {mo:function(){ qlMo(); }, chonKH:function(){ scanLuuTuHop(); }});
