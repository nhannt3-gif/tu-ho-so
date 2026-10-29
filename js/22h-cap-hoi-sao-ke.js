/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 5437–6227 của bản 3.234), không đổi logic — 👥 Cấp hội / điểm GD / xã / PGD · 👤 kiểm trùng · 📑 Sao kê */
/* ==========================================================
   3.132 (anh chốt) — CẤP HỘI / ĐIỂM GD / XÃ / PGD: dòng tóm tắt + chip lọc như của tổ; mặc định bảng các tổ (PGD: Cộng PGD trên đầu, xã → điểm GD)
   ========================================================== */
var TO_LOC_PV = 'bang', TO_BDT = null, TO_PVC = null, TO_BANG_XUAT = null;
function toPVFn(C){ return function(m){ var t = KHO.kyDung() && KHO.kyDung().to[m]; return t ? pvLoc(C, t) : !C.xa; }; }
function toGiaPV(C){ return {pv:true, ma:'PV', ten:pvChu(C, KHO.kyDung())}; }   /* "tổ giả" cho đầu báo cáo / tên file của phạm vi */
function toDsTo(C){ return Object.keys(KHO.kyDung().to).map(function(m){ return KHO.kyDung().to[m]; }).filter(function(t){ return pvLoc(C, t); }); }
function toBDTNap(){   /* bản đồ khách → tổ của tháng đang xem + tháng trước (dùng chung cho mọi phạm vi) */
  var ky = KHO.kyDung().ky, tr = kyLui(KHO.kyDung().thang, -1);   /* 3.136 */
  if(TO_BDT && TO_BDT.ky===ky && TO_BDT.K===KHO.kyDung()) return Promise.resolve(TO_BDT);
  return Promise.all([toMapKy(ky), toMapKy(tr)]).then(function(a){ return TO_BDT = {K:KHO.kyDung(), ky:ky, tr:tr, co:!!(a[0] && a[1]), Mn:a[0]||{}, Mp:a[1]||{}}; });
}
function toTVPV(C){   /* khách của cả phạm vi (mỗi khách gắn tổ) + biến động phạm vi — giữ sẵn theo phạm vi */
  var bd = TO_BDT && TO_BDT.K===KHO.kyDung() && TO_BDT.ky===KHO.kyDung().ky ? TO_BDT : null, khoa = [KHO.kyDung().ky, C.xa, C.diem, C.hoi, C.ap, bd && bd.co ? 1 : 0].join('|');
  if(TO_PVC && TO_PVC.K===KHO.kyDung() && TO_PVC.khoa===khoa) return TO_PVC;
  var ds = toDsTo(C), tv = [];
  ds.forEach(function(t){ toTV(t).forEach(function(k){ k.to = t; k.vao = null;
    if(bd && bd.co){ var p = bd.Mp[k.kh]; if(!(p && p.to===t.ma)){ var x = bd.Mn[k.kh]; k.vao = Object.assign({ngay:x ? x.nv : ''}, toVaoTu(k.kh, bd.Mp)); } }
    tv.push(k); }); });
  var B = bd && bd.co ? Object.assign(toBienDong(toPVFn(Object.assign({}, C)), bd.Mn, bd.Mp), {co:true, ky:bd.ky, tr:bd.tr}) : {co:false, ky:KHO.kyDung().ky, tr:kyLui(KHO.kyDung().thang, -1), vao:{}, ra:[]};
  return TO_PVC = {K:KHO.kyDung(), khoa:khoa, ds:ds, tv:tv, B:B};
}
function toPVHTML(C){
  var X = toTVPV(C), tv = X.tv, B = X.B, soTo = X.ds.filter(function(t){ return !toLaTT(t); }).length, ttKh = 0, dn = 0, qh = 0, kn = 0, t105 = 0, co = 0;
  tv.forEach(function(k){ dn += k.dn; qh += k.qh; kn += k.kn; t105 += k.t105; if(k.conNo) co++; if(toLaTT(k.to)) ttKh++; });
  var dem = function(m){ return tv.filter(toLocHam(m)).length; };
  var the = '<div class="to-the"><div class="to-the-ten"><b>'+coChuHTML(pvChu(C, KHO.kyDung()))+'</b> · <b>'+soTo+'</b> tổ'+(ttKh ? ' <span class="to-the-phu">+ vay trực tiếp '+ttKh+' khách (không tính là tổ)</span>' : '')+toDong0HTML(X.ds)+'</div>'+
    '<div class="to-the-so"><b>'+tv.length+'</b> tổ viên: <b>'+co+'</b> có dư nợ · <b>'+dem('ko105')+'</b> không dư nợ còn 105 · <b class="do">'+dem('ra')+'</b> đề xuất cho ra · <b class="do">'+dem('cccd')+'</b> CCCD hết hạn'+
      ' │ dư nợ <b>'+tdnTr(dn)+'</b> · QH <b>'+(qh ? tdnTr(qh) : 0)+'</b> · khoanh <b>'+(kn ? tdnTr(kn) : 0)+'</b> · 105 <b>'+tdnTr(t105)+'</b>'+(TO_BDT ? toBDChu(B) : ' │ Biến động: đang so tháng trước…')+'</div></div>';
  var xem = '<button class="to-loc'+(TO_LOC_PV==='bang' ? ' bat' : '')+'" onclick="TO_LOC_PV=\'bang\';toVeThe()">📋 '+(C.xa ? 'Bảng các tổ' : 'Bảng theo xã, điểm GD')+'</button>'+
    '<button class="to-loc" onclick="toBDNam()" title="Khách vào / ra khỏi tổ từng tháng trong năm, cộng theo các tổ của phạm vi">📅 Biến động cả năm</button>';
  var than = TO_LOC_PV==='bang' ? (C.xa ? toBangToHTML(C) : toBangPGDHTML()) : toDsPVHTML(C, X);
  setTimeout(toChipGon, 0);
  TO_TV_MA = '';
  return the+toChipKhung(xem, tv, TO_LOC_PV, 'TO_LOC_PV', B)+than;
}
function toDong0HTML(ds){   /* 3.145: chip "cần đóng tổ" — bấm mở danh sách, bấm tên mở tổ */
  var d = ds.filter(function(t){ return t.canDong; }); if(!d.length) return '';
  return ' <details class="to-dong0-ds"><summary class="to-dong0">⚠ '+d.length+' tổ dư nợ 0 — cần đóng tổ</summary>'+d.map(function(t){ return '<a href="#" onclick="toChonTo(\''+t.ma+'\');return false">'+coChuHTML((t.ten||'Tổ '+t.ma)+(t.tenThon ? ' · '+t.tenThon : ''))+'</a> <small>('+coChuHTML(toDongNguon(t))+')</small>'; }).join(' · ')+'</details>';
}
var TO_PV_MAX = 800;   /* màn hình hiện tối đa ngần này dòng; In / Excel đủ */
function toDsPVHTML(C, X){
  var mo = TO_LOC_PV, B = X.B, coXa = !C.xa, nut = '', dauDS = function(n){ return toBangDau('<b>'+n+'</b> khách · '+coChuHTML(pvChu(C, KHO.kyDung()))+' · '+coChuHTML(toLocNhan(TO_LOC.find(function(l){ return l[0]===mo; }) || TO_LOC[0])), toNutXuat('PV')); };   /* 3.161: nút In / Excel ở đầu bảng */
  if(mo==='rk'){ if(!B.co) return '<div class="rong">Chưa có Mẫu 31 '+toNgayDu(B.tr)+' để so — nạp Mẫu 31 tháng trước để biết ai ra khỏi tổ.</div>';
    return dauDS(B.ra.length)+'<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi"><thead><tr><th>STT</th><th>Mã KH</th><th>Tổ cũ</th><th>Họ tên</th><th>Dư nợ '+toNgayDu(B.tr)+'</th><th>Nợ lãi '+toNgayDu(B.tr)+'</th><th>Số dư 105 '+toNgayDu(B.tr)+'</th><th>Đi đâu</th></tr></thead><tbody>'+
      (B.ra.slice(0, TO_PV_MAX).map(function(r, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+r.kh+'</td><td>'+coChuHTML(toTenToMa(r.to))+'</td><td class="to-ten">'+coChuHTML(r.ten)+'</td><td class="s">'+tdnTien(r.dn)+'</td><td class="s">'+(r.lt>0 ? tdnTien(r.lt) : '')+'</td><td class="s">'+tdnTien(r.t105)+'</td><td>'+coChuHTML(r.di)+'</td></tr>'; }).join('')
        || '<tr><td colspan="8" class="rong">Không có khách ra khỏi tổ trong tháng.</td></tr>')+'</tbody></table></div>'+(B.ra.length>TO_PV_MAX ? '<p class="ghi">Màn hình hiện '+TO_PV_MAX+' / '+B.ra.length+' dòng — In / Excel có đủ.</p>' : '')+nut; }
  var l = TO_LOC.find(function(x){ return x[0]===mo; }) || TO_LOC[0], ds = X.tv.filter(l[2]), nc = toNgayCot(mo);
  return dauDS(ds.length)+toDsBangHTML(ds, toCotDS(true, coXa, nc, mo), toXen(ds), 'Không có khách nào trong bộ lọc này.')+(ds.length>TO_PV_MAX ? '<p class="ghi">Màn hình hiện '+TO_PV_MAX+' / '+ds.length+' dòng — In / Excel có đủ.</p>' : '')+nut;
}
function toBCDSPV(C){   /* danh sách đang lọc của phạm vi → In / Excel */
  var X = toTVPV(C), mo = TO_LOC_PV==='bang' ? 'tat' : TO_LOC_PV, l = TO_LOC.find(function(x){ return x[0]===mo; }) || TO_LOC[0], coXa = !C.xa, pv = pvChu(C, KHO.kyDung());
  if(mo==='rk'){ var B = X.B, a2 = [['STT','Mã KH','Tổ cũ','Họ tên','Dư nợ '+toNgayDu(B.tr),'Nợ lãi '+toNgayDu(B.tr),'Số dư 105 '+toNgayDu(B.tr),'Đi đâu']], h2 = '';
    B.ra.forEach(function(r, i){ a2.push([i+1, r.kh, toTenToMa(r.to), r.ten, r.dn, r.lt||0, r.t105, r.di]); h2 += '<tr>'+toO(i+1,'c')+toO(r.kh)+toO(coChuHTML(toTenToMa(r.to)))+toO(coChuHTML(r.ten))+toO(tdnTien(r.dn),'s')+toO((r.lt>0 ? tdnTien(r.lt) : ''),'s')+toO(tdnTien(r.t105),'s')+toO(coChuHTML(r.di))+'</tr>'; });
    return {ten:'Ra khoi to', tieuDe:'DANH SÁCH KHÁCH RA KHỎI TỔ — '+slKyChu(KHO.kyDung().ky).toUpperCase(), ngay:toNgayChu(), aoa:a2, ngang:true,
      html:'<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Tổ cũ</th><th>Họ tên</th><th>Dư nợ '+toNgayDu(B.tr)+'</th><th>Nợ lãi '+toNgayDu(B.tr)+'</th><th>Số dư 105 '+toNgayDu(B.tr)+'</th><th>Đi đâu</th></tr></thead><tbody>'+(h2 || '<tr><td colspan="8">Không có khách ra khỏi tổ trong tháng.</td></tr>')+'</tbody></table>'}; }
  var ds = X.tv.filter(l[2]), nc = toNgayCot(mo), T = {dn:0, lt:0, t105:0}, h = '';
  var aoa = [['STT','Mã KH','Tổ','Họ tên'].concat(coXa ? ['Xã'] : [], ['CT vay','Dư nợ','Nợ lãi','Số dư 105','Số TK 105'], toNgayH(nc), ['SĐT','CCCD','Hạn CCCD','Lưu ý','Ghi chú'])], xen = toXen(ds);
  ds.forEach(function(k, i){ T.dn += k.dn; T.lt += k.lt; T.t105 += k.t105; var g = toGoiY(k), cc = k.cc.kq==='het' ? 'Hết hạn' : k.cc.kq==='ok' ? 'Còn hạn' : 'Chưa rõ', ng = nc ? toNgayGT(k, mo) : [], to = toLaTT(k.to) ? 'Vay trực tiếp' : (k.to.ten||k.to.ma);
    var cb = toCanh(k); aoa.push([i+1, k.kh, to, k.ten].concat(coXa ? [k.to.tenXa||''] : [], [k.ct, k.dn, k.lt||0, k.t105, toStkChu(k)], ng, [k.sdt, k.cccd, cc+' — '+k.cc.chu, cb.join(' · '), '']));
    h += '<tr class="'+(xen[i] ? 'xen' : '')+(cb.length ? ' canh' : '')+'">'+toO(i+1,'c')+toO(k.kh)+toO(coChuHTML(to))+toO(coChuHTML(k.ten))+(coXa ? toO(coChuHTML(k.to.tenXa||'')) : '')+toO(coChuHTML(k.ct))+toO(tdnTien(k.dn),'s')+toO((k.lt>0 ? tdnTien(k.lt) : ''),'s')+toO(to105(k, true),'s')+toO(coChuHTML(toStkChu(k)))+ng.map(function(v){ return toO(coChuHTML(v)); }).join('')+toO(coChuHTML(k.sdt))+toO(k.cc.kq==='het' || k.cc.kq==='sap' ? toCCNhan(k)+' '+ngayVNsl(k.cc.den) : cc)+toO(coChuHTML(cb.join(' · ')))+toO('')+'</tr>'; });
  h += '<tr class="tong">'+toO('')+toO('')+toO('')+toO('<b>Cộng '+ds.length+' người</b>')+(coXa ? toO('') : '')+toO('')+toO(tdnTien(T.dn),'s')+toO(tdnTien(T.lt),'s')+toO(tdnTien(T.t105),'s')+toO('')+toNgayH(nc).map(function(){ return toO(''); }).join('')+toO('')+toO('')+toO('')+toO('')+'</tr>';
  aoa.push(['', '', '', 'Cộng '+ds.length+' người'].concat(coXa ? [''] : [], ['', T.dn, T.lt, T.t105, ''], toNgayH(nc).map(function(){ return ''; }), ['', '', '', '', ''])); toThemCotX(aoa, ds);
  return {ten:'Danh sach '+boDauTen(pv), tieuDe:'DANH SÁCH TỔ VIÊN'+(mo!=='tat' ? ' — '+toLocNhan(l).toUpperCase() : ''), ngay:toNgayChu(), ngang:true, aoa:aoa,
    html:'<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Tổ</th><th>Họ tên</th>'+(coXa ? '<th>Xã</th>' : '')+'<th>CT vay</th><th>Dư nợ</th><th>Nợ lãi</th><th>Số dư 105</th><th>Số TK 105</th>'+toNgayTh(nc)+'<th>SĐT</th><th>CCCD</th><th>Lưu ý</th><th style="width:10%">Ghi chú</th></tr></thead><tbody>'+h+'</tbody></table>'+toCanhTong(ds)+
      '<div class="bc-ghi">Có dư nợ = còn món chưa tất toán (còn gốc hoặc còn lãi); dư nợ 0 mà còn nợ lãi vẫn là chưa tất nợ (cột Nợ lãi). Tất nợ = dư nợ 0 và nợ lãi 0; TK 105 còn trên 100.000 đ in đậm (chờ vay lại); 105 = 0 → cho ra. Nền nhạt xen kẽ theo tổ. Vay trực tiếp không phải tổ.</div>'};
}
function toInDSPV(){ var C = toCH(); CT_DUNG = {}; var x = toBCDSPV(C); x.ctChu = ctChuThich(); CT_DUNG = null; inBlob(new Blob([toHTMLIn([x], toGiaPV(C))], {type:'text/html'}), x.ten+'.html'); }
function toChonPV(xa, diem){ var C = toCH(); C.xa = xa||''; C.diem = diem||''; C.to = ''; luu(); pvVeCay('to'); }   /* 3.133: giữ Hội đang lọc */
/* bảng cấp PGD: Cộng PGD trên đầu (bảng dài khỏi cuộn) → từng xã (dòng tổng) → các điểm GD; số tổ không tính vay trực tiếp */
function toBangPGDHTML(){
  var K = KHO.kyDung(), P = TO_TRUOC && TO_TRUOC.ky===kyLui(K.thang, -1) ? TO_TRUOC : null, coMoi = P && P.co, xa = {}, tong = toSoMoi(), aoa = [], dong = [];
  var C = toCH();
  Object.keys(K.to).forEach(function(m){ var t = K.to[m]; if(!pvLoc(C, t)) return; var s = toSoTo(t, P); s.soTo = toLaTT(t) ? 0 : 1;   /* 3.133: lọc Hội toàn PGD */
    var X = xa[t.xa] = xa[t.xa] || {ma:t.xa, ten:t.tenXa||t.xa, s:toSoMoi(), diem:{}}, d = X.diem[t.khoaDiem] = X.diem[t.khoaDiem] || {ma:t.khoaDiem, ten:t.tenDiemDu||t.tenDiem||'(chưa rõ điểm)', s:toSoMoi()};
    toCongSo(X.s, s); toCongSo(d.s, s); toCongSo(tong, s); });
  var them = function(ten, S, lop, bam, dau){
    aoa.push([ten, S.soTo, S.tv, S.co, coMoi ? S.moi : '', S.ra, S.dn, S.qh, S.kn, S.tn, S.tl, S.t105, coMoi ? S.d105 : '']);
    dong.push({lop:lop, bam:bam, dau:dau, v:{ten:ten, soTo:S.soTo, tv:S.tv, co:S.co, moi:coMoi ? S.moi : '', ra:S.ra, mon:S.mon, dn:S.dn, qh:S.qh, kn:S.kn, tlqh:toGiaTri('tlqh', S), tn:S.tn, tl:S.tl, t105:S.t105, d105:coMoi ? S.d105 : '', lt:S.lt, dhs:S.dhs, cch:S.cch, ctk:S.ctk}, html:{ra:S.ra ? '<b class="do">'+S.ra+'</b>' : ''}}); };
  var vi = function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi'); }, q = function(v){ return String(v).replace(/'/g, "\\'"); };
  them('CỘNG TOÀN PGD'+(C.hoi ? ' · '+pvChu(C, K).replace(/^Toàn PGD · /, '') : ''), tong, 'tong', '', '');
  Object.keys(xa).map(function(k){ return xa[k]; }).sort(vi).forEach(function(X){
    them(X.ten, X.s, 'nhom', 'toChonPV(\''+q(X.ma)+'\',\'\')', '');
    Object.keys(X.diem).map(function(k){ return X.diem[k]; }).sort(vi).forEach(function(d){ them(d.ten, d.s, 'diem', 'toChonPV(\''+q(X.ma)+'\',\''+q(d.ma)+'\')', '&nbsp;&nbsp;&nbsp;Điểm '); });
  });
  var ngaySo = coMoi ? toNgayDu(P.ky) : '';
  TO_BANG_XUAT = {tieuDe:'BẢNG TỔ TK&VV THEO XÃ, ĐIỂM GIAO DỊCH', cot:['Xã / Điểm GD','Số tổ','Tổ viên','Có dư nợ','Mới vào','Đề xuất cho ra','Dư nợ','Quá hạn','Khoanh','Thu nợ tháng','Thu lãi tháng','Số dư 105','105 tăng/giảm'], aoa:aoa, tong:null,
    dsCot:TO_COT_PGD, dong:dong, an:coMoi ? [] : ['moi','d105'], ngaySo:ngaySo};
  return toBangDau('<b>'+coChuHTML(pvChu(C, K))+'</b> <small class="to-dv">· triệu đồng</small><div class="to-the-so">'+toKyKQ(K)+' · bấm dòng xã / điểm GD để xem các tổ'+(coMoi ? ' · mới vào / 105 tăng giảm so với '+ngaySo : ' · chưa có Mẫu 31 tháng trước nên chưa tính mới vào / 105 tăng giảm')+'</div>', toNutXuat())+
    toBangHTML(TO_BANG_XUAT, 'to-bang-pgd')+
    '<p class="ghi" title="Số tổ không tính vay trực tiếp; khách và số tiền vay trực tiếp vẫn cộng vào xã / điểm GD. Màn hình và bản in: triệu đồng; Excel: đồng.">ⓘ Rê chuột để xem cách tính.</p>';
}
function toBangXuat(cach){   /* 3.161: 'in' = A4 dọc các cột chính · 'inDu' = A4 ngang các cột đang xem · 'excel' = đủ cột, số đồng */
  var X = TO_BANG_XUAT, C = toCH(); if(!X) return;
  var dongs = X.dong.concat(X.tongV ? [Object.assign({lop:'tong'}, X.tongV)] : []), hien = TO_TU_HIEN.bang || [];
  if(cach==='excel'){ var cx = X.dsCot.filter(function(c){ return X.an.indexOf(c[0])<0; });   /* 3.163: Excel đủ mọi cột (kể cả cột thêm), số đồng */
    var aoa = [cx.map(function(c){ return c[0]==='d105' && X.ngaySo ? '105 tăng/giảm từ '+X.ngaySo : c[1]; })].concat(dongs.map(function(r){ return cx.map(function(c){ var v = r.v[c[0]]; return c[0]==='ma' && v==='—' ? '' : v===undefined || v===null ? '' : v; }); }));
    TO_XEM = [{ten:X.cot[0]==='STT' ? 'Bang cac to' : 'Bang theo xa', tieuDe:X.tieuDe, ngay:toNgayChu(), aoa:aoa, html:''}]; return toExcel(toGiaPV(C)); }
  var du = cach==='inDu', cot = X.dsCot.filter(function(c){ var m = toCotChe(c); return X.an.indexOf(c[0])<0 && (du ? m==='hien' || (m==='tu' && hien.indexOf(c[0])>=0) : c[3]); });
  var html = '<table class="bc-bang luoi"><thead><tr>'+cot.map(function(c){ return '<th>'+coChuHTML(c[0]==='d105' && X.ngaySo ? '105 tăng/giảm từ '+X.ngaySo : c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    dongs.map(function(r){ return '<tr'+(r.lop==='tong' || r.lop==='nhom' ? ' class="tong"' : '')+'>'+cot.map(function(c){ var v = r.v[c[0]]; return toO((c[0]==='ten' && r.dau ? r.dau : '')+toOCot(c, v), typeof v==='number' || c[0]==='stt' ? 's' : ''); }).join('')+'</tr>'; }).join('')+'</tbody></table>'+
    '<div class="bc-ghi">Đơn vị tiền: triệu đồng. Vay trực tiếp không phải tổ (STT 0), không tính vào số tổ; khách và số tiền vẫn cộng.'+(X.ngaySo ? ' Mới vào / 105 tăng giảm so với số liệu ngày '+X.ngaySo+'.' : '')+'</div>';
  var x = {ten:X.cot[0]==='STT' ? 'Bang cac to' : 'Bang theo xa', tieuDe:X.tieuDe, ngay:toNgayChu(), ngang:du, html:html, aoa:[]};
  inBlob(new Blob([toHTMLIn([x], toGiaPV(C))], {type:'text/html'}), x.ten+'.html');
}

function toDiaChi(t){
  return [t.tenThon ? 'Ấp '+String(t.tenThon).replace(/^(ấp|ap|khu phố|kp)\s+/i, '') : '', t.tenXa||'', t.tenDiem ? 'Điểm GD '+String(t.tenDiem).trim()+(t.ngayGD ? ' (ngày '+t.ngayGD+')' : '') : '', String(t.dv)==='99' ? '' : tdnHoi(t.dv),
    t.pho ? 'Tổ phó '+t.pho : '', t.sdt ? '☎ '+t.sdt : ''].filter(Boolean).join(' · ');
}
/* gom số theo khách của tổ (món theo dòng chính, 105 = số lớn nhất mỗi khách kể cả dòng lặp) */
function toKhach(t){   /* 3.381: đọc qua KHO CHUẨN (js/73 kcTo) — kết quả như cũ */
  var x = typeof kcTo==='function' ? kcTo(KHO.kyDung(), t.ma) : {dong:KHO.kyDung().kh[t.ma] || [], lap:(KHO.kyDung().lap || []).filter(function(o){ return o.to===t.ma; })};
  var ds = x.dong, lap = {}, kh = {};
  x.lap.forEach(function(o){ (lap[o.kh] = lap[o.kh]||[]).push(o); });
  ds.forEach(function(o){
    var k = kh[o.kh] = kh[o.kh] || {kh:o.kh, ten:o.ten||'', mon:[], dn:0, qh:0, kn:0, lt:0, t105:0, stk:[], coTK:false};
    if(!k.ten && o.ten) k.ten = o.ten;
    if(o.ku){ k.mon.push(o); k.dn += o.dn||0; k.qh += o.qh||0; k.kn += o.kn||0; k.lt += laiTon(o); }
    [o].concat(lap[o.kh]||[]).forEach(function(x){ if((x.t105||0) > k.t105) k.t105 = x.t105; if(slCoTK(x.stk)) k.coTK = true; slStk(x.stk).forEach(function(z){ if(k.stk.indexOf(z)<0) k.stk.push(z); }); });
  });
  return Object.keys(kh).sort().map(function(m){ var k = kh[m]; k.stk = slStkKH(m, k.stk); return k; });   /* 3.120: số sổ 105 tham chiếu Dư nợ chi tiết (qua danh bạ) */
}
function slStkDB(kh){ var c = KHO.danhBa(kh); return c ? slStk(c.stk) : []; }
function slStkKH(kh, ds){ var c = KHO.danhBa(kh); if(c && c.stkNguon==='dnct' && slStk(c.stk).length) return slStk(c.stk); return ds && ds.length ? ds : slStkDB(kh); }   /* 3.120: số sổ 105 — Dư nợ chi tiết trước, rồi Mẫu 31, rồi danh bạ */

/* ---------- báo cáo: mỗi báo cáo trả {ten, tieuDe, html (phần thân), aoa (Excel)} ---------- */
/* 3.136 (anh chốt): kỳ NGÀY — mỗi loại file lấy theo ngày nào (đúng ngày / mượn bảng liền trước) → dòng ghi chú; KTGS chỉ cảnh báo trên màn hình */
var SL_NGUON_TEN = [['hstd','Mẫu 31'],['dnct','Dư nợ chi tiết'],['khd','KHĐ'],['nqh','Quá hạn'],['nk','Khoanh'],['tt','Tổ trưởng'],['dsto','Danh sách tổ']];
function slNguonKy(n){ return n.length>7 ? ngayVNsl(n).slice(0, 5) : 'cuối T'+(+n.slice(5, 7))+(n.slice(0, 4)!==String(nay().getFullYear()) ? '/'+n.slice(0, 4) : ''); }
function slNguonDs(B){ return SL_NGUON_TEN.map(function(x){ var n = B.nguon && B.nguon[x[0]]; return {k:x[0], ten:x[1], ky:n || '', dung:n===B.ky}; }); }
function slNguonChu(B){   /* dạng chữ (bản in / Excel): chỉ nêu loại mượn bảng khác ngày */
  if(!B || String(B.ky).length<=7) return '';
  var m = slNguonDs(B).filter(function(x){ return x.ky && !x.dung; }); return m.length ? m.map(function(x){ return x.ten+' '+slNguonKy(x.ky); }).join('; ') : '';
}
function slNguonHTML(B, kt){
  if(!B || String(B.ky).length<=7) return '';
  var ds = slNguonDs(B), co = ds.filter(function(x){ return x.ky; }), dung = co.filter(function(x){ return x.dung; }), muon = co.filter(function(x){ return !x.dung; }), khong = ds.filter(function(x){ return !x.ky; });
  var vang = muon.length || !dung.length, tit = 'Kỳ ngày '+ngayVNsl(B.ky)+': '+(dung.length ? 'có '+dung.map(function(x){ return x.ten; }).join(', ') : 'chưa có file nào đúng ngày')+
    (muon.length ? ' · thiếu '+muon.map(function(x){ return x.ten; }).join(', ')+' → lấy theo '+muon.map(function(x){ return slNguonKy(x.ky); }).filter(function(v, i, a){ return a.indexOf(v)===i; }).join(', ') : '')+
    (khong.length ? ' · không có '+khong.map(function(x){ return x.ten; }).join(', ')+' (bỏ qua phần đó)' : '');
  if(kt) return '<span class="sl-chip '+(vang ? 'vang' : 'xanh')+'" title="'+coChuHTML(tit)+'">'+(vang ? '⚠' : '📌')+' Ngày '+ngayVNsl(B.ky).slice(0, 5)+'</span>';   /* 3.163: thành chip */
  /* 3.390 (BAN_GIAO_TK3_2710 mục 3.1): dòng cam "📌 Số liệu ngày … · Mẫu 31: … · KHĐ: …" → 1 chip trên dải LỌC ĐỊA BÀN, rê chuột xem từng file */
  slChipThem('<span class="sl-chip '+(vang ? 'vang' : 'xanh')+' sl-nguon-chip" title="'+coChuHTML(tit)+'">📅 Số liệu '+ngayVNsl(B.ky)+(muon.length ? ' · ⚠ '+muon.length+' file lấy ngày trước' : '')+'</span>');
  return '';
}
function toNgayChu(){ var m = slNguonChu(KHO.kyDung().B); return 'Số liệu đến ngày '+ngayVNsl(KHO.kyDung().ngay)+' ('+KHO.kyDung().hsTen+(m ? '; '+m : '')+')'; }
function toDauBC(t, tieuDe, ngayChu){
  return bcDauTrang(ngayChu, tieuDe, t.pv ? 'Phạm vi: <b>'+coChuHTML(t.ten)+'</b>' : 'Tổ TK&VV: <b>'+coChuHTML(t.ten||'')+'</b> (mã '+t.ma+') · '+coChuHTML(toDiaChi(t)));   /* 3.387: khuôn in chung js/75 */
}
function toO(v, lop){ return '<td'+(lop ? ' class="'+lop+'"' : '')+'>'+v+'</td>'; }
function toSo(n){ return n ? tdnTien(n) : '0'; }
function toBaoCao(k, t){
  if(k==='ds') return toBCDanhSach(t);
  if(k==='no') return toBCNo(t);
  if(k==='tk') return toBCTK105(t);
  if(k==='ct') return toBCChiaTach(t);
}
/* 3.139 (anh chốt): DANH SÁCH DỰ KIẾN CHIA TÁCH TỔ — A4 ngang, tối đa 2 trang, mỗi hộ 1 dòng, sắp theo mã KH (cùng ấp nên không cột ấp);
   QH / khoanh ghi sau tên, in đậm; cột "Tổ mới" để trống — tổ trưởng ghi 1 / 2 / 3 theo dòng dự kiến (1 tổ chia tối đa 3 tổ); ký Tổ trưởng */
function toBCChiaTach(t){
  var tv = toTV(t).slice().sort(function(a, b){ return a.kh<b.kh ? -1 : 1; }), rows = kcTo(KHO.kyDung(), t.ma).dong, T = {dn:0, lt:0, t105:0}, h = '', ch = ' …………………… ';
  var vc = function(kh){ var o = rows.find(function(x){ return x.kh===kh && x.voChong; }); return o ? String(o.voChong).trim() : ''; };
  var aoa = [['STT','Mã KH','Họ tên người vay','Tổ mới (1/2/3)','Tên vợ / chồng','Số điện thoại','Chương trình','Dư nợ','Nợ lãi','Số dư 105','Ghi chú']];
  tv.forEach(function(k, i){ T.dn += k.dn; T.lt += k.lt; T.t105 += k.t105;
    var no = (k.qh>0 ? ' (QH)' : '')+(k.kn>0 ? ' (Khoanh)' : ''), ct = String(k.ct||'').split(' · ').filter(Boolean).join(', '), v = vc(k.kh);
    aoa.push([i+1, k.kh, k.ten+no, '', v, k.sdt, ct, k.dn, k.lt||0, k.t105, '']);
    h += '<tr>'+toO(i+1,'c')+toO(k.kh)+toO(no ? '<b>'+coChuHTML(k.ten+no)+'</b>' : coChuHTML(k.ten))+toO('','tm')+toO(coChuHTML(v))+toO(coChuHTML(k.sdt))+toO(coChuHTML(ct))+toO(k.dn ? tdnTien(k.dn) : '','s')+toO(k.lt>0 ? tdnTien(k.lt) : '','s')+toO(tdnTien(k.t105),'s')+toO('')+'</tr>'; });
  h += '<tr class="tong">'+toO('')+toO('')+toO('<b>Cộng '+tv.length+' hộ</b>')+toO('')+toO('')+toO('')+toO('')+toO(tdnTien(T.dn),'s')+toO(tdnTien(T.lt),'s')+toO(tdnTien(T.t105),'s')+toO('')+'</tr>';
  aoa.push(['', '', 'Cộng '+tv.length+' hộ', '', '', '', '', T.dn, T.lt, T.t105, '']);
  var conNo = tv.filter(function(k){ return k.conNo; }).length;
  var tom = 'Tổ hiện có '+tv.length+' tổ viên, '+conNo+' hộ còn dư nợ. Dự kiến chia tách: (1) …… hộ sang tổ'+ch+'· (2) …… hộ sang tổ'+ch+'· (3) …… hộ sang tổ'+ch;
  aoa.splice(0, 0, [tom], []);
  var co = tv.length>56 ? 9 : tv.length>46 ? 10 : 11;   /* tối đa 2 trang A4 ngang (tổ thường ≤ 60 hộ) */
  return {ten:'Chia tach to', tieuDe:'DANH SÁCH HỘ VAY — DỰ KIẾN CHIA TÁCH TỔ', ngay:toNgayChu(), ngang:true, coChu:co, aoa:aoa.concat([[], ['', '', '', '', '', '', '', '', 'TỔ TRƯỞNG'], ['', '', '', '', '', '', '', '', '(Ký, ghi rõ họ tên)']]),
    ky:'<table class="ct-ky"><tr><td></td><td><i>Ngày …… tháng …… năm 20……</i><br><b>TỔ TRƯỞNG</b><br><i>(Ký, ghi rõ họ tên)</i><div style="height:46pt"></div>'+(t.ten ? '<b>'+coChuHTML(t.ten)+'</b>' : '')+'</td></tr></table>',
    html:'<div class="ct-tom">'+coChuHTML(tom)+'</div><table class="bc-bang ct"><thead><tr><th style="width:3%">STT</th><th style="width:8.5%">Mã KH</th><th style="width:17%">Họ tên người vay</th><th style="width:7%">Tổ mới<br>(1/2/3)</th><th style="width:14%">Tên vợ / chồng</th><th style="width:9%">Số điện thoại</th><th style="width:8%">Chương trình</th><th style="width:9%">Dư nợ</th><th style="width:7%">Nợ lãi</th><th style="width:7.5%">Số dư 105</th><th>Ghi chú</th></tr></thead><tbody>'+h+'</tbody></table>'};
}
/* 1. DANH SÁCH HỘ VAY — sắp theo mã KH; KH nhiều món: mỗi món 1 dòng + dòng cộng; 105 ghi 1 lần mỗi khách */
function toBCDanhSach(t){
  var ks = toKhach(t), stt = 0, h = '', aoa = [['STT','Mã KH','Họ tên','Số KU','Chương trình','Ngày vay','Dư nợ','Dư nợ QH','Số dư 105','Lãi tồn']], tong = {dn:0, qh:0, t105:0, lt:0, mon:0};
  ks.forEach(function(k){
    stt++; tong.t105 += k.t105; tong.lt += k.lt; tong.dn += k.dn; tong.qh += k.qh;
    /* 3.91.1 (anh Nhân): món đã tất toán bỏ khỏi danh sách món vay (KU không còn trong tổ); khách còn trong tổ vẫn hiện mã KH + TK 105 (kể cả 105 = 0) */
    var daTT = function(m){ return (m.ttMon==='CLOSE' || !(m.dn>0)) && !(m.qh>0) && !(laiTon(m)>0); };
    var mon = k.mon.filter(function(m){ return !daTT(m); }).sort(function(a, b){ return (a.ku<b.ku ? -1 : 1); });
    if(!mon.length){   /* khách trong tổ không còn món vay (chỉ gửi tiết kiệm / đã tất toán hết) */
      h += '<tr>'+toO(stt,'c')+toO(k.kh)+toO(coChuHTML(k.ten))+toO('<i>không còn món vay</i>')+toO('')+toO('')+toO('0','s')+toO('','s')+toO(toSo(k.t105),'s')+toO('','s')+'</tr>';
      aoa.push([stt, k.kh, k.ten, '', '', '', 0, 0, k.t105, 0]); return;
    }
    mon.forEach(function(m, i){
      tong.mon++;
      var tt = '';   /* 3.92 (anh chốt): món còn lãi tồn là món chưa tất toán — không ghi chú gì */
      h += '<tr>'+toO(i ? '' : stt,'c')+toO(i ? '' : k.kh)+toO(i ? '' : coChuHTML(k.ten))+toO(coChuHTML(m.ku)+tt)+toO(coChuHTML(ctNgan(m.ct, m)))+toO(ngayVNsl(m.nv||m.ngn))+
        toO(toSo(m.dn),'s')+toO(m.qh ? tdnTien(m.qh) : '','s')+toO(i ? '' : toSo(k.t105),'s')+toO(toSo(laiTon(m)),'s')+'</tr>';
      aoa.push([i ? '' : stt, i ? '' : k.kh, i ? '' : k.ten, m.ku, ctNgan(m.ct, m), ngayVNsl(m.nv||m.ngn), m.dn||0, m.qh||0, i ? '' : k.t105, laiTon(m)]);
    });
    if(mon.length>1){
      h += '<tr class="cong">'+toO('')+toO('')+toO('<i>Cộng '+mon.length+' món</i>')+toO('')+toO('')+toO('')+toO(tdnTien(k.dn),'s')+toO(k.qh ? tdnTien(k.qh) : '','s')+toO('','s')+toO(toSo(k.lt),'s')+'</tr>';
      aoa.push(['', '', 'Cộng '+mon.length+' món', '', '', '', k.dn, k.qh, '', k.lt]);
    }
  });
  var conNo = ks.filter(function(k){ return k.dn>0 || k.lt>0; }).length;   /* 3.137 */
  h += '<tr class="tong">'+toO('')+toO('<b>Tổng tổ</b>')+toO(ks.length+' KH ('+conNo+' còn dư nợ) · '+tong.mon+' món')+toO('')+toO('')+toO('')+toO(tdnTien(tong.dn),'s')+toO(tong.qh ? tdnTien(tong.qh) : '','s')+toO(tdnTien(tong.t105),'s')+toO(tdnTien(tong.lt),'s')+'</tr>';
  aoa.push(['', 'Tổng tổ', ks.length+' KH · '+tong.mon+' món', '', '', '', tong.dn, tong.qh, tong.t105, tong.lt]);
  return {ten:'Danh sach ho vay', tieuDe:'DANH SÁCH HỘ VAY', ngay:toNgayChu(),
    html:'<table class="bc-bang ds"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Số KU</th><th>Chương trình</th><th>Ngày vay</th><th>Dư nợ</th><th>Dư nợ QH</th><th>Số dư 105</th><th>Lãi tồn</th></tr></thead><tbody>'+h+'</tbody></table>', aoa:aoa};
}
/* 2. NỢ CẦN XỬ LÝ — 1 mặt A4: phần chung + 3 khung (quá hạn, khoanh, món 3 tháng KHĐ), mỗi khung cột riêng */
function toBCNo(t){
  var B = KHO.kyDung().B, th = KHO.kyDung().thang, ks = toKhach(t), dn = 0; ks.forEach(function(k){ dn += k.dn; });
  var cua = function(L){ return (kcBang(B, L)||[]).filter(function(o){ return o.to===t.ma; }); };
  var eNgay = function(L){ var e = B.nguon && B.nguon[L] && KHO.bang(L, B.nguon[L]); return e ? e.ngay : ''; };   /* 3.136: kỳ ngày lấy bảng đúng ngày / liền trước */
  var nqh = cua('nqh'), nk = cua('nk'), khd = cua('khd'), ngay = eNgay('nqh') || eNgay('nk') || eNgay('khd') || tdnCuoiKy(th);
  var cong = function(ds, f){ return ds.reduce(function(a, o){ return a+(o[f]||0); }, 0); };
  var aoa = [], h = '';
  var kpi = [['Tổ viên', ks.length], ['Dư nợ', tdnTien(dn)], ['Quá hạn', nqh.length+' món · '+tdnTien(cong(nqh,'qh'))+(dn ? ' · '+(cong(nqh,'qh')/dn*100).toFixed(2).replace('.', ',')+'%' : '')], ['Khoanh', nk.length+' món · '+tdnTien(cong(nk,'kn'))], ['KHĐ ≥ 3 tháng', khd.length+' món · '+tdnTien(cong(khd,'dn'))]];
  h += '<table class="bc-kpi"><tr>'+kpi.map(function(x){ return '<td><small>'+x[0]+'</small><br><b>'+x[1]+'</b></td>'; }).join('')+'</tr></table>';
  aoa.push(['Tổ viên', 'Dư nợ', 'Quá hạn (món)', 'Quá hạn (tiền)', 'Khoanh (món)', 'Khoanh (tiền)', 'KHĐ (món)', 'KHĐ (dư nợ)']);
  aoa.push([ks.length, dn, nqh.length, cong(nqh,'qh'), nk.length, cong(nk,'kn'), khd.length, cong(khd,'dn')]); aoa.push([]);
  var khung = function(so, ten, L, ds, cot, dong, tong){
    h += '<div class="bc-khung"><div class="bc-khung-ten">'+so+'. '+ten+' — '+ds.length+' món</div>';
    aoa.push([so+'. '+ten]); aoa.push(cot);
    if(!(B.nguon && B.nguon[L])){ h += '<div class="bc-rong">Chưa nạp file '+coChuHTML(slLoai(L).ten)+' '+slKyChu(KHO.kyDung().ky)+'.</div></div>'; aoa.push(['Chưa nạp file']); aoa.push([]); return; }
    if(!ds.length){ h += '<div class="bc-rong">Không có.</div></div>'; aoa.push(['Không có']); aoa.push([]); return; }
    h += '<table class="bc-bang"><thead><tr>'+cot.map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>';
    ds.forEach(function(o, i){ var r = dong(o, i+1); h += '<tr>'+r.map(function(v, j){ return toO(typeof v==='number' ? tdnTien(v) : coChuHTML(String(v==null ? '' : v)), typeof v==='number' ? 's' : (j===0 ? 'c' : '')); }).join('')+'</tr>'; aoa.push(r); });
    h += '<tr class="tong">'+tong.map(function(v){ return toO(typeof v==='number' ? tdnTien(v) : '<b>'+v+'</b>', typeof v==='number' ? 's' : ''); }).join('')+'</tr></tbody></table></div>'; aoa.push(tong); aoa.push([]);
  };
  var soNgay = function(a){ return a ? tdnSoNgay(a, ngay) : ''; };
  khung(1, 'NỢ QUÁ HẠN', 'nqh', nqh.slice().sort(function(a, b){ return (a.ncqh||'9')<(b.ncqh||'9') ? -1 : 1; }),
    ['STT','Mã KH','Họ tên','Số KU','Chương trình','Dư nợ QH','Ngày chuyển QH','Số ngày QH','Mới trong tháng','Số dư 105'],
    function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.qh||0, ngayVNsl(o.ncqh), soNgay(o.ncqh), o.cqh>0 ? 'Mới' : '', o.t105||0]; },
    ['', '', 'Cộng', '', '', cong(nqh,'qh'), '', '', '', cong(nqh,'t105')]);
  khung(2, 'NỢ KHOANH', 'nk', nk.slice().sort(function(a, b){ return (a.nhh||'9')<(b.nhh||'9') ? -1 : 1; }),
    ['STT','Mã KH','Họ tên','Số KU','Chương trình','Dư nợ khoanh','Ngày hiệu lực','Ngày hết hạn khoanh','Còn (ngày)','Nguyên nhân'],
    function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.kn||0, ngayVNsl(o.nhl), ngayVNsl(o.nhh), o.nhh ? tdnSoNgay(ngay, o.nhh) : '', o.nn||'']; },
    ['', '', 'Cộng', '', '', cong(nk,'kn'), '', '', '', '']);
  khung(3, 'MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG', 'khd', khd.slice().sort(function(a, b){ return (a.ngdg||'9')<(b.ngdg||'9') ? -1 : 1; }),
    ['STT','Mã KH','Họ tên','Số KU','Chương trình','Dư nợ','Ngày GD gần nhất','Số ngày không GD','Ngày đến hạn','Lãi tồn'],
    function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.dn||0, ngayVNsl(o.ngdg), soNgay(o.ngdg), ngayVNsl(o.dhgh||o.dhg||o.dhgd), laiTon(o)]; },
    ['', '', 'Cộng', '', '', cong(khd,'dn'), '', '', '', khd.reduce(function(a, o){ return a+laiTon(o); }, 0)]);
  var dong = nqh.length + nk.length + khd.length;
  return {ten:'No can xu ly', tieuDe:'NỢ CẦN XỬ LÝ', ngay:'Số liệu '+slKyChu(KHO.kyDung().ky)+(KHO.kyDung().ky.length>7 ? '' : ' (đến ngày '+ngayVNsl(ngay)+')'), html:h, aoa:aoa, motTrang:true, coChu:dong>34 ? 7 : dong>26 ? 8 : dong>18 ? 9 : 10, qua:dong>44};
}
/* 3. TK 105 CỦA TỔ — nguồn Mẫu 31 (có khách đã tất nợ, khách chỉ gửi TK); tất nợ = dư nợ 0 VÀ lãi tồn 0 */
function toBCTK105(t){
  var th = KHO.kyDung().ky, e31 = KHO.bang('hstd', (KHO.kyDung().B.nguon && KHO.kyDung().B.nguon.hstd) || th);   /* 3.136: kỳ ngày */
  if(!e31) return {ten:'TK 105', tieuDe:'TK 105 CỦA TỔ', ngay:slKyChu(th), aoa:[['Cần Mẫu 31 '+slKyChu(th)]],
    html:'<div class="bc-rong">Báo cáo này cần <b>Mẫu 31 '+slKyChu(th)+'</b> (Mẫu 10 không có khách đã tất nợ / chỉ gửi tiết kiệm). Nạp Mẫu 31 ở tab 📈 Số liệu, hoặc chọn kỳ số liệu Mẫu 31 ở trên.</div>'};
  return Promise.all([KHO.bo(th), KHO.bo(kyLui(slThang(th), -1))]).then(function(r){
    var B = r[0], Bt = r[1], lap = {}, kh = {};
    (kcLap(B)||[]).forEach(function(o){ if(o.to===t.ma) (lap[o.kh] = lap[o.kh]||[]).push(o); });
    (kcGoc(B)||[]).forEach(function(o){
      if(o.to!==t.ma || !o.kh || o.raTo) return;   /* 3.138.1 */
      var k = kh[o.kh] = kh[o.kh] || {kh:o.kh, ten:o.ten||'', vay:false, dn:0, lt:0, t105:0, stk:[], nv:'', coTK:false};
      if(o.ku){ if(slKUChuaGN(o)) k.chuaGN = true; k.vay = true; k.dn += o.dn||0; k.lt += laiTon(o); var n = o.nv||o.ngn; if(n && (!k.nv || n<k.nv)) k.nv = n; }
      [o].concat(lap[o.kh]||[]).forEach(function(x){ if((x.t105||0) > k.t105) k.t105 = x.t105; if(slCoTK(x.stk)) k.coTK = true; slStk(x.stk).forEach(function(z){ if(k.stk.indexOf(z)<0) k.stk.push(z); }); });
    });
    var ds = Object.keys(kh).sort().map(function(m){ var k = kh[m]; k.stk = slStkKH(m, k.stk); return k; });   /* 3.120 */
    var conNo = ds.filter(function(k){ return k.dn>0; }), conLai = ds.filter(function(k){ return !(k.dn>0) && k.lt>0; }), tatNo = ds.filter(function(k){ return !(k.dn>0) && !(k.lt>0) && !k.chuaGN; });   /* 3.138: KU đã nhập máy chưa giải ngân — không phải tất nợ */
    var tong105 = ds.reduce(function(a, k){ return a+k.t105; }, 0);
    var A = tatNo.filter(function(k){ return k.t105>0; });
    /* khách mới kết nạp: có dư nợ tháng này mà tháng trước không có trong tổ (anh Nhân chốt) */
    var coTruoc = Bt && kcGoc(Bt) && kcGoc(Bt).length, truoc = {};
    if(coTruoc) kcGoc(Bt).forEach(function(o){ if(o.to===t.ma && !o.raTo) truoc[o.kh] = 1; });
    var M = coTruoc ? conNo.filter(function(k){ return !truoc[k.kh]; }) : [];
    var kpi = [['Tổ viên (Mẫu 31)', ds.length], ['Còn dư nợ', conNo.length], ['Dư nợ 0, còn lãi tồn (chưa tất nợ)', conLai.length], ['Đã tất nợ (dư nợ 0, lãi tồn 0)', tatNo.length], ['Tổ viên có số dư 105', ds.filter(function(k){ return k.t105>0; }).length], ['Tổng số dư 105', tdnTien(tong105)]];
    var h = '<table class="bc-kpi"><tr>'+kpi.map(function(x){ return '<td><small>'+x[0]+'</small><br><b>'+x[1]+'</b></td>'; }).join('')+'</tr></table>';
    var aoa = [kpi.map(function(x){ return x[0]; }), kpi.map(function(x){ return x[1]; }), []];
    h += '<div class="bc-khung"><div class="bc-khung-ten">A. KHÁCH ĐÃ TẤT NỢ CÒN SỐ DƯ 105 — '+A.length+' khách (căn cứ xem xét cho ra khỏi tổ)</div>';
    aoa.push(['A. Khách đã tất nợ còn số dư 105']); aoa.push(['STT','Mã KH','Họ tên','Dư nợ','Nợ lãi','Số TK 105','Số dư 105','Ghi chú']);   /* 3.137 (anh chốt): cột Dư nợ + Nợ lãi cạnh nhau — dư nợ 0 còn lãi = chưa tất nợ */
    var bangA = function(ds, ghi){
      h += '<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Dư nợ</th><th>Nợ lãi</th><th>Số TK 105</th><th>Số dư 105</th><th>Ghi chú</th></tr></thead><tbody>'+ds.map(function(k, i){
        var g = ghi(k);
        aoa.push([i+1, k.kh, k.ten, k.dn||0, k.lt||0, toStkChu(k), k.t105, g]);
        return '<tr>'+toO(i+1,'c')+toO(k.kh)+toO(coChuHTML(k.ten))+toO(tdnTien(k.dn||0),'s')+toO(k.lt>0 ? tdnTien(k.lt) : '','s')+toO(coChuHTML(toStkChu(k)))+toO(tdnTien(k.t105),'s')+toO(g)+'</tr>'; }).join('')+
        '<tr class="tong">'+toO('')+toO('')+toO('<b>Cộng</b>')+toO('')+toO(tdnTien(ds.reduce(function(a, k){ return a+(k.lt||0); }, 0)),'s')+toO('')+toO(tdnTien(ds.reduce(function(a, k){ return a+k.t105; }, 0)),'s')+toO('')+'</tr></tbody></table>';
    };
    if(A.length) bangA(A, function(k){ return k.vay ? 'đã tất toán món vay' : 'không có món vay trong năm'; });
    else { h += '<div class="bc-rong">Không có.</div>'; aoa.push(['Không có']); }
    h += '</div>'; aoa.push([]);
    var A2 = conLai.filter(function(k){ return k.t105>0; });   /* 3.137: dư nợ 0 nhưng còn nợ lãi → chưa tất nợ, chưa cho ra */
    if(A2.length){ h += '<div class="bc-khung"><div class="bc-khung-ten">A2. DƯ NỢ 0 NHƯNG CÒN NỢ LÃI — '+A2.length+' khách (chưa tất nợ, chưa xem xét cho ra)</div>';
      aoa.push(['A2. Dư nợ 0 nhưng còn nợ lãi (chưa tất nợ)']); aoa.push(['STT','Mã KH','Họ tên','Dư nợ','Nợ lãi','Số TK 105','Số dư 105','Ghi chú']);
      bangA(A2, function(){ return 'thu hết lãi mới tất nợ'; }); h += '</div>'; aoa.push([]); }
    h += '<div class="bc-khung"><div class="bc-khung-ten">B. KHÁCH MỚI KẾT NẠP TRONG THÁNG — kiểm tra đã mở TK 105</div>';
    aoa.push(['B. Khách mới kết nạp trong tháng']); aoa.push(['STT','Mã KH','Họ tên','Ngày vay đầu tiên','Dư nợ','Số TK 105']);
    if(!coTruoc){ h += '<div class="bc-rong">Chưa có số liệu tháng '+kyVN(kyLui(slThang(th), -1))+' (Mẫu 31 hoặc Mẫu 10 cuối tháng) để so — chưa xác định được khách mới.</div>'; aoa.push(['Chưa có số liệu tháng trước']); }
    else if(!M.length){ h += '<div class="bc-rong">Không có.</div>'; aoa.push(['Không có']); }
    else {
      h += '<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Ngày vay đầu tiên</th><th>Dư nợ</th><th>Số TK 105</th></tr></thead><tbody>'+M.map(function(k, i){
        var so = toStkChu(k);
        aoa.push([i+1, k.kh, k.ten, ngayVNsl(k.nv), k.dn, so || 'CHƯA MỞ — cần mở']);
        return '<tr>'+toO(i+1,'c')+toO(k.kh)+toO(coChuHTML(k.ten))+toO(ngayVNsl(k.nv))+toO(tdnTien(k.dn),'s')+toO(so ? coChuHTML(so) : '<b>CHƯA MỞ — cần mở</b>')+'</tr>'; }).join('')+'</tbody></table>';
    }
    h += '</div>';
    return {ten:'TK 105', tieuDe:'TK 105 CỦA TỔ', ngay:'Số liệu đến ngày '+ngayVNsl(e31.ngay)+' (Mẫu 31 '+slKyChu(e31.ky)+')', html:h, aoa:aoa};
  });
}
/* ---------- xem → in / Excel ---------- */
var TO_IN_CSS = '.bc-bang tr.canh td{font-weight:700}.bc-canh-tong{margin:4px 0;font-size:.95em}.bc-bang.luoi td.s,.bc-bang td.s{text-align:right;white-space:nowrap}'+   /* 3.161: dòng cảnh báo in đậm */
  '.ct-tom{margin:2px 0 4px;font-size:.95em;white-space:nowrap;overflow:hidden}.bc-bang.ct td{padding:1px 3px;line-height:1.15}.bc-bang.ct th{line-height:1.1;padding:2px 2px}.bc-bang.ct td.tm{border-left:.9px solid #000;border-right:.9px solid #000}.ct-ky{width:100%;margin-top:6px;border:0}.ct-ky td{border:0;width:50%;text-align:center;vertical-align:top}'+'@page{size:A4 portrait;margin:20mm 20mm 20mm 30mm;@bottom-right{content:"Trang " counter(page) "/" counter(pages);font-family:"Times New Roman",serif;font-size:8.5pt}}'+   /* 3.90: lề chuẩn anh chốt — trên 2, dưới 2, trái 3, phải 2 cm; số trang */
  'body{font-family:"Times New Roman",serif;font-size:10pt;color:#000;margin:0;background:#fff}'+
  'td.nb{background:#fff1c7}.sk-tom{margin:3px 0 6px}.sk-tom td,.sk-tom th{padding:1px 4px}td small{font-size:.85em;color:#333}'+   /* 3.91 */
  '.bc-ky{text-align:right;font-weight:bold;margin-top:12px}.bc-canh{border:1px solid #b00;padding:2px 5px;margin:4px 0}.bc-dat{padding:2px 5px;margin:4px 0;font-style:italic}'+
  '.trang{page-break-after:always}.trang:last-child{page-break-after:auto}'+
  '.bc-dau{display:flex;justify-content:space-between;font-size:9.5pt}.bc-ngay{text-align:right;font-style:italic}'+
  'h1{font-size:13.5pt;text-align:center;margin:6px 0 2px}.bc-to{text-align:center;font-size:9.5pt;margin-bottom:6px}'+
  'table{width:100%;border-collapse:collapse}th,td{border:1px solid #555;padding:1.5px 3px;vertical-align:top}th{background:#e9eef4;font-size:.92em}thead{display:table-header-group}tr{page-break-inside:avoid}'+
  'td.s{text-align:right;white-space:nowrap}td.c{text-align:center}tr.cong td{background:#f4f6f9;font-style:italic}tr.tong td{background:#e9eef4;font-weight:bold}'+
  '.bc-kpi td{text-align:center;border:1px solid #555;background:#f7f9fb}.bc-kpi small{font-size:.85em}'+
  '.bc-khung{margin-top:7px}.bc-khung-ten{font-weight:bold;margin:2px 0;border-bottom:.9px solid #000}.bc-rong{font-style:italic;padding:2px 4px}'+
  '.ds td:nth-child(3){min-width:110px}'+
  'tr.nhom td{background:#dfe8f3;font-weight:bold}tr.nb td{background:#fff1c7}tr.xen td{background:#f2f2f2}.bc-tom{margin:2px 0 5px;font-size:.95em}.bc-ghi{font-size:.85em;font-style:italic;margin-top:4px}';   /* 3.89: nhóm theo tổ, dòng cần bổ sung */
