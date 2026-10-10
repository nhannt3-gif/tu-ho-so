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
    themPhu:'<button class="phu" onclick="chonCheScan()">Chế độ: '+
            (SC.che==='the'?'Thẻ':'Tài liệu')+'</button>'+
            (coCamera() ? '<button class="phu" onclick="moCamera({muc:\'scan\'})">📷 Webcam</button>' : '')+
            '<button class="phu" onclick="moKyAnh()">📁 Chữ ký · CCCD</button>'});

  /* 3.33: lời nhắc nhỏ thay khung vàng cảnh báo */
  h += '<div class="huong-dan tab-ghi-chu-scan" style="margin:0 0 8px">Ảnh xử lý trong máy, không gửi tới AI · lưu hồ sơ là bản PDF lên Drive: '+
    '<b>Tủ hồ sơ/CCCD</b> (thẻ) và <b>Tủ hồ sơ/Hồ sơ scan</b> (tài liệu), chia theo xã › điểm › ấp › tổ.</div>';

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
  var nTD = (typeof NO_SAN==='undefined' || NO_SAN) ? goiYTenCoDau().length : 0;   /* 3.84 */
  if(nTD) h += '<div class="thanh-chon"><span>✍ <b>'+nTD+'</b> bản scan tên không dấu — có thể đổi theo tên khách trong Theo dõi nợ</span><button onclick="moTenCoDau()">Xem & đổi</button></div>';
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
  var dk = dangLoc('scan');
  h += '<div class="sc-xem">'+
    '<span class="nhom-nut"><button class="'+(xem==='ds'?'bat':'')+'" onclick="datXemScan(\'scanXem\',\'ds\')">☰ Danh sách</button>'+
      '<button class="'+(xem==='cay'?'bat':'')+'" onclick="datXemScan(\'scanXem\',\'cay\')">🌳 Cây địa bàn</button></span>'+
    (xem==='ds' ? '<span class="nhom-nut">'+[['ngay','Ngày'],['tuan','Tuần'],['thang','Tháng']].map(function(x){
        return '<button class="'+(nhom===x[0]?'bat':'')+'" onclick="datXemScan(\'scanNhom\',\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</span>' : '')+
    (soCD ? '<button class="chip-cd'+(HS.chuaDat?' bat':'')+'" onclick="HS.chuaDat=!HS.chuaDat;veScan()" title="Chỉ hiện bản còn thiếu">⚠ Chưa đạt ('+soCD+')</button>'
          : (dsGoc.length ? '<span class="chip-dat">✓ Tất cả đã đạt</span>' : ''))+
    '<span class="sc-dem">'+ds.length+' bản'+(dk.length ? ' · '+coChuHTML(dk.join(' · '))+' <span class="xoa-loc" onclick="boLoc(\'scan\')">bỏ lọc</span>' : '')+'</span></div>';
  if(xem==='cay') h += veCayScan(dsGoc);
  if(HS.cay) h += '<div class="sc-loc-cay">🌳 Đang xem: <b>'+coChuHTML(nhanCayScan(HS.cay))+'</b> <span class="xoa-loc" onclick="HS.cay=null;veScan()">bỏ lọc</span></div>';
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
      '<button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" id="kl-luu" onclick="luuKhaiHangLoat()">Khai các bản đã chọn</button></div>', true);
  demKL();
  ds.forEach(function(k, i){
    var im = document.getElementById('kl-a'+i); if(!im) return;
    var t = k.che==='tailieu' ? (k.trang||[])[0] : (k.matTruoc ? k.id+'_matTruoc' : '');
    if(!t) return;
    if(k.che==='tailieu' && typeof anhTrangHS==='function') return anhTrangHS(t, im);
    docAnhHS(t).then(function(b){ if(b) im.src = URL.createObjectURL(b); });
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
function doiDBKL(){ doiDB.apply(null, arguments); }

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
      '<button class="nho" onclick="dongHop()">Đóng</button></div>');
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
      '<button class="nho" onclick="dongHop()">Thôi</button></div>');
}

function chonNguon(n){
  D.cauHinh.scanNguon = n; luu(); dongHop();
  if(n==='camera' && !laDT() && coCamera()) return moCamera({muc:'scan'});   /* 3.45: máy bàn — webcam trong app */
  var i = document.createElement('input');
  i.type = 'file';
  if(n==='file'){ i.accept = '.pdf,.doc,.docx'; i.multiple = true; }
  else if(n==='camera'){ i.accept = 'image/*'; i.capture = 'environment'; }
  else { i.accept = 'image/*'; i.multiple = true; }
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
function nhanVaoScan(fs, nguon){
  var che = SC.che==='the' ? 'the' : 'tailieu', soPDFBo = 0, moi = [];
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
        .then(function(){ HANG.push(x); moi.push(x); });
    });
  }, Promise.resolve()).then(function(){
    if(che==='the') xepCapThe(moi);
    tatChay(); moHangCho();
    var xem = HANG.filter(canXemLai).length;
    bao('Đã tự cắt, nắn và làm đẹp.'+(xem ? ' '+xem+' ảnh có dấu ⚠ nên bấm ✂ xem lại khung.' : '')+
      (soPDFBo ? ' Bỏ qua '+soPDFBo+' file PDF — PDF dùng ở chế độ Tài liệu.' : ''), 7);
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
        '<b>Chạm 1 ảnh rồi chạm ảnh khác</b> để đổi chỗ (kể cả giữa 2 người)'+(laDT()?'':', hoặc kéo thả')+' · ▲▼ dời cả người · ⇄ đổi mặt · ảnh gốc bên phải: bấm để kéo viền.'
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
    '<div class="hop-phu">Đúng bản sẽ lưu, in và gửi. Chưa vừa ý thì bấm <b>‹ Chỉnh tiếp</b>; đạt thì bấm <b>Tiếp</b> — app lưu tạm ngay cho an toàn.</div>'+
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
/* ③ — lưu tạm (tên "Scan ngày giờ") rồi sang màn Lưu & gửi, dùng lại đúng bản PDF vừa xem (không dựng lại) */
function tiepHang(){
  if(coTheNoiDrive() && !DR.sanSang && !DR.dangNoi) noiDrive(true).catch(function(){});   /* 3.48: tranh thủ lần bấm để nối Drive */
  var bl = XH && XH.bl;
  SAU_LUU_TAM = function(ds){ moXemPDF(ds.map(function(k){ return k.id; }), true, bl); };
  Promise.resolve(luuSauHang()).catch(function(){ SAU_LUU_TAM = null; });
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
    cu += '<button onclick="dichHang('+i+',-1)" title="Dời lên trước"'+(i===0?' disabled':'')+'>◀</button>'+
          '<button onclick="dichHang('+i+',1)" title="Dời ra sau"'+(i===HANG.length-1?' disabled':'')+'>▶</button>';
    if(la) cu += '<button onclick="moChinhGoc('+i+')" title="Kéo viền cắt trên ảnh gốc">✂ Chỉnh viền</button>';
    if(laThe && la) cu += '<button onclick="doiMatHang('+i+')" title="Đổi mặt trước ↔ mặt sau trong cặp">⇄</button>';
    if(!laThe && x.kieu!=='file') cu += '<button onclick="xoayHang('+i+',90)" title="Xoay 90°">⟲</button>';
    if(x.kieu!=='file') cu += '<button onclick="xoayHang('+i+',180)" title="Lật ngược 180°">⇅</button>';
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
  document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 1000);
  bao('Đã tải về: '+ten, 5);
}

/* ---- 3.41: hàng chờ không mất khi trang tải lại (điện thoại hay tải lại khi chuyển qua bảng in / chia sẻ).
   Ảnh đã nằm trong máy (hs_<id>, hs_<id>_goc) — chỉ cần nhớ danh sách. ---- */
var KHOA_HANG = 'tuhoso_hang';
function ghiHang(){
  try{
    var ds = HANG.filter(function(x){ return x.kieu!=='file'; });
    if(ds.length) localStorage.setItem(KHOA_HANG, JSON.stringify({che:SC.che, ds:ds}));
    else localStorage.removeItem(KHOA_HANG);
  }catch(e){}
}
function napHangCu(){
  try{
    var j = JSON.parse(localStorage.getItem(KHOA_HANG)||'null');
    if(j && j.ds && j.ds.length && !HANG.length){ HANG = j.ds; if(j.che) SC.che = j.che; }
  }catch(e){}
}
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') ghiHang(); });
window.addEventListener('pagehide', ghiHang);

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
    '<div class="sc-che">'+
      '<button class="'+(SC.che==='the'?'bat':'')+'" onclick="datChe(\'the\')">Thẻ</button>'+
      '<button class="'+(SC.che!=='the'?'bat':'')+'" onclick="datChe(\'tailieu\')">Tài liệu</button></div>'+
    '<button class="sc-nho" onclick="moKyAnh()" title="Chữ ký · CCCD — thư mục riêng">📁</button>'+
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
function xongScan(){ xemTruocHang(); }
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
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Vào Cài đặt › Google Drive để nối.');
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
    '<div class="hop-phu">JPG dưới 200 KB để nhập hệ thống khi tạo hồ sơ. Lưu xong tự đưa lên Drive, mỗi tháng một thư mục: <b>'+
      coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ')+' / Chữ ký - CCCD / '+thang+'</b>.</div>'+
    '<div class="hang-nut" style="margin:0 0 8px"><button class="nho" onclick="moThuMucKA()">☁ Mở thư mục tháng '+thang.slice(5)+'/'+thang.slice(0,4)+' trên Drive</button>'+
      (D.kyAnh.length ? nutBot('kyAnh') : '')+'<button class="nho" onclick="moHuongDan(\'kyAnh\')">❓</button></div>'+thanhBot('kyAnh')+
    '<div class="cam-kieu">Chụp: '+nutKieuCam()+'</div>'+
    '<div class="o"><label>Tên khách</label><input id="ka-ten" value="'+coChuHTML(tenKhachKA())+'" placeholder="Ví dụ: Nguyễn Văn A" '+
      'oninput="KA.ten=this.value;KA.tenLuc=Date.now()"></div>'+
    '<div class="ka-nut">'+
      '<button class="nho chinh" onclick="chupKA(\'ky\',\'camera\')">✍ Chụp chữ ký</button>'+
      '<button class="nho chinh" onclick="chupKA(\'anh\',\'camera\')">🪪 Chụp CCCD<br><small>mặt trước</small></button></div>'+
    '<div class="hang-nut" style="margin-top:6px"><button class="nho" onclick="chupKA(\'ky\',\'photo\')">🖼 Chữ ký từ ảnh có sẵn</button>'+
      '<button class="nho" onclick="chupKA(\'anh\',\'photo\')">🖼 CCCD từ ảnh có sẵn</button></div>'+
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
  var i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
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
      '<button class="nho" onclick="chupKA(\'anh\',\'camera\')" title="Chụp tiếp CCCD khách khác">🪪 CCCD</button>'+
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
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Vào Cài đặt › Google Drive để nối.');
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
  document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 1000);
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

/* ==========================================================
   3.45: CAMERA TRONG APP — dùng chung iPhone và máy bàn có webcam.
   - Tự động (như Lens): dò khung thẻ / tờ giấy ~5 lần mỗi giây, khung xanh bám theo; đứng yên ~1 giây là tự chụp,
     rồi chờ cảnh thay đổi (lật mặt, đổi tờ) mới chụp tiếp. Chữ ký không có khung → chụp khi ảnh đứng yên.
   - Thủ công: nút chụp (máy bàn thêm phím cách). iPhone: chế độ Thủ công dùng camera gốc của máy (ảnh nét nhất).
   - Chụp xong đi tiếp đúng luồng cũ: Scan → hàng chờ; Chữ ký / CCCD → màn cắt vừa → lưu.
   Giới hạn trình duyệt: không điều khiển tiêu cự, đèn flash; ảnh kém camera gốc một chút.
   ========================================================== */
