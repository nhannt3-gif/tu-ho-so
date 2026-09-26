# BÀN GIAO VIỆC CÒN LẠI — App Tủ hồ sơ (v1.6)

**Bản hiện tại:** 3.36 · build 27/09/2026 04:10
**Kho:** `nhannt3-gif/tu-ho-so` → `index.html` (một file HTML duy nhất)
**App đang chạy thật:** https://nhannt3-gif.github.io/tu-ho-so/
**Tài liệu kèm:** `docs/CHANGELOG.md` (đã làm gì) · `docs/REVIEW.md` (rà soát lỗi, rủi ro, tình trạng từng mục)

---

## 0. Ràng buộc bắt buộc (giữ nguyên từ v1.1)

1. Giữ kiến trúc **một file HTML**. Không tách file, không thêm thư viện, không build, không npm. Mở được bằng nhấp đúp khi không có mạng.
2. **Không phá** chức năng đang chạy.
3. **Không xóa dữ liệu** người dùng; không đổi cấu trúc `D` theo cách làm mất dữ liệu cũ. Trường mới phải chịu được khi chưa có.
4. Tên hàm, biến bằng tiếng Việt không dấu theo nếp cũ; chú thích bằng tiếng Việt.
5. **Sau mỗi lần sửa, chạy 3 phép kiểm:** `Cú pháp OK · Trùng tên: không · Thiếu hàm: không`.
   - ⚠ Phép "thiếu hàm" phải quét **mọi lời gọi hàm trong mã**, không chỉ `onclick=`. Bản cũ chỉ quét `onclick` nên bỏ sót lỗi `demDiaBan` (xem mục 3).
6. `grep` tên lớp CSS và tên hàm mới trước khi đặt.
7. Cập nhật `APP_BAN`, `APP_LUC` (hiện ở dòng 1575) mỗi bản.
8. Giao lại đúng tên `index.html`. Làm trên nhánh mới + Pull Request.
9. **Mới:** không đưa dữ liệu cá nhân (tên tổ trưởng, tên khách hàng…) vào mã nguồn — repo đang **công khai**.

---

## 1. Đã xong ở bản 3.31 → 3.36

Mục 1 → 11 của bàn giao v1.1 và toàn bộ đợt 0 (lỗi nền). Chi tiết ở `docs/CHANGELOG.md`.

**Quyết định đã chốt với anh Nhân:**
- Bỏ danh sách tổ khỏi mã nguồn, giữ cây xã → điểm → ấp; tổ trưởng anh nhập tay. Thay tổ trưởng thì giữ mã tổ, sửa tên.
- **Mục 2:** không sửa `dsDonVi('xa')`, vì hàm này còn dùng để nhận dạng phạm vi file. Chỉ đổi phần hiển thị và phần đếm của ma trận.
- **Mục 1:** dùng lại `D.cauHinh.capThang`, không tạo thêm `capMaTran`.
- **Mục 6:** "Dùng chung" là tag **suy từ nhóm** của biểu mẫu, không lưu thêm dữ liệu trùng.
- **Mục 5 + 6:** ghim và Dùng chung đều "đứng đầu" → thứ tự là nhóm 📌 Đã ghim, rồi Dùng chung, rồi các chương trình.
- **Mục 8:** thay hẳn nút Dọn cũ. Bản thừa vào thùng rác, không xóa hẳn.
- **Mục 9:** mở rộng `lienQuanHTML` có sẵn. Không có hàm `veChiTiet`.
- **Mục 7:** hàm cần sửa là `veCayDB` (cây địa bàn). `veCay` là mã chết.
- **3.32 — Ảnh CCCD không mã hóa.** Anh Nhân coi Drive của anh là nơi lưu bảo mật; PDF hồ sơ mặc định lên Drive.
- **3.32 — "Xóa hẳn" chuyển file vào thùng rác Google Drive,** không xóa vĩnh viễn.
- **3.32 — Nhiều máy cùng lúc:** ít khi dùng, nên việc đồng bộ gộp trước khi ghi để ưu tiên thấp.
- **Tên tổ trưởng ở các bản cũ trên GitHub:** anh chốt **để nguyên, không viết lại lịch sử**.
- **3.33 — Scan:**
  - Mỗi hồ sơ một PDF trên Drive, lưu lại là cập nhật đè, đổi địa bàn là dời file.
  - Xóa hồ sơ thì PDF vào thùng rác Drive.
  - Để trống địa bàn thì giữ trống, không tự điền lần trước.
