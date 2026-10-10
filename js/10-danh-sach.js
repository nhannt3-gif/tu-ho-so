/* ==========================================================
   14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI
   ========================================================== */

/* ---- thanh trạng thái chạy ngang đầu màn hình ---- */
var demChay = 0;
var DL_HEN = null;
/* thanh báo "đang làm gì" — chỉ hiện khi việc chạy quá 0,4 giây để không nhấp nháy */
function dangLam(chu, coDung){
  var e = document.getElementById('danglam'); if(!e) return;
  var c = document.getElementById('dl-chu'); if(c) c.textContent = chu || 'Đang xử lý…';
  var d = document.getElementById('dl-dung');
  if(d){ d.style.display = coDung ? '' : 'none'; d.disabled = false; d.textContent = 'Dừng'; }
  clearTimeout(DL_HEN);
  DL_HEN = setTimeout(function(){ e.classList.add('hien'); }, 400);
}
function dangLamChu(chu){
  var c = document.getElementById('dl-chu'); if(c) c.textContent = chu;
}
function hetLam(){
  clearTimeout(DL_HEN);
  var e = document.getElementById('danglam'); if(e) e.classList.remove('hien');
}
function batChay(lap, chu, coDung){
  if(chu) dangLam(chu, coDung);
  demChay++;
  var e = document.getElementById('ttchay');
  if(!e) return;
  e.classList.toggle('lap', !!lap);
  if(!lap) e.querySelector('i').style.width = '8%';
}
function tienChay(pt){
  var e = document.getElementById('ttchay');
  if(e && !e.classList.contains('lap')) e.querySelector('i').style.width = pt+'%';
}
function tatChay(){
  demChay = Math.max(0, demChay-1);
  if(demChay) return;
  hetLam();
  var e = document.getElementById('ttchay');
  if(!e) return;
  e.querySelector('i').style.width = '100%';
  setTimeout(function(){
    e.classList.remove('lap');
    e.querySelector('i').style.width = '0';
  }, 320);
}

/* ---- menu ⋯ cho từng dòng ---- */
function moMenu(ev, id){
  ev.stopPropagation();
  var m = timMuc(id); if(!m) return;
  var e = document.getElementById('menu');
  var laBM = m.huongDan!==undefined;
  e.innerHTML =
    '<button onclick="dongMenu();moXem(\'' +id+ '\')">Xem lớn</button>'+
    (coTheDocLai(m) ? '<button onclick="dongMenu();suaCho(\'' +id+ '\');setTimeout(function(){ docLaiGoiY(\'' +id+ '\', true); }, 50)">🔍 Đọc lại &amp; gợi ý tên</button>' : '')+
    '<button onclick="dongMenu();guiNhanh(\'' +id+ '\')">Gửi cả file</button>'+
    '<button onclick="dongMenu();inTheoId(\'' +id+ '\')">In</button>'+
    '<div class="vach"></div>'+
    '<button onclick="dongMenu();'+(laBM?'suaBieuMau':'suaCho')+'(\'' +id+ '\')">Sửa thông tin</button>'+
    (m.driveId ? '<button onclick="dongMenu();moTrenDrive(\''+id+'\')">Mở file trên Drive</button>' : '')+
    '<button onclick="dongMenu();moThuMucMuc(\''+id+'\')">Mở thư mục trên Drive</button>'+
    (coCauNoi() && m.driveId ? '<button onclick="dongMenu();cnHanh(\'mo\',\'muc\',\''+id+'\')">🖥 Mở trên máy tính</button>'+
      '<button onclick="dongMenu();cnHanh(\'xem\',\'muc\',\''+id+'\')">👁 Xem nhanh (bản tạm)</button>'+
      '<button onclick="dongMenu();cnHanh(\'chep\',\'muc\',\''+id+'\')">📋 Chép file — dán vào Zalo</button>'+
      '<button onclick="dongMenu();cnHanh(\'thumuc\',\'muc\',\''+id+'\')">📂 Mở thư mục chứa file</button>' : '')+
    '<button onclick="dongMenu();chepDuongMay(thuMucCua(timMuc(\''+id+'\')))">Chép đường dẫn ổ G</button>'+
    '<button onclick="dongMenu();batTatPV()">'+(anPVCua(tenTabPV())?'Bật':'Tắt')+' khung xem nhanh</button>'+
    '<button onclick="dongMenu();chepTen(\'' +id+ '\')">Sao chép tên file</button>'+
    '<div class="vach"></div>'+
    (laBieuMau(timMuc(id)||bmTim(id)) ?
      '<button onclick="dongMenu();bmGhiChu(\''+id+'\')">Ghi chú cách dùng</button>'+
      '<button onclick="dongMenu();bmGanVB(\''+id+'\')">Gắn văn bản ban hành</button>'+
      '<button onclick="dongMenu();bmThayBan(\''+id+'\')">Đánh dấu đã có bản mới</button>' : '')+
    (/\.(xlsx|xls|csv)$/i.test((timMuc(id)||{}).tenMoi||'') ?
      '<button onclick="dongMenu();moChepAI(\''+id+'\')">📋 Chép sang AI</button>'+
      '<button onclick="dongMenu();moBangOffice(\''+id+'\',\'excel\')">Mở bằng Excel trên máy</button>' : '')+
    (/\.(docx|doc|rtf)$/i.test((timMuc(id)||{}).tenMoi||'') ?
      '<button onclick="dongMenu();moBangOffice(\''+id+'\',\'word\')">Mở bằng Word trên máy</button>' : '')+
    '<button class="xau" onclick="dongMenu();xoaVaoRac(\'' +id+ '\')">Xóa vào thùng rác</button>';
  e.classList.add('hien');
  var x = Math.min(ev.clientX, window.innerWidth-200);
  var y = Math.min(ev.clientY, window.innerHeight-300);
  e.style.left = Math.max(8,x)+'px';
  e.style.top = Math.max(8,y)+'px';
}
function dongMenu(){ document.getElementById('menu').classList.remove('hien'); }
/* 3.50: Esc = lùi ra MỘT cấp, theo tầng trên cùng đang mở:
   màn kéo 4 góc → camera (tự xử lý) → menu ⋯ → hộp (có thanh bước thì bấm ‹ Lùi) → khung xem lớn → chế độ chọn xóa → Chờ khai / Dọn kho.
   Enter = Tiếp khi đang ở một bước Scan (không áp khi đang gõ nhiều dòng). */
function phimChung(e){
  if(e.key!=='Escape' && e.key!=='Enter') return;
  if(CAM && CAM.on) return;                                  /* camera có phím riêng */
  var hop = document.getElementById('hop'), coHop = hop && hop.classList.contains('hien');
  var cg = document.getElementById('cg'), coCG = cg && cg.classList.contains('hien');
  if(e.key==='Enter'){
    var t = e.target || {}, tag = (t.tagName||'').toUpperCase();
    if(tag==='TEXTAREA' || tag==='SELECT' || tag==='BUTTON' || t.isContentEditable) return;
    if(coCG){ e.preventDefault(); xongChinhGoc(); return; }
    var tiep = coHop && document.querySelector('#hop-in .buoc .b-tiep');
    if(tiep && (tag!=='INPUT' || /^(text|search|)$/.test(t.type||''))){ e.preventDefault(); tiep.click(); }
    return;
  }
  var tg = e.target || {}; if(tg.id==='otim') return;        /* ô tìm có Esc riêng (đóng gợi ý) */
  if(coCG){ e.preventDefault(); dongChinhGoc(); return; }
  var menu = document.getElementById('menu'); if(menu && menu.classList.contains('hien')){ e.preventDefault(); dongMenu(); return; }
  if(coHop){
    e.preventDefault();
    var lui = document.querySelector('#hop-in .buoc .b-lui');
    if(lui){ lui.click(); return; }
    var nutEsc = document.querySelector('#hop-in [data-esc]');   /* 3.61: Esc = đúng nút "Đóng (Esc)" / "Thôi (Esc)" */
    if(nutEsc && !hop.classList.contains('trang')){ nutEsc.click(); return; }
    if(hop.classList.contains('trang')){ dongCaiDat(); return; }
    if(!khoaHop) dongHop();
    else bao('Bấm nút trong hộp để tiếp tục hoặc thôi.', 3);
    return;
  }
  var xem = document.getElementById('xem'); if(xem && xem.classList.contains('hien')){ e.preventDefault(); dongXem(); return; }
  if(BOT.tab){ e.preventDefault(); thoiBot(); return; }
  if(typeof DK!=='undefined' && DK.mo){ e.preventDefault(); dongDonKho(); return; }
  if(CHO_KHAI){ e.preventDefault(); dongChoKhai(); return; }
  if(CC.mo && nganHienTai===0){ e.preventDefault(); ccDong(); return; }   /* 3.62: ô 🧰 Công cụ */
}

document.addEventListener('click', function(e){
  if(!e.target.closest || !e.target.closest('.menu')) dongMenu();
});

function inTheoId(id){ var m = timMuc(id); if(m){ mucDangXem = m; inFile(); } }
/* ---- lối tắt thư mục: ổ G (Google Drive cho máy tính) + Drive web ---- */
function duongMay(duong){
  var goc = String(D.cauHinh.gocMay || 'G:\\My Drive').replace(/[\\\/]+$/,'');
  return goc + '\\' + String(duong||'').split('/').map(function(x){ return x.trim(); })
    .filter(Boolean).join('\\');
}
function chepChu(t, baoXong){
  if(navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(t).then(function(){ bao(baoXong, 7); })
      .catch(function(){ window.prompt('Chép đường dẫn này:', t); });
  else window.prompt('Chép đường dẫn này:', t);
}
function chepDuongMay(duong){
  var p = duongMay(duong);
  chepChu(p, 'Đã chép: '+p+' — bấm vào thanh địa chỉ Explorer, Ctrl+V, Enter.');
}
/* tìm id thư mục theo đường dẫn, KHÔNG tạo mới */
function timThuMucKhongTao(duong){
  if(DR.thuMuc[duong]) return Promise.resolve(DR.thuMuc[duong]);
  var phan = String(duong).split('/').map(function(x){ return x.trim(); }).filter(Boolean);
  return phan.reduce(function(p, ten){
    return p.then(function(cha){
      if(!cha) return '';
      var q = "name='"+ten.replace(/'/g,"\\'")+"' and mimeType='application/vnd.google-apps.folder'"+
              " and trashed=false and '"+cha+"' in parents";
      return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
        '&fields=files(id)&pageSize=1').then(function(kq){ return (kq.files&&kq.files[0]&&kq.files[0].id)||''; });
    });
  }, Promise.resolve('root'));
}
function moThuMucDrive(duong, idBiet){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Dùng nút 📂 để chép đường dẫn ổ G.');
  var w = window.open('about:blank', '_blank');   /* mở trước để không bị chặn cửa sổ */
  (idBiet ? Promise.resolve(idBiet) : timThuMucKhongTao(duong)).then(function(id){
    if(id){ if(w) w.location = 'https://drive.google.com/drive/folders/'+id; }
    else { if(w) w.close(); bao('Thư mục chưa có trên Drive: '+duong, 6); }
  }).catch(function(){ if(w) w.close(); baoLoi('Không mở được thư mục trên Drive.'); });
}
/* thư mục ứng với tab đang xem (theo năm đang lọc) */
function thuMucTab(tab){
  var g = D.cauHinh.thumuc, y = locCua(tab).nam || String(nay().getFullYear());
  if(tab==='vanBan') return g+' / Văn bản / '+y;
  if(tab==='duLieu') return g+' / Dữ liệu tháng / '+y;
  if(tab==='ghiChu') return g+' / Ghi chú / '+y;
  if(tab==='bieuMau') return g+' / Biểu mẫu';
  return g;
}
function moThuMucMuc(id){
  var m = timMuc(id); if(!m) return;
  var duong = thuMucCua(m);
  moThuMucDrive(duong, (m.driveCha && !m.choDB) ? m.driveCha : '');
}
function chepTen(id){
  var m = timMuc(id); if(!m) return;
  var t = m.tenMoi||m.tenCu||'';
  if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){
    bao('Đã sao chép: '+t, 4); });
  else bao(t, 6);
}
function moTrenDrive(id){
  var m = timMuc(id); if(!m || !m.driveId) return;
  window.open('https://drive.google.com/file/d/'+m.driveId+'/view', '_blank');
}

