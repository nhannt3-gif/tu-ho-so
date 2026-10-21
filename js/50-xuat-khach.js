/* ==========================================================
   3.304 — CHỮ KÝ GẮN CÙNG CCCD + XUẤT FILE THEO KHÁCH (lớp Nghiệp vụ + Giao diện tab Scan)
   Anh 21/10/2026: "thu gọn cột xem lại vừa CCCD là được, thêm 1 cột Ck cạnh cột CCCD, khách nào có ck thì hiện ra,
   khi cần xuất sẽ có nút chọn 1 khách và xuất ck, CCCD mỗi loại 1 file nhẹ, chỉ định lưu trên máy tại thư mục chỉ định".
   - Bảng Scan: cột "Ck" cạnh "Loại giấy tờ" — bản CCCD của khách có chữ ký (D.kyAnh, cùng mã KH; chưa có mã thì cùng họ tên) hiện ✍.
   - Nút 💾 cuối dòng bản CCCD → hộp Xuất file: tích CCCD (2 mặt ghép 1 JPG ≤ 200 KB) · Chữ ký · Ảnh khách (nếu có), mỗi loại 1 file,
     tên chuẩn "MãKH - Họ tên - Loại.jpg" (sổ quy tắc 49) → ghi thẳng vào thư mục trên máy anh chọn (nhớ lần sau, đổi được).
   ========================================================== */
var XK = {id:'', chon:{cccd:1, ky:1, anh:0}};
var XK_W = 1000, XK_KB = 195;
/* chữ ký / ảnh của khách theo bản scan: cùng mã KH; cả hai chưa có mã → cùng họ tên */
function xkChuan(s){ return typeof sxChuan==='function' ? sxChuan(s) : boDau(String(s||'')).trim(); }
function xkCuaKhach(k, loai){
  if(!k) return null;
  var ten = xkChuan(k.ten), ds = (D.kyAnh||[]).filter(function(a){
    if((a.loai==='ky' ? 'ky' : 'anh')!==loai) return false;
    if(k.maKH) return a.maKH===k.maKH;
    return !a.maKH && !!ten && xkChuan(a.khach)===ten;
  });
  return ds.sort(function(a, b){ return String(b.luc||b.ngay||'').localeCompare(String(a.luc||a.ngay||'')); })[0] || null;
}
/* bảng tra nhanh cho cả bảng (1 lần vẽ): mã KH / tên → chữ ký */
function xkBangCK(){
  var ma = {}, ten = {};
  (D.kyAnh||[]).forEach(function(a){ if(a.loai!=='ky') return; if(a.maKH) ma[a.maKH] = a; else if(a.khach) ten[xkChuan(a.khach)] = a; });
  return function(k){ if(!k || k.che==='tailieu') return null; return k.maKH ? (ma[k.maKH] || null) : (ten[xkChuan(k.ten)] || null); };
}
function xkKhoa(k){ return typeof tcKhoa==='function' ? tcKhoa(k) : (k.maKH || ''); }
function xkTen(k, loai){ return tcTen(xkKhoa(k), k.ten || 'Khach', loai, '.jpg'); }

/* CCCD: 2 mặt thẻ ghép dọc 1 ảnh, nền trắng, nén ≤ 200 KB (nhập hệ thống được) */
function xkMatThe(k){
  var doc = function(){ return Promise.all([docAnhHS(k.id+'_matTruoc').catch(function(){ return null; }), docAnhHS(k.id+'_matSau').catch(function(){ return null; })]); };
  return doc().then(function(r){
    if(r[0] || typeof sxCanCat!=='function' || !sxCanCat(k)) return r;
    return sxCatMot(k).then(doc, doc);   /* bản cũ chỉ có PDF → tách 2 mặt trước */
  });
}
function xkGhepCCCD(k){
  return xkMatThe(k).then(function(r){
    var bl = r.filter(Boolean); if(!bl.length) throw new Error('bản này chưa có ảnh 2 mặt thẻ (không tách được từ PDF)');
    return Promise.all(bl.map(anhTuBlob));
  }).then(function(ims){
    var kt = function(im){ return {w:im.naturalWidth || im.width, h:im.naturalHeight || im.height}; };
    var w = Math.min(XK_W, Math.max.apply(null, ims.map(function(im){ return kt(im).w; }))), le = 16, h = le;
    var co = ims.map(function(im){ var s = kt(im), r = w/s.w, o = {im:im, w:w, h:Math.round(s.h*r), y:h}; h += o.h+le; return o; });
    var c = document.createElement('canvas'); c.width = w+2*le; c.height = h;
    var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    co.forEach(function(o){ g.drawImage(o.im, le, o.y, o.w, o.h); });
    return xkNen(c);
  });
}
/* nén dần chất lượng, chưa đủ nhẹ thì thu nhỏ */
function xkNen(c){
  var thu = function(cv, q){ return canvasRaBlob(cv, q).then(function(b){
    if(b.size<=XK_KB*1024) return b;
    if(q>0.55) return thu(cv, Math.round((q-0.1)*100)/100);
    if(cv.width<500) return b;
    var n = document.createElement('canvas'); n.width = Math.round(cv.width*0.8); n.height = Math.round(cv.height*0.8);
    n.getContext('2d').drawImage(cv, 0, 0, n.width, n.height); return thu(n, 0.8); }); };
  return thu(c, 0.85);
}

