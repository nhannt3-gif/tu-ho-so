/* ===== js/48c-pb-to-trinh.js — 3.494 (anh 07/11/2026, QĐ 4686): 📤 TỜ TRÌNH ĐIỀU CHỈNH KH — Biểu 09/KH (QUY TRÌNH NGƯỢC của phân bổ) =====
   Phân bổ: QĐ tỉnh → xã → thôn (Biểu 07 · 07/KH · 08/KH). Tờ trình: xã → tỉnh — Ban Đại diện HĐQT xã đề nghị tỉnh điều chỉnh chỉ tiêu theo chương trình.
   Anh chốt: "khi trình sẽ lấy số dư của chương trình, QĐ trước đó". Mỗi (xã · nguồn · năm), mỗi CT có QĐ trong năm:
     - Số tăng trưởng đã giao = cộng dồn tăng / giảm các QĐ trong năm (pbDienBien .tongTG) — anh sửa tay được (ô ✎, ↺ bỏ sửa)
     - KH hiện tại = Đến 31/12 của QĐ gần nhất (.khCuoi) · dư nợ thực tế Mẫu 31 kỳ mới nhất trong năm (chỉ tham khảo) · KH còn trống = KH − dư nợ
     - Đề nghị điều chỉnh (+/−) anh nhập · Số dư nợ năm = KH hiện tại + đề nghị
   Lưu KHO1 'pb'.tt['năm|xã|nguồn'] = {dn:{CT: số}, dg:{CT: số sửa tay}, sua} (đồng bộ Drive như QĐ). In: hộp Biểu 07 (PB07.mau = '09kh', mẫu js/mau/07kh.js pb09Lap).
   Khi tỉnh ra QĐ mới → anh nhập QĐ như thường rồi phân bổ xuống thôn (07/KH) — khép vòng. Cắm rút: bỏ dòng <script> là mất mục 📤 (js/48 chỉ gọi khi có hàm). ===== */
PB.tt = PB.tt || {nam:'', xa:'', nguon:1, daDoc:{}};
function pbTTKhoa(T){ return T.nam+'|'+T.xa+'|'+T.nguon; }
function pbTTLuuDL(){ var d = pbDL(); d.tt = d.tt && typeof d.tt==='object' ? d.tt : {}; return d; }
function pbTTBan(T){ var x = (pbDL().tt || {})[pbTTKhoa(T)] || {}; return {dn:x.dn || {}, dg:x.dg || {}}; }
function pbTTKyTT(nam){ return pbDsKyCX().filter(function(k){ return String(k).slice(0, 4)===String(nam); }).sort().pop() || ''; }
function pbTTXa(nam){ var g = {}, r = []; pbDL().qd.forEach(function(q){ if(String(q.ngay).slice(0, 4)!==nam || !q.xa || g[q.xa]) return; g[q.xa] = 1; r.push({xa:q.xa, ten:q.tenXa || q.xa}); });
  return r.sort(function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi'); }); }
/* QĐ gần nhất của tỉnh cho xã · nguồn trong năm (căn cứ trên tờ trình) */
function pbTTQDCuoi(T){ var ds = pbDL().qd.filter(function(q){ return String(q.ngay).slice(0, 4)===T.nam && q.xa===T.xa && +q.nguon===+T.nguon; })
  .sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : String(a.luc || '') < String(b.luc || '') ? -1 : 1; }); return ds[ds.length-1] || null; }
