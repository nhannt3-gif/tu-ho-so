# Tủ hồ sơ — hướng dẫn cho Claude

**Đọc trước khi làm bất cứ việc gì:** `docs/BAN_GIAO_TIEP_TUC.md` (bàn giao đầy đủ: người dùng, quy tắc, kiến trúc, quy trình; **mục 0 = trạng thái mới nhất + việc chờ anh**).

Tóm tắt bắt buộc:
- Trả lời **tiếng Việt**, gọi người dùng là **anh Nhân** (CBTD NHCSXH PGD Gò Dầu). Ngắn gọn, thực dụng; phân biệt rõ số liệu thật / suy luận.
- **Lên kế hoạch → anh duyệt → anh nhắn "code" mới sửa code; chỉ gộp PR khi anh nhắn "gộp".** Không làm ngoài phạm vi đã chốt; đổi / bỏ chức năng cũ phải được anh duyệt. Thiếu thông tin thì hỏi, không đoán.
- App là **một file `index.html`** (ES5, không build, không npm, không thêm thư viện). Không phá chức năng đang chạy; dữ liệu cũ phải đọc được.
- Repo **công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả (`tests/`).
- Mỗi bản: `python3 tests/kiem.py` sạch + hồi quy (`tests/README.md`) + cập nhật `APP_BAN`/`APP_LUC`/`CO_GI_MOI` + `docs/CHANGELOG.md` + `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật).
- Không ghi tên / mã model vào commit, PR, mã nguồn.
