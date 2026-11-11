/* ===== js/76b-sk-105-to.js — 3.512 (anh 11/11/2026 "em thêm liền sao kê hộ vay có TK105 nhưng chưa gán mã tổ"): SAO KÊ KHÁCH CÓ TK 105 CHƯA GÁN MÃ TỔ =====
   Khách có TK 105 (số sổ / số dư 105 trên Mẫu 31, hoặc có trong Sao kê TK 105 cùng kỳ, hoặc số sổ ở danh bạ) mà KHÔNG có dòng Mẫu 31 nào mang mã tổ thật
   (mã tổ trống / 0000000 — gồm khách vay trực tiếp, khách chỉ gửi tiền, khách có trong Sao kê 105 mà không có trong Mẫu 31). Mỗi khách 1 dòng: số sổ, số dư,
   ngày mở, dư nợ đang vay, tình trạng → "Cần gán mã tổ". Phạm vi: theo XÃ của cây lọc (khách chưa có tổ nên không lọc được đến điểm / hội / tổ).
   Nguồn: Mẫu 31 kỳ đang xem qua kho (kcGoc + kcLap — cả dòng lặp), Sao kê TK 105 cùng kỳ (KHO.saoKeKy), danh bạ (slStkDB). Gói 1 không gian tên SK105T · cắm rút (tự đăng ký SK_BC). ===== */
var SK105T = {
  coTo: function(t){ return !!t && t!==TO_GIA && !/^0+$/.test(String(t)); },
  /* NGHIỆP VỤ: Mẫu 31 (mọi dòng) + Sao kê 105 + danh bạ → khách có TK 105 chưa gán mã tổ */
  ds: function(R, rSK, xaChon, stkDB, xaTen){
    var kh = {}, lay = function(m, o){ return kh[m] = kh[m] || {kh:m, ten:'', xa:'', tenXa:'', m31:false, coTo:false, dn:0, mon:0, t105:0, so:{}, thu:[]}; };
    var so = function(x, stk, t105, ndk){ var k = String(stk||'').replace(/\D/g, ''); if(!k) return; var s = x.so[k]; if(!s){ s = x.so[k] = {stk:k, t105:null, ndk:''}; x.thu.push(s); }
      if(t105!=null && t105!=='') s.t105 = Math.max(s.t105||0, +t105||0); if(ndk && !s.ndk) s.ndk = ndk; };
    R.forEach(function(o){ if(!o.kh) return; var x = lay(o.kh); x.m31 = true; if(!x.ten && o.ten) x.ten = o.ten; if(!x.xa && o.xa) x.xa = String(o.xa); if(!x.tenXa && o.tenXa) x.tenXa = o.tenXa;
      if(SK105T.coTo(o.to)) x.coTo = true; if(o.ku && (o.dn||0)>0){ x.dn += o.dn; x.mon++; } if((o.t105||0)>x.t105) x.t105 = o.t105;
      (typeof slStk==='function' ? slStk(o.stk) : []).forEach(function(k){ so(x, k, null, ''); }); });
    (rSK||[]).forEach(function(o){ if(!o.kh) return; var x = lay(o.kh); if(!x.ten && o.ten) x.ten = o.ten; if(!x.xa && o.xa) x.xa = String(o.xa); so(x, o.stk, o.t105, o.ndk); });
    Object.keys(kh).forEach(function(m){ (stkDB ? stkDB(m) : []).forEach(function(k){ so(kh[m], k, null, ''); }); });
    return Object.keys(kh).map(function(m){ return kh[m]; }).filter(function(x){ return !x.coTo && (x.thu.length || x.t105>0) && (!xaChon || x.xa===String(xaChon)); })
      .map(function(x){ if(!x.tenXa) x.tenXa = (xaTen || {})[x.xa] || x.xa;
        x.tt = x.mon ? 'Đang vay không qua tổ' : x.m31 ? 'Không còn món vay' : 'Không có trong Mẫu 31'; return x; })
      .sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi') || String(a.ten).localeCompare(String(b.ten), 'vi') || (a.kh<b.kh ? -1 : 1); });
  },
  lap: function(){
    var M = skMau31(); if(!M) return skCan31('Sao kê khách có TK 105 chưa gán mã tổ');
    var C = skCH(), th = SK_K.thang, e31 = KHO.bang('hstd', th), sk = KHO.saoKeKy(SK_K, 'tk105');
    var ds = SK105T.ds((kcGoc(M)||[]).concat(kcLap(M)||[]), sk && sk.rows, C.xa || '', typeof slStkDB==='function' ? slStkDB : null, M.xaTen);
    var ten = 'TK 105 chua gan to', tde = 'SAO KÊ KHÁCH CÓ TÀI KHOẢN TIỀN GỬI 105 CHƯA GÁN MÃ TỔ', ngay = 'Số liệu đến ngày '+ngayVNsl(e31.ngay)+' (Mẫu 31 '+kyVN(th)+')'+(sk ? ' · Sao kê TK 105 '+ngayVNsl(sk.ngay || '') : ' · chưa nạp Sao kê TK 105 cùng kỳ — chỉ xét số sổ / số dư 105 trên Mẫu 31');
    if(!ds.length) return {ten:ten, tieuDe:tde, ngay:ngay, html:'<div class="bc-rong">Không có khách có TK 105 mà chưa gán mã tổ'+(C.xa ? ' trong xã đang chọn' : '')+'.</div>', aoa:[['Không có']]};
    var tong = {so:0, du:0, dn:0};
    var r = skBang(['STT','Mã KH','Họ tên','Xã','Số TK 105','Số dư 105','Ngày mở','Dư nợ đang vay','Tình trạng','Ghi chú'], ds, function(x, i){
      var du = x.thu.length ? x.thu.reduce(function(a, s){ return a+(s.t105||0); }, 0) : x.t105, ngM = x.thu.map(function(s){ return s.ndk; }).filter(Boolean).sort()[0] || '';
      tong.so += x.thu.length; tong.du += du; tong.dn += x.dn;
      return [i, x.kh, x.ten, x.tenXa, x.thu.map(function(s){ return s.stk; }).join(', '), du, ngayVNsl(ngM), x.dn, x.tt, 'Cần gán mã tổ']; }, [5, 7], null, 1);   /* phang: 1 bảng liền, giữ thứ tự xã → tên */
    return {ten:ten, tieuDe:tde, ngay:ngay, aoa:r.aoa,
      html:'<div class="bc-tom">'+ds.length+' khách · '+tong.so+' sổ 105 · số dư '+tdnTien(tong.du)+' đ'+(tong.dn ? ' · dư nợ đang vay không qua tổ '+tdnTien(tong.dn)+' đ' : '')+
        (C.diem || C.hoi || C.to ? ' · <span class="vang">khách chưa có tổ nên chỉ lọc theo xã</span>' : '')+'</div>'+r.html};
  }
};
SK_BC.push({k:'tk0', ten:'Sao kê khách có TK 105 chưa gán mã tổ (cần gán tổ)', nhom:'kh', kho:'doc', lap:SK105T.lap});
