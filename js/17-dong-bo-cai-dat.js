/* ---------- ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE ---------- */
/* 3.113 (anh chốt: app cá nhân → lưu lên Drive hết): đồng bộ TOÀN BỘ cài đặt qua _Hệ thống/cauhinh.json, trừ khóa riêng từng máy
   (độ rộng khung, cỡ chữ, camera, đang xem / đang chọn, khung mở – đóng, mốc đồng bộ / sao lưu của máy).
   chBam (riêng máy) = dấu băm từng khóa lúc đồng bộ gần nhất: khóa máy này chưa sửa → lấy theo Drive (cả phần đã xóa);
   khóa máy này đã sửa → gộp, máy này ưu tiên, thêm phần chỉ Drive có; lần đầu (chưa có chBam) → gộp, Drive ưu tiên, giữ phần chỉ máy này có.
   Mỗi lần đồng bộ: hỏi Drive trước (kéo nếu file mới hơn lần trước), rồi mới đẩy phần máy này đổi — không đè bản mới của máy khác. */
var CH_RIENG = ['chGhiLuc','chKeoLuc','chFileId','chBam','chiMucDriveTG','chiMucThoi','saoLuuNgay','camId','camGiu','camTuDong','rongPV','rongPhai','rongTrai','rongTab','rong339','coChu',
  'cayMo','khoiMo','xaMo','ktKBMo','ktNapMo','slMo','dongGon','moCXL','moGanDay','moLocDT','anBangDC','suaDM','slTQ','slTab','ktgs','kyBang','tcPV','thTK','toTK','skTK',
  'hsXaCuoi','hsApCuoi','hsToCuoi','hsDiemCuoi','scanXem'];
