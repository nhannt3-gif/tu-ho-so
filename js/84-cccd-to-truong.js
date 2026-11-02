/* ===== 3.416 (anh 31/10: "gặp CCCD tổ trưởng dù cũ hay mới cũng lưu trữ, sau này có 1 chỗ lọc ra CCCD của tổ trưởng xem có lưu đủ hay chưa"
   + "có kiểm tổ phó hiện tại, tổ trưởng cũ cũng lưu và lọc riêng") — CẮM RÚT: bỏ dòng <script> là mất phần tổ trưởng cũ + màn kiểm, phần khác không đổi.
   ① TỔ TRƯỞNG CŨ: CCCD không có trong Mẫu 31 / bảng tổ kỳ này → tra mọi File Tổ trưởng đã nạp (dsTimCCCD, js/28) → lưu như khách: mã = CIF, tên chuẩn
      "CIF - Họ tên - CCCD", vaiTro 'ttCu'. ② 👑 KIỂM CCCD tổ trưởng HIỆN TẠI (3.416.1: bỏ tổ phó) + TỔ TRƯỞNG CŨ (mọi File Tổ trưởng đã nạp, cả người còn thiếu) (Danh sách tổ kỳ mới nhất): đã lưu / chưa — khớp bản CCCD đã lưu theo
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
var TTK = {loc:'tat', xem:'nay', B:null};   /* 3.416.1 (anh 31/10 "tạm chỉ kiểm tổ trưởng, và có thêm 1 chọn tổ trưởng cũ để bổ sung"): bỏ tổ phó; xem = nay (tổ trưởng hiện tại) | cu (tổ trưởng cũ — mọi File Tổ trưởng đã nạp) */
function ttkCo(){   /* bản CCCD đã lưu: theo mã KH và theo số CCCD */
  var ma = {}, so = {}; (D.scan||[]).forEach(function(k){ if(k.che==='tailieu') return; if(k.maKH) ma[k.maKH] = k; [k.cccd, k.khoaCCCD].forEach(function(s){ s = String(s||'').replace(/\D/g, ''); if(s) so[s] = k; }); });
  return {ma:ma, so:so}; }
