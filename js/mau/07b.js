/* ===== 3.223 M5 — MẪU 07b/GQVL Hợp đồng tín dụng (người lao động) trên nền ô — dựng theo file gốc tests/mau_goc/07b.docx (VB 4039, từ 01/10/2026) =====
   Lề 20 / 20 / 17 / 30 mm · Times New Roman 14 · cách đoạn / dòng cố định đúng từng đoạn của gốc · 2 chú thích chân trang (giữ đáy trang 1, 2) · phụ lục sang trang mới · số trang từ trang 2.
   Số liệu như cũ: Bên cho vay (⚙ Khai báo đơn vị › PGD), Bên vay (phiếu hồ sơ / sổ hộ vay), số tiền, thời hạn, lãi suất, lịch trả gốc (chương trình), giải ngân, mục đích, nơi thực hiện, thỏa thuận khác.
   Lịch trả gốc: gốc in 3 dòng "- Ngày …" + 1 dòng "……" → kỳ 1–3 vào 3 dòng, các kỳ sau ghi gọn ở dòng "……" (dài thì thu nhỏ, báo ⚠). Bỏ file này → app dùng lại hsoLap07b cũ. */
(function(){
  var MK = '07b';
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){   /* dòng ép 1 dòng: phông máy rộng hơn Word ~2 % → co khoảng trắng / nén chấm cho vừa khổ (như 01/GQVL) */
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm(s, 'text-indent') - mm(s, 'margin-left') - mm(s, 'margin-right'), n = (tx.match(/ /g) || []).length; w += omRong(tx, /font-size:12pt/.test(s) ? 12 : 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:-0.25mm;';   /* đoạn thường: phông máy rộng hơn Word ~2 % → bớt khoảng trắng để ngắt dòng như gốc (canh đều vẫn giãn lại) */
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;';
  var A34 = 'margin-top:3pt;margin-bottom:4pt;line-height:18pt;', S33 = 'margin-top:3pt;margin-bottom:3pt;line-height:1.15;', E17 = 'margin-top:3pt;line-height:17pt;', E4 = 'margin-top:4pt;line-height:17pt;', E44 = 'margin-top:4pt;margin-bottom:4pt;line-height:17pt;';
  var S6 = 'margin-top:6pt;line-height:1.15;', X6 = 'margin-top:6pt;line-height:18pt;';
  var I = function(n){ return 'text-indent:'+n+'mm;'; }, L1 = 'margin-left:1mm;margin-right:1mm;';
  function sup(x){ return '<span style="font-size:58%;vertical-align:33%;line-height:0">'+x+'</span>'; }
  function P2(a, b, st, st2){ return P(a, st+W+TL)+P(b, (st2||'')+W); }   /* đoạn 2 dòng ngắt đúng chỗ gốc */
  function khoi(G, k, ch, st, cao){   /* 1 đoạn chấm dài nhiều dòng — có chữ: giữ khung đúng số dòng, chữ phủ lên */
    var v = G.gt(k), c = omCach(MK, k);
    ch = [].concat(ch);   /* các dòng chấm của gốc (ngắt dòng đúng chỗ gốc ngắt) */
    if(!v) return P(ch.map(function(x){ return '<span class="om om-cham" data-o="'+k+'">'+x+'</span>'; }).join('<br>'), st);
    return '<div style="position:relative">'+P(ch.map(function(x){ return '<span style="visibility:hidden">'+x+'</span>'; }).join('<br>'), st)+
      '<div class="om om-'+(c==='mau' ? 'mau' : c)+'" data-o="'+k+'" style="position:absolute;left:0;right:0;top:3pt;bottom:3pt;overflow:hidden;line-height:'+(cao||'1.15')+';text-align:justify">'+coChuHTML(v)+'</div></div>'; }
  function chanTrang(cao, so, chu){   /* chú thích chân trang của gốc: giữ chỗ cao `cao` mm cuối trang, chữ ghim đáy trang */
    return '<div class="kt-giu" style="height:'+cao+'mm"><div style="position:absolute;left:1.5px;right:1.5px;bottom:0;font-size:10pt;line-height:1.15;text-align:justify">'+
      '<p style="margin:0 0 1mm;width:50mm;height:0;border-top:.5pt solid #000"></p><p style="margin:0">'+sup(so)+' '+chu+'</p></div></div>'; }
  omDangKy({k:MK, ma:'07b/GQVL', phan:['nhs', 'kh', 'nh', 'ky'], co:14,
    o:[{k:'soHD', n:'Số hợp đồng (…/20../HĐ-TD) — đầu HĐ và phụ lục', p:'nh', l:'go', md:'cham'},
      {k:'ngayHD', n:'"Hôm nay, ngày … tháng … năm …" (ngày ký HĐ)', p:'kh', l:'tu', md:'tu', ng:'ô "Ngày ký HĐ" của phiếu hồ sơ'},
      {k:'noiKy', n:'"… tại …" — nơi ký hợp đồng', p:'kh', l:'kb', md:'cham'},
      {k:'nhTen', n:'Bên cho vay: tên Ngân hàng CSXH', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › tên'},
      {k:'nhDc', n:'Bên cho vay: địa chỉ', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › địa chỉ'},
      {k:'nhDt', n:'Bên cho vay: điện thoại', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › điện thoại'},
      {k:'daiDien', n:'Bên cho vay: người đại diện · chức vụ', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › đại diện'},
      {k:'uyQuyen', n:'Bên cho vay: giấy ủy quyền', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › ủy quyền'},
      {k:'ten', n:'Họ và tên người vay', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'ns', n:'Ngày, tháng, năm sinh', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'cccd', n:'Thẻ căn cước số', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'ncap', n:'Ngày cấp · nơi cấp', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'han', n:'Có thời hạn đến', p:'kh', l:'tu', md:'tu', ng:'tính từ ngày sinh + ngày cấp'},
      {k:'noiO', n:'Nơi ở hiện tại', p:'kh', l:'tu', md:'tu', ng:'ấp, xã của người vay'},
      {k:'sdt', n:'Điện thoại liên hệ', p:'kh', l:'tu', md:'tu', ng:'phiếu hồ sơ / sổ hộ vay'},
      {k:'dkkd', n:'Giấy CN đăng ký hộ kinh doanh · ngày đăng ký · thay đổi', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh) / phương án'},
      {k:'gpkd', n:'Giấy phép KD có điều kiện · thời hạn', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh)'},
      {k:'mstKD', n:'Mã số thuế kinh doanh', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (hộ kinh doanh) / phương án'},
      {k:'tien', n:'Điều 1.1 Tổng số tiền cho vay (+ bằng chữ)', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'nl', n:'Điều 1.2 Số người được hỗ trợ việc làm', p:'kh', l:'tu', md:'tu', ng:'phương án › lao động'},
      {k:'th', n:'Điều 1.3 Thời hạn cho vay · hạn trả nợ cuối cùng', p:'kh', l:'tu', md:'tu', ng:'phương án / lịch trả gốc'},
      {k:'ls', n:'Điều 1.4 Lãi suất cho vay · quá hạn', p:'kh', l:'tu', md:'tu', ng:'⚙ chương trình (ưu tiên theo đối tượng)'},
      {k:'lich', n:'Điều 1.5 Kỳ hạn trả nợ gốc (ngày, số tiền)', p:'kh', l:'tu', md:'tu', ng:'lịch trả gốc theo thời hạn / kỳ hạn'},
      {k:'gn', n:'Điều 2 Hình thức giải ngân ☒ · người thụ hưởng · tài khoản', p:'kh', l:'tu', md:'tu', ng:'phương án › giải ngân'},
      {k:'md', n:'Điều 3 Mục đích sử dụng tiền vay', p:'kh', l:'tu', md:'tu', ng:'phương án › mục đích'},
      {k:'dd', n:'Điều 3 Nơi thực hiện phương án', p:'kh', l:'tu', md:'tu', ng:'phương án / nơi ở'},
      {k:'khac', n:'Điều 9 Một số thỏa thuận khác', p:'kh', l:'tu', md:'tu', ng:'phương án'},
      {k:'kyTen', n:'Họ tên dưới chữ ký Bên vay', p:'ky', l:'tu', md:'tu', ng:'người vay'},
      {k:'kyNH', n:'Họ tên dưới chữ ký Bên cho vay', p:'ky', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › đại diện'}],
    V:function(t, B){
      B = B || hsoBo(); var N = hsoBoNV(B), Q = hsoLaGQ(B) ? hsoGQ(B) : {A:{dong:[], tien:0, th:''}, C:{}, lich:[], ls:0, qh:0}, A = Q.A, Pa = (B && B.pa) || {}, L = Pa.ld || {}, d = hsoCCCDDoc(N.cccd), han = '';
      if(N.cccd && N.ns && N.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(String(N.cccd).replace(/\D/g, ''), N.ns, N.ncap); if(hn && hn.den) han = hn.den; }
      var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '', cuoi = Q.lich.length ? Q.lich[Q.lich.length-1].ngay : (B && B.hanCuoi) || '', dd = hsoPGD('daiDien');
      return {Q:Q, A:A, Pa:Pa, soHD:HSO.vay.soHD, ngayHD:B && B.ngayHD, nhTen:hsoPGD('ten'), nhDc:hsoPGD('diaChi'), nhDt:hsoPGD('dt'), daiDien:dd, chucVu:dd ? hsoPGD('chucVu') : '', uyQuyen:hsoPGD('uyQuyen'),
        ten:N.ten, ns:N.ns ? hsoNgayVN(N.ns) : '', cccd:N.cccd, ncap:N.ncap ? hsoNgayVN(N.ncap) : '', noiCap:N.noiCap, han:han ? ngayVNsl(han) : '', noiO:dc, sdt:N.sdt,
        dkkd:N.dkkd || Pa.gpkd, dkkdNgay:N.dkkdNgay, dkkdLan:N.dkkdLan, dkkdLanNgay:N.dkkdLanNgay, gpkd:N.gpkd, gpkdHan:N.gpkdHan, mstKD:N.mstKD || Pa.mst,
        tien:A.tien ? tdnTien(A.tien) : '', chu:A.tien ? hsoChuSo(A.tien) : '', nl:+L.tong || ((+L.tao||0)+(+L.duy||0)+(+L.mo||0)) || '', th:A.th, cuoi:cuoi,
        ls:Q.ls ? hsoSoVN(Q.ls) : '', qh:Q.qh ? hsoSoVN(Q.qh) : '', lich:Q.lich, gn:Pa.gn, thuHuong:Pa.gn==='ck' ? (Pa.thuHuong || N.ten) : '', stk:Pa.stk, nhGN:Pa.nh,
        md:A.dong && A.dong.length ? A.dong.map(function(x){ return x[0]+(x[1] ? ' ('+x[1]+')' : ''); }).join('; ') : '', dd:Pa.dd || dc, khac:Pa.khac, kyTen:N.ten, kyNH:dd};
    },
    lap:function(t, B){
      var V = this.V(t, B), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, f){ return C(k) && V[f]!=null ? String(V[f]) : ''; };
      var ng = function(k, iso, ds, op){ var x = hsoNg(iso), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, Object.assign({gt:C(k) ? p[i] : '', canh:'c'}, op||{})); }); };
      var nh = ng('ngayHD', V.ngayHD, ['.....', '....', '......']), cu = ng('th', V.cuoi, ['….', '….', '…..']);
      var d1 = ng('dkkd', V.dkkdNgay, ['…....', '.…..', '……...']), d2 = ng('dkkd', V.dkkdLanNgay, ['……', '…..', '…..…']);
      var lich = V.lich || [], ln = function(i){ var k = C('lich') && lich[i], x = ng('lich', k && k.ngay, ['........', '.........', '........']);
        return P('- Ngày '+x.join('/')+', số tiền:'+o('lich', '………….................', {gt:k ? tdnTien(k.tien) : ''})+' đồng.', J+S33+I(12.7)+W); };
      var conLai = C('lich') && lich.length>3 ? lich.slice(3).map(function(k){ return '- Ngày '+(k.ngay ? ngayVNsl(k.ngay) : '…/…/… (tháng thứ '+k.thang+')')+', số tiền: '+tdnTien(k.tien)+' đồng'; }).join('; ')+'.' : '';
      var ck = function(on){ return '<span class="om om-'+(C('gn') ? (OM_KIEU==='mau' ? 'mau' : 'tu') : 'cham')+'" data-o="gn">'+(C('gn') && on ? '☒' : '☐')+'</span>'; };
      var p12 = function(ch){ return '<span style="font-size:12pt">'+ch+'</span>'; };
      var h = hsoBang('khung0', [118.7, 41.3], '<tr><td><p class="c b s13" style="margin:0">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="c b" style="margin:0">Độc lập - Tự do - Hạnh phúc</p></td>'+
          '<td><p class="r b i s12" style="margin:0">Mẫu số 07b/GQVL</p><p class="r i s12" style="margin:0">Lập 02 liên</p><p class="r i s12" style="margin:0">01 liên lưu NH</p><p class="r i s12" style="margin:0">01 liên lưu KH</p></td></tr>')+
        P('&nbsp;')+P('<b>HỢP ĐỒNG TÍN DỤNG</b>'+sup('1'), 'text-align:center;font-size:16pt')+P('<b>Số: '+o('soHD', '...….')+'/20../HĐ-TD</b>', 'text-align:center')+
        P('<i>(Áp dụng cho vay đối với người lao động)</i>', 'text-align:center')+P('&nbsp;', J+I(12.7)+A34)+
        P('Căn cứ bộ Luật dân sự và các quy định pháp luật khác có liên quan; ', J+I(12.7)+A34)+
        P('Căn cứ Luật Việc làm số 74/2025/QH15 ngày 16/06/2025 của Quốc Hội;', J+I(12.7)+A34+'letter-spacing:-0.2pt')+
        P('Căn cứ Nghị định số 338/2025/NĐ-CP ngày 25/12/2025 của Chính phủ quy định chi tiết một số điều của Luật Việc làm về chính sách hỗ trợ tạo việc làm;', J+I(12.7)+E17+'letter-spacing:-0.2pt')+
        P('Căn cứ văn bản số 11055/HD-NHCS ngày 30/12/2025 của Tổng Giám đốc Ngân hàng Chính sách xã hội hướng dẫn nghiệp vụ cho vay hỗ trợ tạo việc làm, duy trì, mở rộng việc làm và các văn bản hướng dẫn có liên quan của Tổng Giám đốc NHCSXH;', J+I(12.7)+A34)+
        P('Hôm nay, ngày '+nh[0]+' tháng '+nh[1]+' năm '+nh[2]+' tại '+o('noiKy', '..............................……….…........')+' chúng tôi gồm:', J+I(9.6)+A34)+
        P('<b>Bên cho vay</b>', J+I(9.6)+S33)+
        P('- Tên Ngân hàng Chính sách xã hội: '+o('nhTen', '............................................................'), J+I(9.6)+S33+W)+
        P('- Địa chỉ: '+o('nhDc', '.........................................................................................................'), J+I(9.6)+S33+W)+
        P('- Điện thoại: '+o('nhDt', '....................................................................................................'), J+I(9.6)+S33+W)+
        P('- Họ và tên người đại diện:'+o('daiDien', '.............................')+'Chức vụ: '+o('daiDien', '................................', {gt:g('daiDien', 'chucVu')}), J+I(9.6)+S33+W)+
        P('- Giấy uỷ quyền (nếu có): '+o('uyQuyen', '...............................................................................'), J+I(9.6)+S33+W)+
        P('<b>Bên vay </b>', J+I(9.6)+S33)+
        P('- Họ và tên người vay: '+o('ten', '....................................................................................'), I(9.6)+S33+W)+
        P('- Ngày, tháng, năm sinh: '+o('ns', '…………………………………………………….'), I(9.6)+S33+W)+
        P('- Thẻ căn cước công dân/Thẻ căn cước số:'+o('cccd', '......................................................', {pt:12}), J+I(9.6)+S33+W+'font-size:12pt')+
        P('&nbsp;&nbsp;Ngày cấp'+o('ncap', '...........................................')+'nơi cấp'+o('ncap', '.................................................', {gt:g('ncap', 'noiCap')}), J+I(9.6)+S33+W)+
        P('&nbsp;&nbsp;Có thời hạn đến '+o('han', '............................................................................................'), J+I(9.6)+S33+W)+
        P('- Nơi ở hiện tại (thường trú/tạm trú):'+o('noiO', '.............................................................'), J+I(9.9)+E44+W)+
        P('- Điện thoại liên hệ:'+o('sdt', '........................................................................................'), I(9.6)+S33+W)+
        P('Giấy chứng nhận đăng ký hộ kinh doanh số (nếu có): '+o('dkkd', '…………….............'), J+I(10)+S6+W)+
        P('<i>Đăng ký lần đầu ngày '+d1[0]+'tháng'+d1[1]+'năm'+d1[2]+'</i>', J+I(10)+S6)+
        P('<i>Đăng ký thay đổi lần thứ:'+o('dkkd', '………', {gt:g('dkkd', 'dkkdLan'), canh:'c'})+'ngày'+d2[0]+'tháng'+d2[1]+'năm'+d2[2]+'</i>', J+I(10)+S6)+
        chanTrang(16, '1', 'Hợp đồng tín dụng được đánh máy và đóng dấu giáp lai, Bên cho vay và Bên vay cùng ký nháy vào từng trang (việc ký nháy kiểm soát nội dung trên các trang Hợp đồng của Bên cho vay do Giám đốc NHCSXH nơi cho vay phân công).')+
        P2('Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh', '(nếu có)'+sup(' 2')+':'+o('gpkd', '………………')+' thời hạn còn hiệu lực '+o('gpkd', '.........................................', {gt:g('gpkd', 'gpkdHan')}), J+I(10)+S6, 'line-height:1.15')+
        P('Mã số thuế kinh doanh đã đăng ký (nếu có):'+o('mstKD', '..............................................'), J+I(10)+X6+W)+
        P('Hai Bên cùng thống nhất ký kết Hợp đồng này theo các nội dung thỏa thuận sau đây:', I(9.6)+S33)+
        P('<b>Điều 1. Nội dung cho vay</b>', J+I(9.6)+S33)+
        P('1. Tổng số tiền cho vay (bằng số): '+o('tien', '..............................................')+' đồng.', J+I(12.7)+S33+W)+
        P('<i>Bằng chữ: '+o('tien', '...............................................................................................................', {gt:g('tien', 'chu')})+'</i>', J+S33+W)+
        P('2. Mục tiêu hỗ trợ tạo việc làm, duy trì, mở rộng việc làm cho:'+o('nl', '........................', {canh:'c'})+'người.', J+I(12.7)+S33)+
        P('3. Thời hạn cho vay: '+o('th', '……', {canh:'c'})+' tháng; hạn trả nợ cuối cùng ngày '+cu.join('/')+' ', J+I(12.7)+S33+W)+
        P('4. Lãi suất tiền vay: ', J+'margin-right:1mm;'+I(12.7)+E17+'letter-spacing:-0.1pt')+
        P('- Lãi suất cho vay: '+o('ls', '.…...', {canh:'c'})+' %/ năm.', J+'margin-left:9.6mm;'+I(12.7)+S33)+
        P('- Lãi suất quá hạn: '+o('ls', '.…...', {gt:g('ls', 'qh'), canh:'c'})+' %/ năm .', J+'margin-left:12.7mm;'+I(9.6)+S33)+
        P('Lãi tiền vay được tính kể từ ngày Bên vay nhận khoản vay đầu tiên đến ngày trả hết nợ gốc. Tiền lãi được Bên cho vay thu hàng tháng kể từ sau tháng nhận khoản vay đầu tiên, tiền lãi được tính trên số dư nợ thực tế;', J+L1+I(11.7)+E17)+
        P('Tiền lãi tháng nếu chưa thu được thì chuyển sang thu vào tháng kế tiếp sau đó.', J+L1+I(11)+E17)+
        P('5. Kỳ hạn trả nợ gốc', J+I(12.7)+S33)+ln(0)+ln(1)+ln(2)+P(o('lich', '……', {gt:conLai, rong:140}), J+I(12.7)+S33+W)+
        P('6. Thu nợ gốc, lãi', J+I(12.7)+S33)+P('- Bên cho vay thực hiện thu nợ gốc, lãi theo quy định của Bên cho vay.', J+I(12.7)+S33)+
        P('- Bên vay có thể trả nợ gốc trước hạn bằng tiền mặt hoặc trả vào tài khoản tổ viên của Bên vay. Trường hợp Bên vay trả vào tài khoản tổ viên:', J+'margin-right:1mm;'+I(11.7)+E44)+
        P('+ Bên vay nộp tiền vào tài khoản tổ viên, nội dung nộp tiền ghi rõ: “Nộp tiền trả nợ gốc và lãi tiền vay trước hạn cho Hợp đồng tín dụng số …” trên Giấy nộp tiền và thông tin cho Bên cho vay để làm cơ sở thực hiện thu nợ.', J+'margin-right:1mm;'+I(11.7)+E44)+
        P('+ Bên vay chuyển khoản vào tài khoản tổ viên, nội dung chuyển khoản ghi rõ: “Nộp tiền trả nợ gốc và lãi tiền vay trước hạn cho Hợp đồng tín dụng số …” và thông tin cho Bên cho vay để làm cơ sở thực hiện thu nợ.', J+'margin-right:1mm;'+I(11.7)+E44)+
        P('- Thứ tự thu nợ gốc, lãi của khoản vay thực hiện theo quy định của Bên cho vay.', J+I(12.7)+S33)+
        P('<b>Điều 2. Giải ngân</b>', J+I(12.7)+S33)+
        P('Hình thức giải ngân:&nbsp; Tiền mặt &nbsp; '+ck(V.gn==='tm'), J+I(12.7)+S33)+
        chanTrang(6.2, '2', 'Đối với các ngành nghề kinh doanh có điều kiện.')+
        P('Chuyển khoản:&nbsp; '+ck(V.gn==='ck'), J+I(55.6)+S33)+
        P('Tên người thụ hưởng.'+o('gn', p12('...........................................................................................................'), {gt:g('gn', 'thuHuong')}), J+S33+W)+
        P('Số tài khoản'+o('gn', p12('…..............................'), {gt:g('gn', 'stk')})+'tại.'+o('gn', p12('.................................................................................'), {gt:g('gn', 'nhGN')}), J+S33+W)+
        P('<b>Điều 3. Mục đích sử dụng tiền vay</b>', J+I(9.6)+S33)+
        khoi(G, 'md', ['……………………………………………………………………………', '……………………………………………………………………………', '….'], J+S33)+
        P('Nơi thực hiện phương án:', J+S33)+
        khoi(G, 'dd', ['……………………………………………………………………………', '……………………………………………………………………………'], J+S33)+
        P('<b>Điều 4. Điều chỉnh kỳ hạn trả nợ, gia hạn nợ, chuyển nợ quá hạn</b>', J+I(9.9)+S33)+
        [['1. Điều chỉnh kỳ hạn trả nợ', 0], ['Nếu Bên vay chưa trả được nợ gốc theo đúng kỳ hạn trả nợ đã thỏa thuận trong Hợp đồng tín dụng thì trước ít nhất 05 ngày đến hạn trả nợ, Bên vay phải có đề nghị điều chỉnh kỳ hạn trả nợ. Thời hạn điều chỉnh cho 01 kỳ hạn trả nợ gốc có thể một hoặc nhiều lần, nhưng tối đa không vượt quá thời hạn của kỳ hạn trả nợ tiếp theo.', 0],
          ['2. Gia hạn nợ', 0], ['Trước ngày đến hạn trả nợ cuối cùng, tối đa 03 tháng và tối thiểu 05 ngày làm việc, Bên vay không có khả năng trả được nợ và có nhu cầu gia hạn nợ, Bên vay phải lập Giấy đề nghị gia hạn nợ gửi Bên cho vay để xem xét cho gia hạn nợ theo quy định của Bên cho vay.', 1],
          ['3. Chuyển nợ quá hạn', 1], ['Đến kỳ hạn trả nợ kể cả nợ của kỳ hạn trước đó đã được điều chỉnh mà Bên vay chưa trả được nợ, không được Bên cho vay xem xét cho điều chỉnh kỳ hạn trả nợ thì Bên cho vay chuyển số dư nợ đó sang nợ quá hạn.', 1],
          ['Đến hạn cuối cùng của thời hạn cho vay đã thỏa thuận trong Hợp đồng tín dụng, nếu Bên vay chưa trả được nợ, không được Bên cho vay xem xét cho gia hạn nợ, thì Bên cho vay chuyển toàn bộ số dư nợ còn lại sang quá hạn. ', 1]
        ].map(function(x){ return P(x[0], J+(x[1] ? L1+I(11) : I(12.7))+E17); }).join('')+
        P('<b>Điều 5. Xử lý các vi phạm</b>', J+I(12)+E4)+
        [['1. Tạm dừng cho vay: Bên vay vi phạm các cam kết trong Hợp đồng tín dụng và đang trong thời gian khắc phục sửa chữa. ', 0],
          ['2. Chấm dứt cho vay: Bên vay vi phạm các cam kết trong Hợp đồng tín dụng nhưng không khắc phục, sửa chữa. Trong thời gian tối đa 03 tháng kể từ thời điểm thông báo cho Bên vay về việc chấm dứt cho vay, Bên cho vay thực hiện thu hồi nợ trước hạn, nếu Bên vay không trả hết số nợ vi phạm thì chuyển số nợ vi phạm còn lại sang quá hạn.', 0],
          ['3. Chuyển nợ quá hạn ', 0], ['- Đối với trường hợp Bên vay sử dụng vốn vay sai mục đích đã ghi trong', 3], ['Hợp đồng tín dụng và được ghi nhận trong Biên bản kiểm tra, sau thời gian tối đa', 4], ['30 ngày kể từ ngày phát hiện sai phạm được ghi trong Biên bản kiểm tra, Bên cho vay đã phối hợp với các cơ quan liên quan và chính quyền địa phương áp dụng các biện pháp để đôn đốc, yêu cầu Bên vay thực hiện nghĩa vụ trả nợ, nếu Bên vay không trả hết số nợ sử dụng sai mục đích thì chuyển số nợ sử dụng sai mục đích còn lại sang quá hạn;', 5],   /* gốc ngắt trang giữa đoạn này → tách đúng dòng gốc */
          ['4. Thu hồi nợ trước hạn', 0], ['Bên cho vay có quyền ra thu hồi nợ trước hạn trong các trường hợp sau: ', 1], ['- Bên vay bị khó khăn trong nhận thức và làm chủ hành vi.', 1],
          ['- Bên vay cung cấp sai sự thật, vi phạm quy định trong Hợp đồng này, không phối hợp với Bên cho vay trong quá trình kiểm tra, giám sát sau cho vay. ', 1],
          ['- Bên vay không thực hiện hoặc thực hiện không đúng, không đầy đủ các yêu cầu, chỉ dẫn của Bên cho vay liên quan đến các công việc nhằm ký kết, thực hiện, duy trì Hợp đồng này.', 1],
          ['- Bên vay vi phạm pháp luật, chính sách của Nhà nước; căn cứ kết luận của cơ quan Nhà nước có thẩm quyền về việc Bên cho vay phải thu hồi nợ trước hạn; hoặc Bên cho vay phải thu hồi nợ trước hạn để bảo đảm thu hồi nợ vay.', 1],
          ['5. Khởi kiện trước pháp luật: Bên cho vay có quyền khởi kiện trong các trường hợp sau: ', 0], ['- Bên vay vi phạm Hợp đồng tín dụng đã được Bên cho vay thông báo bằng văn bản nhưng không khắc phục;', 2],
          ['- Bên vay có nợ quá hạn do nguyên nhân chủ quan nhưng không có biện pháp khả thi để trả Bên cho vay; Bên vay có năng lực tài chính để trả nợ nhưng cố tình trốn tránh trả nợ theo thỏa thuận; ', 0],
          ['- Bên vay có hành vi lừa đảo, gian lận; ', 0], ['- Các vi phạm khác theo quy định của pháp luật.', 0]
        ].map(function(x){ return P(x[0], J+(x[1]===3 ? L1+I(11)+E17+W+TL : x[1]===4 ? L1+'line-height:17pt;'+W+TL : x[1]===5 ? L1+'line-height:17pt;' : x[1]===1 ? L1+I(11)+E17 : I(12.7)+E4+(x[1]===2 ? 'letter-spacing:-0.1pt;' : ''))); }).join('')+
        [['<b>Điều 6. Quyền và Nghĩa vụ của Bên cho vay</b>', '1. Thực hiện đúng những nội dung đã thoản thuận;', '2. Yêu cầu Bên vay thực hiện đúng các điều khoản thỏa thuận;', '3. Yêu cầu Bên vay cung cấp, xuất trình các tài liệu, thông tin cần thiết liên quan đến món vay;', '4. Kiểm tra, giám sát tình hình sử dụng vốn vay, khả năng trả nợ của Bên vay;', '5. Từ chối các yêu cầu của Bên vay không đúng với quy định của pháp luật và thỏa thuận trong Hợp đồng này.'],
          ['<b>Điều 7. Quyền và Nghĩa vụ của Bên vay</b>', '1. Thực hiện đúng những nội dung đã thoản thuận;', '2. Được quyền yêu cầu Bên cho vay thực hiện đúng các điều khoản thỏa thuận;', '3. Lưu giữ và cung cấp, xuất trình đầy đủ, kịp thời, trung thực các thông tin, tài liệu liên quan đến vay vốn và chịu trách nhiệm trước pháp luật về tính chính xác của các thông tin, tài liệu đã cung cấp; ', '4. Sử dụng vốn vay đúng mục đích; báo cáo việc sử dụng vốn vay và xuất trình tài liệu chứng minh việc sử dụng vốn vay theo Hợp đồng này;', '5. Chịu sự kiểm tra, giám sát của Bên cho vay trong sử dụng vốn vay và trả nợ;', '6. Phải thông báo kịp thời cho Bên cho vay những thay đổi về nơi cư trú, địa chỉ liên lạc, số điện thoại và những thay đổi khác ảnh hưởng đến khả năng trả nợ của Bên vay.'],
          ['<b>Điều 8. Cam kết chung</b>', '1. Hai bên cam kết thực hiện đúng các điều khoản của Hợp đồng tín dụng này. Mọi sửa đổi, bổ sung nội dung của các điều, khoản phải được sự thỏa thuận của hai bên bằng văn bản. ', '2. Trong quá trình thực hiện, nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không thương lượng được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện theo pháp luật.', '3. Hợp đồng này và các văn bản bổ sung hợp đồng (nếu có) là một bộ phận thống nhất không thể tách rời nhau, các Bên phải có nghĩa vụ chấp hành.', '4. Khi Bên vay trả hết nợ gốc, lãi và các chi phí phát sinh khác (nếu có) theo Hợp đồng này, thì Hợp đồng này mặc nhiên được thanh lý. ']
        ].map(function(ds){ return ds.map(function(x){ return P(x, J+I(12.7)+E17); }).join(''); }).join('')+
        P('<b>Điều 9. Một số thỏa thuận khác</b>', J+I(9.6)+S33)+
        khoi(G, 'khac', ['……………………………………………………………………………', '……………………………………………………………………………'], J+S33)+
        P('<b>'+Array(9).join('&nbsp;')+'Điều 10. Hợp đồng tín dụng có hiệu lực kể từ ngày ký cho tới khi Bên vay hoàn thành nghĩa vụ trả nợ bao gồm cả tiền gốc, lãi và các chi phí phát sinh khác (nếu có).</b>', J+E17)+
        P('Hợp đồng này được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản./.', J+I(12.7)+E17)+P('&nbsp;', J+E17)+P('&nbsp;')+
        hsoBang('khung0', [80, 80], '<tr><td class="c"><p class="c b" style="margin:0">ĐẠI DIỆN BÊN VAY</p><p class="c i s12" style="margin:0">(Ký, ghi rõ họ tên)</p>'+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('<b>'+o('kyTen', '&nbsp;', {rong:70, canh:'c'})+'</b>', 'text-align:center')+'</td>'+
          '<td class="c"><p class="c b" style="margin:0">ĐẠI DIỆN BÊN CHO VAY</p><p class="c i s12" style="margin:0">(Ký, ghi rõ họ tên và đóng dấu)</p>'+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('<b>'+o('kyNH', '&nbsp;', {rong:70, canh:'c'})+'</b>', 'text-align:center')+'</td></tr>');
      /* PHỤ LỤC — gốc ngắt trang trước phụ lục: gói "giữ liền" cao hơn chỗ còn lại của trang 5 → tự sang trang mới */
      var bd = 'border:.5pt solid #000;padding:0 1pt;', th = function(x, rs, cs, st){ return '<td'+(rs ? ' rowspan="'+rs+'"' : '')+(cs ? ' colspan="'+cs+'"' : '')+' style="'+bd+'text-align:center;vertical-align:middle;'+(st||'')+'"><b>'+x+'</b></td>'; };
      var so = function(n, st){ var r = '<tr>'; for(var i=1;i<=n;i++) r += '<td style="'+bd+'text-align:center;'+(st||'')+'">'+i+'</td>'; return r+'</tr>'; };
      var trong = function(n, h){ var r = ''; for(var j=0;j<5;j++){ r += '<tr style="height:'+h+'mm">'; for(var i=0;i<n;i++) r += '<td style="'+bd+'">&nbsp;</td>'; r += '</tr>'; } return r; };
      var bang = function(w, noi){ var t = w.reduce(function(a, b){ return a+b; }, 0); if(t > 159.5) w = w.map(function(x){ return x*159.5/t; });   /* gốc rộng 164,5 mm (lấn lề phải) → co vừa khổ, không bị cắt */
        return '<table style="border-collapse:collapse;table-layout:fixed;width:'+w.reduce(function(a, b){ return a+b; }, 0).toFixed(1)+'mm;font-size:12pt;line-height:1.15"><colgroup>'+w.map(function(x){ return '<col style="width:'+x.toFixed(2)+'mm">'; }).join('')+'</colgroup>'+noi+'</table>'; };
      var dv = function(st){ return P('<i>Đơn vị: đồng</i>', 'text-align:right;font-size:12pt;'+(st||'')); };
      var pl = '<div class="kt-giu">'+P('<b>PHỤ LỤC HỢP ĐỒNG TÍN DỤNG</b>', 'text-align:center')+
        P('<i>(kèm theo Hợp đồng tín dụng số: '+o('soHD', '……')+'/20…./HĐ-TD ngày '+ng('ngayHD', V.ngayHD, ['…', '…', '…..']).join('/')+')</i>', 'text-align:center')+
        P('1. Phần theo dõi cho vay ', I(12.7)+'margin-top:3pt')+dv()+
        bang([15.4, 29.1, 22.5, 25, 27.5, 22.5, 22.5], '<tr>'+th('Ngày tháng năm', 2)+th('Số tiền giải ngân', 2)+th('Lãi suất %/<br>năm', 2)+th('Hạn trả nợ cuối cùng', 2)+th('Dư nợ trong hạn', 2)+th('Chữ ký', 0, 2)+'</tr><tr>'+th('Bên vay')+th('Kế toán')+'</tr>'+so(7, 'font-size:9pt;padding-top:1pt')+trong(7, 5.7))+
        P('&nbsp;', 'margin-left:19.9mm')+P('<b>2. Phần theo dõi điều chỉnh kỳ hạn trả nợ, gia hạn nợ </b>', I(12.7)+'margin-top:6pt;margin-bottom:3pt')+dv('margin-top:6pt;margin-bottom:3pt')+
        bang([24.9, 24, 24.6, 24, 24.6, 21.7, 20.1], '<tr>'+th('Ngày, tháng, năm', 2, 0, 'padding:3pt 1pt')+th('Điều chỉnh kỳ hạn trả nợ', 0, 2)+th('Gia hạn nợ', 0, 2)+th('Chữ ký', 0, 2)+'</tr><tr>'+
          th('Số tiền', 0, 0, 'padding:3pt 1pt')+th('Đến ngày, tháng, năm')+th('Số tiền')+th('Đến ngày, tháng, năm')+th('Bên vay')+th('Kế toán')+'</tr>'+so(7, 'font-size:11pt;font-style:italic;padding:3pt 1pt')+trong(7, 9.5))+
        P('&nbsp;', 'margin-left:19.9mm;margin-top:6pt;margin-bottom:3pt')+P('<b>3. Phần theo dõi nợ quá hạn, nợ bị rủi ro</b>', I(12.7)+S33)+dv(S33)+
        bang([16.9, 30.1, 40, 35, 22.5, 20], '<tr style="height:3.2mm">'+th('Ngày tháng năm', 2)+th('Diễn giải', 2)+th('Số tiền chuyển nợ quá hạn/khoanh nợ/xoá nợ', 2)+th('Dư nợ quá hạn/khoanh nợ/xoá nợ', 2)+th('Chữ ký', 0, 2)+'</tr><tr style="height:10mm">'+th('Bên vay')+th('Kế toán')+'</tr>'+so(6, 'font-size:10pt')+trong(6, 5.7))+'</div>';
      return {ma:'07b/GQVL', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+pl+'</div>'};
    }});
  hsoLap07b = function(t, B){ return omLap(MK, t, B); };
  var M = hsoMauK(MK); if(M){ M.mg = omMg([20, 20, 17, 30]); M.so = 'so'; }   /* lề + số trang (từ trang 2) theo file gốc */
})();
