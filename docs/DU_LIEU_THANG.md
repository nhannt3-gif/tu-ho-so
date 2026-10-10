# Từ điển dữ liệu — Bộ file Excel hằng tháng (tab 📈 Số liệu, từ bản 3.85)

Nguồn: báo cáo xuất từ hệ thống (sheet `BCQUERY`, dòng 2 = tên báo cáo, dòng 5 = tên cột, dữ liệu từ dòng 6, cột A trống). App **tự dò** dòng tên cột, không cố định số dòng. Tên cột được so sau khi bỏ dấu, chữ thường.

## 3.90 — 7 file tổng hợp chuẩn TW (nhóm Ⓐ, mỗi tháng, bắt buộc)
Anh chốt: **số chính thức của TW, chuẩn nhất**. File dạng **biểu** (không phải bảng BCQUERY): tiêu đề + hàng tên cột 2 tầng + **hàng mốc cột (1) (2) (3)…** (lặp ở đầu mỗi trang) + dòng số liệu + dòng TỔNG CỘNG + phần ký. App đọc theo hàng mốc; ngày lấy dòng "Ngày … tháng … năm …" ở tiêu đề; dòng "…, ngày … tháng … năm …" sau bảng là **ngày lập biểu**.
| Mã | File (tên khi xuất) | Mẫu / tiêu đề | Đơn vị | Dòng | Mốc cột |
|---|---|---|---|---|---|
| bx | `4820_BCDHTD_01.1_<ddmmyyyy>_…` | 01.1/BCTD · Báo cáo kết quả cho vay HN&ĐTCS — theo xã | triệu đồng (6 số lẻ) | xã (STT số) + TỔNG CỘNG | (3) cho vay tháng (4) lũy kế năm (5) thu nợ tháng (6) lũy kế (7) xóa nợ tháng (8) lũy kế (9) tổng dư nợ (10) trong hạn (11) quá hạn (12) khoanh (13) ngắn (14) trung (15) dài hạn (16) số KH dư nợ (17) số lượt KH vay |
| bc | `4820_BCDHTD_01.2_…` | 01.2/BCTD — theo chương trình (tên CT theo TW, không có mã) | như trên | CT + TỔNG CỘNG (số KH dòng tổng = cộng theo CT) | như 01.1 |
| b32 | `4820_B32_…` | 13/BC · Báo cáo kết quả hoạt động tín dụng | triệu đồng (2 số lẻ), hộ | mục I cho vay · II thu nợ · III tổng dư nợ · IV quá hạn; mỗi mục Nguồn trung ương / Nguồn địa phương → dòng PGD + các xã | cặp (3,4) Tổng số hộ / tiền, (5,6) HONGHEO, (7,8) HSSV, … KHAC — tên nhóm ở hàng tên cột |
| lx | `4820_LEN_31_XAPUONG_…` | Tổng hợp số liệu tín dụng — theo xã | đồng | xã (STT số) + Tổng cộng | (3) số tổ (4) số hộ (5) dư nợ (6) trong hạn (7) quá hạn (8) khoanh (9) dư tiền gửi (10) cho vay (11) thu nợ (12) thu lãi (13) thu TK (14) chi TK — doanh số tháng |
| lh | `…_DONVIUT_…` | theo hội | đồng | xã (STT chữ A, B…) → hội (STT số; "Trực tiếp" = vay trực tiếp) | như XAPUONG |
| lc | `…_CHTRINH_…` | theo chương trình | đồng | xã (STT trống) → hội (STT trống) → chương trình (STT số; tên = "Tên chương trình" của Mẫu 31; có dòng "Không vay vốn, có tiết kiệm") | như XAPUONG (số hộ, số tổ cộng theo CT) |
| lt | `…_TO_TRUONG_…` | theo tổ trưởng | đồng | xã (STT chữ) → tổ (STT số, **chỉ có tên tổ trưởng**, không mã tổ, tên có thể bị cắt; "Vay trực tiếp") | như XAPUONG |

