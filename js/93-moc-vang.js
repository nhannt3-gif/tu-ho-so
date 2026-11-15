/* ===== 3.546 A1 (docs/DANH_GIA_CHUYEN_GIA_1511.md đợt 1 — anh 15/11 "code cả 2"): 🧪 KIỂM MỐC VÀNG =====
   Mốc vàng = file đối chiếu của app ĐÃ KHỚP giao ban trên số thật (anh 15/11: chỉ giữ mốc cuối tháng 10). Đáp án nằm trên Drive của anh
   (<thư mục app>/Mốc vàng/VANG_DOI_CHIEU_APP_<ngày>.csv + VANG_DOI_CHIEU_MON_APP_<ngày>.csv) — KHÔNG vào repo (dữ liệu thật).
   Bấm 🧪 → bản app đang chạy tính lại File 1 (tổ) + File 2 (món) đúng ngày mốc từ kho → so từng ô với đáp án → ✅ khớp / ❌ N chỗ lệch (bảng tổ / món · cột · vàng · nay).
   Chưa nối Drive → chọn 2 file đáp án trên máy. Chỉ đọc: không ghi kho, không ghi Drive. Dòng "#" (bản, giờ xuất) bỏ qua khi so.
   Cắm rút: bỏ dòng <script> là mất nút 🧪. ES5. */
