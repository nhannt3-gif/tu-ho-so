/* ===== 3.172 (anh chốt 11/10/2026): 🏢 GIAO DỊCH XÃ — in nhanh 04/TD + 12/GDX, KHÔNG cần số liệu hộ vay =====
   - Mẫu in chép NGUYÊN khuôn file HTML anh đã in thử đúng mẫu thật (gdxHTML04 / gdxHTML12 + GDX_CSS — chuyển tự động từ file gốc, không sửa bố cục).
     Xem trước và in trong khung riêng (iframe) nên CSS của app không đụng vào mẫu.
   - Giữ đủ khai báo / tùy chọn của file (GQVL, mức tiền hay dùng, danh sách cán bộ, số dòng 12/GDX, tên tổ trưởng trắng / in sẵn, Phần II…);
     bỏ In hàng loạt (anh chốt) → ⭐ Mẫu hay in (số hộ + số tiền lưu sẵn, bấm là in).
   - Khai báo lưu D.cauHinh.gdx (đồng bộ Drive). Tên UBND trong câu đề nghị ghi đầy đủ, không viết tắt (anh chốt).
   ===== 3.174 (anh chốt 12/10): bố cục mới (khối LỌC ĐỊA BÀN — cây theo Mẫu 31; chưa có số liệu → Cài đặt › Địa bàn), chọn nhanh ↔ ⚙ khai báo riêng,
   📋 Tóm tắt bản in, khung xem bật / tắt; mở tab / mẫu tự chọn điểm có ngày GD gần nhất (thay hộp "Kiểm tra trước đợt"); 💵 Giấy lĩnh tiền mặt;
   danh mục tham chiếu + TK 104; 📜 nhật ký in 1 tháng. Mẫu in: chỉ các chỉnh anh chốt (đường kẻ 04/TD, đầu mẫu + ô ký 12/GDX, giờ / ngày tiêu hủy tách,
   PGĐ ký, 1 / 2 bản). Thêm mẫu mới: xem docs/QUY_TAC_SOAN_MAU.md. */
var GDX_MD = {
  donViTren:'NHCSXH TỈNH TÂY NINH', donViDuoi:'PGD GÒ DẦU', tenPGDTrongVanBan:'Phòng giao dịch NHCSXH Gò Dầu', diaDanh:'Gò Dầu',
  ngayThongBao:'', kinhGui:'', tenUBNDVietTat:'', gioPhatTien:'9 giờ 30 phút', ngayPhatTien:'', diaDiemPhatTien:'',
  nguoiLap:'', chucDanhDuyet:'Giám Đốc', quickAmounts:[25000000, 30000000, 40000000, 50000000, 80000000, 100000000, 120000000, 160000000], isGQVL:false, danhSachCanBo:[],
  mauHay:[], noiGN:'diem', ma04:'', xa04:'', ngayPhatISO:'', gioDiem:'', gioPGD:'', diaDiemPGD:'Phòng giao dịch NHCSXH Gò Dầu', dotXN:'',
  m12DonVi1:'NGÂN HÀNG CHÍNH SÁCH XÃ HỘI', m12DonVi2:'PHÒNG GIAO DỊCH GÒ DẦU - CHI NHÁNH TÂY NINH',
  m12SelectedDiem:'', m12NgayGD:'', m12TenToOption:'blank', m12GDV:'', m12KSV:'', m12ToTruong:'', m12HinhThucTieuHuy:'cắt nhỏ', m12SoLuongTieuHuy:'',
  m12TimeMode:'blank', m12PrefillGio:'11 giờ 30 phút', m12PrefillNgay:'', m12NumRows:12,
  form:'m04', tab04:'don', soNguoi:'1', soTien:'80.000.000',
  /* 3.174 */ ky04Hom:true, ngayPhatTay:false, kyPGD:false, chucPGD:'KT. GIÁM ĐỐC|PHÓ GIÁM ĐỐC', soBan:2, gach04:'hien', m12GioHuy:'cham', m12NgayHuy:'cham', nhanh:{}, xem:true,
  glLoai:'104', glKho:'a5', glIn:'gl', glChim:'nhat', glNgayCach:'hom', glNgayTay:'', glND:'Rút tiền', glPGD:'', glPGDDam:'dam', glNDNghieng:'nghieng', glTaiNH:'', glSo:'', glKHTK:'', glTKNo:'cham', glMaNH:'', bkChim:'nhat', bkCQ1:'NGÂN HÀNG CHÍNH SÁCH XÃ HỘI', bkCQ2:'CHI NHÁNH TỈNH TÂY NINH', bkPGD:'Gò Dầu', bkNgay:'cham', bkLoai:'chi', bkTen:'', bkDC:'', bkND:'', glMuc:[500000, 1000000, 2000000, 5000000]
};
var GDX = {zoom:0, daHoi:'', glQ:'', glKH:'', glTien:'', glHet:0, glTo:''};   /* lần làm việc: zoom (0 = vừa khung), đã hỏi cảnh báo của bản nào, Giấy lĩnh đang chọn */
function gdxC(){
  var c = D.cauHinh.gdx = D.cauHinh.gdx || {};
  var moi = c.m12GioHuy===undefined;
  Object.keys(GDX_MD).forEach(function(k){ if(c[k]===undefined) c[k] = JSON.parse(JSON.stringify(GDX_MD[k])); });
  if(JSON.stringify(c.quickAmounts)==='[20000000,30000000,50000000,80000000,90000000,100000000]') c.quickAmounts = GDX_MD.quickAmounts.slice();   /* 3.175: bộ mức cũ chưa sửa → bộ mới anh chốt; ai đã thêm / bớt thì giữ */
  if(moi && c.m12TimeMode==='prefill'){ c.m12GioHuy = 'san'; c.m12NgayHuy = 'gd'; }
  if(!c.glLoai104){ c.glLoai104 = 1; c.glLoai = '104'; }
  if(c.glKho==='a4bk') c.glKho = 'a4';   /* 3.193 (anh): Bảng kê tách thành mẫu riêng — Giấy lĩnh không còn in kèm */
  if(!c.bk193){ c.bk193 = 1; if(!c.bkPGD) c.bkPGD = c.diaDanh || GDX_MD.diaDanh; delete c.bkChia; }
  if(c.glNgayCach==='gd' || !c.glNgayCach) c.glNgayCach = 'hom';   /* 3.182 (anh chốt): bỏ "ngày GD điểm" — ngày lĩnh chỉ Hôm nay · nhập ngày · để chấm */   /* 3.179 (anh chốt): Giấy lĩnh mặc định TK 104 tổ trưởng — chuyển 1 lần, sau đó giữ lựa chọn của anh */   /* 3.174: khai báo cũ "ghi sẵn giờ, ngày" → 2 lựa chọn riêng */
  return c;
}
function gdxE(s){ return coChuHTML(s==null ? '' : String(s)); }
var GDX_HEN = 0;
function gdxLuu(){ clearTimeout(GDX_HEN); GDX_HEN = setTimeout(luu, 400); }

/* ---------- hàm của file gốc (chuyển ES5, giữ nguyên cách tính) ---------- */
function gdxDocTien(soTienInput){
  if(!soTienInput && soTienInput !== 0) return '';
  var rawStr = soTienInput.toString().replace(/[^\d]/g, '');
  if(!rawStr) return '';
  var soTien = parseInt(rawStr, 10);
  if(isNaN(soTien) || soTien === 0) return 'Không đồng.';
  var chuSo = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  var donVi = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  var strSo = soTien.toString(), groups = [];
  while(strSo.length > 0){ groups.push(parseInt(strSo.slice(-3), 10)); strSo = strSo.slice(0, -3); }
  var doc3So = function(n, dayDu){
    var t = Math.floor(n / 100), c = Math.floor((n % 100) / 10), dv = n % 10, s = '';
    if(t > 0 || dayDu) s += chuSo[t] + ' trăm ';
    if(c > 1){
      s += chuSo[c] + ' mươi ';
      if(dv === 1) s += 'mốt '; else if(dv === 5) s += 'lăm '; else if(dv > 0) s += chuSo[dv] + ' ';
    } else if(c === 1){
      s += 'mười ';
      if(dv === 1) s += 'một '; else if(dv === 5) s += 'lăm '; else if(dv > 0) s += chuSo[dv] + ' ';
    } else if(c === 0){
      if((t > 0 || dayDu) && dv > 0) s += 'lẻ ' + chuSo[dv] + ' ';
      else if(!(t > 0 || dayDu) && dv > 0) s += chuSo[dv] + ' ';
    }
    return s.trim();
  };
  var resultParts = [], nGroups = groups.length;
  for(var i = nGroups - 1; i >= 0; i--){
    var val = groups[i];
    if(val > 0){ var part = doc3So(val, i < nGroups - 1) + (donVi[i] ? ' ' + donVi[i] : ''); resultParts.push(part.trim()); }
  }
  if(resultParts.length === 0) return 'Không đồng.';
  var fullText = resultParts.join(' ').trim() + ' đồng.';
  return fullText.charAt(0).toUpperCase() + fullText.slice(1);
}
function gdxTien(numberStr){ var clean = String(numberStr==null ? '' : numberStr).replace(/[^\d]/g, ''); if(!clean) return ''; return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function gdxSoNguoi(val){ var num = parseInt(val, 10); if(isNaN(num)) return '01'; return num < 10 && num > 0 ? ('0' + num) : num.toString(); }
function gdxNgay(dateStr){
  var p = String(dateStr||'').split('-');
  if(p.length === 3) return {day:p[2], month:p[1], year:p[0]};
  return {day:'……', month:'……', year:'………'};   /* file gốc để cứng 05/10/2026 khi trống — app để chấm ghi tay */
}
function gdxChipTien(amountNumber){
  var num = parseInt(amountNumber, 10); if(isNaN(num)) return amountNumber;
  if(num >= 1000000 && num % 1000000 === 0) return (num / 1000000) + ' triệu';
  if(num >= 1000000) return (num / 1000000).toFixed(1).replace('.0', '') + ' triệu';
  if(num >= 1000 && num % 1000 === 0) return (num / 1000) + ' nghìn';
  return gdxTien(num) + ' đ';
}

/* ---------- điểm GD · tổ — 3.174 (anh chốt 12/10): cây địa bàn theo Mẫu 31 (kỳ chung, như các tab khác);
   chưa có số liệu → Cài đặt › Địa bàn; mã điểm / ngày GD còn thiếu → tra danh mục tham chiếu (file anh nạp) ---------- */
function gdxNgayThang(v){ var s = String(v==null ? '' : v).trim(), m = s.match(/^\d{4}-\d{2}-(\d{2})/) || s.match(/^(\d{1,2})\/\d{1,2}\/\d{4}/) || s.match(/^(\d{1,2})$/); return m ? String(+m[1]) : ''; }
function gdxDsDiem(){
  var r = [];
  if(KHO.maTo().length){
    var g = {};
    KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(!t || t.trucTiep || !t.diem) return;
      var x = g[t.khoaDiem] = g[t.khoaDiem] || {k:t.khoaDiem, maXa:t.xa||'', tenXa:t.tenXa||'', maDiem:t.diem||'', tenDiem:String(t.tenDiem||'').trim(), ngayGD:gdxNgayThang(t.ngayGD), to:[]};
      if(!x.ngayGD && t.ngayGD) x.ngayGD = gdxNgayThang(t.ngayGD);
      x.to.push({maTo:m, tenTo:t.ten||'', tenAp:t.tenThon||''}); });
    r = Object.keys(g).map(function(k){ var x = g[k];
      x.to.sort(function(a, b){ return (ktApTen(a.tenAp)+'|'+a.tenTo).localeCompare(ktApTen(b.tenAp)+'|'+b.tenTo, 'vi', {numeric:true}); }); return x; });
  } else {
    (D.cauHinh.diaBan||[]).forEach(function(x){ (x.diem||[]).forEach(function(d){
      var to = [];
      (d.ap||[]).forEach(function(a){ (a.to||[]).forEach(function(t){
        if(typeof t==='string'){ var s = t.split('|'); to.push({maTo:(s[0]||'').trim(), tenTo:(s[1]||s[0]||'').trim(), tenAp:a.ten}); }
        else to.push({maTo:t.ma||'', tenTo:t.ten||'', tenAp:a.ten});
      }); });
      r.push({k:d.ma || d.ten || '', maXa:x.ma||'', tenXa:x.xa||'', maDiem:d.ma||'', tenDiem:d.ten||'', ngayGD:gdxNgayThang(d.ngay), to:to});
    }); });
  }
  return r.sort(function(a, b){ return (a.tenXa+'|'+a.tenDiem).localeCompare(b.tenXa+'|'+b.tenDiem, 'vi', {numeric:true}); });
}
function gdxDiem(ma){ if(!ma) return null; return gdxDsDiem().find(function(d){ return d.k===ma || (d.maDiem && d.maDiem===ma); }) || null; }
function gdxDsXa(){ var r = []; gdxDsDiem().forEach(function(d){ if(d.tenXa && r.indexOf(d.tenXa)<0) r.push(d.tenXa); }); return r; }
/* k ngày GD tới (kể cả hôm nay; giao dịch cả ngày nghỉ — không dời). Ngày lớn hơn số ngày của tháng → ngày cuối tháng */
function gdxNgayToi(ngay, k){
  var d = +String(ngay||'').replace(/\D/g, ''), r = []; if(!d || d > 31) return r;
  var h = nay(), hom = new Date(h.getFullYear(), h.getMonth(), h.getDate());
  for(var i = 0; r.length < (k||1) && i < 24; i++){
    var cuoi = new Date(h.getFullYear(), h.getMonth()+i+1, 0).getDate(), x = new Date(h.getFullYear(), h.getMonth()+i, Math.min(d, cuoi));
    if(x >= hom) r.push(ngayISO(x));
  }
  return r;
}
function gdxDiemGanNhat(){
  var best = null;
  gdxDsDiem().forEach(function(d){ var n = gdxNgayToi(d.ngayGD, 1)[0]; if(n && (!best || n < best.n)) best = {d:d, n:n}; });
  return best;
}
function gdxNgayChu(iso){ var p = gdxNgay(iso); return iso ? 'ngày '+p.day+' tháng '+p.month+' năm '+p.year : ''; }
function gdxXaPhuong(tenXa){ return typeof ktXaChu==='function' ? ktXaChu(tenXa) : String(tenXa||''); }
/* chọn điểm / xã cho 04/TD → điền địa điểm, kính gửi, tên UBND (đầy đủ), ngày phát gần nhất */
function gdxDat04(noi, ma, giuNgay){
  var C = gdxC(), doi = C.noiGN!==noi; C.noiGN = noi;
  if(noi==='diem'){
    var d = gdxDiem(ma); C.ma04 = ma || '';
    if(d){ var xa = gdxXaPhuong(d.tenXa); C.xa04 = d.tenXa;
      C.diaDiemPhatTien = 'Điểm giao dịch '+d.tenDiem+' ('+xa+')'; C.kinhGui = 'Ủy ban nhân dân '+xa; C.tenUBNDVietTat = 'Ủy ban nhân dân '+xa;
      if(!giuNgay){ var n = gdxNgayToi(d.ngayGD, 1)[0]; if(n){ C.ngayPhatISO = n; C.ngayPhatTien = gdxNgayChu(n); } }
      if(C.gioDiem) C.gioPhatTien = C.gioDiem; }
  } else {
    C.xa04 = ma || C.xa04 || ''; var x2 = gdxXaPhuong(C.xa04);
    C.diaDiemPhatTien = C.diaDiemPGD || GDX_MD.diaDiemPGD;
    if(C.xa04){ C.kinhGui = 'Ủy ban nhân dân '+x2; C.tenUBNDVietTat = 'Ủy ban nhân dân '+x2; }
    if(!giuNgay && (doi || !C.ngayPhatISO || C.ngayPhatISO <= ngayISO(nay()))){ var mai = nay(); mai.setDate(mai.getDate()+1); C.ngayPhatISO = ngayISO(mai); C.ngayPhatTien = gdxNgayChu(C.ngayPhatISO); }
    if(C.gioPGD) C.gioPhatTien = C.gioPGD;
  }
  gdxLuu();
}

