/* ===== 3.564 (anh 22/11/2026: "luôn tạo ra 1 ma trận dữ liệu đa chiều lấy Mẫu 31 làm chuẩn, dữ liệu nào Mẫu 31 không có thì thu thập từ các mẫu khác
   để khi cần có thể có báo cáo được đầy đủ nhất"): 🧮 MA TRẬN MÓN CHUẨN =====
   - GỐC: mỗi món Mẫu 31 = 1 dòng (kho chuẩn js/73, không sửa số). BỔ SUNG: trường Mẫu 31 chưa đưa ra + trường từ file khác, mỗi trường ghi NGUỒN + KHÓA ghép
     (MCH.TRUONG — từ điển; docs/TU_DIEN_TRUONG.md). Nguồn chưa nạp → ô trống, không đoán.
   - 🧩 Báo cáo của tôi (js/63): thêm các trường vào danh mục cột (từng món / từng khách / từng tổ) — anh tự lập báo cáo, không sửa code.
   - Sao kê › Khách hàng: "Bảng món chuẩn" — mọi món trong phạm vi, đủ chiều + chỉ tiêu + trường bổ sung; dòng 2 bản Excel ghi nguồn từng cột.
   Thêm nguồn mới = thêm 1 dòng vào MCH.TRUONG. Chỉ đọc. Cắm rút: bỏ dòng <script> là mất cột / báo cáo mới, phần khác không đổi. ES5. */
