/* ===== 3.362 (docs/KE_HOACH_DIEN_THOAI_MAY.md — Đ2): BẢN MÁY TÍNH TRÊN ĐIỆN THOẠI — phần cần JS =====
   Cắm rút: chỉ chạy khi màn ≤ 600 px; bỏ file + 1 dòng <script> là về như cũ. Không đổi dữ liệu, chỉ đổi chữ hiển thị.
   - Ô kỳ chung (#ky-chung-o): chữ gọn "T8/26 · M31" (chọn mở ra vẫn đủ ở title), giá trị giữ nguyên. ES5. */
var DTM_HEP = false;
try { DTM_HEP = window.matchMedia && matchMedia('(max-width:600px)').matches; } catch(e){}
function dtmKyChu(t){ return String(t||'').replace(/\bT(\d{1,2})\/20(\d\d)\b/g, 'T$1/$2').replace(/Mẫu\s*31/g, 'M31').replace(/\s*\((chốt tháng|chot thang)\)/gi, '').replace(/\s{2,}/g, ' ').trim(); }
function dtmKyGon(){ var s = document.getElementById('ky-chung-o'); if(!s) return;
  for(var i = 0; i < s.options.length; i++){ var o = s.options[i]; if(!o.getAttribute('data-du')){ o.setAttribute('data-du', o.text); o.title = o.text; o.text = dtmKyChu(o.text); } } }
function dtmKhoi1(){ if(typeof kyChungVe==='function'){
  var dtmKyGoc = kyChungVe;
  kyChungVe = function(){ var r = dtmKyGoc.apply(this, arguments); try { dtmKyGon(); } catch(e){} return r; };   /* bọc hàm vẽ ô kỳ — gốc không đổi */
} }
/* ===== 3.372 (KE_HOACH_DIEN_THOAI_MAY — đợt Đ6, anh duyệt 25/10: "tab Hôm nay, Văn bản, Tra cứu KH là 3 tab chính", ô 4 = Scan) =====
   Chỉ điện thoại (≤ 600 px) — máy tính / máy tính bảng giữ thanh dưới cũ (DT_NUT trong js/23):
   - Thanh dưới: Hôm nay · Tra cứu · Văn bản · Scan · ☰ Thêm (GD xã, Số liệu, Hồ sơ, Cài đặt… vào ☰; thêm "📱 Bản điện thoại gọn").
   - body[data-dtm] = nút đang mở (CSS ẩn hàng tab con Số liệu khi đang ở Tra cứu).
   - Dòng trạng thái chân trang chỉ hiện khi có tin mới / đang chạy (body.dtm-tt) — chip ⚠ lỗi vẫn hiện (CSS). */
function dtmKhoi2(){ if(typeof DT_NUT!=='undefined' && typeof dtVe==='function'){
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
} }

/* ===== 3.535 (anh 14/11): điện thoại — Tra cứu KH gọn + Văn bản gửi cả VB / 1 trang. Chỉ ≤ 600 px, bọc hàm gốc (máy tính không đổi). =====
   - Lọc địa bàn ở Tra cứu: gọn 1 dòng, bấm dòng "LỌC ĐỊA BÀN" mở / gọn (cờ trên body → giữ qua lần vẽ lại).
   - Xem văn bản: mỗi trang có nút "📤 Gửi trang này" (tách 1 trang → bảng chia sẻ Zalo / Mail); nút dưới "📤 Gửi cả VB"; tích nhiều trang → "📤 Gửi N trang". */
