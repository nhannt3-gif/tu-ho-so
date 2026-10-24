/* ===== 3.338 (TK 3 — RA_SOAT_BO_CUC_2410 mục 8 việc 2, anh nhắn "code" 24/10): 🩺 SỨC KHỎE SAO LƯU =====
   Thẻ đầu ⚙ Khai báo đơn vị › 💾 Sao lưu: từng khối dữ liệu (văn bản, ghi chú, scan, bộ hồ sơ, biểu mẫu…) đã lên Drive lúc nào, còn phần đổi chưa đẩy không,
   + cài đặt theo khối + bản tự lưu trên máy. Đỏ khi: chưa nối Drive mà có dữ liệu · có phần chưa đẩy quá 7 ngày · bản tự lưu trên máy cũ quá 7 ngày.
   CHỈ ĐỌC mốc đồng bộ có sẵn (js/36: kdGoi / kdBam / kdKeo · D.cauHinh.chKhoi · js/32: KHO1.dsChup) — không đổi luồng lưu / đồng bộ.
   Gắn bằng cách bọc kbSaoLuuHTML như js/34, js/36 (không sửa file khung của TK 2 — docs/PHOI_HOP_TK2_TK3.md). */
var SK_NGAY = 7, SK_TEN = {vanban:'📄 Văn bản', lich:'🗒 Ghi chú · lịch', scan:'🪪 Scan · chữ ký · CCCD', solieu:'📊 Dữ liệu tháng (danh mục)', hoso:'📁 Bộ hồ sơ', gdx:'🏢 Biểu mẫu GDX', chung:'🗑 Thùng rác · dấu xóa'};
function skCu(iso){ var t = new Date(iso || 0).getTime(); return !t || Date.now()-t > SK_NGAY*864e5; }
function skMoiNhat(ds){ return ds.filter(Boolean).sort().pop() || ''; }
function skKhoi(){   /* → [{k, ten, so, cho, luc, muc:'xanh'|'vang'|'do', ghi}] */
  if(typeof kdGoi!=='function') return [];
  var F = kdGoi(), c = kdMoc(), noi = typeof coTheNoiDrive==='function' && coTheNoiDrive(), bat = kdBat(), G = {};
  Object.keys(F).forEach(function(n){ var k = n.split('__')[0], g = G[k] = G[k] || {k:k, so:0, cho:0, luc:[]}, f = F[n];
    if(!/__rac$/.test(n)) Object.keys(f.ngan || {}).forEach(function(ng){ g.so += (f.ngan[ng] || []).length; });
    if(kdBam(f)!==c.kdBam[n]) g.cho++; g.luc.push(c.kdKeo[n]); });
  return Object.keys(G).sort(function(a, b){ return Object.keys(SK_TEN).indexOf(a)-Object.keys(SK_TEN).indexOf(b); }).map(function(k){
    var g = G[k], luc = skMoiNhat(g.luc), muc = 'xanh', ghi = 'đã lên Drive';
    if(!bat){ muc = 'vang'; ghi = 'đồng bộ khối đang tắt trên máy này'; }
    else if(!noi){ muc = g.so ? 'do' : 'vang'; ghi = 'chưa nối Drive — chỉ có trên máy này'; }
    else if(g.cho && (!luc || skCu(luc))){ muc = 'do'; ghi = g.cho+' phần đổi chưa đẩy, quá '+SK_NGAY+' ngày'; }
    else if(g.cho){ muc = 'vang'; ghi = g.cho+' phần đổi chờ đẩy (tự đẩy sau vài giây khi có mạng)'; }
    return {k:k, ten:SK_TEN[k] || k, so:g.so, cho:g.cho, luc:luc, muc:muc, ghi:ghi}; });
}
function skCaiDat(){ var x = D.cauHinh.chKhoi && typeof D.cauHinh.chKhoi==='object' ? D.cauHinh.chKhoi : {};
  return skMoiNhat(Object.keys(x).map(function(k){ return x[k] && x[k].keo; })); }
function skTuLuu(){ try { return skMoiNhat((KHO1.dsChup() || []).map(function(x){ return x.luc; })); } catch(e){ return ''; } }
function skDo(){ var ds = skKhoi(); return ds.filter(function(r){ return r.muc==='do'; }).length+(skCu(skTuLuu()) ? 1 : 0); }   /* số mục đỏ (phép thử / chỗ khác báo) */
function skTheHTML(){
  var ds = skKhoi(), cd = skCaiDat(), tl = skTuLuu(), gio = function(x){ return x ? kbGioVN(x) : '<i>chưa có</i>'; };
  var den = function(m){ return '<span class="sk-den sk-'+m+'">'+(m==='xanh' ? '✓' : m==='vang' ? '⏳' : '⚠')+'</span>'; }, nDo = skDo();
  return '<div class="hso-kb-nhom sk-the"><b>🩺 Sức khỏe sao lưu</b> <small>(đỏ = cần xử lý: chưa nối Drive, phần đổi chưa đẩy hoặc bản tự lưu cũ quá '+SK_NGAY+' ngày)</small>'+
    (nDo ? '<div class="sl-bao do">⚠ '+nDo+' mục cần xử lý — bấm ☁ Đồng bộ ngay ở dưới (khi có mạng) hoặc 📸 Chụp ngay.</div>' : '<div class="sl-phu xanh">✓ Dữ liệu đã lên Drive và có bản tự lưu trên máy gần đây.</div>')+
    '<div class="to-bang-cuon"><table class="to-bang luoi sk-bang"><thead><tr><th></th><th>Khối</th><th>Mục trên máy</th><th>Lần đồng bộ Drive gần nhất</th><th>Ghi chú</th></tr></thead><tbody>'+
      ds.map(function(r){ return '<tr class="sk-'+r.muc+'"><td>'+den(r.muc)+'</td><td>'+r.ten+'</td><td class="so">'+r.so+'</td><td>'+gio(r.luc)+'</td><td>'+coChuHTML(r.ghi)+'</td></tr>'; }).join('')+
      '<tr class="sk-'+(cd ? 'xanh' : 'vang')+'"><td>'+den(cd ? 'xanh' : 'vang')+'</td><td>⚙ Cài đặt (theo khối)</td><td></td><td>'+gio(cd)+'</td><td>'+(cd ? 'tự đồng bộ khi đổi' : 'chưa đồng bộ lần nào trên máy này')+'</td></tr>'+
      '<tr class="sk-'+(skCu(tl) ? 'do' : 'xanh')+'"><td>'+den(skCu(tl) ? 'do' : 'xanh')+'</td><td>📸 Bản tự lưu trên máy</td><td></td><td>'+gio(tl)+'</td><td>'+(skCu(tl) ? 'cũ quá '+SK_NGAY+' ngày — bấm 📸 Chụp ngay' : 'tự chụp mỗi ngày')+'</td></tr>'+
    '</tbody></table></div><div class="sl-phu">Số liệu Mẫu 31 / báo cáo tháng đồng bộ đường riêng (tab 📥 Nạp &amp; KT) — không tính ở đây.</div></div>';
}
var SK_SL = kbSaoLuuHTML;
kbSaoLuuHTML = function(){ return skTheHTML()+SK_SL(); };
(function(){ var s = document.createElement('style');   /* kiểu riêng của thẻ (css/app.css do TK 2 giữ) */
  s.textContent = '.sk-den{font-weight:700}.sk-xanh .sk-den{color:#15803d}.sk-vang .sk-den{color:#b45309}.sk-do .sk-den,.sk-do td{color:#b91c1c}.sk-bang td{vertical-align:middle}';
  document.head.appendChild(s); })();