var MCH = (function(){
  var M = {};
  /* bộ đệm theo bộ kỳ B: tiền gửi 105 theo khách (mỗi sổ 1 lần — QT-C-01) */
  M.t105 = function(B){ if(!B) return {}; if(B._t105KH) return B._t105KH;
    var g = {}, gap = {}, ds = (B.hsGoc || kcGoc(B) || []).concat((B.lap||[]).filter(function(o){ return !o._huy; }));
    ds.forEach(function(o){ var k = String(o.stk==null ? '' : o.stk).trim(); if(!o.kh || !k || gap[k]) return; gap[k] = 1; g[o.kh] = (g[o.kh]||0)+(+o.t105||0); });
    Object.defineProperty(B, '_t105KH', {value:g, configurable:true}); return g; };
  M.clt = function(K, ma, l){ var t = K && KHO.toKy(K, ma); if(!t || typeof CLT==='undefined') return '';
    var r = CLT.cua(t, K.B); var o = r && r[l]; return o ? (o.xl||'')+(o.diem!=null ? ' '+String(o.diem).replace('.', ',') : '') : ''; };
  var ng = function(d){ return d ? ngayVNsl(d) : ''; };
  var mon = function(c, x){ return x._o || ((kcKU(c.K, x.ku) || {}).dong) || {}; };   /* qua cửa kho chuẩn (js/73) */
  var cuaKH = function(c, kh){ return ((kcKH(c.K, kh) || {}).dong) || []; };
  var maTo = function(c, x){ if(x.mato) return x.mato; var o = x.ku ? mon(c, x) : cuaKH(c, x.kh)[0] || {}; return toMaCua(o) || ''; };
  /* từ điển: k · ten · nguon · khoa · gop (mon / kh / to) · tien · lay(c, dòng) */
  M.TRUONG = [
    {k:'mc_cqh', ten:'Chuyển QH trong tháng', nguon:'Mẫu 31', khoa:'Số KU', gop:['mon'], tien:1, lay:function(c, x){ return mon(c, x).cqh || 0; }},
    {k:'mc_ncqh', ten:'Ngày chuyển QH', nguon:'Mẫu 31 (Ngày CNQH gần nhất)', khoa:'Số KU', gop:['mon'], lay:function(c, x){ var o = mon(c, x); return (o.qh>0 || o.cqh>0) ? ng(tdnNgay(o.c_ngay_cnqh_gan_nhat)) : ''; }},
    {k:'mc_dhgd', ten:'Ngày ĐH theo GDXA', nguon:'Mẫu 31', khoa:'Số KU', gop:['mon'], lay:function(c, x){ return ng(mon(c, x).dhgd); }},
    {k:'mc_khd', ten:'KHĐ ≥ 3 tháng', nguon:'tính từ Mẫu 31 (luật hệ thống)', khoa:'Số KU', gop:['mon', 'kh'],
      lay:function(c, x){ var K = c.B.khd || {}; if(x.ku) return K[x.ku] ? 'Có' : ''; var n = cuaKH(c, x.kh).filter(function(o){ return o.ku && K[o.ku]; }).length; return n ? n+' món' : ''; }},
    {k:'mc_nhh', ten:'Hết hạn khoanh', nguon:'Mẫu 31', khoa:'Số KU', gop:['mon'], lay:function(c, x){ var o = mon(c, x); return o.kn>0 ? ng(o.nhh) : ''; }},
    {k:'mc_nhl', ten:'Hiệu lực khoanh', nguon:'file Nợ khoanh', khoa:'Số KU', gop:['mon'], lay:function(c, x){ return ng(((c.B.nk || {})[x.ku] || {}).nhl); }},
    {k:'mc_nn', ten:'Nguyên nhân khoanh', nguon:'file Nợ khoanh', khoa:'Số KU', gop:['mon'], lay:function(c, x){ return ((c.B.nk || {})[x.ku] || {}).nn || ''; }},
    {k:'mc_t105', ten:'Tiền gửi 105 (khách)', nguon:'Mẫu 31 (cộng các sổ)', khoa:'Mã KH', gop:['mon', 'kh'], tien:1, lay:function(c, x){ return c.t105[x.kh] || 0; }},
    {k:'mc_ngaygd', ten:'Ngày GDXA (điểm)', nguon:'File Tổ trưởng / Mẫu 31', khoa:'Mã tổ', gop:['mon', 'kh', 'to'], lay:function(c, x){ var t = KHO.toKy(c.K, maTo(c, x)) || {}; return t.ngayGD || ''; }},
    {k:'mc_cltT', ten:'CLT02 tháng (tổ)', nguon:'CLT02 tháng', khoa:'Mã tổ', gop:['mon', 'kh', 'to'], lay:function(c, x){ return M.clt(c.K, maTo(c, x), 'T'); }},
    {k:'mc_cltDK', ten:'CLT02 định kỳ (tổ)', nguon:'CLT02 định kỳ', khoa:'Mã tổ', gop:['mon', 'kh', 'to'], lay:function(c, x){ return M.clt(c.K, maTo(c, x), 'DK'); }}
  ];
  M.ctx = function(K){ var B = K && K.B || {}; return {K:K, B:B, t105:M.t105(B)}; };
  M.gan = function(gop, K, ds){   /* thêm trường bổ sung vào các dòng của 🧩 Báo cáo của tôi */
    var c = M.ctx(K), tr = M.TRUONG.filter(function(f){ return f.gop.indexOf(gop)>=0; });
    ds.forEach(function(x){ tr.forEach(function(f){ x[f.k] = f.lay(c, x); }); }); return ds; };
  /* 🧩 Báo cáo của tôi: thêm cột + bọc hàm lấy dòng */
  if(typeof BT_COT!=='undefined') M.TRUONG.forEach(function(f){ f.gop.forEach(function(g){ var d = BT_COT[g]; if(d && !d.some(function(c){ return c.k===f.k; })) d.push({k:f.k, ten:f.ten, tien:f.tien, nguon:f.nguon}); }); });
  if(typeof btDong==='function'){ var cu = btDong; btDong = function(cfg, ctx){ return M.gan(cfg.gop || 'mon', ctx.K, cu.apply(this, arguments)); }; }
  /* Sao kê › Khách hàng: Bảng món chuẩn */
  M.COT = [['Xã', function(c, o, d){ return d.xa; }], ['Điểm GD', function(c, o, d){ return d.diem; }], ['Ấp', function(c, o){ return o.tenThon || ''; }], ['Hội', function(c, o, d){ return d.hoi; }],
    ['Tổ', function(c, o, d){ return d.to; }], ['Mã KH', function(c, o){ return o.kh || ''; }], ['Họ tên', function(c, o){ return o.ten || ''; }], ['Số KU', function(c, o){ return o.ku; }],
    ['Chương trình', function(c, o){ return ctNgan(o.ct, o); }], ['Nguồn vốn', function(c, o){ return o.nguon || ''; }], ['Ngày vay', function(c, o){ return ng(o.nv); }], ['Hạn trả', function(c, o){ return ng(o.dhgh || o.dhg); }],
    ['Dư nợ', function(c, o){ return o.dn || 0; }, 1], ['Trong hạn', function(c, o){ return o.th || 0; }, 1], ['Quá hạn', function(c, o){ return o.qh || 0; }, 1], ['Khoanh', function(c, o){ return o.kn || 0; }, 1],
    ['Lãi tồn', function(c, o){ return laiTon(o); }, 1], ['GD gần nhất', function(c, o){ return ng(o.ngdg); }]];
  M.lap = function(){
    var N = skNen31('mch'); if(N.can) return N.can;
    var K = SK_K, c = M.ctx(K), da = {}, ds = N.rows.filter(function(o){ if(!o.ku || da[o.ku]) return false; return (da[o.ku] = 1); });
    var cot = M.COT.map(function(x){ return {ten:x[0], nguon:'Mẫu 31', lay:x[1], tien:x[2]}; }).concat(M.TRUONG.filter(function(f){ return f.gop.indexOf('mon')>=0; }).map(function(f){ return {ten:f.ten, nguon:f.nguon, f:f, tien:f.tien}; }));
    var aoa = [['STT'].concat(cot.map(function(x){ return x.ten; })), ['Nguồn'].concat(cot.map(function(x){ return x.nguon; }))], MAX = 200, h = '';
    ds.forEach(function(o, i){ var d = dkDV(K, toMaCua(o)), x = {ku:o.ku, kh:o.kh, _o:o};
      var r = [i+1].concat(cot.map(function(k){ return k.f ? k.f.lay(c, x) : k.lay(c, o, d); })); aoa.push(r);
      if(i<MAX) h += '<tr>'+r.map(function(v, j){ var t = j && cot[j-1].tien; return '<td'+(t ? ' class="s"' : '')+'>'+(t ? tdnTien(v) : coChuHTML(String(v==null ? '' : v)))+'</td>'; }).join('')+'</tr>'; });
    var dau = '<div class="bc-tom">'+ds.length+' món · '+cot.length+' cột (Mẫu 31 + '+M.TRUONG.filter(function(f){ return f.gop.indexOf('mon')>=0; }).length+' trường bổ sung, dòng "Nguồn" ghi nơi lấy)'+
      (ds.length>MAX ? ' · màn hình hiện '+MAX+' dòng đầu — <b>📊 Xuất Excel</b> đủ '+ds.length+' dòng' : '')+'</div>';
    var bang = '<div class="cuon"><table class="bc-bang"><thead><tr><th>STT</th>'+cot.map(function(x){ return '<th title="Nguồn: '+coChuHTML(x.nguon)+'">'+coChuHTML(x.ten)+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table></div>';
    return {ten:'Bang mon chuan', tieuDe:'BẢNG MÓN CHUẨN (MẪU 31 + NGUỒN BỔ SUNG)', ngay:N.ngay, html:dau+bang, aoa:aoa};
  };
  if(typeof SK_BC!=='undefined') SK_BC.push({k:'mch', ten:'Bảng món chuẩn — mỗi món 1 dòng: Mẫu 31 + trường bổ sung từ file khác (ghi nguồn từng cột)', nhom:'kh', kho:'ngang', lap:function(){ return M.lap(); }});
  return M;
})();
