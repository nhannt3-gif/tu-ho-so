/* 3.235 (R3): file này giữ phần lõi; các khối khác tách sang js/22b…22i (nạp ngay sau theo thứ tự tên) + khuôn Word KTGS js/khuon/kt-khuon.js (3.236: tải khi cần — ktKhuon) */
/* ==========================================================
   3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng
   - Nạp cả bộ (app tự nhận loại + kỳ) hoặc từng file (anh chọn loại + kỳ, app đọc nội dung kiểm lần cuối)
   - Bộ đọc: chỉ lấy sheet có bảng đúng cột · tự dò dòng tên cột · bỏ dòng trống / tổng / tiêu đề lặp / phần ký
   - Lưu dạng đọc nhanh (theo cột, mã lặp thay bằng số thứ tự) theo LOẠI × KỲ:
       máy: IndexedDB 'sl_b_<loại>_<kỳ>' · Drive: <Tủ hồ sơ>/Số liệu/<kỳ>/ (file gốc) + _Hệ thống/so_lieu/ (dữ liệu đã đọc, chỉ mục)
   - Bộ dữ liệu kỳ: nối theo Số khế ước (= mã món vay), Mã KH, Mã tổ · danh bạ khách hàng để tra ở ô tìm
   Excel chỉ đọc MỘT lần lúc nạp; tra cứu chỉ dùng dữ liệu đã đọc.
   ========================================================== */
var SL_MA_CU = ['SK_TD','SK_KH','SK_TK10','SK_NK','SK_NQH','TDN_CTV','TT_TO'];   /* 7 dòng thuần Excel cũ của ma trận tab Tháng → nay ở tab Số liệu (SK_TK10 bỏ hẳn) */
function laMaSoLieu(m){ return !!m && SL_MA_CU.indexOf(m.ma)>=0; }
var SL_NGUON = {'1':'TW', '2':'ĐP'};   /* anh Nhân: 1 = Trung ương, 2 = Địa phương; Mã NĐT là cấp chia tiếp của nguồn */

/* trường dữ liệu: a = các tên cột (đã bỏ dấu, chữ thường), t = n số / d ngày / s chữ, m = độ dài mã (bù số 0 đầu) */
var SL_TRUONG = {
  pgd:{a:['ma pgd'], m:6}, cn:{a:['ma cn'], m:6},
  xa:{a:['ma xa'], m:6}, tenXa:{a:['ten xa']},
  diem:{a:['ma diem giao dich','ma diem gdx','diem gdxa','ma diem gdxa','ma diem gd']},
  tenDiem:{a:['diem giao dich','ten diem gdx','ten diem gdxa','ten diem gd','ten diem giao dich']},
  ngayGD:{a:['ngay gdxa'], m:2},
  thon:{a:['ma thon','ma thon ap','thon'], m:8}, tenThon:{a:['ten thon']},
  dv:{a:['dvut','ma dvut'], m:2}, tenDv:{a:['ten dvut']},
  to:{a:['ma to','ma to truong'], m:7}, toTen:{a:['ten to truong','ten to']},
  kh:{a:['ma khach hang','ma kh','makh'], m:10}, ten:{a:['ten khach hang','ten kh','tenkh']},
  ns:{a:['ngay sinh','nam sinh to truong'], t:'d'}, cccd:{a:['cccd','so cccd','cmnd cccd','so cmnd cccd','so cmnd']},
  ncap:{a:['ngay cap','ngay cap cmnd'], t:'d'}, noiCap:{a:['noi cap','noi cap cmnd']}, dc:{a:['dia chi']}, gt:{a:['gioi tinh']},
  sdt:{a:['sdt to truong','so dien thoai','dien thoai','sdt','sodt']},
  ku:{a:['ma mon vay','so khe uoc','soku']}, sp:{a:['ma san pham']},
  ct:{a:['chuong trinh','ma chuong trinh'], m:2}, ctVT:{a:['chuong trinh vt']}, ctTen:{a:['ten chuong trinh']},
  gn:{a:['so tien giai ngan','tong giai ngan'], t:'n'}, dn:{a:['tong du no','du no'], t:'n'},   /* 3.87: 'du no' (Mẫu 7) đứng sau — file có 'Tổng dư nợ' vẫn lấy cột đó */
  th:{a:['du no trong han','dn trong han'], t:'n'}, qh:{a:['du no qua han','dn qua han'], t:'n'}, kn:{a:['du no khoanh','dn khoanh'], t:'n'},
  nv:{a:['ngay vay'], t:'d'}, ndk:{a:['ngay dang ky khoan vay'], t:'d'}, ngn:{a:['ngay giai ngan dau tien','ngay gn dau tien'], t:'d'},
  dhg:{a:['ngay den han goc','ngay dh theo hop dong'], t:'d'}, dhgh:{a:['ngay den han gh','ngay dh theo gia han'], t:'d'}, dhgd:{a:['ngay den han gdxa','ngay dh theo gdxa'], t:'d'},
  ngdg:{a:['ngay giao dich gan nhat'], t:'d'},
  ghT:{a:['so tien gia han','tong gia han no'], t:'n'}, ghTh:{a:['so thang gia han'], t:'n'}, ghTong:{a:['tong so thang gia han'], t:'n'},
  nguon:{a:['nguon von']}, ndt:{a:['ma ndt','ma nha dau tu']}, lv:{a:['luu vi trong nam']},
  ltTH:{a:['lai ton trong han','lai ton th'], t:'n'}, ltQH:{a:['lai ton qua han','lai ton qh'], t:'n'}, ltAH:{a:['lai ton ah'], t:'n'}, lt:{a:['lai ton'], t:'n'}, ldt:{a:['lai da thu'], t:'n'},
  nhapHoc:{a:['ngay nhap hoc'], t:'d'}, raTruong:{a:['ngay ra truong'], t:'d'},
  stk:{a:['so tiet kiem 105','so tk']}, tenTK:{a:['ten tk']}, t105d:{a:['105 dau thang'], t:'n'}, t105:{a:['105 ngay bc','so du 105','so du tien gui 105'], t:'n'},
  cqh:{a:['chuyen qh trong thang'], t:'n'}, ncqh:{a:['ngay chuyen qua han'], t:'d'},
  nhl:{a:['ngay hieu luc'], t:'d'}, nhh:{a:['ngay het han khoanh'], t:'d'}, nn:{a:['nguyen nhan']},
  skh:{a:['so kh'], t:'n'}, phoKH:{a:['ma kh to pho','ma khach hang to pho hien tai','ma khach hang to pho'], m:10}, phoTen:{a:['ten to pho','ten to pho hien tai']}, ttTo:{a:['trang thai']}, loaiTo:{a:['loai to']},
  nbc:{a:['ngay bao cao','ngay so lieu','ngay du lieu','ngaybc'], t:'d'},
  /* 3.91: file "Nợ đến hạn phân kỳ" (NOXH, cho vay trực tiếp) — mỗi dòng 1 kỳ gốc chưa trả xong; tên cột viết liền */
  pkXa:{a:['xa']}, pkTo:{a:['mato']}, pkCT:{a:['ctvt']}, pkTong:{a:['tduno'], t:'n'},
  pkNgay:{a:['ngaydenhan'], t:'d'}, pkTien:{a:['duno'], t:'n'}, pkDa:{a:['gocdtra'], t:'n'}, pkCon:{a:['nodenhan'], t:'n'}, pkTK:{a:['sodutk'], t:'n'},
  /* 3.86: Mẫu 31 "Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu" (175 cột) — các trường dùng tới; cột còn lại vẫn giữ nguyên (c_…) */
  ttMon:{a:['tinh trang mon vay']}, ls:{a:['lai suat'], t:'n'}, thoiHan:{a:['thoi han vay']}, mucVay:{a:['muc vay'], t:'n'},
  voChong:{a:['ten vo chong']}, danToc:{a:['ten dt']},
  gnT:{a:['giai ngan trong thang'], t:'n'}, dkT:{a:['dao khoan gn thang'], t:'n'}, tnTH:{a:['thu no th thang'], t:'n'},
  tnQH:{a:['thu no qh thang'], t:'n'}, tnK:{a:['thu no khoanh thang'], t:'n'}, xoaT:{a:['goc xoa trong thang'], t:'n'},
  /* 3.87: Mẫu 7 "Báo cáo kiểm tra Tổ TK&VV (DL tháng)" — mỗi dòng 1 tổ */
  stv:{a:['so to vien'], t:'n'}, stvDn:{a:['so to vien du no'], t:'n'}, stv105:{a:['so to vien con 105'], t:'n'},
  stvKNL:{a:['stv 3th khong nop lai'], t:'n'}, stvKGT:{a:['stv 3th khong gui tk'], t:'n'}, tlQH:{a:['ty le nqh'], t:'n'}, tlKN:{a:['ty le no kh'], t:'n'},
  tgbq:{a:['tien gui binh quan tv'], t:'n'}, diemTo:{a:['diem to'], t:'n'}, xepLoai:{a:['xep loai to']},
  /* 3.108: "Danh sách tổ TK&VV" (…_DSTO.xlsx) — mỗi dòng 1 tổ; Hội ghi bằng chữ, có mã KH tổ trưởng */
  dvTen:{a:['don vi uy thac']}, ttKH:{a:['ma khach hang to truong','ma cif tt'], m:10}, skv:{a:['so luong khoan vay'], t:'n'}, tk:{a:['tiet kiem'], t:'n'}
};
/* các loại file: can = cột bắt buộc có · mot = có ít nhất 1 · khong = không được có · khoa = trường khóa của dòng dữ liệu
   3.87: ngay = loại lưu theo NGÀY (kỳ 'yyyy-mm-dd': Mẫu 10, Sao kê KH — nạp bất kỳ ngày nào); còn lại theo THÁNG (kỳ 'yyyy-mm')
   Thứ bậc tin cậy khi đối chiếu (anh Nhân chốt): Mẫu 31 (chốt tháng) > Mẫu 10 cùng ngày > file tổng hợp (Mẫu 7…) — lệch thì báo, không sửa nguồn */
var SL_LOAI = [
  /* Ⓐ 3.90: 7 file tổng hợp chuẩn TW — đọc theo biểu (slDocTW); tuy = ngày cuối tháng thì vào ô tháng, ngày khác vào ô theo ngày */
  {k:'bx',  nhom:'A', tw:true, tuy:true, ten:'BCDHTD 01.1 · Kết quả cho vay theo xã', can:[], tenFile:['bcdhtd 01 1']},
  {k:'bc',  nhom:'A', tw:true, tuy:true, ten:'BCDHTD 01.2 · Kết quả cho vay theo CT', can:[], tenFile:['bcdhtd 01 2']},
  {k:'lx',  nhom:'A', tw:true, tuy:true, ten:'LEN_31 XAPUONG · theo xã', can:[], tenFile:['xapuong']},
  {k:'lh',  nhom:'A', tw:true, tuy:true, ten:'LEN_31 DONVIUT · theo hội', can:[], tenFile:['donviut']},
  {k:'lc',  nhom:'A', tw:true, tuy:true, ten:'LEN_31 CHTRINH · theo chương trình', can:[], tenFile:['chtrinh']},
  {k:'lt',  nhom:'A', tw:true, tuy:true, ten:'LEN_31 TO_TRUONG · theo tổ trưởng', can:[], tenFile:['len 31 to truong']},
  /* Ⓑ chi tiết tháng */
  {k:'hstd', nhom:'B', tuy:true, ten:'Mẫu 31 · HS tín dụng (chốt tháng)', can:['so khe uoc','ma kh','tinh trang mon vay','tong du no'],   /* 3.87: chỉ Mẫu 31 — Mẫu 10 tách thành loại m10 · 3.90: xuất ngày giữa tháng thì vào ô theo ngày */
   khong:['ma diem giao dich'],   /* 3.120: file Dư nợ chi tiết (có cột Mã điểm giao dịch) vào dòng riêng */
   khoa:'ku', khoaPhu:'kh', giuHet:true, tenFile:['tao ho so tin dung','mau 31','mau31']},
  /* 3.120 (anh chốt): Dư nợ chi tiết — cùng khuôn Mẫu 31, có thêm số TK 105 + điểm GD; Mẫu 31 là số liệu chính, file này CHỈ tham chiếu số TK 105 và điểm giao dịch xã */
  {k:'dnct', nhom:'B', tuy:true, thamChieu:true, ten:'Mẫu 18 · Dư nợ chi tiết (tham chiếu TK 105 + điểm GD)', can:['so khe uoc','ma kh','tong du no','ma diem giao dich'], mot:['so tiet kiem 105'],
   khoa:'ku', khoaPhu:'kh', chi:['ku','kh','ten','stk','diem','tenDiem','ngayGD','to','ttKH','thon','xa','tenXa','dn','th','qh','kn','gnT','dkT','tnTH','tnQH','tnK','xoaT','t105','ttMon'], tenFile:['du no chi tiet','mau 18']},   /* 3.121: + cột số tiền — CHỈ để đối chiếu với Mẫu 31 */
  {k:'tt',   nhom:'D', tuy:true, tuyMoi:true, an:'Thông tin tổ trưởng không cần nữa (anh chốt 14/10) — Danh sách tổ hệ thống đã đủ; file vẫn đọc để tra tháng cũ, không hiện trên ma trận.', ten:'Thông tin tổ trưởng', can:['ma to truong','ten to truong'], khoa:'to', cu:'TT_TO', tenFile:['to truong']},
  {k:'khd',  nhom:'D', tuy:true, tuyMoi:true, ten:'Món vay 3 tháng KHĐ (mẫu 14)', can:['so khe uoc','ngay giao dich gan nhat'], khong:['tinh trang mon vay'], khoa:'ku', cu:'', tenFile:['khong hoat dong','3 thang','03 thang','khd']},
  /* Ⓒ theo ngày */
  {k:'m10',  nhom:'X', bo:'Mẫu 10 không dùng nữa từ bản 3.120 (anh chốt) — xuất Mẫu 31 (số liệu chính) và Dư nợ chi tiết (tham chiếu số TK 105 · điểm GD).', ten:'Mẫu 10 · Sao kê chi tiết (theo ngày)', ngay:true, can:['ma mon vay','ma khach hang','tong du no','so tien giai ngan'], khong:['tinh trang mon vay'],
   khoa:'ku', khoaPhu:'kh', giuHet:true, cu:'SK_TD', tenFile:['ho so tin dung','sao ke chi tiet','sao ke du lieu chi tiet','hstd','mau 10']},   /* file HS tín dụng nạp ở tab Tháng trước 3.85 là Mẫu 10 */
  /* Ⓓ phụ — không bắt buộc, có thì đối chiếu thêm với Mẫu 31 */
  {k:'nqh',  nhom:'D', tuy:true, tuyMoi:true, ten:'Nợ quá hạn', can:['so khe uoc','du no qua han'], mot:['ngay chuyen qua han','chuyen qh trong thang'], khong:['ngay giao dich gan nhat','tinh trang mon vay'], khoa:'ku', cu:'SK_NQH', tenFile:['qua han','nqh']},
  {k:'nk',   nhom:'D', tuy:true, tuyMoi:true, ten:'Nợ khoanh', can:['so khe uoc','du no khoanh','ngay het han khoanh'], khong:['ngay giao dich gan nhat','tinh trang mon vay'], khoa:'ku', cu:'SK_NK', tenFile:['khoanh']},
  {k:'dsto', nhom:'B', tuy:true, tuyMoi:true, ten:'Danh sách tổ TK&VV (hệ thống)', can:['ma to','ma diem gdx','don vi uy thac'], khong:['ma khach hang','ma mon vay','so khe uoc'], khoa:'to', giuHet:true, tenFile:['dsto']},   /* 3.108: đối chiếu với Thông tin tổ trưởng + bổ sung tổ thiếu */
  /* 3.201: đọc riêng theo khuôn (js/28) — Mẫu 01/TV danh sách thành viên tổ của TƯ (theo tháng) · Sao kê TK 104 / TK 105 (theo ngày) */
  {k:'tv01', nhom:'D', tuy:true, rieng:true, ten:'Mẫu 01/TV · Danh sách thành viên tổ (TƯ)', can:[], tenFile:['mau01 tv','mau 01 tv','01 tv']},
  {k:'tk104', nhom:'D', ngay:true, rieng:true, ten:'Sao kê TK 104 (tổ trưởng)', can:[], tenFile:['tk 104','tk104']},
  {k:'tk105', nhom:'D', ngay:true, rieng:true, ten:'Sao kê TK 105 (tiết kiệm khách)', can:[], tenFile:['tk 105','tk105']},
  {k:'pk',   nhom:'D', ngay:true, ten:'Nợ đến hạn phân kỳ (NOXH · cho vay trực tiếp)', can:['soku','ngaydenhan','nodenhan'], khoa:'ku', tenFile:['phan ky']},   /* 3.91: lịch kỳ gốc — có thì sao kê phân kỳ lấy đúng ngày + số tiền kỳ tới */
  /* 3.93: Ⓚ KTGS Hội đoàn thể — nạp ở tab con 🛡 KTGS (không hiện ở ma trận Nạp); đọc riêng theo khuôn (ktDocBC) */
  {k:'k37', nhom:'K', kt:true, tuy:true, ten:'BC0437 · Thông tin tổ TK&VV do HĐT quản lý', can:[], tenFile:['bc0437']},
  {k:'k38', nhom:'K', kt:true, tuy:true, ten:'BC0438 · Thông tin ủy thác theo xã · hội', can:[], tenFile:['bc0438']},
  {k:'tdn',  nhom:'D', tuy:true, tuyMoi:true, ten:'Tổng dư nợ theo CT', can:['chuong trinh','tong du no','so kh','ma thon'], khong:['ma mon vay','so khe uoc','ma khach hang'], khoa:'thon', cu:'TDN_CTV', tenFile:['tong du no','du no theo']},
  /* 3.90: các loại ĐÃ BỎ (anh chốt) — không nạp mới; dữ liệu cũ vẫn đọc / xem / xóa được */
  {k:'kh',   nhom:'X', bo:'Sao kê khách hàng đã bỏ từ bản 3.90 (anh không xuất được nữa) — thông tin khách lấy từ Mẫu 31.', ten:'Sao kê khách hàng (theo ngày)', ngay:true, can:['ma khach hang','cccd'], khong:['ma mon vay','so khe uoc','tong du no'], khoa:'kh', cu:'SK_KH', tenFile:['khach hang']},
  {k:'kttk', nhom:'X', bo:'Mẫu 7 · Kiểm tra Tổ TK&VV đã bỏ khỏi tham chiếu từ bản 3.90 (anh chốt).', ten:'Mẫu 7 · Kiểm tra Tổ TK&VV', can:['ma to','so to vien','xep loai to'], khong:['ma khach hang','ma mon vay','so khe uoc'], khoa:'to', tenFile:['kiem tra to']},
  {k:'b32', nhom:'X', tw:true, bo:'B32 đã bỏ (anh chốt 10/10/2026) — doanh số và nguồn vốn TW / ĐP lấy từ Mẫu 31; chuẩn đối chiếu: BCDHTD 01.1 / 01.2 + LEN_31.', ten:'B32 · Hoạt động tín dụng theo nguồn vốn', can:[], tenFile:['b32']},   /* 3.145: chỉ còn nhận dạng */
  {k:'khd08', nhom:'X', bo:'Đây là file mẫu 08/KTNB — anh dùng file mẫu 14 “Sao kê món vay N tháng không hoạt động (DL Tháng)” (anh chốt; 2 file cùng số nhưng mẫu 14 có điểm GD xã, ngày đến hạn GDXA).', ten:'Món vay 3 tháng KHĐ mẫu 08/KTNB', can:['ma mon vay','ngay giao dich gan nhat','mo ta'], khoa:'ku', tenFile:['ktnb']}
];
/* 3.145 (anh chốt Q16, 10/10/2026): Ⓑ bắt buộc (nguồn dữ liệu) · Ⓐ đối chiếu chuẩn TW · Ⓓ phụ · Ⓚ KTGS (khối riêng ở tab Nạp) · X đã bỏ (chỉ nhận dạng, dữ liệu xóa hẳn) */
var SL_NHOM = [{k:'B', ten:'Ⓑ Bắt buộc · nguồn dữ liệu (Mẫu 31, Dư nợ chi tiết, Danh sách tổ)'}, {k:'A', ten:'Ⓐ Đối chiếu chuẩn TW · BCDHTD 01.1 / 01.2 · LEN_31'},
               {k:'D', ten:'Ⓓ Phụ · không bắt buộc, có thì đối chiếu thêm'}, {k:'K', ten:'Ⓚ KTGS · BC0437 / BC0438 (Hội đoàn thể)'}, {k:'X', ten:'Đã bỏ'}];   /* 3.156: KTGS vào chung ma trận */
