/* ===== 3.398 (anh 28/10: "các khai báo tên hội nên có nút khóa lại để khỏi đổi nhầm và em nên lưu lại nhật ký để còn biết phục hồi nếu lỡ tay bấm nhầm nút reset")
   KTGS ⚙ Khai báo (🏛 Hội – xã · 📖 Chuẩn hóa) — CẮM RÚT (bỏ dòng <script> là về như cũ; dữ liệu khai báo không đổi chỗ lưu):
   - 🔒 Khóa / 🔓 Mở khóa: D.cauHinh.ktKBKhoa = 1 → mọi ô khai báo chỉ xem, ẩn ↺; ghi vào khai báo (ktHoiKBSua / ktChuanSua — mọi đường gõ, dán khối, ↺, sửa theo gợi ý,
     ô Nhiệm kỳ / HĐ ở hộp 📋 Phân công) bị chặn + báo. Riêng lựa chọn khuôn / căn cứ Kế hoạch (mauKH, ccKH) không khóa (là tùy chọn in).
   - 📜 Nhật ký: mỗi lần đổi 1 ô ghi {l: lúc, t: 'hoi' | 'chuan', k, o, cu, moi} vào D.cauHinh.ktKBNK (giữ 1.000 dòng mới nhất, đồng bộ Drive khối ktgs);
     ↶ Khôi phục = ghi lại chữ cũ (cũng vào nhật ký). ===== */
