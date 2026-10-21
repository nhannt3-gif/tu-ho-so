/* ==========================================================
   3.260 (R4 phần 2 — docs/KE_HOACH_CHUAN_HOA.md mục 3.6): SỔ ĐĂNG KÝ CÀI ĐẶT — mọi khóa D.cauHinh app dùng, 1 dòng mô tả.
   - Khối (đồng bộ Drive) vẫn theo luật chKhoiCua (js/36); riêng máy theo CH_RIENG (js/17); mặc định theo MAC_DINH (js/02) — sổ không lặp lại.
   - tests/kiem.py: khóa mới dùng trong mã (D.cauHinh.<khóa> hoặc D.cauHinh["<khóa>"]) mà chưa ghi vào sổ → báo lỗi (thêm 1 dòng ở đây).
   - ⚙ Khai báo đơn vị › 💾 Sao lưu › 🧾 Sổ cài đặt: khóa trên máy này theo khối + dung lượng; khóa KHÔNG có trong sổ = khóa lạ
     (bản cũ để lại / máy khác đẩy lên) — chỉ báo để rà, không tự xóa.
   ========================================================== */
var CH_SO = {
  /* chung — đơn vị, Drive, giao diện */
  donvi:'Tên đơn vị (PGD)', thumuc:'Thư mục gốc trên Drive', clientId:'Mã Google Client riêng (trống = mặc định)', apiKey:'Khóa API AI (riêng máy)',
  giaoDien:'Giao diện sáng / tối / tự động', coChu:'Cỡ chữ app', phongSo:'Phông chữ số', phongGanDay:'Phông chữ dùng gần đây',
  gocMay:'Đường dẫn Drive trên máy (mở file ngoài)', tuTai:'Tự tải file về khi thêm', tuLenDrive:'Tự đưa file lên Drive', pdfNet:'PDF nét cao (không nén)',
  daXemMoi:'Bản "Có gì mới" đã xem', demDung:'Đếm lượt dùng chức năng', plPhienBan:'Mốc chuyển dữ liệu phân loại (1 lần)', racTuXoa:'Thùng rác tự xóa sau 30 ngày',
  boThang:'Mốc bỏ tab Tháng cũ (1 lần)', saoLuuNgay:'Ngày tự sao lưu gần nhất (riêng máy)',
  /* đồng bộ cài đặt / khối */
  chGhiLuc:'Lúc ghi cài đặt lên Drive (riêng máy)', chKeoLuc:'Lúc kéo cài đặt (riêng máy)', chFileId:'Mã file cài đặt trên Drive (riêng máy)', chBam:'Dấu băm từng khóa lần đồng bộ (riêng máy)',
  chKhoi:'Mốc đồng bộ từng khối cài đặt', chCuBam:'Dấu băm cauhinh.json cũ (chuyển tiếp)', chCuKeo:'Lúc kéo cauhinh.json cũ (chuyển tiếp)', chCuNoi:'Đã nối cauhinh.json cũ (chuyển tiếp)',
  kdBam:'Dấu băm file khối đã đẩy (riêng máy)', kdKeo:'Giờ sửa file khối đã kéo (riêng máy)', kdBoCu:'Máy cũ đã cập nhật hết — thôi ghi chimuc.json',
  chiMucDriveTG:'Giờ chỉ mục Drive (riêng máy)', chiMucThoi:'Lúc lấy chỉ mục (riêng máy)', db5p:'Đồng bộ Scan mỗi 5 phút', dbMoApp:'Đồng bộ khi mở app', dbRoiApp:'Đồng bộ khi rời app', dbSauLuu:'Đồng bộ sau khi lưu',
  gxBat:'Bật gói số liệu xem cho điện thoại', gxCho:'Gói xem chờ đẩy', gxKy:'Kỳ gói xem đã đẩy', gxLuc:'Lúc đẩy gói xem', gxSo:'Số khách trong gói xem',
  /* bố cục, khung, tab */
  rongTrai:'Độ rộng cột trái (đời cũ, tự bỏ)', rongPhai:'Độ rộng cột phải (đời cũ, tự bỏ)', rongPV:'Độ rộng khung xem phải', rongTab:'Độ rộng khung xem theo tab', rong339:'Mốc bỏ độ rộng chung (3.39)', rong3304:'Mốc khung xem Scan gọn (3.304)', kyRa:'Mốc đã rà chữ ký quét nhầm (3.306)',
  anPV:'Cờ ẩn khung xem đời cũ (tự bỏ)', anPVTab:'Ẩn khung xem theo tab', anLocNhanh:'Ẩn thanh lọc nhanh theo tab', moLocDT:'Mở thanh lọc trên điện thoại', bangTab:'Kiểu xem bảng theo tab',
  xemChe:'Chế độ khung xem lần trước', dongGon:'Dòng danh sách gọn', tabCD:'Tab con Cài đặt đang mở', khoiMo:'Khối Hôm nay mở / gập', cayMo:'Nhánh cây đang mở', suaDM:'Đang sửa danh mục tab Tháng',
  anBangDC:'Ẩn bảng đối chiếu tab Tháng', moCXL:'Mở khối Cần xử lý', moGanDay:'Mở khối Gần đây', tvPhan:'Việc Hôm nay theo phần', taNhacKhac:'Đã nhắc tạo nhãn khác',
  cheCau:'Câu hay mỗi ngày: chế độ', nhomCau:'Câu hay: nhóm câu', cheChay:'Chữ chạy: tốc độ', nkChe:'Nhật ký: kiểu ghi', inThe:'In thẻ CCCD: cỡ / khe',
  /* văn bản, nhãn, danh mục */
  nghiepVu:'Danh mục nghiệp vụ', chuongTrinh:'Danh mục chương trình vay', ctTen:'Tên chương trình anh sửa', ctNCHXAPT:'Mốc thêm chương trình NCHXAPT (1 lần)', loaiVB:'Danh mục loại văn bản',
  kieuTen:'Kiểu đặt tên file', kieuTenThang:'Kiểu tên file tháng', tenCauTruc:'Cấu trúc tên file', soTrangDoc:'Số trang PDF đọc để nhận dạng', tuKhoa:'Từ khóa nhận dạng anh sửa', vtLoai:'Viết tắt loại văn bản',
  tagTab:'Nhãn theo tab', tagGan:'Nhãn đã gắn', tagDCBo:'Mốc bỏ nhãn địa chỉ biểu mẫu (1 lần)', nhanGhiChu:'Nhãn ghi chú', nhanGCDaGop:'Mốc gộp nhãn ghi chú (1 lần)', hoiDoanThe:'Danh mục hội đoàn thể (đời cũ)',
  boMau:'Bộ biểu mẫu', loaiBoHS:'Loại giấy tờ bộ hồ sơ',
  /* địa bàn */
  diaBan:'Địa bàn: xã → điểm GD → ấp', xaQuanLy:'Xã anh quản lý', xaHien:'Xã hiện (đời cũ)', xqlDaAp:'Mốc chuyển xã quản lý (1 lần)', xaMo:'Xã đang mở ở cây', capThang:'Cấp xem tab Tháng',
  /* scan, CCCD */
  scanChe:'Scan: chế độ (thẻ / tài liệu)', scanLoai:'Scan: loại lần trước', scanLoc:'Scan: bộ lọc ảnh', scanNguon:'Scan: nguồn (camera / file)', scanNhom:'Scan: nhóm theo ngày / tuần / tháng', scanXem:'Scan: xem danh sách / cây',
  camId:'Camera đang dùng (riêng máy)', camGiu:'Camera: thời gian giữ hình', camTuDong:'Camera: tự chụp', kaMuc:'Ký ảnh: mức', kaTM:'Ký ảnh: thư mục Drive theo tháng',
  hsDS:'Danh sách hồ sơ CCCD (đời cũ, chuyển sang D.scan)', hsKhoa:'Khóa hồ sơ CCCD (đời cũ)', hsTuDrive:'Lưu hồ sơ CCCD là đưa PDF lên Drive',
  hsXaCuoi:'Hồ sơ CCCD: xã lần trước', hsDiemCuoi:'Hồ sơ CCCD: điểm GD lần trước', hsApCuoi:'Hồ sơ CCCD: ấp lần trước', hsToCuoi:'Hồ sơ CCCD: tổ lần trước',
  /* tháng, giao ban, số liệu */
  mauBaoCao:'Danh mục báo cáo tháng', maDaBo:'Mã báo cáo đã bỏ khỏi danh mục', kyBang:'Kỳ bảng tháng đang xem', soKyBang:'Số kỳ bảng tháng', kyChot:'Kỳ đã chốt (đời cũ)',
  gbSoNgay:'Giao ban: số ngày', gbTuKhoa:'Giao ban: từ khóa văn bản', slgbDaDoi:'Mốc đổi số liệu giao ban (1 lần)',
  kyChung:'Kỳ số liệu chung mọi tab', pvChung:'Phạm vi chung (xã › điểm › hội › tổ)', pvGon:'Khối phạm vi gọn theo tab', pvGhim:'Ghim khối phạm vi theo tab',
  slTab:'Tab con Số liệu đang mở', slTabBC:'Tab báo cáo Số liệu lần trước', slGiu:'Số kỳ số liệu giữ trên máy', slMo:'Nhóm file Số liệu đang mở', slKqMo:'Mở kết quả kiểm tra kỳ', slKtLoc:'Lọc kết quả kiểm tra',
  slMt:'Ma trận Nạp: kiểu xem', slMtTruoc:'Ma trận Nạp: kiểu trước khi thu', slTQ:'Bảng tổng quan nhiều tháng thu gọn',
  toTK:'Tab Tổ: kỳ + phạm vi + báo cáo', skTK:'Tab Sao kê: kỳ + phạm vi + báo cáo', thTK:'Tab Tổng hợp: kỳ + phạm vi + báo cáo', tcPV:'Tab Tra cứu: phạm vi',
  toCot:'Bảng các tổ: cột hiện / ẩn', toCotKH:'Danh sách khách: cột hiện / ẩn', toNguong:'Ngưỡng số tổ viên',
  tk104Tay:'TK 104 anh gõ tay', tkChon:'TK 104 / 105 anh đã chọn', ccNho:'CCCD anh gõ tay theo mã KH',
  /* KTGS */
  ktgs:'Tab KTGS: kỳ + phạm vi + kiểu', ktIn:'KTGS: lựa chọn khi in từng mẫu', ktKBLuu:'KTGS: khai báo lưu lâu dài', ktHoiKB:'KTGS: khai báo Hội (xã | hội)', ktChuan:'KTGS: bảng chuẩn hóa Hội – Đoàn',
  ktPC:'KTGS: phân công Ban thường vụ', ktKH:'KTGS: Kế hoạch 01/KH', ktKHChuan:'KTGS: mốc chuẩn hóa kế hoạch (1 lần)', ktApThu:'KTGS: thứ tự ấp kế hoạch', ktKN04:'KTGS: kết luận Mẫu 04',
  ktMucDich:'KTGS: cột mục đích Mẫu 06', ktNhanXet:'KTGS: gợi ý nhận xét', ktBang16:'KTGS: Bảng II Mẫu 16', ktHaiMat:'KTGS: in 2 mặt', ktPnkt:'KTGS: bảng ngành kinh tế', ktHdt5:'KTGS: mốc chuyển khai báo Hội (1 lần)', ktHdtDoi:'KTGS: mốc đổi tên Hội (1 lần)', ktKBMo:'KTGS: khung khai báo đang mở', ktNapMo:'KTGS: khung nạp đang mở',
  /* hồ sơ vay, giao dịch xã */
  hsoKB:'Hồ sơ: khai báo PGD, ấp, tổ phó, mục đích…', hsoO:'Hồ sơ: lựa chọn nhớ từng mẫu (ô, chấm, cỡ chữ…)', hsoTK:'Tab Hồ sơ: kỳ + mẫu đang mở', hsoBo:'Bộ hồ sơ vay lưu tạm (đời cũ)', hoMoi:'Sổ hộ vay (hộ mới khai báo)',
  gdx:'Giao dịch xã: khai báo cán bộ, đơn vị, từng mẫu', gdxTK:'Tab Giao dịch xã: kỳ + phạm vi', dmTo:'Danh mục tổ tự lập (đời cũ, bỏ)'
};
/* khóa đặt tên động (không viết thẳng trong mã) — khớp theo mẫu */
var CH_SO_MAU = [];
function chSoCo(k){ if(CH_SO[k]) return true; for(var i=0;i<CH_SO_MAU.length;i++) if(CH_SO_MAU[i][0].test(k)) return true; return false; }
function chSoMoTa(k){ if(CH_SO[k]) return CH_SO[k]; for(var i=0;i<CH_SO_MAU.length;i++) if(CH_SO_MAU[i][0].test(k)) return CH_SO_MAU[i][1]; return ''; }
function chSoKB(v){ try { return Math.max(0, Math.round(JSON.stringify(v).length/102.4)/10); } catch(e){ return 0; } }
function chSoKiem(){   /* → {tong, kb, khoi:{tên:[{k, kb, mt, rieng}]}, la:[{k, kb}]} */
  var c = D.cauHinh || {}, R = {tong:0, kb:0, khoi:{}, la:[]};
  Object.keys(c).forEach(function(k){ if(c[k]===undefined) return; var kb = chSoKB(c[k]), rieng = typeof chRieng==='function' && chRieng(k);
    R.tong++; R.kb += kb;
    if(!chSoCo(k)){ R.la.push({k:k, kb:kb}); return; }
    var kh = rieng ? 'riêng máy' : (typeof chKhoiCua==='function' ? chKhoiCua(k) : 'chung');
    (R.khoi[kh] = R.khoi[kh] || []).push({k:k, kb:kb, mt:chSoMoTa(k), rieng:rieng}); });
  R.kb = Math.round(R.kb*10)/10;
  return R;
}
var CH_SO_KHOI_TEN = {chung:'Chung', solieu:'Số liệu', ktgs:'KTGS', hoso:'Hồ sơ vay', gdx:'Giao dịch xã', scan:'Scan', lich:'Lịch, ghi chú', vanban:'Văn bản', 'riêng máy':'Riêng máy này (không lên Drive)'};
function chSoTomHTML(){
  var R = chSoKiem();
  return '<div class="hso-kb-nhom"><b>🧾 Sổ cài đặt</b> — máy này có <b>'+R.tong+'</b> khóa cài đặt ('+R.kb+' KB), '+Object.keys(R.khoi).length+' khối'+
    (R.la.length ? ' · <b class="do">'+R.la.length+' khóa lạ</b> (không có trong sổ)' : ' · không có khóa lạ')+
    ' <button class="nho" onclick="chSoHop()">Xem</button></div>';
}
function chSoHop(){
  var R = chSoKiem(), bang = function(ds, laLa){ return '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>Khóa</th><th>Mô tả</th><th>KB</th></tr></thead><tbody>'+
    ds.sort(function(a, b){ return b.kb-a.kb || a.k.localeCompare(b.k); }).map(function(x){ return '<tr><td><code>'+coChuHTML(x.k)+'</code></td><td>'+(laLa ? '<i>không có trong sổ — bản cũ để lại hoặc máy khác đẩy lên</i>' : coChuHTML(x.mt))+'</td><td class="so">'+x.kb+'</td></tr>'; }).join('')+'</tbody></table></div>'; };
  var thu = ['chung','solieu','ktgs','hoso','gdx','scan','lich','vanban','riêng máy'], ks = Object.keys(R.khoi).sort(function(a, b){ return thu.indexOf(a)-thu.indexOf(b); });
  moHop('<div class="hop-tit">🧾 Sổ cài đặt — '+R.tong+' khóa ('+R.kb+' KB)</div>'+
    '<div class="hop-phu">Mỗi khóa là 1 lựa chọn / khai báo app nhớ. Khóa lạ = không có trong sổ của bản này (bản cũ để lại hoặc máy khác đẩy lên) — app chỉ báo để rà, không tự xóa.</div>'+
    (R.la.length ? '<details open class="ch-so-nhom"><summary><b class="do">⚠ Khóa lạ ('+R.la.length+')</b></summary>'+bang(R.la, true)+'</details>' : '')+
    ks.map(function(k){ var ds = R.khoi[k], kb = Math.round(ds.reduce(function(a, x){ return a+x.kb; }, 0)*10)/10;
      return '<details class="ch-so-nhom"><summary><b>'+coChuHTML(CH_SO_KHOI_TEN[k] || k)+'</b> — '+ds.length+' khóa · '+kb+' KB</summary>'+bang(ds)+'</details>'; }).join('')+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>', true);
}