**Quy tắc đã kiểm trên file thật 30/09/2026:**
- **BCDHTD 01.1 = Mẫu 31 tuyệt đối từng xã**: dư nợ, trong hạn, quá hạn, khoanh; **cho vay = Giải ngân trong tháng − Đảo khoản GN tháng** (lũy kế: Giải ngân Năm − Đảo khoản GN Năm); **thu nợ = Thu nợ TH + QH + khoanh** (tháng / năm); xóa nợ lũy kế = Xóa trong Năm; **số KH dư nợ = số khách có dư nợ > 0**. Thời hạn: Mẫu 31 cột "Thời hạn vay" ghi Ngắn / Trung / Dài hạn. Số lượt KH vay: chưa rõ cách tính (không so).
- **LEN_31:** dư nợ / quá hạn / khoanh khớp BCDHTD; **cho vay LEN_31 = giải ngân gồm cả đảo khoản** (T9: hơn BCDHTD 40.000.000 = 1 món đảo khoản); **thu nợ LEN_31 thấp hơn BCDHTD 71.999.298** (12 tổ, chưa rõ nguyên nhân — app báo lưu ý, chuẩn là BCDHTD); tiền gửi LEN_31 khác số dư 105 Mẫu 31 vài triệu mỗi xã. 4 biểu LEN_31 khớp nhau; dòng con cộng = dòng xã. **TO_TRUONG gộp các tổ trùng tên tổ trưởng trong 1 xã thành 1 dòng** (T9: 1 dòng = 2 tổ); số hộ của tổ không trùng cách đếm nào của Mẫu 31 (chỉ để xem).
- **B32:** dư nợ, quá hạn khớp (làm tròn 0,01 triệu); **cho vay B32 gồm cả đảo khoản**; **"thu nợ" B32 = thu nợ thực + cho vay trong tháng** (app tính dòng "thu nợ thực"); số hộ thu nợ đúng số tháng.
- Ghép tổ LEN_31 ↔ mã tổ: cùng xã, tên đủ trùng → tên LEN là phần đầu tên tổ; nhiều tổ khớp tên → theo dư nợ, không thì cả nhóm nếu tổng dư nợ bằng (T9: 369 / 370 dòng ghép được, khớp dư nợ / quá hạn / khoanh / cho vay).

## Rà soát tổ / điểm GD trên file thật 30/09/2026 (10/10/2026, chỉ số đếm — không ghi dữ liệu khách)
- **Dư nợ chi tiết** (25.325 dòng, 169 cột) có trên **từng món**: Mã / Tên xã, Mã / Tên thôn, **Ngày GDXA, Mã / Tên điểm giao dịch**, Mã tổ, Loại tổ, **Mã CIF TT + Tên tổ (= tên tổ trưởng)**, Mã ĐVUT, ngày sinh tổ trưởng. **Mẫu 31 có các cột tổ như trên trừ điểm GD** (theo cấu trúc Mẫu 31 dùng làm file giả).
- **Mỗi tổ trong Dư nợ chi tiết chỉ có 1 giá trị** điểm GD / ấp / Hội / tổ trưởng / xã / ngày GDXA (0 tổ lệch giữa các món).
- **Khớp 100%** giữa Dư nợ chi tiết ↔ DSTO ↔ Thông tin tổ trưởng (phần tổ có ở cả 2 bên): điểm GD, mã + tên tổ trưởng, Hội, ấp, xã, ngày GDXA.
- **Tập tổ:** Dư nợ chi tiết 378 tổ = **369 tổ còn dư nợ (= đúng 369 tổ DSTO)** + 9 tổ dư nợ 0 (không có trong DSTO). 42 dòng không mã tổ = vay trực tiếp (Hình thức vay 1).
- **Thông tin tổ trưởng 30/09 lỗi:** 352 tổ — **thiếu 18 tổ còn dư nợ** so DSTO, thừa 1 tổ không có món nào và không có trong DSTO.
- **Kết luận:** danh sách tổ + tổ trưởng + Hội + ấp + ngày GDXA lấy từ **Mẫu 31 / Dư nợ chi tiết**, điểm GD từ **Dư nợ chi tiết** — chính xác. Thông tin tổ trưởng chỉ còn đóng góp **SĐT tổ trưởng + tổ phó** → **DSTO có đủ** (cả 369 tổ). Số tổ viên của DSTO định nghĩa khác "số khách có dư nợ" (300 tổ khác) — không dùng để so.

