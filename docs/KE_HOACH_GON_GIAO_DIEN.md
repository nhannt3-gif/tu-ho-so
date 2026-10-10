# KẾ HOẠCH — Gọn giao diện + thống nhất In / Xuất / Gửi / Xóa (đang gom ý, anh gửi đủ mới làm 1 lần)

> Mở 10/10/2026 sau 3.147. Anh: "còn ý tiếp xong mới làm 1 lần". Mỗi ý anh gửi ghi vào đây; khi đủ → ảnh mẫu → anh duyệt → "code".

## Ý 1 — Tab 📥 Nạp & KT rối (anh gửi ảnh 10/10)
**Trùng / thừa (đo trên ảnh):**
- Chọn tháng ở 3 chỗ: Kỳ số liệu ‹ ›, Kiểm tra kỳ ‹ Chọn tháng ›, tiêu đề cột.
- "Thiếu: …" in 2 lần: khung ① và hộp Chưa Đạt.
- Trạng thái kiểm ở 5 chỗ: pill ②, 4 ô bước, hộp vàng, 3 chip báo cáo, dòng "kết quả cũ".
- **Lỗi:** tháng chưa có file vẫn báo "dữ liệu đổi — kiểm lại".
- Nút rải: Tải gốc cả tháng · Xóa cả bộ tháng · Làm sạch & nạp lại · Giữ sẵn · Xóa ngày cũ · cũ hơn / mới hơn.
- Chữ phụ: dòng giải thích đầu tab, chú thích ma trận, "Sẵn dùng: …", "đã lên Drive".
- Ma trận chỉ dùng nửa trái màn hình.

**Đề xuất:**
- **1 hàng công cụ:** ‹ Tháng › · 📥 Nạp file · 📋 File cần xuất · ☁ · ⋯ (Tải gốc cả tháng, Xóa cả bộ tháng, Xóa ngày cũ, Làm sạch & nạp lại, Giữ sẵn) · ❓ (giải thích + chú thích).
- **1 dòng trạng thái**, chỉ 1 cảnh báo theo ưu tiên: thiếu file → cần kiểm lại → ✅ Đạt (link "N chênh lệch ghi nhận" mở hộp chi tiết). Kèm nút 🔍 Kiểm tra kỳ.
- **Bỏ:** khung ①, 4 ô bước, chip báo cáo (đưa vào chữ khi rê chuột).
- **Ma trận trọn chiều ngang;** ‹ › ở hàng tiêu đề; nhóm Ⓓ và khối KTGS gập sẵn.

## Ý 2 — In / PDF / Xuất file để gửi: 1 kiểu cho mọi tab (Văn bản, Scan, Biểu mẫu, Số liệu…)
**Hiện nay mỗi tab một kiểu:**
- **Văn bản:** khung xem có Gửi cả file · In · Sửa; menu ⋯ có Gửi cả file.
- **Scan:** PDF hàng chờ, ghép in, chia sẻ PDF / ảnh.
- **Biểu mẫu:** Gửi nhiều, Chọn bộ gửi.
- **Số liệu:**
  - Tổ: In bảng · Excel.
  - Sao kê, Tổng hợp: In · Excel.
  - KTGS: In / PDF · Word · Xuất.
  - Phiếu nợ: In · Word.
- Tên nút, chỗ đặt, tên file khác nhau. Có khoảng 8 chỗ tự gọi chia sẻ (`navigator.share`) riêng.

**Đề xuất "📤 Xuất" chung (1 hàm, 1 hộp):**
- **Cùng bộ nút, cùng thứ tự, cùng biểu tượng:** 🖨 In · 📄 PDF · 📊 Excel · 📝 Word · 📤 Gửi · ⬇ Tải về. Màn nào không có định dạng thì ẩn nút đó.
- **Chỗ đặt:** luôn ở góc phải hàng công cụ (hoặc dưới khung xem).
- **Chọn nhiều → gửi 1 lần.**
- **Tên file theo 1 quy tắc:** `Loại_Phạm vi_Kỳ` (theo mẫu tên PDF gửi Hội 3.140, vd `M06_TruongMit_HND_T10-26`). Ngày xuất ghi trong file, không ghi lên tên.
- **Trang in chung:**
  - A4 (báo cáo ngang khi rộng), lề 2/2/3/2 cm.
  - Góc trái "PGD NHCSXH GÒ DẦU", có số trang.
- **Gửi:**
  - Điện thoại: bảng chia sẻ của máy (Zalo…).
  - Máy tính: tải file về + báo tên file / thư mục.