var SL_KHOA_DUNG = {ku:/^\d{10,20}$/, kh:/^\d{6,12}$/, thon:/^\d{6,10}$/, to:/^\d{5,9}$/};
function slLoai(k){ return SL_LOAI.find(function(L){ return L.k===k; }); }
function slChuan(s){ return boDau(String(s==null ? '' : s)).replace(/[^a-z0-9]+/g, ' ').trim(); }
/* 3.87: kỳ theo tháng 'yyyy-mm' hoặc theo ngày 'yyyy-mm-dd' */
function slLaNgay(loai){ var L = slLoai(loai); return !!(L && L.ngay); }
function slLaHS(loai){ return loai==='hstd'; }   /* bảng món vay chi tiết: Mẫu 31 (3.120: bỏ Mẫu 10) */
function slThang(ky){ return String(ky||'').slice(0,7); }
function slKyChu(ky){ return String(ky||'').length>7 ? 'ngày '+ngayVNsl(ky) : kyVN(ky); }
function slThuTu(ky){ ky = String(ky||''); return ky.length===7 ? tdnCuoiKy(ky)+'b' : ky+'a'; }   /* xếp cũ → mới; cùng ngày thì số chốt tháng (Mẫu 31) tính là mới hơn */
function slTuy(loai){ var L = slLoai(loai); return !!(L && L.tuy); }   /* 3.90: Mẫu 31 + file TW — cuối tháng vào ô tháng, ngày khác vào ô theo ngày */
function slChonNgay(loai){ return slLaNgay(loai) || slTuy(loai); }   /* ô nhập kỳ là NGÀY */
function slKyTu(L, ngay){ if(!ngay) return ''; if(L.ngay) return ngay; if(L.tuy && ngay!==tdnCuoiKy(ngay.slice(0,7))) return ngay; return ngay.slice(0,7); }
function slKyHopLe(loai, ky){ var d = /^\d{4}-\d{2}-\d{2}$/.test(ky||''), m = /^\d{4}-\d{2}$/.test(ky||''); return slLaNgay(loai) ? d : slTuy(loai) ? (d || m) : m; }
function slNgayMacDinh(ky){ ky = String(ky||''); if(ky.length>7) return ky; var hn = ngayISO(nay()); return (!ky || slThang(hn)===ky) ? hn : tdnCuoiKy(ky); }

/* ---------- 1. ĐỌC WORKBOOK (thử Worker để màn hình không treo; không được thì đọc trực tiếp) ---------- */
var SL_XLSX_CH = {type:'array', dense:true, cellText:false, cellHTML:false, cellStyles:false, cellNF:false, cellDates:false};   /* 3.86 */
function slSuaRef(ws){   /* 3.108: file hệ thống khai vùng dữ liệu sai (DSTO: <dimension A1:AA14> mà dữ liệu tới dòng 382) → mở rộng theo ô thật, không bỏ sót dòng */
  if(!ws || !ws['!ref']) return ws;
  var r = XLSX.utils.decode_range(ws['!ref']), R = r.e.r, C = r.e.c;
  if(Array.isArray(ws)){ if(ws.length-1>R) R = ws.length-1; for(var i=0;i<ws.length;i++) if(ws[i] && ws[i].length-1>C) C = ws[i].length-1; }
  else Object.keys(ws).forEach(function(k){ if(k.charAt(0)==='!') return; var a = XLSX.utils.decode_cell(k); if(a.r>R) R = a.r; if(a.c>C) C = a.c; });
  if(R>r.e.r || C>r.e.c){ r.e.r = R; r.e.c = C; ws['!ref'] = XLSX.utils.encode_range(r); }
  return ws;
}
function slDocSheet(ab){
  var trucTiep = function(){
    return xongTV.then(function(){
      if(!window.XLSX) throw new Error('Chưa tải được bộ đọc Excel — có mạng một lần rồi thử lại.');
      var wb = XLSX.read(new Uint8Array(ab), SL_XLSX_CH);
      return wb.SheetNames.map(function(n){ return {ten:n, rows:XLSX.utils.sheet_to_json(slSuaRef(wb.Sheets[n]), {header:1, raw:true, defval:''})}; });
    });
  };
  if(typeof Worker==='undefined' || typeof tvDoc!=='function') return trucTiep();
  return tvDoc('xlsx').then(function(src){
    if(!src) throw new Error('khong-co-ma');
    return new Promise(function(ok, loi){
      var ma = src+'\n;'+slSuaRef.toString()+';self.onmessage=function(e){try{var wb=XLSX.read(new Uint8Array(e.data),'+JSON.stringify(SL_XLSX_CH)+');'+
        'self.postMessage({ok:1,s:wb.SheetNames.map(function(n){return {ten:n,rows:XLSX.utils.sheet_to_json(slSuaRef(wb.Sheets[n]),{header:1,raw:true,defval:""})};})});}'+
        'catch(x){self.postMessage({ok:0,e:String(x&&x.message||x)});}};';
      var url = URL.createObjectURL(new Blob([ma], {type:'text/javascript'})), w;
      try{ w = new Worker(url); }catch(e){ URL.revokeObjectURL(url); return loi(e); }
      var het = setTimeout(function(){ w.terminate(); loi(new Error('quá lâu')); }, 240000);
      w.onmessage = function(e){ clearTimeout(het); w.terminate(); URL.revokeObjectURL(url); if(e.data && e.data.ok) ok(e.data.s); else loi(new Error(e.data && e.data.e || 'lỗi đọc')); };
      w.onerror = function(e){ clearTimeout(het); w.terminate(); URL.revokeObjectURL(url); if(e.preventDefault) e.preventDefault(); loi(new Error('worker')); };
      var ban = ab.slice(0);
      w.postMessage(ban, [ban]);
    });
  }).catch(function(e){
    if(e && /Excel|định dạng|Unsupported|Corrupt|zip/i.test(e.message||'')) throw e;
    return trucTiep();
  });
}

/* ---------- 2. NHẬN DẠNG + LẤY DÒNG DỮ LIỆU ---------- */
function slKhopLoai(L, co){
  var du = function(ds){ return ds.every(function(c){ return co[c]!==undefined; }); };
  return (du(L.can) || (L.cac||[]).some(du)) &&
    (!L.mot || L.mot.some(function(c){ return co[c]!==undefined; })) &&
    !(L.khong||[]).some(function(c){ return co[c]!==undefined; });
}
/* dò dòng tên cột: sheet BCQUERY trước, mỗi sheet 40 dòng đầu. Trả mọi (loại) khớp ở dòng tên cột đầu tiên tìm thấy */
function slTimDau(sheets){
  var ds = sheets.slice().sort(function(a,b){ return (b.ten==='BCQUERY')-(a.ten==='BCQUERY'); });
  for(var s=0;s<ds.length;s++){
    var rows = ds[s].rows || [];
    for(var r=0;r<Math.min(40, rows.length);r++){
      var co = {}, so = 0;
      (rows[r]||[]).forEach(function(x, i){ var t = slChuan(x); if(t && co[t]===undefined){ co[t] = i; so++; } });
      if(so<3) continue;
      var khop = SL_LOAI.filter(function(L){ return !L.tw && !L.kt && !L.rieng && slKhopLoai(L, co); });   /* 3.90: biểu TW đọc riêng · 3.93: BC0437/0438 đọc riêng */
      if(khop.length) return {sheet:ds[s], r:r, co:co, khop:khop};
    }
  }
  return null;
}
/* dòng tên cột có đủ cột của 1 loại anh chọn không — để báo cột thiếu */
function slThieuCot(sheets, L){
  var tot = null;
  sheets.forEach(function(sh){ (sh.rows||[]).slice(0, 40).forEach(function(row, r){
    var co = {}; (row||[]).forEach(function(x, i){ var t = slChuan(x); if(t && co[t]===undefined) co[t] = i; });
    var thieu = L.can.filter(function(c){ return co[c]===undefined; });
    if(!tot || thieu.length < tot.thieu.length) tot = {thieu:thieu, sheet:sh, r:r, co:co};
  }); });
  return tot;
}
function slMa(v, m){
  if(v===''||v==null) return '';
  var s = typeof v==='number' ? String(Math.round(v)) : String(v).trim();
  if(m && /^\d+$/.test(s) && s.length<m) s = ('00000000000000'+s).slice(-m);
  return s;
}
function slSo(v){   /* số: ô số giữ nguyên · ô chữ "1.234.567" / "1,234,567" bỏ dấu ngăn nghìn */
  if(typeof v==='number') return isFinite(v) ? v : 0;
  var s = String(v==null ? '' : v).replace(/\s+/g,''); if(!s) return 0;
  if(/^-?\d{1,3}([.,]\d{3})+$/.test(s)) s = s.replace(/[.,]/g,'');
  else if(/^-?\d+,\d+$/.test(s)) s = s.replace(',','.');
  var n = parseFloat(s.replace(/[^\d.\-]/g,'')); return isFinite(n) ? n : 0;
}
function slGiaTri(v, def){
  if(def.t==='n') return slSo(v);
  if(def.t==='d') return tdnNgay(v);
  if(def.m) return slMa(v, def.m);
  return (v===''||v==null) ? '' : String(v).replace(/\s+/g,' ').trim();
}
/* đọc bảng theo loại L từ dòng tên cột r */
function slLayDong(sheet, r, co, L){
  var cot = {};
  Object.keys(SL_TRUONG).forEach(function(f){
    var a = SL_TRUONG[f].a; for(var i=0;i<a.length;i++) if(co[a[i]]!==undefined){ cot[f] = co[a[i]]; return; }
  });
  var rows = sheet.rows, ra = [], bo = {trong:0, tieuDe:0, tong:0, ky:0, sai:0, trung:0}, mau = [];
  /* 3.86: loại giuHet (HS tín dụng) giữ CẢ các cột chưa khai báo → trường c_<tên cột>, kiểu theo dữ liệu (không bỏ sót, vd cột XKLĐ) */
  var THEM = {};
  if(L.giuHet){
    var daDung = {}; Object.keys(cot).forEach(function(f){ daDung[cot[f]] = 1; });
    (rows[r]||[]).forEach(function(h, j){
      var t = slChuan(h); if(!t || daDung[j]) return;
      var f = 'c_'+t.replace(/ /g,'_'); if(cot[f]!==undefined) f += '_'+j;
      var laSo = false; for(var i2=r+1;i2<Math.min(rows.length, r+400);i2++){ var v = (rows[i2]||[])[j]; if(v!=='' && v!=null){ laSo = typeof v==='number'; break; } }
      cot[f] = j; THEM[f] = laSo ? {t:'n'} : {};
    });
  }
  var dinh = function(f){ return SL_TRUONG[f] || THEM[f] || {}; };
  var truong = Object.keys(cot);
  var kd = SL_KHOA_DUNG[L.khoa], ck = cot[L.khoa], tdKhoa = slChuan((rows[r]||[])[ck]);
  var kp = L.khoaPhu && cot[L.khoaPhu]!==undefined ? L.khoaPhu : '', daCo = {}, lap = [];
  var TC = truong.map(function(f){ return cot[f]; }), TD = truong.map(dinh), NT = truong.length;   /* 3.369 (tối ưu nạp A2): cột + định dạng từng trường tính 1 lần, không tra lại ở mỗi ô */
  var coO = function(row){ for(var j=0;j<NT;j++){ var v = row[TC[j]]; if(v!=='' && v!=null && (typeof v!=='string' || v.trim()!=='')) return true; } return false; };
  for(var i=r+1;i<rows.length;i++){
    var row = rows[i]||[];
    if(!coO(row)){ bo.trong++; continue; }
    var k = slMa(row[ck], SL_TRUONG[L.khoa].m);
    if(slChuan(row[ck])===tdKhoa){ bo.tieuDe++; continue; }
    var chiKH = false;
    if(!kd.test(k) && kp && !String(row[ck]==null ? '' : row[ck]).trim() && SL_KHOA_DUNG[kp].test(slMa(row[cot[kp]], SL_TRUONG[kp].m))) chiKH = true;   /* 3.86: khách chỉ gửi tiết kiệm, không có món */
    if(!kd.test(k) && !chiKH){
      var chu = slChuan(row.join(' '));
      if(/\b(tong|cong|tong cong)\b/.test(chu)) bo.tong++;
      else if(/(nguoi lap|ky ten|kiem soat|giam doc|truong phong|ke toan|lap bieu|thu truong|ghi ro ho ten)/.test(chu)) bo.ky++;
      else if(/^(con lai ton|con tiet kiem| )+$/.test(chu)) bo.tieuDe++;   /* 3.108: DSTO dòng tên cột phụ (cột Số hộ tất nợ) */
      else { bo.sai++; if(mau.length<5) mau.push('dòng '+(i+1)+': '+row.filter(function(x){ return x!=='' && x!=null; }).slice(0,4).join(' · ')); }
      continue;
    }
    var o = {};
    for(var j=0;j<NT;j++) o[truong[j]] = slGiaTri(row[TC[j]], TD[j]);
    o[L.khoa] = chiKH ? '' : k;
    if(!chiKH && (L.giuHet || L.k==='dnct') && daCo[k]){   /* 3.121: Dư nợ chi tiết cũng tách dòng lặp (cùng khuôn Mẫu 31) · 3.87: khế ước lặp dòng (khách có nhiều sổ 105) → GIỮ NGUYÊN dòng lặp ở bảng riêng, không gộp, không cộng tiền */
      bo.trung++; lap.push(o); continue;
    }
    if(!chiKH) daCo[k] = o;
    ra.push(o);
  }
  return {rows:ra, lap:lap, truong:truong, bo:bo, mau:mau, them:THEM};
}

