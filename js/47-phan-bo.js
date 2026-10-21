/* ===== P1 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md): 🎯 PHÂN BỔ KẾ HOẠCH — LÕI NGHIỆP VỤ (tiền tố pb) =====
   Chuyển nguyên logic bản WPF "Phân bổ kế hoạch" v9.20 (đã kiểm 45 QĐ thật). CHỈ TÍNH — không vẽ, không đọc ô nhập, không lưu.
   Quy tắc: QT-15 (phân bổ theo TỪNG QĐ, 2 cách chia, số giao chẵn — 1 ấp lẻ, giảm không âm, chính xác = dư nợ thật + chênh dồn 1 ấp),
            QT-16 (Biểu 07 bắt buộc khớp Đã giao / Tăng giảm / Đến 31/12), QT-17 (gợi ý Đã giao theo QĐ trước, đầu năm theo QĐ đầu tiên nhắc CT).
   Đơn vị: TRIỆU ĐỒNG (QĐ); dư nợ Mẫu 31 (đồng) đổi sang triệu ở pbDuNoXa.
   Dữ liệu vào:
     QĐ  = {id, so, kyHieu, ngay 'yyyy-mm-dd', nguon 1|2, loai 'Giao mới'|'Điều chỉnh', dot, xa (mã), tenXa, luc, ct:[{ma '03', ten, daGiao, tangGiam, den3112}]}
     ấp  = [{k (mã thôn / khóa), ten (tên in, đã có tiền tố Ấp / Kp)}] — thứ tự = thứ tự in
     dư nợ của xã = [{k (khóa ấp), ten, ct '03', nguon 1|2, dn (triệu)}]
     cấu hình = {buocTD:100, buocCX:50, soApToiDa:10}
   Kết quả 1 CT: {ma, ten, so, daGiaoXa, den3112Xa, loiNhap, canhBao, suaTay, ap:[{k, ten, truoc, dc, nam, dnThat|null, suaTay}]} — xem pbKiem(k). */
var PB_CH_MD = {buocTD:100, buocCX:50, soApToiDa:10}, PB_AP_CHUA_RO = '(Chưa rõ ấp)';
function pbR(x){ return Math.round((+x || 0)*10000)/10000; }   /* làm tròn 4 số lẻ — tránh sai số số thực khi cộng triệu đồng */
function pbSum(a, f){ var s = 0; for(var i=0;i<a.length;i++) s += f ? f(a[i]) : a[i]; return pbR(s); }
function pbSo(v){ return v==null || v==='' || isNaN(+v) ? null : +v; }
function pbCH(ch){ ch = ch || {}; var r = {}; for(var k in PB_CH_MD) r[k] = ch[k]>0 ? +ch[k] : PB_CH_MD[k]; if(r.buocCX < 10) r.buocCX = PB_CH_MD.buocCX; r.soApToiDa = Math.max(1, Math.floor(r.soApToiDa)); return r; }
function pbNguon(v){   /* 1 = TW, 2 = ĐP, 0 = không rõ — nhận cả số lẫn chữ */
  var s = String(v==null ? '' : v).trim(); if(/^\d+$/.test(s)) return +s;
  s = s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[\s.]/g, '');
  return s==='tw' || s.indexOf('trunguong')===0 ? 1 : s==='dp' || s.indexOf('diaphuong')===0 ? 2 : 0; }
function pbLaGiaoMoi(qd){ return /giao mới/i.test(String((qd && qd.loai) || '')); }

/* ---------- QT-15.1 dòng CT nào phải phân bổ ---------- */
function pbSoCanPhanBo(qd, c){   /* → {so, giaoMoi} | null (dòng chỉ có số dư, không giao gì) */
  var tg = pbSo(c.tangGiam), giaoMoi = tg==null || tg===0, so;
  if(giaoMoi){ var dg = pbSo(c.daGiao); if(!(pbLaGiaoMoi(qd) && (dg==null || dg===0))) return null; so = pbSo(c.den3112) || 0; }
  else so = tg;
  return so===0 ? null : {so:pbR(so), giaoMoi:giaoMoi};
}
/* QT-15.2 chỉ tiêu xã trước QĐ (giao mới = 0) */
function pbXaTruoc(c, so, giaoMoi){
  if(giaoMoi) return 0; var dg = pbSo(c.daGiao);
  return Math.max(0, pbR(dg!=null ? dg : (pbSo(c.den3112) || 0) - so)); }
