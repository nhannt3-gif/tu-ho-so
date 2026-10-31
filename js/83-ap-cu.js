/* ==========================================================
   3.407 (anh 30/10 qua TK 1 — docs/AP_KP_CU.md 1.0): GHI CHÚ ẤP / KHU PHỐ CŨ — chỉ để tham khảo, nhớ dần; KHÔNG dùng tính số (số theo mã ấp, QT-C-10). Cắm rút.
   Anh: "danh mục thay đổi chỉ để tham khảo; ấp, KP mới chuyển từ ấp, KP cũ nào thì ghi chú ở nút địa bàn khi bật lên để nhớ;
         riêng 4 KP Gia Lộc thêm 1 dòng nhỏ ở chỗ lọc địa bàn để anh quen dần, 1 thời gian rồi bỏ".
   ① nút nhỏ 🏷 Tên ấp cũ ở khối LỌC ĐỊA BÀN — MẶC ĐỊNH TẮT (D.cauHinh.pvApCu), bật thì hiện ghi chú các ấp / KP trong phạm vi đang lọc;
   ② chữ nhỏ cuối hàng cây lọc khi mở Phường Gia Lộc (3.416.1: không thêm dòng, toàn PGD không hiện) — cờ AP_CU_GIA_LOC (anh bảo bỏ → đặt false hoặc xóa dòng).
   ③ 🗺 Địa bàn (js/82): ghi chú cạnh ấp / KP + gợi ý 📝.  Ghép theo MÃ ấp (tên trùng giữa 2 xã không lẫn). Chỉ tên địa danh, không dữ liệu khách. ES5.
   ========================================================== */
var AP_CU = {"54003406": ["Phường Gia Lộc", "Phước Đông", "trước là KP Phước Đức A (đổi tên 01/7/2026)"], "54003407": ["Phường Gia Lộc", "Phước Đức", "trước là KP Phước Đức B (đổi tên 01/7/2026)"], "54003408": ["Phường Gia Lộc", "Phước Lộc", "trước là KP Suối Cao A (đổi tên 01/7/2026)"], "54003409": ["Phường Gia Lộc", "Suối Cao", "trước là KP Suối Cao B (đổi tên 01/7/2026)"], "54003503": ["Phường Gò Dầu", "Gia Bình", "trước là KP Phước Hậu; gộp KP Phước Hiệp, một phần KP Chánh, một phần Rỗng Tượng (08/2026)"], "54003505": ["Phường Gò Dầu", "Bình Nguyên", "trước là KP Bình Nguyên 2; gộp Bình Nguyên 1, một phần KP Chánh (08/2026)"], "54003507": ["Phường Gò Dầu", "Thanh Hà", "nhận một phần Rạch Sơn (07/2026)"], "54003508": ["Phường Gò Dầu", "Thanh Bình", "trước là KP Thanh Bình A; gộp Thanh Bình C, Trâm Vàng 2 (08/2026)"], "54003510": ["Phường Gò Dầu", "Rạch Sơn", "gộp KP Nội Ô A (08/2026); một phần Rạch Sơn cũ đã sang Thanh Hà (07/2026)"], "54003511": ["Phường Gò Dầu", "Nội Ô", "trước là KP Nội Ô B; gộp Thanh Bình B, một phần Trâm Vàng 2 (07–08/2026)"], "54003516": ["Phường Gò Dầu", "Thanh Phước", "trước là KP Xóm Đồng; gộp phần lớn Rỗng Tượng (07–08/2026)"], "54003517": ["Phường Gò Dầu", "Cây Xoài", "nhận một phần Xóm Mới 2 (07/2026)"], "54003518": ["Phường Gò Dầu", "Xóm Mới", "trước là KP Xóm Mới 1; gộp phần còn lại Xóm Mới 2 (08/2026)"], "54003519": ["Phường Gò Dầu", "Trâm Vàng", "trước là KP Trâm Vàng 3; gộp Trâm Vàng 1 (08/2026)"], "54007910": ["Xã Phước Thạnh", "Phước Hội", "trước là ấp Phước Hội A; gộp Phước Hội B (08/2026)"], "54007912": ["Xã Phước Thạnh", "Phước Đông", "gộp ấp Phước Hòa (08/2026)"], "54007914": ["Xã Phước Thạnh", "Phước Bình", "trước là ấp Phước Bình B; gộp Phước Bình A, Phước An (08/2026)"], "54007916": ["Xã Phước Thạnh", "Phước Tây", "gộp ấp Chánh (08/2026)"], "54008206": ["Xã Thạnh Đức", "Bến Rộng", "gộp ấp Cầu Sắt (08/2026)"]};   /* mã ấp → [xã, tên hiện nay, ghi chú] — nguồn docs/AP_KP_CU.md (TK 1 đọc File Tổ trưởng 31/07/2025 + Mẫu 31 12/2025 → 09/2026) */
var AP_CU_GIA_LOC = true, AP_CU_GIA_LOC_XA = '540034', AP_CU_GIA_LOC_CHU = "Gia Lộc đổi tên KP từ 01/7/2026: Phước Đức B → Phước Đức · Phước Đức A → Phước Đông · Suối Cao A → Phước Lộc · Suối Cao B → Suối Cao";
function apCuGhi(ma){ var x = AP_CU[String(ma||'')]; return x ? x[2] : ''; }
function apCuDK(){ if(apCuDK.xong || typeof GD==='undefined') return; apCuDK.xong = 1;
  GD.dangKy('apcu', {bat:function(el){ D.cauHinh.pvApCu = !D.cauHinh.pvApCu; luu(); pvVeCay(el.getAttribute('data-p')); }}); }
