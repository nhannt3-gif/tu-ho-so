/* ===== 3.373 (TK 3 nhận bàn giao — RA_SOAT_BO_CUC_2510 Đợt A việc ① ② ③ ⑥; anh 26/10 "còn gì nữa gom làm 1 lần luôn") =====
   CẮM RÚT: file riêng + 1 dòng <script> trong index.html — bỏ dòng đó là về như cũ. Chỉ đổi cách hiện, không đổi dữ liệu / chức năng.
   ① Văn bản · Biểu mẫu · Scan · Thư viện (máy tính ≥ 900 px): khung xem phải THU LẠI khi chưa chọn mục nào → danh sách rộng hết; bấm 1 mục là mở ra như cũ
      (ẩn bằng visibility, giữ chỗ trong cây trang để các hàm "đang hiện khung xem" vẫn chạy đúng).
   ② Đầu trang máy tính có thanh bên: thay khối "Tủ hồ sơ vX · đơn vị" (trùng đầu thanh bên) bằng ĐƯỜNG DẪN tab đang mở: "📊 Số liệu › 👥 Tổ TK&VV".
   ③ Huy hiệu 📥 Nạp & KT: chỉ ĐỎ ⚠ khi tháng mới nhất đã nạp là tháng trước / tháng này (đang trong kỳ phải nạp) mà còn thiếu file bắt buộc;
      kỳ cũ hơn → số vàng (không báo động thường trực).
   ① + (anh 26/10 "nút bật tắt khung xem trước em bố trí góc trên bên phải khi ẩn"): khung xem đang ẩn (anh tắt ✕ hoặc thu khi chưa chọn mục) → nút
      "▣ Xem trước" ở góc trên bên phải (đầu trang, cạnh giờ); bấm = mở khung (tắt thu tự động tới lần đổi tab).
   ⑥ Văn bản: bỏ chip "⚠ Thiếu mảng, CT vay, tag" lặp trên từng thẻ → 1 chip lọc "⚠ N văn bản khai thiếu" ở đầu danh sách (bấm = chỉ hiện các văn bản đó). */
(function(){
  var st = document.createElement('style');
  st.textContent =
    '@media (min-width:900px){ .than.bca-pvgon{grid-template-columns:minmax(0,1fr) 0 0 !important;column-gap:0 !important}'+
    ' .than.bca-pvgon .cot-phai,.than.bca-pvgon .keo-cot{visibility:hidden;border-width:0 !important;min-width:0 !important;padding:0 !important;overflow:hidden} }'+
    '#dh-duong{display:none;font-weight:700;font-size:calc(15px*var(--co));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff}'+
    '#dh-duong small{font-weight:500;opacity:.8;margin-right:4px}'+
    '@media (min-width:1100px){ body.co-tb #dh-duong{display:block} body.co-tb .dau .ten-app,body.co-tb .dau #donvi{display:none !important} }'+
    '#bca-pv-nut{display:none;flex:0 0 auto;align-self:center;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.14);color:#fff;border-radius:999px;padding:5px 12px;font:inherit;font-weight:600;font-size:calc(12.5px*var(--co));cursor:pointer;white-space:nowrap;margin-left:6px}'+
    '#bca-pv-nut:hover{background:rgba(255,255,255,.26)}'+
    '@media (min-width:900px){ body.bca-pv-an #bca-pv-nut{display:inline-flex} }'+
    '#thanh-ben .so.vang{background:rgba(255,214,102,.25);color:#FFE08A}'+
    '#ds-vb .d2 .tg.canh{display:none}'+
    '.bca-thieu{display:inline-flex;align-items:center;gap:4px;border:1.3px solid #E8D29A;background:var(--vang-nen);color:var(--vang);border-radius:999px;padding:3px 11px;font-weight:600;font-size:calc(12px*var(--co));cursor:pointer;margin:0 0 8px}'+
    '.bca-thieu.bat{background:var(--vang);color:#fff;border-color:var(--vang)}'+
    '#ds-vb.chi-thieu .d2:not(:has(.tg.canh)){display:none}';
  document.head.appendChild(st);
  /* ① khung xem gọn */
  var TAB_FILE = [1, 3, 4, 5], TAB_PV = [1, 2, 3, 4, 5, 6], BCA_MO = -1;   /* BCA_MO = tab anh vừa bấm "▣ Xem trước" (không thu tự động) */
  function bcaKhung(){ var t = document.querySelector('.than'), cp = document.getElementById('cotphai'); if(!t || !cp) return;
    var n = typeof nganHienTai==='number' ? nganHienTai : -1; if(BCA_MO!==n) BCA_MO = -1;
    var gon = TAB_FILE.indexOf(n)>=0 && cp.classList.contains('pv-trong') && BCA_MO!==n;
    t.classList.toggle('bca-pvgon', gon);
    bcaNutPV(TAB_PV.indexOf(n)>=0 && (gon || (typeof anPV!=='undefined' && anPV))); }
  function bcaNutPV(an){ var b = document.getElementById('bca-pv-nut');
    if(!b){ var g = document.querySelector('.dau .gio'); if(!g || !g.parentNode) return; b = document.createElement('button'); b.id = 'bca-pv-nut'; b.type = 'button';
      b.textContent = '▣ Xem trước'; b.title = 'Mở khung xem trước bên phải'; b.onclick = bcaMoPV; g.parentNode.insertBefore(b, g); }
    document.body.classList.toggle('bca-pv-an', !!an); }
  function bcaMoPV(){ BCA_MO = typeof nganHienTai==='number' ? nganHienTai : -1;
    if(typeof anPV!=='undefined' && anPV && typeof hienPreview==='function') hienPreview(); bcaKhung(); }
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
  function bcaNutDo(){ var c = document.querySelector('#thanh-ben .tb-chan'); if(!c || c.querySelector('[data-lenh="dtd.mo"]') || typeof dtdHop!=='function') return;   /* 3.377: ⏱ Đo tốc độ ở chân thanh bên (máy tính) */
    var a = document.createElement('a'); a.setAttribute('data-lenh', 'dtd.mo'); a.title = '⏱ Đo tốc độ trên máy này — 📋 Chép gửi em để sửa đúng chỗ chậm'; a.innerHTML = '<span class="bt">⏱</span>'; c.appendChild(a); }
  function capNhat(){ bcaKhung(); bcaDuong(); bcaNapMau(); bcaNutDo(); }
  function gan(){
    boc('doiNgan', capNhat); boc('dhVe', function(){ bcaDuong(); bcaNapMau(); bcaNutDo(); }); boc('veVanBan', bcaThieu); boc('veDay', bcaKhung); boc('anPreview', bcaKhung); boc('hienPreview', bcaKhung);
    var cp = document.getElementById('cotphai'); if(cp && window.MutationObserver) new MutationObserver(bcaKhung).observe(cp, {attributes:true, attributeFilter:['class']});
    capNhat(); bcaThieu(); }
  if(document.readyState==='complete') gan(); else window.addEventListener('load', gan);
})();
