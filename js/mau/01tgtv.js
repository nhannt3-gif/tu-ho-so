/* ===== 3.223 M5 — MẪU 01/TGTV Giấy đăng ký mở tài khoản tổ viên trên nền ô =====
   BỐ CỤC GIỮ NGUYÊN 3.218–3.219 (anh đã duyệt: đo theo file Word — 3 trang nội dung + trang trắng in 2 mặt; LibreOffice dàn file gốc này thành 4 trang nên KHÔNG so vị trí dòng với bản LibreOffice).
   Mọi chỗ chấm / ô ☐ thành ô tùy biến: số liệu người mở TK lấy sổ hộ vay (3.223 M2: giới tính, dân tộc, nghề nghiệp, chức vụ, thu nhập, nguồn thu, hôn nhân, MST, email, nơi làm việc…) / Mẫu 31.
   Ô cũ (3.219: CIF, quốc tịch, dân tộc, cư trú, hạn CCCD, thường trú, điện thoại, ngày ký) giữ khóa + mặc định chấm. Bỏ file này → app dùng lại hsoLap01tgtv cũ. */
(function(){
  var MK = '01tgtv';
  omDangKy({k:MK, ma:'01/TGTV', phan:['nhs', 'kh', 'nh'], co:12, giuCo:1,   /* 3.319: không thu nhỏ chữ (QUY_CHUAN 9.7) */
    o:[{k:'ngan', n:'"chi nhánh/PGD …" (tên đơn vị)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD (điền sau chữ NHCSXH)'},
      {k:'cif', n:'Ô đầu trang + phần D: Số CIF (mã KH Mẫu 31)', p:'nh', l:'tu', md:'cham', ng:'mã KH — M31', nhanh:1},
      {k:'ten', n:'Họ, chữ đệm, tên khai sinh', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'ns', n:'Ngày, tháng, năm sinh', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'gt', n:'Giới tính ☒', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / suy theo CCCD'},
      {k:'quocTich', n:'Quốc tịch ☒ Việt Nam', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (trống = Việt Nam)', nhanh:1},
      {k:'danToc', n:'Dân tộc', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31', nhanh:1},
      {k:'cuTru', n:'Tình trạng cư trú ☒ Có cư trú', p:'kh', l:'tu', md:'tu', ng:'ghi sẵn theo mẫu', nhanh:1},
      {k:'cccd', n:'Số CCCD (12 ô) + ☒ Thẻ CC công dân', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'ncap', n:'Ngày cấp', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'hanCCCD', n:'Ngày hết hạn CCCD', p:'kh', l:'tu', md:'tu', ng:'tính từ ngày sinh + ngày cấp', nhanh:1},
      {k:'noiCap', n:'Nơi cấp', p:'kh', l:'tu', md:'tu', ng:'tự tính theo ngày cấp'},
      {k:'mst', n:'Mã số thuế cá nhân', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'ngheNghiep', n:'Nghề nghiệp hiện tại ☒ (+ ghi rõ khi Khác)', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'chucVu', n:'Chức vụ', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'thuongTru', n:'Nơi thường trú: Tổ dân phố/Thôn · Phường/Xã · Tỉnh', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay (tổ / ấp, xã) + ⚙ PGD › Tỉnh', nhanh:1},
      {k:'soNha', n:'Nơi thường trú: Số nhà, Đường', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'noiO', n:'Nơi ở hiện tại khác', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'noiLam', n:'Nơi làm việc · điện thoại · địa chỉ nơi làm việc', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'sdt', n:'Điện thoại liên hệ', p:'kh', l:'tu', md:'cham', ng:'M31 / sổ hộ vay', nhanh:1},
      {k:'email', n:'Thư điện tử (Email)', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'thuNhap', n:'Thu nhập bình quân ☒ (+ ghi rõ khi Khác)', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'nguonThu', n:'Nguồn gốc thu nhập ☒ (+ ghi rõ khi Khác)', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'honNhan', n:'Tình trạng hôn nhân ☒ (+ ghi rõ khi Khác)', p:'kh', l:'tu', md:'cham', ng:'sổ hộ vay'},
      {k:'dvDeNghi', n:'B: ☒ Tôi đề nghị cung cấp dịch vụ tài khoản Tổ viên', p:'kh', l:'tu', md:'cham', ng:'đánh dấu sẵn'},
      {k:'sms', n:'B: Đăng ký SMS chủ động ☒ Có / Không', p:'kh', l:'kb', md:'cham', cmau:'Không'},
      {k:'dongY', n:'C: ☒ Đồng ý 2 điều khoản, điều kiện chung', p:'kh', l:'tu', md:'cham', ng:'đánh dấu sẵn'},
      {k:'diaDanh', n:'C: địa danh "…, ngày" (khách hàng ký)', p:'kh', l:'tu', md:'cham', ng:'xã của người mở TK'},
      {k:'ngayKy', n:'C: ngày tháng (khách hàng ký)', p:'kh', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'tiepNhan', n:'D: Tiếp nhận ngày', p:'nh', l:'go', md:'cham', ngay:1},
      {k:'nhNgay', n:'D: "…, ngày … tháng … năm …" (Giám đốc ký)', p:'nh', l:'go', md:'cham', ngay:1},
      {k:'soTK', n:'D: Số Tài khoản Tổ viên', p:'nh', l:'go', md:'cham'},
      {k:'hieuLuc', n:'D: Hiệu lực từ ngày', p:'nh', l:'go', md:'cham', ngay:1}],
    V:function(t, P){
      P = Object.assign({}, P || {});
      if(P.kh && typeof hmDs==='function'){ var o = hmDs().find(function(x){ return x.kh===P.kh; }); if(o){ var n = o.tv[o.dung||0] || {}; (typeof HM_THEM_KHOA!=='undefined' ? HM_THEM_KHOA : []).forEach(function(k){ if(P[k]==null && n[k]!=null) P[k] = n[k]; }); } }   /* tổ viên in hàng loạt: lấy thêm trường đã khai ở sổ hộ vay */
      var han = P.cccd ? toCCCDHan(P.cccd, P.ns, P.ncap) : null, V = HSO.vay, ten = !!P.ten;
      return {P:P, ngan:hsoPGD('ngan'), cif:P.kh || '', ten:P.ten ? String(P.ten).toUpperCase() : '', ns:P.ns, gt:/^nam$/i.test(P.gt) ? 'Nam' : /^nữ$/i.test(P.gt) ? 'Nữ' : (typeof hmGT==='function' ? hmGT({cccd:P.cccd}) : ''),   /* Mẫu 31 ghi giới tính dạng mã (01…) chưa rõ quy ước → suy theo số CCCD */
        quocTich:ten ? (P.quocTich || 'Việt Nam') : '', danToc:ten ? (P.danToc || 'Kinh') : '', cuTru:ten ? 'x' : '',
        cccd:String(P.cccd||'').replace(/\D/g, ''), ncap:P.ncap, hanCCCD:han && han.den ? han.den : '', noiCap:P.noiCap, mst:P.mst, ngheNghiep:P.ngheNghiep, chucVu:P.chucVu,
        thuongTru:ten ? 'x' : '', ap:P.ap, xa:P.tenXa ? hsoXaTen(P.tenXa) : '', tinh:hsoPGD('tinh'), soNha:P.soNha, duong:P.duong, noiO:P.noiO, noiLam:P.noiLam, dtNoiLam:P.dtNoiLam, dcNoiLam:P.dcNoiLam,
        sdt:P.sdt, email:P.email, thuNhap:P.thuNhap, nguonThu:P.nguonThu || [], honNhan:P.honNhan, dvDeNghi:ten ? 'x' : '', dongY:ten ? 'x' : '', diaDanh:P.tenXa ? hsoXaTen(P.tenXa) : '',
        ngayKy:V.ngayKy, tiepNhan:V.tiepNhan, nhNgay:V.nhNgay, soTK:V.soTK, hieuLuc:V.hieuLuc};
    },
    lap:function(t, P){
      var V = this.V(t, P), G = omG(MK, V, 12), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, D = function(n){ return hsoCham(n); };
      var ck = function(k, on){ return '<span class="om om-'+(C(k) ? (OM_KIEU==='mau' ? 'mau' : omCachLuu(MK, k)) : 'cham')+'" data-o="'+k+'">'+(C(k) && on ? '☒' : '☐')+'</span>'; };   /* ô đánh dấu */
      var so = C('cccd') ? V.cccd : '', ngay = function(k, a, b, c){ var g = hsoNg(G.gt(k)); if(g) return a ? G.o(k, D(a)+' /'+D(b)+'/'+D(c), {gt:g.d+'/'+g.m+'/'+g.y}) : G.o(k, '', {gt:g.d+'/'+g.m+'/'+g.y, lien:1});   /* 3.318 (anh) — QUY_CHUAN 9.6: ngày gõ liền dd/mm/yyyy; còn nhãn in sẵn phía sau cùng dòng (a, b, c = chấm gốc) → giữ đúng bề rộng chấm cho nhãn sau đứng yên như form; cuối dòng → liền */
        var x = G.ngay(k, [D(a), D(b), D(c)]); return x[0]+' /'+x[1]+'/'+x[2]; };
      var oSo = '<table class="luoi" data-w="'+Array(13).join('1,').slice(0, -1)+'" style="width:96mm"><tr>'+Array.apply(null, Array(12)).map(function(_, i){ return '<td class="c">'+o('cccd', '&nbsp;', {gt:so[i]||'', canh:'c', rong:6})+'</td>'; }).join('')+'</tr></table>';
      var dong = function(h){ return '<p class="tr2">'+h+'</p>'; }, NN = V.ngheNghiep, nn = function(x){ return ck('ngheNghiep', NN===x)+' '+x; };
      var tn = function(x){ return ck('thuNhap', V.thuNhap===x)+' '+x; }, ng = function(x){ return ck('nguonThu', V.nguonThu.indexOf(x)>=0)+' '+x; }, hn = function(x){ return ck('honNhan', V.honNhan===x)+' '+x; };
      var tt = C('thuongTru'), sms = G.gt('sms');
      var A = '<p class="i">Quý khách điền đầy đủ nội dung tại các trường thông tin có dấu (*)</p>'+
        hsoBang('khung0', [29, 71], '<tr><td><p class="b">Họ, chữ đệm, tên khai sinh*:</p></td><td><table class="luoi" data-w="1"><tr><td style="padding:0 1.5mm;vertical-align:middle">'+o('ten', '&nbsp;', {rong:112})+'</td></tr></table></td></tr>')+
        dong('<b>Ngày, tháng, năm sinh*:</b> '+ngay('ns', 10, 10, 10)+'          <b>Giới tính*:</b> '+ck('gt', V.gt==='Nam')+'Nam  '+ck('gt', V.gt==='Nữ')+'Nữ')+
        dong('<b>Quốc tịch*:</b> '+ck('quocTich', V.quocTich==='Việt Nam')+' Việt Nam   '+ck('quocTich', V.quocTich && V.quocTich!=='Việt Nam')+' Khác (ghi rõ)'+o('quocTich', D(18), {gt:C('quocTich') && V.quocTich!=='Việt Nam' ? V.quocTich : ''})+'   <b>Dân tộc*:</b> '+o('danToc', D(35)))+
        dong('<b>Tình trạng cư trú*:</b> '+ck('cuTru', !!V.cuTru)+' Có cư trú   ☐ Không cư trú')+
        dong('<b>Thông tin giấy tờ tùy thân*:</b> '+ck('cccd', so.length===12)+'Thẻ CC công dân/Thẻ CC     ☐CC điện tử')+
        hsoBang('khung0', [8, 92], '<tr><td><p>Số:</p></td><td>'+oSo+'</td></tr>')+
        dong('Ngày cấp: '+ngay('ncap', 9, 9, 9)+'   Ngày hết hạn: '+ngay('hanCCCD', 9, 9, 9)+'   Nơi cấp: '+o('noiCap', D(30)))+
        dong('<b>Mã số thuế cá nhân (nếu có):</b> '+o('mst', D(60)))+dong('<b>Nghề nghiệp hiện tại</b>*:')+
        hsoBang('khung0 s12', [26, 24, 18, 32], '<tr><td>'+nn('Nhân viên văn phòng')+'<br>'+nn('Lực lượng vũ trang')+'<br>'+nn('Nông dân')+'</td><td>'+nn('Công chức, viên chức')+'<br>'+nn('Đã nghỉ hưu')+'<br>'+nn('Công nhân')+'</td><td>'+nn('Nội trợ')+'<br>'+nn('Tự kinh doanh')+'<br>'+nn('Lao động tự do')+'</td>'+
          '<td>'+nn('Học sinh, sinh viên')+'<br>'+nn('Giáo viên, giảng viên')+'<br>'+ck('ngheNghiep', NN==='Khác')+' Khác (ghi rõ): '+o('ngheNghiep', D(18), {gt:C('ngheNghiep') && NN==='Khác' ? V.P.ngheKhac || '' : ''})+'</td></tr>')+
        '<p><b>Chức vụ*:</b> '+o('chucVu', D(120))+'</p>'+
        dong('<b>Nơi thường trú :</b>')+dong('Số nhà: '+o('soNha', D(28))+'Đường: '+o('soNha', D(50), {gt:C('soNha') ? V.duong || '' : ''})+'Tổ dân phố/Thôn: '+o('thuongTru', D(22), {gt:tt ? V.ap || '' : ''})+' ')+
        dong('Phường/Xã/Đặc khu: '+o('thuongTru', D(25), {gt:tt ? V.xa || '' : ''})+'   Tỉnh/Thành phố: '+o('thuongTru', D(35), {gt:tt && (V.ap || V.xa) ? V.tinh || '' : ''}))+
        dong('<b>Nơi ở hiện tại khác (nếu có):</b>')+dong('Số nhà: '+o('noiO', D(28)+'Đường: '+D(50)+'Tổ dân phố/Thôn: '+D(22)))+   /* có chữ: ghi gọn 1 ô cả dòng (sổ hộ vay ghi địa chỉ 1 chuỗi) */
        dong('Phường/Xã/Đặc khu: '+D(25)+'Tỉnh/Thành phố: '+D(35))+
        dong('<b>Nơi làm việc</b>: '+o('noiLam', D(55))+'Điện thoại nơi làm việc: '+o('noiLam', D(40), {gt:C('noiLam') ? V.dtNoiLam || '' : ''}))+dong('<b>Địa chỉ nơi làm việc</b>:')+
        dong('Số nhà: '+o('noiLam', D(28)+'Đường: '+D(50)+'Tổ dân phố/Thôn: '+D(22), {gt:C('noiLam') ? V.dcNoiLam || '' : ''}))+dong('Phường/Xã/Đặc khu: '+D(25)+'Tỉnh/Thành phố: '+D(35))+
        dong('<b>Điện thoại liên hệ*:</b> '+o('sdt', D(28))+'   <b>Thư điện tử (Email):</b> '+o('email', D(45)))+
        '<p class="i j tr">Điện thoại và Email liên hệ là số điện thoại và thư điện tử chính chủ của khách hàng. Đây là một trong số các phương thức liên hệ để NHCSXH thông báo cho Quý khách thông tin cần thiết trong quá trình đăng ký và sử dụng dịch vụ. Quý khách lưu ý thông báo ngay cho NHCSXH khi có bất kỳ sự thay đổi nào về số điện thoại, email liên hệ. NHCSXH cung cấp dịch vụ ngân hàng và thông báo các thông tin cần thiết trong quá trình sử dụng dịch vụ qua số điện thoại và email liên hệ cập nhật của Quý khách chỉ khi nhận được thông báo của Quý khách về việc thay đổi thông tin nêu trên.</p>'+
        '<p class="i j">Quý khách sử dụng thông tin điện thoại và email liên hệ là số điện thoại và email đăng ký tài khoản định danh điện tử của Quý khách trên ứng dụng VNeID, trang thông tin điện tử “dinhdanhdientu.gov.vn” và “vneid.gov.vn”.</p>'+
        dong('<b>Thu nhập bình quân hàng tháng trong 06 tháng gần nhất (đơn vị: triệu VND)</b>')+
        hsoBang('khung0', [1, 1, 1, 1.6], '<tr><td>'+tn('Dưới 10')+'</td><td>'+tn('Từ 10-50')+'</td><td>'+tn('Trên 50')+'</td><td>'+ck('thuNhap', V.thuNhap==='Khác')+' Khác (ghi rõ): '+o('thuNhap', D(22), {gt:C('thuNhap') && V.thuNhap==='Khác' ? V.P.thuNhapKhac || '' : ''})+'</td></tr>')+
        dong('<b>Nguồn gốc thu nhập trong 06 tháng gần nhất/tiền gửi của Quý khách tại NHCSXH</b>')+
        hsoBang('khung0', [1, 0.8, 1.4, 1.6], '<tr><td>'+ng('Thừa kế tài sản')+'<br>'+ng('Cho thuê tài sản')+'</td><td>'+ng('Lương')+'<br>'+ng('Trợ cấp')+'</td><td>'+ng('Lợi nhuận đầu tư, lãi tiền gửi')+'<br>'+ck('nguonThu', V.nguonThu.indexOf('Khác')>=0)+' Khác( ghi rõ): '+o('nguonThu', D(10), {gt:''})+'</td>'+
          '<td>'+ng('Lợi nhuận sản xuất, kinh doanh')+'<br>'+o('nguonThu', D(30), {gt:C('nguonThu') && V.nguonThu.indexOf('Khác')>=0 ? V.P.nguonKhac || '' : ''})+'</td></tr>')+
        dong('<b>Tình trạng hôn nhân:</b> '+hn('Độc thân')+'      '+hn('Đã kết hôn')+'      '+ck('honNhan', V.honNhan==='Khác')+' Khác( ghi rõ): '+o('honNhan', D(35), {gt:C('honNhan') && V.honNhan==='Khác' ? V.P.honNhanKhac || '' : ''}))+
        hsoBang('luoi', [1, 1], '<tr><td class="c b" colspan="2">ĐĂNG KÝ CHỮ KÝ MẪU</td></tr><tr>'+['Chữ ký mẫu', 'Xác nhận chữ ký mẫu'].map(function(x){ return '<td class="c tg-ck"><p class="c b">'+x+'</p><div class="tg-ckk"><p class="c i s10">(Ký và ghi rõ họ tên)</p></div></td>'; }).join('')+'</tr>'+
          '<tr><td colspan="2"><p class="i j s12"><b>Đăng ký chữ ký mẫu:</b> Chữ ký mẫu đăng ký tại mục này áp dụng cho tất cả các giao dịch qua tài khoản Tổ viên, trên chứng từ giao dịch giấy tại NHCSXH theo quy định pháp luật. Quý khách lưu ý viết đầy đủ họ tên; không viết họ tên và ký bằng chữ in hoa; 02 chữ ký mẫu phải giống nhau và giống chữ ký tại mục Cam kết của khách hàng. Trường hợp khách hàng thay đổi mẫu chữ ký, yêu cầu khách hàng thực hiện thay đổi thông tin mẫu chữ ký theo quy định. Trường hợp Quý khách đã đăng ký mẫu chữ ký tại NHCSXH cho các giao dịch trước thời điểm Giấy đề nghị này có hiệu lực, tiếp tục sử dụng chữ ký đó cho các thỏa thuận đăng ký trước.</p></td></tr>');
      var Bd = '<p class="j">'+ck('dvDeNghi', !!V.dvDeNghi)+' Tôi đề nghị NHCSXH cung cấp dịch vụ tài khoản Tổ viên theo các thông tin đã đăng ký tại mục “A-Phần dành cho Khách hàng đăng ký thông tin cá nhân” nêu trên để thực hiện các nghiệp vụ tại trụ sở NHCSXH nơi mở tài khoản hoặc tại điểm giao dịch của NHCSXH<sup>1</sup> như sau:</p>'+
        ['1. Nộp tiền mặt vào tài khoản Tổ viên;', '2. Nộp tiền mặt vào tài khoản Tổ viên thông qua Ban quản lý Tổ Tiết kiệm và vay vốn;', '3. Nhận chuyển khoản đến tài khoản Tổ viên;', '4. Đề nghị NHCSXH trích Nợ từ tài khoản để thu nợ vay tại NHCSXH;',
          '5. NHCSXH được chủ động trích Nợ từ tài khoản Tổ viên để thu: tiền lãi, nợ gốc đến hạn, nợ gốc quá hạn của khoản vay; tiền lãi, nợ gốc của khoản vay trước khi xử lý rủi ro; chi phí phát sinh trong quá trình quản lý tài khoản Tổ viên;', '6. Rút tiền mặt hoặc chuyển khoản từ tài khoản Tổ viên sau khi đã trả hết nợ NHCSXH.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
        '<p class="tr">☐ Đăng ký SMS chủ động (nhận thông báo biến động số dư qua SMS có tính phí)      '+ck('sms', /^c/i.test(sms))+' Có      '+ck('sms', /^k/i.test(sms))+' Không</p>';
      var nk = G.ngay('ngayKy', [D(10), D(9), D(9)], {lien:1});   /* trong câu "…, ngày … tháng … năm …" → số gõ liền */
      var C2 = '<p class="j">1. Với mọi trách nhiệm thuộc về mình, Tôi cam đoan mọi thông tin đưa ra tại Giấy đề nghị này đều đầy đủ và trung thực. Tôi hiểu và đồng ý rằng NHCSXH có thể yêu cầu thêm thông tin để xác thực các thông tin mà tôi xác nhận ở trên, thay mặt tôi cung cấp thông tin cho các cơ quan nhà nước có thẩm quyền theo quy định của pháp luật. Đề nghị NHCSXH cung cấp tài khoản Tổ viên mà Tôi đã đăng ký ở trên.</p>'+
        '<p class="j">2. Tôi xác nhận và đồng ý rằng:</p>'+
        '<p class="j">(a) Đã được NHCSXH cung cấp đầy đủ thông tin về Thoả thuận/Hợp đồng/Giấy đề nghị theo mẫu. Đã đọc, hiểu rõ, tự nguyện đồng ý và cam kết thực hiện “<i>Điều khoản, điều kiện giao dịch chung về mở và sử dụng tài khoản dành cho khách hàng cá nhân</i>” và “<i>Điều khoản, điều kiện chung về bảo vệ và xử lý dữ liệu cá nhân tại NHCSXH</i>”, sau đây được gọi là ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG và nội dung tại mục B Giấy đề nghị này;</p>'+
        '<p class="j">(b) NHCSXH được xác thực thông tin trên giấy tờ tùy thân định danh của tôi theo quy định của pháp luật từ bất kỳ giải pháp nào mà NHCSXH có được để phục vụ mục đích tuân thủ quy định pháp luật về nhận biết khách hàng; cung cấp cho bên thứ ba (bao gồm nhưng không giới hạn các đối tác…) hợp tác với NHCSXH để phát triển và cung cấp các sản phẩm, dịch vụ của NHCSXH; hoặc sử dụng thông tin với mục đích nghiên cứu đánh giá để hiểu về nhu cầu sử dụng sản phẩm dịch vụ ngân hàng của tôi để phục vụ các nghiệp vụ ngân hàng;</p>'+
        '<p class="j">(c) NHCSXH được cung cấp thông tin tài khoản Tổ viên của Tôi cho Ban quản lý Tổ Tiết kiệm và vay vốn để theo dõi, đôn đốc việc thực hiện nghĩa vụ của Tôi với Ngân hàng;</p>'+
        '<p class="j">(d) Chịu trách nhiệm cập nhật, kiểm tra số dư tài khoản Tổ viên theo thông báo do Ngân hàng phát hành, gửi đến tôi thông qua Ban quản lý Tổ Tiết kiệm và vay vốn và/hoặc thông qua các ứng dụng do NHCSXH cung cấp, kịp thời thông báo đến NHCSXH khi có sai sót, chênh lệch cần kiểm tra, đối chiếu;</p>'+
        '<p class="j">(đ) Đồng ý rằng khi đại diện hợp pháp của NHCSXH ký vào "Phần dành cho Ngân hàng" tại văn bản này thì văn bản này và các ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG dưới đây được coi là Hợp đồng và có giá trị ràng buộc các bên.</p>'+
        hsoBang('khung0', [90, 10], '<tr><td></td><td class="c i">Đồng ý</td></tr><tr><td><p class="i j">- Điều khoản, điều kiện giao dịch chung về mở và sử dụng tài khoản dành cho khách hàng cá nhân tại NHCSXH.</p></td><td class="c">'+ck('dongY', !!V.dongY)+'</td></tr><tr><td><p class="i j">- Điều khoản, điều kiện chung về bảo vệ và xử lý dữ liệu cá nhân tại NHCSXH.</p></td><td class="c">'+ck('dongY', !!V.dongY)+'</td></tr>')+
        '<p class="j">Tôi chịu trách nhiệm cập nhật và tự nguyện chấp thuận không kèm theo bất kỳ điều kiện nào đối với các ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG nêu trên được sửa đổi và đăng tải trên website chính thức của NHCSXH trong từng thời kỳ, hiện là <u>www.vbsp.org.vn</u> hoặc thông báo đến Tôi thông qua các kênh cung cấp dịch vụ của NHCSXH.</p>'+
        '<p class="j">3. Tôi cam kết chịu trách nhiệm quản lý, sử dụng tài khoản theo quy định của pháp luật và của NHCSXH. Đồng ý chi trả các khoản phí liên quan đến việc quản lý và sử dụng tài khoản theo quy định của NHCSXH theo từng thời kỳ, mức phí công khai trên website chính thức của NHCSXH.</p>'+
        '<p class="j">4. Trường hợp số điện thoại liên hệ của Tôi không phải số điện thoại di động chính chủ, NHCSXH được miễn trách nhiệm trong việc gửi thông tin cho Tôi qua số điện thoại liên hệ đã khai báo ở trên.</p>'+
        '<p class="j">Giấy đề nghị này được lập thành 02 bản gốc, có giá trị pháp lý ngang nhau, khách hàng và NHCSXH mỗi bên giữ một bản.</p><p class="i">Quý khách vui lòng kiểm tra thông tin tại Hợp đồng này trước khi ký xác nhận.</p>'+
        '<p class="c i">'+o('diaDanh', D(8), {lien:1})+', ngày'+nk[0]+' tháng'+nk[1]+'năm'+nk[2]+'</p><p class="c b">Khách hàng</p><p class="c i s10">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
      var kyD = [['Cán bộ tiếp nhận', 'Ký, ghi rõ họ tên'], ['Giao dịch viên', 'Ký, ghi rõ họ tên'], ['Kiểm soát viên', 'Ký, ghi rõ họ tên'], ['Giám đốc', 'Ký, đóng dấu']];
      var tn2 = hsoNg(G.gt('tiepNhan')) ? [ngay('tiepNhan')] : G.ngay('tiepNhan', [D(4), D(4), D(7)]), gd = G.ngay('nhNgay', [D(8), D(8), D(10)], {lien:1}), hl = hsoNg(G.gt('hieuLuc')) ? [ngay('hieuLuc')] : G.ngay('hieuLuc', [D(10), D(10), D(10)]);
      var Dd = hsoBang('luoi', [2689, 2409, 2410, 2874], '<tr style="height:6.3mm"><td class="c i" style="white-space:nowrap">Tiếp nhận ngày '+tn2.join('/')+'</td><td colspan="3" class="c i">'+coChuHTML(hsoPGD('noi'))+', ngày '+gd[0]+' tháng '+gd[1]+' năm '+gd[2]+'</td></tr>'+
          '<tr style="height:10mm">'+kyD.map(function(x){ return '<td class="c" style="vertical-align:top;border-bottom:0"><p class="c b">'+x[0]+'</p><p class="c i">('+x[1]+')</p></td>'; }).join('')+'</tr>'+
          '<tr style="height:27mm">'+kyD.map(function(){ return '<td style="border-top:0">&nbsp;</td>'; }).join('')+'</tr>').replace('<table ', '<table style="width:97%;margin:3pt auto 4pt" ')+
        '<p class="tr"><b>Số CIF:</b> '+o('cif', D(45))+' <b>Số Tài khoản Tổ viên:</b> '+o('soTK', D(70))+'</p><p>Hiệu lực từ ngày: '+hl.join('/')+'</p>';
      var h = hsoBang('khung0', [17, 63, 20], '<tr><td>'+hsoLogo(MK, 16)+'</td><td class="c"><p class="c b s13">&nbsp;</p><p class="c b s13">GIẤY ĐĂNG KÝ MỞ TÀI KHOẢN TỔ VIÊN</p></td><td class="r"><table class="luoi s12" data-w="1"><tr><td class="c">Mẫu 01/TGTV</td></tr></table></td></tr>')+
        '<p class="i j tr">Tôi đề nghị Ngân hàng Chính sách xã hội (NHCSXH) chi nhánh/PGD <b>'+o('ngan', D(20), {lien:1})+'</b> mở hồ sơ thông tin cá nhân và đăng ký tài khoản Tổ viên với các thông tin sau.</p>'+
        hsoBang('luoi giua s10', [1], '<tr><td style="padding:1pt 3pt"><p style="line-height:1.5">Ngày:'+D(75)+'</p><p style="line-height:1.5">Số Hồ sơ thông tin KH (Số CIF) '+o('cif', D(50), {pt:11})+'</p></td></tr>').replace('<table ', '<table style="width:120mm;margin:1pt auto;border:.8pt solid #000;border-radius:2.5mm;border-collapse:separate;border-spacing:0" ').replace('<td style="padding:1pt 3pt">', '<td style="padding:1pt 3pt;border:0">')+   /* 3.318 (anh): khung bo góc tròn như mẫu */
        hsoKhungNgoai([['nen', 'A- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ THÔNG TIN CÁ NHÂN'], A, ['nen', 'B- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ'], Bd+'<p class="i s9 tr"><sup>1</sup> Trong thời gian NHCSXH nơi khách hàng mở tài khoản tổ chức phiên giao dịch tại điểm giao dịch nơi khách hàng đăng ký địa chỉ thường trú/tạm trú để giao dịch với NHCSXH, khách hàng được thực hiện các giao dịch trên tài khoản tại điểm giao dịch của NHCSXH, đồng thời khách hàng không được thực hiện các giao dịch rút tiền mặt, chuyển khoản từ tài khoản Tổ viên của mình tại trụ sở NHCSXH.</p>', ['nen', 'C- CAM KẾT CỦA KHÁCH HÀNG'], C2, ['tieu', 'D - PHẦN DÀNH CHO NGÂN HÀNG'], Dd]);
      return {ma:'01/TGTV', h:'<div class="tgtv">'+h+'</div>'};
    }});
  hsoLap01tgtv = function(t, P){ return omLap(MK, t, P); };
})();