var AP_CU_VE = pvVeCay;
pvVeCay = function(p){
  var r = AP_CU_VE.apply(this, arguments);
  try { apCuGan(p); } catch(e){ console.warn('Ghi chú ấp cũ', e); }
  return r;
};
function apCuGan(p){   /* 3.416.1 (anh 31/10 "tốn 2 dòng … chỉ hiện khi mở xã liên quan"): chỉ khi cây lọc mở 1 xã có ấp / KP đổi tên; nút cuối hàng 1 cây lọc, chữ Gia Lộc trên dải tiêu đề LỌC ĐỊA BÀN (không thêm dòng) */
  var d = PV_DUNG[p], o = document.getElementById(p+'-cay'); if(!d || !o) return; var K = d.K(); if(!K) return; apCuDK();
  var S = d.S(); [].forEach.call(o.querySelectorAll('.pv-apcu, .pv-apcu-ds'), function(x){ x.remove(); });
  if(!S.xa) return;   /* toàn PGD: không hiện */
  var bat = !!D.cauHinh.pvApCu, ap = {}, h = '';
  Object.keys(K.to||{}).forEach(function(m){ var t = K.to[m]; if(!t || t.trucTiep || !t.thon || !AP_CU[String(t.thon)]) return; if(!pvLoc({xa:S.xa, diem:S.diem, hoi:S.hoi, ap:S.ap}, t)) return; ap[String(t.thon)] = 1; });
  var ds = Object.keys(ap).sort(), gl = AP_CU_GIA_LOC && String(S.xa)===AP_CU_GIA_LOC_XA;
  if(!ds.length && !gl) return;
  if(ds.length) h += '<button type="button" class="nho pv-apcu-nut'+(bat ? ' bat' : '')+'" data-lenh="apcu.bat" data-p="'+coChuHTML(p)+'" title="Bật / tắt ghi chú tên ấp / KP cũ (chỉ tham khảo, không đổi số)">🏷 Tên ấp cũ'+(bat ? ' ▴' : ' ▾')+' <small>'+ds.length+'</small></button>';
  var glH = gl ? '<span class="pv-apcu pv-apcu-gl" title="'+coChuHTML(AP_CU_GIA_LOC_CHU)+'">🏷 '+coChuHTML(AP_CU_GIA_LOC_CHU)+'</span>' : '', dau = o.querySelector('.pv-dau-nut');
  if(glH){ if(dau) dau.insertAdjacentHTML('beforebegin', glH); else h += glH; }   /* chữ Gia Lộc: dải tiêu đề LỌC ĐỊA BÀN (chỗ trống giữa số liệu và nút) */
  if(!h) return;
  var h1 = o.querySelector('.pv-hang1');
  if(h1) h1.insertAdjacentHTML('beforeend', '<span class="pv-apcu">'+h+'</span>'); else o.insertAdjacentHTML('beforeend', '<div class="pv-apcu">'+h+'</div>');
  if(bat && ds.length) o.insertAdjacentHTML('beforeend', '<div class="pv-apcu-ds">'+ds.map(function(m){ var x = AP_CU[m]; return '<div><b>'+coChuHTML(x[1])+'</b> <small>'+coChuHTML(m)+'</small> — '+coChuHTML(x[2])+'</div>'; }).join('')+'</div>');
}