function ttkDung(K, bang){   /* bang: dsTTDs() — [{ky, rows}] mới nhất trước (không có → danh sách cũ chỉ gồm bản đã lưu) */
  var co = ttkCo(), dsK = KHO.dsKhach() || {}, X = {}, thu = [], nay = {};
  var gan = function(n){ var k = (n.cif && co.ma[n.cif]) || (n.cccd && co.so[n.cccd]) || null; n.da = !!k; n.ngay = k ? (k.ngay || '') : ''; return n; };
  Object.keys(K.to||{}).forEach(function(m){ var t = K.to[m]; if(!t || toLaTT(t)) return; var ds = t.ds || {}, tt0 = t.tt || {};   /* Danh sách tổ (CIF MATT, CMT) → Thông tin tổ trưởng → Mẫu 31 (Mã CIF TT) */
    var cif = String(ds.ttKH || tt0.ttKH || t.cif || ''), n = {vai:'Tổ trưởng', ten:tenHoaDau(ds.toTen || tt0.toTen || t.ten || ''), cif:cif, cccd:String(ds.cccd || tt0.cccd || (dsK[cif] || {}).cccd || '').replace(/\D/g, '')};
    if(!n.ten && !n.cif) return; gan(n); if(n.cif) nay['c'+n.cif] = 1; if(n.cccd) nay['s'+n.cccd] = 1;
    var xk = (t.tenXa||'?')+'|'+(t.tenDiemDu||''), x = X[xk]; if(!x){ x = X[xk] = {xa:t.tenXa||'?', diem:t.tenDiem ? String(t.tenDiem).trim() : '(chưa rõ điểm GD)', to:[]}; thu.push(x); }
    x.to.push({ma:m, ten:t.ten||m, ap:t.tenThon||'', nguoi:[n]}); });
  thu.sort(function(a, b){ return (a.xa+a.diem).localeCompare(b.xa+b.diem, 'vi'); });
  thu.forEach(function(x){ x.to.sort(function(a, b){ return (a.ap+a.ten).localeCompare(b.ap+b.ten, 'vi'); }); });
  var cu = [], gap = {};   /* tổ trưởng cũ: từng là tổ trưởng ở File Tổ trưởng đã nạp, nay không còn (theo CIF / số CCCD) — kỳ cuối còn làm */
  (bang||[]).forEach(function(b){ (b.rows||[]).forEach(function(o){ var cif = String(o.ttKH||''), so = String(o.cccd||'').replace(/\D/g, ''), khoa = so ? 's'+so : cif ? 'c'+cif : '';
    if(!khoa || nay['c'+cif] || nay['s'+so] || gap[khoa] || (cif && gap['c'+cif])) return; gap[khoa] = 1; if(cif) gap['c'+cif] = 1;
    cu.push(gan({vai:'Tổ trưởng cũ', ten:tenHoaDau(o.toTen||''), cif:cif, cccd:so, to:o.to||'', xa:o.tenXa||'', ap:o.tenThon||'', ky:b.ky})); }); });
  (D.scan||[]).forEach(function(k){ if(k.vaiTro!=='ttCu') return; var so = String(k.cccd||k.khoaCCCD||'').replace(/\D/g, '');   /* bản đã lưu là tổ trưởng cũ mà File chưa nạp → vẫn hiện */
    if((so && gap['s'+so]) || (k.maKH && gap['c'+k.maKH])) return; if(so) gap['s'+so] = 1; if(k.maKH) gap['c'+k.maKH] = 1;
    cu.push({vai:'Tổ trưởng cũ', ten:k.ten||'', cif:k.maKH||'', cccd:so, to:'', xa:k.xa||'', ap:k.ap||'', ky:'', da:true, ngay:k.ngay||''}); });
  cu.sort(function(a, b){ return (a.xa+'|'+a.ap+'|'+a.ten).localeCompare(b.xa+'|'+b.ap+'|'+b.ten, 'vi'); });
  return {ky:K.ky, ds:thu, cu:cu};
}
function ttkMo(){
  if(!SL_SAN) return slNap().then(ttkMo);
  var ds = typeof toDsKy==='function' ? toDsKy() : []; if(!ds.length) return baoLoi('Chưa có Mẫu 31 — nạp ở tab 📈 Số liệu › Nạp & KT trước.');
  var ky = (typeof sxKy31Moi==='function' && sxKy31Moi()) || ds[0].ky; batChay(false, 'Đang dựng danh sách tổ trưởng…');
  Promise.all([KHO.nap(ky), typeof dsTTDs==='function' ? dsTTDs() : []]).then(function(r){ tatChay(); TTK.B = ttkDung(r[0], r[1]); ttkVe(); }, function(e){ tatChay(); baoLoi('Chưa mở được Mẫu 31: '+(e && e.message || e)); });
}
function ttkVe(){
  var B = TTK.B; if(!B) return; var h = '', thieu = TTK.loc==='thieu', cu = TTK.xem==='cu', e = coChuHTML;
  var nay = []; B.ds.forEach(function(x){ x.to.forEach(function(t){ t.nguoi.forEach(function(n){ nay.push(n); }); }); });
  var dem = function(a){ return a.filter(function(n){ return n.da; }).length; }, ds = cu ? B.cu : nay;
  var oDa = function(n){ return '<td class="c">'+(n.da ? '✓ '+e(n.ngay ? ngayVNsl(n.ngay) : '') : '<b class="do">thiếu</b>')+'</td>'; };
  if(cu){
    var dc = B.cu.filter(function(n){ return !thieu || !n.da; });
    h = dc.length ? '<table class="to-bang luoi"><thead><tr><th>STT</th><th>Họ tên</th><th>CIF</th><th>Số CCCD</th><th>Xã · ấp · tổ</th><th>Kỳ cuối làm TT</th><th>CCCD đã lưu</th></tr></thead><tbody>'+dc.map(function(n, i){
        return '<tr'+(n.da ? '' : ' class="nb"')+'><td class="c">'+(i+1)+'</td><td>'+e(n.ten)+'</td><td>'+e(n.cif)+'</td><td>'+e(n.cccd || '—')+'</td><td>'+e([n.xa, n.ap, n.to ? 'tổ '+n.to : ''].filter(Boolean).join(' · '))+'</td><td class="c">'+e(n.ky ? slKyChu(n.ky) : '')+'</td>'+oDa(n)+'</tr>'; }).join('')+'</tbody></table>'
      : '<div class="rong">'+(B.cu.length ? 'Tổ trưởng cũ đã lưu đủ CCCD.' : 'Chưa thấy tổ trưởng cũ — nạp File Tổ trưởng các kỳ trước ở 📥 Nạp & KT.')+'</div>';
  } else {
    var dong = '';
    B.ds.forEach(function(x){ var hx = '';
      x.to.forEach(function(t){ t.nguoi.forEach(function(n){ if(thieu && n.da) return;
        hx += '<tr'+(n.da ? '' : ' class="nb"')+'><td>'+e(t.ten)+(t.ap ? ' <small>· '+e(t.ap)+'</small>' : '')+'</td><td>'+e(n.ten)+'</td><td>'+e(n.cif)+'</td><td>'+e(n.cccd || '—')+'</td>'+oDa(n)+'</tr>'; }); });
      if(hx) dong += '<tr class="tong"><td colspan="5"><b>'+e(x.xa)+' › '+e(x.diem)+'</b></td></tr>'+hx; });
    h = dong ? '<table class="to-bang luoi"><thead><tr><th>Tổ · ấp</th><th>Tổ trưởng</th><th>CIF</th><th>Số CCCD (Danh sách tổ / Mẫu 31)</th><th>CCCD đã lưu</th></tr></thead><tbody>'+dong+'</tbody></table>' : '<div class="rong">Tổ trưởng đã lưu đủ CCCD.</div>';
  }
  var chip = function(f, k, chu){ return GD.chip(chu, TTK[f]===k, 'ttk.'+f, {k:k}); };
  moHop('<div class="hop-tit">👑 Kiểm CCCD tổ trưởng — '+e(slKyChu(B.ky))+'</div>'+
    '<div class="hop-phu">Tổ trưởng hiện tại <b>'+dem(nay)+'/'+nay.length+'</b> · tổ trưởng cũ <b>'+dem(B.cu)+'/'+B.cu.length+'</b> đã lưu CCCD (khớp bản CCCD trong tủ theo CIF hoặc số CCCD). Hiện tại theo Danh sách tổ kỳ này; tổ trưởng cũ = từng là tổ trưởng ở các File Tổ trưởng đã nạp, nay không còn — quét bổ sung người còn thiếu.</div>'+
    GD.hang([chip('xem', 'nay', 'Tổ trưởng hiện tại ('+nay.length+')'), chip('xem', 'cu', '👑 Tổ trưởng cũ ('+B.cu.length+')'), chip('loc', 'tat', 'Tất cả'), chip('loc', 'thieu', 'Chỉ thiếu ('+(ds.length-dem(ds))+')')])+
    '<div class="to-bang-cuon to-cuon-khung">'+h+'</div>'+GD.hang([GD.nut({chu:'Đóng', lenh:'ttk.dong'}), GD.nut({chu:'📊 Excel', lenh:'ttk.excel'})], true), true);
}
function ttkExcel(){
  var B = TTK.B; if(!B) return;
  xongTV.then(function(){ if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel.');
    var a = [['KIỂM CCCD TỔ TRƯỞNG — '+slKyChu(B.ky)], [], ['Xã', 'Điểm GD', 'Tổ', 'Ấp', 'Tổ trưởng', 'CIF', 'Số CCCD', 'Đã lưu CCCD', 'Ngày lưu']];
    B.ds.forEach(function(x){ x.to.forEach(function(t){ t.nguoi.forEach(function(n){ a.push([x.xa, x.diem, t.ten, t.ap, n.ten, n.cif, n.cccd, n.da ? 'x' : '', n.ngay ? ngayVNsl(n.ngay) : '']); }); }); });
    var b = [['TỔ TRƯỞNG CŨ'], [], ['Họ tên', 'CIF', 'Số CCCD', 'Xã', 'Ấp', 'Tổ', 'Kỳ cuối làm TT', 'Đã lưu CCCD', 'Ngày lưu']].concat(B.cu.map(function(n){ return [n.ten, n.cif, n.cccd, n.xa, n.ap, n.to, n.ky ? slKyChu(n.ky) : '', n.da ? 'x' : '', n.ngay ? ngayVNsl(n.ngay) : '']; }));
    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), 'To truong'); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(b), 'To truong cu');
    taiXuongBlob(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Kiem CCCD to truong '+B.ky+'.xlsx'); });
}
GD.dangKy('ttk', {mo:function(){ ttkMo(); }, loc:function(el){ TTK.loc = el.getAttribute('data-k'); ttkVe(); }, xem:function(el){ TTK.xem = el.getAttribute('data-k'); ttkVe(); }, dong:function(){ dongHop(); }, excel:function(){ ttkExcel(); }});
/* nút 👑 ở màn 📊 Kiểm tra hồ sơ scan (bọc sxKiemVe — rút file là mất nút) */
(function(){ if(typeof sxKiemVe!=='function') return; var cu = sxKiemVe;
  sxKiemVe = function(){ var r = cu.apply(this, arguments); var h = document.querySelector('#hop-in .gd-hang.gd-phai'); if(h && !h.querySelector('[data-lenh="ttk.mo"]')) h.insertAdjacentHTML('afterbegin', GD.nut({chu:'👑 CCCD tổ trưởng', lenh:'ttk.mo', tit:'Kiểm tổ trưởng, tổ phó hiện tại đã lưu CCCD chưa + tổ trưởng cũ đã lưu'})); return r; }; })();
