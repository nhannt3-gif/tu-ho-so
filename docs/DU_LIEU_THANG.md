# Từ điển dữ liệu — Bộ file Excel hằng tháng (tab 📈 Số liệu, từ bản 3.85)

Nguồn: báo cáo xuất từ hệ thống (sheet `BCQUERY`, dòng 2 = tên báo cáo, dòng 5 = tên cột, dữ liệu từ dòng 6, cột A trống). App **tự dò** dòng tên cột, không cố định số dòng. Tên cột được so sau khi bỏ dấu, chữ thường.

## Nhận dạng loại (theo cột, không theo tên file)
| Loại | Mã | Tên báo cáo trong file | Cột bắt buộc | Không được có | Khóa dòng | Ngày (kỳ) |
|---|---|---|---|---|---|---|
| Hồ sơ tín dụng chi tiết — **Mẫu 31 (dùng từ 3.86)** | hstd | 31 - Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu (175 cột) | Số khế ước, Mã KH, Tình trạng món vay, Tổng dư nợ | | Số khế ước; dòng không có khế ước = khách chỉ gửi tiết kiệm (khóa Mã KH) | cột Ngày số liệu |
| Hồ sơ tín dụng chi tiết — Mẫu 10 (cũ) | hstd | 10. Sao kê chi tiết (DL Ngày) | Mã món vay, Mã khách hàng, Tổng dư nợ, Số tiền giải ngân | | Mã món vay (16 số) | tên file |
| Sao kê khách hàng | kh | (chờ mẫu) | Mã khách hàng, CCCD | Mã món vay, Số khế ước, Tổng dư nợ | Mã KH | tên file |
| Món vay 3 tháng KHĐ | khd | 14. Sao kê món vay N tháng không hoạt động (DL Tháng) | Số khế ước, Ngày giao dịch gần nhất | Tình trạng món vay | Số khế ước | tên file |
| Nợ quá hạn | nqh | 2. SAO KÊ DANH SÁCH NỢ QUÁ HẠN | Số khế ước, Dư nợ quá hạn, (Ngày chuyển quá hạn hoặc Chuyển QH trong tháng) | Ngày giao dịch gần nhất | Số khế ước | cột Ngày báo cáo |
| Nợ khoanh | nk | 13. Danh sách nợ khoanh (DL Tháng) | Số khế ước, Dư nợ khoanh, Ngày hết hạn khoanh | Ngày giao dịch gần nhất | Số khế ước | tên file |
| Tổng dư nợ theo CT | tdn | 1. TỔNG DƯ NỢ THEO CHƯƠNG TRÌNH | Chương trình, Tổng dư nợ, Số KH, Mã thôn | Mã món vay, Số khế ước, Mã khách hàng | Mã thôn (8 số) | cột Ngày báo cáo |
| Thông tin tổ trưởng | tt | 12. THÔNG TIN TỔ TRƯỞNG | Mã tổ trưởng, Tên tổ trưởng | | Mã tổ (7 số) | tên file |

Kỳ: cột Ngày báo cáo → ngày ở phần tiêu đề → tên file (`31-08-2026`, `2026-08-31`, `31082026`, `T8 2026`) → anh chọn.

## Liên kết
- **Món vay:** Số khế ước (KHĐ, QH, khoanh) = Mã món vay (HS tín dụng), 16 số, đầu `6600…` hoặc `6000…`. Một KH có nhiều món.
- **Khách hàng:** Mã KH 10 số (trùng định dạng với Theo dõi nợ).
- **Địa bàn:** Mã xã (6) → Mã điểm GD (`TXN…`, kèm Ngày GDXA) → Mã thôn (8) → Mã tổ (7).
- **Hội (ĐVUT):** 11 Hội Nông dân · 12 Hội LH Phụ nữ · 13 Hội Cựu chiến binh · 14 Đoàn Thanh niên.
- **Nguồn vốn:** 1 = Trung ương (TW) · 2 = Địa phương (ĐP); **Mã NĐT** (mã nhà đầu tư) là cấp chia tiếp của nguồn — tên gọi anh đặt trong Danh mục mã của kỳ.
- **Chương trình:** mã 2 số (01 HONGHEO, 02 HSSV, 03 GQVL, 06 NSVSMT, 19 HCN_QD15, 26 NCHXAPT…), danh mục đủ trong app (`TDN_CT`).

