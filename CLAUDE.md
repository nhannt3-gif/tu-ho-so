# Tủ hồ sơ — hướng dẫn cho Claude

**Đọc trước khi làm bất cứ việc gì:** `docs/BAT_DAU.md` (ngắn, đủ để bắt tay vào việc: luật, lệnh, trạng thái, chỗ tìm thông tin). Hướng đi lớn: `docs/KIEN_TRUC_3_LOP.md`. Tìm code: `docs/BAN_DO_MA.md` (tự sinh — **không đọc cả `index.html`, `CHANGELOG.md`, `BAN_GIAO_VIEC_CON_LAI.md`**, dùng grep đọc đúng đoạn). Bàn giao đầy đủ cũ: `docs/BAN_GIAO_TIEP_TUC.md` (chỉ đọc mục cần).

Tóm tắt bắt buộc:
- Trả lời **tiếng Việt**, gọi người dùng là **anh Nhân** (CBTD NHCSXH PGD Gò Dầu). Ngắn gọn, thực dụng; phân biệt rõ số liệu thật / suy luận.
- **Lên kế hoạch → anh duyệt → anh nhắn "code" mới sửa code; chỉ gộp PR khi anh nhắn "gộp".** Không làm ngoài phạm vi đã chốt; đổi / bỏ chức năng cũ phải được anh duyệt. Thiếu thông tin thì hỏi, không đoán.
- App (từ 3.142) = `index.html` (khung) + `css/app.css` + `js/NN-*.js` nạp theo thứ tự (ES5, không build, không npm, không thêm thư viện). Mỗi bản đổi `?v=` trong `index.html` cùng `APP_BAN`. Không phá chức năng đang chạy; dữ liệu cũ phải đọc được.
- Repo **công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả (`tests/`).
- Mỗi bản: `python3 tests/kiem.py` sạch + hồi quy (`tests/README.md`) + cập nhật `APP_BAN`/`APP_LUC`/`CO_GI_MOI` + `docs/CHANGELOG.md` + `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật) + mục 3 `docs/BAT_DAU.md` + `python3 tests/bando.py`.
- Không ghi tên / mã model vào commit, PR, mã nguồn.