/* ③ 3.445 (anh 02/11 "t/h là tổ trưởng nhưng không nhận ấp" → duyệt): bản CCCD đã gắn mã KH mà trống ẤP → bổ sung ấp (chỉ điền ô trống, không đoán):
   ① tổ của người đó (bảng tổ kỳ đang mở / danh bạ tổ) · ② File Tổ trưởng mọi kỳ (mã KH = MATT hoặc mã tổ) · ③ Mẫu 31: chính khách đó, rồi ấp đa số món vay của tổ
   · ④ mã thôn đã có (Sao kê TK 104 / File Tổ trưởng) → tên ấp theo tổ / khách cùng mã thôn, cuối cùng danh mục địa bàn Cài đặt. Lúc lưu: tự gọi (scanLuuTu, js/41); bản đã lưu: nút 🔧 ở tab Scan. */
function ttTenAp(ma){ ma = String(ma||''); if(!ma) return ''; var ten = '';
  if(KHO.coKy()) KHO.dsTo().some(function(t){ if(String(t.thon||'')===ma && t.tenThon){ ten = t.tenThon; return true; } return false; });
  if(!ten){ var dk = KHO.dsKhach(); Object.keys(dk).some(function(m){ var c = dk[m]; if(String(c.thon||'')===ma && c.tenThon){ ten = c.tenThon; return true; } return false; }); }
  if(!ten) (D.cauHinh.diaBan||[]).some(function(x){ return (x.diem||[]).some(function(z){ return (z.ap||[]).some(function(a){ if(String(a.ma)===ma && a.ten){ ten = a.ten; return true; } return false; }); }); });   /* số liệu hệ thống trước, danh mục Cài đặt sau (QT-C-10) */
  return ten; }
