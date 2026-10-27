# Bàn giao TK 3 → TK 2 (27/10/2026)

> Anh 27/10: *"còn khoảng 7% token giới hạn tuần, em tranh thủ làm và chốt bàn giao cho TK2 làm tiếp"*.
> File này là trạng thái + việc dở + thiết kế anh đã duyệt (nguyên văn) để TK 2 làm tiếp. Đọc kèm: `CLAUDE.md`, `docs/BAT_DAU.md`, `docs/PHOI_HOP_TK2_TK3.md` (nhật ký gộp), `docs/QUY_CHUAN_KIEN_TRUC.md` (mục 15 kho chuẩn · 16 hiện tổ · 17 bộ lọc), `docs/CHANGELOG.md` (3.377 → 3.385.x).

## 1. Trạng thái
- `main` = **3.387** (rà soát cuối của TK 3 — mục 6). Trước đó 3.386.2 (TK 3, nhánh `claude/busy-curie-2qescm`). Hồi quy: mốc đã chốt `tests/hoiquy_moc.json` (192 phép), bảng `docs/DA_CHOT.md`.
- **Cách chạy hồi quy mới (3.384):** `bash tools/hoiquy.sh <tên> <tmp> doi 2` — chỉ chạy phép chưa chốt / có file phụ thuộc đổi (`tools/hoiquy_pt.py`); đổi file phần chung (`CHUNG` trong `tools/hoiquy_pt.py`: index.html, KHO, bộ lọc 22ga, hộp thoại 06…) → chạy hết. Hồi quy đủ `tat` định kỳ 3–4 bản. Cột ✗= chỉ đếm dòng bắt đầu bằng ✗. Thêm báo cáo Sao kê mới → nhớ `node tests/t276.js --chup` (chỉ khi báo cáo cũ không đổi) + danh sách nhóm ở t205.
- Hồi quy đủ trên 3.386: 191/192 đạt; t308 trượt do phép thử bấm nút 👁 Xem cũ (Sao kê 2 màn không còn nút này) → sửa gọi `skPhongTo()`, đạt. 3.386.1–3.386.2 (logo, chữ b105) sau lượt đó: chạy `doi` sẽ chạy lại phép phụ thuộc `js/22h`, `js/22i`, `js/72`.
- Không có việc chạy dở trong code.

## 2. TK 3 đã làm (26–27/10) — chi tiết `docs/CHANGELOG.md`
| Bản | Việc |
|---|---|
| 3.380–3.382 | Báo cáo Biến động TK 105 (`js/72`); KHO CHUẨN `js/73` (gốc Mẫu 31 nguyên bản + gắn TK 105/104 theo mã KH, QH/khoanh/KHĐ theo KU, tổ theo mã tổ); Sao kê / Tổng hợp / Thông tin tổ đọc qua kho (t275, t276 bản chụp 66 báo cáo) |
| 3.383.x | Lọc Ấp/KP, lọc đa chiều, nút ↺; Tra cứu gọn; thẻ tổ TT/TP, màu dư nợ QH/khoanh/3T KHĐ; dòng cộng ds tổ; **chỉ hiện tổ chưa đóng** (QUY_CHUAN 16); **lọc địa bàn nhớ phiên + 📌 ghim từng ô + đổi cấp cao → cấp dưới Tất cả + dải tiêu đề** (QUY_CHUAN 17); nút 📊 Biến động TK 105 ở thẻ tổ |
| 3.384 | GDX / Tra cứu / TK 104-105 / js/62 / js/63 đọc qua kho (thước đo `kiem.py` "đọc thẳng bảng gốc" = 0); hồi quy theo đổi |
| 3.384.1 | Bỏ 9 hàm không dùng; `thXem` → `tests/tro_thxem.js` |
| 3.385 | **Sao kê theo nhà đầu tư** (`js/74-sk-ndt.js`, t279) |
| 3.385.1 | Khổ **dọc** mặc định cho báo cáo dạng danh sách (mục 3.2) |
| 3.386 | **Sao kê 2 màn ĐÃ LÀM** (mục 3.2): màn chọn + màn xem trải ngang tự vẽ lại (`skCH().man`, `#sk-xem-khung`, `skXemHen`, `skPhongTo`) |
| 3.386.1–2 | Logo cánh sen bản in; Biến động TK 105 cột Ghi chú 6,5 pt |
| 3.387 | Rà soát: dọn rác, khuôn in chung `js/75`, báo cáo Sao kê cắm rút (mục 6) |

