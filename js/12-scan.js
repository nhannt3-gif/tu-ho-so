/* ==========================================================
   18. SCAN HỒ SƠ — máy scan trong app
   Hai chế độ:
     Thẻ      — CCCD, thẻ BHYT: cắt theo khổ thật 85,6 × 54 mm, hai mặt
     Tài liệu — giấy A4: chụp nhiều trang rồi ghép thành một PDF
   Ảnh xử lý tại chỗ, không gửi tới AI.
   ========================================================== */
var SC = {che:'the', dang:null, buoc:0};
function napCheScan(){ if(D.cauHinh.scanChe) SC.che = D.cauHinh.scanChe; }

function veScan(){
  var e = document.getElementById('tr4'); if(!e) return;
  if(!HS.mo){ moHoSo(); return; }
  D.scan = D.scan || []; HS.ds = D.scan;

  var h = laDT() ? dauScanDT() : veDauTab('scan', {kho:D.scan, nhanThem:'Quét bản mới',
    hamThem:'batDauScan()',
    themPhu:''});   /* 3.309 (anh): bỏ "Chế độ quét" (Quét gì? quyết định), "📷 Webcam" (Quét gì? › Camera), "📁 Chữ ký · CCCD" (cột Ck, 💾 Xuất, ✍ Rà chữ ký) */
  /* 3.151: dòng "Ảnh xử lý trong máy…" chuyển vào ❓ */

  var ds = locTheoThe('scan', locChuan('scan', D.scan.slice()));
  if(tuKhoa) ds = ds.filter(function(m){
    return boDau(m.ten+' '+(m.xa||'')+' '+(m.ap||'')+' '+(m.to||'')+' '+(m.ghi||''))
      .indexOf(tuKhoa)>=0; });
  BOT_DS.scan = ds;

  ghiHang();
  if(HANG.length) h += '<div class="thanh-chon" style="background:var(--vang-nen);border-color:var(--vang);color:var(--vang)">'+
    '<span><b>'+HANG.length+'</b> bản vừa quét chưa lưu</span>'+
    '<button onclick="moHangCho()">Mở lại</button><button onclick="boHangCho()">🗑 Bỏ</button></div>';
  demScanKhoiPhuc();   /* 3.79.1 */
  if(KP_DEM) h += '<div class="thanh-chon" style="background:var(--do-nen);border-color:var(--do);color:var(--do)">'+
    '<span>⚠ Còn <b>'+KP_DEM+'</b> bản scan có ảnh trong máy chưa gắn vào danh sách (do lỗi cũ làm mất danh sách) — bấm Khôi phục để gắn lại</span>'+
    '<button onclick="KP_DEM=null;khoiPhucScan()">♻ Khôi phục</button></div>';
  var chuaKhai = D.scan.filter(function(k){ return k.chuaKhai; });
  if(chuaKhai.length) h += '<div class="thanh-chon" style="background:var(--vang-nen);'+
    'border-color:var(--vang);color:var(--vang)">'+
    '<span><b>'+chuaKhai.length+'</b> bản lưu tạm chưa khai</span>'+
    '<button onclick="khaiHangLoat()">Khai hàng loạt</button></div>';

  var soChon = Object.keys(HS.chon).length;
  /* 3.58 (anh chốt): tích ☐ ở từng dòng → in nhiều người một lần, 4 người / A4 */
  var trongCuoi = (4 - soChon%4) % 4;
  if(soChon) h += '<div class="thanh-chon thanh-in"><span>Đã chọn <b>'+soChon+'</b> bản · '+Math.ceil(soChon/4)+' trang A4'+
      (trongCuoi ? ' · còn trống '+trongCuoi+' chỗ' : '')+'</span>'+
    '<button class="in-chinh" onclick="inGhep()">🖨 In '+soChon+' người</button>'+
    '<button onclick="luuTheRaMay()">Lưu PDF</button>'+
    '<button onclick="lenDriveThe()">Lên Drive</button>'+
    '<button onclick="boChonHS()">Bỏ chọn</button></div>';

  /* 3.61 (việc N · P, anh chốt): trạng thái ✓ Đạt / ⚠ Chưa đạt, 2 cách xem (☰ danh sách mới lưu lên trước, nhóm ngày/tuần/tháng ·
     🌳 cây Xã › Điểm › Ấp › Tổ), mỗi bản 2 dòng */
  var xem = D.cauHinh.scanXem || 'ds', nhom = D.cauHinh.scanNhom || 'ngay';
  var dsGoc = ds, soCD = ds.filter(function(k){ return !ttScan(k).dat; }).length;
  if(HS.chuaDat) ds = ds.filter(function(k){ return !ttScan(k).dat; });
  if(HS.cay) ds = ds.filter(function(k){ return khopCayScan(k, HS.cay); });
  /* 3.151: hàng Danh sách / Cây · Ngày / Tuần / Tháng · ⚠ Chưa đạt · bỏ lọc → thanh lọc chung (☰ ▾ · ⇅ ▾ · ⚲ Lọc · chip ✕) */
  if(laDT()) h += '<div class="sc-xem">'+
    '<span class="nhom-nut"><button class="'+(xem==='ds'?'bat':'')+'" onclick="datXemScan(\'scanXem\',\'ds\')">☰ Danh sách</button>'+
      '<button class="'+(xem==='cay'?'bat':'')+'" onclick="datXemScan(\'scanXem\',\'cay\')">🌳 Cây địa bàn</button></span>'+
    (soCD ? '<button class="chip-cd'+(HS.chuaDat?' bat':'')+'" onclick="HS.chuaDat=!HS.chuaDat;veScan()" title="Chỉ hiện bản còn thiếu">⚠ Chưa đạt ('+soCD+')</button>' : '')+
    '<span class="sc-dem">'+ds.length+' bản</span></div>';
  if(kxBang('scan')){ h += ds.length ? bangTabHTML('scan', ds.slice().sort(function(a, b){ return mocScan(b).localeCompare(mocScan(a)); })) : '<div class="rong">Không có bản nào khớp.</div>'; e.innerHTML = h; return; }
  if(xem==='cay') h += veCayScan(dsGoc);
  if(HS.cay && laDT()) h += '<div class="sc-loc-cay">🌳 Đang xem: <b>'+coChuHTML(nhanCayScan(HS.cay))+'</b> <span class="xoa-loc" onclick="HS.cay=null;veScan()">bỏ lọc</span></div>';
  if(!ds.length){
    h += dsGoc.length ? '<div class="rong">Không có bản nào khớp.</div>'
      : '<div class="rong">Chưa có bản quét nào.<br>Bấm <b>Quét bản mới</b> ở trên. Chế độ <b>Thẻ</b> cho CCCD hai mặt, chế độ <b>Tài liệu</b> cho giấy A4 nhiều trang.</div>';
  } else {
    ds = ds.slice().sort(function(a, b){ return mocScan(b).localeCompare(mocScan(a)); });   /* mới lưu lên trước */
    if(xem==='ds'){
      var nh = [], theo = {};
      ds.forEach(function(k){ var g = khoaNhomScan(k, nhom); if(!theo[g.k]){ theo[g.k] = {nhan:g.nhan, ds:[]}; nh.push(g.k); } theo[g.k].ds.push(k); });
      nh.forEach(function(g){
        var dsg = theo[g].ds, dat = dsg.filter(function(k){ return ttScan(k).dat; }).length;
        h += '<div class="nhan-nhom">'+coChuHTML(theo[g].nhan)+' · '+dsg.length+' bản · '+dat+' đạt'+(dsg.length-dat ? ' · <b class="cd">'+(dsg.length-dat)+' chưa</b>' : '')+'</div>'+
          dsg.map(dongScanHTML).join('');
      });
    } else h += ds.map(dongScanHTML).join('');
  }

  e.innerHTML = h;
}

