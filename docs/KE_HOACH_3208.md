# Kế hoạch 3.208 — Khai báo theo chương trình vay + khai báo chung / riêng tab Hồ sơ vay (ĐÃ LÀM — 3.208)

> Anh 14/10 (tối): "tab bộ hồ sơ nên bố cục lại — đầu tiên khai báo hết các mẫu, gồm khai báo riêng và khai báo chung cho tab hồ sơ vay" · "DS lý do gia hạn là riêng của mẫu gia hạn; mục đích vay và đối tượng thụ hưởng khai báo trong chương trình vay (HSSV, Cấp nước sạch, Hỗ trợ tạo việc làm — gọi tắt GQVL); lập bộ hồ sơ có thêm khai báo riêng đặc thù cho từng chương trình; chọn mẫu 01/TD chỉ cần chọn chương trình vay là thông tin tự điền".

## Hiện trạng
`hsoKBHop()` (⚙ Khai báo 1 lần): PGD, trưởng ấp, tổ phó, logo, `kb.dtth` / `kb.md` (ô chữ, dòng "MÃ: …"; `hsoMucDich(ct)`, `hsoDTTH(ct)`). Bộ HS (`hsoTuyBo`): chương trình HSSV / NSVSMT, phương án (`pa`), mẫu trong bộ, ngày họp. 09A: `hsoLyDoDs()` (lý do). Mã CT: `CT_VT_TEN` (js/22).

## Đề xuất
1. **⚙ Khai báo chung** = PGD · trưởng ấp · tổ phó · logo · **📋 Chương trình vay** (thẻ từng CT bật / tắt: tên in, mã, danh mục mục đích, đối tượng thụ hưởng, khai báo đặc thù — HSSV: SV, trường; NSVSMT: nước / VS, mới / sửa; GQVL: số lao động, phương án…). Chuyển dữ liệu cũ `kb.md` / `kb.dtth` vào thẻ.
2. **⚙ Khai báo riêng mẫu** = ô chấm ✍ / 🖨 của mẫu · 09A: lý do gia hạn, in kèm 06/TD, 01/TĐCK · logo theo mẫu.
3. **01/TD, Bộ HS:** chọn CT → tự điền mục đích, đối tượng thụ hưởng, khai báo đặc thù. Bộ HS 3 bước: ① Hộ vay → ② CT + đặc thù → ③ Mẫu trong bộ.

## Anh bổ sung 14/10 (tối) — thiết kế cửa sổ ⚙ Khai báo chung
Cửa sổ riêng có **tab con**: 🏦 PGD (+ logo) · 🏘 **Trưởng ấp** (chọn xã / điểm GD → ấp → gõ tên) · 👥 **Tổ phó** (chọn xã / điểm → tổ → tổ phó thực tế) · 📋 **Chương trình vay**.
**Thẻ 1 CT** (vd NSVSMT): tên gọi tắt (HSSV, GQVL — gọi nhanh) · tên ghi trên 01/TD, 03/TD · **đối tượng thụ hưởng** (gõ danh sách) · **mục đích vay** (mục + loại xây mới / sửa chữa) · **mức vay 1 công trình** (1 hay 2 công trình → số tiền tương ứng, sửa được) · **thời hạn vay** (số tháng, 🖨 ghi sẵn / ✍ chấm) · **phân kỳ** (🖨 ghi sẵn / ✍ chấm) · ô thêm tự đặt (ghi sẵn / chấm) cho đặc thù.
Lập 01/TD / Bộ HS: chọn CT → chọn mục đích, số công trình → tự điền. Khai báo riêng mẫu (ô chấm, 09A lý do + in kèm) ở nút ⚙ Khai báo riêng mẫu.

## Anh chốt 14/10
- **HSSV: số tháng và số tiền ở bảng 01/TD cho tự gõ, không tự tính** (bỏ cách chia 4 triệu / tháng trong `hsoPA`).
- **01/TD — "Thời hạn xin vay" (số tháng) và "Hạn trả nợ cuối cùng" (ngày): gõ thì in, không gõ thì chấm.** Số tháng đã gõ ở 01/TD **tự đồng bộ sang cột Thời hạn của 03/TD** (cùng hộ).
- **NSVSMT: mặc định ghi sẵn hết** (thời hạn 60 tháng, kỳ hạn 12 tháng / lần, mục đích, ĐTTH…) — đổi được trong thẻ CT (⚙ Khai báo chung › Chương trình vay).
- **Bố cục màn nhập liệu như tab Giao dịch xã**: khung trái nhập rộng ra (ô nhập + tùy chọn), khung phải xem trước.
- **Khai báo riêng ghi rõ của mẫu nào** (vd "⚙ Khai báo riêng — Mẫu 09A/TD", "⚙ Khai báo riêng — Mẫu 01/TD").

## Anh chốt 14/10 (cuối) — "đúng, em làm đi, code xong gộp lên luôn và bàn giao"
- Mặc định em chọn (anh không phản đối): 3 thẻ HSSV · NSVSMT · GQVL (GQVL dạng "1 mục đích + số tiền", chờ anh gửi mẫu ghi sẵn để chỉnh); **không thêm ô lãi suất** (lãi suất nằm ở phần Phê duyệt NH — luôn chấm); **số đề nghị vay = vốn vay NHCSXH**, tổng nhu cầu = vay + tự có; HSSV: thời hạn xin vay (gõ) sang 03/TD, ô số lượng bảng 01/TD chỉ in ở 01/TD; hạn trả cuối gõ tay (không tự cộng).
- Anh: **"Bộ hồ sơ còn rối — sẽ sửa lại"** → để đợt sau (chờ ý anh), 3.208 chỉ thay phần chương trình / phương án / thời hạn.

## Trạng thái
- ☑ 1. Cửa sổ ⚙ Khai báo chung tab con (PGD · Trưởng ấp · Tổ phó chọn xã / điểm · Chương trình vay) — `hsoKBHop(tab)`, `HSO_KBT`, `hsoKBTab`
- ☑ 2. Thẻ chương trình vay + chuyển khai báo cũ — `hsoCTVDs`, `hsoCTV`, `hsoCTDat`, `hsoCTVHTML`
- ☑ 3. Bộ HS / 01/TD / 03/TD đọc thẻ: `hsoPA` (HSSV gõ số tháng), thời hạn / kỳ hạn / hạn cuối gõ hoặc chấm, ĐTTH mặc định xã / phường
- ☑ 4. Bố cục 60/40 như GDX, "⚙ Khai báo riêng — Mẫu …"
- ☑ 5. t172 20/20, t164 sửa, bump 3.208, tài liệu
- ☐ Sau: bố cục lại Bộ HS (anh sẽ nói), GQVL theo mẫu thật, 03/TD nhiều hộ (KE_HOACH_3207 mục 3)
