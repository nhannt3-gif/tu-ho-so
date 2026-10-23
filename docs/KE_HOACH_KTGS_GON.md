# Kế hoạch gọn tab KTGS Hội (chờ anh duyệt — chưa làm)

> Anh 23/10/2026: "rà soát lại tổng thể tab KTGS, chia 2 phần: (1) kiểm tra theo KH định kỳ + kiểm tra sau 30 ngày (bắt buộc cố định Hội phải làm) lấy số liệu theo **tháng liền trước**; (2) kiểm tra đột xuất lấy số liệu theo **ngày chọn**; rà logic khai báo, mẫu biểu, phần nào trùng lắp bỏ, bố trí lại cho gọn đơn giản; phải báo plan trước; tuyệt đối không làm mất / hư KTGS đang có — dù hơi rối nhưng số liệu đúng."

## 1. Hiện trạng (rà 3.325)

**6 chip ngang ở đầu tab:** 🏛 Khai báo Hội đoàn thể · 🎯 Kiểm tra đột xuất · 📅 Sau giải ngân (30 ngày) · Mẫu 06 · 🗓 Định kỳ · Mẫu 06 + 16 · 📋 Báo cáo tổng hợp · Mẫu 04 · 🗓 Kế hoạch năm · 01/KH.

| Chế độ | Số liệu lấy theo | Mẫu in | Chọn tổ / hộ |
|---|---|---|---|
| 🎯 Đột xuất | ô Kỳ / ngày đầu trang (đã theo ngày chọn — 3.325) | 06, 16 | 1 tổ, gợi ý 6–8 hộ |
| 📅 Sau giải ngân | **ô riêng "từ tháng → đến tháng"** (Mẫu 31 tháng đó, chưa chốt thì Mẫu 31 ngày mới nhất) | 06 | nhiều tổ, món GN trong tháng |
| 🗓 Định kỳ | ô Kỳ đầu trang **phải là tháng** (chọn ngày → báo lỗi), tháng KT = tháng sau | 06 + 16 | nhiều tổ, gợi ý theo Kế hoạch |
| 📋 Mẫu 04 | ô Kỳ đầu trang; ngày từng tổ tự gõ | 04 | xã / hội → tích tổ theo ấp |
| 🗓 Kế hoạch 01/KH | năm riêng | 01/KH, + Mẫu 04 theo tháng, + chip "in theo tháng kiểm tra" (06 + 16) | lịch tổ × tháng |

**Khai báo đang nằm ở 6 chỗ:**
1. 🏛 Khai báo Hội đoàn thể (lãnh đạo Hội – xã, HĐUT, KH Hội tỉnh) · Chuẩn hóa tên Hội · Thông báo phân công BTV — **giữ, là gốc**.
2. Hộp 🖨 Chọn khi in — mỗi mẫu 1 phần (mục đích, nhận xét, Bảng II, người kiểm tra, đơn vị — 3.323) — **giữ**.
3. "Tùy chọn khác" trong hộp in: Ông (bà) 2 + Chức vụ 2 gõ tay (Mẫu 06) — trùng với "Người kiểm tra 2 → Khai báo tên" của 3.323.
4. Giá trị cũ trước 3.114 (`ktKBLuu.dv / cbtu / cb2 / cv2`, `ktNhanXet`, `ktMucDich`, `ktBang16`) — đọc làm mặc định, không còn ô sửa riêng.
5. Ô "Ngày kiểm tra" — mỗi màn 1 ô riêng (đột xuất / định kỳ / Mẫu 04 từng tổ).
6. 🎯 Khai báo đột xuất (3.324) — dòng tóm tắt + nút mở hộp in.

**Trùng lắp / rối:**
- **Định kỳ có 2 lối**: chip 🗓 Định kỳ (chọn tự do) và Kế hoạch › bấm tháng › in 06 + 16 (3.140) — cùng làm 1 việc.
- **Mẫu 04 có 2 lối**: chip 📋 Báo cáo tổng hợp và Kế hoạch › chọn tháng › Mẫu 04.
- **Tháng kiểm tra chọn 3 kiểu khác nhau**: Sau giải ngân (ô từ–đến tháng riêng), Định kỳ (suy từ ô Kỳ đầu trang, phải đúng tháng), Kế hoạch (bấm tháng). Anh phải nhớ phần nào chọn ở đâu.
- Phần "bắt buộc" (định kỳ + sau GN) nằm lẫn với đột xuất và khai báo trên cùng 1 hàng chip.

## 2. Bố cục đề xuất — 3 khối thay 6 chip

```
[ 📅 Kiểm tra bắt buộc (theo tháng) ]  [ 🎯 Kiểm tra đột xuất (theo ngày) ]  [ ⚙ Khai báo ]
```