## 3. VIỆC TIẾP THEO — anh đã duyệt hướng (27/10), TK 2 làm
### 3.1 Khuôn chuẩn các tab Số liệu = bố cục Tra cứu KH
- Anh: *"tab tra cứu KH là chuẩn cho các tab số liệu, trừ KTGS và Phân bổ em lưu ý là 1 dạng riêng"*; *"KTGS em cũng có thể áp nhưng cẩn thận tránh mất dữ liệu cũ"*; *"KTGS nên cân nhắc làm sau"*; *"bộ lọc ở các tab con chỉ gọi bộ lọc chuẩn"*.
- Hiện trạng: 8 nơi đã gọi chung `pvVeCay` (js/22ga) + chung địa bàn; nhưng mỗi tab tự vẽ phần quanh bộ lọc, CSS riêng (Tra cứu 5 chỗ `#tc-cay`, KTGS 1, GDX 1), ô 🔎 tìm tổ nằm trong hàng lọc (chật, cắt chữ — trừ Tra cứu).
- Làm: (a) bộ lọc giống hệt mọi tab, bỏ CSS riêng; ô 🔎 tìm tổ → nút 🔎 trên dải tiêu đề `.pv-dau` (bấm mở ô gõ); (b) dòng nguồn số liệu màu cam (`kyGhiHTML` / `slNguonHTML`) → 1 chip gọn trên dải tiêu đề ("📅 Số liệu dd/mm/yyyy · ⚠ n file dùng tháng trước", rê chuột chi tiết).
### 3.2 Sao kê 2 màn — ĐÃ LÀM 3.386 (còn: chip nguồn + nút 🔎 ở 3.1, khung xem "vừa 1 trang" cho báo cáo tổng hợp) (anh: *"demo 2 là phần xem của chọn báo cáo"*; *"có khung view sẽ trực quan, nhưng cảm thấy hơi tốn chỗ"*)
- **Màn 1 — chọn báo cáo:** danh sách nhóm như hiện nay (`SK_NHOM` / `SK_BC`) nhưng gọn: tên ngắn (phần trước " — "), mô tả dài ở title, ghi khổ; bỏ hàng "Khổ / 👁 Xem" trên đầu; bấm báo cáo → màn 2.
- **Màn 2 — xem (demo 2):** hàng thao tác 1 dòng: **← Danh sách** · ô sổ 📑 Báo cáo (optgroup theo nhóm) · Khổ Dọc/Ngang · tùy chọn riêng của báo cáo (khoảng ngày `bc.ngay`, ô NĐT `ndtOHTML()`) · 📊 Excel · ⤢ Phóng to; dưới là **khung xem trải hết bề ngang** (iframe, `xemChuan`), đổi báo cáo / lọc → tự vẽ lại (như `thXemNgay` của Tổng hợp). Nhớ màn + báo cáo lần trước (`skCH().man`).
- Anh: *"khi hiện báo cáo nên tối ưu để hiện trong 1 khung, in trong 1 trang, nếu dạng DS thì nên in dọc cho tối ưu"* → khung xem mặc định "vừa khung" (vừa bề ngang trang); báo cáo tổng hợp / biểu mẫu tự co vừa 1 trang; danh sách khổ dọc, cột gọn (ngày dd/mm/yy — `skNg`), lặp tiêu đề cột mỗi trang. **Đã làm phần khổ dọc mặc định (3.385.1)**; giữ ngang: kqgd (biểu mỗi điểm 1 trang), b105 (13 cột, anh chốt ngang 26/10).
- Demo dựng bằng playwright trên dữ liệu giả: ghép `#sk-cay` + hàng thao tác + iframe `srcdoc` lấy từ hộp `skXem()` — TK 3 đã gửi ảnh anh (2 demo), anh chọn demo 2 cho màn xem.
### 3.3 Thứ tự: Sao kê → Tổng hợp (cùng 2 màn) → Tổ TK&VV (màn 1 = bảng tổ, chip DS · Nợ · TK · Chia tách lên hàng thao tác) → **KTGS sau cùng**
- KTGS: chỉ đổi bố cục; KHÔNG đổi chỗ lưu (bộ khai báo, nhận xét, `ktgsGN`, `KT_KB`…); KHÔNG sửa hàm dựng mẫu (t179 chuẩn khóa phải giữ 100%); phép thử t106/t108/t110/t111/t114 + nhóm `kt` đạt; thêm phép nạp dữ liệu KTGS cũ rồi mở màn mới.

