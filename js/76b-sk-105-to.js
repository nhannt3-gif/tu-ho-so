/* ===== js/76b-sk-105-to.js — 3.512 (anh 11/11/2026 "sao kê hộ vay có TK105 nhưng chưa gán mã tổ" → "KH có dư nợ trong tổ nhưng TK 105 chưa có gán mã tổ"): =====
   SAO KÊ KHÁCH VAY TRONG TỔ CÓ TK 105 CHƯA GÁN MÃ TỔ — Mẫu 31 kỳ đang xem (qua kho, mọi dòng):
   · khách có món còn dư nợ mang MÃ TỔ THẬT (tổ đang vay) · VÀ có dòng TK 105 (dòng không có khế ước, có số sổ / số dư 105) mang mã tổ trống / 0000000.
   Mỗi khách 1 dòng, chia theo TỔ ĐANG VAY (lọc được tới tổ): Mã KH · Họ tên · Số TK 105 · Số dư 105 · Dư nợ · Ghi chú "Gán TK 105 vào tổ …".
   Gói 1 không gian tên SK105T (QUY_CHUAN mục 13) · cắm rút (tự đăng ký SK_BC). ===== */
var SK105T = {
  coTo: function(t){ return !!t && t!==TO_GIA && !/^0+$/.test(String(t)); },
  /* NGHIỆP VỤ thuần: R = mọi dòng Mẫu 31 → [{kh, ten, to, _tt, toTen, tenXa, so:[stk], t105, dn}] */
  ds: function(R){
    var kh = {}, lay = function(m){ return kh[m] = kh[m] || {kh:m, ten:'', toVay:{}, dn:0, so:{}, thu:[], t105:0, co105:false}; };
    R.forEach(function(o){ if(!o.kh) return; var x = lay(o.kh); if(!x.ten && o.ten) x.ten = o.ten;
      if(o.ku && (o.dn||0)>0 && SK105T.coTo(o.to)){ x.toVay[o.to] = (x.toVay[o.to]||0)+(o.dn||0); x.dn += o.dn||0; if(!x.mau) x.mau = o; }
      if(!o.ku && !SK105T.coTo(o.to)){ var ds = typeof slStk==='function' ? slStk(o.stk) : (o.stk ? [String(o.stk)] : []);
        if(ds.length || (o.t105||0)>0){ x.co105 = true; ds.forEach(function(k){ if(!x.so[k]){ x.so[k] = 1; x.thu.push(k); } }); if((o.t105||0)>x.t105) x.t105 = o.t105; } } });
    return Object.keys(kh).map(function(m){ return kh[m]; }).filter(function(x){ return x.co105 && x.dn>0; }).map(function(x){
      var to = Object.keys(x.toVay).sort(function(a, b){ return x.toVay[b]-x.toVay[a]; })[0];   /* nhiều tổ → tổ dư nợ lớn nhất */
      return {kh:x.kh, ten:x.ten, to:to, toNhieu:Object.keys(x.toVay).length>1, so:x.thu, t105:x.t105, dn:x.dn, tenXa:x.mau.tenXa || '', toTen:x.mau.toTen || ''}; });
  },
  lap: function(){
    var M = skMau31(); if(!M) return skCan31('Sao kê khách vay trong tổ có TK 105 chưa gán mã tổ');
    var th = SK_K.thang, e31 = KHO.bang('hstd', th);
    var ds = SK105T.ds((kcGoc(M)||[]).concat(kcLap(M)||[])).filter(skTrongPV);
    var ten = 'TK 105 chua gan to', tde = 'SAO KÊ KHÁCH VAY TRONG TỔ CÓ TÀI KHOẢN TIỀN GỬI 105 CHƯA GÁN MÃ TỔ', ngay = 'Số liệu đến ngày '+ngayVNsl(e31.ngay)+' (Mẫu 31 '+kyVN(th)+')';
    if(!ds.length) return {ten:ten, tieuDe:tde, ngay:ngay, html:'<div class="bc-rong">Không có khách vay trong tổ mà TK 105 chưa gán mã tổ trong phạm vi chọn.</div>', aoa:[['Không có']]};
    var tg = {so:0, du:0}, tTo = function(m){ var t = (SK_K.to||{})[m] || {}; return (t.ten || m)+' ('+m+')'; };
    ds.forEach(function(x){ tg.so += x.so.length; tg.du += x.t105; });
    var r = skBang(['STT','Mã KH','Họ tên','Số TK 105','Số dư 105','Dư nợ trong tổ','Ghi chú'], ds, function(x, i){
      return [i, x.kh, x.ten, x.so.join(', '), x.t105, x.dn, 'Gán TK 105 vào tổ '+tTo(x.to)+(x.toNhieu ? ' (vay ở nhiều tổ)' : '')]; }, [4, 5]);
    return {ten:ten, tieuDe:tde, ngay:ngay, aoa:r.aoa,
      html:'<div class="bc-tom">'+ds.length+' khách · '+tg.so+' sổ 105 · số dư '+tdnTien(tg.du)+' đ — khách đang vay trong tổ nhưng dòng TK 105 trên Mẫu 31 mã tổ trống / 0000000 → gán TK 105 vào tổ đang vay</div>'+r.html};
  }
};
SK_BC.push({k:'tk0', ten:'Sao kê khách vay trong tổ có TK 105 chưa gán mã tổ', nhom:'kh', kho:'doc', lap:SK105T.lap});
