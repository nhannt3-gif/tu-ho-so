/* ===== 3.396 (anh 28/10, ảnh Tra cứu KH › Tìm theo Tổ trưởng: "làm bộ lọc và sắp xếp của các cột này") — LỌC + SẮP XẾP CỘT cho bảng đã vẽ (dùng chung, CẮM RÚT:
   bỏ dòng <script> trong index.html là bảng về như cũ). Làm trên các dòng đã vẽ (không vẽ lại, không đọc kho):
   - bấm tiêu đề cột: ▲ tăng → ▼ giảm → về thứ tự gốc
   - hàng lọc dưới tiêu đề: 'chu' ô gõ (không dấu, chứa) · 'chon' ô chọn giá trị có trong cột · 'so' ô chọn mức (= 0 · > 0 · thêm mục riêng)
   - dòng tfoot: ô [data-bl-dem] ghi "Cộng n …", ô [data-bl-cong] cộng lại theo dòng đang hiện
   - trạng thái nhớ theo khóa bảng trong phiên (bảng vẽ lại — gõ tìm, đổi địa bàn — vẫn giữ)
   Dùng: blGan(table, 'khoa', [{loai:'chu'|'chon'|'so', muc:[[mã, nhãn, hàm(v)]…]}, …]) — mỗi phần tử ứng 1 cột theo thứ tự ===== */
var BL_TT = {};
function blGiaTri(td){ if(!td) return ''; var v = td.getAttribute('data-v'); return v!=null ? v : (td.textContent||'').trim(); }
function blSo(v){ var n = parseFloat(String(v).replace(/\./g, '').replace(',', '.')); return isNaN(n) ? 0 : n; }
function blGan(tb, khoa, cot){
  if(!tb || !tb.tHead || !tb.tBodies[0]) return;
  var T = BL_TT[khoa] = BL_TT[khoa] || {sx:-1, tang:true, loc:{}}, dong = [].slice.call(tb.tBodies[0].rows), dau = tb.tHead.rows[0];
  dong.forEach(function(r, i){ r.__blThu = i; });
  var h = '<tr class="bl-loc">'+cot.map(function(c, j){
    var v = T.loc[j]||'';
    if(c.loai==='chu') return '<th><input type="search" data-bl="'+j+'" value="'+coChuHTML(v)+'" placeholder="lọc…" autocomplete="off"></th>';
    if(c.loai==='chon'){ var ds = {}; dong.forEach(function(r){ var x = (r.cells[j] && r.cells[j].textContent||'').trim(); if(x) ds[x] = 1; });
      return '<th><select data-bl="'+j+'"><option value="">Tất cả</option>'+Object.keys(ds).sort(function(a, b){ return a.localeCompare(b, 'vi', {numeric:true}); }).map(function(x){ return '<option'+(x===v ? ' selected' : '')+'>'+coChuHTML(x)+'</option>'; }).join('')+'</select></th>'; }
    if(c.loai==='so') return '<th><select data-bl="'+j+'"><option value="">Tất cả</option>'+[['0', '= 0'], ['co', '> 0']].concat((c.muc||[]).map(function(m){ return [m[0], m[1]]; })).map(function(m){ return '<option value="'+m[0]+'"'+(m[0]===v ? ' selected' : '')+'>'+coChuHTML(m[1])+'</option>'; }).join('')+'</select></th>';
    return '<th></th>'; }).join('')+'</tr>';
  dau.insertAdjacentHTML('afterend', h); if(dau.offsetHeight) tb.style.setProperty('--bl-top', dau.offsetHeight+'px');   /* hàng lọc dính ngay dưới tiêu đề khi cuộn */
  [].forEach.call(dau.cells, function(th, j){ if(!cot[j]) return; th.classList.add('bl-sx'); th.setAttribute('data-bl-sx', j); th.title = (th.title ? th.title+' · ' : '')+'Bấm để sắp xếp'; });
  tb.tHead.addEventListener('click', function(ev){ var th = ev.target.closest && ev.target.closest('[data-bl-sx]'); if(!th) return; var j = +th.getAttribute('data-bl-sx');
    if(T.sx!==j){ T.sx = j; T.tang = true; } else if(T.tang) T.tang = false; else T.sx = -1; blChay(tb, T, cot); });
  var doi = function(ev){ var o = ev.target; if(!o.hasAttribute || !o.hasAttribute('data-bl')) return; T.loc[o.getAttribute('data-bl')] = o.value; blChay(tb, T, cot); };
  tb.tHead.addEventListener('input', doi); tb.tHead.addEventListener('change', doi);
  blChay(tb, T, cot);
}
function blChay(tb, T, cot){
  var bd = tb.tBodies[0], dong = [].slice.call(bd.rows), hien = 0;
  dong.forEach(function(r){
    var ok = Object.keys(T.loc).every(function(j){ var v = T.loc[j], c = cot[j]; if(!v || !c) return true; var g = blGiaTri(r.cells[j]);
      if(c.loai==='chu'){ var q = slChuan(v); return q.split(' ').filter(Boolean).every(function(w){ return slChuan(g).indexOf(w)>=0; }); }
      if(c.loai==='chon') return (r.cells[j].textContent||'').trim()===v;
      if(c.loai==='so'){ var n = blSo(g); if(v==='0') return n===0; if(v==='co') return n>0; var m = (c.muc||[]).find(function(x){ return x[0]===v; }); return m ? m[2](n) : true; }
      return true; });
    r.hidden = !ok; if(ok) hien++; });
  var sx = dong.slice().sort(function(a, b){
    if(T.sx<0) return a.__blThu-b.__blThu;
    var c = cot[T.sx], x = blGiaTri(a.cells[T.sx]), y = blGiaTri(b.cells[T.sx]),
      k = c.loai==='so' ? blSo(x)-blSo(y) : String(x).localeCompare(String(y), 'vi', {numeric:true});
    return (T.tang ? k : -k) || a.__blThu-b.__blThu; });
  sx.forEach(function(r){ bd.appendChild(r); });
  [].forEach.call(tb.tHead.rows[0].cells, function(th, j){ th.classList.toggle('bl-tang', T.sx===j && T.tang); th.classList.toggle('bl-giam', T.sx===j && !T.tang); });
  var ft = tb.tFoot; if(ft){ var dem = ft.querySelector('[data-bl-dem]'); if(dem) dem.textContent = dem.getAttribute('data-bl-dem').replace('{n}', hien);
    [].forEach.call(ft.querySelectorAll('[data-bl-cong]'), function(td){ var j = +td.getAttribute('data-bl-cong'), s = 0; dong.forEach(function(r){ if(!r.hidden) s += blSo(blGiaTri(r.cells[j])); }); td.textContent = s; }); }
  var g = tb.closest('.tc-kq-cuon'), gh = g && g.previousElementSibling && g.previousElementSibling.querySelector('.ghi');
  var co = Object.keys(T.loc).some(function(j){ return T.loc[j]; }); tb.classList.toggle('bl-dang-loc', co);
  if(gh){ if(gh.__blGoc==null) gh.__blGoc = gh.textContent; gh.textContent = co ? hien+' / '+dong.length+' tổ (đang lọc cột)' : gh.__blGoc; }
}
