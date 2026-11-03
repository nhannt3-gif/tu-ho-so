/* ===== 3.461 (anh 03/11/2026) — PHẦN CHUNG chọn món nợ của tổ cho mẫu kiểm tra hộ vay (06A/TD, Biên bản làm việc) =====
   Anh: "cho chọn được 1 lần nhiều hộ của tổ, chọn được nợ quá hạn, nợ khoanh, 3 tháng KHĐ, nợ lãi trên 3 tháng (nợ cần quan tâm)";
   "lãi tồn chỉ lấy các món lãi tồn cao, cụ thể trên 3 tháng lãi, 6 tháng lãi, 12 tháng lãi".
   - Lãi tồn cao: lãi tồn (TH + QH, laiTon) > N tháng lãi; 1 tháng lãi = dư nợ × lãi suất ÷ 100 ÷ 12 (cột Lãi suất Mẫu 31 ghi %/năm — kiểm file thật 25/10).
     Lãi suất 0 / dư nợ 0 → không tính được số tháng → không vào nhóm lãi tồn cao.
   - Nợ quá hạn / khoanh theo món (qh, kn > 0); 3 tháng KHĐ theo slKHD trên kỳ đang dựng (qua KHO.kyDung — như tab Tổ, nhóm "Có nợ cần xử lý").
   - Chọn theo MÓN (số KU), nhớ riêng từng mẫu trong phiên: HSO.nchon[mẫu][ku] = true.
   Cắm rút: bỏ file → 06A về chọn 1 món như cũ, Biên bản làm việc không có bảng chọn. ES5. */
