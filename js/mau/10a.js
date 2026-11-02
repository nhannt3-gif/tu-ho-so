/* ===== 3.223 M6 — MẪU 10A/TD Biên bản họp thành lập Tổ TK&VV (QĐ 70) trên nền ô — dựng theo file gốc tests/mau_goc/10a.docx =====
   Lề 20 / 20 / 20 / 30 mm · Times New Roman 14 · thân bài dòng cố định 17 pt, cách 6 pt, thụt 12,7 mm · danh sách: 3.443 khung cố định 100 tổ viên 3 cột × 34 dòng (trang 1–2), phần II luôn sang trang 3 (anh 02/11).
   Ngày họp / ngày UBND mặc định chấm (anh chốt). Ô "Mẫu số" của gốc nằm trên lề trên (hộp chữ) → app đặt góc phải đầu trang. Bỏ file này → app dùng lại hsoLap10a cũ. */
(function(){
  var MK = '10a';
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm(s, 'text-indent') - mm(s, 'margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:-0.25mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.7mm;', H15 = 'margin:6pt 0;line-height:15pt;', H17 = 'margin:0 0 5pt;line-height:16pt;'   /* cách 6 pt dồn về sau đoạn: đầu trang không thêm khoảng (như Word) */;
  function hso10aCo(ten){ var r = 161.5/3 - 2.4 - omRong('100. ', 12), c = [12, 11, 10, 9].find(function(pt){ return omRong(String(ten||''), pt) <= r; }); return c || 9; }   /* 3.443.1: tên dài hơn ô → thu chữ 11 / 10 / 9 (ô cao cố định, không xuống dòng) */
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }
  omDangKy({k:MK, ma:'10A/TD', phan:['to', 'hoi', 'ub', 'ky'], co:14,
    o:[{k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'diaDiem', n:'Địa điểm / địa bàn: Thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'soNguoi', n:'- … người là đại diện hộ gia đình', p:'to', l:'go', md:'cham'},
      {k:'truongAp', n:'Trưởng thôn chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'chuTri', n:'Chủ trì: Ông (Bà) · chức vụ · Hội', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'thuKy', n:'Thư ký: Ông (Bà) (đại diện hộ gia đình)', p:'to', l:'tu', md:'cham', ng:'tổ phó'},
      {k:'tv', n:'I. Danh sách tổ viên · Tổng số', p:'to', l:'tu', md:'tu', ng:'tổ viên của tổ (bỏ tích ở cột trái)'},
      {k:'ngayDK', n:'II.2 Tổ họp định kỳ vào ngày', p:'to', l:'kb', md:'kb', ng:'khai 1 lần'},
      {k:'tk', n:'II.5c Tiết kiệm tối thiểu (đồng/tổ viên)', p:'to', l:'tukb', md:'tu', ng:'ô "Tiết kiệm tối thiểu" cột trái'},
      {k:'tuThang', n:'II.5c … kể từ tháng …/…', p:'to', l:'go', md:'cham'},
      {k:'bql', n:'III. Ban quản lý: Tổ trưởng · Tổ phó', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / khai báo'},
      {k:'bq', n:'IV. …/… tổ viên biểu quyết tán thành', p:'to', l:'go', md:'cham'},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ub', n:'Phê duyệt UBND: thôn · xã · tỉnh · tổ trưởng · tổ phó', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ubNgay', n:'Phê duyệt UBND: ngày … tháng … năm', p:'ub', l:'go', md:'cham', ngay:1},
      {k:'ky', n:'Họ tên dưới chữ ký (trưởng thôn, chủ trì)', p:'ky', l:'tu', md:'tu', ng:'khai báo'}],
    V:function(t){
      var T = hsoTo(t), tv = hsoTVTo(t).filter(function(k){ return HSO.tv[k.kh]!==false; }), N = hsoNguoiHoi(t), h = T.hoi || '', L = hsoLuu();
      return {T:T, tv:tv, ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, truongAp:T.truongAp, cb:N.cb, cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h,
        thuKy:T.pho, tong:tv.length ? String(Math.min(tv.length, HSO_10A_TV)) : '', ngayDK:L.ngayDK, tk:L.tkMin ? tdnTien(hsoSo(L.tkMin)) : '', tt:T.tt, pho:T.pho, ubNgay:HSO.o.ubNgay};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var nd = ngd('ngay', ['….', '……', '………']), un = ngd('ubNgay', ['......', '........', '.....']);
      var tv = (C('tv') ? V.tv : []).slice(0, HSO_10A_TV), ds = '', R = 'line-height:1.15;font-size:12pt;';   /* 3.443 (anh 02/11): khung cố định 100 tổ viên (QĐ 70), 3 cột × 34 dòng đánh số dọc theo cột, nằm trang 1–2 — sửa tên không đẩy trang 3–4 */
      for(var i=0;i<HSO_10A_DONG;i++){ ds += '<tr style="height:'+HSO_10A_CAO+'mm">';
        for(var c=0;c<3;c++){ var j = c*HSO_10A_DONG+i, a = tv[j]; var cx = a ? hso10aCo(a.ten) : 12, nd = (j+1)+'. '+o('tv', '....................................', {gt:a ? a.ten : ''});
          ds += '<td style="padding:0 1.2mm;vertical-align:bottom;overflow:hidden;white-space:nowrap">'+(j<HSO_10A_TV ? P(cx<12 ? '<span class="s'+cx+'">'+nd+'</span>' : nd, R+W) : '')+'</td>'; }
        ds += '</tr>'; }
      var hoi = V.hoiLa ? 'Hội '+o('chuTri', '..........', {gt:g('chuTri', V.hoiTen)}) : o('chuTri', 'Hội ..........', {gt:g('chuTri', V.hoiTen)});
      var qu = [
        '1. Tổ TK&amp;VV là tập hợp hộ nghèo và các đối tượng chính sách khác theo quy định của pháp luật, có nhu cầu vay vốn, thực hành tiết kiệm và tham gia hoạt động khác do NHCSXH cung cấp.',
        '2. Tổ TK&amp;VV hoạt động theo nguyên tắc tập thể, biểu quyết theo đa số dưới sự điều hành của Ban quản lý Tổ. Tổ họp định kỳ hằng tháng (quý) vào ngày '+o('ngayDK', '.......', {canh:'c'})+' hoặc đột xuất để giải quyết công việc phát sinh (nếu có). Nội dung họp Tổ do Tổ trưởng chuẩn bị và thống nhất trong Ban quản lý Tổ.',
        '3 Cuộc họp Tổ khi có các nội dung biểu quyết thì phải có sự tham gia chứng kiến của đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã và Trưởng thôn/Tổ trưởng Tổ dân phố, đồng thời phải có trên 1/2 số tổ viên của Tổ tham gia họp và có trên 2/3 số tổ viên tham gia họp biểu quyết tán thành mới có giá trị thực hiện. ',
        'Các nội dung họp Tổ phải biểu quyết bao gồm: Thành lập Tổ; bầu, thay đổi Tổ trưởng hoặc Tổ phó; sửa đổi Quy ước hoạt động của Tổ; kết nạp tổ viên; bình xét cho vay; bắt buộc tổ viên ra khỏi Tổ khi không thực hiện đúng Quy ước hoạt động của Tổ. Nội dung cuộc họp Tổ được lập thành biên bản và được thông qua trước khi kết thúc cuộc họp.',
        '4. Điều hành hoạt động của Tổ là Ban quản lý Tổ do các tổ viên trong Tổ bầu chọn. Ban quản lý Tổ gồm Tổ trưởng và Tổ phó, đáp ứng các tiêu chuẩn quy định tại khoản 2 Điều 8 Quyết định số 70/QĐ-HĐQT.',
        'Ban quản lý Tổ phối hợp, giám sát lẫn nhau để điều hành hoạt động của Tổ thực hiện nhiệm vụ quy định tại Quy chế hoạt động Tổ và Quy ước hoạt động được Tổ thông qua, thực hiện các nội dung công việc theo hợp đồng ủy nhiệm ký với NHCSXH. Trong đó, nhiệm vụ cụ thể như sau: ',
        'a) Tổ trưởng chịu trách nhiệm điều hành hoạt động của Tổ theo Quy ước hoạt động của Tổ và thực hiện nhiệm vụ, trách nhiệm của Ban quản lý Tổ; triệu tập và chủ trì các cuộc họp; ký hợp đồng ủy nhiệm với NHCSXH; giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch; có trách nhiệm thanh toán số tiền hoa hồng được NHCSXH chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.',
        'b) Tổ phó ghi chép biên bản các cuộc họp; giúp việc cho Tổ trưởng, điều hành và giải quyết các công việc của Tổ khi được Tổ trưởng phân công; thay mặt Tổ trưởng giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch khi Tổ trưởng vắng mặt. ',
        ['5. Các tổ viên trong Tổ cam kết thực hiện tốt các nội dung sau:', 1],
        ['a) Tham gia đầy đủ và biểu quyết tại các cuộc họp Tổ; tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm,... để nâng cao trình độ sản xuất kinh doanh.', 1],
        ['b) Sử dụng vốn vay đúng mục đích đề nghị vay, có hiệu quả. Có nghĩa vụ trả nợ (gốc, lãi) đầy đủ, đúng kỳ hạn đã thoả thuận với NHCSXH. ', 1],
        ['c) Thực hành tiết kiệm và gửi vào NHCSXH theo định kỳ hằng tháng với mức tối thiểu là '+o('tk', '......................')+' đồng/tổ viên kể từ tháng'+o('tuThang', '.......', {canh:'c'})+'/'+o('tuThang', '..........', {gt:''})+' hoặc khi Tổ họp thống nhất thay đổi. Trường hợp tổ viên gặp khó khăn không thực hiện được theo mức tối thiểu thì thực hiện theo nhu cầu và khả năng thực tế.', 1],
        ['d) Mỗi tổ viên cam kết tương trợ giúp đỡ nhau, trao đổi kinh nghiệm trong sản xuất, kinh doanh và đời sống; có trách nhiệm giám sát lẫn nhau trong việc vay vốn, sử dụng vốn vay, trả nợ (gốc, lãi) NHCSXH và thực hiện nghiêm túc Quy ước hoạt động của Tổ.', 1],
        'đ) Trường hợp Ban quản lý Tổ được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên trong Tổ hoàn toàn nhất trí để Ban quản lý Tổ thu tiền để nộp cho NHCSXH. Riêng việc trả nợ gốc, tổ viên phải thực hiện trả nợ gốc trực tiếp cho Ngân hàng tại điểm giao dịch hoặc trụ sở NHCSXH nơi cho vay; hoặc trả nợ gốc bằng chuyển khoản vào tài khoản thanh toán của tổ viên mở tại NHCSXH để Ngân hàng thu nợ theo quy định.',
        'Mỗi lần nộp tiền cho Tổ trưởng, tổ viên ký vào Bảng kê thu tiền ngay khi nộp tiền cho Tổ trưởng; đồng thời, nhận lại Biên lai thu tiền, tiến hành kiểm tra, đối chiếu về số tiền gốc, số tiền lãi còn nợ, số dư tài khoản Tổ viên đã được in trên Biên lai và thông báo cho NHCSXH nếu có chênh lệch. ',
        ['e) Trường hợp Ban quản lý Tổ không được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên có trách nhiệm chuyển khoản, nộp tiền vào tài khoản thanh toán của tổ viên mở tại NHCSXH nơi cho vay, bảo đảm số dư trước ngày đến hạn để Ngân hàng thu nợ theo quy định và đối chiếu kết quả giao dịch, thông báo nợ đến hạn kỳ tiếp theo do NHCSXH gửi đến. ', 2],
        'g) Tổ viên phải lưu giữ đầy đủ các loại sổ sách, giấy tờ sau:', ['- Sổ vay vốn/Hợp đồng tín dụng.  ', 1],
        '- Biên lai thu tiền có chữ ký của Tổ trưởng (người thu tiền) để làm cơ sở chứng minh cho số tiền đã nộp (trường hợp nộp tiền cho Ban quản lý Tổ). ',
        '- Cài đặt ứng dụng do NHCSXH cung cấp để theo dõi biến động số dư tiền gửi, tiền vay, kết quả giao dịch trong kỳ và nợ đến hạn kỳ tiếp theo được Ngân hàng gửi đến.'];
      var h = '<div style="position:relative;height:0"><div style="position:absolute;right:0;top:0;line-height:1.15">'+P('<b><i>Mẫu số: 10A/TD</i></b>', 'text-align:right;font-size:11pt')+P('<i>Lập 02 liên:</i>', 'text-align:right;font-size:11pt')+
          P('<i>- 01 liên lưu NH </i>', 'text-align:right;font-size:11pt')+P('<i> - 01 liên lưu Tổ</i>', 'text-align:right;font-size:11pt')+'</div></div>'+   /* gốc: hộp chữ nằm trên lề trên */
        P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt;padding-right:6mm')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center')+
        '<p class="ke" data-ke="60" style="width:60mm;margin:0.5pt auto 0"></p>'+P('&nbsp;', 'line-height:1.15;height:6mm')+
        P('<b>BIÊN BẢN HỌP </b>', 'text-align:center')+P('<b>Về việc thành lập Tổ Tiết kiệm và vay vốn </b>', 'text-align:center')+P('&nbsp;', 'line-height:18pt')+
        P('<b>Thời gian bắt đầu: '+o('gio', '…….', {canh:'c'})+' giờ'+o('gio', '……', {gt:''})+', ngày'+nd[0]+'/'+nd[1]+'/'+nd[2]+'</b>', J+F+H15+W)+
        P('<b>Địa điểm: Thôn'+o('diaDiem', '………….……', {gt:g('diaDiem', V.ap)})+', xã'+o('diaDiem', '……….………', {gt:g('diaDiem', V.xa)})+', tỉnh'+o('diaDiem', '…………...……', {gt:g('diaDiem', V.tinh)})+'</b>', J+F+H15+W)+
        P('<b>Thành phần tham dự: </b>', J+F+H15)+
        P2('-'+o('soNguoi', '………', {canh:'c'})+'người là đại diện hộ gia đình cùng cư trú tại địa bàn thôn', o('diaDiem', '…………...………...', {gt:g('diaDiem', V.ap)})+', xã'+o('diaDiem', '…………………….', {gt:g('diaDiem', V.xa)})+', tỉnh'+o('diaDiem', '………………………………', {gt:g('diaDiem', V.tinh)}), J+F+H15, 'line-height:15pt;margin-bottom:6pt')+
        P('- Ông (Bà)'+o('truongAp', '..............................................')+'là Trưởng thôn, chứng kiến cuộc họp', J+F+H15+W+'letter-spacing:-0.2pt')+
        P('<b>Chủ trì</b>: Ông (Bà)'+o('chuTri', '...................................', {gt:g('chuTri', V.cb)})+' Chức vụ'+o('chuTri', '..............................', {gt:g('chuTri', V.cv)})+hoi+'.', J+F+H15+W+'letter-spacing:-0.3pt')+
        P('<b>Thư ký:</b> Ông (Bà)'+o('thuKy', '...................................................................')+' là đại diện hộ gia đình.', J+F+H15+W+'letter-spacing:-0.2pt')+
        P('<b>Nội dung cuộc họp</b><b>:</b><b> </b>', F+'margin:6pt 0;line-height:16pt')+
        P('Các đại diện hộ gia đình và cá nhân trực tiếp thuộc đối tượng vay vốn tự nguyện họp để thành lập Tổ Tiết kiệm và vay vốn (TK&amp;VV) theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị Ngân hàng Chính sách xã hội (NHCSXH) về Quy chế hoạt động Tổ TK&amp;VV. Sau khi thảo luận, các thành viên dự họp thống nhất các nội dung sau:', J+F+'margin:6pt 0;line-height:16pt')+
        P('<b>I. DANH SÁCH TỔ VIÊN </b>', J+F+'margin-top:6pt;font-size:13pt;letter-spacing:-0.6pt')+
        '<table class="khung0 s12 tv100" data-w="1,1,1" data-cao="'+HSO_10A_CAO+'" style="width:161.5mm;table-layout:fixed"><colgroup><col style="width:33.33%"><col style="width:33.33%"><col style="width:33.34%"></colgroup>'+ds+'</table>'+
        P('<b>Tổng số: '+o('tv', '..............', {gt:g('tv', V.tong), canh:'c'})+'tổ viên</b>', J+F+'margin-top:3pt')+
        P('<b>II. QUY ƯỚC HOẠT ĐỘNG CỦA TỔ TK&amp;VV</b>', J+F+H17+'font-size:13pt').replace('<p ', '<p class="kt-b" ')+
        qu.map(function(x){ var c = Array.isArray(x) ? x[1] : 0, s = Array.isArray(x) ? x[0] : x; return P(s, J+F+(c===1 ? H17 : H17+(c===2 ? 'letter-spacing:-0.3pt' : ''))); }).join('')+
        P('<b>III. BẦU BAN QUẢN LÝ CỦA TỔ TK&amp;VV</b>', J+F+H17+'font-size:13pt').replace('<p ', '<p class="kt-b" ')+
        P('1. Các tổ viên dự họp thống nhất bầu Ban quản lý Tổ gồm các Ông (Bà) có tên dưới đây:', J+F+H17)+
        P('a) Ông (Bà)'+o('bql', '..................................................................', {gt:g('bql', V.tt)})+' Chức vụ: Tổ trưởng;', J+F+H17+W)+
        P('b) Ông (Bà)'+o('bql', '..................................................................', {gt:g('bql', V.pho)})+' Chức vụ: Tổ phó.', J+F+H17+W)+
        P('2. Ban quản lý Tổ thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT và các quy định liên quan của NHCSXH.', J+F+H17+'letter-spacing:0.1pt')+
        P('<b>IV. KẾT QUẢ BIỂU QUYẾT</b>', J+F+H17+'font-size:13pt').replace('<p ', '<p class="kt-b" ')+
        P(o('bq', '......', {canh:'c'})+'/'+o('bq', '......', {gt:''})+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung: Danh sách tổ viên, Quy ước hoạt động của Tổ TK&amp;VV và Bầu Ban quản lý Tổ TK&amp;VV. ', J+F+H17)+
        P('Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận hoạt động của Tổ TK&amp;VV tại địa phương.', J+F+H17)+
        P('Cuộc họp kết thúc vào'+o('ketThuc', '........', {canh:'c'})+'giờ'+o('ketThuc', '......', {gt:''})+', ngày'+o('ketThuc', '.....', {gt:''})+'/'+o('ketThuc', '.......', {gt:''})+'/'+o('ketThuc', '...........', {gt:''})+'/.', J+F+H17+W)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:50.6mm"><col style="width:52.8mm"><col style="width:56.6mm"></colgroup><tr style="height:11.2mm">'+
          [['THƯ KÝ', '(Ký, ghi rõ họ tên)', ''], ['TRƯỞNG THÔN', '(Ký, ghi rõ họ tên)', V.truongAp], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', V.cb]].map(function(x){ return '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>'+x[0]+'</b>', 'text-align:center;font-size:12pt')+P('<i>'+x[1]+'</i>', 'text-align:center;font-size:12pt')+'</td>'; }).join('')+'</tr></table>'+
        [1, 2, 3, 4, 5, 6, 7].map(function(i){ return i===5 ? '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:50.6mm"><col style="width:52.8mm"><col style="width:56.6mm"></colgroup><tr><td></td><td>'+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.truongAp), rong:48, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td><td>'+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.cb), rong:52, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td></tr></table>' : P('&nbsp;', 'line-height:18pt'); }).join('')+
        P('PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ', 'text-align:center;font-size:13pt;line-height:18pt')+
        P('Chấp thuận cho Tổ TK&amp;VV tại thôn '+o('ub', '…....................................', {gt:g('ub', V.ap)})+', xã'+o('ub', '…..........................................', {gt:g('ub', V.xa)})+', tỉnh '+o('ub', '..........................................', {gt:g('ub', V.tinh)})+' do Ông (Bà) '+o('ub', '....................................................................…….', {gt:g('ub', V.tt)})+' làm Tổ trưởng và Ông (Bà) '+o('ub', '.............................................................................', {gt:g('ub', V.pho)})+' làm Tổ phó được thành lập, hoạt động theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV.', J+F+'margin:6pt 0;line-height:16pt')+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:45.7%"><col style="width:54.3%"></colgroup><tr><td></td><td style="padding:0 1.9mm">'+
          P('<i>Ngày'+un[0]+'tháng'+un[1]+'năm '+un[2]+'</i>', 'text-align:center')+P('<b>UBND CẤP XÃ</b>', 'text-align:center;font-size:13pt')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center;font-size:12pt')+'</td></tr></table>'+'';   /* 3.443.1: chừa chỗ UBND ký, đóng dấu (cả mẫu vẫn 4 trang) */
      return {ma:'10A/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10a = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([15, 20, 15, 30]);   /* 3.443.1: tiêu đề mục II–IV class kt-b → bộ chia trang kéo theo đoạn sau (không treo cuối trang) · (anh 02/11 "giảm lề, giãn dòng dư" → 4 trang): lề trên / dưới 20 → 15 mm */
})();
