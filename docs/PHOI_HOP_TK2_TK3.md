# Phối hợp TK 2 ↔ TK 3 — đọc trước khi sửa / gộp (anh duyệt 24/10/2026)

> Anh 24/10: "em báo lên bàn giao cho TK đọc được và code phần của em, xong gộp lên có liên hệ lẫn nhau cho an toàn".
> File này là **chỗ hai tài khoản báo nhau**. Ai làm gì, sửa file nào, gặp lỗi của bên kia → ghi vào mục 4 / 5, không sửa file của bên kia.

## 1. Phân chỗ sửa
| Phần | TK 2 | TK 3 |
|---|---|---|
| Khung chung: `js/23-dieu-huong.js`, `js/22g-to.js` (lõi dựng kỳ) + `js/22ga-pham-vi.js` (cây địa bàn) + `js/22gb-to-giao-dien.js` (tab Tổ) — tách 3.346; `js/22k-nap-kt.js` (Nạp & KT, tách từ 22f / 22i), `js/29-kho.js`, `js/34-luu-ngan.js`, `css/app.css`, ⚙ Khai báo đơn vị | **sửa** | không sửa (báo ở mục 5) |
| KTGS (`js/22b–22e`, `js/56-ktgs-bo.js`) — đã bàn giao 3.331 (`docs/BAN_GIAO_KTGS.md`) | **sửa** | không sửa |
| Bản điện thoại `dt.html`, `js/dt/*`, `css/dt.css` | không sửa (trừ số bản tự động) | **sửa** khi TK 2 bàn giao khung (`docs/KE_HOACH_DIEN_THOAI_2.md`) |
| Phép thử mới | `t240–t259` | **`t260` trở lên** |
| `tools/hoiquy.sh`, `tools/hoiquy_nhom.txt`, phép thử ảnh bố cục `t260` | dùng | TK 3 giữ; TK 2 sửa thì báo |

## 2. Lên số bản (12 file dùng chung — chỗ hay đụng nhau)
`tools/bump.py` sửa: `index.html` (?v=), `js/02-nen.js` (APP_BAN), `js/06-hop-thoai.js` (CO_GI_MOI), `dt.html`, `dt-sw.js`, `docs/CHANGELOG.md`, `docs/BAT_DAU.md`, `docs/BAN_GIAO_VIEC_CON_LAI.md`, `docs/BAN_DO_MA.md`, `tests/README.md`, `tests/hoiquy2.js`.
1. **Việc chỉ chạm `tests/`, `tools/`, `docs/` → KHÔNG lên số bản** (gộp thẳng, ghi 1 dòng ở mục 4).
2. Việc sửa app → **ngay trước khi gộp**: `git fetch origin main` + gộp `main` vào nhánh → lấy **số kế tiếp sau bản mới nhất trên `main`** → `bump.py` → gộp. Đụng số (bên kia vừa gộp trước) → gộp lại `main`, lùi số (như 3.328 → 3.329).
3. Mỗi lần gộp ghi **1 dòng ở mục 4** (ai · bản · file chạm · phép thử đã chạy).

## 3. Phép thử khi gộp
- Phần mình sửa: phép thử của phần đó + `t260` (ảnh bố cục, ~3 phút) nếu chạm giao diện.
- Nhanh theo nhóm: `bash tools/hoiquy.sh <tên> /tmp/hq <nhóm> 2` — nhóm trong `tools/hoiquy_nhom.txt` (kt · hs · scan · gdx · so · dt · khung); `hoiquy`, `hoiquy2` luôn chạy kèm. Toàn bộ: `bash tools/hoiquy.sh <tên>` (như cũ, ~2,5 giờ) hoặc thêm `tat 2` (2 luồng).

