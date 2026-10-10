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

## Ý 5 — Copy văn bản để dán cho AI đọc — **anh chốt 10/10: làm sau** (không thuộc đợt này)
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

**Anh chốt ý 6b (10/10) — KỲ CHUNG nằm ngoài cùng, phủ mọi tab:**
- **1 ô Kỳ duy nhất** ở **đầu trang**, cạnh ô tìm (chỗ trống đã chừa ở 3.147). Hiện ở mọi tab: Nạp & KT, Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu, Hôm nay, Công cụ (HSSV…).
  - Đổi 1 lần → mọi tab theo.
  - Bỏ các ô "Số liệu [kỳ]" / "Kỳ số liệu ‹ ›" / chip "Đang dùng" riêng của từng tab.
- **Ngoại lệ KTGS:**
  - **In mẫu kiểm tra theo Kế hoạch đã ghi nhận** (Kế hoạch › In theo tháng: Mẫu 06 / 16 / 04) → kỳ số liệu **theo kế hoạch** (cuối tháng liền trước tháng kiểm tra, như 3.141), không theo ô Kỳ chung. Hộp in ghi rõ "số liệu T…/… theo kế hoạch".
  - **Các mẫu kiểm tra khác** (đột xuất, sau giải ngân, định kỳ chọn tự do, báo cáo tổng hợp Mẫu 04 lẻ) → **kỳ chung**.
- **Phạm vi** (xã › điểm › hội › tổ): **anh chốt 10/10 "dùng chung hết"** — 1 phạm vi cho Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu (và Scan khi lọc). Chọn ở tab nào thì các tab khác theo. Thanh phạm vi 1 hàng như đề xuất ở trên.

## Ý 7 — Scan lưu theo cây địa bàn chuẩn như KTGS / Tổ (anh gửi 10/10)
**Hiện nay:**
- Scan dùng **cây địa bàn khai tay** ở Cài đặt › Địa bàn (`D.cauHinh.diaBan`: xã › điểm › ấp › tổ, tổ là chữ tự gõ).
- Lưu Drive: `Tủ hồ sơ/Hồ sơ scan/<xã>/<điểm>/<ấp>/Tổ <…>` (thẻ CCCD: `Tủ hồ sơ/CCCD/…`).
- KTGS / Tổ / Tổng hợp / Sao kê dùng **cây chuẩn từ số liệu**: Mẫu 31 + DSTO + LEN_31 TO_TRUONG (mã xã, mã điểm GD + ngày GDXA, Hội, mã tổ + tổ trưởng, ấp).
- **Hai cây lệch nhau:** tên gõ tay khác tên hệ thống, tổ không có mã.

**Đề xuất:**
- **Scan chọn địa bàn bằng đúng thanh phạm vi chung (ý 6b):** Xã › Điểm GD › Hội › Tổ, lấy từ cây chuẩn kỳ mới nhất. Tìm nhanh theo tên tổ trưởng / ấp.
- **Lưu kèm mã** (mã xã, mã điểm, mã tổ) + tên lúc lưu. Đổi tổ trưởng / đóng tổ thì hồ sơ vẫn theo mã tổ, không lạc.
- **Thư mục Drive theo tên chuẩn:** `Hồ sơ scan/<Xã>/<Điểm GD>/<Ấp>/<Tổ trưởng> (<mã tổ>)`.
- **Cây "Cây địa bàn" của tab Scan** vẽ bằng cùng cây (số hồ sơ mỗi nhánh), giống bảng tổ ở Tổ TK&VV.
- **Về sau (đợt G, Q11):** gắn hồ sơ scan vào **mã khách hàng** trong tổ.
- **Hồ sơ cũ:**
  - App tự khớp tên đã khai với cây chuẩn (xã / ấp / tổ). Khớp → ghi thêm mã. Không khớp → để mục "Cần gán lại địa bàn" cho anh chọn.
  - **Không tự dời file trên Drive.** Có nút "Sắp lại thư mục Drive" xem trước rồi mới dời.
- **Cài đặt › Địa bàn (khai tay):** khi đã có cây chuẩn thì không cần nữa. Câu hỏi bên dưới.

