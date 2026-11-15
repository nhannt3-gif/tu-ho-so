/* ===== js/48b-phan-bo-db.js — 📈 DIỄN BIẾN PHÂN VỐN THEO KH (tách khỏi js/48 ở 3.471 cho file < 150 KB; lệnh pb.db* vẫn đăng ký ở js/48).
   Lõi tính pbDienBien ở js/47 (thuần, chạy được trong node). Nạp ngay sau js/48. ===== */
/* ---------- 3.301: 📈 DIỄN BIẾN PHÂN VỐN THEO KH (pbDienBien ở js/47) — thẻ số · biểu đồ SVG (KH hiệu lực bậc thang ↔ dư nợ Mẫu 31) · dòng thời gian QĐ · bảng xã (bấm → chi tiết CT · nguồn · từng QĐ)
   Chỉ đọc QĐ + Mẫu 31 chung; dư nợ thực tế để theo dõi, không bắt khớp. Cấp xã · CT · nguồn (cấp ấp chờ cách chia 3). */
function pbDBKyNam(nam){ return pbDsKyCX().filter(function(k){ return String(k).slice(0, 4)===String(nam); }).sort(); }
function pbDBTinh(){
  var D = PB.db, kyDau = (+D.nam-1)+'-12', f = function(Dn){ return function(xa, ma, nv){ return pbDCTong(Dn, xa, ma, nv); }; }, ks = pbDBKyNam(D.nam).filter(function(k){ return PB.dn[k] && (!D.ky || k<=D.ky); });   /* 3.471: kỳ dư nợ anh chọn */
  return pbDienBien(pbDL().qd, D.nam, {xa:D.xaDs, nguon:+D.nguon, ct:D.ctDs}, {dau:PB.dn[kyDau] ? f(PB.dn[kyDau]) : null, kyDau:PB.dn[kyDau] ? kyDau : '',
    thang:ks.map(function(k){ return {ky:k, f:f(PB.dn[k])}; }), ds:pbDBNhomDN([kyDau].concat(ks))});
}
function pbDBNhomDN(dsKy){   /* 3.302: các nhóm (xã, CT, nguồn) có dư nợ ở Mẫu 31 các kỳ cho trước — để hiện cả CT không có QĐ giao */
  var r = []; dsKy.forEach(function(k){ var Dn = k && PB.dn[k]; if(Dn) Dn.ds.forEach(function(x){ r.push({xa:x.xa, tenXa:x.tenXa, ct:x.ct, nguon:+x.nguon}); }); }); return r; }
