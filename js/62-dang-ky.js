/* ===== 3.354 (KE_HOACH_DANG_KY — đợt N1, anh 24/10: "chưa có mẫu nào bắt buộc… em cứ tạo 1 cái nền sẵn, sau này cần mẫu nào sẽ tạo khi cần") =====
   NỀN BÁO CÁO BẢNG: mỗi báo cáo khai 1 lần bằng DANG_KY({...}) → app tự có hộp chọn tùy chọn, xem trước, 🖨 In · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi, 📜 nhật ký in.
   KHUÔN IN CHUẨN (anh chốt 24/10 — KE_HOACH_DANG_KY mục 8):
     - danh sách (loai 'ds') → A4 dọc, lề 15 · 15 · 20 · 10 mm; đầu trang logo + "NGÂN HÀNG CHÍNH SÁCH XÃ HỘI / PGD … - Chi nhánh …" (đậm, như 05/GDX);
     - bảng tổng quát (loai 'bang') → A4 ngang, lề 12 · 12 · 15 · 10 mm, cố gắng 1 trang (tự co chữ 11 → 8 pt — bộ chia trang chung trDan); đầu trang logo + "Ngân hàng CSXH Tỉnh … / PGD … / phạm vi" (như mẫu ĐVUT);
     - giữa: TÊN BÁO CÁO in hoa · dòng nghiêng "Số liệu tính đến …" · dòng phạm vi; phải trên bảng: "Đơn vị tính: …"; góc phải "Mẫu số …" nếu có;
     - tiêu đề cột 2 tầng (cột có .nhom), nhóm theo Xã › Điểm / Điểm › Hội › Tổ / Tổ có dòng cộng đậm, dòng Tổng cộng; ô 0 ghi 0.
   Khai báo: DANG_KY({ma, ten, o:'sk'|'to', loai:'ds'|'bang', mauSo, dvt, nhom:true, chon:[{k, ten, kieu:'tich'|'mot', ds:[[giá trị, nhãn]], md}],
     du:function(ctx){ return {cot:[{k, ten, so, tien, nhom, xd (cho xuống dòng — mặc định mọi ô 1 dòng), nho (chữ nhỏ), rong (Excel)}], dong:[{… , _dv:{xa, diem, hoi, to}, _lop}], ghi}; }})
   ctx = {K: kỳ đã dựng, S: phạm vi đang chọn, chon: {k: giá trị}, pv: chữ phạm vi, ngay: ngày số liệu ISO}. ES5. */
var DK_DS = {}, DK_XEM = null;
function DANG_KY(o){ DK_DS[o.ma] = o; return o; }
var DK_NHOM = [['', 'Không nhóm'], ['xd', 'Xã › Điểm GD'], ['dht', 'Điểm GD › Hội › Tổ'], ['to', 'Từng tổ']];
var DK_DV = {ten:'NGÂN HÀNG CHÍNH SÁCH XÃ HỘI', pgd:'PGD Gò Dầu - Chi nhánh Tây Ninh', tinh:'Ngân hàng CSXH Tỉnh Tây Ninh', pgdNgan:'PGD Gò Dầu'};
/* nơi dùng: kỳ + phạm vi của tab */
function dkCtxTab(o){ var K = o.o==='to' ? KHO.kyDung() : SK_K, S = o.o==='to' ? toCH() : skCH(); return {K:K, S:S, pv:K ? pvChu(S, K) : ''}; }
/* thông tin địa bàn của 1 dòng (mã tổ) — dùng cho nhóm + cột */
function dkDV(K, maTo){ var t = KHO.toKy(K, maTo) || {}, diem = String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, '');
  return {xa:String(t.tenXa||'').replace(/^(Xã|Phường|Thị trấn)\s+/i, ''), diem:diem ? 'Điểm '+diem : '', hoi:String(t.dv||'')==='99' ? 'Vay trực tiếp' : (tdnHoi(t.dv) || ''), to:t.ten ? 'Tổ '+String(t.ten).replace(/^Tổ\s+/i, '')+(t.ma ? ' ('+t.ma+')' : '') : (maTo || '')}; }
