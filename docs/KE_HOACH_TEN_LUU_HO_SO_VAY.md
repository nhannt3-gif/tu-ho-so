# Kế hoạch: thống nhất TÊN + CẤU TRÚC LƯU hồ sơ theo khách (Scan → Hồ sơ vay)

> Anh 20/10/2026: *"làm cho tab Scan trước, sau này sẽ phát triển thống nhất tên và cấu trúc lưu cho hồ sơ vay, còn VB thì kiểu khác rồi"*;
> nguyên tắc file (QUY_CHUAN_KIEN_TRUC mục 12): *mọi file có tên và quản lý được, file không quản được thì để chỗ chung để kiểm tra*.
> Trạng thái: **anh duyệt 20/10/2026** ("đồng ý em code và gộp lên … thống nhất cho các chức năng tương đồng") — nhận đề xuất (a) số CCCD, (b) 1 thư mục `Hồ sơ vay`, (c) tên loại như mục 4. Tiến độ: mục 5. Số liệu hiện trạng dưới đây em đọc từ code 3.278.

## 1. Hiện trạng (đã kiểm tra trong code)
| Phần | Tên đang đặt | Nơi lưu | Gắn khách |
|---|---|---|---|
| Scan (3.264–3.278) | `MãKH - Họ tên - Loại` (+ ` (2)` nếu trùng) · chưa rõ: tên anh gõ | Drive phẳng: `CCCD` · `Chữ ký - Ảnh khách` · `Hồ sơ scan` · `Scan chờ sắp xếp` | mã KH (Mẫu 31) |
| Hồ sơ vay (01/TD, 03/TD, UQ…) | bản lưu: `Ten khong dau - To - Ap` (không mã KH, không dấu) | chỉ trong cài đặt app (`hsoBo`); in / PDF ra máy, **không lên Drive** | qua Sổ hộ vay (`hoId`), hộ cũ có mã KH |
| Bộ hồ sơ (Thư viện) | tên file anh đặt | Drive `Bộ hồ sơ / <tên bộ>` | theo tên bộ (chữ) |
| Văn bản | kiểu riêng (số / ngày / trích yếu) | — | không theo khách — **giữ nguyên** (anh chốt) |

## 2. Quy tắc chung đề xuất
1. **Khóa khách**: mã KH (Mẫu 31). Hộ mới chưa có mã KH → **số CCCD** người vay (12 số); có mã KH sau giải ngân → app tự đổi tên theo mã KH (như 🧹 Sắp xếp).
2. **Tên file**: `Khóa - Họ tên có dấu - Loại[ (n)]` — Loại viết liền không dấu gạch chéo: `CCCD`, `Mặt trước`, `Chữ ký`, `Ảnh`, `01TD`, `03TD`, `01UQ`, `10C`…
3. **Thư mục Drive phẳng theo loại** (không thư mục con theo xã / ấp — anh đã thấy "rất rối"): giữ 4 thư mục Scan + thêm **`Hồ sơ vay`** (PDF mẫu đã in / đã ký).
4. **Không quản được** → `Scan chờ sắp xếp` (đổi tên chung: **`Chờ sắp xếp`**), hiện ở 🗂 Quản lý.
5. **Một sổ quy tắc dùng chung** (js riêng, lớp Nghiệp vụ): `tenChuan`, `thuMucTheoLoai`, `xacDinhKhach` (sxXacDinh), `soThu` — Scan, Hồ sơ vay, Bộ hồ sơ cùng gọi; gỡ dần các hàm "bọc" của Scan (mục 7 rà soát).

## 3. Các bước (mỗi bước 1 bản, gộp rồi anh thử)
| Bước | Việc | Ghi chú |
|---|---|---|
| 0 | Dọn kỹ thuật Scan: tải ảnh từ Drive mỗi lần 2–3 ảnh + nút dọn ảnh tải về (mục 8); file thả tay cặp mặt trước / sau ghép 1 bản (mục 5) | nhỏ |
| 1 | Sổ quy tắc chung (mục 2.5) — chuyển Scan sang dùng, không đổi cách anh dùng | kỹ thuật, có phép thử cũ giữ nguyên kết quả |
| 2 | Hồ sơ vay: tên bản lưu theo quy tắc (`MãKH/CCCD - Họ tên - 01TD`); bản cũ đổi tên 1 lần (giữ tên cũ trong ghi chú) | |
| 3 | Hồ sơ vay: **💾 Lưu PDF vào tủ** (sau khi in / ký) → Drive `Hồ sơ vay`, hiện ở dòng "Hồ sơ của khách" + 📊 Kiểm tra (cột 01TD…) | cần anh chốt câu (b) |
| 4 | Bộ hồ sơ: file trong bộ có gắn khách thì đặt tên theo quy tắc; không gắn được → Chờ sắp xếp | |
| 5 | Rà dữ liệu cũ: 1 nút rà Drive toàn bộ (như 🔎 Rà) → đổi tên / dời theo quy tắc, báo file không quản được | anh tích mới làm |

## 4. Cần anh chốt trước khi làm bước 2–3
- **(a)** Hộ mới chưa có mã KH: khóa bằng **số CCCD** (em đề xuất) hay chữ `MOI` + họ tên?
- **(b)** Hồ sơ vay lưu PDF lên Drive: 1 thư mục **`Hồ sơ vay`** phẳng (em đề xuất) hay chia theo chương trình (HSSV, NS&VSMT…)?
- **(c)** Tên loại mẫu: `01TD`, `03TD`, `01UQ`, `10C`, `01TGTV` — đúng cách anh hay gọi chưa?

## 5. Tiến độ
- 20/10 · **3.294 bước 0 xong**: Rà nhận file thả tay trên Drive (nhóm theo khách, Nhận vào app), tải ảnh Drive ≤ 2 cùng lúc, 🧹 dọn ảnh tải về.
- 21/10 · **3.295 bước 1 xong**: `js/49-ten-chuan.js` (TC.thuMuc, TC.loaiMau, tcTen, tcSoThu, tcDuong) — Scan dùng chung, tên không đổi.
- 21/10 · **3.296 bước 2 xong**: bản lưu 01/TD tên chuẩn `Mã KH / số CCCD - Họ tên - 01TD`, bản cũ đổi tên giữ `tenCu`.
- 21/10 · **3.297 bước 3 xong**: 01/TD › 📷 Quét bản đã ký → Scan điền sẵn khách + 01TD → thư mục Hồ sơ vay tên chuẩn (hộ mới khóa CCCD, `khoaCCCD`); tài liệu mẫu hồ sơ vay vào Hồ sơ vay. (App không tự dựng PDF từ mẫu in — lưu bằng quét bản đã ký.)
- 21/10 · **3.298 bước 5 xong**: 🔎 Rà soát Drive 3 thư mục (CCCD · Hồ sơ scan · Hồ sơ vay) — sai thư mục dời + tên chuẩn (tích sẵn), tài liệu thả tay nhận vào app. **Bước 4 (Bộ hồ sơ) chờ anh chốt**: file riêng của bộ gắn khách thì đặt tên thế nào.
