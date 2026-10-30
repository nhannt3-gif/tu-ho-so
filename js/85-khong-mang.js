/* ===== 3.419 P1 (docs/KE_HOACH_NANG_CAP_0111.md — anh 31/10 "làm theo thứ tự em thấy ổn nhất"): BẢN MÁY TÍNH CHẠY KHÔNG MẠNG =====
   Đăng ký bộ đệm dt-sw.js (chung với bản điện thoại — cùng phạm vi chỉ được 1 bộ). Có mạng: luôn lấy bản mới (không kẹt bản cũ), cất lại;
   mất mạng: mở app bằng bản đã cất. Thư viện (pdf.js, Excel…) đã cất ở js/01. Chỉ chạy trên https / localhost. Cắm rút: bỏ dòng <script> là như cũ. ES5. */
(function(){
  if(!('serviceWorker' in navigator) || !(location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1')) return;
  window.addEventListener('load', function(){ navigator.serviceWorker.register('dt-sw.js').catch(function(){}); });
})();
