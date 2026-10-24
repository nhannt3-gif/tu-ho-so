/* ===== 3.359 (KE_HOACH_CHOT_SO — đợt C3): 📅 DÒNG THỜI GIAN KHÁCH / TỔ TRONG NĂM =====
   QUY_CHUAN_KIEN_TRUC mục 8 điểm 3: vào / ra / chuyển tổ, tất nợ, phát sinh QH / khoanh, đổi tổ trưởng — tab chỉ đọc kết quả.
   - Nguồn: Mẫu 31 các THÁNG đã nạp của năm (+ tháng 12 năm trước làm mốc đầu năm) — đọc bảng qua KHO.docBang, mỗi tháng tóm gọn 1 lần
     (DTG_T[kỳ] = {kh: {to, ten, dn, qh, kn, lt, mon}, tt: {mã tổ: tổ trưởng}}), giữ trong bộ nhớ phiên.
   - Thẻ khách (Tra cứu) / thẻ tổ: khối 📅 Dòng thời gian → bấm "Xem năm …" mới đọc (không làm chậm lúc mở thẻ). ES5. */
var DTG_T = {}, DTG_DANG = {};
function dtgThangNam(nam){   /* kỳ tháng có Mẫu 31 của năm, kèm tháng 12 năm trước (mốc) — cũ → mới */
  return KHO.dsBang('hstd').map(function(e){ return e.ky; }).filter(function(k){ return String(k).length===7 && (k.slice(0, 4)===String(nam) || k===(nam-1)+'-12'); }).sort();
}
function dtgNamCo(){ var n = {}; KHO.dsBang('hstd').forEach(function(e){ if(String(e.ky).length===7) n[e.ky.slice(0, 4)] = 1; }); return Object.keys(n).sort().reverse(); }
function dtgThang(ky){   /* → Promise(tóm tắt 1 tháng | null) */
  if(DTG_T[ky]!==undefined) return Promise.resolve(DTG_T[ky]);
  if(DTG_DANG[ky]) return DTG_DANG[ky];
  return DTG_DANG[ky] = KHO.docBang('hstd', ky).then(function(b){
    var t = null;
    if(b){ t = {kh:{}, tt:{}};
      slMoBang(b).forEach(function(o){ if(!o.kh || !o.to) return; if(o.to && (o.toTen || o.ttKH)) t.tt[o.to] = o.toTen || o.ttKH;
        if(!o.ku) return; var x = t.kh[o.kh] = t.kh[o.kh] || {to:o.to, ten:o.ten||'', dn:0, qh:0, kn:0, lt:0, mon:0};
        x.dn += o.dn||0; x.qh += o.qh||0; x.kn += o.kn||0; x.lt += laiTon(o); if((o.dn||0)>0){ x.mon++; x.to = o.to; } }); }
    DTG_T[ky] = t; delete DTG_DANG[ky]; return t;
  }).catch(function(){ delete DTG_DANG[ky]; return null; });
}
function dtgNap(nam){ var ds = dtgThangNam(nam); return Promise.all(ds.map(dtgThang)).then(function(r){ return ds.map(function(k, i){ return {ky:k, t:r[i]}; }).filter(function(x){ return x.t; }); }); }
function dtgTien(v){ return tdnTien(v||0); }
/* sự kiện của 1 khách: so từng cặp tháng liền nhau */
function dtgKH(kh, T){
  var ev = [], truoc = null, coMoc = false;
  T.forEach(function(x, i){ var b = x.t.kh[kh] || null, a = truoc, th = kyVN(x.ky);
    if(i===0){ coMoc = true; if(b) ev.push({ky:x.ky, chu:'Mốc '+th+': tổ '+b.to+' · dư nợ '+dtgTien(b.dn)+(b.qh ? ' · QH '+dtgTien(b.qh) : '')+(b.kn ? ' · khoanh '+dtgTien(b.kn) : '')}); truoc = b; return; }
    if(!a && b) ev.push({ky:x.ky, chu:'Vào tổ '+b.to+' — có món vay'+(b.dn ? ' (dư nợ '+dtgTien(b.dn)+')' : ''), lop:'moi'});
    else if(a && !b) ev.push({ky:x.ky, chu:'Không còn trong Mẫu 31 (đã tất toán từ năm trước / ra khỏi tổ)', lop:'ra'});
    else if(a && b){
      if(a.to!==b.to) ev.push({ky:x.ky, chu:'Chuyển tổ '+a.to+' → '+b.to, lop:'chuyen'});
      var hetA = !(a.dn>0) && !(a.lt>0), hetB = !(b.dn>0) && !(b.lt>0);   /* anh chốt: còn lãi tồn = chưa tất nợ */
      if(!hetA && hetB) ev.push({ky:x.ky, chu:'Tất nợ', lop:'tat'});
      else if(a.dn>0 && !(b.dn>0) && b.lt>0) ev.push({ky:x.ky, chu:'Hết gốc · còn lãi tồn '+dtgTien(b.lt)+' (chưa tất nợ)'});
      else if(b.mon>a.mon) ev.push({ky:x.ky, chu:'Vay thêm món ('+a.mon+' → '+b.mon+' món, dư nợ '+dtgTien(b.dn)+')', lop:'moi'});
      if(!(a.qh>0) && b.qh>0) ev.push({ky:x.ky, chu:'Phát sinh quá hạn '+dtgTien(b.qh), lop:'qh'}); else if(a.qh>0 && !(b.qh>0)) ev.push({ky:x.ky, chu:'Hết quá hạn'});
      if(!(a.kn>0) && b.kn>0) ev.push({ky:x.ky, chu:'Nợ khoanh '+dtgTien(b.kn), lop:'qh'}); else if(a.kn>0 && !(b.kn>0)) ev.push({ky:x.ky, chu:'Hết khoanh'});
    }
    truoc = b; });
  return ev;
}
/* sự kiện của 1 tổ: thành viên (khách có món vay ở tổ) vào / ra, đổi tổ trưởng */
function dtgTo(ma, T){
  var ev = [], truoc = null, ttTruoc = '';
  T.forEach(function(x, i){ var m = {}, th = kyVN(x.ky), tt = x.t.tt[ma] || '';
    Object.keys(x.t.kh).forEach(function(k){ if(x.t.kh[k].to===ma) m[k] = x.t.kh[k]; });
    var n = Object.keys(m).length;
    if(i===0){ ev.push({ky:x.ky, chu:'Mốc '+th+': '+n+' khách có món vay'+(tt ? ' · tổ trưởng '+tt : '')}); truoc = m; ttTruoc = tt; return; }
    var vao = Object.keys(m).filter(function(k){ return !truoc[k]; }), ra = Object.keys(truoc).filter(function(k){ return !m[k]; });
    var ten = function(ds, src){ return ds.slice(0, 6).map(function(k){ return (src[k].ten || k); }).join(', ')+(ds.length>6 ? ' … +'+(ds.length-6) : ''); };
    if(vao.length) ev.push({ky:x.ky, chu:'Vào '+vao.length+': '+ten(vao, m), lop:'moi'});
    if(ra.length) ev.push({ky:x.ky, chu:'Không còn món vay ở tổ '+ra.length+': '+ten(ra, truoc), lop:'ra'});
    if(tt && ttTruoc && slChuan(tt)!==slChuan(ttTruoc)) ev.push({ky:x.ky, chu:'Đổi tổ trưởng: '+ttTruoc+' → '+tt, lop:'chuyen'});
    truoc = m; if(tt) ttTruoc = tt; });
  return ev;
}
function dtgKhoiHTML(loai, ma){
  dtgDangKy(); var nam = dtgNamCo();
  if(!nam.length) return '';
  return '<div class="tc-nhom dtg-khoi" id="dtg-'+loai+'-'+coChuHTML(ma)+'"><div class="tc-nhom-tit">📅 Dòng thời gian</div><div class="dtg-nut">'+
    nam.slice(0, 3).map(function(n){ return GD.nut({chu:'Xem năm '+n, lenh:'dtg.mo', du:{loai:loai, ma:ma, nam:n}}); }).join('')+
    '</div><div class="dtg-ds"></div></div>'; }
