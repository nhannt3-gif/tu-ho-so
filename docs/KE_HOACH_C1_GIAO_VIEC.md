# KẾ HOẠCH C1 — Giao việc có cấu trúc, kỳ sau tự chấm từ Mẫu 31 (chờ anh duyệt)

> Nguồn: `DANH_GIA_CHUYEN_GIA_1511.md` mục C1 · bàn giao TK 2 ngày 28/11 (`PHOI_HOP_CHUNG.md` mục 14): TK 1 làm C1 bằng gói mới `js/9x-giao-viec.js`, lên kế hoạch ngắn rồi chờ anh duyệt.
> Soạn 28/11/2026, phiên TK chính làm thay phần TK 1. **Chưa sửa code.** Anh nhắn "code" thì mới làm.

## 1. Mục đích
Sau mỗi cuộc họp / phiên giao dịch, anh ghi việc giao có cấu trúc: **đối tượng · chỉ tiêu · mức cần đạt · hạn**. Kỳ sau, khi đã nạp Mẫu 31, app tự chấm "Đạt / Chưa đạt". Phần "Kết quả thực hiện kết luận kỳ trước" trong nháp TB kết luận sẽ có sẵn số, anh không phải theo dõi tay.

## 2. Phạm vi bản đầu (đề xuất)

| Loại chỉ tiêu | Đối tượng | Cách app tự chấm từ Mẫu 31 (kỳ mới nhất ≥ hạn) |
|---|---|---|
| ① Thu dứt món quá hạn | món (mã KU) | món không còn dư nợ quá hạn → Đạt |
| ② Giảm nợ quá hạn | tổ / điểm / xã | dư nợ QH ≤ mức → Đạt |
| ③ Thu lãi tồn | tổ | tổng lãi tồn (`laiTon`) ≤ mức, hoặc không còn món lãi tồn ≥ 3 tháng lãi (QT-C-23) → Đạt |
| ④ Xử lý khoanh / KHĐ | món / tổ | dư nợ khoanh hoặc KHĐ ≤ mức |
| ⑤ Nâng tiết kiệm TK 105 | tổ | số dư TK 105 ≥ mức |
| ⑥ Việc tự do (không có số) | bất kỳ | anh tự đánh dấu Xong |

Trạng thái khi chấm: **Đạt · Chưa đạt (kèm số hiện tại / mức) · Chưa đến hạn · Không đủ số** (chưa nạp kỳ ≥ hạn).

## 3. Thiết kế
- **Gói mới `js/9x-giao-viec.js`, không gian tên `GVC`** (QUY_CHUAN mục 13). Cắm rút: bỏ dòng `<script>` là chức năng mất, phần khác không đổi.
- **Chỗ dùng:**
  - nút **📌 Việc giao** trong 📐 Bộ số chuẩn (cạnh 📝 Nội dung họp và 📄 TB kết luận);
  - danh sách lọc theo điểm / xã, có các nút Thêm · Sửa · Xong · Xóa;
  - thêm từ phiếu: chọn tổ hoặc món từ cây địa bàn sẵn có, không gõ mã tay.
- **Lưu:** 1 khóa cài đặt `giaoViec` (mảng nhỏ, vài trăm dòng/năm). Khóa này đồng bộ Drive theo khối cài đặt đang có, nên không tạo khối mới và không sửa `36-dong-bo-khoi.js`. Khóa được ghi vào sổ cấu hình (`tools/so_cau_hinh.py`).
- **Đọc số:** chỉ đọc qua cửa kho và các hàm có sẵn (`laiTon`, `toMaCua`, `HSN.thangLai`, số TK 105 của tổ `slT105To`). Không đọc thẳng bảng gốc.
- **Nối vào nháp TB kết luận (`js/89-tb-kl.js`):**
  - thêm 1 đoạn "Kết quả thực hiện kết luận kỳ trước" lấy từ `GVC.cham(điểm, kỳ)`;
  - chỉ thêm khi có gói `GVC`, nên không có gói thì nháp vẫn như cũ;
  - `89` không thuộc danh sách file TK 2 giữ, nhưng em vẫn ghi 1 dòng hộp thư báo TK 2 trước khi sửa.
- **Phép thử:**
  - `tests/t424.js`, dữ liệu giả: 6 loại × Đạt / Chưa đạt / Chưa đến hạn / Không đủ số;
  - kiểm thêm, bớt, đồng bộ khóa, và nháp TB KL có hoặc không có gói.
  - Chạy `kiem.py` + `hoiquy.sh … doi 2`.

## 4. Không làm ở bản đầu
- Tự đọc việc giao từ văn bản TB kết luận đã phát hành (Word / PDF): khó, dễ sai, để sau.
- Chấm điểm cán bộ / Hội đoàn thể: chưa có luật, cần anh chốt riêng.
- Nhắc việc sắp đến hạn: có thể nối vào 📅 Lịch việc ở bản sau.

## 5. Cần anh chốt
1. **6 loại chỉ tiêu ở mục 2** có đủ cho bản đầu không, cần thêm hay bớt loại nào?
2. **Chỗ nút:** đặt trong 📐 Bộ số chuẩn có được không, hay anh muốn để ở 📑 Sao kê?
3. **Kỳ để chấm:** lấy Mẫu 31 mới nhất có ngày ≥ hạn (đề xuất), hay cố định cuối tháng chứa hạn?
4. Cho phép em sửa `js/89-tb-kl.js` để chèn đoạn "Kết quả thực hiện kết luận kỳ trước" không?

Ước tính: 1 bản (≈ 300–400 dòng JS + 1 phép thử).
