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
  omDangKy({k:MK, ma:'06A/TD', phan:['nhs', 'ky', 'doan', 'kh', 'tt', 'sd', 'yk', 'kyt'], co:13.5,
    dien:[['het', 'Điền hết'], ['tuy', 'Tùy chọn']],   /* 3.461 (anh 03/11 "rà soát lại các dòng đều cho khai báo riêng theo quy chuẩn") */
    phanTen:{nhs:'Đơn vị kiểm tra', ky:'Ngày, nơi kiểm tra', doan:'Thành phần đoàn kiểm tra', kh:'Khách hàng, đối chiếu theo hồ sơ', tt:'1b. Thực tế tại khách hàng', sd:'2. Phương án / sử dụng vốn', yk:'3–4. Ý kiến', kyt:'Họ tên dưới chữ ký'},
    o:[{k:'donVi', n:'Đơn vị kiểm tra', p:'nhs', l:'kb', md:'cham'},
      {k:'ngay', n:'Ngày kiểm tra', p:'ky', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noi', n:'Tại (nơi kiểm tra — địa chỉ khách)', p:'ky', l:'tukb', md:'tu', ng:'người vay — M31 (ấp, xã) + tỉnh', nhanh:1},
      {k:'doan1Ten', n:'Đoàn kiểm tra — Ông (bà) 1', p:'doan', l:'kb', md:'cham'}, {k:'doan1Cv', n:'Đoàn kiểm tra — Chức vụ 1', p:'doan', l:'kb', md:'cham'},
      {k:'doan2Ten', n:'Đoàn kiểm tra — Ông (bà) 2', p:'doan', l:'kb', md:'cham'}, {k:'doan2Cv', n:'Đoàn kiểm tra — Chức vụ 2', p:'doan', l:'kb', md:'cham'},
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
      {k:'md', n:'Mục đích vay vốn', p:'sd', l:'tu', md:'tu', ng:'món đang chọn — M31 (ngành nghề)'},
      {k:'ttTn', n:'1b. Tổng số tiền thực nhận', p:'tt', l:'kb', md:'cham'}, {k:'ttTnCL', n:'1b. Thực nhận — chênh lệch', p:'tt', l:'kb', md:'cham'},
      {k:'ttGoc', n:'1b. Số dư nợ gốc (thực tế)', p:'tt', l:'kb', md:'cham'}, {k:'ttGocCL', n:'1b. Dư nợ gốc — chênh lệch', p:'tt', l:'kb', md:'cham'},
      {k:'ttLai', n:'1b. Số tiền nợ lãi (thực tế)', p:'tt', l:'kb', md:'cham'}, {k:'ttLaiCL', n:'1b. Nợ lãi — chênh lệch', p:'tt', l:'kb', md:'cham'},
      {k:'ttT105', n:'1b. Số dư tiền gửi tổ viên (thực tế)', p:'tt', l:'kb', md:'cham'}, {k:'ttT105CL', n:'1b. Tiền gửi — chênh lệch', p:'tt', l:'kb', md:'cham'},
      {k:'dungTien', n:'2b. Sử dụng đúng mục đích — số tiền', p:'sd', l:'kb', md:'cham'}, {k:'dungViec', n:'2b. Đúng mục đích — vào việc', p:'sd', l:'kb', md:'cham'},
      {k:'hoaDon', n:'2b. Số hóa đơn, chứng từ', p:'sd', l:'kb', md:'cham'}, {k:'hoaDonNgay', n:'2b. Ngày hóa đơn, chứng từ', p:'sd', l:'kb', md:'cham', ngay:1},
      {k:'saiTien', n:'2b. Sử dụng sai mục đích — số tiền', p:'sd', l:'kb', md:'cham'}, {k:'saiViec', n:'2b. Sai mục đích — vào việc', p:'sd', l:'kb', md:'cham'},
      {k:'hieuQua', n:'2c. Hiệu quả đầu tư', p:'sd', l:'kb', md:'cham'}, {k:'traNo', n:'2d. Khả năng trả nợ', p:'sd', l:'kb', md:'cham'},
      {k:'ykCB', n:'3. Ý kiến của cán bộ kiểm tra', p:'yk', l:'kb', md:'cham'}, {k:'ykKH', n:'4. Ý kiến của khách hàng', p:'yk', l:'kb', md:'cham'},
      {k:'kyKH', n:'Ký — khách hàng vay vốn (họ tên)', p:'kyt', l:'tu', md:'cham', ng:'người vay — M31'}, {k:'kyCB', n:'Ký — cán bộ kiểm tra (họ tên)', p:'kyt', l:'kb', md:'cham'}],
    V:function(t){
      var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = V.ku ? mon.find(function(x){ return x.ku===V.ku; }) || null : mon[0] || null;   /* món đã chọn mà kỳ đang mở không còn dư nợ → để chấm, không lấy nhầm món khác */
      var k = c && t ? hsoTVTo(t).find(function(x){ return x.kh===c.kh || x.kh===V.kh; }) : null, ns = KHO.coKy() ? (KHO.ky().ngay || '') : '';
      var md = m && typeof ktCoNganh==='function' && ktCoNganh(m) ? ktNganh(m) : '';
      var dc = c && typeof hsoDiaChi==='function' ? hsoDiaChi(c, t) : '';   /* 3.461 (anh 03/11 "chỗ tại … ghi địa chỉ ấp xã, tỉnh") */
      return {donVi:'', ngay:V.ngay || '', noi:V.noi || dc, kyKH:c && c.ten ? tenHoaDau(c.ten) : '', ten:c && c.ten, maKH:c ? (c.kh || V.kh) : '', tt:T.tt, hoi:T.hoi || '',
        ngaySL:ns, ct:m ? hsoCTMon(m) : '', ku:m && m.ku, gn:m && m.gn ? tdnTien(m.gn) : '', goc:m ? tdnTien(m.dn||0) : '', lai:m ? tdnTien(laiTon(m)) : '',
        t105:k && k.t105 ? tdnTien(k.t105) : (k ? '0' : ''), md:md};
    },
    lap:function(t){
      /* 3.461 (anh 03/11): có chữ → in liền như gõ tay (QUY_CHUAN 9.7–9.8), trống → giữ chấm gốc; "Ông (bà): Tên"; ngày dd/mm/yyyy liền; "đồng" liền sau số; 1 khoảng trắng sau ":";
         Hội không lặp chữ "Hội"; tại = địa chỉ khách; mọi dòng có ô khai báo riêng (✍ / 🤖 / ⌨) */
      var V = this.V(t), G = omG(MK, V, 13.5), e = coChuHTML;
      var o = function(k, ch){ return G.gt(k) ? G.o(k, ch, {lien:1}) : G.o(k, ch); };
      var co = function(k){ return !!G.gt(k); };
      var ong = function(k, ch){ return co(k) ? 'Ông (bà): '+o(k, '') : 'Ông (bà) '+G.o(k, ch); };
      var ngay = function(k, ds){ var g = hsoNg(G.gt(k)); return g ? G.o(k, '', {gt:g.d+'/'+g.m+'/'+g.y, lien:1}) : G.ngay(k, ds).join('/'); };
      /* ô giữa dòng kiểu cột (sau còn nhãn in sẵn: "…; chênh lệch", "… Chức vụ", "… vào việc") → giữ bề rộng chuỗi chấm (QUY_CHUAN 9.7) */
      var tienC = function(k, ch, sau){ return G.o(k, ch)+(co(k) ? ' ' : '')+'đồng'+(sau || ''); };
      var ongC = function(k, ch){ return 'Ông (bà)'+(co(k) ? ': ' : ' ')+G.o(k, ch); };
      var tien = function(k, ch, sau){ return co(k) ? o(k, '')+' đồng'+(sau || '') : G.o(k, ch)+(sau==null ? 'đồng.' : 'đồng'+sau); };
      /* ô nhiều dòng: trống → đúng n dòng chấm (dòng đầu sau nhãn); có chữ → chữ phủ lên n dòng chấm ẩn (giữ form, không chen dòng — như G.khoi) */
      var khoi = function(k, n, dau){ var v = G.gt(k), dong = (dau ? P(dau+G.o(k, '…...……………………………………………'), T) : P(G.o(k, CH), 'white-space:nowrap;overflow:hidden'))+Ch(n-1);
        if(!v) return dong;
        return '<div style="position:relative">'+dong.replace(/(<p style="[^"]*")>/g, '$1><span style="visibility:hidden">').replace(/<\/p>/g, '</span></p>')+
          '<div class="om om-'+(omCach(MK, k)==='mau' ? 'mau' : 'kb')+'" data-o="'+k+'" style="position:absolute;left:0;right:0;top:3pt;bottom:0;overflow:hidden;line-height:21pt;text-align:justify;text-indent:'+(dau ? '10mm' : '0')+'">'+(dau ? dau : '')+e(v)+'</div></div>'; };
      var hoi = G.gt('hoi');
      var h = '<p style="margin:0;text-align:right;font-size:10pt;line-height:1.2"><b><i>Mẫu số: 06A/TD</i></b></p>'+
        '<p style="margin:0;text-align:right;font-size:9.5pt;line-height:1.2"><i>- 01 liên lưu NH nơi cho vay;</i></p><p style="margin:0;text-align:right;font-size:9.5pt;line-height:1.2"><i>- 01 liên phô tô lưu đ.vị k.tra.</i></p>'+
        hsoBang('khung0', [64.8, 101.4], '<tr><td class="c" style="vertical-align:top"><p class="c b" style="font-size:13pt">ĐƠN VỊ KIỂM TRA</p><p class="c">'+o('donVi', '........................................')+'</p></td>'+
          '<td class="c" style="vertical-align:top">'+hsoQH('-', 13)+'</td></tr>')+
        P('<b>PHIẾU KIỂM TRA SỬ DỤNG VỐN VAY</b> <sup style="font-size:8pt">(1)</sup>', 'text-align:center;font-size:14pt;margin-top:12pt')+
        P('Hôm nay, ngày '+ngay('ngay', ['….', '…', '….'])+', tại '+o('noi', '…………….……………………')+', chúng tôi gồm:', T+J+'margin-top:9pt')+
        P('<b>THÀNH PHẦN ĐOÀN KIỂM TRA</b>', T)+
        P('- '+ongC('doan1Ten', '………….…………………')+' Chức vụ'+(co('doan1Cv') ? ': ' : ' ')+G.o('doan1Cv', '…….……..….……..………'), T)+
        P('- '+ongC('doan2Ten', '………….…………………')+' Chức vụ'+(co('doan2Cv') ? ': ' : ' ')+G.o('doan2Cv', '…….……..….……..………'), T)+
        P('<b>KHÁCH HÀNG VAY VỐN</b>', T)+
        P(ong('ten', '……………………..……….…..…')+(co('ten') ? '&nbsp;&nbsp;&nbsp; ' : ' ')+'Mã khách hàng: '+o('maKH', '…..………......'), T)+
        P('Là thành viên Tổ TK&amp;VV do '+ong('tt', '…………………………………')+' làm Tổ trưởng, thuộc tổ chức '+(hoi && /^Hội\b/i.test(hoi) ? o('hoi', '') : 'Hội '+o('hoi', '………………….. ………….…....'))+' quản lý.', T+J)+
        P('Cùng thống nhất nội dung kiểm tra như sau:', T)+
        P('<b>1. Đối chiếu số tiền vay, tiền gửi tổ viên đến ngày</b> '+ngay('ngaySL', ['……', '…..', '…….'])+':', T)+
        P('a) Theo hồ sơ cho vay', T)+
        P('- Chương trình: '+o('ct', '……………….……….….')+(co('ct') ? ';&nbsp;&nbsp; ' : ' ')+'Mã món vay: '+o('ku', '…….………………'), T)+
        P('- Số tiền giải ngân: '+tien('gn', '………………….……....……….….………….…….', '.'), T)+
        P('- Số dư nợ gốc: '+tien('goc', '……..….....................….…....………………...……..….', '.'), T)+
        P('- Số tiền nợ lãi: '+tien('lai', '……………….', '.'), T)+
        P('- Số dư tiền gửi tổ viên: '+tien('t105', '……………..…...………………….………….', '.'), T)+
        P('b) Thực tế tại khách hàng', T)+
        P('- Tổng số tiền thực nhận: '+tienC('ttTn', '…………..……', ';')+' chênh lệch: '+tien('ttTnCL', '……....……..', '.'), T)+
        P('- Số dư nợ gốc: '+tienC('ttGoc', '………..………….…….', ';')+' chênh lệch: '+tien('ttGocCL', '……....………', '.'), T)+
        P('- Số tiền nợ lãi: '+tienC('ttLai', '………………….…...…', ';')+' chênh lệch: '+tien('ttLaiCL', '………....…....', ''), T)+
        P('- Số dư tiền gửi tổ viên: '+tienC('ttT105', '…………..….…', ';')+' chênh lệch: '+tien('ttT105CL', '…...………...', '.'), T)+
        P('<b>2. Tình hình thực hiện phương án/dự án:</b>', T)+
        P('a) Mục đích vay vốn: '+(co('md') ? o('md', '')+'.' : G.o('md', '…...……..…………..………………..……………..……')), T)+Ch(3)+
        P('b) Thực tế sử dụng vốn vay:', T)+
        P('- Sử dụng đúng mục đích số tiền '+tienC('dungTien', '…...……………..…………', ',')+' vào việc:', T)+khoi('dungViec', 4)+
        P('Số hóa đơn, chứng từ (nếu có): '+G.o('hoaDon', '………....…………..…')+' (ngày '+ngay('hoaDonNgay', ['……', '……', '…..'])+')', T)+P('…………………………………………………………………………………………', 'white-space:nowrap;overflow:hidden')+
        P('- Sử dụng sai mục đích số tiền '+tienC('saiTien', '…...……………..…………', ',')+' vào việc:', T)+khoi('saiViec', 4)+
        khoi('hieuQua', 2, 'c) Hiệu quả đầu tư <sup style="font-size:8pt">(2)</sup>: ')+
        khoi('traNo', 2, 'd) Khả năng trả nợ: ')+
        P('<b>3. Ý kiến của cán bộ kiểm tra</b>', T)+khoi('ykCB', 4)+
        P('<b>4. Ý kiến của khách hàng</b>', T)+khoi('ykKH', 3)+
        '<div style="height:4mm"></div>'+hsoBang('khung0', [87.4, 75.1], '<tr><td class="c"><p class="c b">KHÁCH HÀNG VAY VỐN</p><p class="c i">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">CÁN BỘ KIỂM TRA</p><p class="c i">(Ký, ghi rõ họ tên)</p></td></tr>')+
        '<div style="height:18mm"></div>'+hsoBang('khung0', [87.4, 75.1], '<tr><td class="c">'+(co('kyKH') ? o('kyKH', '') : '')+'</td><td class="c">'+(co('kyCB') ? o('kyCB', '') : '')+'</td></tr>')+
        '<div style="height:2mm"></div><div style="border-top:1px solid #000;width:60mm"></div>'+
        '<p style="margin:0;font-size:10pt;line-height:1.25;text-align:justify"><i><sup>(1)</sup> Cán bộ kiểm tra lựa chọn lập Phiếu kiểm tra sử dụng vốn vay theo mẫu 06/TD hoặc mẫu 06A/TD để đảm bảo phản ánh đầy đủ thực tế sử dụng vốn vay, hóa đơn chứng từ (nếu có).</i></p>'+
        '<p style="margin:0;font-size:10pt;line-height:1.25;text-align:justify"><i><sup>(2)</sup> Số lao động được tạo việc làm, duy trì và mở rộng việc làm; số công trình nước sạch, công trình vệ sinh môi trường; số học sinh sinh viên đi học; số ngôi nhà ở được xây dựng mới, cải tạo, sửa chữa;....</i></p>';
      return {ma:'06A/TD', h:'<div class="om-goc" style="font-size:13.5pt;line-height:1.15">'+h+'</div>'};
    }});
  /* 3.461 (anh 03/11 "cho chọn được 1 lần nhiều hộ của tổ"): tích nhiều món ở bảng HSN → mỗi món 1 phiếu, in liền; chưa tích → người vay / món đang xem như cũ */
  hsoLap06a = function(t){ var d = t && typeof HSN!=='undefined' ? HSN.dsChon(MK, t) : [], mon = [];
    d.forEach(function(ho){ ho.mon.forEach(function(x){ mon.push({kh:ho.k.kh, ku:x.m.ku, ten:ho.k.ten}); }); });
    if(mon.length<2){ if(mon.length===1){ HSO.vay.kh = mon[0].kh; HSO.vay.ku = mon[0].ku; } return omLap(MK, t); }
    var cu = {kh:HSO.vay.kh, ku:HSO.vay.ku}, ds = [];
    try { mon.forEach(function(x){ HSO.vay.kh = x.kh; HSO.vay.ku = x.ku; ds.push({M:hsoMauK(MK), h:omLap(MK, t).h, ten:x.ten}); }); } finally { HSO.vay.kh = cu.kh; HSO.vay.ku = cu.ku; }
    return {ma:'06A/TD', h:ds[0].h, ds:ds}; };
  /* 3.431 (anh 01/11): lãi tồn (và mọi số trên phiếu) tính đến ngày báo cáo / số liệu gần nhất có được — MẶC ĐỊNH CUỐI THÁNG TRƯỚC:
     Mẫu 31 chốt tháng trước; chưa có → số liệu gần nhất trước cuối tháng trước; món chỉ có từ kỳ sau (giải ngân trong tháng này) → kỳ có món (kyCo).
     Chỉ đặt khi VÀO 06A (bấm chip / mở từ chỗ khác); sau đó anh đổi ô kỳ đầu trang tự do. */
  function ngayCua(ky){ ky = String(ky||''); return ky.length===7 ? tdnCuoiKy(ky) : ky; }
  hso06aKyMD = function(kyCo){
    var ds = typeof toDsKy==='function' ? toDsKy() : []; if(!ds.length) return '';
    var tr = kyLui(slThang(ngayISO(nay())), -1), cuoi = tdnCuoiKy(tr), chon = '';
    ds.forEach(function(x){ var n = ngayCua(x.ky); if(n<=cuoi && (!chon || n>ngayCua(chon) || n===ngayCua(chon) && x.ky.length===7)) chon = x.ky; });
    if(!chon) chon = ds[ds.length-1].ky;
    if(kyCo && ngayCua(kyCo)>ngayCua(chon) && ds.some(function(x){ return x.ky===kyCo; })) chon = kyCo;
    return chon; };
  function datKy(kyCo){ var v = hso06aKyMD(kyCo); if(!v || v===kyChungLay()) return 0; kyChungDoi(v); bao('📅 06A: số liệu đến '+slKyChu(v)+' (mặc định cuối tháng trước) — đổi ở ô kỳ đầu trang nếu cần.', 4); return 1; }   /* kyChungDoi tự vẽ lại tab */
  /* gọi từ chỗ khác (KTGS Mẫu 06 · sau này danh sách 3 tháng KHĐ): mở tab Hồ sơ vay, mẫu 06A, chọn sẵn người vay + món — tổ theo phạm vi đang chọn */
  hso06aMo = function(maTo, kh, ku, kyCo){ var S = hsoCH(), t = maTo ? KHO.to(maTo) : null; if(t && S.to!==maTo){ S.xa = t.xa || ''; S.diem = t.khoaDiem || ''; S.hoi = String(t.dv||''); S.ap = ''; S.to = maTo; }   /* phạm vi chung đặt đúng tổ (như pvChonTo) */
    S.hsv = MK; HSO_DEN = {kh:kh, ku:ku || ''}; if(typeof HSN!=='undefined') HSN.datMot(MK, ku); luu(); datKy(kyCo); dhSL('hsv'); };   /* 3.461: tích sẵn đúng món */
  if(typeof hsoChonMau==='function'){ var cu = hsoChonMau; hsoChonMau = function(k){ if(k===MK && hsoTab()==='hsv' && hsoCH().hsv!==MK){ hsoCH().hsv = MK; luu(); if(datKy()) return; } return cu.apply(this, arguments); }; }
  var M = hsoMauK(MK); if(M) M.mg = omMg([20, 20, 18, 27.5]);   /* lề theo file gốc */
})();
