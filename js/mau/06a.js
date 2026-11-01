/* ===== 3.430 (anh chốt 01/11/2026) — MẪU 06A/TD Phiếu kiểm tra sử dụng vốn vay (727) trên nền ô — dựng theo file gốc tests/mau_goc/06a.docx =====
   Nghiệp vụ (anh 01/11): Mẫu 06 kiểm tra nhiều hộ (hộ vay đúng); phát hiện SAI (sai mục đích, 3 tháng KHĐ…) → kiểm tra, đánh giá TỪNG HỘ bằng 06A.
   MỖI MÓN 1 PHIẾU (anh chốt). Khách = người vay đang chọn, món = món đang chọn (như 09A). Số tiền nợ lãi = lãi tồn tất cả (Mẫu 31 chỉ có Lãi tồn TH + QH — laiTon).
   Lề 20 / 20 / 18 / 27,5 mm · Times New Roman 13,5 · dòng cố định 18 pt, cách trước 3 pt, thụt đầu dòng 10 mm. Chú thích (1), (2) in cuối trang (Word gốc là footnote).
   Mẫu chỉ trình bày — chỗ khác gọi qua hso06aMo(mã tổ, mã KH, số khế ước). Bỏ file này → mất mẫu 06A (js/25 có hàm thay báo thiếu). */
