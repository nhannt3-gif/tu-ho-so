# Tủ hồ sơ — hướng dẫn cho Claude

**Đọc trước khi làm bất cứ việc gì:** **bàn giao mới nhất `docs/BAN_GIAO_3224.md`** (trạng thái 3.223.x, việc anh đã duyệt làm liền: 3.224 scan → 3.225 tách lưu trữ, mục Tiến độ cuối file), bàn giao cũ `docs/BAN_GIAO_3161.md` (việc anh đã duyệt hướng, quy trình, công cụ `tools/bump.py`, `tools/hoiquy.sh`) và `docs/BAT_DAU.md` (ngắn, đủ để bắt tay vào việc: luật, lệnh, trạng thái, chỗ tìm thông tin). Hướng đi lớn: `docs/KIEN_TRUC_3_LOP.md`. **Chuẩn hóa code + bản điện thoại (anh duyệt 17/10, đang làm tuần tự R1 → điện thoại → R2…): `docs/KE_HOACH_CHUAN_HOA.md`.** **Luật kiến trúc bắt buộc cho mọi thay đổi: `docs/QUY_CHUAN_KIEN_TRUC.md`** (tách Dữ liệu – Nghiệp vụ – Giao diện, chung / riêng, sổ quy tắc QT, KTGS gói riêng + khóa mẫu, tư vấn đặt chỗ, thứ tự làm 14/10). Tìm code: `docs/BAN_DO_MA.md` (tự sinh — **không đọc cả `index.html`, `CHANGELOG.md`, `BAN_GIAO_VIEC_CON_LAI.md`**, dùng grep đọc đúng đoạn). Bàn giao đầy đủ cũ: `docs/BAN_GIAO_TIEP_TUC.md` (chỉ đọc mục cần).

**24/10/2026 — KTGS: TK 3 ĐÃ BÀN GIAO cho TK 2 (bản 3.331) — đọc `docs/BAN_GIAO_KTGS.md` trước khi sửa KTGS** (khóa file 23/10 đã mở; TK 2 đưa KTGS qua `KHO` bằng cách thay thân `ktNguon*` / các hàm nạp, không đổi hàm dựng mẫu; giữ phép thử mục 5).

**24/10/2026 — TK 2 ↔ TK 3 làm song song: đọc `docs/PHOI_HOP_TK2_TK3.md` trước khi sửa / gộp** (phân file, cách lên số bản không đụng nhau, nhật ký gộp, mục 5 = báo lỗi / việc cho bên kia).

**20/10/2026 — 2 tài khoản song song:** tài khoản chính làm **🎯 Phân bổ kế hoạch** theo `docs/KE_HOACH_PHAN_BO_KH.md` (mục 7 = phân công file, mục 9 = tiến độ) — tài khoản phụ đọc mục 7 trước khi sửa chỗ chung.

Tóm tắt bắt buộc:
- Trả lời **tiếng Việt**, gọi người dùng là **anh Nhân** (CBTD NHCSXH PGD Gò Dầu). Ngắn gọn, thực dụng; phân biệt rõ số liệu thật / suy luận.
- **Lên kế hoạch → anh duyệt → anh nhắn "code" mới sửa code; chỉ gộp PR khi anh nhắn "gộp".** Không làm ngoài phạm vi đã chốt; đổi / bỏ chức năng cũ phải được anh duyệt. Thiếu thông tin thì hỏi, không đoán.
- App (từ 3.142) = `index.html` (khung) + `css/app.css` + `js/NN-*.js` nạp theo thứ tự (ES5, không build, không npm; thư viện chỉ dùng danh mục anh duyệt — `docs/QUY_CHUAN_KIEN_TRUC.md` mục 10). Mỗi bản đổi `?v=` trong `index.html` cùng `APP_BAN`. Không phá chức năng đang chạy; dữ liệu cũ phải đọc được.
- Repo **công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả (`tests/`).
- Mỗi bản: `python3 tests/kiem.py` sạch + hồi quy (`tests/README.md`) + cập nhật `APP_BAN`/`APP_LUC`/`CO_GI_MOI` + `docs/CHANGELOG.md` + `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật) + mục 3 `docs/BAT_DAU.md` + `python3 tests/bando.py`.
- Không ghi tên / mã model vào commit, PR, mã nguồn.
