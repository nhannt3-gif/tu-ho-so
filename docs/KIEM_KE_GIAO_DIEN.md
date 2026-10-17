# Kiểm kê giao diện (R1 — 17/10/2026, bản 3.229 + dọn rác 3.230)

> Đo tự động bằng `node tests/do_bo_cuc.js [thư mục ảnh]` (dữ liệu giả, 17 trang × 4 cỡ 1440 · 1024 · 768 · 390). Ảnh không đưa vào repo.
> Đây là danh sách để làm R2 (khung bố cục + mảnh giao diện + bộ nút + điều hướng). Đánh giá bằng mắt trên ảnh ghi ở cột "Nhận xét".

## 1. Bố cục — chỗ cần sửa
| Chỗ | Hiện tượng | Nhận xét / sửa ở |
|---|---|---|
| 📒 Sổ hộ vay (tắt khung xem) | Ô Tìm, ô chọn, chip giãn hết bề ngang, chữ to hơn nút | **Đã sửa 3.230** (ô vừa nội dung, chữ cùng cỡ) |
| Hộp ⚙ Khai báo đơn vị — điện thoại 390 | Tràn ngang; nút tab cuối hàng (💾 Sao lưu) **bị kéo dài hết hàng** | R2: hàng nút không giãn, tab cuộn ngang |
| Mọi trang — điện thoại 390 | Thanh tab dưới / dải tab con lòi ra ngoài màn (Scan, Thư viện…) — đa số là dải cuộn ngang, cần kiểm có thấy dấu cuộn | R2 / bản điện thoại riêng thay thế |
| Số liệu (Tổ, Sao kê, Tổng hợp, Hồ sơ) — 768 | Dải tab con / tab mẫu lòi ra ngoài (Hồ sơ vay, Giao dịch xã, 01/TGTV, 09A…) | R2: dải tab cuộn ngang có mũi tên |
| Ô tìm đầu trang — 1440 | Rộng > 520 px (chấp nhận được — ô tìm chung) | Giữ, đặt rộng tối đa |
| Hồ sơ Tổ / Khai báo — 1440 | 3–4 ô nhập > 520 px (ô khai báo kéo theo cột) | R2: ô nhập rộng tối đa theo loại |

