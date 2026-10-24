/* ==========================================================
   3.275 (anh 20/10/2026: "khi mở 1 file lên chỉnh sửa hay lưu mới anh sẽ đánh số CCCD hoặc họ tên hoặc mã KH, em làm 1 nút kiểm tra và cho ra tên chuẩn từ Mẫu 31";
   "làm cho tab Scan trước, sau này sẽ phát triển thống nhất tên và cấu trúc lưu cho hồ sơ vay, còn VB thì kiểu khác")
   🔎 TRA MẪU 31 cạnh ô tên — hộp Sửa bản quét (CCCD / tài liệu) · hộp Lưu mới (Tên file) · Chữ ký / Ảnh khách.
   - Gõ gì cũng nhận: 12 số = CCCD · 9 số = CMND cũ · 10 số = mã KH · chữ = họ tên (bỏ dấu, lệch nhỏ) · gõ lẫn ("cccd-Tên", "Tên 0721…").
   - Khớp chắc 1 khách (quy tắc 3.265, số CCCD chuẩn nhất) → tự gắn; nhiều / chưa chắc → danh sách nút tròn (ưu tiên tổ / ấp đang chọn); không có → giữ tên, chờ sắp xếp.
   - Gắn khách: tên = họ tên theo Mẫu 31, mã KH, địa bàn (hộp Sửa) → lưu là tên chuẩn "MãKH - Họ tên - Loại", đúng thư mục ngay.
   ========================================================== */
