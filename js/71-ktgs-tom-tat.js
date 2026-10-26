/* 3.379 (anh 26/10 "khi chọn kiểm tra đột xuất tổ nào đó thì thêm 1 chức năng tóm tắt tình hình tổ, từ tổng quan dư nợ, nợ quá hạn, lãi tồn, các hộ cần quan tâm
   tất cả trong 1 mặt A4, để cán bộ đi kiểm tra có thông tin" · demo bản 2 anh duyệt: 8 ô số gọn, nội dung kiểm tra gom nhóm theo 727, mục V "Kết quả kiểm tra thực tế, đề nghị";
   "dài hơn có thể 2 trang vẫn được nhưng nên tóm gọn 1 mặt", "nhớ ghi số liệu đến ngày").
   📋 Tóm tắt tổ — nút ở 🎯 Kiểm tra đột xuất (cạnh 📋 Mẫu 04) và 📅 định kỳ (mỗi dòng tổ 📋 + "📋 Tóm tắt n tổ" đã chọn, mỗi tổ 1 trang) → bản In / PDF. Chỉ ĐỌC số liệu (ktSoTo, ktHo, ktDsDon), không ghi gì. */
var KTTT_TOI_DA = 18;   /* bảng hộ cần quan tâm: quá số này thì "… và n hộ khác" (giữ 1 mặt A4) */
var KTTT_ND = [['1. Tổ chức, hoạt động của Tổ', ['Thành lập theo cụm dân cư; Ban quản lý có phân công', 'Sinh hoạt định kỳ theo quý, đúng thành phần', 'Bình xét cho vay công khai, đúng đối tượng']],
  ['2. Thực hiện hợp đồng ủy nhiệm', ['Thu lãi, thu tiết kiệm đúng quy định, có biên lai', 'Đôn đốc trả nợ, nợ quá hạn, lãi tồn (mục III)', 'Không thu phí, không giữ tiền của tổ viên']],
  ['3. Sử dụng vốn vay', ['Hộ mới giải ngân dùng vốn đúng mục đích (mục III)', 'Tổ viên nắm dư nợ, lãi phải trả, hạn trả']],
  ['4. Sổ sách, lưu trữ, công khai', ['Sổ sách, biên bản họp Tổ lưu giữ đủ', 'Công khai danh sách, dư nợ tại điểm giao dịch']]];   /* căn cứ Bảng II Mẫu 16 — văn bản 727 */

var KTTT_CSS = '@page{size:A4;margin:10mm 12mm 10mm 15mm}'+'body{margin:0;font-family:"Times New Roman",Times,serif;color:#000;font-size:11.5pt;line-height:1.3}h1{font-size:14pt;text-align:center;margin:0 0 2pt}.phu{text-align:center;font-style:italic;font-size:10.5pt;margin-bottom:6pt}'+
    '.dau{display:flex;justify-content:space-between;gap:8mm;font-size:10.5pt;border-bottom:1px solid #000;padding-bottom:3pt;margin-bottom:5pt}h2{font-size:11.5pt;margin:7pt 0 3pt;text-transform:uppercase;break-after:avoid}'+
    'table{width:100%;border-collapse:collapse;font-size:10.5pt}th,td{border:.5pt solid #000;padding:1.5pt 4pt;vertical-align:top}th{background:#eee}tr{break-inside:avoid}.nho td{font-size:9.5pt;padding:1pt 3pt}'+
    '.so{text-align:right;white-space:nowrap}.c{text-align:center}.do{color:#b00000;font-weight:bold}'+
    '.o4{display:grid;grid-template-columns:repeat(4,1fr);border-top:.5pt solid #000;border-left:.5pt solid #000;font-size:10pt}.o4 div{border-right:.5pt solid #000;border-bottom:.5pt solid #000;padding:1.5pt 4pt;line-height:1.25}.o4 b{font-size:10.5pt}.o4 small{display:block;font-size:9pt;color:#333}'+
  '.nhom{display:grid;grid-template-columns:1fr 1fr;gap:2pt 8mm;font-size:10.5pt}.nhom div{break-inside:avoid}.nhom p{margin:0}.nhom .t{font-weight:bold}.dong{border-bottom:.5pt dotted #555;height:15pt}.kttt+.kttt{break-before:page}';