/* ---- THÙNG RÁC ---- */
function boVaoRac(id){ return xoaVaoRac(id); }
/* ==========================================================
   QUÉT DỌN RÁC — chỉ trong thư mục Tủ hồ sơ, chỉ đọc cho tới khi anh chọn
   Tìm: file thừa (có trên Drive, không có trong tủ) · file trùng nội dung (md5) ·
        mục gãy (trong tủ nhưng file Drive đã mất) · file lạc trong _ThungRac · thư mục trống
   Xử lý: file → chuyển vào Thùng rác app (rồi Xóa hẳn như thường) · thư mục trống → xóa hẳn
   ========================================================== */
var QD = {kq:null};
function gomTatCaDon(idGoc){
  var files = [], thuMuc = [], hang = [{id:idGoc, duong:''}];
  function tiepDon(){
    if(!hang.length) return Promise.resolve();
    var t = hang.shift(), q = "'"+t.id+"' in parents and trashed=false", trang = '';
    function layTrangDon(tok){
      return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
        '&fields=nextPageToken,files(id,name,mimeType,size,md5Checksum,parents,modifiedTime,appProperties)&pageSize=500'+
        (tok?'&pageToken='+tok:'')).then(function(kq){
        var con = kq.files||[];
        con.forEach(function(f){
          if(f.mimeType==='application/vnd.google-apps.folder'){
            if(/^(_Hệ thống|Số liệu)$/.test(f.name)) return;   /* 3.85: Số liệu do tab Số liệu quản lý */
            var d = t.duong ? t.duong+' / '+f.name : f.name;
            thuMuc.push({id:f.id, ten:f.name, duong:d, cha:t.id, soCon:0});
            hang.push({id:f.id, duong:d});
          } else files.push(Object.assign({duong:t.duong}, f));
        });
        var tm = thuMuc.find(function(x){ return x.id===t.id; }); if(tm) tm.soCon += con.length;
        QD.dang = 'Đã xem '+files.length+' file, '+thuMuc.length+' thư mục…';
        var e = document.getElementById('qd-dang'); if(e) e.textContent = QD.dang;
        return kq.nextPageToken ? layTrangDon(kq.nextPageToken) : null;
      });
    }
    return layTrangDon('').then(tiepDon);
  }
  return tiepDon().then(function(){ return {files:files, thuMuc:thuMuc}; });
}
/* 3.49: QUÉT RÁC — tìm file anh không biết: lạc (không chỉ mục), không có dữ liệu, không đủ thông tin; cùng các nhóm cũ
   (trùng, thư mục trống, lạc trong _ThungRac). Chỉ liệt kê — anh xem, tích rồi mới làm. Hai mức: Vào thùng rác / Xóa hẳn.
   Chưa nối Drive vẫn quét được phần trong app (không đủ thông tin, bản scan không còn dữ liệu). */