var TO_XEM = [];
function toXem(){
  var C = toCH(), t = KHO.kyDung() && KHO.kyDung().to[C.to]; if(!t) return bao('Chọn tổ trước.', 3);
  if(KHO.kyDung().thieuBang) return bao('Bảng số liệu chưa có trên máy này — bấm ☁ Nối Drive và tải (hoặc nạp lại file) rồi xem báo cáo.', 6);
  var ds = TO_BC.filter(function(b){ return C.bc && C.bc[b.k]; }); if(!ds.length) return bao('Tích ít nhất 1 báo cáo.', 3);
  batChay(true, 'Đang lập báo cáo…');
  ds.reduce(function(p, b){ return p.then(function(ra){ CT_DUNG = {}; return Promise.resolve(toBaoCao(b.k, t)).then(function(x){ x.ctChu = ctChuThich(); CT_DUNG = null; ra.push(x); return ra; }); }); }, Promise.resolve([])).then(function(R){
    tatChay(); TO_XEM = R;
    var html = toHTMLIn(R, t), qua = R.filter(function(x){ return x.qua; });
    moHop('<div class="hop-tit">👁 Xem báo cáo — tổ '+coChuHTML(t.ten||t.ma)+'</div>'+
      (qua.length ? '<div class="sl-bao vang">“'+qua.map(function(x){ return x.tieuDe; }).join(', ')+'” nhiều món, chữ đã thu nhỏ nhưng có thể sang trang 2.</div>' : '')+
      '<iframe id="to-khung" class="to-khung" title="Xem trước"></iframe>'+
      xuatHang({ten:xuatTen(R.length>1 ? 'Bao cao to' : R[0].ten, t.ten||t.ma, KHO.kyDung().ky), html:function(){ return toHTMLIn(TO_XEM, t); }, excel:'toExcel()'}), true);   /* 3.152: hàng nút xuất chung */
    var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
    var f = document.getElementById('to-khung'); xemChuan(f, html);
  }).catch(function(er){ tatChay(); baoLoi('Lập báo cáo lỗi: '+(er && er.message || er)); });
}
function toHTMLIn(R, t){
  return '<!doctype html><html><head><meta charset="utf-8"><title>Bao cao to '+t.ma+'</title><style>'+TO_IN_CSS+'</style></head><body>'+R.map(function(x){
    return '<div class="trang'+(x.ngang ? ' ngang' : '')+'"'+(x.motTrang ? ' data-tr-1trang="1"' : '')+(x.coChu ? ' style="font-size:'+x.coChu+'pt"' : '')+'>'+toDauBC(t, x.tieuDe, x.ngay)+x.html+bcCT(x)+(x.ky || bcKy())+'</div>'; }).join('')+SK_IN_NGANG+SK_IN_TU+'</body></html>';   /* 3.139: báo cáo có khối ký riêng (Tổ trưởng) */   /* 3.92: 1 dòng mỗi món, tự co */
}
function toExcel(tp){
  var C = toCH(), t = tp || (KHO.kyDung() && KHO.kyDung().to[C.to]); if(!t || !TO_XEM.length) return;   /* 3.132: tp = phạm vi (chưa chọn tổ) */
  xongTV.then(function(){
    if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new();
    TO_XEM.forEach(function(x){
      var dau = [[x.tieuDe], [t.pv ? 'Phạm vi: '+t.ten : 'Tổ TK&VV: '+(t.ten||'')+' (mã '+t.ma+') · '+toDiaChi(t)], [x.ngay], []];
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dau.concat(x.aoa).concat([[], x.ctChu ? [x.ctChu] : [], [BC_KY]])), x.ten.slice(0, 31));
    });
    var u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    taiXuongBlob(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), (t.pv ? boDauTen(TO_XEM[0].ten+' '+t.ten) : 'Bao cao to '+t.ma)+' '+KHO.kyDung().ngay+'.xlsx');
  });
}