var DTM = {
  locDoi: function(){ document.body.classList.toggle('dtm-loc-mo'); },
  gui1: function(i){ if(!i) return; var cu = trangChon; trangChon = {}; trangChon[i] = 1; try { guiTrangChon(); } finally { trangChon = cu; } },
  nutTrang: function(n){ if(n!=='lon') return; var S = XEM.lon; if(!S || !S.khung || S.tong<2) return;
    S.khung.forEach(function(box, k){ if(box.querySelector('.dtm-gui1')) return; var b = document.createElement('button'); b.type = 'button'; b.className = 'dtm-gui1';
      b.setAttribute('data-lenh', 'dtm.gui1'); b.setAttribute('data-a1', String(k+1)); b.textContent = '📤 Gửi trang này'; b.title = 'Gửi riêng trang '+(k+1)+' (Zalo, Mail…)'; box.appendChild(b); }); },
  /* 3.536 (anh 14/11: "máy có 5G đọc file từ Drive rất nhanh… không tự tải nhưng file đã xem thì lưu lại" → "giữ trong ngày thôi"):
     VB đã xem cất máy (layNoiDung — sẵn có) chỉ giữ TRONG NGÀY. Mở app ngày mới → xóa bản trong máy của VB đã có trên Drive (driveId) mà hôm nay chưa xem.
     Không đụng: VB chưa lên Drive (chỉ có trong máy), khi còn việc chờ đẩy Drive (DR.hangCho), bản scan / dữ liệu khác. Ngày xem lưu localStorage (không đồng bộ). */
  XEM_KHOA: 'tuhoso_dt_xem',
  xemDoc: function(){ try { return JSON.parse(localStorage.getItem(DTM.XEM_KHOA)||'{}') || {}; } catch(e){ return {}; } },
  xemGhi: function(id){ if(!id) return; var m = DTM.xemDoc(), h = ngayISO(nay()); m[id] = h; Object.keys(m).forEach(function(k){ if(m[k]!==h) delete m[k]; });
    try { localStorage.setItem(DTM.XEM_KHOA, JSON.stringify(m)); } catch(e){} },
  don: function(){ if(typeof DR!=='undefined' && DR.hangCho && DR.hangCho.length) return Promise.resolve(0);
    var x = DTM.xemDoc(), h = ngayISO(nay()), ds = (D.vanBan||[]).filter(function(m){ return m && m.driveId && x[m.id]!==h; }), n = 0;
    return ds.reduce(function(p, m){ return p.then(function(){ return docFile(m.id).then(function(b){ if(b){ n++; return xoaFile(m.id); } }).catch(function(){}); }); }, Promise.resolve())
      .then(function(){ if(n) bao('🧹 Đã dọn '+n+' văn bản xem hôm trước khỏi máy (mở lại sẽ tải từ Drive).', 4); return n; }); },
  nhan: function(){ var n = Object.keys(trangChon||{}).length, b = document.getElementById('nut-gui-trang'); if(b) b.textContent = '📤 Gửi '+n+' trang';
    var g = document.querySelector('#xem .xem-day [data-lenh="khung.guiFileMenu"]'); if(g) g.textContent = n ? '📤 Cả VB' : '📤 Gửi cả VB';
    var d = document.querySelector('#xem .xem-day [data-lenh="khung.dongXem"]'); if(d) d.textContent = '✕ Đóng'; }
};
function dtmKhoi3(){
  if(typeof GD!=='undefined') GD.dangKy('dtm', {gui1:function(el){ DTM.gui1(+gdA(el, 1)); }});
  if(typeof moXem==='function'){ var dtmMoXemGoc = moXem; moXem = function(id, tam){ try { DTM.xemGhi((tam && tam.id) || id); } catch(e){} return dtmMoXemGoc.apply(this, arguments); }; }
  setTimeout(function(){ try { if(typeof D!=='undefined' && D.vanBan) DTM.don(); } catch(e){} }, 8000);   /* sau khởi động, không chặn mở app */
  if(typeof veTrang==='function'){ var dtmVeTrangGoc = veTrang; veTrang = function(n){ var r = dtmVeTrangGoc.apply(this, arguments); try { DTM.nutTrang(n); } catch(e){} return r; }; }
  if(typeof capNhatThanhChon==='function'){ var dtmChonGoc = capNhatThanhChon; capNhatThanhChon = function(){ var r = dtmChonGoc.apply(this, arguments); try { DTM.nhan(); } catch(e){} return r; }; }
  try { DTM.nhan(); } catch(e){}
}
/* 3.537 (anh 14/11 ảnh iPhone: "ko lọc địa bàn được" — thanh dưới vẫn kiểu cũ ⇒ phần JS điện thoại không chạy lúc nạp, CSS vẫn gọn lọc):
   - khởi động phần điện thoại 1 lần: ngay lúc nạp nếu màn ≤ 600 px; không thì thử lại khi trang tải xong / đổi cỡ màn (máy báo cỡ muộn);
   - body.dtm-on chỉ bật khi JS đã chạy → CSS gọn lọc / ẩn ô tìm chỉ áp khi có JS (không bao giờ kẹt lọc);
   - bấm "LỌC ĐỊA BÀN" luôn đăng ký (không phụ thuộc cỡ màn lúc nạp). */
/* ===== 3.541 (anh 15/11 "tận dụng khả năng vuốt mượt của iP"): VUỐT — chỉ điện thoại (gắn trong dtmKhoi) =====
   ① vuốt ngang giữa 4 tab chính (Hôm nay ⇄ Tra cứu ⇄ Văn bản ⇄ Scan): vuốt trái = tab kế, phải = tab trước; bỏ qua khi ngón bắt đầu sát mép (vuốt lùi của Safari),
     trong ô nhập / bảng / hàng cuộn ngang, khi đang mở hộp hay xem văn bản; cần ≥ 80 px ngang, lệch dọc < 45 px, < 0,6 giây.
   ② vuốt xuống đóng hộp (thẻ khách, ☰ Mọi mục…): hộp đang ở đầu (chưa cuộn) → kéo theo ngón tay, thả > 100 px thì đóng, ít hơn thì trượt về. */
