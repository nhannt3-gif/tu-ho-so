/* ==========================================================
   3.259 (anh chốt 18/10) — 📒 BỘ THÔNG TIN TỔ (tab con Sao kê, nhóm "Thông tin tổ"): theo file tổng hợp anh dùng hằng tháng
   ("Thông tin tổ cơ bản") + Mẫu 13/GDX bản mới (KQGD tại điểm GD có thêm doanh số, lãi đã nộp, nợ đến hạn).
   3.261 (anh: 'cần dữ liệu tương tự, chốt cuối tháng'): đủ khung file — Tổng hợp · THHD theo Xã · THHD theo Hội · từng điểm · từng xã · 3 sao kê · Ghi chú;
   số liệu luôn chốt cuối tháng; điểm tháng theo BC0437; điểm lũy kế chờ anh gửi cách chấm.
   - phạm vi + kỳ = bộ chọn chung của tab Sao kê; số liệu Mẫu 31 + 3 file tháng (KHĐ, quá hạn, khoanh) + Danh sách tổ (SĐT, tổ phó)
   - KQGD: mỗi điểm GD 1 trang / 1 sheet; dòng Hội (cộng) → các tổ (dư nợ lớn trước) → dòng theo chương trình của hội; cuối: CỘNG + theo chương trình
   - 3 sao kê: chia Điểm GD › Hội › Tổ, dòng nhóm mang số cộng (như file mẫu)
   - In: nghìn đồng (như 13/GDX); Excel: đồng, dòng cộng + tỷ lệ là CÔNG THỨC (sửa số trong file thì tổng tự đổi)
   ========================================================== */
var TT_DONG0 = 5;   /* skExcel chèn 4 dòng đầu (tiêu đề, phạm vi, ngày, trống) → dòng aoa[0] là dòng 5 của sheet */
var TT_HOI_THU = ['11', '12', '13', '14'];
function ttHoiThu(dv){ dv = String(dv||''); var i = TT_HOI_THU.indexOf(dv); return i>=0 ? i : (dv==='99' ? 9 : 5); }
function ttCot(j){ var s = ''; j++; while(j>0){ var m = (j-1)%26; s = String.fromCharCode(65+m)+s; j = (j-m-1)/26; } return s; }
function ttTenSheet(s){ return String(s||'').replace(/[:\\\/?*\[\]]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 28) || 'Sheet'; }
function ttNghin(v){ return v ? tdnTien(Math.round(v/1000)) : ''; }
function ttPT(v){ return v ? v.toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2}) : ''; }
function ttTyLe(a, b){ return b ? Math.round(a/b*10000)/100 : 0; }
function ttDiemTen(t){ return t && t.tenDiem ? String(t.tenDiem).trim() : '(chưa rõ điểm GD)'; }
var TT_CSS = '<style>.tt-bang tr.diem td{background:#dfe7f0;font-weight:bold}.tt-bang tr.hoi td{background:#eef3e8;font-weight:bold}.tt-bang tr.to td{background:#f7f7f2;font-weight:bold}'+
  '.tt-bang tr.to0 td{background:#fde2e2}.tt-bang th{text-align:center;vertical-align:middle;white-space:normal}.trang .tt-bang th{white-space:normal}'+
  '.tt-h3{font-size:11pt;margin:10px 0 3px}.tt-ghi p{margin:2px 0}.tt-ghi p.b{font-weight:bold;margin-top:8px}</style>';

/* ---------- số liệu 1 tổ (theo món Mẫu 31) — dùng cho KQGD ---------- */
var TT_SO = ['kh','cv','tn','dn','qh','kn','tl','lt','t105','khdKH','khdDn','knKH','dhCuoi','dhPK','dhKC'];
function ttSoMoi(){ var s = {}; TT_SO.forEach(function(f){ s[f] = 0; }); s.soTo = 0; s._kh = {}; s._khd = {}; s._kn = {}; s.pkUoc = false; return s; }
function ttCong(a, s){ TT_SO.forEach(function(f){ if(f!=='kh' && f!=='khdKH' && f!=='knKH') a[f] += s[f]||0; });
  ['_kh','_khd','_kn'].forEach(function(f){ Object.keys(s[f]).forEach(function(k){ a[f][k] = 1; }); }); a.soTo += s.soTo||0; if(s.pkUoc) a.pkUoc = true; return a; }
