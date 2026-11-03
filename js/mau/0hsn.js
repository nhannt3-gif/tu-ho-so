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
  /* 3.461.3 (anh 03/11 "bố trí cuộn trong 1 cửa sổ cố định, tính cho laptop 125% và màn hình 17 inch … 1 dòng 1 món vay"; "các cột còn rộng thì bố trí đủ, không đủ thì bỏ số KU, ghi chương trình vay, thêm cột lãi tồn"; "theo cho là tốt nhất"):
     khung cuộn cố định (cao = phần màn hình còn lại, tối thiểu 260 px), tiêu đề cột đứng yên; mỗi món 1 dòng; hộ nhiều món: tên ở dòng đầu, dòng sau 〃;
     cột ☑ · Hộ · Mã KH · Số KU (tự ẩn khi khung hẹp) · CT · Dư nợ · Lãi tồn · Tình trạng (chip màu); bấm cả dòng để tích, bấm tên hộ để xem trước;
     lọc "Chỉ món có vấn đề" mặc định bật, ô tìm tên / mã KH / số KU. Trạng thái lọc nhớ trong phiên: HSO.hsnLoc = {q, vd}. */
  X.loc = function(){ HSO.hsnLoc = HSO.hsnLoc || {q:'', vd:true}; return HSO.hsnLoc; };
  X.dsHien = function(t){ var L = X.loc(), q = typeof sxChuan==='function' ? sxChuan(L.q||'') : String(L.q||'').toLowerCase();
    var tim = function(h, m){ var s = (h.k.ten||'')+' '+h.k.kh+' '+m.ku; return !q || (typeof sxChuan==='function' ? sxChuan(s) : s.toLowerCase()).indexOf(q)>=0; };
    return X.ds(t).map(function(h){ return {k:h.k, mon:h.mon.filter(function(x){ return (!L.vd || X.vao(x.f, 'qt')) && tim(h, x.m); })}; }).filter(function(h){ return h.mon.length; }); };
  var LENH = {
    dong:function(el){ var s = X.sel(el.getAttribute('data-mk')), ku = el.getAttribute('data-ku'); s[ku] = !s[ku]; hsoVe(); },
    tich:function(el){ X.sel(el.getAttribute('data-mk'))[el.getAttribute('data-ku')] = el.checked; hsoVe(); },
    nhom:function(el){ var mk = el.getAttribute('data-mk'), n = el.getAttribute('data-n'), s = X.sel(mk), t = KHO.to(hsoCH().to);
      X.ds(t).forEach(function(h){ h.mon.forEach(function(x){ if(X.vao(x.f, n)) s[x.m.ku] = true; }); }); hsoVe(); },
    het:function(el){ var mk = el.getAttribute('data-mk'), v = el.getAttribute('data-v')==='1', s = X.sel(mk), t = KHO.to(hsoCH().to);
      if(!v){ HSO.nchon[mk] = {}; hsoVe(); return; } X.dsHien(t).forEach(function(h){ h.mon.forEach(function(x){ s[x.m.ku] = true; }); }); hsoVe(); },   /* Tích hết = các món đang hiện (theo lọc) */
    vd:function(){ var L = X.loc(); L.vd = !L.vd; hsoVe(); },
    tim:function(el){ X.loc().q = el.value; clearTimeout(X.bang.hen); X.bang.hen = setTimeout(function(){ hsoVe(); var o = document.querySelector('.hsn-tim'); if(o){ o.focus(); o.setSelectionRange(o.value.length, o.value.length); } }, 400); },
    xem:function(el){ HSO.vay.kh = el.getAttribute('data-kh'); HSO.vay.ku = el.getAttribute('data-ku') || ''; hsoVe(); },
    hai:function(el){ D.cauHinh.ktHaiMat = el.checked ? 1 : 0; luu(); }};   /* 3.461.1: dùng chung công tắc In 2 mặt của bộ in (KTGS) */
  var CHIP = function(m, f){ var a = [];
    if(f.qh) a.push(['qh', 'Quá hạn']); if(f.kn) a.push(['kn', 'Khoanh']); if(f.khd) a.push(['khd', '3T KHĐ'+(m.ngdg ? '' : '')]); if(f.lai>3) a.push(['lai', 'Lãi ≈ '+Math.floor(f.lai)+'T']);
    return a.length ? a.map(function(x){ return '<span class="hsn-chip hsn-'+x[0]+'">'+x[1]+'</span>'; }).join(' ') : '<span class="hsn-gach">—</span>'; };
  var NGAN = {qh:'Nợ quá hạn', kn:'Khoanh', khd:'3T KHĐ', l3:'Lãi > 3T', l6:'> 6T', l12:'> 12T', qt:'⭐ Cần quan tâm'};
  /* bảng chọn ở cột trái — op = {tieu, ghi} */
  X.bang = function(t, mk, op){ op = op || {}; if(!X.bang.dk && typeof GD!=='undefined'){ X.bang.dk = 1; GD.dangKy('hsn', LENH); }
    var e = coChuHTML; if(!t) return '<div class="sl-phu">Chọn tổ ở bộ lọc địa bàn để hiện các hộ còn nợ.</div>';
    var ds = X.ds(t), hien = X.dsHien(t), s = X.sel(mk), d = X.dem(mk, t), L = X.loc(), a = ' data-mk="'+mk+'"';
    var nhom = X.NHOM.map(function(n){ var c = 0; ds.forEach(function(h){ h.mon.forEach(function(x){ if(X.vao(x.f, n[0])) c++; }); });
      return '<button class="nho" data-lenh="hsn.nhom"'+a+' data-n="'+n[0]+'"'+(c ? '' : ' disabled')+' title="Tích thêm các món: '+e(n[1])+'">'+e(NGAN[n[0]] || n[1])+' ('+c+')</button>'; }).join('');
    var tong = ds.reduce(function(a2, h){ return a2+h.mon.length; }, 0), soHien = hien.reduce(function(a2, h){ return a2+h.mon.length; }, 0);
    var dong = hien.map(function(h, sh){ return h.mon.map(function(x, i){ var m = x.m, ct = typeof ctNgan==='function' ? ctNgan(m.ct, m) : (m.ct||''), co = !!s[m.ku];
      return '<tr class="hsn-dong'+(i ? ' hsn-tiep' : ' hsn-dau')+(co ? ' bat' : '')+(X.vao(x.f, 'qt') ? '' : ' mo')+'" data-lenh="hsn.dong"'+a+' data-ku="'+e(m.ku)+'" title="Bấm để tích / bỏ tích">'+
        '<td class="hsn-o"><input type="checkbox" tabindex="-1"'+(co ? ' checked' : '')+'></td><td class="hsn-stt">'+(i ? '' : sh+1)+'</td>'+   /* 3.461.4: STT theo hộ */
        '<td class="hsn-ten">'+(i ? '<span class="hsn-lap">〃</span>' : '<a href="#" data-lenh="hsn.xem" data-kh="'+e(h.k.kh)+'" data-ku="'+e(m.ku)+'" title="Xem trước hộ này">'+e(tenHoaDau(h.k.ten||''))+'</a>')+'</td>'+
        '<td class="hsn-kh">'+(i ? '' : e(h.k.kh))+'</td><td class="hsn-ku">'+e(m.ku)+'</td><td title="'+e(X.ctTen(m))+'">'+e(ct)+'</td>'+
        '<td class="s">'+tdnTien(m.dn||0)+'</td><td class="s">'+tdnTien(typeof laiTon==='function' ? laiTon(m) : 0)+'</td><td>'+CHIP(m, x.f)+'</td></tr>'; }).join(''); }).join('');
    return '<div class="hsn">'+
      '<div class="nhan-nhom">👥 '+e(op.tieu || 'Hộ còn nợ của tổ')+' — chọn món <small>'+e(op.ghi || '')+'</small></div>'+
      '<div class="hsn-thanh">'+nhom+'</div>'+
      '<div class="hsn-thanh"><input class="hsn-tim" data-lenh="hsn.tim" data-su="input" placeholder="🔎 tên / mã KH / số KU" value="'+e(L.q||'')+'">'+
        '<button class="nho'+(L.vd ? ' bat' : '')+'" data-lenh="hsn.vd" title="Chỉ hiện món quá hạn, khoanh, 3 tháng KHĐ, lãi tồn > 3 tháng">Chỉ món có vấn đề</button>'+
        '<button class="nho" data-lenh="hsn.het"'+a+' data-v="1" title="Tích các món đang hiện">Tích hết</button><button class="nho" data-lenh="hsn.het"'+a+' data-v="0">Bỏ hết</button>'+
        '<span class="hsn-gian"></span><span class="hsn-dem">Đã chọn <b>'+d.mon+'</b> món · <b>'+d.ho+'</b> hộ</span>'+
        '<label class="hsn-hai"><input type="checkbox" data-lenh="hsn.hai" data-su="change"'+(typeof ktHaiMat!=='function' || ktHaiMat() ? ' checked' : '')+'> In 2 mặt</label></div>'+
      (ds.length ? '<div class="hsn-hop"><table class="hsn-bang"><thead><tr><th class="hsn-o">☑</th><th class="hsn-stt">STT</th><th>Hộ</th><th>Mã KH</th><th class="hsn-ku">Số KU</th><th>CT</th><th class="s">Dư nợ</th><th class="s">Lãi tồn</th><th>Tình trạng</th></tr></thead><tbody>'+
          (dong || '<tr><td colspan="9" class="hsn-rong">Không có món nào khớp lọc'+(L.vd ? ' — bấm "Chỉ món có vấn đề" để hiện hết' : '')+'.</td></tr>')+'</tbody></table></div>'+
          '<div class="hsn-chan">Hiện <b>'+soHien+'</b>/'+tong+' món · máy in 1 mặt: bỏ tích "In 2 mặt" (không chèn trang trắng)</div>'
        : '<div class="sl-phu">Tổ không có hộ còn nợ ở kỳ số liệu đang mở.</div>')+'</div>'; };
  return X;
})();