/* ---------- 3. KỲ (ngày chốt): cột ngày → ngày ở tiêu đề → tên file ---------- */
/* 3.135: kiểu ghi ngày dạng chữ của file — có ô số sau > 12 (10/25/2026) = tháng/ngày; số trước > 12 = ngày/tháng; mơ hồ thì so ngày trên tên file → 'md' | 'dm' | '' */
function slKieuNgay(sheet, r, tenFile){
  var dm = 0, md = 0, mo = {}, rows = sheet.rows || [], het = Math.min(rows.length, r+4000);
  for(var i=r+1;i<het;i++){ var row = rows[i]; if(!row) continue;
    for(var j=0;j<row.length;j++){ var v = row[j]; if(typeof v!=='string') continue; var x = v.trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})(?!\d)/); if(!x) continue;
      var a = +x[1], b = +x[2]; if(a>12 && b<=12) dm++; else if(b>12 && a<=12) md++; else if(a<=12 && b<=12 && a!==b) mo[x[3]+'-'+hai(a)+'-'+hai(b)+'|'+x[3]+'-'+hai(b)+'-'+hai(a)] = 1; } }
  if(md && !dm) return 'md'; if(dm) return 'dm';
  var tn = slNgayTrongChu(tenFile); if(!tn) return '';
  var k = Object.keys(mo); if(k.some(function(x){ return x.split('|')[0]===tn; }) && !k.some(function(x){ return x.split('|')[1]===tn; })) return 'md';   /* "10/07/2026" mà tên file ghi 07-10-2026 */
  return '';
}
function slNgayTrongChu(t){
  t = String(t||'');
  var hl = function(y, m, d){ y = +y; m = +m; d = +d; return (y>2000 && y<2100 && m>=1 && m<=12 && d>=1 && d<=31) ? y+'-'+hai(m)+'-'+hai(d) : ''; };
  var x, ra = '';
  if((x = t.match(/(\d{4})[-_. ](\d{1,2})[-_. ](\d{1,2})(?!\d)/))) ra = hl(x[1], x[2], x[3]);
  if(!ra && (x = t.match(/(?:^|\D)(\d{1,2})[-_. \/](\d{1,2})[-_. \/](\d{4})(?!\d)/))) ra = hl(x[3], x[2], x[1]);
  if(!ra && (x = t.match(/(?:^|\D)(\d{2})(\d{2})(\d{4})(?!\d)/))) ra = hl(x[3], x[2], x[1]);
  if(!ra && (x = slChuan(t).match(/(?:^| )(?:t|thang)\s?0?(\d{1,2}) (?:nam )?(\d{4})(?: |$)/))){ var y = +x[2], m = +x[1]; if(m>=1 && m<=12) ra = y+'-'+hai(m)+'-'+hai(new Date(y, m, 0).getDate()); }
  return ra;
}
/* 3.87: ngày XUẤT file — tên file có 2 ngày (vd QUERY…_02092026_…_31-08-2026): ngày lớn hơn ngày số liệu là ngày xuất */
function slNgayXuat(tenFile, ngay){
  var t = String(tenFile||''), ra = '', x, ds = [];
  var hl = function(y, m, d){ y = +y; m = +m; d = +d; return (y>2000 && y<2100 && m>=1 && m<=12 && d>=1 && d<=31) ? y+'-'+hai(m)+'-'+hai(d) : ''; };
  var re1 = /(\d{4})[-_. ](\d{1,2})[-_. ](\d{1,2})(?!\d)/g, re2 = /(?:^|\D)(\d{1,2})[-_. ](\d{1,2})[-_. ](\d{4})(?!\d)/g, re3 = /(?:^|\D)(\d{2})(\d{2})(\d{4})(?!\d)/g;
  while((x = re1.exec(t))) ds.push(hl(x[1], x[2], x[3]));
  while((x = re2.exec(t))) ds.push(hl(x[3], x[2], x[1]));
  while((x = re3.exec(t))) ds.push(hl(x[3], x[2], x[1]));
  ds.forEach(function(d){ if(d && ngay && d > ngay && d > ra) ra = d; });
  return ra;
}
function slTimKy(sheet, r, rows, tenFile){
  var c = {};
  rows.forEach(function(o){ if(o.nbc) c[o.nbc] = (c[o.nbc]||0)+1; });
  var ds = Object.keys(c).sort(function(a,b){ return c[b]-c[a]; });
  var tieuDe = sheet.rows.slice(0, r).map(function(x){ return (x||[]).join(' '); }).join(' ');
  var tuTD = slNgayTrongChu(tieuDe), tuTen = slNgayTrongChu(tenFile);
  var kq = ds.length ? {ngay:ds[0], nguon:'cột ngày trong file', nhieu:ds.length>1 ? ds.length : 0}
    : tuTD ? {ngay:tuTD, nguon:'tiêu đề trong file'}
    : tuTen ? {ngay:tuTen, nguon:'tên file'} : {ngay:'', nguon:''};
  kq.trongFile = ds[0] || tuTD || '';   /* ngày ghi BÊN TRONG file (để kiểm khi anh tự chọn kỳ) */
  kq.tuTen = tuTen;
  return kq;
}

/* ---------- 4. TỔNG CHÍNH của từng loại ---------- */
function slTong(loai, rows, lap){
  var t = {n:rows.length}, cong = function(f){ return rows.reduce(function(a, o){ return a+(o[f]||0); }, 0); };
  var dem = function(f){ var x = {}; rows.forEach(function(o){ if(o[f]) x[o[f]] = 1; }); return Object.keys(x).length; };
  if(slLaHS(loai) || loai==='dnct'){   /* 3.121: Dư nợ chi tiết tính tổng như Mẫu 31 để đối chiếu */
    t.kh = dem('kh'); ['dn','th','qh','kn','gn','lt'].forEach(function(f){ t[f] = cong(f); });   /* dòng lặp khế ước ở bảng riêng → dư nợ không cộng trùng */
    /* 3.87: '105 ngày BC' là TỔNG 105 của khách (anh Nhân xác nhận) → lấy 1 lần mỗi khách, không cộng theo dòng */
    var s105 = {}, so = {};
    rows.concat(lap||[]).forEach(function(o){ if(!o.kh) return; if((o.t105||0) > (s105[o.kh]||0)) s105[o.kh] = o.t105; if(o.stk) (so[o.kh] = so[o.kh]||{})[o.stk] = 1; });
    t.t105 = Object.keys(s105).reduce(function(a, k){ return a+s105[k]; }, 0);
    t.khNhieuSo = Object.keys(so).filter(function(k){ return Object.keys(so[k]).length>1; }).length;
    t.lap = (lap||[]).length;
    t.mon = rows.filter(function(o){ return o.ku; }).length;
    t.tatToan = rows.filter(function(o){ return o.ku && o.ttMon==='CLOSE'; }).length;
    t.chiTK = rows.filter(function(o){ return !o.ku; }).length;
    if(rows.length && rows[0].gnT!==undefined){   /* Mẫu 31: phát sinh trong tháng lấy thẳng từ hệ thống */
      ['gnT','dkT','tnTH','tnQH','tnK','xoaT','ltTH','ltQH'].forEach(function(f){ t[f] = cong(f); });
      t.monGN = rows.filter(function(o){ return o.gnT>0; }).length;
    }
  }
  if(loai==='khd'){ t.kh = dem('kh'); t.dn = cong('dn'); t.qh = cong('qh'); }
  if(loai==='nqh'){ t.kh = dem('kh'); t.qh = cong('qh'); t.cqh = cong('cqh'); t.moi = rows.filter(function(o){ return o.cqh>0; }).length; }
  if(loai==='nk'){ t.kh = dem('kh'); t.kn = cong('kn'); }
  if(loai==='tdn'){ ['skh','dn','th','qh','kn'].forEach(function(f){ t[f] = cong(f); }); }
  return t;
}
function slTomTat(loai, t){
  if(!t) return '';
  if(t.tw) return slTomTatTW(loai, t);   /* 3.90 */
  if(t.kt) return ktTomTat(loai, t);   /* 3.93 */
  if(t.rieng) return slTomRieng(loai, t);   /* 3.201 */
  return {hstd:(t.mon!==undefined ? t.mon : t.n)+' món · '+tdnTr(t.dn), khd:t.n+' món · '+tdnTr(t.dn), nqh:t.n+' món · '+tdnTr(t.qh),
          nk:t.n+' món · '+tdnTr(t.kn), tdn:tdnTr(t.dn), tt:t.n+' tổ'}[loai] || (t.n+' dòng');
}

/* ---------- 5. ĐỌC MỘT FILE → kết quả xem trước ---------- */
function slBam(ab){
  try{ if(window.crypto && crypto.subtle) return crypto.subtle.digest('SHA-256', ab).then(function(h){ return Array.prototype.map.call(new Uint8Array(h), function(b){ return ('0'+b.toString(16)).slice(-2); }).join(''); }).catch(function(){ return 'k'+ab.byteLength; }); }catch(e){}
  return Promise.resolve('k'+ab.byteLength);
}
function slDocFile(file, loaiChon){
  var kq = {file:file, ten:file.name, kich:file.size, loi:'', canhBao:[]};
  return file.arrayBuffer().then(function(ab){
    return Promise.all([slDocSheet(ab), slBam(ab)]);
  }).then(function(r){
    kq.sheets = r[0]; kq.hash = r[1];
    return slPhanTich(kq, loaiChon);
  }).catch(function(e){ kq.loi = 'Không đọc được file: '+(e && e.message || e); return kq; });
}
/* phân tích (gọi lại được khi anh đổi loại ở bảng xem trước) */
function slPhanTich(kq, loaiChon){
  kq.loi = ''; kq.canhBao = []; kq.loai = ''; kq.goiY = '';
  var kt = ktDocBC(kq.sheets||[]);   /* 3.93: BC0437 / BC0438 (KTGS Hội đoàn thể) */
  if(kt){
    if(loaiChon && loaiChon!==kt.k){ kq.loi = 'Nội dung file giống “'+slLoai(kt.k).ten+'”, không phải “'+slLoai(loaiChon).ten+'” anh chọn.'; kq.goiY = kt.k; return kq; }
    return ktPhanTich(kq, kt);
  }
  var rg = slDocRieng(kq.sheets||[]);   /* 3.201: Mẫu 01/TV · Sao kê TK 104 / 105 */
  if(rg){
    if(loaiChon && loaiChon!==rg.k){ kq.loi = 'Nội dung file giống “'+slLoai(rg.k).ten+'”, không phải “'+slLoai(loaiChon).ten+'” anh chọn.'; kq.goiY = rg.k; return kq; }
    return slPhanTichRieng(kq, rg);
  }
  if(loaiChon && slLoai(loaiChon).rieng){ kq.loi = 'File không đúng khuôn “'+slLoai(loaiChon).ten+'”.'; return kq; }
  if(loaiChon && slLoai(loaiChon).kt){ kq.loi = 'File không đúng khuôn “'+slLoai(loaiChon).ten+'” (dòng đầu phải là tiêu đề THÔNG TIN TỔ TK&VV… / THÔNG TIN ỦY THÁC…).'; return kq; }
  var tw = slDocTW(kq.sheets||[], kq.ten);   /* 3.90: biểu tổng hợp chuẩn TW (BCDHTD, LEN_31; B32 bỏ 3.145) */
  if(tw){
    if(slLoai(tw.k).bo){ kq.loi = slLoai(tw.k).bo; return kq; }   /* 3.145 */
    if(loaiChon && loaiChon!==tw.k){ kq.loi = 'Nội dung file giống “'+slLoai(tw.k).ten+'”, không phải “'+slLoai(loaiChon).ten+'” anh chọn.'; kq.goiY = tw.k; return kq; }
    return slPhanTichTW(kq, tw);
  }
  if(loaiChon && slLoai(loaiChon).tw){ kq.loi = 'File không đúng khuôn biểu “'+slLoai(loaiChon).ten+'” (không thấy hàng mốc cột (1) (2) (3)…).'; return kq; }
  var dau = slTimDau(kq.sheets||[]);
  var nhan = dau ? dau.khop.map(function(L){ return L.k; }) : [];
  var L = null;
  if(loaiChon){
    L = slLoai(loaiChon);
    if(nhan.length && nhan.indexOf(loaiChon)<0){
      kq.loi = 'Nội dung file giống “'+slLoai(nhan[0]).ten+'”, không phải “'+L.ten+'” anh chọn.'; kq.goiY = nhan[0]; return kq;
    }
    if(!nhan.length){
      var t = slThieuCot(kq.sheets||[], L);
      kq.loi = 'File không có đủ cột của “'+L.ten+'”'+(t && t.thieu.length ? ' — thiếu: '+t.thieu.join(', ') : '')+'.'; return kq;
    }
  } else {
    if(!nhan.length){
      var tf = slChuan(kq.ten), goi = SL_LOAI.find(function(x){ return x.tenFile.some(function(w){ return tf.indexOf(w)>=0; }); });
      kq.loi = 'Không nhận ra loại file (không thấy bảng có cột đặc trưng của '+SL_LOAI.length+' loại).'+(goi ? ' Tên file giống “'+goi.ten+'” — anh chọn loại để kiểm lại.' : '');
      return kq;
    }
    if(nhan.length>1){
      var tf2 = slChuan(kq.ten), uu = nhan.filter(function(k){ return slLoai(k).tenFile.some(function(w){ return tf2.indexOf(w)>=0; }); });
      if(uu.length!==1){ kq.loi = 'File khớp nhiều loại ('+nhan.map(function(k){ return slLoai(k).ten; }).join(', ')+') — anh chọn loại.'; return kq; }
      nhan = uu;
    }
    L = slLoai(nhan[0]);
  }
  if(L.bo){ kq.loi = L.bo; return kq; }   /* 3.90: loại đã bỏ */
  kq.loai = L.k;
  if(L.an) (kq.canhBao = kq.canhBao || []).push(L.an);   /* 3.202 */
  if(L.k==='dsto') (kq.canhBao = kq.canhBao || []).push('Danh sách tổ kiểu cũ (DSTO) — không có CCCD, TK 104 tổ trưởng; nên xuất Danh sách tổ hệ thống (baocao_…).');
  var kn = slKieuNgay(dau.sheet, dau.r, kq.ten), d;   /* 3.135: file ghi ngày kiểu tháng/ngày (Mỹ) → đọc đúng */
  TDN_MD = kn==='md'; try { d = slLayDong(dau.sheet, dau.r, dau.co, L); } finally { TDN_MD = false; }
  if(kn==='md') kq.canhBao.push('File ghi ngày dạng chữ kiểu tháng/ngày/năm (Mỹ) — app đã đọc theo kiểu này (vd 10/7/2026 = 07/10/2026).');
  var ky = slTimKy(dau.sheet, dau.r, d.rows, kq.ten);   /* 3.131: đọc ngày TRƯỚC khi gọn cột — Dư nợ chi tiết lấy kỳ theo cột "Ngày số liệu" trong file, không theo tên file (tên ghi ngày xuất) */
  if(L.chi){ var gon = function(o){ var r = {}; L.chi.forEach(function(f){ if(o[f]!==undefined) r[f] = o[f]; }); return r; };   /* 3.120: file tham chiếu — chỉ lưu cột cần dùng */
    d.rows = d.rows.map(gon); d.lap = (d.lap||[]).map(gon); d.truong = d.truong.filter(function(f){ return L.chi.indexOf(f)>=0; }); d.them = {}; }
  kq.rows = d.rows; kq.lap = d.lap; kq.truong = d.truong; kq.bo = d.bo; kq.mauSai = d.mau; kq.them = d.them;
  kq.mau31 = !!(d.them && Object.keys(d.them).length > 40) || d.truong.indexOf('ttMon')>=0;
  kq.sheet = dau.sheet.ten; kq.hang = dau.r+1;
  if(!d.rows.length && L.k==='khd'){ kq.loi = 'File 3 tháng KHĐ không có dòng dữ liệu nào — anh xuất lại file mẫu 14 “Sao kê món vay N tháng không hoạt động (DL Tháng)”.'; return kq; }   /* 3.90 */
  if(!d.rows.length) kq.canhBao.push('File đúng mẫu “'+L.ten+'” nhưng không có dòng dữ liệu (0 dòng) — vẫn ghi nhận được, vd tháng không có món nào.');
  kq.ngay = ky.ngay; kq.nguonKy = ky.nguon; kq.trongFile = ky.trongFile;
  if(ky.nhieu) kq.canhBao.push('Cột Ngày báo cáo có '+ky.nhieu+' ngày khác nhau — lấy ngày nhiều nhất '+ngayVNsl(ky.ngay)+'.');
  if(ky.trongFile && ky.tuTen && ky.trongFile.slice(0,7)!==ky.tuTen.slice(0,7)) kq.canhBao.push('Tên file ghi '+ngayVNsl(ky.tuTen)+' nhưng trong file ghi '+ngayVNsl(ky.trongFile)+' — lấy theo trong file.');
  kq.ngayXuat = slNgayXuat(kq.ten, kq.ngay);
  if(kq.ngayXuat && !L.ngay) kq.canhBao.push('File xuất ngày '+ngayVNsl(kq.ngayXuat)+', sau ngày số liệu '+ngayVNsl(kq.ngay)+' — có thể đã lẫn phát sinh sau ngày chốt (lệch thì lấy Mẫu 31 làm chuẩn).');
  kq.ky = slKyTu(L, kq.ngay);   /* 3.90 */
  slCanKhai(kq, ky.tuTen);   /* 3.143 (Q14): trong file không ghi ngày → anh khai khi nạp (thay 3.136 tự lấy theo tên file) */
  kq.tong = slTong(L.k, d.rows, d.lap);
  if(d.bo.trung) kq.canhBao.push(d.bo.trung+' dòng lặp khế ước (khách có nhiều sổ 105, '+kq.tong.khNhieuSo+' KH) — giữ nguyên ở bảng riêng, dư nợ không cộng trùng, số dư 105 lấy 1 lần mỗi khách.');
  if(d.bo.sai) kq.canhBao.push(d.bo.sai+' dòng sai mã khóa, không lấy: '+d.mau.join(' | '));
  return kq;
}
/* 3.143 (anh chốt Q14, 10/10/2026): ngày số liệu phải lấy từ NỘI DUNG file (cột ngày / tiêu đề). Không có → anh khai khi nạp;
   ngày trên tên file (thường là ngày xuất) chỉ là GỢI Ý, không tự dùng. Ô Kỳ để trống, không tự tích, chưa khai thì không ghi nhận được. */