/* ==========================================================
   3.89 — 👤 TRA CỨU KH: phạm vi (bộ chọn chung) + KIỂM TRÙNG trước khi nhập máy
   - gõ số CCCD / CMND (≥ 9 số) → rà CCCD khách + CMND HSSV trong số liệu mới nhất: không trùng = chưa vay vốn, có thể nhập máy
   - gõ tên → tìm cả tên khách, tên vợ/chồng (người thừa kế), tên HSSV — hiện hết, có xã · ấp · tổ · tình trạng để anh tự chọn
   - kiểm trùng luôn trên TOÀN PGD (không theo phạm vi); phạm vi chỉ lọc danh sách kết quả
   ========================================================== */
var TC_K = null;   /* 3.346: chỉ mục vợ/chồng + HSSV khai báo ở 22-so-lieu */
function tcCH(){ return pvGan(D.cauHinh.tcPV = D.cauHinh.tcPV || {xa:'', diem:'', hoi:'', to:''}); }
PV_DUNG.tc = {S:function(){ return tcCH(); }, K:function(){ return TC_K; }, sau:function(){ slTraTim(); }, ghi:function(){ var n = KHO.chiMuc().length, ky = slHSMoi(); return n ? n.toLocaleString('vi-VN')+' khách'+(ky ? ' · số liệu '+slKyChu(ky) : '') : ''; }};
/* Mẫu 31 mới nhất: chỉ mục phụ vợ/chồng + HSSV (Mẫu 10 không có các cột này) */
function tcNap(){
  var ds = toDsKy(); if(!ds.length) return Promise.resolve();
  var moi = ds.reduce(function(a, x){ return slThuTu(x.ky)>slThuTu(a.ky) ? x : a; }, ds[0]);   /* 3.347 (anh 24/10): Tra cứu dùng số liệu MỚI NHẤT — có Mẫu 31 theo ngày thì lấy ngày */
  return KHO.nap(moi.ky).then(function(K){ TC_K = K; pvVeCay('tc'); })
    .then(slKhMonNap).then(function(){ if(nganHienTai===7 && D.cauHinh.slTab==='tra'){ slTraTim(); tcKTVe(); } })
    .catch(function(er){ console.warn('Tra cứu: chưa mở được số liệu', er); });
}
function tcTinhTrang(c){ return c.mon ? 'đang vay '+c.mon+' món' : ((c.ku||[]).length ? 'đã tất nợ' : 'chỉ gửi tiết kiệm'); }
function tcTrongPV(ma){ var S = tcCH(); if(!S.xa) return true; var c = KHO.danhBa(ma); return !!c && pvLoc(S, KHO.toKy(TC_K, c.to)); }
/* kiểm trùng 1 số CCCD / CMND trên toàn PGD */

