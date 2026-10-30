/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): SCAN — điện thoại kiểu Lens · máy bàn 💾 Lưu nhanh / 📋 Copy · chữ ký, ảnh khách hàng.
   Chép nguyên từ js/12-scan.js (không đổi tên hàm); nạp ngay sau phần trước. ===== */
/* ==========================================================
   3.43: SCAN TRÊN ĐIỆN THOẠI THEO KIỂU LENS — Quét → Xong → PDF lưu tạm (tên Scan ngày giờ, sửa ngay) → xem trước → Gửi
   Máy tính giữ nguyên màn cũ. Mọi chức năng cũ (chỉnh góc, làm thẳng, in ghép, khai, lên Drive) vẫn còn.
   ========================================================== */
var SAU_LUU_TAM = null, XP = null;
function dauScanDT(){
  var L = locCua('scan'), so = ['nam','thang','tag','xa','chua'].filter(function(k){ return !!L[k]; }).length;
  window.__khoTab = D.scan || [];
  return '<div class="sc-dt">'+
    '<button class="sc-quet" onclick="quetNhanh()">📷 Quét</button>'+
    /* 3.309: bỏ Thẻ / Tài liệu (Quét gì? quyết định) và 📁 Chữ ký · CCCD */
    '<button class="sc-nho'+(BOT.tab==='scan'?' co':'')+'" onclick="'+(BOT.tab==='scan'?'thoiBot()':'batBot(\'scan\')')+'" title="Xóa nhiều file">🗑</button>'+
    '<button class="sc-nho" onclick="quetNhanh(\'photo\')" title="Lấy ảnh có sẵn trong máy">🖼</button>'+
    '<button class="sc-nho" onclick="moHuongDan(\'scan\')" title="Hướng dẫn">❓</button>'+
    '<button class="sc-nho'+(so?' co':'')+'" onclick="moBoLoc(\'scan\')" title="Bộ lọc">☰'+(so?'<i>'+so+'</i>':'')+'</button>'+
  '</div><div class="cam-kieu">Chụp: '+nutKieuCam()+'</div>'+dongDangLoc('scan')+thanhBot('scan');
}
/* vào thẳng camera như Lens — không hỏi nguồn mỗi lần */
function quetNhanh(nguon){
  if(!HS.mo) return moHoSo();
  if(!nguon && camTuDong() && coCamera()) return moCamera({muc:'scan'});
  chonNguon(nguon||'camera');
}
/* màn xem trước PDF thật (dựng bằng đúng bộ tạo PDF khi gửi/in) + đổi tên + gửi */
function moXemPDF(ids, moi, blSan){
  HS.ds = D.scan || [];
  var ds = ids.map(function(id){ return HS.ds.find(function(x){ return x.id===id; }); }).filter(Boolean);
  if(!ds.length) return;
  var k = ds[0], tl = k.che==='tailieu';
  var tenGoc = ds.length>1 ? String(k.ten||'').replace(/ - người \d+.*$/,'') : (k.ten||'');
  XP = {ids:ids, bl:null, ten:tenGoc};
  /* 3.59 (anh chốt): sắp theo luồng, vùng xem trước rộng nhất — 1 dòng đầu (tên · Drive · tên file), 1 hàng nút chính
     (🖨 In · 📋 Copy / 📤 Gửi · 💾 Lưu nhanh · ＋ In chung · ⋯ · Đóng), việc ít dùng gom vào ⋯ (anh chốt giữ nút Đóng) */
  var mayBan = laMayBan() || !coChiaSeFile();
  var them = [];
  if(mayBan){
    if(coCauNoi() && ds.length===1 && k.driveId){
      them.push('<button class="nho" onclick="cnHanh(\'xem\',\'scan\',\''+k.id+'\')">👁 Xem nhanh</button>');
      them.push('<button class="nho" onclick="cnHanh(\'thumuc\',\'scan\',\''+k.id+'\')">📂 Mở thư mục</button>');
    } else them.push('<button class="nho" onclick="if(XP&&XP.bl) xemTrongTab(XP.bl, tenFileXP())">👁 Xem trong tab</button>');
  }
  them.push(k.driveId && ds.length===1 ? '<button class="nho" onclick="window.open(\'https://drive.google.com/file/d/'+k.driveId+'/view\',\'_blank\')">☁ Mở trên Drive</button>'
    : '<button class="nho" onclick="dayScanNhieu(XP.ids).then(function(){ var e=document.getElementById(\'xp-drive\'); if(e) e.innerHTML=trangThaiDriveScan(XP.ids.map(timScan)); })">☁ Lên Drive</button>');
  them.push(ds.length===1 ? '<button class="nho" onclick="dongHop();'+(tl?'scanTaiLieu':'themKhach')+'(\''+k.id+'\')">✎ Khai đầy đủ</button>'
    : '<button class="nho" onclick="dongHop();khaiHangLoat(XP.ids)">✎ Khai đầy đủ</button>');
  them.push('<button class="nho xau" onclick="xoaXP()">🗑 Xóa</button>');
  moHop(buocHTML(3, {lui:'dongHop();veScan()', luiNhan:'‹ Về danh sách'})+
    '<div class="xp-dau"><b class="xp-tit">'+(moi?'✓ Đã lưu tạm · ':'')+coChuHTML(tenGoc||'Bản quét')+'</b>'+
      '<span class="xp-dr" id="xp-drive">'+trangThaiDriveScan(ds)+'</span>'+
      '<label class="xp-ten">Tên file'+(ds.length>1?' ('+ds.length+' người)':'')+
        '<input id="xp-ten" value="'+coChuHTML(tenGoc)+'" onfocus="this.select()" onchange="doiTenXP(this.value)"></label></div>'+
    '<div id="xp-trang" class="xp-trang"><div class="huong-dan">Đang dựng PDF…</div></div>'+
    '<div class="xp-nut xp-gon"><div class="xp-hang">'+
      '<button class="nho chinh" onclick="inXP()">🖨 In</button>'+
      (mayBan
        ? '<button class="nho chinh" onclick="copyXP()" title="'+(coCauNoi()?'Chép đúng file PDF — Ctrl+V vào Zalo':'Cần cầu nối để chép file PDF')+'">📋 Copy</button>'+
          '<button class="nho" onclick="lnXP()" title="Ghi thẳng file PDF vào thư mục cố định trên máy">💾 Lưu nhanh</button>'
        : '<button class="nho chinh" onclick="guiXP()">📤 Gửi</button>')+
      (tl ? '' : '<button class="nho" onclick="chonThemDeIn()" title="Về danh sách, bản này tích sẵn — tích thêm người rồi in chung 4 người / A4">＋ In chung</button>')+
      '<button class="nho xp-them-nut" onclick="document.getElementById(\'xp-them\').classList.toggle(\'mo\')" title="Xem trong tab, Drive, Khai đầy đủ, Xóa, cài đặt Lưu nhanh">⋯</button>'+
      '<button class="nho xp-dong" onclick="dongHop();veScan()">Đóng</button></div>'+
      '<div class="xp-them" id="xp-them"><div class="hang-nut">'+them.join('')+'</div>'+(mayBan ? lnCaiHTML('scan') : '')+'</div></div>', true);
  (blSan ? Promise.resolve(blSan) : Promise.all(ds.map(coAnhTrongMay)).then(function(co){
    if(co.every(Boolean)){ batChay(false, 'Đang dựng PDF…'); return dungTrangThe(ids, 'blob').then(function(b){ tatChay(); return b; }, function(e){ tatChay(); throw e; }); }
    /* 3.47: ảnh không nằm ở máy này (quét ở máy khác) → mở bản PDF trên Drive; chưa lên Drive thì báo rõ, không hiện trang trắng */
    if(ds.length===1 && k.driveId){ batChay(true, 'Đang tải PDF từ Drive…'); return taiPDFDrive(k.driveId).then(function(b){ tatChay(); return b; }, function(e){ tatChay(); throw e; }); }
    throw new Error(ds.length>1 ? 'Có bản quét ở máy khác — mở từng bản' : 'Bản này quét ở máy khác và chưa lên Drive. Mở máy đã quét, bấm ☁ Đồng bộ ngay rồi mở lại');
  }))
  .then(function(bl){
    if(!XP || XP.ids!==ids) return;
    XP.bl = bl; veTrangXP(bl);
    if(moi && laMayBan() && lnCai('scan').tuLuu) lnXP(true);   /* 3.49: vừa lưu tạm → tự lưu xuống máy (nếu anh bật) */
  }).catch(function(e){
    var e2 = document.getElementById('xp-trang');
    if(e2) e2.innerHTML = '<div class="huong-dan">📱 '+coChuHTML(e&&e.message||String(e))+'</div>';
  });
}
/* 3.46: ảnh đưa vào PDF thu về cỡ vừa in (thẻ ~1000px ≈ 270 dpi, trang A4 ~1800px ≈ 150 dpi) — PDF dựng nhanh, nhẹ hơn nhiều.
   "Nét cao" giữ nguyên ảnh. Nhớ kết quả theo ảnh để dựng lại (xem → gửi → in) không phải thu lại */