- **3.34 — Báo cáo tự thiết lập:** mỗi báo cáo chỉnh bằng nút ⚙ (cấp, dạng bảng/một ô, chu kỳ, dòng Excel), không sửa code. Mã báo cáo không đổi trong hộp ⚙.
- **3.34 — SL_GB:** chỉ cấp điểm giao dịch; chuyển một lần (`slgbDaDoi`).
- **3.34 — Hàng lọc nhanh:** hiện ở mọi tab kể cả điện thoại (vuốt ngang), ẩn/hiện nhớ theo tab.
- **3.34 — File trùng:** không lưu bản sao; thêm từ ô ma trận thì cho chuyển mục cũ vào ô.
- **3.35 — Scan:** tự động trước (tìm khung, nắn, tự lật, nhận mặt, lọc Magic/Giấy trắng), còn sót thì chỉnh tay (4 góc có kính lúp, ⇅, ⇄, ◀ ▶). In CCCD 4 người × 2 mặt mỗi A4, thẻ 89 × 56 mm (to hơn thẻ thật), lề 12 mm, khe cắt đều 8 mm, có dấu cắt góc, xếp từ trên xuống — anh chốt không cần đúng cỡ thật. PDF trong tab Scan dời/xoay/bỏ/chèn trang, chép nguyên trang không đổi thành ảnh.
- **3.35 — Ảnh CCCD thật anh gửi** chỉ dùng để thử trong phiên làm việc, **không đưa vào repo**.
- **3.36 — Chế độ tối:** sổ ghi chú luôn giữ giấy vàng, không đổi theo máy.
- **3.32 — Giao diện:** mọi nút mới dùng khối CSS "CHUẨN HÓA NÚT & BỐ CỤC" ở cuối `<style>`, không tự đặt cỡ hay màu riêng.

---

## 2. Việc còn lại — chờ anh Nhân quyết

| # | Việc | Vì sao chưa làm |
|---|---|---|
| F | Đồng bộ nhiều máy ghi đè cả file — L8 | Anh ít dùng nhiều máy cùng lúc → ưu tiên thấp |
| G | Thư viện CDN không có SRI, bản cất không tự cập nhật — R5 | Nâng SheetJS, thêm SRI, cất theo phiên bản |
| H | Cảnh báo dữ liệu khách khi bấm 📋 Chép sang AI — R4 | Nhỏ, làm được ngay khi anh đồng ý |
| I | `soTu` đọc sai số viết kiểu Anh (1,234.5) khi cộng thử bảng Excel | Nhỏ |
| J | Tìm khung CCCD nhạt màu trên nền sáng bóng (bàn kính) còn lệch 71–91% → phải kéo góc tay | Cần thêm ảnh thật nhiều kiểu nền để dò tiếp trọng số `TS_THE` |
| K | PDF chụp scan không có chữ: ngày tự điền "hôm nay" khi thêm vào tab Văn bản | Đề xuất để trống ngày và nhắc dùng Chép sang AI — chờ anh duyệt |

## 3. Việc cần kiểm trên máy thật

Đã chạy thử bằng Chromium giả lập. Các phần sau **chưa thử được** trong môi trường giả lập:
- **Google Picker (mục 10):** cần API key thật — cách tạo và cách dùng xem mục 5. Với quyền `drive.file`, chưa chắc chọn **thư mục** thì app có đọc được file bên trong không. Nếu không đọc được, app đã báo và hướng dẫn chọn trực tiếp file.
- **Mở biểu mẫu bằng Google Docs** (`docs.google.com/document/d/<id>/edit?rtpof=true`) với file `.docx` trên Drive của anh.
- **Chép đường dẫn ổ G:** tên ổ đĩa đúng theo máy (Cài đặt › Google Drive › Thư mục Drive trên máy).
- **Cây địa bàn trên iPhone thật:** trên giả lập đo dưới 10 ms mỗi lần bấm.
- **Tab Scan 3.35 trên điện thoại thật:** tốc độ xử lý ảnh (giả lập 0,3–0,5 giây/ảnh), kéo góc bằng ngón tay, in thật xem thẻ rộng khoảng 89 mm, khe cắt đều 8 mm (nhớ chọn "Kích thước thật / 100%").

