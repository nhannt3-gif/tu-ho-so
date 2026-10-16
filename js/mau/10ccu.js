/* ===== 3.223 M6 — MẪU 10C/TD CŨ (vào tổ đến 30/09/2026) Biên bản họp kết nạp bổ sung, cho ra khỏi Tổ — trên nền ô, dựng theo file gốc tests/mau_goc/10c_cu.docx =====
   Anh chốt 16/10: chip riêng, độc lập với 10C mới. Ngày họp mặc định chấm.
   Lề 16 / 16 / 16 / 26 mm · Times New Roman 14 · đoạn dòng cố định 17 pt, cách trước 4 pt · gạch đầu dòng treo 16,4 mm · bảng dòng cố định 7 mm. Bỏ file này → app dùng lại mẫu cũ trong hsoLap10c. */
(function(){
  var MK = '10ccu';
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 167.5 - mm(s, 'text-indent') - mm(s, 'margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:-0.25mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:10mm;', E = 'margin-top:4pt;line-height:17pt;';
  var GD = 'margin-left:16.4mm;text-indent:-6.4mm;';   /* gạch đầu dòng treo của gốc: "-" ở 10 mm, chữ ở 16,4 mm */
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }
  omDangKy({k:MK, ma:'10C/TD cũ', phan:['to', 'hoi', 'ky'], co:14,
    o:[{k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'diaDiem', n:'Địa điểm: Ấp (kp) · xã (phường)', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'du', n:'+ Có …/… tổ viên (số tổ viên trước họp)', p:'to', l:'tu', md:'tu', ng:'số tổ viên trước họp'},
      {k:'tt', n:'Tổ trưởng (tên tổ · chủ trì)', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'pho', n:'Thư ký: Tổ phó', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / khai báo'},
      {k:'hoiTo', n:'Tổ thuộc Hội …', p:'to', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'truongAp', n:'Trưởng ấp chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'hoi', n:'Cán bộ Hội chứng kiến · chức vụ · Hội', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'tanThanh', n:'…/… tổ viên tán thành (kết nạp, cho ra)', p:'to', l:'go', md:'cham'},
      {k:'kn', n:'Bảng kết nạp · bảng cho ra', p:'to', l:'tu', md:'tu', ng:'tích kết nạp / cho ra ở cột trái'},
      {k:'sau', n:'3. Tổng số tổ viên sau kỳ họp', p:'to', l:'tu', md:'tu', ng:'tự tính'},
      {k:'tk', n:'3. Tiết kiệm tối thiểu (đồng) · kể từ tháng', p:'to', l:'tukb', md:'tu', ng:'ô "Tiết kiệm tối thiểu" cột trái'},
      {k:'khac', n:'4. Nội dung khác', p:'to', l:'kb', md:'cham'},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ky', n:'Họ tên dưới chữ ký (thư ký, chủ trì, Hội, trưởng ấp)', p:'ky', l:'tu', md:'tu', ng:'tổ / khai báo'}],
    V:function(t){
      var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), h = T.hoi || '', tk = hsoLuu().tkMin || '';
      return {L:L, ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, tt:T.tt, pho:T.pho, du:t ? String(L.truoc) : '', truongAp:T.truongAp, cb:N.cb, cv:N.cv,
        hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h, sau:t ? String(L.sau) : '', tk:tk ? tdnTien(hsoSo(tk)) : ''};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var x = hsoNg(G.gt('ngay')), nd = x ? [x.d, x.m, x.y] : ['', '', ''];
      var hoi = function(k, ch){ return V.hoiLa ? 'Hội '+o(k, ch, {gt:g(k, V.hoiTen)}) : o(k, 'Hội '+ch, {gt:g(k, V.hoiTen)}); };
      var bd = 'border:.5pt solid #000;padding:0 1.9mm;vertical-align:middle;', bang = function(ds){ var r = '<tr style="height:7mm">'+['STT', 'Họ và tên', 'STT', 'Họ và tên'].map(function(x){ return '<td style="'+bd+'">'+P('<b>'+x+'</b>', 'text-align:center')+'</td>'; }).join('')+'</tr>';
        for(var i=0;i<4;i++){ var a = C('kn') && ds[i], b = C('kn') && ds[i+4];
          r += '<tr style="height:7mm"><td style="'+bd+'">'+P(a ? i+1 : '&nbsp;', 'text-align:center')+'</td><td style="'+bd+'">'+P(a ? o('kn', '', {gt:a.ten, rong:66}) : '&nbsp;', 'text-align:center')+'</td>'+
            '<td style="'+bd+'">'+P(b ? i+5 : '&nbsp;', 'text-align:center')+'</td><td style="'+bd+'">'+P(b ? o('kn', '', {gt:b.ten, rong:66}) : '&nbsp;', 'text-align:center')+'</td></tr>'; }
        return '<table style="border-collapse:collapse;table-layout:fixed;width:167.5mm;margin-left:0.7mm"><colgroup>'+[14.4, 71.5, 14.0, 71.9].map(function(w){ return '<col style="width:'+(w*167.5/171.8).toFixed(2)+'mm">'; }).join('')+'</colgroup>'+r+'</table>'; };
      var ky = function(v){ return P('<b>'+o('ky', '&nbsp;', {gt:g('ky', v), rong:75, canh:'c'})+'</b>', 'text-align:center'); }, e = P('&nbsp;');
      var h = '<table class="khung0" style="width:168mm;table-layout:fixed"><colgroup><col style="width:125.5mm"><col style="width:42.5mm"></colgroup>'+
          '<tr style="height:5mm"><td></td><td style="padding:0 1.9mm">'+P('<b><i>Mẫu số: 10C/TD</i></b>', 'text-align:right;font-size:13pt;margin-top:6pt')+'</td></tr>'+
          '<tr><td style="padding:0 1.9mm">'+P('<b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;margin-top:6pt')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center')+
          '<p class="ke" data-ke="57.5" style="width:57.5mm;margin:0.7mm auto 0"></p>'+P('&nbsp;', 'line-height:1.15;margin-top:-0.7mm')+'</td><td></td></tr></table>'+
        P('<b>BIÊN BẢN HỌP</b>', 'text-align:center;font-size:16pt;margin-top:6pt')+P('<b>Về việc kết nạp bổ sung tổ viên, cho tổ viên ra khỏi Tổ TK&amp;VV</b>', 'text-align:center')+P('&nbsp;', 'text-indent:9.5mm')+
        P('- <b>Thời gian bắt đầu:</b> '+o('gio', '….…', {canh:'c'})+' giờ '+o('gio', '….…', {gt:''})+', ngày '+o('ngay', '…....', {gt:nd[0], canh:'c'})+'/'+o('ngay', '…….', {gt:nd[1], canh:'c'})+'/'+o('ngay', '………..', {gt:nd[2], canh:'c'}), J+F+E+W)+
        P('- <b>Địa điểm:</b> Ấp (kp) '+o('diaDiem', '………..……', {gt:g('diaDiem', V.ap)})+', xã (phường) '+o('diaDiem', '…..…………..', {gt:g('diaDiem', V.xa)})+', tỉnh '+coChuHTML(V.tinh || 'Tây Ninh')+'.', J+F+E+W)+
        P('- <b>Thành phần tham dự:</b>', J+F+E)+
        P2('+ Có '+o('du', '…….', {gt:''})+'/'+o('du', '……', {canh:'c'})+' tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) '+o('tt', '……….…………'), 'thuộc '+hoi('hoiTo', '…………………………………'), J+F+E, 'line-height:17pt')+
        P('+ Ông (bà) '+o('truongAp', '………………………')+' là Trưởng ấp chứng kiến cuộc họp.', J+F+E+W)+
        P2('+ Ông (bà) '+o('hoi', '………………………', {gt:g('hoi', V.cb)})+', chức vụ '+o('hoi', '..…….…….', {gt:g('hoi', V.cv)})+' '+hoi('hoi', '……..………..…')+',', 'chứng kiến cuộc họp.', J+F+E, 'line-height:17pt')+
        P2('- <b>Chủ trì:</b> Ông (bà) '+o('tt', '…………………………')+', chức vụ: Tổ trưởng Tổ', 'TK&amp;VV.', J+GD+E, 'line-height:17pt;margin-left:16.4mm')+
        P2('- <b>Thư ký:</b> Ông (bà)'+o('pho', '………………………….…')+', chức vụ: Tổ phó Tổ', 'TK&amp;VV.', J+GD+E, 'line-height:17pt;margin-left:16.4mm')+
        P('<b>NỘI DUNG</b>', 'text-align:center;margin:12pt 0')+
        P('<b>1. Kết nạp bổ sung tổ viên vào Tổ TK&amp;VV: </b>', J+F+'margin:6pt 0')+
        P('Tổng số '+o('tanThanh', '…….', {canh:'c'})+'/'+o('tanThanh', '…….', {gt:''})+' tổ viên dự họp tán thành kết nạp bổ sung các tổ viên sau:', J+F+'margin:6pt 0;'+W)+bang(V.L.kn)+
        P('<b>2. Đối với việc cho tổ viên ra khỏi Tổ TK&amp;VV:</b> ', J+F+'margin:6pt 0')+
        P('Số tổ viên dự họp '+o('tanThanh', '…….', {gt:''})+' /'+o('tanThanh', '…….', {gt:''})+' tán thành cho ra khỏi tổ đối với các tổ viên sau:', J+F+'margin:6pt 0;'+W)+bang(V.L.ra).replace('<table style="', '<table style="margin-bottom:12pt;')+
        P('<b>3. </b>Tổng số tổ viên của Tổ sau kỳ họp này là: '+o('sau', '………', {canh:'c'})+' Các tổ viên mới được kết nạp cam kết thực hiện tốt quy ước hoạt động của Tổ. Cam kết thực hiện gửi tiền tiết kiệm hàng tháng với mức tối thiểu là '+o('tk', '………….')+' đồng, kể từ tháng ……/………..', J+F+'margin:0 0 6pt')+
        P('<b>4. Nội dung khác (nếu có):</b>', J+F+'margin:12pt 0 6pt')+
        (function(){ var v = G.gt('khac'), ds = []; for(var i=0;i<10;i++) ds.push(P('<span class="om om-cham" data-o="khac"'+(v ? ' style="visibility:hidden"' : '')+'>…………………………………………………………………………………………</span>', J+'margin:6pt 0;'+W));
          return '<div style="position:relative">'+ds.join('')+(v ? '<div class="om om-'+(OM_KIEU==='mau' ? 'mau' : 'kb')+'" data-o="khac" style="position:absolute;left:0;right:0;top:6pt;bottom:6pt;overflow:hidden;line-height:22.2pt;text-align:justify">'+coChuHTML(v)+'</div>' : '')+'</div>'; })()+
        P('Nội dung Biên bản được thông qua và các thành phần dự họp đều tán thành.', J+F+'margin:12pt 0 6pt;'+W)+
        P('Cuộc họp kết thúc vào '+o('ketThuc', '…..', {canh:'c'})+' giờ'+o('ketThuc', '…..', {gt:''})+' , ngày '+o('ketThuc', '….', {gt:''})+' /'+o('ketThuc', '…..', {gt:''})+' /'+o('ketThuc', '……..', {gt:''}), 'text-indent:9.5mm;margin:3pt 0')+
        '<table class="khung0" style="width:168mm;table-layout:fixed"><colgroup><col style="width:50%"><col style="width:50%"></colgroup><tr><td style="padding:0 1.9mm;vertical-align:top">'+
          P('<b>THƯ KÝ</b>', 'text-align:center;margin-top:6pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+e+e+e+ky(V.pho)+e+e+
          P('<b>HỘI, ĐOÀN THỂ </b>', 'text-align:center')+P('<b>CẤP XÃ (PHƯỜNG)</b>', 'text-align:center')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center')+e+ky(V.cb)+'</td>'+
          '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>CHỦ TRÌ</b>', 'text-align:center;margin-top:6pt')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+e+e+e+ky(V.tt)+e+e+
          P('<b>TRƯỞNG ẤP (KP)</b>', 'text-align:center')+P('<i>(Ký, ghi rõ họ tên)</i>', 'text-align:center')+e+ky(V.truongAp)+'</td></tr></table>';
      return {ma:'10C/TD (mẫu cũ)', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10cCu = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([16, 16, 16, 26]);   /* lề theo file gốc */
})();
