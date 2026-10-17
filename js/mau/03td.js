/* ===== 3.223 M5 — MẪU 03/TD Danh sách tổ viên đề nghị vay vốn trên nền ô — dựng theo file gốc tests/mau_goc/03td.docx (16/5/2023) =====
   A4 ngang · lề 10 / 20 / 10 / 20 mm · Times New Roman 13 · bảng 8 cột đúng bề rộng Word (13,1 / 44,4 / 37,5 / 30 / 47,5 / 27,5 / 30 / 27,9 mm), mỗi dòng ≥ 8 mm, ít nhất 4 dòng.
   Giữ nguyên cách lấy danh sách cũ (1 hộ theo phiếu / nhiều hộ cùng chương trình / tổ viên tích). Bỏ file này → app dùng lại hsoLap03td cũ. */
(function(){
  var MK = '03td';
  function P(noi, s){ return '<p style="margin:0;'+(s||'')+'">'+noi+'</p>'; }
  omDangKy({k:MK, ma:'03/TD', phan:['to', 'kh', 'ub', 'nh'], co:13,
    o:[{k:'tenTo', n:'Tên tổ TK&VV (tổ trưởng)', p:'to', l:'tu', md:'tu', ng:'tổ — M31 / Danh sách tổ'},
      {k:'ap', n:'Ấp (kp)', p:'to', l:'tu', md:'tu', ng:'tổ — cây địa bàn'},
      {k:'xa', n:'Xã (phường)', p:'to', l:'tu', md:'tu', ng:'tổ — cây địa bàn'},
      {k:'ct', n:'Chương trình cho vay', p:'to', l:'tu', md:'tu', ng:'thẻ chương trình'},
      {k:'ngayHop', n:'Ngày họp tổ bình xét', p:'to', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'ds', n:'Danh sách: họ tên, đối tượng thụ hưởng, số tiền, mục đích, thời hạn (đề nghị của tổ)', p:'kh', l:'tu', md:'tu', ng:'sổ hộ vay + ③ Phương án / tổ viên tích'},
      {k:'ngayKy', n:'Ngày tháng (cột xác nhận UBND)', p:'ub', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'ubYK', n:'UBND: nội dung xác nhận (3 dòng)', p:'ub', l:'kb', md:'cham', cmau:'Xác nhận các hộ có tên trên cư trú hợp pháp tại địa phương'},
      {k:'nhNgay', n:'Ngày tháng (phần phê duyệt NH)', p:'nh', l:'go', md:'cham', ngay:1, nhanh:1},
      {k:'nhCot', n:'Cột 7–8: số tiền, thời hạn phê duyệt (= đề nghị của tổ)', p:'nh', l:'tu', md:'cham', ng:'= cột 4, 6', nhanh:1},
      {k:'nhSo', n:'Số người được vay, tổng số tiền (tự tính theo danh sách)', p:'nh', l:'tu', md:'cham', ng:'tự đếm, tự cộng danh sách', nhanh:1},
      {k:'nhChua', n:'Số người chưa được vay, số thứ tự', p:'nh', l:'go', md:'cham'}],
    V:function(t, B, ds, ctMa){
      var T = B ? hsoBoT(B) : hsoTo(t), xaCap = /^phường/i.test(String((B && B.nv.tenXa) || (t && t.tenXa) || (ds && ds[0] && ds[0].xa) || '')) ? 'phường' : 'xã', A3 = hsoPA(B);
      var hang = ds || (B ? [{ten:hsoBoNV(B).ten, dt:B.dtth || hsoDTTHMd(B, xaCap==='phường'), tien:A3.tien, md:A3.mdDs, th:A3.th ? A3.th+' tháng' : ''}] : []);
      return {T:T, xaCap:xaCap, hang:hang, tenTo:T.tt, ap:T.ap, xa:T.xa, ct:B ? hsoCTTenIn(B.ct) : ctMa ? hsoCTTenIn(ctMa) : (HSO.vay.ct ? hsoCTTen(HSO.vay.ct) : ''), ngayHop:HSO.o.ngay || '', ngayKy:HSO.vay.ngayKy, nhNgay:HSO.vay.nhNgay, nhChua:HSO.vay.nhChua};
    },
    lap:function(t, B, ds, ctMa){
      var V = this.V(t, B, ds, ctMa), G = omG(MK, V, 13), o = G.o, hang = omCach(MK, 'ds')!=='cham' ? V.hang : [], nhCot = omCach(MK, 'nhCot')!=='cham', nhSo = omCach(MK, 'nhSo')!=='cham' && hang.length, tong = 0;
      var W = [13.1, 44.4, 37.5, 30, 47.5, 27.5, 30, 27.9], ow = function(i, v, canh){ return o('ds', '', {gt:v||'', rong:W[i]-2.5, canh:canh, hai:8.5}); }, owL = function(v, canh){ return v ? '<span class="om om-tu" data-o="ds" style="display:block;line-height:1.15;text-align:'+(canh || 'left')+'">'+coChuHTML(v)+'</span>' : ''; },   /* 3.240 (file anh 17/10): chữ dài xuống dòng, cỡ thường (không thu nhỏ) */ on = function(i, v){ return o('nhCot', '', {gt:nhCot ? v||'' : '', rong:W[i]-2.5, canh:'c'}); };
      var r = '<thead><tr style="height:8.6mm"><td class="c b" rowspan="2">STT</td><td class="c b" rowspan="2">Họ và tên</td><td class="c b" rowspan="2">Đối tượng<br>thụ hưởng</td><td class="c b" colspan="3">Đề nghị của Tổ TK&amp;VV</td><td class="c b" colspan="2">Phê duyệt của Ngân hàng</td></tr>'+
        '<tr style="height:8.6mm"><td class="c b">Số tiền</td><td class="c b">Mục đích sử dụng vốn</td><td class="c b">Thời hạn</td><td class="c b">Số tiền</td><td class="c b">Thời hạn</td></tr><tr style="height:9.7mm">'+[1,2,3,4,5,6,7,8].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr></thead><tbody>';
      var H8 = 'height:9.7mm;';   /* dòng gốc: tối thiểu 8 mm + cột phụ cách sau 10 pt → ~9,7 mm (đo bản PDF của file Word) */
      for(var i=0, nD = hang.length ? Math.max(3, hang.length+2) : 5;i<nD;i++){   /* 3.240 (anh 17/10): bản trắng 5 dòng; có số liệu → các dòng số liệu + 2 dòng trống (1 hộ = 3 dòng như file anh) */ var x = hang[i]; if(x) tong += x.tien||0;
        r += '<tr><td class="c" style="'+H8+'">'+(x ? i+1 : '')+'</td><td style="'+H8+'">'+owL(x && x.ten)+'</td><td style="'+H8+'">'+owL(x && x.dt, 'justify')+'</td><td style="'+H8+'">'+ow(3, x && x.tien ? tdnTien(x.tien) : '', 'r')+'</td><td style="'+H8+'">'+owL(x && x.md, 'justify')+'</td><td class="c" style="'+H8+'">'+ow(5, x && x.th, 'c')+'</td>'+
          '<td style="'+H8+'">'+on(6, x && x.tien ? tdnTien(x.tien) : '')+'</td><td style="'+H8+'">'+on(7, x && x.th)+'</td></tr>'; }
      r += '<tr><td style="'+H8+'"></td><td class="c b" style="'+H8+'">Cộng:</td><td style="'+H8+'"></td><td class="b" style="'+H8+'">'+ow(3, tong ? tdnTien(tong) : '', 'r')+'</td><td style="'+H8+'"></td><td style="'+H8+'"></td><td class="b" style="'+H8+'">'+on(6, tong ? tdnTien(tong) : '')+'</td><td style="'+H8+'"></td></tr></tbody>';
      var nh = G.ngay('ngayHop', ['.......', '......', '...........']), uk = G.ngay('ngayKy', ['.....', '.....', '..........']), nn = G.ngay('nhNgay', ['.....', '.....', '.........']), xc = V.xaCap;
      var soN = nhSo ? String(hang.length) : '', soT = nhSo && tong ? tdnTien(tong) : '';
      var h = '<div class="om-goc" style="line-height:1.15">'+hsoBang('khung0', [70.7, 132.8, 57.3], '<tr><td><p>Tên tổ TK&amp;VV: '+o('tenTo', '...........................')+'</p><p>'+(G.gt('ap') ? (xc==='phường' ? 'Khu phố' : 'Ấp') : 'Ấp (kp)')+': '+o('ap', '........................................')+'</p><p>'+(G.gt('xa') ? (xc==='phường' ? 'Phường' : 'Xã') : 'Xã (phường)')+': '+o('xa', '................................')+'</p></td>'+
          '<td class="c"><p class="c b">DANH SÁCH TỔ VIÊN</p><p class="c b">ĐỀ NGHỊ VAY VỐN NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p class="c"><b>Chương trình cho vay</b>'+o('ct', '…………………………………….', {lay:function(v){ return ': '+v; }})+'</p></td>'+
          '<td class="r"><p class="r b">Mẫu số: 03/TD</p><p class="r s10">Lập 02 liên chính</p><p class="r s10">(01 liên lưu hồ sơ Tổ tại NH,</p><p class="r s10">01 liên lưu tại Tổ)</p><p class="r s10">02 liên phôtô: 01 liên đóng C.từ tại NH; 01 liên lưu Hội đoàn thể</p></td></tr>')+
        P('Tại cuộc họp Tổ Tiết kiệm và vay vốn ngày '+nh.join(' / ')+' đã bình xét các tổ viên đề nghị vay vốn Ngân hàng Chính sách xã hội. Toàn tổ nhất trí đề xuất những tổ viên có tên dưới đây đang cư trú tại địa phương, đủ điều kiện và thuộc đối tượng vay vốn đợt này:', 'text-align:justify;text-indent:12.7mm;margin-top:22pt')+
        P('<i>Đơn vị: đồng</i>', 'text-align:right')+hsoBang('luoi cham', W, r)+
        hsoBang('khung0', [46.9, 95, 127.5], '<tr><td class="c" style="vertical-align:top"><p>&nbsp;</p><p class="c b">Tổ trưởng</p><p class="c">(Ký, ghi rõ họ tên)</p></td>'+
          '<td class="c" style="vertical-align:top"><p class="c">Ngày '+uk[0]+' tháng '+uk[1]+' năm '+uk[2]+'</p><p class="c b">Phần xác nhận của UBND '+xc+' </p>'+G.khoi('ubYK', ['..............................................................................', '..............................................................................', '...............................................................................'])+
            '<p>&nbsp;</p><p class="c b">UBND '+xc+'</p><p class="c">(Ký tên,  đóng dấu)</p></td>'+
          '<td class="c" style="vertical-align:top"><div style="min-height:37mm"><p class="c">Ngày '+nn[0]+' tháng '+nn[1]+' năm '+nn[2]+'</p><p class="c b">Phê duyệt của Ngân hàng</p><p class="c">Số người được vay vốn đợt này: '+o('nhSo', '......................................', {gt:soN, canh:'c'})+'  người.</p>'+
            '<p class="c">Tổng số tiền cho vay: '+o('nhSo', '........................................................', {gt:soT, canh:'c'})+' đồng.</p><p class="c">  Số người chưa được vay đợt này: '+o('nhChua', '...................')+' người, có số thứ  tự</p><p class="c">trong danh sách là: '+o('nhChua', '.................................................................', {gt:''})+'</p></div>'+   /* dòng gốc cao tối thiểu 37 mm → chữ ký CB / TP / GĐ đúng chỗ */
            hsoBang('khung0', [47, 40.6, 40], '<tr><td class="c"><p class="c b">Cán bộ tín dụng</p><p class="c">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Trưởng phòng</p><p class="c">(Tổ trưởng) TD</p><p class="c">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Giám đốc</p><p class="c">(Ký tên, đóng dấu)</p></td></tr>')+'</td></tr>')+'</div>';
      return {ma:'03/TD', h:h};
    }});
  hsoLap03td = function(t, B, ds, ctMa){ return omLap(MK, t, B || hsoBo(), ds, ctMa); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([10, 20, 10, 20]);   /* lề theo file gốc */
})();