## Ý 3 — Quy tắc xóa: 1 kiểu cho mọi tab
**Hiện nay:**
- **Văn bản / Biểu mẫu / Scan / khách:** vào Thùng rác app (ngăn theo tab), có Hoàn tác.
- **Thùng rác app:** "Xóa hẳn" → file Drive vào thùng rác Google Drive (30 ngày); có tùy chọn tự xóa hẳn rác > 30 ngày.
- **Số liệu (ô / cả bộ tháng / ngày cũ):** hỏi → xóa thẳng; file Drive vào thùng rác Google Drive; **không qua thùng rác app**. Riêng thay file có ↩ hoàn tác.
- **Mẩu ghi chú, việc lịch, lần làm việc, kế hoạch KTGS, bộ biểu mẫu:** hỏi → xóa luôn, không thùng rác.

**Quy tắc chung (anh chốt 10/10: không cần thanh Hoàn tác 10 giây — cần thì vào Thùng rác khôi phục):**
1. Nút luôn là **🗑 Xóa**.
2. Xóa 1 mục: không hỏi, vào **Thùng rác app** (ngăn theo tab, thêm ngăn **Số liệu**). Không hiện thanh Hoàn tác; muốn lấy lại thì vào 🗑 Thùng rác → Khôi phục (về đúng chỗ cũ).
3. Xóa nhiều mục / cả tháng: hỏi 1 lần, ghi rõ số mục.
4. Thùng rác app giữ 30 ngày rồi tự xóa hẳn. Xóa hẳn = file Drive vào thùng rác Google Drive (thêm 30 ngày lấy lại được).
5. Mục nhỏ không có file (việc lịch, mẩu ghi chú, lần làm việc, kế hoạch KTGS, bộ biểu mẫu) cũng vào Thùng rác app (ngăn riêng) → khôi phục được như file.
6. Máy khác xóa theo (dấu `daXoaHan` / `SLM.xoa` như hiện nay).
7. Bỏ thanh "↩ Hoàn tác" hiện có (`baoHoanTac` khi xóa).
   - Riêng **↩ Hoàn tác lần thay file** ở ô Số liệu (3.145) không phải thanh 10 giây.
   - **Anh chốt 10/10 "thống nhất quy tắc xóa":** bỏ nút này; ô Số liệu bị xóa và bản cũ khi thay file đều vào Thùng rác app ngăn Số liệu, khôi phục từ đó.

## Ý 4 — Mọi mẫu / báo cáo cùng 1 luồng (anh gửi 10/10)
**Luồng chuẩn:** bấm mẫu / báo cáo → **👁 Xem** (khung xem chung, khổ giấy thật) → hàng nút cố định trên khung xem, cùng thứ tự:
`🖨 In · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi` (anh chốt 10/10: **Copy gộp vào nút Gửi**). Báo cáo nào không có định dạng thì ẩn nút đó, không đổi chỗ các nút còn lại.
- **🖨 In:** hộp in của máy, khổ / lề theo mẫu.
- **📄 PDF:** ra file PDF có **tên điền sẵn** (`Loại_Phạm vi_Kỳ`).
  - Máy tính: mở hộp in, chọn sẵn "Lưu dưới dạng PDF".
  - Điện thoại: bảng chia sẻ → PDF.
  - Không thêm thư viện được nên không tự tạo PDF chữ tiếng Việt (pdf-lib thiếu bộ font) — xem câu hỏi bên dưới.
- **📝 Word / 📊 Excel:** như các mẫu đang có (KTGS có Word; Tổ, Sao kê, Tổng hợp có Excel). Báo cáo bảng nào cũng có Excel.
- **📋 Copy (anh chốt 10/10: copy chính FILE đó để dán nhanh vào Zalo / nơi khác):**
  - **Giới hạn trình duyệt:** chỉ cho chép chữ và **ảnh** vào bộ nhớ tạm, không chép được file PDF / Word / Excel nguyên file.
  - Vì vậy Copy = chép **ảnh của file**:
    - Ảnh / scan: chép ảnh gốc.
    - PDF / văn bản: chép ảnh trang (trang đang xem hoặc ghép các trang, giới hạn số trang để ảnh không quá lớn).
    - Báo cáo của app: vẽ trang báo cáo thành ảnh rồi chép. Cách này phải **thử trước** (vẽ HTML ra ảnh không thêm thư viện); không được thì chép chữ / bảng.
  - Dán vào Zalo (máy tính, điện thoại) = gửi ảnh.
  - Cần gửi **nguyên file** (PDF / Word / Excel) thì dùng **📤 Gửi**:
    - Điện thoại: bảng chia sẻ gửi thẳng file vào Zalo.
    - Máy tính: tải file về rồi kéo vào Zalo.
