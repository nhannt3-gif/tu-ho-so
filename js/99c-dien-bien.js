/* ===== 3.567 (anh 25/11/2026: "tạo 1 báo cáo theo dõi món vay 3 tháng KHĐ theo xã, điểm giao dịch, hội đoàn thể diễn biến theo từng tháng, đầu năm,
   riêng hiện tại lấy dữ liệu ngày gần nhất" · "coi như đây là 1 chức năng quan trọng có thể theo dõi nhiều sau này"): 📈 DIỄN BIẾN THEO THÁNG =====
   - BỘ MÁY CHUNG: chỉ tiêu khai trong DBT.CHI (k · ten · lay(B) → [{ku, dn, to}]). Thêm chỉ tiêu (QH, khoanh, dư nợ…) = thêm 1 dòng — cùng khung bảng / lọc / Excel.
     Bản này: chỉ tiêu "khd" — món vay 3 tháng KHĐ TỰ TÍNH từ Mẫu 31 của từng kỳ (luật 3.563, slDsNo(B, 'khd')). Kỳ không có Mẫu 31 → "—" (không lấy file mẫu 14, không đoán).
   - (3.567 → 3.570) Báo cáo db_khd bỏ, thay bằng ô "Món vay 3 tháng KHĐ" (js/99d) dùng chung bộ máy này. Bản cũ ghi:
   - CỘT: Đầu năm (Mẫu 31 chốt 12 năm trước) · T1 … các tháng đã chốt · HIỆN TẠI (Mẫu 31 ngày gần nhất đã nạp trong năm, ghi ngày) · Tăng / giảm so đầu năm ·
     Mới / Thoát (hiện tại so tháng chốt liền trước: món mới rơi vào KHĐ · món đã thoát KHĐ). Mỗi kỳ: số món + dư nợ.
   - HÀNG: Xã › Điểm GD › Hội (HND · HPN · HCCB · ĐTN · Vay trực tiếp) + dòng cộng xã / điểm + Tổng; theo lọc Xã / Điểm / Hội / Tổ của Sao kê. Món xếp theo tổ CỦA KỲ ĐÓ.
   - SỔ THEO DÕI: mỗi kỳ tính 1 lần → bản tóm tắt nhỏ lưu trên máy (IndexedDB: dbt|<chỉ tiêu>|<kỳ>|<mã băm Mẫu 31>) — mở lại không phải dựng 13 bộ Mẫu 31;
     thay / nạp lại Mẫu 31 kỳ nào → mã băm đổi → tự tính lại. Chỉ đọc số liệu (qua KHO). Cắm rút: bỏ dòng <script> là mất báo cáo, phần khác không đổi. ES5. */