/* khai hàng loạt cho các bản lưu tạm: khai chung địa bàn rồi đặt tên từng bản */
function khaiHangLoat(chon){
  var ds = D.scan.filter(function(k){ return k.chuaKhai; });
  if(!ds.length) return;
  var chonSan = {}; (chon||[]).forEach(function(id){ chonSan[id] = 1; });
  window.__k = window.__kl = {xa:D.cauHinh.hsXaCuoi||'', diem:D.cauHinh.hsDiemCuoi||'',
                 ap:D.cauHinh.hsApCuoi||'', to:D.cauHinh.hsToCuoi||''};
  window.__klDs = ds.map(function(k){ return k.id; });
  /* 3.47: tích chọn bản nào khai — địa bàn, CT vay, tag chỉ áp cho bản đã tích; bản không tích giữ nguyên để khai sau */
  moHop('<div class="hop-tit">Khai hàng loạt ('+ds.length+' bản lưu tạm)</div>'+
    '<div class="hop-phu">Tích bản cần khai (có ảnh nhỏ để nhận ra), khai địa bàn dùng chung cho các bản đã tích, rồi đặt tên từng bản. '+
    'Bản không tích giữ nguyên để khai sau.</div>'+
    '<div class="kl-dau"><label class="tl-chon"><input type="checkbox" id="kl-het" onchange="document.querySelectorAll(\'.kl-c\').forEach(function(c){ c.checked = this.checked; }, this);demKL()"> Chọn tất cả</label>'+
      '<span id="kl-dem"></span></div>'+
    ds.map(function(k, i){
      return '<div class="hang-file kl-dong">'+
        '<label class="kl-chon"><input type="checkbox" class="kl-c" data-i="'+i+'"'+(chon ? (chonSan[k.id]?' checked':'') : ' checked')+' onchange="demKL()">'+
        '<img id="kl-a'+i+'" alt=""></label>'+
        '<div class="kl-o"><div class="cu">'+coChuHTML(k.ten)+(k.che==='tailieu'?' · '+(k.trang||[]).length+' trang':'')+'</div>'+
        '<input id="kl-t'+i+'" placeholder="Họ tên khách hoặc tên tài liệu"></div></div>';
    }).join('')+
    '<div class="nhan-nhom">Dùng chung cho các bản đã tích</div>'+
    '<div id="k-diaban">'+veDiaBan(window.__kl)+'</div>'+
    oChonCT([], 'kl-ct')+
    oChonTag('scan', ['CCCD'], 'kl-tag')+
    '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho" data-lenh="hop.dong">Thôi</button>'+
      '<button class="nho chinh" id="kl-luu" onclick="luuKhaiHangLoat()">Khai các bản đã chọn</button></div>', true);
  demKL();
  ds.forEach(function(k, i){
    var im = document.getElementById('kl-a'+i); if(!im) return;
    var t = k.che==='tailieu' ? (k.trang||[])[0] : (k.matTruoc ? k.id+'_matTruoc' : '');
    if(!t) return;
    if(k.che==='tailieu' && typeof anhTrangHS==='function') return anhTrangHS(t, im);
    docAnhHS(t).then(function(b){ if(b) anhTam(im, b); });   /* 3.352: trả bộ nhớ ảnh tạm */
  });
}
function demKL(){
  var c = document.querySelectorAll('.kl-c'), n = 0; c.forEach(function(x){ if(x.checked) n++; });
  var e = document.getElementById('kl-dem'); if(e) e.textContent = 'đã chọn '+n+'/'+c.length;
  var h = document.getElementById('kl-het'); if(h) h.checked = n===c.length;
  var b = document.getElementById('kl-luu'); if(b){ b.textContent = 'Khai '+n+' bản đã chọn'; b.disabled = !n; }
}
function luuKhaiHangLoat(){
  var ids = window.__klDs || [], chon = {};
  document.querySelectorAll('.kl-c').forEach(function(c){ if(c.checked) chon[+c.dataset.i] = 1; });
  var ds = ids.map(function(id){ return (D.scan||[]).find(function(k){ return k.id===id; }); });
  var xa = gt('k-xa'), diem = gt('k-diem'), ap = gt('k-ap'), to = gt('k-to');
  var ct = layThe('kl-ct'), tag = layThe('kl-tag');
  var xong = 0, soChon = 0, bay = new Date().toISOString();
  ds.forEach(function(k, i){
    if(!k || !chon[i]) return;
    soChon++;
    var t = gt('kl-t'+i);
    if(t){ k.ten = t; delete k.chuaKhai; xong++; }
    if(xa) k.xa = xa;
    if(diem) k.diem = diem;
    if(ap) k.ap = ap;
    if(to) k.to = to;
    if(!k.diem && k.xa && k.ap) k.diem = diemCuaAp(k.xa, k.ap) || '';
    if(ct.length) k.ctrinh = ct;
    if(tag.length) k.tag = tag;
    k.suaLuc = bay; if(k.driveId) k.canDay = true;
  });
  if(xa) D.cauHinh.hsXaCuoi = xa;
  if(ap) D.cauHinh.hsApCuoi = ap;
  if(to) D.cauHinh.hsToCuoi = to;
  ghiTagGanDay('scan', tag);
  luu(); dongHop(); veScan();
  bao('Đã khai '+soChon+' bản'+((soChon-xong)?(' ('+(soChon-xong)+' bản chưa đặt tên — giữ tên tạm)'):'')+'.', 6);
  var daKhai = ds.filter(function(k, i){ return k && chon[i] && !k.chuaKhai; }).map(function(k){ return k.id; });
  if(daKhai.length && D.cauHinh.hsTuDrive!==false && coTheNoiDrive()) setTimeout(function(){ dayScanNhieu(daKhai); }, 600);
}

function chonCheScan(){
  moHop('<div class="hop-tit">Chế độ quét</div>'+
    '<div class="hop-phu">Chọn kiểu giấy tờ để app cắt và dựng trang cho đúng.</div>'+
    '<div class="hang-nut">'+
      '<button class="nho'+(SC.che==='the'?' chinh':'')+'" onclick="datChe(\'the\')">'+
        'Thẻ — CCCD, BHYT</button>'+
      '<button class="nho'+(SC.che==='tailieu'?' chinh':'')+'" onclick="datChe(\'tailieu\')">'+
        'Tài liệu — giấy A4</button></div>'+
    '<div class="huong-dan" style="margin-top:10px">'+
    '<b>Thẻ</b>: chụp mặt trước và mặt sau, app cắt đúng khổ thật 85,6 × 54 mm, '+
    'khi in phóng to vừa trang cho dễ đọc. Một trang A4 xếp được 4 khách.<br><br>'+
    '<b>Tài liệu</b>: chụp lần lượt từng trang, app nắn thẳng rồi ghép thành một PDF. '+
    'Dùng cho đơn vay đã ký, biên bản họp tổ, giấy tờ nhà đất.</div>'+
    '<div class="hang-nut" style="margin-top:12px">'+
      '<button class="nho" data-lenh="hop.dong">Đóng</button></div>');
}
function datChe(c){ SC.che = c; dongHop(); veScan(); }

/* ---- bắt đầu một bản quét mới: chọn nguồn trước ---- */
function batDauScan(){
  if(!HS.mo) return moHoSo();
  var lanTruoc = D.cauHinh.scanNguon || 'camera';
  moHop('<div class="hop-tit">Lấy từ đâu?</div>'+
    '<div class="hop-phu">Chế độ đang dùng: <b>'+(SC.che==='the'?'Thẻ — CCCD, BHYT':'Tài liệu — giấy A4')+
    '</b> · <b onclick="dongHop();chonCheScan()" style="cursor:pointer;text-decoration:underline">đổi</b></div>'+
    '<div class="nguon">'+
      '<button class="'+(lanTruoc==='camera'?'bat':'')+'" onclick="chonNguon(\'camera\')">'+
        '<span class="ic">📷</span><span class="tn">Camera</span>'+
        '<span class="mo-ta">Chụp trực tiếp</span></button>'+
      '<button class="'+(lanTruoc==='photo'?'bat':'')+'" onclick="chonNguon(\'photo\')">'+
        '<span class="ic">🖼</span><span class="tn">Photo</span>'+
        '<span class="mo-ta">Ảnh có sẵn trong máy</span></button>'+
      '<button class="'+(lanTruoc==='file'?'bat':'')+'" onclick="chonNguon(\'file\')">'+
        '<span class="ic">📄</span><span class="tn">File</span>'+
        '<span class="mo-ta">PDF hoặc Word</span></button>'+
    '</div>'+
    '<div class="hang-nut" style="margin-top:12px">'+
      '<button class="nho" data-lenh="hop.dong">Thôi</button></div>');
}

function chonNguon(n){
  D.cauHinh.scanNguon = n; luu(); dongHop();
  if(n==='camera' && !laDT() && coCamera()) return moCamera({muc:'scan'});   /* 3.45: máy bàn — webcam trong app */
  var i = document.createElement('input');
  i.type = 'file';
  if(n==='file'){ i.accept = '.pdf,.doc,.docx'; i.multiple = true; }
  else if(n==='camera'){ i.accept = 'image/*'; i.capture = 'environment'; }
  else { i.accept = 'image/*,.heic,.heif'; i.multiple = true; }
  i.onchange = function(){
    var fs = Array.prototype.slice.call(i.files);
    if(!fs.length) return;
    nhanVaoScan(fs, n);
  };
  i.click();
}

/* nhận file vào HÀNG CHỜ của phiên — chưa lưu, chưa khai gì
   3.35: ảnh → giữ ảnh gốc (hs_<id>_goc) rồi tự cắt, nắn, xoay/lật, lọc; PDF (chế độ Tài liệu) → tách từng trang
   để dời, xoay, bỏ, chèn (trước đây file PDF chọn từ nguồn "File" bị bỏ mất khi lưu) */
var HANG = [];
/* 3.395 (anh 28/10: quét CCCD mới mà "Đọc số CCCD" ra thẻ quét trước — hàng chờ còn sót 1 mặt thẻ cũ, app tự ghép với mặt mới):
   chế độ Thẻ, hàng chờ còn ảnh chưa lưu đã để quá 30 phút → hỏi Bỏ ảnh cũ / Giữ ghép tiếp trước khi nhận ảnh mới */
var SC_CHO = null;
function scanCuSot(){ if(SC.che!=='the' || !HANG.some(function(x){ return x.kieu==='anh'; })) return 0;
  var j = null; try{ j = JSON.parse(localStorage.getItem(KHOA_HANG)||'null'); }catch(e){} var t = j && (j.cham || j.luc); return t && Date.now()-new Date(t).getTime() > 30*60000 ? t : 0; }
function scanHoiCu(fs, nguon, t){
  SC_CHO = {fs:fs, nguon:nguon}; var n = HANG.filter(function(x){ return x.kieu==='anh'; }).length, d = new Date(t);
  moHop('<div class="hop-tit">Hàng chờ còn '+n+' ảnh thẻ chưa lưu</div><div class="hop-phu">Quét lúc '+hai(d.getHours())+':'+hai(d.getMinutes())+' ngày '+hai(d.getDate())+'/'+hai(d.getMonth()+1)+
    ' — chưa Lưu vào tủ. Quét thẻ người mới thì nên <b>bỏ ảnh cũ</b>, tránh ghép nhầm mặt thẻ người trước với người mới.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="scanCuXong(0)">Giữ, ghép tiếp</button><button class="nho chinh" onclick="scanCuXong(1)">🗑 Bỏ ảnh cũ, quét mới</button></div>', true);
}
function scanCuXong(bo){ var c = SC_CHO; SC_CHO = null; dongHop(); if(!c) return;
  if(bo){ donGocHang(); HANG.forEach(function(x){ xoaFileHang(x, []); }); HANG = []; SX = null; if(typeof SXK!=='undefined') SXK = []; if(typeof SX_DOC!=='undefined') SX_DOC = []; ghiHang(); }
  nhanVaoScan(c.fs, c.nguon, 1); }
