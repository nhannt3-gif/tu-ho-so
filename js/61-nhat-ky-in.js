/* ===== 3.348 (RA_SOAT_BO_CUC_2410 mục 8 việc 6 — góp ý 7.1): NHẬT KÝ ĐÃ LẬP / ĐÃ IN =====
   - Mỗi lần bấm 🖨 In · 📄 PDF · 📝 Word · 📊 Excel ở hàng nút xuất chung (xuatHang, js/24) → ghi 1 dòng: lúc, mẫu, cách, khách / tổ (nếu nơi gọi cho biết qua XUAT.nk), kỳ, tab.
   - Lưu ngăn D.nkIn (lưu theo ngăn + đồng bộ chỉ mục Drive như Scan / Chữ ký — gộp theo id, không mất dòng máy kia); giữ 13 tháng, tối đa 5.000 dòng.
   - Xem lại: thẻ khách (Tra cứu), thẻ tổ, hộp 📜 Nhật ký in (lọc theo khách / tổ / chữ). Không lưu file đã in. ES5. */
var NK_HAN = 400*864e5, NK_TOI_DA = 5000, NK_CACH = {'in':'🖨 In', pdf:'📄 PDF', word:'📝 Word', excel:'📊 Excel'};
function nkDs(){ return D.nkIn = D.nkIn || []; }
function nkDon(){ var han = new Date(Date.now()-NK_HAN).toISOString(), a = nkDs().filter(function(x){ return x && (x.taoLuc||'') >= han; });
  a.sort(function(x, y){ return x.taoLuc<y.taoLuc ? -1 : 1; }); if(a.length>NK_TOI_DA) a = a.slice(a.length-NK_TOI_DA); D.nkIn = a; return a; }
/* o = {mau, cach, kh:[], to:[], ky, tab} */
function nkGhi(o){
  o = o || {}; var mau = String(o.mau || '').trim(); if(!mau) return null;
  var kh = [].concat(o.kh || []).filter(Boolean).map(String), to = [].concat(o.to || []).filter(Boolean).map(String);
  var x = {id:'nk'+Date.now().toString(36)+Math.random().toString(36).slice(2, 6), taoLuc:new Date().toISOString(), mau:mau, cach:o.cach || 'in',
    kh:kh.slice(0, 200), to:to.slice(0, 200), ky:o.ky || '', tab:o.tab || (D.cauHinh && D.cauHinh.slTab) || ''};
  nkDs().push(x); nkDon(); luu(); if(typeof henDongBoChiMuc==='function') henDongBoChiMuc();
  return x;
}
/* gọi từ hàng nút xuất chung trước khi chạy lệnh in / xuất */
function nkXuat(cach){ try { var X = XUAT || {}, n = X.nk || {}, mau = n.mau || X.ten || '';
  if(!mau && typeof X.html==='function'){ var m = String(X.html()||'').match(/<title>([^<]*)<\/title>/i); mau = m ? m[1] : ''; }   /* nơi gọi chưa đặt tên → lấy tiêu đề trang in */
  nkGhi({mau:mau, cach:cach, kh:n.kh, to:n.to, ky:n.ky, tab:n.tab}); } catch(e){} }
