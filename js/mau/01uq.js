/* ===== 3.223 M4 — MẪU 01/UQ Giấy ủy quyền trên nền ô — dựng theo file gốc tests/mau_goc/01uq.docx (VB 10493, áp dụng T01/2026) =====
   Lề 15 / 20 / 15 / 30 mm · Times New Roman 14, dòng cố định 18 pt · bảng thành viên 5 dòng + "…" (thêm dòng khi hộ đông người) · bảng Bên ủy quyền ký 12 pt.
   Chú thích (1)–(4): gốc là chú thích cuối trang Word — app in cuối giấy. Bỏ file này khỏi index.html → app dùng lại hsoLap01uq cũ. */
(function(){
  var MK = '01uq';
  function P(noi, s){ return '<p style="margin:0;'+(s||'')+'">'+noi+'</p>'; }
  var D18 = 'line-height:18pt;', J = 'text-align:justify;text-indent:12.7mm;', sup = function(n){ return '<sup style="line-height:0">('+n+')</sup>'; };   /* chỉ số chú thích không làm cao dòng */
  omDangKy({k:MK, ma:'01/UQ', phan:['kh', 'ub'], co:14,
    o:[{k:'ngayLap', n:'Mục I: "Ngày … tháng … năm …" lập giấy', p:'kh', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'soNguoi', n:'Mục I: hộ gồm … người (tổng số thành viên)', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay — số người trong hộ'},
      {k:'tv', n:'Bảng thành viên ≥ 18 tuổi (họ tên, ngày sinh, CCCD, nơi cư trú)', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (người đứng tên + thành viên / thừa kế)'},
      {k:'uqTen', n:'Mục II: cử ông (bà) — người được ủy quyền', p:'kh', l:'tu', md:'tu', ng:'người đứng tên vay — sổ hộ vay / M31'},
      {k:'uqStt', n:'Mục II: STT người được ủy quyền ở mục I', p:'kh', l:'tu', md:'tu', ng:'= 01 (người đứng tên ghi đầu bảng)'},
      {k:'uqNs', n:'Mục II: sinh ngày', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'uqCccd', n:'Mục II: số Thẻ căn cước / CCCD', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'uqNcap', n:'Mục II: ngày cấp', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay / M31'},
      {k:'uqNoiCap', n:'Mục II: nơi cấp', p:'kh', l:'tu', md:'tu', ng:'tự tính theo ngày cấp'},
      {k:'bq', n:'Bảng Bên ủy quyền ký: họ tên, quan hệ với bên được ủy quyền', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay (thành viên / thừa kế)'},
      {k:'truongThon', n:'Chứng kiến của Trưởng thôn — họ tên', p:'ub', l:'tu', md:'cham', ng:'⚙ Khai báo đơn vị › Trưởng ấp', nhanh:1}],
    V:function(t, B){
      var N = hsoBoNV(B), ho = (B && B.ho) || [], dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null).replace(/, tỉnh .*$/, '') : '';
      return {N:N, ho:ho, dc:dc, ngayLap:HSO.vay.ngayLap, soNguoi:B && B.soNguoi ? String(B.soNguoi) : '', uqTen:N.ten, uqStt:N.ten ? '01' : '', uqNs:N.ns, uqCccd:N.cccd, uqNcap:N.ncap, uqNoiCap:N.noiCap,
        truongThon:B ? hsoBoT(B).truongAp || '' : ''};
    },
    lap:function(t, B){
      var V = this.V(t, B), G = omG(MK, V, 14), o = G.o, N = V.N, ho = V.ho, dc = V.dc, tvOk = omCach(MK, 'tv')!=='cham', bqOk = omCach(MK, 'bq')!=='cham';
      var tv = B ? [{ten:N.ten, ns:N.ns, cccd:N.cccd, noi:dc}].concat(ho.map(function(x){ return {ten:x.ten, ns:x.ns, cccd:x.cccd, noi:x.noiCu || x.noi || dc}; })) : [];
      var R = 'line-height:17pt;padding-top:2.4pt;', o13 = {pt:13};   /* dòng gốc: cố định 17 pt + trước 3 pt → bước 7,24 mm (đo PDF gốc) */
      var r = '<thead><tr><td class="c b s13">TT</td><td class="c b s13">Họ và tên</td><td class="c b s13">Ngày, tháng, năm sinh</td><td class="c b s13">Số Thẻ căn cước/CCCD</td><td class="c b s13">Nơi cư trú</td></tr></thead><tbody>';
      for(var i=0;i<Math.max(5, tv.length);i++){ var x = tvOk ? tv[i] || {} : {};
        r += '<tr><td class="c" style="'+R+'">'+(i+1)+'</td><td style="'+R+'">'+o('tv', '', Object.assign({gt:x.ten||'', rong:39}, o13))+'</td><td class="c" style="'+R+'">'+o('tv', '', Object.assign({gt:x.ns ? hsoNgayVN(x.ns) : '', rong:27, canh:'c'}, o13))+'</td>'+
          '<td class="c" style="'+R+'">'+o('tv', '', Object.assign({gt:x.cccd||'', rong:26.5, canh:'c'}, o13))+'</td><td style="'+R+'">'+o('tv', '', Object.assign({gt:x.noi||'', rong:44}, o13))+'</td></tr>'; }
      r += '<tr><td class="c" style="'+R+'">…</td><td></td><td></td><td></td><td></td></tr></tbody>';
      var CHB = [['………………………………', '……..……….', '…………….'], ['………………………………', '……...…….', '…………….'], ['………………………………', '……...…….', '…………….'], ['………………………………', '……...…….', '…………….'], ['………………………………', '……...…….', '…………….']], o12 = {pt:12};
      var uq = '<tr><td colspan="4" class="c"><p class="c b s13">BÊN ỦY QUYỀN'+sup(3)+'</p></td><td class="c" style="vertical-align:top"><p class="c b s13">BÊN ĐƯỢC ỦY QUYỀN'+sup(4)+'</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td></tr>'+   /* như gốc: 1 bảng 5 cột */
        '<tr><td class="c b" style="font-size:12.5pt;vertical-align:middle">TT</td><td class="c b" style="font-size:12.5pt;vertical-align:middle">Họ và tên</td><td class="c b" style="font-size:12.5pt">Quan hệ với Bên được ủy quyền</td><td class="c b" style="font-size:12.5pt;vertical-align:middle">Ký tên</td><td></td></tr>';
      for(var j=0;j<Math.max(5, ho.length);j++){ var y = bqOk ? ho[j] || {} : {}, ch = CHB[Math.min(j, 4)];
        uq += '<tr><td class="c s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">'+(j+1)+'</td><td class="s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">'+o('bq', ch[0], Object.assign({gt:y.ten||''}, o12))+'</td><td class="s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">'+o('bq', ch[1], Object.assign({gt:y.qh||''}, o12))+'</td><td class="s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">'+ch[2]+'</td><td></td></tr>'; }
      uq += '<tr><td class="c s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">…</td><td class="s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">………………………………</td><td class="s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">………..….</td><td class="s12" style="padding-top:6pt;height:7.8mm;box-sizing:border-box">…………….</td><td></td></tr>';
      var nl = G.ngay('ngayLap', ['…', '…', '…….']), ns = G.ngay('uqNs', ['……', '.….', '.......']), nc = G.ngay('uqNcap', ['……', '…..', '…….']), tt = G.gt('truongThon');
      var h = hsoBang('khung0', [1], '<tr><td class="r" style="line-height:4.5mm"><p class="r i s12">Mẫu số 01/UQ</p><p class="r i s12">Lập 02 bản:</p><p class="r i s12">01 bản lưu NH</p><p class="r i s12">01 bản lưu hộ gia đình</p></td></tr>')+
        '<div style="font-size:13.5pt;margin-top:3pt">'+hsoQH('-', 13.5).replace(/ s13\.5/g, '')+'</div>'+P('&nbsp;')+P('&nbsp;')+
        P('<b>GIẤY ỦY QUYỀN</b>', 'text-align:center;font-size:14pt')+P('&nbsp;')+
        P('Căn cứ Bộ Luật dân sự số 91/2015/QH13 và các văn bản pháp lý có liên quan,', J+D18+'margin:3pt 0')+
        P('<b>I.</b> Ngày '+nl[0]+' tháng '+nl[1]+' năm '+nl[2]+', hộ gia đình chúng tôi gồm '+o('soNguoi', '……', {canh:'c'})+' người'+sup(1)+', trong đó các thành viên từ đủ 18 tuổi trở lên, có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật gồm:', J+D18+'margin:6pt 0')+
        hsoBang('luoi', [9.9, 42.4, 30.1, 29.8, 47.7], r)+
        P('<b>II.</b> Các thành viên trong hộ gia đình có tên tại mục I của Giấy ủy quyền này (gọi là Bên ủy quyền) thỏa thuận cử ông (bà): '+o('uqTen', '………………...…..………….')+' STT'+sup(2)+':'+o('uqStt', '..…..', {canh:'c'})+', sinh ngày:'+ns.join('/')+', số Thẻ căn cước/CCCD: '+o('uqCccd', '……..…….....…')+
          ', ngày cấp: '+nc.join('/')+', nơi cấp: '+o('uqNoiCap', '……………………..')+' (gọi là Bên được ủy quyền) đại diện theo ủy quyền cho chúng tôi thực hiện đứng tên người vay và thực hiện các giao dịch với Ngân hàng Chính sách xã hội theo quy định trước sự chứng kiến của Trưởng thôn.', J+D18+'margin-top:6pt')+
        P('<b>III. Cam kết</b>', J+D18+'margin-top:6pt')+
        P('1. Các thành viên trong hộ gia đình có tên tại mục I cam kết chịu trách nhiệm đối với toàn bộ các khoản vay tại Ngân hàng Chính sách xã hội.', J+D18+'margin-top:6pt')+
        P('2. Giấy ủy quyền này có hiệu lực kể từ ngày ký và hết hiệu lực khi quyền và nghĩa vụ giữa chúng tôi với Ngân hàng Chính sách xã hội kết thúc theo quy định.', J+D18+'margin-top:6pt')+
        P('3. Khi thay đổi người đại diện theo ủy quyền thì phải làm Giấy sửa đổi ủy quyền và được sự chấp thuận của Ngân hàng Chính sách xã hội nơi cho vay.', J+D18+'margin-top:6pt')+
        P('4. Chúng tôi công nhận đã hiểu rõ mọi quyền, nghĩa vụ và lợi ích hợp pháp của mình; hậu quả pháp lý của việc ủy quyền. Chúng tôi chịu trách nhiệm trước pháp luật về mọi cam kết do bên được ủy quyền nhân danh chúng tôi thực hiện trong phạm vi ủy quyền nêu trên.', J+D18+'margin-top:6pt')+
        P('<b>IV.</b> Giấy ủy quyền này được lập 02 bản có giá trị pháp lý như nhau: 01 bản gửi NHCSXH nơi cho vay, 01 bản lưu hộ gia đình./.', J+D18+'margin-top:6pt')+
        P('&nbsp;', 'font-size:12pt')+hsoBang('khung0', [9.7, 43.1, 27.6, 26.1, 58.6], uq)+P('&nbsp;', 'font-size:12pt')+
        hsoBang('khung0', [70, 10, 82.4], '<tr><td class="c"><p>&nbsp;</p><p class="c b s13">CHỨNG KIẾN CỦA</p><p class="c b s13">TRƯỞNG THÔN</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'+
          '<p class="c b s13">'+o('truongThon', '&nbsp;', {gt:tt, rong:60, canh:'c', pt:13})+'</p></td><td></td>'+
          '<td class="c"><p>&nbsp;</p><p class="c b s13">XÁC NHẬN CỦA</p><p class="c b s13">UBND CẤP XÃ</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>')+
        '<p>&nbsp;</p><p class="ke trai" data-ke="55" style="width:55mm;margin-left:0"></p>'+
        '<p class="i s9"><sup>(1)</sup> Điền tổng số thành viên trong hộ gia đình, gồm cả người chưa thành niên và thành niên.</p><p class="i s9"><sup>(2)</sup> Số thứ tự của người được ủy quyền đã được ghi tại mục I của Giấy ủy quyền.</p>'+
        '<p class="i s9"><sup>(3)</sup> Là các thành viên ghi tại mục I, trừ thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p><p class="i s9"><sup>(4)</sup> Là thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p>';
      return {ma:'01/UQ', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap01uq = function(t, B){ return omLap(MK, t, B || hsoBo()); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([15, 20, 15, 30]);   /* lề theo file gốc */
})();
