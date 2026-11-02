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
  var VV = ['kết nạp tổ viên', 'bầu thay đổi thành viên Ban quản lý Tổ'];   /* 3.452: Về việc chọn nhiều (anh 02/11) */
  var DON = {truongAp:1, chuTri:1, chuTriCv:1, chuTriHoi:1, thuKy:1, toHoi:1, bauTT:1, bauTTCu:1, bauPho:1, bauPhoCu:1, ubHoi:1, ubTT:1, ubPho:1, kyTA:1, kyCT:1};
  omDangKy({k:MK, ma:'10B/TD', phan:['to', 'hoi', 'ub', 'ky'], co:14,
    dien:[['het', 'Điền hết'], ['chuaUB', 'Chừa phê duyệt UBND'], ['tuy', 'Tùy chọn']],   /* 3.452: khối Nhập liệu riêng (quy chuẩn 9.8) */
    phanTen:{to:'Thông tin cuộc họp, kết nạp, bầu thay', hoi:'Chủ trì (Hội)', ub:'Phê duyệt UBND', ky:'Ngày, họ tên dưới chữ ký'},
    o:[{k:'vv', n:'Về việc (chọn 1 hoặc nhiều)', p:'to', l:'chon', md:'kb', nhieu:1, chon:VV, nhanh:1, chonTu:function(V){ return [V.L && V.L.kn.length ? VV[0] : '', V.Bt && (V.Bt.tt || V.Bt.pho) ? VV[1] : ''].filter(Boolean); }},
      {k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1, ui:function(){ return hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay || '', '', 'date'); }},
      {k:'diaDiem', n:'Địa điểm: thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'du', n:'- …/… tổ viên dự họp (số tổ viên trước họp)', p:'to', l:'tu', md:'tu', ng:'số tổ viên trước họp'},
      {k:'toAp', n:'… Tổ TK&VV tại thôn …', p:'to', l:'tu', md:'tu', ng:'ấp của tổ'},
      {k:'toHoi', n:'… thuộc Hội … (không ghi xã / phường)', p:'to', l:'tu', md:'tu', ng:'Hội nhận ủy thác của tổ'},
      {k:'truongAp', n:'- Ông (bà) … là Trưởng thôn', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'chuTri', n:'Chủ trì: Ông (bà) — họ tên', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'chuTriCv', n:'Chủ trì: chức vụ', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội'},
      {k:'chuTriHoi', n:'Chủ trì: Hội (không ghi xã / phường)', p:'hoi', l:'tu', md:'tu', ng:'Hội quản lý tổ'},
      {k:'thuKy', n:'Thư ký: Ông (bà)', p:'to', l:'tu', md:'cham', ng:'tổ phó'},
      {k:'lyDo', n:'1. Lý do tổ chức cuộc họp (3 dòng)', p:'to', l:'kb', md:'cham', cmau:'Kết nạp tổ viên mới và bầu thay đổi thành viên Ban quản lý Tổ'},
      {k:'kn', n:'2a. Kết nạp: các Ông (Bà)', p:'to', l:'tu', md:'tu', ng:'tích Kết nạp ở bảng hộ vay (cột trái)'},
      {k:'knSau', n:'2a. Tổng số tổ viên sau kỳ họp', p:'to', l:'tu', md:'tu', ng:'tự tính'},
      {k:'bauTT', n:'2b. Ông (Bà) … Chức vụ: Tổ trưởng (người mới)', p:'to', l:'tu', md:'tu', ng:'bầu thay ở cột trái / Mẫu 31 tháng trước'},
      {k:'bauTTCu', n:'2b. … thay Ông (Bà) (tổ trưởng cũ)', p:'to', l:'tu', md:'tu', ng:'bầu thay ở cột trái'},
      {k:'bauPho', n:'2b. Ông (Bà) … Chức vụ: Tổ phó (người mới)', p:'to', l:'tu', md:'tu', ng:'bầu thay ở cột trái'},
      {k:'bauPhoCu', n:'2b. … thay Ông (Bà) (tổ phó cũ)', p:'to', l:'tu', md:'tu', ng:'bầu thay ở cột trái'},
      {k:'bq', n:'3. …/… tổ viên biểu quyết tán thành', p:'to', l:'go', md:'cham'},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ubAp', n:'Phê duyệt UBND: tại thôn …', p:'ub', l:'tu', md:'tu', ng:'ấp của tổ'},
      {k:'ubHoi', n:'Phê duyệt UBND: do Hội … quản lý', p:'ub', l:'tu', md:'tu', ng:'Hội của tổ'},
      {k:'ubTT', n:'Phê duyệt UBND: bầu Ông (Bà) … giữ chức vụ Tổ trưởng', p:'ub', l:'tu', md:'tu', ng:'bầu thay'},
      {k:'ubPho', n:'Phê duyệt UBND: và Ông (Bà) … chức vụ Tổ phó', p:'ub', l:'tu', md:'tu', ng:'bầu thay'},
      {k:'ubNgay', n:'Phê duyệt UBND: ngày … tháng … năm', p:'ub', l:'go', md:'cham', ngay:1, ui:function(){ return hsoIn('HSO.o.ubNgay=this.value;hsoHen()', HSO.o.ubNgay || '', '', 'date'); }},
      {k:'kyTA', n:'Họ tên dưới chữ ký Trưởng thôn', p:'ky', l:'tu', md:'tu', ng:'⚙ khai báo ấp'},
      {k:'kyCT', n:'Họ tên dưới chữ ký Chủ trì', p:'ky', l:'tu', md:'tu', ng:'⚙ khai báo Hội'}],
    V:function(t){
      HST.tach(MK, {bau:['bauTT', 'bauTTCu', 'bauPho', 'bauPhoCu'], ub:['ubAp', 'ubHoi', 'ubTT', 'ubPho'], ky:['kyTA', 'kyCT'], chuTri:['chuTriCv', 'chuTriHoi'], hoiTo:['toAp', 'toHoi'], kn:['knSau']});
      var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), Bt = hsoBau(t), h = T.hoi || '', hd = function(x){ return x ? tenHoaDau(x) : x; };
      L.kn = L.kn.slice().sort(function(a, b){ return String(a.kh).localeCompare(String(b.kh), 'vi', {numeric:true}); });   /* in theo Mã KH */
      return {L:L, Bt:{tt:hd(Bt.tt), ttCu:hd(Bt.ttCu), pho:hd(Bt.pho), phoCu:hd(Bt.phoCu)}, ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, capAp:HST.capAp(t, T), capXa:HST.capXa(T),
        du:t ? String(L.truoc) : '', truongAp:hd(T.truongAp), cb:hd(N.cb), cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:HST.hoi(/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h), thuKy:hd(T.pho), sau:t ? String(L.sau) : '', ubNgay:HSO.o.ubNgay,
        gio:HSO.vay.gio, bq:HSO.vay.bq, ketThuc:HSO.vay.ketThuc};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), S = HST.bo(MK, V, G, P, {don:DON}), o = S.o, C = S.C, g = S.g, ong = S.ong;   /* 3.452: quy chuẩn 9.8 — chữ liền in thường, chấm giữ form */
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var nd = ngd('ngay', ['…...', '……', '………']), un = ngd('ubNgay', ['......', '........', '…']), Bt = V.Bt, kn = C('kn') ? V.L.kn : [];
      var hoiX = function(k, ch){ var v = g(k, V.hoiTen); return v ? (V.hoiLa ? 'Hội ' : '')+o(k, ch, {gt:v}) : 'Hội '+o(k, ch, {gt:''}); };
      var vvA = C('vv') ? String(G.gt('vv')||'').split('|').filter(Boolean) : [];
      var knD = (kn.length ? kn : [null, null]).map(function(x){ return x ? P('- Ông (Bà): '+o('kn', '', {gt:tenHoaDau(x.ten)}), J+F+B) : P('- Ông (Bà):'+o('kn', '...................................................................................................', {gt:''}), J+F+B+W); }).join('');
      var bau = function(kM, kC, moi, cv, cu){ var coM = S.coTen(kM, moi);
        return (coM ? S.tabP('- '+ong(kM, '', moi), 'Chức vụ: '+cv, B) : P('- Ông (Bà)'+o(kM, '................……….........., ', {gt:''})+'&nbsp;&nbsp;&nbsp; Chức vụ: '+o(kM, '........................................', {gt:''}), J+F+B+W))+
          (S.coTen(kC, cu) ? P('thay Ông (Bà): '+o(kC, '', {gt:g(kC, cu)}), J+F+B) : P('thay Ông (Bà):'+o(kC, '...............................................................................................', {gt:''}), J+F+B+W)); };
      var lyDo = (function(){ var v = G.gt('lyDo'), L3 = [119, 129, 128].map(function(n){ return Array(n+1).join('.'); });
        var noi = L3.map(function(x, i){ return '<span class="om om-cham" data-o="lyDo"'+(v ? ' style="visibility:hidden"' : '')+'>'+x+'</span>'; }).join('<br>');   /* 3 dòng chấm đúng gốc */
        return '<div style="position:relative">'+P(noi, F+B+W)+(v ? '<div class="om om-'+(OM_KIEU==='mau' ? 'mau' : 'kb')+'" data-o="lyDo" style="position:absolute;left:0;right:0;top:0;bottom:6pt;overflow:hidden;line-height:16pt;text-indent:12.7mm;text-align:justify;font-weight:normal">'+coChuHTML(v)+'</div>' : '')+'</div>'; })();
      var chan = '<div class="kt-giu" style="height:26mm"><div style="position:absolute;left:1.5px;right:1.5px;bottom:0;font-size:10pt;line-height:1.15;text-align:justify">'+
        '<p style="margin:0 0 1mm;width:50mm;height:0;border-top:.5pt solid #000"></p>'+
        P(sup('1')+' - Về việc kết nạp tổ viên và bầu thay đổi thành viên Ban quản lý Tổ TK&amp;VV (Trường hợp nhân sự dự kiến bầu thay thế chưa được kết nạp là tổ viên của Tổ)', 'text-align:justify')+
        P(' - Về việc bầu thay đổi thành viên Ban Quản lý Tổ TK&amp;VV (Trường hợp nhân sự dự kiến bầu thay thế đã là tổ viên của Tổ). ', 'text-align:justify;padding-left:0.9mm')+
        P(sup('2')+' Trường hợp nhân sự dự kiến bầu thay thế chưa được kết nạp là tổ viên của Tổ TT&amp;VV.')+P(sup('3')+' Nếu có.')+'</div></div>';   /* 3 chú thích của gốc — giữ đáy trang 1 */
      var ttB = g('bauTT', Bt.tt), phoB = g('bauPho', Bt.pho);
      var h = P('&nbsp;', 'line-height:13.5pt')+P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt;line-height:18pt')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center;line-height:18pt')+'<div style="position:relative;height:0"><div style="position:absolute;right:0;top:-49.5pt;line-height:1.15">'+P('<b><i>Mẫu số: 10B/TD</i></b>', 'text-align:right;font-size:11pt')+P('<i>Lập 02 liên:</i>', 'text-align:right;font-size:11pt')+
          P('<i>- 01 liên lưu NH </i>', 'text-align:right;font-size:11pt')+P('<i> - 01 liên lưu Tổ</i>', 'text-align:right;font-size:11pt')+'</div></div>'+
        '<p class="ke" data-ke="60" style="width:60mm;margin:0 auto;height:0"></p>'+P('&nbsp;', 'line-height:12pt')+
        S.tieuDe(HST.noi(vvA), '............................................................................', sup('1'))+
        P('<b>Thời gian bắt đầu</b>: '+o('gio', '…….', {canh:'c'})+' giờ '+o('gio', '……', {gt:''})+', ngày '+nd[0]+'/'+nd[1]+'/'+nd[2], J+F+'margin:10pt 0 6pt;line-height:16pt;'+(G.gt('gio') || G.gt('ngay') ? '' : W))+
        P('<b>Địa điểm:</b> '+S.dvA('diaDiem', '………………', '……………………', 1)+', tỉnh '+o('diaDiem', '……………….', {gt:g('diaDiem', V.tinh)}), J+F+B)+
        P('<b>Thành phần tham dự: </b>', J+F+B)+
        P('- '+o('du', '……', {gt:''})+'/'+o('du', '……', {canh:'c'})+' tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) tại '+
          (g('toAp', V.ap) ? V.capAp+' '+o('toAp', '', {gt:g('toAp', V.ap)}) : 'thôn '+o('toAp', '................. ...................................', {gt:''}))+' thuộc '+hoiX('toHoi', '.....................................................................................'), J+F+B+(g('toAp', V.ap) ? '' : W))+
        P('- '+ong('truongAp', '.......................................', V.truongAp, 1)+' là Trưởng '+S.apL+', chứng kiến cuộc họp.', J+F+B+(S.coTen('truongAp', V.truongAp) ? '' : W))+
        (S.coTen('chuTri', V.cb) ? S.tabP('<b>Chủ trì</b>: '+ong('chuTri', '', V.cb, 1), 'Chức vụ: '+o('chuTriCv', '...........................', {gt:g('chuTriCv', V.cv)})+' '+hoiX('chuTriHoi', '………..'), B)
          : P('<b>Chủ trì</b>: Ông (bà)'+o('chuTri', '...................................', {gt:''})+' chức vụ '+o('chuTriCv', '...........................', {gt:g('chuTriCv', V.cv)})+' '+hoiX('chuTriHoi', '………..'), J+F+B+(g('chuTriCv', V.cv) ? '' : W)))+
        P('<b>Thư ký:</b> '+ong('thuKy', '...........................................................................................', V.thuKy, 1), J+F+B+(S.coTen('thuKy', V.thuKy) ? '' : W))+
        P('<b>Nội dung cuộc họp:</b>', F+B)+P('1. Chủ trì cuộc họp tuyên bố lý do tổ chức cuộc họp', J+F+B)+lyDo+
        P('2. Sau khi thảo luận, các tổ viên trong Tổ TK&amp;VV thống nhất:', J+F+B)+P('a) Kết nạp các Ông (Bà) có tên sau là tổ viên của Tổ TK&amp;VV:'+sup('2'), J+F+B)+knD+
        P('- Tổng số tổ viên của tổ sau kỳ họp là: '+o('knSau', '...........', {gt:g('knSau', V.sau), canh:'c'})+' tổ viên.', J+F+B)+
        P('b) Bầu thành viên mới tham gia Ban quản lý Tổ', J+F+B)+bau('bauTT', 'bauTTCu', Bt.tt, 'Tổ trưởng', Bt.ttCu)+bau('bauPho', 'bauPhoCu', Bt.pho, 'Tổ phó', Bt.phoCu)+
        P('3. Kết quả biểu quyết:&nbsp; '+o('bq', '......', {canh:'c'})+'/'+o('bq', '......', {gt:''})+' tổ viên của Tổ tham dự họp biểu quyết tán', J+F+'line-height:16pt;letter-spacing:-0.1pt;margin-bottom:0;'+W+TL)+
        chan+   /* gốc ngắt trang giữa đoạn 3 → dòng đầu đoạn 3 ở trang 1, chú thích ở đáy trang 1 */
        P('thành các nội dung kết nạp tổ viên'+sup('3')+'; bầu tham gia Ban quản lý Tổ và giữ chức vụ Tổ trưởng đối với Ông (Bà) '+o('bauTT', '................……….........., ', {gt:ttB})+(ttB ? ', ' : '')+'giữ chức vụ Tổ phó đối với Ông (Bà) '+o('bauPho', '................………..........', {gt:phoB})+'.', J+B)+
        P('Ban quản lý Tổ TK&amp;VV thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về Quy chế hoạt động của Tổ TK&amp;VV và các quy định liên quan của NHCSXH.', J+F+B)+
        P('Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận cho Ban quản lý Tổ TK&amp;VV được tiếp tục quản lý hoạt động của Tổ.', J+F+B)+
        P('Cuộc họp kết thúc vào '+o('ketThuc', '........', {canh:'c'})+' giờ '+o('ketThuc', '......', {gt:''})+', ngày '+o('ketThuc', '…', {gt:''})+'/'+o('ketThuc', '.......', {gt:''})+'/'+o('ketThuc', '............', {gt:''})+'/.', J+F+B+(G.gt('ketThuc') ? '' : W))+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:53mm"><col style="width:54.7mm"><col style="width:52.3mm"></colgroup><tr style="height:12mm">'+
          [['THƯ KÝ', '(Ký, ghi rõ họ tên)'], ['TRƯỞNG '+S.apL.toUpperCase(), '(Ký, ghi rõ họ tên)'], ['CHỦ TRÌ', '(Ký tên, đóng dấu)']].map(function(x){ return '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>'+x[0]+'</b>', 'text-align:center;margin:2pt 0;line-height:15pt')+P('<i>'+x[1]+'</i>', 'text-align:center;margin:2pt 0;line-height:15pt')+'</td>'; }).join('')+'</tr></table>'+
        [1, 2, 3, 4, 5, 6].map(function(i){ return i===5 ? '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:53mm"><col style="width:54.7mm"><col style="width:52.3mm"></colgroup><tr><td></td><td>'+P('<b>'+o('kyTA', '&nbsp;', {gt:g('kyTA', V.truongAp), rong:50, canh:'c'})+'</b>', 'text-align:center;margin:2pt 0;line-height:15pt')+'</td><td>'+P('<b>'+o('kyCT', '&nbsp;', {gt:g('kyCT', V.cb), rong:48, canh:'c'})+'</b>', 'text-align:center;margin:2pt 0;line-height:15pt')+'</td></tr></table>' : P('&nbsp;', 'margin:2pt 0;line-height:15pt'); }).join('')+
        P('<b>PHÊ DUYỆT CỦA UỶ BAN NHÂN DÂN CẤP XÃ</b>', 'text-align:center;margin:2pt 0;line-height:15pt')+
        P('Chấp thuận kết quả cuộc họp bầu thay đổi thành viên Ban Quản lý Tổ của Tổ TK&amp;VV tại '+(g('ubAp', V.ap) ? V.capAp+' '+o('ubAp', '', {gt:g('ubAp', V.ap)}) : 'thôn '+o('ubAp', '....................................', {gt:''}))+', do '+hoiX('ubHoi', '.................................')+' quản lý, bầu Ông (Bà) '+o('ubTT', '..........................................', {gt:g('ubTT', Bt.tt)})+' giữ chức vụ '+o('ubTT', '………………….', {gt:g('ubTT', Bt.tt) ? 'Tổ trưởng' : ''})+' và Ông (Bà) '+o('ubPho', '..........................................', {gt:g('ubPho', Bt.pho)})+' chức vụ '+o('ubPho', '.........................', {gt:g('ubPho', Bt.pho) ? 'Tổ phó' : ''})+' theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV./.', J+F+'margin:6pt 0;line-height:16pt')+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:45.7%"><col style="width:54.3%"></colgroup><tr><td></td><td style="padding:0 1.9mm">'+
          P('<i>Ngày'+un[0]+'tháng'+un[1]+'năm'+un[2]+'.</i>', 'text-align:center;line-height:18pt')+P('<b>UBND CẤP XÃ</b>', 'text-align:center;line-height:18pt')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center')+'</td></tr></table>';
      return {ma:'10B/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10b = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([20, 20, 20, 30]);
})();
