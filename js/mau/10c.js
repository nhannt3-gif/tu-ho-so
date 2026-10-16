/* ===== 3.223 M6 — MẪU 10C/TD MỚI (QĐ 70, từ 01/10/2026) Biên bản họp kết nạp, cho ra khỏi Tổ — trên nền ô, dựng theo file gốc tests/mau_goc/10c_moi.docx =====
   Anh chốt 16/10: 10C cũ và 10C mới là 2 mẫu độc lập (mỗi mẫu 1 chip, anh tự chọn) — bỏ tự chọn theo ngày họp. Ngày trên Hồ sơ Tổ mặc định để chấm.
   Lề 10 / 20 / 10 / 30 mm · Times New Roman 14 · đoạn dòng cố định 15 pt, cách 3 pt · ô "Mẫu số" là hộp chữ góc phải · chú thích (1) chân trang 1.
   Trong bộ hồ sơ vay (hsoLapBo) vẫn gọi hsoLap10c(t, {moi, kn, vay}) như cũ. Bỏ file này → app dùng lại hsoLap10c cũ. */
(function(){
  var MK = '10c';
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){   /* dòng ép 1 dòng: co khoảng trắng / nén chấm cho vừa khổ (như 01/GQVL) */
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm(s, 'text-indent') - mm(s, 'margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:-0.25mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');   /* chữ trong ô không bị giãn theo dòng */   /* phông máy rộng hơn Word ~2 % → ngắt dòng như gốc */
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.7mm;', H15 = 'margin:3pt 0;line-height:15pt;';
  function sup(x){ return '<span style="font-size:58%;vertical-align:33%;line-height:0">'+x+'</span>'; }
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }   /* đoạn 2 dòng ngắt đúng chỗ gốc: 2 nửa liền nhau như 1 đoạn */
  function chanTrang(cao, so, chu){ return '<div class="kt-giu" style="height:'+cao+'mm"><div style="position:absolute;left:1.5px;right:1.5px;bottom:0;font-size:10pt;line-height:1.15;text-align:justify">'+
    '<p style="margin:0 0 1mm;width:50mm;height:0;border-top:.5pt solid #000"></p><p style="margin:0">'+sup(so)+' '+chu+'</p></div></div>'; }
  omDangKy({k:MK, ma:'10C/TD', phan:['to', 'hoi', 'ky'], co:14,
    o:[{k:'vv', n:'"Về việc …"', p:'to', l:'tu', md:'tu', ng:'có tích kết nạp / cho ra → "kết nạp, cho tổ viên ra khỏi Tổ"'},
      {k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'diaDiem', n:'Địa điểm: Thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'hinhThuc', n:'Hình thức họp ☒', p:'to', l:'kb', md:'cham', cmau:'Trực tiếp'},
      {k:'ungDung', n:'Thông qua ứng dụng (họp trực tuyến)', p:'to', l:'kb', md:'cham'},
      {k:'tt', n:'Chủ trì: Tổ trưởng', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'pho', n:'Thư ký: Tổ phó', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / khai báo'},
      {k:'du', n:'…/… tổ viên dự họp (số tổ viên trước họp)', p:'to', l:'tu', md:'tu', ng:'số tổ viên trước họp (Mẫu 31 + tích)'},
      {k:'truongAp', n:'Trưởng thôn chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'hoi', n:'Cán bộ Hội chứng kiến · chức vụ · Hội', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'kn', n:'Bảng I/II: tổ viên kết nạp · cho ra', p:'to', l:'tu', md:'tu', ng:'tích kết nạp / cho ra ở cột trái'},
      {k:'sau', n:'Tổng số tổ viên sau họp', p:'to', l:'tu', md:'tu', ng:'tự tính'},
      {k:'vay', n:'Bảng 2: danh sách đề nghị vay vốn', p:'to', l:'tu', md:'tu', ng:'bộ hồ sơ vay (in kèm 01/TD)'},
      {k:'khac', n:'3. Nội dung khác', p:'to', l:'kb', md:'cham'},
      {k:'bq', n:'4. …/… tổ viên biểu quyết tán thành', p:'to', l:'go', md:'cham'},
      {k:'ketThuc', n:'Kết thúc lúc … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ky', n:'Họ tên dưới chữ ký (thư ký, chủ trì, Hội, trưởng thôn)', p:'ky', l:'tu', md:'tu', ng:'tổ / khai báo'}],
    V:function(t, X){
      var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), h = T.hoi || '';
      if(X && X.kn){ var moiVao = X.kn.filter(function(x){ return !tv.some(function(k){ return k.kh && k.kh===x.kh; }); }).length; L = {kn:X.kn, ra:[], truoc:tv.length, sau:tv.length+moiVao}; }
      return {L:L, T:T, X:X, vv:L.kn.length || L.ra.length ? 'kết nạp, cho tổ viên ra khỏi Tổ' : '', ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, tt:T.tt, pho:T.pho, du:t ? String(L.truoc) : '', truongAp:T.truongAp,
        cb:N.cb, cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h, sau:t ? String(L.sau) : '', vay:(X && X.vay) || []};
    },
    lap:function(t, X){
      var V = this.V(t, X), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var x = hsoNg(G.gt('ngay')), nd = x ? [x.d, x.m, x.y] : ['', '', ''];
      var ck = function(k, on){ return '<span class="om om-'+(C(k) ? (OM_KIEU==='mau' ? 'mau' : 'kb') : 'cham')+'" data-o="'+k+'">'+(C(k) && on ? '☒' : '☐')+'</span>'; }, ht = G.gt('hinhThuc');
      var bd = 'border:.5pt solid #000;padding:0 1.9mm;', td = function(noi, st){ return '<td style="'+bd+(st||'')+'">'+noi+'</td>'; }, pc = 'margin:4.8pt 0;line-height:16pt;';
      var b1 = '<tr>'+td(P('<b>I</b>', 'text-align:center;'+pc))+td(P('<b>Tổ viên được kết nạp</b>', 'text-align:center;'+pc))+td(P('<b>II</b>', 'text-align:center;'+pc))+td(P('<b>Tổ viên cho ra khỏi Tổ</b>', 'text-align:center;'+pc))+'</tr>';
      var n1 = Math.max(5, V.L.kn.length, V.L.ra.length);
      for(var i=0;i<=n1;i++){ var a = C('kn') && V.L.kn[i], r = C('kn') && V.L.ra[i], cuoi = i===n1;
        b1 += '<tr>'+td(P(cuoi ? '….' : i+1, 'text-align:center;'+pc))+td(P(a ? o('kn', '', {gt:a.ten, rong:66}) : '&nbsp;', pc))+td(P(cuoi ? '…..' : i+1, 'text-align:center;'+pc))+td(P(r ? o('kn', '', {gt:r.ten, rong:61}) : '&nbsp;', pc))+'</tr>'; }
      var p2 = 'margin:3pt 0;line-height:16pt;', b2 = '<tr style="height:13.8mm">'+['Stt', 'Họ và tên', 'Chương trình vay ', 'Số tiền đề nghị cho vay', 'Mục đích sử dụng vốn vay', 'Thời hạn đề nghị<br>cho vay (tháng)'].map(function(x, j){ return td(P('<b>'+x+'</b>', 'text-align:center;line-height:1.15;'+(j ? 'font-size:13pt' : '')), 'padding:0 1mm;vertical-align:middle'); }).join('')+'</tr>';
      var n2 = Math.max(8, V.vay.length);
      for(var j=0;j<=n2;j++){ var v = C('vay') && V.vay[j], cu = j===n2;
        b2 += '<tr style="height:'+([9, 9.6, 10][j] || 9.7)+'mm">'+td(P(cu ? '…' : j+1, 'text-align:center;'+p2))+td(P(v ? o('vay', '', {gt:v.ten, rong:34}) : '&nbsp;', p2))+td(P(v ? o('vay', '', {gt:v.ct, rong:23}) : '&nbsp;', p2))+
          td(P(v && v.tien ? o('vay', '', {gt:(v.tien/1e6).toLocaleString('vi-VN', {maximumFractionDigits:3}), rong:28, canh:'r'}) : '&nbsp;', p2))+td(P(v ? o('vay', '', {gt:v.md, rong:29, hai:7}) : '&nbsp;', p2))+td(P(v && v.th ? o('vay', '', {gt:v.th, rong:24, canh:'c'}) : '&nbsp;', 'text-align:center;'+p2))+'</tr>'; }
      var bang = function(w, noi){ return '<table style="border-collapse:collapse;table-layout:fixed;width:'+w.reduce(function(a, b){ return a+b; }, 0)+'mm"><colgroup>'+w.map(function(x){ return '<col style="width:'+x+'mm">'; }).join('')+'</colgroup>'+noi+'</table>'; };
      var hoi = V.hoiLa ? 'Hội '+o('hoi', '………………………..………', {gt:g('hoi', V.hoiTen)}) : o('hoi', 'Hội ………………………..………', {gt:g('hoi', V.hoiTen)});
      var ky = function(k, v){ return P('<b>'+o('ky', '&nbsp;', {gt:g('ky', v), rong:70, canh:'c'})+'</b>', 'text-align:center;font-size:12pt'); };
      var h = '<div style="position:relative;height:0"><div style="position:absolute;right:0;top:1.9mm;width:41.3mm;line-height:1.15">'+P('<b>Mẫu số:10C/TD</b>', 'text-align:right;font-size:13pt')+P('<i>(đóng thành quyển)</i>', 'text-align:right;font-size:12pt')+'</div></div>'+   /* hộp chữ góc phải như gốc */
        P('&nbsp;', 'line-height:1.15')+P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt;margin-top:4.8mm')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center')+'<p class="ke" data-ke="62" style="width:62mm;margin:0.5pt auto 0"></p>'+
        '<div style="height:3.4mm"></div>'+P('<b>BIÊN BẢN HỌP</b>', 'text-align:center;margin-top:6pt')+P('<b>Về việc '+o('vv', '……………………………..………...........…………')+'</b>'+sup('1'), 'text-align:center')+
        P('&nbsp;', J+'margin:3pt 0;line-height:16pt')+
        P('<b>Thời gian bắt đầu:'+o('gio', '……', {canh:'c'})+'giờ'+o('gio', '…….', {gt:''})+', ngày'+o('ngay', '…..', {gt:nd[0], canh:'c'})+'/'+o('ngay', '…..', {gt:nd[1], canh:'c'})+'/'+o('ngay', '……..……', {gt:nd[2], canh:'c'})+'</b>', J+F+H15+W)+
        P2('<b>Địa điểm: Thôn'+o('diaDiem', '……………', {gt:g('diaDiem', V.ap)})+', xã '+o('diaDiem', '………………', {gt:g('diaDiem', V.xa)})+', tỉnh '+o('diaDiem', '…………..', {gt:g('diaDiem', V.tinh)})+'</b>', '<b>…….</b>', J+F+H15, H15)+
        P2('<b>Hình thức họp</b>: &nbsp; &nbsp;'+ck('hinhThuc', /^trực tiếp$/i.test(ht))+' Trực tiếp &nbsp; &nbsp; &nbsp;'+ck('hinhThuc', /^trực tuyến$/i.test(ht))+' Trực tuyến &nbsp; &nbsp; &nbsp;'+ck('hinhThuc', /kết hợp/i.test(ht))+' Trực tiếp', 'kết hợp trực tuyến.', J+F+H15+'letter-spacing:-0.5pt;', H15)+
        P2('Thông qua ứng dụng:'+o('ungDung', '………………………………..'), '……………………', J+'text-indent:37.9mm;'+H15, H15)+
        P('<b>Thành phần tham dự</b><b>:</b>', J+F+H15)+
        P2('- Chủ trì: Ông(bà)'+o('tt', '…………………..........…….')+' Chức vụ: Tổ', 'trưởng. ', J+F+H15, H15)+
        P2('- Thư ký: Ông(bà)'+o('pho', '……………………...….………')+'Chức vụ: Tổ', 'phó.', J+F+H15, H15)+
        P('- '+o('du', '…......', {gt:''})+'/'+o('du', '.........', {canh:'c'})+' tổ viên thuộc Tổ TK&amp;VV. ', J+F+H15)+
        P2('- Ông (bà)'+o('truongAp', '………………………………')+' là Trưởng thôn chứng kiến', 'cuộc họp.', J+F+H15+'letter-spacing:-0.3pt;', H15)+
        P2('- Ông (bà)'+o('hoi', '……………..…………….', {gt:g('hoi', V.cb)})+' Chức vụ '+o('hoi', '……………….', {gt:g('hoi', V.cv)}), o('hoi', '…………….', {gt:''})+' '+hoi+' chứng kiến cuộc họp.', J+F+H15+'letter-spacing:-0.3pt;', H15+'letter-spacing:-0.3pt')+
        P('<b>Nội dung cuộc họp:</b>', F+H15)+
        P2('<b>1. Thống nhất danh sách tổ viên được kết nạp, tổ</b>', '<b>viên cho ra khỏi Tổ</b>', J+F+H15, H15)+
        bang([12.5, 72.5, 12.5, 67.5].map(function(x){ return x*160/165; }), b1)+
        P2('Tổng số tổ viên sau khi kết nạp, cho ra khỏi Tổ:', o('sau', '………………..', {canh:'c'})+' tổ viên.', J+F+'margin:6pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:6pt')+
        P('<b>2. Thống nhất danh sách tổ viên đề nghị vay vốn NHCSXH</b>', F+'margin:6pt 0;line-height:18pt')+
        P('<i>Đơn vị tính: triệu đồng</i>', 'text-align:right;font-size:13pt;margin:3pt 0;line-height:18pt')+
        chanTrang(9, '1', 'Kết nạp tổ viên, cho tổ viên ra khỏi Tổ, bình xét cho vay, sửa đổi Quy ước hoạt động của Tổ,…và các nội dung khác (căn cứ theo nội dung cuộc họp đã được Tổ trưởng chuẩn bị).')+
        '<div class="kt-giu" style="height:10.7mm"></div>'+   /* gốc: trang 2 có đầu trang (số trang) → nội dung bắt đầu thấp hơn ~10,7 mm */
        bang([11.6, 37.5, 25.9, 30.9, 31.6, 27.5].map(function(x){ return x*160/165; }), b2)+
        P('<b>3. Nội dung khác </b><b><i>(nếu có)</i></b>', J+'text-indent:10mm;margin:6pt 0 3pt;line-height:18pt')+
        (function(){ var v = G.gt('khac'), ds = ['…………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………'];
          var noi = ds.map(function(x){ return '<span class="om om-cham" data-o="khac"'+(v ? ' style="visibility:hidden"' : '')+'>'+x+'</span>'; }).join('<br>');
          return '<div style="position:relative">'+P(noi, 'text-indent:10mm;margin:6pt 0 3pt;line-height:19pt;'+W)+(v ? '<div class="om om-'+(OM_KIEU==='mau' ? 'mau' : 'kb')+'" data-o="khac" style="position:absolute;left:0;right:0;top:6pt;bottom:3pt;overflow:hidden;line-height:19pt;text-indent:10mm;text-align:justify">'+coChuHTML(v)+'</div>' : '')+'</div>'; })()+
        P('<b>4.</b><b> Kết quả biểu quyết</b>', 'text-indent:10mm;margin:3pt 0;line-height:18pt')+
        P2(o('bq', '......', {canh:'c'})+'/'+o('bq', '......', {gt:''})+' tổ viên của Tổ tham dự họp biểu quyết tán thành', 'thông qua các nội dung nêu trên.', J+'text-indent:10mm;margin:3pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:3pt')+
        P2('Nội dung biên bản được các tổ viên và thành phần tham dự', 'cuộc họp hoàn toàn nhất trí thông qua.', J+'text-indent:10mm;margin:3pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:3pt')+
        P2('Cuộc họp kết thúc vào lúc '+o('ketThuc', '……', {canh:'c'})+' giờ '+o('ketThuc', '……', {gt:''})+' ngày '+o('ketThuc', '.….', {gt:''}), '/…../…..........', J+'text-indent:10mm;margin:3pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:3pt')+
        P('&nbsp;', 'margin:3pt 0;line-height:18pt')+
        '<table class="khung0" style="width:161.8mm;table-layout:fixed"><colgroup><col style="width:50%"><col style="width:50%"></colgroup><tr style="height:22.7mm"><td style="padding:0 1.9mm;vertical-align:top">'+
          P('<b>THƯ KÝ</b>', 'text-align:center;font-size:12pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center;font-size:12pt')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+ky('ky', V.pho)+P('&nbsp;', 'font-size:12pt')+
          P('<b>TỔ CHỨC CT-XH CẤP XÃ</b>', 'text-align:center;font-size:12pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center;font-size:12pt')+ky('ky', V.cb)+'</td>'+
          '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>CHỦ TRÌ</b>', 'text-align:center;font-size:12pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center;font-size:12pt')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+ky('ky', V.tt)+
          P('<b>TRƯỞNG THÔN</b>', 'text-align:center;font-size:12pt;margin-top:12pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center;font-size:12pt')+ky('ky', V.truongAp)+'</td></tr></table>';
      return {ma:'10C/TD (mẫu mới QĐ 70)', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  var cu = hsoLap10c;
  hsoLap10c = function(t, X){ return X && X.cu ? cu(t, {cu:1}) : omLap(MK, t, X); };   /* 10C mới; X.cu: gọi mẫu cũ (chip 10C cũ khi chưa có mô-đun riêng) */
  var M = hsoMauK(MK); if(M){ M.mg = omMg([10, 20, 10, 30]); M.ma = '10C/TD mới'; M.ten = 'Biên bản họp kết nạp, cho ra khỏi Tổ — mẫu mới QĐ 70 (từ 01/10/2026)'; M.ghi = ''; }
})();
