# CHANGELOG — Tủ hồ sơ

Ghi theo từng bản. Chi tiết lỗi/rủi ro và mã số (L1, R1, N1…) xem `docs/REVIEW.md`.

---

## 3.33 — 26/09/2026 22:42 — hoàn thiện tab Scan

- **Mỗi hồ sơ một file PDF trên Drive, đúng thư mục:**
  - `Tủ hồ sơ/CCCD/xã/điểm/ấp/tổ` cho bản thẻ.
  - `Tủ hồ sơ/Hồ sơ scan/…` cho bản tài liệu (mới).
- **Lưu lại hồ sơ đã sửa → cập nhật đè đúng file cũ trên Drive**, không sinh file trùng như trước. Đổi địa bàn thì file tự dời sang thư mục mới. File trên Drive đã bị xóa tay thì app tải lên file mới.
  - Hàm mới: `dayHoSoLenDrive`, `dayScanNhieu`, `taoPDFScan`, `duongScan`, `tenScanDrive`.
- **Bản Tài liệu (đơn vay, biên bản…):**
  - Bấm "Lên Drive" nay lên Drive thật (trước chỉ lưu ra máy).
  - Lưu bản tài liệu cũng tự đưa lên Drive như bản thẻ.
- **Chọn nhiều bản → Lên Drive:** từng bản vào đúng thư mục của mình. Trước đây gộp chung một file `_Nhieu-khach`.
- **Khai hàng loạt xong:** các bản vừa khai tự lên Drive.
- **Xóa hồ sơ:** bản PDF trên Drive vào thùng rác Google Drive (trước đây vẫn nằm lại trên Drive).
- **Lưu mà để trống xã/ấp/tổ thì giữ trống**, không tự điền địa bàn lần trước nữa (dễ gắn sai khách). Hộp khai vẫn điền sẵn lần trước để anh sửa. Điểm giao dịch vẫn tự suy ra từ ấp.
- **"Lưu tạm"** chờ chép ảnh xong mới lưu và báo; trước đây tắt app ngay lúc đó có thể mất ảnh.
- **Hộp xem hồ sơ:**
  - Bản Tài liệu hiện đủ các trang (trước đây để trống).
  - Có dòng "Trên Drive: …", nút "☁ Mở trên Drive" và "Cập nhật Drive".
  - Nút Sửa mở đúng hộp khai tài liệu.
- **Giao diện tab Scan:**
  - Khung vàng cảnh báo đổi thành lời nhắc nhỏ.
  - Bỏ nhãn "CCCD" lặp; chỉ báo "thiếu mặt sau" khi thiếu; thêm "chưa lên Drive".
  - Dải đáy hiện trạng thái Drive như các tab khác.

---

## 3.32 — 26/09/2026 22:17

Theo góp ý của anh Nhân sau khi xem 3.31.

### Nhận dạng công văn và báo cáo
- **Công văn không còn bị nhận nhầm thành báo cáo tháng.** Trước đây công văn nhắc tới "Tổ TK&VV", "nợ quá hạn", "giao ban"… đều bị coi là báo cáo. Nay app xét hai loại dấu hiệu **trước** khi so từ khóa:
  - Dấu hiệu văn bản hành chính: quốc hiệu, tiêu ngữ, `Số: …/…`, V/v, Kính gửi, Nơi nhận, tên loại văn bản.
  - Dấu hiệu bảng số liệu: STT, Đơn vị tính, Tổng cộng, Người lập biểu, "đến ngày", nhiều số tiền.
  - Hàm: `diemVanBan`, `diemBangSoLieu`, `khopMauNoiDung`.
- **Quét Drive theo tên file:** tên có số hiệu văn bản (958 KH-NHCS, 4079/NHCS-TDNN) thì là văn bản (`khopMauTenQuet`).
- **Chọn mẫu báo cáo khớp nhất,** không lấy mẫu đứng đầu danh sách nữa. Thứ tự ưu tiên: từ khóa ở tiêu đề → khớp nhiều từ khóa hơn → xuất hiện sớm hơn → từ khóa dài hơn. Sửa được 2 lỗi cũ:
  - "Chất lượng Tổ" có cột nợ quá hạn bị nhận thành Nợ quá hạn.
  - "KQGD toàn phòng" bị nhận thành KQGD xã.
