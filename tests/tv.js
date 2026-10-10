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
  await p.route(/cdnjs\.cloudflare\.com/, r=>{
    const u = r.request().url(); let f=null;
    if(/xlsx\.full/.test(u)) f=L+'xlsx-0.18.5/package/dist/xlsx.full.min.js';
    else if(/pdf\.worker/.test(u)) f=L+'pdfjs-dist-3.11.174/package/build/pdf.worker.min.js';
    else if(/pdf\.min/.test(u)) f=L+'pdfjs-dist-3.11.174/package/build/pdf.min.js';
    else if(/pdf-lib/.test(u)) f=L+'pdf-lib-1.17.1/package/dist/pdf-lib.min.js';
    return f ? r.fulfill({path:f, contentType:'text/javascript', headers:{'access-control-allow-origin':'*'}}) : r.abort();
  });
};
