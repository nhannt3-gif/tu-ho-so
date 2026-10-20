/* ==========================================================
   3.268 (anh chốt 20/10/2026) — 🔎 RÀ CCCD ĐÃ LƯU · BẢN TRÙNG
   - Anh: "có nên có bước chạy kiểm tra các CCCD đã lưu coi đúng không, trong lúc mới này sợ chương trình chưa chuẩn lưu sai";
     "nếu kiểm tra thấy trùng thì báo để xóa 1 cái, nếu em kiểm tra được nội dung thì tốt"; "người thừa kế … tính sau, em chỉ báo".
   - A. Đúng khách: đọc lại số CCCD trên ảnh (QR / 3 dòng mã máy đọc) → so khách ghi ở bản lưu theo Mẫu 31 (so cả số CMND cũ trong QR).
        ✓ đúng · ✗ sai khách (đổi sang khách đúng / trả về thư mục chờ) · 🔀 1 số khớp 2 mã KH (anh chọn) · ⚠ Mẫu 31 còn CMND cũ ·
        ⚠ lệch số với Mẫu 31 · ⚠ không phải chủ hộ · ⏳ mã KH không có trên Mẫu 31 · ⏰ thẻ hết hạn · ? không đọc được.
   - B. Bản trùng: 1 khách có ≥ 2 bản cùng loại → so nội dung: giống hệt (từng byte) · cùng 1 thẻ khác lần quét (cùng số CCCD / ảnh gần giống) · khác.
        Đề nghị giữ bản rõ nhất, tích sẵn bản xóa (vào 🗑 Thùng rác, lấy lại được); khác nội dung chỉ báo. Mặt trước / mặt sau tách 2 bản không tính trùng.
   - C. Drive: đọc thẳng thư mục CCCD — tên bị sửa tay (đặt lại tên chuẩn) · file không qua app (chỉ báo) · file giống hệt nhau (md5 Drive).
   Chỉ báo + đề xuất; anh tích / chọn mới làm. Ảnh khách tạo từ CCCD đi theo CCCD. Kết quả đọc ghi vào bản lưu (raDoc) → lần sau không đọc lại.
   ========================================================== */
