/* ==========================================================
   3.406 (anh 29/10/2026): 🗺 ĐỊA BÀN (Hôm nay › 🧰) THEO SỐ LIỆU MỚI NHẤT — cắm rút (bỏ dòng nạp file này là quay về danh mục ⚙ Cài đặt như cũ)
   - Anh: "tab hôm nay có nút địa bàn em ktra lại có lấy đúng theo mẫu 31 và file tổ mới nhất hay ko" · "về gộp điểm em lấy theo mẫu 31 và ds tổ cho chuẩn,
     ko phải 12 gộp còn 9 — sẽ theo tiến độ" → KHÔNG cài cứng bảng gộp điểm; cây = đúng File Tổ trưởng (Danh sách tổ) + Mẫu 31 của kỳ mới nhất (QT-C-10).
   - Trước: cây hiện danh mục khai tay ở ⚙ Cài đặt › Địa bàn (D.cauHinh.diaBan) — không đổi theo số liệu.
   - Cây: xã → điểm GD (mã, tên, ngày GD) → ấp (mã thôn) → số tổ (tổ chưa đóng). Đầu cây ghi nguồn + ngày. Xem lại danh mục Cài đặt: 1 chạm.
   - So với danh mục Cài đặt (nhiều chỗ khác vẫn dùng danh mục: văn bản cấp điểm, Scan chọn địa bàn, gán món trực tiếp khi ấp chưa có tổ…):
     liệt kê lệch; "⟳ Cập nhật danh mục theo số liệu" → xem trước → anh bấm mới ghi; giữ bản cũ (D.cauHinh.diaBanCu) để ↶ khôi phục.
   - Chỉ đọc số liệu qua KHO. ES5.
   ========================================================== */
var DBSL = {K:null, ky:'', xem:'sl', dang:false};   /* xem: 'sl' số liệu · 'dm' danh mục Cài đặt */
var DBSL_CU = ccDiaBanHTML;
ccDiaBanHTML = function(){
  var ds = KHO.dsKyHS(); if(!ds.length) return DBSL_CU();
  dbslDK();
  if(DBSL.xem==='dm') return '<div class="dbsl-goc"><div class="dbsl-dau">'+dbslChip()+'</div>'+DBSL_CU()+'</div>';
  if(DBSL.K && DBSL.ky===ds[0]){ dbslNapCu(); return dbslKhung(); }
  if(!DBSL.dang){ DBSL.dang = true; KHO.nap(ds[0]).then(function(K){ DBSL.K = K; DBSL.ky = ds[0]; DBSL.dang = false; var o = document.getElementById('dbsl'); if(o) o.outerHTML = dbslKhung(); })
    .catch(function(){ DBSL.dang = false; DBSL.xem = 'dm'; var o = document.getElementById('dbsl'); if(o) o.outerHTML = '<div id="dbsl" class="dbsl-goc">'+DBSL_CU()+'</div>'; }); }
  return '<div id="dbsl"><div class="rong">Đang dựng cây địa bàn theo Mẫu 31 + File Tổ trưởng mới nhất…</div></div>';
};
function dbslDK(){ if(dbslDK.xong || typeof GD==='undefined') return; dbslDK.xong = 1;
  GD.dangKy('dbsl', {xem:function(el){ DBSL.xem = el.getAttribute('data-k'); var c = document.querySelector('.dbsl-goc') || document.getElementById('dbsl'); if(c) c.outerHTML = ccDiaBanHTML(); },
    tim:function(el){ CC.db.tim = el.value; var t = document.getElementById('dbsl-cay'); if(t) t.innerHTML = dbslCayHTML(); },
    chep:function(){ dbslChep(); }, ghiChu:function(el){ dbslGhiChuMo(el.getAttribute('data-k')); }, ghiLuu:function(el){ dbslGhiChuLuu(el.getAttribute('data-k')); }, goiY:function(el){ var o = document.getElementById('dbsl-gc'); if(o) o.value = dbslGoiY(el.getAttribute('data-k')); }, capNhat:function(){ dbslXemTruoc(); }, ghi:function(){ dbslGhi(); }, khoiPhuc:function(){ dbslKhoiPhuc(); }}); }