function dtgMo(loai, ma, nam){
  var o = document.getElementById('dtg-'+loai+'-'+ma), d = o && o.querySelector('.dtg-ds'); if(!d) return Promise.resolve();
  d.innerHTML = '<div class="nk-rong">Đang đọc Mẫu 31 các tháng năm '+nam+'…</div>';
  return dtgNap(+nam).then(function(T){
    if(!T.length){ d.innerHTML = '<div class="nk-rong">Năm '+nam+' chưa có Mẫu 31 tháng nào trong máy.</div>'; return; }
    var ev = loai==='kh' ? dtgKH(ma, T) : dtgTo(ma, T);
    d.innerHTML = '<div class="dtg-phu">Theo Mẫu 31 '+T.map(function(x){ return kyVN(x.ky); }).join(' · ')+(T[0].ky.slice(0, 4)!==String(nam) ? '' : ' (chưa có tháng 12/'+(nam-1)+' làm mốc)')+'</div>'+
      (ev.length ? '<ul class="dtg-ul">'+ev.slice().reverse().map(function(e){ return '<li class="dtg-'+(e.lop||'')+'"><b>'+kyVN(e.ky)+'</b> '+coChuHTML(e.chu)+'</li>'; }).join('')+'</ul>'
        : '<div class="nk-rong">Không có thay đổi trong các tháng đã nạp.</div>');
  });
}
function dtgDangKy(){ if(dtgDangKy.xong || typeof GD==='undefined') return; dtgDangKy.xong = 1;
  GD.dangKy('dtg', {mo:function(el){ dtgMo(el.getAttribute('data-loai'), el.getAttribute('data-ma'), el.getAttribute('data-nam')); }}); }