var TEN_CH = 'cauhinh.json', CH_DANG = null, CH_CHU = null;
function chRieng(k){ return CH_RIENG.indexOf(k)>=0; }
function chBamChu(s){ var h = 5381; s = String(s); for(var i=0;i<s.length;i++) h = ((h<<5)+h+s.charCodeAt(i))|0; return (h>>>0).toString(36)+'.'+s.length; }
function chKhoa(){ return Object.keys(D.cauHinh).filter(function(k){ return !chRieng(k) && D.cauHinh[k]!==undefined; }); }
function chBamKhoa(k){ return chBamChu(JSON.stringify(D.cauHinh[k])); }
function goiCauHinh(){ var o = {loai:'cau-hinh-tu-ho-so', ban:3, ghiLuc:new Date().toISOString()}; chKhoa().forEach(function(k){ o[k] = D.cauHinh[k]; }); return o; }
function chLaDT(x){ return !!x && typeof x==='object' && !Array.isArray(x); }
function chGop(a, b, sau){   /* gộp b vào a, b ưu tiên ở lá, sâu tối đa `sau` tầng — trả đối tượng mới */
  if(!chLaDT(a) || !chLaDT(b)) return b;
  var r = {}; Object.keys(a).forEach(function(k){ r[k] = a[k]; });
  Object.keys(b).forEach(function(k){ r[k] = (sau>0 && chLaDT(a[k]) && chLaDT(b[k])) ? chGop(a[k], b[k], sau-1) : b[k]; });
  return r;
}
function chApDrive(j, layHet){   /* áp file Drive vào máy này; layHet = anh bấm "Lấy từ Drive" (Drive ưu tiên mọi khóa) — trả số khóa đổi */
  var bam = layHet ? null : D.cauHinh.chBam, lanDau = !chLaDT(bam), doi = 0;
  Object.keys(j).forEach(function(k){
    if(k==='loai' || k==='ban' || k==='ghiLuc' || chRieng(k) || j[k]===undefined || j[k]===null) return;
    var cu = D.cauHinh[k], moi;
    if(cu===undefined) moi = j[k];
    else if(lanDau) moi = chGop(cu, j[k], 3);
    else if(bam[k] && bam[k]===chBamKhoa(k)) moi = j[k];   /* máy này chưa sửa khóa này → theo Drive */
    else moi = chGop(j[k], cu, 3);                         /* máy này đã sửa → gộp, máy này ưu tiên */
    if(JSON.stringify(moi)!==JSON.stringify(cu)){ D.cauHinh[k] = moi; doi++; }
  });
  return doi;
}
function chDanhDau(){ var b = {}; chKhoa().forEach(function(k){ b[k] = chBamKhoa(k); }); D.cauHinh.chBam = b; }
function chMayDoi(j){   /* máy này có khóa khác bản Drive (j = bản vừa tải) / khác lần đồng bộ trước (j trống) */
  var b = D.cauHinh.chBam;
  return chKhoa().some(function(k){ return j ? (j[k]===undefined || chBamChu(JSON.stringify(j[k]))!==chBamKhoa(k)) : (!chLaDT(b) || b[k]!==chBamKhoa(k)); });
}
function chChuHienTai(){ var o = {}; chKhoa().forEach(function(k){ o[k] = D.cauHinh[k]; }); return JSON.stringify(o); }
function chTheoDoi(){   /* gọi sau mỗi lần lưu: cài đặt (phần đồng bộ) đổi → hẹn đẩy lên Drive sau 4 giây */
  try { var s = chChuHienTai(); if(CH_CHU===null){ CH_CHU = s; return; } if(s!==CH_CHU){ CH_CHU = s; if(typeof henDayCauHinh==='function') henDayCauHinh(); } } catch(e){}
}
function dongBoCauHinh(cheDo){   /* cheDo: 'tu' (tự động: kéo nếu Drive mới hơn, đẩy nếu máy này có đổi) · 'day' (anh bấm Lưu lên Drive) · 'lay' (anh bấm Lấy từ Drive) */
  if(!coTheNoiDrive()) return Promise.resolve({loi:'Chưa nối Drive.'});
  if(CH_DANG) return CH_DANG.then(function(){ return dongBoCauHinh(cheDo); });
  var idTM = '', f = null, doi = 0;
  var xong = function(){ CH_DANG = null; };
  CH_DANG = baoDamDuong(D.cauHinh.thumuc+'/_Hệ thống').then(function(id){
    idTM = id; var q = "name='"+TEN_CH+"' and trashed=false and '"+idTM+"' in parents";
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+'&fields=files(id,modifiedTime)&pageSize=1');
  }).then(function(kq){
    f = kq && kq.files && kq.files[0] || null;
    var keo = !!f && (cheDo!=='tu' || !D.cauHinh.chKeoLuc || D.cauHinh.chFileId!==f.id || String(f.modifiedTime) > String(D.cauHinh.chKeoLuc));   /* 3.140.4: nhớ đúng file đã đồng bộ — khác file (vd thư mục khác) thì luôn lấy về gộp trước, không ghi đè */
    if(!keo) return null;
    return canToken().then(function(){ return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}); })
      .then(function(r){ if(!r.ok) throw new Error('Drive báo lỗi: '+r.status); return r.json(); });
  }).then(function(j){
    if(j && j.loai==='cau-hinh-tu-ho-so'){ doi = chApDrive(j, cheDo==='lay'); D.cauHinh.chKeoLuc = f.modifiedTime; D.cauHinh.chFileId = f.id; } else j = null;
    var canDay = !f || cheDo==='day' || chMayDoi(j);
    if(!canDay){ chDanhDau(); CH_CHU = chChuHienTai(); luu(); return {doi:doi, day:false}; }
    var noi = new Blob([JSON.stringify(goiCauHinh(), null, 1)], {type:'application/json'}), bien = '----tuhoso'+Date.now();
    var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(f ? {} : {name:TEN_CH, parents:[idTM]})+'\r\n--'+bien+'\r\nContent-Type: application/json\r\n\r\n';
    var u = f ? 'https://www.googleapis.com/upload/drive/v3/files/'+f.id+'?uploadType=multipart&fields=id,modifiedTime' : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime';
    return goiDrive(u, {method:f ? 'PATCH' : 'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:new Blob([dau, noi, '\r\n--'+bien+'--'], {type:'multipart/related; boundary='+bien})})
      .then(function(r){ chDanhDau(); if(r && r.modifiedTime) D.cauHinh.chKeoLuc = r.modifiedTime; if(r && r.id) D.cauHinh.chFileId = r.id; D.cauHinh.chGhiLuc = new Date().toISOString(); CH_CHU = chChuHienTai(); luu(); return {doi:doi, day:true}; });
  }).then(function(kq){ xong();
    if(kq.doi){ try{ capNhatDau(); ve(); if(D.cauHinh.slTab==='kt' && typeof ktVeThe==='function' && KT_K) ktVeThe(); }catch(e){} }
    return kq;
  }, function(e){ xong(); return {loi:(e && e.message) || String(e)}; });
  return CH_DANG;
}
function dayCauHinh(imLang){   /* giữ tên cũ cho các chỗ gọi: tự động = im lặng; anh bấm "Lưu lên Drive" = đẩy luôn */
  if(!coTheNoiDrive()){ if(!imLang) baoLoi('Chưa nối Drive.'); return Promise.resolve(false); }
  if(!imLang) batChay(true);
  return dongBoCauHinh(imLang ? 'tu' : 'day').then(function(kq){
    if(!imLang){ tatChay(); if(kq.loi) baoLoi('Không lưu được lên Drive: '+kq.loi); else bao('Đã lưu cài đặt lên Drive'+(kq.doi ? ' (đã gộp '+kq.doi+' mục máy khác vừa sửa)' : '')+'.', 4); }
    return !kq.loi;
  });
}

/* ==========================================================
   ĐỒNG BỘ CHỈ MỤC TỦ HỒ SƠ QUA DRIVE (việc #4)
   Chỉ đồng bộ METADATA (D.vanBan/duLieu/ghiChu/scan/bieuMau) —
   không đụng file thật, không quét ngoài thư mục Tủ hồ sơ.
   Gộp cộng dồn theo id: mục mới ở máy khác thì thêm vào máy này;
   mục đã có ở máy này thì giữ nguyên (chưa merge từng trường).
   ========================================================== */
function maMayCua(){
  var k = 'tuhoso_may';
  var v = localStorage.getItem(k);
  if(!v){ v = 'may_'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); 
    try{ localStorage.setItem(k, v); }catch(e){} }
  return v;
}
var CM_HEN = null, CM_DANG_KEO = false; /* hẹn giờ gom 5 giây trước khi đẩy chỉ mục lên Drive */
function henDongBoChiMuc(){
  if(!coTheNoiDrive() || !DR.sanSang || CM_DANG_KEO) return;
  clearTimeout(CM_HEN);
  CM_HEN = setTimeout(function(){ dayChiMucLenDrive(); }, 5000);
}
/* ==========================================================
   3.81 — SAO LƯU & KHÔI PHỤC
   - Trong máy: mỗi ngày 1 bản (trạng thái lúc mở app đầu ngày) trong IndexedDB, giữ 7 ngày — có cả Theo dõi nợ
   - Trên Drive: _Hệ thống/du_phong/chimuc_YYYY-MM-DD.json (bản đầu ngày, giữ 7)
   - Khôi phục = LẤY LẠI MỤC BỊ THIẾU (chỉ thêm vào, không ghi đè, không đụng mục đang có / trong thùng rác / đã xóa hẳn)
   ========================================================== */