/* ==========================================================
   3.89 — 📑 TAB CON SAO KÊ (trong Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi (bộ chọn chung) → tích → Xem → In / Excel
   phạm vi từ xã trở lên: bảng chia theo tổ, có dòng cộng từng tổ
   ========================================================== */
/* 3.92 (anh chốt): chọn 1 báo cáo mỗi lần, xếp theo nhóm 2 cột (chừa chỗ mẫu mới); kho = khổ in mặc định; ngay = cần khoảng ngày */
var SK_NHOM = [{k:'xl', ten:'Nợ cần xử lý'}, {k:'dh', ten:'Nợ đến hạn'}, {k:'ps', ten:'Phát sinh tháng'}, {k:'kh', ten:'Khách hàng'}, {k:'tt', ten:'Thông tin tổ'}];   /* 3.259: + Thông tin tổ (js/22j) */
var SK_BC = [   /* 3.392: báo cáo nhóm Nợ cần xử lý · Nợ đến hạn · Phát sinh · Khách hàng ở js/76 (cắm rút) */
  {k:'kqgd', ten:'Kết quả giao dịch tại điểm GD — chốt cuối tháng, mỗi điểm 1 trang', nhom:'tt', kho:'ngang', motTrang:1},
  {k:'thhd', ten:'Tình hình hoạt động (THHD) — tín dụng theo cấp chọn (PGD › xã › điểm › hội › tổ), 1 trang A4 dọc', nhom:'tt', kho:'doc', motTrang:1},
  {k:'tqh', ten:'Sao kê nợ quá hạn — chia Điểm GD › Hội › Tổ (như file tổng hợp)', nhom:'tt', kho:'doc'}, {k:'tkn', ten:'Sao kê nợ khoanh — chia Điểm GD › Hội › Tổ', nhom:'tt', kho:'doc'},
  {k:'tkhd', ten:'Sao kê 3 tháng không hoạt động — chia Điểm GD › Hội › Tổ', nhom:'tt', kho:'doc'}];   /* 3.387 cắm rút: báo cáo mới tự SK_BC.push({k, ten, nhom, kho, lap, tuyChon}) trong file riêng — b105 (js/72), ndt (js/74) */   /* 3.385 (js/74) · 3.385.1 (anh 27/10 "nếu dạng DS thì nên in dọc cho tối ưu"): danh sách mặc định khổ dọc — cgn, dh, noxh, ddn, tkhd, ndt (giữ ngang: kqgd biểu mỗi điểm, b105 13 cột) */   /* 3.380 (js/72) */
