/* ==========================================================
   3.295 — SỔ QUY TẮC TÊN + NƠI LƯU HỒ SƠ THEO KHÁCH (lớp Nghiệp vụ, dùng chung) — bước 1 `docs/KE_HOACH_TEN_LUU_HO_SO_VAY.md`
   Anh duyệt 20/10/2026: "các vấn đề đã chốt về cách lưu, cách xem thì thống nhất cho các chức năng tương đồng".
   - Khóa khách: mã KH (Mẫu 31); hộ mới chưa có mã KH → số CCCD người vay (12 số) — đề xuất (a) anh đồng ý.
   - Tên file: "Khóa - Họ tên có dấu - Loại[ (n)]" — Loại viết liền: CCCD, Mặt trước, Mặt sau, Chữ ký, Ảnh, 01TD, 03TD, 01UQ, 10C, 01TGTV, 01GQVL, 07BGQVL…
   - Thư mục Drive phẳng theo loại (dưới thư mục tủ): CCCD · Chữ ký - Ảnh khách · Hồ sơ scan · Hồ sơ vay · Scan chờ sắp xếp (không quản được → chỗ chung, QUY_CHUAN mục 12).
   Scan (41/43) và Hồ sơ vay (bước 2–3) cùng gọi các hàm dưới — không tự ghép chuỗi tên riêng.
   ========================================================== */
var TC = {
  thuMuc:{cccd:'CCCD', ka:'Chữ ký - Ảnh khách', tl:'Hồ sơ scan', hsv:'Hồ sơ vay', cho:'Scan chờ sắp xếp'},
  /* mã mẫu hồ sơ vay → loại trong tên file (đề xuất (c) anh đồng ý) */
  loaiMau:{'01td':'01TD', '03td':'03TD', '06td':'06TD', '01uq':'01UQ', 'uq':'01UQ', '10c':'10C', '01tgtv':'01TGTV', '01gqvl':'01GQVL', '07bgqvl':'07BGQVL'}
};
/* thư mục cũ của Scan đọc từ đây (một nguồn) */
if(typeof SXT!=='undefined'){ SXT.cccd = TC.thuMuc.cccd; SXT.ka = TC.thuMuc.ka; SXT.tl = TC.thuMuc.tl; SXT.cho = TC.thuMuc.cho; }
/* khóa khách: mã KH; hộ mới chưa có mã KH → số CCCD 12 số (3.296, đề xuất (a)); không có cả hai → '' */
function tcKhoa(o){
  o = o || {}; if(o.maKH || o.ma) return String(o.maKH || o.ma);
  var so = String(o.cccd||'').replace(/\D/g, ''); return /^\d{12}$/.test(so) ? so : '';
}
/* tên chuẩn: khóa - họ tên - loại[ (n)] + đuôi; n ≥ 2 mới ghi số thứ tự; chưa có khóa → "Họ tên - loại" */
function tcTen(khoa, ten, loai, duoi, n){ return sachTen((khoa ? khoa+' - ' : '')+String(ten||'').trim()+' - '+loai+(n>1 ? ' ('+n+')' : ''))+(duoi||''); }
/* mã mẫu (01/TD, 01td, UQ…) → loại trong tên file (TC.loaiMau); không có trong sổ → bỏ "/" viết hoa */
function tcLoaiMau(ma){ var k = String(ma||'').toLowerCase().replace(/[^a-z0-9]/g, ''); return TC.loaiMau[k] || String(ma||'').replace(/[\/\\\s]/g, '').toUpperCase(); }
/* số thứ tự của x trong các bản cùng khách + cùng loại (xếp theo lúc tạo, rồi mã): 1, 2, 3… */
function tcSoThu(ds, x){
  if(!ds || ds.length<2) return 1;
  ds = ds.slice().sort(function(a, b){ return String(a.taoLuc||a.luc||a.ngay||'').localeCompare(String(b.taoLuc||b.luc||b.ngay||'')) || String(a.id).localeCompare(String(b.id)); });
  return ds.indexOf(x)+1 || 1;
}
/* đường thư mục Drive theo loại thư mục (cccd / ka / tl / hsv / cho) */
function tcDuong(loaiTM){ return [D.cauHinh.thumuc, TC.thuMuc[loaiTM] || TC.thuMuc.cho].join(' / '); }