/* QT-16 QĐ tự mâu thuẫn: Đã giao + Tăng/giảm ≠ Đến 31/12 → chuỗi lỗi | '' */
function pbKiemNhapQD(c){
  var den = pbSo(c.den3112), dg = pbSo(c.daGiao), tg = pbSo(c.tangGiam);
  if(den==null || (dg==null && tg==null)) return '';
  var t = pbR((dg || 0) + (tg || 0)); if(t===pbR(den)) return '';
  return 'QĐ nhập lệch: Đã giao '+pbSoVN(dg || 0)+' + Tăng/giảm '+pbSoDau(tg || 0)+' = '+pbSoVN(t)+' ≠ Đến 31/12 '+pbSoVN(den)+' — sửa ở danh sách QĐ.';
}
function pbSoVN(v){ v = pbR(v); var am = v<0; v = Math.abs(v); var p = String(v).split('.'); return (am ? '−' : '')+p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')+(p[1] ? ','+p[1] : ''); }
function pbSoDau(v){ v = pbR(v); return v===0 ? '0' : (v>0 ? '+' : '')+pbSoVN(v); }

/* ---------- thuật toán chia ---------- */
/* TƯƠNG ĐỐI: tối đa nToiDa phần, chẵn bước, chênh ≤ 1 bước, phần lẻ < 1 bước vào phần CUỐI, cùng dấu tổng */
function pbChiaDeu(tong, nToiDa, buoc){
  tong = pbR(tong); buoc = buoc>0 ? buoc : 100; var kq = []; if(tong===0) return kq;
  var dau = tong<0 ? -1 : 1, val = Math.abs(tong); if(val <= buoc) return [tong];
  var soBuoc = Math.floor(pbR(val/buoc)), le = pbR(val - soBuoc*buoc), n = Math.min(soBuoc, Math.max(1, nToiDa)),
    moi = Math.floor(soBuoc/n), du = soBuoc - moi*n;
  for(var i=0;i<n;i++) kq.push((moi + (i<du ? 1 : 0))*buoc);
  if(le>0) kq[kq.length-1] = pbR(kq[kq.length-1] + le);
  return kq.map(function(x){ return pbR(x*dau); });
}
/* CHÍNH XÁC: theo tỷ lệ dư nợ, chẵn bước, phần dư lớn nhất; phần lẻ < 1 bước vào ấp dư nợ lớn nhất. ds = [{k, dn>0}] → [số] cùng thứ tự ds */
function pbChiaTyLe(tong, ds, buoc){
  tong = pbR(tong); buoc = buoc>0 ? buoc : 1;
  var co = ds.filter(function(a){ return a.dn>0; }); if(!co.length) return ds.map(function(){ return 0; });
  var dau = tong<0 ? -1 : 1, val = Math.abs(tong), tongDn = pbSum(co, function(a){ return a.dn; }),
    soBuoc = Math.floor(pbR(val/buoc)), le = pbR(val - soBuoc*buoc);
  var phan = co.map(function(a){ return soBuoc*a.dn/tongDn; }), nguyen = phan.map(function(p){ return Math.floor(pbR(p)); }),
    conLai = soBuoc - nguyen.reduce(function(s, x){ return s+x; }, 0);
  var thu = co.map(function(a, i){ return i; }).sort(function(i, j){ var d = (phan[j]-nguyen[j]) - (phan[i]-nguyen[i]); return Math.abs(d)>1e-9 ? d : co[j].dn - co[i].dn || i - j; });
  for(var t=0;t<conLai && t<thu.length;t++) nguyen[thu[t]]++;
  var iLon = 0; co.forEach(function(a, i){ if(a.dn > co[iLon].dn) iLon = i; });
  var v = co.map(function(a, i){ return pbR(dau*(nguyen[i]*buoc + (i===iLon ? le : 0))); }), j = 0;
  return ds.map(function(a){ return a.dn>0 ? v[j++] : 0; });
}
/* CHÍNH XÁC — chỉ tiêu trước: mọi ấp = đúng dư nợ thật; chênh (Đã giao − tổng dư nợ) dồn ấp dư nợ lớn nhất (âm: trừ dần, không ấp nào âm) */
function pbDuNoThatChenh(dnThat, daGiao){
  var kq = dnThat.slice(), chenh = pbR(daGiao - pbSum(kq)); if(!chenh || !kq.length) return kq;
  var thu = kq.map(function(x, i){ return i; }).sort(function(i, j){ return kq[j]-kq[i] || i-j; });
  if(chenh>0){ kq[thu[0]] = pbR(kq[thu[0]] + chenh); return kq; }
  for(var t=0;t<thu.length && chenh<0;t++){ var i = thu[t], lay = Math.min(kq[i], -chenh); kq[i] = pbR(kq[i]-lay); chenh = pbR(chenh+lay); }
  if(chenh) kq[thu[0]] = pbR(kq[thu[0]] + chenh);   /* Đã giao âm (QĐ sai) — vẫn giữ tổng */
  return kq;
}
/* QT-15.5 giảm không âm, dồn theo bước — sửa tại chỗ dc; trả false nếu tổng giảm > tổng chỉ tiêu */
function pbGioiHanGiam(dc, truoc, buoc){
  buoc = buoc>0 ? buoc : 1; var vuot = 0, i, n = dc.length;
  function con(x){ return pbR(truoc[x] + dc[x]); }
  function lonNhat(nguong){ var b = -1; for(var x=0;x<n;x++) if(con(x) >= nguong && (b<0 || con(x) > con(b))) b = x; return b; }
  for(i=0;i<n;i++) if(con(i) < 0){ var moi = -Math.floor(pbR(Math.max(0, truoc[i])/buoc))*buoc; vuot = pbR(vuot + moi - dc[i]); dc[i] = moi; }
  if(vuot===0) return true;
  for(i=0;i<n;i++){ var le = pbR((-dc[i]) % buoc); if(dc[i]<0 && le){ dc[i] = pbR(dc[i]+le); vuot = pbR(vuot+le); } }   /* gom lẻ sẵn có → cuối cùng chỉ 1 ấp lẻ */
  while(vuot >= buoc){ i = lonNhat(buoc); if(i<0) break; dc[i] = pbR(dc[i]-buoc); vuot = pbR(vuot-buoc); }
  if(vuot>0){ i = lonNhat(vuot); if(i>=0){ dc[i] = pbR(dc[i]-vuot); vuot = 0; } }
  var thu = dc.map(function(x, k){ return k; }).sort(function(a, b){ return con(b)-con(a) || a-b; });
  for(var t=0;t<thu.length && vuot>0;t++){ var lay = Math.min(Math.max(0, con(thu[t])), vuot); dc[thu[t]] = pbR(dc[thu[t]]-lay); vuot = pbR(vuot-lay); }
  if(vuot<=0) return true;
  if(n) dc[0] = pbR(dc[0]-vuot);
  return false;
}

/* ---------- phân bổ 1 QĐ (1 xã) ---------- */
function pbKetQua(c, x, ap, truoc, dc, canhBao, buoc){
  var du = pbGioiHanGiam(dc, truoc, buoc);
  if(!du) canhBao = (canhBao ? canhBao+' ' : '')+'Tổng GIẢM lớn hơn chỉ tiêu hiện có của các ấp → có ấp bị âm, kiểm tra lại số QĐ / dữ liệu.';
  var den = pbSo(c.den3112);
  return {ma:c.ma, ten:c.ten || '', so:x.so, daGiaoXa:x.xaTruoc, den3112Xa:den!=null ? pbR(den) : pbR(x.xaTruoc + x.so), loiNhap:pbKiemNhapQD(c), canhBao:canhBao || '', suaTay:false,
    ap:ap.map(function(a, i){ return {k:a.k, ten:a.ten, truoc:truoc[i], dc:dc[i], nam:pbR(truoc[i]+dc[i]), dnThat:null, suaTay:false}; })};
}
function pbChiaDeuCT(qd, c, x, ap, ch, canhBao){
  var coAp = ap && ap.length;
  var phan = pbChiaDeu(x.so, coAp ? Math.min(ap.length, ch.soApToiDa) : ch.soApToiDa, ch.buocTD);
  if(!coAp){
    ap = phan.map(function(v, i){ return {k:'dv'+(i+1), ten:'Đơn vị '+(i+1)}; });
    canhBao = 'Xã "'+(qd.tenXa || qd.xa || '')+'" chưa có danh sách ấp (kiểm tra tên xã khớp Mẫu 31) — tạm chia cho "Đơn vị".'+(canhBao ? ' '+canhBao : '');
  }
  var dc = ap.map(function(a, i){ return i<phan.length ? phan[i] : 0; });
  var chiaTruoc = pbChiaDeu(x.xaTruoc, Math.max(1, ap.length), ch.buocTD);   /* chỉ tiêu trước: Đã giao chia đều chẵn bước (1 ấp lẻ) */
  var truoc = ap.map(function(a, i){ return i<chiaTruoc.length ? chiaTruoc[i] : 0; });
  return pbKetQua(c, x, ap, truoc, dc, canhBao, ch.buocTD);
}
/* opts = {cheDo:'td'|'cx', ap:[{k, ten}], duNo:[{k, ten, ct, nguon, dn triệu}] (chỉ xã của QĐ), ch} → [kết quả CT] */
function pbPhanBo(qd, opts){
  opts = opts || {}; var ch = pbCH(opts.ch), ap = opts.ap || [], kq = [];
  (qd.ct || []).forEach(function(c){
    var s = pbSoCanPhanBo(qd, c); if(!s) return;
    var x = {so:s.so, giaoMoi:s.giaoMoi, xaTruoc:pbXaTruoc(c, s.so, s.giaoMoi)};
    if(opts.cheDo!=='cx'){ kq.push(pbChiaDeuCT(qd, c, x, ap, ch, '')); return; }
    var nv = +qd.nguon, gom = {}, thu = [];
    (opts.duNo || []).forEach(function(d){ if(d.ct!==c.ma || +d.nguon!==nv || !(d.dn>0)) return; var k = d.k || PB_AP_CHUA_RO;
      if(!gom[k]){ gom[k] = {k:k, ten:d.ten || PB_AP_CHUA_RO, dong:0}; thu.push(k); } gom[k].dong += Math.round(d.dn*1e6); });   /* cộng theo ĐỒNG (số nguyên) — không dồn sai số */
    gom = Object.keys(gom).reduce(function(o, k){ gom[k].dn = gom[k].dong/1e6; if(gom[k].dn>0) o[k] = gom[k]; return o; }, {}); thu = thu.filter(function(k){ return gom[k]; });
    if(!thu.length){ kq.push(pbChiaDeuCT(qd, c, x, ap, ch, 'Chương trình chưa có dư nợ ở xã trong kỳ đã chọn → đã CHIA ĐỀU như chế độ tương đối.')); return; }
    /* ấp có dư nợ (theo thứ tự danh sách ấp; ấp không có trong danh sách xếp cuối nhóm theo tên) + các ấp còn lại (dư nợ 0, để chỉnh tay) */
    var viTri = {}; ap.forEach(function(a, i){ viTri[a.k] = i; });
    var coDn = thu.map(function(k){ return gom[k]; }).sort(function(a, b){ var ia = viTri[a.k], ib = viTri[b.k];
      if(ia!=null && ib!=null) return ia-ib; if(ia!=null) return -1; if(ib!=null) return 1; return String(a.ten).localeCompare(String(b.ten), 'vi'); });
    var dsAp = coDn.map(function(a){ var t = ap[viTri[a.k]]; return {k:a.k, ten:t ? t.ten : a.ten}; })
      .concat(ap.filter(function(a){ return !gom[a.k]; }));
    var la = coDn.filter(function(a){ return viTri[a.k]==null; });   /* dư nợ không gắn được ấp trong danh mục (thôn trống / lạ) → xếp cuối + cảnh báo */
    var canhBaoLa = la.length ? 'Có dư nợ không gắn được ấp trong danh mục xã: '+la.map(function(a){ return a.ten+' '+pbSoVN(Math.round(a.dn)); }).join(', ')+
      ' triệu — kiểm tra tên thôn trong Mẫu 31 / danh mục ấp trước khi xuất Biểu 07.' : '';
    var dnThat = dsAp.map(function(a){ return gom[a.k] ? Math.round(gom[a.k].dn) : 0; });   /* ,5 làm tròn lên (như Excel) */
    var truoc = x.giaoMoi ? dsAp.map(function(){ return 0; }) : pbDuNoThatChenh(dnThat, x.xaTruoc);
    var chia = pbChiaTyLe(x.so, coDn, ch.buocCX), dc = dsAp.map(function(a, i){ return i<chia.length ? chia[i] : 0; });
    var r = pbKetQua(c, x, dsAp, truoc, dc, canhBaoLa, ch.buocCX);
    r.ap.forEach(function(a, i){ a.dnThat = dnThat[i]; });
    kq.push(r);
  });
  return kq;
}
/* Sửa tay tăng / giảm 1 ấp (QT-15.6) — chỉ tiêu năm tính lại; khớp / âm xem bằng pbKiem */
function pbSuaTay(k, i, v){ var a = k.ap[i]; if(!a || pbR(v)===a.dc) return; a.dc = pbR(v); a.nam = pbR(a.truoc + a.dc); a.suaTay = true; k.suaTay = true; }
/* QT-16: kiểm 1 kết quả CT → {tongDc, tongTruoc, tongNam, khop, khopDaGiao, khopDen, coAm, xuatDuoc, lyDo:[…]} */
function pbKiem(k){
  var tDc = pbSum(k.ap, function(a){ return a.dc; }), tTr = pbSum(k.ap, function(a){ return a.truoc; }), tNam = pbSum(k.ap, function(a){ return a.nam; });
  var r = {tongDc:tDc, tongTruoc:tTr, tongNam:tNam, khop:tDc===pbR(k.so), khopDaGiao:tTr===pbR(k.daGiaoXa), khopDen:tNam===pbR(k.den3112Xa),
    coAm:k.ap.some(function(a){ return a.nam<0; }), lyDo:[]};
  if(k.loiNhap) r.lyDo.push(k.loiNhap);
  if(!r.khop) r.lyDo.push('Tổng tăng/giảm các ấp '+pbSoDau(tDc)+' ≠ QĐ '+pbSoDau(k.so)+' (lệch '+pbSoDau(tDc-k.so)+')');
  if(!r.khopDaGiao) r.lyDo.push('Tổng chỉ tiêu trước các ấp '+pbSoVN(tTr)+' ≠ Đã giao '+pbSoVN(k.daGiaoXa));
  if(r.khop && r.khopDaGiao && !r.khopDen) r.lyDo.push('Tổng chỉ tiêu năm các ấp '+pbSoVN(tNam)+' ≠ Đến 31/12 '+pbSoVN(k.den3112Xa));
  r.xuatDuoc = !r.lyDo.length;
  return r;
}
function pbApCoThayDoi(k){ return k.ap.filter(function(a){ return a.dc!==0; }); }   /* Biểu 07 chỉ in ấp có tăng / giảm */

/* ---------- QT-17 nhập QĐ: gợi ý "Đã giao" + tổng hợp đầu năm ---------- */
/* → {v (triệu) | null, moTa, tuQD} — "Đến 31/12" QĐ gần nhất trước (cùng xã + CT + nguồn, cùng năm, ngày ≤, bỏ boQua[id]); không có → dư nợ 31/12 năm trước (duNoNamTruoc triệu | null) */
function pbGoiYDaGiao(dsQD, xa, ct, nguon, ngay, boQua, duNoNamTruoc){
  var nam = String(ngay || '').slice(0, 4), tot = null, tc = null;
  (dsQD || []).forEach(function(q){
    if(q.xa!==xa || +q.nguon!==+nguon || String(q.ngay).slice(0, 4)!==nam || String(q.ngay) > String(ngay) || (boQua && boQua.indexOf(q.id)>=0)) return;
    var c = (q.ct || []).filter(function(x){ return x.ma===ct; })[0]; if(!c) return;
    if(!tot || q.ngay > tot.ngay || (q.ngay===tot.ngay && String(q.luc || '') >= String(tot.luc || ''))){ tot = q; tc = c; } });
  if(tot){ var den = pbSo(tc.den3112); return {v:den!=null ? pbR(den) : pbR((pbSo(tc.daGiao) || 0) + (pbSo(tc.tangGiam) || 0)), moTa:'QĐ '+tot.so+' ('+String(tot.ngay).slice(8, 10)+'/'+String(tot.ngay).slice(5, 7)+')', tuQD:true}; }
  if(duNoNamTruoc!=null) return {v:Math.round(duNoNamTruoc), moTa:'dư nợ 31/12/'+(+nam-1), tuQD:false};
  return {v:null, moTa:'', tuQD:false};
}
/* đầu năm theo QĐ: (xã|ct|nguồn) → {daGiaoDau, khCuoiNam, tongTG, qdDau, qdCuoi, soQD} */
function pbTongHopCT(dsQD, nam){
  var g = {}; (dsQD || []).filter(function(q){ return String(q.ngay).slice(0, 4)===String(nam); })
    .sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : String(a.luc || '') < String(b.luc || '') ? -1 : 1; })
    .forEach(function(q){ (q.ct || []).forEach(function(c){ var k = q.xa+'|'+c.ma+'|'+q.nguon; (g[k] = g[k] || []).push({q:q, c:c}); }); });
  var kq = {};
  Object.keys(g).forEach(function(k){
    var ds = g[k], dau = ds[0].c, cuoi = ds[ds.length-1].c, dg = pbSo(dau.daGiao), tg = pbSum(ds, function(x){ return pbSo(x.c.tangGiam) || 0; });
    var daGiaoDau = dg!=null ? pbR(dg) : pbR((pbSo(dau.den3112) || 0) - (pbSo(dau.tangGiam) || 0)), den = pbSo(cuoi.den3112);
    kq[k] = {daGiaoDau:daGiaoDau, khCuoiNam:den!=null ? pbR(den) : pbR(daGiaoDau + tg), tongTG:tg, qdDau:ds[0].q.so, qdCuoi:ds[ds.length-1].q.so, soQD:ds.length}; });
  return kq;
}
/* kỳ dư nợ cho chế độ chính xác: kỳ chọn | kỳ gần nhất ≤ ngày QĐ (kỳ tháng 'yyyy-mm' tính ngày cuối tháng) | kỳ mới nhất */
function pbNgayKy(ky){ ky = String(ky || ''); if(ky.length>7) return ky.slice(0, 10); var y = +ky.slice(0, 4), m = +ky.slice(5, 7); var d = new Date(Date.UTC(y, m, 0)); return ky+'-'+('0'+d.getUTCDate()).slice(-2); }
function pbChonKy(dsKy, ngayQD, kyChon){
  if(kyChon && dsKy.indexOf(kyChon)>=0) return {ky:kyChon, moTa:'bạn chọn'};
  var ds = dsKy.slice().sort(function(a, b){ return pbNgayKy(a) < pbNgayKy(b) ? -1 : 1; }), truoc = ds.filter(function(k){ return pbNgayKy(k) <= String(ngayQD); });
  if(truoc.length) return {ky:truoc[truoc.length-1], moTa:'tự lấy — gần nhất trước QĐ'};
  return ds.length ? {ky:ds[ds.length-1], moTa:'tự lấy — không có kỳ nào trước QĐ, dùng mới nhất'} : null;
}
/* dư nợ 1 xã (từ KHO.duNoAp) → [{k: mã thôn, ten: tên thôn, ct, nguon, dn triệu}] */
function pbDuNoXa(D, xa){ return D && D.ds ? D.ds.filter(function(d){ return d.xa===xa; }).map(function(d){ return {k:d.thon, ten:d.tenThon, ct:d.ct, nguon:d.nguon, dn:d.dn/1e6}; }) : []; }