## LEN_31 TO_TRUONG ↔ Dư nợ chi tiết từng tổ — file thật 30/09/2026 (rà 10/10/2026, chỉ số đếm)
- LEN_31 TO_TRUONG: 374 dòng tổ (5 dòng "Vay trực tiếp", mỗi xã 1) · 5 xã · dòng Tổng cộng 370 tổ.
- **Ghép tổ** (xã + tên tổ trưởng bỏ dấu, tên LEN có thể bị cắt): **373/374**; dòng còn lại = **2 tổ cùng tên tổ trưởng trong 1 xã bị LEN gộp 1 dòng** (dư nợ dòng LEN = cộng 2 tổ) → ghép theo nhóm như app đang làm. LEN có 1 tổ dư nợ 0 (1 hộ) — 8 tổ dư nợ 0 khác của Dư nợ chi tiết không có trên LEN.
- **Khớp tuyệt đối từng tổ:** dư nợ, trong hạn, quá hạn, khoanh, **cho vay tháng** (= Giải ngân trong tháng, gồm đảo khoản).
- **Thu nợ tháng:** lệch 12 tổ, LEN thấp hơn **71.999.298 đ** (đúng con số đã thấy khi so BCDHTD T9 — chưa rõ nguyên nhân; Dư nợ chi tiết = Thu nợ TH + QH + khoanh tháng). **Thu lãi tháng:** lệch 3 tổ, 216.995 đ.
- **Số hộ** LEN ≠ số khách có dư nợ (200 tổ) và ≠ số khách có món (322 tổ) — dòng "Vay trực tiếp" có 69–261 hộ mà dư nợ rất nhỏ → **"Số hộ" LEN có cả khách chỉ gửi tiết kiệm**; Dư nợ chi tiết không có các khách này → so được khi có **Mẫu 31** (có khách chỉ gửi TK).
- **Dư tiền gửi:** lệch 203 tổ, tổng LEN cao hơn 350 triệu (LEN có cả khách chỉ gửi TK; nhiều tổ lệch vài nghìn – vài chục nghìn đồng) → so với Mẫu 31.
- **Kết luận cho bộ Kiểm tra kỳ:** LEN_31 TO_TRUONG là chuẩn từng tổ cho dư nợ / TH / QH / khoanh / cho vay (phải khớp tuyệt đối); thu nợ, thu lãi báo lệch kèm danh sách; số hộ, tiền gửi so với Mẫu 31.

## 3.90 — các file khác
- **Món vay 3 tháng KHĐ: chỉ dùng mẫu 14** "Sao kê món vay N tháng không hoạt động (DL Tháng)". File mẫu **08/KTNB** ("DS khoản vay trên N tháng không hoạt động", cột Mã món vay, Địa chỉ, Tên xã, Mô tả) **cùng số y hệt** nhưng thiếu điểm GD xã, ngày đến hạn GDXA → app không nhận. Quy tắc của hệ thống (kiểm T9): món còn dư nợ, ngày GD gần nhất **trước** ngày cùng kỳ 3 tháng trước (30/06 cho số 30/09; GD đúng ngày 30/06 không tính); **không đưa món khoanh, món HSSV**; 3 món vay mới năm 2026 cũng không có (chưa rõ lý do — app báo lưu ý). File 0 dòng → báo xuất lại.
- **Thông tin tổ trưởng: nạp mỗi tháng** (anh chốt, để kiểm). **Nợ quá hạn, Nợ khoanh, Tổng dư nợ theo CT: phụ** (không bắt buộc, có thì đối chiếu thêm). **Bỏ:** Mẫu 7 (khỏi tham chiếu), Sao kê khách hàng (không xuất được nữa).
- **Mẫu 31 chỉ xuất được số chốt tháng** (anh kiểm 02/10/2026) → số theo ngày vẫn lấy **Mẫu 10**. File TW xuất theo ngày: anh chưa thử — app đã sẵn sàng (xem dưới); khi có file thật kiểm ngày trong file, doanh số lũy kế hay theo ngày, khớp Mẫu 10 cùng ngày.
- **Kỳ:** file TW và Mẫu 31 xuất ngày cuối tháng → ô tháng; xuất giữa tháng → ô theo ngày (kỳ `yyyy-mm-dd`). Doanh số tháng của bản giữa tháng: suy luận là lũy kế từ ngày 01 đến ngày xuất (LEN_31 ghi "Doanh số phát sinh từ ngày 01/… đến ngày …") — **chờ file thật để kiểm**.

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
| **Nợ đến hạn phân kỳ (từ 3.91, phụ, theo NGÀY)** | pk | Nợ đến hạn NOXH phân kỳ đến dd-mm-yyyy (32 cột, tên cột viết liền) — mỗi dòng 1 kỳ gốc chưa trả xong | SOKU, NGAYDENHAN, NODENHAN | | Số KU (1 món có thể nhiều dòng = nhiều kỳ) | cột NGAYBC |
| Tổng dư nợ theo CT | tdn | 1. TỔNG DƯ NỢ THEO CHƯƠNG TRÌNH | Chương trình, Tổng dư nợ, Số KH, Mã thôn | Mã món vay, Số khế ước, Mã khách hàng | Mã thôn (8 số) | cột Ngày báo cáo |
| Thông tin tổ trưởng | tt | 12. THÔNG TIN TỔ TRƯỞNG | Mã tổ trưởng, Tên tổ trưởng | | Mã tổ (7 số) | tên file |

