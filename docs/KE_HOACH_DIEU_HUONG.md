# KẾ HOẠCH — Đợt F: giao diện điều hướng (thanh bên) — bản 3.147

> Soạn 10/10/2026 sau khi gộp 3.145. Hướng chung đã có ở `KIEN_TRUC_3_LOP.md` mục 7.1 + đợt F (mục 8).
> Nguyên tắc: **chỉ đổi cách đi giữa các màn hình** — nội dung từng màn, dữ liệu, phím tắt cũ giữ nguyên; lối cũ (`doiNgan`, `slDoiTab`, `moNapSL`, `moBCSL`) vẫn chạy.

## 1. Hiện nay (3.145)
- Đầu trang: logo · ô tìm · giờ · ❓ 🧰 🗑 ⚙ · **thanh tab ngang** 7 nút: Hôm nay · Văn bản · 📥 Nạp & KT · Số liệu · Biểu mẫu · Scan · Thư viện.
- Bấm **Số liệu** → thêm **thanh tab con** thứ 2: Tổng hợp · Sao kê · Tổ TK&VV · KTGS Hội · Tra cứu KH. Công cụ (HSSV, Địa bàn, CT vay) nằm ở cột phải tab Hôm nay.
- Vướng: 2 tầng tab (mất 1 lần bấm + chỗ dọc trên laptop 730 px); các màn Số liệu "ẩn" sau 1 nút; Công cụ chỉ mở được từ Hôm nay.

## 2. Đề xuất (máy tính, màn ≥ 1100 px)
```
┌──────────────────┬──────────────────────────────────────────────────────────┐
│ TH Tủ hồ sơ   «  │ 🔍 Gõ số văn bản, tên khách, tổ…        10:42 · T7 10/10  │
│──────────────────│──────────────────────────────────────────────────────────│
│ 🏠 Hôm nay       │                                                          │
│ 📄 Văn bản    12 │                                                          │
│ 📥 Nạp & KT   ⚠2 │              nội dung màn đang chọn                      │
│ ─ SỐ LIỆU ─      │        (giữ nguyên như hiện nay, chỉ bỏ thanh tab)       │
│ 📊 Tổng hợp      │                                                          │
│ 📑 Sao kê        │                                                          │
│ 👥 Tổ TK&VV      │                                                          │
│ 🛡 KTGS Hội      │                                                          │
│ 👤 Tra cứu KH    │                                                          │
│ ─ HỒ SƠ ─        │                                                          │
│ 📋 Biểu mẫu      │                                                          │
│ 🪪 Scan          │                                                          │
│ 🖼 Thư viện      │                                                          │
│ ─ CÔNG CỤ ─      │                                                          │
│ 🎓 HSSV · 🗺 Địa bàn · 📚 CT vay                                            │
│──────────────────│                                                          │
│ 🗑 Thùng rác  3  │                                                          │
│ 🧰 Dọn kho       │                                                          │
│ ❓ Hướng dẫn     │                                                          │
│ ⚙ Cài đặt       │                                                          │
└──────────────────┴──────────────────────────────────────────────────────────┘
```
- Thanh bên rộng ~220 px; nút **«** thu gọn còn ~60 px (chỉ biểu tượng, rê chuột hiện tên); app **nhớ** trạng thái thu gọn.
- **Một tầng**: 5 màn Số liệu thành 5 mục riêng trên thanh bên → bỏ thanh tab con; bấm thẳng tới màn cần.
- Số đếm / dấu nhắc cạnh mục: Văn bản (chờ duyệt), Nạp & KT (⚠ thiếu file bắt buộc tháng mới nhất), Thùng rác.
- Đầu trang gọn lại: ô tìm + giờ (bỏ hàng nút ❓ 🧰 🗑 ⚙ — chuyển xuống chân thanh bên).
- Màn hẹp (700–1100 px, vd laptop 125%): thanh bên tự thu gọn 60 px.
- **Điện thoại (< 700 px): giữ nguyên thanh tab ngang như hiện nay** (KIEN_TRUC Q7: giao diện điện thoại giữ đến khi làm mini app).

## 3. Cách làm (kỹ thuật)
- File mới `js/23-dieu-huong.js` + phần CSS: 1 bảng khai `DH_MUC = [{k, ten, bt, mo:function(){…}, dem:function(){…}}]` → vẽ thanh bên; mỗi mục gọi đúng lối cũ (`doiNgan(i)`, `slDoiTab(k)`, `moNapSL()`, `ccMo('hssv')`…). Tô mục đang mở theo `nganHienTai` + `D.cauHinh.slTab` (thay `toNutSL`).
- `index.html`: thêm khung `<nav id="thanh-ben">`; thanh tab ngang + thanh tab con **chỉ ẩn bằng CSS** ở màn ≥ 1100 px (điện thoại vẫn dùng) → không phá lối cũ, phép thử cũ vẫn bấm được.
- Phím tắt mới (đề xuất): Alt+1…9 mở mục theo thứ tự; Ctrl+K đặt con trỏ vào ô tìm.
- Không đổi dữ liệu, không đổi IndexedDB / Drive. Rủi ro: trung bình (bố cục, CSS cột trái / phải, hộp thoại, in).

