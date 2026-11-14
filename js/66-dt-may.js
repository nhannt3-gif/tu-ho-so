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

/* ===== 3.535 (anh 14/11): điện thoại — Tra cứu KH gọn + Văn bản gửi cả VB / 1 trang. Chỉ ≤ 600 px, bọc hàm gốc (máy tính không đổi). =====
   - Lọc địa bàn ở Tra cứu: gọn 1 dòng, bấm dòng "LỌC ĐỊA BÀN" mở / gọn (cờ trên body → giữ qua lần vẽ lại).
   - Xem văn bản: mỗi trang có nút "📤 Gửi trang này" (tách 1 trang → bảng chia sẻ Zalo / Mail); nút dưới "📤 Gửi cả VB"; tích nhiều trang → "📤 Gửi N trang". */
var DTM = {
  locDoi: function(){ document.body.classList.toggle('dtm-loc-mo'); },
  gui1: function(i){ if(!i) return; var cu = trangChon; trangChon = {}; trangChon[i] = 1; try { guiTrangChon(); } finally { trangChon = cu; } },
  nutTrang: function(n){ if(n!=='lon') return; var S = XEM.lon; if(!S || !S.khung || S.tong<2) return;
    S.khung.forEach(function(box, k){ if(box.querySelector('.dtm-gui1')) return; var b = document.createElement('button'); b.type = 'button'; b.className = 'dtm-gui1';
      b.setAttribute('data-lenh', 'dtm.gui1'); b.setAttribute('data-a1', String(k+1)); b.textContent = '📤 Gửi trang này'; b.title = 'Gửi riêng trang '+(k+1)+' (Zalo, Mail…)'; box.appendChild(b); }); },
  /* 3.536 (anh 14/11 "load đọc nhanh các VB đã lưu"): ⬇ Tải sẵn — VB ⭐ + 40 VB mới nhất có trên Drive mà máy chưa có → cất máy (layNoiDung tự lưu), lần sau mở ngay, không cần mạng */
  taiSanDs: function(){ var ds = (D.vanBan||[]).filter(function(m){ return m && (m.driveId || m.tuKhay) && !m.khongLuu; });
    ds.sort(function(a, b){ return String(b.ngay||'').localeCompare(String(a.ngay||'')); });
    var sao = ds.filter(function(m){ return typeof laSao==='function' && laSao(m); }), moi = ds.filter(function(m){ return sao.indexOf(m)<0; }).slice(0, 40);
    return sao.concat(moi); },
  taiSan: function(){ if(DTM.dangTai) return bao('Đang tải sẵn — chờ xong lượt này.', 3);
    var ds = DTM.taiSanDs(); if(!ds.length) return bao('Chưa có văn bản nào trên Drive để tải sẵn.', 4);
    DTM.dangTai = true; var can = [], i = 0, xong = 0, loi = 0;
    Promise.all(ds.map(function(m){ return docFile(m.id).then(function(b){ if(!b) can.push(m); }).catch(function(){ can.push(m); }); })).then(function(){
      if(!can.length){ DTM.dangTai = false; return bao('✓ '+ds.length+' văn bản (⭐ + mới nhất) đã có sẵn trong máy — mở ngay, không cần mạng.', 5); }
      bao('⬇ Đang tải sẵn '+can.length+' văn bản về máy…', 4);
      var tiep = function(){ if(i>=can.length){ DTM.dangTai = false; return bao('✓ Đã tải sẵn '+xong+' / '+can.length+' văn bản'+(loi ? ' · '+loi+' chưa tải được (kiểm tra mạng / Nối Drive rồi bấm lại)' : '')+' — lần sau mở ngay.', 7); }
        var m = can[i++]; layNoiDung(m).then(function(b){ if(b) xong++; else loi++; }, function(){ loi++; }).then(function(){ if(i % 5===0) bao('⬇ Tải sẵn '+i+' / '+can.length+'…', 3); tiep(); }); };
      tiep(); }); },
  nhan: function(){ var n = Object.keys(trangChon||{}).length, b = document.getElementById('nut-gui-trang'); if(b) b.textContent = '📤 Gửi '+n+' trang';
    var g = document.querySelector('#xem .xem-day [data-lenh="khung.guiFileMenu"]'); if(g) g.textContent = n ? '📤 Cả VB' : '📤 Gửi cả VB';
    var d = document.querySelector('#xem .xem-day [data-lenh="khung.dongXem"]'); if(d) d.textContent = '✕ Đóng'; }
};
if(DTM_HEP){
  if(typeof GD!=='undefined') GD.dangKy('dtm', {gui1:function(el){ DTM.gui1(+gdA(el, 1)); }, taiSan:function(){ DTM.taiSan(); }});
  if(typeof moThemTab==='function'){ var dtmThemTabGoc = moThemTab; moThemTab = function(ev, tab){   /* ⋯ của tab Văn bản: thêm ⬇ Tải sẵn ở đầu menu */
    if(tab==='vanBan' && TL_OPT.vanBan){ var o = TL_OPT.vanBan, cu = o.themPhu; o.themPhu = '<button data-lenh="dtm.taiSan" title="Tải về máy VB ⭐ + 40 VB mới nhất — đọc nhanh, không cần mạng">⬇ Tải sẵn VB về máy</button>'+(cu||'');
      try { return dtmThemTabGoc.apply(this, arguments); } finally { o.themPhu = cu; } }
    return dtmThemTabGoc.apply(this, arguments); }; }
  document.addEventListener('click', function(e){ var d = e.target.closest && e.target.closest('#tc-cay .pv-dau'); if(d && !e.target.closest('button, select, input, a')) DTM.locDoi(); });
  if(typeof veTrang==='function'){ var dtmVeTrangGoc = veTrang; veTrang = function(n){ var r = dtmVeTrangGoc.apply(this, arguments); try { DTM.nutTrang(n); } catch(e){} return r; }; }
  if(typeof capNhatThanhChon==='function'){ var dtmChonGoc = capNhatThanhChon; capNhatThanhChon = function(){ var r = dtmChonGoc.apply(this, arguments); try { DTM.nhan(); } catch(e){} return r; }; }
  try { DTM.nhan(); } catch(e){}
}