**Anh chốt ý 7 (10/10):**
- **Nguyên tắc chung:** cái gì không còn phù hợp thì loại bỏ. **Hạn chế tối đa nhập tay** — app phải lấy được từ số liệu chuẩn.
- **Cài đặt** sẽ viết lại, tinh chỉnh toàn bộ **sau khi** làm xong các chức năng. Phần khai tay địa bàn bỏ khi viết lại Cài đặt.
- **Lưu file scan chỉ cần: mã KH + tên + ấp.** Không lưu theo tổ, vì khách có thể bị chuyển sang tổ khác khi củng cố tổ.
  - Chọn khách bằng ô tìm (tên / mã KH / CCCD) từ danh bạ Mẫu 31 → app tự điền ấp + xã.
  - Thư mục đề xuất: `Hồ sơ scan/<Xã>/<Ấp>/<Mã KH> <Tên>.pdf`. Xã do app tự lấy, vì tên ấp trùng giữa các xã.
- **Hồ sơ scan cũ:** chuẩn hóa sau, khi cần (hiện lưu chưa nhiều). Đợt này **không** dời / khớp lại.

## Ý 8 — Khai báo Hội đoàn thể: 1 bảng như Excel (anh gửi ảnh 10/10)
**Hiện nay:**
- Mỗi Hội một thẻ dài: tên đơn vị + dòng "In ra: …" giải thích.
- Ban Thường vụ có CT, PCT, PCT 2, PCT 3, nhiệm kỳ, 5 ủy viên BTV; mỗi ô có dòng "In ra: …" + nút ↺.
- Phần ủy thác (số / ngày HĐ, số / ngày KH Hội tỉnh); nút Phân công BTV, link "sửa ở Chuẩn hóa".

**Anh chốt:** gom lại **1 bảng như Excel** cho gọn, **không diễn giải**. Thống nhất **1 Hội = 1 Chủ tịch, 1 Phó Chủ tịch, 3 Ủy viên BTV**.

**Đề xuất bảng:**
- Mỗi dòng = 1 Hội cấp xã (xã × Hội, app tự lấy từ số liệu, kèm số tổ).
- Cột: Xã · Hội (số tổ) · Tên Hội cấp xã (trống = tên chuẩn) · Chủ tịch · Phó CT · BTV 1 · BTV 2 · BTV 3 · Nhiệm kỳ · Số HĐ ủy thác · Ngày HĐ · Số KH Hội tỉnh · Ngày KH.
- **Gõ thẳng trong ô như Excel:** Enter / Tab sang ô kế, ↑↓ đổi dòng.
- **Dán được cả khối** chép từ Excel / Zalo (nhiều dòng × nhiều cột).
- Ô trống tô nhạt. Ngày sai dạng tô đỏ (không thêm chữ giải thích).
- Đoàn Thanh niên tự hiện nhãn **Bí thư / Phó Bí thư**.
- **Bỏ:** dòng "In ra: …", nút ↺ từng ô, PCT 2, PCT 3, ủy viên 4, 5.
- Phân công BTV + Chuẩn hóa tên cấp tỉnh: để khi viết lại Cài đặt / KTGS (nút ⋯ trên bảng).
- **Dữ liệu cũ — anh chốt 10/10: app tự lấy số liệu đã khai điền vào bảng mới, anh không nhập lại.**
  - Chuyển 1 lần khi mở bản mới: Tên Hội, CT, nhiệm kỳ, số / ngày HĐ ủy thác, số / ngày KH Hội tỉnh giữ nguyên.
  - **Phó CT** = người đầu tiên có tên trong PCT → PCT 2 → PCT 3.
  - **BTV 1–3** = 3 người đầu có tên trong ủy viên 1 → 5 (dồn lên, bỏ ô trống).
  - Ai bị dư (PCT thứ 2–3, ủy viên thứ 4–5): **không mất** — giữ trong dữ liệu (`du`). Bảng hiện 1 dấu ⓘ nhỏ ở dòng Hội đó, rê chuột thấy tên để anh xem có cần đổi người không.
  - Phép thử: dữ liệu cũ giả đủ 9 vai → bảng mới đúng CT / PCT / 3 BTV, người dư còn giữ.
- Mẫu in (06 / 16 / 04 / Kế hoạch) chỉ còn chọn CT / PCT / BTV 1–3.