## 4. Các bước
1. **F1 — ảnh mẫu (mockup)**: dựng thật trên app (dữ liệu giả), chụp 1366×768 · 1536×730 · nền sáng / tối · thanh bên mở / thu gọn → anh chọn. Không gộp.
2. **F2 — code** sau khi anh nhắn "code": thanh bên + đầu trang gọn + nhớ thu gọn + số đếm; phép thử `t142` (mỗi mục mở đúng màn, tô đúng, thu gọn nhớ, điện thoại vẫn tab ngang, lối cũ chạy); hồi quy đủ; ảnh trước / sau 5 màn chính.
3. Số bản: **3.147** (anh chốt giữ dãy 3.x).

## 5. Anh chốt 10/10/2026 ("5 ý theo em", giữ dãy 3.x)
1. 5 màn Số liệu → **5 mục riêng** trên thanh bên, bỏ thanh tab con (máy tính).
2. **Công cụ** (HSSV, Địa bàn, CT vay) lên thanh bên; cột Công cụ ở Hôm nay **giữ** (không bỏ chức năng cũ).
3. Kỳ + phạm vi chung trên đầu trang → **để đợt D**; đợt F chỉ đổi điều hướng.
4. Thứ tự: **3.146 trước** (Kiểm tra kỳ + bỏ mã chốt), rồi đợt F.
5. Số bản: đợt F = **3.147**.