function ttChot(s){ s.kh = Object.keys(s._kh).length; s.khdKH = Object.keys(s._khd).length; s.knKH = Object.keys(s._kn).length; return s; }
function ttNgu(K){   /* mốc ngày: ngày số liệu, tháng sau */
  var sau = kyLui(K.thang, 1); return {ns:K.ngay, tu:sau+'-01', den:tdnCuoiKy(sau)};
}
function ttMon(o, s, N, khd){   /* cộng 1 món vào s (s = tổ hoặc chương trình); khách tính theo mã KH (gộp được nhiều tổ) */
  if(!o.ku) return;
  var dn = o.dn||0, qh = o.qh||0, kn = o.kn||0, lt = laiTon(o);
  if(dn>0 || qh>0 || kn>0 || lt>0) s._kh[o.kh] = 1;
  s.cv += o.gnT||0; s.tn += (o.tnTH||0)+(o.tnQH||0)+(o.tnK||0);
  s.dn += dn; s.qh += qh; s.kn += kn; s.lt += lt;
  s.tl += (slSo(o.c_thu_lai_th_thang)||0)+(slSo(o.c_thu_lai_qh_thang)||0);
  if(kn>0) s._kn[o.kh] = 1;
  if(khd[o.ku]){ s._khd[o.kh] = 1; s.khdDn += dn; }
  if(dn>0 && !(qh>0) && !(kn>0) && String(o.ttMon||'').toUpperCase()!=='CLOSE'){
    var hl = skHL(o);
    if(hl && hl<=N.ns) s.dhCuoi += dn;
    else if(hl && hl>=N.tu && hl<=N.den) s.dhKC += dn;
    else if(skLaPK(o)){ var p = skPKKy(o, N.ns); if(p.toiNgay && p.toiNgay>=N.tu && p.toiNgay<=N.den && typeof p.toiTien==='number'){ s.dhPK += p.toiTien; if(p.uoc) s.pkUoc = true; } }
  }
}
function ttDuLieu(){   /* → [{khoa, ten, tenXa, ngayGD, hoi:[{dv, ten, to:[{t, s}], ct:{ma:s}, s}], ct:{ma:s}, s}] trong phạm vi */
  var K = SK_K, C = skCH(), T = K.to || {}, N = ttNgu(K), khd = {}, t105 = {}, lap = {};
  slKHD(K.B).forEach(function(o){ if(o.ku) khd[o.ku] = 1; });
  (K.lap||[]).forEach(function(o){ if(o.kh && (o.t105||0)>(lap[o.kh]||0)) lap[o.kh] = o.t105; });
  var D0 = {}, ds = [];
  Object.keys(T).map(function(m){ return T[m]; }).filter(function(t){ return pvLoc(C, t); }).forEach(function(t){
    var kd = t.khoaDiem || ttDiemTen(t), d = D0[kd];
    if(!d){ d = D0[kd] = {khoa:kd, ten:ttDiemTen(t), tenXa:t.tenXa||'', ngayGD:t.ngayGD||'', H:{}, ct:{}, s:ttSoMoi()}; ds.push(d); }
    var dv = String(t.dv||''), h = d.H[dv] = d.H[dv] || {dv:dv, ten:ttHoiTen(dv), to:[], ct:{}, s:ttSoMoi()};
    var s = ttSoMoi(), kh105 = {};
    (K.kh[t.ma]||[]).forEach(function(o){
      ttMon(o, s, N, khd);
      var v = Math.max(o.t105||0, lap[o.kh]||0); if(o.kh && v>(kh105[o.kh]||0)) kh105[o.kh] = v; });
    Object.keys(kh105).forEach(function(k){ s.t105 += kh105[k]; });
    s.soTo = toLaTT(t) ? 0 : 1; ttChot(s);
    h.to.push({t:t, s:s}); ttCong(h.s, s); ttCong(d.s, s);
  });
  ds.forEach(function(d){
    d.hoi = Object.keys(d.H).map(function(k){ return d.H[k]; }).sort(function(a, b){ return ttHoiThu(a.dv)-ttHoiThu(b.dv) || a.dv.localeCompare(b.dv); });
    d.hoi.forEach(function(h){ ttChot(h.s);
      h.to.sort(function(a, b){ return (toLaTT(a.t) - toLaTT(b.t)) || (b.s.dn - a.s.dn) || String(a.t.ten||'').localeCompare(String(b.t.ten||''), 'vi'); }); });
    ttChot(d.s);
  });
  return ds.sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi') || ((+a.ngayGD||99) - (+b.ngayGD||99)) || a.ten.localeCompare(b.ten, 'vi'); });
}

/* ---------- 3.261 (anh 18/10: "cần dữ liệu tương tự, chốt cuối tháng"): KQGD theo khung file tổng hợp ----------
   cột như file anh dùng (21 cột) + cột thêm theo 13/GDX ở cuối; In = cột chính (nghìn đồng, vừa A4 ngang), Excel = đủ cột (đồng) */
function ttHoiTen(dv){ dv = String(dv||''); return dv==='99' ? 'Cho vay trực tiếp' : (TT_HOI_TEN[dv] || tdnHoi(dv) || 'Chưa rõ hội'); }
var TT_HOI_TEN = {'11':'Hội nông dân', '12':'Hội liên hiệp phụ nữ', '13':'Hội cựu chiến binh', '14':'Đoàn thanh niên CSHCM'};
var TT_K = null, TT_BC37 = null;   /* số liệu chốt tháng + BC0437 cùng tháng — nạp ở ttChuanBi trước khi lập */
function ttChuanBi(){   /* kỳ đang chọn là ngày → lấy Mẫu 31 chốt tháng của tháng đó (anh chốt: chốt cuối tháng) */
  var th = SK_K.thang, K0 = SK_K;
  return (SK_K.ky===th ? Promise.resolve(SK_K) : toNap(th).catch(function(){ return K0; })).then(function(K){ TT_K = K && K.B ? K : K0;
    return typeof ktNapBC==='function' ? ktNapBC(th).catch(function(){ return null; }) : null; })
    .then(function(r){ TT_BC37 = r && r.k37 && slThang(r.k37.e.ky)===th ? r.k37 : null; });
}
function ttCham(ma){ var b = TT_BC37 && TT_BC37.theoTo[ma], d = b ? b.diemTo : ''; return {d:(d===undefined || d===null || d==='') ? '' : +d, xl:b ? b.xepLoai||'' : ''}; }
/* cột: [mã, tiêu đề, kiểu (c chữ · n đếm · t tiền · p tỷ lệ · d điểm), in (1 = có trong bản in), [tử, mẫu] cho tỷ lệ] */
var TT_COT = [['stt','STT','c',1], ['ten','Tên tổ (Tổ trưởng)','c',1], ['ap','Ấp/Thôn','c',1], ['ma','Mã tổ','c',1], ['sdt','SĐT Tổ trưởng','c',0], ['pho','Tên Tổ phó','c',0],
  ['kh','Số hộ','n',1], ['dn','Dư nợ','t',1], ['t105','Tiết kiệm - Số dư','t',1], ['qh','Nợ quá hạn','t',1], ['tlqh','Tỷ lệ NQH (%)','p',1,['qh','dn']], ['lt','Lãi tồn chưa thu','t',1],
  ['khdKH','Số hộ KHĐ (3 tháng)','n',1], ['khdDn','Dư nợ KHĐ (3 tháng)','t',1], ['tlkhd','Tỷ lệ KHĐ/Dư nợ (%)','p',1,['khdDn','dn']], ['knKH','Số hộ Khoanh nợ','n',1], ['kn','Dư nợ Khoanh nợ','t',1],
  ['diem','Điểm tháng','d',1], ['xl','Xếp loại tháng','c',1], ['dlk','Điểm lũy kế','d',0], ['xllk','Xếp loại lũy kế','c',0],
  ['cv','Doanh số cho vay (tháng)','t',0], ['tn','Doanh số thu nợ (tháng)','t',0], ['tl','Tiền lãi đã nộp (tháng)','t',0], ['tlkn','Tỷ lệ khoanh (%)','p',0,['kn','dn']],
  ['dhCuoi','Nợ đến hạn kỳ cuối chưa trả','t',0], ['dhPK','Nợ đến hạn tháng sau — Phân kỳ','t',0], ['dhKC','Nợ đến hạn tháng sau — Kỳ cuối','t',0]];
