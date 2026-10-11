/* ===== 3.172 (anh chốt 11/10/2026): 🏢 GIAO DỊCH XÃ — in nhanh 04/TD + 12/GDX, KHÔNG cần số liệu hộ vay =====
   - Mẫu in chép NGUYÊN khuôn file HTML anh đã in thử đúng mẫu thật (gdxHTML04 / gdxHTML12 + GDX_CSS — chuyển tự động từ file gốc, không sửa bố cục).
     Xem trước và in trong khung riêng (iframe) nên CSS của app không đụng vào mẫu.
   - Giữ đủ khai báo / tùy chọn của file (GQVL, mức tiền hay dùng, danh sách cán bộ, số dòng 12/GDX, tên tổ trưởng trắng / in sẵn, Phần II…);
     bỏ In hàng loạt (anh chốt) → ⭐ Mẫu hay in (số hộ + số tiền lưu sẵn, bấm là in).
   - Điểm GD / tổ lấy từ Cài đặt › Địa bàn (danh mục anh khai — không phải số liệu hộ vay). Khai báo lưu D.cauHinh.gdx (đồng bộ Drive).
   - Kiểm tra trước đợt: tự đề xuất điểm có ngày GD gần nhất (giao dịch cả ngày nghỉ — không dời ngày); nơi giải ngân tại điểm GD / tại PGD.
   - Tên UBND trong câu đề nghị ghi đầy đủ, không viết tắt (anh chốt). */