var KT_KB_TU_DO = {mauKH:1, ccKH:1};
function ktKBKhoaCo(){ return !!D.cauHinh.ktKBKhoa; }
function ktKBNK(){ return (D.cauHinh.ktKBNK = D.cauHinh.ktKBNK || []); }
function ktKBGhiNK(t, k, o, cu, moi){ cu = cu || ''; moi = moi || ''; if(cu===moi) return; var nk = ktKBNK(); nk.push({l:new Date().toISOString(), t:t, k:k, o:o, cu:cu, moi:moi}); if(nk.length>1000) nk.splice(0, nk.length-1000); }
function ktKBChan(){ bao('🔒 Khai báo Hội đang khóa — bấm 🔓 Mở khóa (⚙ Khai báo) để sửa.', 5); setTimeout(function(){ if(document.getElementById('kt-the')) ktVeThe(); }, 0); }
(function(){
  if(typeof ktHoiKBSua!=='function' || typeof ktChuanSua!=='function') return;
  var hoiCu = ktHoiKBSua, chuanCu = ktChuanSua;
  ktHoiKBSua = function(k, o, v){
    if(ktKBKhoaCo() && !KT_KB_TU_DO[o]) return ktKBChan();
    var cu = (ktHoiKBGoc(k)||{})[o] || ''; hoiCu(k, o, v); ktKBGhiNK('hoi', k, o, cu, (ktHoiKBGoc(k)||{})[o] || ''); luu(); };
  ktChuanSua = function(dv, k, v){
    if(ktKBKhoaCo()) return ktKBChan();
    var lay = function(){ return ((D.cauHinh.ktChuan || {})[dv] || {})[k] || ''; }, cu = lay(); chuanCu(dv, k, v); ktKBGhiNK('chuan', dv, k, cu, lay()); luu(); };
})();
function ktKBDoiKhoa(){ D.cauHinh.ktKBKhoa = ktKBKhoaCo() ? 0 : 1; luu(); ktVeThe(); bao(ktKBKhoaCo() ? '🔒 Đã khóa khai báo Hội — không sửa nhầm được nữa.' : '🔓 Đã mở khóa — sửa xong nhớ bấm 🔒 Khóa lại.', 4); }
function ktKBTenK(t, k){   /* tên dễ đọc của khóa nhật ký */
  if(t==='chuan') return 'Chuẩn hóa · '+(tdnHoi(k) || k);
  var p = String(k).split('|'), kb = (ktHoiKBGoc(k)||{}), to = KT_K && KT_K.to ? Object.keys(KT_K.to).map(function(m){ return KT_K.to[m]; }).find(function(x){ return String(x.xa)===p[0] && String(x.dv)===p[1]; }) : null;
  return kb.ten || (to ? ktHoiTenTD(to) : (tdnHoi(p[1]) || p[1])+' · xã '+p[0]);
}
function ktKBTenO(t, o){ var ds = t==='chuan' ? KT_CHUAN_O : KT_HKB_O, x = (ds||[]).find(function(z){ return z[0]===o; }); return x ? x[1].replace(/ \(.*\)$/, '') : o; }
function ktKBNKHop(loc){
  var nk = ktKBNK(), ds = []; for(var i=nk.length-1;i>=0;i--){ if(!loc || nk[i].k===loc) ds.push(i); }
  var ten = {}; nk.forEach(function(x){ ten[x.k] = ten[x.k] || ktKBTenK(x.t, x.k); });
  var gio = function(iso){ var d = new Date(iso); return hai(d.getDate())+'/'+hai(d.getMonth()+1)+'/'+d.getFullYear()+' '+hai(d.getHours())+':'+hai(d.getMinutes()); }, khoa = ktKBKhoaCo();
  moHop('<div class="hop-tit">📜 Nhật ký khai báo Hội ('+nk.length+' lần sửa)</div>'+
    '<div class="hop-phu">Mỗi lần đổi 1 ô (gõ, dán, ↺, sửa theo gợi ý) đều ghi lại. Bấm ↶ để đưa ô đó về chữ cũ'+(khoa ? ' — <b>đang khóa: mở khóa trước khi khôi phục</b>' : '')+'.</div>'+
    '<label>Lọc: <select onchange="ktKBNKHop(this.value)"><option value="">Tất cả</option>'+Object.keys(ten).sort(function(a, b){ return ten[a].localeCompare(ten[b], 'vi'); }).map(function(k){ return '<option value="'+coChuHTML(k)+'"'+(k===loc ? ' selected' : '')+'>'+coChuHTML(ten[k])+'</option>'; }).join('')+'</select></label>'+
    (ds.length ? '<div class="to-bang-cuon" style="max-height:60vh"><table class="kt-nk-bang"><thead><tr><th>Lúc</th><th>Hội – xã</th><th>Ô</th><th>Cũ → Mới</th><th></th></tr></thead><tbody>'+ds.slice(0, 300).map(function(i){ var x = nk[i];
      return '<tr><td>'+gio(x.l)+'</td><td>'+coChuHTML(ten[x.k])+'</td><td>'+coChuHTML(ktKBTenO(x.t, x.o))+'</td><td><span class="cu">'+(x.cu ? coChuHTML(x.cu) : '<i>(trống)</i>')+'</span> → <span class="moi">'+(x.moi ? coChuHTML(x.moi) : '<i>(trống)</i>')+'</span></td>'+
        '<td><button class="nho" onclick="ktKBKhoiPhuc('+i+')"'+(khoa ? ' disabled' : '')+' title="Đưa ô này về chữ cũ">↶ Khôi phục</button></td></tr>'; }).join('')+'</tbody></table></div>' : '<div class="rong">Chưa có lần sửa nào được ghi.</div>')+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button></div>', true);
  KT_KB_NK_LOC = loc || '';
}
var KT_KB_NK_LOC = '';
function ktKBKhoiPhuc(i){ var x = ktKBNK()[i]; if(!x) return; if(ktKBKhoaCo()) return ktKBChan();
  if(x.t==='chuan') ktChuanSua(x.k, x.o, x.cu); else ktHoiKBSua(x.k, x.o, x.cu);
  bao('↶ Đã khôi phục '+ktKBTenO(x.t, x.o)+' của '+ktKBTenK(x.t, x.k)+' về: '+(x.cu || '(trống)'), 5); ktKBNKHop(KT_KB_NK_LOC); if(document.getElementById('kt-the')) ktVeThe(); }
(function(){   /* thanh 🔒 / 📜 trên 🏛 Hội – xã và 📖 Chuẩn hóa; đang khóa → ô chỉ xem */
  if(typeof ktHDTVe!=='function') return; var cu = ktHDTVe;
  ktHDTVe = function(o){ var r = cu(o), tab = ktCH().hdtTab; if(!o || tab==='bo') return r;
    var khoa = ktKBKhoaCo(), n = ktKBNK().length, bar = document.createElement('div'); bar.className = 'kt-kb-khoa'+(khoa ? ' khoa' : '');
    bar.innerHTML = (khoa ? '🔒 <b>Đã khóa khai báo</b> — chỉ xem, không sửa nhầm được <button class="nho" onclick="ktKBDoiKhoa()">🔓 Mở khóa để sửa</button>' : '🔓 Đang mở — sửa xong nên khóa lại <button class="nho chinh" onclick="ktKBDoiKhoa()">🔒 Khóa khai báo</button>')+
      '<button class="nho" onclick="ktKBNKHop()">📜 Nhật ký ('+n+')</button>';
    var che = o.querySelector(':scope > .kt-che'); if(che) che.insertAdjacentElement('afterend', bar); else o.insertBefore(bar, o.firstChild);
    o.classList.toggle('kt-kb-dong-khoa', khoa);
    if(khoa) [].forEach.call(o.querySelectorAll('input, textarea'), function(e){ if(!e.closest('.kt-khoi, .kt-che, .kt-kb-khoa')){ e.readOnly = true; e.title = '🔒 Đang khóa — bấm 🔓 Mở khóa để sửa'; } });
    return r; };
})();
