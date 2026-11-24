/* ===== 3.563 (anh 22/11/2026: "làm thêm chức năng nợ quá hạn đã chuyển trong tháng, ngày chuyển" — đồng ý 4 điểm): 📉 NỢ CHUYỂN QUÁ HẠN TRONG THÁNG =====
   Tab 📑 Sao kê › nhóm Nợ cần xử lý. Tính từ Mẫu 31 (nguồn tính duy nhất — PHOI_HOP_CHUNG mục 3), kỳ đang chọn:
   - Món có "Chuyển QH trong tháng" > 0 (số hệ thống, cộng từ đầu tháng tới ngày số liệu) — kể cả món đã thu hết (ghi "Đã thu hết").
   - Ngày chuyển QH = "Ngày CNQH gần nhất" (anh đồng ý). Số ngày QH tính tới ngày số liệu.
   - "Mới": chuyển QH SAU ngày của Mẫu 31 nạp liền trước trong cùng tháng (chỉ đọc danh mục kho, không nạp thêm kỳ).
   - Cột Nguyên nhân để trống — ghi tay khi in. Đầu trang: tóm tắt theo Xã › Hội (số món, số tiền chuyển, QH còn).
   Không ghi dữ liệu. Khuôn chung SK_BC + skBang. Cắm rút: bỏ dòng <script> là báo cáo biến mất. ES5. */
var CQH = (function(){
  var M = {TEN:'Nợ chuyển quá hạn trong tháng (ngày chuyển · đã thu · mới so lần nạp trước)'};
  M.ngayTruoc = function(ngay){   /* ngày Mẫu 31 nạp liền trước trong cùng tháng ('' nếu không có) */
    var th = String(ngay||'').slice(0, 7), t = '';
    KHO.dsBang('hstd').forEach(function(e){ var n = e.ngay || ''; if(n.slice(0, 7)===th && n<ngay && n>t) t = n; });
    return t;
  };
  M.ds = function(rows, ngay){   /* rows = dòng Mẫu 31 (đã lọc phạm vi) → món chuyển QH trong tháng */
    var da = {}, truoc = M.ngayTruoc(ngay), kq = [];
    rows.forEach(function(o){ if(!o.ku || da[o.ku] || !((o.cqh||0)>0)) return; da[o.ku] = 1;
      var n = tdnNgay(o.c_ngay_cnqh_gan_nhat) || '', con = o.qh||0;
      kq.push({o:o, ku:o.ku, cqh:o.cqh, ncqh:n, con:con, moi:!!(truoc && n && n>truoc),
        ghi:con<=0 ? 'Đã thu hết' : (con<o.cqh ? 'Đã thu '+tdnTien(o.cqh-con) : '')}); });
    kq.sort(function(a, b){ return (a.ncqh||'9')<(b.ncqh||'9') ? -1 : (a.ncqh===b.ncqh ? 0 : 1); });
    return {ds:kq, truoc:truoc};
  };
  M.tom = function(ds){   /* Xã › Hội: số món, tiền chuyển, QH còn */
    var T = SK_K.to || {}, X = {}, thu = [];
    ds.forEach(function(d){ var t = T[toMaCua(d.o)] || {}, xa = t.tenXa || '(chưa rõ xã)', hoi = typeof ttHoiTen==='function' ? ttHoiTen(t.dv) : String(t.dv||'');
      var x = X[xa]; if(!x){ x = X[xa] = {H:{}, thu:[], n:0, c:0, q:0}; thu.push(xa); }
      var h = x.H[hoi]; if(!h){ h = x.H[hoi] = {n:0, c:0, q:0}; x.thu.push(hoi); }
      [x, h].forEach(function(g){ g.n++; g.c += d.cqh; g.q += d.con; }); });
    thu.sort(function(a, b){ return a.localeCompare(b, 'vi'); });
    var r = [], h = '<table class="bc-bang"><thead><tr><th>Xã / Hội</th><th>Số món</th><th>Số tiền chuyển QH</th><th>Dư nợ QH còn</th></tr></thead><tbody>';
    thu.forEach(function(xa){ var x = X[xa]; r.push([xa, x.n, x.c, x.q]);
      h += '<tr class="nhom"><td><b>'+coChuHTML(xa)+'</b></td><td class="s"><b>'+x.n+'</b></td><td class="s"><b>'+tdnTien(x.c)+'</b></td><td class="s"><b>'+tdnTien(x.q)+'</b></td></tr>';
      x.thu.forEach(function(hoi){ var g = x.H[hoi]; r.push(['   '+hoi, g.n, g.c, g.q]);
        h += '<tr><td>&nbsp;&nbsp;'+coChuHTML(hoi)+'</td><td class="s">'+g.n+'</td><td class="s">'+tdnTien(g.c)+'</td><td class="s">'+tdnTien(g.q)+'</td></tr>'; }); });
    return {html:h+'</tbody></table>', aoa:[['Xã / Hội', 'Số món', 'Số tiền chuyển QH', 'Dư nợ QH còn']].concat(r)};
  };
  M.lap = function(){
    var N = skNen31('cqh'); if(N.can) return N.can;
    var ng = N.e31 ? N.e31.ngay : '', R = M.ds(N.rows, ng), ds = R.ds;
    var cot = ['STT', 'Mã KH', 'Họ tên', 'Số KU', 'Chương trình', 'Số tiền chuyển QH', 'Ngày chuyển QH', 'Số ngày QH', 'Dư nợ QH còn', 'Ghi chú', 'Nguyên nhân'];
    var r = skBang(cot, ds, function(d, i){ return [i, d.o.kh||'', d.o.ten||'', d.ku, ctNgan(d.o.ct, d.o), d.cqh, ngayVNsl(d.ncqh), d.ncqh && d.con>0 ? tdnSoNgay(d.ncqh, ng) : '',
      d.con, (d.moi ? 'Mới · ' : '')+d.ghi, '']; }, [5, 8], function(d){ return d.moi ? 'nb' : ''; });
    var c = 0, q = 0, moi = 0, het = 0; ds.forEach(function(d){ c += d.cqh; q += d.con; if(d.moi) moi++; if(d.con<=0) het++; });
    var tom = ds.length ? M.tom(ds) : {html:'', aoa:[]};
    var dau = '<div class="bc-tom">'+ds.length+' món chuyển QH trong tháng · số tiền <b>'+tdnTien(c)+'</b> · còn QH <b>'+tdnTien(q)+'</b>'+(het ? ' · '+het+' món đã thu hết' : '')+
      (R.truoc ? ' · <b>'+moi+' món mới</b> sau lần nạp ngày '+ngayVNsl(R.truoc)+' (tô nền)' : '')+'</div>';
    return {ten:'Chuyen QH trong thang', tieuDe:'DANH SÁCH NỢ CHUYỂN QUÁ HẠN TRONG THÁNG', ngay:N.ngay,
      html:dau+tom.html+r.html, aoa:tom.aoa.concat([[]]).concat(r.aoa)};
  };
  if(typeof SK_BC!=='undefined') SK_BC.push({k:'cqh', ten:M.TEN, nhom:'xl', kho:'doc', lap:function(){ return M.lap(); }});
  return M;
})();
