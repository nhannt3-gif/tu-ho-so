/* ===== 3.392 (TK 2 — BAN_GIAO_TK3_2710 mục 6 "chuyển dần báo cáo còn trong skBaoCao sang lap()"): báo cáo Sao kê dạng DANH SÁCH
   (nhóm Nợ cần xử lý · Nợ đến hạn · Phát sinh tháng · Khách hàng) — CẮM RÚT: bỏ dòng <script> trong index.html là các báo cáo này biến mất, phần khác không đổi.
   Nạp SAU js/22h (SK_BC, skBang, skTrongPV, skNen31, hàm dùng chung nợ đến hạn / phân kỳ). Thân hàm chép nguyên từ skBaoCao cũ — t276 (bản chụp) giống hệt. ===== */
function skBCDanhSach(k){   /* quá hạn · khoanh · 3 tháng không hoạt động — theo file riêng của loại */
  var K = SK_K, B = K.B, th = K.thang;
  if(k==='qh' || k==='kh' || k==='khd'){
    var L = {qh:'nqh', kh:'nk', khd:'khd'}[k], ten = {qh:'Sao kê nợ quá hạn', kh:'Sao kê nợ khoanh', khd:'Sao kê món vay 3 tháng không hoạt động'}[k];
    if(!KHO.bang(L, th)) return {ten:ten, tieuDe:ten.toUpperCase(), ngay:'Tháng '+kyVN(th), html:'<div class="bc-rong">Chưa nạp file '+coChuHTML(slLoai(L).ten)+' tháng '+kyVN(th)+'.</div>', aoa:[['Chưa nạp file']]};
    var ng = skNgayThang(L), ds = (kcBang(B, L)||[]).filter(skTrongPV), r;
    if(k==='qh') r = skBang(['STT','Mã KH','Họ tên','Số KU','Chương trình','Dư nợ QH','Ngày chuyển QH','Số ngày QH','Mới trong tháng','Số dư 105'], ds.sort(function(a, b){ return (a.ncqh||'9')<(b.ncqh||'9') ? -1 : 1; }),
      function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.qh||0, ngayVNsl(o.ncqh), o.ncqh ? tdnSoNgay(o.ncqh, ng) : '', o.cqh>0 ? 'Mới' : '', o.t105||0]; }, [5, 9]);
    if(k==='kh') r = skBang(['STT','Mã KH','Họ tên','Số KU','Chương trình','Dư nợ khoanh','Ngày hiệu lực','Ngày hết hạn khoanh','Còn (ngày)','Nguyên nhân'], ds.sort(function(a, b){ return (a.nhh||'9')<(b.nhh||'9') ? -1 : 1; }),
      function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.kn||0, ngayVNsl(o.nhl), ngayVNsl(o.nhh), o.nhh ? tdnSoNgay(ng, o.nhh) : '', o.nn||'']; }, [5]);
    if(k==='khd') r = skBang(['STT','Mã KH','Họ tên','Số KU','Chương trình','Dư nợ','Ngày GD gần nhất','Số ngày không GD','Ngày đến hạn','Lãi tồn'], ds.sort(function(a, b){ return (a.ngdg||'9')<(b.ngdg||'9') ? -1 : 1; }),
      function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.dn||0, ngayVNsl(o.ngdg), o.ngdg ? tdnSoNgay(o.ngdg, ng) : '', ngayVNsl(o.dhgh||o.dhg||o.dhgd), laiTon(o)]; }, [5, 9]);
    return {ten:ten, tieuDe:ten.toUpperCase(), ngay:'Số liệu đến ngày '+ngayVNsl(ng), html:r.html, aoa:r.aoa};
  }
}
function skBC31(k){   /* báo cáo tính từ Mẫu 31 */
  var th = SK_K.thang, N = skNen31(k); if(N.can) return N.can;
  var M = N.M, e31 = N.e31, ngay = N.ngay, rows = N.rows, lapKH = N.lapKH;
  if(k==='sdt'){   /* anh chốt: đạt = đúng 10 chữ số, bắt đầu bằng 0; trống → ô trống; không đạt → in số + ghi chú */
    var kh = {}, dsK = [];
    rows.forEach(function(o){ if(!o.kh) return; var x = kh[o.kh]; if(!x){ x = kh[o.kh] = {kh:o.kh, ten:o.ten||'', to:o.to, sdt:'', dn:0, lt:0}; dsK.push(x); } if(o.sdt && !x.sdt) x.sdt = String(o.sdt).trim(); if(o.ku){ x.dn += o.dn||0; x.lt += laiTon(o); } });
    dsK = dsK.filter(function(x){ return x.dn>0 || x.lt>0; }).sort(function(a, b){ return a.kh<b.kh ? -1 : 1; });
    var dat = function(s){ return /^0\d{9}$/.test(String(s).replace(/[\s.\-]/g, '')); }, nTrong = 0, nSai = 0;
    dsK.forEach(function(x){ x.tt = !x.sdt ? 'trong' : (dat(x.sdt) ? '' : 'sai'); if(x.tt==='trong') nTrong++; if(x.tt==='sai') nSai++; });
    var r = skBang(['STT','Mã KH','Họ tên','Số điện thoại','Ghi chú'], dsK, function(x, i){ return [i, x.kh, x.ten, x.sdt, x.tt==='sai' ? 'SĐT không đạt yêu cầu' : (x.tt==='trong' ? 'Chưa có SĐT — bổ sung' : '')]; }, [], function(x){ return x.tt ? 'nb' : ''; });
    return {ten:'So dien thoai', tieuDe:'DANH SÁCH SỐ ĐIỆN THOẠI KHÁCH HÀNG', ngay:ngay, aoa:r.aoa,
      html:'<div class="bc-tom">'+dsK.length+' khách đang vay · SĐT đạt '+(dsK.length-nTrong-nSai)+' · <b>chưa có '+nTrong+'</b> · <b>không đạt '+nSai+'</b> (dòng tô nền cần bổ sung; SĐT đạt = đúng 10 chữ số, bắt đầu bằng 0)</div>'+r.html};
  }
  if(k==='dh') return skBCDH(rows, lapKH, M, e31, ngay);   /* 3.91 */
  if(k==='cgn') return skBCChuaGN(rows, ngay);   /* 3.138 */
  if(k==='noxh') return skBCNOXH(rows, M, ngay, e31);   /* 3.91 */
  if(k==='pkto') return skBCPKTo(M, ngay, e31);
  if(k==='gn' || k==='m105'){
    var ds = rows.filter(function(o){ return o.ku && (o.gnT||0)>0; });
    if(k==='gn'){
      var r = skBang(['STT','Mã KH','Họ tên','Số KU','Chương trình','Ngày giải ngân','Giải ngân trong tháng','Dư nợ'], ds.sort(function(a, b){ return a.kh<b.kh ? -1 : 1; }),
        function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.c_ngay_gn_cuoi_cung ? String(o.c_ngay_gn_cuoi_cung) : ngayVNsl(o.ngn), o.gnT||0, o.dn||0]; }, [6, 7]);
      return {ten:'Giai ngan', tieuDe:'SAO KÊ GIẢI NGÂN THÁNG '+kyVN(th).replace('T', ''), ngay:ngay, html:r.html, aoa:r.aoa};
    }
    var coTK = {}; (kcGoc(M)||[]).concat(kcLap(M)||[]).forEach(function(o){ if(o.kh && (slStk(o.stk).length || (o.t105||0)>0)) coTK[o.kh] = 1; });   /* khách đã có sổ 105 (cả dòng lặp) · 3.120: có số dư 105 cũng là có sổ */
    var coSo = function(m){ return !!coTK[m] || slStkDB(m).length>0; }, da = {};   /* 3.120: + số sổ từ Dư nợ chi tiết */
    var can = ds.filter(function(o){ if(da[o.kh] || coSo(o.kh)) return false; da[o.kh] = 1; return true; });
    var r = skBang(['STT','Mã KH','Họ tên','Số KU','Ngày giải ngân','Số tiền giải ngân','Ghi chú'], can, function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', o.c_ngay_gn_cuoi_cung ? String(o.c_ngay_gn_cuoi_cung) : ngayVNsl(o.ngn), o.gnT||0, 'Cần mở TK 105']; }, [5]);
    return {ten:'Can mo TK 105', tieuDe:'KHÁCH GIẢI NGÂN TRONG THÁNG CẦN MỞ TK 105', ngay:ngay, html:r.html, aoa:r.aoa};
  }
  if(k==='ddn'){
    var f = ['gnT','dkT','tnTH','tnQH','tnK','xoaT'];
    var ds = rows.filter(function(o){ return o.ku && f.some(function(x){ return (o[x]||0)!==0; }); }).sort(function(a, b){ return a.kh<b.kh ? -1 : 1; });
    var r = skBang(['STT','Mã KH','Họ tên','Số KU','Dư nợ đầu tháng','Giải ngân','Thu nợ','Khác (đảo khoản, xóa)','Dư nợ cuối tháng'], ds, function(o, i){
      var thu = (o.tnTH||0)+(o.tnQH||0)+(o.tnK||0), khac = (o.dkT||0)+(o.xoaT||0), cuoi = o.dn||0;
      return [i, o.kh||'', o.ten||'', o.ku||'', cuoi-(o.gnT||0)+thu+khac, o.gnT||0, thu, khac, cuoi]; }, [4, 5, 6, 7, 8]);
    return {ten:'Thay doi du no', tieuDe:'SAO KÊ MÓN VAY CÓ THAY ĐỔI DƯ NỢ THÁNG '+kyVN(th).replace('T', ''), ngay:ngay, html:r.html, aoa:r.aoa};
  }
}
function skBCChuaGN(rows, ngay){
  var ns = SK_K.ngay, T = SK_K.to || {};
  var ds = rows.filter(slKUChuaGN).map(function(o){ return {o:o, qua:skQua1Thang(o.nv, ns), so:o.nv ? tdnSoNgay(String(o.nv).slice(0, 10), ns) : ''}; })
    .sort(function(a, b){ return (b.qua - a.qua) || String(a.o.nv||'').localeCompare(String(b.o.nv||'')); });
  var nQua = ds.filter(function(x){ return x.qua; }).length;
  var r = skBang(['STT','Tổ','Xã','Hội','Mã KH','Họ tên','Số KU','Chương trình','Mức vay','Ngày vay (nhập máy)','Số ngày','Ghi chú'], ds, function(x, i){ var o = x.o, t = T[toMaCua(o)] || {};
      return [i, t.ten || o.toTen || o.to || '', t.tenXa || o.tenXa || '', String(t.dv||o.dv||'')==='99' ? 'Trực tiếp' : (tdnHoi(t.dv||o.dv) || ''), o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), o.mucVay||0, ngayVNsl(o.nv), x.so, x.qua ? 'Quá 1 tháng — cần đóng KU' : '']; },
    [8], function(x){ return x.qua ? 'nb' : ''; }, true);
  return {ten:'KU chua giai ngan', tieuDe:'DANH SÁCH KU ĐÃ NHẬP MÁY CHƯA GIẢI NGÂN', ngay:ngay, aoa:r.aoa,
    html:'<div class="bc-tom">'+ds.length+' KU còn mở, tổng giải ngân = 0, dư nợ = 0 · <b>'+nQua+' KU quá 1 tháng — cần đóng KU</b> (tô nền, xếp đầu; tính từ ngày vay đến ngày số liệu '+ngayVNsl(ns)+')</div>'+r.html};
}
function skBCDH(rows, lapKH, M, e31, ngay){
  var C = skCH(), tu = C.tu, den = C.den, ns = e31.ngay;
  var s105 = {}; (kcGoc(M)||[]).concat(kcLap(M)||[]).forEach(function(o){ if(o.kh && (o.t105||0) > (s105[o.kh]||0)) s105[o.kh] = o.t105; });
  var ds = rows.filter(function(o){ return o.ku && o.ttMon!=='CLOSE' && (o.dn||0)>0 && !(o.qh>0) && !(o.kn>0); });
  var nh = {1:[], 2:[], 3:[]};
  ds.forEach(function(o){ var n = skNhomDH(o, tu, den, ns); if(n) nh[n].push(o); });
  var da105 = {}, sdtDat = function(s){ return /^0\d{9}$/.test(String(s||'').replace(/[\s.\-]/g, '')); };
  var doc = SK_KHO==='doc';   /* 3.92: ngang đủ cột (KU, ngày GH, chuyển QH riêng); dọc gọn — bỏ KU (có CT), bỏ Chuyển QH (khung ① ② ③ đã theo kỳ chuyển QH), ngày GH thay ngày ĐH kèm "GH" */
  var cot = doc ? ['STT','Mã KH','Họ tên','Số KU','SĐT','CT','NV','Dư nợ','Lãi tồn','Số dư 105','Ngày ĐH','Còn GH']
                : ['STT','Mã KH','Họ tên','Số KU','SĐT','CT','NV','Dư nợ','Lãi tồn','Số dư 105','Ngày ĐH','Ngày GH','Chuyển QH','Còn GH'];
  var aoa = [['Nhóm','STT','Mã KH','Họ tên','Số KU','SĐT','Chương trình','Nguồn vốn','Dư nợ','Lãi tồn','Số dư 105','Ngày ĐH hợp đồng','Ngày ĐH gia hạn','Ngày chuyển QH (GDXA)','Còn được gia hạn']];
  var TEN = {1:'① ĐÃ QUÁ HẠN HỢP ĐỒNG, CHƯA CHUYỂN QUÁ HẠN — tra soát, thu trước kỳ GDXA', 2:'② ĐẾN HẠN — CHUYỂN QUÁ HẠN TRONG KỲ (kỳ GDXA trong khoảng ngày)', 3:'③ ĐẾN HẠN — CHUYỂN QUÁ HẠN KỲ SAU (kỳ GDXA sau ngày '+ngayVNsl(den)+')'};
  var h = '', tong = {mon:0, kh:{}, dn:0, lt:0, t105:0};
  [1, 2, 3].forEach(function(n){
    var ls = nh[n].sort(function(a, b){ var x = skHL(a), y = skHL(b); return x<y ? -1 : x>y ? 1 : (a.kh<b.kh ? -1 : 1); });
    var r = skBang(cot, ls, function(o, i){
      var t1 = !da105[o.kh] ? (s105[o.kh]||0) : '', ok = sdtDat(o.sdt); da105[o.kh] = 1;
      var coGH = o.dhgh && o.dhgh!==o.dhg;
      aoa.push([n, i, o.kh||'', o.ten||'', o.ku||'', o.sdt||'', ctNgan(o.ct, o), SL_NGUON[o.nguon]||o.nguon||'', o.dn||0, laiTon(o), t1, ngayVNsl(o.dhg), o.dhgh && o.dhgh!==o.dhg ? ngayVNsl(o.dhgh) : '', ngayVNsl(o.dhgd), skConGH(o)]);
      var dau = [i, o.kh||'', o.ten||'', o.ku||'', {h:coChuHTML(o.sdt||''), lop:ok ? '' : 'nb'}, ctNgan(o.ct, o), SL_NGUON[o.nguon]||o.nguon||'', o.dn||0, laiTon(o), t1];
      return doc ? dau.concat([coGH ? skNg(o.dhgh)+' GH' : skNg(o.dhg), skConGH(o)])
                 : dau.concat([ngayVNsl(o.dhg), coGH ? ngayVNsl(o.dhgh) : '', o.dhgd ? ngayVNsl(o.dhgd) : '(chưa có)', skConGH(o)]); }, [7, 8, 9]);
    ls.forEach(function(o){ tong.mon++; tong.kh[o.kh] = 1; tong.dn += o.dn||0; tong.lt += laiTon(o); });
    h += '<div class="bc-khung"><div class="bc-khung-ten">'+TEN[n]+' — '+ls.length+' món</div>'+r.html+'</div>';
  });
  Object.keys(tong.kh).forEach(function(m){ tong.t105 += s105[m]||0; });
  /* tóm tắt theo tháng (khoảng dài hơn 1 tháng) và theo xã */
  var tom = function(khoa){ var g = {}; [1, 2, 3].forEach(function(n){ nh[n].forEach(function(o){ var k = khoa(o, n), x = g[k] = g[k] || {mon:0, kh:{}, dn:0, lt:0}; x.mon++; x.kh[o.kh] = 1; x.dn += o.dn||0; x.lt += laiTon(o); }); }); return g; };
  var bang = function(tieu, g){ var ks = Object.keys(g).sort(); if(ks.length<2) return '';
    return '<table class="bc-bang sk-tom"><thead><tr><th>'+tieu+'</th><th>Số món</th><th>Số KH</th><th>Dư nợ</th><th>Lãi tồn</th><th>Số dư 105</th></tr></thead><tbody>'+ks.map(function(k){ var x = g[k], t = Object.keys(x.kh).reduce(function(a, m){ return a+(s105[m]||0); }, 0);
      return '<tr><td>'+coChuHTML(k)+'</td><td class="s">'+x.mon+'</td><td class="s">'+Object.keys(x.kh).length+'</td><td class="s">'+tdnTien(x.dn)+'</td><td class="s">'+tdnTien(x.lt)+'</td><td class="s">'+tdnTien(t)+'</td></tr>'; }).join('')+'</tbody></table>'; };
  var theoThang = tom(function(o, n){ return n===1 ? '① Quá hạn HĐ, chưa chuyển QH' : 'Đến hạn T'+(+skHL(o).slice(5,7))+'/'+skHL(o).slice(0,4); });
  var theoXa = tom(function(o){ return o.tenXa||'?'; });
  var dau = '<div class="bc-tom">'+tong.mon+' món · '+Object.keys(tong.kh).length+' KH · dư nợ <b>'+tdnTien(tong.dn)+'</b> · lãi tồn <b>'+tdnTien(tong.lt)+'</b> · số dư 105 <b>'+tdnTien(tong.t105)+'</b> (105 tính 1 lần mỗi khách)</div>'+
    (tdnSoNgay(tu, den)>31 ? bang('Kỳ', theoThang) : '')+bang('Xã / phường', theoXa);
  return {ten:'No den han', tieuDe:'SAO KÊ NỢ ĐẾN HẠN TỪ '+ngayVNsl(tu)+' ĐẾN '+ngayVNsl(den), ngay:ngay, aoa:aoa,
    html:dau+h+'<div class="bc-ghi">Ngày ĐH = ngày đến hạn theo hợp đồng'+(SK_KHO==='doc' ? ' (có chữ "GH" = ngày đến hạn gia hạn, dùng ngày này)' : '; Ngày GH = ngày đến hạn gia hạn (dùng ngày này nếu có)')+'. Chuyển QH = kỳ giao dịch xã đầu tiên sau ngày đến hạn (ngày ĐH theo GDXA) — đến kỳ này chưa trả thì chuyển quá hạn. Chỉ lấy món trong hạn (không quá hạn, không khoanh). Còn GH = còn được gia hạn (tối đa ½ thời hạn cho vay); ⚠ = các cột gia hạn trong file không khớp nhau. Số dư 105 ghi 1 lần mỗi khách. SĐT tô nền = trống / không đủ 10 số.</div>'};
}
function skBCNOXH(rows, M, ngay, e31){
  var C = skCH(), ns = e31.ngay, den = C.den || tdnCuoiKy(kyLui(SK_K.thang, 1));
  var s105 = {}; (kcGoc(M)||[]).concat(kcLap(M)||[]).forEach(function(o){ if(o.kh && (o.t105||0) > (s105[o.kh]||0)) s105[o.kh] = o.t105; });
  var ds = skPKTinh(M, ns), nh = {1:[], 2:[], 3:[]}, dem = {noxh:0, tt:0, moi:0};
  ds.forEach(function(o){ dem[o._loai]++; nh[o._chua>0 ? 1 : (o._pk.toiNgay && o._pk.toiNgay<=den ? 2 : 3)].push(o); });
  var xep = function(a, b){ var x = a._pk.quaNgay||a._pk.toiNgay||'9', y = b._pk.quaNgay||b._pk.toiNgay||'9'; return x<y ? -1 : x>y ? 1 : (a.kh<b.kh ? -1 : 1); };
  var da105 = {}, nUoc = 0, nKhong = 0, nCan = 0, T = {mon:0, dn:0, chua:0, toi:0, nToi:0};
  var aoa = [['Nhóm','STT','Mã KH','Họ tên','Số KU','SĐT','Chương trình','Hình thức','Xã / phường','Dư nợ','Trong đó quá hạn','Gốc đến hạn lũy kế','Gốc đã trả','Kỳ đến hạn chưa trả — ngày','Kỳ đến hạn chưa trả — số tiền','Kỳ tới — ngày','Kỳ tới — số tiền','Nguồn kỳ tới','Hạn nộp 08/TD','Lãi tồn','Số dư 105','Tổng đã chuyển QH','Ngày GD gần nhất','Ngày vay','Hạn cuối','Ngày bắt đầu trả gốc','Chuyển QH kỳ con']];
  var TEN = {1:'① KỲ CON ĐÃ ĐẾN HẠN CHƯA TRẢ — đôn đốc thu ngay', 2:'② KỲ CON ĐẾN HẠN TỪ SAU NGÀY SỐ LIỆU ĐẾN '+ngayVNsl(den), 3:'③ KỲ TỚI SAU NGÀY '+ngayVNsl(den)};
  var tien = function(v, b){ return '<td class="s">'+(v ? (b ? '<b>'+tdnTien(v)+'</b>' : tdnTien(v)) : '')+'</td>'; };
  /* 3.92: cột theo khổ in — ngang đủ cột; dọc gọn (bỏ KU, hình thức, xã, đã chuyển QH, GD gần nhất); mỗi món 1 dòng, ghi chú dài thành dấu * */
  var C_ = function(k, t, l){ return {k:k, t:t, l:l||''}; }, doc = SK_KHO==='doc';
  var COT = doc ? [C_('stt','STT','c'), C_('kh','Mã KH'), C_('ten','Họ tên'), C_('sdt','SĐT','c-sdt'), C_('ct','CT'), C_('dn','Dư nợ','s'), C_('qua','Kỳ ĐH chưa trả'), C_('chua','Số tiền chưa trả','s'),
                  C_('toi','Kỳ tới'), C_('toiT','Số tiền kỳ tới','s'), C_('h08','Hạn 08/TD'), C_('lt','Lãi tồn','s'), C_('t105','Số dư 105','s')]
                : [C_('stt','STT','c'), C_('kh','Mã KH'), C_('ten','Họ tên'), C_('ku','Số KU'), C_('sdt','SĐT'), C_('ct','CT'), C_('hinh','Hình thức'), C_('xa','Xã'), C_('dn','Dư nợ','s'), C_('qua','Kỳ ĐH chưa trả'), C_('chua','Số tiền chưa trả','s'),
                  C_('toi','Kỳ tới'), C_('toiT','Số tiền kỳ tới','s'), C_('h08','Hạn 08/TD'), C_('lt','Lãi tồn','s'), C_('t105','Số dư 105','s'), C_('cqh','Đã chuyển QH (LK)','s'), C_('gd','GD gần nhất')];
  var trungKU = {}, demKU = {}; ds.forEach(function(o){ var q = o.kh+'|'+o.ct; demKU[q] = (demKU[q]||0)+1; }); Object.keys(demKU).forEach(function(q){ if(demKU[q]>1) trungKU[q] = 1; });
  var h = '';
  [1, 2, 3].forEach(function(n){
    var ls = nh[n].sort(xep); if(!ls.length) return;
    var t = {dn:0, chua:0, toi:0}, b = '', gon = n===3 && ls.length>40;   /* ③ nhiều món (ủy thác mới, kỳ đầu năm sau) → bảng gom theo CT, chi tiết ở Excel */
    ls.forEach(function(o, i){
      var p = o._pk, lt = laiTon(o), cqh = slSo(o.c_tong_chuyen_no_qh)||0, t1 = !da105[o.kh] ? (s105[o.kh]||0) : 0; da105[o.kh] = 1;
      var hinh = o.to ? (o.tenDv || 'Qua tổ') : 'Trực tiếp', toiTien = p.toiTien||0, kcq = skKhongCQH(o);
      if(p.uoc && p.toiNgay) nUoc++; if(p.toiTien===null && p.toiNgay<=den) nCan++; if(kcq && o._chua) nKhong++;
      t.dn += o.dn||0; t.chua += o._chua; T.mon++; T.dn += o.dn||0; T.chua += o._chua;
      if(p.toiNgay && p.toiNgay<=den){ t.toi += toiTien; T.toi += toiTien; T.nToi++; }
      aoa.push([n, i+1, o.kh||'', o.ten||'', o.ku||'', o.sdt||'', ctNgan(o.ct, o), hinh, o.tenXa||'', o.dn||0, o.qh||0, slSo(o.c_goc_den_han_lk)||0, slSo(o.c_goc_da_tra)||0, ngayVNsl(p.quaNgay), o._chua,
        ngayVNsl(p.toiNgay), p.toiTien===null ? '' : toiTien, !p.toiNgay ? '' : p.toiTien===null ? 'cần file phân kỳ' : p.uoc ? 'ước tính' : 'theo file phân kỳ', ngayVNsl(o._h08), lt, t1||'', cqh, ngayVNsl(o.ngdg), ngayVNsl(o.nv), ngayVNsl(skHL(o)), String(o.c_ngay_b_dau_tra_goc||''), skPKGhi(o)]);
      if(gon) return;
      var r = {stt:i+1, kh:coChuHTML(o.kh||''), ten:coChuHTML(o.ten||''), ku:coChuHTML(o.ku||''), sdt:coChuHTML(o.sdt||''), ct:coChuHTML(ctNgan(o.ct, o))+(SK_KHO==='doc' && trungKU[o.kh+'|'+o.ct] ? ' <small>·'+coChuHTML(String(o.ku||'').slice(-6))+'</small>' : ''),
        hinh:coChuHTML(skHoiNgan(o)), xa:coChuHTML(String(o.tenXa||'').replace(/^(Phường|Xã|Thị trấn)\s+/i, '')), dn:tdnTien(o.dn||0)+((o.qh||0)>0 ? ' <small>QH '+tdnTien(o.qh)+'</small>' : ''),
        qua:o._chua ? (p.quaUoc ? '≈ ' : '')+skNg(p.quaNgay)+(kcq ? ' *' : '') : '', chua:o._chua ? '<b>'+tdnTien(o._chua)+'</b>' : '',
        toi:p.toiNgay ? (p.uoc ? '≈ ' : '')+skNg(p.toiNgay) : '', toiT:skPKTien(p), h08:skNg(o._h08), lt:lt ? tdnTien(lt) : '', t105:t1 ? tdnTien(t1) : '', cqh:cqh ? tdnTien(cqh) : '', gd:skNg(o.ngdg)};
      b += '<tr'+(n===1 && !kcq ? ' class="nb"' : '')+'>'+COT.map(function(c){ return '<td'+(c.l ? ' class="'+c.l+'"' : '')+'>'+r[c.k]+'</td>'; }).join('')+'</tr>';
    });
    if(gon){
      var g = {}; ls.forEach(function(o){ var k = ctNgan(o.ct, o)+' · '+(o._loai==='moi' ? 'ủy thác vay từ 01/03/2026' : o._loai==='tt' ? 'trực tiếp' : 'NOXH'), x = g[k] = g[k] || {mon:0, dn:0, dau:'9'}; x.mon++; x.dn += o.dn||0; if(o._pk.toiNgay && o._pk.toiNgay<x.dau) x.dau = o._pk.toiNgay; });
      h += '<div class="bc-khung"><div class="bc-khung-ten">'+TEN[n]+' — '+ls.length+' món (gom theo chương trình; danh sách từng món ở Excel)</div><table class="bc-bang sk-tom"><thead><tr><th>Chương trình · hình thức</th><th>Số món</th><th>Dư nợ</th><th>Kỳ tới sớm nhất</th></tr></thead><tbody>'+
        Object.keys(g).sort().map(function(k){ return '<tr><td>'+coChuHTML(k)+'</td><td class="s">'+g[k].mon+'</td><td class="s">'+tdnTien(g[k].dn)+'</td><td>'+(g[k].dau!=='9' ? ngayVNsl(g[k].dau) : '')+'</td></tr>'; }).join('')+
        '<tr class="tong"><td><b>Cộng</b></td><td class="s"><b>'+ls.length+'</b></td><td class="s"><b>'+tdnTien(t.dn)+'</b></td><td></td></tr></tbody></table></div>';
      return;
    }
    var tg = {dn:tien(t.dn, true), chua:tien(t.chua, true), toiT:tien(n===2 ? t.toi : 0, true)};
    b += '<tr class="tong">'+COT.map(function(c){ return c.k==='ten' ? '<td><b>Cộng ('+ls.length+')</b></td>' : (tg[c.k] || '<td'+(c.l ? ' class="'+c.l+'"' : '')+'></td>'); }).join('')+'</tr>';
    h += '<div class="bc-khung"><div class="bc-khung-ten">'+TEN[n]+' — '+ls.length+' món</div><table class="bc-bang"><thead><tr>'+COT.map(function(c){ return '<th'+(c.l==='c-sdt' ? ' class="c-sdt"' : '')+'>'+c.t+'</th>'; }).join('')+'</tr></thead><tbody>'+b+'</tbody></table></div>';
  });
  var ten = 'SAO KÊ NỢ ĐẾN HẠN KỲ CON — MÓN VAY TRẢ GỐC PHÂN KỲ';
  if(!T.mon) return {ten:'Phan ky', tieuDe:ten, ngay:ngay, aoa:[['Không có']], ngang:true, html:'<div class="bc-rong">Không có món vay trả gốc phân kỳ (NOXH, cho vay trực tiếp, ủy thác vay từ 01/03/2026) còn dư nợ trong phạm vi.</div>'};
  var nguon = SK_PK ? 'kỳ tới theo <b>file Nợ đến hạn phân kỳ ngày '+ngayVNsl(SK_PK.ngay)+'</b> (liệt kê kỳ đến hạn tới '+ngayVNsl(SK_PK.han)+')' : '<b>chưa nạp file Nợ đến hạn phân kỳ</b>';
  return {ten:'Phan ky', tieuDe:ten, ngay:ngay, aoa:aoa, ngang:true,
    html:'<div class="bc-tom">'+T.mon+' món (NOXH '+dem.noxh+' · cho vay trực tiếp '+dem.tt+' · ủy thác vay từ 01/03/2026 '+dem.moi+') · dư nợ <b>'+tdnTien(T.dn)+'</b> · ① kỳ đã đến hạn chưa trả <b>'+nh[1].length+' món / '+tdnTien(T.chua)+'</b>'+
      (nKhong ? ' (trong đó '+nKhong+' món vay trước 01/03/2026 — không chuyển QH kỳ con)' : '')+' · ② kỳ đến hạn đến '+ngayVNsl(den)+' <b>'+T.nToi+' món / '+tdnTien(T.toi)+'</b>'+(nCan ? ' (+ '+nCan+' món chưa biết số tiền kỳ — cần file phân kỳ)' : '')+' · '+nguon+(nUoc ? ' · '+nUoc+' món kỳ tới ước tính ≈' : '')+'</div>'+h+
      '<div class="bc-ghi">Món trả gốc phân kỳ = nhà ở xã hội (CT 12) + cho vay trực tiếp (không có mã tổ) + cho vay ủy thác qua tổ vay từ 01/03/2026 (Công văn 597/NHCS-TDNN; trừ HSSV STEM). Không trả đúng kỳ và không được điều chỉnh kỳ hạn (Mẫu 08/TD) → chuyển phần dư nợ của kỳ sang nợ quá hạn (Mẫu 14/TD); vay trước 01/03/2026 theo hợp đồng đã ký — không chuyển QH kỳ con (NOXH theo quy định riêng: có chuyển). Kỳ ĐH chưa trả = Gốc đến hạn lũy kế − gốc đã trả (Mẫu 31; đã trả lấy số lớn hơn giữa cột Gốc đã trả và tổng giải ngân − dư nợ). Kỳ tới: theo file Nợ đến hạn phân kỳ (số còn phải trả của kỳ); ≈ = app ước tính khi không có file (NOXH 6 tháng/kỳ, trực tiếp 12 tháng/kỳ, ngày theo GDXA, số tiền = (dư nợ − kỳ chưa trả) ÷ số kỳ còn lại, tròn xuống 100.000); ủy thác mới chỉ biết ngày kỳ đầu (ngày bắt đầu trả gốc). Hạn nộp 08/TD = ngày kỳ lùi 3 ngày làm việc (chưa trừ ngày lễ; hoặc chậm nhất ngày GDX cố định). * ở cột Kỳ ĐH chưa trả = vay trước 01/03/2026, không chuyển QH kỳ con (vẫn phải thu). Khoảng ngày ② theo ô "đến". Số dư 105 ghi 1 lần mỗi khách.</div>'};
}
/* D. danh sách nợ gốc đến hạn phân kỳ theo tổ — CBTD gửi tổ trưởng trước 30 ngày để thông báo khách (CV 597 mục I.3a) */
function skBCPKTo(M, ngay, e31){
  var C = skCH(), ns = e31.ngay, tu = C.tu || ns, den = C.den || tdnCuoiKy(kyLui(SK_K.thang, 1));
  var ds = skPKTinh(M, ns).filter(function(o){ return o.to && (o._chua>0 || (o._pk.toiNgay && o._pk.toiNgay>=tu && o._pk.toiNgay<=den)); })
    .sort(function(a, b){ var x = a._pk.toiNgay||'9', y = b._pk.toiNgay||'9'; return x<y ? -1 : x>y ? 1 : (a.kh<b.kh ? -1 : 1); });
  var r = skBang(['STT','Mã KH','Họ tên','Số KU','CT','Ngày đến hạn kỳ','Số tiền gốc kỳ','Kỳ trước chưa trả','Hạn nộp đề nghị ĐC (08/TD)','Ghi chú'], ds, function(o, i){
    var p = o._pk, coKy = p.toiNgay && p.toiNgay>=tu && p.toiNgay<=den;
    return [i, o.kh||'', o.ten||'', o.ku||'', ctNgan(o.ct, o), coKy ? ngayVNsl(p.toiNgay) : '', coKy && p.toiTien!==null ? (p.toiTien||0) : (coKy ? '(cần file)' : ''), o._chua||0, coKy ? ngayVNsl(o._h08) : '',
      (o._chua ? 'Kỳ '+(p.quaUoc ? '≈ ' : '')+ngayVNsl(p.quaNgay)+' chưa trả · ' : '')+(skKhongCQH(o) ? 'không chuyển QH kỳ con' : String(o.ct)==='12' ? 'NOXH: quá kỳ chuyển QH' : 'không trả, không ĐC → chuyển QH')+(p.uoc && coKy ? ' · số tiền ước tính' : '')]; }, [6, 7], function(o){ return o._chua ? 'nb' : ''; });
  return {ten:'DS no den han phan ky', tieuDe:'DANH SÁCH NỢ GỐC ĐẾN HẠN PHÂN KỲ TỪ '+ngayVNsl(tu)+' ĐẾN '+ngayVNsl(den), ngay:ngay, aoa:r.aoa,
    html:'<div class="bc-tom">'+ds.length+' món · gửi Tổ trưởng Tổ TK&VV thông báo khách hàng (tối thiểu 30 ngày trước kỳ). Khách chưa trả được đúng kỳ: đề nghị điều chỉnh tối thiểu 05 ngày làm việc trước kỳ; tổ trưởng nộp Mẫu 08/TD tối thiểu 03 ngày làm việc trước kỳ hoặc chậm nhất ngày giao dịch xã cố định.</div>'+r.html+
      '<div class="bc-ghi">Theo Công văn 597/NHCS-TDNN ngày 30/01/2026 (khoản vay ủy thác từ 01/03/2026). Dòng tô nền = có kỳ trước đến hạn chưa trả. Số tiền gốc kỳ theo file Nợ đến hạn phân kỳ; "(cần file)" = chưa nạp file nên app chưa biết số tiền kỳ. Hạn nộp 08/TD chưa trừ ngày lễ.</div>'};
}
SK_BC.push(
  {k:'qh', ten:'Sao kê nợ quá hạn', nhom:'xl', kho:'doc', lap:function(){ return skBCDanhSach('qh'); }},
  {k:'kh', ten:'Sao kê nợ khoanh', nhom:'xl', kho:'doc', lap:function(){ return skBCDanhSach('kh'); }},
  {k:'khd', ten:'Sao kê món vay 3 tháng không hoạt động', nhom:'xl', kho:'doc', lap:function(){ return skBCDanhSach('khd'); }},
  {k:'cgn', ten:'KU đã nhập máy chưa giải ngân (quá 1 tháng → cần đóng KU)', nhom:'xl', kho:'doc', lap:function(){ return skBC31('cgn'); }},
  {k:'dh', ten:'Sao kê nợ đến hạn (hạn hợp đồng + kỳ GDXA chuyển quá hạn)', nhom:'dh', kho:'doc', ngay:1, lap:function(){ return skBC31('dh'); }},
  {k:'noxh', ten:'Sao kê nợ đến hạn kỳ con — món vay trả gốc phân kỳ (NOXH · cho vay trực tiếp · ủy thác vay từ 01/03/2026)', nhom:'dh', kho:'doc', ngay:1, lap:function(){ return skBC31('noxh'); }},
  {k:'pkto', ten:'Danh sách nợ gốc đến hạn phân kỳ theo tổ — gửi tổ trưởng (CV 597)', nhom:'dh', kho:'doc', ngay:1, lap:function(){ return skBC31('pkto'); }},
  {k:'gn', ten:'Sao kê giải ngân trong tháng', nhom:'ps', kho:'doc', lap:function(){ return skBC31('gn'); }},
  {k:'ddn', ten:'Sao kê món vay có thay đổi dư nợ trong tháng', nhom:'ps', kho:'doc', lap:function(){ return skBC31('ddn'); }},
  {k:'m105', ten:'Sao kê khách giải ngân cần mở TK 105', nhom:'ps', kho:'doc', lap:function(){ return skBC31('m105'); }},
  {k:'sdt', ten:'Sao kê số điện thoại khách hàng (đánh dấu số trống / không đạt)', nhom:'kh', kho:'doc', lap:function(){ return skBC31('sdt'); }}
);
