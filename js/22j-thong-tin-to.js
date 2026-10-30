/* ==========================================================
   3.259 → 3.263 (anh chốt 18–19/10) — 📒 Sao kê › nhóm "Thông tin tổ" (theo file tổng hợp anh dùng hằng tháng):
   - KQGD: mỗi điểm GD 1 trang / sheet, trang toàn xã liền sau các điểm của xã; cột như file + cột thêm 13/GDX (Excel)
   - THHD (3.263, thay Bộ thông tin tổ): tình hình hoạt động 1 trang A4 dọc, triệu đồng, chi tiết theo cấp chọn
   - 3 sao kê chọn riêng (Nợ QH · Nợ khoanh · 3 tháng KHĐ), chia Điểm GD › Hội › Tổ, dòng nhóm mang số cộng
   - số liệu: kỳ ngày có Mẫu 31 ngày đó → số ngày; không → chốt cuối tháng (ttChuanBi); điểm tổ tháng theo BC0437
   - In: cột chính; Excel: đồng, dòng cộng + tỷ lệ là CÔNG THỨC
   ========== */
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
  '.tt-dv{text-align:right;font-style:italic;font-size:9pt;margin:0 0 2px}.tt-h3{font-size:11pt;margin:10px 0 3px}.tt-ghi p{margin:2px 0}.tt-ghi p.b{font-weight:bold;margin-top:8px}</style>';

/* ---------- số liệu 1 tổ (theo món Mẫu 31) — dùng cho KQGD ---------- */
var TT_SO = ['kh','hdn','cv','tn','dn','qh','kn','tl','lt','t105','khdKH','khdDn','knKH','dhCuoi','dhPK','dhKC'];
function ttSoMoi(){ var s = {}; TT_SO.forEach(function(f){ s[f] = 0; }); s.soTo = 0; s._kh = {}; s._hdn = {}; s._khd = {}; s._kn = {}; s.pkUoc = false; return s; }
function ttCong(a, s){ TT_SO.forEach(function(f){ if(f!=='kh' && f!=='hdn' && f!=='khdKH' && f!=='knKH') a[f] += s[f]||0; });
  ['_kh','_hdn','_khd','_kn'].forEach(function(f){ Object.keys(s[f]).forEach(function(k){ a[f][k] = 1; }); }); a.soTo += s.soTo||0; if(s.pkUoc) a.pkUoc = true; return a; }
