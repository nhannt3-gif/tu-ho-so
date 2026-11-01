# KẾ HOẠCH KỲ ĐỐI CHIẾU SỐ LIỆU 31/10/2026 (app ↔ giao ban)

> **Bản 1.1 · 28/10/2026 · TK 1 soạn theo yêu cầu anh Nhân** ("khi có số liệu cuối tháng sẽ so sánh và quyết định sử dụng dữ liệu như thế nào, plan làm gì ghi rõ để TK 2 và TK 1 chia ra làm").
> Đây là **bước B5** của lộ trình (`PHOI_HOP_CHUNG.md` mục 10). Mọi việc có sửa code vẫn theo quy trình: kế hoạch → anh duyệt → "code" → PR → "gộp".
> Repo công khai: kết quả đối chiếu chi tiết (có mã tổ, tên) **chỉ lưu trên Drive**; vào repo chỉ ghi **số đếm tổng**.

## 1. Mục tiêu

1. Kỳ **31/10/2026** là kỳ đầu tiên **hai bên tính độc lập trên cùng bộ file** (nạp qua app) rồi so từng chỉ tiêu.
2. Từ kết quả so, **quyết định số nào được dùng** cho văn bản giao ban tháng 11 (Nội dung họp, TB KL — phiên đầu là **Truông Mít 2 ngày 19/11**).
3. Lệch nào cũng phải **có nguyên nhân và người xử lý**: luật chưa chốt → anh chốt; lỗi mã → bên đó sửa; dữ liệu hệ thống sai → danh sách sửa trên hệ thống.

## 2. Bộ file của kỳ (anh xuất ngày số liệu 31/10/2026, nạp qua app)

| # | File | MÃ (app 3.400) | Bắt buộc cho đối chiếu |
|---|---|---|---|
| 1 | Mẫu 31 | `MAU31_2026-10-31` | ✅ |
| 2 | File Tổ trưởng (**cùng ngày 31/10**) | `TOTRUONG_2026-10-31` | ✅ |
| 3 | 3 tháng KHĐ mẫu 14 (TW) | `KHD14_2026-10-31` | ✅ (cuối tháng phải đúng danh sách TW) |
| 4 | BCDHTD 01.1, 01.2 · LEN_31 ×4 | `BCDHTD011_…`, … | ✅ (kiểm khớp cấp xã) |
| 5 | Mẫu 01/TV | | ✅ nếu chốt K1 theo QT-18 |
| 6 | CLT02 / BC0437 | | có thì so xếp loại |
| 7 | Mẫu 31 30/09/2026 (kỳ trước) | đã có | ✅ (tăng / giảm) |

App ghi `DANH_MUC_NAP.csv` tháng 2026-10; giao ban **đọc sổ này** để lấy đúng file.

## 3. Hợp đồng cột — file đối chiếu hai bên cùng xuất (một dòng một tổ, thêm dòng "TT|<ấp>" cho món trực tiếp)