function nkCua(loai, ma){ ma = String(ma||''); return ma ? nkDs().filter(function(x){ return (x[loai]||[]).indexOf(ma)>=0; }).sort(function(a, b){ return a.taoLuc<b.taoLuc ? 1 : -1; }) : []; }
function nkNgay(s){ var d = new Date(s); return isNaN(d) ? '' : ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear(); }
/* khối nhỏ cho thẻ khách / thẻ tổ: tối đa n dòng gần nhất, gộp cùng mẫu cùng ngày */
function nkKhoiHTML(loai, ma, n){
  nkDangKy();
  var a = nkCua(loai, ma), gap = {}, ds = [];
  a.forEach(function(x){ var k = x.mau+'|'+nkNgay(x.taoLuc); if(gap[k]) return; gap[k] = 1; ds.push(x); });
  var h = '<div class="tc-nhom nk-khoi"><div class="tc-nhom-tit">📜 Đã lập / in'+(a.length ? ' ('+ds.length+')' : '')+'</div>';
  if(!ds.length) return h+'<div class="nk-rong">Chưa có lần in nào ghi lại trên app cho '+(loai==='kh' ? 'khách' : 'tổ')+' này.</div></div>';
  return h+'<div class="nk-ds">'+ds.slice(0, n||6).map(function(x){ return '<span class="nk-dong" title="'+coChuHTML(NK_CACH[x.cach]||x.cach)+(x.ky ? ' · số liệu '+coChuHTML(x.ky) : '')+'"><b>'+coChuHTML(x.mau)+'</b> <small>'+nkNgay(x.taoLuc)+'</small></span>'; }).join('')+
    (ds.length>(n||6) ? GD.nut({chu:'xem hết', lenh:'nk.mo', du:{loai:loai, ma:ma}, lop:'nk-het'}) : '')+'</div></div>';
}
/* hộp 📜 Nhật ký in (toàn bộ hoặc lọc theo khách / tổ) */
var NK_Q = '';
function nkHop(loai, ma){
  nkDangKy();
  var a = loai ? nkCua(loai, ma) : nkDs().slice().sort(function(x, y){ return x.taoLuc<y.taoLuc ? 1 : -1; });
  var q = slChuan(NK_Q||''); if(q) a = a.filter(function(x){ return slChuan(x.mau+' '+(x.kh||[]).join(' ')+' '+(x.to||[]).join(' ')).indexOf(q)>=0; });
  var tenKH = function(k){ var c = KHO.danhBa(k); return c && c.ten ? c.ten+' ('+k+')' : k; }, tenTo = function(t){ var x = KHO.toDanhBa(t) || KHO.to(t); return x && x.ten ? 'Tổ '+x.ten+' ('+t+')' : 'Tổ '+t; };
  var doi = function(x){ var p = (x.kh||[]).slice(0, 3).map(tenKH).concat((x.to||[]).slice(0, 3).map(tenTo)), them = (x.kh||[]).length+(x.to||[]).length-p.length; return coChuHTML(p.join(' · '))+(them>0 ? ' <small>+'+them+'</small>' : ''); };
  moHop('<div class="hop-tit">📜 Nhật ký đã lập / in'+(loai ? ' — '+coChuHTML(loai==='kh' ? tenKH(ma) : tenTo(ma)) : '')+' ('+a.length+')</div>'+
    '<div class="hop-phu">Ghi mỗi lần bấm In · PDF · Word · Excel ở hàng nút xuất (giữ 13 tháng, đồng bộ Drive giữa các máy). App không lưu file đã in.</div>'+
    '<input class="nk-tim" placeholder="Lọc theo mẫu / mã khách / mã tổ…" value="'+coChuHTML(NK_Q)+'" oninput="NK_Q=this.value;clearTimeout(nkHop.h);nkHop.h=setTimeout(function(){nkHop('+(loai ? '\''+loai+'\',\''+coChuHTML(ma)+'\'' : '')+')},250)">'+
    (a.length ? '<div class="nk-bang"><table class="tc-to-tvb"><thead><tr><th>Ngày</th><th>Mẫu</th><th>Cách</th><th>Khách / tổ</th><th>Số liệu</th></tr></thead><tbody>'+
      a.slice(0, 500).map(function(x){ return '<tr><td>'+nkNgay(x.taoLuc)+' <small>'+new Date(x.taoLuc).toTimeString().slice(0, 5)+'</small></td><td><b>'+coChuHTML(x.mau)+'</b></td><td>'+(NK_CACH[x.cach]||coChuHTML(x.cach))+'</td><td class="ten">'+doi(x)+'</td><td>'+coChuHTML(x.ky||'')+'</td></tr>'; }).join('')+
      '</tbody></table></div>'+(a.length>500 ? '<div class="ghi">Đang hiện 500 dòng mới nhất — gõ ô lọc để tìm.</div>' : '') : '<div class="rong">Chưa có dòng nào.</div>')+
    GD.hang([GD.nut({chu:'Đóng (Esc)', lenh:'nk.dong'})]), true);
  var i = document.querySelector('.nk-tim'); if(i && NK_Q){ i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
}
function nkDangKy(){ if(nkDangKy.xong || typeof GD==='undefined') return; nkDangKy.xong = 1;
  GD.dangKy('nk', {mo:function(el){ NK_Q = ''; nkHop(el.getAttribute('data-loai'), el.getAttribute('data-ma')); }, dong:function(){ dongHop(); }}); }
