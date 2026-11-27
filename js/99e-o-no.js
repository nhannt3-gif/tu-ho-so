/* ===== 3.570 (anh 28/11/2026: "tương tự em có ô Nợ quá hạn, nợ khoanh, nợ đến hạn" · "khuôn A4 ngang, cột cơ bản đến chi tiết" · "theo VB 180" ·
   "em gộp các bảng làm 1 lần"): ô Sao kê 🔴 NỢ QUÁ HẠN + 🟠 NỢ KHOANH — cùng khuôn ô KHĐ (js/99d), số liệu bộ máy DBT (js/99c, chỉ tiêu qh / kn).
   - Chỉ tiêu (CV 180/NHCS-KHTD + VB chỉ đạo UBND xã theo VB 180): tỷ lệ nợ quá hạn KHÔNG TĂNG so 31/12 năm trước và ≤ 0,08% tổng dư nợ (trần sửa được,
     D.cauHinh.qhCT.tran) · nợ khoanh GIẢM ÍT NHẤT 5% so 31/12 (D.cauHinh.knCT.pt), lộ trình quý chia đều như ô KHĐ.
   - Ô Quá hạn: B1 Tổng quan đối chiếu chỉ tiêu · B2 Diễn biến dư nợ QH theo tháng (▲▼) · B3 So sánh tháng trước theo Hội / Tổ trưởng · Sao kê nợ quá hạn ·
     Nợ chuyển quá hạn trong tháng (2 mục chuyển hẳn từ ô Nợ cần xử lý).
   - Ô Khoanh: B1 · B2 · B3 · B4 Món hết hạn khoanh trong 120 ngày tới (khuôn mục 3 giao ban) · Sao kê nợ khoanh (chuyển hẳn).
   - Ô Nợ đến hạn (có sẵn): thêm đầu ô "Kết quả thu nợ đến hạn tháng trước" — ƯỚC TÍNH từ 2 Mẫu 31 chốt tháng, chỉ tiêu ≥ 99% (D.cauHinh.dhCT.tl).
   Đơn vị triệu đồng (1 số lẻ), tỷ lệ % 2 số lẻ. Cắm rút: bỏ dòng <script> → 2 ô biến mất, sao kê về ô Nợ cần xử lý. Cần js/99c + js/99d. ES5. */
