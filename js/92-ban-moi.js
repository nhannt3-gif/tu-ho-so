/* ===== 3.545 A4 (docs/DANH_GIA_CHUYEN_GIA_1511.md — anh 15/11 "code A4"): BIẾT MÁY ĐANG CHẠY BẢN NÀO + NHẮC CẬP NHẬT =====
   Sự cố 15/11: laptop còn chạy 3.519 trong khi main đã 3.542 → file đối chiếu 30/09 phải xuất lại.
   ① Mở app 5 giây, rồi 30 phút / lần (và khi quay lại tab sau ≥ 10 phút): hỏi máy chủ bản mới nhất (đọc APP_BAN trong js/02-nen.js, không đệm).
      Có bản mới → dải trên cùng "Máy này đang chạy bản X — đã có bản Y" + nút Cập nhật ngay (tải lại bỏ đệm) / Để sau.
   ② 📤 File đối chiếu giao ban: kiểm lại ngay trước khi xuất — máy chạy bản cũ → không xuất (2 bên phải so cùng cách tính); mất mạng không kiểm được → xuất như cũ.
   Chỉ chạy trên http(s) (mở file:// thì bỏ qua). Không gửi gì đi đâu — chỉ đọc 1 tệp của chính app. Cắm rút: bỏ dòng <script> là như cũ. ES5. */
var BMN = (function(){
  var M = {moi:'', luc:0, hoi:null};
  var coMang = function(){ return /^https?:$/.test(location.protocol); };
  /* so 2 số bản theo từng đoạn số: 3.545 > 3.544 · 3.90.1 < 3.90.2 · '' = chưa biết */
  M.so = function(a, b){ var x = String(a||'').split('.'), y = String(b||'').split('.'), n = Math.max(x.length, y.length), i, p, q;
    for(i=0; i<n; i++){ p = +x[i] || 0; q = +y[i] || 0; if(p!==q) return p>q ? 1 : -1; } return 0; };
  M.docBan = function(t){ var m = /APP_BAN\s*=\s*'([0-9.]+)'/.exec(String(t||'')); return m ? m[1] : ''; };
  /* hỏi máy chủ → Promise(bản mới nhất | '' khi không hỏi được) */
  M.kiem = function(){
    if(!coMang() || typeof fetch!=='function') return Promise.resolve('');
    if(M.hoi) return M.hoi;
    M.hoi = fetch('js/02-nen.js?kiem_ban=1', {cache:'no-store'}).then(function(r){ return r.ok ? r.text() : ''; })
      .then(function(t){ var b = M.docBan(t); M.luc = Date.now(); if(b){ M.moi = b; M.ve(); } M.hoi = null; return b; })
      .catch(function(){ M.hoi = null; return ''; });
    return M.hoi;
  };
  M.cu = function(){ return !!M.moi && M.so(M.moi, APP_BAN) > 0; };   /* máy này đang chạy bản cũ hơn máy chủ */
  M.ve = function(){
    var e = document.getElementById('dai-ban');
    var bo = ''; try{ bo = sessionStorage.getItem('tuhoso_ban_bo') || ''; }catch(er){}
    if(!M.cu() || bo===M.moi){ if(e) e.remove(); return; }
    if(!e){ e = document.createElement('div'); e.id = 'dai-ban'; e.setAttribute('role', 'status'); document.body.insertBefore(e, document.body.firstChild); }
    e.innerHTML = '<span>⚠ Máy này đang chạy <b>bản '+APP_BAN+'</b> — đã có <b>bản '+M.moi+'</b>.</span>'+
      '<button type="button" class="nut-chinh" data-lenh="bmn.capNhat">⟳ Cập nhật ngay</button><button type="button" data-lenh="bmn.deSau">Để sau</button>';
  };
  /* tải lại bỏ đệm: làm mới trang gốc trong đệm trình duyệt + bộ đệm không mạng rồi nạp lại (các tệp js/css đi theo ?v= mới) */
  M.capNhat = function(){
    if(typeof batChay==='function') batChay(true, 'Đang cập nhật bản '+M.moi+'…');
    var xong = function(){ location.reload(); };
    var sw = (navigator.serviceWorker && navigator.serviceWorker.getRegistration) ? navigator.serviceWorker.getRegistration().then(function(r){ return r && r.update(); }).catch(function(){}) : Promise.resolve();
    Promise.all([fetch('./', {cache:'reload'}).catch(function(){}), fetch('index.html', {cache:'reload'}).catch(function(){}), sw]).then(xong, xong);
  };
  M.deSau = function(){ try{ sessionStorage.setItem('tuhoso_ban_bo', M.moi); }catch(er){} M.ve(); };
  /* chặn xuất khi máy chạy bản cũ — goi() chạy khi bản mới nhất / không kiểm được */
  M.chan = function(viec, goi){
    return M.kiem().then(function(){
      if(M.cu()){ try{ sessionStorage.removeItem('tuhoso_ban_bo'); }catch(er){} M.ve();
        return bao('Chưa '+viec+': máy này đang chạy bản '+APP_BAN+', đã có bản '+M.moi+'. Bấm ⟳ Cập nhật ngay (dải trên cùng) rồi làm lại — hai bên phải so cùng cách tính.', 10); }
      goi();
    });
  };
  /* lịch hỏi */
  if(coMang()){
    window.addEventListener('load', function(){ setTimeout(M.kiem, 5000); setInterval(function(){ if(document.visibilityState!=='hidden') M.kiem(); }, 30*60000); });
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible' && Date.now()-M.luc > 10*60000) M.kiem(); });
  }
  /* lệnh + bọc 📤 File đối chiếu (gọi theo tên lúc bấm nên bọc được) */
  if(typeof gdDangKy==='function') gdDangKy('bmn', {capNhat:function(){ M.capNhat(); }, deSau:function(){ M.deSau(); }});
  if(typeof slDCXuat==='function'){ var cuXuat = slDCXuat; slDCXuat = function(ky){ return M.chan('lập file đối chiếu', function(){ cuXuat(ky); }); }; }
  return M;
})();