function skChon(){ var C = skCH(); if(!C.chon || !SK_BC.some(function(b){ return b.k===C.chon; })){ var c = SK_BC.find(function(b){ return C.bc[b.k]; }) || SK_BC.find(function(b){ return b.k==='qh'; }) || SK_BC[0]; C.chon = c ? c.k : ''; }   /* 3.392: rút js/76 (không còn qh) → báo cáo đầu danh mục */ return C.chon; }
function skKhoCua(k){ var C = skCH(), b = SK_BC.find(function(x){ return x.k===k; }) || {}; return (C.kho && C.kho[k]) || b.kho || 'doc'; }
function skChonBC(k){ var C = skCH(); C.chon = k; C.bc = {}; C.bc[k] = true; C.man = 'xem'; luu(); veSaoKe(); }   /* 3.386: chọn báo cáo = mở màn xem */
function skVeDS(){ var C = skCH(); C.man = 'ds'; luu(); veSaoKe(); }
function skPhongTo(){ skXem.hop = true; try{ skXem(); } finally { skXem.hop = false; } }
var SK_XEM_HEN = null;
function skXemHen(){ clearTimeout(SK_XEM_HEN); SK_XEM_HEN = setTimeout(function(){ if(document.getElementById('sk-xem-khung')) skXem(); }, 120); }
function skDoiKho(v){ var C = skCH(), k = skChon(); C.kho = C.kho || {}; C.kho[k] = v; luu();
  ['ngang','doc'].forEach(function(x){ var b = document.getElementById('sk-kho-'+x); if(b) b.classList.toggle('bat', x===v); }); skXemHen(); }
