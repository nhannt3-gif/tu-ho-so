/* ==========================================================
   3.556 (anh 17/11/2026: "scan cccd 2 mặt trên 1 tờ app chỉ đọc ảnh, ko đọc từ file pdf mà anh scan pdf"; duyệt "mở pdf luôn") — cắm rút
   ① Quét gì? › 🗎 Bản photo CCCD hoặc 🪪 CCCD › 🖼 Ảnh có sẵn: hộp chọn file nhận cả PDF (trước chỉ ảnh — PDF bị mờ, không chọn được).
   ② 🗎 Bản photo CCCD + PDF: mỗi trang PDF → 1 ẢNH NGUYÊN TỜ rồi đi đúng luồng tờ photo (dò 2 khung thẻ / chia đôi tờ → nắn, 📠 Photo rõ,
      ghép mặt trước / sau, đọc số). Không qua lối dò "thẻ trên nền trắng" của js/81 (bản photo scan nền xám, lấm tấm → hay trượt).
   ③ 🪪 CCCD + PDF: giữ nguyên lối js/81 (3.403) — chỉ mở hộp chọn file.
   PDF lỗi / có mật khẩu → báo tên file, ảnh chọn kèm vẫn xử lý. Không đổi Camera, 📄 Tài liệu, ✍ Chữ ký. ES5, 1 gói SCPP.
   ========================================================== */
var SCPP = {
  laPDF: function(f){ return !!f && (f.type==='application/pdf' || /\.pdf$/i.test(f.name||'')); },
  /* 1 file PDF → [File JPG nguyên tờ] (tối đa 40 trang, rộng ~2480 điểm ≈ A4 300 dpi để đọc số rõ) */
  trangRaAnh: function(f){
    return xongTV.then(function(){ return PDFA.mo(f); })
      .then(function(doc){
        var n = Math.min(doc.numPages, 40), ra = [], goc = String(f.name||'photo.pdf').replace(/\.pdf$/i, ''), p = Promise.resolve();
        var lam = function(so){ return PDFA.veTrang(doc, so, {canh:2480, toiDa:5}).then(function(c){ return canvasRaBlob(c, 0.92); })
          .then(function(b){ ra.push(new File([b], goc+(n>1 ? ' tr'+so : '')+'.jpg', {type:'image/jpeg'})); }); };
        for(var so=1; so<=n; so++) p = p.then(lam.bind(null, so));
        return p.then(function(){ return ra; });
      });
  },
  /* hộp chọn ảnh có sẵn ở chế độ Thẻ — như js/12 chonNguon nhánh 'photo', thêm PDF */
  chonFile: function(){
    D.cauHinh.scanNguon = 'photo'; luu(); dongHop();
    var i = document.createElement('input'); i.type = 'file'; i.multiple = true; i.accept = 'image/*,.heic,.heif,.pdf,application/pdf';
    i.onchange = function(){ var fs = Array.prototype.slice.call(i.files); if(fs.length) nhanVaoScan(fs, 'photo'); };
    i.click();
  },
  /* chữ dưới nút 🖼 Ảnh có sẵn */
  doiChu: function(){
    var l = SC.loai; if(l!=='cccd' && l!=='photo') return;
    var m = document.querySelector('#hop-in button[data-lenh="f35.scChonNguon"][data-a1="photo"] .mo-ta'); if(m) m.textContent = 'Ảnh hoặc PDF trong máy';
  }
};
SCPP.chonNguonCu = chonNguon;
chonNguon = function(n){
  if(n==='photo' && SC.che==='the') return SCPP.chonFile();
  return SCPP.chonNguonCu.apply(this, arguments);
};
SCPP.batDauCu = batDauScan;
batDauScan = function(){ var r = SCPP.batDauCu.apply(this, arguments); SCPP.doiChu(); return r; };
SCPP.nhanCu = nhanVaoScan;
nhanVaoScan = function(fs, nguon, daHoi){
  var ds = Array.prototype.slice.call(fs||[]), pdf = ds.filter(SCPP.laPDF);
  if(!pdf.length || SC.che!=='the' || !SC.photo2) return SCPP.nhanCu.apply(this, arguments);   /* 🪪 CCCD + PDF → js/81 như cũ */
  batChay(false, 'Đang mở file PDF…');
  var hong = [];
  return pdf.reduce(function(p, f){ return p.then(function(ra){ return SCPP.trangRaAnh(f).then(function(a){ if(!a.length) hong.push(f); return ra.concat(a); }, function(){ hong.push(f); return ra; }); }); }, Promise.resolve([]))
    .then(function(anh){
      tatChay();
      if(hong.length) setTimeout(function(){ baoLoi('Không mở được '+hong.length+' file PDF: '+hong.map(function(f){ return f.name; }).join(', ')+' — file hỏng hoặc có mật khẩu.'); }, 800);
      var tat = ds.filter(function(f){ return !SCPP.laPDF(f); }).concat(anh);
      if(!tat.length) return;
      return SCPP.nhanCu(tat, nguon, daHoi);
    });
};