- `rutNgay` đọc được ngày viết không dấu ("ngay 11 thang 9 nam 2026").

### Ảnh CCCD — bỏ mã hóa
- Ảnh mới lưu thẳng, không mã hóa. Bản PDF hồ sơ mặc định đưa lên Drive (`hsTuDrive` mặc định bật).
- Ảnh cũ đã mã hóa vẫn mở được bằng khóa cũ. Mở lần đầu, ảnh tự lưu lại dạng thường.
- Bỏ hộp cảnh báo "không mã hóa" khi lưu hoặc đưa PDF lên Drive.
- Bỏ mã PIN và các hàm mã hóa không còn dùng.

### Xóa hẳn → thùng rác Google Drive
- "Xóa hẳn", "Dọn dữ liệu thử", xóa thư mục trống và dọn bản dự phòng cũ nay đều **chuyển file vào thùng rác Google Drive** (`trashed:true`), không xóa vĩnh viễn nữa.
- Google giữ file 30 ngày rồi tự xóa; trong thời gian đó vẫn lấy lại được.
- Sửa mọi lời nhắc trong app cho đúng.

### Giao diện
- **Chuẩn hóa nút** (một khối CSS cuối phần giao diện):
  - Nút thanh công cụ cao 34px, bo góc 10px, viền 1.3px, chữ 12.5px đậm.
  - Màu: thường · đang bật · nút chính · nguy hiểm dùng chung một bộ.
- **Tab Văn bản:** dải chờ khai, hàng nút, hàng lọc xếp dọc. Trước đây chen chung một hàng và chữ "Tag" đè lên nút.
- **Dòng danh sách:**
  - Bỏ ngày/kỳ nếu tên file đã có; bỏ nhãn "Drive" trên mọi dòng.
  - Gộp các cảnh báo thiếu phân loại thành một nhãn "⚠ Thiếu …"; nhãn "Chỉ mục" đổi thành "Chưa tải về máy".
- **Thẻ biểu mẫu:** bỏ nhãn "ghim", tên nhóm, "Mẫu trắng" vì đã thể hiện ở chỗ khác; thêm nhãn "chưa lên Drive".
- **Tab Hôm nay:** thẻ "còn thiếu báo cáo" tối đa 3 dòng.
- **Tab Tháng:** bỏ nút "Ghép để xem" bị lặp ở dải đáy.
- **Điện thoại:** ẩn đồng hồ để nút ⚙ không rớt xuống dòng riêng; thanh Sắp xếp gọn thành một hàng vuốt ngang.

---

## 3.31 — 26/09/2026 21:54

Làm theo `BAN_GIAO_VIEC_CON_LAI v1.1`: đợt 0 (lỗi nền) + mục 1–11. Giữ nguyên kiến trúc một file `index.html`, không thêm thư viện, không đổi cấu trúc `D`. Chỉ thêm trường mới; code vẫn chạy được khi dữ liệu cũ chưa có các trường này.

### Dữ liệu cá nhân
- Bỏ danh sách **378 tổ** (mã tổ, tên tổ trưởng) khỏi mã nguồn công khai. Giữ cây xã → điểm giao dịch → ấp.
  - Máy đang có dữ liệu tổ **giữ nguyên**.
  - Máy mới: nhập tay ở Cài đặt › Địa bàn › Sửa danh sách tổ, hoặc Lấy từ Drive.
- Chữ mẫu xem phông: thay họ tên cụ thể bằng "Nguyễn Văn A".

### Đợt 0 — lỗi nền
- **Cài đặt › Địa bàn, Nạp Excel, Nạp JSON, Lấy cài đặt từ Drive**: viết lại hàm `demDiaBan()` bị mất.
- **Mẫu báo cáo giữ cờ** (`theoNgay`, `thuanXLS`, `coExcel`, `gopPGD`, `an`…) khi Lưu cài đặt tab Dữ liệu tháng hoặc Nạp Excel (`gopMauBaoCao`).
- `nangCapDanhMuc` (từ 3.30):
  - Không thêm lại báo cáo anh đã bỏ (ghi nhớ trong `D.cauHinh.maDaBo`).
  - Điền lại cờ còn trống cho máy đã mất cờ.