function dkTien(v, dvt){ v = +v || 0; return dvt==='triệu đồng' ? (Math.round(v/1e4)/100).toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2}) : Math.round(v).toLocaleString('vi-VN'); }
function dkO(c, v, dvt){ if(v==null || v==='') return ''; if(c.tien) return dkTien(v, dvt); if(c.so && typeof v==='number') return v.toLocaleString('vi-VN'); return String(v); }
/* chia dòng theo nhóm → [{cap, nhan, dong:[…]} | dòng] kèm dòng cộng */
function dkChia(kq, nhom){
  var cap = nhom==='xd' ? ['xa', 'diem'] : nhom==='dht' ? ['diem', 'hoi', 'to'] : nhom==='to' ? ['to'] : [], so = kq.cot.filter(function(c){ return c.tien || c.cong; });
  var cong = function(ds){ var r = {}; so.forEach(function(c){ r[c.k] = ds.reduce(function(a, x){ return a+(+x[c.k]||0); }, 0); }); return r; };
  var ra = [], stt = 0;
  var duyet = function(ds, i, muc){
    if(i>=cap.length){ ds.forEach(function(x){ ra.push({x:x, stt:++stt}); }); return; }
    var g = {}, thu = []; ds.forEach(function(x){ var k = (x._dv||{})[cap[i]] || '(không rõ)'; if(!g[k]){ g[k] = []; thu.push(k); } g[k].push(x); });
    thu.forEach(function(k){ ra.push({nhom:k, muc:muc, cap:cap[i], n:g[k].length, cong:cong(g[k])}); duyet(g[k], i+1, muc+1); });
  };
  duyet(kq.dong, 0, 0);
  return {ra:ra, tong:cong(kq.dong), n:kq.dong.length};
}
/* trang in chuẩn */
function dkHTML(o, kq, ctx){
  var bang = o.loai==='bang', dvt = o.dvt || (bang ? 'triệu đồng' : 'đồng'), e = coChuHTML, coNhom = kq.cot.some(function(c){ return c.nhom; });
  var th1 = '', th2 = '';
  if(coNhom){ for(var i=0;i<kq.cot.length;){ var c = kq.cot[i]; if(!c.nhom){ th1 += '<th rowspan="2">'+e(c.ten)+'</th>'; i++; continue; }
      var j = i; while(j<kq.cot.length && kq.cot[j].nhom===c.nhom) j++; th1 += '<th colspan="'+(j-i)+'">'+e(c.nhom)+'</th>'; for(var x=i;x<j;x++) th2 += '<th>'+e(kq.cot[x].ten)+'</th>'; i = j; } }
  else th1 = kq.cot.map(function(c){ return '<th>'+e(c.ten)+'</th>'; }).join('');
  var C = dkChia(kq, ctx.chon.nhom || ''), n = kq.cot.length;
  var dongHTML = function(r){
    if(r.nhom!=null){ var lop = 'dk-nhom m'+r.muc, dau = kq.cot.map(function(c, i){ return i===0 ? '' : (c.tien || c.cong ? dkO(c, r.cong[c.k], dvt) : ''); });
      return '<tr class="'+lop+'"><td colspan="'+Math.min(n, 3)+'">'+e(r.nhom)+' <span class="dk-n">('+r.n+')</span></td>'+kq.cot.slice(Math.min(n, 3)).map(function(c){ return '<td class="s">'+(c.tien || c.cong ? dkO(c, r.cong[c.k], dvt) : '')+'</td>'; }).join('')+'</tr>'; }
    return '<tr'+(r.x._lop ? ' class="'+r.x._lop+'"' : '')+'>'+kq.cot.map(function(c){ var v = c.k==='stt' ? r.stt : r.x[c.k]; return '<td'+(c.so || c.tien ? ' class="s"' : c.k==='stt' ? ' class="c"' : c.xd ? ' class="x"' : c.nho ? ' class="nho"' : '')+'>'+e(dkO(c, v, dvt))+'</td>'; }).join('')+'</tr>'; };
  var tong = '<tr class="dk-tong"><td colspan="'+Math.min(n, 3)+'">Tổng cộng ('+C.n+')</td>'+kq.cot.slice(Math.min(n, 3)).map(function(c){ return '<td class="s">'+(c.tien || c.cong ? dkO(c, C.tong[c.k], dvt) : '')+'</td>'; }).join('')+'</tr>';
  var ngay = ctx.ngay ? ngayVNsl(ctx.ngay) : '';
  var trai = bang ? '<div class="dk-dv dk-dv-n"><div>'+e(DK_DV.tinh)+'</div><div>'+e(DK_DV.pgdNgan)+'</div>'+(ctx.pv && !/^Toàn PGD/.test(ctx.pv) ? '<div>'+e(ctx.pv)+'</div>' : '')+'</div>'
                  : '<div class="dk-dv"><div>'+e(DK_DV.ten)+'</div><div>'+e(DK_DV.pgd)+'</div></div>';
  var css = '@page{size:A4 '+(bang ? 'landscape' : 'portrait')+';margin:'+(bang ? '12mm 10mm 12mm 15mm' : '15mm 10mm 15mm 20mm')+'}'+
    'body{font-family:"Times New Roman",serif;color:#000;background:#fff;margin:0;font-size:'+(bang ? '11pt' : '10.5pt')+'}'+
    '.dk-dau{display:flex;align-items:flex-start;gap:8px;position:relative}.dk-dau img{width:15mm;height:auto}.dk-dv{font-weight:bold;font-size:1.05em;line-height:1.35;margin-top:2mm}.dk-dv-n{font-weight:normal;font-size:.95em}'+
    '.dk-mau{position:absolute;right:0;top:0;font-size:.95em}h1{text-align:center;font-size:'+(bang ? '15pt' : '13pt')+';margin:2mm 0 1mm;text-transform:uppercase}'+
    '.dk-ngay{text-align:center;font-style:italic;margin-bottom:1mm}.dk-pv{text-align:center;margin-bottom:1mm}.dk-dvt{text-align:right;font-style:italic;margin:1mm 0}'+
    'table{width:100%;border-collapse:collapse}th,td{border:1px solid #000;padding:1.5px 3px;vertical-align:middle;white-space:nowrap}th{font-weight:bold;text-align:center}thead{display:table-header-group}tr{page-break-inside:avoid}'+
    'td.s{text-align:right;white-space:nowrap}td.c{text-align:center}td.nho{font-size:.85em}td.x{white-space:normal;min-width:18mm}tr.dk-nhom td{font-weight:bold;background:#f2f2f2}tr.dk-nhom.m1 td{background:#fafafa}tr.dk-nhom.m2 td{background:#fff;font-style:italic}'+
    'tr.dk-tong td{font-weight:bold}tr.nb td{background:#fff1c7}.dk-n{font-weight:normal}.dk-ghi{margin-top:2mm;font-size:.9em;font-style:italic}'+
    '@media screen{body{padding:8px}}';
  /* chia trang + tự co chữ do bộ in chung (trDan, js/05) làm: bản .phieu khai khổ / lề / bậc cỡ chữ; bảng tổng quát cố vừa 1 trang */
  var mg = bang ? '12 10 12 15' : '15 10 15 20', cb = bang ? '11,10.5,10,9.5,9,8.5,8' : '10.5,10,9.5,9,8.5,8';
  return '<!doctype html><html><head><meta charset="utf-8"><title>'+e(o.ten)+'</title><style>'+css+'</style></head><body>'+
    '<div class="phieu dk-ban" data-tr-ngang="'+(bang ? 1 : 0)+'" data-tr-mg="'+mg+'" data-tr-cb="'+cb+'" data-tr-so="xy"'+(bang ? ' data-tr-1trang="1"' : '')+'><div class="dk-dau">'+(typeof LOGO_NHCSXH!=='undefined' ? '<img src="'+LOGO_NHCSXH+'" alt="">' : '')+trai+(o.mauSo ? '<div class="dk-mau">Mẫu số '+e(o.mauSo)+'</div>' : '')+'</div>'+
    '<h1>'+e(kq.tieuDe || o.ten)+'</h1>'+(ngay ? '<div class="dk-ngay">'+(bang ? 'Số liệu tính đến thời điểm: ' : 'Số liệu đến ngày ')+ngay+'</div>' : '')+
    (!bang && ctx.pv ? '<div class="dk-pv">'+e(ctx.pv)+'</div>' : '')+'<div class="dk-dvt">Đơn vị tính: '+e(dvt)+'</div>'+
    '<table><thead><tr>'+th1+'</tr>'+(coNhom ? '<tr>'+th2+'</tr>' : '')+'</thead><tbody>'+C.ra.map(dongHTML).join('')+tong+'</tbody></table>'+
    (kq.ghi ? '<div class="dk-ghi">'+e(kq.ghi)+'</div>' : '')+'</div></body></html>';
}
/* Excel: đầu trang + tiêu đề cột (2 tầng) + dòng (cả dòng nhóm / cộng) */
function dkAOA(o, kq, ctx){
  var dvt = o.dvt || (o.loai==='bang' ? 'triệu đồng' : 'đồng'), C = dkChia(kq, ctx.chon.nhom || ''), so = function(c, v){ return c.tien ? (dvt==='triệu đồng' ? Math.round((+v||0)/1e4)/100 : Math.round(+v||0)) : v; };
  var a = [[DK_DV.ten], [DK_DV.pgd], [], [(kq.tieuDe || o.ten).toUpperCase()], [ctx.ngay ? 'Số liệu đến ngày '+ngayVNsl(ctx.ngay) : ''], [ctx.pv || ''], ['Đơn vị tính: '+dvt]];
  if(kq.cot.some(function(c){ return c.nhom; })) a.push(kq.cot.map(function(c){ return c.nhom || c.ten; }));
  a.push(kq.cot.map(function(c){ return c.ten; }));
  C.ra.forEach(function(r){ if(r.nhom!=null) a.push(kq.cot.map(function(c, i){ return i===0 ? r.nhom+' ('+r.n+')' : (c.tien || c.cong ? so(c, r.cong[c.k]) : ''); }));
    else a.push(kq.cot.map(function(c){ var v = c.k==='stt' ? r.stt : r.x[c.k]; return c.tien ? so(c, v) : (v==null ? '' : v); })); });
  a.push(kq.cot.map(function(c, i){ return i===0 ? 'Tổng cộng ('+C.n+')' : (c.tien || c.cong ? so(c, C.tong[c.k]) : ''); }));
  if(kq.ghi) a.push([], [kq.ghi]);
  return a;
}
/* lập 1 báo cáo với lựa chọn hiện tại */
function dkLap(ma){
  var o = DK_DS[ma], X = dkCtxTab(o), chon = (D.cauHinh.dkChon = D.cauHinh.dkChon || {})[ma] = (D.cauHinh.dkChon||{})[ma] || {};
  (o.chon||[]).forEach(function(c){ if(chon[c.k]===undefined) chon[c.k] = c.md; }); if(o.nhom && chon.nhom===undefined) chon.nhom = o.nhomMd || 'dht';
  var ctx = {K:X.K, S:X.S, pv:X.pv, chon:chon, ngay:X.K ? (X.K.ngay || (String(X.K.ky).length>7 ? X.K.ky : tdnCuoiKy(X.K.ky))) : ''};
  var kq = o.du(ctx); return {o:o, kq:kq, ctx:ctx};
}
function dkChonHTML(o, chon){
  var h = (o.chon||[]).map(function(c){
    return '<span class="dk-chon"><b>'+coChuHTML(c.ten)+'</b> '+c.ds.map(function(d){ var bat = c.kieu==='tich' ? (chon[c.k]||[]).indexOf(d[0])>=0 : chon[c.k]===d[0];
      return GD.chip(coChuHTML(d[1]), bat, 'dk.chon', {ma:o.ma, k:c.k, v:d[0], kieu:c.kieu}); }).join('')+'</span>'; }).join('');
  if(o.nhom) h += '<span class="dk-chon"><b>Nhóm theo</b> '+DK_NHOM.map(function(d){ return GD.chip(d[1], (chon.nhom||'')===d[0], 'dk.chon', {ma:o.ma, k:'nhom', v:d[0], kieu:'mot'}); }).join('')+'</span>';
  return '<div class="dk-chon-hang">'+h+'</div>';
}
/* mở hộp xem trước */
function dkMo(ma){
  dkDangKy(); var o = DK_DS[ma]; if(!o) return;
  var X = dkCtxTab(o); if(!X.K) return bao('Chưa có số liệu — chọn kỳ ở tab trước.', 4);
  var L; try { L = dkLap(ma); } catch(er){ return baoLoi('Lập báo cáo lỗi: '+(er && er.message || er)); }
  DK_XEM = L; var h = dkHTML(L.o, L.kq, L.ctx);
  var ten = xuatTen(o.ten, L.ctx.pv, L.ctx.K.ky);
  moHop('<div class="hop-tit">👁 '+coChuHTML(o.ten)+' — '+coChuHTML(L.ctx.pv)+' <small class="dk-dem">'+L.kq.dong.length+' dòng</small></div>'+dkChonHTML(o, L.ctx.chon)+
    '<iframe id="dk-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({ten:ten, nk:{mau:o.ten, ky:L.ctx.K.ky, tab:o.o}, html:function(){ return dkHTML(DK_XEM.o, DK_XEM.kq, DK_XEM.ctx); }, excel:'dkExcel()', word:'dkWord()'}), true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  xemChuan(document.getElementById('dk-khung'), h);
}
function dkExcel(){ var L = DK_XEM; if(!L) return; xongTV.then(function(){
  if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel — có mạng một lần rồi thử lại.');
  var ws = XLSX.utils.aoa_to_sheet(dkAOA(L.o, L.kq, L.ctx)), wb = XLSX.utils.book_new();
  ws['!cols'] = L.kq.cot.map(function(c){ return {wch:c.k==='stt' ? 5 : c.tien ? 14 : c.rong || 16}; });
  XLSX.utils.book_append_sheet(wb, ws, L.o.ten.slice(0, 28));
  taiXuongBlob(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), xuatTen(L.o.ten, L.ctx.pv, L.ctx.K.ky)+'.xlsx'); }); }
