/* ===== 3.571 (danh sách việc anh duyệt 28/11/2026, mục 6 "bảng đối chiếu toàn bộ chỉ tiêu VB 180 theo xã / điểm GD" · "theo VB 180, em cứ làm theo em thấy tốt nhất"):
   🎯 Ô Sao kê "CHỈ TIÊU VB 180" — 1 bảng A4 ngang: Toàn PGD › Xã › Điểm GD × từng chỉ tiêu (kết quả · chỉ tiêu · Đạt ✓ / chưa ✗), cột cuối đếm số chỉ tiêu đạt.
   Chỉ tiêu (CV 180/NHCS-KHTD + VB UBND xã theo VB 180) — nguồn trong app:
   1 Tỷ lệ nợ quá hạn ≤ min(31/12, 0,08%) · 2 Món vay 3 tháng KHĐ ≤ chỉ tiêu đến quý (−30%/năm) · 3 Nợ khoanh ≤ chỉ tiêu đến quý (−5%/năm) — bộ máy DBT (js/99c) như các ô js/99d, 99e;
   4 Thu nợ gốc đến hạn ≥ 99% — ƯỚC TÍNH (js/99e, 2 Mẫu 31 chốt) · 5 Tổ xếp loại TB, Yếu = 0 · 6 Điểm CL tổ bình quân ≥ 93 — CLT02 tháng (js/95) của kỳ Sao kê đang chọn ·
   7 Tổ viên còn dư nợ gửi TK 105 ≥ 10.000 đ ≥ 99% — Mẫu 31 kỳ Sao kê (tổng TK 105 các sổ của khách, QT-C-01).
   Chưa có nguồn trong app (ghi chú cuối bảng): điểm CL hoạt động giao dịch xã ≥ 97; lãi tồn giảm so đầu năm / món giải ngân mới có lãi tồn.
   Chỉ đọc. Cắm rút: bỏ dòng <script> là mất ô. Cần js/99c, 99d, 99e. ES5. */