function slCanKhai(kq, tuTen){
  if(kq.loi || kq.nguonKy==='cột ngày trong file' || kq.nguonKy==='tiêu đề trong file') return kq;
  kq.canKhai = true; kq.goiYTen = tuTen || ''; kq.ngay = ''; kq.nguonKy = ''; kq.ky = '';
  return kq;
}
function slGoiYKy(kq){   /* giá trị cho ô Kỳ từ ngày gợi ý trên tên file */
  var g = kq.goiYTen || ''; if(!g) return '';
  return slChonNgay(kq.loai) ? g : g.slice(0, 7);
}
function ngayVNsl(iso){ return iso ? iso.slice(8,10)+'/'+iso.slice(5,7)+'/'+iso.slice(0,4) : ''; }

/* ---------- 6. DẠNG ĐỌC NHANH: lưu theo cột, chữ lặp thay bằng số thứ tự ---------- */
function slNen(rows, truong){   /* 3.369 (tối ưu nạp A3): vòng for thay map, cột chữ không lặp mới dựng mảng gốc — kết quả y như cũ */
  var cot = {}, n = rows.length;
  truong.forEach(function(f){
    var i, a;
    if(((SL_TRUONG[f]||{}).t || (slNen.them && slNen.them[f] && slNen.them[f].t))==='n'){ a = new Array(n); for(i=0;i<n;i++) a[i] = rows[i][f]; cot[f] = a; return; }
    var tu = {}, dsTu = [], chi = new Array(n);
    for(i=0;i<n;i++){ var v = rows[i][f]; if(v==null) v = ''; var j = tu[v]; if(j===undefined){ j = tu[v] = dsTu.length; dsTu.push(v); } chi[i] = j; }
    if(dsTu.length < n*0.6){ cot[f] = {d:dsTu, i:chi}; return; }
    a = new Array(n); for(i=0;i<n;i++) a[i] = rows[i][f]; cot[f] = a;
  });
  return cot;
}
function slMoBang(b){
  if(b._rows) return b._rows;
  var n = b.n, rows = new Array(n), i, j, ks = Object.keys(b.cot), m = ks.length;   /* 3.369 (A3): dựng theo từng dòng (đủ cột rồi sang dòng sau) — nhanh hơn, thứ tự trường như cũ */
  var gt = ks.map(function(f){ var c = b.cot[f]; return Array.isArray(c) ? c : c.d; }), cs = ks.map(function(f){ var c = b.cot[f]; return Array.isArray(c) ? null : c.i; });
  for(i=0;i<n;i++){ var o = {}; for(j=0;j<m;j++) o[ks[j]] = cs[j] ? gt[j][cs[j][i]] : gt[j][i]; rows[i] = o; }
  Object.defineProperty(b, '_rows', {value:rows, enumerable:false, configurable:true});
  return rows;
}
function slMoLap(b){ return b && b.lap ? slMoBang(b.lap) : []; }   /* 3.87: dòng lặp khế ước (nhiều sổ 105) giữ nguyên như file */
function slGZ(chu){
  if(typeof CompressionStream==='undefined') return Promise.resolve({blob:new Blob([chu], {type:'application/json'}), duoi:'.json'});
  return new Response(new Blob([chu]).stream().pipeThrough(new CompressionStream('gzip'))).blob()
    .then(function(b){ return {blob:new Blob([b], {type:'application/gzip'}), duoi:'.json.gz'}; });
}
function slMoGZ(blob){
  return blob.slice(0, 2).arrayBuffer().then(function(h){
    var u = new Uint8Array(h);
    if(u[0]===0x1f && u[1]===0x8b){
      if(typeof DecompressionStream==='undefined') throw new Error('Trình duyệt chưa giải nén được — cập nhật trình duyệt');
      return new Response(blob.stream().pipeThrough(new DecompressionStream('gzip'))).text();
    }
    return blob.text();
  }).then(function(t){ return JSON.parse(t); });
}

/* ---------- 7. CHỈ MỤC (meta) + danh bạ khách hàng ---------- */
var SLM = {bang:{}, xoa:{}, ndt:{}, kt:{}, dbLuc:'', suaLuc:''};
var SL_SAN = false, SL_DB = null, SL_TIM = [], SL_BO = {}, SL_KY = '', SL_LECH = 0;
function slKhoa(loai, ky){ return loai+'|'+ky; }
function slIDB(loai, ky){ return 'sl_b_'+loai+'_'+ky; }
function slChuanMeta(j){ j = j||{}; return {bang:j.bang||{}, xoa:j.xoa||{}, ndt:j.ndt||{}, kt:j.kt||{}, ktg:j.ktg||{}, dbLuc:j.dbLuc||'', suaLuc:j.suaLuc||''}; }   /* 3.91: chot = chốt / mở khóa theo tháng */   /* 3.88: kt = kết quả kiểm tra theo tháng */
function slNap(){
  return docFile('sl_meta').then(function(s){
    if(s){ try{ SLM = slChuanMeta(typeof s==='string' ? JSON.parse(s) : s); }catch(e){ console.warn('sl_meta hỏng', e); } }
    SL_SAN = true;
    return slNapDanhBa().then(slBoLoaiDon).then(function(r){ if(typeof kyChungVe==='function') kyChungVe(); return r; });
  }).catch(function(){ SL_SAN = true; });
}
function slLuuMeta(){
  SLM.suaLuc = new Date().toISOString();
  var p = luuFile('sl_meta', JSON.stringify(SLM));
  slHenDay();
  if(typeof kyChungVe==='function') setTimeout(kyChungVe, 0);   /* 3.149: danh sách kỳ đổi theo file */
  return p;
}
function slNapDanhBa(){
  return docFile('sl_danhba').then(function(db){
    SL_DB = (db && db.kh) ? db : {luc:'', kh:{}};
    slDungTim();
    if(!Object.keys(SL_DB.kh).length && Object.keys(SLM.bang).some(function(k){ return /^hstd\|/.test(k); })) return slDungDanhBa();
    var kh = SL_DB.kh, ma = Object.keys(kh);   /* 3.128: máy đã nạp Dư nợ chi tiết TRƯỚC Mẫu 31 → số TK 105 chưa gắn → gắn lại 1 lần */
    if(ma.length && Object.keys(SLM.bang).some(function(k){ return /^dnct\|/.test(k); }) && !ma.some(function(m){ return kh[m].stkNguon==='dnct'; })) return slApDnct().then(slLuuDanhBa);
  });
}
/* 3.128: gắn số TK 105 từ mọi bảng Dư nợ chi tiết đã nạp (kỳ cũ trước, kỳ mới thay) vào danh bạ — khách vào danh bạ sau file Dư nợ chi tiết vẫn có số TK */
function slApDnct(){
  var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai==='dnct'; })
    .sort(function(a, b){ var x = slThuTu(a.ky), y = slThuTu(b.ky); return x<y ? -1 : x>y ? 1 : 0; });
  if(!ds.length) return Promise.resolve();
  return ds.reduce(function(p, e){ return p.then(function(){ return slDocBang('dnct', e.ky).then(function(b){ if(b) slVaoDanhBa('dnct', e.ky, slMoBang(b), slMoLap(b)); }); }); }, Promise.resolve())
    .then(function(){ TO_KS = {}; TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null; });   /* cây tổ dựng trước đó chưa có số TK → dựng lại khi xem */
}
/* đưa dòng của 1 bảng (hstd / kh / tt) vào danh bạ: mỗi KH giữ thông tin của kỳ mới nhất */
function slVaoDanhBa(loai, ky, rows, lap){
  if(!SL_DB) SL_DB = {luc:'', kh:{}};
  if(loai==='tt'){ SL_DB.to = SL_DB.to||{}; rows.forEach(function(o){ var c = SL_DB.to[o.to]; if(!c || c.ky<=ky) SL_DB.to[o.to] = {ten:o.toTen, sdt:o.sdt, dv:o.dv, thon:o.thon, tenThon:o.tenThon, diem:o.tenDiem, ngayGD:o.ngayGD, pho:o.phoTen, ky:ky}; }); return; }
  if(loai==='dnct'){   /* 3.120: Dư nợ chi tiết chỉ tham chiếu số TK 105 — gắn vào khách đã có (Mẫu 31 là chính), kỳ mới hơn thay kỳ cũ */
    var tk = {}; rows.concat(lap||[]).forEach(function(o){ if(!o.kh) return; slStk(o.stk).forEach(function(x){ var a = tk[o.kh] = tk[o.kh]||[]; if(a.indexOf(x)<0) a.push(x); }); });
    Object.keys(tk).forEach(function(ma){ var c = SL_DB.kh[ma]; if(!c || (c.stkNguon==='dnct' && c.stkKy && slThuTu(c.stkKy) > slThuTu(ky))) return; c.stk = tk[ma].join(', '); c.stkKy = ky; c.stkNguon = 'dnct'; });
    return;
  }
  var theo = {}, theoLap = {};
  rows.forEach(function(o){ if(o.kh){ (theo[o.kh] = theo[o.kh]||[]).push(o); } });
  (lap||[]).forEach(function(o){ if(o.kh){ (theoLap[o.kh] = theoLap[o.kh]||[]).push(o); } });
  Object.keys(theo).forEach(function(ma){
    var ds = theo[ma], o = ds[0], c = SL_DB.kh[ma];
    if(c && slThuTu(c.ky) > slThuTu(ky)){   /* kỳ cũ hơn bản đang có: chỉ bổ sung khế ước */
      if(slLaHS(loai)){ c.ku = c.ku||[]; ds.forEach(function(x){ if(x.ku && c.ku.indexOf(x.ku)<0) c.ku.push(x.ku); }); }
      return;
    }
    var moi = {ten:o.ten, ns:o.ns, cccd:o.cccd, ncap:o.ncap, noiCap:o.noiCap, dc:o.dc, xa:o.xa, tenXa:o.tenXa, thon:o.thon, tenThon:o.tenThon, to:o.to, toTen:o.toTen, dv:o.dv,
               sdt:o.sdt||'', gt:o.gt||'', voChong:o.voChong||'', danToc:o.danToc||'', ky:ky};
    var tat = ds.concat(theoLap[ma]||[]), stk = [];   /* 3.87: mọi sổ 105 kể cả ở dòng lặp; số dư 105 = tổng của khách → lấy 1 lần (số lớn nhất) */
    tat.forEach(function(x){ slStk(x.stk).forEach(function(t){ if(stk.indexOf(t)<0) stk.push(t); }); });   /* 3.120: chỉ nhận số sổ 10 chữ số */
    if(c && c.stkNguon==='dnct' && slStk(c.stk).length){ moi.stk = slStk(c.stk).join(', '); moi.stkKy = c.stkKy; moi.stkNguon = 'dnct'; }   /* 3.120 (anh chốt): số sổ 105 theo Dư nợ chi tiết (tham chiếu) — Mẫu 31 không đè */
    else if(stk.length){ moi.stk = stk.join(', '); moi.stkKy = ky; } else if(c && c.stk && slStk(c.stk).length){ moi.stk = slStk(c.stk).join(', '); moi.stkKy = c.stkKy || c.ky; }
    var t105 = tat.reduce(function(a, x){ return Math.max(a, x.t105||0); }, 0); if(t105 || stk.length || tat.some(function(x){ return x.t105!==undefined; })) moi.t105 = t105;   /* 3.120: số dư 105 lấy từ Mẫu 31, không phụ thuộc có số sổ */
    if(slLaHS(loai)){
      moi.mon = ds.filter(function(x){ return x.ku && (x.ttMon ? x.ttMon!=='CLOSE' : (x.dn||0)>0); }).length;
      var ku = (c && c.ku) ? c.ku.slice() : [];   /* 3.86: mọi khế ước từng thấy (kể cả đã tất toán, kỳ cũ) → tra theo khế ước */
      ds.forEach(function(x){ if(x.ku && ku.indexOf(x.ku)<0) ku.push(x.ku); });
      moi.ku = ku;
    }
    else if(c){ if(c.ku) moi.ku = c.ku; if(c.mon!==undefined) moi.mon = c.mon; }   /* Sao kê KH không có món → giữ khế ước / số món đã biết */
    if(c && c.ky===ky) Object.keys(c).forEach(function(k){ if((moi[k]===undefined || moi[k]==='') && c[k]!==undefined) moi[k] = c[k]; });
    else if(c) ['ns','cccd','ncap','noiCap','dc','sdt','gt','voChong','danToc','toTen'].forEach(function(k){ if(!moi[k] && c[k]) moi[k] = c[k]; });   /* 3.87: file mới thiếu cột (vd Mẫu 10 không có SĐT) → giữ thông tin nhận dạng đã biết */
    SL_DB.kh[ma] = moi;
  });
}
function slStk(v){ return String(v||'').split(/[,;\s]+/).filter(function(t){ return /^\d{10}$/.test(t); }); }   /* 3.120: số sổ TK 105 hợp lệ = 10 chữ số (bỏ số tài khoản hệ thống dạng 1482… của Mẫu 10) */
function slCoTK(v){ return /(^|\D)\d{13,14}(?!\d)/.test(String(v||'')); }   /* 3.138 (anh chốt): Mẫu 31 có số tài khoản 105 hệ thống (13–14 số, kể cả số dư 0) = đã mở TK */
function toStkChu(k){ return k.stk.length ? k.stk.join(', ') : (k.coTK && (k.conNo || k.dn>0 || k.lt>0 || k.chuaGN) ? 'đã mở TK' : ''); }   /* 3.138: chưa có số sổ 10 số nhưng đã có TK → "đã mở TK" · 3.138.1 (anh chốt): chỉ khách đang vay / chưa giải ngân — khách đã tất nợ (kể cả trước 2026) không ghi */
function slDungTim(){
  var to = (SL_DB && SL_DB.to) || {};
  SL_TIM = Object.keys((SL_DB && SL_DB.kh) || {}).map(function(ma){
    var c = SL_DB.kh[ma], t = to[c.to] || {};
    return {m:ma, t:' '+slChuan([c.ten, c.tenThon||t.tenThon||'', c.toTen||t.ten||''].join(' ')), c:String(c.cccd||''), ns:c.ns||'', ten:c.ten||'',
            s:String(c.sdt||'').replace(/\D/g,''), k:' '+(c.ku||[]).join(' ')};
  });
}
function slLuuDanhBa(){
  SL_DB.luc = new Date().toISOString(); SLM.dbLuc = SL_DB.luc; SLM.choDayDB = true;
  slDungTim();
  return luuFile('sl_danhba', SL_DB);
}
/* dựng lại danh bạ từ mọi bảng đã có (sau khi xóa / máy mới) — đi từ kỳ cũ tới kỳ mới */
function slDungDanhBa(){
  SL_DB = {luc:'', kh:{}, to:{}};
  var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; })
    .filter(function(e){ return slLaHS(e.loai) || e.loai==='tt'; })
    .sort(function(a,b){ var x = slThuTu(a.ky), y = slThuTu(b.ky); return x<y ? -1 : x>y ? 1 : 0; });
  return ds.reduce(function(p, e){
    return p.then(function(){ return slDocBang(e.loai, e.ky).then(function(b){ if(b) slVaoDanhBa(e.loai, e.ky, slMoBang(b), slMoLap(b)); }); });
  }, Promise.resolve()).then(slApDnct).then(function(){ return slLuuDanhBa(); });   /* 3.130: Dư nợ chi tiết gắn SAU mọi Mẫu 31 (kỳ cũ → mới) — file tháng cũ (vd 12/2025) vẫn giữ số sổ của khách nay đã tất nợ */
}

/* đọc 1 bảng: trong máy → không có thì tải từ Drive */
function slDocBang(loai, ky){
  return docFile(slIDB(loai, ky)).then(function(b){
    if(b && b.cot) return b;
    var e = SLM.bang[slKhoa(loai, ky)];
    if(!e || !e.dl || !coTheNoiDrive()) return null;
    return slTaiBlob(e.dl).then(slMoGZ).then(function(b2){ luuFile(slIDB(loai, ky), b2); e.canTai = false; return b2; })
      .catch(function(er){ console.warn('Không tải được số liệu', loai, ky, er); return null; });
  });
}
function slTaiBlob(id){
  return canToken().then(function(co){
    if(!co) throw new Error('Chưa nối Drive');
    return fetch('https://www.googleapis.com/drive/v3/files/'+id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}});
  }).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.blob(); });
}

