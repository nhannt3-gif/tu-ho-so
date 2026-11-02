/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): HỒ SƠ VAY — mẫu 01/TD · 03/TD · 04/TD · 09A/TD · 01/UQ · 01/TGTV · bộ hồ sơ vay · lập mẫu đang chọn · xuất Word.
   Chép nguyên từ js/25-ho-so.js (không đổi tên hàm); nạp ngay sau js/25. ===== */
/* ---------- HỒ SƠ VAY: 01/TD · 03/TD · 04/TD · 09A/TD ---------- */
function hsoKhachChon(t){ var kh = HSO.vay.kh; if(!kh || kh==='moi' || !t) return null; var c = hsoKhach(kh, t); return c.ten ? c : null; }
function hsoDiaChi(c, t){ var tenXa = (c && xaTenSach(c.xa, c.tenXa)) || (t && t.tenXa) || '',   /* 3.433: bỏ tên xã "… Vay trực tiếp" */ ap = (c && c.ap) || (t ? hsoApTen(t) : '');
  return [ap ? ktCapAp(tenXa)+' '+ap : '', tenXa ? ktXaChu(tenXa) : '', 'tỉnh '+hsoPGD('tinh')].filter(Boolean).join(', '); }
function hsoLap01td(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), T = hsoBoT(B), A = hsoPA(B), C = A.C || {ubnd:true, nhcsxh:true, kieu:'hssv'}, hssv = C.nhcsxh, tuCo = hsoTuCo(B), sp = '        ';
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '';
  var Q = function(k, co, html, cham){ return hsoChamIn('01td', k) && co ? html : cham; }, lai = hsoChamGT('01td', 'nhLai', ''), qh = hsoChamGT('01td', 'nhQH', ''), nl = hsoChamGT('01td', 'nhNgayLai', '');   /* 3.215 khai báo riêng */
  var bang = '<tr><td class="c b">Đối tượng</td><td class="c b">Số lượng</td><td class="c b">Thành tiền</td></tr>'+
    (A.dong.length ? A.dong : [['', '', 0]]).map(function(x){ return '<tr><td class="c">'+hsoO(x[0], 'kb', 30)+'</td><td class="c">'+hsoO(x[1], 'kb', 15)+'</td><td class="c">'+hsoO(hsoDongTien(x[2]), 'kb', 20)+'</td></tr>'; }).join('')+
    (A.dong.length===1 && C.kieu==='congtrinh' ? '<tr><td class="c">'+hsoCham(30)+'</td><td class="c">'+hsoCham(18)+'</td><td class="c">'+hsoCham(22)+'</td></tr>' : '');
  var h = hsoBang('khung0', [22, 58, 20], '<tr><td>'+hsoLogo('01td', 19)+'</td><td class="c">'+hsoQH('-', 13)+'</td><td class="r"><p class="r b s12">Mẫu số 01/TD</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ VAY VỐN KIÊM PHƯƠNG ÁN SỬ DỤNG VỐN VAY</p>'+
    '<p class="c"><b>Chương trình cho vay</b>: '+hsoO(B ? hsoCTTenIn(B.ct) : '', 'kb', 40)+'</p>'+
    '<p class="l2 tr"><b>Kính gửi:</b> '+coChuHTML(hsoPGD('kinhGui'))+'.</p>'+
    '<p><b>1.</b> Họ tên người vay: '+hsoO(N.ten, 'sl', 35)+sp+'Năm sinh: '+hsoO(hsoNgayVN(N.ns), 'sl', 14)+'</p>'+
    '<p class="l1">- Số CC\\CCCD: '+hsoO(N.cccd, 'sl', 16)+' ngày cấp: '+hsoO(hsoNgayVN(N.ncap), 'sl', 12)+', nơi cấp: '+hsoO(N.noiCap, 'sl', 15)+'</p>'+
    '<p class="l1">- Địa chỉ cư trú: '+hsoO(dc, 'sl', 60)+'.</p>'+
    '<p class="l1">- Là thành viên Tổ TK&amp;VV do ông (bà): '+hsoO(T.tt, 'sl', 30)+' làm tổ trưởng.</p><p class="l1">- Thuộc tổ chức '+hsoO(T.hoi ? hsoBoHoiTen(T) : '', 'sl', 30)+' quản lý.</p>'+
    '<p><b>2.</b> Đề nghị '+(hssv ? 'NHCSXH ' : '')+'cho vay số tiền: '+(A.tien ? hsoO(tdnTien(A.tien), 'kb') : hsoCham(25))+' đồng'+(hssv ? '' : '.')+'</p>'+
    '<p class="l1">(Bằng chữ: '+(A.tien ? hsoO(hsoChuSo(A.tien), 'kb') : hsoCham(60))+')</p>'+
    '<p class="l1">Để thực hiện phương án: '+hsoO(A.md ? A.md+'.' : '', 'kb', 60)+'</p>'+
    '<p class="l1">Tổng nhu cầu vốn: '+(A.tien ? hsoO(tdnTien(A.tien+tuCo), 'kb') : hsoCham(25))+' đồng'+(hssv ? '' : '.')+' Trong đó:</p>'+
    '<p class="l2">+ Vốn tự có tham gia: '+(B && tuCo ? hsoO(tdnTien(tuCo), 'kb') : hsoCham(25))+' đồng.</p>'+
    '<p class="l2">+ Vốn vay NHCSXH: '+(A.tien ? hsoO(tdnTien(A.tien), 'kb') : hsoCham(25))+' đồng để dùng vào việc:</p>'+hsoBang('khung0', [40, 24, 36], bang)+
    '<p class="l1 tr">- Thời hạn xin vay: '+hsoO(A.th, 'kb', 8)+' tháng; Kỳ hạn trả nợ: '+hsoO(B ? A.ky : '', 'kb', 6)+' tháng/lần.</p>'+
    '<p class="l1">- Hạn trả nợ cuối cùng: Ngày'+(B && B.hanCuoi ? ' '+hsoO(hsoNgayVN(B.hanCuoi), 'kb') : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(10))+'</p>'+
    '<p class="j thut">Chúng tôi cam kết: sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai trái, tôi hoàn toàn chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [52, 48], '<tr><td></td><td class="c"><p class="c i">'+hsoChamNgayTT('01td', 'ngayKy', 'Ngày'+hsoCham(6)+' tháng '+hsoCham(6)+' năm '+hsoCham(6))+'</p></td></tr><tr><td class="c">'+
      (C.ubnd ? '<p class="c b">Xác nhận của UBND xã</p><p>Ông/bà '+Q('ubOng', N.ten, hsoO(N.ten, 'kb', 40), hsoCham(40))+'</p><p>'+hsoCham(52)+'</p><p>'+hsoCham(52)+'</p><p class="c b">Chủ tịch</p><p class="c">(ký tên, đóng dấu)</p>' : '')+
      '</td><td class="c"><p class="c b">Người vay</p><p class="c i s11">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p class="c b tr">PHÊ DUYỆT CỦA NGÂN HÀNG</p>'+
    '<p>1. Số tiền cho vay: '+Q('nhTien', A.tien, hsoO(tdnTien(A.tien), 'kb')+' ', hsoCham(20))+'đồng (Bằng chữ:'+Q('nhTien', A.tien, ' '+hsoO(hsoChuSo(A.tien), 'kb'), hsoCham(45))+')</p><p>2. Lãi suất: '+(lai ? hsoO(lai, 'kb') : hsoCham(6))+'%/năm. Lãi suất nợ quá hạn: '+(qh ? hsoO(qh, 'kb') : hsoCham(10))+'% lãi suất khi cho vay.</p>'+
    '<p>3. Thời hạn cho vay: '+Q('nhTH', A.th, hsoO(A.th, 'kb'), hsoCham(12))+' tháng; Kỳ hạn trả nợ: '+Q('nhTH', B && A.ky, hsoO(B ? A.ky : '', 'kb')+' ', hsoCham(12))+'tháng/lần.</p><p>4. Số tiền trả nợ: '+hsoCham(22)+' đồng/lần. Hạn trả nợ cuối cùng: Ngày'+Q('nhHan', B && B.hanCuoi, ' '+hsoO(hsoNgayVN(B && B.hanCuoi), 'kb'), hsoCham(6)+'/'+hsoCham(5)+'/'+hsoCham(6))+'</p>'+
    '<p>5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày '+(nl ? hsoO(nl, 'kb') : hsoCham(40))+'</p>'+
    hsoBang('khung0 hso-ky', [1, 1, 1], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Cán bộ tín dụng</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p>&nbsp;</p><p class="c b">Trưởng phòng<br>(Tổ trưởng) TD</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c i">'+hsoChamNgayTT('01td', 'nhNgay', 'Ngày'+hsoCham(5)+'tháng'+hsoCham(5)+'năm'+hsoCham(5))+'</p><p class="c b">Giám đốc</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'01/TD', h:h};
}
function hsoLap03td(t, B, ds, ctMa){   /* ctMa (3.209): 03/TD nhiều hộ — tên chương trình theo thẻ */
  B = B || hsoBo(); var T = B ? hsoBoT(B) : hsoTo(t), xaCap = /^phường/i.test(String((B && B.nv.tenXa) || (t && t.tenXa) || '')) ? 'phường' : 'xã', ng = HSO.o.ngay || '';
  var A3 = hsoPA(B), hang = ds || (B ? [{ten:hsoBoNV(B).ten, dt:B.dtth || hsoDTTHMd(B, xaCap==='phường'), tien:A3.tien, md:A3.mdDs, th:A3.th ? A3.th+' tháng' : ''}] : []);   /* 3.208: thời hạn gõ ở 01/TD → cột 6; ĐTTH trống → mặc định thẻ CT theo xã / phường */
  var tong = 0, r = '<thead><tr><td class="c b" rowspan="2">STT</td><td class="c b" rowspan="2">Họ và tên</td><td class="c b" rowspan="2">Đối tượng<br>thụ hưởng</td><td class="c b" colspan="3">Đề nghị của Tổ TK&amp;VV</td><td class="c b" colspan="2">Phê duyệt của Ngân hàng</td></tr>'+
    '<tr><td class="c b">Số tiền</td><td class="c b">Mục đích sử dụng vốn</td><td class="c b">Thời hạn</td><td class="c b">Số tiền</td><td class="c b">Thời hạn</td></tr><tr>'+[1,2,3,4,5,6,7,8].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr></thead><tbody>';
  var nhCot = hsoChamIn('03td', 'nhCot'), nhSo = hsoChamIn('03td', 'nhSo') && hang.length;   /* 3.215 khai báo riêng: cột phê duyệt NH = đề nghị; số người / tổng tiền tự tính */
  hang.forEach(function(x, i){ tong += x.tien||0; r += '<tr><td class="c">'+(i+1)+'</td><td>'+hsoO(x.ten)+'</td><td class="j">'+(x.dt ? hsoO(x.dt, 'kb') : '')+'</td><td>'+(x.tien ? hsoO(tdnTien(x.tien), 'kb') : '')+'</td><td class="j">'+(x.md ? hsoO(x.md, 'kb') : '')+'</td><td class="c">'+(x.th ? hsoO(x.th, 'kb') : '')+'</td><td>'+(nhCot && x.tien ? hsoO(tdnTien(x.tien), 'kb') : '')+'</td><td>'+(nhCot && x.th ? hsoO(x.th, 'kb') : '')+'</td></tr>'; });
  for(var i=0;i<2 || (!hang.length && i<5);i++) r += '<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  r += '<tr class="het"><td></td><td class="c b">Cộng:</td><td></td><td class="b">'+(tong ? hsoO(tdnTien(tong), 'kb') : '')+'</td><td></td><td></td><td>'+(nhCot && tong ? '<b>'+hsoO(tdnTien(tong), 'kb')+'</b>' : '')+'</td><td></td></tr></tbody>';
  var h = hsoBang('khung0', [27, 48, 25], '<tr><td><p>Tên tổ TK&amp;VV: '+hsoO(T.tt, 'sl', 25)+'</p><p>'+(T.capAp==='khu phố' ? 'Khu phố' : 'Ấp')+': '+hsoO(T.ap, 'sl', 20)+'</p><p>'+(xaCap==='phường' ? 'Phường' : 'Xã')+': '+hsoO(T.xa, 'sl', 20)+'</p></td>'+
      '<td class="c"><p class="c b">DANH SÁCH TỔ VIÊN</p><p class="c b">ĐỀ NGHỊ VAY VỐN NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p class="c b s12">Chương trình cho vay: '+hsoO(B ? hsoCTTenIn(B.ct) : ctMa ? hsoCTTenIn(ctMa) : (HSO.vay.ct ? hsoCTTen(HSO.vay.ct) : ''), 'kb', 30)+'</p></td>'+
      '<td class="r"><p class="r b">Mẫu số: 03/TD</p><p class="r s10">Lập 02 liên chính</p><p class="r s10">(01 liên lưu hồ sơ Tổ tại NH,</p><p class="r s10">01 liên lưu tại Tổ)</p><p class="r s10">02 liên phôtô: 01 liên đóng C.từ tại NH; 01 liên lưu Hội đoàn thể</p></td></tr>')+
    '<p class="j thut tr">Tại cuộc họp Tổ Tiết kiệm và vay vốn ngày '+(ng ? hsoNgayO(ng) : hsoCham(7)+' / '+hsoCham(6)+' / '+hsoCham(11))+' đã bình xét các tổ viên đề nghị vay vốn Ngân hàng Chính sách xã hội. Toàn tổ nhất trí đề xuất những tổ viên có tên dưới đây đang cư trú tại địa phương, đủ điều kiện và thuộc đối tượng vay vốn đợt này:</p>'+
    '<p class="r i">Đơn vị: đồng</p>'+hsoBang('luoi cham s12', [5, 18, 17, 11, 18, 10, 11, 10], r)+
    hsoBang('khung0 hso-ky', [22, 36, 42], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Tổ trưởng</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c">'+hsoChamNgayTT('03td', 'ngayKy', 'Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(10))+'</p><p class="c b">Phần xác nhận của UBND '+xaCap+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p class="c b">UBND '+xaCap+'</p><p class="c s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c">'+hsoChamNgayTT('03td', 'nhNgay', 'Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(9))+'</p><p class="c b">Phê duyệt của Ngân hàng</p><p class="c">Số người được vay vốn đợt này: '+(nhSo ? hsoO(String(hang.length), 'kb') : hsoCham(30))+' người.</p><p class="c">Tổng số tiền cho vay: '+(nhSo && tong ? hsoO(tdnTien(tong), 'kb') : hsoCham(45))+' đồng.</p>'+
      '<p class="c">Số người chưa được vay đợt này: '+hsoCham(10)+' người, có số thứ tự trong danh sách là: '+hsoCham(45)+'</p>'+
      hsoBang('khung0', [1, 1, 1], '<tr><td class="c"><p class="c b">Cán bộ tín dụng</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Trưởng phòng</p><p class="c s11">(Tổ trưởng) TD</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Giám đốc</p><p class="c s11">(Ký tên, đóng dấu)</p></td></tr>')+'</td></tr>');
  return {ma:'03/TD', h:h};
}
function hsoMonGH(t){   /* món còn dư nợ của khách đang chọn (09A) */
  var kh = HSO.vay.kh; if(!t || !kh || kh==='moi') return [];
  var k = hsoTVTo(t).find(function(x){ return x.kh===kh; }); return k ? k.mon.filter(function(m){ return (m.dn||0)>0; }) : [];
}
/* 3.206 (anh chốt 14/10): Ô CHẤM TÙY BIẾN — cách chung cho mọi mẫu. Số liệu cố định (tên, nhân thân, món vay, tổ, Hội) không tùy biến;
   mỗi ô chấm có công tắc [✍ Chấm viết tay | 🖨 In sẵn], nhớ theo mẫu (hsoLuu().cham[mẫu][ô], đồng bộ Drive); giá trị gõ chỉ giữ trong lần làm (HSO.vay).
   Thêm ô cho mẫu khác = thêm 1 dòng vào HSO_CHAM[mẫu]: [khóa, nhãn, loại (lyDo · tien · so · ngay · chu), mặc định 'in' | 'cham'] */
var HSO_CHAM = {'09a':[['lyDo','Lý do chưa trả','lyDo','cham'], ['tienGH','Số tiền đề nghị gia hạn (đ)','tien','in'], ['thang','Thời gian đề nghị (tháng)','so','cham'],
  ['kyTra','Kế hoạch trả nợ (tháng/kỳ)','so','cham'], ['tienKy','Số tiền mỗi kỳ (đ)','tien','cham'], ['tienCuoi','Số tiền trả nợ kỳ cuối (đ)','tien','cham'], ['ngayKy','Ngày tháng (người vay ký)','ngay','cham']]};
/* 3.215 (anh 15/10): KHAI BÁO RIÊNG từng mẫu — mở rộng ô chấm tùy biến: loại 'kb' = khai 1 lần, app nhớ (hsoLuu().chamGT[mẫu][ô], cột 5 = 'ct' → nhớ theo chương trình vay);
   loại 'tu' = app tự lấy (theo hộ / danh sách / khai báo chung) — chỉ có công tắc. Mặc định mọi ô mới = ✍ chấm → bản in không đổi khi anh chưa bật. */
function hsoChamDef(mk, k){ return (HSO_CHAM[mk]||[]).find(function(x){ return x[0]===k; }) || null; }
function hsoChamKBKhoa(mk, k){ var d = hsoChamDef(mk, k); return d && d[4]==='ct' ? k+'|'+(((hsoBo()||{}).ct) || HSO.vay.ct || '') : k; }
function hsoChamKBLay(mk, k){ var L = hsoLuu(), g = ((L.chamGT||{})[mk])||{}; return g[hsoChamKBKhoa(mk, k)]; }
function hsoChamKBDat(mk, k, v){ var L = hsoLuu(); L.chamGT = L.chamGT || {}; (L.chamGT[mk] = L.chamGT[mk] || {})[hsoChamKBKhoa(mk, k)] = String(v||'').trim(); luu(); hsoHen(); }
function hsoChamIn(mk, k){ return hsoChamKieu(mk, k)==='in'; }
function hsoChamNgayTT(mk, k, cham){   /* 'Ngày dd tháng mm năm yyyy' khi 🖨 + đã gõ ngày; ✍ hoặc trống → giữ nguyên chuỗi chấm cũ của mẫu.
     Anh (15/10): ngày mặc định chấm ghi tay; 🖨 KHÔNG tự lấy hôm nay — logic ngày anh chốt sau */
  var g = hsoChamIn(mk, k) ? hsoNg(hsoChamGT(mk, k, '')) : null;
  return g ? 'Ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : cham; }
/* 3.221 (anh 16/10): 📝 BẢN GHI MẪU — in số liệu thật vào mọi ô khách / tổ phải viết để khách chép lại vào mẫu thật. Chỉ giữ trong lần làm (không lưu — tránh quên tắt);
   ✍ / 🖨 của bản thật không đổi. Phần UBND / Hội / Ngân hàng / người chứng kiến ghi (HSO_GM_KHAC) vẫn chấm. Ngày: vẫn chỉ in ngày đã gõ. */
var HSO_GM = false, HSO_GM_KHAC = {'01td':['ubOng','nhTien','nhLai','nhQH','nhTH','nhHan','nhNgayLai','nhNgay'], '03td':['ngayKy','nhCot','nhNgay','nhSo'], '01uq':['truongThon'], '01tdck':['nhTen','nhNgay']};
function hsoGhiMauO(mk, k){ return (HSO_GM_KHAC[mk]||[]).indexOf(k)<0; }
function hsoGhiMauDat(v){ HSO_GM = !!v; hsoVe(); }
function hsoChamKieu(mk, k){ if(HSO_GM && hsoGhiMauO(mk, k) && hsoChamDef(mk, k)) return 'in'; var c = ((hsoLuu().cham||{})[mk])||{}, d = (HSO_CHAM[mk]||[]).find(function(x){ return x[0]===k; }); return c[k] || (d ? d[3] : 'cham'); }
function hsoChamDat(mk, k, v){ var L = hsoLuu(); L.cham = L.cham || {}; (L.cham[mk] = L.cham[mk] || {})[k] = v; luu(); hsoVe(); }
function hsoLyDoDs(){ var L = hsoLuu(); if(!Array.isArray(L.lyDoDs) || !L.lyDoDs.length) L.lyDoDs = ['Đang gặp khó khăn về kinh tế, tài chính']; return L.lyDoDs; }
function hsoLyDoThem(){ var v = String(HSO.vay.lyDo||'').trim(); if(!v) return bao('Gõ lý do vào ô trước rồi bấm ＋.'); var ds = hsoLyDoDs(); if(ds.indexOf(v)<0){ ds.push(v); luu(); } hsoVe(); bao('Đã thêm vào danh sách lý do.'); }
function hsoLyDoBo(i){ var ds = hsoLyDoDs(); if(ds.length<=1) return bao('Danh sách cần ít nhất 1 lý do.'); ds.splice(i, 1); luu(); hsoVe(); }
function hsoChamGT(mk, k, md){ if(hsoChamKieu(mk, k)!=='in') return ''; var d = hsoChamDef(mk, k), v = d && d[2]==='kb' ? hsoChamKBLay(mk, k) : HSO.vay[k]; if(v===undefined || v==='') v = md; return v==null ? '' : String(v); }   /* '' = in chấm */
function hsoChamTien(mk, k, md){ var v = hsoSo(hsoChamGT(mk, k, md)); return v ? tdnTien(v) : ''; }
function hsoChamNgay(mk, k, n){ var v = hsoChamGT(mk, k, ''), g = hsoNg(v);   /* 3.215 (anh 15/10): mọi mẫu — không tự ghi ngày khi anh không gõ */
  n = n || [5, 4, 10];   /* ', ngày … tháng … năm …' */
  return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày'+hsoCham(n[0])+'tháng'+hsoCham(n[1])+'năm '+hsoCham(n[2]); }
function hsoKBRieng(mk, md){   /* 3.215: khối ⚙ Khai báo riêng ở cột trái — liệt kê ô từ trên xuống theo mẫu · 3.222 (anh 16/10, bố cục A): cuối cột trái, thu gọn được, ↺ về mặc định */
  if(typeof omCo==='function' && omCo(mk)){ var S0 = hsoCH(), t0 = KHO.to(S0.to); if(t0 && toLaTT(t0)) t0 = null; return omKBRieng(mk, OM_MAU[mk].V(t0, hsoBo())); }   /* 3.223: mẫu đã lên nền ô */
  var M = (HSO_MAU.hsv.concat(HSO_MAU.hst)).find(function(m){ return m.k===mk; }) || {ma:mk}, dong = !hsoKBRDangMo(mk), doi = Object.keys(((hsoLuu().cham||{})[mk])||{}).length;
  return '<details class="hso-kbr-d"'+(dong ? '' : ' open')+' ontoggle="hsoKBRMo(\''+mk+'\',this.open)"><summary class="nhan-nhom hso-kbr-o">⚙ Khai báo riêng — Mẫu '+coChuHTML(M.ma)+' <small>(ô ✍ / 🖨 từ trên xuống)</small></summary>'+
    (doi ? '<div class="hang-nut"><button class="nho" onclick="hsoChamVeMD(\''+mk+'\')" title="Đưa mọi ô của mẫu về mặc định (✍ chấm) — giá trị đã khai vẫn giữ">↺ Về mặc định ('+doi+' ô đã đổi)</button></div>' : '')+hsoChamTuy(mk, md)+'</details>'; }
function hsoKBRDangMo(mk){ return !!((hsoLuu().kbrMo||{})[mk]); }   /* 3.240 (anh 17/10): khai báo riêng có nút mở / tắt, mặc định TẮT — tránh nhầm với form lập mẫu */
function hsoKBRMo(mk, mo){ var L = hsoLuu(); L.kbrMo = L.kbrMo || {}; if(hsoKBRDangMo(mk)===!!mo) return; if(mo) L.kbrMo[mk] = 1; else delete L.kbrMo[mk]; delete (L.kbrDong||{})[mk]; luu(); }
function hsoChamVeMD(mk, khongHoi){   /* 3.222 (bổ sung 2): bỏ ✍ / 🖨 anh đã đổi của mẫu → về mặc định; giá trị khai 1 lần (chamGT) giữ nguyên để bật lại không phải gõ */
  var ghi = function(){ var L = hsoLuu(); if(L.cham) delete L.cham[mk]; luu(); hsoVe(); bao('Đã đưa ô tùy biến về mặc định.'); };
  if(khongHoi) return ghi();
  hoi('Đưa ô tùy biến của mẫu về mặc định?', 'Mọi ô về ✍ chấm ghi tay như lúc mới (ô nào mẫu mặc định in sẵn thì in sẵn). Giá trị anh đã khai vẫn giữ.', 'Về mặc định', ghi); }
/* 3.222 (bổ sung 1): NGUỒN số liệu của ô 🖨 — ô 'tu' ghi rõ app lấy ở đâu (theo nguyên tắc cửa kho trả kèm nguồn) */
var HSO_NGUON = {ubOng:'người vay — sổ hộ vay', nhTien:'số đề nghị — ③ Phương án', nhTH:'thời hạn, kỳ hạn đề nghị — ③ Phương án', nhHan:'hạn trả nợ cuối — ③ Phương án', nhCot:'cột 5–6 của danh sách', nhSo:'tự tính theo danh sách',
  cif:'M31', danToc:'M31', sdt:'M31 / sổ hộ vay', quocTich:'ghi sẵn theo mẫu', cuTru:'ghi sẵn theo mẫu', hanCCCD:'tính từ ngày sinh + ngày cấp CCCD', thuongTru:'sổ hộ vay (tổ dân phố / thôn, xã, tỉnh)',
  truongThon:'⚙ Khai báo đơn vị › Trưởng ấp', nhTen:'người đề nghị đang chọn', '09a.tienGH':'trống = dư nợ món vay (M31)'};
function hsoChamNguon(mk, x){
  var m31 = 'Mẫu 31'+(KHO.coKy() ? ' kỳ '+slKyChu(KHO.ky().ky) : ' (chưa nạp)'), n = HSO_NGUON[mk+'.'+x[0]] || (x[2]==='tu' ? HSO_NGUON[x[0]] || 'app tự lấy' : '');
  if(!n) n = x[2]==='kb' ? (x[4]==='ct' ? 'khai 1 lần, app nhớ theo chương trình '+((((hsoBo()||{}).ct) || HSO.vay.ct) || '(chưa chọn)') : 'khai 1 lần, app nhớ') : x[2]==='lyDo' ? 'danh sách lý do app nhớ' : 'gõ trong lần làm (không lưu)';
  return n.replace(/M31/g, m31); }
/* 3.222 (bổ sung 3): ⚠ NHẮC THIẾU trước khi in — gom 1 dòng đầu cột trái: nhân thân người vay, ô đã bật 🖨 mà chưa có số liệu (sẽ in chấm) */
function hsoThieu(M, t){
  var r = [], B = hsoBo(), V = HSO.vay, mk = M.k, nv = null;
  if(mk==='01tgtv' && typeof tgNguon==='function' && tgNguon(B)!=='bo'){   /* 3.317: 01/TGTV nhắc theo nguồn đang chọn (Mẫu 31 / tự khai), không theo Sổ hộ vay */
    if(tgNguon(B)==='tay' && tgTayCo()) nv = tgTay(); }
  else if(/^(01td|01uq|01gqvl|07b|pdnh|01tgtv)$/.test(mk) && B && B.hoId && hmTim(B.hoId)) nv = B.nv;
  else if(/^(09a|01tdck)$/.test(mk) && V.kh) nv = KHO.khach(V.kh, t);
  if(nv){ var th = [['cccd','số CCCD'], ['ncap','ngày cấp CCCD'], ['ns','ngày sinh']].filter(function(x){ return !nv[x[0]]; }).map(function(x){ return x[1]; });
    if(th.length) r.push('Người vay '+(nv.ten ? '<b>'+coChuHTML(nv.ten)+'</b> ' : '')+'thiếu '+th.join(', ')+' → in chấm'); }
  if(typeof omCo==='function' && omCo(mk)){   /* 3.223: mẫu trên nền ô — ô dài quá khung (đã thu nhỏ hết mức), ô bật in mà chưa có số liệu */
    try { if(mk==='01tgtv' && typeof tgNguon==='function' && tgNguon(B)==='tay') hsoLap01tgtv(t, tgTayP()); else omLap(mk, t, B || hsoBo()); } catch(e){}   /* 3.319: In nhanh dựng thử theo người đang khai */   /* dựng thử để biết ô dài (cột trái vẽ trước khung xem) */
    OM_DAI.filter(function(x){ return x.mk===mk; }).forEach(function(x){ r.push('Ô <b>'+coChuHTML(x.n)+'</b> '+(x.gian ? 'dài hơn ô (đã viết tắt, nhãn sau dịch phải — xem có rớt dòng không, cần thì gõ ngắn lại)' : 'dài quá khung (đã thu nhỏ chữ hết mức)')+': "'+coChuHTML(x.v.slice(0, 60))+'"'); });
    if(OM_KIEU==='that'){ var Vo = OM_MAU[mk].V(t, B); OM_MAU[mk].o.forEach(function(x){ var c = omCachLuu(mk, x.k); if(c==='kb' && !omKB(mk, x.k) && !((OM_LOAI[x.l]||[]).indexOf('tu')>=0 && (Vo[x.k]||'')) || c==='go' && !(Vo[x.k]||'')) r.push('Ô '+OM_CACH[c][0]+' <b>'+coChuHTML(x.n)+'</b> chưa có số liệu → in chấm'); }); }
    return r; }
  if(!HSO_GM) (mk==='09a' && hsoLuu().kemTDCK ? ['09a', '01tdck'] : [mk]).forEach(function(m){ (HSO_CHAM[m]||[]).forEach(function(x){
    if(x[2]==='nhom' || hsoChamKieu(m, x[0])!=='in') return;
    var trong = x[2]==='kb' ? !hsoChamKBLay(m, x[0]) : x[2]==='ngay' ? !hsoNg(V[x[0]]) : (x[2]==='tien' || x[2]==='so') ? (V[x[0]]===undefined || V[x[0]]==='') && !(m==='09a' && x[0]==='tienGH') : x[0]==='truongThon' ? !!t && !hsoTo(t).truongAp : false;
    if(trong) r.push('Ô 🖨 <b>'+coChuHTML(x[1])+'</b> chưa có số liệu → in chấm'); }); });
  return r; }
function hsoThieuHTML(M, t){ var r = hsoThieu(M, t); return r.length ? '<div class="sl-bao vang hso-nhac hso-thieu">⚠ <b>Trước khi in</b>:<ul>'+r.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul></div>' : ''; }
function hsoChamTuy(mk, md){   /* md = {khóa: giá trị mặc định khi In sẵn} */
  return '<div class="hso-cham'+(HSO_GM ? ' hso-gm' : '')+'"><div class="hso-cham-che">'+gdxChip('🖨 Bản thật', !HSO_GM, 'hsoGhiMauDat(0)', 'hso-ct', 'In theo ✍ / 🖨 từng ô bên dưới')+gdxChip('📝 Bản ghi mẫu', HSO_GM, 'hsoGhiMauDat(1)', 'hso-ct', 'In số liệu thật vào mọi ô khách phải viết — khách chép lại vào mẫu thật')+'</div>'+
    (HSO_GM ? '<div class="sl-bao vang hso-nhac">📝 <b>Bản ghi mẫu</b>: mọi ô của khách in sẵn số liệu thật (có số liệu mới in; ngày in khi đã gõ). Phần UBND / Hội / Ngân hàng vẫn chấm. Chỉ cho lần in này — bấm <b>🖨 Bản thật</b> để về.</div>' : '')+
    '<div class="hso-cham-dau">Ô chấm: <b>✍ viết tay</b> hay <b>🖨 in sẵn</b> <small>(app nhớ theo mẫu)</small></div>'+(HSO_CHAM[mk]||[]).map(function(x){
    if(x[2]==='nhom') return '<div class="hso-cham-nhom">'+coChuHTML(x[1])+'</div>';
    var k = x[0], kieu = hsoChamKieu(mk, k), inS = kieu==='in', v = HSO.vay[k]!==undefined ? HSO.vay[k] : (md && md[k]!==undefined ? md[k] : ''), o = '';
    var sw = '<span class="hso-sw"><button class="'+(inS ? '' : 'bat')+'" onclick="hsoChamDat(\''+mk+'\',\''+k+'\',\'cham\')" title="Để chấm — ghi tay">✍</button><button class="'+(inS ? 'bat' : '')+'" onclick="hsoChamDat(\''+mk+'\',\''+k+'\',\'in\')" title="In sẵn">🖨</button></span>';
    if(inS){
      if(x[2]==='lyDo'){ var ds = hsoLyDoDs(); if(HSO.vay.lyDo===undefined) HSO.vay.lyDo = ds[0];
        o = '<select onchange="if(this.value){HSO.vay.lyDo=this.value;hsoVe();}"><option value="">— chọn lý do có sẵn —</option>'+ds.map(function(l, i){ return '<option value="'+coChuHTML(l)+'"'+(l===HSO.vay.lyDo ? ' selected' : '')+'>'+coChuHTML(l)+'</option>'; }).join('')+'</select>'+
          '<span class="hso-cham-ly">'+hsoIn('HSO.vay.lyDo=this.value;hsoHen()', HSO.vay.lyDo, 'gõ lý do khác')+'<button class="nho" onclick="hsoLyDoThem()" title="Thêm lý do đang gõ vào danh sách">＋</button>'+
          (ds.indexOf(HSO.vay.lyDo)>=0 && ds.length>1 ? '<button class="nho" onclick="hsoLyDoBo('+ds.indexOf(HSO.vay.lyDo)+')" title="Bỏ lý do này khỏi danh sách">✕</button>' : '')+'</span>'; }
      else if(x[2]==='kb'){ var kv = hsoChamKBLay(mk, k); o = hsoIn('hsoChamKBDat(\''+mk+'\',\''+k+'\',this.value)', kv==null ? '' : kv, (md && md[k] ? 'trống = '+md[k] : 'khai 1 lần, app nhớ')+(x[4]==='ct' ? ' (theo chương trình đang chọn)' : '')); }
      else if(x[2]==='tu') o = '<small class="hso-cham-tu">'+(md && md[k] ? 'tự lấy: '+coChuHTML(md[k]) : 'tự lấy khi có số liệu')+'</small>';
      else o = (x[2]==='ngay' ? '<small class="hso-cham-tu">'+'gõ ngày — trống vẫn chấm'+'</small>' : '')+hsoIn('HSO.vay[\''+k+'\']=this.value;hsoHen()', v, x[2]==='tien' ? 'số tiền' : x[2]==='so' ? 'số' : x[2]==='ngay' ? '' : '', x[2]==='ngay' ? 'date' : (x[2]==='so' ? 'number' : ''));
    }
    return '<div class="hso-cham-o"><span class="hso-cham-nhan">'+coChuHTML(x[1])+(HSO_GM && !hsoGhiMauO(mk, k) ? ' <small class="hso-cham-tu">(UBND / Hội / NH — vẫn chấm)</small>' : '')+(inS ? ' <small class="hso-cham-ng" title="Nguồn số liệu">📎 '+coChuHTML(hsoChamNguon(mk, x))+'</small>' : '')+'</span>'+sw+'<span class="hso-cham-gt">'+(inS ? o : '<i class="hso-cham-tay">…… chấm, ghi tay</i>')+'</span></div>'; }).join('')+'</div>';
}
/* 3.206 (anh gửi mẫu 14/10): 01/TĐCK — Giấy đề nghị thay đổi mẫu chữ ký giao dịch với NHCSXH (VB 2407 ngày 28/3/2025). Người đề nghị = người vay đang chọn
   (dùng chung lựa chọn với 09A); nhân thân theo danh bạ (Mẫu 31); ngày ký = ô chấm tùy biến; phần chấp thuận NH luôn chấm. In kèm 09A (cùng khổ dọc → 1 lần in / 1 file Word). */
HSO_CHAM['01tdck'] = [['_1','Khách hàng','nhom'], ['ngayKy','Ngày tháng (khách hàng ký)','ngay','cham'], ['_2','Chấp thuận của NHCSXH','nhom'], ['nhTen','"chấp thuận cho ông/bà …" = tên khách hàng','tu','cham'], ['nhNgay','"kể từ ngày …/…/…" (hiệu lực mẫu chữ ký mới)','ngay','cham']];   /* 3.220 (anh 15/10): thêm phần chấp thuận NH — mặc định ✍ chấm */
/* 3.215 (anh 15/10): ô tùy biến từng mẫu, liệt kê từ trên xuống. Nhân thân, món vay, tổ, Hội, chương trình, số tiền / phương án (đã gõ ở phiếu hộ) KHÔNG ở đây.
   Phần NH phê duyệt / UBND / trưởng thôn: mặc định ✍ chấm như cũ — anh bật 🖨 khi muốn in sẵn. */
HSO_CHAM['01td'] = [['_1','Người vay','nhom'], ['ngayKy','Ngày tháng (người vay ký)','ngay','cham'],
  ['_2','Xác nhận của UBND xã','nhom'], ['ubOng','"Ông/bà …" = họ tên người vay','tu','cham'],
  ['_3','Phê duyệt của Ngân hàng','nhom'], ['nhTien','1. Số tiền cho vay + bằng chữ (= số đề nghị)','tu','cham'], ['nhLai','2. Lãi suất (%/năm)','kb','cham','ct'], ['nhQH','2. Lãi suất nợ quá hạn (% lãi suất khi cho vay)','kb','cham'],
  ['nhTH','3. Thời hạn cho vay, kỳ hạn trả nợ (= đề nghị)','tu','cham'], ['nhHan','4. Hạn trả nợ cuối cùng (= đề nghị)','tu','cham'], ['nhNgayLai','5. Lãi trả hàng tháng vào ngày','kb','cham'], ['nhNgay','Ngày tháng (Giám đốc ký)','ngay','cham']];
HSO_CHAM['03td'] = [['_1','Tổ trưởng · UBND','nhom'], ['ngayKy','Ngày tháng (cột xác nhận UBND)','ngay','cham'],
  ['_2','Phê duyệt của Ngân hàng','nhom'], ['nhCot','Cột 7–8: số tiền, thời hạn (= đề nghị của tổ)','tu','cham'], ['nhNgay','Ngày tháng (phần phê duyệt)','ngay','cham'], ['nhSo','Số người được vay, tổng số tiền (tự tính theo danh sách)','tu','cham']];
HSO_CHAM['01tgtv'] = [['_1','A — thông tin khách hàng','nhom'], ['cif','Ô đầu trang + phần D: Số CIF (mã KH Mẫu 31)','tu','cham'], ['quocTich','Quốc tịch ☒ Việt Nam','tu','cham'], ['danToc','Dân tộc (Mẫu 31)','tu','cham'],
  ['cuTru','Tình trạng cư trú ☒ Có cư trú','tu','cham'], ['hanCCCD','Ngày hết hạn CCCD (tự tính theo ngày sinh, ngày cấp)','tu','cham'], ['thuongTru','Nơi thường trú: Tổ dân phố/Thôn · Phường/Xã · Tỉnh (sổ hộ vay)','tu','cham'],
  ['sdt','Điện thoại liên hệ (Mẫu 31 / sổ hộ vay)','tu','cham'], ['_2','C — cam kết','nhom'], ['ngayKy','Ngày tháng (khách hàng ký)','ngay','cham']];   /* 3.219 (anh 15/10): mặc định ✍ chấm ghi tay */
HSO_CHAM['01gqvl'] = [['_1','Người vay ký','nhom'], ['ngayKy','"…, ngày … tháng … năm …" (người vay ký phương án)','ngay','cham']];   /* 3.220 */
HSO_CHAM['07b'] = [['_1','Mở đầu hợp đồng','nhom'], ['noiKy','"Hôm nay, ngày … tại …" — nơi ký hợp đồng','kb','cham']];   /* 3.220 · ngày ký HĐ: ô "Ngày ký HĐ" ở trên (gõ thì in, trống chấm) */
HSO_CHAM['01uq'] = [['_1','Mục I','nhom'], ['ngayLap','"Ngày … tháng … năm …" lập giấy','ngay','cham'],
  ['_2','Chữ ký','nhom'], ['truongThon','Chứng kiến của Trưởng thôn — họ tên (⚙ Khai báo chung › Trưởng ấp)','tu','cham']];
function hsoLap01tdck(t){
  var T = t ? hsoTo(t) : {}, c = hsoKhachChon(t) || {}, ns = String(c.ns||''), noiCap = c.noiCap || hsoNoiCapGY(c.ncap);
  var nsChu = ns.length>=10 ? hsoO(ngayVNsl(ns)) : ns.length===4 ? hsoCham(3)+'/'+hsoCham(4)+'/'+hsoO(ns) : hsoCham(4)+'/'+hsoCham(6)+'/'+hsoCham(6);
  var kyO = '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>Họ và tên:'+hsoCham(40)+'</p>';
  var h = hsoBang('khung0', [74, 26], '<tr><td class="c">'+hsoQH('–', 13)+'</td><td><p class="b i s12">Mẫu số 01/TĐCK</p><p class="i s12">Lập 01 bản lưu NH</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ</p><p class="c b">Về việc thay đổi mẫu ký giao dịch với NHCSXH</p>'+
    '<p class="c tr"><b>Kính gửi:</b> '+coChuHTML(hsoPGD('kinhGui'))+'</p>'+
    '<p class="tr">Tên tôi là:'+hsoO(c.ten, 'sl', 36)+'; ngày, tháng, năm sinh: '+nsChu+'</p>'+
    '<p>Số thẻ căn cước/căn cước công dân:'+hsoO(c.cccd, 'sl', 40)+'; ngày cấp: '+hsoNgayO(c.ncap, 'sl')+'; nơi cấp:'+hsoO(c.cccd ? noiCap : '', 'sl', 46)+'</p>'+
    '<p>Nơi cư trú:'+hsoO(c.ten ? hsoDiaChi(c, t) : '', 'sl', 90)+'</p>'+
    '<p class="j">Là đại diện theo ủy quyền của hộ gia đình đứng tên vay vốn và thực hiện các giao dịch với NHCSXH, thuộc Tổ Tiết kiệm và vay vốn do ông (bà):'+hsoO(T.tt, 'sl', 40)+' làm Tổ trưởng.</p>'+
    '<p class="j">Đề nghị NHCSXH '+hsoO(hsoPGD('ngan'), 'sl', 34)+' thay đổi mẫu chữ ký giao dịch với Ngân hàng như sau:</p>'+
    hsoBang('luoi', [1, 1], '<tr><td class="c"><p class="c b">Chữ ký thứ nhất</p></td><td class="c"><p class="c b">Chữ ký thứ hai</p></td></tr><tr><td>'+kyO+'</td><td>'+kyO+'</td></tr>')+
    '<p>&nbsp;</p>'+
    hsoBang('khung0', [1.15, 1], '<tr><td class="c"><p class="c b">CHẤP THUẬN CỦA</p><p class="c b">NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p>'+
      '<p class="j">Ngân hàng Chính sách xã hội '+coChuHTML(hsoPGD('ngan'))+' chấp thuận cho ông/bà:'+(hsoChamIn('01tdck', 'nhTen') && c.ten ? ' '+hsoO(c.ten, 'sl')+' ' : hsoCham(30))+' có tên trên thay đổi mẫu chữ ký giao dịch với NHCSXH theo mẫu chữ ký đã đăng ký kể từ ngày '+(function(){ var g = hsoChamIn('01tdck', 'nhNgay') ? hsoNg(hsoChamGT('01tdck', 'nhNgay', '')) : null; return g ? hsoO(g.d+'/'+g.m+'/'+g.y, 'kb') : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8); })()+'</p>'+
      '<p class="c b tr">GIÁM ĐỐC</p><p class="c i s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c i">'+hsoO(T.xa, 'sl', 14)+hsoChamNgay('01tdck', 'ngayKy')+'</p><p class="c b">KHÁCH HÀNG</p><p class="c i s11">(Ký, ghi rõ họ và tên)</p></td></tr>');
  return {ma:'01/TĐCK', h:h};
}
/* 3.206 (anh chốt 14/10): 09A in kèm MẪU 06/TD (bên KTGS gọi "Mẫu 06 KTGS") — KHÔNG chép / sửa mẫu KTGS (khóa): gọi đúng hàm KTGS
   (ktGiaTri06 → ktHTML06 / ktDocx 'm06') cho 1 hộ = món đang gia hạn; Hội quản lý theo khai báo KTGS; cán bộ kiểm tra để trống (chấm); mục đích: in ngành (Mẫu 31) hoặc để trống */
function hso06Gt(){
  var S = hsoCH(), t = KHO.to(S.to), V = HSO.vay; if(!t || !V.kh || typeof ktGiaTri06!=='function') return null;
  var mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0]; if(!m) return null;
  var c = hsoKhachChon(t) || {}, mm = Object.assign({}, m); ktMaKV([mm]);
  return ktGiaTri06(t, [{kh:V.kh, ten:c.ten || m.ten || '', mon:[mm]}], {ngay:'', ng1:'', cb2:'', cv2:'', dv:'', md:hsoLuu().md06==='in' ? 'nganh' : ''});
}
function hso06Ten(){ var c = hsoKhachChon(KHO.to(hsoCH().to)) || {}; return 'Mau 06-TD Phieu KT su dung von - '+boDauTen(c.ten || 'ho vay'); }
function hsoIn06(){ var g = hso06Gt(); if(!g) return bao('Chọn tổ, người vay, món vay trước.'); inBlob(new Blob([ktHTML06(g)], {type:'text/html'}), hso06Ten()+'.html'); }
function hsoIn09Kem(){ xuatIn(); setTimeout(hsoIn06, 1500); }   /* in 09A rồi in tiếp Mẫu 06/TD (2 khổ giấy khác nhau → 2 lần in); nút 🖨 06/TD để in lại riêng */
function hsoWord06(){ var g = hso06Gt(); if(!g) return; ktDocx('m06', g).then(function(bl){ giaoFile(bl, hso06Ten()+'.docx'); }).catch(function(er){ baoLoi('Tạo Word Mẫu 06/TD lỗi: '+(er && er.message || er)); }); }
/* 3.253 (anh chốt 17–18/10, ý 12–14): MẪU 06/TD trong Hồ sơ vay — gọi đúng hàm Mẫu 06 KTGS (ktGiaTri06 → ktHTML06 / ktDocx 'm06'), không chép / sửa mẫu KTGS.
   Hộ = danh sách 03/TD (chung bộ 01 + 03 + 06; trống → hộ đang lập 01/TD). Phần ghi theo hồ sơ điền sẵn đủ (anh 18/10): họ tên, chương trình, giải ngân = dư nợ = số tiền vay 01/TD, mục đích;
   phần kiểm tra thực tế để trống ghi tay. Nhiều hộ / phiếu (≈ 3 hộ / mặt theo khuôn KTGS); hộ ở nhiều tổ → mỗi tổ 1 phiếu. */
function hso06Ho(){ var D3 = hsoD03(), B = hsoBo(), ds = D3.ds.slice();
  if(!ds.length && B && B.hoId && hmTim(B.hoId)) ds = [hsoD03Moi(hmTim(B.hoId), B.ct)];
  return ds.map(function(r){ var o = hmTim(r.hoId); return o ? {o:o, r:r, ct:(r.ct || D3.ct || (B && B.ct) || '')} : null; }).filter(Boolean); }
function hso06GtHS(){ if(typeof ktGiaTri06!=='function') return [];
  var nhom = {}, thu = [];
  hso06Ho().forEach(function(h){ var o = h.o, k = o.to || ('_'+(o.tenXa||'')+'|'+(o.tenThon||'')); if(!nhom[k]){ nhom[k] = []; thu.push(k); } nhom[k].push(h); });
  return thu.map(function(k){ var ds = nhom[k], o0 = ds[0].o, t = (o0.to && KHO.to(o0.to)) || {ten:'', tenXa:o0.tenXa || '', tenThon:o0.tenThon || '', ma:''}, phu = {};
    var dc = ds.map(function(h){ var tien = hsoSo(h.r.tien), ten = hmTen(h.o); phu[tenHoaDau(ten)] = {ct:h.ct==='NSVSMT' ? 'Nước sạch VSMT' : hsoCTTenIn(h.ct), md:h.r.md || ''};
      return {kh:h.o.kh || ('z'+h.o.id), ten:ten, mon:[{_ma:'', ct:'', gn:tien, dn:tien}]}; });
    var v = hso06V(), g; try { g = ktGiaTri06(t, dc, v); } catch(e){ g = ktGiaTri06({ten:t.ten || '', tenXa:t.tenXa || '', tenThon:t.tenThon || ''}, dc, v); }
    var mdHS = hso06L().md!=='trong'; g.rows.forEach(function(r){ var x = phu[r.R2]; if(x){ r.R4 = x.ct; r.R7 = mdHS ? x.md : ''; } });   /* chương trình, mục đích theo hồ sơ (KTGS lấy từ Mẫu 31) */
    return g; }); }
/* 3.255 (anh 18/10 "Mẫu 06 liên kết cho chọn và khai báo trong khai báo riêng của mẫu"): ⚙ Khai báo riêng 06/TD — đơn vị kiểm tra · cán bộ 1 (vai trò theo 🏛 Khai báo Hội) · cán bộ 2 + chức vụ · thời điểm · mục đích */
function hso06L(){ var L = hsoLuu(); L.k06 = L.k06 || {}; return L.k06; }
function hso06V(){ var L = hso06L(); return {ngay:L.ngay || '', ng1:L.ng1!==undefined ? L.ng1 : 'pct', cb2:L.cb2 || '', cv2:L.cv2 || '', dv:L.dvc==='cham' ? '-' : L.dvc==='go' ? (String(L.dv||'').trim() || '-') : '', md:''}; }
function hso06Dat(k, v){ var L = hso06L(); if(v==null || v==='') delete L[k]; else L[k] = v; luu(); hsoVe(); }
function hso06MD(){ hsoLuu().k06 = {}; luu(); hsoVe(); bao('Khai báo riêng 06/TD về mặc định.'); }
function hso06KBHTML(){ var L = hso06L(), mo = hsoKBRDangMo('06td'), dvc = L.dvc || 'tu', ng1 = L.ng1!==undefined ? L.ng1 : 'pct';
  var sel = function(k, gt, ds){ return '<select onchange="hso06Dat(\''+k+'\',this.value)">'+ds.map(function(x){ return '<option value="'+x[0]+'"'+(x[0]===gt ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'; };
  var inp = function(k, ph, kieu){ return '<input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(L[k]||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="hso06Dat(\''+k+'\',this.value.trim())">'; };
  return '<details class="hso-kbr-d"'+(mo ? ' open' : '')+' ontoggle="hsoKBRMo(\'06td\',this.open)"><summary class="nhan-nhom hso-kbr-o">⚙ Khai báo riêng — Mẫu 06/TD</summary>'+
    hsoTuyO('Đơn vị kiểm tra', sel('dvc', dvc, [['tu', 'Tự lấy — Hội của tổ (🏛 Khai báo Hội)'], ['cham', 'Để chấm (ghi tay)'], ['go', 'Gõ riêng']])+(dvc==='go' ? inp('dv', 'vd: Hội Nông dân xã …') : ''))+
    hsoTuyO('Cán bộ kiểm tra 1', sel('ng1', ng1, (typeof KT_IN_VT!=='undefined' ? KT_IN_VT : [['', 'Để trống (ghi tay)']]).map(function(x){ return [x[0], x[1]+(x[0] ? ' — tên theo 🏛 Khai báo Hội' : '')]; })))+
    hsoTuyO('Cán bộ kiểm tra 2', inp('cb2', 'họ tên — trống = chấm'))+hsoTuyO('Chức vụ cán bộ 2', inp('cv2', 'trống = chấm'))+
    hsoTuyO('Thời điểm kiểm tra', inp('ngay', '', 'date'))+'<div class="sl-phu">Trống = chấm; ngày ký cuối phiếu theo ngày này.</div>'+
    hsoTuyO('Mục đích sử dụng vốn', sel('md', L.md || 'hs', [['hs', 'Theo hồ sơ (01/TD)'], ['trong', 'Để trống (ghi tay)']]))+
    '<div class="hang-nut"><button class="nho" onclick="hso06MD()">↺ Về mặc định</button></div>'+
    '<div class="sl-phu">Khuôn phiếu theo Mẫu 06 KTGS (khóa) — chỉ các chỗ chấm khai được.</div></details>'; }
function hso06TenHS(){ var ds = hso06Ho(); return 'Mau 06-TD Phieu KT su dung von - '+(ds.length===1 ? boDauTen(hmTen(ds[0].o)) : ds.length+' ho'); }
function hsoLap06td(){ var g = hso06GtHS(); return {ma:'06/TD', k06:g, trang:g.length ? ktHTML06(g.length===1 ? g[0] : g) : '<p style="font-family:sans-serif;padding:20px">Chưa có hộ — chọn hộ ở 📒 Sổ hộ vay (📄 Lập HS) hoặc ＋ Thêm hộ.</p>'}; }
function hsoIn06HS(){ var g = hso06GtHS(); if(!g.length) return bao('Chưa có hộ cho Mẫu 06/TD.'); inBlob(new Blob([ktHTML06(g.length===1 ? g[0] : g)], {type:'text/html'}), hso06TenHS()+'.html'); }
function hsoWord06HS(){ var g = hso06GtHS(); if(!g.length) return bao('Chưa có hộ cho Mẫu 06/TD.'); ktDocx('m06', g.length===1 ? g[0] : g).then(function(bl){ giaoFile(bl, hso06TenHS()+'.docx'); }).catch(function(er){ baoLoi('Tạo Word Mẫu 06/TD lỗi: '+(er && er.message || er)); }); }
function hsoKem06(){ var B = hsoBo(), M = hsoMau(); return M.k==='01td' && !!(B && B.kem && B.kem.k06); }
function hsoLap06a(){ return {ma:'06A/TD', h:'<p>Thiếu mô-đun mẫu 06A (js/mau/06a.js).</p>'}; }   /* 3.430: js/mau/06a.js gán lại */
function hso06aMo(){ baoLoi('Thiếu mô-đun mẫu 06A (js/mau/06a.js).'); }
function hso06aKyMD(){ return ''; }   /* 3.431: js/mau/06a.js gán lại — kỳ mặc định cuối tháng trước */
function hsoLap09a(t){
  var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0] || null, han = m ? skHL(m) : '', tien = hsoSo(hsoChamGT('09a', 'tienGH', m ? m.dn : 0));
  var h = hsoBang('khung0', [74, 26], '<tr><td class="c">'+hsoQH('–', 13)+'</td><td><p class="b i s12">Mẫu số: 09A/TD</p><p class="i s12">Lập 01 liên lưu NH</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ GIA HẠN NỢ</p><p class="c tr"><b>Kính gửi:</b> '+coChuHTML(hsoPGD('kinhGui'))+'</p>'+
    '<p class="tr">Họ và tên khách hàng:'+hsoO(c && c.ten, 'sl', 50)+' Năm sinh:'+hsoO(c && c.ns ? c.ns.slice(0, 4) : '', 'sl', 22)+'</p>'+
    '<p>Nơi cư trú:'+hsoO(c || t ? hsoDiaChi(c, t) : '', 'sl', 95)+'</p>'+
    '<p class="j">Là tổ viên Tổ tiết kiệm và vay vốn do ông (bà):'+hsoO(T.tt, 'sl', 45)+' làm Tổ trưởng, thuộc tổ chức Hội, đoàn thể:'+hsoO(T.hoi, 'sl', 32)+' quản lý.</p>'+
    '<p>Hiện nay, tôi đang vay vốn Ngân hàng Chính sách xã hội, cụ thể như sau:</p>'+
    '<p>- Mã khoản vay'+hsoO(m && m.ku, 'sl', 40)+'thuộc chương trình cho vay'+hsoO(m ? hsoCTMon(m) : '', 'sl', 22)+'</p>'+
    '<p>- Số tiền: gốc:'+hsoO(m ? tdnTien(m.dn) : '', 'sl', 40)+'đồng; số tiền nợ lãi:'+hsoO(m && laiTon(m)>0 ? tdnTien(laiTon(m)) : '', 'sl', 26)+'đồng.</p>'+
    '<p class="j">Theo thỏa thuận đã ký với Ngân hàng, tôi phải trả số tiền trên vào ngày'+(han ? hsoO(ngayVNsl(han)) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+' nhưng chưa trả được vì lý do:'+hsoO(hsoChamGT('09a', 'lyDo', hsoLyDoDs()[0]), 'kb', 60)+'</p><p>'+hsoCham(120)+'</p>'+
    '<p class="j">Đề nghị Ngân hàng xem xét cho gia hạn khoản nợ gốc'+(tien ? hsoO(tdnTien(tien), 'kb') : hsoCham(36))+'đồng;</p>'+
    '<p class="j">Thời gian đề nghị:'+hsoO(hsoChamGT('09a', 'thang'), 'kb', 8)+'tháng; kế hoạch trả nợ'+hsoO(hsoChamGT('09a', 'kyTra'), 'kb', 10)+'tháng/kỳ với số tiền'+hsoO(hsoChamTien('09a', 'tienKy'), 'kb', 36)+'đồng/kỳ, số tiền trả nợ kỳ cuối'+hsoO(hsoChamTien('09a', 'tienCuoi'), 'kb', 32)+'đồng.</p>'+
    '<p class="j">Tôi xin cam kết sử dụng vốn vay đúng mục đích; trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai tôi xin chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">Tổ TK&amp;VV</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c i">'+hsoO(T.xa, 'sl', 18)+hsoChamNgay('09a', 'ngayKy')+'</p><p class="c b">Người vay</p><p class="c i s11">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'+
    hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">Ý kiến của tổ chức chính trị - xã hội nhận ủy thác cấp xã (phường)</p><p>'+hsoCham(60)+'</p><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(6)+' năm '+hsoCham(11)+'</p><p class="c b">Chủ tịch/Bí thư</p><p class="c i s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c b">Xác nhận của UBND cấp xã (phường)</p><p>'+hsoCham(60)+'</p><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(6)+' năm '+hsoCham(10)+'</p><p class="c b">Chủ tịch</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p class="c b">PHÊ DUYỆT CỦA NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p>- Số tiền được gia hạn nợ là '+hsoCham(36)+'đồng.</p><p>- Thời gian gia hạn nợ : Từ ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(9)+' đến ngày'+hsoCham(6)+'/'+hsoCham(5)+'/'+hsoCham(12)+'</p>'+
    hsoBang('khung0 hso-ky', [1, 1.2, 1], '<tr><td class="c"><p class="c b">CÁN BỘ TÍN DỤNG</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b s12">TRƯỞNG PHÒNG KH-NVTD</p><p class="c b">(TỔ TRƯỞNG KH-NV)</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c i">Ngày'+hsoCham(6)+'tháng'+hsoCham(5)+'năm '+hsoCham(10)+'</p><p class="c b">GIÁM ĐỐC</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'09A/TD', h:h};
}

function hsoKe(mm){ return '<p class="ke" data-ke="'+mm+'" style="width:'+mm+'mm"></p>'; }   /* 3.171 (anh chốt): đường kẻ ngang mảnh 0,5 pt dưới tiêu ngữ / tên cơ quan — không gạch chân chữ */
var HSO_LOGO_MD = {'01td':1, '01tgtv':1};   /* mẫu gốc có logo (PDF anh gửi) — anh đổi ở ⚙ Khai báo 1 lần */
/* 3.194 (anh gửi 14/10, đồng ý đưa vào repo — biểu trưng công khai của NHCSXH, không phải dữ liệu khách): logo cánh sen có sẵn trong app = logo mặc định;
   anh nạp logo khác ở ⚙ Khai báo 1 lần thì ưu tiên logo nạp. Dùng: logo góc các mẫu Hồ sơ vay · logo chìm 🧾 Bảng kê. */
var LOGO_NHCSXH = 'data:image/png;base64,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', LOGO_NHCSXH_TY = 1.0567;
function hsoLogoSrc(){ return hsoKB().logo || LOGO_NHCSXH; }
function hsoLogoTai(){ var a = document.createElement('a'); a.href = hsoLogoSrc(); a.download = hsoKB().logo ? 'Logo.png' : 'Logo_NHCSXH.png'; document.body.appendChild(a); a.click(); a.remove(); }
function hsoLogoCo(k){ var kb = hsoKB(), m = kb.logoMau || HSO_LOGO_MD; return !!m[k]; }
function hsoLogo(k, mm){ var kb = hsoKB(); if(!hsoLogoCo(k)) return ''; mm = mm || 20;
  return '<img class="hso-logo" src="'+hsoLogoSrc()+'" data-mm="'+mm+'" data-ty="'+(kb.logo ? (kb.logoTy||1) : LOGO_NHCSXH_TY)+'" style="width:'+mm+'mm" alt="">'; }
function hsoLogoNap(inp){   /* nạp logo 1 lần: thu nhỏ ≤ 360 px, lưu cùng cài đặt (đồng bộ Drive) — không đưa vào repo */
  var f = inp.files && inp.files[0]; if(!f) return;
  var r = new FileReader();
  r.onload = function(){ var im = new Image(); im.onload = function(){ var k = Math.min(1, 360/Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width*k); c.height = Math.round(im.height*k); var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      var kb = hsoKB(); kb.logo = c.toDataURL('image/png'); kb.logoTy = +(c.height/c.width).toFixed(4); if(!kb.logoMau) kb.logoMau = Object.assign({}, HSO_LOGO_MD); luu();
      bao('Đã nạp logo — in ở các mẫu đã tích.', 4); hsoKBHop(); };
    im.src = r.result; };
  r.readAsDataURL(f);
}
/* ---------- 3.171 (anh chốt 11/10): BỘ HỒ SƠ VAY — lưu tạm (D.cauHinh.hsoBo, đồng bộ Drive), in thành bộ gửi tổ đi ký ---------- */
var HSO_CT = {HSSV:'Học sinh sinh viên', NSVSMT:'Cấp nước sạch và vệ sinh môi trường nông thôn'};   /* chữ in trên đơn — đúng PDF */
var HSO_TT = [['soan','Đang soạn'], ['gui','Đã in, gửi tổ'], ['nop','Tổ đã nộp lại'], ['gn','Đã giải ngân']];
function hsoBoDs(){ var c = D.cauHinh; if(!Array.isArray(c.hsoBo)) c.hsoBo = []; return c.hsoBo; }
function hsoBo(){ var id = hsoCH().boId; return hsoBoDs().find(function(b){ return b.id===id; }) || null; }
function hsoBoMoi(){
  var b = {id:'bo'+Date.now().toString(36), ct:'HSSV', tt:'soan', tao:new Date().toISOString(), moi:false, kh:'', to:'', toi:{}, nv:{danToc:'Kinh'}, ho:[], soNguoi:'', pa:{loai:'moi', nuoc:true, vs:false, tienN:'25000000', tienV:'25000000'}, tien:'', tuCo:'', dtth:'', chon:{uq:1, td:1, bb:1, ds:1, tgtv:0}};
  hsoBoDs().unshift(b); hsoCH().boId = b.id; luu(); return b;
}
function hsoBoLuu(){ var b = hsoBo(); if(b){ b.sua = new Date().toISOString(); luu(); } }
function hsoCCCDDoc(so){   /* số CCCD 12 số → giới tính + năm sinh (chữ số 4: 0/1 thế kỷ 20, 2/3 thế kỷ 21; chẵn nam, lẻ nữ; 2 số tiếp = năm) */
  so = String(so||'').replace(/\D/g, ''); if(so.length!==12) return null;
  var g = +so[3]; if(g>3) return null; return {gt:g%2 ? 'Nữ' : 'Nam', nam:(g<2 ? 1900 : 2000)+(+so.slice(4, 6))};
}
function hsoNoiCapGY(ncap){ return !ncap ? '' : ncap>='2024-07-01' ? 'Bộ Công an' : 'Cục CS QLHC'; }   /* gợi ý theo ngày cấp — anh sửa được */
function hsoNgayVN(iso){ return iso ? ngayVNsl(iso) : ''; }
function hsoNgayTu(v){ var d = hsDoc(v); return d ? ngayISO(d) : ''; }
function hsoBoNV(B){ return (B && B.nv) || {}; }
function hsoBoT(B){ var t = B && B.to && KHO.to(B.to); return t ? hsoTo(t) : ((B && B.toi) || {tinh:hsoPGD('tinh')}); }
/* phương án theo thẻ chương trình (3.208, anh chốt 14/10): HSSV số tháng + số tiền gõ tay (không tự tính); công trình: mỗi công trình 1 dòng, mức vay theo thẻ;
   thời hạn / kỳ hạn: bộ gõ thì in số gõ, không gõ → thẻ "🖨 Ghi sẵn" in số thẻ, "✍ Chấm" để chấm */
function hsoPaK(i){ return i===0 ? ['nuoc', 'tienN'] : i===1 ? ['vs', 'tienV'] : ['c'+i, 't'+i]; }   /* khóa lưu công trình thứ i (giữ khóa cũ nuoc / vs của bộ đã lập) */
function hsoGT(v, md){ return v!=null && String(v).trim()!=='' ? String(v).trim() : (md || ''); }
function hsoLoaiChu(C, v){ var ds = (C && C.loaiDs && C.loaiDs.length) ? C.loaiDs : ['Xây mới', 'Sửa chữa']; return v==='sua' ? 'Sửa chữa' : v==='moi' || !v ? ds[0] : String(v); }   /* 3.242: lựa chọn khai ở thẻ (Xây mới · Sửa chữa · Cải tạo…); mã cũ moi / sua vẫn đọc */
function hsoTuCo(B){ var C = B && hsoCTV(B.ct); return B ? hsoSo(hsoGT(B.tuCo, C && C.tuCo)) : 0; }   /* 3.242: trống → mặc định thẻ (NSVSMT 5 triệu) */
function hsoPA(B){
  var r = {dong:[], tien:0, md:'', mdDs:'', th:'', ky:'', canh:[], C:null};
  if(!B) return r;
  var C = r.C = hsoCTV(B.ct) || hsoCTV('HSSV'), P = B.pa || {};
  r.th = hsoGT(B.th, C.thIn==='in' ? C.th : ''); r.ky = hsoGT(B.ky, C.kyIn==='in' ? C.ky : '');
  if(C.kieu==='hssv'){ r.tien = hsoSo(B.tien); r.md = P.md || C.md[0] || 'Chi phí học tập, sinh hoạt';
    r.mdDs = r.md+' cho sinh viên'+(P.sv ? ' '+P.sv : '');
    r.dong = [[r.md+' cho sinh viên'+(P.sv ? ': '+P.sv : ''), hsoGT(P.soThang) ? hsoGT(P.soThang)+' tháng' : '', r.tien]]; }
  else if(C.kieu==='congtrinh'){ var ct = [];
    C.ctr.forEach(function(c, i){ var k = hsoPaK(i); if(!P[k[0]]) return; var tien = hsoSo(P[k[1]]) || hsoSo(c.tien); ct.push([c.ten, tien]);   /* 3.242 (anh 17/10): chưa gõ → mức mặc định công trình theo thẻ chương trình (25 triệu) */ if(hsoSo(c.tien) && tien>hsoSo(c.tien)) r.canh.push(c.ten+' vượt '+tdnTien(hsoSo(c.tien))+' / công trình'); });
    ct.forEach(function(x){ r.tien += x[1]; r.dong.push([x[0], '01 công trình', x[1]]); });
    var ghep = (C.loai ? hsoLoaiChu(C, P.loai)+' ' : '')+ct.map(function(x){ return x[0].toLowerCase(); }).join(', ');
    r.md = P.md || ghep.charAt(0).toUpperCase()+ghep.slice(1); r.mdDs = r.md; }
  else if(C.kieu==='gqvl'){ var dg = (P.dong||[]).filter(function(x){ return x.md || hsoSo(x.tien); });   /* 3.211: bảng mục đích nhiều dòng */
    r.dong = dg.map(function(x){ return [x.md||'', hsoGQSL(x), hsoSo(x.tien)]; }); r.tien = r.dong.reduce(function(a, x){ return a+x[2]; }, 0) || hsoSo(B.tien);
    r.md = P.ten || (dg[0]||{}).md || ''; r.mdDs = dg.map(function(x){ return x.md; }).filter(Boolean).join(', ') || r.md; }
  else { r.tien = hsoSo(B.tien); r.md = P.md || C.md[0] || ''; r.mdDs = r.md; r.dong = [[hsoGT(P.dt, r.md), hsoGT(P.sl), r.tien]]; }
  return r;
}
function hsoDongTien(v){ return v ? tdnTien(v)+' đồng' : ''; }
/* ---------- 01/TD Giấy đề nghị vay vốn — đúng PDF (HSSV có xác nhận UBND xã; NSVSMT không) ---------- */
function hsoBoHoiTen(T){ return T.hoi || ''; }
function hsoHoiNgan(h){   /* 3.247 (anh 18/10): tên tổ chức in trên đơn — "Hội Nông dân" · "Hội Cựu chiến binh" · "Hội Liên hiệp phụ nữ" · "Đoàn thanh niên" (không ghi xã / phường) */
  var s = String(h||'').trim(); if(!s) return '';
  if(/nông\s*dân/i.test(s)) return 'Hội Nông dân'; if(/cựu\s*chiến\s*binh/i.test(s)) return 'Hội Cựu chiến binh'; if(/phụ\s*nữ/i.test(s)) return 'Hội Liên hiệp phụ nữ'; if(/đoàn|thanh\s*niên/i.test(s)) return 'Đoàn thanh niên';
  return s.replace(/\s+(xã|phường|thị trấn)\s.*$/i, ''); }
/* ---------- 03/TD Danh sách tổ viên đề nghị vay vốn — đúng PDF (A4 ngang, số dòng = số người + 2 dòng trống, kẻ chấm) ---------- */
/* ---------- 04/TD Thông báo kết quả phê duyệt — đúng PDF; in từng thông báo (chọn điểm GD, nhập số hộ + số tiền) ---------- */
/* ---------- 09A/TD Giấy đề nghị gia hạn nợ — đúng PDF ---------- */
/* ---------- 01/UQ Giấy ủy quyền — đúng PDF (thành viên hộ + người thừa kế chỉ ở mẫu này) ---------- */
function hsoLap01uq(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), ho = (B && B.ho) || [], dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null).replace(/, tỉnh .*$/, '') : '';
  var tv = B ? [{ten:N.ten, ns:N.ns, cccd:N.cccd, noi:dc}].concat(ho.map(function(x){ return {ten:x.ten, ns:x.ns, cccd:x.cccd, noi:x.noi || dc, qh:x.qh}; })) : [];
  var sup = function(n){ return '<sup>('+n+')</sup>'; }, n = Math.max(5, tv.length), r = '<thead><tr><td class="c b">TT</td><td class="c b">Họ và tên</td><td class="c b">Ngày, tháng, năm sinh</td><td class="c b">Số Thẻ căn cước/CCCD</td><td class="c b">Nơi cư trú</td></tr></thead><tbody>';
  for(var i=0;i<n;i++){ var x = tv[i]; r += '<tr><td class="c">'+(i+1)+'</td><td>'+(x ? hsoO(x.ten, i ? 'kb' : 'sl') : '')+'</td><td class="c">'+(x && x.ns ? hsoO(hsoNgayVN(x.ns), i ? 'kb' : 'sl') : '')+'</td><td class="c">'+(x && x.cccd ? hsoO(x.cccd, i ? 'kb' : 'sl') : '')+'</td><td>'+(x && x.noi ? hsoO(x.noi, 'sl') : '')+'</td></tr>'; }
  r += '</tbody>';
  var uq = '<tr><td class="c b">TT</td><td class="c b">Họ và tên</td><td class="c b">Quan hệ với Bên được ủy quyền</td><td class="c b">Ký tên</td></tr>';
  for(var j=0;j<Math.max(5, ho.length);j++){ var y = ho[j]; uq += '<tr><td class="c">'+(j+1)+'</td><td>'+(y ? hsoO(y.ten, 'kb') : hsoCham(26))+'</td><td>'+(y ? hsoO(y.qh, 'kb', 14) : hsoCham(14))+'</td><td>'+hsoCham(16)+'</td></tr>'; }
  uq += '<tr><td class="c">…</td><td>'+hsoCham(26)+'</td><td>'+hsoCham(14)+'</td><td>'+hsoCham(16)+'</td></tr>';
  var sn = B && B.soNguoi ? String(B.soNguoi) : '', tThon = hsoChamIn('01uq', 'truongThon') && B ? hsoBoT(B).truongAp || '' : '';   /* 3.215: tên trưởng thôn theo ⚙ Khai báo chung */
  var h = '<p class="r i s12">Mẫu số 01/UQ</p><p class="r i s12">Lập 02 bản:</p><p class="r i s12">01 bản lưu NH</p><p class="r i s12">01 bản lưu hộ gia đình</p>'+hsoQH('-', 14)+
    '<p class="c b s14 tr sau">GIẤY ỦY QUYỀN</p>'+
    '<p class="j thut tr">Căn cứ Bộ Luật dân sự số 91/2015/QH13 và các văn bản pháp lý có liên quan,</p>'+
    '<p class="j thut"><b>I.</b> '+(function(){ var g = hsoChamIn('01uq', 'ngayLap') ? hsoNg(hsoChamGT('01uq', 'ngayLap', '')) : null; return g ? 'Ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : 'Ngày … tháng … năm …….'; })()+', hộ gia đình chúng tôi gồm '+hsoO(sn, 'kb', 6)+' người'+sup(1)+', trong đó các thành viên từ đủ 18 tuổi trở lên, có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật gồm:</p>'+
    hsoBang('luoi', [6, 26, 16, 19, 33], r)+
    '<p class="j thut tr"><b>II.</b> Các thành viên trong hộ gia đình có tên tại mục I của Giấy ủy quyền này (gọi là Bên ủy quyền) thỏa thuận cử ông (bà): '+hsoO(N.ten, 'sl', 25)+' STT'+sup(2)+': '+(N.ten ? hsoO('01', 'sl') : hsoCham(4))+', sinh ngày: '+hsoO(hsoNgayVN(N.ns), 'sl', 12)+
      ', số Thẻ căn cước/CCCD: '+hsoO(N.cccd, 'sl', 14)+', ngày cấp: '+hsoO(hsoNgayVN(N.ncap), 'sl', 12)+', nơi cấp: '+hsoO(N.noiCap, 'sl', 14)+' (gọi là Bên được ủy quyền) đại diện theo ủy quyền cho chúng tôi thực hiện đứng tên người vay và thực hiện các giao dịch với Ngân hàng Chính sách xã hội theo quy định trước sự chứng kiến của Trưởng thôn.</p>'+
    '<p class="thut b">III. Cam kết</p>'+
    '<p class="j thut">1. Các thành viên trong hộ gia đình có tên tại mục I cam kết chịu trách nhiệm đối với toàn bộ các khoản vay tại Ngân hàng Chính sách xã hội.</p>'+
    '<p class="j thut">2. Giấy ủy quyền này có hiệu lực kể từ ngày ký và hết hiệu lực khi quyền và nghĩa vụ giữa chúng tôi với Ngân hàng Chính sách xã hội kết thúc theo quy định.</p>'+
    '<p class="j thut">3. Khi thay đổi người đại diện theo ủy quyền thì phải làm Giấy sửa đổi ủy quyền và được sự chấp thuận của Ngân hàng Chính sách xã hội nơi cho vay.</p>'+
    '<p class="j thut">4. Chúng tôi công nhận đã hiểu rõ mọi quyền, nghĩa vụ và lợi ích hợp pháp của mình; hậu quả pháp lý của việc ủy quyền. Chúng tôi chịu trách nhiệm trước pháp luật về mọi cam kết do bên được ủy quyền nhân danh chúng tôi thực hiện trong phạm vi ủy quyền nêu trên.</p>'+
    '<p class="j thut"><b>IV.</b> Giấy ủy quyền này được lập 02 bản có giá trị pháp lý như nhau: 01 bản gửi NHCSXH nơi cho vay, 01 bản lưu hộ gia đình./.</p>'+
    hsoBang('khung0 hso-ky', [64, 36], '<tr><td class="c"><p class="c b">BÊN ỦY QUYỀN'+sup(3)+'</p>'+hsoBang('khung0', [8, 40, 26, 26], uq)+'</td>'+
      '<td class="c"><p class="c b">BÊN ĐƯỢC ỦY QUYỀN'+sup(4)+'</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td></tr>')+
    '<p>&nbsp;</p>'+hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">CHỨNG KIẾN CỦA</p><p class="c b">TRƯỞNG THÔN</p><p class="c i s11">(Ký, ghi rõ họ tên)</p>'+(tThon ? '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+hsoO(tThon, 'kb')+'</p>' : '')+'</td><td class="c"><p class="c b">XÁC NHẬN CỦA</p><p class="c b">UBND CẤP XÃ</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>')+
    (tThon ? '<p>&nbsp;</p>' : '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>')+'<p class="ke trai" data-ke="55" style="width:55mm;margin-left:0"></p>'+
    '<p class="i s9"><sup>(1)</sup> Điền tổng số thành viên trong hộ gia đình, gồm cả người chưa thành niên và thành niên.</p><p class="i s9"><sup>(2)</sup> Số thứ tự của người được ủy quyền đã được ghi tại mục I của Giấy ủy quyền.</p>'+
    '<p class="i s9"><sup>(3)</sup> Là các thành viên ghi tại mục I, trừ thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p><p class="i s9"><sup>(4)</sup> Là thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p>';
  return {ma:'01/UQ', h:h};
}
/* ---------- 01/TGTV Giấy đăng ký mở tài khoản tổ viên (mẫu 03/2026) — đúng PDF, có logo + chân trang ---------- */
function hsoLap01tgtv(t, P){   /* P = {ten, ns, gt, cccd, ncap, noiCap, sdt, danToc, ap, tenXa, kh} hoặc null (mẫu trắng) */
  P = P || {}; var Q = function(k){ return hsoChamIn('01tgtv', k) && !!P.ten; }, o = function(x){ return x ? '☒' : '☐'; }, so = String(P.cccd||'').replace(/\D/g, ''), han = P.cccd ? toCCCDHan(P.cccd, P.ns, P.ncap) : null, hh = han && han.den ? han.den : '';
  var nd = hsoNg(P.ns), cap = hsoNg(P.ncap), hn = hsoNg(hh), ngay = function(n, a, b, c){ return n ? hsoO(n.d+'/'+n.m+'/'+n.y, 'sl') : hsoCham(a)+' /'+hsoCham(b)+'/'+hsoCham(c); };
  var oSo = '<table class="luoi" data-w="'+Array(13).join('1,').slice(0, -1)+'" style="width:96mm"><tr>'+Array.apply(null, Array(12)).map(function(_, i){ return '<td class="c">'+(so[i] ? hsoO(so[i]) : '&nbsp;')+'</td>'; }).join('')+'</tr></table>';
  var dong = function(h){ return '<p class="tr2">'+h+'</p>'; };
  var A = '<p class="i">Quý khách điền đầy đủ nội dung tại các trường thông tin có dấu (*)</p>'+
    hsoBang('khung0', [36, 64], '<tr><td><p class="b">Họ, chữ đệm, tên khai sinh*:</p></td><td><table class="luoi" data-w="1"><tr><td>'+(P.ten ? hsoO(P.ten.toUpperCase()) : '&nbsp;')+'</td></tr></table></td></tr>')+
    dong('<b>Ngày, tháng, năm sinh*:</b> '+ngay(nd, 10, 10, 10)+'          <b>Giới tính*:</b> '+o(P.gt==='Nam')+'Nam  '+o(P.gt==='Nữ')+'Nữ')+
    dong('<b>Quốc tịch*:</b> '+o(Q('quocTich'))+' Việt Nam   ☐ Khác (ghi rõ)'+hsoCham(18)+'   <b>Dân tộc*:</b> '+hsoO(Q('danToc') ? P.danToc : '', 'sl', 35))+
    dong('<b>Tình trạng cư trú*:</b> '+o(Q('cuTru'))+' Có cư trú   ☐ Không cư trú')+
    dong('<b>Thông tin giấy tờ tùy thân*:</b> '+o(so.length===12)+'Thẻ CC công dân/Thẻ CC     ☐CC điện tử')+
    hsoBang('khung0', [8, 92], '<tr><td><p>Số:</p></td><td>'+oSo+'</td></tr>')+
    dong('Ngày cấp: '+ngay(cap, 9, 9, 9)+'   Ngày hết hạn: '+ngay(Q('hanCCCD') ? hn : null, 9, 9, 9)+'   Nơi cấp: '+hsoO(P.noiCap, 'sl', 30))+
    dong('<b>Mã số thuế cá nhân (nếu có):</b> '+hsoCham(60))+dong('<b>Nghề nghiệp hiện tại</b>*:')+
    hsoBang('khung0 s12', [26, 24, 18, 32], '<tr><td>☐ Nhân viên văn phòng<br>☐ Lực lượng vũ trang<br>☐ Nông dân</td><td>☐ Công chức, viên chức<br>☐ Đã nghỉ hưu<br>☐ Công nhân</td><td>☐ Nội trợ<br>☐ Tự kinh doanh<br>☐ Lao động tự do</td><td>☐ Học sinh, sinh viên<br>☐ Giáo viên, giảng viên<br>☐ Khác (ghi rõ): '+hsoCham(18)+'</td></tr>')+
    '<p><b>Chức vụ*:</b> '+hsoCham(120)+'</p>'+
    dong('<b>Nơi thường trú :</b>')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoO(Q('thuongTru') ? P.ap : '', 'sl', 22)+' ')+dong('Phường/Xã/Đặc khu: '+hsoO(Q('thuongTru') && P.tenXa ? hsoXaTen(P.tenXa) : '', 'sl', 25)+'   Tỉnh/Thành phố: '+hsoO(Q('thuongTru') ? hsoPGD('tinh') : '', 'sl', 35))+
    dong('<b>Nơi ở hiện tại khác (nếu có):</b>')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoCham(22))+dong('Phường/Xã/Đặc khu: '+hsoCham(25)+'Tỉnh/Thành phố: '+hsoCham(35))+
    dong('<b>Nơi làm việc</b>: '+hsoCham(55)+'Điện thoại nơi làm việc: '+hsoCham(40))+dong('<b>Địa chỉ nơi làm việc</b>:')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoCham(22))+dong('Phường/Xã/Đặc khu: '+hsoCham(25)+'Tỉnh/Thành phố: '+hsoCham(35))+
    dong('<b>Điện thoại liên hệ*:</b> '+hsoO(Q('sdt') ? P.sdt : '', 'sl', 28)+'   <b>Thư điện tử (Email):</b> '+hsoCham(45))+
    '<p class="i j tr">Điện thoại và Email liên hệ là số điện thoại và thư điện tử chính chủ của khách hàng. Đây là một trong số các phương thức liên hệ để NHCSXH thông báo cho Quý khách thông tin cần thiết trong quá trình đăng ký và sử dụng dịch vụ. Quý khách lưu ý thông báo ngay cho NHCSXH khi có bất kỳ sự thay đổi nào về số điện thoại, email liên hệ. NHCSXH cung cấp dịch vụ ngân hàng và thông báo các thông tin cần thiết trong quá trình sử dụng dịch vụ qua số điện thoại và email liên hệ cập nhật của Quý khách chỉ khi nhận được thông báo của Quý khách về việc thay đổi thông tin nêu trên.</p>'+
    '<p class="i j">Quý khách sử dụng thông tin điện thoại và email liên hệ là số điện thoại và email đăng ký tài khoản định danh điện tử của Quý khách trên ứng dụng VNeID, trang thông tin điện tử “dinhdanhdientu.gov.vn” và “vneid.gov.vn”.</p>'+
    dong('<b>Thu nhập bình quân hàng tháng trong 06 tháng gần nhất (đơn vị: triệu VND)</b>')+
    hsoBang('khung0', [1, 1, 1, 1.6], '<tr><td>☐ Dưới 10</td><td>☐ Từ 10-50</td><td>☐ Trên 50</td><td>☐ Khác (ghi rõ): '+hsoCham(22)+'</td></tr>')+
    dong('<b>Nguồn gốc thu nhập trong 06 tháng gần nhất/tiền gửi của Quý khách tại NHCSXH</b>')+
    hsoBang('khung0', [1, 0.8, 1.4, 1.6], '<tr><td>☐ Thừa kế tài sản<br>☐ Cho thuê tài sản</td><td>☐ Lương<br>☐ Trợ cấp</td><td>☐ Lợi nhuận đầu tư, lãi tiền gửi<br>☐ Khác( ghi rõ): '+hsoCham(10)+'</td><td>☐ Lợi nhuận sản xuất, kinh doanh<br>'+hsoCham(30)+'</td></tr>')+
    dong('<b>Tình trạng hôn nhân:</b> ☐ Độc thân      ☐ Đã kết hôn      ☐ Khác( ghi rõ): '+hsoCham(35))+
    hsoBang('luoi', [1, 1], '<tr><td class="c b" colspan="2">ĐĂNG KÝ CHỮ KÝ MẪU</td></tr><tr>'+['Chữ ký mẫu', 'Xác nhận chữ ký mẫu'].map(function(x){ return '<td class="c tg-ck"><p class="c b">'+x+'</p><div class="tg-ckk"><p class="c i s10">(Ký và ghi rõ họ tên)</p></div></td>'; }).join('')+'</tr>'+
      '<tr><td colspan="2"><p class="i j s12"><b>Đăng ký chữ ký mẫu:</b> Chữ ký mẫu đăng ký tại mục này áp dụng cho tất cả các giao dịch qua tài khoản Tổ viên, trên chứng từ giao dịch giấy tại NHCSXH theo quy định pháp luật. Quý khách lưu ý viết đầy đủ họ tên; không viết họ tên và ký bằng chữ in hoa; 02 chữ ký mẫu phải giống nhau và giống chữ ký tại mục Cam kết của khách hàng. Trường hợp khách hàng thay đổi mẫu chữ ký, yêu cầu khách hàng thực hiện thay đổi thông tin mẫu chữ ký theo quy định. Trường hợp Quý khách đã đăng ký mẫu chữ ký tại NHCSXH cho các giao dịch trước thời điểm Giấy đề nghị này có hiệu lực, tiếp tục sử dụng chữ ký đó cho các thỏa thuận đăng ký trước.</p></td></tr>');
  var Bd = '<p class="j">☐ Tôi đề nghị NHCSXH cung cấp dịch vụ tài khoản Tổ viên theo các thông tin đã đăng ký tại mục “A-Phần dành cho Khách hàng đăng ký thông tin cá nhân” nêu trên để thực hiện các nghiệp vụ tại trụ sở NHCSXH nơi mở tài khoản hoặc tại điểm giao dịch của NHCSXH<sup>1</sup> như sau:</p>'+
    ['1. Nộp tiền mặt vào tài khoản Tổ viên;', '2. Nộp tiền mặt vào tài khoản Tổ viên thông qua Ban quản lý Tổ Tiết kiệm và vay vốn;', '3. Nhận chuyển khoản đến tài khoản Tổ viên;', '4. Đề nghị NHCSXH trích Nợ từ tài khoản để thu nợ vay tại NHCSXH;',
      '5. NHCSXH được chủ động trích Nợ từ tài khoản Tổ viên để thu: tiền lãi, nợ gốc đến hạn, nợ gốc quá hạn của khoản vay; tiền lãi, nợ gốc của khoản vay trước khi xử lý rủi ro; chi phí phát sinh trong quá trình quản lý tài khoản Tổ viên;', '6. Rút tiền mặt hoặc chuyển khoản từ tài khoản Tổ viên sau khi đã trả hết nợ NHCSXH.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="tr">☐ Đăng ký SMS chủ động (nhận thông báo biến động số dư qua SMS có tính phí)      ☐ Có      ☐ Không</p>';
  var C = '<p class="j">1. Với mọi trách nhiệm thuộc về mình, Tôi cam đoan mọi thông tin đưa ra tại Giấy đề nghị này đều đầy đủ và trung thực. Tôi hiểu và đồng ý rằng NHCSXH có thể yêu cầu thêm thông tin để xác thực các thông tin mà tôi xác nhận ở trên, thay mặt tôi cung cấp thông tin cho các cơ quan nhà nước có thẩm quyền theo quy định của pháp luật. Đề nghị NHCSXH cung cấp tài khoản Tổ viên mà Tôi đã đăng ký ở trên.</p>'+
    '<p class="j">2. Tôi xác nhận và đồng ý rằng:</p>'+
    '<p class="j">(a) Đã được NHCSXH cung cấp đầy đủ thông tin về Thoả thuận/Hợp đồng/Giấy đề nghị theo mẫu. Đã đọc, hiểu rõ, tự nguyện đồng ý và cam kết thực hiện “<i>Điều khoản, điều kiện giao dịch chung về mở và sử dụng tài khoản dành cho khách hàng cá nhân</i>” và “<i>Điều khoản, điều kiện chung về bảo vệ và xử lý dữ liệu cá nhân tại NHCSXH</i>”, sau đây được gọi là ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG và nội dung tại mục B Giấy đề nghị này;</p>'+
    '<p class="j">(b) NHCSXH được xác thực thông tin trên giấy tờ tùy thân định danh của tôi theo quy định của pháp luật từ bất kỳ giải pháp nào mà NHCSXH có được để phục vụ mục đích tuân thủ quy định pháp luật về nhận biết khách hàng; cung cấp cho bên thứ ba (bao gồm nhưng không giới hạn các đối tác…) hợp tác với NHCSXH để phát triển và cung cấp các sản phẩm, dịch vụ của NHCSXH; hoặc sử dụng thông tin với mục đích nghiên cứu đánh giá để hiểu về nhu cầu sử dụng sản phẩm dịch vụ ngân hàng của tôi để phục vụ các nghiệp vụ ngân hàng;</p>'+
    '<p class="j">(c) NHCSXH được cung cấp thông tin tài khoản Tổ viên của Tôi cho Ban quản lý Tổ Tiết kiệm và vay vốn để theo dõi, đôn đốc việc thực hiện nghĩa vụ của Tôi với Ngân hàng;</p>'+
    '<p class="j">(d) Chịu trách nhiệm cập nhật, kiểm tra số dư tài khoản Tổ viên theo thông báo do Ngân hàng phát hành, gửi đến tôi thông qua Ban quản lý Tổ Tiết kiệm và vay vốn và/hoặc thông qua các ứng dụng do NHCSXH cung cấp, kịp thời thông báo đến NHCSXH khi có sai sót, chênh lệch cần kiểm tra, đối chiếu;</p>'+
    '<p class="j">(đ) Đồng ý rằng khi đại diện hợp pháp của NHCSXH ký vào "Phần dành cho Ngân hàng" tại văn bản này thì văn bản này và các ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG dưới đây được coi là Hợp đồng và có giá trị ràng buộc các bên.</p>'+
    hsoBang('khung0', [90, 10], '<tr><td></td><td class="c i">Đồng ý</td></tr><tr><td><p class="i j">- Điều khoản, điều kiện giao dịch chung về mở và sử dụng tài khoản dành cho khách hàng cá nhân tại NHCSXH.</p></td><td class="c">☐</td></tr><tr><td><p class="i j">- Điều khoản, điều kiện chung về bảo vệ và xử lý dữ liệu cá nhân tại NHCSXH.</p></td><td class="c">☐</td></tr>')+
    '<p class="j">Tôi chịu trách nhiệm cập nhật và tự nguyện chấp thuận không kèm theo bất kỳ điều kiện nào đối với các ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG nêu trên được sửa đổi và đăng tải trên website chính thức của NHCSXH trong từng thời kỳ, hiện là <u>www.vbsp.org.vn</u> hoặc thông báo đến Tôi thông qua các kênh cung cấp dịch vụ của NHCSXH.</p>'+
    '<p class="j">3. Tôi cam kết chịu trách nhiệm quản lý, sử dụng tài khoản theo quy định của pháp luật và của NHCSXH. Đồng ý chi trả các khoản phí liên quan đến việc quản lý và sử dụng tài khoản theo quy định của NHCSXH theo từng thời kỳ, mức phí công khai trên website chính thức của NHCSXH.</p>'+
    '<p class="j">4. Trường hợp số điện thoại liên hệ của Tôi không phải số điện thoại di động chính chủ, NHCSXH được miễn trách nhiệm trong việc gửi thông tin cho Tôi qua số điện thoại liên hệ đã khai báo ở trên.</p>'+
    '<p class="j">Giấy đề nghị này được lập thành 02 bản gốc, có giá trị pháp lý ngang nhau, khách hàng và NHCSXH mỗi bên giữ một bản.</p><p class="i">Quý khách vui lòng kiểm tra thông tin tại Hợp đồng này trước khi ký xác nhận.</p>'+
    /* 3.219 (anh): chỗ khách hàng ký rộng xuống thêm */
    '<p class="c i">'+hsoCham(8)+(function(){ var g = Q('ngayKy') ? hsoNg(hsoChamGT('01tgtv', 'ngayKy', '')) : null; return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày'+hsoCham(10)+' tháng'+hsoCham(9)+'năm'+hsoCham(9); })()+'</p><p class="c b">Khách hàng</p><p class="c i s10">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
  var kyD = [['Cán bộ tiếp nhận', 'Ký, ghi rõ họ tên'], ['Giao dịch viên', 'Ký, ghi rõ họ tên'], ['Kiểm soát viên', 'Ký, ghi rõ họ tên'], ['Giám đốc', 'Ký, đóng dấu']];
  /* 3.219 (anh 15/10 "phần dành cho Ngân hàng chưa khớp"): đo theo file Word mẫu — cột 2689 · 2409 · 2410 · 2874 twip, dòng 1 ≥ 6,3 mm, dòng chức danh ≥ 10 mm + dòng ký 27 mm (không kẻ giữa), bảng thụt vào trong khung */
  var Dd = hsoBang('luoi', [2689, 2409, 2410, 2874], '<tr style="height:6.3mm"><td class="c i">Tiếp nhận ngày '+hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+'</td><td colspan="3" class="c i">'+coChuHTML(hsoPGD('noi'))+', ngày '+hsoCham(8)+' tháng '+hsoCham(8)+' năm '+hsoCham(10)+'</td></tr>'+
      '<tr style="height:10mm">'+kyD.map(function(x){ return '<td class="c" style="vertical-align:top;border-bottom:0"><p class="c b">'+x[0]+'</p><p class="c i">('+x[1]+')</p></td>'; }).join('')+'</tr>'+
      '<tr style="height:27mm">'+kyD.map(function(){ return '<td style="border-top:0">&nbsp;</td>'; }).join('')+'</tr>').replace('<table ', '<table style="width:97%;margin:3pt auto 4pt" ')+
    '<p class="tr"><b>Số CIF:</b> '+hsoO(Q('cif') ? P.kh : '', 'sl', 45)+' <b>Số Tài khoản Tổ viên:</b> '+hsoCham(70)+'</p><p>Hiệu lực từ ngày:'+hsoCham(10)+' /'+hsoCham(10)+'/'+hsoCham(10)+'</p>';
  var h = hsoBang('khung0', [17, 63, 20], '<tr><td>'+hsoLogo('01tgtv', 16)+'</td><td class="c"><p class="c b s13">&nbsp;</p><p class="c b s13">GIẤY ĐĂNG KÝ MỞ TÀI KHOẢN TỔ VIÊN</p></td><td class="r"><table class="luoi s12" data-w="1"><tr><td class="c">Mẫu 01/TGTV</td></tr></table></td></tr>')+
    '<p class="i j tr">Tôi đề nghị Ngân hàng Chính sách xã hội (NHCSXH) chi nhánh/PGD <b>'+coChuHTML(hsoPGD('ngan'))+'</b> mở hồ sơ thông tin cá nhân và đăng ký tài khoản Tổ viên với các thông tin sau.</p>'+
    hsoBang('luoi giua s11', [1], '<tr><td><p>Ngày:'+hsoCham(75)+'</p><p>Số Hồ sơ thông tin KH (Số CIF) '+(Q('cif') && P.kh ? hsoO(P.kh) : hsoCham(50))+'</p></td></tr>').replace('<table ', '<table style="width:120mm;margin:4pt auto" ')+
    hsoKhungNgoai([['nen', 'A- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ THÔNG TIN CÁ NHÂN'], A, ['nen', 'B- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ'], Bd+'<p class="i s9 tr"><sup>1</sup> Trong thời gian NHCSXH nơi khách hàng mở tài khoản tổ chức phiên giao dịch tại điểm giao dịch nơi khách hàng đăng ký địa chỉ thường trú/tạm trú để giao dịch với NHCSXH, khách hàng được thực hiện các giao dịch trên tài khoản tại điểm giao dịch của NHCSXH, đồng thời khách hàng không được thực hiện các giao dịch rút tiền mặt, chuyển khoản từ tài khoản Tổ viên của mình tại trụ sở NHCSXH.</p>', ['nen', 'C- CAM KẾT CỦA KHÁCH HÀNG'], C, ['tieu', 'D - PHẦN DÀNH CHO NGÂN HÀNG'], Dd])+
    '';
  return {ma:'01/TGTV', h:'<div class="tgtv">'+h+'</div>'};   /* 3.218 (anh 15/10, theo file Word mẫu 03/2026): giãn dòng đơn 1,15 như Word, lề 10 · 12,5 · 16 · 7,1 mm, phần D trọn trang 3 → 3 trang nội dung; trang trắng thứ 4 chỉ khi in 2 mặt nhiều bản (đã có sẵn) */
}
function hsoCT01Ds(){ return hsoCTVDs().filter(function(c){ return c.bat!==false && c.kieu!=='gqvl'; }); }   /* 3.258: chương trình lập bằng 01/TD (chip trên thanh mẫu) */
function hsoChon01CT(ma){ HSO.vay.ct01 = ma; hsoChonMau('01td'); var B = hsoBo(); if(B && B.ct!==ma){ B.ct = ma; hsoBoLuu(); } hsoVe(); }   /* chọn chip "01/TD <chương trình>" → phiếu đang mở đổi chương trình; chưa có phiếu → hộ mới lập theo chương trình này */
function hsoMauK(k){ var r = null; ['hst','hsv'].forEach(function(p){ HSO_MAU[p].forEach(function(m){ if(m.k===k) r = m; }); }); return r; }
function hsoDTTHMd(B, phuong){ var c = B && hsoCTV(B.ct); return c ? (phuong ? c.dtthPh : c.dtthMd) || '' : ''; }
function hsoLapBo(B, t){   /* cả bộ: 01/UQ · 01/TD · biên bản họp kết nạp và bình xét (10C mới) · 03/TD · 01/TGTV (hộ mới) — mỗi mẫu 1 bản, khổ riêng */
  var ds = [], c = (B && B.chon) || {uq:1, td:1, bb:1, ds:1}, N = hsoBoNV(B), A = hsoPA(B), tB = B && B.to && KHO.to(B.to) ? KHO.to(B.to) : t;
  var vay = B && N.ten ? [{ten:N.ten, ct:B.ct==='NSVSMT' ? 'Nước sạch VSMT' : hsoCTTenIn(B.ct), tien:A.tien, md:A.mdDs, th:A.th}] : [];
  var gq = B && (hsoCTV(B.ct)||{}).kieu==='gqvl';   /* 3.211: GQVL — đơn 01/GQVL, hợp đồng 07b; không 01/UQ */
  if(c.uq && !gq) ds.push({M:hsoMauK('01uq'), h:hsoLap01uq(t, B).h});
  if(c.td) ds.push(gq ? {M:hsoMauK('01gqvl'), h:hsoLap01gqvl(t, B).h} : {M:hsoMauK('01td'), h:hsoLap01td(t, B).h});
  if(c.td && c.pd && gq) ds.push({M:hsoMauK('pdnh'), h:hsoLapPdnh(t, B).h});   /* 3.310: trang Phê duyệt NH in chung ngay sau 01/GQVL */
  if(c.bb) ds.push({M:hsoMauK('10c'), h:hsoLap10c(tB, {moi:true, kn:B && B.moi && N.ten ? [{kh:'', ten:N.ten}] : [], vay:vay}).h});
  if(c.ds) ds.push({M:hsoMauK('03td'), h:hsoLap03td(tB, B).h});
  if(c.hd && gq) ds.push({M:hsoMauK('07b'), h:hsoLap07b(t, B).h});
  if(c.tgtv) ds.push({M:hsoMauK('01tgtv'), h:hsoLap01tgtv(t, B ? Object.assign({kh:B.kh}, N) : null).h});
  if(!ds.length) ds.push({M:hsoMauK('01td'), h:hsoLap01td(t, B).h});
  return {ma:'Bộ hồ sơ vay', ds:ds};
}
function hsoTGTVDs(t, B){   /* 01/TGTV: người vay trong bộ (hộ mới) hoặc tổ viên chưa có TK 105 của tổ (tích, in hàng loạt) */
  var V = HSO.vay, ng = V.tgNguon || (B ? 'bo' : 'to'); if(ng==='bo') return B && hsoBoNV(B).ten ? [Object.assign({kh:B.kh}, hsoBoNV(B))] : [];
  if(ng==='tay') return tgTayCo() ? [tgTayP()] : [];   /* 3.315: ✍ in nhanh tự khai (js/54) */
  return hsoTVTo(t).filter(function(k){ var c = (V.tg||{})[k.kh]; return c===undefined ? !k.stk.length && !k.coTK : !!c; })   /* 3.315: tích được cả người đã có TK 105 (in lại) */.map(function(k){
    var c = KHO.danhBa(k.kh) || {}, x = hsoKhach(k.kh, t); return {kh:k.kh, ten:x.ten, ns:x.ns, gt:c.gt||'', cccd:x.cccd, ncap:x.ncap, noiCap:x.noiCap, sdt:c.sdt||k.sdt||'', danToc:c.danToc||'', ap:x.ap, tenXa:x.tenXa}; });
}
function hsoVeGiuO(){   /* 3.242: vẽ lại cột trái mà con trỏ ở yên (ô kế khi vừa Tab / Enter) — theo thứ tự ô trong #hso-tuy */
  setTimeout(function(){ var q = '#hso-tuy input:not([type=checkbox]):not([type=radio]), #hso-tuy select', a = document.activeElement, ds = Array.prototype.slice.call(document.querySelectorAll(q)), i = ds.indexOf(a), gt = i>=0 && a.tagName==='INPUT' ? a.value : null;
    hsoVe(); if(i<0) return; var x = document.querySelectorAll(q)[i]; if(!x) return; if(gt!=null && x.value!==gt) x.value = gt; x.focus(); if(x.select && x.tagName==='INPUT') x.select(); }, 0); }
function hsoBoDat(duong, v, ve){
  var B = hsoBo(); if(!B) return; var k = duong.split('.'), o = B;
  for(var i=0;i<k.length-1;i++){ if(o[k[i]]==null) o[k[i]] = /^\d+$/.test(k[i+1]) ? [] : {}; o = o[k[i]]; }
  if(/^nv\.(ns|ncap)$/.test(duong) || /^ho\.\d+\.ns$/.test(duong) || duong==='hanCuoi' || duong==='ngayHD' || duong==='ngayGN'){ var iso = hsoNgayTu(v); v = iso || v; }
  o[k[k.length-1]] = v;
  if(duong==='nv.cccd' && B.moi){ var d = hsoCCCDDoc(v); if(d) B.nv.gt = d.gt; }
  if(duong==='nv.ncap' && B.moi && !B.nv.noiCapTay) B.nv.noiCap = hsoNoiCapGY(B.nv.ncap);
  if(duong==='nv.noiCap') B.nv.noiCapTay = !!v;
  if(duong==='moi'){ B.chon.tgtv = v ? 1 : 0; if(v){ B.kh = ''; } }
  if(duong==='ho') B.ho = v;
  hsoBoLuu(); if(ve) hsoVeGiuO(); else hsoHen();
}
function hsoKhungNgoai(ds){   /* khung viền ngoài chia được trang: mỗi đoạn con 1 dòng bảng (mẫu 01/TGTV) */
  var dong = [];
  ds.forEach(function(x){ if(Array.isArray(x)){ dong.push('<tr class="tr-td"><td class="c b'+(x[0]==='nen' ? ' nen' : ' tieu')+'">'+x[1]+'</td></tr>'); return; }   /* 3.218: tiêu đề mục (tr-td) không đứng trơ cuối trang — kéo theo dòng sau */
    var d = new DOMParser().parseFromString('<div>'+x+'</div>', 'text/html').body.firstChild;
    Array.prototype.forEach.call(d.children, function(c){ dong.push('<tr><td>'+c.outerHTML+'</td></tr>'); }); });
  return '<table class="ngoai s12" data-w="1"><colgroup><col style="width:100%"></colgroup>'+dong.join('')+'</table>';
}
/* @CHEN */
/* ---------- lập mẫu đang chọn ---------- */
function hsoLap(){
  var p = hsoTab(), M = hsoMau(p), S = hsoCH(), t = KHO.to(S.to); if(t && toLaTT(t)) t = null;
  var B = p==='hsv' ? hsoBo() : null, x, ai = '';
  if(M.k==='06td'){ x = hsoLap06td(); x.M = M; x.t = t; x.ds = []; x.h = ''; x.ten = hso06TenHS(); return x; }   /* 3.253: mẫu KTGS — trang in riêng (khổ ngang, CSS KTGS) */
  if(M.k==='sohv'){ x = {ma:'Sổ hộ vay', h:hmLapHTML(hmSoDs().map(function(r){ return r.o; }), hmSoLocChu(), HM_SO.nhom)}; }   /* 3.214: in đúng danh sách đang lọc */
  else if((M.k==='01td' || M.k==='01gqvl') && B && B.hoId && hsoKemCo(B)){ x = hsoLapBo(Object.assign({}, B, {chon:Object.assign({td:1}, B.kem)}), t); ai = hsoBoNV(B).ten || ''; }   /* 3.209: 01/TD in kèm 03/TD · 10C · 01/UQ · 01/TGTV */
  else if(M.k==='01tgtv'){ var P = hsoTGTVDs(t, B); x = {ma:'01/TGTV', ds:(P.length ? P : [null]).map(function(y){ return {M:M, h:hsoLap01tgtv(t, y).h}; })}; ai = P.length===1 ? P[0].ten : ''; }
  else if(M.k==='03td' && (hsoD03().ds.length || (B && B.hoId)) && (!B || B.hoId)){ var D3 = hsoD03(), t3 = hsoD03To(D3); hsoD03TuBo(D3); x = hsoLap03td(t3, null, hsoD03Hang(D3), D3.ct); }   /* 3.209: 03/TD nhiều hộ cùng chương trình */
  else if(M.k==='03td' && !B && t){ var ch = HSO.vay.chon || {}; x = hsoLap03td(t, null, hsoTVTo(t).filter(function(k){ return ch[k.kh]; }).map(function(k){ return {ten:k.ten}; })); }
  else { var f = {'10c':function(t){ return hsoLap10c(t, {moiChon:1}); }, '10ccu':hsoLap10cCu, '10a':hsoLap10a, '10b':hsoLap10b, '10d':function(t){ return hsoLap10d(t); }, '11':hsoLap11, '11cu':hsoLap11Cu, '01bg':hsoLap01bg, '02bg':hsoLap02bg, '01uq':hsoLap01uq, '01td':hsoLap01td, '03td':hsoLap03td, '09a':hsoLap09a, '06a':hsoLap06a, '01tdck':hsoLap01tdck, '01gqvl':hsoLap01gqvl, '07b':hsoLap07b, 'pdnh':hsoLapPdnh}[M.k];
    x = f(t, p==='hsv' && /^(01uq|01td|03td|01gqvl|07b|pdnh)$/.test(M.k) ? B : undefined);
    ai = /^(01uq|01td|01gqvl|07b|pdnh)$/.test(M.k) ? hsoBoNV(B).ten || '' : /^(09a|01tdck|06a)$/.test(M.k) ? ((hsoKhachChon(t)||{}).ten || '') : ''; }
  if(!x.ds) x.ds = [{M:M, h:x.h}];
  if(M.k==='09a' && hsoLuu().kemTDCK) x.ds.push({M:hsoMauK('01tdck'), h:hsoLap01tdck(t).h});   /* 3.206: 09A in kèm 01/TĐCK (cùng khổ dọc → 1 lần in, 1 file Word) */
  x.ds.forEach(function(u){ if(u.M && !/^(01td|01tgtv)$/.test(u.M.k) && hsoLogoCo(u.M.k)) u.h = '<p>'+hsoLogo(u.M.k, 16)+'</p>'+u.h; });   /* 3.171: logo ở mẫu anh tích (mẫu gốc có logo đã đặt sẵn đúng chỗ) */
  x.M = M; x.t = t; x.h = x.ds[0].h;
  var pv = ai || (t ? 'To '+t.ten : '') || 'Trang';
  x.ten = xuatTen('Mau '+M.ma.replace(/\//g, ' ')+(HSO_GM ? ' - Ghi mau' : '')+(typeof omCo==='function' && omCo(M.k) ? omTen() : ''), pv, HSO.o.ngay || ngayISO(nay()));   /* 3.221: bản ghi mẫu ghi rõ trong tên file */
  if(typeof omChamMin==='function') x.ds.forEach(function(u){ if(OM_MAU[u.M.k]) u.h = omChamMin(u.h); });   /* 3.248: chấm mảnh lúc dựng bản in / xem / Word (HTML mẫu giữ chuỗi chấm gốc) */
  x.trang = hsoTrang(x.ds, null, x.ten);
  return x;
}
/* sửa 1 trường của bộ đang chọn: đường dẫn "nv.ten", "pa.sv", "ho.0.ten" … */

/* ---------- WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang) ---------- */
function hsoDocx(x){   /* HTML các mẫu → .docx: đoạn, bảng (gộp ô, lặp tiêu đề, kẻ chấm), kẻ mảnh, logo, nhiều khổ (mỗi mẫu 1 section) */
  var ds = x.ds || [{M:x.M, h:x.h}], anh = [], soAnh = 0, tw = function(mm){ return Math.round(mm*56.7); };
  /* 3.254: cỡ chữ mẫu theo khai báo riêng */   /* 3.248: chấm mảnh (font-size %) → Word cỡ nhỏ theo tỉ lệ */
  var co = function(el, f){ var m = (' '+(el.className||'')+' ').match(/ s(\d+) /); if(m) return +m[1]*2; var fs = el.style && el.style.fontSize; return fs && /%$/.test(fs) ? Math.max(14, Math.round(f*parseFloat(fs)/100)) : fs && /pt$/.test(fs) && / om-co /.test(' '+(el.className||'')+' ') ? Math.round(parseFloat(fs)*2) : f; };
  var lop = function(el, k){ return (' '+(el.className||'')+' ').indexOf(' '+k+' ')>=0; };
  var chay = function(t, f){ return '<w:r><w:rPr>'+(f.b ? '<w:b/>' : '')+(f.i ? '<w:i/>' : '')+(f.mau ? '<w:color w:val="'+f.mau+'"/>' : '')+'<w:sz w:val="'+f.sz+'"/><w:szCs w:val="'+f.sz+'"/>'+(f.u ? '<w:u w:val="single"/>' : '')+(f.sup ? '<w:vertAlign w:val="superscript"/>' : '')+'</w:rPr><w:t xml:space="preserve">'+xmlEsc(t)+'</w:t></w:r>'; };
  var hinh = function(img){ var src = img.getAttribute('src')||'', m = src.match(/^data:image\/(png|jpe?g);base64,(.+)$/); if(!m) return '';
    var mm = +img.getAttribute('data-mm') || 20, ty = +img.getAttribute('data-ty') || 1, cx = Math.round(mm*36000), cy = Math.round(mm*ty*36000), id = 'rIdAnh'+(++soAnh);
    anh.push({id:id, ten:'anh'+soAnh+'.'+(m[1]==='png' ? 'png' : 'jpeg'), b64:m[2]});
    return '<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="'+cx+'" cy="'+cy+'"/><wp:docPr id="'+soAnh+'" name="logo'+soAnh+'"/>'+
      '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'+
      '<pic:nvPicPr><pic:cNvPr id="0" name="logo'+soAnh+'"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="'+id+'"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'+
      '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="'+cx+'" cy="'+cy+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>'; };
  var chu = function(node, f){ var r = [];
    Array.prototype.forEach.call(node.childNodes, function(n){
      if(n.nodeType===3){ var t = n.nodeValue.replace(/[ \t\r\n]+/g, ' '); if(t) r.push(chay(t, f)); return; }
      if(n.nodeType!==1 || /^(COLGROUP|COL|TABLE|P)$/.test(n.tagName)) return;
      if(n.tagName==='BR'){ r.push('<w:r><w:br/></w:r>'); return; }
      if(n.tagName==='IMG'){ r.push(hinh(n)); return; }
      var g = Object.assign({}, f); if(/^(B|STRONG)$/.test(n.tagName) || lop(n, 'b')) g.b = 1; if(/^(I|EM)$/.test(n.tagName) || lop(n, 'i')) g.i = 1; if(n.tagName==='U' || lop(n, 'u')) g.u = 1; if(n.tagName==='SUP') g.sup = 1; g.sz = co(n, g.sz);
      r = r.concat(chu(n, g)); });
    return r; };
  var doan = function(el, f){
    if(lop(el, 'ke')){ var dai = Math.min(f.w, tw(+el.getAttribute('data-ke') || 60)), le = Math.max(0, Math.round((f.w-dai)/2)), ph = le; if(lop(el, 'trai')){ le = 0; ph = f.w-dai; }   /* kẻ mảnh: đoạn trống viền trên, thụt 2 bên = độ dài */
      return '<w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="1" w:color="000000"/></w:pBdr><w:spacing w:before="0" w:after="60" w:line="120" w:lineRule="exact"/><w:ind w:left="'+le+'" w:right="'+ph+'"/><w:rPr><w:sz w:val="8"/></w:rPr></w:pPr></w:p>'; }
    var jc = lop(el, 'c') ? 'center' : lop(el, 'r') ? 'right' : lop(el, 'j') ? 'both' : 'left', g = Object.assign({}, f);
    if(lop(el, 'b')) g.b = 1; if(lop(el, 'i')) g.i = 1; if(lop(el, 'u')) g.u = 1; g.sz = co(el, g.sz);
    var trai = lop(el, 'l1') ? 454 : lop(el, 'l2') ? 794 : lop(el, 'l4') ? 1247 : 0;
    return '<w:p><w:pPr>'+(lop(el, 'tr-sang') ? '<w:pageBreakBefore/>' : '')+'<w:spacing w:before="'+(lop(el, 'tr') ? 120 : lop(el, 'tr2') ? 50 : 0)+'" w:after="'+(lop(el, 'sau') ? 120 : 20)+'" w:line="'+(f.bang ? 240 : 276)+'" w:lineRule="auto"/>'+(lop(el, 'thut') || trai ? '<w:ind'+(trai ? ' w:left="'+trai+'"' : '')+(lop(el, 'thut') ? ' w:firstLine="567"' : '')+'/>' : '')+'<w:jc w:val="'+jc+'"/></w:pPr>'+chu(el, g).join('')+'</w:p>';
  };
  var vien = function(v, cham){ return '<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(function(b){ return '<w:'+b+' w:val="'+(!v ? 'nil' : (cham && b==='insideH') ? 'dotted' : 'single')+'" w:sz="4" w:space="0" w:color="'+(cham && b==='insideH' ? '777777' : '000000')+'"/>'; }).join('')+'</w:tblBorders>'; };
  var bang = function(tb, f){
    var W = f.w, w = String(tb.getAttribute('data-w')||'1').split(',').map(Number), tong = w.reduce(function(a, b){ return a+b; }, 0) || 1, cw = w.map(function(v){ return Math.round(W*v/tong); });
    var rong = function(i, n){ var s = 0; for(var j=i;j<i+n && j<cw.length;j++) s += cw[j]; return s; }, g = Object.assign({}, f, {sz:co(tb, f.sz), bang:1}), luoi = lop(tb, 'luoi'), keo = [], cao = +tb.getAttribute('data-cao') || 0;   /* 3.443: data-cao (mm) → dòng cao cố định (sửa chữ không đẩy trang) */
    var x = '<w:tbl><w:tblPr><w:tblW w:w="'+W+'" w:type="dxa"/>'+(lop(tb, 'giua') ? '<w:jc w:val="center"/>' : '')+(lop(tb, 'ngoai') ? '<w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders>' : vien(luoi, lop(tb, 'cham')))+'<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="57" w:type="dxa"/><w:right w:w="57" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+cw.map(function(v){ return '<w:gridCol w:w="'+v+'"/>'; }).join('')+'</w:tblGrid>';
    Array.prototype.forEach.call(tb.rows, function(row){
      var cot = 0, dau = row.parentNode.tagName==='THEAD', h = '<w:tr><w:trPr><w:cantSplit/>'+(cao ? '<w:trHeight w:val="'+tw(cao)+'" w:hRule="exact"/>' : '')+(dau ? '<w:tblHeader/>' : '')+'</w:trPr>';
      var noi = function(){ while(keo[cot] && keo[cot].n>0){ var k = keo[cot]; k.n--; h += '<w:tc><w:tcPr><w:tcW w:w="'+rong(cot, k.s)+'" w:type="dxa"/>'+(k.s>1 ? '<w:gridSpan w:val="'+k.s+'"/>' : '')+'<w:vMerge/></w:tcPr><w:p/></w:tc>'; cot += k.s; } };
      noi();
      Array.prototype.forEach.call(row.cells, function(c){
        var cs = c.colSpan || 1, rs = c.rowSpan || 1, wc = rong(cot, cs), gc = Object.assign({}, g, {w:Math.max(200, wc-114)});
        if(lop(c, 'nen')){ gc.mau = 'FFFFFF'; gc.b = 1; }
        var nd = c.querySelector('p,table') ? khoi(c, gc) : [doan(c, gc)];
        h += '<w:tc><w:tcPr><w:tcW w:w="'+wc+'" w:type="dxa"/>'+(cs>1 ? '<w:gridSpan w:val="'+cs+'"/>' : '')+(rs>1 ? '<w:vMerge w:val="restart"/>' : '')+(lop(c, 'nen') ? '<w:shd w:val="clear" w:color="auto" w:fill="548235"/>' : '')+'<w:vAlign w:val="'+(luoi ? 'center' : 'top')+'"/></w:tcPr>'+(nd.join('') || '<w:p/>')+'</w:tc>';
        if(rs>1) keo[cot] = {n:rs-1, s:cs};
        cot += cs; noi();
      });
      x += h+'</w:tr>';
    });
    return x+'</w:tbl>';
  };
  var khoi = function(el, f){ var r = [], truoc = '';
    Array.prototype.forEach.call(el.children, function(n){
      if(n.tagName==='P'){ r.push(doan(n, f)); truoc = 'p'; }
      else if(n.tagName==='TABLE'){ if(truoc==='t') r.push('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>'); r.push(bang(n, f)); truoc = 't'; }
      else if(n.tagName==='IMG'){ r.push('<w:p>'+hinh(n)+'</w:p>'); truoc = 'p'; }
      else if(n.tagName==='DIV'){ r = r.concat(khoi(n, f)); } });
    if(truoc==='t') r.push('<w:p><w:pPr><w:spacing w:after="0" w:line="120" w:lineRule="exact"/></w:pPr></w:p>');
    return r; };
  var chan = [], sect = function(M, i){ var mg = M.mg || [20, 20, 20, 30], ft = '';
    if(M.chan){ chan.push({id:'rIdChan'+i, ten:'footer'+i+'.xml', chu:M.chan}); ft = '<w:footerReference w:type="default" r:id="rIdChan'+i+'"/>'; }
    return '<w:sectPr>'+ft+'<w:pgSz w:w="'+(M.ngang ? 16838 : 11906)+'" w:h="'+(M.ngang ? 11906 : 16838)+'"'+(M.ngang ? ' w:orient="landscape"' : '')+'/><w:pgMar w:top="'+tw(mg[0])+'" w:right="'+tw(mg[1])+'" w:bottom="'+tw(mg[2])+'" w:left="'+tw(mg[3])+'" w:header="510" w:footer="340" w:gutter="0"/><w:pgNumType w:start="1"/></w:sectPr>'; };
  var than = ds.map(function(u, i){
    var M = u.M, mg = M.mg || [20, 20, 20, 30], TW = tw((M.ngang ? 297 : 210) - mg[1] - mg[3]);
    var d = new DOMParser().parseFromString('<div id="hso-goc">'+u.h+'</div>', 'text/html'), b = khoi(d.getElementById('hso-goc'), {sz:26, w:TW}).join('');
    return i<ds.length-1 ? b+'<w:p><w:pPr>'+sect(M, i)+'</w:pPr></w:p>' : b+sect(M, i);
  }).join('');
  var enc = function(t){ return new Blob([t], {type:'application/xml'}); };
  var NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
  var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document '+NS+'><w:body>'+than+'</w:body></w:document>';
  var kieu = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman" w:eastAsia="Times New Roman"/><w:sz w:val="26"/><w:szCs w:val="26"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>';
  var ftXml = function(c){ var p = c.chu.split('|');   /* chân trang: trái · phải, dòng dưới "Trang x / y" */
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr '+NS+'><w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="9638"/></w:tabs><w:spacing w:after="0"/></w:pPr>'+
      '<w:r><w:rPr><w:b/><w:i/><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(p[0]||'')+'</w:t></w:r><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:tab/><w:t xml:space="preserve">'+xmlEsc(p[1]||'')+'</w:t></w:r></w:p>'+
      '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="0"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve">Trang </w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r>'+
      '<w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve"> / </w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:instrText xml:space="preserve"> SECTIONPAGES </w:instrText></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>'; };
  var nhi = function(b64){ var s = atob(b64), u = new Uint8Array(s.length); for(var i=0;i<s.length;i++) u[i] = s.charCodeAt(i); return new Blob([u]); };
  return taoZip([
    {ten:'[Content_Types].xml', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/>'+
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'+
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'+
      chan.map(function(c){ return '<Override PartName="/word/'+c.ten+'" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>'; }).join('')+'</Types>')},
    {ten:'_rels/.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')},
    {ten:'word/_rels/document.xml.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
      anh.map(function(a){ return '<Relationship Id="'+a.id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/'+a.ten+'"/>'; }).join('')+
      chan.map(function(c){ return '<Relationship Id="'+c.id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="'+c.ten+'"/>'; }).join('')+'</Relationships>')},
    {ten:'word/document.xml', b:enc(doc)},
    {ten:'word/styles.xml', b:enc(kieu)}
  ].concat(anh.map(function(a){ return {ten:'word/media/'+a.ten, b:nhi(a.b64)}; })).concat(chan.map(function(c){ return {ten:'word/'+c.ten, b:enc(ftXml(c))}; })))
    .then(function(z){ return new Blob([z], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); });
}
function hsoWord(){ if(hsoMau().k==='06td') return hsoWord06HS(); var x = hsoLap(); hsoDocx(x).then(function(bl){ giaoFile(bl, x.ten+'.docx'); if(hsoMau().k==='09a' && hsoLuu().kem06) setTimeout(hsoWord06, 600); if(hsoKem06()) setTimeout(hsoWord06HS, 600); bao('Đã tạo '+x.ten+'.docx — ô app điền sẵn là chữ thường, sửa thoải mái trong Word.', 6); }).catch(function(er){ baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }
