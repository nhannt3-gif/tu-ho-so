/* ===== 3.567 (anh 25/11/2026: "tạo 1 báo cáo theo dõi món vay 3 tháng KHĐ theo xã, điểm giao dịch, hội đoàn thể diễn biến theo từng tháng, đầu năm,
   riêng hiện tại lấy dữ liệu ngày gần nhất" · "coi như đây là 1 chức năng quan trọng có thể theo dõi nhiều sau này"): 📈 DIỄN BIẾN THEO THÁNG =====
   - BỘ MÁY CHUNG: chỉ tiêu khai trong DBT.CHI (k · ten · lay(B) → [{ku, dn, to}]). Thêm chỉ tiêu (QH, khoanh, dư nợ…) = thêm 1 dòng — cùng khung bảng / lọc / Excel.
     Bản này: chỉ tiêu "khd" — món vay 3 tháng KHĐ TỰ TÍNH từ Mẫu 31 của từng kỳ (luật 3.563, slDsNo(B, 'khd')). Kỳ không có Mẫu 31 → "—" (không lấy file mẫu 14, không đoán).
   - CỘT: Đầu năm (Mẫu 31 chốt 12 năm trước) · T1 … các tháng đã chốt · HIỆN TẠI (Mẫu 31 ngày gần nhất đã nạp trong năm, ghi ngày) · Tăng / giảm so đầu năm ·
     Mới / Thoát (hiện tại so tháng chốt liền trước: món mới rơi vào KHĐ · món đã thoát KHĐ). Mỗi kỳ: số món + dư nợ.
   - HÀNG: Xã › Điểm GD › Hội (HND · HPN · HCCB · ĐTN · Vay trực tiếp) + dòng cộng xã / điểm + Tổng; theo lọc Xã / Điểm / Hội / Tổ của Sao kê. Món xếp theo tổ CỦA KỲ ĐÓ.
   - SỔ THEO DÕI: mỗi kỳ tính 1 lần → bản tóm tắt nhỏ lưu trên máy (IndexedDB: dbt|<chỉ tiêu>|<kỳ>|<mã băm Mẫu 31>) — mở lại không phải dựng 13 bộ Mẫu 31;
     thay / nạp lại Mẫu 31 kỳ nào → mã băm đổi → tự tính lại. Chỉ đọc số liệu (qua KHO). Cắm rút: bỏ dòng <script> là mất báo cáo, phần khác không đổi. ES5. */