/* → {dong:[{ma, ten, tg (cộng dồn), dg (in), suaDg, kh, ht, con, dn, nam}], q, ky, tenXa} */
function pbTTTinh(T){
  var ky = pbTTKyTT(T.nam), Dn = ky ? PB.dn[ky] : null, B = pbTTBan(T);
  var r = pbDienBien(pbDL().qd, T.nam, {xa:T.xa, nguon:+T.nguon}, {ds:[], thang:Dn ? [{ky:ky, f:function(xa, ma, nv){ return pbDCTong(Dn, xa, ma, nv); }}] : []});
  var dong = r.nhom.filter(function(n){ return !n.khongGiao && n.xa===T.xa && n.nguon===+T.nguon; }).sort(function(a, b){ return a.ma < b.ma ? -1 : a.ma > b.ma ? 1 : 0; }).map(function(n){
    var sua = B.dg[n.ma]!=null && B.dg[n.ma]!=='', dg = sua ? +B.dg[n.ma] : pbR(n.tongTG), kh = pbR(n.khCuoi), dn = pbSo(B.dn[n.ma]) || 0;
    return {ma:n.ma, ten:pbTenCT(n.ma), vt:pbVT(n.ma), tg:pbR(n.tongTG), dg:dg, suaDg:sua, kh:kh, ht:n.hienTai, con:n.hienTai==null ? null : pbR(kh - n.hienTai), dn:dn, nam:pbR(kh + dn)}; });
  var q = pbTTQDCuoi(T), x = pbTTXa(T.nam).filter(function(o){ return o.xa===T.xa; })[0];
  return {dong:dong, q:q, ky:Dn ? ky : '', tenXa:x ? x.ten : T.xa};
}
function pbTTVe(){
  var o = document.getElementById('pb-phai'); if(!o) return;
  var T = PB.tt, dsN = pbDCNam(), dau = '<div class="th-nhom-ten"><b>📤 Tờ trình điều chỉnh KH — Biểu 09/KH</b> <small>xã đề nghị tỉnh điều chỉnh chỉ tiêu (quy trình ngược của phân bổ, QĐ 4686)</small></div>';
  if(!dsN.length){ o.innerHTML = dau+'<div class="sl-phu">Chưa có QĐ — nhập QĐ ở 📋 Quyết định trước (tờ trình lấy số theo QĐ đã giao).</div>'; return; }
  if(dsN.indexOf(T.nam)<0) T.nam = dsN[0];
  var dsX = pbTTXa(T.nam); if(!dsX.some(function(x){ return x.xa===T.xa; })) T.xa = (dsX.filter(function(x){ return x.xa===PB.chon.xa; })[0] || dsX[0] || {}).xa || '';
  var ky = pbTTKyTT(T.nam);
  if(ky && !PB.dn[ky] && !T.daDoc[ky]){ T.daDoc[ky] = 1; o.innerHTML = dau+'<div class="sl-phu">Đang đọc dư nợ Mẫu 31 '+slKyChu(ky)+'…</div>';
    pbDuNo(ky).catch(function(){ return null; }).then(function(){ if(PB.che==='tt') pbTTVe(); }); return; }
  var coNguon = {}; pbDL().qd.forEach(function(q){ if(String(q.ngay).slice(0, 4)===T.nam && q.xa===T.xa) coNguon[+q.nguon] = 1; }); if(!coNguon[+T.nguon]) T.nguon = coNguon[1] ? 1 : coNguon[2] ? 2 : 1;
  var R = pbTTTinh(T), c = function(v){ return v==null ? '—' : pbSoVN(Math.round(v*100)/100); }, tong = function(f){ var s = 0, co = false; R.dong.forEach(function(d){ var v = f(d); if(v!=null){ co = true; s += v; } }); return co ? pbR(s) : null; };
  var chon = GD.hang([GD.kv('Năm', '<select data-lenh="pb.ttNam" data-su="change">'+dsN.map(function(n){ return '<option'+(n===T.nam ? ' selected' : '')+'>'+n+'</option>'; }).join('')+'</select>'),
    GD.kv('Xã', '<select data-lenh="pb.ttXa" data-su="change">'+dsX.map(function(x){ return '<option value="'+coChuHTML(x.xa)+'"'+(x.xa===T.xa ? ' selected' : '')+'>'+coChuHTML(x.ten)+'</option>'; }).join('')+'</select>'),
    '<span class="sl-phu">Nguồn:</span>', GD.chip('Trung ương', +T.nguon===1, 'pb.ttNguon', {v:'1'}), GD.chip('Địa phương', +T.nguon===2, 'pb.ttNguon', {v:'2'})]);
  var q = R.q, can = q ? '<div class="sl-phu">Căn cứ QĐ gần nhất: <b>QĐ '+coChuHTML(q.so)+'</b> ngày '+pbNgay(q.ngay)+' ('+coChuHTML(q.loai || '')+') · dư nợ thực tế: '+(R.ky ? 'Mẫu 31 '+slKyChu(R.ky) : '<i>chưa có Mẫu 31 trong năm</i>')+'</div>' : '';
  var bang = !R.dong.length ? '<div class="sl-phu">Xã này chưa có QĐ nguồn '+(+T.nguon===2 ? 'địa phương' : 'trung ương')+' trong năm '+T.nam+'.</div>' :
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-tt"><thead><tr><th>Chương trình</th><th title="Cộng dồn tăng / giảm các QĐ trong năm — sửa tay được">Số tăng trưởng đã giao</th><th title="Đến 31/12 của QĐ gần nhất">KH hiện tại</th>'+
    '<th>Dư nợ thực tế</th><th title="KH hiện tại − dư nợ thực tế">KH còn trống</th><th>Đề nghị điều chỉnh (+/−)</th><th>Số dư nợ năm '+T.nam+'</th></tr></thead><tbody>'+
    R.dong.map(function(d){ return '<tr><td>'+coChuHTML(d.vt)+' <small class="sl-phu">'+coChuHTML(d.ten)+'</small></td>'+
      '<td class="so">'+GD.o({loai:'so', gt:d.suaDg ? c(d.dg) : '', ph:c(d.tg), lenh:'pb.ttDg', du:{ct:d.ma}})+(d.suaDg ? ' '+GD.nut({chu:'↺', lenh:'pb.ttDgBo', du:{ct:d.ma}, tit:'Bỏ sửa tay — về cộng dồn '+c(d.tg), lop:'pb-nho'}) : '')+'</td>'+
      '<td class="so">'+c(d.kh)+'</td><td class="so">'+c(d.ht)+'</td><td class="so'+(d.con!=null && d.con<0 ? ' do' : '')+'">'+(d.con==null ? '—' : d.con<0 ? 'vượt '+c(-d.con) : c(d.con))+'</td>'+
      '<td class="so">'+GD.o({loai:'so', gt:d.dn ? pbSoDau(d.dn) : '', ph:'0', lenh:'pb.ttDn', du:{ct:d.ma}})+'</td><td class="so"><b>'+c(d.nam)+'</b></td></tr>'; }).join('')+
    '</tbody><tfoot><tr class="tong"><td>Cộng</td><td class="so">'+c(tong(function(d){ return d.dg; }))+'</td><td class="so">'+c(tong(function(d){ return d.kh; }))+'</td><td class="so">'+c(tong(function(d){ return d.ht; }))+'</td>'+
    '<td class="so">'+c(tong(function(d){ return d.con; }))+'</td><td class="so">'+pbSoDau(tong(function(d){ return d.dn; }) || 0)+'</td><td class="so"><b>'+c(tong(function(d){ return d.nam; }))+'</b></td></tr></tfoot></table></div>';
  var soDN = R.dong.filter(function(d){ return d.dn; }).length;
  o.innerHTML = dau+chon+can+bang+(R.dong.length ? '<div class="sl-phu">Đơn vị: triệu đồng. Ô đề nghị gõ số có dấu (vd +200, −150); tự lưu. Số dư nợ năm = KH hiện tại + đề nghị.</div>'+
    GD.hang([GD.nut({chu:'👁 Xem / In 09/KH'+(soDN ? ' ('+soDN+' CT đề nghị)' : ''), lenh:'pb.ttXem', chinh:1, tit:'Tờ trình + Danh mục — In / PDF / Word'}), GD.nut({chu:'🗑 Xóa đề nghị', lenh:'pb.ttXoa', tat:!soDN, tit:'Bỏ hết số đề nghị của xã · nguồn · năm này'})]) : '');
}
function pbTTGhi(f){ var d = pbTTLuuDL(), k = pbTTKhoa(PB.tt), x = d.tt[k] = d.tt[k] || {dn:{}, dg:{}}; x.dn = x.dn || {}; x.dg = x.dg || {}; f(x); x.sua = new Date().toISOString(); pbGhi(d); }
function pbTTSo(v){ v = String(v || '').replace(/[−–]/g, '-').replace(/\s/g, '').replace(/\./g, '').replace(',', '.'); return v==='' || v==='+' || v==='-' ? null : isNaN(+v) ? NaN : +v; }
function pbTTDuLieu(){   /* dữ liệu in 09/KH (pb09Lap) */
  var T = PB.tt, R = pbTTTinh(T), q = R.q;
  return {dv:pbDonVi(R.tenXa), nam:T.nam, nguon:+T.nguon===2 ? 2 : 1, ngayQD:q ? String(q.ngay).slice(0, 10) : '', qd:q ? {so:String(q.so || '').trim(), kyHieu:String(q.kyHieu || '').trim(), ngay:String(q.ngay).slice(0, 10), laDC:/điều chỉnh/i.test(String(q.loai || ''))} : null,
    ct:R.dong.map(function(d){ return {ma:d.ma, ten:d.ten, dg:d.dg, dn:d.dn, nam:d.nam}; })};
}
function pbTTXem(){
  var d = pbTTDuLieu(); if(!d.ct.length) return baoLoi('Chưa có chương trình nào (xã chưa có QĐ trong năm).');
  if(!d.ct.some(function(c){ return c.dn; }) && !confirm('Chưa nhập số đề nghị điều chỉnh nào — vẫn mở tờ trình (danh mục sẽ trống trừ khi chọn "đủ chương trình")?')) return;
  PB07.mau = '09kh'; PB07.du = false; PB07.dl = [d]; PB07.bo = []; PB07.canh = []; PB07.K = pb07KBMoi(); PB07.kbMo = false;
  moHop('<div class="hop-tit">📤 Tờ trình 09/KH — '+coChuHTML(d.dv.thuong)+' · năm '+d.nam+' · '+(d.nguon===2 ? 'ĐP' : 'TW')+'</div><div id="pb07-dau"></div>'+
    '<iframe id="pb07-khung" class="to-khung" title="Xem trước tờ trình 09/KH"></iframe><div id="pb07-nut"></div>', true);
  pb07Ve();
}
/* bản chụp nhẹ tờ trình đã xuất — KHO1 'pb'.b09 (tối đa 100) */
function pb09Luu(kieu){ var d = pbDL(), x = PB07.dl[0]; if(!x) return; d.b09 = Array.isArray(d.b09) ? d.b09 : [];
  d.b09.unshift({luc:new Date().toISOString(), kieu:kieu, xa:x.dv.thuong, nam:x.nam, nguon:x.nguon, ct:x.ct.filter(function(c){ return c.dn; }).map(function(c){ return [c.ma, c.dg, c.dn, c.nam]; })}); d.b09 = d.b09.slice(0, 100); pbGhi(d); }
