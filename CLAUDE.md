# Tủ hồ sơ — hướng dẫn cho Claude

**Đọc theo thứ tự (đủ để bắt tay vào việc):**
1. `AGENTS.md` — luật chung mọi AI (quy trình, bảo mật, phân quyền).
2. `docs/TRANG_THAI_CHUNG.md` (tự sinh) + mục đầu `docs/nhat_ky/APP.md` — trạng thái, việc dở, việc chờ anh, bẫy. Cuối mỗi phiên **ghi 1 mục nhật ký vai** (AGENTS.md mục 1).
3. `docs/BAT_DAU.md` (lệnh, quy trình bản) · `docs/QUY_CHUAN_KIEN_TRUC.md` (luật kiến trúc — bắt buộc cho mọi thay đổi) · `docs/BAN_DO_MA.md` (tìm code, tự sinh).
4. Khi cần: `docs/README.md` (bản đồ tài liệu: đang dùng / tham khảo / lịch sử) · `docs/COT_FILE_MAU.md` (tên cột file hệ thống) · `docs/BAN_GIAO_KTGS.md` (trước khi sửa KTGS) · `docs/PHOI_HOP_CHUNG.md` (trước khi đụng nạp file / kho / luật số liệu chung).

**Không đọc cả** `index.html`, `docs/CHANGELOG.md`, `docs/BAN_GIAO_VIEC_CON_LAI.md` — dùng grep đọc đúng đoạn. Lịch sử bàn giao cũ của file này: `docs/luu_tru/CLAUDE_LICH_SU.md`.

Tóm tắt bắt buộc:
- Trả lời **tiếng Việt**, gọi người dùng là **anh Nhân** (CBTD NHCSXH PGD Gò Dầu). Ngắn gọn, thực dụng; phân biệt rõ số liệu thật / suy luận.
- **Lên kế hoạch → anh duyệt → anh nhắn "code" mới sửa code; chỉ gộp PR khi anh nhắn "gộp".** Không làm ngoài phạm vi đã chốt; đổi / bỏ chức năng cũ phải được anh duyệt. Thiếu thông tin thì hỏi, không đoán.
- App (từ 3.142) = `index.html` (khung) + `css/app.css` + `js/NN-*.js` nạp theo thứ tự (ES5, không build, không npm; thư viện chỉ dùng danh mục anh duyệt — `docs/QUY_CHUAN_KIEN_TRUC.md` mục 10). Mỗi bản đổi `?v=` trong `index.html` cùng `APP_BAN`. Không phá chức năng đang chạy; dữ liệu cũ phải đọc được.
- Repo **công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả (`tests/`).
- **Phép thử theo mức thay đổi (anh duyệt 25/10, kèm luật "chức năng mới nhưng phải đảm bảo cái cũ chạy được"):** sửa nhỏ 1 khối → phép thử khối đó + `bash tools/hoiquy.sh <tên> <tmp> doi 2` (tự chọn phép liên quan); đụng phần chung (KHO, khuôn in / trDan, GD lệnh, lưu / đồng bộ, khung điều hướng / CSS chung) hoặc trước gộp bản lớn hoặc định kỳ 3–4 bản → hồi quy đủ. Phép thử rà định kỳ: bỏ trùng, bỏ phép của chức năng đã gỡ.
- **Hồi quy theo đổi (3.384, anh 26/10 "chức năng đã chốt ổn thì không cần chạy lại"):** mỗi bản chạy `bash tools/hoiquy.sh <tên> <tmp> doi 2` (chỉ phép chưa chốt / file phụ thuộc đổi — mốc `tests/hoiquy_moc.json`, bảng `docs/DA_CHOT.md`); hồi quy đủ (`tat`) định kỳ 3–4 bản / trước bản lớn. Chi tiết `tests/README.md`.
- Mỗi bản: `python3 tests/kiem.py` sạch + phép thử theo mức trên (`tests/README.md`) + cập nhật `APP_BAN`/`APP_LUC`/`CO_GI_MOI` + `docs/CHANGELOG.md` + `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật) + mục 3 `docs/BAT_DAU.md` + `python3 tests/bando.py` + `python3 tools/so_cau_hinh.py` (sổ cấu hình). Gói JS mới = 1 không gian tên (QUY_CHUAN mục 13).
- Không ghi tên / mã model vào commit, PR, mã nguồn.
