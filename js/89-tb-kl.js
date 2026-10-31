/* ===== 3.426 (docs/TEO_GIAO_BAN_KY_NANG.md mục 4.2, 4.4, 4.5, 5 — anh 31/10 "em làm luôn GĐ 3 và gộp lên") =====
   📄 NHÁP THÔNG BÁO KẾT LUẬN THEO PHIÊN — mẫu 08/GDX (VB 4368). App dựng NHÁP để anh ĐỐI CHIẾU với bản giao ban phát hành.
   - Kỳ số liệu = ngày phiên (Mẫu 31 ngày phiên), so với cuối tháng trước (📐 Bộ số chuẩn js/87, kỳ trước QT-C-21); cho vay / thu nợ = lũy kế tháng (cột tháng Mẫu 31).
   - II.2 tồn tại: NQH · khoanh · KHĐ (± so cuối tháng trước, theo Hội) · chất lượng Tổ (không chấm điểm → NQH, món lãi tồn > 3 tháng lãi, tổ viên tiền gửi < 500 nghìn)
     · nợ đến hạn tháng này (đã thu đến ngày phiên / còn lại — theo danh sách đến hạn ở Mẫu 31 cuối tháng trước) · nợ đến hạn tháng tới · lãi tồn · huy động.
   - Không có dữ liệu (thành phần họp, chính sách mới = Phần I Nội dung họp, kết quả phiên theo KQGD, đối chiếu KH 1166 khi chưa nạp Mẫu 31 ngày 31/12,
     điểm chính hay phụ) → ô vàng "[Giao ban điền: …]". Không có dòng "(Số liệu đến ngày …)". Nơi nhận mặc định điểm phụ (không gửi UBND). Ký GIÁM ĐỐC.
   Dùng ndSo / ndO / ndTang / ndVang / ndDoc (js/88). Cắm rút: bỏ dòng <script> là mất nút 📄. ES5. */
