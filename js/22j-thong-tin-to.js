/* ==========================================================
   3.259 (anh chốt 18/10) — 📒 BỘ THÔNG TIN TỔ (tab con Sao kê, nhóm "Thông tin tổ"): theo file tổng hợp anh dùng hằng tháng
   ("Thông tin tổ cơ bản") + Mẫu 13/GDX bản mới (KQGD tại điểm GD có thêm doanh số, lãi đã nộp, nợ đến hạn).
   Đợt này: KQGD từng điểm GD · 3 tháng KHĐ · Nợ quá hạn · Nợ khoanh. Chấm điểm tổ (tháng, lũy kế), THHD theo xã / hội: làm sau.
   - phạm vi + kỳ = bộ chọn chung của tab Sao kê; số liệu Mẫu 31 + 3 file tháng (KHĐ, quá hạn, khoanh) + Danh sách tổ (SĐT, tổ phó)
   - KQGD: mỗi điểm GD 1 trang / 1 sheet; dòng Hội (cộng) → các tổ (dư nợ lớn trước) → dòng theo chương trình của hội; cuối: CỘNG + theo chương trình
   - 3 sao kê: chia Điểm GD › Hội › Tổ, dòng nhóm mang số cộng (như file mẫu)
   - In: nghìn đồng (như 13/GDX); Excel: đồng, dòng cộng + tỷ lệ là CÔNG THỨC (sửa số trong file thì tổng tự đổi)
   ========================================================== */
var TT_DONG0 = 5;   /* skExcel chèn 4 dòng đầu (tiêu đề, phạm vi, ngày, trống) → dòng aoa[0] là dòng 5 của sheet */
var TT_HOI_THU = ['11', '12', '13', '14'];
function ttHoiThu(dv){ dv = String(dv||''); var i = TT_HOI_THU.indexOf(dv); return i>=0 ? i : (dv==='99' ? 9 : 5); }
function ttHoiTen(dv){ return String(dv)==='99' ? 'Cho vay trực tiếp' : (tdnHoi(dv) || 'Chưa rõ hội'); }
function ttCot(j){ var s = ''; j++; while(j>0){ var m = (j-1)%26; s = String.fromCharCode(65+m)+s; j = (j-m-1)/26; } return s; }
function ttTenSheet(s){ return String(s||'').replace(/[:\\\/?*\[\]]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 28) || 'Sheet'; }
function ttNghin(v){ return v ? tdnTien(Math.round(v/1000)) : ''; }
function ttPT(v){ return v ? v.toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2}) : ''; }
function ttTyLe(a, b){ return b ? Math.round(a/b*10000)/100 : 0; }
function ttDiemTen(t){ return t && t.tenDiem ? String(t.tenDiem).trim() : '(chưa rõ điểm GD)'; }
var TT_CSS = '<style>.tt-bang tr.diem td{background:#dfe7f0;font-weight:bold}.tt-bang tr.hoi td{background:#eef3e8;font-weight:bold}.tt-bang tr.to td{background:#f7f7f2;font-weight:bold}'+
  '.tt-bang tr.ct td{font-style:italic}.tt-bang tr.to0 td{background:#fde2e2}.tt-bang th{text-align:center;vertical-align:middle}</style>';

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
      if(o.ku){ var c = ctHT(o.ct, o) || '?'; ttMon(o, h.ct[c] = h.ct[c] || ttSoMoi(), N, khd); ttMon(o, d.ct[c] = d.ct[c] || ttSoMoi(), N, khd); }
      var v = Math.max(o.t105||0, lap[o.kh]||0); if(o.kh && v>(kh105[o.kh]||0)) kh105[o.kh] = v; });
    Object.keys(kh105).forEach(function(k){ s.t105 += kh105[k]; });
    s.soTo = toLaTT(t) ? 0 : 1; ttChot(s);
    h.to.push({t:t, s:s}); ttCong(h.s, s); ttCong(d.s, s);
  });
  ds.forEach(function(d){
    d.hoi = Object.keys(d.H).map(function(k){ return d.H[k]; }).sort(function(a, b){ return ttHoiThu(a.dv)-ttHoiThu(b.dv) || a.dv.localeCompare(b.dv); });
    d.hoi.forEach(function(h){ ttChot(h.s); Object.keys(h.ct).forEach(function(c){ ttChot(h.ct[c]); });
      h.to.sort(function(a, b){ return (toLaTT(a.t) - toLaTT(b.t)) || (b.s.dn - a.s.dn) || String(a.t.ten||'').localeCompare(String(b.t.ten||''), 'vi'); }); });
    ttChot(d.s); Object.keys(d.ct).forEach(function(c){ ttChot(d.ct[c]); });
  });
  return ds.sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi') || ((+a.ngayGD||99) - (+b.ngayGD||99)) || a.ten.localeCompare(b.ten, 'vi'); });
}