Kỳ: cột Ngày báo cáo → ngày ở phần tiêu đề → tên file (`31-08-2026`, `2026-08-31`, `31082026`, `T8 2026`) → anh chọn. Loại theo NGÀY (Mẫu 10, Sao kê KH) giữ cả ngày; loại khác lấy tháng.
**Ngày xuất (3.87):** tên file có 2 ngày (vd `QUERY0112021190__02092026_8787_31-08-2026`: xuất 02/09, số liệu 31/08) → file theo tháng xuất sau ngày số liệu thì cảnh báo có thể lẫn phát sinh sau chốt.

## Thứ bậc tin cậy (anh chốt 01/10/2026, sửa 02/10/2026 — bản 3.90)
**BCDHTD (01.1, 01.2) > LEN_31, B32 > Mẫu 31 > Mẫu 10.** Báo cáo cấp PGD / xã lấy thẳng số chuẩn TW; lọc sâu hơn tính từ Mẫu 31, ghi "tham khảo" và tự đối chiếu với số chuẩn của xã. (Trước 3.90: Mẫu 31 > Mẫu 10 > file tổng hợp; Mẫu 7 nay bỏ khỏi tham chiếu.)
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

## Mẫu 31 — cột dùng cho Sao kê / Tra cứu (kiểm file 31/07/2026)
- **SĐT** (cột "Số điện thoại", chỉ Mẫu 31): 20.846 KH — 18.776 di động 10 số, **1.965 trống**, 105 không chuẩn, 7 số dùng chung ≥ 3 KH. Quy tắc anh chốt: đạt = đúng 10 chữ số, bắt đầu bằng 0.
- **Người thừa kế = vợ/chồng** (anh xác nhận): Mẫu 31 chỉ có **Tên vợ/chồng** (không có số giấy tờ) → tìm theo tên. **CMND HSSV** + Tên HSSV có. Không file nào có cột CCCD người thừa kế.
- **Đến hạn:** Ngày ĐH theo hợp đồng / theo gia hạn / theo GDXA (anh chốt lọc theo GDXA — căn cứ chuyển quá hạn). Món OPEN đến hạn trong T8/2026: HĐ 19 · gia hạn 28 · GDXA 35. Không có lịch trả gốc từng kỳ (chỉ "Gốc đến hạn LK") → sao kê là món **đáo hạn**.
- **Gia hạn:** "Thời hạn vay" chỉ ghi Ngắn / Trung / Dài hạn. Các cột Số lần đã gia hạn, Số tháng đã GH, Tổng gia hạn nợ, ngày ĐH gia hạn **không luôn khớp nhau** (vd 0 lần nhưng ĐH gia hạn dài hơn HĐ 29 tháng; 245 món có tiền gia hạn nhưng 113 món có số lần > 0) → app ghi ⚠ khi lệch. **Anh chốt:** thời hạn cho vay = ngày vay → ngày đến hạn đầu tiên (ĐH hợp đồng); gia hạn tối đa ½ thời hạn; đã gia hạn thì còn = ½ thời hạn − (ĐH gia hạn − ĐH hợp đồng).
- **Phát sinh tháng:** Giải ngân trong tháng (T7: 134 món, 6.682.000.000; ngày lấy cột "Ngày GN cuối cùng"), 2.059 món có thay đổi dư nợ, 5 KH giải ngân chưa có sổ 105.

