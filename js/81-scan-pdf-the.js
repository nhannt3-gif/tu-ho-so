/* ==========================================================
   3.403 (anh 29/10/2026, ảnh CCCD lưu dạng PDF — thẻ nhỏ giữa trang trắng: "khi cccd đã lưu dưới dạng pdf anh cũng cần nhận biết và cắt được luôn") — cắm rút
   ① Chế độ 🪪 Thẻ (Quét CCCD) NHẬN PDF (trước bỏ qua): mỗi trang dò 1–2 thẻ trên nền trắng → cắt sát (chừa lề trắng) → thành ẢNH mặt thẻ,
      đi đúng luồng ảnh chụp (nắn, nhận mặt trước / sau, ghép cặp, đọc số, lưu, in 4 người / A4). Hiện lại "+ Thêm PDF" ở hàng chờ thẻ.
   ② Chế độ 📄 Tài liệu: KHÔNG tự cắt (tài liệu thật có thể có ảnh dán) — chỉ khi MỌI trang PDF đều chỉ là thẻ trên nền trắng thì nhắc
      "🪪 Chuyển sang Quét CCCD để cắt" (bấm mới làm như ①).
   ③ Bản CCCD đã lưu dạng PDF trên Drive (Đọc CCCD / Rà): trước chỉ cắt được khi 1 trang có đủ 2 mặt → nay cắt được cả mỗi trang 1 mặt (trang 1 + 2).
   Không đổi luồng ảnh chụp. ES5.
   ========================================================== */
