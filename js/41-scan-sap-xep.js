/* ==========================================================
   3.264 (anh chốt 20/10/2026) — 🗂 LƯU SCAN TẬP TRUNG · 🧹 SẮP XẾP · 📊 KIỂM TRA · 📇 ĐỌC CCCD (QR / 3 dòng mã máy đọc)
   - Drive chỉ 4 thư mục phẳng, không thư mục con: Scan chờ sắp xếp · CCCD · Chữ ký - Ảnh khách · Hồ sơ scan.
     Chưa rõ khách → "Scan chờ sắp xếp", tên anh gõ (vd "cccd-Võ Văn Hoàng"). Đã rõ khách → "MãKH - Họ tên - Loại" ở thư mục theo loại.
   - 🧹 Sắp xếp (anh bấm khi cần): so Mẫu 31 (danh bạ khách) → khớp đúng 1 khách thì đặt tên chuẩn + dời; trùng tên → anh chọn;
     chưa có trên Mẫu 31 → để ở thư mục chờ. File cũ (xã / điểm / ấp / tổ, Chữ ký - CCCD / tháng) dời về chỗ mới; thư mục cũ trống → thùng rác Drive.
     Phân biệt loại: loại chọn lúc quét → chữ đầu tên (cccd- · ck- · anh- · còn lại = tài liệu) → đuôi file.
   - 📇 CCCD: đọc mã QR (jsQR / bộ đọc có sẵn của trình duyệt) → 3 dòng mã máy đọc mặt sau (Tesseract, có số kiểm tra) → dòng "Số" mặt trước;
     có số CCCD → tra Mẫu 31 ra mã KH + họ tên → lưu thẳng đúng chỗ, tự tạo Ảnh khách (mặt trước, JPG ≤ 200 KB).
   - Bản photo 2 mặt trên 1 tờ: chụp 1 lần cả tờ → app chia đôi tờ, mỗi nửa tìm khung thẻ như ảnh thường.
   - 📊 Kiểm tra: theo cây địa bàn (Mẫu 31) — mỗi tổ: số hộ, có CCCD / chữ ký / ảnh, thiếu.
   Ảnh không rời máy (trừ khi lên Drive của anh).
   ========================================================== */
var SXT = {cho:'Scan chờ sắp xếp', cccd:'CCCD', ka:'Chữ ký - Ảnh khách', tl:'Hồ sơ scan'};
var SXT_GIU = [SXT.cho, SXT.cccd, SXT.ka, SXT.tl];   /* thư mục mới — không bao giờ xóa */

/* ---------- 1. tên + nơi lưu ---------- */
function sxTenChuan(maKH, ten, loai, duoi){ return sachTen(maKH+' - '+String(ten||'').trim()+' - '+loai)+duoi; }
function sxLoaiScan(k){ return k.che==='tailieu' ? (((k.tag||[]).filter(function(t){ return t && t!=='CCCD'; })[0]) || 'Tài liệu') : 'CCCD'; }
duongScan = function(k){ return [D.cauHinh.thumuc, k.maKH ? (k.che==='tailieu' ? SXT.tl : SXT.cccd) : SXT.cho].join(' / '); };
tenScanDrive = function(k){ return k.maKH ? sxTenChuan(k.maKH, k.ten, sxLoaiScan(k), '.pdf') : (sachTen(k.ten||'Scan') || 'Scan')+'.pdf'; };
duongTheCCCD = function(k){ return duongScan(k); };
tenTheCCCD = function(k){ return tenScanDrive(k); };
if(typeof SC_CAN_DAY_CU==='function') scanCanDay = SC_CAN_DAY_CU;   /* 3.264: bản chưa khai cũng lên Drive — vào thư mục chờ sắp xếp */
var SX_DAY_MOT_CU = dayMotScan;
dayMotScan = function(k){   /* bản cũ chưa ghi thư mục cha → hỏi Drive trước để dời được (không chỉ đổi tên); xong ghi nơi lưu */
  var truoc = k.driveId && !k.driveCha ? goiDrive('https://www.googleapis.com/drive/v3/files/'+k.driveId+'?fields=parents').then(function(r){ k.driveCha = ((r && r.parents) || [])[0] || ''; }, function(){}) : Promise.resolve();
  return truoc.then(function(){ return SX_DAY_MOT_CU(k); }).then(function(r){ k.duongDrive = duongScan(k); return r; });
};
function sxLoaiKA(k){ return k.loai==='ky' ? 'Chữ ký' : 'Ảnh'; }
function sxTenKA(k){ return k.maKH ? sxTenChuan(k.maKH, k.khach, sxLoaiKA(k), '.jpg') : (sachTen((k.loai==='ky' ? 'ck-' : 'anh-')+String(k.khach||'Khach').replace(/^(ck|anh)\s*-\s*/i, '')))+'.jpg'; }
function sxDuongKA(k){ return [D.cauHinh.thumuc, k.maKH ? SXT.ka : SXT.cho].join(' / '); }
/* chữ ký / ảnh: tải lên (chưa có) hoặc đổi tên + dời (đã có) */
dayKAMot = function(id, im){
  var k = (D.kyAnh||[]).find(function(x){ return x.id===id; }); if(!k) return Promise.resolve();
  if(!coTheNoiDrive()){ if(!im) baoLoi('Chưa nối Drive. Vào Cài đặt › Google Drive để nối.'); return Promise.resolve(); }
  var duong = sxDuongKA(k), ten = sxTenKA(k), idTM = '';
  return baoDamDuong(duong).then(function(t){ idTM = t;
    if(k.driveId) return sxDoi(k, idTM, ten);
    return docAnhHS(k.id).then(function(bl){ if(!bl) throw new Error('Ảnh trong máy không còn');
      var bien = '----tuhoso'+Date.now(), dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify({name:ten, parents:[idTM]})+'\r\n--'+bien+'\r\nContent-Type: image/jpeg\r\n\r\n';
      return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:new Blob([dau, bl, '\r\n--'+bien+'--'])}); })
      .then(function(r){ k.driveId = r && r.id; k.driveCha = idTM; });
  }).then(function(){ k.ten = ten; k.duongDrive = duong; k.suaLuc = new Date().toISOString(); luu(); ghiDongBo();
    var e = document.getElementById('ka-drive'); if(e) e.textContent = '☁ Đã lên Drive: '+duong.replace(D.cauHinh.thumuc+' / ', '')+' / '+ten; else if(!im) bao('☁ Đã lên Drive: '+ten, 5);
  }).catch(function(e){ if(!im) baoLoi('Chưa đưa lên Drive được: '+(e && e.message || e)+' — bấm ☁ để thử lại.'); });
};
moThuMucKA = function(){   /* 3.264: chữ ký / ảnh ở 1 thư mục chung (bỏ chia theo tháng) */
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Vào Cài đặt › Google Drive để nối.');
  baoDamDuong([D.cauHinh.thumuc, SXT.ka].join(' / ')).then(function(id){ window.open('https://drive.google.com/drive/folders/'+id, '_blank'); }, function(e){ baoLoi('Chưa mở được thư mục: '+(e && e.message || e)); });
};
/* đổi tên + dời 1 file có sẵn trên Drive (cha cũ chưa biết thì hỏi Drive) — trả cha cũ để dọn thư mục trống */
function sxDoi(k, idTM, ten){
  var cha = k.driveCha ? Promise.resolve(k.driveCha) : goiDrive('https://www.googleapis.com/drive/v3/files/'+k.driveId+'?fields=parents').then(function(r){ return ((r && r.parents) || [])[0] || ''; });
  return cha.then(function(c){
    var u = 'https://www.googleapis.com/drive/v3/files/'+k.driveId+'?fields=id,parents'+(c && c!==idTM ? '&addParents='+idTM+'&removeParents='+c : (!c ? '&addParents='+idTM : ''));
    return goiDrive(u, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:ten})}).then(function(){ k.driveCha = idTM; return c; });
  });
}

