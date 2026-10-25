# Bàn giao TK 2 → TK 3 (25/10/2026) — anh Nhân chuyển sang TK 3 làm tiếp 2 ngày

> Anh 25/10: *"Sau phần này anh sẽ qua tk 3 làm tiếp trong 2 ngày em bàn giao toàn bộ."*
> File này = mọi thứ TK 2 đang giữ: trạng thái, quyết định anh đã chốt (nguyên văn), việc dở / chờ anh, cách làm, bẫy hay gặp.
> Đọc kèm: `CLAUDE.md` (luật), `docs/BAT_DAU.md` (lệnh), `docs/PHOI_HOP_TK2_TK3.md` (nhật ký gộp + mục 5 báo việc), `docs/QUY_CHUAN_KIEN_TRUC.md` (kiến trúc, mục 13 cắm rút).

## 0. Quyền tiếp nhận (anh chốt 25/10: *"Em giao hết sang cho tk 3 tiếp nhận trong 2 ngày"*)
- Trong 2 ngày này **TK 3 tiếp nhận toàn bộ phần TK 2**: được sửa cả file TK 2 đang giữ (`js/62–68`, `css/dt-may.css`, `js/22*`, `js/28`, `js/58`, khung điều hướng điện thoại…), lên số bản tiếp từ `main`, dùng dải phép thử TK 2 (`t312` trở đi) nếu cần.
- TK 2 **tạm dừng, không sửa / không gộp gì** trong thời gian này. Khi TK 2 quay lại: đọc `docs/PHOI_HOP_TK2_TK3.md` (nhật ký gộp mục 4 + mục 5) để nắm phần TK 3 đã làm rồi mới tiếp.
- Việc nên làm đầu tiên khi anh có thời gian: (1) anh gửi số đo ⏱ trên iPhone (mục 5.1); (2) anh chọn đợt trong `RA_SOAT_BO_CUC_2510.md` (em đề xuất Đợt A việc 1 + 2 + 3).