/* ---------- tiện ích cho giao diện (vẫn thuần, không DOM) ---------- */
/* tên ấp in Biểu 07: phường → "Kp …", xã → "Ấp …"; tên đã có tiền tố thì giữ */
function pbTenAp(tenXa, tenThon){
  var t = String(tenThon || '').replace(/\s+/g, ' ').trim(); if(!t) return PB_AP_CHUA_RO;
  if(/^(ấp|kp|khu phố|khóm|thôn)\s/i.test(t)) return t;
  return (/phường/i.test(String(tenXa || '')) ? 'Kp ' : 'Ấp ')+t; }
function pbBoDau(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/\s+/g, ' ').trim(); }
/* ghép tên xã (vd từ file WPF "Xã Phước Thạnh") với danh sách xã [{ma, ten}] — bỏ dấu, bỏ chữ "xã / phường / thị trấn" → mã | '' */
function pbKhopXa(ten, dsXa){
  var bo = function(s){ return pbBoDau(s).replace(/^(xa|phuong|thi tran|tt)\s+/, ''); }, a = bo(ten), kq = '';
  if(!a) return '';
  (dsXa || []).forEach(function(x){ if(!kq && (bo(x.ten)===a || pbBoDau(x.ten)===pbBoDau(ten))) kq = x.ma; });
  return kq; }