function dkWord(){ var L = DK_XEM; if(!L) return; taiXuongBlob(new Blob(['﻿'+dkHTML(L.o, L.kq, L.ctx)], {type:'application/msword'}), xuatTen(L.o.ten, L.ctx.pv, L.ctx.K.ky)+'.doc'); }
/* nút ở tab: danh sách báo cáo đã đăng ký của tab */
function dkNutHTML(o){ dkDangKy(); var ds = Object.keys(DK_DS).map(function(k){ return DK_DS[k]; }).filter(function(x){ return x.o===o; }); if(!ds.length) return '';
  return '<div class="sk-nhom dk-ds"><div class="sk-nhom-ten">🧩 Báo cáo chuẩn mới</div>'+ds.map(function(x){ return GD.nut({chu:'👁 '+x.ten+' <small>· '+(x.loai==='bang' ? 'ngang' : 'dọc')+'</small>', lenh:'dk.mo', du:{ma:x.ma}, tit:x.mo || ''}); }).join('')+'</div>'; }
function dkDangKy(){ if(dkDangKy.xong || typeof GD==='undefined') return; dkDangKy.xong = 1;
  GD.dangKy('dk', {mo:function(el){ dkMo(el.getAttribute('data-ma')); },
    chon:function(el){ var ma = el.getAttribute('data-ma'), k = el.getAttribute('data-k'), v = el.getAttribute('data-v'), c = D.cauHinh.dkChon[ma];
      if(el.getAttribute('data-kieu')==='tich'){ var a = c[k] = (c[k]||[]).slice(), i = a.indexOf(v); if(i>=0){ if(a.length>1) a.splice(i, 1); } else a.push(v); } else c[k] = v;
      luu(); dkMo(ma); }}); }