function saoLuuTrongMay(){
  var ngay = ngayISO(nay()), khoa = 'saoluu_'+ngay;
  if(D.cauHinh.saoLuuNgay===ngay) return Promise.resolve(false);
  var goi = goiChiMuc();
  if(!demChiMuc(goi) && !Object.keys(NO.mon||{}).length) return Promise.resolve(false);   /* máy trống — không ghi bản rỗng */
  goi.no = (typeof NO_SAN==='undefined' || NO_SAN) ? NO : null;
  return luuFile(khoa, JSON.stringify(goi)).then(function(){
    D.cauHinh.saoLuuNgay = ngay; luu();
    return dsSaoLuuMay().then(function(ds){ return Promise.all(ds.slice(7).map(function(x){ return xoaFile(x.khoa); })); });
  }).catch(function(e){ console.warn('Không sao lưu được trong máy', e); return false; });
}
function dsSaoLuuMay(){
  return moKho().then(function(db){
    return new Promise(function(ok){
      var ds = [];
      try{
        var r = db.transaction('f','readonly').objectStore('f').openCursor();
        r.onsuccess = function(ev){ var c = ev.target.result; if(!c){ ds.sort(function(a, b){ return b.ngay.localeCompare(a.ngay); }); ok(ds); return; }
          var k = String(c.key), m = k.match(/^saoluu[_](\d{4}-\d{2}-\d{2})$/); if(m) ds.push({khoa:k, ngay:m[1], noi:'may'}); c.continue(); };
        r.onerror = function(){ ok(ds); };
      }catch(e){ ok(ds); }
    });
  }).catch(function(){ return []; });
}
function dsSaoLuuDrive(){
  if(!(typeof coTheNoiDrive==='function' && coTheNoiDrive() && DR.sanSang)) return Promise.resolve([]);
  return baoDamDuong(D.cauHinh.thumuc+'/_Hệ thống/du_phong').then(function(idDP){
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+idDP+"' in parents and trashed=false")+'&fields=files(id,name)&orderBy=name desc&pageSize=20');
  }).then(function(kq){
    return (kq.files||[]).map(function(f){ var m = f.name.match(/(\d{4}-\d{2}-\d{2})/); return m ? {id:f.id, ngay:m[1], noi:'drive'} : null; }).filter(Boolean);
  }).catch(function(){ return []; });
}
function docSaoLuu(x){
  if(x.noi==='may') return docFile(x.khoa).then(function(s){ return typeof s==='string' ? JSON.parse(s) : null; });
  return goiDrive('https://www.googleapis.com/drive/v3/files/'+x.id+'?alt=media');
}
/* các mục có trong bản sao lưu mà máy này đang THIẾU (không tính mục đang ở thùng rác hoặc đã xóa hẳn) */
function mucThieuTuSaoLuu(j){
  var co = {}, ra = {};
  KHO_SAO_LUU.concat([['rac','']]).forEach(function(k){ (D[k[0]]||[]).forEach(function(m){ co[m.id] = 1; }); });
  (D.daXoaHan||[]).forEach(function(t){ co[t.id] = 1; });
  KHO_SAO_LUU.forEach(function(k){ ra[k[0]] = ((j && j[k[0]])||[]).filter(function(m){ return m && m.id && !co[m.id] && !laFileHeThong(m); }); });
  ra.no = 0;
  if(j && j.no && j.no.mon){ ra.noMon = Object.keys(j.no.mon).filter(function(id){ return !(NO.mon||{})[id]; }); ra.no = ra.noMon.length; }
  return ra;
}
var SL_DS = [], SL_CHON = null;
function veSaoLuuHTML(){
  setTimeout(napDsSaoLuu, 30);
  return '<div class="huong-dan" style="margin:6px 0 10px">App giữ <b>7 bản sao lưu gần nhất</b> trong máy (mỗi ngày 1 bản, lúc mở app đầu ngày) và 7 bản trên Drive (nếu đã nối). '+
    '<b>Lấy lại</b> chỉ <b>thêm các mục đang bị thiếu</b> — không ghi đè, không đụng mục đang có, mục trong thùng rác hay đã xóa hẳn.</div>'+
    '<div class="hang-nut" style="justify-content:flex-start"><button class="nho" onclick="D.cauHinh.saoLuuNgay=\'\';saoLuuTrongMay().then(napDsSaoLuu);bao(\'Đã sao lưu trong máy (bản hôm nay).\',4)">💾 Sao lưu ngay</button></div>'+
    '<div id="sl-ds"><div class="rong">Đang đọc các bản sao lưu…</div></div>';
}
function napDsSaoLuu(){
  var e = document.getElementById('sl-ds'); if(!e) return;
  Promise.all([dsSaoLuuMay(), dsSaoLuuDrive()]).then(function(a){
    SL_DS = a[0].concat(a[1]);
    if(!SL_DS.length){ e.innerHTML = '<div class="rong">Chưa có bản sao lưu nào. Bản đầu tiên tự tạo khi mở app ngày mai, hoặc bấm 💾 Sao lưu ngay.</div>'; return; }
    e.innerHTML = '<div class="sl-ds">'+SL_DS.map(function(x, i){
      return '<div class="sl-dong"><span>'+(x.noi==='may'?'💻 Trong máy':'☁ Drive')+' · <b>'+lcDMY(x.ngay)+'</b></span><span class="sl-so" id="sl-so-'+i+'">…</span>'+
        '<button class="nho" onclick="xemSaoLuu('+i+')">So sánh</button></div>'; }).join('')+'</div><div id="sl-ct"></div>';
    SL_DS.forEach(function(x, i){ docSaoLuu(x).then(function(j){ x.j = j; var t = document.getElementById('sl-so-'+i); if(!t) return;
      var th = mucThieuTuSaoLuu(j), n = KHO_SAO_LUU.reduce(function(s, k){ return s + th[k[0]].length; }, 0) + (th.no||0);
      t.innerHTML = demChiMuc(j)+' mục'+(n ? ' · <b class="sl-thieu">máy đang thiếu '+n+'</b>' : ' · <span class="sl-du">không thiếu</span>'); })
      .catch(function(){ var t = document.getElementById('sl-so-'+i); if(t) t.textContent = 'không đọc được'; }); });
  });
}
function xemSaoLuu(i){
  var x = SL_DS[i], e = document.getElementById('sl-ct'); if(!x || !e) return;
  var chay = x.j ? Promise.resolve(x.j) : docSaoLuu(x);
  chay.then(function(j){
    x.j = j; SL_CHON = x;
    var th = mucThieuTuSaoLuu(j), dong = KHO_SAO_LUU.filter(function(k){ return th[k[0]].length; });
    var n = dong.reduce(function(s, k){ return s + th[k[0]].length; }, 0) + (th.no||0);
    e.innerHTML = '<div class="sl-ct"><b>Bản '+(x.noi==='may'?'trong máy':'trên Drive')+' ngày '+lcDMY(x.ngay)+'</b> · '+demChiMuc(j)+' mục'+
      (n ? dong.map(function(k){ return '<div class="sl-kho"><b>'+k[1]+'</b> — thiếu '+th[k[0]].length+': <small>'+
          th[k[0]].slice(0, 8).map(function(m){ return coChuHTML(m.tenMoi||m.ten||m.tenCu||m.soHieu||m.id); }).join(' · ')+(th[k[0]].length>8?' …':'')+'</small></div>'; }).join('')+
        (th.no ? '<div class="sl-kho"><b>Theo dõi nợ</b> — thiếu '+th.no+' món vay</div>' : '')+
        '<div class="hang-nut"><button class="nho chinh" onclick="layLaiSaoLuu()">♻ Lấy lại '+n+' mục thiếu</button></div>'
      : '<div class="huong-dan">Máy này không thiếu mục nào so với bản này.</div>')+'</div>';
  }).catch(function(err){ e.innerHTML = '<div class="rong">Không đọc được bản sao lưu: '+coChuHTML(err&&err.message||String(err))+'</div>'; });
}
function layLaiSaoLuu(){
  var x = SL_CHON; if(!x || !x.j) return;
  var th = mucThieuTuSaoLuu(x.j), n = 0, bay = new Date().toISOString();
  KHO_SAO_LUU.forEach(function(k){ D[k[0]] = D[k[0]] || []; th[k[0]].forEach(function(m){ m.suaLuc = bay; D[k[0]].push(m); n++; }); });
  if(typeof HS!=='undefined') HS.ds = D.scan;
  if(th.no && x.j.no){
    th.noMon.forEach(function(id){ NO.mon[id] = x.j.no.mon[id]; var mh = x.j.no.mon[id] && x.j.no.mon[id].ma; if(mh && x.j.no.ho && x.j.no.ho[mh] && !NO.ho[mh]) NO.ho[mh] = x.j.no.ho[mh]; n++; });
    luuNo();
  }
  luu(); ve(); napDsSaoLuu();
  bao('Đã lấy lại '+n+' mục từ bản sao lưu ngày '+lcDMY(x.ngay)+'.', 6);
}