var TT_COT_XA = [TT_COT[0], ['diemGD','Điểm GD','c',1], ['hoi','Hội đoàn thể','c',0]].concat(TT_COT.slice(1));
function ttTenCot(c){ return c[0]==='diem' && SK_K ? 'Điểm tháng '+SK_K.thang.slice(5, 7) : c[1]; }
function ttGT(c, x){   /* giá trị 1 ô của dòng tổ x = {t, s, cd, stt, diemTen, hoiTen} hoặc dòng nhóm (x.s, x.nhan) */
  var t = x.t || {}, s = x.s || {}, k = c[0];
  if(c[2]==='p') return ttTyLe(s[c[4][0]]||0, s[c[4][1]]||0);
  if(c[2]==='n' || c[2]==='t') return s[k]||0;
  if(x.nhan!==undefined) return k==='diem' ? (x.dtb===undefined ? '' : x.dtb) : '';
  return k==='stt' ? x.stt : k==='ten' ? (toLaTT(t) ? 'Vay trực tiếp (không qua tổ)' : t.ten||'') : k==='ap' ? t.tenThon||'' : k==='ma' ? (toLaTT(t) ? '' : t.ma) : k==='sdt' ? t.sdt||'' : k==='pho' ? t.pho||'' :
    k==='diemGD' ? x.diemTen||'' : k==='hoi' ? x.hoiTen||'' : k==='diem' ? x.cd.d : k==='xl' ? x.cd.xl : '';
}
function ttOIn(c, v){ return c[2]==='t' ? ttNghin(v) : c[2]==='p' ? ttPT(v) : c[2]==='n' ? (v ? String(v) : '') : c[2]==='d' ? (v==='' || v===undefined ? '' : (+v).toLocaleString('vi-VN', {maximumFractionDigits:2})) : coChuHTML(String(v===undefined || v===null ? '' : v)); }
function ttDTB(ds){ var a = ds.map(function(x){ return x.cd.d; }).filter(function(v){ return v!==''; }); return a.length ? Math.round(a.reduce(function(p, v){ return p+v; }, 0)/a.length*100)/100 : ''; }
/* bảng tổ chia nhóm Hội: dòng nhóm (cộng = công thức SUM), dòng tổ, dòng CỘNG (= cộng các dòng nhóm) */
function ttBangTo(cot, nhom, nhanTong, sTong){
  var aoa = [cot.map(ttTenCot)], h = '', r = function(){ return TT_DONG0 + aoa.length; }, inC = cot.filter(function(c){ return c[3]; });
  var dauIn = 0; while(dauIn<inC.length && inC[dauIn][2]==='c') dauIn++;   /* cột chữ đầu bảng in — dòng nhóm gộp làm 1 ô */
  var iC = function(k){ for(var j=0;j<cot.length;j++) if(cot[j][0]===k) return j; return -1; };
  var tl = function(row, n){ cot.forEach(function(c, j){ if(c[2]==='p') row[j] = {t:'n', v:row[j], f:'IFERROR('+ttCot(iC(c[4][0]))+n+'/'+ttCot(iC(c[4][1]))+n+'*100,0)'}; }); return row; };
  var dongIn = function(x, lop){ h += '<tr'+(lop ? ' class="'+lop+'"' : '')+'>'+(x.nhan!==undefined ? '<td colspan="'+dauIn+'">'+coChuHTML(x.nhan)+'</td>'+inC.slice(dauIn).map(function(c){ return '<td class="s">'+ttOIn(c, ttGT(c, x))+'</td>'; }).join('')
    : inC.map(function(c){ var v = ttGT(c, x); return '<td'+(c[2]!=='c' ? ' class="s"' : (c[0]==='stt' ? ' class="c"' : ''))+'>'+ttOIn(c, v)+'</td>'; }).join(''))+'</tr>'; };
  var nNhom = [];
  nhom.forEach(function(g){
    var n0 = r(), n1 = n0 + g.ds.length, gx = {nhan:g.nhan, s:g.s, dtb:ttDTB(g.ds)};
    dongIn(gx, 'hoi');
    aoa.push(tl(cot.map(function(c, j){ if(j===0) return g.nhan; var v = ttGT(c, gx);
      if((c[2]==='n' || c[2]==='t') && g.ds.length) return {t:'n', v:v, f:'SUM('+ttCot(j)+(n0+1)+':'+ttCot(j)+n1+')'};
      if(c[2]==='d' && v!=='') return {t:'n', v:v, f:'IFERROR(AVERAGE('+ttCot(j)+(n0+1)+':'+ttCot(j)+n1+'),"")'};
      return c[2]==='p' ? v : ''; }), n0));
    nNhom.push(n0);
    g.ds.forEach(function(x){ dongIn(x, !toLaTT(x.t) && !x.s.dn ? 'to0' : ''); aoa.push(tl(cot.map(function(c){ return ttGT(c, x); }), r())); });
  });
  var tx = {nhan:nhanTong, s:sTong, dtb:ttDTB([].concat.apply([], nhom.map(function(g){ return g.ds; })))}, nT = r();
  dongIn(tx, 'tong');
  aoa.push(tl(cot.map(function(c, j){ if(j===0) return nhanTong; var v = ttGT(c, tx);
    if((c[2]==='n' || c[2]==='t') && nNhom.length) return {t:'n', v:v, f:nNhom.map(function(n){ return ttCot(j)+n; }).join('+')};
    return c[2]==='p' || c[2]==='d' ? v : ''; }), nT));
  var dau = '<thead><tr>'+inC.map(function(c){ return '<th>'+coChuHTML(ttTenCot(c))+'</th>'; }).join('')+'</tr></thead>';
  return {html:TT_CSS+'<table class="bc-bang luoi tt-bang tt-in">'+dau+'<tbody>'+h+'</tbody></table>', aoa:aoa};
}
function ttXaNgan(x){ return String(x||'').replace(/^(xã|phường|thị trấn)\s+/i, ''); }
function ttNgayChu(){ var K = SK_K; return 'Chốt cuối tháng '+kyVN(K.thang).replace(/^T/, '')+' (số liệu đến ngày '+ngayVNsl(K.ngay)+')'; }
var TT_GHI_IN = 'Bản in: nghìn đồng, các cột chính; Excel: đồng, đủ cột (thêm SĐT, tổ phó, điểm lũy kế, doanh số tháng, lãi đã nộp, nợ đến hạn — theo 13/GDX).';
function ttDiemSheet(d){
  var stt = 0, nhom = d.hoi.map(function(g){ return {nhan:g.ten+' ('+g.s.soTo+' tổ)', s:g.s, ds:g.to.map(function(x){ return {t:x.t, s:x.s, cd:ttCham(x.t.ma), stt:toLaTT(x.t) ? 0 : ++stt}; })}; });
  var B = ttBangTo(TT_COT, nhom, 'CỘNG ('+d.s.soTo+' tổ)', d.s);
  return {ten:ttTenSheet(d.ten), tieuDe:'KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH '+d.ten.toUpperCase(), ngang:true, ctChu:'',
    ngay:'Xã: '+(d.tenXa||'')+(d.ngayGD ? ' · ngày GDXA '+d.ngayGD : '')+' · '+ttNgayChu(), aoa:B.aoa,
    html:'<div class="bc-tom">'+d.s.soTo+' tổ · '+d.s.kh+' hộ · dư nợ <b>'+tdnTien(d.s.dn)+'</b> · quá hạn <b>'+tdnTien(d.s.qh)+'</b> · khoanh <b>'+tdnTien(d.s.kn)+'</b> · KHĐ 3 tháng <b>'+tdnTien(d.s.khdDn)+'</b> đồng</div>'+B.html+'<div class="bc-ghi">'+TT_GHI_IN+' Dòng tô đỏ nhạt = tổ dư nợ 0.</div>'};
}
function ttXaGom(ds){   /* điểm → xã */
  var X = {}, thu = [];
  ds.forEach(function(d){ var k = d.tenXa || '?', x = X[k]; if(!x){ x = X[k] = {ten:k, diem:[], s:ttSoMoi(), H:{}}; thu.push(x); } x.diem.push(d); ttCong(x.s, d.s);
    d.hoi.forEach(function(g){ var h = x.H[g.dv] = x.H[g.dv] || {dv:g.dv, ten:g.ten, s:ttSoMoi(), to:[]}; ttCong(h.s, g.s); g.to.forEach(function(z){ h.to.push({t:z.t, s:z.s, diemTen:d.ten}); }); }); });
  thu.forEach(function(x){ ttChot(x.s); x.hoi = Object.keys(x.H).map(function(k){ return x.H[k]; }).sort(function(a, b){ return ttHoiThu(a.dv)-ttHoiThu(b.dv) || a.dv.localeCompare(b.dv); });
    x.hoi.forEach(function(h){ ttChot(h.s); }); });
  return thu;
}
function ttXaSheet(x){
  var stt = 0, nhom = x.hoi.map(function(g){ return {nhan:'Cộng '+g.ten+' ('+g.s.soTo+' tổ)', s:g.s, ds:g.to.map(function(z){ return {t:z.t, s:z.s, cd:ttCham(z.t.ma), stt:toLaTT(z.t) ? 0 : ++stt, diemTen:z.diemTen, hoiTen:g.ten}; })}; });
  var B = ttBangTo(TT_COT_XA, nhom, 'CỘNG '+x.ten.toUpperCase()+' ('+x.s.soTo+' tổ)', x.s);
  return {ten:ttTenSheet(x.ten), tieuDe:'KẾT QUẢ GIAO DỊCH TOÀN XÃ: '+x.ten.toUpperCase(), ngang:true, ctChu:'',
    ngay:'Gồm: '+x.diem.map(function(d){ return d.ten+(d.ngayGD ? ' (ngày GDXA '+d.ngayGD+')' : ''); }).join(' | ')+' · '+ttNgayChu(), aoa:B.aoa, html:B.html+'<div class="bc-ghi">'+TT_GHI_IN+'</div>'};
}
/* bảng tổng hợp nhỏ (đồng): cot = [[tiêu đề, kiểu, [tử, mẫu]]], dong = mảng hàng; tong → dòng cộng công thức */
function ttBangDon(cot, dong, tong){
  var aoa = [cot.map(function(c){ return c[0]; })];
  var fm = function(c, v){ return c[1]==='t' ? tdnTien(v) : c[1]==='p' ? ttPT(v) : c[1]==='d' ? (v==='' ? '' : (+v).toLocaleString('vi-VN', {maximumFractionDigits:2})) : c[1]==='n' ? String(v||0) : coChuHTML(String(v)); };
  var h = dong.map(function(r){ aoa.push(r.v.map(function(v, j){ var c = cot[j]; return c[1]==='p' ? {t:'n', v:v, f:'IFERROR('+ttCot(c[2][0])+(TT_DONG0+aoa.length)+'/'+ttCot(c[2][1])+(TT_DONG0+aoa.length)+'*100,0)'} : v; }));
    return '<tr'+(r.lop ? ' class="'+r.lop+'"' : '')+'>'+r.v.map(function(v, j){ return '<td'+(cot[j][1]!=='c' || /^[\d.,]+$/.test(String(v)) ? ' class="s"' : '')+'>'+fm(cot[j], v)+'</td>'; }).join('')+'</tr>'; }).join('');
  if(tong){ var cd = dong.filter(function(r){ return !r.con; }), idx = []; dong.forEach(function(r, i){ if(!r.con) idx.push(TT_DONG0+1+i); });
    var nT = TT_DONG0+aoa.length, v = cot.map(function(c, j){ if(j===0) return tong;
      if(c[1]==='n' || c[1]==='t') return cd.reduce(function(a, r){ return a+(r.v[j]||0); }, 0);
      if(c[1]==='d'){ var a = cd.map(function(r){ return r.v[j]; }).filter(function(x){ return x!==''; }); return a.length ? Math.round(a.reduce(function(p, x){ return p+x; }, 0)/a.length*100)/100 : ''; }
      return ''; });
    cot.forEach(function(c, j){ if(c[1]==='p') v[j] = ttTyLe(v[c[2][0]]||0, v[c[2][1]]||0); });
    aoa.push(v.map(function(x, j){ var c = cot[j]; if(j===0) return x;
      if(c[1]==='n' || c[1]==='t') return {t:'n', v:x, f:idx.map(function(n){ return ttCot(j)+n; }).join('+') || '0'};
      if(c[1]==='p') return {t:'n', v:x, f:'IFERROR('+ttCot(c[2][0])+nT+'/'+ttCot(c[2][1])+nT+'*100,0)'};
      return x; }));
    h += '<tr class="tong">'+v.map(function(x, j){ return '<td'+(cot[j][1]!=='c' || /^[\d.,]+$/.test(String(x)) ? ' class="s"' : '')+'>'+fm(cot[j], x)+'</td>'; }).join('')+'</tr>'; }
  return {aoa:aoa, html:'<table class="bc-bang luoi tt-bang">'+'<thead><tr>'+cot.map(function(c){ return '<th>'+coChuHTML(c[0])+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>'};
}
function ttDemXL(ds){ var r = {tot:0, kha:0, tb:0, yeu:0}; ds.forEach(function(z){ var x = slChuan(ttCham(z.t.ma).xl); if(/^tot/.test(x)) r.tot++; else if(/^kha/.test(x)) r.kha++; else if(/trung binh|^tb/.test(x)) r.tb++; else if(/^yeu/.test(x)) r.yeu++; }); return r; }
function ttDTBTo(ds){ var a = ds.map(function(z){ return ttCham(z.t.ma).d; }).filter(function(v){ return v!==''; }); return a.length ? Math.round(a.reduce(function(p, v){ return p+v; }, 0)/a.length*100)/100 : ''; }
function ttRR(s){ return ttTyLe((s.khdDn||0)+(s.kn||0), s.dn||0); }
function ttTongHop(ds, xs){
  var cot = [['Xã / Điểm GD','c'], ['Số tổ','n'], ['Số hộ','n'], ['Dư nợ (đồng)','t'], ['Nợ quá hạn (đồng)','t'], ['Tỷ lệ NQH (%)','p',[4, 3]], ['Dư nợ KHĐ (đồng)','t'], ['Dư nợ Khoanh (đồng)','t']];
  var dong = [];
  xs.forEach(function(x){ dong.push({v:[x.ten, x.s.soTo, x.s.kh, x.s.dn, x.s.qh, ttTyLe(x.s.qh, x.s.dn), x.s.khdDn, x.s.kn], lop:'hoi'});
    x.diem.forEach(function(d, i){ dong.push({con:true, v:['  '+(i===x.diem.length-1 ? '└ ' : '├ ')+d.ten, d.s.soTo, d.s.kh, d.s.dn, d.s.qh, ttTyLe(d.s.qh, d.s.dn), d.s.khdDn, d.s.kn]}); }); });
  var A = ttBangDon(cot, dong, 'TỔNG CỘNG');
  /* nợ quá hạn (báo cáo riêng) theo điểm */
  var K = SK_K, T = K.to || {}, q = {}, nq = 0;
  (K.B.co.nqh||[]).filter(skTrongPV).forEach(function(o){ var t = T[toMaCua(o)] || {}, k = ttDiemTen(t), x = q[k] = q[k] || {n:0, tien:0}; x.n++; x.tien += o.qh||0; nq++; });
  var B = ttBangDon([['Điểm GD','c'], ['Số khoản','n'], ['Dư nợ quá hạn (đồng)','t']], ds.map(function(d){ var x = q[d.ten] || {n:0, tien:0}; return {v:[d.ten, x.n, x.tien]}; }), 'Tổng');
  var tat = [].concat.apply([], ds.map(function(d){ return [].concat.apply([], d.hoi.map(function(g){ return g.to.filter(function(z){ return !toLaTT(z.t); }); })); })), xl = ttDemXL(tat), nTo = tat.length;
  var C = ttBangDon([['Xếp loại','c'], ['Số tổ','n'], ['Tỷ lệ (%)','c']], [['Tốt', xl.tot], ['Khá', xl.kha], ['Trung bình', xl.tb], ['Yếu', xl.yeu]].map(function(r){ return {v:[r[0], r[1], ttPT(ttTyLe(r[1], nTo))]}; }), 'Tổng');
  var coCham = !!TT_BC37;
  var aoa = A.aoa.concat([[], ['NỢ QUÁ HẠN (báo cáo riêng, đến '+ngayVNsl(skNgayThang('nqh'))+')']], B.aoa.map(function(r){ return r.map(function(c){ return c && c.f ? c.v : c; }); }),
    [[], ['TÌNH HÌNH CHẤM ĐIỂM CHẤT LƯỢNG TỔ (tháng '+kyVN(K.thang).replace(/^T/, '')+')'+(coCham ? '' : ' — chưa nạp BC0437 tháng này')]], C.aoa.map(function(r){ return r.map(function(c){ return c && c.f ? c.v : c; }); }));
  return {ten:'Tổng hợp', tieuDe:'TỔNG HỢP GIAO DỊCH TÍN DỤNG CHÍNH SÁCH', ngang:false, ctChu:'', ngay:ttNgayChu(), aoa:aoa,
    html:A.html+'<h3 class="tt-h3">Nợ quá hạn (báo cáo riêng) — '+nq+' khoản</h3>'+B.html+'<h3 class="tt-h3">Tình hình chấm điểm chất lượng tổ'+(coCham ? '' : ' <small>(chưa nạp BC0437 tháng này)</small>')+'</h3>'+C.html};
}
function ttTheoXa(xs){
  var cot = [['Xã','c'], ['Số tổ','n'], ['Số hộ','n'], ['Dư nợ (đồng)','t'], ['Tiết kiệm (đồng)','t'], ['Nợ quá hạn (đồng)','t'], ['Tỷ lệ NQH (%)','p',[5, 3]], ['Dư nợ KHĐ (đồng)','t'], ['Dư nợ Khoanh (đồng)','t'], ['Tỷ lệ rủi ro (%)','c'], ['Điểm TB tháng','d']];
  var dong = xs.map(function(x){ var to = [].concat.apply([], x.hoi.map(function(g){ return g.to.filter(function(z){ return !toLaTT(z.t); }); }));
    return {v:[x.ten, x.s.soTo, x.s.kh, x.s.dn, x.s.t105, x.s.qh, ttTyLe(x.s.qh, x.s.dn), x.s.khdDn, x.s.kn, ttPT(ttRR(x.s)), ttDTBTo(to)]}; });
  var A = ttBangDon(cot, dong, 'TỔNG CỘNG PGD'), tg = ttSoMoi(); xs.forEach(function(x){ ttCong(tg, x.s); });
  var tr = A.aoa[A.aoa.length-1]; tr[9] = ttPT(ttRR(tg));
  return {ten:'THHD theo Xã', tieuDe:'SO SÁNH THEO XÃ', ngang:true, ctChu:'', ngay:ttNgayChu(), aoa:A.aoa, html:A.html+'<div class="bc-ghi">Tỷ lệ rủi ro = (dư nợ KHĐ + dư nợ khoanh) / dư nợ. Điểm TB tháng theo BC0437.</div>'};
}
function ttTheoHoi(x){
  var cot = [['Hội đoàn thể','c'], ['Số tổ','n'], ['Số hộ','n'], ['Dư nợ (đồng)','t'], ['Tỷ trọng DN (%)','c'], ['Nợ quá hạn (đồng)','t'], ['Tỷ lệ NQH (%)','p',[5, 3]], ['Dư nợ KHĐ (đồng)','t'], ['Dư nợ Khoanh (đồng)','t'],
    ['Tỷ lệ rủi ro (%)','c'], ['Điểm TB tháng','d'], ['Số tổ Tốt','n'], ['Số tổ Khá','n'], ['Số tổ TB/Yếu','n']];
  var dong = x.hoi.map(function(g){ var to = g.to.filter(function(z){ return !toLaTT(z.t); }), xl = ttDemXL(to);
    return {v:[g.ten, g.s.soTo, g.s.kh, g.s.dn, ttPT(ttTyLe(g.s.dn, x.s.dn)), g.s.qh, ttTyLe(g.s.qh, g.s.dn), g.s.khdDn, g.s.kn, ttPT(ttRR(g.s)), ttDTBTo(to), xl.tot, xl.kha, xl.tb+xl.yeu]}; });
  var A = ttBangDon(cot, dong, 'CỘNG'), tr = A.aoa[A.aoa.length-1]; tr[4] = ttPT(100); tr[9] = ttPT(ttRR(x.s));
  return {ten:ttTenSheet('THHD theo Hội - '+ttXaNgan(x.ten)), tieuDe:'PHÂN TÍCH THEO HỘI ĐOÀN THỂ — '+x.ten.toUpperCase(), ngang:true, ctChu:'', ngay:ttNgayChu(), aoa:A.aoa, html:A.html};
}
function ttGhiChu(ds){
  var K = SK_K, B = K.B, n = function(L){ return B.nguon && B.nguon[L] ? slKyChu(B.nguon[L]) : 'chưa nạp'; };
  var to0 = [], chuaDiem = [];
  ds.forEach(function(d){ d.hoi.forEach(function(g){ g.to.forEach(function(z){ if(toLaTT(z.t)) return; if(!z.s.dn) to0.push(z.t); if(!z.t.diem) chuaDiem.push(z.t); }); }); });
  var dong = ['ĐẶC TẢ — Bộ thông tin tổ '+kyVN(K.thang)+' (app lập từ số liệu đã nạp)', '',
    '1. PHẠM VI & CẤU TRÚC', 'Phạm vi: '+pvChu(skCH(), K)+' — '+ds.length+' điểm GD.', 'Cấu trúc: Tổng hợp → THHD theo Xã → THHD theo Hội từng xã → từng điểm GD → từng xã → 3 Tháng KHĐ → Nợ QH → Nợ khoanh → Ghi chú.', '',
    '2. NGUỒN SỐ LIỆU (chốt cuối tháng)', 'Mẫu 31: '+n('hstd')+' · Danh sách tổ: '+n('dsto')+' · KHĐ: '+(B.co.khd ? n('khd') : 'app tự tính từ Mẫu 31')+' · Nợ quá hạn: '+n('nqh')+' · Nợ khoanh: '+n('nk')+'.',
    'Chấm điểm tổ tháng: '+(TT_BC37 ? 'BC0437 '+slKyChu(TT_BC37.e.ky) : 'chưa nạp BC0437 tháng này — cột điểm để trống')+'. Điểm lũy kế: chưa có nguồn (chờ cách chấm lũy kế).', '',
    '3. CÁCH TÍNH', 'Số hộ = khách còn dư nợ (gốc hoặc lãi). Tiết kiệm = số dư TK 105 tổ viên. Tỷ lệ rủi ro = (dư nợ KHĐ + dư nợ khoanh) / dư nợ.',
    'Cột thêm (Excel): doanh số cho vay / thu nợ, tiền lãi đã nộp = phát sinh trong tháng; nợ đến hạn kỳ cuối chưa trả = món trong hạn đã qua hạn hợp đồng / gia hạn, chưa chuyển quá hạn; nợ đến hạn tháng sau = phân kỳ (file phân kỳ, không có thì ước tính) + kỳ cuối.', '',
    '4. CẦN LƯU Ý'];
  if(to0.length) dong.push('Tổ dư nợ 0 (tô đỏ nhạt — kiểm tra lại / cần đóng tổ): '+to0.map(function(t){ return (t.ten||'')+' (mã '+t.ma+')'; }).join('; ')+'.');
  if(chuaDiem.length) dong.push('Tổ chưa rõ điểm GD (thiếu trong Danh sách tổ): '+chuaDiem.map(function(t){ return (t.ten||'')+' (mã '+t.ma+')'; }).join('; ')+'.');
  if(!to0.length && !chuaDiem.length) dong.push('Không có tổ dư nợ 0 hoặc thiếu điểm GD.');
  return {ten:'Ghi chú', tieuDe:'GHI CHÚ', ngang:false, ctChu:'', ngay:ttNgayChu(), aoa:dong.map(function(x){ return [x]; }),
    html:'<div class="tt-ghi">'+dong.map(function(x){ return x ? '<p'+(/^\d\. /.test(x) ? ' class="b"' : '')+'>'+coChuHTML(x)+'</p>' : ''; }).join('')+'</div>'};
}

/* ---------- 3 sao kê chia Điểm GD › Hội › Tổ (dòng nhóm mang số cộng) ---------- */
function ttSaoKe(o){   /* o = {ten, tieuDe, L, cot, dong(x, stt) → mảng ô, so:[cột cộng]} */
  var K = SK_K, T = K.to || {}, ma31 = {};
  if(!SLM.bang[slKhoa(o.L, K.thang)] && o.L!=='khd') return {ten:o.ten, tieuDe:o.tieuDe, ngang:false, ctChu:'', ngay:'Tháng '+kyVN(K.thang), aoa:[['Chưa nạp file']], html:'<div class="bc-rong">Chưa nạp file '+coChuHTML(slLoai(o.L).ten)+' tháng '+kyVN(K.thang)+'.</div>'};
  (K.hs||[]).forEach(function(x){ if(x.ku && !ma31[x.ku]) ma31[x.ku] = x; });
  var ds = (o.L==='khd' ? slKHD(K.B) : (K.B.co[o.L]||[])).filter(skTrongPV);
  var D0 = {}, thu = [];
  ds.forEach(function(x){ var ma = toMaCua(x), t = T[ma] || {}, kd = t.khoaDiem || ttDiemTen(t), d = D0[kd];
    if(!d){ d = D0[kd] = {ten:ttDiemTen(t), tenXa:t.tenXa||'', ngayGD:t.ngayGD||'', H:{}}; thu.push(d); }
    var dv = String(t.dv||''), h = d.H[dv] = d.H[dv] || {dv:dv, ten:ttHoiTen(dv), T:{}};
    var g = h.T[ma||'?'] = h.T[ma||'?'] || {t:t, ma:ma, ds:[]}; g.ds.push({x:x, m:ma31[x.ku] || {}}); });
  thu.sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi') || ((+a.ngayGD||99) - (+b.ngayGD||99)) || a.ten.localeCompare(b.ten, 'vi'); });
  var aoa = [o.cot], h = '', soO = o.cot.length, r = function(){ return TT_DONG0 + aoa.length; }, stt = 0, tong = {}, nDiem = [];
  var cong = function(ls){ var c = {}; o.so.forEach(function(j){ c[j] = 0; }); ls.forEach(function(v){ o.so.forEach(function(j){ c[j] += v[j]||0; }); }); return c; };
  var nhom = function(lop, chu, c, f){   /* dòng nhóm: chữ ở cột 2 (gộp cột trước cột số đầu), số cộng ở cột số */
    var dau = Math.min.apply(null, o.so), row = o.cot.map(function(x, j){ return j===1 ? chu : (o.so.indexOf(j)>=0 ? {t:'n', v:c[j], f:f(j)} : ''); });
    h += '<tr class="'+lop+'"><td colspan="'+dau+'">'+coChuHTML(chu)+'</td>'+o.cot.slice(dau).map(function(x, i){ var j = i+dau; return o.so.indexOf(j)>=0 ? '<td class="s">'+tdnTien(c[j])+'</td>' : '<td></td>'; }).join('')+'</tr>';
    aoa.push(row); };
  thu.forEach(function(d){
    var hs = Object.keys(d.H).map(function(k){ return d.H[k]; }).sort(function(a, b){ return ttHoiThu(a.dv)-ttHoiThu(b.dv) || a.dv.localeCompare(b.dv); });
    var tatD = [], soToD = 0, soKD = 0; hs.forEach(function(g){ Object.keys(g.T).forEach(function(k){ soToD++; soKD += g.T[k].ds.length; g.T[k].ds.forEach(function(z){ tatD.push(z); }); }); });
    var rowsD = tatD.map(function(z){ return o.dong(z.x, z.m, 0); }), nD = r(), nHoi = [];
    nhom('diem', 'ĐIỂM GD: '+d.ten.toUpperCase()+(d.tenXa ? ' — '+d.tenXa : '')+'  ('+soToD+' tổ, '+soKD+' khoản)', cong(rowsD), function(j){ return '__D'+j; });
    var iD = aoa.length-1; nDiem.push(nD);
    hs.forEach(function(g){
      var ts = Object.keys(g.T).map(function(k){ return g.T[k]; }).sort(function(a, b){ return String(a.t.ten||'').localeCompare(String(b.t.ten||''), 'vi'); });
      var tatH = []; ts.forEach(function(x){ x.ds.forEach(function(z){ tatH.push(o.dong(z.x, z.m, 0)); }); });
      var nH = r(), nTo = []; nHoi.push(nH);
      nhom('hoi', g.ten+'  ('+ts.length+' tổ, '+tatH.length+' khoản)', cong(tatH), function(j){ return '__H'+j; });
      var iH = aoa.length-1;
      ts.forEach(function(x){ var t = x.t, kh = {}; x.ds.forEach(function(z){ if(z.x.kh) kh[z.x.kh] = 1; });
        var rows = x.ds.sort(function(a, b){ return String(a.x.ten||'').localeCompare(String(b.x.ten||''), 'vi'); }).map(function(z){ return o.dong(z.x, z.m, ++stt); });
        var nT = r(); nTo.push(nT);
        var chu = toLaTT(t) ? 'Vay trực tiếp (không qua tổ)' : (x.ma ? 'Tổ: '+(t.ten||x.ma)+' (Mã '+x.ma+')' : 'Chưa gắn tổ');
        nhom('to', chu+' — '+Object.keys(kh).length+' hộ, '+rows.length+' khoản', cong(rows), function(j){ return 'SUM('+ttCot(j)+(nT+1)+':'+ttCot(j)+(nT+rows.length)+')'; });
        rows.forEach(function(v){ h += '<tr>'+v.map(function(c, j){ return typeof c==='number' && o.so.indexOf(j)>=0 ? '<td class="s">'+tdnTien(c)+'</td>' : '<td'+(j===0 ? ' class="c"' : '')+'>'+coChuHTML(String(c===undefined || c===null ? '' : c))+'</td>'; }).join('')+'</tr>'; aoa.push(v); }); });
      o.so.forEach(function(j){ aoa[iH][j].f = nTo.map(function(n){ return ttCot(j)+n; }).join('+'); });
    });
    o.so.forEach(function(j){ aoa[iD][j].f = nHoi.map(function(n){ return ttCot(j)+n; }).join('+'); });
    o.so.forEach(function(j){ tong[j] = (tong[j]||0) + rowsD.reduce(function(a, v){ return a+(v[j]||0); }, 0); });
  });
  if(!stt) return {ten:o.ten, tieuDe:o.tieuDe, ngang:false, ctChu:'', ngay:'Số liệu đến ngày '+ngayVNsl(skNgayThang(o.L)), aoa:[o.cot, ['', 'Không có']], html:'<div class="bc-rong">Không có.</div>'};
  var rowT = o.cot.map(function(x, j){ return j===1 ? 'TỔNG CỘNG ('+stt+' khoản)' : (o.so.indexOf(j)>=0 ? {t:'n', v:tong[j], f:nDiem.map(function(n){ return ttCot(j)+n; }).join('+')} : ''); });
  var dau = Math.min.apply(null, o.so);
  h += '<tr class="tong"><td colspan="'+dau+'">TỔNG CỘNG ('+stt+' khoản)</td>'+o.cot.slice(dau).map(function(x, i){ var j = i+dau; return o.so.indexOf(j)>=0 ? '<td class="s">'+tdnTien(tong[j])+'</td>' : '<td></td>'; }).join('')+'</tr>';
  aoa.push(rowT);
  return {ten:o.ten, tieuDe:o.tieuDe, ngang:o.ngang, ctChu:'', ngay:'Số liệu đến ngày '+ngayVNsl(skNgayThang(o.L))+' · đơn vị: đồng', aoa:aoa,
    html:TT_CSS+'<table class="bc-bang luoi tt-bang"><thead><tr>'+o.cot.map(function(c){ return '<th>'+coChuHTML(c)+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>'+
      '<div class="bc-ghi">Chia theo Điểm GD › Hội › Tổ; dòng nhóm là số cộng của nhóm. Chương trình ghi tên viết tắt chuẩn hệ thống. Cột Ghi chú để trống — cán bộ ghi thực trạng / đề xuất.</div>'};
}
function ttNV(x, m){ var n = x.nguon || m.nguon; return SL_NGUON[n] || n || ''; }
function ttKHD(){ return ttSaoKe({ten:'3 Tháng KHĐ', tieuDe:'SAO KÊ MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG', L:'khd', ngang:true,
  cot:['STT','Tên khách hàng','Số khế ước','Chương trình','Ngày giải ngân đầu tiên','Ngày đến hạn gốc','Ngày GD gần nhất','Tổng dư nợ','Dư nợ quá hạn','Lãi tồn chưa thu','Ghi chú (thực trạng / đề xuất)'], so:[7, 8, 9],
  dong:function(x, m, i){ return [i, x.ten||m.ten||'', x.ku||'', ctHT(x.ct||m.ct, m.ku ? m : x), ngayVNsl(x.ngn||m.ngn), ngayVNsl(skHL(x)||skHL(m)), ngayVNsl(x.ngdg||m.ngdg), x.dn||0, x.qh||0, laiTon(x)||laiTon(m)||0, '']; }}); }
function ttQH(){ return ttSaoKe({ten:'Nợ QH', tieuDe:'SAO KÊ DANH SÁCH NỢ QUÁ HẠN', L:'nqh', ngang:false,
  cot:['STT','Tên khách hàng','Số khế ước','Dư nợ quá hạn','Ngày chuyển quá hạn','Nguồn vốn','Chương trình','Ghi chú (thực trạng / đề xuất)'], so:[3],
  dong:function(x, m, i){ return [i, x.ten||m.ten||'', x.ku||'', x.qh||0, ngayVNsl(x.ncqh||m.ncqh), ttNV(x, m), ctHT(x.ct||m.ct, m.ku ? m : x), '']; }}); }
function ttKN(){ return ttSaoKe({ten:'Nợ khoanh', tieuDe:'DANH SÁCH NỢ KHOANH', L:'nk', ngang:false,
  cot:['STT','Tên khách hàng','Số khế ước','Dư nợ khoanh','Ngày hiệu lực khoanh','Hạn khoanh','Nguồn vốn','Chương trình','Ghi chú (thực trạng / đề xuất)'], so:[3],
  dong:function(x, m, i){ return [i, x.ten||m.ten||'', x.ku||'', x.kn||0, ngayVNsl(x.nhl||m.nhl), ngayVNsl(x.nhh||m.nhh), ttNV(x, m), ctHT(x.ct||m.ct, m.ku ? m : x), '']; }}); }

/* ---------- vào từ skBaoCao ---------- */
function ttBaoCao(k){
  if(!skMau31()) return skCan31(SK_BC.find(function(b){ return b.k===k; }).ten);
  var ds = ttDuLieu();
  if(!ds.length) return [{ten:'KQGD', tieuDe:'KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH', ngang:true, ctChu:'', ngay:'', aoa:[['Không có tổ trong phạm vi']], html:'<div class="bc-rong">Không có tổ trong phạm vi.</div>'}];
  var diem = ds.map(ttDiemSheet);
  if(k==='kqgd') return diem;
  var xs = ttXaGom(ds);   /* thứ tự sheet như file tổng hợp anh dùng */
  return [ttTongHop(ds, xs), ttTheoXa(xs)].concat(xs.map(ttTheoHoi), diem, xs.map(ttXaSheet), [ttKHD(), ttQH(), ttKN(), ttGhiChu(ds)]);
}
