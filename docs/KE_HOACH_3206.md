# Kế hoạch 3.206 — cây địa bàn thống nhất · Giấy lĩnh Phiếu mới · Hồ sơ vay theo tab · 09A/TD ô chấm tùy biến + in kèm Mẫu 06/TD

> Anh chốt 14/10/2026 (tối). Anh: **"gom các đợt làm 1 lần và ghi vào bàn giao — mai hết token tuần, tài khoản chính sẽ tiếp tục"** → làm chung 1 bản 3.206, **xong phần nào commit phần đó + đánh dấu ☑ ở mục 5**. Phiên sau đọc file này là làm tiếp được.
> Luật: `docs/QUY_CHUAN_KIEN_TRUC.md` (KTGS khóa mẫu — mục 1b.5). Quy tắc soạn mẫu: `docs/QUY_TAC_SOAN_MAU.md`.

## 1. Cây địa bàn — thống nhất mọi tab (Tổ · Sao kê · Hồ sơ · KTGS · Giao dịch xã)
- Hàm chung `pvVeCay(p)` (`js/22-so-lieu.js`, ~dòng 4905). Hiện chỉ tab Giao dịch xã (`d.gonDiem`) có thu gọn, nút **"▾ Đổi"** (anh: khó hiểu).
- **Anh chốt:** nút **"▾ Mở rộng" / "▴ Thu gọn"**; gọn còn **1 dòng**: `🏠 PGD › Xã › Điểm › Tổ   [▾ Mở rộng]   🔎`.
- **Về cấp cao hơn:** mỗi mắt của đường dẫn bấm được (🏠 PGD = toàn PGD, Xã = cả xã, Điểm = cả điểm) — kiểu nút Home. (Đề xuất thêm: Backspace lùi 1 cấp khi không gõ trong ô nhập.)
- Nhớ gọn / mở **theo từng tab** (`PV_MO[p]`, có thể lưu `D.cauHinh.pvGon[p]`). Chọn xong tổ → tự gọn (như GDX hiện nay).
- Không đổi cách chọn / số liệu — chỉ giao diện khối lọc.

## 2. Giấy lĩnh — nút "↺ Phiếu mới" thay "✕ Làm trống"
- `js/26-giao-dich-xa.js` dòng ~558 (nút), `gdxGLMoi()`, `gdxGLLamTrong()`; mini app `js/27-mini-gdx.js` dòng ~231 (`mn.lamTrong`).
- Anh chốt: **giữ nút, đổi tên "↺ Phiếu mới"** (cùng chức năng Làm trống hiện có: bỏ người lĩnh / form / số tiền, bỏ chọn tổ, giữ ngày, khổ, loại TK). Kèm: chọn tổ / người khác là phiếu tự thay; in xong con trỏ về ô tìm.

## 3. Tab Hồ sơ vay — bố cục như tab Giao dịch xã
- `js/25-ho-so.js` (`HSO_MAU.hsv`: Bộ HS · 01/UQ · 01/TD · 03/TD · 01/TGTV · 09A/TD).
- **Mỗi biểu mẫu = 1 tab con** (thanh tab trên cùng thay danh sách chọn mẫu); cây địa bàn 1 dòng; khai báo trái, xem trước phải (40%) như GDX; nút In / Word cùng chỗ GDX.
- **Số liệu theo ngày số liệu đã chọn** (kỳ / ngày chung — như tab Tổ; phiếu ghi "số liệu ngày …").

## 4. 09A/TD — ô chấm tùy biến + in kèm Mẫu 06/TD
**Nguyên tắc anh chốt (cách chung cho mọi mẫu):** đơn đi qua nhiều cấp xác nhận / phê duyệt → **không đánh máy hết**; chỉ thông tin ban đầu in sẵn. **Số liệu cố định (tên, nhân thân, món vay, tổ, Hội) không cho tùy biến.** Mỗi **ô chấm** của mẫu có công tắc **[Chấm viết tay | In sẵn]**; app nhớ lựa chọn theo mẫu (cài đặt, đồng bộ Drive). Thêm ô cho mẫu khác = khai báo 1 dòng. **Không làm tính toán / cảnh báo nâng cao** (anh: "mẫu này chỉ cần vậy").

Ô của 09A:
| Ô | In sẵn = |
|---|---|
| Lý do chưa trả | chọn từ danh sách — **mặc định sẵn 1 dòng "Đang gặp khó khăn về kinh tế, tài chính"**, anh thêm được — hoặc gõ |
| Số tiền đề nghị gia hạn | mặc định = dư nợ món, sửa được |
| Thời gian đề nghị (tháng) | gõ số |
| Kế hoạch trả nợ (tháng/kỳ, tiền/kỳ, kỳ cuối) | gõ |
| Ngày tháng chỗ người vay ký | hôm nay / gõ ngày |
| Ý kiến Hội · Xác nhận UBND · Phê duyệt NH | **luôn chấm** (các cấp ghi tay) |

**In kèm Mẫu 06/TD** (bên Hồ sơ vay gọi **"Mẫu 06/TD"**; bên KTGS vẫn gọi "Mẫu 06 KTGS"):
- Hộp in 09A có ô **"☐ In kèm Mẫu 06/TD (phiếu kiểm tra)"** — áp In và Word.
- **Điền sẵn thông tin hộ vay (món đang gia hạn) + Hội quản lý; chỗ cán bộ kiểm tra để trống (chấm).**
- **Cột mục đích:** công tắc **[In sẵn (theo Mẫu 31) | Để trống ghi tay]**, app nhớ.
- **Luật khóa KTGS:** KHÔNG chép / sửa mẫu — chỉ thêm **1 cửa gọi** vào đúng hàm KTGS dựng Mẫu 06 cho 1 hộ (`ktGiaTri06`, `ktCB06`, `KT_KHUON.m06`, `ktXuat`…), truyền lựa chọn "mục đích trống" + cán bộ trống. Bản in Mẫu 06 bên KTGS phải **giữ nguyên** → chạy lại phép thử KTGS (t97 / t99 / t104 / t105 / t111 …) trước – sau.

## 5. Trạng thái (cập nhật mỗi lần commit)
- ☑ 1. Cây địa bàn thống nhất (5 tab, Mở rộng / Thu gọn, đường dẫn bấm về cấp trên)  — `pvGonCua` / `pvGonDoi` (D.cauHinh.pvGon[p]), mắt đường dẫn `.pv-ve`; t168 sửa chữ Đổi → Mở rộng
- ☐ 2. Giấy lĩnh "↺ Phiếu mới" (app + mini app)
- ☐ 3. Hồ sơ vay: tab con mỗi mẫu + bố cục GDX + số liệu theo ngày đã chọn
- ☐ 4a. 09A ô chấm tùy biến (+ danh sách lý do)
- ☐ 4b. In kèm Mẫu 06/TD (cửa gọi KTGS, mục đích in sẵn / trống, cán bộ trống)
- ☐ 5. Phép thử mới `t170` + hồi quy + bump 3.206 + CHANGELOG / bàn giao / BAT_DAU + PR

## 6. Sau 3.206 (chưa làm — chờ anh)
- Nút "09A" từ chip Đến hạn tháng sau / Sao kê nợ đến hạn; in nhiều hộ; lưu vết món đã lập 09A.
- Áp "ô chấm tùy biến" cho các mẫu Hồ sơ vay khác (01/TD, 01/UQ, 03/TD, 01/TGTV) → gom phần chung về khai báo chung tab.
- Lộ trình kiến trúc `docs/KE_HOACH_B_C.md` mục 4 (3.207+ IndexedDB theo ngăn …) lùi sau.