/* hộp Xuất file của 1 khách */
function xkMo(id, giu){
  var k = timScan(id); if(!k) return;
  XK.id = id; if(!giu) XK.chon = {cccd:1, ky:1, anh:0};   /* mỗi lần mở: CCCD + Chữ ký tích sẵn */
  var ky = xkCuaKhach(k, 'ky'), anh = k.che!=='tailieu', e = coChuHTML, tm = lnCai('xuat').ten;   /* 3.306: ảnh khách = mặt trước CCCD, xuất khi cần (không lưu sẵn) */
  var o = function(ma, nhan, co, chu){ return '<label class="xk-o'+(co ? '' : ' mo')+'"><input type="checkbox" data-xk="'+ma+'"'+(co && XK.chon[ma] ? ' checked' : '')+(co ? '' : ' disabled')+'> '+nhan+
    ' <small>'+chu+'</small></label>'; };
  moHop('<div class="hop-tit">💾 Xuất file · '+e((k.maKH ? k.maKH+' - ' : '')+(k.ten||''))+'</div>'+
    '<div class="hop-phu">Mỗi loại 1 file JPG nhẹ (dưới 200 KB), tên chuẩn — ghi thẳng vào thư mục trên máy.</div>'+
    '<div class="xk-ds">'+
      o('cccd', '🪪 CCCD', k.che!=='tailieu', e(xkTen(k, 'CCCD'))+' — 2 mặt ghép 1 ảnh')+
      o('ky', ky && ky.kieuKy==='lantay' ? '🖐 Lăn tay' : '✍ Chữ ký', !!ky, ky ? e(xkTen(k, 'Chữ ký')) : 'chưa có — chụp ở 📁 Chữ ký · CCCD')+
      o('anh', '🧑 Ảnh khách', anh, e(xkTen(k, 'Ảnh'))+' — mặt trước CCCD')+'</div>'+
    '<div class="xk-tm">📂 Lưu vào: <b>'+(coLuuNhanh() ? (tm ? e(tm) : 'chưa chọn — bấm Xuất lần đầu để chọn') : 'thư mục Tải về (trình duyệt này không chọn thư mục được — dùng Chrome / Edge)')+'</b>'+
      (coLuuNhanh() && tm ? ' <a data-lenh="xk.doi">Đổi thư mục</a>' : '')+'</div>'+
    '<div class="hang-nut" style="margin-top:12px"><button class="chinh" data-lenh="xk.xuat">💾 Xuất</button><button data-lenh="xk.dong">Đóng</button></div>');
}
function xkDocChon(){
  Array.prototype.forEach.call(document.querySelectorAll('#hop [data-xk]'), function(x){ XK.chon[x.getAttribute('data-xk')] = x.checked && !x.disabled ? 1 : 0; });
}
/* ghi 1 loạt file vào thư mục đã chọn (1 lần hỏi quyền); trình duyệt không chọn được thư mục → tải về */
function xkGhi(ds){
  if(!coLuuNhanh()){ ds.forEach(function(f){ taiXuongBlob(f.bl, f.ten); }); return Promise.resolve('Tải về'); }
  return lnThuMuc('xuat').then(function(h){
    return ds.reduce(function(p, f){ return p.then(function(){ return h.getFileHandle(f.ten, {create:true}).then(function(fh){ return fh.createWritable(); })
      .then(function(w){ return w.write(f.bl).then(function(){ return w.close(); }); }); }); }, Promise.resolve()).then(function(){ return h.name; });
  });
}
function xkXuat(){
  var k = timScan(XK.id); if(!k) return;
  xkDocChon();
  var viec = [], loi = [];
  if(XK.chon.cccd && k.che!=='tailieu') viec.push(xkGhepCCCD(k).then(function(b){ return {ten:xkTen(k, 'CCCD'), bl:b}; }, function(e){ loi.push('CCCD: '+(e && e.message || e)); return null; }));
  var a = XK.chon.ky && xkCuaKhach(k, 'ky');
  if(a) viec.push(layAnhKA(a).then(function(b){ if(!b) throw new Error('ảnh không có trong máy này và chưa lên Drive'); return {ten:xkTen(k, 'Chữ ký'), bl:b}; })
    .catch(function(e){ loi.push('Chữ ký: '+(e && e.message || e)); return null; }));
  if(XK.chon.anh && k.che!=='tailieu') viec.push(xkMatThe(k).then(function(r){ if(!r[0]) throw new Error('bản này chưa có ảnh mặt trước thẻ'); return sxNen200(r[0]); })
    .then(function(b){ return {ten:xkTen(k, 'Ảnh'), bl:b}; }, function(e){ loi.push('Ảnh: '+(e && e.message || e)); return null; }));
  if(!viec.length) return bao('Chưa tích loại nào để xuất.', 3);
  batChay(false, 'Đang xuất file…');
  Promise.all(viec).then(function(ds){
    ds = ds.filter(Boolean);
    if(!ds.length){ tatChay(); return baoLoi('Chưa xuất được: '+loi.join(' · ')); }
    return xkGhi(ds).then(function(noi){
      tatChay(); dongHop();
      bao('💾 Đã xuất '+ds.length+' file vào '+noi+': '+ds.map(function(f){ return f.ten+' ('+Math.round(f.bl.size/1024)+' KB)'; }).join(', ')+(loi.length ? ' · ⚠ '+loi.join(' · ') : ''), loi.length ? 9 : 6);
    });
  }).catch(function(e){ tatChay(); if(e && e.name==='AbortError') return; baoLoi('Chưa ghi được vào thư mục: '+(e && e.message || e)); });
}
function xkDoi(){
  xkDocChon();
  lnThuMuc('xuat', true).then(function(){ xkMo(XK.id, true); }).catch(function(e){ if(!(e && e.name==='AbortError')) baoLoi('Chưa chọn được thư mục: '+(e && e.message || e)); });
}
GD.dangKy('xk', {mo:function(el){ xkMo(el.getAttribute('data-k')); }, xuat:function(){ xkXuat(); }, doi:function(){ xkDoi(); }, dong:function(){ dongHop(); }});