var MVG = (function(){
  var M = {kq:null, THU:'Mốc vàng'};
  /* CSV đối chiếu → {cot, ds:{khóa: {cột: giá trị}}, n}; khóa File 1 = 'khoa', File 2 = 'so_ku' */
  M.doc = function(chu, khoa){
    var L = String(chu||'').replace(/^﻿/, '').split(/\r?\n/), dau = null, ds = {}, n = 0;
    L.forEach(function(l){ if(!l.trim() || /^\s*#/.test(l)) return; var c = M.tach(l);
      if(!dau){ dau = c; return; } var o = {}; dau.forEach(function(k, i){ o[k] = c[i]===undefined ? '' : c[i]; }); var k = o[khoa]; if(k){ ds[k] = o; n++; } });
    return dau && dau.indexOf(khoa)>=0 ? {cot:dau, ds:ds, n:n} : null;
  };
  M.tach = function(l){ var r = [], o = '', q = false, i, ch;   /* tách 1 dòng CSV, có ngoặc kép */
    for(i=0; i<l.length; i++){ ch = l.charAt(i);
      if(q){ if(ch==='"'){ if(l.charAt(i+1)==='"'){ o += '"'; i++; } else q = false; } else o += ch; }
      else if(ch==='"') q = true; else if(ch===','){ r.push(o.trim()); o = ''; } else o += ch; }
    r.push(o.trim()); return r; };
  /* so 2 bảng → {n, lech:[{bang, khoa, cot, vang, nay}], thieu, thua} */
  M.so = function(bang, vang, nay){
    var lech = [], thieu = 0, thua = 0, cot = vang.cot.filter(function(c){ return nay.cot.indexOf(c)>=0; });
    vang.cot.forEach(function(c){ if(nay.cot.indexOf(c)<0) lech.push({bang:bang, khoa:'(cột)', cot:c, vang:'có', nay:'không có cột'}); });
    Object.keys(vang.ds).forEach(function(k){ var a = vang.ds[k], b = nay.ds[k];
      if(!b){ thieu++; lech.push({bang:bang, khoa:k, cot:'(dòng)', vang:'có', nay:'không có'}); return; }
      cot.forEach(function(c){ var x = a[c], y = b[c]; if(x===y) return; if(x!=='' && y!=='' && !isNaN(+x) && !isNaN(+y) && +x===+y) return; lech.push({bang:bang, khoa:k, cot:c, vang:x, nay:y}); }); });
    Object.keys(nay.ds).forEach(function(k){ if(!vang.ds[k]){ thua++; lech.push({bang:bang, khoa:k, cot:'(dòng)', vang:'không có', nay:'có'}); } });
    return {n:vang.n, lech:lech, thieu:thieu, thua:thua};
  };
  /* kỳ trong kho có đúng ngày mốc: kỳ ngày 'YYYY-MM-DD' trước, rồi kỳ tháng */
  M.kyCua = function(ngay){ return [ngay, ngay.slice(0, 7)].filter(function(k){ return KHO.coBang('hstd', k); }); };
  M.tinh = function(ngay){
    var ds = M.kyCua(ngay), i = 0;
    var thu = function(){ if(i>=ds.length) return Promise.resolve(null);
      return KHO.nap(ds[i++]).then(function(K){ return K && K.ngay===ngay ? K : thu(); }); };
    return thu().then(function(K){ if(!K) return null; var f1 = slDCGBTinh(K); return {K:K, f1:slDCCsv(K, f1), f2:slDCMonCsv(K, f1)}; });
  };
  /* đáp án: Drive <thư mục app>/Mốc vàng/ → [{ngay, f1 chữ, f2 chữ}] */
  M.taiDrive = function(){
    return baoDamDuong(D.cauHinh.thumuc+'/'+M.THU).then(function(id){
      var q = "'"+id+"' in parents and trashed=false and name contains 'VANG_DOI_CHIEU_'";
      return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+'&fields=files(id,name)&pageSize=50'); })
      .then(function(kq){ var f = (kq && kq.files) || [];
        return Promise.all(f.map(function(x){ return canToken().then(function(){ return fetch('https://www.googleapis.com/drive/v3/files/'+x.id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}); })
          .then(function(r){ if(!r.ok) throw new Error('Drive báo lỗi '+r.status); return r.text(); }).then(function(t){ return {ten:x.name, chu:t}; }); })); })
      .then(M.gom);
  };
  M.gom = function(tep){   /* [{ten, chu}] → [{ngay, f1, f2}] theo tên VANG_DOI_CHIEU_(MON_)APP_<ngày>.csv */
    var m = {};
    tep.forEach(function(t){ var r = /VANG[_]DOI[_]CHIEU[_](MON[_])?APP[_](\d{4}-\d{2}-\d{2})/.exec(t.ten); if(!r) return;
      var o = m[r[2]] || (m[r[2]] = {ngay:r[2], f1:'', f2:''}); o[r[1] ? 'f2' : 'f1'] = t.chu; });
    return Object.keys(m).sort().map(function(k){ return m[k]; });
  };
  M.chonMay = function(){
    return new Promise(function(ok){ var i = document.createElement('input'); i.type = 'file'; i.multiple = true; i.accept = '.csv,text/csv';
      i.onchange = function(){ var f = [].slice.call(i.files || []); Promise.all(f.map(function(x){ return new Promise(function(xong){ var r = new FileReader(); r.onload = function(){ xong({ten:x.name, chu:r.result}); }; r.readAsText(x); }); })).then(function(t){ ok(M.gom(t)); }); };
      i.click(); });
  };
  /* chạy: ds mốc → so từng mốc */
  M.chay = function(moc){
    if(!moc.length) return bao('Chưa có đáp án trong '+D.cauHinh.thumuc+'/'+M.THU+'/ trên Drive.', 6);
    batChay(true, 'Đang kiểm mốc vàng bằng bản '+APP_BAN+'…');
    var kq = [];
    return moc.reduce(function(p, m){ return p.then(function(){ return M.tinh(m.ngay).then(function(t){
        var o = {ngay:m.ngay, lech:[], n1:0, n2:0, thieuKho:!t};
        if(t){ [['tổ', m.f1, t.f1, 'khoa'], ['món', m.f2, t.f2, 'so_ku']].forEach(function(b){ if(!b[1]) return; var v = M.doc(b[1], b[3]), x = M.doc(b[2], b[3]);
          if(!v){ o.lech.push({bang:b[0], khoa:'(file)', cot:'', vang:'không đọc được', nay:''}); return; } var s = M.so(b[0], v, x); o[b[0]==='tổ' ? 'n1' : 'n2'] = s.n; o.lech = o.lech.concat(s.lech); }); }
        kq.push(o); }); }); }, Promise.resolve())
      .then(function(){ tatChay(); M.kq = kq; M.ve(); return kq; }, function(e){ tatChay(); baoLoi('Kiểm mốc vàng lỗi: '+(e && e.message || e)); });
  };
  M.mo = function(){
    if(typeof coTheNoiDrive==='function' && coTheNoiDrive() && DR.sanSang) return M.taiDrive().then(M.chay, function(e){ baoLoi('Không đọc được đáp án trên Drive: '+(e && e.message || e)); });
    return M.chonMay().then(M.chay);
  };
  M.ve = function(){   /* anh 15/11: đối chiếu đã chuẩn dần — kết quả gọn 1 dòng / mốc, chi tiết gập lại */
    var x = coChuHTML, h = '<h3>🧪 Kiểm mốc vàng · bản '+x(APP_BAN)+'</h3>';
    M.kq.forEach(function(o){
      if(o.thieuKho){ h += '<div class="sl-bao vang">Mốc '+x(ngayVNsl(o.ngay))+': máy chưa có số liệu ngày này.</div>'; return; }
      var ok = !o.lech.length;
      h += '<div class="sl-bao '+(ok ? 'xanh' : 'do')+'" data-moc="'+x(o.ngay)+'">'+(ok ? '✅ Mốc '+x(ngayVNsl(o.ngay))+': khớp' : '❌ Mốc '+x(ngayVNsl(o.ngay))+': '+o.lech.length+' chỗ lệch — báo TK 2')+'</div>';
      if(ok) return;
      var dong = o.lech.slice(0, 200).map(function(l){ return '<tr><td>'+[l.bang, l.khoa, l.cot, l.vang, l.nay].map(x).join('</td><td>')+'</td></tr>'; }).join('');
      h += '<details><summary>Xem chỗ lệch</summary><div class="cuon"><table class="tc-to-tvb"><tr><th>Bảng</th><th>Khóa</th><th>Cột</th><th>Vàng</th><th>Nay</th></tr>'+dong+'</table>'+
        (o.lech.length>200 ? '<p>… còn '+(o.lech.length-200)+' chỗ</p>' : '')+'</div></details>';
    });
    moHop(h+'<div class="hang-nut"><button class="nho" data-lenh="mvg.dong">Đóng</button></div>');
  };
  if(typeof gdDangKy==='function') gdDangKy('mvg', {mo:function(){ dongHop(); M.mo(); }, dong:function(){ dongHop(); }});
  if(typeof slDCNut==='function'){ var cu = slDCNut;   /* nút 🧪 cạnh 📤 File đối chiếu giao ban (⋯ Nạp & KT) */
    slDCNut = function(ky){ return cu.apply(this, arguments)+'<button class="nho" data-lenh="mvg.mo" title="So mốc cuối tháng 10 với đáp án đã khớp giao ban">🧪 Kiểm mốc</button>'; }; }
  return M;
})();
