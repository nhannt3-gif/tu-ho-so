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
/* ===== 3.372 (KE_HOACH_DIEN_THOAI_MAY — đợt Đ6, anh duyệt 25/10: "tab Hôm nay, Văn bản, Tra cứu KH là 3 tab chính", ô 4 = Scan) =====
   Chỉ điện thoại (≤ 600 px) — máy tính / máy tính bảng giữ thanh dưới cũ (DT_NUT trong js/23):
   - Thanh dưới: Hôm nay · Tra cứu · Văn bản · Scan · ☰ Thêm (GD xã, Số liệu, Hồ sơ, Cài đặt… vào ☰; thêm "📱 Bản điện thoại gọn").
   - body[data-dtm] = nút đang mở (CSS ẩn hàng tab con Số liệu khi đang ở Tra cứu).
   - Dòng trạng thái chân trang chỉ hiện khi có tin mới / đang chạy (body.dtm-tt) — chip ⚠ lỗi vẫn hiện (CSS). */
if(DTM_HEP && typeof DT_NUT!=='undefined' && typeof dtVe==='function'){
  DT_NUT = [['0', '🏠', 'Hôm nay', function(){ doiNgan(0); }], ['tra', '👤', 'Tra cứu', function(){ dhSL('tra'); }],
    ['1', '📄', 'Văn bản', function(){ doiNgan(1); }], ['4', '🪪', 'Scan', function(){ doiNgan(4); }], ['them', '☰', 'Thêm', function(){ dtThem(); }]];
  dtDang = function(){ var d = dhDang(); return ['0', 'tra', '1', '4'].indexOf(d)>=0 ? d : 'them'; };
  var dtmVeGoc = dtVe;
  dtVe = function(){ var r = dtmVeGoc.apply(this, arguments); try { document.body.setAttribute('data-dtm', dtDang()); } catch(e){} return r; };
  var dtmThemGoc = dtThem;
  dtThem = function(){ var r = dtmThemGoc.apply(this, arguments);
    try { var k = document.querySelector('.dt-them'); if(k){ var n = document.createElement('div'); n.className = 'dt-them-nhom';
      n.innerHTML = '<b>📱 Điện thoại</b><div><button class="nho dt-them-muc" data-lenh="dtm.banGon">📱 Bản điện thoại gọn (dt.html)</button><button class="nho dt-them-muc" data-lenh="dtd.mo">⏱ Đo tốc độ</button></div>'; k.appendChild(n); } } catch(e){}
    return r; };
  if(typeof GD!=='undefined') GD.dangKy('dtm', {banGon:function(){ location.href = 'dt.html'; }});   /* như nút 📱 của TK 3 (js/60, 3.370): sang bản gọn, không nhớ cờ */
  if(typeof ttVe==='function'){ var dtmTtGoc = ttVe;
    ttVe = function(){ var r = dtmTtGoc.apply(this, arguments);
      try { var moi = TTB.chay || (TTB.chu && Date.now()-TTB.luc < (TTB.loi===TTB.luc ? 12000 : 8000)); document.body.classList.toggle('dtm-tt', !!moi); } catch(e){} return r; }; }
  try { if(document.getElementById('thanh-duoi')) dtVe(); } catch(e){}
}