/* dò thẻ trên 1 trang (canvas) → [canvas thẻ có lề trắng] (1–2, trên → dưới, trái → phải) | null. chiThe: ngoài các thẻ gần như toàn nền */
function scDoThe(c){
  var s = Math.min(1, 600/c.width), w = Math.max(1, Math.round(c.width*s)), h = Math.max(1, Math.round(c.height*s));
  var t = document.createElement('canvas'); t.width = w; t.height = h; var g = t.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.drawImage(c, 0, 0, w, h);
  var d = g.getImageData(0, 0, w, h).data, L = function(i){ return d[i]*0.3+d[i+1]*0.59+d[i+2]*0.11; };
  var goc = [[2, 2], [w-3, 2], [2, h-3], [w-3, h-3]].map(function(p){ return L((p[1]*w+p[0])*4); }).sort(function(a, b){ return a-b; }), nen = (goc[1]+goc[2])/2;
  if(nen < 200) return null;   /* nền không phải giấy trắng (ảnh chụp, bản scan tối) → không phải kiểu "thẻ trên trang trắng" */
  var M = new Uint8Array(w*h), i, tong = 0;
  for(i=0;i<w*h;i++){ var j = i*4, mx = Math.max(d[j], d[j+1], d[j+2]), mn = Math.min(d[j], d[j+1], d[j+2]); M[i] = (Math.abs(L(j)-nen)>12 || mx-mn>18) ? 1 : 0; tong += M[i]; }
  var dai = function(n, f, nguong, khe){ var ra = [], vao = -1, lo = -1, k;
    for(k=0;k<=n;k++){ var co = k<n && f(k)>nguong; if(co){ if(vao<0) vao = k; lo = k; } else if(vao>=0 && k-lo>khe){ ra.push([vao, lo]); vao = -1; } }
    if(vao>=0) ra.push([vao, lo]); return ra; };
  var hop = [];
  dai(h, function(yy){ var n = 0; for(var xx=0;xx<w;xx++) n += M[yy*w+xx]; return n/w; }, 0.02, Math.round(h*0.015)).forEach(function(b){
    if(b[1]-b[0] < h*0.04) return;
    dai(w, function(xx){ var n = 0; for(var yy=b[0];yy<=b[1];yy++) n += M[yy*w+xx]; return n/(b[1]-b[0]+1); }, 0.05, Math.round(w*0.02)).forEach(function(o){
      var cw = o[1]-o[0]+1, ch = b[1]-b[0]+1, r = cw/ch;
      if(r>2.7 && r<3.6){ var gi = o[0]+Math.round(cw/2); hop.push([o[0], b[0], gi-1, b[1]], [gi, b[0], o[1], b[1]]); }   /* 2 mặt dính nhau → chia giữa */
      else hop.push([o[0], b[0], o[1], b[1]]); }); });
  var dt = function(q){ return (q[2]-q[0]+1)*(q[3]-q[1]+1); };
  var the = hop.filter(function(q){ var cw = q[2]-q[0]+1, r = cw/(q[3]-q[1]+1); return r>1.35 && r<1.85 && cw>w*0.2; }).sort(function(a, b){ return dt(b)-dt(a); }).slice(0, 2);
  if(!the.length || (the.length===2 && dt(the[1]) < dt(the[0])*0.6)) the = the.slice(0, 1);
  if(!the.length) return null;
  var trong = 0; the.forEach(function(q){ for(var yy=q[1];yy<=q[3];yy++) for(var xx=q[0];xx<=q[2];xx++) trong += M[yy*w+xx]; });
  if(tong - trong > w*h*0.01) return null;   /* ngoài thẻ còn nhiều chữ / hình → trang tài liệu, không cắt */
  the.sort(function(a, b){ return Math.abs(a[1]-b[1]) < h*0.03 ? a[0]-b[0] : a[1]-b[1]; });
  return the.map(function(q){
    var x0 = Math.round(q[0]/s), y0 = Math.round(q[1]/s), x1 = Math.round((q[2]+1)/s), y1 = Math.round((q[3]+1)/s), cw = x1-x0, ch = y1-y0, le = Math.round(cw*0.06);
    var r = document.createElement('canvas'); r.width = cw+2*le; r.height = ch+2*le; var rg = r.getContext('2d'); rg.fillStyle = '#fff'; rg.fillRect(0, 0, r.width, r.height);
    rg.drawImage(c, x0, y0, cw, ch, le, le, cw, ch); return r; });
}
/* 1 trang pdf.js → canvas (rộng ~1800 điểm) */
function scVeTrang(doc, so){
  return doc.getPage(so).then(function(pg){
    var v0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:Math.min(4, 1800/v0.width)}), c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
    return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return c; }); });
}
/* file PDF → {anh:[File ảnh thẻ], moiTrang:bool (mọi trang đều chỉ là thẻ)} */
function scPDFThe(f){
  if(!sanSangPDF()) return Promise.resolve({anh:[], moiTrang:false});
  return f.arrayBuffer().then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; }).then(function(doc){
    var n = Math.min(doc.numPages, 40), anh = [], du = true, goc = String(f.name||'the.pdf').replace(/\.pdf$/i, '');
    var lam = function(so){ return scVeTrang(doc, so).then(function(c){ var ds = scDoThe(c); if(!ds){ du = false; return; }
      return ds.reduce(function(p, x, k){ return p.then(function(){ return canvasRaBlob(x, 0.92).then(function(b){ anh.push(new File([b], goc+' tr'+so+(ds.length>1 ? '-'+(k+1) : '')+'.jpg', {type:'image/jpeg'})); }); }); }, Promise.resolve()); }); };
    var p = Promise.resolve(); for(var so=1; so<=n; so++) p = p.then(lam.bind(null, so));
    return p.then(function(){ return {anh:anh, moiTrang:du && anh.length>0}; });
  }).catch(function(){ return {anh:[], moiTrang:false}; });
}
var SC_PDF_THE = null;   /* ② {files:[File PDF], nguon:[mã nguồn trang PDF trong hàng]} — PDF ở chế độ Tài liệu mà toàn trang là thẻ */
var SC81_NHAN = nhanVaoScan;
nhanVaoScan = function(fs, nguon, daHoi){
  var la = function(f){ return f && (f.type==='application/pdf' || /\.pdf$/i.test(f.name||'')); }, pdf = (fs||[]).filter(la);
  if(!pdf.length) return SC81_NHAN(fs, nguon, daHoi);
  if(SC.che==='the'){   /* ① PDF → ảnh mặt thẻ, rồi đi luồng ảnh */
    batChay(false, 'Đang tìm thẻ trong PDF…');
    return pdf.reduce(function(p, f){ return p.then(function(ra){ return scPDFThe(f).then(function(r){ if(r.anh.length) return ra.concat(r.anh); ra.khong = (ra.khong||[]).concat([f]); return ra; }); }); }, Promise.resolve([]))
      .then(function(anh){ tatChay(); var khac = fs.filter(function(f){ return !la(f); });
        if(anh.khong && anh.khong.length) setTimeout(function(){ bao('Không tìm thấy thẻ trong '+anh.khong.length+' file PDF ('+anh.khong.map(function(f){ return f.name; }).join(', ')+') — PDF tài liệu dùng chế độ 📄 Tài liệu.', 7); }, 800);
        if(!anh.length && !khac.length){ moHangCho(); return; }
        return SC81_NHAN(khac.concat(anh), nguon, daHoi); });
  }
  var truoc = {}; HANG.forEach(function(x){ if(x.nguon) truoc[x.nguon] = 1; });
  SC_PDF_THE = null;
  Promise.all(pdf.map(function(f){ return scPDFThe(f).then(function(r){ return r.moiTrang ? f : null; }); })).then(function(ds){   /* ② chỉ dò để nhắc, không cắt */
    var the = ds.filter(Boolean); if(!the.length || the.length!==pdf.length || fs.length!==pdf.length) return;
    var ng = []; HANG.forEach(function(x){ if(x.kieu==='trang' && x.nguon && !truoc[x.nguon] && ng.indexOf(x.nguon)<0) ng.push(x.nguon); });
    SC_PDF_THE = {files:the, nguon:ng}; scNhacThe();
  });
  return SC81_NHAN(fs, nguon, daHoi);
};
var SC81_MO = moHangCho;
moHangCho = function(){ var r = SC81_MO.apply(this, arguments); scNutPDFThe(); scNhacThe(); return r; };
function scDK(){ if(scDK.xong || typeof GD==='undefined') return; scDK.xong = 1;
  GD.dangKy('scpdf', {the:function(){ scSangThe(); }, them:function(){ chonTepPDF(function(fs){ nhanVaoScan(fs, 'file', 1); }); }}); }
