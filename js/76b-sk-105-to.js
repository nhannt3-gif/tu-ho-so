/* ===== js/76b-sk-105-to.js — 3.512 (anh 11/11/2026): SAO KÊ TK 105 CỦA KHÁCH VAY TRONG TỔ — 3 TRƯỜNG HỢP =====
   Anh: "KH có dư nợ trong tổ nhưng TK 105 chưa có gán mã tổ" · "có dư nợ chưa có TK 105 → tạo mới; TK 105 còn hoạt động nhưng đã gỡ mã tổ → gắn lại;
   dư nợ 1 tổ nhưng TK 105 ở tổ khác — phân rõ" · "cho sao kê" · "lấy Mẫu 31 làm chuẩn, kiểm cấu trúc rút ra logic" · "em tự nội suy, anh không chắc".
   CẤU TRÚC MẪU 31 (docs/COT_FILE_MAU.md, đã kiểm file thật 19/10): mỗi dòng = 1 khế ước, mang mã tổ của MÓN VAY; cột 173 "Sổ tiết kiệm 105" + 174 "Số dư tiền gửi 105"
   nằm trên dòng món vay (nhiều sổ → khế ước lặp dòng); không có dòng TK 105 riêng cho khách đang vay; ~1/4 món để trống sổ 105.
   SUY LUẬN (CHƯA XÁC NHẬN — mỗi dòng ghi CĂN CỨ để anh đối chiếu hệ thống): xét khách có món còn dư nợ ở tổ A (mã tổ thật), mọi dòng của tổ A (cả dòng lặp) KHÔNG có sổ 105 —
   ③ cùng khách có dòng ở TỔ KHÁC mang sổ 105 → TK 105 đang ở tổ khác → chuyển về tổ A
   ② không có ở tổ khác, nhưng có TK 105 (Sao kê TK 105 cùng kỳ, số TK 105 hệ thống 13–14 số, số dư 105 trên Mẫu 31, hoặc số sổ ở danh bạ) → TK 105 chưa gán vào tổ → gắn lại
   ① không thấy TK 105 ở đâu → chưa có TK 105 → mở mới (cùng luật chip "Chưa có TK 105" tab Tổ, thêm điều kiện còn dư nợ)
   Tổ A có sổ 105 → không báo. Chia theo tổ đang vay (lọc tới tổ). Gói 1 không gian tên SK105T · cắm rút (SK_BC 'tk0'). ===== */
