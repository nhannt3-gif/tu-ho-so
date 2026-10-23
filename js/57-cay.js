/* ==========================================================
   3.326 (anh chốt 23/10): CÂY ĐỊA BÀN NHÚNG — 1 chỗ lấy danh sách Xã › Điểm GD › Ấp › Hội › Tổ và vẽ ô chọn kiểu ☰ Gọn
   cho form / hộp khai báo (👪 Hộ vay, lập 01/TD, khai nhanh 01/TGTV, ⚙ Khai báo chung). Khối LỌC ĐỊA BÀN ở các tab vẫn là pvVeCay (js/22g).
   Nơi gọi giữ xử lý riêng (ghi vào hồ sơ của mình) — CAY chỉ trả danh sách + HTML ô chọn cùng 1 kiểu.
   Dữ liệu qua cửa KHO (hmDiaBan đọc KHO.maTo / KHO.to). ES5.
   ========================================================== */
var CAY = (function(){
  var vi = function(a, b){ return String(a).localeCompare(String(b), 'vi', {numeric:true}); };
  function db(){ return hmDiaBan(); }
  /* xã: xã quản lý (Cài đặt › xaQuanLy) lên trước, rồi theo tên */
  function dsXa(){ var X = db(), ql = (D.cauHinh && D.cauHinh.xaQuanLy) || [];
    return Object.keys(X).sort(function(a, b){ var qa = ql.indexOf(X[a].tenXa), qb = ql.indexOf(X[b].tenXa); if((qa<0)!==(qb<0)) return qa<0 ? 1 : -1; return vi(X[a].tenXa, X[b].tenXa); })
      .map(function(k){ return [k, X[k].tenXa]; }); }
  function dsDiem(xa){ var x = db()[xa]; return x ? Object.keys(x.diem).map(function(k){ return [k, x.diem[k]]; }).sort(function(a, b){ return vi(a[1], b[1]); }) : []; }
  /* ấp: khóa = mã thôn (hoặc tên thôn), lọc theo điểm GD nếu có; trả kèm bản ghi gốc {thon, tenThon, diem} */
  function dsAp(xa, diem){ var x = db()[xa]; if(!x) return [];
    return Object.keys(x.ap).map(function(k){ return x.ap[k]; }).filter(function(a){ return !diem || a.diem[diem]; })
      .sort(function(a, b){ return vi(a.tenThon, b.tenThon); }).map(function(a){ return [a.thon || a.tenThon, a.tenThon || a.thon, a]; }); }
  function ap(xa, k){ var x = db()[xa]; return (x && x.ap[k]) || null; }
  /* tổ (bỏ vay trực tiếp) theo S = {xa, diem, thon, tenThon, hoi} — cấp nào trống thì không lọc */
  function dsTo(S){ S = S || {}; if(!KHO.coKy() || !S.xa) return [];
    return KHO.maTo().map(function(m){ return KHO.to(m); }).filter(function(t){ return t && !toLaTT(t) && t.xa===S.xa && (!S.diem || t.khoaDiem===S.diem) &&
        (!(S.thon || S.tenThon) || t.thon===S.thon || t.tenThon===S.tenThon) && (!S.hoi || String(t.dv||'')===String(S.hoi)); })
      .sort(function(a, b){ return vi(a.ten, b.ten); }); }
  function dsHoi(xa){ var r = {}; if(KHO.coKy() && xa) KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(t && !toLaTT(t) && t.xa===xa && t.dv) r[t.dv] = tdnHoi(t.dv) || 'Hội '+t.dv; });
    return Object.keys(r).map(function(k){ return [k, r[k]]; }).sort(function(a, b){ return vi(a[1], b[1]); }); }
  function chuTo(t){ return 'Tổ '+(t.ten||t.ma)+(t.tenThon ? ' · '+pvApNgan(t.tenThon) : ''); }
  /* ô chọn kiểu gọn: cap = xa | diem | ap | hoi | to (màu theo cấp); dau = dòng trống; ds = [[giá trị, chữ]]; tt = thuộc tính (onchange / data-lenh …) */
  function o(cap, gt, dau, ds, tt){ gt = gt==null ? '' : String(gt);
    return '<select class="pv-o cay-o pv-'+cap+(gt ? ' co' : '')+'" '+(tt||'')+'>'+[['', dau]].concat(ds).map(function(x){ return '<option value="'+coChuHTML(String(x[0]))+'"'+(String(x[0])===gt ? ' selected' : '')+'>'+coChuHTML(String(x[1]))+'</option>'; }).join('')+'</select>'; }
  /* 1 dòng: các ô nối bằng › (bỏ ô rỗng) */
  function dong(cac, lop){ return '<span class="cay-nhung'+(lop ? ' '+lop : '')+'"><span class="pv-ghim">📍</span>'+cac.filter(Boolean).join('<span class="pv-sep">›</span>')+'</span>'; }
  return {dsXa:dsXa, dsDiem:dsDiem, dsAp:dsAp, ap:ap, dsTo:dsTo, dsHoi:dsHoi, chuTo:chuTo, o:o, dong:dong, co:function(){ return Object.keys(db()).length>0; }};
})();