/* ===================== BÁO CÁO MẪU 1 (đợt N1): NỢ CẦN XỬ LÝ — gộp quá hạn · khoanh · 3 tháng KHĐ · KU chưa giải ngân ===================== */
DANG_KY({ma:'noxl', o:'sk', loai:'ds', ten:'Danh sách nợ cần xử lý', nhom:true, nhomMd:'dht', mo:'Quá hạn · khoanh · 3 tháng không hoạt động · KU đã nhập máy chưa giải ngân — chọn loại, nhóm theo địa bàn',
  chon:[{k:'loai', ten:'Loại', kieu:'tich', ds:[['qh', 'Quá hạn'], ['kn', 'Khoanh'], ['khd', '3 tháng KHĐ'], ['cgn', 'KU chưa GN > 1 tháng']], md:['qh', 'kn', 'khd']}],
  du:function(ctx){
    var K = ctx.K, B = K.B || {co:{}}, loai = ctx.chon.loai || [], ns = ctx.ngay, dong = [];
    var trong = function(o){ return pvLoc(ctx.S, KHO.toKy(K, toMaCua(o))); };
    var them = function(o, x){ var r = {kh:o.kh||'', ten:o.ten||'', ku:o.ku||'', ct:ctNgan(o.ct, o), dn:o.dn||0, _dv:dkDV(K, toMaCua(o))}; for(var k in x) r[k] = x[k]; dong.push(r); };
    if(loai.indexOf('qh')>=0) (B.co.nqh||[]).filter(trong).forEach(function(o){ them(o, {loai:'QH', xl:o.qh||0, ngay:ngayVNsl(o.ncqh), so:o.ncqh ? tdnSoNgay(o.ncqh, ns) : '', ghi:(o.cqh>0 ? 'Mới trong tháng' : '')}); });
    if(loai.indexOf('kn')>=0) (B.co.nk||[]).filter(trong).forEach(function(o){ them(o, {loai:'Khoanh', dn:o.dn||o.kn||0, xl:o.kn||0, ngay:ngayVNsl(o.nhh), so:o.nhh ? tdnSoNgay(ns, o.nhh) : '', ghi:o.nn ? 'Hết khoanh · '+o.nn : 'Hết khoanh'}); });
    if(loai.indexOf('khd')>=0){ var kd = KHO.khdKy(K); Object.keys(kd).map(function(k){ return kd[k]; }).filter(trong).forEach(function(o){ them(o, {loai:'KHĐ 3T', xl:0, ngay:ngayVNsl(o.ngdg), so:o.ngdg ? tdnSoNgay(o.ngdg, ns) : '', ghi:laiTon(o)>0 ? 'Lãi tồn '+dkTien(laiTon(o)) : ''}); }); }
    if(loai.indexOf('cgn')>=0 && B.co.hstd) B.co.hstd.filter(function(o){ return slKUChuaGN(o) && trong(o) && skQua1Thang(o.nv, ns); }).forEach(function(o){ them(o, {loai:'Chưa GN', dn:0, xl:o.mucVay||0, ngay:ngayVNsl(o.nv), so:o.nv ? tdnSoNgay(String(o.nv).slice(0, 10), ns) : '', ghi:'Cần đóng KU', _lop:'nb'}); });
    var thu = {'QH':1, 'Khoanh':2, 'KHĐ 3T':3, 'Chưa GN':4};
    dong.sort(function(a, b){ return (a._dv.diem+a._dv.hoi+a._dv.to).localeCompare(b._dv.diem+b._dv.hoi+b._dv.to) || thu[a.loai]-thu[b.loai] || String(a.kh).localeCompare(String(b.kh)); });
    return {cot:[{k:'stt', ten:'STT'}, {k:'kh', ten:'Mã KH'}, {k:'ten', ten:'Họ tên', rong:24}, {k:'ku', ten:'Số KU', nho:1}, {k:'ct', ten:'CT'}, {k:'loai', ten:'Loại'},
        {k:'dn', ten:'Dư nợ', tien:true}, {k:'xl', ten:'Tiền QH / KN', tien:true}, {k:'ngay', ten:'Ngày', nhom:'Mốc theo dõi'}, {k:'so', ten:'Số ngày', so:true, nhom:'Mốc theo dõi'}, {k:'ghi', ten:'Ghi chú', rong:24, xd:1}],
      dong:dong, ghi:'Loại: QH = quá hạn · KHĐ 3T = 3 tháng không hoạt động · Chưa GN = KU nhập máy chưa giải ngân > 1 tháng. Ngày: QH = ngày chuyển QH · Khoanh = ngày hết hạn khoanh (số ngày còn lại) · KHĐ = ngày GD gần nhất · Chưa GN = ngày vay.'};
  }});