var CAM = {on:false};
function coCamera(){ return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia); }
function camTuDong(){ return D.cauHinh.camTuDong!==false; }
/* 3.75 (AP): thời gian giữ yên trước khi tự chụp — ⚡ Nhanh 0,5s (mặc định) / Vừa 0,8s / Chắc 1,2s; nhớ theo máy */
var CAM_GIU_DS = [500, 800, 1200];
function camGiu(){ var v = +D.cauHinh.camGiu; return CAM_GIU_DS.indexOf(v)>=0 ? v : 500; }
function doiGiuCam(){ var i = CAM_GIU_DS.indexOf(camGiu()); D.cauHinh.camGiu = CAM_GIU_DS[(i+1)%CAM_GIU_DS.length]; luu(); veThanhCam(); goiCam(); }
function nhanGiuCam(){ var v = camGiu(); return (v===500?'⚡ Nhanh':v===800?'Vừa':'Chắc')+' '+String(v/1000).replace('.', ',')+'s'; }
/* độ nét: phương sai Laplace trên ảnh thu nhỏ (kênh xanh lá) — càng lớn càng nét */
function doNetCam(c){
  var w = 320, h = Math.max(2, Math.round(320*c.height/c.width));
  var t = CAM.netC || (CAM.netC = document.createElement('canvas')); t.width = w; t.height = h;
  var g = t.getContext('2d'); g.drawImage(c, 0, 0, w, h);
  var d = g.getImageData(0, 0, w, h).data, s = 0, s2 = 0, n = 0, r = w*4;
  for(var y=1;y<h-1;y+=2) for(var x=1;x<w-1;x+=2){
    var i = (y*w+x)*4+1, v = 4*d[i]-d[i-4]-d[i+4]-d[i-r]-d[i+r]; s += v; s2 += v*v; n++; }
  if(!n) return 0; var m = s/n; return s2/n - m*m;
}
function nutKieuCam(){
  var td = camTuDong();
  return '<button class="'+(td?'bat':'')+'" onclick="datKieuCam(true)">⚡ Tự động</button>'+
    '<button class="'+(!td?'bat':'')+'" onclick="datKieuCam(false)">✋ Thủ công'+(laDT()?' (camera máy)':'')+'</button>';
}
function datKieuCam(v){
  D.cauHinh.camTuDong = !!v; luu();
  document.querySelectorAll('.cam-kieu').forEach(function(e){ e.innerHTML = 'Chụp: '+nutKieuCam(); });
  if(CAM.on){ CAM.tuDong = !!v; veThanhCam(); }
}
function moCamera(o){
  if(!coCamera()) return baoLoi('Trình duyệt này không mở được camera trong app — dùng chụp bằng camera máy.');
  if(!HS.mo) return moHoSo();
  dongHop();
  CAM = {on:true, muc:o.muc, che:o.muc==='scan' ? (SC.che==='the'?'the':'tailieu') : (o.muc==='cccd'?'the':'ky'),
    tuDong:o.tuDong!==undefined ? o.tuDong : camTuDong(), anh:[], quad:null, yen:0, sanSang:true, tr:0, xam:null, dong:0};
  var e = document.createElement('div'); e.id = 'cam';
  e.innerHTML = '<div class="cam-tren"><button onclick="dongCam()">✕</button>'+
      '<span id="cam-tieu"></span><select id="cam-chon" onchange="doiCamMay(this.value)" style="display:none"></select></div>'+
    '<div class="cam-khung"><video id="cam-v" playsinline muted autoplay></video><canvas id="cam-o"></canvas><div id="cam-loe"></div></div>'+
    '<div id="cam-goi" class="cam-goi"></div>'+
    '<div class="cam-duoi"><div class="cam-nho" id="cam-nho"></div>'+
      '<button class="cam-chup" onclick="chupCam()" title="Chụp (phím cách)"></button>'+
      '<button class="cam-xong" id="cam-xong" onclick="xongCam()">Xong</button></div>'+
    '<div class="cam-kieu cam-kieu-tren" id="cam-kieu"></div>';
  document.body.appendChild(e);
  document.addEventListener('keydown', phimCam);
  veThanhCam(); batCam();
}
function veThanhCam(){
  var t = document.getElementById('cam-tieu'); if(!t) return;
  t.textContent = {scan:(CAM.che==='the'?'Quét thẻ':'Quét tài liệu'), ky:'Chụp chữ ký', cccd:'Chụp CCCD mặt trước'}[CAM.muc]+
    (CAM.anh.length ? ' · '+CAM.anh.length+' ảnh' : '');
  var k = document.getElementById('cam-kieu');
  if(k) k.innerHTML = '<button class="'+(CAM.tuDong?'bat':'')+'" onclick="CAM.tuDong=true;D.cauHinh.camTuDong=true;luu();veThanhCam()">⚡ Tự động</button>'+
    '<button class="'+(!CAM.tuDong?'bat':'')+'" onclick="doiThuCongCam()">✋ Thủ công</button>'+
    (CAM.tuDong ? '<button onclick="doiGiuCam()" title="Giữ yên bao lâu thì tự chụp — bấm để đổi: Nhanh 0,5s · Vừa 0,8s · Chắc 1,2s">⏱ '+nhanGiuCam()+'</button>' : '');
  var x = document.getElementById('cam-xong'); if(x) x.style.visibility = (CAM.muc==='scan' && CAM.anh.length) ? 'visible' : 'hidden';
  goiCam();
}
/* iPhone: Thủ công = camera gốc của máy (anh chốt); máy bàn: vẫn ở màn webcam, bấm nút chụp */
function doiThuCongCam(){
  D.cauHinh.camTuDong = false; luu();
  if(laDT()){
    var anh = CAM.anh.slice(), muc = CAM.muc; dongCam();
    if(muc==='scan'){ if(anh.length) nhanVaoScan(anh, 'camera'); else chonNguon('camera'); }
    else chupKA(muc==='ky'?'ky':'anh', 'camera');
    return;
  }
  CAM.tuDong = false; veThanhCam();
}
function goiCam(txt){
  var g = document.getElementById('cam-goi'); if(!g) return;
  if(txt){ g.textContent = txt; return; }
  var n = CAM.anh.length;
  g.textContent = !CAM.tuDong ? 'Bấm nút tròn để chụp'+(laDT()?'':' (hoặc phím cách)')
    : CAM.muc==='ky' ? 'Giữ yên máy trên chữ ký — tự chụp'
    : CAM.che==='the' ? (CAM.muc==='cccd' ? 'Đưa mặt trước CCCD vào khung — tự chụp khi thấy khung xanh'
                         : (n%2===0 ? 'Người '+(n/2+1)+': mặt trước — giữ yên khi khung xanh' : 'Lật mặt sau'))
    : 'Trang '+(n+1)+': đặt tờ giấy trên nền tối — giữ yên '+String(camGiu()/1000).replace('.', ',')+' giây khi khung xanh';
}
function batCam(id){
  var v = document.getElementById('cam-v'); if(!v) return;
  if(CAM.st) CAM.st.getTracks().forEach(function(t){ t.stop(); });
  id = id || D.cauHinh.camId || '';
  var rb = {width:{ideal:1920}, height:{ideal:1080}};
  if(id) rb.deviceId = {exact:id}; else rb.facingMode = {ideal:'environment'};
  navigator.mediaDevices.getUserMedia({video:rb, audio:false}).catch(function(e){
    if(id){ D.cauHinh.camId = ''; return navigator.mediaDevices.getUserMedia({video:{width:{ideal:1920}, height:{ideal:1080}}, audio:false}); }
    throw e;
  }).then(function(st){
    if(!CAM.on){ st.getTracks().forEach(function(t){ t.stop(); }); return; }
    CAM.st = st; v.srcObject = st; var p = v.play(); if(p && p.catch) p.catch(function(){});
    try{   /* 3.75: máy hỗ trợ thì bật lấy nét liên tục — đỡ phải chờ lấy nét lại khi tay xê dịch */
      var tr = st.getVideoTracks()[0], kh = tr.getCapabilities ? tr.getCapabilities() : null;
      if(kh && kh.focusMode && kh.focusMode.indexOf('continuous')>=0) tr.applyConstraints({advanced:[{focusMode:'continuous'}]}).catch(function(){});
    }catch(e){}
    navigator.mediaDevices.enumerateDevices().then(function(ds){
      var cam = ds.filter(function(d){ return d.kind==='videoinput'; }), sel = document.getElementById('cam-chon');
      if(!sel || cam.length<2) return;
      var dang = (st.getVideoTracks()[0].getSettings()||{}).deviceId;
      sel.innerHTML = cam.map(function(d, i){ return '<option value="'+d.deviceId+'"'+(d.deviceId===dang?' selected':'')+'>'+
        coChuHTML(d.label || ('Camera '+(i+1)))+'</option>'; }).join('');
      sel.style.display = '';
    }).catch(function(){});
    clearTimeout(CAM.hen); vongCam();
  }).catch(function(e){
    dongCam();
    var ly = /NotAllowed|Permission/i.test(e&&e.name||'') ? 'Chưa cho phép dùng camera — bấm biểu tượng camera trên thanh địa chỉ để cho phép.'
      : /NotFound|Overconstrained/i.test(e&&e.name||'') ? 'Không thấy camera nào.' : ('Không mở được camera: '+(e&&e.message||e));
    baoLoi(ly+' Tạm dùng chọn ảnh có sẵn.');
  });
}
function doiCamMay(id){ D.cauHinh.camId = id; luu(); batCam(id); }
function vongCam(){
  if(!CAM.on) return;
  var t0 = performance.now();
  try{ khungCam(); }catch(e){ console.warn(e); }
  var ton = performance.now()-t0;
  CAM.hen = setTimeout(vongCam, Math.max(30, 100-ton));   /* 3.75: dò ~10 lần/giây (trước 5) */
}
function khungCam(){
  var v = document.getElementById('cam-v'); if(!v || v.readyState<2 || !v.videoWidth) return;
  var W = v.videoWidth, H = v.videoHeight, k = Math.min(1, 640/Math.max(W, H));
  var c = CAM.nho || (CAM.nho = document.createElement('canvas')); c.width = Math.round(W*k); c.height = Math.round(H*k);
  var g = c.getContext('2d'); g.drawImage(v, 0, 0, c.width, c.height);
  /* chuyển động: so ảnh xám 48×36 với khung trước */
  var t = CAM.tiny || (CAM.tiny = document.createElement('canvas')); t.width = 48; t.height = 36;
  var tg = t.getContext('2d'); tg.drawImage(c, 0, 0, 48, 36);
  var d = tg.getImageData(0, 0, 48, 36).data, xam = new Uint8Array(48*36), tong = 0;
  for(var i=0;i<xam.length;i++){ xam[i] = (d[i*4]*.3+d[i*4+1]*.59+d[i*4+2]*.11)|0; if(CAM.xam) tong += Math.abs(xam[i]-CAM.xam[i]); }
  CAM.dong = CAM.xam ? tong/xam.length : 99; CAM.xam = xam;
  var bay = performance.now(), dt = CAM.tr ? bay-CAM.tr : 0; CAM.tr = bay;
  var q = null;
  if(CAM.che!=='ky'){
    var r = CAM.che==='the' ? timKhungThe(c) : timKhungGiay(c);
    if(r && r.goc && r.tin >= (CAM.che==='the' ? 0.5 : 0.6)){
      q = r.goc.map(function(p){ return [p[0]/k, p[1]/k]; });
      if(dienTich(q) < W*H*0.05) q = null;   /* quá nhỏ — đưa lại gần */
    }
  }
  /* 3.75 (AP): nới ngưỡng rung tay (lệch khung 2,5% → 4%, chuyển động 8 → 12) */
  var dg = Math.hypot(W, H), yenQ = q && CAM.quad && q.every(function(p, j){ return Math.hypot(p[0]-CAM.quad[j][0], p[1]-CAM.quad[j][1]) < dg*0.04; });
  var yen = CAM.che==='ky' ? CAM.dong < 5 : (yenQ && CAM.dong < 12);
  CAM.yen = yen ? CAM.yen + dt : 0;
  CAM.quad = q;
  /* trong lúc giữ yên: nhớ khung hình NÉT NHẤT (cỡ thật) để chụp — không lấy đúng khung lúc tay vừa run */
  if(!yen || !CAM.sanSang){ CAM.netTot = -1; CAM.tot = null; }
  else if(CAM.tuDong && (q || CAM.che==='ky')){
    var net = doNetCam(c);
    if(net > (CAM.netTot||-1)){
      CAM.netTot = net;
      var tc = document.createElement('canvas'); tc.width = W; tc.height = H; tc.getContext('2d').drawImage(v, 0, 0, W, H); CAM.tot = tc;
    }
  }
  /* đã chụp → chờ cảnh đổi hẳn (lật mặt, đổi tờ, nhấc máy) mới cho chụp tiếp */
  if(!CAM.sanSang && (CAM.dong > 12 || (CAM.che!=='ky' && !q))) CAM.sanSang = true;
  veLopCam(W, H);
  if(CAM.tuDong && CAM.sanSang && CAM.yen >= camGiu() && (q || CAM.che==='ky')) chupCam(true);
}
function dienTich(q){ var s = 0; for(var i=0;i<4;i++){ var a = q[i], b = q[(i+1)%4]; s += a[0]*b[1]-b[0]*a[1]; } return Math.abs(s)/2; }
function veLopCam(W, H){
  var v = document.getElementById('cam-v'), o = document.getElementById('cam-o'); if(!v || !o) return;
  var cw = v.clientWidth, ch = v.clientHeight;
  if(o.width!==cw) o.width = cw; if(o.height!==ch) o.height = ch;
  var g = o.getContext('2d'); g.clearRect(0, 0, cw, ch);
  var s = Math.min(cw/W, ch/H), ox = (cw-W*s)/2, oy = (ch-H*s)/2;
  var tienDo = Math.min(1, CAM.yen/camGiu());
  if(CAM.quad){
    g.beginPath(); CAM.quad.forEach(function(p, i){ var x = ox+p[0]*s, y = oy+p[1]*s; if(i) g.lineTo(x, y); else g.moveTo(x, y); }); g.closePath();
    g.fillStyle = 'rgba(46,204,113,'+(0.15+0.25*tienDo)+')'; g.fill();
    g.lineWidth = 3+2*tienDo; g.strokeStyle = CAM.sanSang ? '#2ECC71' : '#9BE7B8'; g.stroke();
  }
  if(CAM.tuDong && CAM.sanSang && tienDo>0 && (CAM.quad || CAM.che==='ky')){
    g.beginPath(); g.arc(cw/2, ch/2, 26, -Math.PI/2, -Math.PI/2+tienDo*Math.PI*2);
    g.lineWidth = 6; g.strokeStyle = '#2ECC71'; g.stroke();
  }
}
function chupCam(tuDong){
  var v = document.getElementById('cam-v'); if(!v || !v.videoWidth || CAM.dangChup) return;
  CAM.dangChup = true;
  var c = (tuDong && CAM.tot) ? CAM.tot : null;   /* 3.75: tự chụp → lấy khung nét nhất trong lúc giữ yên */
  if(!c){ c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight; c.getContext('2d').drawImage(v, 0, 0); }
  CAM.tot = null; CAM.netTot = -1;
  var l = document.getElementById('cam-loe'); if(l){ l.classList.remove('loe'); void l.offsetWidth; l.classList.add('loe'); }
  CAM.sanSang = false; CAM.yen = 0;
  canvasRaBlob(c, 0.92).then(function(b){
    CAM.dangChup = false;
    var f = new File([b], 'cam_'+Date.now()+'.jpg', {type:'image/jpeg'});
    if(CAM.muc!=='scan'){ var m = CAM.muc; dongCam(); return nhanKA(m==='ky'?'ky':'anh', f); }
    CAM.anh.push(f);
    var n = document.getElementById('cam-nho');
    if(n){ var u = URL.createObjectURL(b); n.innerHTML = '<img src="'+u+'"><b>'+CAM.anh.length+'</b>'; }
    veThanhCam();
    if(navigator.vibrate) try{ navigator.vibrate(40); }catch(e){}
  });
}
function xongCam(){
  var anh = CAM.anh.slice(); dongCam();
  if(anh.length) nhanVaoScan(anh, 'camera');
}
function dongCam(){
  CAM.on = false; clearTimeout(CAM.hen);
  if(CAM.st) CAM.st.getTracks().forEach(function(t){ t.stop(); });
  document.removeEventListener('keydown', phimCam);
  var e = document.getElementById('cam'); if(e) e.remove();
}
function phimCam(ev){
  if(!CAM.on) return;
  if(ev.key===' ' || ev.key==='Enter'){ ev.preventDefault(); chupCam(); }
  else if(ev.key==='Escape'){ ev.preventDefault(); if(CAM.anh.length) xongCam(); else dongCam(); }
}