function nhanVaoScan(fs, nguon, daHoi){
  var tCu = !daHoi && scanCuSot(); if(tCu) return scanHoiCu(fs, nguon, tCu);
  var che = SC.che==='the' ? 'the' : 'tailieu', soPDFBo = 0, moi = [], hong = [];   /* 3.288: ảnh không đọc được → bỏ riêng ảnh đó, báo tên + định dạng (trước dừng cả lượt) */
  batChay(false, 'Đang cắt, nắn ảnh 0/'+fs.length+'…');
  var dem = 0;
  fs.reduce(function(p, f){
    return p.then(function(){
      dem++; dangLamChu('Đang cắt, nắn ảnh '+dem+'/'+fs.length+'…'); tienChay(Math.round((dem-1)/fs.length*100));
      var laAnh = /^image\//.test(f.type) || /\.(jpg|jpeg|png|heic|webp)$/i.test(f.name);
      var laPDF = f.type==='application/pdf' || /\.pdf$/i.test(f.name);
      var idT = 'q'+idMoi();
      if(laPDF){
        if(che==='the'){ soPDFBo++; return; }
        return themPDFVaoHang(f);
      }
      if(!laAnh){
        /* Word: giữ nguyên, không cắt nắn */
        return luuFile(idT, f).then(function(){
          HANG.push({id:idT, kieu:'file', ten:f.name, co:f.size, duoi:duoiFile(f.name)});
        });
      }
      var x = {id:idT, kieu:'anh', ten:f.name, che:che, xoay:0};
      return thuGoc(f).then(function(b){ return luuAnhHS(idT+'_goc', b); })
        .then(function(){ return xuLyAnhScan(x, true); })
        .then(function(){ HANG.push(x); moi.push(x); }, function(){ hong.push(f); });
    });
  }, Promise.resolve()).then(function(){
    if(che==='the') xepCapThe(moi);
    tatChay(); moHangCho();
    var xem = HANG.filter(canXemLai).length;
    if(moi.length || !hong.length) bao('Đã tự cắt, nắn và làm đẹp.'+(xem ? ' '+xem+' ảnh có dấu ⚠ nên bấm ✂ xem lại khung.' : '')+
      (soPDFBo ? ' Bỏ qua '+soPDFBo+' file PDF — PDF dùng ở chế độ Tài liệu.' : ''), 7);
    if(hong.length) setTimeout(function(){ baoLoi('Không đọc được '+hong.length+' ảnh: '+hong.map(function(f){ return (f.name||'ảnh dán')+' ('+(f.type||'không rõ định dạng')+(f.size ? ', '+kichCo(f.size) : ', 0 KB')+')'; }).join(', ')+
      (hong.some(function(f){ return /heic|heif/i.test((f.type||'')+(f.name||'')); }) ? ' — ảnh HEIC (iPhone): chưa đổi được sang JPG (lần đầu cần mạng để tải bộ đọc HEIC; ảnh hỏng thì mở ảnh lưu lại JPG).' : ' — file hỏng hoặc không phải ảnh; thử mở ảnh rồi Copy ảnh (không copy file) để dán.')); }, 400);
  }).catch(function(e){
    tatChay(); moHangCho(); baoLoi('Không xử lý được: '+(e&&e.message||e));
  });
}
/* thẻ: xếp các ảnh VỪA THÊM thành cặp mặt trước | mặt sau — chụp xen kẽ hay chụp hết mặt trước rồi mới tới
   mặt sau đều ra đúng cặp. Ảnh đã có trong hàng chờ (anh có thể đã tự dời) giữ nguyên chỗ. */
function xepCapThe(moi){
  if(!moi || !moi.length) return;
  if(moi.length===1){
    /* chụp từng ảnh bằng camera: ảnh mới hoàn tất một cặp mà ngược mặt thì đổi chỗ */
    var anh = HANG.filter(function(x){ return x.kieu==='anh'; }), vt = anh.indexOf(moi[0]);
    if(vt>0 && vt%2===1 && anh[vt-1].mat==='sau' && moi[0].mat==='truoc'){
      var i = HANG.indexOf(anh[vt-1]), j = HANG.indexOf(moi[0]), t = HANG[i]; HANG[i] = HANG[j]; HANG[j] = t;
    }
    return;
  }
  var cu = HANG.filter(function(x){ return moi.indexOf(x)<0; });
  var tr = moi.filter(function(x){ return x.mat==='truoc'; }), sa = moi.filter(function(x){ return x.mat==='sau'; }), ra = [];
  if(tr.length===sa.length && tr.length*2===moi.length){ tr.forEach(function(x, i){ ra.push(x, sa[i]); }); }
  else {
    ra = moi.slice();
    for(var i=0;i+1<ra.length;i+=2) if(ra[i].mat==='sau' && ra[i+1].mat==='truoc'){ var t = ra[i]; ra[i] = ra[i+1]; ra[i+1] = t; }
  }
  /* nếu hàng chờ đang lẻ một mặt thì cặp cuối cũ ghép với ảnh mới đầu tiên — giữ nguyên thứ tự */
  HANG = cu.concat(ra);
}

/* hàng chờ: xem lại, chỉnh, sắp thứ tự, quét thêm, in ngay, lưu sau, hoặc lưu có khai đầy đủ */
function moHangCho(){
  ghiHang();
  if(!HANG.length) return veScan();
  var laThe = SC.che==='the';
  /* 3.46: luồng 3 bước giống nhau trên máy tính và điện thoại — ① Chỉnh › ② Xem › ③ Lưu & gửi (bỏ "in ngay không lưu") */
  var h = buocHTML(1, {lui:'dongHop();veScan()', tiep:'xemTruocHang()', b2:'xemTruocHang()'})+'<div class="hop-tit">Bản vừa quét ('+HANG.length+')</div>'+
    '<div class="hop-phu">'+(laThe
      ? 'App đã tự cắt, nắn và xếp <b>mặt trước | mặt sau</b> theo từng người — máy không chắc đúng 100%, anh duyệt qua. '+
        '<b>Chạm 1 ảnh rồi chạm ảnh khác</b> để đổi chỗ (kể cả giữa 2 người)'+(laDT()?'':', hoặc kéo thả')+' · mỗi mặt ◀ ▶ ▲ ▼ dời 4 chiều'+(laDT()?'':' (chọn ảnh rồi bấm phím mũi tên)')+' · ▲▼ cạnh "Người n" dời cả người · ⇄ đổi mặt · 🔄 Lật ảnh ngược đầu · ảnh gốc bên phải: bấm để kéo viền.'
      : 'App đã tự tìm tờ giấy, nắn thẳng và làm trắng nền. <b>Chạm 1 trang rồi chạm trang khác</b> để đổi chỗ'+(laDT()?'':', hoặc kéo thả')+
        ' · ◀ ▶ dời trang · ⟲ xoay · ✕ bỏ trang · ảnh gốc bên phải: bấm để kéo viền.')+'</div>'+
    '<div id="hc-anh" class="hc-luoi'+(laThe?' the':'')+'"></div>'+
    '<div class="hang-nut" style="margin-top:10px">'+
      '<button class="nho" onclick="quetThemHang()">+ Quét thêm</button>'+
      (laThe ? '' : '<button class="nho" onclick="chonPDFHang()">+ Thêm PDF</button>')+
      '<button class="nho xau" onclick="boHangCho()">🗑 Bỏ hết</button></div>'+
    '<div class="hang-nut sc-xong-hang"><button class="nho chinh sc-xong" onclick="xemTruocHang()">Xem trước ›</button></div>';
  moHop(h, true);
  veAnhHang();
}
function timScan(id){ return (D.scan||[]).find(function(x){ return x.id===id; }); }
function trangThaiDriveScan(ds){
  ds = (ds||[]).filter(Boolean); if(!ds.length) return '';
  var len = ds.filter(function(k){ return k.driveId && !k.canDay; }).length;
  if(len===ds.length) return '☁ Đã có trên Drive'+(ds[0].chuaKhai ? ' (thư mục Chưa khai — khai đầy đủ thì app dời về đúng xã, ấp, tổ)' : '')+'.';
  if(!coTheNoiDrive()) return 'Chưa nối Drive — bản này đang nằm trong máy.';
  return '☁ Đang chờ lên Drive'+(ds.length>1 ? ' ('+(ds.length-len)+'/'+ds.length+')' : '')+' — app tự đẩy khi có mạng.';
}
function quetThemHang(){ dongHop(); if(laDT()) quetNhanh(); else batDauScan(); }
/* thanh bước ① Chỉnh › ② Xem › ③ Lưu & gửi */
/* 3.50: thanh bước thống nhất cho mọi màn Scan (thẻ, tài liệu, chữ ký, CCCD): ‹ Lùi · ① ② ③ · Tiếp ›
   d = {lui, tiep, b1, b2, b3, luiNhan} — chuỗi lệnh onclick. Bấm số bước đã qua để quay lại. Esc = Lùi, Enter = Tiếp. */
function buocHTML(n, d){
  d = d || {};
  var nut = function(lop, lenh, chu){ return lenh ? '<button class="nho '+lop+'" onclick="'+lenh+'">'+chu+'</button>' : ''; };
  return '<div class="buoc">'+nut('b-lui', d.lui, d.luiNhan||'‹ Lùi')+'<span class="b-cac">'+['Chỉnh','Xem','Lưu & gửi'].map(function(t, i){
    var k = d['b'+(i+1)], lop = (i+1===n?'dang':(i+1<n?'qua':''))+(k && i+1!==n?' nhay':'');
    return '<span class="'+lop+'"'+(k && i+1!==n?' onclick="'+k+'" title="Quay lại bước này"':'')+'><b>'+(i+1)+'</b>'+t+'</span>'; }).join('<i>›</i>')+'</span>'+
    nut('b-tiep chinh', d.tiep, 'Tiếp ›')+'</div>';
}
/* ② XEM — dựng PDF đúng bản sẽ lưu / in / gửi; chưa lưu gì. Không vừa ý thì quay lại chỉnh */
var XH = null;
function xemTruocHang(){
  var ds = HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; });
  if(!ds.length) return baoLoi('Chưa có ảnh hay trang nào.');
  if(!window.PDFLib) return baoLoi('Chưa tải được bộ tạo PDF.');
  var laThe = SC.che==='the', so = laThe ? Math.ceil(ds.length/2)+' người' : ds.length+' trang';
  XH = {bl:null};
  moHop(buocHTML(2, {lui:'moHangCho()', b1:'moHangCho()', tiep:"var t=document.getElementById('xh-tiep');if(t&&!t.disabled)tiepHang();else bao('PDF đang dựng, chờ chút…',2)"})+'<div class="hop-tit">Xem trước · '+so+'</div>'+
    '<div class="hop-phu">Đúng bản sẽ lưu, in và gửi. Chưa vừa ý thì bấm <b>‹ Chỉnh tiếp</b>; đạt thì bấm <b>Tiếp</b> để chọn Lưu vào máy / Gửi / Lưu vào tủ.</div>'+
    '<div class="cam-kieu">Ảnh trong PDF: '+nutNetPDF('xemTruocHang()')+'</div>'+
    '<div id="xp-trang" class="xp-trang"><div class="huong-dan">Đang dựng PDF…</div></div>'+
    '<div class="xp-nut"><div class="hang-nut">'+
      '<button class="nho" onclick="moHangCho()">‹ Chỉnh tiếp</button>'+
      '<button class="nho chinh sc-xong" id="xh-tiep" onclick="tiepHang()" disabled>Đạt — Tiếp ›</button></div></div>', true);
  batChay(false, 'Đang dựng PDF…');
  dungPDFHang().then(function(bytes){
    tatChay();
    XH.bl = new Blob([bytes], {type:'application/pdf'});
    var t = document.getElementById('xh-tiep'); if(t) t.disabled = false;
    veTrangXP(XH.bl);
  }).catch(function(e){ tatChay(); baoLoi('Không dựng được PDF: '+(e&&e.message||e)); });
}
/* ③ — 3.155 (anh chốt ý 7, 11 — học Scanner Lens): KHÔNG tự lưu tạm vào tủ / Drive. Xong → hộp chọn:
   💾 Lưu vào máy (PDF đúng như bản in — thẻ 4 người / A4) · 📤 Gửi · 📋 Copy ảnh · 🗄 Lưu vào tủ (chọn khách: mã KH + tên + ấp).
   Chỉ "Lưu vào tủ" mới tạo hồ sơ. Phiên quét dở giữ trong máy (localStorage + ảnh trong máy), mở lại tiếp được, tự bỏ sau 7 ngày. */
