# KẾ HOẠCH THỬ HAI MỐC 30/09 + 31/10/2026 — App ↔ Giao ban (bàn giao cho 2 TK làm song song)

> **Anh chốt 14/11/2026** (phiên đánh giá tổng thể App ↔ Giao ban): *"cả 2 hướng đều tính dựa trên số liệu gốc của app nạp, số liệu trên app là số liệu cứng còn giao ban linh hoạt có thể tinh chỉnh nhanh khi cần; app và giao ban lấy số liệu 30/9 và 31/10 làm mốc thử, không chờ đến cuối tháng 11"* · *"TK 1 làm qua app luôn … 2 TK song song làm cho nhanh"*.
> File này **thay phần thời điểm** của `KE_HOACH_KY_DOI_CHIEU.md` (kỳ đối chiếu dời 02/11 → tạm dừng 02/11 → nay **mở lại trên 2 mốc đã có số**). Khuôn file đối chiếu, phân loại lệch, tiêu chí "đã nối thật" vẫn theo file đó (mục 3, 5, 7).
> Repo công khai: kết quả chi tiết (mã tổ, tên) **chỉ trên Drive**; repo chỉ ghi **số đếm**.

## 1. Nguyên tắc (anh chốt 14/11)

1. **Một kho gốc:** App và Giao ban **đều tính từ bộ file anh nạp qua App** (`Tủ hồ sơ\Số liệu\<YYYY-MM>\<MÃ>_<YYYY-MM-DD>` + `DANH_MUC_NAP.csv`). Giao ban không tự lấy file ngoài kho.
2. **App = số cứng:** chỉ chứa luật đã chốt (`QUY_TAC_SO_LIEU.md` ✅) và có phép thử.
3. **Giao ban = linh hoạt:** được tinh chỉnh cách tính nhanh khi cần cho văn bản.
4. **Đề xuất kèm theo (chờ anh xác nhận — em đã trình 14/11):** mỗi lần Giao ban tinh chỉnh cách tính → ghi **1 dòng** ở `QUY_TAC_SO_LIEU.md` mục 2 (luật đang thử: ngày, nội dung, lý do); số trong văn bản khác số App → ghi rõ lý do ở nhật ký giao ban. Dùng ổn → anh chốt → App áp → thành luật ✅. Mục đích: "linh hoạt" không thành "lệch âm thầm".
5. **Hai mốc 30/09 + 31/10 là BỘ MỐC CỐ ĐỊNH:** sau này bên nào đổi cách tính → chạy lại 2 mốc, so lại trước khi dùng cho kỳ mới.

## 2. Hiện trạng file trên Drive (kiểm 14/11 — chỉ tên file, không mở nội dung khách)

| | Mốc 31/10/2026 | Mốc 30/09/2026 |
|---|---|---|
| File gốc trong kho App | **Đủ**, nạp 02/11, tên chuẩn: Mẫu 31, Tổ trưởng, KHĐ mẫu 14, BCDHTD 01.1 / 01.2, LEN_31 ×4, Mẫu 01/TV; `DANH_MUC_NAP.csv` tháng 10 có | Mẫu 31, BCDHTD 01.1 / 01.2, LEN_31 ×4, 01/TV — **tên kiểu cũ** (trước 3.400). **Chưa thấy File Tổ trưởng 30/09** (khi đó dùng DSTO) |
| Giao ban đã tính | `Bang_so_lieu_chuan_SL31-10-2026.xlsx`, **`DOI_CHIEU_GB_2026-10-31.csv`** (02/11); văn bản tháng 11: Nội dung họp 5 điểm, TB KL 3 điểm | Văn bản tháng 10 (Nội dung họp 7 điểm, 26/10); **chưa có `DOI_CHIEU_GB_2026-09-30.csv`** |
| App đã xuất `DOI_CHIEU_APP_…csv` | **chưa thấy** | **chưa thấy** |
| Bộ ví dụ chuẩn | — | Gia Lộc 2 (số 30/09 + phiên 07/10) — `GIAO_BAN_KY_NANG.md` mục 7 |

## 3. Các bước

