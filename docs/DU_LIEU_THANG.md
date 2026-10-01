# Từ điển dữ liệu — Bộ file Excel hằng tháng (tab 📈 Số liệu, từ bản 3.85)

Nguồn: báo cáo xuất từ hệ thống (sheet `BCQUERY`, dòng 2 = tên báo cáo, dòng 5 = tên cột, dữ liệu từ dòng 6, cột A trống). App **tự dò** dòng tên cột, không cố định số dòng. Tên cột được so sau khi bỏ dấu, chữ thường.

## Nhận dạng loại (theo cột, không theo tên file)
| Loại | Mã | Tên báo cáo trong file | Cột bắt buộc | Không được có | Khóa dòng | Ngày (kỳ) |
|---|---|---|---|---|---|---|
| Hồ sơ tín dụng chi tiết — **Mẫu 31 (dùng từ 3.86)** | hstd | 31 - Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu (175 cột) | Số khế ước, Mã KH, Tình trạng món vay, Tổng dư nợ | | Số khế ước; dòng không có khế ước = khách chỉ gửi tiết kiệm (khóa Mã KH) | cột Ngày số liệu |
| Sao kê chi tiết — **Mẫu 10 (theo NGÀY, từ 3.87)** | m10 | 10. Sao kê chi tiết (DL Ngày) (43 cột) | Mã món vay, Mã khách hàng, Tổng dư nợ, Số tiền giải ngân | Tình trạng món vay | Mã món vay (16 số) | **tên file** (trong file không ghi ngày) → kỳ = ngày `yyyy-mm-dd` |
| Sao kê khách hàng (theo NGÀY) | kh | (chờ mẫu) | Mã khách hàng, CCCD | Mã món vay, Số khế ước, Tổng dư nợ | Mã KH | tên file |
| **Mẫu 7 · Kiểm tra Tổ TK&VV (từ 3.87)** | kttk | 7. BÁO CÁO KIỂM TRA TỔ TK&VV (DL THÁNG) — mỗi dòng 1 tổ | Mã tổ, Số tổ viên, Xếp loại tổ | Mã khách hàng, Mã món vay, Số khế ước | Mã tổ (7 số) | cột Ngày Dữ liệu |
| Món vay 3 tháng KHĐ | khd | 14. Sao kê món vay N tháng không hoạt động (DL Tháng) | Số khế ước, Ngày giao dịch gần nhất | Tình trạng món vay | Số khế ước | tên file |
| Nợ quá hạn | nqh | 2. SAO KÊ DANH SÁCH NỢ QUÁ HẠN | Số khế ước, Dư nợ quá hạn, (Ngày chuyển quá hạn hoặc Chuyển QH trong tháng) | Ngày giao dịch gần nhất | Số khế ước | cột Ngày báo cáo |
| Nợ khoanh | nk | 13. Danh sách nợ khoanh (DL Tháng) | Số khế ước, Dư nợ khoanh, Ngày hết hạn khoanh | Ngày giao dịch gần nhất | Số khế ước | tên file |
| Tổng dư nợ theo CT | tdn | 1. TỔNG DƯ NỢ THEO CHƯƠNG TRÌNH | Chương trình, Tổng dư nợ, Số KH, Mã thôn | Mã món vay, Số khế ước, Mã khách hàng | Mã thôn (8 số) | cột Ngày báo cáo |
| Thông tin tổ trưởng | tt | 12. THÔNG TIN TỔ TRƯỞNG | Mã tổ trưởng, Tên tổ trưởng | | Mã tổ (7 số) | tên file |

Kỳ: cột Ngày báo cáo → ngày ở phần tiêu đề → tên file (`31-08-2026`, `2026-08-31`, `31082026`, `T8 2026`) → anh chọn. Loại theo NGÀY (Mẫu 10, Sao kê KH) giữ cả ngày; loại khác lấy tháng.
**Ngày xuất (3.87):** tên file có 2 ngày (vd `QUERY0112021190__02092026_8787_31-08-2026`: xuất 02/09, số liệu 31/08) → file theo tháng xuất sau ngày số liệu thì cảnh báo có thể lẫn phát sinh sau chốt.

## Thứ bậc tin cậy (anh chốt 01/10/2026)
1. **Mẫu 31** (số chốt tháng) là chuẩn. 2. **Mẫu 10** cùng ngày. 3. File tổng hợp (Mẫu 7…) chỉ để đối chiếu — Mẫu 7 xuất sau ngày chốt có thể không chuẩn.
Lệch thì app **báo, chỉ ra nguyên nhân / dòng lệch, không sửa dữ liệu nguồn**; ghi nhận để ghi chú hoặc bổ sung ở báo cáo đầu ra. Số liệu là nguồn một chiều: tab Số liệu chỉ nhận từ file hệ thống, các tab khác chỉ đọc từ Số liệu.

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
- Phát hiện T8/2026: thôn **54003520** (Phường Gò Dầu) có 1 dòng dư nợ nhưng không có tên thôn / điểm GD và không có trong danh sách tổ — **anh xác nhận 01/10/2026: lỗi dữ liệu hệ thống, thôn không còn** (dữ liệu hệ thống còn lỗi chưa chỉnh hết → app chỉ báo, không sửa).

