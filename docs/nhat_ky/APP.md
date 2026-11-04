# Nhật ký vai: App chính

> Hiện do: **TK 3** (nhận 03/11 từ TK 2) · Làm ở: repo · `index.html`, `js/`, kho số liệu, bộ số / nháp văn bản đối chiếu. Bảng vai: `docs/PHOI_HOP_CHUNG.md` mục 1; cách ghi / đổi vai: mục 1a.
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
