// định tuyến cdnjs → bản npm cùng phiên bản trong thư mục nháp
const L = __dirname+'/lib/';
module.exports = async function(p){
  await p.route(/cdnjs\.cloudflare\.com/, r=>{
    const u = r.request().url(); let f=null;
    if(/xlsx\.full/.test(u)) f=L+'xlsx-0.18.5/package/dist/xlsx.full.min.js';
    else if(/pdf\.worker/.test(u)) f=L+'pdfjs-dist-3.11.174/package/build/pdf.worker.min.js';
    else if(/pdf\.min/.test(u)) f=L+'pdfjs-dist-3.11.174/package/build/pdf.min.js';
    else if(/pdf-lib/.test(u)) f=L+'pdf-lib-1.17.1/package/dist/pdf-lib.min.js';
    return f ? r.fulfill({path:f, contentType:'text/javascript', headers:{'access-control-allow-origin':'*'}}) : r.abort();
  });
};