var PDF_THU = {};
function thuChoPDF(b, id, canh){
  if(!b || D.cauHinh.pdfNet) return Promise.resolve(b);
  var khoa = id+'|'+b.size+'|'+canh;
  if(PDF_THU[khoa]) return Promise.resolve(PDF_THU[khoa]);
  return anhTuBlob(b).then(function(im){
    var k = canh/Math.max(im.width, im.height);
    if(k >= 1 && b.size < 400*1024) return b;
    k = Math.min(1, k);
    var c = document.createElement('canvas'); c.width = Math.round(im.width*k); c.height = Math.round(im.height*k);
    var g = c.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(im, 0, 0, c.width, c.height);
    return canvasRaBlob(c, 0.85);
  }).then(function(r){ PDF_THU[khoa] = r; return r; }).catch(function(){ return b; });
}
function nutNetPDF(veLai){
  var net = !!D.cauHinh.pdfNet;
  return '<button class="'+(!net?'bat':'')+'" onclick="D.cauHinh.pdfNet=false;luu();'+veLai+'">Chuẩn · nhẹ, nhanh</button>'+
    '<button class="'+(net?'bat':'')+'" onclick="D.cauHinh.pdfNet=true;luu();'+veLai+'">Nét cao</button>';
}
/* xem trước: trang 1 hiện ngay, các trang sau vẽ khi cuộn tới */
function veTrangXP(bl){
  var e = document.getElementById('xp-trang'); if(!e) return;
  if(!window.pdfjsLib){ e.innerHTML = '<div class="huong-dan">Chưa tải được bộ xem PDF — vẫn gửi, in được bình thường.</div>'; return; }
  bl.arrayBuffer().then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; }).then(function(pdf){
    e.innerHTML = '';
    var rong = Math.max(240, e.clientWidth || 320), tile = Math.min(2, window.devicePixelRatio||1), N = pdf.numPages;
    var ve = function(n, o){
      if(o.daVe) return; o.daVe = true;
      return pdf.getPage(n).then(function(pg){
        var vp0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:rong/vp0.width*tile});
        var c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
        o.querySelector('.xp-cho').replaceWith(c);
        return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise;
      });
    };
    var ob = ('IntersectionObserver' in window) ? new IntersectionObserver(function(ds){
      ds.forEach(function(d){ if(d.isIntersecting){ ob.unobserve(d.target); ve(+d.target.dataset.n, d.target); } });
    }, {root:e.closest('.hop-in')||null, rootMargin:'400px'}) : null;
    for(var n=1;n<=N;n++){
      var o = document.createElement('div'); o.className = 'xp-o'; o.dataset.n = n;
      o.innerHTML = '<div class="xp-so">Trang '+n+'/'+N+'</div><div class="xp-cho" style="aspect-ratio:210/297"></div>';
      e.appendChild(o);
      if(n===1 || !ob) ve(n, o); else ob.observe(o);
    }
  }).catch(function(er){ e.innerHTML = '<div class="huong-dan">Không xem trước được ('+coChuHTML(er&&er.message||String(er))+') — vẫn gửi, in được.</div>'; });
}
function doiTenXP(v){
  v = String(v||'').trim(); if(!XP || !v) return;
  var ds = XP.ids.map(function(id){ return (D.scan||[]).find(function(x){ return x.id===id; }); }).filter(Boolean);
  ds.forEach(function(k, i){ k.ten = ds.length>1 ? v+' - người '+(i+1) : v; k.suaLuc = new Date().toISOString(); if(k.driveId) k.canDay = true; });
  XP.ten = v; luu(); veScan();
  if(D.cauHinh.dbSauLuu!==false) henDongBoScan();
}
function tenFileXP(){
  var e = document.getElementById('xp-ten'); if(e && e.value.trim() && e.value.trim()!==XP.ten) doiTenXP(e.value);
  return sachTen(XP.ten||'Scan')+'.pdf';
}
/* 3.44: bản hư, không cần → xóa hẳn ngay tại màn xem trước (ảnh trong máy xóa luôn, không vào thùng rác) */
/* 3.50: xóa ở màn xem trước bản đã lưu → vào thùng rác (khôi phục được) */
function xoaXP(){
  if(!XP) return;
  var ids = XP.ids.slice(); XP = null; dongHop();
  xoaNhieuVaoRac(ids);
}
/* điện thoại (iPhone / Android) có bảng chia sẻ file; trình duyệt máy tính thường không */
function coChiaSeFile(){
  try{ return !!(navigator.canShare && navigator.canShare({files:[new File(['x'], 'x.pdf', {type:'application/pdf'})]})); }catch(e){ return false; }
}
/* 3.47: máy tính — chép ảnh vào bộ nhớ tạm để dán thẳng vào Zalo PC (Ctrl+V) */
function coChepAnh(){ return !!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write); }
function chepAnhKA(id){
  var k = (D.kyAnh||[]).find(function(x){ return x.id===id; }); if(!k) return;
  var png = layAnhKA(k).then(function(b){
    if(!b) throw new Error('Ảnh không có trong máy này');
    return anhTuBlob(b).then(function(im){
      var c = document.createElement('canvas'); c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0);
      return new Promise(function(ok){ c.toBlob(ok, 'image/png'); });
    });
  });
  /* Safari cần truyền Promise thẳng vào ClipboardItem trong lúc bấm */
  navigator.clipboard.write([new ClipboardItem({'image/png': png})])
    .then(function(){ bao('📋 Đã chép ảnh — mở Zalo, bấm vào ô chat rồi Ctrl+V để gửi.', 6); })
    .catch(function(e){ baoLoi('Chưa chép được ảnh: '+(e&&e.message||e)+' — dùng nút Tải về.'); });
}
/* ==========================================================
   3.49: MÁY BÀN — 💾 LƯU NHANH + 📋 COPY thay nút Gửi (điện thoại giữ 📤 Gửi). Drive vẫn là nơi lưu mặc định.
   Lưu nhanh: chọn MỘT lần thư mục cố định trên máy (vd D:\Nhap may\CK-CCCD) — app nhớ thư mục (IndexedDB), lần sau bấm là ghi
   thẳng file đúng tên, không hỏi. Hai thư mục riêng: Chữ ký·CCCD và bản scan. Tùy chọn: chia thư mục theo tháng, tự lưu mỗi lần lưu.
   Trình duyệt không hỗ trợ chọn thư mục (Firefox…) → tải về thư mục Tải về như thường.
   Copy: có cầu nối → chép đúng FILE (JPG giữ dưới 200 KB, PDF); không có → chép ẢNH (dán vào Zalo được, nhưng có thể lớn hơn 200 KB).
   ========================================================== */