## 4. Nhật ký gộp
| Ngày | Ai | Bản / PR | Chạm | Phép thử |
|---|---|---|---|---|
| 24/10 | TK 2 | (không số bản) | `docs/RA_SOAT_KHO_2410.md` mới (rà đọc qua KHO), `tools/ra_kho.py` mới | — |
| 24/10 | TK 2 | 3.340 | `js/02-nen.js` (luuNgay, LS_TRAN), `js/34-luu-ngan.js` (LN.ghi boLS + dự phòng), `tests/t249.js` mới | t249, t93, t103, t169, t175, t185, t187, t241, t248, hoiquy, hoiquy2 |
| 24/10 | TK 2 | 3.344 | `js/58-tc-to.js` (tcTheTo, tcToHien, tcToMoMon), `js/22f-tra-cuu.js` (tcHanMon gon), `css/app.css` (cuối), `tests/t246.js` | t246, hồi quy đủ 2 luồng |
| 24/10 | TK 2 | 3.345 | `js/58-tc-to.js` (ttKH), `css/app.css` (cuối), `tests/t246.js` | t246, t247, t107, t156, t170, t172, hoiquy, hoiquy2 |
| 24/10 | TK 2 | 3.346 | K2–K5 KHO: `js/22f`, `22g` → `22g` + `22ga-pham-vi` (mới) + `22gb-to-giao-dien` (mới), `22h`, `22i`, `22j`, `22k-nap-kt` (mới), `22b`, `22c`, `22e`, `56`, `25`, `26`, `45`, `58`, `22-so-lieu`, `29-kho`, `index.html`; `tests/kiem.py`, `tests/do_moc.json` (kho_thang 0) | hồi quy đủ 2 luồng |
| 24/10 | TK 2 | 3.347 | `js/28-tv-tk.js` (tvChuan kỳ ngày không bù), `js/22h-cap-hoi-sao-ke.js` (tcNap kỳ mới nhất), `js/58-tc-to.js` (tcTVGhi), `tests/t257.js` mới | t257, t244, t246, hoiquy, hoiquy2 |
| 24/10 | TK 2 | 3.348 | `js/61-nhat-ky-in.js` mới, `js/02-nen.js`, `js/34-luu-ngan.js`, `js/17-dong-bo-cai-dat.js` (ngăn nkIn), `js/24-xuat.js` (nkXuat), `js/25-ho-so.js`, `js/26-giao-dich-xa.js`, `js/22f`, `js/58`, `css/app.css`, `index.html`, `tests/t258.js` mới | hồi quy đủ 2 luồng |
| 24/10 | TK 2 | 3.349 | 30 file js (100 `onclick="dongHop()"` → `data-lenh="hop.dong"`), `js/39-gd.js` (lệnh hop.dong), `tests/t258.js` | hồi quy đủ 2 luồng |
| 24/10 | TK 2 | 3.350 | `js/58-tc-to.js` (ttKH ngày tất nợ), `tests/t246.js` | t246, hồi quy đủ 2 luồng |
| 24/10 | TK 2 | 3.351 | `js/58-tc-to.js` (tcToTim đủ tổ, cột), `tests/t246.js` | t246, hoiquy, hoiquy2 |
| 24/10 | TK 2 | 3.353 (phần 1; TK 3 đã dùng 3.352) | `js/04e`, `js/12`, `js/05` (trả bộ nhớ ảnh tạm), `docs/KE_HOACH_CHUAN_HOA.md` | t217, hồi quy đủ 2 luồng |
| 24/10 | TK 2 | 3.353 | `js/22c-ktgs-m06.js` (ktGNNk — chỉ truyền nk vào xuatHang, không đổi mẫu), `tests/t258.js` | t258, t106, hồi quy |
| 24/10 | TK 2 | 3.355 (TK 3 đã dùng 3.354) | **mới** `js/62-dang-ky.js` (nền báo cáo bảng DANG_KY), `js/22h` (1 chỗ gắn nút), `js/05-them-file.js` (trDan: thêm thuộc tính tùy chọn `data-tr-cb` / `data-tr-1trang` — bản cũ không có thuộc tính → in y cũ), `js/17b`, `index.html` | t259, hồi quy |
| 24/10 | TK 2 | 3.356 | **mới** `js/63-bao-cao-toi.js` (🧩 Báo cáo của tôi), `js/62` (ngữ cảnh tab Tổng hợp, `ctx.B`), `js/22i` (1 chỗ gắn khối), `js/17b`, `css/app.css` (cuối file, lớp `bt-*` / `dk-chon*`), `index.html` | t259 (thêm phần D5), hồi quy |
| 24/10 | TK 2 | 3.357 | **mới** `js/64-so-to-vien.js` (Sổ tổ viên / chốt 31/12), `js/22gb` (1 chỗ gắn nút ở `.to-dau`), `js/22-so-lieu.js` (slXoa hỏi trước ô tháng 12), `js/22k` (lời hỏi xóa tháng 12), `index.html`, **mới** `tests/t300.js` | t300, hồi quy |
| 24/10 | TK 2 | 3.358 | `js/64-so-to-vien.js` (sổ chốt năm trước `STV_CHOT`), `js/28-tv-tk.js` (tvChuan gắn `chot`, tvDoiChieu lý do / `namTruoc`, tvKiem), `js/58-tc-to.js` (thẻ tổ ghi tất nợ năm trước), **mới** `tests/t301.js` | t301, t300, t257, t244, t246, t167, hồi quy |
| 24/10 | TK 2 | 3.359 | **mới** `js/65-dong-thoi-gian.js` (📅 dòng thời gian), `js/22f` + `js/58` (1 dòng gắn khối cạnh 📜), `css/app.css` (cuối, `dtg-*`), `index.html`, **mới** `tests/t302.js` | t302, hồi quy |
| 24/10 | TK 2 | 3.360 | rà soát: `js/62` (ô gộp dòng cộng không nuốt cột tiền, bỏ biến thừa), `js/64` + `js/65` (còn lãi tồn = chưa tất nợ), `tests/t259` + `t302` | t259, t300–t302, hồi quy |
| 25/10 | TK 2 | 3.361 | **mới** `css/dt-may.css` (bản máy tính trên điện thoại Đ1, nạp media ≤ 600 px), `index.html` (1 dòng `<link>`), `js/41-scan-sap-xep.js` (danh bạ chưa sẵn không vỡ luồng), `tools/hoiquy.sh` (+ t3xx), CLAUDE.md + QUY_CHUAN mục 13, **mới** `tests/t303.js` | t303, t151, hồi quy |
| 25/10 | TK 2 | 3.362 | `css/dt-may.css` (Đ2 thẻ khách), **mới** `js/66-dt-may.js` (ô kỳ chữ gọn ≤ 600 px, bọc `kyChungVe`), `index.html`, **mới** `tests/t304.js` | t303, t304, nhóm khung |
| 25/10 | TK 2 | 3.363 | **mới** `js/67-nhat-ky-loi.js` (nhật ký lỗi, chip ⚠ ở chân trang `.day`), `index.html`, `js/02`, `js/06` (CO_GI_MOI), **mới** `tests/t305.js` | t305, nhóm khung |
| 25/10 | TK 2 | 3.364 | `css/dt-may.css` (Đ3 Hôm nay), `index.html`, **mới** `tests/t306.js` | t303, t304, t306, nhóm khung |
| 25/10 | TK 2 | 3.365 | `css/app.css` (1 dòng: z-index ô góc `.to-cuon-khung`), `css/dt-may.css` (Đ4), `index.html`, **mới** `tests/t307.js` | t303–t307, hồi quy đủ |
| 25/10 | TK 2 | 3.366 | `js/05-them-file.js` (`trDan` khung xem: chụm 2 ngón, CSS ≤ 600 px), `index.html`, **mới** `tests/t308.js` | t308, hồi quy đủ |
| 25/10 | TK 2 | 3.367 | `js/65-dong-thoi-gian.js` (khối thu gọn), `css/app.css` (1 dòng `details.dtg-khoi`), `index.html`, `tests/t302.js` | t302, nhóm so |
| 25/10 | TK 2 | 3.368 | `js/58-tc-to.js` (`tcToTim` bảng `.tc-to-ds`), `css/app.css` (luật riêng `.tc-to-ds`), `index.html`, `tests/t246.js`, **mới** `tests/t309.js` | t246, t258, t302, t304, t309 |
| 25/10 | TK 2 | 3.369 | `js/22-so-lieu.js` (`slLayDong`, `slNen`, `slMoBang`), `js/28-tv-tk.js` (dò tên cột 100 dòng đầu), `index.html`, **mới** `tests/t310.js` | t310, vân tay 26 file, hồi quy đủ |
| 25/10 | TK 2 | 3.372 | `js/66-dt-may.js` (Đ6 thanh dưới điện thoại), `css/dt-may.css`, **mới** `js/68-do-toc-do.js`, `js/41-scan-sap-xep.js` (1 dòng: phiên quét đã đóng), `index.html`, **mới** `tests/t311.js` — **bỏ** 3.370 / 3.371 của TK 2 (trùng việc TK 3 đã gộp) | t262, t193, t266, t311, hồi quy đủ |
| 24/10 | TK 2 | 3.341 | K1 KHO: `js/12`, `21`, `23`, `25`, `26`, `29` (soBang, dsKyHS), `41`; `tests/kiem.py` (đếm đọc thẳng kho), `tests/do_moc.json` (kho_thang 221) | t127, t151, t165, t170, t172, t179, t207, t209, t210, t241, hoiquy, hoiquy2 |
| 24/10 | TK 2 | 3.339 | tách `js/04-giao-dien.js` → 04 + 04b–04e, `js/06-hop-thoai.js` → 06 + 06b–06c (nguyên văn; `CO_GI_MOI` vẫn ở 06 cho bump.py), `index.html`, `tests/hssv_exe.js`, `tests/chuan_lay.js` (hôm nay cố định 17/10 — t179) | hồi quy đủ 2 luồng (`hoiquy.sh 3339 … tat 2`): chỉ t192, t151 cũ |
| 24/10 | TK 2 | 3.338 | `js/59-suc-khoe.js` mới, `js/32-kho-luu.js` (1 dòng gọi), `css/app.css`, `index.html`, `tests/t248.js` mới | t248, t231, t138, t178, t182, t185, t193, t206, t93, t247, t260, hoiquy, hoiquy2 |
| 24/10 | TK 2 | (không số bản) | ghi anh phân công (RA_SOAT_BO_CUC mục 9, `CLAUDE.md`) + trả lời mục 5 | — |
| 24/10 | TK 3 | (không số bản) | `tests/t260.js` mới, `tests/t100.js` (chờ ô ma trận `.sl-mt-k` — `.sl-tt-1` bỏ từ 3.230), `tools/hoiquy.sh` (+ nhóm, + số luồng; cách gọi cũ giữ nguyên), `tools/hoiquy_nhom.txt` mới, `.gitignore` (+ `tests/anh260/`), tài liệu này | t260 38/38 (cả trên 3.337), t100 chạy hết, nhóm dt 2 luồng 2 phút, hoiquy đạt trên 3.337 |
| 24/10 | TK 3 | **3.342** | bản điện thoại Đ0: `dt.html`, `js/dt/*`, `js/60-ve-dt.js` mới, `tests/t262.js` mới, t193–t195 (bật cờ PIN) + 12 file số bản | t262 17/17, t193 20/20, t194 9/9, t195 7/7, t260 dt 8/8 |
| 24/10 | TK 3 | **3.343** | điện thoại Đ1: `js/dt/dt-giao-dien.js`, `css/dt.css`, **`js/38-goi-xem.js` (nối thêm 3 trường cuối: lãi tồn món, cờ GH, mã KH tổ trưởng — không đổi trường cũ)**, `tests/t263.js` mới | t263 18/18, t193–t195, t262, t260 dt |
| 24/10 | TK 3 | **3.352** | điện thoại Đ2: `dt.html` (CSP + `worker-src blob:`), `js/dt/dt-nen.js`, `js/dt/dt-giao-dien.js`, `css/dt.css`, `tests/tv.js` (+ đường pdf.js cho phép thử), `tests/t264.js` mới, `tests/t194.js` (bấm văn bản → trang xem thay hộp thoại) — không đụng file chung | t264 18/18, t193 20/20, t194 9/9, t195 7/7, t262 17/17, t263 18/18 |
| 24/10 | TK 3 | **3.354** | điện thoại: `js/dt/dt-lich.js` mới, `js/dt/dt-nen.js`, `js/dt/dt-giao-dien.js`, `css/dt.css`, `dt.html`, `dt-sw.js`, `tests/t265.js` mới, t193 / t194 / t262 / t263 (trang đầu = Hôm nay) — **đọc** `_Hệ thống/lich.json` của máy tính, không sửa js/04b | t265 19/19, t193–t195, t262–t264, t260 dt |
| 25/10 | TK 3 | **3.370** | anh "code và gộp gấp": `js/26-giao-dich-xa.js` (**file TK 2** — chỉ thêm `gdxMaDu` + 1 chỗ gọi trong `gdxDsDiem`, mã điểm đủ TXN), `index.html` dòng 7–8 (bỏ tự chuyển dt.html — G1), `js/60-ve-dt.js`, `tests/t266.js` mới, t193 / t262 | t266 8/8, nhóm gdx + dt |
| 25/10 | TK 3 | **3.371** | G3 (anh "làm tiếp văn bản và scan"): **`css/dt-may-vbsc.css` mới** (file riêng, không sửa `css/dt-may.css` của TK 2), `index.html` +1 dòng `<link>` sau dòng dt-may.css, `tests/t267.js` mới | t267 6/6, nhóm scan, t260 |
| 26/10 | TK 3 (nhận bàn giao) | **3.373** | Drive: `js/06c-drive.js`, `js/20-khoi-dong.js`, `js/68-do-toc-do.js`, câu chưa nối ở `js/08, 09, 10, 12, 17, 38, 41, 45`, `css/dt-may.css` (+ khối chip Drive cuối file); bố cục Đợt A: **`js/69-bo-cuc-a.js` mới** + 1 dòng `index.html`; bỏ t87–t99 (8 phép); `tests/t268.js`, `tests/t269.js` mới, t267 | t268 7/7, t269 7/7, t267, hồi quy đủ |
| 26/10 | TK 3 (nhận bàn giao) | **3.374** | anh "chỉ xem khi có mạng": `js/dt/dt-nen.js`, `js/dt/dt-giao-dien.js` (bỏ 📌 ghim xem không mạng, dọn file ghim cũ), `tests/t264.js` viết lại | t264 12/12, t193–t195, t262, t263, t265 |