## Ghi chú nghiệp vụ đã kiểm (file 31/08/2026)
- Tổng QH của sao kê Nợ quá hạn = cột DN Quá hạn của Tổng dư nợ theo CT (khớp từng xã); tương tự nợ khoanh.
- Cột **Số KH** của Tổng dư nợ đếm theo từng chương trình — cộng lại không phải số hộ thật (lấy số hộ từ HS tín dụng chi tiết).
- **TK 105** trong HS tín dụng chỉ ghi ở một món của mỗi KH → cộng theo dòng không bị nhân đôi.
- File KHĐ có thêm các sheet anh tự làm ("BC <điểm>", "Sheet4") — app bỏ qua.
- Không có cột ngày đến hạn trong HS tín dụng; ngày đến hạn chỉ có ở file KHĐ.
- Phát hiện T8/2026: thôn **54003520** (Phường Gò Dầu) có 1 dòng dư nợ nhưng không có tên thôn / điểm GD và không có trong danh sách tổ — cần kiểm trên hệ thống.

## Mẫu 31 — ghi chú (file 31/07/2026, 27.403 dòng)
- 24.980 dòng có khế ước (21.774 OPEN, 3.206 CLOSE = đã tất toán **trong năm**; món tất toán năm trước không còn trong file → app giữ lịch sử từng tháng) + 2.423 dòng khách chỉ gửi tiết kiệm 105 (thôn 48200000 = chưa gắn thôn).
- **12 khế ước có 2 dòng** (khách có 2 sổ 105, chỉ khác cột sổ / số dư 105) → gộp, nếu không dư nợ thừa 493.000.000.
- Có: ngày đến hạn (HĐ / gia hạn / GDXA), thời hạn, lãi suất, tình trạng món, phát sinh tháng / quý / năm (giải ngân, đảo khoản, thu nợ TH / QH / khoanh, thu lãi, chuyển QH / khoanh, gia hạn, lưu vụ, xóa), lãi tồn, lịch sử gia hạn / CNQH / khoanh, SĐT, giới tính, dân tộc, vợ / chồng, tên tổ, HSSV (trường, ngành), hiệu quả đầu tư, XKLĐ (tên, thẻ, hợp đồng, công ty, quốc gia), mã dự án, mã nhà đầu tư, sổ 105.
- **Không có:** mã / tên điểm giao dịch (suy từ danh mục địa bàn), SĐT / năm sinh tổ trưởng, tổ phó (→ file Thông tin tổ trưởng), ngày hiệu lực + nguyên nhân khoanh (→ file Nợ khoanh); ngày chuyển quá hạn chỉ có ở ít dòng.
- Bộ hằng tháng anh chốt: **Mẫu 31** + KHĐ + Nợ quá hạn + Nợ khoanh + Tổng dư nợ theo CT + Thông tin tổ trưởng (+ Sao kê KH khi có).

## Lưu trữ
- Máy: IndexedDB `sl_b_<loại>_<kỳ>` (dạng theo cột), `sl_meta`, `sl_danhba`.
- Drive: `Tủ hồ sơ/Số liệu/<kỳ>/<ngày> <Tên loại>.xlsx` (file gốc) · `Tủ hồ sơ/_Hệ thống/so_lieu/<kỳ>/<loại>.json.gz` · `_Hệ thống/so_lieu/meta.json` · `_Hệ thống/so_lieu/khach_hang.json.gz`.
- Danh bạ khách hàng có CCCD, ngày sinh, địa chỉ (anh chốt để tra nhanh khi làm việc) — chỉ nằm trong máy và Drive của anh.