var LN_KHOA = 'tuhoso_ln';
function coLuuNhanh(){ return typeof window.showDirectoryPicker==='function'; }
/* 3.49b: máy bàn = không phải điện thoại / máy tính bảng. Trước dựa vào "không chia sẻ được file" nhưng Chrome/Edge trên Windows
   CÓ bảng chia sẻ → máy bàn vẫn hiện nút Gửi, không thấy Lưu nhanh */
function laMayBan(){
  var ua = navigator.userAgent||'';
  if(laDT() || /iPhone|iPad|iPod|Android|Mobile/i.test(ua)) return false;
  if(/Macintosh/.test(ua) && navigator.maxTouchPoints>1) return false;   /* iPad báo là Mac */
  return true;
}
function lnCai(loai){ var o = {}; try{ o = JSON.parse(localStorage.getItem(LN_KHOA)||'{}')||{}; }catch(e){} return o[loai] || {}; }
function lnGhi(loai, k, v){
  var o = {}; try{ o = JSON.parse(localStorage.getItem(LN_KHOA)||'{}')||{}; }catch(e){}
  o[loai] = o[loai] || {}; o[loai][k] = v;
  try{ localStorage.setItem(LN_KHOA, JSON.stringify(o)); }catch(e){}
}
function taiXuongBlob(bl, ten){
  var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = ten||'file';
  document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 4000);
}
/* thư mục đã chọn (hỏi lại quyền nếu trình duyệt đòi); tuDong = không mở hộp chọn / hỏi quyền (lúc tự lưu) */
function lnThuMuc(loai, chonLai, tuDong){
  return (chonLai ? Promise.resolve(null) : docFile('ln_tm_'+loai).catch(function(){ return null; })).then(function(h){
    if(h && h.queryPermission) return h.queryPermission({mode:'readwrite'}).then(function(q){
      if(q==='granted') return h;
      if(tuDong) throw new Error('can-cho-phep');
      return h.requestPermission({mode:'readwrite'}).then(function(q2){ if(q2==='granted') return h; throw new Error('Chưa cho phép ghi vào thư mục '+h.name); });
    });
    if(tuDong) throw new Error('chua-chon');
    return window.showDirectoryPicker({id:'tuhoso-'+loai, mode:'readwrite'}).then(function(h2){
      return luuFile('ln_tm_'+loai, h2).then(function(){ lnGhi(loai, 'ten', h2.name); return h2; });
    });
  });
}
function luuNhanh(loai, bl, ten, thang, tuDong){
  if(!bl) return Promise.resolve(false);
  if(!coLuuNhanh()){ if(tuDong) return Promise.resolve(false); taiXuongBlob(bl, ten); bao('📥 Đã tải về thư mục Tải về: '+ten, 5); return Promise.resolve(true); }
  var cai = lnCai(loai), con = cai.thang && thang ? thang : '';
  return lnThuMuc(loai, false, tuDong).then(function(h){
    return (con ? h.getDirectoryHandle(con, {create:true}) : Promise.resolve(h)).then(function(d){
      return d.getFileHandle(ten, {create:true});
    }).then(function(fh){ return fh.createWritable(); })
      .then(function(w){ return w.write(bl).then(function(){ return w.close(); }); })
      .then(function(){ bao('💾 Đã lưu xuống máy: '+h.name+(con?'\\'+con:'')+'\\'+ten, 5); lnVeLai(loai); return true; });
  }).catch(function(e){
    if(e && e.name==='AbortError') return false;
    var m = e && e.message || String(e);
    if(m==='can-cho-phep') bao('Tự lưu xuống máy cần anh cho phép lại — bấm 💾 Lưu nhanh một lần.', 6);
    else if(m==='chua-chon') bao('Chưa chọn thư mục lưu nhanh — bấm 💾 Lưu nhanh để chọn.', 5);
    else baoLoi('Chưa lưu xuống máy được: '+m);
    return false;
  });
}
function lnDoi(loai){
  if(!coLuuNhanh()) return;
  lnThuMuc(loai, true).then(function(h){ bao('Đã chọn thư mục lưu nhanh: '+h.name, 4); lnVeLai(loai); })
    .catch(function(e){ if(!(e && e.name==='AbortError')) baoLoi('Chưa chọn được thư mục: '+(e&&e.message||e)); });
}
function lnCaiHTML(loai){
  var c = lnCai(loai);
  if(!coLuuNhanh()) return '<div class="ln-cai" id="ln-cai-'+loai+'">💾 Trình duyệt này không lưu thẳng vào một thư mục được — Lưu nhanh sẽ tải về thư mục <b>Tải về</b>. Dùng Chrome hoặc Edge để chọn thư mục cố định.</div>';
  return '<div class="ln-cai" id="ln-cai-'+loai+'">💾 Lưu nhanh vào: <b>'+(c.ten ? coChuHTML(c.ten) : 'chưa chọn — bấm 💾 lần đầu để chọn')+'</b>'+
    (c.ten ? ' <a onclick="lnDoi(\''+loai+'\')">Đổi thư mục</a>' : '')+
    '<label><input type="checkbox"'+(c.thang?' checked':'')+' onchange="lnGhi(\''+loai+'\',\'thang\',this.checked)"> Chia thư mục theo tháng</label>'+
    '<label><input type="checkbox"'+(c.tuLuu?' checked':'')+' onchange="lnGhi(\''+loai+'\',\'tuLuu\',this.checked)"> Tự lưu xuống máy mỗi lần lưu</label></div>';
}
function lnVeLai(loai){ var e = document.getElementById('ln-cai-'+loai); if(e) e.outerHTML = lnCaiHTML(loai); }
/* Chữ ký · CCCD */
function lnKA(id, tuDong){
  var k = (D.kyAnh||[]).find(function(x){ return x.id===id; }); if(!k) return Promise.resolve(false);
  return layAnhKA(k).then(function(b){
    if(!b){ if(!tuDong) baoLoi('Ảnh không có trong máy này và chưa lên Drive.'); return false; }
    return luuNhanh('ka', b, k.ten, (k.ngay||'').slice(0,7), tuDong);
  });
}
function copyKA(id){
  var k = (D.kyAnh||[]).find(function(x){ return x.id===id; }); if(!k) return;
  if(coCauNoi() && k.driveId) return cnHanh('chep', 'ka', id);
  if(!coChepAnh()) return baoLoi('Trình duyệt này không chép ảnh được — dùng 💾 Lưu nhanh.');
  chepAnhKA(id);
  setTimeout(function(){ bao('📋 Đã chép ẢNH (dạng PNG) — dán vào Zalo được, nhưng dán vào hệ thống có thể lớn hơn 200 KB. '+
    'Cần đúng file JPG: dùng 💾 Lưu nhanh'+(coCauNoi()?' (hoặc chờ ảnh lên Drive rồi Copy lại — sẽ chép đúng file)':', hoặc cài cầu nối để Copy chép đúng file')+'.', 9); }, 1200);
}
/* bản scan (bước ③) */
function lnXP(tuDong){
  if(!XP || !XP.bl){ if(!tuDong) bao('PDF đang dựng, chờ chút rồi bấm lại.', 3); return Promise.resolve(false); }
  var k = timScan(XP.ids[0]);
  return luuNhanh('scan', XP.bl, tenFileXP(), ((k&&k.ngay)||ngayISO(nay())).slice(0,7), tuDong);
}
function copyXP(){
  if(!XP) return;
  var k = XP.ids.length===1 ? timScan(XP.ids[0]) : null;
  if(coCauNoi()){
    if(k && k.driveId) return cnHanh('chep', 'scan', k.id);
    if(!k) return baoLoi('Copy file chỉ làm từng bản một — mở từng bản rồi Copy, hoặc 💾 Lưu nhanh cả bản ghép.');
    return bao('Bản này đang lên Drive — lên xong (vài giây tới 1–2 phút ổ G chép về) bấm 📋 Copy lại. Cần ngay thì bấm 💾 Lưu nhanh.', 7);
  }
  hoiCaiCauNoi(function(){ baoLoi('Trình duyệt không tự chép được file PDF. Cài cầu nối (Cài đặt › Google Drive) để 📋 Copy chép đúng file rồi Ctrl+V vào Zalo — '+
    'hoặc bấm 💾 Lưu nhanh rồi kéo file từ thư mục vào ô chat.'); });
}
function guiXP(){
  if(!XP || !XP.bl) return bao('PDF đang dựng, chờ chút rồi bấm lại.', 3);
  chiaSePDF(XP.bl, tenFileXP());
}
/* 3.58: đang mở 1 bản → quay về danh sách, bản này tích sẵn, tích thêm người rồi bấm 🖨 In */
function chonThemDeIn(){
  var ids = (XP && XP.ids) || [];
  ids.forEach(function(id){ HS.chon[id] = 1; });
  dongHop(); if(nganHienTai!==4) doiNgan(4); else veScan();
  window.scrollTo(0, 0);
  bao('Đã tích sẵn '+ids.length+' bản. Tích ☐ thêm người rồi bấm 🖨 In ở thanh phía trên.', 6);
}
function inXP(){
  if(!XP || !XP.bl) return bao('PDF đang dựng, chờ chút rồi bấm lại.', 3);
  inBlob(XP.bl, tenFileXP());
}