var DBT = (function(){
  var M = {BAN:3, S:{}, daNap:false, BC:{}};   /* 3.570: BAN 2 — sổ lưu thêm lãi tồn + tên tổ trưởng; BC = {mã báo cáo Sao kê: chỉ tiêu} cần nạp trước */
  M.CHI = [{k:'khd', ten:'món vay 3 tháng KHĐ', nhan:'Diễn biến món vay 3 tháng không hoạt động (KHĐ) — theo tháng, đầu năm, hiện tại; Xã › Điểm GD › Hội',
    lay:function(B){ return slDsNo(B, 'khd'); }},
    /* 3.570 (anh 28/11 "tương tự em có ô Nợ quá hạn, nợ khoanh"): số tiền = dư nợ QH / khoanh của món; tyLe = lưu thêm tổng dư nợ theo tổ (tỷ lệ QH / tổng dư nợ) */
    {k:'qh', ten:'nợ quá hạn', lay:function(B){ return slDsNo(B, 'nqh'); }, so:function(o){ return o.qh||0; }, tyLe:1},
    {k:'kn', ten:'nợ khoanh', lay:function(B){ return slDsNo(B, 'nk'); }, so:function(o){ return o.kn||0; }}];
  M.chi = function(k){ return M.CHI.find(function(c){ return c.k===k; }); };
  /* ---------- 1. kỳ của năm ---------- */
  M.kyNam = function(nam){ var ds = KHO.dsBang('hstd').filter(function(e){ return e && e.ky; }), thang = {}, ngay = [];
    ds.forEach(function(e){ if(e.ky.length===7) thang[e.ky] = e; else ngay.push(e); });
    var dau = thang[(+nam-1)+'-12'] || null, T = Object.keys(thang).filter(function(k){ return k.slice(0, 4)===String(nam); }).sort();
    var hien = ds.filter(function(e){ return String(e.ngay || e.ky).slice(0, 4)===String(nam); }).sort(function(a, b){ var x = a.ngay || tdnCuoiKy(a.ky), y = b.ngay || tdnCuoiKy(b.ky); return x<y ? -1 : (x>y ? 1 : (a.ky.length-b.ky.length)); }).pop() || null;
    var cot = [{nhan:'Đầu năm', phu:'31/12/'+(+nam-1), ky:(+nam-1)+'-12', e:dau, dau:1}];
    var thHien = hien ? slThang(hien.ngay || hien.ky) : '';
    for(var m = 1; m <= 12; m++){ var k = nam+'-'+hai(m); if(!thHien || k>=thHien) break;   /* các tháng trước tháng của "hiện tại"; tháng chưa nạp Mẫu 31 → cột "—" */
      cot.push({nhan:'T'+m, phu:kyVN(k), ky:k, e:thang[k] || null}); }
    if(hien) cot.push({nhan:'Hiện tại', phu:ngayVNsl(hien.ngay || tdnCuoiKy(hien.ky)), ky:hien.ky, e:hien, hien:1});
    return cot; };
  /* ---------- 2. sổ theo dõi 1 kỳ ---------- */
  M.khoa = function(chi, e){ return 'dbt|'+chi+'|'+e.ky+'|'+(e.hash || e.luc || '')+'|'+M.BAN; };
  M.tinh = function(chi, e){ var c = M.chi(chi);
    return KHO.bo(e.ky).then(function(B){ if(!B || B.hsTen!=='Mẫu 31') return {ky:e.ky, ngay:e.ngay, khong:1};
      return KHO.nap(e.ky).then(function(K){ var ku = {}, to = {}, dnTo = null;
        var anh = function(m, t){ if(t && !to[m]) to[m] = {ma:t.ma, ten:t.ten||'', xa:t.xa, tenXa:t.tenXa||'', khoaDiem:t.khoaDiem||'', tenDiem:String(t.tenDiemDu || t.tenDiem || '').replace(/\s*·?\s*ngày\s*\d+.*$/i, ''), dv:String(t.dv||''), thon:t.thon||'', tenThon:t.tenThon||'', trucTiep:!!t.trucTiep}; };
        (c.lay(B) || []).forEach(function(o){ if(!o || !o.ku || ku[o.ku]) return; var m = toMaCua(o), t = KHO.toKy(K, m);
          ku[o.ku] = [m, Math.round(c.so ? c.so(o) : (o.dn||0)), Math.round(laiTon(o)||0)]; anh(m, t); });
        if(c.tyLe){ dnTo = {}; var da = {}; (kcGoc(B) || []).forEach(function(o){ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; var m = toMaCua(o); dnTo[m] = (dnTo[m]||0)+Math.round(o.dn||0); anh(m, KHO.toKy(K, m)); }); }
        return {ky:e.ky, ngay:e.ngay || tdnCuoiKy(e.ky), ku:ku, to:to, dnTo:dnTo}; }); }); };
  M.so = function(chi, e){ var k = M.khoa(chi, e); if(M.S[k]) return Promise.resolve(M.S[k]);
    return docFile(k).then(function(x){ if(x && x.ku){ return M.S[k] = x; }
      return M.tinh(chi, e).then(function(y){ M.S[k] = y; if(!y.khong) luuFile(k, y); return y; }); }); };
  M.napHet = function(chi, cot){ var p = Promise.resolve(), ds = cot.filter(function(c){ return c.e; }), i = 0;
    ds.forEach(function(c){ p = p.then(function(){ i++; if(typeof batChay==='function') batChay(true, 'Diễn biến '+(M.chi(chi).ten)+': đọc kỳ '+i+'/'+ds.length+' ('+c.phu+')…');
      return M.so(chi, c.e).then(function(s){ c.s = s; }, function(){ c.s = null; }); }); });
    return p.then(function(){ if(typeof tatChay==='function') tatChay(); }, function(er){ if(typeof tatChay==='function') tatChay(); throw er; }); };
  /* (3.570: phần gộp + lập báo cáo db_khd của 3.567 bỏ — các bảng ở ô KHĐ js/99d tự gộp từ sổ theo dõi) */
  /* ---------- 5. gắn vào Sao kê ----------
     3.570 (anh 28/11 "bỏ luôn bên nợ cần xử lý" — ô riêng "Món vay 3 tháng KHĐ", js/99d): báo cáo db_khd (3.567) bỏ, thay bằng các bảng của ô; bộ máy giữ.
     Báo cáo nào cần nạp trước các kỳ thì đăng ký M.BC[mã] = chỉ tiêu (vd js/99d). Nạp thêm bộ Mẫu 31 + kỳ của cột "Hiện tại" (M.hienB, M.hienK). */
  M.dangKyBC = function(ma, chi){ M.BC[ma] = chi; };
  if(typeof skXem==='function'){ var cuXem = skXem; skXem = function(){ var C = skCH(), self = this, a = arguments;
      var can = {}; Object.keys(M.BC).forEach(function(k){ if(C.bc && C.bc[k]) [].concat(M.BC[k]).forEach(function(c){ can[c] = 1; }); }); can = Object.keys(can);   /* 3.571: 1 báo cáo có thể cần nhiều chỉ tiêu */
      if(can.length && !M.daNap && SK_K && SK_K.thang){ var nam = SK_K.thang.slice(0, 4), p = Promise.resolve();
        can.forEach(function(chi){ p = p.then(function(){ var cot = M.kyNam(nam); M.cot = {nam:nam, chi:chi, ds:cot}; return M.napHet(chi, cot).then(function(){
          var h = cot.find(function(k){ return k.hien; }); if(!h) return; return KHO.bo(h.ky).then(function(B){ M.hienB = B; return KHO.nap(h.ky); }).then(function(K){ M.hienK = K; M.hienKy = h.ky; }); }); }); });
        return p.then(function(){ M.daNap = true;
       var kq; try{ kq = skXem.apply(self, a); } catch(er){ M.daNap = false; throw er; }
       var het = function(){ M.daNap = false; }; return Promise.resolve(kq).then(het, het);   /* 3.571: cờ giữ tới khi xem xong (2 lớp nạp trước lồng nhau không gọi vòng) */ }, function(er){ if(typeof tatChay==='function') tatChay(); baoLoi('Diễn biến: không đọc được kỳ — '+(er && er.message || er)); }); }
      return cuXem.apply(this, arguments); }; }
  return M;
})();