function ktttSo(t){   /* số liệu tóm tắt 1 tổ — dữ liệu thuần, phép thử đọc thẳng */
  var s = ktSoTo(t), hs = [], d = ktDsDon(t), ns = KT_K.ngay, moi30 = ktNgayTru(ns, 30), ct = {}, soMon = 0, nTK = 0, nLT = 0, monKHD = 0, hoKHD = 0, gn = {n:0, tien:0};
  try { hs = ktHo(t); } catch(e){}
  var ltc = {}; d.ltc.forEach(function(x){ ltc[x.ten] = x.th; });
  var ds = hs.map(function(h){ var v = [], uu = 9, ten = tenHoaDau(h.ten);
    soMon += h.mon.length; if(h.t105>0) nTK++; if(h.lt>0) nLT++; if(h.khd.length){ monKHD += h.khd.length; hoKHD++; }
    h.mon.forEach(function(m){ var k = ctNgan(m.ct, m) || 'Khác'; ct[k] = (ct[k]||0)+(m.dn||0); });
    if(h.qh>0){ v.push({do:1, chu:'Quá hạn '+ktTr(h.qh)+' tr'}); uu = 1; }
    if(h.kn>0){ v.push({do:1, chu:'Nợ khoanh '+ktTr(h.kn)+' tr'}); uu = Math.min(uu, 1); }
    if(h.khd.length){ v.push({chu:'Không giao dịch ≥ 3 tháng'+(h.khd.length>1 ? ' ('+h.khd.length+' món)' : '')+(h.khd[0].ngdg ? ', GD gần nhất '+ngayVNsl(h.khd[0].ngdg) : '')}); uu = Math.min(uu, 2); }
    if(h.lt>0){ v.push({chu:'Lãi tồn '+tdnTien(h.lt)+' đ'+(ltc[ten] ? ' ('+ltc[ten]+' tháng lãi)' : '')}); uu = Math.min(uu, ltc[ten] ? 2 : 3); }
    if(!(h.t105>0)){ v.push({chu:'Không gửi tiết kiệm'}); uu = Math.min(uu, 4); }   /* chỉ hộ không có số dư 105 — "105 không tăng" quá nhiều hộ, không liệt kê */
    h.moi30.forEach(function(m){ gn.n++; gn.tien += m.dn||0; });
    if(h.moi30.length){ v.push({chu:'Mới giải ngân '+h.moi30.map(function(m){ return ktTr(m.dn)+' tr ngày '+ngayVNsl(m.ngn || m.nv); }).join(', ')+' — kiểm tra sử dụng vốn'}); uu = Math.min(uu, 5); }
    return {kh:h.kh, ten:ten, dn:h.dn, v:v, uu:uu};
  }).filter(function(x){ return x.v.length; }).sort(function(a, b){ return a.uu-b.uu || b.dn-a.dn; });
  return {t:t, s:s, ngay:s.ngay || ns, nguon:s.nguon || '', soMon:soMon, nTK:nTK, nLT:nLT, nLTC:d.ltc.length, nQH:d.qh.length, monKHD:monKHD, hoKHD:hoKHD, gn:gn,
    ct:Object.keys(ct).filter(function(k){ return ct[k]>0; }).sort(function(a, b){ return ct[b]-ct[a]; }).map(function(k){ return [k, ct[k]]; }), ho:ds};
}
function ktttThan(x){
  var t = x.t, s = x.s, e = coChuHTML, stv = s.stv || 0, diem = t.diem ? (typeof gdxMaDu==='function' ? gdxMaDu(t.diem, t.maXa || t.xa) : t.diem) : '';
  var o = function(nhan, so, phu, lop){ return '<div>'+nhan+': <b'+(lop ? ' class="'+lop+'"' : '')+'>'+so+'</b><small>'+(phu || '&nbsp;')+'</small></div>'; };
  var ho = x.ho.slice(0, KTTT_TOI_DA), con = x.ho.length-ho.length, nho = x.ho.length>12 ? ' nho' : '';
  var ct = x.ct.length>8 ? x.ct.slice(0, 7).concat([['Khác', x.ct.slice(7).reduce(function(a, c){ return a+c[1]; }, 0)]]) : x.ct;
  return '<section class="kttt">'+
    
    '<h1>TÓM TẮT TÌNH HÌNH TỔ TIẾT KIỆM VÀ VAY VỐN</h1><div class="phu">(Tài liệu nội bộ chuẩn bị kiểm tra — số liệu đến ngày '+ngayVNsl(x.ngay)+(x.nguon ? ', nguồn '+e(x.nguon) : '')+')</div>'+
    '<div class="dau"><span><b>Tổ:</b> '+e(t.ten || '')+' (mã '+e(t.ma)+')'+(t.tenThon ? ' · '+e(ktApTen(t.tenThon) ? ktCapAp(t.tenXa).replace(/^./, function(c){ return c.toUpperCase(); })+' '+ktApTen(t.tenThon) : t.tenThon) : '')+(t.tenXa ? ' · '+e(t.tenXa) : '')+
      '<br><b>Hội:</b> '+e(t.dv && String(t.dv)!=='99' ? ktHoiTen(t) : '—')+(diem || t.tenDiem ? ' · <b>Điểm GD:</b> '+e([diem, t.tenDiem].filter(Boolean).join(' — '))+(t.ngayGD ? ' · ngày '+e(String(t.ngayGD)) : '') : '')+'</span>'+
      '<span style="text-align:right;white-space:nowrap"><b>Tổ trưởng:</b> '+e(t.ten || '')+'<br><b>Ngày kiểm tra:</b> '+(KT_KB.ngay ? ngayVNsl(KT_KB.ngay) : '....../....../20.....')+'</span></div>'+
    '<h2>I. Tổng quan</h2><div class="o4">'+
      o('Dư nợ', ktTr(s.dn)+' tr', stv+' tổ viên · '+x.soMon+' món')+
      o('Nợ quá hạn', s.qh ? ktTr(s.qh)+' tr' : '0', s.qh ? ktPT(s.tlQH)+'% · '+x.nQH+' hộ' : '', s.qh ? 'do' : '')+
      o('Lãi tồn', s.lt ? ktTr(s.lt)+' tr' : '0', s.lt ? x.nLT+' hộ'+(x.nLTC ? ' · '+x.nLTC+' hộ &gt; 6 tháng lãi' : '') : '')+
      o('Tiết kiệm', ktTr(s.tg)+' tr', stv ? x.nTK+'/'+stv+' hộ có gửi ('+Math.round(x.nTK/stv*100)+'%)' : '')+
      o('Nợ khoanh', s.kn ? ktTr(s.kn)+' tr' : '0', s.kn ? ktPT(s.tlKN)+'%' : '', s.kn ? 'do' : '')+
      o('Chấm điểm'+(s.ngayXL ? ' '+ngayVNsl(s.ngayXL).slice(3) : ''), s.diem!=='' && s.diem!==undefined ? String(s.diem).replace('.', ',') : '—', s.xl ? 'xếp loại '+e(s.xl) : 'chưa nạp BC0437')+
      o('Không GD ≥ 3 tháng', x.monKHD+' món', x.hoKHD ? x.hoKHD+' hộ' : '')+
      o('Giải ngân 30 ngày', x.gn.n+' món', x.gn.n ? ktTr(x.gn.tien)+' tr · KT sử dụng vốn' : '')+'</div>'+
    (ct.length ? '<h2>II. Dư nợ theo chương trình (triệu đồng)</h2><table><tr>'+ct.map(function(c){ return '<th>'+e(c[0])+'</th>'; }).join('')+'</tr><tr>'+ct.map(function(c){ return '<td class="so">'+ktTr(c[1])+'</td>'; }).join('')+'</tr></table>' : '')+
    '<h2>III. Hộ cần quan tâm ('+x.ho.length+' hộ — xếp theo mức ưu tiên)</h2>'+
    (ho.length ? '<table class="'+nho+'"><tr><th style="width:5%">TT</th><th style="width:22%">Họ tên</th><th style="width:10%">Dư nợ (tr)</th><th>Vấn đề</th><th style="width:20%">Ghi chú khi kiểm tra</th></tr>'+
      ho.map(function(h, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+e(h.ten)+'</td><td class="so">'+ktTr(h.dn)+'</td><td>'+h.v.map(function(v){ return v.do ? '<span class="do">'+e(v.chu)+'</span>' : e(v.chu); }).join(' · ')+'</td><td></td></tr>'; }).join('')+
      (con ? '<tr><td colspan="5"><i>… và '+con+' hộ khác (xem tab KTGS)</i></td></tr>' : '')+'</table>' : '<p><i>Không có hộ quá hạn, khoanh, lãi tồn, không giao dịch hay mới giải ngân.</i></p>')+
    '<h2>IV. Nội dung kiểm tra (căn cứ văn bản 727)</h2><div class="nhom">'+KTTT_ND.map(function(n){ return '<div><p class="t">'+n[0]+'</p>'+n[1].map(function(y){ return '<p>☐ '+y+'</p>'; }).join('')+'</div>'; }).join('')+'</div>'+
    '<h2>V. Kết quả kiểm tra thực tế, đề nghị</h2>'+Array(5).join('<div class="dong"></div>')+'</section>';
}
function ktttHTML(x){ return ktttVo([x]); }
function ktttVo(ds){   /* 1 hoặc nhiều tổ (định kỳ) — mỗi tổ bắt đầu trang mới */
  return '<!doctype html><html><head><meta charset="utf-8"><title>Tom tat to</title><style>'+KTTT_CSS+'</style></head><body>'+ds.map(ktttThan).join('')+'</body></html>'; }
