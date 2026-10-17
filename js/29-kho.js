/* ===== 3.216 (anh 15/10/2026): CỬA KHO — kho số liệu chung (KIEN_TRUC_3_LOP 3.5 · QUY_CHUAN_KIEN_TRUC mục 3 "cửa = hợp đồng") =====
   - Mọi tab hỏi số liệu chung (tổ, tổ viên, khách, TK 104, TK 105, CCCD, thành viên TƯ) qua KHO.*, KHÔNG tự đọc TO_K / SL_DB / Sao kê.
   - Bước C1 (KE_HOACH_B_C mục 2): chỉ BỌC hàm sẵn có — bên trong chưa viết lại, kết quả giống hệt trước (phép thử so bản in Giấy lĩnh / Hồ sơ vay trước – sau).
   - Kỳ: các cửa đọc KỲ ĐANG DỰNG (TO_K = kỳ chọn ở dải lịch, dựng bằng KHO.nap). Chưa dựng kỳ → trả null / rỗng, không báo lỗi.
   - Quy tắc nguồn (sổ QT, QUY_CHUAN mục 4) nằm ở hàm được bọc; số QT ghi trên từng cửa. Đổi quy tắc → sửa 1 chỗ, mọi tab theo.
   - Thêm cửa mới: ghi hợp đồng (đầu vào · đầu ra · đơn vị · QT) ngay trên dòng, không đọc biến chung ở tab. */
