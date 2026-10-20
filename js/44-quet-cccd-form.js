/* ==========================================================
   3.273 (anh duyệt 20/10/2026: "cạnh ô nhập họ tên sẽ là 1 nút quét, khi bấm sẽ mở cam hoặc quét từ ảnh CCCD chụp sẵn" — "như em đề xuất em code")
   🪪 QUÉT CCCD ĐIỀN FORM — Sổ hộ vay (mỗi người trong hộ; 01/UQ, 03/TD… lấy từ sổ) và 01/TD (người vay)
   - 3 cách lấy ảnh: 📷 Chụp (camera sau / webcam) · 🖼 Ảnh có sẵn (1–2 ảnh, bản photo 2 mặt, PDF) · 🗂 Lấy từ tủ (CCCD đã scan của khách).
   - Đọc bằng bộ đọc chung (docCCCD: QR → 3 dòng mã máy đọc); tên không dấu (mã máy đọc) → lấy tên có dấu trên Mẫu 31 nếu khớp số.
   - Hộp xác nhận: Thông tin · Trên thẻ · Đang có trong form; mặc định tích ô đang trống, ô khác nhau tô màu; bấm ✔ Điền. Nơi cấp tự gợi ý theo ngày cấp (hsoNoiCapGY).
   - ☑ Lưu ảnh CCCD vào tủ (tab Scan): rõ khách → "MãKH - Họ tên - CCCD", chưa rõ → "cccd-Họ tên - số" ở Scan chờ sắp xếp (nguyên tắc file 20/10).
   ========================================================== */
