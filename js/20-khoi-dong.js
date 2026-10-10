/* ---------- KHỞI ĐỘNG ---------- */
function capNhatDau(){
  document.getElementById('donvi').textContent =
    D.cauHinh.donvi+' · '+(D.vanBan.length+D.duLieu.length+D.ghiChu.length+(D.scan||[]).length+(D.bieuMau||[]).length)+' mục';   /* 3.39: đếm đủ 5 tab */
}
function capNhatGio(){
  var d = nay();
  var thu = ['CN','T2','T3','T4','T5','T6','T7'][d.getDay()];
  document.getElementById('gio').textContent = hai(d.getHours())+':'+hai(d.getMinutes());
  document.getElementById('ngay').textContent = thu+' '+hai(d.getDate())+'/'+
    hai(d.getMonth()+1)+'/'+d.getFullYear();
}

function khoiDong(){
  nap();
  napNo();   /* 3.64: dữ liệu Theo dõi nợ nằm ở IndexedDB */
  setTimeout(function(){ saoLuuTrongMay(); }, 4000);   /* 3.81: bản sao lưu trong máy của hôm nay (lúc mở app, trước khi làm gì) */
  var eb = document.getElementById('ban-goc'); if(eb) eb.textContent = 'v'+APP_BAN;
  napPhanLoai();
  donFileHeThong();
  apDongGon();   /* 3.73 */
  if(typeof HS!=='undefined') HS.ds = D.scan = D.scan || [];   /* 3.79.1: tab Scan và D.scan dùng chung 1 danh sách ngay từ khi mở app */
  if(chuyenLienQuan()) luu();   /* 3.68 (AF) */
  document.documentElement.style.setProperty('--co', D.cauHinh.coChu||1);
  apGiaoDien();
  capNhatDau(); capNhatGio();
  setInterval(capNhatGio, 20000);

  var oTim = document.getElementById('otim'), tTim;
  oTim.addEventListener('input', function(){
    clearTimeout(tTim);
    tTim = setTimeout(function(){
      veGoiY(tenTab(), khoTab());
      ve();
    }, 200);
  });
  oTim.addEventListener('blur', function(){ setTimeout(dongGoiY, 180); });
  document.addEventListener('keydown', phimChung, true);   /* 3.50: Esc lùi 1 cấp · Enter = Tiếp ở các bước Scan */
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' && nganHienTai===6 && !document.getElementById('hop').classList.contains('hien')){ dongKhai(); return; }
  });
  document.addEventListener('keydown', function(e){   /* 3.19: Ctrl+Z hoàn tác ở bàn làm việc */
    if((e.ctrlKey||e.metaKey) && (e.key==='z'||e.key==='Z') && !e.shiftKey && nganHienTai===0 &&
       !/^(INPUT|TEXTAREA)$/.test(e.target.tagName||'')){ e.preventDefault(); hoanTac(); }
  });
  oTim.addEventListener('keydown', function(e){
    if(e.key==='Enter'){
      e.preventDefault();
      var g = document.getElementById('goiy');
      var b = g && g.classList.contains('hien') && g.querySelector('button');
      if(b) b.click(); else oTim.blur();
    }
    if(e.key==='Escape'){ dongGoiY(); }
  });

  var vt = document.getElementById('vung-tha'), cf = document.getElementById('chon-file');
  vt.onclick = function(){ cf.click(); };
  cf.onchange = function(){ gioiThieuFile(cf.files); cf.value=''; };
  ['dragenter','dragover'].forEach(function(t){
    vt.addEventListener(t, function(e){ e.preventDefault(); vt.classList.add('keo'); });
    document.addEventListener(t, function(e){ e.preventDefault(); });
  });
  ['dragleave','drop'].forEach(function(t){
    vt.addEventListener(t, function(e){ e.preventDefault(); vt.classList.remove('keo'); });
  });
  /* 3.31: thả vào ô này cũng nổi lên trình nhận chung của cả trang (bên dưới) —
     trước đây xử lý ở cả hai nơi nên mỗi file vào khay 2 lần */
  /* 3.23: kéo file vào bất kỳ chỗ nào trong trang cũng nhận — phủ cả màn, ghi rõ sẽ xếp vào tab nào */
  var TEN_TAB_THA = ['Hôm nay','Văn bản','Dữ liệu tháng','Ghi chú','Scan','Biểu mẫu','Khay chờ duyệt'];
  var demKeo = 0;
  function phuKeo(hien){
    var e = document.getElementById('phu-keo');
    if(!e){
      e = document.createElement('div'); e.id = 'phu-keo'; e.className = 'phu-keo';
      e.innerHTML = '<div class="pk-hop"><div class="pk-ic">📂</div><div class="pk-chu"></div></div>';
      document.body.appendChild(e);
    }
    e.querySelector('.pk-chu').innerHTML = 'Thả file vào đây<small>sẽ xếp vào tab <b>'+
      (TEN_TAB_THA[nganHienTai]||'Văn bản')+'</b></small>';
    e.classList.toggle('hien', !!hien);
  }
  document.addEventListener('dragenter', function(e){
    if(e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types||[], 'Files')>=0){
      demKeo++; phuKeo(true);
    }
  });
  document.addEventListener('dragleave', function(){ demKeo = Math.max(0, demKeo-1); if(!demKeo) phuKeo(false); });
  document.addEventListener('drop', function(e){
    e.preventDefault(); demKeo = 0; phuKeo(false);
    if(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) gioiThieuFile(e.dataTransfer.files);
  });
  /* 3.93.1: dán file (copy file văn bản cũ ở thư mục → Ctrl+V trong app) — nhận như kéo thả; dán chữ vào ô nhập vẫn bình thường */
  document.addEventListener('paste', function(e){
    var cd = e.clipboardData, fs = cd && cd.files ? Array.prototype.slice.call(cd.files) : [];
    if(!fs.length && cd && cd.items) Array.prototype.forEach.call(cd.items, function(it){ if(it.kind==='file'){ var f = it.getAsFile(); if(f) fs.push(f); } });
    if(!fs.length) return;
    e.preventDefault(); gioiThieuFile(fs);
  });

  /* 3.13: giá trị kéo cột cũ có thể làm cột phải teo lại → kẹp về khoảng an toàn; bỏ cờ ẩn toàn cục đời cũ */
  suaRongCot(); apPhongSo(); nangCapDanhMuc();
  /* 3.31: lần đầu có "địa bàn quản lý" → bỏ lựa chọn xã hiện cũ để ma trận hiện theo địa bàn quản lý (một lần duy nhất) */
  if(!D.cauHinh.xqlDaAp){ delete D.cauHinh.xaHien; D.cauHinh.xqlDaAp = true; }
  if(D.cauHinh.anPV!==undefined && D.cauHinh.anPVTab===undefined) delete D.cauHinh.anPV;
  if(D.cauHinh.rongTrai) document.documentElement.style.setProperty('--rong-trai', D.cauHinh.rongTrai);
  if(D.cauHinh.rongPhai) document.documentElement.style.setProperty('--rong-phai', D.cauHinh.rongPhai);
  luu();
  setTimeout(apAnPV, 60);
  window.addEventListener('scroll', anDayKhiCuon, {passive:true});
  if(D.cauHinh.rongPV)
    document.documentElement.style.setProperty('--rong-pv', D.cauHinh.rongPV);
  ganKeoRong();
  napCheScan(); napHangCu();
  if(D.cauHinh.rongTrai) document.documentElement.style.setProperty('--rong-trai', D.cauHinh.rongTrai);
  if(D.cauHinh.rongPhai) document.documentElement.style.setProperty('--rong-phai', D.cauHinh.rongPhai);
  ganKeoCot();
  ve();
  sanKhoaHS();
  if(coTheNoiDrive()) setTimeout(function(){ noiDrive(true); }, 1200);
  setTimeout(tuDonRac, 20000);   /* 3.50: rác quá 30 ngày (nếu anh bật) */
  setTimeout(function(){ if(!SL_SAN) slNap(); }, 900);   /* 3.85: nạp sẵn chỉ mục số liệu + danh bạ khách hàng để tra ở ô tìm */
  setTimeout(function(){ xongTV.then(hamNongPDF); }, 3000);   /* 3.51: bộ đọc PDF khởi động sẵn */
  /* 3.50: ✨ Có gì mới — một lần mỗi bản; máy mới cài (chưa có dữ liệu) thì không hiện */
  if(!(D.vanBan.length+D.duLieu.length+D.ghiChu.length+(D.scan||[]).length+(D.bieuMau||[]).length)) D.cauHinh.daXemMoi = CO_GI_MOI.ban;
  else setTimeout(kiemCoGiMoi, 2500);
}
function batDau(){
  khoiDong();
  xongTV.then(function(){
    sanSangPDF();
    if(TV.loi.length){
      bao('Chưa tải được bộ đọc PDF (đang không có mạng?). App vẫn dùng được, '+
          'nhưng tạm thời không tự đọc nội dung file. Có mạng một lần là app nhớ luôn.', 9);
    }
  });
}
if(document.readyState==='loading')
  document.addEventListener('DOMContentLoaded', batDau);
else batDau();