/* ---------- MẪU IN — chuyển nguyên văn từ file gốc ---------- */
function gdxHTML04(data, C){
  var d = gdxNgay(gdxNgayKy04(C));
  var soNguoiFormatted = gdxSoNguoi(data.soNguoi);
  var soTienFormatted = gdxTien(data.soTien);
  var bangChuFormatted = gdxDocTien(data.soTien);
  var isGQVL = C.isGQVL || false;
  var targetTerm = isGQVL ? 'người lao động' : 'người';
  var targetPlural = isGQVL ? 'những người lao động' : 'những người';
  var appConfig = {};
  var gach = function(i){ return C.gach04==='an' ? '' : gdxGachTay(i); };   /* 3.243 (anh 18/10): mục 2 không có số liệu → nét gạch tay mảnh trên mỗi dòng chấm; ⚙ Khai báo riêng hiện / ẩn */
  ['donViTren','donViDuoi','diaDanh','kinhGui','tenPGDTrongVanBan','gioPhatTien','ngayPhatTien','diaDiemPhatTien','tenUBNDVietTat','nguoiLap','chucDanhDuyet'].forEach(function(k){ appConfig[k] = gdxE(C[k]); });
  if(C.kyPGD) appConfig.chucDanhDuyet = String(C.chucPGD||GDX_MD.chucPGD).split('|').map(gdxE).join('<br>');   /* 3.174: Phó Giám đốc ký thay (KT. GIÁM ĐỐC / PHÓ GIÁM ĐỐC — anh xem lại thể thức sau) */
  /* 3.271 (anh 20/10: "tên cơ quan và tiêu ngữ gần nhau quá … cho xa ra 1 chút"): riêng bảng đầu trang lấn lề trái 5 mm, phải 7 mm; cột 31 / 53 / 16 %
     → tên cơ quan cách tiêu ngữ ~5,6 mm (trước ~3,2), tiêu ngữ cách "Mẫu số 04/TD" rộng hơn; cỡ chữ giữ nguyên */
  return '\n        <div class="doc-body-inner sheet-m04">\n          <table class="doc-header-table" style="width: calc(100% + 12mm); margin-left: -5mm; margin-right: -7mm; border-collapse: collapse; border: none; margin-bottom: 8px;">\n            <tr>\n              <!-- Cột 1: Tên cơ quan canh đều đối xứng và có gạch dưới tầm 1/2 chữ -->\n              <td style="width: 31%; text-align: center; vertical-align: top; border: none; padding: 0 4px 0 0;">\n                <div class="org-box">\n                  <div class="org-level-1" style="font-size:11.5pt; font-weight:bold; white-space:nowrap;">'+
    (appConfig.donViTren)+
    '</div>\n                  <div class="org-level-2" style="font-size:11.5pt; font-weight:bold; white-space:nowrap; margin-top:2px;"><span class="org-chu" style="display:inline-block;">'+
    (appConfig.donViDuoi)+
    '<span class="org-line" style="display:block; width:50%; height:1px; border:0 !important; background:#000000; transform:scaleY(.55); transform-origin:center; -webkit-print-color-adjust:exact; print-color-adjust:exact; margin:1px auto 0 auto;"></span></span></div>\n                </div>\n              </td>\n              <!-- Cột 2: Tiêu ngữ canh đều, gạch dưới ngắn vừa đúng chiều dài chữ và sát chữ -->\n              <td style="width: 53%; text-align: center; vertical-align: top; border: none; padding: 0 4px 0 8px;">\n                <div style="text-align:center;">\n                  <div class="nation-title" style="font-size:12pt; font-weight:bold; white-space:nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>\n                  <!-- Khối riêng biệt chỉ ôm vừa khít dòng chữ Độc lập - Tự do - Hạnh phúc -->\n                  <div style="display:inline-block; text-align:center; margin-top:2px;">\n                    <div class="nation-motto" style="font-size:12pt; font-weight:bold; white-space:nowrap;">Độc lập – Tự do – Hạnh phúc</div>\n                    <!-- Đường kẻ ngắn vừa khít chiều dài của dòng Độc lập – Tự do – Hạnh phúc -->\n                    <div class="nation-motto-line" style="width:100%; height:1px; border:0 !important; background:#000000; transform:scaleY(.55); transform-origin:center; -webkit-print-color-adjust:exact; print-color-adjust:exact; margin:0 auto 0 auto;"></div>\n                  </div>\n                </div>\n              </td>\n              <!-- Cột 3: Số hiệu văn bản rộng rãi, white-space: nowrap đảm bảo không rớt chữ NH -->\n              <td style="width: 16%; text-align: right; vertical-align: top; border: none; padding: 0 0 0 2px;">\n                <div class="form-id-badge" style="text-align: right; font-size: 9pt; white-space: nowrap;">\n                  <div><em>Mẫu số 04/TD</em></div>\n                  <div><em>Lập 02 liên</em></div>\n                  <div><em style="white-space:nowrap;">- 01 liên lưu tổ</em></div>\n                  <div><em style="white-space:nowrap;">- 01 liên lưu NH</em></div>\n                </div>\n              </td>\n            </tr>\n          </table>\n\n          <div class="doc-date">\n            <em>'+
    (appConfig.diaDanh)+
    ', ngày '+
    (d.day)+
    ' tháng '+
    (d.month)+
    ' năm '+
    (d.year)+
    '</em>\n          </div>\n\n          <div class="doc-heading">\n            <div class="doc-heading-1">THÔNG BÁO</div>\n            <div class="doc-heading-2">KẾT QUẢ PHÊ DUYỆT CHO VAY</div>\n          </div>\n\n          <div class="doc-send-to" style="padding-left: 2.8cm; margin-bottom: 12px;">\n            <b><u>Kính gửi:</u></b> '+
    (appConfig.kinhGui)+
    '.\n          </div>\n\n          <div class="doc-p-intro">\n            Căn cứ hồ sơ cho vay đã được phê duyệt, '+
    (gdxLien(appConfig.tenPGDTrongVanBan))+
    ' thông báo kết quả phê duyệt cho vay như sau:\n          </div>\n\n          <div class="doc-li">\n            1. Tổng số '+
    (targetTerm)+
    ' được vay vốn đợt này (kèm danh sách mẫu 03/TD nếu có): '+
    (soNguoiFormatted)+
    '&nbsp;'+
    (targetTerm)+
    '.\n          </div>\n          <div class="doc-li doc-li-sub">\n            Số tiền: '+
    (soTienFormatted)+
    ' đồng. Bằng chữ: '+
    (bangChuFormatted)+
    '\n          </div>\n\n          <div class="doc-li">\n            2. Số '+
    (targetTerm)+
    ' chưa được vay vốn đợt này: <span class="dots-fine" style="position:relative;">....................................'+gach(0)+'</span> <span style="white-space:nowrap;">'+
    (targetTerm)+
    '.</span>\n          </div>\n          <div class="doc-li doc-li-sub">\n            - Có số thứ tự trong danh sách là: <span class="dots-fine" style="position:relative;">...............................................................'+gach(1)+'</span>\n          </div>\n          <div class="doc-li doc-li-sub">\n            - Số tiền: <span class="dots-fine" style="position:relative;">..........................................................................................'+gach(2)+'</span> đồng.\n          </div>\n\n          <div class="doc-li">\n            3. Lịch phát tiền vay vào '+
    (appConfig.gioPhatTien)+
    ', '+
    (appConfig.ngayPhatTien)+
    ', tại&nbsp;địa&nbsp;điểm: '+
    (appConfig.diaDiemPhatTien)+
    '.\n          </div>\n\n          <div class="doc-p-closing">\n            Đề nghị '+
    (appConfig.tenUBNDVietTat)+
    ' thông báo cho '+
    (targetPlural)+
    ' được vay vốn đến địa điểm và thời gian nêu trên để nhận tiền vay.\n          </div>\n\n          <div class="doc-signatures">\n            <div>\n              <div class="sig-title">Người lập</div>\n              <div class="sig-guide">(Ký, ghi rõ họ tên)</div>\n              <div class="sig-blank"></div>\n              <div class="sig-signer"><em><b>'+
    (appConfig.nguoiLap)+
    '</b></em></div>\n            </div>\n            <div>\n              <div class="sig-title">'+
    (appConfig.chucDanhDuyet)+
    '</div>\n              <div class="sig-guide">(Ký tên, đóng dấu)</div>\n              <div class="sig-blank"></div>\n              <div class="sig-signer">&nbsp;</div>\n            </div>\n          </div>\n        </div>\n      ';
}
function gdxHTML12(C, d0){   /* d0: điểm GD chụp sẵn (in lại từ nhật ký) */
  var d = d0 || gdxDiem(C.m12SelectedDiem) || {tenDiem:'', maDiem:'', tenXa:'', to:[]};
  var dParts = gdxNgay(C.m12NgayGD);
  var gdvName = gdxE(C.m12GDV), ksvName = gdxE(C.m12KSV), toTruongGDName = gdxE(C.m12ToTruong);
  var hinhThucTH = gdxE(String(C.m12HinhThucTieuHuy||'').trim() || 'cắt nhỏ');
  var slTH = gdxE(String(C.m12SoLuongTieuHuy||'').trim() || '……………………………');
  /* 3.174 (anh chốt): giờ tiêu hủy (chấm / ghi sẵn giờ khai báo) và ngày tiêu hủy (chấm / = ngày GD) là 2 lựa chọn riêng */
  var gioTH = C.m12GioHuy==='san' ? gdxE(String(C.m12PrefillGio||'').trim() || '11 giờ 30 phút') : '…….. giờ…… phút';
  var ngayTH = C.m12NgayHuy==='gd' && C.m12NgayGD ? dParts.day+'/'+dParts.month+'/'+dParts.year : '…../ …../……….';
  var tgTH_text = gioTH+', ngày '+ngayTH;
  var rdoTenTo = C.m12TenToOption || 'blank';
  var numRows = parseInt(C.m12NumRows, 10); if(isNaN(numRows) || numRows < 5) numRows = 12;
  /* tự co chiều cao dòng + cỡ chữ để luôn trọn 1 trang A4 (nguyên bảng mức của file gốc) */
  var rowHeight = 36, tableFont = '12pt', thFont = '11.5pt', docMainFont = '13.5pt', sigBlankHeight = 52, padVertical = '6px';
  if(numRows <= 10){ rowHeight = 40; tableFont = '12.5pt'; thFont = '12pt'; docMainFont = '13.5pt'; sigBlankHeight = 70; padVertical = '7px'; }
  else if(numRows <= 12){ rowHeight = 36; tableFont = '12pt'; thFont = '11.5pt'; docMainFont = '13.5pt'; sigBlankHeight = 65; padVertical = '6px'; }
  else if(numRows <= 15){ rowHeight = 30; tableFont = '11pt'; thFont = '11pt'; docMainFont = '13pt'; sigBlankHeight = 58; padVertical = '4.5px'; }
  else if(numRows <= 20){ rowHeight = 23; tableFont = '10pt'; thFont = '10pt'; docMainFont = '12pt'; sigBlankHeight = 52; padVertical = '3px'; }
  else {   /* 3.174: trên 20 dòng — chiều cao dòng tính theo chỗ còn lại để luôn trọn 1 trang A4, giữ khoảng ký tối thiểu (phần thu gọn dồn vào bảng) */
    rowHeight = Math.max(10, Math.floor(470 / numRows)); tableFont = rowHeight >= 17 ? '9.5pt' : rowHeight >= 14 ? '8.5pt' : rowHeight >= 12 ? '7.5pt' : '6.5pt'; thFont = '9pt'; docMainFont = numRows <= 28 ? '11.5pt' : '10.5pt'; sigBlankHeight = 52; padVertical = '0px'; }
  var lhDong = numRows > 20 ? ' line-height:1.05;' : '';
  var tos = d.to || [], rowsHtml = '';
  for(var i = 1; i <= numRows; i++){
    var toInfo = tos[i - 1], tenToTruong = '';
    if(rdoTenTo === 'fill' && toInfo) tenToTruong = gdxE(toInfo.tenTo);
    rowsHtml += '\n          <tr style="height:'+(rowHeight)+'px;'+lhDong+'">\n            <td class="col-stt" style="padding:'+(padVertical)+' 2px; text-align:center;">'+(i)+'</td>\n            <td class="col-name" style="padding:'+(padVertical)+' 5px;">'+(tenToTruong)+'</td>\n            <td class="col-num" style="padding:'+(padVertical)+' 2px;"></td>\n            <td class="col-num" style="padding:'+(padVertical)+' 2px;"></td>\n            <td class="col-num" style="padding:'+(padVertical)+' 2px;"></td>\n            <td style="padding:'+(padVertical)+' 2px; width:75px;"></td>\n            <td style="padding:'+(padVertical)+' 2px; width:75px;"></td>\n          </tr>\n        ';
  }
  var tx = String(d.tenXa||'');
  var prefixXaPhuong = /^Phường/.test(tx) ? 'Phường: <b>'+gdxE(tx.replace('Phường ', ''))+'</b>' : 'Xã: <b>'+gdxE(tx.replace('Xã ', ''))+'</b>';   /* 3.175: giá trị in đậm cho nổi bật, nhãn chữ thường */
  d = {tenDiem:gdxE(d.tenDiem), maDiem:gdxE(d.maDiem)};
  return '\n        <div class="sheet-a4 sheet-m12" style="font-family:\'Times New Roman\', Times, serif; font-size:'+
    (docMainFont)+
    '; line-height:1.25;">\n          <!-- Header M12: Dòng trên nằm giữa dòng dưới và có 1 làn gạch mảnh 1/3 dòng dưới -->\n          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">\n            <div style="display:inline-block; text-align:center;">\n              <div style="font-size:11.5pt; font-weight:bold; white-space:nowrap;">'+(gdxE(C.m12DonVi1))+'</div>\n              <div style="font-size:11.5pt; font-weight:bold; white-space:nowrap; margin-top:2px;">'+(gdxE(C.m12DonVi2))+'</div>\n              <!-- Nét gạch mảnh dài đúng 1/3 dòng dưới, căn giữa -->\n              <div style="width:55%; height:1px; border:0 !important; background:#000000; transform:scaleY(.55); transform-origin:center; -webkit-print-color-adjust:exact; print-color-adjust:exact; margin:1px auto 0 auto; -webkit-print-color-adjust:exact; print-color-adjust:exact;"></div>\n            </div>\n            <div style="text-align:right;">\n              <div style="font-size:11pt; font-style:italic; white-space:nowrap;">Mẫu số 12/GDX</div>\n            </div>\n          </div>\n\n          <!-- Tiêu đề -->\n          <div style="text-align:center; margin:8px 0 5px 0;">\n            <div style="font-size:15pt; font-weight:bold; text-transform:uppercase;">BẢNG KÊ GIAO, NHẬN, TIÊU HỦY BIÊN LAI</div>\n            <div style="font-size:12.5pt; font-style:italic; margin-top:2px;">\n              Ngày '+
    (dParts.day)+
    ' tháng '+
    (dParts.month)+
    ' năm '+
    (dParts.year)+
    '\n            </div>\n          </div>\n\n          <!-- Điểm giao dịch & Mã điểm -->\n          <div style="display:flex; justify-content:flex-start; gap:36px; margin-bottom:2px; font-size:13pt;">\n            <div>Điểm giao dịch: <b>'+
    (d.tenDiem)+
    '</b></div>\n            <div>Mã điểm giao dịch: <b>'+
    (d.maDiem)+
    '</b></div>\n          </div>\n          <div style="margin-bottom:6px; font-size:13pt;">\n            '+
    (prefixXaPhuong)+
    '\n          </div>\n\n          <!-- PHẦN I: GIAO - NHẬN BIÊN LAI -->\n          <div style="font-weight:bold; font-size:13pt; margin-top:3px;">PHẦN I. GIAO - NHẬN BIÊN LAI</div>\n          <div style="margin-top:7px; margin-bottom:9px; font-size:12.5pt;">\n            Giao dịch viên: '+
    (gdvName ? '<b>'+gdvName+'</b>' : '<span class="dots-fine">……………………………………………</span>')+
    '\n          </div>\n\n          <!-- Bảng kê chuẩn Mẫu 12/GDX tự co giãn trọn 1 trang A4 -->\n          <table class="m12-table" style="font-size:'+
    (tableFont)+
    ';">\n            <thead>\n              <tr style="font-size:'+
    (thFont)+
    ';">\n                <th rowspan="2" style="width:30px;">Stt</th>\n                <th rowspan="2" style="width:160px;">Họ tên Tổ trưởng<br>Tổ TK&VV</th>\n                <th rowspan="2" style="width:65px;">Số lượng<br>Biên lai<br>giao</th>\n                <th colspan="3">Tổ trưởng trả lại<br>Biên lai tháng trước</th>\n                <th rowspan="2" style="width:80px;">Tổ trưởng<br>Tổ TK&VV<br>ký nhận</th>\n              </tr>\n              <tr style="font-size:'+
    (thFont)+
    ';">\n                <th style="width:50px;">Số<br>trả lại</th>\n                <th style="width:50px;">Số<br>thiếu</th>\n                <th style="width:80px;">Lý do thiếu</th>\n              </tr>\n            </thead>\n            <tbody>\n              '+
    (rowsHtml)+
    '\n              <tr style="font-weight:bold; height:24px;">\n                <td colspan="2" style="text-align:center;">Tổng cộng</td>\n                <td></td>\n                <td></td>\n                <td></td>\n                <td></td>\n                <td></td>\n              </tr>\n            </tbody>\n          </table>\n\n          <!-- PHẦN II: TIÊU HỦY BIÊN LAI -->\n          <div style="margin-top:6px; font-size:12pt;">\n            <div style="font-weight:bold; font-size:12.5pt; margin-bottom:2px;">PHẦN II. TIÊU HỦY BIÊN LAI</div>\n            <div style="margin-bottom:2px;">1. Hình thức tiêu hủy: '+
    (hinhThucTH)+
    '</div>\n            <div style="margin-bottom:2px;">2. Tổng số Biên lai tiêu hủy: '+
    (slTH ? slTH : '<span class="dots-fine">……………………………</span>')+
    ' tờ</div>\n            <div style="margin-bottom:4px;">3. Thời gian tiêu hủy: '+
    (tgTH_text)+
    '</div>\n          </div>\n\n          <!-- 3 Chữ ký phía dưới -->\n          <div class="m12-signatures" style="margin-top:10px;">\n            <div>\n              <div class="sig-title" style="font-size:12pt; font-weight:bold;">GIAO DỊCH VIÊN</div>\n              <div class="sig-guide" style="font-size:11pt;">(Ký, ghi rõ họ tên)</div>\n              <div class="sig-blank" style="height:'+
    (sigBlankHeight + 20)+
    'px;"></div>\n              <div class="sig-signer" style="font-size:12pt; font-weight:bold;">'+
    (gdvName)+
    '</div>\n            </div>\n            <div>\n              <div class="sig-title" style="font-size:12pt; font-weight:bold;">KIỂM SOÁT VIÊN/<br>GIAO DỊCH VIÊN</div>\n              <div class="sig-guide" style="font-size:11pt;">(Ký, ghi rõ họ tên)</div>\n              <div class="sig-blank" style="height:'+
    (sigBlankHeight)+
    'px;"></div>\n              <div class="sig-signer" style="font-size:12pt; font-weight:bold;">'+
    (ksvName)+
    '</div>\n            </div>\n            <div>\n              <div class="sig-title" style="font-size:12pt; font-weight:bold;">TỔ TRƯỞNG<br>TỔ GIAO DỊCH</div>\n              <div class="sig-guide" style="font-size:11pt;">(Ký, ghi rõ họ tên)</div>\n              <div class="sig-blank" style="height:'+
    (sigBlankHeight)+
    'px;"></div>\n              <div class="sig-signer" style="font-size:12pt; font-weight:bold;">'+
    (toTruongGDName)+
    '</div>\n            </div>\n          </div>\n\n        </div>\n      ';
}
/* CSS mẫu in — nguyên văn file gốc (khung xem + @media print); thêm biến màu nền + bỏ zoom khung xem khi in */
var GDX_CSS = ':root{--text:#263238;--bg-page:#eceff1}'+'*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;color:var(--text);background-color:var(--bg-page);line-height:1.5;min-height:100vh;display:flex;flex-direction:column}.preview-stage{background:#455a64;border-radius:8px;padding:24px;overflow-x:auto;display:flex;justify-content:center;box-shadow:inset 0 2px 8px rgba(0,0,0,0.25)}.sheet-a4{background:#ffffff;width:210mm;min-height:297mm;padding:20mm 20mm 20mm 30mm;box-shadow:0 8px 24px rgba(0,0,0,0.35);font-family:"Times New Roman",Times,serif;color:#000000;font-size:14pt;line-height:1.35;position:relative;margin-bottom:20px}.sheet-m04{font-family:"Times New Roman",Times,serif !important;font-size:14pt !important;line-height:1.35 !important}.sheet-m04 .doc-heading-1{font-size:15pt !important}.sheet-m04 .doc-heading-2{font-size:15pt !important}.sheet-m04 .doc-heading{margin:23px 0 !important}.sheet-m04 .doc-send-to{font-size:14pt !important;padding-left:2.8cm !important;margin-bottom:19px !important}.sheet-m04 .doc-date{font-size:13.5pt !important}.sheet-m04 .sig-title,.sheet-m04 .sig-signer{font-size:14pt !important}.sheet-m04 .sig-guide{font-size:12.5pt !important}table.doc-header-table{width:100%;border-collapse:collapse;border:none;margin-bottom:8px}table.doc-header-table td{border:none;padding:0 4px}.org-level-1{font-size:11.5pt;font-weight:bold;text-transform:uppercase;line-height:1.25}.org-level-2{font-size:11.5pt;font-weight:bold;text-transform:uppercase;margin-top:2px;line-height:1.25}.nation-title{font-size:11.5pt;font-weight:bold;text-transform:uppercase;white-space:nowrap;letter-spacing:-0.2px;line-height:1.25}.nation-motto{font-size:11.5pt;font-weight:bold;margin-top:2px;line-height:1.25}.nation-motto-line{width:65%;height:1px !important;border:0 !important;background:#000000;transform:scaleY(.55);margin:1.5px auto 0 auto;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}.form-id-badge{font-size:9pt;font-style:italic;line-height:1.25;text-align:right}.doc-date{text-align:right;font-style:italic;font-size:12.5pt;margin-top:10px;margin-bottom:12px;padding-right:15px}.doc-heading{text-align:center;margin:14px 0}.doc-heading-1{font-size:14pt;font-weight:bold;text-transform:uppercase}.doc-heading-2{font-size:15pt;font-weight:bold;text-transform:uppercase;margin-top:3px}.doc-send-to{margin-bottom:10px;font-size:13pt;padding-left:2.8cm}.send-to-label{font-weight:bold;text-decoration:underline}.doc-p-intro{text-align:justify;text-indent:1.27cm;margin-bottom:8px}.doc-li{margin-bottom:6px;text-align:justify}.doc-li-sub{padding-left:20px;margin-top:3px}.doc-p-closing{text-align:justify;text-indent:1.27cm;margin-top:12px;margin-bottom:20px}.doc-signatures{display:grid;grid-template-columns:1fr 1fr;text-align:center;margin-top:22px;page-break-inside:avoid}.sig-title{font-weight:bold;font-size:13pt}.sig-guide{font-style:italic;font-size:11.5pt;margin-top:2px}.sig-blank{height:85px}.sig-signer{font-weight:bold;font-size:13pt}.sheet-m12{padding:12mm 15mm 12mm 18mm !important;font-size:10.5pt !important;line-height:1.25 !important}.m12-table{width:100%;border-collapse:collapse;margin-top:6px;margin-bottom:8px;font-size:9pt}.m12-table th,.m12-table td{border:.9px solid #000000;padding:3.5px 4px;vertical-align:middle}.m12-table tbody td{border-top:.5px solid #888;border-bottom:.5px solid #888}.m12-table tbody tr:last-child td{border-top:.9px solid #000;border-bottom:.9px solid #000}.m12-table th{text-align:center;font-weight:bold;background:#fafafa}.m12-table td.col-stt{text-align:center;width:28px}.m12-table td.col-name{width:155px}.m12-table td.col-num{text-align:center;width:55px}.m12-signatures{display:grid;grid-template-columns:1fr 1.2fr 1fr;text-align:center;margin-top:14px;page-break-inside:avoid}.m12-signatures .sig-title{font-size:10.5pt}.m12-signatures .sig-guide{font-size:9.5pt}.m12-signatures .sig-blank{height:48px}@media print{body{background:#ffffff !important;color:#000000 !important;margin:0 !important;padding:0 !important}header.app-header,.control-sidebar,.preview-action-bar,.toast-box{display:none !important}.app-body{display:block !important;padding:0 !important;margin:0 !important;max-width:none !important}.preview-wrapper{display:block !important}.preview-stage{background:transparent !important;padding:0 !important;box-shadow:none !important;display:block !important}.sheet-a4{box-shadow:none !important;margin:0 !important;width:100% !important;min-height:auto !important;padding:20mm 20mm 20mm 30mm !important;page-break-after:always;break-after:page}.sheet-m12{padding:10mm 12mm 10mm 15mm !important}.sheet-a4:last-child{page-break-after:auto !important;break-after:auto !important}*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}.nation-motto-line{border:0 !important;background:#000000 !important;height:1px !important;display:block !important;visibility:visible !important}@page{size:A4 portrait;margin:0}}.dots-fine{font-size:10.5pt !important;font-weight:300 !important;letter-spacing:1.5px !important;color:#333333 !important;display:inline !important}'+'@media print{.sheet-a4{zoom:1 !important}}';
function gdxTrang(than, css){
  return '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>In</title><style>'+(css || GDX_CSS)+'</style></head><body><div class="preview-stage"><div id="printRoot">'+than+'</div></div></body></html>';
}

/* ==========================================================
   3.174 (anh chốt 12/10 — docs/KE_HOACH_HO_SO_TO.md mục E): BỐ CỤC MỚI tab 🏢 Giao dịch xã
   - Khối LỌC ĐỊA BÀN của app (Xã · Điểm GD · Hội · Tổ — cây theo Mẫu 31 kỳ chung); mỗi mẫu khai cần tới cấp nào (04/TD, 12/GDX: điểm GD; Giấy lĩnh: tổ).
   - Khai báo chung (danh sách cán bộ, danh mục tham chiếu, TK 104) ở nút ⚙ trên cùng; khai báo riêng từng mẫu ở ⚙ của mẫu.
   - MỌI mục của mẫu nằm trong ⚙ riêng, xếp theo thứ tự trên mẫu (trên → dưới, trái → phải); tích "Chọn nhanh" để đưa ra khung trái.
   - 📋 Tóm tắt bản in ghim đáy khung trái: chip (bấm → tới mục), cảnh báo vàng / đỏ không chặn (hỏi 1 lần), [📄 PDF] [🖨 IN n bản].
   - Khung xem ~40 % bên phải, bật / tắt (nhớ máy). Điện thoại: xem là chính.
   - 📜 Nhật ký in: lưu lựa chọn từng lần in (không lưu PDF) trên máy này, tự xóa sau 1 tháng; bấm In lại → đúng bản cũ.
   ========================================================== */
var GDX_MAU = [
  {k:'m04', ma:'04/TD', bt:'📢', ten:'Thông báo kết quả phê duyệt cho vay', nhom:'Giải ngân', cap:'diem'},
  {k:'m12', ma:'12/GDX', bt:'📋', ten:'Bảng kê giao, nhận, tiêu hủy biên lai', nhom:'Biên lai', cap:'diem'},
  {k:'gl', ma:'Giấy lĩnh', bt:'💵', ten:'Giấy lĩnh tiền mặt (rút TK 105 / TK 104)', nhom:'Tiết kiệm', cap:'to'},
  {k:'gn', ma:'Giấy nộp', bt:'🏦', ten:'Giấy nộp tiền (nộp để ghi vào tài khoản) + Bảng kê các loại tiền nộp', nhom:'Tiết kiệm', cap:'to'},   /* 3.312 (anh 22/10) */
  {k:'bk', ma:'Bảng kê', bt:'🧾', ten:'Bảng kê các loại tiền ngân hàng chi ra (mẫu trắng)', nhom:'Tiết kiệm', cap:'khong'}   /* 3.193 (anh): mẫu độc lập, không dính Giấy lĩnh */
];
function gdxTenMau(M){ return M.ten.indexOf(M.ma)===0 ? M.ten : M.ma+' — '+M.ten; }
function gdxMauHT(){ var f = gdxC().form; return GDX_MAU.find(function(m){ return m.k===f; }) || GDX_MAU[0]; }
function gdxCH(){ var C = D.cauHinh.gdxTK = D.cauHinh.gdxTK || {ky:''}; return pvGan(C); }
PV_DUNG.gdx = {S:function(){ return gdxCH(); }, K:function(){ return TO_K; }, sau:function(){ gdxTheoLoc(); }, toBatBuoc:true, daChieu:true, gonDiem:true};
function gdxHom(){ return ngayISO(nay()); }
function gdxMai(){ var m = nay(); m.setDate(m.getDate()+1); return ngayISO(m); }
function gdxDMY(iso){ return iso ? ngayVN(iso) : ''; }

