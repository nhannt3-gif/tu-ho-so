/* 3.380 (anh 26/10 "nên có 1 data dựng sẵn từ kết hợp Mẫu 31, TK 105 và tổ"; "1 cột số tiền KH đã CK vào riêng… cột CK trả lãi và gốc để biết tổ đã CK bao nhiêu từ 105";
   "ký hiệu theo dõi" · thiết kế + kiểm file thật 25/10: docs/THIET_KE_HO_VAY.md · tên cột: docs/COT_FILE_MAU.md).
   HỘ VAY = 1 dòng / khách: món Mẫu 31 (dư nợ theo CT, lãi phải thu tháng, thu lãi / gốc tháng) + Sao kê TK 105 cùng ngày (số dư ngày BC, số dư tháng trước) + tổ.
   Nối theo MÃ KH (Sao kê ghi số TK 10 số, Mẫu 31 ghi số TK hệ thống 13–14 ký tự). Số dư lấy Sao kê (cộng các TK); thiếu Sao kê → số dư Mẫu 31, không có số đầu tháng.
   Khách chuyển vào 105 = (số dư ngày BC − số dư tháng trước) + trích trả lãi + trích trả gốc (giả định trả qua 105 — Mẫu 31 không ghi thu từ đâu; ký hiệu 💵? khi nghi tiền mặt).
   Chỉ ĐỌC. Cửa: KHO.hoVay(maTo) · KHO.hoVayKH(kh) (js/29); báo cáo Sao kê 'b105' (js/22h). */
