/* ===== 3.342 (TK 3): NÚT 📱 SANG BẢN GỌN dt.html — 3.367 (anh 25/10 "bản chính như máy tính, điện thoại là bản phụ cho gọn"):
   điện thoại mở index.html ở lại bản chính (thôi tự chuyển); nút 📱 hiện trên mọi điện thoại cảm ứng → dt.html; dt.html bấm 🖥 về đây. Máy tính (chuột) không hiện.
   File riêng — không sửa khung (docs/PHOI_HOP_TK2_TK3.md). Cờ cũ 'tuhoso_ban' không còn dùng (để nguyên không hại). */
(function(){
  var laDT = false; try { laDT = matchMedia('(pointer:coarse)').matches && Math.min(screen.width, screen.height)<=600; } catch(e){}
  if(!laDT) return;
  var b = document.createElement('button'); b.type = 'button'; b.id = 've-dt'; b.textContent = '📱'; b.title = 'Bản gọn cho điện thoại (dt.html)';
  b.style.cssText = 'position:fixed;left:10px;bottom:calc(76px + env(safe-area-inset-bottom));z-index:9000;width:44px;height:44px;border-radius:22px;border:0;background:#1a5fb4;color:#fff;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,.3)';
  b.onclick = function(){ location.href = 'dt.html'; };
  var gan = function(){ if(document.body && !document.getElementById('ve-dt')) document.body.appendChild(b); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', gan); else gan();
})();