GD.dangKy('pb', gdLenh({
  ttNam:function(el){ PB.tt.nam = el.value; pbTTVe(); },
  ttXa:function(el){ PB.tt.xa = el.value; pbTTVe(); },
  ttNguon:function(el){ PB.tt.nguon = +el.getAttribute('data-v'); pbTTVe(); },
  ttDn:function(el){ var v = pbTTSo(el.value), ct = el.getAttribute('data-ct'); if(isNaN(v)) return baoLoi('"'+el.value+'" không phải số — gõ vd +200 hoặc -150 (triệu đồng).');
    pbTTGhi(function(x){ if(v==null || v===0) delete x.dn[ct]; else x.dn[ct] = pbR(v); }); pbGiuO(pbTTVe); },
  ttDg:function(el){ var v = pbTTSo(el.value), ct = el.getAttribute('data-ct'); if(isNaN(v)) return baoLoi('"'+el.value+'" không phải số.');
    pbTTGhi(function(x){ if(v==null) delete x.dg[ct]; else x.dg[ct] = pbR(v); }); pbGiuO(pbTTVe); },
  ttDgBo:function(el){ var ct = el.getAttribute('data-ct'); pbTTGhi(function(x){ delete x.dg[ct]; }); pbTTVe(); },
  ttXoa:function(){ if(!confirm('Xóa hết số đề nghị điều chỉnh của xã · nguồn · năm này?')) return; pbTTGhi(function(x){ x.dn = {}; }); pbTTVe(); },
  ttXem:function(){ pbTTXem(); }
}));
