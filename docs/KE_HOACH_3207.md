# Kế hoạch 3.207 — Danh sách hộ vay mới (khai báo 1 lần, gọi ra làm hồ sơ)

> Anh yêu cầu 14/10 (tối): "xong mẫu 09, chuyển qua Mẫu 01/TD, 03/TD và giấy UQ — đầu tiên cho khai báo nếu gặp hộ vay mới: form nhập họ tên, ngày sinh (nhập nhanh), số CCCD, ngày cấp → suy giới tính, ngày hết hạn, kiểm năm sinh khớp CCCD; địa chỉ chọn xã → ấp (hoặc chọn điểm GD cho gọn); thêm thành viên khác; chọn ai đứng tên vay, ai là HSSV; bấm Lưu hộ → vào 1 danh sách, gọi ra làm hồ sơ". Anh nhắn "gộp 3.206 rồi làm tiếp" → em làm theo đề xuất (anh chưa trả lời 4 câu chi tiết — mặc định ghi ở mục 4).
> Trạng thái từng phần: mục 5 (☐ / ☑). Tài khoản nào làm tiếp đọc file này trước.

## 1. Đã có trước (không bỏ)
`js/25-ho-so.js` — Bộ HS (`hsoBo*`): mỗi bộ có `nv` (người vay: ten, ns ISO, cccd, ncap, noiCap, gt, sdt, danToc, ap, tenXa), `ho[]` (thành viên: ten, ns, cccd, qh), `pa.sv` (tên HSSV), `moi` (hộ mới). `hsoCCCDDoc` (giới tính + năm sinh theo số CCCD), `hsoNoiCapGY`, `toCCCDHan` (js/22, hạn CCCD), `gdxDocNgay` (js/26, ngày gõ liền số). 01/TD · 01/UQ · 03/TD bên Hồ sơ vay lấy dữ liệu từ bộ đang chọn.

## 2. Làm mới
1. **Tab con đầu "🏠 Hộ mới"** (Hồ sơ vay): danh sách hộ vay mới đã lưu (tìm tên / CCCD), **＋ Hộ mới**, Sửa / Xóa, **📄 Lập hồ sơ** (tạo Bộ HS từ hộ → sang tab Bộ HS). Khung phải = bảng danh sách hộ (in được).
2. **Form hộ** (hộp): người thứ 1 + **＋ Thành viên**; mỗi người: họ tên · ngày sinh (gõ nhanh `150378`) · CCCD · ngày cấp (người đứng tên) · quan hệ. Tự suy: **giới tính, năm sinh theo CCCD (lệch → ⚠), nơi cấp, ngày hết hạn CCCD (hết / sắp hết → ⚠)**. Địa chỉ: **Xã → Ấp** hoặc **Điểm GD → Ấp** (danh sách lấy từ cây tổ đang có). Chọn **Đứng tên vay** (1 người) và **HSSV** (khi vay HSSV). **💾 Lưu hộ**.
3. Lưu `D.cauHinh.hoMoi[]` (đồng bộ Drive cùng cài đặt, không vào repo): `{id, tao, sua, xa, tenXa, thon, tenThon, diem, tv:[{ten, ns, cccd, ncap, noiCap, qh}], dung, hssv}`.
4. **Bộ HS:** thêm ô **"Chọn từ danh sách hộ mới"** (điền nv / ho / pa.sv / địa chỉ) — **giữ** ô nhập tay cũ.
5. Hộ đã có trên Mẫu 31 (trùng CCCD người đứng tên) → ghi "✓ đã lên Mẫu 31".

## 3. Chưa làm (để sau)
03/TD nhiều hộ mới cùng lúc (tích nhiều hộ) · ô chấm tùy biến cho 01/TD · 01/UQ · 03/TD (cách chung 3.206).

## 4. Mặc định em chọn (anh chưa trả lời — sửa được)
Tab "🏠 Hộ mới" đứng đầu · thành viên khác: họ tên, ngày sinh, CCCD, quan hệ · HSSV: chỉ chọn người đi học · Bộ HS: thêm chọn từ danh sách, giữ nhập tay.

## 5. Trạng thái
- ☑ 1. Tab 🏠 Hộ mới + danh sách + khung phải (`hmTuyHTML`, `hmLapHTML`)
- ☑ 2. Form hộ (nhập nhanh, suy CCCD, địa chỉ xã/điểm → ấp, thành viên, đứng tên, HSSV, Lưu)
- ☑ 3. Lập hồ sơ từ hộ / chọn hộ trong Bộ HS (`hmLapHS`, `hmGanBo`)
- ☑ 4. Phép thử t171 14/14 + bump 3.207 + tài liệu + PR (hồi quy đầy đủ 1 lần trước gộp)