Tên file: app `DOI_CHIEU_APP_2026-10-31.csv` (lưu kho `Tủ hồ sơ\Số liệu\2026-10\`) · giao ban `DOI_CHIEU_GB_2026-10-31.csv` (lưu `0 Hop giao ban\04_DU_LIEU_XU_LY\2026-11\` — giao ban chỉ đọc kho) — **chỉ trên Drive**, không đưa vào repo. CSV UTF-8 có BOM; dòng 1 bắt đầu `#` = ghi chú (bên, bản, luật); dòng 2 = tiêu đề cột; tiền đồng nguyên.

| Cột | Nghĩa (theo luật) |
|---|---|
| `khoa` | mã tổ; món trực tiếp: `TT|<mã thôn>` |
| `ma_xa` · `ma_ap` · `ma_diem` | xã · ấp của tổ (File Tổ trưởng) · điểm GD theo QT-C-10 |
| `hoi` | HND / HPN / HCCB / ĐTN / TT (QT-C-06) |
| `so_tv` · `so_tv_du_no` | tổ viên (luật K1 đang dùng — ghi rõ ở dòng đầu file) · tổ viên còn dư nợ gốc > 0 |
| `du_no` · `nqh` · `khoanh` · `lai_ton` · `tien_gui` | đồng, nguyên (QT-C-01, 03) |
| `cho_vay` · `thu_no` | tháng (QT-C-02) |
| `so_mon_khd` | món 3 tháng KHĐ (hàm của bên đó — K5) |
| `so_mon_lech_ap` | món vay ở ấp khác ấp của tổ (QT-C-10) |
| `so_mon_den_han_thang_toi` | món đến hạn tháng kế tiếp ngày số liệu (kỳ 31/10 = tháng 11; K7) |

Dòng đầu file ghi: bên xuất · bản (app `APP_BAN` / script `PHIEN_BAN`) · luật K1/K5/K7 đang dùng · ngày số liệu.

## 4. Các bước

| Bước | Việc | Ai | Khi |
|---|---|---|---|
| **0** | **Chuẩn bị** (trước 31/10, cần anh "code"): mỗi bên áp QT-C-10…12 + xuất file đối chiếu đúng mục 3 | TK 2 · TK 1 | 29–31/10 |
| **1** | **Xuất + nạp** bộ file mục 2 qua app; kiểm `DANH_MUC_NAP.csv` đủ, đúng ngày | Anh (app kiểm) | **02/11** (anh 31/10: số liệu cuối tháng đến 02/11 mới đủ) |
| **2** | **Tính độc lập**: app xuất `DOI_CHIEU_APP_…`; giao ban chạy `bang_so_lieu.py` + xuất `DOI_CHIEU_GB_…` | TK 2 · TK 1 | ngay sau bước 1 |
| **3** | **So**: script `doi_chieu_app.py` (giao ban, Python; tên cũ `doi_chieu_teo.py`) đọc 2 file + biểu TW → `04_DU_LIEU_XU_LY\2026-11\KQ_DOI_CHIEU_APP_31-10-2026.xlsx` (sheet: Tổng xã · Theo điểm · Theo tổ · Lệch · Kiểm TW) | TK 1 | trong ngày |
| **4** | **Phân loại lệch** (mục 5) → ghi hộp thư **số đếm** từng loại; chi tiết ở file Drive | TK 1 | trong ngày |
| **5** | **Xử lý**: anh chốt luật còn treo · bên lỗi sửa + chạy lại · danh sách dữ liệu sai gửi anh sửa trên hệ thống | Anh · TK 2 · TK 1 | trước 15/11 |
| **6** | **Quyết định dùng số** (mục 6) → anh duyệt → giao ban làm văn bản tháng 11 | Anh duyệt · TK 1 | trước 19/11 |

## 5. Phân loại lệch

| Loại | Dấu hiệu | Ai xử lý |
|---|---|---|
| **A. Luật chưa chốt** | lệch đúng ở chỉ tiêu K1 (tổ viên), K4, K5 (KHĐ), K7 (đến hạn) | Anh chốt → ghi `QUY_TAC_SO_LIEU.md` → bên lệch sửa |
| **B. Lỗi mã một bên** | cùng luật mà khác số; bên nào lệch với **biểu TW** (cấp xã) / **danh sách TW** (KHĐ) là bên sai | Bên sai sửa (app: TK 2 · script: TK 1), có hồi quy |
| **C. Dữ liệu hệ thống sai** | món lệch ấp so với tổ · tổ cùng ấp khác điểm · Mẫu 31 ↔ File Tổ trưởng khác điểm | Danh sách gửi anh sửa trên hệ thống; tạm tính theo tổ |
| **D. Khác nguồn / thời điểm** | file khác ngày, thiếu file | Anh xuất lại |

## 6. Quy tắc dùng số cho văn bản tháng 11 (đề xuất — chờ anh duyệt)

1. **Cấp xã / PGD:** phải **khớp tuyệt đối BCDHTD 01.1 / LEN_31** (dư nợ, trong hạn, NQH, khoanh, cho vay). Không khớp → chưa dùng, tìm nguyên nhân.
2. **Cấp điểm / Hội / tổ:** dùng **số giao ban** (script) **khi khớp app**. Chỉ tiêu lệch loại A còn treo → dùng theo khuyến nghị đã ghi ở `PHOI_HOP_CHUNG.md` mục 6B **và nêu rõ với anh** trước khi in.
3. **Món 3 tháng KHĐ cuối tháng:** **đúng danh sách TW** (Quy chuẩn giao ban 5.3); hàm hai bên chỉ để đối chiếu.
4. **Dữ liệu sai loại C:** không đưa nhận định dựa trên món đang chờ sửa; danh sách đưa vào phụ lục / việc giao (B6) nếu anh muốn.
5. Số đã đi văn bản: ghi bản app + bản script + file đã dùng vào nhật ký giao ban.

## 7. Tiêu chí "đã nối thật" (đạt thì từ tháng 12 bỏ bước so tay, chỉ còn bảng lệch tự động)

- 100% tổ cùng **điểm GD** ở hai bên; 0 món trực tiếp lệch điểm.
- Số tổ · tổ viên · dư nợ · NQH · khoanh **khớp 100%** cấp tổ.
- Cấp xã **khớp biểu TW**.
- KHĐ: hai hàm cùng ra danh sách TW (hoặc lệch có giải thích).

## 8. Chia việc tóm tắt

**TK 2 (app)** — lên kế hoạch, trình anh trước khi code:
1. Áp QT-C-10…12 (điểm GD theo chuỗi món → tổ → ấp → điểm; món trực tiếp theo ấp; chuyển QH "kể từ" ngày đến hạn; món trực tiếp ngay sau ngày đến hạn).
2. Nút / lệnh xuất `DOI_CHIEU_APP_<ngày>.csv` đúng mục 3, ghi vào thư mục tháng.
3. Danh sách "món lệch ấp so với tổ" (Cần xử lý).
4. K5: chạy `slKHDTinh` kỳ có file TW, ghi số đếm vào hộp thư.

**TK 1 (giao ban)** — chờ anh "code":
1. Script đọc file theo `DANH_MUC_NAP.csv` (vẫn đọc `03_DU_LIEU_GOC` cho tháng cũ).
2. Áp QT-C-10…12 trong `bang_so_lieu.py` / `tong_hop.py`; bỏ Gia Lộc 2 từ kỳ 11/2026.
3. Xuất `DOI_CHIEU_GB_<ngày>.csv` đúng mục 3.
4. Viết `doi_chieu_teo.py` (so 2 file + biểu TW → bảng lệch Drive).
5. Sau khi anh duyệt số: Nội dung họp / TB KL tháng 11 (điểm: Truông Mít 2, Gia Lộc, Truông Mít).
6. Sửa Quy chuẩn giao ban mục 3–5 theo sổ chung.

**Anh:** xuất + nạp bộ file 31/10 · chốt K1, K4, K5, K7–K9 · duyệt mục 6 · cho ngày GD Phước Thạnh · văn bản gia hạn.

## 9. Nhật ký

| Bản | Ngày | Nội dung |
|---|---|---|
| 1.0 | 28/10/2026 | TK 1 lập kế hoạch kỳ đối chiếu 31/10/2026 theo yêu cầu anh. |
| 1.1 | 28/10/2026 | TK 1: cột `so_mon_den_han_thang_toi`; chỗ lưu file GB / APP; định dạng CSV. Việc TK 1 mục 8 (1–4, 6) xong — `bang_so_lieu.py` v1.3, `doi_chieu_teo.py` v1.0, Quy chuẩn giao ban 2.2; `tong_hop.py` chưa áp. |
| 1.2 (TK 2) | 31/10/2026 | Anh 31/10: số liệu cuối tháng 02/11 mới đủ → bước 1 dời 02/11, bước 2–4 ngay sau (02–03/11). Luật mới áp cho kỳ này: QT-C-18, QT-C-22 (sổ luật 1.7). |
