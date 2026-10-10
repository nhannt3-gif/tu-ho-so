# KẾ HOẠCH — Bộ file chuẩn mới (3.145) + Kiểm tra kỳ thống nhất (3.146)

> Lập 10/10/2026 theo Q14–Q17 (`KIEN_TRUC_3_LOP.md`) và kết quả rà file thật 30/09 (`DU_LIEU_THANG.md`). **Chưa code** — chờ anh duyệt + "code".
> Không ghi dữ liệu thật. Số liệu dẫn chứng chỉ là số đếm.

## 1. Bộ file hằng tháng (anh chốt "ok" 10/10/2026)

| Nhóm | File | Vai trò | Chốt tháng |
|---|---|---|---|
| **Bắt buộc** (nguồn dữ liệu) | Mẫu 31 · Dư nợ chi tiết · DSTO | Mẫu 31 = số chính (món, khách, tổ, tổ trưởng, Hội, ấp, doanh số, nguồn vốn, Quyết định); Dư nợ chi tiết = điểm GD, TK 105, mục đích; DSTO = SĐT tổ trưởng, tổ phó, đủ tổ | cần đủ |
| **Đối chiếu chuẩn TW** | LEN_31 XAPUONG · DONVIUT · CHTRINH · TO_TRUONG · BCDHTD 01.1 · 01.2 | LEN_31: dư nợ + cây địa bàn (xã · Hội · chương trình · tổ). 01.1: doanh số theo xã. 01.2: theo chương trình. Báo cáo tổng quan PGD / xã / Hội / CT lấy thẳng (Q17) | cần đủ |
| **Phụ** (có thì đối chiếu thêm) | KHĐ mẫu 14 · Nợ quá hạn · Nợ khoanh · Nợ đến hạn phân kỳ · Tổng dư nợ theo CT | KHĐ: app tự tính từ Mẫu 31, đối chiếu file (nhiều tháng khớp → giữ phụ). Khoanh: ngày hết hạn khoanh. Phân kỳ: số tiền kỳ con | không |
| **Riêng KTGS** | BC0437 · BC0438 | Chấm điểm, xếp loại tổ; không theo khóa tháng | không |
| **Bỏ** (dữ liệu cũ vẫn đọc / xóa được, nạp mới báo "đã bỏ") | B32 · Thông tin tổ trưởng · Mẫu 10 · Mẫu 7 · Sao kê KH · KHĐ 08/KTNB | B32 → nguồn vốn + doanh số từ Mẫu 31; Thông tin tổ trưởng → DSTO (file 30/09 thiếu 18 tổ) | — |

## 2. Bản 3.145 — Bộ file chuẩn mới (nhỏ–vừa)
1. `SL_LOAI` / `SL_NHOM` / `SL_BAT_BUOC` theo bảng mục 1 (9 file chốt tháng). Ma trận Nạp hiện 5 nhóm: Bắt buộc · Đối chiếu chuẩn TW · Phụ · KTGS (khối riêng, 3.144) · Đã bỏ (chỉ khi còn dữ liệu).
2. **Cây tổ** (`toNap`): giữ thứ tự hiện có (Mẫu 31 → Dư nợ chi tiết điểm GD) nhưng **DSTO đứng trước Thông tin tổ trưởng** cho SĐT / tổ phó; Thông tin tổ trưởng chỉ còn đọc dữ liệu cũ.
3. **Tổ dư nợ 0** không có trong DSTO và không có dòng LEN_31 TO_TRUONG → cờ `anDN0`, **ẩn khỏi cây chọn tổ và bảng các tổ**; vẫn tra cứu được, vẫn hiện ở "đã tất nợ / ra khỏi tổ"; Kiểm tra kỳ liệt kê.
4. **KHĐ tự tính từ Mẫu 31** theo quy tắc hệ thống đã kiểm (DU_LIEU_THANG.md mục 3.90 — món còn dư nợ, ngày giao dịch gần nhất cách ngày số liệu ≥ 3 tháng…), dùng ở Tra cứu / Sao kê / KTGS khi tháng không có file KHĐ; có file thì dùng file và đối chiếu (mục 3 nhóm G).
5. **Tổng hợp:** báo cáo "theo nguồn vốn" tính từ Mẫu 31 (cột Nguồn vốn) thay B32; báo cáo 01.1 thêm cột "Số lượt KH vay vốn" theo quy tắc đã kiểm (số món giải ngân lần đầu trong năm, trừ đảo khoản); cho vay in 2 cột **gồm / không gồm đảo khoản**.
6. **📋 Danh sách file cần xuất** (anh yêu cầu ghi nhớ): ở tab Nạp & KT có nút mở bảng như `docs/FILE_XUAT_HANG_THANG.md` — tên file, **mẫu cần chọn khi xuất** (KHĐ = **mẫu 14**, không dùng 08/KTNB; Mẫu 31; Dư nợ chi tiết; DSTO; 01.1; 01.2; 4 LEN_31), dấu ✓ file tháng đang xem đã có.
7. Phép thử: t141 (nhóm file, chốt cần 9 file, ẩn tổ dư nợ 0, KHĐ tự tính ↔ file giả, nguồn vốn từ Mẫu 31). Bộ giả `taogia.py` thêm DSTO + LEN_31 / 01.1 dựng từ Mẫu 31 giả (đã có một phần ở t105).