## 5. Báo cho bên kia (mở — bên được báo xử lý xong thì gạch)
| Ngày | Từ → tới | Việc |
|---|---|---|
| 24/10 | TK 3 → TK 2 | ~~**`hoiquy` sai ở 3.336**~~ — **3.337 đạt lại** (TK 3 chạy 2 lần trên 3.337); để ý nếu lặp lại (có thể chập chờn):: "✗ Báo cáo đã bỏ không tự quay lại khi mở lại app — {"co":1,"daBo":["NK"]}" (3.335 và 3.334 đạt — chạy đối chứng; nhánh TK 3 chỉ thêm phép thử). Liên quan Tra cứu KH tìm tổ trưởng 3.336? |
| 24/10 | TK 3 → TK 2 | **t158 sai từ 3.327** (trước cả 2 bên đổi gần đây): ở màn 1536 px, bật cột "Số món vay" làm tiêu đề bảng tab Tổ cao 42 → 59 px → luật `toCotVua` "tiêu đề không được xuống thêm dòng" chặn, nên không tự thêm cột (ở 1440 px vẫn thêm được). Hành vi app hay phép thử đúng — TK 2 / anh quyết (file `js/22g` của TK 2). |
| 24/10 | TK 3 → TK 2 | Việc kế tiếp của TK 3: **thẻ "Sức khỏe sao lưu"** trong ⚙ — mã ở **file mới** `js/58-sao-luu.js`, chỉ thêm **1 dòng gọi** trong ⚙ Khai báo đơn vị (chỗ TK 2 giữ). TK 2 có phản đối / muốn tự gắn dòng gọi thì ghi ở đây trước khi TK 3 gộp. |
| 24/10 | TK 2 → TK 3 | **Anh phân công lại 24/10** (sau khi TK 3 gộp t260): *"em (TK 2) rà soát tối ưu chính theo kế hoạch nâng cấp, còn TK 3 chỉ làm các việc nhỏ không đụng đến kế hoạch lớn"* + *"em cứ theo KH làm rồi gộp lên anh test"* — xem `RA_SOAT_BO_CUC_2410.md` mục 9. Phần Đợt 3 TK 3 đã gộp (t260, `hoiquy.sh` nhóm / luồng, t100) **TK 2 giữ và dùng tiếp**, cảm ơn. |
| 24/10 | TK 2 → TK 3 | **"Sức khỏe sao lưu" (mục 8 hàng 2) — TK 2 làm** theo phân công mới; TK 3 không cần làm `js/58-sao-luu.js` (lưu ý: `js/58-tc-to.js` đã dùng số 58). |
| 24/10 | TK 2 nhận | ~~`hoiquy` "báo cáo đã bỏ" chập chờn · **t158**~~ — 3.338: hoiquy đạt nhiều lần, t158 đạt 22/22 trên 3.337 (không sửa); t231 đã sửa (CSS). |
| 24/10 | TK 3 → TK 2 | Anh 24/10: **"em làm tiếp theo kế hoạch"** + "tra cứu KH của TK 2 đang làm rất ổn, em dựa vào đó làm bản cho điện thoại" → TK 3 làm **bản điện thoại 2** (`KE_HOACH_DIEN_THOAI_2.md`), chỉ trong `dt.html`, `js/dt/*`, `css/dt.css`, file mới; Đ1 Khách sẽ **đọc** cách tra cứu của TK 2 (không sửa `js/22f`). Gói số liệu xem (`js/38-goi-xem.js`) cần thêm trường (lãi tồn, hạn…) → TK 3 báo ở đây trước khi sửa. |
| 24/10 | TK 3 → TK 2 | Thước đo `kiem.py` trên `main` vượt mốc từ 3.335–3.341: **dòng >400 (164/163), onclick (1467/1459)** — không do TK 3 (3.342 không thêm). |
| 24/10 | TK 2 → TK 3 | **3.346 dời file (nguyên văn, không đổi chức năng):** tab Nạp & KT từ `22f-tra-cuu.js` + phần xóa / làm mới / tìm rác từ `22i-tong-hop.js` → **`js/22k-nap-kt.js`**; `22g-to.js` tách → `22ga-pham-vi.js` (cây địa bàn `pv*`) + `22gb-to-giao-dien.js` (tab Tổ); `slTimKH`, `slMau31Moi`, `slKhMonNap`, khai báo `SL_KHMON` / `SL_PHU` → `22-so-lieu.js`. Tab đọc số liệu **chỉ qua `KHO`** (mốc `kho_thang` = 0 — kiem.py ⚠ nếu đọc thẳng `TO_K` / `SL_DB` / `SLM.bang`…; đổi kỳ đang dựng dùng `KHO.datKy` / `KHO.kyDung`). TK 3 sửa chỗ nào trong các hàm trên thì tìm ở file mới. |
| 24/10 | TK 3 → TK 2 | **Lịch điện thoại 3.354 ghi chung `_Hệ thống/lich.json`** (cùng dạng `dayLichLenDrive`, `may:'dienthoai'`, gộp như `gopLich`). Nếu TK 2 đổi dạng `D.lich` / `lich.json` thì báo TK 3. Âm lịch đang **chép** ở `js/dt/dt-lich.js` (bản điện thoại không nạp js/04b) — khi tiện, TK 2 có thể tách âm lịch ra file chung (vd `js/03c-am-lich.js`) để cả 2 bản nạp, TK 3 sẽ bỏ bản chép. |

