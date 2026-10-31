/* ===== 3.427 (anh 01/11 chốt ý 3 TK 2 đề xuất — KE_HOACH_KY_DOI_CHIEU mục 5, bàn giao GIAO_BAN_KY_NANG mục 6 tầng C) =====
   🔎 SO FILE GIAO BAN: nạp DOI_CHIEU_GB_<ngày>.csv (giao ban) → so từng tổ × từng cột với số app (slDCTeoTinh — cùng hợp đồng 17 cột) → TỰ PHÂN LOẠI lệch:
     A cùng luật mà lệch (lỗi code — phải sửa) · B luật chưa chốt / khác định nghĩa (so_tv: QT-C-14 tổng tổ viên khác định nghĩa; so_mon_khd: K5 chờ chốt)
     · C khác phạm vi / thời điểm (khác ngày số liệu) · D làm tròn (tiền lệch ≤ 1 đồng) · ? chưa phân loại (dòng chỉ có ở 1 bên, cột chưa có luật) — KHÔNG đoán.
   Lệch → báo anh và TK 1, không tự chọn nguồn (QT-C-08). Chỉ đọc, không ghi kho. Cắm rút: bỏ dòng <script> là mất nút 🔎. ES5. */
var SG = {kq:null, loc:'A'};
var SG_TIEN = ['du_no', 'nqh', 'khoanh', 'lai_ton', 'tien_gui', 'cho_vay', 'thu_no'], SG_CHU = ['ma_xa', 'ma_ap', 'ma_diem', 'hoi'];
var SG_LOAI = {A:'A — cùng luật mà lệch (lỗi, phải sửa)', B:'B — luật chưa chốt / khác định nghĩa', C:'C — khác phạm vi / thời điểm', D:'D — làm tròn', '?':'? — chưa phân loại'};
function sgDoc(chu){   /* CSV hợp đồng: dòng "#" là ghi chú; dòng tiêu đề có cột khoa */
  var L = String(chu||'').replace(/^﻿/, '').split(/\r?\n/), ghi = [], dau = null, ds = {};
  L.forEach(function(l){ if(!l.trim()) return; if(/^\s*#/.test(l)){ ghi.push(l); return; } var c = l.split(',').map(function(x){ return x.replace(/^"|"$/g, '').trim(); });
    if(!dau){ dau = c; return; } var o = {}; dau.forEach(function(k, i){ o[k] = c[i]===undefined ? '' : c[i]; }); if(o.khoa) ds[o.khoa] = o; });
  if(!dau || dau.indexOf('khoa')<0) return {loi:'File không đúng hợp đồng (thiếu cột khoa) — cần DOI_CHIEU_GB_<ngày>.csv'};
  var ng = (ghi.join(' ').match(/ngày số liệu\s*=\s*(\d{4}-\d{2}-\d{2})/i) || [])[1] || '';
  return {ghi:ghi, cot:dau, ds:ds, ngay:ng};
}
function sgPhanLoai(cot, a, g){   /* → {loai, ly} hoặc null nếu khớp */
  if(SG_CHU.indexOf(cot)>=0){ var x = String(a||'').replace(/^DTN$/, 'ĐTN'), y = String(g||'').replace(/^DTN$/, 'ĐTN'); return x===y ? null : {loai:'A', ly:'mã khác nhau'}; }
  var d = (+a||0)-(+g||0); if(!d) return null;
  if(cot==='so_tv') return {loai:'B', ly:'QT-C-14: tổng tổ viên — app gồm khách tất nợ chưa ra khỏi tổ (khác định nghĩa)'};
  if(cot==='so_mon_khd') return {loai:'B', ly:'K5 (3 tháng KHĐ) chờ chốt'};
  if(SG_TIEN.indexOf(cot)>=0) return Math.abs(d)<=1 ? {loai:'D', ly:'làm tròn'} : {loai:'A', ly:'cùng luật mà lệch'};
  if(cot==='so_tv_du_no' || cot==='so_mon_den_han_thang_toi') return {loai:'A', ly:'cùng luật mà lệch'};
  return {loai:'?', ly:'cột chưa có luật phân loại'};
}
function sgSo(appDong, gb, ngayApp){
  var cot = SL_DC_COT, app = {}, kq = {dem:{A:0, B:0, C:0, D:0, '?':0}, dong:[], tong:{}, ngayGB:gb.ngay, ngayApp:ngayApp, nApp:0, nGB:0};
  appDong.forEach(function(r){ var o = {}; cot.forEach(function(k, i){ o[k] = r[i]; }); app[o.khoa] = o; });
  var khoa = Object.keys(app).concat(Object.keys(gb.ds).filter(function(k){ return !app[k]; })).sort(), khacNgay = gb.ngay && ngayApp && gb.ngay!==ngayApp;
  kq.nApp = Object.keys(app).length; kq.nGB = Object.keys(gb.ds).length;
  SG_TIEN.forEach(function(c){ kq.tong[c] = {app:0, gb:0}; });
  khoa.forEach(function(k){ var a = app[k], g = gb.ds[k];
    SG_TIEN.forEach(function(c){ if(a) kq.tong[c].app += +a[c]||0; if(g) kq.tong[c].gb += +g[c]||0; });
    if(!a || !g){ kq.dem['?']++; kq.dong.push({khoa:k, cot:'(cả dòng)', app:a ? 'có' : '—', gb:g ? 'có' : '—', chenh:'', loai:'?', ly:'dòng chỉ có ở '+(a ? 'app' : 'giao ban')}); return; }
    cot.forEach(function(c){ if(c==='khoa' || gb.cot.indexOf(c)<0) return; var p = sgPhanLoai(c, a[c], g[c]); if(!p) return; if(khacNgay && p.loai==='A') p = {loai:'C', ly:'khác ngày số liệu ('+ngayApp+' / '+gb.ngay+')'};
      kq.dem[p.loai]++; kq.dong.push({khoa:k, cot:c, app:a[c], gb:g[c], chenh:SG_CHU.indexOf(c)>=0 ? '' : (+a[c]||0)-(+g[c]||0), loai:p.loai, ly:p.ly}); }); });
  return kq;
}
function sgMo(ky){
  var i = document.createElement('input'); i.type = 'file'; i.accept = '.csv,text/csv';
  i.onchange = function(){ var f = i.files && i.files[0]; if(!f) return; var r = new FileReader();
    r.onload = function(){ var gb = sgDoc(r.result); if(gb.loi) return baoLoi(gb.loi);
      batChay(true, 'Đang so với file giao ban…');
      KHO.nap(ky).then(function(K){ tatChay(); SG.kq = sgSo(slDCTeoTinh(K).dong, gb, K.ngay); SG.kq.ten = f.name; SG.loc = SG.kq.dem.A ? 'A' : 'tat'; sgVe(); }, function(e){ tatChay(); baoLoi('Chưa mở được kỳ '+ky+': '+(e && e.message || e)); }); };
    r.readAsText(f, 'utf-8'); };
  i.click();
}
function sgVe(){
  var q = SG.kq; if(!q) return; var e = coChuHTML, ds = q.dong.filter(function(x){ return SG.loc==='tat' || x.loai===SG.loc; });
  var chip = [GD.chip('Tất cả ('+q.dong.length+')', SG.loc==='tat', 'sg.loc', {k:'tat'})].concat(['A', 'B', 'C', 'D', '?'].map(function(k){ return GD.chip(k+' ('+q.dem[k]+')', SG.loc===k, 'sg.loc', {k:k}, SG_LOAI[k]); }));
  var tong = '<table class="to-bang luoi"><thead><tr><th>Cột tiền (đồng)</th><th>Tổng app</th><th>Tổng giao ban</th><th>Chênh</th></tr></thead><tbody>'+SG_TIEN.map(function(c){ var t = q.tong[c], d = Math.round(t.app-t.gb);
    return '<tr'+(Math.abs(d)>1 ? ' class="nb"' : '')+'><td><code>'+c+'</code></td><td class="s">'+tdnTien(t.app)+'</td><td class="s">'+tdnTien(t.gb)+'</td><td class="s">'+(d ? tdnTien(d) : '0')+'</td></tr>'; }).join('')+'</tbody></table>';
  var bang = ds.length ? '<table class="to-bang luoi"><thead><tr><th>Khóa (tổ / TT|ấp)</th><th>Cột</th><th>App</th><th>Giao ban</th><th>Chênh</th><th>Loại</th><th>Lý do</th></tr></thead><tbody>'+
    ds.slice(0, 500).map(function(x){ return '<tr'+(x.loai==='A' ? ' class="nb"' : '')+'><td>'+e(x.khoa)+'</td><td><code>'+e(x.cot)+'</code></td><td class="s">'+e(String(x.app))+'</td><td class="s">'+e(String(x.gb))+'</td><td class="s">'+e(x.chenh==='' ? '' : tdnTien(x.chenh))+'</td><td class="c"><b>'+e(x.loai)+'</b></td><td>'+e(x.ly)+'</td></tr>'; }).join('')+
    '</tbody></table>'+(ds.length>500 ? '<div class="hop-phu">… hiện 500 / '+ds.length+' dòng — 📥 CSV lệch có đủ.</div>' : '') : '<div class="rong">Không có lệch loại này.</div>';
  moHop('<div class="hop-tit">🔎 So file giao ban — '+e(q.ten||'')+'</div>'+
    '<div class="hop-phu">Ngày số liệu app '+e(q.ngayApp||'')+' · giao ban '+e(q.ngayGB||'(không ghi)')+' · '+q.nApp+' dòng app / '+q.nGB+' dòng giao ban. Loại lệch tự gắn theo luật đã chốt; không chắc → "?" (không đoán). Lệch → báo anh và TK 1 (QT-C-08).</div>'+
    '<div class="to-bang-cuon to-cuon-khung">'+tong+GD.hang(chip)+bang+'</div>'+
    GD.hang([GD.nut({chu:'Đóng', lenh:'sg.dong'}), GD.nut({chu:'📥 CSV lệch (gửi TK 1)', lenh:'sg.csv'})], true), true);
}
function sgCsv(){ var q = SG.kq; if(!q) return;
  var c = '﻿'+[['khoa', 'cot', 'app', 'giao_ban', 'chenh', 'loai', 'ly_do']].concat(q.dong.map(function(x){ return [x.khoa, x.cot, x.app, x.gb, x.chenh, x.loai, x.ly]; })).map(function(h){ return h.map(slCsvO).join(','); }).join('\r\n')+'\r\n';
  taiXuongBlob(new Blob([c], {type:'text/csv'}), 'LECH_APP_GB_'+(q.ngayApp||'')+'.csv'); }
(function(){
  function dk(){ if(dk.xong || typeof GD==='undefined') return; dk.xong = 1;
    GD.dangKy('sg', {mo:function(el){ dongHop(); sgMo(el.getAttribute('data-ky')); }, loc:function(el){ SG.loc = el.getAttribute('data-k'); sgVe(); }, dong:function(){ dongHop(); }, csv:function(){ sgCsv(); }}); }
  if(typeof slDCNut!=='function') return; var cu = slDCNut;   /* nút 🔎 cạnh 📤 File đối chiếu giao ban */
  slDCNut = function(ky){ dk(); return cu.apply(this, arguments)+'<button class="nho" data-lenh="sg.mo" data-ky="'+coChuHTML(ky)+'" title="Nạp DOI_CHIEU_GB_<ngày>.csv của giao ban → so với số app, tự phân loại lệch A–D">🔎 So file giao ban</button>'; };
})();
