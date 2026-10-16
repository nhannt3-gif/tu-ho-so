/* ===== 3.223 M5 — MẪU 09A/TD Giấy đề nghị gia hạn nợ trên nền ô — dựng theo file gốc tests/mau_goc/09a.docx (QĐ 54, 15/9/2023) =====
   Lề 8 / 17,8 / 6,1 / 25,4 mm · Times New Roman 14, dòng cố định 17 pt · chuỗi chấm đúng gốc. Khách = tổ viên đang chọn, món = món đang chọn (như cũ).
   Ô cũ (3.206): lý do (danh sách + gõ), số tiền đề nghị gia hạn (mặc định in = dư nợ món), thời gian, kế hoạch trả nợ, số tiền / kỳ, kỳ cuối, ngày ký — giữ khóa cũ.
   Mới: ý kiến Hội, xác nhận UBND, phê duyệt NH thành ô (mặc định chấm). Bỏ file này → app dùng lại hsoLap09a cũ. */
(function(){
  var MK = '09a';
  function P(noi, s){ return '<p style="margin:0;'+(s||'')+'">'+noi+'</p>'; }
  var D17 = 'line-height:17pt;', J = 'text-align:justify;';
  function E(){ return '<p style="font-size:12pt;line-height:1.15">&nbsp;</p>'; }   /* đoạn trống cỡ mặc định của gốc (12) */
  function uiLyDo(){   /* chọn lý do có sẵn / gõ lý do khác / thêm – bỏ khỏi danh sách (như 3.206) */
    var ds = hsoLyDoDs(); if(HSO.vay.lyDo===undefined) HSO.vay.lyDo = ds[0];
    return '<select onchange="if(this.value){HSO.vay.lyDo=this.value;hsoVe();}"><option value="">— chọn lý do có sẵn —</option>'+ds.map(function(l){ return '<option value="'+coChuHTML(l)+'"'+(l===HSO.vay.lyDo ? ' selected' : '')+'>'+coChuHTML(l)+'</option>'; }).join('')+'</select>'+
      '<span class="hso-cham-ly">'+hsoIn('HSO.vay.lyDo=this.value;hsoHen()', HSO.vay.lyDo, 'gõ lý do khác')+'<button class="nho" onclick="hsoLyDoThem()" title="Thêm lý do đang gõ vào danh sách">＋</button>'+
      (ds.indexOf(HSO.vay.lyDo)>=0 && ds.length>1 ? '<button class="nho" onclick="hsoLyDoBo('+ds.indexOf(HSO.vay.lyDo)+')" title="Bỏ lý do này khỏi danh sách">✕</button>' : '')+'</span>'; }
  omDangKy({k:MK, ma:'09A/TD', phan:['nhs', 'kh', 'hoi', 'ub', 'nh'], co:14,
    o:[{k:'kinhGui', n:'Kính gửi (tên Ngân hàng)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › Kính gửi'},
      {k:'ten', n:'Họ và tên khách hàng', p:'kh', l:'tu', md:'tu', ng:'tổ viên đang chọn — M31'},
      {k:'ns', n:'Năm sinh', p:'kh', l:'tu', md:'tu', ng:'M31'},
      {k:'noiCu', n:'Nơi cư trú', p:'kh', l:'tu', md:'tu', ng:'M31 / tổ'},
      {k:'tt', n:'Tổ trưởng', p:'kh', l:'tu', md:'tu', ng:'tổ — M31 / Danh sách tổ'},
      {k:'hoi', n:'Tổ chức Hội, đoàn thể', p:'kh', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'ku', n:'Mã khoản vay', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'ct', n:'Chương trình cho vay', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'goc', n:'Số tiền gốc (dư nợ)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'lai', n:'Số tiền nợ lãi (lãi tồn)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'hanTra', n:'Ngày phải trả (hạn trả nợ)', p:'kh', l:'tu', md:'tu', ng:'món đang chọn — M31'},
      {k:'lyDo', n:'Lý do chưa trả', p:'kh', l:'go', md:'cham', nhanh:1, ui:uiLyDo},
      {k:'tienGH', n:'Số tiền đề nghị gia hạn (đ)', p:'kh', l:'go', md:'go', nhanh:1, ng:'trống = dư nợ món'},
      {k:'thang', n:'Thời gian đề nghị (tháng)', p:'kh', l:'go', md:'cham', nhanh:1},
      {k:'kyTra', n:'Kế hoạch trả nợ (tháng/kỳ)', p:'kh', l:'go', md:'cham', nhanh:1},
      {k:'tienKy', n:'Số tiền mỗi kỳ (đ)', p:'kh', l:'go', md:'cham', nhanh:1},
      {k:'tienCuoi', n:'Số tiền trả nợ kỳ cuối (đ)', p:'kh', l:'go', md:'cham', nhanh:1},
      {k:'diaDanh', n:'Địa danh ("…, ngày" người vay ký)', p:'kh', l:'tu', md:'tu', ng:'xã của tổ'},
      {k:'ngayKy', n:'Ngày tháng (người vay ký)', p:'kh', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'hoiYK', n:'Ý kiến của tổ chức CT-XH nhận ủy thác', p:'hoi', l:'kb', md:'cham', cmau:'Đề nghị Ngân hàng xem xét cho gia hạn nợ'},
      {k:'hoiNgay', n:'Ngày (ý kiến Hội)', p:'hoi', l:'go', md:'cham', ngay:1},
      {k:'ubYK', n:'Xác nhận của UBND cấp xã', p:'ub', l:'kb', md:'cham', cmau:'Xác nhận hộ gặp khó khăn như trình bày'},
      {k:'ubNgay', n:'Ngày (xác nhận UBND)', p:'ub', l:'go', md:'cham', ngay:1},
      {k:'nhTien', n:'NH: số tiền được gia hạn nợ (= đề nghị)', p:'nh', l:'tu', md:'cham', ng:'số tiền đề nghị gia hạn'},
      {k:'nhTu', n:'NH: gia hạn từ ngày', p:'nh', l:'go', md:'cham', ngay:1},
      {k:'nhDen', n:'NH: gia hạn đến ngày', p:'nh', l:'go', md:'cham', ngay:1},
      {k:'nhNgay', n:'Ngày tháng (Giám đốc ký)', p:'nh', l:'go', md:'cham', ngay:1}],
    V:function(t){
      var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0] || null;
      var tienGH = V.tienGH!==undefined && V.tienGH!=='' ? hsoSo(V.tienGH) : (m ? m.dn : 0);
      return {kinhGui:hsoPGD('kinhGui'), ten:c && c.ten, ns:c && c.ns ? c.ns.slice(0, 4) : '', noiCu:c || t ? hsoDiaChi(c, t) : '', tt:T.tt, hoi:T.hoi, ku:m && m.ku, ct:m ? hsoCTMon(m) : '', goc:m ? tdnTien(m.dn) : '', lai:m && laiTon(m)>0 ? tdnTien(laiTon(m)) : '',
        hanTra:m ? skHL(m) : '', lyDo:V.lyDo===undefined ? hsoLyDoDs()[0] : V.lyDo, tienGH:tienGH ? tdnTien(tienGH) : '', thang:V.thang, kyTra:V.kyTra, tienKy:hsoSo(V.tienKy) ? tdnTien(hsoSo(V.tienKy)) : '', tienCuoi:hsoSo(V.tienCuoi) ? tdnTien(hsoSo(V.tienCuoi)) : '',
        diaDanh:T.xa, ngayKy:V.ngayKy, hoiNgay:V.hoiNgay, ubNgay:V.ubNgay, nhTien:tienGH ? tdnTien(tienGH) : '', nhTu:V.nhTu, nhDen:V.nhDen, nhNgay:V.nhNgay};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, ht = G.ngay('hanTra', ['.....', '.....', '........']), nk = G.ngay('ngayKy', ['…..', '….', ' ..........']);
      var hn = G.ngay('hoiNgay', ['.....', '......', '...........']), un = G.ngay('ubNgay', ['.....', '......', '..........']), tu = G.ngay('nhTu', ['..…', '..…', '……...']), de = G.ngay('nhDen', ['......', '.....', '............']), gd = G.ngay('nhNgay', ['……', '…..', ' ..........']);
      var h = hsoBang('khung0', [134.8, 42.8], '<tr><td class="c">'+hsoQH('–', 13)+'</td><td><p class="c b i s12">Mẫu số: 09A/TD</p><p class="r i s12">Lập 01 liên lưu NH</p></td></tr>')+
        P('<b>GIẤY ĐỀ NGHỊ GIA HẠN NỢ</b>', 'text-align:center;font-size:14pt;margin-top:10.5pt')+
        P('<b>Kính gửi:</b> '+o('kinhGui', '..............................................................'), 'text-align:center;margin:12pt 0 6pt')+
        P('Họ và tên khách hàng:'+o('ten', '......................................................')+' Năm sinh:'+o('ns', '...........................'), D17+'white-space:nowrap')+
        P('Nơi cư trú:'+o('noiCu', '..................................................................................................................'), D17+'white-space:nowrap')+
        P('Là tổ viên Tổ tiết kiệm và vay vốn do ông (bà):'+o('tt', '.....................................................')+' làm Tổ trưởng, thuộc tổ chức Hội, đoàn thể:'+o('hoi', '.…………………………….....')+' quản lý.', J+D17)+
        P('Hiện nay, tôi đang vay vốn Ngân hàng Chính sách xã hội, cụ thể như sau:', J+D17)+
        P('- Mã khoản vay'+o('ku', '.........................................')+'thuộc chương trình cho vay'+o('ct', '........................'), D17+'white-space:nowrap')+
        P('- Số tiền: gốc:'+o('goc', '...........................................')+'đồng; số tiền nợ lãi:'+o('lai', '............................')+'đồng.', D17+'white-space:nowrap')+
        P('Theo thỏa thuận đã ký với Ngân hàng, tôi phải trả số tiền trên vào ngày'+ht.join('/')+' nhưng chưa trả được vì lý do:'+o('lyDo', '.......................................................................................'), J+D17)+
        P('.......................................................................................................................................', D17+'white-space:nowrap')+
        P('Đề nghị Ngân hàng xem xét cho gia hạn khoản nợ gốc'+o('tienGH', '......................................')+'đồng;', J+D17)+
        P('Thời gian đề nghị:'+o('thang', '........', {canh:'c'})+'tháng; kế hoạch trả nợ'+o('kyTra', '..........', {canh:'c'})+'tháng/kỳ với số tiền'+o('tienKy', '......................................')+'đồng/kỳ, số tiền trả nợ kỳ cuối'+o('tienCuoi', '.................................')+'đồng.', J+D17)+
        P('Tôi xin cam kết sử dụng vốn vay đúng mục đích; trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai tôi xin chịu trách nhiệm trước pháp luật.', J+D17)+
        hsoBang('khung0 t11', [85.3, 85.3], '<tr><td class="c" style="vertical-align:top"><p class="c b" style="margin-top:6pt">Tổ TK&amp;VV</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td>'+
          '<td class="c" style="vertical-align:top"><p class="c i" style="white-space:nowrap;margin:0 -4mm">'+o('diaDanh', '........................')+', ngày'+nk[0]+'tháng'+nk[1]+'năm'+nk[2]+'</p><p class="c b">Người vay</p><p class="c i s12">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p></td></tr>')+
        P('&nbsp;', D17)+P('&nbsp;', D17)+E()+E()+
        '<div style="margin-top:4pt"></div>'+hsoBang('khung0', [90.6, 93.2], '<tr><td class="c" style="vertical-align:top"><p class="c b s13">Ý kiến của tổ chức chính trị - xã hội</p><p class="c b s13">nhận ủy thác cấp xã (phường)</p>'+G.khoi('hoiYK', ['............................................................'], {canh:'center'})+
            '<p class="c i">Ngày '+hn[0]+' tháng '+hn[1]+' năm '+hn[2]+'</p><p class="c b">Chủ tịch/Bí thư</p><p class="c i s12">(Ký tên, đóng dấu)</p></td>'+
          '<td class="c" style="vertical-align:top"><p class="c b s13">Xác nhận của UBND cấp xã (phường)</p>'+G.khoi('ubYK', ['.................................................................'], {canh:'center'})+
            '<p class="c i">Ngày '+un[0]+' tháng '+un[1]+' năm '+un[2]+'</p><p class="c b">Chủ tịch</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>')+
        E()+E()+E()+E()+E()+
        P('PHÊ DUYỆT CỦA NGÂN HÀNG CHÍNH SÁCH XÃ HỘI', 'text-align:center;font-size:13pt;margin-top:9pt')+
        P('- Số tiền được gia hạn nợ là '+o('nhTien', '.....................................')+'đồng.')+
        P('- Thời gian gia hạn nợ : Từ ngày '+tu.join('/')+' đến ngày'+de.join('/'))+'<div style="height:1.6mm"></div>'+
        hsoBang('khung0', [50, 65, 70], '<tr><td class="c"><p class="c s13">CÁN BỘ TÍN DỤNG</p><p class="c i s13">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c s12">TRƯỞNG PHÒNG KH-NVTD</p><p class="c s13">(TỔ TRƯỞNG KH-NV)</p><p class="c i s13">(Ký, ghi rõ họ tên)</p></td>'+
          '<td class="c"><p class="c i s13">Ngày'+gd[0]+'tháng'+gd[1]+'năm'+gd[2]+'</p><p class="c b s13">GIÁM ĐỐC</p><p class="c i s13">(Ký tên, đóng dấu)</p></td></tr>');
      return {ma:'09A/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap09a = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([8, 17.8, 6.1, 25.4]);   /* lề theo file gốc */
})();
