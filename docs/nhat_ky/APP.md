# Nhật ký vai: App chính

> Hiện do: **TK 2** · Làm ở: repo · `index.html`, `js/`, kho số liệu, bộ số / nháp văn bản đối chiếu. Bảng vai: `docs/PHOI_HOP_CHUNG.md` mục 1; cách ghi / đổi vai: mục 1a.
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