/* ---------- KQGD tại điểm GD ---------- */
var TT_KQ_COT = ['STT','Tên tổ trưởng','Ấp','Mã tổ','SĐT tổ trưởng','Tổ phó','Số khách hàng','Doanh số cho vay','Doanh số thu nợ','Tổng dư nợ',
  'Nợ quá hạn','Tỷ lệ NQH (%)','Nợ khoanh','Tỷ lệ khoanh (%)','Tiền lãi đã nộp','Lãi tồn','Số dư tiền gửi tổ viên','Số hộ KHĐ (3 tháng)','Dư nợ KHĐ (3 tháng)','Tỷ lệ KHĐ/Dư nợ (%)',
  'Số hộ khoanh nợ','Nợ đến hạn kỳ cuối chưa trả','Nợ đến hạn tháng sau — Phân kỳ','Nợ đến hạn tháng sau — Kỳ cuối'];
var TT_KQ_F = [null,null,null,null,null,null,'kh','cv','tn','dn','qh',null,'kn',null,'tl','lt','t105','khdKH','khdDn',null,'knKH','dhCuoi','dhPK','dhKC'];
var TT_KQ_TL = {11:[10, 9], 13:[12, 9], 19:[18, 9]};   /* cột tỷ lệ: [tử, mẫu] */
function ttKQDong(s, dau){   /* dau = 6 ô đầu → mảng 24 ô (số đồng, tỷ lệ %) */
  return dau.concat(TT_KQ_F.slice(6).map(function(f, i){ var j = i+6, tl = TT_KQ_TL[j];
    if(tl) return ttTyLe(s[TT_KQ_F[tl[0]]], s[TT_KQ_F[tl[1]]]);
    return s[f]||0; }));
}
function ttKQBang(d){
  var aoa = [TT_KQ_COT], h = '', soO = TT_KQ_COT.length, r = function(){ return TT_DONG0 + aoa.length; };   /* r() = số dòng Excel của dòng sắp thêm */
  var cotSo = TT_KQ_F.map(function(f, j){ return f ? j : -1; }).filter(function(j){ return j>=0; });
  var o = function(v, j){ if(j<6) return '<td'+(j===4 || j===5 ? ' class="c-sdt"' : (j===0 ? ' class="c"' : ''))+'>'+coChuHTML(String(v===undefined || v===null ? '' : v))+'</td>';
    return '<td class="s">'+(TT_KQ_TL[j] ? ttPT(v) : (TT_KQ_F[j]==='kh' || TT_KQ_F[j]==='khdKH' || TT_KQ_F[j]==='knKH' ? (v ? String(v) : '') : ttNghin(v)))+'</td>'; };
  var dongH = function(row, lop){ h += '<tr'+(lop ? ' class="'+lop+'"' : '')+'>'+row.map(o).join('')+'</tr>'; };
  var tl = function(row, n){ Object.keys(TT_KQ_TL).forEach(function(j){ var x = TT_KQ_TL[j]; row[+j] = {t:'n', v:row[+j], f:'IFERROR('+ttCot(x[0])+n+'/'+ttCot(x[1])+n+'*100,0)'}; }); return row; };
  var ctDong = function(ct, lop){ Object.keys(ct).sort().forEach(function(c){ var x = ttKQDong(ct[c], ['', '· '+c, '', '', '', '']); dongH(x, lop); aoa.push(tl(x, r())); }); };
  var dongHoi = [];
  d.hoi.forEach(function(g){
    var n0 = r(), n1 = n0 + g.to.length, hx = ttKQDong(g.s, ['', g.ten+' ('+g.s.soTo+' tổ)', '', '', '', '']);
    if(g.dv==='99') hx[1] = g.ten;
    dongH(hx, 'hoi');
    var hf = hx.slice(); cotSo.forEach(function(j){ hf[j] = g.to.length ? {t:'n', v:hx[j], f:'SUM('+ttCot(j)+(n0+1)+':'+ttCot(j)+n1+')'} : hx[j]; });
    aoa.push(tl(hf, n0)); dongHoi.push(n0);
    var stt = 0;
    g.to.forEach(function(x){ var t = x.t, tt = toLaTT(t), so = tt ? 0 : ++stt;
      var row = ttKQDong(x.s, [so, tt ? 'Vay trực tiếp (không qua tổ)' : (t.ten||''), t.tenThon||'', tt ? '' : t.ma, t.sdt||'', t.pho||'']);
      dongH(row, !tt && !x.s.dn ? 'to0' : ''); aoa.push(tl(row, r())); });
    ctDong(g.ct, 'ct');
  });
  var tong = ttKQDong(d.s, ['', 'CỘNG ('+d.s.soTo+' tổ)', '', '', '', '']), nT = r(), tf = tong.slice();
  cotSo.forEach(function(j){ tf[j] = dongHoi.length ? {t:'n', v:tong[j], f:dongHoi.map(function(n){ return ttCot(j)+n; }).join('+')} : tong[j]; });
  dongH(tong, 'tong'); aoa.push(tl(tf, nT));
  if(Object.keys(d.ct).length){ h += '<tr class="hoi"><td colspan="'+soO+'">Theo chương trình</td></tr>'; aoa.push(['', 'Theo chương trình']); ctDong(d.ct, 'ct'); }
  var dau = '<thead><tr><th rowspan="2">STT</th><th rowspan="2">Tên tổ trưởng</th><th rowspan="2">Ấp</th><th rowspan="2">Mã tổ</th><th rowspan="2" class="c-sdt">SĐT tổ trưởng</th><th rowspan="2" class="c-sdt">Tổ phó</th>'+
    '<th rowspan="2">Số khách hàng</th><th colspan="2">Doanh số</th><th rowspan="2">Tổng dư nợ</th><th colspan="2">Nợ quá hạn</th><th colspan="2">Nợ khoanh</th><th rowspan="2">Tiền lãi đã nộp</th><th rowspan="2">Lãi tồn</th>'+
    '<th rowspan="2">Số dư tiền gửi tổ viên</th><th colspan="3">Không hoạt động 3 tháng</th><th rowspan="2">Số hộ khoanh nợ</th><th rowspan="2">Nợ đến hạn kỳ cuối chưa trả</th><th colspan="2">Nợ đến hạn tháng tiếp theo</th></tr>'+
    '<tr><th>Cho vay</th><th>Thu nợ</th><th>Số tiền</th><th>Tỷ lệ</th><th>Số tiền</th><th>Tỷ lệ</th><th>Số hộ</th><th>Dư nợ</th><th>Tỷ lệ</th><th>Phân kỳ</th><th>Kỳ cuối</th></tr></thead>';
  return {html:TT_CSS+'<table class="bc-bang luoi tt-bang">'+dau+'<tbody>'+h+'</tbody></table>', aoa:aoa};
}
function ttKQGD(ds){
  var K = SK_K, N = ttNgu(K), sau = kyLui(K.thang, 1);
  return ds.map(function(d){
    var B = ttKQBang(d);
    return {ten:ttTenSheet(d.ten), tieuDe:'KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH '+d.ten.toUpperCase()+(d.tenXa ? ' — '+String(d.tenXa).toUpperCase() : ''), ngang:true, ctChu:'',
      ngay:'Số liệu đến ngày '+ngayVNsl(N.ns)+(d.ngayGD ? ' · ngày GDXA '+d.ngayGD : '')+' · Excel: đồng', aoa:B.aoa,
      html:'<div class="bc-tom">'+d.s.soTo+' tổ · '+d.s.kh+' khách hàng · dư nợ <b>'+tdnTien(d.s.dn)+'</b> · quá hạn <b>'+tdnTien(d.s.qh)+'</b> ('+ttPT(ttTyLe(d.s.qh, d.s.dn))+'%) · khoanh <b>'+tdnTien(d.s.kn)+'</b> · KHĐ 3 tháng <b>'+tdnTien(d.s.khdDn)+'</b> — <i>đơn vị bảng: nghìn đồng</i></div>'+B.html+
        '<div class="bc-ghi">Cách tính (Mẫu 31 '+kyVN(K.thang)+'): Số khách hàng = khách còn dư nợ (gốc hoặc lãi). Doanh số cho vay / thu nợ, tiền lãi đã nộp = phát sinh <b>trong tháng</b> (Mẫu 13/GDX tính theo phiên giao dịch nên có thể khác). '+
        'Nợ đến hạn kỳ cuối chưa trả = món trong hạn đã qua ngày đến hạn (hợp đồng / gia hạn) đến ngày số liệu, chưa chuyển quá hạn. '+
        'Nợ đến hạn tháng tiếp theo ('+kyVN(sau)+'): Kỳ cuối = món trong hạn có hạn cuối trong tháng; Phân kỳ = kỳ gốc con đến hạn trong tháng (file Nợ đến hạn phân kỳ'+(d.s.pkUoc ? '; chưa có file thì ước tính' : '')+'). '+
        'KHĐ theo file 3 tháng không hoạt động (không có file thì app tự tính). Dòng tô đỏ nhạt = tổ dư nợ 0 (kiểm tra lại / cần đóng tổ).</div>'};
  });
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
  var kq = ttKQGD(ttDuLieu());
  if(!kq.length) kq = [{ten:'KQGD', tieuDe:'KẾT QUẢ GIAO DỊCH TẠI ĐIỂM GIAO DỊCH', ngang:true, ctChu:'', ngay:'', aoa:[['Không có tổ trong phạm vi']], html:'<div class="bc-rong">Không có tổ trong phạm vi.</div>'}];
  return k==='kqgd' ? kq : kq.concat([ttKHD(), ttQH(), ttKN()]);
}
