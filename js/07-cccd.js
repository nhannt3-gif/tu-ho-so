/* ==========================================================
   12. HỒ SƠ CCCD
   - 3.32: KHÔNG mã hóa nữa (anh Nhân chốt: Drive của anh là nơi lưu bảo mật).
     Ảnh mới lưu thẳng; ảnh cũ đã mã hóa vẫn đọc được bằng khóa cũ và tự chuyển sang không mã hóa khi mở.
   - Bản PDF hồ sơ mặc định đưa lên Drive (Tủ hồ sơ/CCCD/…)
   - KHÔNG BAO GIỜ gửi ảnh tới AI
   - Cắt nắn, làm đẹp, ghép in đều chạy tại chỗ
   ========================================================== */
var HS = {mo:false, khoa:null, ds:[], locXa:'', locAp:'', locTo:'', chon:{}};
var THE_MM = {rong:85.6, cao:54};   /* kích thước thật của thẻ CCCD */

/* ---- giải mã ảnh cũ (bản trước 3.32 có mã hóa) ---- */
function giaiMa(khoa, buf){
  var u = new Uint8Array(buf);
  return crypto.subtle.decrypt({name:'AES-GCM', iv:u.slice(0,12)}, khoa, u.slice(12));
}

/* ---- mở khóa ---- */
/* 3.32: không mã hóa nữa — chỉ nạp khóa CŨ (nếu máy có) để đọc ảnh lưu từ bản trước */
function moHoSo(){
  if(HS.mo) return veScan();
  return sanKhoaHS().then(function(){
    HS.mo = true; napHoSo();
  }).catch(function(e){
    console.warn('Không nạp được khóa ảnh cũ', e);
    HS.mo = true; HS.khoa = null; napHoSo();
  });
}
function sanKhoaHS(){
  if(HS.khoa) return Promise.resolve(HS.khoa);
  if(!(window.crypto && crypto.subtle)) return Promise.resolve(null);
  var raw = D.cauHinh.hsKhoa;
  if(raw){
    return crypto.subtle.importKey('raw', new Uint8Array(raw),
      {name:'AES-GCM'}, false, ['encrypt','decrypt']).then(function(k){
        HS.khoa = k; return k; });
  }
  return Promise.resolve(null);   /* máy chưa từng có khóa → không tạo khóa mới */
}


/* ==========================================================
   3.79.1 — KHÔI PHỤC DANH SÁCH SCAN TỪ ẢNH CÒN TRONG MÁY
   (lỗi cũ làm mất DANH SÁCH, ảnh vẫn còn trong IndexedDB):
   - thẻ CCCD: hs_<id>_matTruoc / _matSau → 1 bản thẻ
   - tài liệu: hs_<id>_t<n>_<x> → gom theo <id>, xếp theo n → 1 bản tài liệu
   - ảnh / PDF lẻ khác (quét bằng webcam, PDF chọn vào) → gom theo giờ tạo (cách nhau ≤ 15 phút = 1 bản)
   Mục khôi phục để "chưa khai" (tên trống) → anh khai lại bằng Khai hàng loạt. Không xóa gì.
   ========================================================== */