/* 3.81: đếm số mục trong 1 bản chỉ mục (để chặn ghi trống / hiện ở danh sách sao lưu) */
var KHO_SAO_LUU = [['vanBan','Văn bản'],['duLieu','Dữ liệu tháng'],['ghiChu','Ghi chú'],['bieuMau','Biểu mẫu'],['scan','Scan'],['kyAnh','Chữ ký·CCCD'],['boHS','Bộ hồ sơ']];
function demChiMuc(j){ return KHO_SAO_LUU.reduce(function(t, k){ return t + ((j && j[k[0]]) || []).length; }, 0); }
function goiChiMuc(){
  return {
    xuatLuc: new Date().toISOString(), may: maMayCua(),
    vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu,
    scan:(D.scan||[]), kyAnh:(D.kyAnh||[]), bieuMau:(D.bieuMau||[]), boHS:(D.boHS||[]),
    rac:(D.rac||[]), daXoaHan:(D.daXoaHan||[]).filter(function(t){ return Date.now()-new Date(t.luc).getTime() < 366*864e5; }),
    daXoa:(D.rac||[]).filter(function(r){
      var q = new Date(r.xoaLuc||0).getTime();
      return Date.now()-q < 60*24*3600000; /* chỉ mang theo 60 ngày */
    }).map(function(r){ return {id:r.id, xoaLuc:r.xoaLuc}; })
  };
}
/* tìm file theo tên trong một thư mục, trả {id,modifiedTime} hoặc null */
function timFileTrong(ten, idTM){
  var q = "name='"+ten.replace(/'/g,"\\'")+"' and trashed=false and '"+idTM+"' in parents";
  return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
    '&fields=files(id,modifiedTime)&pageSize=1').then(function(kq){
    return (kq.files && kq.files[0]) || null;
  });
}
function ghiJSONLenDrive(ten, idTM, obj, fileCu){
  var noi = new Blob([JSON.stringify(obj, null, 1)], {type:'application/json'});
  var bien = '----tuhoso'+Date.now();
  var meta = fileCu ? {} : {name:ten, parents:[idTM]};
  var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+
    JSON.stringify(meta)+'\r\n--'+bien+'\r\nContent-Type: application/json\r\n\r\n';
  var body = new Blob([dau, noi, '\r\n--'+bien+'--'],
    {type:'multipart/related; boundary='+bien});
  var u = fileCu
    ? 'https://www.googleapis.com/upload/drive/v3/files/'+fileCu.id+'?uploadType=multipart&fields=id,modifiedTime'
    : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime';
  return goiDrive(u, {method: fileCu?'PATCH':'POST',
    headers:{'Content-Type':'multipart/related; boundary='+bien}, body:body});
}
/* đẩy chỉ mục hiện tại của máy này lên Drive, giữ 7 bản dự phòng theo ngày */
function dayChiMucLenDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(false);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){
    var soRemote = 0;
    return timFileTrong('chimuc.json', idTM).then(function(cu){
      /* 3.81 (việc F): LUÔN tải bản trên Drive về gộp trước rồi mới ghi — trước chỉ gộp khi máy khác vừa gửi,
         nên máy này lỡ mất danh sách (lỗi Scan 3.79) là ghi đè luôn bản tốt trên Drive. Gộp có dấu xóa + thùng rác nên không làm sống lại mục đã xóa. */
      if(cu)
        return goiDrive('https://www.googleapis.com/drive/v3/files/'+cu.id+'?alt=media').then(function(remote){
          if(remote && typeof remote==='object'){ soRemote = demChiMuc(remote); CM_DANG_KEO = true; try{ gopTuRemote(remote); } finally{ CM_DANG_KEO = false; } }
          return cu;
        });
      return cu;
    }).then(function(cu){
      var goi = goiChiMuc();
      /* 3.81: chặn ghi trống — Drive đang có dữ liệu mà bản sắp ghi trống trơn thì KHÔNG ghi đè */
      if(cu && soRemote >= 3 && demChiMuc(goi) === 0){ console.warn('Chặn ghi chỉ mục trống lên Drive'); baoLoi('Không ghi chỉ mục trống lên Drive (Drive đang có '+soRemote+' mục). Vào 🧰 Dọn kho › 🛟 Sao lưu để kiểm tra.'); return false; }
      return ghiJSONLenDrive('chimuc.json', idTM, goi, cu).then(function(r){
        D.cauHinh.chiMucThoi = goi.xuatLuc; if(r && r.modifiedTime) D.cauHinh.chiMucDriveTG = r.modifiedTime; luu();
        return baoDamDuong(duong+'/du_phong');
      }).then(function(idDP){
        var tenDP = 'chimuc_'+ngayISO(nay())+'.json';
        return timFileTrong(tenDP, idDP).then(function(cuDP){
          /* 3.81: giữ bản ĐẦU NGÀY — đã có bản hôm nay thì không ghi đè (sự cố giữa ngày không xóa mất bản dự phòng của ngày) */
          if(cuDP) return null;
          return ghiJSONLenDrive(tenDP, idDP, goi, null);
        });
      }).then(function(){ return donDuPhong(idTM, duong+'/du_phong'); });
    });
  }).catch(function(e){ console.warn('Không đẩy được chỉ mục:', e); return false; });
}
/* chỉ giữ 7 bản dự phòng gần nhất, xóa bản cũ hơn */
function donDuPhong(idTMKhongDung, duongDP){
  return baoDamDuong(duongDP).then(function(idDP){
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+
      encodeURIComponent("'"+idDP+"' in parents and trashed=false")+
      '&fields=files(id,name)&orderBy=name desc&pageSize=50');
  }).then(function(kq){
    var f = (kq.files||[]).slice(7);
    return f.reduce(function(p, x){
      return p.then(function(){ return goiDrive(
        'https://www.googleapis.com/drive/v3/files/'+x.id+'?fields=id', {method:'PATCH',
        headers:{'Content-Type':'application/json'}, body:JSON.stringify({trashed:true})}); });   /* 3.32: vào thùng rác Drive */
    }, Promise.resolve());
  }).catch(function(){});
}
/* gộp một nhánh dữ liệu: thêm mục ở remote mà máy này chưa có */
/* gộp chỉ mục máy khác (3.10): mỗi mục lấy bản có suaLuc mới hơn — kể cả việc nằm ở tab nào hay trong thùng rác;
   mục có dấu xóa hẳn (daXoaHan) thì bỏ ở mọi nơi, xóa luôn bản sao trong máy */
