/* ===== 3.234 (R2 — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): GIAO DIỆN CHUNG "GD" + ĐIỀU HƯỚNG "DH" =====
   - Bộ nhận lệnh: nút / ô mang data-lenh="khối.lệnh" (+ data-*), 1 bộ nghe chung cho cả app → hàm không cần để chung toàn app, hết lỗi dấu nháy của onclick trong chuỗi.
       GD.dangKy('khối', {lệnh:function(el, ev){…}}). Ô nhập: data-su="change" | "input".
   - Mảnh giao diện: GD.nut · GD.hang · GD.o (ô rộng theo loại: ngày · số · tên · tìm · chữ) · GD.chip · GD.kv (nhãn – giá trị). Code giao diện MỚI chỉ dùng các mảnh này (QUY_CHUAN mục 10).
   - Điều hướng: mỗi lần đổi tab / tab con / mẫu / mở hộp ghi 1 bước vào lịch sử trình duyệt → nút ◀ điện thoại, Back chuột, Alt+← / Alt+→, nút ⬅ ➡ đầu trang lùi / tiến đúng bước.
     Hộp con (GD.moCon): mở hộp từ hộp → hộp cha được giữ nguyên (cả chữ đang gõ), đóng hộp con quay về hộp cha.
   - Phím: Ctrl+P = 🖨 In, Ctrl+S = 💾 Lưu vào app ở khung đang có bộ nút xuất. */