function timAnhScanMoCoi(){
  var biet = {};
  var danh = function(t){ if(t) biet['hs_'+t] = 1; };
  (D.scan||[]).concat((D.rac||[]).filter(function(m){ return m.khoCu==='scan' || m.che; })).forEach(function(k){
    danh(k.id+'_matTruoc'); danh(k.id+'_matSau');
    (k.trang||[]).forEach(function(t){ danh(laTrangPDF(t) ? tachTrangPDF(t).nguon : t); });
  });
  (typeof HANG!=='undefined' ? HANG : []).forEach(function(x){ danh(x.id); if(x.nguon) danh(x.nguon); });
  try{ var hj = JSON.parse(localStorage.getItem(KHOA_HANG)||'null'); ((hj&&hj.ds)||[]).forEach(function(x){ danh(x.id); if(x.nguon) danh(x.nguon); }); }catch(e){}
  return moKho().then(function(db){
    return new Promise(function(ok){
      var ds = [];
      try{
        var st = db.transaction('f','readonly').objectStore('f');
        var r = st.openCursor();
        r.onsuccess = function(ev){
          var c = ev.target.result; if(!c){ ok(ds); return; }
          var k = String(c.key);
          if(/^hs_/.test(k) && !/^hs_ka/.test(k) && !/[_](goc|nho)$/.test(k) && !biet[k]) ds.push({k:k, pdf:!!(c.value && /pdf/.test(c.value.type||''))});
          c.continue();
        };
        r.onerror = function(){ ok(ds); };
      }catch(e){ ok(ds); }
    });
  }).catch(function(){ return []; });
}
function tgTuId(id){ var t = parseInt(String(id).slice(0, 8), 36); return (t >= Date.UTC(2020, 0, 1) && t <= Date.now() + 86400000) ? t : 0; }
function lapScanKhoiPhuc(keys){
  var the = {}, tl = {}, le = [];
  keys.forEach(function(x){
    var k = x.k.slice(3), m;
    if((m = k.match(/^(.+)[_](matTruoc|matSau)$/))) (the[m[1]] = the[m[1]] || {})[m[2]] = true;
    else if((m = k.match(/^(.+)[_]t(\d+)[_][a-z0-9]+$/))) (tl[m[1]] = tl[m[1]] || []).push({id:k, n:+m[2]});
    else le.push({id:k, pdf:x.pdf, tg:tgTuId(k)});
  });
  var coSan = {}; (D.scan||[]).forEach(function(k){ coSan[k.id] = k; });   /* 3.80.1: mã đã có trong danh sách → gắn ảnh vào, không tạo bản trùng */
  var ra = [], ngayCua = function(id){ var t = tgTuId(id); return t ? ngayISO(new Date(t)) : ngayISO(nay()); };
  var khung = function(id, che){ return {id:id, che:che, ten:'', ngay:ngayCua(id), xa:'', diem:'', ap:'', to:'', ghi:'Khôi phục từ ảnh còn trong máy', tag:che==='the'?['CCCD']:[], ctrinh:[],
    taoLuc:new Date(tgTuId(id)||Date.now()).toISOString(), chuaKhai:true, khoiPhuc:true}; };
  Object.keys(the).forEach(function(id){
    var c = coSan[id]; if(c){ if((the[id].matTruoc && !c.matTruoc) || (the[id].matSau && !c.matSau)) ra.push({gan:c, matTruoc:!!the[id].matTruoc, matSau:!!the[id].matSau, che:'gan'}); return; }
    if(!the[id].matTruoc) return; var k = khung(id, 'the'); k.matTruoc = true; k.matSau = !!the[id].matSau; ra.push(k); });
  Object.keys(tl).forEach(function(id){
    var tr = tl[id].sort(function(a, b){ return a.n-b.n; }).map(function(x){ return x.id; }), c = coSan[id];
    if(c){ if(!(c.trang||[]).length) ra.push({gan:c, trang:tr, che:'gan'}); return; }   /* chỉ ghi nhận — gắn khi anh bấm Khôi phục */
    var k = khung(id, 'tailieu'); k.trang = tr; ra.push(k); });
  le.sort(function(a, b){ return a.tg-b.tg; });
  var nhom = null;
  le.forEach(function(x){
    if(!nhom || !x.tg || !nhom.tg || x.tg - nhom.tg > 15*60000){ nhom = khung(x.id, 'tailieu'); nhom.id = 'kp'+idMoi(); nhom.ngay = ngayCua(x.id); nhom.trang = []; nhom.tg = x.tg; nhom.pdf = []; ra.push(nhom); }
    if(x.pdf) nhom.pdf.push(x.id); else nhom.trang.push(x.id);
    nhom.tg = x.tg || nhom.tg;
  });
  return ra;
}
function khoiPhucScan(){
  batChay(true, 'Đang tìm ảnh scan còn trong máy…');
  /* có Drive: kéo chỉ mục về trước (bắt buộc tải lại) — bản nào còn trên Drive thì lấy lại đủ tên, địa bàn */
  var keo = (typeof coTheNoiDrive==='function' && coTheNoiDrive() && DR.sanSang)
    ? (D.cauHinh.chiMucDriveTG = '', D.cauHinh.chiMucThoi = '', taiChiMucTuDrive(true).catch(function(){}))
    : Promise.resolve();
  var truoc = (D.scan||[]).length;
  Promise.resolve(keo).then(function(){ return timAnhScanMoCoi(); }).then(function(keys){
    var tuDrive = (D.scan||[]).length - truoc; if(tuDrive > 0) bao('Lấy lại '+tuDrive+' bản scan từ chỉ mục trên Drive.', 5);
    var ds = lapScanKhoiPhuc(keys);
    /* PDF chọn vào: đếm số trang để dựng lại từng trang */
    return ds.reduce(function(p, k){
      return p.then(function(){
        if(!k.pdf || !k.pdf.length) return;
        return k.pdf.reduce(function(p2, nguon){
          return p2.then(function(){
            if(!sanSangPDF()){ k.trang.push(ghepTrangPDF({nguon:nguon, so:0})); return; }
            return moPDFNguon(nguon).then(function(pdf){ for(var i=0;i<pdf.numPages;i++) k.trang.push(ghepTrangPDF({nguon:nguon, so:i})); })
              .catch(function(){ k.trang.push(ghepTrangPDF({nguon:nguon, so:0})); });
          });
        }, Promise.resolve());
      });
    }, Promise.resolve()).then(function(){ return ds; });
  }).then(function(ds){
    tatChay();
    var gan = ds.filter(function(k){ return k.gan; }), bay = new Date().toISOString();
    gan.forEach(function(x){ if(x.trang) x.gan.trang = x.trang; if(x.matTruoc) x.gan.matTruoc = true; if(x.matSau) x.gan.matSau = true; x.gan.suaLuc = bay; });
    ds = ds.filter(function(k){ delete k.pdf; delete k.tg; return !k.gan && (k.che==='the' || (k.trang||[]).length); });
    if(!ds.length && !gan.length) return bao('Không còn ảnh scan nào chưa có trong danh sách.', 5);
    D.scan = D.scan || []; ds.forEach(function(k){ D.scan.push(k); }); HS.ds = D.scan; luu(); KP_DEM = null;
    if(gan.length && !ds.length){ if(nganHienTai===4) veScan(); return bao('Đã gắn lại ảnh trong máy cho '+gan.length+' bản đã có trong danh sách.', 6); }
    if(nganHienTai===4) veScan();
    bao('Đã khôi phục '+ds.length+' bản scan từ ảnh còn trong máy ('+ds.filter(function(k){ return k.che==='the'; }).length+' thẻ, '+
      ds.filter(function(k){ return k.che!=='the'; }).length+' tài liệu). Bấm Khai hàng loạt để ghi lại tên, địa bàn.', 10);
  }).catch(function(e){ tatChay(); baoLoi('Chưa khôi phục được: '+(e&&e.message||e)); });
}
/* tab Scan: danh sách trống / ít hơn ảnh trong máy → hiện thanh nhắc khôi phục */
var KP_DEM = null;
function demScanKhoiPhuc(){
  if(KP_DEM!==null) return;
  KP_DEM = 0;
  timAnhScanMoCoi().then(function(keys){ KP_DEM = lapScanKhoiPhuc(keys).length; if(KP_DEM && nganHienTai===4) veScan(); });
}