var TR = null;   /* {noi:'sua'|'luu'|'ka', id:ô nhập, ds:[mã]} */
function trNoi(id){ return id==='k-ten' ? 'sua' : id==='sx-ten' ? 'luu' : 'ka'; }
/* tìm khách: → {ma, theo} chắc | {ds:[mã], ly} chọn | {} */
function trTim(q, db){
  q = String(q||'').trim(); if(!q) return {};
  var so = q.replace(/\D/g, ''), b = sxBoc(q), o = {cccd:b.cccd, ma:b.ma, ten:b.ten, db:db};
  if(!o.cccd && /^\d{12}$/.test(so)) o.cccd = so;
  if(!o.ma && /^\d{10}$/.test(so)) o.ma = so;
  if(/^\d{9}$/.test(so)) o.cmnd = so;
  if(/^\d+$/.test(q.replace(/[\s.-]/g, ''))) o.ten = '';
  var KH = KHO.dsKhach();
  if(o.ma && KH[o.ma] && !o.ten && !o.cccd) return {ma:o.ma, theo:'mã KH anh gõ'};   /* anh tự gõ đúng mã KH → nhận luôn */
  var X = sxXacDinh(o);
  if(X.ma) return {ma:X.ma, theo:X.theo};
  var ds = (X.ds || []).slice(); if(X.goiY && ds.indexOf(X.goiY)<0) ds.unshift(X.goiY);
  if(!ds.length && o.ten && typeof KHO!=='undefined') ds = KHO.tim(o.ten, 8).map(function(r){ return r.m; });   /* tìm rộng theo tên (như ô tìm khách) */
  if(db && ds.length>1) ds.sort(function(a, b){ return (sxHopDB(b, db) ? 1 : 0)-(sxHopDB(a, db) ? 1 : 0); });   /* khách ở tổ / ấp đang chọn lên đầu */
  return ds.length ? {ds:ds.slice(0, 8), ly:X.ly || (X.ds ? 'trùng tên' : 'gần khớp')} : {};
}
function trNut(id){ return '<button type="button" class="nho tr-nut" data-lenh="tr.tra" data-o="'+id+'" title="Gõ số CCCD, mã KH hoặc họ tên rồi bấm — tra Mẫu 31, ra tên chuẩn">🔎 Tra Mẫu 31</button>'; }
/* gắn nút vào ô tên các hộp của tab Scan (mỗi lần mở hộp) */
function trGanNut(){
  ['k-ten', 'sx-ten', 'ka-ten', 'ka-ten2'].forEach(function(id){
    var e = document.getElementById(id); if(!e || e.getAttribute('data-tr')) return;
    if(id==='k-ten' && !(window.__k && (window.__k.che || (D.scan||[]).indexOf(window.__k)>=0))) return;
    e.setAttribute('data-tr', '1');
    var bao_ = document.createElement('span'); bao_.className = 'qc-o tr-o'; e.parentNode.insertBefore(bao_, e); bao_.appendChild(e); bao_.insertAdjacentHTML('beforeend', trNutDoc(id)+trNut(id));
    bao_.insertAdjacentHTML('afterend', '<div class="tr-kq" id="tr-kq-'+id+'"></div>');
  });
}
/* Enter trong ô tên (chưa tra giá trị này) → tra; bắt ở window trước phím chung của hộp (Enter = sang ô kế) */
window.addEventListener('keydown', function(ev){
  var e = ev.target; if(ev.key!=='Enter' || ev.ctrlKey || !e || !e.getAttribute || !e.getAttribute('data-tr')) return;
  if(!/\d{9,12}|\S{3,}/.test(e.value) || e.value===e.getAttribute('data-tr-da')) return;
  ev.preventDefault(); ev.stopPropagation(); trChay(e.id);
}, true);
var TR_MO_HOP = moHop;
moHop = function(){ var r = TR_MO_HOP.apply(this, arguments); try{ trGanNut(); }catch(e){} return r; };
function trDB(noi){   /* tổ / ấp đang chọn (hộp Sửa) → ưu tiên */
  if(noi!=='sua' || !window.__k) return null;
  var k = window.__k, to = (document.getElementById('k-to')||{}).value || k.to, ap = (document.getElementById('k-ap')||{}).value || k.ap;
  return sxDBQuet({to:to, ap:ap});
}
function trChay(id){
  var e = document.getElementById(id), kq = document.getElementById('tr-kq-'+id); if(!e || !kq) return;
  if(!Object.keys(KHO.dsKhach()).length){ if(!SL_SAN && typeof slNap==='function') return slNap().then(function(){ trChay(id); }); kq.innerHTML = '<span class="vang">Chưa có Mẫu 31 — nạp ở tab 📈 Số liệu › Nạp & KT.</span>'; return; }
  var noi = trNoi(id), R = trTim(e.value, trDB(noi)); TR = {noi:noi, id:id, ds:R.ds || []};
  if(R.ma) return trGan(R.ma, 'khớp '+R.theo);
  if(R.ds) kq.innerHTML = '<div class="sx-hd">'+(R.ly ? coChuHTML(R.ly)+' — ' : '')+'chọn đúng khách:</div>'+R.ds.map(function(m){
      return '<label class="sx-r"><input type="radio" name="tr-'+id+'" data-lenh="tr.chon" data-su="change" data-ma="'+m+'"> <span class="sx-kh-ten">'+coChuHTML(sxNhanKH2(m))+'</span></label>'; }).join('');
  else {
    if(!KHO.coKy() && !e.__napTT && typeof kyChungLay==='function' && kyChungLay()){ e.__napTT = 1; kq.innerHTML = '<small>Không có trong danh bạ khách — đang dựng bảng tổ kỳ '+coChuHTML(kyChungLay())+' để tra tổ trưởng…</small>';   /* tab Scan chưa dựng kỳ → dựng kỳ chung rồi tra lại */
      return KHO.nap(kyChungLay()).then(function(K){ toGanNeuTrong(K); }).catch(function(){}).then(function(){ trChay(id); }); }
    var tt = trTimTT(e.value); if(tt) return trGanTT(tt);   /* 3.321 (anh 23/10 "CCCD này là của tổ trưởng nhưng app báo không có trong Mẫu 31"): tổ trưởng không vay → tra bảng tổ */
    var th = e.__the, so0 = String(e.value||'').replace(/\D/g, '');
    if(th && th.ten && th.so===so0){ e.value = th.ten; e.setAttribute('data-tr-da', th.ten); if(noi==='sua' && window.__k) window.__k.ten = th.ten;   /* không có ở đâu → tên đọc trên thẻ (QR), không để số trong ô tên */
      kq.innerHTML = '<span class="vang">CCCD '+coChuHTML(so0)+' không có trên Mẫu 31 / bảng tổ — lấy họ tên trên thẻ: <b>'+coChuHTML(th.ten)+'</b>; lưu vào <i>Scan chờ sắp xếp</i>, có Mẫu 31 thì 🧹 Sắp xếp xếp lại.</span>'; return; }
    kq.innerHTML = '<span class="vang">Không có trên Mẫu 31 (gõ "'+coChuHTML(e.value)+'") — giữ tên anh gõ; lưu vào <i>Scan chờ sắp xếp</i>, có Mẫu 31 thì 🧹 Sắp xếp xếp lại.</span>'; }
}
/* 3.321: tổ trưởng (không có món vay nên không có trong danh bạ khách) — tra BẢNG TỔ dựng sẵn: CCCD tổ trưởng, hoặc đúng tên tổ trưởng */
function trTimTT(q){
  var so = String(q||'').replace(/\D/g, ''), ten = /^\d+$/.test(String(q||'').replace(/[\s.-]/g, '')) ? '' : sxChuan(q), ra = [];
  if(!(so.length===12 || so.length===9) && !ten) return null;
  KHO.maTo().forEach(function(m){ var t = KHO.to(m), b = KHO.bangTo(m) || {}; if(!t || toLaTT(t)) return;
    var cc = String(b.cccd||'').replace(/\D/g, ''), tt = trTenTT(m, t);   /* tên tổ trưởng: danh bạ tổ (cột Tổ trưởng Mẫu 31) — tên tổ chỉ dùng khi danh bạ chưa có */
    if(so && cc && cc===so) ra.push({ma:m, t:t, b:b, tt:tt, theo:'CCCD tổ trưởng (bảng tổ)'});
    else if(!so && ten && tt && sxChuan(tt)===ten) ra.push({ma:m, t:t, b:b, tt:tt, theo:'tên tổ trưởng'}); });
  return ra.length===1 ? ra[0] : null; }