var KHO = (function(){
  var CCCD_CM = {};
  function co(){ return typeof TO_K!=='undefined' && !!TO_K; }
  function to(ma){ return co() && ma && TO_K.to ? TO_K.to[ma] || null : null; }
  function toThat(ma){ var t = to(ma); return t && !(typeof toLaTT==='function' && toLaTT(t)) ? t : null; }
  return {
    /* KHO.coKy() → true khi đã dựng kỳ (đã nạp Mẫu 31 và mở số liệu) */
    coKy: function(){ return co(); },
    /* KHO.maTo() → [mã tổ] của kỳ đang dựng, kể cả tổ "trực tiếp" (đúng thứ tự cây) · KHO.maDong() → [mã tổ có dòng Mẫu 31] */
    maTo: function(){ return co() ? Object.keys(TO_K.to||{}) : []; },
    maDong: function(){ return co() ? Object.keys(TO_K.kh||{}) : []; },
    /* KHO.coBang(loại, kỳ) → true khi máy đã có bảng file loại đó của kỳ (vd 'hstd' = Mẫu 31) */
    coBang: function(loai, ky){ return typeof SLM!=='undefined' && !!(SLM.bang && SLM.bang[slKhoa(loai, ky)]); },
    /* KHO.ky() → {ky, ngay, ten:'Mẫu 31 dd/mm/yyyy', nguon:{loại: kỳ file}} | null — kỳ đang dựng */
    ky: function(){ return co() ? {ky:TO_K.ky, ngay:TO_K.ngay, thang:TO_K.thang, ten:TO_K.hsTen || '', hsoTen:TO_K.hsoTen, nguon:(TO_K.B && TO_K.B.nguon) || {}} : null; },
    /* KHO.nap(ky) → Promise<kỳ đã dựng> — dựng cây tổ + tổ viên của kỳ (bọc toNap; gán TO_K là việc của tab gọi) */
    nap: function(ky){ return toNap(ky); },
    /* KHO.to(maTo) → đối tượng tổ của kỳ đang dựng (ma, ten, xa, tenXa, diem, khoaDiem, tenDiem, thon, tenThon, cif, ds, tt…) | null · QT-12 */
    to: function(ma){ return to(ma); },
    /* KHO.dsTo() → [tổ] (bỏ tổ giả "trực tiếp") của kỳ đang dựng */
    dsTo: function(){ return co() ? Object.keys(TO_K.to||{}).map(function(m){ return TO_K.to[m]; }).filter(function(t){ return t && !(typeof toLaTT==='function' && toLaTT(t)); }) : []; },
    /* KHO.dongTo(maTo) → [dòng Mẫu 31 kỳ đang dựng của tổ] (kh, ten, cccd, tenThon, tenXa, món…) */
    dongTo: function(ma){ return co() && ma && TO_K.kh ? TO_K.kh[ma] || [] : []; },
    /* KHO.toVien(maTo | tổ) → [tổ viên + trạng thái: còn nợ / tất nợ còn TK 105 / vào / ra…] (bọc toTV) · QT-01…07 */
    toVien: function(x){ var t = typeof x==='string' ? toThat(x) : x; if(!t || !co()) return []; try { return toTV(t); } catch(e){ return []; } },
    /* KHO.bangTo(maTo) → dòng BẢNG TỔ DỰNG SẴN {kh tổ trưởng (Mã CIF TT), cccd, ncap, ccTu, ccLy, han, tk (104), tkTu, tkLy, tkDs, tkTrung, diem…, thieu} | null · QT-12, 13 */
    bangTo: function(ma){ if(!co() || typeof tkBangTo!=='function') return null; var T = tkBangTo(); return T && ma ? T[ma] || null : null; },
    /* KHO.toTruong(tổ) → {kh, tk, tu, ly, ds, trung} — tổ trưởng + TK 104 (bọc tkTT) · QT-12 */
    toTruong: function(t){ return typeof tkTT==='function' ? tkTT(t) : {kh:'', tk:'', tu:'', ly:''}; },
    /* KHO.toTruongKH(tổ) → {kh, cc} — mã KH tổ trưởng: Mã CIF TT → Danh sách tổ → trùng tên (bọc hsoTTKH) · QT-12 */
    toTruongKH: function(t){ return t && typeof hsoTTKH==='function' ? hsoTTKH(t) : {kh:'', cc:''}; },
    /* KHO.khach(maKH, tổ?) → {kh, ten, ns, cccd, ncap, noiCap, ap, tenXa} — danh bạ Mẫu 31 các kỳ + dòng kỳ đang xem (bọc hsoKhach) · QT-13 */
    khach: function(kh, t){ return hsoKhach(kh, t); },
    /* KHO.danhBa(maKH) → bản ghi danh bạ Mẫu 31 các kỳ (sdt, voChong, gt, danToc, to, xa, stk…) | null */
    danhBa: function(kh){ return typeof SL_DB!=='undefined' && SL_DB && SL_DB.kh && kh ? SL_DB.kh[kh] || null : null; },
    /* KHO.voiKy(K, hàm) → chạy hàm với kỳ K (đã dựng bằng KHO.nap) làm kỳ đang dựng rồi trả lại kỳ cũ — đọc kỳ khác không đổi màn hình (3.231) */
    voiKy: function(K, f){ var cu = TO_K; TO_K = K; try { return f(); } finally { TO_K = cu; } },
    /* KHO.phienDanhBa() → đối tượng nhận diện bản danh bạ đang dùng (đổi khi nạp lại) — chỉ để biết khi nào dựng lại chỉ mục (3.228) */
    phienDanhBa: function(){ return typeof SL_DB!=='undefined' ? SL_DB : null; },
    /* KHO.monKH(maKH) → [{ct, ku, dn, nv, gn, qh, kn, dh, to, xong, md, truong, raTruong}] — món theo Mẫu 31 mới nhất (cần slKhMonNap() trước; chưa nạp → []) · 3.228 */
    monKH: function(kh){ return typeof SL_KHMON!=='undefined' && kh ? SL_KHMON[kh] || [] : []; },
    /* KHO.hssvPhu() → [{ten, so (CCCD HSSV), kh, ku, dn, xong}] — HSSV trong món Mẫu 31 mới nhất (cần slKhMonNap()) · 3.228 */
    hssvPhu: function(){ return typeof SL_PHU!=='undefined' ? SL_PHU.filter(function(p){ return p.loai==='hs'; }) : []; },
    /* KHO.coMonMoi() → true khi chỉ mục món đã theo Mẫu 31 mới nhất */
    coMonMoi: function(){ return typeof SL_PHU_KY!=='undefined' && !!SL_PHU_KY && typeof slMau31Moi==='function' && SL_PHU_KY===slMau31Moi(); },
    /* KHO.coDanhBa() → true khi đã có danh bạ (đã nạp Mẫu 31) */
    coDanhBa: function(){ return typeof SL_DB!=='undefined' && !!(SL_DB && SL_DB.kh); },
    /* KHO.dsDanhBa() → [mã KH] trong danh bạ */
    dsDanhBa: function(){ return this.coDanhBa() ? Object.keys(SL_DB.kh) : []; },
    /* KHO.timCCCD(số CCCD) → mã KH trên danh bạ có CCCD đó | '' (chỉ mục dựng lại khi danh bạ đổi) */
    timCCCD: function(cccd){ cccd = String(cccd||'').replace(/\D/g, ''); if(cccd.length<9 || !this.coDanhBa()) return '';
      if(CCCD_CM.db!==SL_DB){ CCCD_CM = {db:SL_DB, m:{}}; Object.keys(SL_DB.kh).forEach(function(k){ var c = String(SL_DB.kh[k].cccd||'').replace(/\D/g, ''); if(c) CCCD_CM.m[c] = k; }); }
      return CCCD_CM.m[cccd] || ''; },
    /* KHO.tim(chuỗi, tối đa) → [{m: mã KH, ten, …}] — tìm tên / CCCD / mã KH / số KU / ngày sinh (bọc slTimKH) */
    tim: function(q, n){ try { return slTimKH(q, n); } catch(e){ return []; } },
    /* KHO.cccd(maKH, tổ?, laTT?) → {cccd, ncap, noiCap, ns, tu (nguồn), ly (lý do thiếu), han:{kq, chu, den}} (bọc cccdCua) · QT-13 */
    cccd: function(kh, t, laTT){ return cccdCua(kh, t, laTT); },
    /* KHO.hanCCCD(số, ngày sinh, ngày cấp) → {kq:'ok'|'sap'|'het'|'?', chu, den} (bọc toCCCDHan) · QT-13 */
    hanCCCD: function(so, ns, ncap){ return toCCCDHan(so, ns, ncap); },
    /* KHO.tk105(maKH) → {ds:[{stk, t105, ndk}], ky, trung, daChon} | null — Sao kê TK 105 gắn kỳ đang dựng; TK anh chọn đứng đầu (bọc tkCua) · QT-11 */
    tk105: function(kh){ return typeof tkCua==='function' ? tkCua('tk105', kh) : null; },
    /* KHO.tk104(maKH tổ trưởng) → như tk105, Sao kê TK 104 (chỉ tham khảo — TK đang dùng ở KHO.bangTo) · QT-12 */
    tk104: function(kh){ return typeof tkCua==='function' ? tkCua('tk104', kh) : null; },
    /* KHO.saoKe(loại 'tk104'|'tk105') → {ky, rows} | null — bảng Sao kê gắn kỳ đang dựng */
    saoKe: function(loai){ return typeof tkBang==='function' ? tkBang(loai) : null; },
    /* KHO.thanhVienTW() → đối chiếu Mẫu 01/TV với app (cần cho ra khỏi tổ…) | null (bọc tvDoiChieu) · QT-14 */
    thanhVienTW: function(){ return co() && typeof tvDoiChieu==='function' ? tvDoiChieu(TO_K.B) : null; },
    /* KHO.tv01(maKH) → dòng Mẫu 01/TV của khách | null · QT-14 */
    tv01: function(kh){ return typeof tv01Cua==='function' ? tv01Cua(kh) : null; }
  };
})();

