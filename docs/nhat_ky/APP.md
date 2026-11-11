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