function trTenTT(m, t){ var d = KHO.toDanhBa(m) || {}; return tenHoaDau(d.ten || t.ten || ''); }
function trGanTT(x){
  var T = TR; if(!T) return; var e = document.getElementById(T.id), kq = document.getElementById('tr-kq-'+T.id), t = x.t, d = KHO.toDanhBa(x.ma) || {};
  if(e){ e.value = x.tt; e.setAttribute('data-tr-da', x.tt); }
  if(T.noi==='sua' && window.__k){ var k = window.__k; k.ten = x.tt; if(x.b.kh) k.maKH = x.b.kh; k.cccd = k.cccd || String(x.b.cccd||'').replace(/\D/g, ''); delete k.chuaKhai;
    if(k.che==='the' && (k.tag||[]).indexOf('CCCD')<0) k.tag = ['CCCD'];
    k.xa = t.tenXa || k.xa; k.ap = t.tenThon || k.ap; k.diem = d.diem || (k.xa && k.ap && typeof diemCuaAp==='function' ? diemCuaAp(k.xa, k.ap) : '') || k.diem; k.to = x.ma+' — '+(d.ten || t.ten);
    var g = document.getElementById('k-ghi'), gv = g ? g.value : null, db = document.getElementById('k-diaban'); if(db && typeof veDiaBan==='function') db.innerHTML = veDiaBan(k);
    if(gv!=null && document.getElementById('k-ghi')) document.getElementById('k-ghi').value = gv; }
  if(kq) kq.innerHTML = '<span class="xanh">✓ Tổ trưởng <b>'+coChuHTML(x.tt)+'</b> · Tổ '+coChuHTML(x.ma)+(t.tenThon ? ' · '+coChuHTML(t.tenThon) : '')+(t.tenXa ? ' · '+coChuHTML(t.tenXa) : '')+(x.b.kh ? ' · CIF '+coChuHTML(x.b.kh) : '')+'</span> <small>(khớp '+coChuHTML(x.theo)+' — tổ trưởng không có món vay nên không có trong danh bạ khách Mẫu 31)</small>';
}
/* gắn khách đã chọn vào hộp đang mở */
function trGan(ma, theo){
  var T = TR; if(!T) return; var e = document.getElementById(T.id), kq = document.getElementById('tr-kq-'+T.id), c = sxKhach(ma), C = KHO.dsKhach()[ma] || {}, ten = '';
  if(T.noi==='sua'){
    var k = window.__k; k.maKH = ma; k.cccd = k.cccd || rsSo(C.cccd); delete k.chuaKhai;
    if(k.che==='the' && (k.tag||[]).indexOf('CCCD')<0) k.tag = ['CCCD'];
    k.xa = c.xa || k.xa; k.ap = c.ap || k.ap; k.diem = c.diem || (k.xa && k.ap && typeof diemCuaAp==='function' ? diemCuaAp(k.xa, k.ap) : '') || k.diem;
    k.to = c.to ? (C.to ? C.to+' — '+c.to : c.to) : k.to;
    var giu = ['k-ghi'].map(function(i){ var x = document.getElementById(i); return x ? x.value : null; });
    var db = document.getElementById('k-diaban'); if(db && typeof veDiaBan==='function') db.innerHTML = veDiaBan(k);
    if(giu[0]!=null && document.getElementById('k-ghi')) document.getElementById('k-ghi').value = giu[0];
    ten = c.ten; k.ten = ten; if(e) e.value = ten;
    if(kq) kq.innerHTML = '<span class="xanh">✓ '+coChuHTML(sxNhanKH(ma))+'</span> <small>('+coChuHTML(theo||'anh chọn')+')</small><br><small>Lưu thành <b>'+coChuHTML(tenScanDrive(k))+'</b> ở <b>'+coChuHTML(duongScan(k).replace(D.cauHinh.thumuc+' / ', ''))+'</b> — địa bàn đã chọn theo Mẫu 31.</small>'+
      (sxSoThu(k) && k.che==='tailieu' ? '<br><small>Khách đã có '+coChuHTML(sxLoaiScan(k))+' khác — bản này là bản thứ'+coChuHTML(sxSoThu(k))+'.</small>' : '')+
      (sxSoThu(k) && k.che!=='tailieu' ? '<br><small class="vang">⚠ Khách đã có bản '+coChuHTML(sxLoaiScan(k))+' khác trong tủ — bản này đánh số'+coChuHTML(sxSoThu(k))+'; trùng thì xóa bớt ở 🔎 Rà CCCD (khối Bản trùng).</small>' : '');   /* 3.277 */
  }
  else if(T.noi==='luu'){
    var nh = typeof scanNhom==='function' ? scanNhom() : [[]];
    if(nh.length>1){ if(kq) kq.innerHTML = '<span class="vang">Bản nhiều người — chọn khách từng người ở 🗄 Lưu vào app + khai ngay.</span>'; return; }
    SXK[0] = sxKhach(ma); SXK[0].cccd = SXK[0].cccd || rsSo(C.cccd);
    var loai = SC.che==='the' ? 'CCCD' : 'Tài liệu'; ten = sxTenChuan(ma, c.ten, loai, '').replace(/\.$/, '');
    if(SX) SX.ten = ten; if(e) e.value = ten;
    if(kq) kq.innerHTML = '<span class="xanh">✓ '+coChuHTML(sxNhanKH(ma))+'</span> <small>('+coChuHTML(theo||'anh chọn')+')</small> '+GD.nut({chu:'🗄 Lưu đúng khách này', lenh:'tr.luuTu', chinh:1, tit:'Lưu vào tủ gắn mã KH — tên chuẩn, đúng thư mục'});
  }
  else {
    ten = ma+' - '+c.ten; if(e){ e.value = ten; if(typeof KA!=='undefined'){ KA.ten = ten; KA.tenLuc = Date.now(); } try{ e.dispatchEvent(new Event('input', {bubbles:true})); }catch(er){} }
    if(kq) kq.innerHTML = '<span class="xanh">✓ '+coChuHTML(sxNhanKH(ma))+'</span> <small>— lưu xong app tự đặt tên chuẩn "'+coChuHTML(ma+' - '+c.ten)+' - Chữ ký / Ảnh"</small>';
  }
  if(e) e.setAttribute('data-tr-da', e.value);
}
GD.dangKy('tr', {tra:function(el){ trChay(el.getAttribute('data-o')); }, chon:function(el){ trGan(el.getAttribute('data-ma'), 'anh chọn'); },
  luuTu:function(){ if(typeof scanLuuTu==='function') scanLuuTu(); }});