## 4. Chờ anh / ghi nhớ
- Tên nhà đầu tư: anh tự gõ ở ✏ Tên NĐT (lưu `D.cauHinh.slNdtTen`, không vào repo). File thật 25/10: 5 mã (trống/TW, INV…3650/ĐP, INV…0215/TW, INV…6659/ĐP, INV…6658 chỉ còn 1 món CLOSE).
- Giữ `pbNguon`, `pbTongHopCT` (lớp nghiệp vụ Phân bổ KH — t250).
- Quy tắc hiện tổ (QUY_CHUAN 16): kỳ chỉ có Mẫu 31 (thiếu Danh sách tổ) thì ẩn cả tổ chưa đóng mà hết TV — nhắc anh nạp file Tổ trưởng cùng ngày.
- Repo công khai: file thật anh gửi chỉ phân tích trong thư mục nháp, chỉ báo số đếm.

## 5. Câu anh hỏi cuối (27/10) — chưa làm
- *"ngày hộ vay CK vào TK em lấy được không"*: file Sao kê TK 105 hiện chỉ có số dư (ngày báo cáo, tháng trước) + ngày đăng ký TK — **không có ngày từng lần chuyển khoản**. Mẫu 31 chỉ có "Ngày giao dịch gần nhất" của món vay (ngày tổ trưởng thu). Muốn có ngày khách CK cần file **sao kê giao dịch chi tiết TK 105** (từng lần nộp / rút) — hỏi anh hệ thống xuất được không, có thì thêm loại file mới + cột "Ngày CK gần nhất" vào báo cáo Biến động TK 105.

## 6. Rà soát 3.387 (anh 27/10) — đã làm + quy ước TK 2 phải giữ
Anh: *"rà soát cấu trúc bố cục, code em làm 2 hôm nay, chú ý dọn code rác, hồi quy cũ không còn dùng, quy tắc cắm rút, mọi thứ đọc qua kho, dữ liệu tập trung, mẫu biểu tập trung (cái này anh chưa nắm rõ), tối ưu lưu trữ nên lưu các dữ liệu tạm khi mở trên máy tính"*.

