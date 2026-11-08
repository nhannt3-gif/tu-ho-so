/* ===== js/56b-ktgs-727.js — 3.498 (anh 07/11/2026 "VB 727 còn 2 mẫu này em đưa vào phần kiểm tra giám sát"): 🛡 KTGS — 2 MẪU MỚI VB 727/HD-NHCS =====
   📄 15/TD  Danh sách đối chiếu số dư tiền vay và tiền gửi (theo TỔ, A4 ngang) — in TOÀN BỘ tổ viên còn dư nợ / lãi tồn / tiền gửi (anh chốt; QT-22, cửa KHO.doiChieu,
             cùng danh sách với 02/BG Hồ sơ Tổ); nợ lãi = lãi tồn (anh chốt); cột đối chiếu tại khách / chênh lệch / nguyên nhân / chữ ký ghi tay.
   🏛 03/BB-CX Biên bản kiểm tra hoạt động nhận ủy thác của tổ chức CT-XH CẤP XÃ (Hội × xã) — mục I tự điền (số tổ, thôn, khách, dư nợ, NQH, khoanh, xếp loại tổ BC0437);
             mẫu gốc thiếu mục III → anh chốt sửa III, IV; đoàn kiểm tra NHCSXH + người của Hội (🏛 Khai báo Hội – xã) — các phần nhận xét chấm ghi tay.
   Gói KTGS (QUY_CHUAN 1b): tiền tố kt7…, KHÔNG sửa mẫu đã khóa (06 / 16 / 04 / Kế hoạch); số liệu theo khối: khối A = Mẫu 31 chốt cuối tháng liền trước (ktNguonVoi),
   khối B = kỳ đầu trang (KT_K). Word = khuôn từ file gốc tests/mau_goc/15td.docx · 03bbcx.docx (tools/khuon_727.py → js/khuon/kt727.js) — 3.503 qua khung chung MAU_IN (js/31b).
   3.500: 03/BB-CX ở khối riêng 🏛 Hội cấp xã (thanh khối KTGS — kt7HXVe); 15/TD ở cấp tổ (khối B, Định kỳ).
   Cắm rút: bỏ dòng <script> → mất nút 15/TD và khối 🏛 Hội cấp xã, KTGS cũ không đổi (các chỗ gọi đều kiểm typeof kt727Nut). ===== */
var KT7 = {mau:'', tu:'', gts:[], x:null};


