/* ===== 3.416 (anh 31/10: "gặp CCCD tổ trưởng dù cũ hay mới cũng lưu trữ, sau này có 1 chỗ lọc ra CCCD của tổ trưởng xem có lưu đủ hay chưa"
   + "có kiểm tổ phó hiện tại, tổ trưởng cũ cũng lưu và lọc riêng") — CẮM RÚT: bỏ dòng <script> là mất phần tổ trưởng cũ + màn kiểm, phần khác không đổi.
   ① TỔ TRƯỞNG CŨ: CCCD không có trong Mẫu 31 / bảng tổ kỳ này → tra mọi File Tổ trưởng đã nạp (dsTimCCCD, js/28) → lưu như khách: mã = CIF, tên chuẩn
      "CIF - Họ tên - CCCD", vaiTro 'ttCu'. ② 👑 KIỂM CCCD tổ trưởng · tổ phó HIỆN TẠI (Danh sách tổ kỳ mới nhất): đã lưu / chưa — khớp bản CCCD đã lưu theo
      mã KH (CIF) hoặc số CCCD; lọc Chỉ thiếu; danh sách riêng tổ trưởng cũ đã lưu; Excel. Gọi từ 📊 Kiểm tra hồ sơ scan. ===== */
function sxKhachTTCu(c, cccd){ var so = String(cccd||'').replace(/\D/g, ''), cif = String(c.cif||'').trim();
  return {ma:cif, khoa:cif ? '' : so, ten:tenHoaDau(c.ten||''), cccd:so, xa:c.tenXa||'', ap:c.tenThon||'', maXa:'', maAp:c.thon||'', to:'', diem:'', laTT:true, vaiTro:'ttCu', maTo:c.to||'', kyTT:c.ky||''}; }
function trGanTTCu(c, so, id){   /* 🔎 Tra Mẫu 31 ở hộp Lưu sau quét: khớp tổ trưởng cũ */
  var e = document.getElementById(id), kq = document.getElementById('tr-kq-'+id), x = sxKhachTTCu(c, so);
  if(typeof TR!=='undefined' && TR && TR.noi==='luu' && typeof SXK!=='undefined'){ var nh = typeof scanNhom==='function' ? scanNhom() : [[]];
    if(nh.length===1){ SXK[0] = x; var tn = sxTenTT(x, SC.che==='the' ? 'CCCD' : 'Tài liệu'); if(typeof SX!=='undefined' && SX) SX.ten = tn; if(e){ e.value = tn; e.setAttribute('data-tr-da', tn); } } }
  else if(e){ e.value = x.ten; e.setAttribute('data-tr-da', x.ten); }
  if(kq) kq.innerHTML = '<span class="xanh">✓ Tổ trưởng CŨ <b>'+coChuHTML(x.ten)+'</b> · tổ '+coChuHTML(c.to)+(c.tenThon ? ' · '+coChuHTML(c.tenThon) : '')+(c.tenXa ? ' · '+coChuHTML(c.tenXa) : '')+(c.cif ? ' · CIF '+coChuHTML(c.cif) : '')+'</span> <small>(khớp CCCD File Tổ trưởng '+coChuHTML(slKyChu(c.ky))+' — lưu như tổ trưởng, lọc riêng ở 👑 Kiểm CCCD tổ trưởng)</small>';
}
/* ---------- ② màn kiểm ---------- */
var TTK = {loc:'tat', B:null};
function ttkCo(){   /* bản CCCD đã lưu: theo mã KH và theo số CCCD */
  var ma = {}, so = {}; (D.scan||[]).forEach(function(k){ if(k.che==='tailieu') return; if(k.maKH) ma[k.maKH] = k; [k.cccd, k.khoaCCCD].forEach(function(s){ s = String(s||'').replace(/\D/g, ''); if(s) so[s] = k; }); });
  return {ma:ma, so:so}; }
