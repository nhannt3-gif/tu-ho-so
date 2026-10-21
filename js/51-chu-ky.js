/* ==========================================================
   3.306 — CHỮ KÝ / LĂN TAY: NHẬN DẠNG, DỌN BẢN QUÉT NHẦM, BỎ ẢNH KHÁCH LƯU SẴN, NÚT BẢN PHOTO 2 MẶT (lớp Nghiệp vụ + Giao diện Scan)
   Anh 21/10/2026: "các ck có sẵn do quét nhầm CCCD em bỏ đi, nên có cơ chế nhận dạng chữ ký và lăn tay của hộ vay tránh lưu nhầm;
   nút scan ảnh nên bỏ — khi cần ảnh sẽ xuất 1 mặt từ CCCD, làm nhẹ đi để dùng khi cần và không lưu sẵn; thay bằng nút scan bản photo 2 mặt trên 1 tờ".
   - kyPhanLoai(ảnh) → ky (chữ ký: nét mảnh thưa trên nền giấy) · lantay (dấu vân tay: 1 khối gọn, vân dày đặc) · the (ảnh CCCD: đọc được QR /
     mã máy đọc / số 12 chữ số) · trong (gần như trắng) · khac (không rõ). Nét rõ là chữ ký / lăn tay thì khỏi đọc chữ (nhanh).
   - Lưu chữ ký: ảnh CCCD → không lưu, báo quét ở 🪪 CCCD; trắng / không rõ → hỏi "vẫn lưu?"; lăn tay → ghi kieuKy (cột Ck hiện 🖐).
   - 🗂 Quản lý › ✍ Rà chữ ký (tự chạy 1 lần): chữ ký thật ra là ảnh CCCD, ảnh trắng, ảnh khách lưu sẵn → tích sẵn, anh bấm mới vào 🗑 Thùng rác.
   - Không tạo ảnh khách từ CCCD nữa (xuất khi cần: 💾 cột Scan → 🧑 Ảnh = mặt trước CCCD nén ≤ 200 KB, 50).
   - Hộp "Quét gì?": bỏ 🧑 Ảnh khách, thêm 🗎 Bản photo CCCD (2 mặt trên 1 tờ — app tách 2 thẻ; trước là ô tích dưới CCCD).
   ========================================================== */
var KY_TEN = {ky:'Chữ ký', lantay:'Lăn tay', the:'Ảnh CCCD', trong:'Ảnh trắng', khac:'Không rõ', anh:'Ảnh khách lưu sẵn', mat:'Không có ảnh'};

