// định tuyến cdnjs → bản npm cùng phiên bản trong thư mục nháp
const L = __dirname+'/lib/';
module.exports = async function(p){
  /* 3.143 (Q14): file không ghi ngày trong nội dung → app bắt anh khai ngày khi nạp (kq.canKhai, gợi ý kq.goiYTen).
     Bộ file GIẢ (KHĐ, Nợ khoanh, Thông tin tổ trưởng…) chỉ có ngày trên tên file → phép thử cũ giả lập "anh bấm dùng ngày tên file"
     đúng như cách app làm trước 3.143. Phép thử riêng cho phần khai ngày (t139) đặt window.KHAI_TU_DONG = false để tắt. */
  await p.addInitScript(() => {
    window.addEventListener('DOMContentLoaded', () => {
      if(typeof window.slDocFile!=='function' || window.slDocFile.__khai) return;
      const goc = window.slDocFile;
      const boc = function(){ return goc.apply(this, arguments).then(kq => {
        if(window.KHAI_TU_DONG!==false && kq && kq.canKhai && !kq.ky && kq.goiYTen){
          const L = slLoai(kq.loai); let ng = kq.goiYTen;
          if(L.tuyMoi && ng!==tdnCuoiKy(ng.slice(0, 7))) ng = tdnCuoiKy(ng.slice(0, 7));
          kq.ngay = ng; kq.nguonKy = 'tên file'; kq.ky = slKyTu(L, ng);
        }
        return kq; }); };
      boc.__khai = true; window.slDocFile = boc;
    });
  });
  await p.route(/cdn\.jsdelivr\.net/, r=>{   /* 3.231: thư viện bản điện thoại (npm cùng bản trong tests/lib) */
    const u = r.request().url(); let f=null, ct='text/javascript';
    if(/framework7@8\.3\.4\/framework7-bundle\.min\.css/.test(u)){ f=L+'framework7-8.3.4/package/framework7-bundle.min.css'; ct='text/css'; }
    else if(/framework7@8\.3\.4\/framework7-bundle\.min\.js/.test(u)) f=L+'framework7-8.3.4/package/framework7-bundle.min.js';
    else if(/dompurify@3\.2\.6/.test(u)) f=L+'dompurify-3.2.6/package/dist/purify.min.js';
    else if(/pdf-lib@1\.17\.1/.test(u)) f=L+'pdf-lib-1.17.1/package/dist/pdf-lib.min.js';
    else if(/jsqr@1\.4\.0/.test(u)) f=L+'jsqr-1.4.0/package/dist/jsQR.js';
    else if(/heic-to@1\.6\.5\/dist\/iife\/heic-to\.js/.test(u)) f=L+'heic-to-1.6.5/package/dist/iife/heic-to.js';   /* 3.289: đọc ảnh HEIC iPhone */   /* 3.264: đọc mã QR CCCD */
    else if(/tesseract\.js@v?5\.1\.1\/dist\/tesseract\.min\.js/.test(u)) f=L+'tesseract.js-5.1.1/package/dist/tesseract.min.js';   /* 3.269: đọc 3 dòng mã máy đọc (Tesseract) */
    else if(/tesseract\.js@v?5\.1\.1\/dist\/worker\.min\.js/.test(u)) f=L+'tesseract.js-5.1.1/package/dist/worker.min.js';
    else if(/tesseract\.js-core@v?5/.test(u)){ f=L+'tesseract.js-core-5.1.0/package/'+u.split('/').pop(); if(/\.wasm$/.test(u)) ct='application/wasm'; }
    else if(/@tesseract\.js-data\/eng\/.*eng\.traineddata/.test(u)){ f=L+'tesseract.js-data-eng-1.0.0/package/4.0.0_best_int/eng.traineddata.gz'; ct='application/octet-stream'; }
    return f ? r.fulfill({path:f, contentType:ct, headers:{'access-control-allow-origin':'*'}}) : r.abort();
  });
  await p.route(/cdnjs\.cloudflare\.com/, r=>{
    const u = r.request().url(); let f=null;
    if(/xlsx\.full/.test(u)) f=L+'xlsx-0.18.5/package/dist/xlsx.full.min.js';
    else if(/pdf\.worker/.test(u)) f=L+'pdfjs-dist-3.11.174/package/build/pdf.worker.min.js';
    else if(/pdf\.min/.test(u)) f=L+'pdfjs-dist-3.11.174/package/build/pdf.min.js';
    else if(/pdf-lib/.test(u)) f=L+'pdf-lib-1.17.1/package/dist/pdf-lib.min.js';
    return f ? r.fulfill({path:f, contentType:'text/javascript', headers:{'access-control-allow-origin':'*'}}) : r.abort();
  });
};