/* ---------- 8. GHI NHẬN 1 file đã đọc ---------- */
function slGhi(kq){
  if(kq && !kq.loi && slTuy(kq.loai) && kq.ky){   /* 3.90: chuẩn hóa kỳ — ngày cuối tháng → ô tháng, ngày khác → ô ngày */
    var ngT = kq.ky.length>7 ? kq.ky : ((kq.ngay && slThang(kq.ngay)===kq.ky) ? kq.ngay : tdnCuoiKy(kq.ky));
    kq.ngay = ngT; kq.ky = slKyTu(slLoai(kq.loai), ngT);
  }
  if(!kq || kq.loi || !kq.loai || !slKyHopLe(kq.loai, kq.ky) || !kq.rows) return Promise.reject(new Error('File chưa đọc được hoặc chưa có kỳ'));
  var L = slLoai(kq.loai), ky = kq.ky, k = slKhoa(kq.loai, ky), cu = SLM.bang[k];
  slNen.them = kq.them || {};
  var b = {v:1, loai:kq.loai, ky:ky, ngay:kq.ngay, n:kq.rows.length, cot:slNen(kq.rows, kq.truong)};
  if(kq.lap && kq.lap.length) b.lap = {n:kq.lap.length, cot:slNen(kq.lap, kq.truong)};   /* 3.87: dòng lặp giữ nguyên */
  slNen.them = null;
  var e = {loai:kq.loai, ky:ky, ngay:kq.ngay, nguonKy:kq.nguonKy, ngayXuat:kq.ngayXuat||'', tenFile:kq.ten, kich:kq.kich, hash:kq.hash, sheet:kq.sheet, hang:kq.hang,
           soDong:kq.rows.length, bo:kq.bo, tong:kq.tong, ngayLap:kq.ngayLap||'', donVi:kq.donVi||'', ban:APP_BAN, luc:new Date().toISOString(), may:maMayCua(), choDay:true, cuGoc:'', cuDl:''};
  if(cu){ e.cuGoc = [cu.goc, cu.cuGoc].filter(Boolean).join(','); e.cuDl = [cu.dl, cu.cuDl].filter(Boolean).join(','); e.lanThay = (cu.lanThay||0)+1; e.tenTruoc = cu.tenFile||''; }   /* 3.400: sổ nạp ghi lần thay */   /* bản cũ trên Drive → thùng rác Drive khi đẩy bản mới */
  var giu = Promise.resolve();
  if(cu) giu = slRacVao(k, 'Thay bằng file mới “'+(kq.ten||'')+'”');   /* 3.153 (anh chốt): bản cũ vào 🗑 Thùng rác (ngăn Số liệu) — bỏ ↩ hoàn tác lần thay */
  return giu.then(function(){ return Promise.all([luuFile(slIDB(kq.loai, ky), b), luuFile('sl_g_'+kq.loai+'_'+ky, kq.file)]); }).then(function(){
    SLM.bang[k] = e; delete SLM.xoa[k];
    slBoXoa(ky);
    if(/^tk10[45]$/.test(kq.loai)) Object.keys(TO_KS).forEach(function(x){ delete TO_KS[x]; });   /* 3.201: Sao kê TK 104 / 105 gắn vào mọi kỳ đã dựng (K.tk) → dựng lại */
    if(slLaHS(kq.loai) || kq.loai==='tt' || kq.loai==='dnct'){ slVaoDanhBa(kq.loai, ky, kq.rows, kq.lap); return (kq.loai==='dnct' ? Promise.resolve() : slApDnct()).then(slLuuDanhBa); }   /* 3.128: nạp Mẫu 31 sau Dư nợ chi tiết → gắn lại số TK 105 */
  }).then(function(){ return slLuuMeta(); }).then(function(){ if(/^tk10[45]$/.test(kq.loai) && TO_K && typeof tkNapMoi==='function') return tkNapMoi(TO_K).catch(function(){}); })   /* 3.205: kỳ đang mở nhận Sao kê ngay (không cần tải lại trang) */
    .then(function(){ return L.ten+' '+slKyChu(ky); });
}
/* ---------- 3.153 (anh chốt "thống nhất quy tắc xóa"): Ô SỐ LIỆU VÀO 🗑 THÙNG RÁC APP (ngăn Số liệu) ----------
   Xóa ô / cả tháng / bản theo ngày cũ / bản cũ khi thay file → mục khoCu 'soLieu' trong D.rac, giữ bản trong máy (bảng + file gốc) ở khóa slr_<id>_a / _g.
   File trên Drive vẫn vào Thùng rác Drive như cũ. Khôi phục: chép lại bản trong máy; thiếu thì lấy lại từ Thùng rác Drive (cần nối Drive).
   Xóa hẳn (hoặc tự xóa sau 30 ngày): bỏ bản trong máy. Meta cũ có e.truoc (3.145) → chuyển 1 lần thành mục thùng rác. */
var SL_TRUOC_NGAY = 30;
function slTruoc(e){ var t = e && e.truoc; if(!t) return null; return (Date.now()-new Date(t.thayLuc||0).getTime()) <= SL_TRUOC_NGAY*864e5 ? t : null; }
function slBoRac(id){ return goiDrive('https://www.googleapis.com/drive/v3/files/'+id+'?fields=id', {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({trashed:false})}); }   /* lấy lại từ Thùng rác Drive */
function slRacCho(ids){   /* file Drive → Thùng rác ngay nếu đang nối, không thì chờ lần nối sau (sl_rac_cho) */
  ids = (ids||[]).filter(Boolean); if(!ids.length) return Promise.resolve();
  if(coTheNoiDrive() && DR.sanSang){ ids.forEach(function(id){ xoaFileDrive(id).catch(function(){}); }); return Promise.resolve(); }
  return docFile('sl_rac_cho').then(function(cu){ return luuFile('sl_rac_cho', (Array.isArray(cu) ? cu : []).concat(ids)); });
}
function slRacMuc(e, lyDo, kA, kG){
  var L = slLoai(e.loai) || {ten:e.loai}, id = 'slr'+Date.now().toString(36)+Math.random().toString(36).slice(2, 6), now = new Date().toISOString();
  var c = {}; Object.keys(e).forEach(function(f){ if(f!=='truoc' && f!=='canTai') c[f] = e[f]; });
  var m = {id:id, khoCu:'soLieu', tenMoi:L.ten+' · '+slKyChu(e.ky)+' — '+slTenGoc(e), co:+e.kich||0, xoaLuc:now, suaLuc:now, lyDoXoa:lyDo||'Anh xóa',
           sl:{loai:e.loai, ky:e.ky, e:c}, kA:kA || 'slr_'+id+'_a', kG:kG || 'slr_'+id+'_g'};
  D.rac = D.rac || []; D.rac.push(m); return m;
}
function slRacVao(k, lyDo){   /* chép bản trong máy của ô k sang khóa thùng rác + thêm mục vào D.rac (ô vẫn còn — người gọi tự bỏ) */
  var e = SLM.bang[k]; if(!e) return Promise.resolve(null);
  var a = slIDB(e.loai, e.ky), g = 'sl_g_'+e.loai+'_'+e.ky, m = slRacMuc(e, lyDo);
  return Promise.all([docFile(a), docFile(g)]).then(function(r){
    return Promise.all([r[0] ? luuFile(m.kA, r[0]) : null, r[1] ? luuFile(m.kG, r[1]) : null]);
  }).catch(function(){}).then(function(){ luu(); if(typeof capNhatDemRac==='function') capNhatDemRac(); return m; });
}
function slChuyenTruoc(){   /* 3.153: bản trước (3.145, e.truoc + khóa _truoc) → mục Thùng rác, 1 lần */
  var doi = 0;
  Object.keys(SLM.bang).forEach(function(k){ var e = SLM.bang[k]; if(!e || !e.truoc) return;
    var t = slTruoc(e);
    if(t){ t.loai = t.loai || e.loai; t.ky = t.ky || e.ky; var m = slRacMuc(t, 'Bản trước lần thay (từ bản cũ)', slIDB(e.loai, e.ky)+'_truoc', 'sl_g_'+e.loai+'_'+e.ky+'_truoc'); m.xoaLuc = t.thayLuc || m.xoaLuc; }
    else { xoaFile(slIDB(e.loai, e.ky)+'_truoc'); xoaFile('sl_g_'+e.loai+'_'+e.ky+'_truoc'); }
    delete e.truoc; doi++; });
  if(doi){ luu(); slLuuMeta(); }
  return doi;
}
function slKhoiPhucRac(m){   /* trả Promise — mục đã được bỏ khỏi D.rac trước khi gọi */
  var s = m.sl || {}, k = slKhoa(s.loai, s.ky), e = JSON.parse(JSON.stringify(s.e || {})), L = slLoai(s.loai) || {ten:s.loai};
  var a = slIDB(s.loai, s.ky), g = 'sl_g_'+s.loai+'_'+s.ky, coDrive = coTheNoiDrive() && DR.sanSang;
  var hien = SLM.bang[k];
  /* ô đang có file khác → file đó vào Thùng rác trước (khôi phục = đổi chỗ 2 bản) */
  var p = hien ? slRacVao(k, 'Thay khi khôi phục bản “'+(e.tenFile||'')+'”').then(function(){ slRacCho([hien.goc, hien.dl]); }) : Promise.resolve();
  return p.then(function(){ return Promise.all([docFile(m.kA), docFile(m.kG)]); }).then(function(x){
    if(!x[0] && !(coDrive && e.dl)) throw new Error(coDrive ? 'không còn dữ liệu của ô này' : 'cần nối Drive để lấy lại dữ liệu từ Thùng rác Drive');
    var buoc = [];
    if(x[0]) buoc.push(luuFile(a, x[0])); else { buoc.push(slBoRac(e.dl)); e.canTai = true; }
    if(x[1]) buoc.push(luuFile(g, x[1]));
    if(coDrive){ if(e.goc) buoc.push(slBoRac(e.goc).catch(function(){ e.goc = ''; })); if(x[0] && e.dl) buoc.push(slBoRac(e.dl).catch(function(){ e.dl = ''; })); }
    else { if(x[1]) e.goc = ''; if(x[0]) e.dl = ''; }
    return Promise.all(buoc).then(function(){
      e.cuGoc = ''; e.cuDl = ''; e.choDay = !e.goc || !e.dl;
      e.luc = new Date().toISOString(); e.khoiPhuc = e.luc; delete e.truoc;
      SLM.bang[k] = e; delete SLM.xoa[k]; slBoXoa(s.ky);
      xoaFile(m.kA); xoaFile(m.kG);
      return (slLaHS(s.loai) || s.loai==='tt' || s.loai==='dnct') ? slDungDanhBa() : null;
    });
  }).then(slLuuMeta).then(function(){ if(e.choDay) slHenDay(); return L.ten+' '+slKyChu(s.ky); });
}
function slXoaHanRac(m){ xoaFile(m.kA); xoaFile(m.kG); }
/* xóa 1 ô: không hỏi (quy tắc chung) — vào Thùng rác */
function slXoa(loai, ky){
  var k = slKhoa(loai, ky), e = SLM.bang[k]; if(!e) return;
  if(typeof slSoChot==='function' && slSoChot(loai, ky) && !slXoa.ok)   /* 3.357: ô của sổ chốt tổ viên 31/12 → hỏi trước */
    return void hoi('Xóa '+slLoai(loai).ten+' '+slKyChu(ky)+'?', 'Đây là số liệu chốt sổ tổ viên 31/12 — năm sau app dùng để đối chiếu tổ viên đã tất nợ. Vẫn vào 🗑 Thùng rác (khôi phục được 30 ngày).', 'Vẫn xóa', function(){ slXoa.ok = 1; try { slXoa(loai, ky); } finally { slXoa.ok = 0; } });
  return slXoaVaoRac([k], 'Anh xóa').then(function(ids){
    return ((slLaHS(loai) || loai==='tt' || loai==='dnct') ? slDungDanhBa() : Promise.resolve()).then(slLuuMeta).then(function(){
      if(coTheNoiDrive() && DR.sanSang) ids.forEach(function(id){ xoaFileDrive(id).catch(function(){}); });
      bao('Đã chuyển '+slLoai(loai).ten+' '+slKyChu(ky)+' vào 🗑 Thùng rác (ngăn Số liệu) — cần thì khôi phục ở đó.', 5); if(nganHienTai===7) veSoLieu();
    });
  });
}
/* xóa nhiều ô: chép từng ô vào Thùng rác rồi bỏ ô — trả về id file Drive để đưa vào Thùng rác Drive */
function slXoaVaoRac(khoa, lyDo){
  return khoa.reduce(function(p, k){ return p.then(function(){ return slRacVao(k, lyDo); }); }, Promise.resolve()).then(function(){ return slXoaCacO(khoa); });
}

/* 3.87: dời 1 ô sang khóa mới (loại / kỳ) — không đọc lại file, không đổi dữ liệu đã đọc: dời bản trong máy + chỉ mục;
   dữ liệu đọc nhanh trên Drive đẩy lại theo tên mới (bản cũ vào thùng rác Drive), file gốc giữ nguyên */
function slDoiKhoa(loaiCu, kyCu, loaiMoi, kyMoi, them){
  var kc = slKhoa(loaiCu, kyCu), km = slKhoa(loaiMoi, kyMoi), e = SLM.bang[kc];
  if(!e || SLM.bang[km]) return Promise.resolve(false);
  return Promise.all([docFile(slIDB(loaiCu, kyCu)), docFile('sl_g_'+loaiCu+'_'+kyCu)]).then(function(r){
    var coBang = !!(r[0] && r[0].cot), buoc = [];
    if(coBang){ r[0].loai = loaiMoi; r[0].ky = kyMoi; if(kyMoi.length>7) r[0].ngay = kyMoi; buoc.push(luuFile(slIDB(loaiMoi, kyMoi), r[0])); }
    if(r[1]) buoc.push(luuFile('sl_g_'+loaiMoi+'_'+kyMoi, r[1]));
    return Promise.all(buoc).then(function(){
      var m = JSON.parse(JSON.stringify(e)), luc = new Date().toISOString();
      m.loai = loaiMoi; m.ky = kyMoi; if(kyMoi.length>7) m.ngay = kyMoi; m.luc = luc; delete m.canTai;
      Object.keys(them||{}).forEach(function(k){ m[k] = them[k]; });
      if(coBang && e.dl){ m.cuDl = [e.dl, e.cuDl].filter(Boolean).join(','); m.dl = ''; m.choDay = true; }
      if(r[1] && !e.goc) m.choDay = true;
      if(!coBang && e.canTai) m.canTai = true;
      SLM.bang[km] = m; delete SLM.bang[kc]; SLM.xoa[kc] = luc;
      slBoXoa(kyCu); slBoXoa(kyMoi);
      if(coBang) xoaFile(slIDB(loaiCu, kyCu));
      if(r[1]) xoaFile('sl_g_'+loaiCu+'_'+kyCu);
      if(SL_DB && SL_DB.kh && slLaHS(loaiCu)) Object.keys(SL_DB.kh).forEach(function(ma){ if(SL_DB.kh[ma].ky===kyCu) SL_DB.kh[ma].ky = kyMoi; });
      return (SL_DB ? slLuuDanhBa() : Promise.resolve()).then(slLuuMeta).then(function(){ return true; });
    });
  });
}
/* 3.145 (anh chốt 10/10/2026: "mẫu đã bỏ là xóa hẳn, tránh rác"): xóa hẳn dữ liệu các loại đã bỏ — B32, Mẫu 10, Mẫu 7, Sao kê KH, KHĐ 08/KTNB.
   Bảng trong máy + meta bỏ ngay (dấu SLM.xoa để máy khác bỏ theo); file gốc + dữ liệu đọc nhanh trên Drive vào Thùng rác Drive (chờ nối Drive: sl_rac_cho).
   (Thay slChuyenMau10 3.87 + slBoMau10 3.120.) Danh bạ khách: làm sạch số sổ 105 sai lấy từ Mẫu 10 (1 lần, cờ b120) như 3.120. */
var SL_BO_HAN = ['m10','b32','kttk','kh','khd08'], SL_BOLOAI = null;
function slBoLoaiDon(){
  if(SL_BOLOAI) return SL_BOLOAI;
  var ds = Object.keys(SLM.bang).filter(function(k){ return SL_BO_HAN.indexOf(SLM.bang[k].loai)>=0; }), luc = new Date().toISOString(), ids = [];
  ds.forEach(function(k){ var e = SLM.bang[k];
    ids = ids.concat([e.goc, e.dl], String(e.cuGoc||'').split(','), String(e.cuDl||'').split(',')).filter(Boolean);
    SLM.xoa[k] = luc; delete SLM.bang[k]; slBoXoa(e.ky); xoaFile(slIDB(e.loai, e.ky)); xoaFile('sl_g_'+e.loai+'_'+e.ky); });
  var dung = !(SL_DB && SL_DB.b120);
  SL_BOLOAI = docFile('sl_rac_cho').then(function(cu){
    var cho = (Array.isArray(cu) ? cu : []).concat(ids);
    if(cho.length && coTheNoiDrive() && DR.sanSang){ cho.forEach(function(id){ xoaFileDrive(id).catch(function(){}); }); cho = []; }
    return luuFile('sl_rac_cho', cho);
  }).then(function(){   /* làm sạch tại chỗ (không dựng lại từ bảng — máy chưa tải bảng thì dựng lại sẽ làm rỗng danh bạ): số sổ không đủ 10 chữ số (vd 1482… của Mẫu 10) bỏ */
    if(!dung || !SL_DB || !SL_DB.kh || !Object.keys(SL_DB.kh).length) return null;   /* danh bạ trống (máy mới) → chờ kéo từ Drive, không ghi đè mốc giờ */
    var doi = 0;
    Object.keys(SL_DB.kh).forEach(function(ma){ var c = SL_DB.kh[ma]; if(!c.stk) return; var v = slStk(c.stk), m = v.join(', '); if(m===c.stk) return; doi++; if(v.length) c.stk = m; else { delete c.stk; delete c.stkKy; } });
    SL_DB.b120 = 1; return doi ? slLuuDanhBa() : luuFile('sl_danhba', SL_DB); })   /* có sửa mới tính là danh bạ đổi (đẩy Drive) */
    .then(function(){ return ds.length ? slLuuMeta() : null; })
    .then(function(){ SL_BOLOAI = null; if(ds.length){ bao('📈 Số liệu: đã xóa hẳn '+ds.length+' bảng của các mẫu đã bỏ (B32, Mẫu 10, Mẫu 7, Sao kê KH, KHĐ 08) — file trên Drive vào Thùng rác Drive.', 8); if(nganHienTai===7) veSoLieu(); } return ds.length; })
    .catch(function(er){ SL_BOLOAI = null; console.warn('Xóa loại đã bỏ lỗi', er); return 0; });
  return SL_BOLOAI;
}

