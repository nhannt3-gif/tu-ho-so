# Kế hoạch — SỔ HỘ VAY (quy trình làm hồ sơ vay mới) — ĐANG BÀN, CHỜ ANH DUYỆT

> Anh 14/10: "1. tạo hộ vay: nhập mới hoặc lấy từ Mẫu 31 → ra người vay; nhập thừa kế ngay hoặc sau — có lúc chỉ cần người đứng tên (HSSV chỉ cần tên SV cho 01, 03; chỉ giấy UQ mới cần đủ thừa kế) → bổ sung khi cần; khai báo tổ khi nhập hộ → hộ cũ từ Mẫu 31 có mã KH sẵn, hộ mới chưa có; lưu danh sách hộ vay thành 1 bảng lâu dài; khi cần in 01/TD: chọn hộ, chọn chương trình, in; cần thì in kèm 03, 06…"

## Hiện trạng (3.207–3.208)
- 🏠 **Hộ mới** (`D.cauHinh.hoMoi`) — chỉ hộ mới; **Bộ HS** (`D.cauHinh.hsoBo`) — mỗi bộ chép lại người vay + thành viên + phương án → 2 nơi lưu cùng 1 người, anh thấy rối.

## Đề xuất (em)
1. **Gộp thành 1 tab "👪 Hộ vay" = sổ hộ vay lâu dài** (thay 🏠 Hộ mới + Bộ HS):
   - **＋ Hộ mới** (form nhanh 3.207) · **＋ Lấy từ Mẫu 31** (gõ tên / CCCD hoặc chọn tổ viên của tổ đang chọn).
   - **Tổ khai ngay khi tạo hộ** (cây địa bàn → tổ) → ấp, xã, Hội, tổ trưởng tự có.
   - **Chỉ bắt buộc người đứng tên**; thành viên / thừa kế, HSSV, SĐT **bổ sung bất cứ lúc nào**.
   - Hộ cũ: **mã KH sẵn**, nhân thân **luôn đọc Mẫu 31 mới nhất** (không chép → không lệch số liệu); app chỉ lưu phần Mẫu 31 không có (thành viên, SĐT, HSSV, ghi chú).
   - Hộ mới: chưa mã KH; **khi lên Mẫu 31 (khớp CCCD) → app tự gắn mã KH**, thành hộ cũ.
   - Trùng CCCD → báo, mở hộ đã có (không tạo 2 lần).
2. **In 01/TD (và các mẫu khác):** chọn **hộ** → chọn **chương trình** (chip) → điền phương án (chọn nhanh) → In. Ô **In kèm: ☐ 03/TD ☐ 10C ☐ 01/UQ ☐ 01/TGTV ☐ 06/TD** (nhớ lựa chọn).
3. **Thiếu thì nhắc tại chỗ:** in 01/UQ mà hộ chưa đủ thành viên ≥ 18 tuổi → ⚠ + nút "✎ Bổ sung thành viên" ngay đó; HSSV chưa có tên SV → ô gõ ngay.
4. **Lưu "lần đề nghị vay"** (CT, số tiền, phương án, thời hạn, ngày in) vào hộ → in lại / in 03/TD sau không gõ lại; xem lịch sử vay của hộ.
5. **Bộ HS cũ** đã lập → tự chuyển vào sổ (mỗi bộ = 1 hộ + 1 lần đề nghị). Không mất dữ liệu.
6. **GQVL (KE_HOACH_3209)** cắm vào luồng này: chọn hộ → chọn GQVL → 01/GQVL + 07b + 03/TD.

## Rủi ro / lưu ý
- Sổ lưu cùng cài đặt (đồng bộ Drive) — vài trăm hộ vẫn ổn; nhiều hơn → chuyển IndexedDB theo `KE_HOACH_B_C.md` mục 4.
- Đây là **đổi chức năng cũ** (bỏ tab Bộ HS, gộp Hộ mới) → cần anh duyệt.

## Câu hỏi chờ anh
1. Gộp 🏠 Hộ mới + Bộ HS thành **1 tab "👪 Hộ vay"**, Bộ HS cũ tự chuyển vào — duyệt?
2. Hộ cũ: nhân thân **luôn lấy Mẫu 31 mới nhất**, app chỉ lưu thêm thành viên / SĐT / HSSV — đồng ý?
3. Hộ mới lên Mẫu 31 (khớp CCCD) → **tự gắn mã KH** — đồng ý?
4. Lưu **lịch sử lần đề nghị vay** trong hộ — cần không?
5. "In kèm 06" là **06/TD phiếu kiểm tra sử dụng vốn** (sau giải ngân) hay ý anh mẫu khác (10C biên bản họp)?
6. Thứ tự: làm **sổ hộ vay trước** (3.209) rồi GQVL (3.210) — em đề nghị vậy vì GQVL cắm vào luồng mới — hay GQVL trước?
