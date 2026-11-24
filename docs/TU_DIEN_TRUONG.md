# Từ điển trường — ma trận món chuẩn (3.564)

> Anh chốt 22/11/2026: *"luôn tạo ra 1 ma trận dữ liệu đa chiều lấy Mẫu 31 làm chuẩn, dữ liệu nào Mẫu 31 không có thì thu thập từ các mẫu khác để khi cần có thể có báo cáo được đầy đủ nhất"*.
> Mã nguồn: `js/98-mon-chuan.js` (`MCH.TRUONG`). Tên cột file hệ thống: `docs/COT_FILE_MAU.md`. Nguồn tính: `docs/PHOI_HOP_CHUNG.md` mục 3.

## Nguyên tắc
- **Gốc = Mẫu 31**, mỗi món 1 dòng (kho chuẩn `js/73`, không sửa số). Số QH · khoanh · KHĐ tính từ Mẫu 31 (3.563).
- **Trường bổ sung** chỉ thêm, không ghi đè số Mẫu 31. Mỗi trường ghi **nguồn** + **khóa ghép**. Nguồn chưa nạp → ô trống, không đoán.
- Thêm nguồn mới (vd KQGD, CLT PDF ở 3.565): thêm 1 dòng vào `MCH.TRUONG` + 1 dòng bảng dưới đây.

## Dùng ở đâu
- 🧩 **Báo cáo của tôi** (tab Tổng hợp): chọn được các trường bổ sung theo kiểu gộp (từng món / từng khách / từng tổ).
- 📑 **Sao kê › Khách hàng › Bảng món chuẩn**: mọi món trong phạm vi, đủ chiều + chỉ tiêu + trường bổ sung; bản Excel dòng 2 ghi nguồn từng cột.

## Chiều + chỉ tiêu gốc (Mẫu 31)
Xã · Điểm GD · Ấp · Hội · Tổ · Mã KH · Họ tên · Số KU · Chương trình · Nguồn vốn · Ngày vay · Hạn trả · Dư nợ · Trong hạn · Quá hạn · Khoanh · Lãi tồn · GD gần nhất.

## Trường bổ sung
| Mã | Tên | Nguồn | Khóa | Gộp |
|---|---|---|---|---|
| `mc_cqh` | Chuyển QH trong tháng | Mẫu 31 | Số KU | món |
| `mc_ncqh` | Ngày chuyển QH | Mẫu 31 (Ngày CNQH gần nhất) | Số KU | món |
| `mc_dhgd` | Ngày ĐH theo GDXA | Mẫu 31 | Số KU | món |
| `mc_khd` | KHĐ ≥ 3 tháng | tính từ Mẫu 31 (luật hệ thống) | Số KU | món (Có) · khách (số món) |
| `mc_nhh` | Hết hạn khoanh | Mẫu 31 | Số KU | món |
| `mc_nhl` | Hiệu lực khoanh | file Nợ khoanh | Số KU | món |
| `mc_nn` | Nguyên nhân khoanh | file Nợ khoanh | Số KU | món |
| `mc_t105` | Tiền gửi 105 (khách) | Mẫu 31 (cộng các sổ, mỗi sổ 1 lần — QT-C-01) | Mã KH | món · khách |
| `mc_ngaygd` | Ngày GDXA (điểm) | File Tổ trưởng / Mẫu 31 | Mã tổ | món · khách · tổ |
| `mc_cltT` | CLT02 tháng (tổ) | CLT02 tháng | Mã tổ (ghép tên tổ trưởng + Hội) | món · khách · tổ |
| `mc_cltDK` | CLT02 định kỳ (tổ) | CLT02 định kỳ | Mã tổ | món · khách · tổ |