var SK105T = {
  coTo: function(t){ return !!t && t!==TO_GIA && !/^0+$/.test(String(t)); },
  TH: [['mo', '① Có dư nợ trong tổ nhưng CHƯA CÓ TK 105', 'Mở mới TK 105'], ['gan', '② Có TK 105 nhưng CHƯA GÁN VÀO TỔ đang vay', 'Gắn TK 105 vào tổ'], ['khac', '③ Dư nợ ở tổ này nhưng TK 105 Ở TỔ KHÁC', 'Chuyển TK 105 về tổ']],
  /* NGHIỆP VỤ thuần: R = mọi dòng Mẫu 31 (cả dòng lặp) · skTheo(kh) → [{stk, t105}] Sao kê 105 cùng kỳ · db(kh) → [số sổ danh bạ]
     → [{kh, ten, to (tổ A), th, so:[stk], t105, dn, can (căn cứ)}] */
  ds: function(R, skTheo, db){
    var kh = {}, lay = function(m){ return kh[m] = kh[m] || {kh:m, ten:'', vay:{}, so:{}, coTK:false, t105:0}; };
    R.forEach(function(o){ if(!o.kh) return; var x = lay(o.kh); if(!x.ten && o.ten) x.ten = o.ten; if((o.t105||0)>x.t105) x.t105 = o.t105;
      if(!SK105T.coTo(o.to)) return; var to = String(o.to), s = typeof slStk==='function' ? slStk(o.stk) : (o.stk ? [String(o.stk)] : []);
      var y = x.so[to] = x.so[to] || []; s.forEach(function(k){ if(y.indexOf(k)<0) y.push(k); });
      if(typeof slCoTK==='function' && slCoTK(o.stk)) x.coTK = true;
      if(o.ku && (o.dn||0)>0) x.vay[to] = (x.vay[to]||0)+(o.dn||0); });
    var ra = [];
    Object.keys(kh).forEach(function(m){ var x = kh[m];
      Object.keys(x.vay).forEach(function(A){ if((x.so[A]||[]).length) return;   /* tổ A đã có sổ 105 → đúng */
        var khac = Object.keys(x.so).filter(function(B){ return B!==A && x.so[B].length; }), sk = skTheo ? skTheo(m) || [] : [], dbs = db ? db(m) || [] : [];
        var d = {kh:m, ten:x.ten, to:A, dn:x.vay[A], t105:x.t105, so:[], can:''};
        if(khac.length){ d.th = 'khac'; d.toKhac = khac; khac.forEach(function(B){ x.so[B].forEach(function(k){ if(d.so.indexOf(k)<0) d.so.push(k); }); });
          d.can = 'Mẫu 31: tổ này trống sổ 105; sổ ghi ở dòng tổ '+khac.join(', '); }
        else if(sk.length || x.coTK || x.t105>0 || dbs.length){ d.th = 'gan';
          sk.forEach(function(o){ var k = String(o.stk||'').replace(/\D/g, ''); if(k && d.so.indexOf(k)<0) d.so.push(k); }); if(sk.length) d.t105 = sk.reduce(function(a, o){ return a+(o.t105||0); }, 0);
          if(!d.so.length) dbs.forEach(function(k){ if(d.so.indexOf(k)<0) d.so.push(k); });
          d.can = 'Mẫu 31: tổ này trống sổ 105; '+(sk.length ? 'có trong Sao kê TK 105' : x.coTK ? 'có số TK 105 hệ thống' : x.t105>0 ? 'có số dư 105 trên Mẫu 31' : 'số sổ ở danh bạ (chưa thấy trong Sao kê 105)'); }
        else { d.th = 'mo'; d.can = 'Không thấy TK 105 (Mẫu 31, Sao kê 105, danh bạ)'; }
        ra.push(d); }); });
    return ra;
  },
  lap: function(){
    var M = skMau31(); if(!M) return skCan31('Sao kê TK 105 của khách vay trong tổ');
    var th = SK_K.thang, e31 = KHO.bang('hstd', th), sk = KHO.saoKeKy(SK_K, 'tk105'), theo = {};
    (sk && sk.rows || []).forEach(function(o){ if(o.kh) (theo[o.kh] = theo[o.kh] || []).push(o); });
    var tat = SK105T.ds((kcGoc(M)||[]).concat(kcLap(M)||[]), function(m){ return theo[m]; }, typeof slStkDB==='function' ? slStkDB : null).filter(skTrongPV);
    var ten = 'TK 105 khach vay', tde = 'SAO KÊ TÀI KHOẢN TIỀN GỬI 105 CỦA KHÁCH VAY TRONG TỔ', ngay = 'Số liệu đến ngày '+ngayVNsl(e31.ngay)+' (Mẫu 31 '+kyVN(th)+')'+(sk ? ' · Sao kê TK 105 cùng kỳ' : ' · chưa nạp Sao kê TK 105 cùng kỳ');
    if(!tat.length) return {ten:ten, tieuDe:tde, ngay:ngay, html:'<div class="bc-rong">Không có khách vay trong tổ nào thuộc 3 trường hợp trong phạm vi chọn.</div>', aoa:[['Không có']]};
    var tTo = function(m){ var t = (SK_K.to||{})[m] || {}; return (t.ten || m)+' ('+m+')'; }, h = '', aoa = [], tom = [];
    SK105T.TH.forEach(function(L){ var ds = tat.filter(function(x){ return x.th===L[0]; }); tom.push(L[1].slice(0, 1)+' '+ds.length+' khách'); if(!ds.length) return;
      var r = skBang(['STT','Mã KH','Họ tên','Dư nợ trong tổ','Số TK 105','Số dư 105','Căn cứ','Việc cần làm'], ds, function(x, i){
        return [i, x.kh, x.ten, x.dn, x.so.join(', '), x.t105, x.can, L[2]+(L[0]==='mo' ? '' : ' '+tTo(x.to))]; }, [3, 5]);
      h += '<p class="b tr">'+coChuHTML(L[1]+' — '+ds.length+' khách')+'</p>'+r.html; aoa = aoa.concat([[L[1]+' — '+ds.length+' khách']]).concat(r.aoa); });
    return {ten:ten, tieuDe:tde, ngay:ngay, aoa:aoa,
      html:'<div class="bc-tom">'+coChuHTML(tom.join(' · '))+' — <b>phân loại suy ra từ Mẫu 31</b> (cột Sổ tiết kiệm 105 trên dòng món vay của tổ) đối chiếu Sao kê TK 105 · danh bạ; cột Căn cứ ghi rõ từng trường hợp — đối chiếu vài khách trên hệ thống trước khi xử lý'+(sk ? '' : '; <span class="vang">nạp Sao kê TK 105 cùng kỳ để tách ① / ② chính xác hơn</span>')+'</div>'+h};
  }
};
SK_BC.push({k:'tk0', ten:'Sao kê TK 105 của khách vay trong tổ — chưa có · chưa gán vào tổ · ở tổ khác', nhom:'kh', kho:'ngang', lap:SK105T.lap});
