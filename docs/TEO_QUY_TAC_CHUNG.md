# Tèo — SỔ QUY TẮC SỐ LIỆU CHUNG (app Tủ hồ sơ + giao ban)

> **Bản 1.0 · 28/10/2026.** Một nơi duy nhất cho **luật số liệu dùng chung** của hai tay (app, giao ban). Phối hợp, phân vai, thành viên, hộp thư: `docs/TEO_PHOI_HOP.md` (mục 12–14). Lập bởi **TK 1** (giao ban).
> Mã **QT-C-xx** (C = chung) để không trùng QT-01…QT-18 riêng của app (`QUY_CHUAN_KIEN_TRUC.md` mục 4). Luật riêng app / riêng văn bản giao ban vẫn ở chỗ cũ, chỉ ghi "theo QT-C-xx".
> **Sửa luật = sửa dòng ở đây (PR, anh "gộp") + ghi Hộp thư cho bên kia + sửa hàm hai bên + chạy phép thử.** Mỗi luật một hàm ở mỗi bên; chú thích hàm ghi số QT-C.
> Repo công khai: không dữ liệu khách / tên tổ trưởng / mã tổ.

Trạng thái: ✅ anh chốt · ⏳ chờ anh chốt · 🔧 đã chốt nhưng một bên chưa áp.

## 1. Luật đã chốt

