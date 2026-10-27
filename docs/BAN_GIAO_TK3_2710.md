# Bàn giao TK 3 → TK 2 (27/10/2026)

> Anh 27/10: *"còn khoảng 7% token giới hạn tuần, em tranh thủ làm và chốt bàn giao cho TK2 làm tiếp"*.
> File này là trạng thái + việc dở + thiết kế anh đã duyệt (nguyên văn) để TK 2 làm tiếp. Đọc kèm: `CLAUDE.md`, `docs/BAT_DAU.md`, `docs/PHOI_HOP_TK2_TK3.md` (nhật ký gộp), `docs/QUY_CHUAN_KIEN_TRUC.md` (mục 15 kho chuẩn · 16 hiện tổ · 17 bộ lọc), `docs/CHANGELOG.md` (3.377 → 3.385.x).

## 1. Trạng thái
- `main` = **3.386** (TK 3, nhánh `claude/busy-curie-2qescm`). Hồi quy: mốc đã chốt `tests/hoiquy_moc.json` (192 phép), bảng `docs/DA_CHOT.md`.
- **Cách chạy hồi quy mới (3.384):** `bash tools/hoiquy.sh <tên> <tmp> doi 2` — chỉ chạy phép chưa chốt / có file phụ thuộc đổi (`tools/hoiquy_pt.py`); đổi file phần chung (`CHUNG` trong `tools/hoiquy_pt.py`: index.html, KHO, bộ lọc 22ga, hộp thoại 06…) → chạy hết. Hồi quy đủ `tat` định kỳ 3–4 bản. Cột ✗= chỉ đếm dòng bắt đầu bằng ✗. Thêm báo cáo Sao kê mới → nhớ `node tests/t276.js --chup` (chỉ khi báo cáo cũ không đổi) + danh sách nhóm ở t205.
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