| 24/10 | TK 2 → TK 3 | Dải phép thử TK 2 `t240–t259` đã hết → **TK 2 dùng `t300–t349`** cho phép thử mới (TK 3 tiếp tục `t260–t299`). 3.356 thêm phần D5 vào cuối `t259`. |
| 25/10 | TK 2 → TK 3 | **Anh duyệt 25/10:** ① TK 2 tinh chỉnh **bản máy tính (`index.html`) cho mượt trên điện thoại** (`docs/KE_HOACH_DIEN_THOAI_MAY.md`, CSS trong khối `@media (max-width:600px)` riêng cuối `css/app.css`) — **TK 3 giữ `dt.html`**; ② **phép thử theo mức thay đổi** (CLAUDE.md): sửa nhỏ → nhóm liên quan, đụng phần chung / trước bản lớn / định kỳ → hồi quy đủ; ③ **`tools/hoiquy.sh` sửa (3.361)**: chạy cả `t3xx` (trước bỏ sót t300–t302). |
| 25/10 | TK 2 → TK 3 | **Anh nhắn 25/10: "điện thoại luôn có mạng, không cần chế độ offline"** → không làm chế độ không mạng cho `dt.html` (xem mục 6, đoạn "Anh chốt 25/10"). Mặc định iPhone + giữ / thôi `dt.html`: đang chờ anh nói rõ. |
| 25/10 | TK 2 → TK 3 | **Anh 25/10: "`dt.html` vẫn giữ nhưng tối ưu hơn, chỉ nạp kỳ gần nhất"** → việc của TK 3 (mục 6). |
| 25/10 | TK 2 → TK 3 | **Trùng số + trùng việc 3.370 / 3.371:** TK 2 đã làm "mở thẳng bản máy tính" song song với TK 3 → TK 2 bỏ bản của mình, giữ bản TK 3, nối Đ6 thành **3.372**. Đ6 thêm 📱 vào ☰ Thêm (giữ nút 📱 nổi của TK 3, không đổi t193 / t262 / t266). **Để tránh trùng lần sau:** việc điện thoại trong `index.html` — TK 2: khung (thanh dưới, đầu / chân trang, Tra cứu, Hôm nay, Số liệu); TK 3: Văn bản + Scan (`css/dt-may-vbsc.css`) + `dt.html`. |
| 25/10 | TK 2 → TK 3 | **Rà phép thử (anh duyệt "bỏ phép của chức năng đã gỡ"):** bỏ t97, t97m, t97w, t98, t101_mau10_cu (Mẫu 10 đã bỏ từ 3.120 + tab Số liệu đời 3.85; t98 đồng bộ Số liệu Drive → đã có t103). 2 bộ dữ liệu `tests/gia`, `tests/gianho` không còn phép nào dùng (vốn không vào repo — `.gitignore`); `tools/hoiquy.sh` thôi nối 2 thư mục đó. Còn 8 phép cũ ngoài hồi quy (t87, t88, t89, t93–t96, t99) chỉ in số đo, không có câu kiểm — chờ anh quyết bỏ / giữ. |
| 25/10 | TK 2 → TK 3 | **Anh chốt 25/10: "Nên giữ nút chuyển bên ngoài"** → nút 📱 nổi (`#ve-dt`, `js/60`) GIỮ trên điện thoại, không ẩn; lối 📱 trong ☰ Thêm (3.372) chỉ là lối phụ. |
| 25/10 | TK 2 → TK 3 | **BÀN GIAO TOÀN BỘ (anh 25/10: "Sau phần này anh sẽ qua tk 3 làm tiếp trong 2 ngày em bàn giao toàn bộ")** → đọc **`docs/BAN_GIAO_TK2_2510.md`**: trạng thái `main` 3.372, quyết định anh chốt (nguyên văn), việc dở / chờ anh, ai sửa gì ở bản điện thoại, quy trình 1 bản, bẫy. |
| 25/10 | TK 2 → TK 3 | **Anh chốt: "Em giao hết sang cho tk 3 tiếp nhận trong 2 ngày"** → TK 3 tiếp nhận toàn bộ, được sửa cả file TK 2; TK 2 tạm dừng (không sửa / gộp). Xem `docs/BAN_GIAO_TK2_2510.md` mục 0. |
| 25/10 | TK 3 → TK 2 | **Anh chốt bản chính điện thoại = bản máy tính của TK 2, dt.html = bản phụ** (mục 6). TK 3 sẽ sửa `index.html` dòng 7–9 (bỏ tự chuyển) + `js/60-ve-dt.js` (G1) khi anh nhắn "code" — TK 2 tránh sửa 2 chỗ này cùng lúc. **G3**: TK 2 có muốn giao TK 3 phần Văn bản + Scan trong `css/dt-may.css` (khối riêng) không? Trả lời ở đây. |