/* ---------- NGHIỆP VỤ (thuần theo số liệu đang dựng — gọi trong ktNguonVoi / kỳ khối B) ---------- */
function kt7Tien(v){ return v ? tdnTien(v) : ''; }
/* 15/TD 1 tổ → {f:{PGD, XA, HOI, DEN, TT, MATO, DC}, kh:[{ten, dn, lt, t105, mon:[{ct, ku, dn, lt}]}], tong:{dn, lt, t105}} */
function kt15DL(t){
  var c = ktChuan(t), kh = KHO.doiChieu(t).map(function(k){ return {ten:k.ten, dn:k.dn||0, lt:k.lt||0, t105:k.t105||0,
    mon:k.mon.map(function(m){ return {ct:ctTenMon(m), ku:m.ku||'', dn:m.dn||0, lt:laiTon(m)||0}; })}; });
  var tong = {dn:0, lt:0, t105:0}; kh.forEach(function(k){ tong.dn += k.dn; tong.lt += k.lt; tong.t105 += k.t105; });
  var ten = String(t.ten || '').trim();   /* tên tổ = tên tổ trưởng (như 12/GDX, 02/BG) */
  return {t:t, f:{PGD:typeof hsoPGD==='function' ? hsoPGD('ngan') : '', XA:String(t.tenXa||'').replace(/^(xã|phường|thị trấn|đặc khu)\s+/i, ''), HOI:String(c.ten||'').replace(/^Hội\s+/i, ''),
    DEN:KT_K && KT_K.ngay ? ngayVNsl(KT_K.ngay) : '', TT:ten, MATO:String(t.ma||''), DC:String(t.tenThon||'')+(t.tenThon && t.tenXa ? ', ' : '')+ktXaChu(t.tenXa)}, kh:kh, tong:tong};
}
/* 03/BB-CX 1 Hội – xã (k = 'xa|dv') → số liệu mục I + người */
function kt03DL(k, kb){
  kb = kb || {}; var p = k.split('|'), xa = p[0], dv = p[1], ds = [], thonXa = {}, thonHoi = {};
  Object.keys(KT_K.to).forEach(function(m){ var t = KT_K.to[m]; if(t.xa!==xa) return; if(t.thon) thonXa[t.thon] = 1; if(toLaTT(t) || String(t.dv)!==dv) return; ds.push(t); if(t.thon) thonHoi[t.thon] = 1; });
  var t0 = ds[0] || {xa:xa, dv:dv, tenXa:''}, c = ktChuan(t0), daKH = {}, s = {kh:0, dn:0, qh:0, kn:0}, xl = {tot:0, kha:0, tb:0, yeu:0, co:0}, b37 = KT_BC && KT_BC.k37 && KT_BC.k37.theoTo;
  ds.forEach(function(t){ KHO.toVien(t).forEach(function(x){ if(!(x.dn>0)) return; if(!daKH[x.kh]){ daKH[x.kh] = 1; s.kh++; } s.dn += x.dn; s.qh += x.qh||0; s.kn += x.kn||0; });
    var b = b37 && b37[t.ma], v = b ? slChuan(b.xepLoai || '') : ''; if(!v) return; xl.co++;
    if(/^tot/.test(v)) xl.tot++; else if(/^kha/.test(v)) xl.kha++; else if(/trung/.test(v)) xl.tb++; else if(/yeu|kem/.test(v)) xl.yeu++; });
  var tr = function(v){ return v ? (Math.round(v/1e4)/100).toLocaleString('vi-VN') : '0'; }, pt = function(a){ return s.dn ? (Math.round(a/s.dn*10000)/100).toLocaleString('vi-VN') : '0'; };
  var ng = String(kb.ngay || ''), m = ng.match(/^(\d{4})-(\d{2})-(\d{2})/), ct = ktNguoi(t0, 'ct'), pct = ktNguoi(t0, 'pct');
  var f = {DVKT:typeof hsoPGD==='function' && hsoPGD('ngan') ? 'PGD NHCSXH '+String(hsoPGD('ngan')).toUpperCase() : '', NG:m ? m[3] : '', TH:m ? m[2] : '', NAM:m ? m[1] : '',
    DOAN:typeof hsoPGD==='function' ? hsoPGD('ten') : '', CB1:kb.cb1 || '', CV1:kb.cb1 ? kb.cv1 || '' : '', CB2:kb.cb2 || '', CV2:kb.cb2 ? kb.cv2 || '' : '',
    HOI:String(c.ten||'').replace(/^Hội\s+/i, ''), XA:String(t0.tenXa||'').replace(/^(xã|phường|thị trấn|đặc khu)\s+/i, ''), HB1:ct.cb, HV1:ct.cb ? ct.cv : '', HB2:pct.cb, HV2:pct.cb ? pct.cv : '',
    HOIXA:String(c.ten||'').replace(/^Hội\s+/i, '')+' '+ktXaChu(t0.tenXa), TDIEM:KT_K && KT_K.ngay ? ngayVNsl(KT_K.ngay) : '',
    STO:String(ds.length), STH1:String(Object.keys(thonHoi).length), STH2:String(Object.keys(thonXa).length), SKH:String(s.kh), DN:tr(s.dn), NQH:tr(s.qh), TLQH:pt(s.qh), NK:tr(s.kn), TLNK:pt(s.kn)};
  if(xl.co){ f.X0 = String(ds.length); f.X1 = String(xl.tot); f.X2 = String(xl.kha); f.X3 = String(xl.tb); f.X4 = String(xl.yeu); }
  return {k:k, t:t0, f:f, soTo:ds.length, coXL:!!xl.co};
}