var HV_KY = {ok:'🏦', cho:'⏳ chưa chuyển', tm:'💵? có thể tiền mặt', khongTK:'💵? không có TK 105', thieu:'🟠 thu < phải thu'};
function hvSo(v){ return typeof slSo==='function' ? slSo(v) : (+v || 0); }
function hvSaoKe(K){ return typeof kcTK==='function' ? kcTK(K, 'tk105') : null; }   /* 3.381: Sao kê TK 105 gắn theo mã KH ở KHO CHUẨN (js/73) → {ky, theo:{kh:[{stk, t105, t105d}]}} */
function hvGhep(rows, sk){   /* rows = dòng Mẫu 31 (món + dòng TK riêng) · sk = hvSaoKe(K) → [hộ vay] theo mã KH */
  var m = {}, ds = [];
  (rows||[]).forEach(function(o){ if(!o || !o.kh) return;
    var x = m[o.kh]; if(!x){ x = m[o.kh] = {kh:o.kh, ten:o.ten||'', to:'', mon:[], dn:0, ct:{}, laiDT:0, thuLai:{th:0, qh:0}, thuGoc:{th:0, qh:0, kn:0}, ngayGD:'', t31:0, stk31:[]}; ds.push(x); }
    if(!x.ten && o.ten) x.ten = o.ten;
    if((o.t105||0) > x.t31) x.t31 = o.t105;   /* số dư Mẫu 31 lặp ở mỗi món → lấy 1 lần (lớn nhất) */
    String(o.stk||'').split(/[,;\s]+/).forEach(function(s){ if(s && x.stk31.indexOf(s)<0) x.stk31.push(s); });
    if(!o.ku) return;
    if(o.to && !x.to) x.to = o.to;
    var lai = {th:hvSo(o.c_thu_lai_th_thang), qh:hvSo(o.c_thu_lai_qh_thang)}, goc = {th:o.tnTH||0, qh:o.tnQH||0, kn:o.tnK||0}, dt = hvSo(o.c_lai_dt_trong_thang);
    x.mon.push({ku:o.ku, ct:o.ct, dn:o.dn||0, laiDT:dt, thuLai:lai.th+lai.qh, thuGoc:goc.th+goc.qh+goc.kn, ngdg:o.ngdg||''});
    x.dn += o.dn||0; if((o.dn||0)>0){ var c = typeof ctNgan==='function' ? ctNgan(o.ct, o) : String(o.ct||''); x.ct[c] = (x.ct[c]||0)+(o.dn||0); }
    x.laiDT += dt; x.thuLai.th += lai.th; x.thuLai.qh += lai.qh; x.thuGoc.th += goc.th; x.thuGoc.qh += goc.qh; x.thuGoc.kn += goc.kn;
    if(o.ngdg && String(o.ngdg) > x.ngayGD) x.ngayGD = String(o.ngdg);
  });
  return ds.filter(function(x){ return x.mon.length && (x.dn>0 || x.laiDT>0 || x.thuLai.th+x.thuLai.qh+x.thuGoc.th+x.thuGoc.qh+x.thuGoc.kn>0); })   /* bỏ khách đã tất nợ từ tháng trước, tháng này không phát sinh */.map(function(x){ return hvTinh(x, sk); });
}
function hvTinh(x, sk){
  var tk = sk && sk.theo[x.kh];
  if(tk && tk.length){ var chon = ((typeof D!=='undefined' && D.cauHinh.tkChon) || {})['tk105|'+x.kh];   /* TK chính: anh đã chọn (js/28) → số dư lớn nhất */
    tk = tk.slice().sort(function(a, b){ return (b.stk===chon)-(a.stk===chon) || (b.t105||0)-(a.t105||0); }); }
  if(tk && tk.length) x.tk = {ds:tk.map(function(o){ return o.stk; }), chiTiet:tk.map(function(o){ return {stk:o.stk, cuoi:o.t105||0, dau:o.t105d||0}; }), cuoi:tk.reduce(function(a, o){ return a+(o.t105||0); }, 0), dau:tk.reduce(function(a, o){ return a+(o.t105d||0); }, 0), nguon:'Sao kê TK 105'};
  else if(x.stk31.length || x.t31) x.tk = {ds:x.stk31.filter(function(v){ return /^\d{10}$/.test(v); }), cuoi:x.t31, dau:null, nguon:'Mẫu 31'};   /* chỉ số sổ 10 số; số TK hệ thống 13–14 ký tự không in */
  else x.tk = null;
  var traLai = x.thuLai.th+x.thuLai.qh, traGoc = x.thuGoc.th+x.thuGoc.qh+x.thuGoc.kn, coDau = !!(x.tk && x.tk.dau!==null);
  var tg = coDau ? x.tk.cuoi-x.tk.dau : null, vao = coDau ? tg+traLai+traGoc : null;
  var ctK = Object.keys(x.ct);
  x.tinh = {traLai:traLai, traGoc:traGoc, tangGiam:tg, vao:vao, ctGhi:ctK.length>1 ? ctK.map(function(c){ return c+' '+ktTrHV(x.ct[c]); }).join(' + ') : ''};
  x.tinh.ky = !x.tk ? (traLai+traGoc>0 ? 'khongTK' : '') : (vao!==null && vao < -1 ? 'tm' : (x.laiDT>0 && traLai<=0 && (vao===null || vao<=1) ? 'cho' : (traLai>0 && traLai < x.laiDT-1 ? 'thieu' : (traLai+traGoc>0 ? 'ok' : ''))));
  return x;
}
function ktTrHV(n){ var s = (Math.round((n||0)/1e5)/10).toString().replace('.', ','); return s+' tr'; }   /* "HN 30 tr + GQVL 50 tr" */
function hvDung(maTo){ var K = KHO.kyDung(); if(!K || !maTo) return []; return hvGhep(kcTo(K, maTo).dong, hvSaoKe(K)); }
function hvDungKH(kh){ var K = KHO.kyDung(); if(!K || !kh) return null; var x = kcKH(K, kh), r = hvGhep(x ? x.dong : [], hvSaoKe(K)); return r[0] || null; }