/* đọc số anh gõ: "1.500" · "1500" · "+1.500" · "−200" · "1.234,5" · "1,234.5" → số | null (trống / không phải số) */
function pbDocSo(s){
  if(typeof s==='number') return isNaN(s) ? null : s;
  s = String(s==null ? '' : s).replace(/\s| /g, '').replace(/−/g, '-'); if(!s) return null;
  var cham = s.lastIndexOf('.'), phay = s.lastIndexOf(',');
  if(cham>=0 && phay>=0){ var tp = cham>phay ? '.' : ','; s = s.split(tp==='.' ? ',' : '.').join('').replace(tp, '.'); }
  else if(cham>=0 || phay>=0){ var d = cham>=0 ? '.' : ',', n = s.split(d).length-1, vt = s.lastIndexOf(d), truoc = s.slice(0, vt).replace(/^[+-]/, '');
    s = (n>1 || (s.length-vt-1===3 && truoc && truoc!=='0')) ? s.split(d).join('') : s.replace(d, '.'); }
  return /^[+-]?\d+(\.\d+)?$/.test(s) ? +s : null; }

/* ---------- nhập QĐ từ file sao lưu .json của bản WPF ("SaoLuu_QD_*.json") ---------- */
function pbTuWPF(j){   /* → [QĐ] (xa chưa có mã — ghép theo tên ở bước nhập) */
  var ds = j && (j.DanhSachQD || j.danhSachQD); if(!Array.isArray(ds)) throw new Error('File không phải sao lưu QĐ của app Phân bổ kế hoạch (thiếu "DanhSachQD")');
  return ds.map(function(q){ return {id:String(q.Id || '') || ('wpf'+Math.random().toString(36).slice(2)), so:String(q.SoQD || '').trim(), kyHieu:String(q.KyHieuVanBan || '').trim(),
    ngay:String(q.NgayQD || '').slice(0, 10), nguon:+q.NguonVon===2 ? 2 : 1, loai:String(q.Loai || ''), dot:String(q.Dot || ''), xa:'', tenXa:String(q.TenXa || '').replace(/\s+/g, ' ').trim(),
    luc:String(q.NgayGhiNhan || ''), ct:(q.ChiTiet || []).map(function(c){ return {ma:('0'+(+c.MaChuongTrinh || 0)).slice(-2), ten:String(c.TenChuongTrinh || ''),
      daGiao:pbSo(c.ChiTieuDaGiao), tangGiam:pbSo(c.GiaoTangGiam), den3112:pbSo(c.ChiTieuDen3112)}; })}; });
}