/* ---------- MẪU IN (HTML — xem trước / In / PDF; Word theo khuôn gốc) ---------- */
function kt7O(v, n){ v = v==null ? '' : String(v); return v ? '<span class="o-sl">'+coChuHTML(v)+'</span>' : new Array((n||20)+1).join('.'); }
function kt15HTML(g){
  var f = g.f, th = function(x, cs, rs){ return '<td class="c b"'+(cs ? ' colspan="'+cs+'"' : '')+(rs ? ' rowspan="'+rs+'"' : '')+'>'+x+'</td>'; }, rong = '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
  var o = function(v, b){ return '<td class="r'+(b ? ' b' : '')+'">'+kt7Tien(v)+'</td>'; };
  var r = '<thead><tr>'+th('STT', 0, 2)+th('Họ và tên khách hàng/ Chương trình', 0, 2)+th('Mã khoản vay', 0, 2)+th('Số liệu tại NHCSXH', 3)+th('Số liệu đ/chiếu tại khách hàng', 3)+th('Chênh lệch (+,-)', 3)+th('Nguyên nhân chênh lệch', 0, 2)+th('Chữ ký của khách hàng', 0, 2)+'</tr>'+
    '<tr>'+[1, 2, 3].map(function(){ return th('Nợ gốc')+th('Nợ lãi')+th('Số dư tiền gửi'); }).join('')+'</tr>'+
    '<tr>'+['1','2','3','4','5','6','7','8','9','10=4-7','11=5-8','12=6-9','13','14'].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr></thead>';
  g.kh.forEach(function(k, i){ r += '<tbody class="kt-ho"><tr><td class="c b">'+(i+1)+'</td><td class="b">'+coChuHTML(k.ten)+'</td><td class="c b">x</td>'+o(k.dn, 1)+o(k.lt, 1)+o(k.t105, 1)+rong+'</tr>';
    k.mon.forEach(function(m){ r += '<tr><td></td><td class="i">'+coChuHTML(m.ct)+'</td><td class="c">'+coChuHTML(m.ku)+'</td>'+o(m.dn)+o(m.lt)+'<td></td>'+rong+'</tr>'; }); r += '</tbody>'; });
  r += '<tbody>'; if(!g.kh.length) for(var i=0;i<6;i++) r += '<tr><td class="c">'+(i ? '' : '1')+'</td><td></td><td></td><td></td><td></td><td></td>'+rong+'</tr>';
  r += '<tr><td></td><td class="c b">Tổng cộng</td><td></td>'+o(g.tong.dn, 1)+o(g.tong.lt, 1)+o(g.tong.t105, 1)+rong+'</tr></tbody>';
  return hsoBang('khung0', [1.3, 1], '<tr><td><p class="b">PHÒNG GIAO DỊCH NHCSXH '+kt7O(f.PGD ? f.PGD.toUpperCase() : '', 26)+'</p><p class="b">Xã '+kt7O(f.XA, 40)+'</p><p class="b">Hội '+kt7O(f.HOI, 34)+'</p></td>'+
      '<td class="r"><p class="r b s11">Mẫu số: 15/TD</p><p class="r i s11">Lập 02 liên:</p><p class="r i s11">- 01 liên chính lưu NH;</p><p class="r i s11">- 01 liên phô tô lưu Đ.v k.tra</p></td></tr>')+
    '<p class="c b s14 tr">DANH SÁCH ĐỐI CHIẾU SỐ DƯ TIỀN VAY VÀ TIỀN GỬI</p><p class="c b">Đến ngày '+(f.DEN ? kt7O(f.DEN) : '............./.............../.................')+'(*)</p>'+
    hsoBang('khung0', [1, 1, 1.6], '<tr><td><p>Tổ trưởng: '+kt7O(f.TT, 30)+'</p></td><td><p>Mã Tổ: '+kt7O(f.MATO, 20)+'</p></td><td><p>Địa chỉ: '+kt7O(f.DC, 50)+'</p></td></tr>')+
    '<p class="r i s11">Đơn vị tính: đồng</p>'+hsoBang('luoi s10', [4, 17, 10, 8.5, 6.5, 7, 6, 5, 6, 6, 5, 6, 7, 6.5], r)+
    '<p class="i s11 tr">Chú ý: - (*): Ghi thời điểm chốt số liệu tại Ngân hàng để đi đối chiếu</p>'+
    '<p class="i s11">- Cột 13 ghi các nguyên nhân chênh lệch, bao gồm: do phát sinh sau ngày chốt số liệu tại Ngân hàng, do bị chiếm dụng, vay ké. Trường hợp chênh lệch do bị chiếm dụng, vay ké cán bộ đối chiếu phải lập thêm biên bản riêng đối với từng khách hàng bị chiếm dụng, vay ké.</p>'+
    hsoBang('khung0 hso-ky', [1.3, 1], '<tr><td></td><td class="c"><p class="c b tr">CÁN BỘ ĐỐI CHIẾU</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td></tr>');
}
function kt03HTML(g){
  var f = g.f, P = function(x, lop){ return '<p class="'+(lop || 'j')+'">'+x+'</p>'; }, ch = function(n){ var h = ''; for(var i=0;i<n;i++) h += P(new Array(131).join('.'), 'cham'); return h; };
  var nd = [['1. Công tác tuyên truyền, vận động', 1, 1], ['2. Công tác kiểm tra, giám sát hoạt động ủy thác của Tổ, Ban quản lý Tổ và tổ viên Tổ TK&amp;VV', 1, 1], ['3. Công tác tập huấn', 1, 1],
    ['4. Hoạt động phối hợp thực hiện cùng NHCSXH', 1, 1], ['5. Trách nhiệm của tổ chức CT-XH cấp xã', 1, 1]];
  var xl = function(p){ return ['', 0, 1, 2, 3, 4].map(function(i){ return i==='' ? '' : '<td class="c">'+coChuHTML(f[p+i] || '')+'</td>'; }).join(''); };
  return hsoBang('khung0', [1, 1.4], '<tr><td class="c"><p class="r i s11" style="text-align:left">Mẫu số 03/BB-CX</p><p class="c b">ĐƠN VỊ KIỂM TRA</p><p class="c b">'+kt7O(f.DVKT, 40)+'</p></td>'+
      '<td class="c">'+hsoQH('-', 13)+'</td></tr>')+
    '<p class="c b s14 tr3">BIÊN BẢN KIỂM TRA</p><p class="c b">Hoạt động nhận ủy thác với NHCSXH của tổ chức CT-XH cấp xã</p>'+
    P('Hôm nay, ngày '+kt7O(f.NG, 4)+' tháng '+kt7O(f.TH, 5)+' năm '+(f.NAM ? kt7O(f.NAM) : '20....')+', chúng tôi gồm:', 'tr')+
    P('<b>ĐOÀN KIỂM TRA:</b> '+kt7O(f.DOAN, 88))+P('- Ông (bà): '+kt7O(f.CB1, 49)+' Chức vụ: '+kt7O(f.CV1, 39))+P('- Ông (bà): '+kt7O(f.CB2, 49)+' Chức vụ: '+kt7O(f.CV2, 39))+
    P('<b>ĐƠN VỊ ĐƯỢC KIỂM TRA:</b> Hội '+kt7O(f.HOI, 29)+' xã '+kt7O(f.XA, 31))+P('- Ông (bà): '+kt7O(f.HB1, 49)+' Chức vụ: '+kt7O(f.HV1, 39))+P('- Ông (bà): '+kt7O(f.HB2, 49)+' Chức vụ: '+kt7O(f.HV2, 39))+
    P('Cùng tiến hành kiểm tra việc thực hiện các nội dung công việc được ủy thác của Hội '+(f.HOIXA ? kt7O(f.HOIXA) : '.............................. xã/phường/đặc khu')+', thống nhất kết quả kiểm tra như sau:', 'j thut')+
    P('<b>I. KẾT QUẢ HOẠT ĐỘNG ỦY THÁC</b> (đến thời điểm '+(f.TDIEM ? kt7O(f.TDIEM) : '....../....../20.....')+')', 'tr')+P('<b>1. Dư nợ nhận ủy thác</b>')+
    P('- Tổng số Tổ TK&amp;VV do Hội quản lý: '+kt7O(f.STO, 26)+' tại '+kt7O(f.STH1, 6)+'/'+kt7O(f.STH2, 6)+' thôn.')+P('- Tổng số khách hàng vay vốn thuộc các Tổ TK&amp;VV do Hội quản lý: '+kt7O(f.SKH, 13))+
    P('- Tổng dư nợ nhận ủy thác do Hội quản lý: '+kt7O(f.DN, 25)+' triệu đồng')+P('&nbsp;&nbsp;Trong đó: Nợ quá hạn '+kt7O(f.NQH, 8)+' (tỷ lệ '+kt7O(f.TLQH, 4)+'%), Nợ khoanh '+kt7O(f.NK, 7)+' (tỷ lệ '+kt7O(f.TLNK, 5)+'%).')+
    P('<b>2. Kết quả chấm điểm hoạt động nhận ủy thác, ủy nhiệm</b>')+
    hsoBang('luoi', [3, 1.2, 1, 1, 1.4, 1], '<tr><td class="c b">Đơn vị</td><td class="c b">Tổng số</td><td class="c b">Tốt</td><td class="c b">Khá</td><td class="c b">Trung bình</td><td class="c b">Yếu</td></tr>'+
      '<tr><td>Tổ chức CT-XH cấp xã</td>'+xl('H')+'</tr><tr><td>Tổ TK&amp;VV</td>'+xl('X')+'</tr>')+
    P('<b>II. KẾT QUẢ THỰC HIỆN CÁC NỘI DUNG NHẬN ỦY THÁC CỦA TỔ CHỨC CT-XH CẤP XÃ</b>', 'tr')+
    P('Đoàn kiểm tra thực hiện kiểm tra theo nội dung kiểm tra, giám sát tại khoản 2 Phụ lục I văn bản số 727/HD-NHCS ngày 11/02/2026 hướng dẫn phương pháp, quy trình kiểm tra, giám sát hoạt động ủy thác. Cụ thể:', 'j thut')+
    nd.map(function(x){ return P('<b>'+x[0]+'</b>')+P('a) Kết quả đạt được')+ch(1)+P('b) Tồn tại')+ch(2); }).join('')+
    P('<b>III. ĐÁNH GIÁ, NHẬN XÉT CỦA ĐOÀN KIỂM TRA</b>', 'tr')+
    P('Qua kiểm tra tại tổ chức CT-XH cấp xã, '+kt7O('', 18)+' Tổ TK&amp;VV ('+kt7O('', 60)+') và '+kt7O('', 8)+' khách hàng. Đoàn có đánh giá, nhận xét chung như sau:', 'j thut')+
    P('<b>1. Ưu điểm</b>')+ch(3)+P('<b>2. Tồn tại</b>')+ch(6)+P('<b>3. Kiến nghị của Đoàn kiểm tra</b>')+ch(5)+
    P('Đơn vị được kiểm tra hoàn thành các kiến nghị và báo cáo kết quả trước ngày ....../....../20......')+
    P('<b>IV. Ý KIẾN CỦA ĐƠN VỊ ĐƯỢC KIỂM TRA</b>', 'tr')+ch(3)+
    P('Kèm theo Biên bản này là '+kt7O('', 12)+' Biên bản kiểm tra Tổ TK&amp;VV và '+kt7O('', 7)+' Phiếu kiểm tra sử dụng vốn vay.', 'j thut')+
    P('Biên bản được lập thành 02 bản (01 bản lưu Đoàn kiểm tra, 01 bản lưu Đơn vị được kiểm tra).', 'j thut')+
    hsoBang('khung0 hso-ky', [1, 1], '<tr><td class="c"><p class="c b tr">TRƯỞNG ĐOÀN KIỂM TRA</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b tr">ĐƠN VỊ ĐƯỢC KIỂM TRA</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>');
}
/* ---------- 3.503: đăng ký vào khung mẫu in chung MAU_IN (js/31b) — bản in, hộp xem, Word theo khuôn gốc (js/khuon/kt727.js) ---------- */
var KT7_CSS = '<style>.cham{letter-spacing:.5px;color:#333;overflow:hidden;white-space:nowrap;margin:1pt 0}.kt-ho{break-inside:avoid}</style>';
MAU_IN.dangKy('kt15', {ma:'15/TD', ten:'15/TD Danh sách đối chiếu', mg:[12, 10, 12, 12], ngang:true, so:'so', css:KT7_CSS, khuon:['kt727', 'm15'], html:kt15HTML, sau:ktChamMin,   /* dòng chấm mịn như mọi Word KTGS (3.124) */
  word:function(K, g){ var cot = function(p, a){ var o = {}; for(var i=0;i<14;i++) o[p+i] = a[i]==null ? '' : String(a[i]); return o; }, r = '';
    g.kh.forEach(function(k, i){ r += MAU_IN.dien(K.dongK, cot('K', [i+1, k.ten, 'x', kt7Tien(k.dn), kt7Tien(k.lt), kt7Tien(k.t105)]));
      k.mon.forEach(function(m){ r += MAU_IN.dien(K.dongC, cot('C', ['', m.ct, m.ku, kt7Tien(m.dn), kt7Tien(m.lt)])); }); });
    if(!g.kh.length) for(var i=0;i<6;i++) r += MAU_IN.dien(K.dongK, cot('K', [i ? '' : 1]));
    return MAU_IN.dien(K.truoc, g.f)+r+MAU_IN.dien(K.tong, cot('T', ['', 'Tổng cộng', '', kt7Tien(g.tong.dn), kt7Tien(g.tong.lt), kt7Tien(g.tong.t105)]))+MAU_IN.dien(K.sau, g.f); }});