/* ---------- ngày của 04/TD: ngày ký (hôm nay / chọn ngày) · ngày phát (mặc định = ngày GD gần nhất của điểm; tại PGD = ngày mai) ---------- */
function gdxNgayKy04(C){ return C.ky04Hom!==false ? gdxHom() : (C.ngayThongBao || ''); }
function gdxNgayPhatMD(C){ if(C.noiGN==='pgd') return gdxMai(); var d = gdxDiem(C.ma04); return d ? (gdxNgayToi(d.ngayGD, 1)[0] || '') : ''; }
function gdxNgayPhat04(C){ return C.ngayPhatTay && C.ngayPhatISO ? C.ngayPhatISO : gdxNgayPhatMD(C); }

/* ---------- bản chụp lựa chọn để dựng mẫu (xem trước · in · nhật ký in lại dùng chung 1 bản) ---------- */
var GDX_BO = ['danhSachCanBo','quickAmounts','mauHay','nhanh','glMuc'];
/* 3.243: giữ liền 2 chữ cuối (vd "Gò Dầu") — không rớt nửa tên xuống dòng */
function gdxLien(s){ return String(s||'').replace(/ ([^ ]+)$/, '&nbsp;$1'); }
/* 3.243: nét gạch tay mảnh, ngắn (SVG, mỗi dòng hơi khác cho tự nhiên) — đặt giữa dòng chấm */
var GDX_GACH = [[40, 'M11.6 1.2 C9.4 6 6.6 11.6 2.2 18.6 L2.9 18.9 C7.4 12 10.2 6.3 12.3 1.5 Z'], [45, 'M11.2 1.4 C9.2 6.4 6.4 12 2.6 18.4 L3.3 18.7 C7.2 12.4 10 6.7 11.9 1.7 Z'], [48, 'M12 1 C9.6 6.2 6.9 11.4 2 18.8 L2.7 19.1 C7.6 11.8 10.4 6.5 12.7 1.3 Z']];
function gdxGachTay(i){ var g = GDX_GACH[i % GDX_GACH.length]; return '<svg class="gach-tay" style="position:absolute; left:'+g[0]+'%; top:-1px; width:14px; height:20px;" width="14" height="20" viewBox="0 0 14 20" aria-hidden="true"><path d="'+g[1]+'" fill="#111"/></svg>'; }
function gdxChup(){
  var C = gdxC(), m = C.form==='m12' ? 'm12' : C.form==='gl' ? 'gl' : C.form==='gn' ? 'gn' : C.form==='bk' ? 'bk' : 'm04', c = {};
  Object.keys(C).forEach(function(k){ if(GDX_BO.indexOf(k)<0) c[k] = JSON.parse(JSON.stringify(C[k]===undefined ? null : C[k])); });
  var X = {mau:m, C:c};
  if(m==='m04'){ c.ngayThongBao = gdxNgayKy04(C); c.ky04Hom = false; var np = gdxNgayPhat04(C); c.ngayPhatISO = np; c.ngayPhatTay = true; c.ngayPhatTien = np ? gdxNgayChu(np) : 'ngày …… tháng …… năm ………';
    if(C.noiGN==='pgd'){ c.diaDiemPhatTien = C.diaDiemPGD || GDX_MD.diaDiemPGD; if(C.gioPGD) c.gioPhatTien = C.gioPGD; } else if(C.gioDiem) c.gioPhatTien = C.gioDiem; }
  if(m==='m12'){ var d = gdxDiem(C.m12SelectedDiem); X.d = d ? JSON.parse(JSON.stringify(d)) : null; }
  if(m==='gl'){ X.gl = gdxGLDuLieu(); if(C.glIn==='bk') X.bk = true; else if(C.glIn==='kh') X.kh = true; }
  if(m==='gn'){ X.gl = gdxGLDuLieu(); X.gl.du = null; if(C.gnIn==='bk') X.bk = true; else if(C.gnIn==='kh') X.kh = true; }   /* 3.312: 🏦 Giấy nộp dùng chung ô chọn người · số tiền của Giấy lĩnh */   /* 3.194 (anh): in 💵 Lĩnh · 🧾 Bảng kê · 💵+🧾 — phần Bảng kê lấy cài đặt tab 🧾 Bảng kê, dữ liệu theo Giấy lĩnh */
  return X;
}
function gdxDung(X){   /* → {than, css} */
  var c = X.C;
  if(X.mau==='m12') return {than:gdxHTML12(c, X.d || {tenDiem:'', maDiem:'', tenXa:'', to:[]}), css:GDX_CSS};
  if(X.mau==='bk') return {than:gdxHTMLBK(c), css:BK_CSS};   /* 3.193: 🧾 Bảng kê — mẫu riêng, 2 tờ / A4 ngang */
  if(X.mau==='gn') return gdxDungGN(X);   /* 3.312 — js/53-giay-nop.js */
  if(X.mau==='gl' && X.bk) return {than:gdxHTMLBKDL(X.gl, c), css:BK_CSS};
  if(X.mau==='gl' && X.kh){ c = JSON.parse(JSON.stringify(c)); c.glKho = 'a4bk'; }
  if(X.mau==='gl') return {than:gdxHTMLGL(X.gl, c), css:GL_CSS+(c.glKho==='a4bk' ? GL_CSS_A4+BK_CSS_LOI+BK_CSS_TO+GL_CSS_KEM : c.glKho==='a4' || c.glKho==='a4x2' ? GL_CSS_A4 : GL_CSS_A5)};
  var x = {soNguoi:c.soNguoi || 1, soTien:c.soTien || ''}, m = '<div class="sheet-a4">'+gdxHTML04(x, c)+'</div>';
  return {than:+c.soBan===1 ? m : m+m, css:GDX_CSS};   /* mặc định 2 bản giống nhau (1 lưu tổ, 1 lưu NH) — chọn được 1 bản */
}
function gdxThan(){ return gdxDung(gdxChup()).than; }

/* ---------- mục của từng mẫu — theo thứ tự trên mẫu; nhanh = mặc định ra khung chọn nhanh (anh đổi ở ⚙) ---------- */
var GDX_MUC = {
  m04: [
    {k:'dau', ten:'Đầu mẫu (tên NH, PGD, địa danh, tên PGD trong câu)', nhanh:0},
    {k:'ngayky', ten:'Ngày ký thông báo', nhanh:1},
    {k:'kinhgui', ten:'Kính gửi', nhanh:0},
    {k:'gq', ten:'Loại thông báo', nhanh:1},
    {k:'mh', ten:'Số hộ · số tiền', nhanh:1},
    {k:'gach2', ten:'Mục 2 (chưa được vay): nét gạch tay trên dòng chấm', nhanh:0},
    {k:'gio', ten:'Giờ phát tiền', nhanh:0},
    {k:'ngayphat', ten:'Lịch phát tiền vay', nhanh:1},
    {k:'noi', ten:'Nơi phát tiền', nhanh:1},
    {k:'diadiem', ten:'Địa điểm (dòng in)', nhanh:0},
    {k:'denghi', ten:'Tên UBND ở câu đề nghị', nhanh:0},
    {k:'nguoilap', ten:'Người lập', nhanh:1},
    {k:'ky', ten:'Người ký duyệt', nhanh:1},
    {k:'soban', ten:'Số bản in', nhanh:1}],
  m12: [
    {k:'dau12', ten:'Tên cơ quan đầu mẫu', nhanh:0},
    {k:'ngaygd', ten:'Ngày giao dịch', nhanh:1},
    {k:'ba', ten:'GDV · KSV · Tổ trưởng tổ GD', nhanh:1},
    {k:'sodong', ten:'Số dòng bảng', nhanh:1},
    {k:'tento', ten:'Tên tổ trưởng', nhanh:1},
    {k:'hinhthuc', ten:'Hình thức tiêu hủy', nhanh:0},
    {k:'soluong', ten:'Số biên lai tiêu hủy', nhanh:0},
    {k:'giohuy', ten:'Giờ tiêu hủy', nhanh:0},
    {k:'ngayhuy', ten:'Ngày tiêu hủy', nhanh:1}],
  gl: [
    {k:'gldau', ten:'Dòng dưới tên chi nhánh', nhanh:0},
    {k:'glngay', ten:'Ngày lĩnh', nhanh:1},
    {k:'glso', ten:'Số · KHTK', nhanh:0},
    {k:'glphieu', ten:'Người lĩnh · số tiền', nhanh:1},
    {k:'gltai', ten:'Tại Ngân hàng', nhanh:0},
    {k:'glnd', ten:'Nội dung', nhanh:0},
    {k:'glnh', ten:'Phần do ngân hàng ghi', nhanh:0},
    {k:'glkho', ten:'Khổ giấy', nhanh:1},
    {k:'glchim', ten:'Chữ chìm VBSP', nhanh:1}],
  bk: [   /* 3.193 (anh): khai báo riêng từ trên xuống — có chữ thì in, để trống = chấm ghi tay */
    {k:'bkloai', ten:'Loại bảng kê', nhanh:1},   /* 3.314 (anh): Chi (ngân hàng chi ra) / Thu (nộp vào ngân hàng) — cùng mẫu, khác chữ */
    {k:'bkcq', ten:'Tên cơ quan', nhanh:1},
    {k:'bkngay', ten:'Ngày', nhanh:1},
    {k:'bkten', ten:'Họ và tên', nhanh:1},
    {k:'bkdc', ten:'Địa chỉ', nhanh:1},
    {k:'bknd', ten:'Nội dung', nhanh:1},
    {k:'bkchim', ten:'Logo chìm', nhanh:1}]
};
function gdxNhanh(m, k){ var C = gdxC(), v = (C.nhanh||{})[m+'.'+k]; if(v!==undefined) return !!v; var x = (GDX_MUC[m]||[]).find(function(o){ return o.k===k; }); return !!(x && x.nhanh); }
function gdxDatNhanh(m, k, v){ var C = gdxC(); C.nhanh = C.nhanh || {}; C.nhanh[m+'.'+k] = !!v; gdxLuu(); gdxVeTrai(); }