var SX = null;
function tiepHang(){
  var bl = XH && XH.bl; if(!bl) return bao('PDF đang dựng, chờ chút…', 2);
  scanXongHop(bl);
}
function scanTen(){ var d = nay(); return (SC.che==='the' ? 'CCCD' : 'Scan')+' '+hai(d.getDate())+'-'+hai(d.getMonth()+1)+'-'+String(d.getFullYear()).slice(2)+' '+hai(d.getHours())+'h'+hai(d.getMinutes()); }
function scanXongHop(bl){
  SX = SX && SX.bl===bl ? SX : {bl:bl, da:{}, ten:scanTen()};
  var laThe = SC.che==='the', so = laThe ? Math.ceil(HANG.filter(function(x){ return x.kieu==='anh'; }).length/2)+' người' : HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; }).length+' trang';
  var o = function(k, ico, chu, phu, js){ return '<button class="sx-o'+(SX.da[k] ? ' da' : '')+'" onclick="'+js+'"><b>'+ico+'</b><span>'+chu+(SX.da[k] ? ' ✓' : '')+'<small>'+phu+'</small></span></button>'; };
  moHop(buocHTML(3, {lui:'xemTruocHang()', b1:'moHangCho()', b2:'xemTruocHang()'})+'<div class="hop-tit">Xong · '+so+' — làm gì với bản này?</div>'+
    '<div class="sx-luoi">'+
      o('may', '💾', 'Lưu vào máy', 'PDF'+(laThe ? ' như bản in — 4 người / A4' : ''), 'scanLuuMay()')+
      o('gui', '📤', 'Gửi', laMayBan() ? 'tải file về, kéo vào Zalo' : 'Zalo, email… (bảng chia sẻ)', 'scanGui()')+
      o('anh', '📋', 'Copy ảnh', 'dán thẳng vào Zalo', 'scanCopyAnh()')+
      o('tu', '🗄', 'Lưu vào tủ hồ sơ', 'chọn khách: mã KH + tên + ấp', 'scanLuuTuHop()')+
    '</div>'+
    '<div class="hop-phu">Chỉ <b>Lưu vào tủ</b> mới tạo hồ sơ (lưu app + Drive). Đóng hộp này thì bản vừa quét vẫn giữ trong máy để làm tiếp (tự bỏ sau 7 ngày).</div>'+
    '<div class="hang-nut"><button class="nho" onclick="xemTruocHang()">‹ Xem lại</button><button class="nho chinh" onclick="scanXongBo()">✓ Xong</button></div>', true);
}
function scanDa(k){ if(SX){ SX.da[k] = 1; var b = document.querySelector('.sx-luoi .sx-o[onclick^="scan'+{may:'LuuMay', gui:'Gui', anh:'CopyAnh'}[k]+'"]'); if(b && !b.classList.contains('da')){ b.classList.add('da'); b.querySelector('span').firstChild.textContent += ' ✓'; } } }
function scanLuuMay(){ if(!SX) return; var ten = sachTen(SX.ten)+'.pdf';
  if(laMayBan()) { taiXuongBlob(SX.bl, ten); bao('Đã lưu vào máy: '+ten+' (thư mục Tải xuống).', 5); } else chiaSePDF(SX.bl, ten);
  scanDa('may'); }
function scanGui(){ if(!SX) return; chiaSePDF(SX.bl, sachTen(SX.ten)+'.pdf'); scanDa('gui'); }
/* ảnh đã xử lý trong hàng chờ ghép thành 1 ảnh (thẻ: mặt trước | mặt sau mỗi hàng; tài liệu: các trang xếp dọc, tối đa 6) */
function scanAnhGhep(){
  var anh = HANG.filter(function(x){ return x.kieu==='anh'; }).slice(0, SC.che==='the' ? 8 : 6);
  if(!anh.length) return Promise.reject(new Error('Không có ảnh'));
  return Promise.all(anh.map(function(x){ return docAnhHS(x.id).then(function(b){ return b ? createImageBitmap(b) : null; }); })).then(function(bm){
    bm = bm.filter(Boolean); if(!bm.length) throw new Error('Không đọc được ảnh');
    var cot = SC.che==='the' ? 2 : 1, W = 900, khe = 16, o = (W - (cot+1)*khe)/cot, hang = [], i;
    for(i=0;i<bm.length;i+=cot) hang.push(bm.slice(i, i+cot));
    var cao = hang.map(function(r){ return Math.max.apply(null, r.map(function(x){ return x.height*o/x.width; })); });
    var c = document.createElement('canvas'); c.width = W; c.height = cao.reduce(function(a, h){ return a+h+khe; }, khe);
    var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    var y = khe; hang.forEach(function(r, j){ r.forEach(function(x, q){ g.drawImage(x, khe+q*(o+khe), y, o, x.height*o/x.width); }); y += cao[j]+khe; });
    return new Promise(function(ok){ c.toBlob(ok, 'image/png'); });
  });
}
function scanCopyAnh(){
  if(!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write)) return bao('Máy này không cho chép ảnh — dùng 📤 Gửi.', 5);
  navigator.clipboard.write([new ClipboardItem({'image/png':scanAnhGhep()})]).then(function(){ scanDa('anh'); bao('Đã chép ảnh — dán (Ctrl+V) vào Zalo.', 5); })
    .catch(function(){ baoLoi('Không chép được ảnh — dùng 📤 Gửi.'); });
}
/* ✓ Xong: đã lưu / gửi → bỏ phiên quét; chưa làm gì → hỏi trước khi bỏ */
function scanXongBo(){
  var bo = function(){ HANG.forEach(function(x){ xoaFileHang(x, []); }); HANG = []; SX = null; ghiHang(); dongHop(); veScan(); };
  if(SX && Object.keys(SX.da).length) return bo();
  hoi('Bỏ bản vừa quét?', 'Chưa lưu vào máy, chưa gửi, chưa lưu vào tủ — bỏ là mất hẳn. Muốn để làm sau thì bấm Thôi rồi đóng hộp (bản quét giữ trong máy '+(typeof SC_LOAI!=='undefined' ? '1 ngày' : '7 ngày')+').', 'Bỏ', bo);
}
/* 🗄 Lưu vào tủ: chọn khách theo danh bạ Số liệu (Mẫu 31) — tên / mã KH / CCCD; app tự điền xã + ấp.
   Thẻ nhiều người: mỗi người 1 dòng chọn khách. Lưu theo mã KH + tên + ấp (không theo tổ — khách có thể chuyển tổ khi củng cố). */
