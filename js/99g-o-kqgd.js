/* ===== 3.573 (anh 28/11/2026 duyệt kế hoạch "phần nào KQGD em lên KH làm luôn" · "Code và gộp"): 📋 Ô Sao kê "KẾT QUẢ GIAO DỊCH" =====
   Khuôn "Nội dung họp giao ban" PGD mục 1 + mục 6 (kết quả theo Hội đoàn thể nhận ủy thác, điểm GD và toàn xã). Đơn vị: tổ, khách hàng, triệu đồng, %. A4 ngang.
   - B1 Kết quả theo Hội: mỗi điểm GD (Hội + Cộng điểm) rồi Toàn xã (Hội + Cộng xã): số tổ, số khách hàng còn dư nợ, doanh số cho vay / thu nợ trong tháng, tổng dư nợ,
     tỷ trọng, nợ quá hạn + tỷ lệ, nợ khoanh, số hộ KHĐ, tiết kiệm.
   - B2 Biến động so tháng trước theo Hội: số khách hàng còn dư nợ, dư nợ, tiền gửi tiết kiệm, lãi tồn — kỳ này / tháng trước / ± (khuôn bảng 2 mục 1 giao ban).
   - Chuyển hẳn vào ô: "Kết quả giao dịch tại điểm GD" (chi tiết từng tổ, js/22j) và "Đối chiếu KQGD ↔ Mẫu 31" (js/99b).
   Số liệu: dùng lại ttDuLieu (js/22j — cùng cách đếm báo cáo KQGD chi tiết), kỳ = Mẫu 31 chốt tháng như nhóm Thông tin tổ (SK_TT_CAN → ttChuanBi); tháng trước = KHO.nap(tháng trước).
   Chỉ đọc. Cắm rút: bỏ dòng <script> → mất ô, 2 báo cáo về chỗ cũ. ES5. */