function dbslChip(){ return '<span class="dbsl-chip">'+GD.chip('📊 Theo số liệu', DBSL.xem==='sl', 'dbsl.xem', {k:'sl'}, 'Mẫu 31 + File Tổ trưởng mới nhất')+GD.chip('📒 Danh mục Cài đặt', DBSL.xem==='dm', 'dbsl.xem', {k:'dm'}, 'Danh mục khai ở ⚙ Cài đặt › Địa bàn')+'</span>'; }
/* cây từ kỳ K → [{ma, ten, diem:[{ma, ten, ngay, ap:[{ma, ten, to:[{ma, ten, ut}]}]}]}] (cùng dạng danh mục Cài đặt) */
function dbslCay(K){
  var xa = {}, thu = [];
  KHO.dsToKy(K).forEach(function(t){ if(!t || t.trucTiep || (typeof toLaTT==='function' && toLaTT(t))) return;
    var mx = String(t.xa||''), x = xa[mx]; if(!x){ x = xa[mx] = {ma:mx, xa:t.tenXa||mx, diem:{}, thu:[]}; thu.push(mx); }
    var md = String(t.diem || t.tenDiem || '?'), d = x.diem[md]; if(!d){ d = x.diem[md] = {ma:t.diem||'', ten:String(t.tenDiem||'(chưa rõ điểm GD)').trim(), ngay:t.ngayGD ? String(+t.ngayGD||t.ngayGD) : '', ap:{}, thu:[]}; x.thu.push(md); }
    var ma = String(t.thon||''), a = d.ap[ma]; if(!a){ a = d.ap[ma] = {ma:ma, ten:t.tenThon||ma, to:[]}; d.thu.push(ma); }
    a.to.push({ma:t.ma, ten:t.ten||'', ut:String(t.dv||'')}); });
  return thu.map(function(k){ var x = xa[k]; return {ma:x.ma, xa:x.xa, diem:x.thu.map(function(m){ var d = x.diem[m]; return {ma:d.ma, ten:d.ten, ngay:d.ngay, ap:d.thu.map(function(a){ return d.ap[a]; }).sort(dbSoMa)}; }).sort(dbSoMa)}; }).sort(dbSoMa);
}
function dbslNguon(K){ var n = (K && K.B && K.B.nguon) || {}, ng = function(l){ var e = n[l] && KHO.bang(l, n[l]); return e ? ngayVNsl(e.ngay || (String(n[l]).length>7 ? n[l] : tdnCuoiKy(n[l]))) : ''; };
  return [n.dsto ? 'File Tổ trưởng '+ng('dsto')+(K.dsLech ? ' ⚠ khác ngày Mẫu 31 — Mẫu 31 là chính' : '') : 'chưa có File Tổ trưởng (điểm GD lấy dự phòng)', n.hstd ? 'Mẫu 31 '+ng('hstd') : ''].filter(Boolean).join(' · '); }