(function(){
  var MK = '06a';
  var L = 'line-height:18pt;margin:3pt 0 0;', T = 'text-indent:10mm;', J = 'text-align:justify;';
  function P(noi, s){ return '<p style="margin:0;'+L+(s||'')+'">'+noi+'</p>'; }
  var CH = '........................................................................................................................................';
  function Ch(n){ var h = ''; for(var i=0;i<n;i++) h += P(CH, 'white-space:nowrap;overflow:hidden'); return h; }
  omDangKy({k:MK, ma:'06A/TD', phan:['nhs', 'kh', 'ky'], co:13.5,
    o:[{k:'donVi', n:'Đơn vị kiểm tra', p:'nhs', l:'kb', md:'cham'},
      {k:'ngay', n:'Ngày kiểm tra', p:'ky', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noi', n:'Tại (nơi kiểm tra)', p:'ky', l:'go', md:'cham', nhanh:1},
      {k:'ten', n:'Họ tên khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay đang chọn — M31'},
      {k:'maKH', n:'Mã khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay đang chọn — M31'},
      {k:'tt', n:'Tổ trưởng', p:'kh', l:'tu', md:'tu', ng:'tổ — File Tổ trưởng / M31 (QT-C-18)'},
      {k:'hoi', n:'Tổ chức Hội quản lý', p:'kh', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'ngaySL', n:'Đối chiếu đến ngày (ngày số liệu)', p:'kh', l:'tu', md:'tu', ng:'ngày số liệu Mẫu 31 đang mở'},
      {k:'ct', n:'Chương trình', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'ku', n:'Mã món vay (số khế ước)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'gn', n:'Số tiền giải ngân', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31 (Tổng giải ngân)'},
      {k:'goc', n:'Số dư nợ gốc', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'lai', n:'Số tiền nợ lãi (lãi tồn tất cả)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31 (Lãi tồn TH + QH)'},
      {k:'t105', n:'Số dư tiền gửi tổ viên (TK 105)', p:'kh', l:'tu', md:'tu', ng:'người vay đang chọn — M31 / Sao kê TK 105 (QT-C-22)'},
      {k:'md', n:'Mục đích vay vốn', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31 (ngành nghề)'}],
    V:function(t){
      var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = V.ku ? mon.find(function(x){ return x.ku===V.ku; }) || null : mon[0] || null;   /* món đã chọn mà kỳ đang mở không còn dư nợ → để chấm, không lấy nhầm món khác */
      var k = c && t ? hsoTVTo(t).find(function(x){ return x.kh===c.kh || x.kh===V.kh; }) : null, ns = KHO.coKy() ? (KHO.ky().ngay || '') : '';
      var md = m && typeof ktCoNganh==='function' && ktCoNganh(m) ? ktNganh(m) : '';
      return {donVi:'', ngay:V.ngay || '', noi:V.noi || '', ten:c && c.ten, maKH:c ? (c.kh || V.kh) : '', tt:T.tt, hoi:T.hoi || '',
        ngaySL:ns, ct:m ? hsoCTMon(m) : '', ku:m && m.ku, gn:m && m.gn ? tdnTien(m.gn) : '', goc:m ? tdnTien(m.dn||0) : '', lai:m ? tdnTien(laiTon(m)) : '',
        t105:k && k.t105 ? tdnTien(k.t105) : (k ? '0' : ''), md:md};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 13.5), o = G.o, ng = G.ngay('ngay', ['….', '…', '….']), sl = G.ngay('ngaySL', ['……', '…..', '…….']);
      var h = '<p style="margin:0;text-align:right;font-size:10pt;line-height:1.2"><b><i>Mẫu số: 06A/TD</i></b></p>'+
        '<p style="margin:0;text-align:right;font-size:9.5pt;line-height:1.2"><i>- 01 liên lưu NH nơi cho vay;</i></p><p style="margin:0;text-align:right;font-size:9.5pt;line-height:1.2"><i>- 01 liên phô tô lưu đ.vị k.tra.</i></p>'+
        hsoBang('khung0', [64.8, 101.4], '<tr><td class="c" style="vertical-align:top"><p class="c b" style="font-size:13pt">ĐƠN VỊ KIỂM TRA</p><p class="c">'+o('donVi', '........................................')+'</p></td>'+
          '<td class="c" style="vertical-align:top">'+hsoQH('-', 13)+'</td></tr>')+
        P('<b>PHIẾU KIỂM TRA SỬ DỤNG VỐN VAY</b> <sup style="font-size:8pt">(1)</sup>', 'text-align:center;font-size:14pt;margin-top:12pt')+
        P('Hôm nay, ngày '+ng.join('/')+', tại '+o('noi', '…………….……………………')+', chúng tôi gồm:', T+J+'margin-top:9pt')+
        P('<b>THÀNH PHẦN ĐOÀN KIỂM TRA</b>', T)+
        P('- Ông (bà) ………….………………… Chức vụ …….……..….……..………', T)+
        P('- Ông (bà) ………….………………… Chức vụ …….……..….……..………', T)+
        P('<b>KHÁCH HÀNG VAY VỐN</b>', T)+
        P('Ông (bà) '+o('ten', '……………………..……….…..…')+' Mã khách hàng: '+o('maKH', '…..………......'), T)+
        P('Là thành viên Tổ TK&amp;VV do Ông (bà)'+o('tt', '…………………………………')+'làm Tổ trưởng, thuộc tổ chức Hội'+o('hoi', '………………….. ………….…....')+' quản lý.', T+J)+
        P('Cùng thống nhất nội dung kiểm tra như sau:', T)+
        P('<b>1. Đối chiếu số tiền vay, tiền gửi tổ viên đến ngày</b> '+sl.join('/')+':', T)+
        P('a) Theo hồ sơ cho vay', T)+
        P('- Chương trình: '+o('ct', '……………….……….….')+' Mã món vay: '+o('ku', '…….………………'), T)+
        P('- Số tiền giải ngân:'+o('gn', '………………….……....……….….………….…….')+'đồng.', T)+
        P('- Số dư nợ gốc:'+o('goc', '……..….....................….…....………………...……..….')+' đồng.', T)+
        P('- Số tiền nợ lãi: '+o('lai', '……………….')+' đồng.', T)+
        P('- Số dư tiền gửi tổ viên: '+o('t105', '……………..…...………………….………….')+' đồng.', T)+
        P('b) Thực tế tại khách hàng', T)+
        P('- Tổng số tiền thực nhận: …………..…… đồng; chênh lệch:……....……..đồng.', T)+
        P('- Số dư nợ gốc:………..………….…….đồng; chênh lệch:……....………đồng.', T)+
        P('- Số tiền nợ lãi:………………….…...…đồng; chênh lệch:………....…....đồng', T)+
        P('- Số dư tiền gửi tổ viên:…………..….… đồng; chênh lệch: …...………...đồng.', T)+
        P('<b>2. Tình hình thực hiện phương án/dự án:</b>', T)+
        P('a) Mục đích vay vốn:'+o('md', '…...……..…………..………………..……………..……'), T)+Ch(3)+
        P('b) Thực tế sử dụng vốn vay:', T)+
        P('- Sử dụng đúng mục đích số tiền …...……………..………… đồng, vào việc:', T)+Ch(4)+
        P('Số hóa đơn, chứng từ (nếu có): ………....…………..…(ngày ……/……/…..)', T)+P('…………………………………………………………………………………………', 'white-space:nowrap;overflow:hidden')+
        P('- Sử dụng sai mục đích số tiền …...……………..………… đồng, vào việc:', T)+Ch(4)+
        P('c) Hiệu quả đầu tư <sup style="font-size:8pt">(2)</sup>: ...……………………..……………..…..………………..', T)+Ch(1)+
        P('d) Khả năng trả nợ: ……….………….….………….………….………………', T)+Ch(1)+
        P('<b>3. Ý kiến của cán bộ kiểm tra</b>', T)+Ch(4)+
        P('<b>4. Ý kiến của khách hàng</b>', T)+Ch(3)+
        '<div style="height:4mm"></div>'+hsoBang('khung0', [87.4, 75.1], '<tr><td class="c"><p class="c b">KHÁCH HÀNG VAY VỐN</p><p class="c i">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">CÁN BỘ KIỂM TRA</p><p class="c i">(Ký, ghi rõ họ tên)</p></td></tr>')+
        '<div style="height:22mm"></div><div style="border-top:1px solid #000;width:60mm"></div>'+
        '<p style="margin:0;font-size:10pt;line-height:1.25;text-align:justify"><i><sup>(1)</sup> Cán bộ kiểm tra lựa chọn lập Phiếu kiểm tra sử dụng vốn vay theo mẫu 06/TD hoặc mẫu 06A/TD để đảm bảo phản ánh đầy đủ thực tế sử dụng vốn vay, hóa đơn chứng từ (nếu có).</i></p>'+
        '<p style="margin:0;font-size:10pt;line-height:1.25;text-align:justify"><i><sup>(2)</sup> Số lao động được tạo việc làm, duy trì và mở rộng việc làm; số công trình nước sạch, công trình vệ sinh môi trường; số học sinh sinh viên đi học; số ngôi nhà ở được xây dựng mới, cải tạo, sửa chữa;....</i></p>';
      return {ma:'06A/TD', h:'<div class="om-goc" style="font-size:13.5pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap06a = function(t){ return omLap(MK, t); };
  /* gọi từ chỗ khác (KTGS Mẫu 06 · sau này danh sách 3 tháng KHĐ): mở tab Hồ sơ vay, mẫu 06A, chọn sẵn người vay + món — tổ theo phạm vi đang chọn */
  hso06aMo = function(maTo, kh, ku){ var S = hsoCH(), t = maTo ? KHO.to(maTo) : null; if(t && S.to!==maTo){ S.xa = t.xa || ''; S.diem = t.khoaDiem || ''; S.hoi = String(t.dv||''); S.ap = ''; S.to = maTo; }   /* phạm vi chung đặt đúng tổ (như pvChonTo) */ S.hsv = MK; HSO_DEN = {kh:kh, ku:ku || ''}; luu(); dhSL('hsv'); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([20, 20, 18, 27.5]);   /* lề theo file gốc */
})();