var GDX_MD = {
  donViTren:'NHCSXH TỈNH TÂY NINH', donViDuoi:'PGD GÒ DẦU', tenPGDTrongVanBan:'Phòng giao dịch NHCSXH Gò Dầu', diaDanh:'Gò Dầu',
  ngayThongBao:'', kinhGui:'', tenUBNDVietTat:'', gioPhatTien:'9 giờ 30 phút', ngayPhatTien:'', diaDiemPhatTien:'',
  nguoiLap:'', chucDanhDuyet:'Giám Đốc', quickAmounts:[20000000, 30000000, 50000000, 80000000, 90000000, 100000000], isGQVL:false, danhSachCanBo:[],
  mauHay:[], noiGN:'diem', ma04:'', xa04:'', ngayPhatISO:'', gioDiem:'', gioPGD:'', diaDiemPGD:'Phòng giao dịch NHCSXH Gò Dầu', dotXN:'',
  m12DonVi1:'NGÂN HÀNG CHÍNH SÁCH XÃ HỘI', m12DonVi2:'PHÒNG GIAO DỊCH GÒ DẦU - CHI NHÁNH TÂY NINH',
  m12SelectedDiem:'', m12NgayGD:'', m12TenToOption:'blank', m12GDV:'', m12KSV:'', m12ToTruong:'', m12HinhThucTieuHuy:'cắt nhỏ', m12SoLuongTieuHuy:'',
  m12TimeMode:'blank', m12PrefillGio:'11 giờ 30 phút', m12PrefillNgay:'', m12NumRows:12,
  form:'m04', tab04:'don', soNguoi:'1', soTien:'80.000.000'
};
var GDX = {zoom:0, dotHoi:0};   /* lần làm việc: zoom (0 = vừa khung), đã hỏi kiểm tra đợt chưa */
function gdxC(){
  var c = D.cauHinh.gdx = D.cauHinh.gdx || {};
  Object.keys(GDX_MD).forEach(function(k){ if(c[k]===undefined) c[k] = JSON.parse(JSON.stringify(GDX_MD[k])); });
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

/* ---------- điểm GD · tổ: Cài đặt › Địa bàn ---------- */
function gdxDsDiem(){
  var r = [];
  (D.cauHinh.diaBan||[]).forEach(function(x){ (x.diem||[]).forEach(function(d){
    var to = [];
    (d.ap||[]).forEach(function(a){ (a.to||[]).forEach(function(t){
      if(typeof t==='string'){ var s = t.split('|'); to.push({maTo:(s[0]||'').trim(), tenTo:(s[1]||s[0]||'').trim(), tenAp:a.ten}); }
      else to.push({maTo:t.ma||'', tenTo:t.ten||'', tenAp:a.ten});
    }); });
    r.push({maXa:x.ma||'', tenXa:x.xa||'', maDiem:d.ma||'', tenDiem:d.ten||'', ngayGD:d.ngay||'', to:to});
  }); });
  return r;
}
function gdxDiem(ma){ return gdxDsDiem().find(function(d){ return d.maDiem===ma; }) || null; }
function gdxDsXa(){ return (D.cauHinh.diaBan||[]).map(function(x){ return x.xa; }).filter(Boolean); }
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
  var d = gdxNgay(C.ngayThongBao);
  var soNguoiFormatted = gdxSoNguoi(data.soNguoi);
  var soTienFormatted = gdxTien(data.soTien);
  var bangChuFormatted = gdxDocTien(data.soTien);
  var isGQVL = C.isGQVL || false;
  var targetTerm = isGQVL ? 'người lao động' : 'người';
  var targetPlural = isGQVL ? 'những người lao động' : 'những người';
  var appConfig = {};
  ['donViTren','donViDuoi','diaDanh','kinhGui','tenPGDTrongVanBan','gioPhatTien','ngayPhatTien','diaDiemPhatTien','tenUBNDVietTat','nguoiLap','chucDanhDuyet'].forEach(function(k){ appConfig[k] = gdxE(C[k]); });
  return '\n        <div class="doc-body-inner sheet-m04">\n          <table class="doc-header-table" style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 8px;">\n            <tr>\n              <!-- Cột 1: Tên cơ quan canh đều đối xứng và có gạch dưới tầm 1/2 chữ -->\n              <td style="width: 34%; text-align: center; vertical-align: top; border: none; padding: 0 4px 0 0;">\n                <div class="org-box">\n                  <div class="org-level-1" style="font-size:11.5pt; font-weight:bold; white-space:nowrap;">'+
    (appConfig.donViTren)+
    '</div>\n                  <div class="org-level-2" style="font-size:11.5pt; font-weight:bold; white-space:nowrap; margin-top:2px;">'+
    (appConfig.donViDuoi)+
    '</div>\n                  <div class="org-line" style="width:50%; height:0; border-bottom:1.2px solid #000000 !important; margin:3px auto 0 auto;"></div>\n                </div>\n              </td>\n              <!-- Cột 2: Tiêu ngữ canh đều, gạch dưới ngắn vừa đúng chiều dài chữ và sát chữ -->\n              <td style="width: 46%; text-align: center; vertical-align: top; border: none; padding: 0 4px 0 8px;">\n                <div style="text-align:center;">\n                  <div class="nation-title" style="font-size:12pt; font-weight:bold; white-space:nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>\n                  <!-- Khối riêng biệt chỉ ôm vừa khít dòng chữ Độc lập - Tự do - Hạnh phúc -->\n                  <div style="display:inline-block; text-align:center; margin-top:2px;">\n                    <div class="nation-motto" style="font-size:12pt; font-weight:bold; white-space:nowrap;">Độc lập – Tự do – Hạnh phúc</div>\n                    <!-- Đường kẻ ngắn vừa khít chiều dài của dòng Độc lập – Tự do – Hạnh phúc -->\n                    <div class="nation-motto-line" style="width:100%; height:0; border-bottom:1.5px solid #000000 !important; margin:1.5px auto 0 auto;"></div>\n                  </div>\n                </div>\n              </td>\n              <!-- Cột 3: Số hiệu văn bản rộng rãi, white-space: nowrap đảm bảo không rớt chữ NH -->\n              <td style="width: 20%; text-align: right; vertical-align: top; border: none; padding: 0 0 0 2px;">\n                <div class="form-id-badge" style="text-align: right; font-size: 9pt; white-space: nowrap;">\n                  <div><em>Mẫu số 04/TD</em></div>\n                  <div><em>Lập 02 liên</em></div>\n                  <div><em style="white-space:nowrap;">- 01 liên lưu tổ</em></div>\n                  <div><em style="white-space:nowrap;">- 01 liên lưu NH</em></div>\n                </div>\n              </td>\n            </tr>\n          </table>\n\n          <div class="doc-date">\n            <em>'+
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
    (appConfig.tenPGDTrongVanBan)+
    ' thông báo kết quả phê duyệt cho vay như sau:\n          </div>\n\n          <div class="doc-li">\n            1. Tổng số '+
    (targetTerm)+
    ' được vay vốn đợt này (kèm danh sách mẫu 03/TD nếu có): '+
    (soNguoiFormatted)+
    ' '+
    (targetTerm)+
    '.\n          </div>\n          <div class="doc-li doc-li-sub">\n            Số tiền: '+
    (soTienFormatted)+
    ' đồng. Bằng chữ: '+
    (bangChuFormatted)+
    '\n          </div>\n\n          <div class="doc-li">\n            2. Số '+
    (targetTerm)+
    ' chưa được vay vốn đợt này: <span class="dots-fine">....................................</span> <span style="white-space:nowrap;">'+
    (targetTerm)+
    '.</span>\n          </div>\n          <div class="doc-li doc-li-sub">\n            - Có số thứ tự trong danh sách là:<span class="dots-fine">...............................................................</span>\n          </div>\n          <div class="doc-li doc-li-sub">\n            - Số tiền: <span class="dots-fine">..........................................................................................</span> đồng.\n          </div>\n\n          <div class="doc-li">\n            3. Lịch phát tiền vay vào '+
    (appConfig.gioPhatTien)+
    ', '+
    (appConfig.ngayPhatTien)+
    ', tại địa điểm:\n          </div>\n          <div class="doc-li doc-li-sub" style="padding-left:0; margin-top:2px;">\n            '+
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
function gdxHTML12(C){
  var d = gdxDiem(C.m12SelectedDiem) || {tenDiem:'', maDiem:'', tenXa:'', to:[]};
  var dParts = gdxNgay(C.m12NgayGD);
  var gdvName = gdxE(C.m12GDV), ksvName = gdxE(C.m12KSV), toTruongGDName = gdxE(C.m12ToTruong);
  var hinhThucTH = gdxE(String(C.m12HinhThucTieuHuy||'').trim() || 'cắt nhỏ');
  var slTH = gdxE(String(C.m12SoLuongTieuHuy||'').trim() || '……………………………');
  var tgTH_text = '…….. giờ…… phút, ngày …../ …../……….';
  if(C.m12TimeMode === 'prefill'){
    var gioVal = String(C.m12PrefillGio||'').trim() || '11 giờ 30 phút';
    var ngayVal = String(C.m12PrefillNgay||'').trim() || (dParts.day+'/'+dParts.month+'/'+dParts.year);
    tgTH_text = gdxE(gioVal+', ngày '+ngayVal);
  }
  var rdoTenTo = C.m12TenToOption || 'blank';
  var numRows = parseInt(C.m12NumRows, 10); if(isNaN(numRows) || numRows < 5) numRows = 12;
  /* tự co chiều cao dòng + cỡ chữ để luôn trọn 1 trang A4 (nguyên bảng mức của file gốc) */
  var rowHeight = 36, tableFont = '12pt', thFont = '11.5pt', docMainFont = '13.5pt', sigBlankHeight = 52, padVertical = '6px';
  if(numRows <= 10){ rowHeight = 40; tableFont = '12.5pt'; thFont = '12pt'; docMainFont = '13.5pt'; sigBlankHeight = 70; padVertical = '7px'; }
  else if(numRows <= 12){ rowHeight = 36; tableFont = '12pt'; thFont = '11.5pt'; docMainFont = '13.5pt'; sigBlankHeight = 65; padVertical = '6px'; }
  else if(numRows <= 15){ rowHeight = 30; tableFont = '11pt'; thFont = '11pt'; docMainFont = '13pt'; sigBlankHeight = 58; padVertical = '4.5px'; }
  else if(numRows <= 20){ rowHeight = 24; tableFont = '10pt'; thFont = '10pt'; docMainFont = '12pt'; sigBlankHeight = 38; padVertical = '3px'; }
  else if(numRows <= 28){ rowHeight = 19; tableFont = '9.5pt'; thFont = '9.5pt'; docMainFont = '11.5pt'; sigBlankHeight = 32; padVertical = '2px'; }
  else { rowHeight = 16; tableFont = '9pt'; thFont = '9pt'; docMainFont = '10.5pt'; sigBlankHeight = 26; padVertical = '1px'; }
  var tos = d.to || [], rowsHtml = '';
  for(var i = 1; i <= numRows; i++){
    var toInfo = tos[i - 1], tenToTruong = '';
    if(rdoTenTo === 'fill' && toInfo) tenToTruong = gdxE(toInfo.tenTo);
    rowsHtml += '\n          <tr style="height:'+(rowHeight)+'px;">\n            <td class="col-stt" style="padding:'+(padVertical)+' 2px; text-align:center;">'+(i)+'</td>\n            <td class="col-name" style="padding:'+(padVertical)+' 5px;">'+(tenToTruong)+'</td>\n            <td class="col-num" style="padding:'+(padVertical)+' 2px;"></td>\n            <td class="col-num" style="padding:'+(padVertical)+' 2px;"></td>\n            <td class="col-num" style="padding:'+(padVertical)+' 2px;"></td>\n            <td style="padding:'+(padVertical)+' 2px; width:75px;"></td>\n            <td style="padding:'+(padVertical)+' 2px; width:75px;"></td>\n          </tr>\n        ';
  }
  var tx = String(d.tenXa||'');
  var prefixXaPhuong = /^Phường/.test(tx) ? 'Phường: '+gdxE(tx.replace('Phường ', '')) : 'Xã: '+gdxE(tx.replace('Xã ', ''));
  d = {tenDiem:gdxE(d.tenDiem), maDiem:gdxE(d.maDiem)};
  return '\n        <div class="sheet-a4 sheet-m12" style="font-family:\'Times New Roman\', Times, serif; font-size:'+
    (docMainFont)+
    '; line-height:1.25;">\n          <!-- Header M12: Dòng trên nằm giữa dòng dưới và có 1 làn gạch mảnh 1/3 dòng dưới -->\n          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">\n            <div style="display:inline-block; text-align:center;">\n              <div style="font-size:11.5pt; font-weight:bold; white-space:nowrap;">'+(gdxE(C.m12DonVi1))+'</div>\n              <div style="font-size:11.5pt; font-weight:bold; white-space:nowrap; margin-top:2px;">'+(gdxE(C.m12DonVi2))+'</div>\n              <!-- Nét gạch mảnh dài đúng 1/3 dòng dưới, căn giữa -->\n              <div style="width:33%; height:0; border-bottom:1.3px solid #000000 !important; margin:3px auto 0 auto; -webkit-print-color-adjust:exact; print-color-adjust:exact;"></div>\n            </div>\n            <div style="text-align:right;">\n              <div style="font-size:11pt; font-style:italic; white-space:nowrap;">Mẫu số 12/GDX</div>\n            </div>\n          </div>\n\n          <!-- Tiêu đề -->\n          <div style="text-align:center; margin:8px 0 5px 0;">\n            <div style="font-size:15pt; font-weight:bold; text-transform:uppercase;">BẢNG KÊ GIAO, NHẬN, TIÊU HỦY BIÊN LAI</div>\n            <div style="font-size:12.5pt; font-style:italic; margin-top:2px;">\n              Ngày '+
    (dParts.day)+
    ' tháng '+
    (dParts.month)+
    ' năm '+
    (dParts.year)+
    '\n            </div>\n          </div>\n\n          <!-- Điểm giao dịch & Mã điểm -->\n          <div style="display:flex; justify-content:space-between; margin-bottom:2px; font-size:13pt;">\n            <div><b>Điểm giao dịch:</b> '+
    (d.tenDiem)+
    '</div>\n            <div><b>Mã điểm giao dịch:</b> '+
    (d.maDiem)+
    '</div>\n          </div>\n          <div style="margin-bottom:6px; font-size:13pt;">\n            <b>'+
    (prefixXaPhuong)+
    '</b>\n          </div>\n\n          <!-- PHẦN I: GIAO - NHẬN BIÊN LAI -->\n          <div style="font-weight:bold; font-size:13pt; margin-top:3px;">PHẦN I. GIAO - NHẬN BIÊN LAI</div>\n          <div style="margin-top:2px; margin-bottom:4px; font-size:12.5pt;">\n            Giao dịch viên: '+
    (gdvName || '<span class="dots-fine">……………………………………………</span>')+
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
    (sigBlankHeight)+
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
var GDX_CSS = ':root{--text:#263238;--bg-page:#eceff1}'+'*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;color:var(--text);background-color:var(--bg-page);line-height:1.5;min-height:100vh;display:flex;flex-direction:column}.preview-stage{background:#455a64;border-radius:8px;padding:24px;overflow-x:auto;display:flex;justify-content:center;box-shadow:inset 0 2px 8px rgba(0,0,0,0.25)}.sheet-a4{background:#ffffff;width:210mm;min-height:297mm;padding:18mm 18mm 18mm 25mm;box-shadow:0 8px 24px rgba(0,0,0,0.35);font-family:"Times New Roman",Times,serif;color:#000000;font-size:14pt;line-height:1.35;position:relative;margin-bottom:20px}.sheet-m04{font-family:"Times New Roman",Times,serif !important;font-size:14pt !important;line-height:1.35 !important}.sheet-m04 .doc-heading-1{font-size:15pt !important}.sheet-m04 .doc-heading-2{font-size:16pt !important}.sheet-m04 .doc-send-to{font-size:14pt !important;padding-left:2.8cm !important}.sheet-m04 .doc-date{font-size:13.5pt !important}.sheet-m04 .sig-title,.sheet-m04 .sig-signer{font-size:14pt !important}.sheet-m04 .sig-guide{font-size:12.5pt !important}table.doc-header-table{width:100%;border-collapse:collapse;border:none;margin-bottom:8px}table.doc-header-table td{border:none;padding:0 4px}.org-level-1{font-size:11.5pt;font-weight:bold;text-transform:uppercase;line-height:1.25}.org-level-2{font-size:11.5pt;font-weight:bold;text-transform:uppercase;margin-top:2px;line-height:1.25}.nation-title{font-size:11.5pt;font-weight:bold;text-transform:uppercase;white-space:nowrap;letter-spacing:-0.2px;line-height:1.25}.nation-motto{font-size:11.5pt;font-weight:bold;margin-top:2px;line-height:1.25}.nation-motto-line{width:65%;height:0 !important;border-bottom:1.5px solid #000000 !important;margin:1.5px auto 0 auto;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}.form-id-badge{font-size:9pt;font-style:italic;line-height:1.25;text-align:right}.doc-date{text-align:right;font-style:italic;font-size:12.5pt;margin-top:10px;margin-bottom:12px;padding-right:15px}.doc-heading{text-align:center;margin:14px 0}.doc-heading-1{font-size:14pt;font-weight:bold;text-transform:uppercase}.doc-heading-2{font-size:15pt;font-weight:bold;text-transform:uppercase;margin-top:3px}.doc-send-to{margin-bottom:10px;font-size:13pt;padding-left:2.8cm}.send-to-label{font-weight:bold;text-decoration:underline}.doc-p-intro{text-align:justify;text-indent:1.27cm;margin-bottom:8px}.doc-li{margin-bottom:6px;text-align:justify}.doc-li-sub{padding-left:20px;margin-top:3px}.doc-p-closing{text-align:justify;text-indent:1.27cm;margin-top:12px;margin-bottom:20px}.doc-signatures{display:grid;grid-template-columns:1fr 1fr;text-align:center;margin-top:22px;page-break-inside:avoid}.sig-title{font-weight:bold;font-size:13pt}.sig-guide{font-style:italic;font-size:11.5pt;margin-top:2px}.sig-blank{height:85px}.sig-signer{font-weight:bold;font-size:13pt}.sheet-m12{padding:12mm 15mm 12mm 18mm !important;font-size:10.5pt !important;line-height:1.25 !important}.m12-table{width:100%;border-collapse:collapse;margin-top:6px;margin-bottom:8px;font-size:9pt}.m12-table th,.m12-table td{border:1px solid #000000;padding:3.5px 4px;vertical-align:middle}.m12-table th{text-align:center;font-weight:bold;background:#fafafa}.m12-table td.col-stt{text-align:center;width:28px}.m12-table td.col-name{width:155px}.m12-table td.col-num{text-align:center;width:55px}.m12-signatures{display:grid;grid-template-columns:1fr 1.2fr 1fr;text-align:center;margin-top:14px;page-break-inside:avoid}.m12-signatures .sig-title{font-size:10.5pt}.m12-signatures .sig-guide{font-size:9.5pt}.m12-signatures .sig-blank{height:48px}@media print{body{background:#ffffff !important;color:#000000 !important;margin:0 !important;padding:0 !important}header.app-header,.control-sidebar,.preview-action-bar,.toast-box{display:none !important}.app-body{display:block !important;padding:0 !important;margin:0 !important;max-width:none !important}.preview-wrapper{display:block !important}.preview-stage{background:transparent !important;padding:0 !important;box-shadow:none !important;display:block !important}.sheet-a4{box-shadow:none !important;margin:0 !important;width:100% !important;min-height:auto !important;padding:15mm 15mm 15mm 20mm !important;page-break-after:always;break-after:page}.sheet-m12{padding:10mm 12mm 10mm 15mm !important}.sheet-a4:last-child{page-break-after:auto !important;break-after:auto !important}*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}.nation-motto-line{border-bottom:1.5px solid #000000 !important;display:block !important;visibility:visible !important}@page{size:A4 portrait;margin:0}}.dots-fine{font-size:10.5pt !important;font-weight:300 !important;letter-spacing:1.5px !important;color:#333333 !important;display:inline !important}'+'@media print{.sheet-a4{zoom:1 !important}}';
function gdxTrang(than){
  return '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>In</title><style>'+GDX_CSS+'</style></head><body><div class="preview-stage"><div id="printRoot">'+than+'</div></div></body></html>';
}
function gdxThan(){
  var C = gdxC();
  if(C.form==='m12') return gdxHTML12(C);
  var x = {soNguoi:C.soNguoi || 1, soTien:C.soTien || '80.000.000'}, m = '<div class="sheet-a4">'+gdxHTML04(x, C)+'</div>';
  return m+m;   /* 1 lần in 2 bản giống nhau (1 lưu tổ, 1 lưu NH) — như file gốc */
}

/* ---------- GIAO DIỆN TAB ---------- */
function veGDX(){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = gdxC();
  e.innerHTML = slTabConHTML()+
    '<div class="th-bo th-bo2 gdx-bo"><div class="th-cot gdx-trai" id="gdx-trai">'+gdxTraiHTML()+'</div>'+
    '<div class="th-cot th-xem"><div class="gdx-thanh" id="gdx-thanh">'+gdxThanhHTML()+'</div><iframe id="gdx-khung" class="to-khung th-khung" title="Xem trước"></iframe></div></div>';
  gdxXem(); setTimeout(gdxVuaKhung, 0);
  if(C.form==='m04' && !GDX.dotHoi && gdxDotCu()){ GDX.dotHoi = 1; setTimeout(gdxKiemDot, 60); }
}
function gdxVuaKhung(){ var f = document.getElementById('gdx-khung'); if(!f || !f.offsetParent) return; f.style.height = Math.max(360, window.innerHeight - f.getBoundingClientRect().top - 22)+'px'; gdxXem(); }
window.addEventListener('resize', function(){ if(document.getElementById('gdx-khung')){ clearTimeout(window.__gdxVua); window.__gdxVua = setTimeout(gdxVuaKhung, 150); } });
function gdxVeTrai(){ var e = document.getElementById('gdx-trai'); if(e) e.innerHTML = gdxTraiHTML(); var t = document.getElementById('gdx-thanh'); if(t) t.innerHTML = gdxThanhHTML(); gdxXem(); }
/* khung xem: zoom 0 = vừa bề ngang khung (chỉ khung xem; khi in luôn 100%) */
function gdxXem(){
  var f = document.getElementById('gdx-khung'); if(!f) return;
  var d = f.contentDocument; if(!d) return;
  d.open(); d.write(gdxTrang(gdxThan())); d.close();
  var z = GDX.zoom || Math.min(1, Math.max(0.3, (f.clientWidth - 52) / 800));
  Array.prototype.forEach.call(d.querySelectorAll('.sheet-a4'), function(s){ s.style.zoom = z; });
  var b = document.getElementById('gdx-zoom'); if(b) b.textContent = Math.round(z*100)+'%';
  var c = document.getElementById('gdx-chu'); if(c) c.textContent = gdxDocTien(gdxC().soTien) || '—';
}
function gdxZoom(k){ var f = document.getElementById('gdx-khung'), z0 = GDX.zoom || Math.min(1, Math.max(0.3, ((f ? f.clientWidth : 800) - 52) / 800));
  GDX.zoom = k===0 ? 1 : Math.round(Math.min(1.4, Math.max(0.3, z0 + k*0.1))*10)/10; gdxXem(); }
function gdxIn(){
  var C = gdxC();
  if(C.form==='m04' && !C.dotXN){ return gdxKiemDot(true); }
  gdxXem();
  var f = document.getElementById('gdx-khung'); if(!f) return;
  Array.prototype.forEach.call(f.contentDocument.querySelectorAll('.sheet-a4'), function(s){ s.style.zoom = ''; });
  setTimeout(function(){ try{ f.contentWindow.focus(); f.contentWindow.print(); }catch(er){ baoLoi('Không in được: '+er.message); } setTimeout(gdxXem, 300); }, 150);
}
function gdxThanhHTML(){
  var C = gdxC(), m04 = C.form!=='m12';
  return '<span class="gdx-nhan">'+(m04 ? '🖨 In 1 lần 2 bản (1 mặt: 1 lưu Tổ, 1 lưu NH)' : '📋 Bảng kê giao nhận tiêu hủy biên lai (12/GDX · A4 dọc)')+'</span>'+
    (m04 ? '<label class="gdx-gqvl"><input type="checkbox"'+(C.isGQVL ? ' checked' : '')+' onchange="gdxGQVL(this.checked)"> Chương trình GQVL (người lao động)</label>' : '')+
    '<span class="gdx-zoom"><button class="nho" onclick="gdxZoom(-1)" title="Thu nhỏ khung xem">🔍−</button><button class="nho" id="gdx-zoom" onclick="gdxZoom(0)" title="Về 100%">100%</button><button class="nho" onclick="gdxZoom(1)" title="Phóng to khung xem">🔍+</button></span>'+
    '<button class="nho chinh" onclick="gdxIn()">🖨 In trang này</button>';
}
function gdxTraiHTML(){
  var C = gdxC();
  var h = '<div class="gdx-mau"><button class="'+(C.form!=='m12' ? 'bat' : '')+'" onclick="gdxDoiMau(\'m04\')">📢 Mẫu 04/TD — Thông báo phê duyệt</button>'+
    '<button class="'+(C.form==='m12' ? 'bat' : '')+'" onclick="gdxDoiMau(\'m12\')">📋 Mẫu 12/GDX — Bảng kê biên lai</button></div>';
  if(!gdxDsDiem().length) h += '<div class="sl-bao vang">Chưa có danh mục điểm giao dịch — khai ở <a class="lk" onclick="moCaiDat(\'diaban\')">Cài đặt › Địa bàn</a>. Vẫn in được, ô điểm để trống.</div>';
  return h + (C.form==='m12' ? gdx12HTML() : gdx04HTML());
}
function gdxDoiMau(f){ var C = gdxC(); C.form = f; gdxLuu(); gdxVeTrai(); if(f==='m04' && !GDX.dotHoi && gdxDotCu()){ GDX.dotHoi = 1; gdxKiemDot(); } }
function gdxO(nhan, k, ghi, kieu){ var C = gdxC(); return '<label class="gdx-o"><span>'+nhan+'</span><input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+gdxE(C[k])+'" oninput="gdxDat(\''+k+'\', this.value)"'+(ghi ? ' placeholder="'+gdxE(ghi)+'"' : '')+'></label>'; }
function gdxDat(k, v, ve){ var C = gdxC(); C[k] = v;
  if(k==='diaDiemPGD' && C.noiGN==='pgd') C.diaDiemPhatTien = v;
  if(k==='gioPhatTien'){ if(C.noiGN==='pgd') C.gioPGD = v; else C.gioDiem = v; }
  gdxLuu(); if(ve) gdxVeTrai(); else gdxXem(); }
function gdxDsDiemOpt(chon, trong){ return (trong ? '<option value="">'+trong+'</option>' : '')+gdxDsDiem().map(function(d){ return '<option value="'+gdxE(d.maDiem)+'"'+(d.maDiem===chon ? ' selected' : '')+'>'+gdxE(d.tenDiem+' ('+d.maDiem+' - '+d.tenXa+')')+'</option>'; }).join(''); }

/* ---------- 04/TD ---------- */
function gdx04HTML(){
  var C = gdxC(), t = C.tab04==='kb' ? 'kb' : 'don';
  var h = '<div class="gdx-tab"><button class="'+(t==='don' ? 'bat' : '')+'" onclick="gdxTab04(\'don\')">⚡ In từng hộ</button><button class="'+(t==='kb' ? 'bat' : '')+'" onclick="gdxTab04(\'kb\')">⚙️ Khai báo sẵn</button>'+
    '<button onclick="gdxKiemDot()" title="Kiểm tra khai báo trước mỗi đợt — app đề xuất ngày giao dịch gần nhất">🔄 Đợt mới</button></div>';
  return h + (t==='kb' ? gdxKB04HTML() : gdxDon04HTML());
}
function gdxTab04(t){ gdxC().tab04 = t; gdxLuu(); gdxVeTrai(); }
function gdxDotTom(){
  var C = gdxC();
  return '<div class="gdx-dot'+(C.dotXN ? '' : ' chua')+'"><b>Đợt:</b> '+gdxE(C.noiGN==='pgd' ? 'Tại PGD' : (gdxDiem(C.ma04) ? 'Điểm GD '+gdxDiem(C.ma04).tenDiem : 'chưa chọn điểm'))+
    ' · phát '+gdxE((C.gioPhatTien||'…')+', '+(C.ngayPhatTien||'…'))+' · ký '+(C.ngayThongBao ? ngayVN(C.ngayThongBao) : '…')+
    (C.dotXN ? '' : ' · <b>chưa kiểm tra</b>')+' <a class="lk" onclick="gdxKiemDot()">Kiểm tra</a></div>';
}
function gdxDon04HTML(){
  var C = gdxC();
  var h = gdxDotTom()+
    '<label class="gdx-gqvl2"><input type="checkbox"'+(C.isGQVL ? ' checked' : '')+' onchange="gdxGQVL(this.checked)"> Chương trình GQVL (đổi "người" ➔ "người lao động")</label>'+
    '<div class="gdx-nhom"><span class="gdx-nh">Nơi giải ngân:</span><label><input type="radio" name="gdx-noi"'+(C.noiGN!=='pgd' ? ' checked' : '')+' onchange="gdxDat04(\'diem\', gdxC().ma04);gdxVeTrai()"> Tại điểm GD</label>'+
    '<label><input type="radio" name="gdx-noi"'+(C.noiGN==='pgd' ? ' checked' : '')+' onchange="gdxDat04(\'pgd\', gdxC().xa04);gdxVeTrai()"> Tại PGD</label></div>'+
    (C.noiGN==='pgd'
      ? '<label class="gdx-o"><span>Xã / phường của hộ vay (kính gửi):</span><select onchange="gdxDat04(\'pgd\', this.value, true);gdxVeTrai()"><option value="">— chọn —</option>'+gdxDsXa().map(function(x){ return '<option'+(x===C.xa04 ? ' selected' : '')+'>'+gdxE(x)+'</option>'; }).join('')+'</select></label>'
      : '<label class="gdx-o"><span>Chọn nhanh Điểm giao dịch (từ danh mục Địa bàn):</span><select onchange="gdxDat04(\'diem\', this.value);gdxVeTrai()">'+gdxDsDiemOpt(C.ma04, '-- Chọn điểm để tự điền địa điểm phát tiền --')+'</select><small>Tự cập nhật địa điểm phát tiền, kính gửi, ngày giao dịch gần nhất.</small></label>');
  h += '<div class="gdx-nh">⭐ Mẫu hay in <small>(bấm tên: điền số · 🖨 in ngay)</small></div><div class="gdx-chips">'+
    (C.mauHay.length ? C.mauHay.map(function(m, i){ return '<span class="gdx-mh"><button class="nho" onclick="gdxMauHay('+i+')" title="Điền số hộ + số tiền">'+gdxSoNguoi(m.h)+' hộ · '+gdxTien(m.t)+'</button><button class="nho chinh" onclick="gdxMauHay('+i+', 1)" title="In ngay 2 bản">🖨</button><button class="nho" onclick="gdxBoMauHay('+i+')" title="Bỏ mẫu này">×</button></span>'; }).join('')
      : '<i class="gdx-trong">Chưa có — nhập số hộ, số tiền rồi bấm “+ Lưu mẫu này”</i>')+'</div>';
  h += '<label class="gdx-o"><span>1. Tổng số hộ / số người được vay:</span><span class="gdx-hang"><input type="number" min="1" max="999" id="gdx-songuoi" value="'+gdxE(C.soNguoi)+'" oninput="gdxDat(\'soNguoi\', this.value)"><button class="nho" onclick="gdxDinhDang01()">Định dạng 01</button></span></label>'+
    '<label class="gdx-o"><span>2. Số tiền phê duyệt cho vay (VNĐ): <button class="nho gdx-nho" onclick="gdxThemMuc(gdxC().soTien)" title="Thêm số tiền đang nhập vào danh sách hay dùng">+ Lưu mức này</button></span>'+
    '<input id="gdx-sotien" class="gdx-lon" value="'+gdxE(C.soTien)+'" oninput="this.value=gdxTien(this.value);gdxDat(\'soTien\', this.value)" onkeydown="if(event.key===\'Enter\'){event.preventDefault();gdxIn();}" placeholder="Ví dụ: 80.000.000"></label>'+
    '<div class="gdx-nh">Mức tiền hay dùng: <a class="lk" onclick="gdxTab04(\'kb\')">⚙️ Quản lý mức tiền</a></div><div class="gdx-chips">'+
    ((C.quickAmounts||[]).length ? C.quickAmounts.map(function(a){ return '<button class="nho gdx-chip" title="Bấm để chọn: '+gdxTien(a)+' VNĐ" onclick="gdxChonTien('+a+')">'+gdxChipTien(a)+'</button>'; }).join('') : '<i class="gdx-trong">Chưa có mức tiền nào</i>')+'</div>'+
    '<div class="gdx-nh">3. Số tiền bằng chữ (app tự đọc):</div><div class="gdx-chu" id="gdx-chu">'+gdxE(gdxDocTien(C.soTien))+'</div>'+
    '<div class="gdx-nut"><button class="nho chinh gdx-in" onclick="gdxIn()">🖨 IN THÔNG BÁO NÀY (2 BẢN 1 MẶT)</button><button class="nho" onclick="gdxLuuMauHay()">+ Lưu mẫu này vào ⭐ Mẫu hay in</button></div>';
  return h;
}
function gdxGQVL(v){ gdxC().isGQVL = !!v; gdxLuu(); gdxVeTrai(); bao(v ? 'Đã chuyển sang chương trình GQVL (người lao động)' : 'Đã chuyển về chương trình cho vay thông thường (người)'); }
function gdxDinhDang01(){ var C = gdxC(); C.soNguoi = gdxSoNguoi(C.soNguoi); gdxLuu(); var o = document.getElementById('gdx-songuoi'); if(o) o.value = C.soNguoi; gdxXem(); }
function gdxChonTien(a){ var C = gdxC(); C.soTien = gdxTien(a); gdxLuu(); var o = document.getElementById('gdx-sotien'); if(o) o.value = C.soTien; gdxXem(); }
function gdxThemMuc(v){
  var num = parseInt(String(v||'').replace(/[^\d]/g, ''), 10), C = gdxC(); if(isNaN(num) || num <= 0) return false;
  if(C.quickAmounts.indexOf(num)>=0){ bao('Mức tiền này đã có trong danh sách!'); return false; }
  C.quickAmounts.push(num); C.quickAmounts.sort(function(a, b){ return a - b; }); gdxLuu(); gdxVeTrai(); bao('Đã thêm '+gdxTien(num)+' đ vào danh sách hay dùng'); return true;
}
function gdxBoMuc(i){ gdxC().quickAmounts.splice(i, 1); gdxLuu(); gdxVeTrai(); }
/* ⭐ Mẫu hay in: {h: số hộ, t: số tiền} — dùng mãi cho các đợt sau */
function gdxLuuMauHay(){
  var C = gdxC(), h = parseInt(C.soNguoi, 10), t = parseInt(String(C.soTien||'').replace(/[^\d]/g, ''), 10);
  if(!(h > 0) || !(t > 0)) return bao('Nhập số hộ và số tiền trước.');
  if(C.mauHay.some(function(m){ return m.h===h && m.t===t; })) return bao('Mẫu này đã có.');
  C.mauHay.push({h:h, t:t}); C.mauHay.sort(function(a, b){ return a.h - b.h || a.t - b.t; }); gdxLuu(); gdxVeTrai(); bao('Đã lưu mẫu '+gdxSoNguoi(h)+' hộ · '+gdxTien(t));
}
function gdxMauHay(i, inNgay){ var C = gdxC(), m = C.mauHay[i]; if(!m) return; C.soNguoi = String(m.h); C.soTien = gdxTien(m.t); gdxLuu(); gdxVeTrai(); if(inNgay) gdxIn(); }
function gdxBoMauHay(i){ gdxC().mauHay.splice(i, 1); gdxLuu(); gdxVeTrai(); }
function gdxDoiMauHay(i, k){ var a = gdxC().mauHay, j = i + k; if(j < 0 || j >= a.length) return; var x = a[i]; a[i] = a[j]; a[j] = x; gdxLuu(); gdxVeTrai(); }
function gdxKB04HTML(){
  var C = gdxC();
  return '<div class="gdx-kb">'+
    gdxO('Tên NH cấp trên:', 'donViTren')+gdxO('Phòng giao dịch:', 'donViDuoi')+gdxO('Tên đầy đủ PGD (trong nội dung):', 'tenPGDTrongVanBan')+
    gdxO('Địa danh lập thông báo:', 'diaDanh')+gdxO('Ngày ký thông báo:', 'ngayThongBao', '', 'date')+
    gdxO('Kính gửi (Ủy ban nhân dân):', 'kinhGui')+gdxO('Tên UBND ở câu đề nghị (ghi đầy đủ):', 'tenUBNDVietTat')+
    gdxO('Giờ phát tiền (mục 3):', 'gioPhatTien', '9 giờ 30 phút')+gdxO('Ngày phát tiền (mục 3):', 'ngayPhatTien', 'ngày 07 tháng 10 năm 2026')+gdxO('Địa điểm phát tiền (mục 3):', 'diaDiemPhatTien')+
    gdxO('Địa điểm khi giải ngân tại PGD:', 'diaDiemPGD', 'Phòng giao dịch NHCSXH Gò Dầu')+
    gdxO('Người lập biểu:', 'nguoiLap')+gdxO('Chức danh duyệt:', 'chucDanhDuyet')+'</div>'+
    '<div class="gdx-khoi"><div class="gdx-nh">⭐ Mẫu hay in (số hộ + số tiền):</div>'+(C.mauHay.length ? C.mauHay.map(function(m, i){ return '<div class="gdx-dong"><span>'+gdxSoNguoi(m.h)+' hộ · '+gdxTien(m.t)+' đ</span><button class="nho" onclick="gdxDoiMauHay('+i+', -1)" title="Lên">▲</button><button class="nho" onclick="gdxDoiMauHay('+i+', 1)" title="Xuống">▼</button><button class="nho" onclick="gdxBoMauHay('+i+')" title="Bỏ">×</button></div>'; }).join('') : '<i class="gdx-trong">Chưa có — lưu ở phần In từng hộ</i>')+'</div>'+
    '<div class="gdx-khoi"><div class="gdx-nh">💰 Quản lý các mức tiền hay dùng:</div><div class="gdx-chips">'+((C.quickAmounts||[]).length ? C.quickAmounts.map(function(a, i){ return '<span class="gdx-the">'+gdxTien(a)+' đ ('+gdxChipTien(a)+') <a onclick="gdxBoMuc('+i+')" title="Xóa">×</a></span>'; }).join('') : '<i class="gdx-trong">Chưa có mức tiền nào</i>')+'</div>'+
    '<span class="gdx-hang"><input id="gdx-mucmoi" placeholder="Nhập mức tiền mới (ví dụ: 60.000.000)" oninput="this.value=gdxTien(this.value)" onkeydown="if(event.key===\'Enter\'){event.preventDefault();gdxThemMucO();}"><button class="nho chinh" onclick="gdxThemMucO()">+ Thêm</button></span></div>'+
    gdxCanBoHTML()+
    '<div class="gdx-nut"><button class="nho" onclick="gdxMacDinh()">↺ Khôi phục thông tin mẫu ban đầu</button></div><div class="sl-phu">Thông tin tự lưu khi gõ, đồng bộ Drive cùng cài đặt.</div>';
}
function gdxThemMucO(){ var o = document.getElementById('gdx-mucmoi'); if(o && gdxThemMuc(o.value)){ var n = document.getElementById('gdx-mucmoi'); if(n) n.focus(); } }
function gdxCanBoHTML(){
  var C = gdxC();
  return '<div class="gdx-khoi"><div class="gdx-nh">👥 Danh sách cán bộ giao dịch (dùng chung cho cả 2 mẫu):</div><div class="gdx-chips">'+
    (C.danhSachCanBo.length ? C.danhSachCanBo.map(function(n, i){ return '<span class="gdx-the">'+gdxE(n)+' <a onclick="gdxBoCanBo('+i+')" title="Xóa cán bộ này">×</a></span>'; }).join('') : '<i class="gdx-trong">Chưa có cán bộ nào</i>')+'</div>'+
    '<span class="gdx-hang"><input id="gdx-cbmoi" placeholder="Họ và tên cán bộ" onkeydown="if(event.key===\'Enter\'){event.preventDefault();gdxThemCanBo();}"><button class="nho chinh" onclick="gdxThemCanBo()">+ Thêm</button></span></div>';
}
function gdxThemCanBo(){ var o = document.getElementById('gdx-cbmoi'), v = o ? o.value.trim() : '', C = gdxC(); if(!v) return;
  if(C.danhSachCanBo.indexOf(v)>=0) return bao('Cán bộ này đã có trong danh sách!');
  C.danhSachCanBo.push(v); gdxLuu(); gdxVeTrai(); var n = document.getElementById('gdx-cbmoi'); if(n) n.focus(); }
function gdxBoCanBo(i){ gdxC().danhSachCanBo.splice(i, 1); gdxLuu(); gdxVeTrai(); }
function gdxMacDinh(){
  hoi('Khôi phục thông tin mẫu ban đầu?', 'Đưa các ô khai báo 04/TD về mặc định (tên NH, PGD, địa danh, giờ phát, chức danh). Giữ nguyên danh sách cán bộ, mức tiền, ⭐ Mẫu hay in.', 'Khôi phục', function(){
    var C = gdxC(); ['donViTren','donViDuoi','tenPGDTrongVanBan','diaDanh','gioPhatTien','chucDanhDuyet','diaDiemPGD'].forEach(function(k){ C[k] = GDX_MD[k]; });
    luu(); gdxVeTrai(); bao('Đã khôi phục thông tin mẫu ban đầu');
  });
}

/* ---------- Kiểm tra trước đợt ---------- */
function gdxDotCu(){ var C = gdxC(); return !C.dotXN || !C.ngayPhatISO || C.ngayPhatISO < ngayISO(nay()); }
function gdxKiemDot(inSau){
  var C = gdxC(), hom = ngayISO(nay());
  if(gdxDotCu()){   /* đợt mới: đề xuất lại */
    C.ngayThongBao = hom;
    if(C.noiGN!=='pgd'){ var g = gdxDiemGanNhat(); if(g) gdxDat04('diem', g.d.maDiem); }
    else gdxDat04('pgd', C.xa04);
  }
  GDX.inSau = !!inSau; gdxDotHop();
}
function gdxDotHop(){
  var C = gdxC(), hom = ngayISO(nay()), d = gdxDiem(C.ma04), canh = [];
  if(!C.ngayPhatISO) canh.push('Chưa có ngày phát tiền.'); else if(C.ngayPhatISO < hom) canh.push('Ngày phát tiền đã qua.');
  if(C.ngayThongBao && C.ngayPhatISO && C.ngayThongBao > C.ngayPhatISO) canh.push('Ngày ký sau ngày phát tiền.');
  if(C.noiGN!=='pgd' && !d) canh.push('Chưa chọn điểm giao dịch.');
  if(C.noiGN!=='pgd' && d && !gdxNgayToi(d.ngayGD, 1).length) canh.push('Điểm này chưa khai ngày giao dịch (Cài đặt › Địa bàn).');
  if(C.noiGN==='pgd' && !C.xa04) canh.push('Chưa chọn xã / phường (kính gửi).');
  if(!String(C.nguoiLap||'').trim()) canh.push('Thiếu người lập.');
  var ngay3 = C.noiGN!=='pgd' && d ? gdxNgayToi(d.ngayGD, 3) : [];
  var dong = function(nhan, o, cc){ return '<tr><td>'+nhan+'</td><td>'+o+'</td><td class="gdx-cc">'+(cc||'')+'</td></tr>'; };
  var h = '<div class="hop-tit">🔄 Kiểm tra khai báo trước đợt — Mẫu 04/TD</div><div class="hop-phu">App đề xuất theo ngày giao dịch gần nhất (giao dịch cả ngày nghỉ). Sửa ngay trong bảng nếu cần.</div>'+
    '<table class="gdx-kt"><tr><th>Mục</th><th>Giá trị</th><th>Căn cứ</th></tr>'+
    dong('Nơi giải ngân', '<label><input type="radio" name="gdx-knoi"'+(C.noiGN!=='pgd' ? ' checked' : '')+' onchange="gdxDat04(\'diem\', gdxC().ma04);gdxDotHop()"> Tại điểm GD</label> <label><input type="radio" name="gdx-knoi"'+(C.noiGN==='pgd' ? ' checked' : '')+' onchange="gdxDat04(\'pgd\', gdxC().xa04);gdxDotHop()"> Tại PGD</label>')+
    (C.noiGN!=='pgd'
      ? dong('Điểm GD', '<select onchange="gdxDat04(\'diem\', this.value);gdxDotHop()">'+gdxDsDiemOpt(C.ma04, '— chọn —')+'</select>', d ? 'Địa bàn · GD ngày '+gdxE(d.ngayGD)+' hằng tháng' : 'Địa bàn')+
        dong('Ngày phát tiền', ngay3.map(function(n){ return '<label class="gdx-n3"><input type="radio" name="gdx-n3"'+(n===C.ngayPhatISO ? ' checked' : '')+' onchange="gdxNgayPhat(\''+n+'\')"> '+ngayVN(n)+'</label>'; }).join('')+
          ' <input type="date" value="'+gdxE(C.ngayPhatISO)+'" onchange="gdxNgayPhat(this.value)">', 'ngày GD gần nhất của điểm')
      : dong('Xã / phường (kính gửi)', '<select onchange="gdxDat04(\'pgd\', this.value, true);gdxDotHop()"><option value="">— chọn —</option>'+gdxDsXa().map(function(x){ return '<option'+(x===C.xa04 ? ' selected' : '')+'>'+gdxE(x)+'</option>'; }).join('')+'</select>', 'Địa bàn')+
        dong('Ngày phát tiền', '<input type="date" value="'+gdxE(C.ngayPhatISO)+'" onchange="gdxNgayPhat(this.value)">', 'gợi ý ngày mai'))+
    dong('Giờ phát tiền', '<input value="'+gdxE(C.gioPhatTien)+'" oninput="gdxDat(\'gioPhatTien\', this.value)">', 'như đợt trước')+
    dong('Địa điểm', '<input value="'+gdxE(C.diaDiemPhatTien)+'" oninput="gdxDat(\'diaDiemPhatTien\', this.value)">', C.noiGN==='pgd' ? 'khai báo sẵn' : 'theo điểm')+
    dong('Kính gửi', '<input value="'+gdxE(C.kinhGui)+'" oninput="gdxDat(\'kinhGui\', this.value)">', 'theo xã')+
    dong('Tên UBND (câu đề nghị)', '<input value="'+gdxE(C.tenUBNDVietTat)+'" oninput="gdxDat(\'tenUBNDVietTat\', this.value)">', 'ghi đầy đủ')+
    dong('Ngày ký thông báo', '<input type="date" value="'+gdxE(C.ngayThongBao)+'" onchange="gdxDat(\'ngayThongBao\', this.value);gdxDotHop()">', 'hôm nay')+
    dong('Người lập', '<input value="'+gdxE(C.nguoiLap)+'" list="gdx-dscb" oninput="gdxDat(\'nguoiLap\', this.value)"><datalist id="gdx-dscb">'+C.danhSachCanBo.map(function(n){ return '<option value="'+gdxE(n)+'">'; }).join('')+'</datalist>', 'như đợt trước')+
    dong('Chức danh duyệt', '<input value="'+gdxE(C.chucDanhDuyet)+'" oninput="gdxDat(\'chucDanhDuyet\', this.value)">', 'như đợt trước')+
    dong('GQVL', '<label><input type="checkbox"'+(C.isGQVL ? ' checked' : '')+' onchange="gdxC().isGQVL=this.checked;gdxLuu();gdxXem()"> Chương trình GQVL (người lao động)</label>', '')+
    '</table>'+(canh.length ? '<div class="gdx-canh">⚠ '+canh.map(gdxE).join('<br>⚠ ')+'</div>' : '')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop();gdxTab04(\'kb\')">Sửa khai báo sẵn</button><button class="nho chinh" onclick="gdxDotXN()">✓ Đúng, bắt đầu in</button></div>';
  moHop(h, true);
}
function gdxNgayPhat(iso){ var C = gdxC(); C.ngayPhatISO = iso || ''; C.ngayPhatTien = gdxNgayChu(iso); gdxLuu(); gdxDotHop(); gdxXem(); }
function gdxDotXN(){ var C = gdxC(); C.dotXN = ngayISO(nay()); C.tab04 = 'don'; luu(); dongHop(); gdxVeTrai(); bao('Đã xác nhận khai báo đợt'); if(GDX.inSau){ GDX.inSau = false; gdxIn(); } }

/* ---------- 12/GDX ---------- */
function gdx12HTML(){
  var C = gdxC(), d = gdxDiem(C.m12SelectedDiem);
  if(!d && gdxDsDiem().length){ var g = gdxDiemGanNhat() || {d:gdxDsDiem()[0]}; gdxDat12Diem(g.d.maDiem, true); d = gdxDiem(C.m12SelectedDiem); }
  var opt = function(v){ return '<option value="">-- Để trống ghi tay (……………………………………………) --</option>'+C.danhSachCanBo.map(function(n){ return '<option'+(n===v ? ' selected' : '')+' value="'+gdxE(n)+'">'+gdxE(n)+'</option>'; }).join(''); };
  var nr = +C.m12NumRows || 12, ngay3 = d ? gdxNgayToi(d.ngayGD, 3) : [];
  return '<div class="gdx-kb">'+
    '<label class="gdx-o"><span>1. Chọn Điểm giao dịch (từ danh mục Địa bàn):</span><select class="gdx-lon" onchange="gdxDat12Diem(this.value)">'+gdxDsDiemOpt(C.m12SelectedDiem, gdxDsDiem().length ? '' : '— chưa có danh mục —')+'</select></label>'+
    '<div class="gdx-o2"><span>Mã điểm: <b>'+gdxE(d ? d.maDiem : '—')+'</b></span><span>Xã / phường: <b>'+gdxE(d ? d.tenXa : '—')+'</b></span><span>Số tổ tại điểm: <b>'+(d ? d.to.length+' Tổ' : '—')+'</b></span></div>'+
    '<label class="gdx-o"><span>Ngày giao dịch:'+(ngay3.length ? ' <small>gần nhất: '+ngay3.map(function(n){ return '<a class="lk" onclick="gdxDat(\'m12NgayGD\', \''+n+'\', 1)">'+ngayVN(n)+'</a>'; }).join(' · ')+'</small>' : '')+'</span><input type="date" value="'+gdxE(C.m12NgayGD)+'" onchange="gdxDat(\'m12NgayGD\', this.value)"></label>'+
    '<div class="gdx-khoi"><div class="gdx-nh">✍️ Số dòng in (luôn trọn 1 trang A4):</div><div class="sl-phu">In trắng ghi tay chọn 10–15 dòng (dòng rộng, viết thoải mái); nhiều dòng thì app tự thu gọn để vẫn vừa 1 trang.</div>'+
    '<span class="gdx-hang"><input type="number" min="5" max="45" value="'+nr+'" oninput="gdxDat(\'m12NumRows\', this.value)" style="width:70px"> dòng</span><div class="gdx-chips">'+
    [10, 12, 15, 20, 36].map(function(r){ return '<button class="nho'+(nr===r ? ' chinh' : '')+'" onclick="gdxDat(\'m12NumRows\', '+r+', 1)">'+r+' dòng'+(r===12 ? ' (chuẩn)' : r===36 ? ' (nhỏ)' : '')+'</button>'; }).join('')+
    '<button class="nho" onclick="gdxDat(\'m12NumRows\', '+(d && d.to.length ? d.to.length : 12)+', 1)">Theo số tổ điểm này</button></div></div>'+
    '<div class="gdx-khoi"><div class="gdx-nh">Chế độ danh sách:</div><label class="gdx-r"><input type="radio" name="gdx-tento"'+(C.m12TenToOption!=='fill' ? ' checked' : '')+' onchange="gdxDat(\'m12TenToOption\', \'blank\')"> In mẫu trắng ghi tay (cột họ tên để trống, dòng rộng rãi)</label>'+
    '<label class="gdx-r"><input type="radio" name="gdx-tento"'+(C.m12TenToOption==='fill' ? ' checked' : '')+' onchange="gdxDat(\'m12TenToOption\', \'fill\', 1)"> In sẵn họ tên tổ trưởng (từ danh sách tổ ở Địa bàn)</label>'+
    (C.m12TenToOption==='fill' && d && !d.to.length ? '<div class="gdx-canh">Điểm này chưa khai danh sách tổ — <a class="lk" onclick="moCaiDat(\'diaban\')">Cài đặt › Địa bàn › Sửa danh sách tổ</a>.</div>' : '')+'</div>'+
    '<div class="gdx-khoi"><div class="gdx-nh">👥 Cán bộ giao dịch (chọn nhanh): <a class="lk" onclick="gdxDoiMau(\'m04\');gdxTab04(\'kb\')">⚙️ Quản lý danh sách</a></div>'+
    '<label class="gdx-o"><span>Giao dịch viên:</span><select onchange="gdxDat(\'m12GDV\', this.value)">'+opt(C.m12GDV)+'</select></label>'+
    '<label class="gdx-o"><span>Kiểm soát viên / GDV:</span><select onchange="gdxDat(\'m12KSV\', this.value)">'+opt(C.m12KSV)+'</select></label>'+
    '<label class="gdx-o"><span>Tổ trưởng Tổ giao dịch:</span><select onchange="gdxDat(\'m12ToTruong\', this.value)">'+opt(C.m12ToTruong)+'</select></label></div>'+
    '<div class="gdx-khoi"><div class="gdx-nh">Thông tin Phần II (Tiêu hủy biên lai):</div>'+gdxO('Hình thức tiêu hủy:', 'm12HinhThucTieuHuy')+gdxO('Số lượng biên lai tiêu hủy:', 'm12SoLuongTieuHuy', 'Để trống ghi tay hoặc nhập số (vd: 08)')+
    '<div class="gdx-nh">Thời gian tiêu hủy:</div><label class="gdx-r"><input type="radio" name="gdx-tg"'+(C.m12TimeMode!=='prefill' ? ' checked' : '')+' onchange="gdxDat(\'m12TimeMode\', \'blank\', 1)"> Mặc định để trống ghi tay (…….. giờ…… phút, ngày …../ …../……….)</label>'+
    '<label class="gdx-r"><input type="radio" name="gdx-tg"'+(C.m12TimeMode==='prefill' ? ' checked' : '')+' onchange="gdxDat(\'m12TimeMode\', \'prefill\', 1)"> Tùy chọn: ghi sẵn giờ, ngày cụ thể</label>'+
    (C.m12TimeMode==='prefill' ? gdxO('Giờ:', 'm12PrefillGio', '11 giờ 30 phút')+gdxO('Ngày:', 'm12PrefillNgay', 'Tự lấy ngày GD') : '')+'</div>'+
    '<details class="gdx-khoi"><summary>Tên cơ quan ở đầu mẫu 12/GDX</summary>'+gdxO('Dòng 1:', 'm12DonVi1')+gdxO('Dòng 2:', 'm12DonVi2')+'</details>'+
    '<div class="gdx-nut"><button class="nho chinh gdx-in" onclick="gdxIn()">🖨 IN BẢNG KÊ MẪU 12/GDX (A4 DỌC)</button></div></div>';
}
function gdxDat12Diem(ma, im){ var C = gdxC(), d = gdxDiem(ma); C.m12SelectedDiem = ma || ''; if(d){ var n = gdxNgayToi(d.ngayGD, 1)[0]; if(n) C.m12NgayGD = n; } gdxLuu(); if(!im) gdxVeTrai(); }
