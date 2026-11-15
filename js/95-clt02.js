/* ===== 3.549 C5 (hộp thư TK 1 02/11 — anh 15/11 "code cả 2 và gộp" · "CLT sẽ nạp theo xã và 2 loại tháng và định kỳ"): NẠP CLT02 — XẾP LOẠI TỔ =====
   File hệ thống "Mẫu số 02/CLT" (sheet CLT02_VB3986) xuất RIÊNG TỪNG XÃ, mỗi xã 2 loại: THÁNG (dòng kỳ "Tháng MM/YYYY") · ĐỊNH KỲ (dòng kỳ "Từ … đến …").
   Nhận dạng theo NỘI DUNG (tên file anh đặt không đáng tin): tên sheet / ô "Mẫu số 02/CLT", dòng "… TẠI XÃ/PHƯỜNG <tên xã>", dòng kỳ; ngày số liệu = ngày cuối của kỳ.
   Mỗi xã × loại = 1 ô nạp riêng (loại cltT_<MÃ XÃ> / cltDK_<MÃ XÃ>, nhóm Ⓓ Phụ) — dùng lại trọn luồng nạp: lưu, thay file → 🗑, tên chuẩn CLT02T_<MÃ>_<ngày> / CLT02DK_<MÃ>_<ngày>.
     (MÃ XÃ = tên xã bỏ dấu, viết liền — không cần Mẫu 31 để tra mã.) Ô xuất hiện ở ma trận khi nạp file đầu tiên của xã đó.
   Dòng: Hội (I–IV) → tổ: STT · tên tổ trưởng · xếp loại Tốt / Khá / TB / Yếu · tổng điểm · 5 tiêu chí (tham gia GD 20 · thu nợ gốc 15 · thu lãi 20 · tiền gửi · nợ quá hạn 30).
   Không có mã tổ → ghép với tổ app theo xã + Hội + tên tổ trưởng (so không dấu); không ghép được thì BÁO, không đoán.
   Hiện: thẻ tổ (tab Tổ) thêm "CLT02 tháng: Tốt 81,42 · định kỳ: Khá". Chưa đưa vào văn bản (văn bản là việc Giao ban). Chỉ đọc XLSX (PDF tháng cũ để sau).
   Cắm rút: bỏ dòng <script> là như cũ (ô CLT02 đã nạp vẫn còn trong kho, không hiện). ES5. */