var ONO = (function(){
  var M = {};
  if(typeof DBT==='undefined' || typeof OKHD==='undefined' || !OKHD.gop || typeof SK_BC==='undefined') return M;
  var O = OKHD, tr = function(v){ return v==null ? '—' : (Math.round((v||0)/1e5)/10).toLocaleString('vi-VN', {minimumFractionDigits:1, maximumFractionDigits:1}); };
  var so = function(v){ return v==null ? '—' : (+v).toLocaleString('vi-VN'); }, pt = function(v){ return v==null ? '—' : v.toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2})+'%'; };
  var mau = function(v){ return v>0 ? ' style="color:#b42318"' : (v<0 ? ' style="color:#067647"' : ''); }, dtr = function(v){ return v==null ? '—' : (v>0 ? '+' : '')+tr(v); };
  M.ctQH = function(){ var c = D.cauHinh.qhCT || {}; return {tran:+c.tran>0 ? +c.tran : 0.08}; };
  M.ctKN = function(){ var c = D.cauHinh.knCT || {}; return {pt:(+c.pt>0 && +c.pt<100) ? +c.pt : 5}; };
  var khoaD = function(t){ return t.xa+'|'+t.khoaDiem; };
  /* tổng dư nợ (mẫu số tỷ lệ QH) của nhóm tổ trong 1 kỳ */
  M.dnNhom = function(k, f){ if(!O.coSo(k) || !k.s.dnTo) return null; var S = skCH(), r = 0;
    Object.keys(k.s.dnTo).forEach(function(m){ var t = k.s.to[m]; if(t && pvLoc(S, t) && f(t)) r += k.s.dnTo[m]; }); return r; };
  /* ---------- B1 ô Quá hạn ---------- */
  M.b1QH = function(){ var x = O.can('qh_tq', 'qh'); if(x.N.can) return x.N.can; var c = x.c, m = x.m, hang = O.hang(c), ct = M.ctQH();
    var g = [m.dau, m.truoc, m.hien].map(function(k){ return O.gop(k, khoaD); });
    var nam = +SK_K.thang.slice(0, 4)-1, cot = function(k, gi, f){ if(!O.coSo(k)) return null; var a = O.loc(gi, f) || {n:0, dn:0, lt:0}, td = M.dnNhom(k, f); return {n:a.n, dn:a.dn, lt:a.lt, tl:td ? a.dn/td*100 : 0}; };
    var th = '<tr><th rowspan="2">Stt</th><th rowspan="2">Đơn vị</th><th colspan="3">31/12/'+nam+'</th><th colspan="3">'+(m.truoc ? m.truoc.phu : 'Tháng trước')+'</th><th colspan="4">Hiện tại '+(m.hien ? m.hien.phu : '')+'</th>'+
      '<th>So tháng trước</th><th colspan="2">So 31/12</th><th rowspan="2">Chỉ tiêu tỷ lệ</th><th rowspan="2">Đánh giá</th></tr><tr><th>Món</th><th>Dư nợ QH</th><th>Tỷ lệ</th><th>Món</th><th>Dư nợ QH</th><th>Tỷ lệ</th>'+
      '<th>Món</th><th>Dư nợ QH</th><th>Tỷ lệ</th><th>Lãi tồn</th><th>± dư nợ</th><th>± dư nợ</th><th>± tỷ lệ</th></tr>';
    var aoa = [['Stt', 'Đơn vị', 'Món 31/12', 'Dư nợ QH 31/12', 'Tỷ lệ 31/12 (%)', 'Món tháng trước', 'Dư nợ QH tháng trước', 'Tỷ lệ tháng trước (%)', 'Món hiện tại', 'Dư nợ QH hiện tại', 'Tỷ lệ hiện tại (%)', 
      'Lãi tồn', '± dư nợ so tháng trước', '± dư nợ so 31/12', '± tỷ lệ so 31/12', 'Chỉ tiêu tỷ lệ (%)', 'Đánh giá']], stt = 0;
    var body = hang.map(function(d){ var a = cot(m.dau, g[0], d.f), b = cot(m.truoc, g[1], d.f), h = cot(m.hien, g[2], d.f);
      var chiTieu = a ? Math.min(a.tl, ct.tran) : ct.tran, dg = !h ? '—' : (h.tl<=chiTieu+1e-9 ? 'Đạt' : (a && h.tl>a.tl ? 'Chưa đạt (tăng so 31/12)' : 'Chưa đạt (vượt '+String(ct.tran).replace('.', ',')+'%)'));
      var dt = h && b ? h.dn-b.dn : null, d0 = h && a ? h.dn-a.dn : null, dl = h && a ? h.tl-a.tl : null;
      var r = [d.cap==='tong' ? '' : ++stt, d.nhan, a ? a.n : null, a ? a.dn : null, a ? a.tl : null, b ? b.n : null, b ? b.dn : null, b ? b.tl : null, h ? h.n : null, h ? h.dn : null, h ? h.tl : null, h ? h.lt : null, dt, d0, dl, chiTieu, dg]; aoa.push(r);
      return '<tr'+O.lopDong(d.cap)+'><td class="c">'+(r[0]||'')+'</td>'+O.oTen(d)+'<td class="s">'+so(r[2])+'</td><td class="s">'+tr(r[3])+'</td><td class="s">'+pt(r[4])+'</td><td class="s">'+so(r[5])+'</td><td class="s">'+tr(r[6])+'</td><td class="s">'+pt(r[7])+'</td>'+
        '<td class="s"><b>'+so(r[8])+'</b></td><td class="s"><b>'+tr(r[9])+'</b></td><td class="s"><b>'+pt(r[10])+'</b></td><td class="s">'+tr(r[11])+'</td><td class="s"'+mau(dt)+'>'+dtr(dt)+'</td><td class="s"'+mau(d0)+'>'+dtr(d0)+'</td>'+
        '<td class="s"'+mau(dl)+'>'+(dl==null ? '—' : (dl>0 ? '+' : '')+pt(dl))+'</td><td class="s">≤ '+pt(chiTieu)+'</td><td'+(dg==='Đạt' ? ' style="color:#067647;font-weight:600"' : (dg==='—' ? '' : ' style="color:#b42318"'))+'>'+dg+'</td></tr>'; }).join('');
    return {ten:'QH tong quan', tieuDe:'NỢ QUÁ HẠN — ĐỐI CHIẾU CHỈ TIÊU VB 180', ngay:m.hien ? 'Đến ngày '+m.hien.phu : x.N.ngay,
      html:'<div class="bc-tom">'+O.dauTom(m).replace(/ · Chỉ tiêu: giảm.*?\(CV 180\/NHCS-KHTD\)/, ' · Chỉ tiêu: tỷ lệ QH không tăng so 31/12 và ≤ '+String(ct.tran).replace('.', ',')+'% (CV 180)').replace(/ · PGD: ≤ [^·]*món \(phụ lục tỉnh\)/, '')+'</div>'+
        '<table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table><div class="bc-ghi">Tỷ lệ = dư nợ quá hạn / tổng dư nợ của đơn vị (Mẫu 31 cùng kỳ). Chỉ tiêu từng đơn vị = min(tỷ lệ 31/12, trần).</div>', aoa:aoa}; };
  /* ---------- B1 ô Khoanh ---------- */
  M.b1KN = function(){ var x = O.can('kn_tq', 'kn'); if(x.N.can) return x.N.can; var c = x.c, m = x.m, hang = O.hang(c), ct = M.ctKN();
    var g = [m.dau, m.truoc, m.hien].map(function(k){ return O.gop(k, khoaD); }), nam = +SK_K.thang.slice(0, 4)-1;
    var cot = function(k, gi, f){ if(!O.coSo(k)) return null; return O.loc(gi, f) || {n:0, dn:0, lt:0}; };
    var ngay = m.hien ? (m.hien.e.ngay || tdnCuoiKy(m.hien.ky)) : '', q = ngay ? Math.min(4, Math.max(1, Math.ceil(+ngay.slice(5, 7)/3))) : 4;
    var th = '<tr><th rowspan="2">Stt</th><th rowspan="2">Đơn vị</th><th colspan="2">31/12/'+nam+'</th><th colspan="2">'+(m.truoc ? m.truoc.phu : 'Tháng trước')+'</th><th colspan="3">Hiện tại '+(m.hien ? m.hien.phu : '')+'</th>'+
      '<th>So tháng trước</th><th colspan="2">So 31/12</th><th>Chỉ tiêu năm</th><th>Chỉ tiêu đến quý</th><th rowspan="2">Đánh giá</th></tr><tr><th>Món</th><th>Dư nợ</th><th>Món</th><th>Dư nợ</th><th>Món</th><th>Dư nợ</th><th>Lãi tồn</th>'+
      '<th>± dư nợ</th><th>± dư nợ</th><th>%</th><th>≤ dư nợ</th><th>≤ dư nợ</th></tr>';
    var aoa = [['Stt', 'Đơn vị', 'Món 31/12', 'Dư nợ khoanh 31/12', 'Món tháng trước', 'Dư nợ tháng trước', 'Món hiện tại', 'Dư nợ hiện tại', 'Lãi tồn', '± dư nợ so tháng trước', '± dư nợ so 31/12', '% so 31/12', 'Chỉ tiêu năm (≤ dư nợ)', 'Chỉ tiêu đến quý (≤ dư nợ)', 'Đánh giá']], stt = 0;
    var body = hang.map(function(d){ var a = cot(m.dau, g[0], d.f), b = cot(m.truoc, g[1], d.f), h = cot(m.hien, g[2], d.f);
      var cn = a ? Math.round(a.dn*(1-ct.pt/100)) : null, cq = a ? Math.round(a.dn*(1-ct.pt/100*q/4)) : null, dt = h && b ? h.dn-b.dn : null, d0 = h && a ? h.dn-a.dn : null, pc = h && a && a.dn ? Math.round((h.dn-a.dn)/a.dn*1000)/10 : null;
      var dg = !h || !a ? '—' : (!a.dn && !h.dn ? 'Không có nợ khoanh' : (h.dn<=cq ? 'Đạt' : 'Tiếp tục phấn đấu (còn thu '+tr(h.dn-cq)+' tr.đ)'));
      var r = [d.cap==='tong' ? '' : ++stt, d.nhan, a ? a.n : null, a ? a.dn : null, b ? b.n : null, b ? b.dn : null, h ? h.n : null, h ? h.dn : null, h ? h.lt : null, dt, d0, pc, cn, cq, dg]; aoa.push(r);
      return '<tr'+O.lopDong(d.cap)+'><td class="c">'+(r[0]||'')+'</td>'+O.oTen(d)+'<td class="s">'+so(r[2])+'</td><td class="s">'+tr(r[3])+'</td><td class="s">'+so(r[4])+'</td><td class="s">'+tr(r[5])+'</td>'+
        '<td class="s"><b>'+so(r[6])+'</b></td><td class="s"><b>'+tr(r[7])+'</b></td><td class="s">'+tr(r[8])+'</td><td class="s"'+mau(dt)+'>'+dtr(dt)+'</td><td class="s"'+mau(d0)+'>'+dtr(d0)+'</td>'+
        '<td class="s"'+mau(pc)+'>'+(pc==null ? '—' : (pc>0 ? '+' : '')+String(pc).replace('.', ',')+'%')+'</td><td class="s">'+tr(cn)+'</td><td class="s">'+(cq==null ? '—' : tr(cq)+' <small>('+['31/3', '30/6', '30/9', '31/12'][q-1]+')</small>')+'</td>'+
        '<td'+(dg==='Đạt' ? ' style="color:#067647;font-weight:600"' : (/^Tiếp/.test(dg) ? ' style="color:#b42318"' : ''))+'>'+dg+'</td></tr>'; }).join('');
    return {ten:'KN tong quan', tieuDe:'NỢ KHOANH — ĐỐI CHIẾU CHỈ TIÊU VB 180', ngay:m.hien ? 'Đến ngày '+m.hien.phu : x.N.ngay,
      html:'<div class="bc-tom">'+O.dauTom(m).replace(/ · Chỉ tiêu: giảm.*?\(CV 180\/NHCS-KHTD\)/, ' · Chỉ tiêu: nợ khoanh giảm ≥ '+ct.pt+'% so 31/12 (CV 180)').replace(/ · PGD: ≤ [^·]*món \(phụ lục tỉnh\)/, '')+'</div>'+
        '<table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table><div class="bc-ghi">Đánh giá theo chỉ tiêu đến mốc quý gần nhất (lộ trình giảm đều theo quý).</div>', aoa:aoa}; };
  /* ---------- B4 ô Khoanh: hết hạn khoanh trong 120 ngày tới (khuôn mục 3 giao ban) ---------- */
  M.b4KN = function(){ var x = O.can('kn_hh', 'kn'); if(x.N.can) return x.N.can; var m = x.m, B = DBT.hienB, K = DBT.hienK;
    if(!m.hien || !B || !K || B.hsTen!=='Mẫu 31') return {ten:'KN het han', tieuDe:'NỢ KHOANH HẾT HẠN KHOANH TRONG 120 NGÀY TỚI', ngay:x.N.ngay, aoa:[['Cần Mẫu 31 hiện tại']], html:'<div class="bc-rong">Cần Mẫu 31 hiện tại.</div>'};
    var ngay = m.hien.e.ngay || tdnCuoiKy(m.hien.ky), d120 = new Date(ngay); d120.setDate(d120.getDate()+120); var toi = d120.toISOString().slice(0, 10);
    var da = {}, ds = []; (kcGoc(B) || []).forEach(function(o){ if(!o.ku || da[o.ku] || !((o.kn||0)>0)) return; da[o.ku] = 1; var h = o.nhh || ''; if(!h || h<ngay || h>toi) return;
      var t = KHO.toKy(K, toMaCua(o)) || {}; if(!pvLoc(skCH(), t)) return; ds.push({o:o, t:t, h:h}); });
    ds.sort(function(a, b){ return a.h<b.h ? -1 : (a.h>b.h ? 1 : 0); });
    var th = '<tr><th>Stt</th><th>Xã · Điểm GD</th><th>Hội</th><th>Tổ trưởng</th><th>Khách hàng</th><th>Ấp</th><th>Chương trình</th><th>Dư nợ khoanh</th><th>Ngày hết hạn</th><th>Lãi tồn</th><th>GD gần nhất</th></tr>';
    var aoa = [['Stt', 'Xã · Điểm GD', 'Hội', 'Tổ trưởng', 'Khách hàng', 'Ấp', 'Chương trình', 'Dư nợ khoanh (đồng)', 'Ngày hết hạn', 'Lãi tồn (đồng)', 'GD gần nhất']], tong = 0;
    var body = ds.map(function(z, i){ var o = z.o, t = z.t; tong += o.kn||0; var dm = (t.tenXa||'')+' · '+String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, '');
      var r = [i+1, dm, {'11':'HND', '12':'HPN', '13':'HCCB', '14':'ĐTN', '99':'TT'}[String(t.dv||'')] || '', t.ten||'', o.ten||'', o.tenThon || t.tenThon || '', ctNgan(o.ct, o), o.kn||0, ngayVNsl(z.h), laiTon(o), o.ngdg ? ngayVNsl(o.ngdg) : '']; aoa.push(r);
      return '<tr><td class="c">'+r[0]+'</td><td>'+coChuHTML(dm)+'</td><td class="c">'+r[2]+'</td><td>'+coChuHTML(r[3])+'</td><td>'+coChuHTML(r[4])+'</td><td>'+coChuHTML(r[5])+'</td><td class="c">'+coChuHTML(r[6])+'</td><td class="s">'+tr(r[7])+'</td><td class="c"><b>'+r[8]+'</b></td><td class="s">'+tr(r[9])+'</td><td class="c">'+r[10]+'</td></tr>'; }).join('');
    if(!ds.length) body = '<tr><td colspan="11" class="c">Không có món hết hạn khoanh trong 120 ngày tới.</td></tr>'; else { body += '<tr class="tong"><td></td><td colspan="6">Tổng cộng: '+ds.length+' món</td><td class="s">'+tr(tong)+'</td><td colspan="3"></td></tr>'; aoa.push(['', 'Tổng cộng: '+ds.length+' món', '', '', '', '', '', tong]); }
    return {ten:'KN het han', tieuDe:'NỢ KHOANH HẾT HẠN KHOANH TRONG 120 NGÀY TỚI', ngay:'Theo Mẫu 31 ngày '+m.hien.phu,
      html:'<div class="bc-tom">'+ds.length+' món / '+tr(tong)+' triệu đồng hết hạn khoanh từ '+m.hien.phu+' đến '+ngayVNsl(toi)+' — Hội, Tổ trưởng phối hợp kiểm tra khả năng trả nợ trước ngày hết hạn (CV 368/NHCS-QLN).</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  /* ---------- ô Nợ đến hạn: B1 kết quả thu nợ đến hạn tháng trước (anh 28/11 "nợ đến hạn" — chỉ tiêu CV 180: thu nợ gốc đến hạn ≥ 99%) ----------
     ƯỚC TÍNH từ 2 Mẫu 31 chốt tháng liên tiếp (T−1, T): món đến hạn trong tháng T theo Mẫu 31 T−1 (ngày ĐH theo GDXA / gia hạn / gốc), không quá hạn, không khoanh;
     số tiền đến hạn = dư nợ món lúc T−1 (chỉ món đến hạn cuối — kỳ trả dần không tách được) · tại T: hết dư nợ = đã thu · có QH = chuyển QH · ngày ĐH gia hạn lùi = gia hạn ·
     còn lại = chưa thu hết. Tỷ lệ thu = đã thu / (đến hạn − gia hạn). */
  M.dhCT = function(){ var c = D.cauHinh.dhCT || {}; return {tl:+c.tl>0 ? +c.tl : 99}; };
  M.dhKy = function(){ var th = KHO.dsBang('hstd').filter(function(e){ return e && e.ky && e.ky.length===7; }).map(function(e){ return e.ky; }).sort();
    var m = th.filter(function(k){ return k<=SK_K.thang; }).pop(); if(!m) return null; var p = kyLui(m, -1); return th.indexOf(p)>=0 ? {p:p, m:m} : null; };
  M.dhNap = function(){ var k = M.dhKy(); if(!k) return Promise.resolve(M.dh = null); if(M.dh && M.dh.m===k.m) return Promise.resolve(M.dh);
    var r = {p:k.p, m:k.m}; return KHO.bo(k.p).then(function(B){ r.Bp = B; return KHO.nap(k.p); }).then(function(K){ r.Kp = K; return KHO.bo(k.m); }).then(function(B){ r.Bm = B; M.dh = r; return r; }); };
  M.dhTinh = function(r){ var mon = {}, ra = []; (kcGoc(r.Bm) || []).forEach(function(o){ if(o.ku && !mon[o.ku]) mon[o.ku] = o; });
    var da = {}, S = skCH(); (kcGoc(r.Bp) || []).forEach(function(o){ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; if(!((o.dn||0)>0) || (o.qh||0)>0 || (o.kn||0)>0) return;
      var han = o.dhgd || o.dhgh || o.dhg || ''; if(String(han).slice(0, 7)!==r.m) return; var t = KHO.toKy(r.Kp, toMaCua(o)) || {}; if(!pvLoc(S, t)) return;
      var o2 = mon[o.ku], dn = Math.round(o.dn), con = o2 ? Math.round(o2.dn||0) : 0, kq = 'thu';
      if(con>0){ if((o2.qh||0)>0) kq = 'qh'; else if((o2.dhgh || '')>(o.dhgh || o.dhg || '') && (o2.dhgh || '')>tdnCuoiKy(r.m)) kq = 'gh'; else kq = 'con'; }
      ra.push({o:o, t:t, dn:dn, thu:dn-con, con:con, kq:kq}); });
    return ra; };
  M.b1DH = function(){ var N = skNen31('dh_kq'); if(N.can) return N.can; var r = M.dh;
    if(!r) return {ten:'DH ket qua', tieuDe:'KẾT QUẢ THU NỢ ĐẾN HẠN', ngay:N.ngay, aoa:[['Cần Mẫu 31 chốt 2 tháng liên tiếp']], html:'<div class="bc-rong">Cần Mẫu 31 chốt 2 tháng liên tiếp (tháng trước và tháng đang xem) để tính kết quả thu nợ đến hạn.</div>'};
    var ds = M.dhTinh(r), ct = M.dhCT(), H = {};
    ds.forEach(function(z){ var t = z.t; H[t.xa+'|'+t.khoaDiem] = {xa:t.xa, tenXa:t.tenXa||'', diem:t.khoaDiem, tenDiem:String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, '')}; });
    var keys = Object.keys(H).sort(function(a, b){ return (H[a].tenXa).localeCompare(H[b].tenXa, 'vi') || (H[a].tenDiem).localeCompare(H[b].tenDiem, 'vi'); }), hang = [{cap:'tong', nhan:'TOÀN PGD', f:function(){ return true; }}], xa = [];
    keys.forEach(function(k){ if(xa.indexOf(H[k].xa)<0) xa.push(H[k].xa); });
    xa.forEach(function(X){ var kd = keys.filter(function(k){ return H[k].xa===X; }); hang.push({cap:'xa', nhan:'Xã '+H[kd[0]].tenXa.replace(/^(Xã|Phường|Thị trấn)\s+/i, ''), f:function(t){ return t.xa===X; }});
      kd.forEach(function(k){ var Dm = H[k].diem; hang.push({cap:'diem', nhan:'Điểm GD '+(H[k].tenDiem || '(chưa rõ)'), f:function(t){ return t.xa===X && t.khoaDiem===Dm; }}); }); });
    var th = '<tr><th rowspan="2">Stt</th><th rowspan="2">Đơn vị</th><th colspan="2">Đến hạn '+kyVN(r.m)+'</th><th colspan="2">Đã thu</th><th colspan="2">Gia hạn</th><th colspan="2">Chuyển quá hạn</th><th colspan="2">Chưa thu hết</th><th rowspan="2">Tỷ lệ thu</th><th rowspan="2">Chỉ tiêu</th><th rowspan="2">Đánh giá</th></tr>'+
      '<tr><th>Món</th><th>Số tiền</th><th>Món</th><th>Số tiền</th><th>Món</th><th>Số tiền</th><th>Món</th><th>Số tiền</th><th>Món</th><th>Số tiền</th></tr>';
    var aoa = [['Stt', 'Đơn vị', 'Món đến hạn', 'Số tiền đến hạn', 'Món đã thu', 'Số tiền đã thu', 'Món gia hạn', 'Số tiền gia hạn', 'Món chuyển QH', 'Số tiền chuyển QH', 'Món chưa thu hết', 'Số tiền chưa thu', 'Tỷ lệ thu (%)', 'Chỉ tiêu (%)', 'Đánh giá']], stt = 0;
    var body = hang.map(function(d){ var z = ds.filter(function(w){ return d.f(w.t); }), dem = function(k){ return z.filter(function(w){ return w.kq===k; }); }, tg = function(a, f){ return a.reduce(function(s, w){ return s+f(w); }, 0); };
      var den = tg(z, function(w){ return w.dn; }), thu = tg(z, function(w){ return w.thu; }), gh = dem('gh'), qh = dem('qh'), cn = dem('con'), ghT = tg(gh, function(w){ return w.con; }), mau2 = den-ghT, tl = mau2>0 ? thu/mau2*100 : null;
      var dg = tl==null ? '—' : (tl>=ct.tl-1e-9 ? 'Đạt' : 'Chưa đạt'), nThu = z.filter(function(w){ return w.thu>0 && w.kq==='thu'; }).length;
      var rr = [d.cap==='tong' ? '' : ++stt, d.nhan, z.length, den, nThu, thu, gh.length, ghT, qh.length, tg(qh, function(w){ return w.con; }), cn.length, tg(cn, function(w){ return w.con; }), tl, ct.tl, dg]; aoa.push(rr);
      return '<tr'+O.lopDong(d.cap)+'><td class="c">'+(rr[0]||'')+'</td>'+O.oTen(d)+[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function(i){ return '<td class="s">'+(i%2 ? tr(rr[i]) : so(rr[i]))+'</td>'; }).join('')+
        '<td class="s"><b>'+(tl==null ? '—' : pt(tl))+'</b></td><td class="s">≥ '+ct.tl+'%</td><td'+(dg==='Đạt' ? ' style="color:#067647;font-weight:600"' : (dg==='—' ? '' : ' style="color:#b42318"'))+'>'+dg+'</td></tr>'; }).join('');
    return {ten:'DH ket qua', tieuDe:'KẾT QUẢ THU NỢ ĐẾN HẠN THÁNG '+kyVN(r.m)+' — ĐỐI CHIẾU CHỈ TIÊU VB 180', ngay:'Mẫu 31 '+kyVN(r.p)+' và '+kyVN(r.m),
      html:'<div class="bc-tom"><b>Ước tính</b> từ Mẫu 31 chốt '+kyVN(r.p)+' và '+kyVN(r.m)+': món đến hạn trong tháng '+kyVN(r.m)+' (ngày ĐH theo GDXA / gia hạn / gốc), số tiền = dư nợ món tháng trước (chỉ món đến hạn cuối; kỳ trả dần chưa tách) · '+
        'tỷ lệ thu = đã thu / (đến hạn − gia hạn) · chỉ tiêu CV 180: thu nợ gốc đến hạn ≥ '+ct.tl+'% · đơn vị: món, triệu đồng — đối chiếu báo cáo hệ thống trước khi dùng chính thức.</div>'+
        '<table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  if(typeof skXem==='function'){ var cuXem = skXem; skXem = function(){ var C = skCH(), self = this, a = arguments;
      if(C.bc && C.bc.dh_kq && !M.dhDang && SK_K && SK_K.thang) return M.dhNap().then(function(){ M.dhDang = true; try{ return skXem.apply(self, a); } finally { M.dhDang = false; } }, function(er){ baoLoi('Thu nợ đến hạn: không đọc được Mẫu 31 — '+(er && er.message || er)); });
      return cuXem.apply(this, arguments); }; }
  /* ---------- gắn vào Sao kê ---------- */
  var QH = {ma2:'qh_db', ma3:'qh_ss', chi:'qh', ten:'NỢ QUÁ HẠN', ma:'QH', tien:1, ra:'đã thu hết nợ quá hạn (hoặc xử lý)', moi:'mới chuyển quá hạn', don:'Dư nợ quá hạn'};
  var KN = {ma2:'kn_db', ma3:'kn_ss', chi:'kn', ten:'NỢ KHOANH', ma:'KN', tien:1, ra:'đã thu hết / xóa nợ khoanh', moi:'mới khoanh', don:'Dư nợ khoanh'};
  var lay = function(k){ var b = null; SK_BC.forEach(function(x, j){ if(x.k===k){ b = x; SK_BC.splice(j, 1); } }); return b; };
  var themNhom = function(k, ten, sau){ if(SK_NHOM.some(function(n){ return n.k===k; })) return; var ix = SK_NHOM.findIndex(function(n){ return n.k===sau; }); SK_NHOM.splice(ix+1, 0, {k:k, ten:ten}); };
  var dang = function(nhom, ds){ ds.forEach(function(b){ if(!b) return; if(b.lap0){ SK_BC.push({k:b.k, ten:b.ten, nhom:nhom, kho:'ngang', lap:b.lap0, tuyChon:b.tuyChon}); DBT.dangKyBC(b.k, b.chi); } else { b.nhom = nhom; SK_BC.push(b); } }); };
  themNhom('qh3', '🔴 Nợ quá hạn', 'khd3'); themNhom('kn3', '🟠 Nợ khoanh', 'qh3');
  var sQH = lay('qh'), sCQH = lay('cqh'), sKN = lay('kh');
  if(sQH) sQH.ten = 'Sao kê danh sách nợ quá hạn'; if(sKN) sKN.ten = 'Sao kê danh sách nợ khoanh';
  dang('qh3', [{k:'qh_tq', ten:'Tổng quan — đối chiếu chỉ tiêu VB 180 (tỷ lệ nợ quá hạn)', chi:'qh', lap0:function(){ return M.b1QH(); }, tuyChon:function(){ return M.suaQH(); }}, {k:'qh_db', ten:'Diễn biến dư nợ quá hạn từng tháng (▲▼)', chi:'qh', lap0:function(){ return O.b2(QH); }},
    {k:'qh_ss', ten:'So sánh tháng trước theo Hội, tổ trưởng', chi:'qh', lap0:function(){ return O.b3(QH); }}, sQH, sCQH]);
  dang('kn3', [{k:'kn_tq', ten:'Tổng quan — đối chiếu chỉ tiêu VB 180 (giảm nợ khoanh)', chi:'kn', lap0:function(){ return M.b1KN(); }, tuyChon:function(){ return M.suaKN(); }}, {k:'kn_db', ten:'Diễn biến dư nợ khoanh từng tháng (▲▼)', chi:'kn', lap0:function(){ return O.b2(KN); }},
    {k:'kn_ss', ten:'So sánh tháng trước theo Hội, tổ trưởng', chi:'kn', lap0:function(){ return O.b3(KN); }}, {k:'kn_hh', ten:'Món hết hạn khoanh trong 120 ngày tới', chi:'kn', lap0:function(){ return M.b4KN(); }}, sKN]);
  (function(){ var ix = SK_BC.findIndex(function(x){ return x.nhom==='dh'; }), x = {k:'dh_kq', ten:'Kết quả thu nợ đến hạn tháng trước — đối chiếu chỉ tiêu VB 180 (≥ 99%)', nhom:'dh', kho:'ngang', lap:function(){ return M.b1DH(); }, tuyChon:function(){ return M.suaDH(); }};
    if(ix>=0) SK_BC.splice(ix, 0, x); else SK_BC.push(x); })();
  M.suaQH = function(){ return '<span class="sk-ngay" title="CV 180: tỷ lệ QH không tăng so 31/12, ≤ 0,08%">Trần tỷ lệ QH <input type="number" step="0.01" min="0.01" value="'+M.ctQH().tran+'" style="width:58px" data-lenh="ono.tran" data-su="change">%</span>'; };
  M.suaKN = function(){ return '<span class="sk-ngay" title="CV 180: nợ khoanh giảm ít nhất 5%">Chỉ tiêu giảm <input type="number" min="1" max="99" value="'+M.ctKN().pt+'" style="width:48px" data-lenh="ono.pt" data-su="change">%</span>'; };
  M.suaDH = function(){ return '<span class="sk-ngay" title="CV 180: thu nợ gốc đến hạn ≥ 99%">Chỉ tiêu thu ≥ <input type="number" min="1" max="100" value="'+M.dhCT().tl+'" style="width:48px" data-lenh="ono.tl" data-su="change">%</span>'; };
  M.doi = function(k, f, v){ var c = D.cauHinh[k] = D.cauHinh[k] || {}; c[f] = v==='' ? '' : +v; luu(); if(typeof skXemHen==='function') skXemHen(); };
  if(typeof gdDangKy==='function') gdDangKy('ono', {tran:function(el){ M.doi('qhCT', 'tran', el.value); }, pt:function(el){ M.doi('knCT', 'pt', el.value); }, tl:function(el){ M.doi('dhCT', 'tl', el.value); }});
  return M;
})();
