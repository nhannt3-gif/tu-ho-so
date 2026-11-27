# Nhật ký vai: App chính

> Hiện do: **TK 2** (nhận lại 10/11 từ TK 3, anh 10/11 "đọc trạng thái làm tiếp của TK bàn giao") · Làm ở: repo · `index.html`, `js/`, kho số liệu, bộ số / nháp văn bản đối chiếu. Bảng vai: `docs/PHOI_HOP_CHUNG.md` mục 1; cách ghi / đổi vai: mục 1a.
> **Mẫu mục** (thêm ở ĐẦU danh sách, mới nhất trên cùng; không dữ liệu khách / tên tổ trưởng / mã tổ):
>
> ```
> ### dd/mm/yyyy hh:mm — TK x · [PHIÊN | BÀN GIAO | NHẬN VAI]
> - Đã làm: … (bản / PR)
> - Đang dở: …
> - Bước tiếp: …
> - Chờ ai: anh / TK … (việc gì)
> - Lưu ý / bẫy: …
> ```

### 28/11/2026 — TK 2 · PHIÊN (3.570 ô Sao kê KHĐ · Quá hạn · Khoanh + thu nợ đến hạn, chỉ tiêu VB 180)
- Anh duyệt danh sách việc + "theo VB 180, em cứ làm theo em thấy tốt nhất" + "em gộp các bảng làm 1 lần và gộp": js/99d OKHD (ô KHĐ 5 bảng), js/99e ONO (ô Quá hạn, Khoanh, thêm "Kết quả thu nợ đến hạn" vào ô Nợ đến hạn), js/99c DBT chỉ tiêu khd/qh/kn (BAN 3), bỏ db_khd. t419 14/14, t420 10/10.
- Căn cứ đã đọc: CV 180/NHCS-KHTD (phụ lục bản quét — số Gò Dầu không đọc chắc → ô nhập), VB UBND Truông Mít / Gia Lộc theo VB 180 (KHĐ −30%, QH ≤ 0,08% không tăng, khoanh −5%, thu nợ ĐH ≥ 99%), "Nội dung họp giao ban" T11 (khuôn bảng; giao ban ghi KHĐ "Giảm 20%" theo KH 1166 — anh chốt theo VB 180).
- Bẫy: (1) khung xem Sao kê là iframe srcdoc → ô nhập trong báo cáo không chạy GD; dùng hook `SK_BC.tuyChon()` (thanh công cụ). (2) `kyLui(k, 1)` = tháng SAU; tháng trước = `kyLui(k, −1)`. (3) Dữ liệu giả nhỏ không có QH / KHĐ đầu năm → phép thử tự gán ngày GD cũ / qh cho vài món.
- Còn tồn (đã duyệt, làm tiếp): dời KU chưa GN + bỏ ô Nợ cần xử lý · bảng đối chiếu toàn bộ chỉ tiêu VB 180 · nhóm A/B/C KHĐ · kế hoạch phần KQGD (anh 28/11 "riêng phần nào KQGD em lên KH làm luôn").

### 27/11/2026 — TK 2 · PHIÊN (3.569 In DS tổ nhóm theo Hội)
- QUY TẮC MỚI (anh 28/11 "ok gộp đi, làm xong gộp liền rồi chạy sau"): code xong + kiem.py sạch + phép thử khối đó đạt → gộp ngay; hồi quy / 5 kiểm tra GitHub chạy sau, trượt thì vá bản kế. 3.569 gộp theo cách này, hồi quy sau gộp 13/13 đạt.
- Anh (ảnh bản in) + chọn "STT theo Hội nhưng có tổng của điểm và xã" + "bỏ cột 10C, code và gộp": js/58b `TCIN.dl` nhóm Xã → Điểm → Hội, `html` 8 cột (+ SĐT tổ trưởng `t.sdt`, Tổ phó `t.pho`), Cộng điểm / xã chia theo Hội; bỏ `html10`. t386 9/9, t417 cập nhật.

### 27/11/2026 — TK 2 · PHIÊN (3.568 sửa cột 10C mới bị ẩn ở Tra cứu KH)
- Anh báo (ảnh) đã nạp DS 10C mà không thấy cột → đo: cột có trong bảng nhưng rộng 0 px (bảng fixed layout, CSS chỉ chia 7 cột). Sửa lớp `co10c` + chia 8 cột; anh "cân đối lại các cột đã có" → đo 3 cỡ màn, không cột nào cắt chữ.
- Bẫy: phép thử bố cục phải ĐO độ rộng / cắt chữ, không chỉ kiểm có phần tử (t417 thêm ý đo). Máy khởi động lại mất tests/lib + tests/gia* → dựng lại theo .github/workflows/kiem-pr.yml (npm pack + taogia.py; cần `python3 -m pip install openpyxl`).

### 26/11/2026 — TK 2 · PHIÊN (3.567 diễn biến món vay 3 tháng KHĐ theo tháng)
- Anh duyệt kế hoạch ("đồng ý, coi như đây là 1 chức năng quan trọng có thể theo dõi nhiều sau này" → "code và gộp"): js/99c `DBT` — bộ máy diễn biến theo tháng (chỉ tiêu khai trong `DBT.CHI`), chỉ tiêu đầu tiên KHĐ; Sao kê `db_khd` (Nợ cần xử lý). t419 10/10.
- Thiết kế: mỗi kỳ tính KHĐ từ Mẫu 31 kỳ đó (`KHO.bo` + `slDsNo(B,'khd')`), tổ của kỳ (`KHO.nap`) → sổ tóm tắt IndexedDB (khóa có mã băm Mẫu 31 + `DBT.BAN`); lọc phạm vi bằng `pvLoc` trên tổ đã lưu; Mới / Thoát theo KU toàn kỳ.
- Bẫy: dữ liệu giả T8 và bản ngày giống nhau → t419 tự sửa ngày GD gần nhất 2 món ra / 2 món vào KHĐ. Js/76 rút → `db_khd` nằm cuối danh sách (t314).
- Tiếp (chờ anh chọn): thêm chỉ tiêu khác vào `DBT.CHI` (QH, khoanh, dư nợ…).

### 25/11/2026 — TK 2 · PHIÊN (3.566 nạp PDF hệ thống KQGD / CLT02 + hộp đến + đối chiếu KQGD)
- Anh "code và gộp": js/99b `KQPDF` — đọc lớp chữ + tọa độ PDF (không OCR): KQGD mẫu 13/GDX + mẫu cũ (loại động `kqgd_<mã điểm>`), CLT02 PDF → bảng giả theo dòng số cột 1…16 → `CLT.doc`; 📥 Lấy từ hộp đến (Picker, chỉ tải + chép, không dời / xóa); Sao kê `kqgd31` đối chiếu KQGD ↔ Mẫu 31. t418 11/11.
- Đã chạy thử file THẬT trên Drive (chỉ in số đếm, không lưu repo): 3 KQGD + 2 CLT02 đều khớp tự kiểm (cộng tổ = dòng Hội; Tốt/Khá/TB/Yếu từng Hội = dòng Hội).
- Bẫy: (1) pdf.js tách chữ có dấu thành mảnh sát nhau → `M.ghep` (< 1,5 pt). (2) Tên dài căn giữa ô → phần tên nằm TRÊN và DƯỚI dòng STT → gắn dòng phụ vào dòng STT gần nhất (≤ 12 pt), xếp loại dòng sau khi ghép tên. (3) KQGD mẫu cũ in số / tên 2 hàng so le ~3 pt; số hộ x0 ≈ 144 → vùng số theo mép phải ≥ 150. (4) CLT02: tên căn trái lệch số cột "2" → ranh cột 1|2 = mép số 1 + 6, 2|3 = mép số 3 − 6. (5) Heredoc bash không nháy nuốt `…` trong spec → ghi spec bằng file .py.
- Chờ anh: thử máy thật (bảng 3.566) — nhất là ghép tên điểm KQGD với điểm GD của app.

### 25/11/2026 — TK 2 · PHIÊN (3.565 10C mới của tổ ở Tra cứu KH)
- Anh "code và gộp": js/99 `M10C` — nạp DS kiểm tra 10C đã scan (file giao ban) → cột 10C mới sau CCCD ở bảng tổ Tra cứu KH (nhiều bản / tổ, bấm chọn bản mở Drive), in DS tổ, ma trận `mc_10c`. t417 8/8.
- Bẫy: ngày của file giao ban nằm ở sheet Tổng hợp (dòng "Cập nhật"), danh sách ở sheet khác → `slTimKy` không thấy → bọc `slPhanTich` chỉ cho loại ds10c. Đọc bảng qua `KHO.docBang` (kiem.py cấm `slDocBang(` ngoài js/22*, 28, 29).
- Tiếp: 3.566 KQGD / CLT PDF + hộp đến (chỉ chép).

### 24/11/2026 — TK 2 · PHIÊN (3.564 ma trận món chuẩn)
- Anh "gộp và tiếp" → js/98 `MCH` (từ điển `MCH.TRUONG` 11 trường bổ sung có nguồn + khóa) → 🧩 Báo cáo của tôi (bọc `btDong`, thêm cột) + Sao kê `mch` Bảng món chuẩn; docs/TU_DIEN_TRUONG.md. t416 7/7.
- Bẫy: kiem.py cấm đọc thẳng `.co.hstd` / `.theoKH` / `B.mon` ngoài js/22, 22g, 22k, 29, 73 → dùng `kcKU(K, ku)` / `kcKH(K, kh)` / `kcGoc(B)` (KHÔNG dùng `KHO.kcKU` — chỉ nhận ku, luôn đọc kỳ tab Tổ).
- Tiếp: 3.565 hộp đến (chỉ chép) + KQGD / CLT PDF.

### 24/11/2026 — TK 2 · PHIÊN (3.563 QH · khoanh · KHĐ tính từ Mẫu 31 + Nợ chuyển QH trong tháng)
- Anh 22/11: "sao kê nợ quá hạn, nợ khoanh, 3 tháng KHĐ phải tính từ Mẫu 31, các file chỉ tham khảo đối chiếu" → `slNoTinh` / `slNoGan` / `slDsNo` (js/22): B.nqh / B.nk / B.khd + B.tinh từ Mẫu 31; tháng không có Mẫu 31 vẫn dùng file. Đổi chỗ đọc: js/76, 22h (toBCNo), 22j (ttSaoKe), 62. Kiểm tra (22i) thêm đối chiếu từng món NQH / NK. Gói mới js/97 (`CQH`, Sao kê `cqh`). t415 7/7; t276 chụp lại (đã so từng báo cáo: chỉ đổi đúng phần nguồn), t314 23 báo cáo.
- Bẫy: gianho31 KHĐ file 5 món nhưng Mẫu 31 giả tính 0 (dữ liệu giả sinh ngẫu nhiên) — không phải lỗi. File đối chiếu giao ban (22k) giờ dùng KHĐ / ngày CNQH từ Mẫu 31 → 🧪 Kiểm mốc vàng 31/10 có thể báo lệch đúng các món file ≠ tự tính (nhờ anh bấm 🧪 sau khi cập nhật).
- Chờ anh: thử máy thật; bấm 🧪 Kiểm mốc. Tiếp: 3.564 ma trận món chuẩn · 3.565 hộp đến (chỉ chép) + KQGD / CLT PDF. Quyết định kho / hộp đến ghi hộp thư PHOI_HOP_CHUNG 24/11.

### 22/11/2026 — TK 2 · QUYẾT ĐỊNH (dừng đổi onclick hàng loạt)
- Anh chưa có thời gian thử máy thật → chọn **A**: dừng ở 278 onclick (sau 3.562). Chỉ đổi khối đang sửa cho nghiệp vụ, kèm phép thử riêng. Ghi ở QUY_CHUAN_KIEN_TRUC.md (dưới "Code mới").
- Lý do: ~210 chỗ đổi được ở ~40 màn dùng hằng ngày, chỉ 12 tự động; ~65 chỗ phải giữ (js/27 mini, PiP js/04b, js/26, Có gì mới, mẫu in) → dù đổi hết cũng chưa bật được CSP chặt.

