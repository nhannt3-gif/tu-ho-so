/* ===== 3.363 (docs/TU_VAN_KY_THUAT.md mục 5 — anh 25/10 "Ok em làm tiếp"): ⚠ NHẬT KÝ LỖI TỰ ĐỘNG =====
   - Bắt mọi lỗi chạy (error) + lời hứa bị từ chối không ai bắt (unhandledrejection) khi anh dùng app → ghi lúc, nội dung, file:dòng, bản app, tab.
   - Chỉ lưu TRÊN MÁY NÀY (localStorage 'tuhoso_loi', 100 lỗi gần nhất; lỗi trùng trong 1 phút → cộng dồn). Không gửi đi đâu.
   - Có lỗi chưa xem → chip "⚠ N lỗi" ở chân trang; bấm mở danh sách, 📋 Chép để gửi em (Zalo), 🗑 Xóa.
   - Cắm rút: file riêng + 1 dòng <script>; bỏ ra app chạy như cũ. ES5. */
var NKL_KHOA = 'tuhoso_loi', NKL_TOI_DA = 100;
function nklDs(){ try { return JSON.parse(localStorage.getItem(NKL_KHOA) || '[]') || []; } catch(e){ return []; } }
function nklLuu(a){ try { localStorage.setItem(NKL_KHOA, JSON.stringify(a.slice(-NKL_TOI_DA))); } catch(e){} }
function nklGhi(msg, nguon, stack){
  msg = String(msg || 'Lỗi không rõ').slice(0, 300); nguon = String(nguon || '').replace(/^.*\/(js|css)\//, '$1/').replace(/\?v=[\d.]+/, '').slice(0, 120);
  if(/ResizeObserver loop|Script error\.?$/.test(msg)) return;   /* tiếng ồn của trình duyệt — không phải lỗi app */
  var a = nklDs(), now = Date.now(), cu = null;
  for(var i = a.length-1; i>=0 && i>=a.length-10; i--) if(a[i].msg===msg && a[i].nguon===nguon && now-new Date(a[i].luc).getTime()<60000){ cu = a[i]; break; }   /* lỗi trùng trong 1 phút (10 dòng gần nhất) → cộng dồn */
  if(cu){ cu.lan = (cu.lan||1)+1; cu.luc = new Date(now).toISOString(); cu.moi = 1; }
  else a.push({luc:new Date(now).toISOString(), msg:msg, nguon:nguon, stack:String(stack || '').split('\n').slice(0, 4).join(' | ').replace(/\?v=[\d.]+/g, '').slice(0, 500),
    ban:typeof APP_BAN!=='undefined' ? APP_BAN : '', tab:(typeof nganHienTai!=='undefined' ? nganHienTai : '')+(typeof D!=='undefined' && D.cauHinh && D.cauHinh.slTab ? '/'+D.cauHinh.slTab : ''), lan:1, moi:1});
  nklLuu(a); nklChip();
}
function nklChip(){
  var day = document.querySelector('.day'); if(!day) return;
  var c = document.getElementById('chip-loiapp');
  if(!c){ c = document.createElement('span'); c.id = 'chip-loiapp'; c.className = 'chip do'; c.setAttribute('data-lenh', 'nkl.mo'); c.title = 'Lỗi app ghi trên máy này — bấm xem, chép gửi em'; var sl = document.getElementById('so-lieu'); if(sl && sl.nextSibling) day.insertBefore(c, sl.nextSibling); else day.appendChild(c); }
  var n = nklDs().filter(function(x){ return x.moi; }).length;
  c.textContent = '⚠ '+n+' lỗi'; c.style.display = n ? '' : 'none';
}
function nklChu(a){ return 'Tủ hồ sơ — nhật ký lỗi ('+a.length+')\n'+a.map(function(x, i){ return (i+1)+'. '+x.luc.replace('T', ' ').slice(0, 19)+' · bản '+x.ban+' · tab '+x.tab+(x.lan>1 ? ' · ×'+x.lan : '')+'\n   '+x.msg+(x.nguon ? '\n   tại '+x.nguon : '')+(x.stack ? '\n   '+x.stack : ''); }).join('\n'); }
function nklHop(){
  nklDangKy();
  var a = nklDs(), e = coChuHTML;
  a.forEach(function(x){ delete x.moi; }); nklLuu(a); nklChip();
  moHop('<div class="hop-tit">⚠ Nhật ký lỗi app ('+a.length+')</div>'+
    '<div class="hop-phu">Lỗi phát sinh khi dùng app, chỉ lưu trên máy này (100 lỗi gần nhất). Bấm 📋 Chép rồi dán gửi em qua Zalo để em sửa đúng chỗ — không có dữ liệu khách trong nội dung lỗi.</div>'+
    (a.length ? '<div class="nk-bang"><table class="tc-to-tvb"><thead><tr><th>Lúc</th><th>Lỗi</th><th>Bản · tab</th></tr></thead><tbody>'+a.slice().reverse().map(function(x){
        return '<tr><td>'+e(x.luc.replace('T', ' ').slice(5, 16))+'</td><td class="ten"><b>'+e(x.msg)+'</b>'+(x.lan>1 ? ' <small>×'+x.lan+'</small>' : '')+(x.nguon ? '<br><small>'+e(x.nguon)+'</small>' : '')+'</td><td>'+e(x.ban)+' · '+e(String(x.tab))+'</td></tr>'; }).join('')+'</tbody></table></div>'
      : '<div class="rong">Chưa có lỗi nào được ghi.</div>')+
    GD.hang([GD.nut({chu:'📋 Chép để gửi em', lenh:'nkl.chep', chinh:true, tat:!a.length}), GD.nut({chu:'🗑 Xóa nhật ký', lenh:'nkl.xoa', tat:!a.length}), GD.nut({chu:'Đóng (Esc)', lenh:'hop.dong'})]), true);
}
function nklDangKy(){ if(nklDangKy.xong || typeof GD==='undefined') return; nklDangKy.xong = 1;
  GD.dangKy('nkl', {
    mo:function(){ nklHop(); },
    chep:function(){ var t = nklChu(nklDs());
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function(){ bao('Đã chép nhật ký lỗi — dán vào Zalo gửi em.', 4); }, function(){ bao('Máy không cho chép — chụp màn hình gửi em.', 5); });
      else bao('Máy không cho chép — chụp màn hình gửi em.', 5); },
    xoa:function(){ nklLuu([]); nklChip(); nklHop(); bao('Đã xóa nhật ký lỗi.', 3); }
  }); }
(function(){
  window.addEventListener('error', function(ev){ try { if(ev && ev.target && ev.target!==window && !ev.message) return;   /* ảnh / file không tải được — không phải lỗi mã */
    nklGhi(ev.message, (ev.filename || '')+(ev.lineno ? ':'+ev.lineno+':'+(ev.colno||0) : ''), ev.error && ev.error.stack); } catch(e){} }, true);
  window.addEventListener('unhandledrejection', function(ev){ try { var r = ev && ev.reason; if(!r || r.name==='AbortError') return;   /* hủy tải chủ động — bỏ qua */
    nklGhi('(lời hứa) '+(r.message || String(r)), '', r.stack); } catch(e){} });
  var gan = function(){ try { nklDangKy(); nklChip(); } catch(e){} };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', gan); else gan();
})();