function gopChiMuc(remote){
  var KHO = ['vanBan','duLieu','ghiChu','bieuMau','rac','scan','kyAnh','boHS'], doi = 0, tomb = {};   /* 3.50: scan, CK·CCCD cũng qua lại thùng rác */
  var tgSua = function(m){ return m.suaLuc||m.taoLuc||m.luc||''; };
  (D.daXoaHan||[]).concat(remote.daXoaHan||[]).forEach(function(t){ if(!tomb[t.id] || t.luc>tomb[t.id].luc) tomb[t.id] = t; });
  D.daXoaHan = Object.keys(tomb).map(function(k){ return tomb[k]; })
    .filter(function(t){ return Date.now()-new Date(t.luc).getTime() < 366*864e5; });
  var loc = {};
  KHO.forEach(function(k){ D[k] = D[k]||[]; D[k].forEach(function(m){ loc[m.id] = {m:m, k:k}; }); });
  KHO.forEach(function(k){
    (remote[k]||[]).forEach(function(m){
      if(laFileHeThong(m) || tomb[m.id]) return;
      var l = loc[m.id];
      if(!l){ D[k].push(m); loc[m.id] = {m:m, k:k}; doi++; return; }
      if(tgSua(m) > tgSua(l.m)){
        D[l.k] = D[l.k].filter(function(x){ return x.id!==m.id; });
        D[k].push(m); loc[m.id] = {m:m, k:k}; doi++;
      }
    });
  });
  /* bản cũ (trước 3.10) chỉ gửi danh sách daXoa: chuyển vào rác nếu máy này chưa sửa sau đó */
  (remote.daXoa||[]).forEach(function(dx){
    var l = loc[dx.id]; if(!l || l.k==='rac' || (l.m.suaLuc||'') > (dx.xoaLuc||'')) return;
    D[l.k] = D[l.k].filter(function(x){ return x.id!==dx.id; });
    l.m.xoaLuc = dx.xoaLuc; l.m.khoCu = l.k; D.rac.push(l.m); doi++;
  });
  ['vanBan','duLieu','ghiChu','bieuMau','rac','boHS'].forEach(function(k){   /* scan, CK·CCCD: gopTuRemote xóa kèm ảnh */
    D[k] = D[k].filter(function(m){ if(tomb[m.id]){ xoaFile(m.id); if(k==='rac') xoaAnhMayCua(m); doi++; return false; } return true; });
  });
  return doi;
}
function gopNhanh(local, remote){
  var co = {}; local.forEach(function(m){ co[m.id] = true; });
  (D.rac||[]).forEach(function(m){ co[m.id] = true; });
  var daXoa = {}; (D.daXoaHan||[]).forEach(function(t){ daXoa[t.id] = 1; });
  remote = (remote||[]).filter(function(m){ return !laFileHeThong(m) && !daXoa[m.id]; });
  var them = 0;
  (remote||[]).forEach(function(m){
    if(!co[m.id]){ local.push(m); them++; }
  });
  return them;
}
/* tải chỉ mục từ Drive, gộp vào máy này nếu Drive mới hơn */
function taiChiMucTuDrive(imLang){
  if(!coTheNoiDrive()) return Promise.resolve(false);
  var duong = D.cauHinh.thumuc+'/_Hệ thống', tg = '';
  return baoDamDuong(duong).then(function(idTM){
    return timFileTrong('chimuc.json', idTM).then(function(f){
      if(!f) return null;
      /* 3.47: so giờ sửa của CHÍNH Drive (trước so với giờ máy mình → lệch giờ giữa 2 máy là bỏ sót) */
      if(D.cauHinh.chiMucDriveTG ? f.modifiedTime===D.cauHinh.chiMucDriveTG
                                 : (D.cauHinh.chiMucThoi && f.modifiedTime<=D.cauHinh.chiMucThoi)) return 'moi-nhat-roi';
      tg = f.modifiedTime;
      return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media');
    });
  }).then(function(remote){
    if(!remote || remote==='moi-nhat-roi') return {them:0, xoa:0};
    CM_DANG_KEO = true;
    var kq = gopTuRemote(remote);
    if(tg) D.cauHinh.chiMucDriveTG = tg;
    D.cauHinh.chiMucThoi = remote.xuatLuc; luu(); CM_DANG_KEO = false; ve();
    if(kq.them || kq.xoa) bao('Đồng bộ từ máy khác: cập nhật '+(kq.them+kq.xoa)+' mục.', 5);
    henDongBoChiMuc();   /* máy này có mục máy kia chưa có → gửi lên (đã gộp) */
    return kq;
  }).catch(function(e){
    CM_DANG_KEO = false;
    if(!imLang) baoLoi('Không tải được chỉ mục từ Drive: '+(e&&e.message||e));
    return false;
  });
}
/* gộp một bản chỉ mục từ Drive vào máy này — dùng khi kéo về và trước khi đẩy lên */
function gopTuRemote(remote){
  var tong = gopChiMuc(remote);
  D.scan = D.scan||[]; tong += gopTheoSua(D.scan, remote.scan);
  D.kyAnh = D.kyAnh||[]; tong += gopTheoSua(D.kyAnh, remote.kyAnh);
  /* 3.31: bản scan đã xóa ở máy khác thì máy này bỏ theo (kèm ảnh trong máy) */
  var tombS = {}; (D.daXoaHan||[]).forEach(function(t){ tombS[t.id] = 1; });
  var truocS = D.scan.length;
  D.scan.filter(function(k){ return tombS[k.id]; }).forEach(function(k){ xoaScanIm(k.id); });
  D.scan = (D.scan||[]).filter(function(k){ return !tombS[k.id]; }); HS.ds = D.scan;
  D.kyAnh = D.kyAnh.filter(function(k){ if(tombS[k.id]){ xoaFile('hs_'+k.id); return false; } return true; });
  tong += truocS - D.scan.length;
  var xoa = 0;
  D.rac = D.rac || [];
  var idRac = {}; D.rac.forEach(function(r){ idRac[r.id]=true; });
  (remote.daXoa||[]).forEach(function(dx){
    if(idRac[dx.id]) return;
    var kho = ['vanBan','duLieu','ghiChu','bieuMau'];
    for(var i=0;i<kho.length;i++){
      var arr = D[kho[i]], j = arr.findIndex(function(x){ return x.id===dx.id; });
      if(j>=0){ var m = arr.splice(j,1)[0]; m.xoaLuc = dx.xoaLuc; D.rac.push(m); xoa++; break; }
    }
  });
  donFileHeThong();
  chuyenLienQuan();   /* 3.68 (AF): máy kia còn bản cũ (goc / thayBoi) */
  return {them:tong, xoa:xoa};
}
/* 3.47: gộp danh sách scan / chữ ký theo id — chưa có thì thêm, có rồi thì lấy bản SỬA SAU (khai ở máy kia, có driveId…) */
function gopTheoSua(local, remote){
  var daXoa = {}; (D.daXoaHan||[]).forEach(function(t){ daXoa[t.id] = 1; });
  (D.rac||[]).forEach(function(r){ daXoa[r.id] = 1; });   /* 3.50: đang nằm thùng rác (gopChiMuc đã so giờ sửa) thì không đưa lại */
  var vt = {}; local.forEach(function(m, i){ vt[m.id] = i; });
  var doi = 0;
  (remote||[]).forEach(function(m){
    if(!m || laFileHeThong(m) || daXoa[m.id]) return;
    if(vt[m.id]===undefined){ local.push(m); vt[m.id] = local.length-1; doi++; return; }
    var l = local[vt[m.id]];
    if((m.suaLuc||m.taoLuc||'') > (l.suaLuc||l.taoLuc||'')){ local[vt[m.id]] = m; doi++; }
  });
  return doi;
}
/* nút riêng — quét lại toàn bộ: đẩy ngay chỉ mục hiện tại lên Drive (bỏ hẹn giờ),
   và báo thiếu thư mục/file chuẩn nếu có */
