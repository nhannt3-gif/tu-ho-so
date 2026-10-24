/* ===== 3.224 (anh chốt 17/10/2026 — docs/KE_HOACH_3224_SCAN.md): QUY TRÌNH SCAN MỚI — 1 luồng chuẩn, cắm / rút =====
   ① chọn LOẠI + nguồn (loại quyết định số mặt: chỉ 🪪 CCCD ghép mặt trước | mặt sau; 📄 Tài liệu, ✍ Chữ ký, 🧑 Ảnh khách = 1 mặt CCCD luôn 1 mặt)
   ② chỉnh (bộ chỉnh chung của CCCD: bắt viền, nắn, kéo góc, xoay, lọc) → ③ ✓ chốt đạt → ④ xem thử bản in
   ⑤ bộ nút chuẩn: 🖨 In · 💾 Lưu vào máy (chỉ ra file) · 🗂 Lưu vào app (⏳ Chờ khai báo — khai cây địa bàn xong mới lên Drive) · 📤 Gửi Zalo · ✕ Bỏ.
   Bỏ: tự đưa lên Drive bản chưa khai. Chữ ký: giữ nguyên mẫu chụp (JPG), chỉ khử bóng mờ nhẹ + nén ≤ 200 KB. Tài liệu: lọc "Văn bản rõ".
   Mã cũ js/12 giữ nguyên (chỉ thay các hàm dưới đây) — rút file này là app về luồng 3.223. */
var SC_LOAI = {cccd:{ic:'🪪', ten:'CCCD', mo:'2 mặt, đúng khổ thẻ'}, tailieu:{ic:'📄', ten:'Tài liệu', mo:'văn bản, giấy A4 — mỗi trang 1 mặt'},
  ky:{ic:'✍', ten:'Chữ ký', mo:'1 ảnh, JPG dưới 200 KB'}, anhkh:{ic:'🧑', ten:'Ảnh khách', mo:'1 mặt CCCD, JPG dưới 200 KB'}};
