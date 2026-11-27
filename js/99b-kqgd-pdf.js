/* ===== 3.566 (anh 22–24/11/2026: "thêm 1 chỗ nạp các file KQGD … và chấm điểm CLT và có thể tự đọc PDF và nhận diện chính xác" · "PDF này xuất từ hệ thống" ·
   "TM KQGD anh hay chép coi như nguồn chưa xử lý, khi xử lý rồi thì đưa vào kho tủ hồ sơ" · "tạm chưa dời, chỉ chép thêm vào kho"): 📄 NẠP PDF HỆ THỐNG =====
   - PDF xuất từ hệ thống CÓ LỚP CHỮ → đọc chữ + TỌA ĐỘ (pdf.js), KHÔNG OCR. Thuật toán chuyển từ script giao ban 06_CONG_CU/v2 (kqgd.py, kqgd13.py).
   - KQGD (Mẫu số 13/GDX và mẫu cũ): số xếp vào cột theo MÉP PHẢI (tọa độ cột của script giao ban), dòng Hội (STT 0) · tổ · dòng chương trình (100 / 101) · Cộng / Tổng cộng;
     tên dài xuống dòng → ghép vào dòng tổ. Ngày = "Ngày giao dịch" (mẫu 13/GDX ghi tháng/ngày/năm). Loại động kqgd_<MÃ ĐIỂM> (1 ô / điểm × ngày), tên chuẩn KQGD_<MÃ ĐIỂM>_<ngày>.pdf.
     Tự kiểm: cộng các tổ = dòng Hội (dư nợ) → lệch thì cảnh báo. Đơn vị lưu: ĐỒNG.
   - CLT02 PDF (Mẫu số 02/CLT): dựng lại bảng theo dòng đánh số cột 1…16 có sẵn trong file → dùng lại nguyên bộ đọc CLT02 Excel (js/95) — cùng ô, cùng kết quả.
   - 📥 Lấy từ hộp đến (⋯ Nạp & KT): Google Picker chọn file ở thư mục hộp đến (X_GoDau/2. KQGD — nhớ thư mục lần trước) → đọc → xem trước như Nạp file.
     CHỈ CHÉP vào kho (Số liệu/<tháng>/ tên chuẩn) — KHÔNG dời / xóa file gốc (anh 24/11). File đã nạp nhận ra theo nội dung (mã băm) → không nạp trùng.
   - Sao kê › Thông tin tổ: "Đối chiếu KQGD ↔ Mẫu 31" — từng Hội và từng tổ của điểm: dư nợ, QH, khoanh, lãi tồn, tiền gửi (KQGD chỉ đối chiếu — PHOI_HOP_CHUNG mục 3).
   Đã chạy thử trên file THẬT (chỉ đếm, không lưu): 3 KQGD (2 mẫu 13/GDX + 1 mẫu cũ) — cộng tổ = dòng Hội ở mọi Hội, Cộng = tổng Hội; 2 CLT02 (tháng, định kỳ) — số tổ Tốt/Khá/TB/Yếu
   từng Hội khớp dòng Hội, điểm = tổng 5 tiêu chí. Tật của file thật đã xử lý: chữ có dấu bị tách mảnh (ghép lại), tên dài căn giữa ô (phần trên + dưới dòng STT), mẫu cũ in 2 hàng so le.
   Cắm rút: bỏ dòng <script> là nạp chỉ nhận Excel như cũ. ES5. */