var SXK = [];
function scanNhom(){
  if(SC.che==='the'){ var a = HANG.filter(function(x){ return x.kieu==='anh'; }), r = []; for(var i=0;i<a.length;i+=2) r.push(a.slice(i, i+2)); return r; }
  return [HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; })];
}
function scanLuuTuHop(){
  if(!SL_SAN && typeof slNap==='function') return slNap().then(scanLuuTuHop);
  var nh = scanNhom(); SXK = nh.map(function(_, i){ return SXK[i] || null; }).slice(0, nh.length);
  var tag = SC.che==='the' ? '' : '<div class="o"><label>Loại giấy tờ</label><div class="goi-y mot" id="sx-tag">'+dsTag('scan').filter(function(t){ return t!=='CCCD'; }).map(function(t){ return '<span class="the-loc" onclick="chonMot(this)">'+coChuHTML(t)+'</span>'; }).join('')+'</div></div>';
  moHop('<div class="hop-tit">🗄 Lưu vào tủ hồ sơ</div><div class="hop-phu">Gõ tên / mã KH / CCCD rồi chọn khách — app tự điền xã, ấp. Lưu: <i>'+coChuHTML(SC.che==='the' ? 'CCCD' : 'Hồ sơ scan')+' / Xã / Ấp / Mã KH Tên.pdf</i>.</div>'+
    nh.map(function(g, i){ return '<div class="sx-kh" id="sx-kh-'+i+'"><img id="sx-a'+i+'" alt=""><div class="sx-kh-o">'+(nh.length>1 ? '<b>Người '+(i+1)+'</b>' : '')+
      '<input id="sx-tim-'+i+'" placeholder="Tên, mã KH hoặc số CCCD" autocomplete="off" oninput="scanTimKH('+i+')"><div class="sx-gy" id="sx-gy-'+i+'"></div><div class="sx-chon" id="sx-chon-'+i+'">'+scanKHChu(SXK[i])+'</div></div></div>'; }).join('')+
    tag+'<div class="hang-nut"><button class="nho" onclick="scanXongHop(SX.bl)">‹ Thôi</button><button class="nho chinh" onclick="scanLuuTu()">🗄 Lưu vào tủ</button></div>', true);
  nh.forEach(function(g, i){ var x = g[0]; if(x && x.kieu==='anh') docAnhHS(x.id).then(function(b){ var e = document.getElementById('sx-a'+i); if(b && e) anhTam(e, b); }); });
  setTimeout(function(){ var e = document.getElementById('sx-tim-0'); if(e) e.focus(); }, 30);
}
function scanKHChu(c){ return c ? '✓ <b>'+coChuHTML(c.ma)+' · '+coChuHTML(c.ten)+'</b> — '+coChuHTML([c.ap, c.xa].filter(Boolean).join(', ')) : '<span class="sl-phu">Chưa chọn khách</span>'; }
function scanTimKH(i){
  var q = (document.getElementById('sx-tim-'+i)||{}).value||'', g = document.getElementById('sx-gy-'+i); if(!g) return;
  var ds = KHO.tim(q, 6);   /* 3.341 K1: đọc qua KHO (RA_SOAT_KHO_2410) */
  g.innerHTML = ds.map(function(r){ var c = KHO.danhBa(r.m) || {}; return '<button onclick="scanChonKH('+i+',\''+r.m+'\')"><b>'+coChuHTML(c.ten||r.ten)+'</b> <small>'+coChuHTML([r.m, c.tenThon, c.tenXa].filter(Boolean).join(' · '))+'</small></button>'; }).join('') ||
    (q.trim().length>=2 ? '<div class="sl-phu">Không thấy khách khớp'+(KHO.coDanhBa() ? '' : ' — chưa có danh bạ, nạp Mẫu 31 ở tab Nạp & KT')+'.</div>' : '');
}
function scanChonKH(i, ma){
  var c = KHO.danhBa(ma) || {};
  SXK[i] = {ma:ma, ten:c.ten||'', ap:c.tenThon||'', xa:c.tenXa||'', maXa:c.xa||'', maAp:c.thon||''};
  var e = document.getElementById('sx-chon-'+i); if(e) e.innerHTML = scanKHChu(SXK[i]);
  var g = document.getElementById('sx-gy-'+i); if(g) g.innerHTML = '';
  var n = document.getElementById('sx-tim-'+(i+1)); if(n) n.focus();
}
function scanLuuTu(){
  var nh = scanNhom(); if(nh.some(function(_, i){ return !SXK[i]; })) return bao(nh.length>1 ? 'Chọn khách cho đủ '+nh.length+' người.' : 'Chọn khách trước.', 4);
  var loai = SC.che==='the' ? '' : layMot('sx-tag'), d = nay(), ds = [], ch = Promise.resolve();
  nh.forEach(function(g, i){ var c = SXK[i];
    var k = {id:idMoi(), che:SC.che==='the' ? 'the' : 'tailieu', ten:c.ten, maKH:c.ma, xa:c.xa, ap:c.ap, maXa:c.maXa, maAp:c.maAp, diem:'', to:'', ghi:'',
      tag:SC.che==='the' ? ['CCCD'] : (loai ? [loai] : []), ctrinh:[], ngay:ngayISO(d), gioQuet:d.toISOString(), taoLuc:d.toISOString(), suaLuc:d.toISOString(), may:maMayCua()};
    if(k.che==='the'){ k.matTruoc = !!g[0]; k.matSau = !!g[1];
      (function(k, a, b){ ch = ch.then(function(){ return a ? doiTenAnh(a.id, k.id+'_matTruoc') : null; }).then(function(){ return b ? doiTenAnh(b.id, k.id+'_matSau') : null; }); })(k, g[0], g[1]); }
    else k.trang = g.map(hangRaTrang);
    ds.push(k); });
  ch.then(function(){
    D.scan = D.scan || []; ds.forEach(function(k){ D.scan.push(k); }); HS.ds = D.scan;
    donGocHang(); HANG = []; SX = null; SXK = []; ghiHang(); luu(); dongHop(); veScan();
    if(D.cauHinh.dbSauLuu!==false) henDongBoScan();
    bao('Đã lưu vào tủ '+ds.length+' bản: '+ds.map(function(k){ return k.maKH+' '+k.ten; }).join(', ')+'.', 6);
  }).catch(function(e){ baoLoi('Chưa lưu được: '+(e && e.message || e)); });
}
/* chạm để đổi chỗ: chạm ảnh A (viền xanh) rồi chạm ảnh B ở bất kỳ đâu → 2 ảnh đổi chỗ */
var HC_CHON = -1;
function chamHang(i){
  if(HC_CHON<0 || HC_CHON>=HANG.length){ HC_CHON = i; return veAnhHang(); }
  if(HC_CHON===i){ HC_CHON = -1; return veAnhHang(); }
  var a = HC_CHON; HC_CHON = -1; doiHaiHang(a, i);
}
function doiHaiHang(a, b){
  if(a===b || !HANG[a] || !HANG[b]) return;
  var t = HANG[a]; HANG[a] = HANG[b]; HANG[b] = t; veAnhHang();
  bao('Đã đổi chỗ 2 ảnh.', 2);
}
/* ▲▼ dời cả người (cặp mặt trước + mặt sau) */
function dichNguoi(p, d){
  var anh = HANG.filter(function(x){ return x.kieu==='anh'; }), khac = HANG.filter(function(x){ return x.kieu!=='anh'; }), nhom = [];
  for(var i=0;i<anh.length;i+=2) nhom.push(anh.slice(i, i+2));
  var q = p+d; if(q<0 || q>=nhom.length) return;
  var t = nhom[p]; nhom[p] = nhom[q]; nhom[q] = t;
  HANG = [].concat.apply([], nhom).concat(khac); HC_CHON = -1; veAnhHang();
}
var HC_KEO = -1;
var HC_URL = [];
/* 3.37: mỗi ảnh hiện KẾT QUẢ + ẢNH GỐC có viền cắt (bấm ảnh gốc để kéo viền) + nút kiểu màu hiện sẵn */
var TEN_LOC_NGAN = {magic:'Magic', giay:'Giấy trắng', xam:'Xám', dentrang:'Đen trắng', goc:'Gốc'};
var GOC_NHO = {};   /* ảnh gốc đã giải mã, theo id — vẽ lại viền không phải đọc lại */
function veAnhHang(){
  ghiHang();
  var e = document.getElementById('hc-anh'); if(!e) return;
  HC_URL.forEach(function(u){ URL.revokeObjectURL(u); }); HC_URL = [];
  var laThe = SC.che==='the', vt = 0, h = '';
  HANG.forEach(function(x, i){
    var nhan, cu = '', la = x.kieu==='anh';
    if(laThe && la){
      if(vt%2===0){ var pn = vt/2, soN = Math.ceil(HANG.filter(function(z){ return z.kieu==='anh'; }).length/2);
        h += '<div class="hc-cap">Người '+(pn+1)+'<span class="hc-cap-nut">'+
          '<button onclick="dichNguoi('+pn+',-1)" title="Dời cả người lên"'+(pn===0?' disabled':'')+'>▲</button>'+
          '<button onclick="dichNguoi('+pn+',1)" title="Dời cả người xuống"'+(pn>=soN-1?' disabled':'')+'>▼</button></span></div>'; }
      nhan = vt%2===0 ? 'Mặt trước' : 'Mặt sau';
      if(x.mat && x.mat!==(vt%2===0?'truoc':'sau')) nhan += ' · <span class="hc-lech">⚠ ảnh này giống mặt '+(x.mat==='truoc'?'trước':'sau')+'</span>';
      vt++;
    } else nhan = x.kieu==='trang' ? ('Trang '+(i+1)+' · PDF') : (x.kieu==='file' ? 'File giữ nguyên' : 'Trang '+(i+1));
    if(canXemLai(x)) nhan = '⚠ xem lại · '+nhan;
    if(laThe && la){   /* 3.291 (anh: "mỗi mặt dời được 4 chiều để ráp các mặt CCCD nhanh nhất"): ◀ ▶ trong hàng · ▲ ▼ sang người trên / dưới (cùng cột); chọn ảnh rồi bấm phím mũi tên cũng được */
      var vA = vt-1, nA = HANG.filter(function(z){ return z.kieu==='anh'; }).length, dn = function(d, ky, tit, tat){ return '<button data-lenh="hc.dich" data-i="'+i+'" data-d="'+d+'" title="'+tit+'"'+(tat?' disabled':'')+'>'+ky+'</button>'; };
      cu += dn(-1, '◀', 'Dời sang trái (đổi với ảnh liền trước)', vA===0)+dn(1, '▶', 'Dời sang phải (đổi với ảnh liền sau)', vA>=nA-1)+
        dn(-2, '▲', 'Dời lên người trên (cùng cột)', vA<2)+dn(2, '▼', 'Dời xuống người dưới (cùng cột)', vA+2>nA-1);
    } else cu += '<button onclick="dichHang('+i+',-1)" title="Dời lên trước"'+(i===0?' disabled':'')+'>◀</button>'+
          '<button onclick="dichHang('+i+',1)" title="Dời ra sau"'+(i===HANG.length-1?' disabled':'')+'>▶</button>';
    if(la) cu += '<button onclick="moChinhGoc('+i+')" title="Kéo viền cắt trên ảnh gốc">✂ Chỉnh viền</button>';
    if(laThe && la) cu += '<button onclick="doiMatHang('+i+')" title="Đổi mặt trước ↔ mặt sau trong cặp">⇄</button>';
    if(!laThe && x.kieu!=='file') cu += '<button onclick="xoayHang('+i+',90)" title="Xoay 90°">⟲</button>';
    if(x.kieu!=='file') cu += '<button onclick="xoayHang('+i+',180)" title="Lật ngược 180° (ảnh bị ngược đầu)">'+(laThe ? '🔄 Lật' : '⇅')+'</button>';
    if(la) cu += '<button onclick="batThangHang('+i+')"'+(thangBat(x)?' class="bat"':'')+
      ' title="Tự làm thẳng (dò độ nghiêng chữ rồi xoay cho thẳng đứng) — bấm để bật / tắt'+
      (x.nghieng?' · đã chỉnh '+(Math.round(x.nghieng*10)/10)+'°':'')+'">📐</button>';
    cu += '<button class="xau" onclick="boMotHang('+i+')" title="Bỏ bản này">✕</button>';
    var loc = (la && x.khung) ? '<div class="hc-loc">'+Object.keys(TEN_LOC_NGAN).map(function(k){
        return '<button class="'+(x.loc===k?'bat':'')+'" onclick="doiLocHang('+i+',\''+k+'\')">'+TEN_LOC_NGAN[k]+'</button>'; }).join('')+'</div>' : '';
    var than;
    if(x.kieu==='file') than = '<div class="cay">📄 '+coChuHTML(x.ten)+' · '+kichCo(x.co||0)+'<br><small>File Word không ghép vào PDF được</small></div>';
    else if(la && x.khung) than = '<div class="hc-hai"><div class="hc-kq" onclick="chamHang('+i+')" title="Chạm để chọn, chạm ảnh khác để đổi chỗ"><img id="hc-i-'+i+'" alt=""><small>Kết quả · chạm để đổi chỗ</small></div>'+
      '<div class="hc-goc" onclick="moChinhGoc('+i+')" title="Bấm để kéo viền cắt"><canvas id="hc-g-'+i+'"></canvas><small>Ảnh gốc · bấm để kéo viền</small></div></div>';
    else than = '<img id="hc-i-'+i+'" alt="" onclick="chamHang('+i+')">';
    var keo = laDT() ? '' : ' draggable="true" ondragstart="HC_KEO='+i+';this.classList.add(\'hc-dangkeo\')" ondragend="this.classList.remove(\'hc-dangkeo\')"'+
      ' ondragover="event.preventDefault();this.classList.add(\'hc-tha\')" ondragleave="this.classList.remove(\'hc-tha\')"'+
      ' ondrop="event.preventDefault();this.classList.remove(\'hc-tha\');doiHaiHang(HC_KEO,'+i+')"';
    h += '<div class="hc-o'+(canXemLai(x)?' hc-canxem':'')+(HC_CHON===i?' hc-chon':'')+'"'+keo+'>'+
      '<div class="hc-nhan" onclick="chamHang('+i+')">'+nhan+(HC_CHON===i?' <b class="hc-chon-chu">· chạm ảnh cần đổi</b>':'')+'</div>'+than+loc+
      '<div class="hc-cu">'+cu+'</div></div>';
  });
  e.innerHTML = h;
  HANG.forEach(function(x, i){
    var im = document.getElementById('hc-i-'+i);
    if(im){
      if(x.kieu==='trang') anhTrangPDF(hangRaTrang(x), 360).then(function(u){ im.src = u; }).catch(function(){ im.alt = 'Không xem trước được trang PDF'; });
      else docAnhHS(x.id).then(function(b){ if(b){ var u = URL.createObjectURL(b); HC_URL.push(u); im.src = u; } });
    }
    if(document.getElementById('hc-g-'+i)) veGocNho(x, i);
  });
}
/* vẽ ảnh gốc quanh viền cắt (chừa rộng 40% mỗi phía để thấy mép thật) + tứ giác xanh, phần bị bỏ tô mờ */
function veGocNho(x, i){
  var lay = GOC_NHO[x.id] ? Promise.resolve(GOC_NHO[x.id])
    : docAnhHS(x.id+'_goc').then(function(b){ if(!b) return null; return anhTuBlob(b); }).then(function(im){
        if(!im) return null; GOC_NHO[x.id] = quaKhung(im); return GOC_NHO[x.id]; });
  lay.then(function(g){
    var cv = document.getElementById('hc-g-'+i); if(!g || !cv || HANG[i]!==x) return;
    var q0 = xepGoc4(x.khung), xs = q0.map(function(p){ return p[0]; }), ys = q0.map(function(p){ return p[1]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var dw = (x1-x0)*0.4, dh = (y1-y0)*0.4;
    x0 = Math.max(0, x0-dw); y0 = Math.max(0, y0-dh); x1 = Math.min(g.width, x1+dw); y1 = Math.min(g.height, y1+dh);
    var k = Math.min(1, 480/Math.max(x1-x0, y1-y0));
    cv.width = Math.max(1, Math.round((x1-x0)*k)); cv.height = Math.max(1, Math.round((y1-y0)*k));
    var t = cv.getContext('2d'); t.drawImage(g, x0, y0, x1-x0, y1-y0, 0, 0, cv.width, cv.height);
    var q = q0.map(function(p){ return [(p[0]-x0)*k, (p[1]-y0)*k]; });
    t.fillStyle = 'rgba(0,0,0,.4)'; t.beginPath(); t.rect(0, 0, cv.width, cv.height);
    q.forEach(function(p, j){ if(j) t.lineTo(p[0], p[1]); else t.moveTo(p[0], p[1]); }); t.closePath(); t.fill('evenodd');
    t.strokeStyle = '#3B9BFF'; t.lineWidth = Math.max(2, cv.width/160); t.beginPath();
    q.forEach(function(p, j){ if(j) t.lineTo(p[0], p[1]); else t.moveTo(p[0], p[1]); }); t.closePath(); t.stroke();
    q.forEach(function(p){ t.beginPath(); t.arc(p[0], p[1], Math.max(4, cv.width/70), 0, Math.PI*2); t.fillStyle = '#fff'; t.fill(); t.strokeStyle = '#3B9BFF'; t.stroke(); });
  });
}
function dichHang(i, d){
  var j = i+d; if(j<0 || j>=HANG.length) return;
  var t = HANG[i]; HANG[i] = HANG[j]; HANG[j] = t; veAnhHang();
}
/* đổi mặt trong cặp: ảnh này đổi chỗ với ảnh còn lại của cùng người */
function doiMatHang(i){
  var anh = HANG.filter(function(x){ return x.kieu==='anh'; }), vt = anh.indexOf(HANG[i]);
  if(vt<0) return;
  var ban = anh[vt%2===0 ? vt+1 : vt-1];
  if(!ban) return bao('Người này mới có một mặt — quét thêm mặt còn lại.', 4);
  var j = HANG.indexOf(ban), t = HANG[i]; HANG[i] = HANG[j]; HANG[j] = t; veAnhHang();
}
function xoayHang(i, deg){
  var x = HANG[i]; if(!x) return; deg = deg || 90;
  if(x.kieu==='trang'){ x.xoay = ((x.xoay||0)+deg)%360; return veAnhHang(); }
  if(x.kieu!=='anh') return;
  batChay(true);
  var lam;
  if(x.khung){ x.xoay = ((x.xoay||0)+deg)%360; x.xoayTay = true; lam = xuLyAnhScan(x, false); }
  else lam = docAnhHS(x.id).then(anhTuBlob).then(function(im){
    var c = document.createElement('canvas'); c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0);
    return canvasRaBlob(xoayCanvas(c, deg), 0.9);
  }).then(function(b){ return luuAnhHS(x.id, b); });
  lam.then(function(){ tatChay(); veAnhHang(); })
    .catch(function(e){ tatChay(); baoLoi('Không xoay được: '+(e&&e.message||e)); });
}
function doiLocHang(i, v){
  var x = HANG[i]; if(!x || x.kieu!=='anh' || !x.khung) return;
  x.loc = v; batChay(true);
  xuLyAnhScan(x, false).then(function(){ tatChay(); veAnhHang(); })
    .catch(function(e){ tatChay(); baoLoi('Không đổi được kiểu lọc: '+(e&&e.message||e)); });
}
/* xóa file của một mục hàng chờ: ảnh + ảnh gốc; file PDF nguồn chỉ xóa khi không còn trang nào dùng */
function xoaFileHang(x, conLai){
  if(x.kieu==='anh'){ xoaFile('hs_'+x.id); xoaFile('hs_'+x.id+'_goc'); delete GOC_NHO[x.id]; }
  else if(x.kieu==='trang'){
    if(!(conLai||[]).some(function(y){ return y.kieu==='trang' && y.nguon===x.nguon; })){ xoaFile('hs_'+x.nguon); delete PDF_NHO[x.nguon]; }
  }
  else xoaFile(x.id);
}
/* lưu xong thì bỏ ảnh gốc cho nhẹ máy (bản đã xử lý vẫn giữ) */
function donGocHang(){ HANG.forEach(function(x){ if(x.kieu==='anh'){ xoaFile('hs_'+x.id+'_goc'); delete GOC_NHO[x.id]; } }); }
function boMotHang(i){
  var x = HANG.splice(i,1)[0];
  xoaFileHang(x, HANG);
  if(!HANG.length){ dongHop(); veScan(); return; }
  veAnhHang();
}
function boHangCho(){
  hoi('Bỏ hết '+HANG.length+' bản vừa quét?','Các bản này chưa lưu vào tủ nên sẽ mất hẳn.',
    'Bỏ hết', function(){
      HANG.forEach(function(x){ xoaFileHang(x, []); });
      HANG = []; dongHop(); veScan();
    });
}

/* ---- CHỈNH KHUNG BẰNG TAY: kéo 4 góc trên ảnh gốc, có kính lúp phóng to chỗ đang kéo ---- */
var CG = null;
function moChinhGoc(i){
  var x = HANG[i]; if(!x || x.kieu!=='anh') return;
  docAnhHS(x.id+'_goc').then(function(b){
    if(!b) throw new Error('ảnh gốc không còn');
    return anhTuBlob(b);
  }).then(function(im){
    CG = {i:i, im:im, che:x.che, goc:xepGoc4((x.khung||khungMacDinh(im, x.che)).map(function(p){ return [p[0], p[1]]; })), keo:-1};
    moManCG(x.che==='the'?'thẻ':'tờ giấy');
  }).catch(function(er){ baoLoi('Không mở được màn chỉnh khung: '+(er&&er.message||er)); });
}
/* màn kéo 4 góc dùng chung: Scan (HANG) và 3.50 Chữ ký · CCCD (CG.ka) */
function moManCG(vat){
  var e = document.getElementById('cg');
  if(!e){ e = document.createElement('div'); e.id = 'cg'; document.body.appendChild(e); }
  e.innerHTML = '<div class="cg-dau">Kéo chấm tròn vào đúng 4 góc '+vat+
    ' · kéo gạch giữa cạnh để dời cả cạnh · Esc = thôi</div>'+
    '<div class="cg-khung" id="cg-khung"><canvas id="cg-c"></canvas><canvas id="cg-lup" width="132" height="132"></canvas></div>'+
    '<div class="cg-nut"><button class="nho" onclick="cgCaAnh()">Lấy cả ảnh</button>'+
    '<button class="nho" onclick="cgTuTim()">Tự tìm lại</button>'+
    '<button class="nho" id="cg-thang" onclick="cgThang()" title="Tự dò độ nghiêng của chữ và xoay cho thẳng đứng">📐 Làm thẳng</button>'+
    '<button class="nho" onclick="dongChinhGoc()">Thôi</button>'+
    '<button class="nho chinh" onclick="xongChinhGoc()">Xong</button></div>';
  e.classList.add('hien');
  setTimeout(cgDung, 30);
}
function cgDung(){
  if(!CG) return;
  var k = document.getElementById('cg-khung'), c = document.getElementById('cg-c');
  var s = Math.min((k.clientWidth-8)/CG.im.width, (k.clientHeight-8)/CG.im.height);
  CG.s = s; c.width = Math.round(CG.im.width*s); c.height = Math.round(CG.im.height*s);
  c.onpointerdown = function(ev){
    var p = cgDiem(ev), b = -1, bd = 1e9;
    cgDiemKeo().forEach(function(g, j){ var d = Math.hypot(g[0]*CG.s-p[0], g[1]*CG.s-p[1]); if(d<bd){ bd = d; b = j; } });
    if(bd<56){
      CG.keo = b; CG.batDau = {p:p, goc:CG.goc.map(function(g){ return [g[0], g[1]]; })};
      try{ c.setPointerCapture(ev.pointerId); }catch(e){} cgKeo(ev);
    }
    ev.preventDefault();
  };
  c.onpointermove = function(ev){ if(CG && CG.keo>=0){ cgKeo(ev); ev.preventDefault(); } };
  c.onpointerup = c.onpointercancel = function(){ if(CG) CG.keo = -1; var l = document.getElementById('cg-lup'); if(l) l.style.display = 'none'; };
  cgVe();
}
function cgDiem(ev){ var r = document.getElementById('cg-c').getBoundingClientRect(); return [ev.clientX-r.left, ev.clientY-r.top]; }
/* 8 điểm kéo: 0–3 góc, 4–7 giữa cạnh (cạnh j nối góc j và góc j+1) */
function cgDiemKeo(){
  var g = CG.goc;
  return g.concat(g.map(function(a, j){ var b = g[(j+1)%4]; return [(a[0]+b[0])/2, (a[1]+b[1])/2]; }));
}
function cgKeo(ev){
  var p = cgDiem(ev), s = CG.s, W = CG.im.width, H = CG.im.height;
  var kep = function(q){ return [Math.max(0, Math.min(W, q[0])), Math.max(0, Math.min(H, q[1]))]; };
  if(CG.keo<4){
    CG.goc[CG.keo] = kep([p[0]/s, p[1]/s]);
  }else{
    /* kéo giữa cạnh: cả cạnh dời song song (theo hướng vuông góc với cạnh), 2 góc hai đầu đi theo */
    var j = CG.keo-4, g0 = CG.batDau.goc, a = g0[j], b = g0[(j+1)%4];
    var ex = b[0]-a[0], ey = b[1]-a[1], dai = Math.hypot(ex, ey) || 1, nx = -ey/dai, ny = ex/dai;
    var dx = (p[0]-CG.batDau.p[0])/s, dy = (p[1]-CG.batDau.p[1])/s, t = dx*nx + dy*ny;
    CG.goc[j] = kep([a[0]+nx*t, a[1]+ny*t]);
    CG.goc[(j+1)%4] = kep([b[0]+nx*t, b[1]+ny*t]);
  }
  cgVe(); cgLup(p);
}
function cgVe(){
  var c = document.getElementById('cg-c'); if(!c || !CG) return;
  var x = c.getContext('2d'), s = CG.s, g = xepGoc4(CG.goc);
  x.drawImage(CG.im, 0, 0, c.width, c.height);
  x.fillStyle = 'rgba(0,0,0,.45)'; x.beginPath(); x.rect(0, 0, c.width, c.height);
  g.forEach(function(p, j){ if(j) x.lineTo(p[0]*s, p[1]*s); else x.moveTo(p[0]*s, p[1]*s); }); x.closePath(); x.fill('evenodd');
  x.strokeStyle = '#3B9BFF'; x.lineWidth = 2; x.beginPath();
  g.forEach(function(p, j){ if(j) x.lineTo(p[0]*s, p[1]*s); else x.moveTo(p[0]*s, p[1]*s); }); x.closePath(); x.stroke();
  CG.goc.forEach(function(p){ x.beginPath(); x.arc(p[0]*s, p[1]*s, 12, 0, Math.PI*2); x.fillStyle = 'rgba(59,155,255,.35)'; x.fill();
    x.lineWidth = 2.5; x.strokeStyle = '#fff'; x.stroke(); });
  /* điểm giữa cạnh: gạch ngắn nằm dọc theo cạnh */
  cgDiemKeo().slice(4).forEach(function(m, j){
    var a = CG.goc[j], b = CG.goc[(j+1)%4], gl = Math.atan2(b[1]-a[1], b[0]-a[0]);
    x.save(); x.translate(m[0]*s, m[1]*s); x.rotate(gl);
    x.fillStyle = 'rgba(59,155,255,.55)'; x.strokeStyle = '#fff'; x.lineWidth = 2.5;
    x.beginPath(); if(x.roundRect) x.roundRect(-16, -6, 32, 12, 6); else x.rect(-16, -6, 32, 12);
    x.fill(); x.stroke(); x.restore();
  });
}
/* kính lúp: phóng ~2,5 lần vùng quanh góc đang kéo, đặt phía đối diện ngón tay để không bị che */
function cgLup(p){
  var l = document.getElementById('cg-lup'), c = document.getElementById('cg-c'); if(!l) return;
  var x = l.getContext('2d'), g = cgDiemKeo()[CG.keo], vung = 132/(CG.s*2.5);
  x.fillStyle = '#000'; x.fillRect(0, 0, 132, 132);
  x.drawImage(CG.im, g[0]-vung/2, g[1]-vung/2, vung, vung, 0, 0, 132, 132);
  x.strokeStyle = '#3B9BFF'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(66, 50); x.lineTo(66, 82); x.moveTo(50, 66); x.lineTo(82, 66); x.stroke();
  var trai = p[0] > c.width/2;
  l.style.left = trai ? '8px' : 'auto'; l.style.right = trai ? 'auto' : '8px';
  l.style.display = 'block';
}
function cgCaAnh(){ if(!CG) return; var W = CG.im.width, H = CG.im.height; CG.goc = [[0,0],[W,0],[W,H],[0,H]]; cgVe(); }
function cgTuTim(){
  if(!CG) return;
  if(CG.ka && KA.loai==='ky'){ var r = khungKy(CG.im); CG.goc = [[r.x, r.y], [r.x+r.w, r.y], [r.x+r.w, r.y+r.h], [r.x, r.y+r.h]]; return cgVe(); }
  var k = CG.che==='the' ? timKhungThe(CG.im) : timKhungGiay(CG.im);
  if(!k) return bao('Không tự tìm được khung — anh kéo tay giúp.', 4);
  CG.goc = k.goc.map(function(p){ return [p[0], p[1]]; }); cgVe();
}
function dongChinhGoc(){ var e = document.getElementById('cg'); if(e) e.classList.remove('hien'); CG = null; }
/* nút 📐 trong màn kéo viền: bật tự làm thẳng cho ảnh này rồi cắt lại theo khung đang kéo */
function cgThang(){
  if(!CG) return;
  if(CG.ka){ KA.thang = true; return xongChinhGoc(); }
  var x = HANG[CG.i]; if(x) x.thang = true;
  xongChinhGoc();
}
function xongChinhGoc(){
  if(!CG) return;
  if(CG.ka){
    KA.khung = xepGoc4(CG.goc); KA.xoayTay = false; dongChinhGoc();
    batChay(true, 'Đang nắn ảnh…');
    setTimeout(function(){ try{ kaXuLy(); tatChay(); veCatKA(); }catch(e){ tatChay(); baoLoi('Không cắt lại được: '+(e&&e.message||e)); } }, 30);
    return;
  }
  var x = HANG[CG.i]; if(!x){ dongChinhGoc(); return; }
  x.khung = xepGoc4(CG.goc); x.tin = 1; x.xoayTay = false;   /* khung anh chỉnh → tự tìm hướng lại trên khung mới */
  dongChinhGoc(); batChay(true);
  xuLyAnhScan(x, false).then(function(){ tatChay(); veAnhHang(); bao('Đã cắt lại theo khung anh chỉnh.', 3); })
    .catch(function(e){ tatChay(); baoLoi('Không cắt lại được: '+(e&&e.message||e)); });
}

/* ---- TRANG PDF: tham chiếu 'pdf:<nguồn>:<số trang từ 0>:<xoay>' — chép nguyên trang khi dựng, không đổi thành ảnh ---- */
function laTrangPDF(t){ return /^pdf:/.test(t||''); }
function tachTrangPDF(t){ var p = String(t).split(':'); return {nguon:p[1], so:+p[2]||0, xoay:+p[3]||0}; }
function ghepTrangPDF(o){ return 'pdf:'+o.nguon+':'+o.so+':'+(o.xoay||0); }
function hangRaTrang(x){ return x.kieu==='trang' ? ghepTrangPDF(x) : x.id; }
var PDF_NHO = {};   /* tài liệu pdf.js đã mở, theo nguồn */
function moPDFNguon(nguon){
  if(PDF_NHO[nguon]) return PDF_NHO[nguon];
  if(!sanSangPDF()) return Promise.reject(new Error('Chưa tải được bộ đọc PDF'));
  PDF_NHO[nguon] = docFile('hs_'+nguon).then(function(b){ if(!b) throw new Error('Không còn file PDF gốc'); return b.arrayBuffer(); })
    .then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; });
  PDF_NHO[nguon].catch(function(){ delete PDF_NHO[nguon]; });
  return PDF_NHO[nguon];
}
function anhTrangPDF(t, rong){
  var o = tachTrangPDF(t);
  return moPDFNguon(o.nguon).then(function(doc){ return doc.getPage(o.so+1); }).then(function(pg){
    var q = ((pg.rotate||0)+o.xoay)%360, vp0 = pg.getViewport({scale:1, rotation:q});
    var vp = pg.getViewport({scale:(rong||360)/vp0.width, rotation:q});
    var c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
    return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return c.toDataURL('image/jpeg', 0.8); });
  });
}
function demTrangPDF(nguon){
  return moPDFNguon(nguon).then(function(d){ return d.numPages; }).catch(function(){
    if(!window.PDFLib) throw new Error('Chưa tải được bộ đọc PDF');
    return docFile('hs_'+nguon).then(function(b){ return b.arrayBuffer(); })
      .then(function(ab){ return PDFLib.PDFDocument.load(ab, {ignoreEncryption:true}); })
      .then(function(d){ return d.getPageCount(); });
  });
}
/* cất file PDF làm nguồn rồi trả về danh sách tham chiếu từng trang */
function catPDFNguon(f){
  var nguon = 'pdf'+idMoi();
  return luuFile('hs_'+nguon, f).then(function(){ return demTrangPDF(nguon); }).then(function(n){
    var ds = []; for(var i=0;i<n;i++) ds.push({nguon:nguon, so:i, xoay:0});
    return ds;
  });
}
function themPDFVaoHang(f){
  return catPDFNguon(f).then(function(ds){
    ds.forEach(function(o){ HANG.push({id:'p'+idMoi(), kieu:'trang', nguon:o.nguon, so:o.so, xoay:0, ten:f.name+' · tr. '+(o.so+1)}); });
  });
}
function chonTepPDF(xong){
  var i = document.createElement('input'); i.type = 'file'; i.accept = '.pdf,application/pdf'; i.multiple = true;
  i.onchange = function(){ var fs = Array.prototype.slice.call(i.files); if(fs.length) xong(fs); };
  i.click();
}
function chonPDFHang(){
  chonTepPDF(function(fs){
    batChay(true);
    fs.reduce(function(p, f){ return p.then(function(){ return themPDFVaoHang(f); }); }, Promise.resolve())
      .then(function(){ tatChay(); moHangCho(); bao('Đã thêm các trang PDF vào cuối — dời ◀ ▶ để chèn vào chỗ cần.', 6); })
      .catch(function(e){ tatChay(); baoLoi('Không đọc được PDF: '+(e&&e.message||e)); });
  });
}