function ttkDung(K){
  var co = ttkCo(), dsK = KHO.dsKhach() || {}, X = {}, thu = [];
  Object.keys(K.to||{}).forEach(function(m){ var t = K.to[m]; if(!t || toLaTT(t)) return; var ds = t.ds || {}, tt0 = t.tt || {};   /* Danh sách tổ (CIF MATT, CMT) → Thông tin tổ trưởng → Mẫu 31 (Mã CIF TT) */
    var nguoi = [];
    var cif = String(ds.ttKH || tt0.ttKH || t.cif || ''), tt = {vai:'Tổ trưởng', ten:tenHoaDau(ds.toTen || tt0.toTen || t.ten || ''), cif:cif, cccd:String(ds.cccd || tt0.cccd || (dsK[cif] || {}).cccd || '').replace(/\D/g, '')};
    if(tt.ten || tt.cif) nguoi.push(tt);
    if(ds.phoKH || ds.phoTen){ var c = dsK[ds.phoKH] || {}; nguoi.push({vai:'Tổ phó', ten:tenHoaDau(ds.phoTen || c.ten || ''), cif:String(ds.phoKH||''), cccd:String(c.cccd||'').replace(/\D/g, '')}); }
    nguoi.forEach(function(n){ var k = (n.cif && co.ma[n.cif]) || (n.cccd && co.so[n.cccd]) || null; n.da = !!k; n.ngay = k ? (k.ngay || '') : ''; });
    var xk = (t.tenXa||'?')+'|'+(t.tenDiemDu||''), x = X[xk]; if(!x){ x = X[xk] = {xa:t.tenXa||'?', diem:t.tenDiem ? String(t.tenDiem).trim() : '(chưa rõ điểm GD)', to:[]}; thu.push(x); }
    x.to.push({ma:m, ten:t.ten||m, ap:t.tenThon||'', nguoi:nguoi}); });
  thu.sort(function(a, b){ return (a.xa+a.diem).localeCompare(b.xa+b.diem, 'vi'); });
  thu.forEach(function(x){ x.to.sort(function(a, b){ return (a.ap+a.ten).localeCompare(b.ap+b.ten, 'vi'); }); });
  var cu = (D.scan||[]).filter(function(k){ return k.vaiTro==='ttCu'; });
  return {ky:K.ky, ds:thu, cu:cu};
}
function ttkMo(){
  if(!SL_SAN) return slNap().then(ttkMo);
  var ds = typeof toDsKy==='function' ? toDsKy() : []; if(!ds.length) return baoLoi('Chưa có Mẫu 31 — nạp ở tab 📈 Số liệu › Nạp & KT trước.');
  var ky = (typeof sxKy31Moi==='function' && sxKy31Moi()) || ds[0].ky; batChay(false, 'Đang dựng danh sách tổ trưởng…');
  KHO.nap(ky).then(function(K){ tatChay(); TTK.B = ttkDung(K); ttkVe(); }, function(e){ tatChay(); baoLoi('Chưa mở được Mẫu 31: '+(e && e.message || e)); });
}
function ttkVe(){
  var B = TTK.B; if(!B) return; var dem = {n:0, da:0, tt:0, ttDa:0, tp:0, tpDa:0}, h = '', ve = TTK.loc;
  B.ds.forEach(function(x){ x.to.forEach(function(t){ t.nguoi.forEach(function(n){ dem.n++; if(n.da) dem.da++; if(n.vai==='Tổ trưởng'){ dem.tt++; if(n.da) dem.ttDa++; } else { dem.tp++; if(n.da) dem.tpDa++; } }); }); });
  if(ve==='cu'){
    h = B.cu.length ? '<table class="to-bang luoi"><thead><tr><th>STT</th><th>Họ tên</th><th>CIF</th><th>Số CCCD</th><th>Xã · ấp</th><th>Ngày lưu</th></tr></thead><tbody>'+B.cu.map(function(k, i){
        return '<tr><td class="c">'+(i+1)+'</td><td>'+coChuHTML(k.ten||'')+'</td><td>'+coChuHTML(k.maKH||'')+'</td><td>'+coChuHTML(k.cccd||k.khoaCCCD||'')+'</td><td>'+coChuHTML([k.xa, k.ap].filter(Boolean).join(' · '))+'</td><td>'+coChuHTML(ngayVNsl(k.ngay||''))+'</td></tr>'; }).join('')+'</tbody></table>'
      : '<div class="rong">Chưa lưu CCCD tổ trưởng cũ nào.</div>';
  } else {
    var dong = '';
    B.ds.forEach(function(x){ var hx = '';
      x.to.forEach(function(t){ t.nguoi.forEach(function(n){ if(ve==='thieu' && n.da) return;
        hx += '<tr'+(n.da ? '' : ' class="nb"')+'><td>'+coChuHTML(t.ten)+(t.ap ? ' <small>· '+coChuHTML(t.ap)+'</small>' : '')+'</td><td>'+n.vai+'</td><td>'+coChuHTML(n.ten)+'</td><td>'+coChuHTML(n.cif)+'</td><td>'+coChuHTML(n.cccd || '—')+'</td><td class="c">'+(n.da ? '✓ <small>'+coChuHTML(ngayVNsl(n.ngay))+'</small>' : '<b class="do">✗</b>')+'</td></tr>'; }); });
      if(hx) dong += '<tr class="tong"><td colspan="6"><b>'+coChuHTML(x.xa)+' › '+coChuHTML(x.diem)+'</b></td></tr>'+hx; });
    h = dong ? '<table class="to-bang luoi"><thead><tr><th>Tổ · ấp</th><th>Vai trò</th><th>Họ tên</th><th>CIF</th><th>Số CCCD (Danh sách tổ / Mẫu 31)</th><th>CCCD đã lưu</th></tr></thead><tbody>'+dong+'</tbody></table>' : '<div class="rong">Đã lưu đủ CCCD tổ trưởng, tổ phó.</div>';
  }
  var chip = function(k, chu){ return GD.chip(chu, ve===k, 'ttk.loc', {k:k}); };
  moHop('<div class="hop-tit">👑 Kiểm CCCD tổ trưởng · tổ phó — '+coChuHTML(slKyChu(B.ky))+'</div>'+
    '<div class="hop-phu">Tổ trưởng <b>'+dem.ttDa+'/'+dem.tt+'</b> · tổ phó <b>'+dem.tpDa+'/'+dem.tp+'</b> đã lưu CCCD (khớp bản CCCD trong tủ theo CIF hoặc số CCCD). Tổ trưởng, tổ phó theo Danh sách tổ kỳ này; tổ phó lấy số CCCD từ Mẫu 31 (nếu là khách vay). Tổ trưởng cũ: bản đã lưu khi quét CCCD khớp File Tổ trưởng kỳ trước.</div>'+
    GD.hang([chip('tat', 'Tất cả ('+dem.n+')'), chip('thieu', 'Chỉ thiếu ('+(dem.n-dem.da)+')'), chip('cu', '👑 Tổ trưởng cũ đã lưu ('+B.cu.length+')')])+
    '<div class="to-bang-cuon to-cuon-khung">'+h+'</div>'+GD.hang([GD.nut({chu:'Đóng', lenh:'ttk.dong'}), GD.nut({chu:'📊 Excel', lenh:'ttk.excel'})], true), true);
}
function ttkExcel(){
  var B = TTK.B; if(!B) return;
  xongTV.then(function(){ if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel.');
    var a = [['KIỂM CCCD TỔ TRƯỞNG · TỔ PHÓ — '+slKyChu(B.ky)], [], ['Xã', 'Điểm GD', 'Tổ', 'Ấp', 'Vai trò', 'Họ tên', 'CIF', 'Số CCCD', 'Đã lưu CCCD', 'Ngày lưu']];
    B.ds.forEach(function(x){ x.to.forEach(function(t){ t.nguoi.forEach(function(n){ a.push([x.xa, x.diem, t.ten, t.ap, n.vai, n.ten, n.cif, n.cccd, n.da ? 'x' : '', n.ngay ? ngayVNsl(n.ngay) : '']); }); }); });
    var b = [['TỔ TRƯỞNG CŨ ĐÃ LƯU CCCD'], [], ['Họ tên', 'CIF', 'Số CCCD', 'Xã', 'Ấp', 'Ngày lưu']].concat(B.cu.map(function(k){ return [k.ten||'', k.maKH||'', k.cccd||k.khoaCCCD||'', k.xa||'', k.ap||'', ngayVNsl(k.ngay||'')]; }));
    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), 'To truong to pho'); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(b), 'To truong cu');
    taiXuongBlob(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Kiem CCCD to truong '+B.ky+'.xlsx'); });
}
GD.dangKy('ttk', {mo:function(){ ttkMo(); }, loc:function(el){ TTK.loc = el.getAttribute('data-k'); ttkVe(); }, dong:function(){ dongHop(); }, excel:function(){ ttkExcel(); }});
/* nút 👑 ở màn 📊 Kiểm tra hồ sơ scan (bọc sxKiemVe — rút file là mất nút) */
(function(){ if(typeof sxKiemVe!=='function') return; var cu = sxKiemVe;
  sxKiemVe = function(){ var r = cu.apply(this, arguments); var h = document.querySelector('#hop-in .gd-hang.gd-phai'); if(h && !h.querySelector('[data-lenh="ttk.mo"]')) h.insertAdjacentHTML('afterbegin', GD.nut({chu:'👑 CCCD tổ trưởng · tổ phó', lenh:'ttk.mo', tit:'Kiểm tổ trưởng, tổ phó hiện tại đã lưu CCCD chưa + tổ trưởng cũ đã lưu'})); return r; }; })();