## 6. Hai bản trên điện thoại — rà chồng chéo + đề xuất phân việc (TK 3 lập 25/10 — **anh chốt 25/10: "bản chính như máy tính, điện thoại là bản phụ cho gọn"**)
Anh 25/10 giao TK 2 tinh chỉnh **bản máy tính trên điện thoại** (`index.html` + `css/dt-may.css`, `KE_HOACH_DIEN_THOAI_MAY.md`, đã xong Đ1–Đ5 ở 3.361–3.366); TK 3 giữ **`dt.html`** (`KE_HOACH_DIEN_THOAI_2.md`).

**Chỗ đang trùng / vướng (số liệu thật từ repo):**
| # | Việc | TK 2 (index.html trên ĐT) | TK 3 (dt.html) |
|---|---|---|---|
| 1 | Hôm nay (lịch + ghi chú) | 3.364 gọn lịch, sổ ngày | 3.354 tab Hôm nay riêng (đọc / ghi chung `lich.json`) |
| 2 | Thẻ khách / món vay | 3.362 thẻ món vay chip màu | 3.343 thẻ khách 5 ô, hạn tô màu |
| 3 | Mặc định iPhone | — | `index.html` dòng 7–9 **tự chuyển sang dt.html** → anh chỉ thấy bản TK 2 khi bấm 🖥 (nút 📱 `js/60` đưa về dt.html) |
| 4 | Nguồn số liệu | dữ liệu đầy đủ của bản web trên máy đó | gói `xem.json.gz` máy tính đẩy (iPhone đang báo "chưa có số liệu") |

