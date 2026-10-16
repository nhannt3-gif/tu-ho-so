/* ===== 3.223 M6 — MẪU 10B/TD Biên bản họp kết nạp tổ viên, bầu thay đổi Ban quản lý Tổ (QĐ 70) trên nền ô — dựng theo file gốc tests/mau_goc/10b.docx =====
   Lề 20 / 20 / 20 / 30 mm · Times New Roman 14 · đoạn dòng cố định 16 pt, cách 6 pt, thụt 12,7 mm · 3 chú thích chân trang 1 (giữ đáy trang).
   Ngày họp / ngày UBND mặc định chấm (anh chốt). Bỏ file này → app dùng lại hsoLap10b cũ. */
(function(){
  var MK = '10b';
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
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.7mm;', B = 'margin:0 0 6pt;line-height:16pt;';   /* cách 6 pt dồn sau đoạn: đầu trang không thêm khoảng */
  function sup(x){ return '<span style="font-size:58%;vertical-align:33%;line-height:0">'+x+'</span>'; }
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }
  omDangKy({k:MK, ma:'10B/TD', phan:['to', 'hoi', 'ub', 'ky'], co:14,
    o:[{k:'vv', n:'"Về việc …"', p:'to', l:'tu', md:'tu', ng:'có tích kết nạp / bầu thay → tự ghi'},
      {k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'diaDiem', n:'Địa điểm: Thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'du', n:'- …/… tổ viên dự họp (số tổ viên trước họp)', p:'to', l:'tu', md:'tu', ng:'số tổ viên trước họp'},
      {k:'hoiTo', n:'Tổ tại thôn … thuộc Hội …', p:'to', l:'tu', md:'tu', ng:'tổ — Hội nhận ủy thác'},
      {k:'truongAp', n:'Trưởng thôn chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'chuTri', n:'Chủ trì: Ông (bà) · chức vụ · Hội', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'thuKy', n:'Thư ký: Ông (bà)', p:'to', l:'tu', md:'cham', ng:'tổ phó'},
      {k:'lyDo', n:'1. Lý do tổ chức cuộc họp (3 dòng)', p:'to', l:'kb', md:'cham', cmau:'Kết nạp tổ viên mới và bầu thay đổi thành viên Ban quản lý Tổ'},
      {k:'kn', n:'2a. Kết nạp: các Ông (Bà) · tổng số sau họp', p:'to', l:'tu', md:'tu', ng:'tích kết nạp ở cột trái'},
      {k:'bau', n:'2b. Bầu thay: Ông (Bà) · chức vụ · thay Ông (Bà)', p:'to', l:'tu', md:'tu', ng:'bầu thay ở cột trái / Mẫu 31 tháng trước'},
      {k:'bq', n:'3. …/… tổ viên biểu quyết tán thành', p:'to', l:'go', md:'cham'},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ub', n:'Phê duyệt UBND: thôn · Hội · người được bầu · chức vụ', p:'ub', l:'tu', md:'tu', ng:'tổ / bầu thay'},
      {k:'ubNgay', n:'Phê duyệt UBND: ngày … tháng … năm', p:'ub', l:'go', md:'cham', ngay:1},
      {k:'ky', n:'Họ tên dưới chữ ký (trưởng thôn, chủ trì)', p:'ky', l:'tu', md:'tu', ng:'khai báo'}],
    V:function(t){
      var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), Bt = hsoBau(t), h = T.hoi || '';
      return {L:L, Bt:Bt, vv:[L.kn.length ? 'kết nạp tổ viên' : '', Bt.tt || Bt.pho ? 'bầu thay đổi thành viên Ban quản lý Tổ' : ''].filter(Boolean).join(', '), ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh,
        du:t ? String(L.truoc) : '', truongAp:T.truongAp, cb:N.cb, cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h, thuKy:T.pho, sau:t ? String(L.sau) : '', ubNgay:HSO.o.ubNgay};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = G.o, C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ return C(k) && v!=null ? String(v) : ''; };
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var nd = ngd('ngay', ['…...', '……', '………']), un = ngd('ubNgay', ['......', '........', '…']), Bt = V.Bt, kn = C('kn') ? V.L.kn : [];
      var hoi = function(k, ch){ return V.hoiLa ? 'Hội '+o(k, ch, {gt:g(k, V.hoiTen)}) : o(k, 'Hội '+ch, {gt:g(k, V.hoiTen)}); };
      var knD = (kn.length>2 ? kn : [kn[0], kn[1]]).map(function(x, i){ return P('- Ông (Bà):'+(i ? ' ' : '')+o('kn', i ? '...................................................................................................' : '....................................................................................................', {gt:x ? x.ten : ''}), J+F+B+W); }).join('');
      var bau = function(moi, cv, cu){ return P('- Ông (Bà)'+o('bau', '................……….........., ', {gt:g('bau', moi)})+'&nbsp;&nbsp;&nbsp; Chức vụ: '+o('bau', '........................................', {gt:moi ? g('bau', cv) : ''}), J+F+B+W)+
        P('thay Ông (Bà):'+o('bau', '...............................................................................................', {gt:g('bau', cu)}), J+F+B+W); };
      var lyDo = (function(){ var v = G.gt('lyDo'), L3 = [119, 129, 128].map(function(n){ return Array(n+1).join('.'); });
        var noi = L3.map(function(x, i){ return '<span class="om om-cham" data-o="lyDo"'+(v ? ' style="visibility:hidden"' : '')+'>'+x+'</span>'; }).join('<br>');   /* 3 dòng chấm đúng gốc */
        return '<div style="position:relative">'+P(noi, F+B+W)+(v ? '<div class="om om-'+(OM_KIEU==='mau' ? 'mau' : 'kb')+'" data-o="lyDo" style="position:absolute;left:0;right:0;top:0;bottom:6pt;overflow:hidden;line-height:16pt;text-indent:12.7mm;text-align:justify">'+coChuHTML(v)+'</div>' : '')+'</div>'; })();
      var chan = '<div class="kt-giu" style="height:26mm"><div style="position:absolute;left:1.5px;right:1.5px;bottom:0;font-size:10pt;line-height:1.15;text-align:justify">'+
        '<p style="margin:0 0 1mm;width:50mm;height:0;border-top:.5pt solid #000"></p>'+
        P(sup('1')+' - Về việc kết nạp tổ viên và bầu thay đổi thành viên Ban quản lý Tổ TK&amp;VV (Trường hợp nhân sự dự kiến bầu thay thế chưa được kết nạp là tổ viên của Tổ)', 'text-align:justify')+
        P(' - Về việc bầu thay đổi thành viên Ban Quản lý Tổ TK&amp;VV (Trường hợp nhân sự dự kiến bầu thay thế đã là tổ viên của Tổ). ', 'text-align:justify;padding-left:0.9mm')+
        P(sup('2')+' Trường hợp nhân sự dự kiến bầu thay thế chưa được kết nạp là tổ viên của Tổ TT&amp;VV.')+P(sup('3')+' Nếu có.')+'</div></div>';   /* 3 chú thích của gốc — giữ đáy trang 1 */
      var h = P('&nbsp;', 'line-height:13.5pt')+P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt;line-height:18pt')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center;line-height:18pt')+'<div style="position:relative;height:0"><div style="position:absolute;right:0;top:-49.5pt;line-height:1.15">'+P('<b><i>Mẫu số: 10B/TD</i></b>', 'text-align:right;font-size:11pt')+P('<i>Lập 02 liên:</i>', 'text-align:right;font-size:11pt')+
          P('<i>- 01 liên lưu NH </i>', 'text-align:right;font-size:11pt')+P('<i> - 01 liên lưu Tổ</i>', 'text-align:right;font-size:11pt')+'</div></div>'+
        '<p class="ke" data-ke="60" style="width:60mm;margin:0 auto;height:0"></p>'+P('&nbsp;', 'line-height:18pt')+
        P('<b>BIÊN BẢN HỌP</b>', 'text-align:center;line-height:18pt')+P('<b>Về việc '+o('vv', '............................................................................')+'</b>'+sup('1'), 'text-align:center')+
        P('<b>Thời gian bắt đầu</b>: '+o('gio', '…….', {canh:'c'})+' giờ'+o('gio', '……', {gt:''})+', ngày'+nd[0]+'/'+nd[1]+'/'+nd[2], J+F+'margin:12pt 0 6pt;line-height:16pt;letter-spacing:-0.2pt;'+W)+
        P('<b>Địa điểm:</b> Thôn'+o('diaDiem', '………………', {gt:g('diaDiem', V.ap)})+', xã'+o('diaDiem', '……………………', {gt:g('diaDiem', V.xa)})+', tỉnh'+o('diaDiem', '……………….', {gt:g('diaDiem', V.tinh)}), J+F+B+'letter-spacing:-0.2pt;'+W)+
        P('<b>Thành phần tham dự: </b>', J+F+B+'letter-spacing:-0.2pt')+
        P2('- '+o('du', '……', {gt:''})+'/'+o('du', '……', {canh:'c'})+'tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) tại thôn', o('hoiTo', '................. ...................................', {gt:g('hoiTo', V.ap)})+'thuộc', J+F+'line-height:16pt;letter-spacing:-0.2pt;', 'line-height:16pt;letter-spacing:-0.2pt')+
        P(hoi('hoiTo', '.....................................................................................'), J+B+'letter-spacing:-0.2pt;'+W)+
        P('- Ông (bà)'+o('truongAp', '...............................................')+'là Trưởng thôn, chứng kiến cuộc họp.  ', J+F+B+'letter-spacing:-0.2pt;'+W)+
        P('<b>Chủ trì</b>: Ông (bà)'+o('chuTri', '...................................', {gt:g('chuTri', V.cb)})+'chức vụ'+o('chuTri', '...........................', {gt:g('chuTri', V.cv)})+hoi('chuTri', '………..'), J+F+B+'letter-spacing:-0.2pt;'+W)+
        P('<b>Thư ký:</b> Ông (bà)'+o('thuKy', '...........................................................................................')+' ', J+F+B+'letter-spacing:-0.2pt;'+W)+
        P('<b>Nội dung cuộc họp</b><b>:</b>', F+B)+P('1. Chủ trì cuộc họp tuyên bố lý do tổ chức cuộc họp', J+F+B)+lyDo+
        P('2. Sau khi thảo luận, các tổ viên trong Tổ TK&amp;VV thống nhất:', J+F+B)+P('a) Kết nạp các Ông (Bà) có tên sau là tổ viên của Tổ TK&amp;VV:'+sup('2'), J+F+B)+knD+
        P('- Tổng số tổ viên của tổ sau kỳ họp là:'+o('kn', '...........', {gt:g('kn', V.sau), canh:'c'})+'tổ viên. ', J+F+B+W)+
        P('b) Bầu thành viên mới tham gia Ban quản lý Tổ', J+F+B)+bau(Bt.tt, 'Tổ trưởng', Bt.ttCu)+bau(Bt.pho, 'Tổ phó', Bt.phoCu)+
        P2('3. Kết quả biểu quyết:&nbsp; '+o('bq', '......', {canh:'c'})+'/'+o('bq', '......', {gt:''})+' tổ viên của Tổ tham dự họp biểu quyết tán', 'thành các nội dung kết nạp tổ viên'+sup('3')+'; bầu tham gia Ban quản lý Tổ và giữ chức vụ Tổ', J+F+'line-height:16pt;letter-spacing:-0.1pt;', 'line-height:16pt;letter-spacing:-0.1pt;'+TL)+
        chan+   /* gốc ngắt trang giữa đoạn 3 → tách đúng dòng gốc, chú thích ở đáy trang 1 */
        P2('trưởng đối với Ông (Bà)'+o('bau', '................……….........., ', {gt:g('bau', Bt.tt)})+'giữ chức vụ Tổ phó đối với Ông', '(Bà)'+o('bau', '................………..........', {gt:g('bau', Bt.pho)}), J+'line-height:16pt;letter-spacing:-0.1pt;', B+'letter-spacing:-0.1pt')+
        P('Ban quản lý Tổ TK&amp;VV thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về Quy chế hoạt động của Tổ TK&amp;VV và các quy định liên quan của NHCSXH.', J+F+B+'letter-spacing:-0.2pt')+
        P('Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận cho Ban quản lý Tổ TK&amp;VV được tiếp tục quản lý hoạt động của Tổ.', J+F+B)+
        P('Cuộc họp kết thúc vào'+o('ketThuc', '........', {canh:'c'})+'giờ'+o('ketThuc', '......', {gt:''})+', ngày'+o('ketThuc', '…', {gt:''})+'/'+o('ketThuc', '.......', {gt:''})+'/'+o('ketThuc', '............', {gt:''})+'/.', J+F+B+W)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:53mm"><col style="width:54.7mm"><col style="width:52.3mm"></colgroup><tr style="height:12mm">'+
          [['THƯ KÝ', '(Ký, ghi rõ họ tên)'], ['TRƯỞNG THÔN', '(Ký, ghi rõ họ tên)'], ['CHỦ TRÌ', '(Ký tên, đóng dấu)']].map(function(x){ return '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>'+x[0]+'</b>', 'text-align:center;font-size:12pt;margin:2pt 0;line-height:15pt')+P('<i>'+x[1]+'</i>', 'text-align:center;font-size:12pt;margin:2pt 0;line-height:15pt')+'</td>'; }).join('')+'</tr></table>'+
        [1, 2, 3, 4, 5, 6, 7].map(function(i){ return i===5 ? '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:53mm"><col style="width:54.7mm"><col style="width:52.3mm"></colgroup><tr><td></td><td>'+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.truongAp), rong:50, canh:'c'})+'</b>', 'text-align:center;margin:2pt 0;line-height:15pt')+'</td><td>'+P('<b>'+o('ky', '&nbsp;', {gt:g('ky', V.cb), rong:48, canh:'c'})+'</b>', 'text-align:center;margin:2pt 0;line-height:15pt')+'</td></tr></table>' : P('&nbsp;', 'margin:2pt 0;line-height:15pt'); }).join('')+
        P('PHÊ DUYỆT CỦA UỶ BAN NHÂN DÂN CẤP XÃ', 'text-align:center;margin:2pt 0;line-height:15pt')+
        P('Chấp thuận kết quả cuộc họp bầu thay đổi thành viên Ban Quản lý Tổ của Tổ TK&amp;VV tại thôn '+o('ub', '....................................', {gt:g('ub', V.ap)})+', do '+(V.hoiLa ? 'Hội'+o('ub', '.................................', {gt:g('ub', V.hoiTen)}) : o('ub', 'Hội.................................', {gt:g('ub', V.hoiTen)}))+'quản lý, bầu Ông (Bà)'+o('ub', '..........................................', {gt:g('ub', Bt.tt)})+'giữ chức vụ '+o('ub', '………………….', {gt:Bt.tt ? g('ub', 'Tổ trưởng') : ''})+' và Ông (Bà) '+o('ub', '..........................................', {gt:g('ub', Bt.pho)})+' chức vụ '+o('ub', '.........................', {gt:Bt.pho ? g('ub', 'Tổ phó') : ''})+' theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV./.', J+F+'margin:6pt 0;line-height:16pt;letter-spacing:-0.1pt')+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:45.7%"><col style="width:54.3%"></colgroup><tr><td></td><td style="padding:0 1.9mm">'+
          P('<i>Ngày'+un[0]+'tháng'+un[1]+'năm'+un[2]+'.</i>', 'text-align:center;line-height:18pt')+P('<b>UBND CẤP XÃ</b>', 'text-align:center;font-size:12pt;line-height:18pt')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center;font-size:12pt')+'</td></tr></table>';
      return {ma:'10B/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10b = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([20, 20, 20, 30]);
})();