/* ==========================================================
   3.46: ĐỒNG BỘ DRIVE — mặc định khi mở app, khi rời app, ngay sau khi lưu; tùy chọn mỗi 5 phút; nút ☁ Đồng bộ ngay.
   Bản chưa lên được (mất mạng, chưa nối) nằm chờ, lần sau tự đẩy — không mất.
   ========================================================== */
function scanCanDay(){
  return (D.scan||[]).filter(function(k){ return k && ((k.che==='tailieu' ? (k.trang||[]).length : k.matTruoc) || (k.driveId && k.canDay)) && (!k.driveId || k.canDay) &&   /* 3.91: bản chỉ có PDF trên Drive mà đổi tên → vẫn đẩy (đổi tên / dời) */
    !(k.may && k.may!==maMayCua() && !k.driveId); });
}
function kaCanDay(){ return (D.kyAnh||[]).filter(function(k){ return !k.driveId && !(k.may && k.may!==maMayCua()); }); }
function ghiDongBo(){ DR.dongBoLuc = hai(nay().getHours())+':'+hai(nay().getMinutes()); if(typeof capNhatChip==='function') capNhatChip(); }
var DB_DANG = false, DB_HEN = null;
function henDongBoScan(){ clearTimeout(DB_HEN); DB_HEN = setTimeout(function(){ dongBoScan(false); }, 800); }
/* tuTay = anh bấm: có thanh chạy + báo kết quả; tự động: chạy lặng lẽ */
function dongBoScan(tuTay){
  if(!coTheNoiDrive()){ if(tuTay) baoLoi('Chưa nối Drive. Vào Cài đặt › Google Drive để nối.'); return Promise.resolve(false); }
  if(!DR.sanSang){ if(tuTay) return noiDrive().then(function(ok){ return ok ? dongBoScan(true) : false; }); return Promise.resolve(false); }
  if(DR.online===false){ if(tuTay) bao('Đang mất mạng — có mạng lại app tự đẩy.', 4); return Promise.resolve(false); }
  if(DB_DANG) return Promise.resolve(false);
  (D.scan||[]).forEach(function(k){ delete k.dbDang; });   /* lần trước tắt app giữa chừng → không kẹt "đang lên" */
  var sc = scanCanDay(), ka = kaCanDay(), tong = sc.length + ka.length, xong = 0, loi = 0;
  if(!tong){ if(tuTay){ ghiDongBo(); } return Promise.resolve(true); }
  DB_DANG = true;
  if(tuTay) batChay(false, 'Đang đưa lên Drive 0/'+tong+'…');
  var buoc = function(){ if(tuTay){ dangLamChu('Đang đưa lên Drive '+(xong+loi)+'/'+tong+'…'); tienChay(Math.round((xong+loi)/tong*100)); } };
  return sc.reduce(function(p, k){
    return p.then(function(){
      return coAnhTrongMay(k).then(function(co){
        /* bản của máy khác chưa lên Drive: máy này không có ảnh → bỏ qua, để máy kia đẩy (không tạo PDF trắng) */
        if(!co && !k.driveId){ tong--; return; }
        /* tự động: bản vừa lỗi thì chờ lùi dần (1, 2, 4… tối đa 30 phút) mới thử lại; bấm tay thì thử ngay */
        if(!tuTay && k.dbLoi && Date.now() - (k.dbLuc||0) < Math.min(30, Math.pow(2, (k.dbThu||1)-1))*60000){ tong--; return; }
        k.dbDang = true; veHangDoiNeuMo();
        return dayMotScan(k).then(function(){ xong++; delete k.canDay; delete k.dbLoi; delete k.dbThu; delete k.dbDang; buoc(); veHangDoiNeuMo(); },
          function(e){ loi++; delete k.dbDang; k.dbLoi = (e&&e.message||String(e)); k.dbThu = (k.dbThu||0)+1; k.dbLuc = Date.now(); buoc(); veHangDoiNeuMo(); console.warn('Chưa đẩy được', k.ten, e); });
      });
    });
  }, Promise.resolve()).then(function(){
    return ka.reduce(function(p, k){ return p.then(function(){ return dayKAMot(k.id, true).then(function(){ if(k.driveId) xong++; else loi++; buoc(); }); }); }, Promise.resolve());
  }).then(function(){
    DB_DANG = false; if(tuTay) tatChay();
    luuHoSo(); ghiDongBo();
    if(xong) dayChiMucLenDrive();   /* 3.48: máy khác thấy ngay (trước đợi hẹn 5 giây) */
    var e = document.getElementById('xp-drive'); if(e && XP) e.innerHTML = trangThaiDriveScan(XP.ids.map(timScan));
    if(nganHienTai===4) veScan();
    if(tuTay) bao('☁ Đã đồng bộ'+(tong ? ' '+xong+'/'+tong : '')+(loi ? ' · '+loi+' bản chưa lên được, lần sau app thử lại' : '')+'.', 6);
    return !loi;
  });
}
/* 3.48: HÀNG ĐỢI DRIVE — thấy từng bản đang chờ, lý do, nút thử lại */
function moHangDoiDrive(){ HD_MO = true; veHangDoi(); }
var HD_MO = false;
function veHangDoiNeuMo(){ if(HD_MO && document.getElementById('hd-ds')) veHangDoi(); }
function veHangDoi(){
  var sc = scanCanDay(), ka = kaCanDay();
  var dong = sc.map(function(k){ return {ten:k.ten, loai:k.che==='tailieu'?'📑':'🪪', k:k}; })
    .concat(ka.map(function(k){ return {ten:k.ten, loai:k.loai==='ky'?'✍':'🪪', k:k}; }));
  var tt = function(k){
    if(k.dbDang) return '<span class="hd-tt dang">⏳ đang lên…</span>';
    if(k.dbLoi) return '<span class="hd-tt loi" title="'+coChuHTML(k.dbLoi)+'">⚠ lỗi · thử '+(k.dbThu||1)+' lần — '+coChuHTML(String(k.dbLoi).slice(0,60))+'</span>';
    if(k.driveId && k.canDay) return '<span class="hd-tt">chờ đổi tên / dời thư mục</span>';
    return '<span class="hd-tt">chờ lên</span>';
  };
  moHop('<div class="hop-tit">☁ Hàng đợi Drive ('+dong.length+')</div>'+
    '<div class="hop-phu">'+(DR.sanSang ? 'Drive đang nối.' : '<b>Drive chưa nối</b> — bấm Thử lại, app nối rồi đẩy lên.')+
      ' App tự thử lại khi mở / rời app, có mạng lại; bản lỗi thì thử lùi dần (1, 2, 4… tới 30 phút).</div>'+
    '<div id="hd-ds">'+(dong.length ? dong.map(function(d){
      return '<div class="ka-dong"><span class="ka-ic">'+d.loai+'</span><span class="ka-ten">'+coChuHTML(d.ten)+'<small>'+tt(d.k)+'</small></span></div>'; }).join('')
      : '<div class="rong">✓ Không còn bản nào chờ.</div>')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="HD_MO=false;dongHop()">Đóng</button>'+
      (dong.length ? '<button class="nho chinh" onclick="dongBoNgay()">☁ Thử lại tất cả</button>' : '')+'</div>');
}
function dongBoNgay(){
  if(!coTheNoiDrive()) return moCaiDat('drive');
  if(!DR.sanSang) return noiDrive().then(function(ok){ if(ok) return dongBoNgay(); });
  /* 3.47: 2 chiều — lấy về (gộp) → đẩy bản chờ → gửi chỉ mục đã gộp */
  return taiChiMucTuDrive(true).then(function(){
    if(typeof chayDongBoCho==='function' && demChoDB().length) chayDongBoCho();
    return dongBoScan(true);
  }).then(function(){ return dayChiMucLenDrive(); }).then(function(){ capNhatDaiDrive(); });
}
/* 3.47: dải nhắc khi còn bản chưa lên Drive mà Drive chưa nối (điện thoại cần bấm để Google cho nối lại) */
function capNhatDaiDrive(){
  var e = document.getElementById('dai-drive');
  var cho = scanCanDay().length + kaCanDay().length;
  var can = false;   /* 3.53: đã có chip "☁ N chưa lên Drive" ở thanh đáy — bỏ dải vàng nổi trên cùng (đè nội dung) */
  if(!can){ if(e) e.remove(); return; }
  if(!e){ e = document.createElement('div'); e.id = 'dai-drive'; e.onclick = function(){ dongBoNgay(); };
    document.body.appendChild(e); }
  e.innerHTML = '☁ <b>'+cho+' bản chưa lên Drive</b> — bấm để nối Drive và đẩy lên';
}
/* 3.48: mở app mà Drive chưa nối → tranh thủ LẦN BẤM ĐẦU TIÊN để nối (iPhone chỉ cho nối khi có thao tác tay) */
var DB_BAM_DAU = false;
document.addEventListener('pointerdown', function(ev){
  if(DB_BAM_DAU) return;
  if(!D.cauHinh || !coTheNoiDrive() || DR.sanSang || DR.dangNoi) return;
  if(ev.target && ev.target.closest && ev.target.closest('#chip-drive, #dai-drive')) return;   /* bấm chấm / dải thì đã có việc riêng */
  DB_BAM_DAU = true;
  noiDrive(true).then(function(ok){ if(ok) dongBoScan(false); }).catch(function(){});
}, true);
/* rời app: iPhone chỉ cho vài giây — chỉ mục (nhỏ) kịp lên; PDF lớn chưa xong thì lần mở app sau đẩy tiếp */
document.addEventListener('visibilitychange', function(){
  if(document.visibilityState==='visible'){ if(DR.sanSang){ taiChiMucTuDrive(true); dongBoCauHinh('tu'); } return; }   /* 3.113: + cài đặt */   /* 3.47: quay lại app → lấy về phần máy khác vừa gửi */
  if(D.cauHinh.dbRoiApp===false || !DR.sanSang) return;
  try{ dayChiMucLenDrive(); dongBoScan(false); }catch(e){}
});
window.addEventListener('online', function(){ if(DR.sanSang) setTimeout(function(){ dongBoScan(false); }, 2000); });
setInterval(function(){ if(D.cauHinh && D.cauHinh.db5p===true && DR.sanSang && !document.hidden){ dayChiMucLenDrive(); dongBoScan(false); } }, 5*60000);
/* 3.48: mỗi 1 phút khi app đang mở — hỏi Drive danh sách có đổi không (rất nhẹ), đổi thì lấy về: điện thoại quét xong ~1 phút máy tính thấy */
setInterval(function(){ if(DR.sanSang && !document.hidden && !CM_DANG_KEO) taiChiMucTuDrive(true); }, 60000);

