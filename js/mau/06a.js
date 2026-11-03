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
  /* 3.460 (anh 03/11 "làm mẫu 06A theo chuẩn 10A; mọi chỗ đều có khai báo được"): chữ điền liền như gõ tay (in thường), để chấm giữ form gốc;
     tên hoa đầu từ, "Ông (bà): tên" ⇥ cột tab; Hội bỏ xã; số tiền gõ tay tự thêm dấu ngăn nhóm số; mọi chỗ chấm là 1 ô (✍ chấm / ✏ gõ khi làm / ⌨ tự gõ app nhớ). */
  var TW = 162.5, IND = 10, TAB = 100;
  function rong(h){ return omRong(String(h).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'), 13.5); }
  function tien(v){ v = String(v || '').trim(); return /^[\d.,\s]+$/.test(v) && hsoSo(v) ? tdnTien(hsoSo(v)) : v; }
  function o2(k, n, p, l, op){ return Object.assign({k:k, n:n, p:p, l:l || 'go', md:'cham'}, op || {}); }
  omDangKy({k:MK, ma:'06A/TD', phan:['nhs', 'ky', 'doan', 'kh', 'tt', 'sd'], co:13.5,
    phanTen:{nhs:'Đơn vị kiểm tra', ky:'Ngày, nơi kiểm tra', doan:'Thành phần đoàn kiểm tra', kh:'Khách hàng · 1a) theo hồ sơ cho vay', tt:'1b) Thực tế tại khách hàng', sd:'2. Sử dụng vốn · 3–4. Ý kiến'},
    o:[{k:'donVi', n:'Đơn vị kiểm tra', p:'nhs', l:'kb', md:'cham'},
      {k:'ngay', n:'Ngày kiểm tra', p:'ky', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noi', n:'Tại (nơi kiểm tra)', p:'ky', l:'go', md:'cham', nhanh:1},
      o2('d1Ten', 'Đoàn kiểm tra 1: Ông (bà)', 'doan', 'gokb', {nhanh:1}), o2('d1Cv', 'Đoàn kiểm tra 1: Chức vụ', 'doan', 'gokb', {nhanh:1}),
      o2('d2Ten', 'Đoàn kiểm tra 2: Ông (bà)', 'doan', 'gokb', {nhanh:1}), o2('d2Cv', 'Đoàn kiểm tra 2: Chức vụ', 'doan', 'gokb', {nhanh:1}),
      {k:'ten', n:'Họ tên khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay đang chọn — M31'},
      {k:'maKH', n:'Mã khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay đang chọn — M31'},
      {k:'tt', n:'Tổ trưởng', p:'kh', l:'tu', md:'tu', ng:'tổ — File Tổ trưởng / M31 (QT-C-18)'},
      {k:'hoi', n:'Tổ chức Hội quản lý (không ghi xã / phường)', p:'kh', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'ngaySL', n:'Đối chiếu đến ngày (ngày số liệu)', p:'kh', l:'tu', md:'tu', ng:'ngày số liệu Mẫu 31 đang mở (mặc định cuối tháng trước)'},
      {k:'ct', n:'Chương trình', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'ku', n:'Mã món vay (số khế ước)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'gn', n:'Số tiền giải ngân', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31 (Tổng giải ngân)'},
      {k:'goc', n:'Số dư nợ gốc', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'lai', n:'Số tiền nợ lãi (lãi tồn tất cả)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31 (Lãi tồn TH + QH)'},
      {k:'t105', n:'Số dư tiền gửi tổ viên (TK 105)', p:'kh', l:'tu', md:'tu', ng:'người vay đang chọn — M31 / Sao kê TK 105'},
      o2('ttNhan', '1b) Tổng số tiền thực nhận', 'tt'), o2('ttNhanCl', '1b) … chênh lệch (tiền thực nhận)', 'tt'),
      o2('ttGoc', '1b) Số dư nợ gốc (thực tế)', 'tt'), o2('ttGocCl', '1b) … chênh lệch (dư nợ gốc)', 'tt'),
      o2('ttLai', '1b) Số tiền nợ lãi (thực tế)', 'tt'), o2('ttLaiCl', '1b) … chênh lệch (nợ lãi)', 'tt'),
      o2('ttGui', '1b) Số dư tiền gửi tổ viên (thực tế)', 'tt'), o2('ttGuiCl', '1b) … chênh lệch (tiền gửi)', 'tt'),
      {k:'md', n:'2a) Mục đích vay vốn', p:'sd', l:'tu', md:'tu', ng:'món đang chọn — M31 (ngành nghề)'},
      o2('dungTien', '2b) Sử dụng đúng mục đích — số tiền', 'sd'), o2('dungViec', '2b) … đúng mục đích vào việc (4 dòng)', 'sd', 'gokb'),
      o2('hd', '2b) Số hóa đơn, chứng từ', 'sd'), o2('hdNgay', '2b) … ngày hóa đơn', 'sd', 'go', {ngay:1}), o2('hdThem', '2b) … dòng hóa đơn tiếp', 'sd'),
      o2('saiTien', '2b) Sử dụng sai mục đích — số tiền', 'sd'), o2('saiViec', '2b) … sai mục đích vào việc (4 dòng)', 'sd', 'gokb'),
      o2('hq', '2c) Hiệu quả đầu tư', 'sd', 'gokb'), o2('kn', '2d) Khả năng trả nợ', 'sd', 'gokb'),
      o2('ykCB', '3. Ý kiến của cán bộ kiểm tra (4 dòng)', 'sd', 'gokb'), o2('ykKH', '4. Ý kiến của khách hàng (3 dòng)', 'sd', 'gokb')],
    V:function(t){
      var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = V.ku ? mon.find(function(x){ return x.ku===V.ku; }) || null : mon[0] || null;   /* món đã chọn mà kỳ đang mở không còn dư nợ → để chấm, không lấy nhầm món khác */
      var k = c && t ? hsoTVTo(t).find(function(x){ return x.kh===c.kh || x.kh===V.kh; }) : null, ns = KHO.coKy() ? (KHO.ky().ngay || '') : '';
      var md = m && typeof ktCoNganh==='function' && ktCoNganh(m) ? ktNganh(m) : '', L = hsoLuu(), r;
      if(!L.nhanh06a3460){ var nh = omNhanh(MK); ['d1Ten', 'd1Cv', 'd2Ten', 'd2Cv'].forEach(function(z){ if(nh.indexOf(z)<0) nh.push(z); }); L.nhanh06a3460 = 1; }   /* 3.460: đoàn kiểm tra ra Chọn nhanh */
      var h = T.hoi || '';
      r = {donVi:'', ngay:V.ngay || '', noi:V.noi || '', ten:c && c.ten ? tenHoaDau(c.ten) : '', maKH:c ? (c.kh || V.kh) : '', tt:T.tt ? tenHoaDau(T.tt) : '', hoi:h ? HST.hoi(/^Hội\s/i.test(h) ? hsoBoHoi(h) : h) : '',
        ngaySL:ns, ct:m ? hsoCTMon(m) : '', ku:m && m.ku, gn:m && m.gn ? tdnTien(m.gn) : '', goc:m ? tdnTien(m.dn||0) : '', lai:m ? tdnTien(laiTon(m)) : '',
        t105:k && k.t105 ? tdnTien(k.t105) : (k ? '0' : ''), md:md};
      this.o.forEach(function(x){ if(x.l==='go' || x.l==='gokb'){ if(r[x.k]===undefined) r[x.k] = V[x.k] || ''; } });   /* ô ✏ gõ khi làm */
      return r;
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 13.5), ng = G.ngay('ngay', ['….', '…', '….']);
      var o = function(k, ch, op){ var r = G.o(k, ch, Object.assign({lien:1}, op || {})); return /om-cham/.test(r) ? r : r.replace('<span ', '<span style="font-weight:normal" '); };   /* chữ liền, in thường; trống → chấm */
      var gt = function(k){ return G.gt(k); }, ot = function(k, ch){ var v = gt(k); return v ? o(k, ch, {gt:tien(v)}) : o(k, ch, {gt:''}); };   /* ô số tiền */
      var nLien = function(k, ds){ var x = hsoNg(gt(k)); return x ? o(k, '', {gt:x.d+'/'+x.m+'/'+x.y}) : G.ngay(k, ds).join('/'); };
      /* tab: "trước ⇥ sau" (họ tên ⇥ chức vụ / mã khách hàng) */
      var tabVi = function(truoc, sau){ var w1 = IND+rong(truoc), w2 = rong(sau); if(Math.max(w1+4, TAB)+w2<=TW-1) return Math.max(w1+4, TAB); return w1+4+w2<=TW-1 ? Math.ceil(w1+4) : TAB; };
      var tabP = function(truoc, sau, st){ var v = tabVi(truoc, sau), dai = Math.max(v, IND+rong(truoc)+4)+rong(sau) > TW-1;
        return P('<span style="display:inline-block;text-indent:0;min-width:'+(v-IND).toFixed(1)+'mm">'+truoc+'</span><span class="tab" style="display:inline-block;width:3mm"></span>'+sau, T+(st||'')+(dai ? 'text-align:left;' : '')).replace('<p ', '<p data-tab="'+Math.round(v)+'" '); };
      /* đoạn nhiều dòng: chấm → nhãn + chấm + n dòng chấm (form gốc); có chữ → chữ liền sau nhãn, dòng còn dư giữ chấm */
      var khoi = function(k, nhan, n, chNhan){ var v = gt(k);
        if(!v) return (nhan ? P(nhan+o(k, chNhan || CH.slice(0, 50), {gt:''}), T+'white-space:nowrap;overflow:hidden') : '')+chK(k, n);
        var dung = Math.max(1, Math.ceil(((nhan ? IND : 0)+rong((nhan || '')+' '+v)+3)/TW)), con = Math.max(0, n+(nhan ? 1 : 0)-dung);
        return P((nhan ? nhan+' ' : '')+o(k, '', {gt:v}), (nhan ? T : '')+J)+chK(k, con); };
      var chK = function(k, n){ var h = ''; for(var i=0;i<n;i++) h += P(CH, 'white-space:nowrap;overflow:hidden').replace('<p ', '<p data-o="'+k+'" '); return h; };   /* dòng chấm thuộc ô k (bấm được ở trực quan) */
      var doan = function(i){ var kt = 'd'+i+'Ten', kc = 'd'+i+'Cv', a = gt(kt) ? tenHoaDau(gt(kt)) : '', b = gt(kc);   /* tên hoa đầu từ */
        if(a) return tabP('- Ông (bà): '+o(kt, '', {gt:a}), 'Chức vụ: '+(b ? o(kc, '', {gt:b}) : o(kc, '…….……..….……..………', {gt:''})));
        return P('- Ông (bà) '+o(kt, '………….…………………', {gt:''})+' Chức vụ '+(b ? o(kc, '', {gt:b}) : o(kc, '…….……..….……..………', {gt:''})), T); };
      var dong2 = function(nhan, k1, ch1, k2, ch2, cuoi){ return P(nhan+(gt(k1) ? ' '+ot(k1, ch1)+' ' : ot(k1, ch1))+'đồng; chênh lệch:'+(gt(k2) ? ' '+ot(k2, ch2)+' ' : ot(k2, ch2))+'đồng'+(cuoi || '.'), T); };
      var hoiTx = gt('hoi') ? ', thuộc tổ chức '+o('hoi', '', {gt:gt('hoi')})+' quản lý.' : ', thuộc tổ chức Hội'+o('hoi', '………………….. ………….…....', {gt:''})+' quản lý.';
      var h = '<p style="margin:0;text-align:right;font-size:10pt;line-height:1.2"><b><i>Mẫu số: 06A/TD</i></b></p>'+
        '<p style="margin:0;text-align:right;font-size:9.5pt;line-height:1.2"><i>- 01 liên lưu NH nơi cho vay;</i></p><p style="margin:0;text-align:right;font-size:9.5pt;line-height:1.2"><i>- 01 liên phô tô lưu đ.vị k.tra.</i></p>'+
        hsoBang('khung0', [64.8, 101.4], '<tr><td class="c" style="vertical-align:top"><p class="c b" style="font-size:13pt">ĐƠN VỊ KIỂM TRA</p><p class="c">'+o('donVi', '........................................')+'</p></td>'+
          '<td class="c" style="vertical-align:top">'+hsoQH('-', 13)+'</td></tr>')+
        P('<b>PHIẾU KIỂM TRA SỬ DỤNG VỐN VAY</b> <sup style="font-size:8pt">(1)</sup>', 'text-align:center;font-size:14pt;margin-top:12pt')+
        P('Hôm nay, ngày '+(hsoNg(gt('ngay')) ? nLien('ngay') : ng.join('/'))+', tại '+(gt('noi') ? o('noi', '') : o('noi', '…………….……………………'))+', chúng tôi gồm:', T+J+'margin-top:9pt')+
        P('<b>THÀNH PHẦN ĐOÀN KIỂM TRA</b>', T)+doan(1)+doan(2)+
        P('<b>KHÁCH HÀNG VAY VỐN</b>', T)+
        (gt('ten') ? tabP('Ông (bà): '+o('ten', ''), 'Mã khách hàng: '+(gt('maKH') ? o('maKH', '') : o('maKH', '…..………......'))) : P('Ông (bà) '+o('ten', '……………………..……….…..…')+' Mã khách hàng: '+o('maKH', '…..………......'), T))+
        P('Là thành viên Tổ TK&amp;VV do Ông (bà)'+(gt('tt') ? ' '+o('tt', '')+' ' : o('tt', '…………………………………'))+'làm Tổ trưởng'+hoiTx, T+J)+
        P('Cùng thống nhất nội dung kiểm tra như sau:', T)+
        P('<b>1. Đối chiếu số tiền vay, tiền gửi tổ viên đến ngày</b> '+nLien('ngaySL', ['……', '…..', '…….'])+':', T)+
        P('a) Theo hồ sơ cho vay', T)+
        P('- Chương trình: '+o('ct', '……………….……….….')+' Mã món vay: '+o('ku', '…….………………'), T)+
        P('- Số tiền giải ngân:'+(gt('gn') ? ' '+o('gn', '')+' ' : o('gn', '………………….……....……….….………….…….'))+'đồng.', T)+
        P('- Số dư nợ gốc:'+(gt('goc') ? ' '+o('goc', '') : o('goc', '……..….....................….…....………………...……..….'))+' đồng.', T)+
        P('- Số tiền nợ lãi: '+o('lai', '……………….')+' đồng.', T)+
        P('- Số dư tiền gửi tổ viên: '+o('t105', '……………..…...………………….………….')+' đồng.', T)+
        P('b) Thực tế tại khách hàng', T)+
        dong2('- Tổng số tiền thực nhận:', 'ttNhan', ' …………..…… ', 'ttNhanCl', '……....……..')+
        dong2('- Số dư nợ gốc:', 'ttGoc', '………..………….…….', 'ttGocCl', '……....………')+
        dong2('- Số tiền nợ lãi:', 'ttLai', '………………….…...…', 'ttLaiCl', '………....…....', '')+
        dong2('- Số dư tiền gửi tổ viên:', 'ttGui', '…………..….… ', 'ttGuiCl', ' …...………...')+
        P('<b>2. Tình hình thực hiện phương án/dự án:</b>', T)+
        khoi('md', 'a) Mục đích vay vốn:', 3, '…...……..…………..………………..……………..……')+
        P('b) Thực tế sử dụng vốn vay:', T)+
        P('- Sử dụng đúng mục đích số tiền '+(gt('dungTien') ? ot('dungTien', '')+' ' : ot('dungTien', '…...……………..………… '))+'đồng, vào việc:', T)+khoi('dungViec', '', 4)+
        P('Số hóa đơn, chứng từ (nếu có): '+(gt('hd') ? o('hd', '')+' ' : o('hd', '………....…………..…'))+'(ngày '+nLien('hdNgay', ['……', '……', '…..'])+')', T)+(gt('hdThem') ? P(o('hdThem', ''), J) : P(o('hdThem', '…………………………………………………………………………………………', {gt:''}), 'white-space:nowrap;overflow:hidden'))+
        P('- Sử dụng sai mục đích số tiền '+(gt('saiTien') ? ot('saiTien', '')+' ' : ot('saiTien', '…...……………..………… '))+'đồng, vào việc:', T)+khoi('saiViec', '', 4)+
        khoi('hq', 'c) Hiệu quả đầu tư <sup style="font-size:8pt">(2)</sup>:', 1, ' ...……………………..……………..…..………………..')+
        khoi('kn', 'd) Khả năng trả nợ:', 1, ' ……….………….….………….………….………………')+
        P('<b>3. Ý kiến của cán bộ kiểm tra</b>', T)+khoi('ykCB', '', 4)+
        P('<b>4. Ý kiến của khách hàng</b>', T)+khoi('ykKH', '', 3)+
        '<div style="height:4mm"></div>'+hsoBang('khung0', [87.4, 75.1], '<tr><td class="c"><p class="c b">KHÁCH HÀNG VAY VỐN</p><p class="c i">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">CÁN BỘ KIỂM TRA</p><p class="c i">(Ký, ghi rõ họ tên)</p></td></tr>')+
        '<div style="height:22mm"></div><div style="border-top:1px solid #000;width:60mm"></div>'+
        '<p style="margin:0;font-size:10pt;line-height:1.25;text-align:justify"><i><sup>(1)</sup> Cán bộ kiểm tra lựa chọn lập Phiếu kiểm tra sử dụng vốn vay theo mẫu 06/TD hoặc mẫu 06A/TD để đảm bảo phản ánh đầy đủ thực tế sử dụng vốn vay, hóa đơn chứng từ (nếu có).</i></p>'+
        '<p style="margin:0;font-size:10pt;line-height:1.25;text-align:justify"><i><sup>(2)</sup> Số lao động được tạo việc làm, duy trì và mở rộng việc làm; số công trình nước sạch, công trình vệ sinh môi trường; số học sinh sinh viên đi học; số ngôi nhà ở được xây dựng mới, cải tạo, sửa chữa;....</i></p>';
      return {ma:'06A/TD', h:'<div class="om-goc" style="font-size:13.5pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap06a = function(t){ return omLap(MK, t); };
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
    S.hsv = MK; HSO_DEN = {kh:kh, ku:ku || ''}; luu(); datKy(kyCo); dhSL('hsv'); };
  /* 3.461 (anh 03/11 "mẫu tạo chính ở bộ mẫu, các nơi khác cần sẽ gọi, ví dụ tạo phiếu ktra 3 tháng KHĐ của tổ nào đó"):
     LẬP NHIỀU PHIẾU 1 LẦN — ds = [{maTo, kh, ku, ten}] → mỗi món 1 phiếu (mỗi phiếu sang trang mới), 1 file In / Word. Số liệu: kỳ mặc định 06A (cuối tháng trước). */
  hso06aLo = function(ds){ var M = hsoMauK(MK), giu = {kh:HSO.vay.kh, ku:HSO.vay.ku}, out = [];
    try { (ds || []).forEach(function(x){ var t = KHO.to(x.maTo); if(!t) return; HSO.vay.kh = x.kh; HSO.vay.ku = x.ku || ''; out.push({M:M, h:omLap(MK, t).h}); }); }
    finally { HSO.vay.kh = giu.kh; HSO.vay.ku = giu.ku; }
    var ten = 'Mau 06A_'+out.length+' phieu'; return {ds:out, ten:ten, trang:out.length ? hsoTrang(out, null, ten) : ''}; };
  hso06aXuat = function(ds, cach){ datKy(); var x = hso06aLo(ds); if(!x.ds.length) return bao('Không có món nào để lập 06A.', 4);
    if(cach==='word') return hsoDocx({ds:x.ds}).then(function(bl){ giaoFile(bl, x.ten+'.docx'); bao('Đã tạo '+x.ten+'.docx ('+x.ds.length+' phiếu).', 5); }).catch(function(er){ baoLoi('Chưa tạo được Word 06A: '+(er && er.message || er)); });
    inBlob(new Blob([x.trang], {type:'text/html'}), x.ten+'.html'); };
  /* hộp chọn món (tích sẵn hết) → 🖨 In / 📄 Word — chỗ nào cần chỉ gọi hso06aHop(ds, tiêu đề) */
  var H06 = {ds:[], bo:{}};
  hso06aHop = function(ds, tieuDe){ H06 = {ds:ds || [], bo:{}};
    if(!hso06aHop.dk && typeof GD!=='undefined'){ hso06aHop.dk = 1; GD.dangKy('h06a', {tich:function(el){ H06.bo[el.getAttribute('data-i')] = !el.checked; hso06aHopVe(); }, het:function(el){ var v = el.getAttribute('data-v')==='1'; H06.ds.forEach(function(x, i){ H06.bo[i] = !v; }); hso06aHopVe(); },
      xuat:function(el){ var c = el.getAttribute('data-c'), ds = H06.ds.filter(function(x, i){ return !H06.bo[i]; }); dongHop(); hso06aXuat(ds, c); }}); }
    moHop('<div class="hop-tit">📄 Mẫu 06A/TD — '+coChuHTML(tieuDe || 'Phiếu kiểm tra sử dụng vốn vay')+'</div><div class="hop-phu">Mỗi món 1 phiếu (sang trang mới), 1 file. Số liệu đến cuối tháng trước (mặc định 06A). Phần kiểm tra thực tế để chấm ghi tay — muốn gõ sẵn, mở từng phiếu ở Hồ sơ vay.</div><div id="h06a-ds"></div>', true);
    hso06aHopVe(); };
  function hso06aHopVe(){ var e = document.getElementById('h06a-ds'); if(!e) return; var n = H06.ds.filter(function(x, i){ return !H06.bo[i]; }).length;
    e.innerHTML = '<div class="hang-nut"><button class="nho" data-lenh="h06a.het" data-v="1">Tích hết</button><button class="nho" data-lenh="h06a.het" data-v="0">Bỏ hết</button><span class="sl-phu">Đã chọn <b>'+n+'</b> / '+H06.ds.length+' món</span></div>'+
      '<div class="to-bang-cuon"><table class="to-bang"><thead><tr><th>In</th><th>#</th><th>Mã KH</th><th>Họ tên</th><th>Số khế ước</th></tr></thead><tbody>'+
      H06.ds.map(function(x, i){ return '<tr><td><input type="checkbox" data-lenh="h06a.tich" data-su="change" data-i="'+i+'"'+(H06.bo[i] ? '' : ' checked')+'></td><td>'+(i+1)+'</td><td>'+coChuHTML(x.kh||'')+'</td><td>'+coChuHTML(tenHoaDau(x.ten||''))+'</td><td>'+coChuHTML(x.ku||'')+'</td></tr>'; }).join('')+'</tbody></table></div>'+
      '<div class="hang-nut"><button class="nho" data-lenh="h06a.xuat" data-c="in"'+(n ? '' : ' disabled')+'>🖨 In '+n+' phiếu</button><button class="nho chinh" data-lenh="h06a.xuat" data-c="word"'+(n ? '' : ' disabled')+'>📄 Word '+n+' phiếu</button><button class="nho" data-lenh="hop.dong">Đóng</button></div>'; }
  if(typeof hsoChonMau==='function'){ var cu = hsoChonMau; hsoChonMau = function(k){ if(k===MK && hsoTab()==='hsv' && hsoCH().hsv!==MK){ hsoCH().hsv = MK; luu(); if(datKy()) return; } return cu.apply(this, arguments); }; }
  var M = hsoMauK(MK); if(M) M.mg = omMg([20, 20, 18, 27.5]);   /* lề theo file gốc */
})();