var RS = null;   /* kết quả rà đang xem */
function rsSo(s){ return String(s||'').replace(/\D/g, ''); }
function sxHanCCCD(ns, ncap){ if(!ns || !ncap) return ''; var h = toCCCDHan('000000000000', ns, ncap); return h.den || ''; }   /* hạn thẻ theo mốc tuổi — dùng chung quy tắc tab Tổ (toCCCDHan) */
function rsHoMoi(s){   /* số CCCD có trong Sổ hộ vay (khách mới chưa giải ngân) → tên */
  if(!s || typeof hmDs!=='function') return '';
  var o = hmDs().find(function(h){ return (h.tv||[]).some(function(n){ return rsSo(n.cccd)===s; }); });
  return o ? ((o.tv||[])[0] || {}).ten || '?' : '';
}
/* đọc 1 bản CCCD đã lưu → k.raDoc (không còn ảnh trong máy → không ghi, lần sau thử lại) */
function rsDoc(k){
  return sxAnhDoc(k).then(function(b){
    if(!b[0] && !b[1]) return {khong:1, ly:'ảnh không có trong máy này, chưa tải được bản trên Drive', tam:1};
    return docCCCD(b[0], b[1]).then(function(r){ return r && r.cccd ? {cccd:r.cccd, cmnd:r.cmnd||'', ten:r.ten||'', ns:r.ns||'', ncap:r.ncap||'', han:r.han||'', nguon:r.nguon, mot:!(b[0] && b[1])} : {khong:1, ly:'không đọc được mã QR / mã máy đọc'}; });
  }).then(function(r){ if(r.khong && !r.tam) r.ban = SX_DOC_BAN; if(!r.tam) k.raDoc = r; return r; }, function(e){ return {khong:1, ly:(e && e.message) || 'lỗi khi đọc ảnh', tam:1}; });
}
/* xếp 1 bản vào nhóm từ kết quả đọc */
function rsXet(k, r){
  var KH = KHO.dsKhach(), X = sxChiMuc(), M = KH[k.maKH];
  if(!r || r.khong) return {nhom:'khong', ly:(r && r.ly) || 'chưa đọc'};
  var s = rsSo(r.cccd), cm = rsSo(r.cmnd), mc = M ? rsSo(M.cccd) : '', ai = [];
  (X.cc[s]||[]).concat(cm ? (X.cc[cm]||[]) : []).forEach(function(m){ if(ai.indexOf(m)<0) ai.push(m); });
  var han = r.han || sxHanCCCD(r.ns, r.ncap), o = {han:han && han<ngayISO(nay()) ? han : ''};
  var ra = function(nhom, them){ Object.keys(them||{}).forEach(function(f){ o[f] = them[f]; }); o.nhom = nhom; return o; };
  if(ai.length>1) return ra('hai', {ds:ai, ly:'số '+s+' có ở '+ai.length+' mã KH trên Mẫu 31'});
  if(!M){
    if(ai.length===1) return ra('sai', {ma:ai[0], ly:'mã KH '+k.maKH+' không có trên Mẫu 31; số trên thẻ là của khách này'});
    var hm = rsHoMoi(s); return ra('ngoai', {ly:hm ? 'khách mới chưa giải ngân — có trong Sổ hộ vay ('+hm+')' : 'mã KH '+k.maKH+' không có trên Mẫu 31 đã nạp'}); }
  if(mc && mc===s) return ra('dung', {ly:'số CCCD khớp Mẫu 31'+(M.mon===0 ? ' · khách đã tất toán' : '')});
  if(mc && cm && mc===cm) return ra('cmnd', {ly:'thẻ mới '+s+' · Mẫu 31 còn số CMND cũ '+mc+' — cần cập nhật trên hệ thống'});
  if(ai.length===1 && ai[0]!==k.maKH) return ra('sai', {ma:ai[0], ly:'số trên thẻ '+s+' là của khách khác'});
  var tenOK = r.ten && sxTenGan(M.ten, r.ten);
  if(r.ten && !tenOK) return ra('khongChu', {ly:'tên trên thẻ ('+r.ten+') khác chủ hộ ('+M.ten+') — có thể CCCD người khác trong hộ (vợ/chồng, thừa kế…)'});
  return ra('lech', {ly:!mc ? 'Mẫu 31 chưa có số CCCD của khách (thẻ: '+s+')' : 'thẻ '+s+' · Mẫu 31 '+mc+(tenOK ? ' — tên khớp: khách đổi thẻ hoặc Mẫu 31 nhập sai số' : ' — không đọc được tên để so')});
}

