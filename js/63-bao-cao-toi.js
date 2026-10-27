/* ===== 3.356 (KE_HOACH_DANG_KY — đợt D5): 🧩 BÁO CÁO CỦA TÔI — anh tự khai báo cáo bảng, không sửa code =====
   Anh chốt 24/10: đặt ở tab Tổng hợp (đổi sau nếu thấy không ổn); nguồn cơ bản Mẫu 31; có số liệu chuẩn TW (Tổng dư nợ theo CT) thì kiểm tra chéo.
   - Khai trong hộp ⚙: tên · gộp theo (từng món / từng khách / từng tổ) · cột · điều kiện lọc · nhóm mặc định · khổ in.
   - Lưu D.cauHinh.bcToi (đồng bộ Drive cùng cài đặt). Mỗi báo cáo đăng ký thành 1 khối DANG_KY (js/62) → dùng chung khuôn in chuẩn, Excel, Word, 📜 nhật ký.
   - Dòng lấy từ Mẫu 31 của kỳ đang xem ở tab Tổng hợp, lọc theo phạm vi + Chương trình + Nguồn vốn đang chọn ở tab.
   - Đối chiếu TW: cộng dư nợ / QH / khoanh Mẫu 31 trong phạm vi (trước điều kiện lọc của báo cáo) so với file Tổng dư nợ theo CT cùng kỳ. ES5. */
var BT_GOP = [['mon', 'Từng món vay'], ['kh', 'Từng khách'], ['to', 'Từng tổ']];
/* danh mục cột theo kiểu gộp: md = có sẵn khi tạo mới */
var BT_COT = {
  mon:[{k:'kh', ten:'Mã KH', md:1}, {k:'ten', ten:'Họ tên', md:1}, {k:'ku', ten:'Số KU', nho:1, md:1}, {k:'ct', ten:'CT', md:1}, {k:'nv', ten:'Ngày vay'}, {k:'dhg', ten:'Hạn trả', md:1},
    {k:'gn', ten:'Giải ngân', tien:1}, {k:'dn', ten:'Dư nợ', tien:1, md:1}, {k:'th', ten:'Trong hạn', tien:1}, {k:'qh', ten:'Quá hạn', tien:1, md:1}, {k:'kn', ten:'Khoanh', tien:1},
    {k:'lt', ten:'Lãi tồn', tien:1, md:1}, {k:'ngdg', ten:'GD gần nhất'}, {k:'ls', ten:'Lãi suất'}, {k:'sdt', ten:'SĐT'}, {k:'ap', ten:'Ấp'}, {k:'to', ten:'Tổ'}, {k:'hoi', ten:'Hội'}, {k:'diem', ten:'Điểm GD'}, {k:'xa', ten:'Xã'}],
  kh:[{k:'kh', ten:'Mã KH', md:1}, {k:'ten', ten:'Họ tên', md:1}, {k:'som', ten:'Số món', so:1, cong:1, md:1}, {k:'cts', ten:'Chương trình', md:1}, {k:'dhg', ten:'Hạn gần nhất'},
    {k:'dn', ten:'Dư nợ', tien:1, md:1}, {k:'qh', ten:'Quá hạn', tien:1, md:1}, {k:'kn', ten:'Khoanh', tien:1}, {k:'lt', ten:'Lãi tồn', tien:1, md:1}, {k:'sdt', ten:'SĐT'}, {k:'dc', ten:'Địa chỉ', xd:1},
    {k:'ap', ten:'Ấp'}, {k:'to', ten:'Tổ'}, {k:'hoi', ten:'Hội'}, {k:'diem', ten:'Điểm GD'}, {k:'xa', ten:'Xã'}],
  to:[{k:'mato', ten:'Mã tổ', md:1}, {k:'tt', ten:'Tổ trưởng', md:1}, {k:'sokh', ten:'Số khách', so:1, cong:1, md:1}, {k:'som', ten:'Số món', so:1, cong:1}, {k:'dn', ten:'Dư nợ', tien:1, md:1},
    {k:'qh', ten:'Quá hạn', tien:1, md:1}, {k:'kn', ten:'Khoanh', tien:1}, {k:'tlqh', ten:'Tỷ lệ QH (%)'}, {k:'lt', ten:'Lãi tồn', tien:1}, {k:'ap', ten:'Ấp'}, {k:'hoi', ten:'Hội', md:1}, {k:'diem', ten:'Điểm GD'}, {k:'xa', ten:'Xã'}]
};
var BT_LOC = [['conNo', 'Còn dư nợ'], ['qh', 'Có quá hạn'], ['kn', 'Có khoanh'], ['lt', 'Có lãi tồn']];
function btDs(){ return D.cauHinh.bcToi = D.cauHinh.bcToi || []; }
function btMoi(){ return {id:'bt'+Date.now().toString(36), ten:'', gop:'mon', cot:BT_COT.mon.filter(function(c){ return c.md; }).map(function(c){ return c.k; }), loc:['conNo'], nhom:'dht', kho:'tu'}; }
/* dòng Mẫu 31 trong phạm vi + Chương trình + Nguồn vốn của tab (chưa áp điều kiện lọc của báo cáo) */
function btMon(ctx){ var S = ctx.S, K = ctx.K;
  return (kcGoc(ctx.B) || []).filter(function(o){ return o.ku && pvLoc(S, KHO.toKy(K, toMaCua(o))) && (!S.ct || String(o.ct)===S.ct) && (!S.nguon || String(o.nguon)===S.nguon); }); }