MAU_IN.dangKy('kt03', {ma:'03/BB-CX', ten:'03/BB-CX Biên bản kiểm tra Hội cấp xã', mg:[20, 15, 20, 30], ngang:false, so:'so', css:KT7_CSS, khuon:['kt727', 'cx03'], html:kt03HTML, sau:ktChamMin,
  word:function(K, g){ return MAU_IN.dien(K.than, g.f); }});

/* ---------- GIAO DIỆN: nút ở 3 chỗ KTGS + hộp xem / in ---------- */
function kt727Nut(cho){   /* nút 15/TD cấp TỔ — cho: 'dk' (khối A Định kỳ — tổ đã tích) · 'dx' (khối B — tổ đang chọn). 3.500 (anh 08/11): 03/BB-CX là cấp HỘI → khối riêng 🏛 Hội cấp xã */
  return GD.nut({chu:'📄 15/TD Đối chiếu', lenh:'kt7.m15', du:{c:cho}, tit:'Danh sách đối chiếu số dư tiền vay và tiền gửi (VB 727) — toàn bộ tổ viên còn dư nợ / tiền gửi'}); }
function kt7KB(){ var S = D.cauHinh.ktIn = D.cauHinh.ktIn || {}; return S.kt03 = S.kt03 || {}; }   /* khai báo 03/BB-CX: cán bộ NH (cb1, cv1, cb2, cv2) — đồng bộ Drive cùng ktIn */
function kt7Chay(cho, fn){ return cho==='dx' || cho==='hx' ? fn() : ktNguonVoi(cho==='dk' ? ktDKThang() : ktNguonThangKT(), fn); }   /* khối A: số liệu chốt tháng; khối B: kỳ đầu trang */
function kt7To(cho){ if(cho==='dx'){ var C = ktCH(), t = KT_K && KT_K.to[C.to]; return t ? [t] : []; }
  return (cho==='dk' ? ktDKDs() : ktBCDs()).filter(function(r){ return r.chon; }).map(function(r){ return r.t; }); }