var QC = null;
function qcNut(loai, i){ return '<button type="button" class="nho qc-nut" data-lenh="qc.mo" data-dich="'+loai+'"'+(i!=null ? ' data-i="'+i+'"' : '')+' title="Quét CCCD (chụp / ảnh có sẵn / lấy từ tủ) — tự điền họ tên, ngày sinh, số CCCD, ngày cấp">🪪 Quét</button>'; }
function qcHo(){ var B = typeof hsoBo==='function' ? hsoBo() : null; return B && B.hoId ? hmTim(B.hoId) : null; }
function qcNguoi(d){
  if(d.loai==='tra') return {};   /* 3.285: mở từ ô tên (🪪 Đọc số CCCD) — chỉ cần số */
  if(d.loai==='hm') return (HM && HM.tv[d.i]) || null;
  var o = qcHo(); return o ? (o.tv[o.dung||0] || {}) : {};
}
function qcMo(d){
  QC = {dich:d, anh:[], r:null, tu:'', luuTu:true};
  var n = qcNguoi(d) || {}, h = document.getElementById('hop'), dangMo = h && h.classList.contains('hien');
  var html = '<div class="hop-tit">🪪 Quét CCCD — '+(d.loai==='tra' ? 'đọc số rồi tra Mẫu 31' : 'điền cho '+coChuHTML(n.ten || (d.loai==='hm' ? 'người '+(d.i+1) : 'người vay')))+'</div>'+
    '<div class="hop-phu">Đọc mã QR (đủ họ tên có dấu, ngày sinh, số, ngày cấp) hoặc 3 dòng mã máy đọc mặt sau. Đọc xong anh xem lại rồi bấm <b>✔ Điền</b>.</div>'+
    GD.hang([GD.nut({chu:'📷 Chụp', lenh:'qc.cam', chinh:1}), GD.nut({chu:'🖼 Ảnh có sẵn', lenh:'qc.file'}), GD.nut({chu:'🗂 Lấy từ tủ', lenh:'qc.tu', tat:!qcTuDs().length, tit:qcTuDs().length ? 'CCCD đã scan của khách này' : 'Tủ chưa có CCCD của khách này'})])+
    '<div id="qc-cam"></div><div id="qc-kq" class="sx-hd">Chọn cách lấy ảnh thẻ ở trên.</div>'+
    '<div class="sx-chan">'+GD.hang([GD.nut({chu:'Đóng', lenh:'qc.dong'}), GD.nut({chu:'✔ Điền', lenh:'qc.dien', chinh:1, tat:true})], true)+'</div>';
  if(dangMo) GD.moCon(function(){ moHop(html, true); }); else moHop(html, true);
}
/* CCCD đã scan trong tủ khớp người đang điền (mã KH của hộ · số CCCD · tên) */
function qcTuDs(){
  if(!QC) return [];
  var n = qcNguoi(QC.dich) || {}, o = QC.dich.loai==='hm' ? HM : qcHo(), kh = o && o.kh, so = rsSo(n.cccd);
  return (D.scan||[]).filter(function(k){ return k.che!=='tailieu' && k.matTruoc && ((kh && k.maKH===kh && (!n.ten || sxTenGan(k.ten, n.ten))) || (so && rsSo(k.cccd)===so) || (n.ten && sxTenGan(k.ten, n.ten))); }).slice(0, 8);
}
/* ---------- lấy ảnh ---------- */
function qcDungCam(){ if(QC && QC.st){ QC.st.getTracks().forEach(function(t){ t.stop(); }); QC.st = null; } }
function qcCam(){
  var e = document.getElementById('qc-cam'); if(!e) return;
  if(!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return qcFile(true);
  e.innerHTML = '<div class="qc-khung"><video id="qc-v" playsinline muted autoplay></video></div>'+GD.hang([GD.nut({chu:'📸 Chụp mặt này', lenh:'qc.chup', chinh:1}), GD.nut({chu:'Tắt camera', lenh:'qc.tatCam'})])+
    '<div class="sx-hd">Đưa thẻ vào giữa khung, đủ sáng. Thẻ cũ (QR mặt trước) chụp mặt trước; thẻ Căn cước mới chụp mặt sau (QR + 3 dòng chữ số).</div>';
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}, width:{ideal:1920}, height:{ideal:1080}}, audio:false}).then(function(st){
    var v = document.getElementById('qc-v'); if(!v || !QC){ st.getTracks().forEach(function(t){ t.stop(); }); return; }
    QC.st = st; v.srcObject = st; var p = v.play(); if(p && p.catch) p.catch(function(){});
    var hen = setInterval(function(){ if(!document.body.contains(v) || !v.offsetParent){ clearInterval(hen); qcDungCam(); } }, 1000);   /* hộp đóng (Esc / Đóng / sang hộp khác) → tắt camera */
  }, function(){ e.innerHTML = '<div class="sx-hd vang">Không mở được camera — chọn ảnh có sẵn.</div>'; qcFile(true); });
}
function qcChup(){
  var v = document.getElementById('qc-v'); if(!v || !v.videoWidth) return bao('Camera chưa sẵn sàng.', 3);
  var c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight; c.getContext('2d').drawImage(v, 0, 0);
  canvasRaBlob(c, 0.92).then(function(b){ QC.tu = 'cam'; QC.anh = QC.anh.concat([b]).slice(-2); qcDoc(); });
}
function qcFile(chup){
  var i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*,application/pdf'; i.multiple = !chup; if(chup) i.setAttribute('capture', 'environment');
  i.onchange = function(){ var fs = Array.prototype.slice.call(i.files||[]).slice(0, 2); if(!fs.length) return;
    Promise.all(fs.map(function(f){ return /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name) ? qcTrangPDF(f) : f; })).then(function(bs){ QC.tu = 'file'; QC.anh = bs.filter(Boolean); qcDoc(); }); };
  i.click();
}
function qcTrangPDF(f){
  return xongTV.then(function(){ if(!sanSangPDF()) return null; return f.arrayBuffer(); }).then(function(ab){ if(!ab) return null;
    return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise.then(function(d){ return d.getPage(1); }).then(function(pg){
      var v0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:Math.min(4, 2000/v0.width)}), c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return canvasRaBlob(c, 0.92); }); }); }).catch(function(){ return null; });
}
function qcTu(){
  var ds = qcTuDs(), e = document.getElementById('qc-cam'); if(!e) return;
  e.innerHTML = '<div class="sx-hd">CCCD đã có trong tủ — bấm để đọc:</div>'+GD.hang(ds.map(function(k){ return GD.nut({chu:'🪪 '+coChuHTML((k.maKH ? k.maKH+' · ' : '')+(k.ten||'')), lenh:'qc.chonTu', du:{id:k.id}}); }));
}
function qcChonTu(id){
  var k = (D.scan||[]).find(function(x){ return x.id===id; }); if(!k) return;
  QC.tu = 'tu'; QC.kTu = k; document.getElementById('qc-kq').innerHTML = '🔎 Đang lấy ảnh trong tủ…';
  sxAnhDoc(k).then(function(b){ QC.anh = b.filter(Boolean); qcDoc(); });
}
/* cắt khung thẻ trên ảnh chụp (bộ dò thẻ của Scan) — không thấy khung thì giữ ảnh gốc */
function qcCatThe(b){
  return anhTuBlob(b).then(function(im){ var k = null; try{ k = timKhungThe(im); }catch(e){}
    if(!k || !k.goc) return b;
    var kr = khoRa(xepGoc4(k.goc), 'the'), c = nanPhoiCanh(im, kr.goc, kr.rong, kr.cao);
    try{ if(huongThe(c).lat) c = xoayCanvas(c, 180); }catch(e){}
    return canvasRaBlob(c, 0.92); }).catch(function(){ return b; });
}
/* ---------- đọc + hộp xác nhận ---------- */
function qcDoc(){
  var e = document.getElementById('qc-kq'); if(!e || !QC.anh.length) return;
  e.innerHTML = '🔎 Đang đọc mã QR / mã máy đọc'+(QC.anh.length>1 ? ' (2 ảnh)' : '')+'…';
  var goc = QC.anh.slice();
  (QC.tu==='tu' ? Promise.resolve(goc) : Promise.all(goc.map(qcCatThe))).then(function(cat){ QC.cat = cat;
    return docCCCD(cat[0], cat[1]).then(function(r){ return r || (QC.tu==='tu' ? null : docCCCD(goc[0], goc[1])); }); })
    .then(function(r){ if(!r || !r.cccd){ e.innerHTML = '<span class="vang">Chưa đọc được.'+(QC.tu==='cam' ? ' Chụp thêm mặt còn lại (giữ ảnh vừa chụp), hoặc chụp gần, rõ hơn.' : ' Thử ảnh rõ hơn, hoặc chụp.')+'</span>'; return; }
      QC.r = r; if(QC.dich.loai==='tra') return trQuetXong(r); qcVeKQ(); }, function(er){ e.innerHTML = '<span class="vang">'+coChuHTML((er && er.message) || 'Lỗi khi đọc')+'</span>'; });
}
function qcGiaTri(){
  var r = QC.r, X = sxXacDinh({cccd:r.cccd, cmnd:r.cmnd, ten:r.ten}), ma = X.ma || '', c = ma ? KHO.dsKhach()[ma] : null;
  var coDau = /[^\x00-\x7F]/.test(r.ten||''), ten = coDau ? r.ten : (c && c.ten ? c.ten : r.ten||'');
  return {ma:ma, ten:ten ? tenHoaDau(String(ten).toLowerCase()) : '', tenNguon:coDau ? 'trên thẻ' : (c ? 'Mẫu 31 (thẻ chỉ có tên không dấu)' : 'không dấu — mã máy đọc'), ns:r.ns||'', cccd:r.cccd||'', ncap:r.ncap||''};
}
function qcVeKQ(){
  var e = document.getElementById('qc-kq'), r = QC.r, G = qcGiaTri(), n = qcNguoi(QC.dich) || {}, h = coChuHTML;
  QC.G = G; QC.chon = {};
  var dong = function(f, nhan, the, form, phu){ var khac = form && the && String(form)!==String(the), mac = !!the && !form; QC.chon[f] = mac;
    return '<tr class="'+(khac ? 'sx-lech' : '')+'"><td>'+(the ? '<input type="checkbox" data-lenh="qc.tich" data-su="change" data-f="'+f+'"'+(mac ? ' checked' : '')+'>' : '')+'</td><td>'+nhan+'</td><td><b>'+h(the||'')+'</b>'+(phu ? '<br><small>'+h(phu)+'</small>' : '')+'</td><td>'+h(form||'')+'</td></tr>'; };
  var tt = function(nhan, v){ return v ? '<tr><td></td><td>'+nhan+'</td><td>'+h(v)+'</td><td></td></tr>' : ''; };
  var ngay = function(v){ return v ? ngayVNsl(v) : ''; }, han = r.han || sxHanCCCD(r.ns, r.ncap);
  e.innerHTML = '<div class="xanh">✓ Đọc được thẻ <b>'+h(r.cccd)+'</b> ('+h(r.nguon||'')+')'+(G.ma ? ' · khớp Mẫu 31: <b>'+h(sxNhanKH(G.ma))+'</b>' : '')+'</div>'+
    '<table class="to-bang luoi sx-doc-bang qc-bang"><thead><tr><th>Điền</th><th>Thông tin</th><th>Trên thẻ</th><th>Đang có trong form</th></tr></thead><tbody>'+
    dong('ten', 'Họ tên', G.ten, n.ten, G.tenNguon!=='trên thẻ' ? G.tenNguon : '')+dong('ns', 'Ngày sinh', ngay(G.ns), ngay(n.ns))+dong('cccd', 'Số CCCD', G.cccd, n.cccd)+
    dong('ncap', 'Ngày cấp', ngay(G.ncap), ngay(n.ncap), G.ncap ? 'Nơi cấp tự ghi: '+hsoNoiCapGY(G.ncap) : '')+
    tt('CMND cũ (9 số)', r.cmnd)+tt('Giới tính', r.gt)+tt('Nơi thường trú', r.dc)+tt('Hạn thẻ', han ? ngayVNsl(han)+(han<ngayISO(nay()) ? ' — đã hết hạn' : '') : '')+'</tbody></table>'+
    '<div class="sx-hd">Mặc định tích ô đang trống; ô tô màu = khác với form — tích nếu muốn thay.</div>'+
    (QC.tu!=='tu' ? '<label class="sx-r"><input type="checkbox" data-lenh="qc.luuTu" data-su="change" checked> Lưu ảnh CCCD vào tủ (tab Scan, lên Drive) — '+(G.ma ? 'tên <i>'+h(G.ma+' - '+(KHO.dsKhach()[G.ma]||{}).ten+' - CCCD')+'</i>' : 'chưa có mã KH → <i>Scan chờ sắp xếp</i>')+'</label>' : '');
  qcDemNut();
}
function qcDemNut(){ var b = document.querySelector('#hop-in [data-lenh="qc.dien"]'), n = Object.keys(QC.chon||{}).filter(function(f){ return QC.chon[f]; }).length; if(!b) return; b.disabled = !n && !(QC.luuTu && QC.tu!=='tu' && QC.r); b.textContent = n ? '✔ Điền '+n+' ô' : (QC.luuTu && QC.tu!=='tu' && QC.r ? '✔ Chỉ lưu ảnh vào tủ' : '✔ Điền'); }
function qcDien(){
  if(!QC || !QC.r) return;
  var G = QC.G, d = QC.dich, n, o = null, B = null, so = 0;
  if(d.loai==='hm') n = HM && HM.tv[d.i];
  else { B = (typeof hsoBo==='function' && hsoBo()) || (L01 && L01.hoMoi ? L01.hoMoi() : null); o = B && hmTim(B.hoId); n = o ? (o.tv[o.dung||0] || (o.tv[o.dung||0] = {})) : null; if(o && o.kh) n = null; }
  if(!n) return baoLoi('Không có người để điền (hộ cũ theo Mẫu 31 — sửa trên hệ thống).');
  var gt = {ten:G.ten, ns:G.ns ? ngayVNsl(G.ns) : '', cccd:G.cccd, ncap:G.ncap ? ngayVNsl(G.ncap) : ''};
  Object.keys(QC.chon).forEach(function(f){ if(QC.chon[f] && gt[f]){ hmChuan(n, f, gt[f]); so++; } });
  if(QC.r.cmnd) n.cmnd = QC.r.cmnd;   /* CMND 9 số đọc từ thẻ — đối chiếu khi cần */
  if(o){ o.sua = B.sua = new Date().toISOString(); }
  var luuTu = QC.luuTu && QC.tu!=='tu' ? qcLuuTu() : Promise.resolve(null);
  qcDungCam(); dongHop(); luu();
  if(d.loai==='hm'){ if(typeof hmVe==='function') hmVe(); } else if(typeof hsoVe==='function') hsoVe();
  luuTu.then(function(k){ bao('🪪 Đã điền '+so+' ô từ CCCD'+(k ? ' · lưu ảnh vào tủ: '+(k.maKH ? k.maKH+' - '+k.ten : k.ten) : '')+'.', 6); });
}
/* lưu ảnh thẻ (đã cắt khung) vào tủ — như 1 bản quét CCCD */
function qcLuuTu(){
  var r = QC.r, G = QC.G, bs = (QC.cat || QC.anh).filter(Boolean); if(!bs.length) return Promise.resolve(null);
  var d = nay(), c = G.ma ? sxKhach(G.ma) : null;
  var k = {id:idMoi(), che:'the', tag:['CCCD'], ten:c ? c.ten : 'cccd-'+(G.ten||'Khach')+(r.cccd ? ' - '+r.cccd : ''), maKH:G.ma||'', cccd:r.cccd||'', cccdDoc:sxGhiDoc(r), ghi:'', ctrinh:[],
    ngay:ngayISO(d), gioQuet:d.toISOString(), taoLuc:d.toISOString(), suaLuc:d.toISOString(), may:maMayCua(), matTruoc:true, matSau:bs.length>1, tuForm:1};
  if(r.cmnd) k.cmnd = r.cmnd;
  if(c){ k.xa = c.xa; k.ap = c.ap; k.maXa = c.maXa; k.maAp = c.maAp; k.diem = c.diem||''; k.to = c.to||''; }
  return luuAnhHS(k.id+'_matTruoc', bs[0]).then(function(){ return bs[1] ? luuAnhHS(k.id+'_matSau', bs[1]) : null; }).then(function(){
    D.scan = D.scan || []; D.scan.push(k); if(typeof HS!=='undefined') HS.ds = D.scan; luu();
    if(D.cauHinh.dbSauLuu!==false && typeof henDongBoScan==='function') henDongBoScan();
    return (k.maKH ? sxAnhTuCCCD(k) : Promise.resolve()).then(function(){ return k; }); }).catch(function(){ return null; });
}
GD.dangKy('qc', {mo:function(el){ var i = el.getAttribute('data-i'); qcMo({loai:el.getAttribute('data-dich'), i:i==null ? null : +i}); },
  cam:function(){ qcCam(); }, file:function(){ qcFile(false); }, tu:function(){ qcTu(); }, chonTu:function(el){ qcChonTu(el.getAttribute('data-id')); },
  chup:function(){ qcChup(); }, tatCam:function(){ qcDungCam(); var e = document.getElementById('qc-cam'); if(e) e.innerHTML = ''; },
  tich:function(el){ QC.chon[el.getAttribute('data-f')] = !!el.checked; qcDemNut(); }, luuTu:function(el){ QC.luuTu = !!el.checked; qcDemNut(); },
  dien:function(){ qcDien(); }, dong:function(){ qcDungCam(); dongHop(); }});