/* đặc trưng nét: tỉ lệ mực, mực trong khung bao, số lần đổi mực / nền mỗi 100 điểm ảnh theo hàng (vân tay dày), vùng màu không phải mực (thẻ) */
function kyDacTrung(c){
  var s = Math.min(1, 400/Math.max(c.width, c.height)), W = Math.max(1, Math.round(c.width*s)), H = Math.max(1, Math.round(c.height*s));
  var t = document.createElement('canvas'); t.width = W; t.height = H; var g = t.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.drawImage(c, 0, 0, W, H);
  var p = g.getImageData(0, 0, W, H).data, bg = nenSang(p, W, H, -1, 12, 0.85), M = new Uint8Array(W*H), mau = 0, muc = 0, hx = new Uint32Array(W), hy = new Uint32Array(H), i;
  for(i=0;i<W*H;i++){ var j = i*4, mx = Math.max(p[j], p[j+1], p[j+2]), mn = Math.min(p[j], p[j+1], p[j+2]), l = (p[j]*0.3+p[j+1]*0.59+p[j+2]*0.11)*240/Math.max(60, bg[j]), sa = mx ? (mx-mn)/mx : 0;
    if(l<140 || (sa>0.35 && mx-mn>50 && l<200)){ M[i] = 1; muc++; hx[i%W]++; hy[(i/W)|0]++; }
    else if(sa>0.18 && mx-mn>25) mau++; }
  var f = {muc:muc/(W*H), mau:mau/(W*H), mat:0, khung:0, doi:0};
  if(muc<10) return f;
  var bien = function(h, n){ var a = -1, b = -1, cum = 0, k; for(k=0;k<n;k++){ cum += h[k]; if(a<0 && cum>muc*0.01) a = k; if(b<0 && cum>=muc*0.99) b = k; } return [a, Math.max(a, b)]; };
  var bx = bien(hx, W), by = bien(hy, H), bw = bx[1]-bx[0]+1, bh = by[1]-by[0]+1, trong = 0, doi = 0, hang = 0, x, y;
  for(y=by[0];y<=by[1];y++){ var truoc = 0, d = 0; for(x=bx[0];x<=bx[1];x++){ var v = M[y*W+x]; trong += v; if(v!==truoc){ d++; truoc = v; } } if(y%2===0){ doi += d; hang++; } }
  f.mat = trong/(bw*bh); f.khung = bw*bh/(W*H); f.doi = hang ? doi/hang/Math.max(1, bw/100) : 0; f.tl = bw/Math.max(1, bh);
  /* mực đặc: điểm mực mà cả 8 điểm cách 3 cũng là mực — ảnh chân dung, QR, dấu tròn của thẻ; nét ký / vân tay mảnh nên gần như không có */
  var dac = 0; for(y=3;y<H-3;y++) for(x=3;x<W-3;x++){ var q = y*W+x; if(M[q] && M[q-3] && M[q+3] && M[q-3*W] && M[q+3*W] && M[q-3*W-3] && M[q-3*W+3] && M[q+3*W-3] && M[q+3*W+3]) dac++; }
  f.dac = dac/(W*H);
  return f;
}
function kyTheoNet(f){
  if(f.muc<0.003) return {loai:'trong', ly:'ảnh gần như trắng'};
  if(f.mau<0.12 && f.dac<0.03 && f.doi>=9 && f.mat>0.22 && f.mat<0.8 && f.khung<0.75 && f.tl>0.4 && f.tl<2.5) return {loai:'lantay', ly:'khối vân dày'};
  if(f.mau<0.04 && f.dac<0.008 && f.muc<0.12 && f.mat<0.3 && f.doi<9) return {loai:'ky', ly:'nét mảnh thưa'};
  return null;
}
/* 3.309 (anh: "chữ ký rác anh chạy và xóa rồi nhưng vẫn còn hiện lên"): nét giống chữ ký chưa chắc — ảnh CCCD mờ / photo cũng có thể
   ra "nét thưa" → luôn đọc thử QR / mã máy đọc / số thẻ (trừ ảnh trắng); đọc ra số thẻ là ảnh CCCD */
var KY_BAN = '3.309';
function kyPhanLoai(bl){
  return anhTuBlob(bl).then(function(im){
    var c = document.createElement('canvas'); c.width = im.naturalWidth || im.width; c.height = im.naturalHeight || im.height; c.getContext('2d').drawImage(im, 0, 0);
    var f = kyDacTrung(c), r = kyTheoNet(f);
    if(r && r.loai==='trong'){ r.f = f; return r; }
    if(r) return docCCCD(bl, bl).then(function(d){ return d ? {loai:'the', ly:'nét giống chữ ký nhưng đọc được '+(d.nguon || 'số CCCD')+(d.cccd ? ' '+d.cccd : ''), f:f} : (r.f = f, r); }, function(){ r.f = f; return r; });
    return docCCCD(bl, bl).then(function(d){ return d ? {loai:'the', ly:'đọc được '+(d.nguon || 'số CCCD')+(d.cccd ? ' '+d.cccd : ''), f:f} : {loai:'khac', ly:'không giống nét chữ ký / vân tay', f:f}; },
      function(){ return {loai:'khac', ly:'không giống nét chữ ký / vân tay (chưa đọc được chữ)', f:f}; });
  });
}

/* ---------- lưu chữ ký: xét trước khi lưu ---------- */
var KY_LUU_CU = luuKA;
luuKA = function(cach){
  if(KA.loai!=='ky') return KY_LUU_CU(cach);
  var e = document.getElementById('ka-ten2'); if(e && e.value.trim()){ KA.ten = e.value; KA.tenLuc = Date.now(); }
  if(!String(KA.ten||'').trim()) return KY_LUU_CU(cach);   /* chưa có tên → hàm cũ báo */
  if(KA.xet && KA.xet.bl===KA.bl && KA.bl) return KY_LUU_CU(cach);   /* đã xét (anh bấm "vẫn lưu") */
  batChay(false, 'Đang nhận dạng chữ ký…');
  (KA.bl ? Promise.resolve(KA.bl) : dungKA()).then(function(b){ KA.bl = b; return kyPhanLoai(b); }).then(function(r){
    tatChay(); KA.xet = {bl:KA.bl, loai:r.loai};
    if(r.loai==='ky' || r.loai==='lantay') return KY_LUU_CU(cach);
    if(r.loai==='the') return baoLoi('Ảnh này là CCCD ('+r.ly+') — không lưu làm chữ ký. Quét CCCD ở 🪪 CCCD.');
    hoi(KY_TEN[r.loai]+' — không giống chữ ký hay lăn tay', 'App nhận thấy: '+r.ly+'. Vẫn lưu ảnh này làm chữ ký của '+String(KA.ten).trim()+'?', 'Vẫn lưu', function(){ KY_LUU_CU(cach); });
  }).catch(function(e){ tatChay(); baoLoi('Chưa nhận dạng được: '+(e && e.message || e)); });
};
var KY_XONG_CU = kaXong;
kaXong = function(k){
  if(k && k.loai==='ky' && KA.xet && (KA.xet.loai==='ky' || KA.xet.loai==='lantay')){ k.kyXet = KA.xet.loai; k.kyXetBan = KY_BAN; if(KA.xet.loai==='lantay') k.kieuKy = 'lantay'; luu(); }
  return KY_XONG_CU(k);
};