function quetLaiChiMucToanBo(){
  batChay(true);
  clearTimeout(CM_HEN);
  kiemTraCauTrucChuan().then(function(thieu){
    return dayChiMucLenDrive().then(function(){
      tatChay();
      var b = 'Đã quét và lưu chỉ mục lên Drive.';
      if(thieu.length) b += ' Thiếu: '+thieu.join(', ')+' — anh xem lại, app không tự tạo.';
      bao(b, thieu.length?8:5);
    });
  }).catch(function(e){ tatChay(); baoLoi('Không quét được: '+(e&&e.message||e)); });
}
/* kiểm tra các thư mục/file chuẩn trong Tủ hồ sơ đã có chưa — chỉ đọc, chỉ báo */
function kiemTraCauTrucChuan(){
  var g = D.cauHinh.thumuc, n = nay().getFullYear();
  var canCo = ['Văn bản/'+n, 'Dữ liệu tháng/'+n, 'Ghi chú/'+n, 'Biểu mẫu',
               'CCCD', 'Khác', '_Chờ xử lý', '_Hệ thống'];
  return baoDamDuong(g).then(function(idGoc){
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+
      encodeURIComponent("'"+idGoc+"' in parents and trashed=false and "+
        "mimeType='application/vnd.google-apps.folder'")+
      '&fields=files(name)&pageSize=100');
  }).then(function(kq){
    var co = {}; (kq.files||[]).forEach(function(f){ co[f.name]=true; });
    return canCo.filter(function(d){ return !co[d.split('/')[0]]; });
  }).catch(function(){ return []; });
}

function keoCauHinh(imLang){   /* 3.113: anh bấm "Lấy từ Drive" — Drive ưu tiên, giữ phần chỉ máy này có */
  if(!coTheNoiDrive()){ if(!imLang) baoLoi('Chưa nối Drive.'); return Promise.resolve(false); }
  if(!imLang) batChay(true);
  return dongBoCauHinh('lay').then(function(kq){
    if(!imLang){ tatChay(); if(kq.loi) baoLoi('Không lấy được: '+kq.loi); else { capNhatDau(); ve(); var m = demDiaBan(); bao('Đã lấy cài đặt từ Drive · '+m.xa+' xã · '+m.ap+' ấp · '+m.to+' tổ'+(kq.doi ? ' · '+kq.doi+' mục đổi' : '')+'.', 7); } }
    return !kq.loi;
  });
}