## Món vay trả gốc phân kỳ — nợ đến hạn kỳ con (kiểm 30/09/2026 + file phân kỳ 01/10/2026, bản 3.91)
- **Công văn 597/NHCS-TDNN 30/01/2026** (điều chỉnh kỳ hạn trả nợ gốc, cho vay ủy thác): khoản vay **mới từ 01/03/2026** — kỳ gốc không trả đúng hạn, không được điều chỉnh (Mẫu 08/TD: KH đề nghị ≥ 05 ngày làm việc, tổ trưởng nộp ≥ 03 ngày làm việc trước kỳ hoặc chậm nhất ngày GDX cố định) → chuyển phần dư nợ của kỳ sang QH (Mẫu 14/TD); điều chỉnh nhiều lần, mỗi lần không quá kỳ kế, hạn cuối không đổi; CBTD gửi danh sách nợ đến hạn tháng sau cho tổ trưởng ≥ 30 ngày trước kỳ. Vay trước 01/03/2026: theo HĐ đã ký. NOXH, HSSV STEM: quy định riêng.
- Món trả gốc phân kỳ trong app: **NOXH (CT 12)** · **cho vay trực tiếp** = món **không có mã tổ** (anh Nhân: GQVL do Hội người mù quản lý, XKLD; Mẫu 31 "Hình thức vay" = 1) · **ủy thác qua tổ vay từ 01/03/2026** có ngày bắt đầu trả gốc trước hạn cuối (30/09: 1.882 món; hầu hết món qua tổ đều trả gốc nhiều kỳ). Anh chốt: vay trước 01/03/2026 (trừ NOXH) không chuyển QH kỳ con.
- **Kỳ đã đến hạn chưa trả = Gốc đến hạn LK − gốc đã trả** (Mẫu 31; đã trả = số lớn hơn giữa cột "Gốc đã trả" và Tổng giải ngân − Dư nợ — 30/09 có món vay 70 tr, dư nợ 66 tr mà "Gốc đã trả" = 0) — khớp đúng cột NODENHAN file phân kỳ (7 món GQVL trực tiếp đến hạn 15–25/05/2026 còn 59.681.715, Mẫu 31 vẫn ghi trong hạn — **đúng quy định: GQVL cho vay trực tiếp vay trước 03/2026 không chuyển nợ quá hạn kỳ con**, anh Nhân 03/10/2026; báo cáo ghi chú ở dòng đó). Ở món trả 1 lần qua tổ cột này không mang nghĩa kỳ (14.594 món LK > đã trả) → chỉ dùng cho món phân kỳ.
- File phân kỳ: DUNO = gốc phải trả của kỳ · GOCDTRA = đã trả của kỳ · NODENHAN = DUNO − GOCDTRA · NGAYDENHAN = ngày kỳ (theo ngày GDXA) · TDUNO = tổng dư nợ · SODUTK = số dư TK. Món không có trong file = không có kỳ đến hạn tới ngày ghi ở tên file.
- Nội suy khi không có file: **NOXH 6 tháng/kỳ, trực tiếp 12 tháng/kỳ** từ Ngày bắt đầu trả gốc, ngày = ngày GDXA → **ngày kỳ khớp 14/14** dòng file. Số tiền kỳ = (dư nợ − kỳ chưa trả) ÷ số kỳ còn lại, tròn xuống 100.000 → **khớp 4/7 món NOXH** (3 món lệch do lịch riêng / trả trước). Không có file thì 4 món NOXH trả trước bị ước tính có kỳ T10–T12 (106,4 tr thay vì 81,8 tr) → **nên nạp file phân kỳ**.

## Cây xã → điểm GD → hội → tổ (kiểm 30/09/2026, bản 3.92)
- **Tổ 0000000** trong Mẫu 31 = **khách chỉ gửi tiết kiệm** (1.402 dòng, không món vay, xã giả **482000** tên "Vay trực tiếp") → app không đưa lên cây (trước hiện thành chip xã giả).
- **Vay trực tiếp** = món **không mã tổ** (Mẫu 31 "Hình thức vay" = 1, ĐVUT 99): có mã xã, thôn, **ngày GDXA** nhưng không có mã điểm GD → app suy điểm theo **xã + ngày GDXA** (mỗi điểm trong xã có ngày GD riêng); không dùng thôn vì 19/59 thôn có tổ thuộc 2 điểm. Khớp mã điểm trong file Nợ đến hạn phân kỳ (MADGD / TENDGD).
- **Hạn CCCD** (Luật Căn cước 2023): đổi khi đủ 14, 25, 40, 60 tuổi; cấp / đổi trong 2 năm trước mốc thì dùng đến mốc kế; từ 60 tuổi không hết hạn; **CMND 9 số hết hiệu lực từ 01/01/2025**. Tính từ "Ngày sinh" + "Ngày cấp" Mẫu 31 (khách sinh chỉ có năm → hệ thống ghi 01/01).

