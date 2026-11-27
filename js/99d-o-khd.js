/* ===== 3.570 (anh 28/11/2026: "diễn biến món vay 3 tháng anh chưa vừa ý, cần đơn giản theo xã, điểm GD biến động từ đầu năm qua các tháng" · "có mũi tên hay màu
   để biết tăng giảm, riêng hiện tại thì so kỹ chút, rà VB 180 xem KH của tỉnh và đối chiếu" · "chia 1 ô như vậy là được" · "bỏ luôn bên nợ cần xử lý" ·
   "khuôn A4 ngang, các cột cơ bản đến chi tiết, cho vừa trang, tham khảo các báo cáo chuẩn hiện có" · "theo VB 180, em cứ làm theo em thấy tốt nhất"):
   📉 Ô "MÓN VAY 3 THÁNG KHĐ" ở Sao kê =====
   - Khuôn theo "Nội dung họp giao ban" PGD (mục 4 + đối chiếu chỉ tiêu KH 1166 / VB 180): đơn vị món, triệu đồng (1 số lẻ), A4 ngang.
   - CHỈ TIÊU (CV 180/NHCS-KHTD 10/02/2026 + VB chỉ đạo UBND xã theo VB 180): món vay 3 tháng KHĐ GIẢM ÍT NHẤT 30% so 31/12 năm trước; lộ trình quý chia đều
     như phụ lục tỉnh (31/3 −7,5% · 30/6 −15% · 30/9 −22,5% · 31/12 −30%). Mức % và số chỉ tiêu PGD (phụ lục tỉnh) sửa được: D.cauHinh.khdCT = {pt, pgd}.
   - B1 Tổng quan đối chiếu chỉ tiêu (Toàn PGD › Xã › Điểm GD) · B2 Diễn biến từng tháng (▲ đỏ tăng / ▼ xanh giảm) · B3 So sánh tháng trước theo Hội / Tổ trưởng ·
     B4 Sao kê danh sách món (js/76, chuyển hẳn từ ô Nợ cần xử lý) · B5 Món chậm nộp lãi, có nguy cơ thành KHĐ trong 2 tháng tới (luật KHĐ 3.563 áp cho ngày tương lai).
   - Số liệu: KHĐ tự tính từ Mẫu 31 từng kỳ qua bộ máy DBT (js/99c, sổ theo dõi trên máy). Tháng chưa nạp Mẫu 31 → "—".
   Cắm rút: bỏ dòng <script> → ô biến mất, sao kê KHĐ về lại ô Nợ cần xử lý. Cần js/99c. ES5. */
