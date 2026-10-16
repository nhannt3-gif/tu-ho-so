/* ===== 3.223 M6 — MẪU 10D/TD Biên bản họp giải thể Tổ TK&VV (QĐ 70) — MẪU MỚI, dựng trên nền ô theo file gốc tests/mau_goc/10d.docx =====
   Anh chốt 16/10 (phương án a): thêm 10D vào Hồ sơ Tổ, đồng bộ cách làm với 10A / 10B. Ngày mặc định chấm.
   Lề 20 / 20 / 20 / 30 mm · Times New Roman 14 · đoạn dòng cố định 15 pt, cách 4–5 pt, thụt 12,7 mm. Bỏ file này → chip 10D báo chưa có mô-đun. */
(function(){
  var MK = '10d';
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm(s, 'text-indent') - mm(s, 'margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:-0.25mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.7mm;';
  var B4 = 'margin:0 0 4pt;line-height:15pt;', B5 = 'margin:0 0 5pt;line-height:15pt;';   /* cách dồn sau đoạn: đầu trang không thêm khoảng */
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }
  omDangKy({k:MK, ma:'10D/TD', phan:['to', 'hoi', 'ub', 'ky'], co:14,
    o:[{k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'diaDiem', n:'Địa điểm: Thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'hinhThuc', n:'Hình thức họp ☒', p:'to', l:'kb', md:'cham', cmau:'Trực tiếp'},
      {k:'ungDung', n:'Thông qua ứng dụng (họp trực tuyến)', p:'to', l:'kb', md:'cham'},
      {k:'du', n:'- …/… tổ viên dự họp (số tổ viên của tổ)', p:'to', l:'tu', md:'tu', ng:'số tổ viên của tổ'},
      {k:'hoiTo', n:'Tổ tại thôn … thuộc Hội …', p:'to', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'truongAp', n:'Trưởng thôn chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'chuTri', n:'Chủ trì: Ông (Bà) · chức vụ · Hội', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'thuKy', n:'Thư ký: Ông (Bà)', p:'to', l:'tu', md:'cham', ng:'tổ phó'},
      {k:'yKien', n:'2. Ý kiến các tổ viên và thành phần dự họp', p:'to', l:'kb', md:'cham', cmau:'Các tổ viên thống nhất giải thể Tổ.'},
      {k:'ubXa', n:'Đề nghị UBND xã … chấp thuận', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ub', n:'Phê duyệt UBND: thôn · Hội · tổ trưởng · tổ phó', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ubNgay', n:'Phê duyệt UBND: ngày … tháng … năm', p:'ub', l:'go', md:'cham', ngay:1},
      {k:'ky', n:'Họ tên dưới chữ ký (trưởng thôn, chủ trì)', p:'ky', l:'tu', md:'tu', ng:'khai báo'}],
    V:function(t){
      var T = hsoTo(t), tv = hsoTVTo(t), N = hsoNguoiHoi(t), h = T.hoi || '';
      return {ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, du:t ? String(tv.length) : '', truongAp:T.truongAp, cb:N.cb, cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h,
        thuKy:T.pho, tt:T.tt, pho:T.pho, ubNgay:HSO.o.ubNgay};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var nd = ngd('ngay', ['…...', '……', '………']), un = ngd('ubNgay', ['......', '........', '.....']);
      var hoi = function(k, ch){ return V.hoiLa ? 'Hội'+o(k, ch, {gt:g(k, V.hoiTen)}) : o(k, 'Hội'+ch, {gt:g(k, V.hoiTen)}); };
      var ck = function(on){ return '<span class="om om-'+(C('hinhThuc') ? (OM_KIEU==='mau' ? 'mau' : 'kb') : 'cham')+'" data-o="hinhThuc">'+(C('hinhThuc') && on ? '☒' : '☐')+'</span>'; }, ht = G.gt('hinhThuc');
      var yk = (function(){ var v = G.gt('yKien'), c = omCach(MK, 'yKien'), ch = '............................';   /* có chữ: giữ dòng chấm của gốc (ẩn), chữ phủ lên — như khối ô 07b */
        if(!v) return P('<span class="om om-cham" data-o="yKien">'+ch+'</span>', J+F+B5);
        return '<div style="position:relative">'+P('<span style="visibility:hidden">'+ch+'</span>', J+F+B5)+'<div class="om om-'+(c==='mau' ? 'mau' : c)+'" data-o="yKien" style="position:absolute;left:0;right:0;top:0;height:15pt;overflow:hidden;line-height:15pt;text-indent:12.7mm;text-align:justify">'+coChuHTML(v)+'</div></div>'; })();
      var h = P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt')+
        '<div style="position:relative;height:0"><div style="position:absolute;right:0;top:-19mm;line-height:1.15">'+P('<b>Mẫu số:10<i>D/TD</i></b>', 'text-align:right;font-size:12pt')+P('<i>(Lập 01 liên lưu NH)</i>', 'text-align:right;font-size:12pt')+'</div></div>'+   /* gốc: hộp chữ nằm trên lề trên */
        P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center')+'<p class="ke" data-ke="60" style="width:60mm;margin:0.3mm auto 0;height:0"></p>'+P('&nbsp;', 'text-align:center')+
        P('<b>BIÊN BẢN HỌP </b>', 'text-align:center')+P('<b>Về việc giải thể Tổ Tiết kiệm và vay vốn</b>', 'text-align:center')+P('&nbsp;', 'margin:6pt 0;line-height:16pt')+
        P('<b>Thời gian bắt đầu</b>: '+o('gio', '…….', {canh:'c'})+' giờ'+o('gio', '……', {gt:''})+', ngày'+nd[0]+'/'+nd[1]+'/'+nd[2], J+F+B4+'letter-spacing:-0.2pt;'+W)+
        P('<b>Địa điểm:</b> Thôn'+o('diaDiem', '………………', {gt:g('diaDiem', V.ap)})+', xã'+o('diaDiem', '……………………', {gt:g('diaDiem', V.xa)})+', tỉnh'+o('diaDiem', '……………….', {gt:g('diaDiem', V.tinh)}), J+F+B4+'letter-spacing:-0.2pt;'+W)+
        P2('<b>Hình thức họp</b>: &nbsp; &nbsp; '+ck(/^trực tiếp$/i.test(ht))+' Trực tiếp &nbsp; &nbsp; '+ck(/^trực tuyến$/i.test(ht))+' Trực tuyến &nbsp; &nbsp; '+ck(/kết hợp/i.test(ht))+' Trực tiếp kết', 'hợp trực tuyến.', J+F+'line-height:15pt;letter-spacing:-0.5pt;', B4+'letter-spacing:-0.5pt')+
        P('Thông qua ứng dụng:', F+'line-height:15pt;margin-bottom:0')+P(o('ungDung', '………………………………………………………'), B4+W)+
        P('<b>Thành phần tham dự: </b>', J+F+B4+'letter-spacing:-0.2pt')+
        P2('- '+o('du', '……', {gt:''})+'/'+o('du', '……', {canh:'c'})+'tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) tại thôn', o('hoiTo', '................. ...................................', {gt:g('hoiTo', V.ap)})+'thuộc', J+F+'line-height:15pt;letter-spacing:-0.2pt;', 'line-height:15pt;letter-spacing:-0.2pt')+
        P(hoi('hoiTo', '...................................................................'), J+B4+'letter-spacing:-0.2pt;'+W)+
        P('- Ông (Bà)'+o('truongAp', '................................................')+'là Trưởng thôn, chứng kiến cuộc họp. ', J+F+B4+'letter-spacing:-0.2pt;'+W)+
        P('<b>Chủ trì</b>: Ông (Bà)'+o('chuTri', '.....................................', {gt:g('chuTri', V.cb)})+'chức vụ'+o('chuTri', '...........................', {gt:g('chuTri', V.cv)})+hoi('chuTri', '………..'), J+F+B4+'letter-spacing:-0.2pt;'+W)+
        P('<b>Thư ký:</b> Ông (Bà)'+o('thuKy', '...............................................................')+' ', J+F+B5+'letter-spacing:-0.2pt;'+W)+
        P('<b>Nội dung cuộc họp:</b>', F+B5)+P('<b>1. Chủ trì cuộc họp tuyên bố lý do tổ chức cuộc họp </b>', J+F+B5)+
        P('Tổ tự nguyện giải thể do các tổ viên không còn nhu cầu vay vốn và đã hoàn thành nghĩa vụ trả nợ gốc, nợ lãi cho ngân hàng.', J+F+B5)+
        P('<b>2. Ý kiến các tổ viên và thành phần dự họp</b>', J+F+B5)+yk+
        P('Biên bản này được lập thành 01 bản và được các thành phần tham dự cuộc họp nhất trí thông qua, đề nghị UBND xã'+o('ubXa', '............................', {gt:g('ubXa', V.xa)})+'chấp thuận Tổ TK&amp;VV được giải thể. ', J+F+B5)+
        P('Cuộc họp kết thúc vào'+o('ketThuc', '........', {canh:'c'})+'giờ'+o('ketThuc', '......', {gt:''})+', ngày'+o('ketThuc', '….', {gt:''})+'/'+o('ketThuc', '.......', {gt:''})+'/'+o('ketThuc', '............', {gt:''})+' ./.', J+F+B5+W)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:58.9mm"><col style="width:48.9mm"><col style="width:52.2mm"></colgroup><tr>'+
          [['THƯ KÝ', '(Ký, ghi rõ họ tên)', ''], ['TRƯỞNG THÔN', '(Ký, ghi rõ họ tên)', V.truongAp], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', V.cb]].map(function(x){ return '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>'+x[0]+'</b>', 'text-align:center;font-size:12pt')+P('<i>'+x[1]+'</i>', 'text-align:center;font-size:12pt')+'</td>'; }).join('')+'</tr></table>'+
        P('&nbsp;', B5)+'<table class="khung0" style="width:160mm;table-layout:fixed;margin-bottom:5pt"><colgroup><col style="width:58.9mm"><col style="width:48.9mm"><col style="width:52.2mm"></colgroup><tr><td></td><td>'+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.truongAp), rong:45, canh:'c'})+'</b>', 'text-align:center;line-height:15pt')+'</td><td>'+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.cb), rong:48, canh:'c'})+'</b>', 'text-align:center;line-height:15pt')+'</td></tr></table>'+
        P('&nbsp;', 'text-align:center;margin:0 0 16pt;line-height:15pt')+
        P('PHÊ DUYỆT CỦA UỶ BAN NHÂN DÂN CẤP XÃ', 'text-align:center;font-size:13pt;'+B5)+
        P('Chấp thuận giải thể Tổ TK&amp;VV tại thôn '+o('ub', '....................................', {gt:g('ub', V.ap)})+', thuộc', J+F+W+TL+'line-height:15pt;margin:0')+   /* ngắt dòng đúng chỗ gốc */
        P((V.hoiLa ? 'Hội'+o('ub', '.................................', {gt:g('ub', V.hoiTen)}) : o('ub', 'Hội.................................', {gt:g('ub', V.hoiTen)}))+'quản lý, do Ông (Bà)'+o('ub', '...........................................', {gt:g('ub', V.tt)})+' làm Tổ', J+W+TL+'line-height:15pt;margin:0')+
        P('trưởng và Ông (Bà) '+o('ub', '..........................................', {gt:g('ub', V.pho)})+' làm Tổ phó.', J+W+B5)+
        P('<i>Ngày'+un[0]+'tháng'+un[1]+'năm'+un[2]+'</i>', 'text-align:center;margin-left:79.7mm;margin-right:1.9mm')+P('<b>UBND CẤP XÃ</b>', 'text-align:center;font-size:12pt;margin-left:79.7mm;margin-right:1.9mm')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center;font-size:12pt;margin-left:79.7mm;margin-right:1.9mm');   /* gốc là bảng 2 cột; dựng bằng đoạn lùi lề để dòng cuối sang trang 2 như gốc */
      return {ma:'10D/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10d = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([20, 20, 20, 30]);
})();
