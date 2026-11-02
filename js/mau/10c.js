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
  var VV = ['kết nạp tổ viên', 'cho tổ viên ra khỏi Tổ', 'bình xét cho vay', 'sửa đổi Quy ước hoạt động của Tổ'];   /* 3.453 (anh 02/11): Về việc chọn nhiều theo chú thích (1) của mẫu */
  var DON = {tt:1, pho:1, truongAp:1, hoiCB:1, hoiCv:1, hoiTen:1, kyTK:1, kyHoi:1, kyCT:1, kyTA:1};
  omDangKy({k:MK, ma:'10C/TD', phan:['to', 'hoi', 'ky'], co:14,
    dien:[['het', 'Điền hết'], ['tuy', 'Tùy chọn']],   /* 3.453: khối Nhập liệu riêng (10C không có phần UBND / NH) */
    phanTen:{to:'Thông tin cuộc họp, kết nạp / cho ra, bình xét', hoi:'Cán bộ Hội chứng kiến', ky:'Ngày, họ tên dưới chữ ký'},
    o:[{k:'vv', n:'Về việc (chọn 1 hoặc nhiều)', p:'to', l:'chon', md:'kb', nhieu:1, chon:VV, nhanh:1, chonTu:function(V){ return [V.L && V.L.kn.length ? VV[0] : '', V.L && V.L.ra.length ? VV[1] : '', V.vay && V.vay.length ? VV[2] : ''].filter(Boolean); }},
      {k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1, ui:function(){ return hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay || '', '', 'date'); }},
      {k:'diaDiem', n:'Địa điểm: thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'hinhThuc', n:'Hình thức họp ☒', p:'to', l:'kb', md:'cham', cmau:'Trực tiếp'},
      {k:'ungDung', n:'Thông qua ứng dụng (họp trực tuyến)', p:'to', l:'kb', md:'cham'},
      {k:'tt', n:'- Chủ trì: Ông (bà) … Chức vụ: Tổ trưởng', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / File Tổ trưởng'},
      {k:'pho', n:'- Thư ký: Ông (bà) … Chức vụ: Tổ phó', p:'to', l:'tu', md:'tu', ng:'File Tổ trưởng / ⚙ khai báo tổ phó'},
      {k:'du', n:'…/… tổ viên dự họp (số tổ viên trước họp)', p:'to', l:'tu', md:'tu', ng:'số tổ viên trước họp'},
      {k:'truongAp', n:'- Ông (bà) … là Trưởng thôn chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'hoiCB', n:'- Ông (bà) … (cán bộ Hội chứng kiến) — họ tên', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'hoiCv', n:'Cán bộ Hội: chức vụ', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội'},
      {k:'hoiTen', n:'Cán bộ Hội: Hội (không ghi xã / phường)', p:'hoi', l:'tu', md:'tu', ng:'Hội quản lý tổ'},
      {k:'kn', n:'Bảng I: tổ viên được kết nạp', p:'to', l:'tu', md:'tu', ng:'tích Kết nạp ở bảng hộ vay (cột trái)'},
      {k:'ra', n:'Bảng II: tổ viên cho ra khỏi Tổ', p:'to', l:'tu', md:'tu', ng:'tích Cho ra ở bảng hộ vay (cột trái)'},
      {k:'sau', n:'Tổng số tổ viên sau họp', p:'to', l:'tu', md:'tu', ng:'tự tính'},
      {k:'vay', n:'Bảng 2: danh sách đề nghị vay vốn', p:'to', l:'tu', md:'tu', ng:'bộ hồ sơ vay (in kèm 01/TD)'},
      {k:'khac', n:'3. Nội dung khác', p:'to', l:'kb', md:'cham'},
      {k:'bq', n:'4. …/… tổ viên biểu quyết tán thành', p:'to', l:'go', md:'cham'},
      {k:'ketThuc', n:'Kết thúc lúc … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'kyTK', n:'Họ tên dưới chữ ký Thư ký', p:'ky', l:'tu', md:'tu', ng:'tổ phó'},
      {k:'kyHoi', n:'Họ tên dưới chữ ký Tổ chức CT-XH', p:'ky', l:'tu', md:'tu', ng:'⚙ khai báo Hội'},
      {k:'kyCT', n:'Họ tên dưới chữ ký Chủ trì', p:'ky', l:'tu', md:'tu', ng:'tổ trưởng'},
      {k:'kyTA', n:'Họ tên dưới chữ ký Trưởng thôn', p:'ky', l:'tu', md:'tu', ng:'⚙ khai báo ấp'}],
    V:function(t, X){
      HST.tach(MK, {hoi:['hoiCB', 'hoiCv', 'hoiTen'], kn:['ra'], ky:['kyTK', 'kyHoi', 'kyCT', 'kyTA']});
      var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), h = T.hoi || '', hd = function(x){ return x ? tenHoaDau(x) : x; };
      if(X && X.kn){ var moiVao = X.kn.filter(function(x){ return !tv.some(function(k){ return k.kh && k.kh===x.kh; }); }).length; L = {kn:X.kn, ra:[], truoc:tv.length, sau:tv.length+moiVao}; }
      var sx = function(a){ return a.slice().sort(function(x, y){ return String(x.kh).localeCompare(String(y.kh), 'vi', {numeric:true}); }); };   /* in theo Mã KH */
      L = {kn:sx(L.kn), ra:sx(L.ra), truoc:L.truoc, sau:L.sau};
      return {L:L, T:T, X:X, ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, capAp:HST.capAp(t, T), capXa:HST.capXa(T), tt:hd(T.tt), pho:hd(T.pho), du:t ? String(L.truoc) : '', truongAp:hd(T.truongAp),
        cb:hd(N.cb), cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:HST.hoi(/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h), sau:t ? String(L.sau) : '', vay:(X && X.vay) || [], gio:HSO.vay.gio, bq:HSO.vay.bq, ketThuc:HSO.vay.ketThuc};
    },
    lap:function(t, X){
      var V = this.V(t, X), G = omG(MK, V, 14), S = HST.bo(MK, V, G, P, {don:DON}), o = S.o, C = S.C, g = S.g, ong = S.ong, Lu = hsoLuu();   /* 3.453: quy chuẩn 9.8 */
      var x = hsoNg(G.gt('ngay')), nd = x ? [x.d, x.m, x.y] : ['', '', ''];
      var ck = function(k, on){ return '<span class="om om-'+(C(k) ? (OM_KIEU==='mau' ? 'mau' : 'kb') : 'cham')+'" data-o="'+k+'">'+(C(k) && on ? '☒' : '☐')+'</span>'; }, ht = G.gt('hinhThuc');
      var bd = 'border:.5pt solid #000;padding:0 1.9mm;', td = function(noi, st){ return '<td style="'+bd+(st||'')+'">'+noi+'</td>'; }, pc = 'margin:4.8pt 0;line-height:16pt;';
      var b1 = '<thead><tr>'+td(P('<b>I</b>', 'text-align:center;'+pc))+td(P('<b>Tổ viên được kết nạp</b>', 'text-align:center;'+pc))+td(P('<b>II</b>', 'text-align:center;'+pc))+td(P('<b>Tổ viên cho ra khỏi Tổ</b>', 'text-align:center;'+pc))+'</tr></thead><tbody>';
      var kn = C('kn') ? V.L.kn : [], ra = C('ra') ? V.L.ra : [], n1 = Math.max(+Lu.d10c1 || 5, kn.length, ra.length);   /* 3.453 (anh 02/11): số dòng tùy biến (＋ / − ở cột trái), không ít hơn số hộ đã tích */
      for(var i=0;i<=n1;i++){ var a = kn[i], r = ra[i], cuoi = i===n1;
        b1 += '<tr>'+td(P(cuoi ? '….' : i+1, 'text-align:center;'+pc))+td(P(a ? o('kn', '', {gt:tenHoaDau(a.ten)}) : '&nbsp;', pc))+td(P(cuoi ? '…..' : i+1, 'text-align:center;'+pc))+td(P(r ? o('ra', '', {gt:tenHoaDau(r.ten)}) : '&nbsp;', pc))+'</tr>'; }
      b1 += '</tbody>';
      var p2 = 'margin:3pt 0;line-height:16pt;', b2 = '<thead><tr style="height:13.8mm">'+
        ['Stt', 'Họ và tên', 'Chương trình vay ', 'Số tiền đề nghị cho vay', 'Mục đích sử dụng vốn vay', 'Thời hạn đề nghị<br>cho vay (tháng)'].map(function(z, j){ return td(P('<b>'+z+'</b>', 'text-align:center;line-height:1.15;'+(j ? 'font-size:13pt' : '')), 'padding:0 1mm;vertical-align:middle'); }).join('')+'</tr></thead><tbody>';
      var vay = C('vay') ? V.vay : [], n2 = Math.max(+Lu.d10c2 || 8, vay.length);
      for(var j=0;j<=n2;j++){ var v = vay[j], cu = j===n2;
        b2 += '<tr style="height:9mm">'+td(P(cu ? '…' : j+1, 'text-align:center;'+p2))+td(P(v ? o('vay', '', {gt:tenHoaDau(v.ten)}) : '&nbsp;', p2))+td(P(v ? o('vay', '', {gt:v.ct}) : '&nbsp;', p2))+
          td(P(v && v.tien ? o('vay', '', {gt:(v.tien/1e6).toLocaleString('vi-VN', {maximumFractionDigits:3})}) : '&nbsp;', 'text-align:right;'+p2))+td(P(v ? o('vay', '', {gt:v.md}) : '&nbsp;', p2))+td(P(v && v.th ? o('vay', '', {gt:v.th}) : '&nbsp;', 'text-align:center;'+p2))+'</tr>'; }
      b2 += '</tbody>';
      var bang = function(w, noi){ return '<table style="border-collapse:collapse;table-layout:fixed;width:'+w.reduce(function(a, b){ return a+b; }, 0)+'mm"><colgroup>'+w.map(function(z){ return '<col style="width:'+z+'mm">'; }).join('')+'</colgroup>'+noi+'</table>'; };
      var hoiX = function(k, ch){ var v = g(k, V.hoiTen); return v ? (V.hoiLa ? 'Hội ' : '')+o(k, ch, {gt:v}) : 'Hội '+o(k, ch, {gt:''}); };
      var ky = function(k, v){ return P('<b>'+o(k, '&nbsp;', {gt:g(k, v), rong:70, canh:'c'})+'</b>', 'text-align:center'); };
      var vvA = C('vv') ? String(G.gt('vv')||'').split('|').filter(Boolean) : [];
      var vaiP = function(nhan, k, v, cv){ return S.coTen(k, v) ? S.tabP('- '+nhan+': '+ong(k, '', v, 1), 'Chức vụ: '+cv+'.', H15) : P2('- '+nhan+': Ông(bà)'+o(k, '…………………..........…….', {gt:''})+' Chức vụ: Tổ', cv.replace(/^Tổ /, '')+'.', J+F+H15, H15); };
      var h = '<div style="position:relative;height:0"><div style="position:absolute;right:0;top:1.9mm;width:41.3mm;line-height:1.15">'+P('<b>Mẫu số:10C/TD</b>', 'text-align:right;font-size:13pt')+P('<i>(đóng thành quyển)</i>', 'text-align:right;font-size:12pt')+'</div></div>'+   /* hộp chữ góc phải như gốc */
        P('&nbsp;', 'line-height:1.15')+P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt;margin-top:4.8mm')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center')+'<p class="ke" data-ke="62" style="width:62mm;margin:0.5pt auto 0"></p>'+
        '<div style="height:3.4mm"></div>'+S.tieuDe(HST.noi(vvA), '……………………………..………...........…………', sup('1'))+
        P('&nbsp;', J+'margin:3pt 0;line-height:12pt')+
        P('<b>Thời gian bắt đầu:</b> '+o('gio', '……', {canh:'c'})+' giờ '+o('gio', '…….', {gt:''})+', ngày '+o('ngay', '…..', {gt:nd[0], canh:'c'})+'/'+o('ngay', '…..', {gt:nd[1], canh:'c'})+'/'+o('ngay', '……..……', {gt:nd[2], canh:'c'}), J+F+H15+(G.gt('gio') || G.gt('ngay') ? '' : W))+
        P('<b>Địa điểm:</b> '+S.dvA('diaDiem', '……………', '………………', 1)+', tỉnh '+o('diaDiem', '…………..', {gt:g('diaDiem', V.tinh)}), J+F+H15)+
        P2('<b>Hình thức họp</b>: &nbsp; &nbsp;'+ck('hinhThuc', /^trực tiếp$/i.test(ht))+' Trực tiếp &nbsp; &nbsp; &nbsp;'+ck('hinhThuc', /^trực tuyến$/i.test(ht))+' Trực tuyến &nbsp; &nbsp; &nbsp;'+ck('hinhThuc', /kết hợp/i.test(ht))+' Trực tiếp', 'kết hợp trực tuyến.', J+F+H15+'letter-spacing:-0.5pt;', H15)+
        P2('Thông qua ứng dụng:'+o('ungDung', '………………………………..'), '……………………', J+'text-indent:37.9mm;'+H15, H15)+
        P('<b>Thành phần tham dự:</b>', J+F+H15)+
        vaiP('Chủ trì', 'tt', V.tt, 'Tổ trưởng')+vaiP('Thư ký', 'pho', V.pho, 'Tổ phó')+
        P('- '+o('du', '…......', {gt:''})+'/'+o('du', '.........', {canh:'c'})+' tổ viên thuộc Tổ TK&amp;VV.', J+F+H15)+
        (S.coTen('truongAp', V.truongAp) ? P('- '+ong('truongAp', '', V.truongAp, 1)+' là Trưởng '+S.apL+' chứng kiến cuộc họp.', J+F+H15)
          : P2('- Ông (bà)'+o('truongAp', '………………………………', {gt:''})+' là Trưởng thôn chứng kiến', 'cuộc họp.', J+F+H15+'letter-spacing:-0.3pt;', H15))+
        (S.coTen('hoiCB', V.cb) ? S.tabP('- '+ong('hoiCB', '', V.cb, 1), 'Chức vụ: '+o('hoiCv', '……………….', {gt:g('hoiCv', V.cv)})+' '+hoiX('hoiTen', '………………………..………')+' chứng kiến cuộc họp.', H15)
          : P2('- Ông (bà)'+o('hoiCB', '……………..…………….', {gt:''})+' Chức vụ '+o('hoiCv', '……………….', {gt:g('hoiCv', V.cv)}), o('hoiCv', '…………….', {gt:''})+' '+hoiX('hoiTen', '………………………..………')+' chứng kiến cuộc họp.', J+F+H15+'letter-spacing:-0.3pt;', H15+'letter-spacing:-0.3pt'))+
        P('<b>Nội dung cuộc họp:</b>', F+H15)+
        P2('<b>1. Thống nhất danh sách tổ viên được kết nạp, tổ</b>', '<b>viên cho ra khỏi Tổ</b>', J+F+H15, H15)+
        bang([12.5, 72.5, 12.5, 67.5].map(function(z){ return z*160/165; }), b1)+
        P('Tổng số tổ viên sau khi kết nạp, cho ra khỏi Tổ: '+o('sau', '………………..', {gt:g('sau', V.sau), canh:'c'})+' tổ viên.', J+F+'margin:6pt 0;line-height:18pt;'+(g('sau', V.sau) ? '' : W))+
        P('<b>2. Thống nhất danh sách tổ viên đề nghị vay vốn NHCSXH</b>', F+'margin:6pt 0;line-height:18pt')+
        P('<i>Đơn vị tính: triệu đồng</i>', 'text-align:right;font-size:13pt;margin:3pt 0;line-height:18pt')+
        chanTrang(9, '1', 'Kết nạp tổ viên, cho tổ viên ra khỏi Tổ, bình xét cho vay, sửa đổi Quy ước hoạt động của Tổ,…và các nội dung khác (căn cứ theo nội dung cuộc họp đã được Tổ trưởng chuẩn bị).')+
        bang([11.6, 37.5, 25.9, 30.9, 31.6, 27.5].map(function(z){ return z*160/165; }), b2)+
        P('<b>3. Nội dung khác </b><b><i>(nếu có)</i></b>', J+'text-indent:10mm;margin:6pt 0 3pt;line-height:18pt')+
        (function(){ var v = G.gt('khac'), ds = ['…………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………', '……………………………………………………………………………………'];
          var noi = ds.map(function(z){ return '<span class="om om-cham" data-o="khac"'+(v ? ' style="visibility:hidden"' : '')+'>'+z+'</span>'; }).join('<br>');
          return '<div style="position:relative">'+P(noi, 'text-indent:10mm;margin:6pt 0 3pt;line-height:19pt;'+W)+(v ? '<div class="om om-'+(OM_KIEU==='mau' ? 'mau' : 'kb')+'" data-o="khac" style="position:absolute;left:0;right:0;top:6pt;bottom:3pt;overflow:hidden;line-height:19pt;text-indent:10mm;text-align:justify;font-weight:normal">'+coChuHTML(v)+'</div>' : '')+'</div>'; })()+
        P('<b>4.</b><b> Kết quả biểu quyết</b>', 'text-indent:10mm;margin:3pt 0;line-height:18pt')+
        P2(o('bq', '......', {canh:'c'})+'/'+o('bq', '......', {gt:''})+' tổ viên của Tổ tham dự họp biểu quyết tán thành', 'thông qua các nội dung nêu trên.', J+'text-indent:10mm;margin:3pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:3pt')+
        P2('Nội dung biên bản được các tổ viên và thành phần tham dự', 'cuộc họp hoàn toàn nhất trí thông qua.', J+'text-indent:10mm;margin:3pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:3pt')+
        P2('Cuộc họp kết thúc vào lúc '+o('ketThuc', '……', {canh:'c'})+' giờ '+o('ketThuc', '……', {gt:''})+' ngày '+o('ketThuc', '.….', {gt:''}), '/…../…..........', J+'text-indent:10mm;margin:3pt 0;line-height:18pt;', 'line-height:18pt;margin-bottom:3pt')+
        P('&nbsp;', 'margin:0;line-height:10pt')+
        '<table class="khung0" style="width:161.8mm;table-layout:fixed"><colgroup><col style="width:50%"><col style="width:50%"></colgroup><tr style="height:22.7mm"><td style="padding:0 1.9mm;vertical-align:top">'+
          P('<b>THƯ KÝ</b>', 'text-align:center')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+ky('kyTK', V.pho)+P('&nbsp;')+
          P('<b>TỔ CHỨC CT-XH CẤP XÃ</b>', 'text-align:center')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+ky('kyHoi', V.cb)+'</td>'+
          '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>CHỦ TRÌ</b>', 'text-align:center')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+P('&nbsp;', 'font-size:12pt')+ky('kyCT', V.tt)+P('&nbsp;')+
          P('<b>TRƯỞNG '+S.apL.toUpperCase()+'</b>', 'text-align:center')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+ky('kyTA', V.truongAp)+'</td></tr></table>';
      return {ma:'10C/TD (mẫu mới QĐ 70)', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  /* 3.453 (anh 02/11): cột trái 10C — bảng hộ vay của tổ: Cho ra (hộ của tổ đang chọn) · Kết nạp (trong tổ: hoàn thiện thủ tục; mới vào tích sẵn) + ➕ Kết nạp từ tổ khác CÙNG ẤP;
     ＋ / − số dòng bảng I / II và bảng 2; nhớ hộ chuyển sang tổ nào (lập 10C cho tổ nguồn → Cho ra tích sẵn). Kết nạp / cho ra chỉ trong cùng 1 ấp (anh 02/11). */
  var apSach = function(a){ return typeof sxChuan==='function' ? sxChuan(String(a||'').replace(/^(ấp|ap|thôn|khu phố|kp)\.?\s+/i, '')) : String(a||'').toLowerCase(); };
  var cungAp = function(t){ return KHO.dsTo().filter(function(z){ return z.ma!==t.ma && !toLaTT(z) && z.xa===t.xa && String(z.thon||'')===String(t.thon||'') && String(z.thon||''); }); };
  hso10cTrai = function(t, raBD){ if(!hso10cTrai.dk && typeof GD!=='undefined'){ hso10cTrai.dk = 1;
      GD.dangKy('h10c', {dong:function(el){ var L = hsoLuu(), k = el.getAttribute('data-d'), md = k==='d10c1' ? 5 : 8, v = (+L[k] || md)+(+el.getAttribute('data-v')); L[k] = Math.max(1, v); luu(); hsoVe(); },
        nguon:function(){ hso10cNguon(KHO.to(hsoCH().to)); }, chonNguon:function(el){ HSO.nguon10c = el.getAttribute('data-to'); hso10cNguonVe(); },
        tichN:function(el){ (HSO.knChon = HSO.knChon || {})[el.getAttribute('data-k')] = el.checked; hso10cNguonVe(true); }, hetN:function(el){ var v = el.getAttribute('data-v')==='1'; HSO.knChon = {}; if(v) HST.ds(KHO.to(HSO.nguon10c)).forEach(function(x){ if(x.kh) HSO.knChon[x.kh] = true; }); hso10cNguonVe(); },
        lay:function(){ var t = KHO.to(hsoCH().to), nguon = KHO.to(HSO.nguon10c), L = hsoLuu(), n = 0; if(!t || !nguon) return; L.chuyen10c = L.chuyen10c || {}; var m = L.chuyen10c[nguon.ma] = L.chuyen10c[nguon.ma] || {};
          Object.keys(HSO.knChon || {}).forEach(function(kh){ if(!HSO.knChon[kh]) return; HSO.kn[kh] = true; HSO.ra[kh] = false; m[kh] = t.ma; n++; }); luu(); dongHop(); hsoVe(); bao('Đã kết nạp '+n+' hộ từ tổ '+(nguon.ten||nguon.ma)+' — lập 10C cho tổ đó: các hộ này tự tích "Cho ra".', 6); }}); }
    var ds = HST.ds(t), co = {}; ds.forEach(function(x){ if(x.kh) co[x.kh] = 1; });
    (raBD || []).forEach(function(r){ if(r.kh && !co[r.kh]){ ds.push({kh:String(r.kh), ten:r.ten, dn:0, vay:false, raBD:r.di || 'đã ra khỏi tổ', ap:''}); co[r.kh] = 1; } });
    Object.keys(HSO.kn).forEach(function(kh){ if(HSO.kn[kh] && !co[kh]){ var c = hsoKhach(kh, t) || {}; ds.push({kh:kh, ten:c.ten || kh, dn:0, vay:false, tuTo:1, ap:c.ap || ''}); co[kh] = 1; } });   /* hộ kết nạp từ tổ khác */
    ds.sort(function(a, c){ return String(a.kh).localeCompare(String(c.kh), 'vi', {numeric:true}); });
    var apTo = apSach(t.tenThon), L = hsoLuu(), nTo = cungAp(t).length;
    var khoaKN = function(x){ return x.ap && apTo && apSach(x.ap)!==apTo && !x.tuTo ? 'Khác ấp ('+x.ap+') — cần kiểm lại địa bàn trên hệ thống; kết nạp chỉ trong cùng ấp' : ''; };
    var dong = function(k, md, ten){ return '<span class="th-cap">'+ten+': <b>'+(+L[k] || md)+'</b> dòng</span><button class="nho" data-lenh="h10c.dong" data-d="'+k+'" data-v="-1">−</button><button class="nho" data-lenh="h10c.dong" data-d="'+k+'" data-v="1">＋</button>'; };
    return HST.bang(t, ds, [{ma:'ra', ten:'Cho ra', bang:HSO.ra, loai:1, khoa:function(x){ return x.tuTo ? 'Hộ kết nạp từ tổ khác' : ''; }}, {ma:'kn', ten:'Kết nạp', bang:HSO.kn, loai:1, khoa:khoaKN}],
      {ghiChu:function(x){ return x.tuTo ? 'kết nạp từ tổ khác' : x.raBD ? 'đã ra khỏi tổ — '+x.raBD : ''; },
        dau:'<div class="hang-nut"><button class="nho chinh" data-lenh="h10c.nguon" title="Chọn tổ nguồn cùng ấp → tích hộ để kết nạp">➕ Kết nạp từ tổ khác (cùng ấp'+(nTo ? ', '+nTo+' tổ' : '')+')</button></div>',
        cuoi:'<div class="hang-nut">'+dong('d10c1', 5, 'Bảng I / II')+' · '+dong('d10c2', 8, 'Bảng 2 bình xét')+'</div><div class="sl-phu">Số dòng không ít hơn số hộ đã tích; bảng dài sang trang sau, lặp dòng tiêu đề.</div>'}); };
  hso10cNguon = function(t){ if(!t) return bao('Chọn tổ trước.', 3); var ds = cungAp(t);
    if(!ds.length) return bao('Ấp '+(t.tenThon || '')+' không có tổ khác để kết nạp (kết nạp / cho ra chỉ trong cùng ấp).', 5);
    HSO.knChon = {}; HSO.nguon10c = ''; moHop('<div class="hop-tit" id="h10c-nguon">➕ Kết nạp từ tổ khác — '+coChuHTML(t.tenThon || '')+'</div><div class="hop-phu">Chỉ hiện tổ cùng ấp với tổ đang lập ('+coChuHTML(t.ten || t.ma)+'). Chọn tổ nguồn, tích hộ, bấm Kết nạp.</div><div id="h10c-nguon-ds"></div>', true); hso10cNguonVe(); };
  hso10cNguonVe = function(chiDem){ var e = document.getElementById('h10c-nguon-ds'); if(!e) return; var t = KHO.to(hsoCH().to), ds = cungAp(t), z = HSO.nguon10c ? KHO.to(HSO.nguon10c) : null, dsH = z ? HST.ds(z).filter(function(x){ return x.kh; }) : [], n = dsH.filter(function(x){ return (HSO.knChon||{})[x.kh]; }).length;
    if(chiDem){ var b = document.getElementById('h10c-lay'); if(b) b.textContent = 'Kết nạp '+n+' hộ'; return; }
    e.innerHTML = '<div class="hang-nut">'+ds.map(function(x){ return '<button class="nho'+(x.ma===HSO.nguon10c ? ' bat' : '')+'" data-lenh="h10c.chonNguon" data-to="'+x.ma+'">'+coChuHTML(x.ten || x.ma)+' <small>'+x.ma+'</small></button>'; }).join('')+'</div>'+
      (z ? '<div class="hang-nut"><button class="nho" data-lenh="h10c.hetN" data-v="1">Tích hết</button><button class="nho" data-lenh="h10c.hetN" data-v="0">Bỏ hết</button></div><div class="bang-cuon"><table class="bang hso-tv10a"><thead><tr><th>Kết nạp</th><th>Mã KH</th><th>Họ tên</th><th>Dư nợ</th></tr></thead><tbody>'+
        dsH.map(function(x){ return '<tr><td>'+
          '<input type="checkbox" data-lenh="h10c.tichN" data-su="change" data-k="'+x.kh+'"'+((HSO.knChon||{})[x.kh] ? ' checked' : '')+'></td>'+
          '<td>'+x.kh+'</td><td>'+coChuHTML(tenHoaDau(x.ten||''))+(x.vai ? ' <span class="tc-vt">'+x.vai+'</span>' : '')+'</td><td class="s">'+(x.vay ? tdnTien(x.dn||0) : '—')+'</td></tr>'; }).join('')+'</tbody></table></div>' : '<div class="sl-phu">Chọn 1 tổ nguồn ở trên.</div>')+
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+(z ? '<button class="nho chinh" id="h10c-lay" data-lenh="h10c.lay">Kết nạp '+n+' hộ</button>' : '')+'</div>'; };
  var cu = hsoLap10c;
  hsoLap10c = function(t, X){ return X && X.cu ? cu(t, {cu:1}) : omLap(MK, t, X); };   /* 10C mới; X.cu: gọi mẫu cũ (chip 10C cũ khi chưa có mô-đun riêng) */
  var M = hsoMauK(MK); if(M){ M.mg = omMg([10, 20, 10, 30]); M.ma = '10C/TD mới'; M.ten = 'Biên bản họp kết nạp, cho ra khỏi Tổ — mẫu mới QĐ 70 (từ 01/10/2026)'; M.ghi = ''; }
})();
