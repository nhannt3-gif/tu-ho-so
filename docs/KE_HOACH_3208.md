# Kế hoạch 3.208 — Khai báo theo chương trình vay + khai báo chung / riêng tab Hồ sơ vay (CHỜ ANH DUYỆT)

> Anh 14/10 (tối): "tab bộ hồ sơ nên bố cục lại — đầu tiên khai báo hết các mẫu, gồm khai báo riêng và khai báo chung cho tab hồ sơ vay" · "DS lý do gia hạn là riêng của mẫu gia hạn; mục đích vay và đối tượng thụ hưởng khai báo trong chương trình vay (HSSV, Cấp nước sạch, Hỗ trợ tạo việc làm — gọi tắt GQVL); lập bộ hồ sơ có thêm khai báo riêng đặc thù cho từng chương trình; chọn mẫu 01/TD chỉ cần chọn chương trình vay là thông tin tự điền".

## Hiện trạng
`hsoKBHop()` (⚙ Khai báo 1 lần): PGD, trưởng ấp, tổ phó, logo, `kb.dtth` / `kb.md` (ô chữ, dòng "MÃ: …"; `hsoMucDich(ct)`, `hsoDTTH(ct)`). Bộ HS (`hsoTuyBo`): chương trình HSSV / NSVSMT, phương án (`pa`), mẫu trong bộ, ngày họp. 09A: `hsoLyDoDs()` (lý do). Mã CT: `CT_VT_TEN` (js/22).

## Đề xuất
1. **⚙ Khai báo chung** = PGD · trưởng ấp · tổ phó · logo · **📋 Chương trình vay** (thẻ từng CT bật / tắt: tên in, mã, danh mục mục đích, đối tượng thụ hưởng, khai báo đặc thù — HSSV: SV, trường; NSVSMT: nước / VS, mới / sửa; GQVL: số lao động, phương án…). Chuyển dữ liệu cũ `kb.md` / `kb.dtth` vào thẻ.
2. **⚙ Khai báo riêng mẫu** = ô chấm ✍ / 🖨 của mẫu · 09A: lý do gia hạn, in kèm 06/TD, 01/TĐCK · logo theo mẫu.
3. **01/TD, Bộ HS:** chọn CT → tự điền mục đích, đối tượng thụ hưởng, khai báo đặc thù. Bộ HS 3 bước: ① Hộ vay → ② CT + đặc thù → ③ Mẫu trong bộ.

## Câu hỏi chờ anh
1. Bắt đầu với CT nào (đề xuất HSSV, NSVSMT, GQVL)?
2. Mỗi CT có khai mức vay tối đa, thời hạn, kỳ hạn trả để tự điền 01/TD?
3. Khai báo đặc thù GQVL gồm những ô nào (hoặc gửi mẫu 01/TD GQVL)?

## Trạng thái
- ☐ chờ anh trả lời + nhắn "code"