## KTGS Hội đoàn thể — BC0437 / BC0438 (kiểm file 30/09/2026, bản 3.93)
- **BC0437** "THÔNG TIN TỔ TK&VV DO … QUẢN LÝ ĐẾN NGÀY dd/mm/yyyy" (.xls, 1 sheet): hàng 1 tiêu đề (ngày lấy từ đây), hàng 2 tên cột, từ hàng 3 mỗi dòng 1 tổ — 28 cột: Mã PGD, Mã xã, Tên xã, Mã ĐVUT (11 HND · 12 HPN · 13 HCCB · 14 ĐTN), Tên ĐVUT (= 0, công thức), Mã tổ, Tên tổ trưởng, số tổ viên (tổng, còn dư nợ, có gửi TK, nộp lãi / không nộp lãi đủ 3 tháng, gửi / không gửi TK đủ 3 tháng), Tổng dư nợ / QH / khoanh / lãi tồn / lãi tồn ân hạn / số dư TK / TG bình quân (**triệu đồng**, app lưu đồng), tỷ lệ NQH, tỷ lệ khoanh (%), TG bình quân / TV / tháng (ngàn đồng), số TV có lãi tồn, **Kết quả chấm điểm tổ tháng gần nhất**, **Xếp loại** (công thức `=IF(AA<50;"Yếu";IF(AA<70;"Trung bình";IF(AA<85;"Khá";"Tốt")))` — file xuất ra **giá trị 0** → app tính lại). File 30/09: 380 dòng, **11 dòng lặp y hệt** → 369 tổ; xếp loại tính được 314 Tốt · 51 Khá · 4 TB · 0 Yếu (khớp BC0438 phần 2 cộng theo xã × hội).
- **BC0438** "THÔNG TIN ỦY THÁC XÃ … ĐẾN NGÀY …": 3 phần nối tiếp, mỗi phần có hàng tên cột riêng, dòng "Tổng cộng" = 0 (công thức): ① Dư nợ nhận ủy thác theo xã × hội: số ấp có dư nợ do HĐT quản lý / số ấp trên địa bàn, số tổ, số khách, dư nợ, số dư TK (đồng) · ② Chấm điểm: Tổng số (= 0) · Tốt · Khá · Trung bình · Yếu (số tổ) · ③ theo chương trình: số khách, dư nợ, QH (tiền, tỷ lệ), khoanh (tiền, tỷ lệ), lãi tồn, số món 3 tháng KHĐ.
- Văn bản **727/HD-NHCS 11/02/2026** (phương pháp, quy trình KTGS ủy thác): 100% món mới trong 30 ngày sau giải ngân; 100% món không phát sinh giao dịch ≥ 3 tháng; 100% tổ / năm; mỗi tổ kiểm tra sử dụng vốn ≥ 90% món giải ngân các năm trước (75% vùng khó khăn — PGD Gò Dầu không thuộc, anh chốt 90%); báo cáo Chủ tịch hội trong 3 ngày làm việc, gửi NHCSXH ở phiên giao dịch gần nhất.