/* ==========================================================
   3.46 (mục K): ĐỌC CHỮ PDF ẢNH (OCR) — chỉ khi anh bấm, chỉ hiện nút khi mục còn thiếu thông tin.
   Đọc trang 1 ngay trong máy (Tesseract, tiếng Việt), không gửi ra ngoài. Lần đầu tải bộ đọc ~10–15 MB rồi dùng lại.
   Đọc xong: chữ đọc được bên trái để đối chiếu / sửa, ô số hiệu · ngày · trích yếu điền sẵn bên phải.
   ========================================================== */
/* 3.47: mọi văn bản PDF / ảnh đều có nút "Đọc lại & gợi ý tên" trong màn Sửa */
function coTheDocLai(m){ return !!m && m.nhom==='vanBan' && /\.?(pdf|jpe?g|png|webp)$/i.test(m.duoi||m.tenCu||''); }
var GOI_Y_SUA = null;
/* nhớ các ô đang gõ trong màn Sửa (chưa lưu) để quay lại không mất */
function nhoFormSua(){
  var r = {}; document.querySelectorAll('#hop-in input[id], #hop-in select[id], #hop-in textarea[id]').forEach(function(e){
    r[e.id] = e.type==='checkbox' ? {c:e.checked} : {v:e.value}; }); return r;
}
/* đọc xong bấm Áp dụng (chế độ Sửa) → mở lại màn Sửa, giữ các ô anh đang gõ, điền 3 ô gợi ý (chưa lưu) */
function apGoiYSua(id){
  var g = GOI_Y_SUA; if(!g || g.id!==id || !g.moi) return;
  GOI_Y_SUA = null;
  Object.keys(g.form||{}).forEach(function(k){ var e = document.getElementById(k); if(!e) return;
    if('c' in g.form[k]) e.checked = g.form[k].c; else e.value = g.form[k].v; });
  var dat = function(k, v, cu){ var e = document.getElementById(k); if(!e || v==null) return;
    if(e.tagName==='SELECT' && v && ![].some.call(e.options, function(o){ return o.value===v || o.text===v; })){ var o = document.createElement('option'); o.text = v; e.add(o); }
    e.value = v;
    if(v!==cu){ e.classList.add('goi-y-moi'); e.title = 'Gợi ý mới từ chữ đọc được (cũ: '+(cu||'trống')+')'; } };
  var n = Object.keys(g.moi).length;
  if('so' in g.moi) dat('s-so', g.moi.so, g.cu.so);
  if('ngay' in g.moi) dat('s-ngay', g.moi.ngay ? ngayVN(g.moi.ngay) : '', ngayVN(g.cu.ngay||''));
  if('loai' in g.moi && g.moi.loai){ dat('s-loai', g.moi.loai, g.cu.loai); LOAI_TAY = true; }
  if('ty' in g.moi) dat('s-ty', g.moi.ty, g.cu.ty);
  bao(n ? 'Đã điền '+n+' mục đã chọn (ô viền xanh) — xem lại rồi bấm Lưu.' : 'Không đổi gì.', 6);
}
function canOCR(m){
  if(!m || !/pdf$/i.test(m.duoi||m.tenCu||'') || m.nhom!=='vanBan') return false;
  return !!m.anhPDF && (!m.soHieu || !m.ngay || !m.trichYeu || !m.chac);
}
var OCR_LIB = null;
function napOCR(){
  if(window.Tesseract) return Promise.resolve(true);
  if(OCR_LIB) return OCR_LIB;
  OCR_LIB = new Promise(function(ok, loi){
    var sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
    sc.onload = function(){ ok(true); }; sc.onerror = function(){ OCR_LIB = null; loi(new Error('Không tải được bộ đọc chữ (cần mạng lần đầu)')); };
    document.head.appendChild(sc);
  });
  return OCR_LIB;
}
/* ==========================================================
   3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
   · Công văn: dòng "Số: …" cột trái + dòng "V/v …" (in nghiêng) ngay dưới số hiệu = trích yếu
   · Quyết định / Kế hoạch / Báo cáo / Thông báo…: tiêu đề in hoa giữa trang + dòng ngay dưới ("Về việc…", nội dung)
   · Ngày: dòng "…, ngày … tháng … năm …"
   Nguồn chữ: lớp chữ của PDF (nhanh, đúng); PDF chụp / ảnh thì OCR tiếng Việt trong máy.
   Kết quả hiện BẢNG SO SÁNH với thông tin hiện tại, tích chọn mục muốn đổi, tên file mới tính lại ngay.
   ========================================================== */
function docChuOCR(id, cheSua){ return docLaiGoiY(id, cheSua, true); }
function docLaiGoiY(id, cheSua, epOCR){
  var m = timMucCaCho(id) || timMuc(id); if(!m) return;
  if(cheSua) GOI_Y_SUA = {id:id, form:nhoFormSua(), cu:{so:gt('s-so'), ngay:ngayISOTuVN(gt('s-ngay')), ty:gt('s-ty'), loai:gt('s-loai')}};
  else GOI_Y_SUA = null;
  QUET.dung = false;
  var laPDF = /pdf$/i.test(m.duoi||m.tenCu||'');
  batChay(true, 'Đang đọc văn bản…', true);
  docFile(m.id).then(function(b){
    if(!b) throw new Error('Không còn file trong máy');
    if(!laPDF) return anhTuBlob(b).then(function(im){ return docDongOCR(quaKhung(im)); });
    if(!window.pdfjsLib) throw new Error('Chưa tải được bộ đọc PDF');
    return b.arrayBuffer().then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; })
      .then(function(pdf){ return pdf.getPage(1); }).then(function(pg){
        return (epOCR ? Promise.resolve(null) : dongTuPDF(pg)).then(function(r){
          if(r && r.chu.replace(/\s+/g,'').length >= 40) return r;
          /* PDF chụp không có chữ → vẽ trang 1 ra ảnh rồi OCR */
          dangLamChu('Đang dựng ảnh trang 1…');
          var vp0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:Math.min(3, 2200/Math.max(vp0.width, vp0.height))});
          var c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
          return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return docDongOCR(c); });
        });
      });
  }).then(function(r){
    tatChay();
    var kq = phanTichBoCuc(r.dong, r.W, r.H, r.chu);
    kq.nguon = r.nguon; kq.chu = r.chu;
    moSoSanhGoiY(m, kq, cheSua);
  }).catch(function(e){
    tatChay();
    if(QUET.dung) return bao('Đã dừng đọc chữ.', 3);
    baoLoi('Chưa đọc được: '+(e&&e.message||e)+'. Có thể dùng "Chép sang AI" để đọc giúp.');
  });
}
function ngayISOTuVN(v){ var m = String(v||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); return m ? m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]) : (/^\d{4}-\d{2}-\d{2}$/.test(v||'') ? v : ''); }
/* lớp chữ PDF → các dòng có vị trí (y tính từ trên xuống) */
function dongTuPDF(pg){
  var vp = pg.getViewport({scale:1});
  return pg.getTextContent().then(function(tc){
    var it = tc.items.filter(function(x){ return x.str && x.str.trim(); }).map(function(x){
      var t = x.transform, h = Math.abs(t[3]) || x.height || 10;
      return {s:x.str, x0:t[4], x1:t[4]+(x.width||0), y:vp.height-t[5], h:h};
    }).sort(function(a,b){ return a.y-b.y || a.x0-b.x0; });
    var dong = [];
    it.forEach(function(x){
      var d = dong[dong.length-1];
      /* cùng độ cao nhưng cách xa (cột trái cơ quan | cột phải quốc hiệu, ngày tháng) → 2 dòng riêng */
      if(d && Math.abs(d.y-x.y) < Math.max(d.h, x.h)*0.45 && x.x0 >= d.x1 - 2 && x.x0 - d.x1 < Math.max(x.h*3, vp.width*0.06)){
        d.t += (x.x0 - d.x1 > x.h*0.25 && !/\s$/.test(d.t) ? ' ' : '') + x.s; d.x1 = Math.max(d.x1, x.x1); d.h = Math.max(d.h, x.h);
      } else dong.push({t:x.s, x0:x.x0, x1:x.x1, y:x.y, h:x.h});
    });
    /* một dòng có thể là 2 cột (cơ quan | quốc hiệu) nằm cùng độ cao — tách ở khoảng trống lớn */
    var ra = [];
    dong.forEach(function(d){ ra.push({t:d.t.replace(/\s+/g,' ').trim(), x0:d.x0, x1:d.x1, y:d.y, h:d.h}); });
    return {dong:ra, W:vp.width, H:vp.height, chu:ra.map(function(d){ return d.t; }).join('\n'), nguon:'chu'};
  });
}
/* OCR (Tesseract tiếng Việt, trong máy) → dòng có vị trí */
function docDongOCR(c){
  var worker = null;
  return napOCR().then(function(){
    return Tesseract.createWorker('vie', 1, {logger:function(l){
      if(QUET.dung && worker){ worker.terminate(); worker = null; }
      var pt = Math.round((l.progress||0)*100);
      dangLamChu((/load|download|initializ/i.test(l.status||'') ? 'Đang tải bộ đọc chữ tiếng Việt' : 'Đang đọc chữ (OCR)')+'… '+pt+'%');
      tienChay(pt);
    }});
  }).then(function(w){
    worker = w; if(QUET.dung){ w.terminate(); throw new Error('Đã dừng'); }
    return w.recognize(c);
  }).then(function(r){
    if(worker){ worker.terminate(); worker = null; }
    var d = (r && r.data) || {}, dong = [];
    (d.lines || []).forEach(function(l){
      var b = l.bbox||{}, h = Math.max(8, (b.y1||0)-(b.y0||0)), y = ((b.y0||0)+(b.y1||0))/2;
      /* OCR hay gộp 2 cột cùng độ cao vào 1 dòng → tách ở khoảng trống lớn giữa các chữ */
      var ws = (l.words||[]).filter(function(w){ return w && w.text && w.text.trim(); });
      if(ws.length){
        var cum = null;
        ws.forEach(function(w){ var wb = w.bbox||{};
          if(cum && (wb.x0||0) - cum.x1 < Math.max(h*2.5, c.width*0.05)){ cum.t += ' '+w.text.trim(); cum.x1 = wb.x1||cum.x1; }
          else { if(cum) dong.push(cum); cum = {t:w.text.trim(), x0:wb.x0||0, x1:wb.x1||0, y:y, h:h}; } });
        if(cum) dong.push(cum);
        return;
      }
      var t = String(l.text||'').replace(/\s+/g,' ').trim();
      if(t) dong.push({t:t, x0:b.x0||0, x1:b.x1||0, y:y, h:h}); });
    var chu = String(d.text||'').trim();
    if(!dong.length) chu.split(/\n/).forEach(function(t, i){ t = t.trim(); if(t) dong.push({t:t, x0:0, x1:c.width, y:i*20, h:18}); });
    return {dong:dong, W:c.width, H:c.height, chu:chu || dong.map(function(x){ return x.t; }).join('\n'), nguon:'ocr'};
  }).catch(function(e){ if(worker) try{ worker.terminate(); }catch(_){} throw e; });
}
/* đọc bố cục: số hiệu · ngày · trích yếu (dòng V/v dưới số hiệu, hoặc tiêu đề + dòng dưới) · loại */
var KHONG_TIEU_DE = /CỘNG\s*HÒA|ĐỘC\s*LẬP|TỰ\s*DO|HẠNH\s*PHÚC|NGÂN\s*HÀNG|CHI\s*NHÁNH|PHÒNG\s*GIAO\s*DỊCH|PGD|HỘI\s*SỞ|UBND|ỦY\s*BAN|KÍNH\s*GỬI|NƠI\s*NHẬN|^SỐ\b/i;
function phanTichBoCuc(dong, W, H, chu){
  dong = (dong||[]).slice().sort(function(a,b){ return a.y-b.y; });
  var kq = {so:'', ngay:'', ty:'', loai:'', tu:{}};
  var hTB = dong.length ? dong.map(function(d){ return d.h; }).sort(function(a,b){ return a-b; })[Math.floor(dong.length/2)] : 12;
  var giua = function(d){ return Math.abs((d.x0+d.x1)/2 - W/2) < W*0.14; };
  var hoa = function(t){ var c = t.replace(/[^A-Za-zÀ-ỹĐđ]/g,''); return c.length>=4 && c===c.toUpperCase(); };
  var trai = function(d){ return d.x1 < W*0.6 || d.x0 < W*0.35 && (d.x0+d.x1)/2 < W*0.5; };
  /* 3.53: phần đầu = các dòng trên tiêu đề / "Căn cứ" — số hiệu, ngày chỉ lấy ở đây */
  var yThan = H*0.45;
  for(var z=0;z<dong.length;z++){ if(RE_THAN_VB.test(dong[z].t) || (laTieuDeVB(dong[z].t) && giua(dong[z]))){ yThan = Math.min(yThan, dong[z].y); break; } }
  /* 1. số hiệu: dòng "Số: …" (ưu tiên nửa trên, cột trái) */
  var iSo = -1;
  for(var i=0;i<dong.length;i++){
    var t = dong[i].t;
    if(dong[i].y >= yThan) break;
    if(/^\s*S[ốỐoO]\s*[:.]?\s*\d/i.test(t) || (/\bS[ốỐ]\s*:/i.test(t) && dong[i].y < H*0.4)){
      var so = rutSoHieu(t.replace(/^.*?S[ốỐoO]\s*[:.]?\s*/i,'')) || rutSoHieu(t);
      if(so){ kq.so = so; iSo = i; kq.tu.so = 'dòng "Số:" '+(trai(dong[i])?'cột trái':'đầu trang'); break; }
    }
  }
  /* 2. ngày: dòng "…, ngày … tháng … năm …" */
  for(var j=0;j<dong.length && dong[j].y < yThan;j++) if(/ngày\s*\d{1,2}\s*tháng\s*\d{1,2}\s*năm\s*\d{4}/i.test(dong[j].t)){
    kq.ngay = rutNgay(dong[j].t) || ''; if(kq.ngay){ kq.tu.ngay = 'dòng "ngày … tháng … năm …"'; break; } }
  /* 3a. công văn: dòng V/v ngay dưới số hiệu (cột trái), nối các dòng tiếp theo cùng cột */
  if(iSo>=0){
    for(var k=iSo+1;k<dong.length && dong[k].y - dong[iSo].y < hTB*5;k++){
      var d = dong[k];
      if(/^\s*(V\/v|V\/V|Về\s*việc)\b/i.test(d.t) || (k===iSo+1 && trai(d) && !/ngày|tháng|năm/i.test(d.t) && d.t.length>6)){
        var ty = [d.t], y0 = d.y;
        for(var q=k+1, them=0;q<dong.length && them<3;q++){
          var e = dong[q];
          if(e.y - y0 > hTB*2.2) break;
          if(!trai(e)) continue;   /* dòng cột phải (quốc hiệu, ngày tháng) nằm xen cùng độ cao → bỏ qua, đọc tiếp cột trái */
          if(/^(Kính\s*gửi|Căn\s*cứ|Thực\s*hiện|Để|Nơi\s*nhận)/i.test(e.t) || /ngày\s*\d+\s*tháng/i.test(e.t)) break;
          ty.push(e.t); y0 = e.y; them++;
        }
        kq.ty = ty.join(' ').replace(/^\s*(V\/v\.?|Về\s*việc)\s*:?\s*/i,'').trim();
        kq.tu.ty = 'dòng "V/v" ngay dưới số hiệu'; kq.loai = kq.loai || 'Công văn';
        break;
      }
    }
  }
  /* 3b. tiêu đề in hoa giữa trang + dòng ngay dưới */
  if(!kq.ty){
    for(var a=0;a<dong.length;a++){
      var d2 = dong[a];
      if(d2.y > H*0.6) break;
      if(!giua(d2) || !hoa(d2.t) || d2.t.length<5 || KHONG_TIEU_DE.test(d2.t)) continue;
      var tieuDe = [d2.t], duoi = [], y1 = d2.y;
      for(var b=a+1;b<dong.length && b<a+5;b++){
        var e2 = dong[b];
        if(e2.y - y1 > hTB*2.4 || !giua(e2) || /^(Căn\s*cứ|Kính\s*gửi)/i.test(e2.t) || /^[-–_ .]+$/.test(e2.t)) break;
        if(hoa(e2.t) && !duoi.length && tieuDe.length<2) tieuDe.push(e2.t); else duoi.push(e2.t);
        y1 = e2.y;
      }
      var td = tieuDe.join(' '), loai = doanLoai(td, kq.so);
      var sau = duoi.join(' ').replace(/^\s*(V\/v\.?|Về\s*việc|Về)\s*:?\s*/i,'').trim();
      var laLoai = new RegExp('^\\s*'+boDau(loai||'@@').replace(/\s+/g,'\\s*')+'\\s*$','i').test(boDau(td));
      kq.loai = loai || kq.loai;
      kq.ty = sau ? (laLoai ? sau : chuDau(td)+' '+sau) : (laLoai ? '' : chuDau(td));
      kq.tu.ty = sau ? 'tiêu đề giữa trang + dòng ngay dưới' : 'tiêu đề giữa trang';
      if(kq.ty) break;
    }
  }
  /* 4. thiếu thì lấy theo cách cũ trên cả trang */
  chu = chu || dong.map(function(d){ return d.t; }).join('\n');
  /* 3.53: không tìm cả trang nữa (dính số, ngày của văn bản căn cứ) — chỉ phần đầu */
  var dauC = docDauVB(dong.filter(function(d){ return d.y < yThan; }).map(function(d){ return d.t; }).join('\n'));
  if(!kq.so){ kq.so = dauC.so || ''; if(kq.so) kq.tu.so = 'phần đầu văn bản'; }
  if(!kq.ngay){ kq.ngay = dauC.ngay || ''; if(kq.ngay) kq.tu.ngay = 'phần đầu văn bản'; }
  if(!kq.ty){ kq.ty = rutTrichYeu(chu) || rutTieuDe(chu) || ''; if(kq.ty) kq.tu.ty = 'tìm trong cả trang'; }
  if(!kq.loai) kq.loai = doanLoai(chu, kq.so) || '';
  kq.ty = chuDau(String(kq.ty||'').replace(/\s+/g,' ').replace(/[.;,:\s]+$/,''));
  if(kq.ty && chuLoiFont(kq.ty)){ kq.loiFont = true; kq.ty = ''; kq.tu.ty = 'chữ PDF lỗi font — gõ tay theo khung xem'; }   /* 3.61 */
  return kq;
}
function chuDau(t){ t = String(t||'').trim(); if(!t) return t;
  if(t===t.toUpperCase()) t = t.toLowerCase();
  return t.charAt(0).toUpperCase()+t.slice(1); }