DTM.cuonNgang = function(el){ for(var e = el; e && e!==document.body; e = e.parentElement){ if(e.scrollWidth > e.clientWidth+2){ var o = getComputedStyle(e).overflowX; if(o==='auto' || o==='scroll') return true; } } return false; };
DTM.vuotTab = function(){ var bd = null;
  document.addEventListener('touchstart', function(e){ bd = null; if(e.touches.length!==1) return; var t = e.touches[0], el = e.target;
    if(t.clientX < 24 || t.clientX > innerWidth-24) return;
    if(document.getElementById('hop').classList.contains('hien') || document.getElementById('xem').classList.contains('hien')) return;
    if(el.closest && el.closest('input, textarea, select, table, .loc-khoi, #thanh-duoi, [contenteditable]')) return; if(DTM.cuonNgang(el)) return;
    bd = {x:t.clientX, y:t.clientY, t:Date.now()}; }, {passive:true});
  document.addEventListener('touchend', function(e){ if(!bd) return; var t = e.changedTouches[0], dx = t.clientX-bd.x, dy = t.clientY-bd.y, dt = Date.now()-bd.t; bd = null;
    if(Math.abs(dx) < 80 || Math.abs(dy) > 45 || dt > 600 || typeof DT_NUT==='undefined' || typeof dtDang!=='function') return;
    var ds = DT_NUT.filter(function(n){ return n[0]!=='them'; }), i = ds.map(function(n){ return n[0]; }).indexOf(dtDang()); if(i<0) return;
    var j = i + (dx<0 ? 1 : -1); if(j<0 || j>=ds.length) return; ds[j][3](); try { if(typeof dtVe==='function') dtVe(); } catch(er){} }, {passive:true}); };
DTM.vuotHop = function(){ var k = null, hop = document.getElementById('hop');
  hop.addEventListener('touchstart', function(e){ k = null; var hi = hop.querySelector('.hop-in'); if(!hi || e.touches.length!==1) return;
    if(e.target.closest && e.target.closest('input, textarea, select, table')) return; if(hi.scrollTop > 0) return;
    k = {y:e.touches[0].clientY, x:e.touches[0].clientX, hi:hi, d:0}; }, {passive:true});
  hop.addEventListener('touchmove', function(e){ if(!k) return; var d = e.touches[0].clientY - k.y;
    if(Math.abs(e.touches[0].clientX - k.x) > Math.abs(d) || d < 0 || k.hi.scrollTop > 0){ if(k.d){ k.hi.style.transform = ''; } k = null; return; }
    k.d = d; k.hi.classList.add('dtm-keo'); k.hi.style.transform = 'translateY('+Math.round(d*0.9)+'px)'; }, {passive:true});
  hop.addEventListener('touchend', function(){ if(!k) return; var hi = k.hi, d = k.d; k = null; hi.classList.remove('dtm-keo'); if(!d) return;
    hi.classList.add('dtm-tha');
    if(d > 100){ hi.style.transform = 'translateY(100%)'; setTimeout(function(){ hi.classList.remove('dtm-tha'); hi.style.transform = ''; try { dongHop(); } catch(er){} }, 200); }
    else { hi.style.transform = ''; setTimeout(function(){ hi.classList.remove('dtm-tha'); }, 240); } }, {passive:true}); };
var DTM_DA = false;
function dtmKhoi(){ if(DTM_DA) return; DTM_DA = true; DTM_HEP = true;
  [dtmKhoi1, dtmKhoi2, dtmKhoi3].forEach(function(f){ try { f(); } catch(e){ console.warn('dtm', e); } });
  try { document.body.classList.add('dtm-on'); } catch(e){}
  try { DTM.vuotTab(); DTM.vuotHop(); } catch(e){ console.warn('dtm vuốt', e); } }
document.addEventListener('click', function(e){ var d = e.target && e.target.closest && e.target.closest('.pv-cay .pv-dau'); if(d && !e.target.closest('button, select, input, a, [data-lenh]')) DTM.locDoi(); });
(function(){ var mq = null; try { mq = window.matchMedia && matchMedia('(max-width:600px)'); } catch(e){}
  var thu = function(){ try { if(!DTM_DA && mq && mq.matches) dtmKhoi(); } catch(e){} };
  if(DTM_HEP) dtmKhoi();
  else { window.addEventListener('load', thu); window.addEventListener('resize', thu); try { if(mq && mq.addEventListener) mq.addEventListener('change', thu); else if(mq && mq.addListener) mq.addListener(thu); } catch(e){} setTimeout(thu, 1500); } })();
