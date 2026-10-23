# Bàn giao KTGS — TK 3 → TK 2

> Anh Nhân 23/10/2026: "em cứ làm theo kế hoạch, xong bàn giao đầy đủ cho TK 2 làm tiếp". Kế hoạch gốc: `docs/KE_HOACH_KTGS_GON.md` (mục 11 = tiến độ từng bước).
> Từ bản bàn giao này **khóa file KTGS (CLAUDE.md dòng 23/10) được mở** — TK 2 sửa được `js/22b…22e`, `js/56-ktgs-bo.js` và phép thử KTGS, theo các luật dưới đây.

**Trạng thái: ĐANG LÀM (TK 3 cập nhật dần đến bước 5).**

## 1. Sơ đồ tab KTGS sau tinh chỉnh

```
🛡 KTGS Hội
├─ 📅 Bắt buộc · theo tháng      (khối A — số liệu Mẫu 31 chốt cuối tháng LIỀN TRƯỚC tháng kiểm tra)
│   ├─ 🗓 Định kỳ · Mẫu 06 + 16    ô 📅 Tháng kiểm tra (chung khối A) · tích tổ tự do + nút tích theo Lịch năm
│   ├─ 📅 Sau giải ngân · Mẫu 06   tháng GN từ → đến · 1 tổ × 1 tháng = 1 phiếu · nhắc 30 ngày (727)
│   ├─ 📋 Báo cáo tổng hợp · Mẫu 04 ô 📅 Tháng kiểm tra · theo kế hoạch / tự chọn tổ
│   └─ 🗓 Lịch năm · Kế hoạch 01/KH  lập lịch, in Kế hoạch, in theo tháng (Mẫu 06 / 16 / 04)
├─ 🎯 Đột xuất · theo ngày       (khối B — số liệu Mẫu 31 theo ô Kỳ đầu trang, ngày được nhớ qua lần mở app)
│   └─ chọn tổ → gợi ý hộ → Mẫu 06 · Mẫu 16 · Mẫu 04; dòng 🎯 Khai báo đột xuất (bộ ②)
└─ ⚙ Khai báo                    (khối C)
    ├─ 🏛 Hội – xã (bảng như Excel) · 📖 Chuẩn hóa quy tắc
    └─ 🧩 Bộ khai báo mẫu (① Hội kiểm tra · ② Khai báo khi cần)
```
`D.cauHinh.ktgs.che` vẫn là khóa chế độ (`dk` · `gn` · `bc` · `kh` = khối A; `dx` = khối B; `hdt` = khối C) — dữ liệu cũ đọc được nguyên.

## 2. Ba tầng khai báo

| Tầng | Nội dung | Lưu | Hàm |
|---|---|---|---|
| 1. Đơn vị | Hội – xã: CT, PCT, BTV, HĐUT, KH Hội tỉnh; Chuẩn hóa; ngành kinh tế; thứ tự ấp | `ktHoiKB`, `ktChuan`, `ktPnkt`, `ktApThu`, `ktPC`, `ktKH` | `ktHoiKB`, `ktChuan`, `ktNguoi` |
| 2. Bộ khai báo | ① Hội kiểm tra = `D.cauHinh.ktIn[mẫu]` · ② Khai báo khi cần = `D.cauHinh.ktIn['dx_'+mẫu]` (m06, m16; m04 / kh 1 bộ) | `ktIn` | `KT_BO`, `ktBoDang`, `ktBoKhoa`, `ktInLay`, `ktInV` |
| 3. Lần in | chọn bộ kia cho lần in này, ngày kiểm tra | phiên (`KT_BO_IN`, `KT_KB.ngay`) | `ktInHop(ds, nut, hoi, veThe, ve)` |

Bảng II Mẫu 16: `b2` cả bảng (`''` trống · `cham` · `dien` 727) + `b2o[i] = {c:'trong'|'cham'|'dien'|'go', v}` từng ô → `ktB16Mang(t, v)`.

## 3. Lớp nguồn số liệu `ktNguon*` — CHỖ TK 2 THAY QUA `KHO`

| Hàm (`js/56-ktgs-bo.js`) | Trả về | Bên trong hiện tại |
|---|---|---|
| `ktNguonThangKT()` | tháng kiểm tra khối A (`KT_A_TH` hoặc mặc định theo kỳ đầu trang) | `ktCH().ky`, `kyChungLay()` |
| `ktNguonKy(th)` | `{can, ky}` kỳ Mẫu 31 dùng cho tháng kiểm tra | `ktKHKySL` (đọc `toDsKy`) |
| `ktNguonNap(th)` | Promise — nạp Mẫu 31 + BC0437/0438 + 105 tháng trước | `ktKHNapSL` → `toNap`, `ktNapBC`, `ktTruocNap` |
| `ktNguonSan(th)` | đã nạp xong cho `th` chưa | `KT_KH_SL` |
| `ktNguonVoi(th, fn)` | chạy `fn` với số liệu tháng `th` | `ktKHVoiSL`: tạm đổi `KT_K / TO_K / KT_BC / KT_TRUOC` rồi trả lại |
| `ktNguonVe(o, th, ve)` | vẽ thẻ khối A sau khi nạp | — |

Khối B (đột xuất) dùng `KT_K` = kỳ chung (`veKTGS` → `toNap(C.ky)`). Sau giải ngân: `ktGNNap` đọc `slBo(tháng)` từng tháng GN.

**Chỗ còn đọc thẳng biến số liệu (22b–22e + 56, đếm bằng grep 23/10):** `KT_K` 104 · `KT_BC` 23 · `KT_TRUOC` 20 · `SLM.` 18 · `toKhach(` 6 · `TO_K` 5 · `slBo(` 3 · `toNap(` 2.
→ Hướng làm cho TK 2: (1) viết cửa `KHO` theo spec mục 9 kế hoạch; (2) thay THÂN `ktNguonNap / ktNguonKy / ktNapBC / ktTruocNap / ktGNNap / veKTGS (toNap)` qua `KHO`; (3) các chỗ đọc `KT_K.to[...]`, `toKhach(t)` giữ nguyên dạng dữ liệu (KHO trả đúng dạng — QUY_CHUAN 1b.3 "bộ chuyển").

## 4. Không được đổi (khóa mẫu — QUY_CHUAN 1b)
- Hàm dựng mẫu `ktGiaTri06 / ktGiaTri16 / ktBC04 / ktKHGiaTri`, bản In `ktHTML06/16/04/01`, Word `ktDocx` + khuôn `js/khuon/kt-khuon.js`.
- Chuẩn khóa `tests/chuan/kt_*.html` (t179) phải trùng từng ký tự; đổi mẫu chỉ khi anh duyệt.
- KTGS **không** dùng nền ô Hồ sơ vay (`js/31-o-mau.js`).

## 5. Phép thử phải giữ
`t106–t137, t150, t153, t154, t177, t197` (KTGS cũ) · `t179` (chuẩn khóa kt_*) · `t236` (đột xuất, 2 bộ, Bảng II từng ô) · `t237` (khối A tháng kiểm tra, Sau GN 1 tổ × 1 tháng).

## 6. Việc TK 2 làm tiếp
1. Cửa `KHO` cho KTGS (spec `docs/KE_HOACH_KTGS_GON.md` mục 9).
2. Thay thân các hàm `ktNguon*` + `veKTGS` qua `KHO`; thước đo "đọc thẳng biến kho" giảm dần.
3. Chạy bộ phép thử mục 5 + hồi quy đủ.