function pbDBSo(v){ return v==null ? '—' : pbSoVN(Math.round(v)); }
function pbDBMuc(p){ return p==null ? '' : p>100.05 ? 'vuot' : p>=98 ? 'tot' : p>=92 ? '' : 'cham'; }   /* 3.308 L1: dư nợ VƯỢT KH là sai (NHCSXH) → đỏ; ≥ 98 % xanh lục; < 92 % vàng */
function pbChipCh(ch){ ch = ch==null ? null : Math.round(ch); return ch==null ? '—' : ch>0 ? pbChip('vượt +'+pbSoVN(ch), 'lech') : ch<0 ? pbChip('còn '+pbSoVN(-ch), 'mo') : pbChip('đúng KH', 'khop'); }   /* chênh dư nợ − KH: vượt đỏ · còn được giải ngân xanh nhạt */
function pbDBCon(v){ return v==null ? '—' : v<0 ? '<span class="do" title="Dư nợ vượt KH">vượt '+pbDBSo(-v)+'</span>' : pbDBSo(v); }   /* còn phải TH âm = vượt KH */   /* thanh tiến độ: ≥ 98 % xanh lục · < 92 % vàng (xã chậm) */
function pbDBThanh(p){ var m = pbDBMuc(p); return p==null ? '<small class="sl-phu">chưa có Mẫu 31</small>' : '<div class="pb-tien '+m+'"><i style="width:'+Math.max(0, Math.min(100, p))+'%"></i></div><small'+(m==='vuot' ? ' class="do"' : '')+'>'+String(p).replace('.', ',')+' %'+(m==='vuot' ? ' · vượt KH' : '')+'</small>'; }
function pbDBThe(nhan, so, phu, p){ return '<div class="pb-the"><span>'+nhan+'</span><b>'+so+'</b>'+(p!==undefined ? pbDBThanh(p) : '')+'<small>'+phu+'</small></div>'; }
function pbDBSVG(th){
  var ds = th.filter(function(t){ return t.kh!=null || t.dn!=null; }); if(!ds.length) return '<div class="sl-phu">Chưa có Mẫu 31 kỳ nào trong năm để vẽ tiến độ — nạp ở 📥 Nạp &amp; KT.</div>';
  var W = 640, H = 220, L = 62, R = 14, T = 12, B = 28, vs = [];
  ds.forEach(function(t){ if(t.kh!=null) vs.push(t.kh); if(t.dn!=null) vs.push(t.dn); });
  var mn = Math.min.apply(null, vs), mx = Math.max.apply(null, vs), pad = (mx-mn)*0.15 || Math.max(1, Math.abs(mx)*0.05); mn -= pad; mx += pad;
  var n = ds.length, x = function(i){ return n===1 ? (L+W-R)/2 : L+i*(W-L-R)/(n-1); }, y = function(v){ return T+(mx-v)/(mx-mn)*(H-T-B); }, f1 = function(v){ return v.toFixed(1); };
  var s = '<svg class="pb-db-svg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="KH hiệu lực và dư nợ thực tế từng tháng">';
  for(var i=0;i<=4;i++){ var v = mn+(mx-mn)*i/4, yy = f1(y(v)); s += '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yy+'" y2="'+yy+'" class="pb-db-luoi"/><text x="'+(L-6)+'" y="'+f1(y(v)+4)+'" text-anchor="end" class="pb-db-truc">'+pbSoVN(Math.round(v))+'</text>'; }
  ds.forEach(function(t, i){ s += '<text x="'+f1(x(i))+'" y="'+(H-8)+'" text-anchor="middle" class="pb-db-truc">'+(t.dau ? '31/12' : 'T'+(+String(t.ky).slice(5, 7)))+'</text>'; });
  var P = []; ds.forEach(function(t, i){ if(t.dn!=null) P.push([x(i), y(t.dn)]); });
  if(P.length){ var ln = P.map(function(p, i){ return (i ? 'L' : 'M')+f1(p[0])+' '+f1(p[1]); }).join(' ');
    s += '<path d="'+ln+' L'+f1(P[P.length-1][0])+' '+(H-B)+' L'+f1(P[0][0])+' '+(H-B)+' Z" class="pb-db-vung"/><path d="'+ln+'" class="pb-db-dn"/>'; }
  var kp = ''; ds.forEach(function(t, i){ if(t.kh==null) return; kp += kp ? ' H'+f1(x(i))+' V'+f1(y(t.kh)) : 'M'+f1(x(i))+' '+f1(y(t.kh)); });
  if(kp) s += '<path d="'+kp+'" class="pb-db-kh"/>';
  ds.forEach(function(t, i){ var nh = t.dau ? '31/12/'+String(t.ky).slice(0, 4) : slKyChu(t.ky), tt = nh+(t.kh!=null ? ' · KH '+pbSoVN(t.kh) : '')+(t.dn!=null ? ' · dư nợ '+pbSoVN(t.dn) : '')+(t.dn!=null && t.kh ? ' · đạt '+String(Math.round(t.dn/t.kh*1000)/10).replace('.', ',')+' %' : '');
    if(t.dn!=null) s += '<circle cx="'+f1(x(i))+'" cy="'+f1(y(t.dn))+'" r="4.5" class="pb-db-diem"><title>'+coChuHTML(tt)+'</title></circle>';
    if(t.kh!=null) s += '<circle cx="'+f1(x(i))+'" cy="'+f1(y(t.kh))+'" r="3" class="pb-db-diem-kh"><title>'+coChuHTML(tt)+'</title></circle>'; });
  return s+'</svg>';
}
function pbDBMoc(r){
  var nut = function(ten, phu, so, tg, lop){ return '<div class="pb-db-nut '+(lop || '')+'"><div class="pb-db-chip '+(tg>0 ? 'tang' : tg<0 ? 'giam' : 'rong')+'">'+(tg ? (tg>0 ? '+' : '−')+pbSoVN(Math.abs(tg)) : '&nbsp;')+'</div><i></i><b>'+pbDBSo(so)+'</b><span>'+coChuHTML(ten)+'</span><small>'+coChuHTML(phu)+'</small></div>'; };
  if(!r.moc.length) return '';
  return '<div class="pb-db-moc">'+nut('Đầu năm', 'Đã giao QĐ đầu', r.tong.dgDau, 0, 'mo-dau')+r.moc.map(function(m, i){
    return '<span class="pb-db-noi"></span>'+nut('QĐ '+m.so, pbNgay(m.ngay).slice(0, 5)+(m.soXa>1 ? ' · '+m.soXa+' xã' : ''), m.kh, m.tg, i===r.moc.length-1 ? 'cuoi' : ''); }).join('')+'</div>';
}
function pbDBChiTiet(t, inRa){   /* 1 xã: CT · nguồn × (dư nợ đầu năm · từng QĐ · KH cuối · hiện tại · còn TH · %) */
  var qd = [], co = {}; t.nhom.forEach(function(n){ n.ds.forEach(function(x){ var k = pbKhoaQDChung(x.q); if(!co[k]){ co[k] = 1; qd.push(x.q); } }); });
  qd.sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : 0; });
  return '<div class="to-bang-cuon"><table class="to-bang luoi pb-db-ct"><thead><tr><th>Chương trình · nguồn</th><th>Dư nợ 31/12</th><th>Đã giao đầu</th>'+qd.map(function(q){ return '<th>QĐ '+coChuHTML(q.so)+'<br><small>'+pbNgay(q.ngay).slice(0, 5)+'</small></th>'; }).join('')+
    '<th>KH cuối năm</th><th>Dư nợ thực tế</th><th>Còn phải TH</th><th>Tiến độ</th></tr></thead><tbody>'+t.nhom.map(function(n){
      if(n.khongGiao) return '<tr class="pb-kg"><td>'+coChuHTML(pbVT(n.ma))+' ('+n.ma+') · '+pbNguonChu(n.nguon)+'</td><td class="so">'+pbDBSo(n.dauNam)+'</td><td class="so">—</td>'+qd.map(function(){ return '<td></td>'; }).join('')+
        '<td class="so">'+(n.khCuoi==null ? '<small>không giao</small>' : '<b>'+pbDBSo(n.khCuoi)+'</b><br><small>không giao · '+coChuHTML(n.khNguon || '')+'</small>')+'</td>'+
        '<td class="so">'+pbDBSo(n.hienTai)+'</td><td class="so">'+pbDBCon(n.conTH)+'</td><td class="pb-db-td">'+(n.khCuoi==null ? '' : inRa ? (n.pct==null ? '' : String(n.pct).replace('.', ',')+' %') : pbDBThanh(n.pct))+'</td></tr>';   /* 3.302 / 3.305: CT không có QĐ giao — KH = dư nợ đầu năm (hoặc đợt giao mới nhất) */
      return '<tr><td>'+coChuHTML(pbVT(n.ma))+' ('+n.ma+') · '+pbNguonChu(n.nguon)+'</td><td class="so">'+pbDBSo(n.dauNam)+'</td>'+
        '<td class="so">'+pbDBSo(n.dgDau)+(n.dauNam!=null && n.dgDau!=null && pbR(n.dgDau - n.dauNam) ?'<br><small class="vang" title="Đã giao trên QĐ khác dư nợ 31/12 — chỉ ghi nhận, không sửa">QĐ ≠ dư nợ '+pbSoDau(pbR(n.dgDau - n.dauNam))+'</small>' : '')+'</td>'+qd.map(function(q){
          var x = n.ds.filter(function(y){ return pbKhoaQDChung(y.q)===pbKhoaQDChung(q); })[0]; return '<td class="so">'+(x ? pbChipTG(x.tangGiam)+' → '+pbDBSo(x.denT) : '')+'</td>'; }).join('')+
        '<td class="so"><b>'+pbDBSo(n.khCuoi)+'</b></td><td class="so">'+pbDBSo(n.hienTai)+'</td><td class="so">'+pbDBCon(n.conTH)+'</td><td class="pb-db-td">'+(inRa ? (n.pct==null ? '' : String(n.pct).replace('.', ',')+' %') : pbDBThanh(n.pct))+'</td></tr>'; }).join('')+'</tbody></table></div>';
}
/* 3.308 (anh 21/10 "tinh gọn các bảng để hiển thị được nhiều hơn thông tin đa chiều"): BẢNG MA TRẬN — hàng xã × cột CT (hoặc xoay), mỗi ô dư nợ / KH tô màu
   tiến độ (xanh đạt · vàng chậm · đỏ vượt KH); cột Tổng · % · còn / vượt · đường diễn biến; công tắc: xoay · nguồn gộp / tách · mốc · triệu / tỷ; bấm tên xã → chi tiết */