var DBT = (function(){
  var M = {BAN:1, S:{}, daNap:false};
  M.CHI = [{k:'khd', ten:'món vay 3 tháng KHĐ', nhan:'Diễn biến món vay 3 tháng không hoạt động (KHĐ) — theo tháng, đầu năm, hiện tại; Xã › Điểm GD › Hội',
    lay:function(B){ return slDsNo(B, 'khd'); }}];
  M.chi = function(k){ return M.CHI.find(function(c){ return c.k===k; }); };
  /* ---------- 1. kỳ của năm ---------- */
  M.kyNam = function(nam){ var ds = KHO.dsBang('hstd').filter(function(e){ return e && e.ky; }), thang = {}, ngay = [];
    ds.forEach(function(e){ if(e.ky.length===7) thang[e.ky] = e; else ngay.push(e); });
    var dau = thang[(+nam-1)+'-12'] || null, T = Object.keys(thang).filter(function(k){ return k.slice(0, 4)===String(nam); }).sort();
    var hien = ds.filter(function(e){ return String(e.ngay || e.ky).slice(0, 4)===String(nam); }).sort(function(a, b){ var x = a.ngay || tdnCuoiKy(a.ky), y = b.ngay || tdnCuoiKy(b.ky); return x<y ? -1 : (x>y ? 1 : (a.ky.length-b.ky.length)); }).pop() || null;
    var cot = [{nhan:'Đầu năm', phu:'31/12/'+(+nam-1), ky:(+nam-1)+'-12', e:dau, dau:1}];
    var thHien = hien ? slThang(hien.ngay || hien.ky) : '';
    for(var m = 1; m <= 12; m++){ var k = nam+'-'+hai(m); if(!thHien || k>=thHien) break;   /* các tháng trước tháng của "hiện tại"; tháng chưa nạp Mẫu 31 → cột "—" */
      cot.push({nhan:'T'+m, phu:kyVN(k), ky:k, e:thang[k] || null}); }
    if(hien) cot.push({nhan:'Hiện tại', phu:ngayVNsl(hien.ngay || tdnCuoiKy(hien.ky)), ky:hien.ky, e:hien, hien:1});
    return cot; };
  /* ---------- 2. sổ theo dõi 1 kỳ ---------- */
  M.khoa = function(chi, e){ return 'dbt|'+chi+'|'+e.ky+'|'+(e.hash || e.luc || '')+'|'+M.BAN; };
  M.tinh = function(chi, e){ var c = M.chi(chi);
    return KHO.bo(e.ky).then(function(B){ if(!B || B.hsTen!=='Mẫu 31') return {ky:e.ky, ngay:e.ngay, khong:1};
      return KHO.nap(e.ky).then(function(K){ var ku = {}, to = {};
        (c.lay(B) || []).forEach(function(o){ if(!o || !o.ku || ku[o.ku]) return; var m = toMaCua(o), t = KHO.toKy(K, m);
          ku[o.ku] = [m, Math.round(o.dn||0)];
          if(t && !to[m]) to[m] = {ma:t.ma, xa:t.xa, tenXa:t.tenXa||'', khoaDiem:t.khoaDiem||'', tenDiem:String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, ''), dv:String(t.dv||''), thon:t.thon||'', tenThon:t.tenThon||'', trucTiep:!!t.trucTiep}; });
        return {ky:e.ky, ngay:e.ngay || tdnCuoiKy(e.ky), ku:ku, to:to}; }); }); };
  M.so = function(chi, e){ var k = M.khoa(chi, e); if(M.S[k]) return Promise.resolve(M.S[k]);
    return docFile(k).then(function(x){ if(x && x.ku){ return M.S[k] = x; }
      return M.tinh(chi, e).then(function(y){ M.S[k] = y; if(!y.khong) luuFile(k, y); return y; }); }); };
  M.napHet = function(chi, cot){ var p = Promise.resolve(), ds = cot.filter(function(c){ return c.e; }), i = 0;
    ds.forEach(function(c){ p = p.then(function(){ i++; if(typeof batChay==='function') batChay(true, 'Diễn biến KHĐ: đọc kỳ '+i+'/'+ds.length+' ('+c.phu+')…');
      return M.so(chi, c.e).then(function(s){ c.s = s; }, function(){ c.s = null; }); }); });
    return p.then(function(){ if(typeof tatChay==='function') tatChay(); }, function(er){ if(typeof tatChay==='function') tatChay(); throw er; }); };
  /* ---------- 3. gộp theo Xã › Điểm › Hội ---------- */
  M.HOI = ['11', '12', '13', '14', '99'];
  M.tenHoi = function(dv){ return dv==='99' ? 'Vay trực tiếp' : (tdnHoi(dv) || 'Hội '+dv); };
  M.gop = function(s, S){ var g = {}; if(!s || s.khong) return null;
    Object.keys(s.ku).forEach(function(ku){ var x = s.ku[ku], t = s.to[x[0]] || {xa:'', tenXa:'(chưa rõ xã)', khoaDiem:'', tenDiem:'(chưa rõ điểm)', dv:''};
      if(!pvLoc(S, t)) return; var dv = t.trucTiep ? '99' : t.dv, k = [t.xa, t.khoaDiem, dv].join('|');
      var a = g[k] = g[k] || {xa:t.xa, tenXa:t.tenXa, diem:t.khoaDiem, tenDiem:t.tenDiem, dv:dv, n:0, dn:0, ku:{}}; a.n++; a.dn += x[1]; a.ku[ku] = x[1]; });
    return g; };
  /* ---------- 4. lập báo cáo ---------- */
  M.lap = function(chi){
    var c = M.chi(chi), N = skNen31('db_'+chi); if(N.can) return N.can;
    var nam = SK_K.thang.slice(0, 4), cot = M.cot && M.cot.nam===nam && M.cot.chi===chi ? M.cot.ds : M.kyNam(nam), S = skCH();
    cot.forEach(function(k){ if(k.e && !k.s) k.s = M.S[M.khoa(chi, k.e)] || null; k.g = M.gop(k.s, S); });
    var hien = cot.find(function(k){ return k.hien; }), dau = cot[0], thHien = hien ? slThang(hien.e.ngay || hien.ky) : '';
    var truoc = cot.filter(function(k){ return !k.hien && !k.dau && k.g && k.ky<thHien; }).pop() || (dau.g && dau.ky<thHien ? dau : null);
    /* khung hàng: hợp mọi kỳ */
    var hang = {}; cot.forEach(function(k){ if(!k.g) return; Object.keys(k.g).forEach(function(x){ var a = k.g[x], h = hang[x];
      if(!h || k.hien) hang[x] = {xa:a.xa, tenXa:a.tenXa, diem:a.diem, tenDiem:a.tenDiem, dv:a.dv}; }); });
    var keys = Object.keys(hang).sort(function(a, b){ var x = hang[a], y = hang[b];
      return (x.tenXa||'').localeCompare(y.tenXa||'', 'vi') || (x.tenDiem||'').localeCompare(y.tenDiem||'', 'vi') || (M.HOI.indexOf(x.dv)-M.HOI.indexOf(y.dv)); });
    var cong = function(k, ds){ if(!k.g) return null; var r = {n:0, dn:0, ku:{}}; ds.forEach(function(x){ var a = k.g[x]; if(!a) return; r.n += a.n; r.dn += a.dn; for(var u in a.ku) r.ku[u] = a.ku[u]; }); return r; };
    var moiThoat = function(ds){ if(!hien || !hien.g || !truoc || !truoc.g) return null; var a = cong(hien, ds), b = cong(truoc, ds), r = {mn:0, md:0, tn:0, td:0};
      for(var u in a.ku) if(!(u in M.kuHet(truoc))){ r.mn++; r.md += a.ku[u]; }
      for(var v in b.ku) if(!(v in M.kuHet(hien))){ r.tn++; r.td += b.ku[v]; }
      return r; };
    /* dòng: Tổng → Xã → Điểm → Hội */
    var dong = [], nhom = function(cap, nhan, ds){ dong.push({cap:cap, nhan:nhan, ds:ds}); };
    nhom('tong', 'TỔNG CỘNG', keys);
    var xa = []; keys.forEach(function(x){ if(xa.indexOf(hang[x].xa)<0) xa.push(hang[x].xa); });
    xa.forEach(function(X){ var kx = keys.filter(function(x){ return hang[x].xa===X; }); nhom('xa', 'Xã '+(hang[kx[0]].tenXa || '(chưa rõ)').replace(/^(Xã|Phường|Thị trấn)\s+/i, ''), kx);
      var di = []; kx.forEach(function(x){ if(di.indexOf(hang[x].diem)<0) di.push(hang[x].diem); });
      di.forEach(function(Dm){ var kd = kx.filter(function(x){ return hang[x].diem===Dm; }); nhom('diem', '   Điểm '+(hang[kd[0]].tenDiem || '(chưa rõ)'), kd);
        kd.forEach(function(x){ nhom('hoi', '      '+M.tenHoi(hang[x].dv), [x]); }); }); });
    /* bảng */
    var tr = function(v){ return Math.round((v||0)/1e5)/10; }, so = function(v){ return v==null ? '—' : tdnTien(v); };
    var th1 = '<tr><th rowspan="2">Xã › Điểm GD › Hội</th>'+cot.map(function(k){ return '<th colspan="2" title="'+coChuHTML(k.e ? (k.hien ? 'Mẫu 31 ngày gần nhất' : 'Mẫu 31 chốt tháng')+' · '+k.phu : 'Chưa nạp Mẫu 31 '+k.phu)+'">'+k.nhan+'<br><small>'+k.phu+'</small></th>'; }).join('')+
      '<th colspan="2">Tăng / giảm<br><small>so đầu năm</small></th><th colspan="2">Mới KHĐ<br><small>so '+(truoc ? truoc.phu : '—')+'</small></th><th colspan="2">Thoát KHĐ<br><small>so '+(truoc ? truoc.phu : '—')+'</small></th></tr>';
    var th2 = '<tr>'+cot.concat([{}, {}, {}]).map(function(){ return '<th>Món</th><th>Dư nợ (tr.đ)</th>'; }).join('')+'</tr>';
    var H1 = ['Xã › Điểm GD › Hội'], H2 = [''];
    cot.forEach(function(k){ H1.push(k.nhan+' ('+k.phu+')', ''); H2.push('Món', 'Dư nợ (đồng)'); });
    H1.push('Tăng/giảm so đầu năm', '', 'Mới KHĐ', '', 'Thoát KHĐ', ''); H2.push('Món', 'Dư nợ (đồng)', 'Món', 'Dư nợ (đồng)', 'Món', 'Dư nợ (đồng)');
    var aoa = [H1, H2], body = '', mau = function(v){ return v>0 ? ' style="color:#b42318"' : (v<0 ? ' style="color:#067647"' : ''); };
    dong.forEach(function(d){ var o = [], r = [d.nhan.trim()];
      cot.forEach(function(k){ var x = cong(k, d.ds); o.push('<td class="s">'+(x ? so(x.n) : '—')+'</td><td class="s">'+(x ? tr(x.dn).toLocaleString('vi-VN') : '—')+'</td>'); r.push(x ? x.n : '', x ? x.dn : ''); });
      var a = hien && cong(hien, d.ds), b = dau.g ? cong(dau, d.ds) : null;
      if(a && b){ var dn = a.n-b.n, dd = a.dn-b.dn; o.push('<td class="s"'+mau(dn)+'>'+(dn>0 ? '+' : '')+so(dn)+'</td><td class="s"'+mau(dd)+'>'+(dd>0 ? '+' : '')+tr(dd).toLocaleString('vi-VN')+'</td>'); r.push(dn, dd); }
      else { o.push('<td class="s">—</td><td class="s">—</td>'); r.push('', ''); }
      var mt = moiThoat(d.ds);
      if(mt){ o.push('<td class="s"'+mau(mt.mn)+'>'+so(mt.mn)+'</td><td class="s">'+tr(mt.md).toLocaleString('vi-VN')+'</td><td class="s"'+mau(-mt.tn)+'>'+so(mt.tn)+'</td><td class="s">'+tr(mt.td).toLocaleString('vi-VN')+'</td>'); r.push(mt.mn, mt.md, mt.tn, mt.td); }
      else { o.push('<td class="s">—</td><td class="s">—</td><td class="s">—</td><td class="s">—</td>'); r.push('', '', '', ''); }
      body += '<tr'+(d.cap==='tong' ? ' class="tong"' : d.cap==='xa' ? ' class="nhom"' : d.cap==='diem' ? ' class="cong"' : '')+'><td>'+coChuHTML(d.nhan).replace(/^( +)/, function(s){ return s.replace(/ /g, '&nbsp;'); })+'</td>'+o.join('')+'</tr>'; aoa.push(r); });
    var thieu = cot.filter(function(k){ return !k.e || (k.s && k.s.khong); }).map(function(k){ return k.phu; });
    var tom = '<div class="bc-tom">Tính từ <b>Mẫu 31 từng kỳ</b> (luật KHĐ 3.563 — không dùng file mẫu 14) · món xếp theo tổ của kỳ đó · Hiện tại = '+(hien ? '<b>Mẫu 31 ngày '+hien.phu+'</b>' : 'chưa có')+
      ' · Mới / Thoát so '+(truoc ? truoc.phu : '— (chưa có tháng chốt trước)')+(thieu.length ? ' · <b>chưa nạp Mẫu 31: '+thieu.join(', ')+'</b> (ô "—")' : '')+' · dư nợ triệu đồng (Excel: đồng).</div>';
    return {ten:('Dien bien '+chi+' '+nam).slice(0, 31), tieuDe:'DIỄN BIẾN '+c.ten.toUpperCase()+' NĂM '+nam, ngay:hien ? 'Đến ngày '+hien.phu : N.ngay,
      html:tom+'<div class="cuon"><table class="bc-bang"><thead>'+th1+th2+'</thead><tbody>'+body+'</tbody></table></div>', aoa:aoa};
  };
  M.kuHet = function(k){ return (k && k.s && k.s.ku) || {}; };   /* Mới / Thoát xét trên MỌI món của kỳ (món đổi điểm / Hội vẫn không tính là mới) */
  /* ---------- 5. gắn vào Sao kê ---------- */
  if(typeof SK_BC!=='undefined') M.CHI.forEach(function(c){ var i = -1; SK_BC.forEach(function(b, j){ if(b.k===c.k) i = j; });
    var x = {k:'db_'+c.k, ten:c.nhan, nhom:'xl', kho:'ngang', lap:function(){ return M.lap(c.k); }}; if(i>=0) SK_BC.splice(i+1, 0, x); else SK_BC.push(x); });
  if(typeof skXem==='function'){ var cuXem = skXem; skXem = function(){ var C = skCH(), self = this, a = arguments;
      var can = M.CHI.filter(function(c){ return C.bc && C.bc['db_'+c.k]; });
      if(can.length && !M.daNap && SK_K && SK_K.thang){ var nam = SK_K.thang.slice(0, 4), p = Promise.resolve();
        can.forEach(function(c){ p = p.then(function(){ var cot = M.kyNam(nam); M.cot = {nam:nam, chi:c.k, ds:cot}; return M.napHet(c.k, cot); }); });
        return p.then(function(){ M.daNap = true; try{ return skXem.apply(self, a); } finally { M.daNap = false; } }, function(er){ baoLoi('Diễn biến: không đọc được kỳ — '+(er && er.message || er)); }); }
      return cuXem.apply(this, arguments); }; }
  return M;
})();