/* ---------- B. bản trùng: dấu vân tay nội dung ---------- */
function rsLoai(k, ka){ return ka ? sxLoaiKA(k) : (k.che==='tailieu' ? sxLoaiScan(k) : 'CCCD'); }
function rsBam(bufs){   /* băm FNV-1a 2 lượt (đủ phân biệt file trùng từng byte, không cần thư viện) */
  var h1 = 0x811c9dc5, h2 = 0x01000193 ^ 0x5bd1e995, n = 0;
  bufs.forEach(function(u){ for(var i=0;i<u.length;i++){ h1 = Math.imul(h1 ^ u[i], 16777619) >>> 0; h2 = Math.imul(h2 ^ u[i], 2246822519) >>> 0; } n += u.length; });
  return h1.toString(16)+h2.toString(16)+':'+n;
}
function rsBlobs(k, ka){
  var ids = ka ? [k.id] : k.che==='tailieu' ? (k.trang||[]).map(function(t){ return laTrangPDF(t) ? tachTrangPDF(t).nguon : t; }) : [k.id+'_matTruoc', k.id+'_matSau'];
  var phu = !ka && k.che==='tailieu' ? (k.trang||[]).join('|') : '';   /* trang PDF: cùng file nguồn + cùng số trang */
  return Promise.all(ids.map(function(i){ return docAnhHS(i).catch(function(){ return null; }); })).then(function(bs){ return {bs:bs.filter(Boolean), phu:phu}; });
}
function rsVanTay(k, ka){
  return rsBlobs(k, ka).then(function(o){
    if(!o.bs.length) return {khong:1};
    return Promise.all(o.bs.map(function(b){ return b.arrayBuffer ? b.arrayBuffer() : new Response(b).arrayBuffer(); })).then(function(abs){
      var vt = {bam:rsBam(abs.map(function(a){ return new Uint8Array(a); }))+(o.phu ? '#'+o.phu : '')};
      var b0 = o.bs[0]; if(!/^image\//.test(b0.type||'image/')) return vt;
      return anhTuBlob(b0).then(function(im){ var W = im.naturalWidth || im.width, H = im.naturalHeight || im.height; vt.px = W*H; vt.kt = W+'×'+H;
        var c = document.createElement('canvas'); c.width = 9; c.height = 8; var g = c.getContext('2d'); g.drawImage(im, 0, 0, 9, 8);
        var d = g.getImageData(0, 0, 9, 8).data, xam = function(x, y){ var i = (y*9+x)*4; return d[i]*0.3+d[i+1]*0.59+d[i+2]*0.11; }, bit = '';
        for(var y=0;y<8;y++) for(var x=0;x<8;x++) bit += xam(x, y)<xam(x+1, y) ? '1' : '0';
        vt.dh = bit;
        var n = document.createElement('canvas'), z = Math.min(1, 140/Math.max(W, H)); n.width = Math.round(W*z); n.height = Math.round(H*z); n.getContext('2d').drawImage(im, 0, 0, n.width, n.height);
        vt.nho = n.toDataURL('image/jpeg', 0.7); return vt; }, function(){ return vt; });
    });
  }, function(){ return {khong:1}; });
}
function rsLech(a, b){ var n = 0; for(var i=0;i<a.length;i++) if(a[i]!==b[i]) n++; return n; }
/* so bản x với bản giữ g → giong | truocSau | cungThe | khac | ? */
function rsSoSanh(x, g){
  if(x.vt.khong || g.vt.khong) return 'chuaSo';
  if(x.vt.bam===g.vt.bam) return 'giong';
  var rx = x.k.raDoc || {}, rg = g.k.raDoc || {};
  if(!x.ka && x.k.che!=='tailieu' && rx.cccd && rx.cccd===rg.cccd){
    if(rx.mot && rg.mot && ((rx.nguon==='QR')!==(rg.nguon==='QR'))) return 'truocSau';   /* 1 bản có QR (mặt trước), 1 bản có mã máy đọc (mặt sau) */
    return 'cungThe'; }
  if(x.vt.dh && g.vt.dh && rsLech(x.vt.dh, g.vt.dh)<=6) return 'cungThe';
  return 'khac';
}
function rsNhomTrung(){
  var nh = {}, them = function(k, ka){ if(!k.maKH) return; var key = k.maKH+'|'+rsLoai(k, ka); (nh[key] = nh[key] || []).push({k:k, ka:ka}); };
  (D.scan||[]).forEach(function(k){ them(k, false); }); (D.kyAnh||[]).forEach(function(k){ them(k, true); });
  return Object.keys(nh).filter(function(key){ return nh[key].length>1; }).map(function(key){ return {ma:key.split('|')[0], loai:key.split('|')[1], ds:nh[key]}; });
}
function rsChonGiu(ds){   /* giữ bản rõ nhất (nhiều điểm ảnh) → đã lên Drive → cũ nhất */
  return ds.slice().sort(function(a, b){ return ((b.vt.px||0)-(a.vt.px||0)) || ((b.k.driveId ? 1 : 0)-(a.k.driveId ? 1 : 0)) || String(a.k.taoLuc||a.k.luc||a.k.ngay||'').localeCompare(String(b.k.taoLuc||b.k.luc||b.k.ngay||'')); })[0];
}

/* ---------- C. Drive: thư mục CCCD ---------- */
function rsDsDrive(idTM){
  var ra = [], trang = function(tok){
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+idTM+"' in parents and trashed=false")+'&fields=nextPageToken,files(id,name,mimeType,md5Checksum,size)&pageSize=1000'+(tok ? '&pageToken='+tok : ''))
      .then(function(r){ ra = ra.concat(((r && r.files) || []).filter(function(f){ return f.mimeType!=='application/vnd.google-apps.folder'; })); return r && r.nextPageToken ? trang(r.nextPageToken) : ra; }); };
  return trang('');
}
function rsDrive(){
  if(!coTheNoiDrive()) return Promise.resolve({chua:1});
  var theoId = {}; (D.scan||[]).forEach(function(k){ if(k.driveId) theoId[k.driveId] = k; });
  return baoDamDuong([D.cauHinh.thumuc, SXT.cccd].join(' / ')).then(function(idTM){ return rsDsDrive(idTM).then(function(fs){
    var R = {idTM:idTM, ten:[], ngoai:[], giong:[]}, md5 = {};
    fs.forEach(function(f){ var k = theoId[f.id];
      if(k){ var dung = tenScanDrive(k); if(f.name!==dung) R.ten.push({k:k, f:f, dung:dung}); }
      else { var b = sxBoc(f.name), t = sxXacDinh({cccd:b.cccd, ma:b.ma, ten:b.ten}); R.ngoai.push({f:f, ly:t.ma ? 'khớp '+sxNhanKH(t.ma)+' — app không có bản này (thả tay / lưu ở máy khác chưa đồng bộ)' : 'không nhận ra khách từ tên file'}); }
      if(f.md5Checksum) (md5[f.md5Checksum] = md5[f.md5Checksum] || []).push(f); });
    Object.keys(md5).forEach(function(h){ var ds = md5[h]; if(ds.length<2) return;
      ds.sort(function(a, b){ return (theoId[b.id] ? 1 : 0)-(theoId[a.id] ? 1 : 0); });   /* giữ bản app biết */
      R.giong.push({giu:ds[0], bo:ds.slice(1).map(function(f){ return {f:f, app:theoId[f.id]}; })}); });
    return R; }); }).catch(function(e){ return {loi:(e && e.message) || String(e)}; });
}

