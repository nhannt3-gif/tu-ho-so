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
  if(!ds.length && o.ten && typeof slTimKH==='function') ds = slTimKH(o.ten, 8).map(function(r){ return r.m; });   /* tìm rộng theo tên (như ô tìm khách) */
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
    var bao_ = document.createElement('span'); bao_.className = 'qc-o tr-o'; e.parentNode.insertBefore(bao_, e); bao_.appendChild(e); bao_.insertAdjacentHTML('beforeend', trNut(id));
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
  else kq.innerHTML = '<span class="vang">Không có trên Mẫu 31 (gõ "'+coChuHTML(e.value)+'") — giữ tên anh gõ; lưu vào <i>Scan chờ sắp xếp</i>, có Mẫu 31 thì 🧹 Sắp xếp xếp lại.</span>';
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
      (sxSoThu(k) ? '<br><small class="vang">⚠ Khách đã có bản '+coChuHTML(sxLoaiScan(k))+' khác trong tủ — bản này đánh số'+coChuHTML(sxSoThu(k))+'; trùng thì xóa bớt ở 🔎 Rà CCCD (khối Bản trùng).</small>' : '');   /* 3.277 */
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