/* ---------- 3.289 P3: dữ liệu Biểu 07 Phân bổ KH (QT-16) — thuần, mẫu in ở js/mau/07pb.js ---------- */
/* ngày thông báo = ngày QĐ + ch.ngayTB (mặc định 1), né thứ 7 / CN (ch.neCuoiTuan !== false) — như bản WPF */
function pbNgayTB(ngayQD, ch){
  ch = ch || {}; var m = String(ngayQD || '').match(/^(\d{4})-(\d{2})-(\d{2})/); if(!m) return '';
  var n = ch.ngayTB==null || ch.ngayTB==='' || isNaN(+ch.ngayTB) ? 1 : Math.max(0, Math.floor(+ch.ngayTB)), d = new Date(Date.UTC(+m[1], +m[2]-1, +m[3]+n));
  while(ch.neCuoiTuan!==false && (d.getUTCDay()===6 || d.getUTCDay()===0)) d.setUTCDate(d.getUTCDate()+1);
  return d.toISOString().slice(0, 10); }
/* tên đơn vị in: "Xã A" / "A" / "Phường B" → {cap, thuong 'xã A', hoa 'XÃ A', laPhuong, apKp 'ấp' | 'khu phố'} */
function pbDonVi(tenXa){
  var t = String(tenXa || '').replace(/\s+/g, ' ').trim(), cap = /^phường\s/i.test(t) ? 'phường' : /^thị trấn\s/i.test(t) ? 'thị trấn' : 'xã';
  var ten = t.replace(/^(xã|phường|thị trấn)\s+/i, ''), th = cap+(ten ? ' '+ten : '');
  return {cap:cap, thuong:th, hoa:th.toUpperCase(), laPhuong:cap==='phường', apKp:cap==='phường' ? 'khu phố' : 'ấp'}; }
/* QĐ 1 xã + kết quả phân bổ → dữ liệu Biểu 07 | {loi:[…]} khi chưa khớp QĐ (QT-16 — CHẶN xuất).
   Ấp theo thứ tự gặp đầu tiên (CT theo thứ tự QĐ), mỗi ấp chỉ các CT có tăng / giảm ≠ 0 (như bản WPF). */
function pbBieu07DL(q, kq, tenCT){
  var loi = [], am = [];
  if(!kq || !kq.length) loi.push('QĐ không có chương trình nào cần phân bổ');
  (kq || []).forEach(function(k){ var r = pbKiem(k); r.lyDo.forEach(function(l){ loi.push(k.ma+': '+l); }); if(r.coAm) am.push(k.ma); });
  if(loi.length) return {loi:loi};
  var theo = {}, thu = [];
  kq.forEach(function(k){ var ten = k.ten || (tenCT ? tenCT(k.ma) : '') || 'Chương trình '+k.ma;
    pbApCoThayDoi(k).forEach(function(a){ var kk = a.k+'|'+a.ten; if(!theo[kk]){ theo[kk] = {ten:a.ten, ds:[]}; thu.push(kk); } theo[kk].ds.push({ma:k.ma, ten:ten, dc:a.dc, nam:a.nam}); }); });
  var dv = pbDonVi(q.tenXa || q.xa);
  return {loi:[], coAm:am, dv:dv, laDC:/điều chỉnh/i.test(String(q.loai || '')), nam:String(q.ngay || '').slice(0, 4), so:String(q.so || '').trim(), kyHieu:String(q.kyHieu || '').trim(), ngayQD:String(q.ngay || '').slice(0, 10),
    nguon:+q.nguon===2 ? 2 : 1, ap:thu.map(function(kk){ return theo[kk]; })}; }