function ngayCachQD(m){ var l = lucThemBot(m); return l ? (Date.now()-new Date(l).getTime())/864e5 : 0; }
function thieuQD(m, loai){
  var t = [];
  if(loai==='scan'){
    if(!m.ten) t.push('tên');
    if(!m.xa && m.che!=='tailieu') t.push('địa bàn');
    if(m.chuaKhai && ngayCachQD(m)>30) t.push('lưu tạm chưa khai quá 30 ngày');
    return t;
  }
  if(loai==='cho') return ngayCachQD(m)>30 ? ['nằm khay chờ quá 30 ngày'] : [];
  if(laFileHeThong(m)) return t;
  if(m.nhom==='duLieu'){ if(!m.ky) t.push('kỳ'); if(!m.maLoai || m.maLoai==='KHAC') t.push('loại báo cáo'); return t; }
  if(m.nhom==='vanBan'){ if(!m.soHieu) t.push('số hiệu'); if(!m.ngay) t.push('ngày'); if(!(m.tenVB||m.trichYeu)) t.push('tên'); }
  return t;
}
function quetTrongApp(kq){
  kq.thieu = [];
  ['vanBan','duLieu'].forEach(function(k){ (D[k]||[]).forEach(function(m){ var t = thieuQD(m); if(t.length) kq.thieu.push({loai:'tu', m:m, ly:t}); }); });
  (D.cho||[]).forEach(function(m){ var t = thieuQD(m,'cho'); if(t.length) kq.thieu.push({loai:'cho', m:m, ly:t}); });
  (D.scan||[]).forEach(function(m){ var t = thieuQD(m,'scan'); if(t.length) kq.thieu.push({loai:'scan', m:m, ly:t}); });
  /* bản scan / Chữ ký·CCCD không còn dữ liệu: không có ảnh trong máy và chưa từng lên Drive */
  kq.scanRong = [];
  return Promise.all((D.scan||[]).filter(function(k){ return !k.driveId; }).map(function(k){
    return coAnhTrongMay(k).then(function(co){ if(!co) kq.scanRong.push({loai:'scan', m:k}); });
  }).concat((D.kyAnh||[]).filter(function(k){ return !k.driveId; }).map(function(k){
    return docAnhHS(k.id).then(function(b){ if(!(b && b.size)) kq.scanRong.push({loai:'ka', m:k}); }, function(){ kq.scanRong.push({loai:'ka', m:k}); });
  })));
}
function moQuetDon(){
  if(!DK.mo || DK.phan!=='quet') moDonKho('quet');
  var coDrive = !!(DR.sanSang && DR.online);
  QD.dang = true; QD.kq = null; ve();
  var kq = {thua:[], rong:[], gay:[], scanRong:[], thieu:[], trung:[], lac:[], trong:[]}, g = {files:[], thuMuc:[]};
  var buoc = coDrive ? timThuMucKhongTao(D.cauHinh.thumuc).then(function(id){
    if(!id) throw new Error('Chưa có thư mục '+D.cauHinh.thumuc+' trên Drive');
    return gomTatCaDon(id);
  }) : Promise.resolve(null);
  buoc.then(function(gg){
    if(gg){ g = gg; phanLoaiDriveQD(g, kq); }
    kq.trung = nhomTrungQD(g);
    return quetTrongApp(kq);
  }).then(function(){ QD.kq = kq; QD.g = g; QD.coDrive = coDrive; QD.daKiem = false; QD.dang = false; ve(); })
  .catch(function(e){ QD.dang = false; ve(); baoLoi('Quét dừng: '+(e&&e.message||e)); });
}
/* 3.50: gộp "Gom file trùng nội dung" vào Quét rác — nhóm các mục trong tủ giống hệt nhau (dấu vân SHA trong app + md5 trên Drive) */
function nhomTrungQD(g){
  var tu = D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]), theoD = {}, nhom = {}, i;
  tu.forEach(function(m){ if(m.driveId) theoD[m.driveId] = m; });
  nhomTrungVan().forEach(function(n){ nhom['v'+n.van] = n.ds.map(function(x){ return x.m; }); });
  var md5 = {};
  (g.files||[]).forEach(function(f){ if(f.md5Checksum && +f.size>0 && theoD[f.id]) (md5[f.md5Checksum] = md5[f.md5Checksum]||[]).push(theoD[f.id]); });
  Object.keys(md5).forEach(function(k){ if(md5[k].length>1) nhom['m'+k] = md5[k]; });
  var daCo = {}, ra = [];
  Object.keys(nhom).forEach(function(k){
    var ds = nhom[k].filter(function(m, j, a){ return a.indexOf(m)===j; }); if(ds.length<2) return;
    var khoa = ds.map(function(m){ return m.id; }).sort().join('|'); if(daCo[khoa]) return; daCo[khoa] = 1;
    ds.sort(function(a,b){ return (tenDungChuan(b)?1:0)-(tenDungChuan(a)?1:0) || String(b.themLuc||'').localeCompare(String(a.themLuc||'')); });
    ra.push({ds:ds});
  });
  return ra;
}
function phanLoaiDriveQD(g, kq){
  var tu = D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]), theoD = {}, racD = {};
  tu.forEach(function(m){ if(m.driveId) theoD[m.driveId] = m; });
  (D.rac||[]).forEach(function(m){ if(m.driveId) racD[m.driveId] = m; });
  /* 3.49: bản scan, Chữ ký·CCCD, file đang ở khay chờ cũng là file của app — trước đây bị báo nhầm là thừa */
  var biet = {};
  (D.scan||[]).concat(D.kyAnh||[]).forEach(function(m){ if(m.driveId) biet[m.driveId] = 1; });
  (D.cho||[]).forEach(function(m){ if(m.driveId) biet[m.driveId] = 1; if(m.tuKhay) biet[m.tuKhay] = 1; });
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.driveId) biet[f.driveId] = 1; }); });
  nkDriveIds().forEach(function(d){ biet[d] = 1; });
  QD.biet = biet;
  var co = {}; g.files.forEach(function(f){ co[f.id] = f; });
  g.files.forEach(function(f){
    if(laFileHeThong({tenCu:f.name})) return;
    var trongRac = /(^| \/ )_ThungRac( \/ |$)/.test(f.duong);
    if(trongRac){ if(!racD[f.id]) kq.lac.push(f); return; }
    var google = /^application\/vnd\.google-apps\./.test(f.mimeType||'');
    var rong = !google && f.size!==undefined && +f.size===0;
    if(rong && !biet[f.id]){ kq.rong.push(Object.assign({ly:'0 byte — file rỗng', m:theoD[f.id]||null}, f)); return; }
    if(!theoD[f.id] && !racD[f.id] && !biet[f.id] && !/(^| \/ )_Chờ xử lý( \/ |$)/.test(f.duong)) kq.thua.push(f);
  });
  var nhom = {};
  g.files.forEach(function(f){
    if(!f.md5Checksum || +f.size===0 || /(^| \/ )_ThungRac( \/ |$)/.test(f.duong)) return;
    (nhom[f.md5Checksum] = nhom[f.md5Checksum]||[]).push(f);
  });
  Object.keys(nhom).forEach(function(k){
    var ds = nhom[k]; if(ds.length<2) return;
    ds.sort(function(a,b){ return ((theoD[b.id]||biet[b.id])?1:0)-((theoD[a.id]||biet[a.id])?1:0) || (a.modifiedTime||'').localeCompare(b.modifiedTime||''); });
    ds.slice(1).forEach(function(f){ if(!biet[f.id]) kq.trung.push(Object.assign({giu:ds[0].name}, f)); });
  });
  var laTrung = {}; kq.trung.forEach(function(f){ laTrung[f.id] = 1; });
  kq.thua = kq.thua.filter(function(f){ return !laTrung[f.id]; });
  tu.forEach(function(m){ if(m.driveId && !co[m.driveId] && !laFileHeThong(m)) kq.gay.push(m); });
  g.thuMuc.forEach(function(t){ if(!t.soCon && !/^(_ThungRac|_Chờ xử lý|_Hệ thống|du_phong|Số liệu)$/.test(t.ten)) kq.trong.push(t); });
}
/* kiểm tra sâu: tải từng file PDF / Excel / ảnh trong tủ, xem có mở được, có nội dung không */
function kiemNoiDungQD(){
  var k = QD.kq, g = QD.g; if(!k || !g) return;
  var daBao = {}; k.rong.forEach(function(f){ daBao[f.id] = 1; });
  var ds = g.files.filter(function(f){
    return !daBao[f.id] && !(QD.biet||{})[f.id] && !/(^| \/ )_ThungRac( \/ |$)/.test(f.duong) && !laFileHeThong({tenCu:f.name}) &&
      +f.size>0 && +f.size < 25*1048576 && /\.(pdf|xlsx?|jpe?g|png|webp)$/i.test(f.name);
  });
  var theoD = {}; D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]).forEach(function(m){ if(m.driveId) theoD[m.driveId] = m; });
  QUET.dung = false; batChay(true, 'Đang kiểm tra nội dung…', true);
  var xong = 0, them = 0;
  ds.reduce(function(p, f){
    return p.then(function(){
      if(QUET.dung) return;
      xong++; dangLamChu('Kiểm tra nội dung '+xong+'/'+ds.length+' · '+f.name); tienChay(Math.round(xong/ds.length*100));
      return taiPDFDrive(f.id, f.mimeType).then(function(b){ return kiemMotFileQD(f.name, b); })
        .then(function(ly){ if(ly){ k.rong.push(Object.assign({ly:ly, m:theoD[f.id]||null}, f)); them++; } }, function(){});
    });
  }, Promise.resolve()).then(function(){
    tatChay();
    var bo = {}; k.rong.forEach(function(f){ bo[f.id] = 1; });
    k.thua = k.thua.filter(function(f){ return !bo[f.id]; });
    QD.daKiem = true; ve();
    bao('Đã kiểm tra '+xong+' file · '+them+' file không có dữ liệu hoặc không mở được.', 6);
  });
}
function kiemMotFileQD(ten, b){
  if(!b || !b.size) return Promise.resolve('0 byte — file rỗng');
  if(/\.pdf$/i.test(ten)){
    if(!sanSangPDF()) return Promise.resolve('');
    return b.arrayBuffer().then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; })
      .then(function(pdf){ return pdf.numPages ? '' : 'PDF không có trang nào'; }, function(){ return 'PDF hỏng — không mở được'; });
  }
  if(/\.xlsx?$/i.test(ten)){
    if(!window.XLSX) return Promise.resolve('');
    return b.arrayBuffer().then(function(ab){
      try{
        var wb = XLSX.read(new Uint8Array(ab), {type:'array'});
        var co = (wb.SheetNames||[]).some(function(n){ var ws = wb.Sheets[n]; return ws && ws['!ref'] && Object.keys(ws).some(function(c){ return c[0]!=='!' && ws[c] && ws[c].v!=='' && ws[c].v!=null; }); });
        return co ? '' : 'Excel trống — không có ô nào có số liệu';
      }catch(e){ return 'Excel hỏng — không mở được'; }
    });
  }
  return (window.createImageBitmap ? createImageBitmap(b) : Promise.resolve(1)).then(function(){ return ''; }, function(){ return 'Ảnh hỏng — không mở được'; });
}
function veKhacDKHTML(){
  var noi = coTheNoiDrive() && DR.sanSang;
  var the = function(ic, ten, lam, canDrive, nut){
    var mo = !canDrive || noi;
    return '<div class="dk-khoi"><h4>'+ic+' '+ten+'</h4><div class="dk-mo-ta">'+lam+(canDrive && !noi ? ' <i>— cần nối Drive trước.</i>' : '')+'</div>'+
      '<div class="hang-nut">'+nut.map(function(n){ return '<button class="nho'+(n[2]?' chinh':'')+'"'+(mo||n[3]?'':' disabled')+' onclick="'+n[1]+'">'+n[0]+'</button>'; }).join('')+'</div></div>';
  };
  var coKey = (D.cauHinh.apiKey||'').trim();
  return the('📂','Lấy file từ kho Drive cũ (Google Picker)',
      'Chọn thư mục hoặc file ở kho cũ ngoài tủ; app đọc, đề xuất tên và đưa vào khay chờ. Chưa đổi tên, chưa dời gì cho tới khi anh Duyệt.'+(coKey ? '' : ' <i>Cần API key — khai ở Cài đặt › Google Drive.</i>'),
      true, [['Chọn thư mục / file cũ…','moPicker()',1]].concat(coKey ? [] : [['Khai API key','moCaiDat(\'drive\')',0,1]]))+
    the('☁','Đẩy chỉ mục lên Drive', 'Ghi ngay danh mục file của máy này lên Drive (bình thường app tự làm) và báo thư mục chuẩn còn thiếu.', true, [['Đẩy chỉ mục','quetLaiChiMucToanBo()']])+
    the('⬇','Lấy chỉ mục từ Drive về máy này', 'Gộp phần mới hơn từ máy khác vào máy này (mở app thì app cũng tự lấy).', true, [['Lấy chỉ mục','taiChiMucTuDrive()']])+
    the('🤖','Nhờ AI chuẩn hóa', 'Xuất danh sách cho AI (Gemini, ChatGPT…) chuẩn lại tên, trích yếu; dán kết quả về để app cập nhật hàng loạt. Ảnh CCCD không bao giờ gửi đi.',
      false, [['Xuất file cho AI','moNhoAI()'],['Dán kết quả từ AI','moDanAI()']])+
    '<div class="huong-dan">Reset dữ liệu thử và Xóa sạch máy nằm ở ⚙ Cài đặt › Dữ liệu.</div>';
}
function veQuetDon(){ if(DK.mo && DK.phan==='quet') ve(); else moDonKho('quet'); }
function veQuetRacHTML(){
  var h = '<div class="dk-mo-ta"><b>Quét rác</b> tìm file <b>hỏng, rỗng, trùng, thiếu thông tin</b> và thư mục trống. App <b>chỉ liệt kê</b> — anh bấm tên để xem thử, '+
    'tích mục muốn dọn rồi bấm nút cuối trang: file vào <b>Thùng rác</b> (khôi phục được), thư mục trống xóa luôn. Chưa nối Drive vẫn quét được phần trong app.</div>'+
    '<div class="dk-hang"><button class="nho chinh" onclick="moQuetDon()"'+(QD.dang?' disabled':'')+'>🧹 '+(QD.kq?'Quét lại':'Bắt đầu quét')+'</button>'+
    (QD.kq && QD.coDrive && !QD.daKiem ? '<button class="nho" onclick="kiemNoiDungQD()" title="Tải từng file PDF / Excel / ảnh về xem có mở được, có số liệu không">🔎 Kiểm tra nội dung file (chậm hơn)</button>' : '')+'</div>';
  if(QD.dang) return h+'<div class="huong-dan" id="qd-dang">Đang quét…</div>';
  var k = QD.kq; if(!k) return h;
  var g = QD.g || {files:[], thuMuc:[]};
  var tong = ['rong','gay','scanRong','thieu','trung','trong'].reduce(function(a,x){ return a+k[x].length; }, 0);
  function ten(m){ return coChuHTML(m.tenMoi||m.ten||m.tenCu||'(chưa đặt tên)'); }
  function nhom(ma, tieu, giai, ds, dong, dau){
    if(!ds.length) return '';
    return '<details class="dk-ngan" open><summary><b>'+tieu+'</b> <span>'+ds.length+' · '+giai+'</span></summary>'+
      '<div class="dk-chan-ngan" style="justify-content:flex-start;border-top:0"><label class="dk-bat"><input type="checkbox" onchange="chonNhomQD(this,\''+ma+'\')"> Chọn cả nhóm</label>'+(dau||'')+'</div>'+
      ds.map(function(x,i){ return '<div class="dk-dong"><input type="checkbox" class="qd-'+ma+'" value="'+i+'">'+dong(x, i)+'</div>'; }).join('')+'</details>';
  }
  function dongF(ma){ return function(x, i){
    var m = x.m && x.m.id ? x.m : null;
    return '<div class="dk-ten" onclick="xemThu(\'qd\',\''+ma+'\','+i+')"><b>'+(m ? ten(m) : coChuHTML(x.name||''))+'</b>'+
      '<small>'+coChuHTML(m ? duongThat(m, x.loai==='ka'?'ka':(x.loai==='cho'?'cho':'')) : duongThat(x, 'drive'))+'</small>'+
      (x.ly ? '<small class="ck-thieu">'+coChuHTML(Array.isArray(x.ly) ? 'thiếu '+x.ly.join(', ') : x.ly)+'</small>' : '')+'</div>';
  }; }
  h += '<div class="dk-tong">'+(QD.coDrive ? 'Đã xem '+g.files.length+' file, '+g.thuMuc.length+' thư mục trên Drive và dữ liệu trong app. '
      : '<b>Chưa nối Drive</b> — mới quét phần trong app. ')+(tong ? '<b>'+tong+'</b> mục cần xem.' : '<b>Không thấy gì bất thường.</b>')+'</div>';
  var chuaCM = k.thua.length + k.lac.length;
  if(chuaCM) h += '<div class="bot-canh" style="background:var(--vang-nen);border-color:var(--vang);color:var(--vang)">Có <b>'+chuaCM+'</b> file trên Drive chưa có chỉ mục — không phải rác. '+
    '<button class="nho" onclick="doiPhanDK(\'lcm\');lapChiMuc()">🗂 Lập chỉ mục ngay</button></div>';
  if(k.rong.length || k.gay.length || k.scanRong.length) h += '<div class="nhan-nhom">B. Không có dữ liệu</div>';
  h += nhom('rong','File rỗng / hỏng','0 byte, PDF không mở được, Excel trống, ảnh hỏng', k.rong, dongF('rong'));
  h += nhom('gay','Mục mất file','có trong tủ nhưng file trên Drive đã mất', k.gay, function(m, i){
    return '<div class="dk-ten"><b>'+ten(m)+'</b><small>'+coChuHTML(thuMucCua(m))+' · file không còn trên Drive</small></div>'; });
  h += nhom('scanRong','Bản scan / Chữ ký·CCCD không còn ảnh','không có ảnh trong máy và chưa lên Drive', k.scanRong, function(x){
    return '<div class="dk-ten"><b>'+(x.loai==='ka'?'🪪 ':'📑 ')+ten(x.m)+'</b><small>'+coChuHTML(ngayVN((x.m.ngay||'').slice(0,10)))+(x.m.may && x.m.may!==maMayCua()?' · quét ở máy khác':'')+'</small></div>'; });
  if(k.thieu.length) h += '<div class="nhan-nhom">C. Không đủ thông tin — nên Sửa, không cần bỏ</div>';
  h += nhom('thieu','Không đủ thông tin','bấm tên để xem · Sửa để khai thêm', k.thieu, function(x, i){
    var id = x.m.id, sua = x.loai==='scan' ? (x.m.che==='tailieu'?'scanTaiLieu':'themKhach') : (laBieuMau(x.m)?'suaBieuMau':'suaCho');
    return dongF('thieu')(x, i)+'<span class="qd-sua"><button class="nho" onclick="'+sua+'(\''+id+'\')">Sửa</button>'+
      (x.loai==='tu' && coTheDocLai(x.m) ? '<button class="nho" onclick="docLaiGoiY(\''+id+'\')">🔍 Đọc lại</button>' : '')+'</span>';
  }, mucThieu().length ? '<button class="nho" onclick="docLai()">🔍 Đọc lại tất cả mục thiếu ('+mucThieu().length+')</button>' : '');
  if(k.trung.length){
    h += '<div class="nhan-nhom">D. Trùng nội dung — chọn bản giữ, bản còn lại vào thùng rác</div>';
    h += k.trung.map(function(n, gi){
      return '<details class="dk-ngan" open><summary><b>Nhóm '+(gi+1)+'</b> <span>'+n.ds.length+' bản giống hệt nhau</span></summary>'+
        '<div class="dk-chan-ngan" style="justify-content:flex-start;border-top:0"><label class="dk-bat"><input type="checkbox" class="qd-trung" value="'+gi+'"> Dọn nhóm này</label></div>'+
        n.ds.map(function(m, j){
          return '<div class="dk-dong"><label class="dk-bat" title="Giữ bản này"><input type="radio" name="qdg-'+gi+'" value="'+m.id+'"'+(j===0?' checked':'')+'> Giữ</label>'+
            '<div class="dk-ten" onclick="xemThu(\'muc\',\''+m.id+'\')"><b>'+ten(m)+'</b><small>'+coChuHTML(duongThat(m))+
            (tenDungChuan(m)?' · tên đúng chuẩn':'')+'</small></div></div>';
        }).join('')+'</details>';
    }).join('');
  }
  if(k.trong.length){
    h += '<div class="nhan-nhom">E. Thư mục trống</div>';
    h += nhom('trong','Thư mục trống','không chứa gì — xóa luôn', k.trong, function(t){ return '<div class="dk-ten"><b>📁 '+coChuHTML(t.ten)+'</b><small>☁ '+coChuHTML(D.cauHinh.thumuc+' / '+t.duong)+'</small></div>'; });
  }
  if(tong) h += '<div class="rac-chan"><span>Mục đã tích → Thùng rác (khôi phục được) · thư mục trống → xóa</span>'+
    '<button class="nho xau" onclick="xuLyQuetDon()">Dọn mục đã tích</button></div>';
  return h;
}
function chonNhomQD(el, ma){
  Array.prototype.forEach.call(document.querySelectorAll('.qd-'+ma), function(c){ c.checked = el.checked; });
}
function xuLyQuetDon(){
  var k = QD.kq; if(!k) return;
  function chon(ma){ return Array.prototype.slice.call(document.querySelectorAll('.qd-'+ma+':checked')).map(function(c){ return +c.value; }); }
  var now = new Date().toISOString(), D2 = [], soTM = 0;
  function racTuFile(f, ly){
    if((D.rac||[]).some(function(m){ return m.driveId===f.id; })) return;
    var m = theoDrive(f.id); if(m){ D2.push(m.id); return; }
    D.rac = D.rac || [];
    D.rac.push({id:idMoi(), driveId:f.id, tenCu:f.name, tenMoi:f.name, duoi:duoiFile(f.name), co:+(f.size||0),
      nhom:'khac', khoCu:'vanBan', driveCha:(f.parents||[])[0]||'', xoaLuc:now, suaLuc:now, lyDoXoa:ly, choDB:true});
    D2.push(null);
  }
  chon('rong').forEach(function(i){ var f = k.rong[i]; if(f.m && f.m.id) D2.push(f.m.id); else racTuFile(f, 'Không có dữ liệu: '+f.ly); });
  chon('gay').forEach(function(i){ var m = k.gay[i]; m.driveMat = true; D2.push(m.id); });
  chon('scanRong').forEach(function(i){ D2.push(k.scanRong[i].m.id); });
  chon('thieu').forEach(function(i){ D2.push(k.thieu[i].m.id); });
  chon('trung').forEach(function(gi){
    var n = k.trung[gi], c = document.querySelector('input[name="qdg-'+gi+'"]:checked'), giu = c ? c.value : n.ds[0].id;
    var mGiu = n.ds.find(function(m){ return m.id===giu; });
    n.ds.forEach(function(m){
      if(m.id===giu) return;
      if(mGiu && m.driveId && m.driveId===mGiu.driveId){ delete m.driveId; delete m.choDB; }   /* cùng một file Drive → không dời mất file của bản giữ */
      D2.push(m.id);
    });
  });
  var ids = D2.filter(Boolean), soMoi = D2.length - ids.length;
  var n = ids.length ? chuyenVaoRac(ids, 'Quét rác') : 0;
  luu(); if(DR.sanSang) chayDongBoCho();
  var tm = chon('trong').map(function(i){ return k.trong[i]; });
  tm.reduce(function(p, t){ return p.then(function(){ return xoaFileDrive(t.id).then(function(){ soTM++; }).catch(function(){}); }); }, Promise.resolve())
  .then(function(){
    QD.kq = null; capNhatDemRac(); ve();
    var ghi = [];
    if(n+soMoi) ghi.push('đưa '+(n+soMoi)+' mục vào thùng rác');
    if(soTM) ghi.push('xóa '+soTM+' thư mục trống');
    if(!ghi.length) return bao('Chưa tích mục nào.', 3);
    baoHoanTac('Đã '+ghi.join(', ')+'.', function(){ if(ids.length) khoiPhucRac(ids); ve(); capNhatDemRac(); bao('Đã hoàn tác.', 3); }, 8);
  });
}
/* file lạc có nội dung → tải về, đọc như file mới, vào khay chờ; Duyệt thì app đổi tên và dời chính file đó (không tạo bản mới) */
function lapChiMucQD(ds, tuLCM){
  QUET.dung = false; batChay(true, 'Đang đưa file lạc vào khay chờ…', true);
  var xong = 0, trung = 0;
  ds.reduce(function(p, f){
    return p.then(function(){
      if(QUET.dung) return;
      dangLamChu('Đang đọc '+(xong+trung+1)+'/'+ds.length+' · '+f.name);
      return taiPDFDrive(f.id, f.mimeType).then(function(b){
        var n0 = D.cho.length;
        return xuLyMotFile(new File([b], f.name, {type:f.mimeType||b.type})).then(function(){
          var c = D.cho.length>n0 ? D.cho[D.cho.length-1] : null;
          if(c){ c.tuKhay = f.id; if((f.parents||[])[0]) c.tuKhayCha = f.parents[0]; c.tuKhayDuong = f.duong||'';
            c.canCu = (c.canCu||'')+(tuLCM ? ' · chưa rõ phần — nằm ở '+D.cauHinh.thumuc+(f.duong?' / '+f.duong:'') : ' · file lạc trong Tủ hồ sơ (quét rác)'); xong++; }
          else trung++;
        });
      }).catch(function(e){ console.warn('bỏ qua', f.name, e); });
    });
  }, Promise.resolve()).then(function(){
    tatChay(); luu();
    if(tuLCM){ if(DK.lcm) DK.lcm.khayXong = xong; ve(); bao('Đã đưa '+xong+' file chưa rõ phần vào khay chờ'+(trung?' · '+trung+' file trùng':'')+'. Mở Chờ khai để khai.', 8); return; }
    doiNgan(6);
    bao('Đã đưa '+xong+' file lạc vào khay chờ'+(trung?' · '+trung+' file trùng với mục đã có':'')+'. Xem tên đề xuất rồi bấm Duyệt.', 8);
  });
}
function theoDrive(driveId){
  return D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]).find(function(m){ return m.driveId===driveId; });
}
function moRac(){ moDonKho('rac'); }
/* ==========================================================
   3.50: 🧰 DỌN KHO — một nơi duy nhất (thay Bảo trì kho ở Cài đặt và Thư viện).
   Trang nằm ở cột trái (tab Văn bản) để cột phải XEM THỬ được; điện thoại mở toàn màn hình.
   🗑 Thùng rác (chia ngăn theo tab) · 🗂 Lập chỉ mục (không sót file) · 🧹 Quét rác (hỏng, rỗng, trùng, thiếu thông tin) · Khác
   ========================================================== */
