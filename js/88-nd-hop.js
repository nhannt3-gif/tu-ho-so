/* ===== 3.425 (docs/TEO_GIAO_BAN_KY_NANG.md mục 4.1, 4.4, 4.5, 5 — anh 31/10 "bàn giao cho TK 2 làm tiếp", "em làm luôn") =====
   📝 NHÁP NỘI DUNG HỌP GIAO BAN — "bản theo mẫu 08" (GĐ 2 kế hoạch bộ chuẩn đối chiếu). App dựng NHÁP để anh ĐỐI CHIẾU với bản giao ban
   phát hành (giao ban vẫn làm văn bản chính thức). Số lấy từ 📐 Bộ số chuẩn (js/87) + dòng Mẫu 31 cùng kỳ → mỗi số một nguồn.
   - Số khách hàng = tổ viên CÒN DƯ NỢ (QT-C-14, từ số liệu 31/10/2026): "với … khách hàng còn dư nợ".
   - Chỉ viết điều biết chắc: phần app không có dữ liệu (văn bản mới tháng, chấm điểm tổ khi chưa có CLT02 / BC0437, nội dung khác) → ô vàng
     "[Giao ban điền: …]" để người đối chiếu thấy — bản nháp, không phát hành.
   - Trình bày: Times New Roman 14, giãn 1,15, A4 lề T3 P2 T2 D2; triệu đồng kiểu VN (57.012,4; số chẵn không ",0"; tỷ trọng 2 số lẻ; ô 0 ghi "-").
   - Phụ lục 1 / 2 (danh sách theo Hội): để GĐ sau. Xuất Word (.doc HTML — Word mở / sửa được). Cắm rút: bỏ dòng <script> là mất nút 📝. ES5. */
var ND_HOI_TEN = {HND:'Hội Nông dân', HPN:'Hội Liên hiệp Phụ nữ', HCCB:'Hội Cựu chiến binh', DTN:'Đoàn Thanh niên'}, ND_HOI_VT = {HND:'HND', HPN:'HPN', HCCB:'HCCB', DTN:'ĐTN'};
function ndSo(v, le){   /* kiểu VN: le = 1 tiền triệu (số chẵn không ",0"), 2 tỷ trọng % (luôn 2 số lẻ), 0 số đếm */
  le = le==null ? 1 : le; var x = (+v||0).toFixed(le).split('.'), n = x[0].replace('-', ''), am = (+v||0)<0 && +x.join('.')!==0;
  var s = n.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); if(le && x[1] && (le===2 || +x[1]!==0)) s += ','+x[1];
  return (am ? '-' : '')+s; }
function ndO(v, le){ return (+v||0)===0 ? '-' : ndSo(v, le); }   /* ô bảng: 0 → "-" */
function ndTang(v, ten){ v = Math.round((+v||0)*10)/10; return v>0 ? 'tăng '+ndSo(v)+' triệu đồng so với '+ten : v<0 ? 'giảm '+ndSo(-v)+' triệu đồng so với '+ten : 'không đổi so với '+ten; }
function ndVang(chu){ return '<span style="background:#FFF2A8">[Giao ban điền: '+coChuHTML(chu)+']</span>'; }
function ndThang(ky){ var t = String(ky).slice(0, 7), sau = kyLui(t, 1);   /* kyLui(kỳ, n) = cộng n tháng */ return sau.slice(5, 7)+'/'+sau.slice(0, 4); }   /* số cuối tháng N → Nội dung họp tháng N+1 */
function ndMuc(o, ngay){   /* KH 1166: 1 tháng A (Tổ trưởng) · 2 B (Hội xã) · 3 C (NH + Hội + Trưởng ấp) · ≥ 4 D (lãnh đạo PGD tham mưu UBND) */
  var c = skCQH(o).d; if(!c) return {d:'', m:''}; var n = Math.floor((new Date(ngay) - new Date(c))/864e5); return {d:c, m:'ABCD'.charAt(Math.max(0, Math.min(3, Math.floor(Math.max(0, n)/30))))}; }