/* ---------- 3.301: ĐỐI CHIẾU CHÉO (anh 21/10: "tại mỗi QĐ tổng giao của Biểu 07 phải khớp số giao của QĐ và dư nợ đến cuối năm cũng khớp theo QĐ") ----------
   Theo (xã, CT, nguồn) trong năm, các QĐ theo ngày (rồi lúc ghi):
   ① từng QĐ: Đã giao + Tăng/giảm = Đến 31/12 (nhập QĐ) · Biểu 07 (phân bổ lại theo cách chia đang chọn): Σ tăng/giảm các ấp = số giao QĐ, Σ chỉ tiêu năm = Đến 31/12, Σ chỉ tiêu trước = Đã giao
   ② chuỗi: Đã giao QĐ sau = Đến 31/12 QĐ trước (đứt chuỗi) · ③ đầu năm (bản WPF chiều 1): Đã giao QĐ đầu năm ↔ dư nợ 31/12 năm trước · ④ cuối năm (chiều 2): Đã giao đầu + Σ tăng/giảm ↔ Đến 31/12 QĐ cuối
   tinhKQ(q) → kết quả pbPhanBo của QĐ 1 xã | null (chưa có ấp) · dnDau(xa, ct, nguon) → triệu | null · nguong: lệch ≤ ngưỡng coi như khớp ở ② ③ ④ (mặc định 1 triệu như bản WPF); ① so đúng tuyệt đối */
function pbDoiChieu(dsQD, nam, tinhKQ, dnDau, nguong){
  nguong = nguong==null ? 1 : +nguong; var g = {}, thu = [], kqQD = {}, chuaGhep = 0;
  (dsQD || []).filter(function(q){ var ok = String(q.ngay).slice(0, 4)===String(nam); if(ok && !q.xa){ chuaGhep++; return false; } return ok; })   /* 3.308 L3: QĐ chưa ghép xã — bỏ, báo */
    .sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : String(a.luc || '') < String(b.luc || '') ? -1 : String(a.luc || '') > String(b.luc || '') ? 1 : 0; })
    .forEach(function(q){ (q.ct || []).forEach(function(c){ var k = q.xa+'|'+c.ma+'|'+q.nguon; if(!g[k]){ g[k] = []; thu.push(k); } g[k].push({q:q, c:c}); }); });
  var lech = function(a, b){ return a==null || b==null ? null : pbR(a - b); }, vuot = function(l){ return l!=null && Math.abs(l) > nguong; };
  var tong = {nhom:0, dong:0, loi:0};
  var dong = thu.map(function(k){
    var ds = g[k], q0 = ds[0].q, c0 = ds[0].c, truoc = null, sTG = 0, loiNhom = 0;
    var dong1 = ds.map(function(x, i){
      var q = x.q, c = x.c, dg = pbSo(c.daGiao), tg = pbSo(c.tangGiam) || 0, den = pbSo(c.den3112), lyDo = [];
      var denT = den!=null ? pbR(den) : pbR((dg || 0) + tg);
      var loiNhap = pbKiemNhapQD(c); if(loiNhap) lyDo.push(loiNhap);
      var dut = i>0 && dg!=null && truoc!=null ? lech(dg, truoc) : null; if(vuot(dut)) lyDo.push('Đã giao '+pbSoVN(dg)+' ≠ Đến 31/12 QĐ trước '+pbSoVN(truoc)+' (đứt chuỗi '+pbSoDau(dut)+')');
      var b07 = null, s = pbSoCanPhanBo(q, c);
      if(s){ if(!kqQD.hasOwnProperty(q.id)) kqQD[q.id] = tinhKQ ? tinhKQ(q) : null;
        var kq = kqQD[q.id], kk = kq ? kq.filter(function(y){ return y.ma===c.ma; })[0] : null;
        if(!kk) b07 = {chua:true};
        else { var r = pbKiem(kk); b07 = {truoc:r.tongTruoc, dc:r.tongDc, nam:r.tongNam, so:kk.so, daGiao:kk.daGiaoXa, den:kk.den3112Xa, khopGiao:r.khop, khopDen:r.khopDen, khopDaGiao:r.khopDaGiao, coAm:r.coAm};
          if(!r.khop) lyDo.push('Biểu 07: Σ tăng/giảm '+pbSoDau(r.tongDc)+' ≠ số giao QĐ '+pbSoDau(kk.so));
          if(!r.khopDen) lyDo.push('Biểu 07: Σ chỉ tiêu năm '+pbSoVN(r.tongNam)+' ≠ Đến 31/12 '+pbSoVN(kk.den3112Xa));
          if(!r.khopDaGiao) lyDo.push('Biểu 07: Σ chỉ tiêu trước '+pbSoVN(r.tongTruoc)+' ≠ Đã giao '+pbSoVN(kk.daGiaoXa));
          if(r.coAm) lyDo.push('Biểu 07: có ấp chỉ tiêu năm âm'); } }
      truoc = denT; sTG = pbR(sTG + tg); if(lyDo.length) loiNhom++;
      return {q:q, c:c, daGiao:dg, tangGiam:tg, den:den, dut:dut, b07:b07, lyDo:lyDo, ok:!lyDo.length}; });
    var dgDau = pbSo(c0.daGiao)!=null ? pbR(pbSo(c0.daGiao)) : pbR((pbSo(c0.den3112) || 0) - (pbSo(c0.tangGiam) || 0));
    var dn = dnDau ? dnDau(q0.xa, c0.ma, q0.nguon) : null, lDau = dn==null ? null : lech(dgDau, Math.round(dn));
    var cuoi = ds[ds.length-1].c, denCuoi = pbSo(cuoi.den3112)!=null ? pbR(pbSo(cuoi.den3112)) : pbR(dgDau + sTG), tinh = pbR(dgDau + sTG), lCuoi = lech(tinh, denCuoi);
    var dau = {daGiao:dgDau, duNo:dn==null ? null : Math.round(dn), lech:lDau, ok:!vuot(lDau)}, ck = {tinh:tinh, den:denCuoi, tongTG:sTG, lech:lCuoi, ok:!vuot(lCuoi)};
    if(!dau.ok || !ck.ok) loiNhom++;
    tong.nhom++; tong.dong += dong1.length; if(loiNhom) tong.loi++;
    return {xa:q0.xa, tenXa:q0.tenXa || q0.xa, ma:c0.ma, ten:c0.ten || '', nguon:+q0.nguon, ds:dong1, dau:dau, cuoi:ck, ok:!loiNhom}; });
  dong.sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi') || (a.ma < b.ma ? -1 : a.ma > b.ma ? 1 : a.nguon - b.nguon); });
  tong.chuaGhep = chuaGhep;
  return {nam:String(nam), dong:dong, tong:tong};
}

