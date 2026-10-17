/* ===== 3.223 M4 — MẪU 01/TD trên nền ô (js/31-o-mau.js) — dựng theo file gốc tests/mau_goc/01td.docx =====
   Lề 10 / 19,6 / 6,3 / 21,1 mm · Times New Roman 13 · cách dòng đơn (1,15) · thụt đầu dòng, cách đoạn theo Word · chuỗi chấm đúng gốc.
   Khác gốc (giữ chức năng cũ theo thẻ chương trình): thẻ CT bật "UBND" → khối Xác nhận của UBND xã cạnh chỗ người vay ký; thẻ CT "NHCSXH" → "Đề nghị NHCSXH cho vay".
   Bỏ file này khỏi index.html → app dùng lại hsoLap01td cũ trong js/25. */
(function(){
  var MK = '01td';
  function P(noi, s){ return '<p style="margin:0;'+(s||'')+'">'+noi+'</p>'; }   /* đoạn có kiểu theo gốc */
  function TR(pt){ return 'margin:'+pt+'pt 0 0;'; }   /* cách đoạn trên (pt) */
  var J = 'white-space:nowrap;', JJ = 'text-align:justify;', T1 = 'text-indent:12.7mm;', T2 = 'text-indent:9.6mm;';
  omDangKy({k:MK, ma:'01/TD', phan:['nhs', 'kh', 'ub', 'nh'], co:14,
    o:[{k:'ct', n:'Chương trình cho vay', p:'kh', l:'tu', md:'tu', ng:'thẻ chương trình của hộ'},
      {k:'kinhGui', n:'Kính gửi (tên Ngân hàng)', p:'nhs', l:'tukb', md:'tu', ng:'⚙ Khai báo đơn vị › PGD › Kính gửi'},
      {k:'ten', n:'Họ tên người vay', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'ns', n:'Năm sinh', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'cccd', n:'Số CC/CCCD', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'ncap', n:'Ngày cấp CCCD', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'noiCap', n:'Nơi cấp CCCD', p:'kh', l:'tu', md:'tu', ng:'tự tính theo ngày cấp'},
      {k:'thon', n:'Địa chỉ — thôn (ấp)', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (tổ / ấp)'},
      {k:'xa', n:'Địa chỉ — xã (phường)', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (tổ / xã)'},
      {k:'tt', n:'Tổ trưởng Tổ TK&VV', p:'kh', l:'tu', md:'tu', ng:'tổ của hộ — M31 / Danh sách tổ'},
      {k:'hoi', n:'Tổ chức Hội quản lý', p:'kh', l:'tu', md:'tu', ng:'tổ của hộ — Hội nhận ủy thác'},
      {k:'tien', n:'Đề nghị cho vay số tiền', p:'kh', l:'tu', md:'tu', ng:'③ Phương án'},
      {k:'tienChu', n:'Số tiền bằng chữ', p:'kh', l:'tu', md:'tu', ng:'③ Phương án (đọc số)'},
      {k:'md', n:'Để thực hiện phương án', p:'kh', l:'tu', md:'tu', ng:'③ Phương án / thẻ chương trình'},
      {k:'tong', n:'Tổng nhu cầu vốn', p:'kh', l:'tu', md:'tu', ng:'vốn vay + vốn tự có'},
      {k:'tuCo', n:'Vốn tự có tham gia', p:'kh', l:'tu', md:'tu', ng:'③ Phương án'},
      {k:'vay', n:'Vốn vay NHCSXH', p:'kh', l:'tu', md:'tu', ng:'③ Phương án'},
      {k:'bang', n:'Bảng đối tượng · số lượng · thành tiền', p:'kh', l:'tu', md:'tu', ng:'③ Phương án'},
      {k:'th', n:'Thời hạn xin vay (tháng)', p:'kh', l:'tu', md:'tu', ng:'③ Phương án / thẻ chương trình'},
      {k:'ky', n:'Kỳ hạn trả nợ (tháng/lần)', p:'kh', l:'tu', md:'tu', ng:'③ Phương án / thẻ chương trình'},
      {k:'hanCuoi', n:'Hạn trả nợ cuối cùng', p:'kh', l:'tu', md:'tu', ng:'③ Phương án'},
      {k:'ngayKy', n:'Ngày tháng (người vay ký)', p:'kh', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'ubOng', n:'UBND: "Ông/bà …" = họ tên người vay', p:'ub', l:'tu', md:'cham', ng:'sổ hộ vay', nhanh:1},
      {k:'ubYK', n:'UBND: nội dung xác nhận (2 dòng)', p:'ub', l:'kb', md:'cham', cmau:'cư trú hợp pháp tại địa phương, thuộc đối tượng vay vốn'},
      {k:'nhTien', n:'NH 1. Số tiền cho vay + bằng chữ (= đề nghị)', p:'nh', l:'tu', md:'cham', ng:'số đề nghị — ③ Phương án', nhanh:1},
      {k:'nhLai', n:'NH 2. Lãi suất (%/năm)', p:'nh', l:'kb', md:'cham', ct:1, nhanh:1},
      {k:'nhQH', n:'NH 2. Lãi suất nợ quá hạn (% lãi khi cho vay)', p:'nh', l:'kb', md:'cham', nhanh:1},
      {k:'nhTH', n:'NH 3. Thời hạn cho vay, kỳ hạn trả nợ (= đề nghị)', p:'nh', l:'tu', md:'cham', ng:'③ Phương án', nhanh:1},
      {k:'nhTra', n:'NH 4. Số tiền trả nợ (đồng/lần)', p:'nh', l:'go', md:'cham'},
      {k:'nhHan', n:'NH 4. Hạn trả nợ cuối cùng (= đề nghị)', p:'nh', l:'tu', md:'cham', ng:'③ Phương án', nhanh:1},
      {k:'nhNgayLai', n:'NH 5. Lãi trả hàng tháng vào ngày', p:'nh', l:'kb', md:'cham', nhanh:1},
      {k:'nhNgay', n:'Ngày tháng (Giám đốc ký)', p:'nh', l:'go', md:'cham', ngay:1, nhanh:1}],
    V:function(t, B){
      var N = hsoBoNV(B), T = hsoBoT(B), A = hsoPA(B), tuCo = hsoTuCo(B), V = HSO.vay, hoi = B && T.hoi ? hsoBoHoiTen(T) : '';
      return {ct:B ? hsoCTTenIn(B.ct) : '', kinhGui:hsoPGD('kinhGui'), ten:N.ten, ns:hsoNgayVN(N.ns), cccd:N.cccd, ncap:N.ncap, noiCap:N.noiCap, thon:B ? N.ap : '', xa:B ? String(N.tenXa||'').replace(/^(xã|phường|thị trấn)\s+/i, '') : '',
        tt:B ? T.tt : '', hoi:hsoHoiNgan(hoi), dc:B && (N.ap || N.tenXa) ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null)+'.' : '', tien:A.tien ? tdnTien(A.tien) : '', tienChu:A.tien ? hsoChuSo(A.tien) : '', md:A.md ? A.md+'.' : '', tong:A.tien ? tdnTien(A.tien+tuCo) : '',
        tuCo:B && tuCo ? tdnTien(tuCo) : '', vay:A.tien ? tdnTien(A.tien) : '', th:A.th, ky:B ? A.ky : '', hanCuoi:B && B.hanCuoi || '', ngayKy:V.ngayKy, ubOng:N.ten,
        nhTien:A.tien ? tdnTien(A.tien) : '', nhTienChu:A.tien ? hsoChuSo(A.tien) : '', nhTH:A.th, nhKy:B ? A.ky : '', nhHan:B && B.hanCuoi || '', nhTra:V.nhTra, nhNgay:V.nhNgay, _A:A};
    },
    lap:function(t, B){
      var V = this.V(t, B), A = V._A, C = A.C || {}, G = omG(MK, V, 14), o = G.o, L = {lien:1}, co = function(k){ return !!G.gt(k); };   /* 3.247 (anh 18/10): chữ 14; có số liệu → in liền như đánh máy */
      var dong = A.dong.length ? A.dong : [], CH = [['………………………………', '…………………..', '……………………………..'], ['………………………………', '…………………..', '……………………………..'], ['………………………………..', '....………………..', '……………………………..']];
      var hang = '<tr><td class="c b"><p>Đối tượng</p></td><td class="c b"><p>Số lượng</p></td><td class="c b"><p>Thành tiền</p></td></tr>';
      var ok0 = omCach(MK, 'bang')!=='cham' && dong.length, lien = function(v, ch){ return v ? '<span class="om om-tu" data-o="bang">'+coChuHTML(v)+'</span>' : '<span class="om om-cham" data-o="bang">'+ch+'</span>'; };   /* ô chưa có (vd HSSV chưa gõ số tháng) → chấm */
      if(ok0) dong.forEach(function(x){   /* 3.240 (anh 17/10): có số liệu → đúng số dòng, chữ dài xuống dòng (không thu nhỏ, không dòng chấm thừa) */
        hang += '<tr><td class="c"><p>'+lien(x[0], CH[0][0])+'</p></td><td class="c" style="vertical-align:middle"><p>'+lien(x[1], CH[0][1])+'</p></td><td class="c" style="vertical-align:middle"><p>'+lien(x[2] ? hsoDongTien(x[2]) : '', CH[0][2])+'</p></td></tr>'; });   /* 3.248: tên SV dài xuống dòng → số lượng, thành tiền canh giữa dọc cho cân */
      for(var i=ok0 ? (C.kieu==='congtrinh' ? 2 : 3) : 1;i<3;i++){   /* 3.248 (anh 18/10): nước sạch (công trình) có số liệu → thêm 1 dòng chấm cho cân đối */
          /* 3.247 (anh 18/10): có số liệu → chỉ các dòng số liệu (bỏ dòng chấm thừa); bản trắng 2 dòng chấm (bỏ bớt 1 — chữ 14 vẫn vừa 1 trang) */
        var x = ['', '', 0], ch = CH[i], ok = false;   /* 3.240 (anh 17/10 "giữ form"): luôn đủ 3 dòng như gốc — dòng không có số liệu vẫn chấm */
        hang += '<tr><td class="c"><p>'+o('bang', ch[0], {gt:ok ? x[0] : '', canh:'c', rong:57, hai:4.8})+'</p></td><td class="c"><p>'+o('bang', ch[1], {gt:ok ? x[1] : '', canh:'c', rong:41})+'</p></td><td class="c"><p>'+o('bang', ch[2], {gt:ok ? hsoDongTien(x[2]) : '', canh:'c', rong:58})+'</p></td></tr>'; }   /* có chữ: khung = cả ô bảng (gốc 60 / 44 / 61 mm) */
      var ngK = G.ngay('ngayKy', ['……', '……', '………']), hanC = G.ngay('hanCuoi', ['……..', '……..', '…………']), nhH = G.ngay('nhHan', ['…....', '…....', '……..']), nhN = G.ngay('nhNgay', ['……', '……', '………']);
      var ub = C.ubnd ? '<p class="c b">Xác nhận của UBND xã</p><p style="'+JJ+'">Ông/bà '+o('ubOng', '........................................................')+'</p>'+G.khoi('ubYK', ['.........................................................................', '.........................................................................'])+'<p class="c b">Chủ tịch</p><p class="c i">(ký tên, đóng dấu)</p>'+P('&nbsp;', TR(3))+P('&nbsp;', TR(3))+P('&nbsp;', TR(1)) : '';   /* 3.249 (anh 18/10): bớt 2 dòng dưới UBND, dồn cho chỗ ký NH */   /* 3.240 (anh 17/10): chừa 5 dòng chỗ Chủ tịch ký + đóng dấu (3 dòng còn đè dấu lên chữ) */
      var h = '<div class="om-goc" style="line-height:1.15">'+   /* 3.240: có khối UBND (5 dòng ký + đóng dấu) → dòng sát hơn chút để vẫn 1 trang, cỡ chữ giữ 13 như gốc */
        hsoBang('khung0 t3', [23.4, 108.7, 37], '<tr><td>'+hsoLogo(MK, 16)+'</td><td class="c">'+hsoQH('-', 13).replace('HÒA', 'HOÀ')+'</td><td class="r"><p class="r b" style="margin-top:3pt">Mẫu số 01/TD</p></td></tr>')+
        P('<b>GIẤY ĐỀ NGHỊ VAY VỐN KIÊM PHƯƠNG ÁN SỬ DỤNG VỐN VAY</b>', 'text-align:center;font-size:14pt;margin-top:6pt')+
        P('<b>Chương trình cho vay</b>: '+o('ct', '...................................................................', L), J+'text-align:center;'+TR(3))+
        P('&nbsp;', 'font-size:6pt;'+TR(1.5))+   /* đoạn trống gốc (dấu đoạn nhỏ) */
        P('<b>Kính gửi:</b> '+o('kinhGui', '................................................................', {lay:function(v){ return v+'.'; }}), J+T1+TR(1.5)+'margin-bottom:3pt')+
        P(co('ten') ? '<b>1.</b> Họ tên người vay: '+o('ten', '', L)+'<span style="display:inline-block;width:'+Math.max(3, Math.min(12.7, 168 - omRong('1. Họ tên người vay: '+G.gt('ten')+'Năm sinh: '+(G.gt('ns') || '................................'), 14))).toFixed(1)+'mm"></span>Năm sinh: '+o('ns', '................................', L)
          : '<b>1.</b> Họ tên người vay: '+o('ten', '...............................................................')+' Năm sinh: '+o('ns', '................................'), J+TR(1.5))   /* 3.248 (anh 18/10): có tên → "Năm sinh" cách tên 1 tab (12,7 mm; tên dài thì co lại cho vừa dòng) */+
        P(co('cccd') || co('ncap') ? '- Số CC/CCCD: '+o('cccd', '................................', L)+', ngày cấp: '+(co('ncap') ? o('ncap', '', {lien:1, gt:hsoNgayVN(G.gt('ncap'))}) : '...../...../........')+', nơi cấp: '+o('noiCap', '.........................', L)
          : '- Số CC/CCCD:'+o('cccd', '................................')+'ngày cấp: '+G.ngay('ncap', ['.....', '.....', '........']).join(' /')+' , nơi cấp: '+o('noiCap', '.........................'), J+T2+TR(1.5))+
        P(V.dc && co('thon') ? '- Địa chỉ cư trú: '+o('thon', '', {lien:1, gt:V.dc}) : '- Địa chỉ cư trú: thôn '+o('thon', '...........................')+'  xã (phường) '+o('xa', '.............................')+' Tỉnh Tây Ninh.', J+T2+TR(1.5))   /* có số liệu: "ấp 6, xã Truông Mít, tỉnh Tây Ninh." (ấp / khu phố, xã / phường theo địa bàn) */+
        P('- Là thành viên Tổ TK&amp;VV do ông (bà) '+o('tt', '.................................................', L)+(co('tt') ? ' làm tổ trưởng.' : '  làm tổ trưởng.'), J+T2+TR(1.5))+
        P(co('hoi') ? '- Thuộc tổ chức '+o('hoi', '', L)+' quản lý' : '- Thuộc tổ chức Hội: '+o('hoi', '...........................................................................')+' quản lý', J+T2+TR(1.5))   /* "Hội Nông dân" · "Hội Cựu chiến binh" · "Hội Liên hiệp phụ nữ" · "Đoàn thanh niên" — không ghi xã */+
        P('2. Đề nghị cho vay số tiền: '+o('tien', '.................................................', L)+' đồng', J+TR(1.5))+
        P('(Bằng chữ'+o('tienChu', '........................................................................................................................', {lay:function(v){ return ': '+v; }, lien:1})+(co('tienChu') ? ')' : ' )'), J+'padding-left:9.6mm;'+TR(1.5))+
        P('Để thực hiện phương án:'+o('md', '...................................................................................................', {lay:function(v){ return ' '+v; }, lien:1}), J+'padding-left:9.6mm;'+TR(1.5))+
        P('Tổng nhu cầu vốn: '+o('tong', '........................................', L)+' đồng. Trong đó:', J+T2+TR(1.5))+
        P('+ Vốn tự có tham gia: '+o('tuCo', '................................', L)+' đồng.', J+T1+TR(1.5))+
        P('+ Vốn vay NHCSXH: '+o('vay', '.................................', L)+' đồng để dùng vào việc: ', J+T1+TR(1.5))+
        hsoBang('khung0 t3', [60.2, 44.5, 61.4], hang)+
        P('- Thời hạn xin vay: '+o('th', '………', L)+' tháng; Kỳ hạn trả nợ: '+o('ky', '………', L)+' tháng/lần.', J+T1+TR(1))+
        P('- Hạn trả nợ cuối cùng: '+(co('hanCuoi') ? 'ngày '+o('hanCuoi', '', {lien:1, gt:hsoNgayVN(G.gt('hanCuoi'))})+'.' : 'Ngày '+hanC.join(' /')), J+'padding-left:12.7mm;'+TR(1))+
        P('Chúng tôi cam kết: sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai trái, tôi hoàn toàn chịu trách nhiệm trước pháp luật.', JJ+T2+TR(1))+
        hsoBang('khung0 t1', [47.5, 45.6, 76.2], '<tr><td colspan="2" class="c" style="vertical-align:top">'+ub+'</td><td class="c" style="vertical-align:top"><p class="c i">Ngày '+ngK[0]+' tháng '+ngK[1]+' năm '+ngK[2]+'</p><p class="c b">Người vay</p><p class="c i">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p>'+
          P('&nbsp;', TR(3))+P('&nbsp;', TR(3))+P('&nbsp;', TR(3))+P('&nbsp;', TR(3))+'</td></tr>')+   /* 4 dòng trống chỗ ký (gốc) nằm trong cột người vay → có / không khối UBND (thẻ CT) vẫn cao như nhau */
        P('<b>PHÊ DUYỆT CỦA NGÂN HÀNG</b>', 'text-align:center;font-size:14pt;'+TR(3))+
        P('1. Số tiền cho vay: '+o('nhTien', '….........………', L)+' đồng (Bằng chữ: '+o('nhTien', '………....……........……...…..……...', {gt:omCach(MK, 'nhTien')!=='cham' ? V.nhTienChu : '', lien:1})+')', J+TR(1))+
        P('2. Lãi suất: '+o('nhLai', '..……', L)+' %/năm. Lãi suất nợ quá hạn:  '+o('nhQH', '……......…', L)+'% lãi suất khi cho vay.', J+TR(1))+
        P('3. Thời hạn cho vay: '+o('nhTH', '…….........', L)+' tháng; Kỳ hạn trả nợ: '+o('nhTH', '.............', {gt:omCach(MK, 'nhTH')!=='cham' ? V.nhKy : '', lien:1})+' tháng/lần.', J+TR(1))+
        P('4. Số tiền trả nợ: '+o('nhTra', '...........................', L)+' đồng/lần. Hạn trả nợ cuối cùng: Ngày'+nhH.join(' /'), J+TR(1))+
        P('5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày '+o('nhNgayLai', '............................................................', L), J+TR(1))+
        hsoBang('khung0 t3', [42.6, 58.8, 69.9], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Cán bộ tín dụng</p><p class="c i">(Ký, ghi rõ họ tên)</p></td>'+
          '<td class="c"><p>&nbsp;</p><p class="c b">Trưởng phòng</p><p class="c b">(Tổ trưởng) TD</p><p class="c i">(Ký, ghi rõ họ tên)</p></td>'+
          '<td class="c"><p class="c i">Ngày '+nhN[0]+' tháng '+nhN[1]+' năm '+nhN[2]+'</p><p class="c b">Giám đốc</p><p class="c i">(Ký tên, đóng dấu)</p></td></tr>')+P('&nbsp;', TR(3))+P('&nbsp;', TR(3))+P('&nbsp;', TR(3))+'</div>';   /* 3.249 (anh 18/10): chỗ ký NH chừa sẵn 3 dòng trống (máy in lề khác vẫn đủ chỗ) */   /* chỗ ký NH = phần trống cuối trang như gốc (3.240: t199 đo — luôn 1 trang A4, còn ≥ 20 mm để ký) */
      return {ma:'01/TD', h:h};
    }});
  hsoLap01td = function(t, B){ return omLap(MK, t, B || hsoBo()); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([7, 19.6, 6.3, 21.1]);   /* lề theo file gốc; 3.249 (anh 18/10): lề trên 10 → 7 mm */
})();