| Ý anh | Hiện trạng sau 3.387 | TK 2 làm tiếp |
|---|---|---|
| Dọn code rác | Bỏ CSS `.sk-thanh*`, `.sk-bc`, nhãn "LỌC ĐỊA BÀN" cũ, `PV_KIEU`; `kiem.py` mồ côi = 0 | Mỗi bản giữ mồ côi 0 (`python3 tests/kiem.py --mo-coi`) |
| Hồi quy cũ | `hoiquy.sh` chỉ còn `doi` (mỗi bản) / `tat` (định kỳ); bỏ `tools/hoiquy_nhom.txt` | Gỡ chức năng → xóa phép thử của nó + chạy `python3 tools/hoiquy_pt.py` cập nhật mốc |
| Cắm rút | **Báo cáo Sao kê mới = 1 file riêng + 1 dòng** `SK_BC.push({k, ten, nhom, kho:'doc'|'ngang', lap:function(){…return {html, aoa, tieuDe…}}, tuyChon:fn trả HTML ô riêng})`; `skBaoCao(k)` gọi `lap()` trước, `veSaoKe` gọi `tuyChon()`. Mẫu: b105 cuối `js/72`, ndt cuối `js/74`. File mới phải nạp SAU `js/22h` trong `index.html` | Chuyển dần báo cáo còn nằm trong `skBaoCao` (js/22h: cgn, dh, noxh, ddn, tkhd, kqgd…) sang `lap()` — mỗi lần 1 báo cáo, t276 phải giống hệt |
| Đọc qua kho | `kiem.py`: "đọc thẳng biến kho" 0, "đọc thẳng bảng gốc" 0 (mốc 0 — vượt là trượt) | Báo cáo mới lấy món từ `kcGoc(K.B)`, tổ từ `K.to` / `kcTo`, TK từ `kcTK` — không đọc bảng nạp |
| Dữ liệu tập trung | Cấu hình lưu `D.cauHinh.*` theo khối (`chKhoiCua`); tên NĐT `slNdtTen`, ghim `pvGhimO`, lọc chung `pvChung` | Khóa mới phải khai khối, không lưu localStorage rời |
| **Mẫu biểu tập trung** (anh chưa nắm rõ) | Nghĩa là: mọi bản in dùng **chung 1 khuôn đầu trang** + chung khung in. Nay `js/75-khuon-in.js`: `bcDauTrang(ngay, tieuDeHTML, pvHTML)` (logo + đơn vị `BC_DV` + ngày + tiêu đề + phạm vi) — `toDauBC` (Tổ TK&VV), `skHTMLIn` (Sao kê), `thHTMLIn` (Tổng hợp) cùng gọi. Đổi logo / tên đơn vị / cỡ chữ đầu trang → sửa 1 chỗ | Gom tiếp vào `js/75`: chân trang ký tên, CSS bảng in dùng chung (`.bc-khung`, khổ dọc/ngang); KTGS và Hồ sơ vay giữ khuôn Word riêng (không gộp) |
| Lưu tạm khi mở máy tính | **Đo trên số liệu thật 25/10 (thư mục nháp, 379 tổ):** đọc bảng lần đầu ~885 ms; dựng kho `KHO.nap` 63 ms; `kcDung`+gắn TK 105 17 ms; lần 2 trong phiên 0 ms (đã nhớ). → Lưu kho đã dựng vào IndexedDB chỉ bớt ~80 ms, lại phải lo khóa hết hạn khi nạp file mới → **không làm** | Nếu muốn nhanh hơn: phần đáng là 885 ms đọc bảng (giải nén / dựng bảng từ chỗ lưu) — đo kỹ `slBo` từng bảng trước khi làm; chỉ máy tính; khóa = kỳ + dấu thời gian nạp file; tối đa 3 kỳ |

**Hồi quy đủ trên 3.387 (27/10): 191/192 đạt;** t133 trượt vì bản in Tổ TK&VV nay có logo (khuôn chung) → sửa phép thử nhận logo, 12/12 đạt. Mốc 192/192.

### Việc còn lại cho TK 2 (thứ tự đề xuất)
1. Mục 3.1: chip nguồn số liệu + nút 🔎 tìm tổ trên dải `.pv-dau`; bỏ CSS bộ lọc riêng từng tab (`#tc-cay`, KTGS, GDX).
2. Mục 3.2 phần còn: báo cáo tổng hợp / biểu mẫu tự co vừa 1 trang trong khung xem.
3. Chuyển các báo cáo Sao kê còn lại sang cắm rút (mục 6).
4. Tổng hợp → khuôn 2 màn như Sao kê; Tổ TK&VV (mục 3.3).
5. **KTGS sau cùng**, giữ dữ liệu cũ (mục 3.3).
6. Ngày khách CK vào TK 105: chờ anh có file sao kê giao dịch chi tiết (mục 5).

## 7. Đề xuất tinh gọn code + hướng phát triển (TK 3, 27/10 — anh: "em cứ ghi vào")
Số đo `tests/kiem.py` 3.387: 93 file js (~3,6 MB), 192 phép thử, 4 file >150 KB (`25-ho-so` 320 KB, `12-scan` 176, `04b-hom-nay` 176, `06-hop-thoai` 160), 159 dòng >400 ký tự, 1.371 `onclick/onchange/oninput` trong chuỗi (đã giảm 88 so với mốc — anh dọn).