var OKQ = (function(){
  var M = {NHOM:'kq3'};
  if(typeof SK_BC==='undefined' || typeof ttDuLieu!=='function' || typeof ttXaGom!=='function') return M;
  var tr = function(v){ return v==null ? '—' : (Math.round((v||0)/1e5)/10).toLocaleString('vi-VN', {minimumFractionDigits:1, maximumFractionDigits:1}); };
  var so = function(v){ return v==null ? '—' : (+v||0).toLocaleString('vi-VN'); }, mau = function(v){ return v>0 ? ' style="color:#067647"' : (v<0 ? ' style="color:#b42318"' : ''); };
  var dtr = function(v){ return v==null ? '—' : (v>0 ? '+' : '')+tr(v); }, dso = function(v){ return v==null ? '—' : (v>0 ? '+' : '')+so(v); };
  /* dữ liệu: [{xa, diem:[{ten, ngay, hoi:[{dv, ten, s}], s}], hoi, s}] */
  M.dl = function(){ var ds = ttDuLieu(); ds.forEach(function(d){ ttChot(d.s); d.hoi.forEach(function(h){ ttChot(h.s); }); }); return ttXaGom(ds); };
  M.ten = function(h){ return h.dv==='99' ? 'Cho vay trực tiếp' : (ttHoiTen(h.dv) || h.ten); };
  /* ---------- B1 Kết quả theo Hội ---------- */
  M.b1 = function(){ if(!skMau31()) return skCan31('Kết quả giao dịch theo Hội đoàn thể'); var X = M.dl();
    var th = '<tr><th>Stt</th><th>Đơn vị nhận ủy thác</th><th>Số tổ</th><th>Số khách hàng</th><th>DS cho vay</th><th>DS thu nợ</th><th>Tổng dư nợ</th><th>Tỷ trọng (%)</th><th>Nợ quá hạn</th><th>Tỷ lệ QH (%)</th><th>Nợ khoanh</th><th>Hộ KHĐ</th><th>Tiết kiệm</th></tr>';
    var aoa = [['Stt', 'Đơn vị nhận ủy thác', 'Số tổ', 'Số khách hàng còn dư nợ', 'Doanh số cho vay', 'Doanh số thu nợ', 'Tổng dư nợ', 'Tỷ trọng (%)', 'Nợ quá hạn', 'Tỷ lệ QH (%)', 'Nợ khoanh', 'Số hộ KHĐ', 'Tiết kiệm']], body = '';
    var dong = function(stt, ten, s, tong, lop){ var tt = tong ? Math.round(s.dn/tong*10000)/100 : 0, tl = s.dn ? Math.round(s.qh/s.dn*10000)/100 : 0;
      var r = [stt, ten, s.soTo||0, s.hdn||0, s.cv||0, s.tn||0, s.dn||0, tt, s.qh||0, tl, s.kn||0, s.khdKH||0, s.t105||0]; aoa.push(r);
      return '<tr'+(lop ? ' class="'+lop+'"' : '')+'><td class="c">'+(stt||'')+'</td><td>'+coChuHTML(ten)+'</td><td class="s">'+so(r[2])+'</td><td class="s">'+so(r[3])+'</td><td class="s">'+tr(r[4])+'</td><td class="s">'+tr(r[5])+'</td>'+
        '<td class="s"><b>'+tr(r[6])+'</b></td><td class="s">'+String(tt).replace('.', ',')+'</td><td class="s">'+(r[8] ? tr(r[8]) : '-')+'</td><td class="s">'+String(tl).replace('.', ',')+'</td><td class="s">'+(r[10] ? tr(r[10]) : '-')+'</td><td class="s">'+(r[11] ? so(r[11]) : '-')+'</td><td class="s">'+tr(r[12])+'</td></tr>'; };
    X.forEach(function(x){ x.diem.forEach(function(d){ body += '<tr class="nhom"><td colspan="13">'+coChuHTML('Điểm GD '+d.ten+(d.ngayGD ? ' · ngày '+d.ngayGD : '')+' — '+(d.tenXa || x.ten))+'</td></tr>'; aoa.push(['', 'Điểm GD '+d.ten]);
        d.hoi.forEach(function(h, i){ body += dong(i+1, M.ten(h), h.s, d.s.dn); }); body += dong('', 'Cộng điểm '+d.ten, d.s, d.s.dn, 'cong'); });
      if(x.diem.length>1 || X.length>1){ body += '<tr class="nhom"><td colspan="13">'+coChuHTML('TOÀN '+String(x.ten).toUpperCase())+'</td></tr>'; aoa.push(['', 'Toàn '+x.ten]);
        x.hoi.forEach(function(h, i){ ttChot(h.s); body += dong(i+1, M.ten(h), h.s, x.s.dn); }); body += dong('', 'Cộng '+x.ten, ttChot(x.s), x.s.dn, 'tong'); } });
    if(!X.length) body = '<tr><td colspan="13" class="c">Không có tổ trong phạm vi.</td></tr>';
    return {ten:'KQGD theo Hoi', tieuDe:'KẾT QUẢ GIAO DỊCH THEO HỘI ĐOÀN THỂ NHẬN ỦY THÁC', ngay:'Số liệu đến ngày '+ngayVNsl(SK_K.ngay || tdnCuoiKy(SK_K.thang)),
      html:'<div class="bc-tom">Khuôn mục 1 + mục 6 "Nội dung họp giao ban" · số khách hàng = hộ còn dư nợ · doanh số cho vay / thu nợ trong tháng · đơn vị: tổ, khách hàng, triệu đồng, %.</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  /* ---------- B2 Biến động so tháng trước ---------- */
  M.b2 = function(){ if(!skMau31()) return skCan31('Biến động so tháng trước theo Hội'); var X = M.dl(), X0 = null, K0 = SK_K;
    if(M.Kp && M.Kp.B){ try{ SK_K = M.Kp; X0 = M.dl(); } finally { SK_K = K0; } }
    var tim = function(xten, dten, dv){ if(!X0) return null; var x = X0.find(function(z){ return z.ten===xten; }); if(!x) return null; if(dten==null){ if(dv==null) return ttChot(x.s); var hx = x.hoi.find(function(h){ return h.dv===dv; }); return hx ? ttChot(hx.s) : {hdn:0, dn:0, t105:0, lt:0}; }
      var d = x.diem.find(function(z){ return z.ten===dten; }); if(!d) return null; if(dv==null) return d.s; var h = d.hoi.find(function(z){ return z.dv===dv; }); return h ? h.s : {hdn:0, dn:0, t105:0, lt:0}; };
    var th = '<tr><th rowspan="2">Stt</th><th rowspan="2">Đơn vị nhận ủy thác</th><th colspan="2">Số khách hàng</th><th colspan="3">Tổng dư nợ</th><th colspan="3">Tiền gửi tiết kiệm</th><th colspan="3">Lãi tồn</th></tr>'+
      '<tr><th>Kỳ này</th><th>±</th><th>Kỳ này</th><th>Tháng trước</th><th>±</th><th>Kỳ này</th><th>Tháng trước</th><th>±</th><th>Kỳ này</th><th>Tháng trước</th><th>±</th></tr>';
    var aoa = [['Stt', 'Đơn vị nhận ủy thác', 'Số KH kỳ này', '± KH', 'Dư nợ kỳ này', 'Dư nợ tháng trước', '± dư nợ', 'Tiền gửi kỳ này', 'Tiền gửi tháng trước', '± tiền gửi', 'Lãi tồn kỳ này', 'Lãi tồn tháng trước', '± lãi tồn']], body = '';
    var dong = function(stt, ten, s, s0, lop){ var c = function(f){ return s0 ? (s[f]||0)-(s0[f]||0) : null; };
      var r = [stt, ten, s.hdn||0, c('hdn'), s.dn||0, s0 ? s0.dn||0 : null, c('dn'), s.t105||0, s0 ? s0.t105||0 : null, c('t105'), s.lt||0, s0 ? s0.lt||0 : null, c('lt')]; aoa.push(r);
      var lt = r[12]==null ? '' : (r[12]>0 ? ' style="color:#b42318"' : (r[12]<0 ? ' style="color:#067647"' : ''));   /* lãi tồn tăng = xấu (đỏ) */
      return '<tr'+(lop ? ' class="'+lop+'"' : '')+'><td class="c">'+(stt||'')+'</td><td>'+coChuHTML(ten)+'</td><td class="s">'+so(r[2])+'</td><td class="s"'+mau(r[3])+'>'+dso(r[3])+'</td><td class="s"><b>'+tr(r[4])+'</b></td><td class="s">'+tr(r[5])+'</td><td class="s"'+mau(r[6])+'>'+dtr(r[6])+'</td>'+
        '<td class="s">'+tr(r[7])+'</td><td class="s">'+tr(r[8])+'</td><td class="s"'+mau(r[9])+'>'+dtr(r[9])+'</td><td class="s">'+tr(r[10])+'</td><td class="s">'+tr(r[11])+'</td><td class="s"'+lt+'>'+dtr(r[12])+'</td></tr>'; };
    X.forEach(function(x){ x.diem.forEach(function(d){ body += '<tr class="nhom"><td colspan="13">'+coChuHTML('Điểm GD '+d.ten+' — '+(d.tenXa || x.ten))+'</td></tr>'; aoa.push(['', 'Điểm GD '+d.ten]);
        d.hoi.forEach(function(h, i){ body += dong(i+1, M.ten(h), h.s, tim(x.ten, d.ten, h.dv)); }); body += dong('', 'Cộng điểm '+d.ten, d.s, tim(x.ten, d.ten)); });
      if(x.diem.length>1 || X.length>1){ body += '<tr class="nhom"><td colspan="13">'+coChuHTML('TOÀN '+String(x.ten).toUpperCase())+'</td></tr>'; aoa.push(['', 'Toàn '+x.ten]);
        x.hoi.forEach(function(h, i){ body += dong(i+1, M.ten(h), ttChot(h.s), tim(x.ten, null, h.dv)); }); body += dong('', 'Cộng '+x.ten, ttChot(x.s), tim(x.ten, null), 'tong'); } });
    if(!X.length) body = '<tr><td colspan="13" class="c">Không có tổ trong phạm vi.</td></tr>';
    var kp = M.Kp && M.Kp.thang ? kyVN(M.Kp.thang) : '';
    return {ten:'KQGD bien dong', tieuDe:'BIẾN ĐỘNG SO THÁNG TRƯỚC THEO HỘI ĐOÀN THỂ NHẬN ỦY THÁC', ngay:'Kỳ '+kyVN(SK_K.thang)+(kp ? ' so '+kp : ''),
      html:'<div class="bc-tom">Kỳ '+kyVN(SK_K.thang)+' so '+(kp || '<b>— chưa có Mẫu 31 tháng trước (cột tháng trước, ± để trống)</b>')+' · số khách hàng = hộ còn dư nợ · dư nợ, tiền gửi tăng màu xanh; lãi tồn tăng màu đỏ · đơn vị: khách hàng, triệu đồng.</div>'+
        '<table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  /* ---------- nạp tháng trước + gắn vào Sao kê ---------- */
  if(typeof skXem==='function'){ var cuXem = skXem; skXem = function(){ var C = skCH(), self = this, a = arguments;
      if(C.bc && C.bc.kq_bd && !M.dang && SK_K && SK_K.thang){ var tp = kyLui(SK_K.thang, -1);
        if(!KHO.bang('hstd', tp)){ M.Kp = null; return cuXem.apply(self, a); }
        if(M.Kp && M.Kp.thang===tp) return cuXem.apply(self, a);
        return KHO.nap(tp).then(function(K){ M.Kp = K && K.B ? K : null; }, function(){ M.Kp = null; }).then(function(){ M.dang = true; var kq; try{ kq = skXem.apply(self, a); } catch(er){ M.dang = false; throw er; }
          var het = function(){ M.dang = false; }; return Promise.resolve(kq).then(het, het); }); }
      return cuXem.apply(this, arguments); }; }
  if(typeof SK_NHOM!=='undefined' && !SK_NHOM.some(function(n){ return n.k===M.NHOM; })){ var ix = SK_NHOM.findIndex(function(n){ return n.k==='tt'; }); SK_NHOM.splice(ix<0 ? SK_NHOM.length : ix, 0, {k:M.NHOM, ten:'📋 Kết quả giao dịch'}); }
  var lay = function(k){ var b = null; SK_BC.forEach(function(x, j){ if(x.k===k){ b = x; SK_BC.splice(j, 1); } }); return b; };
  var bKQ = lay('kqgd'), bPDF = lay('kqgd31');
  SK_BC.push({k:'kq_hoi', ten:'Kết quả giao dịch theo Hội đoàn thể — điểm GD và toàn xã (mục 1, 6 giao ban)', nhom:M.NHOM, kho:'ngang', lap:function(){ return M.b1(); }});
  SK_BC.push({k:'kq_bd', ten:'Biến động so tháng trước theo Hội — khách hàng, dư nợ, tiền gửi, lãi tồn', nhom:M.NHOM, kho:'ngang', lap:function(){ return M.b2(); }});
  if(bKQ){ bKQ.nhom = M.NHOM; bKQ.ten = 'Kết quả giao dịch tại điểm GD — chi tiết từng tổ, mỗi điểm 1 trang'; SK_BC.push(bKQ); }
  if(bPDF){ bPDF.nhom = M.NHOM; SK_BC.push(bPDF); }
  if(typeof SK_TT_CAN!=='undefined') SK_TT_CAN.push('kq_hoi', 'kq_bd');
  return M;
})();