/* ---------- 2. tra khách trên Mẫu 31 (danh bạ) ---------- */
function sxChuan(s){ return boDau(String(s||'')).replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
var SX_CHI = null;
function sxChiMuc(){   /* CCCD → [mã], tên (không dấu) → [mã] */
  var kh = KHO.dsKhach(), n = Object.keys(kh).length;
  if(SX_CHI && SX_CHI.n===n && SX_CHI.db===kh) return SX_CHI;
  var cc = {}, ten = {};
  Object.keys(kh).forEach(function(m){ var c = kh[m], s = String(c.cccd||'').replace(/\D/g, '');
    if(s) (cc[s] = cc[s] || []).push(m);
    var t = sxChuan(c.ten); if(t) (ten[t] = ten[t] || []).push(m); });
  return SX_CHI = {n:n, db:kh, cc:cc, ten:ten};
}
/* nhận dạng từ tên file / dữ liệu: loại (theo chữ đầu), số CCCD (12 số), tên còn lại */
function sxBoc(ten){
  var t = String(ten||'').replace(/\.(pdf|jpe?g|png)$/i, '').trim(), loai = '', m = /^([A-Za-zĐđ0-9]{1,10})\s*-\s*(.+)$/.exec(t);
  if(m){ var p = sxChuan(m[1]); loai = p==='cccd' ? 'cccd' : p==='ck' ? 'ky' : (p==='anh' ? 'anh' : (/^\d{9,12}$/.test(m[1]) ? '' : 'tl:'+m[1])); if(loai || /^\d{12}$/.test(m[1])) t = m[2]; }
  var gon = t.replace(/\s+/g, ''), so = (/(\d{12})/.exec(gon) || [])[1] || '', ma = (/(?:^|\D)(\d{10})(?:\D|$)/.exec(so ? gon.replace(so, '-') : gon) || [])[1] || '';
  var conTen = t.replace(/\d{6,}/g, ' ').replace(/\s*-\s*(CCCD|Chữ ký|Ảnh|Tài liệu)\s*$/i, '').replace(/^\s*-\s*|\s*-\s*$/g, '').trim();
  return {loai:loai, cccd:so, ma:ma, ten:conTen};
}
/* 3.265 (anh chốt 20/10): XÁC ĐỊNH CHẮC = khớp ít nhất 2 trong 3 (số CCCD · mã KH · họ tên) với cùng 1 khách Mẫu 31 → đổi tên chuẩn + lưu đúng chỗ;
   số CCCD là chuẩn nhất: có số CCCD khớp 1 khách mà không có tên → vẫn chắc; tên so gần đúng (bỏ dấu, lệch nhỏ — sxTenGan);
   chưa chắc (chỉ tên · chỉ số CCCD / mã KH · CCCD khớp mà tên khác) → để thư mục chung, 🧹 Sắp xếp hiện gợi ý + lý do, anh bấm ✓ mới xếp.
   → {ma, theo} (chắc) | {goiY, ly} | {ds} (trùng) | {} (không có) */
/* tên gần đúng (anh: họ tên đôi khi bỏ dấu chưa chuẩn): bỏ dấu, hoa thường; lệch ≤ 1 ký tự (tên ngắn) / ≤ 2 (tên dài), hoặc chỉ đảo thứ tự chữ */
function sxTenGan(a, b){
  a = sxChuan(a); b = sxChuan(b); if(!a || !b) return false; if(a===b) return true;
  if(a.split(' ').sort().join(' ')===b.split(' ').sort().join(' ')) return true;
  var n = a.length, m = b.length, cho = Math.max(n, m)>=12 ? 2 : 1; if(Math.abs(n-m)>cho) return false;
  var d = []; for(var i=0;i<=n;i++){ d[i] = [i]; } for(var j=1;j<=m;j++) d[0][j] = j;
  for(i=1;i<=n;i++) for(j=1;j<=m;j++) d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]===b[j-1] ? 0 : 1));
  return d[n][m]<=cho;
}
function sxXacDinh(o){
  var X = sxChiMuc(), KH = KHO.dsKhach(), s = String(o.cccd||'').replace(/\D/g, ''), t = sxChuan(o.ten), m = String(o.ma||'');
  var tenOK = function(ma){ return !!t && sxTenGan((KH[ma]||{}).ten, t); }, ccOK = function(ma){ return !!s && String((KH[ma]||{}).cccd||'').replace(/\D/g, '')===s; };
  var tenMau = function(ma){ return (KH[ma]||{}).ten || ''; };
  if(m && KH[m]){
    if(tenOK(m) || ccOK(m)) return {ma:m, theo:'mã KH + '+(tenOK(m) ? 'tên' : 'CCCD')};
    return {goiY:m, ly:t ? 'mã KH khớp, tên khác Mẫu 31 ('+tenMau(m)+')' : 'chỉ có mã KH'}; }
  if(s && X.cc[s]){
    if(X.cc[s].length>1) return {ds:X.cc[s]};
    var mc = X.cc[s][0];
    if(tenOK(mc)) return {ma:mc, theo:'CCCD + tên'};
    if(!t) return {ma:mc, theo:'số CCCD'};   /* anh: số CCCD là chuẩn nhất — có số, không có tên vẫn xác định */
    return {goiY:mc, ly:'CCCD khớp, tên khác hẳn Mẫu 31 ('+tenMau(mc)+')'}; }
  if(!t) return {};
  var ds = X.ten[t] || [];
  if(ds.length===1) return s ? {goiY:ds[0], ly:'tên khớp, số CCCD khác Mẫu 31'} : {goiY:ds[0], ly:'chỉ khớp tên'};
  return ds.length ? {ds:ds} : {};
}
function sxKhach(ma){   /* thông tin khách để gắn vào bản scan */
  var c = KHO.dsKhach()[ma] || {}, t = KHO.toDanhBa(c.to) || {};
  return {ma:ma, ten:c.ten||'', cccd:c.cccd||'', xa:c.tenXa||'', ap:c.tenThon||'', maXa:c.xa||'', maAp:c.thon||'', to:t.ten || c.toTen || '', diem:t.diem||''};
}
function sxNhanKH(ma){ var c = sxKhach(ma); return c.ma+' · '+c.ten+(c.ap ? ' · '+c.ap : '')+(c.to ? ' · Tổ '+c.to : '')+(c.xa ? ' · '+c.xa : ''); }