/* ---------- ô điều khiển dùng chung ---------- */
function gdxChip(chu, bat, js, lop, tit){ return '<button class="gdx-c'+(bat ? ' bat' : '')+(lop ? ' '+lop : '')+'" onclick="'+js+'"'+(tit ? ' title="'+gdxE(tit)+'"' : '')+'>'+chu+'</button>'; }
function gdxJS(v){ return JSON.stringify(v).replace(/"/g, '&quot;'); }
function gdxRadio(k, ds){ var C = gdxC(); return '<span class="gdx-ra">'+ds.map(function(o){ return '<label><input type="radio" name="gdx-r-'+k+'"'+(C[k]===o[0] ? ' checked' : '')+' onchange="gdxDat(\''+k+'\', '+gdxJS(o[0])+', 1)"> '+o[1]+'</label>'; }).join('')+'</span>'; }
function gdxIn1(k, ph, kieu){ var C = gdxC(); return '<input class="gdx-i"'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+gdxE(C[k])+'" placeholder="'+gdxE(ph||'')+'" oninput="gdxDat(\''+k+'\', this.value)">'; }
function gdxCB(k, trong, bo){
  var C = gdxC(), v = C[k] || '';
  return '<select class="gdx-i" onchange="gdxDat(\''+k+'\', this.value, 1)"><option value="">— '+trong+' —</option>'+
    C.danhSachCanBo.filter(function(n){ return n===v || (bo||[]).indexOf(n)<0; }).map(function(n){ return '<option value="'+gdxE(n)+'"'+(n===v ? ' selected' : '')+'>'+gdxE(n)+'</option>'; }).join('')+'</select>';
}
/* 3.175 (anh chốt): ô ngày gõ nhanh không cần / hay - : "1410" = 14/10 năm nay · "141026" / "14102026" = 14/10/2026 (gõ 14/10/26 cũng được); 📅 chọn trên lịch */
function gdxDocNgay(s){   /* 3.187 (anh chốt): gõ liền số không cần dấu — 5 / 7 số (vd 2542021 = 25/04/2021, 252021 = 02/05/2021); năm 2 số quá năm nay + 10 → 19xx (ngày cấp cũ) */
  s = String(s||'').trim(); if(!s) return '';
  var h = nay(), p = s.split(/[\/\-.\s]+/).filter(Boolean), thu = [];
  if(p.length>1) thu.push([+p[0], +p[1], p[2] ? +p[2] : h.getFullYear()]);
  else { var x = s.replace(/\D/g, ''), n = x.length;
    var cat = function(a, b){ return [+x.slice(0, a), +x.slice(a, a+b), +x.slice(a+b)]; };
    if(n<=2) thu.push([+x, h.getMonth()+1, h.getFullYear()]);
    else if(n===3) thu.push([+x.slice(0, 1), +x.slice(1), h.getFullYear()]);
    else if(n===4) thu.push([+x.slice(0, 2), +x.slice(2), h.getFullYear()]);
    else if(n===5) thu.push(cat(1, 2), cat(2, 1));
    else if(n===6) thu.push(cat(2, 2), cat(1, 1));
    else if(n===7) thu.push(cat(1, 2), cat(2, 1));
    else if(n===8) thu.push(cat(2, 2));
    else return ''; }
  for(var i = 0; i < thu.length; i++){ var d = thu[i][0], m = thu[i][1], y = thu[i][2];
    if(y < 100){ y += 2000; if(y > h.getFullYear() + 10) y -= 100; }
    if(y < 1900 || y > 2100) continue;
    var t = new Date(y, m-1, d); if(m>=1 && m<=12 && t.getDate()===d && t.getMonth()===m-1) return ngayISO(t); }
  return '';
}
function gdxNgayChon(js, gt){
  var f = '(function(){'+js+'}).call({value:';
  return '<span class="gdx-ngay2"><input class="gdx-ngay" inputmode="numeric" autocomplete="off" placeholder="gõ 1410 · 141026" title="Gõ ngày liền số: 1410 = 14/10 năm nay · 141026 = 14/10/2026" value="'+gdxE(gt ? gdxDMY(gt) : '')+'" '+
    'onkeydown="if(event.key===\'Enter\'){event.preventDefault();this.blur();}" onchange="var v=gdxDocNgay(this.value);if(this.value.trim()&&!v){bao(\'Không hiểu ngày “\'+this.value+\'” — gõ vd 1410 hoặc 141026\');return;}'+f+'v})">'+
    '<input type="date" class="gdx-lich" value="'+gdxE(gt||'')+'" onchange="'+f+'this.value})" title="📅 chọn trên lịch"></span>';
}

/* ---------- vẽ 1 mục (khung chọn nhanh và ⚙ dùng chung; kb = đang ở ⚙ → có thêm phần quản lý) ---------- */
function gdxMucHTML(m, k, kb){
  var C = gdxC(), h = '';
  if(m==='m04'){
    if(k==='dau') h = '<div class="gdx-luoi">'+[['donViTren','Tên NH cấp trên'],['donViDuoi','Phòng giao dịch'],['diaDanh','Địa danh ("…, ngày")'],['tenPGDTrongVanBan','Tên PGD trong câu']].map(function(o){ return '<label><span>'+o[1]+'</span>'+gdxIn1(o[0])+'</label>'; }).join('')+'</div>';
    else if(k==='ngayky'){ var nk = gdxNgayKy04(C);
      h = gdxChip('Hôm nay', C.ky04Hom!==false, 'gdxDat(\'ky04Hom\', true, 1)')+gdxNgayChon('gdxC().ky04Hom=false;gdxDat(\'ngayThongBao\', this.value, 1)', C.ky04Hom===false ? C.ngayThongBao : '')+'<b class="gdx-hien">→ '+(nk ? gdxDMY(nk) : 'để chấm')+'</b>'; }
    else if(k==='kinhgui') h = gdxIn1('kinhGui', 'Ủy ban nhân dân …');
    else if(k==='gq') h = gdxRadio('isGQVL', [[false,'Thông báo thường (người)'],[true,'GQVL (người lao động)']]);
    else if(k==='mh'){
      h = '<div class="gdx-nhap"><label>Số hộ <input id="gdx-songuoi" class="gdx-i gdx-so" inputmode="numeric" value="'+gdxE(C.soNguoi)+'" oninput="gdxDat(\'soNguoi\', this.value.replace(/\\D/g, \'\'))" onkeydown="gdxPhimBuoc(event, \'soNguoi\', 1)"></label>'+gdxBuocNut('soNguoi', 1, '1 hộ')+
        '<label>Số tiền <input id="gdx-sotien" class="gdx-i gdx-tien" inputmode="numeric" value="'+gdxE(C.soTien)+'" oninput="this.value=gdxTien(this.value);gdxDat(\'soTien\', this.value)" onkeydown="gdxPhimBuoc(event, \'soTien\', 5000000);if(event.key===\'Enter\'){event.preventDefault();gdxIn();}"> đồng</label>'+gdxBuocNut('soTien', 5000000, '5 triệu')+'</div>'+
        '<div class="gdx-chu-tien" id="gdx-chu">'+gdxE(gdxDocTien(C.soTien) || '—')+'</div>'+
        '<div class="gdx-chips">'+C.mauHay.map(function(x, i){ var bat = +C.soNguoi===x.h && String(C.soTien).replace(/\D/g, '')===String(x.t);
          return '<span class="gdx-mh">'+gdxChip(gdxSoNguoi(x.h)+' hộ · '+gdxTien(x.t), bat, 'gdxMauHay('+i+')', '', 'Điền số hộ + số tiền')+(kb ? '<button class="gdx-x" onclick="gdxBoMauHay('+i+')" title="Bỏ">×</button>' : '')+'</span>'; }).join('')+
        gdxChip('⭐ lưu thành chip', false, 'gdxLuuMauHay()', 'khac', 'Lưu số hộ + số tiền đang nhập thành chip chọn nhanh')+'</div>'+
        ((C.quickAmounts||[]).length ? '<div class="gdx-chips gdx-phu"><span class="gdx-nho2">Mức tiền:</span>'+C.quickAmounts.map(function(a, i){ return '<span class="gdx-mh">'+gdxChip(gdxChipTien(a), false, 'gdxChonTien('+a+')')+(kb ? '<button class="gdx-x" onclick="gdxBoMuc('+i+')" title="Xóa">×</button>' : '')+'</span>'; }).join('')+'</div>' : '')+
        (kb ? '<div class="gdx-hang"><input id="gdx-mucmoi" class="gdx-i" placeholder="Thêm mức tiền (vd 60.000.000)" oninput="this.value=gdxTien(this.value)" onkeydown="if(event.key===\'Enter\'){event.preventDefault();gdxThemMucO();}"><button class="nho" onclick="gdxThemMucO()">+ Thêm mức</button></div>' : '');
    }
    else if(k==='gio') h = (C.noiGN==='pgd' ? 'Tại PGD: ' : 'Tại điểm GD: ')+'<input class="gdx-i gdx-ngan" value="'+gdxE(C.gioPhatTien)+'" placeholder="9 giờ 30 phút" oninput="gdxDat(\'gioPhatTien\', this.value)"><small class="gdx-ghi">Cố định, giống nhau các điểm — khai 1 lần.</small>';
    else if(k==='ngayphat'){ var md = gdxNgayPhatMD(C), np = gdxNgayPhat04(C);
      h = gdxChip((C.noiGN==='pgd' ? 'Ngày mai' : 'Ngày GD gần nhất')+': '+(md ? gdxDMY(md) : '—')+' ★', !C.ngayPhatTay, 'gdxDat(\'ngayPhatTay\', false, 1)')+
        gdxNgayChon('gdxC().ngayPhatISO=this.value;gdxDat(\'ngayPhatTay\', !!this.value, 1)', C.ngayPhatTay ? C.ngayPhatISO : '')+
        (C.ngayPhatTay ? gdxChip('↺ Mặc định', false, 'gdxDat(\'ngayPhatTay\', false, 1)') : '')+
        '<b class="gdx-hien">→ '+gdxE(C.gioPhatTien||'')+', '+(np ? gdxDMY(np) : 'để chấm')+'</b>'; }
    else if(k==='noi') h = '<span class="gdx-ra"><label><input type="radio" name="gdx-r-noi"'+(C.noiGN!=='pgd' ? ' checked' : '')+' onchange="gdxNoi(\'diem\')"> Tại điểm GD</label><label><input type="radio" name="gdx-r-noi"'+(C.noiGN==='pgd' ? ' checked' : '')+' onchange="gdxNoi(\'pgd\')"> Tại PGD</label></span>';
    else if(k==='diadiem') h = '<div class="gdx-luoi"><label><span>Dòng in (theo điểm đang chọn)</span>'+gdxIn1('diaDiemPhatTien')+'</label><label><span>Khi giải ngân tại PGD</span>'+gdxIn1('diaDiemPGD', 'Phòng giao dịch NHCSXH Gò Dầu')+'</label></div>';
    else if(k==='denghi') h = gdxIn1('tenUBNDVietTat', 'Ủy ban nhân dân … (ghi đầy đủ)');
    else if(k==='nguoilap') h = gdxCB('nguoiLap', 'để trống');
    else if(k==='ky') h = gdxRadio('kyPGD', [[false,'Giám đốc'],[true,'Phó Giám đốc (KT. Giám đốc)']])+
      (kb ? '<div class="gdx-luoi"><label><span>Chức danh Giám đốc</span>'+gdxIn1('chucDanhDuyet')+'</label><label><span>Phó GĐ ký thay (dấu | = xuống dòng)</span>'+gdxIn1('chucPGD')+'</label></div>' : '');
    else if(k==='gach2') h = gdxRadio('gach04', [['hien','Hiện'],['an','Ẩn']])+'<small class="gdx-ghi">Không có người chưa được vay → gạch tay mỗi dòng chấm; ẩn để ghi tay.</small>';
    else if(k==='soban') h = gdxRadio('soBan', [[2,'2 bản (1 lưu tổ, 1 lưu NH)'],[1,'1 bản']]);
  }
  else if(m==='m12'){
    var d = gdxDiem(C.m12SelectedDiem), nr = +C.m12NumRows || 12;
    if(k==='dau12') h = '<div class="gdx-luoi"><label><span>Dòng 1</span>'+gdxIn1('m12DonVi1')+'</label><label><span>Dòng 2</span>'+gdxIn1('m12DonVi2')+'</label></div>';
    else if(k==='ngaygd'){ var n3 = d ? gdxNgayToi(d.ngayGD, 1) : [];   /* 3.175 (anh chốt): chỉ ngày GD kế gần nhất + ô chọn ngày */
      h = n3.map(function(n, i){ return gdxChip(gdxDMY(n)+(i===0 ? ' ★' : ''), C.m12NgayGD===n, 'gdxDat(\'m12NgayGD\', \''+n+'\', 1)'); }).join('')+gdxNgayChon('gdxDat(\'m12NgayGD\', this.value, 1)', n3.indexOf(C.m12NgayGD)<0 ? C.m12NgayGD : '')+
        '<b class="gdx-hien">→ '+(C.m12NgayGD ? gdxDMY(C.m12NgayGD) : 'để chấm')+'</b>'; }
    else if(k==='ba') h = '<div class="gdx-ba">'+[['m12GDV','Giao dịch viên','chấm ghi tay'],['m12KSV','Kiểm soát viên / GDV','để trống'],['m12ToTruong','Tổ trưởng tổ GD','để trống']].map(function(r){
        var khac = ['m12GDV','m12KSV','m12ToTruong'].filter(function(x){ return x!==r[0]; }).map(function(x){ return C[x]; }).filter(Boolean);
        return '<label><span>'+r[1]+'</span>'+gdxCB(r[0], r[2], khac)+'</label>'; }).join('')+'</div><small class="gdx-ghi">Mỗi người 1 vai — đã chọn ở 1 ô thì không còn ở 2 ô kia.</small>';
    else if(k==='sodong') h = [{v:d && d.to.length ? d.to.length : 0, c:'Theo số tổ'+(d ? ' ('+d.to.length+')' : '')}].concat([10, 12, 15, 20, 36].map(function(r){ return {v:r, c:String(r)}; })).filter(function(o){ return o.v; })
        .map(function(o, i){ return gdxChip(o.c, nr===o.v && (i===0 || !(d && d.to.length===o.v)), 'gdxDat(\'m12NumRows\', '+o.v+', 1)'); }).join('')+'<input class="gdx-i gdx-so" type="number" min="5" max="45" value="'+nr+'" onchange="gdxDat(\'m12NumRows\', this.value, 1)"> dòng';
    else if(k==='tento') h = gdxRadio('m12TenToOption', [['blank','Để trống ghi tay'],['fill','In sẵn tên tổ trưởng']])+(C.m12TenToOption==='fill' && d && !d.to.length ? '<small class="gdx-ghi">Điểm này chưa có danh sách tổ.</small>' : '');
    else if(k==='hinhthuc') h = gdxIn1('m12HinhThucTieuHuy', 'cắt nhỏ');
    else if(k==='soluong') h = gdxIn1('m12SoLuongTieuHuy', 'để trống = chấm ghi tay');
    else if(k==='giohuy') h = gdxRadio('m12GioHuy', [['cham','Để chấm ghi tay'],['san','Ghi sẵn giờ khai báo']])+(kb || C.m12GioHuy==='san' ? '<label class="gdx-l1">Giờ ghi sẵn '+gdxIn1('m12PrefillGio', '11 giờ 30 phút')+'</label>' : '');
    else if(k==='ngayhuy') h = gdxRadio('m12NgayHuy', [['cham','Để chấm ghi tay'],['gd','= Ngày giao dịch']])+(C.m12NgayHuy==='gd' ? '<b class="gdx-hien">→ '+(C.m12NgayGD ? gdxDMY(C.m12NgayGD) : 'chưa có ngày GD')+'</b>' : '');
  }
  else if(m==='gl' || (m==='gn' && /^gl/.test(k))) h = gdxGLMuc(k, kb);
  else if(m==='gn') h = gdxGNMuc(k, kb);
  else if(m==='bk') h = gdxBKMuc(k);
  return h;
}
/* 3.175 (anh chốt): ▲▼ tăng / giảm — số hộ bước 1, số tiền bước 5 triệu (phím ↑ ↓ trong ô cũng được) */
function gdxBuocNut(k, b, chu){ return '<span class="gdx-buoc"><button onclick="gdxBuoc(\''+k+'\', '+b+')" title="Tăng '+chu+'">▲</button><button onclick="gdxBuoc(\''+k+'\', -'+b+')" title="Giảm '+chu+'">▼</button></span>'; }
function gdxBuoc(k, b){ var C = gdxC(), v = +String(C[k]||'').replace(/\D/g, '') || 0, min = k==='soNguoi' ? 1 : 0;
  var bb = Math.abs(b); v = v % bb ? (b > 0 ? Math.ceil(v/bb)*bb : Math.floor(v/bb)*bb) : v + b;   /* số lẻ → làm tròn tới bước kế tiếp theo chiều bấm */
  v = Math.max(min, v);
  C[k] = k==='soTien' ? gdxTien(v) : String(v); gdxLuu();
  var o = document.getElementById(k==='soTien' ? 'gdx-sotien' : 'gdx-songuoi'); if(o) o.value = C[k];
  gdxXem(); var t = document.getElementById('gdx-tom'); if(t) t.innerHTML = gdxTomHTML(); }
function gdxPhimBuoc(ev, k, b){ if(ev.key==='ArrowUp' || ev.key==='ArrowDown'){ ev.preventDefault(); gdxBuoc(k, ev.key==='ArrowUp' ? b : -b); } }
function gdxNoi(noi){ var C = gdxC(), S = gdxCH();
  if(noi==='pgd') gdxDat04('pgd', S.xa ? gdxTenXa(S.xa) : C.xa04, true); else gdxDat04('diem', S.diem || C.ma04, true);
  gdxVe(); }
function gdxTenXa(maXa){ var r = ''; KHO.maTo().some(function(m){ var t = KHO.to(m); if(t.xa===maXa && t.tenXa){ r = t.tenXa; return true; } return false; }); return r || maXa; }

/* ---------- theo khối lọc: điểm GD / xã đang chọn → điền mẫu ---------- */
function gdxTheoLoc(){
  var C = gdxC(), S = gdxCH(), d = S.diem ? gdxDiem(S.diem) : null;
  if(d){ if(C.noiGN!=='pgd' && C.ma04!==d.k) gdxDat04('diem', d.k, true); if(C.m12SelectedDiem!==d.k) gdxDat12Diem(d.k, true); }
  if(C.noiGN==='pgd' && S.xa){ var tx = gdxTenXa(S.xa); if(tx && tx!==C.xa04) gdxDat04('pgd', tx, true); }
  if((C.form==='gl' || C.form==='gn') && S.to!==GDX.glTo){ GDX.glTo = S.to; GDX.glKH = ''; GDX.glTien = ''; GDX.glSua = {}; }
  gdxVeTrai();
}
/* chọn điểm GD có ngày GD gần nhất (hôm nay trước) — mở mẫu cấp điểm chưa chọn điểm, hoặc mở Giấy lĩnh (anh chốt: ngày GD xã nào thì chọn điểm đó) */
function gdxChonDiemGan(){
  var g = gdxDiemGanNhat(); if(!g) return false;
  if(KHO.coKy()){ var S = gdxCH(); if(S.diem===g.d.k) return true; S.xa = g.d.maXa; S.diem = g.d.k; S.hoi = ''; S.to = ''; luu(); return true; }
  var C = gdxC(); gdxDat04('diem', g.d.k, true); gdxDat12Diem(g.d.k, true); return true;
}

/* ---------- vẽ tab ---------- */
function veGDX(){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = gdxC();
  if(typeof SL_SAN!=='undefined' && !SL_SAN && typeof slNap==='function'){ e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu…</div>'; slNap().then(veGDX); return; }
  var dsKy = typeof toDsKy==='function' ? toDsKy() : [];
  if(!dsKy.length){ gdxKhung(null); return; }   /* chưa có số liệu → vẫn in được (điểm theo Cài đặt › Địa bàn) */
  var S = gdxCH(); toKyMacDinh(S, dsKy, 'gdx');
  if(TO_K && TO_K.ky===S.ky){ gdxKhung(TO_K); return; }
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(S.ky)+'…</div>';
  toNap(S.ky).then(function(K){ TO_K = K; if(nganHienTai===7 && D.cauHinh.slTab==='gdx') gdxKhung(K); })
    .catch(function(){ gdxKhung(null); });
}
function gdxKhung(K){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = gdxC(), M = gdxMauHT();
  e.innerHTML = slTabConHTML()+(K ? kyGhiHTML(K)+'<div id="gdx-cay" class="to-cay pv-cay gdx-cap-'+M.cap+'"></div>' : '')+
    '<div class="gdx2-bo'+(C.xem===false ? ' an-xem' : '')+'" id="gdx-bo"><div class="gdx2-trai" id="gdx-trai"></div>'+
    '<div class="gdx2-xem"><div class="gdx-thanh" id="gdx-thanh"></div><iframe id="gdx-khung" class="to-khung th-khung" title="Xem trước"></iframe></div></div>';
  if(K){ var S = gdxCH(); if(!S.diem && M.cap==='diem') gdxChonDiemGan(); pvVeCay('gdx'); }
  else { var C2 = gdxC(); if(!gdxDiem(C2.ma04) && !gdxDiem(C2.m12SelectedDiem)) gdxChonDiemGan(); gdxVeTrai(); }
  setTimeout(gdxVuaKhung, 0);
  var bo = document.getElementById('gdx-bo'); if(bo) bo.addEventListener('mousedown', gdxGonLoc, true);
}
/* 3.181 (anh chốt): bấm vào vùng nhập → khối lọc gom gọn lại (chỉ đổi lớp, không vẽ lại để không mất ô đang bấm) */
function gdxGonLoc(){ if(PV_MO.gdx!=='xd') return; PV_MO.gdx = ''; var k = document.querySelector('#gdx-cay .loc-khoi'); if(k && (gdxCH().diem || gdxCH().to)){ k.classList.add('gon'); var b = k.querySelector('.pv-gon'); if(b) b.textContent = '▾ Đổi'; } setTimeout(gdxVuaKhung, 0); }
function gdxVuaKhung(){ var f = document.getElementById('gdx-khung'); if(!f || !f.offsetParent) return; f.style.height = Math.max(360, window.innerHeight - f.getBoundingClientRect().top - 22)+'px'; gdxXem(); }
window.addEventListener('resize', function(){ if(document.getElementById('gdx-khung')){ clearTimeout(window.__gdxVua); window.__gdxVua = setTimeout(gdxVuaKhung, 150); } });
function gdxHopMo(id){ var h = document.getElementById('hop'); return !!(document.getElementById(id) && h && h.classList.contains('hien')); }   /* 3.175: hộp đã đóng vẫn còn trong trang → chỉ vẽ lại khi đang hiện */
function gdxVe(){ gdxVeTrai(); if(gdxHopMo('gdx-kbr')) gdxKBRieng(); }
function gdxVeTrai(){
  var e = document.getElementById('gdx-trai'); if(!e) return;
  var C = gdxC(), M = gdxMauHT(), cay = document.getElementById('gdx-cay');
  if(cay) cay.className = 'to-cay pv-cay gdx-cap-'+M.cap;
  var cuon = e.querySelector('.gdx2-ruot'), y = cuon ? cuon.scrollTop : 0;
  e.innerHTML = gdxDauHTML()+'<div class="gdx2-ruot">'+gdxRuotHTML()+'</div><div class="gdx2-tom" id="gdx-tom">'+gdxTomHTML()+'</div>';
  var c2 = e.querySelector('.gdx2-ruot'); if(c2) c2.scrollTop = y;
  var t = document.getElementById('gdx-thanh'); if(t) t.innerHTML = gdxThanhHTML();
  gdxXem();
}
/* 3.181 (anh chốt: "các nút quá nhiều che hết khung nhập"): đầu khung 1 hàng — chip mẫu · 👁 · ⋯ (khai báo riêng / chung, nhật ký in, mini app) */
function gdxMenu(ds, lop){ return '<details class="gdx-menu'+(lop ? ' '+lop : '')+'"><summary class="nho" title="Thêm">'+(ds.nhan || '⋯')+'</summary><div>'+ds.map(function(x){ return '<button class="nho" onclick="this.closest(\'details\').open=false;'+x[1]+'"'+(x[2] ? ' title="'+gdxE(x[2])+'"' : '')+'>'+x[0]+'</button>'; }).join('')+'</div></details>'; }
function gdxDauHTML(){
  var C = gdxC(), M = gdxMauHT(), ds = [['⚙ Khai báo riêng mẫu', 'gdxKBRieng()', 'Mọi mục của mẫu — tích Chọn nhanh để đưa ra khung'], ['⚙ Khai báo đơn vị', 'gdxKBChung()', 'Danh sách cán bộ · danh mục tham chiếu · TK 104'],
    ['📜 Nhật ký in', 'gdxNKMo()', 'Các lần in trong 1 tháng — in lại khi khách ký sai'], ['📦 Mini app', 'gdxMiniHop()', 'Xuất 1 file HTML gọn gửi đồng nghiệp — có thời hạn 30 / 60 / 90 ngày']];
  return '<div class="gdx2-dau"><div class="gdx2-mau">'+GDX_MAU.map(function(m){ return gdxChip(m.bt+' '+m.ma, m.k===M.k, 'gdxDoiMau(\''+m.k+'\')', '', m.nhom+' — '+m.ten); }).join('')+'</div>'+
    '<div class="gdx2-nut">'+(M.k==='gl' || M.k==='gn' ? '<button class="nho'+(GDX.glDaIn ? ' gdx-moi' : '')+'" onclick="gdxGLMoi()" title="'+(GDX.glDaIn ? 'Phiếu mới — in người khác: bỏ người lĩnh, tổ, số tiền; giữ ngày, khổ giấy, loại TK' : 'Phiếu mới: xóa các ô để chọn / gõ người khác (giữ ngày, khổ giấy, loại TK)')+'">↺ Phiếu mới</button>' : '')+'<button class="nho'+(C.xem!==false ? ' chinh' : '')+'" onclick="gdxBatXem()" title="Bật / tắt khung xem trước">👁 Xem: '+(C.xem!==false ? 'Bật' : 'Tắt')+'</button>'+gdxMenu(ds)+'</div></div>';
}
function gdxRuotHTML(){
  var C = gdxC(), M = gdxMauHT(), S = gdxCH(), canh = '';
  if(M.cap==='diem' && !(C.noiGN==='pgd' && M.k==='m04')){ var d = gdxDiem(M.k==='m12' ? C.m12SelectedDiem : C.ma04);
    canh = d ? '<div class="gdx2-diem">📍 <b>'+gdxE(d.tenDiem)+'</b>'+(d.maDiem ? ' · mã '+gdxE(d.maDiem) : '')+' · '+gdxE(d.tenXa)+(d.ngayGD ? ' · GD ngày '+gdxE(d.ngayGD)+' hằng tháng' : ' · <span class="gdx-vang">chưa có ngày GD</span>')+'</div>'
      : '<div class="sl-bao vang">Chọn <b>Điểm GD</b>'+(KHO.coKy() ? ' ở khối LỌC ĐỊA BÀN' : '')+'.</div>';
    if(!KHO.coKy()) canh += '<label class="gdx-l1">Điểm GD <select class="gdx-i" onchange="gdxChonDiemTay(this.value)"><option value="">— chọn —</option>'+gdxDsDiem().map(function(x){ var cur = M.k==='m12' ? C.m12SelectedDiem : C.ma04; return '<option value="'+gdxE(x.k)+'"'+(x.k===cur ? ' selected' : '')+'>'+gdxE(x.tenDiem+' · '+x.tenXa)+'</option>'; }).join('')+'</select></label>';
  }
  if(M.k==='m04' && C.noiGN==='pgd' && !KHO.coKy()) canh += '<label class="gdx-l1">Xã / phường (kính gửi) <select class="gdx-i" onchange="gdxDat04(\'pgd\', this.value, true);gdxVe()"><option value="">— chọn —</option>'+gdxDsXa().map(function(x){ return '<option'+(x===C.xa04 ? ' selected' : '')+'>'+gdxE(x)+'</option>'; }).join('')+'</select></label>';
  if(!gdxDsDiem().length) canh += '<div class="sl-bao vang">Chưa có điểm giao dịch — nạp Mẫu 31 (📥 Nạp &amp; KT) hoặc khai ở <a class="lk" onclick="moCaiDat(\'diaban\')">Cài đặt › Địa bàn</a>. Vẫn in được, ô điểm để trống.</div>';
  var ds = GDX_MUC[M.k].filter(function(o){ return gdxNhanh(M.k, o.k); });
  return canh+
    (ds.length ? ds.map(function(o){ return '<div class="gdx2-hang" id="gdx-m-'+o.k+'"><div class="gdx2-nh">'+gdxE(o.ten)+'</div><div class="gdx2-gt">'+gdxMucHTML(M.k, o.k)+'</div></div>'; }).join('')
      : '<div class="sl-phu">Mọi mục đang để trong ⚙ — mẫu in theo khai báo.</div>');
}
function gdxChonDiemTay(k){ gdxDat04('diem', k, true); gdxDat12Diem(k, true); gdxVe(); }
function gdxBatXem(){ var C = gdxC(); C.xem = C.xem===false; gdxLuu(); var b = document.getElementById('gdx-bo'); if(b) b.classList.toggle('an-xem', C.xem===false); gdxVeTrai(); setTimeout(gdxVuaKhung, 0); }
function gdxDoiMau(f){
  var C = gdxC(); C.form = f; gdxLuu();
  var M = gdxMauHT(), cay = document.getElementById('gdx-cay');
  if(f==='gl' || f==='gn'){ gdxChonDiemGan(); var S = gdxCH(); GDX.glTo = S.to; GDX.glKH = ''; GDX.glTien = ''; if(!C.glNgayCach) C.glNgayCach = 'hom'; }
  else if(f!=='bk' && !(KHO.coKy() ? gdxCH().diem : (gdxDiem(C.ma04) || gdxDiem(C.m12SelectedDiem)))) gdxChonDiemGan();
  if(cay){ cay.className = 'to-cay pv-cay gdx-cap-'+M.cap; pvVeCay('gdx'); } else gdxVeTrai();
}
/* khung xem: zoom 0 = vừa bề ngang khung (chỉ khung xem; khi in luôn 100%) */
function gdxXem(){
  var f = document.getElementById('gdx-khung'); if(!f || !f.offsetParent) return;
  var d = f.contentDocument; if(!d) return;
  var X = gdxChup(), B = gdxDung(X);
  d.open(); d.write(gdxTrang(B.than, B.css)); d.close();
  var rong = X.mau==='bk' || X.bk ? 1165 : X.mau==='gl' || X.mau==='gn' ? 840 : 800, z = GDX.zoom || Math.min(1, Math.max(0.3, (f.clientWidth - 52) / rong));
  Array.prototype.forEach.call(d.querySelectorAll('.sheet-a4,.sheet-gl,.sheet-bk'), function(s){ s.style.zoom = z; });
  var b = document.getElementById('gdx-zoom'); if(b) b.textContent = Math.round(z*100)+'%';
  var c = document.getElementById('gdx-chu'); if(c) c.textContent = gdxDocTien(gdxC().soTien) || '—';
}
function gdxZoom(k){ var f = document.getElementById('gdx-khung'), z0 = GDX.zoom || Math.min(1, Math.max(0.3, ((f ? f.clientWidth : 800) - 52) / 800));
  GDX.zoom = k===0 ? 1 : Math.round(Math.min(1.4, Math.max(0.3, z0 + k*0.1))*10)/10; gdxXem(); }
function gdxThanhHTML(){
  var M = gdxMauHT(), C = gdxC();
  var nhan = M.k==='m04' ? '04/TD · A4 dọc · '+(+C.soBan===1 ? '1 bản' : '2 bản (1 lưu tổ, 1 lưu NH)') : M.k==='m12' ? '12/GDX · A4 dọc · trọn 1 trang' : M.k==='bk' ? '🧾 Bảng kê '+(C.bkLoai==='thu' ? 'thu (nộp vào)' : 'chi (chi ra)')+' · A4 ngang · 2 tờ 118 × 210 sát 2 mép (cắt theo nét đứt)' : M.k==='gn' ? (C.gnIn==='bk' ? '🧾 Bảng kê nộp · A4 ngang · 1 tờ' : C.gnIn==='kh' ? '🏦+🧾 Giấy nộp + Bảng kê nộp · 1 tờ A4 dọc' : '🏦 Giấy nộp · '+(C.gnKho==='a4' ? 'A4 dọc · nửa trên' : 'A5 ngang')) : C.glIn==='bk' ? '🧾 Bảng kê · A4 ngang, 1 tờ 118 × 210 sát mép trái (tự chia mệnh giá)' : C.glIn==='kh' ? '💵+🧾 Giấy lĩnh + Bảng kê · 1 tờ A4 dọc (tự chia mệnh giá)' : 'Giấy lĩnh · '+(C.glKho==='a4' ? 'A4 dọc, in nửa trên' : 'A5 ngang');
  return '<span class="gdx-nhan">'+nhan+'</span><span class="gdx-zoom"><button class="nho" onclick="gdxZoom(-1)" title="Thu nhỏ khung xem">🔍−</button><button class="nho" id="gdx-zoom" onclick="gdxZoom(0)" title="Về 100%">100%</button><button class="nho" onclick="gdxZoom(1)" title="Phóng to khung xem">🔍+</button></span>';
}
function gdxDat(k, v, ve){ var C = gdxC(); C[k] = v;
  if(k==='diaDiemPGD' && C.noiGN==='pgd') C.diaDiemPhatTien = v;
  if(k==='gioPhatTien'){ if(C.noiGN==='pgd') C.gioPGD = v; else C.gioDiem = v; }
  gdxLuu(); if(ve) gdxVe(); else { gdxXem(); var t = document.getElementById('gdx-tom'); if(t) t.innerHTML = gdxTomHTML(); } }
function gdxToi(k){
  var e = document.getElementById('gdx-m-'+k);
  if(e){ e.scrollIntoView({block:'center', behavior:'smooth'}); e.classList.add('nhay'); setTimeout(function(){ e.classList.remove('nhay'); }, 1200); return; }
  gdxKBRieng(k);
}

/* ---------- 📋 Tóm tắt bản in: chip + cảnh báo (không chặn — hỏi 1 lần) + nút in ---------- */
function gdxTom(){
  var C = gdxC(), X = gdxChup(), c = X.C, ra = {chip:[], canh:[]}, lk = function(k, chu, lop){ ra.chip.push({k:k, chu:chu, lop:lop||''}); }, cb = function(muc, chu, k){ ra.canh.push({muc:muc, chu:chu, k:k}); };
  var hom = gdxHom();
  if(X.mau==='m04'){ var d = gdxDiem(C.ma04), np = c.ngayPhatISO, tien = String(C.soTien||'').replace(/\D/g, '');
    lk('noi', C.noiGN==='pgd' ? 'Tại PGD'+(C.xa04 ? ' · '+C.xa04 : '') : (d ? 'Điểm '+d.tenDiem : 'chưa chọn điểm'), (C.noiGN!=='pgd' && !d) || (C.noiGN==='pgd' && !C.xa04) ? 'do' : '');
    lk('mh', gdxSoNguoi(C.soNguoi)+' '+(C.isGQVL ? 'người lao động' : 'hộ')+' · '+(tien ? gdxTien(tien)+' đ' : 'chưa có số tiền'), tien ? '' : 'do');
    lk('ngayphat', 'phát '+(c.gioPhatTien||'…')+', '+(np ? gdxDMY(np) : '…')+(C.ngayPhatTay ? ' (chọn tay)' : ''));
    lk('ngayky', 'ký '+(c.ngayThongBao ? gdxDMY(c.ngayThongBao) : '…')+(C.ky04Hom!==false ? ' (hôm nay)' : ''));
    lk('nguoilap', C.nguoiLap ? 'Lập: '+C.nguoiLap : 'Người lập: để trống', C.nguoiLap ? '' : 'vang');
    lk('ky', C.kyPGD ? 'PGĐ ký (KT. GĐ)' : 'GĐ ký'); if(C.isGQVL) lk('gq', 'GQVL');
    lk('soban', +C.soBan===1 ? '1 bản' : '2 bản');
    if(C.noiGN!=='pgd' && !d) cb('do', 'Chưa chọn điểm giao dịch.', 'noi');
    if(C.noiGN==='pgd' && !C.xa04) cb('do', 'Chưa chọn xã / phường (kính gửi).', 'noi');
    if(!tien) cb('do', 'Chưa nhập số tiền.', 'mh');
    if(!np) cb('vang', 'Chưa có ngày phát tiền'+(d && !d.ngayGD ? ' (điểm chưa có ngày GD)' : '')+' — để chấm ghi tay.', 'ngayphat');
    else if(np < hom) cb('do', 'Ngày phát tiền '+gdxDMY(np)+' đã qua.', 'ngayphat');
    if(c.ngayThongBao && np && c.ngayThongBao > np) cb('vang', 'Ngày ký sau ngày phát tiền.', 'ngayky');
  }
  else if(X.mau==='m12'){ var d2 = X.d, nr = +C.m12NumRows || 12;
    lk('diem', d2 ? 'Điểm '+d2.tenDiem : 'chưa chọn điểm', d2 ? '' : 'do');
    lk('ngaygd', C.m12NgayGD ? 'ngày GD '+gdxDMY(C.m12NgayGD) : 'ngày GD: chấm', C.m12NgayGD ? '' : 'vang');
    lk('ba', 'GDV: '+(C.m12GDV || 'chấm'), C.m12GDV ? '' : 'vang'); lk('ba', 'KSV: '+(C.m12KSV || 'trống'), C.m12KSV ? '' : 'vang'); lk('ba', 'TT tổ GD: '+(C.m12ToTruong || 'trống'), C.m12ToTruong ? '' : 'vang');
    lk('sodong', nr+' dòng'); lk('tento', C.m12TenToOption==='fill' ? 'in sẵn tên tổ trưởng' : 'tên tổ trưởng: ghi tay');
    lk('giohuy', C.m12GioHuy==='san' ? 'giờ hủy '+(C.m12PrefillGio||'11 giờ 30 phút') : 'giờ hủy: chấm'); lk('ngayhuy', C.m12NgayHuy==='gd' ? 'ngày hủy = ngày GD' : 'ngày hủy: chấm');
    if(!d2) cb('do', 'Chưa chọn điểm giao dịch.', 'diem');
    if(C.m12TenToOption==='fill' && d2 && d2.to.length > nr) cb('vang', 'Điểm có '+d2.to.length+' tổ, bảng chỉ '+nr+' dòng — thiếu '+(d2.to.length-nr)+' tổ.', 'sodong');
    if(C.m12NgayGD && C.m12NgayGD < hom) cb('vang', 'Ngày giao dịch '+gdxDMY(C.m12NgayGD)+' đã qua.', 'ngaygd');
  }
  else if(X.mau==='gn') gdxGNTom(X, lk, cb);   /* 3.312 */
  else if(X.mau==='bk'){
    lk('bkcq', 'PGD '+(c.bkPGD ? c.bkPGD.toUpperCase() : '…'), c.bkPGD ? '' : 'vang'); lk('bkngay', c.bkNgay==='hom' ? 'ngày '+gdxDMY(hom) : 'ngày: chấm');
    lk('bkloai', c.bkLoai==='thu' ? '💰 Thu (nộp vào)' : '💸 Chi (chi ra)'); lk('bkten', c.bkTen ? c.bkTen : (c.bkLoai==='thu' ? 'người nộp: chấm' : 'người lĩnh: chấm')); lk('bkchim', 'logo '+({tat:'tắt', nhat:'nhạt', vua:'vừa', dam:'đậm'}[c.bkChim||'nhat'])+'');
  }
  else { var g = X.gl || {};
    lk('glphieu', C.glLoai==='104' ? 'TK 104 tổ trưởng' : 'TK 105 khách');
    lk('glphieu', g.ten || 'chưa chọn người lĩnh', g.ten ? '' : 'do');
    lk('glphieu', 'TK '+(g.tk || 'chấm'), g.tk ? '' : 'vang');
    lk('glphieu', g.tien ? gdxTien(g.tien)+' đ' : 'số tiền: chấm', g.tien ? '' : 'vang');
    lk('glngay', g.ngay ? 'ngày '+gdxDMY(g.ngay) : 'ngày: chấm'); lk('glkho', C.glKho==='a4' ? 'A4 nửa trang' : 'A5');
    if(!g.ten) cb('do', 'Chưa chọn người lĩnh — tìm tên hoặc chọn tổ ở khối LỌC ĐỊA BÀN.', 'glphieu');
    if(g.ncap && gdxNoiCapCu(g.ncap) && !(GDX.glSua && GDX.glSua.noiCap!==undefined)) cb('vang', 'Ngày cấp trước 10/10/2018 (thẻ đợt đầu) — nơi cấp ghi chung "Cục Cảnh sát", kiểm lại trên thẻ (bấm chữ Nơi cấp để sửa).', 'glphieu');
    if(g.ten && !g.tk) cb('vang', 'Chưa có số tài khoản'+(C.glLoai==='104' ? ' 104 ('+(g.tkLy || 'chưa xác định được tổ trưởng')+')' : ' 105'+(g.tkLy ? ' ('+g.tkLy+')' : ''))+' — để chấm.', 'glphieu');
    if(g.ten && !g.cccd && !g.ccLy) cb('vang', 'Chưa có số CCCD — để chấm.', 'glphieu');
    if(g.ten && !g.cccd && g.ccLy) cb('vang', 'Chưa có CCCD '+(C.glLoai==='104' ? 'tổ trưởng' : 'khách')+' — '+g.ccLy+'.', 'glphieu');
    if(g.han && (g.han.kq==='het' || g.han.kq==='sap') && !(GDX.glSua && GDX.glSua.cccd!==undefined)) cb(g.han.kq==='het' ? 'do' : 'vang', 'CCCD '+g.han.chu+' — kiểm lại thẻ trước khi chi.', 'glphieu');   /* 3.202 (QT-13): CCCD hết / sắp hết hạn */
    if(g.tkTrung) cb('vang', (C.glLoai==='104' ? 'Tổ trưởng' : 'Khách')+' có '+g.tkDs.length+' TK '+(C.glLoai==='104' ? '104' : '105')+' — chọn TK đang dùng (ô TK ở form), báo đóng TK thừa.', 'glphieu');
    if(g.tien && g.du!=null && +g.tien > g.du) cb('do', 'Số tiền rút '+gdxTien(g.tien)+' lớn hơn số dư 105 ('+gdxTien(g.du)+' — số liệu '+(KHO.coKy() ? slKyChu(KHO.ky().ky) : '')+').', 'glphieu');
  }
  return ra;
}
/* 3.180 (anh chốt): Tóm tắt thu gọn 1 dòng — chip (cuộn ngang) · cảnh báo đầu tiên (rê chuột xem hết, bấm → tới mục) · nút in; chừa chỗ nhập rộng ra */
function gdxTomHTML(){   /* 3.245 (anh 18/10): bỏ dòng chip tóm tắt 📋 — còn cảnh báo + nút In (chip vẫn ghi vào 📜 nhật ký in) */
  var T = gdxTom(), C = gdxC(), X = {mau:gdxMauHT().k}, so = X.mau==='m04' && +gdxC().soBan!==1 ? 2 : 1;
  var c0 = T.canh[0], coDo = T.canh.some(function(x){ return x.muc==='do'; });
  var canh = c0 ? '<span class="gdx2-canh1 '+(coDo ? 'do' : 'vang')+'" onclick="gdxToi(\''+c0.k+'\')" title="'+gdxE(T.canh.map(function(x){ return (x.muc==='do' ? '⛔ ' : '⚠ ')+x.chu; }).join('\n'))+'">'+(coDo ? '⛔ ' : '⚠ ')+gdxE(c0.chu)+(T.canh.length>1 ? ' <b>+'+(T.canh.length-1)+'</b>' : '')+'</span>' : '';
  return canh+
    '<div class="gdx2-in">'+(X.mau==='gn' ? gdxGNNutIn() : '')+(X.mau==='gl' ? '<span class="gdx-seg">'+gdxChip('💵 Lĩnh', C.glIn!=='bk' && C.glIn!=='kh', 'gdxDat(\'glIn\', \'gl\', 1)', '', 'Chỉ in Giấy lĩnh (khổ theo ⚙ Giấy lĩnh)')+gdxChip('🧾 Bảng kê', C.glIn==='bk', 'gdxDat(\'glIn\', \'bk\', 1)', '', 'Chỉ in Bảng kê — A4 ngang, 1 tờ sát mép trái, tự chia mệnh giá')+gdxChip('💵+🧾', C.glIn==='kh', 'gdxDat(\'glIn\', \'kh\', 1)', '', 'Giấy lĩnh + Bảng kê chung 1 tờ A4 dọc — cùng số tiền')+'</span>'+gdxMenu((function(d){ d.nhan = '📄 Mẫu trắng'; return d; })([['💵 Giấy lĩnh · 1 mẫu / A4 (nửa trên)', 'gdxGLTrangIn(1)', 'Giấy lĩnh trắng đúng form'], ['💵 Giấy lĩnh · 2 mẫu / A4 (cắt đôi)', 'gdxGLTrangIn(2)', 'Cắt đôi theo vạch giữa'], ['🧾 Bảng kê · 2 tờ / A4 ngang', 'gdxBKTrangIn()', 'Theo khai báo tab 🧾 Bảng kê'], ['💵+🧾 Kết hợp · 1 tờ A4 dọc', 'gdxGLTrangIn(3)', 'Giấy lĩnh nửa trên + Bảng kê dưới — giấy trắng']]), 'len') : '')+'<button class="nho" onclick="gdxPDF()">PDF</button><button class="nho chinh gdx-in" onclick="gdxIn()">🖨 IN '+so+' bản</button></div>';
}
function gdxKhoaIn(X){ return JSON.stringify([X.mau, X.C, X.d ? X.d.k : '', X.gl ? [X.gl.kh, X.gl.tien] : '', !!X.bk, !!X.kh]); }
function gdxIn(pdf){
  var X = gdxChup(), T = gdxTom(), k = gdxKhoaIn(X);
  if(T.canh.length && GDX.daHoi!==k){
    return hoi('In khi còn cảnh báo?', T.canh.map(function(x){ return (x.muc==='do' ? '⛔ ' : '⚠ ')+x.chu; }).join('\n'), pdf ? 'Vẫn lưu PDF' : 'Vẫn in', function(){ GDX.daHoi = k; gdxIn(pdf); });
  }
  gdxInBan(X, pdf); gdxNKThem(X);
  if(X.mau==='gl' || X.mau==='gn'){ GDX.glDaIn = true; gdxVeTrai(); setTimeout(function(){ var e = document.getElementById('gdx-gl-q'); if(e) e.focus(); }, 300); }   /* 3.206: in xong → con trỏ về ô tìm người kế */
}
function gdxPDF(){ gdxIn(true); }
/* 3.175 (anh chốt): in Giấy lĩnh TRẮNG đúng form — 1 mẫu / A4 (nửa trên) hoặc 2 mẫu / A4 cắt đôi (mỗi nửa đúng 148,5 mm, vạch cắt mờ ở giữa) */
function gdxGLTrangIn(n){ var c = JSON.parse(JSON.stringify(gdxC())); c.glKho = n===3 ? 'a4bk' : n===2 ? 'a4x2' : 'a4'; c.glTrang = true; gdxInBan({mau:'gl', C:c, gl:{}}); }
function gdxTenFile(X){ var c = X.C, d = X.mau==='m12' ? X.d : gdxDiem(c.ma04);
  return X.mau==='gn' ? (X.bk ? 'BangKeNop_' : X.kh ? 'GiayNop_BangKe_' : 'GiayNop_')+boDauTen((X.gl && X.gl.ten) || '').replace(/ /g, '')+'_'+(X.gl && X.gl.ngay || gdxHom()) : X.mau==='bk' ? (X.C && X.C.bkLoai==='thu' ? 'BangKeThu_trang_' : 'BangKe_trang_')+gdxHom() : X.mau==='gl' ? (X.bk ? 'BangKe_' : X.kh ? 'GiayLinh_BangKe_' : 'GiayLinh_')+boDauTen((X.gl && X.gl.ten) || '').replace(/ /g, '')+'_'+(X.gl && X.gl.ngay || gdxHom())
    : (X.mau==='m12' ? 'Mau12GDX_' : 'Mau04TD_')+boDauTen(d ? d.tenDiem : (c.xa04 || '')).replace(/ /g, '')+'_'+(X.mau==='m12' ? c.m12NgayGD : c.ngayPhatISO || gdxHom()); }
function gdxInBan(X, pdf){
  var B = gdxDung(X), h = gdxTrang(B.than, B.css);
  if(pdf) return inPDF(h, gdxTenFile(X));
  var f = document.getElementById('gdx-in-tam'); if(f) f.remove();
  f = document.createElement('iframe'); f.id = 'gdx-in-tam'; f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
  document.body.appendChild(f);
  var d = f.contentDocument; d.open(); d.write(h); d.close();
  setTimeout(function(){ try{ f.contentWindow.focus(); f.contentWindow.print(); }catch(er){ baoLoi('Không in được: '+er.message); } }, 200);
}

/* ---------- ⚙ Khai báo riêng mẫu: MỌI mục, theo thứ tự trên mẫu; tích "Chọn nhanh" → ra khung trái ---------- */
function gdxKBRieng(sang){
  var M = gdxMauHT();
  moHop('<div class="hop-tit" id="gdx-kbr">⚙ Khai báo riêng — '+M.bt+' '+gdxE(gdxTenMau(M))+'</div><div class="hop-phu">Các mục xếp theo thứ tự trên mẫu (trên → dưới, trái → phải). Tích <b>Chọn nhanh</b> để đưa mục ra khung bên trái; bỏ tích thì mục nằm ở đây, dùng giá trị khai báo. Tự lưu, đồng bộ Drive cùng cài đặt.</div>'+
    '<div class="gdx-kbr">'+GDX_MUC[M.k].map(function(o){ var n = gdxNhanh(M.k, o.k);
      return (o.nhom ? '<div class="gdx-kbr-nhom">'+gdxE(o.nhom)+'</div>' : '')+'<div class="gdx-kbr-dong'+(o.k===sang ? ' nhay' : '')+'" id="gdx-kbr-'+o.k+'"><div class="gdx-kbr-ten">'+gdxE(o.ten)+'</div><div class="gdx-kbr-gt">'+gdxMucHTML(M.k, o.k, true)+'</div>'+
        '<label class="gdx-kbr-nhanh"><input type="checkbox"'+(n ? ' checked' : '')+' onchange="gdxDatNhanh(\''+M.k+'\', \''+o.k+'\', this.checked)"> Chọn nhanh</label></div>'; }).join('')+'</div>'+
    (M.k==='m04' ? '<div class="hang-nut"><button class="nho" onclick="gdxMacDinh()">↺ Khôi phục thông tin mẫu ban đầu</button></div>' : '')+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop();gdxVeTrai()">Xong</button></div>', true);
  if(sang) setTimeout(function(){ var e = document.getElementById('gdx-kbr-'+sang); if(e) e.scrollIntoView({block:'center'}); }, 50);
}

/* ==========================================================
   3.174: 💵 GIẤY LĨNH TIỀN MẶT (anh chốt 12/10) — khách rút TK 105 hoặc tổ trưởng rút TK 104; số liệu theo kỳ / ngày số liệu đang chọn.
   Giấy trắng in cả khung mẫu (bản in đè giấy in sẵn làm sau, cần bản scan thẳng 100 %). Khổ A5 ngang hoặc A4 dọc in nửa trên.
   Dòng có thông tin thì bỏ chấm; dòng không có thì giữ chấm để giữ form (anh chốt). Nội dung mặc định "Rút tiền".
   Tìm nhanh: gõ tên tổ trưởng / khách không dấu; hoặc chọn ở khối LỌC ĐỊA BÀN. Mở mẫu → tự chọn điểm GD có ngày GD gần nhất (hôm nay trước).
   ========================================================== */
function gdxGLTo(){ var S = gdxCH(); var t = KHO.to(S.to); return t && !t.trucTiep ? t : null; }
function gdxGLDsKhach(t){ return t ? KHO.toVien(t) : []; }   /* 3.216: qua cửa KHO */
function gdxGLNgay(){
  var C = gdxC(), cach = C.glNgayCach || 'hom';
  if(cach==='cham') return ''; if(cach==='tay') return C.glNgayTay || ''; return gdxHom();
}
function gdxGLDuLieu(){
  var C = gdxC(), t = gdxGLTo(), r = {ten:'', kh:'', diaChi:'', cccd:'', ncap:'', noiCap:'', tk:'', tkTu:'', du:null, tien:'', ngay:gdxGLNgay(), to:t ? t.ma : ''};
  if(t){
    if(C.glLoai==='104'){   /* 3.202: đọc BẢNG TỔ DỰNG SẴN (tổ trưởng = Mã CIF TT, TK 104 Sao kê, CCCD đủ nguồn) */
      var b4 = KHO.bangTo(t.ma) || {};   /* 3.216: qua cửa KHO */
      r.ten = t.ten || ''; r.kh = b4.kh || ''; r.tk = b4.tk || ''; r.tkTu = b4.tkTu || ''; r.tkLy = b4.tkLy || ''; r.tkDs = b4.tkDs || []; r.tkTrung = !!b4.tkTrung && !b4.tkDaChon;
      r.cccd = b4.cccd || ''; r.ncap = b4.ncap || ''; r.ccTu = b4.ccTu || ''; r.ccLy = b4.ccLy || ''; r.han = b4.han || null;
    } else {
      var x = gdxGLDsKhach(t).find(function(o){ return o.kh===GDX.glKH; }) || null;
      if(x){ r.ten = x.ten; r.kh = x.kh; r.du = x.t105 || 0; r.coTK = !!x.coTK;
        var x5 = KHO.tk105(x.kh);   /* 3.202 (anh chốt): TK 105 10 số theo Sao kê (bản gần nhất) — tra khi chọn khách */
        if(x5){ r.tk = x5.ds[0].stk; r.tkTu = 'Sao kê TK 105 '+slKyChu(x5.ky)+(x5.trung ? ' · '+x5.ds.length+' TK'+(x5.daChon ? ', anh đã chọn' : ', TK mở gần nhất') : ''); r.tkDs = x5.ds.map(function(y){ return y.stk; }); r.tkTrung = x5.trung && !x5.daChon; r.duSK = x5.ds[0].t105; }
        else if((x.stk||[]).length){ r.tk = x.stk[0]; r.tkTu = 'Mẫu 31 / Mẫu 18'; }
        var c5 = KHO.cccd(x.kh, t, false); r.cccd = c5.cccd; r.ncap = c5.ncap; r.ccTu = c5.tu; r.ccLy = c5.ly; r.han = c5.han; }
    }
    var row = r.kh ? KHO.dongTo(t.ma).find(function(o){ return o.kh===r.kh && o.tenThon; }) : null;
    if(r.ten || r.kh) r.diaChi = ktDiaBan({tenThon:(row && row.tenThon) || t.tenThon, tenXa:(row && row.tenXa) || t.tenXa});
    if(r.kh && typeof hsoKhach==='function'){ var k = KHO.khach(r.kh, t); r.noiCap = k.noiCap || ''; if(!r.ten) r.ten = k.ten || ''; }
    if(C.glLoai!=='104' && r.kh && !r.tk){   /* 3.185 (anh chốt): chưa có số TK 105 → tra danh bạ các kỳ theo SỐ CCCD (không theo tên); không có thì ghi lý do */
      var cc = String(r.cccd||'').replace(/\D/g, '');
      var m2 = cc.length>=9 ? KHO.dsDanhBa().find(function(k){ var c = KHO.danhBa(k); return String(c.cccd||'').replace(/\D/g, '')===cc && slStk(c.stk).length; }) : '';
      if(m2){ var c2 = KHO.danhBa(m2); r.tk = slStk(c2.stk)[0]; r.tkTu = 'theo CCCD'+(m2!==r.kh ? ' — mã KH '+m2 : '')+(c2.stkKy ? ', kỳ '+c2.stkKy : ''); }
      else { var b5 = KHO.saoKe('tk105'); r.tkLy = b5 ? 'không có trong Sao kê TK 105 '+slKyChu(b5.ky)+' (TK mới mở sau ngày Sao kê?) — gõ tay' : 'chưa nạp Sao kê TK 105 (📥 Nạp & KT) — gõ tay'; } }
  }
  r.tien = GDX.glHet && r.du ? String(Math.round(r.du)) : String(GDX.glTien||'').replace(/\D/g, '');
  var sua = GDX.glSua || {};   /* 3.175: form gõ tay — sửa / bổ sung cho lần in này (không ghi đè số liệu) */
  GL_O.forEach(function(o){ if(sua[o[0]]!==undefined) r[o[0]] = o[0]==='ncap' ? (gdxDocNgay(sua.ncap) || '') : sua[o[0]]; });
  r.noiCap = sua.noiCap!==undefined ? sua.noiCap : gdxNoiCap(r.ncap);   /* 3.183: tự tính, không lấy số liệu; gõ tay ô Nơi cấp thì theo anh gõ */
  return r;
}
/* 3.187 (anh: "CCCD tổ trưởng có trong các file về tổ"): Thông tin tổ trưởng (t.tt) → DSTO (t.ds) → danh mục tổ anh nạp */
function gdxGLMuc(k, kb){
  var C = gdxC(), h = '';
  if(k==='gldau') h = '<span class="gdx-1dong">'+gdxIn1('glPGD', 'tên PGD, vd: Gò Dầu — in “PHÒNG GIAO DỊCH GÒ DẦU”; trống = chấm')+gdxChip('<b>Đậm</b>', C.glPGDDam!=='thuong', 'gdxDat(\'glPGDDam\', \'dam\', 1)')+gdxChip('Thường', C.glPGDDam==='thuong', 'gdxDat(\'glPGDDam\', \'thuong\', 1)')+'</span>';   /* 3.200 (anh): dòng PGD in đậm hoặc không */
  else if(k==='glngay'){ var cach = C.glNgayCach || 'hom';   /* 3.182: 1 dòng — Hôm nay · ô nhập ngày · Để chấm */
    h = '<span class="gdx-1dong">'+gdxChip('Hôm nay', cach==='hom', 'gdxDat(\'glNgayCach\', \'hom\', 1)')+
      gdxNgayChon('gdxC().glNgayTay=this.value;gdxDat(\'glNgayCach\', this.value ? \'tay\' : \'hom\', 1)', cach==='tay' ? C.glNgayTay : '')+
      gdxChip('Để chấm', cach==='cham', 'gdxDat(\'glNgayCach\', \'cham\', 1)')+'<b class="gdx-hien">→ '+(gdxGLNgay() ? gdxDMY(gdxGLNgay()) : 'để chấm')+'</b></span>'; }
  else if(k==='glso') h = '<div class="gdx-luoi"><label><span>Số</span>'+gdxIn1('glSo', 'trống = chấm')+'</label><label><span>KHTK</span>'+gdxIn1('glKHTK', 'trống = chấm')+'</label></div>';
  else if(k==='glphieu') h = gdxGLPhieuHTML(kb);
  else if(k==='glchim') h = gdxRadio('glChim', [['tat','Tắt'],['nhat','Nhạt'],['vua','Vừa'],['dam','Đậm']])+'<small class="gdx-ghi">Phiếu đã điền in theo mức chọn; phiếu trắng in mức Vừa (chọn Tắt thì cũng tắt).</small>';
  else if(k==='gltai') h = gdxIn1('glTaiNH', 'trống = chấm (vd: NHCSXH PGD Gò Dầu)');
  else if(k==='glnd') h = '<span class="gdx-1dong">'+gdxIn1('glND', 'Rút tiền')+gdxChip('<i>Nghiêng</i>', C.glNDNghieng!=='thuong', 'gdxDat(\'glNDNghieng\', \'nghieng\', 1)')+gdxChip('Thường', C.glNDNghieng==='thuong', 'gdxDat(\'glNDNghieng\', \'thuong\', 1)')+'</span>';
  else if(k==='glnh') h = '<div class="gdx-luoi"><label><span>Tài khoản ghi Nợ</span><select class="gdx-i" onchange="gdxDat(\'glTKNo\', this.value, 1)"><option value="cham"'+(C.glTKNo!=='tk' ? ' selected' : '')+'>Để chấm (ngân hàng ghi)</option><option value="tk"'+(C.glTKNo==='tk' ? ' selected' : '')+'>= Tài khoản số của khách</option></select></label>'+
    '<label><span>Mã - Ngân hàng</span>'+gdxIn1('glMaNH', 'trống = chấm')+'</label></div>';
  else if(k==='glkho') h = gdxRadio('glKho', [['a5','A5 ngang'],['a4','A4 dọc · in nửa trên']]);
  return h;
}
function gdxGLLuuMuc(){ var C = gdxC(), v = +String(GDX.glTien||'').replace(/\D/g, ''); if(!(v > 0)) return bao('Nhập số tiền trước.'); C.glMuc = C.glMuc || []; if(C.glMuc.indexOf(v)>=0) return bao('Số tiền này đã có.');
  C.glMuc.push(v); C.glMuc.sort(function(a, b){ return a - b; }); gdxLuu(); gdxVe(); bao('Đã lưu chip '+gdxTien(v)+' đ'); }
function gdxTomVe(){ var t = document.getElementById('gdx-tom'); if(t) t.innerHTML = gdxTomHTML(); var c = document.getElementById('gdx-gl-chu'); if(c){ var g = String(GDX.glTien||'').replace(/\D/g, ''); c.textContent = g ? gdxDocTien(g) : '—'; } }
/* 3.176 (anh chốt): khung "Người lĩnh · số tiền" gọn trong 1 khung — loại TK + ô tìm (↑↓ Enter) + khách trong tổ (ô sổ xuống) + form gõ tay như mẫu thật + số tiền ▲▼ (bước 100 nghìn) */
function gdxGLPhieuHTML(kb){
  var C = gdxC(), t = gdxGLTo(), g = gdxGLDuLieu(), h = '<div class="gl-khung">';
  h += '<div class="gl-k1"><span class="gdx-ra"><label><input type="radio" name="gdx-r-glloai"'+(C.glLoai==='104' ? ' checked' : '')+' onchange="GDX.glKH=\'\';GDX.glHet=0;GDX.glSua={};gdxDat(\'glLoai\', \'104\', 1)"> TK 104 tổ trưởng</label>'+
    '<label><input type="radio" name="gdx-r-glloai"'+(C.glLoai!=='104' ? ' checked' : '')+' onchange="GDX.glKH=\'\';GDX.glHet=0;GDX.glSua={};gdxDat(\'glLoai\', \'105\', 1)"> TK 105 khách</label></span>'+
    (KHO.coKy() ? '<div class="gdx-tim"><input id="gdx-gl-q" class="gdx-i" autocomplete="off" placeholder="🔎 Gõ tên '+(C.glLoai==='104' ? 'tổ trưởng' : 'tổ trưởng / khách')+' (không dấu) · ↑↓ Enter" value="'+gdxE(GDX.glQ||'')+'" oninput="GDX.glQ=this.value;gdxGLTim()" onkeydown="gdxGLPhim(event)"><div id="gdx-gl-gy" class="gdx-gy"></div></div>'
      : '<small class="gdx-ghi">Chưa có Mẫu 31 — gõ tay vào các ô dưới.</small>')+'</div>';
  if(t && C.glLoai==='104') h += '<div class="gl-k2">Tổ '+gdxE(t.ten || t.ma)+(t.tenThon ? ' · '+gdxE(pvApNgan(t.tenThon)) : '')+' · TK 104: '+(g.tk ? '<b>'+gdxE(g.tk)+'</b> <small>('+g.tkTu+')</small>' : '<span class="gdx-vang">chưa có — '+gdxE(g.tkLy || '')+'</span>')+gdxGLChonTK('tk104', g)+'</div>';
  else if(t){ var ds = gdxGLDsKhach(t), tt = (typeof hsoTTKH==='function' ? hsoTTKH(t).kh : '') || '';
    h += '<div class="gl-k2"><select class="gdx-i" onchange="if(this.value)gdxGLChonKH(this.value)"><option value="">— Khách tổ '+gdxE(t.ten || t.ma)+' ('+ds.length+') —</option>'+
      ds.map(function(x){ return '<option value="'+gdxE(x.kh)+'"'+(x.kh===GDX.glKH ? ' selected' : '')+'>'+gdxE(x.ten+(x.kh===tt ? ' (TT)' : '')+' · 105: '+gdxTien(Math.round(x.t105||0)))+'</option>'; }).join('')+'</select></div>'+
      (GDX.glKH ? '<div class="gl-k2">TK 105: '+(g.tk ? '<b>'+gdxE(g.tk)+'</b> <small>('+gdxE(g.tkTu||'')+')</small>' : '<span class="gdx-vang">chưa có — '+gdxE(g.tkLy||'gõ tay')+'</span>')+gdxGLChonTK('tk105', g)+'</div>' : ''); }
  else if(KHO.coKy()) h += '<div class="gl-k2"><small class="gdx-ghi">hoặc chọn Tổ ở khối LỌC ĐỊA BÀN · hoặc gõ thẳng vào các ô dưới</small></div>';
  h += '<div class="gl-form-luoi">'+GL_O.map(function(o){ var v = g[o[0]] || '', ph = o[0]==='ncap' ? 'gõ liền 230421' : 'trống = chấm';
      if(o[0]==='ncap' && /^\d{4}-\d{2}-\d{2}/.test(v)) v = gdxDMY(String(v).slice(0, 10));
      if(GDX.glSua && GDX.glSua[o[0]]!==undefined && o[0]==='ncap') v = GDX.glSua.ncap;
      var nhan = o[0]==='diaChi' ? '<span class="gl-nhan2"><span>'+o[1]+'</span><i id="gdx-gl-noicap" class="gl-noicap" onclick="event.preventDefault();gdxGLNoiCapTay()" title="Nơi cấp — tự tính theo ngày cấp (từ 01/07/2024: Bộ Công an; trước đó: Cục Cảnh sát quản lý hành chính về trật tự xã hội). Bấm để gõ tay.">'+gdxGLNoiCapChu(g)+'</i></span>' : '<span>'+o[1]+'</span>';
      return '<label class="gl-c'+o[2]+'">'+nhan+'<input class="gdx-i" data-k="'+o[0]+'" value="'+gdxE(v)+'" placeholder="'+ph+'" oninput="gdxGLSua(this)"'+(o[0]==='ncap' ? ' onblur="var v=gdxDocNgay(this.value);if(v&&this.value!==gdxDMY(v)){this.value=gdxDMY(v);gdxGLSua(this);}"' : '')+'></label>'; }).join('')+'</div>';
  h += '<div class="gl-tien"><label>Số tiền <input id="gdx-gl-tien" class="gdx-i gdx-tien gdx-tien-to" inputmode="numeric" value="'+gdxE(g.tien ? gdxTien(g.tien) : '')+'" placeholder="trống = chấm" oninput="this.value=gdxTien(this.value);GDX.glTien=this.value;GDX.glHet=0;gdxXem();gdxTomVe()" onkeydown="if(event.key===\'ArrowUp\'||event.key===\'ArrowDown\'){event.preventDefault();gdxGLBuoc(event.key===\'ArrowUp\'?100000:-100000);}"></label>'+
    '<span class="gdx-buoc"><button onclick="gdxGLBuoc(100000)" title="Tăng 100 nghìn">▲</button><button onclick="gdxGLBuoc(-100000)" title="Giảm 100 nghìn">▼</button></span>'+
    (C.glLoai!=='104' && g.du && C.form!=='gn' ? gdxChip('Rút hết: '+gdxTien(Math.round(g.du)), !!GDX.glHet, 'GDX.glHet=1;GDX.glTien=\'\';gdxVe()') : '')+
    (C.glMuc||[]).map(function(a, i){ return '<span class="gdx-mh">'+gdxChip(gdxChipTien(a), !GDX.glHet && String(g.tien)===String(a), 'GDX.glHet=0;GDX.glTien=\''+a+'\';gdxVe()')+(kb ? '<button class="gdx-x" onclick="gdxC().glMuc.splice('+i+', 1);gdxLuu();gdxVe()" title="Xóa">×</button>' : '')+'</span>'; }).join('')+
    gdxChip('⭐', false, 'gdxGLLuuMuc()', 'khac', 'Lưu số tiền đang nhập thành chip')+'</div>'+
    '<div class="gdx-chu-tien" id="gdx-gl-chu">'+gdxE(g.tien ? gdxDocTien(g.tien) : '—')+'</div>';
  if(GDX.glSua && Object.keys(GDX.glSua).length && (GDX.glKH || t)) h += '<div class="gl-k3"><button class="nho" onclick="GDX.glSua={};gdxVe()">↺ Theo số liệu</button></div>';   /* 3.182: ✕ Làm trống lên đầu khung, kế 👁 Xem */
  return h+'</div>';
}
function gdxGLChonTK(loai, g){   /* 3.202: khách / tổ trưởng có ≥ 2 TK → chọn TK đang dùng (nhớ theo mã KH), báo đóng TK thừa */
  if(!g.kh || !g.tkDs || g.tkDs.length<2) return '';
  return ' <select class="gdx-i gdx-tk-chon" title="Có '+g.tkDs.length+' TK — chọn TK đang dùng" onchange="tkChonDat(\''+loai+'\', \''+g.kh+'\', this.value)">'+g.tkDs.map(function(x){ return '<option value="'+gdxE(x)+'"'+(x===g.tk ? ' selected' : '')+'>'+gdxE(x)+'</option>'; }).join('')+'</select>';
}
function gdxGLBuoc(b){ var g = gdxGLDuLieu(), v = +String(g.tien||'').replace(/\D/g, '') || 0, bb = Math.abs(b);
  v = v % bb ? (b > 0 ? Math.ceil(v/bb)*bb : Math.floor(v/bb)*bb) : v + b; v = Math.max(0, v);
  GDX.glHet = 0; GDX.glTien = v ? String(v) : ''; var o = document.getElementById('gdx-gl-tien'); if(o) o.value = v ? gdxTien(v) : ''; gdxXem(); gdxTomVe(); }
/* ↑↓ chọn kết quả tìm, Enter chọn, Esc bỏ */
function gdxGLPhim(ev){
  var ds = document.querySelectorAll('#gdx-gl-gy button'); if(!ds.length) return;
  var i = GDX.glI || 0;
  if(ev.key==='ArrowDown' || ev.key==='ArrowUp'){ ev.preventDefault(); i = (i + (ev.key==='ArrowDown' ? 1 : -1) + ds.length) % ds.length; GDX.glI = i;
    Array.prototype.forEach.call(ds, function(b, k){ b.classList.toggle('bat', k===i); }); ds[i].scrollIntoView({block:'nearest'}); }
  else if(ev.key==='Enter'){ ev.preventDefault(); (ds[i] || ds[0]).click(); }
  else if(ev.key==='Escape'){ GDX.glQ = ''; ev.target.value = ''; gdxGLTim(); }
}
/* 3.176: in xong → "✕ Làm trống — in người khác" (3.206 anh chốt: đổi tên "↺ Phiếu mới"): bỏ người lĩnh / form / số tiền, giữ ngày, khổ, loại TK; con trỏ về ô tìm */
function gdxGLMoi(){
  var S = gdxCH(); GDX.glQ = ''; GDX.glKH = ''; GDX.glTien = ''; GDX.glHet = 0; GDX.glSua = {}; GDX.glDaIn = false; GDX.glI = 0;
  if(KHO.coKy() && S.to){ S.to = ''; GDX.glTo = ''; luu(); var cay = document.getElementById('gdx-cay'); if(cay) pvVeCay('gdx'); else gdxVe(); } else gdxVe();
  setTimeout(function(){ var e = document.getElementById('gdx-gl-q') || document.querySelector('.gl-form-luoi input'); if(e) e.focus(); }, 50);
}
function gdxGLChonKH(kh){ GDX.glKH = kh; GDX.glHet = 0; GDX.glSua = {}; gdxVe(); gdxGLToiTien(); }
/* 3.175 (anh chốt): form gõ tay ngay dưới ô tìm, bố trí như mẫu thật — tìm ra thì app điền sẵn, sửa được; không tìm thì gõ thẳng */
var GL_O = [['ten','Họ, tên khách hàng',5], ['cccd','CMT / CCCD số',4], ['ncap','Ngày cấp',3], ['diaChi','Địa chỉ',8], ['tk','Tài khoản số',4]];   /* [khóa, nhãn, số cột / 12] — 3.183: Họ tên · CCCD · Ngày cấp 1 dòng; 3.184: bỏ ô Nơi cấp — chữ mờ cạnh nhãn Địa chỉ */
function gdxGLSua(o){ GDX.glSua = GDX.glSua || {}; GDX.glSua[o.getAttribute('data-k')] = o.value; ccNhoGhi(o.getAttribute('data-k'), o.value); gdxXem(); gdxTomVe();
  if(o.getAttribute('data-k')==='ncap'){ var e = document.getElementById('gdx-gl-noicap'); if(e) e.textContent = gdxGLNoiCapChu(gdxGLDuLieu()); } }
/* 3.184 (anh chốt): nơi cấp không ra ô — chữ mờ cùng dòng nhãn Địa chỉ (dưới ô CCCD); bấm để gõ tay, để trống = tự tính lại */
function gdxGLNoiCapChu(g){ return (gdxNoiCapCu(g.ncap) && !(GDX.glSua && GDX.glSua.noiCap!==undefined) ? '⚠ ' : '')+'Nơi cấp: '+(g.noiCap || '— gõ ngày cấp')+(GDX.glSua && GDX.glSua.noiCap!==undefined ? ' ✎' : ''); }
function gdxGLNoiCapTay(){ var g = gdxGLDuLieu(), v = prompt('Nơi cấp (để trống = tự tính theo ngày cấp):', g.noiCap || ''); if(v===null) return;
  GDX.glSua = GDX.glSua || {}; if(String(v).trim()) GDX.glSua.noiCap = String(v).trim(); else delete GDX.glSua.noiCap; gdxVe(); }
function gdxGLLamTrong(){ gdxGLMoi(); }   /* 3.185 (anh chốt): Làm trống trước / sau in như nhau — bỏ người lĩnh, form, số tiền và bỏ luôn chọn tổ ở cây địa bàn (giữ Xã / Điểm) */
function gdxCCCDCua(kh, t){ var c = KHO.danhBa(kh), v = c && c.cccd;
  if(!v && t && KHO.dongTo(t.ma).length){ var r = KHO.dongTo(t.ma).find(function(o){ return o.kh===kh && o.cccd; }); v = r ? r.cccd : ''; } return String(v||'').replace(/\D/g, ''); }
function gdxGLTim(){
  var g = document.getElementById('gdx-gl-gy'); if(!g) return;
  var q = slChuan(GDX.glQ||''); if(q.length<2 || !KHO.coKy()){ g.innerHTML = ''; return; }
  var tu = q.split(' '), C = gdxC(), kq = [], khop = function(chu){ chu = ' '+slChuan(chu); return tu.every(function(w){ return chu.indexOf(w)>=0; }); };
  /* 3.178 (anh chốt): đã chọn Xã / Điểm GD ở khối lọc → chỉ tìm trong xã / điểm đó cho gọn; bấm "Tìm cả PGD" để mở rộng */
  var S = gdxCH(), pham = GDX.glTatCa ? null : (S.diem ? {k:'khoaDiem', v:S.diem, chu:'điểm '+((gdxDiem(S.diem)||{}).tenDiem || S.diem)} : S.xa ? {k:'xa', v:S.xa, chu:gdxTenXa(S.xa)} : null);
  var trong = function(t){ return !pham || t[pham.k]===pham.v; };
  /* 3.185 (anh chốt): gõ số (4 số cuối trở lên hoặc đủ CCCD) → tìm theo số CCCD cho đúng người, không lẫn trùng tên */
  var so = /^\d{4,}$/.test(q) ? q : '', theoCC = function(kh, t){ if(!so || !kh) return ''; var cc = gdxCCCDCua(kh, t); return cc && cc.slice(-so.length)===so ? cc : ''; };
  KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(t.trucTiep || !t.ten || !trong(t)) return;
    var cc = so ? theoCC(typeof hsoTTKH==='function' ? hsoTTKH(t).kh : '', t) : '';
    if(cc || (!so && khop([t.ten, m, t.tenThon].join(' ')))) kq.push({to:m, kh:'', ten:t.ten, phu:'Tổ trưởng · tổ '+m+' · '+[pvApNgan(t.tenThon), t.tenDiem].filter(Boolean).join(' · ')+(cc ? ' · CCCD '+cc : '')}); });
  if(C.glLoai!=='104') KHO.maDong().forEach(function(m){ var t = KHO.to(m), da = {}; if(!t || t.trucTiep || !trong(t)) return;
    KHO.dongTo(m).forEach(function(o){ if(!o.kh || da[o.kh] || (!so && slChuan(o.ten)===slChuan(t.ten))) return; da[o.kh] = 1;
      var cc = theoCC(o.kh, t);
      if(cc || (!so && khop(o.ten+' '+o.kh))) kq.push({to:m, kh:o.kh, ten:o.ten, phu:'Khách · tổ '+(t.ten||m)+(t.tenThon ? ' · '+pvApNgan(t.tenThon) : '')+(cc ? ' · CCCD '+cc : '')}); }); });
  kq = kq.slice(0, 10); GDX.glI = 0;
  g.innerHTML = kq.length ? kq.map(function(x, i){ return '<button'+(i===0 ? ' class="bat"' : '')+' onclick="gdxGLChon(\''+x.to+'\', \''+x.kh+'\')"><b>'+gdxE(x.ten)+'</b> <small>'+gdxE(x.phu)+'</small></button>'; }).join('')
    : '<div class="rong">Không thấy “'+gdxE(GDX.glQ)+'”'+(pham ? ' trong '+gdxE(pham.chu) : '')+'.</div>';
  if(pham) g.innerHTML = '<div class="gdx-gy-pham">🔎 Đang tìm trong <b>'+gdxE(pham.chu)+'</b> <a class="lk" onclick="GDX.glTatCa=1;gdxGLTim();var q=document.getElementById(\'gdx-gl-q\');if(q)q.focus()">Tìm cả PGD</a></div>'+g.innerHTML;
  else if(GDX.glTatCa && (S.diem || S.xa)) g.innerHTML = '<div class="gdx-gy-pham">🔎 Đang tìm cả PGD <a class="lk" onclick="GDX.glTatCa=0;gdxGLTim();var q=document.getElementById(\'gdx-gl-q\');if(q)q.focus()">Chỉ trong xã / điểm đang chọn</a></div>'+g.innerHTML;
}
function gdxGLChon(to, kh){
  GDX.glQ = ''; GDX.glTatCa = 0; pvChonTo('gdx', to);
  var t = KHO.to(to);
  GDX.glTo = to; GDX.glHet = 0; GDX.glTien = ''; GDX.glSua = {};
  GDX.glKH = kh || (t && gdxC().glLoai!=='104' && typeof hsoTTKH==='function' ? hsoTTKH(t).kh : '') || '';
  gdxVe(); gdxGLToiTien();
}
/* 3.185 (anh chốt): chọn người (↑↓ Enter hoặc bấm) → con trỏ nhảy ngay xuống ô số tiền */
function gdxGLToiTien(){ setTimeout(function(){ var e = document.getElementById('gdx-gl-tien'); if(e){ e.focus(); try { e.select(); } catch(er){} } }, 60); }
/* mẫu in Giấy lĩnh — dựng theo ảnh mẫu anh gửi (khung, chữ, vị trí); không có hình chìm VBSP (giấy in sẵn mới có) */
/* 3.183 (anh chốt): nơi cấp tự tính theo ngày cấp, không phụ thuộc số liệu — cùng công thức hsoNoiCapGY (từ 01/07/2024: Bộ Công an; trước đó: Cục Cảnh sát quản lý hành chính về trật tự xã hội), viết đủ không tắt */
/* 3.184 (anh chốt): hiện chỉ còn 2 dạng; thẻ cấp trước 10/10/2018 (thẻ đợt đầu — trường hợp cũ) → ghi chung "Cục Cảnh sát" và báo để kiểm lại trên thẻ */
var GDX_NC_CU = '2018-10-10';
function gdxNgayISO(ncap){ var s = String(ncap||'').trim(); return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : gdxDocNgay(s); }
function gdxNoiCap(ncap){ var iso = gdxNgayISO(ncap); if(!iso) return '';
  return iso >= '2024-07-01' ? 'Bộ Công an' : iso >= GDX_NC_CU ? 'Cục Cảnh sát quản lý hành chính về trật tự xã hội' : 'Cục Cảnh sát'; }
function gdxNoiCapCu(ncap){ var iso = gdxNgayISO(ncap); return !!iso && iso < GDX_NC_CU; }
function gdxGLO(v, lop){ v = v==null ? '' : String(v).trim(); return v ? '<span class="gl-v'+(lop ? ' '+lop : '')+'">'+gdxE(v)+'</span>' : '<span class="gl-c'+(lop ? ' '+lop : '')+'"></span>'; }
function gdxGLNgayO(iso, nhan){ var p = String(iso||'').split('-'), o = function(v, w){ return v ? '<span class="gl-vn">'+v+'</span>' : '<span class="gl-cn" style="width:'+w+'"></span>'; };
  return nhan ? nhan+' '+o(p[2], '12mm')+' tháng '+o(p[1], '12mm')+' năm '+o(p[0], '13mm') : o(p[2], '9mm')+'/'+o(p[1], '9mm')+'/'+o(p[0], '12mm'); }
/* 3.175 (anh góp sau in thử): bằng chữ dài → tràn xuống dòng dưới (bỏ chấm), vừa 1 dòng → dòng dưới giữ chấm (tối đa 2 dòng);
   dòng PGD có chữ → giãn đều như 2 dòng trên, phiếu trắng giữ khoảng ghi tay; dòng Nội dung canh đều các dòng trên → chỗ ký rộng hơn;
   chữ VBSP chìm (bản giấy trắng); chữ 13 pt. trang = true → phiếu trắng đúng form (không điền gì). */
function gdxGLTrang(g, c, trang){
  g = trang ? {} : (g || {}); c = c || gdxC();
  var kb = function(k, md){ return trang ? '' : (c[k]==null ? (md||'') : c[k]); };
  var tien = g.tien ? gdxTien(g.tien) : '', chu = g.tien ? gdxDocTien(g.tien) : '';
  var r = function(nhan, gt){ return '<div class="gl-r"><span class="gl-n">'+nhan+'</span>'+gt+'</div>'; };
  var hop = function(tit, gt){ return '<div class="gl-hop"><div class="gl-hop-t">'+tit+'</div><div class="gl-r gl-hop-g">'+gt+'</div></div>'; };
  var pgd = gdxTenPGD(kb('glPGD')), chim = trang ? (c.glChim==='tat' ? 'tat' : 'vua') : (c.glChim || 'nhat');   /* 3.176: chữ chìm Tắt · Nhạt · Vừa · Đậm — phiếu điền sẵn mặc định Nhạt, phiếu trắng Vừa */
  return '<div class="gl-trang">'+(chim==='tat' ? '' : '<div class="gl-chim chim-'+chim+'">VBSP</div>')+
    '<div class="gl-dau"><div class="gl-nh"><div>NGÂN HÀNG CSXH</div><div>CHI NHÁNH TỈNH TÂY NINH</div>'+(pgd ? '<div class="gl-pgdv'+(c.glPGDDam==='thuong' ? ' gl-thuong' : '')+'">'+gdxE(pgd)+'</div>' : '<div class="gl-r gl-pgd">'+gdxGLO('')+'</div>')+'</div>'+
      '<div class="gl-giua2"><div class="gl-tit">GIẤY LĨNH TIỀN MẶT</div><div class="gl-ngay">'+gdxGLNgayO(g.ngay, 'Ngày')+'</div></div>'+
      '<div class="gl-so">'+r('Số:', gdxGLO(kb('glSo')))+r('KHTK', gdxGLO(kb('glKHTK')))+'</div></div>'+
    '<div class="gl-than"><div class="gl-trai">'+
      r('Họ, tên khách hàng:', gdxGLO(g.ten, 'gl-dam'))+r('Địa chỉ:', gdxGLO(g.diaChi))+
      '<div class="gl-r"><span class="gl-n">CMT (Hộ chiếu) số:</span>'+gdxGLO(g.cccd)+'<span class="gl-n gl-n2">Ngày</span><span class="gl-ns">'+gdxGLNgayO(g.ncap ? String(g.ncap).slice(0, 10) : '')+'</span></div>'+
      r('Nơi cấp:', gdxGLO(g.noiCap))+r('Tài khoản số:', gdxGLO(g.tk, 'gl-dam'))+r('Tại Ngân hàng:', gdxGLO(kb('glTaiNH')))+
      '<div class="gl-len"><div class="gl-bcd">'+r('Yêu cầu cho rút tiền <i>(bằng chữ)</i>:', chu ? '<span class="gl-v gl-bc1">'+gdxE(chu)+'</span>' : gdxGLO(''))+'<div class="gl-r">'+(chu ? '<span class="gl-c gl-bc2"></span>' : gdxGLO(''))+'</div></div>'+
      r('Nội dung:', gdxGLO(kb('glND', 'Rút tiền'), c.glNDNghieng==='thuong' ? '' : 'gl-ng'))+'</div>'+   /* 3.201 (anh): chữ nội dung in nghiêng (mặc định) hoặc thường */
    '</div><div class="gl-phai"><div class="gl-phan">PHẦN DO NGÂN HÀNG GHI</div><div class="gl-hop2">'+hop('Tài khoản ghi Nợ', gdxGLO(!trang && c.glTKNo==='tk' ? g.tk : ''))+hop('Mã - Ngân hàng', gdxGLO(kb('glMaNH')))+'</div>'+
      '<div class="gl-hop2 gl-hop3">'+hop('Số tiền bằng số', gdxGLO(tien, 'gl-dam'))+'</div></div></div>'+
    '<div class="gl-r gl-r2">'+gdxGLO('')+'</div>'+
    '<div class="gl-ky"><div>Kế toán trưởng</div><div>Chủ tài khoản</div><div class="gl-ky-l">Người lĩnh tiền<i>(Đã nhận đủ tiền)</i></div><div>Thủ quỹ</div><div>Kế toán</div><div>Kiểm soát</div><div>Giám đốc</div></div>'+
  '</div>';
}
/* bằng chữ: đo trên trang — chữ không vừa dòng 1 thì phần còn lại xuống dòng 2 (bỏ chấm) */
var GL_JS = '<script>(function(){function chia(){Array.prototype.forEach.call(document.querySelectorAll(".gl-bc1"),function(a){var b=a.parentNode.nextElementSibling&&a.parentNode.nextElementSibling.querySelector(".gl-bc2");if(!b||a.getAttribute("data-xong"))return;a.setAttribute("data-xong","1");if(a.scrollWidth<=a.clientWidth+1)return;var w=a.textContent.split(" "),i=w.length;while(i>1){i--;a.textContent=w.slice(0,i).join(" ");if(a.scrollWidth<=a.clientWidth+1)break;}b.className="gl-v gl-bc2";b.textContent=w.slice(i).join(" ");});}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",chia);else chia();})();<\/script>';
function gdxTenPGD(v){   /* 3.198 (anh): không viết tắt PGD — "PGD Gò Dầu" / "Gò Dầu" → "PHÒNG GIAO DỊCH GÒ DẦU" */
  var t = String(v||'').trim().replace(/^(pgd|phòng\s+giao\s+dịch)\b\s*:?\s*/i, '').trim();
  return t ? 'PHÒNG GIAO DỊCH '+t.toUpperCase() : '';
}
function gdxHTMLGL(g, c){
  c = c || gdxC();
  if(c.glKho==='a4x2') return '<div class="sheet-gl gl-a4 gl-x2">'+gdxGLTrang(g, c, c.glTrang)+'<div class="gl-cat"></div>'+gdxGLTrang(g, c, c.glTrang)+'</div>'+GL_JS;
  if(c.glKho==='a4bk') return '<div class="sheet-gl gl-a4 gl-kem">'+gdxGLTrang(g, c, c.glTrang)+'<div class="gl-bkk">'+gdxBKTrang(c, c.glTrang ? null : g)+'</div><div class="gl-cat-n"></div></div>'+GL_JS;   /* 3.194: 💵+🧾 1 tờ A4 dọc */
  return '<div class="sheet-gl'+(c.glKho==='a4' ? ' gl-a4' : '')+'">'+gdxGLTrang(g, c, c.glTrang)+'</div>'+GL_JS;
}
var GL_CSS = '*{box-sizing:border-box;margin:0;padding:0}body{background:#eceff1;color:#000;font-family:"Times New Roman",Times,serif}'+
  '.preview-stage{background:#455a64;border-radius:8px;padding:20px;display:flex;justify-content:center;overflow:auto}'+
  '.sheet-gl{background:#fff;width:210mm;height:148mm;box-shadow:0 8px 24px rgba(0,0,0,.3);overflow:hidden;position:relative}.sheet-gl.gl-a4{height:297mm}'+
  '.gl-trang{position:relative;width:210mm;height:148mm;padding:13mm 11mm 4mm 13mm;font-size:13pt;line-height:1.3;display:flex;flex-direction:column}'+
  '.gl-x2 .gl-trang{height:148.5mm}.gl-cat{position:absolute;left:0;right:0;top:148.5mm;border-top:.3mm dashed #b8b8b8}'+
  '.gl-chim{position:absolute;left:32.4mm;top:47.15mm;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:114pt;line-height:1;letter-spacing:0;color:#d2d2d2;z-index:0;pointer-events:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}'+
  '.gl-chim.chim-nhat{color:#e6e6e6}.gl-chim.chim-vua{color:#d2d2d2}.gl-chim.chim-dam{color:#bcbcbc}'+
  '.gl-dau,.gl-than,.gl-ky,.gl-r2{position:relative;z-index:1}'+
  '.gl-trai .gl-r{min-height:7.08mm}.gl-bcd .gl-c{position:relative;top:-.8mm}.gl-bc1,.gl-bc2,.gl-v.gl-ng{font-style:italic}'+   /* 3.200 (anh): số tiền bằng chữ in nghiêng */
  ''+   /* 3.187 (anh chốt): 9 dòng khối trái giãn đều 7,08 mm (bỏ rút 1 mm của 3.186 → dòng Yêu cầu hết sát dòng trên); 2 đường chấm bằng chữ lên 0,8 mm */
  '.gl-dau{display:grid;grid-template-columns:64mm 1fr 50mm;align-items:start;margin-bottom:8mm}'+
  '.gl-nh{text-align:center;font-weight:bold;font-size:12.5pt;line-height:1.25}.gl-nh .gl-pgd{margin-top:-.3mm;font-weight:normal}.gl-pgdv{font-weight:bold}.gl-pgdv.gl-thuong{font-weight:normal}'+
  '.gl-giua2{text-align:center}.gl-tit{font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:17pt;margin-top:.5mm;letter-spacing:.2px}.gl-ngay{font-family:Arial,Helvetica,sans-serif;font-style:italic;font-size:12pt;margin-top:2.75mm}'+
  '.gl-so{font-size:12pt;padding-left:4mm}.gl-so .gl-r{min-height:8mm}'+
  '.gl-r{display:flex;align-items:baseline;gap:1.2mm;min-height:7.2mm;white-space:nowrap}.gl-n{flex:none}.gl-n2{margin-left:2mm}'+
  '.gl-c{flex:1 1 auto;display:block;min-width:6mm;border-bottom:.7px dotted #333;line-height:1}.gl-c::after{content:"\\00a0"}'+
  '.gl-v{flex:1 1 auto;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:1mm}.gl-v.gl-dam{font-weight:bold}.gl-v.gl-bc1{text-overflow:clip}'+
  '.gl-cn{display:inline-block;border-bottom:.7px dotted #333;line-height:1}.gl-cn::after{content:"\\00a0"}.gl-vn{display:inline-block;min-width:6mm;text-align:center}.gl-ns{flex:none}'+
  '.gl-than{display:grid;grid-template-columns:1fr 62mm;gap:5mm}.gl-trai{min-width:0}'+
  '.gl-phai{display:flex;flex-direction:column;align-items:stretch}.gl-phan{font-weight:bold;font-size:11.5pt;text-align:center;line-height:1.2;margin:1mm 0 1.5mm}'+
  /* 3.182 (anh chốt): lề trên 13 mm (+5), chữ chìm dời theo; 2 gạch dọc ô Người lĩnh tiền ngắn 5 mm (3.187: dài lại 2,5 mm → cách đáy 2,5 mm). 3.186: dòng Họ tên (cả thân phiếu) xuống thêm 6 mm cho thoáng (đầu phiếu cách 8 mm — anh chỉnh 5 → 4 → +2 mm), chữ chìm dời theo */
  /* 3.176 (anh chốt): 3 ô cao hơn — 2 ô trên chia đều, ô Số tiền đáy ngang dòng Nội dung; dòng chấm trong ô cách cạnh ~1,2 mm */
  '.gl-hop2{border:.9px solid #000;display:flex;flex-direction:column;flex:2}.gl-hop3{margin-top:2.5mm;flex:1;margin-bottom:1.6mm}.gl-hop3 .gl-hop{justify-content:space-evenly;padding:1mm 1.2mm}.gl-hop+.gl-hop{border-top:.6px solid #666}'+
  '.gl-hop{flex:1;display:flex;flex-direction:column;justify-content:space-between;padding:1mm 1.2mm 1.2mm}.gl-hop-t{text-align:center;font-size:12pt;line-height:1.2}.gl-hop-g{min-height:0;align-items:flex-end}.gl-hop-g .gl-v{text-align:center;padding:0}'+
  '.gl-ky{display:grid;grid-template-columns:1.15fr 1.1fr 1.2fr .8fr .8fr .95fr .9fr;column-gap:1mm;text-align:center;font-weight:bold;font-size:11.5pt;margin-top:2mm;flex:1;min-height:24mm}'+
  '.gl-ky>div{padding-top:1mm;white-space:nowrap}.gl-ky i{display:block;font-weight:normal}.gl-ky-l{border-left:.6px solid #666;border-right:.6px solid #666;margin-bottom:.5mm}'+
  '@media print{body{background:#fff}.preview-stage{background:none;padding:0;display:block;border-radius:0}.sheet-gl{box-shadow:none;zoom:1 !important;height:147mm}.gl-trang{height:147mm}'+
    '.sheet-gl.gl-x2{height:296mm}.gl-x2 .gl-trang{height:148mm}.gl-cat{top:148mm}}';
/* ==========================================================
   3.187 (anh gửi ảnh mẫu 13/10): 🧾 BẢNG KÊ CÁC LOẠI TIỀN NGÂN HÀNG CHI RA — in kèm Giấy lĩnh, cùng người lĩnh / số tiền.
   Dựng theo ảnh tờ in sẵn (khổ tạm 105 × 185 mm, chờ anh đo); bảng mệnh giá mặc định để trắng (thủ quỹ ghi), tùy chọn tự chia mệnh giá;
   Thành tiền chia 4 ô = 4 nhóm 3 chữ số (tỷ · triệu · nghìn · đồng). Dòng có thông tin bỏ chấm, trống giữ chấm (như Giấy lĩnh).
   ========================================================== */
var BK_MG = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200];
function gdxBKChia(tien){ var con = +String(tien||'').replace(/\D/g, '') || 0, r = {}; BK_MG.forEach(function(m){ var n = Math.floor(con / m); if(n){ r[m] = n; con -= n*m; } }); return {so:r, du:con}; }
function gdxBKNhom(v){ v = +v || 0; if(!v) return ['', '', '', '']; var s = String(v), g = []; while(s.length){ g.unshift(s.slice(-3)); s = s.slice(0, -3); } while(g.length < 4) g.unshift(''); return g.slice(-4); }
/* 3.193 (anh): 🧾 Bảng kê = mẫu độc lập (mẫu trắng) — mỗi dòng theo ⚙ Khai báo riêng: có chữ thì in, để trống = chấm ghi tay; bảng mệnh giá để trắng.
   Chữ chìm = logo đã nạp ở 📄 Hồ sơ vay (khác Giấy lĩnh: chữ VBSP). */
function gdxLogo(){ return typeof hsoLogoSrc==='function' ? hsoLogoSrc() : ''; }   /* 3.194: logo NHCSXH có sẵn (hoặc logo anh nạp) */
function gdxBKDC(s){ return s ? String(s).replace(/(^|[\s,])khu ph\u1ed1(?=\s)/gi, '$1KP') : s; }   /* 3.223.1 (anh 17/10): Bảng kê khổ nhỏ — viết tắt "khu phố" → "KP" cho đủ 1 dòng (không thu nhỏ chữ) */
function gdxBKTrang(c, g, nop){   /* 3.312: nop = Bảng kê các loại tiền NỘP (kèm Giấy nộp tiền) */   /* g = dữ liệu Giấy lĩnh (3.194: in từ tab Giấy lĩnh) — có g: họ tên, địa chỉ, nội dung, ngày, số tiền theo Giấy lĩnh, tự chia mệnh giá */
  c = c || gdxC();
  var tien = g ? +String(g.tien||'').replace(/\D/g, '') || 0 : 0, chu = tien ? gdxDocTien(tien) : '', ch = tien ? gdxBKChia(tien) : null;
  var r = function(nhan, v, lop){ return '<div class="gl-r'+(lop ? ' '+lop : '')+'"><span class="gl-n">'+nhan+'</span>'+gdxGLO(v)+'</div>'; };
  var p = g ? String(g.ngay||'').split('-') : c.bkNgay==='hom' ? gdxHom().split('-') : [], o = function(v, w){ return v ? '<span class="gl-vn">'+v+'</span>' : '<span class="gl-cn" style="width:'+w+'"></span>'; };
  var o4 = function(v){ return gdxBKNhom(v).map(function(x){ return '<td class="bk-tt">'+x+'</td>'; }).join(''); };
  var dong = BK_MG.map(function(m){ var n = ch && ch.so[m]; return '<tr><td class="bk-lt">'+gdxTien(m)+'</td><td class="bk-sl">'+(n || '')+'</td>'+o4(n ? n*m : 0)+'</tr>'; }).join('');
  var logo = gdxLogo(), mc = c.bkChim || 'nhat';
  return '<div class="bk-trang bk-to">'+(mc==='tat' ? '' : logo ? '<img class="bk-chim bk-logo chim-'+mc+'" src="'+logo+'" alt="">' : '<div class="bk-chim">VBSP</div>')+
    '<div class="bk-dau"><div class="bk-nh"><div>'+gdxE(c.bkCQ1||'')+'</div><div>'+gdxE(c.bkCQ2||'')+'</div>'+(c.bkPGD ? '<div class="bk-pgd"><b>PHÒNG GIAO DỊCH: '+gdxE(String(c.bkPGD).toUpperCase())+'</b></div>' : '<div class="gl-r bk-pgd"><b>PHÒNG GIAO DỊCH:</b>'+gdxGLO('')+'</div>')+'</div>'+   /* 3.195 (anh): tên PGD liền khối cùng font, cùng cỡ với "PHÒNG GIAO DỊCH:"; bỏ trống trong khai báo mới hiện chấm */
      '<div class="bk-tit"><div class="bk-t1">BẢNG KÊ</div><div class="bk-t2">'+(nop ? 'CÁC LOẠI TIỀN NỘP VÀO NGÂN HÀNG' : 'CÁC LOẠI TIỀN NGÂN HÀNG CHI RA')+'</div><div class="bk-ngay">Ngày '+o(p[2], '6mm')+' tháng '+o(p[1], '6mm')+' năm '+(p[0] ? '<span class="gl-vn">'+p[0]+'</span>' : '20'+o('', '6mm'))+'</div></div></div>'+
    (g ? r(nop ? 'Họ và tên người nộp tiền:' : 'Họ và tên người lĩnh tiền:', g.ten, 'bk-ten')+r('Địa chỉ:', gdxBKDC(g.diaChi))+r('Nội dung:', nop ? gdxGNND(c) : c.glND==null ? 'Rút tiền' : c.glND)
       : r(nop ? 'Họ và tên người nộp tiền:' : 'Họ và tên người lĩnh tiền:', c.bkTen, 'bk-ten')+r('Địa chỉ:', gdxBKDC(c.bkDC))+r('Nội dung:', c.bkND))+
    '<table class="bk-bang"><colgroup><col style="width:19mm"><col style="width:13mm"><col><col><col><col></colgroup><thead><tr><th>Loại tiền</th><th>Số lượng</th><th colspan="4">Thành tiền</th></tr></thead><tbody>'+dong+
      '<tr class="bk-tong"><td><b>Tổng cộng</b></td><td></td>'+o4(ch ? tien - ch.du : 0)+'</tr>'+
      '<tr class="bk-chu"><td colspan="6"><div class="gl-r"><span class="gl-n"><i>Số tiền bằng chữ:</i></span>'+(chu ? '<span class="gl-v gl-bc1">'+gdxE(chu)+'</span>' : gdxGLO(''))+'</div><div class="gl-r">'+(chu ? '<span class="gl-c gl-bc2"></span>' : gdxGLO(''))+'</div></td></tr></tbody></table>'+
    '<div class="bk-ky"><div>'+(nop ? 'Người nộp tiền' : 'Người lĩnh tiền')+'<i>(ký và ghi rõ họ tên)</i></div><div>'+(nop ? 'Người nhận tiền' : 'Người chi tiền')+'<i>(ký và ghi rõ họ tên)</i></div></div>'+
    '<div class="bk-hoten">'+r('<i>Họ tên:</i>', '')+r('<i>Họ tên:</i>', '')+'</div>'+
  '</div>';
}
function gdxHTMLBKDL(g, c, nop){ return '<div class="sheet-bk bk-ngang">'+gdxBKTrang(c, g, nop)+'<div class="bk-cat bk-cat-t"></div></div>'+GL_JS; }   /* 3.194: 🧾 từ tab Giấy lĩnh — A4 ngang, 1 tờ sát mép trái */
function gdxBKTrangIn(){ gdxInBan({mau:'bk', C:JSON.parse(JSON.stringify(gdxC()))}); }   /* 📄 Mẫu trắng Bảng kê (theo tab 🧾 Bảng kê) */
function gdxHTMLBK(c){   /* 2 tờ 118 × 210 / A4 ngang (3.213: ngang 118 mm phủ bì theo giấy thật), mỗi tờ sát 1 mép, nét đứt cắt đúng khổ */
  c = c || gdxC(); var t = gdxBKTrang(c, null, c.bkLoai==='thu');   /* 3.314: Thu = mẫu tiền nộp */
  return '<div class="sheet-bk bk-ngang">'+t+'<div class="bk-cat bk-cat-t"></div><div class="bk-cat bk-cat-p"></div>'+t+'</div>';
}
function gdxBKMuc(k){
  var C = gdxC(), h = '';
  if(k==='bkcq') h = gdxIn1('bkCQ1', 'dòng 1')+gdxIn1('bkCQ2', 'dòng 2')+'<label class="gdx-l1">Phòng giao dịch '+gdxIn1('bkPGD', 'trống = chấm')+'</label><small class="gdx-ghi">Tên PGD in hoa.</small>';
  else if(k==='bkloai') h = gdxRadio('bkLoai', [['chi','💸 Chi — tiền ngân hàng chi ra'],['thu','💰 Thu — tiền nộp vào ngân hàng']])+'<small class="gdx-ghi">Chỉ khác tiêu đề và chữ ký (người lĩnh / người nộp).</small>';
  else if(k==='bkngay') h = gdxRadio('bkNgay', [['cham','Để chấm ghi tay'],['hom','Ghi sẵn hôm nay']]);
  else if(k==='bkten') h = gdxIn1('bkTen', C.bkLoai==='thu' ? 'người nộp tiền — trống = chấm ghi tay' : 'người lĩnh tiền — trống = chấm ghi tay');
  else if(k==='bkdc') h = gdxIn1('bkDC', 'trống = chấm ghi tay');
  else if(k==='bknd') h = gdxIn1('bkND', C.bkLoai==='thu' ? 'trống = chấm ghi tay (vd Gửi tiết kiệm)' : 'trống = chấm ghi tay (vd Rút tiền)');
  else if(k==='bkchim') h = gdxRadio('bkChim', [['tat','Tắt'],['nhat','Nhạt'],['vua','Vừa'],['dam','Đậm']])+'<small class="gdx-ghi">Logo NHCSXH (cánh sen) có sẵn trong app — đổi / tải logo ở 📄 Hồ sơ vay › ⚙ Khai báo 1 lần. Riêng Bảng kê — Giấy lĩnh dùng chữ chìm VBSP.</small>';
  return h;
}
/* 3.188: phần lõi Bảng kê (chữ .gl-* bó trong .bk-trang) */
var BK_CSS_LOI = '.bk-trang{position:relative;width:105mm;height:185mm;padding:6mm 5mm 5mm 5.5mm;font-size:11pt;line-height:1.25;display:flex;flex-direction:column;overflow:hidden}'+
  '.bk-chim{position:absolute;left:18mm;top:78mm;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:64pt;color:#e6e6e6;z-index:0;pointer-events:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}'+
  '.bk-chim.bk-logo{left:34.1mm;top:68.5mm;width:54.5mm;height:56.6mm;object-fit:contain;object-position:center;opacity:.16}.bk-logo.chim-vua{opacity:.24}.bk-logo.chim-dam{opacity:.34}'+
  '.bk-trang>*:not(.bk-chim){position:relative;z-index:1}'+
  '.bk-dau{display:grid;grid-template-columns:auto auto;justify-content:space-between;gap:1.5mm;margin-bottom:2.5mm}.bk-dau div{white-space:nowrap}'+
  '.bk-nh{text-align:center;font-family:"Arial Narrow","Arial Nova Cond",Arial,Helvetica,sans-serif;font-size:8pt;line-height:1.35}.bk-pgd{min-height:0;font-size:8pt;margin-top:1mm}.bk-trang .bk-pgd .gl-v{flex:0 1 auto;text-align:left;padding-left:1.2mm;text-transform:uppercase}'+   /* 3.191 (anh): cụm tên cơ quan lớn hơn; tên PGD sát chữ PHÒNG GIAO DỊCH */
  '.bk-tit{text-align:center}.bk-t1{font-weight:bold;font-size:14pt;letter-spacing:.5px}.bk-t2{font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:6.8pt}.bk-ngay{font-size:9.5pt;margin-top:1mm}'+
  '.bk-trang .gl-r{display:flex;align-items:baseline;gap:1mm;min-height:6.2mm;white-space:nowrap}.bk-trang .gl-n{flex:none}'+
  '.bk-trang .gl-c{flex:1 1 auto;display:block;min-width:5mm;border-bottom:.7px dotted #333;line-height:1}.bk-trang .gl-c::after{content:"\\00a0"}'+
  '.bk-trang .gl-v{flex:1 1 auto;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:1mm}.bk-trang .gl-v.gl-bc1{text-overflow:clip}.bk-trang .bk-ten .gl-v{font-weight:bold}'+
  '.bk-trang .gl-cn{display:inline-block;border-bottom:.7px dotted #333;line-height:1}.bk-trang .gl-cn::after{content:"\\00a0"}.bk-trang .gl-vn{display:inline-block;min-width:5mm;text-align:center}'+
  '.bk-bang{width:100%;border-collapse:collapse;margin-top:1.5mm;font-size:10.5pt;table-layout:fixed}'+
  '.bk-bang th{border:.9px solid #000;font-family:Arial,Helvetica,sans-serif;font-size:8.5pt;padding:.8mm 0}'+
  '.bk-bang td{border-left:.9px solid #000;border-right:.9px solid #000;border-bottom:.6px dotted #666;height:6.3mm;padding:0 1mm}'+
  '.bk-bang td.bk-tt{border-left:.5px solid #888;border-right:.5px solid #888}.bk-bang td:last-child{border-right:.9px solid #000}'+   /* 3.195 (anh): chấm nhuyễn; lằn chính mảnh vừa, lằn con (dòng mệnh giá, chia ô Thành tiền) lợt và nhỏ hơn */
  '.bk-lt{text-align:right}.bk-sl{text-align:center}.bk-tt{text-align:right;font-size:9.5pt}'+
  '.bk-tong td{border-top:.9px solid #000;border-bottom:.9px solid #000;height:10mm;font-family:Arial,Helvetica,sans-serif;font-size:9pt}.bk-tong .bk-tt{font-weight:bold}'+
  '.bk-chu td{border:.9px solid #000;padding:1mm 1.5mm;height:auto}.bk-trang .bk-chu .gl-r{min-height:5.6mm;font-size:10pt}.bk-trang .bk-chu .gl-v{font-weight:bold;font-style:italic}.bk-trang .bk-chu .gl-bc2{white-space:normal}'+   /* 3.191 (anh): Tổng cộng + bằng chữ in đậm (bằng chữ nghiêng) */
  '.bk-ky{display:grid;grid-template-columns:1fr 1fr;text-align:center;margin-top:2.5mm;font-size:10.5pt;flex:1}.bk-ky i{display:block;font-size:9.5pt}'+
  '.bk-hoten{display:grid;grid-template-columns:1fr 1fr;gap:3mm;font-size:10pt}.bk-hoten .gl-n{font-size:8pt}.bk-hoten .gl-r{gap:.8mm}';
/* 3.192: khổ Bảng kê 105 × 210 mm, chữ 13 pt (anh chốt 3.191) · 3.213 (anh 15/10): ngang 118 mm đúng phủ bì giấy thật — logo / chữ chìm dời giữa tờ */
var BK_CSS_TO = '.bk-trang.bk-to{width:118mm;height:210mm;padding:8mm 5mm 6mm 5.5mm;font-size:13pt}'+
  '.bk-to .bk-t1{font-size:17pt}.bk-to .bk-ngay{font-size:9.5pt}'+
  '.bk-to .bk-bang col:first-child{width:24mm !important}.bk-to .bk-tong td:first-child{white-space:nowrap}'+
  '.bk-to.bk-trang .gl-r{min-height:7.6mm}.bk-to .bk-bang{font-size:13pt;margin-top:2mm}.bk-to .bk-bang th{font-size:10.5pt;padding:1mm 0}.bk-to .bk-bang td{height:7.4mm}.bk-to .bk-tt{font-size:12pt}'+
  '.bk-to .bk-tong td{height:11mm;font-size:11pt}.bk-to .bk-tong .bk-tt{font-size:12.5pt}.bk-to.bk-trang .bk-chu .gl-r{min-height:7mm;font-size:13pt}'+
  '.bk-to .bk-ky{font-size:13pt;margin-top:3mm}.bk-to .bk-ky i{font-size:11.5pt}.bk-to .bk-hoten{font-size:13pt}.bk-to .bk-hoten .gl-n{font-size:10pt}'+
  '.bk-to .bk-chim{left:19.5mm;top:92mm;font-size:66pt}.bk-to .bk-chim.bk-logo{left:42.6mm;top:77.5mm;width:56.5mm;height:74.7mm}'+
  /* 3.217 (anh 15/10): tên người lĩnh in đậm · tên cơ quan to hơn · dòng CÁC LOẠI TIỀN… + ngày tháng to tương ứng · logo cánh sen to hơn 1 chút */
  '.bk-to .bk-nh,.bk-to .bk-pgd{font-size:9.5pt}.bk-to .bk-t2{font-size:8.3pt}.bk-to .bk-ngay{font-size:11pt}';
var BK_CSS = '*{box-sizing:border-box;margin:0;padding:0}body{background:#eceff1;color:#000;font-family:"Times New Roman",Times,serif}'+
  '.preview-stage{background:#455a64;border-radius:8px;padding:20px;display:flex;justify-content:center;overflow:auto}'+
  '.sheet-bk{background:#fff;width:297mm;height:210mm;box-shadow:0 8px 24px rgba(0,0,0,.3);position:relative;display:flex;justify-content:space-between;align-items:flex-start;overflow:hidden}'+ BK_CSS_LOI+BK_CSS_TO+
  '.bk-cat{position:absolute;top:0;height:210mm;width:.3mm;margin-left:-.15mm;background:repeating-linear-gradient(to bottom,#8c8c8c 0 2.6mm,transparent 2.6mm 4.8mm);-webkit-print-color-adjust:exact;print-color-adjust:exact}'+
  '.bk-cat::before{content:"";position:absolute;top:2.5mm;left:50%;width:4.2mm;height:4.2mm;transform:translateX(-50%) rotate(90deg);background:#fff url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%23555%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%3E%3Ccircle%20cx%3D%276%27%20cy%3D%276%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%276%27%20cy%3D%2718%27%20r%3D%273%27%2F%3E%3Cpath%20d%3D%27M8.1%208.1L20%2020M8.1%2015.9L20%204%27%2F%3E%3C%2Fsvg%3E") center/contain no-repeat;-webkit-print-color-adjust:exact;print-color-adjust:exact}.bk-cat-t{left:118mm}.bk-cat-p{right:118mm}'+
  '@page{size:A4 landscape;margin:0}'+
  '@media print{body{background:#fff}.preview-stage{background:none;padding:0;display:block;border-radius:0}.sheet-bk{box-shadow:none;zoom:1 !important;height:209mm}}';
var GL_CSS_A5 = '@page{size:A5 landscape;margin:0}';
/* 3.188–3.194: 💵+🧾 Giấy lĩnh nửa trên + Bảng kê 118 × 210 (3.213) xoay ngang sát đáy → cắt 1 nhát ngang */
var GL_CSS_KEM = '.sheet-gl.gl-kem{height:297mm}.gl-bkk{position:absolute;left:0;bottom:0;width:210mm;height:118mm;z-index:1}'+
  '.gl-bkk .bk-trang{position:absolute;left:0;top:118mm;transform-origin:0 0;transform:rotate(-90deg)}'+
  '.gl-cat-n{position:absolute;left:0;width:210mm;bottom:118mm;height:.3mm;margin-bottom:-.15mm;background:repeating-linear-gradient(to right,#8c8c8c 0 2.6mm,transparent 2.6mm 4.8mm);-webkit-print-color-adjust:exact;print-color-adjust:exact}'+
  '.gl-cat-n::before{content:"";position:absolute;left:4mm;top:50%;width:4.2mm;height:4.2mm;transform:translateY(-50%);background:#fff url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%23555%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%3E%3Ccircle%20cx%3D%276%27%20cy%3D%276%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%276%27%20cy%3D%2718%27%20r%3D%273%27%2F%3E%3Cpath%20d%3D%27M8.1%208.1L20%2020M8.1%2015.9L20%204%27%2F%3E%3C%2Fsvg%3E") center/contain no-repeat;-webkit-print-color-adjust:exact;print-color-adjust:exact}'+
  '@media print{.sheet-gl.gl-a4.gl-kem{height:296mm}}';
var GL_CSS_A4 = '@page{size:A4 portrait;margin:0}@media print{.sheet-gl.gl-a4{height:147mm}.sheet-gl.gl-a4.gl-x2{height:296mm}}';

/* 3.201 (anh chốt 14/10): BỎ HẲN danh mục tổ tự lập (D.cauHinh.dmTo / dmTK104 cũ để nguyên, không dùng). TK 104 tổ trưởng = Sao kê TK 104 ghép Mã CIF TT;
   điểm GD = Mẫu 18 (Dư nợ chi tiết) / DSTO; TK 104 · TK 105 cần đóng: js/28-tv-tk.js. */

/* ---------- ⚙ Khai báo chung ---------- */
function gdxKBChung(tab){ hsoKBHop(tab || 'cb'); }   /* 3.222 (anh 16/10, PA B): ⚙ Khai báo đơn vị dùng chung mọi tab — tab Giao dịch xã mở ở 👤 Cán bộ */

/* ---------- 📜 Nhật ký in: chỉ lưu lựa chọn (không lưu PDF), trên máy này, tự xóa sau 1 tháng (anh chốt) ---------- */
var GDX_NK = 'tuhoso_gdx_nhatky';
function gdxNKDs(){ var a = []; try { a = JSON.parse(localStorage.getItem(GDX_NK) || '[]') || []; } catch(e){ a = []; } var han = Date.now() - 30*864e5; return a.filter(function(x){ return x && new Date(x.luc).getTime() > han; }); }
function gdxNKGhi(a){ try { localStorage.setItem(GDX_NK, JSON.stringify(a)); } catch(e){} }
function gdxNKThem(X){ var a = gdxNKDs(), tom = gdxTom().chip.map(function(x){ return x.chu; }).join(' · ');
  a.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2, 6), luc:new Date().toISOString(), mau:X.mau, tom:tom, X:X}); gdxNKGhi(a.slice(0, 400)); }