**A. 📅 Kiểm tra bắt buộc — Hội phải làm, số liệu THÁNG LIỀN TRƯỚC**
- 1 ô **Tháng kiểm tra** (vd 11/2026) → app tự lấy **Mẫu 31 chốt cuối tháng trước** (31/10) + BC0437 tháng trước; không phụ thuộc ô Kỳ đầu trang (đổi ô đầu trang không làm lệch). Tháng trước chưa có bản chốt → dùng Mẫu 31 ngày mới nhất của tháng đó và ghi rõ (như Sau giải ngân đang làm).
- 3 thẻ con dùng chung ô tháng đó:
  1. **🗓 Định kỳ theo kế hoạch** (Mẫu 06 + 16) — tổ có lịch tháng đó tích sẵn, thêm tổ ngoài lịch như cũ (gộp chip Định kỳ + "in theo tháng" trong Kế hoạch thành 1).
  2. **📅 Sau giải ngân 30 ngày** (Mẫu 06) — món giải ngân trong tháng trước (mặc định 1 tháng; vẫn mở "từ tháng → đến tháng" khi cần gom).
  3. **📋 Báo cáo Mẫu 04** — tổ đã kiểm tra trong tháng (gộp chip 📋 + Mẫu 04 trong Kế hoạch thành 1).
- **🗓 Kế hoạch năm 01/KH** chuyển thành nút trong khối A (lập lịch năm), không còn là chế độ ngang hàng.

**B. 🎯 Kiểm tra đột xuất — số liệu NGÀY CHỌN** (ô Kỳ / ngày đầu trang): giữ nguyên như 3.325 (1 tổ, gợi ý hộ, 06 + 16, khai báo đột xuất riêng).

**C. ⚙ Khai báo** — 1 nơi: Hội đoàn thể (lãnh đạo) · Chuẩn hóa · Thông báo phân công BTV · **Lựa chọn in mặc định của khối A** (đơn vị, người kiểm tra, mục đích, nhận xét, Bảng II) · Bảng ngành kinh tế. Khối B giữ lựa chọn riêng (3.323).

**Bỏ / gộp:**
- Bỏ "Tùy chọn khác › Ông (bà) 2 gõ tay" → dùng "Người kiểm tra 2 → Khai báo tên" (chuyển giá trị cũ tự động).
- Giá trị cũ trước 3.114 chuyển hẳn vào lựa chọn in (đọc 1 lần, không xóa bản cũ).
- Ô "Ngày kiểm tra": khối A mặc định "…… tháng mm năm yyyy" (ngày chấm), khối B mặc định chấm hết (như 3.325).

## 3. An toàn — không mất, không hư cái đang đúng
- **Không đổi hàm tính số liệu / dựng mẫu**: `ktGiaTri06`, `ktGiaTri16`, `ktBC04`, `ktKHGiaTri`, `ktDKHo`, `ktGN…`, `ktHTML06/16/04/01`, khuôn Word — chỉ đổi màn chọn, điều hướng, nơi lấy tháng.
- **Không xóa dữ liệu đã lưu**: `ktKH` (lịch năm), `ktHoiKB`, `ktChuan`, `ktIn`, `ktKBLuu`… — đọc bản cũ, chép sang chỗ mới, giữ bản cũ.
- Chuẩn khóa kt_06 / kt_16 / kt_04 / kt_kh (t179) + phép thử KTGS t106–t150, t197, t236 phải đạt ở mỗi bước; thêm phép thử: định kỳ / sau GN / Mẫu 04 chọn tháng 11 → số liệu đúng Mẫu 31 chốt 31/10 dù ô đầu trang đang chọn ngày khác.
- Làm **4 bước, mỗi bước 1 bản gộp riêng**, anh thử xong mới sang bước sau:
  1. Khối A: ô Tháng kiểm tra + lấy số liệu tháng trước cho Định kỳ, Sau GN, Mẫu 04 (màn cũ giữ nguyên, chỉ đổi nguồn tháng).
  2. Thanh 3 khối A / B / C; chip cũ chuyển vào đúng khối (vẫn đủ chức năng).
  3. Gộp 2 lối Định kỳ và 2 lối Mẫu 04; Kế hoạch năm thành nút trong khối A.
  4. Dọn khai báo trùng (Ông bà 2, giá trị cũ) + gom vào ⚙ Khai báo.

## 4. Cần anh chốt
1. Sau giải ngân: mặc định **chỉ tháng liền trước** (1 tháng) — vẫn cho mở từ–đến khi cần gom nhiều tháng? (em đề xuất: có)
2. Mẫu 04 thuộc khối A (theo tháng). Đột xuất có cần lập Mẫu 04 không? (727: Mẫu 04 khi kiểm tra hoạt động Tổ — đột xuất có Mẫu 16 nên em đề xuất: có nút Mẫu 04 trong khối B, dùng chung khuôn)
3. Thứ tự 4 bước như trên, hay làm 1 lần rồi anh thử?
