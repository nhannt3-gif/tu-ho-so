/* ===== 3.420 P2 (docs/KE_HOACH_NANG_CAP_0111.md): ⌨ Ô LỆNH Ctrl+K =====
   Ctrl+K (Mac: ⌘K) ở bất kỳ đâu → hộp gõ: tìm tab / chức năng (sổ lối vào DH_MUC + công cụ DH_CC), gõ tên / mã KH / CCCD / SĐT → "Tra khách",
   gõ tên tổ trưởng / mã tổ → "Tìm tổ". ↑ ↓ chọn · Enter mở · Esc đóng. Không dữ liệu gửi đi đâu. Cắm rút: bỏ dòng <script> là mất Ctrl+K, phần khác như cũ. ES5. */
var OL = {ds:[], i:0};
function olMuc(){
  var r = [];
  if(typeof DH_MUC!=='undefined') DH_MUC.forEach(function(m){ r.push({bt:m.bt, ten:m.ten, nhom:'Mở tab', mo:function(){ dhBam('', m.k); }}); });
  if(typeof DH_CC!=='undefined') DH_CC.forEach(function(c){ r.push({bt:c[1], ten:c[3] || c[2], nhom:'Công cụ', mo:function(){ dhCC(c[0]); }}); });
  if(typeof moKiemScan==='function') r.push({bt:'📊', ten:'Kiểm tra hồ sơ scan theo tổ', nhom:'Scan', mo:function(){ doiNgan(4); moKiemScan(); }});
  if(typeof ttkMo==='function') r.push({bt:'👑', ten:'Kiểm CCCD tổ trưởng', nhom:'Scan', mo:function(){ ttkMo(); }});
  if(typeof qlMo==='function') r.push({bt:'🗂', ten:'Quản lý hồ sơ scan (chờ sắp xếp, rà CCCD)', nhom:'Scan', mo:function(){ doiNgan(4); qlMo(); }});
  return r;
}
function olTra(q, theo){   /* mở Tra cứu KH với chữ gõ */
  dongHop(); dhSL('tra');
  setTimeout(function(){ if(typeof tcTim==='function'){ tcTim().theo = theo; } SL_TRA_Q = q; var i = document.getElementById('sl-tim'); if(i){ i.value = q; i.focus(); }
    if(typeof slTraTim==='function') slTraTim(); }, 50);
}
function olLoc(q){
  var c = boDau(String(q||'').trim().toLowerCase()), tu = c.split(/\s+/).filter(Boolean), ds = olMuc();
  var kq = !tu.length ? ds : ds.map(function(m){ var t = boDau((m.ten+' '+m.nhom).toLowerCase()), d = 0;
      if(!tu.every(function(w){ return t.indexOf(w)>=0; })) return null; if(t.indexOf(c)===0) d = 2; else if(t.indexOf(' '+tu[0])>=0) d = 1; m.d = d; return m; })
    .filter(Boolean).sort(function(a, b){ return b.d-a.d; });
  q = String(q||'').trim();
  if(q.length>=2){ var so = q.replace(/[\s.\-]/g, '');
    kq.push({bt:'👤', ten:'Tra khách: “'+q+'”', nhom:/^\d+$/.test(so) ? 'mã KH / CCCD / SĐT / mã món' : 'tên khách', mo:function(){ olTra(q, ''); }});
    kq.push({bt:'👥', ten:'Tìm tổ: “'+q+'”', nhom:'tên tổ trưởng / mã tổ', mo:function(){ olTra(q, 'tt'); }}); }
  return kq.slice(0, 12);
}
function olVe(){
  var e = document.getElementById('ol-ds'), o = document.getElementById('ol-o'); if(!e || !o) return;
  OL.ds = olLoc(o.value); if(OL.i>=OL.ds.length) OL.i = Math.max(0, OL.ds.length-1);
  e.innerHTML = OL.ds.length ? OL.ds.map(function(m, i){ return '<div class="ol-dong'+(i===OL.i ? ' bat' : '')+'" data-lenh="ol.chay" data-i="'+i+'"><span class="ol-bt">'+m.bt+'</span><b>'+coChuHTML(m.ten)+'</b><small>'+coChuHTML(m.nhom)+'</small></div>'; }).join('')
    : '<div class="rong">Không thấy — gõ khác.</div>';
}
function olChay(i){ var m = OL.ds[i]; if(!m) return; dongHop(); setTimeout(function(){ m.mo(); }, 0); }
function olMo(){
  OL.i = 0;
  moHop('<div class="hop-tit">⌨ Ô lệnh <small>(Ctrl+K)</small></div><input id="ol-o" class="gd-o gd-o-tim ol-o" type="search" placeholder="Gõ tên chức năng, tab, tên khách, mã KH, CCCD, SĐT, tổ…" autocomplete="off" data-lenh="ol.go" data-su="input">'+
    '<div id="ol-ds" class="ol-ds"></div><div class="hop-phu">↑ ↓ chọn · Enter mở · Esc đóng</div>');
  var o = document.getElementById('ol-o'); if(o){ o.focus(); o.addEventListener('keydown', function(ev){
    if(ev.key==='ArrowDown' || ev.key==='ArrowUp'){ ev.preventDefault(); var n = OL.ds.length; if(!n) return; OL.i = (OL.i + (ev.key==='ArrowDown' ? 1 : n-1)) % n; olVe(); }
    else if(ev.key==='Enter'){ ev.preventDefault(); olChay(OL.i); } }); }
  olVe();
}
(function(){
  function dk(){ if(dk.xong || typeof GD==='undefined') return; dk.xong = 1; GD.dangKy('ol', {go:function(){ OL.i = 0; olVe(); }, chay:function(el){ olChay(+el.getAttribute('data-i')); }}); }
  document.addEventListener('keydown', function(ev){
    if(!(ev.ctrlKey || ev.metaKey) || ev.altKey || ev.shiftKey || (ev.key || '').toLowerCase()!=='k') return;
    ev.preventDefault(); dk(); if(document.querySelector('#hop.hien #ol-o')) return dongHop(); olMo(); });   /* hộp đóng vẫn để lại nội dung → xét hộp đang hiện */
})();
