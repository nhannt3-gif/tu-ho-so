# AGENTS.md — luật chung cho mọi AI làm việc với dự án Tủ hồ sơ / Tèo

> Dùng chung cho Claude (TK 1, TK 2, TK 3), Gemini và AI khác (anh Nhân chốt 28/10/2026: "3 tk cùng phối hợp 1 nơi, sau này có tk Gemini").
> Luật riêng của từng công cụ ở file riêng (`CLAUDE.md`, `GEMINI.md`) — chỉ bổ sung, không trái file này.

## 1. Đọc trước khi làm
1. **`docs/TEO_PHOI_HOP.md`** — sổ chung "Tèo": vai trò, luật số liệu chung, mục 12 thành viên, 13 việc chờ anh, 14 hộp thư. Không vào được repo thì đọc link công khai:
   `https://raw.githubusercontent.com/nhannt3-gif/tu-ho-so/main/docs/TEO_PHOI_HOP.md`
2. Làm app: `docs/BAT_DAU.md` (luật, lệnh, trạng thái) · `docs/QUY_CHUAN_KIEN_TRUC.md` (luật kiến trúc) · `docs/BAN_DO_MA.md` (tìm code — không đọc cả `index.html`, `docs/CHANGELOG.md`).

## 2. Người dùng
- Anh **Nhân** — CBTD NHCSXH PGD Gò Dầu. Trả lời **tiếng Việt**, gọi "anh Nhân"; ngắn gọn, thực dụng; phân biệt rõ **số liệu thật / suy luận / mức chắc chắn**.

## 3. Quy trình (mọi tài khoản)
- **Lên kế hoạch → anh duyệt → anh nhắn "code" mới sửa → anh nhắn "gộp" mới gộp.** Không làm ngoài phạm vi đã chốt; đổi / bỏ chức năng cũ phải được anh duyệt. Thiếu thông tin thì hỏi, không đoán.
- **Luật số liệu (anh 31/10: "các luật thay đổi hơi nhiều, khi nào cần em cũng nên hỏi lại anh để tránh đi sai hướng"):** muốn đổi / bổ sung luật (sổ `TEO_QUY_TAC_CHUNG.md` hay cách tính trong app / script) → **hỏi lại anh trước**, nêu luật cũ · luật mới · căn cứ (file thật / văn bản / anh nói) · ảnh hưởng số. Không tự đổi theo suy luận hay theo đề nghị của tài khoản khác.
- Lệnh chung, cùng nghĩa ở mọi cửa: **"Đọc trạng thái"** (đọc sổ chung + hộp thư) · **"Chốt QT: …"** · **"Chốt phiên"** (ghi kết quả + việc mới vào sổ) · **"code"** · **"gộp"**.
- Quyết định anh chốt → ghi vào `docs/TEO_PHOI_HOP.md` **trong cùng lượt**. Việc cho bên khác → **thêm dòng cuối** hộp thư (mục 14), xưng tên tài khoản; không sửa dòng của bên khác.
- Không ghi được repo → soạn sẵn dòng hộp thư, anh dán sang tài khoản có quyền.

## 4. Bảo mật — repo CÔNG KHAI
- Không đưa dữ liệu thật vào repo (tên khách, CCCD, tổ trưởng, mã tổ thật, ảnh / file anh gửi), kể cả phép thử và tài liệu — chỉ số đếm tổng. Phép thử dùng dữ liệu giả.
- Không ghi tên / mã mô hình AI vào commit, PR, mã nguồn.

## 5. Kỹ thuật app (tóm tắt — chi tiết `CLAUDE.md`, `docs/BAT_DAU.md`)
- `index.html` + `css/app.css` + `js/NN-*.js` (ES5, không build, không npm; thư viện chỉ theo danh mục anh duyệt). Mỗi bản đổi `?v=` cùng `APP_BAN` (`tools/bump.py`). Không phá chức năng đang chạy; dữ liệu cũ phải đọc được.
- Mỗi bản: `python3 tests/kiem.py` sạch + phép thử theo mức thay đổi (`tests/README.md`) + cập nhật tài liệu theo `CLAUDE.md`.
- Chỉ tài khoản đang làm app lên số bản; số bản / phân file giữa TK 2 ↔ TK 3: `docs/PHOI_HOP_TK2_TK3.md` mục 1–2.