/* ---------- không lưu sẵn ảnh khách từ CCCD (xuất khi cần — 50) ---------- */
sxAnhTuCCCD = function(){ return Promise.resolve(null); };

/* ---------- ✍ Rà chữ ký đã lưu ---------- */
var KYR = {dang:false, ds:[], chon:{}};
function kyRaChon(x){ return x.loai==='the' || x.loai==='trong' || x.loai==='anh'; }
function kyDaXet(a){ return a.kyXetBan===KY_BAN && (a.kyXet==='ky' || a.kyXet==='lantay'); }
function kyRaChay(tuDong){
  if(KYR.dang) return Promise.resolve();
  var ds = (D.kyAnh||[]).slice(), n = 0, can = ds.filter(function(a){ return a.loai==='ky' && !kyDaXet(a); }).length;
  KYR = {dang:true, ds:[], chon:{}};
  if(!tuDong) batChay(false, 'Đang rà '+can+' chữ ký…');
  return ds.reduce(function(p, a){ return p.then(function(){
    if(a.loai!=='ky'){ KYR.ds.push({a:a, loai:'anh', ly:'từ nay không lưu sẵn — cần thì 💾 xuất từ mặt trước CCCD'}); return; }
    if(kyDaXet(a)){ KYR.ds.push({a:a, loai:'ok', ly:KY_TEN[a.kyXet]}); return; }
    n++; if(!tuDong) dangLamChu('Đang rà chữ ký '+n+'/'+can+'…');
    return layAnhKA(a).then(function(b){ return b ? kyPhanLoai(b) : {loai:'mat', ly:'ảnh không có trong máy này, chưa lên Drive'}; }).then(function(r){
      if(r.loai==='ky' || r.loai==='lantay'){ a.kyXet = r.loai; a.kyXetBan = KY_BAN; if(r.loai==='lantay') a.kieuKy = 'lantay'; else delete a.kieuKy; KYR.ds.push({a:a, loai:'ok', ly:KY_TEN[r.loai]+' — '+r.ly}); return; }
      KYR.ds.push({a:a, loai:r.loai, ly:r.ly});
    }).catch(function(){});
  }); }, Promise.resolve()).then(function(){
    KYR.dang = false; KYR.ds.forEach(function(x){ if(kyRaChon(x)) KYR.chon[x.a.id] = 1; });
    D.cauHinh.kyRa = KY_BAN; luu();
    if(!tuDong){ tatChay(); return kyRaVe(); }
    var nh = KYR.ds.filter(kyRaChon).length; if(!nh) return;
    if(!document.querySelector('#hop.hien')) kyRaVe();
    else bao('✍ Rà chữ ký: '+nh+' mục nghi nhầm (ảnh CCCD / ảnh khách lưu sẵn) — xem ở 🗂 Quản lý hồ sơ scan › ✍ Rà chữ ký.', 8);
  });
}
function kyRaVe(){
  var e = coChuHTML, nh = {}, thu = ['the', 'trong', 'anh', 'khac', 'mat', 'ok'];
  KYR.ds.forEach(function(x){ (nh[x.loai] = nh[x.loai] || []).push(x); });
  var n = Object.keys(KYR.chon).length, ten = {the:'🪪 Chữ ký thật ra là ảnh CCCD (quét nhầm)', trong:'⬜ Ảnh trắng', anh:'🧑 Ảnh khách lưu sẵn', khac:'❔ Không rõ — anh xem', mat:'☁ Không có ảnh', ok:'✓ App nhận là chữ ký / lăn tay — anh xem, sai thì tích'};
  moHop('<div class="hop-tit">✍ Rà chữ ký đã lưu</div>'+
    '<div class="hop-phu">App nhận dạng từng ảnh: chữ ký (nét mảnh thưa) · lăn tay (khối vân dày) · ảnh CCCD (đọc được QR / số thẻ). Mục tích sẵn là nghi nhầm — bấm Bỏ thì vào 🗑 Thùng rác (khôi phục được). '+
      'Nhóm cuối là ảnh app nhận đúng — anh xem lướt, ảnh nào sai thì tích.</div>'+
    (KYR.ds.length ? thu.filter(function(k){ return nh[k]; }).map(function(k){
      return '<div class="nhan-nhom">'+ten[k]+' ('+nh[k].length+')</div>'+nh[k].map(function(x){ var a = x.a;
        return '<label class="ky-ra-dong"><input type="checkbox" data-lenh="ky.chon" data-su="change" data-k="'+a.id+'"'+(KYR.chon[a.id] ? ' checked' : '')+'>'+
          '<img data-ky-anh="'+a.id+'" alt=""><span><b>'+e(a.khach || a.ten || '')+'</b>'+(a.maKH ? ' · '+e(a.maKH) : '')+'<small>'+e(x.ly)+'</small></span></label>'; }).join(''); }).join('')
      : '<div class="hop-phu">Chưa có chữ ký nào.</div>')+
    '<div class="hang-nut" style="margin-top:12px">'+(n ? '<button class="xau" data-lenh="ky.bo">🗑 Bỏ '+n+' mục đã tích</button>' : '')+
      '<button data-lenh="ky.lai">↻ Rà lại</button><button data-lenh="ky.dong">Đóng</button></div>', true);
  if(typeof qlGanThe==='function') qlGanThe('ky');
  Array.prototype.forEach.call(document.querySelectorAll('#hop [data-ky-anh]'), function(im){
    var a = (D.kyAnh||[]).find(function(x){ return x.id===im.getAttribute('data-ky-anh'); }); if(!a) return;
    docAnhHS(a.id).then(function(b){ if(!b) return; var u = URL.createObjectURL(b); im.src = u; thuHoiSau(u); }).catch(function(){});
  });
}
function kyRaBo(){
  var ids = Object.keys(KYR.chon).filter(function(id){ return (D.kyAnh||[]).some(function(a){ return a.id===id; }); }); if(!ids.length) return;
  xoaNhieuVaoRac(ids, function(){ KYR.ds = KYR.ds.filter(function(x){ return ids.indexOf(x.a.id)<0; }); KYR.chon = {}; kyRaVe(); if(nganHienTai===4) veScan(); });
}
GD.dangKy('ky', {
  ra:function(){ if(KYR.ds.length) return kyRaVe(); kyRaChay(false); },
  lai:function(){ kyRaChay(false); },
  chon:function(el){ var id = el.getAttribute('data-k'); if(el.checked) KYR.chon[id] = 1; else delete KYR.chon[id];
    var b = document.querySelector('#hop [data-lenh="ky.bo"]'), n = Object.keys(KYR.chon).length;
    if(b) b.textContent = '🗑 Bỏ '+n+' mục đã tích'; else if(n) kyRaVe(); },
  bo:function(){ kyRaBo(); },
  dong:function(){ dongHop(); }
});
/* thẻ thứ 4 ở 🗂 Quản lý hồ sơ scan */
var KY_QL_THE = qlThe;
qlThe = function(dang){ return KY_QL_THE(dang).replace(/<\/div>$/, '<button type="button" class="gdx-c gd-chip'+(dang==='ky' ? ' bat' : '')+'" data-lenh="ky.ra">✍ Rà chữ ký</button></div>'); };
/* tự rà 1 lần khi vào tab Scan (bản 3.306 trở đi) */
var KY_VE_SCAN = veScan;
veScan = function(){
  KY_VE_SCAN.apply(this, arguments);
  if(D.cauHinh.kyRa===KY_BAN || KYR.dang || KYR.hen || !(D.kyAnh||[]).length) return;   /* 3.309: rà lại 1 lần theo cách xét mới */
  KYR.hen = setTimeout(function(){ KYR.hen = 0; if(D.cauHinh.kyRa!==KY_BAN && nganHienTai===4) kyRaChay(true); }, 4000);
};