/* BẢNG SO SÁNH: hiện tại | đọc được (sửa được) | chọn — tên file mới tính lại ngay */
var SS = null;
function moSoSanhGoiY(m, kq, cheSua){
  var cu = cheSua && GOI_Y_SUA ? GOI_Y_SUA.cu : {so:m.soHieu||'', ngay:m.ngay||'', ty:m.tenVB||m.trichYeu||'', loai:m.loai||''};
  var tenGocKhong = boDau((m.tenCu||'').replace(/\.[^.]+$/,''));
  var yeu = function(v){ v = String(v||'').trim(); return !v || boDau(v)===tenGocKhong || /^scan\b/i.test(v); };
  var hom = ngayISO(nay());
  SS = {m:m, kq:kq, cu:cu, cheSua:cheSua};
  var hang = [
    ['so','Số hiệu', cu.so, kq.so, yeu(cu.so)],
    ['ngay','Ngày ban hành', cu.ngay, kq.ngay, !cu.ngay || (cu.ngay===hom && kq.ngay && kq.ngay!==hom)],
    ['loai','Loại', cu.loai, kq.loai, !cu.loai],
    ['ty','Trích yếu / tên văn bản', cu.ty, kq.ty, yeu(cu.ty)]
  ];
  moHop('<div class="hop-tit">🔍 So sánh — đọc từ '+(kq.nguon==='ocr'?'ảnh (OCR)':'chữ trong PDF')+'</div>'+
    '<div class="hop-phu">Cột giữa là thông tin đọc được (sửa được). Tích mục muốn đổi — tên file mới tính lại ngay bên dưới. Chưa lưu gì cho tới khi anh bấm.</div>'+
    '<table class="ss-bang"><thead><tr><th></th><th>Hiện tại</th><th>Đọc được</th><th>Đổi</th></tr></thead><tbody>'+
    hang.map(function(h){
      var khac = String(h[2]||'')!==String(h[3]||'') && !!h[3];
      var hien = h[0]==='ngay' ? ngayVN(h[2]||'') : (h[2]||'');
      return '<tr class="'+(khac?'ss-khac':'ss-giong')+'"><th>'+h[1]+(kq.tu[h[0]]?'<small>'+coChuHTML(kq.tu[h[0]])+'</small>':'')+'</th>'+
        '<td class="ss-cu">'+(hien ? coChuHTML(hien) : '<i>trống</i>')+'</td>'+
        '<td>'+(h[0]==='ngay' ? '<input type="date" id="ss-'+h[0]+'" value="'+coChuHTML(h[3]||'')+'" oninput="tinhTenSS()">'
              : h[0]==='ty' ? '<textarea id="ss-'+h[0]+'" rows="2" oninput="tinhTenSS()">'+coChuHTML(h[3]||'')+'</textarea>'
              : '<input id="ss-'+h[0]+'" value="'+coChuHTML(h[3]||'')+'" oninput="tinhTenSS()">')+'</td>'+
        '<td class="ss-chon"><input type="checkbox" id="ssc-'+h[0]+'"'+(khac && h[4] ? ' checked' : '')+(h[3]?'':' disabled')+' onchange="tinhTenSS()">'+
          '<small>'+(khac ? (h[4] ? 'đổi' : 'khác') : (h[3] ? 'giống' : '—'))+'</small></td></tr>';
    }).join('')+
    '<tr class="ss-ten"><th>Tên file</th><td class="ss-cu">'+coChuHTML(m.tenMoi||m.tenCu||'')+'</td><td colspan="2"><b id="ss-tenmoi"></b></td></tr>'+
    '</tbody></table>'+
    '<details class="ss-chu"><summary>Xem chữ đọc được</summary><textarea readonly rows="10">'+coChuHTML(kq.chu||'')+'</textarea></details>'+
    '<div class="hang-nut"><button class="nho" onclick="'+(cheSua ? 'GOI_Y_SUA=null;suaCho(\''+m.id+'\')' : 'dongHop()')+'">Giữ nguyên</button>'+
      '<button class="nho chinh" onclick="apDungSS()">Áp dụng mục đã chọn</button></div>', true);
  ganXemBen(m);   /* 3.61 */
  tinhTenSS();
}
function giaTriSS(){
  var r = {}; ['so','ngay','loai','ty'].forEach(function(k){ var c = document.getElementById('ssc-'+k); if(c && c.checked) r[k] = gt('ss-'+k); }); return r;
}
function tinhTenSS(){
  if(!SS) return; var g = giaTriSS(), m = SS.m, x = {};
  for(var k in m) x[k] = m[k];
  x.soHieu = 'so' in g ? g.so : SS.cu.so; x.ngay = 'ngay' in g ? g.ngay : SS.cu.ngay; x.loai = 'loai' in g ? g.loai : SS.cu.loai;
  x.trichYeu = x.tenVB = 'ty' in g ? g.ty : SS.cu.ty;
  var e = document.getElementById('ss-tenmoi'); if(e) e.textContent = tenVanBan(x, m.duoi);
}
function apDungSS(){
  if(!SS) return; var g = giaTriSS(), m = SS.m;
  if(SS.cheSua){ if(GOI_Y_SUA) GOI_Y_SUA.moi = g; return suaCho(m.id); }
  if('so' in g) m.soHieu = g.so;
  if('ngay' in g) m.ngay = g.ngay;
  if('loai' in g && g.loai) m.loai = g.loai;
  if('ty' in g){ m.trichYeu = g.ty; if(m.tenVB) m.tenVB = g.ty; }
  m.chac = !!(m.soHieu && m.ngay && (m.trichYeu||m.tenVB));
  m.canCu = 'Đọc lại '+(SS.kq.nguon==='ocr'?'(OCR)':'(chữ PDF)')+' — anh đã chọn mục đổi';
  var tenCu = m.tenMoi; m.tenMoi = tenVanBan(m, m.duoi);
  if(m.driveId && tenCu!==m.tenMoi) m.choDB = true;
  m.suaLuc = new Date().toISOString();
  luu(); dongHop(); ve();
  bao(Object.keys(g).length ? 'Đã đổi '+Object.keys(g).length+' mục · tên file: '+m.tenMoi : 'Không đổi gì.', 6);
}

