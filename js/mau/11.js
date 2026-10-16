/* ===== 3.223 M6 — MẪU 11/TD MỚI (QĐ 70, từ 01/10/2026) Hợp đồng ủy nhiệm — trên nền ô, dựng theo file gốc tests/mau_goc/11_moi.docx =====
   Anh chốt 16/10: 11 cũ / 11 mới là 2 mẫu độc lập (mỗi mẫu 1 chip). Ngày mặc định chấm.
   Lề 20 / 20 / 20 / 30 mm · Times New Roman 14 · đoạn dòng cố định 16 pt, cách 6 pt, thụt 12,7 mm · công thức hoa hồng dạng bảng như gốc · 2 chú thích chân trang 2.
   Bỏ file này → app dùng lại hsoLap11 cũ. */
(function(){
  var MK = '11';
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
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.7mm;';
  var B = 'margin:0 0 6pt;line-height:16pt;', BT = 'margin:0 0 6pt;line-height:16pt;'   /* cách 6 pt dồn sau đoạn: đầu trang không thêm khoảng (như Word) */, B4 = 'margin:4pt 0;line-height:16pt;';
  function sup(x){ return '<span style="font-size:58%;vertical-align:33%;line-height:0">'+x+'</span>'; }
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+';margin-top:0;'); }
  function bang(w, noi, st){ return '<table class="khung0" style="'+(st||'')+'table-layout:fixed;width:'+w.reduce(function(a, b){ return a+b; }, 0).toFixed(1)+'mm"><colgroup>'+w.map(function(x){ return '<col style="width:'+x+'mm">'; }).join('')+'</colgroup>'+noi+'</table>'; }
  function o1(x, st){ return '<td style="padding:0 1.9mm;vertical-align:middle;'+(st||'')+'">'+x+'</td>'; }
  omDangKy({k:MK, ma:'11/TD', phan:['nhs', 'to', 'ky'], co:14,
    o:[{k:'bbTL', n:'Căn cứ biên bản thành lập Tổ: ngày … · UBND xã …', p:'to', l:'go', md:'cham', ngay:1},
      {k:'bbBQL', n:'Căn cứ biên bản thay đổi Ban quản lý: ngày … · UBND xã …', p:'to', l:'go', md:'cham', ngay:1},
      {k:'xa', n:'UBND xã … (chấp thuận)', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ngayHD', n:'Hôm nay, ngày … (ký hợp đồng)', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noiKy', n:'… tại … (nơi ký)', p:'to', l:'kb', md:'cham', cmau:'PGD NHCSXH'},
      {k:'ngan', n:'Bên A: Chi nhánh/PGD NHCSXH …', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD'},
      {k:'daiDien', n:'Bên A: Đại diện · chức vụ', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › đại diện'},
      {k:'diaChi', n:'Bên A: địa chỉ', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › địa chỉ'},
      {k:'dt', n:'Bên A: số điện thoại', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › điện thoại'},
      {k:'tt', n:'Bên B: Ban quản lý Tổ · đại diện (tổ trưởng)', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'hoi', n:'Bên B: thuộc Hội', p:'to', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'cccd', n:'Bên B: Số thẻ căn cước · ngày cấp · nơi cấp', p:'to', l:'tu', md:'tu', ng:'tổ trưởng — Mẫu 31'},
      {k:'diaDiem', n:'Bên B: địa chỉ thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'tkNH', n:'Điều 2.2c: mở tại NHCSXH … (tên PGD)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD'},
      {k:'stk', n:'Điều 2.2c: số tài khoản tổ trưởng', p:'to', l:'go', md:'cham'},
      {k:'ky', n:'Họ tên dưới chữ ký (Bên B, Bên A)', p:'ky', l:'tu', md:'tu', ng:'tổ trưởng / ⚙ đại diện PGD'}],
    V:function(t){
      var T = hsoTo(t), K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {}, dd = hsoPGD('daiDien');
      return {K:K, T:T, bbTL:HSO.o.bbTL, bbBQL:HSO.o.bbBQL, xa:T.xa, ngayHD:HSO.o.ngay, ngan:hsoPGD('ngan'), daiDien:dd, chucVu:dd ? hsoPGD('chucVu') : '', diaChi:hsoPGD('diaChi'), dt:hsoPGD('dt'),
        tt:T.tt, hoi:T.hoi, cccd:c.cccd, ncap:c.ncap, noiCap:c.noiCap, ap:T.ap, tinh:T.tinh, tkNH:hsoPGD('ngan'), stk:HSO.o.stk};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var ngd = function(k, iso, ds){ var x = hsoNg(iso), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:C(k) ? p[i] : '', canh:'c'}); }); };
      var tl = ngd('bbTL', V.bbTL, ['...', '...', '.....']), bq = ngd('bbBQL', V.bbBQL, ['...', '....', '.....']), hn = ngd('ngayHD', V.ngayHD, ['….', '……', '…….']), nc = ngd('cccd', V.ncap, ['….', '…', '…']);
      var d1 = [
        ['1. Quản lý toàn bộ hoạt động của Tổ TK&amp;VV (sau đây viết tắt là Tổ) theo Quy chế hoạt động của Tổ được Hội đồng quản trị NHCSXH ban hành và triển khai thực hiện Quy ước hoạt động của Tổ.'],
        ['2. Thực hiện tiếp nhận đề nghị vay vốn của tổ viên, tổ chức họp Tổ để bình xét cho vay, hoàn thiện và chuyển hồ sơ đề nghị vay vốn cho Bên A; phối hợp với Bên A thông báo kết quả phê duyệt cho vay và phối hợp giải ngân cho vay đến tổ viên vay vốn. '],
        ['3. Giám sát, đôn đốc tổ viên sử dụng vốn vay đúng mục đích; trả nợ đầy đủ, đúng hạn theo thoả thuận; tham gia, chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay đến các tổ viên của cơ quan, tổ chức có thẩm quyền khi được yêu cầu.', 'letter-spacing:-0.15pt'],
        ['4. Bên A uỷ nhiệm cho Bên B thu tiền lãi, tiền gửi của các tổ viên trong Tổ theo quy định của NHCSXH. Bên B phải nộp số tiền đã thu của các tổ viên trong tháng cho NHCSXH vào ngày giao dịch tại xã. '+sup('1')],
        ['<i>(Bên A không uỷ nhiệm cho Bên B thu tiền lãi, tiền gửi của tổ viên trong Tổ. Bên B có trách nhiệm đôn đốc các tổ viên trả nợ gốc, nợ lãi đầy đủ, đúng hạn cho NHCSXH theo thỏa thuận.</i>'+sup('2')+'<i>)</i>', 'letter-spacing:-0.1pt'],
        ['5. Phối hợp quản lý và xử lý các vấn đề phát sinh trong hoạt động của Tổ, bao gồm: đôn đốc, xử lý các trường hợp gia hạn nợ, điều chỉnh kỳ hạn trả nợ, nợ quá hạn, nợ bị rủi ro; người vay sử dụng vốn vay sai mục đích, chết, mất tích, đi khỏi nơi cư trú và các trường hợp khác ảnh hưởng đến hoạt động của Tổ.', 'letter-spacing:-0.1pt'],
        ['6. Quản lý, cung cấp, lưu trữ hồ sơ liên quan đến hoạt động của Tổ theo quy định của NHCSXH; lưu giữ, bảo mật thông tin, dữ liệu của tổ viên theo quy định của pháp luật về bảo vệ dữ liệu cá nhân. '],
        ['7. Phối hợp với Bên A thực hiện các công việc khác liên quan đến hoạt động tín dụng chính sách xã hội theo nội dung được hai bên thống nhất. ']];
      var chan = '<div class="kt-giu" style="height:15mm"><div style="position:absolute;left:1.5px;right:1.5px;bottom:0;font-size:10pt;line-height:1.15;text-align:justify">'+
        '<p style="margin:0 0 1mm;width:50mm;height:0;border-top:.5pt solid #000"></p>'+P(sup('1')+' Áp dụng cho Ban quản lý Tổ được uỷ nhiệm thu tiền. ', 'text-indent:12.5mm')+
        P(sup('2')+' Áp dụng cho Ban quản lý Tổ không được uỷ nhiệm thu tiền', 'text-indent:12.5mm')+P('(NHCSXH nơi cho vay lựa chọn giữ lại một nội dung khi ký HĐUN với tổ trưởng căn cứ theo thoả thuận).', 'text-indent:12.5mm')+'</div></div>';
      var h = P('&nbsp;', 'line-height:15.5pt')+P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13.5pt')+P('<b>Độc lập</b> - <b>Tự do</b> - <b>Hạnh phúc</b>', 'text-align:center;font-size:13.5pt')+
        '<p class="ke" data-ke="62" style="width:62mm;margin:0.3mm auto -0.3mm;height:0"></p>'+
        '<div style="position:relative;height:0"><div style="position:absolute;right:0;top:-31pt;line-height:1.15">'+P('<b><i>Mẫu số: 11/TD</i></b>', 'text-align:right;font-size:11pt')+P('<i>Lập 02 liên: </i>', 'text-align:right;font-size:11pt')+
          P('<i>- 01 liên lưu NH;</i>', 'text-align:right;font-size:11pt')+P('<i>- 01 liên lưu Tổ TK&amp;VV.</i>', 'text-align:right;font-size:11pt')+'</div></div>'+   /* gốc: hộp chữ nằm trên lề trên */
        P('&nbsp;')+P('<b>HỢP ĐỒNG UỶ NHIỆM </b>', 'text-align:center;line-height:17pt')+P('<b>Về việc thực hiện một số nội dung công việc </b>', 'text-align:center')+P('<b>trong quy trình cho vay của Ngân hàng Chính sách xã hội</b>', 'text-align:center')+P('&nbsp;', 'margin-bottom:6pt')+
        P('Căn cứ Nghị định số 06/2026/NĐ-CP ngày 10/01/2026 của Chính phủ quy định về tổ chức và hoạt động của Ngân hàng Chính sách xã hội (NHCSXH);', J+F+B)+
        P('Căn cứ Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về quy chế hoạt động của Tổ Tiết kiệm và vay vốn (TK&amp;VV);', J+F+BT)+
        P('Căn cứ Biên bản họp Tổ TK&amp;VV ngày '+tl.join('/')+' về việc thành lập Tổ TK&amp;VV đã được UBND xã'+o('xa', '.......................................')+' chấp thuận cho phép hoạt động;', J+F+BT+'letter-spacing:-0.2pt')+
        P('Căn cứ Biên bản họp Tổ TK&amp;VV ngày '+bq.join('/')+' về việc thay đổi Ban quản lý Tổ TK&amp;VV đã được UBND xã '+o('xa', '..................................')+'chấp thuận (nếu có).', J+F+BT)+
        P('Hôm nay, ngày'+hn.join('/')+', tại'+o('noiKy', '…………………………………….....'), J+F+BT+W)+
        P('Chúng tôi gồm có:', J+F+B)+P('<b><span style="font-size:13pt">I. BÊN ỦY NHIỆM (</span>Bên A<span style="font-size:13pt">)</span></b>', J+F+B)+
        P('- Chi nhánh/Phòng giao dịch Ngân hàng Chính sách xã hội'+o('ngan', '……….….…...'), J+F+B+W)+
        P('- Đại diện Ông (Bà):'+o('daiDien', '……………………….')+'Chức vụ:'+o('daiDien', '……..…….…………', {gt:g('daiDien', V.chucVu)}), J+F+B+W)+
        P('- Địa chỉ:'+o('diaChi', '…………………………………………….………...……………'), J+F+B+W)+
        P('- Số điện thoại:'+o('dt', '………………………….......................................................'), J+F+B+W)+
        P('<b><span style="font-size:13pt">II. BÊN NHẬN ỦY NHIỆM (</span>Bên B<span style="font-size:13pt">)</span></b>', J+F+B)+
        P('- Ban quản lý Tổ TK&amp;VV: '+o('tt', '........................................')+'thuộc Hội:'+o('hoi', '…..............', {gt:g('hoi', /^Hội\s/i.test(V.hoi||'') ? hsoBoHoi(V.hoi) : V.hoi)}), J+F+B+W)+
        P('- Đại diện Ông (Bà): '+o('tt', '………………………………….')+'Chức vụ: Tổ trưởng', J+F+B+W)+
        P('- Số Thẻ căn cước:'+o('cccd', '…………..............')+'; Ngày cấp'+nc.join('/')+'; Nơi cấp:'+o('cccd', '…...…', {gt:g('cccd', V.noiCap)}), J+F+B+W)+
        P('- Địa chỉ: Thôn '+o('diaDiem', '………………', {gt:g('diaDiem', V.ap)})+', xã'+o('diaDiem', '………………', {gt:g('diaDiem', V.xa)})+', tỉnh '+o('diaDiem', '………….……….', {gt:g('diaDiem', V.tinh)}), J+F+B+W)+
        P('Hai bên nhất trí thỏa thuận các nội dung sau: ', J+F+B)+
        P('<b>Điều 1. Bên A ủy nhiệm cho Bên B thực hiện các công việc sau</b>', J+F+B)+d1.map(function(x){ return P(x[0], J+F+B+(x[1]||'')); }).join('')+
        P('<b>Điều 2. Trách nhiệm và quyền hạn của Bên A</b>', J+F+B)+
        P('1. Phối hợp với UBND và tổ chức chính trị - xã hội nhận ủy thác cấp xã để tổ chức tập huấn nghiệp vụ có liên quan đến hoạt động của Tổ, thủ tục, quy trình cho vay cho Bên B. ', J+F+B)+
        P('2. Thanh toán tiền hoa hồng đầy đủ cho Bên B theo quy định của NHCSXH, cụ thể:', J+F+B)+
        P('a) Chi trả hoa hồng theo dư nợ có thu được lãi khi phát sinh lãi thực thu của các tổ viên thuộc Tổ.', J+F+B)+
        bang([42.4, 7.5, 65.1, 8.0, 29.5], '<tr>'+o1(P('Tiền hoa hồng', 'text-align:center;'+B4))+o1(P('<b>=</b>', 'text-align:center;'+B4))+o1(P('Mức hoa hồng được hưởng', 'text-align:center;'+B4))+o1(P('x', B4))+o1(P('Dư nợ có thu được lãi', 'text-align:center;'+B4))+'</tr>', 'margin-bottom:4pt;')+
        P('Trong đó:', J+'text-indent:12.5mm;'+B4)+P('- Mức hoa hồng theo thông báo của NHCSXH từng thời kỳ', J+F+B4)+
        P('(Hiện nay, tại địa bàn cấp xã thuộc vùng có điều kiện khó khăn mức hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu tiền là 0,085%, đối với Tổ TK&amp;VV không được ủy nhiệm thu tiền là 0,075%; tại địa bàn cấp xã không thuộc vùng có điều kiện khó khăn mức hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu tiền là 0,071%, đối với Tổ TK&amp;VV không được ủy nhiệm thu tiền là 0,062%). ', J+F+B4+'letter-spacing:-0.1pt')+
        P('- Dư nợ có thu được lãi xác định bằng công thức:', J+F+B4)+chan+
        bang([34.5, 14.8, 56.8], '<tr>'+o1(P('Dư nợ có thu được lãi', 'text-align:center;margin:4pt 0;line-height:18pt'), '" rowspan="2')+o1(P('=', 'text-align:center;margin:4pt 0;line-height:18pt'), '" rowspan="2')+
          o1(P('Số tiền lãi thực thu', 'text-align:center;margin:4pt 0;line-height:18pt'), 'border-bottom:.5pt solid #000')+'</tr><tr>'+o1(P('Lãi suất cho vay', 'text-align:center;margin:4pt 0;line-height:18pt'), 'padding-top:2mm')+'</tr>', 'margin-left:28.8mm;margin-top:1.8mm;margin-bottom:8pt;')+
        P('+ Số tiền lãi thực thu là số tiền lãi NHCSXH nhận được trong tháng của các tổ viên thuộc Tổ TK&amp;VV.', J+F+B)+
        P('+ Lãi suất cho vay là lãi suất theo thông báo của NHCSXH trong từng thời kỳ và theo từng chương trình tín dụng.', J+F+B)+
        P('b) Chi trả hoa hồng theo dư nợ bình quân vào ngày cuối cùng của tháng.', J+F+B4)+
        bang([38.2, 9.1, 52.7, 7.5, 7.5, 39.9], '<tr>'+o1(P('Tiền hoa hồng', 'margin:4pt 0;line-height:17pt'))+o1(P('=', 'text-align:center;margin:4pt 0;line-height:17pt'))+o1(P('Dư nợ trong hạn', 'text-align:center;margin:4pt 0 0;line-height:17pt')+P('bình quân tháng', 'text-align:center;margin:4pt 0;line-height:17pt'))+
          o1('')+o1(P('x', 'margin:4pt 0;line-height:17pt'))+o1(P('Mức hoa hồng', 'text-align:center;margin:4pt 0;line-height:17pt'))+'</tr>', 'margin-left:12.7mm;margin-top:2mm;margin-bottom:6pt;')+
        P('Trong đó: ', J+'text-indent:12.5mm;margin:4pt 0;line-height:17pt')+
        bang([44.2, 9.0, 46.5, 9.5, 55.0], '<tr>'+o1(P('- Dư nợ trong hạn', 'text-align:center;margin:4pt 0 0;line-height:17pt')+P('bình quân tháng =', 'text-align:center;margin:4pt 0;line-height:17pt'), '" rowspan="2')+o1('', '" rowspan="2')+
          o1(P('Dư nợ trong hạn đầu ngày 01 của tháng', 'text-align:center;margin:4pt 0;line-height:17pt'), 'border-bottom:.5pt solid #000')+o1(P('+', 'text-align:center;margin:4pt 0;line-height:17pt'), 'border-bottom:.5pt solid #000')+
          o1(P('Dư nợ trong hạn cuối ngày cuối cùng của tháng', 'text-align:center;margin:4pt 0;line-height:17pt'), 'border-bottom:.5pt solid #000')+'</tr><tr><td colspan="3" style="padding:2.2mm 0 0">'+P('2', 'text-align:center;margin:4pt 0;line-height:17pt')+'</td></tr>', 'margin-left:6.5mm;margin-top:2.4mm;margin-bottom:6pt;')+
        P('- Mức hoa hồng: Theo thông báo của NHCSXH theo từng thời kỳ. ', J+F+BT)+
        P('(Hiện nay, mức hoa hồng trả theo dư nợ trong hạn bình quân là 0,05%/tháng/dư nợ trong hạn bình quân tháng. Riêng chương trình cho vay nhà ở xã hội, mức hoa hồng chi trả cho Ban quản lý Tổ là 0,005%/tháng/dư nợ trong hạn bình quân tháng).', J+F+BT)+
        P('c) Chi trả tiền hoa hồng vào tài khoản thanh toán của Tổ trưởng Tổ TK&amp;VV mở tại NHCSXH '+o('tkNH', '..........................................')+', số tài khoản: '+o('stk', '....................................')+' ', J+F+B)+
        P('3. Theo dõi, giám sát, đôn đốc Bên B trong việc thực hiện Hợp đồng ủy nhiệm. Thực hiện kiểm tra định kỳ hoặc đột xuất về các nội dung công việc mà Bên B được ủy nhiệm. Trường hợp, phát hiện Bên B vi phạm các điều khoản đã thỏa thuận thì Bên A có quyền đơn phương chấm dứt Hợp đồng và đề nghị xử lý theo quy định của pháp luật.', J+F+B)+
        P('<b>Điều 3. Nhiệm vụ, quyền hạn và quyền lợi của Bên B</b>', J+F+B)+P('1. Nhiệm vụ, quyền hạn ', J+F+B)+
        P('a) Triển khai thực hiện Quy ước hoạt động của Tổ; tuyên truyền, hướng dẫn tổ viên về chủ trương, chính sách của Đảng, Nhà nước về tín dụng chính sách xã hội, các chương trình tín dụng và thủ tục vay vốn tại NHCSXH. Tuyên truyền, vận động tổ viên thực hành tiết kiệm, nâng cao ý thức trong việc vay vốn và trả nợ ngân hàng.', J+F+B)+
        P('b) Tiếp nhận đề nghị vay vốn của tổ viên và tổ chức họp Tổ để bình xét cho', J+F+'margin-top:6pt;line-height:16pt;'+W+TL)+P('vay bảo đảm công khai, minh bạch, dân chủ với sự giám sát, chứng kiến của', J+'line-height:16pt;'+W+TL)+
        P('Trưởng thôn, Tổ trưởng tổ dân phố và đại diện tổ chức chính trị - xã hội nhận ủy', J+'line-height:16pt;'+W+TL)+P('thác cấp xã; đồng thời, quán triệt cho tổ viên về ý thức vay vốn, sử dụng vốn vay đúng mục đích, trả nợ gốc, lãi đầy đủ, đúng hạn.', J+'margin-bottom:6pt;line-height:16pt')+   /* gốc ngắt trang giữa đoạn b) → tách đúng dòng gốc */
        [['Nội dung bình xét cho vay công khai bao gồm: (i) Tổ viên thuộc đối tượng, đáp ứng điều kiện vay vốn theo quy định của cấp có thẩm quyền; (ii) Thảo luận, thống nhất đề nghị mức vay phù hợp với nhu cầu sử dụng vốn để thực hiện phương án vay vốn của tổ viên và không vượt quá mức cho vay tối đa; (iii) Thảo luận, thống nhất đề nghị thời hạn vay phù hợp với khả năng trả nợ của tổ viên và không vượt quá thời hạn cho vay tối đa theo quy định của từng chương trình tín dụng.', B+'letter-spacing:-0.15pt'],
          ['Sau khi Tổ họp thống nhất và biểu quyết thông qua danh sách Tổ viên đề nghị vay vốn với mức vay, thời hạn vay cụ thể, hướng dẫn tổ viên hoàn thiện hồ sơ vay vốn theo quy định của từng chương trình tín dụng gửi Bên A xem xét, quyết định mức cho vay, thời hạn cho vay.', B],
          ['c) Nhận kết quả phê duyệt cho vay của Bên A, thông báo cho tổ viên biết lịch giải ngân và chứng kiến việc Bên A giải ngân trực tiếp đến người vay.', B],
          ['d) Đôn đốc, giám sát tổ viên trong Tổ thực hiện Quy ước hoạt động của Tổ; sử dụng vốn vay đúng mục đích; trả nợ gốc, lãi đầy đủ, đúng hạn. Tham gia và chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay của tổ viên của các tổ chức, cơ quan có thẩm quyền khi được yêu cầu.', B],
          ['đ) Trường hợp được ủy nhiệm thu tiền, hằng tháng, Bên B thực hiện thu tiền lãi, tiền gửi của tổ viên và nộp đầy đủ cho NHCSXH theo quy định.', BT],
          ['e) Hướng dẫn tổ viên đối chiếu kết quả giao dịch, nợ đến hạn kỳ tiếp theo với thông báo do NHCSXH gửi đến thông qua Ban quản lý Tổ hoặc thông qua ứng dụng do NHCSXH cung cấp.', BT],
          ['g) Không được thu phí, thu nợ gốc của tổ viên.', BT],
          ['h) Thông báo kịp thời và phối hợp với tổ chức chính trị - xã hội nhận ủy thác, chính quyền địa phương, NHCSXH để xử lý nợ đối với các trường hợp sử dụng vốn vay sai mục đích, nợ bị rủi ro và các trường hợp khác ảnh hưởng đến hoạt động của Tổ và chất lượng tín dụng. Phối hợp với Trưởng thôn, Tổ trưởng tổ dân phố, tổ chức CT-XH nhận ủy thác thực hiện kiểm tra, xác minh và có ý kiến về việc tổ viên đề nghị gia hạn nợ, điều chỉnh kỳ hạn nợ, xử lý nợ bị rủi ro gửi cấp có thẩm quyền xem xét, quyết định; thu thập thông tin của tổ viên đi khỏi nơi cư trú.', B+'word-spacing:0'],
          ['i) Chịu sự kiểm tra, giám sát của Trưởng thôn, Tổ trưởng tổ dân phố, tổ chức chính trị - xã hội nhận uỷ thác, UBND cấp xã và Bên A.', B],
          ['k) Lưu giữ đầy đủ hồ sơ của Tổ và các giấy tờ khác liên quan đến hoạt động của Tổ do Bên A quy định. Tham gia đầy đủ các phiên giao dịch, các buổi họp giao ban với Bên A, các lớp tập huấn nghiệp vụ, lĩnh hội và phổ biến đầy đủ các thông tin đến tổ viên. Sử dụng các ứng dụng của NHCSXH để nâng cao hiệu quả thực hiện các nội dung công việc được ủy nhiệm.', B],
          ['l) Vận động tổ viên tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm… để nâng cao trình độ sản xuất, kinh doanh, sử dụng vốn vay đúng mục đích, có hiệu quả.', B],
          ['m) Đề xuất, kiến nghị và khiếu nại với chính quyền địa phương, NHCSXH và các cơ quan liên quan về việc triển khai thực hiện tín dụng chính sách xã hội trên địa bàn.', B],
          ['n) Tổ trưởng Tổ TK&amp;VV có trách nhiệm thanh toán số tiền hoa hồng được Bên A chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.', B+'letter-spacing:-0.1pt'],
          ['o) Sử dụng đúng mục đích, bảo mật thông tin, dữ liệu do Bên A cung cấp hoặc do Ban quản lý Tổ thu thập, tiếp nhận, lưu giữ trong quá trình hoạt động; không cung cấp cho bên thứ ba trái quy định và thực hiện bàn giao đầy đủ khi chấm dứt hoặc thay thế Hợp đồng.', B],
          ['2. Quyền lợi', B], ['a) Được NHCSXH đào tạo, tập huấn nghiệp vụ quản lý, điều hành hoạt động của Tổ.', B],
          ['b) Được Bên A chi trả hoa hồng cho việc thực hiện các công việc được ủy nhiệm trên cơ sở quy định của cấp có thẩm quyền từng thời kỳ.', B], ['c) Được NHCSXH xem xét khen thưởng theo định kỳ hoặc đột xuất.', B],
          ['<b>Điều 4. Điều khoản thi hành </b>', B],
          ['1. Các bên có trách nhiệm thực hiện đúng nội dung đã thỏa thuận trong Hợp đồng này. Mọi sửa đổi, bổ sung nội dung của Hợp đồng phải được sự thỏa thuận của hai bên bằng văn bản.', B],
          ['2. Khi thay đổi Tổ trưởng, Tổ trưởng cũ có trách nhiệm bàn giao hồ sơ của Tổ và việc quản lý điều hành hoạt động của Tổ cho Tổ trưởng mới. Tổ trưởng mới có trách nhiệm tiếp tục chỉ đạo thực hiện hoạt động của Tổ theo Quy chế hoạt động của Tổ và các quy định hiện hành của NHCSXH.', B+'letter-spacing:-0.1pt'],
          ['3. Trong quá trình thực hiện, nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không hoà giải được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện ra tòa án.', B],
          ['4. Hợp đồng này hết hiệu lực kể từ ngày Bên A ký Hợp đồng uỷ nhiệm với đại diện Ban quản lý Tổ là Tổ trưởng mới được Tổ bầu ra.', BT],
          ['Hợp đồng này có hiệu lực kể từ ngày ký, thay thế các Hợp đồng, Phụ lục Hợp đồng đã ký trước đây (nếu có); được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản để tổ chức thực hiện./.', BT]
        ].map(function(x){ return P(x[0], J+F+x[1]); }).join('')+
        '<table class="khung0" style="width:156.4mm;table-layout:fixed;margin-top:2mm"><colgroup><col style="width:50%"><col style="width:50%"></colgroup><tr><td style="padding:0 1.9mm;vertical-align:top">'+P('<b>ĐẠI DIỆN BÊN B</b>', 'text-align:center;font-size:13pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center;font-size:12pt')+
          P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.tt), rong:70, canh:'c'})+'</b>', 'text-align:center')+'</td>'+
          '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>ĐẠI DIỆN BÊN A</b>', 'text-align:center;font-size:13pt')+P('<i>(Ký tên, đóng dấu )</i>', 'text-align:center;font-size:12pt')+
          P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.daiDien), rong:70, canh:'c'})+'</b>', 'text-align:center')+'</td></tr></table>';
      return {ma:'11/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>', cc:V.K.cc};
    }});
  hsoLap11 = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M){ M.mg = omMg([20, 20, 20, 30]); M.so = 'so'; }   /* số trang từ trang 2 (gốc: đầu trang giữa) */
})();