/* ---------- "Quét gì?": 🧑 Ảnh khách → 🗎 Bản photo CCCD (2 mặt trên 1 tờ) ---------- */
delete SC_LOAI.anhkh;
SC_LOAI.photo = {ic:'🗎', ten:'Bản photo CCCD', mo:'2 mặt trên 1 tờ — app tách ra'};
var KY_BDS = batDauScan;
batDauScan = function(loai){
  KY_BDS(loai);
  Array.prototype.forEach.call(document.querySelectorAll('#hop-in .sx-photo2'), function(x){ x.remove(); });   /* ô tích cũ dưới CCCD → nay là nút riêng */
};
var KY_CHON_NGUON = scChonNguon;
scChonNguon = function(n){
  var l = SC.loai || scLoaiNho();
  if(l!=='photo') return KY_CHON_NGUON(n);
  D.cauHinh.scanLoai = 'photo'; D.cauHinh.scanNguon = n; SC.che = 'the'; D.cauHinh.scanChe = 'the'; SC.photo2 = true; luu();
  chonNguon(n === 'file' ? 'photo' : n);
};
/* tờ photo: dò đúng 2 khung thẻ (cách dò của bản CCCD cũ 3.284) + chừa lề; không dò được → chia đôi tờ như cũ */
var KY_CHIA_DOI = sxChiaDoi;
sxChiaDoi = function(f){
  return anhTuBlob(f).then(function(im){
    if(sxMotTheLon(im)) return [f];
    var c = document.createElement('canvas'); c.width = im.naturalWidth || im.width; c.height = im.naturalHeight || im.height; c.getContext('2d').drawImage(im, 0, 0);
    var hai = null; try{ hai = sxCatThe2(c) || sxCatThe(c); }catch(e){}
    if(!hai || hai.length<2) return KY_CHIA_DOI(f);
    return Promise.all(hai.map(function(x, i){
      var le = Math.round(Math.max(x.width, x.height)*0.04), r = document.createElement('canvas'); r.width = x.width+2*le; r.height = x.height+2*le;
      var g = r.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, r.width, r.height); g.drawImage(x, le, le);
      return canvasRaBlob(r, 0.92).then(function(b){ return new File([b], String(f.name||'photo').replace(/\.\w+$/, '')+'_'+(i+1)+'.jpg', {type:'image/jpeg'}); });
    }));
  });
};

