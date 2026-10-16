/* ===== 3.223 M5 — MẪU 01/TĐCK Giấy đề nghị thay đổi mẫu chữ ký giao dịch trên nền ô — dựng theo file gốc tests/mau_goc/01tdck.docx (VB 2407, 28/3/2025) =====
   Lề 15 / 18 / 15 / 22 mm · Times New Roman 14, giãn dòng Normal 1,15 (≈ 1,32 × cỡ chữ) · đoạn thông tin dòng cố định 18 pt, cách 6 pt · chuỗi chấm đúng gốc.
   Người đề nghị = tổ viên đang chọn (chung với 09A). In kèm 09A như cũ. Bỏ file này → app dùng lại hsoLap01tdck cũ. */
(function(){
  var MK = '01tdck';
  function P(noi, s){ return '<p style="margin:0;'+(s||'')+'">'+noi+'</p>'; }
  var X = 'line-height:18pt;margin:6pt 0;', J = 'text-align:justify;text-indent:10mm;';
  omDangKy({k:MK, ma:'01/TĐCK', phan:['nhs', 'kh', 'nh'], co:14,
    o:[{k:'kinhGui', n:'Kính gửi (tên Ngân hàng)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › Kính gửi'},
      {k:'ten', n:'Tên tôi là (người đề nghị)', p:'kh', l:'tu', md:'tu', ng:'tổ viên đang chọn — M31'},
      {k:'ns', n:'Ngày, tháng, năm sinh', p:'kh', l:'tu', md:'tu', ng:'M31'},
      {k:'cccd', n:'Số thẻ căn cước / CCCD', p:'kh', l:'tu', md:'tu', ng:'M31'},
      {k:'ncap', n:'Ngày cấp', p:'kh', l:'tu', md:'tu', ng:'M31'},
      {k:'noiCap', n:'Nơi cấp', p:'kh', l:'tu', md:'tu', ng:'tự tính theo ngày cấp'},
      {k:'noiCu', n:'Nơi cư trú', p:'kh', l:'tu', md:'tu', ng:'M31 / tổ'},
      {k:'tt', n:'Tổ trưởng', p:'kh', l:'tu', md:'tu', ng:'tổ — M31 / Danh sách tổ'},
      {k:'ngan', n:'"Đề nghị NHCSXH …" (tên chi nhánh / PGD)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD (điền sau chữ NHCSXH)'},
      {k:'ky1', n:'Chữ ký thứ nhất — Họ và tên', p:'kh', l:'tu', md:'cham', ng:'người đề nghị'},
      {k:'ky2', n:'Chữ ký thứ hai — Họ và tên', p:'kh', l:'tu', md:'cham', ng:'người đề nghị'},
      {k:'nhNgan', n:'Chấp thuận: "Ngân hàng Chính sách xã hội …" (tên PGD)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD'},
      {k:'nhTen', n:'Chấp thuận cho ông/bà … = tên khách hàng', p:'nh', l:'tu', md:'cham', ng:'người đề nghị', nhanh:1},
      {k:'nhNgay', n:'Kể từ ngày …/…/… (hiệu lực mẫu chữ ký mới)', p:'nh', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'diaDanh', n:'Địa danh ("…, ngày" khách hàng ký)', p:'kh', l:'tu', md:'tu', ng:'xã của tổ'},
      {k:'ngayKy', n:'Ngày tháng (khách hàng ký)', p:'kh', l:'go', md:'cham', ngay:1, nhanh:1}],
    V:function(t){
      var T = t ? hsoTo(t) : {}, c = hsoKhachChon(t) || {}, ns = String(c.ns||'');
      return {kinhGui:hsoPGD('kinhGui'), ten:c.ten, ns:ns.length>=10 ? ns : '', nsNam:ns.length===4 ? ns : '', cccd:c.cccd, ncap:c.ncap, noiCap:c.cccd ? (c.noiCap || hsoNoiCapGY(c.ncap)) : '', noiCu:c.ten ? hsoDiaChi(c, t) : '', tt:T.tt,
        ngan:hsoPGD('ngan'), ky1:c.ten, ky2:c.ten, nhNgan:hsoPGD('ngan'), nhTen:c.ten, nhNgay:HSO.vay.nhNgay, diaDanh:T.xa, ngayKy:HSO.vay.ngayKy};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, s11 = {pt:11}, s12 = {pt:12};
      var ns = G.ngay('ns', ['….', '……', '……']); if(!V.ns && V.nsNam && omCach(MK, 'ns')!=='cham') ns[2] = o('ns', '……', {gt:V.nsNam, canh:'c'});
      var nc = G.ngay('ncap', ['……….…', '……', '………'], {pt:11, ls:-0.4}), N4 = '<span style="letter-spacing:-0.4pt">', nn = G.ngay('nhNgay', ['……', '..…', '……..']), nk = G.ngay('ngayKy', ['……', '..…', '……..'], s12);
      var ky = function(k){ return P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('&nbsp;')+P('Họ và tên: '+o(k, '…………….…..…………….…..', s11), 'text-align:justify'); };
      var h = P('<i>Mẫu số 01/TĐCK</i>', 'text-align:right;font-size:11pt')+P('<i>Lập 01 bản lưu NH</i>', 'text-align:right;font-size:11pt')+
        P('<b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center')+P('<b>Độc lập – Tự do – Hạnh phúc</b>', 'text-align:center')+'<p class="ke" data-ke="60" style="width:60mm;margin:0.5pt auto -0.5pt"></p>'+P('&nbsp;')+
        P('<b>GIẤY ĐỀ NGHỊ</b>', 'text-align:center;font-size:15pt')+P('<b>Về việc thay đổi mẫu ký giao dịch với NHCSXH</b>', 'text-align:center;font-size:15pt')+P('&nbsp;')+
        P('Kính gửi: <b>'+o('kinhGui', '………………………………………………………')+'</b>', 'text-align:center')+
        P('Tên tôi là:'+o('ten', '……………………………...')+'; ngày, tháng, năm sinh: '+ns.join('/'), J+'margin-top:18pt;white-space:nowrap')+
        P(N4+'Số thẻ căn cước/căn cước công dân:</span>'+o('cccd', '………………………………………………..', {ls:-0.4})+N4+'; ngày cấp:</span>'+nc.join(N4+'/</span>')+N4+'; nơi cấp: </span>'+o('noiCap', '…………………………………………………….…..……', s11), J+X)+   /* gốc nén ký tự −0,4 pt */
        P('Nơi cư trú: '+o('noiCu', '………………………………………………………………………..'), J+X)+
        P('Là đại diện theo ủy quyền của hộ gia đình đứng tên vay vốn và thực hiện các giao dịch với NHCSXH, thuộc Tổ Tiết kiệm và vay vốn do ông (bà): '+o('tt', '…………….…………………....…………', s11)+'  làm Tổ trưởng.', J+X)+
        P('Đề nghị NHCSXH '+o('ngan', '………………………………..')+' thay đổi mẫu chữ ký giao dịch với Ngân hàng như sau:', J+X)+
        hsoBang('luoi', [85, 86.9], '<tr><td class="c"><p class="c b">Chữ ký thứ nhất</p></td><td class="c"><p class="c b">Chữ ký thứ hai</p></td></tr><tr><td style="padding-top:1.8mm">'+ky('ky1')+'</td><td style="padding-top:1.8mm">'+ky('ky2')+'</td></tr>')+P('&nbsp;')+
        hsoBang('khung0', [103.5, 70.9], '<tr><td style="vertical-align:top"><p class="c b" style="margin-top:6pt;letter-spacing:-0.8pt">CHẤP THUẬN CỦA</p><p class="c b" style="margin-top:6pt;letter-spacing:-0.8pt">NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p>'+
            P('<i>Ngân hàng Chính sách xã hội '+o('nhNgan', '……………', {canh:'c'})+' chấp thuận cho ông/bà: '+o('nhTen', '……………..……..........….…..')+' có tên trên thay đổi mẫu chữ ký giao dịch với NHCSXH theo mẫu chữ ký đã đăng ký kể từ ngày '+nn.join('/')+'</i>', 'text-align:justify')+
            '<p class="c b">GIÁM ĐỐC</p><p class="c i s12">(Ký tên, đóng dấu)</p></td>'+
          '<td class="c" style="vertical-align:top"><p class="c i s12" style="line-height:1.15">'+o('diaDanh', '……………', s12)+', ngày'+nk.join('/')+'</p><p class="c b s13" style="line-height:1.15;margin-top:6pt">KHÁCH HÀNG</p><p class="c i s12" style="line-height:1.15">(Ký, ghi rõ họ và tên)</p></td></tr>');
      return {ma:'01/TĐCK', h:'<div class="om-goc" style="font-size:14pt;line-height:1.32">'+h+'</div>'};
    }});
  hsoLap01tdck = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([15, 18, 15, 22]);   /* lề theo file gốc */
})();