function ttApBu(k){   /* → Promise<true khi đã điền> */
  if(!k || k.ap || !k.maKH) return Promise.resolve(false);
  var cif = String(k.maKH), mt = String(k.maTo||'');
  var dat = function(o, tu){ if(!o || !o.tenThon) return false; k.ap = o.tenThon; if(!k.maAp && o.thon) k.maAp = String(o.thon); if(!k.xa && o.tenXa) k.xa = o.tenXa; if(!k.maXa && o.xa) k.maXa = String(o.xa); k.apTu = tu; return true; };
  if(!mt && KHO.coKy()) KHO.maTo().some(function(m){ if(String((KHO.bangTo(m)||{}).kh||'')===cif){ mt = m; return true; } return false; });
  if(mt){ var t = KHO.coKy() ? KHO.to(mt) : null; if(t && !toLaTT(t) && dat(t, 'tổ '+mt)) return Promise.resolve(true); if(dat(KHO.toDanhBa(mt), 'danh bạ tổ '+mt)) return Promise.resolve(true); }
  return (typeof dsTTDs==='function' ? dsTTDs() : Promise.resolve([])).then(function(B){
    var o = null; (B||[]).some(function(b){ return (b.rows||[]).some(function(z){ if(z.tenThon && (String(z.ttKH||'')===cif || (mt && String(z.to||'')===mt))){ o = z; return true; } return false; }); });
    if(o){ if(!mt && o.to) mt = String(o.to); if(dat(o, 'File Tổ trưởng')) return true; }
    var dk = KHO.dsKhach(); if(dat(dk[cif], 'Mẫu 31 (khách)')) return true;
    if(mt){ var dem = {}, mau = {}; Object.keys(dk).forEach(function(m){ var c = dk[m]; if(String(c.to||'')===mt && c.tenThon){ dem[c.tenThon] = (dem[c.tenThon]||0)+1; mau[c.tenThon] = c; } });
      var tot = Object.keys(dem).sort(function(a, b){ return dem[b]-dem[a]; })[0]; if(tot && dat(mau[tot], 'Mẫu 31 (ấp đa số của tổ '+mt+')')) return true; }
    var ten = ttTenAp(k.maAp); if(ten){ k.ap = ten; k.apTu = 'mã thôn '+k.maAp; return true; }
    return false; }).catch(function(){ return false; });
}
function ttApCan(){ return (D.scan||[]).filter(function(k){ return k.maKH && !k.ap; }); }
function ttApBuHet(){
  var ds = ttApCan(); if(!ds.length) return bao('Mọi bản đã gắn khách đều có ấp.', 3);
  hoi('🔧 Bổ sung ấp cho '+ds.length+' bản thiếu ấp?', 'Chỉ điền ô Ấp đang trống, theo: tổ của người đó → File Tổ trưởng các kỳ → Mẫu 31 → mã thôn. Không tìm ra thì để nguyên (vẫn ⚠).', 'Bổ sung', function(){
    var n = 0; ds.reduce(function(p, k){ return p.then(function(){ return ttApBu(k).then(function(ok){ if(ok){ n++; k.suaLuc = new Date().toISOString(); k.canDay = true; } }); }); }, Promise.resolve())
      .then(function(){ if(n) luu(); bao('Đã bổ sung ấp cho '+n+' / '+ds.length+' bản'+(n<ds.length ? ' — '+(ds.length-n)+' bản chưa tìm ra ấp (✎ khai tay)' : '')+'.', 5); if(typeof veScan==='function') veScan(); }); });
}
GD.dangKy('ttap', {bu:function(){ ttApBuHet(); }});
(function(){ if(typeof veScan!=='function') return; var cu = veScan;   /* nút 🔧 trên thanh Chờ sắp xếp (rút file là mất nút) */
  veScan = function(){ var r = cu.apply(this, arguments); var n = ttApCan().length, h = document.querySelector('#tr4 .sx-thanh');
    if(n && h && !h.querySelector('[data-lenh="ttap.bu"]')) h.insertAdjacentHTML('beforeend', '<button data-lenh="ttap.bu" title="Bản đã gắn mã KH (tổ trưởng…) mà trống ấp → tìm ấp theo tổ / File Tổ trưởng / Mẫu 31 / mã thôn">🔧 Bổ sung ấp ('+n+')</button>');
    return r; }; })();
