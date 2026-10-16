/* ===== 3.223 M6 — MẪU 11/TD CŨ (trước 01/10/2026, QĐ 15) Hợp đồng ủy nhiệm — trên nền ô, dựng theo file gốc tests/mau_goc/11_cu.docx =====
   Anh chốt 16/10: chip riêng, độc lập với 11 mới. Ngày mặc định chấm.
   Lề 20 / 20 / 17 / 30 mm · Times New Roman 14 · điều khoản dòng tối thiểu 19,5 pt, cách trước 6 pt · 6 trang, số trang góc dưới phải.
   Cách đoạn tính như Word: khoảng giữa 2 đoạn = max(sau đoạn trên, trước đoạn dưới), dồn về sau đoạn → đầu trang không thừa khoảng.
   Gốc ngắt trang giữa 4 đoạn → tách đúng dòng gốc. Bỏ file này → chip 11 cũ báo chưa có mô-đun. */
(function(){
  var MK = '11cu', NEN = 0;   /* mẫu này ngắt dòng khớp gốc khi KHÔNG co khoảng trắng */
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm(s, 'text-indent') - mm(s, 'margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:'+NEN+'mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.5mm;', F7 = 'text-indent:12.7mm;';
  var L19 = 'line-height:19.5pt;', L1 = 'line-height:1.15;';
  function dung(ds){   /* ds = [[html, kiểu, trước (pt), sau (pt)] | [bảng html, null, trước, sau]] → khoảng = max(sau, trước kế tiếp) dồn về sau đoạn */
    return ds.map(function(x, i){ var sau = Math.max(x[3]||0, ds[i+1] ? ds[i+1][2]||0 : 0), dau = i ? 0 : x[2]||0;
      if(x[1]===null) return /^<table style="/.test(x[0]) ? x[0].replace('<table style="', '<table style="margin:'+dau+'pt 0 '+sau+'pt;') : '<div style="margin:'+dau+'pt 0 '+sau+'pt">'+x[0]+'</div>';
      return P(x[0], x[1]+'margin-top:'+dau+'pt;margin-bottom:'+sau+'pt'); }).join(''); }
  function bang(w, noi){ return '<table style="border-collapse:collapse;table-layout:fixed;width:'+w.reduce(function(a, b){ return a+b; }, 0).toFixed(1)+'mm"><colgroup>'+w.map(function(x){ return '<col style="width:'+x+'mm">'; }).join('')+'</colgroup>'+noi+'</table>'; }
  function td(x, st, at){ return '<td'+(at||'')+' style="padding:0 1.9mm;vertical-align:middle;'+(st||'')+'">'+x+'</td>'; }
  omDangKy({k:MK, ma:'11/TD cũ', phan:['nhs', 'to', 'ky'], co:14,
    o:[{k:'ngayHD', n:'Hôm nay, ngày … (ký hợp đồng)', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noiKy', n:'… tại … (nơi ký)', p:'nhs', l:'tukb', md:'tu', ng:'"PGD NHCSXH" + ⚙ Khai báo đơn vị › PGD'},
      {k:'ngan', n:'Bên A: Ngân hàng Chính sách xã hội …', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD'},
      {k:'daiDien', n:'Bên A: Đại diện · chức vụ', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › đại diện'},
      {k:'diaChi', n:'Bên A: địa chỉ', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › địa chỉ'},
      {k:'dt', n:'Bên A: số điện thoại', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › điện thoại'},
      {k:'tt', n:'Bên B: Ban quản lý Tổ · đại diện (tổ trưởng)', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'hoi', n:'Bên B: thuộc Hội', p:'to', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'cccd', n:'Bên B: Thẻ CC số · ngày cấp · nơi cấp', p:'to', l:'tu', md:'tu', ng:'tổ trưởng — Mẫu 31'},
      {k:'diaDiem', n:'Bên B: địa chỉ ấp (kp) · xã (phường)', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'hdCu', n:'Thay thế Hợp đồng đã ký ngày …', p:'to', l:'go', md:'cham', ngay:1},
      {k:'ky', n:'Họ tên dưới chữ ký (Bên B, Bên A)', p:'ky', l:'tu', md:'tu', ng:'tổ trưởng / ⚙ đại diện PGD'}],
    V:function(t){
      var T = hsoTo(t), K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {}, dd = hsoPGD('daiDien'), ng = hsoPGD('ngan');
      return {K:K, ngayHD:HSO.o.ngay, noiKy:ng ? 'PGD NHCSXH '+ng : '', ngan:ng, daiDien:dd, chucVu:dd ? hsoPGD('chucVu') : '', diaChi:hsoPGD('diaChi'), dt:hsoPGD('dt'),
        tt:T.tt, hoi:/^Hội\s/i.test(T.hoi||'') ? hsoBoHoi(T.hoi) : T.hoi, cccd:c.cccd, ncap:c.ncap ? ngayVNsl(c.ncap) : '', noiCap:c.noiCap, ap:T.ap, xa:T.xa, hdCu:HSO.o.hdCu};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var hn = ngd('ngayHD', ['.....', '.....', '...........']), hc = ngd('hdCu', ['…….', '……', '…….']);
      var D = J+F+L19, D7 = J+F7+L1, cat = function(a, b, st){ return [[a, st+TL, 6, 0], [b, J+L19, 0, 0]]; };   /* đoạn gốc ngắt trang giữa chừng: dòng cuối trang trước giãn đều, phần sau sang trang */
      var ds = [
        [P('&nbsp;', 'text-align:center')+P('<span style="font-size:15pt">HỢP ĐỒNG UỶ NHIỆM </span>', 'text-align:center')+P('<b>Về việc thu lãi, thu tiền gửi và thực hiện một số nội dung công việc khác</b>', 'text-align:center;'+W)+
          P('<b>trong quy trình cho vay của Ngân hàng Chính sách xã hội</b>', 'text-align:center')+P('&nbsp;', 'text-align:center'), null, 0, 0],
        ['Căn cứ Quy chế tổ chức và hoạt động Tổ Tiết kiệm và vay vốn (TK&amp;VV) ban hành kèm theo Quyết định số 15/QĐ-HĐQT ngày 05/3/2013 của Hội đồng quản trị NHCSXH;', D7, 6, 6],
        ['Căn cứ Biên bản họp về việc thành lập Tổ tiết kiệm và vay vốn (TK&amp;VV) đã được Uỷ ban nhân dân xã chấp thuận và cho phép hoạt động,', D7+'letter-spacing:-0.3pt;', 6, 6],
        ['Hôm nay, ngày '+hn.join('/')+' , tại '+o('noiKy', '……………………………')+'.', D7+W, 6, 6], ['Chúng tôi gồm có:', D7, 6, 6],
        ['<b>1. Bên uỷ nhiệm (bên A)</b>', D7, 6, 6], ['- Ngân hàng Chính sách xã hội '+o('ngan', '……………………')+'.', D7+W, 6, 6],
        ['- Đại diện Ông (bà): '+o('daiDien', '………………………')+' - Chức vụ: '+o('daiDien', '……………', {gt:g('daiDien', V.chucVu)}), D7+W, 6, 6],
        ['- Địa chỉ: '+(C('diaChi') && V.diaChi ? o('diaChi', '', {hai:11.4, rong:126}) : o('diaChi', '…………………………………………………………')+'<br>'+o('diaChi', '……………', {gt:''})), D7, 6, 6],   /* gốc 2 dòng */ ['- Số điện thoại: '+o('dt', '…………………………'), D7+W, 6, 6],
        ['<b>2. Bên nhận uỷ nhiệm (bên B)</b>', D7, 6, 6],
        ['- Ban quản lý Tổ TK&amp;VV: '+o('tt', '.............................')+' thuộc Hội: '+o('hoi', '………………..'), D7+W, 6, 6],
        ['- Đại diện ông (bà): '+o('tt', '……….…..……………')+'&nbsp;&nbsp;&nbsp;&nbsp; - Chức vụ: Tổ trưởng.', D7+W, 6, 6],
        ['- Thẻ CC\\CCCD số: '+o('cccd', '…………………')+' ngày cấp: '+o('cccd', '……………', {gt:g('cccd', V.ncap)})+', Nơi cấp:<br>'+o('cccd', '…….…… ………………………………………………………..', {gt:g('cccd', V.noiCap)}), D7, 6, 6],
        ['- Địa chỉ: ấp (kp) '+o('diaDiem', '……………', {gt:g('diaDiem', V.ap)})+', xã (phường) '+o('diaDiem', '…………….', {gt:g('diaDiem', V.xa)})+', tỉnh Tây Ninh.', D7+W, 6, 6],
        ['<b>HAI BÊN NHẤT TRÍ THỎA THUẬN CÁC NỘI DUNG SAU:</b>', 'text-align:center;'+L19, 0, 0],
        ['<b>Điều 1. Bên A ủy nhiệm cho bên B thực hiện các công việc sau đây:</b>', D, 0, 0],
        ['1. Quản lý toàn bộ hoạt động của Tổ TK&amp;VV theo quy định tại quy chế Tổ chức và hoạt động của Tổ TK&amp;VV ban hành kèm theo Quyết định số 15/QĐ-HĐQT.', D, 6, 0]]
      .concat(cat('2. Nhận Giấy đề nghị vay vốn kiêm phương án sử dụng vốn vay (mẫu số 01/TD) của tổ viên. Tổ chức họp các tổ viên trong Tổ để thực hiện bình xét công khai, dân chủ. Lựa chọn tổ viên đủ điều kiện vay vốn. Lập Danh sách hộ gia đình đề nghị vay vốn NHCSXH (mẫu số 03/TD), Biên bản họp Tổ về việc bình',
          'xét cho vay. Sau đó tập hợp các loại giấy tờ trên thành hồ sơ đề nghị vay vốn và gửi Ban giảm nghèo cấp xã họp, trình UBND cấp xã xác nhận và gửi về NHCSXH làm cơ sở để cho vay. Thông báo kết quả phê duyệt cho vay, lịch giải ngân đến từng tổ viên. Chứng kiến việc giải ngân, thu nợ, thu lãi của bên A tại điểm giao dịch.', D))
      .concat([
        ['3. Bên A ủy nhiệm / không ủy nhiệm cho Bên B thu tiền lãi, thu tiền gửi của các tổ viên trong Tổ theo quy định nghiệp vụ của NHCSXH. Bên B phải nộp số tiền đã thu của các tổ viên trong tháng cho NHCSXH vào ngày giao dịch tại xã.', D, 6, 0],
        ['4. Trường hợp không được ủy nhiệm thu lãi, thu tiền gửi thì bên B có trách nhiệm đôn đốc tổ viên trực tiếp nộp lãi đầy đủ hàng tháng cho NHCSXH.', D, 6, 0],
        ['5. Bên B phải đôn đốc người vay sử dụng tiền vay đúng mục đích; trả nợ, trả lãi đầy đủ, đúng hạn cả gốc và lãi theo kế hoạch đã thỏa thuận. Tiếp nhận các thông tin từ tổ viên trong việc đề nghị trích tiền gửi để trả nợ, trả lãi cho NHCSXH cũng như các dịch vụ thanh toán khác theo quy định.', D, 6, 0],
        ['6. Tham gia, chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay và số dư tiền gửi của các tổ viên trong Tổ khi có sự kiểm tra, giám sát của các cơ quan, tổ chức có thẩm quyền đối với hoạt động của Tổ.', D, 6, 0],
        ['7. Phối hợp với cán bộ tổ chức Hội, đoàn thể, UBND cấp xã, Trưởng thôn xử lý các trường hợp nợ quá hạn, nợ bị rủi ro (nếu có), các trường hợp sử dụng vốn vay sai mục đích, trốn, chết, mất tích, rủi ro do nguyên nhân khách quan và thông báo kịp thời cho bên A.', D, 6, 0],
        ['8. Lưu giữ đầy đủ Bảng kê mẫu số 12/TD, hồ sơ của Tổ TK&amp;VV và các giấy tờ khác liên quan đến hoạt động vay vốn của NHCSXH.', D, 6, 0],
        ['<b>Điều 2. Trách nhiệm và quyền hạn của bên A</b>', D, 0, 0],
        ['1. Phối hợp với UBND và Hội, đoàn thể cấp xã để tổ chức tập huấn nghiệp vụ có liên quan đến hoạt động của Tổ và thủ tục, quy trình cho vay, thu nợ, thu lãi, thu tiền gửi,... cho bên B.', D, 6, 0],
        ['2. Thanh toán tiền hoa hồng đầy đủ cho bên B theo quy định hiện hành của NHCSXH, cụ thể:', D, 6, 0],
        ['- Đối với các chương trình được trả hoa hồng theo dư nợ có thu được lãi:', D, 6, 0],
        [bang([32.9, 8.1, 68.2, 8.1, 41.0], '<tr>'+td(P('Tiền hoa hồng', 'text-align:center;'+L19), '', ' rowspan="2"')+td(P('=', J+L19), '', ' rowspan="2"')+td(P('Tỷ lệ hoa hồng được hưởng ', 'text-align:center;margin-top:6pt;'+L19), 'border-bottom:.5pt solid #000')+
            td(P('x', 'text-align:center;'+L19), '', ' rowspan="2"')+td(P('Số tiền lãi thực thu', 'text-align:center;'+L19), '', ' rowspan="2"')+'</tr><tr>'+td(P('Lãi suất cho vay', 'text-align:center;margin-top:6pt;'+L19))+'</tr>'), null, 6, 0],
        ['Trong đó:', D, 6, 0],
        ['+ Tỷ lệ hoa hồng: theo quy định của NHCSXH từng thời kỳ. Hiện nay, tại địa bàn cấp xã thuộc vùng khó khăn (tỷ lệ hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu lãi là 0,085% và đối với Tổ TK&amp;VV không được ủy nhiệm thu lãi là 0,075%); tại địa bàn cấp xã không thuộc vùng khó khăn (tỷ lệ hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu lãi là 0,071% và đối với Tổ TK&amp;VV không được ủy nhiệm thu lãi là 0,062%).', D, 6, 0],
        ['+ Lãi suất cho vay là lãi suất trong hạn ghi trên Sổ vay vốn khi cho vay.', D, 6, 0],
        ['+ Số tiền lãi thực thu là số tiền lãi do tổ viên và Ban quản lý Tổ TK&amp;VV nộp vào NHCSXH.', D, 6, 0],
        ['- Đối với các chương trình được trả hoa hồng theo dư nợ bình quân:', J+F+'line-height:1.32;', 6, 0],
        [bang([32.8, 5.0, 70.0, 7.5, 35.0], '<tr>'+td(P('Tiền hoa hồng', 'text-align:center'))+td(P('=', 'text-align:center'))+td(P('Dư nợ trong hạn bình quân tháng'))+td(P('x', 'text-align:center'))+td(P('Tỷ lệ hoa hồng', 'text-align:center'))+'</tr>'), null, 0, 0],
        ['Trong đó:', D, 6, 0],
        [bang([42.5, 7.5, 57.5, 5.0, 50.0], '<tr>'+td(P('+ Dư nợ trong hạn bình quân tháng', 'text-align:center;margin-top:6pt;'+L19), '', ' rowspan="2"')+td(P('=<br>=', 'text-align:center;margin-top:6pt;'+L19), 'padding:0', ' rowspan="2"')+
            td(P('Dư nợ trong hạn đầu ngày 01 của tháng', 'text-align:center;margin-top:6pt;'+L19), 'border-bottom:.5pt solid #000')+td(P('+<br>+', 'text-align:center;margin-top:6pt;'+L19), 'padding:0;border-bottom:.5pt solid #000')+
            td(P('Dư nợ trong hạn ngày cuối cùng của tháng', 'text-align:center;margin-top:6pt;'+L19), 'border-bottom:.5pt solid #000')+'</tr><tr>'+td(P('2', 'text-align:center;margin-top:6pt;'+L19), '', ' colspan="3"')+'</tr>'), null, 0, 0],
        ['+ Tỷ lệ hoa hồng: Theo quy định của NHCSXH từng thời kỳ (Hiện nay, tỷ lệ hoa hồng trả theo dư nợ bình quân là 0,05%/tháng. Riêng chương trình cho vay nhà ở xã hội, hoa hồng cho Tổ TK&amp;VV là 0,005%/dư nợ trong hạn/tháng).', D, 6, 0],
        ['3. Theo dõi, giám sát, đôn đốc Ban quản lý Tổ trong việc thực hiện Hợp đồng ủy nhiệm. Thực hiện việc kiểm tra định kỳ hoặc đột xuất về các nội dung công việc mà bên B được ủy nhiệm. Trường hợp, phát hiện bên B vi phạm các điều khoản đã thỏa thuận thì bên A có quyền đơn phương chấm dứt Hợp đồng và đề nghị xử lý theo quy định của pháp luật.', D, 6, 0],
        ['<b>Điều 3. Nhiệm vụ, quyền hạn và quyền lợi của Bên B</b>', D, 0, 0], ['<b>1. Nhiệm vụ, quyền hạn</b>', D, 6, 0],
        ['a) Triển khai, thực hiện Quy ước hoạt động của Tổ; tuyên truyền, hướng dẫn, giải thích cho các tổ viên về: chủ trương, chính sách của Nhà nước về tín dụng đối với hộ nghèo, hộ cận nghèo và các đối tượng chính sách khác, thủ tục vay vốn NHCSXH; tuyên truyền, vận động tổ viên thực hành tiết kiệm, nâng cao ý thức trong việc vay vốn và trả nợ NHCSXH.', D, 6, 0]])
      .concat(cat('b) Tiếp nhận Giấy đề nghị vay vốn kiêm phương án sử dụng vốn vay (mẫu số 01/TD) của tổ viên. Tổ chức họp Tổ để bình xét cho vay công khai', 'dưới sự giám sát, chứng kiến của Trưởng thôn và người đại diện tổ chức chính trị- xã hội cấp xã nhận ủy thác. Nội dung bình xét cho vay công khai bao gồm:', D))
      .concat([
        ['- Tổ viên đủ điều kiện vay vốn theo quy định của Chính phủ và NHCSXH đối với từng chương trình xin vay.', D, 6, 0],
        ['- Đánh giá mức vốn xin vay, mức độ phù hợp của nhu cầu sử dụng vốn vay để thực hiện phương án sản xuất, kinh doanh của tổ viên theo từng chương trình xin vay và theo quy định của NHCSXH.', D, 6, 0],
        ['- Căn cứ vào những nội dung trên và chu kỳ sản xuất, kinh doanh, khả năng trả nợ của từng hộ để bình xét và đề nghị mức vốn vay cần thiết, thời hạn vay phù hợp.', D, 6, 0],
        ['- Sau khi Tổ thống nhất bình xét và biểu quyết công khai các hộ được vay vốn thì Tổ trưởng lập Danh sách hộ gia đình đề nghị vay vốn NHCSXH gửi Ban giảm nghèo để trình UBND cấp xã xác nhận, đề nghị NHCSXH cho vay.', D, 6, 0],
        ['c) Nhận kết quả phê duyệt cho vay của NHCSXH, thông báo cho tổ viên biết lịch giải ngân của NHCSXH, chứng kiến việc NHCSXH phát tiền vay trực tiếp đến người vay.', D, 6, 0],
        ['d) Lưu giữ đầy đủ hồ sơ, chứng từ liên quan đến hoạt động của Tổ. Tham gia đầy đủ các phiên giao dịch của NHCSXH, các buổi họp giao ban với NHCSXH, các lớp tập huấn nghiệp vụ, lĩnh hội và phổ biến đầy đủ các thông tin đến tổ viên.', D, 6, 0],
        ['đ) Đôn đốc các tổ viên tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, để nâng cao trình độ sản xuất kinh doanh, sử dụng vốn vay có hiệu quả.', D, 6, 0],
        ['e) Quán triệt, đôn đốc các tổ viên trong Tổ sử dụng vốn vay đúng mục đích; trả nợ trả lãi đúng hạn. Nếu tổ viên gặp khó khăn chưa trả được nợ thì có biện pháp giúp đỡ tổ viên trả nợ NHCSXH.', D, 6, 0],
        ['g) Trực tiếp giám sát việc sử dụng vốn vay, sản xuất kinh doanh, thu nhập và trả nợ NHCSXH của tổ viên. Thông báo kịp thời cho NHCSXH, chính quyền địa phương những trường hợp tổ viên sử dụng vốn vay sai mục đích, thay đổi chỗ ở ra ngoài địa bàn xã và các trường hợp khác ảnh hưởng đến hoạt động của Tổ và chất lượng tín dụng.', D, 6, 0]])
      .concat(cat('h) Ban quản lý Tổ phải chịu sự kiểm tra, giám sát của Trưởng thôn, tổ chức chính trị - xã hội nhận ủy thác, UBND cấp xã và NHCSXH. Phải tham gia', 'và chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay và số dư tiền gửi tại hộ của các tổ chức, cơ quan có trách nhiệm.', D))
      .concat([
        ['i) Chủ động đôn đốc, tham mưu và phối kết hợp với Trưởng thôn, tổ chức chính trị - xã hội, Ban giảm nghèo và UBND cấp xã xử lý các trường hợp nợ quá hạn, nợ bị chiếm dụng, đặc biệt có biện pháp thu hồi đối với trường hợp có điều kiện trả nợ đến hạn, quá hạn nhưng không trả nợ và tất cả các trường hợp chiếm dụng vốn gốc, lãi của tổ viên.', D, 6, 0],
        ['k) Phối kết hợp với Trưởng thôn, tổ chức chính trị - xã hội nhân ủy thác thực hiện kiểm tra, xác minh và có ý kiến về việc tổ viên đề nghị gia hạn nợ, xử lý nợ bị rủi ro, thu thập thông tin của tổ viên bỏ đi khỏi địa phương, đi làm ăn xa.', D, 6, 0],
        ['l) Đề xuất, kiến nghị và khiếu nại với chính quyền, NHCSXH và các cơ quan liên quan về việc thực hiện chủ trương, chính sách cho vay hộ nghèo, hộ cận nghèo và các đối tượng chính sách khác.', D, 6, 0],
        ['<b>2. Về quyền lợi</b>', D, 6, 0], ['a) Được NHCSXH đào tạo, tập huấn nghiệp vụ quản lý, điều hành hoạt động của Tổ.', D, 6, 0],
        ['b) Được NHCSXH chi trả hoa hồng cho các hoạt động nghiệp vụ về quản lý Tổ, quản lý nợ vay, thực hiện ủy nhiệm cho NHCSXH trên cơ sở quy định của NHCSXH và gắn với kết quả thực hiện công việc ủy nhiệm và chất lượng tín dụng của Tổ.', D, 6, 0],
        ['c) Được NHCSXH xem xét khen thưởng theo định kỳ hoặc đột xuất.', D, 6, 0], ['<b>Điều 4. Điều khoản thi hành</b>', D, 0, 0],
        ['1. Các bên có trách nhiệm chỉ đạo và thực hiện tốt các nội dung đã thỏa thuận trong Hợp đồng này.', D, 6, 0],
        ['2. Trường hợp thay đổi Tổ trưởng thì Tổ trưởng cũ có trách nhiệm bàn giao hồ sơ pháp lý của Tổ và việc quản lý, điều hành hoạt động của Tổ cho người kế nhiệm. Người kế nhiệm có trách nhiệm tiếp tục chỉ đạo thực hiện hoạt động của Tổ theo Quy chế về tổ chức và hoạt động của Tổ TK&amp;VV và các qui định hiện hàng của NHCSXH.', D, 6, 0],
        ['3. Hợp đồng này hết hiệu lực khi đại diện bên B không còn là Tổ trưởng Tổ TK&amp;VV hoặc khi có Hợp đồng khác thay thế.', D, 6, 0]])
      .concat(cat('4. Trong quá trình thực hiện, hai bên không được tự ý thay đổi nội dung thỏa thuận trong Hợp đồng. Nếu có vấn đề phát sinh cần bổ sung, sửa đổi thì các', 'bên phải kịp thời thông báo cho nhau biết để bàn bạc giải quyết. Nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không hòa giải được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện trước pháp luật.', D))
      .concat([
        ['Hợp đồng này có hiệu lực kể từ ngày ký, được lập thành 03 bản có giá trị như nhau, mỗi bên giữ 01 bản để tổ chức thực hiện và gửi Hội cấp xã trực tiếp quản lý 01 bản.', D, 6, 0],
        ['Hợp đồng này thay thế Hợp đồng ủy nhiệm đã ký kết giữa bên A và bên B ngày '+hc.join('/')+'. và các phụ lục kèm theo Hợp đồng (đối với trường hợp ký lại Hợp đồng).', D, 6, 18],
        [bang([60.5, 43.8, 59.5].map(function(x){ return x*160/163.8; }), '<tr>'+td(P('<b>Đại diện bên B</b>', 'text-align:center')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.tt), rong:55, canh:'c'})+'</b>', 'text-align:center'), 'vertical-align:top')+td('')+
          td(P('<b>Đại diện bên A</b>', 'text-align:center')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center')+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.daiDien), rong:55, canh:'c'})+'</b>', 'text-align:center'), 'vertical-align:top')+'</tr>'), null, 0, 0]]);
      var dau = '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:118.4mm"><col style="width:41.6mm"></colgroup><tr><td style="padding:0 1.9mm;vertical-align:top">'+
          P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center')+P('<b>Độc lập – Tự do – Hạnh phúc</b>', 'text-align:center;font-size:13pt')+'<p class="ke" data-ke="55" style="width:55mm;margin:0.3mm auto 0;height:0"></p>'+P('&nbsp;', 'text-align:center')+'</td>'+
          '<td style="padding:0 1.9mm;vertical-align:top">'+P('<i>Mẫu số: 11/TD</i>', 'text-align:right;font-size:12pt')+P('<i>Lập 03 liên: </i>', 'text-align:right;font-size:10pt')+P('<i>- 01 liên lưu NH</i>', 'text-align:right;font-size:10pt')+
          P('<i>- 01 liên lưu Tổ TK&amp;VV</i>', 'text-align:right;font-size:10pt')+P('<i>- 01 liên lưu Hội cấp xã</i>', 'text-align:right;font-size:10pt')+'</td></tr></table>';
      return {ma:'11/TD cũ', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+dau+dung(ds)+'</div>', cc:V.K.cc};
    }});
  hsoLap11Cu = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M){ M.mg = omMg([20, 20, 17, 30]); M.so = 'so'; }
})();