function kt7Mo15(cho){
  return kt7Chay(cho, function(){ var ds = kt7To(cho); if(!ds.length) return bao(cho==='dx' ? 'Chọn 1 tổ trước.' : 'Chưa tích tổ nào.', 3);
    KT7.mau = 'm15'; KT7.cho = cho; KT7.gts = ds.map(kt15DL); kt7Hop(); });
}
function kt7Mo03(k){   /* 3.500: mở từ khối 🏛 Hội cấp xã — k = 'xa|dv' (trống → Hội đầu danh sách); số liệu kỳ đầu trang (KT_K) */
  KT7.mau = 'm03'; KT7.cho = 'hx'; KT7.ds = ktHoiDs().map(function(x){ return x.k; }); KT7.k = k && KT7.ds.indexOf(k)>=0 ? k : KT7.ds[0] || '';
  if(!KT7.k) return bao('Chưa có Hội – xã trong số liệu.', 3); KT7.gts = [kt03DL(KT7.k, kt7KB())]; kt7Hop();
}
/* 3.500 (anh 08/11 "mẫu 03 kiểm tra Hội nên phải trên cấp tổ, để riêng cho dễ kiếm"): khối 🏛 Hội cấp xã — bảng Hội – xã theo lọc địa bàn, bấm 1 Hội → 03/BB-CX */
function kt7HXVe(o){
  var C = ktCH(), ds = ktHoiDs().filter(function(x){ return !C.hoi || String(x.t.dv)===String(C.hoi); }), h = ktCheDoHTML();   /* theo xã + Hội ở LỌC ĐỊA BÀN */
  if(!KT_K){ o.innerHTML = h+'<div class="rong">Chưa có số liệu Mẫu 31 — chọn Kỳ đầu trang.</div>'; return; }
  var r = ds.map(function(x){ var g = kt03DL(x.k, {}), f = g.f;
    return '<tr><td>'+coChuHTML(ktHoiTenTD(x.t))+'</td><td class="so">'+f.STO+'</td><td class="so">'+f.STH1+'/'+f.STH2+'</td><td class="so">'+f.SKH+'</td><td class="so">'+f.DN+'</td><td class="so">'+f.NQH+' ('+f.TLQH+'%)</td>'+
      '<td>'+(g.coXL ? 'Tốt '+f.X1+' · Khá '+f.X2+' · TB '+f.X3+' · Yếu '+f.X4 : '<span class="sl-phu">—</span>')+'</td><td>'+GD.nut({chu:'🏛 03/BB-CX', lenh:'kt7.m03', du:{k:x.k}, chinh:1, tit:'Xem / In / Word biên bản kiểm tra Hội này'})+'</td></tr>'; }).join('');
  o.innerHTML = h+'<p class="sl-phu">🏛 <b>Biên bản kiểm tra hoạt động nhận ủy thác của tổ chức CT-XH cấp xã</b> (Mẫu 03/BB-CX — VB 727/HD-NHCS) · số liệu đến '+coChuHTML(KT_K.ngay ? ngayVNsl(KT_K.ngay) : '…')+' (Kỳ đầu trang)'+(C.xa ? '' : ' · toàn PGD — chọn xã ở lọc địa bàn để thu gọn')+'</p>'+
    (ds.length ? '<div class="to-bang-cuon"><table class="to-bang kt-hx"><thead><tr><th>Hội – xã</th><th>Số tổ</th><th>Thôn</th><th>Khách</th><th>Dư nợ (tr)</th><th>Nợ quá hạn (tr)</th><th>Xếp loại tổ (BC0437)</th><th></th></tr></thead><tbody>'+r+'</tbody></table></div>'
      : '<div class="rong">Không có Hội – xã trong phạm vi lọc.</div>');
}
function kt7Hop(chiXem){   /* chiXem: chỉ dựng lại bản xem (khai báo cán bộ / ngày — giữ con trỏ ở ô đang gõ, QUY_CHUAN §11) */
  var m15 = KT7.mau==='m15', g0 = KT7.gts[0];
  var dau = m15 ? '<div class="sl-phu">'+KT7.gts.map(function(g){ return coChuHTML((g.t.ten || g.t.ma)+' — '+g.kh.length+' khách'); }).join(' · ')+' · số liệu đến '+coChuHTML(g0.f.DEN || '…')+'</div>'
    : '<div class="pb07-kb">'+GD.hang([GD.kv('Hội – xã', '<select data-lenh="kt7.hoi" data-su="change">'+KT7.ds.map(function(k){ var t = ktHoiDs().filter(function(x){ return x.k===k; })[0];
        return '<option value="'+coChuHTML(k)+'"'+(k===KT7.k ? ' selected' : '')+'>'+coChuHTML(t ? ktHoiTenTD(t.t) : k)+'</option>'; }).join('')+'</select>'),
      GD.kv('Ngày kiểm tra', '<input type="date" value="'+coChuHTML(kt7KB().ngay || '')+'" data-lenh="kt7.kb" data-k="ngay" data-su="change">')])+
      GD.hang(['<span class="sl-phu">Đoàn kiểm tra (NHCSXH):</span>'].concat([['cb1', 'Ông (bà) 1'], ['cv1', 'Chức vụ 1'], ['cb2', 'Ông (bà) 2'], ['cv2', 'Chức vụ 2']].map(function(x){
        return GD.kv(x[1], GD.o({loai:'chu', gt:kt7KB()[x[0]] || '', ph:'trống = chấm', lenh:'kt7.kb', du:{k:x[0]}})); })))+
      '<div class="sl-phu">'+coChuHTML(g0.soTo+' tổ · số liệu đến '+(g0.f.TDIEM || '…'))+(g0.coXL ? ' · xếp loại tổ theo BC0437' : ' · <span class="vang">chưa nạp BC0437 — xếp loại tổ để trống</span>')+'</div></div>';
  var ten = m15 ? (KT7.gts.length===1 ? ktFTen(g0.t, {to:1, mau:'M15'}) : xuatTen('M15TD Doi chieu', KT7.gts.length+' to', KT_K && KT_K.ngay)) : ktFTen(g0.t, {mau:'M03BBCX'});
  MAU_IN.hop({ma:m15 ? 'kt15' : 'kt03', gts:KT7.gts, ten:ten, dau:dau, chiXem:chiXem, tit:m15 ? '📄 15/TD — Danh sách đối chiếu số dư tiền vay và tiền gửi' : '🏛 03/BB-CX — Biên bản kiểm tra Hội cấp xã'});
  KT7.x = MAU_IN.X;   /* {ma, gts, ten, trang} — phép thử đọc KT7.x.trang */
}
GD.dangKy('kt7', gdLenh({
  m15:function(el){ kt7Mo15(el.getAttribute('data-c')); },
  m03:function(el){ kt7Mo03(el.getAttribute('data-k')); },
  hoi:function(el){ KT7.k = el.value; kt7Chay(KT7.cho, function(){ KT7.gts = [kt03DL(KT7.k, kt7KB())]; kt7Hop(); }); },
  kb:function(el){ var S = kt7KB(), k = el.getAttribute('data-k'), v = String(el.value || '').trim(); if(v) S[k] = v; else delete S[k]; luu();
    kt7Chay(KT7.cho, function(){ KT7.gts = [kt03DL(KT7.k, kt7KB())]; kt7Hop(1); }); }
}));