## 6. Phân tích bố cục (đo trên app thật, ảnh mẫu dựng bằng dữ liệu giả — không lưu trong repo)
| Đo | Hiện nay | Thanh bên | Ghi chú |
|---|---|---|---|
| Đầu trang (màn 1536×730, laptop 125%) | 106 px (2 hàng: tìm + tab) | ~52 px (1 hàng: tìm + giờ) | nội dung bắt đầu ở 66 px thay 122 px |
| Màn Số liệu (Tổ, Sao kê, Tổng hợp, KTGS, Tra cứu) | thêm thanh tab con ~45 px | không còn | **+~100 px chiều cao** (≈ +18 %) cho bảng tổ / ma trận |
| Chiều ngang nội dung 1536 | 1496 px | 1296 px (thanh bên 216) · 1452 px (thu gọn 60) | Văn bản: danh sách ~750 + khung xem ~520 — vẫn đủ |
| Chiều ngang nội dung 1366 | 1326 px | 1110 px · 1266 px (thu gọn) | 1366 trở xuống nên **mặc định thu gọn** (anh mở lại thì nhớ) |
- **Thanh bên ~216 px**, nền xanh như đầu trang cũ (giữ nhận diện app): logo + tên + số bản ở đầu; 3 nhóm *Số liệu · Hồ sơ · Công cụ*; chân thanh bên 4 nút biểu tượng 🗑 (kèm số) · 🧰 · ❓ · ⚙. Đủ chỗ ở màn cao 680 px (đã thử 730 px: còn dư).
- **Thu gọn 60 px:** chỉ biểu tượng, rê chuột hiện tên; nút « / » ở đầu; tự thu gọn khi màn < 1280 px.
- **Dấu nhắc cạnh mục:** Văn bản = số chờ duyệt; Nạp & KT = **⚠ số file bắt buộc còn thiếu** tháng mới nhất (đỏ) — nhìn là biết tháng này chưa đủ 9 file; Thùng rác = số mục.
- **Đầu trang còn trống bên phải ô tìm** → đúng chỗ cho chip *Kỳ · Phạm vi chung* của đợt D (không phải sắp lại lần nữa).
- **Thanh đáy** (Drive, bộ nhớ, nút Xem trước / Chọn file) giữ, chỉ dời sang phải theo thanh bên. Bước sau có thể đưa chip Drive / bộ nhớ vào chân thanh bên để lấy thêm ~45 px — để anh xem bản 3.147 rồi tính.
- **Nền tối:** thanh bên theo màu đầu trang tối (#12293E) cả khi máy tự chọn tối (ảnh mẫu còn sót trường hợp này — sửa khi code).
- **In:** thanh bên ẩn khi in (`@media print`). **Điện thoại < 700 px / 700–1100 px:** giữ thanh tab ngang như cũ.
- **Phương án đã cân nhắc, không chọn:** (a) giữ tab ngang + menu thả xuống cho Số liệu — vẫn 2 tầng, khó thấy; (b) thanh bên nền sáng + đầu trang xanh — tốn thêm 1 hàng xanh, nhìn nặng.

## 7. Phép thử 3.147 (t142)
Mỗi mục mở đúng màn + tô đúng (cả khi mở bằng lối cũ `doiNgan` / `slDoiTab` / Có gì mới); thu gọn / mở nhớ qua lần mở app; < 1280 px tự thu gọn; < 1100 px không có thanh bên, tab ngang còn; số trên dấu nhắc đúng (Nạp & KT theo `SL_BAT_BUOC`); in không có thanh bên; Alt+1…9; nền tối. Hồi quy đủ (phép thử cũ bấm thanh tab ngang vẫn chạy vì thanh tab chỉ ẩn bằng CSS).

## 8. Quy chuẩn bố cục anh đặt (10/10/2026) — thay phần khác nhau ở mục 2–7
1. **Thanh bên trái khi màn ≥ 900 px:** rộng cố định 220 px, nút ☰ thu còn 60 px. Chứa 7 tab nghiệp vụ xếp dọc. Dưới đáy: đèn Google Drive, Thùng rác, Cài đặt.
2. **Thanh đầu + thanh công cụ ≤ 85 px** (laptop 125 % chỉ còn ~730 px chiều cao).
3. **Khung xem trước (cột phải):** có vạch kéo co giãn; tự ẩn ở Hôm nay và khi xem Ma trận số liệu.
4. **iPhone < 900 px:** ẩn hẳn thanh bên, giao diện 1 cột, không tràn ngang.

### Đo trên app hiện tại (1536×730, dữ liệu giả)
| Màn | Từ đỉnh tới dòng nội dung đầu | Phần vượt 85 px gồm |
|---|---|---|
| Văn bản | 228 px | Đầu trang 2 hàng (106 px) · hàng nút Thêm / Xóa / Bộ lọc · 2 hàng chip Mảng / Tag · hàng Sắp xếp |
| Nạp & KT | ma trận ở 318 px | Đầu trang · dòng tiêu đề + giải thích · hàng kỳ / nút · dòng ① tình trạng |
| Tổ TK&VV, Sao kê, Tổng hợp | ~ 300 px | Đầu trang · thanh tab con · hàng Số liệu / Làm mới · **4 ô chọn phạm vi xếp dọc** (~110 px) |
| iPhone 390 px | — | 11 màn (cả 5 màn Số liệu) **không tràn ngang** khi chưa có dữ liệu; đo lại với bộ dữ liệu giả lớn khi code |

### Ảnh mẫu theo quy chuẩn (đã thử)
- **Thanh đầu 43 px:** ô tìm + giờ.
- **Thanh đáy bỏ trên máy tính:** đèn Drive + bộ nhớ chuyển xuống đáy thanh bên → cao thêm 45 px.
- **Danh sách văn bản lên 200 px:** còn vượt quy chuẩn vì hàng nút + chip Mảng / Tag + Sắp xếp chiếm ~155 px.
- **Màn 1000 px với thanh bên 220 px:** Hôm nay bị ép (sổ tay chữ dọc, thẻ Công cụ cụt chữ) → từ 900 đến 1280 px cần **tự thu 60 px**. Bấm ☰ thì thanh bên mở đè lên nội dung, không đẩy nội dung.

### Đề xuất chia 2 bản
- **3.147 — Khung:** thanh bên 7 mục (Số liệu mở xuống 5 mục con khi đang ở Số liệu) · ☰ thu 60 px (nhớ lựa chọn; < 1280 px tự thu) · đáy thanh bên: đèn Drive (+ bộ nhớ), Thùng rác (số), Cài đặt (gồm Hướng dẫn, Dọn kho) · thanh đầu 1 hàng ≤ 44 px · bỏ thanh đáy trên máy tính (nút ▣ Xem trước / Chọn file chuyển lên thanh công cụ) · quy tắc khung xem trước (vạch kéo đã có; ẩn ở Hôm nay, Nạp & KT, 5 màn Số liệu) · < 900 px giữ tab ngang 1 cột như hiện nay.
- **3.148 — Thanh công cụ từng màn ≤ 41 px để tổng ≤ 85 px:**
  - **Văn bản:** gộp hàng nút với hàng Sắp xếp; chip Mảng / Tag gập vào Bộ lọc (bấm mới mở).
  - **Nạp & KT:** 1 hàng (‹ kỳ › · Nạp nhiều file · File cần xuất · ⋯). Dòng giải thích → nút ❓. Làm sạch / Giữ sẵn → menu ⋯.
  - **Số liệu:** 4 ô phạm vi Xã › Điểm › Hội › Tổ xếp ngang 1 hàng, cùng hàng với kỳ / Làm mới.
  - **Biểu mẫu, Scan, Thư viện:** đo rồi gọn tương tự.