var GD = (function(){
  var LENH = {};
  function dangKy(khoi, ds){ Object.keys(ds).forEach(function(k){ LENH[khoi+'.'+k] = ds[k]; }); }
  function chay(ev){
    var el = ev.target && ev.target.closest ? ev.target.closest('[data-lenh]') : null; if(!el) return;
    var su = el.getAttribute('data-su') || 'click'; if(su!==ev.type) return;
    var f = LENH[el.getAttribute('data-lenh')]; if(!f){ console.warn('Chưa có lệnh '+el.getAttribute('data-lenh')); return; }
    if(ev.type==='click' && el.tagName==='A') ev.preventDefault();
    f(el, ev);
  }
  ['click', 'change', 'input'].forEach(function(t){ document.addEventListener(t, chay); });
  function e(s){ return String(s==null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[c]; }); }   /* 3.237: tự thoát cả dấu " (coChuHTML không thoát → vỡ title / value) */
  function du(d){ return Object.keys(d || {}).map(function(k){ return ' data-'+k+'="'+e(d[k])+'"'; }).join(''); }
  /* nút: {chu, lenh, du, chinh, tat, tit, lop} — luôn vừa chữ, không giãn */
  function nut(o){ return '<button type="button" class="nho gd-nut'+(o.chinh ? ' chinh' : '')+(o.lop ? ' '+o.lop : '')+'"'+(o.lenh ? ' data-lenh="'+o.lenh+'"' : '')+du(o.du)+(o.tit ? ' title="'+e(o.tit)+'"' : '')+(o.tat ? ' disabled' : '')+'>'+o.chu+'</button>'; }
  function hang(ds, phai){ return '<div class="gd-hang'+(phai ? ' gd-phai' : '')+'">'+ds.join('')+'</div>'; }
  /* ô nhập: {loai:'ngay'|'so'|'ten'|'tim'|'chu', gt, ph, lenh, su, du, id} */
  function o(x){ return '<input'+(x.id ? ' id="'+x.id+'"' : '')+' class="gd-o gd-o-'+(x.loai || 'chu')+'" type="'+(x.loai==='tim' ? 'search' : 'text')+'" value="'+e(x.gt==null ? '' : x.gt)+'" placeholder="'+e(x.ph || '')+'"'+
    (x.lenh ? ' data-lenh="'+x.lenh+'" data-su="'+(x.su || 'change')+'"' : '')+du(x.du)+' autocomplete="off">'; }
  function chip(chu, bat, lenh, d, tit){ return '<button type="button" class="gdx-c gd-chip'+(bat ? ' bat' : '')+'" data-lenh="'+lenh+'"'+du(d)+(tit ? ' title="'+e(tit)+'"' : '')+'>'+chu+'</button>'; }
  function kv(nhan, noi){ return '<label class="gd-kv"><span>'+nhan+'</span>'+noi+'</label>'; }
  /* ---------- hộp con ---------- */
  var CHONG = [], CON = false;
  function moCon(f){ CON = true; try { f(); } finally { CON = false; } }   /* gọi hàm mở hộp có sẵn (hsoKBHop…) như hộp con */
  /* ---------- điều hướng DH ---------- */
  var BO_QUA = 0, DANG_VE = false, HOP_TRUOC = false;
  function hopMo(){ var h = document.getElementById('hop'); return !!(h && h.classList.contains('hien')); }
  function chup(){ var C = (typeof D!=='undefined' && D.cauHinh) || {}, s = {n:typeof nganHienTai!=='undefined' ? nganHienTai : 0, sl:C.slTab || ''};
    if(s.n===7 && (s.sl==='hst' || s.sl==='hsv') && typeof hsoCH==='function') s.m = hsoCH()[s.sl] || ''; return s; }
  function giong(a, b){ return !!a && !!b && a.n===b.n && a.sl===b.sl && (a.m || '')===(b.m || ''); }
  function ghi(){ if(DANG_VE) return; var cu = history.state && history.state.th ? history.state.s : null, s = chup(); if(giong(cu, s) && !(history.state && history.state.hop)) return;
    try { history.pushState({th:1, s:s}, ''); } catch(er){} }
  function ve(s){ DANG_VE = true;
    try { var C = D.cauHinh;
      if(s.n===7){ if(C.slTab!==s.sl || nganHienTai!==7){ C.slTab = s.sl; doiNgan(7); } if(s.m && typeof hsoChonMau==='function' && hsoCH()[s.sl]!==s.m) hsoChonMau(s.m); }
      else if(nganHienTai!==s.n) doiNgan(s.n);
    } finally { DANG_VE = false; } }
  window.addEventListener('popstate', function(ev){
    if(BO_QUA>0){ BO_QUA--; return; }
    if(hopMo()){ DANG_VE = true; try { dongHop(true); } finally { DANG_VE = false; } return; }   /* ◀ khi đang mở hộp = đóng hộp (hộp con → về hộp cha) */
    var st = ev.state; if(st && st.th && st.s) ve(st.s);
  });
  function boc(){   /* bọc hàm sẵn có: đổi tab / mở – đóng hộp ghi lịch sử */
    ['doiNgan', 'slDoiTab', 'hsoChonMau'].forEach(function(t){ var g = window[t]; if(typeof g!=='function' || g.__dh) return;
      var b = function(){ var r = g.apply(this, arguments); if(!DANG_VE) setTimeout(ghi, 0); return r; }; b.__dh = true; window[t] = b; });
    var mo = window.moHop, dong = window.dongHop;
    window.moHop = function(html, rong){
      if(document.fullscreenElement && document.exitFullscreen){ try { document.exitFullscreen(); } catch(er){} }   /* 3.238: đang phóng to toàn màn hình → thoát, để hộp mở ra luôn thấy */
      var dangMo = hopMo();
      if(dangMo && CON){ var e2 = document.getElementById('hop-in'), f = document.createDocumentFragment();   /* giữ nguyên hộp cha (nút, chữ đang gõ) */
        while(e2.firstChild) f.appendChild(e2.firstChild); CHONG.push({f:f, lop:e2.className}); }
      var r = mo.apply(this, arguments);
      if((!dangMo || CON) && !DANG_VE){ try { history.pushState({th:1, s:chup(), hop:1}, ''); } catch(er){} }
      return r; };
    window.dongHop = function(tuPop){
      if(!hopMo()) return dong.apply(this, arguments);
      if(tuPop!==true && !DANG_VE && history.state && history.state.hop){ BO_QUA++; history.back(); }   /* đóng bằng nút / Esc → bỏ bước "mở hộp" khỏi lịch sử */
      if(CHONG.length){ if(typeof nhapGiu==='function') nhapGiu(); var x = CHONG.pop(), e2 = document.getElementById('hop-in'); e2.innerHTML = ''; e2.appendChild(x.f); e2.className = x.lop; return; }
      return dong.apply(this, arguments); };
    window.dongHop.__dh = true;
  }
  /* phím Ctrl+P / Ctrl+S ở khung có bộ nút xuất */
  document.addEventListener('keydown', function(ev){
    if(!(ev.ctrlKey || ev.metaKey) || ev.altKey || ev.shiftKey) return; var k = (ev.key || '').toLowerCase(); if(k!=='p' && k!=='s') return;
    var hang = Array.prototype.filter.call(document.querySelectorAll('.xuat-hang'), function(h){ return h.offsetParent; }).pop(); if(!hang) return;
    var b = hang.querySelector(k==='p' ? '.xuat-in:not([disabled])' : '.xuat-app:not([disabled])'); if(!b) return;
    ev.preventDefault(); b.click(); });
  dangKy('dh', {lui:function(){ history.back(); }, tien:function(){ history.forward(); }});
  return {dangKy:dangKy, nut:nut, hang:hang, o:o, chip:chip, kv:kv, moCon:moCon, boc:boc, chup:chup, so:function(){ return CHONG.length; }};
})();
GD.boc();
/* 3.239: nút khung app trong index.html (thanh bên, ô tìm, khung xem file, nền hộp) theo data-lenh — trước là onclick */
(function(){ var k = {
    quetDung:function(el){ QUET.dung = true; el.disabled = true; el.textContent = 'Đang dừng…'; },
    caiDat:function(el){ var x = el.getAttribute('data-k'); if(x) moCaiDat(x); else moCaiDat(); },
    ngan:function(el){ doiNgan(+el.getAttribute('data-n'), el); },
    zoom:function(el){ zoom(+el.getAttribute('data-n')); },
    guiFileMenu:function(el, ev){ guiFileMenu({currentTarget:el, target:ev.target, stopPropagation:function(){ ev.stopPropagation(); }}); },   /* menu đặt theo vị trí nút */
    ngoaiXem:function(el, ev){ if(ev.target.id==='xem') dongXem(); },
    ngoaiHop:function(el, ev){ if(ev.target.id==='hop' && !khoaHop) bamNgoaiHop(); } };
  ['xoaTim', 'moHuongDan', 'moDonKho', 'moRac', 'moNapSL', 'moBCSL', 'moLonCP', 'anPreview', 'inFile', 'guiTrangChon', 'suaMuc', 'hienPreview', 'nutChinh', 'toanManHinh', 'dongXem']
    .forEach(function(t){ k[t] = function(){ return window[t](); }; });
  GD.dangKy('khung', k); })();
setTimeout(function(){ try { history.replaceState({th:1, s:GD.chup()}, ''); } catch(e){} }, 0);
