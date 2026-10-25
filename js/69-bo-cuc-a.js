/* ===== 3.373 (TK 3 nhận bàn giao — RA_SOAT_BO_CUC_2510 Đợt A việc ① ② ③ ⑥; anh 26/10 "còn gì nữa gom làm 1 lần luôn") =====
   CẮM RÚT: file riêng + 1 dòng <script> trong index.html — bỏ dòng đó là về như cũ. Chỉ đổi cách hiện, không đổi dữ liệu / chức năng.
   ① Văn bản · Biểu mẫu · Scan · Thư viện (máy tính ≥ 900 px): khung xem phải THU LẠI khi chưa chọn mục nào → danh sách rộng hết; bấm 1 mục là mở ra như cũ
      (ẩn bằng visibility, giữ chỗ trong cây trang để các hàm "đang hiện khung xem" vẫn chạy đúng).
   ② Đầu trang máy tính có thanh bên: thay khối "Tủ hồ sơ vX · đơn vị" (trùng đầu thanh bên) bằng ĐƯỜNG DẪN tab đang mở: "📊 Số liệu › 👥 Tổ TK&VV".
   ③ Huy hiệu 📥 Nạp & KT: chỉ ĐỎ ⚠ khi tháng mới nhất đã nạp là tháng trước / tháng này (đang trong kỳ phải nạp) mà còn thiếu file bắt buộc;
      kỳ cũ hơn → số vàng (không báo động thường trực).
   ⑥ Văn bản: bỏ chip "⚠ Thiếu mảng, CT vay, tag" lặp trên từng thẻ → 1 chip lọc "⚠ N văn bản khai thiếu" ở đầu danh sách (bấm = chỉ hiện các văn bản đó). */
(function(){
  var st = document.createElement('style');
  st.textContent =
    '@media (min-width:900px){ .than.bca-pvgon{grid-template-columns:minmax(0,1fr) 0 0 !important;column-gap:0 !important}'+
    ' .than.bca-pvgon .cot-phai,.than.bca-pvgon .keo-cot{visibility:hidden;border-width:0 !important;min-width:0 !important;padding:0 !important;overflow:hidden} }'+
    '#dh-duong{display:none;font-weight:700;font-size:calc(15px*var(--co));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff}'+
    '#dh-duong small{font-weight:500;opacity:.8;margin-right:4px}'+
    '@media (min-width:1100px){ body.co-tb #dh-duong{display:block} body.co-tb .dau .ten-app,body.co-tb .dau #donvi{display:none !important} }'+
    '#thanh-ben .so.vang{background:rgba(255,214,102,.25);color:#FFE08A}'+
    '#ds-vb .d2 .tg.canh{display:none}'+
    '.bca-thieu{display:inline-flex;align-items:center;gap:4px;border:1.3px solid #E8D29A;background:var(--vang-nen);color:var(--vang);border-radius:999px;padding:3px 11px;font-weight:600;font-size:calc(12px*var(--co));cursor:pointer;margin:0 0 8px}'+
    '.bca-thieu.bat{background:var(--vang);color:#fff;border-color:var(--vang)}'+
    '#ds-vb.chi-thieu .d2:not(:has(.tg.canh)){display:none}';
  document.head.appendChild(st);
  /* ① khung xem gọn */
  var TAB_FILE = [1, 3, 4, 5];
  function bcaKhung(){ var t = document.querySelector('.than'), cp = document.getElementById('cotphai'); if(!t || !cp) return;
    var gon = TAB_FILE.indexOf(typeof nganHienTai==='number' ? nganHienTai : -1)>=0 && cp.classList.contains('pv-trong');
    t.classList.toggle('bca-pvgon', gon); }
  /* ② đường dẫn tab */
  function bcaDuong(){ if(typeof dhDang!=='function' || typeof dhMuc!=='function') return; var o = document.getElementById('dh-duong');
    if(!o){ var c = document.querySelector('.dau .ten-app'); if(!c || !c.parentNode) return; o = document.createElement('div'); o.id = 'dh-duong'; c.parentNode.insertBefore(o, c); }
    var k = dhDang(), m = dhMuc(k); if(!m){ o.textContent = ''; return; }
    var g = typeof dhNhomCua==='function' ? dhNhomCua(k) : '', n = g && typeof DH_NHOM!=='undefined' ? DH_NHOM.filter(function(x){ return x.g===g; })[0] : null;
    o.innerHTML = (n ? '<small>'+coChuHTML(n.bt+' '+n.ten)+' ›</small>' : '')+coChuHTML(m.bt+' '+m.ten); o.title = o.textContent; }
  /* ③ huy hiệu Nạp & KT */
  function thangTruoc(){ var d = new Date(); d.setDate(1); d.setMonth(d.getMonth()-1); return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2); }
  function bcaNapGap(){ try { var ky = typeof slKyMoi==='function' ? slKyMoi() : ''; return !!ky && ky>=thangTruoc(); } catch(e){ return true; } }
  if(typeof DH_MUC!=='undefined') DH_MUC.forEach(function(m){ if(m.k==='nap') try { Object.defineProperty(m, 'do', {get:bcaNapGap, configurable:true}); } catch(e){} });
  function bcaNapMau(){ var dang = bcaNapGap(); [].forEach.call(document.querySelectorAll('#thanh-ben .so'), function(s){ var a = s.closest('a,button,[data-k]');
    if(!a || !/Nạp & KT/.test(a.textContent)) return; s.classList.toggle('vang', !dang); }); }
  /* ⑥ chip lọc văn bản khai thiếu */
  var CHI_THIEU = false;
  function bcaThieu(){ var ds = document.getElementById('ds-vb'); if(!ds || typeof chuaPhanLoai!=='function') return;
    var n = (D.vanBan || []).filter(function(m){ return !m.daXoa && chuaPhanLoai(m).length; }).length, c = document.getElementById('bca-thieu');
    if(!n){ if(c) c.remove(); CHI_THIEU = false; ds.classList.remove('chi-thieu'); return; }
    if(!c){ c = document.createElement('div'); c.id = 'bca-thieu'; c.className = 'bca-thieu'; c.title = 'Văn bản chưa khai mảng / chương trình vay / tag — bấm để chỉ hiện các văn bản này, bấm lại để hiện hết';
      c.onclick = function(){ CHI_THIEU = !CHI_THIEU; bcaThieu(); }; ds.parentNode.insertBefore(c, ds); }
    c.textContent = '⚠ '+n+' văn bản khai thiếu'+(CHI_THIEU ? ' — đang lọc ✕' : '');
    c.classList.toggle('bat', CHI_THIEU); ds.classList.toggle('chi-thieu', CHI_THIEU); }
  function boc(ten, sau){ var f = window[ten]; if(typeof f!=='function' || f.bca) return; window[ten] = function(){ var r = f.apply(this, arguments); try { sau(); } catch(e){} return r; }; window[ten].bca = 1; }
  function capNhat(){ bcaKhung(); bcaDuong(); bcaNapMau(); }
  function gan(){
    boc('doiNgan', capNhat); boc('dhVe', function(){ bcaDuong(); bcaNapMau(); }); boc('veVanBan', bcaThieu); boc('veDay', bcaKhung);
    var cp = document.getElementById('cotphai'); if(cp && window.MutationObserver) new MutationObserver(bcaKhung).observe(cp, {attributes:true, attributeFilter:['class']});
    capNhat(); bcaThieu(); }
  if(document.readyState==='complete') gan(); else window.addEventListener('load', gan);
})();