function pbDBCong(o, v){ if(v.kh!=null) o.kh = pbR((o.kh || 0) + v.kh); if(v.dn!=null) o.dn = pbR((o.dn || 0) + v.dn); }
function pbDBSpark(r, ids){   /* đường nhỏ: dư nợ (xanh) ↔ KH (gạch cam) qua các mốc */
  var ds = r.thang.map(function(t){ var o = {kh:null, dn:null}; ids.forEach(function(i){ pbDBCong(o, t.ct[i]); }); return o; }).filter(function(o){ return o.kh!=null || o.dn!=null; });
  if(ds.length<2) return '';
  var vs = []; ds.forEach(function(o){ if(o.kh!=null) vs.push(o.kh); if(o.dn!=null) vs.push(o.dn); });
  var mn = Math.min.apply(null, vs), mx = Math.max.apply(null, vs), W = 72, H = 18;
  var x = function(i){ return (i*(W-4)/(ds.length-1)+2).toFixed(1); }, y = function(v){ return mx===mn ? H/2 : (H-2-(v-mn)/(mx-mn)*(H-4)).toFixed(1); };
  var dd = function(f){ return ds.map(function(o, i){ return o[f]==null ? '' : x(i)+','+y(o[f]); }).filter(Boolean).join(' '); };
  return '<svg class="pb-mt-sp" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" aria-hidden="true"><polyline points="'+dd('kh')+'" fill="none" stroke="#eb6834" stroke-width="1" stroke-dasharray="3 2"/>'+
    '<polyline points="'+dd('dn')+'" fill="none" stroke="#2a78d6" stroke-width="1.6"/></svg>';
}
function pbDBXa(r, inRa){
  var D = PB.db, th = r.thang.filter(function(t){ return !t.dau; }), t = th.filter(function(x){ return x.ky===D.mocMT; })[0] || th[th.length-1] || null;
  var gt = function(i){ var n = r.nhom[i]; return t ? t.ct[i] : {kh:n.khCuoi, dn:n.hienTai}; };
  var kCT = function(n){ return n.ma+(D.tach ? '|'+n.nguon : ''); }, tenCT = function(n){ return pbVT(n.ma)+(D.tach ? ' '+pbNguonChu(n.nguon) : ''); };
  var H = {}, hThu = [], C = {}, cThu = [], T = {kh:null, dn:null}, tatCa = [];
  r.nhom.forEach(function(n, i){ var kh = D.xoay ? kCT(n) : n.xa, kc = D.xoay ? n.xa : kCT(n), v = gt(i);
    if(!H[kh]){ H[kh] = {k:kh, xa:D.xoay ? '' : n.xa, ten:D.xoay ? tenCT(n) : n.tenXa, ma:n.ma, o:{}, ids:[], moi:true}; hThu.push(kh); }
    if(!C[kc]){ C[kc] = {k:kc, ten:D.xoay ? n.tenXa : tenCT(n), ma:n.ma, nguon:n.nguon, kh:null, dn:null, ids:[], moi:true}; cThu.push(kc); }
    var o = H[kh].o[kc] = H[kh].o[kc] || {kh:null, dn:null, ids:[]};
    pbDBCong(o, v); o.ids.push(i); H[kh].ids.push(i); pbDBCong(C[kc], v); C[kc].ids.push(i); pbDBCong(T, v); tatCa.push(i);
    if(!n.moi){ C[kc].moi = false; H[kh].moi = false; } });
  cThu.sort(function(a, b){ return D.xoay ? String(C[a].ten).localeCompare(String(C[b].ten), 'vi') : (C[a].ma < C[b].ma ? -1 : C[a].ma > C[b].ma ? 1 : C[a].nguon - C[b].nguon); });
  hThu.sort(function(a, b){ return D.xoay ? (H[a].ma < H[b].ma ? -1 : H[a].ma > H[b].ma ? 1 : a < b ? -1 : 1) : String(H[a].ten).localeCompare(String(H[b].ten), 'vi'); });
  var fmt = function(v){ return v==null ? '—' : D.ty ? String(Math.round(v/100)/10).replace('.', ',') : pbSoVN(Math.round(v)); };
  var o1 = function(o, tong){ if(!o || o.kh==null && o.dn==null) return '<td class="pb-mt-o na">—</td>';
    var p = o.kh ? Math.round((o.dn || 0)/o.kh*1000)/10 : null, m = o.kh===0 && o.dn>0 ? 'vuot' : pbDBMuc(p), ch = o.kh!=null && o.dn!=null ? Math.round(o.dn - o.kh) : null;
    var tit = 'Dư nợ '+pbDBSo(o.dn)+' · KH '+pbDBSo(o.kh)+(ch!=null ? ' · '+(ch>0 ? 'vượt +'+pbSoVN(ch) : ch<0 ? 'còn '+pbSoVN(-ch) : 'đúng KH') : '')+(p!=null ? ' · '+String(p).replace('.', ',')+' %' : '');
    return '<td class="pb-mt-o '+m+(tong ? ' tong' : '')+'" title="'+tit+'">'+fmt(o.dn)+'<small>'+fmt(o.kh)+'</small></td>'; };
  var duoi = function(o, ids){ var p = o.kh ? Math.round((o.dn || 0)/o.kh*1000)/10 : null, ch = o.kh!=null && o.dn!=null ? o.dn - o.kh : null;
    return o1(o, true)+'<td class="so pb-mt-p'+(pbDBMuc(p)==='vuot' ? ' do' : '')+'">'+(p==null ? '—' : String(p).replace('.', ','))+'</td>'+
      '<td class="so">'+(ch==null ? '—' : inRa ? (ch>0 ? 'vượt '+fmt(ch) : 'còn '+fmt(-ch)) : pbChipCh(ch))+'</td><td class="pb-mt-sp-o">'+pbDBSpark(r, ids)+'</td>'; };
  var moi = function(x){ return x.moi ? ' <span class="pb-c mo" title="Chương trình phát sinh trong năm (đầu năm chưa có dư nợ)">mới</span>' : ''; };
  var dk = inRa ? '' : '<div class="gd-hang pb-mt-dk">'+
      '<span class="pb-mt-nh">Hàng</span>'+GD.chip('Xã', !D.xoay, 'pb.dbMT', {f:'xoay', v:''})+GD.chip('Chương trình', !!D.xoay, 'pb.dbMT', {f:'xoay', v:'1'})+
      '<span class="pb-mt-nh">Nguồn</span>'+GD.chip('Gộp', !D.tach, 'pb.dbMT', {f:'tach', v:''})+GD.chip('Tách TW / ĐP', !!D.tach, 'pb.dbMT', {f:'tach', v:'1'})+
      (th.length ? '<span class="pb-mt-nh">Mốc</span><select data-lenh="pb.dbMTKy" data-su="change">'+th.map(function(x){ return '<option value="'+x.ky+'"'+(x===t ? ' selected' : '')+'>'+coChuHTML(slKyChu(x.ky))+'</option>'; }).join('')+'</select>' : '')+
      '<span class="pb-mt-nh">Đơn vị</span>'+GD.chip('triệu', !D.ty, 'pb.dbMT', {f:'ty', v:''})+GD.chip('tỷ', !!D.ty, 'pb.dbMT', {f:'ty', v:'1'})+
      '<span class="pb-mt-cu">'+pbChip('đạt', 'khop')+pbChip('chậm', 'canh')+pbChip('vượt KH', 'lech')+'</span></div>';
  var bang = '<div class="to-bang-cuon pb-mt-cuon"><table class="pb-mt"><thead><tr><th class="pb-mt-h">'+(D.xoay ? 'Chương trình' : 'Xã / phường')+' <small>dư nợ / KH'+(t ? ' · '+coChuHTML(slKyChu(t.ky)) : '')+'</small></th>'+
      cThu.map(function(k){ return '<th>'+coChuHTML(C[k].ten)+(D.xoay ? '' : moi(C[k]))+'</th>'; }).join('')+'<th>Tổng</th><th>%</th><th>Còn / vượt</th><th>Diễn biến</th></tr></thead><tbody>'+
    hThu.map(function(k){ var h = H[k], o = {kh:null, dn:null}, mo = !D.xoay && PB.db.moXa===h.xa; cThu.forEach(function(kc){ if(h.o[kc]) pbDBCong(o, h.o[kc]); });
      return '<tr><th class="pb-mt-h'+(mo ? ' mo' : '')+'"'+(!D.xoay && !inRa ? ' data-lenh="pb.dbXa" data-xa="'+coChuHTML(h.xa)+'" title="Bấm xem chi tiết từng chương trình, từng QĐ"' : '')+'>'+
        (!D.xoay && !inRa ? (mo ? '▾ ' : '▸ ') : '')+coChuHTML(h.ten)+(D.xoay ? moi(h) : '')+'</th>'+cThu.map(function(kc){ return o1(h.o[kc]); }).join('')+duoi(o, h.ids)+'</tr>'; }).join('')+
    '<tr class="tong"><th class="pb-mt-h">Tổng</th>'+cThu.map(function(kc){ return o1(C[kc], true); }).join('')+duoi(T, tatCa)+'</tr></tbody></table></div>';
  var ct = D.xoay ? '' : r.theoXa.filter(function(x){ return inRa || PB.db.moXa===x.xa; }).map(function(x){
    return '<div class="pb-db-mo-bang"><div class="th-nhom-ten"><b>'+coChuHTML(x.tenXa)+'</b> <small>chi tiết từng chương trình · QĐ</small></div>'+pbDBChiTiet(x, inRa)+'</div>'; }).join('');
  return dk+bang+ct;
}
/* 3.308 (anh 21/10 "lấy tổng dư nợ (tất cả CT) so các mốc cuối tháng với KH giao (tất cả CT; không giao lấy dư nợ đầu năm)"): 📅 BẢNG SO THEO MỐC CUỐI THÁNG
   mốc → (bấm) từng xã → (bấm) từng CT · nguồn; mỗi dòng: KH giao (có giao / không giao) · tổng dư nợ (có giao / không giao) · chênh · % */