| # | Việc | Ai | Ghi chú |
|---|---|---|---|
| **B0** | Kho mốc 30/09: thiếu File Tổ trưởng → **dùng bản Tổ trưởng gần nhất** theo QT-C-22 (thông tin tổ, điểm GD); ghi rõ "Tổ trưởng: bản dd/mm" ở dòng đầu cả 2 file đối chiếu. Nếu anh còn DSTO 30/09 trong kho → dùng làm Tổ trưởng | TK 2 (app đọc) · TK 1 (script đọc) | Không tự đổi tên file cũ; tên kiểu cũ vẫn đọc được — nếu cần chuẩn hóa: ⋯ › 🏷 Chuẩn hóa tên (**anh bấm**) |
| **B1** | **App xuất file đối chiếu 2 mốc:** chọn kỳ → Nạp & KT → 📤 (`slDCNut` / `slDCTinh`, `js/22k-nap-kt.js`) → `DOI_CHIEU_APP_2026-10-31.csv`, `DOI_CHIEU_APP_2026-09-30.csv` vào thư mục tháng | **Anh bấm trên máy** (AI không chạy được app với số thật) | Nếu app không cho xuất kỳ 30/09 (thiếu Tổ trưởng) → TK 2 sửa cho xuất kèm ⚠ (B0) |
| **B2** | **Giao ban xuất `DOI_CHIEU_GB_2026-09-30.csv`** (mốc 31/10 đã có) — đọc từ kho App, đúng khuôn `KE_HOACH_KY_DOI_CHIEU.md` mục 3 | **TK 1** | `bang_so_lieu.py` kỳ 30/09, kỳ trước 31/08 |
| **B3** | **So 2 mốc:** 🔎 So file giao ban trong app + `doi_chieu_app.py` → `KQ_DOI_CHIEU_APP_<ngày>.xlsx` (Drive `04_DU_LIEU_XU_LY`) | TK 1 (hoặc TK 2 — ai rảnh trước; ghi hộp thư để không làm trùng) | So cả **biểu TW cấp xã** (BCDHTD 01.1, LEN_31): bên nào lệch biểu TW là bên sai |
| **B4** | **Phân loại lệch** A luật chưa chốt · B lỗi mã một bên · C dữ liệu hệ thống sai · D khác ngày / thiếu file (`KE_HOACH_KY_DOI_CHIEU.md` mục 5) → **số đếm** từng loại vào hộp thư `PHOI_HOP_CHUNG.md` mục 14; chi tiết ở Drive | TK 1 | Lệch không giải thích được / K5 → nên dùng model mạnh |
| **B5** | **Sửa lỗi loại B** theo bên: app → TK 2 (có hồi quy); script → TK 1 | TK 2 · TK 1 | Sửa xong **chạy lại cả 2 mốc** |
| **B6** | **Chốt luật treo bằng số thật 2 mốc:** K5 (3 tháng KHĐ — chạy cả 2 hàm, so danh sách TW mẫu 14 kỳ 31/10), K4 / K9 (QT-C-15, 19 — trường hợp mẫu C15, C19) | Anh chốt · TK 1 ghi sổ luật · TK 2 áp app | |
| **B7** | **So văn bản:** bản nháp App (📝 Nội dung họp mẫu 08, 📄 TB KL 08/GDX) ↔ văn bản Giao ban đã phát hành (tháng 10 số 30/09, tháng 11 số 31/10) — số khác nhau phải có lý do (luật đang thử / lỗi) | TK 1 | Bộ ví dụ Gia Lộc 2 (30/09) đã có đáp án |
| **B8** | **Áp luật đã chốt chưa áp ở Giao ban:** QT-C-03 (lãi tồn — bổ sung 01/11), QT-C-23 (lãi tồn cao) — `TRANG_THAI_CHUNG.md` mục "Luật đã chốt nhưng một bên chưa áp" | TK 1 | Bản vá QT-C-14 (`cap_nhat_QTC14.py`) — anh đã chạy chưa? TK 1 kiểm trên Drive |
| **B9** | **Đạt tiêu chí** `KE_HOACH_KY_DOI_CHIEU.md` mục 7 trên **cả 2 mốc** → báo anh; từ đó mỗi kỳ chỉ còn bảng lệch tự động | TK 1 báo · anh xác nhận | |

## 4. Chia việc 2 TK song song (tránh đụng nhau)

| | **TK 1** (Giao ban + làm qua app) | **TK 2** (App chính) |
|---|---|---|
| Làm chính | B2, B3, B4, B7, B8; ghi sổ luật (QUY_TAC_SO_LIEU), hộp thư; script Drive `06_CONG_CU\v2` | B0 phía app, B1 hỗ trợ anh xuất, B5 phía app; áp luật anh chốt ở B6 vào app |
| File repo được sửa | `docs/` (sổ chung, sổ luật, nhật ký `GIAO_BAN.md`), `tests/chung/`, `tools/dap_an_giao_ban.py`, `tools/trang_thai_chung.py` | `js/`, `css/`, `index.html`, `tests/t*.js`, `docs/nhat_ky/APP.md` |
| Không sửa | `js/`, `css/`, `index.html` — **trừ khi anh giao rõ** (khi đó theo `PHOI_HOP_TK2_TK3.md` mục 2: fetch main + gộp main vào nhánh ngay trước gộp, lấy số bản kế tiếp, ghi 1 dòng mục 4) | Script Drive giao ban |
| Nhánh | `giao-ban/<việc>` | `claude/<tên phiên>` |
| Gộp | việc chỉ `docs/` / `tests/` / `tools/` → không lên số bản; vẫn chờ anh "gộp" | theo quy trình bản (`CLAUDE.md`) |

- **Giao nhau duy nhất:** khuôn file đối chiếu (`KE_HOACH_KY_DOI_CHIEU.md` mục 3) + phép thử chung (`tests/chung/truong_hop_mau.json`). Đổi khuôn → báo hộp thư trước, bên kia sửa cùng lúc (như t328).
- **PR còn mở:** #466 (TK 1, 02/11 — nạp CLT02 + Gia Lộc gộp còn 1 điểm ngày 23) — chờ anh "gộp"; TK 1 gộp `main` vào nhánh trước (sổ chung đã đổi nhiều từ 02/11).

## 5. Model nên dùng (anh hỏi 14/11)

| Việc | Model |
|---|---|
| Xuất / nạp, so 2 file, đếm lệch, ghi sổ, hộp thư (B1–B4 phần thường, B8) | model thường là đủ |
| Lệch không giải thích được, chốt K5, đề xuất luật (B4 phần khó, B6) | model mạnh |
| Sửa code app (B5, áp luật B6) | như TK 2 đang dùng |

## 6. Nhật ký

| Ngày | Ai | Nội dung |
|---|---|---|
| 14/11/2026 | phiên đánh giá tổng thể (TK chính) | Lập file theo anh chốt 14/11; kiểm tên file trên Drive (mục 2); chưa sửa code, chưa chạy so số. |