/* ==========================================================
   3.44: CHỮ KÝ · ẢNH KHÁCH HÀNG — file ảnh nhỏ (dưới 200 KB, càng nhỏ càng tốt) để nhập lên hệ thống khi tạo hồ sơ.
   - Chữ ký: chụp → kéo khung cắt vùng chữ ký tùy ý (như Zalo; app đoán sẵn khung quanh nét ký) → nền trắng, nét đậm → ~10–40 KB.
   - Ảnh: chụp mặt trước CCCD → app tự tìm khung thẻ, nắn thẳng (ảnh gốc hiện bên cạnh, cắt tay được) → nén dưới 200 KB.
   - Đặt tên nhanh theo tên khách (nhớ tên cho lần chụp kế tiếp) → lưu trong máy + đưa ngay lên Drive:
     3.45: Tủ hồ sơ / Chữ ký - CCCD / yyyy-mm (mỗi tháng một thư mục), tên "2026-09-25 Nguyen Van A CK.jpg".
   ========================================================== */
var KA = {ten:'', tenLuc:0, loai:'ky', im:null, goc:null, r:null, xoay:0, muc:'vua', bl:null, dung:'xl'};
var KA_MUC = {nho:{w:560, kb:50, ten:'Nhỏ'}, vua:{w:760, kb:90, ten:'Vừa'}, net:{w:1000, kb:190, ten:'Nét'}};
function tenKhachKA(){ return (Date.now()-KA.tenLuc < 30*60000) ? KA.ten : ''; }
/* 3.45 (anh Nhân chốt): anh chỉ gõ tên khách — app thêm ngày ở đầu, CK/CCCD ở cuối: "2026-09-25 Nguyen Van A CK.jpg" */
function tenFileKA(loai, ten, ngay){
  var t = String(ten||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D')
    .replace(/[^A-Za-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
  return (ngay || ngayISO(nay()))+' '+(t || 'Khach')+' '+(loai==='ky'?'CK':'CCCD')+'.jpg';
}
/* mỗi tháng một thư mục cho dễ tìm: Tủ hồ sơ / Chữ ký - CCCD / 2026-09 */
function duongKA(thang){ return [D.cauHinh.thumuc, 'Chữ ký - CCCD', thang].join(' / '); }
function moThuMucKA(thang){
  thang = thang || ngayISO(nay()).slice(0,7);
  if(!coTheNoiDrive()) return baoLoi(drChuaNoi());
  var tm = (D.cauHinh.kaTM||{})[thang], mo = function(id){ return 'https://drive.google.com/drive/folders/'+id; };
  if(tm) return window.open(mo(tm), '_blank');
  var w = window.open('about:blank', '_blank');   /* mở cửa sổ ngay lúc bấm, tránh bị chặn popup */
  baoDamDuong(duongKA(thang)).then(function(id){
    D.cauHinh.kaTM = D.cauHinh.kaTM || {}; D.cauHinh.kaTM[thang] = id; luu();
    if(w) w.location = mo(id); else window.open(mo(id), '_blank');
  }).catch(function(e){ if(w) w.close(); baoLoi('Chưa mở được thư mục: '+(e&&e.message||e)); });
}
function moKyAnh(){
  if(!HS.mo) return moHoSo();
  D.kyAnh = D.kyAnh || [];
  var ds = D.kyAnh.slice().sort(function(a,b){ return (b.luc||'').localeCompare(a.luc||''); });
  if(BOT.tab!=='kyAnh') ds = ds.slice(0,30);   /* đang bớt thì hiện đủ để chọn */
  var thang = ngayISO(nay()).slice(0,7), thangTruoc = '';
  moHop('<div class="hop-tit">📁 Chữ ký · CCCD</div>'+
    '<div class="hop-phu">JPG dưới 200 KB để nhập hệ thống khi tạo hồ sơ. Lưu xong tự đưa lên Drive: đã rõ khách → <b>'+   /* 3.277: chữ theo cách lưu mới (3.264) */
      coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ')+' / Chữ ký - Ảnh khách</b> (tên <i>MãKH - Họ tên - Chữ ký</i>), chưa rõ → <b>Scan chờ sắp xếp</b>. Gõ tên / số CCCD / mã KH rồi 🔎 Tra Mẫu 31.</div>'+
    '<div class="hang-nut" style="margin:0 0 8px"><button class="nho" onclick="moThuMucKA()">☁ Mở thư mục Chữ ký - Ảnh khách trên Drive</button>'+
      (D.kyAnh.length ? nutBot('kyAnh') : '')+'<button class="nho" onclick="moHuongDan(\'kyAnh\')">❓</button></div>'+thanhBot('kyAnh')+
    '<div class="cam-kieu">Chụp: '+nutKieuCam()+'</div>'+
    '<div class="o"><label>Tên khách</label><input id="ka-ten" value="'+coChuHTML(tenKhachKA())+'" placeholder="Ví dụ: Nguyễn Văn A" '+
      'oninput="KA.ten=this.value;KA.tenLuc=Date.now()"></div>'+
    '<div class="ka-nut">'+
      '<button class="nho chinh" onclick="chupKA(\'ky\',\'camera\')">✍ Chụp chữ ký</button>'+
      '</div>'+   /* 3.306 (anh): bỏ chụp ảnh khách / CCCD mặt trước — ảnh xuất khi cần từ mặt trước CCCD */
    '<div class="hang-nut" style="margin-top:6px"><button class="nho" onclick="chupKA(\'ky\',\'photo\')">🖼 Chữ ký từ ảnh có sẵn</button>'+
      '</div>'+
    (ds.length ? ds.map(function(k){
      var th = (k.ngay||'').slice(0,7), dau = '';
      if(th!==thangTruoc){ thangTruoc = th; dau = '<div class="nhan-nhom">Tháng '+th.slice(5)+'/'+th.slice(0,4)+
        ' <span class="xoa-loc" onclick="moThuMucKA(\''+th+'\')">☁ mở thư mục</span></div>'; }
      return dau+'<div class="ka-dong"'+botAt(k.id)+'><span class="ka-ic">'+(k.loai==='ky'?'✍':'🪪')+'</span>'+
        '<span class="ka-ten">'+coChuHTML(k.ten)+'<small>'+Math.round((k.co||0)/1024)+' KB · '+ngayVN(k.ngay)+' · '+
          (k.driveId?'☁ đã lên Drive':'chưa lên Drive')+'</small>'+duongDongHTML(k, 'ka')+'</span>'+
        (k.driveId?'':'<button onclick="dayKAMot(\''+k.id+'\')" title="Đưa lên Drive">☁</button>')+
        (!laMayBan() && coChiaSeFile() ? '<button onclick="guiKA(\''+k.id+'\')" title="Gửi">📤</button>'
          : '<button onclick="lnKA(\''+k.id+'\')" title="Lưu nhanh xuống máy">💾</button><button onclick="copyKA(\''+k.id+'\')" title="Copy — Ctrl+V vào Zalo">📋</button>')+
        '<button class="xau" onclick="xoaKA(\''+k.id+'\')" title="Xóa hẳn">🗑</button></div>';
    }).join('') : '')+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho" onclick="if(BOT.tab===\'kyAnh\'){BOT={tab:\'\',chon:{}};document.body.classList.remove(\'dang-bot\');}dongHop();veScan()">Đóng</button></div>', true);
}
function chupKA(loai, nguon){
  var e = document.getElementById('ka-ten'); if(e){ KA.ten = e.value; KA.tenLuc = Date.now(); }
  if(nguon==='camera' && coCamera() && (camTuDong() || !laDT())) return moCamera({muc:loai==='ky'?'ky':'cccd'});
  var i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*,.heic,.heif';
  if(nguon==='camera') i.capture = 'environment';
  i.onchange = function(){ var f = i.files && i.files[0]; if(f) nhanKA(loai, f); };
  i.click();
}
function nhanKA(loai, f){
  batChay(true, 'Đang xử lý ảnh…');
  KA.loai = loai; KA.xoay = 0; KA.xoayTay = false; KA.thang = false; KA.muc = D.cauHinh.kaMuc || 'vua'; KA.bl = null;
  return thuGoc(f).then(anhTuBlob).then(function(im){
    KA.goc = im;
    kaTuTimKhung();
    kaXuLy();
    tatChay(); veCatKA();
  }).catch(function(er){ tatChay(); baoLoi('Không đọc được ảnh: '+(er&&er.message||er)); });
}
/* 3.50 (anh chốt): Chữ ký · CCCD dùng ĐÚNG màn chỉnh tay của Scan — khung 4 góc tự do trên ảnh gốc (KA.khung),
   nắn phối cảnh, xoay, làm thẳng. CCCD tìm khung bằng bộ dò thẻ; chữ ký đoán vùng nét quanh tâm ảnh. */
function kaTuTimKhung(){
  var im = KA.goc; if(!im) return false;
  if(KA.loai==='anh'){
    var k = null; try{ k = timKhungThe(im); }catch(e){}
    KA.khung = k ? k.goc.map(function(p){ return [p[0], p[1]]; }) : khungMacDinh(im, 'the');
    return !!k;
  }
  var r = khungKy(im);
  KA.khung = [[r.x, r.y], [r.x+r.w, r.y], [r.x+r.w, r.y+r.h], [r.x, r.y+r.h]];
  return true;
}
/* dựng ảnh đã cắt (KA.im) từ ảnh gốc + khung 4 góc; dungKA nén từ KA.im như cũ */
function kaXuLy(){
  var im = KA.goc, g = xepGoc4(KA.khung), c;
  if(KA.loai==='anh'){
    var kr = khoRa(g, 'the'); c = nanPhoiCanh(im, kr.goc, kr.rong, kr.cao);
    if(!KA.xoayTay){ try{ KA.xoay = huongThe(c).lat ? 180 : 0; }catch(e){ KA.xoay = 0; } }
  }else{
    var W = Math.round((dai2(g[0],g[1])+dai2(g[3],g[2]))/2), H = Math.round((dai2(g[0],g[3])+dai2(g[1],g[2]))/2);
    var k = Math.min(1, 1400/Math.max(W, H, 1));
    c = nanPhoiCanh(im, g, Math.max(8, Math.round(W*k)), Math.max(8, Math.round(H*k)));
  }
  c = xoayCanvas(c, KA.xoay||0);
  if(KA.thang){ var ng = doNghieng(c); KA.nghieng = ng.goc; if(Math.abs(ng.goc)>=0.3) c = xoayNho(c, -ng.goc); } else KA.nghieng = 0;
  KA.im = c; KA.r = {x:0, y:0, w:c.width, h:c.height}; KA.bl = null;
  return c;
}
function kaXoay(deg){ KA.xoayTay = true; KA.xoay = (((KA.xoay||0)+deg)%360+360)%360; kaXuLy(); veCatKA(); }
function kaThang(){ KA.thang = !KA.thang; kaXuLy(); veCatKA(); bao(KA.thang ? ('Đã bật tự làm thẳng'+(KA.nghieng ? ' · xoay '+KA.nghieng+'°' : ' · ảnh vốn đã thẳng')+'.') : 'Đã tắt tự làm thẳng.', 3); }
function kaTimLai(){ KA.xoayTay = false; KA.xoay = 0; if(!kaTuTimKhung()) bao('Không tự tìm được khung thẻ — bấm ✂ Chỉnh viền để kéo tay.', 4); kaXuLy(); veCatKA(); }
/* đoán khung chữ ký: vùng nét tối quanh tâm ảnh (bỏ mép ảnh), nới thêm lề */
function khungKy(c){
  var k = Math.min(1, 500/Math.max(c.width, c.height)), w = Math.max(1, Math.round(c.width*k)), h = Math.max(1, Math.round(c.height*k));
  var t = document.createElement('canvas'); t.width = w; t.height = h; t.getContext('2d').drawImage(c, 0, 0, w, h);
  var d = t.getContext('2d').getImageData(0, 0, w, h).data, xam = new Uint8Array(w*h), hs = new Uint32Array(256), i;
  for(i=0;i<w*h;i++){ xam[i] = (d[i*4]*.3 + d[i*4+1]*.59 + d[i*4+2]*.11)|0; hs[xam[i]]++; }
  var dem = 0, nen = 255; for(i=255;i>=0;i--){ dem += hs[i]; if(dem > w*h*0.5){ nen = i; break; } }
  var x0 = w, y0 = h, x1 = -1, y1 = -1, bx = Math.round(w*.05), by = Math.round(h*.05);
  for(var y=by;y<h-by;y++) for(var x=bx;x<w-bx;x++) if(xam[y*w+x] < nen-70){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; }
  if(x1<0 || (x1-x0)*(y1-y0) < w*h*0.003) return {x:c.width*.15, y:c.height*.3, w:c.width*.7, h:c.height*.4};
  var l = Math.max(x1-x0, y1-y0)*0.08 + 6;
  x0 = Math.max(0, x0-l); y0 = Math.max(0, y0-l); x1 = Math.min(w, x1+l); y1 = Math.min(h, y1+l);
  return {x:x0/k, y:y0/k, w:(x1-x0)/k, h:(y1-y0)/k};
}
function veCatKA(){
  var ky = KA.loai==='ky';
  var url = KA.im ? KA.im.toDataURL('image/jpeg', 0.8) : '';
  moHop(buocHTML(1, {lui:'kaLui()', tiep:'xemKA2()', b2:'xemKA2()'})+'<div class="hop-tit">'+(ky?'✍ Chữ ký':'🪪 CCCD mặt trước')+'</div>'+
    '<div class="hop-phu">App đã tự '+(ky?'khoanh vùng chữ ký':'tìm khung thẻ')+' và nắn thẳng. Chưa vừa thì bấm <b>✂ Chỉnh viền</b>: kéo 4 góc (có kính lúp), '+
      'kéo gạch giữa cạnh để dời cả cạnh — giống hệt màn chỉnh của Scan.</div>'+
    '<div class="ka-lon"><img id="ka-kq1" src="'+url+'" alt=""></div>'+
    '<div class="hang-nut ka-cong">'+
      '<button class="nho chinh" onclick="moChinhGocKA()">✂ Chỉnh viền</button>'+
      '<button class="nho" onclick="kaXoay(-90)" title="Xoay trái 90°">⟲ Trái</button>'+
      '<button class="nho" onclick="kaXoay(90)" title="Xoay phải 90°">⟳ Phải</button>'+
      '<button class="nho" onclick="kaXoay(180)" title="Lật ngược 180°">⇅ Lật</button>'+
      '<button class="nho'+(KA.thang?' bat':'')+'" onclick="kaThang()" title="Tự dò độ nghiêng và xoay cho thẳng">📐 Làm thẳng</button>'+
      '<button class="nho" onclick="kaTimLai()">Tự tìm lại</button>'+
      (!ky ? '<span class="ka-muc">'+Object.keys(KA_MUC).map(function(m){
        return '<button class="nho'+(KA.muc===m?' bat':'')+'" onclick="KA.muc=\''+m+'\';D.cauHinh.kaMuc=\''+m+'\';luu();veCatKA()">'+KA_MUC[m].ten+'</button>'; }).join('')+'</span>' : '')+
    '</div>'+
    '<div class="xp-nut"><div class="hang-nut">'+
      '<button class="nho" onclick="chupKA(KA.loai===\'ky\'?\'ky\':\'anh\',\'camera\')">📷 Chụp lại</button>'+
      '<button class="nho" onclick="kaLui()">‹ Thôi</button>'+
      '<button class="nho chinh sc-xong" onclick="xemKA2()">Xem ›</button></div></div>', true);
}
function kaLui(){ moKyAnh(); }
/* mở màn kéo 4 góc của Scan trên ảnh gốc Chữ ký / CCCD */
function moChinhGocKA(){
  if(!KA.goc) return;
  CG = {ka:true, im:KA.goc, che:KA.loai==='anh'?'the':'giay', goc:xepGoc4(KA.khung.map(function(p){ return [p[0], p[1]]; })), keo:-1};
  moManCG(KA.loai==='anh' ? 'thẻ' : 'chữ ký');
}
/* ---- dựng file kết quả + nén ---- */
function dungKA(){
  var r = KA.r, ky = KA.loai==='ky';
  var wMax = ky ? 700 : KA_MUC[KA.muc].w, k = Math.min(1, wMax/r.w);
  var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(r.w*k)); c.height = Math.max(1, Math.round(r.h*k));
  var g = c.getContext('2d'); g.imageSmoothingQuality = 'high';
  g.drawImage(KA.im, r.x, r.y, r.w, r.h, 0, 0, c.width, c.height);
  if(ky){
    /* nền trắng tinh, nét đậm: nền = mức sáng phổ biến, mực = phần tối nhất; kéo giãn rồi đẩy phần sáng thành trắng */
    var d = g.getImageData(0, 0, c.width, c.height), a = d.data, n = c.width*c.height, hs = new Uint32Array(256), xam = new Uint8Array(n), i;
    for(i=0;i<n;i++){ xam[i] = (a[i*4]*.3 + a[i*4+1]*.59 + a[i*4+2]*.11)|0; hs[xam[i]]++; }
    var dem = 0, nen = 255, muc = 0;
    for(i=255;i>=0;i--){ dem += hs[i]; if(dem > n*0.4){ nen = i; break; } }
    dem = 0; for(i=0;i<256;i++){ dem += hs[i]; if(dem > n*0.02){ muc = i; break; } }
    var kc = Math.max(20, nen - muc);
    for(i=0;i<n;i++){
      var t = (xam[i]-muc)/kc; t = t<0 ? 0 : (t>1 ? 1 : t);
      var v = t > 0.72 ? 255 : Math.round(255*Math.pow(t/0.72, 1.8)*0.85);
      a[i*4] = a[i*4+1] = a[i*4+2] = v;
    }
    g.putImageData(d, 0, 0);
  }
  var tran = (ky ? 60 : KA_MUC[KA.muc].kb)*1024, gioiHan = 195*1024;
  /* hạ chất lượng dần tới khi dưới mức đặt; vẫn quá 195 KB thì thu nhỏ ảnh */
  var thu = function(cc, q){
    return canvasRaBlob(cc, q).then(function(b){
      if(b.size <= tran || (q <= 0.45 && b.size <= gioiHan)) return b;
      if(q > 0.45) return thu(cc, Math.round((q-0.1)*100)/100);
      var c2 = document.createElement('canvas'); c2.width = Math.round(cc.width*0.8); c2.height = Math.round(cc.height*0.8);
      c2.getContext('2d').drawImage(cc, 0, 0, c2.width, c2.height);
      return thu(c2, 0.7);
    });
  };
  return thu(c, ky ? 0.85 : 0.82);
}
var KA_URL = '';
/* ② XEM — ảnh kết quả cỡ lớn + dung lượng + tên khách; chưa lưu */
function xemKA2(){
  var ky = KA.loai==='ky', ten = tenKhachKA();
  batChay(false, 'Đang nén ảnh…');
  dungKA().then(function(b){
    tatChay(); KA.bl = b;
    if(KA_URL) URL.revokeObjectURL(KA_URL); KA_URL = URL.createObjectURL(b);
    moHop(buocHTML(2, {lui:'veCatKA()', b1:'veCatKA()', tiep:'luuKA()'})+'<div class="hop-tit">Xem '+(ky?'chữ ký':'CCCD')+'</div>'+
      '<div class="ka-lon"><img src="'+KA_URL+'" alt=""></div>'+
      '<div class="ka-co"><b>'+Math.round(b.size/1024)+' KB</b> · JPG '+(b.size<=200*1024?'<span class="ka-dat">✓ dưới 200 KB</span>':'<span class="ka-qua">quá 200 KB</span>')+'</div>'+
      '<div class="ka-ten-o"><input id="ka-ten2" value="'+coChuHTML(ten)+'" placeholder="Tên khách (đặt tên file)" '+
        'oninput="KA.ten=this.value;KA.tenLuc=Date.now();document.getElementById(\'ka-tf\').textContent=\'→ \'+tenFileKA(KA.loai,this.value)">'+
        '<span id="ka-tf">→ '+coChuHTML(tenFileKA(KA.loai, ten))+'</span></div>'+
      '<div class="xp-nut"><div class="hang-nut">'+
        '<button class="nho" onclick="veCatKA()">‹ Cắt lại</button>'+
        '<button class="nho chinh sc-xong" onclick="luuKA()">Đạt — Tiếp ›</button></div></div>', true);
    var e = document.getElementById('ka-ten2'); if(e && !e.value) e.focus();
  }).catch(function(e){ tatChay(); baoLoi('Không nén được ảnh: '+(e&&e.message||e)); });
}
/* ③ LƯU — đã lưu trong máy + đưa lên Drive liền (anh chốt) */
function kaXong(k){
  /* 3.60 (anh chốt): cùng bố cục với Scan · Lưu & gửi — 1 dòng đầu, ảnh xem lớn, 1 hàng nút chính, việc ít dùng trong ⋯ */
  var mayBan = laMayBan() || !coChiaSeFile();
  var them = [];
  if(mayBan && coCauNoi() && k.driveId) them.push('<button class="nho" onclick="cnHanh(\'thumuc\',\'ka\',\''+k.id+'\')">📂 Mở thư mục (máy)</button>');
  them.push('<button class="nho" onclick="moThuMucKA(\''+(k.ngay||'').slice(0,7)+'\')">☁ Mở thư mục Drive</button>');
  them.push('<button class="nho xau" onclick="xoaKA(\''+k.id+'\')">🗑 Xóa</button>');
  moHop(buocHTML(3, {lui:'moKyAnh()', luiNhan:'‹ Về danh sách'})+
    '<div class="xp-dau"><b class="xp-tit">✓ Đã lưu · '+coChuHTML(k.ten)+'</b>'+
      '<span class="xp-dr" id="ka-drive">'+Math.round((k.co||0)/1024)+' KB · '+(k.driveId ? '☁ Đã lên Drive.' : (coTheNoiDrive() ? '☁ Đang đưa lên Drive…' : 'Chưa nối Drive — ảnh đang nằm trong máy, nối Drive xong app tự đẩy.'))+'</span></div>'+
    '<div class="xp-trang ka-xem"><img id="ka-xem-anh" alt=""></div>'+
    '<div class="xp-nut xp-gon"><div class="xp-hang">'+
      (mayBan
        ? '<button class="nho chinh" onclick="copyKA(\''+k.id+'\')" title="'+(coCauNoi()?'Chép đúng file JPG — Ctrl+V vào Zalo / hệ thống':'Chép ảnh — Ctrl+V vào Zalo')+'">📋 Copy</button>'+
          '<button class="nho" onclick="lnKA(\''+k.id+'\')" title="Ghi thẳng file JPG vào thư mục cố định trên máy">💾 Lưu nhanh</button>'
        : '<button class="nho chinh" onclick="guiKA(\''+k.id+'\')">📤 Gửi</button>')+
      '<button class="nho" onclick="chupKA(\'ky\',\'camera\')" title="Chụp tiếp chữ ký khách khác">✍ Chữ ký</button>'+
      '<button class="nho xp-them-nut" onclick="document.getElementById(\'ka-them\').classList.toggle(\'mo\')" title="Mở thư mục, Xóa, cài đặt Lưu nhanh">⋯</button>'+
      '<button class="nho xp-dong" onclick="moKyAnh()">Đóng</button></div>'+
      '<div class="xp-them" id="ka-them"><div class="hang-nut">'+them.join('')+'</div>'+(mayBan ? lnCaiHTML('ka') : '')+'</div></div>', true);
  layAnhKA(k).then(function(b){ var im = document.getElementById('ka-xem-anh'); if(b && im){ var u = URL.createObjectURL(b); im.onload = function(){ setTimeout(function(){ URL.revokeObjectURL(u); }, 1000); }; im.src = u; } }).catch(function(){});
}
function luuKA(cach){
  var ten = (document.getElementById('ka-ten2')||{}).value || KA.ten;
  if(!String(ten).trim()) return baoLoi('Nhập tên khách để đặt tên file.');
  KA.ten = ten; KA.tenLuc = Date.now();
  (KA.bl ? Promise.resolve(KA.bl) : dungKA()).then(function(b){
    var d = nay(), k = {id:'ka'+idMoi(), loai:KA.loai, ten:tenFileKA(KA.loai, ten, ngayISO(d)), khach:String(ten).trim(), co:b.size, ngay:ngayISO(d), luc:d.toISOString(),
      suaLuc:d.toISOString(), may:maMayCua()};
    D.kyAnh = D.kyAnh || [];
    /* trùng tên thì thêm _2, _3 */
    var co = {}; D.kyAnh.forEach(function(x){ co[x.ten] = 1; });
    var goc = k.ten.replace(/\.jpg$/,''), n = 2; while(co[k.ten]){ k.ten = goc+' ('+n+').jpg'; n++; }
    return luuAnhHS(k.id, b).then(function(){
      D.kyAnh.push(k); luu();
      kaXong(k);
      if(laMayBan() && lnCai('ka').tuLuu) lnKA(k.id, true);   /* 3.49: tự lưu xuống máy */
      if(coTheNoiDrive()) return dayKAMot(k.id, true);
    });
  }).catch(function(e){ baoLoi('Chưa lưu được: '+(e&&e.message||e)); });
}
function dayKAMot(id, im){
  var k = (D.kyAnh||[]).find(function(x){ return x.id===id; }); if(!k) return;
  if(!coTheNoiDrive()) return baoLoi(drChuaNoi());
  var thang = (k.ngay||ngayISO(nay())).slice(0,7), duong = duongKA(thang);
  return Promise.all([docAnhHS(k.id), baoDamDuong(duong)]).then(function(r){
    var bl = r[0], idTM = r[1]; if(!bl) throw new Error('Ảnh trong máy không còn');
    D.cauHinh.kaTM = D.cauHinh.kaTM || {}; D.cauHinh.kaTM[thang] = idTM;
    var bien = '----tuhoso'+Date.now();
    var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify({name:k.ten, parents:[idTM]})+
      '\r\n--'+bien+'\r\nContent-Type: image/jpeg\r\n\r\n';
    return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
      {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:new Blob([dau, bl, '\r\n--'+bien+'--'])});
  }).then(function(r){
    k.driveId = r && r.id; k.suaLuc = new Date().toISOString(); luu(); ghiDongBo();
    var e = document.getElementById('ka-drive'); if(e) e.textContent = '☁ Đã lên Drive: '+duong.replace(D.cauHinh.thumuc+' / ','')+' / '+k.ten;
    else if(!im) bao('☁ Đã lên Drive: '+k.ten, 5);
    if(document.getElementById('ka-ten')) moKyAnh();
  }).catch(function(e){
    var el = document.getElementById('ka-drive'); if(el) el.textContent = 'Chưa lên Drive được ('+(e&&e.message||e)+') — app tự thử lại khi mở / rời app, hoặc bấm ☁ Đồng bộ.';
    else if(!im) baoLoi('Chưa đưa lên Drive được: '+(e&&e.message||e)+' — bấm ☁ để thử lại.');
  });
}
function chiaSeAnh(b, ten){
  var f = new File([b], ten, {type:'image/jpeg'});
  if(navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
  var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = ten;
  document.body.appendChild(a); a.click(); thuHoiSau(a.href); setTimeout(function(){ a.remove(); }, 1000);
  bao('Đã tải về: '+ten, 5);
}
function guiKA(id){
  var k = (D.kyAnh||[]).find(function(x){ return x.id===id; }); if(!k) return;
  layAnhKA(k).then(function(b){ if(b) chiaSeAnh(b, k.ten); else baoLoi('Ảnh không có trong máy này và chưa lên Drive.'); });
}
function layAnhKA(k){
  return docAnhHS(k.id).then(function(b){
    if(b) return b;
    return k.driveId ? taiPDFDrive(k.driveId, 'image/jpeg').catch(function(){ return null; }) : null;
  });
}
function xoaKA(id){ xoaNhieuVaoRac([id], function(){ if(document.getElementById('hop').classList.contains('hien')) moKyAnh(); }); }
