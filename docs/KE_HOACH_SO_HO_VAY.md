# Kế hoạch 3.209 — SỔ HỘ VAY + in mẫu theo hộ (thay 🏠 Hộ mới + Bộ HS) — TỔNG HỢP Ý ANH 14/10 · ĐÃ LÀM (3.209 phần 1–2, 3.210 phần 3)

> Tài khoản nào làm tiếp: đọc file này trước. GQVL làm sau ở 3.211 (`KE_HOACH_3209.md`, đã chốt đủ).
> Ý anh 14/10 (tóm tắt): Bộ HS rối, sửa theo cách gọn · tạo hộ vay: nhập mới hoặc lấy từ Mẫu 31 · khai tổ khi tạo hộ · chỉ cần người đứng tên, thừa kế / thành viên nhập ngay hoặc bổ sung khi cần (HSSV chỉ cần tên SV cho 01, 03; chỉ giấy UQ mới cần đủ thừa kế) · **1 hộ có thể vay nhiều HSSV** · hộ cũ có mã KH, hộ mới chưa · danh sách hộ lưu thành bảng lâu dài · **không lưu lịch sử đề nghị vay — cần in lại thì chọn và in** · in 01/TD: chọn hộ, chọn chương trình, in; cần thì in kèm 03, 06… · **03/TD: chọn nhiều hộ 1 lần, hoặc mở 03 trước rồi thêm hộ; cùng 1 chương trình in chung 1 mẫu 03**.

## Kiểm tra Mẫu 31 (cột thật trong file hệ thống)
Có **"Số điện thoại"** và **"Tên vợ/chồng"** (app đã đọc: `sdt`, `voChong`). **Không có** ngày sinh / CCCD của vợ/chồng → giấy UQ vẫn cần bổ sung ngày sinh, CCCD thừa kế. Mẫu 31 còn có "Tên ĐTTH" của món đang vay (tham khảo).

## A. Tab "👪 Hộ vay" — sổ hộ vay lâu dài
1. **＋ Hộ mới** (form nhanh 3.207: ngày gõ liền số, suy giới tính / năm sinh / nơi cấp / hạn CCCD) · **＋ Lấy từ Mẫu 31** (gõ tên / CCCD, hoặc tích tổ viên của tổ đang chọn — nhiều người 1 lần).
2. **Tổ khai ngay khi tạo** (cây địa bàn → tổ; hộ mới chưa vào tổ thì chọn tổ sẽ vào) → ấp, xã, Hội, tổ trưởng tự có.
3. **Bắt buộc chỉ người đứng tên.** Bổ sung bất cứ lúc nào: thành viên / thừa kế (họ tên, ngày sinh, CCCD, quan hệ) · **danh sách HSSV (nhiều SV / hộ)** · SĐT.
4. **Hộ cũ:** mã KH sẵn; nhân thân, **SĐT, tên vợ/chồng (gợi ý người thừa kế)** đọc **Mẫu 31 mới nhất** (không chép → không lệch); app chỉ lưu phần Mẫu 31 không có.
5. **Hộ mới:** chưa mã KH; **khớp CCCD trên Mẫu 31 → tự gắn mã KH**, thành hộ cũ. Trùng CCCD khi tạo → báo, mở hộ đã có.
6. Lưu `D.cauHinh.hoMoi` (giữ khóa 3.207 — dữ liệu cũ đọc được ngay) (đồng bộ Drive cùng cài đặt; không vào repo). Danh sách: tìm tên / CCCD / mã KH, lọc theo cây địa bàn; khung phải = bảng danh sách hộ (in được).

## B. In mẫu theo hộ (01/TD · 01/UQ · 01/TGTV · 10C · 06/TD; 3.211: 01/GQVL · 07b)
1. Tab mẫu: **chọn hộ** (ô tìm + chip hộ của tổ đang chọn) → **chọn chương trình** (chip theo thẻ CT) → phương án (chọn nhanh như GDX, mặc định theo thẻ) → In / Word.
2. **Không lưu lịch sử đề nghị vay** — phương án chỉ giữ trong lúc làm (đổi hộ = làm mới).
3. HSSV: hộ có nhiều SV → **chip chọn SV** (mỗi SV 1 đơn).
4. **In kèm:** ☐ 03/TD ☐ 10C ☐ 01/UQ ☐ 01/TGTV ☐ 06/TD (nhớ lựa chọn) — 1 lần in / 1 file Word.
5. **Thiếu thì nhắc tại chỗ:** 01/UQ thiếu thành viên ≥ 18 tuổi / thiếu ngày sinh, CCCD → ⚠ + "✎ Bổ sung" mở thẳng hộ; HSSV chưa có SV → ô gõ ngay.

## C. 03/TD nhiều hộ — cùng 1 chương trình 1 tờ
- Cách 1: ở tab 👪 Hộ vay **tích nhiều hộ → 📋 Lập 03/TD**. Cách 2: mở tab 03/TD → chọn chương trình → **＋ Thêm hộ** (tìm / chip tổ).
- Danh sách 03 sửa ngay từng dòng: ĐTTH (theo thẻ CT, mặc định xã / phường), số tiền, mục đích, thời hạn (chọn nhanh). Đi từ 01/TD "in kèm 03" → mang theo số liệu đã gõ. Dòng Cộng tự tính. Tờ có 1 chương trình chung; hộ chưa làm phiếu cùng chương trình → dòng lấy mặc định thẻ CT để gõ.

## D. Dữ liệu cũ (không mất)
- 🏠 Hộ mới (`hoMoi`) → chuyển hết vào sổ. Bộ HS (`hsoBo`) → người vay, thành viên, HSSV chuyển vào sổ; **bản gốc `hsoBo` giữ nguyên (ẩn), không xóa**.
- Thẻ chương trình vay, ô chấm, khai báo chung / riêng (3.206–3.208) giữ nguyên.

## E. Làm theo thứ tự (mỗi phần xong commit + ☑)
- ☑ 1. Sổ hộ vay: dữ liệu `hoVay`, chuyển hoMoi / hsoBo, tab 👪 Hộ vay (tạo mới / lấy Mẫu 31 / tổ / thành viên / HSSV nhiều SV / gắn mã KH)
- ☑ 2. In theo hộ: chọn hộ + chương trình + phương án chọn nhanh cho 01/TD, 01/UQ, 01/TGTV, 10C; in kèm; nhắc thiếu
- ☑ 3. 03/TD nhiều hộ cùng chương trình (2 cách) — 3.210
- ☑ 4 (phần 1–2). t173 15/15, t171 theo luồng mới, bump 3.209, tài liệu. ☐ phần 3 + hồi quy đầy đủ
- ☐ 4. Phép thử mới (dữ liệu giả), sửa t164 / t171 / t172 theo luồng mới, bump 3.209, tài liệu, hồi quy 1 lần, PR
