/* ===== 3.409 (anh 30/10 "làm nút so 2 cách coi có chênh ko, rồi bản tiếp bỏ"): ⚖ SO CÁCH CŨ / MỚI — TẠM, CẮM RÚT (bỏ dòng <script> trong index.html là hết).
   Chạy 2 cách trên chính số liệu kỳ đang xem, liệt kê chỗ ra khác nhau — chỉ đọc, không sửa số liệu:
   ① ấp của tổ (cũ: Mẫu 31 · mới 3.401: mã thôn File Tổ trưởng) ② tên xã (cũ: dòng đầu gặp · mới 3.409: đa số Mẫu 31) ③ điểm GD món vay trực tiếp
   (cũ: danh mục → ấp → GDXA · mới 3.401: ấp → danh mục → GDXA) ④ ngày GD của điểm (mới 3.407: GDXA đa số khi file không có)
   ⑤ số dư TK 105 khách (cũ: sổ lớn nhất · mới 3.409: cộng sổ) ⑥ ngày chuyển quá hạn (cũ: cột hệ thống · mới 3.404: tính theo phiên khi cột trống). Nút ở 🗺 Địa bàn + mục Kiểm tra kỳ. ===== */
function socTinh(K){
  var T = K.to, R = {ap:[], xa:[], tt:[], ng:[], t105:[], cqh:[]}, dn = function(m){ return (K.kh[m]||[]).reduce(function(a, o){ return a+(o.dn||0); }, 0); };
  /* ① ấp của tổ */
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep || !t.thonTT || !t.thonM31) return;
    var r0 = (K.kh[m]||[]).find(function(o){ return String(o.thon)===String(t.thonM31); }) || {};
    R.ap.push([m, t.ten||'', t.tenXa||t.xa||'', t.thonM31+' '+(r0.tenThon||''), t.thon+' '+(t.tenThon||''), dn(m)]); });
  /* ② tên xã */
  var dau = {}; (K.hs||[]).forEach(function(o){ if(o.to && !dau[o.to] && o.tenXa) dau[o.to] = o.tenXa; });
  var xaCu = {}; Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep) return; var c = dau[m] || (t.ds && t.ds.tenXa) || (t.tt && t.tt.tenXa) || ''; if(c && c!==t.tenXa){ var k = t.xa+'|'+c+'|'+t.tenXa, x = xaCu[k] = xaCu[k] || [t.xa, c, t.tenXa, 0]; x[3]++; } });
  Object.keys(xaCu).forEach(function(k){ R.xa.push(xaCu[k]); });
  /* ③ điểm GD món vay trực tiếp — dựng lại cách cũ từ cây tổ hiện tại */
  var diem = {}, ap = {}, xa = {};
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep || !t.xa || !t.diem) return;
    if(t.ngayGD){ var k = t.xa+'|'+(+t.ngayGD); if(!diem[k]) diem[k] = t; }
    var th = t.thonM31 || t.thon; if(th){ var a = ap[t.xa+'|'+th] = ap[t.xa+'|'+th] || {}; a[t.diem] = a[t.diem] || {n:0, t:t}; a[t.diem].n++; }
    var x = xa[t.xa] = xa[t.xa] || {}; if(!x[t.diem]) x[t.diem] = t; });
  var nhieu = function(a){ var tot = null; Object.keys(a||{}).forEach(function(k){ if(!tot || a[k].n>tot.n) tot = a[k]; }); return tot && tot.t; };
  var theoApCu = function(o){ var g = null; if(!o.thon) return null;
    (D.cauHinh.diaBan||[]).forEach(function(x){ if(g || (x.ma && String(x.ma)!==String(o.xa))) return;
      (x.diem||[]).forEach(function(z){ if(!g && (z.ap||[]).some(function(a){ return String(a.ma)===String(o.thon); })){ var c = Object.keys(T).map(function(m){ return T[m]; }).find(function(t){ return !t.trucTiep && t.xa===o.xa && String(t.diem)===String(z.ma); }); g = c || {diem:z.ma, tenDiem:z.ten}; } }); });
    return g || nhieu(ap[o.xa+'|'+o.thon]); };
  var tenD = function(d){ return d ? String(d.tenDiem||d.diem||'').trim() : '(chưa rõ)'; };
  (K.hs||[]).forEach(function(o){ if(o.to || !o.ku || !o.xa || !o._tt || !((o.dn||0)>0 || (o.qh||0)>0)) return;
    var mot = Object.keys(xa[o.xa]||{}), d = theoApCu(o) || diem[o.xa+'|'+(+(o.ngayGD||0))] || (mot.length===1 ? xa[o.xa][mot[0]] : null);
    var cu = 'TT'+o.xa+'_'+(d ? String(d.diem||d.tenDiem) : 'd'+(o.ngayGD||''));
    if(cu!==o._tt) R.tt.push([o.ku, o.kh||'', o.ten||'', o.tenXa||o.xa||'', String(o.thon||''), tenD(d), tenD(T[o._tt]), o.dn||0]); });
  /* ④ ngày GD của điểm theo GDXA đa số */
  var dd = {}; Object.keys(K.ngDaSo||{}).forEach(function(dm){ Object.keys(T).forEach(function(m){ var t = T[m]; if(!t.trucTiep && String(t.diem)===String(dm)){ var x = dd[dm] = dd[dm] || [t.tenXa||t.xa||'', String(t.tenDiem||dm).trim(), '(trống)', K.ngDaSo[dm], 0]; x[4]++; } }); });
  Object.keys(dd).forEach(function(k){ R.ng.push(dd[k]); });
  /* ⑤ số dư TK 105 */
  var cu5 = {}, moi5 = {}, so = {}, ten = {}, to = {};
  (K.hs||[]).concat(K.lap||[]).forEach(function(o){ if(!o.kh) return; cu5[o.kh] = Math.max(cu5[o.kh]||0, +o.t105||0); moi5[o.kh] = slT105Them(moi5, o, o.kh);
    slStk(o.stk).forEach(function(z){ (so[o.kh] = so[o.kh] || {})[z] = 1; }); if(!ten[o.kh] && o.ten) ten[o.kh] = o.ten; if(!to[o.kh] && o.to) to[o.kh] = o.to; });
  Object.keys(moi5).forEach(function(m){ if(Math.abs((moi5[m]||0)-(cu5[m]||0))>0.5) R.t105.push([m, ten[m]||'', (T[to[m]]||{}).ten||to[m]||'', Object.keys(so[m]||{}).join(', '), cu5[m]||0, moi5[m]||0, (moi5[m]||0)-(cu5[m]||0)]); });
  /* ⑥ ngày chuyển quá hạn */
  if(typeof skCQH==='function') (K.hs||[]).forEach(function(o){ if(!o.ku || !((o.dn||0)>0) || o.qh>0 || o.kn>0) return; var c = skCQH(o);
    if(!o.dhgd && c.d) R.cqh.push([o.ku, o.kh||'', o.ten||'', ngayVNsl(skHL(o)), '(chưa có)', ngayVNsl(c.d), c.cach==='tt' ? 'trực tiếp: ngày làm việc sau hạn' : 'tính theo phiên điểm']);
    else if(c.lech) R.cqh.push([o.ku, o.kh||'', o.ten||'', ngayVNsl(skHL(o)), ngayVNsl(o.dhgd), ngayVNsl(c.tinh), '⚠ cột hệ thống khác phiên điểm (vẫn dùng cột hệ thống)']); });
  return R;
}
var SOC_MUC = [
  ['ap', '① Ấp của tổ — cũ: Mẫu 31 · mới: mã thôn File Tổ trưởng (cùng ngày)', ['Mã tổ', 'Tổ trưởng', 'Xã', 'Ấp cũ (Mẫu 31)', 'Ấp mới (File TT)', 'Dư nợ tổ']],
  ['xa', '② Tên xã — cũ: dòng đầu gặp · mới: tên đa số Mẫu 31', ['Mã xã', 'Tên cũ', 'Tên mới', 'Số tổ']],
  ['tt', '③ Điểm GD món vay trực tiếp — cũ: danh mục trước · mới: ấp của tổ trước', ['Số KU', 'Mã KH', 'Họ tên', 'Xã', 'Mã ấp', 'Điểm cũ', 'Điểm mới', 'Dư nợ']],
  ['ng', '④ Ngày GD của điểm — mới: theo GDXA đa số khi file không có', ['Xã', 'Điểm GD', 'Cũ', 'Mới', 'Số tổ']],
  ['t105', '⑤ Số dư TK 105 khách — cũ: sổ lớn nhất · mới: cộng sổ', ['Mã KH', 'Họ tên', 'Tổ', 'Các sổ', 'Cũ', 'Mới', 'Chênh']],
  ['cqh', '⑥ Ngày chuyển quá hạn — cũ: cột hệ thống · mới: tính theo phiên khi cột trống', ['Số KU', 'Mã KH', 'Họ tên', 'Hạn', 'Cũ', 'Mới', 'Ghi chú']]];
