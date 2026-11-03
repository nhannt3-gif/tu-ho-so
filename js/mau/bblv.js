/* ===== 3.461 (anh 03/11/2026) — BIÊN BẢN LÀM VIỆC: xác minh, đánh giá khoản nợ của hộ vay (nợ quá hạn, nợ khoanh, lãi tồn cao, 3 tháng KHĐ) — nền ô =====
   Dựng theo mẫu trắng anh gửi (tests/mau_goc/bblv.doc). Anh chốt 03/11:
   - MỖI HỘ 1 BIÊN BẢN; chọn 1 món → mục 1 dạng dòng như mẫu gốc; chọn nhiều món → dạng bảng (CT viết tắt · số KU, mục đích theo món, Cộng), không dòng chú thích.
   - "Tổng số nợ phải trả … đến ngày" → dạng dòng: "Dư nợ đến ngày …: gốc … đồng; lãi … đồng."; dạng bảng: ngày ghi ở tiêu đề mục 1, tổng ở dòng Cộng.
   - 4 dòng thành phần + chỗ ký: để trống (ai có mặt tự ghi tên) — vẫn bật 🤖 được ở ⚙ Khai báo riêng.
   - Mục 2–5 mặc định ✍ chấm ghi tay; câu gợi ý chỉ là tùy chọn (chọn nhiều, ➕ thêm).
   - TRỌN 1 TRANG A4: giãn dòng + thêm dòng chấm khi ngắn; dài thì bớt dòng chấm (tối thiểu 1 / mục) rồi thu giãn dòng; vẫn không vừa → ⚠ báo, không thu chữ.
   - Bản trắng: dạng dòng 1 món (⚙ chọn được bảng 3–6 dòng trống).
   Chọn hộ / món: HSN (js/mau/0hsn.js). Bỏ file → mất mẫu (js/25b có hàm thay báo thiếu). ES5. */