/* ---- DỰNG PDF ----
   Thẻ: mỗi A4 4 người × 2 mặt (trước | sau). Anh Nhân chốt:
   - thẻ in to hơn thẻ thật cho dễ đọc, giữ đúng tỉ lệ; 4 người một trang là đủ; xếp từ trên xuống;
   - chừa chỗ để CẮT: lề giấy 10 mm (máy in nào cũng in tới), khe giữa các thẻ đều 14 mm cả ngang lẫn dọc (3.37: nới từ 8 mm),
     dấu cắt ở 4 góc mỗi thẻ (vạch mảnh nằm ngoài thẻ) để cắt ra các mép đều nhau.
   dsCap = [{truoc:id ảnh, sau:id ảnh, nhan:'chữ không dấu'}] */
function dungPDFThe(dsCap, tieuDe){
  /* 3.38: thẻ 92 × 58 mm (to hơn thẻ thật), 2 mặt sát nhau (khe giữa 6 mm), 4 người/A4 xếp từ trên xuống,
     khe giữa các người ≈ 15 mm để cắt và ghi tên. Dấu cắt: mỗi đường cắt chỉ 1 vạch ở đầu, giữa, cuối (nằm ngoài thẻ) */
  var mm = 2.834645669, A4 = {r:210*mm, c:297*mm}, MOI = 4, ch = cauHinhInThe();   /* 3.40: cỡ thẻ, khe chỉnh ở Cài đặt › Scan */
  var le = 10*mm, kheGiua = ch.khe*mm, tl = THE_MM.rong/THE_MM.cao;
  var tR = ch.rong*mm, tC = tR/tl;
  /* 3.44: khe giữa các người 12 mm, cả khối căn giữa trang → đường cắt ngoài cùng cách mép giấy ≈ 8 mm (máy in in tới được) */
  var khe = 12*mm;
  le = (A4.c - MOI*tC - (MOI-1)*khe)/2;
  if(le < 14*mm){ le = 14*mm; tC = (A4.c - 2*le - (MOI-1)*khe)/MOI; tR = tC*tl; }
  var xT = (A4.r - (2*tR + kheGiua))/2;
  var mau = PDFLib.rgb(.6,.6,.6);
  /* hình cái kéo vẽ bằng nét (chữ ✂ không có trong phông PDF chuẩn): 2 vòng tay cầm + 2 lưỡi chéo */
  function veKeo(tg, x, y){
    var r = 1.1*mm;
    tg.drawCircle({x:x+r, y:y+1.5*mm, size:r, borderColor:mau, borderWidth:.6});
    tg.drawCircle({x:x+r, y:y-1.5*mm, size:r, borderColor:mau, borderWidth:.6});
    tg.drawLine({start:{x:x+2*r, y:y+1.1*mm}, end:{x:x+7*mm, y:y-0.9*mm}, thickness:.7, color:mau});
    tg.drawLine({start:{x:x+2*r, y:y-1.1*mm}, end:{x:x+7*mm, y:y+0.9*mm}, thickness:.7, color:mau});
  }
  function duongCat(tg, y){
    veKeo(tg, 4*mm, y);
    tg.drawLine({start:{x:12.5*mm, y:y}, end:{x:A4.r - 5*mm, y:y}, thickness:.4, color:mau, dashArray:[3, 2.5]});
  }
  return PDFLib.PDFDocument.create().then(function(pdf){
    return pdf.embedFont(PDFLib.StandardFonts.Helvetica).then(function(font){
      var trang = null;
      return dsCap.reduce(function(p, cap, i){
        return p.then(function(){
          var hang = i % MOI;
          if(hang===0){
            trang = pdf.addPage([A4.r, A4.c]);
            /* 3.44 (anh Nhân): PDF không in thêm chữ gì — bỏ dòng tiêu đề */
          }
          var y = A4.c - le - hang*(tC+khe) - tC, tg = trang;
          dangLamChu('Đang dựng PDF · người '+(i+1)+'/'+dsCap.length+'…'); tienChay(Math.round(i/dsCap.length*100));
          return Promise.all([cap.truoc ? docAnhHS(cap.truoc).then(function(b){ return thuChoPDF(b, cap.truoc, 1000); }) : null,
                              cap.sau ? docAnhHS(cap.sau).then(function(b){ return thuChoPDF(b, cap.sau, 1000); }) : null]).then(function(anh){
            return anh.reduce(function(pp, b, k){
              return pp.then(function(){
                if(!b) return;
                return b.arrayBuffer().then(function(buf){ return pdf.embedJpg(buf); }).then(function(im){
                  var x = xT + k*(tR + kheGiua);
                  tg.drawImage(im, {x:x, y:y, width:tR, height:tC});
                });
              });
            }, Promise.resolve());
          }).then(function(){
            /* 3.45 (anh Nhân chốt): chỉ ĐƯỜNG NGANG ĐỨT QUÃNG nằm giữa khe giữa 2 người + hình cái kéo ở đầu trái.
               Không đường dọc, không đường ngoài cùng; 2 mặt của một người để liền nhau. */
            if(hang>0) duongCat(tg, y + tC + khe/2);
          });
        });
      }, Promise.resolve()).then(function(){ return pdf.save(); });
    });
  });
}
/* Tài liệu: ảnh → một trang A4 (ảnh ngang thì trang ngang), căn giữa; trang PDF gốc → chép nguyên trang, xoay theo anh chỉnh */
function dungPDFTaiLieu(dsTrang){
  var mm = 2.834645669, A4 = {r:210*mm, c:297*mm}, le = 8*mm, nguon = {};
  return PDFLib.PDFDocument.create().then(function(pdf){
    return dsTrang.reduce(function(p, t, iT){
      return p.then(function(){
        dangLamChu('Đang dựng PDF · trang '+(iT+1)+'/'+dsTrang.length+'…'); tienChay(Math.round(iT/dsTrang.length*100));
        if(laTrangPDF(t)){
          var o = tachTrangPDF(t);
          if(!nguon[o.nguon]) nguon[o.nguon] = docFile('hs_'+o.nguon).then(function(b){
              if(!b) throw new Error('Không còn file PDF gốc'); return b.arrayBuffer(); })
            .then(function(ab){ return PDFLib.PDFDocument.load(ab, {ignoreEncryption:true}); });
          return nguon[o.nguon].then(function(src){ return pdf.copyPages(src, [o.so]); }).then(function(ps){
            var pg = ps[0];
            if(o.xoay) pg.setRotation(PDFLib.degrees((((pg.getRotation().angle||0) + o.xoay)%360)));
            pdf.addPage(pg);
          }).catch(function(e){ console.warn(e); });
        }
        return docAnhHS(t).then(function(b){ return thuChoPDF(b, t, 1800); }).then(function(b){
          if(!b) return;
          return b.arrayBuffer().then(function(buf){ return pdf.embedJpg(buf); }).then(function(im){
            var ngang = im.width > im.height*1.05, W = ngang ? A4.c : A4.r, H = ngang ? A4.r : A4.c;
            var tr = pdf.addPage([W, H]), rong = W - le*2, cao = rong*im.height/im.width;
            if(cao > H - le*2){ cao = H - le*2; rong = cao*im.width/im.height; }
            tr.drawImage(im, {x:(W-rong)/2, y:(H-cao)/2, width:rong, height:cao});
          });
        }).catch(function(e){ console.warn(e); });
      });
    }, Promise.resolve()).then(function(){
      if(pdf.getPageCount()===0) throw new Error('không có trang nào');
      return pdf.save();
    });
  });
}
var NHAC_IN_THE = 'Khi in chọn “Kích thước thật / 100%” để trang in đúng như bản xem trước.';