/* ---------- 9. ĐỒNG BỘ DRIVE ---------- */
var SL_HEN = null, SL_DANG_DAY = false;
function slHenDay(){ if(coTheNoiDrive() && DR.sanSang){ clearTimeout(SL_HEN); SL_HEN = setTimeout(slDay, 3000); } }
function slThuMuc(){ return D.cauHinh.thumuc+'/_Hệ thống/so_lieu'; }
/* 3.400 (anh chốt 28/10 — Tèo, docs/TEO_PHOI_HOP.md mục 4): TÊN CHUẨN file gốc = <MÃ>_<YYYY-MM-DD>.<đuôi gốc> (loại trước, ngày sau),
   ngày = ngày số liệu: ô tháng → ngày cuối tháng, ô ngày (kỳ phiên, sao kê…) → đúng ngày đó. Tên anh đặt giữ ở e.tenFile + mô tả file trên Drive + sổ DANH_MUC_NAP. */
var SL_MA = {hstd:'MAU31', dsto:'TOTRUONG', dnct:'DNCT', tt:'TTTT', khd:'KHD14', nqh:'NQH', nk:'NOKHOANH', pk:'PHANKY', tdn:'TDNCT', tv01:'TV01', tk104:'TK104', tk105:'TK105',
  bx:'BCDHTD011', bc:'BCDHTD012', lx:'LEN31XA', lh:'LEN31HOI', lc:'LEN31CT', lt:'LEN31TT', k37:'BC0437', k38:'BC0438', m10:'MAU10', kh:'SKKH', kttk:'MAU7', b32:'B32', khd08:'KHD08'};
function slMaTen(loai){ return SL_MA[loai] || String(loai||'').toUpperCase(); }
function slNgaySo(e){ var k = String(e.ky||''); if(k.length>7) return k; return (e.ngay && slThang(e.ngay)===k) ? e.ngay : (k ? tdnCuoiKy(k) : ''); }
function slTenGoc(e){ var d = (e.tenFile||'').match(/\.[a-z0-9]+$/i); return slMaTen(e.loai)+'_'+slNgaySo(e)+(d ? d[0].toLowerCase() : '.xlsx'); }
function slGhiBlob(ten, idTM, blob, cuId, them){
  var bien = '----tuhoso'+Date.now();
  var meta = cuId ? {} : {name:ten, parents:[idTM]};
  Object.keys(them||{}).forEach(function(f){ meta[f] = them[f]; });
  var body = new Blob(['--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(meta)+'\r\n--'+bien+'\r\nContent-Type: '+(blob.type||'application/octet-stream')+'\r\n\r\n', blob, '\r\n--'+bien+'--']);
  return goiDrive(cuId ? 'https://www.googleapis.com/upload/drive/v3/files/'+cuId+'?uploadType=multipart&fields=id'
                       : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    {method:cuId ? 'PATCH' : 'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:body});
}
function slDay(){
  if(!coTheNoiDrive() || SL_DANG_DAY) return Promise.resolve();
  SL_DANG_DAY = true;
  var cho = Object.keys(SLM.bang).filter(function(k){ return SLM.bang[k].choDay; });
  return cho.reduce(function(p, k){
    return p.then(function(){
      var e = SLM.bang[k]; if(!e) return;
      return Promise.all([docFile('sl_g_'+e.loai+'_'+e.ky), docFile(slIDB(e.loai, e.ky))]).then(function(r){
        var buoc = Promise.resolve();
        if(r[0] && !e.goc) buoc = buoc.then(function(){ return baoDamDuong(D.cauHinh.thumuc+'/Số liệu/'+slThang(e.ky)); })
          .then(function(idTM){ return slGhiBlob(slTenGoc(e), idTM, r[0], null, {description:'Tên gốc: '+(e.tenFile||'')}); })
          .then(function(x){ if(x && x.id){ e.goc = x.id; return xoaFile('sl_g_'+e.loai+'_'+e.ky); } });   /* file gốc đã lên Drive → bỏ bản trong máy cho nhẹ */
        if(r[1] && !e.dl) buoc = buoc.then(function(){ return Promise.all([baoDamDuong(slThuMuc()+'/'+slThang(e.ky)), slGZ(JSON.stringify(r[1]))]); })
          .then(function(x){ return slGhiBlob(e.loai+(e.ky.length>7 ? '_'+e.ky : '')+x[1].duoi, x[0], x[1].blob, null); })
          .then(function(x){ if(x && x.id) e.dl = x.id; });
        return buoc.then(function(){
          if(e.goc && e.dl){
            e.choDay = false;
            String(e.cuGoc||'').split(',').concat(String(e.cuDl||'').split(',')).filter(Boolean).forEach(function(id){ xoaFileDrive(id).catch(function(){}); });
            e.cuGoc = ''; e.cuDl = '';
          }
        });
      }).catch(function(er){ console.warn('Chưa đẩy được số liệu', k, er); });
    });
  }, Promise.resolve()).then(function(){
    if(!SLM.choDayDB || !SL_DB) return;
    return Promise.all([baoDamDuong(slThuMuc()), slGZ(JSON.stringify(SL_DB))]).then(function(x){
      return timFileTrong('khach_hang.json.gz', x[0]).then(function(cu){ return cu ? cu : timFileTrong('khach_hang.json', x[0]); })
        .then(function(cu){ return slGhiBlob('khach_hang'+x[1].duoi, x[0], x[1].blob, cu ? cu.id : null); });
    }).then(function(){ SLM.choDayDB = false; });
  }).then(slDayMeta).then(function(){ return typeof slDmnDay==='function' ? slDmnDay() : null; }).then(function(){
    luuFile('sl_meta', JSON.stringify(SLM));
    SL_DANG_DAY = false; if(nganHienTai===7) veSoLieu();
  }).catch(function(er){ SL_DANG_DAY = false; console.warn('Đồng bộ số liệu lỗi', er); });
}
/* gộp chỉ mục số liệu với bản trên Drive: mỗi ô (loại × kỳ) bản ghi nhận sau thắng; ô đã xóa (có dấu xóa mới hơn) thì bỏ */
function slGopMeta(r){
  var doi = 0;
  r = slChuanMeta(r);
  Object.keys(r.xoa).forEach(function(k){ if(!SLM.xoa[k] || r.xoa[k] > SLM.xoa[k]) SLM.xoa[k] = r.xoa[k]; });
  Object.keys(r.bang).forEach(function(k){
    var a = SLM.bang[k], b = r.bang[k];
    if(!a || (b.luc||'') > (a.luc||'')){ b.choDay = false; b.canTai = true; SLM.bang[k] = b; slBoXoa(b.ky); if(a) xoaFile(slIDB(a.loai, a.ky)); doi++; }   /* bản máy khác mới hơn → bỏ bản cũ trong máy, tải lại khi cần */
  });
  Object.keys(SLM.xoa).forEach(function(k){ var a = SLM.bang[k]; if(a && (a.luc||'') < SLM.xoa[k]){ delete SLM.bang[k]; xoaFile(slIDB(a.loai, a.ky)); doi++; } });
  Object.keys(r.ndt).forEach(function(k){ if(!SLM.ndt[k]) SLM.ndt[k] = r.ndt[k]; });
  Object.keys(r.kt).forEach(function(k){ if(!SLM.kt[k] || (r.kt[k].luc||'') > (SLM.kt[k].luc||'')){ SLM.kt[k] = r.kt[k]; doi++; } });
  SLM.ktg = SLM.ktg || {}; Object.keys(r.ktg||{}).forEach(function(k){ if(!SLM.ktg[k] || (r.ktg[k].luc||'') > (SLM.ktg[k].luc||'')){ SLM.ktg[k] = r.ktg[k]; doi++; } });   /* 3.93: kiểm tra KTGS */
  /* 3.146: bỏ chốt tháng (anh chốt) — SLM.chot của bản cũ không đọc nữa, lần ghi meta sau tự rơi */
  return doi;
}
function slDayMeta(){
  return baoDamDuong(slThuMuc()).then(function(idTM){
    return timFileTrong('meta.json', idTM).then(function(cu){
      var truoc = cu ? goiDrive('https://www.googleapis.com/drive/v3/files/'+cu.id+'?alt=media').then(function(r){ slGopMeta(r && r.slm); }).catch(function(){}) : Promise.resolve();
      return truoc.then(function(){
        var ban = JSON.parse(JSON.stringify(SLM)); Object.keys(ban.bang).forEach(function(k){ delete ban.bang[k].canTai; });
        return ghiJSONLenDrive('meta.json', idTM, {xuatLuc:new Date().toISOString(), may:maMayCua(), slm:ban}, cu);
      });
    });
  });
}
/* máy khác: kéo chỉ mục số liệu + danh bạ về (dữ liệu từng bảng tải khi cần) */
function slTaiTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  return baoDamDuong(slThuMuc()).then(function(idTM){
    return timFileTrong('meta.json', idTM).then(function(f){
      if(!f) return 0;
      return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media').then(function(r){
        var dbCu = SLM.dbLuc, n = slGopMeta(r && r.slm), dbMoi = r && r.slm && r.slm.dbLuc;
        slBoLoaiDon();   /* 3.145: máy khác còn bảng loại đã bỏ */
        luuFile('sl_meta', JSON.stringify(SLM));
        if(dbMoi && dbMoi > (dbCu||'')) return timFileTrong('khach_hang.json.gz', idTM).then(function(g){ return g || timFileTrong('khach_hang.json', idTM); })
          .then(function(g){ if(!g) return; return slTaiBlob(g.id).then(slMoGZ).then(function(db){ if(db && db.kh){ SL_DB = db; SLM.dbLuc = db.luc; luuFile('sl_danhba', db); slDungTim(); luuFile('sl_meta', JSON.stringify(SLM)); } }); })
          .then(function(){ return n; });
        return n;
      });
    });
  }).then(function(n){
    if(Object.keys(SLM.bang).some(function(k){ return SLM.bang[k].choDay; }) || SLM.choDayDB) slHenDay();
    if(n && nganHienTai===7) veSoLieu();
    return n;
  }).catch(function(e){ console.warn('Không tải được chỉ mục số liệu', e); return 0; });
}

/* ---------- 10. BỘ DỮ LIỆU KỲ: nối các bảng ---------- */
/* 3.125 (anh chốt): giữ sẵn số liệu nhiều tháng trong phiên — máy tính 12 tháng gần nhất (Cài đặt: 12 / Tất cả), điện thoại chỉ tháng mới nhất + tháng đang xem;
   đầy thì bỏ tháng lâu không xem nhất (không bỏ tháng mới nhất); lần đầu vào tab Số liệu nạp ngầm dần các tháng (mới nhất trước) lúc máy rảnh */
var SL_DUNG = {}, SL_SAN_NAP = {chay:false, xong:0, tong:0};
function slDung(ky){ SL_DUNG[ky] = Date.now(); }
function slGiuToiDa(){ if(laDT()) return 2; var v = D.cauHinh.slGiu; return v==='all' ? 9999 : (+v || 12); }
function slThangMoi(){ var m = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai==='hstd' && String(e.ky).length===7; }).map(function(e){ return e.ky; }).sort(); return m[m.length-1] || ''; }
function slBot(O){   /* bỏ bớt kỳ lâu không xem nhất khi vượt giới hạn (đếm theo tháng; bảng theo ngày tính chung tháng) */
  var gioi = slGiuToiDa(), moi = slThangMoi(), th = function(k){ return String(k).slice(0, 7); };
  var cacTh = []; Object.keys(O).forEach(function(k){ if(cacTh.indexOf(th(k))<0) cacTh.push(th(k)); });
  while(cacTh.length>gioi){
    var bo = cacTh.filter(function(m){ return m!==moi; }).sort(function(a, b){ return (SL_DUNG[a]||0)-(SL_DUNG[b]||0); })[0]; if(!bo) break;
    Object.keys(O).forEach(function(k){ if(th(k)===bo) delete O[k]; }); cacTh.splice(cacTh.indexOf(bo), 1);
  }
}
function slBoXoa(ky){   /* số liệu kỳ vừa đổi (nạp / xóa / kéo từ Drive) → bỏ bản đã dựng của kỳ đó (cả phần dựng sẵn cây tổ / tổng hợp) */
  delete SL_BO[ky]; var th = String(ky).slice(0, 7);
  if(typeof slHenKiem==='function' && /^\d{4}-\d{2}$/.test(th)) slHenKiem(th);   /* 3.156: tự kiểm ngầm tháng vừa đổi */
  [SL_BO, TO_KS, TH_KS, TO_MAP].forEach(function(O){ Object.keys(O).forEach(function(k){ if(k===ky || String(k).slice(0, 7)===th || String(k).length>7) delete O[k]; }); });   /* 3.136: kỳ ngày mượn bảng tháng trước → bỏ mọi bộ theo ngày cho chắc */ TO_BD = null; TO_BDT = null; TO_PVC = null;   /* 3.128: + bản đồ khách → tổ */
  if(TH_K && String(TH_K.ky).slice(0, 7)===th) TH_K = null;
}
function slNapSan(lai){   /* nạp ngầm: ngày mới nhất + tháng mới nhất trước, rồi các tháng còn lại lúc rảnh; chip ⚡ báo tiến độ từng kỳ
     3.136 (anh chốt): dựng sẵn cả kỳ NGÀY mới nhất; nạp file xong gọi lại (lai) — đang chạy thì chạy thêm 1 lượt khi xong */
  if(SL_SAN_NAP.chay){ if(lai) SL_SAN_NAP.lai = true; return; } var gioi = laDT() ? 1 : slGiuToiDa();
  var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai==='hstd' && String(e.ky).length===7; }).map(function(e){ return e.ky; })
    .sort().reverse().slice(0, gioi), ng = toDsKy().filter(function(x){ return x.ky.length>7; }).map(function(x){ return x.ky; }).sort().pop();
  if(ng) ds.splice(ds.length ? 1 : 0, 0, ng);   /* tháng mới nhất → ngày mới nhất → các tháng cũ hơn */
  var can = ds.filter(function(ky){ return !TO_KS[ky]; });
  SL_SAN_NAP = {chay:true, xong:ds.length-can.length, tong:ds.length, ds:ds, dang:''}; slNapSanChip();
  var ranh = function(){ return new Promise(function(r){ setTimeout(r, 250); }); };   /* nghỉ giữa các kỳ cho máy kịp vẽ, không giật */
  var het = function(){ SL_SAN_NAP.xong++; SL_SAN_NAP.dang = ''; slNapSanChip(); };
  return can.reduce(function(p, ky){ return p.then(ranh).then(function(){ SL_SAN_NAP.dang = ky; slNapSanChip(); return TO_KS[ky] ? null : toNap(ky); }).then(het, het); }, Promise.resolve())
    .then(function(){ var l = SL_SAN_NAP.lai; SL_SAN_NAP.chay = false; SL_SAN_NAP.lai = false; slNapSanChip(); if(l) slNapSan(); });
}
function slKyNgan(k){ return k.length>7 ? 'ngày '+ngayVNsl(k).slice(0, 5) : 'T'+(+k.slice(5))+(k.slice(0, 4)!==String(nay().getFullYear()) ? '/'+k.slice(2, 4) : ''); }
function slGiuChu(){   /* 3.126 (anh yêu cầu): kỳ đang giữ sẵn trong phiên — 3.136: cả kỳ ngày */
  var ds = Object.keys(TO_KS).sort().reverse(), x = SL_SAN_NAP;
  return (ds.length ? '⚡ Sẵn dùng: '+ds.map(slKyNgan).join(', ') : '⚡ Chưa dựng sẵn kỳ nào')+(x.chay ? ' · đang dựng '+(x.dang ? slKyNgan(x.dang)+' ' : '')+'('+x.xong+'/'+x.tong+')' : ''); }