var CT180 = (function(){
  var M = {};
  if(typeof DBT==='undefined' || typeof OKHD==='undefined' || typeof ONO==='undefined' || !ONO.dnNhom || typeof SK_BC==='undefined') return M;
  var O = OKHD, tr = ONO.tr;
  var pt = function(v, n){ return v==null ? '—' : v.toLocaleString('vi-VN', {minimumFractionDigits:n==null ? 2 : n, maximumFractionDigits:n==null ? 2 : n})+'%'; };
  var so = ONO.so;
  var khoaD = ONO.khoaD;
  M.lap = function(){ var N = skNen31('ct180'); if(N.can) return N.can;
    var cK = O.cot('khd'), cQ = O.cot('qh'), cN = O.cot('kn'), mK = O.moc(cK), mQ = O.moc(cQ), mN = O.moc(cN);
    var ngay = mK.hien ? (mK.hien.e.ngay || tdnCuoiKy(mK.hien.ky)) : '', q = ngay ? Math.min(4, Math.max(1, Math.ceil(+ngay.slice(5, 7)/3))) : 4, ctQ = ONO.ctQH(), ctN = ONO.ctKN(), ctD = ONO.dhCT();
    var G = function(k){ return O.gop(k, khoaD); }, gK0 = G(mK.dau), gK = G(mK.hien), gQ0 = G(mQ.dau), gQ = G(mQ.hien), gN0 = G(mN.dau), gN = G(mN.hien);
    var dh = ONO.dh ? ONO.dhTinh(ONO.dh) : null, Kc = SK_K, B = SK_K.B, S = skCH();
    /* CLT02 tháng + tiết kiệm (kỳ Sao kê) theo tổ */
    var dsTo = (KHO.dsToKy(Kc) || []).filter(function(t){ return t && !t.trucTiep && pvLoc(S, t); });
    var clt = {}; if(typeof CLT!=='undefined') dsTo.forEach(function(t){ var r = CLT.cua(t, B); if(r && r.T) clt[t.ma] = r.T; });
    var tk = {}, kh = {}, gap = {}; (kcGoc(B) || []).concat((B && B.lap || []).filter(function(o){ return !o._huy; })).forEach(function(o){ if(!o.kh) return; var c = kh[o.kh] = kh[o.kh] || {dn:0, t105:0, to:toMaCua(o)};
      if(o.ku && (o.dn||0)>0) c.dn += o.dn; var s = String(o.stk==null ? '' : o.stk).trim(); if(s && !gap[s]){ gap[s] = 1; c.t105 += +o.t105||0; } });
    Object.keys(kh).forEach(function(k){ var c = kh[k]; if(!(c.dn>0)) return; var a = tk[c.to] = tk[c.to] || {n:0, du:0}; a.n++; if(c.t105>=10000) a.du++; });
    /* hàng: mọi xã / điểm có tổ trong kỳ Sao kê (không chỉ nơi có KHĐ) */
    var H = {}; dsTo.forEach(function(t){ var k = t.xa+'|'+t.khoaDiem; if(!H[k]) H[k] = {xa:t.xa, tenXa:t.tenXa||'', diem:t.khoaDiem, tenDiem:String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, '')}; });
    var hang = ONO.hangTu(H);
    var CT = [
      {ten:'Tỷ lệ nợ quá hạn', dv:'%', tinh:function(d){ var h = O.loc(gQ, d.f), td = ONO.dnNhom(mQ.hien, d.f); if(!O.coSo(mQ.hien)) return null; var tl = td ? (h ? h.dn : 0)/td*100 : 0;
          var a = O.coSo(mQ.dau) ? (function(){ var x = O.loc(gQ0, d.f), t0 = ONO.dnNhom(mQ.dau, d.f); return t0 ? (x ? x.dn : 0)/t0*100 : 0; })() : null, c = a==null ? ctQ.tran : Math.min(a, ctQ.tran);
          return {kq:pt(tl), ct:'≤ '+pt(c), dat:tl<=c+1e-9, so:tl}; }},
      {ten:'Món vay 3 tháng KHĐ', dv:'món', tinh:function(d){ if(!O.coSo(mK.hien)) return null; var h = O.loc(gK, d.f), a = O.coSo(mK.dau) ? O.loc(gK0, d.f) : null, n = h ? h.n : 0;
          var c = O.chiTieu(a ? a.n : (O.coSo(mK.dau) ? 0 : null), ngay, d.cap==='tong'); return {kq:so(n), ct:c ? '≤ '+so(c.quy) : '—', dat:c ? n<=c.quy : null, so:n}; }},
      {ten:'Nợ khoanh', dv:'tr.đ', tinh:function(d){ if(!O.coSo(mN.hien)) return null; var h = O.loc(gN, d.f), a = O.coSo(mN.dau) ? (O.loc(gN0, d.f) || {dn:0}) : null, v = h ? h.dn : 0;
          var c = a ? Math.round(a.dn*(1-ctN.pt/100*q/4)) : null; return {kq:tr(v), ct:c==null ? '—' : '≤ '+tr(c), dat:c==null ? null : (v<=c), so:v}; }},
      {ten:'Thu nợ gốc đến hạn*', dv:'%', tinh:function(d){ if(!dh) return null; var z = dh.filter(function(w){ return d.f(w.t); }); if(!z.length) return {kq:'—', ct:'≥ '+ctD.tl+'%', dat:null};
          var den = 0, thu = 0, gh = 0; z.forEach(function(w){ den += w.dn; thu += w.thu; if(w.kq==='gh') gh += w.con; }); var tl = den-gh>0 ? thu/(den-gh)*100 : null;
          return {kq:pt(tl, 1), ct:'≥ '+ctD.tl+'%', dat:tl==null ? null : tl>=ctD.tl-1e-9, so:tl}; }},
      {ten:'Tổ TB, Yếu (CLT02)', dv:'tổ', tinh:function(d){ var ds = dsTo.filter(function(t){ return d.f(t) && clt[t.ma]; }); if(!ds.length) return null;
          var n = ds.filter(function(t){ return /^(TB|Yếu)/i.test(clt[t.ma].xl||''); }).length; return {kq:so(n)+'/'+ds.length, ct:'0', dat:n===0, so:n}; }},
      {ten:'Điểm CL tổ bình quân', dv:'điểm', tinh:function(d){ var ds = dsTo.filter(function(t){ return d.f(t) && clt[t.ma] && clt[t.ma].diem!=null; }); if(!ds.length) return null;
          var bq = ds.reduce(function(s, t){ return s+(+clt[t.ma].diem||0); }, 0)/ds.length; return {kq:bq.toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2}), ct:'≥ 93', dat:bq>=93-1e-9, so:bq}; }},
      {ten:'Tổ viên gửi TK ≥ 10.000 đ', dv:'%', tinh:function(d){ var n = 0, du = 0; dsTo.forEach(function(t){ if(d.f(t) && tk[t.ma]){ n += tk[t.ma].n; du += tk[t.ma].du; } }); if(!n) return null;
          var tl = du/n*100; return {kq:pt(tl, 1), ct:'≥ 99%', dat:tl>=99-1e-9, so:tl}; }}];
    var th = '<tr><th rowspan="2">Stt</th><th rowspan="2">Đơn vị</th>'+CT.map(function(c){ return '<th colspan="3">'+c.ten+' <small>('+c.dv+')</small></th>'; }).join('')+'<th rowspan="2">Số chỉ tiêu đạt</th></tr><tr>'+
      CT.map(function(){ return '<th>Kết quả</th><th>Chỉ tiêu</th><th>ĐG</th>'; }).join('')+'</tr>';
    var aoa = [['Stt', 'Đơn vị'].concat([].concat.apply([], CT.map(function(c){ return [c.ten+' — kết quả', 'chỉ tiêu', 'đánh giá']; }))).concat(['Số chỉ tiêu đạt'])], stt = 0;
    var body = hang.map(function(d){ var dat = 0, co = 0, r = [d.cap==='tong' ? '' : ++stt, d.nhan], o = '';
      CT.forEach(function(c){ var x = c.tinh(d); if(x && x.dat!=null){ co++; if(x.dat) dat++; }
        r.push(x ? x.kq : '—', x ? x.ct : '—', !x || x.dat==null ? '' : (x.dat ? 'Đạt' : 'Chưa đạt'));
        o += '<td class="s">'+(x ? x.kq : '—')+'</td><td class="s"><small>'+(x ? x.ct : '—')+'</small></td><td class="c"'+(x && x.dat===true ? ' style="color:#067647"' : (x && x.dat===false ? ' style="color:#b42318"' : ''))+'>'+(!x || x.dat==null ? '' : (x.dat ? '✓' : '✗'))+'</td>'; });
      r.push(co ? dat+'/'+co : ''); aoa.push(r);
      return '<tr'+O.lopDong(d.cap)+'><td class="c">'+(r[0]||'')+'</td>'+O.oTen(d)+o+'<td class="c"><b>'+(co ? dat+'/'+co : '—')+'</b></td></tr>'; }).join('');
    var tom = 'Đối chiếu chỉ tiêu CV 180/NHCS-KHTD (năm '+SK_K.thang.slice(0, 4)+') · nợ quá hạn, KHĐ, khoanh: Mẫu 31 hiện tại '+(mK.hien ? mK.hien.phu : '—')+' so 31/12 (lộ trình quý) · tổ TB/Yếu, điểm CL tổ, tiết kiệm: kỳ Sao kê '+kyVN(SK_K.thang)+
      (dh ? ' · *thu nợ đến hạn: ước tính tháng '+kyVN(ONO.dh.m)+' (2 Mẫu 31 chốt)' : ' · *thu nợ đến hạn: cần Mẫu 31 chốt 2 tháng liên tiếp');
    return {ten:'Chi tieu VB 180', tieuDe:'ĐỐI CHIẾU CHỈ TIÊU CỦNG CỐ, NÂNG CAO CHẤT LƯỢNG TÍN DỤNG (CV 180/NHCS-KHTD)', ngay:mK.hien ? 'Đến ngày '+mK.hien.phu : N.ngay,
      html:'<div class="bc-tom">'+tom+'</div><table class="bc-bang"><thead>'+th+'</thead><tbody>'+body+'</tbody></table>'+
        '<div class="bc-ghi">ĐG: ✓ đạt · ✗ chưa đạt · trống = chưa đủ số liệu. Chưa có nguồn trong app: điểm chất lượng hoạt động giao dịch xã (≥ 97); lãi tồn giảm so đầu năm / món giải ngân mới từ 01/01 có lãi tồn.</div>', aoa:aoa}; };
  if(typeof SK_NHOM!=='undefined' && !SK_NHOM.some(function(n){ return n.k==='ct180'; })) SK_NHOM.unshift({k:'ct180', ten:'🎯 Chỉ tiêu VB 180'});
  SK_BC.push({k:'ct180', ten:'Đối chiếu toàn bộ chỉ tiêu VB 180 — Toàn PGD, xã, điểm GD (1 trang)', nhom:'ct180', kho:'ngang', lap:function(){ return M.lap(); }});
  DBT.dangKyBC('ct180', ['khd', 'qh', 'kn']);
  return M;
})();