/* ---------- chạy rà ---------- */
function moRaSoat(docLai){
  if(!SL_SAN) return slNap().then(function(){ moRaSoat(docLai); });
  if(!Object.keys(KHO.dsKhach()).length) return baoLoi('Chưa có danh bạ khách — nạp Mẫu 31 ở tab 📈 Số liệu › Nạp & KT trước.');
  var ds = (D.scan||[]).filter(function(k){ return k.maKH && k.che!=='tailieu'; });
  if(docLai) ds.forEach(function(k){ delete k.raDoc; });
  var can = ds.filter(function(k){ return !k.raDoc || (k.raDoc.khong && (k.raDoc.ban||1)<SX_DOC_BAN); }), n = 0, tam = {};
  QUET.dung = false; dongHop();
  batChay(false, 'Đang rà CCCD đã lưu 0/'+can.length+'…', true);
  can.reduce(function(p, k){ return p.then(function(){ if(QUET.dung) return; n++; dangLamChu('Đang đọc lại CCCD '+n+'/'+can.length+'…'); tienChay(Math.round((n-1)/Math.max(1, can.length)*100));
    return rsDoc(k).then(function(r){ if(r.tam) tam[k.id] = r; }); }); }, Promise.resolve())
  .then(function(){ luu(); var dung = QUET.dung; dangLamChu('Đang so bản trùng…');
    var nhom = dung ? [] : rsNhomTrung(), tat = []; nhom.forEach(function(g){ g.ds.forEach(function(x){ tat.push(x); }); });
    return tat.reduce(function(p, x){ return p.then(function(){ if(QUET.dung) return; return rsVanTay(x.k, x.ka).then(function(v){ x.vt = v; }); }); }, Promise.resolve())
      .then(function(){ dangLamChu('Đang đọc thư mục CCCD trên Drive…'); return QUET.dung ? {chua:1} : rsDrive(); })
      .then(function(dr){ tatChay(); rsLap(ds, tam, nhom.filter(function(g){ return g.ds.every(function(x){ return x.vt; }); }), dr, QUET.dung); rsVe(); }); })
  .catch(function(e){ tatChay(); baoLoi('Chưa rà xong: '+(e && e.message || e)); });
}
function rsLap(ds, tam, nhom, dr, dung){
  var R = {nhom:{}, trung:[], dr:dr, dung:dung, chuaDoc:0, tong:ds.length, chon:{}, xoa:{}, doiTen:{}, boDrive:{}};
  ['sai', 'hai', 'cmnd', 'lech', 'khongChu', 'ngoai', 'khong', 'dung', 'han'].forEach(function(n){ R.nhom[n] = []; });
  ds.forEach(function(k){ var r = k.raDoc || tam[k.id]; if(!r){ R.chuaDoc++; return; }
    var x = rsXet(k, r); x.k = x.k || k; x.r = r; R.nhom[x.nhom].push(x); if(x.han) R.nhom.han.push(x); });
  nhom.forEach(function(g){ var giu = rsChonGiu(g.ds);
    g.giu = giu; g.bo = g.ds.filter(function(x){ return x!==giu; }).map(function(x){ x.muc = rsSoSanh(x, giu); return x; });
    R.trung.push(g); });
  R.trung.forEach(function(g, gi){ g.bo.forEach(function(x, j){ if(x.muc==='giong' || x.muc==='cungThe') R.xoa[gi+':'+j] = true; }); });
  (dr && dr.giong || []).forEach(function(g, gi){ g.bo.forEach(function(x, j){ if(!x.app) R.boDrive[gi+':'+j] = true; }); });
  RS = R; return R;
}