**Đề xuất (TK 3):** 1 bản chính trên điện thoại = **bản máy tính tinh chỉnh (TK 2)** — đủ chức năng, cùng giao diện, không phải làm 2 lần. `dt.html` thu về **"chế độ gọn không mạng"**: tra khách + văn bản 📌 ghim + chụp scan → khay chờ; **TK 3 dừng làm thêm giao diện trùng** (Hôm nay, thẻ khách) trong dt.html.
- TK 3 nhận phần điện thoại của **Văn bản + Scan** trên bản máy tính, theo cách TK 2 đã làm: khối riêng trong `css/dt-may.css` (đánh dấu `/* TK 3 — Văn bản / Scan */`, TK 3 chỉ sửa trong khối đó) + file JS mới cắm rút nếu cần; không sửa `css/app.css` / khung, việc cần đụng chung thì báo mục 5.
- Mặc định iPhone (mục 3 bảng trên): **anh chốt** — giữ tự chuyển sang dt.html, hay mở thẳng bản máy tính (dt.html vào bằng nút / khi không có mạng). Bên nào sửa `index.html` dòng 7–9 + `js/60-ve-dt.js` do anh giao (đề xuất TK 3, vì 2 chỗ đó TK 3 làm từ 3.342).
- Lịch: cả 2 bản cùng `_Hệ thống/lich.json` — giữ như 3.354.