function slNapLai(){ TO_KS = {}; SL_BO = {}; TH_KS = {}; TH_K = null; TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null; SL_SAN_NAP.chay = false; slNapSan(); bao('Đã làm sạch phần dựng sẵn — đang dựng lại từ file đã lưu (chạy ngầm, xem tiến độ ở góc dưới).', 4); }
function slNapSanChip(){   /* 3.148: dựng sẵn số liệu báo ở ô trạng thái (bỏ chip nổi góc phải che nút) */
  var g = document.getElementById('sl-giu-ds'); if(g) g.textContent = slGiuChu();
  var x = SL_SAN_NAP; if(typeof TTB==='undefined') return;
  if(x.chay){ TTB.chay = '⚡ Đang dựng sẵn số liệu '+(x.dang ? slKyNgan(x.dang)+' ' : '')+'('+x.xong+'/'+x.tong+')'; TTB.pt = x.tong ? Math.round(x.xong/x.tong*100) : 101; }
  else if(TTB.chay && /dựng sẵn/.test(TTB.chay)){ TTB.chay = ''; TTB.pt = -1; if(x.tong) ttTin('⚡ Số liệu sẵn sàng ('+x.tong+' kỳ)'); }
  if(typeof ttVe==='function') ttVe();
}
/* 3.136 (anh chốt): kỳ nào lấy kỳ đó — cuối tháng lấy đúng bảng cuối tháng; kỳ NGÀY: bảng đúng ngày → bản theo ngày gần nhất trước đó trong tháng → cuối tháng trước */
function slKyDung(loai, ky){
  ky = String(ky||''); if(SLM.bang[slKhoa(loai, ky)]) return ky; if(ky.length<=7) return '';
  var ng = slCacNgay(loai, slThang(ky)).filter(function(e){ return e.ky<ky; }); if(ng.length) return ng[ng.length-1].ky;
  var tr = kyLui(slThang(ky), -1); return SLM.bang[slKhoa(loai, tr)] ? tr : '';
}
function slBo(ky){
  if(SL_BO[ky]){ slDung(ky); return Promise.resolve(SL_BO[ky]); }
  var B = {ky:ky, co:{}, mon:{}, theoKH:{}, lap:[], to:{}, nqh:{}, nk:{}, khd:{}, tdn:[], nguon:{}};
  return SL_LOAI.reduce(function(p, L){
    return p.then(function(){
      var kd = (L.k==='dsto' && typeof dsChonKy==='function' && dsChonKy(ky)) || slKyDung(L.k, ky); if(!kd) return;   /* 3.202 (anh chốt 14/10): Danh sách tổ hệ thống thay DSTO cũ — kỳ nào cũng dùng bản gần nhất */
      return slDocBang(L.k, kd).then(function(b){
        if(b) B.nguon[L.k] = kd;
        if(!b) return;
        var rows = slMoBang(b); B.co[L.k] = rows;
        if(slLaHS(L.k)){ var huy = rows.filter(slKUHuy); if(huy.length){ rows = B.co[L.k] = rows.filter(function(o){ return !slKUHuy(o); }); B.huy = huy; } }   /* 3.138 (anh chốt): KU hủy / nhập nhầm tổ → loại khỏi mọi báo cáo */
        if(slLaHS(L.k)){ rows.forEach(function(o){ if(o.ku) B.mon[o.ku] = o; (B.theoKH[o.kh] = B.theoKH[o.kh]||[]).push(o); }); B.lap = slMoLap(b); slDanhRaTo(B, rows); }   /* 3.138.1: khách đã ra khỏi tổ (theo TK 105) */   /* kỳ theo ngày: bảng Mẫu 10 */
        if(L.k==='nqh' || L.k==='nk' || L.k==='khd') rows.forEach(function(o){ B[L.k][o.ku] = o; });
        if(L.k==='tt') rows.forEach(function(o){ B.to[o.to] = o; });
        if(L.k==='tdn') B.tdn = rows;
        if(L.k==='dnct') B.lapDn = slMoLap(b);   /* 3.121 */
      });
    });
  }, Promise.resolve()).then(function(){
    B.hsTen = 'Mẫu 31';   /* 3.120: bỏ Mẫu 10 — không còn dùng tạm Mẫu 10 cuối tháng */
    if(B.co.hstd){ B.khdTinh = slKHDTinh(B.co.hstd, B.nguon.hstd || ky);   /* 3.145 (anh chốt): KHĐ tự tính từ Mẫu 31; tháng không có file KHĐ thì dùng số tự tính */
      if(!B.co.khd) B.khdTinh.forEach(function(o){ B.khd[o.ku] = o; }); }
  }).then(function(){
    SL_BO[ky] = B; slDung(ky); slBot(SL_BO); return B;
  });
}
/* 3.138 (anh chốt): KU hủy / nhập nhầm tổ = Đã đóng (CLOSE) mà Tổng giải ngân = 0 (không dư nợ, không lãi) → không phải tổ viên / tất nợ / mới vào / ra khỏi tổ
   KU đã nhập máy, chưa giải ngân = còn mở (OPEN), Tổng giải ngân = 0, dư nợ = 0 → không tính tất nợ; báo cáo riêng ở Sao kê (quá 1 tháng → cần đóng KU) */
/* 3.145: món 3 tháng không hoạt động theo quy tắc hệ thống (kiểm với file mẫu 14 thật, DU_LIEU_THANG.md):
   còn dư nợ, ngày GD gần nhất TRƯỚC ngày cùng kỳ 3 tháng trước (GD đúng ngày mốc không tính); bỏ món khoanh, món HSSV (CT 02), món vay sau mốc */
/* 3.173 (anh duyệt 12/10): KHĐ tự tính theo ĐÚNG luật hệ thống — câu "14. Sao kê món vay N tháng không hoạt động (DL Tháng)", N = 3:
   món chưa CLOSE · quá N tháng (MONTHS_BETWEEN kiểu Oracle) kể từ ngày GD gần nhất, chưa GD lần nào thì từ ngày GN đầu tiên · còn dư nợ trong hạn + quá hạn ·
   không phải CT 02 · không (có nợ khoanh VÀ gia hạn trong tháng) — câu hệ thống viết (khoanh = 0 OR gia hạn tháng = 0) ·
   loại món còn ân hạn: CT 05/07/18 chưa qua 60+N tháng từ ngày GN đầu, CT 01 sản phẩm 011SC2/011MC2/011LC2 chưa qua 24+N, CT 06 chưa qua 6+N · loại lãi suất 0.
   Trước 3.173: chỉ xét ngày GD gần nhất < cuối tháng (kỳ − 3), bỏ mọi món khoanh, bỏ món vay sau mốc → sót món chưa GD lần nào, tính dư món còn ân hạn. */
var SL_KHD_N = 3;
function slNgayCuoiThang(iso){ var y = +iso.slice(0, 4), m = +iso.slice(5, 7); return +iso.slice(8, 10)===new Date(y, m, 0).getDate(); }
function slThangGiua(a, b){   /* MONTHS_BETWEEN(a, b) như Oracle (a, b = 'YYYY-MM-DD') */
  var n = (+a.slice(0, 4) - +b.slice(0, 4))*12 + (+a.slice(5, 7) - +b.slice(5, 7)), da = +a.slice(8, 10), db = +b.slice(8, 10);
  return (da===db || (slNgayCuoiThang(a) && slNgayCuoiThang(b))) ? n : n + (da - db)/31;
}
function slCongThang(iso, k){   /* ADD_MONTHS như Oracle: ngày cuối tháng → ngày cuối tháng; tháng đích ngắn hơn → ngày cuối tháng đích */
  var y = +iso.slice(0, 4), m = +iso.slice(5, 7) - 1 + k, d = +iso.slice(8, 10), Y = y + Math.floor(m/12), M = ((m%12)+12)%12, cuoi = new Date(Y, M+1, 0).getDate();
  return Y+'-'+hai(M+1)+'-'+hai(slNgayCuoiThang(iso) ? cuoi : Math.min(d, cuoi));
}
function slKHDNgayBC(ky){ ky = String(ky||''); return ky.length>=10 ? ky.slice(0, 10) : tdnCuoiKy(ky.slice(0, 7)); }
/* lý do 1 món KHÔNG vào danh sách KHĐ ('' = có vào). ky = kỳ số liệu (tháng → cuối tháng; ngày → ngày đó) */
function slKHDLy(o, ky){
  var bc = slKHDNgayBC(ky), N = SL_KHD_N, ct = String(o.ct||''), ngn = o.ngn || '', moc = o.ngdg || ngn;
  if(!o.ku) return 'khong';
  if(String(o.ttMon||'').toUpperCase()==='CLOSE') return 'dong';
  if(!moc || !(slThangGiua(bc, moc) > N)) return 'gd';
  var th = o.th!==undefined ? (o.th||0) : (o.dn||0) - (o.qh||0) - (o.kn||0);
  if(!(th + (o.qh||0) > 0)) return 'du';
  var gh = o.ghM!==undefined ? o.ghM : o.c_gia_han_trong_thang;
  if((o.kn||0) > 0 && (+gh||0) > 0) return 'khoanh';
  if(ct==='02') return 'hssv';
  var con = function(t){ return ngn && slCongThang(ngn, t + N) > bc; };
  if(['05','07','18'].indexOf(ct)>=0 && con(60)) return 'anhan';
  var sp = String(o.c_ma_san_pham_cu_the || o.sprd || '').toUpperCase().trim();
  if(ct==='01' && ['011SC2','011MC2','011LC2'].indexOf(sp)>=0 && con(24)) return 'anhan';
  if(ct==='06' && con(6)) return 'anhan';
  if(o.ls!==undefined && !(+o.ls)) return 'ls0';
  return '';
}
var SL_KHD_LY = {dong:'món đã đóng', gd:'chưa quá 3 tháng không giao dịch', du:'không còn dư nợ trong hạn / quá hạn', khoanh:'nợ khoanh + gia hạn trong tháng',
  hssv:'HSSV (CT 02)', anhan:'còn trong thời gian ân hạn', ls0:'lãi suất 0'};
function slKHDTinh(hs, ky){
  var da = {};
  return (hs||[]).filter(function(o){
    if(!o.ku || da[o.ku] || slKHDLy(o, ky)) return false;
    return (da[o.ku] = true); }).map(function(o){ return {ku:o.ku, kh:o.kh, ten:o.ten, dn:o.dn||0, qh:o.qh||0, lt:laiTon(o), ngdg:o.ngdg || o.ngn, to:o.to, xa:o.xa, ct:o.ct, _tinh:true}; });
}
function slKHD(B){ return (B && (B.co.khd || B.khdTinh)) || []; }   /* có file KHĐ thì dùng file, không thì số tự tính */
function slKUHuy(o){ return !!o.ku && o.gn!==undefined && String(o.ttMon||'').toUpperCase()==='CLOSE' && !((o.gn||0)>0) && !((o.dn||0)>0) && !(laiTon(o)>0); }
function slKUChuaGN(o){ return !!o.ku && o.gn!==undefined && !!o.ttMon && String(o.ttMon).toUpperCase()!=='CLOSE' && !((o.gn||0)>0) && !((o.dn||0)>0); }
/* 3.138.1 (anh chốt, theo Mẫu 31 thật): Mẫu 31 mỗi dòng 1 món vay, "Mã tổ" = tổ lúc vay — món tất toán vẫn mang tổ cũ dù hộ đã ra khỏi tổ.
   Dấu hiệu hộ còn trong tổ là TK 105: còn gắn tổ (nằm trên dòng món vay của tổ / dòng có mã tổ đó). Khách ĐÃ TẤT NỢ (mọi món Đã đóng, dư nợ 0, lãi 0)
   mà TK 105 tách sang dòng riêng không tổ (Mã tổ 0) hoặc không còn TK 105 → đã ra khỏi tổ: không tính tổ viên; hiện ở "Ra khỏi tổ" kèm lý do. Khách đang vay không đổi. */
function slDanhRaTo(B, rows){
  var g = {}, ra = [], coTK = function(o){ return slCoTK(o.stk) || slStk(o.stk).length>0 || (o.t105||0)>0; };
  rows.forEach(function(o){ if(o.kh) (g[o.kh] = g[o.kh] || []).push(o); });
  (B.lap||[]).forEach(function(o){ if(o.kh && g[o.kh]) g[o.kh].push(o); });
  var dong = function(o){ return o.ttMon && String(o.ttMon).toUpperCase()==='CLOSE' && !((o.dn||0)>0) && !(laiTon(o)>0); };
  var toThat = function(t){ return t && t!==TO_GIA && !/^0+$/.test(String(t)); };
  Object.keys(g).forEach(function(kh){ var L = g[kh], ku = L.filter(function(o){ return o.ku; }), toKU = {};
    if(!ku.length) return;
    if(!ku.every(dong)){   /* 3.193 (theo Mẫu 31 thật 11/10): khách vay món mới ở TỔ KHÁC — món cũ đã đóng ở tổ cũ chỉ là lịch sử, không tính khách vào tổ cũ */
      var toMo = {}; ku.forEach(function(o){ if(!dong(o) && toThat(o.to)) toMo[o.to] = 1; });
      var moi = Object.keys(toMo); if(!moi.length) return;
      var cu = {}; ku.forEach(function(o){ if(dong(o) && !slKUHuy(o) && toThat(o.to) && !toMo[o.to]){ o.raTo = 'chuyển sang tổ '+moi.join(', ')+' (vay mới)'; cu[o.to] = 1; } });
      Object.keys(cu).forEach(function(t){ ra.push({kh:kh, to:t, ly:'chuyển sang tổ '+moi.join(', ')+' (vay mới)', chuyen:1}); });
      return; }
    ku.forEach(function(o){ if(toThat(o.to)) toKU[o.to] = 1; }); if(!Object.keys(toKU).length) return;   /* vay trực tiếp: không xét */
    if(L.some(function(o){ return o.to && toKU[o.to] && coTK(o); })) return;   /* TK 105 còn gắn tổ → còn trong tổ */
    var ly = L.some(function(o){ return !o.ku && coTK(o); }) ? 'tất nợ, TK 105 không còn gắn tổ' : 'tất nợ, đã đóng TK 105';
    ku.forEach(function(o){ o.raTo = ly; }); ra.push({kh:kh, to:ku[0].to, ly:ly}); });
  B.raTo = ra;
}
/* đối chiếu cơ bản — chỉ báo, không sửa */
function slDoiChieu(B){
  var ra = [], co = B.co, hs = B.hsTen || 'Mẫu 31';
  var theoXa = function(rows, f){ var t = {}; (rows||[]).forEach(function(o){ var x = o.xa||'?'; t[x] = (t[x]||0)+(o[f]||0); }); return t; };
  var tenXa = function(ma){ var x = (D.cauHinh.diaBan||[]).find(function(z){ return String(z.ma)===String(ma); }); return x ? x.xa : ma; };
  var soSanh = function(ten, a, b, ta, tb, xaA, xaB){
    var lech = Math.abs(a-b) > 0.5, chi = '';
    if(lech && xaA && xaB){
      var ks = {}; Object.keys(xaA).concat(Object.keys(xaB)).forEach(function(k){ ks[k] = 1; });
      chi = Object.keys(ks).filter(function(k){ return Math.abs((xaA[k]||0)-(xaB[k]||0))>0.5; })
        .map(function(k){ return tenXa(k)+': '+tdnTien(xaA[k]||0)+' / '+tdnTien(xaB[k]||0); }).join(' · ');
    }
    ra.push({ten:ten, ok:!lech, chu:ta+' '+tdnTien(a)+(lech ? ' ≠ ' : ' = ')+tb+' '+tdnTien(b), chi:chi});
  };
  var cong = function(rows, f){ return (rows||[]).reduce(function(s, o){ return s+(o[f]||0); }, 0); };
  if(co.hstd && co.tdn) soSanh('Tổng dư nợ', cong(co.hstd,'dn'), cong(co.tdn,'dn'), hs, 'Tổng dư nợ theo CT', theoXa(co.hstd,'dn'), theoXa(co.tdn,'dn'));
  if(co.nqh && co.tdn) soSanh('Nợ quá hạn', cong(co.nqh,'qh'), cong(co.tdn,'qh'), 'Sao kê nợ QH', 'Tổng dư nợ theo CT', theoXa(co.nqh,'qh'), theoXa(co.tdn,'qh'));
  else if(co.nqh && co.hstd) soSanh('Nợ quá hạn', cong(co.nqh,'qh'), cong(co.hstd,'qh'), 'Sao kê nợ QH', hs);
  if(co.nk && co.tdn) soSanh('Nợ khoanh', cong(co.nk,'kn'), cong(co.tdn,'kn'), 'Sao kê nợ khoanh', 'Tổng dư nợ theo CT', theoXa(co.nk,'kn'), theoXa(co.tdn,'kn'));
  else if(co.nk && co.hstd) soSanh('Nợ khoanh', cong(co.nk,'kn'), cong(co.hstd,'kn'), 'Sao kê nợ khoanh', hs);
  /* 3.86: Mẫu 31 — dư nợ tháng trước + giải ngân − đảo khoản − thu nợ − gốc xóa = dư nợ tháng này */
  var eT = SLM.bang[slKhoa('hstd', B.ky)], eL = SLM.bang[slKhoa('hstd', kyLui(B.ky, -1))];
  if(eT && eL && eT.tong && eT.tong.gnT!==undefined && eL.tong){
    var t = eT.tong, du = eL.tong.dn + t.gnT - (t.dkT||0) - (t.tnTH||0) - (t.tnQH||0) - (t.tnK||0) - (t.xoaT||0);
    ra.push({ten:'Dư nợ tháng trước + phát sinh = dư nợ tháng này', ok:Math.abs(du - t.dn) < 1, chu:'tính '+tdnTien(du)+(Math.abs(du - t.dn) < 1 ? ' = ' : ' ≠ ')+'file '+tdnTien(t.dn),
      chi:'('+kyVN(eL.ky)+' '+tdnTien(eL.tong.dn)+' + giải ngân '+tdnTien(t.gnT)+' − đảo khoản '+tdnTien(t.dkT||0)+' − thu nợ '+tdnTien((t.tnTH||0)+(t.tnQH||0)+(t.tnK||0))+' − gốc xóa '+tdnTien(t.xoaT||0)+')'});
  }
  if(co.hstd) ['nqh','nk','khd'].forEach(function(k){
    if(!co[k]) return;
    var thieu = co[k].filter(function(o){ return !B.mon[o.ku]; });
    ra.push({ten:slLoai(k).ten+' có trong '+hs, ok:!thieu.length, chu:(co[k].length-thieu.length)+'/'+co[k].length+' món tìm thấy',
      chi:thieu.slice(0, 8).map(function(o){ return o.ku+' '+(o.ten||''); }).join(' · ')+(thieu.length>8 ? ' …' : '')});
  });
  /* mã lạ: thôn không có trong danh mục địa bàn / thiếu tên, điểm · tổ không có trong danh sách tổ trưởng */
  var biet = {}; (D.cauHinh.diaBan||[]).forEach(function(x){ (x.diem||[]).forEach(function(z){ (z.ap||[]).forEach(function(a){ biet[String(a.ma)] = 1; }); }); });
  if(Object.keys(biet).length){
    var la = {};
    ['hstd','tdn','tt','nqh','khd'].forEach(function(k){ (co[k]||[]).forEach(function(o){ if(k==='hstd' && !o.ku) return; if(o.thon && !biet[o.thon]) la[o.thon] = (la[o.thon]||0)+1; }); });   /* 3.86: bỏ dòng khách chỉ gửi TK (thôn 48200000 = chưa gắn thôn) */
    var dsLa = Object.keys(la);
    ra.push({ten:'Mã thôn so với danh mục địa bàn', ok:!dsLa.length, chu:dsLa.length ? dsLa.length+' mã chưa có trong danh mục' : 'khớp hết',
      chi:dsLa.map(function(m){ return m+' ('+la[m]+' dòng)'; }).join(' · ')});
  }
  if(co.tdn){ var mo = co.tdn.filter(function(o){ return !o.tenThon || !o.diem; });
    if(mo.length) ra.push({ten:'Tổng dư nợ: dòng thiếu tên thôn / điểm GD', ok:false, chu:mo.length+' dòng', chi:mo.slice(0,6).map(function(o){ return 'thôn '+o.thon+' · CT '+o.ct+' · '+tdnTien(o.dn); }).join(' · ')}); }
  if(co.hstd && co.tt && !co.dsto){ var toLa = {};   /* 3.108: có DSTO → phép đối chiếu 2 danh sách tổ (slKTDsTo) thay */ co.hstd.forEach(function(o){ if(o.to && !B.to[o.to]) toLa[o.to] = 1; });
    var n = Object.keys(toLa).length; ra.push({ten:'Tổ trong '+hs+' có trong danh sách tổ trưởng', ok:!n, chu:n ? n+' tổ chưa có' : 'khớp hết', chi:Object.keys(toLa).slice(0,10).join(' · ')}); }
  if(B.raTo && B.raTo.length){ var raT = B.raTo.filter(function(x){ return !x.chuyen; }), raC = B.raTo.filter(function(x){ return x.chuyen; });
    if(raT.length) ra.push({ten:'Khách đã tất nợ, đã ra khỏi tổ trên hệ thống (TK 105 không còn gắn tổ / đã đóng)', ok:true, chu:raT.length+' khách — không tính tổ viên (hiện ở chip Ra khỏi tổ)',
      chi:raT.filter(function(x){ return /đóng/.test(x.ly); }).length+' đã đóng TK 105 · '+raT.filter(function(x){ return !/đóng/.test(x.ly); }).length+' TK 105 tách khỏi tổ'});
    if(raC.length) ra.push({ten:'Khách vay món mới ở tổ khác — món cũ đã tất toán vẫn mang mã tổ cũ', ok:true, chu:raC.length+' khách — chỉ tính ở tổ đang vay, không tính vào tổ cũ (3.193)'}); }   /* 3.138.1 */
  if(B.huy && B.huy.length) ra.push({ten:'KU hủy / nhập nhầm (Đã đóng, tổng giải ngân = 0)', ok:true, chu:B.huy.length+' KU — đã loại (không tính tổ viên, tất nợ, mới vào / ra khỏi tổ)',
    chi:B.huy.slice(0, 8).map(function(o){ return o.ku+' · tổ '+(o.to||'—'); }).join(' · ')+(B.huy.length>8 ? ' …' : '')});   /* 3.138 */
  return ra;
}