| Số | Quy tắc | TT | Chốt | App (hiện tại) | Giao ban (hiện tại) |
|---|---|---|---|---|---|
| QT-C-01 | **Nguồn tính duy nhất là Mẫu 31.** Khế ước lặp dòng (khách nhiều sổ TK 105) → số của món vay (dư nợ, giải ngân, thu nợ, lãi tồn) tính **1 lần / số khế ước**; tiền gửi tính theo từng sổ | ✅ | 28/10 | lõi nạp `js/22-so-lieu.js` | `mon_vay()` |
| QT-C-02 | **Cho vay = Giải ngân trong tháng − Đảo khoản GN tháng; Thu nợ = Thu nợ TH + QH + khoanh** (khớp BCDHTD 01.1) | ✅ | 28/10 | `js/22-so-lieu.js` | `chi_tieu_to()` |
| QT-C-03 | **Lãi tồn = Lãi tồn TH + Lãi tồn QH** (không gồm lãi tồn ân hạn) | ✅ | 28/10 | `laiTon` (`js/22g-to.js`) | `chi_tieu_to()` |
| QT-C-04 | **Số tháng lãi = lãi tồn ÷ (dư nợ × lãi suất năm ÷ 12).** Ngưỡng dùng là luật riêng từng báo cáo (KTGS > 6; giao ban 3 / 6 / 12) | ✅ | 28/10 | `ktLaiThang` (`js/22d-ktgs-04.js`) | `so_thang_lai()` |
| QT-C-05 | **Xếp loại tổ theo điểm:** < 50 Yếu · < 70 Trung bình · < 85 Khá · ≥ 85 Tốt. **Nguồn điểm: CLT02** (chuẩn TW); BC0437 dự phòng khi chưa có CLT02 | ✅ / 🔧 | 28/10 | công thức `js/22b-ktgs.js` (nguồn BC0437 — cần thêm CLT02) | `xl_diem()`, CLT02 trước |
| QT-C-06 | **Mã ĐVUT:** 11 HND · 12 HPN · 13 HCCB · 14 ĐTN; khác (99 / trống, không mã tổ) = **vay trực tiếp** | ✅ | 28/10 | | `DV` |
| QT-C-07 | **Mã tổ là khóa** ghép mọi nguồn; cây địa bàn dựng lại theo từng kỳ số liệu | ✅ | 28/10 | | `cay_dia_ban()` |
| QT-C-08 | **Hai nguồn lệch → báo, không tự chọn, không sửa nguồn** | ✅ | 28/10 | | |
| QT-C-09 | **Bộ file nạp chung + ngày số liệu:** theo `TEO_PHOI_HOP.md` mục 3–4 (app 3.400: `Tủ hồ sơ\Số liệu\<YYYY-MM>\<MÃ>_<YYYY-MM-DD>.<đuôi>` + `DANH_MUC_NAP.csv`; giao ban đọc sổ nạp). Ngày trong tên = **ngày số liệu đọc trong file** (kỳ phiên: Mẫu 31 phiên 19/10 mang ngày 19/10 = số đến cuối ngày sau khóa sổ). **Mẫu 31 và File Tổ trưởng phải cùng ngày**, lệch → chặn / báo | ✅ / 🔧 | 28/10 | đã làm ở 3.400 | ✅ `bang_so_lieu.py` 1.3 (`tim_kho`); `tong_hop.py` 2.21 ✅ |
| QT-C-10 | **Điểm GD — chuỗi duy nhất: món vay → mã tổ → ấp của tổ → điểm GD; 1 ấp chỉ thuộc 1 điểm.** Ấp của tổ = mã thôn trên File Tổ trưởng. **Món ở ấp khác ấp của tổ = sai, báo để sửa trên hệ thống**, không tự sửa (tạm tính theo tổ). Kiểm: tổ cùng ấp phải cùng điểm; điểm của tổ trên File Tổ trưởng phải trùng điểm của ấp | ✅ / 🔧 | 28/10 | ✅ 3.401: ấp của tổ theo MADP File Tổ trưởng; Kiểm tra kỳ báo món lệch ấp / ấp nhiều điểm (`toKiemAp`) | ✅ `bang_so_lieu.py` 1.3 (`ap_dung_to_truong`, sheet 3b/3c); `tong_hop.py` 2.21 ✅ |
| QT-C-11 | **Món vay trực tiếp** (không qua Hội): **dư nợ điểm, xã, PGD đều cộng**, tách dòng "Trực tiếp" cạnh "Ủy thác" (mẫu 08/GDX). Gán điểm **theo ấp của món vay** (QT-C-10), **không theo ngày GDXA** | ✅ / 🔧 | 28/10 | ✅ 3.401: tổ cùng ấp → danh mục → ấp chưa có tổ tạm GDXA (báo) → xã 1 điểm (`toGanTrucTiep`) | ✅ `bang_so_lieu.py` 1.3 theo ấp của File Tổ trưởng (ấp chưa có tổ nào: tạm GDXA, ghi nhật ký); `tong_hop.py` 2.21 ✅ |
| QT-C-12 | **Ngày đến hạn / chuyển quá hạn theo phiên của điểm:** món gắn mã tổ → ngày đến hạn GDXA = ngày giao dịch của điểm; điểm đổi lịch / món, tổ điều chuyển → theo **điểm mới**. **Chuyển QH = phiên đầu tiên của điểm KỂ TỪ ngày đến hạn** (trùng ngày phiên → chính phiên đó). Mốc = ngày đến hạn **sau gia hạn** nếu đã gia hạn, không thì theo hợp đồng. **Món trực tiếp: ngay sau ngày đến hạn.** Kỳ gốc phân kỳ (CV 597) của món qua tổ: theo ngày điểm như trên | ✅ / 🔧 | 28/10 | ✅ 3.404: ưu tiên cột hệ thống; trống → phiên đầu tiên của điểm kể từ ngày ĐH (sau gia hạn), trực tiếp ngay sau ngày ĐH; lệch lịch điểm → ⚠ (`skCQH`) | ✅ `bang_so_lieu.py` 1.3 (`phien_ke_tu`, sheet 5a); `tong_hop.py` 2.21 ✅ |
| QT-C-13 | **Cấu hình điểm GD theo tiến độ thực tế** (anh chốt 29/10: "lấy theo Mẫu 31 và DS tổ cho chuẩn, không phải 12 gộp còn 9 — sẽ theo tiến độ"): điểm của tổ / ấp = File Tổ trưởng + Mẫu 31 **cùng kỳ**; kế hoạch 12 → 9 điểm (bỏ ngày 06, 07, 12) chỉ để biết, **không cài cứng bảng chuyển hay mốc kỳ**; tháng cũ giữ nguyên theo file tháng đó | ✅ / 🔧 | 28/10 | ✅ 3.401 / 3.406: điểm theo File Tổ trưởng, không có bảng gộp cứng; 🗺 Địa bàn theo số liệu
| QT-C-17 | **Nợ đến hạn tháng tới (K7)** = món **còn dư nợ, chưa quá hạn**; ngày đến hạn = "Ngày ĐH theo Gia hạn", **chưa gia hạn thì "Ngày ĐH theo hợp đồng"**; rơi vào tháng kế tiếp ngày số liệu. Chưa gồm kỳ con phân kỳ CV 597 (chờ chốt riêng) | ✅ | 30/10 | ✅ 3.405 (`so_mon_den_han_thang_toi`) | ✅ `bang_so_lieu.py` 1.4 (`den_han_k7`, sheet 5c + file đối chiếu); `tong_hop.py` 2.21 ✅ |

## 2. Luật chờ anh chốt (đề xuất — chưa áp)