function ktttIn(ma){   /* ma = 1 tổ (dòng bảng định kỳ); không có → tổ đang chọn (đột xuất) */
  var t = KT_K && KT_K.to[ma || ktCH().to]; if(!t) return bao('Chọn 1 tổ trước.', 3);
  ktttInDs([t]);
}
function ktttInDs(ts){   /* 3.379 (anh "áp cho kiểm tra định kỳ và đột xuất"): định kỳ = số liệu cuối tháng, BC0437 cùng tháng (KT_SO_CUNG như Mẫu 16) */
  if(!ts.length) return bao('Chưa chọn tổ nào.', 3);
  if(typeof ktDocKB==='function') ktDocKB();
  var dk = typeof ktCheDo==='function' && ktCheDo()==='dk', ds;
  if(dk) KT_SO_CUNG = true;
  try { ds = ts.map(ktttSo); } finally { if(dk) KT_SO_CUNG = false; }
  inBlob(new Blob([ktttVo(ds)], {type:'text/html'}), 'Tom tat to '+(ts.length>1 ? ts.length+' to' : boDauTen(ts[0].ten || ts[0].ma))+' - so lieu '+ngayVNsl(ds[0].ngay).replace(/\//g, '-')+'.html');
}
if(typeof GD!=='undefined') GD.dangKy('kttt', {in:function(el){ ktttIn(el && el.getAttribute('data-m')); }, dk:function(){ ktttInDs(ktDKDs().filter(function(r){ return r.chon; }).map(function(r){ return r.t; })); }});