/* in ngay, không lưu gì */
function capTuHang(){
  var anh = HANG.filter(function(x){ return x.kieu==='anh'; }), ra = [];
  for(var i=0;i<anh.length;i+=2) ra.push({truoc:anh[i].id, sau:anh[i+1] ? anh[i+1].id : '', nhan:''});
  return ra;
}
/* 3.41: điện thoại chưa nối máy in thì in không ra giấy — trình duyệt KHÔNG báo in được hay không.
   Nên hỏi trước: mặc định LƯU TẠM rồi mới in; "chỉ in" thì hàng chờ vẫn giữ nguyên để in lại hoặc lưu sau. */
function dungPDFHang(){
  var ds = HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; });
  return SC.che==='the' ? dungPDFThe(capTuHang(), '') : dungPDFTaiLieu(ds.map(hangRaTrang));
}
/* điện thoại: bảng chia sẻ (Lưu vào Tệp, Zalo, email…); máy tính: tải file về */
function chiaSePDF(bl, ten){
  var f = new File([bl], ten, {type:'application/pdf'});
  if(navigator.canShare && navigator.canShare({files:[f]}))
    return navigator.share({files:[f], title:ten}).catch(function(){});
  var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = ten;
  document.body.appendChild(a); a.click(); thuHoiSau(a.href); setTimeout(function(){ a.remove(); }, 1000);
  bao('Đã tải về: '+ten, 5);
}