## Ý 9 — Kiểu xem "▦ Bảng chi tiết" (anh đề xuất 10/10)
**Anh muốn:**
- Thêm kiểu xem **Bảng** cạnh ☰ Danh sách và 🗂 Nhóm.
- Bảng kẻ dòng gọn, cột cố định: **Số hiệu · Ngày ký · Tên văn bản & Trích yếu · Mảng NV · CT vay · Trạng thái**.
- Mỗi dòng cao 28–32 px → 1 màn hình máy tính thấy 20–25 văn bản, quét mắt như Excel.

**Đề xuất làm:**
- **▦ Bảng thay cho nút "Gọn" hiện có** (Gọn = mỗi file 1 dòng, trùng mục đích) → kiểu xem còn **☰ Danh sách · 🗂 Nhóm · ▦ Bảng**, không thêm nút thừa.
- Cột đầu là ô tích chọn (để 🗑 Xóa / 📤 Gửi nhiều file).
- **Bấm tiêu đề cột để sắp xếp** ▲▼ → ở chế độ Bảng không cần hàng Sắp xếp riêng.
- **Bấm dòng** → khung xem bên phải như hiện nay. ↑↓ chuyển dòng, khung xem theo.
- **Trạng thái:** biểu tượng nhỏ, rê chuột hiện chữ — ⚠ thiếu tag · ☁ chưa lên Drive · 📥 chờ khai · ★ ghim.
- Chữ trích yếu dài → 1 dòng, cắt "…", rê chuột hiện đủ.
- **Áp cùng kiểu cho tab file khác (đồng bộ ý 6a):**
  - Biểu mẫu: Tên mẫu · Chương trình · Loại · Số lần dùng · Trạng thái.
  - Scan: Mã KH · Tên · Ấp · Loại giấy tờ · Ngày · Trạng thái.
- App nhớ kiểu xem riêng từng tab. Điện thoại vẫn dùng Danh sách (bảng không vừa chiều ngang).

## Ý 10 — Thông báo có 1 ô cố định, không che nút (anh gửi 10/10)
**Hiện nay có nhiều thứ nổi đè lên nội dung:**
- **`bao()`:** chữ nổi giữa đáy màn, cách đáy 84 px.
- **Chip "⚡ Đang dựng sẵn số liệu… / Số liệu sẵn sàng (N kỳ)"** (`slNapSanChip`, `#sl-san`): nổi góc phải dưới — **che nút "Xem trước" / nút cuối trang**.
- **"Đang xử lý…"** (`batChay`, `#danglam`): thả từ đỉnh xuống, có vạch chạy trên cùng.
- **Thanh "↩ Hoàn tác":** sẽ bỏ theo ý 3.

**Đề xuất: 1 "ô thông báo" cố định, nằm sẵn trong bố cục (không nổi đè):**
- **Máy tính:** ô 1 dòng ở **đầu trang**, giữa ô Kỳ và giờ.
  - Hiện tin mới nhất ("Đã nạp Mẫu 31 T9/2026", "Đang dựng sẵn T8 (2/5) ▓▓░", "Đã kiểm tra: ✅ Đạt").
  - Hết việc thì về trạng thái nghỉ: ☁ đã lên Drive · ⚡ sẵn dùng T9, T8.
- **Điện thoại:** cùng ô đó nằm trong **thanh đáy** (thay chữ nổi giữa màn).
- **Bấm ô → 🔔 danh sách 20 tin gần nhất** (giờ + nội dung), để xem lại tin đã trôi.
- **Việc đang chạy lâu** (nạp nhiều file, dựng sẵn, đồng bộ Drive):
  - Hiện trong ô kèm thanh tiến độ nhỏ + nút Dừng (nếu có).
  - Không còn hộp "Đang xử lý…" che giữa đỉnh màn, trừ việc phải chờ không bấm được gì khác.
- **Lỗi cần anh quyết** (vd thiếu file, Drive hết phiên): vẫn hiện hộp hỏi. Tin thường không bao giờ đè lên nút.
- **Bỏ chip nổi `#sl-san`** và dòng "⚡ Sẵn dùng…" ở tab Nạp & KT → gộp vào ô thông báo (trùng với ý 1).