var KQPDF = (function(){
  var M = {SO:/^[\d.,]+$/};
  /* ---------- 1. chữ + tọa độ → dòng ---------- */
  M.dong = function(ab){ return PDFA.mo(ab).then(function(doc){ var ds = [], p = Promise.resolve();
    for(var i = 1; i <= doc.numPages; i++) (function(i){ p = p.then(function(){ return doc.getPage(i).then(function(pg){ var h = pg.getViewport({scale:1}).height;
      return pg.getTextContent().then(function(tc){ var W = [];
        tc.items.forEach(function(it){ var s = String(it.str||''); if(!s.trim()) return; var x = it.transform[4], y = h-it.transform[5], w = it.width || 0, n = s.length || 1, pos = 0;
          s.split(/(\s+)/).forEach(function(t){ if(t.trim()) W.push({s:t.normalize ? t.normalize('NFC') : t, x0:x+w*pos/n, x1:x+w*(pos+t.length)/n, y:y}); pos += t.length; }); });
        W.sort(function(a, b){ return a.y-b.y || a.x0-b.x0; }); var L = [];
        W.forEach(function(w){ var d = L[L.length-1]; if(d && Math.abs(d.y-w.y)<=2.5) d.w.push(w); else L.push({y:w.y, trang:i, w:[w]}); });
        L.forEach(function(d){ d.w.sort(function(a, b){ return a.x0-b.x0; }); d.w = M.ghep(d.w); d.chu = d.w.map(function(w){ return w.s; }).join(' '); ds.push(d); }); }); }); }); })(i);
    return p.then(function(){ return ds; }); }); };
  /* pdf.js tách chữ có dấu thành mảnh ("K","Ế","T" sát nhau) → ghép mảnh liền nhau (cách < 1,5 pt) thành 1 chữ (file KQGD thật 19/11/2026) */
  M.ghep = function(W){ var r = []; W.forEach(function(w){ var p = r[r.length-1]; if(p && w.x0-p.x1<1.5 && w.x0>=p.x0){ p.s = (p.s+w.s).normalize ? (p.s+w.s).normalize('NFC') : p.s+w.s; p.x1 = Math.max(p.x1, w.x1); } else r.push({s:w.s, x0:w.x0, x1:w.x1, y:w.y}); }); return r; };
  /* ---------- 2. KQGD ---------- */
  M.COT13 = [['sokh', 185], ['cv', 250], ['tn', 304], ['dn', 370], ['qh', 428], ['tlqh', 463], ['kn', 514], ['tlkn', 547], ['tl', 607], ['lt', 665], ['tg', 720], ['ndh', 787], ['ndhpk', 847], ['ndhkc', 909]];
  M.COTCU = [['sokh', 159], ['cv', 229], ['tn', 298], ['dn', 383], ['qh', 452], ['tlqh', 490], ['tl', 549], ['lt', 612], ['thuTK', 675], ['chiTK', 733], ['ckGoc', 789], ['ckLai', 841], ['tg', 914]];
  M.NH = [['hoi nong dan', 'HND'], ['hoi lien hiep phu nu', 'HPN'], ['hoi phu nu', 'HPN'], ['hoi cuu chien binh', 'HCCB'], ['doan thanh nien', 'DTN'], ['cho vay truc tiep', 'TT']];
  M.laKQGD = function(L){ return L.some(function(d){ return /K[ẾE]T QU[ẢA] GIAO D[ỊI]CH/i.test(d.chu); }); };
  M.so = function(s, k, moi){ s = String(s);
    if(k==='tlqh' || k==='tlkn' || (!moi && k==='sokh')) return parseFloat(s.replace(/\./g, '').replace(',', '.')) || 0;
    if(k==='sokh') return +s.replace(/[.,]/g, '') || 0;
    return (parseFloat(s.replace(/\./g, '').replace(',', '.')) || 0)*(moi ? 1000 : 1); };
  M.docKQGD = function(L){
    var moi = L.some(function(d){ return /13\/GDX/.test(d.chu); }), C = moi ? M.COT13 : M.COTCU, ngay = '', diem = '', xa = '', m;
    L.some(function(d){ m = moi ? /Ng[àa]y giao d[ịi]ch\s*:?\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/i.exec(d.chu) : /Ng[àa]y\s*:?\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/i.exec(d.chu);
      if(m) ngay = moi ? m[3]+'-'+hai(+m[1])+'-'+hai(+m[2]) : m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]); return !!m; });
    L.some(function(d){ m = /[ĐD]I[ỂE]M GIAO D[ỊI]CH\s*:?\s*(.+?)(?:\s+(?:X[ÃA]|PH[ƯU][ỜO]NG|TH[ỊI] TR[ẤA]N)\s+(.+))?$/i.exec(d.chu);
      if(m && /T[ẠA]I [ĐD]I[ỂE]M|[ĐD]I[ỂE]M GIAO D[ỊI]CH\s*:/i.test(d.chu)){ diem = m[1].trim(); xa = (m[2]||'').replace(/^(X[ÃA]|PH[ƯU][ỜO]NG)\s+/i, '').trim(); return true; } return false; });
    var rows = [], hoi = '', phu = [];
    L.forEach(function(d){ var w = d.w, s0 = w[0].s, laSTT = /^\d+$/.test(s0) && w[0].x0<40;
      var chu = w.filter(function(x, j){ return x.x1<150 && !(laSTT && j===0); }).map(function(x){ return x.s; }).join(' ');
      var so = {}, coSo = false; w.forEach(function(x){ if(x.x1<150 || !M.SO.test(x.s)) return; var c = null, g = 99;
        C.forEach(function(k){ var e = Math.abs(k[1]-x.x1); if(e<g){ g = e; c = k[0]; } }); if(g<=12){ so[c] = M.so(x.s, c, moi); coSo = true; } });
      if(laSTT){ var r = {stt:+s0}; for(var k in so) r[k] = so[k]; r._s = s0; r._y = d.y; r._tr = d.trang; r._co = coSo; r._p = chu ? [{y:d.y, s:chu}] : []; rows.push(r); return; }
      if(!/^(Trang|Stt|Doanh|Ph[âa]n|K[ỳy]|[ĐD][ơo]n v[ịi]|Ng[àa]y)/i.test(chu)) phu.push({y:d.y, tr:d.trang, chu:chu, so:so, co:coSo}); });
    /* dòng phụ: tên dài bị ngắt (căn giữa ô → trên / dưới dòng STT) · mẫu cũ in số và tên 2 hàng so le (~3 pt) → gắn vào dòng STT gần nhất cùng trang (≤ 12 pt) */
    phu.forEach(function(x){ var g = 13, r0 = null; rows.forEach(function(r){ var e = Math.abs(r._y-x.y); if(r._tr===x.tr && e<g){ g = e; r0 = r; } }); if(!r0) return;
      if(x.co){ for(var k in x.so) if(r0[k]===undefined) r0[k] = x.so[k]; r0._co = true; }
      if(x.chu) r0._p.push({y:x.y, s:x.chu}); });
    /* xếp loại dòng SAU khi ghép tên (theo thứ tự trong file) */
    rows = rows.filter(function(r){ r.ten = r._p.sort(function(a, b){ return a.y-b.y; }).map(function(a){ return a.s; }).join(' '); return !!r.ten; });
    rows.forEach(function(r){ var s0 = r._s, c0 = slChuan(r.ten); r.hoi = hoi;
      if(s0==='0'){ var h = M.NH.find(function(n){ return c0.indexOf(n[0])===0; }); hoi = h ? h[1] : ''; r.cap = h ? 'hoi' : 'khac'; r.hoi = hoi; }
      else if(s0==='100' && /^tong cong/.test(c0)){ r.cap = 'tong'; hoi = ''; r.hoi = ''; }
      else if(s0==='100' && /^cong/.test(c0)){ r.cap = 'cong'; hoi = ''; r.hoi = ''; }
      else if(s0==='100' || s0==='101'){ r.cap = s0==='101' ? 'ctDiem' : 'ct'; }
      else r.cap = hoi==='TT' ? 'tt' : 'to'; });
    rows.forEach(function(r){ delete r._s; delete r._y; delete r._tr; delete r._co; delete r._p; });
    return {moi:moi, ngay:ngay, diem:diem, xa:xa, rows:rows};
  };
  /* mã điểm của app (Mẫu 31 / File Tổ trưởng) theo tên điểm trên KQGD */
  M.maDiem = function(ten){ var c = slChuan(ten), kq = '';
    M.dsTo().some(function(t){ var a = slChuan(String(t.tenDiem||'').replace(/^[ĐD]i[ểe]m\s+(giao d[ịi]ch\s+)?/i, '')); if(a && a===c && t.diem){ kq = String(t.diem); return true; } return false; });
    return kq || c.replace(/\s+/g, '').toUpperCase() || 'X'; };
  M.dsTo = function(){ var ds = KHO.dsTo() || []; [typeof SK_K!=='undefined' ? SK_K : null, typeof TC_K!=='undefined' ? TC_K : null].forEach(function(K){ if(!ds.length && K) ds = KHO.dsToKy(K) || []; }); return ds; };
  M.laLoai = function(k){ return /^kqgd_[A-Za-z0-9]+$/.test(String(k||'')); };
  M.dangKy = function(k, ten){ if(!M.laLoai(k) || SL_LOAI.some(function(L){ return L.k===k; })) return;
    SL_LOAI.push({k:k, nhom:'D', ngay:true, rieng:true, kqgd:1, ten:'KQGD · '+(ten || k.slice(5)), can:[], tenFile:[]}); SL_MA[k] = 'KQGD_'+k.slice(5); };
  M.dongBo = function(){ KHO.dsBang().forEach(function(e){ if(e && M.laLoai(e.loai)) M.dangKy(e.loai, e.tong && e.tong.diem); }); };
  /* ---------- 3. CLT02 PDF → bảng theo dòng đánh số cột → bộ đọc CLT02 Excel ---------- */
  M.laSoCot = function(d){ var n = d.w.filter(function(w){ return /^\d{1,2}$/.test(w.s) && +w.s>=1 && +w.s<=16; }); return n.length>=12 && n.length>=d.w.length-2; };
  M.sheetCLT = function(L){
    var i0 = -1; L.some(function(d, i){ if(M.laSoCot(d)){ i0 = i; return true; } return false; }); if(i0<0) return null;
    var X = {}; L[i0].w.forEach(function(w){ if(/^\d{1,2}$/.test(w.s) && X[w.s]===undefined) X[w.s] = (w.x0+w.x1)/2; });
    var cot = Object.keys(X).map(function(k){ return [+k, X[k]]; }).sort(function(a, b){ return a[1]-b[1]; });
    /* ranh cột: tên (cột 2) căn trái sát sau cột STT → ranh 1|2 = mép phải số "1" + 6 pt, ranh 2|3 = mép trái số "3" − 6 pt; các cột sau: giữa 2 tâm số cột */
    var W = {}; L[i0].w.forEach(function(w){ if(/^\d{1,2}$/.test(w.s) && W[w.s]===undefined) W[w.s] = w; });
    var b12 = W['1'] ? W['1'].x1+6 : null, b23 = W['3'] ? W['3'].x0-6 : null;
    var oCua = function(w){ var c = (w.x0+w.x1)/2; if(b12!=null && c<b12) return 1; if(b23!=null && w.x0<b23) return 2;
      var j = 0; while(j<cot.length-1 && c>(cot[j][1]+cot[j+1][1])/2) j++; return cot[j][0]; };
    var rows = L.slice(0, i0).filter(function(d){ return /m[ẫa]u s[ốo] 02\s*\/\s*clt|t[ạa]i\s+x[ãa]|th[áa]ng\s+\d{1,2}\s*\/\s*\d{4}|t[ừu]\s+\d{1,2}\/\d{1,2}\/\d{4}/i.test(d.chu); }).map(function(d){ var m = /th[áa]ng\s+\d{1,2}\s*\/\s*\d{4}|t[ừu]\s+\d{1,2}\/\d{1,2}\/\d{4}\s+[đd][ếe]n\s+\d{1,2}\/\d{1,2}\/\d{4}/i.exec(d.chu); return m ? [d.chu, m[0]] : [d.chu]; });
    var so = []; cot.forEach(function(c){ so[c[0]] = String(c[0]); }); rows.push(so);
    var R = [], phu = [];
    L.slice(i0+1).forEach(function(d){ if(M.laSoCot(d)) return; var r = []; d.w.forEach(function(w){ var j = oCua(w); r[j] = r[j] ? r[j]+' '+w.s : w.s; });
      var c1 = String(r[1]||'').trim(); if(/^(\d+|[IVX]+)$/.test(c1) || /t[ổo]ng c[ộo]ng/i.test(d.chu)) R.push({tr:d.trang, y:d.y, p:[{y:d.y, r:r}]}); else phu.push({tr:d.trang, y:d.y, r:r}); });
    /* tên dài bị ngắt (căn giữa ô → nằm trên hoặc dưới dòng STT) → gắn vào dòng STT gần nhất cùng trang (≤ 12 pt) */
    phu.forEach(function(x){ var g = 13, r0 = null; R.forEach(function(r){ var e = Math.abs(r.y-x.y); if(r.tr===x.tr && e<g){ g = e; r0 = r; } }); if(r0) r0.p.push(x); });
    R.forEach(function(x){ var r = []; x.p.sort(function(a, b){ return a.y-b.y; }).forEach(function(q){ q.r.forEach(function(v, j){ if(v) r[j] = r[j] ? r[j]+' '+v : v; }); }); rows.push(r); });
    return [{ten:'CLT02 PDF', rows:rows}];
  };
  /* ---------- 4. gắn vào luồng nạp ---------- */
  M.laPDF = function(file, ab){ var u = new Uint8Array(ab, 0, Math.min(5, ab.byteLength)); return /\.pdf$/i.test(file.name||'') || String.fromCharCode.apply(null, u)==='%PDF-'; };
  M.docFile = function(file){
    var kq = {file:file, ten:file.name, kich:file.size, loi:'', canhBao:[], sheets:[]};
    return file.arrayBuffer().then(function(ab){ return Promise.all([M.dong(ab.slice(0)), slBam(ab)]); }).then(function(r){ var L = r[0]; kq.hash = r[1];
      if(M.laKQGD(L)){ var x = M.docKQGD(L); if(!x.ngay || !x.diem){ kq.loi = 'File KQGD nhưng không đọc được '+(!x.ngay ? 'ngày giao dịch' : 'tên điểm giao dịch')+'.'; return kq; }
        var ma = M.maDiem(x.diem), k = 'kqgd_'+ma; M.dangKy(k, M.tenDep(x.diem)); x.k = k; x.sheet = 'PDF'; x.hang = 1;
        slPhanTichRieng(kq, x); if(kq.loi) return kq;
        kq.nguonKy = 'tiêu đề trong file';
        var hoi = x.rows.filter(function(o){ return o.cap==='hoi'; }), to = x.rows.filter(function(o){ return o.cap==='to'; }), cong = x.rows.find(function(o){ return o.cap==='cong'; }) || {};
        kq.tong = {n:x.rows.length, rieng:1, diem:M.tenDep(x.diem), xa:M.tenDep(x.xa), moi:x.moi?1:0, to:to.length, hoi:hoi.length, dn:cong.dn || hoi.reduce(function(s, o){ return s+(o.dn||0); }, 0)};
        hoi.forEach(function(h){ if(h.hoi==='TT') return; var s = to.filter(function(o){ return o.hoi===h.hoi; }).reduce(function(a, o){ return a+(o.dn||0); }, 0);
          if(Math.abs(s-(h.dn||0))>1000) kq.canhBao.push('Dư nợ các tổ '+h.hoi+' cộng '+tdnTien(s)+' ≠ dòng Hội '+tdnTien(h.dn||0)+' — kiểm lại file (có thể dòng tổ bị tách trang).'); });
        if(!M.dsTo().some(function(t){ return String(t.diem||'')===ma; })) kq.canhBao.push('Chưa ghép được điểm "'+x.diem+'" với điểm GD của app (Mẫu 31 / File Tổ trưởng) — lưu theo tên điểm.');
        return kq; }
      var sh = M.sheetCLT(L); if(sh && typeof CLT!=='undefined'){ var y = CLT.doc(sh); if(y){ kq.sheets = sh; return slPhanTichRieng(kq, y); } }
      kq.loi = 'PDF này không phải KQGD (Mẫu 13/GDX) hay CLT02 (Mẫu số 02/CLT) — app chưa đọc loại PDF này.'; return kq;
    }).catch(function(e){ kq.loi = 'Không đọc được PDF: '+(e && e.message || e); return kq; }); };
  M.tenDep = function(s){ s = String(s||'').trim().replace(/\s+/g, ' '); return s.toLowerCase().replace(/(^|\s)(\S)/g, function(m, a, b){ return a+b.toUpperCase(); }); };
  if(typeof slDocFile==='function'){ var cuDoc = slDocFile; slDocFile = function(file){ var self = this, a = arguments;
      return (file && /\.pdf$/i.test(file.name||'')) ? M.docFile(file) : cuDoc.apply(self, a); }; }
  if(typeof slTomRieng==='function'){ var cuTom = slTomRieng; slTomRieng = function(loai, t){ if(!M.laLoai(loai)) return cuTom.apply(this, arguments);
      return (t.to||0)+' tổ · '+(t.hoi||0)+' Hội · dư nợ '+tdnTr(t.dn||0)+(t.moi ? ' · mẫu 13/GDX' : ' · mẫu cũ'); }; }
  if(typeof slBo0==='function'){ var cuBo = slBo0; slBo0 = function(){ M.dongBo(); return cuBo.apply(this, arguments); }; }
  if(typeof veSoLieu==='function'){ var cuVe = veSoLieu; veSoLieu = function(){ M.dongBo(); return cuVe.apply(this, arguments); }; }
  /* ---------- 5. 📥 Lấy từ hộp đến (Google Picker — chỉ chép, không dời / xóa) ---------- */
  M.nut = function(){ return '<button class="nho" data-lenh="kqpdf.hopDen" data-dong="1" title="Chọn file trong thư mục hộp đến trên Drive (X_GoDau/2. KQGD — nơi anh chép file chưa xử lý): KQGD, CLT02 (PDF) và file Excel. App đọc, xem trước, chép bản tên chuẩn vào kho — KHÔNG dời / xóa file gốc">📥 Lấy từ hộp đến (Drive · chỉ chép, file gốc giữ nguyên)</button>'; };
  M.hopDen = function(){
    if(typeof coTheNoiDrive!=='function' || !coTheNoiDrive()) return baoLoi(typeof drChuaNoi==='function' ? drChuaNoi() : 'Chưa nối Drive.');
    var key = (D.cauHinh.apiKey||'').trim(); if(!key) return baoLoi('Chưa có API key của Google Picker — khai ở ⚙ Cài đặt › Google Drive.');
    canToken().then(function(co){ if(!co) throw new Error('Chưa nối được Drive'); return napPicker(); }).then(function(){ var P = google.picker;
      var xem = new P.DocsView(P.ViewId.DOCS).setIncludeFolders(true).setMode(P.DocsViewMode.LIST); if(D.cauHinh.hopDenId) xem.setParent(D.cauHinh.hopDenId);
      new P.PickerBuilder().addView(xem).enableFeature(P.Feature.MULTISELECT_ENABLED).setOAuthToken(DR.token).setDeveloperKey(key).setAppId(layClientId().split('-')[0])
        .setTitle('Hộp đến — chọn file cần nạp (Ctrl+A chọn hết; file gốc giữ nguyên)').setCallback(M.daChon).build().setVisible(true);
    }).catch(function(e){ baoLoi('Không mở được Google Picker: '+(e && e.message || e)); }); };
  M.daChon = function(data){ var P = google.picker; if(data[P.Response.ACTION]!==P.Action.PICKED) return;
    var ds = (data[P.Response.DOCUMENTS]||[]).filter(function(d){ return d[P.Document.MIME_TYPE]!=='application/vnd.google-apps.folder'; });
    if(ds[0] && ds[0][P.Document.PARENT_ID]){ D.cauHinh.hopDenId = ds[0][P.Document.PARENT_ID]; luu(); }
    batChay(true, 'Đang tải '+ds.length+' file từ hộp đến…');
    Promise.all(ds.map(function(d){ return canToken().then(function(){ return fetch('https://www.googleapis.com/drive/v3/files/'+d[P.Document.ID]+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}); })
      .then(function(r){ if(!r.ok) throw new Error(d[P.Document.NAME]+': Drive báo lỗi '+r.status); return r.blob(); }).then(function(b){ return new File([b], d[P.Document.NAME]); }); }))
      .then(function(f){ tatChay(); if(f.length) slDocNhieu(f); }, function(e){ tatChay(); baoLoi('Không tải được file: '+(e && e.message || e)); }); };
  if(typeof gdDangKy==='function') gdDangKy('kqpdf', {hopDen:function(){ M.hopDen(); }});
  /* ---------- 6. Sao kê › Đối chiếu KQGD ↔ Mẫu 31 ---------- */
  M.BANG = {}; M.daNap = false;
  M.chon = function(ns){ var g = {};   /* mỗi điểm: KQGD đúng ngày Mẫu 31, không có thì phiên gần nhất trước đó */
    KHO.dsBang().forEach(function(e){ if(!e || !M.laLoai(e.loai) || !(e.ngay || e.ky)) return; var n = e.ngay || e.ky; if(n>ns) return; var c = g[e.loai]; if(!c || n>(c.ngay || c.ky)) g[e.loai] = e; });
    return Object.keys(g).map(function(k){ return g[k]; }); };
  M.napHet = function(ns){ return Promise.all(M.chon(ns).map(function(e){ var k = e.loai+'|'+e.ky; if(M.BANG[k]) return M.BANG[k];
      return KHO.docBang(e.loai, e.ky).then(function(b){ return M.BANG[k] = {e:e, rows:b ? slMoBang(b) : []}; }); })); };
  M.lap = function(){
    var N = skNen31('kqgd31'); if(N.can) return N.can;
    var ns = N.e31.ngay, ds = M.chon(ns).map(function(e){ return M.BANG[e.loai+'|'+e.ky]; }).filter(Boolean);
    if(!ds.length) return {ten:'Doi chieu KQGD', tieuDe:'ĐỐI CHIẾU KẾT QUẢ GIAO DỊCH (KQGD) ↔ MẪU 31', ngay:N.ngay, aoa:[['Chưa nạp KQGD']], html:'<div class="bc-rong">Chưa nạp KQGD (PDF) của phiên nào đến ngày '+ngayVNsl(ns)+' — nạp ở ⋯ Nạp &amp; KT › 📥 Nạp file / Lấy từ hộp đến.</div>'};
    var B = N.M, t105 = slT105To(B) || {}, K = SK_K, F = [['dn', 'Dư nợ'], ['qh', 'Quá hạn'], ['kn', 'Khoanh'], ['lt', 'Lãi tồn'], ['tg', 'Tiền gửi']];
    return ds.map(function(x){ var e = x.e, ten = (e.tong && e.tong.diem) || e.loai.slice(5), ma = e.loai.slice(5), khac = (e.ngay || e.ky)!==ns;
      var toDiem = (KHO.dsToKy(K)||[]).filter(function(t){ return t && String(t.diem||'')===ma && !t.trucTiep; }), set = {}; toDiem.forEach(function(t){ set[t.ma] = t; });
      var A = {}, ATo = {}; N.rows.forEach(function(o){ var t = set[toMaCua(o)]; if(!t || !o.ku) return; var h = M.hoiCua(t.dv), a = A[h] = A[h] || {dn:0, qh:0, kn:0, lt:0, tg:0}, b = ATo[t.ma] = ATo[t.ma] || {t:t, dn:0, qh:0, kn:0, lt:0};
        [a, b].forEach(function(z){ z.dn += o.dn||0; z.qh += o.qh||0; z.kn += o.kn||0; z.lt += laiTon(o); }); });
      toDiem.forEach(function(t){ var h = M.hoiCua(t.dv), a = A[h] = A[h] || {dn:0, qh:0, kn:0, lt:0, tg:0}; a.tg += t105[t.ma] || 0; });
      var dong = [], aoa = [['Hội / tổ'].concat([].concat.apply([], F.map(function(f){ return [f[1]+' KQGD', f[1]+' Mẫu 31', 'Chênh']; })))], lech = 0;
      var o3 = function(a, b){ var c = Math.round((a||0)-(b||0)); if(Math.abs(c)>=1000) lech++; return [a||0, b||0, c]; };
      x.rows.filter(function(o){ return o.cap==='hoi' && o.hoi!=='TT'; }).forEach(function(h){ var a = A[h.hoi] || {};
        var r = [h.ten].concat([].concat.apply([], F.map(function(f){ return o3(h[f[0]], a[f[0]]); }))); dong.push({r:r, hoi:1}); aoa.push(r);
        x.rows.filter(function(o){ return o.cap==='to' && o.hoi===h.hoi; }).forEach(function(o){ var t = M.toCua(o, h.hoi, ATo), b = t ? ATo[t.t.ma] : null;
          var r2 = ['   '+o.ten+(t ? '' : ' (chưa ghép tổ app)')].concat([].concat.apply([], F.map(function(f){ return f[0]==='tg' ? [o.tg||0, '', ''] : o3(o[f[0]], b ? b[f[0]] : 0); }))); dong.push({r:r2}); aoa.push(r2); }); });
      var th = '<tr><th rowspan="2">Hội / tổ</th>'+F.map(function(f){ return '<th colspan="3">'+f[1]+'</th>'; }).join('')+'</tr><tr>'+F.map(function(){ return '<th>KQGD</th><th>Mẫu 31</th><th>Chênh</th>'; }).join('')+'</tr>';
      var h = '<div class="bc-tom">KQGD phiên '+ngayVNsl(e.ngay || e.ky)+(khac ? ' <b>(khác ngày Mẫu 31 '+ngayVNsl(ns)+' — doanh số / lãi có thể lệch)</b>' : '')+' · '+(lech ? '<b>'+lech+' ô lệch ≥ 1.000 đ</b>' : 'khớp')+' · KQGD chỉ để đối chiếu, số app dùng là Mẫu 31.</div>'+
        '<div class="cuon"><table class="bc-bang"><thead>'+th+'</thead><tbody>'+dong.map(function(d){ return '<tr'+(d.hoi ? ' class="nhom"' : '')+'>'+d.r.map(function(v, j){ return j ? '<td class="s'+(j%3===0 && v && Math.abs(v)>=1000 ? ' do' : '')+'">'+(v==='' ? '' : tdnTien(v))+'</td>' : '<td>'+coChuHTML(v)+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>';
      return {ten:('Doi chieu KQGD '+ten).slice(0, 31), tieuDe:'ĐỐI CHIẾU KQGD ↔ MẪU 31 — ĐIỂM GD '+String(ten).toUpperCase(), ngay:N.ngay, html:h, aoa:aoa}; });
  };
  M.hoiCua = function(dv){ return {'11':'HND', '12':'HPN', '13':'HCCB', '14':'DTN', '99':'TT'}[String(dv||'').trim()] || String(dv||''); };
  M.toCua = function(o, hoi, ATo){ var n = slChuan(o.ten), ds = Object.keys(ATo).map(function(k){ return ATo[k]; }).filter(function(b){ return M.hoiCua(b.t.dv)===hoi; });
    var x = ds.filter(function(b){ return slChuan(b.t.ten)===n; }); if(x.length===1) return x[0];
    x = ds.filter(function(b){ var a = slChuan(b.t.ten); return n.length>=8 && (a.indexOf(n)===0 || n.indexOf(a)===0); }); return x.length===1 ? x[0] : null; };
  if(typeof SK_BC!=='undefined') SK_BC.push({k:'kqgd31', ten:'Đối chiếu KQGD (PDF phiên) ↔ Mẫu 31 — từng Hội, từng tổ của điểm', nhom:'tt', kho:'ngang', lap:function(){ return M.lap(); }});
  if(typeof skXem==='function'){ var cuXem = skXem; skXem = function(){ var C = skCH();
      if(C.bc && C.bc.kqgd31 && !M.daNap && SK_K){ var e = KHO.bang('hstd', SK_K.thang); if(e) return M.napHet(e.ngay).then(function(){ M.daNap = true; var kq; try{ kq = skXem(); } catch(er){ M.daNap = false; throw er; } var het = function(){ M.daNap = false; }; return Promise.resolve(kq).then(het, het); }); }
      return cuXem.apply(this, arguments); }; }
  return M;
})();
