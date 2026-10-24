/* ===== 3.362 (docs/KE_HOACH_DIEN_THOAI_MAY.md — Đ2): BẢN MÁY TÍNH TRÊN ĐIỆN THOẠI — phần cần JS =====
   Cắm rút: chỉ chạy khi màn ≤ 600 px; bỏ file + 1 dòng <script> là về như cũ. Không đổi dữ liệu, chỉ đổi chữ hiển thị.
   - Ô kỳ chung (#ky-chung-o): chữ gọn "T8/26 · M31" (chọn mở ra vẫn đủ ở title), giá trị giữ nguyên. ES5. */
var DTM_HEP = false;
try { DTM_HEP = window.matchMedia && matchMedia('(max-width:600px)').matches; } catch(e){}
function dtmKyChu(t){ return String(t||'').replace(/\bT(\d{1,2})\/20(\d\d)\b/g, 'T$1/$2').replace(/Mẫu\s*31/g, 'M31').replace(/\s*\((chốt tháng|chot thang)\)/gi, '').replace(/\s{2,}/g, ' ').trim(); }
function dtmKyGon(){ var s = document.getElementById('ky-chung-o'); if(!s) return;
  for(var i = 0; i < s.options.length; i++){ var o = s.options[i]; if(!o.getAttribute('data-du')){ o.setAttribute('data-du', o.text); o.title = o.text; o.text = dtmKyChu(o.text); } } }
if(DTM_HEP && typeof kyChungVe==='function'){
  var dtmKyGoc = kyChungVe;
  kyChungVe = function(){ var r = dtmKyGoc.apply(this, arguments); try { dtmKyGon(); } catch(e){} return r; };   /* bọc hàm vẽ ô kỳ — gốc không đổi */
}