## Mẫu 31 — ghi chú (file 31/07/2026, 27.403 dòng)
- 24.980 dòng có khế ước (21.774 OPEN, 3.206 CLOSE = đã tất toán **trong năm**; món tất toán năm trước không còn trong file → app giữ lịch sử từng tháng) + 2.423 dòng khách chỉ gửi tiết kiệm 105 (thôn 48200000 = chưa gắn thôn).
- **12 khế ước có 2 dòng** (khách có 2 sổ 105, chỉ khác cột sổ / số dư 105) → gộp, nếu không dư nợ thừa 493.000.000.
- Có: ngày đến hạn (HĐ / gia hạn / GDXA), thời hạn, lãi suất, tình trạng món, phát sinh tháng / quý / năm (giải ngân, đảo khoản, thu nợ TH / QH / khoanh, thu lãi, chuyển QH / khoanh, gia hạn, lưu vụ, xóa), lãi tồn, lịch sử gia hạn / CNQH / khoanh, SĐT, giới tính, dân tộc, vợ / chồng, tên tổ, HSSV (trường, ngành), hiệu quả đầu tư, XKLĐ (tên, thẻ, hợp đồng, công ty, quốc gia), mã dự án, mã nhà đầu tư, sổ 105.
- **Không có:** mã / tên điểm giao dịch (suy từ danh mục địa bàn), SĐT / năm sinh tổ trưởng, tổ phó (→ file Thông tin tổ trưởng), ngày hiệu lực + nguyên nhân khoanh (→ file Nợ khoanh); ngày chuyển quá hạn chỉ có ở ít dòng.
- Bộ hằng tháng anh chốt: **Mẫu 31** + KHĐ + Nợ quá hạn + Nợ khoanh + Tổng dư nợ theo CT + Thông tin tổ trưởng (+ Sao kê KH khi có).

## Mẫu 10 — ghi chú (file 31/08/2026, 21.756 dòng, 43 cột)
- 17.743 KH, 374 tổ (7 KH không có mã tổ). Có Lãi tồn (TH / QH / AH / tổng), Số TK, **105 đầu tháng** (của **từng sổ**), **105 Ngày BC** (= **tổng 105 của khách** — anh xác nhận). Không có: mã / tên điểm GD, SĐT, tình trạng món, ngày đến hạn, phát sinh tháng. Có 34 khế ước dư nợ 0; không có khách chỉ gửi tiết kiệm.
- **150 khế ước lặp dòng** (130 × 2 dòng, 20 × 3 dòng — dòng thứ 3 không có số sổ) của **149 KH có từ 2 sổ 105**: các dòng chỉ khác Số TK / Tên TK / 105 đầu tháng; "105 Ngày BC" giống nhau ở mọi dòng. Cộng thẳng thì dư nợ thừa 6.897.000.000; 3.86 cộng 105 các dòng lặp → thừa 603.650.349. Từ 3.87: giữ dòng lặp riêng, dư nợ 1 lần / khế ước, 105 một lần / khách (tổng 62.930.852.589).
- KH có nhiều khế ước (1 sổ): 105 chỉ ghi ở 1 dòng, các dòng khác trống. So "105 đầu tháng" từng sổ với "105 Ngày BC" thấy được sổ thừa đã rút / đóng trong tháng (dùng cho danh sách theo dõi sổ thừa).
- Đối chiếu với Mẫu 7 (xuất 02/09, cùng ngày 31/08): quá hạn, khoanh khớp; tổng dư nợ Mẫu 7 hơn 3.681.500.000 (16 tổ, ~20 KH, số tròn — có thể món giải ngân sau thời điểm xuất Mẫu 10 / Mẫu 7 lẫn phát sinh sau chốt, **chưa kiểm**); lãi tồn và 105 không khớp (Mẫu 7 tính cả tổ viên chỉ gửi TK: "số tổ viên còn 105" 18.728 > "số tổ viên" 17.756). Cần Mẫu 31 ngày 31/08 để kết luận.

## Mẫu 31 — kiểm thêm cho báo cáo TK 105 (file 31/07/2026)
- Dòng món đã tất toán (CLOSE) 3.206, **3.197 có mã tổ**; dòng khách chỉ gửi tiết kiệm 2.423, 1.600 có mã tổ (còn lại phần lớn thôn 48200000 "chưa gắn thôn").
- Theo khách: còn dư nợ 17.827 · **tất nợ (dư nợ 0, lãi tồn TH + QH = 0) còn 105: 830** · tất nợ hết 105: 63 · dư nợ 0 còn lãi tồn: 36 · chỉ gửi TK có tổ 1.270 · chỉ gửi TK **không có tổ 820** (để sau, tab chuẩn hóa số liệu).
- Mẫu 31 không có cột "Lãi tồn" tổng → lãi tồn = Lãi tồn TH + Lãi tồn QH. Báo cáo TK 105 lấy nguồn **Mẫu 31** (Mẫu 10 gần như không có khách đã tất nợ: file 31/08 chỉ 5 KH dư nợ 0 + lãi tồn 0).
- **Khách mới kết nạp** (anh chốt): có dư nợ tháng này mà tháng trước không có trong tổ. Thử so Mẫu 10 31/08 với Mẫu 31 31/07 (khác loại — chỉ thử cách làm): 80 KH, 12 KH chưa có số TK 105.

## Lưu trữ
- Máy: IndexedDB `sl_b_<loại>_<kỳ>` (dạng theo cột; kỳ theo ngày vd `sl_b_m10_2026-08-31`; dòng lặp khế ước ở `b.lap`), `sl_meta`, `sl_danhba`.
- Drive: `Tủ hồ sơ/Số liệu/<tháng>/<ngày> <Tên loại>.xlsx` (file gốc) · `Tủ hồ sơ/_Hệ thống/so_lieu/<tháng>/<loại>.json.gz` (loại theo ngày: `m10_<yyyy-mm-dd>.json.gz`) · `_Hệ thống/so_lieu/meta.json` · `_Hệ thống/so_lieu/khach_hang.json.gz`.
- Danh bạ khách hàng có CCCD, ngày sinh, địa chỉ (anh chốt để tra nhanh khi làm việc) — chỉ nằm trong máy và Drive của anh.