function tbNgayKy(iso){ var d = new Date(iso); do { d.setDate(d.getDate()+1); } while(d.getDay()===0 || d.getDay()===6); return d; }   /* ngày làm việc kế tiếp sau phiên */
function tbDung(K, Kp, B, d){
  var D = B.diem[d], e = coChuHTML, T = K.to || {}, so = D.so, ds = BC_HOI_DS.filter(function(h){ return so[h]; }), coTT = !!so.TT, ngay = K.ngay, nP = ngayVNsl(ngay);
  var tenDiem = String(D.ten || '').replace(/^\s*(điểm( gd| giao dịch)?)\s+/i, ''), cuoiTruoc = Kp ? ngayVNsl(Kp.ngay) : '', xa = '';
  var cong = function(k){ return ds.reduce(function(a, h){ return a+(so[h][k]||0); }, 0)+(coTT && so.TT[k]!==undefined ? so.TT[k]||0 : 0); }, tg = {};
  ['so_to', 'so_kh_du_no', 'cho_vay', 'thu_no', 'du_no', 'du_no_tang', 'nqh', 'khoanh', 'khd_mon', 'khd_du', 'lai_ton', 'lai_ton_tang', 'tien_gui', 'tien_gui_tang', 'ndh'].forEach(function(k){ tg[k] = cong(k); });
  var rows = (K.hs||[]).filter(function(o){ return o.ku && bcViTri(K, o).d===d; }), nay = {}; rows.forEach(function(o){ nay[o.ku] = o; if(!xa && o.tenXa) xa = o.tenXa; });
  var laAp = /^phường/i.test(xa) ? 'khu phố' : 'ấp', hoiCua = function(o){ return bcViTri(K, o).h; };
  var toTen = function(m){ var t = T[m], x = String(t && t.ten || m); return /^tổ\s/i.test(x) ? 'tổ '+x.replace(/^tổ\s+/i, '') : 'tổ '+x; }, coTruoc = !!(so[ds[0]] && so[ds[0]].du_no_truoc!==undefined);
  var p = function(x, st){ return '<p style="margin:0 0 3pt;line-height:1.15;'+(st||'')+'">'+x+'</p>'; }, j = 'text-align:justify', h = '';
  var ky = tbNgayKy(ngay), th = String(K.thang).slice(5, 7)+'/'+String(K.thang).slice(0, 4);
  h += '<p style="margin:0 0 6pt;color:#B00;font-size:11pt;text-align:center"><i>Bản nháp app Tủ hồ sơ — để đối chiếu với bản giao ban, không phát hành.</i></p>';
  h += '<table style="width:100%;border:0;border-collapse:collapse"><tr><td style="width:45%;text-align:center;vertical-align:top;border:0">NGÂN HÀNG CHÍNH SÁCH XÃ HỘI<br><b>PHÒNG GIAO DỊCH GÒ DẦU</b><br>———<br>Số:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/TB-KLGB</td>'+
    '<td style="text-align:center;vertical-align:top;border:0"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br>———————<br><i>Tây Ninh, ngày '+ky.getDate()+' tháng '+(ky.getMonth()+1)+' năm '+ky.getFullYear()+'</i></td></tr></table>';
  h += p('<b>THÔNG BÁO</b>', 'text-align:center;margin-top:12pt')+p('<b>Kết luận cuộc họp giao ban tháng '+th+'</b>', 'text-align:center')+p('<b>Tại điểm giao dịch '+e(tenDiem)+'</b>', 'text-align:center;margin-bottom:9pt');
  h += p('Ngày '+nP+', tại điểm giao dịch '+e(tenDiem)+', Phòng giao dịch Ngân hàng Chính sách xã hội Gò Dầu tổ chức họp giao ban tháng '+th+'. '+ndVang('thành phần tham dự, chủ trì (không có thông tin thì bỏ)'), j);
  /* ---- I ---- */
  h += p('<b>I. CHÍNH SÁCH MỚI TRONG THÁNG</b>')+p(ndVang('đúng Phần I Nội dung họp cùng phiên (văn bản đã triển khai tại cuộc họp)'), j);
  /* ---- II.1 ---- */
  h += p('<b>II. KẾT QUẢ THỰC HIỆN TẠI ĐIỂM GIAO DỊCH (đến ngày '+nP+')</b>')+p('<b>1. Kết quả hoạt động</b>');
  h += p('Tổng dư nợ đạt '+ndSo(tg.du_no)+' triệu đồng, với '+tg.so_kh_du_no+' khách hàng còn dư nợ, thông qua '+tg.so_to+' Tổ TK&amp;VV'+(coTT ? '; trong đó cho vay trực tiếp '+ndSo(so.TT.du_no)+' triệu đồng, ủy thác '+ndSo(tg.du_no-so.TT.du_no)+' triệu đồng' : '')+
    (coTruoc && cuoiTruoc ? ' ('+ndTang(tg.du_no_tang, 'ngày '+cuoiTruoc)+')' : '')+'.', j);
  var dong = function(stt, ten, x, dam){ var td = function(v){ return '<td style="text-align:right;border:1px solid #000;padding:1pt 3pt">'+v+'</td>'; };
    return '<tr'+(dam ? ' style="font-weight:bold"' : '')+'><td style="text-align:center;border:1px solid #000">'+stt+'</td><td style="border:1px solid #000;padding:1pt 3pt">'+ten+'</td>'+td(ndO(x.so_to, 0))+td(ndO(x.so_kh_du_no, 0))+td(ndO(x.cho_vay))+td(ndO(x.thu_no))+td(ndO(x.du_no))+
      td(tg.du_no ? ndO(x.du_no/tg.du_no*100, 2) : '-')+td(ndO(x.nqh))+td(ndO(x.khoanh))+td(ndO(x.khd_mon, 0))+'</tr>'; };
  var b = '<table style="width:100%;border-collapse:collapse;font-size:11pt"><tr>'+['Stt', 'Đơn vị', 'Số tổ', 'Số khách hàng', 'DS cho vay', 'DS thu nợ', 'Dư nợ', 'Tỷ trọng %', 'NQH', 'Khoanh', 'Số món KHĐ'].map(function(c){ return '<th style="border:1px solid #000;background:#EEE;padding:1pt 2pt">'+c+'</th>'; }).join('')+'</tr>';
  if(coTT) b += dong('I', 'TRỰC TIẾP', {so_to:0, so_kh_du_no:so.TT.so_ho, cho_vay:so.TT.cho_vay, thu_no:so.TT.thu_no, du_no:so.TT.du_no, nqh:so.TT.nqh, khoanh:so.TT.khoanh, khd_mon:0}, true);
  var uy = {}; ['so_to', 'so_kh_du_no', 'cho_vay', 'thu_no', 'du_no', 'nqh', 'khoanh', 'khd_mon'].forEach(function(k){ uy[k] = ds.reduce(function(a, x){ return a+(so[x][k]||0); }, 0); });
  b += dong(coTT ? 'II' : '', 'ỦY THÁC', uy, true); ds.forEach(function(x, i){ b += dong(i+1, ND_HOI_VT[x], so[x]); });
  b += dong('', 'Cộng', {so_to:tg.so_to, so_kh_du_no:tg.so_kh_du_no+(coTT ? so.TT.so_ho||0 : 0), cho_vay:tg.cho_vay, thu_no:tg.thu_no, du_no:tg.du_no, nqh:tg.nqh, khoanh:tg.khoanh, khd_mon:tg.khd_mon}, true)+'</table>';
  h += b+p('<i>Đơn vị: triệu đồng.</i>', 'font-size:11pt')+p('Biểu Kết quả giao dịch tại điểm giao dịch kèm theo. '+ndVang('kết quả phiên theo KQGD: giải ngân, thu nợ, thu lãi, thu / chi tiết kiệm'), j);
  /* ---- II.2 tồn tại ---- */
  h += p('<b>2. Tồn tại, hạn chế</b>');
  var qh = rows.filter(function(o){ return (o.qh||0)>0; }), kn = rows.filter(function(o){ return (o.kn||0)>0; }), y = [];
  var tenHo = function(ls){ var g = {}; ls.forEach(function(o){ var hv = hoiCua(o); (g[hv] = g[hv] || []).push(o); });   /* tên hộ trong ngoặc theo Hội; > 10 hộ → gom theo tổ */
    return Object.keys(g).map(function(hv){ var a = g[hv], ten = hv==='TT' ? 'trực tiếp' : ND_HOI_TEN[hv];
      if(a.length>10){ var t = {}; a.forEach(function(o){ var k = o.to || ''; t[k] = t[k] || {n:0, s:0}; t[k].n++; t[k].s += (o.qh||o.kn||o.dn||0); });
        return ten+' ('+Object.keys(t).map(function(k){ return (k ? toTen(k) : 'trực tiếp')+' '+t[k].n+' món/'+ndSo(t[k].s/1e6); }).join('; ')+')'; }
      return ten+' ('+a.map(function(o){ return e(tenHoaDau(o.ten||'')); }).join(', ')+')'; }).join('; '); };
  y.push(qh.length ? 'Nợ quá hạn '+ndSo(tg.nqh)+' triệu đồng/'+qh.length+' món: '+tenHo(qh)+'.' : 'Không phát sinh nợ quá hạn.');
  if(kn.length) y.push('Nợ khoanh '+ndSo(tg.khoanh)+' triệu đồng/'+kn.length+' món: '+tenHo(kn)+'; theo dõi hạn khoanh, khi hết hạn khoanh lập hồ sơ theo VB 368 (Mẫu 01/QLNK), báo trước 120 ngày.');
  var truoc = {}; if(Kp) (Kp.hs||[]).forEach(function(o){ if(o.ku && !truoc[o.ku]) truoc[o.ku] = o; });   /* dòng Mẫu 31 cuối tháng trước theo số khế ước */
  var khdT = {};   /* món KHĐ ở Mẫu 31 cuối tháng trước, xếp theo vị trí hiện nay của khế ước (QT-C-21) */
  if(Kp) slKHD(Kp.B).forEach(function(o){ if(!o.ku) return; var n = nay[o.ku] || truoc[o.ku]; if(!n || bcViTri(K, n).d!==d) return; var hv = bcViTri(K, n).h; khdT[hv] = (khdT[hv]||0)+1; });
  if(tg.khd_mon || Object.keys(khdT).length){ var khdTr = Object.keys(khdT).reduce(function(a, k){ return a+khdT[k]; }, 0), chT = tg.khd_mon-khdTr;
    y.push('Món vay từ 3 tháng trở lên không hoạt động: '+tg.khd_mon+' món/'+ndSo(tg.khd_du)+' triệu đồng'+(Kp ? ' ('+(chT>0 ? 'tăng '+chT : chT<0 ? 'giảm '+(-chT) : 'không đổi')+(chT ? ' món' : '')+' so với ngày '+cuoiTruoc+')' : '')+
      (tg.khd_mon ? '; '+ds.filter(function(x){ return so[x].khd_mon; }).map(function(x){ return ND_HOI_TEN[x]+' '+so[x].khd_mon+' món'+(Kp ? ' ('+(so[x].khd_mon-(khdT[x]||0)>=0 ? '+' : '')+(so[x].khd_mon-(khdT[x]||0))+')' : ''); }).join(', ') : '')+'.'); }
  var lt3 = {}, tkThap = {}, tgKH = {};
  rows.forEach(function(o){ var lt = laiTon(o), m1 = ktLaiThang(o); if(lt>0 && m1>0 && lt/m1>3 && o.to) lt3[o.to] = (lt3[o.to]||0)+1; });
  (K.hs||[]).concat(K.lap||[]).forEach(function(o){ var s = slStk(o.stk)[0]; if(!s || !o.to || bcViTri(K, o).d!==d) return; var k = o.to+'|'+o.kh; tgKH[k] = tgKH[k] || {}; tgKH[k][s] = Math.max(tgKH[k][s]||0, +o.t105||0); });
  Object.keys(tgKH).forEach(function(k){ var v = Object.keys(tgKH[k]).reduce(function(a, s){ return a+tgKH[k][s]; }, 0); if(v<500000){ var to = k.split('|')[0]; tkThap[to] = (tkThap[to]||0)+1; } });
  var top = function(o){ return Object.keys(o).sort(function(a, b){ return o[b]-o[a]; }).slice(0, 3); }, tL = top(lt3), tK = top(tkThap);
  y.push('Chất lượng Tổ: '+ndVang('kết quả chấm điểm của kỳ (không có thì không nêu xếp loại)')+(tL.length ? ' Tổ có nhiều món lãi tồn trên 3 tháng lãi: '+tL.map(function(m){ return toTen(m)+' ('+lt3[m]+' món)'; }).join(', ')+'.' : '')+
    (tK.length ? ' Tổ có nhiều tổ viên tiền gửi dưới 500 nghìn đồng: '+tK.map(function(m){ return toTen(m)+' ('+tkThap[m]+')'; }).join(', ')+'.' : ''));
  if(Kp){ var dau = String(K.thang)+'-01', cuoi = tdnCuoiKy(K.thang), dh = (Kp.hs||[]).filter(function(o){ var hl = skHL(o); return o.ku && (o.dn||0)>0 && !(o.qh>0) && hl>=dau && hl<=cuoi && (!nay[o.ku] ? bcViTri(Kp, o).d===d : true); }), daThu = 0, conLai = 0, chQH = 0;
    dh.forEach(function(o){ var n = nay[o.ku]; if(n && bcViTri(K, n).d!==d) return; var c = n ? n.dn||0 : 0; daThu += Math.max(0, (o.dn||0)-c); conLai += c; if(n && (n.qh||0)>0) chQH++; });
    if(dh.length) y.push('Nợ đến hạn tháng '+th+': '+ndSo(dh.reduce(function(a, o){ return a+(o.dn||0); }, 0)/1e6)+' triệu đồng/'+dh.length+' món; đến ngày '+nP+' đã thu '+ndSo(daThu/1e6)+' triệu đồng, còn lại '+ndSo(conLai/1e6)+' triệu đồng'+(chQH ? ' ('+chQH+' món đã chuyển quá hạn)' : '')+'.'); }
  var sau = kyLui(K.thang, 1), ndh = rows.filter(function(o){ var hl = skHL(o); return (o.dn||0)>0 && !(o.qh>0) && hl>=sau+'-01' && hl<=tdnCuoiKy(sau); });
  if(ndh.length) y.push('Nợ đến hạn tháng '+sau.slice(5, 7)+'/'+sau.slice(0, 4)+': '+ndSo(tg.ndh)+' triệu đồng/'+ndh.length+' món.');
  if(Math.round(tg.lai_ton*10)) y.push('Lãi tồn '+ndSo(tg.lai_ton)+' triệu đồng'+(coTruoc ? ', '+ndTang(tg.lai_ton_tang, 'ngày '+cuoiTruoc) : '')+(tL.length ? '; số lãi tồn cao tại '+tL.map(toTen).join(', ') : '')+'.');
  y.push('Đối chiếu KH 1166: '+ndVang('so với ngày 31/12 năm trước — cần Mẫu 31 ngày 31/12'));
  y.push('Huy động tiền gửi tiết kiệm qua Tổ đạt '+ndSo(tg.tien_gui)+' triệu đồng'+(coTruoc ? ', '+ndTang(tg.tien_gui_tang, 'ngày '+cuoiTruoc) : '')+'.');
  h += y.map(function(x){ return p('- '+x, j); }).join('');
  /* ---- III ---- */
  h += p('<b>III. NHIỆM VỤ THÁNG TIẾP THEO</b>')+p('<b>1. Kế hoạch thu nợ, giải ngân</b>');
  if(ndh.length){ var g = {}; ndh.forEach(function(o){ var k = hoiCua(o)+'|'+(o.to||''); g[k] = g[k] || {h:hoiCua(o), to:o.to, ct:{}, t:0}; g[k].t += o.dn||0; g[k].ct[ctNgan(o.ct, o)] = 1; });
    var b3 = '<table style="width:100%;border-collapse:collapse;font-size:11pt"><tr>'+['Stt', 'Đơn vị/Tổ', 'Chương trình', 'Số tiền thu nợ', 'Số tiền giải ngân'].map(function(c){ return '<th style="border:1px solid #000;background:#EEE">'+c+'</th>'; }).join('')+'</tr>', i = 0;
    Object.keys(g).sort().forEach(function(k){ var x = g[k]; i++; b3 += '<tr><td style="border:1px solid #000;text-align:center">'+i+'</td><td style="border:1px solid #000">'+(x.h==='TT' ? 'Trực tiếp' : ND_HOI_VT[x.h]+' — '+e(x.to ? toTen(x.to) : ''))+'</td>'+
      '<td style="border:1px solid #000">'+e(Object.keys(x.ct).join(', '))+'</td><td style="border:1px solid #000;text-align:right">'+ndSo(x.t/1e6)+'</td><td style="border:1px solid #000;text-align:right">'+ndSo(x.t/1e6)+'</td></tr>'; });
    h += b3+'</table>'+p('<i>(Danh sách nợ đến hạn đính kèm)</i>', 'font-size:11pt'); }
  else h += p('Tháng tới không có nợ đến hạn.');
  var gnM = rows.filter(function(o){ return (o.gnT||0)>0; }).length;
  h += p('<b>2. Kiểm tra, giám sát</b>')+p((gnM ? 'Đề nghị Hội, Tổ trưởng kiểm tra sử dụng vốn đối với '+gnM+' khoản vay giải ngân trong tháng trong vòng 30 ngày kể từ ngày giải ngân; ' : '')+
    (tg.khd_mon ? 'kiểm tra 100% món vay từ 3 tháng trở lên không hoạt động ('+tg.khd_mon+' món); ' : '')+'nộp Phiếu kiểm tra mẫu 06/TD, Biên bản mẫu 16/TD tại phiên giao dịch gần nhất (HD 727/HD-NHCS).', j);
  h += p('<b>3. Đôn đốc, xử lý nợ</b>')+p(qh.length || kn.length || tg.khd_mon || tL.length ? 'Đề nghị Hội, Tổ trưởng phối hợp '+[qh.length ? 'đôn đốc thu hồi '+qh.length+' món nợ quá hạn' : '', kn.length ? 'theo dõi '+kn.length+' món nợ khoanh' : '',
    tg.khd_mon ? 'đôn đốc '+tg.khd_mon+' món không hoạt động' : '', tL.length ? 'thu lãi tồn tại '+tL.map(toTen).join(', ') : ''].filter(Boolean).join('; ')+'.' : 'Tiếp tục duy trì chất lượng tín dụng.', j);
  h += p('<b>4. Nội dung khác</b>')+p(ndVang('nội dung khác (nếu có)'));
  /* ---- IV ---- */
  h += p('<b>IV. KIẾN NGHỊ, ĐỀ XUẤT</b>')+p('Đề nghị Hội đến sớm điểm giao dịch theo lịch; tăng cường kiểm tra, giám sát hoạt động Tổ'+(tL.length ? '; hỗ trợ tổ còn nhiều món tồn lãi' : '')+'.', j);
  /* ---- nơi nhận + ký ---- */
  h += '<table style="width:100%;border:0;margin-top:12pt;font-size:12pt"><tr><td style="width:55%;vertical-align:top;border:0"><b><i>Nơi nhận:</i></b><br>- Các tổ chức CT-XH nhận ủy thác;<br>- Các Trưởng '+laAp+', Tổ trưởng Tổ TK&amp;VV;<br>- Ban Giám đốc, Tổ trưởng Tổ KH-TD;<br>- Lưu: VT, CBTD.<br>'+
    ndVang('điểm chính: thêm Đảng ủy, UBND (để b/c); điểm phụ không gửi UBND')+'</td><td style="text-align:center;vertical-align:top;border:0;font-size:14pt"><b>GIÁM ĐỐC</b></td></tr></table>';
  return h;
}
function tbXuat(){
  var B = BC.B, K = BC.K; if(!B || !K || !B.diem[BC.diem]) return bao('Mở 📐 Bộ số chuẩn (kỳ ngày phiên) và chọn điểm trước.', 4);
  var D = B.diem[BC.diem], ten = 'Nhap TB KL phien '+D.khoa+' '+K.ngay;
  taiXuongBlob(new Blob([ndDoc(tbDung(K, BC.Kp || null, B, BC.diem), ten)], {type:'application/msword'}), ten+'.doc');
}
(function(){
  function dk(){ if(dk.xong || typeof GD==='undefined') return; dk.xong = 1; GD.dangKy('tb', {xuat:function(){ tbXuat(); }}); }
  if(typeof bcVe!=='function' || typeof ndDoc!=='function') return; var cu = bcVe;   /* nút 📄 trong hộp 📐 (cạnh 📝) */
  bcVe = function(){ dk(); var r = cu.apply(this, arguments), h = document.querySelector('#hop-in .gd-hang.gd-phai');
    if(h && !h.querySelector('[data-lenh="tb.xuat"]')) h.insertAdjacentHTML('beforeend', GD.nut({chu:'📄 Nháp TB kết luận (08/GDX)', lenh:'tb.xuat', tit:'Thông báo kết luận theo phiên — kỳ số liệu = ngày phiên, so với cuối tháng trước. Bản nháp để đối chiếu — Word'})); return r; };
})();
