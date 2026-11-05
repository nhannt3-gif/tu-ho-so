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
  /* 3.486 (anh 05/11 ảnh Hồ sơ vay › BBLV "khi lọc Hội nên cho hiện cả Hội ra luôn"): bộ lọc chọn tới Hội / điểm GD / xã, CHƯA chọn tổ → các tổ trong phạm vi
     (xếp xã › Hội › tên tổ); bảng chọn món hiện hộ của cả phạm vi (dòng nhóm theo tổ), in 1 lần (hsoLap · pvNhieu) */
  X.pvTo = function(){ var S = hsoCH(); if(S.to || !(S.xa || S.diem || S.hoi) || typeof pvLoc!=='function') return null;
    var k = function(t){ return [t.xa || '', t.dv || '', t.ten || t.ma].join('|'); };
    return KHO.dsTo().filter(function(t){ return pvLoc(S, t); }).sort(function(a, b){ return k(a).localeCompare(k(b), 'vi', {numeric:true}); }); };
  X.tHien = function(){ return KHO.to(hsoCH().to) || X.pvTo(); };   /* tổ đang chọn, hoặc mảng tổ của phạm vi */
  X.pvNhieu = function(mk){ var dsT = X.pvTo(); if(!dsT || !dsT.length) return null; var s = X.sel(mk), kh = HSO.vay && HSO.vay.kh;
    var ds = dsT.filter(function(t){ return X.ds(t).some(function(h){ return h.mon.some(function(x){ return s[x.m.ku]; }); }); }).map(function(t){ return t.ma; });
    if(!ds.length && kh){ var c = dsT.find(function(t){ return X.ds(t).some(function(h){ return h.k.kh===kh; }); }); if(c) ds = [c.ma]; }   /* chưa tích → hộ đang xem */
    return ds.length ? {ds:ds, ten:typeof pvChu==='function' ? pvChu(hsoCH(), KHO.kyDung()) : ''} : null; };
  X.ds = function(t){ if(Array.isArray(t)) return [].concat.apply([], t.map(function(tt){ return X.ds(tt).map(function(h){ h.to = tt; return h; }); }));
    if(!t || typeof hsoTVTo!=='function') return []; var K = X.khd();
    return hsoTVTo(t).map(function(k){ return {k:k, mon:(k.mon || []).filter(function(m){ return (m.dn||0)>0 || (m.qh||0)>0 || (m.kn||0)>0; }).map(function(m){ return {m:m, f:X.co(m, K)}; })}; })
      .filter(function(h){ return h.mon.length; }).sort(function(a, b){ return String(a.k.kh).localeCompare(String(b.k.kh), 'vi', {numeric:true}); }); };
  /* 3.483 (anh 05/11 "liên kết 2 biên bản qua bên tab Tổ"): mở Hồ sơ vay — tổ maTo, mẫu mk, tích sẵn mọi món có cờ loai (qh · kn · khd); giữ kỳ đang xem. → số món tích
     3.484 (anh 05/11 "in 1 lần theo Hội đoàn thể hoặc từng tổ"): maTo là MẢNG nhiều tổ → HSO.nhieu = {ds:[mã tổ], ten} — hsoLap (js/25b) lập lần lượt từng tổ, gộp 1 bản in / PDF / Word */
  X.dem1 = function(t, loai){ return X.ds(t).reduce(function(a, h){ return a+h.mon.filter(function(x){ return x.f[loai]; }).length; }, 0); };
  X.tuTo = function(mk, maTo, loai, ten){ var dsTo = (Array.isArray(maTo) ? maTo : [maTo]).filter(function(m){ var t = KHO.to(m); return t && loai && X.dem1(t, loai); });
    if(!dsTo.length) return 0; var t = KHO.to(dsTo[0]), S = hsoCH(), n = 0;
    if(S.to!==dsTo[0]){ S.xa = t.xa || ''; S.diem = t.khoaDiem || ''; S.hoi = String(t.dv||''); S.ap = ''; S.to = dsTo[0]; }   /* phạm vi chung đặt đúng tổ (như hso06aMo) */
    dsTo.forEach(function(m){ n += X.dem1(KHO.to(m), loai); });
    HSO_DEN = {ap:function(){ var s = {}; dsTo.forEach(function(m){ X.ds(KHO.to(m)).forEach(function(h){ h.mon.forEach(function(x){ if(x.f[loai]) s[x.m.ku] = true; }); }); });
      HSO.nchon = HSO.nchon || {}; HSO.nchon[mk] = s; X.loc().q = ''; HSO.nhieu = dsTo.length>1 ? {ds:dsTo, ten:ten || dsTo.length+' tổ'} : null; }};   /* hsoVe đổi tổ / mẫu tạo HSO mới → tích sau đó */
    S.hsv = mk; luu(); dhSL('hsv'); return n; };
  X.sel = function(mk){ HSO.nchon = HSO.nchon || {}; return HSO.nchon[mk] = HSO.nchon[mk] || {}; };
  X.datMot = function(mk, ku){ HSO.nchon = HSO.nchon || {}; HSO.nchon[mk] = {}; if(ku) HSO.nchon[mk][ku] = true; };
  /* các hộ có món đang chọn: [{k, mon:[{m, f}]}] — giữ thứ tự Mã KH */
  X.dsChon = function(mk, t){ var s = X.sel(mk); return X.ds(t).map(function(h){ return {k:h.k, to:h.to, mon:h.mon.filter(function(x){ return s[x.m.ku]; })}; }).filter(function(h){ return h.mon.length; }); };
  X.dem = function(mk, t){ var d = X.dsChon(mk, t); return {ho:d.length, mon:d.reduce(function(a, h){ return a+h.mon.length; }, 0)}; };
  /* 3.461.3 (anh 03/11 "bố trí cuộn trong 1 cửa sổ cố định, tính cho laptop 125% và màn hình 17 inch … 1 dòng 1 món vay"; "các cột còn rộng thì bố trí đủ, không đủ thì bỏ số KU, ghi chương trình vay, thêm cột lãi tồn"; "theo cho là tốt nhất"):
     khung cuộn cố định (cao = phần màn hình còn lại, tối thiểu 260 px), tiêu đề cột đứng yên; mỗi món 1 dòng; hộ nhiều món: tên ở dòng đầu, dòng sau 〃;
     cột ☑ · Hộ · Mã KH · Số KU (tự ẩn khi khung hẹp) · CT · Dư nợ · Lãi tồn · Tình trạng (chip màu); bấm cả dòng để tích, bấm tên hộ để xem trước;
     lọc "Chỉ món có vấn đề" mặc định bật, ô tìm tên / mã KH / số KU. Trạng thái lọc nhớ trong phiên: HSO.hsnLoc = {q, vd}. */
  /* 3.480 (anh 05/11 "mẫu BBLV in 1 mặt mặc định cho an toàn"): công tắc In 2 mặt theo mẫu — BBLV riêng (chưa khai = 1 mặt); mẫu khác (06A) dùng chung công tắc KTGS như cũ */
  X.haiMat = function(mk){ return mk==='bblv' ? D.cauHinh.bblvHaiMat===1 : (typeof ktHaiMat!=='function' || ktHaiMat()); };
  X.loc = function(){ HSO.hsnLoc = HSO.hsnLoc || {q:'', vd:true}; return HSO.hsnLoc; };
  X.dsHien = function(t){ var L = X.loc(), q = typeof sxChuan==='function' ? sxChuan(L.q||'') : String(L.q||'').toLowerCase();
    var tim = function(h, m){ var s = (h.k.ten||'')+' '+h.k.kh+' '+m.ku; return !q || (typeof sxChuan==='function' ? sxChuan(s) : s.toLowerCase()).indexOf(q)>=0; };
    return X.ds(t).map(function(h){ return {k:h.k, to:h.to, mon:h.mon.filter(function(x){ return (!L.vd || X.vao(x.f, 'qt')) && tim(h, x.m); })}; }).filter(function(h){ return h.mon.length; }); };
  var LENH = {
    dong:function(el){ var s = X.sel(el.getAttribute('data-mk')), ku = el.getAttribute('data-ku'); s[ku] = !s[ku]; hsoVe(); },
    tich:function(el){ X.sel(el.getAttribute('data-mk'))[el.getAttribute('data-ku')] = el.checked; hsoVe(); },
    nhom:function(el){ var mk = el.getAttribute('data-mk'), n = el.getAttribute('data-n'), s = X.sel(mk), t = X.tHien();
      X.ds(t).forEach(function(h){ h.mon.forEach(function(x){ if(X.vao(x.f, n)) s[x.m.ku] = true; }); }); hsoVe(); },
    het:function(el){ var mk = el.getAttribute('data-mk'), v = el.getAttribute('data-v')==='1', s = X.sel(mk), t = X.tHien();
      if(!v){ HSO.nchon[mk] = {}; hsoVe(); return; } X.dsHien(t).forEach(function(h){ h.mon.forEach(function(x){ s[x.m.ku] = true; }); }); hsoVe(); },   /* Tích hết = các món đang hiện (theo lọc) */
    vd:function(){ var L = X.loc(); L.vd = !L.vd; hsoVe(); },
    boNhieu:function(){ HSO.nhieu = null; hsoVe(); },   /* 3.484 */
    tim:function(el){ X.loc().q = el.value; clearTimeout(X.bang.hen); X.bang.hen = setTimeout(function(){ hsoVe(); var o = document.querySelector('.hsn-tim'); if(o){ o.focus(); o.setSelectionRange(o.value.length, o.value.length); } }, 400); },
    xem:function(el){ HSO.vay.kh = el.getAttribute('data-kh'); HSO.vay.ku = el.getAttribute('data-ku') || ''; hsoVe(); },
    hai:function(el){ if(el.getAttribute('data-mk')==='bblv') D.cauHinh.bblvHaiMat = el.checked ? 1 : 0; else D.cauHinh.ktHaiMat = el.checked ? 1 : 0; luu(); if(typeof hsoHen==='function') hsoHen(); }};   /* 3.480: BBLV công tắc riêng */   /* 3.461.1: dùng chung công tắc In 2 mặt của bộ in (KTGS) */
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
    var toTr = null, nhomTo = function(h){ if(!h.to || h.to===toTr) return ''; toTr = h.to; var n = hien.filter(function(z){ return z.to===h.to; }).length;   /* 3.486: dòng nhóm theo tổ (phạm vi nhiều tổ) */
      return '<tr class="hsn-nhom-to"><td colspan="9">'+e(h.to.ten || h.to.ma)+(h.to.tenThon ? ' · '+e(h.to.tenThon) : '')+' — '+n+' hộ</td></tr>'; };
    var dong = hien.map(function(h, sh){ return nhomTo(h)+h.mon.map(function(x, i){ var m = x.m, ct = typeof ctNgan==='function' ? ctNgan(m.ct, m) : (m.ct||''), co = !!s[m.ku];
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
        '<label class="hsn-hai"><input type="checkbox" data-lenh="hsn.hai" data-su="change"'+a+(X.haiMat(mk) ? ' checked' : '')+'> In 2 mặt</label></div>'+
      (ds.length ? '<div class="hsn-hop"><table class="hsn-bang"><thead><tr><th class="hsn-o">☑</th><th class="hsn-stt">STT</th><th>Hộ</th><th>Mã KH</th><th class="hsn-ku">Số KU</th><th>CT</th><th class="s">Dư nợ</th><th class="s">Lãi tồn</th><th>Tình trạng</th></tr></thead><tbody>'+
          (dong || '<tr><td colspan="9" class="hsn-rong">Không có món nào khớp lọc'+(L.vd ? ' — bấm "Chỉ món có vấn đề" để hiện hết' : '')+'.</td></tr>')+'</tbody></table></div>'+
          '<div class="hsn-chan">Hiện <b>'+soHien+'</b>/'+tong+' món · máy in 1 mặt: bỏ tích "In 2 mặt" (không chèn trang trắng)</div>'
        : '<div class="sl-phu">Tổ không có hộ còn nợ ở kỳ số liệu đang mở.</div>')+'</div>'; };
  /* 3.462: cột trái chung của mẫu dùng bảng chọn món (06A, BBLV) — gọi từ hsoMauGan(…trai) */
  /* 3.484: đang in nhiều tổ → khung tóm tắt từng tổ (hộ · món đã tích) thay bảng chọn 1 tổ; "Về từng tổ" bỏ chế độ này */
  X.nhieuHTML = function(mk){ var N = HSO.nhieu, e = coChuHTML, tong = {ho:0, mon:0};
    var dong = N.ds.map(function(m){ var t = KHO.to(m), d = t ? X.dem(mk, t) : {ho:0, mon:0}; tong.ho += d.ho; tong.mon += d.mon;
      return '<tr><td>'+e(t ? t.ten : m)+'</td><td class="s">'+d.ho+'</td><td class="s">'+d.mon+'</td></tr>'; }).join('');
    return '<div class="hsn-nhieu"><div><b>🖨 In 1 lần: '+e(N.ten)+'</b> — '+N.ds.length+' tổ · <b>'+tong.ho+'</b> hộ · '+tong.mon+' món '+
      '<button class="nho" data-lenh="hsn.boNhieu">↩ Về từng tổ</button></div><div class="hsn-hop"><table class="hsn-bang"><thead><tr><th>Tổ</th><th>Hộ</th><th>Món</th></tr></thead><tbody>'+dong+'</tbody></table></div>'+
      '<label class="hsn-hai"><input type="checkbox" data-lenh="hsn.hai" data-su="change" data-mk="'+mk+'"'+(X.haiMat(mk) ? ' checked' : '')+'> In 2 mặt</label></div>'; };
  X.trai = function(t, mk, op, ghi){ if(!t){ var pv = X.pvTo(); if(pv && pv.length) t = pv; }   /* 3.486: chưa chọn tổ → cả phạm vi (Hội…) */
    if(HSO.nhieu && HSO.nhieu.ds.length>1){ if(!X.bang.dk && typeof GD!=='undefined'){ X.bang.dk = 1; GD.dangKy('hsn', LENH); } return X.nhieuHTML(mk); }
    return X.bang(t, mk, op)+'<div class="hso-cham"><small>'+ghi+'</small></div>'+(typeof omCo==='function' && omCo(mk) ? omNhanhHTML(mk) : ''); };
  return X;
})();