/* ---------- 3. đọc CCCD: QR → 3 dòng mã máy đọc → dòng "Số" ---------- */
function sxNgay8(s){ s = String(s||''); return /^\d{8}$/.test(s) ? s.slice(4)+'-'+s.slice(2, 4)+'-'+s.slice(0, 2) : ''; }   /* ddmmyyyy → ISO */
function cccdQR(txt){   /* QR CCCD gắn chip: CCCD|CMND cũ|Họ tên|ngày sinh|giới tính|nơi thường trú|ngày cấp */
  var p = String(txt||'').split('|'); if(p.length<5 || !/^\d{12}$/.test(p[0])) return null;
  return {cccd:p[0], cmnd:p[1]||'', ten:(p[2]||'').trim(), ns:sxNgay8(p[3]), gt:p[4]||'', dc:(p[5]||'').trim(), ncap:sxNgay8(p[6]), nguon:'QR'};
}
function icaoSo(s){ var w = [7, 3, 1], t = 0; String(s).split('').forEach(function(ch, i){ var v = ch==='<' ? 0 : /\d/.test(ch) ? +ch : ch.charCodeAt(0)-55; t += v*w[i%3]; }); return t%10; }
function cccdMRZ(txt){   /* 3 dòng mặt sau (TD1): IDVNM + 9 số + số kiểm + 12 số CCCD … · ngày sinh, giới tính, hạn · HỌ<<TÊN */
  var s = String(txt||'').toUpperCase().replace(/[ \t]/g, '').replace(/[«‹]/g, '<');
  var m = /IDVN[M]([0-9OQDIL]{9})([0-9OQDIL])([0-9OQDIL]{12})/.exec(s); if(!m) return null;
  var so = function(x){ return x.replace(/[OQD]/g, '0').replace(/[IL]/g, '1'); }, d9 = so(m[1]), ck = so(m[2]), c12 = so(m[3]);
  if(icaoSo(d9)!==+ck || c12.slice(-9)!==d9) return null;   /* số kiểm sai → đọc nhầm, bỏ */
  var r = {cccd:c12, nguon:'mã máy đọc'};
  var l2 = /([0-9OQDIL]{6})([0-9OQDIL])([MF<])([0-9OQDIL]{6})([0-9OQDIL])VNM/.exec(s);
  if(l2){ l2 = l2.map(function(v, i){ return i===3 ? v : so(v||''); }); }
  if(l2 && icaoSo(l2[1])===+l2[2]){ var y = +l2[1].slice(0, 2); r.ns = ((y > (new Date().getFullYear()%100) ? 1900 : 2000)+y)+'-'+l2[1].slice(2, 4)+'-'+l2[1].slice(4, 6); r.gt = l2[3]==='F' ? 'Nữ' : l2[3]==='M' ? 'Nam' : ''; }
  var l3 = /\n([A-Z]+(?:<[A-Z]+)*)<<([A-Z]+(?:<[A-Z]+)*)/.exec('\n'+String(txt||'').toUpperCase().replace(/[ \t]/g, '').split('\n').filter(function(x){ return /<</.test(x) && !/\d/.test(x); }).join('\n'));
  if(l3) r.ten = (l3[1]+' '+l3[2]).replace(/</g, ' ').replace(/\s+/g, ' ').trim();
  return r;
}
function sxQR(c){   /* canvas → chữ trong QR (bộ đọc trình duyệt nếu có, không thì jsQR) */
  var tuJS = function(){ return napMotTV({ten:'jsqr', url:'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'}).then(function(){
    var doc = window['jsQR']; if(typeof doc!=='function') return '';
    var lam = function(cv){ var d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height), q = doc.call(window, d.data, cv.width, cv.height, {inversionAttempts:'attemptBoth'});
      if(!q) return ''; try { if(q.binaryData && q.binaryData.length && window.TextDecoder) return new TextDecoder('utf-8').decode(new Uint8Array(q.binaryData)); } catch(e){} return q.data || ''; };   /* QR CCCD = chữ UTF-8 có dấu */
    var r = lam(c); if(r) return r;
    var c2 = document.createElement('canvas'), k = Math.min(3, 1800/Math.max(c.width, c.height)); if(k<=1.05) return '';
    c2.width = Math.round(c.width*k); c2.height = Math.round(c.height*k); var g = c2.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(c, 0, 0, c2.width, c2.height); return lam(c2); }); };
  if(window.BarcodeDetector) return new window.BarcodeDetector({formats:['qr_code']}).detect(c).then(function(ds){ return ds && ds[0] ? ds[0].rawValue : tuJS(); }, tuJS);
  return tuJS();
}
function sxCanvas(b){ return anhTuBlob(b).then(function(im){ var c = document.createElement('canvas'); c.width = im.naturalWidth || im.width; c.height = im.naturalHeight || im.height; c.getContext('2d').drawImage(im, 0, 0); return c; }); }
function sxOCR(c, chu){   /* Tesseract tiếng Anh, chỉ nhận chữ hoa + số + "<" (đúng kiểu chữ mã máy đọc) */
  return napOCR().then(function(){ return Tesseract.createWorker('eng'); }).then(function(w){
    return w.setParameters({tessedit_char_whitelist:chu || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<'}).then(function(){ return w.recognize(c); })
      .then(function(r){ w.terminate(); return (r && r.data && r.data.text) || ''; }, function(e){ w.terminate(); throw e; }); });
}
function sxCat(c, y0, y1){ var o = document.createElement('canvas'), h = Math.round(c.height*(y1-y0)); o.width = c.width; o.height = h; o.getContext('2d').drawImage(c, 0, Math.round(c.height*y0), c.width, h, 0, 0, c.width, h); return o; }
/* đọc 1 người: truoc, sau = blob ảnh 2 mặt (đã cắt thẻ) → {cccd, ten, ns, …, nguon} | null */
function docCCCD(truoc, sau){
  var c1 = null, c2 = null, kq = null;
  var thuQR = function(c){ return c ? sxQR(c).then(function(t){ return cccdQR(t); }).catch(function(){ return null; }) : Promise.resolve(null); };
  var thuMRZ = function(c){ return c ? sxOCR(sxCat(c, 0.55, 1)).then(cccdMRZ).catch(function(){ return null; }) : Promise.resolve(null); };
  return Promise.all([truoc ? sxCanvas(truoc) : null, sau ? sxCanvas(sau) : null]).then(function(r){ c1 = r[0]; c2 = r[1];
    return thuQR(c1); }).then(function(r){ return r || thuQR(c2); }).then(function(r){ kq = r; return kq || thuMRZ(c2); })
    .then(function(r){ return r || (kq ? null : thuMRZ(c1)); })   /* đặt ngược mặt */
    .then(function(r){ if(r) return r;
      return c1 ? sxOCR(c1, '0123456789').then(function(t){ var m = /(?:^|\D)(0\d{11})(?:\D|$)/.exec(String(t).replace(/[ \t]/g, '')); return m ? {cccd:m[1], nguon:'dòng Số mặt trước'} : null; }).catch(function(){ return null; }) : null; });
}

/* ---------- 4. quét CCCD: đọc số → tra khách → lưu thẳng đúng chỗ ---------- */
var SX_DOC = [];   /* kết quả đọc từng người của bản vừa quét */
var SX_XONG_CU = scanXongHop;
scanXongHop = function(bl){
  SX_XONG_CU(bl);
  if(SC.che!=='the' || !SX) return;
  var nh = scanNhom(), luoi = document.querySelector('#hop-in .sx-luoi');
  if(!luoi || !nh.length) return;
  if(SX.docLuc===bl && SX_DOC.length){ sxVeDoc(); return; }
  SX.docLuc = bl; SX_DOC = nh.map(function(){ return {dang:true}; });
  luoi.insertAdjacentHTML('beforebegin', '<div id="sx-doc" class="sx-doc"></div>'); sxVeDoc();
  (SL_SAN ? Promise.resolve() : slNap()).then(function(){
    return nh.reduce(function(p, g, i){ return p.then(function(){
      return Promise.all([g[0] ? docAnhHS(g[0].id) : null, g[1] ? docAnhHS(g[1].id) : null]).then(function(b){ return docCCCD(b[0], b[1]); })
        .then(function(r){ var x = SX_DOC[i] = r || {}; x.dang = false;
          if(r){ var t = sxXacDinh({cccd:r.cccd, ten:r.ten}); x.tim = t; if(t.ma){ var c = sxKhach(t.ma); c.cccd = c.cccd || r.cccd; SXK[i] = c; } }
          sxVeDoc(); }, function(){ SX_DOC[i] = {dang:false}; sxVeDoc(); }); }); }, Promise.resolve());
  }).then(function(){ var o = SX_DOC[0] || {};
    if(nh.length===1){ SX.ten = o.tim && o.tim.ma ? sxTenChuan(o.tim.ma, sxKhach(o.tim.ma).ten, 'CCCD', '') : (o.cccd || o.ten ? 'cccd-'+[o.ten, o.cccd].filter(Boolean).join(' - ') : SX.ten);   /* chưa chắc: giữ số CCCD trong tên để Sắp xếp đối chiếu */
      var e = document.getElementById('sx-ten'); if(e) e.value = SX.ten; } });
};
function sxVeDoc(){
  var e = document.getElementById('sx-doc'); if(!e) return;
  var tat = SX_DOC.length && SX_DOC.every(function(x){ return x.tim && x.tim.ma; });
  e.innerHTML = SX_DOC.map(function(x, i){ var dau = SX_DOC.length>1 ? '<b>Người '+(i+1)+':</b> ' : '';
    if(x.dang) return '<div>'+dau+'🔎 Đang đọc mã QR / mã máy đọc…</div>';
    if(!x.cccd) return '<div class="vang">'+dau+'Chưa đọc được số CCCD — gõ tên vào ô Tên file (vd <i>cccd-Võ Văn Hoàng</i>) rồi Lưu vào app, sau bấm 🧹 Sắp xếp.</div>';
    var t = x.tim || {};
    return '<div>'+dau+'✓ Đọc được CCCD <b>'+coChuHTML(x.cccd)+'</b> <small>('+coChuHTML(x.nguon)+(x.ten ? ' · '+coChuHTML(x.ten) : '')+')</small> → '+
      (t.ma ? '<b class="xanh">'+coChuHTML(sxNhanKH(t.ma))+'</b> <small>(khớp '+coChuHTML(t.theo)+')</small>'
        : t.goiY ? '<span class="vang">chưa chắc — gần khớp '+coChuHTML(sxNhanKH(t.goiY))+' ('+coChuHTML(t.ly)+'). Lưu vào app → thư mục chung, anh xác nhận ở 🧹 Sắp xếp</span>' : t.ds ? '<span class="vang">'+t.ds.length+' khách trùng — lưu vào thư mục chung, chọn ở 🧹 Sắp xếp</span>' : '<span class="vang">chưa có trên Mẫu 31 (hộ mới) — lưu vào thư mục chung</span>')+'</div>'; }).join('')+
    (tat ? GD.hang([GD.nut({chu:'🗄 Lưu đúng khách (tự nhận)', lenh:'sx.luuDoc', chinh:1})]) : '');
}
function sxLuuTuDoc(){ if(!SX_DOC.every(function(x){ return x.tim && x.tim.ma; })) return; scanLuuTu(); }
GD.dangKy('sx', {luuDoc:function(){ sxLuuTuDoc(); }, photo2:function(el){ SC.photo2 = !!el.checked; },
  chon:function(el){ var i = +el.getAttribute('data-i'), m = el.getAttribute('data-ma'); if(m) SXP.chon[i] = m; else delete SXP.chon[i]; sxDemNut(); }, xn:function(el){ SXP.xn[+el.getAttribute('data-i')] = !!el.checked; sxDemNut(); }, dong:function(){ dongHop(); },
  driveCho:function(){ sxDriveCho(); }, apDung:function(){ sxApDung(); }, moTo:function(el){ var m = el.getAttribute('data-to'); sxKiemVe(SXK_MO===m ? '' : m); },
  kiemExcel:function(){ sxKiemExcel(); }, sapXep:function(){ moSapXep(); }, kiem:function(){ moKiemScan(); }});
/* lưu vào tủ theo khách đã chọn / tự nhận — như 3.155, thêm số CCCD + tự tạo ảnh khách từ mặt trước */
scanLuuTu = function(){
  var nh = scanNhom(); if(nh.some(function(_, i){ return !SXK[i]; })) return bao(nh.length>1 ? 'Chọn khách cho đủ '+nh.length+' người.' : 'Chọn khách trước.', 4);
  var loai = SC.che==='the' ? '' : layMot('sx-tag'), d = nay(), ds = [], ch = Promise.resolve();
  nh.forEach(function(g, i){ var c = SXK[i], r = SX_DOC[i] || {};
    var k = {id:idMoi(), che:SC.che==='the' ? 'the' : 'tailieu', ten:c.ten, maKH:c.ma, cccd:c.cccd || r.cccd || '', xa:c.xa, ap:c.ap, maXa:c.maXa, maAp:c.maAp, diem:c.diem||'', to:c.to||'', ghi:'',
      tag:SC.che==='the' ? ['CCCD'] : (loai ? [loai] : []), ctrinh:[], ngay:ngayISO(d), gioQuet:d.toISOString(), taoLuc:d.toISOString(), suaLuc:d.toISOString(), may:maMayCua()};
    if(r.ns) k.cccdDoc = {ns:r.ns, gt:r.gt||'', dc:r.dc||'', ncap:r.ncap||'', nguon:r.nguon};
    if(k.che==='the'){ k.matTruoc = !!g[0]; k.matSau = !!g[1];
      (function(k, a, b){ ch = ch.then(function(){ return a ? doiTenAnh(a.id, k.id+'_matTruoc') : null; }).then(function(){ return b ? doiTenAnh(b.id, k.id+'_matSau') : null; }); })(k, g[0], g[1]); }
    else k.trang = g.map(hangRaTrang);
    ds.push(k); });
  ch.then(function(){
    D.scan = D.scan || []; ds.forEach(function(k){ D.scan.push(k); }); HS.ds = D.scan;
    donGocHang(); HANG = []; SX = null; SXK = []; SX_DOC = []; ghiHang(); luu(); dongHop(); veScan();
    return ds.filter(function(k){ return k.che==='the' && k.matTruoc; }).reduce(function(p, k){ return p.then(function(){ return sxAnhTuCCCD(k); }); }, Promise.resolve());
  }).then(function(){
    if(D.cauHinh.dbSauLuu!==false) henDongBoScan();
    bao('Đã lưu '+ds.length+' bản đúng khách: '+ds.map(function(k){ return k.maKH+' '+k.ten; }).join(', ')+'.', 6);
  }).catch(function(e){ baoLoi('Chưa lưu được: '+(e && e.message || e)); });
};
/* ảnh khách = mặt trước CCCD nén JPG ≤ 200 KB (khách chưa có ảnh) */
function sxNen200(b){
  return anhTuBlob(b).then(function(im){ var W = im.naturalWidth || im.width, H = im.naturalHeight || im.height, k = Math.min(1, 760/Math.max(W, H));
    var c = document.createElement('canvas'); c.width = Math.round(W*k); c.height = Math.round(H*k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
    var thu = function(q){ return canvasRaBlob(c, q).then(function(x){ return x.size<=195*1024 || q<=0.5 ? x : thu(Math.round((q-0.1)*10)/10); }); };
    return thu(0.85); });
}
function sxAnhTuCCCD(k){
  if(!k.maKH || (D.kyAnh||[]).some(function(x){ return x.loai==='anh' && x.maKH===k.maKH; })) return Promise.resolve(null);
  return docAnhHS(k.id+'_matTruoc').then(function(b){ if(!b) return null;
    return sxNen200(b).then(function(nen){ var d = nay(), a = {id:'ka'+idMoi(), loai:'anh', khach:k.ten, maKH:k.maKH, co:nen.size, ngay:ngayISO(d), luc:d.toISOString(), suaLuc:d.toISOString(), may:maMayCua(), tuCCCD:k.id};
      a.ten = sxTenKA(a);
      return luuAnhHS(a.id, nen).then(function(){ D.kyAnh = D.kyAnh || []; D.kyAnh.push(a); luu(); return a; }); }); }).catch(function(){ return null; });
}
/* chữ ký / ảnh chụp riêng: tên anh gõ ("ck-Võ Văn Hoàng" hoặc chỉ tên) — có trên Mẫu 31 thì gắn mã KH ngay */
var SX_KA_XONG_CU = kaXong;
kaXong = function(k){   /* chạy ngay sau khi lưu, trước khi đưa lên Drive */
  if(k && !k.maKH){ var b = sxBoc(k.khach); if(b.ten) k.khach = b.ten;
    var f = sxXacDinh({cccd:b.cccd, ma:b.ma, ten:b.ten || k.khach}); if(f.ma){ k.maKH = f.ma; k.khach = sxKhach(f.ma).ten; } k.ten = sxTenKA(k); luu(); }
  return SX_KA_XONG_CU(k);
};

/* ---------- 5. bản photo 2 mặt trên 1 tờ → chia đôi tờ ---------- */
var SX_BDS_CU = batDauScan;
batDauScan = function(loai){
  SX_BDS_CU(loai);
  if((SC.loai || scLoaiNho())!=='cccd') { SC.photo2 = false; return; }
  var e = document.querySelector('#hop-in .nguon'); if(!e) return;
  e.insertAdjacentHTML('afterend', '<label class="sx-photo2"><input type="checkbox"'+(SC.photo2 ? ' checked' : '')+' data-lenh="sx.photo2" data-su="change"> 🗎 <b>Bản photo 2 mặt trên 1 tờ</b> — chụp 1 lần cả tờ, app tự chia ra mặt trước / mặt sau</label>');
};
function sxChiaDoi(f){
  return anhTuBlob(f).then(function(im){
    var W = im.naturalWidth || im.width, H = im.naturalHeight || im.height, ngang = W>=H, chong = 0.04, ra = [];
    [0, 1].forEach(function(i){ var c = document.createElement('canvas');
      if(ngang){ var w = Math.round(W*(0.5+chong)), x = i ? W-w : 0; c.width = w; c.height = H; c.getContext('2d').drawImage(im, x, 0, w, H, 0, 0, w, H); }
      else { var h = Math.round(H*(0.5+chong)), y = i ? H-h : 0; c.width = W; c.height = h; c.getContext('2d').drawImage(im, 0, y, W, h, 0, 0, W, h); }
      ra.push(canvasRaBlob(c, 0.92).then(function(b){ return new File([b], String(f.name||'photo').replace(/\.\w+$/, '')+'_'+(i+1)+'.jpg', {type:'image/jpeg'}); })); });
    return Promise.all(ra);
  });
}
var SX_NHAN_CU = nhanVaoScan;
nhanVaoScan = function(fs, nguon){
  if(SC.che!=='the' || !SC.photo2) return SX_NHAN_CU(fs, nguon);
  var ds = Array.prototype.slice.call(fs||[]);
  batChay(false, 'Đang chia đôi tờ photo…');
  return ds.reduce(function(p, f){ return p.then(function(ra){ return /^image\//.test(f.type) || /\.(jpe?g|png|webp)$/i.test(f.name) ? sxChiaDoi(f).then(function(h){ return ra.concat(h); }) : ra.concat([f]); }); }, Promise.resolve([]))
    .then(function(ra){ tatChay(); return SX_NHAN_CU(ra, nguon); }, function(e){ tatChay(); baoLoi('Không chia được tờ photo: '+(e && e.message || e)); });
};

/* ---------- 6. 🧹 SẮP XẾP ---------- */
var SXP = null;   /* kế hoạch sắp xếp đang xem */
function sxDangCho(k){ return !k.maKH; }
function sxDemCho(){ return (D.scan||[]).filter(sxDangCho).length + (D.kyAnh||[]).filter(sxDangCho).length; }
function sxKeHoach(){
  var R = {khop:[], goiY:[], trung:[], chua:[], doiTen:[], doi:[]};
  var xet = function(k, laKA){
    var tenGoc = laKA ? (k.khach || k.ten) : k.ten;
    if(k.maKH){   /* đã có khách: tên đổi theo Mẫu 31 · file cũ chưa ở chỗ mới */
      var c = KHO.dsKhach()[k.maKH], tenMoi = c && c.ten;
      if(tenMoi && sxChuan(tenMoi)!==sxChuan(tenGoc)) R.doiTen.push({k:k, ka:laKA, ma:k.maKH, tu:tenGoc, ten:tenMoi});
      else if(k.driveId && k.duongDrive!==(laKA ? sxDuongKA(k) : duongScan(k))) R.doi.push({k:k, ka:laKA, ma:k.maKH, tu:(k.maKH+' - '+(tenGoc||''))});
      return; }
    var b = sxBoc(tenGoc), f = sxXacDinh({cccd:k.cccd || b.cccd, ma:b.ma, ten:b.ten});
    if(f.ma) R.khop.push({k:k, ka:laKA, ma:f.ma, theo:f.theo, tu:tenGoc});
    else if(f.goiY) R.goiY.push({k:k, ka:laKA, ma:f.goiY, ly:f.ly, tu:tenGoc});
    else if(f.ds) R.trung.push({k:k, ka:laKA, ds:f.ds, tu:tenGoc});
    else R.chua.push({k:k, ka:laKA, tu:tenGoc});
  };
  (D.scan||[]).forEach(function(k){ xet(k, false); });
  (D.kyAnh||[]).forEach(function(k){ xet(k, true); });
  /* chữ ký / ảnh / tài liệu cùng tên với 1 CCCD đã xác định (lần này hoặc trước) → gợi ý cùng khách (anh ✓ mới xếp) */
  var daRo = {}, ghi = function(t, ma){ t = sxChuan(t); if(!t) return; daRo[t] = (daRo[t] && daRo[t]!==ma) ? '-' : ma; };   /* 2 khách khác nhau cùng tên → không gợi ý */
  R.khop.forEach(function(x){ if(!x.ka && x.k.che!=='tailieu') ghi(sxBoc(x.tu).ten, x.ma); });
  (D.scan||[]).forEach(function(k){ if(k.maKH && k.che!=='tailieu') ghi(k.ten, k.maKH); });
  var keo = function(ds){ return ds.filter(function(x){ var b = sxBoc(x.tu), ma = daRo[sxChuan(b.ten)];
    if(!ma || ma==='-') return true; R.goiY.push({k:x.k, ka:x.ka, ma:ma, ly:'cùng tên với CCCD đã xác định', tu:x.tu}); return false; }); };
  R.trung = keo(R.trung); R.chua = keo(R.chua);
  return R;
}
/* 3.266 (anh hỏi "có đọc thêm số CCCD không"): bản CCCD chưa xác định khách, ảnh còn trong máy, chưa từng đọc → đọc QR / mã máy đọc từ ảnh,
   ghi số CCCD vào bản scan (đọc không được thì đánh dấu, lần sau không đọc lại) */
function sxDocTuAnh(){
  var ds = (D.scan||[]).filter(function(k){ return !k.maKH && k.che!=='tailieu' && !k.cccd && !k.cccdKhong && k.matTruoc; });
  if(!ds.length) return Promise.resolve(0);
  var n = 0, duoc = 0;
  batChay(false, 'Đang đọc số CCCD từ ảnh 0/'+ds.length+'…');
  return ds.reduce(function(p, k){ return p.then(function(){ n++; dangLamChu('Đang đọc số CCCD từ ảnh '+n+'/'+ds.length+'…'); tienChay(Math.round((n-1)/ds.length*100));
    return Promise.all([docAnhHS(k.id+'_matTruoc'), k.matSau ? docAnhHS(k.id+'_matSau') : null]).then(function(b){ if(!b[0]) return null; return docCCCD(b[0], b[1]); })
      .then(function(r){ if(r && r.cccd){ k.cccd = r.cccd; k.cccdDoc = {ten:r.ten||'', ns:r.ns||'', nguon:r.nguon}; duoc++; } else k.cccdKhong = 1; }, function(){ k.cccdKhong = 1; }); }); }, Promise.resolve())
    .then(function(){ luu(); tatChay(); if(duoc) bao('Đọc được số CCCD từ ảnh: '+duoc+'/'+ds.length+' bản.', 5); return duoc; }, function(){ tatChay(); return duoc; });
}
function moSapXep(){
  if(!SL_SAN) return slNap().then(moSapXep);
  if(!Object.keys(KHO.dsKhach()).length) return baoLoi('Chưa có danh bạ khách — nạp Mẫu 31 ở tab 📈 Số liệu › Nạp & KT trước.');
  sxDocTuAnh().then(function(){ SXP = sxKeHoach(); SXP.chon = {}; SXP.xn = {}; sxVeSapXep(); });
}
/* 3.267 (anh: "không thấy nút chọn hay xác định … bung lớn cửa sổ, cân đối cửa ô"): hộp rộng, 3 cột cân đối (loại · file · khách);
   trùng tên = nút tròn chọn 1 khách (+ Bỏ qua), gợi ý = ô tích "Đúng — xếp vào khách này"; chọn không vẽ lại cả hộp, chỉ đổi số ở nút Sắp xếp */
function sxDongKH(x, i, nhom){
  var ic = x.ka ? (x.k.loai==='ky' ? '✍ Chữ ký' : '🧑 Ảnh') : (x.k.che==='tailieu' ? '📄 Tài liệu' : '🪪 CCCD');
  var kh = function(m){ return '<span class="sx-kh-ten">'+coChuHTML(sxNhanKH(m))+'</span>'; };
  var phai = nhom==='khop' ? '✓ '+kh(x.ma)+' <small class="sx-ly">khớp '+coChuHTML(x.theo)+'</small>'
    : nhom==='goiY' ? '<label class="sx-r"><input type="checkbox" data-lenh="sx.xn" data-su="change" data-i="'+i+'"'+(SXP.xn[i] ? ' checked' : '')+'> <b>Đúng — xếp vào:</b> '+kh(x.ma)+'</label><small class="sx-ly vang">'+coChuHTML(x.ly)+'</small>'
    : nhom==='doiTen' ? 'tên mới theo Mẫu 31: <b>'+coChuHTML(x.ten)+'</b>'
    : nhom==='doi' ? 'dời về <b>'+coChuHTML((x.ka ? sxDuongKA(x.k) : duongScan(x.k)).replace(D.cauHinh.thumuc+' / ', ''))+'</b>'
    : nhom==='trung' ? x.ds.map(function(m){ return '<label class="sx-r"><input type="radio" name="sx-t'+i+'" data-lenh="sx.chon" data-su="change" data-i="'+i+'" data-ma="'+m+'"'+(SXP.chon[i]===m ? ' checked' : '')+'> '+kh(m)+'</label>'; }).join('')+
        '<label class="sx-r sx-bo"><input type="radio" name="sx-t'+i+'" data-lenh="sx.chon" data-su="change" data-i="'+i+'" data-ma=""'+(SXP.chon[i] ? '' : ' checked')+'> Bỏ qua (để sau, giữ ở thư mục chờ)</label>'
    : '<small>chưa có trên Mẫu 31 — giữ ở thư mục chờ</small>';
  return '<tr><td class="sx-c1">'+ic+'</td><td class="sx-c2">'+coChuHTML(x.tu||'')+'</td><td class="sx-c3">'+phai+'</td></tr>';
}
function sxViec(){ var R = SXP; return R.khop.length + R.doiTen.length + R.doi.length + Object.keys(R.chon).filter(function(i){ return R.chon[i]; }).length + Object.keys(R.xn).filter(function(i){ return R.xn[i]; }).length; }
function sxDemNut(){ var b = document.querySelector('#hop-in [data-lenh="sx.apDung"]'), n = sxViec(); if(!b) return;
  b.textContent = n ? '🧹 Sắp xếp '+n+' bản' : '🧹 Chưa có bản nào để xếp'; b.disabled = !n; }
function sxVeSapXep(){
  var R = SXP, khoi = function(ten, hd, ds, nhom, lop){ if(!ds.length) return '';
    return '<details'+(nhom!=='chua' ? ' open' : '')+' class="sx-khoi"><summary class="'+(lop||'')+'"><b>'+ten+'</b> — '+ds.length+' bản</summary>'+(hd ? '<div class="sx-hd">'+hd+'</div>' : '')+
      '<table class="to-bang luoi sx-bang"><thead><tr><th class="sx-c1">Loại</th><th class="sx-c2">File (tên đang có)</th><th class="sx-c3">Khách theo Mẫu 31</th></tr></thead><tbody>'+
      ds.map(function(x, j){ return sxDongKH(x, j, nhom); }).join('')+'</tbody></table></details>'; };
  var tong = R.khop.length+R.goiY.length+R.trung.length+R.doiTen.length+R.doi.length;
  moHop('<div class="hop-tit">🧹 Sắp xếp hồ sơ scan</div><div class="hop-phu">So với Mẫu 31. <b>Xác định chắc</b> = có số CCCD khớp 1 khách, hoặc khớp 2 trong 3 (số CCCD · mã KH · họ tên — tên so bỏ dấu, cho lệch nhỏ) '+
      '→ đặt tên <i>MãKH - Họ tên - Loại</i>, dời vào thư mục theo loại. Chưa chắc → giữ ở <i>'+SXT.cho+'</i> cho tới khi anh chọn. Thư mục cũ trống → thùng rác Drive (lấy lại 30 ngày).</div>'+
    khoi('✓ Xác định chắc — tự xếp', '', R.khop, 'khop', 'xanh')+
    khoi('? Gợi ý — chưa chắc', 'Tích ☑ <b>Đúng</b> ở dòng anh đồng ý; dòng không tích giữ ở thư mục chờ.', R.goiY, 'goiY', 'vang')+
    khoi('⚠ Trùng tên — anh chọn đúng khách', 'Bấm nút tròn ◉ trước khách đúng (xem ấp, tổ, xã để phân biệt). Không chắc thì để <b>Bỏ qua</b>.', R.trung, 'trung', 'vang')+
    khoi('✎ Đổi tên theo Mẫu 31', '', R.doiTen, 'doiTen')+khoi('↪ File cũ dời về chỗ mới', '', R.doi, 'doi')+khoi('⏳ Chưa có trên Mẫu 31', '', R.chua, 'chua')+
    (tong ? '' : '<div class="rong">Không có gì cần sắp xếp'+(R.chua.length ? ' (còn '+R.chua.length+' bản chưa có trên Mẫu 31)' : '')+'.</div>')+
    '<div class="sx-chan">'+GD.hang([GD.nut({chu:'Đóng', lenh:'sx.dong'}), GD.nut({chu:'🔍 Rà thêm file thả tay trong thư mục chờ', lenh:'sx.driveCho'}), GD.nut({chu:'🧹', lenh:'sx.apDung', chinh:1})], true)+'</div>', true);
  var h = document.getElementById('hop-in'); if(h) h.classList.add('xem-rong', 'sx-hop');
  sxDemNut();
}
function sxGan(k, ma, laKA){
  var c = sxKhach(ma);
  if(laKA){ k.maKH = ma; k.khach = c.ten; }
  else { k.maKH = ma; k.ten = c.ten; k.cccd = k.cccd || c.cccd; k.xa = c.xa; k.ap = c.ap; k.maXa = c.maXa; k.maAp = c.maAp; k.to = c.to; k.diem = c.diem; delete k.chuaKhai; if(k.che==='the' && (k.tag||[]).indexOf('CCCD')<0) k.tag = ['CCCD']; }
  k.suaLuc = new Date().toISOString(); if(!laKA && k.driveId) k.canDay = true;
}
function sxApDung(){
  var R = SXP; if(!R) return;
  if(!sxViec()) return bao('Chưa có bản nào để xếp — tích ☑ Đúng / chọn ◉ khách trước.', 4);
  var ds = R.khop.map(function(x){ return {x:x, ma:x.ma}; }).concat(R.goiY.filter(function(x, j){ return R.xn[j]; }).map(function(x){ return {x:x, ma:x.ma}; }), R.trung.map(function(x, j){ return {x:x, ma:R.chon[j]}; }).filter(function(y){ return y.ma; }));
  ds.forEach(function(y){ sxGan(y.x.k, y.ma, y.x.ka); });
  R.doiTen.forEach(function(x){ if(x.ka) x.k.khach = x.ten; else x.k.ten = x.ten; x.k.suaLuc = new Date().toISOString(); if(!x.ka && x.k.driveId) x.k.canDay = true; });
  R.doi.forEach(function(x){ if(!x.ka) x.k.canDay = true; });
  luu(); dongHop(); veScan();
  var dsKA = ds.filter(function(y){ return y.x.ka; }).map(function(y){ return y.x.k; }).concat(R.doiTen.concat(R.doi).filter(function(x){ return x.ka; }).map(function(x){ return x.k; }));
  var dsSC = ds.filter(function(y){ return !y.x.ka; }).map(function(y){ return y.x.k; }).concat(R.doiTen.concat(R.doi).filter(function(x){ return !x.ka; }).map(function(x){ return x.k; }));
  var n = dsKA.length + dsSC.length;
  if(!coTheNoiDrive()) return bao('Đã sắp xếp '+n+' bản trong app — nối Drive để dời file trên Drive.', 6);
  sxDoiDrive(dsSC, dsKA).then(function(r){ bao('🧹 Đã sắp xếp '+n+' bản'+(r.loi ? ' · '+r.loi+' bản chưa dời được (thử lại sau)' : '')+(r.xoa ? ' · dọn '+r.xoa+' thư mục cũ trống' : '')+'.', 7); veScan(); });
}
/* dời trên Drive: bản scan (đã có file) đổi tên + dời; chưa có file → đồng bộ thường lo · chữ ký / ảnh → dayKAMot; xong dọn thư mục cũ trống */
function sxDoiDrive(dsSC, dsKA){
  var cu = {}, loi = 0;
  batChay(false, 'Đang sắp xếp trên Drive…');
  return dsSC.reduce(function(p, k){ return p.then(function(){ if(!k.driveId) return;
      return baoDamDuong(duongScan(k)).then(function(idTM){ return sxDoi(k, idTM, tenScanDrive(k)); }).then(function(c){ if(c) cu[c] = 1; k.duongDrive = duongScan(k); delete k.canDay; }, function(){ loi++; }); }); }, Promise.resolve())
    .then(function(){ return dsKA.reduce(function(p, k){ return p.then(function(){ var c0 = k.driveCha; return dayKAMot(k.id, true).then(function(){ if(c0 && c0!==k.driveCha) cu[c0] = 1; if(k.driveId) k.duongDrive = sxDuongKA(k); }); }); }, Promise.resolve()); })
    .then(function(){ luu(); henDongBoScan(); return sxDonThuMuc(Object.keys(cu)); })
    .then(function(xoa){ tatChay(); return {loi:loi, xoa:xoa}; }, function(){ tatChay(); return {loi:loi+1, xoa:0}; });
}
/* thư mục cũ trống → thùng rác Drive; đi ngược lên cha (không xóa thư mục gốc, 4 thư mục mới) */
function sxDonThuMuc(ids){
  var xoa = 0, da = {};
  var mot = function(id){ if(!id || da[id]) return Promise.resolve(); da[id] = 1;
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+id+'?fields=id,name,parents,mimeType').then(function(f){
      if(!f || f.mimeType!=='application/vnd.google-apps.folder' || f.name===D.cauHinh.thumuc || SXT_GIU.indexOf(f.name)>=0 || (DR.thuMuc && DR.thuMuc[D.cauHinh.thumuc]===id)) return;
      return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+id+"' in parents and trashed=false")+'&fields=files(id)&pageSize=1').then(function(r){
        if(r && r.files && r.files.length) return;
        return goiDrive('https://www.googleapis.com/drive/v3/files/'+id, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({trashed:true})}).then(function(){ xoa++;
          if(DR.thuMuc) Object.keys(DR.thuMuc).forEach(function(d){ if(DR.thuMuc[d]===id) delete DR.thuMuc[d]; });
          return mot((f.parents||[])[0]); }); }); }).catch(function(){}); };
  return ids.reduce(function(p, id){ return p.then(function(){ return mot(id); }); }, Promise.resolve()).then(function(){ return xoa; });
}
/* file anh thả tay vào thư mục chờ (không qua app): đọc chữ đầu tên → loại; tra Mẫu 31 → đặt tên + dời */
function sxDriveCho(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive.');
  var biet = {}; (D.scan||[]).concat(D.kyAnh||[]).forEach(function(k){ if(k.driveId) biet[k.driveId] = 1; });
  batChay(false, 'Đang rà thư mục chờ trên Drive…');
  baoDamDuong([D.cauHinh.thumuc, SXT.cho].join(' / ')).then(function(idCho){
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+idCho+"' in parents and trashed=false")+'&fields=files(id,name,mimeType)&pageSize=1000').then(function(r){
      var fs = ((r && r.files) || []).filter(function(f){ return !biet[f.id] && f.mimeType!=='application/vnd.google-apps.folder'; }), xong = 0, con = [];
      return fs.reduce(function(p, f){ return p.then(function(){
        var b = sxBoc(f.name), anh = /\.(jpe?g|png)$/i.test(f.name), loai = b.loai || (anh ? 'anh' : 'cccd'), t = sxXacDinh({cccd:b.cccd, ma:b.ma, ten:b.ten});
        if(!t.ma){ con.push(f.name+(t.ds ? ' (trùng '+t.ds.length+' khách)' : t.goiY ? ' (chưa chắc: '+t.ly+')' : '')); return; }
        var c = sxKhach(t.ma), tm = loai==='ky' || loai==='anh' ? SXT.ka : loai==='cccd' ? SXT.cccd : SXT.tl;
        var lt = loai==='ky' ? 'Chữ ký' : loai==='anh' ? 'Ảnh' : loai==='cccd' ? 'CCCD' : String(loai).replace(/^tl:/, '').toUpperCase();
        return baoDamDuong([D.cauHinh.thumuc, tm].join(' / ')).then(function(idTM){
          return sxDoi({driveId:f.id, driveCha:idCho}, idTM, sxTenChuan(t.ma, c.ten, lt, (/\.\w+$/.exec(f.name) || ['.pdf'])[0].toLowerCase())); }).then(function(){ xong++; }); }); }, Promise.resolve())
        .then(function(){ tatChay(); bao('Thư mục chờ: '+fs.length+' file thả tay · đã sắp xếp '+xong+(con.length ? ' · còn '+con.length+': '+con.slice(0, 5).join(', ')+(con.length>5 ? '…' : '') : '')+'.', 9); });
    });
  }).catch(function(e){ tatChay(); baoLoi('Chưa rà được thư mục chờ: '+(e && e.message || e)); });
}

/* ---------- 7. 📊 KIỂM TRA theo cây địa bàn ---------- */
var SXK_BANG = null, SXK_MO = '';
function moKiemScan(){
  if(!SL_SAN) return slNap().then(moKiemScan);
  var ds = typeof toDsKy==='function' ? toDsKy() : []; if(!ds.length) return baoLoi('Chưa có Mẫu 31 — nạp ở tab 📈 Số liệu › Nạp & KT trước.');
  var ky = (ds.find(function(x){ return String(x.ky).length===7; }) || ds[0]).ky;
  batChay(false, 'Đang dựng bảng kiểm tra…');
  toNap(ky).then(function(K){ tatChay(); SXK_BANG = sxKiemDung(K); sxKiemVe(''); }, function(e){ tatChay(); baoLoi('Chưa mở được Mẫu 31: '+(e && e.message || e)); });
}
function sxKiemDung(K){
  var co = {cccd:{}, ky:{}, anh:{}};
  (D.scan||[]).forEach(function(k){ if(k.maKH && k.che!=='tailieu') co.cccd[k.maKH] = 1; });
  (D.kyAnh||[]).forEach(function(k){ if(k.maKH) co[k.loai==='ky' ? 'ky' : 'anh'][k.maKH] = 1; });
  var X = {}, thu = [];
  Object.keys(K.to||{}).forEach(function(ma){ var t = K.to[ma]; if(toLaTT(t)) return;
    var kh = {}; (K.kh[ma]||[]).forEach(function(o){ if(o.kh && !kh[o.kh]) kh[o.kh] = o.ten||o.kh; });
    var ho = Object.keys(kh).map(function(m){ return {ma:m, ten:kh[m], cccd:!!co.cccd[m], ky:!!co.ky[m], anh:!!co.anh[m]}; });
    var xk = (t.tenXa||'?')+'|'+(t.tenDiemDu||''), x = X[xk]; if(!x){ x = X[xk] = {xa:t.tenXa||'?', diem:t.tenDiem ? String(t.tenDiem).trim() : '(chưa rõ điểm GD)', to:[]}; thu.push(x); }
    x.to.push({ma:ma, ten:t.ten||ma, ap:t.tenThon||'', ho:ho}); });
  thu.sort(function(a, b){ return (a.xa+a.diem).localeCompare(b.xa+b.diem, 'vi'); });
  thu.forEach(function(x){ x.to.sort(function(a, b){ return (a.ap+a.ten).localeCompare(b.ap+b.ten, 'vi'); }); });
  return {ky:K.ky, ds:thu};
}
function sxDem(ho){ var d = {n:ho.length, cccd:0, ky:0, anh:0, thieu:0}; ho.forEach(function(h){ if(h.cccd) d.cccd++; if(h.ky) d.ky++; if(h.anh) d.anh++; if(!h.cccd || !h.ky) d.thieu++; }); return d; }
function sxKiemVe(moTo){
  var B = SXK_BANG; if(!B) return; SXK_MO = moTo || '';
  var dong = function(nhan, d, lop, maTo){ return '<tr'+(lop ? ' class="'+lop+'"' : '')+(maTo ? ' data-lenh="sx.moTo" data-to="'+maTo+'" style="cursor:pointer"' : '')+'><td>'+nhan+'</td><td class="so">'+d.n+'</td><td class="so">'+d.cccd+'</td><td class="so">'+d.ky+'</td><td class="so">'+d.anh+'</td><td class="so'+(d.thieu ? ' do' : '')+'">'+(d.thieu||'')+'</td></tr>'; };
  var cong = function(ds){ var t = {n:0, cccd:0, ky:0, anh:0, thieu:0}; ds.forEach(function(d){ Object.keys(t).forEach(function(f){ t[f] += d[f]; }); }); return t; };
  var h = '', tatCa = [];
  B.ds.forEach(function(x){ var dsTo = x.to.map(function(t){ return sxDem(t.ho); }), tx = cong(dsTo); tatCa.push(tx);
    h += dong('<b>'+coChuHTML(x.xa)+' › '+coChuHTML(x.diem)+'</b>', tx, 'tong');
    x.to.forEach(function(t, i){ h += dong('Tổ '+coChuHTML(t.ten)+(t.ap ? ' · '+coChuHTML(t.ap) : ''), dsTo[i], '', t.ma);
      if(moTo===t.ma) h += '<tr><td colspan="6"><div class="sx-ho">'+t.ho.map(function(o){ var v = function(b){ return b ? '✓' : '<b class="do">✗</b>'; };
        return '<span>'+coChuHTML(o.ten)+' <small>'+o.ma+'</small> 🪪'+v(o.cccd)+' ✍'+v(o.ky)+' 🧑'+v(o.anh)+'</span>'; }).join('')+'</div></td></tr>'; }); });
  var T = cong(tatCa);
  moHop('<div class="hop-tit">📊 Kiểm tra hồ sơ scan theo địa bàn</div><div class="hop-phu">Số hộ = tổ viên trên Mẫu 31 '+coChuHTML(slKyChu(B.ky))+'. Có CCCD / chữ ký / ảnh = đã có bản lưu gắn mã KH. Thiếu = chưa có CCCD hoặc chữ ký. Bấm 1 tổ để xem từng hộ.</div>'+
    '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi"><thead><tr><th>Xã › điểm GD · tổ</th><th>Số hộ</th><th>🪪 CCCD</th><th>✍ Chữ ký</th><th>🧑 Ảnh</th><th>Thiếu</th></tr></thead><tbody>'+
      h+dong('<b>Cộng</b>', T, 'tong')+'</tbody></table></div>'+
    GD.hang([GD.nut({chu:'Đóng', lenh:'sx.dong'}), GD.nut({chu:'📊 Excel', lenh:'sx.kiemExcel'})], true), true);
}
function sxKiemExcel(){
  var B = SXK_BANG; if(!B) return;
  xongTV.then(function(){ if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel.');
    var a = [['KIỂM TRA HỒ SƠ SCAN THEO ĐỊA BÀN — Mẫu 31 '+slKyChu(B.ky)], [], ['Xã', 'Điểm GD', 'Tổ', 'Ấp', 'Mã KH', 'Họ tên', 'CCCD', 'Chữ ký', 'Ảnh']];
    B.ds.forEach(function(x){ x.to.forEach(function(t){ t.ho.forEach(function(o){ a.push([x.xa, x.diem, t.ten, t.ap, o.ma, o.ten, o.cccd ? 'x' : '', o.ky ? 'x' : '', o.anh ? 'x' : '']); }); }); });
    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), 'Kiem tra scan');
    taiXuongBlob(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Kiem tra scan '+B.ky+'.xlsx'); });
}

/* ---------- 8. tab Scan: dòng 🧹 Sắp xếp · 📊 Kiểm tra ---------- */
var SX_VE_CU = veScan;
veScan = function(){
  SX_VE_CU();
  var e = document.getElementById('tr4'); if(!e || !HS.mo || !e.firstElementChild) return;
  var n = sxDemCho();
  e.firstElementChild.insertAdjacentHTML('afterend', '<div class="thanh-chon sx-thanh"><span>'+(n ? '⏳ <b>'+n+'</b> bản chờ sắp xếp (chưa gắn khách)' : '✓ Mọi bản đã gắn khách')+'</span>'+
    '<button data-lenh="sx.sapXep">🧹 Sắp xếp</button><button data-lenh="sx.kiem">📊 Kiểm tra</button></div>');
};