function pbDBPhan(a, b){ return a==null && b==null ? '' : '<br><small>có giao '+pbDBSo(a)+' · không giao '+pbDBSo(b)+'</small>'; }
function pbDBDongSo(kh, dn, inRa, phuKH, phuDN){ var ch = kh==null || dn==null ? null : pbR(dn - kh), p = kh && dn!=null ? Math.round(dn/kh*1000)/10 : null;
  return '<td class="so"><b>'+pbDBSo(kh)+'</b>'+(phuKH || '')+'</td><td class="so"><b>'+pbDBSo(dn)+'</b>'+(phuDN || '')+'</td><td class="so">'+(ch==null ? '—' : inRa ? (ch>0 ? 'vượt +'+pbSoVN(Math.round(ch)) : ch<0 ? 'còn '+pbSoVN(Math.round(-ch)) : '0') : pbChipCh(ch))+'</td>'+
    '<td class="pb-db-td">'+(kh===0 && dn>0 ? (inRa ? 'vượt — chưa có KH' : pbChip('vượt — chưa có KH', 'lech')) : p==null ? '' : inRa ? String(p).replace('.', ',')+' %' : pbDBThanh(p))+'</td>'; }
function pbDBThang(r, inRa){
  if(!r.thang.length) return '';
  var nhan = function(t){ return t.dau ? '31/12/'+String(t.ky).slice(0, 4)+' <small>(đầu năm)</small>' : coChuHTML(slKyChu(t.ky)); };
  var xaCua = function(t){ var g = {}, thu = []; r.nhom.forEach(function(n, i){ var c = t.ct[i]; if(!g[n.xa]){ g[n.xa] = {xa:n.xa, tenXa:n.tenXa, kh:null, dn:null, ds:[]}; thu.push(n.xa); }
      var x = g[n.xa]; if(c.kh!=null) x.kh = pbR((x.kh || 0) + c.kh); if(c.dn!=null) x.dn = pbR((x.dn || 0) + c.dn); x.ds.push({n:n, c:c}); }); return thu.map(function(k){ return g[k]; }); };
  var h = r.thang.map(function(t){ var mo = !inRa && PB.db.moMoc===t.ky;
    var s = '<tr class="pb-db-moc-d'+(mo ? ' mo' : '')+'"'+(inRa ? '' : ' data-lenh="pb.dbMoc" data-ky="'+coChuHTML(t.ky)+'" title="Bấm xem từng xã tại mốc này"')+'><td><b>'+(inRa ? '' : (mo ? '▾ ' : '▸ '))+nhan(t)+'</b></td>'+
      pbDBDongSo(t.kh, t.dn, inRa, pbDBPhan(t.khGiao, t.khKG), pbDBPhan(t.dnGiao, t.dnKG))+'</tr>';
    if(mo) s += xaCua(t).map(function(x){ var moX = PB.db.moMocXa===x.xa;
      return '<tr class="pb-db-moc-xa'+(moX ? ' mo' : '')+'" data-lenh="pb.dbMocXa" data-xa="'+coChuHTML(x.xa)+'" title="Bấm xem từng chương trình · nguồn"><td>&nbsp;&nbsp;'+(moX ? '▾ ' : '▸ ')+coChuHTML(x.tenXa)+'</td>'+pbDBDongSo(x.kh, x.dn)+'</tr>'+
        (moX ? x.ds.map(function(y){ var n = y.n; return '<tr class="pb-db-moc-ct'+(n.khongGiao ? ' pb-kg' : '')+'"><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+coChuHTML(pbVT(n.ma))+' ('+n.ma+') · '+pbNguonChu(n.nguon)+
          (n.khongGiao ? ' <small>không giao — KH = dư nợ đầu năm</small>' : '')+'</td>'+pbDBDongSo(y.c.kh, y.c.dn)+'</tr>'; }).join('') : ''); }).join('');
    return s; }).join('');
  return '<div class="th-nhom-ten"><b>📅 So theo mốc cuối tháng</b> <small>KH giao (mọi CT; CT không giao = dư nợ đầu năm; trước QĐ đầu = dư nợ đầu năm) ↔ tổng dư nợ thực tế mọi CT'+(inRa ? '' : ' · bấm mốc → từng xã → từng CT')+'</small></div>'+
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-db-thang"><thead><tr><th>Mốc</th><th>KH giao</th><th>Tổng dư nợ thực tế</th><th>Chênh<br><small>dư nợ − KH</small></th><th class="pb-db-td">% đạt</th></tr></thead><tbody>'+h+'</tbody></table></div>';
}
function pbDBNoi(r, inRa){   /* phần thân dùng chung màn hình / bản in */
  var t = r.tong, kyTT = r.thang.length ? r.thang[r.thang.length-1] : null;
  return (r.tong.chuaGhep ? '<div class="sl-bao vang">⚠ '+r.tong.chuaGhep+' lượt QĐ năm '+r.nam+' <b>chưa ghép được xã</b> (tên xã không khớp cây địa bàn) — không cộng vào diễn biến; anh mở ✎ QĐ đó, tích đúng xã.</div>' : '')+   /* 3.308 L3 */
    (r.coDau ? '' : '<div class="sl-bao vang">⚠ Chưa nạp <b>Mẫu 31 kỳ 12/'+(+r.nam-1)+'</b> — KH của chương trình không giao, KH trước QĐ đầu năm và mốc đầu năm cần dư nợ 31/12/'+(+r.nam-1)+'. Anh nạp ở <b>📥 Nạp &amp; KT</b> rồi mở lại.</div>')+   /* 3.308 b: báo nạp, không lấy số thay */
    '<div class="pb-kpi">'+pbDBThe('Dư nợ đầu năm', pbDBSo(t.dauNamTatCa), t.dauNam==null ? 'chưa có Mẫu 31 kỳ 12/'+(+r.nam-1) : '31/12/'+(+r.nam-1)+' · CT có giao '+pbDBSo(t.dauNam))+
      pbDBThe('KH cuối năm', pbDBSo(t.khCuoi), (t.tongTG>=0 ? '+' : '')+pbSoVN(t.tongTG || 0)+' qua '+t.soQD+' QĐ · đã giao đầu '+pbDBSo(t.dgDau)+(t.khKhongGiao ? ' · gồm CT không giao '+pbDBSo(t.khKhongGiao)+' (= dư nợ đầu năm)' : ''))+
      pbDBThe('Dư nợ thực tế', pbDBSo(t.hienTaiTatCa), kyTT && !kyTT.dau ? 'Mẫu 31 '+slKyChu(kyTT.ky)+' · CT có giao '+pbDBSo(t.hienTai)+' · không giao '+pbDBSo(t.khongGiao || 0) : 'chưa có Mẫu 31 trong năm')+
      pbDBThe(t.conTH<0 ? 'Vượt KH' : 'Còn phải thực hiện', pbDBSo(t.conTH==null ? null : Math.abs(t.conTH)), t.conTH<0 ? 'tổng dư nợ thực tế vượt KH cuối năm (mọi CT)' : 'KH cuối năm − tổng dư nợ thực tế (mọi CT)', t.pct)+'</div>'+
    ((t.theoNguon || []).length ? '<div class="pb-kpi pb-kpi-nguon">'+t.theoNguon.map(function(n){   /* 3.305: KH giao theo nguồn TW / ĐP → so riêng từng nguồn */
      return pbDBThe('Nguồn '+pbNguonChu(n.nguon)+' — dư nợ thực tế / KH', pbDBSo(n.hienTaiTatCa)+' <small>/ '+pbDBSo(n.khCuoi)+'</small>',
        (n.khCuoi==null ? 'không có KH giao nguồn này' : n.conTH<0 ? 'vượt KH '+pbDBSo(-n.conTH) : 'còn phải TH '+pbDBSo(n.conTH))+(n.soKhongGiao ? ' · CT không giao '+pbDBSo(n.khongGiao) : ''), n.khCuoi==null ? undefined : n.pct); }).join('')+'</div>' : '')+
    '<div class="pb-db-chu"><span><i class="pb-db-l kh"></i>KH hiệu lực (Đến 31/12 theo QĐ)</span><span><i class="pb-db-l dn"></i>Dư nợ thực tế (Mẫu 31, mọi chương trình)</span><small>triệu đồng · rê chuột vào điểm để xem số</small></div>'+
    '<div class="pb-db-bd">'+pbDBSVG(r.thang)+'</div>'+pbDBMoc(r)+pbDBThang(r, inRa);
}
function pbDBVe(){
  var o = document.getElementById('pb-phai'); if(!o) return;
  var dsN = pbDCNam(), D = PB.db, dau = '<div class="th-nhom-ten"><b>📈 Diễn biến phân vốn theo KH</b></div>';
  if(!dsN.length){ o.innerHTML = dau+'<div class="sl-phu">Chưa có QĐ — nhập QĐ hoặc 📥 Nạp QĐ (Excel mẫu).</div>'; return; }
  D.nam = dsN.indexOf(D.nam)>=0 ? D.nam : dsN[0];
  var can = {}, kyDau = (+D.nam-1)+'-12'; if(pbDsKyCX().indexOf(kyDau)>=0) can[kyDau] = 1; pbDBKyNam(D.nam).forEach(function(k){ can[k] = 1; });
  var thieu = Object.keys(can).filter(function(k){ return !PB.dn[k] && !PB.dc.daDoc[k]; });
  if(thieu.length){ o.innerHTML = dau+'<div class="sl-phu">Đang đọc dư nợ Mẫu 31 ('+thieu.map(slKyChu).join(', ')+')…</div>'; thieu.forEach(function(k){ PB.dc.daDoc[k] = 1; });
    Promise.all(thieu.map(function(k){ return pbDuNo(k).catch(function(){ return null; }); })).then(function(){ if(PB.che==='db') pbDBVe(); }); return; }
  var qN = pbDL().qd.filter(function(q){ return String(q.ngay).slice(0, 4)===D.nam; }), xaL = {}, ctL = {};
  qN.forEach(function(q){ xaL[q.xa] = (PB.xa[q.xa] || {}).ten || q.tenXa || q.xa; (q.ct || []).forEach(function(c){ ctL[c.ma] = 1; }); });
  var ksDB = pbDBKyNam(D.nam).filter(function(k){ return PB.dn[k]; }); pbDBNhomDN([kyDau].concat(ksDB)).forEach(function(x){ if(!xaL[x.xa]) xaL[x.xa] = x.tenXa || x.xa; ctL[x.ct] = 1; });   /* 3.302: xã / CT có dư nợ mà không có QĐ */
  var r = pbDBTinh(); PB.db.r = r;
  r.dut = pbDutNam(D.nam).filter(function(x){ return pbLocCo(D.xaDs, x.xa) && pbLocCo(D.ctDs, x.ma) && (!+D.nguon || x.nguon===+D.nguon); });   /* 3.478 */
  var sel = function(f, ds, v){ return '<select data-lenh="pb.dbLoc" data-su="change" data-f="'+f+'">'+ds.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(String(x[0])===String(v) ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'; };
  var tenX = function(k){ return pbDBTenXa(k, xaL[k]); }, dsX = Object.keys(xaL).filter(function(k){ return k; }).sort(function(a, b){ return tenX(a).localeCompare(tenX(b), 'vi'); });   /* 3.470: dòng không mã xã không thành mục chọn */
  var chips = function(f, ds, ten){ var chon = D[f]; return '<span class="pb-mt-nh">'+ten+'</span>'+GD.chip('Tất cả', !chon.length, 'pb.dbChon', {f:f, v:''})+ds.map(function(x){ return GD.chip(x[1], chon.indexOf(x[0])>=0, 'pb.dbChon', {f:f, v:x[0]}); }).join(''); };
  var kyDs = pbDBKyNam(D.nam).filter(function(k){ return PB.dn[k]; }).reverse();
  o.innerHTML = dau+'<div class="gd-hang pb-db-loc">'+sel('nam', dsN.map(function(n){ return [n, 'Năm '+n]; }), D.nam)+
      (kyDs.length ? sel('ky', [['', 'Dư nợ: kỳ mới nhất']].concat(kyDs.map(function(k){ return [k, 'Dư nợ '+slKyChu(k)]; })), D.ky) : '')+
      sel('nguon', [[0, 'Cả 2 nguồn (chia khối)'], [1, 'Nguồn TW'], [2, 'Nguồn ĐP']], D.nguon)+
      '<span class="pb-mt-nh">Xếp</span>'+GD.chip('Chương trình › Xã', D.xep!=='xa', 'pb.dbXep', {v:'ct'})+GD.chip('Xã › Chương trình', D.xep==='xa', 'pb.dbXep', {v:'xa'})+
      GD.chip('Tách từng QĐ', !!D.tachQD, 'pb.dbTachQD', {})+'</div>'+
    '<div class="gd-hang pb-db-loc">'+chips('xaDs', dsX.map(function(k){ return [k, tenX(k)]; }), 'Xã')+'</div>'+
    '<div class="gd-hang pb-db-loc">'+chips('ctDs', Object.keys(ctL).sort().map(function(m){ return [m, pbVT(m)]; }), 'Chương trình')+'</div>'+
    (r.nhom.length ? xuatHang({ten:xuatTen('Dien bien phan von KH', 'Nam '+D.nam+(D.xaDs.length===1 ? ' '+tenX(D.xaDs[0]) : ''), ''), html:pbDBIn, excel:'pbDBExcel()', dong:'pbDCDong()', dongChu:'‹ Về phân bổ'})+
      pbDutHTML(r.dut)+pbDBBang(r)+'<div class="gd-hang">'+GD.nut({chu:(D.them ? '▾ Ẩn' : '▸ Xem thêm')+': thẻ số · biểu đồ · ma trận xã × chương trình · theo mốc tháng', lenh:'pb.dbThem'})+'</div>'+
      (D.them ? pbDBNoi(r)+'<div id="pb-db-xa">'+pbDBXa(r)+'</div>' : '')
      : '<div class="sl-phu">Không có QĐ khớp bộ lọc.</div>');
}
/* ---------- 3.471 (anh 04/11 "anh cần bảng biểu cơ bản trước, theo đúng phong cách giao vốn đầu năm, giao tăng giảm, KH cuối năm, dư nợ hiện tại, còn thực hiện, kẻ bảng, chọn đa chiều, chia nguồn"):
   BẢNG CƠ BẢN — khối nguồn (A. TW · B. ĐP · Tổng cộng) › cấp 1 (chương trình hoặc xã, in đậm = tổng) › cấp 2; cột: dư nợ 31/12 năm trước · giao đầu năm · tăng / giảm (hoặc từng QĐ) · KH cuối năm · dư nợ kỳ · còn phải TH · %.
   CT không giao (có dư nợ, không QĐ) = KH dư nợ đầu năm (luật 3.305). Màn hình, in, Excel dùng chung pbDBHang. ---------- */
function pbDBTenXa(xa, mac){ return xa ? ((PB.xa[xa] || {}).ten || mac || 'Mã xã '+xa) : 'Không rõ xã'; }
function pbDBHang(r){
  var D = PB.db, moc = D.tachQD ? r.moc : [], kQD = function(m){ return String(m.so).trim()+'|'+String(m.ngay).slice(0, 10); };
  var cong = function(a, b){ return a==null ? b : b==null ? a : pbR(a + b); }, dut = {};
  (r.dut || []).forEach(function(x){ var k = x.xa+'|'+x.ma+'|'+x.nguon, o = dut[k] = dut[k] || {t:0, qd:{}}; o.t = pbR(o.t + x.chenh); o.qd[String(x.q.so).trim()+'|'+String(x.q.ngay).slice(0, 10)] = x; });   /* 3.478: đứt chuỗi */
  var so = function(n){ var v = {dau:n.dauNam, giao:n.dgDau, tg:n.khongGiao ? null : n.tongTG, kh:n.khCuoi, dn:n.hienTai, qd:{}, thieu:n.khCuoi==null && n.hienTai!=null};   /* thieu: có dư nợ mà chưa có KH (chưa nạp Mẫu 31 kỳ 12 năm trước) */
    n.ds.forEach(function(x){ var k = String(x.q.so).trim()+'|'+String(x.q.ngay).slice(0, 10); v.qd[k] = cong(v.qd[k], x.tangGiam); });
    var d = dut[n.xa+'|'+n.ma+'|'+n.nguon]; v.dut = d ? d.t : null; v.dutQD = d ? d.qd : {}; return v; };
  var gop = function(ds){ var t = {dau:null, giao:null, tg:null, kh:null, dn:null, qd:{}, thieu:false, dut:null, dutQD:{}}; ds.forEach(function(v){ t.thieu = t.thieu || v.thieu; t.dut = cong(t.dut, v.dut);
      Object.keys(v.dutQD || {}).forEach(function(k){ t.dutQD[k] = 1; }); ['dau', 'giao', 'tg', 'kh', 'dn'].forEach(function(f){ t[f] = cong(t[f], v[f]); }); Object.keys(v.qd).forEach(function(k){ t.qd[k] = cong(t.qd[k], v.qd[k]); }); }); return t; };
  var ctTen = function(m){ return pbTenCT(m)+' ('+m+')'; }, la = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
  var dong = [], khoiTat = [], nguon = +D.nguon ? [+D.nguon] : [1, 2].filter(function(nv){ return r.nhom.some(function(n){ return n.nguon===nv; }); });
  nguon.forEach(function(nv, iK){ var ds = r.nhom.filter(function(n){ return n.nguon===nv; }); if(!ds.length) return;
    var g = {}, thu = [], ten1 = function(k){ return D.xep==='xa' ? pbDBTenXa(k, g[k][0].tenXa) : ctTen(k); }, phan = [], khoi = [];
    ds.forEach(function(n){ var k = D.xep==='xa' ? n.xa : n.ma; if(!g[k]){ g[k] = []; thu.push(k); } g[k].push(n); });
    thu.sort(function(a, b){ return D.xep==='xa' ? ten1(a).localeCompare(ten1(b), 'vi') : (a < b ? -1 : 1); });
    thu.forEach(function(k, i){ var kg = 'n'+nv+'|'+k, con = g[k].slice().sort(function(a, b){ return D.xep==='xa' ? (a.ma < b.ma ? -1 : 1) : pbDBTenXa(a.xa, a.tenXa).localeCompare(pbDBTenXa(b.xa, b.tenXa), 'vi'); });
      var vs = con.map(so), t = gop(vs); khoi.push(t);
      phan.push({cap:1, khoa:kg, stt:la[i] || String(i+1), ten:ten1(k), v:t});
      if(!D.gap[kg]) con.forEach(function(n, j){ phan.push({cap:2, stt:String(j+1), ten:D.xep==='xa' ? ctTen(n.ma) : pbDBTenXa(n.xa, n.tenXa), v:vs[j], kg:!!n.khongGiao, moi:!!n.moi}); }); });
    var tk = gop(khoi); khoiTat.push(tk);
    if(nguon.length>1) dong.push({cap:0, stt:'AB'.charAt(iK), ten:'Nguồn '+(nv===1 ? 'Trung ương' : 'Địa phương'), v:tk});   /* cả 2 nguồn → chia khối A / B */
    dong = dong.concat(phan); });
  dong.push({cap:-1, stt:'', ten:'TỔNG CỘNG', v:gop(khoiTat)});
  return {dong:dong, moc:moc, kQD:kQD};
}
function pbDBBang(r, inRa){
  var D = PB.db, H = pbDBHang(r), e = coChuHTML, nam = +r.nam, kyT = r.thang.filter(function(t){ return !t.dau; }).pop();
  var s = function(v){ return v==null ? '' : pbSoVN(Math.round(v)); }, tg = function(v){ return v==null ? '' : Math.round(v)===0 ? '0' : (v>0 ? '+' : '')+pbSoVN(Math.round(v)); };
  var con = function(v){ if(v.thieu) return '<td class="s" title="Có dư nợ chương trình chưa có KH — nạp Mẫu 31 kỳ 12/'+(nam-1)+'">—</td><td class="s"></td>'; if(v.kh==null || v.dn==null) return '<td class="s"></td><td class="s"></td>'; var c = pbR(v.kh - v.dn), p = v.kh ? Math.round(v.dn/v.kh*1000)/10 : null;
    return '<td class="s'+(c<0 ? ' do' : '')+'">'+(c<0 ? 'vượt '+s(-c) : s(c))+'</td><td class="s'+(p!=null && p>100.05 ? ' do' : '')+'">'+(p==null ? '' : String(p).replace('.', ','))+'</td>'; };
  var dau = '<tr><th>STT</th><th>Đơn vị</th><th>Dư nợ 31/12/'+(nam-1)+'</th><th>Giao đầu năm</th>'+(H.moc.length ? H.moc.map(function(m){ return '<th>QĐ '+e(m.so)+'<br><small>'+pbNgay(m.ngay)+'</small></th>'; }).join('') : '<th>Tăng / giảm</th>')+
    '<th>KH cuối năm</th><th>Dư nợ '+(kyT ? e(slKyChu(kyT.ky)) : 'hiện tại')+'</th><th>Còn phải thực hiện</th><th>% thực hiện</th></tr>';
  var than = H.dong.map(function(d){ var v = d.v, lop = d.cap===-1 ? 'pb-b-tong' : d.cap===0 ? 'pb-b-khoi' : d.cap===1 ? 'pb-b-c1' : 'pb-b-c2';
    var bam = !inRa && d.cap===1 ? ' data-lenh="pb.dbGap" data-k="'+e(d.khoa)+'" title="Bấm gập / mở"' : '';
    return '<tr class="'+lop+'"'+bam+'><td class="c">'+e(d.stt)+'</td><td>'+(d.cap===1 && !inRa ? (D.gap[d.khoa] ? '▸ ' : '▾ ') : '')+e(d.ten)+
      (d.kg ? ' <small class="vang" title="Chương trình không có QĐ giao — KH = dư nợ 31/12/'+(nam-1)+'">không giao</small>' : '')+
      (v.dut ? ' <small class="do" title="Đứt chuỗi QĐ: Đã giao QĐ sau khác Đến 31/12 QĐ trước — KH theo QĐ mới nhất (xem bảng ⚠ Đứt chuỗi)">⚠ đứt '+pbSoDau(v.dut)+'</small>' : '')+(d.moi ? ' <small>mới</small>' : '')+'</td><td class="s">'+s(v.dau)+'</td><td class="s">'+s(v.giao)+'</td>'+
      (H.moc.length ? H.moc.map(function(m){ var k = H.kQD(m), x = v.dutQD[k];
        return '<td class="s'+(x ? ' pb-dut-o' : '')+'"'+(x && x.chenh!=null ? ' title="Đứt chuỗi: Đã giao '+pbSoVN(x.daGiao)+' ≠ Đến 31/12 QĐ '+coChuHTML(x.qTruoc.so)+' '+pbSoVN(x.denTruoc)+' ('+pbSoDau(x.chenh)+')"' : x ? ' title="Có đứt chuỗi ở QĐ này"' : '')+'>'+(x ? '⚠ ' : '')+tg(v.qd[k])+'</td>'; }).join('') : '<td class="s">'+tg(v.tg)+'</td>')+
      '<td class="s">'+s(v.kh)+'</td><td class="s">'+s(v.dn)+'</td>'+con(v)+'</tr>'; }).join('');
  var bao = (r.tong.chuaGhep ? '<div class="sl-bao vang">⚠ '+r.tong.chuaGhep+' lượt QĐ năm '+r.nam+' <b>chưa ghép được xã</b> — không cộng vào bảng; anh mở ✎ QĐ đó, tích đúng xã.</div>' : '')+
    (r.coDau || inRa ? '' : '<div class="sl-bao vang">⚠ Chưa nạp <b>Mẫu 31 kỳ 12/'+(nam-1)+'</b> — chương trình không giao chưa có KH (KH = dư nợ 31/12/'+(nam-1)+'), cột Dư nợ 31/12 trống. Anh nạp ở <b>📥 Nạp &amp; KT</b> rồi mở lại.</div>');
  return bao+'<div class="th-nhom-ten"><b>📊 Kế hoạch dư nợ năm '+r.nam+'</b> <small>triệu đồng · dòng in đậm = tổng · '+(D.xep==='xa' ? 'xã › chương trình' : 'chương trình › xã')+(inRa ? '' : ' · bấm dòng in đậm để gập / mở')+'</small></div>'+
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-b"><thead>'+dau+'</thead><tbody>'+than+'</tbody></table></div>';
}
var PB_DB_CSS = 'table.pb-dut-bang td.s{text-align:right}table.pb-dut-bang td.do{color:#b42318}td.pb-dut-o{background:#fdebc8}'+
  'table.pb-b td.s{text-align:right}table.pb-b td.c{text-align:center}tr.pb-b-khoi td,tr.pb-b-c1 td,tr.pb-b-tong td{font-weight:bold}tr.pb-b-c2 td:nth-child(2){padding-left:10pt}table.pb-b td.do{color:#b42318}'+
  '.pb-c{padding:0 3px;border-radius:6px;font-weight:bold}.pb-c.tang,.pb-c.khop{color:#1a6e3f}.pb-c.giam,.pb-c.lech{color:#b42318}.pb-c.canh{color:#8a6100}'+
  '.pb-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:6px 0}.pb-the{border:1px solid #ccc;border-radius:8px;padding:6px 8px}.pb-the span,.pb-the small{display:block;color:#555;font-size:9pt}.pb-the b{font-size:15pt}'+
  '.pb-tien{height:5px;background:#e3e3e3;border-radius:3px}.pb-tien i{display:block;height:5px;background:#2a78d6;border-radius:3px}.pb-db-svg{width:100%;height:auto;max-height:70mm}.pb-db-luoi{stroke:#ddd}.pb-db-truc{fill:#555;font-size:10px}'+
  '.pb-db-vung{fill:rgba(42,120,214,.12)}.pb-db-dn{fill:none;stroke:#2a78d6;stroke-width:2}.pb-db-kh{fill:none;stroke:#eb6834;stroke-width:2;stroke-dasharray:6 4}.pb-db-diem{fill:#2a78d6}.pb-db-diem-kh{fill:#eb6834}'+
  '.pb-db-chu span{margin-right:14px;font-size:9pt}.pb-db-chu small{display:none}.pb-db-l{display:inline-block;width:14px;height:0;border-top:2px solid #2a78d6;margin-right:4px;vertical-align:middle}.pb-db-l.kh{border-top:2px dashed #eb6834}'+
  '.pb-db-moc{display:flex;flex-wrap:wrap;align-items:flex-start;margin:6px 0}.pb-db-nut{text-align:center;min-width:70px;font-size:9pt}.pb-db-nut b,.pb-db-nut span,.pb-db-nut small{display:block}.pb-db-nut i{display:none}.pb-db-noi{width:10px}.pb-db-chip.tang{color:#1a6e3f}.pb-db-chip.giam{color:#b42318}';
function pbDBIn(){ var r = PB.db.r; if(!r) return '';
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Dien bien phan von KH nam '+r.nam+'</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:"Times New Roman",serif;font-size:11pt}table{border-collapse:collapse;width:100%;margin-bottom:6pt}td,th{border:.5pt solid #000;padding:1pt 3pt}'+
    '.so{text-align:right}tr.tong td{font-weight:bold}.xanh{color:#1a6e3f}.do{color:#b42318}.to-bang-cuon{break-inside:avoid}'+PB_DB_CSS+'</style></head><body>'+
    '<h3 style="text-align:center;margin:0 0 6pt">DIỄN BIẾN PHÂN VỐN THEO KẾ HOẠCH NĂM '+r.nam+'</h3><p style="margin:0 0 4pt">Đơn vị: triệu đồng · '+r.tong.soQD+' QĐ</p>'+pbDutHTML(r.dut || [], true)+pbDBBang(r, true)+
    (PB.db.them ? pbDBNoi(r, true)+pbDBXa(r, true) : '')+'</body></html>'; }
function pbDBExcel(){
  var r = PB.db.r; if(!r) return;
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    if(!window.XLSX) throw new Error('Chưa tải được bộ Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new(), so = function(v){ return v==null ? '' : v; };
    var dX = function(x){ return [so(x.dgDau), so(x.tongTG), so(x.khCuoi), so(x.hienTai), x.soKhongGiao ? so(x.khongGiao) : '', so(x.hienTaiTatCa), so(x.conTH), so(x.pct)]; };   /* 3.305: còn phải TH, % so tổng dư nợ mọi CT */
    var dau1 = ['Đã giao đầu', '± trong năm', 'KH cuối năm', 'Dư nợ CT có giao', 'Dư nợ CT không giao', 'Tổng dư nợ thực tế', 'Còn phải TH (KH − tổng)', '% đạt (tổng / KH)'];
    var a1 = [['Xã / phường'].concat(dau1)].concat(r.theoXa.map(function(x){ return [x.tenXa].concat(dX(x)); })).concat([['Cộng'].concat(dX(r.tong))]);
    var a5 = [['Nguồn vốn'].concat(dau1)].concat((r.tong.theoNguon || []).map(function(n){ return [pbNguonChu(n.nguon)].concat(dX(n)); })).concat([['Cộng'].concat(dX(r.tong))]);
    var a2 = [['Xã / phường', 'Mã CT', 'Chương trình', 'Nguồn', 'Dư nợ 31/12 năm trước', 'Đã giao đầu', 'Diễn biến QĐ', 'KH cuối năm', 'Dư nợ thực tế', 'Còn phải TH', '% đạt']].concat(r.nhom.map(function(n){
      return [n.tenXa, n.ma, pbTenCT(n.ma), pbNguonChu(n.nguon), so(n.dauNam), so(n.dgDau), n.khongGiao ? 'không giao' : n.ds.map(function(x){ return 'QĐ '+x.q.so+' '+pbNgay(x.q.ngay)+': '+pbSoDau(x.tangGiam)+' → '+pbSoVN(x.denT); }).join('; '),
        so(n.khCuoi), so(n.hienTai), so(n.conTH), so(n.pct)]; }));
    var a3 = [['Mốc', 'KH giao (mọi CT)', 'KH CT có giao', 'KH CT không giao (dư nợ đầu năm)', 'Tổng dư nợ thực tế', 'Dư nợ CT có giao', 'Dư nợ CT không giao', 'Chênh (dư nợ − KH)', '% đạt']].concat(r.thang.map(function(t){
      return [t.dau ? '31/12/'+String(t.ky).slice(0, 4) : slKyChu(t.ky), so(t.kh), so(t.khGiao), so(t.khKG), so(t.dn), so(t.dnGiao), so(t.dnKG), t.kh!=null && t.dn!=null ? pbR(t.dn - t.kh) : '', t.kh && t.dn!=null ? Math.round(t.dn/t.kh*1000)/10 : '']; }));
    var a6 = [['Mốc', 'Xã / phường', 'Mã CT', 'Chương trình', 'Nguồn', 'Có giao', 'KH', 'Dư nợ thực tế', 'Chênh']];   /* 3.308: từng mốc × xã × CT */
    r.thang.forEach(function(t){ var nh = t.dau ? '31/12/'+String(t.ky).slice(0, 4) : slKyChu(t.ky); r.nhom.forEach(function(n, i){ var c = t.ct[i]; a6.push([nh, n.tenXa, n.ma, pbTenCT(n.ma), pbNguonChu(n.nguon), n.khongGiao ? 'không' : 'có', so(c.kh), so(c.dn), c.kh!=null && c.dn!=null ? pbR(c.dn - c.kh) : '']); }); });
    var a4 = [['QĐ', 'Ngày', 'Loại', 'Số xã', '± (triệu)', 'KH sau QĐ']].concat(r.moc.map(function(m){ return [m.so, pbNgay(m.ngay), m.loai, m.soXa, m.tg, so(m.kh)]; }));
    var H = pbDBHang(r), kyT = r.thang.filter(function(t){ return !t.dau; }).pop(), sv = function(v){ return v==null ? '' : Math.round(v); };   /* 3.471: sheet đầu = bảng cơ bản như màn hình */
    var a0 = [['STT', 'Đơn vị', 'Dư nợ 31/12/'+(+r.nam-1), 'Giao đầu năm'].concat(H.moc.length ? H.moc.map(function(m){ return 'QĐ '+m.so+' '+pbNgay(m.ngay); }) : ['Tăng / giảm']).concat(['KH cuối năm', 'Dư nợ '+(kyT ? slKyChu(kyT.ky) : 'hiện tại'), 'Còn phải thực hiện (âm = vượt)', '% thực hiện'])]
      .concat(H.dong.map(function(d){ var v = d.v; return [d.stt, (d.cap===2 ? '   ' : '')+d.ten+(d.kg ? ' (không giao)' : ''), sv(v.dau), sv(v.giao)].concat(H.moc.length ? H.moc.map(function(m){ return sv(v.qd[H.kQD(m)]); }) : [sv(v.tg)])
        .concat([sv(v.kh), sv(v.dn), v.thieu || v.kh==null || v.dn==null ? '' : Math.round(v.kh - v.dn), !v.thieu && v.kh && v.dn!=null ? Math.round(v.dn/v.kh*1000)/10 : '']); }));
    var aD = [['QĐ bị đứt', 'Ngày QĐ', 'Mã CT', 'Chương trình', 'Xã', 'Nguồn', 'Đã giao (QĐ này)', 'Đến 31/12 QĐ trước', 'QĐ trước', 'Ngày QĐ trước', 'Chênh']].concat((r.dut || []).map(function(x){
      return [x.q.so+(x.q.kyHieu || ''), pbNgay(x.q.ngay), x.ma, pbTenCT(x.ma), pbDBTenXa(x.xa, x.tenXa), pbNguonChu(x.nguon), x.daGiao, x.denTruoc, x.qTruoc.so+(x.qTruoc.kyHieu || ''), pbNgay(x.qTruoc.ngay), x.chenh]; }));   /* 3.478 */
    [['Bang KH', a0, [6, 42, 14, 14].concat(H.moc.length ? H.moc.map(function(){ return 12; }) : [12]).concat([14, 14, 16, 10])],
     ['Dut chuoi', aD, [22, 11, 7, 34, 22, 7, 14, 14, 22, 11, 10]],
     ['Theo xa', a1, [22, 12, 12, 13, 14, 16, 16, 18, 14]], ['Theo nguon', a5, [12, 12, 12, 13, 14, 16, 16, 18, 14]], ['Chi tiet', a2, [20, 7, 34, 7, 14, 12, 60, 12, 13, 12, 8]], ['Theo thang', a3, [14, 15, 13, 18, 15, 14, 16, 16, 8]], ['Thang x xa x CT', a6, [14, 20, 7, 34, 7, 8, 12, 13, 12]], ['QD', a4, [10, 11, 12, 7, 11, 12]]].forEach(function(s){
      var ws = XLSX.utils.aoa_to_sheet(s[1]); ws['!cols'] = s[2].map(function(w){ return {wch:w}; }); XLSX.utils.book_append_sheet(wb, ws, s[0]); });
    var ten = xuatTen('Dien bien phan von KH', 'Nam '+r.nam, '')+'.xlsx', u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    giaoFile(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), ten); bao('Đã xuất '+ten, 5);
  }).catch(function(e){ baoLoi(e.message || String(e)); });
}
/* ---------- 3.478 (anh 05/11 "báo bị đứt chênh ở QĐ nào, chương trình nào"): ⚠ ĐỨT CHUỖI QĐ — bảng dùng chung (Diễn biến · Quyết định · in / Excel) ----------
   ds = pbDutChuoi(…) — mỗi dòng: QĐ bị đứt · chương trình · xã · nguồn · Đã giao QĐ này · Đến 31/12 QĐ trước (số QĐ) · chênh; bấm dòng = ✎ Sửa QĐ đó. */
