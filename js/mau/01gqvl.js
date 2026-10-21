/* ===== 3.223 M5 — MẪU 01/GQVL Phương án sử dụng vốn vay (người lao động) trên nền ô — dựng theo file gốc tests/mau_goc/01gqvl.docx (VB 4039, từ 01/10/2026) =====
   Lề 20 / 20 / 20 / 30 mm · Times New Roman 14 · thân bài dòng cố định 18 pt, cách trước 6 pt, thụt đầu dòng 10 mm · ghi chú cỡ 11 · số trang từ trang 2 · chuỗi chấm đúng gốc.
   Số liệu như cũ: người vay (phiếu hồ sơ / sổ hộ vay), phương án (B.pa: ưu tiên, lao động, doanh thu, chi phí), mục đích (bảng), thời hạn / kỳ hạn (chương trình).
   Mới: hộ kinh doanh (GCN, ngày đăng ký, giấy phép, MST — sổ hộ vay M2), giấy tờ đất rừng, ngày ký thành ô. Bỏ file này → app dùng lại hsoLap01gqvl cũ. */
(function(){
  var MK = '01gqvl';
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){   /* dòng ép 1 dòng: phông máy rộng hơn Word ~2 % → co khoảng trắng giữa chữ cho vừa khổ (không tràn lề, không đổi chữ) */
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = /10mm/.test(s) ? 149.5 : 159.5, n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }   /* ít khoảng trắng (dòng chấm dài) → nén ký tự chấm; chữ trong ô giữ nguyên */
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var X = 'line-height:18pt;margin-top:6pt;', J = 'text-align:justify;', F = 'text-indent:10mm;', S1 = 'line-height:1.15;margin-top:6pt;';   /* X: dòng cố định 18 pt + trước 6 pt · S1: dòng đơn + trước 6 pt */
  var W = 'white-space:nowrap;', N11 = 'font-size:11pt;', sp = function(n){ return Array(n+1).join('&nbsp;'); }, chamD = '……………………………………………………………………………';
  function P2(a, b, st, st2){ return P(a, st+W+'text-align-last:justify')+P(b, (st2||'')+W); }   /* đoạn 2 dòng: ngắt đúng chỗ gốc ngắt (khung app hẹp hơn Word vài phần mm) */
  function sup(x){ return '<span style="font-size:58%;vertical-align:33%;line-height:0">'+x+'</span>'; }   /* chỉ số trên như Word / LibreOffice: cỡ 58 %, nâng 33 % */
  function khoi(G, k, ds, st){   /* ô nhiều dòng chấm (mỗi dòng 1 đoạn của gốc) — có chữ: giữ đúng các dòng, chữ phủ lên trên, xuống dòng theo nhịp dòng gốc */
    var v = G.gt(k), c = omCach(MK, k);
    if(!v) return ds.map(function(ch){ return P('<span class="om om-cham" data-o="'+k+'">'+ch+'</span>', st); }).join('');
    return '<div style="position:relative">'+ds.map(function(ch){ return P('<span style="visibility:hidden">'+ch+'</span>', st); }).join('')+
      '<div class="om om-'+(c==='mau' ? 'mau' : c)+'" data-o="'+k+'" style="position:absolute;left:10mm;right:0;top:0;bottom:0;overflow:hidden;line-height:24pt;padding-top:3pt;text-align:justify">'+coChuHTML(v)+'</div></div>'; }
  omDangKy({k:MK, ma:'01/GQVL', phan:['nhs', 'kh', 'ky'], co:14,
    o:[{k:'ngan', n:'Kính gửi: Ngân hàng CSXH … (tên PGD)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD (điền sau chữ NHCSXH)'},
      {k:'ten', n:'Họ và tên khách hàng vay vốn', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'ns', n:'Ngày sinh', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'danToc', n:'Dân tộc', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'gt', n:'Giới tính', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / suy theo CCCD'},
      {k:'cccd', n:'Thẻ căn cước số', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'ncap', n:'Ngày cấp', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'noiCap', n:'Nơi cấp', p:'kh', l:'tu', md:'tu', ng:'tự tính theo ngày cấp'},
      {k:'han', n:'Có thời hạn đến', p:'kh', l:'tu', md:'tu', ng:'tính từ ngày sinh + ngày cấp'},
      {k:'noiO', n:'Nơi ở hiện tại (thường trú / tạm trú)', p:'kh', l:'tu', md:'tu', ng:'ấp, xã của người vay'},
      {k:'sdt', n:'Điện thoại', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'dkkd', n:'Giấy chứng nhận đăng ký hộ kinh doanh số', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh) / phương án'},
      {k:'dkkdNgay', n:'Đăng ký lần đầu ngày', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh)'},
      {k:'dkkdLan', n:'Đăng ký thay đổi lần thứ … ngày', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh)'},
      {k:'gpkd', n:'Giấy phép KD có điều kiện · thời hạn hiệu lực', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh)'},
      {k:'mstKD', n:'Mã số thuế kinh doanh', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh) / phương án'},
      {k:'ut', n:'Thuộc đối tượng ưu tiên ☒ (+ Khác)', p:'kh', l:'tu', md:'tu', ng:'phương án › ưu tiên'},
      {k:'utGT', n:'Thông tin, giấy tờ xác nhận đối tượng ưu tiên (4 dòng)', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'dtKhac', n:'Thuộc đối tượng vay vốn khác', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'paTen', n:'Tên phương án (2 dòng)', p:'kh', l:'tu', md:'tu', ng:'phương án / mục đích chương trình'},
      {k:'dd', n:'Địa điểm thực hiện phương án (2 dòng)', p:'kh', l:'tu', md:'tu', ng:'phương án / nơi ở'},
      {k:'rung', n:'Giấy tờ sử dụng đất rừng (2 dòng — vay trồng rừng)', p:'kh', l:'go', md:'cham'},
      {k:'ld', n:'Số lao động (tổng, tạo, duy trì, mở rộng, nữ, trong / ngoài hộ)', p:'kh', l:'tu', md:'tu', ng:'phương án › lao động'},
      {k:'von', n:'Vốn thực hiện phương án', p:'kh', l:'tu', md:'tu', ng:'vốn tự có + số tiền vay'},
      {k:'tuCo', n:'Vốn tự có', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ'},
      {k:'tien', n:'Đề nghị Ngân hàng cho vay số tiền (+ bằng chữ)', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'bang', n:'Bảng mục đích sử dụng vốn vay', p:'kh', l:'tu', md:'tu', ng:'phương án › mục đích'},
      {k:'th', n:'Thời hạn xin vay', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'kyGoc', n:'Kỳ hạn trả gốc', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'kyLai', n:'Kỳ hạn trả lãi', p:'kh', l:'tu', md:'tu', ng:'⚙ chương trình'},
      {k:'hq', n:'Doanh thu · chi phí · chênh lệch · thu nhập BQ tháng', p:'kh', l:'tu', md:'tu', ng:'phương án › hiệu quả'},
      {k:'diaDanh', n:'Địa danh ("…, ngày" người vay ký)', p:'ky', l:'tu', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › nơi'},
      {k:'ngayKy', n:'Ngày tháng (người đề nghị vay vốn ký)', p:'ky', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'kyTen', n:'Họ tên dưới chữ ký người đề nghị', p:'ky', l:'tu', md:'tu', ng:'người vay'}],
    V:function(t, B){
      B = B || hsoBo(); var N = hsoBoNV(B), Q = hsoLaGQ(B) ? hsoGQ(B) : {A:{dong:[], tien:0}, C:{}}, A = Q.A, Pa = (B && B.pa) || {}, L = Pa.ld || {}, d = hsoCCCDDoc(N.cccd), han = '';
      if(N.cccd && N.ns && N.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(String(N.cccd).replace(/\D/g, ''), N.ns, N.ncap); if(hn && hn.den) han = hn.den; }
      var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '', tc = B && B.tuCo!=='' && B.tuCo!=null ? tdnTien(hsoSo(B.tuCo)) : (Q.tu && Q.tu.tuCo ? tdnTien(Q.tuCo) : '');   /* 3.310: vốn tự có tự tính (hệ số k) */
      return {Q:Q, A:A, L:L, ut:Pa.ut || [], ngan:hsoPGD('ngan'), ten:N.ten, ns:N.ns, danToc:N.danToc, gt:/^(nam|nữ)$/i.test(N.gt) ? N.gt : (d ? d.gt : ''),   /* Mẫu 31 ghi giới tính dạng mã (01…) → suy theo CCCD */
         cccd:N.cccd, ncap:N.ncap, noiCap:N.noiCap, han:han, noiO:dc, sdt:N.sdt,
        dkkd:N.dkkd || Pa.gpkd, dkkdNgay:N.dkkdNgay, dkkdLan:N.dkkdLan, dkkdLanNgay:N.dkkdLanNgay, gpkd:N.gpkd, gpkdHan:N.gpkdHan, mstKD:N.mstKD || Pa.mst, utKhac:Pa.utKhac, utGT:Pa.utGT, dtKhac:Pa.dtKhac,
        paTen:Pa.ten || A.md, dd:Pa.dd || dc, rung:HSO.vay.rung, von:A.tien ? tdnTien(Q.von) : '', tuCo:tc, tien:A.tien ? tdnTien(A.tien) : '', chu:A.tien ? hsoChuSo(A.tien) : '', th:A.th,
        kyGoc:A.ky ? (+A.th<=12 ? 'trả 1 lần khi đến hạn' : A.ky+' tháng/lần') : '', kyLai:B ? (Q.C.kyLai || 'hằng tháng') : '', dt:Q.dt ? tdnTien(Q.dt) : '', cp:Q.cp ? tdnTien(Q.cp) : '', cl:Q.cl!=null ? tdnTien(Q.cl) : '', bq:Q.bq!=null ? tdnTien(Q.bq) : '',
        diaDanh:hsoPGD('noi'), ngayKy:HSO.vay.ngayKy, kyTen:N.ten};
    },
    lap:function(t, B){
      var V = this.V(t, B), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; };
      var g = function(k, f){ return C(k) ? (V[f||k]==null ? '' : String(V[f||k])) : ''; };   /* giá trị phụ của 1 ô (cùng cách với ô) */
      var ns = G.ngay('ns', ['…', '.....', '….']), nc = G.ngay('ncap', ['…', '.....', '….']), d1 = G.ngay('dkkdNgay', ['…....', '.…..', '……...']);
      var d2 = (function(){ var x = hsoNg(g('dkkdLan', 'dkkdLanNgay')), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ['……', '…..', '…..…'].map(function(ch, i){ return o('dkkdLan', ch, {gt:p[i], canh:'c'}); }); })();
      var ld = function(f, ch){ return o('ld', ch, {gt:C('ld') && V.L[f]!=null ? String(V.L[f]) : '', canh:'c'}); };
      var ut = function(i){ return '<span class="om om-'+(C('ut') ? (OM_KIEU==='mau' ? 'mau' : 'tu') : 'cham')+'" data-o="ut">'+(C('ut') && V.ut.indexOf(i)>=0 ? '☒' : '□')+'</span>'; };
      var hq = function(f, ch){ return o('hq', ch, {gt:g('hq', f)}); };
      var dong = V.A.dong && V.A.dong.length ? V.A.dong : [], nD = Math.max(5, dong.length), bg = C('bang');
      var oT = function(k, hai){ return '<td style="border:.5pt solid #000;padding:0;vertical-align:top"><p style="margin:0;padding-top:'+(hai ? '0.2mm' : '6pt')+';line-height:1.15;text-align:'+(k==='c' ? 'center' : k==='r' ? 'right' : 'left')+'">'; };   /* hai: ô mục đích 2 dòng chiếm cả khoảng trước → dòng bảng không cao thêm */
      var bang = '<tr><td class="c" style="border:.5pt solid #000;border-bottom:0;padding:0;vertical-align:top"><p class="c b" style="padding-top:6pt;line-height:1.15">STT</p></td><td style="border:.5pt solid #000;border-bottom:0;padding:0;vertical-align:top"><p class="c b" style="padding-top:6pt;line-height:1.15">MỤC ĐÍCH SỬ DỤNG</p></td>'+
          '<td style="border:.5pt solid #000;border-bottom:0;padding:0;vertical-align:top"><p class="c b" style="padding-top:6pt;line-height:1.15">SỐ LƯỢNG</p></td><td style="border:.5pt solid #000;border-bottom:0;padding:0;vertical-align:top"><p class="c b" style="padding-top:6pt;line-height:1.15">THÀNH TIỀN</p></td></tr>'+
        '<tr><td style="border:.5pt solid #000;border-top:0;padding:0"></td><td style="border:.5pt solid #000;border-top:0;padding:0"><p class="c b" style="line-height:1.15">VỐN VAY</p></td><td style="border:.5pt solid #000;border-top:0;padding:0"></td><td style="border:.5pt solid #000;border-top:0;padding:0"><p class="c b" style="line-height:1.15">(đồng)</p></td></tr>';   /* đầu bảng 2 dòng tách 2 hàng (gốc ngắt trang giữa đầu bảng) */
      for(var i=0;i<nD;i++){ var x = dong[i] || ['', '', 0], co = bg && x[0];
        bang += '<tr>'+oT('c')+(co ? i+1 : '&nbsp;')+'</p></td>'+oT('l', co && omRong(x[0], 14) > 64*0.98)+(co ? o('bang', '', {gt:x[0], rong:64, hai:7.4}) : '&nbsp;')+'</p></td>'+oT('c')+(co ? o('bang', '', {gt:x[1] || '', rong:26, canh:'c'}) : '&nbsp;')+'</p></td>'+oT('r')+(co && x[2] ? o('bang', '', {gt:tdnTien(x[2]), rong:44, canh:'r'}) : '&nbsp;')+'</p></td></tr>'; }
      var nk = (function(){ var x = hsoNg(G.gt('ngayKy')), p = x ? [x.d, x.m, x.y] : ['', '', '']; return [5, 5, 9].map(function(r, i){ return o('ngayKy', '...', {gt:p[i], canh:'c', rong:r}); }); })();   /* gốc chỉ 3 chấm — ô có chữ nới vừa số (dòng canh giữa, còn chỗ) */
      var h = P('&nbsp;', 'text-align:right;margin-top:1.6mm')+P('<b>Mẫu số 01/GQVL</b>', 'text-align:right')+P('<b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center;line-height:18pt')+
        P(sup('_____________________________________'), 'text-align:center;line-height:1.32')+P('&nbsp;', 'line-height:18pt')+
        P('<b>PHƯƠNG ÁN SỬ DỤNG VỐN VAY</b><br><b>HỖ TRỢ TẠO VIỆC LÀM, DUY TRÌ, MỞ RỘNG VIỆC LÀM</b><br><i>(Đối với người lao động)</i>', 'text-align:center;line-height:18pt')+P('&nbsp;', 'line-height:18pt')+
        P('Kính gửi: Ngân hàng Chính sách xã hội '+o('ngan', '...............……'), 'text-align:center;'+X)+
        P('<b>I. Thông tin chung về khách hàng</b>', J+F+X)+
        P('Họ và tên khách hàng vay vốn: '+o('ten', '…………................................…….......……')+' ', J+F+X+W)+
        P('Ngày sinh: '+ns.join('/')+sp(16)+'Dân tộc: '+o('danToc', '……')+sp(18)+'Giới tính: '+o('gt', '…..'), J+F+X+'white-space:nowrap')+
        P('Thẻ căn cước công dân/Thẻ căn cước số: '+o('cccd', '………….......................................'), J+F+X+W)+
        P('Ngày cấp: '+nc.join('/')+sp(3)+'Nơi cấp: '+o('noiCap', '……....….........')+'Có thời hạn đến:'+o('han', '............…...', {lay:ngayVNsl}), J+F+X+'white-space:nowrap')+
        P('Nơi ở hiện tại (thường trú/tạm trú'+sup('(1)')+' ):'+o('noiO', '………..………..…..............................'), J+F+X+W)+
        P('Điện thoại: '+o('sdt', '………………………………………………...…………...…….'), J+F+X+W)+
        P('Giấy chứng nhận đăng ký hộ kinh doanh số '+sup('(2)')+'(nếu có): '+o('dkkd', '…………….............'), J+F+S1+W)+
        P('<i>Đăng ký lần đầu ngày '+d1[0]+'tháng'+d1[1]+'năm'+d1[2]+'</i>', J+F+S1)+
        P('<i>Đăng ký thay đổi lần thứ:'+o('dkkdLan', '………', {canh:'c'})+'ngày'+d2[0]+'tháng'+d2[1]+'năm'+d2[2]+'</i>', J+F+S1)+
        P2('Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh', '(nếu có):'+o('gpkd', '………………………')+' thời hạn còn hiệu lực '+o('gpkd', '.........................................', {gt:g('gpkd', 'gpkdHan')}), J+F+S1, 'line-height:1.15')+
        P('Mã số thuế kinh doanh đã đăng ký (nếu có):'+o('mstKD', '..............................................'), J+F+X+W)+
        P('Thuộc đối tượng ưu tiên (nếu có):', J+F+X)+
        HSO_UT.slice(0, 5).map(function(x, i){ return P(ut(i)+' '+(i+1)+'. '+x, J+F+X); }).join('')+
        P(ut(5)+' 6. Khác (nếu có) '+o('ut', '......................................................................................', {gt:g('ut', 'utKhac')}), J+F+X+W)+
        P(sp(6)+'Thông tin, giấy tờ xác nhận đối tượng ưu tiên, gồm'+sup('(3)')+':', J+X)+
        khoi(G, 'utGT', [chamD, chamD, chamD, '....................................................................................................................'], J+X+W+'margin-left:10mm')+
        P(sp(7)+'Thuộc đối tượng vay vốn khác (nếu có)'+sup(' (5)')+': '+o('dtKhac', '................................................'), J+X+W)+
        P('<b>II. Phương án sử dụng vốn vay</b>', J+F+X)+P('<b>1. Tên phương án và địa điểm thực hiện</b>', J+F+X)+
        P(sp(8)+'Tôi có nhu cầu vay vốn để thực hiện phương án ', J+X)+khoi(G, 'paTen', [chamD, chamD], J+F+X+W)+
        P('Địa điểm thực hiện phương án', J+F+X)+khoi(G, 'dd', [chamD, chamD], J+F+X+W)+
        P('(Đối với trường hợp vay vốn trồng rừng thì kê khai giấy tờ, tài liệu chứng minh được sử dụng đất rừng'+sup(' (4)')+')', J+F+X)+khoi(G, 'rung', [chamD, chamD], J+F+X+W)+
        P2('<b>2. Tổng số người lao động được tạo việc làm, duy trì, mở rộng việc làm'+sup('(6)')+':</b>', '<b>'+ld('tong', '…..')+' người, trong đó:</b>', J+F+X, 'line-height:18pt')+
        '<table class="khung0" style="width:152.5mm;margin-left:9.9mm"><colgroup><col style="width:77.6mm"><col style="width:74.9mm"></colgroup>'+
          '<tr><td style="padding:0 1.9mm">'+P('* Tạo việc làm: '+ld('tao', '.......')+'người;  ', X)+'</td><td style="padding:0 1.9mm">'+P('Duy trì việc làm: '+ld('duy', '......')+' người;', X)+'</td></tr>'+
          '<tr><td style="padding:0 1.9mm">'+P('Mở rộng việc làm: '+ld('mo', '......')+'người;', X)+'</td><td style="padding:0 1.9mm">'+P('Là lao động nữ (nếu có):'+ld('nu', '....')+' người;', X)+'</td></tr>'+
          '<tr><td colspan="2" style="padding:0 1.9mm">'+P('* Tổng số lao động thuộc hộ gia đình: '+ld('ho', '............')+'người', X)+P('Tổng số lao động không thuộc hộ gia đình (nếu có): '+ld('ngoai', '............')+'người', X)+'</td></tr></table>'+
        P('<b>3. Vốn thực hiện phương án: '+o('von', '……………………')+' đồng, trong đó:</b>', J+F+X+W)+
        P('- Vốn tự có:'+o('tuCo', '……………....................................……………………')+' đồng', J+F+X+W)+
        P('- Đề nghị Ngân hàng cho vay số tiền: '+o('tien', '…………………………….…')+' đồng', J+F+X+W)+
        P('<i>(Bằng chữ: '+o('tien', '……………………………………………………………………….', {gt:g('tien', 'chu'), ls:g('tien', 'chu') ? 0 : -1, rong:omRong('……………………………………………………………………….', 14) - 28*0.3528})+')</i>', J+F+X)   /* chuỗi chấm gốc dài hơn khổ máy → nén ký tự chấm 1 pt (chữ ghi vẫn thường) */+
        P('với mục đích sử dụng vốn vay cụ thể như sau:', J+X)+P('&nbsp;', 'line-height:1.15')+
        '<table style="width:152.6mm;margin-left:0.1mm;border-collapse:collapse"><colgroup><col style="width:13.1mm"><col style="width:66mm"><col style="width:27.9mm"><col style="width:45.8mm"></colgroup>'+bang+'</table>'+
        P('Thời hạn xin vay: '+o('th', '……….', {canh:'c'})+' tháng  ', J+F+X)+
        P('Kỳ hạn trả gốc: '+o('kyGoc', '………......................')+' Kỳ hạn trả lãi: '+o('kyLai', '….…......…………'), J+F+X+W)+
        P('<b>4. Phương án sử dụng vốn vay và hiệu quả dự kiến về thu nhập'+sup(' (7)')+':</b>', F+X)+
        P('(Được tính trên toàn bộ thời gian thực hiện phương án)', 'text-align:center;'+F+X)+
        P('- Tổng doanh thu của phương án:'+hq('dt', '.......................................................')+'đồng', F+X+W)+
        P('- Tổng chi phí của phương án:'+hq('cp', '.............................................................')+'đồng', F+X+W)+
        P(' - Chênh lệch thu - chi của phương án :'+hq('cl', '................................................')+'đồng', F+X+W)+
        P('- Thu nhập bình quân tăng thêm/1 tháng của khách hàng: '+hq('bq', '……………')+'đồng', F+X+W)+
        P('<b>III. Cam kết</b>', F+X)+
        P2('Tôi cam kết sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đúng thời hạn,', 'nếu sai tôi xin chịu trách nhiệm trước pháp luật.', J+F+X, 'line-height:18pt')+
        '<table class="khung0" style="width:163.1mm;margin-left:-5.6mm;margin-bottom:18pt"><colgroup><col style="width:95mm"><col style="width:68.1mm"></colgroup><tr><td style="padding:0 1.9mm"></td><td style="padding:0 1.9mm">'+
          P('<i>'+o('diaDanh', '...', {rong:14, canh:'r'})+', ngày '+nk[0]+' tháng '+nk[1]+' năm '+nk[2]+'</i><br><b>NGƯỜI ĐỀ NGHỊ VAY VỐN</b><br><i>(Ký và ghi rõ họ tên)</i>', 'text-align:center;margin-left:-4mm;margin-right:-4mm;'+X+W)+'</td></tr></table>'+
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function(n){ return n===5 ? P('<b>'+o('kyTen', '&nbsp;', {rong:60, canh:'c'})+'</b>', 'text-align:center;line-height:1.15;margin-left:89.4mm;width:68.1mm') : P('&nbsp;', 'text-align:center;line-height:1.15'); }).join('')+
        [['<b><i>Ghi chú:</i></b>', 1], ['<b>(1)</b>  Trường hợp đề nghị vay vốn tại nơi thường trú thì ghi thông tin nơi thường trú; trường hợp đề nghị vay vốn tại nơi tạm trú thì ghi thông tin nơi tạm trú. ', 1],
          ['<b>(2)</b> Nếu khách hàng là chủ hộ kinh doanh (hoặc người đại diện ủy quyền) vay với tư cách Cá nhân người lao động để phục vụ công việc kinh doanh/tạo việc làm, duy trì, mở rộng việc làm cho chính bản thân khách hàng thì kê khai Giấy chứng nhận đăng ký kinh doanh. Đối với ngành nghề kinh doanh có điều kiện thì kê khai cả nội dung Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh.', 1],
          ['<b> (3)</b> Thông tin, giấy tờ xác nhận đối tượng ưu tiên dành cho đối tượng ưu tiên, cụ thể:'],
          ['<b>- Đối với người lao động là người dân tộc thiểu số thuộc hộ nghèo: </b>Giấy tờ chứng minh về dân tộc, Giấy chứng nhận hộ gia đình nghèo theo quy định.'],
          ['<b>- Đối với người lao động là người dân tộc Kinh thuộc hộ nghèo đang sinh sống tại địa bàn có điều kiện kinh tế – xã hội đặc biệt khó khăn (người có nơi ở hiện tại thuộc thôn, xã đặc biệt khó khăn vùng đồng bào dân tộc thiểu số và miền núi hoặc các địa bàn khác theo quyết định của cơ quan nhà nước có thẩm quyền): </b>Giấy tờ chứng minh về nơi ở hiện tại, Giấy chứng nhận hộ gia đình nghèo theo quy định.'],
          ['<b>- Đối với người lao động là Người khuyết tật, đề nghị kê khai:</b> Giấy xác nhận khuyết tật số …... do Ủy ban nhân dân xã/phường/đặc khu ……...…. cấp ngày ..........', 2],
          ['<b>- Đối với Người lao động trong hộ gia đình đang trực tiếp nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng, đề nghị kê khai:</b>'],
          ['+ Họ và tên Người khuyết tật/người khuyết tật đặc biệt nặng:............'], ['+ Giấy xác nhận khuyết tật số ……do Ủy ban nhân dân xã/ phường/đặc khu …… cấp ngày ..........'],
          ['+ Hoặc Quyết định hỗ trợ kinh phí chăm sóc, nuôi dưỡng hàng tháng số ................cấp ngày.............'],
          ['<b>- Đối với Người lao động nhận nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng, đề nghị kê khai:</b>'],
          ['+ Họ và tên Người khuyết tật/Người khuyết tật đặc biệt nặng:.............'], ['+ Giấy xác nhận khuyết tật số …… do Ủy ban nhân dân xã/phường/đặc khu ….....cấp ngày .............'],
          ['+ Quyết định hỗ trợ kinh phí chăm sóc, nuôi dưỡng hằng tháng số:.............cấp ngày............'], ['+ Hoặc Quyết định nhận chăm sóc, nuôi dưỡng số:………....cấp ngày….......................……'],
          ['<b>(4) </b>Khách hàng vay vốn phục vụ phương án trồng rừng có trách nhiệm kê khai các loại giấy tờ chứng minh việc được sử dụng đất rừng và đang không tranh chấp (ví dụ như Giấy chứng nhận quyền sử dụng đất, dữ liệu điện tử về đất đai (theo Luật Đất đai), Hợp đồng thuê đất/giao đất/cho mượn đất và giấy tờ pháp lý của bên cho thuê/cho mượn,…).'],
          ['<b>(5)</b> Thuộc đối tượng khác theo quy định của cấp có thẩm quyền được vay vốn hỗ trợ tạo việc làm, duy trì, mở rộng việc làm: ', 1],
          ['- <b>Người cao tuổi</b> theo văn bản hướng dẫn số 5911/NHCS-TDSV ngày 12/8/2019;', 1], ['- <b>Người lao động trong gia đình người tâm thần, trẻ em tự kỷ và người rối nhiễu tâm trí</b> theo văn bản hướng dẫn số 6216/NHCS-TDSV ngày 09/7/2021;', 1],
          ['- <b>Người có đất thu hồi</b> theo văn bản hướng dẫn số 4545/HD-NHCS ngày 01/8/2024;', 1], ['- Các đối tượng khác theo văn bản hướng dẫn của cấp có thẩm quyền. ', 1],
          ['<b>(6)</b> Người lao động là công dân Việt Nam từ đủ 15 tuổi trở lên, có khả năng lao động và có nhu cầu làm việc.'], ['- Tạo việc làm là tạo việc làm cho người thất nghiệp;'], ['- Duy trì việc làm là duy trì việc làm hiện có của người lao động;'],
          ['- Mở rộng việc làm là việc thu hút thêm lao động hoặc tạo thêm việc làm khác cho người lao động.'], ['- Khách hàng vay vốn được tính là 01 trong tổng số lao động thuộc hộ gia đình.'],
          ['<b>(7)</b> - Tổng chi phí của phương án (đã bao gồm chi phí trả lãi tiền vay ngân hàng.)'], ['+ Nếu tổng chi phí ≥ vốn thực hiện phương án + lãi vay: đây là kết quả hợp lý.'], ['+ Nếu tổng chi phí &lt; vốn thực hiện phương án + lãi vay: cần xem xét lại phương án.'],
          ['- Chênh lệch thu – chi &gt; 0: phương án có lãi.'], ['- Chênh lệch thu – chi ≤ 0: phương án không có lãi.'], ['Từ chênh lệch thu – chi mới tính được thu nhập bình quân tăng thêm/tháng của khách hàng và đánh giá hiệu quả của phương án.']
        ].map(function(x){ return P(x[0], J+N11+(x[1]===1 ? 'line-height:18pt;' : x[1]===2 ? X : S1)); }).join('');   /* 1: dòng cố định 18 pt · 2: + trước 6 pt · còn lại: dòng đơn + trước 6 pt */
      return {ma:'01/GQVL', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap01gqvl = function(t, B){ return omLap(MK, t, B); };
  var M = hsoMauK(MK); if(M){ M.mg = omMg([20, 20, 20, 30]); M.so = 'so'; }   /* lề + số trang (từ trang 2) theo file gốc */
})();