var CLT = (function(){
  var M = {XL:['Tốt', 'Khá', 'TB', 'Yếu'], TC:['Tham gia GD', 'Thu nợ gốc', 'Thu lãi', 'Tiền gửi', 'Nợ quá hạn']};
  M.chuan = function(s){ return boDau(String(s==null ? '' : s)).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); };
  M.ma = function(tenXa){ return M.chuan(tenXa).replace(/^(xa|phuong|thi tran)\s+/, '').replace(/\s+/g, '').toUpperCase(); };
  M.tenDep = function(s){ s = String(s||'').trim().replace(/\s+/g, ' '); return s.toLowerCase().replace(/(^|\s)(\S)/g, function(m, a, b){ return a+b.toUpperCase(); }); };
  M.hoiK = function(s){ var c = M.chuan(s); return /nong dan/.test(c) ? 'ND' : /phu nu/.test(c) ? 'PN' : /cuu chien binh/.test(c) ? 'CCB' : /thanh nien/.test(c) ? 'TN' : c; };
  M.so = function(v){ if(typeof v==='number') return v; var s = String(v==null ? '' : v).trim(); if(!s || s==='-') return 0; s = s.replace(/\./g, '').replace(',', '.'); var n = parseFloat(s); return isNaN(n) ? 0 : n; };
  M.cuoiThang = function(m, y){ var d = new Date(+y, +m, 0); return y+'-'+('0'+m).slice(-2)+'-'+('0'+d.getDate()).slice(-2); };
  M.iso = function(dmy){ var p = String(dmy).split('/'); return p[2]+'-'+('0'+p[1]).slice(-2)+'-'+('0'+p[0]).slice(-2); };
  /* ---- loại động: cltT_<MÃ> / cltDK_<MÃ> ---- */
  M.laLoai = function(k){ return /^cl[t](T|DK)_[A-Z0-9]+$/.test(String(k||'')); };
  M.dangKy = function(k, tenXa){
    if(!M.laLoai(k) || SL_LOAI.some(function(L){ return L.k===k; })) return;
    var m = /^cl[t](T|DK)_(.+)$/.exec(k);
    SL_LOAI.push({k:k, nhom:'D', tuy:true, rieng:true, clt:m[1], xa:tenXa || m[2], ten:'CLT02 '+(m[1]==='T' ? 'tháng' : 'định kỳ')+' · '+(tenXa || m[2]), can:[], tenFile:[]});
    SL_MA[k] = 'CLT02'+m[1]+'_'+m[2];
  };
  M.dongBo = function(){ KHO.dsBang().forEach(function(e){ if(e && M.laLoai(e.loai)) M.dangKy(e.loai, e.tong && e.tong.xa); }); };
  /* ---- đọc file ---- */
  M.doc = function(sheets){
    for(var s = 0; s < (sheets||[]).length; s++){
      var sh = sheets[s], a = sh.rows || [], dau = a.slice(0, 6), chu = dau.map(function(r){ return (r||[]).join(' '); }).join(' ');
      if(!(/CLT02/i.test(sh.ten||'') || /m[aẫ]u s[oố] 02\s*\/\s*clt/i.test(chu))) continue;
      var mx = /t[aạ]i\s+x[aã]\s*\/\s*ph[uư][oờ]ng\s+(.+)$/i.exec(dau.map(function(r){ return (r||[]).filter(function(x){ return /t[aạ]i\s+x[aã]/i.test(String(x||'')); }).join(' '); }).join(' ').trim());
      var tenXa = mx ? M.tenDep(mx[1]) : '', loai = '', ngay = '', tu = '';
      dau.forEach(function(r){ (r||[]).forEach(function(x){ var t = String(x||'').trim(), m;
        if((m = /^th[aá]ng\s+(\d{1,2})\s*\/\s*(\d{4})/i.exec(t))){ loai = 'T'; ngay = M.cuoiThang(m[1], m[2]); }
        else if((m = /t[uừ]\s+(\d{1,2}\/\d{1,2}\/\d{4})\s+[dđ][eế]n\s+(\d{1,2}\/\d{1,2}\/\d{4})/i.exec(t))){ loai = 'DK'; tu = M.iso(m[1]); ngay = M.iso(m[2]); } }); });
      if(!tenXa || !loai){ M.dangKy('cltT_X', '?'); return {k:'cltT_X', loi:'File CLT02 nhưng không đọc được '+(!tenXa ? 'tên xã (dòng "TẠI XÃ/PHƯỜNG …")' : 'dòng kỳ (Tháng MM/YYYY hoặc Từ … đến …)'), rows:[], sheet:sh.ten, hang:1}; }
      /* dòng đánh số cột 1…16 → vị trí cột */
      var hs = -1, C = {};
      for(var r = 0; r < Math.min(15, a.length); r++){ var row = a[r]||[], vt = {}; row.forEach(function(x, i){ var t = String(x==null ? '' : x).trim(); if(/^\d{1,2}$/.test(t) && vt[t]===undefined) vt[t] = i; });
        if(vt['1']!==undefined && vt['2']!==undefined && vt['7']!==undefined && vt['12']!==undefined){ hs = r; C = vt; break; } }
      if(hs<0){ M.dangKy('clt'+loai+'_'+M.ma(tenXa), tenXa); return {k:'clt'+loai+'_'+M.ma(tenXa), loi:'File CLT02 nhưng không thấy dòng đánh số cột (1 … 16).', rows:[], sheet:sh.ten, hang:1, xa:tenXa}; }
      var rows = [], hoi = '';
      for(var i = hs+1; i < a.length; i++){ var d = a[i]||[], c0 = String(d[C['1']]==null ? '' : d[C['1']]).trim(), ten = String(d[C['2']]==null ? '' : d[C['2']]).trim();
        if(/t[oổ]ng c[oộ]ng/i.test(ten) || /t[oổ]ng c[oộ]ng/i.test(c0)) break;
        if(/^[IVX]+$/.test(c0)){ hoi = ten; continue; }
        if(!/^\d+$/.test(c0) || !ten) continue;
        var xl = ''; ['3', '4', '5', '6'].forEach(function(n, j){ if(/x/i.test(String(d[C[n]]||''))) xl = M.XL[j]; });
        rows.push({hoi:hoi, hoiK:M.hoiK(hoi), stt:+c0, ten:ten, xl:xl, diem:M.so(d[C['7']]), tc1:M.so(d[C['8']]), tc2:M.so(d[C['9']]), tc3:M.so(d[C['10']]), tc4:M.so(d[C['11']]), tc5:M.so(d[C['12']])}); }
      var k = 'clt'+loai+'_'+M.ma(tenXa); M.dangKy(k, tenXa);
      return {k:k, rows:rows, ngay:ngay, sheet:sh.ten, hang:hs+1, xa:tenXa, loaiKy:loai, tu:tu};
    }
    return null;
  };
  /* ---- ghép tổ app ---- */
  M.ghep = function(t, rows){ if(!t || !rows) return null; var h = M.hoiK(typeof tdnHoi==='function' ? tdnHoi(t.dv) : ''), n = M.chuan(t.ten);
    var ds = rows.filter(function(o){ return M.chuan(o.ten)===n && (!h || !o.hoiK || o.hoiK===h); }); return ds.length===1 ? ds[0] : null; };
  M.cua = function(t, B){   /* → {T:dòng, DK:dòng} của tổ t trong bộ kỳ B */
    if(!t || !B || !t.tenXa) return null; var ma = M.ma(t.tenXa), r = {};
    ['T', 'DK'].forEach(function(l){ var rows = typeof kcBang==='function' ? kcBang(B, 'clt'+l+'_'+ma) : null; var o = M.ghep(t, rows); if(o) r[l] = o; });
    return (r.T || r.DK) ? r : null;
  };
  M.khongGhep = function(rows, tenXa, K){   /* dòng file không ghép được tổ app nào cùng xã (kỳ K đang dựng) */
    if(!K || !K.to) return null; var ma = M.ma(tenXa), ds = Object.keys(K.to).map(function(k){ return K.to[k]; }).filter(function(t){ return t && !t.trucTiep && t.tenXa && M.ma(t.tenXa)===ma; });
    if(!ds.length) return null;
    return rows.filter(function(o){ return !ds.some(function(t){ return M.ghep(t, [o]); }); });
  };
  M.chip = function(r){ if(!r) return ''; var f = function(o){ return o.xl+(o.diem ? ' '+String(o.diem.toFixed(2)).replace('.', ',') : ''); };
    return ' <span class="to-clt" title="CLT02 — xếp loại tổ của hệ thống (Mẫu số 02/CLT)">CLT02'+(r.T ? ' tháng: <b>'+coChuHTML(f(r.T))+'</b>' : '')+(r.DK ? (r.T ? ' ·' : '')+' định kỳ: <b>'+coChuHTML(f(r.DK))+'</b>' : '')+'</span>'; };
  /* ---- gắn vào luồng nạp ---- */
  if(typeof slDocRieng==='function'){ var cuDoc = slDocRieng; slDocRieng = function(sheets){ return M.doc(sheets) || cuDoc.apply(this, arguments); }; }
  if(typeof slPhanTichRieng==='function'){ var cuPT = slPhanTichRieng; slPhanTichRieng = function(kq, x){
    if(!x || !M.laLoai(x.k)) return cuPT.apply(this, arguments);
    if(x.loi){ kq.loi = x.loi; return kq; }
    cuPT.apply(this, arguments); if(kq.loi) return kq;
    var dem = {}; M.XL.forEach(function(l){ dem[l] = 0; }); x.rows.forEach(function(o){ if(dem[o.xl]!==undefined) dem[o.xl]++; });
    kq.nguonKy = 'dòng kỳ trong file'; kq.tong = {n:x.rows.length, rieng:1, xa:x.xa, loaiKy:x.loaiKy, tu:x.tu, xl:dem};
    var kg = M.khongGhep(x.rows, x.xa, KHO.kyDung());
    if(kg && kg.length) kq.canhBao.push(kg.length+' tổ trong file chưa ghép được với tổ app cùng xã (theo Hội + tên tổ trưởng) — '+kg.slice(0, 5).map(function(o){ return o.ten+' ('+(o.hoi||'?')+')'; }).join(', ')+(kg.length>5 ? '…' : '')+'. Không đoán — thẻ tổ đó sẽ không hiện xếp loại.');
    return kq; }; }
  if(typeof slTomRieng==='function'){ var cuTom = slTomRieng; slTomRieng = function(loai, t){ if(!M.laLoai(loai)) return cuTom.apply(this, arguments);
    var x = (t && t.xl) || {}; return (t.n||0)+' tổ · Tốt '+(x['Tốt']||0)+' · Khá '+(x['Khá']||0)+' · TB '+(x.TB||0)+' · Yếu '+(x['Yếu']||0); }; }
  if(typeof slBo0==='function'){ var cuBo = slBo0; slBo0 = function(){ M.dongBo(); return cuBo.apply(this, arguments); }; }
  if(typeof veSoLieu==='function'){ var cuVe = veSoLieu; veSoLieu = function(){ M.dongBo(); return cuVe.apply(this, arguments); }; }
  if(typeof toTheHTML==='function'){ var cuThe = toTheHTML; toTheHTML = function(t, tv){ var h = cuThe.apply(this, arguments);
    try{ var Kd = KHO.kyDung(), c = M.chip(M.cua(t, Kd ? Kd.B : null)); if(c) h = h.replace('<div class="to-the-so">', c+'<div class="to-the-so">'); }catch(e){} return h; }; }
  return M;
})();