### 22/11/2026 — TK 2 · PHIÊN (3.562 chuẩn hóa nút danh mục / KTGS / hộp thoại / Hôm nay)
- Anh "tiếp và gộp": js/19, 22b, 06, 04b3 (44 chỗ) → data-lenh; `ktInNutXem` + "Cần xử lý" `fn` nhận HÀM thay chuỗi lệnh. onclick 322 → 278. t414 7/7.
- Không đổi: js/27 lõi mini (Function.toString → file HTML riêng, KHÔNG có GD) · js/26 chip GDX truyền chuỗi lệnh (cần bản riêng) · nút Có gì mới (js/06 noiDungCoGiMoi, lệnh từ bump.py).

### 22/11/2026 — TK 2 · PHIÊN (3.561 chuẩn hóa nút khung tab / Biểu mẫu / cây địa bàn / khung xem PDF)
- Anh "code và gộp" 3 mục: 6 chỗ bấm động js/10 + 11 (hamThem nay là hàm; Khác / Sửa chỉ gọi hàm trong danh sách) + js/05, 09, 18 chuyển tay. onclick 368 → 322. t413 9/9.
- Bẫy: js/06b chặn bấm dòng ở pha capture khi đang chọn nhiều (stopPropagation) → data-lenh cũng bị chặn đúng như onclick cũ. ↔ / ⊡ là bật–tắt (bấm lại chế độ đang bật → tắt).
- Còn ~320 onclick ở các file khác — làm dần nếu anh duyệt.

### 22/11/2026 — TK 2 · PHIÊN (3.560 chuẩn hóa danh sách văn bản)
- 13 onclick js/10 + 11 → data-lenh f10.* / f11.*; bộ chọn dòng nhận 2 dạng (Biểu mẫu js/09 còn onclick). t412 6/6. Còn 6 onclick động (tên hàm truyền vào).
- Bẫy: đổi onclick dòng phải đổi CẢ dòng lẫn nút trên dòng cùng lúc (onclick dòng chạy trước bộ nghe GD ở document); grep `[onclick^=` trong js + tests.