function gdxNKMo(){
  var a = gdxNKDs(); gdxNKGhi(a);
  var ten = {}; GDX_MAU.forEach(function(m){ ten[m.k] = m.bt+' '+m.ma; });
  moHop('<div class="hop-tit" id="gdx-nk">📜 Nhật ký in — 1 tháng gần nhất ('+a.length+')</div><div class="hop-phu">Mỗi lần in app lưu lại lựa chọn (không lưu file PDF) trên máy này; quá 1 tháng tự xóa. Bấm 🖨 In lại → đúng bản đã in (kể cả ngày ký cũ).</div>'+
    (a.length ? '<div class="gdx-bang"><table><tr><th>Lúc in</th><th>Mẫu</th><th>Nội dung</th><th></th></tr>'+a.map(function(x){ var d = new Date(x.luc);
      return '<tr><td>'+ngayVN(ngayISO(d))+' '+String(d.getHours()).padStart(2, '0')+':'+String(d.getMinutes()).padStart(2, '0')+'</td><td>'+(ten[x.mau]||x.mau)+'</td><td>'+gdxE(x.tom)+'</td>'+
        '<td class="gdx-nk-nut"><button class="nho chinh" onclick="gdxNKIn(\''+x.id+'\')">🖨 In lại</button><button class="nho" onclick="gdxNKIn(\''+x.id+'\', 1)">📄 PDF</button><button class="nho" onclick="gdxNKXoa(\''+x.id+'\')" title="Xóa dòng này">×</button></td></tr>'; }).join('')+'</table></div>'
      : '<div class="sl-phu">Chưa có lần in nào.</div>')+
    '<div class="hang-nut">'+(a.length ? '<button class="nho" onclick="gdxNKXoa(\'*\')">🗑 Xóa hết</button>' : '')+'<button class="nho chinh" onclick="dongHop()">Đóng</button></div>', true);
}
function gdxNKIn(id, pdf){ var x = gdxNKDs().find(function(o){ return o.id===id; }); if(!x) return bao('Không còn bản này.'); gdxInBan(x.X, pdf); }
function gdxNKXoa(id){ gdxNKGhi(id==='*' ? [] : gdxNKDs().filter(function(o){ return o.id!==id; })); gdxNKMo(); }