/* ---------- DIỄN BIẾN PHÂN VỐN THEO KH (anh 21/10: "làm thêm diễn biến phân vốn … theo KH", giao diện web hiện đại) ----------
   loc = {xa:'' | mã, nguon:0 | 1 | 2, ct:'' | mã} · dn = {dau: f | null (dư nợ 31/12 năm trước), kyDau, thang:[{ky, f}] (Mẫu 31 các kỳ trong năm)} — f(xa, ct, nguon) → triệu | null
   3.302: dn.ds = [{xa, tenXa, ct, nguon}] các nhóm có dư nợ (Mẫu 31 kỳ cuối + 31/12 năm trước) → nhóm không có QĐ giao thành dòng khongGiao (KH trống, chỉ dư nợ)
   — 3.305: tổng dư nợ thực tế cộng MỌI CT để so KH · 3.305: KH của CT không giao = dư nợ 31/12 năm trước (3.308: chưa nạp Mẫu 31 kỳ 12 năm trước → KH trống + báo nạp, không lấy số thay) — cộng vào KH tổng, đường KH; dòng từng CT so riêng CT đó
   KH hiệu lực tại ngày d (1 nhóm xã · CT · nguồn) = Đến 31/12 của QĐ gần nhất có ngày ≤ d; trước QĐ đầu năm = Đã giao của QĐ đầu năm.
   → {nam, nhom:[{xa, tenXa, ma, ten, nguon, ds:[{q, c, daGiao, tangGiam, den}], dgDau, khCuoi, tongTG, dauNam, hienTai, conTH, pct}], theoXa:[…], thang:[{ky, kh, dn}], moc:[{so, ngay, loai, tg, kh, xa}], tong:{…}} */