## 3. Bản 3.146 — Kiểm tra kỳ thống nhất (vừa–lớn)
**Một nút "🔍 Kiểm tra kỳ"** ở tab 📥 Nạp & KT (thay ② Kiểm tra tháng + 🔍 KTGS), **một kết quả** lưu theo kỳ (`SLM.kt`; kết quả cũ `SLM.kt` / `SLM.ktg` vẫn xem được), dữ liệu đổi → "⟳ kiểm lại". Mỗi mục: **✓ khớp · ✗ lệch (đỏ) · ⚠ lưu ý (vàng) · · không đủ file**, bấm mục → danh sách chi tiết (xã / điểm / Hội / tổ / món), xuất Excel. Chỉ báo, **không sửa số nguồn**.

| Nhóm | Mục | Nguồn so | Mức khi lệch |
|---|---|---|---|
| **A. Đủ file** | 9 file chốt tháng · file phụ có / không · BC KTGS có / không | ma trận | ✗ thiếu file chốt · · phụ |
| **B. Toàn vẹn** | số dòng, mã khóa sai, dòng lặp · ngày số liệu theo nội dung (Q14), file anh khai ngày · file xuất sau ngày chốt | từng file | ✗ / ⚠ |
| **C. Mẫu 31 ↔ Dư nợ chi tiết** | cùng món, dư nợ từng món · TK 105 · tổ / khách | 2 file chính | ✗ |
| **D. Dư nợ ↔ LEN_31** | dư nợ, trong hạn, quá hạn, khoanh, cho vay (gồm ĐK) — từng xã (XAPUONG), xã × Hội (DONVIUT), xã × Hội × CT (CHTRINH), từng tổ (TO_TRUONG; tổ trùng tên tổ trưởng ghép nhóm) | chuẩn TW | ✗ |
| **E. Doanh số ↔ BCDHTD** | 01.1 từng xã: 14 chỉ tiêu + số lượt KH vay · 01.2 từng chương trình (tách HSSV / STEM theo sản phẩm, GQVL NĐ 61 / NĐ 338 theo Quyết định) | chuẩn TW | ✗ |
| **F. Cây địa bàn** | số tổ xã / xã × Hội = LEN · tổ thừa / thiếu so LEN TO_TRUONG + DSTO · tên tổ trưởng khác · 1 tổ nhiều điểm GD / ấp / Hội · điểm GD Dư nợ chi tiết ≠ DSTO · tổ phải suy điểm · tổ dư nợ 0 bị ẩn | Mẫu 31, Dư nợ chi tiết, DSTO, LEN | ✗ thừa / thiếu / nhiều điểm · ⚠ còn lại |
| **G. KHĐ** | app tính từ Mẫu 31 ↔ file KHĐ: món thừa / thiếu; **số tháng liên tiếp khớp** (đủ N tháng → đề xuất anh chuyển KHĐ thành phụ hẳn) | Mẫu 31, KHĐ | ⚠ |
| **H. So tháng trước** | món mới, tất toán, chuyển QH / khoanh, tổ mới / mất, đổi tổ trưởng / điểm GD, khách chuyển tổ | 2 kỳ Mẫu 31 | thông tin |
| **I. KTGS** (khi có BC) | BC0437 ↔ BC0438 ① ② · BC0437 ↔ Mẫu 31 từng tổ · BC0438 ↔ Mẫu 31 + KHĐ theo CT | BC + Mẫu 31 | ⚠ (không chặn chốt) |
| **J. Bất thường nghiệp vụ** | KU hủy / chưa giải ngân quá 1 tháng · món không giao dịch lâu · khách nhiều sổ 105 · SĐT không đạt · CCCD hết hạn | Mẫu 31, Dư nợ chi tiết | ⚠ |
| **Lưu ý đã biết** | thu nợ LEN thấp hơn BCDHTD / Mẫu 31 (30/09: 71.999.298 đ, 12 tổ) · thu lãi lệch nhỏ · số hộ / tiền gửi LEN (gồm khách chỉ gửi TK) ↔ Mẫu 31 | | ⚠ (không chặn) |

**Chốt tháng 🔒:** đủ 9 file nhóm A + **không còn mục ✗** — hoặc anh ghi lý do cho từng mục ✗ (ghi nhận lưu cùng kết quả, in được). Mục ⚠ không chặn.

**Phép thử:** t142 — bộ file giả khớp → mọi mục ✓; làm lệch 1 xã / 1 tổ / 1 chương trình / 1 món → đúng mục ✗ + danh sách; chốt bị chặn, ghi lý do thì chốt được; kết quả cũ vẫn xem; KTGS không chặn.

## 4. Cần anh chốt trước khi code
1. **Mức chặn chốt:** mục ✗ chặn chốt, **anh ghi lý do thì cho chốt** (đề xuất) — hay chặn tuyệt đối?
2. **KHĐ:** bao nhiêu tháng khớp liên tiếp thì coi KHĐ là phụ hẳn (đề xuất **3 tháng**)?
3. Làm **3.145 trước rồi 3.146** (đề xuất) hay gộp 1 bản?