- **📤 Gửi (gộp cả Copy):** bấm → hiện hộp nhỏ, chọn 1 trong:
  - **📤 Gửi file:** nguyên file PDF / Word / Excel / ảnh.
    - Điện thoại: bảng chia sẻ (Zalo…).
    - Máy tính: tải file về để kéo vào Zalo.
  - **📋 Copy ảnh:** chép ảnh của file / trang báo cáo → dán thẳng vào Zalo. Trình duyệt không cho chép nguyên file nên chép ảnh.
  - **📋 Copy chữ** (báo cáo dạng bảng): dán Zalo ra chữ gọn, dán Excel ra bảng.
  - Chọn nhiều file → Gửi 1 lần.

**Áp cho:**
- **Tổng hợp:** 9 báo cáo.
- **Sao kê:** các nhóm.
- **Tổ TK&VV:** danh sách tổ viên, bảng các tổ, biến động năm, dự kiến chia tách.
- **Tra cứu KH:** thẻ khách.
- **KTGS:** Mẫu 06, 16, 04, Kế hoạch 01/KH.
- **Phiếu theo dõi nợ.**
- **Công cụ:** HSSV (câu chốt), Địa bàn, CT vay.
- **Văn bản / Biểu mẫu / Scan** (file có sẵn): Xem · In · PDF · Copy (số hiệu + trích yếu) · Gửi · Tải về.

**Cách làm:**
- Mỗi báo cáo khai 1 lần gồm: tiêu đề, phạm vi, kỳ, bảng `{cột, dòng, cộng}` hoặc HTML, khổ giấy.
- 1 hàm chung `xuatMo(bc)` vẽ khung xem + hàng nút. In / PDF / Excel / Copy dùng chung, không mỗi báo cáo một kiểu.
- Đây chính là "bộ báo cáo chung" của đợt D (KIEN_TRUC_3_LOP.md mục 8) — làm sớm phần này.

## Đã chốt 10/10 ("theo đề xuất")
- **Gửi trên máy tính:** tải file về + báo tên file. Không mở Zalo PC.
- **📄 PDF:** cách (a) — hộp in "Lưu dưới dạng PDF" + tên file điền sẵn (chữ rõ, chọn / tìm được chữ).

## Ý 5 — Copy văn bản để dán cho AI đọc (anh còn cân nhắc)
**Đề xuất:** thêm lựa chọn **🤖 Copy cho AI** trong hộp 📤 Gửi của Văn bản / Biểu mẫu / Scan, chép **chữ** của file kèm đầu mục:
- Đầu mục: số hiệu · ngày · cơ quan · trích yếu (từ chỉ mục).
- Nội dung:
  - PDF có chữ: lấy chữ bằng pdf.js (app đã dùng `getTextContent`).
  - Word: phần chữ (như khung xem Word hiện nay).
  - PDF scan không có chữ: chép **ảnh các trang** (AI đọc được ảnh) và báo "file scan — chép dạng ảnh".
- Dài quá thì báo số trang / số chữ và cho chọn trang.
- Che họ tên / CCCD tùy chọn, như "Chép sang AI" của bảng Excel hiện có (`moChepAI`). Văn bản hành chính thường không cần che.

## Ý 6 — Khu vực lọc đồng bộ (anh gửi 10/10)
### 6a. Tab file: Văn bản · Biểu mẫu · Scan (· Thư viện)
**Hiện nay (đo trên app, 1536×730):** mỗi tab một kiểu.
| | Văn bản | Biểu mẫu | Scan |
|---|---|---|---|
| Hàng nút | Thêm · Xóa · Bộ lọc · Lập chỉ mục · ❓ | Thêm · Xóa · Bộ lọc · Bộ biểu mẫu · ❓ | Thêm · Xóa · Bộ lọc · Chế độ: Thẻ · Webcam · Chữ ký·CCCD · ❓ |
| Hàng chip luôn hiện | Mảng + CT vay + Tag (2 hàng) | Chương trình + Tag (3 hàng) | Xã + Tag + 1 dòng giải thích |
| Sắp xếp | Tên · Ngày · Loại · Dung lượng · Vừa thêm | + Số lần dùng · Năm VB gốc | không có; thay bằng Ngày / Tuần / Tháng |
| Kiểu xem | Danh sách · Nhóm · Gọn · Khung xem · 📂 | như VB | Danh sách · Cây địa bàn · ⚠ Chưa đạt |