var SK_K = null, SK_XEM = [];
function skCH(){ var C = D.cauHinh.skTK = D.cauHinh.skTK || {ky:'', xa:'', diem:'', hoi:'', to:'', bc:{qh:true}, tu:'', den:''}; C.bc = C.bc || {}; return pvGan(C); }
PV_DUNG.sk = {S:function(){ return skCH(); }, K:function(){ return SK_K; }, sau:function(){ if(skCH().man==='xem') skXemHen(); }};   /* 3.386: đổi lọc → vẽ lại khung xem */
function veSaoKe(){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = skCH(), dsKy = toDsKy();
  if(!dsKy.length){ e.innerHTML = slTabConHTML()+'<div class="rong">Chưa có số liệu món vay. Nạp Mẫu 31 / Mẫu 10 ở tab con 📥 Nạp số liệu.</div>'; return; }
  toKyMacDinh(C, dsKy, 'sk');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'…</div>';
  KHO.nap(C.ky).then(function(K){
    SK_K = K; if(!(nganHienTai===7 && D.cauHinh.slTab==='sk')) return;
    var th = K.thang, sau = kyLui(th, 1);
    if(!C.tu || !C.den){ C.tu = sau+'-01'; C.den = tdnCuoiKy(sau); }
    var k = skChon(), bc = SK_BC.find(function(b){ return b.k===k; }), kho = skKhoCua(k);
    var man = C.man==='xem' ? 'xem' : 'ds';   /* 3.386 (anh 27/10 "demo 2 là phần xem của chọn báo cáo"): màn 1 chọn báo cáo · màn 2 xem (khung trải ngang, đổi lọc tự vẽ lại) */
    var ngan = function(b){ return b.ten.split(' — ')[0].split(' (')[0]; }, khoChu = function(b){ return skKhoCua(b.k)==='ngang' ? 'ngang' : 'dọc'; };
    var dau = slTabConHTML()+kyGhiHTML(K)+
      (K.thieuBang ? '<div class="sl-bao vang">⚠ Bảng số liệu chưa có trên máy này (lưu trên Drive, chưa tải về).<div class="hang-nut"><button class="nho chinh" onclick="toNoiDrive()">☁ Nối Drive và tải</button><button class="nho" onclick="toThuLai()">⟳ Thử lại</button></div></div>' : '')+
      slNguonHTML(K.B)+'<div id="sk-cay" class="to-cay pv-cay"></div>';
    if(man==='ds') e.innerHTML = dau+'<div class="sk-luoi sk-luoi2">'+SK_NHOM.map(function(n){ return '<div class="sk-nhom"><div class="sk-nhom-ten">'+n.ten+'</div>'+SK_BC.filter(function(b){ return b.nhom===n.k; }).map(function(b){
        return '<button class="sk-bc2'+(b.k===k ? ' chon' : '')+'" onclick="skChonBC(\''+b.k+'\')" title="'+coChuHTML(b.ten)+'"><span>'+coChuHTML(ngan(b))+'</span><small>'+khoChu(b)+'</small></button>'; }).join('')+'</div>'; }).join('')+(typeof dkNutHTML==='function' ? dkNutHTML('sk') : '')+'</div>'+
      '<p class="ghi">Nợ quá hạn, khoanh, KHĐ lấy từ 3 file tháng '+kyVN(th)+'; các sao kê còn lại cần <b>Mẫu 31 tháng '+kyVN(th)+'</b>. In: mỗi món 1 dòng; khổ dọc bỏ Số KU (đã có cột CT), tràn thì bỏ SĐT rồi co chữ; Excel luôn đủ cột.</p>';
    else e.innerHTML = dau+'<div class="sk-thao"><button class="nho" onclick="skVeDS()" title="Về danh sách báo cáo">← Danh sách</button>'+
      '<select class="sk-chon" title="Đổi báo cáo" onchange="skChonBC(this.value)">'+SK_NHOM.map(function(n){ return '<optgroup label="'+coChuHTML(n.ten)+'">'+SK_BC.filter(function(b){ return b.nhom===n.k; }).map(function(b){
        return '<option value="'+b.k+'"'+(b.k===k ? ' selected' : '')+'>'+coChuHTML(ngan(b))+' · '+khoChu(b)+'</option>'; }).join('')+'</optgroup>'; }).join('')+'</select>'+
      '<span class="sk-kho" role="group" aria-label="Khổ in">Khổ <button id="sk-kho-ngang" class="nho'+(kho==='ngang' ? ' bat' : '')+'" onclick="skDoiKho(\'ngang\')" title="A4 ngang — đủ cột">Ngang</button><button id="sk-kho-doc" class="nho'+(kho==='doc' ? ' bat' : '')+'" onclick="skDoiKho(\'doc\')" title="A4 dọc — gọn cột (bỏ Số KU khi có cột CT; tràn thì bỏ SĐT, co chữ)">Dọc</button></span>'+
      (bc && bc.tuyChon ? bc.tuyChon() : '')+'<span class="sk-gian"></span>'+
      '<button class="nho" onclick="if(SK_XEM.length) skExcel()" title="Xuất Excel báo cáo đang xem">📊 Excel</button><button class="nho" onclick="skPhongTo()" title="Mở hộp xem lớn">⤢ Phóng to</button></div>'+
      (bc && bc.ngay ? '<div class="sk-ngay sk-ngay1">Khoảng ngày: từ <input type="date" value="'+C.tu+'" onchange="skCH().tu=this.value;luu();skXemHen()"> đến <input type="date" value="'+C.den+'" onchange="skCH().den=this.value;luu();skXemHen()">'+
        ' <button class="nho" onclick="skDatNgay(\'thang\')">Tháng sau</button><button class="nho" onclick="skDatNgay(\'quy\')">Đến cuối quý</button><button class="nho" onclick="skDatNgay(\'nam\')">Đến hết năm</button></div>' : '')+
      '<iframe id="sk-xem-khung" class="sk-xem-khung" title="Xem báo cáo"></iframe>';
    pvVeCay('sk'); if(man==='xem') skXemHen();
  }).catch(function(er){ e.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+'</div><div class="hang-nut"><button class="nho chinh" onclick="toThuLai()">⟳ Thử lại</button></div>'; });
}
/* bảng có chia theo tổ: cot = tên cột, ds = dòng (có .to), dong(x, stt) → mảng ô, so = chỉ số cột cộng tiền, lop(x) = lớp dòng (vd nổi bật) */
/* 3.92: in 2 khổ (anh chốt) — SK_KHO 'ngang' đủ cột · 'doc' gọn: bảng có cột CT thì bỏ cột Số KU (khách 2 món cùng CT ghi thêm 6 số cuối KU);
   cột SĐT gắn lớp c-sdt để khi in dọc tràn thì app bỏ cột này trước rồi mới co chữ. Excel (aoa) luôn đủ cột. */
