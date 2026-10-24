/* ===== 3.342 (TK 3 — KE_HOACH_DIEN_THOAI_2 mục 7.1, anh 24/10 "khi cần cũng có nút chuyển sang bản web"): NÚT 📱 VỀ BẢN ĐIỆN THOẠI =====
   Điện thoại bấm 🖥 ở dt.html → bản web (cờ localStorage 'tuhoso_ban' = 'may', index.html thôi tự chuyển). Ở bản web trên điện thoại hiện nút 📱 nhỏ góc dưới trái
   → bỏ cờ, về dt.html. Máy tính (chuột) không hiện. File riêng — không sửa khung (docs/PHOI_HOP_TK2_TK3.md). */
(function(){
  var laDT = false; try { laDT = localStorage.getItem('tuhoso_ban')==='may' && matchMedia('(pointer:coarse)').matches && Math.min(screen.width, screen.height)<=600; } catch(e){}
  if(!laDT) return;
  var b = document.createElement('button'); b.type = 'button'; b.id = 've-dt'; b.textContent = '📱'; b.title = 'Về bản điện thoại';
  b.style.cssText = 'position:fixed;left:10px;bottom:calc(76px + env(safe-area-inset-bottom));z-index:9000;width:44px;height:44px;border-radius:22px;border:0;background:#1a5fb4;color:#fff;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,.3)';
  b.onclick = function(){ try { localStorage.removeItem('tuhoso_ban'); } catch(e){} location.href = 'dt.html'; };
  var gan = function(){ if(document.body && !document.getElementById('ve-dt')) document.body.appendChild(b); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', gan); else gan();
})();