### 22/11/2026 — TK 2 · PHIÊN (3.559 chuẩn hóa tách dòng js/26 + mẫu in)
- Anh "tiếp tục": `tools/tach_dong.py` cho js/26, js/31, js/mau/* (62 chỗ, kiem.py dòng > 400 −42). Còn: cụm danh sách văn bản js/10 + 11 (bản riêng, chờ anh duyệt vì đụng màn dùng nhiều nhất).

### 21/11/2026 — TK 2 · PHIÊN (3.558 C2 Phiếu chuẩn bị phiên + chuẩn hóa)
- Anh "làm C2 và kết hợp chuẩn hóa theo kế hoạch" → `js/96-phieu-phien.js` (`PPH`, báo cáo Sao kê `pph`, gọi lại `skBCDH` để khớp sao kê gốc). `tools/tach_dong.py` (js/22c, 22d); bỏ `scanCopyAnh`. t410 5/5.
- Còn chuẩn hóa: tách dòng js/26 + mẫu in (dùng tools/tach_dong.py), cụm danh sách văn bản js/10 + 11 (bản riêng). Đợt 4 còn C1 (cần Giao ban).
- Bẫy: dữ liệu giả gianho31 không có món đến hạn sau 08/2026 — t410 tự đặt 3 món đến hạn trước phiên để phép khớp có nghĩa.

### 20/11/2026 — TK 2 · PHIÊN (3.557 rà soát gọn code)
- Anh "rà soát chuẩn hóa code cho gọn" → duyệt 4 việc, "code 1 lần": ① thước đo `thay_han` + xóa 18 hàm chết · ② `PDFA` (js/03) thay 12 chỗ đọc PDF · ③ onclick 458 → 381 · ④ dòng dài js/25* 85 → 1 (cả app 159 → 108). t411 12/12. Không gộp lớp bọc Scan (anh chọn giữ cắm rút).
- Chờ anh: thử máy thật bảng 3.557; "gộp". Đề xuất tiếp: tách dòng dài js/26, 22d, 22c, mẫu in (cùng công cụ); đổi cả cụm hàng danh sách văn bản js/10 + 11; bỏ `scanCopyAnh` (không còn nút từ 3.224).
- Bẫy: nội dung cửa sổ nổi 📌 HSSV (js/04b hsNoiHTML) phải giữ onclick (cửa sổ PiP riêng, gọi qua HS_NOI_HAM) — hồi quy t111 / t138 bắt được. Đổi onclick phải grep chỗ tìm nút theo `[onclick^=…]` (js + tests); nút con có `event.stopPropagation()` trong hàng có onclick thì phải đổi cả hàng.

### 17/11/2026 — TK 2 · PHIÊN (3.556 Bản photo CCCD / CCCD nhận PDF)
- Anh "scan cccd 2 mặt trên 1 tờ app chỉ đọc ảnh, ko đọc pdf" → duyệt "code mở pdf luôn" (cả 🪪 CCCD). File mới `js/81b-scan-pdf-photo.js` (gói `SCPP`): hộp chọn Ảnh có sẵn chế độ Thẻ nhận PDF; Bản photo + PDF → ảnh nguyên tờ → luồng tách tờ photo cũ. t410 10/10.
- Chờ anh: thử máy thật với PDF scan tờ photo thật (bảng thử 3.556); gộp PR khi anh nhắn "gộp".
- Bẫy: js/81b phải nạp SAU js/81 (bọc ngoài cùng `nhanVaoScan`); `tests/kiem.py` "Thiếu hàm: sectPr" có sẵn từ 3.555, không do bản này.

### 16/11/2026 — TK 2 · PHIÊN (3.555 nút 🗑 trên cột ngày cũ)
- Anh "cho dễ nhìn": nút 🗑 trên tiêu đề cột ngày có bản thừa (`nkt.xoaCot` → `slXoaNgayCu('', ngày)`). t409 4/4.

### 16/11/2026 — TK 2 · PHIÊN (3.554 xóa sao kê theo ngày cũ)
- Anh "25/10 đã xóa vẫn hiện" → tra meta.json Drive: còn Sao kê TK 104 / 105 25/10 (nút xóa ngày cũ bỏ qua loại theo ngày). `slDsSkCu` + t409. Anh đã ok iPhone sau 3.553.

### 15/11/2026 — TK 2 · PHIÊN (3.553 gỡ CSP)
- Hồi quy đủ 3.551: 5 trượt (heic-to + phép thử cần eval, CSP chặn) + anh báo iPhone trắng màn / "không lưu được" (app cài MH chính) → gỡ thẻ CSP, giữ dấu vân tay. 6 phép đạt lại.
- **Bẫy lớn:** CSP phải thử trên Safari iPhone thật trước khi bật lại; heic-to cần `'unsafe-eval'`. App cài ra MH chính trên iOS có kho riêng (trống, nối Drive lại). Chưa rõ nguyên nhân "không lưu được" trên iPhone — chờ anh gửi nhật ký lỗi (⚠ chip → 📋 Chép).

### 15/11/2026 — TK 2 · PHIÊN (3.552 F7 + F8)
- Anh "gộp và tiếp": gộp #573 (3.551). B1 chờ TK 1 chốt khuôn gói → làm phần đợt 2 còn sót: F7 (`:focus-visible`, accent-color), F8 (ô số tabular-nums). t408 3/3. Còn lại đợt 3: B1 (chờ TK 1), B3 (TK 1); A5 hoãn.

### 15/11/2026 — TK 2 · PHIÊN (3.551 E3 CSP + dấu vân tay)
- Anh "gộp và tiếp tục, không cần kiểm liên tục tốn token" → gộp #572, **bỏ lịch kiểm định kỳ**. 3.551: thẻ CSP `index.html`; `js/01` TV_DAU + tvKiemDau (SHA-384); thư viện chính cdnjs → jsDelivr npm cùng bản (máy làm việc không tải được cdnjs để đối byte). t407 5/5.
- Bẫy: thêm nguồn ngoài (CDN / API mới) phải sửa thẻ CSP; nâng thư viện phải tính lại dấu — không thì app không nạp thư viện đó.

### 15/11/2026 — TK 2 · PHIÊN (3.550 đợt 3 phần 1: E6 · F5 · F2)
- Kế hoạch đợt 3 ở `DANH_GIA_CHUYEN_GIA_1511.md` mục 4d (A5 đề xuất hoãn — 2 kênh chung kho trình duyệt). 3.550: manifest + biểu tượng TH, `--vh` = 100dvh (25 chỗ), `docs/mau-giao-dien.html` (15 mảnh từ GD.*). Sửa lớp CSS thiếu ở hộp 🧪 (3.546). t406 7/7.
- Kiểm GitHub (B4): t244 / t260 / t395 trượt do phông DejaVu → workflow cài Inter + fontconfig như máy làm việc (edfcd50). Chờ lượt kiểm PR kế tiếp xác nhận xanh trước 3.551 (CSP).

### 15/11/2026 — TK 2 · PHIÊN (3.549 C5 CLT02)
- `js/95-clt02.js` (`CLT`): mỗi xã × (tháng | định kỳ) = 1 ô loại động `cltT_<MÃ>` / `cltDK_<MÃ>` (MÃ = tên xã bỏ dấu); ghép tổ app theo xã + Hội + tên tổ trưởng, không ghép → cảnh báo. File thật Gia Lộc 31/10 đọc đúng (khớp Tổng cộng) — chỉ thử ở thư mục nháp. t405 8/8.
- Bẫy: loại động phải đăng ký trước `slBo0` / `veSoLieu` (CLT.dongBo đọc KHO.dsBang()) — rút gói thì ô CLT02 đã nạp không hiện (dữ liệu vẫn trong kho).

### 15/11/2026 — TK 2 · PHIÊN (3.548 đợt 2: A2 · A3 · E1 · E2)
- `js/94-may-that.js` (`MTH`): 1 file Drive `Tủ hồ sơ/_Hệ thống/may_that.json` gom kết quả thử (A2) + lỗi đã che (A3) + bản từng máy. **Phiên AI sau: đọc file này đầu phiên.** E1 khóa tab (BroadcastChannel, tab sau chỉ xem), E2 tự xin lưu bền. t404 9/9.
- Bẫy: E1 tắt khi trình duyệt tự động (navigator.webdriver) để phép thử cũ mở nhiều trang không bị khóa — phép thử E1 bật bằng cờ `tuhoso_e1_thu`.
- Tiếp: 3.549 CLT02 (anh: nạp theo xã, 2 loại tháng + định kỳ).

### 15/11/2026 — TK 2 · PHIÊN (3.547 Nạp & KT báo gọn)
- Anh "code gọn nạp và gộp": bỏ dòng ↗ lặp, bảng số đối chiếu gập (lệch thì mở), khối 🏦 Tổ trưởng 1 dòng; giải thích vào chữ rê chuột. Không bỏ chức năng. Màn mẫu dữ liệu giả 2.600 → 900 px.

### 15/11/2026 — TK 2 · PHIÊN (3.546 A1 + B4 — xong đợt 1 đánh giá)
- Anh "code cả 2 và gộp": A1 `js/93-moc-vang.js` (`MVG`) 🧪 Kiểm mốc — đáp án Drive `Tủ hồ sơ/Mốc vàng/VANG_DOI_CHIEU_(MON_)APP_2026-10-31.csv` (TK 2 chép từ App_that); B4 `.github/workflows/kiem-pr.yml` + `tools/kiem_pr.sh` (mốc của main, 4 phần, trượt chạy lại 1 lần). t403 6/6.
- Anh 15/11: "đối chiếu, kiểm tra đã chuẩn dần — không cần ghi quá chi tiết ở Nạp & KT, có thể báo nhưng đơn giản lại" → kết quả 🧪 1 dòng / mốc, chi tiết gập. Phần cũ dài ở Nạp & KT (khối 🏦 Tổ trưởng 3 dòng + 2 dòng chữ xám; Kết quả kiểm tra mở ra) → trình phương án gọn, chờ anh duyệt.
- Bẫy: B4 chạy lần đầu trên GitHub chưa thấy kết quả thật (máy này không chạy được Actions) — xem dấu "Kiểm PR" ở PR đầu tiên.

### 15/11/2026 — TK 2 · PHIÊN (3.545 A4 nhắc bản mới)
- Hồi quy đủ 3.543: 276/279 — 3 trượt (t241, t315, t398) do lọc ĐT thu gọn 3.541 (chủ ý) → sửa phép thử (PR #568); hồi quy theo đổi 3.544 279/279.
- Anh "code A4 và gộp": `js/92-ban-moi.js` (`BMN`) hỏi bản máy chủ (mở +5 s, 30 phút, quay lại tab), dải `#dai-ban` + ⟳ Cập nhật ngay; bọc `slDCXuat` chặn xuất khi bản cũ. t402 10/10.
- Anh đang nhờ TK 1 đánh giá lại app → TK 2 theo dõi hộp thư / nhánh TK 1, nhận việc qua anh duyệt.
- Bẫy: phép thử mở app bằng file:// → BMN không hỏi (cố ý); muốn thử phải chạy qua http (t402 tự dựng máy chủ).

### 15/11/2026 — TK 2 · PHIÊN (3.544 Ngày CNQH gần nhất)
- 2 mốc 3.543 xuất xong: File 2 khớp GB (30/09 tuyệt đối; 31/10 trừ ngày hết khoanh GB trống — TK 1 đã sửa GB 1.12). Ngày khoanh: NOKHOANH hệ thống không có cột Ngày hiệu lực → trống.
- PR #565 TK 1 xung đột hộp thư → gộp nhánh TK 1 vào nhánh TK 2 (không sửa nhánh TK 1). 3.544 `slDCNgayCQH`. Hồi quy đủ 3.543 đang chạy.

### 15/11/2026 — TK 2 · PHIÊN (3.543 File 2 ngày theo hệ thống)
- TK 1 hết hạn mức → TK 2 tự so File 2 31/10: 687 = 687, khớp trừ ngày (hết khoanh GB trống 30; chuyển QH 3). Anh chốt 3 ngày theo file hệ thống. 3.543: ncqh Sao kê NQH, cột 20 ngay_khoanh. Laptop anh chạy app 3.519 (cũ) — đã hướng dẫn Ctrl+Shift+R; kỳ 25/10 còn trên laptop chờ anh thử lại.

### 15/11/2026 — TK 2 · PHIÊN (3.542 Đ2 nốt)
- Anh "gộp và tiếp": gộp 3.541; 3.542 nhóm chip KTGS / Tổ TK&VV 1 dòng cuộn. Đ2 xong phần TK 2 đề xuất — chờ anh thử iPhone thật → Đ3 (gỡ dt.html).

### 15/11/2026 — TK 2 · PHIÊN (3.541 điện thoại Đ2 — vuốt iPhone)
- Anh "tinh chỉnh cho màn iPhone, tận dụng vuốt mượt": `DTM.vuotTab` (vuốt ngang 4 tab), `DTM.vuotHop` (vuốt xuống đóng hộp), lọc gọn mọi `.pv-cay`, chip GDX 1 dòng (khung chip là display:contents trên ĐT — ép flex), nút ≥ 34 px. Chưa thử Safari thật — chờ anh.
- Bẫy: vuốt tab bỏ qua mép 24 px (vuốt lùi Safari), bảng / ô nhập / hàng cuộn ngang.

### 15/11/2026 — TK 2 · PHIÊN (3.540 QT-C-20 gia hạn tối đa + theo PR #560 TK 1)
- Anh chỉ QĐ 54 trên Drive → đọc tài liệu tập huấn QĐ 54 + VB 7442 (mục 1 thời gian gia hạn) → anh "cứ code và nội suy": `skGHToiDa` (HSSV ½ thời hạn trả nợ, nội suy khi thiếu ngày ra trường; NOXH 12/24; ngắn hạn 12; khác ½). Sổ luật 1.12, gạch C9.
- Theo PR #560 (TK 1, chưa gộp): mã điểm đủ `TXN…`, số tháng lãi tháng lịch. Bẫy: số tháng lãi giờ là chuỗi `n.n`.

### 15/11/2026 — TK 2 · PHIÊN (3.539 File 2 danh sách món)
- Anh "gộp và tiếp": gộp 3.538 (xử lý xung đột hộp thư với PR #557 TK 1 — giữ cả 2 dòng). 3.539: `slDCMonTinh` / `slDCMonCsv` — File 2 khuôn 1.1. Chờ TK 1 xác nhận 3 cách hiểu (hộp thư 15/11) + anh xuất lại 31/10.

### 15/11/2026 — TK 2 · PHIÊN (3.538 khuôn số liệu chung 1.0)
- Anh gộp PR #555 (TK 1: `docs/KHUON_SO_LIEU_CHUNG.md`) + "tiếp TK 1 nhờ": `slDCDiem` (mã điểm 4 số), TT `so_tv` = khách còn dư nợ. t325 +3. Chờ: anh thử 3.537 iPhone; File 2 (1.1) chờ khuôn TK 1.

### 14/11/2026 — TK 2 · PHIÊN (3.537 sửa lọc địa bàn iPhone)
- Ảnh iPhone anh: lọc gọn nhưng bấm không mở, thanh dưới kiểu cũ ⇒ JS điện thoại không khởi động (CSS có). Sửa: `dtmKhoi()` chạy lại khi tải xong / đổi cỡ; CSS gọn chỉ khi `body.dtm-on`. Bẫy: không thử được Safari thật — chờ anh xác nhận thanh dưới mới hiện.

### 14/11/2026 — TK 2 · PHIÊN (3.536 VB đã xem giữ trong ngày trên điện thoại)
- Anh "gộp và làm tiếp": rà Hôm nay / Scan / ☰ trên 390 px — ổn. Anh bỏ ý tải sẵn (5G đủ nhanh) → "giữ trong ngày thôi": VB đã xem cất máy trong ngày, ngày mới tự dọn (chỉ VB đã lên Drive). Chờ anh dùng thật góp ý → Đ2 tiếp; Đ3 gỡ dt.html.

### 14/11/2026 — TK 2 · PHIÊN (3.535 điện thoại Đ1)
- Anh: điện thoại đang lỗi, giao diện riêng (dt.html) không ổn; dùng nhiều nhất xem VB + tra cứu KH; muốn đọc nhanh VB đã lưu, gửi cả VB / 1 trang. Hướng: 1 bản app tự gọn ≤ 600 px; Đ3 gỡ dt.html khi ổn.
- 3.535: `DTM` (js/66) + css/dt-may.css — Tra cứu 1 ô tìm, lọc gọn bấm mở, 📞 Gọi; Văn bản thẻ gọn, 📤 Gửi trang này / Gửi cả VB; ẩn nút 📱 nổi. t401 mới.
- Chờ anh: ảnh lỗi điện thoại thật (chưa thấy được lỗi anh gặp); thử máy thật → Đ2.

### 14/11/2026 — TK 2 · PHIÊN (3.534 tinh gọn đợt 1)
- Bỏ ô Công cụ 6 + nút 📦 Mini app (giữ lõi mini — bản điện thoại dùng). Rà sâu: OCR tiếng Việt (đọc lại gợi ý tên, chép chữ trang ảnh), Cắt ảnh CCCD từ PDF / Rà CCCD (3.271 anh chốt) dính chức năng đang dùng → KHÔNG xóa, chờ anh quyết lại. Bẫy: napOCR còn dùng đọc mã máy CCCD (js/41) — không gỡ.

### 14/11/2026 — TK 2 · PHIÊN (đóng so 2 mốc · bắt đầu tinh gọn)
- TK 1 xác nhận 3.533 = GB toàn bộ 2 mốc → đóng. Tổ viên theo Mẫu 01/TV giữ nguyên.
- Tinh gọn: anh chọn bỏ 5 mục (ô Công cụ 6, Mini app GDX, OCR/cầu nối Windows, Cắt ảnh CCCD từ PDF cũ, Rà CCCD đã lưu). dt.html / Thư viện / Biểu mẫu: TK 2 mô tả sai lúc hỏi (là bản điện thoại / dữ liệu anh) → giữ, chờ anh xác nhận lại.

### 14/11/2026 — TK 2 · PHIÊN (2 mốc 3.533 khớp giao ban)
- Anh xuất 2 mốc bằng 3.533 → TK 2 chép `App_that`. Chỉ 2 tổ đổi đúng số; tổng lãi tồn = GB (31/10 lệch 4 đ làm tròn). TK 1 hết hạn mức → chờ xác nhận lần cuối, đóng việc so 2 mốc.

### 14/11/2026 — TK 2 · PHIÊN (3.533 lãi tồn: ngày GD sau ngày số liệu)
- TK 1 dò: 2 món lệch do Ngày GD gần nhất sau ngày số liệu (Mẫu 31 xuất muộn), không do lãi suất. 3.533: số ngày dồn ≤ 0 → lãi dồn 0, giữ TH. Chờ anh gộp → xuất lại 2 mốc → TK 1 xác nhận khớp toàn bộ.
- Bẫy: `soNgay` trả null khi không đọc được ngày (đừng dùng −1).

### 14/11/2026 — TK 2 · PHIÊN (3.532 lãi tồn món không có lãi suất)
- TK 1: 3.531 đạt (tiền gửi 20/20 Hội; giữ trừ lãi dồn mọi kỳ). Còn 2 tổ app thấp hơn GB ~1,7 tr. TK 2 không tải được Mẫu 31 thật (23 MB > giới hạn) → suy từ mã: món không có lãi suất bị bỏ hết TH, giao ban giữ (lãi dồn 0). 3.532 sửa; chờ TK 1 xác nhận số KU + anh gộp, xuất lại.
- Bẫy: file cũ không có cột lãi suất giữ cách cũ (`coCot`).

### 14/11/2026 — TK 2 · PHIÊN (xuất lại 2 mốc bằng 3.531)
- Đã làm: chép 2 file 3.531 vào `App_that`. 31/10 khớp GB theo ngày; 30/09 tiền gửi = GB, lãi tồn bị trừ lãi dồn (−63,1 tr so GB, gần TW hơn).
- Chờ ai: TK 1 so 30/09 với BC0438 → quyết có trừ lãi dồn file chốt tháng không (anh duyệt). Không tự sửa trước.

### 14/11/2026 — TK 2 · PHIÊN (3.531 lãi tồn + tiền gửi đúng hàm giao ban)
- TK 1 gửi quy tắc `lai_ton_ngay` + `mon_vay`. 3.531: `toLaiTonNgay` (phiên theo dòng, `toGdxaTruoc`, /360, trừ một phần), `slT105To` (khóa sổ lần đầu, `B.hsGoc`) cho `toSoTo`. Chờ "gộp" → anh xuất lại 2 mốc → TK 1 so TW.

### 14/11/2026 — TK 2 · PHIÊN (3.530 lãi tồn xét theo số tiền từng món)
- Anh xuất lại 2 mốc bằng 3.528 → 31/10 bị nhận nhầm chốt thật (26% < 50%). 3.530: `toLaiTonNgay` 2 tầng theo số tiền (TH ≤ lãi dồn = th × ls × ngày/36500). Phép thử chung 1.4 (C03-2). Chờ "gộp" 3.529 + 3.530; sau đó anh xuất lại, TK 1 so TW.
- Bẫy: dòng Mẫu 31 thiếu `ls` → theo tầng file; `_ltDon` lưu trên mảng dòng (xét 1 lần).

### 14/11/2026 — TK 2 · PHIÊN (3.529 dọn hàm trùng — anh vắng, "làm tiếp tối ưu" + "dần tinh gọn bỏ chức năng thừa")
- 3.527 + 3.528 gộp (PR #547). 3.529: `ghepPDFVao` (js/04e) + `pbNguon` thay bản chép (hàm trùng 2 → 0). Chờ "gộp".
- Đang lập danh sách đề xuất bỏ chức năng thừa (chờ anh duyệt từng mục — không tự xóa). Chờ anh xuất lại 2 mốc (3.528) cho TK 1.

### 14/11/2026 — TK 2 · PHIÊN (3.528 cỡ chữ tự động theo cỡ màn)
- Màn anh: 24" 1920 (nhà), 1600×900 100% (cơ quan), laptop 17" 125% (~1536×730). Anh: không tự ẩn nút; "em nên tự nhận và tối ưu cỡ chữ" → `coTu` (mặc định) + `coTuDong` / `coApDung` (js/06), resize. t400 mới; t260 thêm 3 cỡ màn (84/84).

### 14/11/2026 — TK 2 · PHIÊN (3.527 lãi tồn theo kết quả TK 1 so TW)
- 3.526 gộp (PR #546). TK 1 so app thật với TW BC0438: tiền gửi đạt (còn lệch nhỏ), lãi tồn 30/09 + 31/10 lỗi app. 3.527: `toLaiTonNgay` ngày phiên theo dòng (Ngày GDXA) + chỉ bỏ lãi dồn khi file có lãi dồn (≥ 50%). Tiền gửi lệch nhỏ chưa sửa — hỏi TK 1 khóa "mỗi sổ".
- Đang dở: tinh chỉnh giao diện 3 cỡ màn (24" 1920, laptop 17" 125% = 1536×730, màn 17" cơ quan) — đã chụp, chưa đề xuất.

### 14/11/2026 — TK 2 · PHIÊN (3.525 file đối chiếu ghi giờ / File Tổ trưởng · 3.526 chọn File Tổ trưởng theo ngày + sửa khung lọc)
- 3.524 + 3.525 gộp (PR #545, anh "gộp trước" khi hồi quy đang chạy) → hồi quy đủ trượt t162 / t260 / t278 (khung lọc tràn khi nhiều ô / chế độ Chip) → sửa ở 3.526.
- Anh xuất 2 file đối chiếu bằng app thật; T10 bị chặn QT-C-09 → nguyên nhân `dsChonKy` xếp chữ ('2026-10' trước '2026-10-25') → chọn nhầm bản ngày 30/10. Sửa `dsSoKy` theo ngày (Danh sách tổ, TK 104 / 105). TK 2 chép 2 file vào Drive giao ban `App_that`, ghi hộp thư cho TK 1.
- Bẫy: so kỳ bằng chữ sai khi trộn kỳ tháng 'YYYY-MM' với kỳ ngày 'YYYY-MM-DD' — dùng `dsNgayKy`.

### 14/11/2026 — TK 2 · PHIÊN (3.524 gọn giao diện các tab còn lại — anh "code hết 1 lần và gộp")
- Đã gộp 3.523 (PR #544). 3.524: khung LỌC ĐỊA BÀN 1 hàng (CSS ≥ 1100px, `.pv-dau{display:contents}` + order; ô chọn co 96–168px), thanh Nạp & KT 1 hàng, chip Nguồn vốn nhỏ, chữ gợi ý Tra cứu ngắn. t398 mới. Hồi quy đủ.
- Không làm theo đề xuất gốc 2 ý vì trái quyết định anh đã chốt: dời Nguồn vốn xuống dưới lọc (3.157 / 11/10) và thu nhỏ chip Tìm theo (3.383 "nổi hơn") — báo anh.
- Bẫy: luật lề cũ `.pv-cay .loc-khoi.co-dau{padding-top:17px;margin-top:14px}` + `body.ngan7 #tr7 .pv-cay .loc-khoi` — muốn đổi lề phải thắng 2 luật này.

### 14/11/2026 — TK 2 · PHIÊN (3.523 Kiểm tra sau 30 ngày — chọn tổ + cột mới)
- Đã gộp 3.522 (PR #543, hồi quy đủ 276/276). Làm 3.523 theo ảnh anh: ô tích tổ + Chọn hết (`KT_GN_BO_TO`), ấp theo `KT_K`, cột Ngày GN / Hạn KT / Mục đích, căn cột. t397 mới. Hồi quy theo đổi. Chờ anh "gộp".

### 14/11/2026 — TK 2 · PHIÊN (3.522 lãi tồn cuối tháng + tiền gửi sổ trên KU hủy — anh "ok code theo em")
- Theo KQ so 2 mốc của TK 1. A: anh chốt bỏ lãi dồn cả file cuối tháng → `toLaiTonNgay` mọi kỳ, `KHO.monGN` qua `toNap`. B: `slHuyLap` (js/22) giữ sổ trên dòng KU hủy vào `B.lap`. Phép thử chung 1.3 (C03-1 sửa ngày GD, thêm C03-2). t396 mới, t352 sửa. Hồi quy đủ. Chờ anh "gộp"; sau đó TK 1 so lại.
- Bước tiếp: 3.523 màn Kiểm tra sau 30 ngày (anh duyệt: cột Ngày GN, Mục đích, Hạn KT, ấp, tích tổ / chọn hết, căn cột).
- Bẫy: Mẫu 31 dòng lặp `B.lap` giờ có thêm dòng `_huy` (không `ku`) — chỗ nào đếm dòng lặp theo số dòng thì lọc `_huy`.

### 14/11/2026 — TK 2 · PHIÊN (phối hợp 2 mốc 30/09 + 31/10 — anh "em và TK giao ban phối hợp làm")
- Đã gộp 3.521 (PR #541). Đọc trạng thái phối hợp: kế hoạch 2 mốc (PR #542, phiên đánh giá). Anh: 30/09 tổ chưa gộp, 31/10 đã gộp → sửa B0 / B3 kế hoạch + 1 dòng hộp thư cho TK 1. Chỉ tài liệu, không lên bản.
- Kiểm `slDCXuat`: không File Tổ trưởng → vẫn xuất (điểm GD dự phòng); File Tổ trưởng khác ngày → chặn (QT-C-09) — đúng ý mốc 30/09, không sửa code.
- Chờ: anh bấm 📤 xuất 2 mốc (B1); TK 1 B2–B4. Bước tiếp phía app: B5 khi có bảng lệch.

### 14/11/2026 — TK 2 · PHIÊN (3.521 gọn chip các tab — anh "gộp và code 4 ý")
- Đã gộp 3.520 (PR #540). Làm **3.521**: Sổ hộ vay (bảng 493 → 338px), GDX (khung chip 134 → 93px), Phân bổ KH (6 nút 1 nhóm nhỏ), Hồ sơ (chip mẫu nhỏ). t395 mới; t245 sửa. Chờ anh "gộp".

### 14/11/2026 — TK 2 · PHIÊN (3.520 dọn code KTGS — anh "ok")
- Anh "tiếp tục" → em đề xuất 4 việc, anh "ok" (việc 1 dọn KTGS trước, việc 2 rà chip các tab — đo + đề xuất).
- Đã làm **3.520**: xóa 36 hàm + 6 lớp CSS chết (rac.js); phát hiện ↺ Gợi ý lại ở Kiểm tra tổ (3.514) không ra lượt khác → sửa `KTTO.lai`. Sửa 9 phép thử sang KTTO. Chờ anh "gộp".

### 12/11/2026 — TK 2 · PHIÊN (3.519 nút đổi chữ che ô Tên văn bản)
- Anh gửi ảnh: "tab văn bản bị che, em ghi nhận sửa 1 lần". Đo lại: nút đặt nổi đè ô nhập. Sửa: nhãn + nút 1 hàng flex, nút nhỏ. t394 (3 bề rộng + tối). Chờ anh "gộp".

### 12/11/2026 — TK 2 · PHIÊN (3.518 nhận kế hoạch đã chốt về mã xã mới — anh "code và gộp")
- Anh: "bản cũ anh đã chốt nhưng chuyển qua bản mới làm lại báo chưa chốt". Kiểm: không code nào đổi trạng thái chốt khi lên bản; nghi mã xã đổi sau sáp nhập 01/7 (suy luận — chờ anh gửi ảnh 🔎).
- Đã làm **3.518**: nút ↪ Nhận về xã / Hội hiện tại trong 🔎 (t393 9 ý). Chờ anh: dùng trên máy thật, báo lại.

### 11/11/2026 — TK 2 · PHIÊN (3.517 Kế hoạch năm lập theo Mẫu 31 đầu năm — anh "code và gộp")
- Anh: "KH năm lấy theo Mẫu 31 đầu năm" · "khi lập, còn in số liệu thì lấy đúng tháng KH". Em chốt hiểu: đầu năm = chốt 31/12 năm trước; in theo tháng giữ luật cũ (cuối tháng liền trước tháng kiểm tra) — anh "code và gộp" không sửa.
- Đã làm **3.517** (`js/80b`, t392 15 ý, t125 sửa). Tổ gộp / mới so với Mẫu 31 mới nhất chỉ cảnh báo.

### 11/11/2026 — TK 2 · PHIÊN (3.516 Kế hoạch năm theo Mẫu 31 mới nhất — anh "code")
- Anh báo kế hoạch đã chốt nay "chưa lưu" (ảnh: Gia Lộc · Đoàn TN, nháp 11/11, chưa chốt, 2 tổ không còn trong số liệu). Đối chiếu diff: 3.513–3.515 không đụng chỗ lưu KH → bản chốt (nếu có) ở khóa năm / mã xã / mã Hội khác hoặc máy khác.
- Anh chốt: kế hoạch phải lưu + chạy theo Mẫu 31 hàng tháng; hiện đúng tổ hiện tại (đã gộp); tổ đã gộp chỉ cảnh báo. Đã làm **3.516** (gói `js/80b`, t392 13 ý). Chờ anh: bấm 🔎 Kế hoạch đã lưu trên máy thật để tìm bản chốt cũ; nếu bản chốt nằm ở mã xã / Hội cũ → đề xuất "nhận về mã mới" (chưa làm).

### 11/11/2026 — TK 2 · PHIÊN (3.515 KTGS gọn chỗ chip — anh "code và gộp")
- Anh: "rà soát giao diện tối ưu tránh chiếm quá nhiều chỗ của các chip" → em đo 5 màn KTGS (1366×768), đề xuất 6 ý chỉ trong KTGS → anh "code và gộp".
- Đã làm: **3.515** — CSS chỉ trong `#kt-the`; khung chọn hộ 1 hàng, chip nhãn ngắn (tên đủ ở title), ▾ Hộ chữ nhỏ; Sau 30 ngày chip Lần 1 lên hàng tháng (`ktGNVeLai` dời phần tử), nhắc 30 ngày vào dòng đếm. t391 đo chiều cao.
- Chưa làm (anh chưa chốt): rà chip các tab khác (Tổ TK&VV, Sao kê, GDX…).

### 11/11/2026 — TK 2 · PHIÊN (3.514 KTGS 5 nút + Kiểm tra tổ nhiều tổ — anh "code và gộp")
- Anh chốt qua nhiều lượt: 5 nút (Kiểm tra tổ · sau 30 ngày · Kiểm tra Hội · Kế hoạch năm · Khai báo); Định kỳ + Mẫu 04 gộp Kiểm tra tổ (chọn nhiều tổ); Kế hoạch năm để riêng, không nối; kiểu chọn hộ tốt / cần quan tâm / Trung hòa 30% / hết tổ; món xét đúng luật + nút kiểu 2; 1 ô ngày chung; số hộ + Trung hòa vào Khai báo; Esc lùi 1 cấp; BC0437 thiếu tháng → để trống.
- Đã làm: **3.514** — gói mới `js/80-ktgs-to.js` (`KTTO`), `docs/BAN_GIAO_KTGS.md` mục 12. t390 mới (28 ý, có so bản in Định kỳ cũ giống hệt); sửa 16 phép thử cũ theo màn mới (phần số liệu / bản in giữ).
- Quyết định TK 2 (báo anh): bộ khai báo mặc định ① Hội kiểm tra mọi chỗ (trước đột xuất mặc định ②); Kiểm tra tổ chưa khai ngày → phiếu ghi tháng kiểm tra như Định kỳ cũ (trước đột xuất để chấm cả tháng).
- Việc sau: dọn hàm màn cũ không còn gọi (`ktDKVe`, `ktBCVe`, `ktChonHTML`…) — cần anh duyệt.

### 11/11/2026 — TK 2 · PHIÊN (3.513 KTGS tinh gọn — anh "code và gộp")
- Đã làm: **3.513** theo phương án dưới — Mẫu 04 + Sau giải ngân chuyển sang Kỳ đầu trang; BC0437/0438 kỳ ngày giữa tháng → cuối tháng trước (`ktBCKyChon`); hàng nút 1 tổ = Tóm tắt · 06 · 15/TD · 16; bỏ nút lặp (Mẫu 04 ở 1 tổ, Tóm tắt + 15/TD ở Định kỳ — hàm giữ); dòng 📌 Số liệu mỗi màn (`ktSLDong`). `KHO.monGN(th, ky)` thêm tham số tùy chọn (chỉ KTGS gọi). t389 mới; sửa t106, t237, t238, t273, t318. `docs/BAN_GIAO_KTGS.md` mục 11.
- Chờ anh: thử máy thật 3.513 (bảng thử trong BAN_GIAO_VIEC_CON_LAI). Bẫy: khoảng Sau GN lưu cũ (`gnTu/gnDen`) chỉ dùng khi anh tự đổi ô trong kỳ đang chọn (`KT_GN_KY`, phiên) — đổi kỳ đầu trang là về tháng kỳ mới.

### 11/11/2026 — TK 2 · PHIÊN (KTGS tinh gọn — PHƯƠNG ÁN ĐÃ ĐỦ, chờ anh "code")
- Anh chốt thêm: "lấy ngày chọn, ví dụ chấm điểm ngày không có thì lấy cuối tháng trước" · "kiểm tra sau giải ngân 30 ngày ví dụ chọn kỳ 31/5 thì hiện tất cả các món giải ngân trong tháng 5" · "không có phiếu kiểm tra 3 tháng".
- **Luật số liệu:** ① GIỮ NHƯ CŨ: Kế hoạch năm 01/KH + Định kỳ 06 + 16 (tích tổ theo lịch) — cuối tháng liền trước tháng kiểm tra. ② THEO KỲ CHỌN (ô kỳ đầu trang): 06 Sau giải ngân = món giải ngân trong tháng của kỳ chọn, đến ngày chọn (31/5 → 01–31/5; 15/6 → 01–15/6), ô từ–đến tháng giữ (mặc định = tháng kỳ chọn); hàng nút 1 tổ (Tóm tắt · 06/TD · 15/TD · 16/TD), Mẫu 04, 03/BB-CX = Mẫu 31 đúng ngày chọn; số liệu chỉ có theo tháng (chấm điểm / xếp loại BC0437, BC0438…) → cuối tháng liền trước ngày chọn.
- **Gọn giao diện (không bỏ chức năng):** hàng nút 1 tổ đúng 4 mẫu; bỏ nút lặp (15/TD + Tóm tắt ở Định kỳ, Mẫu 04 ở hàng 1 tổ); giữ Hội cấp xã, Kế hoạch năm, Sau giải ngân, Khai báo; mỗi màn 1 dòng "📌 Số liệu: Mẫu 31 ngày … · chấm điểm BC0437 …".
- Không đổi bản in (06 / 16 / 04 / 01/KH chuẩn khóa), khai báo, dữ liệu lưu. Phép thử: so bản in nhóm giữ như cũ giống hệt; ngày giữa tháng → Mẫu 31 đúng ngày + chấm điểm cuối tháng trước; Sau giải ngân theo tháng kỳ chọn; sửa phép thử KTGS; hồi quy đủ.

### 11/11/2026 — TK 2 · PHIÊN (bàn KTGS — CHƯA CODE, anh "phần này sẽ bàn kỹ rồi làm")
- Anh 11/11: "chỗ KTGS anh đang rối… kiểm tra định kỳ năm theo kế hoạch thì ổn không nên thay đổi, các chỗ kiểm tra khác muốn gom lại cho tiện" → "tạm thời không phân chia bắt buộc hay định kỳ mà thống nhất cách lấy số liệu của các mẫu cho gọn; kiểm tra KH năm lấy dữ liệu như cũ, phiếu kiểm tra 3 tháng cũng vậy, các mẫu khác theo dữ liệu chọn" · "khi chọn tổ cho in các mẫu Tóm tắt, 06TD, 15TD, 16TD" · "nút Hội cấp xã Mẫu 03CX vẫn giữ… gom lại không bỏ chức năng".
- **Phương án đang bàn (chưa duyệt):** ① KH năm 01/KH + Định kỳ 06 + 16 → như cũ (cuối tháng liền trước tháng KT) · ② 06 Sau giải ngân → như cũ (TK 2 hiểu "phiếu 3 tháng" = phiếu này — **chưa xác nhận**) · ③ mọi mẫu khác theo kỳ đang chọn (ô kỳ đầu trang, đúng ngày): hàng nút khi chọn 1 tổ = Tóm tắt · 06/TD · 15/TD · 16/TD; Mẫu 04 (thẻ Báo cáo tổng hợp); 03/BB-CX (giữ khối Hội cấp xã). Bỏ nút lặp (15/TD, Tóm tắt ở Định kỳ; Mẫu 04 ở hàng 1 tổ) — chức năng vẫn còn chỗ khác; mỗi màn 1 dòng "📌 Số liệu: …". Không đổi bản in / khai báo / dữ liệu lưu.
- Cần chốt khi bàn: "phiếu kiểm tra 3 tháng" là mẫu nào; Mẫu 04 theo kỳ chọn hay giữ cuối tháng; kỳ chọn ngày giữa tháng thì lấy đúng ngày.
- Chỗ code liên quan: `ktNguonVoi` / `ktNguonThangKT` / `ktDKThang` (js/56, js/22e), `ktBCVe` (js/22d), `kt7Chay` (js/56b), `ktttInDs` (js/71), hàng nút khối B (js/22b dòng ~415).

### 10/11/2026 — TK 2 · NHẬN VAI App chính (từ TK 3, anh 10/11 "đọc trạng thái làm tiếp của TK bàn giao")
- Đã đọc: mục TK 3 10/11 (NHẬN VAI, 3.510, 3.511 — mục 3.511 chép từ nhánh `claude/busy-curie-2qescm` chưa gộp) + CHANGELOG 3.510–3.511. Nhánh TK 3: nháp 3.512 (nút kiêm chỉ biểu tượng) TK 3 đã tự hoàn lại theo anh "giữ như cũ" — không có code dở.
- Trạng thái nhận: `main` = **3.511** (PR #531), `kiem.py` trong mốc. Số bản tiếp theo = **3.512**.
- Chờ anh (từ TK 3): thử máy thật 3.510–3.511 (03/GDX Tổ GD khung cố định, 💾 phiên theo điểm, ô chọn cán bộ, kiêm theo vai); giờ phiên thật (tạm 07:30–11:00); mẫu chấm công / xăng / lệnh điều xe nếu có (đọc qua `g4PhanCong`).
- Việc còn treo (từ TK 2 trước): GDX 01/02/04/05/13 · 01–03/KH (làm bằng `MAU_IN`, cần mẫu gốc) · đợt chuẩn hóa đề xuất 09/11 (onclick, mô tả sổ cấu hình, tách js/26) chờ anh duyệt.

### 10/11/2026 — TK 3 · PHIÊN (3.511 gộp #531)
- Đã làm: Tổ GD ô chọn từ danh sách khai báo cán bộ (loại trừ, trừ Tổ trưởng ↔ KSV); kiêm theo vai (Tổ trưởng: Bảo vệ · KSV / GDV: Lái xe · GDV chính: không); bỏ mục Phương án đi đường PA 1/2/3 (anh "chưa cần"). Hồi quy theo đổi đạt.
- Chờ anh: thử máy thật 3.510–3.511.

### 10/11/2026 — TK 3 · PHIÊN (3.510 gộp #530)
- Đã làm: 03/GDX 👥 Tổ GD khung cố định (Tổ trưởng · KSV ＋ · GDV chính · GDV ×3 ＋/×; kiêm 🚗 Lái xe · 🛡 Bảo vệ; loại trừ, chỉ Tổ trưởng kiêm KSV) · 💾 phiên theo điểm + ngày (`gdx.g4Phien`, v = 1, giờ cố định ⚙, km theo điểm), xem theo tháng, Mở / 🖨 12/GDX, ⚠ thiếu phiên từ 11/2026 + khai bổ sung, `g4PhanCong` + 📊 Excel tháng. Hồi quy theo đổi đạt.
- Chờ anh: thử máy thật 3.510; giờ phiên thật (mặc định tạm 07:30–11:00); mẫu chấm công / xăng / lệnh điều xe nếu có — dữ liệu đọc qua `g4PhanCong`.
- Bẫy: bộ lọc địa bàn GDX (`gdxCH().diem`) ghi đè điểm 12/GDX (`gdxTheoLoc`) — mở phiên phải đặt cả bộ lọc (`g4PhienDiem`). Container mới thiếu `tests/lib`, `tests/gia*` → dựng theo `tests/README.md` mục Chuẩn bị trước khi chạy hồi quy.

### 10/11/2026 — TK 3 · NHẬN VAI App chính (từ TK 2, anh 10/11 "em nhận vai, và làm trước mẫu 03 theo dạng khung cố định…")
- Đã đọc: mục TK 2 08/11 (3.489–3.504) + CHANGELOG 3.505–3.509. Trạng thái nhận: `main` = **3.509**, không code dở.
- Việc đầu: 03/GDX › 👥 Tổ giao dịch — khung cố định theo thứ tự Tổ trưởng · KSV · GDV chính · GDV (thay khai từng người + chip vai).
- Số bản tiếp theo = 3.510.

### 08/11/2026 22:40 — TK 2 · PHIÊN (3.503 → 3.504, Đợt 2 — anh "làm đợt tiếp theo, gom 1 lần tất cả")
- Đã làm: 3.503 khung mẫu in chung `MAU_IN` (js/31b; 15/TD · 03/BB-CX chuyển sang, bản in + thân Word giống hệt; bỏ móc `KT_DOCX_THEM` ở lõi Word KTGS; t384). 3.504 thử nhanh QT-19/20/22 + khung (`tests/nhanh`, 48/48) · bộ giả "giống file thật" `tests/gia_that.js` + t385 → bắt và sửa lỗi tên thôn TOÀN HOA (js/22g `toNap`).
- **Đính chính bản đánh giá 08/11:** "tab Tổ nạp tháng trước khi cần" đã làm từ 3.413 (2.214 → 684 ms); "đọc Excel bằng Web Worker" đã có sẵn ở `slDocSheet` (js/22, lỗi → đọc trực tiếp) — không làm lại.
- Còn lại của bản đánh giá (chưa làm, chờ anh): nạp khi cần các gói lớn (mở app ~1,0–1,2 s trên máy đo — lợi nhỏ, rủi ro thứ tự đăng ký lệnh); tách file > 100 KB làm dần khi sửa tới.
- Bước tiếp: mẫu GDX 01/02/04/05/13, 01–03/KH làm bằng `MAU_IN` (cần khuôn từ mẫu gốc: `tools/khuon_<tên>.py`).
- Lưu ý: khung `MAU_IN.hop` dùng id `mi-dau` / `mi-khung` / `mi-nut`; gói khai `sau:` để giữ xử lý riêng (KTGS: `ktChamMin`).

### 08/11/2026 — TK 2 · PHIÊN (3.489 → 3.502)
- Đã làm (PR #514–#522 đã gộp; chi tiết `docs/CHANGELOG.md`):
  - 3.489–3.496 Giao dịch xã VB 4368 (03, 06, 07, 09, 10, 11, 14, 15/GDX; Tổ GD trực quan; 📘 Nhiệm vụ Tổ GD) · Phân bổ QĐ 4686 (07/KH, 08/KH, Tờ trình 09/KH; Biểu 07 cũ giữ).
  - 3.497 dọn cấu trúc theo QUY_CHUAN (`js/mau/0pb.js`, `js/26c-gdx-to.js`, `pbToTrinh`, QT-19…21).
  - 3.498 KTGS VB 727: 15/TD (cấp tổ) + 03/BB-CX, Word theo khuôn gốc (`tools/khuon_727.py`), `KHO.doiChieu` (QT-22). 3.499 GDX chip mẫu hiện đủ. 3.500 KTGS khối riêng 🏛 Hội cấp xã (03/BB-CX). 3.501 rà tổng thể: sửa hộp 727 không mở lại sau khi đóng, bàn phím.
  - 3.502 Đợt 1 "gọn nền" (anh duyệt 08/11 sau bản đánh giá kiến trúc): CLAUDE.md ngắn + `docs/README.md` (bản đồ tài liệu A/B/C/D) + CHANGELOG tách (cũ → `luu_tru/CHANGELOG_DEN_3110.md`); luật gói mới = 1 không gian tên (`tests/js_cu.json`, thước đo "hàm rời ở gói mới" mốc 0); sổ cấu hình `D.cauHinh` (`tools/so_cau_hinh.py` → `docs/SO_CAU_HINH.md`, `tests/cau_hinh.json`, thước đo "khóa cấu hình chưa ghi sổ" mốc 0).
- Đang dở: không có code dở.
- Bước tiếp (đề xuất trong bản đánh giá 08/11, chờ anh duyệt từng đợt): **Đợt 2** — khung đăng ký mẫu in chung (gộp nền ô / HST / khuôn Word Python) trước khi làm GDX 01/02/04/05/13 và 01–03/KH; thử nhanh mỗi QT (`tests/nhanh`); bộ giả thứ 2 "giống file thật". **Đợt 3** — nạp khi cần gói lớn, đọc Excel bằng Web Worker, tab Tổ nạp tháng trước khi bấm, tách file > 100 KB khi sửa tới.
- Chờ anh: thử Word 15/TD · 03/BB-CX bằng MS Word; số mục I 03/BB-CX với số thật; mẫu 10/KH, 15/KH.
- Lưu ý / bẫy:
  - `dongHop` chỉ ẩn hộp (`#hop` bỏ lớp `hien`) — khung cũ còn trong trang: đừng dùng "có phần tử X" để biết hộp đang mở (lỗi 3.498 → sửa 3.501).
  - hoiquy chạy trên worktree của HEAD: sửa phép thử phải commit trước khi chạy lại; dòng tóm tắt phép thử không được bắt đầu bằng "✗".
  - Khuôn Word: kiểm XML hợp lệ (DOMParser) — LibreOffice / Word không mở file hỏng (3.498 bắt được nhờ đó).

### 06/11/2026 — TK 2 · NHẬN VAI App chính (từ TK 3, anh 06/11 đồng ý)
- Đã đọc: mục BÀN GIAO 06/11 14:00 dưới đây; hộp thư `PHOI_HOP_CHUNG.md` mục 14 (dòng 06/11 TK 3 → TK 2 — đã đánh ✓).
- Trạng thái nhận: `main` = **3.488**, hồi quy đủ 257/257 (theo TK 3). Nhánh làm việc TK 2 `claude/html-app-review-ck346k` đưa về đúng cây `main` (merge giữ cây main, không ép đè).
- **PR #484 (TK 2, 06A chuẩn 10A + nhiều phiếu, số bản 3.460–3.461) ĐÃ ĐÓNG, không gộp** — anh 06/11 đồng ý: TK 3 đã làm cùng việc ở 3.461.x (06A khai báo đủ, in nhiều phiếu, HSN, nút tab Tổ) và dùng số bản 3.460 / 3.461. Việc 06A còn thiếu so với bản TK 2 (nếu có) làm bổ sung trên nền 3.488 khi anh giao.
- Bước tiếp: chờ anh thử máy thật 3.471–3.488; kế hoạch dọn Đ4 (onclick) / Đ7 (dòng >400) làm dần khi đụng file (`docs/KE_HOACH_DON_NEN.md` mục 8).
- Lưu ý: số bản tiếp theo = 3.489.

### 06/11/2026 14:00 — TK 3 · BÀN GIAO vai App chính cho TK 2 (anh 06/11 "em bàn giao cho TK 2 làm tiếp")
- **Trạng thái:** `main` = **3.488** (PR #508–#513 đã gộp). Hồi quy đủ 3.488: **257/257 đạt** (mốc `tests/hoiquy_moc.json` đã cập nhật). `kiem.py` trong mốc (dòng >400 = 159, onclick 467).
- **Đã làm 05–06/11 (3.480–3.488)** — chi tiết `docs/CHANGELOG.md`:
  - 3.480 BBLV: mặc định in 1 mặt (công tắc riêng `D.cauHinh.bblvHaiMat`, KTGS / 06A giữ `ktHaiMat`); sửa "tắt 2 mặt vẫn in 2 mặt" (bấm ô → `hsoHen()` vẽ lại khung xem; bản in mang meta `kt-hai-mat`); bảng nhiều món gọn (3 dòng / món), "đơn vị: đồng", tiêu đề canh giữa; tình trạng ghi ngắn bằng hàm riêng `bblvTT` (anh "dùng hàm riêng cho các loại đặc thù" — `HSN.nhan` dùng chung giữ nguyên); bỏ số tháng nợ trên biên bản.
  - 3.481 bản in bỏ tô nền dòng tiêu đề bảng (BBLV, Mẫu 12/04 GDX, sao kê cấp Hội, tóm tắt KTGS, nội dung họp, TB kết luận). **Giữ** thanh xanh A-/B-/C- của 01/TGTV (anh "01TGTV giữ").
  - 3.482 tab Tổ: chip "Có nợ cần xử lý" tách 3 chip **Nợ quá hạn · Nợ khoanh · 3 tháng KHĐ** (`TO_LOC` js/22g).
  - 3.483–3.484 tab Tổ → nút **📄 BBLV · 📄 06A** (chip QH / khoanh / KHĐ): mở Hồ sơ vay tích sẵn đúng món (`HSN.tuTo`); nhiều tổ → hộp chọn tổ + **🖨 In 1 lần cả danh sách** (Hồ sơ vay chế độ nhiều tổ `HSO.nhieu`, đặc tính mẫu `nhieuTo`, `hsoLap` js/25b gộp `x.ds` từng tổ).
  - 3.485 sổ quy tắc tên (js/49 `TC.loaiMau`) thêm 06A / 06ATD / BBLV — tên file giữ chữ cũ, scan đã ký vào thư mục Hồ sơ vay.
  - 3.486 Hồ sơ vay › BBLV / 06A: bộ lọc tới Hội (ô tổ "— Tất cả tổ —") → bảng chọn món cả Hội nhóm theo tổ (`HSN.pvTo`, `HSN.ds` nhận mảng tổ, `HSN.pvNhieu`), in 1 lần; bảng chọn món hiện đủ cột.
  - 3.487 BBLV gạch dưới tiêu ngữ = kẻ liền `hsoKe` dài đúng dòng tiêu ngữ. 3.488 **bộ in chuẩn** (js/05 `TR_CSS`): `.tr-nd` bỏ `overflow:hidden` → `clip-path:inset(-3mm 0 0 0)` (dấu chữ HOA dòng đầu trang bị cắt ở khung xem trên Windows).
- **Đang dở:** không có code dở. Nhánh `claude/busy-curie-2qescm` = `main`.
- **Chờ anh:** thử máy thật 3.471–3.488 (danh sách từng bản ở `docs/BAN_GIAO_VIEC_CON_LAI.md`); quan trọng: in BBLV / 06A theo Hội, khung xem đủ dấu quốc hiệu trên Windows (em không có máy Windows để thấy tận mắt — kiểm bằng phép thử t366 ý 3.488).
- **Bước tiếp (kế hoạch dọn `docs/KE_HOACH_DON_NEN.md` mục 8, anh duyệt làm tuần tự không hỏi lại):** Đ4 còn 467 onclick dạng phức tạp (làm dần khi đụng file; `tools/doi_onclick.py`, lưới an toàn t374 / t375); Đ7 tách dòng >400 ký tự khi đụng file (đang 159, `kiem.py` chặn tăng).
- **Lưu ý / bẫy:**
  - Luật 05/11 (AGENTS.md mục 3, QUY_CHUAN mục 18): sửa phần dùng chung phải kê chỗ dùng, so đầu ra cũ ↔ mới cả cách viết, hồi quy đủ trước gộp.
  - `hsoVe` (js/25c) đổi tổ / mẫu / kỳ là **tạo `HSO` mới** → muốn tích sẵn sau khi mở Hồ sơ vay từ chỗ khác phải qua `HSO_DEN.ap(t)` (không đặt `HSO.nchon` trước).
  - CSS chung `td:first-child,th:first-child{min-width:150px;position:sticky}` (css/app.css ~1175) áp mọi bảng — bảng mới cần cột đầu hẹp thì bỏ riêng (như `.hsn-bang`).
  - Hồ sơ vay lập theo tổ; chế độ nhiều tổ chỉ cho mẫu có `nhieuTo` (BBLV, 06A).
  - t179 chuẩn khóa so từng ký tự bản in: đổi mẫu đã duyệt thì ghi lại `node tests/chuan_tao.js <tên>` (3.481 ghi lại gdx_m04 / gdx_m12).
  - Force push bị chặn — nhánh đã gộp thì đưa lên bằng `git merge --ff-only origin/main` rồi commit nối tiếp.
  - Phép thử mới: t377 (tab Tổ chip + BBLV / 06A + in theo Hội, 21 ý), t366 thêm ý 1 mặt / 2 mặt / không số tháng / khung xem không cắt dấu.

### 05/11/2026 11:00 — TK 3 · PHIÊN (3.476–3.479 · bài học "sửa cái này không lỗi cái kia")
- Gộp 3.476 (bỏ onclick 1.174 → 467), 3.477 (tab Tổ nhanh hơn, Đ5 rà xong), 3.478 (báo đứt chuỗi QĐ), 3.479 (tên xã hoa đầu từ — lỗi do 3.470 lấy TENXA File Tổ trưởng chữ hoa). Hồi quy đủ 256 đạt.
- **Bẫy / bài học (anh 05/11 "ghi nhận lại tránh sửa cái này lỗi cái đã chạy ổn"):** luật mới `AGENTS.md` mục 3 + `QUY_CHUAN_KIEN_TRUC.md` mục 18 — sửa phần dùng chung phải kê chỗ dùng, so đầu ra cũ ↔ mới cả cách viết, dữ liệu giả đúng kiểu nguồn mới; t373 giữ ca File Tổ trưởng chữ hoa → KTGS.
- **Chờ anh:** thử máy thật 3.471–3.479 (Diễn biến, đứt chuỗi QĐ, mẫu Hồ sơ, bấm nút các tab, tên xã khi in).

### 05/11/2026 04:30 — TK 3 · PHIÊN (kế hoạch dọn tuần tự — Đ1 = 3.471)
- 3.470 gộp (#501), hồi quy đủ 253 phép đạt (chạy sau gộp — anh "gộp rồi chạy sau"). Anh duyệt kế hoạch dọn `KE_HOACH_DON_NEN.md` mục 8, làm tuần tự không hỏi lại. **Đ1 = 3.471** Diễn biến bảng cơ bản + tách js/48b. Tiếp: Đ2 (3.472).

### 05/11/2026 03:30 — TK 3 · PHIÊN (3.470 tên xã theo mã xã)
- Anh: hệ thống đang gộp điểm GD (Gia Lộc gộp 1) → Mẫu 31 cột Tên xã ghi "… Vay trực tiếp". 3.470 sửa ở gốc `slXaTenChuan` (js/22, trong `slBo`): tên xã theo mã xã cho mọi tab; Kiểm tra kỳ báo chênh; Diễn biến ô xã.
- **Anh 04/11 duyệt chạy tuần tự không hỏi lại mỗi phiên** theo kế hoạch dọn / chuyển chuẩn sẽ báo — xem `docs/KE_HOACH_DON_NEN.md`.

### 05/11/2026 02:30 — TK 3 · PHIÊN (3.468–3.469 QĐ 0 xã)
- 3.468 đã gộp (#499): đối chiếu dòng PGD chỉ cột điều chỉnh. 3.469 (anh "gom 1 chỗ nhập QĐ mới, không add xã, báo 0 xã"): bỏ nút / hộp QĐ không giao riêng; ＋ QĐ mới không tích xã = QĐ 0 xã (vẫn `qdKhong`), hiện chung danh sách, ✎ Sửa tích thêm xã → QĐ có số liệu.
- **Chờ anh:** thử máy thật 3.463–3.469; bàn tiếp a (cảnh báo Biểu 07 đã xuất), b (nhật ký sửa QĐ).

### 05/11/2026 01:30 — TK 3 · PHIÊN (3.467 dòng thời gian QĐ)
- 3.466 đã gộp (#497). Anh: ý Nháp / Đã chốt không đúng ý (bỏ); a, b, c bàn sau. 3.467 (anh "code và gộp lên"): dòng thời gian QĐ + QĐ không giao cho PGD.
- **Chờ anh:** thử máy thật; bàn tiếp ý "phần KH chưa chuẩn, chưa chốt" (a, b, c).

### 05/11/2026 00:30 — TK 3 · PHIÊN (3.466 sửa QĐ linh động)
- 3.465 đã gộp (#496). 3.466 (anh "làm hết, em code"): 6 ý sửa QĐ linh động — `KE_HOACH_PHAN_BO_KH.md` mục 9.
- **Chờ anh:** chọn thêm (a) cảnh báo sửa QĐ đã xuất Biểu 07 · (b) nhật ký sửa QĐ · (c) ghi chú QĐ; thử máy thật; "gộp".

### 04/11/2026 23:00 — TK 3 · PHIÊN (3.465 nhập QĐ Phân bổ KH)
- 3.464 đã gộp (#495). 3.465 (anh "gộp rồi code cả a, b, c…"): đọc thẳng PDF QĐ, Excel DANH_MUC, nhập tay theo chương trình, xem QĐ 2 kiểu — `KE_HOACH_PHAN_BO_KH.md` mục 9. QĐ mẫu anh gửi (thật) chỉ thử trong vùng tạm: 3 CT · 24 PGD · 96 xã khớp.
- **Chờ anh:** thử máy thật với QĐ thật (PDF điện tử + 1 QĐ scan qua Gemini); "gộp".

### 04/11/2026 21:00 — TK 3 · PHIÊN (3.464 bản dọn)
- 3.463 đã gộp (#494). 3.464 (anh "code tiếp cho bản dọn"): bỏ hàm / CSS chết, gộp `P` 10A–10D → `HST.P`, `omChanTrang`; thước đo mã rác (hàm chết 0, trùng 2, CSS chết 0); đo tốc độ — chỉ tab Tổ > 300 ms.
- **Việc kế (anh 04/11):** "xong phần này anh muốn kiểm tra làm thêm phần nhập QĐ của Phân bổ kế hoạch" — rà `js/47`, `js/48`, `docs/KE_HOACH_PHAN_BO_KH.md` rồi báo anh.

### 04/11/2026 18:40 — TK 3 · PHIÊN (3.463)
- Anh 04/11: bản dọn — "hạn chế code rác, tối ưu chương trình, không gò ép trong khoảng nào", giữ mẫu cũ 10C / 11 cũ → KE_HOACH_DON_NEN mục 7.2–7.3 (bản dọn 3.464 chờ "code").
- 3.463 (anh "code xong gộp lên anh thử"): Mẫu 11/TD mới + cũ chuẩn 10A trên HST, đúng mẫu gốc từng chữ (sửa "để trình", "đóng dấu)", khoảng trắng tên PGD), tổ trưởng theo Danh sách tổ mới nhất / chọn bản cũ / Mẫu 31; gắn qua `hsoMauGan`, bỏ `hsoLap11` cũ.
- **Chờ anh:** thử máy thật 11 mới / cũ + BBLV / 06A; "code" bản dọn 3.464.

### 04/11/2026 17:10 — TK 3 · PHIÊN (3.461.4 → 3.462)
- 3.461.4–3.461.9 (đã gộp #489–#493): BBLV / 06A sửa theo ảnh anh (Tây Ninh, STT theo hộ, cột Lãi tồn, In 2 mặt), tình huống mẫu ①–⑧ + tờ hướng dẫn, ô sổ xuống; hồi quy theo đổi 5/5, mốc tổng 246.
- 3.462 (anh 04/11 "làm tất cả, dọn nền tương ứng với phát triển thêm"): `docs/KE_HOACH_DON_NEN.md` — cổng gắn mẫu `hsoMauGan` (06A, BBLV), ngân sách tăng + thước đo nhánh mẫu trong `kiem.py`, đo nạp khi dùng (không làm), sửa bản rà 04/11 (nhiều việc nền đã có).
- **Chờ anh:** thử máy thật BBLV / 06A; gộp 3.462. Anh 04/11: "Việc cần xử lý" ở Hôm nay bỏ khỏi việc chờ (cần thì anh yêu cầu), danh mục lý do lệch không cần. **Bản kế phải là bản dọn** (⚠ JS +180 KB so mốc 3.429).

### 03/11/2026 23:55 — TK 3 · PHIÊN
- Đã làm: **3.461.1** ô In 2 mặt (dùng chung `D.cauHinh.ktHaiMat`) · **3.461.2** bộ in chung thêm lớp `tr-day` (đẩy khối xuống sát đáy trang — 06A chỗ ký + chú thích), tên chương trình theo cột Mẫu 31 `ctTen` (`HSN.ctTen`), mã món vay không bẻ dòng, tên hoa đầu từ, BBLV giao dịch lần cuối · **3.461.3** bảng chọn món `HSN.bang` viết lại (khung cuộn `calc(100vh − 330px)`, 1 món 1 dòng, cột Lãi tồn / CT, Số KU ẩn khi < 600 px, bấm dòng để tích, lọc "Chỉ món có vấn đề" mặc định bật, tìm), cờ ô `khongBao`. PR #488 (anh "gộp trước" — gộp trước khi hồi quy xong; hồi quy sau đó đạt 108/108, tổng chốt 246).
- Đang dở: không.
- Chờ anh: thử máy thật BBLV / 06A / bảng chọn (laptop 125%, 17 inch).
- Lưu ý / bẫy: phép thử bấm phần tử sau `hsoVe()` phải lấy lại phần tử (DOM vẽ lại). `tr-day` chỉ có hiệu lực ở bộ in app (trDan), không ở Word.

### 03/11/2026 22:30 — TK 3 · PHIÊN
- Đã làm: **3.461** — mới `js/mau/0hsn.js` (`HSN`: bảng chọn món nợ của tổ, nhóm QH / khoanh / KHĐ / lãi tồn > 3·6·12 tháng / ⭐ cần quan tâm) + `js/mau/bblv.js` (**Biên bản làm việc**, mỗi hộ 1 biên bản trọn 1 trang, 1 món dạng dòng / nhiều món bảng, đo chiều cao trong khung in thật `hsoTrang`); 06A sửa trình bày (Ông (bà):, Hội không trùng, tại = địa chỉ, ngày / đồng liền), khai báo đủ 39 ô, in nhiều phiếu, 📄 06A từ KTGS tích sẵn món. Luật **QT-C-23** lãi tồn cao (sổ luật 1.11, 🔧 giao ban chưa áp — hộp thư cho TK 1). Mẫu trắng `tests/mau_goc/bblv.doc` (anh cho phép).
- Phép thử: mới `t366`; t163 / t170 / t204 (14 chip); t181 thêm 06a, bblv nhóm DUNG; hồi quy đủ `tat 3` 246/246.
- Đang dở: không.
- Chờ anh: thử máy thật BBLV + 06A (bảng thử 3.461); các việc chờ cũ (Word giống bản in, 5 mẫu chưa nền ô).
- Lưu ý / bẫy: in nhiều bản → bộ in chèn **trang trắng** giữa các bản (in 2 mặt) — không phải tràn trang. `bblvCao` ghi đồng bộ vào iframe ẩn `about:blank` (dùng `hsoTrang`), khung đo dùng chung giữa các lần. Ô giữa dòng kiểu cột của 06A (thực tế, chức vụ, số tiền đúng / sai) giữ bề rộng chấm (QUY_CHUAN 9.7).

### 03/11/2026 20:15 — TK 3 · PHIÊN
- Đã làm: **3.460** 10A về khuôn chung `HST` (js/mau/0hst.js) như 10B / 10C — `HST.ds`, `HST.bang` (cột In, mặc định tích hết, dòng tổng dưới bảng), `HST.tl / so / bq / tlHTML`, `HST.capAp`, `HST.hoi`; bỏ bản riêng `hso10aTl / So / TlDat`, `TL10A`, `dvAp`, `hso10aHoi`, bảng `h10a.*`. Tỷ lệ cũ `tl10a / tl10aBq` chuyển 1 lần sang `tlHop['10a']` (cờ `tl10aHST`). Giữ riêng: phê duyệt UBND, khóa trang, Thành lập / Kiện toàn, tách ô 3.449.
- Phép thử: t179 45/45 (chuẩn khóa 10A không đổi), t181 49/49, t358, t364 (+ ý chuyển tỷ lệ cũ), t365, t163, t363 đạt; hồi quy `doi 3` đạt, đã chốt 245.
- Đang dở: không. PR chờ anh "gộp".
- Bước tiếp: còn "Chờ anh" như mục NHẬN VAI (thử máy thật 10A/10B/10C · Word giống bản in mẫu nền ô · 5 mẫu chưa nền ô).
- Lưu ý: nút trong bảng 10A nay là `hst.tich` / `hst.bo0` (data-c="in"), tỷ lệ `hstl.cong` / `hstl.go` (data-mk="10a", data-k du | bq); `hso10aDs` / `hso10aThamDu` / `hso10aBq` / `hso10aTlHTML` còn là tên gọi mỏng sang HST cho chỗ gọi cũ.

### 03/11/2026 — TK 3 · NHẬN VAI (anh: "bàn giao từ TK 2, em làm app chính")
- Đã đọc: `AGENTS.md` → `docs/TRANG_THAI_CHUNG.md` → mục BÀN GIAO 09:40 + PHIÊN 17:00 của TK 2. Trạng thái nhận: `main` = **3.459**, không code dở, hồi quy 245 phép đã chốt.
- Nhận nguyên danh sách "Chờ anh" của TK 2 (thử máy thật 10A/10B/10C · Word giống bản in mẫu nền ô · 10A về `HST` · 5 mẫu chưa nền ô · phối hợp App ↔ Giao ban tạm dừng). **Bỏ hẳn việc "Scan 1 dòng không nhận CCCD"** (anh 03/11: "việc này bỏ qua đi, không ghi nhớ") — không theo dõi nữa.
- Vai **App phụ** (`dt.html`, Văn bản + Scan) TK 3 kiêm luôn đến khi anh giao lại. Hộp thư: G3 (`css/dt-may-vbsc.css`) TK 3 xác nhận; `dt.html` "chỉ nạp kỳ gần nhất" còn mở — rà khi anh giao.
- Bước tiếp: chờ anh giao việc; mỗi bản theo `CLAUDE.md` (bump · kiem · hồi quy `doi` / `tat` · bando · nhật ký vai).
- Lưu ý / bẫy: giữ đủ mục "Lưu ý / bẫy" của TK 2 bên dưới.

### 03/11/2026 17:00 — TK 2 · PHIÊN (bổ sung sau bàn giao)
- Đã làm: **3.459** (PR #482) 10A — địa chỉ phê duyệt UBND 3 ô `ubAp` / `ubXa` / `ubTinh`; nút "Phê duyệt UBND — Tên Tổ trưởng, Tổ phó, ngày" (`hso10aUbDat`, không đụng địa chỉ); III để chấm thẳng cột tab (`chamMM`); Trưởng ấp / Thư ký để chấm kín dòng (`chamDay`); tiền tiết kiệm dấu ngăn nhóm số; ô `kyTK`, tên dưới chữ ký theo dòng trên.
- Trạng thái: `main` = **3.459**; mục BÀN GIAO 09:40 bên dưới vẫn đúng (đọc "3.458" là 3.459).
- Lưu ý: `hoiquy2` mục "scan thẻ 2 mặt" thỉnh thoảng trượt do chờ lưu ảnh — chạy lại riêng 1 lần để xác nhận.

### 03/11/2026 09:40 — TK 2 · BÀN GIAO (anh chuyển vai App chính sang TK 3)
- **Trạng thái:** `main` = **3.458** (PR #476–#480 đã gộp). Hồi quy: 245 phép đã chốt, đạt hết (`tests/hoiquy_moc.json`). `python3 tests/kiem.py` sạch, trong mốc (dòng > 400 ký tự = 163, onclick 1265).
- **Đã làm phiên này (02–03/11):**
  - 3.451 Thông báo KH dư nợ (giãn tiêu đề, gọn số TB) · 3.452 **10B** theo quy chuẩn 10A + phần chung mới `js/mau/0hst.js` (`HST`) + ô chọn nhiều (js/31 `nhieu:1`) · 3.453 **10C** (Cho ra / Kết nạp loại trừ nhau, kết nạp từ tổ khác **cùng ấp**, `chuyen10c`, ＋ / − số dòng bảng).
  - 3.454 **10A khóa trang** bản in: trang 3 bắt đầu "b) Tổ phó", trang 4 "III." (lớp `tr-sang-in` — Word bỏ qua); phần đầu dư dòng → bớt hàng khung tổ viên (`hso10aDong`, mốc `HSO_10A_DAU` = 15 ở js/25), khung để chấm → thu chiều cao hàng.
  - 3.455 **Khai báo riêng thống nhất mọi mẫu nền ô** (16 mẫu): dòng dùng chung `omO1Phan` / `omDsDong` (vạch màu nguồn `.om-ds-*`), hộp ⚙ Khai báo riêng (nút cạnh ⚙ Khai báo đơn vị; tóm tắt `omDemNguon`, cỡ chữ, ↺ `omMDChu`), 🖼 trực quan liên kết 2 chiều (`omKBChiTiet`, `omKBDanh`), bấm chữ bản xem trước (`omXemGan` / `omXemBam`). Cột trái mẫu nền ô chỉ còn Chọn nhanh (mẫu in kèm có nút ⚙ riêng).
  - 3.456 **10A** số tham dự = tổ viên × tỷ lệ (mặc định 100%, − / +, > 1/2), IV tán thành / tham dự (> 2/3, QĐ 70), III gõ / chọn tên trong tổ (`goiY`), UBND theo III, phê duyệt cả phần ✍ / 🤖 (`hso10aUbNut`); khung chung: `tuUi`, `goiY` trong `omO1Phan`.
  - 3.457 **10B, 10C** số tham dự / biểu quyết như 10A — phần chung `HST.tl / so / thamDu / bq / tlHTML / tlDat / nhanhThem`, tỷ lệ nhớ `hsoLuu().tlHop[mẫu]`.
  - 3.458 **10A** Kiện toàn → phê duyệt "được kiện toàn", ô `ubVv` (Theo Về việc · Luôn "thành lập").
- **Đang dở:** không có code dở. Nhánh làm việc `claude/html-app-review-ck346k` đã gộp hết vào `main`.
- **Chờ anh:**
  1. Thử máy thật 10A / 10B / 10C (bảng thử 3.452–3.458 ở `docs/BAN_GIAO_VIEC_CON_LAI.md`).
  2. **Word giống bản in** cho mẫu nền ô — `hsoDocx` (js/25b) chỉ đọc lớp (c / j / thut / s14…), **bỏ qua style trong dòng** (canh đều, thụt 12,7, cỡ 14, line-height) → Word 10A canh trái, chữ 13; vì vậy khóa trang 10A chưa áp Word. Việc lớn (đụng phần chung xuất Word) — chờ anh duyệt.
  3. **Đưa 10A về `HST`** (dùng chung với 10B / 10C; 10A còn bản riêng `hso10aDs`, `hso10aBang`, `hso10aTl*`, tab / dvA…) — anh đã đồng ý "chuẩn cho 3 mẫu", chờ lúc gom góp ý.
  4. Scan: 1 dòng không nhận CCCD (người nào / thêm bước quét lại QR?).
  5. 5 mẫu chưa nền ô (01/BG, 02/BG, Sổ hộ vay, 06/TD, Phê duyệt NH) chưa có khai báo trực quan — làm dần khi anh giao.
  6. Phối hợp App ↔ Giao ban (GB-5, APP-1, kỳ đối chiếu T10) **vẫn tạm dừng** theo anh 02/11.
- **Cách làm / phép thử:** quy trình mỗi bản như `CLAUDE.md` (spec `tools/bump.py` có `thu`, `bo` khi bỏ / thay; `tests/bando.py`; dòng `docs/PHOI_HOP_TK2_TK3.md`). Phép thử mẫu Hồ sơ Tổ: `t358` (10A), `t361` (10B), `t362` (10C), `t363` (khai báo riêng / trực quan), `t364` (10A tham dự, III, IV, phê duyệt), `t365` (10B / 10C tham dự); chuẩn in `t179` (đổi bố cục anh duyệt → `node tests/chuan_tao.js <tên>`); `t181` nhóm DUNG chỉ giữ số trang. Đụng js/31 / js/25c / css → hồi quy `tat 3`, còn lại `doi 3`.
- **Lưu ý / bẫy:**
  - `hoiquy.sh` dựng worktree theo HEAD → **commit trước khi chạy**; `pgrep / pkill -f <tên>` khớp luôn shell gọi (đừng kill theo tên).
  - Loại ô `tukb` md `tu` bị `omDangKy` đổi thành `kb` — ô tự tính cần nút riêng dùng `l:'tu'`.
  - Ô 1 giá trị cần ⌨ gõ đè (và đọc giá trị gõ trong `lap`) phải có trong `DON` của mẫu.
  - Script chụp màn hình chạy từ thư mục repo sẽ ghi PNG vào repo — chạy ở scratchpad.
  - 10A mốc `HSO_10A_DAU` ước theo `omRong` (chuỗi chấm tính 85%) — đổi chữ phần đầu trang 1 thì chạy lại 4 trường hợp tên dài trong `t358`.

### 02/11/2026 17:50 — TK 2 · PHIÊN
- Đã làm: 3.443–3.450 Mẫu 10A (khung 100 tổ viên 3 cột, 4 trang, chữ 14, VB 4336 Thành lập / Kiện toàn, xã–ấp theo địa bàn, họ tên ⇥ chức vụ, tách ô tự động / ghi tay, nút ⚙ Khai báo riêng + Nhập liệu riêng mẫu, bảng hộ vay của tổ có TT / TP theo Mã KH); ô chọn chung `l:'chon'` (js/31); 3.445 Scan bổ sung ấp bản tổ trưởng; 3.448 cây lọc tên xã theo File Tổ trưởng; 3.451 Thông báo KH dư nợ giãn tiêu đề. Hồi quy đủ 240/240 (3.449). Quy chuẩn mẫu ghi `QUY_CHUAN_KIEN_TRUC.md` 9.8.
- Đang dở: không.
- Bước tiếp: anh thử 10A trên máy thật, góp ý tiếp; các mẫu Hồ sơ Tổ khác (10B, 10C…) làm lại theo quy chuẩn 9.8 khi anh giao.
- Chờ ai: anh — **phối hợp App ↔ Giao ban tạm dừng** (anh 02/11: việc khác quan trọng hơn): GB-5, APP-1, kỳ đối chiếu tháng 10 chờ anh mở lại; GB-4 anh chạy bản vá khi làm văn bản giao ban; dòng CCCD không nhận ở Scan chờ anh cho biết người đó.
- Lưu ý / bẫy: `hoiquy.sh` lấy worktree theo HEAD — commit trước khi chạy; `pgrep -f <tên>` cũng khớp chính lệnh shell (đừng kill theo tên). 10A chữ liền → `t181` chỉ giữ số trang (nhóm DUNG).

### 01/11/2026 — TK 2 · PHIÊN (3.430)
- Đã làm: Mẫu 06A/TD (727) vào kho mẫu — tab Hồ sơ vay, mỗi món 1 phiếu, lãi = lãi tồn tất cả (TH + QH); nút 📄 06A ở KTGS Mẫu 06 (chọn đến tổ); `hso06aMo` để chỗ khác gọi. Biên bản tự soạn (nháp 1) bỏ — anh chọn dùng 06A chuẩn 727.
- Đang dở: không.
- Bước tiếp: nút 06A ở danh sách 3 tháng KHĐ sau khi chốt K5; gộp PR #449 của TK 1 (đổi tên kỹ thuật) khi anh nhắn.
- Chờ ai: anh (cột "Lãi DT chưa đến hạn" có tính vào nợ lãi 06A không — đang để TH + QH; thử 06A trên máy).
- Lưu ý / bẫy: thêm mẫu vào HSO_MAU.hsv → sửa đếm chip ở t163, t170, t204; `pkill -f wt<tên>` giết luôn shell gọi.

### 01/11/2026 — TK 2 · PHIÊN (3.429)
- Đã làm: K4 / QT-C-15 — Mẫu 06 sau giải ngân chip Tất cả (mặc định) / Lần 1; 3 bàn giao cũ → `docs/luu_tru/`; hồi quy đủ 227/227, chốt lại mốc thước đo (`tests/do_moc.json`); K9 ghi sổ luật.
- Đang dở: nháp biên bản làm việc với khách hàng (người lập CBTD / cán bộ Hội) — anh đang duyệt chữ, chưa đưa vào repo.
- Bước tiếp: anh duyệt chữ → đưa mẫu vào app (tự điền khoản vay từ Mẫu 31) sau kỳ đối chiếu 02/11; TB kết luận thêm nhiệm vụ tháng sau (số món Lần 1 từng Hội).
- Chờ ai: anh (duyệt biên bản, số hiệu VB gia hạn nợ; so Gia Lộc 2); TK 1 (trường hợp mẫu C15, C19).
- Lưu ý / bẫy: luật chống rác anh duyệt — không thêm chức năng mới đến hết 02/11; 3–4 bản có 1 bản dọn.

### 01/11/2026 — TK 2 · PHIÊN (bàn giao đổi tên cho TK 1)
- Đã làm: gộp 3.428 (PR #445 — bỏ tên Tèo, bảng vai, nhật ký vai); ghi anh chốt Gemini tham gia khi cần (C7 ✓); dòng BÀN GIAO cho TK 1 ở `PHOI_HOP_CHUNG.md` mục 14 (anh báo TK 1 đọc).
- Đang dở: không.
- Bước tiếp: chờ TK 1 báo đổi tên `teo_ca.json` / `thu_teo.py` → sửa `t328` cùng lúc; kỳ đối chiếu 02/11.
- Chờ ai: TK 1 (đổi link raw, NHẬN VAI trong `GIAO_BAN.md`); anh (K4, K5, K9; so Gia Lộc 2).
- Lưu ý / bẫy: file tên cũ `TEO_*.md` chỉ còn dòng trỏ — xóa khoảng 01/12 khi TK 1 đã đổi link.

### 01/11/2026 — TK 2 · PHIÊN (mục đầu tiên — tóm 3.409 → 3.427)
- Đã làm: dọn rác theo dõi tổ (3.410); tách file lớn (3.411); tăng tốc (3.412–3.413, 3.422 mở lại app không dựng kỳ 2 lần); scan CCCD tổ trưởng + tổ trưởng cũ + màn 👑 (3.415–3.416.1); thẻ tổ gọn (3.416.2–5); dọn 289 luật CSS, chụp ảnh so giao diện, Ctrl+K, chạy không mạng (3.417–3.421); file đối chiếu sửa 3 lệch TK 1 báo (3.423); QT-C-21 + 📐 bộ số đối chiếu (3.424); nháp Nội dung họp mẫu 08 (3.425); nháp TB kết luận 08/GDX (3.426); 🔎 so file giao ban tự phân loại lệch, bảng trạng thái chung, luật chốt phải có phép thử (3.427); bỏ tên Tèo, bảng vai, nhật ký vai (3.428).
- Đang dở: không.
- Bước tiếp: kỳ đối chiếu 02/11 (anh nạp file đủ tháng → 📤 xuất DOI_CHIEU_APP, 🔎 so file giao ban); lịch kỳ ở tab Hôm nay (ý 4, sau 02/11); Phụ lục Nội dung họp; báo cáo BĐD (sau cùng).
- Chờ ai: anh so 📐 / 📝 / 📄 với bộ ví dụ Gia Lộc 2 (Drive `C2_DAP_AN_GiaLoc2.csv`, `A1`, `B1`); TK 1 trả lời điểm chính / phụ, đổi tên teo_ca / thu_teo; anh chốt K4, K5, K9.
- Lưu ý / bẫy: `kyLui(kỳ, n)` là CỘNG n tháng; đọc kho qua `KHO.nap` (kiem.py chặn `toNap` ngoài lõi); dòng > 400 ký tự bị đếm mốc; gộp PR bằng sha 40 ký tự rồi `git checkout -B <nhánh> origin/main`; PR của TK 1 có thể đẩy thêm commit trước khi gộp — lấy sha mới.