function btQua(o, loc){ return (loc.indexOf('conNo')<0 || (o.dn||0)>0) && (loc.indexOf('qh')<0 || (o.qh||0)>0) && (loc.indexOf('kn')<0 || (o.kn||0)>0) && (loc.indexOf('lt')<0 || laiTon(o)>0); }
function btDong(cfg, ctx){
  var K = ctx.K, ds = btMon(ctx).filter(function(o){ return btQua(o, cfg.loc||[]); }), ra = [];
  var dv = function(maTo){ return dkDV(K, maTo); }, ng = function(d){ return d ? ngayVNsl(d) : ''; };
  var noi = function(r, kh, maTo){ var c = KHO.danhBa(kh) || {}, d = dv(maTo); r.sdt = c.sdt || ''; r.dc = c.dc || ''; r.to = d.to; r.hoi = d.hoi; r.diem = d.diem; r.xa = d.xa; r._dv = d; return r; };
  if(cfg.gop==='mon') ds.forEach(function(o){ var r = noi({kh:o.kh||'', ten:o.ten||'', ku:o.ku, ct:ctNgan(o.ct, o), nv:ng(o.nv), dhg:ng(o.dhgh || o.dhg), gn:o.gn||0, dn:o.dn||0, th:o.th||0, qh:o.qh||0, kn:o.kn||0,
      lt:laiTon(o), ngdg:ng(o.ngdg), ls:o.ls ? String(o.ls).replace('.', ',') : '', ap:o.tenThon||''}, o.kh, toMaCua(o)); ra.push(r); });
  else if(cfg.gop==='kh'){ var g = {}, thu = [];
    ds.forEach(function(o){ var k = o.kh || o.ku; if(!g[k]){ g[k] = noi({kh:o.kh||'', ten:o.ten||'', som:0, _ct:{}, dhg:'', _h:'', dn:0, qh:0, kn:0, lt:0, ap:o.tenThon||''}, o.kh, toMaCua(o)); thu.push(k); }
      var r = g[k]; r.som++; r._ct[ctNgan(o.ct, o)] = 1; r.dn += o.dn||0; r.qh += o.qh||0; r.kn += o.kn||0; r.lt += laiTon(o);
      var h = String(o.dhgh || o.dhg || '').slice(0, 10); if(h && (o.dn||0)>0 && (!r._h || h<r._h)) r._h = h; });
    thu.forEach(function(k){ var r = g[k]; r.cts = Object.keys(r._ct).join(', '); r.dhg = r._h ? ngayVNsl(r._h) : ''; ra.push(r); }); }
  else { var t = {}, thuT = [];
    ds.forEach(function(o){ var m = toMaCua(o) || '?'; if(!t[m]){ var x = KHO.toKy(K, m) || {}, d = dv(m); t[m] = {mato:m, tt:x.ten || '', _kh:{}, som:0, dn:0, qh:0, kn:0, lt:0, ap:x.tenThon || o.tenThon || '', hoi:d.hoi, diem:d.diem, xa:d.xa, _dv:d}; thuT.push(m); }
      var r = t[m]; r._kh[o.kh] = 1; r.som++; r.dn += o.dn||0; r.qh += o.qh||0; r.kn += o.kn||0; r.lt += laiTon(o); });
    thuT.forEach(function(m){ var r = t[m]; r.sokh = Object.keys(r._kh).length; r.tlqh = r.dn ? (Math.round(r.qh/r.dn*10000)/100).toLocaleString('vi-VN') : '0'; ra.push(r); }); }
  ra.sort(function(a, b){ var x = a._dv||{}, y = b._dv||{}; return (x.xa+x.diem+x.hoi+x.to).localeCompare(y.xa+y.diem+y.hoi+y.to) || String(a.kh||a.mato).localeCompare(String(b.kh||b.mato)); });
  return ra;
}
/* kiểm tra chéo với file chuẩn TW cùng kỳ */
function btDoiChieu(ctx){
  var B = ctx.B || {co:{}}, S = ctx.S, tw = B.co && B.co.tdn;
  if(!tw) return 'Đối chiếu TW: chưa có số liệu TW (Tổng dư nợ theo CT) cùng kỳ để đối chiếu.';
  if(S.diem || S.to) return 'Đối chiếu TW: file Tổng dư nợ theo CT không chia tới điểm GD / tổ — chọn Toàn PGD, xã hoặc hội để đối chiếu.';
  var hop = function(o){ return (!S.xa || String(o.xa)===String(S.xa)) && (!S.hoi || String(o.dv||'')===S.hoi) && (!S.ct || String(o.ct)===S.ct) && (!S.nguon || String(o.nguon)===S.nguon); };
  var a = (kcGoc(B)||[]).filter(function(o){ return o.ku && hop(o); }), b = tw.filter(hop);
  var cong = function(r, f){ return r.reduce(function(s, o){ return s+(o[f]||0); }, 0); }, lech = 0;
  var p = [['dn', 'dư nợ'], ['qh', 'QH'], ['kn', 'khoanh']].map(function(f){ var x = cong(a, f[0]), y = cong(b, f[0]), ok = Math.abs(x-y)<0.5; if(!ok) lech++;
    return f[1]+' '+dkTien(x)+(ok ? ' = TW ✓' : ' ≠ TW '+dkTien(y)+' (lệch '+dkTien(x-y)+')'); });
  return 'Đối chiếu Mẫu 31 với Tổng dư nợ theo CT (TW), cả phạm vi trước điều kiện lọc: '+p.join(' · ')+(lech ? ' — có lệch, xem 📥 Nạp & KT › Kiểm tra số liệu.' : '.');
}
/* đăng ký các báo cáo anh đã khai thành khối DANG_KY */
function btDangKyHet(){
  Object.keys(DK_DS).forEach(function(k){ if(/^bt_/.test(k)) delete DK_DS[k]; });
  btDs().forEach(function(cfg){
    var danh = BT_COT[cfg.gop] || BT_COT.mon, cot = [{k:'stt', ten:'STT'}].concat(danh.filter(function(c){ return (cfg.cot||[]).indexOf(c.k)>=0; }));
    var ngang = cfg.kho==='ngang' || (cfg.kho!=='doc' && cot.length>10);
    DANG_KY({ma:'bt_'+cfg.id, o:'th', loai:ngang ? 'bang' : 'ds', dvt:'đồng', ten:cfg.ten || 'Báo cáo chưa đặt tên', nhom:true, nhomMd:cfg.nhom || 'dht', cfg:cfg,
      mo:'Báo cáo của tôi · '+(BT_GOP.filter(function(g){ return g[0]===cfg.gop; })[0]||['', ''])[1],
      du:function(ctx){ return {cot:cot, dong:btDong(cfg, ctx), ghi:btDoiChieu(ctx)}; }});
  });
}
/* khối ở tab Tổng hợp */
function btNutHTML(){ btDangKy(); btDangKyHet();
  var ds = btDs();
  return '<div class="bt-tit">🧩 Báo cáo của tôi</div><div class="bt-ds">'+
    (ds.length ? ds.map(function(c){ return GD.nut({chu:'👁 '+coChuHTML(c.ten || 'Chưa đặt tên'), lenh:'dk.mo', du:{ma:'bt_'+c.id}, lop:'bt-xem'}); }).join('') : '<span class="ghi">Chưa có — bấm ⚙ để tạo báo cáo bảng từ Mẫu 31.</span>')+
    GD.nut({chu:'⚙ Tạo / sửa', lenh:'bt.mo', lop:'bt-sua'})+'</div>'; }