**Đề xuất — 1 thanh lọc dùng chung (1 hàng):**
```
[＋ Thêm]  [⚲ Lọc ▾ (2)]  [⇅ Ngày ▾]  [☰ ▾]   Tín dụng ✕  HN ✕        12 mục   ⋯   ❓
```
- **⚲ Lọc ▾:** mở bảng chip.
  - Văn bản: Mảng / CT vay / Tag.
  - Biểu mẫu: Chương trình / Tag.
  - Scan: Xã / Tag / Trạng thái (Chưa đạt).
  - Số trong ngoặc = số điều kiện đang lọc.
- **Chip đang lọc** hiện ngay trên thanh, bấm ✕ để bỏ. Không lọc thì không chiếm hàng nào.
- **⇅ Sắp xếp ▾:** cùng một hộp, mỗi tab thêm tiêu chí riêng (Số lần dùng, Năm VB gốc; Scan: Ngày / Tuần / Tháng là "nhóm theo").
- **☰ Kiểu xem ▾:** Danh sách · Nhóm · Gọn (Scan thêm Cây địa bàn). Khung xem bật / tắt ở chính khung.
- **⋯ Việc riêng của từng tab:**
  - Văn bản: Lập chỉ mục.
  - Biểu mẫu: Bộ biểu mẫu.
  - Scan: Chế độ thẻ / Webcam / Chữ ký·CCCD.
- **Không còn nút "Xóa file"** cố định: tích chọn → thanh chọn có 🗑 Xóa (quy tắc xóa chung). Dòng giải thích → ❓.

### 6b. Cây địa bàn ở Tổng hợp · Sao kê · Tổ TK&VV · KTGS · Tra cứu
**Hiện nay:**
- 4 ô Xã / Điểm GD / Hội / Tổ **xếp dọc**, chiếm ~110 px.
- Chip đặt chỗ khác nhau: Tổ có chip Hội, Tổng hợp chip nằm bên phải.
- **Mặc định khác nhau:** Tổ / Sao kê / Tổng hợp = "Toàn PGD"; KTGS = "— chọn xã —".
- **Chỗ chọn kỳ khác nhau:**
  - Tổng hợp không có ⟳ Làm mới / "Đang dùng".
  - KTGS có thêm chip BC0437/0438 và dòng "Nạp ở tab…".
- Ô tìm tổ: Tổ để trên cùng hàng kỳ, KTGS để riêng 1 hàng.
- **Mỗi tab nhớ phạm vi riêng:** chọn xã ở Tổ, sang Sao kê phải chọn lại.

**Đề xuất — 1 thanh phạm vi dùng chung, cùng chỗ ở cả 5 tab:**
```
Kỳ [T8/2026 · Mẫu 31 ▾] ⟳   Xã [Toàn PGD ▾] › Điểm [— ▾] › Hội [— ▾] › Tổ [— ▾]   🔎 tìm tổ / tên…
───────────────────────────────────────────────────────────────────────────────────────────────
(hàng 2 — riêng từng tab: Tổng hợp: báo cáo + CT + nguồn vốn · Sao kê: loại + khổ · Tổ: chip lọc · KTGS: chế độ)
```
- **1 hàng ngang:**
  - Kỳ + ⟳ (bỏ chip "Đang dùng" vì ô Kỳ đã ghi).
  - 4 ô phạm vi nối nhau bằng ›; chip nhanh nằm trong ô thả xuống.
  - Ô tìm ở cuối hàng.
- **Mặc định cả 5 tab = Toàn PGD.** KTGS chế độ cần chọn tổ thì nhắc ngay dưới ("Chọn tổ để …").
- **Phạm vi + kỳ dùng chung giữa 5 tab** (đổi 1 lần, tab khác theo) = đợt D làm luôn ở đây. Câu hỏi: anh có muốn chung không?
- KTGS: chip BC0437 / BC0438 + "Nạp ở tab…" → gộp vào dòng trạng thái nhỏ.

## Câu hỏi chờ anh
- Ý 6b: phạm vi (xã / điểm / hội / tổ) + kỳ **dùng chung** giữa Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu (đổi 1 lần, tab khác theo) — hay mỗi tab nhớ riêng như hiện nay?
- Ý 5: có thêm 🤖 Copy cho AI không (anh đang cân nhắc)?
