# Mẫu gốc (chuẩn gốc) — file Word anh Nhân gửi 16/10/2026

Đã làm sạch trước khi đưa lên repo công khai: bỏ tên người soạn / sửa trong thông tin file, bỏ phông chữ nhúng; 11_cu: tên, địa chỉ, số điện thoại Giám đốc → giả. File `.doc` cũ đã chuyển sang `.docx` (LibreOffice).
Số đo: `python3 tools/domau.py` → `so_do.json`. So với app: `node tests/t180.js [--chi-tiet]`. Mẫu đã làm lại theo file gốc (anh duyệt) ghi vào `khop.json` → t180 bắt buộc đạt.

| File | Mẫu | Văn bản |
|---|---|---|
| 01td | 01/TD Giấy đề nghị vay vốn kiêm PA SDVV | |
| 03td | 03/TD Danh sách đề nghị vay vốn | 16/5/2023 |
| 01uq | 01/UQ Giấy ủy quyền | VB 10493, áp dụng T01/2026 |
| 09a | 09A/TD Giấy đề nghị gia hạn nợ | QĐ 54, 15/9/2023 |
| 01tdck | 01/TĐCK Giấy đề nghị thay đổi chữ ký giao dịch | VB 2407, 28/3/2025 |
| 01tgtv | 01/TGTV Giấy đăng ký mở TK tổ viên | 03-2026 (3 trang + 1 trang trắng in 2 mặt) |
| 01gqvl | 01/GQVL Phương án SDVV (GQVL) | áp dụng 01/10/2026 |
| 07b | 07b/GQVL Hợp đồng tín dụng | |
| 06a | 06A/TD Phiếu kiểm tra sử dụng vốn vay — từng hộ, mỗi món 1 phiếu (anh gửi 01/11/2026; đã bỏ tên người soạn) | 727/HD-NHCS 11/02/2026 · đo bằng `t349` (chưa vào `t180`) |
| 10c_cu | 10C/TD mẫu cũ (bổ sung tổ viên) | đến 30/9/2026 |
| 10c_moi | 10C/TD mẫu mới | VB 4336, T10-2026 |
| 10a | 10A/TD Biên bản họp thành lập Tổ | |
| 10b | 10B/TD Biên bản họp kết nạp, bầu thay BQL | |
| 10d | 10D/TD Biên bản họp giải thể Tổ (mẫu mới, app chưa có) | |
| 11_cu | 11/TD Hợp đồng ủy nhiệm — mẫu cũ | CV 7305, sửa theo VB 5535 |
| 11_moi | 11/TD Hợp đồng ủy nhiệm — mẫu mới | 27/9/2026 |
| 01bg | 01/BG Biên bản bàn giao hồ sơ Tổ | |
| 02bg | 02/BG Bàn giao kiêm đối chiếu số dư (A4 ngang) | |
| 07pb | Biểu 07 Phân bổ KH — Thông báo giao / điều chỉnh KH dư nợ của UBND xã + Danh mục (2 trang; ô `{{…}}` của bản WPF, mẫu trắng, đã bỏ tên máy trong thông tin file) | 3.289 · đo bằng `t253` (chưa vào `t180` — mẫu không thuộc tab Hồ sơ) |

**Bổ sung 07/11/2026** (anh: "em có thể lưu mẫu gốc lên repo để đối chiếu khi cần"). Các file dưới là mẫu trắng; đã bỏ tên người soạn, người sửa và tên đơn vị trong thông tin file. File `.xls` đã chuyển sang `.xlsx`.

| File | Mẫu | Văn bản |
|---|---|---|
| kh05 | Biểu 05/KH — QĐ Tổng Giám đốc giao (điều chỉnh) chỉ tiêu KH tín dụng cho tỉnh (tham khảo) | QĐ 4686/QĐ-NHCS 21/10/2026 |
| kh07 | Biểu 07/KH — QĐ Ban Đại diện HĐQT xã giao (điều chỉnh) chỉ tiêu cho thôn · app: `js/mau/07kh.js` (3.494) | QĐ 4686 |
| kh08 | Biểu 08/KH — QĐ Giám đốc PGD điều chỉnh chỉ tiêu cho thôn · app: `js/mau/07kh.js` | QĐ 4686 |
| kh09 | Biểu 09/KH — Tờ trình Ban Đại diện HĐQT xã đề nghị điều chỉnh · app: `js/mau/07kh.js` + `js/48c` | QĐ 4686 |
| kh01_04 | Biểu 01, 02, 03, 04/KH — xây dựng KH tín dụng (thôn · xã · PGD · tỉnh; sheet 5 là mẫu cũ). App chưa làm (anh 07/11: để sau) | QĐ 4686 |
| 15td | 15/TD Danh sách đối chiếu số dư tiền vay và tiền gửi (A4 ngang; tên "Nguyễn Văn A, B, C" là ví dụ in sẵn của mẫu) — KTGS 3.498 (`tools/khuon_727.py` → `js/khuon/kt-khuon-727.js`) | 727/HD-NHCS 11/02/2026 |
| 03bbcx | 03/BB-CX Biên bản kiểm tra hoạt động nhận ủy thác của tổ chức CT-XH cấp xã — KTGS 3.498 (`tools/khuon_727.py`; mẫu gốc thiếu mục III; anh 07/11 chốt sửa thành III, IV) | 727/HD-NHCS 11/02/2026 |
