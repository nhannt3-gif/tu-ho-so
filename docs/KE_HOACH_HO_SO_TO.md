# Kế hoạch: Bộ hồ sơ Tổ TK&VV (QĐ 70) — điền tự động từ số liệu

> Ghi nhận 11/10/2026. Anh chốt nguyên tắc: **căn cứ số liệu điền tự động hết mức có thể; thông tin nào không có thì để chấm ghi tay.**
> File mẫu anh gửi chỉ đọc trong thư mục nháp của phiên — **không đưa vào repo**. Lời văn mẫu là mẫu công khai của ngành (QĐ 70/QĐ-HĐQT ngày 27/8/2026), không có dữ liệu thật → được nhúng vào app.
> Chưa code — chờ anh nhắn "code". Bản đề xuất: **3.167** (10C cũ + 10C mới, 01/BG, 02/BG) · **3.168** (10A, 10B, 11/TD).

## Anh chốt thêm 11/10 (sau khi gửi đủ mẫu)
- **Tab riêng "📝 Hồ sơ Tổ"** trong nhóm Số liệu (không nhét vào tab Tổ). Áp dụng đồng bộ quy tắc các tab: hàng lọc Xã · Điểm GD │ Hội · Tổ (chip kèm ấp), chip trạng thái cuối hàng Xã, 📍; chọn 1 mẫu → xem ngay khung phải; hàng xuất Word · In · PDF · Gửi.
- **⚙ Khai báo 1 lần** (lưu + đồng bộ Drive như cài đặt): PGD (tên, đại diện, chức vụ, địa chỉ, điện thoại, tỉnh in sẵn) · trưởng ấp theo từng ấp · người của Hội cấp xã (lấy sẵn từ tab Khai báo Hội đoàn thể) · **tổ phó thực tế** theo tổ (một số tổ trên máy chưa khớp thực tế) — có khai thì ưu tiên, khác máy thì chip ⚠.
- **Tên dòng lọc nổi bật** (Xã · Điểm GD · Hội · Tổ — lớp `.pv-nhan` dùng chung mọi tab): nhãn nền xanh nhạt, viền xanh, chữ đậm, rộng đều. Áp cho **mọi tab có cây địa bàn** ở 3.167 (anh duyệt hướng 11/10, xem bản mẫu).
- Ô điền 3 màu: xanh lá = số liệu · vàng = khai báo 1 lần · viền đứt = chấm ghi tay. Sửa ô chỉ áp cho lần in đó.
- **Bố cục mẫu (dữ liệu giả)** để anh duyệt: artifact "Tab Hồ sơ Tổ — bố cục" (https://claude.ai/artifact/N81fqoLC7RwsTGL8byDjSg).

## Cách dùng (đề xuất)
Tab **📝 Hồ sơ Tổ** → chọn tổ ở hàng lọc → chọn mẫu ở cột trái → hộp chọn trước khi in (ngày họp / kỳ chốt, tích người, sửa nhanh ô điền sẵn) → **Word (.docx) đúng khổ** + 🖨 In / PDF (bộ in chuẩn). Ô app không có dữ liệu → dòng chấm như mẫu gốc.

Nguồn dữ liệu: Mẫu 31 (khách, món, nợ gốc, lãi tồn, số dư 105, CCCD, ngày vay), DSTO / LEN_31 TO_TRUONG (tổ trưởng, tổ phó, ấp), Khai báo Hội (Hội, người của Hội), Cài đặt (PGD, tỉnh), biến động tổ (`TO_BD`: mới vào / ra khỏi tổ), so 2 kỳ (tổ trưởng đổi).

## Mặc định khi anh chưa nói khác
- Mẫu 10C: chọn theo **ngày họp** — đến 30/09/2026 mẫu cũ, từ 01/10/2026 mẫu mới (đổi tay được).
- Mức tiết kiệm tối thiểu: **để chấm** (ô nhập tùy chọn trong hộp in, app nhớ mức anh gõ lần trước).
- 02/BG: **tổ viên còn dư nợ / còn nợ lãi / còn số dư 105** (khách đã tất nợ và 105 = 0 không đưa vào); hộp in có tích "gồm cả tổ viên không còn số dư".
- 11/TD Bên A: người đại diện, chức vụ, địa chỉ, điện thoại PGD lưu 1 lần ở Cài đặt; chưa khai → chấm.

## Từng mẫu — ô nào app điền, ô nào để chấm

### 10C/TD mẫu cũ (tổ viên vào tổ đến 30/09/2026) — A4 dọc
| Ô | Điền tự động | Nguồn |
|---|---|---|
| Ấp (kp), xã (phường), tỉnh Tây Ninh | ✓ | DSTO / Mẫu 31 (`tenThon`, `tenXa`); tỉnh in sẵn |
| Tên tổ, thuộc Hội | ✓ | tổ, `tdnHoi(dv)` |
| Chủ trì (Tổ trưởng), Thư ký (Tổ phó) | ✓ (tổ phó nếu DSTO / LEN có) | `t.ten`, `t.pho` |
| Trưởng ấp, đại diện Hội (tên, chức vụ) | ✓ nếu đã khai ở Khai báo Hội; không → chấm | Khai báo Hội |
| Số tổ viên dự / tổng | tổng ✓, số dự → chấm | `toTV` |
| Bảng 1 Kết nạp, bảng 2 Cho ra (STT · Họ tên │ STT · Họ tên, 2 nửa) | ✓ theo người anh tích | chip Mới vào / Ra khỏi tổ / Tất nợ – 105 = 0 |
| Tổng số tổ viên sau kỳ họp | ✓ = hiện có + kết nạp − cho ra | |
| Giờ, ngày họp, mức tiết kiệm, nội dung khác, giờ kết thúc | chấm (ngày họp điền nếu anh chọn) | |

### 10C/TD mẫu mới (QĐ 70, từ 01/10/2026) — A4 dọc
Như mẫu cũ, thêm: "Về việc …" (✓ "kết nạp, cho tổ viên ra khỏi Tổ" khi có danh sách; trống → chấm); hình thức họp (ô tích → để trống); bảng I Kết nạp │ II Cho ra (✓); **mục 2 danh sách đề nghị vay** (Họ tên · CT vay · Số tiền · Mục đích · Thời hạn) → chấm (app chưa có hồ sơ đề nghị vay); mục 4 biểu quyết → chấm. Ký: Thư ký · Tổ chức CT-XH cấp xã · Chủ trì · Trưởng thôn.

### 01/BG Bàn giao hồ sơ Tổ — A4 dọc, 2 bản
| Ô | Điền tự động |
|---|---|
| Thôn, xã, tỉnh; Hội quản lý | ✓ |
| Bên giao (tổ trưởng cũ), Bên nhận (tổ trưởng mới) | ✓ gợi ý khi so 2 kỳ thấy tổ trưởng đổi; không thấy → tổ trưởng hiện tại ở Bên giao, Bên nhận chấm |
| Ngày biên bản họp thay đổi BQL, UBND xã chấp thuận | xã ✓, ngày chấm |
| Thành phần chứng kiến | ✓ nếu đã khai ở Khai báo Hội |
| Mục 1 số bản 10A / 10B / 10C / 03TD; mục 2 việc đang làm; mục 3 ý kiến | chấm |

### 02/BG Biên bản bàn giao kiêm đối chiếu số dư tiền vay, tiền gửi — A4 ngang, đơn vị đồng
| Ô | Điền tự động |
|---|---|
| Xã; "Đến ngày" | ✓ ngày số liệu của kỳ chốt anh chọn (Mẫu 31) |
| Ông (bà) đại diện 2 Hội; Tổ trưởng bên giao / bên nhận thuộc Hội | Hội ✓; tổ trưởng như 01/BG; tên người của Hội ✓ nếu đã khai |
| Bảng cột 1–6: dòng khách (đậm: STT, họ tên, Mã khoản vay "x", tổng nợ gốc, nợ lãi, số dư 105); dòng con mỗi món (chương trình, mã khoản vay, nợ gốc, nợ lãi của món) | ✓ Mẫu 31 |
| Số dư tiền gửi | ✓ ghi 1 lần ở dòng khách (105 là theo khách, không theo món) |
| Cột 7–14 (đối chiếu, chênh lệch, nguyên nhân, chữ ký) | để trống |
| Tổng cộng; Nợ quá hạn … món, số tiền; Nợ khoanh … món, số tiền | ✓ |
| Số tổ viên chưa đối chiếu được | chấm |

### 10A/TD Thành lập tổ (3.168) — A4 dọc
Thôn, xã, tỉnh, Hội ✓; danh sách tổ viên (2 cột × 20 dòng) ✓ nếu tổ đã có trong dữ liệu (tích chọn), không → chấm; quy ước hoạt động: lời văn mẫu, ngày họp định kỳ và mức tiết kiệm → chấm; Ban quản lý: tổ trưởng / tổ phó ✓ nếu có; phần UBND phê duyệt: thôn, xã ✓, còn lại chấm.

### 10B/TD Kết nạp + thay đổi Ban quản lý (3.168) — A4 dọc
Thôn, xã, tỉnh, Hội ✓; số tổ viên tổng ✓; kết nạp (danh sách tích) ✓; "bầu … thay Ông (Bà) …" ✓ gợi ý khi so 2 kỳ thấy tổ trưởng / tổ phó đổi; lý do họp, biểu quyết → chấm; phần UBND phê duyệt: thôn, Hội ✓.

### 11/TD Hợp đồng ủy nhiệm (3.168) — A4 dọc, nhiều trang
Bên A: PGD, đại diện, chức vụ, địa chỉ, điện thoại ✓ từ Cài đặt (khai 1 lần). Bên B: tên tổ, Hội, tổ trưởng, thôn, xã, tỉnh ✓; số thẻ căn cước, ngày cấp, nơi cấp ✓ **chỉ khi tổ trưởng cũng là khách trong Mẫu 31 và khớp được tên trong tổ** (rê chuột ghi căn cứ; không chắc → chấm). Ngày biên bản 10A / 10B, ngày ký, số tài khoản nhận hoa hồng → chấm. Lời văn Điều 1–4 và mức hoa hồng: nguyên văn mẫu.

## Kèm trong 3.167 (anh đã chốt 11/10)
- Bảng cuộn trong khung (tiêu đề + dòng Cộng dính) **đồng nhất mọi bảng cùng loại**: Sao kê, KTGS… như tab Tổ.
- Chip "Mới vào": kỳ ngày → "Mới vào 07/09"; kỳ tháng → "Mới vào 31/07→31/08".
