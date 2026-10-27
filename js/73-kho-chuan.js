/* 3.381 (anh 26/10): KHO CHUẨN — "khi nạp dữ liệu, em dùng khóa có thể để liên kết với nhau thành 1 data hoàn chỉnh, mọi truy vấn sẽ lấy qua kho;
   data này là chuẩn, lấy nguyên bản từ Mẫu 31, có bổ sung số TK 105, 104, không đổi bất cứ gì; các nơi khác chỉ truy vấn, khi cần chỉnh nhẹ (vd tên tổ trưởng không dấu → bổ sung dấu)";
   "không đổi bản chất số liệu là được" (chỉ đổi cách viết lúc nạp: số, ngày, mã thêm 0, bỏ khoảng trắng thừa).
   - GỐC = dòng Mẫu 31 của kỳ (K.B.co.hstd) — KHÔNG sửa, không gộp, không bỏ (KU hủy giữ riêng ở huy).
   - GẮN THÊM (không ghi đè dòng gốc): Sao kê TK 105 / TK 104 theo mã KH · Nợ QH / khoanh / KHĐ theo số KU · tổ (Danh sách tổ) theo mã tổ.
   - CHỈ MỤC: theo KH · theo KU · theo tổ.  Bảng tính sẵn (KHO.hoVay…) luôn tính lại từ kho, không lưu đè.
   - Cửa: KHO.kc() · KHO.kcKH(kh) · KHO.kcKU(ku) · KHO.kcTo(ma) (js/29). Tab KHÔNG tự ghép file — hỏi kho. Chi tiết: docs/THIET_KE_HO_VAY.md mục 0. */
function kcDung(K){   /* K = kỳ đã dựng (KHO.nap) hoặc bộ bảng B (KHO.bo — Tổng hợp, Sao kê tháng trước) */
  if(K && !K.B && K.co){ var B0 = K; if(!B0.kc0) B0.kc0 = {B:B0}; K = B0.kc0; }
  if(!K || !K.B) return null;
  if(K.kc && K.kc.B===K.B) return K.kc;
  var B = K.B;
  K.kc = {B:B, ky:K.ky, ngay:K.ngay,
    dong:(B.co || {}).hstd || [], huy:B.huy || [], lap:B.lap || [],   /* 3.384: bộ chưa có co (kỳ dựng dở / phép thử) vẫn đọc được theoKH */   /* gốc Mẫu 31 · KU hủy (giữ riêng) · dòng TK riêng / khách ra tổ */
    theoKH:B.theoKH || {}, theoKU:B.mon || {}, theoTo:K.kh || {}, to:K.to || {},
    nqh:B.nqh || {}, nk:B.nk || {}, khd:B.khd || {}, gan:{}};
  return K.kc;
}
/* 3.382: cửa gốc cho báo cáo — giữ đúng ngữ nghĩa cũ (bảng chưa nạp → undefined, không đổi thành []) */
function kcGoc(x){ var B = x && (x.B || (x.co ? x : null)); return B && B.co ? B.co.hstd : undefined; }   /* dòng Mẫu 31 nguyên bản */
function kcLap(x){ var B = x && (x.B || (x.co ? x : null)); return B ? B.lap : undefined; }   /* dòng TK riêng / khách ra tổ */
function kcBang(x, loai){ var B = x && (x.B || (x.co ? x : null)); return B && B.co ? B.co[loai] : undefined; }   /* bảng phụ khác (BCDHTD, LEN_31…) */
function kcNguon(K){   /* kỳ của từng nguồn đã nối — ghi trên báo cáo */
  var B = K && K.B || {}, n = B.nguon || {}, tk = (K && K.tk) || {};
  return {hstd:n.hstd || '', dsto:n.dsto || '', nqh:n.nqh || '', nk:n.nk || '', khd:n.khd || '', tk105:tk.tk105 ? tk.tk105.ky : '', tk104:tk.tk104 ? tk.tk104.ky : ''};
}
function kcTK(K, loai){   /* Sao kê TK 104 / 105 gắn theo mã KH → {ky, theo:{kh:[{stk, t105, t105d, ndk…}]}} — dựng lại khi Sao kê đổi bản */
  var c = kcDung(K), b = K && K.tk && K.tk[loai]; if(!c || !b || !b.rows) return null;
  var g = c.gan[loai]; if(g && g.rows===b.rows) return g;
  var theo = {}; b.rows.forEach(function(o){ if(o.kh) (theo[o.kh] = theo[o.kh] || []).push(o); });
  return c.gan[loai] = {ky:b.ky, rows:b.rows, theo:theo};
}
function kcKH(K, kh){   /* 1 khách: dòng gốc + phần gắn thêm */
  var c = kcDung(K); if(!c || !kh) return null;
  var t5 = kcTK(K, 'tk105'), t4 = kcTK(K, 'tk104'), dong = c.theoKH[kh] || [], ma = '';
  dong.some(function(o){ if(o.ku && o.to) ma = o.to; return !!ma; });
  return {kh:kh, dong:dong, lap:c.lap.filter(function(o){ return o.kh===kh; }), tk105:t5 && t5.theo[kh] || [], tk104:t4 && t4.theo[kh] || [], to:ma && c.to[ma] || null};
}
function kcKU(K, ku){ var c = kcDung(K); if(!c || !ku) return null; return {dong:c.theoKU[ku] || null, nqh:c.nqh[ku] || null, nk:c.nk[ku] || null, khd:c.khd[ku] || null}; }
function kcTo(K, ma){ var c = kcDung(K); if(!c || !ma) return {dong:[], lap:[]}; return {dong:c.theoTo[ma] || [], lap:c.lap.filter(function(o){ return o.to===ma; }), to:c.to[ma] || null}; }