var SK_KHO = 'ngang';
function skNg(d){ var v = ngayVNsl(d); return SK_KHO==='doc' && /^\d{2}\/\d{2}\/\d{4}$/.test(v) ? v.slice(0,6)+v.slice(8) : v; }
function skBang(cot, ds, dong, so, lop, phang){   /* phang (3.138): 1 bảng liền, giữ thứ tự ds (không chia nhóm theo tổ) */
  var K = SK_K, theoTo = !skCH().to && !phang, nhom = {}, thu = [];
  ds.forEach(function(x){ var k = phang ? '' : toMaCua(x); if(!nhom[k]){ nhom[k] = []; thu.push(k); } nhom[k].push(x); });
  var tTo = function(k){ return (K.to||{})[k] || {}; }, khoa = function(k){ var t = tTo(k); return [t.tenXa||'', t.tenDiemDu||'', t.ten||'', k].join('|'); };
  thu.sort(function(a, b){ return khoa(a).localeCompare(khoa(b), 'vi'); });
  var doc = SK_KHO==='doc', iKU = cot.indexOf('Số KU'), iCT = cot.indexOf('Chương trình'); if(iCT<0) iCT = cot.indexOf('CT');
  var iSDT = cot.indexOf('SĐT'); if(iSDT<0) iSDT = cot.indexOf('Số điện thoại');
  var an = {}; if(doc && iKU>=0 && iCT>=0) an[iKU] = 1;
  var hien = cot.map(function(c, j){ return !an[j]; }), soCot = hien.filter(Boolean).length;
  var stt = 0, ds2 = [];
  thu.forEach(function(k){ nhom[k].forEach(function(x){ ds2.push({k:k, x:x, r:dong(x, ++stt)}); }); });   /* gọi dong đúng 1 lần mỗi dòng */
  var trung = {};
  if(an[iKU]){ var dem = {}; ds2.forEach(function(d){ var q = d.r[1]+'|'+String(d.r[iCT]); dem[q] = (dem[q]||0)+1; }); ds2.forEach(function(d){ if(dem[d.r[1]+'|'+String(d.r[iCT])]>1) trung[d.r[iKU]] = 1; }); }
  var h = '', aoa = [cot], tong = cot.map(function(){ return 0; });
  var lopO = function(j, co){ var l = []; if(co) l.push(co); if(j===iSDT && doc) l.push('c-sdt'); return l.length ? ' class="'+l.join(' ')+'"' : ''; };
  var o = function(v, j, r){ if(an[j]) return '';
    if(v && typeof v==='object' && v.h!==undefined) return '<td'+lopO(j, v.lop)+'>'+v.h+'</td>';   /* 3.91: ô tự dựng HTML */
    var chu = typeof v==='number' ? tdnTien(v) : coChuHTML(String(v==null ? '' : v));
    if(j===iCT && an[iKU] && trung[r[iKU]]) chu += ' <small>·'+coChuHTML(String(r[iKU]).slice(-6))+'</small>';
    return '<td'+lopO(j, typeof v==='number' ? 's' : (j===0 ? 'c' : ''))+'>'+chu+'</td>'; };
  var cong = function(nhan, t){ return '<tr class="tong">'+cot.map(function(c, j){ if(an[j]) return ''; return j===2 ? '<td><b>'+nhan+'</b></td>' : (so.indexOf(j)>=0 ? '<td class="s">'+tdnTien(t[j])+'</td>' : '<td'+lopO(j)+'></td>'); }).join('')+'</tr>'; };
  thu.forEach(function(k){
    var t = tTo(k), tn = cot.map(function(){ return 0; });
    if(theoTo){ var chu = t.trucTiep ? 'Vay trực tiếp (không qua tổ)'+[t.tenXa ? ' · '+t.tenXa : '', t.tenDiem ? ' · điểm '+String(t.tenDiem).trim() : ''].join('') : k ? 'Tổ '+(t.ten||k)+' ('+k+')'+[t.tenThon ? ' · ấp '+t.tenThon : '', t.tenXa ? ' · '+t.tenXa : '', t.tenDiem ? ' · điểm '+String(t.tenDiem).trim() : ''].join('') : 'Chưa gắn tổ';
      h += '<tr class="nhom"><td colspan="'+soCot+'">'+coChuHTML(chu)+' — '+nhom[k].length+' dòng</td></tr>'; aoa.push([chu]); }
    ds2.forEach(function(d){ if(d.k!==k) return; var r = d.r, x = d.x; so.forEach(function(j){ tn[j] += r[j]||0; tong[j] += r[j]||0; });
      h += '<tr'+(lop && lop(x) ? ' class="'+lop(x)+'"' : '')+'>'+r.map(function(v, j){ return o(v, j, r); }).join('')+'</tr>'; aoa.push(r.map(function(v){ return v && typeof v==='object' && v.h!==undefined ? String(v.h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : v; })); });
    if(theoTo && so.length && thu.length>1){ h += cong('Cộng tổ', tn); aoa.push(cot.map(function(c, j){ return j===2 ? 'Cộng tổ' : (so.indexOf(j)>=0 ? tn[j] : ''); })); }
  });
  if(so.length){ h += cong('TỔNG CỘNG ('+stt+')', tong); aoa.push(cot.map(function(c, j){ return j===2 ? 'TỔNG CỘNG' : (so.indexOf(j)>=0 ? tong[j] : ''); })); }
  if(!stt) return {html:'<div class="bc-rong">Không có.</div>', aoa:[['Không có']], n:0};
  return {html:'<table class="bc-bang"><thead><tr>'+cot.map(function(c, j){ return an[j] ? '' : '<th'+(j===iSDT && doc ? ' class="c-sdt"' : '')+'>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>', aoa:aoa, n:stt};
}
function skTrongPV(o){ return pvLoc(skCH(), SK_K.to[toMaCua(o)]); }   /* 3.92: món trực tiếp theo mục TT của xã / điểm */
function skMau31(){ return SK_K.B && SK_K.B.hsTen==='Mẫu 31' ? SK_K.B : null; }
function skCan31(ten){ return {ten:ten.slice(0, 31), tieuDe:ten.toUpperCase(), ngay:'Tháng '+kyVN(SK_K.thang), aoa:[['Cần Mẫu 31 tháng '+kyVN(SK_K.thang)]],
  html:'<div class="bc-rong">Báo cáo này cần <b>Mẫu 31 tháng '+kyVN(SK_K.thang)+'</b> (Mẫu 10 không có cột này). Nạp Mẫu 31 ở tab con 📥 Nạp số liệu.</div>'}; }
function skNgayThang(L){ var e = KHO.bang(L, SK_K.thang); return e ? e.ngay : tdnCuoiKy(SK_K.thang); }
function skBaoCao(k){
  if(k==='kqgd' || k==='thhd' || k==='tqh' || k==='tkn' || k==='tkhd') return ttBaoCao(k);   /* 3.259: trả nhiều trang (mảng) */
  var dk = SK_BC.find(function(b){ return b.k===k; }); if(dk && dk.lap) return dk.lap();   /* 3.387 cắm rút: báo cáo tự lập (file riêng) — 3.392: báo cáo danh sách ở js/76 */
}
/* 3.392: nền chung báo cáo tính từ Mẫu 31 (js/76): {M, e31, ngay, rows = món trong phạm vi, lapKH} — chưa có Mẫu 31 → {can: trang báo cần Mẫu 31} */
function skNen31(k){
  var th = SK_K.thang;
  var M = skMau31(); if(!M) return {can:skCan31(SK_BC.find(function(b){ return b.k===k; }).ten)};
  var e31 = KHO.bang('hstd', th), ngay = 'Số liệu đến ngày '+ngayVNsl(e31.ngay)+' (Mẫu 31 '+kyVN(th)+')';
  var rows = (kcGoc(M)||[]).filter(skTrongPV), lapKH = {};
  (kcLap(M)||[]).forEach(function(o){ (lapKH[o.kh] = lapKH[o.kh]||[]).push(o); });
  return {M:M, e31:e31, ngay:ngay, rows:rows, lapKH:lapKH};
}
/* 3.138 (anh chốt): KU đã nhập máy chưa giải ngân (OPEN, Tổng giải ngân = 0, dư nợ = 0) — quá 1 tháng (theo tháng lịch, từ Ngày vay đến ngày số liệu) → "Cần đóng KU", xếp đầu, tô nền */
function ngayThem1Thang(d){ var p = String(d||'').slice(0, 10).split('-'); if(p.length<3) return ''; var y = +p[0], m = +p[1]+1; if(m>12){ m = 1; y++; } var c = new Date(y, m, 0).getDate(); return y+'-'+hai(m)+'-'+hai(Math.min(+p[2], c)); }
function skQua1Thang(nv, ns){ var moc = ngayThem1Thang(nv); return !!moc && !!ns && ns>moc; }
/* ---------- 3.91: NỢ ĐẾN HẠN — theo ngày đến hạn hợp đồng (gia hạn nếu có) + kỳ GDXA chuyển quá hạn (anh chốt) ----------
   ví dụ: hạn HĐ 22/10, GDXA định kỳ ngày 07 → chuyển QH 07/11. Chỉ món trong hạn (không QH, không khoanh). 3 khung:
   ① đã quá hạn HĐ (đến ngày số liệu) mà chưa chuyển QH — tra soát · ② đến hạn, chuyển QH trong kỳ · ③ đến hạn, chuyển QH kỳ sau */
function skHL(o){ return o.dhgh || o.dhg || ''; }
/* 3.404 (anh chốt 28/10 — Tèo QT-C-12, docs/TEO_QUY_TAC_CHUNG.md): NGÀY CHUYỂN QUÁ HẠN theo phiên của điểm GD.
   Ưu tiên cột hệ thống "Ngày ĐH theo GDXA" (như script giao ban 1.3). Cột trống → app tính: món qua tổ = phiên đầu tiên của điểm KỂ TỪ ngày đến hạn
   (gia hạn rồi thì ngày đến hạn sau gia hạn; trùng ngày phiên → chính ngày đó); món vay trực tiếp = ngay sau ngày đến hạn.
   Ngày hệ thống khác lịch điểm hiện tại của tổ (vd gộp điểm 11/2026) → chỉ BÁO (lech), không sửa. o._ngGD = ngày GD của điểm (gắn ở toNap). */
function skPhienTu(hl, n){ var y = +hl.slice(0, 4), m = +hl.slice(5, 7), d = +hl.slice(8, 10), cuoi = function(y, m){ return new Date(y, m, 0).getDate(); };
  if(Math.min(n, cuoi(y, m)) < d){ m++; if(m>12){ m = 1; y++; } } return y+'-'+hai(m)+'-'+hai(Math.min(n, cuoi(y, m))); }
function skSauNgay(hl){ var x = new Date(+hl.slice(0, 4), +hl.slice(5, 7)-1, +hl.slice(8, 10)+1); return x.getFullYear()+'-'+hai(x.getMonth()+1)+'-'+hai(x.getDate()); }
function skCQH(o){
  var hl = skHL(o), n = +(o && o._ngGD || 0), tt = !o.to || (typeof TO_GIA!=='undefined' && o.to===TO_GIA);
  if(o.dhgd){ var lech = !tt && n>0 && hl && o.dhgd>=hl && +o.dhgd.slice(8, 10)!==Math.min(n, new Date(+o.dhgd.slice(0, 4), +o.dhgd.slice(5, 7), 0).getDate());
    return {d:o.dhgd, cach:'ht', lech:lech, tinh:lech ? skPhienTu(hl, n) : ''}; }
  if(!hl) return {d:'', cach:''};
  if(tt) return {d:skSauNgay(hl), cach:'tt'};
  return n>0 ? {d:skPhienTu(hl, n), cach:'tinh'} : {d:'', cach:''};
}
function skCQHChu(o){ var c = skCQH(o); if(!c.d) return '(chưa có)';
  return ngayVNsl(c.d)+(c.cach==='tinh' ? ' (tính)' : c.cach==='tt' ? ' (trực tiếp)' : '')+(c.lech ? ' ⚠ điểm hiện tại: '+ngayVNsl(c.tinh) : ''); }
function skNhomDH(o, tu, den, ns){
  var hl = skHL(o), gd = skCQH(o).d;
  if(!hl) return 0;
  if(hl<=ns && gd>ns && gd>=tu) return 1;
  if(hl>=tu && hl<=den) return (!gd || gd<=den) ? 2 : 3;   /* chưa có ngày GDXA → tính trong kỳ (ô Chuyển QH ghi “chưa có”) */
  return 0;
}
function skConGH(o){
  var tN = (o.nv && o.dhg) ? tdnSoNgay(o.nv, o.dhg) : 0, daN = (o.dhgh && o.dhg && o.dhgh>o.dhg) ? tdnSoNgay(o.dhg, o.dhgh) : 0, ghi = o.c_so_thang_da_gh||0;
  var dungN = Math.max(daN, Math.round(ghi*30.4375)), conN = Math.floor(tN/2) - dungN, lech = (ghi>0) !== (daN>0) || ((o.ghT||0)>0 && !dungN);
  return !tN ? '?' : (conN>0 ? Math.floor(conN/30.4375)+' th' : 'Hết')+(lech ? ' ⚠' : '');
}
/* ---------- 3.91: MÓN VAY TRẢ GỐC PHÂN KỲ — NỢ ĐẾN HẠN KỲ CON (anh Nhân; Công văn 597/NHCS-TDNN 30/01/2026) ----------
   gồm: nhà ở xã hội (CT 12, quy định riêng — chuyển QH kỳ con) · cho vay trực tiếp (không mã tổ: GQVL hội người mù, XKLD…)
        · cho vay ủy thác qua tổ VAY TỪ 01/03/2026 (CV 597: không trả đúng kỳ, không được điều chỉnh → chuyển QH phần dư nợ của kỳ; trừ HSSV STEM — quy định riêng).
   Vay trước 01/03/2026 (trừ NOXH): theo HĐ đã ký — không chuyển QH kỳ con (anh chốt). Chung 1 báo cáo, cột CT phân biệt.
   Kỳ đã đến hạn chưa trả = Gốc ĐH LK − Gốc đã trả (Mẫu 31, số thật). Kỳ tới: có file "Nợ đến hạn phân kỳ" (loại pk) → đúng ngày + số còn phải trả;
   không có → NOXH 6 tháng/kỳ, trực tiếp 12 tháng/kỳ ƯỚC TÍNH (≈) từ ngày bắt đầu trả gốc, ngày = GDXA, số tiền = (dư nợ − kỳ chưa trả) ÷ số kỳ còn lại, tròn xuống 100.000;
   ủy thác mới chưa rõ số kỳ → chỉ biết kỳ ĐẦU = ngày bắt đầu trả gốc (số tiền cần file). Hạn nộp Mẫu 08/TD = ngày kỳ lùi 3 ngày làm việc (bỏ T7, CN; chưa trừ ngày lễ). */
var SK_PK = null;   /* {ky, ngay, han, theoKU:{ku:[dòng kỳ]}} — file phân kỳ gần ngày số liệu */
var SK_PK_MOC = '2026-03-01';   /* CV 597: áp dụng khoản vay mới từ 01/03/2026 */
function skPKChon(ns){
  var ds = KHO.dsBang().filter(function(e){ return e.loai==='pk' && e.ky>=ns && tdnSoNgay(ns, e.ky)<=40; }).sort(function(a, b){ return a.ky<b.ky ? -1 : 1; });
  return ds[0] || null;
}
function skPKNap(ns){
  var e = skPKChon(ns); if(!e){ SK_PK = null; return Promise.resolve(); }
  if(SK_PK && SK_PK.ky===e.ky) return Promise.resolve();
  return KHO.docBang('pk', e.ky).then(function(b){
    if(!b){ SK_PK = null; return; }
    var t = {}, max = ''; slMoBang(b).forEach(function(o){ if(o.ku) (t[o.ku] = t[o.ku]||[]).push(o); if(o.pkNgay > max) max = o.pkNgay; });
    var tuTen = slNgayTrongChu(e.tenFile);   /* tên file "… phân kỳ đến 31-12-2026" = file liệt kê kỳ đến hạn tới ngày này */
    SK_PK = {ky:e.ky, ngay:e.ngay||e.ky, han:(tuTen && tuTen>=max) ? tuTen : max, theoKU:t};
  }).catch(function(){ SK_PK = null; });
}
function skNgayVN2ISO(v){ var m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(String(v||'').trim()); return m ? m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]) : (/^\d{4}-\d{2}-\d{2}/.test(String(v||'')) ? String(v).slice(0,10) : ''); }
function skPKLoai(o){   /* 'noxh' · 'tt' (trực tiếp) · 'moi' (ủy thác vay từ 01/03/2026) · '' (không thuộc) */
  if(String(o.ct)==='12') return 'noxh';
  if(!o.to) return 'tt';
  if(!o.nv || o.nv<SK_PK_MOC) return '';
  if(String(o.ct)==='02' && String(o.c_ma_quyet_dinh||'')==='43') return '';   /* HSSV STEM — quy định riêng */
  var bd = skNgayVN2ISO(o.c_ngay_b_dau_tra_goc), cuoi = skHL(o);
  return (bd && cuoi && bd<cuoi) ? 'moi' : '';
}
function skLaPK(o){ return !!skPKLoai(o); }
function skKhongCQH(o){ return String(o.ct)!=='12' && !!o.nv && o.nv<SK_PK_MOC; }   /* vay trước 01/03/2026 (trừ NOXH): theo HĐ đã ký, không chuyển QH kỳ con */
function skPKGhi(o){ return String(o.ct)==='12' ? 'NOXH — chuyển QH kỳ con (quy định riêng)' : skKhongCQH(o) ? 'Vay trước 01/03/2026 — không chuyển QH kỳ con (theo HĐ đã ký)' : 'Chuyển QH kỳ con nếu không được điều chỉnh (Mẫu 08/TD)'; }
function skNOXHChua(o){   /* gốc đến hạn LK − gốc đã trả; đã trả lấy số lớn hơn giữa cột "Gốc đã trả" và (tổng giải ngân − dư nợ) — có món trả trước kỳ cột "Gốc đã trả" chưa ghi (số thật 30/09) */
  var tra = Math.max(slSo(o.c_goc_da_tra)||0, (o.gn||0) > 0 ? (o.gn||0)-(o.dn||0) : 0);
  return Math.max(0, (slSo(o.c_goc_den_han_lk)||0)-tra);
}
function skCongThang(iso, n, ngay){ var y = +iso.slice(0,4), m = +iso.slice(5,7)-1+n, d = new Date(y, m, 1), ky = d.getFullYear()+'-'+hai(d.getMonth()+1), cuoi = +tdnCuoiKy(ky).slice(8); return ky+'-'+hai(Math.min(ngay, cuoi)); }
function skHan08(iso){   /* ngày kỳ lùi 3 ngày làm việc (bỏ T7, CN) */
  if(!iso) return ''; var p = iso.split('-'), d = new Date(+p[0], +p[1]-1, +p[2]), n = 0;
  while(n<3){ d.setDate(d.getDate()-1); if(d.getDay()!==0 && d.getDay()!==6) n++; }
  return d.getFullYear()+'-'+hai(d.getMonth()+1)+'-'+hai(d.getDate());
}
function skPKLich(o, ns, tu){   /* ước tính: kỳ trước gần nhất (≤ ns), kỳ tới (> tu, mặc định ns), số kỳ còn lại; ủy thác mới: chỉ kỳ đầu */
  tu = tu || ns;
  var bd = skNgayVN2ISO(o.c_ngay_b_dau_tra_goc), cuoi = skHL(o); if(!bd || !cuoi) return null;
  var P = String(o.ct)==='12' ? 6 : (!o.to ? 12 : 0);
  if(!P) return {P:0, truoc:bd<=ns ? bd : '', toi:bd>tu ? bd : '', con:0};
  var ngay = +(o.ngayGD||'') || +bd.slice(8), truoc = '', toi = '', con = 0;
  for(var k=0; k<200; k++){ var d = skCongThang(bd, k*P, ngay); if(d.slice(0,7)>cuoi.slice(0,7)) break; if(d<=ns) truoc = d; if(d>tu){ if(!toi) toi = d; con++; } }
  return {P:P, truoc:truoc, toi:toi, con:con};
}
function skPKKy(o, ns){   /* → {quaNgay, quaUoc, toiNgay, toiTien (null = chưa biết), uoc, khongDen} */
  var chua = skNOXHChua(o), f = SK_PK && SK_PK.theoKU[o.ku], r = {quaNgay:'', toiNgay:'', toiTien:0, uoc:false};
  if(f){
    var qua = f.filter(function(x){ return x.pkNgay && x.pkNgay<=ns; }).sort(function(a, b){ return a.pkNgay<b.pkNgay ? -1 : 1; });
    var toi = f.filter(function(x){ return x.pkNgay && x.pkNgay>ns; }).sort(function(a, b){ return a.pkNgay<b.pkNgay ? -1 : 1; });
    if(qua.length) r.quaNgay = qua[0].pkNgay;
    if(toi.length){ r.toiNgay = toi[0].pkNgay; r.toiTien = slSo(toi[0].pkCon)||0; return r; }
  }
  /* có file phân kỳ mà món không có kỳ tới trong file → không có kỳ đến hạn tới ngày file liệt kê: tính từ sau ngày đó */
  var L = skPKLich(o, ns, SK_PK && SK_PK.han > ns ? SK_PK.han : ns); if(!L) return r;
  if(chua>0 && !r.quaNgay && L.truoc){ r.quaNgay = L.truoc; r.quaUoc = !!L.P; }
  if(SK_PK) r.khongDen = SK_PK.han;
  if(L.toi && !L.P){ r.toiNgay = L.toi; r.toiTien = null; return r; }   /* ủy thác mới: ngày kỳ đầu theo HĐ, số tiền cần file */
  if(L.toi){ var du = Math.max(0, (o.dn||0)-chua); r.toiNgay = L.toi; r.toiTien = L.con<=1 ? du : Math.floor(du/L.con/100000)*100000; r.uoc = true; }
  return r;
}
function skPVTrucTiep(o){ var C = skCH(); return !C.xa || (String(o.xa||'')===String(C.xa) && !C.diem && !C.hoi && !C.ap && !C.to); }
function skPKTinh(M, ns){   /* danh sách món phân kỳ trong phạm vi, kèm kỳ */
  return (kcGoc(M)||[]).filter(function(o){ return o.ku && (o.dn||0)>0 && skLaPK(o) && (toMaCua(o) ? skTrongPV(o) : skPVTrucTiep(o)); })
    .map(function(o){ o._loai = skPKLoai(o); o._pk = skPKKy(o, ns); o._chua = skNOXHChua(o); o._h08 = (o._loai==='moi' && o._pk.toiNgay) ? skHan08(o._pk.toiNgay) : ''; return o; });
}
function skHoiNgan(o){   /* 3.92: tên hội viết tắt cho bảng in nhiều cột */
  if(!o.to) return 'Trực tiếp';
  var c = slChuan(o.tenDv||tdnHoi(o.dv)||''); return /nong dan/.test(c) ? 'HND' : /phu nu/.test(c) ? 'HPN' : /cuu chien binh/.test(c) ? 'HCCB' : /thanh nien/.test(c) ? 'ĐTN' : (o.tenDv||'');
}
function skPKTien(p){ return !p.toiNgay ? '' : p.toiTien===null ? '(cần file phân kỳ)' : (p.uoc ? '≈ ' : '')+tdnTien(p.toiTien); }
function skDatNgay(kieu){   /* nút chọn nhanh: Tháng sau · Đến cuối quý · Đến hết năm (tính từ tháng sau kỳ số liệu) */
  var C = skCH(), sau = kyLui(SK_K.thang, 1), m = +sau.slice(5,7), y = sau.slice(0,4);
  C.tu = sau+'-01';
  C.den = kieu==='thang' ? tdnCuoiKy(sau) : kieu==='quy' ? tdnCuoiKy(y+'-'+hai(Math.ceil(m/3)*3)) : y+'-12-31';
  luu(); veSaoKe();
}
function skXem(){
  var C = skCH(); if(!SK_K) return;
  if(SK_K.thieuBang) return bao('Bảng số liệu chưa có trên máy này — bấm ☁ Nối Drive và tải trước.', 5);
  var ds = SK_BC.filter(function(b){ return C.bc[b.k]; }); if(!ds.length) return bao('Chọn 1 báo cáo.', 3);
  if(C.bc.dh && (!C.tu || !C.den || C.tu > C.den)) return bao('Chọn khoảng ngày đến hạn (từ ngày ≤ đến ngày).', 4);
  if((C.bc.kqgd || C.bc.thhd || C.bc.tqh || C.bc.tkn || C.bc.tkhd) && !skXem.ttNap) return ttChuanBi().then(function(){   /* 3.261: chốt cuối tháng + BC0437 + file phân kỳ, xong mới lập (1 lần) */
    var K = TT_K || SK_K, e = K.B && K.B.hsTen==='Mẫu 31' && KHO.bang('hstd', K.thang); return e ? skPKNap(e.ngay) : null; }).then(function(){
    var K0 = SK_K; SK_K = TT_K || K0; skXem.ttNap = true; skXem.daNap = true; try{ skXem(); } finally { skXem.ttNap = false; skXem.daNap = false; SK_K = K0; } });
  if((C.bc.noxh || C.bc.pkto) && !skXem.daNap){ var M = skMau31(), e = M && KHO.bang('hstd', SK_K.thang);   /* 3.91: nạp trước file phân kỳ */
    if(e) return skPKNap(e.ngay).then(function(){ skXem.daNap = true; try{ skXem(); } finally { skXem.daNap = false; } }); }
  var pv = pvChu(C, SK_K);
  try{ SK_XEM = [].concat.apply([], ds.map(function(b){ CT_DUNG = {}; SK_KHO = skKhoCua(b.k); var x = skBaoCao(b.k);
      if(Array.isArray(x)) x.forEach(function(y){ y.pv = pv; if(b.motTrang) y.motTrang = 1; });   /* 3.259: bộ nhiều trang — mỗi trang giữ khổ, chú thích riêng */
      else { x.pv = pv; x.ctChu = ctChuThich(); x.ngang = SK_KHO==='ngang'; if(b.motTrang) x.motTrang = 1; }   /* 3.391: báo cáo tổng hợp / biểu (SK_BC motTrang) cố vừa 1 trang */
      CT_DUNG = null; return x; })); SK_KHO = 'ngang'; }
  catch(er){ CT_DUNG = null; SK_KHO = 'ngang'; return baoLoi('Lập báo cáo lỗi: '+(er && er.message || er)); }
  var fk = document.getElementById('sk-xem-khung'); if(fk && !skXem.hop){ xemChuan(fk, skHTMLIn(SK_XEM)); return; }   /* 3.386: màn xem — vẽ thẳng vào khung, ⤢ Phóng to mới mở hộp */
  moHop('<div class="hop-tit">👁 Xem sao kê — '+coChuHTML(pv)+'</div><iframe id="sk-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({ten:xuatTen(SK_XEM.length>1 ? 'Sao ke' : SK_XEM[0].ten, pv, SK_K.thang), html:function(){ return skHTMLIn(SK_XEM); }, excel:'skExcel()'}), true);   /* 3.152 */
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');   /* 3.92: khung xem trước rộng */
  var f = document.getElementById('sk-khung'); xemChuan(f, skHTMLIn(SK_XEM));
}
function skHTMLIn(R){
  return '<!doctype html><html><head><meta charset="utf-8"><title>Sao ke</title><style>'+TO_IN_CSS+'</style></head><body>'+R.map(function(x){
    return '<div class="trang'+(x.ngang ? ' ngang' : ' doc')+'"'+(x.motTrang ? ' data-tr-1trang="1"' : '')+'>'+bcDauTrang(x.ngay, coChuHTML(x.tieuDe), 'Phạm vi: <b>'+coChuHTML(x.pv)+'</b>')+x.html+bcCT(x)+bcKy()+'</div>'; }).join('')+SK_IN_NGANG+SK_IN_TU+'</body></html>';
}
/* 3.92 (anh chốt): mỗi món 1 dòng (ô không xuống dòng); đo từng trang theo khổ (dọc 16 cm, ngang 24,7 cm với lề chuẩn), tràn thì lần lượt:
   lề 15 mm → lề 10 mm → bỏ cột SĐT (.c-sdt, chỉ bảng khổ dọc) → chữ 9 → 8,5 → 8 pt; dừng ở bậc đầu tiên vừa */
function skInTu(le){   /* le = lề bắt đầu ('7mm' cho tổng hợp khuôn 01.1; mặc định lề chuẩn 20/20/20/30) */
  var B = le ? [[le, 210-2*parseFloat(le), 297-2*parseFloat(le), 0, ''], [le, 210-2*parseFloat(le), 297-2*parseFloat(le), 0, '9pt'], [le, 210-2*parseFloat(le), 297-2*parseFloat(le), 0, '8.5pt'], [le, 210-2*parseFloat(le), 297-2*parseFloat(le), 0, '8pt']]
             : [['20mm 20mm 20mm 30mm',160,247,0,''],['15mm',180,267,0,''],['10mm',190,277,0,''],['10mm',190,277,1,''],['10mm',190,277,1,'9pt'],['10mm',190,277,1,'8.5pt'],['10mm',190,277,1,'8pt']];
  return '<style>.trang td{white-space:nowrap}.trang.doc{font-size:9pt}</style><style id="sk-kho"></style><script>(function(){var t=document.querySelectorAll(".trang"),k=document.getElementById("sk-kho"),'+
    'tran=function(){return Array.prototype.some.call(t,function(x){return x.scrollWidth>x.clientWidth+2;});},B='+JSON.stringify(B)+';'+
    'for(var i=0;i<B.length;i++){var b=B[i];k.textContent="@page{margin:"+b[0]+"}@page ngang{size:A4 landscape;margin:"+b[0]+"}@media screen{.trang{width:"+b[1]+"mm;margin:0 auto 10mm}.trang.ngang{width:"+b[2]+"mm}}"+(b[3]?".c-sdt{display:none}":"")+(b[4]?".trang,.trang.doc{font-size:"+b[4]+"}":"");if(!tran())break;}})();<\/script>';
}
var SK_IN_TU = skInTu();
/* 3.91: báo cáo nhiều cột in A4 ngang — trang tên "ngang" (khổ / lề do SK_IN_TU đặt) */
var SK_IN_NGANG = '<style>@page ngang{size:A4 landscape}.trang.ngang{page:ngang}</style>';
function skExcel(){
  if(!SK_XEM.length) return;
  xongTV.then(function(){
    if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new(), dung = {};
    SK_XEM.forEach(function(x){ var t = x.ten.slice(0, 28), n = t, i = 2; while(dung[n]) n = t+' '+(i++); dung[n] = 1;
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([[x.tieuDe], ['Phạm vi: '+x.pv], [x.ngay+(x.dvEx ? ' · '+x.dvEx : '')], []].concat(x.aoa).concat([[], x.ctChu ? [x.ctChu] : [], [BC_KY]])), n); });
    var u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    taiXuongBlob(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Sao ke '+SK_K.thang+'.xlsx');
  });
}