(function(){
  var MK = 'bblv', CO = 13, MG = [15, 15, 15, 25];
  var GOI = {
    ngNhan:['Thiên tai, hạn hán, lũ lụt làm thiệt hại sản xuất', 'Dịch bệnh trên vật nuôi, cây trồng làm thiệt hại vốn đầu tư', 'Giá sản phẩm giảm, tiêu thụ khó khăn, thu nhập không đủ trả nợ',
      'Bản thân / người trong gia đình ốm đau, bệnh nặng phải điều trị dài ngày', 'Lao động chính trong gia đình chết / mất sức lao động', 'Mất việc làm, thu nhập không ổn định',
      'Sử dụng vốn vay không đúng mục đích, không tạo ra thu nhập', 'Làm ăn thua lỗ do thiếu kinh nghiệm, kỹ thuật sản xuất', 'Ý thức trả nợ chưa cao, chưa chủ động trả nợ, lãi',
      'Chi tiêu gia đình chưa hợp lý, ưu tiên khoản khác trước khi trả nợ', 'Người vay đi làm ăn xa, ít về địa phương, không thường xuyên giao dịch với Tổ',
      'Món vay đến hạn nhưng chưa thu hoạch / chưa đến kỳ có thu nhập', 'Hộ còn vay nhiều món, nhiều nguồn, khả năng trả nợ hạn chế'],
    thucTrang:['Kinh tế gia đình khó khăn, thu nhập không ổn định', 'Kinh tế gia đình ổn định, có khả năng trả nợ', 'Có khả năng trả nợ một phần, cần thêm thời gian', 'Không còn khả năng trả nợ'],
    camKet:['Cam kết trả lãi hằng tháng đầy đủ qua Tổ TK&VV tại điểm giao dịch xã', 'Cam kết trả đủ số lãi tồn trong thời gian sớm nhất', 'Cam kết trả nợ gốc quá hạn theo kế hoạch đã thống nhất',
      'Cam kết bổ sung hồ sơ đề nghị gia hạn nợ / điều chỉnh kỳ hạn nợ theo quy định', 'Cam kết sử dụng vốn vay đúng mục đích theo phương án đã đăng ký',
      'Cam kết thường xuyên liên hệ với Tổ trưởng; khi đi làm ăn xa thông báo địa chỉ, số điện thoại liên lạc', 'Cam kết tham gia đầy đủ các buổi sinh hoạt Tổ, chấp hành quy ước hoạt động của Tổ'],
    kienNghi:['Đôn đốc khách hàng trả lãi hằng tháng qua Tổ TK&VV', 'Đôn đốc khách hàng trả nợ gốc quá hạn theo cam kết', 'Lập hồ sơ gia hạn nợ / điều chỉnh kỳ hạn nợ theo quy định',
      'Tổ TK&VV, Hội đoàn thể phối hợp theo dõi, đôn đốc thu hồi nợ', 'Đề nghị UBND cấp xã hỗ trợ đôn đốc thu hồi nợ', 'Lập hồ sơ đề nghị xử lý nợ bị rủi ro theo quy định']};
  var TRANG = ['Dạng dòng (1 món)', 'Bảng 3 dòng', 'Bảng 4 dòng', 'Bảng 5 dòng', 'Bảng 6 dòng'];
  /* 3.461.5 (anh 03/11 "khi chọn bản mẫu anh muốn các gợi ý này hiện ra tương ứng từng mục 2-3-4-5"; "cho chọn tình huống mẫu: KH bỏ địa phương hay còn gọi đi làm ăn xa,
     khách hàng còn địa phương nhưng khó khăn, nhóm KH có điều kiện nhưng chây ỳ") — 📝 Bản mẫu in bộ câu của tình huống chọn; các câu cũng vào gợi ý của bản thật */
  var CA3 = 'Cả 3 tình huống', BBLV_MAU = null;   /* 3.461.6 (anh 03/11 "cho chọn 3 tình huống ngay chỗ này luôn, hiện cả 3 t/h luôn để in ra làm mẫu") */
  var MAU = [
    {ten:'① Bỏ địa phương / đi làm ăn xa',
      ngNhan:'Khách hàng đã đi khỏi địa phương (đi làm ăn xa tại …) từ khoảng tháng …/…, không thường xuyên về địa phương, không liên lạc được; không giao dịch với Tổ TK&VV',
      thucTrang:'Tại địa phương còn ông (bà) … (quan hệ: …) đang sinh sống; tài sản còn lại: …; khả năng trả nợ thay: …',
      camKet:'Người thân cam kết liên lạc, báo khách hàng về làm việc với Tổ TK&VV và Ngân hàng; trả nợ thay số tiền … đồng trước ngày …/…/…',
      kienNghi:'Phối hợp UBND cấp xã, Tổ TK&VV, Hội tiếp tục xác minh nơi ở của khách hàng; đôn đốc người thân trả nợ thay; đề nghị xem xét xử lý nợ theo quy định nếu đủ điều kiện'},
    {ten:'② Còn ở địa phương nhưng khó khăn',
      ngNhan:'Gia đình gặp khó khăn (ốm đau / mất mùa / dịch bệnh / thu nhập không ổn định: …), thu nhập không đủ trả nợ, lãi đúng hạn',
      thucTrang:'Kinh tế gia đình khó khăn, thu nhập chính từ …; còn khả năng trả nợ một phần, cần thêm thời gian',
      camKet:'Khách hàng cam kết trả lãi hằng tháng qua Tổ TK&VV; trả dần nợ gốc mỗi tháng … đồng, dứt điểm trước ngày …/…/…',
      kienNghi:'Tổ TK&VV, Hội theo dõi, đôn đốc trả lãi hằng tháng; xem xét lập hồ sơ gia hạn nợ / điều chỉnh kỳ hạn nợ theo quy định nếu đủ điều kiện'},
    {ten:'③ Có điều kiện nhưng chây ỳ',
      ngNhan:'Khách hàng có điều kiện kinh tế (có nguồn thu từ …) nhưng ý thức trả nợ chưa cao, chây ỳ, không chủ động trả nợ, lãi đúng hạn',
      thucTrang:'Kinh tế gia đình ổn định, có tài sản / nguồn thu: …; có khả năng trả nợ',
      camKet:'Khách hàng cam kết trả hết số lãi tồn và nợ gốc quá hạn … đồng trước ngày …/…/…; nếu không thực hiện, đồng ý để Ngân hàng phối hợp chính quyền địa phương xử lý theo quy định',
      kienNghi:'Đề nghị UBND cấp xã, Hội, Tổ TK&VV phối hợp đôn đốc quyết liệt; quá hạn cam kết mà không trả, Ngân hàng xem xét các biện pháp thu hồi nợ theo quy định'}];
  ['ngNhan', 'thucTrang', 'camKet', 'kienNghi'].forEach(function(k){ MAU.forEach(function(t){ if(GOI[k].indexOf(t[k])<0) GOI[k].push(t[k]); }); });   /* câu tình huống vào gợi ý bản thật */
  var ND = [['ngNhan', '2. Nguyên nhân không trả được nợ'], ['thucTrang', '3. Thực trạng tình hình kinh tế và khả năng trả nợ của khách hàng'], ['camKet', '4. Cam kết của khách hàng (hoặc người trả nợ thay)'], ['kienNghi', '5. Kiến nghị biện pháp xử lý nợ']];
  omDangKy({k:MK, ma:'BBLV', phan:['ky', 'tp', 'kh', 'nd', 'kyt'], co:CO,
    dien:[['het', 'Điền hết'], ['tuy', 'Tùy chọn']],
    phanTen:{ky:'Ngày, nơi làm việc', tp:'Thành phần (4 người)', kh:'Khách hàng, thông tin món vay', nd:'Nội dung 2–5 (ghi tay / câu gợi ý)', kyt:'Họ tên dưới chữ ký'},
    o:[{k:'ngay', n:'Hôm nay, ngày', p:'ky', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'noi', n:'Tại (địa chỉ khách: ấp, xã, tỉnh)', p:'ky', l:'tukb', md:'tu', ng:'người vay — M31 (ấp, xã) + ⚙ Khai báo đơn vị (tỉnh)', nhanh:1},
      {k:'tp1Ten', n:'1. Ông (bà)', p:'tp', l:'kb', md:'cham'}, {k:'tp1Dd', n:'1. Đại diện', p:'tp', l:'kb', md:'cham'},
      {k:'tp2Ten', n:'2. Ông (bà)', p:'tp', l:'kb', md:'cham'}, {k:'tp2Dd', n:'2. Đại diện', p:'tp', l:'kb', md:'cham'},
      {k:'tp3Ten', n:'3. Ông (bà) — Đại diện Tổ TK&VV', p:'tp', l:'tu', md:'cham', ng:'tổ trưởng — File Tổ trưởng / M31 (QT-C-18)'},
      {k:'tp4Ten', n:'4. Ông (bà) — Đại diện Khách hàng vay vốn', p:'tp', l:'tu', md:'cham', ng:'người vay — M31'},
      {k:'tinhHuong', n:'Khoản nợ xác minh (tình huống)', p:'kh', l:'tu', md:'tu', ng:'các món đã chọn — M31 (QH, khoanh, lãi tồn, KHĐ)'},
      {k:'ten', n:'Của ông (bà) — họ tên khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay — M31'},
      {k:'maKH', n:'Mã khách hàng', p:'kh', l:'tu', md:'tu', ng:'người vay — M31'},
      {k:'diaChi', n:'Địa chỉ', p:'kh', l:'tu', md:'tu', ng:'người vay — M31'},
      {k:'tt', n:'Là thành viên Tổ do Ông (bà) … làm Tổ trưởng', p:'kh', l:'tu', md:'tu', ng:'tổ — File Tổ trưởng / M31 (QT-C-18)'},
      {k:'hoi', n:'Thuộc tổ chức Hội … quản lý', p:'kh', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'ngaySL', n:'Dư nợ đến ngày (ngày số liệu)', p:'kh', l:'tu', md:'tu', ng:'ngày số liệu Mẫu 31 đang mở'},
      {k:'mon', n:'1. Thông tin về món vay (1 món: dòng · nhiều món: bảng)', p:'kh', l:'tu', md:'tu', ng:'các món đã chọn — M31'},
      {k:'tinhMau', n:'📝 Bản mẫu — tình huống mẫu (mục 2–5)', p:'nd', l:'chon', md:'kb', chon:[CA3].concat(MAU.map(function(t){ return t.ten; })), chonMD:1, khongBao:1},   /* 3.461.6: chọn ngay ở khung Bản mẫu (mauThem) */
      {k:'monTrang', n:'Bản trắng — mục 1', p:'kh', l:'chon', md:'kb', chon:TRANG, chonMD:1, khongBao:1},   /* ô cài đặt — không báo "chưa có số liệu" */
      {k:'ngNhan', n:'2. Nguyên nhân không trả được nợ', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.ngNhan},
      {k:'thucTrang', n:'3. Thực trạng kinh tế, khả năng trả nợ', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.thucTrang},
      {k:'camKet', n:'4. Cam kết của khách hàng', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.camKet},
      {k:'kienNghi', n:'5. Kiến nghị biện pháp xử lý nợ', p:'nd', l:'chon', md:'cham', nhieu:1, chon:GOI.kienNghi},
      {k:'kyKH', n:'Ký — KH vay vốn (họ tên)', p:'kyt', l:'tu', md:'cham', ng:'người vay — M31'},
      {k:'kyTo', n:'Ký — Tổ TK&VV (họ tên)', p:'kyt', l:'tu', md:'cham', ng:'tổ trưởng — File Tổ trưởng / M31'},
      {k:'kyDd1', n:'Ký — Đại diện (cột 3)', p:'kyt', l:'kb', md:'cham'}, {k:'kyDd2', n:'Ký — Đại diện (cột 4)', p:'kyt', l:'kb', md:'cham'}],
    V:function(t){
      var ho = bblvHo(t), T = t ? hsoTo(t) : {}, k = ho ? ho.k : null, ns = KHO.coKy() ? (KHO.ky().ngay || '') : '';
      var c = k && t && typeof hsoKhach==='function' ? hsoKhach(k.kh, t) : null;
      var dc = k && typeof hsoDiaChi==='function' ? hsoDiaChi(c && c.ten ? c : {ap:k.ap}, t) : '';
      return {ngay:HSO.o && HSO.o.ngay || '', noi:dc, tp3Ten:T.tt ? tenHoaDau(T.tt) : '', tp4Ten:k ? tenHoaDau(k.ten||'') : '', tinhHuong:ho ? HSN.tinhHuong(ho.mon) : '',
        ten:k ? tenHoaDau(k.ten||'') : '', maKH:k ? k.kh : '', diaChi:dc, tt:T.tt ? tenHoaDau(T.tt) : '', hoi:T.hoi || '', ngaySL:ns, mon:ho ? ho.mon : [], kyKH:k ? tenHoaDau(k.ten||'') : '', kyTo:T.tt ? tenHoaDau(T.tt) : ''};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, CO), o = function(k, ch){ return G.o(k, ch, {lien:1}); }, e = coChuHTML;
      var nd = function(d){ if(OM_KIEU==='mau'){ var t = MAU[BBLV_MAU!=null ? BBLV_MAU : bblvMauI()] || MAU[0]; return t[d[0]]+'.'; }   /* 📝 Bản mẫu: bộ câu của tình huống chọn */
        var v = G.gt(d[0]); return v ? v.split('|').filter(Boolean).join('; ')+'.' : ''; };
      var ngay = function(k){ var g = hsoNg(G.gt(k)); return g ? G.o(k, '', {gt:g.d+'/'+g.m+'/'+g.y, lien:1}) : G.o(k, '……/……/………'); };   /* có ngày → dd/mm/yyyy liền (QUY_CHUAN 9.7) */
      var dong = function(L, lh){
        var P = function(noi, s){ return '<p style="margin:0;line-height:'+lh+';'+(s||'')+'">'+noi+'</p>'; }, T = 'text-indent:10mm;', J = 'text-align:justify;', W = 'white-space:nowrap;overflow:hidden;';
        var CH = '………………………………………………………………………………………………………………………………………………………………';
        var Ch = function(n){ var h = ''; for(var i=0;i<n;i++) h += P(CH, W); return h; };
        var ong = function(kT, kD, dd){ var v = G.gt(kT); return 'Ông (bà)'+(v ? ': '+o(kT, '')+'&nbsp;&nbsp; ' : ' '+G.o(kT, '…………………………………………')+' ')+'Đại diện: '+(dd || (G.gt(kD) ? o(kD, '') : G.o(kD, '……………………………'))); };
        var noi = G.gt('noi'), ten = G.gt('ten'), th = G.gt('tinhHuong');
        var h = P('<b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center')+P('<b>Độc lập – Tự do – Hạnh phúc</b>', 'text-align:center')+P('--------------------------------', 'text-align:center;line-height:1')+
          P('<b>BIÊN BẢN LÀM VIỆC</b>', 'text-align:center;font-size:15pt;margin:6pt 0 4pt')+
          P('Hôm nay, ngày '+ngay('ngay')+', tại '+(noi ? o('noi', '')+'.' : G.o('noi', '…………………………………')+' tỉnh '+e(hsoPGD('tinh') || 'Tây Ninh')+'.'), T+(noi ? J : W))+   /* 3.461.4 (anh 03/11 "mất chữ Tây Ninh"): có địa chỉ → tự xuống dòng; trống → giữ 1 dòng chấm */
          P('Chúng tôi gồm:', T)+
          P('1. '+ong('tp1Ten', 'tp1Dd'), T+W)+P('2. '+ong('tp2Ten', 'tp2Dd'), T+W)+
          P('3. '+ong('tp3Ten', '', 'Tổ TK&amp;VV'), T+W)+P('4. '+ong('tp4Ten', '', 'Khách hàng vay vốn'), T+W)+
          (ten ? P('Đã tiến hành xác minh và đánh giá khoản '+(th ? o('tinhHuong', '') : 'nợ')+' của ông (bà): '+o('ten', '')+' – Mã khách hàng: '+o('maKH', '')+'.', T+J)
               : P('Đã tiến hành xác minh và đánh giá khoản nợ của ông (bà): '+G.o('ten', '………………………………………'), T+W)+P('Mã khách hàng: '+G.o('maKH', '…………………………'), T+W))+
          P('Địa chỉ: '+(G.gt('diaChi') ? o('diaChi', '')+'.' : G.o('diaChi', '……………………………………………………………………………………………………')), T+(G.gt('diaChi') ? J : W))+
          (G.gt('tt') || G.gt('hoi') ? P('Là thành viên Tổ TK&amp;VV do '+(G.gt('tt') ? 'Ông (bà): '+o('tt', '') : 'Ông (bà) '+G.o('tt', '…………………………………'))+' làm Tổ trưởng, thuộc tổ chức '+(/^Hội\b/i.test(G.gt('hoi')) ? o('hoi', '') : 'Hội '+(G.gt('hoi') ? o('hoi', '') : G.o('hoi', '…………………………')))+' quản lý.', T+J)
            : P('Là thành viên Tổ TK&amp;VV do Ông (bà) '+G.o('tt', '…………………………………')+' làm Tổ trưởng, thuộc tổ chức Hội '+G.o('hoi', '…………………………')+' quản lý.', T+W));   /* 3.461.4 (anh 03/11 "ghi thêm là thành viên tổ … cho đồng nhất với 06A") */
        h += bblvMon(G, V, P, T, W, lh);
        ND.forEach(function(d){ var v = nd(d), n = Math.max(0, v ? L-1 : L);
          h += P('<b>'+d[1]+':</b> '+(v ? '<span class="om om-kb" data-o="'+d[0]+'">'+e(v)+'</span>' : G.o(d[0], '……………………………')), T+(v ? J : W))+Ch(n); });
        h += P('Buổi làm việc kết thúc cùng ngày, đã được đọc lại cho những người có tên nghe, thống nhất với các nội dung trong Biên bản và cùng ký tên dưới đây.', T+J+'margin-top:2pt');
        var ky = function(k){ var v = G.gt(k); return v ? o(k, '') : ''; };
        h += '<table style="width:100%;border-collapse:collapse;margin-top:4pt;break-inside:avoid;page-break-inside:avoid"><tr>'+
          ['KH vay vốn', 'Tổ TK&amp;VV', 'Đại diện ………', 'Đại diện ………'].map(function(x){ return '<td style="width:25%;text-align:center;font-weight:bold;vertical-align:top">'+x+'</td>'; }).join('')+'</tr>'+
          '<tr><td style="height:'+(lh>1.3 ? 26 : 20)+'mm"></td><td></td><td></td><td></td></tr><tr>'+
          ['kyKH', 'kyTo', 'kyDd1', 'kyDd2'].map(function(k){ return '<td style="text-align:center">'+ky(k)+'</td>'; }).join('')+'</tr></table>';
        return '<div class="om-goc" style="font-size:'+CO+'pt">'+h+'</div>'; };
      /* trọn 1 trang A4: nhiều dòng chấm nhất, rồi giãn dòng nhiều nhất còn vừa */
      var H = 297-MG[0]-MG[2]-5, Wm = 210-MG[1]-MG[3], chon = null;
      for(var L=4; L>=1 && !chon; L--){ if(bblvCao(dong(L, 1.15), Wm) <= H){ var lh = 1.15; while(lh < 1.5 && bblvCao(dong(L, lh+0.02), Wm) <= H) lh += 0.02; chon = [L, Math.round(lh*100)/100]; } }
      if(!chon){ chon = [1, 1.15]; OM_DAI.push({mk:MK, k:'mon', n:'Biên bản dài hơn 1 trang', v:'bớt món đã chọn hoặc in 2 trang', gian:1}); }
      return {ma:'BBLV', h:dong(chon[0], chon[1]), L:chon[0], lh:chon[1]};
    }});
  /* mục 1 — dạng dòng (1 món / bản trắng) hoặc bảng (nhiều món / bản trắng chọn bảng) */
  function bblvMon(G, V, P, T, W, lh){ var e = coChuHTML, c = omCach(MK, 'mon'), ds = c==='cham' ? [] : (V.mon || []), ns = G.gt('ngaySL'), g = hsoNg(ns), nsC = g ? g.d+'/'+g.m+'/'+g.y : '';
    var tr = omKB(MK, 'monTrang') || TRANG[0], nB = ds.length>1 ? 0 : (parseInt((/(\d) dòng/.exec(tr) || [])[1], 10) || 0);
    var nt = function(v){ return v ? ngayVNsl(v) : ''; }, md = function(m){ return typeof ktCoNganh==='function' && ktCoNganh(m) ? ktNganh(m) : ''; };
    if(ds.length>1 || nB){
      var th = 'border:1px solid #000;padding:1.5pt 3pt;vertical-align:top;', tdS = th+'text-align:right;white-space:nowrap;';
      var hang = ds.length>1 ? ds.map(function(x, i){ var m = x.m;
        return '<tr><td style="'+th+'text-align:center">'+(i+1)+'</td><td style="'+th+'">'+e(ctNgan(m.ct, m))+' · '+e(m.ku)+'</td><td style="'+th+'">'+e(md(m))+'</td><td style="'+tdS+'">'+(m.gn ? tdnTien(m.gn) : '')+'</td>'+
          '<td style="'+th+'">'+nt(m.nv)+'<br>'+nt(skHL(m))+'<br><i>'+(nt(m.ngdg) || '—')+'</i></td><td style="'+tdS+'">'+tdnTien(m.dn||0)+'</td><td style="'+tdS+'">'+tdnTien(laiTon(m))+'</td><td style="'+th+'">'+e(HSN.nhan(m, x.f))+'</td></tr>'; }).join('')
        : Array.apply(null, {length:nB}).map(function(_, i){ var r = '<td style="'+th+'text-align:center;height:9mm">'+(i+1)+'</td>'; for(var j=0;j<7;j++) r += '<td style="'+th+'"></td>'; return '<tr>'+r+'</tr>'; }).join('');
      var cg = ds.reduce(function(a, x){ return a+(x.m.dn||0); }, 0), cl = ds.reduce(function(a, x){ return a+laiTon(x.m); }, 0);
      return P('<b>1. Thông tin về món vay</b> (số liệu đến ngày '+(nsC && ds.length ? '<span class="om om-tu" data-o="ngaySL">'+nsC+'</span>' : '……/……/………')+')', T)+
        '<table data-o="mon" style="border-collapse:collapse;width:100%;table-layout:fixed;font-size:10.5pt;line-height:1.15;margin:2pt 0"><colgroup><col style="width:6mm"><col style="width:31mm"><col style="width:21mm"><col style="width:21mm"><col style="width:19mm"><col style="width:21mm"><col style="width:17mm"><col></colgroup>'+
        '<tr>'+['TT', 'CT · Số KU', 'Mục đích', 'Số tiền vay', 'Ngày vay<br>Đến hạn<br><i>GD cuối</i>', 'Nợ gốc', 'Nợ lãi', 'Tình trạng'].map(function(x){ return '<th style="'+th+'text-align:center">'+x+'</th>'; }).join('')+'</tr>'+hang+
        '<tr><td style="'+th+'"></td><td colspan="4" style="'+th+'font-weight:bold">Cộng</td><td style="'+tdS+'font-weight:bold">'+(ds.length ? tdnTien(cg) : '')+'</td><td style="'+tdS+'font-weight:bold">'+(ds.length ? tdnTien(cl) : '')+'</td><td style="'+th+'"></td></tr></table>';
    }
    var x = ds[0], m = x ? x.m : null, sp = function(v){ return '<span class="om om-tu" data-o="mon">'+e(v)+'</span>'; }, f = x ? x.f : {};
    var hop = function(co, chu){ return (co ? '☒' : '☐')+' '+chu; };
    return P('<b>1. Thông tin về món vay</b>', T)+
      (m ? (omRong('- Tên chương trình vay: '+HSN.ctTen(m)+' – Số tiền vay: '+(m.gn ? tdnTien(m.gn) : '')+' đồng;', 13) > 150   /* 3.461.4: tên dài → Số tiền vay xuống dòng */
          ? P('- Tên chương trình vay: '+sp(HSN.ctTen(m))+';', T)+P('- Số tiền vay: '+sp(m.gn ? tdnTien(m.gn) : '')+' đồng;', T+W)
          : P('- Tên chương trình vay: '+sp(HSN.ctTen(m))+' – Số tiền vay: '+sp(m.gn ? tdnTien(m.gn) : '')+' đồng;', T+W))+P('- Mục đích sử dụng vốn vay: '+(md(m) ? sp(md(m))+'.' : '…………………………………………………………………………'), md(m) ? T : T+W)+
          P('- Ngày vay '+sp(nt(m.nv) || '……/……/………')+' – Ngày đến hạn '+sp(nt(skHL(m)) || '……/……/………'), T+W)+
          P('- Giao dịch lần cuối: '+(m.ngdg ? sp(nt(m.ngdg))+'.' : '……/……/………'), T+W)+   /* 3.461.2 (anh 03/11 "ghi thêm giao dịch lần cuối") — Ngày GDXA gần nhất của món (Mẫu 31) */
          P('- Dư nợ đến ngày '+sp(nsC || '……/……/………')+': gốc '+sp(tdnTien(m.dn||0))+' đồng; lãi '+sp(tdnTien(laiTon(m)))+' đồng.', T+W)+
          P('- Tình trạng: '+hop(f.qh, 'Quá hạn')+' &nbsp;'+hop(f.kn, 'Khoanh')+' &nbsp;'+hop(f.lai>3, 'Lãi tồn cao'+(f.lai>3 ? ' (≈ '+Math.floor(f.lai)+' tháng)' : ''))+' &nbsp;'+hop(f.khd, '3 tháng KHĐ'), T+W)
        : P('- Tên chương trình vay: ……………………… – Số tiền vay: ………………… đồng;', T+W)+P('- Mục đích sử dụng vốn vay: ……………………………………………………………………', T+W)+
          P('- Ngày vay ……/……/……… &nbsp;&nbsp;&nbsp;&nbsp; – Ngày đến hạn ……/……/………', T+W)+P('- Giao dịch lần cuối: ……/……/………', T+W)+P('- Dư nợ đến ngày ……/……/………: gốc ……………… đồng; lãi …………… đồng.', T+W)+
          P('- Tình trạng: ☐ Quá hạn &nbsp;☐ Khoanh &nbsp;☐ Lãi tồn cao &nbsp;☐ 3 tháng KHĐ', T+W)); }
  /* chiều cao (mm) khi in — dựng đúng trang in (hsoTrang: cùng CSS, phông) trong khung ẩn rộng bằng vùng in, ghi đồng bộ (about:blank) rồi đo; không có DOM → ước 6 mm / đoạn */
  function bblvCao(h, Wm){ if(typeof document==='undefined' || !document.body) return (h.match(/<p /g) || []).length*6;
    var f = bblvCao.f; if(!f){ f = bblvCao.f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:absolute;left:-10000px;top:0;height:400mm;border:0;visibility:hidden'; document.body.appendChild(f); }
    f.style.width = Wm+'mm'; var d = f.contentDocument, M = hsoMauK(MK) || {mg:MG};
    d.open(); d.write(typeof hsoTrang==='function' ? hsoTrang([{M:M, h:h}]) : '<body style="margin:0;font-family:Times New Roman">'+h+'</body>'); d.close();
    var e = d.querySelector('.kt-to') || d.body; return e.getBoundingClientRect().height*25.4/96; }
  /* hộ đang lập: trong vòng in nhiều hộ → BBLV_HO; không thì hộ đầu tiên đang chọn; chưa chọn → người vay đang xem (HSO.vay) với các món có vấn đề (không có thì mọi món còn nợ) */
  function bblvHo(t){ if(BBLV_HO) return BBLV_HO; if(!t || typeof HSN==='undefined') return null;
    var d = HSN.dsChon(MK, t), kh = HSO.vay && HSO.vay.kh; if(kh){ var c = d.find(function(h){ return h.k.kh===kh; }); if(c) return c; }
    if(d.length) return d[0]; if(!kh) return null;
    var h = HSN.ds(t).find(function(z){ return z.k.kh===kh; }); if(!h) return null; var vd = h.mon.filter(function(x){ return HSN.nhan(x.m, x.f); });
    return {k:h.k, mon:vd.length ? vd : h.mon}; }
  var BBLV_HO = null;
  /* lập: mỗi hộ đang chọn 1 biên bản (1 trang) — chưa chọn hộ → 1 biên bản (người vay đang xem / bản trắng) */
  function bblvMauI(){ var tm = omKB(MK, 'tinhMau'); for(var i=0;i<MAU.length;i++) if(MAU[i].ten===tm) return i; return -1; }   /* -1 = Cả 3 (mặc định) */
  OM_MAU[MK].mauThem = function(){ var i0 = bblvMauI();
    return '<div class="om-muc">Tình huống mẫu (mục 2–5): '+[CA3].concat(MAU.map(function(x){ return x.ten; })).map(function(ten, j){ var bat = j ? i0===j-1 : i0<0;
      return gdxChip(ten, bat, 'omChonDat(\''+MK+'\',\'tinhMau\',\''+ten+'\')', 'hso-ct', j ? 'In 1 biên bản mẫu theo tình huống này' : 'In 3 biên bản mẫu liền nhau, mỗi tình huống 1 trang'); }).join('')+'</div>'; };
  /* 📝 Bản mẫu "Cả 3 tình huống" → 3 biên bản mẫu (mỗi tình huống 1 trang) */
  function bblvMau3(t){ var ds = MAU.map(function(x, i){ BBLV_MAU = i; try { return {M:hsoMauK(MK), h:omLap(MK, t).h, ten:x.ten}; } finally { BBLV_MAU = null; } }); return {ma:'BBLV', h:ds[0].h, ds:ds}; }
  hsoLapBblv = function(t){ if(OM_KIEU==='mau' && bblvMauI()<0) return bblvMau3(t); var d = t && typeof HSN!=='undefined' ? HSN.dsChon(MK, t) : [];
    if(d.length<2){ var r = omLap(MK, t); return r; }
    var ds = d.map(function(ho){ BBLV_HO = ho; try { return {M:hsoMauK(MK), h:omLap(MK, t).h, ten:ho.k.ten}; } finally { BBLV_HO = null; } });
    return {ma:'BBLV', h:ds[0].h, ds:ds}; };
  var M = hsoMauK(MK); if(M) M.mg = omMg(MG);
})();
