/* Tủ hồ sơ — giao diện tab 👥 Tổ TK&VV: vẽ tab, thẻ tổ, chip lọc, bảng cột, in / Excel danh sách (tách nguyên văn khỏi 22g-to.js ở 3.346 — K5; 22g giữ lõi dựng kỳ). Đọc kỳ qua KHO. ES5. */
function veToTK(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veToTK); return; }
  var C = toCH(), dsKy = toDsKy();
  if(!dsKy.length){ e.innerHTML = slTabConHTML()+'<div class="rong">Chưa có số liệu món vay. Nạp Mẫu 31 hoặc Mẫu 10 ở tab <b>📈 Số liệu</b> trước.</div>'; return; }
  toKyMacDinh(C, dsKy, 'to');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'… (bảng chưa có trong máy thì tải từ Drive)</div>';
  KHO.nap(C.ky).then(function(K){ KHO.datKy(K); if(nganHienTai===7 && D.cauHinh.slTab==='to') toVe(K, dsKy); })
    .catch(function(er){ var o = document.getElementById('tr7'); if(o && D.cauHinh.slTab==='to') o.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+'</div><div class="hang-nut"><button class="nho chinh" onclick="toThuLai()">⟳ Thử lại</button></div>'; });
}
function toThuLai(){ KHO.datKy(null); TO_KS = {}; SL_BO = {}; TH_KS = {}; TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null; veSoLieu(); }
function toNoiDrive(){ noiDrive(false).then(function(co){ if(co) toThuLai(); }).catch(function(er){ baoLoi('Chưa nối được Drive: '+(er && er.message || er)); });
}
function toVe(K, dsKy){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = toCH();
  e.innerHTML = slTabConHTML()+kyGhiHTML(K)+'<div class="to-dau">'+
    '</div>'+   /* 3.157: ô 🔎 tìm tổ dời vào cuối hàng cây địa bàn (pvVeCay) */
    (K.thieuBang ? '<div class="sl-bao vang">⚠ Bảng số liệu '+coChuHTML(slKyChu(C.ky))+' <b>chưa có trên máy này</b> (lưu trên Drive nhưng chưa tải về — Drive chưa nối hoặc hết phiên). Cây tổ đang lấy tạm từ danh bạ; báo cáo cần bảng số liệu.'+
      '<div class="hang-nut"><button class="nho chinh" onclick="toNoiDrive()">☁ Nối Drive và tải</button><button class="nho" onclick="toThuLai()">⟳ Thử lại</button></div></div>' : '')+
    slNguonHTML(K.B)+'<div id="to-cay" class="to-cay pv-cay"></div><div id="to-the"></div>';
  toVeCay(); if(TO_Q) toTim();
}
function toVeCay(){ pvVeCay('to'); }
function toChonTo(ma){
  var t = KHO.kyDung() && KHO.kyDung().to[ma]; if(!t){ var an = KHO.kyDung() && KHO.kyDung().toAn && KHO.kyDung().toAn[ma]; if(an) bao('Tổ '+(an.ten||ma)+' (mã '+ma+'): dư nợ 0 và không còn trên Danh sách tổ / LEN_31 TO_TRUONG kỳ này — đã ẩn khỏi cây tổ.', 6); return; }
  var C = toCH(); C.xa = t.xa||''; C.diem = t.khoaDiem; C.hoi = String(t.dv||''); C.to = ma;
  TO_Q = ''; var i = document.getElementById('to-tim'); if(i) i.value = '';
  var g = document.getElementById('to-gy'); if(g) g.innerHTML = '';
  luu(); pvVeCay('to');
}
function toTim(){
  var g = document.getElementById('to-gy'); if(!g || !KHO.kyDung()) return;
  var q = slChuan(TO_Q); if(q.length<2){ g.innerHTML = ''; return; }
  var an = KHO.kyDung().toAn || {}, tu = q.split(' '), ds = Object.keys(KHO.kyDung().to).map(function(k){ return KHO.kyDung().to[k]; }).concat(Object.keys(an).map(function(k){ return an[k]; })).filter(function(t){
    var chu = ' '+slChuan([t.ma, t.ten, t.tenThon, t.tenXa, t.tenDiem].join(' ')); return tu.every(function(w){ return chu.indexOf(w)>=0; }); }).slice(0, 12);
  g.innerHTML = ds.length ? ds.map(function(t){ return '<button onclick="toChonTo(\''+t.ma+'\')"><b>'+coChuHTML(t.ten||('Tổ '+t.ma))+'</b>'+(an[t.ma] ? ' <small class="do">· dư nợ 0, không còn trên DSTO / LEN_31 — đã ẩn</small>' : t.canDong ? ' <small class="do">· ⚠ cần đóng tổ</small>' : '')+' <small>'+coChuHTML([t.ma, t.tenThon, t.tenXa, tdnHoi(t.dv)].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="rong">Không thấy tổ khớp “'+coChuHTML(TO_Q)+'”.</div>';
}
/* 3.92: tổ đang chọn → thẻ gọn + danh sách tổ viên có lọc + báo cáo; chưa chọn tổ (đã chọn xã) → bảng các tổ trong phạm vi */
function toVeThe(){
  var o = document.getElementById('to-the'); if(!o) return;
  var C = toCH(), t = KHO.kyDung() && KHO.kyDung().to[C.to];
  if(!t){   /* 3.132 (anh chốt): chưa chọn tổ → dòng tóm tắt + chip của cả phạm vi (Hội / điểm GD / xã / PGD); mặc định bảng các tổ (PGD: bảng theo xã, điểm GD) */
    o.innerHTML = toPVHTML(C);
    var khoa = [KHO.kyDung().ky, C.xa, C.diem, C.hoi].join('|');
    Promise.all([toTruocNap(), toBDTNap()]).then(function(){ var x = document.getElementById('to-the'), C2 = toCH(); if(x && !C2.to && [KHO.kyDung().ky, C2.xa, C2.diem, C2.hoi].join('|')===khoa && !(TO_PVC && TO_PVC.khoa.slice(-2)==='|1' && TO_PVC.K===KHO.kyDung() && TO_PVC.ve)) { x.innerHTML = toPVHTML(C2); if(TO_PVC) TO_PVC.ve = 1; } });
    return;
  }
  if(!(TO_BD && TO_BD.to===t.ma && TO_BD.ky===KHO.kyDung().ky)){ TO_BD = null; toBDNap(t).then(function(){ var C2 = toCH(); if(C2.to===t.ma && document.getElementById('to-the')) toVeThe(); }); }   /* 3.128 */
  var tv = toTV(t);
  o.innerHTML = '<div class="to-bc to-bc-dau"><span class="nhan-nhom">Báo cáo của tổ</span>'+TO_BC.map(function(b){   /* 3.169 (anh 11/10): đem lên đầu khung xem (trước khuất dưới bảng) */
      return '<label class="to-bc-dong"><input type="checkbox"'+(C.bc && C.bc[b.k] ? ' checked' : '')+' onchange="toCH().bc[\''+b.k+'\']=this.checked;luu()"> '+coChuHTML(b.ten)+'</label>'; }).join('')+
    '<button class="nho chinh" onclick="toXem()">👁 Xem</button></div>'+toTheHTML(t, tv)+toDsTVHTML(t, tv);
}
/* 3.161: nhãn CCCD + cảnh báo khi in (anh chốt): tất nợ còn TK 105 · CCCD hết hạn / sắp hết hạn (30 ngày) · khách còn mã tổ chưa có TK 105 → in đậm + cột Lưu ý */
function toChipKhung(xem, tv, mo, bien, B){   /* 3.161 (anh chốt): chip gom 3 nhóm Xem · Khách · Cần xử lý, tối đa 2 dòng (dư → ⋯ thêm) */
  var g = {kh:'', xl:''};
  TO_LOC.forEach(function(l){ if(l[4]) return; if(l[0]==='tvra' && !TO_TV_MA) return; var n = l[0]==='rk' ? (B && B.co ? B.ra.length : 0) : l[0]==='tvra' ? (tvRaCuaTo(TO_TV_MA)||[]).length : tv.filter(l[2]).length;
    g[TO_LOC_NHOM[l[0]]||'kh'] += '<button class="to-loc '+l[3]+(l[0]===mo ? ' bat' : '')+(n || l[0]==='tat' ? '' : ' mo0')+'" onclick="'+bien+'=\''+l[0]+'\';toVeThe()">'+coChuHTML(toLocNhan(l))+' <b>'+n+'</b></button>'; });
  var nh = function(ten, h){ return h ? '<span class="to-nhom"><span class="to-nhom-ten">'+ten+'</span>'+h+'</span>' : ''; };
  return '<div class="to-loc-hang to-chip-khung">'+nh('Xem', xem)+nh('Khách', g.kh)+nh('Cần xử lý', g.xl)+'</div>';
}
function toChipGon(){   /* quá 2 dòng → chip cuối mỗi nhóm (trừ chip đầu / đang chọn) gom vào ⋯ thêm */
  var k = document.querySelector('#to-the .to-chip-khung'); if(!k || window.innerWidth<700) return;
  var ds = Array.prototype.slice.call(k.querySelectorAll('button.to-loc')); if(!ds.length) return;
  var dong = function(){ var t = []; ds.forEach(function(b){ if(b.parentNode && b.offsetParent && t.indexOf(b.offsetTop)<0) t.push(b.offsetTop); }); return t.sort(function(a, b){ return a-b; }); };
  if(dong().length<=2) return;
  var menu = document.createElement('details'); menu.className = 'to-them'; menu.innerHTML = '<summary class="to-loc">⋯ thêm</summary><div class="to-them-ds"></div>'; k.appendChild(menu);
  var dsM = menu.querySelector('.to-them-ds'), bo = ds.filter(function(b){ return !b.classList.contains('bat') && b.previousElementSibling && b.previousElementSibling.classList.contains('to-loc'); }).reverse();
  for(var i=0;i<bo.length && dong().length>2;i++) dsM.insertBefore(bo[i], dsM.firstChild);
  menu.querySelector('summary').textContent = '⋯ thêm '+dsM.children.length;
}
function toCCNhan(k){ return k.cc.kq==='het' ? 'Hết hạn' : k.cc.kq==='sap' ? 'Sắp hết hạn' : k.cc.kq==='ok' ? 'Còn hạn' : 'Chưa rõ'; }
function toCCLop(k){ return k.cc.kq==='het' ? 'het' : k.cc.kq==='sap' ? 'sap' : k.cc.kq==='ok' ? 'ok' : ''; }
function toCCHTML(k){ return '<span class="to-cc '+toCCLop(k)+'" title="'+coChuHTML(k.cccd+' — '+k.cc.chu)+'">'+toCCNhan(k)+'</span>'; }
function toCanh(k){
  var r = [];
  if(!k.conNo && !k.chuaGN && (k.stk.length || k.coTK || k.t105>0)) r.push('Tất nợ – còn TK 105');
  if(k.cc.kq==='het') r.push('CCCD hết hạn'+(k.cc.den ? ' '+ngayVNsl(k.cc.den) : ''));
  else if(k.cc.kq==='sap') r.push('CCCD sắp hết hạn '+ngayVNsl(k.cc.den));
  if(!k.stk.length && !k.coTK) r.push('Chưa có TK 105');
  return r;
}
function toCanhTong(ds){ var d = [0, 0, 0, 0]; ds.forEach(function(k){ var c = toCanh(k).join('|'); if(/Tất nợ/.test(c)) d[0]++; if(/CCCD hết/.test(c)) d[1]++; if(/CCCD sắp/.test(c)) d[2]++; if(/Chưa có TK/.test(c)) d[3]++; });
  var t = [d[0] ? d[0]+' khách tất nợ còn TK 105' : '', d[1] ? d[1]+' CCCD hết hạn' : '', d[2] ? d[2]+' CCCD sắp hết hạn (30 ngày)' : '', d[3] ? d[3]+' chưa có TK 105' : ''].filter(Boolean);
  return t.length ? '<div class="bc-canh-tong"><b>Lưu ý ('+ngayVNsl(ngayISO(nay()))+'):</b> '+t.join(' · ')+'. Các dòng in đậm là khách cần lưu ý.</div>' : ''; }
var TO_105_CB = 100000;   /* 3.137 (anh chốt): tất nợ mà TK 105 còn trên 100.000 đ → tô màu cảnh báo */
function toXen(ds){ var n = 0, tr = null; return ds.map(function(k){ if(k.to && k.to!==tr){ if(tr) n++; tr = k.to; } return n%2 ? ' class="to-xen"' : ''; }); }   /* 3.137 (anh chốt): không tô màu sặc sỡ — nền nhạt xen kẽ theo tổ để phân biệt tổ */
function to105(k, html){ var v = tdnTien(k.t105); return !k.conNo && k.t105>TO_105_CB ? (html ? '<b>'+v+'</b>' : v) : v; }   /* tất nợ còn 105 trên 100.000 đ: in đậm số */
function toGoiY(k){ if(!k.conNo && k.chuaGN) return 'Chưa giải ngân'; return k.conNo ? (!(k.dn>0) && k.lt>0 ? 'Còn lãi — chưa tất nợ' : '') : (k.t105>0 ? 'Chờ vay lại' : 'Cho ra'); }   /* 3.137 (anh chốt): chữ ngắn cho cột hẹp */
function toTheHTML(t, tv){
  var dn = 0, qh = 0, kn = 0, t105 = 0, co = 0;
  tv.forEach(function(k){ dn += k.dn; qh += k.qh; kn += k.kn; t105 += k.t105; if(k.conNo) co++; });
  var dem = function(f){ return tv.filter(f).length; }, N = toNguong(), R = !toLaTT(t) && typeof tvChuan==='function' ? tvChuan(t) : null;   /* 3.334: số TV chuẩn QT-18 (khớp 01/TV TƯ) */
  if(R && !N.max && typeof tcNguong==='function') N = tcNguong();   /* QĐ 70: mặc định 20–100 */
  var len = '';
  if(t.len){ var L1 = t.len; len = ' │ LEN_31: '+tdnTien(L1.ho||0)+' hộ · '+tdnTr(L1.dn)+' · tiền gửi '+tdnTr(L1.tg)+' · cho vay / thu nợ '+tdnTr(L1.cv)+' / '+tdnTr(L1.tn)+' · thu lãi '+tdnTr(L1.tl)+(t.lenGop>1 ? ' (gộp '+t.lenGop+' tổ trùng tên)' : ''); }
  return '<div class="to-the">'+
    '<div class="to-the-ten">'+(toLaTT(t) ? '<b>Vay trực tiếp (không qua tổ)</b>' : 'Tổ <b>'+coChuHTML(t.ten||'')+'</b> (mã '+t.ma+')')+' <span class="to-the-phu">· '+coChuHTML(toDiaChi(t))+'</span>'+(t.canDong ? ' <span class="to-dong0" title="Tổ dư nợ 0 nhưng còn trên '+(t.ds ? 'DSTO' : 'LEN_31 TO_TRUONG')+' — làm thủ tục đóng tổ">⚠ Dư nợ 0 — cần đóng tổ</span>' : '')+'</div>'+
    '<div class="to-the-so"><b>'+(R ? R.tong : tv.length)+'</b> '+(toLaTT(t) ? 'khách' : 'tổ viên')+(R && R.bs ? ' <small title="Người Mẫu 01/TV '+coChuHTML(slKyChu(R.kyTW))+' TƯ còn giữ mà Mẫu 31 kỳ này không có (dư nợ 0)">(gồm '+R.bs+' theo 01/TV)</small>' : '')+': <b>'+(R ? R.coNo : co)+'</b> có dư nợ'+(R && R.laiTon ? ' · <b class="cam">'+R.laiTon+'</b> còn lãi tồn' : '')+' · <b>'+dem(toLocHam('ko105'))+'</b> không dư nợ còn 105 · <b class="do">'+dem(toLocHam('ra'))+'</b> đề xuất cho ra · <b class="do">'+dem(toLocHam('cccd'))+'</b> CCCD hết hạn'+
      ' │ dư nợ <b>'+tdnTr(dn)+'</b> · QH <b>'+(qh ? tdnTr(qh) : 0)+'</b> · khoanh <b>'+(kn ? tdnTr(kn) : 0)+'</b> · 105 <b>'+tdnTr(t105)+'</b>'+
      (N.max && !toLaTT(t) ? ' │ còn nhận thêm <b>'+Math.max(0, N.max-(R ? R.tong : tv.length))+'</b> tổ viên (tối đa '+N.max+')' : '')+(toLaTT(t) ? '' : toBDChu())+coChuHTML(len)+'</div></div>';
}
function toNguong(){ var n = D.cauHinh.toNguong || {}; return {min:+n.min||0, max:+n.max||0}; }
function toDatNguong(){
  var N = toNguong();
  moHop('<div class="hop-tit">⚙ Ngưỡng tổ viên của tổ TK&VV</div><div class="hop-phu">Dùng để tô tổ quá ít / quá đông và tính "còn nhận thêm". Để trống = không dùng.</div>'+
    '<div class="hang-nut"><label>Tối thiểu <input id="tn-min" type="number" min="0" style="width:70px" value="'+(N.min||'')+'"></label><label>Tối đa <input id="tn-max" type="number" min="0" style="width:70px" value="'+(N.max||'')+'"></label></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="D.cauHinh.toNguong={min:document.getElementById(\'tn-min\').value,max:document.getElementById(\'tn-max\').value};luu();dongHop();toVeThe()">Lưu</button></div>', true);
}
function toKyKQ(K){ return K.ky.length>7 ? 'Số liệu ngày '+ngayVNsl(K.ky)+' (Mẫu 31 '+slKyChu((K.B && K.B.nguon && K.B.nguon.hstd) || K.ky)+')' : 'Kết quả giao dịch tháng '+kyVN(K.thang)+' (Mẫu 31)'; }   /* 3.136 */
function toLocNhan(l){ return (l[0]==='moi' || l[0]==='rk') && KHO.kyDung() ? l[1]+' '+(KHO.kyDung().ky.length>7 ? ngayVNsl(KHO.kyDung().ky).slice(0, 5) : kyVN(KHO.kyDung().thang).replace(/\/\d{4}$/, '')) : l[1]; }   /* 3.128 */
function toNgayCot(mo){ mo = mo || TO_LOC_MO; return mo==='dh' ? 'ĐH theo HĐ (gia hạn)|ĐH theo GDXA · ghi chú' : mo==='moi' ? 'Ngày kết nạp (≈ ngày vay) · từ đâu' : mo==='ko105' || mo==='ko' || mo==='ra' ? 'Ngày tất nợ' : ''; }
/* 3.138 (anh chốt): chip Đến hạn tháng sau — mỗi món: ĐH theo HĐ (gia hạn nếu có) + ĐH theo GDXA, ghi rõ vì sao chưa chuyển QH */
function toDHMon(k){
  var K = KHO.kyDung(), sau = kyLui(K.thang, 1), tu = sau+'-01', den = tdnCuoiKy(sau), ns = K.ngay, nhieu = k.mon.length>1;
  return k.mon.filter(function(m){ return !(m.qh>0) && (m.dn||0)>0; }).map(function(m){ var n = skNhomDH(m, tu, den, ns); if(!n) return null;
    var hl = skHL(m), gd = m.dhgd || '', ct = nhieu ? ctNgan(m.ct, m)+': ' : '';
    var ghi = n===1 ? 'đã quá ĐH HĐ — chưa chuyển QH do ngày GD xã' : n===3 ? 'ĐH HĐ T'+hai(+hl.slice(5, 7))+', chuyển QH ngày '+ngayVNsl(gd).slice(0, 5) : (gd && gd>hl ? 'chuyển QH ngày '+ngayVNsl(gd).slice(0, 5) : '');
    return {hd:ct+ngayVNsl(hl)+(m.dhgh && m.dhgh!==m.dhg ? ' (gia hạn)' : ''), gd:ct+(gd ? ngayVNsl(gd) : 'chưa có')+(ghi ? ' — '+ghi : '')}; }).filter(Boolean);
}
function toNgayGT(k, mo){ mo = mo || TO_LOC_MO; if(mo==='dh'){ var L = toDHMon(k); return [L.map(function(x){ return x.hd; }).join('; '), L.map(function(x){ return x.gd; }).join('; ')]; } return [toNgayO(k, mo)]; }
function toNgayH(nc){ return nc ? nc.split('|') : []; }
function toNgayTh(nc){ return toNgayH(nc).map(function(x){ return '<th>'+x+'</th>'; }).join(''); }
function toNgayO(k, mo){ if((mo || TO_LOC_MO)==='moi') return k.vao ? (k.vao.ngay ? ngayVNsl(k.vao.ngay) : '—')+' · '+k.vao.tu : '';
  if(!k.conNo && k.chuaGN) return 'chưa giải ngân';   /* 3.138 */
  return !k.conNo ? (k.tatNo ? ngayVNsl(k.tatNo) : 'trước '+String(KHO.kyDung().thang).slice(0, 4)) : ''; }
function toRaHTML(){   /* 3.128: chip Ra khỏi tổ — khách có trong tổ tháng trước, tháng này không còn */
  var B = TO_BD; if(!B || !B.co) return '<div class="rong">Chưa có Mẫu 31 '+(B ? toNgayDu(B.tr) : 'tháng trước')+' để so — nạp Mẫu 31 tháng trước để biết ai ra khỏi tổ.</div>';
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Dư nợ '+toNgayDu(B.tr)+'</th><th>Nợ lãi '+toNgayDu(B.tr)+'</th><th>Số dư 105 '+toNgayDu(B.tr)+'</th><th>Đi đâu</th></tr></thead><tbody>'+
    (B.ra.map(function(r, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+r.kh+'</td><td class="to-ten">'+coChuHTML(r.ten)+'</td><td class="s">'+tdnTien(r.dn)+'</td><td class="s">'+(r.lt>0 ? tdnTien(r.lt) : '')+'</td><td class="s">'+tdnTien(r.t105)+'</td><td>'+coChuHTML(r.di)+'</td></tr>'; }).join('')
      || '<tr><td colspan="7" class="rong">Không có khách ra khỏi tổ trong tháng.</td></tr>')+'</tbody></table></div>';
}
function toDsTVHTML(t, tv){
  var f = (TO_LOC.find(function(l){ return l[0]===TO_LOC_MO; }) || TO_LOC[0])[2], ds = tv.filter(f), nc = toNgayCot();
  if(TO_LOC_MO==='ko105' || TO_LOC_MO==='ra') TO_LOC_MO = 'ko';
  TO_TV_MA = toLaTT(t) ? '' : t.ma;
  var nut = toChipKhung(toLaTT(t) ? '' : '<button class="to-loc" onclick="toBDNam()" title="Khách vào / ra khỏi tổ từng tháng trong năm (so Mẫu 31 các tháng liền nhau)">📅 Biến động cả năm</button>', tv, TO_LOC_MO, 'TO_LOC_MO', TO_BD && TO_BD.to===t.ma ? TO_BD : null);
  setTimeout(toChipGon, 0);
  var dauDS = function(n){ return toBangDau('<b>'+n+'</b> '+(toLaTT(t) ? 'khách' : 'tổ viên')+' · '+coChuHTML(toLocNhan(TO_LOC.find(function(l){ return l[0]===TO_LOC_MO; }) || TO_LOC[0])), toNutXuat('')+'<button class="nho" onclick="toDatNguong()" title="Ngưỡng số tổ viên">⚙ Ngưỡng</button>'); };
  if(TO_LOC_MO==='rk') return nut+dauDS(TO_BD && TO_BD.co ? TO_BD.ra.length : 0)+toRaHTML();
  if(TO_LOC_MO==='tvra') return nut+dauDS((tvRaCuaTo(t.ma)||[]).length)+tvRaHTML(t.ma);   /* 3.201 */
  return nut+dauDS(ds.length)+toDsBangHTML(ds, toCotDS(false, false, nc, TO_LOC_MO), null, 'Không có tổ viên nào trong bộ lọc này.');
}
/* 3.163 (anh chốt): danh sách khách theo bảng cột — [mã, tên, 1 = cột chính / 0 = cột thêm (Tự động), ô(k, i, cb), lớp ô, 1 = cố định (không chọn ẩn)].
   Cột thêm xếp cuối theo ưu tiên: Ngày vay gần nhất → Ngày đến hạn → Hạn CCCD → Ấp → Ngày sinh → Số món → QH / khoanh (Lãi tồn = cột Nợ lãi sẵn có). */
function toCotDS(pv, coXa, nc, mo){
  var q = coChuHTML, ng = function(d){ return d ? ngayVNsl(d) : ''; };
  var c = [['stt','STT',1,function(k, i){ return String(i+1); },'c',1], ['kh','Mã KH',1,function(k){ return k.kh; },'',1]];
  if(pv) c.push(['to','Tổ',1,function(k){ var t = k.to; return '<a href="#" onclick="toChonTo(\''+t.ma+'\');return false" title="Mở tổ">'+q(toLaTT(t) ? 'Vay trực tiếp' : (t.ten||t.ma))+'</a>'; }]);
  c.push(['ten','Họ tên',1,function(k){ return q(k.ten); },'to-ten',1]);
  if(coXa) c.push(['xa','Xã',1,function(k){ return q(k.to.tenXa||''); }]);
  c.push(['ct','CT vay',1,function(k){ return q(k.ct || '—'); }], ['dn','Dư nợ',1,function(k){ return tdnTien(k.dn)+(k.qh ? ' <small class="do">QH</small>' : ''); },'s'],
    ['lt','Nợ lãi',1,function(k){ return k.lt>0 ? tdnTien(k.lt) : ''; },function(k){ return 's'+(k.lt>0 && !(k.dn>0) ? ' do' : ''); }],
    ['t105','Số dư 105',1,function(k){ return to105(k, true); },'s'], ['stk','Số TK 105',1,function(k){ return q(toStkChu(k)); }]);
  toNgayH(nc).forEach(function(ten, j){ c.push(['ng'+j, ten, 1, function(k){ return q(toNgayGT(k, mo)[j]||''); }, '', 1]); });
  c.push(['sdt','SĐT',1,function(k){ return q(k.sdt); }], ['cc','CCCD',1,function(k){ return toCCHTML(k); }],
    ['gc','Ghi chú',1,function(k){ var g = toGoiY(k); return g ? (g==='Cho ra' ? '<b class="do">'+g+'</b>' : q(g)) : ''; }], ['lu','Lưu ý',1,function(k, i, cb){ return q(cb.join(' · ')); },'to-lu'],
    ['nvm','Ngày vay gần nhất',0,function(k){ return ng(k.nvm); }], ['dhan','Ngày đến hạn',0,function(k){ return ng(k.dhan); }], ['hcc','Hạn CCCD',0,function(k){ return ng(k.cc && k.cc.den); }],
    ['ap','Ấp',0,function(k){ return q(k.ap||''); }], ['ns','Ngày sinh',0,function(k){ return ng(k.ns); }], ['smon','Số món',0,function(k){ return k.smon ? String(k.smon) : ''; },'s'],
    ['qhkn','QH / khoanh',0,function(k){ return k.qhkn>0 ? tdnTien(k.qhkn) : ''; },'s']);
  return c;
}
function toDsBangHTML(ds, cot, xen, rong){
  TO_DS_COT = cot;
  var c2 = cot.filter(function(c){ return c[5] || toCotBat(c, 'toCotKH'); }), tu = c2.filter(function(c){ return !c[5] && toCotChe(c, 'toCotKH')==='tu'; }).map(function(c){ return c[0]; });
  var lo = function(c, k){ var l = typeof c[4]==='function' ? c[4](k) : (c[4]||''); return (l+(tu.indexOf(c[0])>=0 ? ' tu tc-'+c[0] : '')).trim(); };
  var h = ds.slice(0, TO_PV_MAX).map(function(k, i){ var cb = toCanh(k), lop = [xen && xen[i] ? 'to-xen' : '', cb.length ? 'to-canh' : ''].filter(Boolean).join(' ');
    return '<tr'+(lop ? ' class="'+lop+'"' : '')+'>'+c2.map(function(c){ var l = lo(c, k); return '<td'+(l ? ' class="'+l+'"' : '')+'>'+c[3](k, i, cb)+'</td>'; }).join('')+'</tr>'; }).join('');
  setTimeout(toCotVua, 0);
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi" data-khoa="ds" data-tu="'+tu.join(',')+'"><thead><tr>'+c2.map(function(c){ var l = tu.indexOf(c[0])>=0 ? 'tu tc-'+c[0] : ''; return '<th'+(l ? ' class="'+l+'"' : '')+'>'+coChuHTML(c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    (h || '<tr><td colspan="'+c2.length+'" class="rong">'+rong+'</td></tr>')+'</tbody></table></div>';
}
/* 3.163: In đầy đủ danh sách = các cột đang hiện trên màn hình (cột Tự động đang hiện + Luôn hiện), A4 ngang, tự co chữ */
function toInDuDS(pv){
  var C = toCH(), t = !pv && KHO.kyDung() && KHO.kyDung().to[C.to]; if(!pv && !t) return;
  var mo = pv ? (TO_LOC_PV==='bang' ? 'tat' : TO_LOC_PV) : TO_LOC_MO; if(mo==='rk') return pv ? toInDSPV() : toInDS();
  CT_DUNG = {}; var x = pv ? toBCDSPV(C) : toBCDS(t), l = TO_LOC.find(function(z){ return z[0]===mo; }) || TO_LOC[0], ds = (pv ? toTVPV(C).tv : toTV(t)).filter(l[2]);
  var hien = TO_TU_HIEN.ds || [], cot = toCotDS(pv, pv && !C.xa, toNgayCot(mo), mo).filter(function(c){ var m = toCotChe(c, 'toCotKH'); return c[5] || m==='hien' || (m==='tu' && hien.indexOf(c[0])>=0); });
  var xen = pv ? toXen(ds) : [], bo = function(v){ return String(v).replace(/<\/?a\b[^>]*>/g, ''); };
  x.html = '<table class="bc-bang"><thead><tr>'+cot.map(function(c){ return '<th>'+coChuHTML(c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+ds.map(function(k, i){ var cb = toCanh(k);
    return '<tr class="'+(xen[i] ? 'xen' : '')+(cb.length ? ' canh' : '')+'">'+cot.map(function(c){ var lp = typeof c[4]==='function' ? c[4](k) : (c[4]||''); return toO(bo(c[3](k, i, cb)), /\bs\b/.test(lp) ? 's' : lp==='c' ? 'c' : ''); }).join('')+'</tr>'; }).join('')+'</tbody></table>'+toCanhTong(ds);
  x.ngang = true; x.coChu = cot.length>12 ? Math.max(6.5, 10-(cot.length-12)*0.5) : 0; x.ctChu = ctChuThich(); CT_DUNG = null;
  inBlob(new Blob([toHTMLIn([x], pv ? toGiaPV(C) : t)], {type:'text/html'}), (pv ? x.ten : 'Danh sach to vien '+t.ma)+' (day du).html');
}
/* 3.163: Excel danh sách thêm các cột thêm (đủ cột) */
var TO_COT_X = [['Ngày vay gần nhất', function(k){ return k.nvm ? ngayVNsl(k.nvm) : ''; }], ['Ngày đến hạn', function(k){ return k.dhan ? ngayVNsl(k.dhan) : ''; }], ['Hạn CCCD (ngày)', function(k){ return k.cc && k.cc.den ? ngayVNsl(k.cc.den) : ''; }],
  ['Ấp', function(k){ return k.ap||''; }], ['Ngày sinh', function(k){ return k.ns ? ngayVNsl(k.ns) : ''; }], ['Số món', function(k){ return k.smon||0; }], ['QH / khoanh', function(k){ return k.qhkn||0; }]];
function toThemCotX(aoa, ds){ aoa[0] = aoa[0].concat(TO_COT_X.map(function(x){ return x[0]; }));
  for(var i=1;i<aoa.length;i++) aoa[i] = aoa[i].concat(TO_COT_X.map(function(x){ return ds[i-1] ? x[1](ds[i-1]) : ''; })); return aoa; }
/* danh sách đang lọc → báo cáo in / Excel (cùng khuôn báo cáo tổ) */
function toBCDS(t){
  var tv = toTV(t), l = TO_LOC.find(function(x){ return x[0]===TO_LOC_MO; }) || TO_LOC[0], ds = tv.filter(l[2]), nc = toNgayCot();
  if(l[0]==='rk'){ var B = TO_BD && TO_BD.co ? TO_BD : {ra:[], tr:kyLui(KHO.kyDung().thang, -1)}, a2 = [['STT','Mã KH','Họ tên','Dư nợ '+toNgayDu(B.tr),'Nợ lãi '+toNgayDu(B.tr),'Số dư 105 '+toNgayDu(B.tr),'Đi đâu']], h2 = '';   /* 3.128 · 3.137: + Nợ lãi */
    B.ra.forEach(function(r, i){ a2.push([i+1, r.kh, r.ten, r.dn, r.lt||0, r.t105, r.di]); h2 += '<tr>'+toO(i+1,'c')+toO(r.kh)+toO(coChuHTML(r.ten))+toO(tdnTien(r.dn),'s')+toO((r.lt>0 ? tdnTien(r.lt) : ''),'s')+toO(tdnTien(r.t105),'s')+toO(coChuHTML(r.di))+'</tr>'; });
    return {ten:'Ra khoi to', tieuDe:'DANH SÁCH KHÁCH RA KHỎI TỔ — '+slKyChu(KHO.kyDung().ky).toUpperCase(), ngay:toNgayChu(), aoa:a2,
      html:'<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Dư nợ '+toNgayDu(B.tr)+'</th><th>Nợ lãi '+toNgayDu(B.tr)+'</th><th>Số dư 105 '+toNgayDu(B.tr)+'</th><th>Đi đâu</th></tr></thead><tbody>'+(h2 || '<tr><td colspan="7">Không có khách ra khỏi tổ trong tháng.</td></tr>')+'</tbody></table>'}; }
  var aoa = [['STT','Mã KH','Họ tên','CT vay','Dư nợ','Nợ lãi','Số dư 105','Số TK 105'].concat(toNgayH(nc), ['SĐT','CCCD','Hạn CCCD','Lưu ý','Ghi chú'])], h = '', T = {dn:0, lt:0, t105:0};   /* 3.161: + Lưu ý */   /* 3.137 (anh chốt): cột Nợ lãi cạnh Dư nợ — dư nợ 0 còn lãi = chưa tất nợ */
  ds.forEach(function(k, i){ T.dn += k.dn; T.lt += k.lt; T.t105 += k.t105; var g = toGoiY(k), cc = k.cc.kq==='het' ? 'Hết hạn' : k.cc.kq==='ok' ? 'Còn hạn' : 'Chưa rõ', ng = nc ? toNgayGT(k) : [];
    var cb = toCanh(k); aoa.push([i+1, k.kh, k.ten, k.ct, k.dn, k.lt||0, k.t105, toStkChu(k)].concat(ng, [k.sdt, k.cccd, cc+' — '+k.cc.chu, cb.join(' · '), '']));   /* 3.137: Ghi chú để trống ghi tay */
    h += '<tr'+(cb.length ? ' class="canh"' : '')+'>'+toO(i+1,'c')+toO(k.kh)+toO(coChuHTML(k.ten))+toO(coChuHTML(k.ct))+toO(tdnTien(k.dn),'s')+toO((k.lt>0 ? tdnTien(k.lt) : ''),'s')+toO(to105(k, true),'s')+toO(coChuHTML(toStkChu(k)))+ng.map(function(v){ return toO(coChuHTML(v)); }).join('')+toO(coChuHTML(k.sdt))+toO(k.cc.kq==='het' || k.cc.kq==='sap' ? toCCNhan(k)+' '+ngayVNsl(k.cc.den) : cc)+toO(coChuHTML(cb.join(' · ')))+toO('')+'</tr>'; });
  h += '<tr class="tong">'+toO('')+toO('')+toO('<b>Cộng '+ds.length+' người</b>')+toO('')+toO(tdnTien(T.dn),'s')+toO(tdnTien(T.lt),'s')+toO(tdnTien(T.t105),'s')+toO('')+toNgayH(nc).map(function(){ return toO(''); }).join('')+toO('')+toO('')+toO('')+toO('')+'</tr>';
  aoa.push(['', '', 'Cộng '+ds.length+' người', '', T.dn, T.lt, T.t105, ''].concat(toNgayH(nc).map(function(){ return ''; }), ['', '', '', '', ''])); toThemCotX(aoa, ds);
  return {ten:'Danh sach to vien', tieuDe:'DANH SÁCH TỔ VIÊN'+(l[0]!=='tat' ? ' — '+toLocNhan(l).toUpperCase() : ''), ngay:toNgayChu(), ngang:true, aoa:aoa,
    html:'<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>CT vay</th><th>Dư nợ</th><th>Nợ lãi</th><th>Số dư 105</th><th>Số TK 105</th>'+toNgayTh(nc)+'<th>SĐT</th><th>CCCD</th><th>Lưu ý</th><th style="width:10%">Ghi chú</th></tr></thead><tbody>'+h+'</tbody></table>'+toCanhTong(ds)+
      '<div class="bc-ghi">Có dư nợ = còn món chưa tất toán (còn gốc hoặc còn lãi); dư nợ 0 mà còn nợ lãi vẫn là chưa tất nợ (cột Nợ lãi). Tất nợ = dư nợ 0 và nợ lãi 0; TK 105 còn trên 100.000 đ in đậm (chờ vay lại); 105 = 0 → cho ra. Nền nhạt xen kẽ theo tổ. Hạn CCCD theo Luật Căn cước 2023 (đổi ở tuổi 14, 25, 40, 60; CMND 9 số hết hiệu lực từ 01/01/2025), tính từ ngày sinh + ngày cấp trong Mẫu 31.</div>'};
}
function toInDS(){ var C = toCH(), t = KHO.kyDung() && KHO.kyDung().to[C.to]; if(!t) return; CT_DUNG = {}; var x = toBCDS(t); x.ctChu = ctChuThich(); CT_DUNG = null; inBlob(new Blob([toHTMLIn([x], t)], {type:'text/html'}), 'Danh sach to vien '+t.ma+'.html'); }
function toExcelDS(){ var C = toCH(), t = KHO.kyDung() && KHO.kyDung().to[C.to]; if(!t) return; CT_DUNG = {}; var x = toBCDS(t); x.ctChu = ctChuThich(); CT_DUNG = null; TO_XEM = [x]; toExcel(); }
/* bảng các tổ trong phạm vi (xã / điểm / hội) — chưa chọn tổ */
function toTruocNap(){
  var K = KHO.kyDung(), tr = kyLui(K.thang, -1);
  if(TO_TRUOC && TO_TRUOC.ky===tr) return Promise.resolve(TO_TRUOC);
  if(!KHO.bang('hstd', tr)) return Promise.resolve(TO_TRUOC = {ky:tr, co:false});
  return KHO.bo(tr).then(function(B){
    var kh = {}, t105 = {};
    (B.co.hstd||[]).concat(B.lap||[]).forEach(function(o){ var m = toMaCua(o); if(!o.kh || !m) return; kh[o.kh] = m; var k = m+'|'+o.kh; if((o.t105||0) > (t105[k]||0)) t105[k] = o.t105; });
    var tong = {}; Object.keys(t105).forEach(function(k){ var m = k.split('|')[0]; tong[m] = (tong[m]||0)+t105[k]; });
    return TO_TRUOC = {ky:tr, co:true, kh:kh, t105:tong};
  }).catch(function(){ return TO_TRUOC = {ky:tr, co:false}; });
}
var TO_COT = [   /* [mã, tên, 1 = cột chính (Luôn hiện) / 0 = cột thêm (Tự động), in A4 dọc, tiền (triệu)] — 3.163: cột thêm xếp cuối theo thứ tự ưu tiên anh chốt */
  ['stt','STT',1,1], ['ma','Mã tổ',1,1], ['ten','Tổ trưởng',1,1], ['ap','Ấp',1,1], ['hoi','Hội',1,1],
  ['tv','Tổ viên',1,1], ['co','Có dư nợ',1,1], ['moi','Mới vào',1,0], ['ra','Đề xuất cho ra',1,0], ['con','Còn nhận',1,0],
  ['dn','Dư nợ',1,1,1], ['qh','Quá hạn',1,1,1], ['kn','Khoanh',1,1,1], ['tn','Thu nợ tháng',1,0,1], ['tl','Thu lãi tháng',1,0,1], ['t105','Số dư 105',1,1,1], ['d105','105 tăng/giảm',1,0,1],
  ['mon','Số món vay',0,0], ['tlqh','Tỷ lệ QH (%)',0,0], ['bq','Dư nợ BQ / hộ',0,0,1], ['diem','Điểm GD',0,0], ['lt','Nợ lãi',0,0,1], ['dhs','Món ĐH tháng sau',0,0], ['cch','Khách CCCD hết / sắp hết hạn',0,0], ['ctk','Khách chưa có TK 105',0,0]];
var TO_COT_PGD = [['ten','Xã / Điểm GD',1,1], ['soTo','Số tổ',1,1], ['tv','Tổ viên',1,1], ['co','Có dư nợ',1,1], ['moi','Mới vào',1,0], ['ra','Đề xuất cho ra',1,0],
  ['dn','Dư nợ',1,1,1], ['qh','Quá hạn',1,1,1], ['kn','Khoanh',1,1,1], ['tn','Thu nợ tháng',1,0,1], ['tl','Thu lãi tháng',1,0,1], ['t105','Số dư 105',1,1,1], ['d105','105 tăng/giảm',1,0,1],
  ['mon','Số món vay',0,0], ['tlqh','Tỷ lệ QH (%)',0,0], ['lt','Nợ lãi',0,0,1], ['dhs','Món ĐH tháng sau',0,0], ['cch','Khách CCCD hết / sắp hết hạn',0,0], ['ctk','Khách chưa có TK 105',0,0]];
/* 3.163 (anh chốt): mỗi cột 3 chế độ — Tự động (hiện khi bảng còn chỗ, theo thứ tự ưu tiên) · Luôn hiện · Ẩn; app nhớ (bảng tổ: D.cauHinh.toCot, danh sách khách: toCotKH).
   Dữ liệu cũ (true / false của 3.161) đọc thành Luôn hiện / Ẩn. */
function toCotChe(c, kho){ var x = (D.cauHinh[kho || 'toCot'] || {})[c[0]]; return x===true || x==='hien' ? 'hien' : x===false || x==='an' ? 'an' : x==='tu' ? 'tu' : (c[2] ? 'hien' : 'tu'); }
function toCotBat(c, kho){ return toCotChe(c, kho)!=='an'; }
var TO_TU_HIEN = {}, TO_DS_COT = null;
function toCotVua(){   /* sau khi vẽ: bật dần cột Tự động theo thứ tự ưu tiên, dừng khi bảng sắp tràn ngang khung */
  Array.prototype.forEach.call(document.querySelectorAll('#to-the table[data-tu]'), function(tb){
    var khung = tb.parentNode, ds = tb.getAttribute('data-tu').split(',').filter(Boolean), hien = [], i, j, o;
    if(!khung || !khung.clientWidth) return;
    Array.prototype.forEach.call(tb.querySelectorAll('.tu-hien'), function(x){ x.classList.remove('tu-hien'); });
    var th = tb.tHead, h0 = th ? th.offsetHeight : 0;   /* thêm cột mà làm tiêu đề cột khác xuống thêm dòng (cột bị ép) cũng coi là hết chỗ */
    for(i=0;i<ds.length;i++){ o = tb.querySelectorAll('.tc-'+ds[i]); for(j=0;j<o.length;j++) o[j].classList.add('tu-hien');
      if(tb.scrollWidth > khung.clientWidth+1 || (th && th.offsetHeight > h0+2)){ for(j=0;j<o.length;j++) o[j].classList.remove('tu-hien'); break; } hien.push(ds[i]); }
    TO_TU_HIEN[tb.getAttribute('data-khoa')||''] = hien; });
  slVua();
}
var TO_VUA_HEN = null;
window.addEventListener('resize', function(){ clearTimeout(TO_VUA_HEN); TO_VUA_HEN = setTimeout(toCotVua, 250); });
function toCotDat(kho, ma, v){ var o = D.cauHinh[kho] = D.cauHinh[kho] || {}; o[ma] = v; luu(); }
function toCotHop(kho){
  kho = kho || 'toCot'; var ds = kho==='toCotKH' ? TO_DS_COT : TO_BANG_XUAT && TO_BANG_XUAT.dsCot; if(!ds) return;
  var hien = TO_TU_HIEN[kho==='toCotKH' ? 'ds' : 'bang'] || [];
  moHop('<div class="hop-tit">⚙ Cột của bảng</div><div class="hop-phu"><b>Tự động</b> = hiện khi bảng còn chỗ (theo thứ tự trong danh sách, không để bảng tràn ngang) · <b>Luôn hiện</b> · <b>Ẩn</b>. App nhớ. '+
    (kho==='toCotKH' ? 'In = cột chính A4 ngang; "In đầy đủ" = các cột đang hiện, tự co chữ; Excel đủ cột.' : 'In = cột chính A4 dọc; "In đầy đủ" = các cột đang hiện, A4 ngang; Excel đủ cột.')+'</div>'+
    '<div class="to-cot-ds">'+ds.filter(function(c){ return !c[5] && ['stt','ma','ten','kh'].indexOf(c[0])<0; }).map(function(c){ var m = toCotChe(c, kho), dk = '\''+kho+'\',\''+c[0]+'\'';
      return '<label class="to-cot-dong"><span>'+coChuHTML(c[1])+(m==='tu' ? ' <small>'+(hien.indexOf(c[0])>=0 ? '· đang hiện' : '· đang ẩn (hết chỗ)')+'</small>' : '')+'</span><select onchange="toCotDat('+dk+',this.value)">'+
        [['tu','Tự động'], ['hien','Luôn hiện'], ['an','Ẩn']].map(function(x){ return '<option value="'+x[0]+'"'+(x[0]===m ? ' selected' : '')+'>'+x[1]+'</option>'; }).join('')+'</select></label>'; }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="delete D.cauHinh.'+kho+';luu();dongHop();toVeThe()">↺ Mặc định</button><button class="nho chinh" onclick="dongHop();toVeThe()">Xong</button></div>', true);
}
function toBangDau(tieu, nut){ return '<div class="to-bang-dau"><div class="to-bang-tieu">'+tieu+'</div><div class="to-bang-nut">'+nut+'</div></div>'; }
function toNutXuat(ds){ return (ds!==undefined ? '<button class="nho" onclick="toInDS'+ds+'()" title="A4 ngang — các cột chính">🖨 In danh sách</button><button class="nho" onclick="toInDuDS('+(ds ? 1 : 0)+')" title="A4 ngang — mọi cột đang hiện, tự co chữ">🖨 In đầy đủ</button><button class="nho" onclick="toExcelDS'+ds+'()">📊 Excel</button><button class="nho" onclick="toCotHop(\'toCotKH\')" title="Chọn cột: Tự động / Luôn hiện / Ẩn">⚙ Cột</button>'
  : '<button class="nho" onclick="toBangXuat(\'in\')" title="A4 dọc — các cột chính">🖨 In</button><button class="nho" onclick="toBangXuat(\'inDu\')" title="A4 ngang — mọi cột đang xem">🖨 In đầy đủ</button><button class="nho" onclick="toBangXuat(\'excel\')">📊 Excel</button><button class="nho" onclick="toCotHop()" title="Chọn cột: Tự động / Luôn hiện / Ẩn">⚙ Cột</button>'); }
function toGiaTri(k, S){   /* giá trị số 1 ô (đồng / số) */
  return k==='tlqh' ? (S.dn ? Math.round(S.qh/S.dn*1000)/10 : 0) : k==='bq' ? (S.co ? Math.round(S.dn/S.co) : 0) : S[k];
}
function toOCot(c, v){   /* hiển thị 1 ô theo cột */
  if(v===null || v===undefined || v==='') return '';
  if(typeof v!=='number') return coChuHTML(String(v));
  if(c[0]==='stt') return String(v);
  if(c[0]==='d105') return v ? soTrDau(v) : '';
  if(c[4]) return soTr(v);
  if(c[0]==='tlqh') return v ? v.toLocaleString('vi-VN') : '';
  return v ? String(v) : '';
}
function toBangHTML(X, lopBang){   /* bảng xem: cột đang bật, kẻ ô, tiêu đề + dòng Cộng dính */
  var cot = X.dsCot.filter(function(c){ return X.an.indexOf(c[0])<0 && toCotBat(c); }), tu = cot.filter(function(c){ return toCotChe(c)==='tu'; }).map(function(c){ return c[0]; });
  var lt = function(c){ return tu.indexOf(c[0])>=0 ? ' tu tc-'+c[0] : ''; };   /* 3.163: cột Tự động — ẩn sẵn, toCotVua bật dần khi còn chỗ */
  var dong = function(r, lop, bam){ return '<tr'+(lop ? ' class="'+lop+'"' : '')+(bam ? ' onclick="'+bam+'" title="Bấm để mở"' : '')+'>'+cot.map(function(c){ var v = r.v[c[0]];
    return '<td class="'+(typeof v==='number' || c[0]==='stt' ? 's' : '')+(c[0]==='ten' ? ' to-ten' : '')+lt(c)+'">'+(c[0]==='ten' && r.dau ? r.dau : '')+(r.html && r.html[c[0]]!==undefined ? r.html[c[0]] : toOCot(c, v))+'</td>'; }).join('')+'</tr>'; };
  setTimeout(toCotVua, 0);
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang chon luoi'+(lopBang ? ' '+lopBang : '')+'" data-khoa="bang" data-tu="'+tu.join(',')+'"><thead><tr>'+cot.map(function(c){ return '<th class="'+lt(c).trim()+'">'+coChuHTML(c[0]==='d105' && X.ngaySo ? '105 tăng/giảm từ '+X.ngaySo : c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    X.dong.map(function(r){ return dong(r, r.lop, r.bam); }).join('')+(X.tong ? dong(X.tong, 'tong') : '')+'</tbody></table></div>';
}
function toBangToHTML(C){
  var K = KHO.kyDung(), T = K.to, N = toNguong(), P = TO_TRUOC && TO_TRUOC.ky===kyLui(K.thang, -1) ? TO_TRUOC : null;
  var ds = Object.keys(T).map(function(m){ return T[m]; }).filter(function(t){ return pvLoc(C, t); })
    .sort(function(a, b){ return ((a.tenDiemDu||'')+'|'+(toLaTT(a)?'0':'1')+(a.ten||'')).localeCompare((b.tenDiemDu||'')+'|'+(toLaTT(b)?'0':'1')+(b.ten||''), 'vi'); });   /* 3.132: vay trực tiếp đầu nhóm điểm GD, STT 0 */
  if(!ds.length) return '<div class="rong">Không có tổ trong phạm vi.</div>';
  var tong = toSoMoi(), coMoi = P && P.co, soTo = 0, ttKh = 0, aoa = [], dong = [];
  ds.forEach(function(t){
    var S = toSoTo(t, P), stt = toLaTT(t) ? 0 : ++soTo; if(!stt) ttKh += S.tv;
    toCongSo(tong, S);
    var lech = !toLaTT(t) && ((N.min && S.tv<N.min) || (N.max && S.tv>N.max)), hoi = String(t.dv)==='99' ? 'Trực tiếp' : (tdnHoi(t.dv)||'');
    var v = {stt:stt, ma:toLaTT(t) ? '—' : t.ma, ten:toLaTT(t) ? 'Vay trực tiếp' : (t.ten||''), diem:t.tenDiemDu||'', ap:t.tenThon||'', hoi:hoi, tv:S.tv, co:S.co, moi:coMoi ? S.moi : '', ra:S.ra, con:N.max && !toLaTT(t) ? Math.max(0, N.max-S.tv) : '', mon:S.mon,
      dn:S.dn, qh:S.qh, kn:S.kn, tlqh:toGiaTri('tlqh', S), bq:toGiaTri('bq', S), tn:S.tn, tl:S.tl, t105:S.t105, d105:S.d105===null ? '' : S.d105, lt:S.lt, dhs:S.dhs, cch:S.cch, ctk:S.ctk};
    aoa.push([stt, toLaTT(t) ? '' : t.ma, v.ten, v.diem, v.ap, hoi, S.tv, S.co, coMoi ? S.moi : '', S.ra, S.dn, S.qh, S.kn, S.tn, S.tl, S.t105, S.d105===null ? '' : S.d105]);
    dong.push({v:v, bam:'toChonTo(\''+t.ma+'\')', html:{ten:'<b>'+coChuHTML(v.ten)+'</b>', tv:lech ? '<span class="to-cc het" title="ngoài ngưỡng '+(N.min||'')+'–'+(N.max||'')+'">'+S.tv+'</span>' : String(S.tv), ra:S.ra ? '<b class="do">'+S.ra+'</b>' : ''}});
  });
  var vt = {stt:'', ma:'', ten:'Cộng '+soTo+' tổ'+(ttKh ? ' + vay trực tiếp' : ''), diem:'', ap:'', hoi:'', tv:tong.tv, co:tong.co, moi:coMoi ? tong.moi : '', ra:tong.ra, con:'', mon:tong.mon, dn:tong.dn, qh:tong.qh, kn:tong.kn, tlqh:toGiaTri('tlqh', tong), bq:toGiaTri('bq', tong), tn:tong.tn, tl:tong.tl, t105:tong.t105, d105:coMoi ? tong.d105 : '', lt:tong.lt, dhs:tong.dhs, cch:tong.cch, ctk:tong.ctk};
  var an = [C.hoi ? 'hoi' : '', C.diem ? 'diem' : '', N.max ? '' : 'con', coMoi ? '' : 'moi', coMoi ? '' : 'd105'].filter(Boolean), ngaySo = coMoi ? toNgayDu(P.ky) : '';
  TO_BANG_XUAT = {tieuDe:'BẢNG CÁC TỔ TK&VV', cot:['STT','Mã tổ','Tổ trưởng','Điểm GD','Ấp','Hội','Tổ viên','Có dư nợ','Mới vào','Đề xuất cho ra','Dư nợ','Quá hạn','Khoanh','Thu nợ tháng','Thu lãi tháng','Số dư 105','105 tăng/giảm'], aoa:aoa,
    tong:['', '', vt.ten, '', '', '', tong.tv, tong.co, coMoi ? tong.moi : '', tong.ra, tong.dn, tong.qh, tong.kn, tong.tn, tong.tl, tong.t105, coMoi ? tong.d105 : ''],
    dsCot:TO_COT, dong:dong, an:an, ngaySo:ngaySo, tongV:{v:vt, html:{ten:'<b>'+coChuHTML(vt.ten)+'</b>'+(ttKh ? '<br><small>+ vay trực tiếp '+ttKh+' khách</small>' : '')}}};
  var X = Object.assign({}, TO_BANG_XUAT, {tong:TO_BANG_XUAT.tongV});
  return toBangDau('<b>'+soTo+'</b> tổ'+(ttKh ? ' <small>(+ vay trực tiếp, STT 0 — không tính là tổ)</small>' : '')+' · '+coChuHTML(pvChu(C, K))+' <small class="to-dv">· triệu đồng</small>'+
      '<div class="to-the-so">'+toKyKQ(K)+' · bấm 1 dòng để mở tổ'+(coMoi ? ' · mới vào / 105 tăng giảm so với '+ngaySo : ' · chưa có Mẫu 31 tháng trước nên chưa tính mới vào / 105 tăng giảm')+'</div>',
      toNutXuat()+'<button class="nho" onclick="toDatNguong()" title="Ngưỡng số tổ viên">⚙ Ngưỡng'+(N.min || N.max ? ' ('+(N.min||'')+'–'+(N.max||'')+')' : '')+'</button>')+
    toBangHTML(X)+
    '<p class="ghi" title="Vay trực tiếp không phải tổ: STT 0, không tính vào số tổ; khách và số tiền vẫn cộng. Tổ viên = khách trong tổ theo Mẫu 31 (kể cả khách chỉ gửi 105). Có dư nợ = còn món chưa tất toán (còn gốc hoặc còn lãi). Đề xuất cho ra = không còn món vay và 105 = 0. Mới vào = khách có trong tổ kỳ này mà kỳ so sánh chưa ở tổ này.">ⓘ Rê chuột để xem cách tính các cột.</p>';
}
