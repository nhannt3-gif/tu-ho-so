# SỔ QUY TẮC SỐ LIỆU CHUNG (app Tủ hồ sơ + giao ban)

> **Bản 1.0 · 28/10/2026.** Một nơi duy nhất cho **luật số liệu dùng chung** của hai tay (app, giao ban). Phối hợp, phân vai, thành viên, hộp thư: `docs/PHOI_HOP_CHUNG.md` (mục 12–14). Lập bởi **TK 1** (giao ban).
> Mã **QT-C-xx** (C = chung) để không trùng QT-01…QT-18 riêng của app (`QUY_CHUAN_KIEN_TRUC.md` mục 4). Luật riêng app / riêng văn bản giao ban vẫn ở chỗ cũ, chỉ ghi "theo QT-C-xx".
> **Sửa luật = sửa dòng ở đây (PR, anh "gộp") + ghi Hộp thư cho bên kia + sửa hàm hai bên + chạy phép thử.** Mỗi luật một hàm ở mỗi bên; chú thích hàm ghi số QT-C.
> Repo công khai: không dữ liệu khách / tên tổ trưởng / mã tổ.
> **Chốt luật = có phép thử (anh chốt 01/11/2026, sổ 1.10):** một luật chỉ ghi ✅ khi đủ **3 điều**: ① câu chữ ở bảng mục 1 · ② **ít nhất 1 trường hợp mẫu** trong `tests/teo/teo_ca.json` (TK 1 viết, số giả) · ③ **cả hai bên chạy đạt** (giao ban `thu_teo.py`, app `node tests/t328.js`) — ghi kết quả ở mục 3. Thiếu ② hoặc ③ → ghi 🔧 (đã chốt câu chữ, chưa đủ phép thử / một bên chưa đạt). Luật cũ chưa có trường hợp mẫu: bổ sung dần, không hạ trạng thái ngay.

Trạng thái: ✅ anh chốt · ⏳ chờ anh chốt · 🔧 đã chốt nhưng một bên chưa áp.

## 1. Luật đã chốt