**Anh bổ sung ý 10 (10/10): cần 1 nơi CHỈ để hiện trạng thái — đèn báo / thanh chạy màu, nhìn là biết tiến độ.** Đề xuất chốt chỗ:
- **Máy tính:** **chân thanh bên** (trên 🗑 ⚙).
  - **Đèn màu:**
    - 🟢 ổn / đã lên Drive
    - 🟡 đang chạy
    - 🔴 lỗi / cần anh xử lý
    - ⚪ chưa nối Drive
  - **Thanh chạy màu** theo % tiến độ (nạp file, dựng sẵn, đồng bộ).
  - **1 dòng chữ ngắn** tin mới nhất.
  - Bấm → 🔔 20 tin gần nhất. Thanh bên thu gọn 60 px thì còn đèn + thanh màu.
- **Điện thoại:** cùng bộ đèn + thanh màu + chữ nằm trong **thanh đáy**.
- **Đầu trang chỉ còn:** ô tìm · ô Kỳ · giờ. Không có chữ báo nổi nào nữa.
- **Tên "NhanNT":** chuyển lên **thanh bên** (dưới chữ Tủ hồ sơ ở đầu thanh bên), bỏ khỏi thanh đáy.
- **Máy tính bỏ hẳn thanh đáy:**
  - Đèn Drive + bộ nhớ vào chân thanh bên.
  - Nút "Xem trước" / "Chọn file" lên hàng công cụ của màn.

## Ý 11 — Luồng Scan: quét → chỉnh → chọn Lưu / Gửi, không tự lưu tạm (anh gửi 10/10)
**Hiện nay:**
- Quét / chọn ảnh → hàng chờ, app **tự lưu tạm** (bản chưa khai lên Drive "Hồ sơ scan/Chưa khai/<tháng>"). Không có nút "Lưu" rõ ràng.
- Muốn chỉ scan để lưu vào máy hoặc copy gửi đi thì vẫn bị lưu vào tủ.
- Quét tài liệu còn bất cập.
- **Đã có sẵn trong app:** tự tìm mép giấy / thẻ, làm thẳng phối cảnh, kéo 4 góc, bộ lọc (giấy trắng, xám, đen trắng, magic), xoay, đổi thứ tự, ghép PDF, chia sẻ, chép ảnh.

**Đề xuất — học theo app Scanner Lens (iOS) anh đang dùng:**
1. **Chụp:**
   - Điện thoại: mở camera trong app, **khung mép giấy tự nhận hiện trên màn hình** (viền xanh), chụp **liên tục nhiều trang**, góc dưới đếm số trang.
   - Máy tính: chọn ảnh / webcam / kéo thả.
   - Chế độ: **Tài liệu · Thẻ CCCD · Ảnh**.
2. **Chỉnh (1 màn, trang to ở giữa, dải trang nhỏ ở dưới):**
   - Tự cắt + làm thẳng sẵn; kéo 4 góc nếu lệch.
   - 4 bộ lọc như Lens: **Tài liệu** (nền trắng, chữ đen rõ) · Gốc · Xám · Đen trắng.
   - Xoay · xóa trang · kéo đổi thứ tự · ＋ chụp thêm.
3. **Xong → hộp chọn (cùng luồng ý 4):**
   - **💾 Lưu vào máy:** PDF hoặc ảnh JPG.
   - **📤 Gửi / 📋 Copy ảnh:** gửi Zalo, không lưu gì.
   - **🗄 Lưu vào tủ hồ sơ:** chọn khách (mã KH + tên + ấp, ý 7) → lưu app + Drive.
   - **Chỉ "Lưu vào tủ" mới tạo hồ sơ.**
4. **Bỏ tự lưu tạm vào tủ / Drive.** Để không mất việc khi lỡ đóng app giữa chừng:
   - App giữ **phiên quét dở trong máy** (không lên Drive).
   - Mở lại hỏi "Tiếp tục phiên quét dở?".
   - Phiên tự bỏ sau khi đã Lưu / Gửi, hoặc sau 7 ngày.
5. **Cải thiện quét tài liệu:**
   - Lọc "Tài liệu" làm lại cho giống Lens: cân sáng, nền trắng đều, chữ đậm, bỏ bóng tay / bóng điện thoại.
   - Tự xoay đúng chiều chữ.
   - Ảnh nghiêng / mờ → báo chụp lại ngay.
   - Thử trên ảnh mẫu thật của anh trước khi gộp. Ảnh thật chỉ thử trong máy em, **không đưa vào repo**.

## Câu hỏi chờ anh
- (hết — chờ anh gửi thêm ý hoặc nhắn "đủ" để làm ảnh mẫu cả gói)