/* ---------- ⭐ Mẫu hay in (số hộ + số tiền) · mức tiền · danh sách cán bộ — giữ từ 3.172 ---------- */
function gdxChonTien(a){ var C = gdxC(); C.soTien = gdxTien(a); gdxLuu(); gdxVe(); }
function gdxThemMuc(v){
  var num = parseInt(String(v||'').replace(/[^\d]/g, ''), 10), C = gdxC(); if(isNaN(num) || num <= 0) return false;
  if(C.quickAmounts.indexOf(num)>=0){ bao('Mức tiền này đã có trong danh sách!'); return false; }
  C.quickAmounts.push(num); C.quickAmounts.sort(function(a, b){ return a - b; }); gdxLuu(); gdxVe(); bao('Đã thêm '+gdxTien(num)+' đ vào danh sách hay dùng'); return true;
}
function gdxThemMucO(){ var o = document.getElementById('gdx-mucmoi'); if(o && gdxThemMuc(o.value)){ var n = document.getElementById('gdx-mucmoi'); if(n) n.focus(); } }
function gdxBoMuc(i){ gdxC().quickAmounts.splice(i, 1); gdxLuu(); gdxVe(); }
function gdxLuuMauHay(){
  var C = gdxC(), h = parseInt(C.soNguoi, 10), t = parseInt(String(C.soTien||'').replace(/[^\d]/g, ''), 10);
  if(!(h > 0) || !(t > 0)) return bao('Nhập số hộ và số tiền trước.');
  if(C.mauHay.some(function(m){ return m.h===h && m.t===t; })) return bao('Chip này đã có.');
  C.mauHay.push({h:h, t:t}); C.mauHay.sort(function(a, b){ return a.h - b.h || a.t - b.t; }); gdxLuu(); gdxVe(); bao('Đã lưu chip '+gdxSoNguoi(h)+' hộ · '+gdxTien(t));
}
function gdxMauHay(i, inNgay){ var C = gdxC(), m = C.mauHay[i]; if(!m) return; C.soNguoi = String(m.h); C.soTien = gdxTien(m.t); gdxLuu(); gdxVe(); if(inNgay) gdxIn(); }
function gdxBoMauHay(i){ gdxC().mauHay.splice(i, 1); gdxLuu(); gdxVe(); }
function gdxCanBoHTML(){
  var C = gdxC();
  return '<div class="gdx-khoi"><div class="gdx-nh">👥 Danh sách cán bộ ngân hàng <small>(chọn ở ô sổ xuống của các mẫu)</small></div><div class="gdx-chips">'+
    (C.danhSachCanBo.length ? C.danhSachCanBo.map(function(n, i){ return '<span class="gdx-the">'+gdxE(n)+' <a onclick="gdxBoCanBo('+i+')" title="Xóa cán bộ này">×</a></span>'; }).join('') : '<i class="gdx-trong">Chưa có cán bộ nào</i>')+'</div>'+
    '<span class="gdx-hang"><input id="gdx-cbmoi" class="gdx-i" placeholder="Họ và tên cán bộ" onkeydown="if(event.key===\'Enter\'){event.preventDefault();gdxThemCanBo();}"><button class="nho chinh" onclick="gdxThemCanBo()">+ Thêm</button></span></div>';
}
function gdxThemCanBo(){ var o = document.getElementById('gdx-cbmoi'), v = o ? o.value.trim() : '', C = gdxC(); if(!v) return;
  if(C.danhSachCanBo.indexOf(v)>=0) return bao('Cán bộ này đã có trong danh sách!');
  C.danhSachCanBo.push(v); gdxLuu(); if(gdxHopMo('gdx-kbc')) gdxKBChung(); gdxVeTrai(); var n = document.getElementById('gdx-cbmoi'); if(n) n.focus(); }
function gdxBoCanBo(i){ gdxC().danhSachCanBo.splice(i, 1); gdxLuu(); if(gdxHopMo('gdx-kbc')) gdxKBChung(); gdxVeTrai(); }
function gdxMacDinh(){
  hoi('Khôi phục thông tin mẫu ban đầu?', 'Đưa các ô khai báo 04/TD về mặc định (tên NH, PGD, địa danh, giờ phát, chức danh). Giữ nguyên danh sách cán bộ, mức tiền, ⭐ chip số hộ · số tiền.', 'Khôi phục', function(){
    var C = gdxC(); ['donViTren','donViDuoi','tenPGDTrongVanBan','diaDanh','gioPhatTien','chucDanhDuyet','chucPGD','diaDiemPGD'].forEach(function(k){ C[k] = GDX_MD[k]; });
    luu(); gdxVeTrai(); bao('Đã khôi phục thông tin mẫu ban đầu');
  });
}
function gdxDat12Diem(ma, im){ var C = gdxC(), d = gdxDiem(ma); C.m12SelectedDiem = ma || ''; if(d){ var n = gdxNgayToi(d.ngayGD, 1)[0]; if(n) C.m12NgayGD = n; } gdxLuu(); if(!im) gdxVeTrai(); }