/* hộp Sửa bản quét: máy không có ảnh 2 mặt (quét ở máy khác / bản cũ chỉ PDF) → lấy ảnh trên Drive, không có thì cắt từ PDF (3.271) rồi hiện */
var TR_VE_ANH_CU = veAnhKhach;
veAnhKhach = function(){
  TR_VE_ANH_CU();
  var k = window.__k, e = document.getElementById('k-xem'); if(!k || !e || !(k.matTruoc || k.matSau) || !k.driveId || k.catBo) return;
  SX_DOC_ANH_CU(k.id+'_matTruoc').then(function(b){ if(b || window.__k!==k || !coTheNoiDrive()) return;
    e.insertAdjacentHTML('afterbegin', '<div class="sx-hd" id="k-xem-tai">☁ Máy này chưa có ảnh thẻ — đang lấy từ Drive…</div>');
    return sxAnhDoc(k).then(function(bs){ if(window.__k!==k) return; var t = document.getElementById('k-xem-tai'); if(t) t.remove();
      if(!(bs && bs[0]) || (!k.catTuPDF && !k.anhDrive)) return;   /* không lấy được / chỉ còn cả trang PDF → để khung xem phải hiện PDF */
      TR_VE_ANH_CU(); if(k.catTuPDF) e.insertAdjacentHTML('afterbegin', '<div class="sx-hd">✂ Ảnh cắt từ PDF trên Drive — lệch thì xem lại ở 🔎 Rà CCCD.</div>'); }); });
};
/* 3.279 (anh: "2 tài liệu … chọn sửa, Tra Mẫu 31 ra đúng tên, nhưng bấm Lưu thì báo chưa có trang nào"): bản tài liệu chỉ có PDF trên Drive
   → nút ☁ Tải trang từ Drive: tải PDF về làm nguồn, gắn các trang vào bản (xem / thêm / bỏ trang như bản quét trong máy) */