/* ---------- giao diện ---------- */
var RS_MUC = {giong:'Giống hệt (từng byte) — lưu 2 lần', cungThe:'Cùng 1 thẻ / cùng nội dung, khác lần quét', truocSau:'Mặt trước + mặt sau tách 2 bản — không phải trùng', khac:'Khác nội dung — anh xem, tự quyết', chuaSo:'Chưa so được nội dung (ảnh không còn trong máy)'};
function rsTenBan(x){ return x.ka ? (x.k.ten || sxTenKA(x.k)) : (x.k.driveId ? tenScanDrive(x.k) : (x.k.ten || '')); }
function rsDong(x, i, nhom){
  var k = x.k, r = x.r || {}, e = coChuHTML;
  var doc = r.cccd ? 'Thẻ: <b>'+e(r.cccd)+'</b>'+(r.ten ? ' · '+e(r.ten) : '')+' <small>('+e(r.nguon||'')+')</small>' : '';
  var phai = '<small class="sx-ly'+(nhom==='dung' ? '' : ' vang')+'">'+e(x.ly||'')+(x.han ? ' · <b class="do">hết hạn '+e(x.han.split('-').reverse().join('/'))+'</b>' : '')+'</small>';
  if(nhom==='sai') phai = '<label class="sx-r"><input type="radio" name="rs-s'+i+'" data-lenh="rs.chon" data-su="change" data-k="'+k.id+'" data-v="ma:'+x.ma+'"'+(RS.chon[k.id]==='ma:'+x.ma ? ' checked' : '')+'> <b>Đổi sang:</b> <span class="sx-kh-ten">'+e(sxNhanKH(x.ma))+'</span></label>'+
    '<label class="sx-r"><input type="radio" name="rs-s'+i+'" data-lenh="rs.chon" data-su="change" data-k="'+k.id+'" data-v="cho"'+(RS.chon[k.id]==='cho' ? ' checked' : '')+'> Trả về thư mục chờ sắp xếp</label>'+
    '<label class="sx-r sx-bo"><input type="radio" name="rs-s'+i+'" data-lenh="rs.chon" data-su="change" data-k="'+k.id+'" data-v=""'+(RS.chon[k.id] ? '' : ' checked')+'> Để nguyên</label>'+phai;
  if(nhom==='hai') phai = x.ds.map(function(m){ return '<label class="sx-r"><input type="radio" name="rs-h'+i+'" data-lenh="rs.chon" data-su="change" data-k="'+k.id+'" data-v="ma:'+m+'"'+(RS.chon[k.id]==='ma:'+m ? ' checked' : '')+'> '+(m===k.maKH ? '(đang gắn) ' : '')+'<span class="sx-kh-ten">'+e(sxNhanKH(m))+'</span></label>'; }).join('')+
    '<label class="sx-r sx-bo"><input type="radio" name="rs-h'+i+'" data-lenh="rs.chon" data-su="change" data-k="'+k.id+'" data-v=""'+(RS.chon[k.id] ? '' : ' checked')+'> Để nguyên</label>'+phai;
  return '<tr><td class="rs-c1">'+e(k.maKH ? sxNhanKH(k.maKH) : '')+'</td><td class="sx-c2">'+e(rsTenBan(x))+(doc ? '<br>'+doc : '')+'</td><td class="sx-c3">'+phai+'</td></tr>';
}
function rsKhoi(ten, hd, ds, nhom, lop, mo){
  if(!ds.length) return '';
  return '<details'+(mo ? ' open' : '')+' class="sx-khoi"><summary class="'+(lop||'')+'"><b>'+ten+'</b> — '+ds.length+' bản</summary>'+(hd ? '<div class="sx-hd">'+hd+'</div>' : '')+
    '<table class="to-bang luoi sx-bang"><thead><tr><th class="rs-c1">Khách đang gắn</th><th class="sx-c2">Bản lưu · đọc được</th><th class="sx-c3">Kết quả</th></tr></thead><tbody>'+
    ds.map(function(x, i){ return rsDong(x, i, nhom); }).join('')+'</tbody></table></details>';
}
function rsVeTrung(){
  if(!RS.trung.length) return '';
  var e = coChuHTML, n = 0;
  var h = RS.trung.map(function(g, gi){
    var o = function(x, chk){ var v = x.vt || {}; return '<div class="rs-ban">'+(v.nho ? '<img src="'+v.nho+'" alt="">' : '<div class="rs-khong-anh">không có ảnh trong máy</div>')+'<div><small>'+e(rsTenBan(x))+'</small><br><small>'+e(v.kt||'')+(x.k.driveId ? ' · ☁ Drive' : '')+'</small></div>'+(chk || '<b class="xanh">Giữ</b>')+'</div>'; };
    return '<div class="rs-cap"><div><b>'+e(sxNhanKH(g.ma))+'</b> · '+e(g.loai)+' — '+g.ds.length+' bản</div><div class="rs-hang">'+o(g.giu)+
      g.bo.map(function(x, j){ n++; var key = gi+':'+j, xo = x.muc!=='truocSau';
        return o(x, (xo ? '<label class="sx-r"><input type="checkbox" data-lenh="rs.xoa" data-su="change" data-x="'+key+'"'+(RS.xoa[key] ? ' checked' : '')+'> Xóa</label>' : '')+'<small class="sx-ly'+(x.muc==='khac' ? ' vang' : '')+'">'+e(RS_MUC[x.muc]||'')+'</small>'); }).join('')+'</div></div>'; }).join('');
  return '<details open class="sx-khoi"><summary class="vang"><b>⧉ Bản trùng — 1 khách nhiều bản cùng loại</b> — '+RS.trung.length+' khách</summary><div class="sx-hd">App giữ bản rõ nhất (nhiều điểm ảnh). Bản giống hệt / cùng thẻ đã tích sẵn <b>Xóa</b> — bỏ tích nếu muốn giữ. Xóa vào 🗑 Thùng rác, lấy lại được.</div>'+h+'</details>';
}
function rsVeDrive(){
  var D2 = RS.dr || {}, e = coChuHTML;
  if(D2.chua) return '<div class="sx-hd">☁ Chưa nối Drive (hoặc anh đã dừng) — chưa rà thư mục CCCD trên Drive.</div>';
  if(D2.loi) return '<div class="sx-hd vang">☁ Chưa đọc được thư mục CCCD trên Drive: '+e(D2.loi)+'</div>';
  var h = '';
  if(D2.ten.length) h += '<details open class="sx-khoi"><summary class="vang"><b>✎ Tên trên Drive bị sửa tay</b> — '+D2.ten.length+' file</summary><div class="sx-hd">Tích để đặt lại tên chuẩn.</div><table class="to-bang luoi sx-bang"><tbody>'+
    D2.ten.map(function(x, i){ return '<tr><td class="sx-c2">'+e(x.f.name)+'</td><td class="sx-c3"><label class="sx-r"><input type="checkbox" data-lenh="rs.doiTen" data-su="change" data-i="'+i+'"'+(RS.doiTen[i] ? ' checked' : '')+'> Đặt lại: <b>'+e(x.dung)+'</b></label></td></tr>'; }).join('')+'</tbody></table></details>';
  if(D2.giong.length) h += '<details open class="sx-khoi"><summary class="vang"><b>⧉ File giống hệt nhau trên Drive</b> — '+D2.giong.length+' nhóm</summary><div class="sx-hd">Cùng nội dung từng byte (Drive so). Bản app không biết đã tích sẵn — xóa vào Thùng rác Drive.</div><table class="to-bang luoi sx-bang"><tbody>'+
    D2.giong.map(function(g, gi){ return '<tr><td class="sx-c2">Giữ: <b>'+e(g.giu.name)+'</b></td><td class="sx-c3">'+g.bo.map(function(x, j){ var key = gi+':'+j;
      return x.app ? '<small>'+e(x.f.name)+' — bản của app, xóa ở khối "Bản trùng"</small>' : '<label class="sx-r"><input type="checkbox" data-lenh="rs.boDrive" data-su="change" data-x="'+key+'"'+(RS.boDrive[key] ? ' checked' : '')+'> Xóa: '+e(x.f.name)+'</label>'; }).join('')+'</td></tr>'; }).join('')+'</tbody></table></details>';
  if(D2.ngoai.length) h += '<details class="sx-khoi"><summary><b>☁ File trên Drive không qua app</b> — '+D2.ngoai.length+' file (chỉ báo)</summary><table class="to-bang luoi sx-bang"><tbody>'+
    D2.ngoai.map(function(x){ return '<tr><td class="sx-c2">'+e(x.f.name)+'</td><td class="sx-c3"><small>'+e(x.ly)+'</small></td></tr>'; }).join('')+'</tbody></table></details>';
  return h || '<div class="sx-hd">☁ Thư mục CCCD trên Drive: tên chuẩn, không có file giống hệt.</div>';
}
function rsViec(){ var R = RS, dem = function(o){ return Object.keys(o).filter(function(k){ return o[k]; }).length; }; return dem(R.chon)+dem(R.xoa)+dem(R.doiTen)+dem(R.boDrive); }
function rsDemNut(){ var b = document.querySelector('#hop-in [data-lenh="rs.apDung"]'), n = rsViec(); if(!b) return; b.textContent = n ? '✔ Làm '+n+' việc đã chọn' : '✔ Chưa chọn việc nào'; b.disabled = !n; }
function rsVe(){
  var R = RS, N = R.nhom;
  var tom = '✓ '+N.dung.length+' đúng'+(N.sai.length ? ' · ✗ '+N.sai.length+' sai khách' : '')+(N.hai.length ? ' · 🔀 '+N.hai.length : '')+(N.cmnd.length+N.lech.length+N.khongChu.length ? ' · ⚠ '+(N.cmnd.length+N.lech.length+N.khongChu.length) : '')+
    (N.ngoai.length ? ' · ⏳ '+N.ngoai.length : '')+(N.han.length ? ' · ⏰ '+N.han.length+' hết hạn' : '')+(N.khong.length ? ' · ? '+N.khong.length+' không đọc được' : '')+(R.trung.length ? ' · ⧉ '+R.trung.length+' khách có bản trùng' : '');
  moHop('<div class="hop-tit">🔎 Rà CCCD đã lưu</div><div class="hop-phu">Đọc lại số CCCD trên ảnh (QR / mã máy đọc), so khách đang gắn theo Mẫu 31; tìm bản trùng; rà thư mục CCCD trên Drive. '+
      '<b>App chỉ báo</b> — anh chọn / tích mới làm.<br><b>'+R.tong+' bản CCCD:</b> '+tom+(R.chuaDoc ? ' · <b class="vang">'+R.chuaDoc+' bản chưa rà (anh đã dừng) — bấm 🔎 lại để rà tiếp</b>' : '')+'</div>'+
    rsKhoi('✗ Sai khách — số trên thẻ là của khách khác', 'Chọn <b>Đổi sang</b> khách đúng, hoặc trả về thư mục chờ. Ảnh khách tạo từ thẻ này đi theo.', N.sai, 'sai', 'do', true)+
    rsKhoi('🔀 1 số CCCD có ở nhiều mã KH — anh chọn mã đúng', '', N.hai, 'hai', 'vang', true)+
    rsVeTrung()+
    rsKhoi('⚠ Mẫu 31 còn số CMND cũ — đúng khách, cần cập nhật hệ thống', '', N.cmnd, 'cmnd', 'vang', true)+
    rsKhoi('⚠ Lệch số với Mẫu 31 — chỉ báo', 'File không sai; khách đổi thẻ hoặc Mẫu 31 nhập sai số → anh sửa trên hệ thống.', N.lech, 'lech', 'vang', true)+
    rsKhoi('⚠ Không phải chủ hộ — chỉ báo', 'CCCD người khác trong hộ (vợ/chồng, thừa kế…): chưa có cách lưu riêng, để nguyên.', N.khongChu, 'khongChu', 'vang', true)+
    rsKhoi('⏳ Mã KH không có trên Mẫu 31 — chỉ báo', '', N.ngoai, 'ngoai', '', true)+
    rsKhoi('⏰ Thẻ hết hạn — cần bổ sung bản mới', '', N.han, 'han', 'vang', false)+
    rsKhoi('? Không đọc được ảnh — anh xem tay', '', N.khong, 'khong', '', false)+
    rsKhoi('✓ Đúng khách', '', N.dung, 'dung', 'xanh', false)+
    rsVeDrive()+
    '<div class="sx-chan">'+GD.hang([GD.nut({chu:'Đóng', lenh:'sx.dong'}), GD.nut({chu:'↻ Đọc lại cả bản đã rà', lenh:'rs.docLai'}), GD.nut({chu:'✔', lenh:'rs.apDung', chinh:1})], true)+'</div>', true);
  var h = document.getElementById('hop-in'); if(h) h.classList.add('xem-rong', 'sx-hop');
  rsDemNut();
}
GD.dangKy('rs', {mo:function(){ moRaSoat(false); }, docLai:function(){ moRaSoat(true); }, apDung:function(){ rsApDung(); },
  chon:function(el){ var k = el.getAttribute('data-k'), v = el.getAttribute('data-v'); if(v) RS.chon[k] = v; else delete RS.chon[k]; rsDemNut(); },
  xoa:function(el){ RS.xoa[el.getAttribute('data-x')] = !!el.checked; rsDemNut(); },
  boDrive:function(el){ RS.boDrive[el.getAttribute('data-x')] = !!el.checked; rsDemNut(); },
  doiTen:function(el){ RS.doiTen[+el.getAttribute('data-i')] = !!el.checked; rsDemNut(); }});