| Số | Quy tắc | TT | Chốt | App (hiện tại) | Giao ban (hiện tại) |
|---|---|---|---|---|---|
| QT-C-01 | **Nguồn tính duy nhất là Mẫu 31.** Khế ước lặp dòng (khách nhiều sổ TK 105) → số của món vay (dư nợ, giải ngân, thu nợ, lãi tồn) tính **1 lần / số khế ước**; tiền gửi tính theo từng sổ | ✅ | 28/10 | lõi nạp `js/22-so-lieu.js` | `mon_vay()` |
| QT-C-02 | **Cho vay = Giải ngân trong tháng − Đảo khoản GN tháng; Thu nợ = Thu nợ TH + QH + khoanh** (khớp BCDHTD 01.1) | ✅ | 28/10 | `js/22-so-lieu.js` | `chi_tieu_to()` |
| QT-C-03 | **Lãi tồn = Lãi tồn TH + Lãi tồn QH** (không gồm lãi tồn ân hạn). **Bổ sung 01/11 (anh chốt):** Mẫu 31 **theo ngày** ghi Lãi tồn TH gồm cả lãi tính dồn từ phiên gần nhất đến ngày báo cáo (chốt tháng thì không — anh so T9 ↔ 30/10) → kỳ theo ngày: món có *Ngày GD gần nhất* ≥ phiên gần nhất của điểm (ngày GD của điểm trong tháng của ngày số liệu; chưa tới → tháng trước) thì lãi tồn = **Lãi tồn QH**; không giao dịch ở phiên → TH + QH. Món trực tiếp giữ như cũ | 🔧 | 28/10 · 01/11 | `laiTon` + `toLaiTonNgay` (`js/22g-to.js`, app 3.436) | `chi_tieu_to()` — chưa áp phần bổ sung |
| QT-C-04 | **Số tháng lãi = lãi tồn ÷ (dư nợ × lãi suất năm ÷ 12).** Ngưỡng dùng là luật riêng từng báo cáo (KTGS > 6; giao ban 3 / 6 / 12) | ✅ | 28/10 | `ktLaiThang` (`js/22d-ktgs-04.js`) | `so_thang_lai()` |
| QT-C-05 | **Xếp loại tổ theo điểm:** < 50 Yếu · < 70 Trung bình · < 85 Khá · ≥ 85 Tốt. **Nguồn điểm: CLT02** (chuẩn TW); BC0437 dự phòng khi chưa có CLT02 | ✅ / 🔧 | 28/10 | công thức `js/22b-ktgs.js` (nguồn BC0437 — cần thêm CLT02) | `xl_diem()`, CLT02 trước |
| QT-C-06 | **Mã ĐVUT:** 11 HND · 12 HPN · 13 HCCB · 14 ĐTN; khác (99 / trống, không mã tổ) = **vay trực tiếp** | ✅ | 28/10 | | `DV` |
| QT-C-07 | **Mã tổ là khóa** ghép mọi nguồn; cây địa bàn dựng lại theo từng kỳ số liệu | ✅ | 28/10 | | `cay_dia_ban()` |
| QT-C-08 | **Hai nguồn lệch → báo, không tự chọn, không sửa nguồn** | ✅ | 28/10 | | |
| QT-C-09 | **Bộ file nạp chung + ngày số liệu:** theo `PHOI_HOP_CHUNG.md` mục 3–4 (app 3.400: `Tủ hồ sơ\Số liệu\<YYYY-MM>\<MÃ>_<YYYY-MM-DD>.<đuôi>` + `DANH_MUC_NAP.csv`; giao ban đọc sổ nạp). Ngày trong tên = **ngày số liệu đọc trong file** (kỳ phiên: Mẫu 31 phiên 19/10 mang ngày 19/10 = số đến cuối ngày sau khóa sổ). **Mẫu 31 và File Tổ trưởng phải cùng ngày**, lệch → chặn / báo. **Anh chốt 30/10: khi chốt số hoặc so sánh số liệu (báo cáo, file đối chiếu) bắt buộc cùng ngày, lệch thì chặn; xem hằng ngày trên app vẫn cho, kèm ⚠** (tháng này tổ sắp xếp biến động theo ngày). **Anh 30/10 (bản cuối, sau khi thử "không ghép"): "nên quay lại lấy như cũ nhưng Mẫu 31 vẫn là chính"** → xem hằng ngày: File Tổ trưởng **bản gần nhất** vẫn ghép nhưng **chỉ bù chỗ Mẫu 31 trống** (ấp theo Mẫu 31), có ⚠; chốt / so sánh / file đối chiếu: khác ngày → **chặn** | ✅ / 🔧 | 28/10 | đã làm ở 3.400; 3.409: xem hằng ngày ghép gần nhất (Mẫu 31 chính) + ⚠ · 📤 file đối chiếu chặn khi khác ngày | ✅ `bang_so_lieu.py` 1.3 (`tim_kho`); `tong_hop.py` 2.21 ✅ |
| QT-C-10 | **Điểm GD — chuỗi duy nhất: món vay → mã tổ → ấp của tổ → điểm GD; 1 ấp chỉ thuộc 1 điểm.** Ấp của tổ = mã thôn trên File Tổ trưởng. **Món ở ấp khác ấp của tổ = sai, báo để sửa trên hệ thống**, không tự sửa (tạm tính theo tổ). Kiểm: tổ cùng ấp phải cùng điểm; điểm của tổ trên File Tổ trưởng phải trùng điểm của ấp | ✅ / 🔧 | 28/10 | ✅ 3.401: ấp của tổ theo MADP File Tổ trưởng; Kiểm tra kỳ báo món lệch ấp / ấp nhiều điểm (`toKiemAp`) | ✅ `bang_so_lieu.py` 1.3 (`ap_dung_to_truong`, sheet 3b/3c); `tong_hop.py` 2.21 ✅ |
| QT-C-11 | **Món vay trực tiếp** (không qua Hội): **dư nợ điểm, xã, PGD đều cộng**, tách dòng "Trực tiếp" cạnh "Ủy thác" (mẫu 08/GDX). Gán điểm **theo ấp của món vay** (QT-C-10), **không theo ngày GDXA** | ✅ / 🔧 | 28/10 | ✅ 3.401: tổ cùng ấp → danh mục → ấp chưa có tổ tạm GDXA (báo) → xã 1 điểm (`toGanTrucTiep`) | ✅ `bang_so_lieu.py` 1.3 theo ấp của File Tổ trưởng (ấp chưa có tổ nào: tạm GDXA, ghi nhật ký); `tong_hop.py` 2.21 ✅ |
| QT-C-12 | **Ngày đến hạn / chuyển quá hạn theo phiên của điểm:** món gắn mã tổ → ngày đến hạn GDXA = ngày giao dịch của điểm; điểm đổi lịch / món, tổ điều chuyển → theo **điểm mới**. **Chuyển QH = phiên đầu tiên của điểm KỂ TỪ ngày đến hạn** (trùng ngày phiên → chính phiên đó). Mốc = ngày đến hạn **sau gia hạn** nếu đã gia hạn, không thì theo hợp đồng. **Món trực tiếp: ngay sau ngày đến hạn.** Kỳ gốc phân kỳ (CV 597) của món qua tổ: theo ngày điểm như trên | ✅ / 🔧 | 28/10 | ✅ 3.404: ưu tiên cột hệ thống; trống → phiên đầu tiên của điểm kể từ ngày ĐH (sau gia hạn), trực tiếp ngay sau ngày ĐH; lệch lịch điểm → ⚠ (`skCQH`) | ✅ `bang_so_lieu.py` 1.3 (`phien_ke_tu`, sheet 5a); `tong_hop.py` 2.21 ✅ |
| QT-C-13 | **Cấu hình điểm GD theo tiến độ thực tế** (anh chốt 29/10: "lấy theo Mẫu 31 và DS tổ cho chuẩn, không phải 12 gộp còn 9 — sẽ theo tiến độ"): điểm của tổ / ấp = File Tổ trưởng + Mẫu 31 **cùng kỳ**; kế hoạch 12 → 9 điểm (bỏ ngày 06, 07, 12) chỉ để biết, **không cài cứng bảng chuyển hay mốc kỳ**; tháng cũ giữ nguyên theo file tháng đó | ✅ / 🔧 | 28/10 | ✅ 3.401 / 3.406: điểm theo File Tổ trưởng, không có bảng gộp cứng; 🗺 Địa bàn theo số liệu
| QT-C-17 | **Nợ đến hạn tháng tới (K7)** = món **còn dư nợ, chưa quá hạn**; ngày đến hạn = "Ngày ĐH theo Gia hạn", **chưa gia hạn thì "Ngày ĐH theo hợp đồng"**; rơi vào tháng kế tiếp ngày số liệu. Chưa gồm kỳ con phân kỳ CV 597 (chờ chốt riêng) | ✅ | 30/10 | ✅ 3.405 (`so_mon_den_han_thang_toi`) | ✅ `bang_so_lieu.py` 1.4 (`den_han_k7`, sheet 5c + file đối chiếu); `tong_hop.py` 2.21 ✅ |
| QT-C-21 | **So sánh kỳ theo vị trí hiện nay của từng khế ước** (anh duyệt 30/10): số kỳ trước / đầu quý / 31-12 xếp vào tổ, Hội, điểm **mà khế ước đó đang thuộc ở kỳ này** (tổ viên chuyển tổ, chuyển điểm, đổi Hội thì ± chỉ còn phần tăng giảm thật). Sổ TK 105 theo vị trí của sổ ở kỳ này, **chỉ khi cả hai kỳ đều gắn tổ** (tổng PGD không đổi). Món không còn ở kỳ này → theo tổ cũ (tổ đã đóng → điểm hiện nay theo ấp). **Số tổ kỳ trước vẫn là số tổ thật.** **Cây địa bàn chỉ hiện tổ đang hoạt động**; tổ đóng không còn trên cây, theo dõi ở chỗ riêng (biến động tổ: mới / đóng + món chuyển đi đâu / chuyển điểm / đổi Tổ trưởng, Hội, ấp) | ✅ | 30/10 | ✅ 3.424 `toKyTruoc` (số kỳ trước theo vị trí hiện nay); biến động tổ / cây chỉ tổ hoạt động: màn làm lại sau | ✅ `bang_so_lieu.py` 1.6 (`K()`, sheet 3d_Bien_dong_to); `tong_hop.py` 2.22 (`theo_vi_tri_hien_nay`) |
| QT-C-18 | **Tổ trưởng (K8):** tên, CCCD, ngày cấp, SĐT, TK 104 của tổ trưởng / tổ phó theo **File Tổ trưởng cùng ngày**; không có thì **bản gần nhất** (QT-C-22); không có file nào mới lấy Mẫu 31 | ✅ | 31/10 | 3.202 + 3.409 (`toNap`: File Tổ trưởng gần nhất, bù chỗ trống) | (TK 1 đối chiếu) |
| QT-C-22 | **Hai loại dữ liệu** (anh 31/10: "số dư hay so sánh cần cùng 1 ngày, còn khi cần lấy số TK 105 hay các thông tin tổ thì chỉ cần rà các dữ liệu gần nhất có là được"): ① **số dư, số so sánh** (dư nợ, tiền gửi, thu nợ, so kỳ, tăng giảm) — mọi nguồn **cùng 1 ngày số liệu**; ② **thông tin nhận dạng** (số TK 105 / 104, CCCD, tổ trưởng, ấp, SĐT, ngày mở TK) — lấy **dữ liệu gần nhất có**, ghi rõ ngày nguồn. Thứ tự: Mẫu 31 → file cùng ngày → bản gần nhất | ✅ | 31/10 | 3.410: số TK 105 bù từ Sao kê TK 105 gần nhất (`slStkKH`); File Tổ trưởng gần nhất (QT-C-09) | (TK 1 đối chiếu) |
| QT-C-14 | **Tổ viên (K1, anh chốt 31/10) — hai chỉ tiêu:** ① **văn bản giao ban mẫu 08** (câu "với … khách hàng còn dư nợ", cột Số khách hàng): **tổ viên còn dư nợ** (Mã KH có dư nợ > 0) — hai bên phải khớp; ② **tổng tổ viên** (gồm khách tất nợ chưa ra khỏi tổ) cho **mẫu biểu tổ của app** và xét **quy mô tổ** (50–90): theo cách của app (QT-18 app: + khách chưa giải ngân + bù Mẫu 01/TV, khớp TW). Giao ban giữ số "còn dư nợ + tất nợ còn TK 105" chỉ cho văn bản đã phát hành (số liệu đến 30/10/2026); lệch số tổng trong file đối chiếu = **khác định nghĩa**, không phải lỗi | ✅ | 31/10 | ② là cách app đang làm; ① cột `so_tv_du_no` file đối chiếu | ✅ `tb_kl.py` 3.3, `nd_hop_m08.py` 1.10 (`ap_k1`): số liệu từ 31/10/2026 |

