/* ===== 3.548 đợt 2 (docs/DANH_GIA_CHUYEN_GIA_1511.md A2 · A3 · mục 4c E1 · E2 — anh 15/11 "code cả 2 và gộp"): MÁY THẬT ↔ AI =====
   A2 Sổ thử máy thật: "Có gì mới" › mỗi việc thử có ✓ Đạt / ✗ Chưa (+ ghi chú) — lưu trên máy + đồng bộ Drive.
   A3 Lỗi lên Drive (anh ✓ 15/11): nhật ký lỗi js/67 (50 lỗi gần nhất) đồng bộ Drive — dãy số ≥ 6 chữ số (CCCD, số KU, TK) và email bị che trước khi ghi.
   A4 thêm: mỗi máy ghi bản app đang chạy + lúc mở.
   → 1 file Drive của anh: <thư mục app>/_Hệ thống/may_that.json = {may:{<mã máy>:{ban, luc, ua, thu:[…], loi:[…]}}} — mỗi máy chỉ ghi mục của mình (đọc → thay mục mình → ghi).
     Phiên AI có Drive đọc file này đầu phiên: biết anh đã thử gì, máy nào lỗi gì, chạy bản nào. Không dữ liệu khách.
   E1 Khóa giữa các tab: mở app ở tab thứ 2 cùng máy → tab sau CHỈ XEM (không ghi dữ liệu — tránh 2 tab ghi đè nhau), dải đỏ + nút "Dùng tab này".
   E2 Tự xin lưu bền (navigator.storage.persist) lúc mở — trình duyệt không tự xóa dữ liệu app khi máy đầy.
   Cắm rút: bỏ dòng <script> là như cũ. ES5. */
