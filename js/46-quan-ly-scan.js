/* ==========================================================
   3.278 (rà soát tab Scan 20/10 — anh: "em cứ code theo ý em và gộp lên"): BỐ CỤC GỌN
   - Thanh tab Scan: 1 nút 🗂 Quản lý hồ sơ scan (thay 🧹 Sắp xếp · 📊 Kiểm tra · 🔎 Rà) → 1 màn 3 thẻ:
     ⏳ Chờ sắp xếp (n) · 🔎 Rà CCCD đã lưu · 📊 Kiểm tra theo tổ (mỗi thẻ là màn đã có, thêm dải thẻ trên đầu).
   - Sau khi quét: 1 nút 🗄 Lưu vào tủ (thay "Lưu vào app" + "Lưu vào app + khai ngay"): tự nhận khách — đọc CCCD (3.264),
     khách đã chọn / 🔎 Tra Mẫu 31 ở ô Tên file (3.275), hoặc tên file nhận ra chắc 1 khách — rồi lưu tên chuẩn; chưa rõ → Chờ sắp xếp.
   ========================================================== */
function qlThe(dang){
  var n = sxDemCho(), c = function(k, chu, lenh){ return '<button type="button" class="gdx-c gd-chip'+(dang===k ? ' bat' : '')+'" data-lenh="'+lenh+'">'+chu+'</button>'; };
  return '<div class="ql-the">'+c('sx', '⏳ Chờ sắp xếp'+(n ? ' ('+n+')' : ''), 'sx.sapXep')+c('rs', '🔎 Rà CCCD đã lưu', 'rs.mo')+c('kt', '📊 Kiểm tra theo tổ', 'sx.kiem')+'</div>';
}
function qlGanThe(dang){ var h = document.getElementById('hop-in'); if(h && !h.querySelector('.ql-the')) h.insertAdjacentHTML('afterbegin', qlThe(dang)); }
var QL_VE_SX = sxVeSapXep; sxVeSapXep = function(){ QL_VE_SX(); qlGanThe('sx');
  var nk = (D.scan||[]).filter(function(k){ return k.chuaKhai; }).length, ch = document.querySelector('#hop-in .sx-chan .gd-hang');
  if(nk && ch) ch.insertAdjacentHTML('afterbegin', GD.nut({chu:'✎ Khai hàng loạt ('+nk+')', lenh:'sx.khaiHL', tit:'Gõ tên + chọn địa bàn cho nhiều bản chưa khai cùng lúc'})); };
var QL_VE_RS = rsVe; rsVe = function(){ QL_VE_RS(); qlGanThe('rs'); };
var QL_VE_KT = sxKiemVe; sxKiemVe = function(m){ QL_VE_KT(m); qlGanThe('kt'); };
function qlMo(){ if(sxDemCho()) return moSapXep(); moKiemScan(); }
/* thanh tab Scan: 1 nút */
var QL_VE_SCAN = veScan;
veScan = function(){
  QL_VE_SCAN();
  var t = document.querySelector('#tr4 .sx-thanh'); if(!t) return;
  Array.prototype.forEach.call(t.querySelectorAll('button'), function(b){ b.remove(); });
  t.insertAdjacentHTML('beforeend', '<button data-lenh="ql.mo" class="chinh" title="Chờ sắp xếp · Rà CCCD đã lưu · Kiểm tra theo tổ">🗂 Quản lý hồ sơ scan</button>');
};
/* 3.285 (anh: "kế nút Quét bản mới làm 1 nút Xóa như bên Văn bản, màu đỏ"): nút 🗑 Xóa cạnh Quét bản mới tô đỏ (css .nut-bot);
   đã tích ☐ các bản (thanh "Đã chọn n bản" — in ghép 3.58) → thêm nút đỏ 🗑 Xóa n bản ngay trên thanh, vào 🗑 Thùng rác (quy tắc xóa chung 3.153: 1 bản không hỏi, nhiều bản hỏi 1 lần) */