/* ---------- báo cáo Sao kê 'b105' (js/22h skBaoCao): phạm vi cây, chia theo tổ, cộng tổ ---------- */
function hvBaoCao(rows, ngay){
  var K = SK_K, sk = hvSaoKe(K), ds = hvGhep(rows, sk).sort(function(a, b){ return a.kh<b.kh ? -1 : 1; });
  var ten = 'Sao kê biến động TK 105 — khách chuyển vào, trích trả lãi / gốc';
  var nhan = function(x){ return [x.tinh.ky ? HV_KY[x.tinh.ky] : '', x.tk && x.tk.chiTiet && x.tk.chiTiet.length>1 ? x.tk.chiTiet.length+' TK 105 (số dư cộng chung): '+x.tk.chiTiet.map(function(c){ return c.stk+' '+tdnTien(c.cuoi); }).join(' · ') : '', sk && x.tk && x.tk.nguon==='Mẫu 31' ? 'số dư theo Mẫu 31, không có trong Sao kê' : '', x.tinh.ctGhi].filter(Boolean).join(' · '); };
  /* 3.380.1 (anh xem bản in 26/10): tiêu đề ghi rõ ngày số dư; cột liên quan đứng cạnh nhau (đầu kỳ → khách vào → phải thu / trả lãi → trả gốc → cuối kỳ); chữ 10 pt; Ghi chú xuống dòng, không mất chữ · 3.380.1 (anh "ghi chú thu nhỏ chữ hết mức cho gọn"): 7,5 pt */
  var nC = sk ? String(sk.ky) : String(K.ngay), nD = tdnCuoiKy(kyLui(nC.slice(0, 7), -1));
  var r = skBang(['STT','Mã KH','Họ tên','Dư nợ','Số TK 105','Số dư cuối tháng trước '+ngayVNsl(nD),'Khách chuyển vào','Lãi phải thu tháng','Trích trả lãi','Trích trả gốc','Số dư đến hết ngày '+ngayVNsl(nC),'Tăng / giảm','Ngày GD gần nhất','Ghi chú'], ds,
    function(x, i){ var t = x.tinh, tk = x.tk; return [i, x.kh, x.ten, x.dn, !tk || !tk.ds.length ? '' : (tk.ds.length>1 ? {h:'<b>'+coChuHTML(tk.ds[0])+'</b>'} : tk.ds[0]), tk && tk.dau!==null ? tk.dau : '', t.vao===null ? '' : t.vao, x.laiDT, t.traLai, t.traGoc,
      tk ? tk.cuoi : '', t.tangGiam===null ? '' : t.tangGiam, ngayVNsl(x.ngayGD), {h:coChuHTML(nhan(x)), lop:'gc'}]; },
    [3, 5, 6, 7, 8, 9, 10, 11], function(x){ return x.tinh.ky==='tm' || x.tinh.ky==='khongTK' || x.tinh.ky==='cho' ? 'nb' : ''; });
  r.html = '<style>.trang table.hv105,.trang.doc table.hv105{font-size:8.5pt;width:100%}.trang table.hv105 th{white-space:normal;font-size:8pt}.trang table.hv105 td{padding:1px 3px}.trang table.hv105 td.gc{white-space:normal;min-width:20mm;font-size:7pt;line-height:1.1}.hv105-gc{font-size:7pt;line-height:1.1;display:block}</style>'   /* 3.386.1 (anh 27/10 "cột ghi chú bị mất, có thể cho font nhỏ lại để hiện gọn hơn"): 8,5 pt · tiêu đề 8 · ghi chú 7 */+r.html.replace('<table class="bc-bang">', '<table class="bc-bang hv105">');
  var dem = {}, cong = {vao:0, lai:0, goc:0}; ds.forEach(function(x){ dem[x.tinh.ky||'khac'] = (dem[x.tinh.ky||'khac']||0)+1; if((x.tinh.vao||0) > 0) cong.vao += x.tinh.vao; cong.lai += x.tinh.traLai; cong.goc += x.tinh.traGoc; });
  var nVao = ds.filter(function(x){ return (x.tinh.vao||0) > 1; }).length;
  var skChu = sk ? 'Sao kê TK 105 ngày '+ngayVNsl(String(sk.ky))+(String(sk.ky)!==String(K.ngay) ? ' <b class="do">(khác ngày Mẫu 31 '+ngayVNsl(K.ngay)+' — nạp Sao kê cùng ngày cho đúng)</b>' : '') : '<b class="do">chưa nạp Sao kê TK 105</b> — số dư lấy Mẫu 31, không tính được khách chuyển vào';
  return {ten:'Bien dong TK 105', tieuDe:'SAO KÊ BIẾN ĐỘNG TK 105 — KHÁCH CHUYỂN VÀO, TRÍCH TRẢ LÃI / GỐC', ngay:ngay+' · từ đầu tháng', aoa:r.aoa,
    html:'<div class="bc-tom">'+ds.length+' khách vay · <b>'+nVao+'</b> khách đã chuyển vào '+tdnTien(cong.vao)+' đ · tổ trưởng đã trích 105 trả lãi <b>'+tdnTien(cong.lai)+'</b> đ, trả gốc <b>'+tdnTien(cong.goc)+'</b> đ'+
      ' · ⏳ chưa chuyển '+(dem.cho||0)+' · 💵? '+((dem.tm||0)+(dem.khongTK||0))+' · 🟠 thu &lt; phải thu '+(dem.thieu||0)+'<span class="hv105-gc">'+skChu+'. Khách chuyển vào = (số dư đến ngày − số dư cuối tháng trước) + trích trả lãi + trích trả gốc (coi như trả qua TK 105; '+
      'Mẫu 31 không ghi thu từ TK nào → 💵? = nghi nộp tiền mặt / rút tiền). Lãi tiền gửi 105 nhập vào TK (nếu có) tính chung vào khách chuyển vào.</span></div>'+r.html};
}