### Tinh gọn (giữ chức năng, không đổi giao diện) — thứ tự đề xuất
1. **A1 — Cắm rút hết báo cáo Sao kê**: `skBaoCao` (js/22h) còn ~17 nhánh → mỗi báo cáo ra file riêng `SK_BC.push({…lap})` như b105 / ndt; mỗi lần 1 báo cáo, t276 phải giống hệt.
2. **A2 — Tách 4 file lớn theo khối** (dữ liệu / mẫu in / màn hình), như R3 đã tách `22-so-lieu`; không đổi tên hàm, chỉ chia file + cập nhật `index.html` + `tools/hoiquy_pt.py` phụ thuộc.
3. **A4 — Dọn onclick theo màn**: sửa màn nào thì đổi nút màn đó sang 1 bộ bắt sự kiện chung (`data-lenh`), không dọn đồng loạt. Nhiều nhất: `12-scan` 142, `04b-hom-nay` 103, `06-hop-thoai` 76, `04e` 62, `04c` 60, `25-ho-so` 59. Mỗi bản số `onclick` của `kiem.py` không được tăng.
4. **A5 — Rà phép thử định kỳ**: gộp phép trùng ý (nhiều phép cùng mở Sao kê bằng bộ giả), bỏ phép chức năng đã gỡ.
- ~~A3 gom localStorage~~ — **bỏ**: rà kỹ, `localStorage` chỉ còn cho cài đặt riêng máy (phiên Scan quét dở `js/12`, bản dự phòng khi IndexedDB hỏng + công tắc cách lưu cũ `js/34`, thanh bên `tb_gon`/`tb_mo`, PIN / cài đặt điện thoại, nhật ký lỗi, đo tốc độ). Dữ liệu nghiệp vụ đã ở kho chung (IndexedDB qua `js/34`, `D.cauHinh`). **Quy ước:** khóa `localStorage` mới chỉ dùng cho cài đặt riêng máy, tên `tuhoso_…`.

### Hướng phát triển (chờ anh chọn)
- B1 Tốc độ mở: đo `slBo` từng bảng (~0,9 s lần đầu) trước khi tính lưu tạm (mục 6).
- B2 Một khuôn màn cho mọi tab Số liệu (mục 3).
- B3 Báo cáo đối chiếu tự động mỗi kỳ: Mẫu 31 ↔ TK 105 / Thông tin tổ, báo tổ / khách lệch (1 báo cáo cắm rút đọc kho).
- B4 `dt.html` đọc kho chuẩn chung, tránh 2 cách tính.
- B5 Loại file sao kê giao dịch chi tiết TK 105 → ngày khách CK (mục 5).

**Thứ tự đề xuất cho TK 2:** A1 → B2 → A2 → A4 (dần) → A5; B3 xen khi anh cần.