function pbDutNguong(){ var n = (pbDL().ch || {}).nguongLech; return n==null ? 1 : +n; }
function pbDutNam(nam){ return pbDutChuoi(pbDL().qd, nam, pbDutNguong()); }
function pbDutHTML(ds, inRa){ if(!ds.length) return ''; var e = coChuHTML, qd = function(q){ return e(q.so+(q.kyHieu || ''))+' <small>'+pbNgay(q.ngay)+'</small>'; };
  var soQD = {}; ds.forEach(function(x){ soQD[pbKhoa(x.q)] = 1; });
  return '<div class="sl-bao vang pb-dut"><b>⚠ Đứt chuỗi QĐ: '+ds.length+' dòng ở '+Object.keys(soQD).length+' QĐ</b> — Đã giao của QĐ sau khác Đến 31/12 của QĐ trước. '+
      'KH vẫn theo <b>QĐ mới nhất</b>; soát lại số trên QĐ'+(inRa ? '' : ' (bấm dòng để ✎ sửa QĐ)')+'.</div>'+
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-dut-bang"><thead><tr><th>QĐ bị đứt</th><th>Chương trình</th><th>Xã</th><th>Nguồn</th><th>Đã giao (QĐ này)</th><th>Đến 31/12 QĐ trước</th><th>Chênh</th></tr></thead><tbody>'+
    ds.map(function(x){ return '<tr'+(inRa ? '' : ' data-lenh="pb.dutMo" data-k="'+e(pbKhoa(x.q))+'" title="Bấm để ✎ sửa QĐ '+e(x.q.so)+'"')+'><td>'+qd(x.q)+'</td><td>'+e(pbTenCT(x.ma))+' ('+e(x.ma)+')</td>'+
      '<td>'+e(pbDBTenXa(x.xa, x.tenXa))+'</td><td>'+pbNguonChu(x.nguon)+'</td><td class="s">'+pbSoVN(x.daGiao)+'</td>'+
      '<td class="s">'+pbSoVN(x.denTruoc)+' <small>QĐ '+e(x.qTruoc.so)+' · '+pbNgay(x.qTruoc.ngay)+'</small></td><td class="s do"><b>'+pbSoDau(x.chenh)+'</b></td></tr>'; }).join('')+'</tbody></table></div>';
}
function pbDutTatHTML(){   /* tab Quyết định: mọi năm có QĐ, năm mới trước */
  var nam = {}; pbDL().qd.forEach(function(q){ if(q.ngay) nam[String(q.ngay).slice(0, 4)] = 1; });
  var ds = []; Object.keys(nam).sort().reverse().forEach(function(n){ ds = ds.concat(pbDutNam(n).reverse()); }); return pbDutHTML(ds); }