## 2. Luật chờ anh chốt (đề xuất — chưa áp)

| Số dự kiến | Nội dung | Khuyến nghị (chi tiết `PHOI_HOP_CHUNG.md` mục 6) |
|---|---|---|
| ~~QT-C-14 (K1)~~ | Tổ viên | ✅ chốt 31/10 — xem mục 1 |
| 🔧 QT-C-15 (K4) | Khoản vay mới (kiểm tra 30 ngày, HD 727) | **Anh chốt hướng 01/11 (tạm — chốt lại nghiệp vụ 1 lần sau kỳ số liệu mới):** đếm / liệt kê **mọi món có giải ngân trong tháng** (kể cả HSSV lần 2+); màn kiểm tra cho **chọn "Lần 1" hoặc "Tất cả"**. **Giao kế hoạch cho chi hội** = mức tối thiểu theo văn bản (727 chỉ quy định **giải ngân lần 1**); **khi mình cần thì kiểm tra hết** (Tất cả). Lần 1 = "Ngày GN đầu tiên" (Mẫu 31, `ngn`) rơi vào tháng đó; thiếu ngày → không tính Lần 1 (không đoán). **App 3.429:** Mẫu 06 sau giải ngân có chip Tất cả (mặc định) / Lần 1 (`ktGNLan1`, `js/22c-ktgs-m06.js`). Sau này: TB kết luận ghi nhiệm vụ tháng sau từng Hội kiểm tra bao nhiêu món Lần 1. Chưa có trường hợp mẫu teo_ca → chưa ✅ |
| ⏳ QT-C-16 (K5) | Món 3 tháng KHĐ | Chạy cả hai hàm trên kỳ số liệu mới (02/11) rồi anh chốt nghiệp vụ 1 lần (anh 01/11) |
| ⏳ (K7 phần còn lại) | Kỳ con phân kỳ CV 597 trong nợ đến hạn | Món trực tiếp lấy file phân kỳ — chờ chốt |
| 🔧 QT-C-19 (K9) | Số tổng hợp cấp xã | **Anh đồng ý 01/11:** tính từ Mẫu 31 (xem được chi tiết tổ) + **kiểm khớp từng xã với BCDHTD**; lệch → báo, không tự chọn nguồn (QT-C-08). Chờ trường hợp mẫu teo_ca → ✅ |
| ⏳ QT-C-20 | Gia hạn tối đa | ½ thời hạn với **trung hạn** (anh nêu); ngắn / dài hạn chờ văn bản gia hạn |
| ⏳ phần C | Mức A–D NQH · đèn tín hiệu · TK < 500 nghìn · khoanh hết hạn 120 ngày · lãi tồn chỉ so tháng trước · QT-03/04/05/14 app · kỳ con CV 597 · số lượt KH vay | Đưa vào sổ chung |