var QL_VE_SCAN2 = veScan;
veScan = function(){
  QL_VE_SCAN2.apply(this, arguments);
  var t = document.querySelector('#tr4 .thanh-in'), n = Object.keys(HS.chon||{}).length; if(!t || !n || t.querySelector('[data-lenh="ql.xoaChon"]')) return;
  var bo = t.querySelector('button[onclick^="boChonHS"]'), h = '<button class="xau" data-lenh="ql.xoaChon" title="Xóa các bản đã chọn — vào 🗑 Thùng rác, khôi phục được">🗑 Xóa '+n+' bản</button>';
  if(bo) bo.insertAdjacentHTML('beforebegin', h); else t.insertAdjacentHTML('beforeend', h);
};
function qlXoaChon(){
  var ids = Object.keys(HS.chon||{}).filter(function(id){ return timScan(id); }); if(!ids.length) return;
  var chay = function(){ HS.chon = {}; xoaNhieuVaoRac(ids, function(){ if(nganHienTai===4) veScan(); }); };
  if(ids.length===1) return chay();
  hoi('Xóa '+ids.length+' bản scan?', ids.slice(0, 8).map(function(id){ var k = timScan(id); return (k.maKH ? k.maKH+' ' : '')+(k.ten||''); }).join(' · ')+(ids.length>8 ? ' … và '+(ids.length-8)+' bản nữa' : '')+'. Vào 🗑 Thùng rác — khôi phục được.', 'Xóa '+ids.length+' bản', chay);
}
GD.dangKy('ql', {xoaChon:function(){ qlXoaChon(); }});
/* 🗄 Lưu vào tủ: tự nhận khách */
function qlLuuTu(){
  if(!SX) return;
  var nh = scanNhom(), e = document.getElementById('sx-ten');
  if(SC.che==='the' && SX_DOC.length===nh.length && SX_DOC.every(function(x){ return x.tim && x.tim.ma; })) return sxLuuTuDoc();   /* đọc CCCD ra đủ khách */
  if(nh.length && nh.every(function(_, i){ return SXK[i]; })) return scanLuuTu();   /* đã chọn / Tra Mẫu 31 */
  if(nh.length===1 && e && e.value.trim()){
    var R = trTim(e.value); if(R.ma){ SXK[0] = sxKhach(R.ma); return scanLuuTu(); }   /* tên file nhận ra chắc 1 khách */
  }
  scanLuuApp();   /* chưa rõ → ⏳ Chờ sắp xếp */
}
GD.dangKy('ql', {mo:function(){ qlMo(); }, chonKH:function(){ scanLuuTuHop(); }});

/* 3.287 (anh: "copy dán VB ở bất cứ đâu cũng được — nên đổi lại chỉ dán trong tab Văn bản, còn trong tab Scan để copy dán CCCD"): Ctrl+V file
   - tab 📄 Văn bản → thêm văn bản (như cũ) · tab 📈 Số liệu → file Excel vào Nạp & KT (như cũ, không thành văn bản)
   - tab Scan → ảnh CCCD (ảnh / PDF trang 1) vào hàng quét chế độ Thẻ (cắt, nắn, đọc số, tra khách như quét)
   - đang mở hộp 🪪 Quét CCCD (3.273 / 3.285) → ảnh dán vào hộp đó để đọc
   - tab khác → không thêm gì, chỉ báo chỗ dán */