function dbslKhung(){
  var cay = dbslCay(DBSL.K), L = dbslLech(cay), soD = 0, soA = 0, soT = 0;
  cay.forEach(function(x){ soD += x.diem.length; x.diem.forEach(function(d){ soA += d.ap.length; d.ap.forEach(function(a){ soT += a.to.length; }); }); });
  var nl = L.doi.length+L.moi.length+L.mat.length, cu = D.cauHinh.diaBanCu;
  return '<div id="dbsl" class="dbsl-goc"><div class="dbsl-dau">'+dbslChip()+'<span class="dbsl-nguon">Theo '+coChuHTML(dbslNguon(DBSL.K))+' — '+cay.length+' xã · '+soD+' điểm GD · '+soA+' ấp/KP · '+soT+' tổ</span></div>'+
    '<div class="db-tren">'+'<input id="db-tim" value="'+coChuHTML(CC.db.tim||'')+'" placeholder="Tìm tên / mã ấp, KP, điểm, xã (không dấu cũng được)" data-lenh="dbsl.tim" data-su="input">'+
    GD.nut({chu:'📋 Chép bảng', lenh:'dbsl.chep', tit:'Chép cây theo số liệu dạng bảng — dán vào Excel'})+'</div>'+
    (nl ? '<details class="dbsl-lech"><summary>⚠ Danh mục ⚙ Cài đặt lệch số liệu: '+[L.doi.length ? L.doi.length+' ấp đổi điểm' : '', L.moi.length ? L.moi.length+' ấp mới' : '', L.mat.length ? L.mat.length+' ấp không còn tổ' : ''].filter(Boolean).join(' · ')+'</summary>'+
      dbslLechHTML(L)+GD.hang([GD.nut({chu:'⟳ Cập nhật danh mục theo số liệu', lenh:'dbsl.capNhat', chinh:1, tit:'Xem trước rồi mới ghi; giữ bản cũ để khôi phục'})])+'</details>'
      : '<div class="dbsl-khop">✓ Danh mục ⚙ Cài đặt khớp số liệu.</div>')+
    (cu && cu.ds ? '<div class="dbsl-cu"><small>Danh mục trước lần cập nhật '+coChuHTML(cu.luc ? ngayVNsl(String(cu.luc).slice(0, 10)) : '')+' còn giữ.</small> '+GD.nut({chu:'↶ Khôi phục danh mục cũ', lenh:'dbsl.khoiPhuc'})+'</div>' : '')+
    dbslToHTML()+
    (L.nhieu.length ? '<div class="dbsl-nhieu">⚠ '+L.nhieu.length+' ấp có tổ thuộc nhiều điểm GD (1 ấp nên thuộc 1 điểm): '+coChuHTML(L.nhieu.slice(0, 8).join(' · '))+(L.nhieu.length>8 ? '…' : '')+'</div>' : '')+
    dbslDoiTenHTML()+
    '<div class="db-cay" id="dbsl-cay">'+dbslCayHTML()+'</div></div>';
}
function dbslCayHTML(){
  var q = boDau(String(CC.db.tim||'')).toLowerCase().trim(), khop = function(){ if(!q) return true; for(var i=0;i<arguments.length;i++){ if(boDau(String(arguments[i]||'')).toLowerCase().indexOf(q)>=0) return true; } return false; };
  var h = '';
  dbslCay(DBSL.K).forEach(function(x){ var coX = khop(x.xa, x.ma), hx = '';
    x.diem.forEach(function(d){ var coD = coX || khop(d.ten, d.ma), ha = '', st = 0;
      d.ap.forEach(function(a){ st += a.to.length; if(!(coD || khop(a.ten, a.ma))) return; ha += '<div class="db-ap">'+dbMa(a.ma)+' '+coChuHTML(a.ten)+' <small>· '+a.to.length+' tổ</small>'+(typeof apCuGhi==='function' && apCuGhi(a.ma) ? ' <small class="db-apcu">🏷 '+coChuHTML(apCuGhi(a.ma))+'</small>' : '')+'</div>'; });   /* 3.407: ghi chú ấp / KP cũ (js/83) */
      if(!ha && !coD) return;
      var kg = dbslKhoaDiem(x, d), gc = dbslGC()[kg] || '';
      hx += '<details class="db-d"'+(q || gc ? ' open' : '')+'><summary>'+dbMa(d.ma)+' <b>'+coChuHTML(d.ten)+'</b>'+(d.ngay ? ' <span class="db-gd">GD ngày '+coChuHTML(d.ngay)+'</span>' : '')+' <small>· '+d.ap.length+' ấp/KP · '+st+' tổ</small> '+
        '<button type="button" class="sap-ico dbsl-gc-nut" data-lenh="dbsl.ghiChu" data-k="'+coChuHTML(kg)+'" title="Ghi chú riêng cho điểm này (vd khu phố đổi tên)">📝</button></summary>'+(gc ? '<div class="dbsl-gc">📝 '+coChuHTML(gc).replace(/\n/g, '<br>')+'</div>' : '')+ha+'</details>'; });
    if(!hx && !coX) return;
    h += '<details class="db-x" open><summary>'+dbMa(x.ma)+' <b>'+coChuHTML(x.xa)+'</b> <small>· '+x.diem.length+' điểm GD</small></summary>'+hx+'</details>'; });
  return h || '<div class="huong-dan">Không thấy "'+coChuHTML(CC.db.tim)+'".</div>';
}
/* lệch danh mục Cài đặt ↔ số liệu, theo ấp (mã xã + mã ấp): doi = ấp đổi điểm · moi = ấp có tổ, danh mục không có · mat = danh mục có, số liệu không còn tổ · nhieu = ấp nhiều điểm */
function dbslLech(cay){
  var chuan = function(s){ return boDau(String(s||'')).toLowerCase().replace(/^diem\s+/, '').trim(); }, dm = {}, sl = {}, L = {doi:[], moi:[], mat:[], nhieu:[]};
  (D.cauHinh.diaBan||[]).forEach(function(x){ (x.diem||[]).forEach(function(d){ (d.ap||[]).forEach(function(a){ dm[String(x.ma||x.xa)+'|'+String(a.ma||a.ten)] = {xa:x.xa, ap:a.ten, diem:d.ten, dma:String(d.ma||'')}; }); }); });
  cay.forEach(function(x){ x.diem.forEach(function(d){ d.ap.forEach(function(a){ var k = String(x.ma)+'|'+String(a.ma), c = sl[k];
    if(c){ if(c.diem.indexOf(d.ten)<0) c.diem.push(d.ten); } else sl[k] = {xa:x.xa, ap:a.ten, diem:[d.ten], dma:String(d.ma||'')}; }); }); });
  Object.keys(sl).forEach(function(k){ var s = sl[k], c = dm[k];
    if(s.diem.length>1) L.nhieu.push(s.ap+' ('+s.xa+'): '+s.diem.join(' / '));
    if(!c) L.moi.push([s.xa, s.ap, s.diem.join(' / ')]);
    else if((c.dma && s.dma) ? c.dma!==s.dma : chuan(c.diem)!==chuan(s.diem[0])) L.doi.push([s.xa, s.ap, c.diem, s.diem.join(' / ')]); });
  Object.keys(dm).forEach(function(k){ if(!sl[k]) L.mat.push([dm[k].xa, dm[k].ap, dm[k].diem]); });
  return L;
}
function dbslLechHTML(L){
  var b = function(tit, cot, ds){ return ds.length ? '<div class="dbsl-lb"><b>'+tit+'</b><table class="sl-xt"><thead><tr>'+cot.map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+
    ds.slice(0, 200).map(function(r){ return '<tr>'+r.map(function(v){ return '<td>'+coChuHTML(v)+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>' : ''; };
  return b('Ấp đổi điểm GD', ['Xã', 'Ấp/KP', 'Danh mục ghi', 'Số liệu (File Tổ trưởng)'], L.doi)+b('Ấp mới (có tổ, danh mục chưa có)', ['Xã', 'Ấp/KP', 'Điểm GD'], L.moi)+b('Ấp danh mục có, số liệu không còn tổ', ['Xã', 'Ấp/KP', 'Điểm GD (danh mục)'], L.mat);
}
function dbslXemTruoc(){
  var cay = dbslCay(DBSL.K), L = dbslLech(cay);
  moHop('<div class="hop-tit">⟳ Cập nhật danh mục địa bàn theo số liệu</div><div class="hop-phu">Danh mục ⚙ Cài đặt › Địa bàn sẽ thay bằng cây theo <b>'+coChuHTML(dbslNguon(DBSL.K))+'</b>. Các chỗ dùng danh mục (văn bản cấp điểm, Scan chọn địa bàn, gán món vay trực tiếp…) theo cây mới. '+
    'Danh mục hiện tại được <b>giữ bản sao</b> — ↶ Khôi phục được.</div>'+dbslLechHTML(L)+
    GD.hang([GD.nut({chu:'Thôi', lenh:'hop.dong'}), GD.nut({chu:'✓ Cập nhật danh mục', lenh:'dbsl.ghi', chinh:1})], true), true);
}
function dbslGhi(){
  var cay = dbslCay(DBSL.K); if(!cay.length) return;
  D.cauHinh.diaBanCu = {luc:new Date().toISOString(), ds:JSON.parse(JSON.stringify(D.cauHinh.diaBan||[]))};
  D.cauHinh.diaBan = cay; luu(); dongHop();
  bao('Đã cập nhật danh mục địa bàn theo số liệu ('+cay.length+' xã) — bản cũ còn giữ, ↶ Khôi phục được.', 6); dbslVeLai();
}
function dbslKhoiPhuc(){
  var cu = D.cauHinh.diaBanCu; if(!cu || !cu.ds) return;
  D.cauHinh.diaBan = cu.ds; delete D.cauHinh.diaBanCu; luu(); bao('Đã khôi phục danh mục địa bàn trước lần cập nhật.', 5); dbslVeLai();
}
function dbslVeLai(){ var c = document.querySelector('.dbsl-goc'); if(c) c.outerHTML = ccDiaBanHTML(); }
function dbslChep(){
  var dong = [['Mã xã', 'Xã/phường', 'Mã điểm GD', 'Điểm GD', 'Ngày GD', 'Mã ấp/KP', 'Ấp/KP', 'Số tổ'].join('\t')];
  dbslCay(DBSL.K).forEach(function(x){ x.diem.forEach(function(d){ d.ap.forEach(function(a){ dong.push([x.ma, x.xa, d.ma, d.ten, d.ngay, a.ma, a.ten, a.to.length].join('\t')); }); }); });
  chepChu(dong.join('\n'), '📋 Đã chép bảng địa bàn theo số liệu ('+(dong.length-1)+' dòng) — dán vào Excel.');
}
/* 3.406 (anh 29/10 "kiểm tra tất cả các tổ có dư nợ có thuộc địa bàn điểm GD xã — có tổ nào không chuẩn"): kết quả toKiemAp (js/22g) q.toLech */
function dbslToHTML(){
  var K = DBSL.K, q = K && (K.qtc || (typeof toKiemAp==='function' ? toKiemAp(K) : null)); if(!q || !q.toLech) return '';
  if(!q.toLech.length) return '<div class="dbsl-khop">✓ Cả '+q.toDuNo+' tổ còn dư nợ đều đúng xã · điểm GD · ấp (theo File Tổ trưởng).</div>';
  return '<details class="dbsl-lech" open><summary>⚠ '+q.toLech.length+' / '+q.toDuNo+' tổ còn dư nợ không chuẩn địa bàn</summary><table class="sl-xt"><thead><tr><th>Mã tổ</th><th>Tổ trưởng</th><th>Xã</th><th>Điểm GD</th><th>Ấp</th><th>Dư nợ</th><th>Lý do</th></tr></thead><tbody>'+
    q.toLech.slice(0, 300).map(function(r){ return '<tr>'+r.map(function(v, j){ return '<td'+(j===5 ? ' class="so"' : '')+'>'+coChuHTML(j===5 ? tdnTien(v) : v)+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></details>';
}
/* 3.406 (anh 29/10 "so sánh số liệu trước tháng 7 và sau đó vì Gia Lộc có đổi tên ấp; anh hay quên nên có ghi chú cho anh nhớ riêng 4 KP của điểm GD Gia Lộc"):
   so theo MÃ TỔ giữa kỳ mới nhất TRƯỚC mốc 07/2026 và kỳ hiện tại → ấp cũ (mã, tên) → ấp mới (mã, tên), số tổ; ghi chú riêng từng điểm GD (D.cauHinh.dbGhi), gợi ý từ bảng so. */
var DBSL_MOC = '2026-07';
DBSL.cu = null; DBSL.kyCu = ''; DBSL.dangCu = false;
function dbslNapCu(){
  if(DBSL.dangCu || DBSL.cu) return; var ky = KHO.dsKyHS().filter(function(k){ return String(k).slice(0, 7) < DBSL_MOC; })[0]; if(!ky) return;
  DBSL.dangCu = true; KHO.nap(ky).then(function(K){ DBSL.cu = K; DBSL.kyCu = ky; DBSL.dangCu = false; var o = document.getElementById('dbsl-doi'); if(o) o.outerHTML = dbslDoiTenHTML(); })
    .catch(function(){ DBSL.dangCu = false; });
}
function dbslDoiTen(K0, K1){   /* → [{xa, diem, cu:{ma, ten}, moi:{ma, ten}, to:[mã tổ]}] */
  var r = {}, T0 = {}; KHO.dsToKy(K0).forEach(function(t){ if(!t.trucTiep) T0[t.ma] = t; });
  KHO.dsToKy(K1).forEach(function(t){ var a = T0[t.ma]; if(t.trucTiep || !a) return;
    if(String(a.thon||'')===String(t.thon||'') && String(a.tenThon||'').trim()===String(t.tenThon||'').trim()) return;
    var k = [t.xa, a.thon, a.tenThon, t.thon, t.tenThon].join('|'), x = r[k];
    if(!x) x = r[k] = {xa:t.tenXa||t.xa||'', maXa:String(t.xa||''), diem:String(t.tenDiem||'').trim(), maDiem:String(t.diem||''), cu:{ma:String(a.thon||''), ten:a.tenThon||''}, moi:{ma:String(t.thon||''), ten:t.tenThon||''}, to:[]};
    x.to.push(t.ma); });
  return Object.keys(r).map(function(k){ return r[k]; }).sort(function(a, b){ return (a.xa+a.diem+a.moi.ten).localeCompare(b.xa+b.diem+b.moi.ten, 'vi'); });
}
function dbslDoiTenHTML(){
  if(!DBSL.cu) return '<div id="dbsl-doi"></div>';
  var ds = dbslDoiTen(DBSL.cu, DBSL.K), ky = DBSL.kyCu, ten = String(ky).length>7 ? ngayVNsl(ky) : kyVN(ky);
  if(!ds.length) return '<div id="dbsl-doi" class="dbsl-khop">✓ So với '+coChuHTML(ten)+' (trước 07/2026): không có tổ nào đổi ấp / tên ấp.</div>';
  return '<details id="dbsl-doi" class="dbsl-lech" open><summary>🔁 So với '+coChuHTML(ten)+' (trước 07/2026): '+ds.length+' ấp / KP đổi tên hoặc đổi mã (theo mã tổ)</summary><table class="sl-xt"><thead><tr><th>Xã</th><th>Điểm GD</th><th>Ấp / KP cũ</th><th>→ Ấp / KP hiện nay</th><th>Số tổ</th></tr></thead><tbody>'+
    ds.map(function(x){ return '<tr><td>'+coChuHTML(x.xa)+'</td><td>'+coChuHTML(x.diem)+'</td><td>'+coChuHTML(x.cu.ten)+' <small>'+coChuHTML(x.cu.ma)+'</small></td><td><b>'+coChuHTML(x.moi.ten)+'</b> <small>'+coChuHTML(x.moi.ma)+'</small></td><td class="so">'+x.to.length+'</td></tr>'; }).join('')+
    '</tbody></table><small>Bấm 📝 cạnh tên điểm GD trong cây để ghi chú (có gợi ý từ bảng này). Lưu ý (TK 1 30/10): Mẫu 31 cũ hệ thống đã ghi tên ấp theo danh mục mới — bảng này chỉ thấy ấp <b>đổi mã / gộp</b>; tên cũ xem 🏷 ghi chú ấp / KP cũ.</small></details>';
}
function dbslGC(){ return (D.cauHinh.dbGhi = D.cauHinh.dbGhi || {}); }
function dbslKhoaDiem(x, d){ return String(x.ma||x.xa)+'|'+String(d.ma||boDau(d.ten).toLowerCase()); }
function dbslTenDiem(k){ var p = String(k).split('|'), x = dbslCay(DBSL.K).find(function(x){ return String(x.ma||x.xa)===p[0]; }), d = x && x.diem.find(function(d){ return dbslKhoaDiem(x, d)===k; }); return d ? {x:x, d:d} : null; }
function dbslGoiY(k){
  var c = dbslTenDiem(k); if(!c) return '';
  var dong = ['Điểm GD '+c.d.ten+(c.d.ngay ? ' (GD ngày '+c.d.ngay+')' : '')+' — '+c.d.ap.length+' ấp/KP: '+c.d.ap.map(function(a){ return a.ten+(a.ma ? ' ('+a.ma+')' : ''); }).join(' · ')];
  c.d.ap.forEach(function(a){ var g = typeof apCuGhi==='function' ? apCuGhi(a.ma) : ''; if(g) dong.push('• '+a.ten+(a.ma ? ' ('+a.ma+')' : '')+': '+g); });   /* 3.407: tên ấp / KP cũ (AP_KP_CU) */
  if(DBSL.cu) dbslDoiTen(DBSL.cu, DBSL.K).filter(function(x){ return x.maXa===String(c.x.ma) && (x.maDiem===String(c.d.ma) || x.diem===c.d.ten); }).forEach(function(x){
    dong.push('• '+x.moi.ten+(x.moi.ma ? ' ('+x.moi.ma+')' : '')+' — trước 07/2026 là '+x.cu.ten+(x.cu.ma ? ' ('+x.cu.ma+')' : '')+', '+x.to.length+' tổ'); });
  return dong.join('\n');
}
function dbslGhiChuMo(k){
  var c = dbslTenDiem(k), cu = dbslGC()[k] || '';
  moHop('<div class="hop-tit">📝 Ghi chú điểm GD'+(c ? ' '+coChuHTML(c.d.ten)+' · '+coChuHTML(c.x.xa) : '')+'</div><div class="hop-phu">Ghi chú riêng để nhớ (vd khu phố đổi tên, ấp sáp nhập). Chỉ lưu trong app của anh, hiện ở cây 🗺 Địa bàn.</div>'+
    '<textarea id="dbsl-gc" rows="7" style="width:100%">'+coChuHTML(cu || dbslGoiY(k))+'</textarea>'+
    GD.hang([GD.nut({chu:'💡 Gợi ý từ số liệu', lenh:'dbsl.goiY', du:{k:k}, tit:'Điền danh sách ấp / KP hiện nay + tên trước 07/2026'}), GD.nut({chu:'Thôi', lenh:'hop.dong'}), GD.nut({chu:'💾 Lưu ghi chú', lenh:'dbsl.ghiLuu', du:{k:k}, chinh:1})], true), true);
}
function dbslGhiChuLuu(k){ var o = document.getElementById('dbsl-gc'); if(!o) return; var v = String(o.value||'').trim(), G = dbslGC(); if(v) G[k] = v; else delete G[k]; luu(); dongHop();
  bao(v ? 'Đã lưu ghi chú điểm GD.' : 'Đã xóa ghi chú.', 3); var t = document.getElementById('dbsl-cay'); if(t) t.innerHTML = dbslCayHTML(); }