## 1. Trạng thái khi bàn giao
- **`main` = 3.372** (gộp PR #334; sau đó #335 rà phép thử, #336 tài liệu). Nhánh làm việc TK 2: `claude/html-app-review-ck346k` (đã về đúng `main`, không còn commit dở).
- Hồi quy đủ trên 3.372: **180 phép** — ✗ chỉ ở các phép **đã biết báo nhầm**: t192 (6/7 — móc thử cố ý `pvMo`, `thXem`, `gdxThan`), t207, t208, t210, t224 (✗=1 nhưng "đạt"), t254 (✗=5 nhưng 19/19 đạt). `hoiquy` "Báo cáo đã bỏ không tự quay lại khi mở lại app" thỉnh thoảng ✗ khi máy nặng (chạy riêng đạt).
- Không có việc nào đang chạy dở trong code.

## 2. TK 2 đã làm (3.355 → 3.372) — chi tiết ở `docs/CHANGELOG.md`
| Bản | Việc | File chính | Phép thử |
|---|---|---|---|
| 3.355–3.356 | Nền báo cáo bảng `DANG_KY` + 🧩 Báo cáo của tôi (D5) | `js/62-dang-ky.js`, `js/63-bao-cao-toi.js` | t259 |
| 3.357–3.359 | Sổ tổ viên / chốt sổ 31/12, năm sau dùng sổ chốt, 📅 Dòng thời gian | `js/64-so-to-vien.js`, `js/65-dong-thoi-gian.js`, `js/28` | t300–t302 |
| 3.360 | Rà logic + code rác | nhiều | — |
| 3.361–3.366 | **Bản máy tính trên điện thoại Đ1–Đ5** (khung, thẻ khách, Hôm nay, Số liệu vuốt ngang, xem trước bản in chụm 2 ngón) | `css/dt-may.css`, `js/66-dt-may.js`, `js/05` (trDan) | t303–t308 |
| 3.363 | ⚠ Nhật ký lỗi tự động (chip chân trang, 📋 Chép) | `js/67-nhat-ky-loi.js` | t305 |
| 3.365 | Sửa lỗi chung: tiêu đề bảng tổ lệch cột khi cuộn ngang | `css/app.css` (1 dòng z-index) | t307 |
| 3.367 | Dòng thời gian thu gọn (anh: "ẩn đi, mở khi cần") | `js/65` | t302 |
| 3.368 | Danh sách tổ ở Tra cứu vừa khung (anh: "cột bị khuất") | `js/58-tc-to.js` | t309, t246 |
| 3.369 | **Tối ưu nạp số liệu — phương án A** (xem mục 4) | `js/22-so-lieu.js`, `js/28-tv-tk.js` | t310 |
| 3.372 | **Điện thoại Đ6**: thanh dưới Hôm nay · Tra cứu · Văn bản · Scan · ☰ Thêm; đầu / chân trang gọn; Tra cứu gọn; **⏱ đo tốc độ**; sửa lỗi Scan máy chậm | `js/66`, `css/dt-may.css`, `js/68-do-toc-do.js`, `js/41` | t311 |
| (#335) | Rà phép thử: bỏ t97, t97m, t97w, t98, t101_mau10_cu (Mẫu 10 / tab Số liệu đời 3.85) | `tests/`, `tools/hoiquy.sh` | — |

## 3. Quyết định anh đã chốt (nguyên văn, còn hiệu lực)
- **Điện thoại:** *"điện thoại luôn có mạng ko cần chế độ offline"* · mặc định iPhone *"máy tính"* (mở thẳng bản chính — TK 3 làm 3.370) · *"2 [dt.html] vẫn giữ nhưng tối ưu hơn, chỉ nạp kỳ gần nhất"* (việc TK 3) · 3 tab chính *"tab hôm nay, van bản, tra cứu KH"*, ô 4 *"Scan"* · *"Nên giữ nút chuyển bên ngoài"* (nút 📱 nổi `#ve-dt` giữ, ☰ Thêm chỉ là lối phụ).
- **Thẻ / bảng điện thoại:** *"thẻ cho điện thoại nên chỉnh chữ tối ưu 1 màn hình xem trọn"*, *"thêm màu sắc và chip màu ko khô cứng"*; sao kê / báo cáo *"tận dùng tối đa kiểu vuốt trượt, phóng to thu nhỏ của ios"*.
- **Tối ưu nạp:** anh duyệt **phương án A** (sửa thẳng chỗ chậm). Phương án B (Worker) **chưa duyệt**.
- **Quy định phép thử (25/10):** sửa nhỏ 1 khối → phép thử khối + nhóm (`tools/hoiquy_nhom.txt`); đụng phần chung (KHO, trDan, GD, lưu / đồng bộ, khung / CSS chung) hoặc 3–4 bản / trước gộp lớn → hồi quy đủ; rà định kỳ bỏ trùng / bỏ phép của chức năng đã gỡ. *"chức năng mới nhưng đảm bảo cái cũ chạy dc"*.
- **Quản lý code:** *"độc lập, có thể cắm rút, an toàn và luôn tối ưu tốc độ chạy"* → chức năng mới = file riêng + 1 chỗ gắn (QUY_CHUAN mục 13).
- **Cách làm:** *"Em luôn rà soát logic và code rác"* · *"Trong lúc hồi quy anh hay trao doi tương tac với anh"* · *"em luôn tư vấn anh cái mới về kỹ thuật"* (`docs/TU_VAN_KY_THUAT.md`).
- **Hoãn:** Việc 2 "Việc cần xử lý" ở Hôm nay — *"Chưa cần làm khi nào làm anh báo"*.

## 4. Tối ưu nạp — số đo (Mẫu 31 giả cỡ thật 25.032 dòng × 175 cột, `tests/gia31`)
| Bước | Trước 3.369 | Sau 3.369 |
|---|---|---|
| Tách dòng / nhận dạng (`slPhanTich`) | 2,35 s | **0,74 s** |
| Đứng màn hình lúc đọc Mẫu 31 — máy tính / ĐT giả lập CPU ×4 | 2,5 s / 11,4 s | **0,86 s / 3,7 s** |
| Dựng lại bảng (`slMoBang`) | 0,60 s | 0,31 s |
| Ghi vào máy / dựng kỳ / vẽ tab Tổ (ĐT ×4) | 4,3 / 3,3 / 2,5 s | gần như không đổi (IndexedDB của trình duyệt) |
- Nguyên nhân chính đã sửa: `tv01Doc` / `tkSKDoc` dò dòng tên cột **cả file** → nay 100 dòng đầu. Đọc Excel vốn ở Worker từ 3.86.
- Kết quả số liệu **y hệt** (vân tay 26 file giả trước / sau trùng). Muốn giảm tiếp → phương án B (dời tách dòng + ghi sang Worker, ~2 phiên, dính ~20 hàm chung) — **chờ anh**.

## 5. Việc dở / chờ anh (TK 3 tiếp)
1. **Drive chậm trên iPhone** — chờ anh gửi số đo: iPhone › ☰ Thêm › ⏱ Đo tốc độ › 📋 Chép (dán Zalo). Số đo ghi: nối Drive, kéo / đẩy chỉ mục văn bản, đồng bộ scan, cài đặt, chỉ mục số liệu, tải file số liệu, dựng kỳ + số lần gọi Drive · tổng · chậm nhất. Có số đo → sửa đúng bước chậm.
2. **8 phép thử cũ ngoài hồi quy** (t87, t88, t89, t93, t94, t95, t96, t99): chỉ in số đo, **không có câu kiểm** — TK 2 đề nghị bỏ, **chờ anh**. Hồi quy chỉ chạy `t[1-3][0-9][0-9].js` → phép tên 2 chữ số không bao giờ chạy.
3. **Phương án B (Worker)** — chờ anh (sau khi anh dùng thử 3.369 trên máy thật).
4. **Tư vấn kỹ thuật còn lại** (`docs/TU_VAN_KY_THUAT.md`): mục 2 nạp module khi cần — TK 2 đề nghị **hoãn** (mở app chỉ 0,2–0,6 s, lợi nhỏ, rủi ro cao); mục 3 lưu tóm tắt kỳ, 4 PWA, 6 danh sách ảo, 7 dùng chung dữ liệu giả trong phép thử (anh đã duyệt hướng) — chờ anh chọn.
5. **Thử máy thật** các bản 3.361–3.372: bảng thử ở `docs/BAN_GIAO_VIEC_CON_LAI.md` (mục từng bản).
6. **Còn chờ số liệu thật:** sổ chốt 31/12 (Mẫu 31 + 01/TV tháng 12/2026 và 1/2027); ĐVUT "so với đầu năm" cần số 31/12/2025.
7. **Báo anh, chưa sửa (đổi bản in cũ):** thang co chữ `.trang` của trDan (js/05) không hề chạy (getComputedStyle trên nút chưa gắn vào trang) — sửa sẽ đổi bản in cũ, chờ anh.
8. **Việc sau (chưa lên kế hoạch):** danh mục lý do lệch (QT-09 cần anh quyết), thống nhất quy tắc kiểm tra, quy tắc bù 01/TV cuối tháng (chờ số liệu T10), giảm onclick (K6).

9. **Rà soát bố cục tổng thể 25/10 (anh yêu cầu trước bàn giao):** `docs/RA_SOAT_BO_CUC_2510.md` — 11 chỗ chưa ổn + đề xuất Đợt A (6 việc nhanh) / B / C, **chờ anh chọn**.

## 6. Bản máy tính trên điện thoại — ai sửa gì (tránh trùng như 3.370 / 3.371)
- `css/dt-may.css` + `js/66-dt-may.js` (TK 2 làm): khung — thanh dưới (bọc `DT_NUT` / `dtDang` / `dtVe` / `dtThem` / `ttVe`), đầu / chân trang, Hôm nay, thẻ khách, Tra cứu, Số liệu. Chỉ nạp / chạy khi ≤ 600 px; máy tính bảng / máy tính giữ thanh dưới cũ (`js/23` `DT_NUT`).
- `css/dt-may-vbsc.css` (TK 3): Văn bản + Scan. `dt.html` + `js/dt/*` (TK 3). `js/60-ve-dt.js` nút 📱 (TK 3 — giữ, anh chốt).
- `js/67` nhật ký lỗi, `js/68` đo tốc độ: cắm rút, bỏ 1 dòng `<script>` là về như cũ. `js/68` bọc hàm theo tên lúc `load` (`noiDrive`, `taiChiMucTuDrive`, `dayChiMucLenDrive`, `dongBoScan`, `dongBoCauHinh`, `slTaiTuDrive`, `slTaiBlob`, `goiDrive`, `KHO.nap`) — đổi tên các hàm này thì sửa danh sách trong `dtdGan()`.

## 7. Cách làm 1 bản (quy trình TK 2 đang dùng)
1. Sửa code → `python3 tests/kiem.py` sạch (thước đo "đọc thẳng biến kho" phải 0).
2. Phép thử mới (dải TK 2 `t300–t349`, đang tới **t311**; TK 3 `t260–t299`) — chạy cả bản cũ (`git stash`) để chắc phép thử bắt được lỗi.
3. Lên số: viết spec JSON (`ban`, `cu`, `moi` [[chữ, lệnh JS]], `changelog`, `bangiao`, `readme`, `batdau`) → `python3 tools/bump.py spec.json` (đổi `APP_BAN`, `?v=`, CO_GI_MOI, CHANGELOG, BAN_GIAO_VIEC_CON_LAI, README, BAT_DAU). `readme` rỗng thì bump.py chèn dòng trống thừa → `git checkout tests/README.md`.
4. Ghi 1 dòng `docs/PHOI_HOP_TK2_TK3.md` mục 4 (ngày · TK · bản · file · phép thử) → `python3 tests/bando.py`.
5. Phép thử theo mức (mục 3) — `bash tools/hoiquy.sh <tên> <thư mục tạm> <nhóm|tat> 2` chạy trên **git worktree của HEAD** (sửa code trong lúc chạy không ảnh hưởng). Kết quả `<tmp>/hq<tên>/tong.txt`, xong ghi `XONG`. Hồi quy đủ ~45 phút.
6. Gộp: `git fetch origin main && git merge-base --is-ancestor origin/main HEAD` (TK kia có gộp trước thì gộp `main` vào / làm lại số bản) → `gh api repos/nhannt3-gif/tu-ho-so/pulls --input pr.json` → `gh api -X PUT …/pulls/N/merge -f merge_method=merge -f sha=<HEAD>` → `git checkout -B <nhánh> origin/main && git push -f`.

## 8. Bẫy hay gặp
- **Trùng số bản / trùng việc với TK kia** (vừa xảy ra 3.370 / 3.371): luôn `git fetch` + xem `git log HEAD..origin/main` trước khi lên số và trước khi gộp; việc điện thoại chia theo mục 6.
- **Không dùng `pkill -f` theo tên lệnh** (đã giết luôn shell đang chạy 2 lần) — dừng theo PID.
- Hồi quy chạy nền dễ bị dừng giữa chừng khi phiên bị thu hồi (3.370) → chạy bằng `nohup … &`, kiểm còn tiến trình (`pgrep -f "hoiquy.sh <tên>"`).
- `tests/gia*`, `tests/gianho*` **không vào repo** (`.gitignore`, sinh bằng `tests/taogia.py`); `gia31` = Mẫu 31 cỡ thật để đo tốc độ.
- Lỗi chỉ hiện khi máy nặng (t151 `null.ten` 3.372): gây lại bằng CDP `Emulation.setCPUThrottlingRate {rate:4}` + in `e.stack` ở `pageerror`. Lời hứa chạy ngầm dùng biến phiên (`SX`…) phải kiểm phiên còn mở.
- Bảng có tiêu đề đứng yên + cột đầu đứng yên (`td:first-child` sticky toàn app, app.css ~1222) → ô góc cần `z-index` cao hơn tiêu đề (3.365).
- Repo công khai: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, ảnh / file anh gửi) vào repo — kể cả phép thử / tài liệu; file thật chỉ để trong scratchpad.