function socHTML(K){
  var R = socTinh(K), o = function(v){ return typeof v==='number' ? '<td class="s">'+tdnTien(v)+'</td>' : '<td>'+coChuHTML(String(v==null ? '' : v))+'</td>'; };
  return '<div class="hop-tit">⚖ So cách cũ / mới — '+coChuHTML(K.hsTen||kyVN(K.thang))+'</div><div class="hop-phu">Tạm để anh xem có chênh không (bản sau gỡ). Chỉ đọc, không sửa số liệu. ③ cách cũ dựng lại trên cây tổ hiện tại (gần đúng).</div>'+
    SOC_MUC.map(function(m){ var ds = R[m[0]];
      return '<details class="sc-muc"'+(ds.length ? '' : '')+'><summary>'+(ds.length ? '⚠ ' : '✓ ')+coChuHTML(m[1])+' — <b>'+(ds.length ? ds.length+' chỗ khác' : 'không chênh')+'</b></summary>'+
        (ds.length ? '<div class="bang-cuon"><table class="bc-bang"><thead><tr>'+m[2].map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+ds.slice(0, 500).map(function(r){ return '<tr>'+r.map(o).join('')+'</tr>'; }).join('')+'</tbody></table></div>'+(ds.length>500 ? '<small>… còn '+(ds.length-500)+' dòng</small>' : '') : '')+'</details>'; }).join('');
}
function socNut(){ socDK(); return GD.nut({chu:'⚖ So cách cũ / mới', lenh:'socach.mo', tit:'Tạm (bản sau gỡ): so 6 thay đổi gần đây trên số liệu kỳ này, xem có chênh không'}); }
function socDK(){ if(socDK.xong || typeof GD==='undefined') return; socDK.xong = 1; GD.dangKy('socach', {mo:function(){ var K = (typeof DBSL!=='undefined' && DBSL.K) || TO_K; if(!K){ bao('Chưa dựng được số liệu kỳ.'); return; } moHop(socHTML(K), true); }}); }
(function(){
  if(typeof dbslKhung==='function'){ var cu = dbslKhung; dbslKhung = function(){ return cu.apply(this, arguments).replace('<div class="db-tren">', '<div class="db-tren">'+socNut()); }; }
  if(typeof slKTAp==='function'){ var kt = slKTAp; slKTAp = function(K, them){ kt(K, them); if(!K || !K.to) return; try{ var R = socTinh(K);
    SOC_MUC.forEach(function(m){ them(6, 'So cách cũ / mới · '+m[1], !R[m[0]].length, R[m[0]].length ? R[m[0]].length+' chỗ khác' : 'không chênh', '', m[2], R[m[0]], R[m[0]].length ? 'canh' : ''); }); }catch(e){ console.warn('So cách cũ / mới', e); } }; }
})();