/* hộp ⚙: danh sách + khung khai */
var BT_NHAP = null;
function btHop(){
  btDangKy(); var ds = btDs(), N = BT_NHAP, e = coChuHTML;
  var h = '<div class="hop-tit">🧩 Báo cáo của tôi — tự khai báo cáo bảng từ Mẫu 31</div>'+
    '<div class="hop-phu">Số liệu: Mẫu 31 kỳ đang xem ở tab Tổng hợp, theo phạm vi · Chương trình · Nguồn vốn đang chọn. Có file Tổng dư nợ theo CT (TW) cùng kỳ thì cuối báo cáo có dòng đối chiếu.</div>';
  h += '<div class="bt-hang">'+ds.map(function(c){ return '<span class="bt-muc'+(N && N.id===c.id ? ' bat' : '')+'"><b>'+e(c.ten || 'Chưa đặt tên')+'</b> '+
      GD.nut({chu:'✎ Sửa', lenh:'bt.sua', du:{id:c.id}})+GD.nut({chu:'🗑', lenh:'bt.xoa', du:{id:c.id}, tit:'Xóa báo cáo này'})+'</span>'; }).join('')+
    GD.nut({chu:'＋ Tạo báo cáo mới', lenh:'bt.tao', chinh:!N})+'</div>';
  if(N){
    var danh = BT_COT[N.gop];
    h += '<div class="bt-khai">'+
      '<label class="bt-dong"><b>Tên báo cáo</b> <input id="bt-ten" value="'+e(N.ten)+'" placeholder="VD: Danh sách hộ còn lãi tồn" maxlength="120"></label>'+
      '<div class="bt-dong"><b>Gộp theo</b> '+BT_GOP.map(function(g){ return GD.chip(g[1], N.gop===g[0], 'bt.dat', {k:'gop', v:g[0]}); }).join('')+'</div>'+
      '<div class="bt-dong"><b>Cột</b> '+danh.map(function(c){ return GD.chip(c.ten, N.cot.indexOf(c.k)>=0, 'bt.dat', {k:'cot', v:c.k}); }).join('')+'</div>'+
      '<div class="bt-dong"><b>Chỉ lấy</b> '+BT_LOC.map(function(l){ return GD.chip(l[1], N.loc.indexOf(l[0])>=0, 'bt.dat', {k:'loc', v:l[0]}); }).join('')+'</div>'+
      '<div class="bt-dong"><b>Nhóm sẵn</b> '+DK_NHOM.map(function(d){ return GD.chip(d[1], (N.nhom||'')===d[0], 'bt.dat', {k:'nhom', v:d[0]}); }).join('')+'</div>'+
      '<div class="bt-dong"><b>Khổ in</b> '+[['tu', 'Tự động (> 10 cột → ngang)'], ['doc', 'A4 dọc'], ['ngang', 'A4 ngang']].map(function(d){ return GD.chip(d[1], N.kho===d[0], 'bt.dat', {k:'kho', v:d[0]}); }).join('')+'</div>'+
      GD.hang([GD.nut({chu:'💾 Lưu', lenh:'bt.luu', chinh:true}), GD.nut({chu:'💾 Lưu và xem', lenh:'bt.luuXem'}), GD.nut({chu:'Bỏ', lenh:'bt.bo'})])+'</div>';
  }
  moHop(h+GD.hang([GD.nut({chu:'Đóng (Esc)', lenh:'hop.dong'})]), true);
}
function btGiuTen(){ var i = document.getElementById('bt-ten'); if(i && BT_NHAP) BT_NHAP.ten = i.value.trim(); }
function btLuu(){ btGiuTen(); var N = BT_NHAP; if(!N) return null;
  if(!N.ten) { bao('Đặt tên báo cáo trước khi lưu.', 3); return null; }
  if(!N.cot.length){ bao('Chọn ít nhất 1 cột.', 3); return null; }
  var ds = btDs(), i = ds.findIndex(function(c){ return c.id===N.id; }), x = JSON.parse(JSON.stringify(N));
  if(i>=0) ds[i] = x; else ds.push(x);
  if(D.cauHinh.dkChon) delete D.cauHinh.dkChon['bt_'+N.id];   /* đổi khai báo → nhóm theo lấy lại mặc định mới */
  luu(); BT_NHAP = null; btDangKyHet(); if(typeof veTongHop==='function' && nganHienTai===7 && D.cauHinh.slTab==='th') veTongHop();
  return x;
}
function btDangKy(){ if(btDangKy.xong || typeof GD==='undefined') return; btDangKy.xong = 1;
  GD.dangKy('bt', {
    mo:function(){ BT_NHAP = null; btHop(); },
    tao:function(){ btGiuTen(); BT_NHAP = btMoi(); btHop(); },
    sua:function(el){ var c = btDs().find(function(x){ return x.id===el.getAttribute('data-id'); }); if(!c) return; BT_NHAP = JSON.parse(JSON.stringify(c)); btHop(); },
    xoa:function(el){ var id = el.getAttribute('data-id'), c = btDs().find(function(x){ return x.id===id; }); if(!c) return;
      hoi('Xóa báo cáo "'+(c.ten || 'Chưa đặt tên')+'"?', 'Chỉ xóa khai báo báo cáo, số liệu không đổi.', 'Xóa', function(){ D.cauHinh.bcToi = btDs().filter(function(x){ return x.id!==id; }); if(BT_NHAP && BT_NHAP.id===id) BT_NHAP = null;
        luu(); btDangKyHet(); btHop(); if(typeof veTongHop==='function' && nganHienTai===7 && D.cauHinh.slTab==='th') veTongHop(); }); },
    dat:function(el){ btGiuTen(); var N = BT_NHAP, k = el.getAttribute('data-k'), v = el.getAttribute('data-v'); if(!N) return;
      if(k==='gop'){ if(N.gop!==v){ N.gop = v; N.cot = BT_COT[v].filter(function(c){ return c.md; }).map(function(c){ return c.k; }); } }
      else if(k==='cot' || k==='loc'){ var a = N[k], i = a.indexOf(v); if(i>=0) a.splice(i, 1); else a.push(v);
        if(k==='cot') N.cot = BT_COT[N.gop].filter(function(c){ return a.indexOf(c.k)>=0; }).map(function(c){ return c.k; }); }   /* giữ thứ tự cột theo danh mục */
      else N[k] = v;
      btHop(); },
    luu:function(){ if(btLuu()) btHop(); },
    luuXem:function(){ var x = btLuu(); if(x) dkMo('bt_'+x.id); },
    bo:function(){ BT_NHAP = null; btHop(); }
  }); }