**Anh chốt 25/10 (nhắn TK 2, nguyên văn):** *"Em báo tk3 điện thoại luôn có mạng ko cần chế độ offline"*.
- → **Không làm "chế độ gọn không mạng"** cho `dt.html` (bỏ phần đó khỏi đề xuất trên); TK 3 **không làm thêm** gói `xem.json.gz` / xem không mạng.
- TK 2 hiểu (chưa phải lời anh, chờ anh xác nhận): bản chính trên điện thoại = bản máy tính tinh chỉnh (Đ1–Đ5 xong 3.361–3.366); việc còn lại cần anh nói rõ — **mặc định iPhone mở thẳng bản máy tính** thay vì tự chuyển `dt.html`, và **`dt.html` giữ hay thôi**. Chưa ai sửa `index.html` dòng 7–9 / `js/60-ve-dt.js` cho tới khi anh chốt.
- **Anh chốt tiếp 25/10 (nguyên văn):** *"2 vẫn giữ nhưng tối ưu hơn, chỉ nạp kỳ gần nhất"* (trả lời câu "`dt.html` giữ hay thôi") → **giữ `dt.html`**, TK 3 tối ưu: **chỉ nạp số liệu kỳ gần nhất** (không nạp các kỳ cũ). Mặc định iPhone (tự chuyển `dt.html` hay mở thẳng bản máy tính): vẫn chờ anh.

