/* ===== 3.565 (anh 24/11/2026: "liên kết bên giao ban cập nhật phần mẫu 10C mới scan kế bên cột CCCD trong tab Tra cứu KH" — ảnh: bảng tổ Tra cứu KH;
   "1 tổ có thể lưu nhiều bản 10C mới để lựa chọn khi dùng"): 📄 10C MỚI CỦA TỔ =====
   - NGUỒN: file giao ban "Danh_sach_kiem_tra_10C_da_scan.xlsx" (DANH SÁCH KIỂM TRA MẪU 10C ĐÃ SCAN) — anh nạp ở ⋯ Nạp & KT (nhóm Ⓓ), loại `ds10c`, tên chuẩn DS10C_<ngày cập nhật>.
     Dùng BẢN MỚI NHẤT đã nạp (không theo kỳ số liệu). Ghép theo MÃ TỔ 7 số (giao ban nhận file scan theo mã này). Cột "File 10C mới" nhiều file cách ";" → nhiều bản.
   - Tra cứu KH › bảng tổ: cột "10C mới" sau CCCD — Đã scan / Thiếu (lọc như cột CCCD), dòng Cộng = số tổ đã scan / tổng; bấm ô → chọn bản → mở trên Drive (tìm đúng tên file).
   - 🖨 In DS tổ (js/58b) thêm cột khi đã nạp. Ma trận món chuẩn (js/98): trường "10C mới (tổ)".
   - Chưa nạp file → không có cột, mọi thứ như cũ. Không thêm quyền Drive. Cắm rút: bỏ dòng <script>. ES5. */