/* ==========================================================
   3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi").
   Cài một lần bằng file .reg (không cần quyền quản trị): đăng ký lối mở "tuhoso:" → PowerShell ẩn chạy script nhúng sẵn.
   Lệnh: mo (mở bằng Word/Excel/PDF), xem (chép ra thư mục tạm của Windows rồi mở — bản tạm tự xóa sau 12 giờ),
         chep (chép FILE vào bộ nhớ tạm → Zalo / email bấm Ctrl+V), thumuc (mở thư mục, chọn sẵn file), thu (thử).
   An toàn: chỉ file nằm trong thư mục Tủ hồ sơ, chỉ PDF / Word / Excel / ảnh; không chạy .exe, không nhận ".." hay ký tự lạ.
   ========================================================== */
var CN_KHOA = 'tuhoso_caunoi';   /* cài theo TỪNG MÁY — không đồng bộ qua cài đặt chung */
function coCauNoi(){ try{ return !laDT() && localStorage.getItem(CN_KHOA)==='1'; }catch(e){ return false; } }
function datCauNoi(v){ try{ localStorage.setItem(CN_KHOA, v?'1':'0'); }catch(e){} veLaiCDNeuCan(); }
function scriptCauNoi(){
  var goc = String(D.cauHinh.thumuc||'Tủ hồ sơ').replace(/'/g, "''");
  return [
"$ErrorActionPreference='Stop'",
"function Bao($t){ if($env:TUHOSO_THU){ Write-Output $t; return }; Add-Type -AssemblyName System.Windows.Forms; [void][System.Windows.Forms.MessageBox]::Show($t,'Tu ho so') }",
"try{",
" $s = $u -replace '^tuhoso:(//)?',''",
" $i = $s.IndexOf('/'); if($i -lt 0){ $hanh = $s; $rel = '' } else { $hanh = $s.Substring(0,$i); $rel = [Uri]::UnescapeDataString($s.Substring($i+1)) }",
" $goc = '"+goc+"'",
" $root = $null",
" foreach($d in [IO.DriveInfo]::GetDrives()){ if(-not $d.IsReady){ continue }",
"  foreach($n in @('My Drive',('Drive c'+[char]0x1EE7+'a t'+[char]0xF4+'i'))){ $p = Join-Path $d.RootDirectory.FullName $n",
"   if(Test-Path -LiteralPath (Join-Path $p $goc)){ $root = $p; break } }",
"  if($root){ break } }",
" if(-not $root){ Bao (\"Chưa thấy thư mục '\"+$goc+\"' trong ổ Google Drive (My Drive). Mở Google Drive cho máy tính rồi thử lại.\"); exit }",
" if($hanh -eq 'thu'){ Bao (\"Cầu nối đã chạy (bản 2).`nThư mục Drive: \"+$root); exit }",
" if($hanh -eq 'chepn'){",
"  $b = $rel.Replace('-','+').Replace('_','/'); while($b.Length % 4){ $b += '=' }",
"  $ds = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($b)) -split \"`n\"",
"  $c = New-Object System.Collections.Specialized.StringCollection; $thieu = @()",
"  foreach($r in $ds){ $pp = @($r -split '/' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })",
"   if($pp.Count -lt 2 -or $pp[0] -ne $goc -or @($pp | Where-Object { $_ -eq '..' -or $_ -eq '.' -or $_ -match '[\\\\:*?\"<>|]' }).Count -gt 0){ continue }",
"   $f = Join-Path $root ($pp -join [IO.Path]::DirectorySeparatorChar); if(Test-Path -LiteralPath $f){ [void]$c.Add($f) } else { $thieu += $pp[-1] } }",
"  if($env:TUHOSO_THU){ Write-Output ('chepn|'+$c.Count+'|'+$thieu.Count); exit }",
"  if($c.Count){ Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetFileDropList($c) }",
"  if($thieu.Count){ Bao (\"Đã chép \"+$c.Count+\" file.`nChưa thấy \"+$thieu.Count+\" file trên máy (Google Drive có thể đang chép về):`n\"+($thieu -join \"`n\")) }",
"  exit }",
" $parts = @($rel -split '/' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })",
" if($parts.Count -lt 2 -or $parts[0] -ne $goc -or @($parts | Where-Object { $_ -eq '..' -or $_ -eq '.' -or $_ -match '[\\\\:*?\"<>|]' }).Count -gt 0){ Bao 'Đường dẫn không hợp lệ.'; exit }",
" $path = Join-Path $root ($parts -join [IO.Path]::DirectorySeparatorChar)",
" $ext = [IO.Path]::GetExtension($path).ToLower()",
" if(@('.pdf','.doc','.docx','.xls','.xlsx','.xlsm','.csv','.jpg','.jpeg','.png','.rtf','.odt','.ods') -notcontains $ext){ Bao 'Loại file này không mở qua cầu nối.'; exit }",
" if(-not (Test-Path -LiteralPath $path)){ Bao (\"Chưa thấy file trên máy:`n\"+$path+\"`n`nGoogle Drive có thể đang chép về — chờ ít phút rồi thử lại.\"); exit }",
" if($env:TUHOSO_THU){ Write-Output ($hanh+'|'+$path); exit }",
" switch($hanh){",
"  'mo'     { Start-Process -FilePath $path }",
"  'xem'    { $t = Join-Path $env:TEMP 'TuHoSo'; New-Item -ItemType Directory -Force -Path $t | Out-Null",
"             Get-ChildItem -LiteralPath $t -File | Where-Object { $_.LastWriteTime -lt (Get-Date).AddHours(-12) } | Remove-Item -Force -ErrorAction SilentlyContinue",
"             $dst = Join-Path $t ([IO.Path]::GetFileName($path)); if(Test-Path -LiteralPath $dst){ Remove-Item -LiteralPath $dst -Force }",
"             Copy-Item -LiteralPath $path -Destination $dst -Force; (Get-Item -LiteralPath $dst).IsReadOnly = $true; Start-Process -FilePath $dst }",
"  'chep'   { Add-Type -AssemblyName System.Windows.Forms; $c = New-Object System.Collections.Specialized.StringCollection; [void]$c.Add($path); [System.Windows.Forms.Clipboard]::SetFileDropList($c) }",
"  'thumuc' { Start-Process -FilePath 'explorer.exe' -ArgumentList ('/select,\"'+$path+'\"') }",
"  default  { Bao 'Lệnh không hợp lệ.' }",
" }",
"}catch{ Bao ('Cầu nối gặp lỗi: '+$_.Exception.Message) }"].join('\r\n');
}
function b64Unicode(t){ var u = ''; for(var i=0;i<t.length;i++){ var c = t.charCodeAt(i); u += String.fromCharCode(c & 255, c >> 8); } return btoa(u); }
function taiBoCaiCauNoi(go){
  var noi;
  if(go) noi = 'Windows Registry Editor Version 5.00\r\n\r\n[-HKEY_CURRENT_USER\\Software\\Classes\\tuhoso]\r\n';
  else {
    var lenh = 'powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -Command "$u=\'%1\'; iex ([Text.Encoding]::Unicode.GetString([Convert]::FromBase64String(\''+
      b64Unicode(scriptCauNoi())+'\')))"';
    noi = 'Windows Registry Editor Version 5.00\r\n\r\n'+
      '[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso]\r\n@="URL:Tu ho so"\r\n"URL Protocol"=""\r\n\r\n'+
      '[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso\\shell]\r\n\r\n[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso\\shell\\open]\r\n\r\n'+
      '[HKEY_CURRENT_USER\\Software\\Classes\\tuhoso\\shell\\open\\command]\r\n@="'+lenh.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"\r\n';
  }
  /* .reg chuẩn là UTF-16 LE có BOM */
  var buf = new Uint8Array(2 + noi.length*2); buf[0] = 0xFF; buf[1] = 0xFE;
  for(var i=0;i<noi.length;i++){ var c = noi.charCodeAt(i); buf[2+i*2] = c & 255; buf[3+i*2] = c >> 8; }
  var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([buf], {type:'application/octet-stream'}));
  a.download = go ? 'go-cau-noi-tu-ho-so.reg' : 'cai-cau-noi-tu-ho-so.reg'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 1000);
  bao(go ? 'Đã tải file gỡ — bấm đúp để gỡ cầu nối.' : 'Đã tải bộ cài — mở thư mục Tải về, bấm đúp file .reg → Yes → OK. Rồi bấm "Mở thử".', 9);
}
/* gọi cầu nối: rel = đường dẫn trong Drive "Tủ hồ sơ/…/tên file" */
function goiCauNoi(hanh, rel){
  var u = 'tuhoso:'+hanh+'/'+encodeURIComponent(String(rel||'')).replace(/'/g,'%27').replace(/%2F/g,'/');
  var f = document.createElement('iframe'); f.style.display = 'none'; f.src = u; document.body.appendChild(f);
  setTimeout(function(){ f.remove(); }, 3000);
  if(hanh==='chep') bao('📋 Đã chép file — mở Zalo (hoặc email, thư mục), bấm vào ô chat rồi Ctrl+V.', 7);
}
/* 3.106 (anh chốt): 📋 chép 1 file từ dòng danh sách · chép nhiều file một lần (cầu nối bản 2, lệnh chepn — danh sách gói base64url UTF-8 cho gọn đường dẫn) */
var CN_CHEP_CON = [];
function cnBan2(){ try{ return localStorage.getItem('tuhoso_cn_ban')==='2'; }catch(e){ return false; } }
function chepMot(id){
  var x = timMuc(id) || (D.bieuMau||[]).find(function(z){ return z.id===id; }) || timScan(id);
  if(!x) return;
  if(!coCauNoi()) return hoiCaiCauNoi(function(){ bao('Chưa cài cầu nối: dùng Gửi cả file để tải file.', 5); });
  var rel = relCua(x); if(!rel) return baoLoi('File này chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay rồi thử lại sau ít phút.');
  goiCauNoi('chep', rel);
}
function b64url(t){ var u = unescape(encodeURIComponent(t)); return btoa(u).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function chepNhieu(ds){   /* ds = [mục] → chép tối đa 20 file / lần (ít hơn nếu tên dài — giới hạn độ dài lệnh Windows); còn lại → "Chép tiếp" */
  if(!coCauNoi()) return hoiCaiCauNoi(function(){ bao('Chưa cài cầu nối: chép nhiều file cần cầu nối.', 5); });
  if(!cnBan2()) return hoiCauNoiBan2(function(){ chepNhieu(ds); });
  var co = [], chua = [];
  ds.forEach(function(x){ var r = relCua(x); if(r) co.push(r); else chua.push(x.tenMoi||x.tenCu||x.ten||'file'); });
  if(!co.length) return baoLoi('Các file đã chọn chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay rồi thử lại sau ít phút.');
  var lo = [];
  while(co.length && lo.length<20 && b64url(lo.concat([co[0]]).join('\n')).length<=1800) lo.push(co.shift());
  if(!lo.length) lo.push(co.shift());
  CN_CHEP_CON = co;
  goiCauNoi('chepn', b64url(lo.join('\n')));
  bao('📋 Đã chép '+lo.length+' file — mở Zalo / email / thư mục, bấm Ctrl+V một lần là dán hết.'+(chua.length ? ' · '+chua.length+' file chưa lên Drive nên bỏ qua.' : '')+(co.length ? ' · Còn '+co.length+' file: dán xong bấm "📋 Chép tiếp".' : ''), 9);
  capNhatBot();
}
function chepTiep(){ if(!CN_CHEP_CON.length) return; var con = CN_CHEP_CON; CN_CHEP_CON = []; chepNhieuRel(con); }
function chepNhieuRel(co){ var lo = []; while(co.length && lo.length<20 && b64url(lo.concat([co[0]]).join('\n')).length<=1800) lo.push(co.shift()); if(!lo.length) lo.push(co.shift());
  CN_CHEP_CON = co; goiCauNoi('chepn', b64url(lo.join('\n'))); bao('📋 Đã chép thêm '+lo.length+' file — Ctrl+V để dán.'+(co.length ? ' Còn '+co.length+' file.' : ''), 8); capNhatBot(); }
function hoiCauNoiBan2(sau){
  window.__cnSau = sau;
  moHop('<h3>📋 Chép nhiều file cần cầu nối bản mới</h3>'+
    '<div class="huong-dan">Cầu nối đang cài trên máy chỉ chép được <b>1 file</b>. Cài lại <b>1 lần</b> để chép nhiều file: bấm <b>⬇ Tải bộ cài mới</b> → mở file .reg → Yes → OK, rồi bấm <b>Mở thử</b> — hộp hiện chữ <b>“bản 2”</b> là xong.</div>'+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho chinh" onclick="taiBoCaiCauNoi()">⬇ Tải bộ cài mới</button>'+
    '<button class="nho" onclick="dongHop();moThuCauNoi()">Mở thử</button>'+
    '<button class="nho" onclick="try{localStorage.setItem(\'tuhoso_cn_ban\',\'2\')}catch(e){};dongHop();(window.__cnSau||function(){})()">Đã cài bản mới — chép luôn</button>'+
    '<button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>');
}
function relDrive(duong, ten){ return String(duong||'').split('/').map(function(x){ return x.trim(); }).filter(Boolean).concat([ten]).join('/'); }
/* đường dẫn trong Drive của một mục bất kỳ (văn bản, biểu mẫu, bản scan, chữ ký · CCCD) — '' nếu chưa lên Drive */
function relCua(x){
  if(!x || !x.driveId) return '';
  if(x.che) return relDrive(duongScan(x), tenScanDrive(x));
  if(/^ka/.test(x.id||'') && x.loai) return relDrive(duongKA((x.ngay||'').slice(0,7)), x.ten);
  return relDrive(thuMucCua(x), x.tenMoi||x.tenCu||'');
}
function cnHanh(hanh, loai, id){
  var x = loai==='scan' ? timScan(id) : (loai==='ka' ? (D.kyAnh||[]).find(function(k){ return k.id===id; }) : timMucMo(id));
  var rel = relCua(x);
  if(!rel) return baoLoi('File này chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay rồi thử lại sau ít phút.');
  goiCauNoi(hanh, rel);
}
/* 3.49: Mở thử → hỏi "có thấy hộp Cầu nối đã chạy?" → Có thì tự bật "Máy này đã cài cầu nối" (khỏi phải tìm ô tích) */
function moThuCauNoi(){
  goiCauNoi('thu', '');
  setTimeout(function(){
    hoi('Có thấy hộp “Cầu nối đã chạy”?', 'Có hộp đó hiện lên là máy này đã cài xong — app bật các nút 🖥 Mở trên máy · 📋 Chép file · 📂 Thư mục ở khung xem. '+
      'Không thấy gì thì tải lại bộ cài, bấm đúp file .reg → Yes → OK rồi Mở thử lại.', 'Có, đã thấy', function(){
      datCauNoi(true); try{ localStorage.removeItem('tuhoso_cn_an'); localStorage.setItem('tuhoso_cn_ban', '2'); }catch(e){}   /* 3.106: bộ cài hiện tại là bản 2 (chép nhiều file) */
      if(mucDangXem) veNutCN(mucDangXem);
      bao('Đã bật cầu nối cho máy này.', 4);
    });
  }, 2500);
}
/* 3.49: nút cầu nối ngay ở khung xem (cạnh Gửi cả file / In / Sửa) — trước chỉ nằm trong menu ⋯ */
function veNutCN(m){
  var h = '', meo = '';
  if(m && !laDT()){
    if(coCauNoi()){
      var co = !!m.driveId, nhat = co ? '' : ' class="mo-nhat"',
          goi = function(hanh){ return co ? 'cnHanh(\''+hanh+'\',\'muc\',\''+m.id+'\')'
            : 'baoLoi(\'File này chưa lên Drive nên ổ G chưa có — bấm ☁ Đồng bộ ngay, chờ ít phút rồi bấm lại.\')'; },
          tip = co ? '' : ' (chưa lên Drive)';
      h = '<button'+nhat+' onclick="'+goi('mo')+'" title="Mở thẳng bằng Word / Excel / trình đọc PDF trên máy'+tip+'">🖥 Mở máy</button>'+
          '<button'+nhat+' onclick="'+goi('chep')+'" title="Chép file — Ctrl+V vào Zalo'+tip+'">📋 Chép</button>'+
          '<button'+nhat+' onclick="'+goi('thumuc')+'" title="Mở thư mục chứa file'+tip+'">📂</button>';
    } else {
      /* 3.62 (việc U, anh chốt): bỏ dòng nhắc dưới khung xem — chỉ một nút nhỏ; bấm lần đầu mới hỏi cài, "Để sau" thì thôi hẳn */
      if(!cnDaBoQua()) h = '<button onclick="hoiCaiCauNoi(function(){ bao(\'Chưa cài cầu nối: dùng Gửi cả file để mở / tải file.\', 5); })" title="Mở thẳng file trên máy (cần cầu nối — cài 1 lần)">🖥 Mở máy</button>';
    }
  }
  ['cp-cn','x-cn'].forEach(function(id){ var e = document.getElementById(id); if(e) e.innerHTML = h; });
  var e2 = document.getElementById('cp-cnmeo'); if(e2) e2.innerHTML = meo;
}
/* 3.62 (việc U): máy tính chưa xác nhận cài cầu nối → chỉ hỏi khi anh bấm việc cần cầu nối; cài rồi / "Để sau" thì không nhắc nữa */
function cnDaBoQua(){ try{ return localStorage.getItem('tuhoso_cn_an')==='1'; }catch(e){ return false; } }
function hoiCaiCauNoi(duPhong){
  duPhong = duPhong || function(){};
  if(laDT() || coCauNoi() || cnDaBoQua()) return duPhong();
  window.__cnDuPhong = duPhong;
  moHop('<h3>🖥 Máy này chưa cài cầu nối</h3>'+
    '<div class="huong-dan">Cầu nối giúp <b>mở thẳng file trên máy</b> (Word / Excel / PDF), <b>chép đúng file</b> để Ctrl+V vào Zalo và <b>mở thư mục</b> chứa file. Chỉ cài <b>1 lần</b> cho mỗi máy tính.</div>'+
    '<ol class="huong-dan" style="margin:6px 0 0 18px;padding:0"><li>Bấm <b>⬇ Tải bộ cài</b> → mở file .reg vừa tải → Yes → OK.</li><li>Bấm <b>Mở thử</b> — thấy hộp "Cầu nối đã chạy" là xong, app nhớ cho máy này.</li></ol>'+
    '<div class="hang-nut" style="margin-top:12px">'+
      '<button class="nho chinh" onclick="taiBoCaiCauNoi()">⬇ Tải bộ cài</button>'+
      '<button class="nho" onclick="dongHop();moThuCauNoi()">Mở thử</button>'+
      '<button class="nho" onclick="try{localStorage.setItem(\'tuhoso_cn_an\',\'1\')}catch(e){};dongHop();if(mucDangXem)veNutCN(mucDangXem);(window.__cnDuPhong||function(){})()">Để sau (không nhắc nữa)</button>'+
      '<button class="nho" onclick="dongHop()">Đóng (Esc)</button>'+
    '</div>');
}
/* các nút cầu nối (chỉ máy tính đã cài) */
function nutCauNoi(loai, id, it){
  if(!coCauNoi()) return '';
  return '<button class="nho chinh" onclick="cnHanh(\'chep\',\''+loai+'\',\''+id+'\')" title="Chép file vào bộ nhớ tạm — mở Zalo bấm Ctrl+V">📋 Chép file · Ctrl+V vào Zalo</button>'+
    (it ? '' : '<button class="nho" onclick="cnHanh(\'xem\',\''+loai+'\',\''+id+'\')" title="Mở bản tạm để xem, không đụng file gốc">👁 Xem nhanh</button>')+
    '<button class="nho" onclick="cnHanh(\'thumuc\',\''+loai+'\',\''+id+'\')" title="Mở thư mục chứa file, chọn sẵn file">📂 Mở thư mục</button>';
}
/* máy chưa cài cầu nối: PDF / ảnh mở ngay trong tab trình duyệt (không lưu file); Word / Excel thì tải về */
function xemTrongTab(bl, ten){
  if(/pdf|image/.test(bl.type||'') || /\.(pdf|jpe?g|png)$/i.test(ten||'')){ var u = URL.createObjectURL(bl); window.open(u, '_blank'); setTimeout(function(){ URL.revokeObjectURL(u); }, 60000); return; }
  var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = ten||'file'; document.body.appendChild(a); a.click(); a.remove();
}

/* lưu tạm: tên tự đặt theo ngày giờ quét, khai sau */
/* 3.41 (anh chốt): lưu tạm đặt tên "Scan ngày-tháng-năm giờ" để biết mà sửa tên lại; trùng thì thêm (2), (3)… */
function tenLuuTam(d, hau){
  var goc = 'Scan '+hai(d.getDate())+'-'+hai(d.getMonth()+1)+'-'+d.getFullYear()+' '+
    hai(d.getHours())+'h'+hai(d.getMinutes())+'m'+hai(d.getSeconds())+(hau ? ' '+hau : '');
  var co = {}; (D.scan||[]).forEach(function(k){ co[k.ten] = 1; });
  var ten = goc, n = 2;
  while(co[ten]){ ten = goc+' ('+n+')'; n++; }
  return ten;
}
function luuSauHang(){
  var d = nay();
  var k = {id:idMoi(), che:SC.che, chuaKhai:true,
    ten:tenLuuTam(d),
    ngay:ngayISO(d), gioQuet:d.toISOString(),
    xa:'', diem:'', ap:'', to:'', ghi:'', tag:[], ctrinh:[],
    taoLuc:d.toISOString()};
  if(SC.che==='the'){
    var anh = HANG.filter(function(x){ return x.kieu==='anh'; });
    if(anh.length>2){
      /* nhiều hơn 2 ảnh thì tách thành nhiều bản, mỗi bản 2 mặt */
      luuNhieuThe(anh); return;
    }
    k.matTruoc = !!anh[0]; k.matSau = !!anh[1];
    /* 3.33: chờ chép ảnh sang tên mới XONG rồi mới lưu và báo (trước đây báo xong trong khi ảnh còn đang chép) */
    var ch = Promise.resolve();
    if(anh[0]) ch = ch.then(function(){ return doiTenAnh(anh[0].id, k.id+'_matTruoc'); });
    if(anh[1]) ch = ch.then(function(){ return doiTenAnh(anh[1].id, k.id+'_matSau'); });
    return ch.then(function(){ ghiLuuTam([k], 'Đã lưu tạm. Vào tab Scan khai và lưu hàng loạt khi rảnh.'); })
      .catch(function(e){ baoLoi('Chưa lưu được ảnh: '+(e&&e.message||e)); });
  }else{
    /* 3.35: gồm cả trang PDF (trước đây PDF chọn từ nguồn File bị bỏ mất khi lưu) */
    k.trang = HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; }).map(hangRaTrang);
  }
  ghiLuuTam([k], 'Đã lưu tạm. Vào tab Scan khai và lưu hàng loạt khi rảnh.');
}
function ghiLuuTam(ds, loiBao){
  var bay = new Date().toISOString();
  D.scan = D.scan || []; ds.forEach(function(k){ k.may = maMayCua(); k.suaLuc = bay; D.scan.push(k); }); HS.ds = D.scan;
  donGocHang(); HANG = []; luu(); dongHop(); veScan();
  if(D.cauHinh.dbSauLuu!==false) henDongBoScan();   /* 3.46: lưu tạm xong đưa lên Drive liền (có mạng) */
  if(SAU_LUU_TAM){ var f = SAU_LUU_TAM; SAU_LUU_TAM = null; return f(ds); }
  bao(loiBao, 7);
}
function luuNhieuThe(anh){
  var d = nay(), ds = [], ch = Promise.resolve();
  for(var i=0;i<anh.length;i+=2){
    var k = {id:idMoi(), che:'the', chuaKhai:true,
      ten:tenLuuTam(d, '- người '+(i/2+1)),
      ngay:ngayISO(d), gioQuet:d.toISOString(),
      xa:'', diem:'', ap:'', to:'', ghi:'', tag:[], ctrinh:[],
      taoLuc:d.toISOString()};
    (function(k, a, b){
      ch = ch.then(function(){ return doiTenAnh(a.id, k.id+'_matTruoc'); })
        .then(function(){ return b ? doiTenAnh(b.id, k.id+'_matSau') : null; });
    })(k, anh[i], anh[i+1]);
    k.matTruoc = true; k.matSau = !!anh[i+1];
    ds.push(k);
  }
  return ch.then(function(){ ghiLuuTam(ds, 'Đã lưu tạm '+ds.length+' bản. Khai sau khi rảnh.'); })
    .catch(function(e){ baoLoi('Chưa lưu được ảnh: '+(e&&e.message||e)); });
}
function doiTenAnh(idCu, idMoiT){
  return docFile('hs_'+idCu).then(function(b){
    if(!b) return;
    return luuFile('hs_'+idMoiT, b).then(function(){ return xoaFile('hs_'+idCu); });
  });
}