- Thả file vào ô kéo thả: chỉ xử lý **1 lần** (trước đây mỗi file vào khay 2 lần).
- **File Excel/CSV thêm từ ô ma trận hoặc tab Tháng:**
  - Vào đúng nhóm **Dữ liệu tháng**; nhận loại, kỳ, đơn vị từ tên file (kể cả tên dạng `NQH_Phuong_Gia_Loc_2026_09.xlsx`).
  - Duyệt xong quay về tab Tháng, ma trận nhảy đúng kỳ, báo "Đã lưu vào ô …".
  - Ô ma trận nay áp cho mọi loại file, không còn gán nhầm sang file PDF thêm sau đó.
- Duyệt **ghi chú** về tab Ghi chú (trước nhảy sang Biểu mẫu).
- Sổ ghi chép: nút **Thêm** chạy; **Enter giữa danh sách** thêm dòng; chấm trên lịch cập nhật ngay khi gõ.
- **Nhờ AI:**
  - Cột nghiệp vụ ghi vào **Mảng** (trước ghi vào Tag).
  - Cập nhật Tên văn bản; tên file trên Drive đổi theo.
  - Nút Đóng mở đúng trang.
- **Dán kết quả AI:** ghép theo số hiệu đầy đủ. Chỉ khớp phần số thì mặc định "Giữ app" và có cảnh báo.
- **Nạp dự phòng:** nạp đủ Lịch, sổ ghi chép, Biểu mẫu, Scan, Thùng rác. Vẫn là gộp, không xóa gì của máy.
- **Quét Drive / Nạp khay chờ:**
  - Đọc đủ mọi trang kết quả (trước bỏ sót khi thư mục có trên 200 file).
  - Không gắn nhầm file khi có file trùng.
- Đọc PDF lỗi một trang không làm treo cả file.
- Bản scan đã xóa không "sống lại" khi đồng bộ từ máy khác.
- "Duyệt tất cả" không đổi tên file Drive 2 lần.
- Chọn lẫn bản Thẻ và bản Tài liệu thì báo rõ, không lặng lẽ bỏ qua.
- **Lịch âm:** 29 tháng Chạp chỉ ghi Giao thừa khi tháng thiếu.
- **Nội dung:**
  - "63 tỉnh" → 34 tỉnh (từ 01/7/2025).
  - Hướng dẫn Xóa an toàn nói đúng việc Xóa hẳn.
  - Hướng dẫn khay `_Chờ xử lý` nói đúng giới hạn quyền của Google.
- **Thanh tab:** mở Biểu mẫu tô sáng đúng nút (trước tô nhầm Ghi chú).

### Mục 1–3: Ma trận tab Tháng
- 3 nút **Toàn PGD · Xã, phường · Điểm giao dịch** thay cho 3 nút kiểu xem bị trùng. Dùng lại `D.cauHinh.capThang`.
- **Địa bàn quản lý** `D.cauHinh.xaQuanLy`:
  - Mặc định Phường Gia Lộc và Xã Truông Mít.
  - Tick chọn ở Cài đặt › Địa bàn.
  - Ma trận mặc định chỉ hiện các xã này. Nút 👁 vẫn bật thêm xã khác được.
- **Chỉ đếm thiếu** cho PGD và xã quản lý, đúng **cấp áp dụng** của từng báo cáo. Ô không tính thiếu hiện dấu chấm mờ.
- **Dòng tổng ghi rõ** đơn vị nào thiếu gì, ví dụ "PGD: … · Gia Lộc: …". Dài thì rút gọn, bấm "xem đủ".
- Thẻ "còn thiếu báo cáo" ở tab Hôm nay dùng chung quy tắc này, số liệu khớp với ma trận.