/* ---------- làm việc đã chọn ---------- */
function rsAnhTheo(k){ return (D.kyAnh||[]).filter(function(a){ return a.tuCCCD===k.id; }); }
function rsVeCho(k){   /* trả bản CCCD về thư mục chờ: tên giữ tên + số đọc được để 🧹 Sắp xếp đối chiếu */
  var r = k.raDoc || {}, ten = r.ten || k.ten || 'Khach';
  k.maKH = ''; k.ten = 'cccd-'+ten+(r.cccd ? ' - '+r.cccd : ''); k.cccd = r.cccd || ''; k.suaLuc = new Date().toISOString(); if(k.driveId) k.canDay = true;
  rsAnhTheo(k).forEach(function(a){ a.maKH = ''; a.khach = 'anh-'+ten; a.suaLuc = k.suaLuc; });
}
function rsApDung(){
  var R = RS; if(!R) return; if(!rsViec()) return bao('Chưa chọn việc nào.', 3);
  var dsSC = [], dsKA = [], xoa = [], n = 0;
  Object.keys(R.chon).forEach(function(id){ var v = R.chon[id], k = (D.scan||[]).find(function(x){ return x.id===id; }); if(!v || !k) return; n++;
    if(v==='cho'){ rsVeCho(k); dsSC.push(k); rsAnhTheo(k).forEach(function(a){ dsKA.push(a); }); return; }
    var ma = v.slice(3); if(ma===k.maKH) return;
    k.cccd = (k.raDoc && k.raDoc.cccd) || ''; sxGan(k, ma, false); dsSC.push(k);
    rsAnhTheo(k).forEach(function(a){ sxGan(a, ma, true); a.ten = sxTenKA(a); dsKA.push(a); }); });
  R.trung.forEach(function(g, gi){ g.bo.forEach(function(x, j){ if(!R.xoa[gi+':'+j]) return; n++; xoa.push(x.k.id);
    if(!x.ka) rsAnhTheo(x.k).forEach(function(a){ a.tuCCCD = g.giu.k.id; }); }); });   /* ảnh khách từ bản xóa → gắn sang bản giữ */
  var D2 = R.dr || {}, viecDrive = [];
  (D2.ten||[]).forEach(function(x, i){ if(R.doiTen[i]){ n++; viecDrive.push(function(){ return sxDoi(x.k, D2.idTM, x.dung); }); } });
  (D2.giong||[]).forEach(function(g, gi){ g.bo.forEach(function(x, j){ if(R.boDrive[gi+':'+j] && !x.app){ n++; viecDrive.push(function(){ return xoaFileDrive(x.f.id); }); } }); });
  luu(); RS = null; dongHop();
  if(xoa.length) chuyenVaoRac(xoa, 'Rà CCCD: bản trùng');
  veScan(); capNhatDemRac();
  var xong = function(loi){ bao('🔎 Đã làm '+n+' việc'+(xoa.length ? ' · '+xoa.length+' bản trùng vào 🗑 Thùng rác' : '')+(loi ? ' · '+loi+' việc trên Drive chưa xong (thử lại sau)' : '')+'.', 7); };
  if(!coTheNoiDrive()){ xong(0); return; }
  var loi = 0;
  sxDoiDrive(dsSC, dsKA).then(function(r){ loi += r.loi || 0;
    return viecDrive.reduce(function(p, f){ return p.then(function(){ return f().catch(function(){ loi++; }); }); }, Promise.resolve()); })
    .then(function(){ luu(); veScan(); xong(loi); });
}