/* khai đầy đủ rồi lưu */
function khaiVaLuu(){
  var anh = HANG.filter(function(x){ return x.kieu==='anh'; });
  dongHop();
  /* 3.35: nhiều người một lần (trước đây chỉ lấy 2 ảnh đầu, các ảnh sau bị bỏ) → lưu tạm từng người rồi mở khai hàng loạt */
  if(SC.che==='the' && anh.length>2){
    return luuNhieuThe(anh).then(function(){ setTimeout(khaiHangLoat, 300); });
  }
  donGocHang();
  if(SC.che==='the'){
    var k = {id:idMoi(), che:'the', ten:'', ngay:ngayISO(nay()),
      xa:D.cauHinh.hsXaCuoi||'', diem:D.cauHinh.hsDiemCuoi||'',
      ap:D.cauHinh.hsApCuoi||'', to:D.cauHinh.hsToCuoi||'', ghi:'',
      tag:['CCCD'], ctrinh:[], taoLuc:new Date().toISOString()};
    var ch = Promise.resolve();
    if(anh[0]){ ch = ch.then(function(){ return doiTenAnh(anh[0].id, k.id+'_matTruoc'); });
      k.matTruoc = true; }
    if(anh[1]){ ch = ch.then(function(){ return doiTenAnh(anh[1].id, k.id+'_matSau'); });
      k.matSau = true; }
    ch.then(function(){
      HANG = []; window.__k = k;
      D.scan = D.scan || []; D.scan.push(k); HS.ds = D.scan; luu();
      themKhach(k.id);
    });
  }else{
    var k2 = {id:idMoi(), che:'tailieu', ten:'', ngay:ngayISO(nay()),
      xa:D.cauHinh.hsXaCuoi||'', diem:'', ap:D.cauHinh.hsApCuoi||'',
      to:D.cauHinh.hsToCuoi||'', ghi:'', tag:[], ctrinh:[],
      trang:HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; }).map(hangRaTrang),
      taoLuc:new Date().toISOString()};
    HANG = [];
    D.scan = D.scan || []; D.scan.push(k2); HS.ds = D.scan; luu();
    scanTaiLieu(k2.id);
  }
}