function tlTaiTrang(){
  var k = window.__k; if(!k || !k.driveId) return;
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive.');
  batChay(false, 'Đang tải PDF từ Drive…');
  taiPDFDrive(k.driveId).then(function(bl){ return catPDFNguon(new File([bl], 'drive.pdf', {type:'application/pdf'})); })
    .then(function(ds){ tatChay(); if(window.__k!==k) return; k.trang = ds.map(function(o){ return ghepTrangPDF(o); }); if(typeof veTrangScan==='function') veTrangScan(); bao('Đã tải '+ds.length+' trang từ Drive.', 4); },
      function(e){ tatChay(); baoLoi('Chưa tải được PDF: '+(e && e.message || e)); });
}
GD.dangKy('tl', {taiTrang:function(){ tlTaiTrang(); }});

/* ---------- 3.285 (anh 20/10: "chỗ lưu tên có nút Tra Mẫu 31 sau khi đã đánh số CCCD — anh muốn app có nút đọc số CCCD điền vào và tự tra Mẫu 31 luôn, tự động") ----------
   🪪 Đọc số CCCD cạnh 🔎 Tra Mẫu 31: app tự tìm số → điền ô tên → tự tra (khớp chắc → gắn khách, như 3.275).
   Nguồn số theo thứ tự: ① bản này là CCCD → đọc ảnh thẻ (QR / mã máy đọc, ảnh trên Drive / cắt từ PDF như 3.271)
   ② tài liệu (đơn vay, hợp đồng…) → đọc chữ số trang 1–2, tìm số 12 chữ số bắt đầu 0 (nhiều số → ưu tiên số có trên Mẫu 31)
   ③ không ra → mở hộp quét CCCD (📷 chụp / 🖼 ảnh có sẵn / 🗂 lấy từ tủ, 3.273) — đọc xong tự điền + tra.
   Gõ đủ 12 số CCCD (9 số CMND, 10 số mã KH) vào ô → tự tra luôn, không cần Enter. */