/* ---------- 3.309 (anh: "khi chọn 1 KH sẽ hiện CCCD và ck phía dưới nếu có"): khung xem — dải chữ ký dưới nội dung CCCD ---------- */
var KY_XEM_THU = xemThu;
xemThu = function(loai, id, i){
  KY_XEM_THU(loai, id, i);
  Array.prototype.forEach.call(document.querySelectorAll('.sx-ck-xem'), function(x){ x.remove(); });
  var m = loai==='scan' ? timScan(id) : null; if(!m || m.che==='tailieu') return;
  var a = xkCuaKhach(m, 'ky'); if(!a) return;
  var cp = document.getElementById('cotphai'), than = document.getElementById(cp && cp.offsetParent && !anPV ? 'cp-than' : 'x-than'); if(!than) return;
  var lt = a.kieuKy==='lantay';
  than.insertAdjacentHTML('afterend', '<div class="sx-ck-xem" data-lenh="sx.xemHS" data-loai="ka" data-id="'+a.id+'" title="Bấm để xem lớn">'+
    '<span>'+(lt ? '🖐 Lăn tay' : '✍ Chữ ký')+'</span><img alt=""></div>');
  layAnhKA(a).then(function(b){ var im = document.querySelector('.sx-ck-xem img'); if(!b || !im) return; var u = URL.createObjectURL(b); im.src = u; thuHoiSau(u); }).catch(function(){});
};

/* ---------- 3.309 (anh: "chức năng thừa hay trùng trong nút ⋯ thì bỏ"): hộp 📁 Chữ ký · CCCD cũ không còn —
   chụp chữ ký ở Quét gì? › ✍ Chữ ký, xem ở cột Ck / khung xem, xuất ở 💾, dọn ở ✍ Rà chữ ký. Các nút "Về danh sách / Đóng" cũ → về tab Scan */
moKyAnh = function(){ dongHop(); if(typeof BOT!=='undefined' && BOT.tab==='kyAnh'){ BOT = {tab:'', chon:{}}; document.body.classList.remove('dang-bot'); } if(nganHienTai===4) veScan(); };