function danFile(fs){
  var hop = document.getElementById('hop'), dangHop = hop && hop.classList.contains('hien');
  var anh = function(){ return Promise.all(fs.map(function(f){ return /pdf$/i.test(f.type||'') || /\.pdf$/i.test(f.name||'') ? qcTrangPDF(f) : (/^image\//.test(f.type||'') || /\.(jpe?g|png|webp|heic)$/i.test(f.name||'') ? f : null); }))
    .then(function(bs){ return bs.filter(Boolean).map(function(b, i){ return b instanceof File ? b : new File([b], 'cccd-dan-'+(i+1)+'.jpg', {type:'image/jpeg'}); }); }); };
  if(dangHop && document.getElementById('qc-kq') && typeof QC!=='undefined' && QC){   /* hộp quét CCCD đang mở */
    return anh().then(function(a){ if(!a.length) return bao('Dán ảnh / PDF CCCD vào đây.', 3); QC.tu = 'file'; QC.anh = a.slice(0, 2); qcDoc(); });
  }
  if(dangHop) return bao('Đang mở hộp — đóng hộp rồi dán.', 3);
  if(nganHienTai===1) return gioiThieuFile(fs);
  if(nganHienTai===7 && fs.some(function(f){ return laFileExcel(f.name||''); })) return gioiThieuFile(fs.filter(function(f){ return laFileExcel(f.name||''); }));
  if(nganHienTai===4) return anh().then(function(a){
    if(!a.length) return bao('Tab Scan: dán ảnh hoặc PDF CCCD (văn bản thì dán ở tab 📄 Văn bản).', 5);
    if(SC.che!=='the'){ SC.che = 'the'; bao('Chuyển chế độ quét sang Thẻ (CCCD) để nhận ảnh dán.', 4); }
    nhanVaoScan(a, 'dan'); });
  bao('Dán file: văn bản dán ở tab 📄 Văn bản, ảnh CCCD dán ở tab Scan.', 5);
}

/* 3.290 (anh: "có file đọc được tên luôn nhưng khi lưu lại không kèm tên"): lưu 1 lượt quét NHIỀU người vào ⏳ Chờ sắp xếp (chưa đủ chắc khách)
   — trước chỉ bản 1 người lấy tên đọc được, bản nhiều người thành "Scan <ngày giờ> - người n". Nay mỗi người: đọc được → tên "cccd-Họ tên - số CCCD"
   (khớp chắc Mẫu 31 → họ tên Mẫu 31), lưu kèm số CCCD + thông tin đọc được (CMND 9 số) để ⏳ Sắp xếp / 🔎 Rà nhận khách ngay. */
function qlTenDoc(x){
  if(!x || !(x.cccd || x.ten)) return '';
  var ten = x.tim && x.tim.ma ? (sxKhach(x.tim.ma).ten || x.ten) : x.ten;
  return 'cccd-'+[ten, x.cccd].filter(Boolean).join(' - ');
}
scanLuuApp = function(){
  if(!SX) return; scanTenFile();
  var doc = SC.che==='the' && typeof SX_DOC!=='undefined' ? SX_DOC.slice() : [], tenGo = SX.ten;
  SAU_LUU_TAM = function(ds){
    var dat = 0;
    ds.forEach(function(k, i){ var x = doc[i];
      if(x && x.cccd){ k.cccd = x.cccd; k.cccdDoc = sxGhiDoc(x); if(x.cmnd) k.cmnd = x.cmnd; }
      if(ds.length===1){ if(tenGo) k.ten = tenGo; }   /* 1 người: tên ở ô Tên file (đã điền sẵn theo thẻ đọc được, anh sửa được) */
      else { var t = qlTenDoc(x); if(t){ k.ten = t; dat++; } } });
    luu(); veScan(); SX = null;
    bao('Đã lưu vào app — ⏳ Chờ sắp xếp (chưa gắn khách), lên Drive thư mục Scan chờ sắp xếp.'+(ds.length>1 ? ' '+dat+'/'+ds.length+' người đặt tên theo thẻ đọc được.' : '')+' Gắn khách: 🔎 Tra Mẫu 31 ở hộp Sửa, hoặc 🗂 Quản lý › ⏳ Chờ sắp xếp.', 8);
  };
  luuSauHang();
};

/* 3.291: dời 1 mặt thẻ trong lưới "Bản vừa quét" — d = ±1 (trái / phải), ±2 (người trên / dưới cùng cột); ảnh vẫn được chọn sau khi dời để bấm tiếp */
function hcDichMat(i, d){
  var anh = HANG.filter(function(x){ return x.kieu==='anh'; }), vt = anh.indexOf(HANG[i]), dich = anh[vt+d];
  if(vt<0 || !dich) return false;
  var j = HANG.indexOf(dich), t = HANG[i]; HANG[i] = HANG[j]; HANG[j] = t;
  if(HC_CHON===i) HC_CHON = j;
  veAnhHang(); return true;
}
GD.dangKy('hc', {dich:function(el){ hcDichMat(+el.getAttribute('data-i'), +el.getAttribute('data-d')); }});
/* phím mũi tên: đang chọn 1 ảnh (chạm / bấm) trong lưới → ← → ↑ ↓ dời ảnh đó */
document.addEventListener('keydown', function(ev){
  if(!/^Arrow(Left|Right|Up|Down)$/.test(ev.key) || ev.ctrlKey || ev.altKey || typeof HC_CHON==='undefined' || HC_CHON<0 || !document.getElementById('hc-anh')) return;
  var t = ev.target; if(t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
  var the = SC.che==='the', d = {ArrowLeft:-1, ArrowRight:1, ArrowUp:the ? -2 : -1, ArrowDown:the ? 2 : 1}[ev.key];
  ev.preventDefault(); ev.stopPropagation();
  if(the) hcDichMat(HC_CHON, d); else { var j = HC_CHON+d; if(j>=0 && j<HANG.length){ dichHang(HC_CHON, d); HC_CHON = j; veAnhHang(); } }
}, true);