## 4. Cách kiểm thử đã dùng cho 3.31

- 3 phép kiểm mục 0.5 (bản quét mọi lời gọi hàm).
- Chromium không giao diện, chạy cả khổ máy tính và iPhone 13, trên máy trắng và máy có dữ liệu cũ (dữ liệu dạng 3.29):
  - Đi đủ 6 tab và 12 trang Cài đặt.
  - Thêm file vào từng tab: PDF văn bản thật, Excel tab Tháng, biểu mẫu, ảnh ghi chú, scan 2 mặt.
  - Xuất và nạp lại dự phòng.
  - Tái hiện lại từng lỗi đã sửa để xác nhận đã hết.
- Thư viện pdf.js 3.11.174, pdf-lib 1.17.1, SheetJS 0.18.5 lấy qua npm cùng phiên bản với CDN, định tuyến thay cdnjs khi chạy thử.
- Các kịch bản thử hiện nằm ngoài repo (cần Playwright). Nếu anh đồng ý, có thể đưa vào thư mục `tests/`; việc này không ảnh hưởng app.

## 5. Google Picker — quét kho Drive cũ (giải thích cho anh Nhân)

**Vì sao cần Picker:** app xin quyền hẹp `drive.file`, tức là **chỉ thấy file do chính app tạo ra hoặc file anh tự tay chọn cho app**. Kho cũ anh chép bằng tay vào ổ G thì app không nhìn thấy. Picker là cửa sổ chọn file của chính Google: anh chọn file nào, Google cấp cho app quyền **với đúng file đó**, không cấp gì thêm.

**Vì sao không xin quyền đọc toàn bộ Drive:** quyền đó (`drive.readonly`/`drive`) bị Google xếp loại nhạy cảm, phải qua Google thẩm định app mới dùng được cho người ngoài dự án, và mở cho app đọc mọi thứ trong Drive. Picker an toàn hơn và không cần thẩm định.

**Cần chuẩn bị một lần (anh tự làm trong Google Cloud, cùng dự án với Client ID đang dùng):**
1. APIs & Services › Library › bật **Google Picker API**.
2. APIs & Services › Credentials › Create credentials › **API key**.
3. Giới hạn key: Application restrictions = Websites, chỉ cho `https://nhannt3-gif.github.io/*`; API restrictions = chỉ Google Picker API.
4. Dán key vào app: Cài đặt › Google Drive › ô "API key của Google Picker". Key chỉ lưu trong máy, không đồng bộ lên Drive.

**Cách dùng:** Cài đặt › Google Drive › **Chọn thư mục / file cũ trên Drive…** → cửa sổ Google hiện ra → chọn → app tải từng file về đọc (số hiệu, ngày, trích yếu, loại báo cáo) → đưa cả xấp vào **khay chờ** → anh xem tên đề xuất, sửa nếu cần, bấm **Duyệt** → lúc đó app mới đổi tên và dời file vào đúng thư mục trong Tủ hồ sơ. Bấm "Bỏ" thì file gốc không bị đụng tới.

**Giới hạn cần biết:**
- **Chọn thư mục:** theo tài liệu Google, quyền `drive.file` cấp cho mục được chọn; với thư mục, **chưa chắc** app đọc được các file bên trong. Nếu không đọc được, app báo và anh chọn thẳng các file (giữ Ctrl hoặc Shift để chọn nhiều, có thể chọn cả trăm file một lần). Việc này phải thử trên Drive thật mới chắc.
- **File Google Docs/Sheets gốc** (không phải .docx/.xlsx) chưa đọc được → app bỏ qua và báo số lượng.
- **File trùng nội dung** với file đã có trong tủ → app bỏ qua và báo số lượng.
- Mỗi file phải tải về máy để đọc (tốn mạng như mở file). Đọc xong app chỉ giữ bản sao để xem nhanh.