/* ---- CHẾ ĐỘ TÀI LIỆU: chụp nhiều trang rồi ghép ---- */
function scanTaiLieu(id){
  var k = id ? D.scan.find(function(x){ return x.id===id; })
             : {id:idMoi(), che:'tailieu', ten:'', ngay:ngayISO(nay()),
                xa:D.cauHinh.hsXaCuoi||'', diem:'', ap:D.cauHinh.hsApCuoi||'',
                to:D.cauHinh.hsToCuoi||'', ghi:'', trang:[], tag:[], ctrinh:[],
                taoLuc:new Date().toISOString()};
  window.__k = k;
  /* 3.75 (AP): gọn 1 màn hình — trái ô nhập, phải xem các trang */
  moHop('<div class="sua-trai">'+
    '<div class="hop-tit" title="Chụp lần lượt từng trang. App tự tìm tờ giấy, nắn thẳng và làm trắng nền, xong ghép thành một file PDF.">'+(id?'Sửa bản quét tài liệu':'Quét tài liệu')+'</div>'+
    '<div class="sg-hd" id="sg-hd"><span class="sg-goi">💡 Bấm vào ô để xem hướng dẫn và ví dụ</span></div>'+
    '<div class="sg-khoi">'+
      '<div class="o"><label>Tên tài liệu</label><input id="k-ten" value="'+coChuHTML(k.ten||'')+'" placeholder="Ví dụ: Đơn vay NS&VSMT hộ Nguyễn Văn A" autocomplete="off"></div>'+
      '<div id="k-diaban" class="q-db">'+veDiaBan(k)+'</div>'+
      '<div class="o"><label>Ghi chú <small>(không bắt buộc)</small></label><input id="k-ghi" value="'+coChuHTML(k.ghi||'')+'" placeholder="Không bắt buộc" autocomplete="off"></div>'+
    '</div>'+
    '<div class="sg-khoi q-chip">'+oChonCT(k.ctrinh||[], 'k-ct')+
      oChonTag('scan', k.tag||[], 'k-tag').replace('<label>Tag thuộc tính — chọn được nhiều</label>',
        '<label>Tag <small>(chọn được nhiều)</small> <a class="lk" onclick="suaTagTab(\'scan\')">✎ sửa danh sách</a></label>')+'</div>'+
    '<div class="sg-khoi q-chup"><div>'+
      '<button class="nho sg-ico" onclick="themTrang(1)">📷 Chụp trang</button>'+
      '<button class="nho sg-ico" onclick="themTrang(0)">🖼 Chọn ảnh</button>'+
      '<button class="nho sg-ico" onclick="themTrangPDF()">＋ Chọn PDF</button></div></div>'+
    '<div class="day-form">'+(id?'<span class="xoa-nho" onclick="xoaKhach(\''+id+'\')">🗑 Xóa</span>':'')+
      '<button class="nho" onclick="dongHop()">Đóng (Esc)</button>'+
      '<button class="nho chinh" onclick="luuScanTL()">Lưu bản quét <small>Ctrl+Enter</small></button></div>'+
    '</div>'+
    '<div class="sua-xem q-xem"><div class="q-xem-tit" id="nn-trang">Các trang ('+(k.trang||[]).length+')</div><div id="k-xem"></div></div>',
    true);
  quetGon('tl');
  veTrangScan();
}
function themTrang(chup){
  var k0 = window.__k;
  if(k0 && document.getElementById('k-ten')){
    k0.ten = gt('k-ten'); k0.ghi = gt('k-ghi');
    k0.xa = gt('k-xa'); k0.diem = gt('k-diem'); k0.ap = gt('k-ap'); k0.to = gt('k-to');
    k0.ctrinh = layThe('k-ct'); k0.tag = layThe('k-tag');
  }
  var i = document.createElement('input');
  i.type='file'; i.accept='image/*';
  if(chup) i.capture='environment'; else i.multiple = true;
  i.onchange = function(){
    var fs = Array.prototype.slice.call(i.files);
    if(!fs.length) return;
    var k = window.__k;
    bao('Đang cắt, nắn và làm trắng nền '+fs.length+' trang…', 4);
    batChay(true);
    fs.reduce(function(p, f){
      return p.then(function(){
        return chuanAnh(f, 'a4').then(function(b){
          var idT = k.id+'_t'+((k.trang||[]).length+1)+'_'+idMoi();
          return luuAnhHS(idT, b).then(function(){
            k.trang = k.trang || [];
            k.trang.push(idT);
          });
        });
      });
    }, Promise.resolve()).then(function(){
      tatChay(); window.__k = k;
      var n = document.getElementById('nn-trang');
      if(n) n.textContent = 'Các trang ('+k.trang.length+')';
      veTrangScan();
      bao('Đã thêm '+fs.length+' trang.', 3);
    }).catch(function(e){
      tatChay(); baoLoi('Không xử lý được ảnh: '+(e&&e.message||e));
    });
  };
  i.click();
}
function veTrangScan(){
  var k = window.__k, e = document.getElementById('k-xem');
  if(!e) return;
  e.innerHTML = (k.trang||[]).length ? '' : '<div class="rong">Chưa có trang nào.<br>Bấm <b>📷 Chụp trang</b>, <b>🖼 Chọn ảnh</b> hoặc <b>＋ Chọn PDF</b> ở bên trái.</div>';
  var n = (k.trang||[]).length;
  (k.trang||[]).forEach(function(idT, i){
    var d = document.createElement('div');
    d.style.cssText = 'margin-bottom:8px;position:relative';
    /* 3.35: dời thứ tự trang, trang PDF xoay được */
    d.innerHTML = '<div class="huong-dan" style="margin:0 0 4px">Trang '+(i+1)+(laTrangPDF(idT)?' · PDF':'')+
      ' <b style="cursor:pointer;color:var(--do)" onclick="boTrang('+i+')">bỏ</b>'+
      ' · <b style="cursor:pointer" onclick="xoayTrang('+i+')">xoay</b>'+
      (i>0?' · <b style="cursor:pointer" onclick="dichTrang('+i+',-1)">◀ lên</b>':'')+
      (i<n-1?' · <b style="cursor:pointer" onclick="dichTrang('+i+',1)">xuống ▶</b>':'')+'</div>';
    var im = document.createElement('img');
    im.style.cssText = 'width:100%;border-radius:9px;border:1px solid var(--vien)';
    d.appendChild(im); e.appendChild(d);
    anhTrangHS(idT, im);
  });
}
/* 3.35: hiện một trang của bản tài liệu — ảnh, hoặc trang PDF gốc (vẽ bằng pdf.js) */
function anhTrangHS(idT, im){
  if(laTrangPDF(idT)) return anhTrangPDF(idT, 700).then(function(u){ im.src = u; }).catch(function(){ im.alt = 'Không xem trước được trang PDF'; });
  return docAnhHS(idT).then(function(b){ if(b) im.src = URL.createObjectURL(b); });
}
function capNhatSoTrang(){
  var k = window.__k, n = document.getElementById('nn-trang');
  if(n) n.textContent = 'Các trang ('+(k.trang||[]).length+')';
}
function boTrang(i){
  var k = window.__k;
  var idT = k.trang.splice(i,1)[0];
  if(laTrangPDF(idT)){
    var ng = tachTrangPDF(idT).nguon;
    if(!k.trang.some(function(t){ return laTrangPDF(t) && tachTrangPDF(t).nguon===ng; })) xoaFile('hs_'+ng);
  } else xoaFile('hs_'+idT);
  capNhatSoTrang();
  veTrangScan();
}
function dichTrang(i, d){
  var k = window.__k, j = i+d; if(!k.trang || j<0 || j>=k.trang.length) return;
  var t = k.trang[i]; k.trang[i] = k.trang[j]; k.trang[j] = t; veTrangScan();
}
function xoayTrang(i){
  var k = window.__k, idT = k.trang[i];
  if(laTrangPDF(idT)){ var o = tachTrangPDF(idT); o.xoay = (o.xoay+90)%360; k.trang[i] = ghepTrangPDF(o); return veTrangScan(); }
  batChay(true);
  docAnhHS(idT).then(function(b){
    if(!b) throw new Error('không đọc được');
    return xoayAnh(b).then(function(b2){ return luuAnhHS(idT, b2); });
  }).then(function(){ tatChay(); veTrangScan(); })
  .catch(function(e){ tatChay(); baoLoi('Không xoay được: '+(e&&e.message||e)); });
}
/* 3.35: chèn trang từ file PDF có sẵn vào bản tài liệu đang sửa (thêm vào cuối, dời ◀ ▶ tới chỗ cần) */
function themTrangPDF(){
  var k0 = window.__k;
  if(k0 && document.getElementById('k-ten')){
    k0.ten = gt('k-ten'); k0.ghi = gt('k-ghi');
    k0.xa = gt('k-xa'); k0.diem = gt('k-diem'); k0.ap = gt('k-ap'); k0.to = gt('k-to');
    k0.ctrinh = layThe('k-ct'); k0.tag = layThe('k-tag');
  }
  chonTepPDF(function(fs){
    var k = window.__k; batChay(true);
    fs.reduce(function(p, f){
      return p.then(function(){ return catPDFNguon(f).then(function(ds){
        k.trang = k.trang || []; ds.forEach(function(o){ k.trang.push(ghepTrangPDF(o)); }); }); });
    }, Promise.resolve()).then(function(){
      tatChay(); capNhatSoTrang(); veTrangScan(); bao('Đã thêm các trang PDF vào cuối.', 4);
    }).catch(function(e){ tatChay(); baoLoi('Không đọc được PDF: '+(e&&e.message||e)); });
  });
}
function luuScanTL(){
  var k = window.__k;
  k.ten = gt('k-ten'); k.ghi = gt('k-ghi');
  k.xa = gt('k-xa'); k.diem = gt('k-diem'); k.ap = gt('k-ap'); k.to = gt('k-to');
  k.ctrinh = layThe('k-ct'); k.tag = layThe('k-tag');
  if(!k.ten) return baoLoi('Chưa đặt tên tài liệu.');
  if(!(k.trang||[]).length) return baoLoi('Chưa có trang nào.');
  if(!k.diem && k.xa && k.ap) k.diem = diemCuaAp(k.xa, k.ap) || '';   /* 3.33: không tự điền địa bàn lần trước */
  delete k.chuaKhai; k.suaLuc = new Date().toISOString(); if(k.driveId) k.canDay = true;
  D.cauHinh.hsXaCuoi = k.xa; D.cauHinh.hsApCuoi = k.ap; D.cauHinh.hsToCuoi = k.to;
  ghiTagGanDay('scan', k.tag);
  D.scan = D.scan || [];
  var i = D.scan.findIndex(function(x){ return x.id===k.id; });
  if(i>=0) D.scan[i] = k; else D.scan.push(k);
  luu(); dongHop(); ve();
  bao('Đã lưu bản quét '+(k.trang||[]).length+' trang.', 4);
  if(D.cauHinh.hsTuDrive!==false && coTheNoiDrive()) dayScanNhieu([k.id]);   /* 3.33: tài liệu cũng tự lên Drive */
}

/* ---- xoay ảnh 90° ---- */
function xoayAnh(blob){
  return new Promise(function(ok, loi){
    var img = new Image();
    img.onload = function(){
      var c = document.createElement('canvas');
      c.width = img.height; c.height = img.width;
      var x = c.getContext('2d');
      x.translate(c.width/2, c.height/2);
      x.rotate(Math.PI/2);
      x.drawImage(img, -img.width/2, -img.height/2);
      c.toBlob(function(b){ ok(b); }, 'image/jpeg', 0.9);
    };
    img.onerror = function(){ loi(new Error('không đọc được ảnh')); };
    img.src = URL.createObjectURL(blob);
  });
}
