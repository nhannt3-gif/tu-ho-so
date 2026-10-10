# KẾ HOẠCH — Bộ file chuẩn mới (3.145) + Kiểm tra kỳ thống nhất (3.146)

> Lập 10/10/2026 theo Q14–Q17 (`KIEN_TRUC_3_LOP.md`) và kết quả rà file thật 30/09 (`DU_LIEU_THANG.md`). **Chưa code** — chờ anh duyệt + "code".
> Không ghi dữ liệu thật. Số liệu dẫn chứng chỉ là số đếm.

## 1. Bộ file hằng tháng (anh chốt "ok" 10/10/2026)

| Nhóm | File | Vai trò | Kiểm tra kỳ |
|---|---|---|---|
| **Bắt buộc** (nguồn dữ liệu) | Mẫu 31 · Dư nợ chi tiết · DSTO | Mẫu 31 = số chính (món, khách, tổ, tổ trưởng, Hội, ấp, doanh số, nguồn vốn, Quyết định); Dư nợ chi tiết = điểm GD, TK 105, mục đích; DSTO = SĐT tổ trưởng, tổ phó, đủ tổ | cần cho ✓ Đạt |
| **Đối chiếu chuẩn TW** | LEN_31 XAPUONG · DONVIUT · CHTRINH · TO_TRUONG · BCDHTD 01.1 · 01.2 | LEN_31: dư nợ + cây địa bàn (xã · Hội · chương trình · tổ). 01.1: doanh số theo xã. 01.2: theo chương trình. Báo cáo tổng quan PGD / xã / Hội / CT lấy thẳng (Q17) | cần cho ✓ Đạt |
| **Phụ** (có thì đối chiếu thêm) | KHĐ mẫu 14 · Nợ quá hạn · Nợ khoanh · Nợ đến hạn phân kỳ · Tổng dư nợ theo CT | KHĐ: app tự tính từ Mẫu 31, đối chiếu file (nhiều tháng khớp → giữ phụ). Khoanh: ngày hết hạn khoanh. Phân kỳ: số tiền kỳ con | không |
| **Riêng KTGS** | BC0437 · BC0438 | Chấm điểm, xếp loại tổ; không theo khóa tháng | không |
| **Bỏ** (dữ liệu cũ vẫn đọc / xóa được, nạp mới báo "đã bỏ") | B32 · Thông tin tổ trưởng · Mẫu 10 · Mẫu 7 · Sao kê KH · KHĐ 08/KTNB | B32 → nguồn vốn + doanh số từ Mẫu 31; Thông tin tổ trưởng → DSTO (file 30/09 thiếu 18 tổ) | — |

## 2. Bản 3.145 — Bộ file chuẩn mới (nhỏ–vừa)
1. `SL_LOAI` / `SL_NHOM` / `SL_BAT_BUOC` theo bảng mục 1 (9 file cần cho ✓ Đạt). Ma trận Nạp hiện 5 nhóm: Bắt buộc · Đối chiếu chuẩn TW · Phụ · KTGS (khối riêng, 3.144) · Đã bỏ (chỉ khi còn dữ liệu).
2. **Cây tổ** (`toNap`): giữ thứ tự hiện có (Mẫu 31 → Dư nợ chi tiết điểm GD) nhưng **DSTO đứng trước Thông tin tổ trưởng** cho SĐT / tổ phó; Thông tin tổ trưởng chỉ còn đọc dữ liệu cũ.
3. **Tổ dư nợ 0** không có trong DSTO và không có dòng LEN_31 TO_TRUONG → cờ `anDN0`, **ẩn khỏi cây chọn tổ và bảng các tổ**; vẫn tra cứu được, vẫn hiện ở "đã tất nợ / ra khỏi tổ"; Kiểm tra kỳ liệt kê.
4. **KHĐ tự tính từ Mẫu 31** theo quy tắc hệ thống đã kiểm (DU_LIEU_THANG.md mục 3.90 — món còn dư nợ, ngày giao dịch gần nhất cách ngày số liệu ≥ 3 tháng…), dùng ở Tra cứu / Sao kê / KTGS khi tháng không có file KHĐ; có file thì dùng file và đối chiếu (mục 3 nhóm G).
5. **Tổng hợp:** báo cáo "theo nguồn vốn" tính từ Mẫu 31 (cột Nguồn vốn) thay B32; báo cáo 01.1 thêm cột "Số lượt KH vay vốn" theo quy tắc đã kiểm (số món giải ngân lần đầu trong năm, trừ đảo khoản); cho vay in 2 cột **gồm / không gồm đảo khoản**.
6. **📋 Danh sách file cần xuất** (anh yêu cầu ghi nhớ): ở tab Nạp & KT có nút mở bảng như `docs/FILE_XUAT_HANG_THANG.md` — tên file, **mẫu cần chọn khi xuất** (KHĐ = **mẫu 14**, không dùng 08/KTNB; Mẫu 31; Dư nợ chi tiết; DSTO; 01.1; 01.2; 4 LEN_31), dấu ✓ file tháng đang xem đã có.
7. Phép thử: t141 (nhóm file, 9 file cần cho Đạt, ẩn tổ dư nợ 0, KHĐ tự tính ↔ file giả, nguồn vốn từ Mẫu 31). Bộ giả `taogia.py` thêm DSTO + LEN_31 / 01.1 dựng từ Mẫu 31 giả (đã có một phần ở t105).