var DK = {mo:false, phan:'rac', lcm:null, dong:{}};
var NGAN_RAC = [['vanBan','📄 Văn bản'],['duLieu','📊 Dữ liệu tháng'],['bieuMau','📋 Biểu mẫu'],['ghiChu','🖼 Thư viện · Ghi chú'],
                ['scan','🪪 Scan'],['kyAnh','✍ Chữ ký · CCCD'],['boHS','📁 Bộ hồ sơ'],['homNay','📅 Hôm nay'],['khac','📦 Khác (file lạc, trùng từ Quét rác)']];
function moDonKho(phan){
  DK.mo = true; if(phan) DK.phan = phan; CHO_KHAI = false;
  if(BOT.tab){ BOT = {tab:'', chon:{}}; document.body.classList.remove('dang-bot'); }
  if(document.getElementById('hop').classList.contains('hien') && !khoaHop) dongHop();
  if(nganHienTai!==1){ window.__giuDK = 1; doiNgan(1); window.__giuDK = 0; } else ve();
  try{ window.scrollTo(0, 0); }catch(e){}
  if(DK.phan==='rac') setTimeout(tuDonRac, 400);
}
function dongDonKho(){ DK.mo = false; ve(); }
function doiPhanDK(p){ DK.phan = p; ve(); if(p==='rac') setTimeout(tuDonRac, 200); }
function veDonKho(){
  var nRac = (D.rac||[]).length;
  var nav = [['rac','🗑 Thùng rác'+(nRac?' ('+nRac+')':'')],['lcm','🗂 Lập chỉ mục'],['quet','🧹 Quét rác'],['saoluu','🛟 Sao lưu'],['khac','⋯ Khác']];
  var h = '<div class="dk-dau"><button class="nho" onclick="dongDonKho()">‹ Về danh sách</button><b>🧰 Dọn kho</b>'+
    '<button class="nho" onclick="moHuongDan(\'donkho\')" title="Hướng dẫn phần này">❓</button></div>'+
    '<div class="dk-nav">'+nav.map(function(x){ return '<button class="'+(DK.phan===x[0]?'bat':'')+'" onclick="doiPhanDK(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>';
  var tong = D.vanBan.length+D.duLieu.length+D.ghiChu.length+(D.scan||[]).length+(D.bieuMau||[]).length+(D.kyAnh||[]).length;
  var chuaLen = [].concat(D.vanBan, D.duLieu, D.ghiChu, D.bieuMau||[], D.scan||[], D.kyAnh||[]).filter(function(m){ return m && !m.driveId; }).length;
  var khac = D.duLieu.filter(function(x){ return x.maLoai==='KHAC'; }).length;
  h += '<div class="tv-suckhoe"><span><b>'+tong+'</b> file trong kho</span>'+
    (!coTheNoiDrive() ? '<span class="vang">Chưa nối Drive</span>' : (chuaLen ? '<span class="vang"><b>'+chuaLen+'</b> chưa lên Drive</span>' : '<span class="luc">Đủ trên Drive</span>'))+
    (khac ? '<span class="vang"><b>'+khac+'</b> dữ liệu tháng chưa phân loại</span>' : '')+
    '<span>Chỉ mục đồng bộ: <b>'+(D.cauHinh.chiMucThoi ? coChuHTML(D.cauHinh.chiMucThoi.replace('T',' ').slice(0,16)) : 'chưa')+'</b></span></div>';
  if(DK.phan==='rac') h += veRacHTML();
  else if(DK.phan==='lcm') h += veLapChiMucHTML();
  else if(DK.phan==='quet') h += veQuetRacHTML();
  else if(DK.phan==='saoluu') h += veSaoLuuHTML();   /* 3.81 */
  else h += veKhacDKHTML();
  return h;
}
/* ---- ngăn của một mục trong thùng rác ---- */
function nganRac(m){
  if(m.khoCu==='homNay') return 'homNay';
  if(m.khoCu==='boHS') return 'boHS';
  if(m.khoCu==='scan' || m.che) return 'scan';
  if(m.khoCu==='kyAnh' || (/^ka/.test(m.id||'') && m.loai)) return 'kyAnh';
  if(m.nhom==='khac') return 'khac';
  return m.khoCu || khoCuaMuc(m);
}
/* chỗ cũ của mục (trước khi xóa) — để ghi "trước ở …" và khôi phục về đúng chỗ */
function noiCu(m){
  var c = Object.assign({}, m); delete c.xoaLuc;
  if(c.khoCu==='boHS') return 'Thư viện › Bộ hồ sơ ('+(c.file||[]).length+' file)';
  if(c.khoCu==='homNay') return 'Hôm nay › '+(c.ngay ? lcDMY(c.ngay) : '')+(c.nd ? ' · '+String(c.nd).slice(0,40) : '');
  if(c.khoCu==='scan' || c.che) return duongScan(c);
  if(c.khoCu==='kyAnh') return duongKA((c.ngay||'').slice(0,7));
  if(c.nhom==='khac') return '(không rõ — file lạc / trùng)';
  return thuMucCua(c);
}
/* 3.50: đường dẫn THẬT của một file — hiện dưới tên ở mọi danh sách */
function duongThat(m, loai){
  if(!m) return '';
  if(loai==='drive') return '☁ '+D.cauHinh.thumuc+(m.duong?' / '+m.duong:'');
  if(m.xoaLuc && m.khoCu==='homNay'){   /* 3.52: file ở Hôm nay giữ nguyên chỗ trên Drive tới khi xóa hẳn */
    var fs = nkFileCuaRac(m), len = fs.some(function(f){ return f.driveId; });
    return (len ? '☁ '+D.cauHinh.thumuc+' / Nhật ký / '+(m.ngay||'').slice(0,7) : '💻 Chỉ trong máy này')+' · trước ở: '+noiCu(m);
  }
  if(m.xoaLuc) return (m.driveId && !m.driveMat ? '☁ '+D.cauHinh.thumuc+' / _ThungRac' : '💻 Chỉ trong máy này')+' · trước ở: '+noiCu(m);
  if(loai==='cho') return '📥 Khay chờ — chưa vào tủ'+(m.tuKhay ? ' · file gốc ☁ '+(m.tuKhayDuong ? D.cauHinh.thumuc+' / '+m.tuKhayDuong : 'trên Drive (kho cũ)') : ' · 💻 file trong máy');
  var duong = m.che ? duongScan(m) : (loai==='ka' || (/^ka/.test(m.id||'') && m.loai)) ? duongKA((m.ngay||'').slice(0,7)) : thuMucCua(m);
  if(!m.driveId) return '💻 Chỉ trong máy này (chưa lên Drive) · sẽ lưu vào: '+duong;
  return '☁ '+duong+((m.choDB||m.canDay) ? ' · đang chờ dời / cập nhật' : '');
}
/* 3.50b: dòng "đang nằm ở đâu" dưới mỗi file (tab Scan, 📁 Chữ ký·CCCD) — bấm là mở thư mục trên Drive */
function duongDongHTML(k, loai){
  return '<div class="duong-dong" onclick="event.stopPropagation();moNoiLuu(\''+loai+'\',\''+k.id+'\')" title="Bấm để mở thư mục này trên Drive">'+
    coChuHTML(duongThat(k, loai==='ka'?'ka':''))+'</div>';
}
function moNoiLuu(loai, id){
  var k = loai==='ka' ? (D.kyAnh||[]).find(function(x){ return x.id===id; }) : timScan(id);
  if(!k) return;
  if(!k.driveId) return bao('Bản này mới nằm trong máy này — app tự đưa lên Drive khi có mạng (hoặc bấm ☁ Đồng bộ ngay).', 5);
  if(coCauNoi() && !laDT()) return cnHanh('thumuc', loai==='ka'?'ka':'scan', id);
  window.open(k.driveCha ? 'https://drive.google.com/drive/folders/'+k.driveCha : 'https://drive.google.com/file/d/'+k.driveId+'/view', '_blank');
}
function veRacHTML(){
  D.rac = D.rac || [];
  var ngan = {}, tongCo = 0;
  D.rac.forEach(function(m){ var k = nganRac(m); (ngan[k] = ngan[k]||[]).push(m); tongCo += (+m.co||0); });
  var tomTat = NGAN_RAC.filter(function(n){ return (ngan[n[0]]||[]).length; }).map(function(n){ return n[1].replace(/^\S+ /,'')+' '+ngan[n[0]].length; });
  var h = '<div class="dk-mo-ta">Mọi file anh xóa nằm ở đây, <b>lấy lại được</b> — khôi phục là về đúng tab, đúng thư mục cũ. '+
    'Muốn mất hẳn thì <b>Xóa hẳn</b>: file trên Drive vào thùng rác Google Drive (Google giữ thêm 30 ngày).</div>';
  h += '<div class="dk-tong">'+(D.rac.length ? '<b>'+D.rac.length+' file'+(tongCo?' · '+kichCo(tongCo):'')+'</b> — '+coChuHTML(tomTat.join(' · ')) : '<b>Thùng rác đang trống.</b>')+'</div>';
  h += '<div class="dk-hang"><label class="dk-bat"><input type="checkbox"'+(D.cauHinh.racTuXoa?' checked':'')+' onchange="datTuXoaRac(this.checked)"> '+
    'Tự xóa hẳn rác cũ hơn 30 ngày</label>'+
    (D.rac.length ? '<button class="nho xau" onclick="lamTrongRac()">Làm trống cả thùng</button>' : '')+'</div>';
  if(!D.rac.length) return h;
  h += '<div id="rac-ds" class="rac-ds">';
  NGAN_RAC.forEach(function(n){
    var ds = (ngan[n[0]]||[]).sort(function(a,b){ return (b.xoaLuc||'').localeCompare(a.xoaLuc||''); });
    if(!ds.length) return;
    var co = ds.reduce(function(a,m){ return a+(+m.co||0); }, 0);
    h += '<details class="dk-ngan"'+(DK.dong[n[0]]?'':' open')+' ontoggle="DK.dong[\''+n[0]+'\']=!this.open">'+
      '<summary><b>'+n[1]+'</b> <span>'+ds.length+' file'+(co?' · '+kichCo(co):'')+'</span></summary>'+
      ds.map(function(m){
        return '<div class="dk-dong"><input type="checkbox" class="rac-o" value="'+m.id+'" data-ngan="'+n[0]+'" data-luc="'+(m.xoaLuc||'')+'" onchange="demChonRac()">'+
          '<div class="dk-ten" onclick="xemThu(\'rac\',\''+m.id+'\')" title="Bấm để xem thử"><b>'+coChuHTML(m.tenMoi||m.ten||m.tenCu||'(chưa đặt tên)')+'</b>'+
          '<small>'+coChuHTML(duongThat(m))+'</small>'+
          '<small>Xóa '+ngayVN((m.xoaLuc||'').slice(0,10))+(m.co?' · '+kichCo(m.co):'')+(m.lyDoXoa?' · '+coChuHTML(m.lyDoXoa):'')+'</small></div>'+
          '<button class="nho" onclick="khoiPhucRac([\''+m.id+'\']);ve();capNhatDemRac();bao(\'Đã khôi phục về '+coChuHTML(n[1].replace(/^\S+ /,''))+'.\',3)">Khôi phục</button></div>';
      }).join('')+
      '<div class="dk-chan-ngan"><button class="nho" onclick="chonNganRac(\''+n[0]+'\')">Chọn cả ngăn</button>'+
        '<button class="nho xau" onclick="lamTrongNgan(\''+n[0]+'\')">Làm trống ngăn này</button></div></details>';
  });
  h += '</div><div class="rac-chan"><span id="rac-chon">Chưa chọn mục nào</span>'+
    '<button class="nho" onclick="var i=idChonRac();if(!i.length)return bao(\'Chưa chọn mục nào.\',3);khoiPhucRac(i);ve();capNhatDemRac();bao(\'Đã khôi phục \'+i.length+\' mục về đúng chỗ cũ.\',4)">Khôi phục đã chọn</button>'+
    '<button class="nho xau" onclick="xoaHanRac(idChonRac())">Xóa hẳn đã chọn</button></div>';
  return h;
}
function chonNganRac(k){ Array.prototype.forEach.call(document.querySelectorAll('.rac-o[data-ngan="'+k+'"]'), function(c){ c.checked = true; }); demChonRac(); }
function lamTrongNgan(k){
  var ids = (D.rac||[]).filter(function(m){ return nganRac(m)===k; }).map(function(m){ return m.id; });
  var ten = (NGAN_RAC.find(function(n){ return n[0]===k; })||[0,''])[1];
  xoaHanRac(ids, 'Làm trống ngăn '+ten.replace(/^\S+ /,''));
}
function lamTrongRac(){ xoaHanRac((D.rac||[]).map(function(m){ return m.id; }), 'Làm trống cả thùng rác'); }
function datTuXoaRac(v){
  D.cauHinh.racTuXoa = !!v; luu();
  bao(v ? 'Đã bật: rác cũ hơn 30 ngày tự xóa hẳn (lúc mở app, cần nối Drive với file có trên Drive).' : 'Đã tắt tự xóa rác.', 5);
  if(v) tuDonRac();
}
/* tự xóa hẳn rác quá 30 ngày (nếu anh bật) — lặng lẽ, file chỉ trong máy thì xóa luôn, file Drive cần nối Drive */
function tuDonRac(){
  if(!D.cauHinh.racTuXoa || TU_DON_RAC) return;
  var han = Date.now()-30*864e5, coDrive = coTheNoiDrive() && DR.sanSang && DR.online;
  var ids = (D.rac||[]).filter(function(m){
    return m.xoaLuc && new Date(m.xoaLuc).getTime() < han && (coDrive || !m.driveId || m.driveMat);
  }).map(function(m){ return m.id; });
  if(ids.length){ TU_DON_RAC = true; thucHienXoaHan(ids, true); }
}
var TU_DON_RAC = false;
/* ==========================================================
   3.77 — VĂN BẢN TRÙNG: cùng số hiệu (bỏ dấu, khoảng trắng, gạch) + cùng năm ban hành
   (trước chỉ bắt trùng khi nội dung file giống hệt từng byte → cùng văn bản tải 2 nguồn thì lọt)
   ========================================================== */
var TRUNG_SH = {};
function khoaTrungVB(m){
  var so = boDau(m && m.soHieu || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if(!so || !/\d/.test(so) || !/[A-Z]/.test(so)) return '';
  return so+'|'+String(m.ngay||'').slice(0, 4);
}
function tinhTrungSH(){
  var g = {}; TRUNG_SH = {};
  (D.vanBan||[]).forEach(function(m){ var k = khoaTrungVB(m); if(k) (g[k] = g[k] || []).push(m.id); });
  Object.keys(g).forEach(function(k){ if(g[k].length>1) g[k].forEach(function(id){ TRUNG_SH[id] = g[k]; }); });
  return TRUNG_SH;
}
function vbTrungVoi(m){
  var k = khoaTrungVB(m); if(!k) return [];
  return (D.vanBan||[]).filter(function(v){ return v.id!==m.id && khoaTrungVB(v)===k; });
}
/* hộp gộp: chọn bản giữ lại — bản kia gộp liên kết, tag, CT, sao, ghi chú sang rồi vào Thùng rác (hoàn tác được) */
var GOP_TRUNG = null;
function moGopTrung(id){
  tinhTrungSH();
  var ds = (TRUNG_SH[id]||[]).map(timMuc).filter(Boolean);
  if(ds.length<2) return bao('Văn bản này không còn bản trùng.', 3);
  var diem = function(m){ return (m.lienQuan||[]).length*3 + (m.tag||m.the||[]).length + (m.ctrinh||[]).length + (m.driveId?4:0) + (laSao(m)?2:0) + (m.tomTat?1:0) + (m.ghi?1:0); };
  var giu = ds.slice().sort(function(a, b){ return diem(b)-diem(a) || String(a.themLuc||a.taoLuc||'').localeCompare(String(b.themLuc||b.taoLuc||'')); })[0];
  GOP_TRUNG = {ids:ds.map(function(m){ return m.id; }), giu:giu.id};
  moHop('<div class="hop-tit">Gộp văn bản trùng · '+coChuHTML(ds[0].soHieu||'')+'</div>'+
    '<div class="hop-phu">'+ds.length+' bản cùng số hiệu, cùng năm. Chọn <b>bản giữ lại</b> — các bản kia gộp hết <b>văn bản liên quan, tag, CT vay, mảng, ⭐, ghi chú</b> sang bản giữ, rồi vào <b>Thùng rác</b> (lấy lại được 30 ngày).</div>'+
    '<div class="gop-ds">'+ds.map(function(m){
      var lq = lqCua(m);
      return '<label class="gop-dong"><input type="radio" name="gop-giu" value="'+m.id+'"'+(m.id===giu.id?' checked':'')+' onchange="GOP_TRUNG.giu=this.value">'+
        '<span class="gop-nd"><b>'+coChuHTML(m.tenMoi||m.tenCu||'')+'</b>'+
        '<small>'+[m.themLuc||m.taoLuc ? 'thêm '+ngayVN(String(m.themLuc||m.taoLuc).slice(0,10)) : '', m.co ? kichCo(m.co) : '', m.driveId ? '☁ có trên Drive' : '💻 chỉ trong máy',
          lq.length ? '🔗 '+lq.map(function(v){ return v.soHieu || tenNganVB(v); }).join(', ') : 'chưa có liên quan',
          (m.tag||m.the||[]).length ? '🏷 '+(m.tag||m.the).join(', ') : '', laSao(m) ? '⭐' : ''].filter(Boolean).map(coChuHTML).join(' · ')+'</small></span>'+
        '<button type="button" class="nho sg-ico" onclick="event.preventDefault();xemBanTrung(\''+m.id+'\')" title="Xem bản này ở khung bên phải">↗ Xem</button></label>';
    }).join('')+'</div>'+
    '<div class="day-form"><button class="nho" onclick="dongHop()">Đóng (Esc)</button>'+
    '<button class="nho chinh" onclick="gopTrung()">Gộp, giữ bản đã chọn</button></div>');
}
function xemBanTrung(id){ dongHop(); chonDong(id); baoNut('Đang xem 1 bản trùng.', 'Mở lại hộp gộp', function(){ moGopTrung(id); }); }
function gopTrung(){
  if(!GOP_TRUNG) return;
  var giu = timMuc(GOP_TRUNG.giu); if(!giu) return;
  var bo = GOP_TRUNG.ids.filter(function(x){ return x!==giu.id; }).map(timMuc).filter(Boolean);
  var now = new Date().toISOString(), hop = function(a, b){ (b||[]).forEach(function(x){ if(x && a.indexOf(x)<0) a.push(x); }); return a; };
  bo.forEach(function(b){
    (b.lienQuan||[]).slice().forEach(function(id2){ var v = timMuc(id2); if(v) lqGo(b, v, now); if(v && v.id!==giu.id) lqNoi(giu, v, now); });
    if((b.tag||[]).length) giu.tag = hop(giu.tag||[], b.tag);
    if((b.the||[]).length) giu.the = hop(giu.the||[], b.the);
    if((b.ctrinh||[]).length) giu.ctrinh = hop(giu.ctrinh||[], b.ctrinh);
    if(!giu.mang && b.mang) giu.mang = b.mang;
    if(!giu.loai && b.loai) giu.loai = b.loai;
    if(!giu.trichYeu && b.trichYeu) giu.trichYeu = b.trichYeu;
    if((b.tomTat||'').length > (giu.tomTat||'').length) giu.tomTat = b.tomTat;
    if(b.ghi && (giu.ghi||'').indexOf(b.ghi)<0) giu.ghi = (giu.ghi ? giu.ghi+' · ' : '')+b.ghi;
    if(laSao(b) && !laSao(giu)) giu.sao = true;
  });
  giu.suaLuc = now; GOP_TRUNG = null;
  luu(); dongHop();
  xoaNhieuVaoRac(bo.map(function(b){ return b.id; }), function(){ tinhTrungSH(); });
  bao('Đã gộp '+(bo.length+1)+' bản trùng — giữ: '+(giu.tenMoi||giu.soHieu||''), 5);
}
/* khi lưu file mới (khay chờ) trùng số hiệu + năm với văn bản đã có → hỏi */
function hoiTrungVB(m0, tr){
  moHop('<div class="hop-tit">⚠ Văn bản này đã có trong tủ</div>'+
    '<div class="hop-phu">File mới <b>'+coChuHTML(m0.tenMoi||m0.tenCu||'')+'</b> cùng số hiệu <b>'+coChuHTML(m0.soHieu||'')+'</b>, cùng năm với:</div>'+
    '<div class="gop-ds">'+tr.map(function(v){ return '<div class="gop-dong"><span class="gop-nd"><b>'+coChuHTML(v.tenMoi||v.tenCu||'')+'</b><small>'+
      coChuHTML([v.driveId?'☁ có trên Drive':'💻 chỉ trong máy', lqCua(v).length ? '🔗 '+lqCua(v).length+' văn bản liên quan' : ''].filter(Boolean).join(' · '))+'</small></span></div>'; }).join('')+'</div>'+
    '<div class="day-form">'+
      '<button class="nho" onclick="dongHop();boCho(\''+m0.id+'\')" title="Không đưa file mới vào tủ">Bỏ file mới</button>'+
      '<button class="nho" onclick="dongHop();var c=(D.cho||[]).find(function(x){return x.id===\''+m0.id+'\'});if(c){c.xacNhanTrung=true;duyet(c.id);}" title="Lưu cả 2 bản (ví dụ 2 bản khác nhau thật)">Giữ cả 2</button>'+
      '<button class="nho chinh" onclick="dongHop();luuRoiGop(\''+m0.id+'\')" title="Lưu file mới rồi mở hộp gộp để chọn bản giữ lại">Lưu rồi gộp</button></div>');
}
function luuRoiGop(id){
  var c = (D.cho||[]).find(function(x){ return x.id===id; }); if(!c) return;
  c.xacNhanTrung = true; duyet(id);
  setTimeout(function(){ if(timMuc(id)) moGopTrung(id); }, 300);
}

/* ---- DÒNG VĂN BẢN GỌN 2 HÀNG ---- */
function dongHTML(m, q){
  var laBM = m.huongDan!==undefined;
  var ico = m.nhom==='ghiChu' ? '🖼' : (m.nhom==='duLieu' ? '📊' : (laBM ? '📄' : '📄'));
  var ten = m.tenMoi || m.tenCu || m.ten || '';
  var phu = m.nhom==='duLieu' ? (m.tenLoai||'') :
            (m.nhom==='ghiChu' ? (m.moTa||'') : (m.trichYeu||m.tenVB||''));
  /* 3.61 (anh chốt): chữ mờ sau tên chỉ hiện khi KHÁC tên — trích yếu đã nằm trong tên chuẩn thì bỏ (rê chuột vẫn thấy đủ) */
  var soTen = function(x){ return boDau(String(x||'')).toLowerCase().replace(/[^a-z0-9]/g,''); };
  var phuDu = phu;
  if(phu && (soTen(ten).indexOf(soTen(phu).slice(0,40))>=0 || soTen(phu).indexOf(soTen(ten.replace(/\.[^.]+$/,'')).slice(0,40))>=0)) phu = '';

  /* 3.32: bớt nhãn thừa — ngày/kỳ đã nằm trong tên file thì không lặp lại; bỏ nhãn "Drive" trên mọi dòng;
     các cảnh báo thiếu phân loại gộp thành MỘT nhãn */
  var the = [];
  var coTrongTen = function(iso){ return iso && (ten.indexOf(iso)>=0 || ten.indexOf(String(iso).replace(/-/g,'_'))>=0); };
  if(m.nhom==='duLieu'){
    if(!coTrongTen(m.ky)) the.push(['xam', kyVN(m.ky)]);
    if(m.maLoai==='KHAC') the.push(['phu','Chưa phân loại']);
  }else if(m.nhom==='ghiChu'){
    if(!coTrongTen(m.ngay)) the.push(['xam', ngayVN(m.ngay)]);
    (m.the||[]).forEach(function(t){ the.push(['', t]); });
  }else if(laBM){
    if(m.soHieu) the.push(['', m.soHieu]);
    the.push(['xam', m.nhom||'']);
    if(m.huongDan) the.push(['phu','Bản mẫu đã điền']);
  }else{
    if(m.ngay && !coTrongTen(m.ngay)) the.push(['xam', ngayVN(m.ngay)]);   /* 3.77: không ngày thì không hiện chip rỗng */
    if(m.mang) the.push(['ct', m.mang]);
    (m.ctrinh||[]).slice(0,1).forEach(function(t){ the.push(['ct', hienCT(t)]); });
    (m.tag||m.the||[]).slice(0,2).forEach(function(t){ the.push(['', t]); });
    if(TRUNG_SH[m.id]) the.unshift(['trung', '', '<a onclick="event.stopPropagation();moGopTrung(\''+m.id+'\')" title="Văn bản này có '+(TRUNG_SH[m.id].length-1)+' bản khác cùng số hiệu, cùng năm — bấm để so và gộp">⚠ trùng '+(TRUNG_SH[m.id].length-1)+' bản</a>']);   /* 3.77 */
    var dsLQ = lqCua(m).sort(function(a, b){ return (a.ngay||'').localeCompare(b.ngay||''); });   /* 3.70 (AM): hiện số hiệu, bấm đi tới */
    if(dsLQ.length) the.push(['ct lq-tg', '', '🔗 '+dsLQ.slice(0, 2).map(function(v){
      return '<a class="lq-lk" onclick="event.stopPropagation();diToiVB(\''+v.id+'\')" title="'+coChuHTML(tenNganVB(v)+(v.ngay?' · '+ngayVN(v.ngay):'')+(v.hetHieuLuc?' · hết hiệu lực':'')+' — bấm để đi tới')+'">'+
        coChuHTML(v.soHieu || (v.tenVB||v.trichYeu||v.tenMoi||'').slice(0, 24))+'</a>'; }).join(' · ')+
      (dsLQ.length>2 ? ' <small title="'+coChuHTML(dsLQ.slice(2).map(tenNganVB).join('\n'))+'">+'+(dsLQ.length-2)+'</small>' : '')]);
    if(m.hetHieuLuc) the.push(['phu','Hết hiệu lực']);
    var cpl = chuaPhanLoai(m).map(function(t){ return t.replace(/^Chưa có /,''); });
    if(cpl.length) the.push(['canh','⚠ Thiếu '+cpl.join(', ')]);
  }
  if(m.chiMucThoi) the.push(['xam','Chưa tải về máy']);

  return '<div class="d2'+(m.hetHieuLuc?' mo':'')+(CON_ID[m.id]?' con':'')+(mucDangXem&&mucDangXem.id===m.id?' chon':'')+
    '"'+botAt(m.id)+' onclick="chonDong(\'' +m.id+ '\')">'+
    '<div class="h1">'+(laBM||m.nhom==='vanBan'?saoHTML(m):'')+'<span class="ico">'+ico+'</span>'+
      '<span class="ten" title="'+coChuHTML(ten)+'">'+toSang(ten, q)+'</span>'+
      (phu?'<span class="ty">'+toSang(phu, q)+'</span>':'')+'</div>'+
    '<div class="h2"><div class="the">'+
      the.map(function(t){ return '<span class="tg '+t[0]+'">'+(t[2] || coChuHTML(t[1]))+'</span>'; }).join('')+
    '</div><div class="nut">'+
      (coCauNoi() && !laDT() ? '<button onclick="event.stopPropagation();chepMot(\'' +m.id+ '\')" title="Chép file — Ctrl+V vào Zalo / email / thư mục">📋</button>' : '')+   /* 3.106 */
      '<button onclick="event.stopPropagation();'+
        (laBM?'suaBieuMau':'suaCho')+'(\'' +m.id+ '\')" title="Sửa">✎</button>'+
      '<button onclick="event.stopPropagation();xoaVaoRac(\'' +m.id+ '\')" title="Xóa vào thùng rác">🗑</button>'+
      '<button onclick="moMenu(event,\'' +m.id+ '\')" title="Thêm lệnh">⋯</button>'+
    '</div></div></div>';
}

/* bấm một dòng: máy tính thì hiện bên phải, điện thoại thì mở lớn */
function xoaPreview(){
  mucDangXem = null; trangChon = {};
  XEM.phai.pdf = null; XEM.phai.m = null;
  var a = document.getElementById('cp-ten'), b = document.getElementById('cp-phu'),
      c = document.getElementById('cp-than'), d = document.getElementById('cp-dk');
  if(a) a.textContent = 'Chưa chọn mục nào';
  var cpx = document.getElementById('cotphai'); if(cpx) cpx.classList.add('pv-trong');
  if(b) b.textContent = 'Bấm một mục bên trái để xem nội dung tại đây';
  if(c) c.innerHTML = '';
  if(d) d.innerHTML = '';
  var g = document.getElementById('cp-guitrang'); if(g) g.style.display = 'none';
  veNutCN(null);
}

/* 3.70 (AM): đi tới văn bản liên quan — nhớ văn bản vừa xem để ‹ Quay lại */
var XEM_LS = [];
function diToiVB(id){
  var v = timMuc(id); if(!v) return bao('Văn bản này không còn trong tủ.', 3);
  if(mucDangXem && mucDangXem.id!==id){ XEM_LS.push(mucDangXem.id); if(XEM_LS.length>20) XEM_LS.shift(); }
  moVBLienQuan(id);
}
function quayLaiVB(){
  var id; while(XEM_LS.length && !(id && timMuc(id))) id = XEM_LS.pop();
  if(id && timMuc(id)) moVBLienQuan(id);
}
function moVBLienQuan(id){
  chonDong(id);
  var hang = document.querySelector('.d2[onclick^="chonDong(\''+id+'\')"]');
  if(hang && hang.offsetParent){ if(hang.scrollIntoView) hang.scrollIntoView({block:'nearest', behavior:'smooth'}); }
  else if(nganHienTai===1) baoNut('Văn bản này đang bị hàng lọc / ô tìm ẩn khỏi danh sách — vẫn mở ở khung xem.', 'Bỏ lọc', function(){ boLoc('vanBan'); setTimeout(function(){ moVBLienQuan(id); }, 50); });
}
/* báo kèm 1 nút tùy ý (giống Hoàn tác) */
function baoNut(t, nhan, ham){
  var e = document.getElementById('bao'); BAO_HT = ham;
  e.innerHTML = coChuHTML(t)+' <button class="bao-ht" onclick="event.stopPropagation();var h=BAO_HT;BAO_HT=null;document.getElementById(\'bao\').classList.remove(\'hien\');if(h)h()">'+coChuHTML(nhan)+'</button>';
  e.classList.add('hien'); e.classList.toggle('goc', window.innerWidth>=700);
  clearTimeout(tBao); tBao = setTimeout(function(){ e.classList.remove('hien'); BAO_HT = null; }, 6000);
}
function chonDong(id){
  var cp = document.getElementById('cotphai');
  if(cp && cp.offsetParent && !anPV){ xemBenPhai(id); }
  else moXem(id);
}
function xemBenPhai(id){
  var m = timMuc(id); if(!m) return;
  mucDangXem = m;
  var cpx = document.getElementById('cotphai'); if(cpx) cpx.classList.remove('pv-trong');
  trangChon = {};
  veNoiDung(m, 'phai');   /* 3.51: bắt đầu mở file NGAY, việc phụ làm sau */
  document.getElementById('cp-ten').textContent = m.tenMoi||m.tenCu||m.ten||'';
  document.getElementById('cp-phu').innerHTML = coChuHTML(
    ['📁 '+thuMucCua(m), m.soTrang?(m.soTrang+' trang'):'', m.co?kichCo(m.co):'']
    .filter(Boolean).join(' · ')) + lienQuanHTML(m) + boCuaFileHTML(m.id);
  veNutCN(m);
  /* chỉ đổi dòng được chọn — trước vẽ lại cả danh sách mỗi lần bấm */
  Array.prototype.forEach.call(document.querySelectorAll('.d2.chon[onclick^="chonDong("]'), function(e){ e.classList.remove('chon'); });
  Array.prototype.forEach.call(document.querySelectorAll('.d2[onclick^="chonDong(\''+id+'\')"]'), function(e){ e.classList.add('chon'); });
  D.ganDay = [id].concat(D.ganDay.filter(function(x){ return x!==id; })).slice(0,8);
  clearTimeout(xemBenPhai.hen); xemBenPhai.hen = setTimeout(luu, 1500);
}
var anPV = false;
/* 3.12: khung xem nhanh nhớ riêng từng tab. Hôm nay mặc định TẮT nhưng vẫn bật được */
/* tên tab riêng cho khung xem: tenTab() gom Hôm nay vào 'vanBan' để dùng chung bộ lọc/tag — không sửa hàm đó */
function tenTabPV(){
  return ['homNay','vanBan','duLieu','ghiChu','scan','bieuMau','vanBan','soLieu'][nganHienTai] || 'vanBan';
}
function anPVMacDinh(tab){ return tab==='homNay' || tab==='soLieu'; }
function anPVCua(tab){
  var b = (D.cauHinh.anPVTab||{})[tab];
  return (b===undefined) ? anPVMacDinh(tab) : !!b;
}
function datAnPV(tab, an){
  D.cauHinh.anPVTab = D.cauHinh.anPVTab || {};
  D.cauHinh.anPVTab[tab] = !!an; luu();
}
function apAnPV(){
  anPV = anPVCua(tenTabPV());
  apRongCot();
  var t = document.querySelector('.than');
  if(t){
    t.classList.toggle('an-preview', anPV);
    t.classList.toggle('ban-lv', nganHienTai===0 && anPV);   /* bàn làm việc chỉ dàn 2 ô khi đã tắt khung xem */
  }
  var b = document.getElementById('btn-mo-preview');
  if(b) b.style.display = anPV ? '' : 'none';
}
/* tự kiểm tra và sửa khung xem — dùng khi anh thấy "mất" khung xem bên phải */
function kiemTraKhungXem(){
  var rong = window.innerWidth, t = document.querySelector('.than'), a = document.querySelector('.cot-phai');
  var loi = [];
  if(rong < 900) loi.push('Cửa sổ chỉ rộng '+rong+'px (dưới 900) nên app chuyển sang bố cục điện thoại — khung xem bên phải không hiện. '+
    'Phóng to cửa sổ, hoặc giảm mức phóng của trình duyệt (Ctrl + dấu trừ).');
  ['rongTrai','rongPhai'].forEach(function(k){
    var v = parseFloat(D.cauHinh[k]);
    if(D.cauHinh[k]!==undefined && (!isFinite(v) || v<0.62 || v>2.4)){ delete D.cauHinh[k]; loi.push('Độ rộng cột bị kéo hỏng → đã đặt lại.'); }
  });
  ['--rong-trai','--rong-phai','--rong-pv'].forEach(function(k){
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(k));
    if(isFinite(v) && (v<0.62 || v>2.4)){ document.documentElement.style.removeProperty(k); loi.push('Độ rộng cột đang áp bị lệch → đã bỏ.'); }
  });
  if(anPVCua(tenTabPV())){ datAnPV(tenTabPV(), false); loi.push('Tab này đang tắt khung xem → đã bật lại.'); }
  if(D.cauHinh.anPV!==undefined){ delete D.cauHinh.anPV; loi.push('Còn cờ ẩn khung xem đời cũ → đã bỏ.'); }
  luu(); apAnPV(); ve();
  setTimeout(function(){
    var an = a ? getComputedStyle(a).display==='none' : true;
    var kq = 'Cửa sổ rộng '+rong+'px · khung xem hiện đang '+(an?'KHÔNG hiện':'HIỆN')+'.';
    if(loi.length) kq += ' Đã sửa: '+loi.join(' ');
    else if(!an) kq += ' Mọi thứ bình thường.';
    moHop('<div class="hop-tit">Kiểm tra khung xem</div><div class="hop-phu">'+coChuHTML(kq)+'</div>'+
      '<div class="huong-dan">Khung xem chỉ hiện khi cửa sổ rộng từ 900px. Bấm nút <b>▣</b> trên thanh danh sách để bật/tắt cho từng tab.</div>'+
      '<div class="hang-nut"><button class="nho" onclick="datLaiBoCuc();dongHop()">Đặt lại toàn bộ bố cục</button>'+
      '<button class="nho chinh" onclick="dongHop()">Xong</button></div>');
  }, 80);
}
/* dòng tự chẩn đoán: vì sao khung xem không hiện */
/* 3.15: độ rộng cột phải có đơn vị 'fr'. Số trần (vd "1.35") làm CSS bỏ cả quy tắc chia cột
   → danh sách, thanh kéo và khung xem xếp chồng dọc (khung xem "biến mất") */
/* 3.30: danh mục lưu trong máy từ bản cũ sẽ THIẾU loại mới thêm sau này —
   bổ sung theo mã, giữ nguyên mọi thứ anh đã tự sửa */
/* 3.31: sửa 2 lỗi của bản 3.30
   - báo cáo anh đã chủ động bỏ (ghi trong maDaBo) thì KHÔNG thêm lại
   - mẫu có sẵn nhưng mất cờ (theoNgay, thuanXLS…) do lỗi lưu cài đặt cũ → điền lại cờ còn trống, không ghi đè cờ anh đã chỉnh */
var CO_MAU = ['theoNgay','gopPGD','coExcel','thuanXLS','chuKy','cap'];
function nangCapDanhMuc(){
  var goc = (MAC_DINH && MAC_DINH.mauBaoCao) || [];
  var co = D.cauHinh.mauBaoCao || [];
  /* 3.39: nhãn Ghi chú trước có 2 danh sách (nhanGhiChu lúc sửa, tag tab Ghi chú lúc lọc) — gộp MỘT lần vào tag tab Ghi chú */
  if(!D.cauHinh.nhanGCDaGop){
    D.cauHinh.nhanGCDaGop = true;
    var tg = dsTag('ghiChu');
    (D.cauHinh.nhanGhiChu||[]).forEach(function(x){ if(x && tg.indexOf(x)<0) tg.push(x); });
    luu();
  }
  /* 3.71: bổ sung chương trình đang cho vay còn thiếu (NCHXAPT — QĐ 22/2023/QĐ-TTg) — MỘT lần, chỉ thêm, không sửa mục đã có */
  if(!D.cauHinh.ctNCHXAPT){
    D.cauHinh.ctNCHXAPT = true;
    D.cauHinh.chuongTrinh = D.cauHinh.chuongTrinh || [];
    if(D.cauHinh.chuongTrinh.indexOf('NCHXAPT')<0) D.cauHinh.chuongTrinh.push('NCHXAPT');
    D.cauHinh.ctTen = D.cauHinh.ctTen || {};
    if(!D.cauHinh.ctTen.NCHXAPT) D.cauHinh.ctTen.NCHXAPT = 'Cho vay người chấp hành xong án phạt tù';
    luu();
  }
  /* 3.34: số liệu họp giao ban chia theo điểm giao dịch (anh Nhân chốt) — chuyển MỘT lần, sau đó anh tự chỉnh bằng nút ⚙ */
  if(!D.cauHinh.slgbDaDoi){
    D.cauHinh.slgbDaDoi = true;
    var sg = co.find(function(x){ return x.ma==='SL_GB'; });
    if(sg){ sg.thuanXLS = false; sg.cap = ['diem']; }
    luu();
  }
  /* 3.106 (anh chốt): dọn dữ liệu rác không còn chức năng dùng — lịch sử / nhật ký / "đã lập phiếu" KTGS (bỏ từ 3.98), ô Đoàn kiểm tra ở bảng Hội – xã.
     Chạy mỗi lần mở (không cờ) để bản cũ trên Drive gộp lại vẫn bị dọn; bản dự phòng đầu ngày (3.81) vẫn giữ để khôi phục nếu cần */
  (function(){ var ch = D.cauHinh, doi = false;
    ['ktgsLS', 'ktgsNK', 'ktgsGN'].forEach(function(k){ if(ch[k]!==undefined){ delete ch[k]; doi = true; } });
    Object.keys(ch.ktHoiKB || {}).forEach(function(k){ var x = ch.ktHoiKB[k]; if(x && x.doan!==undefined){ delete x.doan; doi = true; if(!Object.keys(x).length) delete ch.ktHoiKB[k]; } });
    if(ch.ktKBLuu && ch.ktKBLuu.doan!==undefined){ delete ch.ktKBLuu.doan; doi = true; }   /* 3.107: Mẫu 16 "Đoàn kiểm tra" = tên Hội cấp xã của tổ, bỏ ô khai */
    if(doi) luu();
  })();
  if(!goc.length) return 0;
  if(!co.length && !(D.cauHinh.maDaBo||[]).length){ D.cauHinh.mauBaoCao = JSON.parse(JSON.stringify(goc)); luu(); return 0; }
  var daBo = D.cauHinh.maDaBo || [], ma = {}, doi = false;
  co.forEach(function(x){ ma[x.ma] = x; });
  goc.forEach(function(g){
    var x = ma[g.ma]; if(!x) return;
    CO_MAU.forEach(function(k){
      if(x[k]===undefined && g[k]!==undefined){ x[k] = JSON.parse(JSON.stringify(g[k])); doi = true; }
    });
  });
  var them = goc.filter(function(x){ return !ma[x.ma] && daBo.indexOf(x.ma)<0; });
  if(!them.length){ if(doi) luu(); return 0; }
  D.cauHinh.mauBaoCao = co.concat(them.map(function(x){ return JSON.parse(JSON.stringify(x)); }));
  luu();
  setTimeout(function(){
    bao('Đã bổ sung '+them.length+' loại báo cáo mới vào danh mục: '+
      them.slice(0,4).map(function(x){ return x.ten; }).join(' · ')+(them.length>4?'…':''), 8);
  }, 900);
  return them.length;
}
/* ghi nhớ mã báo cáo anh đã bỏ khỏi danh mục, để nangCapDanhMuc không thêm lại */
function ghiMaDaBo(ds){
  var d = D.cauHinh.maDaBo = D.cauHinh.maDaBo || [];
  (ds||[]).forEach(function(m){ if(m && d.indexOf(m)<0) d.push(m); });
}
function boMaDaBo(ds){
  D.cauHinh.maDaBo = (D.cauHinh.maDaBo||[]).filter(function(m){ return (ds||[]).indexOf(m)<0; });
}
/* dựng lại danh mục từ ô chữ / Excel mà KHÔNG làm mất thuộc tính khác của mẫu cũ (theoNgay, thuanXLS, coExcel, an…)
   mục nào không ghi cấp áp dụng (Excel) thì giữ cấp cũ */
function gopMauBaoCao(dsMoi){
  var cu = D.cauHinh.mauBaoCao || [], theoMa = {};
  cu.forEach(function(x){ theoMa[x.ma] = x; });
  var ra = dsMoi.map(function(m){ return Object.assign({}, theoMa[m.ma]||{}, m); });
  var coMoi = ra.map(function(x){ return x.ma; });
  ghiMaDaBo(cu.map(function(x){ return x.ma; }).filter(function(m){ return coMoi.indexOf(m)<0; }));
  boMaDaBo(coMoi);
  return ra;
}
/* 3.39: độ rộng 2 cột nhớ RIÊNG từng tab (tỉ lệ trái/phải, phải = 1).
   Mặc định danh sách 60% · khung xem 40%; tab Tháng 65/35 để ma trận rộng. Khung xem luôn cố định, không thu lại. */
var RONG_MD = {duLieu:1.85};
function tiLeCot(tab){
  var v = parseFloat((D.cauHinh.rongTab||{})[tab]);
  return (isFinite(v) && v>=0.5 && v<=3) ? v : (RONG_MD[tab] || 1.5);
}
function apRongCot(){
  var r = document.documentElement.style;
  r.setProperty('--rong-trai', tiLeCot(tenTabPV())+'fr');
  r.setProperty('--rong-phai', '1fr');
}
function suaRongCot(){
  var doi = false;
  /* 3.39: bỏ độ rộng chung đời cũ một lần — chuyển sang mặc định mới 60/40 theo từng tab (anh Nhân chốt khung xem vừa đủ) */
  if(!D.cauHinh.rong339){ delete D.cauHinh.rongTrai; delete D.cauHinh.rongPhai; D.cauHinh.rong339 = true; doi = true; }
  ['rongTrai','rongPhai'].forEach(function(k){
    var v0 = D.cauHinh[k];
    if(v0===undefined) return;
    var v = parseFloat(v0);
    if(!isFinite(v) || v<0.62 || v>2.4){ delete D.cauHinh[k]; doi = true; return; }
    var chuan = v+'fr';
    if(String(v0).trim()!==chuan){ D.cauHinh[k] = chuan; doi = true; }
  });
  if(doi) luu();
  return doi;
}
function chanDoanBoCuc(){
  var w = window.innerWidth, ds = [];
  ds.push('Bề ngang cửa sổ: <b>'+w+'px</b>');
  ds.push(w>=900 ? 'khung xem nằm <b>bên phải</b>'
        : (w>=760 ? 'cửa sổ hẹp — khung xem nằm <b>dưới danh sách</b>'
                  : '<b>quá hẹp (dưới 760px)</b> — app chạy kiểu điện thoại, khung xem tắt; bấm Ctrl và dấu trừ để thu nhỏ, hoặc mở rộng cửa sổ'));
  ds.push('Tab này: khung xem đang <b>'+(anPVCua(tenTabPV())?'TẮT — bấm ▣ để bật':'BẬT')+'</b>');
  var tl = (D.cauHinh.rongTab||{})[tenTabPV()];
  ds.push('Độ rộng tab này: '+(tl ? 'đã kéo (trái/phải = '+tl+')' : 'mặc định'));
  return ds.join(' · ');
}
function datLaiBoCuc(){
  ['rongTrai','rongPhai','rongPV','anPV','anPVTab','rongTab'].forEach(function(k){ delete D.cauHinh[k]; });
  ['--rong-trai','--rong-phai','--rong-pv'].forEach(function(k){ document.documentElement.style.removeProperty(k); });
  luu(); apAnPV(); ve();
  bao('Đã đặt lại bố cục: độ rộng 2 cột và khung xem nhanh về mặc định.', 5);
}
function batTatPV(){
  var tab = tenTabPV(), an = !anPVCua(tab);
  datAnPV(tab, an); apAnPV();
  if(!an && mucDangXem) xemBenPhai(mucDangXem.id);
  ve();
  bao((an ? 'Đã tắt khung xem nhanh ở tab này. Bấm ▣ để bật lại.' : 'Đã bật khung xem nhanh ở tab này.')+
    ' · '+chanDoanBoCuc().replace(/<[^>]+>/g,''), 7);
}
/* kéo mép trái khung xem để chỉnh rộng hẹp */
function ganKeoRong(){
  var k = document.getElementById('keorong');
  if(!k || k.dataset.gan) return;
  k.dataset.gan = '1';
  var dangKeo = false;
  function batDau(e){
    dangKeo = true;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    e.preventDefault();
  }
  function keo(e){
    if(!dangKeo) return;
    var x = (e.touches ? e.touches[0].clientX : e.clientX);
    var than = document.querySelector('.than');
    var r = than.getBoundingClientRect();
    var rong = Math.max(320, Math.min(r.right - r.left - 360, r.right - x));
    document.documentElement.style.setProperty('--rong-pv', rong+'px');
  }
  function xong(){
    if(!dangKeo) return;
    dangKeo = false;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    var v = getComputedStyle(document.documentElement).getPropertyValue('--rong-pv');
    if(v){ D.cauHinh.rongPV = v.trim(); luu(); }
    if(XEM.phai.pdf) veTrang('phai');
  }
  k.addEventListener('mousedown', batDau);
  k.addEventListener('touchstart', batDau, {passive:false});
  document.addEventListener('mousemove', keo);
  document.addEventListener('touchmove', keo, {passive:false});
  document.addEventListener('mouseup', xong);
  document.addEventListener('touchend', xong);
  /* bấm đúp để trả về mặc định */
  k.addEventListener('dblclick', function(){
    document.documentElement.style.removeProperty('--rong-pv');
    delete D.cauHinh.rongPV; luu();
    if(XEM.phai.pdf) veTrang('phai');
  });
}

/* kéo vạch giữa để chỉnh rộng hai cột */
function ganKeoCot(){
  var v = document.getElementById('keocot');
  if(!v || v.dataset.gan) return;
  v.dataset.gan = '1';
  var dang = false, x0 = 0, t0 = 1.0, p0 = 1.25;
  function batDau(x){
    dang = true; x0 = x;
    var cs = getComputedStyle(document.documentElement);
    t0 = parseFloat(cs.getPropertyValue('--rong-trai')) || 1.5;
    p0 = parseFloat(cs.getPropertyValue('--rong-phai')) || 1;
    document.body.style.userSelect = 'none';
  }
  function keo(x){
    if(!dang) return;
    var dx = (x - x0) / Math.max(400, window.innerWidth) * 2.2;
    /* 3.12: chặn kéo quá tay — mỗi cột giữ trong khoảng 30%..70% */
    var t = Math.max(.62, Math.min(2.4, t0 + dx));
    var pp = Math.max(.62, Math.min(2.4, p0 - dx));
    document.documentElement.style.setProperty('--rong-trai', t+'fr');
    document.documentElement.style.setProperty('--rong-phai', pp+'fr');
  }
  function thoi(){
    if(!dang) return;
    dang = false; document.body.style.userSelect = '';
    var cs = getComputedStyle(document.documentElement);
    var tl = parseFloat(cs.getPropertyValue('--rong-trai')) / (parseFloat(cs.getPropertyValue('--rong-phai')) || 1);
    D.cauHinh.rongTab = D.cauHinh.rongTab || {};
    D.cauHinh.rongTab[tenTabPV()] = Math.round(Math.max(.5, Math.min(3, tl))*100)/100;
    luu(); apRongCot();
    if(XEM.phai.pdf) veTrang('phai');
  }
  v.addEventListener('mousedown', function(e){ e.preventDefault(); batDau(e.clientX); });
  document.addEventListener('mousemove', function(e){ keo(e.clientX); });
  document.addEventListener('mouseup', thoi);
  v.addEventListener('touchstart', function(e){ batDau(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('touchmove', function(e){
    if(dang) keo(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('touchend', thoi);
  v.addEventListener('dblclick', function(){
    if(D.cauHinh.rongTab) delete D.cauHinh.rongTab[tenTabPV()];
    luu(); apRongCot();
    if(XEM.phai.pdf) veTrang('phai');
    bao('Đã trả về rộng mặc định.', 3);
  });
}

function anPreview(){
  anPV = true; D.cauHinh.anPV = true; datAnPV(tenTabPV(), true); luu();
  document.querySelector('.than').classList.add('an-preview');
  veDay();
}
function hienPreview(){
  anPV = false; D.cauHinh.anPV = false; datAnPV(tenTabPV(), false); luu();
  document.querySelector('.than').classList.remove('an-preview');
  veDay();
}

/* ---- GOM NHÓM THEO NĂM > THÁNG ---- */
var moNhom = {};
function batNhom(id){
  moNhom[id] = !moNhom[id];
  var e = document.getElementById('g-'+id);
  if(e) e.classList.toggle('mo', moNhom[id]);
}
/* 3.73: bung / thu hết cây năm › tháng */
function bungNhom(mo){
  Array.prototype.forEach.call(document.querySelectorAll('.g[id^="g-"]'), function(e){ moNhom[e.id.slice(2)] = mo; e.classList.toggle('mo', mo); });
}
/* 3.73: chế độ gọn — ẩn dòng 2 (tag, CT vay) của mỗi dòng file, nút thao tác dồn lên dòng 1 */
function batDongGon(){ D.cauHinh.dongGon = !D.cauHinh.dongGon; luu(); apDongGon(); ve(); }
function apDongGon(){ document.body.classList.toggle('dong-gon', !!D.cauHinh.dongGon); }
function nhomTheoThang(ds, khoaNgay){
  var nam = {};
  ds.forEach(function(m){
    var d = (m[khoaNgay]||'') + '';
    var n = d.slice(0,4) || 'Chưa rõ';
    var t = d.slice(5,7) || '';
    nam[n] = nam[n] || {};
    (nam[n][t] = nam[n][t] || []).push(m);
  });
  var h = '', dsNam = Object.keys(nam).sort().reverse();
  dsNam.forEach(function(n){
    var idN = 'n'+n;
    if(moNhom[idN]===undefined) moNhom[idN] = (n===dsNam[0]);
    var demN = Object.keys(nam[n]).reduce(function(a,t){ return a+nam[n][t].length; },0);
    h += '<div class="g g1'+(moNhom[idN]?' mo':'')+'" id="g-'+idN+'">'+
      '<div class="g-dau" onclick="batNhom(\'' +idN+ '\')">'+
        '<span class="mui">›</span><span class="ten">Năm '+n+'</span>'+
        '<span class="dem">'+demN+' mục</span></div><div class="g-than">';
    var dsT = Object.keys(nam[n]).sort().reverse();
    dsT.forEach(function(t){
      var idT = idN+'t'+t;
      if(moNhom[idT]===undefined) moNhom[idT] = (n===dsNam[0] && t===dsT[0]);
      var nhan = t ? ('Tháng '+parseInt(t,10)) : 'Chưa rõ tháng';
      h += '<div class="g'+(moNhom[idT]?' mo':'')+'" id="g-'+idT+'">'+
        '<div class="g-dau" onclick="batNhom(\'' +idT+ '\')">'+
          '<span class="mui">›</span><span class="ten">'+nhan+'</span>'+
          '<span class="dem">'+nam[n][t].length+'</span></div><div class="g-than">'+
        nam[n][t].sort(function(a,b){
          return (b[khoaNgay]||'').localeCompare(a[khoaNgay]||''); })
          .map(function(m){ return dongHTML(m, tuKhoa); }).join('')+
        '</div></div>';
    });
    h += '</div></div>';
  });
  return h;
}