### Số đo chi tiết (chỉ dòng có vấn đề)
| Trang | Cỡ | Tràn ngang | Nút giãn | Ô giãn | Lòi ra ngoài | Ví dụ |
|---|---|---|---|---|---|---|
| Hôm nay | 1440 | — | — | 2 | — | Gõ số văn bản, từ khóa, thán · Gõ việc rồi bấm Enter… |
| Hôm nay | 390 | — | — | — | 2 | Scan · Thư viện |
| Văn bản | 1440 | — | — | 1 | — | Gõ số văn bản, trích yếu, gh |
| Văn bản | 390 | — | — | — | 3 | Scan · Thư viện |
| Mẫu biểu | 1440 | — | — | 1 | — | Tìm trong ghi chú… |
| Mẫu biểu | 390 | — | — | — | 2 | Scan · Thư viện |
| Scan | 1440 | — | — | 1 | — | Tìm tên khách, ấp, tổ… |
| Scan | 390 | — | — | — | 2 | Scan · Thư viện |
| Thư viện | 1440 | — | — | 1 | — | Tìm biểu mẫu, chương trình… |
| Thư viện | 390 | — | — | — | 3 | Scan · Thư viện |
| Lịch | 1440 | — | — | 1 | — | Tìm file chờ duyệt… |
| Lịch | 390 | — | — | — | 2 | Scan · Thư viện |
| Nạp & KT | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Nạp & KT | 390 | — | — | — | 2 | Scan · Thư viện |
| Tra cứu | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Tra cứu | 390 | — | — | — | 3 | Scan · Thư viện |
| Tổ TK&VV | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Tổ TK&VV | 768 | — | — | — | 1 | 🏢 Giao dịch xã |
| Tổ TK&VV | 390 | — | — | — | 5 | Scan · Thư viện |
| Sao kê | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Sao kê | 768 | — | — | — | 2 | 📄 Hồ sơ vay · 🏢 Giao dịch xã |
| Sao kê | 390 | — | — | — | 6 | Scan · Thư viện |
| Tổng hợp | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Tổng hợp | 768 | — | — | — | 3 | 📝 Hồ sơ Tổ · 📄 Hồ sơ vay |
| Tổng hợp | 390 | — | — | — | 7 | Scan · Thư viện |
| KTGS | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| KTGS | 390 | — | — | — | 4 | Scan · Thư viện |
| Hồ sơ Tổ | 1440 | — | — | 4 | — | Tìm văn bản, scan, biểu mẫu… · INPUT |
| Hồ sơ Tổ | 768 | — | — | — | 3 | 11/TD cũ · 01/BG |
| Hồ sơ Tổ | 390 | — | — | — | 7 | Scan · Thư viện |
| Hồ sơ vay · 01/TD | 1440 | — | — | 2 | — | Tìm văn bản, scan, biểu mẫu… · — sổ trống — |
| Hồ sơ vay · 01/TD | 768 | — | — | — | 3 | 01/TGTV · 09A/TD |
| Hồ sơ vay · 01/TD | 390 | — | — | — | 7 | Scan · Thư viện |
| Sổ hộ vay (không khung xem) | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Sổ hộ vay (không khung xem) | 768 | — | — | — | 3 | 01/TGTV · 09A/TD |
| Sổ hộ vay (không khung xem) | 390 | — | — | — | 7 | Scan · Thư viện |
| Giao dịch xã | 1440 | — | — | 1 | — | Tìm văn bản, scan, biểu mẫu… |
| Giao dịch xã | 390 | — | — | — | 3 | Scan · Thư viện |
| ⚙ Khai báo đơn vị (hộp) | 1440 | — | — | 4 | — | Tìm văn bản, scan, biểu mẫu… · INPUT |
| ⚙ Khai báo đơn vị (hộp) | 768 | — | — | — | 3 | 11/TD cũ · 01/BG |
| ⚙ Khai báo đơn vị (hộp) | 390 | ⚠ có | 2 | — | 19 | 💾 Sao lưu · Đóng (Esc) · Scan |

## 2. Bộ nút xuất — mỗi nơi một kiểu
| Nơi | Bộ nút hiện có |
|---|---|
| Số liệu (Tổ, Sao kê, Tổng hợp, KTGS…), Hồ sơ vay / Tổ | Bộ chung `xuatHang` (Đóng · In · PDF · Word · Excel · Gửi) — **chưa có** Lưu vào app / Lưu vào máy |
| Scan (`12-scan`, `35-scan`) | Bộ riêng: In · Lưu vào máy · Lưu vào app · Gửi Zalo · Bỏ |
| Văn bản / hộp thoại (`06`), Biểu mẫu (`09`), Giao dịch xã (`26`), Thêm file (`05`), giao diện chung (`04`) | Nút In / Gửi tự viết từng chỗ (🖨 In xuất hiện ở 10 file) |
→ R2: nâng `xuatHang` thành bộ chuẩn (KE_HOACH_CHUAN_HOA mục 5), thay dần bộ riêng, xóa bộ cũ.

## 3. Điều hướng — đóng / thoát chưa thống nhất
- Gọi mở hộp `moHop` ~128 chỗ, đóng `dongHop()` ~261 chỗ; nhiều nhất `22-so-lieu` (38 / 72), `04-giao-dien` (35 / 74), `12-scan` (17 / 33).
- Chữ nút đóng: "Đóng" 52 · "Thôi" 53 · "Bỏ" 26 · "Xong" 13 · "✕" 25 — cùng việc nhưng nhiều tên.
- Chưa gắn lịch sử trình duyệt (nút ◀ điện thoại / Back chuột); hộp mở từ hộp ghi đè hộp cũ.
→ R2: bộ điều hướng `DH` + 4 nút nghĩa cố định (KE_HOACH_CHUAN_HOA mục 6).