var HSN = (function(){
  var X = {};
  X.NHOM = [['qh', 'Nợ quá hạn'], ['kn', 'Nợ khoanh'], ['khd', '3 tháng KHĐ'], ['l3', 'Lãi tồn > 3 tháng'], ['l6', '> 6 tháng'], ['l12', '> 12 tháng'], ['qt', '⭐ Nợ cần quan tâm']];
  /* 3.461.1 (anh 03/11 "chương trình vay lấy từ dữ liệu nào cho chuẩn"): tên chương trình theo cột "Tên chương trình" Mẫu 31 (ctTen — hệ thống xuất), bỏ chữ "Cho vay" đầu; không có → tên app (hsoCTMon) */
  X.ctTen = function(m){ var v = String((m && m.ctTen) || '').trim().replace(/^cho vay\s+/i, ''); return v ? v.charAt(0).toUpperCase()+v.slice(1) : (typeof hsoCTMon==='function' && m ? hsoCTMon(m) : ''); };
  X.khd = function(){ var o = {}; try { var K = typeof KHO!=='undefined' && KHO.kyDung ? KHO.kyDung() : null; if(typeof slKHD==='function' && K && K.B) slKHD(K.B).forEach(function(r){ if(r && r.ku) o[r.ku] = 1; }); } catch(e){} return o; };
  X.thangLai = function(m){ var lt = typeof laiTon==='function' ? laiTon(m) : 0, dn = +m.dn || 0, ls = +m.ls || 0;
    return lt>0 && dn>0 && ls>0 ? lt/(dn*ls/100/12) : 0; };
  X.co = function(m, K){ return {qh:(m.qh||0)>0, kn:(m.kn||0)>0, khd:!!(K || {})[m.ku], lai:X.thangLai(m)}; };
  X.vao = function(f, n){ return n==='qh' ? f.qh : n==='kn' ? f.kn : n==='khd' ? f.khd : n==='l3' ? f.lai>3 : n==='l6' ? f.lai>6 : n==='l12' ? f.lai>12 : n==='qt' ? (f.qh || f.kn || f.khd || f.lai>3) : false; };
  /* chữ tình trạng 1 món (in vào biên bản / bảng chọn) */
  X.nhan = function(m, f){ var a = [];
    if(f.qh) a.push('Quá hạn');
    if(f.kn) a.push('Nợ khoanh');
    if(f.khd) a.push('3 tháng KHĐ'+(m.ngdg ? ' (GD gần nhất '+ngayVNsl(m.ngdg)+')' : ''));
    if(f.lai>3) a.push('Lãi tồn ≈ '+Math.floor(f.lai)+' tháng');
    return a.join(' · '); };
  /* câu tình huống của cả hộ: "nợ quá hạn, nợ khoanh, nợ lãi tồn cao, món vay không có giao dịch từ 3 tháng" */
  X.tinhHuong = function(ds){ var c = {qh:0, kn:0, lai:0, khd:0}; ds.forEach(function(x){ if(x.f.qh) c.qh = 1; if(x.f.kn) c.kn = 1; if(x.f.lai>3) c.lai = 1; if(x.f.khd) c.khd = 1; });
    return [c.qh ? 'nợ quá hạn' : '', c.kn ? 'nợ khoanh' : '', c.lai ? 'nợ lãi tồn cao' : '', c.khd ? 'món vay không có giao dịch từ 3 tháng' : ''].filter(Boolean).join(', '); };
  /* hộ của tổ có món còn nợ: [{k, mon:[{m, f}]}] theo Mã KH */
  X.ds = function(t){ if(!t || typeof hsoTVTo!=='function') return []; var K = X.khd();
    return hsoTVTo(t).map(function(k){ return {k:k, mon:(k.mon || []).filter(function(m){ return (m.dn||0)>0 || (m.qh||0)>0 || (m.kn||0)>0; }).map(function(m){ return {m:m, f:X.co(m, K)}; })}; })
      .filter(function(h){ return h.mon.length; }).sort(function(a, b){ return String(a.k.kh).localeCompare(String(b.k.kh), 'vi', {numeric:true}); }); };
  X.sel = function(mk){ HSO.nchon = HSO.nchon || {}; return HSO.nchon[mk] = HSO.nchon[mk] || {}; };
  X.datMot = function(mk, ku){ HSO.nchon = HSO.nchon || {}; HSO.nchon[mk] = {}; if(ku) HSO.nchon[mk][ku] = true; };
  /* các hộ có món đang chọn: [{k, mon:[{m, f}]}] — giữ thứ tự Mã KH */
  X.dsChon = function(mk, t){ var s = X.sel(mk); return X.ds(t).map(function(h){ return {k:h.k, mon:h.mon.filter(function(x){ return s[x.m.ku]; })}; }).filter(function(h){ return h.mon.length; }); };
  X.dem = function(mk, t){ var d = X.dsChon(mk, t); return {ho:d.length, mon:d.reduce(function(a, h){ return a+h.mon.length; }, 0)}; };
  var LENH = {
    tich:function(el){ X.sel(el.getAttribute('data-mk'))[el.getAttribute('data-ku')] = el.checked; hsoVe(); },
    nhom:function(el){ var mk = el.getAttribute('data-mk'), n = el.getAttribute('data-n'), s = X.sel(mk), t = KHO.to(hsoCH().to);
      X.ds(t).forEach(function(h){ h.mon.forEach(function(x){ if(X.vao(x.f, n)) s[x.m.ku] = true; }); }); hsoVe(); },
    het:function(el){ var mk = el.getAttribute('data-mk'), v = el.getAttribute('data-v')==='1', s = X.sel(mk), t = KHO.to(hsoCH().to);
      if(!v){ HSO.nchon[mk] = {}; hsoVe(); return; } X.ds(t).forEach(function(h){ h.mon.forEach(function(x){ s[x.m.ku] = true; }); }); hsoVe(); },
    xem:function(el){ HSO.vay.kh = el.getAttribute('data-kh'); HSO.vay.ku = el.getAttribute('data-ku') || ''; hsoVe(); },
    hai:function(el){ D.cauHinh.ktHaiMat = el.checked ? 1 : 0; luu(); }};   /* 3.461.1 (anh 03/11 "nên để chế độ chọn nếu máy in 1 mặt"): dùng chung công tắc In 2 mặt của bộ in (KTGS) */
  /* bảng chọn ở cột trái — op = {tieu, ghi} */
  X.bang = function(t, mk, op){ op = op || {}; if(!X.bang.dk && typeof GD!=='undefined'){ X.bang.dk = 1; GD.dangKy('hsn', LENH); }
    var e = coChuHTML; if(!t) return '<div class="sl-phu">Chọn tổ ở bộ lọc địa bàn để hiện các hộ còn nợ.</div>';
    var ds = X.ds(t), s = X.sel(mk), d = X.dem(mk, t), a = ' data-mk="'+mk+'"';
    var nut = X.NHOM.map(function(n){ var c = 0; ds.forEach(function(h){ h.mon.forEach(function(x){ if(X.vao(x.f, n[0])) c++; }); });
      return '<button class="nho" data-lenh="hsn.nhom"'+a+' data-n="'+n[0]+'"'+(c ? '' : ' disabled')+' title="Tích thêm các món '+e(n[1])+'">'+e(n[1])+' ('+c+')</button>'; }).join('');
    return '<div class="nhan-nhom">👥 '+e(op.tieu || 'Hộ còn nợ của tổ')+' — chọn món <small>'+e(op.ghi || '')+'</small></div>'+
      '<div class="hang-nut">'+nut+'</div><div class="hang-nut"><span class="th-cap">Đã chọn: <b>'+d.mon+'</b> món · <b>'+d.ho+'</b> hộ</span>'+
        '<button class="nho" data-lenh="hsn.het"'+a+' data-v="1">Tích hết</button><button class="nho" data-lenh="hsn.het"'+a+' data-v="0">Bỏ hết</button></div>'+
      '<label class="hso-o2"><input type="checkbox" data-lenh="hsn.hai" data-su="change"'+(typeof ktHaiMat!=='function' || ktHaiMat() ? ' checked' : '')+'> <b>In 2 mặt</b> — in nhiều bản thì chèn trang trắng để bản sau bắt đầu mặt trước; máy in 1 mặt thì bỏ tích (không chèn)</label>'+
      (ds.length ? '<div class="bang-cuon"><table class="bang hso-tv10a hsn-bang"><thead><tr><th>☑</th><th>Hộ</th><th>Số KU · CT</th><th>Dư nợ</th><th>Tình trạng</th></tr></thead><tbody>'+
        ds.map(function(h){ return h.mon.map(function(x, i){ var m = x.m, nh = X.nhan(m, x.f);
          return '<tr class="'+(nh ? '' : 'mo')+'"><td><input type="checkbox" data-lenh="hsn.tich" data-su="change"'+a+' data-ku="'+e(m.ku)+'"'+(s[m.ku] ? ' checked' : '')+'></td>'+
            '<td>'+(i ? '' : '<a href="#" data-lenh="hsn.xem" data-kh="'+e(h.k.kh)+'" data-ku="'+e(m.ku)+'" title="Xem trước hộ này">'+e(tenHoaDau(h.k.ten||''))+'</a><br><small>'+e(h.k.kh)+'</small>')+'</td>'+
            '<td>'+e(m.ku)+'<br><small>'+e(typeof ctNgan==='function' ? ctNgan(m.ct, m) : (m.ct||''))+'</small></td><td class="s">'+tdnTien(m.dn||0)+'</td><td><small>'+e(nh || '—')+'</small></td></tr>'; }).join(''); }).join('')+
        '</tbody></table></div>' : '<div class="sl-phu">Tổ không có hộ còn nợ ở kỳ số liệu đang mở.</div>'); };
  return X;
})();