/* ---------- lõi kho (dời từ js/25 ở 3.216 — giữ tên hàm cũ để mọi chỗ gọi cũ vẫn chạy; tab mới gọi qua KHO.*) ---------- */
function hsoKhach(kh, t){   /* nhân thân khách: danh bạ (Mẫu 31 các kỳ) + dòng Mẫu 31 kỳ đang xem */
  var c = (SL_DB && SL_DB.kh && SL_DB.kh[kh]) || {}, r0 = ((TO_K && t && TO_K.kh[t.ma]) || []).find(function(o){ return o.kh===kh && o.cccd; }) || {};
  var g = function(f){ return c[f] || r0[f] || ''; };
  return {kh:kh, ten:g('ten'), ns:g('ns'), cccd:g('cccd'), ncap:g('ncap'), noiCap:g('noiCap'), ap:hsoApTen({tenThon:g('tenThon')}) || (t ? hsoApTen(t) : ''), tenXa:g('tenXa') || (t ? t.tenXa : '')};
}
function hsoTTKH(t){   /* mã KH của tổ trưởng: DSTO / Thông tin tổ trưởng; không có → tổ viên trùng tên (chỉ 1 người) */
  if(t.cif) return {kh:t.cif, cc:'Mã CIF TT (Mẫu 31 / Mẫu 18)'};   /* 3.201: hệ thống ghi sẵn mã KH tổ trưởng trên từng dòng */
  var m = (t.ds && t.ds.ttKH) || (t.tt && t.tt.ttKH) || ''; if(m) return {kh:m, cc:'mã KH tổ trưởng trên Danh sách tổ'};
  var ds = {}; ((TO_K && TO_K.kh[t.ma]) || []).forEach(function(o){ if(o.kh && slChuan(o.ten)===slChuan(t.ten)) ds[o.kh] = 1; });
  var k = Object.keys(ds); return k.length===1 ? {kh:k[0], cc:'tổ viên trùng tên tổ trưởng'} : {kh:'', cc:''};
}