function scLoaiNho(){ var l = D.cauHinh.scanLoai; return SC_LOAI[l] ? l : (SC.che==='the' ? 'cccd' : 'tailieu'); }
/* ① chọn loại + nguồn — 1 hộp, loại lần trước sáng sẵn */
batDauScan = function(loai){
  if(!HS.mo) return moHoSo();
  loai = SC_LOAI[loai] ? loai : scLoaiNho(); SC.loai = loai;
  var n = D.cauHinh.scanNguon || 'camera', nut = function(k, ic, tn, mt){ return '<button class="'+(n===k ? 'bat' : '')+'" onclick="scChonNguon(\''+k+'\')"><span class="ic">'+ic+'</span><span class="tn">'+tn+'</span><span class="mo-ta">'+mt+'</span></button>'; };
  moHop('<div class="hop-tit">Quét gì?</div><div class="sc-loai">'+Object.keys(SC_LOAI).map(function(k){ var x = SC_LOAI[k];
      return '<button class="'+(k===loai ? 'bat' : '')+'" onclick="batDauScan(\''+k+'\')"><b>'+x.ic+' '+x.ten+'</b><small>'+x.mo+'</small></button>'; }).join('')+'</div>'+
    '<div class="hop-tit" style="margin-top:10px">Lấy từ đâu?</div><div class="nguon">'+nut('camera', '📷', 'Camera / máy quét', 'Chụp trực tiếp')+nut('photo', '🖼', 'Ảnh có sẵn', 'Ảnh trong máy')+
      (loai==='tailieu' ? nut('file', '📄', 'File', 'PDF hoặc Word') : '')+'</div>'+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho" data-lenh="hop.dong">Thôi</button></div>');
};
function scChonNguon(n){
  var l = SC.loai || scLoaiNho(); D.cauHinh.scanLoai = l; D.cauHinh.scanNguon = n;
  if(l==='ky' || l==='anhkh'){ luu(); dongHop(); return chupKA(l==='ky' ? 'ky' : 'anh', n==='file' ? 'photo' : n); }
  SC.che = l==='cccd' ? 'the' : 'tailieu'; D.cauHinh.scanChe = SC.che;   /* loại quyết định cách xử lý — không theo chế độ nhớ cũ */
  chonNguon(n);
}
quetNhanh = function(nguon){ if(!HS.mo) return moHoSo(); if(nguon==='photo'){ SC.loai = scLoaiNho(); return scChonNguon('photo'); } batDauScan(); };

/* ⑤ bộ nút chuẩn */
scanXongHop = function(bl){
  SX = SX && SX.bl===bl ? SX : {bl:bl, da:{}, ten:scanTen()};
  var laThe = SC.che==='the', so = laThe ? Math.ceil(HANG.filter(function(x){ return x.kieu==='anh'; }).length/2)+' người' : HANG.filter(function(x){ return x.kieu==='anh' || x.kieu==='trang'; }).length+' trang';
  var o = function(k, ico, chu, phu, js){ return '<button class="sx-o'+(SX.da[k] ? ' da' : '')+'" onclick="'+js+'"><b>'+ico+'</b><span>'+chu+(SX.da[k] ? ' ✓' : '')+'<small>'+phu+'</small></span></button>'; };
  moHop(buocHTML(3, {lui:'xemTruocHang()', b1:'moHangCho()', b2:'xemTruocHang()'})+'<div class="hop-tit">Đạt · '+so+' — làm gì với bản này?</div>'+
    '<label class="xp-ten">Tên file <input id="sx-ten" value="'+coChuHTML(SX.ten)+'" onfocus="this.select()" onchange="SX.ten=this.value"></label>'+
    '<div class="sx-luoi">'+
      o('in', '🖨', 'In', laThe ? 'đúng khổ thẻ' : 'A4', 'scanIn()')+
      o('luu', '🗄', 'Lưu vào tủ', 'tự nhận khách (đọc CCCD / 🔎 Tra Mẫu 31 ở ô Tên file) — chưa rõ thì vào ⏳ Chờ sắp xếp', 'qlLuuTu()')+   /* 3.278: gộp "Lưu vào app" + "Lưu vào app + khai ngay" */
      o('may', '💾', 'Lưu vào máy', 'chỉ ra file PDF, không lưu vào app', 'scanLuuMay()')+
      o('gui', '📤', 'Gửi Zalo', laMayBan() ? 'tải file, kéo vào Zalo' : 'bảng chia sẻ', 'scanGui()')+
    '</div>'+
    '<div class="hop-phu">Chưa lưu gì cho tới khi anh bấm Lưu. Rõ khách → tên chuẩn <i>MãKH - Họ tên - Loại</i>, đúng thư mục; chưa rõ → <i>Scan chờ sắp xếp</i>. <a href="#" data-lenh="ql.chonKH">Chọn khách từng người…</a></div>'+
    '<div class="hang-nut"><button class="nho" onclick="xemTruocHang()">‹ Xem lại</button><button class="nho xau" onclick="scanXongBo()">✕ Bỏ</button><button class="nho chinh" onclick="scanXongBo()">✓ Xong</button></div>', true);
};
function scanTenFile(){ var e = document.getElementById('sx-ten'); if(e && e.value.trim()) SX.ten = e.value.trim(); return sachTen(SX.ten)+'.pdf'; }
function scanIn(){ if(!SX) return; inBlob(SX.bl, scanTenFile()); scanDa('in'); }
scanLuuMay = function(){ if(!SX) return; var ten = scanTenFile(), bl = SX.bl;
  if(laMayBan() && window.showSaveFilePicker){   /* hộp "Lưu thành" — chọn thư mục */
    window.showSaveFilePicker({suggestedName:ten, types:[{description:'PDF', accept:{'application/pdf':['.pdf']}}]}).then(function(h){ return h.createWritable(); })
      .then(function(w){ return w.write(bl).then(function(){ return w.close(); }); }).then(function(){ bao('Đã lưu vào máy: '+ten, 5); scanDa('may'); }, function(e){ if(e && e.name==='AbortError') return; taiXuongBlob(bl, ten); scanDa('may'); });
    return; }
  if(laMayBan()){ taiXuongBlob(bl, ten); bao('Đã lưu vào máy: '+ten+' (thư mục Tải xuống).', 5); } else chiaSePDF(bl, ten);
  scanDa('may'); };
scanGui = function(){ if(!SX) return; chiaSePDF(SX.bl, scanTenFile()); scanDa('gui'); };
function scanLuuApp(){ if(!SX) return; scanTenFile(); SAU_LUU_TAM = function(ds){ if(ds.length===1 && SX && SX.ten) { ds[0].ten = SX.ten; luu(); veScan(); } SX = null; bao('Đã lưu vào app — ⏳ Chờ sắp xếp (chưa gắn khách), lên Drive thư mục Scan chờ sắp xếp. Gắn khách: 🔎 Tra Mẫu 31 ở hộp Sửa, hoặc 🧹 Sắp xếp.', 7); }; luuSauHang(); }
/* lưu tạm (Chờ khai báo): KHÔNG tự đưa lên Drive */
ghiLuuTam = function(ds, loiBao){
  var bay = new Date().toISOString();
  D.scan = D.scan || []; ds.forEach(function(k){ k.may = maMayCua(); k.suaLuc = bay; D.scan.push(k); }); HS.ds = D.scan;
  donGocHang(); HANG = []; luu(); dongHop(); veScan();
  if(SAU_LUU_TAM){ var f = SAU_LUU_TAM; SAU_LUU_TAM = null; return f(ds); }
  bao(loiBao, 7);
};
/* Drive chỉ nhận bản đã khai (bản chưa khai đã từng lên thư mục "Chưa khai" thì vẫn cập nhật như cũ) */
var SC_CAN_DAY_CU = scanCanDay;
scanCanDay = function(){ return SC_CAN_DAY_CU().filter(function(k){ return !k.chuaKhai || k.driveId; }); };

/* 📄 Tài liệu: lọc "Văn bản rõ" = Giấy trắng (khử bóng, nền trắng, dấu đỏ giữ màu) + lấy nét chữ */
TEN_LOC.vanban = 'Văn bản rõ';
TEN_LOC_NGAN = {vanban:'Văn bản rõ', magic:'Magic', giay:'Giấy trắng', xam:'Xám', dentrang:'Đen trắng', goc:'Gốc'};
var SC_AP_LOC_CU = apLoc;
apLoc = function(c, kieu, che){ if(kieu==='vanban'){ locGiayTrang(c); lamNet(c, 0.5); return c; } return SC_AP_LOC_CU(c, kieu, che); };
var SC_LOC_MD_CU = locMacDinh;
locMacDinh = function(che){ var r = (D.cauHinh.scanLoc||{})[che]; return (r && TEN_LOC[r]) ? r : (che==='the' ? 'magic' : 'vanban'); };

/* ✍ Chữ ký: GIỮ NGUYÊN MẪU CHỤP — chỉ cân sáng nền (khử bóng mờ / tối góc) + tương phản rất nhẹ; màu mực, độ đậm nhạt, mép giữ như ảnh */
function kyKhuBong(c){
  var W = c.width, H = c.height, x = c.getContext('2d'), im = x.getImageData(0, 0, W, H), p = im.data;
  var bg = nenSang(p, W, H, -1, 16, 0.85), dich = 242;
  for(var i=0;i<p.length;i+=4){ var f = dich/Math.max(80, bg[i]); f = Math.min(f, 1.6);
    for(var k=0;k<3;k++){ var v = p[i+k]*f; v = v>dich ? dich+(v-dich)*0.6 : v; p[i+k] = Math.max(0, Math.min(255, Math.round((v-128)*1.08+128))); } }
  x.putImageData(im, 0, 0); return c;
}
var SC_DUNG_KA_CU = dungKA;
dungKA = function(){
  if(KA.loai!=='ky') return SC_DUNG_KA_CU();
  var r = KA.r, k = Math.min(1, 900/r.w), c = document.createElement('canvas'); c.width = Math.max(1, Math.round(r.w*k)); c.height = Math.max(1, Math.round(r.h*k));
  var g = c.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(KA.im, r.x, r.y, r.w, r.h, 0, 0, c.width, c.height);
  if(KA.kyLoc!=='goc') kyKhuBong(c);
  var tran = 190*1024;
  var thu = function(cc, q){ return canvasRaBlob(cc, q).then(function(b){
    if(b.size <= tran) return b;
    if(q > 0.6) return thu(cc, Math.round((q-0.08)*100)/100);
    var c2 = document.createElement('canvas'); c2.width = Math.round(cc.width*0.85); c2.height = Math.round(cc.height*0.85); c2.getContext('2d').drawImage(cc, 0, 0, c2.width, c2.height);
    return thu(c2, 0.85); }); };
  return thu(c, 0.92);
};
/* ✍ / 🧑 xem: bộ nút chuẩn (Lưu vào máy · Lưu vào app · Gửi Zalo · Bỏ) */
var SC_XEM_KA_CU = xemKA2;
xemKA2 = function(){
  var ky = KA.loai==='ky', ten = tenKhachKA();
  batChay(false, 'Đang nén ảnh…');
  dungKA().then(function(b){
    tatChay(); KA.bl = b;
    if(KA_URL) URL.revokeObjectURL(KA_URL); KA_URL = URL.createObjectURL(b);
    moHop(buocHTML(2, {lui:'veCatKA()', b1:'veCatKA()', tiep:'luuKA()'})+'<div class="hop-tit">Xem '+(ky ? 'chữ ký' : 'ảnh khách (mặt trước CCCD)')+'</div>'+
      '<div class="ka-lon"><img src="'+KA_URL+'" alt=""></div>'+
      '<div class="ka-co"><b>'+Math.round(b.size/1024)+' KB</b> · JPG '+(b.size<=200*1024 ? '<span class="ka-dat">✓ dưới 200 KB</span>' : '<span class="ka-qua">quá 200 KB</span>')+
        (ky ? ' · <label><input type="checkbox"'+(KA.kyLoc==='goc' ? ' checked' : '')+' onchange="KA.kyLoc=this.checked?\'goc\':\'\';KA.bl=null;xemKA2()"> Gốc (không khử bóng)</label>' : '')+'</div>'+
      '<div class="ka-ten-o"><input id="ka-ten2" value="'+coChuHTML(ten)+'" placeholder="Tên khách (đặt tên file)" '+
        'oninput="KA.ten=this.value;KA.tenLuc=Date.now();document.getElementById(\'ka-tf\').textContent=\'→ \'+tenFileKA(KA.loai,this.value)">'+
        '<span id="ka-tf">→ '+coChuHTML(tenFileKA(KA.loai, ten))+'</span></div>'+
      '<div class="xp-nut"><div class="hang-nut">'+
        '<button class="nho xau" data-lenh="hop.dong">✕ Bỏ</button>'+   /* 3.234: Bỏ trái … Lưu vào app · Lưu vào máy · Gửi */
        '<button class="nho" onclick="veCatKA()">‹ Cắt lại</button>'+
        '<button class="nho chinh sc-xong" onclick="luuKA()">🗂 Lưu vào app</button>'+
        '<button class="nho" onclick="kaLuuMay()">💾 Lưu vào máy</button>'+
        '<button class="nho" onclick="kaGuiMoi()">📤 Gửi Zalo</button></div></div>', true);
    var e = document.getElementById('ka-ten2'); if(e && !e.value) e.focus();
  }).catch(function(e){ tatChay(); baoLoi('Không nén được ảnh: '+(e&&e.message||e)); });
};
function kaTenMoi(){ var t = (document.getElementById('ka-ten2')||{}).value || KA.ten; return tenFileKA(KA.loai, t); }
function kaLuuMay(){ if(!KA.bl) return; var ten = kaTenMoi();
  if(laMayBan() && window.showSaveFilePicker) return window.showSaveFilePicker({suggestedName:ten, types:[{description:'JPG', accept:{'image/jpeg':['.jpg']}}]}).then(function(h){ return h.createWritable(); })
    .then(function(w){ return w.write(KA.bl).then(function(){ return w.close(); }); }).then(function(){ bao('Đã lưu vào máy: '+ten, 5); }, function(e){ if(!e || e.name!=='AbortError') taiXuongBlob(KA.bl, ten); });
  if(laMayBan()){ taiXuongBlob(KA.bl, ten); return bao('Đã lưu vào máy: '+ten+' (thư mục Tải xuống).', 5); }
  var f = new File([KA.bl], ten, {type:'image/jpeg'}); if(navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
  taiXuongBlob(KA.bl, ten); }
function kaGuiMoi(){ if(!KA.bl) return; var ten = kaTenMoi(), f = new File([KA.bl], ten, {type:'image/jpeg'});
  if(!laMayBan() && navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
  if(navigator.clipboard && window.ClipboardItem){ var c = document.createElement('canvas'), im = new Image(), u = URL.createObjectURL(KA.bl);
    im.onload = function(){ c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0); URL.revokeObjectURL(u);
      c.toBlob(function(p){ navigator.clipboard.write([new ClipboardItem({'image/png':p})]).then(function(){ bao('📋 Đã chép ảnh — Ctrl+V vào Zalo.', 5); }, function(){ taiXuongBlob(KA.bl, ten); }); }, 'image/png'); };
    im.src = u; return; }
  taiXuongBlob(KA.bl, ten); bao('Đã tải về: '+ten+' — kéo vào Zalo.', 5); }