function scNutPDFThe(){   /* ① hàng chờ thẻ: hiện lại "+ Thêm PDF" */
  if(SC.che!=='the') return; var h = document.getElementById('hop-in'); if(!h || h.querySelector('.sc-them-pdf')) return;
  var q = h.querySelector('button[onclick^="quetThemHang"]'); if(!q) return; scDK();
  q.insertAdjacentHTML('afterend', '<button class="nho sc-them-pdf" data-lenh="scpdf.them" title="CCCD đã lưu dạng PDF — app tìm thẻ trong từng trang, cắt sát như ảnh chụp">+ Thêm PDF</button>');
}
function scNhacThe(){   /* ② dòng nhắc ở hàng chờ Tài liệu */
  var S = SC_PDF_THE, h = document.getElementById('hop-in'); if(!S || SC.che==='the' || !h || h.querySelector('.sc-nhac-the')) return;
  if(!HANG.length || HANG.some(function(x){ return !(x.kieu==='trang' && S.nguon.indexOf(x.nguon)>=0); })) return;   /* hàng chờ chỉ có các trang PDF này */
  var tit = h.querySelector('.hop-tit'); if(!tit) return; scDK();
  tit.insertAdjacentHTML('afterend', '<div class="sl-bao vang sc-nhac-the">🪪 PDF này giống <b>CCCD</b> (mỗi trang chỉ có thẻ trên nền trắng). <button class="nho chinh" data-lenh="scpdf.the">🪪 Chuyển sang Quét CCCD để cắt</button> <small>Không bấm thì giữ nguyên trang PDF như cũ.</small></div>');
}
function scSangThe(){
  var S = SC_PDF_THE; if(!S) return; SC_PDF_THE = null;
  HANG = HANG.filter(function(x){ return !(x.kieu==='trang' && S.nguon.indexOf(x.nguon)>=0); });
  S.nguon.forEach(function(n){ xoaFile('hs_'+n); if(typeof PDF_NHO!=='undefined') delete PDF_NHO[n]; });
  SC.che = 'the'; ghiHang(); dongHop();
  nhanVaoScan(S.files, 'file', 1);
}
/* ③ bản CCCD lưu PDF trên Drive: trang 1 không cắt được 2 mặt → thử mỗi trang 1 mặt (trang 1 + trang 2) */
var SC81_CAT = typeof sxCatTuPDF==='function' ? sxCatTuPDF : null;
if(SC81_CAT) sxCatTuPDF = function(k, lan){
  if(k.catBo || !k.driveId || !coTheNoiDrive() || typeof taiPDFDrive!=='function') return SC81_CAT(k, lan);
  return xongTV.then(function(){ if(!sanSangPDF()) return null; return canToken(); }).then(function(co){ if(!co) return null; return taiPDFDrive(k.driveId).then(function(b){ return b.arrayBuffer(); }); })
    .then(function(ab){ if(!ab) return null; return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; })
    .then(function(doc){ if(!doc || doc.numPages<2) return null;
      return scVeTrang(doc, 1).then(function(c1){ if(sxCatThe(c1, lan) || sxCatThe2(c1)) return null;   /* trang 1 đủ 2 mặt → cách cũ */
        return scVeTrang(doc, 2).then(function(c2){ var a = scDoThe(c1), b = scDoThe(c2); return a && b && a.length===1 && b.length===1 ? [a[0], b[0]] : null; }); }); })
    .catch(function(){ return null; })
    .then(function(hai){
      if(!hai) return SC81_CAT(k, lan);
      return Promise.all(hai.map(function(x){ return canvasRaBlob(x, 0.92); })).then(function(bs){
        return luuAnhHS(k.id+'_matTruoc', bs[0]).then(function(){ return luuAnhHS(k.id+'_matSau', bs[1]); }).then(function(){
          k.catTuPDF = true; k.catLan = lan||0; delete k.catDuyet; delete k.catHong; delete k.catLoi; if(!k.che) k.che = 'the'; k.matTruoc = true; k.matSau = true; delete k.anhThu;
          if(typeof CO_ANH!=='undefined') CO_ANH[k.id] = true; luu(); if(coTheNoiDrive() && typeof sxDayAnh==='function') sxDayAnh(k);
          return bs; }); });
    });
};