function trNutDoc(id){ return '<button type="button" class="nho tr-nut" data-lenh="tr.doc" data-o="'+id+'" title="App tự đọc số CCCD (ảnh thẻ của bản này, hoặc chữ số trên trang tài liệu; không ra thì chụp thẻ) → điền vào ô → tự tra Mẫu 31">🪪 Đọc số CCCD</button>'; }
/* số CCCD trong chữ đọc được: mỗi dòng bỏ khoảng trắng / dấu chấm giữa các nhóm số */
function trSoTrongChu(t){
  /* chữ số lẫn nhãn ("So" đọc thành "50") → dải số dài hơn 12: xét mọi đoạn 12 số bắt đầu 0, đoạn có trên Mẫu 31 trước, không có thì lấy đoạn cuối (số nằm sau nhãn) */
  var co = [], khac = [], them = function(a, x){ if(co.indexOf(x)<0 && khac.indexOf(x)<0) a.push(x); };
  String(t||'').split(/\n/).forEach(function(d){ (d.replace(/[ .\t]/g, '').match(/\d{12,}/g) || []).forEach(function(x){
    var c = []; for(var i=0;i+12<=x.length;i++) if(x.charAt(i)==='0') c.push(x.substr(i, 12));
    var dung = c.filter(function(so){ return sxXacDinh({cccd:so}).ma; });
    if(dung.length) dung.forEach(function(so){ them(co, so); }); else if(c.length) them(khac, c[c.length-1]); }); });
  return co.concat(khac);
}
/* ảnh / trang của bản đang mở trong hộp */
function trNguon(id){
  var noi = trNoi(id), k = noi==='sua' ? window.__k : null;
  if(noi==='luu') return SC.che==='the' ? {the:true} : {trang:(HANG||[]).filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; }).slice(0, 2).map(hangRaTrang)};
  if(k && k.che!=='tailieu') return {the:true, k:k};
  if(k) return {trang:(k.trang||[]).slice(0, 2), k:k};
  return {};
}
function trTrangCanvas(t){
  if(laTrangPDF(t)) return anhTrangPDF(t, 1800).then(function(u){ return fetch(u).then(function(r){ return r.blob(); }); }).then(sxCanvas);
  return docAnhHS(t).then(function(b){ return b ? sxCanvas(b) : null; });
}
function trDoc(id){
  var e = document.getElementById(id), kq = document.getElementById('tr-kq-'+id); if(!e || !kq) return;
  var N = trNguon(id), xong = function(so, tu, ten){ e.__the = {so:so, ten:ten || ''}; e.value = so; e.removeAttribute('data-tr-da'); kq.innerHTML = '<small>🪪 Đọc được số <b>'+coChuHTML(so)+'</b> ('+coChuHTML(tu)+') — đang tra Mẫu 31…</small>'; trChay(id); };
  var moQuet = function(ly){ kq.innerHTML = '<span class="vang">'+coChuHTML(ly)+' — mở quét CCCD (chụp / ảnh có sẵn / lấy từ tủ).</span>'; qcMo({loai:'tra', o:id}); };
  /* ① bản quét CCCD đang lưu mới: bộ đọc tự chạy sau khi quét (3.264) */
  if(trNoi(id)==='luu' && N.the){ var x = (typeof SX_DOC!=='undefined' && SX_DOC[0]) || {};
    if(x.dang) return void(kq.innerHTML = '<small>🔎 App đang đọc thẻ vừa quét — chờ chút rồi bấm lại.</small>');
    return x.cccd ? xong(x.cccd, 'thẻ vừa quét', x.nguon==='QR' ? x.ten : '') : moQuet('Thẻ vừa quét chưa đọc được số'); }
  kq.innerHTML = '<small>🪪 Đang đọc số CCCD'+(N.the ? ' trên ảnh thẻ' : N.trang && N.trang.length ? ' trên trang tài liệu (chữ số)' : '')+'…</small>';
  var p = N.the && N.k ? sxAnhDoc(N.k).then(function(b){ return b[0] || b[1] ? docCCCD(b[0], b[1]) : null; }).then(function(r){ return r && r.cccd ? {so:r.cccd, tu:'ảnh thẻ — '+(r.nguon||''), ten:r.nguon==='QR' ? r.ten : ''} : null; })   /* 3.321: giữ họ tên trên thẻ (QR có dấu) */
    : N.trang && N.trang.length ? N.trang.reduce(function(pp, t){ return pp.then(function(kq0){ return kq0 || trTrangCanvas(t).then(function(c){ return c ? sxOCR(c, '0123456789') : ''; })
        .then(function(chu){ var ds = trSoTrongChu(chu); return ds.length ? {so:ds[0], tu:'chữ số trên trang tài liệu'+(ds.length>1 ? ', '+ds.length+' số — lấy số có trên Mẫu 31' : '')} : null; }); }); }, Promise.resolve(null))
    : N.k && N.k.driveId ? sxTrangPDF(N.k).then(function(c){ return c ? sxOCR(c, '0123456789') : ''; }).then(function(chu){ var ds = trSoTrongChu(chu); return ds.length ? {so:ds[0], tu:'chữ số trên trang PDF (Drive)'} : null; })
    : Promise.resolve(null);
  p.then(function(r){ if(document.getElementById(id)!==e) return; if(r) xong(r.so, r.tu, r.ten); else moQuet(N.the ? 'Chưa đọc được số trên ảnh thẻ' : 'Không thấy số CCCD trên trang'); },
    function(er){ if(document.getElementById(id)===e) moQuet('Chưa đọc được ('+((er && er.message) || 'lỗi')+')'); });
}
/* hộp quét CCCD (3.273) mở từ ô tên: đọc xong → đóng hộp con, điền số vào ô tên, tra Mẫu 31 */
function trQuetXong(r){
  var id = QC && QC.dich && QC.dich.o; qcDungCam(); dongHop();
  setTimeout(function(){ var e = document.getElementById(id); if(!e) return; e.__the = {so:r.cccd, ten:r.nguon==='QR' ? r.ten || '' : ''}; e.value = r.cccd; e.removeAttribute('data-tr-da'); trChay(id); }, 50);
}
/* gõ đủ số → tự tra (không cần Enter) */
document.addEventListener('input', function(ev){
  var e = ev.target; if(!e || !e.getAttribute || !e.getAttribute('data-tr')) return;
  var so = String(e.value||'').replace(/[\s.]/g, '');
  if(/^\d{9}$|^\d{10}$|^\d{12}$/.test(so) && e.value!==e.getAttribute('data-tr-da')){ clearTimeout(e.__tr); e.__tr = setTimeout(function(){ if(document.body.contains(e)) trChay(e.id); }, 350); }
}, true);
GD.dangKy('tr', {doc:function(el){ trDoc(el.getAttribute('data-o')); }});