## 3. Phép thử chung (bước B4)

Bộ trường hợp **dữ liệu giả + đáp án**: `tests/chung/truong_hop_mau.json` (tên cũ `teo_ca.json`, đổi 01/11/2026) (bản 1.2 · 30/10/2026 · 20 trường hợp, 40 ý; 1.2 thêm trường hợp **nhiều kỳ** — khóa `ky_truoc`) — **nguồn duy nhất cho cả hai bên**. Cột Mẫu 31 / File Tổ trưởng ghi đúng tên cột hệ thống; kết quả so theo hợp đồng cột file đối chiếu (`KE_HOACH_KY_DOI_CHIEU.md` mục 3).

| Luật | Trường hợp | Giao ban (`chay_truong_hop_mau.py` 1.2 · `bang_so_lieu.py` 1.6) | App |
|---|---|---|---|
| QT-C-01 | C01-1 khế ước lặp 2 sổ TK 105 | ✓ 3/3 | ✓ 3/3 — 3.409 cộng sổ (`slT105Them`; TK 1 kiểm file thật: cột 105 theo từng sổ) |
| QT-C-02 | C02-1 cho vay − đảo khoản; thu nợ 3 loại | ✓ 2/2 | ✓ 2/2 |
| QT-C-03 | C03-1 lãi tồn TH + QH | ✓ 1/1 | ✓ 1/1 |
| QT-C-04 | C04-1 số tháng lãi | ✓ 1/1 | ✓ 1/1 |
| QT-C-05 | C05-1 6 điểm sát ngưỡng | ✓ 6/6 | ✓ 6/6 |
| QT-C-06 | C06-1 ĐVUT 99 → TT | ✓ 2/2 | ✓ 2/2 |
| QT-C-09 | C09-1 File Tổ trưởng khác ngày → không ghép | ✓ 1/1 | ⏳ — anh chốt 30/10: chốt / so sánh thì chặn (file đối chiếu), xem hằng ngày cho kèm ⚠ — app 3.409: xem hằng ngày ghép File Tổ trưởng gần nhất, Mẫu 31 là chính (ấp theo Mẫu 31) + ⚠ Kiểm tra kỳ / Địa bàn; 📤 file đối chiếu chặn khi khác ngày. Phép thử C09-1 đo ở dựng kỳ (đang ghép) → cần đo ở file đối chiếu |
| QT-C-10 | C10-1 món lệch ấp · C10-2 ấp 2 điểm · C10-3 điểm theo File Tổ trưởng | ✓ 6/6 | ✓ 6/6 |
| QT-C-11 | C11-1 trực tiếp theo ấp, không theo GDXA · C11-2 ấp chưa có tổ | ✓ 3/3 | ✓ 3/3 (3.407: món trực tiếp ấp chưa có tổ → mã điểm trống) |
| QT-C-12 | C12-12a trùng ngày phiên · 12b sau ngày phiên · 12c gia hạn · 12d trực tiếp · 12e tổ đổi điểm | ✓ 5/5 | ✓ 5/5 (3.407: ngày GD điểm = GDXA đa số trong Mẫu 31) |
| QT-C-17 | C17-1 đến hạn: gia hạn / HĐ, bỏ món QH, bỏ món hết nợ | ✓ 1/1 (1.4; bản 1.3 trượt — đúng như dự kiến) | ✓ 1/1 (app 3.405 đã theo cách này) |
| QT-C-21 | C21-1 tổ đóng, tổ viên sang tổ cùng ấp: kỳ trước (dư nợ, tiền gửi) theo khế ước, tổ đóng không hiện, có ở biến động · C21-2 tổ viên sang tổ ở điểm khác | ✓ 9/9 (1.6; bản 1.5 trượt 8 — đúng như dự kiến) | ✓ 7/7 ý kỳ trước + `to_khong_hien` (3.424, `t328` 38/40); `bien_dong` chờ màn biến động tổ |