**Anh chốt 25/10:** bản chính trên điện thoại = **bản máy tính (TK 2 tinh chỉnh)**; `dt.html` = **bản phụ gọn**. Kế hoạch TK 3 (chờ anh nhắn "code"):
| Bước | Việc | File |
|---|---|---|
| G1 | Điện thoại mở `index.html` **ở lại bản máy tính** (bỏ tự chuyển sang dt.html; `?dt=1` vẫn mở bản gọn); nút 📱 → "Bản gọn" hiện ở bản máy tính trên mọi điện thoại; `dt.html` nút 🖥 về bản chính, nhớ lựa chọn cũ không làm kẹt (cờ `tuhoso_ban` cũ = 'may' vẫn đọc được) | `index.html` dòng 7–9, `js/60-ve-dt.js`, `js/dt/dt-giao-dien.js`; t193 / t262 sửa theo |
| G2 | `dt.html` **dừng thêm giao diện trùng**; giữ: Hôm nay (dùng chung lịch), tra khách, Văn bản, Scan → khay chờ; **anh chốt sau: luôn có mạng, không làm thêm chế độ không mạng; chỉ nạp kỳ gần nhất** (mục trên); chỉ sửa lỗi | `js/dt/*` |
| G3 | Văn bản + Scan của **bản máy tính trên điện thoại** — chỉ làm nếu TK 2 đồng ý giao (mục 5), trong khối riêng `/* TK 3 — Văn bản / Scan */` của `css/dt-may.css` | `css/dt-may.css` (khối riêng) |
| 25/10 | TK 3 → TK 2 | **3.371 — Văn bản + Scan trên điện thoại (bản chính) TK 3 làm theo anh 25/10 "làm tiếp văn bản và scan"**, để ở **file riêng `css/dt-may-vbsc.css`** (chỉ `#nam-vb`, `#ds-vb`, `#tr4`); TK 2 khỏi làm 2 tab này trong `css/dt-may.css` để tránh chồng. Nếu TK 2 đổi lớp HTML của 2 tab này thì báo TK 3. |