/* ---- 3.41: hàng chờ không mất khi trang tải lại (điện thoại hay tải lại khi chuyển qua bảng in / chia sẻ).
   Ảnh đã nằm trong máy (hs_<id>, hs_<id>_goc) — chỉ cần nhớ danh sách. ---- */
var KHOA_HANG = 'tuhoso_hang';
function ghiHang(){
  try{
    var ds = HANG.filter(function(x){ return x.kieu!=='file'; });
    var cu = null; try{ cu = JSON.parse(localStorage.getItem(KHOA_HANG)||'null'); }catch(e){}
    if(ds.length) localStorage.setItem(KHOA_HANG, JSON.stringify({che:SC.che, ds:ds, luc:(cu && cu.luc) || new Date().toISOString(), cham:new Date().toISOString()}));   /* 3.395: cham = lần đụng gần nhất (scanCuSot) */   /* 3.155: mốc bắt đầu phiên — quá 7 ngày tự bỏ */
    else localStorage.removeItem(KHOA_HANG);
  }catch(e){}
}
function napHangCu(){
  try{
    var j = JSON.parse(localStorage.getItem(KHOA_HANG)||'null');
    if(j && j.ds && j.ds.length && j.luc && Date.now()-new Date(j.luc).getTime() > (typeof SC_LOAI!=='undefined' ? 864e5 : 7*864e5)){ j.ds.forEach(function(x){ xoaFileHang(x, []); }); localStorage.removeItem(KHOA_HANG); return; }   /* 3.155 */
    if(j && j.ds && j.ds.length && !HANG.length){ HANG = j.ds; if(j.che) SC.che = j.che; }
  }catch(e){}
}
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') ghiHang(); });
window.addEventListener('pagehide', ghiHang);