Giao ban chạy: `python chay_truong_hop_mau.py` (Drive `06_CONG_CU\v2`, chép `truong_hop_mau.json` cạnh script; tên cũ `thu_teo.py`) — **40/40 đạt** ngày 31/10/2026 (teo_ca 1.2 · `bang_so_lieu.py` 1.7). App: `node tests/t328.js` (3.407, đọc cùng file, mỗi trường hợp 1 trang sạch, nạp qua đúng đường nạp của app) — bản 3.409 với teo_ca 1.1: **30/31 · C09-1 chờ** (C01-1 đạt); teo_ca 1.2 (C21 `ky_truoc`) app chưa chạy; mã giả `KU-…` / `KH-…` được phép thử ánh xạ sang dạng số hệ thống (app chỉ nhận số khế ước 10–20 số, mã KH 6–12 số). **Sửa luật / sửa script hay app → chạy lại; thêm luật chốt → thêm trường hợp vào file này.** Luật chờ chốt (K1, K4, K5, K8, K9) chưa có đáp án.

## 4. Nhật ký

| Bản | Ngày | Nội dung |
|---|---|---|
| 1.0 | 28/10/2026 | Lập sổ: QT-C-01…13 anh chốt trong phiên giao ban 28/10; QT-C-14…20 + phần C chờ chốt. |
| 1.1 | 28/10/2026 | Cột Giao ban: QT-C-09…13 đã áp ở `bang_so_lieu.py` 1.3; `tong_hop.py` chưa. |
| 1.2 (TK 1) | 30/10/2026 | Mục 3: bộ phép thử chung `tests/teo/teo_ca.json` 1.0; giao ban 30/30 đạt. |
| 1.3 (TK 1) | 30/10/2026 | Anh chốt K7 → **QT-C-17** (theo cách app 3.405); phép thử C17-1; giao ban áp ở `bang_so_lieu.py` 1.4. |
| 1.4 (TK 1) | 30/10/2026 | Giao ban: `tong_hop.py` **2.21** áp QT-C-09…13, 17 (số văn bản + Gemini). |
| 1.5 (TK 1) | 30/10/2026 | Giao ban: `bang_so_lieu.py` **1.5** — tổ không còn trên File Tổ trưởng (đóng / giải thể / gộp) xếp vào điểm hiện nay theo ấp của tổ (QT-C-10, 13): hết dòng điểm cũ toàn số 0, ± kỳ trước theo điểm đúng nghĩa, khớp `tong_hop.py` 2.21. |
| 1.6 (TK 1) | 30/10/2026 | Anh chốt: QT-C-09 chốt / so sánh phải cùng ngày (xem hằng ngày cho kèm ⚠); **QT-C-21** so sánh kỳ theo khế ước + cây chỉ tổ đang hoạt động, biến động tổ để riêng. Giao ban áp `bang_so_lieu.py` 1.6, `tong_hop.py` 2.22; phép thử 1.2 (C21-1, C21-2). |
| 1.7 (TK 2) | 31/10/2026 | Anh chốt ("chốt làm tuần tự" — duyệt A2): **QT-C-22** hai loại dữ liệu (số dư / so sánh cùng ngày · thông tin nhận dạng lấy gần nhất); **QT-C-18 (K8)** tổ trưởng theo File Tổ trưởng cùng ngày → gần nhất → Mẫu 31; **QT-C-09** ghi bản cuối "lấy như cũ nhưng Mẫu 31 vẫn là chính". |
| 1.8 (TK 1) | 31/10/2026 | Thử đối chiếu kỳ 29/10 (anh 31/10): giao ban `bang_so_lieu.py` **1.7** sửa file đối chiếu — giữ tổ đã đóng / nhóm vay trực tiếp hết dư nợ còn thu nợ, lãi tồn; mã Hội Đoàn Thanh niên ghi **ĐTN** đúng hợp đồng cột (anh chốt 31/10). Phép thử 40/40. |
| 1.9 (TK 1) | 31/10/2026 | Anh chốt **K1 → QT-C-14**: văn bản mẫu 08 dùng tổ viên còn dư nợ ("… khách hàng còn dư nợ"); tổng tổ viên (gồm tất nợ chưa ra khỏi tổ) theo app cho mẫu biểu tổ + quy mô tổ. Giao ban `tb_kl.py` 3.3, `nd_hop_m08.py` 1.10, Quy chuẩn 2.3. Cột app QT-C-21 cập nhật theo 3.424. |
| 1.10 (TK 2) | 01/11/2026 | Anh chốt (TK 2 đề xuất ý 2 — 01/11): **chốt luật = câu chữ + ≥ 1 trường hợp mẫu teo_ca + hai bên chạy đạt**; thiếu → 🔧. |