var OKHD = (function(){
  var M = {NHOM:'khd3'};
  if(typeof DBT==='undefined' || typeof SK_BC==='undefined') return M;
  M.ct = function(){ var c = D.cauHinh.khdCT = D.cauHinh.khdCT || {}; return {pt:(+c.pt>0 && +c.pt<100) ? +c.pt : 30, pgd:+c.pgd>0 ? +c.pgd : 0}; };
  var tr = function(v){ return v==null || v==='' ? '—' : (Math.round((v||0)/1e5)/10).toLocaleString('vi-VN', {minimumFractionDigits:1, maximumFractionDigits:1}); };
  var so = function(v){ return v==null || v==='' ? '—' : (+v).toLocaleString('vi-VN'); };
  var dau = function(v){ return v>0 ? '+'+so(v) : so(v); };
  var mau = function(v){ return v>0 ? ' style="color:#b42318"' : (v<0 ? ' style="color:#067647"' : ''); };
  var ten3 = function(dv){ return {'11':'HND', '12':'HPN', '13':'HCCB', '14':'ĐTN', '99':'TT'}[dv] || dv || '—'; };
  /* ---------- dữ liệu chung: các cột kỳ + gộp theo khóa ---------- */
  M.cot = function(chi){ chi = chi || 'khd'; var c = DBT.kyNam(SK_K.thang.slice(0, 4));   /* 3.570: dùng chung cho ô Quá hạn / Khoanh (js/99e) */
    c.forEach(function(k){ k.s = k.e ? DBT.S[DBT.khoa(chi, k.e)] || null : null; }); return c; };
  M.coSo = function(k){ return !!(k && k.s && !k.s.khong && k.s.ku); };
  /* gộp 1 kỳ theo hàm khóa(tổ) → {khóa: {n, dn, lt, ku:{}}} (lọc phạm vi Sao kê trên tổ của kỳ) */
  M.gop = function(k, khoa){ if(!M.coSo(k)) return null; var S = skCH(), g = {};
    Object.keys(k.s.ku).forEach(function(u){ var x = k.s.ku[u], t = k.s.to[x[0]] || {xa:'', tenXa:'', khoaDiem:'', tenDiem:'', dv:'', ma:x[0], ten:''}; if(!pvLoc(S, t)) return;
      var kk = khoa(t), a = g[kk] = g[kk] || {n:0, dn:0, lt:0, ku:{}, t:t}; a.n++; a.dn += x[1]||0; a.lt += x[2]||0; a.ku[u] = x; });
    return g; };
  M.tong = function(g){ if(!g) return null; var r = {n:0, dn:0, lt:0, ku:{}}; Object.keys(g).forEach(function(k){ var a = g[k]; r.n += a.n; r.dn += a.dn; r.lt += a.lt; for(var u in a.ku) r.ku[u] = a.ku[u]; }); return r; };
  M.loc = function(g, f){ if(!g) return null; var r = {}; Object.keys(g).forEach(function(k){ if(f(g[k].t)) r[k] = g[k]; }); return M.tong(r); };
  M.moc = function(c){ var hien = c.find(function(k){ return k.hien; }), dau = c[0], th = hien ? slThang(hien.e.ngay || hien.ky) : '';
    var truoc = c.filter(function(k){ return !k.hien && !k.dau && M.coSo(k) && k.ky<th; }).pop() || (M.coSo(dau) && dau.ky<th ? dau : null);
    return {hien:hien, dau:dau, truoc:truoc, th:th}; };
  /* hàng Xã › Điểm theo hợp các kỳ (tên theo kỳ mới nhất có) */
  M.hang = function(c){ var H = {};
    c.forEach(function(k){ var g = M.gop(k, function(t){ return t.xa+'|'+t.khoaDiem; }); if(!g) return;
      Object.keys(g).forEach(function(x){ var t = g[x].t; if(!H[x] || k.hien) H[x] = {xa:t.xa, tenXa:t.tenXa, diem:t.khoaDiem, tenDiem:t.tenDiem}; }); });
    var keys = Object.keys(H).sort(function(a, b){ var x = H[a], y = H[b]; return (x.tenXa||'').localeCompare(y.tenXa||'', 'vi') || (x.tenDiem||'').localeCompare(y.tenDiem||'', 'vi'); });
    var ds = [{cap:'tong', nhan:'TOÀN PGD', f:function(){ return true; }}], xa = [];
    keys.forEach(function(x){ if(xa.indexOf(H[x].xa)<0) xa.push(H[x].xa); });
    xa.forEach(function(X){ var kd = keys.filter(function(x){ return H[x].xa===X; }), tx = (H[kd[0]].tenXa || '(chưa rõ xã)').replace(/^(Xã|Phường|Thị trấn)\s+/i, '');
      ds.push({cap:'xa', nhan:'Xã '+tx, f:function(t){ return t.xa===X; }});
      kd.forEach(function(x){ var Dm = H[x].diem; ds.push({cap:'diem', nhan:'Điểm GD '+(H[x].tenDiem || '(chưa rõ)'), f:function(t){ return t.xa===X && t.khoaDiem===Dm; }}); }); });
    return ds; };
  M.lopDong = function(cap){ return cap==='tong' ? ' class="tong"' : (cap==='xa' ? ' class="nhom"' : ''); };
  M.oTen = function(d){ return '<td'+(d.cap==='diem' ? ' style="padding-left:14px"' : '')+'>'+coChuHTML(d.nhan)+'</td>'; };
  M.can = function(ma, chi){ var N = skNen31(ma); if(N.can) return {N:N}; var c = M.cot(chi); return {N:N, c:c, m:M.moc(c)}; };
  M.dauTom = function(m){ var ct = M.ct(); return 'Tính từ Mẫu 31 từng kỳ (luật 3.563) · Hiện tại = '+(m.hien ? '<b>Mẫu 31 ngày '+m.hien.phu+'</b>' : 'chưa có')+
    ' · Tháng trước = '+(m.truoc ? m.truoc.phu : '—')+' · Chỉ tiêu: giảm ≥ '+ct.pt+'% so 31/12 (CV 180/NHCS-KHTD)'+(ct.pgd ? ' · PGD: ≤ '+so(ct.pgd)+' món (phụ lục tỉnh)' : '')+' · đơn vị: món, triệu đồng'; };
  /* ---------- B1 Tổng quan đối chiếu chỉ tiêu ---------- */
  M.chiTieu = function(n0, ngay, laPGD){ var ct = M.ct(); if(n0==null) return null;
    var q = Math.min(4, Math.max(1, Math.ceil(+String(ngay).slice(5, 7)/3))), nam = laPGD && ct.pgd ? ct.pgd : Math.floor(n0*(1-ct.pt/100));
    var quy = laPGD && ct.pgd ? Math.floor(n0-(n0-ct.pgd)*q/4) : Math.floor(n0*(1-ct.pt/100*q/4));
    return {nam:nam, quy:quy, moc:['31/3', '30/6', '30/9', '31/12'][q-1]}; };
  M.b1 = function(){ var x = M.can('khd_tq'); if(x.N.can) return x.N.can; var c = x.c, m = x.m, hang = M.hang(c);
    var K = function(k){ return M.gop(k, function(t){ return t.xa+'|'+t.khoaDiem; }); }, g0 = K(m.dau), g1 = K(m.truoc), g2 = K(m.hien);
    var th = '<tr><th rowspan="2">Stt</th><th rowspan="2">Đơn vị</th><th colspan="2">31/12/'+(+SK_K.thang.slice(0, 4)-1)+'</th><th colspan="2">'+(m.truoc ? m.truoc.phu : 'Tháng trước')+'</th><th colspan="3">Hiện tại '+(m.hien ? m.hien.phu : '')+'</th>'+
      '<th>So tháng trước</th><th colspan="2">So 31/12</th><th>Chỉ tiêu năm</th><th>Chỉ tiêu đến quý</th><th rowspan="2">Đánh giá</th></tr>'+
      '<tr><th>Món</th><th>Dư nợ</th><th>Món</th><th>Dư nợ</th><th>Món</th><th>Dư nợ</th><th>Lãi tồn</th><th>± món</th><th>± món</th><th>%</th><th>≤ món</th><th>≤ món</th></tr>';
    var aoa = [['Stt', 'Đơn vị', 'Món 31/12', 'Dư nợ 31/12', 'Món tháng trước', 'Dư nợ tháng trước', 'Món hiện tại', 'Dư nợ hiện tại', 'Lãi tồn', '± so tháng trước', '± so 31/12', '% so 31/12', 'Chỉ tiêu năm', 'Chỉ tiêu đến quý', 'Đánh giá']];
    var stt = 0, body = hang.map(function(d){ var a = M.loc(g0, d.f), b = M.loc(g1, d.f), h = M.loc(g2, d.f), n0 = a ? a.n : null;
      var ct = M.chiTieu(n0, m.hien ? (m.hien.e.ngay || tdnCuoiKy(m.hien.ky)) : '', d.cap==='tong'), dt = h && b ? h.n-b.n : null, d0 = h && a ? h.n-a.n : null, pc = h && a && a.n ? Math.round((h.n-a.n)/a.n*1000)/10 : null;
      var dg = !h || !ct ? '—' : (h.n<=ct.quy ? 'Đạt' : 'Tiếp tục phấn đấu (còn giảm '+(h.n-ct.quy)+')');
      var r = [d.cap==='tong' ? '' : ++stt, d.nhan, n0, a ? a.dn : null, b ? b.n : null, b ? b.dn : null, h ? h.n : null, h ? h.dn : null, h ? h.lt : null, dt, d0, pc, ct ? ct.nam : null, ct ? ct.quy : null, dg]; aoa.push(r);
      return '<tr'+M.lopDong(d.cap)+'><td class="c">'+(r[0]||'')+'</td>'+M.oTen(d)+'<td class="s">'+so(n0)+'</td><td class="s">'+tr(r[3])+'</td><td class="s">'+so(r[4])+'</td><td class="s">'+tr(r[5])+'</td>'+
        '<td class="s"><b>'+so(r[6])+'</b></td><td class="s">'+tr(r[7])+'</td><td class="s">'+tr(r[8])+'</td><td class="s"'+mau(dt)+'>'+(dt==null ? '—' : dau(dt))+'</td><td class="s"'+mau(d0)+'>'+(d0==null ? '—' : dau(d0))+'</td>'+
        '<td class="s"'+mau(pc)+'>'+(pc==null ? '—' : (pc>0 ? '+' : '')+String(pc).replace('.', ',')+'%')+'</td><td class="s">'+so(r[12])+'</td><td class="s">'+(ct ? so(ct.quy)+' <small>('+ct.moc+')</small>' : '—')+'</td>'+
        '<td'+(dg==='Đạt' ? ' style="color:#067647;font-weight:600"' : (dg==='—' ? '' : ' style="color:#b42318"'))+'>'+dg+'</td></tr>'; }).join('');
    var ct = M.ct();
      '<input type="number" min="0" value="'+(ct.pgd||'')+'" style="width:72px" data-lenh="okhd.pgd" data-su="change"> món</div>';
    return {ten:'KHD tong quan', tieuDe:'MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG — ĐỐI CHIẾU CHỈ TIÊU VB 180', ngay:m.hien ? 'Đến ngày '+m.hien.phu : x.N.ngay,
      html:'<div class="bc-tom">'+M.dauTom(m)+'</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>'+
        '<div class="bc-ghi">Đánh giá theo chỉ tiêu đến mốc quý gần nhất (lộ trình giảm đều theo quý như phụ lục CV 180). Chỉ tiêu từng xã / điểm = 31/12 × (1 − '+ct.pt+'%).</div>', aoa:aoa}; };
  /* ---------- B2 Diễn biến từng tháng ---------- */
  M.KHD = {ma2:'khd_db', ma3:'khd_ss', chi:'khd', ten:'MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG', ma:'KHD', tien:0, ra:'đã giao dịch trở lại hoặc tất nợ', moi:'mới phát sinh', don:'Số món KHĐ'};
  M.b2 = function(f){ f = f || M.KHD; var x = M.can(f.ma2, f.chi); if(x.N.can) return x.N.can; var c = x.c, m = x.m, hang = M.hang(c);
    var G = c.map(function(k){ return M.gop(k, function(t){ return t.xa+'|'+t.khoaDiem; }); });
    var th = '<tr><th>Stt</th><th>Xã › Điểm GD</th>'+c.map(function(k){ return '<th>'+(k.dau ? '31/12' : (k.hien ? 'Hiện tại<br><small>'+k.phu+'</small>' : k.nhan))+'</th>'; }).join('')+'<th>± so 31/12</th></tr>';
    var aoa = [['Stt', 'Xã › Điểm GD'].concat(c.map(function(k){ return k.dau ? '31/12' : (k.hien ? 'Hiện tại '+k.phu : k.nhan); })).concat(['± so 31/12'])], stt = 0;
    var body = hang.map(function(d){ var truoc = null, r = [d.cap==='tong' ? '' : ++stt, d.nhan], o = '';
      c.forEach(function(k, i){ var v = G[i] ? M.loc(G[i], d.f) : null, n = v ? (f.tien ? v.dn : v.n) : (G[i] ? 0 : null), mt = '';
        if(n!=null && truoc!=null){ mt = n>truoc ? ' <span style="color:#b42318">▲</span>' : (n<truoc ? ' <span style="color:#067647">▼</span>' : ''); }
        o += '<td class="s"'+(n!=null && truoc!=null ? mau(n-truoc) : '')+'>'+(f.tien ? tr(n) : so(n))+mt+'</td>'; r.push(n==null ? '' : n); if(n!=null) truoc = n; });
      var n0 = r[2], nh = r[r.length-1], dd = (n0!=='' && nh!=='' && G[0] && m.hien) ? nh-n0 : null; r.push(dd==null ? '' : dd); aoa.push(r);
      return '<tr'+M.lopDong(d.cap)+'><td class="c">'+(r[0]||'')+'</td>'+M.oTen(d)+o+'<td class="s"'+mau(dd)+'><b>'+(dd==null ? '—' : (f.tien ? (dd>0 ? '+' : '')+tr(dd) : dau(dd)))+'</b></td></tr>'; }).join('');
    var thieu = c.filter(function(k){ return !M.coSo(k); }).map(function(k){ return k.phu; });
    return {ten:f.ma+' dien bien', tieuDe:'DIỄN BIẾN '+f.ten+' THEO THÁNG — NĂM '+SK_K.thang.slice(0, 4), ngay:m.hien ? 'Đến ngày '+m.hien.phu : x.N.ngay,
      html:'<div class="bc-tom">'+f.don+' cuối mỗi tháng (Mẫu 31 chốt tháng) và hiện tại'+(f.tien ? ' (triệu đồng)' : '')+' · <span style="color:#b42318">▲ tăng</span> / <span style="color:#067647">▼ giảm</span> so tháng liền trước'+
        (thieu.length ? ' · <b>chưa nạp Mẫu 31: '+thieu.join(', ')+'</b> ("—")' : '')+'</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  /* ---------- B3 So sánh tháng trước theo Hội / Tổ trưởng (khuôn mục 4 giao ban) ---------- */
  M.b3 = function(f){ f = f || M.KHD; var x = M.can(f.ma3, f.chi); if(x.N.can) return x.N.can; var m = x.m;
    if(!M.coSo(m.hien) || !M.coSo(m.truoc)) return {ten:f.ma+' so sanh', tieuDe:f.ten+' — SO SÁNH THÁNG TRƯỚC', ngay:x.N.ngay, aoa:[['Cần Mẫu 31 tháng trước và hiện tại']], html:'<div class="bc-rong">Cần Mẫu 31 chốt tháng trước và Mẫu 31 hiện tại để so sánh.</div>'};
    var kt = function(t){ return t.ma || ''; }, A = M.gop(m.truoc, kt) || {}, B = M.gop(m.hien, kt) || {}, to = {};
    Object.keys(A).concat(Object.keys(B)).forEach(function(k){ var t = (B[k] || A[k]).t; to[k] = t; });
    var ds = Object.keys(to).sort(function(a, b){ var x1 = to[a], y = to[b]; return (x1.tenXa||'').localeCompare(y.tenXa||'', 'vi') || (x1.tenDiem||'').localeCompare(y.tenDiem||'', 'vi') ||
      (['11', '12', '13', '14', '99'].indexOf(x1.dv)-['11', '12', '13', '14', '99'].indexOf(y.dv)) || (x1.ten||'').localeCompare(y.ten||'', 'vi'); });
    var kuA = m.truoc.s.ku, kuB = m.hien.s.ku, moi = {}, ra = 0;
    Object.keys(kuB).forEach(function(u){ if(!(u in kuA)){ var t = m.hien.s.to[kuB[u][0]]; if(t && pvLoc(skCH(), t)) moi[t.ten || t.ma] = (moi[t.ten || t.ma]||0)+1; } });
    Object.keys(kuA).forEach(function(u){ if(!(u in kuB)){ var t = m.truoc.s.to[kuA[u][0]]; if(t && pvLoc(skCH(), t)) ra++; } });
    var nM = Object.keys(moi).reduce(function(s, k){ return s+moi[k]; }, 0);
    var th = '<tr><th>Stt</th><th>Hội</th><th>Tổ trưởng</th><th>Mã tổ</th><th>Số món '+m.truoc.nhan+'</th><th>Dư nợ '+m.truoc.nhan+'</th><th>Số món hiện tại</th><th>Dư nợ hiện tại</th><th>Chênh lệch món</th><th>Chênh lệch dư nợ</th></tr>';
    var aoa = [['Stt', 'Hội', 'Tổ trưởng', 'Mã tổ', 'Số món tháng trước', 'Dư nợ tháng trước', 'Số món hiện tại', 'Dư nợ hiện tại', 'Chênh lệch món', 'Chênh lệch dư nợ']], body = '', stt = 0, diem = null, cd = null, T = {a:0, ad:0, b:0, bd:0};
    var dongCong = function(nhan, z, lop){ var dm = z.b-z.a, dd = z.bd-z.ad; aoa.push(['', nhan, '', '', z.a, z.ad, z.b, z.bd, dm, dd]);
      return '<tr class="'+lop+'"><td></td><td colspan="3">'+coChuHTML(nhan)+'</td><td class="s">'+so(z.a)+'</td><td class="s">'+tr(z.ad)+'</td><td class="s">'+so(z.b)+'</td><td class="s">'+tr(z.bd)+'</td><td class="s"'+mau(dm)+'>'+dau(dm)+'</td><td class="s"'+mau(dd)+'>'+(dd>0 ? '+' : '')+tr(dd)+'</td></tr>'; };
    ds.forEach(function(k){ var t = to[k], a = A[k] || {n:0, dn:0}, b = B[k] || {n:0, dn:0}, kd = t.xa+'|'+t.khoaDiem;
      if(kd!==diem){ if(cd) body += dongCong('Cộng điểm '+cd.ten, cd, 'cong'); diem = kd; cd = {ten:t.tenDiem || '', a:0, ad:0, b:0, bd:0}; stt = 0;
        body += '<tr class="nhom"><td colspan="10">'+coChuHTML((t.tenXa || '')+' · Điểm GD '+(t.tenDiem || '(chưa rõ)'))+'</td></tr>'; aoa.push(['', (t.tenXa || '')+' · Điểm GD '+(t.tenDiem || '')]); }
      var dm = b.n-a.n, dd = b.dn-a.dn; [cd, T].forEach(function(z){ z.a += a.n; z.ad += a.dn; z.b += b.n; z.bd += b.dn; });
      var r = [++stt, ten3(t.trucTiep ? '99' : t.dv), t.ten || '', t.ma, a.n, a.dn, b.n, b.dn, dm, dd]; aoa.push(r);
      body += '<tr><td class="c">'+stt+'</td><td class="c">'+r[1]+'</td><td>'+coChuHTML(r[2])+'</td><td class="c">'+coChuHTML(t.ma)+'</td><td class="s">'+(a.n ? so(a.n) : '-')+'</td><td class="s">'+(a.n ? tr(a.dn) : '-')+'</td>'+
        '<td class="s">'+(b.n ? so(b.n) : '-')+'</td><td class="s">'+(b.n ? tr(b.dn) : '-')+'</td><td class="s"'+mau(dm)+'>'+(dm ? dau(dm) : '0')+'</td><td class="s"'+mau(dd)+'>'+(dd ? (dd>0 ? '+' : '')+tr(dd) : '-')+'</td></tr>'; });
    if(cd) body += dongCong('Cộng điểm '+cd.ten, cd, 'cong'); body += dongCong('Tổng cộng', T, 'tong');
    var top = Object.keys(moi).sort(function(a, b){ return moi[b]-moi[a]; }).slice(0, 3).map(function(k){ return 'tổ '+k+(moi[k]>1 ? ' ('+moi[k]+')' : ''); }).join(', ');
    var tom = 'Hiện tại ('+m.hien.phu+') so '+m.truoc.phu+': '+T.b+' món / '+tr(T.bd)+' triệu đồng, '+(T.b-T.a>0 ? 'tăng ' : (T.b-T.a<0 ? 'giảm ' : 'không đổi '))+(T.b!==T.a ? Math.abs(T.b-T.a)+' món' : '')+
      '; trong tháng <b>'+ra+' món</b> '+f.ra+'; <b>'+nM+' món</b> '+f.moi+(top ? ' (tập trung tại '+coChuHTML(top)+')' : '')+'.';
    return {ten:f.ma+' so sanh', tieuDe:f.ten+' — SO SÁNH '+m.truoc.phu.toUpperCase()+' VỚI HIỆN TẠI THEO HỘI, TỔ', ngay:'Đến ngày '+m.hien.phu,
      html:'<div class="bc-tom">'+tom+'</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  /* ---------- B5 Món chậm nộp lãi, nguy cơ thành KHĐ (Mẫu 31 hiện tại) ---------- */
  M.nguyCo = function(B, K, ngay){ var den = slCongThang(ngay, 2), da = {}, ra = [];
    (kcGoc(B) || []).forEach(function(o){ if(!o.ku || da[o.ku]) return; da[o.ku] = 1;
      if((o.qh||0)>0 || (o.kn||0)>0 || slKHDLy(o, ngay)!=='gd') return;   /* chưa KHĐ chỉ vì chưa đủ 3 tháng không giao dịch */
      var moc = o.ngdg || o.ngn; if(!moc) return; var khi = slCongThang(moc, 3); if(khi>den) return;
      if(slKHDLy(o, den)!=='') return;   /* đến hết 2 tháng tới mà không giao dịch thì luật KHĐ (3.563) có tính vào không — loại món ân hạn, HSSV, LS 0… */
      var t = KHO.toKy(K, toMaCua(o)) || {}; if(!pvLoc(skCH(), t)) return;
      ra.push({o:o, t:t, moc:moc, khi:khi}); });
    return ra.sort(function(a, b){ return (a.t.tenXa||'').localeCompare(b.t.tenXa||'', 'vi') || (a.t.tenDiemDu||'').localeCompare(b.t.tenDiemDu||'', 'vi') || (a.khi<b.khi ? -1 : (a.khi>b.khi ? 1 : 0)) || (a.t.ten||'').localeCompare(b.t.ten||'', 'vi'); }); };
  M.b5 = function(){ var x = M.can('khd_ng'); if(x.N.can) return x.N.can; var m = x.m, B = DBT.hienB, K = DBT.hienK;
    if(!m.hien || !B || !K || B.hsTen!=='Mẫu 31') return {ten:'KHD nguy co', tieuDe:'MÓN VAY CHẬM NỘP LÃI — NGUY CƠ THÀNH MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG', ngay:x.N.ngay, aoa:[['Cần Mẫu 31 hiện tại']], html:'<div class="bc-rong">Cần Mẫu 31 hiện tại.</div>'};
    var ngay = m.hien.e.ngay || tdnCuoiKy(m.hien.ky), ds = M.nguyCo(B, K, ngay), diem = null, stt = 0, tong = 0;
    var th = '<tr><th>Stt</th><th>Hội</th><th>Tổ trưởng</th><th>Khách hàng</th><th>Ấp</th><th>Chương trình</th><th>Dư nợ</th><th>GD gần nhất</th><th>Thành KHĐ nếu không GD từ</th></tr>';
    var aoa = [['Stt', 'Hội', 'Tổ trưởng', 'Khách hàng', 'Ấp', 'Chương trình', 'Dư nợ (đồng)', 'GD gần nhất', 'Thành KHĐ từ ngày']], body = '';
    ds.forEach(function(z){ var t = z.t, o = z.o, kd = (t.tenXa||'')+'|'+(t.khoaDiem||'');
      if(kd!==diem){ diem = kd; stt = 0; var nd = ds.filter(function(w){ return (w.t.tenXa||'')+'|'+(w.t.khoaDiem||'')===kd; }).length;
        body += '<tr class="nhom"><td colspan="9">'+coChuHTML((t.tenXa||'')+' · Điểm GD '+String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, ''))+' — '+nd+' món</td></tr>'; }
      tong += o.dn||0; var r = [++stt, ten3(t.trucTiep ? '99' : String(t.dv||'')), t.ten||'', o.ten||'', o.tenThon || t.tenThon || '', ctNgan(o.ct, o), o.dn||0, ngayVNsl(z.moc), ngayVNsl(z.khi)]; aoa.push(r);
      body += '<tr><td class="c">'+stt+'</td><td class="c">'+r[1]+'</td><td>'+coChuHTML(r[2])+'</td><td>'+coChuHTML(r[3])+'</td><td>'+coChuHTML(r[4])+'</td><td class="c">'+coChuHTML(r[5])+'</td><td class="s">'+tr(r[6])+'</td><td class="c">'+r[7]+'</td><td class="c"><b>'+r[8]+'</b></td></tr>'; });
    if(!ds.length) body = '<tr><td colspan="9" class="c">Không có món nào sẽ thành KHĐ trong 2 tháng tới.</td></tr>';
    else { body += '<tr class="tong"><td></td><td colspan="5">Tổng cộng: '+ds.length+' món</td><td class="s">'+tr(tong)+'</td><td colspan="2"></td></tr>'; aoa.push(['', 'Tổng cộng: '+ds.length+' món', '', '', '', '', tong]); }
    return {ten:'KHD nguy co', tieuDe:'MÓN VAY CHẬM NỘP LÃI — NGUY CƠ THÀNH MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG', ngay:'Theo Mẫu 31 ngày '+m.hien.phu,
      html:'<div class="bc-tom">'+ds.length+' món / '+tr(tong)+' triệu đồng sẽ thành món vay 3 tháng KHĐ đến '+ngayVNsl(slCongThang(ngay, 2))+' nếu không giao dịch (nộp lãi) — Tổ trưởng thông báo từng hộ nộp lãi trước ngày ở cột cuối. '+
        'Không tính món quá hạn, nợ khoanh và các món luật KHĐ loại trừ (HSSV, đang ân hạn, lãi suất 0…).</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>', aoa:aoa}; };
  /* ---------- B6 Phân nhóm xử lý A/B/C (danh sách anh duyệt 28/11 mục 7; khuôn Phụ lục mục 3 "Nội dung họp giao ban") ----------
     Nhóm A: mới phát sinh (chưa là KHĐ ở tháng chốt trước) và lãi tồn dưới 6 tháng lãi — xử lý ngay trong tháng · Nhóm C: lãi tồn từ 12 tháng lãi trở lên — phân tích từng món,
     đề xuất xử lý rủi ro / biện pháp thu hồi · Nhóm B: còn lại. Số tháng lãi = lãi tồn / (dư nợ × lãi suất tháng); lãi suất Mẫu 31 > 2 hiểu là %/năm (÷ 12), ngược lại %/tháng. */
  M.thangLai = function(o, ls){ var r = +ls; if(!(r>0) || !(o.dn>0)) return null; var th = r>2 ? r/12/100 : r/100; return (laiTon(o)||0)/(o.dn*th); };
  M.b6 = function(){ var x = M.can('khd_abc'); if(x.N.can) return x.N.can; var m = x.m, B = DBT.hienB, K = DBT.hienK;
    if(!m.hien || !B || !K || B.hsTen!=='Mẫu 31') return {ten:'KHD nhom ABC', tieuDe:'MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG — PHÂN NHÓM XỬ LÝ A / B / C', ngay:x.N.ngay, aoa:[['Cần Mẫu 31 hiện tại']], html:'<div class="bc-rong">Cần Mẫu 31 hiện tại.</div>'};
    var goc = {}; (kcGoc(B) || []).forEach(function(o){ if(o.ku && !goc[o.ku]) goc[o.ku] = o; }); var cu = M.coSo(m.truoc) ? m.truoc.s.ku : null, S = skCH(), ds = [], dem = {A:0, B:0, C:0, '?':0};
    slDsNo(B, 'khd').forEach(function(o){ if(!o.ku) return; var g = goc[o.ku] || o, t = KHO.toKy(K, toMaCua(g)) || {}; if(!pvLoc(S, t)) return;
      var tl = M.thangLai(g, g.ls), moi = cu ? !(o.ku in cu) : false, nh = tl==null ? '?' : (tl>=12 ? 'C' : ((moi && tl<6) ? 'A' : 'B')); dem[nh]++;
      ds.push({o:g, t:t, tl:tl, nh:nh, moi:moi}); });
    ds.sort(function(a, b){ return (a.t.tenXa||'').localeCompare(b.t.tenXa||'', 'vi') || (a.t.khoaDiem||'').localeCompare(b.t.khoaDiem||'', 'vi') || a.nh.localeCompare(b.nh) || (a.t.ten||'').localeCompare(b.t.ten||'', 'vi'); });
    var th = '<tr><th>Stt</th><th>Hội</th><th>Tổ trưởng</th><th>Khách hàng</th><th>Ấp</th><th>Chương trình</th><th>Dư nợ</th><th>GD gần nhất</th><th>Lãi tồn</th><th>Số tháng lãi</th><th>Nhóm</th></tr>';
    var aoa = [['Stt', 'Hội', 'Tổ trưởng', 'Khách hàng', 'Ấp', 'Chương trình', 'Dư nợ (đồng)', 'GD gần nhất', 'Lãi tồn (đồng)', 'Số tháng lãi', 'Nhóm']], body = '', diem = null, stt = 0, tdn = 0, tlt = 0;
    ds.forEach(function(z){ var t = z.t, o = z.o, kd = (t.tenXa||'')+'|'+(t.khoaDiem||'');
      if(kd!==diem){ diem = kd; stt = 0; var nd = ds.filter(function(w){ return (w.t.tenXa||'')+'|'+(w.t.khoaDiem||'')===kd; });
        body += '<tr class="nhom"><td colspan="11">'+coChuHTML((t.tenXa||'')+' · Điểm GD '+String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, ''))+' — '+nd.length+' món (A '+nd.filter(function(w){ return w.nh==='A'; }).length+' · B '+nd.filter(function(w){ return w.nh==='B'; }).length+' · C '+nd.filter(function(w){ return w.nh==='C'; }).length+')</td></tr>'; }
      tdn += o.dn||0; tlt += laiTon(o)||0;
      var r = [++stt, ten3(t.trucTiep ? '99' : String(t.dv||'')), t.ten||'', o.ten||'', o.tenThon || t.tenThon || '', ctNgan(o.ct, o), o.dn||0, o.ngdg ? ngayVNsl(o.ngdg) : '', laiTon(o)||0, z.tl==null ? '' : Math.round(z.tl*10)/10, z.nh]; aoa.push(r);
      body += '<tr><td class="c">'+stt+'</td><td class="c">'+r[1]+'</td><td>'+coChuHTML(r[2])+'</td><td>'+coChuHTML(r[3])+(z.moi ? ' <small>(mới)</small>' : '')+'</td><td>'+coChuHTML(r[4])+'</td><td class="c">'+coChuHTML(r[5])+'</td>'+
        '<td class="s">'+tr(r[6])+'</td><td class="c">'+r[7]+'</td><td class="s">'+tr(r[8])+'</td><td class="s">'+(z.tl==null ? '—' : String(r[9]).replace('.', ','))+'</td><td class="c"'+(z.nh==='C' ? ' style="color:#b42318;font-weight:600"' : (z.nh==='A' ? ' style="color:#067647;font-weight:600"' : ''))+'>'+z.nh+'</td></tr>'; });
    if(!ds.length) body = '<tr><td colspan="11" class="c">Không có món vay 3 tháng KHĐ.</td></tr>';
    else { body += '<tr class="tong"><td></td><td colspan="5">Tổng cộng: '+ds.length+' món</td><td class="s">'+tr(tdn)+'</td><td></td><td class="s">'+tr(tlt)+'</td><td colspan="2"></td></tr>'; aoa.push(['', 'Tổng cộng: '+ds.length+' món', '', '', '', '', tdn, '', tlt]); }
    var tom = ds.length+' món / '+tr(tdn)+' triệu đồng, lãi tồn '+tr(tlt)+' triệu đồng'+
      ' — <b>nhóm A '+dem.A+'</b> (mới phát sinh, lãi tồn dưới 6 tháng lãi — xử lý ngay trong tháng) · <b>nhóm B '+dem.B+'</b> · <b>nhóm C '+dem.C+'</b> (lãi tồn từ 12 tháng lãi trở lên — phân tích từng món, đề xuất xử lý rủi ro hoặc biện pháp thu hồi)'+
      (dem['?'] ? ' · '+dem['?']+' món chưa xếp được (thiếu lãi suất trên Mẫu 31)' : '')+(cu ? '' : ' · <i>chưa có Mẫu 31 chốt tháng trước — không xác định được món mới (nhóm A)</i>');
    return {ten:'KHD nhom ABC', tieuDe:'MÓN VAY 3 THÁNG KHÔNG HOẠT ĐỘNG — PHÂN NHÓM XỬ LÝ A / B / C', ngay:'Theo Mẫu 31 ngày '+m.hien.phu,
      html:'<div class="bc-tom">'+tom+'</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table><div class="bc-ghi">Số tháng lãi = lãi tồn / (dư nợ × lãi suất tháng theo Mẫu 31) — ước tính để phân nhóm.</div>', aoa:aoa}; };
  /* ---------- gắn vào Sao kê: ô riêng, chuyển sao kê KHĐ sang, bỏ khỏi ô Nợ cần xử lý ---------- */
  if(typeof SK_NHOM!=='undefined' && !SK_NHOM.some(function(n){ return n.k===M.NHOM; })){ var ix = SK_NHOM.findIndex(function(n){ return n.k==='xl'; }); SK_NHOM.splice(ix+1, 0, {k:M.NHOM, ten:'📉 Món vay 3 tháng KHĐ'}); }
  for(var i = SK_BC.length-1; i>=0; i--){ if(SK_BC[i].k==='db_khd') SK_BC.splice(i, 1); }
  var bc4 = null; SK_BC.forEach(function(b, j){ if(b.k==='khd'){ bc4 = b; SK_BC.splice(j, 1); } });
  if(bc4){ bc4.nhom = M.NHOM; bc4.ten = 'Sao kê danh sách món vay 3 tháng không hoạt động'; }
  [{k:'khd_tq', ten:'Tổng quan — đối chiếu chỉ tiêu VB 180 (Toàn PGD, xã, điểm GD)', lap:M.b1, tuyChon:function(){ return M.suaCT(); }}, {k:'khd_db', ten:'Diễn biến từng tháng từ đầu năm (▲▼)', lap:function(){ return M.b2(); }},
   {k:'khd_ss', ten:'So sánh tháng trước theo Hội, tổ trưởng', lap:function(){ return M.b3(); }}].concat(bc4 ? [bc4] : []).concat([{k:'khd_abc', ten:'Phân nhóm xử lý A / B / C (theo số tháng lãi tồn)', lap:M.b6}, {k:'khd_ng', ten:'Món chậm nộp lãi — nguy cơ thành KHĐ (2 tháng tới)', lap:M.b5}])
    .forEach(function(b){ SK_BC.push(b.lap && !b.nhom ? {k:b.k, ten:b.ten, nhom:M.NHOM, kho:'ngang', lap:function(){ return b.lap(); }, tuyChon:b.tuyChon} : b); if(b.k!=='khd') DBT.dangKyBC(b.k, 'khd'); });
  M.suaCT = function(){ var ct = M.ct(); 
    return '<span class="sk-ngay" title="Chỉ tiêu theo CV 180/NHCS-KHTD — sửa nếu tỉnh giao khác">Chỉ tiêu giảm <input type="number" min="1" max="99" value="'+ct.pt+'" style="width:48px" data-lenh="okhd.pt" data-su="change">%'+
      ' · PGD (phụ lục tỉnh) <input type="number" min="0" value="'+(ct.pgd||'')+'" placeholder="theo %" style="width:64px" data-lenh="okhd.pgd" data-su="change"> món</span>'; };
  M.doiCT = function(k, v){ var c = D.cauHinh.khdCT = D.cauHinh.khdCT || {}; c[k] = v==='' ? '' : +v; luu(); if(typeof skXemHen==='function') skXemHen(); };
  if(typeof gdDangKy==='function') gdDangKy('okhd', {pt:function(el){ M.doiCT('pt', el.value); }, pgd:function(el){ M.doiCT('pgd', el.value); }});
  return M;
})();