/* ---- kho hồ sơ (chỉ mục riêng, không xuất ra Drive) ---- */
function napHoSo(){
  D.scan = D.scan || D.cauHinh.hsDS || [];
  HS.ds = D.scan;
  veScan();
}
/* 3.79.1: không bao giờ ghi đè D.scan bằng danh sách trống của tab Scan chưa mở — chỉ thêm mục còn thiếu */
function luuHoSo(){
  D.scan = D.scan || [];
  if(HS.ds && HS.ds!==D.scan){
    if(HS.mo) D.scan = HS.ds;
    else { var co = {}; D.scan.forEach(function(k){ co[k.id] = 1; }); HS.ds.forEach(function(k){ if(k && !co[k.id]) D.scan.push(k); }); }
  }
  HS.ds = D.scan; luu();
}

/* ---- cắt nắn & làm đẹp ảnh ----
   3.35: thay bộ cũ (chỉ cắt giữa ảnh theo tỉ lệ thẻ + kéo giãn sáng tối nên ảnh hay tối, dính mặt bàn)
   bằng bộ xử lý mới ở khối "XỬ LÝ ẢNH SCAN" (tìm khung, nắn phối cảnh, tự lật, lọc Magic / Giấy trắng) */
function chuanAnh(file, che){
  return chuanAnhCT(file, che).then(function(r){ return r.blob; });
}
/* trả thêm mặt trước/sau app nhận được — hộp khai CCCD dùng để tự xếp đúng mặt */
function chuanAnhCT(file, che){
  var x = {che: che==='a4' ? 'tailieu' : 'the'};
  return thuGoc(file).then(anhTuBlob).then(function(im){
    return canvasRaBlob(xuLyTuAnh(im, x, true), 0.9);
  }).then(function(b){ return {blob:b, mat:x.mat, x:x}; });
}

function luuAnhHS(id, blob){ return luuFile('hs_'+id, blob); }   /* 3.32: lưu thẳng, không mã hóa */
function docAnhHS(id){
  return docFile('hs_'+id).then(function(b){
    if(!b) return null;
    if(/^image\//.test(b.type||'')) return b;               /* ảnh lưu thẳng (3.32 trở đi) */
    return sanKhoaHS().then(function(k){
      if(!k) return b;
      return b.arrayBuffer().then(function(buf){ return giaiMa(k, buf); })
        .then(function(pt){
          var anh = new Blob([pt], {type:'image/jpeg'});
          luuFile('hs_'+id, anh);   /* 3.32: ảnh cũ mã hóa → lưu lại dạng thường, lần sau khỏi giải mã */
          return anh;
        }).catch(function(){ return b; });                 /* không phải ảnh mã hóa */
    });
  }).catch(function(){ return null; });
}