/* ---------- 11. TAB 📈 SỐ LIỆU ---------- */
function slDsKy(){   /* 3.156 (anh chốt): mặc định tháng đang chọn + tháng trước; ⇔ Tổng quan: 12 tháng tới tháng mới nhất */
  var moi = ngayISO(nay()).slice(0,7);
  Object.keys(SLM.bang).forEach(function(x){ var t = slThang(SLM.bang[x].ky); if(t > moi) moi = t; });
  var chon = SL_KY || slKyMoi() || moi, ds = [], i;
  if(slMtKieu()==='tq'){ var cuoi = chon > moi ? chon : moi; for(i=11;i>=0;i--) ds.push(kyLui(cuoi, -i)); return ds; }
  return [kyLui(chon, -1), chon];
}
function slMtKieu(){ var v = D.cauHinh.slMt; return v==='tq' || v==='thu' ? v : 'gon'; }   /* gon · tq (tổng quan) · thu (thu gọn 1 dòng) */
function slDatMt(v){ D.cauHinh.slMt = v; luu(); veSoLieu(); }
/* 3.163 (anh chốt): ▾ Thu gọn ↔ ▴ Bung ra 1 nút (về đúng kiểu đang xem); ⇔ Tổng quan bấm lại để về; bỏ kiểu "2 tháng" (thay bằng cột theo ngày) */
function slThuGon(){ var mt = slMtKieu(); if(mt==='thu') D.cauHinh.slMt = D.cauHinh.slMtTruoc==='tq' ? 'tq' : 'gon'; else { D.cauHinh.slMtTruoc = mt; D.cauHinh.slMt = 'thu'; } luu(); veSoLieu(); }
function slTongQuan(){ D.cauHinh.slMt = slMtKieu()==='tq' ? 'gon' : 'tq'; luu(); veSoLieu(); }
function slGanNhat(){ SL_KY = slKyMoi() || ngayISO(nay()).slice(0, 7); SL_DAI = 0; if(slMtKieu()==='thu') D.cauHinh.slMt = 'gon'; KT_KY_KT = SL_KY; luu(); veSoLieu(); }
/* cột ma trận: kiểu thường = chốt tháng trước · các ngày có dữ liệu của tháng đang chọn · chốt tháng đang chọn (mới nhất bên phải); Tổng quan = cột chốt mọi tháng có số liệu */
function slCotNap(kyXem, mt){
  if(mt==='tq'){ var th = {}; th[kyXem] = 1; Object.keys(SLM.bang).forEach(function(k){ th[slThang(SLM.bang[k].ky)] = 1; });
    return Object.keys(th).sort().map(function(k){ return {ky:k, chot:true}; }); }
  var ng = {}; Object.keys(SLM.bang).forEach(function(k){ var e = SLM.bang[k], L = slLoai(e.loai); if(L && !L.bo && String(e.ky).length>7 && slThang(e.ky)===kyXem && e.ky!==tdnCuoiKy(kyXem)) ng[e.ky] = 1; });   /* 3.205: ngày = ngày chốt cuối tháng → đã hiện ở cột chốt, không mở cột riêng */
  return [{ky:kyLui(kyXem, -1), chot:true}].concat(Object.keys(ng).sort().map(function(k){ return {ky:k}; }), [{ky:kyXem, chot:true}]);
}
function slTenNgan(L){ return L.ten.replace(/ · [^()]*$/, ''); }   /* 3.163: không cắt giữa ngoặc ("Nợ đến hạn phân kỳ (NOXH · cho vay trực tiếp)") */
/* 3.163: dải lịch tháng — ● Đạt · ◐ có file nhưng thiếu / lệch · ○ chưa nạp; rê chuột đủ câu (thay dòng cảnh báo vàng) */
var SL_DAI = 0;
function slTTChu(ky){
  var g = slDanhGia(ky), coFile = Object.keys(SLM.bang).some(function(k){ return slThang(SLM.bang[k].ky)===ky; }), kt = SLM.kt[ky];
  var chu = !coFile ? kyVN(ky)+': chưa có file nào' : g.thieu.length ? kyVN(ky)+': chưa Đạt — thiếu '+g.thieu.length+' file: '+g.thieu.join(', ')
    : (g.ky.length || g.ct.length) ? kyVN(ky)+': chưa Đạt — '+(g.ky.length ? 'sai kỳ: '+g.ky.join(', ') : '')+(g.ct.length ? ' sai cấu trúc: '+g.ct.join(', ') : '')
    : !g.daKiem ? kyVN(ky)+': đủ file — đang tự kiểm tra…' : kyVN(ky)+': ✓ Đạt'+(kt && kt.dem.lech ? ' · '+kt.dem.lech+' chênh lệch ghi nhận' : ' · các file khớp nhau');
  return {chu:chu, dau:!coFile ? 'chua' : g.dat ? 'dat' : 'thieu', tit:[chu].concat(g.bc.map(function(b){ return (b.thieu.length ? '○ ' : '✓ ')+b.ten+(b.thieu.length ? ' — thiếu '+b.thieu.join(', ') : ''); }), g.luuY.map(function(x){ return 'ⓘ '+x; })).join('\n')};
}
function slDaiLich(kyXem){
  var moi = slKyMoi() || ngayISO(nay()).slice(0, 7), cuoi = kyLui(kyXem > moi ? kyXem : moi, -SL_DAI), nam = String(nay().getFullYear()), h = '';
  for(var i = 5; i>=0; i--){ var k = kyLui(cuoi, -i), t = slTTChu(k);
    h += '<button class="sl-dl'+(k===kyXem ? ' bat' : '')+'" onclick="slChonThang(0,\''+k+'\')" title="'+coChuHTML(t.tit)+'">T'+(+k.slice(5))+(k.slice(0, 4)!==nam ? '<small>/'+k.slice(2, 4)+'</small>' : '')+'<i class="sl-dl-dau '+t.dau+'">'+(t.dau==='dat' ? '●' : t.dau==='thieu' ? '◐' : '○')+'</i></button>'; }
  return '<span class="sl-dai"><button class="nho sl-dai-lui" onclick="SL_DAI++;veSoLieu()" title="Các tháng trước">‹</button>'+h+
    '<button class="nho sl-dai-toi" onclick="SL_DAI=Math.max(0,SL_DAI-1);veSoLieu()" title="Các tháng sau"'+(SL_DAI ? '' : ' disabled')+'>›</button>'+
    '<button class="nho sl-dai-chon" onclick="slChonThangHop()" title="Chọn tháng bất kỳ">▾</button>'+
    '<button class="nho sl-gan-nhat" onclick="slGanNhat()" title="Về tháng có số liệu mới nhất ('+coChuHTML(kyVN(moi))+')">⦿ Gần nhất</button></span>';
}
function slCoDL(loai){ return Object.keys(SLM.bang).some(function(k){ return SLM.bang[k].loai===loai; }); }   /* 3.90 */
function slMucCu(loai, ky){
  var L = slLoai(loai); if(!L.cu || L.bo) return null;
  return (D.duLieu||[]).find(function(m){ return m.maLoai===L.cu && m.ky===ky && /\.(xlsx|xls|xlsm|csv)$/i.test(m.tenMoi||m.tenCu||''); }) || null;
}
function slKyMoi(){ var ds = Object.keys(SLM.bang).map(function(k){ return slThang(SLM.bang[k].ky); }).sort(); return ds[ds.length-1] || ''; }   /* tháng mới nhất có số liệu */
function slHSMoi(){ var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return slLaHS(e.loai); }).map(function(e){ return e.ky; }).sort(function(a, b){ return slThuTu(a)<slThuTu(b) ? -1 : 1; }); return ds[ds.length-1] || ''; }
function slCacNgay(loai, thang){ return Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai===loai && slThang(e.ky)===thang && String(e.ky).length>7; }).sort(function(a, b){ return a.ky<b.ky ? -1 : 1; }); }
/* 3.346 (K2): bộ tìm trên chỉ mục SL_TIM (chuyển nguyên văn từ 22f — lõi dữ liệu); tab gọi qua KHO.tim */
function slTimKH(q, toiDa){
  if(!SL_TIM.length) return [];
  var qq = slChuan(q); if(qq.length<2) return [];
  var so = qq.replace(/ /g,''), laSo = /^\d+$/.test(so), ra = [];
  var nsQ = '', x = String(q).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/); if(x) nsQ = x[3]+'-'+hai(+x[2])+'-'+hai(+x[1]);
  var tu = qq.split(' ');
  for(var i=0;i<SL_TIM.length;i++){
    var r = SL_TIM[i], d = 0;
    if(nsQ){ if(r.ns===nsQ) d = 80; }
    else if(laSo){
      if(so.length>=4 && r.c.indexOf(so)>=0) d = r.c===so ? 100 : (r.c.slice(-so.length)===so ? 90 : 60);
      else if(so.length>=4 && r.m.indexOf(so)===0) d = r.m===so ? 100 : 70;
      else if(so.length>=8 && r.k.indexOf(so)>=0) d = r.k.indexOf(' '+so)>=0 ? 95 : 55;   /* 3.86: số khế ước (cả món đã tất toán) */
      else if(so.length>=6 && r.s && r.s.indexOf(so.replace(/^84/,'0'))>=0) d = 85;   /* 3.86: số điện thoại */
      else if(so.length===4 && r.ns.slice(0,4)===so) d = 30;
    } else if(tu.every(function(w){ return r.t.indexOf(w)>=0; })){
      d = 40 + tu.filter(function(w){ return r.t.indexOf(' '+w)>=0; }).length*10;
    }
    if(d) ra.push({r:r, d:d});
  }
  return ra.sort(function(a,b){ return b.d-a.d || (a.r.ten<b.r.ten ? -1 : 1); }).slice(0, toiDa||8).map(function(x){ return x.r; });
}
var SL_KHMON = {};   /* SL_KHMON[mã KH] = món theo Mẫu 31 mới nhất (dựng ở slKhMonNap; đọc qua KHO.monKH) — 3.346 chuyển khai báo từ 22f */
/* 3.346 (K3): chỉ mục phụ theo Mẫu 31 mới nhất — chuyển nguyên văn từ 22h (lõi dữ liệu); tab đọc qua KHO.monKH / KHO.phu / KHO.hssvPhu */
var SL_PHU = [], SL_PHU_KY = '';
function slMau31Moi(){ var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai==='hstd'; }).map(function(e){ return e.ky; }).sort(); return ds[ds.length-1] || ''; }
function slKhMonNap(){   /* 3.228: chỉ mục phụ theo Mẫu 31 mới nhất — món theo khách (SL_KHMON), vợ/chồng + HSSV (SL_PHU); dùng chung Tra cứu + 🔎 kiểm tra hộ vay */
  var m31 = slMau31Moi(); if(!m31 || SL_PHU_KY===m31) return Promise.resolve();
  return slBo(m31).then(function(B){
    var phu = [], vc = {}, km = {}, gk = {};
    (B.co.hstd||[]).forEach(function(o){
      if(o.ku && o.kh && !gk[o.ku]){ gk[o.ku] = 1; (km[o.kh] = km[o.kh]||[]).push({ct:ctNgan(o.ct, o), ku:String(o.ku), dn:o.dn||0, nv:o.nv||o.ngn||'', md:ktCoNganh(o) ? ktNganh(o) : '',
        xong:(o.ttMon==='CLOSE' || !((o.dn||0)>0)) && !(laiTon(o)>0), truong:o.c_ten_truong||'', raTruong:o.raTruong||'', gn:o.gn||0, qh:o.qh||0, kn:o.kn||0, dh:o.dhgh||o.dhg||'', to:o.to||''}); }   /* 3.94: món theo khách cho thẻ kiểm trùng · 3.228: + giải ngân, quá hạn, khoanh, đến hạn, tổ */
      if(o.ku && (o.c_ten_hssv || o.c_cmnd_hssv)) phu.push({loai:'hs', ten:String(o.c_ten_hssv||''), so:String(o.c_cmnd_hssv||'').replace(/\D/g, ''), kh:o.kh, ku:o.ku, dn:o.dn||0, xong:o.ttMon==='CLOSE' || !(o.dn>0)});
      if(o.voChong && o.kh && !vc[o.kh]){ vc[o.kh] = 1; phu.push({loai:'vc', ten:String(o.voChong), kh:o.kh}); }
    });
    phu.forEach(function(p){ p.t = ' '+slChuan(p.ten); });
    SL_PHU = phu; SL_PHU_KY = m31; SL_KHMON = km;
  });
}