| Số dự kiến | Nội dung | Khuyến nghị (chi tiết `TEO_PHOI_HOP.md` mục 6) |
|---|---|---|
| ⏳ QT-C-14 (K1) | Tổ viên | Theo QT-18 app: + khách chưa giải ngân + bù Mẫu 01/TV (khớp TW 100%) |
| ⏳ QT-C-15 (K4) | Khoản vay mới (kiểm tra 30 ngày, HD 727) | Giải ngân lần 1; lần 2+ danh sách theo dõi riêng |
| ⏳ QT-C-16 (K5) | Món 3 tháng KHĐ | Chạy cả hai hàm trên các kỳ có file TW rồi chọn |
| ⏳ (K7 phần còn lại) | Kỳ con phân kỳ CV 597 trong nợ đến hạn | Món trực tiếp lấy file phân kỳ — chờ chốt |
| ⏳ QT-C-18 (K8) | Tổ trưởng | File Tổ trưởng; không có mới Mẫu 31 |
| ⏳ QT-C-19 (K9) | Số tổng hợp cấp xã | Tính từ Mẫu 31 + kiểm khớp BCDHTD từng xã |
| ⏳ QT-C-20 | Gia hạn tối đa | ½ thời hạn với **trung hạn** (anh nêu); ngắn / dài hạn chờ văn bản gia hạn |
| ⏳ phần C | Mức A–D NQH · đèn tín hiệu · TK < 500 nghìn · khoanh hết hạn 120 ngày · lãi tồn chỉ so tháng trước · QT-03/04/05/14 app · kỳ con CV 597 · số lượt KH vay | Đưa vào sổ chung |

## 3. Phép thử chung (bước B4)

Bộ trường hợp **dữ liệu giả + đáp án**: `tests/teo/teo_ca.json` (bản 1.1 · 30/10/2026 · 18 trường hợp, 31 ý) — **nguồn duy nhất cho cả hai bên**. Cột Mẫu 31 / File Tổ trưởng ghi đúng tên cột hệ thống; kết quả so theo hợp đồng cột file đối chiếu (`TEO_KE_HOACH_KY_3110.md` mục 3).

| Luật | Trường hợp | Giao ban (`thu_teo.py` · `bang_so_lieu.py` 1.3) | App |
|---|---|---|---|
| QT-C-01 | C01-1 khế ước lặp 2 sổ TK 105 | ✓ 3/3 | chưa |
| QT-C-02 | C02-1 cho vay − đảo khoản; thu nợ 3 loại | ✓ 2/2 | chưa |
| QT-C-03 | C03-1 lãi tồn TH + QH | ✓ 1/1 | chưa |
| QT-C-04 | C04-1 số tháng lãi | ✓ 1/1 | chưa |
| QT-C-05 | C05-1 6 điểm sát ngưỡng | ✓ 6/6 | chưa |
| QT-C-06 | C06-1 ĐVUT 99 → TT | ✓ 2/2 | chưa |
| QT-C-09 | C09-1 File Tổ trưởng khác ngày → không ghép | ✓ 1/1 | chưa |
| QT-C-10 | C10-1 món lệch ấp · C10-2 ấp 2 điểm · C10-3 điểm theo File Tổ trưởng | ✓ 6/6 | chưa |
| QT-C-11 | C11-1 trực tiếp theo ấp, không theo GDXA · C11-2 ấp chưa có tổ | ✓ 3/3 | chưa |
| QT-C-12 | C12-12a trùng ngày phiên · 12b sau ngày phiên · 12c gia hạn · 12d trực tiếp · 12e tổ đổi điểm | ✓ 5/5 | chưa |
| QT-C-17 | C17-1 đến hạn: gia hạn / HĐ, bỏ món QH, bỏ món hết nợ | ✓ 1/1 (1.4; bản 1.3 trượt — đúng như dự kiến) | chưa |

Giao ban chạy: `python thu_teo.py` (Drive `06_CONG_CU\v2`, chép `teo_ca.json` cạnh script) — **31/31 đạt** ngày 30/10/2026 (`bang_so_lieu.py` 1.4). App: TK 2 viết phép thử JS đọc cùng file (trình anh). **Sửa luật / sửa script hay app → chạy lại; thêm luật chốt → thêm trường hợp vào file này.** Luật chờ chốt (K1, K4, K5, K7–K9) chưa có đáp án.

## 4. Nhật ký

| Bản | Ngày | Nội dung |
|---|---|---|
| 1.0 | 28/10/2026 | Lập sổ: QT-C-01…13 anh chốt trong phiên giao ban 28/10; QT-C-14…20 + phần C chờ chốt. |
| 1.1 | 28/10/2026 | Cột Giao ban: QT-C-09…13 đã áp ở `bang_so_lieu.py` 1.3; `tong_hop.py` chưa. |
| 1.2 (TK 1) | 30/10/2026 | Mục 3: bộ phép thử chung `tests/teo/teo_ca.json` 1.0; giao ban 30/30 đạt. |
| 1.3 (TK 1) | 30/10/2026 | Anh chốt K7 → **QT-C-17** (theo cách app 3.405); phép thử C17-1; giao ban áp ở `bang_so_lieu.py` 1.4. |
| 1.4 (TK 1) | 30/10/2026 | Giao ban: `tong_hop.py` **2.21** áp QT-C-09…13, 17 (số văn bản + Gemini). |