var MTH = (function(){
  var M = {KHOA:'tuhoso_thu_may', TEP:'may_that.json', chiXem:false, hen:null};
  var doc = function(){ try{ return JSON.parse(localStorage.getItem(M.KHOA) || '{}') || {}; }catch(e){ return {}; } };
  var ghi = function(o){ try{ localStorage.setItem(M.KHOA, JSON.stringify(o)); }catch(e){} };
  /* ---- che dữ liệu trong chữ lỗi: số dài, email ---- */
  M.che = function(t){ return String(t||'').replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '«email»').replace(/\d{6,}/g, function(x){ return '#'+x.length+'số'; }); };
  /* ---- A2: kết quả thử của bản hiện tại ---- */
  M.kq = function(){ var o = doc(); return (o[APP_BAN] = o[APP_BAN] || {}); };
  M.datKq = function(i, kq, ghiChu){ var o = doc(), b = o[APP_BAN] = o[APP_BAN] || {};
    b[i] = {kq:kq, ghi:String(ghiChu||'').slice(0, 300), luc:new Date().toISOString()};
    var ds = Object.keys(o).sort(function(a, c){ return typeof BMN!=='undefined' ? BMN.so(c, a) : (c>a ? 1 : -1); }); ds.slice(10).forEach(function(k){ delete o[k]; });   /* giữ 10 bản gần nhất */
    ghi(o); M.henDay(3000); };
  M.thuHTML = function(){
    var ds = (typeof CO_GI_MOI!=='undefined' && CO_GI_MOI.thu) || []; if(!ds.length) return '';
    var k = M.kq(), x = coChuHTML;
    return '<div class="mth-thu"><h3>Kết quả thử trên máy này <small title="Lưu trên máy + Drive (_Hệ thống/may_that.json) — em đọc được, anh không phải gõ lại">ⓘ</small></h3>'+ds.map(function(t, i){ var r = k[i] || {};
      return '<div class="mth-dong" data-i="'+i+'"><span class="mth-viec">'+x(t)+'</span><button class="nho'+(r.kq==='dat' ? ' chinh' : '')+'" data-lenh="mth.dat" data-i="'+i+'">✓ Đạt</button>'+
        '<button class="nho'+(r.kq==='chua' ? ' do' : '')+'" data-lenh="mth.chua" data-i="'+i+'">✗ Chưa</button>'+(r.ghi ? '<small class="mth-ghi">'+x(r.ghi)+'</small>' : '')+'</div>'; }).join('')+'</div>';
  };
  M.veLai = function(){ var e = document.querySelector('.mth-thu'); if(e) e.outerHTML = M.thuHTML(); };
  /* ---- mục của máy này ---- */
  M.muc = function(){
    var t = M.kq(), ds = (typeof CO_GI_MOI!=='undefined' && CO_GI_MOI.thu) || [], loi = typeof nklDs==='function' ? nklDs().slice(-50) : [];
    return {ban:APP_BAN, luc:new Date().toISOString(), ua:String(navigator.userAgent||'').slice(0, 160),
      thu:Object.keys(t).map(function(i){ return {ban:APP_BAN, viec:ds[i] || ('#'+i), kq:t[i].kq, ghi:M.che(t[i].ghi), luc:t[i].luc}; }),
      loi:loi.map(function(l){ return {luc:l.luc, msg:M.che(l.msg), nguon:l.nguon, ban:l.ban, tab:l.tab, lan:l.lan||1}; })};
  };
  /* ---- đồng bộ Drive (đọc → thay mục máy này → ghi) ---- */
  M.henDay = function(ms){ clearTimeout(M.hen); M.hen = setTimeout(M.day, ms || 20000); };
  M.day = function(){
    if(M.chiXem || typeof coTheNoiDrive!=='function' || !coTheNoiDrive() || !DR.sanSang) return Promise.resolve(false);
    return baoDamDuong(D.cauHinh.thumuc+'/_Hệ thống').then(function(id){
      return timFileTrong(M.TEP, id).then(function(cu){
        return (cu ? goiDrive('https://www.googleapis.com/drive/v3/files/'+cu.id+'?alt=media') : Promise.resolve(null)).then(function(r){
          r = (r && r.may) ? r : {may:{}}; r.may[maMayCua()] = M.muc(); r.luc = new Date().toISOString();
          return ghiJSONLenDrive(M.TEP, id, r, cu); }); }); })
      .then(function(){ return true; }, function(e){ console.warn('Không đẩy được may_that.json', e); return false; });
  };
  /* ---- E1: khóa giữa các tab ---- */
  M.id = Date.now().toString(36)+Math.random().toString(36).slice(2, 6);
  M.daiTab = function(){
    var e = document.getElementById('dai-tab');
    if(!M.chiXem){ if(e) e.remove(); return; }
    if(!e){ e = document.createElement('div'); e.id = 'dai-tab'; e.setAttribute('role', 'alert'); document.body.insertBefore(e, document.body.firstChild); }
    e.innerHTML = '<span>⛔ App đang mở ở <b>tab khác</b> — tab này <b>chỉ xem</b>, sửa ở đây không được lưu.</span><button type="button" class="nut-chinh" data-lenh="mth.dungTab">Dùng tab này</button>';
  };
  M.datChiXem = function(v){ M.chiXem = v; M.daiTab(); };
  M.khoiKenh = function(){
    var KenhTab = window.BroadcastChannel; if(!KenhTab || M.kenh) return;
    var tat = navigator.webdriver; try{ if(localStorage.getItem('tuhoso_e1_thu')) tat = false; }catch(e){}   /* phép thử tự động mở nhiều trang cùng lúc — tắt, trừ phép thử E1 */
    if(tat) return;
    M.kenh = new KenhTab('tuhoso-tab');
    M.kenh.onmessage = function(ev){ var d = ev.data || {};
      if(d.hoi && !M.chiXem && !(M.cho && M.id > d.hoi)) M.kenh.postMessage({co:M.id});   /* tab chính trả lời; 2 tab mở cùng lúc → mã nhỏ hơn làm tab chính */
      else if(d.co && d.co!==M.id && M.cho) M.datChiXem(true);   /* tab mới thấy có tab chính → chỉ xem */
      else if(d.chiem && d.chiem!==M.id && !M.chiXem){ M.datChiXem(true); bao('Tab khác đã nhận làm tab chính — tab này chuyển sang chỉ xem.', 6); } };
    M.cho = true; M.kenh.postMessage({hoi:M.id}); setTimeout(function(){ M.cho = false; }, 1500);
  };
  M.dungTab = function(){ if(M.kenh) M.kenh.postMessage({chiem:M.id}); M.datChiXem(false); bao('Tab này là tab chính — dữ liệu ở đây được lưu. Nên tải lại để có dữ liệu mới nhất.', 6); };
  if(typeof luuNgay==='function'){ var cuLuu = luuNgay; luuNgay = function(){ if(M.chiXem){ if(!M.baoLuc || Date.now()-M.baoLuc>15000){ M.baoLuc = Date.now(); bao('Tab này chỉ xem (app đang mở ở tab khác) — không lưu. Bấm "Dùng tab này" ở dải trên cùng.', 6); } return false; } return cuLuu.apply(this, arguments); }; }
  /* ---- E2: tự xin lưu bền ---- */
  M.luuBen = function(){ try{ if(navigator.storage && navigator.storage.persisted && navigator.storage.persist) return navigator.storage.persisted().then(function(g){ return g || navigator.storage.persist(); }).catch(function(){ return false; }); }catch(e){} return Promise.resolve(false); };
  /* ---- gắn ---- */
  if(typeof noiDungCoGiMoi==='function'){ var cuMoi = noiDungCoGiMoi; noiDungCoGiMoi = function(){ return cuMoi.apply(this, arguments)+M.thuHTML(); }; }
  if(typeof nklGhi==='function'){ var cuNk = nklGhi; nklGhi = function(){ var r = cuNk.apply(this, arguments); M.henDay(60000); return r; }; }
  if(typeof gdDangKy==='function') gdDangKy('mth', {
    dat:function(el){ M.datKq(el.getAttribute('data-i'), 'dat', ''); M.veLai(); },
    chua:function(el){ var i = el.getAttribute('data-i'), g = window.prompt('Chưa đạt ở chỗ nào? (ghi ngắn — không ghi tên / CCCD khách)', (M.kq()[i] || {}).ghi || ''); if(g===null) return; M.datKq(i, 'chua', g); M.veLai(); },
    dungTab:function(){ M.dungTab(); }});
  M.khoiKenh();
  window.addEventListener('pagehide', function(){ if(M.kenh && !M.chiXem) M.kenh.postMessage({roi:M.id}); });
  window.addEventListener('load', function(){ setTimeout(M.luuBen, 3000); M.henDay(20000); });
  return M;
})();