function ndDung(K, B, d){
  var D = B.diem[d], e = coChuHTML, T = K.to || {}, so = D.so, ds = BC_HOI_DS.filter(function(h){ return so[h]; }), coTT = !!so.TT, ky = B.ky, nam = String(K.ngay).slice(0, 4);
  var tenDiem = String(D.ten || '').replace(/^\s*(điểm( gd| giao dịch)?)\s+/i, ''), xa = '', tongM = {};
  var hang = function(k){ return ds.reduce(function(a, h){ return a+(so[h][k]||0); }, 0)+(coTT && so.TT[k]!==undefined ? so.TT[k]||0 : 0); };
  ['so_to', 'so_kh_du_no', 'cho_vay', 'thu_no', 'du_no', 'nqh', 'khoanh', 'khd_mon', 'khd_du', 'lai_ton', 'lai_ton_tang', 'du_no_tang', 'tien_gui', 'tien_gui_tang', 'ndh'].forEach(function(k){ tongM[k] = hang(k); });
  var rows = (K.hs||[]).filter(function(o){ return o.ku && bcViTri(K, o).d===d; }), khd = {}; slKHD(K.B).forEach(function(o){ if(o.ku) khd[o.ku] = 1; });
  rows.forEach(function(o){ if(!xa && o.tenXa) xa = o.tenXa; });
  var laAp = /^phường/i.test(xa) ? 'khu phố' : 'ấp', toTen = function(m){ var t = T[m], x = String(t && t.ten || m); return /^tổ\s/i.test(x) ? 'tổ '+x.replace(/^tổ\s+/i, '') : 'tổ '+x; };
  var hoiCua = function(o){ return bcViTri(K, o).h; };
  /* ---- đầu văn bản ---- */
  var p = function(x, st){ return '<p style="margin:0 0 3pt;line-height:1.15;'+(st||'')+'">'+x+'</p>'; }, h = '';
  h += '<p style="margin:0 0 6pt;color:#B00;font-size:11pt;text-align:center"><i>Bản nháp app Tủ hồ sơ — để đối chiếu với bản giao ban, không phát hành.</i></p>';
  h += '<table style="width:100%;border:0;border-collapse:collapse"><tr><td style="width:45%;text-align:center;vertical-align:top;border:0">NGÂN HÀNG CHÍNH SÁCH XÃ HỘI<br><b>PHÒNG GIAO DỊCH GÒ DẦU</b><br>———</td>'+
    '<td style="text-align:center;vertical-align:top;border:0"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br>———————</td></tr></table>';
  h += p('<b>NỘI DUNG HỌP GIAO BAN THÁNG '+ndThang(K.ngay)+'</b>', 'text-align:center;margin-top:12pt')+p('<b>Điểm giao dịch '+e(tenDiem)+'</b>', 'text-align:center')+p('<i>(Số liệu đến ngày '+e(ky)+')</i>', 'text-align:center;margin-bottom:9pt');
  /* ---- I ---- */
  h += p('<b>I. VĂN BẢN MỚI</b>')+p('- '+ndVang('văn bản mới trong tháng (nhóm tháng của ngày số liệu), văn bản thường xuyên (722, 727, 597, 132, 180), khối sắp xếp Tổ'), 'text-align:justify');
  /* ---- II.1 ---- */
  var kh = tongM.so_kh_du_no;
  h += p('<b>II. KẾT QUẢ HOẠT ĐỘNG</b>')+p('<b>1. Kết quả theo Hội</b>');
  h += p('<b>Tổng dư nợ đạt '+ndSo(tongM.du_no)+' triệu đồng, với '+kh+' khách hàng còn dư nợ, thông qua '+tongM.so_to+' Tổ TK&amp;VV</b>'+(coTT ? '; trong đó cho vay trực tiếp '+ndSo(so.TT.du_no)+' triệu đồng, ủy thác '+ndSo(tongM.du_no-so.TT.du_no)+' triệu đồng' : '')+
    (so[ds[0]] && so[ds[0]].du_no_truoc!==undefined ? ' ('+ndTang(tongM.du_no_tang, 'tháng trước')+')' : '')+'.', 'text-align:justify');
  var th = ['Stt', 'Đơn vị', 'Số tổ', 'Số khách hàng', 'DS cho vay', 'DS thu nợ', 'Dư nợ', 'Tỷ trọng %', 'NQH', 'Khoanh', 'Số món KHĐ'];
  var dongB = function(stt, ten, x, dam){ var td = function(v){ return '<td style="text-align:right;border:1px solid #000;padding:1pt 3pt">'+v+'</td>'; };
    return '<tr'+(dam ? ' style="font-weight:bold"' : '')+'><td style="text-align:center;border:1px solid #000">'+stt+'</td><td style="border:1px solid #000;padding:1pt 3pt">'+ten+'</td>'+
      td(ndO(x.so_to, 0))+td(ndO(x.so_kh_du_no, 0))+td(ndO(x.cho_vay))+td(ndO(x.thu_no))+td(ndO(x.du_no))+td(tongM.du_no ? ndO(x.du_no/tongM.du_no*100, 2) : '-')+td(ndO(x.nqh))+td(ndO(x.khoanh))+td(ndO(x.khd_mon, 0))+'</tr>'; };
  var bang = '<table style="width:100%;border-collapse:collapse;font-size:11pt"><tr>'+th.map(function(c){ return '<th style="border:1px solid #000;background:#EEE;padding:1pt 2pt">'+c+'</th>'; }).join('')+'</tr>';
  if(coTT) bang += dongB('I', '<b>TRỰC TIẾP</b>', {so_to:0, so_kh_du_no:so.TT.so_ho, cho_vay:so.TT.cho_vay, thu_no:so.TT.thu_no, du_no:so.TT.du_no, nqh:so.TT.nqh, khoanh:so.TT.khoanh, khd_mon:0}, true);
  var uy = {}; ['so_to', 'so_kh_du_no', 'cho_vay', 'thu_no', 'du_no', 'nqh', 'khoanh', 'khd_mon'].forEach(function(k){ uy[k] = ds.reduce(function(a, h){ return a+(so[h][k]||0); }, 0); });
  bang += dongB(coTT ? 'II' : '', '<b>ỦY THÁC</b>', uy, true);
  ds.forEach(function(h, i){ bang += dongB(i+1, ND_HOI_VT[h], so[h]); });
  bang += dongB('', '<b>Cộng</b>', {so_to:tongM.so_to, so_kh_du_no:kh+(coTT ? so.TT.so_ho||0 : 0), cho_vay:tongM.cho_vay, thu_no:tongM.thu_no, du_no:tongM.du_no, nqh:tongM.nqh, khoanh:tongM.khoanh, khd_mon:tongM.khd_mon}, true)+'</table>';
  h += bang+p('<i>Đơn vị: triệu đồng.</i>', 'font-size:11pt');
  /* ---- II.2 nợ quá hạn ---- */
  var qh = rows.filter(function(o){ return (o.qh||0)>0; });
  h += p('<b>2. Nợ quá hạn</b>');
  if(!qh.length) h += p('<b>Không phát sinh nợ quá hạn.</b>');
  else { h += p('<b>Nợ quá hạn '+ndSo(tongM.nqh)+' triệu đồng/'+qh.length+' món.</b>', 'text-align:justify');
    var bq = '<table style="width:100%;border-collapse:collapse;font-size:11pt"><tr>'+['Hội', 'Tổ trưởng', 'Khách hàng', 'Số tiền', 'Ngày chuyển QH', 'Mức'].map(function(c){ return '<th style="border:1px solid #000;background:#EEE">'+c+'</th>'; }).join('')+'</tr>';
    qh.sort(function(a, b){ return (hoiCua(a)+a.to).localeCompare(hoiCua(b)+b.to); }).forEach(function(o){ var m = ndMuc(o, K.ngay), hv = hoiCua(o);
      bq += '<tr><td style="border:1px solid #000">'+(hv==='TT' ? 'Trực tiếp' : ND_HOI_VT[hv])+'</td><td style="border:1px solid #000">'+e(T[o.to] ? T[o.to].ten||'' : '')+'</td><td style="border:1px solid #000">'+e(tenHoaDau(o.ten||''))+'</td>'+
        '<td style="border:1px solid #000;text-align:right">'+ndSo((o.qh||0)/1e6)+'</td><td style="border:1px solid #000;text-align:center">'+(m.d ? ngayVNsl(m.d) : '')+'</td><td style="border:1px solid #000;text-align:center">'+m.m+'</td></tr>'; });
    h += bq+'</table>'+p('<i>Mức: A – Tổ trưởng (1 tháng) · B – Hội cấp xã (2 tháng) · C – Ngân hàng, Hội, Trưởng '+laAp+' (3 tháng) · D – lãnh đạo PGD tham mưu UBND (từ 4 tháng) — KH 1166.</i>', 'font-size:11pt'); }
  /* ---- II.3 khoanh ---- */
  var kn = rows.filter(function(o){ return (o.kn||0)>0; });
  h += p('<b>3. Nợ khoanh</b>')+p(kn.length ? '<b>Nợ khoanh '+ndSo(tongM.khoanh)+' triệu đồng/'+kn.length+' món</b>; '+ds.filter(function(x){ return so[x].khoanh; }).map(function(x){ return ND_HOI_TEN[x]+' '+ndSo(so[x].khoanh)+' triệu đồng'; }).join(', ')+'.' : '<b>Không có nợ khoanh.</b>', 'text-align:justify');
  /* ---- II.4 KHĐ, lãi tồn ---- */
  var lt3 = {}; rows.forEach(function(o){ var lt = laiTon(o), m1 = ktLaiThang(o); if(lt>0 && m1>0 && lt/m1>3 && o.to) lt3[o.to] = (lt3[o.to]||0)+1; });
  var top = Object.keys(lt3).sort(function(a, b){ return lt3[b]-lt3[a]; }).slice(0, 3);
  h += p('<b>4. Món vay từ 3 tháng trở lên không hoạt động, lãi tồn</b>')+
    p((tongM.khd_mon ? '<b>Còn '+tongM.khd_mon+' món/'+ndSo(tongM.khd_du)+' triệu đồng không hoạt động từ 3 tháng trở lên</b> ('+ds.filter(function(x){ return so[x].khd_mon; }).map(function(x){ return ND_HOI_TEN[x]+' '+so[x].khd_mon+' món'; }).join(', ')+').' : '<b>Không có món vay từ 3 tháng trở lên không hoạt động.</b>')+
      (Math.round(tongM.lai_ton*10) ? ' Lãi tồn '+ndSo(tongM.lai_ton)+' triệu đồng'+(so[ds[0]] && so[ds[0]].lai_ton_tang!==undefined ? ', '+ndTang(tongM.lai_ton_tang, 'tháng trước') : '') : ' Không có lãi tồn')+
      (top.length ? '; tổ có nhiều món lãi tồn trên 3 tháng lãi: '+top.map(function(m){ return toTen(m)+' ('+lt3[m]+' món)'; }).join(', ') : '')+'.', 'text-align:justify');
  /* ---- II.5 chất lượng tổ ---- */
  var toQH = Object.keys(T).filter(function(m){ var t = T[m]; if(!t || t.trucTiep || toLaTT(t) || t.diem!==d) return false; var dn = 0, q = 0; (K.kh[m]||[]).forEach(function(o){ dn += o.dn||0; q += o.qh||0; }); t.__tl = dn ? q/dn*100 : 0; return t.__tl>1; });
  h += p('<b>5. Chất lượng Tổ, đối chiếu KH 1166</b>')+p(ndVang('xếp loại Tổ theo CLT02 / BC0437 — không có kết quả chấm điểm của kỳ thì không nêu xếp loại')+
    (toQH.length ? ' Tổ có tỷ lệ nợ quá hạn trên 1% (bắt đầu mất điểm, từ 2% mất trọn 30 điểm — VB 4289): '+toQH.map(function(m){ return toTen(m)+' '+ndSo(T[m].__tl, 2)+'%'; }).join(', ')+'.' : ' Không có Tổ có tỷ lệ nợ quá hạn trên 1%.'), 'text-align:justify');
  /* ---- III ---- */
  var ndh = rows.filter(function(o){ var hl = skHL(o), sau = kyLui(K.thang, 1); return (o.dn||0)>0 && !(o.qh>0) && hl>=sau+'-01' && hl<=tdnCuoiKy(sau); });
  h += p('<b>III. NHIỆM VỤ THÁNG TIẾP THEO</b>')+p('<b>1. Kế hoạch thu nợ, giải ngân</b>');
  if(ndh.length){ var g = {}; ndh.forEach(function(o){ var k = hoiCua(o)+'|'+(o.to||''); g[k] = g[k] || {h:hoiCua(o), to:o.to, ct:{}, t:0}; g[k].t += o.dn||0; g[k].ct[ctNgan(o.ct, o)] = 1; });
    h += p('Nợ đến hạn tháng '+kyLui(K.thang, 1).slice(5, 7)+'/'+kyLui(K.thang, 1).slice(0, 4)+': '+ndSo(tongM.ndh)+' triệu đồng/'+ndh.length+' món — thu nợ đến hạn để giải ngân cho vay lại:', 'text-align:justify');
    var b3 = '<table style="width:100%;border-collapse:collapse;font-size:11pt"><tr>'+['Stt', 'Đơn vị/Tổ', 'Chương trình', 'Số tiền thu nợ', 'Số tiền giải ngân'].map(function(c){ return '<th style="border:1px solid #000;background:#EEE">'+c+'</th>'; }).join('')+'</tr>', i = 0;
    Object.keys(g).sort().forEach(function(k){ var x = g[k]; i++; b3 += '<tr><td style="border:1px solid #000;text-align:center">'+i+'</td><td style="border:1px solid #000">'+(x.h==='TT' ? 'Trực tiếp' : ND_HOI_VT[x.h]+' — '+e(x.to ? toTen(x.to) : ''))+'</td><td style="border:1px solid #000">'+e(Object.keys(x.ct).join(', '))+'</td>'+
      '<td style="border:1px solid #000;text-align:right">'+ndSo(x.t/1e6)+'</td><td style="border:1px solid #000;text-align:right">'+ndSo(x.t/1e6)+'</td></tr>'; });
    h += b3+'</table>'+p('<i>(Danh sách nợ đến hạn đính kèm.)</i>', 'font-size:11pt'); }
  else h += p('Tháng tới không có nợ đến hạn.');
  var gnM = rows.filter(function(o){ return (o.gnT||0)>0; }).length;
  h += p('<b>2. Kiểm tra, giám sát</b>')+p(
    (gnM ? 'Hội, Tổ trưởng kiểm tra sử dụng vốn đối với '+gnM+' khoản vay giải ngân trong tháng trong vòng 30 ngày kể từ ngày giải ngân; ' : '')+
    (tongM.khd_mon ? 'kiểm tra 100% món vay từ 3 tháng trở lên không hoạt động ('+tongM.khd_mon+' món); ' : '')+'nộp Phiếu kiểm tra mẫu 06/TD, Biên bản mẫu 16/TD tại phiên giao dịch gần nhất (HD 727/HD-NHCS).', 'text-align:justify');
  h += p('<b>3. Đôn đốc, xử lý nợ</b>')+p(qh.length || kn.length || tongM.khd_mon ?
    'Đề nghị Hội, Tổ trưởng phối hợp '+[qh.length ? 'đôn đốc thu hồi '+qh.length+' món nợ quá hạn' : '', kn.length ? 'theo dõi '+kn.length+' món nợ khoanh, lập hồ sơ khi hết hạn khoanh (VB 368, Mẫu 01/QLNK)' : '',
      tongM.khd_mon ? 'đôn đốc '+tongM.khd_mon+' món không hoạt động' : '', top.length ? 'thu lãi tồn tại '+top.map(toTen).join(', ') : ''].filter(Boolean).join('; ')+'.' : 'Tiếp tục duy trì chất lượng tín dụng.', 'text-align:justify');
  h += p('<b>4. Nội dung khác</b>')+p(ndVang('nội dung khác của phiên (nếu có)'));
  /* ---- IV ---- */
  var nh = 'Tháng '+String(K.thang).slice(5, 7)+'/'+nam+', hoạt động tín dụng chính sách tại điểm giao dịch '+e(tenDiem)+' tiếp tục ổn định. Tổng dư nợ đạt '+ndSo(tongM.du_no)+' triệu đồng'+(so[ds[0]] && so[ds[0]].du_no_truoc!==undefined ? ', '+ndTang(tongM.du_no_tang, 'tháng trước') : '')+
    (gnM ? '; trong tháng giải ngân '+gnM+' món/'+ndSo(tongM.cho_vay)+' triệu đồng' : '')+'. Số dư tiền gửi tiết kiệm qua Tổ đạt '+ndSo(tongM.tien_gui)+' triệu đồng'+(so[ds[0]] && so[ds[0]].tien_gui_tang!==undefined ? ', '+ndTang(tongM.tien_gui_tang, 'tháng trước') : '')+'. '+
    (qh.length ? 'Nợ quá hạn '+ndSo(tongM.nqh)+' triệu đồng/'+qh.length+' món' : 'Không phát sinh nợ quá hạn')+'; '+(kn.length ? 'nợ khoanh '+ndSo(tongM.khoanh)+' triệu đồng/'+kn.length+' món' : 'không có nợ khoanh')+'; '+
    (tongM.khd_mon ? 'món vay từ 3 tháng trở lên không hoạt động còn '+tongM.khd_mon+' món/'+ndSo(tongM.khd_du)+' triệu đồng.' : 'không có món vay từ 3 tháng trở lên không hoạt động.');
  h += p('<b>IV. NHẬN ĐỊNH CHUNG, KIẾN NGHỊ, ĐỀ XUẤT</b>')+p(nh, 'text-align:justify')+
    p('Mong Hội, Tổ trưởng tiếp tục quan tâm kiểm tra, giám sát hoạt động Tổ; đến sớm điểm giao dịch'+(top.length ? ', hỗ trợ tổ còn nhiều món tồn lãi' : '')+'. Tranh thủ sự lãnh đạo của UBND '+e(xa || 'xã')+' trong việc chỉ đạo các ban, ngành liên quan phối hợp, hỗ trợ thực hiện.', 'text-align:justify');
  h += '<table style="width:100%;border:0;margin-top:18pt"><tr><td style="width:50%;text-align:center;border:0"><b>TỔ TRƯỞNG TỔ GIAO DỊCH</b></td><td style="text-align:center;border:0"><b>PHÊ DUYỆT CỦA BAN GIÁM ĐỐC</b></td></tr></table>';
  return h;
}
function ndDoc(html, ten){
  var dau = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>'+coChuHTML(ten)+'</title>'+
    '<style>@page{size:21cm 29.7cm;margin:2cm 2cm 2cm 3cm}body{font-family:"Times New Roman";font-size:14pt;line-height:1.15}table{page-break-inside:auto}</style></head><body>';
  return '﻿'+dau+html+'</body></html>';
}
function ndXuat(){
  var B = BC.B, K = BC.K; if(!B || !K || !B.diem[BC.diem]) return bao('Mở 📐 Bộ số chuẩn và chọn điểm trước.', 4);
  var D = B.diem[BC.diem], ten = 'Nhap ND hop m08 '+D.khoa+' '+K.ngay;
  taiXuongBlob(new Blob([ndDoc(ndDung(K, B, BC.diem), ten)], {type:'application/msword'}), ten+'.doc');
}
(function(){
  function dk(){ if(dk.xong || typeof GD==='undefined') return; dk.xong = 1; GD.dangKy('nd', {xuat:function(){ ndXuat(); }}); }
  if(typeof bcVe!=='function') return; var cu = bcVe;   /* nút 📝 trong hộp 📐 Bộ số chuẩn */
  bcVe = function(){ dk(); var r = cu.apply(this, arguments), h = document.querySelector('#hop-in .gd-hang.gd-phai');
    if(h && !h.querySelector('[data-lenh="nd.xuat"]')) h.insertAdjacentHTML('beforeend', GD.nut({chu:'📝 Nháp Nội dung họp (mẫu 08)', lenh:'nd.xuat', tit:'Bản nháp để đối chiếu với bản giao ban — Word'})); return r; };
})();