var M10C = (function(){
  var M = {ds:null, ky:'', dang:null};
  /* 1. loại file nạp (nhận theo nội dung: có cột Mã tổ + "10C mới đã scan") */
  if(typeof SL_TRUONG!=='undefined'){ SL_TRUONG.c10m = {a:['10c moi da scan']}; SL_TRUONG.f10m = {a:['file 10c moi']}; SL_TRUONG.c10c = {a:['10c cu da scan']}; SL_TRUONG.sx70 = {a:['sap xep qd 70']}; }
  if(typeof SL_LOAI!=='undefined' && !SL_LOAI.some(function(L){ return L.k==='ds10c'; }))
    SL_LOAI.push({k:'ds10c', nhom:'D', tuy:true, tuyMoi:true, ten:'DS kiểm tra 10C đã scan (giao ban)', can:['ma to', '10c moi da scan'], mot:['file 10c moi'], khoa:'to', tenFile:['10c da scan', 'kiem tra 10c']});
  if(typeof SL_MA!=='undefined') SL_MA.ds10c = 'DS10C';
  /* ngày = dòng "Cập nhật: dd/mm/yyyy" — file giao ban ghi ở sheet Tổng hợp, danh sách ở sheet khác → tìm trên mọi sheet (chỉ loại ds10c) */
  M.ngayCapNhat = function(sheets){ var d = '';
    (sheets||[]).some(function(sh){ return (sh.rows||[]).slice(0, 8).some(function(r){ var m = /c[aậ]p nh[aậ]t\s*:?\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/i.exec((r||[]).join(' ')); if(m) d = m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]); return !!d; }); });
    return d; };
  if(typeof slPhanTich==='function'){ var phan = slPhanTich; slPhanTich = function(kq){ var r = phan.apply(this, arguments);
      if(r && r.loai==='ds10c' && !r.loi && !r.ky){ var d = M.ngayCapNhat(r.sheets); if(d){ r.ngay = d; r.ky = slKyTu(slLoai('ds10c'), d); r.nguonKy = 'tiêu đề trong file'; r.canKhai = false; } }
      return r; }; }
  /* 2. dữ liệu: bản mới nhất → {mã tổ: {f:[file…], co, sx, ten}} */
  M.tach = function(s){ return String(s||'').split(/\s*;\s*/).map(function(x){ return x.trim(); }).filter(function(x){ return /\.pdf$/i.test(x); }); };
  M.moiNhat = function(){ var ds = KHO.dsBang('ds10c'); if(!ds.length) return null;
    return ds.slice().sort(function(a, b){ var x = a.ngay || a.ky, y = b.ngay || b.ky; return x<y ? -1 : (x>y ? 1 : 0); }).pop(); };
  M.co = function(){ return typeof KHO!=='undefined' && !!M.moiNhat(); };
  M.dung = function(rows){ var m = {};
    (rows||[]).forEach(function(o){ var ma = String(o.to||'').trim(); if(!/^\d{7}$/.test(ma)) return;
      var f = M.tach(o.f10m), c = /^c[oó]/i.test(String(o.c10m||'').trim()) || f.length>0;
      m[ma] = {ma:ma, f:f, co:c, sx:String(o.sx70||'').trim()}; });
    return m; };
  M.nap = function(){ var e = M.moiNhat(); if(!e) return Promise.resolve(null);
    if(M.ds && M.ky===e.ky) return Promise.resolve(M.ds); if(M.dang) return M.dang;
    return M.dang = KHO.docBang('ds10c', e.ky).then(function(b){ M.ds = M.dung(b ? slMoBang(b) : []); M.ky = e.ky; M.dang = null; return M.ds; }, function(){ M.dang = null; return null; }); };
  M.cua = function(ma){ return M.ds ? M.ds[String(ma||'')] || null : null; };
  M.ngay = function(){ var e = M.moiNhat(); return e ? ngayVNsl(e.ngay || e.ky) : ''; };
  /* 3. bảng tổ Tra cứu KH (js/58 gọi) */
  M.th = function(){ return '<th title="Biên bản 10C mới (QĐ 70) đã scan — theo DS kiểm tra 10C của giao ban, cập nhật '+coChuHTML(M.ngay())+'. Bấm ô để chọn bản mở">10C mới</th>'; };
  M.td = function(ma){
    if(!M.ds){ M.nap().then(function(d){ if(d && typeof slTraTim==='function' && document.querySelector('.tc-to-ds')) slTraTim(); }); return '<td class="c">…</td>'; }
    var x = M.cua(ma), n = x && x.co ? Math.max(1, x.f.length) : 0, tit = !x ? 'Tổ không có trong DS kiểm tra 10C' : (x.f.length ? x.f.join(' · ') : (x.co ? 'Đã scan (chưa ghi tên file)' : 'Chưa scan 10C mới'))+(x && x.sx ? ' · Sắp xếp QĐ 70: '+x.sx : '');
    return '<td class="c" title="'+coChuHTML(tit)+'">'+(n ? '<span class="xanh" data-lenh="m10c.mo" data-a1="'+coChuHTML(ma)+'">Đã scan'+(n>1 ? ' <small>('+n+' bản)</small>' : '')+'</span>' : '<b class="do">Thiếu</b>')+'</td>'; };
  M.dem = function(ds){ return ds.filter(function(t){ var x = M.cua(t.ma); return x && x.co; }).length; };
  M.tdTong = function(ds){ return '<td class="c" title="Số tổ đã scan 10C mới / tổng (theo lọc)">'+(M.ds ? M.dem(ds) : '…')+'/'+ds.length+'</td>'; };
  M.url = function(f){ return 'https://drive.google.com/drive/search?q='+encodeURIComponent('"'+f+'"'); };
  M.mo = function(ma){ var x = M.cua(ma); if(!x) return;
    if(!x.f.length) return bao('Tổ '+ma+' đã scan 10C mới nhưng DS giao ban chưa ghi tên file.', 4);
    if(x.f.length===1) return window.open(M.url(x.f[0]), '_blank', 'noopener');
    moHop('<div class="hop-tit">10C mới — tổ '+coChuHTML(ma)+' · '+x.f.length+' bản</div><div class="hop-phu">Chọn bản cần mở (mở trên Drive, tab mới).</div>'+
      x.f.map(function(f, i){ return '<p><a class="lk" href="'+coChuHTML(M.url(f))+'" target="_blank" rel="noopener">📄 Bản '+(i+1)+' · '+coChuHTML(f)+'</a></p>'; }).join('')+
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button></div>'); };
  if(typeof gdDangKy==='function') gdDangKy('m10c', {mo:function(el){ M.mo(gdA(el, 1)); }});
  /* 4. ma trận món chuẩn (js/98) */
  if(typeof MCH!=='undefined'){ var f = {k:'mc_10c', ten:'10C mới (tổ)', nguon:'DS kiểm tra 10C (giao ban)', khoa:'Mã tổ', gop:['mon', 'kh', 'to'],
      lay:function(c, x){ var ma = x.mato || toMaCua(x._o || ((kcKU(c.K, x.ku) || {}).dong) || ((kcKH(c.K, x.kh) || {}).dong || [])[0] || {}); var y = M.cua(ma); return !M.ds ? '' : (y && y.co ? 'Đã scan'+(y.f.length>1 ? ' ('+y.f.length+' bản)' : '') : (y ? 'Thiếu' : '')); }};
    MCH.TRUONG.push(f); if(typeof BT_COT!=='undefined') f.gop.forEach(function(g){ if(BT_COT[g]) BT_COT[g].push({k:f.k, ten:f.ten, nguon:f.nguon}); }); }
  return M;
})();