function ttChot(s){ s.kh = Object.keys(s._kh).length; s.hdn = Object.keys(s._hdn).length; s.khdKH = Object.keys(s._khd).length; s.knKH = Object.keys(s._kn).length; return s; }
function ttNgu(K){   /* mốc ngày: ngày số liệu, tháng sau */
  var sau = kyLui(K.thang, 1); return {ns:K.ngay, tu:sau+'-01', den:tdnCuoiKy(sau)};
}
function ttMon(o, s, N, khd){   /* cộng 1 món vào s (s = tổ hoặc chương trình); khách tính theo mã KH (gộp được nhiều tổ) */
  if(!o.ku) return;
  var dn = o.dn||0, qh = o.qh||0, kn = o.kn||0, lt = laiTon(o);
  if(dn>0) s._hdn[o.kh] = 1;   /* 3.262: hộ đang có dư nợ (Số hộ = tổ viên — đếm ở ttDuLieu) */
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
  (kcLap(K)||[]).forEach(function(o){ if(o.kh) (lap[o.kh] = lap[o.kh] || []).push(o); });   /* 3.409: giữ dòng lặp để cộng sổ */   /* 3.382: qua kho chuẩn */
  var D0 = {}, ds = [];
  Object.keys(T).map(function(m){ return T[m]; }).filter(function(t){ return pvLoc(C, t); }).forEach(function(t){
    var kd = t.khoaDiem || ttDiemTen(t), d = D0[kd];
    if(!d){ d = D0[kd] = {khoa:kd, ten:ttDiemTen(t), tenXa:t.tenXa||'', ngayGD:t.ngayGD||'', H:{}, ct:{}, s:ttSoMoi()}; ds.push(d); }
    var dv = String(t.dv||''), h = d.H[dv] = d.H[dv] || {dv:dv, ten:ttHoiTen(dv), to:[], ct:{}, s:ttSoMoi()};
    var s = ttSoMoi(), kh105 = {};
    kcTo(K, t.ma).dong.forEach(function(o){
      if(o.kh) s._kh[o.kh] = 1;   /* 3.262 (anh chốt): Số hộ = tổ viên của tổ (như tab Tổ), kể cả hộ chỉ gửi TK 105 */
      ttMon(o, s, N, khd);
      if(o.kh){ kh105[o.kh] = slT105Them(kh105, o, o.kh); (lap[o.kh]||[]).forEach(function(x){ kh105[o.kh] = slT105Them(kh105, x, o.kh); }); } });   /* 3.409 QT-C-01 cộng sổ */
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
var TT_K = null, TT_BC37 = null, TT_NGAY = false;   /* số liệu dùng (theo ngày / chốt tháng) + BC0437 cùng tháng — nạp ở ttChuanBi trước khi lập */
function ttChuanBi(){   /* 3.262 (anh chốt): kỳ là ngày và có Mẫu 31 đúng ngày đó → số liệu ngày; không có → Mẫu 31 chốt cuối tháng */
  var th = SK_K.thang, K0 = SK_K; TT_NGAY = K0.ky.length>7 && !!(K0.B && K0.B.nguon && K0.B.nguon.hstd===K0.ky);
  return (SK_K.ky===th || TT_NGAY ? Promise.resolve(SK_K) : KHO.nap(th).catch(function(){ return K0; })).then(function(K){ TT_K = K && K.B ? K : K0;
    return typeof ktNapBC==='function' ? ktNapBC(th).catch(function(){ return null; }) : null; })
    .then(function(r){ TT_BC37 = r && r.k37 && slThang(r.k37.e.ky)===th ? r.k37 : null; });
}
function ttNgayL(L){ var n = SK_K.B && SK_K.B.nguon && SK_K.B.nguon[L], e = n && KHO.bang(L, n); return e ? (e.ngay || (n.length>7 ? n : tdnCuoiKy(n))) : skNgayThang(L); }   /* ngày thật của file L đang dùng */
function ttCham(ma){ var b = TT_BC37 && TT_BC37.theoTo[ma], d = b ? b.diemTo : ''; return {d:(d===undefined || d===null || d==='') ? '' : +d, xl:b ? b.xepLoai||'' : ''}; }
/* cột: [mã, tiêu đề, kiểu (c chữ · n đếm · t tiền · p tỷ lệ · d điểm), in (1 = có trong bản in), [tử, mẫu] cho tỷ lệ] */
var TT_COT = [['stt','STT','c',1], ['ten','Tên tổ (Tổ trưởng)','c',1], ['ap','Ấp/Thôn','c',1], ['ma','Mã tổ','c',1], ['sdt','SĐT Tổ trưởng','c',0], ['pho','Tên Tổ phó','c',0],
  ['kh','Số hộ','n',1], ['hdn','Số hộ đang có dư nợ','n',1], ['dn','Dư nợ','t',1], ['t105','Tiết kiệm - Số dư','t',1], ['qh','Nợ quá hạn','t',1], ['tlqh','Tỷ lệ NQH (%)','p',1,['qh','dn']], ['lt','Lãi tồn chưa thu','t',1],
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
  return {html:TT_CSS+ttDV('nghìn đồng')+'<table class="bc-bang luoi tt-bang tt-in">'+dau+'<tbody>'+h+'</tbody></table>', aoa:aoa};
}
function ttDV(chu){ return chu ? '<div class="tt-dv">Đơn vị tính: '+chu+'</div>' : ''; }   /* 3.262 (anh chốt): đơn vị tính góc phải trên bảng */
function ttNgayChu(){ var K = SK_K; if(K.ky.length>7) return 'Số liệu ngày '+ngayVNsl(K.ky)+' (Mẫu 31 theo ngày)'; return 'Chốt cuối tháng '+kyVN(K.thang).replace(/^T/, '')+' (số liệu đến ngày '+ngayVNsl(K.ngay)+')'; }
var TT_GHI_IN = 'Bản in: các cột chính; Excel: đồng, đủ cột (thêm SĐT, tổ phó, điểm lũy kế, doanh số tháng, lãi đã nộp, nợ đến hạn — theo 13/GDX).';
function ttDiemSheet(d){
  var stt = 0, nhom = d.hoi.map(function(g){ return {nhan:g.ten+' ('+g.s.soTo+' tổ)', s:g.s, ds:g.to.map(function(x){ return {t:x.t, s:x.s, cd:ttCham(x.t.ma), stt:toLaTT(x.t) ? 0 : ++stt}; })}; });
  var B = ttBangTo(TT_COT, nhom, 'CỘNG ('+d.s.soTo+' tổ)', d.s);
  return {ten:ttTenSheet(d.ten), tieuDe:'KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH '+d.ten.toUpperCase(), ngang:true, ctChu:'',
    dvEx:'Đơn vị tính: đồng', ngay:'Xã: '+(d.tenXa||'')+(d.ngayGD ? ' · ngày GDXA '+d.ngayGD : '')+' · '+ttNgayChu(), aoa:B.aoa,
    html:'<div class="bc-tom">'+d.s.soTo+' tổ · '+d.s.kh+' hộ ('+d.s.hdn+' hộ đang có dư nợ) · dư nợ <b>'+tdnTien(d.s.dn)+'</b> · quá hạn <b>'+tdnTien(d.s.qh)+'</b> · khoanh <b>'+tdnTien(d.s.kn)+'</b> · KHĐ 3 tháng <b>'+tdnTien(d.s.khdDn)+'</b> đồng</div>'+B.html+'<div class="bc-ghi">'+TT_GHI_IN+' Dòng tô đỏ nhạt = tổ dư nợ 0.</div>'};
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
    dvEx:'Đơn vị tính: đồng', ngay:'Gồm: '+x.diem.map(function(d){ return d.ten+(d.ngayGD ? ' (ngày GDXA '+d.ngayGD+')' : ''); }).join(' | ')+' · '+ttNgayChu(), aoa:B.aoa, html:B.html+'<div class="bc-ghi">'+TT_GHI_IN+'</div>'};
}
/* ---------- 3.263 (anh chốt 19/10): 📊 TÌNH HÌNH HOẠT ĐỘNG (THHD) — thay "Bộ thông tin tổ": 1 trang A4 dọc, triệu đồng;
   tùy cấp chọn: PGD (xã ├ điểm, theo hội) · xã (theo điểm, theo hội) · điểm (theo hội, tổ cần lưu ý) · hội (từng tổ) · tổ (hộ cần lưu ý);
   cấp nào cũng có: chỉ tiêu chính, theo chương trình, chấm điểm tổ (BC0437 tháng) ---------- */
function ttDemXL(ds){ var r = {tot:0, kha:0, tb:0, yeu:0}; ds.forEach(function(z){ var x = slChuan(ttCham(z.t.ma).xl); if(/^tot/.test(x)) r.tot++; else if(/^kha/.test(x)) r.kha++; else if(/trung binh|^tb/.test(x)) r.tb++; else if(/^yeu/.test(x)) r.yeu++; }); return r; }
function ttDTBTo(ds){ var a = ds.map(function(z){ return ttCham(z.t.ma).d; }).filter(function(v){ return v!==''; }); return a.length ? Math.round(a.reduce(function(p, v){ return p+v; }, 0)/a.length*100)/100 : ''; }
function ttRR(s){ return ttTyLe((s.khdDn||0)+(s.kn||0), s.dn||0); }
function ttTr(v){ return soTr(v); }   /* triệu đồng, 2 số lẻ */
/* bảng THHD: cột [tiêu đề, kiểu (c · n · tr triệu · p %), lấy(dòng)] ; dòng = {v:{…số}, nhan, lop} */
var TT_TH_COT = [['Đơn vị','c',function(r){ return r.nhan; }], ['Số tổ','n',function(r){ return r.s.soTo; }], ['Số hộ','n',function(r){ return r.s.kh; }], ['Hộ có dư nợ','n',function(r){ return r.s.hdn; }],
  ['Dư nợ','tr',function(r){ return r.s.dn; }], ['Tiết kiệm','tr',function(r){ return r.s.t105; }], ['Nợ quá hạn','tr',function(r){ return r.s.qh; }], ['% QH','p',function(r){ return ttTyLe(r.s.qh, r.s.dn); }],
  ['Nợ khoanh','tr',function(r){ return r.s.kn; }], ['KHĐ 3 tháng','tr',function(r){ return r.s.khdDn; }], ['% rủi ro','p',function(r){ return ttRR(r.s); }]];
function ttTHBang(tieu, cot, dong, aoa){
  var fm = function(c, v){ return c[1]==='tr' ? ttTr(v) : c[1]==='p' ? ttPT(v) : c[1]==='n' ? (v ? String(v) : '') : coChuHTML(String(v===undefined || v===null ? '' : v)); };
  aoa.push([], [tieu], cot.map(function(c){ return c[0]; }));
  dong.forEach(function(r){ aoa.push(cot.map(function(c){ var v = c[2](r); return c[1]==='tr' ? Math.round(v||0) : v; })); });
  return '<h3 class="tt-h3">'+coChuHTML(tieu)+'</h3><table class="bc-bang luoi tt-bang tt-th"><thead><tr>'+cot.map(function(c){ return '<th>'+coChuHTML(c[0])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    dong.map(function(r){ return '<tr'+(r.lop ? ' class="'+r.lop+'"' : '')+'>'+cot.map(function(c){ return '<td'+(c[1]!=='c' ? ' class="s"' : '')+'>'+fm(c, c[2](r))+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table>';
}
function ttTHHD(){
  var C = skCH(), K = SK_K, ds = ttDuLieu(), cap = C.to ? 'to' : C.hoi ? 'hoi' : C.diem ? 'diem' : C.xa ? 'xa' : 'pgd';
  var pv = pvChu(C, K), aoa = [], h = '';
  if(!ds.length) return {ten:'THHD', tieuDe:'TÌNH HÌNH HOẠT ĐỘNG TÍN DỤNG', ngang:false, ctChu:'', ngay:ttNgayChu(), aoa:[['Không có tổ trong phạm vi']], html:'<div class="bc-rong">Không có tổ trong phạm vi.</div>'};
  var xs = ttXaGom(ds), T = ttSoMoi(), to = [], N = ttNgu(K), khd = {}, ct = {};
  ds.forEach(function(d){ ttCong(T, d.s); d.hoi.forEach(function(g){ g.to.forEach(function(z){ to.push({t:z.t, s:z.s, d:d, g:g}); }); }); }); ttChot(T);
  slKHD(K.B).forEach(function(o){ if(o.ku) khd[o.ku] = 1; });
  to.forEach(function(z){ kcTo(K, z.t.ma).dong.forEach(function(o){ if(!o.ku) return; var c = ctHT(o.ct, o) || '?'; ttMon(o, ct[c] = ct[c] || ttSoMoi(), N, khd); }); });
  Object.keys(ct).forEach(function(c){ ttChot(ct[c]); });
  /* ① chỉ tiêu chính — 4 cột (chỉ tiêu, giá trị) × 2 */
  var toT = to.filter(function(z){ return !toLaTT(z.t); }), xl = ttDemXL(toT), dtb = ttDTBTo(toT);
  var kp = [['Số tổ TK&VV', T.soTo, 'Dư nợ', ttTr(T.dn)], ['Số hộ (tổ viên)', T.kh, 'Tiết kiệm tổ viên (TK 105)', ttTr(T.t105)],
    ['Hộ đang có dư nợ', T.hdn, 'Dư nợ bình quân / hộ', T.hdn ? ttTr(T.dn/T.hdn) : ''],
    ['Nợ quá hạn', ttTr(T.qh)+(T.qh ? ' ('+ttPT(ttTyLe(T.qh, T.dn))+'%)' : ''), 'Nợ khoanh', ttTr(T.kn)+(T.kn ? ' ('+T.knKH+' hộ · '+ttPT(ttTyLe(T.kn, T.dn))+'%)' : '')],
    ['KHĐ 3 tháng', ttTr(T.khdDn)+(T.khdDn ? ' ('+T.khdKH+' hộ · '+ttPT(ttTyLe(T.khdDn, T.dn))+'%)' : ''), 'Tỷ lệ rủi ro (KHĐ + khoanh)', ttPT(ttRR(T))+'%'],
    ['Lãi tồn chưa thu', ttTr(T.lt), 'Lãi đã thu trong tháng', ttTr(T.tl)],
    ['Cho vay trong tháng', ttTr(T.cv), 'Thu nợ trong tháng', ttTr(T.tn)],
    ['Nợ đến hạn tháng sau', ttTr(T.dhPK+T.dhKC), 'Quá hạn hợp đồng chưa chuyển QH', ttTr(T.dhCuoi)]];
  if(TT_BC37) kp.push(['Chấm điểm tổ tháng '+K.thang.slice(5, 7), 'Tốt '+xl.tot+' · Khá '+xl.kha+' · TB '+xl.tb+' · Yếu '+xl.yeu, 'Điểm bình quân', dtb==='' ? '' : (+dtb).toLocaleString('vi-VN')]);
  h += '<h3 class="tt-h3">1. Chỉ tiêu chính</h3><table class="bc-bang luoi tt-bang tt-kpi"><tbody>'+kp.map(function(r){ return '<tr><td>'+coChuHTML(r[0])+'</td><td class="s">'+coChuHTML(String(r[1]))+'</td><td>'+coChuHTML(r[2])+'</td><td class="s">'+coChuHTML(String(r[3]))+'</td></tr>'; }).join('')+'</tbody></table>';
  aoa.push(['1. CHỈ TIÊU CHÍNH (triệu đồng)']); kp.forEach(function(r){ aoa.push(r); });
  /* ② chi tiết theo cấp */
  var so = 2, dong, ten;
  var tong = {nhan:'Cộng', s:T, lop:'tong'};
  if(cap==='pgd'){ dong = []; xs.forEach(function(x){ dong.push({nhan:x.ten, s:x.s, lop:'hoi'}); x.diem.forEach(function(d, i){ dong.push({nhan:'  '+(i===x.diem.length-1 ? '└ ' : '├ ')+d.ten, s:d.s}); }); });
    h += ttTHBang(so+++'. Theo xã, điểm giao dịch', TT_TH_COT, dong.concat([tong]), aoa); }
  if(cap==='xa'){ h += ttTHBang(so+++'. Theo điểm giao dịch', TT_TH_COT, ds.map(function(d){ return {nhan:d.ten+(d.ngayGD ? ' (ngày '+d.ngayGD+')' : ''), s:d.s}; }).concat([tong]), aoa); }
  if(cap==='pgd' || cap==='xa' || cap==='diem'){   /* theo hội (gộp các điểm / xã trong phạm vi) */
    var H = {}; ds.forEach(function(d){ d.hoi.forEach(function(g){ var x = H[g.dv] = H[g.dv] || {dv:g.dv, nhan:g.ten, s:ttSoMoi()}; ttCong(x.s, g.s); }); });
    var hs = Object.keys(H).map(function(k){ ttChot(H[k].s); return H[k]; }).sort(function(a, b){ return ttHoiThu(a.dv)-ttHoiThu(b.dv); });
    h += ttTHBang(so+++'. Theo hội đoàn thể', TT_TH_COT, hs.concat([tong]), aoa); }
  if(cap==='hoi'){ var cotTo = [['Tổ (tổ trưởng)','c',function(r){ return r.nhan; }]].concat(TT_TH_COT.slice(2), [['Xếp loại','c',function(r){ return r.xl||''; }]]);
    h += ttTHBang(so+++'. Từng tổ', cotTo, to.sort(function(a, b){ return b.s.dn-a.s.dn; }).map(function(z){ return {nhan:toLaTT(z.t) ? 'Vay trực tiếp' : (z.t.ten||z.t.ma)+(z.t.tenThon ? ' · '+z.t.tenThon : ''), s:z.s, xl:ttCham(z.t.ma).xl, lop:!toLaTT(z.t) && !z.s.dn ? 'to0' : ''}; }).concat([tong]), aoa); }
  if(cap==='diem'){   /* tổ cần lưu ý: có QH / khoanh / KHĐ, dư nợ 0, xếp loại TB / Yếu */
    var lu = toT.map(function(z){ var c = ttCham(z.t.ma), x = slChuan(c.xl), ly = [];
      if(z.s.qh) ly.push('QH'); if(z.s.kn) ly.push('khoanh'); if(z.s.khdDn) ly.push('KHĐ'); if(!z.s.dn) ly.push('dư nợ 0'); if(/trung binh|^tb|^yeu/.test(x)) ly.push(c.xl);
      return ly.length ? {nhan:(z.t.ten||z.t.ma)+' · '+z.g.ten.replace(/^Hội |^Đoàn /, ''), s:z.s, ly:ly.join(', ')} : null; }).filter(Boolean).sort(function(a, b){ return ttRR(b.s)-ttRR(a.s); });
    if(lu.length) h += ttTHBang(so+++'. Tổ cần lưu ý ('+lu.length+' / '+toT.length+' tổ)', [['Tổ · hội','c',function(r){ return r.nhan; }], TT_TH_COT[2], TT_TH_COT[4], TT_TH_COT[6], TT_TH_COT[8], TT_TH_COT[9], TT_TH_COT[10], ['Lưu ý','c',function(r){ return r.ly; }]], lu, aoa); }
  if(cap==='to'){   /* hộ cần lưu ý trong tổ */
    var KH = {}; to.forEach(function(z){ kcTo(K, z.t.ma).dong.forEach(function(o){ if(!o.ku) return; var x = KH[o.kh] = KH[o.kh] || {ten:o.ten||o.kh, dn:0, qh:0, kn:0, lt:0, khd:0, ct:{}}; x.dn += o.dn||0; x.qh += o.qh||0; x.kn += o.kn||0; x.lt += laiTon(o); if(khd[o.ku]) x.khd += o.dn||0; if((o.dn||0)>0) x.ct[ctHT(o.ct, o)] = 1; }); });
    var hk = Object.keys(KH).map(function(k){ return KH[k]; }).filter(function(x){ return x.qh || x.kn || x.khd || x.lt>0; }).sort(function(a, b){ return (b.qh+b.kn+b.khd)-(a.qh+a.kn+a.khd) || b.lt-a.lt; });
    var cotH = [['Hộ','c',function(r){ return r.ten; }], ['Chương trình','c',function(r){ return Object.keys(r.ct).join(', '); }], ['Dư nợ','tr',function(r){ return r.dn; }], ['Nợ quá hạn','tr',function(r){ return r.qh; }],
      ['Nợ khoanh','tr',function(r){ return r.kn; }], ['KHĐ 3 tháng','tr',function(r){ return r.khd; }], ['Lãi tồn','tr',function(r){ return r.lt; }]];
    h += hk.length ? ttTHBang(so+++'. Hộ cần lưu ý ('+hk.length+' / '+T.kh+' hộ)', cotH, hk, aoa) : '<h3 class="tt-h3">'+(so++)+'. Hộ cần lưu ý</h3><p>Không có hộ quá hạn, khoanh, KHĐ hay còn lãi tồn.</p>'; }
  /* theo chương trình */
  var cs = Object.keys(ct).sort(function(a, b){ return ct[b].dn-ct[a].dn; }).map(function(c){ return {nhan:c, s:ct[c]}; });
  h += ttTHBang(so+++'. Theo chương trình', [['Chương trình','c',function(r){ return r.nhan; }], ['Hộ có dư nợ','n',function(r){ return r.s.hdn; }], TT_TH_COT[4], ['Tỷ trọng (%)','p',function(r){ return ttTyLe(r.s.dn, T.dn); }],
    TT_TH_COT[6], TT_TH_COT[8], TT_TH_COT[9], ['Cho vay tháng','tr',function(r){ return r.s.cv; }], ['Thu nợ tháng','tr',function(r){ return r.s.tn; }]], cs, aoa);
  return {ten:'THHD', tieuDe:'TÌNH HÌNH HOẠT ĐỘNG TÍN DỤNG', ngang:false, ctChu:'', ngay:ttNgayChu(), dvEx:'Đơn vị tính: triệu đồng', aoa:aoa,
    html:TT_CSS+'<style>.tt-kpi td{padding:2px 5px}.tt-kpi td:nth-child(odd){width:30%}.tt-th td,.tt-th th{padding:1px 3px}</style>'+ttDV('triệu đồng')+h+
      '<div class="bc-ghi">'+coChuHTML(pv)+' · '+(TT_NGAY ? 'Mẫu 31 theo ngày' : 'Mẫu 31 chốt tháng')+'. Số hộ = tổ viên; hộ có dư nợ = dư nợ > 0; tỷ lệ rủi ro = (KHĐ 3 tháng + khoanh) / dư nợ.'+(TT_BC37 ? '' : ' Chưa nạp BC0437 tháng này — chưa có chấm điểm tổ.')+'</div>'};
}

/* ---------- 3 sao kê chia Điểm GD › Hội › Tổ (dòng nhóm mang số cộng) ---------- */
function ttSaoKe(o){   /* o = {ten, tieuDe, L, cot, dong(x, stt) → mảng ô, so:[cột cộng]} */
  var K = SK_K, T = K.to || {}, ma31 = {};
  if(!(K.B.nguon && K.B.nguon[o.L]) && !KHO.bang(o.L, K.thang) && o.L!=='khd') return {ten:o.ten, tieuDe:o.tieuDe, ngang:false, ctChu:'', ngay:'Tháng '+kyVN(K.thang), aoa:[['Chưa nạp file']], html:'<div class="bc-rong">Chưa nạp file '+coChuHTML(slLoai(o.L).ten)+' tháng '+kyVN(K.thang)+'.</div>'};
  (K.hs||[]).forEach(function(x){ if(x.ku && !ma31[x.ku]) ma31[x.ku] = x; });
  var ds = (o.L==='khd' ? slKHD(K.B) : (kcBang(K, o.L)||[])).filter(skTrongPV);
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
  if(!stt) return {ten:o.ten, tieuDe:o.tieuDe, ngang:false, ctChu:'', ngay:'Số liệu đến ngày '+ngayVNsl(ttNgayL(o.L)), aoa:[o.cot, ['', 'Không có']], html:'<div class="bc-rong">Không có.</div>'};
  var rowT = o.cot.map(function(x, j){ return j===1 ? 'TỔNG CỘNG ('+stt+' khoản)' : (o.so.indexOf(j)>=0 ? {t:'n', v:tong[j], f:nDiem.map(function(n){ return ttCot(j)+n; }).join('+')} : ''); });
  var dau = Math.min.apply(null, o.so);
  h += '<tr class="tong"><td colspan="'+dau+'">TỔNG CỘNG ('+stt+' khoản)</td>'+o.cot.slice(dau).map(function(x, i){ var j = i+dau; return o.so.indexOf(j)>=0 ? '<td class="s">'+tdnTien(tong[j])+'</td>' : '<td></td>'; }).join('')+'</tr>';
  aoa.push(rowT);
  return {ten:o.ten, tieuDe:o.tieuDe, ngang:o.ngang, ctChu:'', ngay:'Số liệu đến ngày '+ngayVNsl(ttNgayL(o.L)), dvEx:'Đơn vị tính: đồng', aoa:aoa,
    html:TT_CSS+ttDV('đồng')+'<table class="bc-bang luoi tt-bang"><thead><tr>'+o.cot.map(function(c){ return '<th>'+coChuHTML(c)+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>'+
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
  if(k==='thhd') return [ttTHHD()];   /* 3.263: thay Bộ thông tin tổ */
  if(k==='tqh') return [ttQH()]; if(k==='tkn') return [ttKN()]; if(k==='tkhd') return [ttKHD()];   /* 3.262 (anh chốt): 3 sao kê chọn riêng */
  var ds = ttDuLieu();
  if(!ds.length) return [{ten:'KQGD', tieuDe:'KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH', ngang:true, ctChu:'', ngay:'', aoa:[['Không có tổ trong phạm vi']], html:'<div class="bc-rong">Không có tổ trong phạm vi.</div>'}];
  var xs = ttXaGom(ds);   /* 3.262 (anh chốt): KQGD toàn xã đứng liền sau các điểm GD của xã (như file tổng hợp) */
  return [].concat.apply([], xs.map(function(x){ return x.diem.map(ttDiemSheet).concat([ttXaSheet(x)]); }));
}