function pbDienBien(dsQD, nam, loc, dn){
  loc = loc || {}; dn = dn || {}; var g = {}, thu = [], soQD = {}, chuaGhep = 0;
  (dsQD || []).filter(function(q){ var ok = String(q.ngay).slice(0, 4)===String(nam) && (!loc.xa || q.xa===loc.xa) && (!+loc.nguon || +q.nguon===+loc.nguon); if(ok && !q.xa){ chuaGhep++; return false; } return ok; })   /* 3.308 L3: QĐ chưa ghép xã không cộng (báo) */
    .sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : String(a.luc || '') < String(b.luc || '') ? -1 : 1; })
    .forEach(function(q){ (q.ct || []).forEach(function(c){ if(loc.ct && c.ma!==loc.ct) return; var k = q.xa+'|'+c.ma+'|'+q.nguon; if(!g[k]){ g[k] = []; thu.push(k); }
      var tg = pbSo(c.tangGiam) || 0, dg = pbSo(c.daGiao), den = pbSo(c.den3112);
      g[k].push({q:q, c:c, daGiao:dg, tangGiam:tg, den:den!=null ? pbR(den) : null}); soQD[String(q.so).trim()+'|'+String(q.ngay).slice(0, 10)+'|'+String(q.kyHieu || '').trim()] = q; }); });
  var kyCuoi = (dn.thang || []).length ? dn.thang[dn.thang.length-1] : null;
  var nhom = thu.map(function(k){
    var ds = g[k], q0 = ds[0].q, c0 = ds[0].c, dgDau = ds[0].daGiao!=null ? pbR(ds[0].daGiao) : pbR((ds[0].den || 0) - ds[0].tangGiam), chay = dgDau;
    ds.forEach(function(x){ chay = x.den!=null ? x.den : pbR(chay + x.tangGiam); x.denT = chay; });
    var dau = dn.dau ? dn.dau(q0.xa, c0.ma, q0.nguon) : null, ht = kyCuoi ? kyCuoi.f(q0.xa, c0.ma, q0.nguon) : null;
    /* 3.308 L4: giữ số chưa làm tròn — cộng xong mới làm tròn khi hiển thị (tổng khớp Mẫu 31) */
    return {xa:q0.xa, tenXa:q0.tenXa || q0.xa, ma:c0.ma, ten:c0.ten || '', nguon:+q0.nguon, ds:ds, dgDau:dgDau, khCuoi:chay, tongTG:pbSum(ds, function(x){ return x.tangGiam; }),
      dauNam:dau, moi:!!dn.dau && !(dau>0), hienTai:ht, conTH:ht==null ? null : pbR(chay - ht), pct:ht==null || !chay ? null : Math.round(ht/chay*1000)/10}; })
    .concat(pbDBKhongGiao(dn.ds, loc, g, dn.dau, kyCuoi, dn))   /* 3.302: CT có dư nợ mà không có QĐ giao → dòng "không giao" (anh đối chiếu đủ dư nợ) */
    .sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi') || (a.ma < b.ma ? -1 : a.ma > b.ma ? 1 : a.nguon - b.nguon); });
  /* 3.308 (anh 21/10 a): trước QĐ đầu tiên trong năm KH = DƯ NỢ ĐẦU NĂM (Đã giao trên QĐ lệch dư nợ đầu năm chỉ ghi nhận, không sửa); chưa có dư nợ đầu năm → Đã giao QĐ đầu */
  var khTai = function(n, d){ var v = n.dauNam!=null ? n.dauNam : n.dgDau; n.ds.forEach(function(x){ if(String(x.q.ngay).slice(0, 10) <= d) v = x.denT; }); return v; };
  var cong = function(ds, f){ var co = false, s = 0; ds.forEach(function(x){ var v = f(x); if(v!=null){ co = true; s += v; } }); return co ? pbR(s) : null; };
  var tom = function(ds){   /* 3.305 (anh 21/10 "so KH giao với dư nợ thực tế tại 1 thời điểm phải cộng tất cả các CT dù không có giao KH"): KH = Σ CT có giao; dư nợ thực tế = Σ MỌI CT → còn phải TH, % so tổng */
    var cg = ds.filter(function(n){ return !n.khongGiao; }), kh = cong(ds, function(n){ return n.khCuoi; }), ht = kyCuoi ? cong(cg, function(n){ return n.hienTai; }) : null, htAll = kyCuoi ? cong(ds, function(n){ return n.hienTai; }) : null;
    return {dauNam:dn.dau ? cong(cg, function(n){ return n.dauNam; }) : null, dauNamTatCa:dn.dau ? cong(ds, function(n){ return n.dauNam; }) : null, dgDau:cong(ds, function(n){ return n.dgDau; }), khCuoi:kh, khGiao:cong(cg, function(n){ return n.khCuoi; }), khKhongGiao:cong(ds.filter(function(n){ return n.khongGiao; }), function(n){ return n.khCuoi; }),
      tongTG:cong(cg, function(n){ return n.tongTG; }), hienTai:ht, hienTaiTatCa:htAll, khongGiao:htAll==null ? null : pbR(htAll - (ht || 0)), soKhongGiao:ds.length - cg.length,
      conTH:htAll==null || kh==null ? null : pbR(kh - htAll), pct:htAll==null || !kh ? null : Math.round(htAll/kh*1000)/10}; };
  var xaG = {}, xaThu = []; nhom.forEach(function(n){ if(!xaG[n.xa]){ xaG[n.xa] = []; xaThu.push(n.xa); } xaG[n.xa].push(n); });
  var theoXa = xaThu.map(function(x){ var t = tom(xaG[x]); t.xa = x; t.tenXa = xaG[x][0].tenXa; t.nhom = xaG[x]; return t; });
  var thang = [];
  /* 3.308: mỗi mốc cuối tháng — KH = Σ MỌI CT (có giao: Đến 31/12 QĐ gần nhất ≤ mốc, trước QĐ đầu = dư nợ đầu năm; không giao: dư nợ đầu năm) ↔ tổng dư nợ MỌI CT; giữ chi tiết từng nhóm (ct[i] theo thứ tự nhom) để xổ xã → CT */
  var mocThang = function(ky, d, fDN, dau){ var ct = nhom.map(function(n){ var v = fDN(n); return {kh:khTai(n, d), dn:v==null ? null : pbR(v)}; }), lay = function(f, kg){ return cong(nhom.filter(function(n){ return kg==null || !!n.khongGiao===kg; }), function(n){ return ct[nhom.indexOf(n)][f]; }); };
    return {ky:ky, kh:lay('kh'), dn:lay('dn'), khGiao:lay('kh', false), khKG:lay('kh', true), dnGiao:lay('dn', false), dnKG:lay('dn', true), ct:ct, dau:!!dau}; };
  if(dn.dau && dn.kyDau) thang.push(mocThang(dn.kyDau, pbNgayKy(dn.kyDau), function(n){ return n.dauNam; }, true));
  (dn.thang || []).forEach(function(t){ var d = pbNgayKy(t.ky);
    thang.push(mocThang(t.ky, d, function(n){ return t.f(n.xa, n.ma, n.nguon); })); });
  var moc = Object.keys(soQD).map(function(k){ var q = soQD[k], d = String(q.ngay).slice(0, 10), tg = 0, xa = {};
      nhom.forEach(function(n){ n.ds.forEach(function(x){ if(pbKhoaQDChung(x.q)===k){ tg += x.tangGiam; xa[x.q.xa] = 1; } }); });
      return {so:q.so, ngay:d, loai:q.loai, tg:pbR(tg), kh:cong(nhom, function(n){ return khTai(n, d); }), soXa:Object.keys(xa).length}; })
    .sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : 0; });
  var tong = tom(nhom); tong.soQD = moc.length; tong.soNhom = nhom.length; tong.chuaGhep = chuaGhep;
  tong.theoNguon = [1, 2].map(function(nv){ var ds = nhom.filter(function(n){ return n.nguon===nv; }); if(!ds.length) return null; var t = tom(ds); t.nguon = nv; return t; }).filter(Boolean);   /* 3.305: KH giao theo nguồn TW / ĐP → so riêng từng nguồn */
  return {nam:String(nam), nhom:nhom, theoXa:theoXa, thang:thang, moc:moc, tong:tong, coDau:!!dn.dau};
}
function pbKhoaQDChung(q){ return String(q.so || '').trim()+'|'+String(q.ngay || '').slice(0, 10)+'|'+String(q.kyHieu || '').trim(); }   /* = pbKhoa (js/48) — để lõi tự đủ */
/* 3.302: nhóm có dư nợ (Mẫu 31) mà không có QĐ giao trong năm → dòng "không giao" — chỉ dư nợ (đầu năm, hiện tại), KH trống */
function pbDBKhongGiao(ds, loc, coQD, fDau, kyCuoi, dn){
  /* 3.305 (anh 21/10 "KH không giao có nghĩa là lấy dư nợ đầu năm, dư nợ đợt giao mới nhất"): KH của CT không có QĐ giao = dư nợ 31/12 năm trước;
     3.308 (anh 21/10 b): chưa nạp Mẫu 31 kỳ 12 năm trước → KH trống, màn hình báo anh nạp (không lấy số kỳ khác thay) */
  var co = {}, kq = []; loc = loc || {}; dn = dn || {};
  (ds || []).forEach(function(x){ var k = x.xa+'|'+x.ct+'|'+x.nguon; if(co[k] || coQD[k] || (loc.xa && x.xa!==loc.xa) || (+loc.nguon && +x.nguon!==+loc.nguon) || (loc.ct && x.ct!==loc.ct)) return; co[k] = 1;
    var dau = fDau ? fDau(x.xa, x.ct, x.nguon) : null, ht = kyCuoi ? kyCuoi.f(x.xa, x.ct, x.nguon) : null;
    /* 3.308 L5 (anh: CT mới phát sinh trong năm tránh bỏ sót): giữ nếu có dư nợ ở BẤT KỲ kỳ nào (đầu năm, giữa năm, cuối) */
    if(!dau && !ht && !(dn.thang || []).some(function(t){ return (t.f(x.xa, x.ct, x.nguon) || 0) > 0; })) return;
    var kh = null, nguonKH = '';
    if(dau!=null){ kh = dau; nguonKH = 'dư nợ 31/12' + (dn.kyDau ? '/'+String(dn.kyDau).slice(0, 4) : ''); }
    kq.push({xa:x.xa, tenXa:x.tenXa || x.xa, ma:x.ct, ten:'', nguon:+x.nguon, ds:[], dgDau:kh, khCuoi:kh, khNguon:nguonKH, tongTG:kh==null ? null : 0, dauNam:dau, hienTai:ht,
      conTH:kh==null || ht==null ? null : pbR(kh - ht), pct:kh==null || ht==null || !kh ? null : Math.round(ht/kh*1000)/10, khongGiao:true, moi:!!fDau && !dau}); });   /* moi: CT phát sinh trong năm (đầu năm chưa có dư nợ) */
  return kq;
}