## 3. Bản 3.146 — Kiểm tra kỳ (anh chốt 10/10/2026: **không chốt, chỉ kiểm + ghi nhận**)
**Anh chốt:** quan trọng nhất là kiểm **đủ file · đúng kỳ · đúng cấu trúc**, và **ghi nhận chênh lệch để biết, không can thiệp**. **Không cần chốt tháng** — bấm Kiểm tra, app đánh giá; **đủ số liệu cho các loại báo cáo thì báo ✓ Đạt (dấu xanh)**.

**Một nút "🔍 Kiểm tra kỳ"** ở tab 📥 Nạp & KT (thay ② Kiểm tra tháng + 🔍 KTGS). Kết quả lưu theo kỳ, dữ liệu đổi → "⟳ kiểm lại". **Bỏ chốt / khóa tháng 🔒 (3.91)** — tháng đang khóa tự mở (dữ liệu giữ nguyên).

**Phần 1 — Đánh giá ĐẠT** (quyết định dấu ✓ xanh của kỳ, trên ma trận + đầu tab):
| Mục | Đạt khi |
|---|---|
| **Đủ file** | có đủ 9 file: Mẫu 31 · Dư nợ chi tiết · DSTO · 4 LEN_31 · BCDHTD 01.1 · 01.2 |
| **Đúng kỳ** | ngày số liệu đọc từ **nội dung** từng file (Q14) **cùng kỳ**; file anh khai ngày ghi rõ; file xuất sau ngày số liệu → ⚠ |
| **Đúng cấu trúc** | đủ cột bắt buộc từng loại, đọc được dòng dữ liệu (không 0 dòng, mã khóa đúng dạng); có cột mới / thiếu cột không bắt buộc → ⚠ ghi rõ tên cột |

**Theo loại báo cáo** (cùng màn hình, để biết báo cáo nào dùng được): Tổ TK&VV · Sao kê · Tra cứu (cần Mẫu 31 + Dư nợ chi tiết + DSTO) · Tổng hợp tổng quan (cần 01.1 · 01.2 · LEN_31) · KTGS (cần thêm BC0437 / BC0438) — mỗi loại ✓ / thiếu file gì.

**Phần 2 — Ghi nhận chênh lệch** (chỉ để biết, **không ảnh hưởng Đạt, không sửa số**; bấm mục → danh sách, xuất Excel):
| Nhóm | Ghi nhận |
|---|---|
| Mẫu 31 ↔ Dư nợ chi tiết | món, dư nợ từng món, TK 105 |
| Dư nợ ↔ LEN_31 | xã · xã × Hội · xã × Hội × CT · từng tổ: dư nợ, TH, QH, khoanh, cho vay |
| Doanh số ↔ BCDHTD | 01.1 từng xã (14 chỉ tiêu + số lượt KH vay) · 01.2 từng chương trình |
| Cây địa bàn | tổ thừa / thiếu so LEN + DSTO · số tổ xã / Hội · 1 tổ nhiều điểm GD · điểm GD ≠ DSTO · tổ suy điểm · tổ dư nợ 0 bị ẩn |
| KHĐ | app tính từ Mẫu 31 ↔ file KHĐ (khi có) · số tháng liên tiếp khớp |
| So tháng trước | món mới, tất toán, chuyển QH / khoanh, tổ mới / mất, đổi tổ trưởng / điểm |
| KTGS (khi có BC) | BC0437 ↔ BC0438 · ↔ Mẫu 31 |
| Bất thường | KU hủy / chưa giải ngân · nhiều sổ 105 · SĐT không đạt · CCCD hết hạn |
| Đã biết | thu nợ LEN thấp hơn · thu lãi lệch nhỏ · số hộ / tiền gửi LEN có khách chỉ gửi TK |

Mỗi mục ghi: khớp / lệch bao nhiêu / danh sách. Anh muốn ghi chú cho mục nào thì thêm ô "Ghi nhận của anh" (tùy chọn, không bắt buộc).

**Phép thử:** t142 — đủ / thiếu file → Đạt / chưa Đạt + thiếu gì; sai kỳ, sai cấu trúc → chưa Đạt; làm lệch số (1 xã / tổ / CT / món) → **vẫn Đạt**, chênh lệch được ghi đúng mục + danh sách; tháng từng khóa tự mở; kết quả cũ vẫn xem.

## 4. Cần anh chốt trước khi code
1. ✅ **Bỏ chốt / khóa tháng 🔒 (3.91) — XÓA HẲN MÃ** (anh chốt 10/10: "bỏ code chốt tháng tránh rác code"): nút Chốt / Mở khóa, `slChot`, `slKhoaO`, `slKhoaBao`, chặn nạp / xóa tháng đã chốt, `SLM.chot` (dữ liệu cũ bỏ qua khi đọc, xóa khỏi meta lần ghi sau), phép thử 3.91 liên quan sửa theo. Làm cùng 3.146.
2. Làm **3.145 trước rồi 3.146** (đề xuất) hay gộp 1 bản?