### Mục 4–6: Bộ lọc, tab Biểu mẫu
- **Hàng lọc hiện sẵn:**
  - Biểu mẫu: Chương trình + Tag.
  - Văn bản: chỉ Tag.
  - Màn hình dưới 900px: thu vào nút Bộ lọc.
- **Lọc chương trình vay ở tab Biểu mẫu:**
  - Lọc theo nhóm của mẫu (trước luôn ra rỗng).
  - Lọc một chương trình thì kèm luôn nhóm Dùng chung.
- **Tag ở tab Biểu mẫu:**
  - 3 tag tự suy: **Dùng chung**, Mẫu trắng, Mẫu hướng dẫn.
  - Hộp sửa biểu mẫu có ô chọn tag.
- **Sắp xếp ở tab Biểu mẫu:**
  - Chạy theo thanh Sắp xếp; thêm cột **Số lần dùng**, **Năm VB gốc**.
  - Mặc định vẫn sắp theo số lần dùng như trước.
- **Thứ tự nhóm:** 📌 Đã ghim trên cùng → Dùng chung → các chương trình. Mỗi nhóm ghi số mẫu.

### Biểu mẫu Word — mở không phải tải về
- Thêm biểu mẫu là đặt tên chuẩn và tự đưa lên Drive vào `Tủ hồ sơ/Biểu mẫu/<nhóm>` (khi đã nối Drive).
- Nút **W** mở hộp chọn: **Google Docs/Sheets** (mặc định) · **chép đường dẫn ổ G** để mở bằng Word trên máy · Tải về (có cảnh báo tạo file).
- Nút **G**: mục chưa có trên Drive thì đưa lên rồi mở.

### Mục 7–9
- **Cây địa bàn:**
  - Mở/đóng chỉ bật tắt đúng nhánh, không dựng lại cả cây (đo dưới 10 ms với 378 tổ).
  - Mở một xã không còn bung hết các cấp con.
- **Gom file trùng theo dấu vân** (Cài đặt › Dữ liệu app, và nút Dọn ở Lập chỉ mục):
  - Anh chọn bản giữ; bản thừa vào Thùng rác.
  - Có nút Hoàn tác. Thay cho nút Dọn cũ (trước xóa thẳng khỏi chỉ mục).
- **Chuỗi hiệu lực** trong hộp xem văn bản:
  - Sơ đồ VB gốc → sửa đổi → thay thế, bấm mở được từng văn bản.
  - Văn bản hết hiệu lực có dải đỏ ở đầu.

### Mục 10–11
- **Google Picker** (Cài đặt › Google Drive, cần API key):
  - Chọn thư mục/file kho cũ → đọc nội dung → khay chờ.
  - Chỉ đổi tên, dời file khi anh bấm Duyệt.
- **Chốt kỳ** trên ma trận. Thêm hoặc duyệt file vào kỳ đã chốt phải xác nhận.
- **So 2 kỳ:**
  - Chọn kỳ tự do, hoặc bấm nhanh: so tháng trước, so đầu quý (tháng cuối quý trước), so đầu năm (T12 năm trước).
  - Chép 2 bảng Excel dạng Markdown kèm câu hỏi sang AI.
- **Nhắc giao ban** ở tab Hôm nay: trong 7 ngày tới có việc lịch chứa chữ "giao ban" mà còn thiếu báo cáo.

### Trường dữ liệu mới
Trong `D.cauHinh`: `xaQuanLy`, `xqlDaAp`, `maDaBo`, `kyChot`, `apiKey`, `tagDCDaAp`.
- Tất cả đều có giá trị mặc định khi chưa có.
- `xaQuanLy`, `maDaBo`, `boMau` đồng bộ qua `cauhinh.json`.
- `apiKey` chỉ lưu trong máy.

---

## 3.30 — 26/09/2026 20:58
- Nút "+ Thêm file" kiểu mới; danh sách Chờ khai ghi kho đích (`tenKho`).
- `nangCapDanhMuc()` bổ sung mẫu báo cáo mới vào danh mục đã lưu. Có lỗi N1, sửa ở 3.31.
