/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): SCAN — camera trong app · đồng bộ Drive (mở app, rời app, sau khi lưu, 5 phút).
   Chép nguyên từ js/12-scan.js (không đổi tên hàm); nạp ngay sau phần trước. ===== */
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
    if(n){ var u = URL.createObjectURL(b); n.innerHTML = '<img src="'+u+'"><b>'+CAM.anh.length+'</b>'; thuHoiSau(CAM.nhoU, 0); CAM.nhoU = u; }   /* 3.239: chụp liền nhiều tấm — trả ảnh nhỏ cũ */
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
  if(!coTheNoiDrive()){ if(tuTay) baoLoi(drChuaNoi()); return Promise.resolve(false); }
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