## 8. Việc anh nêu 27/10 tối — trạng thái
- **3.388 ĐÃ LÀM:** nút ⬅ ➡ đầu trang nổi (nền + viền); thanh nút tab file nổi khỏi nền; kiểu xem luôn kèm tên chữ nhỏ (⊞ Bung · ⊟ Gọn · ▣ Khung xem).
- **CHƯA LÀM — chờ anh chọn:** thêm nút chức năng ở khoảng trống bên phải thanh tab file (`veDauTab`, `js/11-khung-tab.js`, phần `.dau-phai`). TK 3 đề xuất: 🔎 Tìm trong tab · ☑ Chọn nhiều · 📊 Xuất danh sách Excel · ☁ Đồng bộ ngay.
- **CHƯA RÕ NGUYÊN NHÂN — tên cán bộ Giao dịch xã bị mất** (ảnh anh 27/10: ô GDV / KSV / Tổ trưởng chỉ còn "— chấm ghi tay —"). Danh sách nằm ở `D.cauHinh.gdx.danhSachCanBo` (khối đồng bộ `gdx`, `CH_KHOI_LUAT` js/36); thêm / xóa: `gdxThemCanBo` / `gdxBoCanBo` (js/26). TK 3 rà các bản 3.380–3.388: không chỗ nào ghi đè / xóa danh sách. Nghi: máy / trình duyệt khác, hoặc nhận bản đồng bộ khối gdx cũ từ Drive. **Anh trả lời 27/10: "tên cán bộ anh khai trên máy Laptop chắc lưu trên đó"** → không phải mất dữ liệu: cấu hình `gdx` đi theo khối đồng bộ `gdx` (khóa `gdx` khớp `/^gdx/` trong `CH_KHOI_LUAT`). Cách lấy: trên Laptop bấm ☁ đồng bộ (đẩy lên Drive) → máy này đồng bộ (kéo về). Nếu làm vậy vẫn không có → mới là lỗi app: kiểm tra khối `gdx` có đẩy `D.cauHinh.gdx.danhSachCanBo` không, thêm phép thử.
- **Nút ⋯ tab file (anh hỏi "có chức năng nào không dùng không"):** 🗂 Lập chỉ mục (giữ) · 📂 Chép đường dẫn ổ G (bỏ nếu anh không dùng ổ G) · ☁ Mở thư mục Drive (giữ) · 🏷 Sửa danh sách tag (trùng nút "Sửa tag" trong ⚲ Lọc → bỏ). **Chờ anh trả lời có dùng ổ G không + nhắn "code".** Sửa ở `moThemTab` (`js/11-khung-tab.js`).
- **Chép văn bản / file scan khó chịu (anh 27/10: "rất khó chịu nên có giải pháp"):** hiện chép file phải qua cầu nối Windows (`.reg` + PowerShell, `js/12-scan.js` mục CẦU NỐI, `chepNhieu` tối đa 20 file, cần ổ G đã đồng bộ, trình duyệt hỏi mỗi lần). Trình duyệt chỉ cho chép chữ / ảnh PNG. TK 3 đề xuất (chờ anh chọn + trả lời: dán Zalo máy tính hay gửi từ điện thoại; thường là scan/ảnh hay PDF/Word nhiều trang): **A** 📋 chép ảnh thẳng (PDF/scan → PNG, nhiều trang ghép dọc) · **C** ⬇ tải gói nhiều file (ZIP tự viết không nén, ES5, không thư viện) rồi kéo vào Zalo · B 📤 `navigator.share` (điện thoại) · D 🔗 chép link Drive · E giữ cầu nối + hướng dẫn tick "Luôn cho phép". Đề xuất làm A + C trước, nút ở hàng thao tác từng file + thanh "Chọn nhiều" (`js/06b-xoa-nhieu.js`).
- **Chép FILE THẬT (anh 27/10: "anh cần chép file thật nên em nghiên cứu giải pháp") — TK 3 nghiên cứu, CHỜ ANH DUYỆT HƯỚNG "cầu nối bản 3":** trình duyệt KHÔNG cho web đặt danh sách file (CF_HDROP) vào bộ nhớ tạm — chỉ chữ / PNG → bắt buộc qua cầu nối Windows hiện có (`tuhoso:` + PowerShell `SetFileDropList`, `js/12-scan.js` mục CẦU NỐI). Sửa:
  1. **Bỏ giới hạn 20 file / 1.800 ký tự:** app `navigator.clipboard.writeText(danh sách đường dẫn tương đối)` → gọi `tuhoso:chepclip`; PowerShell `Get-Clipboard` đọc danh sách, kiểm tra an toàn như `chepn` (chỉ trong thư mục Tủ hồ sơ / thư mục tạm, chỉ PDF / Word / Excel / ảnh, không "..") → `SetFileDropList`. Giữ `chepn` cũ cho máy cầu nối bản 2.
  2. **Không cần ổ G:** file chưa có trên ổ G → app tải từ Drive API (token đang đăng nhập) ghi vào thư mục tạm cố định qua File System Access (`showDirectoryPicker` 1 lần, nhớ handle ở IndexedDB; gợi ý `Downloads\TuHoSo-chep`, đường dẫn tuyệt đối anh khai 1 lần để cầu nối biết) → cầu nối chép từ đó; bản tạm tự xóa sau 12 giờ (như lệnh `xem`).
  3. **Hết hỏi mỗi lần:** hướng dẫn lần đầu tick "Luôn cho phép" ở hộp hỏi của Chrome / Edge.
  4. Nhận biết máy chưa cài / bản cũ (`cnBan2` → thêm `cnBan3`) → mời tải `.reg` bản 3.
  5. Phụ (không cầu nối): kéo file từ dòng danh sách ra ngoài (`dataTransfer.setData('DownloadURL', mime+':'+tên+':'+url)`, Chrome) — thả ra Desktop / thư mục được; thả thẳng vào Zalo chưa chắc, cần anh thử.
  - Phép thử: script PowerShell chạy chế độ `TUHOSO_THU` (đã có) cho `chepclip`; phần trình duyệt giả lập `goiCauNoi`. Anh phải thử máy Windows thật.