- **Mẫu 04/BC-TH** (Phụ lục IV 727, file mẫu gốc anh gửi 03/10/2026): Báo cáo tổng hợp kết quả kiểm tra hoạt động nhận ủy thác cho vay — **chỉ lập khi kiểm tra hoạt động của Tổ** (không lập nếu chỉ kiểm tra sử dụng vốn của khách); lập 02 liên (01 lưu đơn vị kiểm tra, 01 gửi NHCSXH). Mục I Thành phần · II bảng Thời gian / Đơn vị được kiểm tra / Địa điểm (tỉnh, xã, thôn) · III Nội dung · IV Kết quả (đánh giá, kiến nghị của đoàn, kiến nghị của đơn vị) · **VI** Tài liệu kèm theo (mẫu không có mục V — giữ đúng). App: mỗi Hội – xã 1 báo cáo (bản 3.95).
- **Kế hoạch KTGS năm của Hội cấp xã (01/KH)** — khuôn = **dự thảo "MẪU THAM KHẢO HĐT CẤP XÃ"** của Hội cấp tỉnh (anh gửi 03/10/2026, .doc khổ Letter, 8 trang): I. Mục đích, đối tượng (100% món mới trong 30 ngày, 100% món không hoạt động ≥ 3 tháng, 100% tổ, 75% / 90% món các năm trước) · II. Thành phần, thời hiệu (năm trước), thời gian + bảng lịch Tháng · Tổ (100%) · Số khách hàng (tối thiểu 90%) · 4. Báo cáo kết quả, khắc phục · III. Nội dung kiểm tra tại Tổ, tại khách hàng (câu hỏi). Dự thảo làm 12/01/2026 nên căn cứ còn HD 10566/2022 → app đổi sang 727 (anh chốt), chỉ 90% (Gò Dầu không thuộc vùng khó khăn). Khuôn trắng 01/KH trong 727 chỉ có tiêu đề mục; bản mẫu Truông Mít anh gửi (có tên thật) chỉ để tham khảo, không đưa vào repo.
- **Kế hoạch mẫu của một Hội cấp xã** (anh gửi 03/10/2026, 4 trang, có tên tổ trưởng / ấp thật — chỉ đọc ở máy làm việc): làm khuôn ② "mẫu gọn" (3.97) sau khi xóa hết tên riêng; khác dự thảo HĐT xã: có mục III Kế hoạch giám sát, IV Tổ chức thực hiện, bảng lịch Stt · Thời gian · Kiểm tra tại các tổ · Ghi chú, ký TM. BAN THƯỜNG VỤ.
## Danh sách giải ngân (sao kê "1. Sao kê danh sách giải ngân Từ ngày - Đến ngày", file 30/09/2026, bản 3.93.1)
- 29 cột: … Mã tổ, Mã KH, CCCD, ĐVUT, Dư nợ, Lãi suất, Ngày vay, Số khế ước, Số tiền giải ngân, Giải ngân trong tháng, Giải ngân trong năm, Ngày vay đầu tiên, Ngày giải ngân mới, Ngày đến hạn 1, Mã sản phẩm, Chương trình, Nguồn vốn, **Mục đích vay vốn**. 3.355 dòng / 3.340 khế ước (15 dòng lặp).
- Đối chiếu Mẫu 31 cùng ngày: 3.340 / 3.340 khế ước có ở Mẫu 31; giải ngân tháng, năm, dư nợ khớp 100%; "Ngày vay đầu tiên" = Ngày GN đầu tiên, "Ngày giải ngân mới" = Ngày GN cuối cùng; **"Mục đích vay vốn" = "Tên PNKT51"**. Danh sách **bỏ món đã tất toán** (Mẫu 31 có thêm 16 món giải ngân trong năm đã đóng). Mẫu 31 có 51 món ghi ngày GN đầu tiên nhưng **Tổng giải ngân = 0** (chưa giải ngân thực) → lọc theo số tiền, không theo ngày.
- → **Không cần nạp danh sách giải ngân**; kiểm tra sau giải ngân lấy từ Mẫu 31 tháng ("Giải ngân trong tháng" > 0, kể cả HSSV các lần sau — anh chốt).

## Lưu trữ
- Máy: IndexedDB `sl_b_<loại>_<kỳ>` (dạng theo cột; kỳ theo ngày vd `sl_b_m10_2026-08-31`; dòng lặp khế ước ở `b.lap`), `sl_meta`, `sl_danhba`.
- Drive: `Tủ hồ sơ/Số liệu/<tháng>/<ngày> <Tên loại>.xlsx` (file gốc) · `Tủ hồ sơ/_Hệ thống/so_lieu/<tháng>/<loại>.json.gz` (loại theo ngày: `m10_<yyyy-mm-dd>.json.gz`) · `_Hệ thống/so_lieu/meta.json` · `_Hệ thống/so_lieu/khach_hang.json.gz`.
- Danh bạ khách hàng có CCCD, ngày sinh, địa chỉ (anh chốt để tra nhanh khi làm việc) — chỉ nằm trong máy và Drive của anh.
