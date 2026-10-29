# Rà soát hồi quy — bảng để anh duyệt (giữ / gộp / bỏ)

> **Lập 30/10/2026 · TK 2 · theo anh 30/10: "hồi quy ngày càng nhiều, em phải rà soát các hồi quy không cần thiết".** Chưa xóa phép nào — anh duyệt từng dòng rồi mới làm.
> Thời gian đo ở lượt hồi quy 1 luồng bản 3.406 (207 phép, **3309 giây ≈ 55 phút**; 2 luồng ≈ một nửa).

## 1. Đã làm (3.407, công cụ — không bỏ phép)
- **R1:** `tools/hoiquy_pt.py` — 5 file Số liệu / KHO / cây địa bàn (`22-so-lieu`, `22g-to`, `22ga-pham-vi`, `29-kho`, `73-kho-chuan`) ra khỏi "phần chung", chỉ là phụ thuộc của phép **có dùng số liệu** → sửa Số liệu không còn chạy lại 35 phép Scan / Văn bản / Hồ sơ / mẫu in. (174 phép thật sự gọi hàm Số liệu — không gỡ được bằng công cụ, phải giảm bằng mục 2–3.)

## 2. Đề xuất — chờ anh duyệt

| # | Nhóm | Phép | Tốn | Đề xuất |
|---|---|---|---|---|
| D1 | **Không có câu kiểm** (chỉ in số, luôn "đạt") | t105, t102, t104, t100, t103, t276, t101 | 253 giây | Thêm câu kiểm thật cho phần còn giá trị (đọc Mẫu 31, Tra cứu, Nợ quá hạn…) **hoặc bỏ** nếu đã có phép khác kiểm (nhiều phần đã có ở t1xx sau) |
| D2 | **Bộ dữ liệu lớn `gia31`** (25.000 dòng) | 36 phép | 1279 giây | **R3:** chuyển sang `gianho31` (300 dòng) — trừ phép cần đo số lớn / tốc độ (giữ 2–3 phép đại diện). Dự kiến bớt 60–70% thời gian nhóm này |
| D3 | Phép cũ t87–t99 (chờ anh từ 25/10) | đã không còn trong `tests/` | — | Không còn việc — gạch khỏi danh sách chờ |
| D4 | **Gộp phép trùng** (cùng nạp bộ giả, kiểm cùng màn) | rà tay ở lượt sau, ghi bổ sung bảng này | — | Gộp thành 1 phép / màn |
| D5 | **Lịch chạy** (R4) | — | — | Mỗi bản: hồi quy theo đổi; hồi quy đủ trước bản lớn / cuối tuần; 2 luồng (1 luồng khi máy yếu) |

## 3. Toàn bộ phép thử theo thời gian chạy (giảm dần)

| Phép | Giây | Số câu kiểm | gia31 | Kiểm gì (dòng đầu phép thử) | Đề xuất |
|---|---|---|---|---|---|
| t181 | 113 | 4 |  | 3.223 (anh chốt 16/10, QUY_CHUAN mục 9.3): CHỒNG KHÍT — mẫu trên nền ô: 📄 bản trắng · 🖨 bản thật có số liệu ·  | giữ |
| t105 | 105 | 0 | ✓ | 3.90 — 7 file chuẩn TW (BCDHTD 01.1 / 01.2 · B32 · LEN_31 × 4): đọc, kỳ tháng / ngày, kiểm tra chéo với Mẫu 31 | D1 — thêm câu kiểm / bỏ |
| t260 | 91 | 3 |  | t260 (TK 3, 24/10 — RA_SOAT_BO_CUC_2410 mục 8 việc 1): PHÉP THỬ ẢNH BỐ CỤC — mở từng tab ở 2 cỡ màn máy tính ( | giữ |
| t128 | 80 | 41 | ✓ | 3.128 — (C) bộ in chuẩn: chia trang A4, số trang, 2 mặt, khung xem (đếm trang PDF thật). | D2 — chuyển gianho31 |
| t102 | 66 | 0 | ✓ | 3.88 — tab Số liệu: luồng theo tháng (file của tháng, ② Kiểm tra lưu kết quả, dữ liệu đổi → báo kiểm lại, bảng | D1 — thêm câu kiểm / bỏ |
| t130 | 59 | 29 | ✓ | 3.136 — Số liệu theo NGÀY: mọi loại nạp được theo ngày; kỳ ngày lấy bảng đúng ngày, thiếu thì bảng liền trước  | D2 — chuyển gianho31 |
| t127 | 53 | 14 | ✓ | 3.125 — giữ sẵn số liệu nhiều tháng trong phiên: nạp ngầm (mới nhất trước), chuyển tháng không nạp lại, bỏ thá | D2 — chuyển gianho31 |
| t123 | 47 | 19 | ✓ | 3.120 — Nạp số liệu: dòng riêng "Dư nợ chi tiết" (chỉ tham chiếu số TK 105 + điểm GD xã; Mẫu 31 là số liệu chí | D2 — chuyển gianho31 |
| t124 | 43 | 10 | ✓ | 3.121 — Đối chiếu Mẫu 31 ↔ Dư nợ chi tiết cùng kỳ: tổng (món, khách, dư nợ, số dư 105), danh sách món lệch, cộ | D2 — chuyển gianho31 |
| t131 | 41 | 26 | ✓ | 3.138 — ⟳ Làm mới cạnh ô Số liệu + chip kỳ đang dùng; TK 105 "đã mở TK"; KU hủy / nhập nhầm tổ (CLOSE + giải n | D2 — chuyển gianho31 |
| t205 | 41 | 35 |  | 3.259–3.263 — 📒 Sao kê › Thông tin tổ (3.263: Bộ thông tin tổ → THHD 1 trang theo cấp): KQGD từng điểm GD (Mẫu | giữ |
| t106 | 40 | 62 | ✓ | 3.93 — tab con 🛡 KTGS Hội: đọc BC0437 / BC0438 GIẢ (dựng trong trang từ Mẫu 31 giả), xếp loại theo công thức k | D2 — chuyển gianho31 |
| t236 | 39 | 25 |  | 3.323 (anh 23/10): Kiểm tra đột xuất — đơn vị kiểm tra (Mẫu 06 + 16, cả "ĐOÀN KIỂM TRA") chọn: theo Hội · chấm | giữ |
| t110 | 38 | 39 | ✓ | 3.97 — KTGS: 🗓 kiểm tra định kỳ theo lịch (Mẫu 06 + 16, số liệu cuối tháng trước → tháng kiểm tra, ngày trống, | D2 — chuyển gianho31 |
| t272 | 36 | 13 |  | t272 (TK 3, 3.378 — anh 26/10 "nhận xét, tồn tại, kiến nghị cho chọn 3 phần riêng, tự ghi theo số liệu hay để  | giữ |
| t129 | 34 | 17 | ✓ | 3.134 — Mẫu 06: mục đích cùng cỡ 8 pt, cột đúng / sai mục đích hẹp lại + Hiệu quả đầu tư rộng ra, tên Hội khôn | D2 — chuyển gianho31 |
| t104 | 33 | 0 | ✓ | 3.89 — bộ chọn phạm vi chung · Tra cứu KH (phạm vi, kiểm trùng CCCD / CMND HSSV, tìm tên khách / vợ-chồng / HS | D1 — thêm câu kiểm / bỏ |
| t108 | 32 | 25 | ✓ | 3.95 — tab con 🛡 KTGS Hội: 📋 Mẫu 04/BC-TH (Báo cáo tổng hợp kết quả kiểm tra) + ⚙ Khai báo Hội. | D2 — chuyển gianho31 |
| t100 | 31 | 0 | ✓ | 3.86 — Mẫu 31 (175 cột, GIẢ: tests/gia31 = taogia.py 25000 tests/gia31 m31): nhận đúng loại, gộp khế ước trùng | D1 — thêm câu kiểm / bỏ |
| t109 | 31 | 24 | ✓ | 3.96 — tab con 🛡 KTGS Hội: 🗓 Kế hoạch KTGS năm của Hội cấp xã (01/KH) — khuôn dự thảo HĐT cấp xã (căn cứ 727,  | D2 — chuyển gianho31 |
| t193 | 30 | 20 |  | 3.231 (anh duyệt 17/10) — BẢN ĐIỆN THOẠI: gói số liệu xem (máy tính) · tự chuyển trên điện thoại · PIN + mã hó | giữ |
| t107 | 29 | 21 | ✓ | 3.94 — 👤 Tra cứu KH gọn: danh sách 2 dòng (điện thoại 50 dòng + Xem thêm), thẻ chia nhóm (số tóm tắt, nhân thâ | D2 — chuyển gianho31 |
| t111 | 28 | 86 | ✓ | 3.98–3.103 — HSSV cửa sổ nổi 3 mức + nền sáng/tối (3.103) · HSSV cửa sổ nổi 📌 (3.102) · HSSV tiền vay theo năm | D2 — chuyển gianho31 |
| t113 | 28 | 35 | ✓ | 3.108 — Danh sách tổ TK&VV (DSTO): đọc (vùng dữ liệu khai sai, dòng tên cột phụ, chữ ký), bổ sung tổ thiếu tro | D2 — chuyển gianho31 |
| t121 | 28 | 19 | ✓ | 3.117 — Mẫu 06 phân trang: 1–3 hộ gọn 1 mặt; nhiều hộ thì không cắt đôi hộ, hộ cuối đi cùng dòng Cộng + nhận x | D2 — chuyển gianho31 |
| t125 | 28 | 54 | ✓ | 3.123 — Phân công BTV: tích người phân công, khuyết Chủ tịch (Phó đôn lên) / khuyết Phó (CT kiêm), người ký, ô | D2 — chuyển gianho31 |
| t134 | 28 | 31 | ✓ | 3.140 — Kế hoạch: thứ tự ấp (điểm GD → mã thôn → tên, sắp lại ▲▼, về mặc định); mỗi tháng TRỌN ẤP; đổi tháng c | D2 — chuyển gianho31 |
| t318 | 28 | 10 |  | 3.397 (anh 28/10 duyệt demo D1–D4 KTGS "em làm luôn") — js/78-ktgs-gon.js (cắm rút, chỉ sắp xếp lại phần đã vẽ | giữ |
| t112 | 27 | 22 | ✓ | 3.107 — xếp tổ / món vay trực tiếp vào điểm GD khi file Thông tin tổ trưởng thiếu tổ · dòng báo vàng ở KTGS Hộ | D2 — chuyển gianho31 |
| t119 | 27 | 22 | ✓ | 3.114 — Hộp chọn khi in (Mẫu 06 / 16 / 04 / Kế hoạch): người kiểm tra / người ký theo vai trò, nhớ lựa chọn, Đ | D2 — chuyển gianho31 |
| t126 | 27 | 18 | ✓ | 3.124 — dòng chấm mịn (cỡ ≈ 65%, đủ dài như cũ) cho Word + bản In mọi mẫu KTGS; in 2 mặt khi xuất nhiều bản | D2 — chuyển gianho31 |
| t137 | 27 | 8 | ✓ | 3.141 — Kế hoạch › In theo tháng kiểm tra TỰ LẤY số liệu cuối tháng liền trước (Mẫu 31 + BC0437 đã nạp), không | D2 — chuyển gianho31 |
| t179 | 27 | 5 |  | 3.223 M0 (anh chốt 16/10, QUY_CHUAN mục 9): CHUẨN KHÓA — bản in MỌI mẫu so TỪNG KÝ TỰ với tests/chuan/*.html. | giữ |
| t132 | 26 | 24 | ✓ | 3.138 — In ấn: Mẫu 06 (chấm nhạt, kẻ dòng hộ mảnh, tiêu đề cỡ 11, ngày lên dòng chấm Biện pháp, chỗ ký, mẫu tr | D2 — chuyển gianho31 |
| t135 | 26 | 16 | ✓ | 3.140.1 — Mẫu 06 số tiền: 2 số lẻ (nợ lãi dưới 5.000 đ giữ 3 số lẻ), ô số tiền canh phải + lề ô hẹp, cỡ chữ tự | D2 — chuyển gianho31 |
| t154 | 26 | 17 | ✓ | 3.158 — Khai báo Hội vừa 1 trang (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): bỏ cột Xã (dòng nhóm  | D2 — chuyển gianho31 |
| t227 | 26 | 14 |  | 3.306 — chữ ký / lăn tay (anh 21/10): nhận dạng chữ ký · lăn tay · ảnh CCCD · ảnh trắng; lưu chữ ký là ảnh CCC | giữ |
| t122 | 25 | 27 | ✓ | 3.118 — Rà mẫu chung (06 / 16 / 04): "Chức vụ:" có hai chấm, chữ sau dòng chấm cách 1 khoảng, đơn vị dài xuống | D2 — chuyển gianho31 |
| t167 | 25 | 85 |  | 3.174 (anh chốt 12/10) — tab 🏢 Giao dịch xã CÓ SỐ LIỆU (bộ GIẢ tests/gianho31): cây địa bàn theo Mẫu 31 (khối  | giữ |
| t114 | 24 | 19 | ✓ | 3.109 — Mẫu 04 / Mẫu 16: ngày tháng theo tháng kiểm tra, III. Nội dung kiểm tra ghi sẵn (727), nhận xét có lãi | D2 — chuyển gianho31 |
| t116 | 24 | 8 | ✓ | 3.112 — Kế hoạch KTGS: chọn căn cứ 727 (mặc định) hoặc hướng dẫn cũ 10566 (kế hoạch lập trước 727), áp cả khuô | D2 — chuyển gianho31 |
| t118 | 24 | 22 | ✓ | 3.113 — 🏛 Khai báo Hội đoàn thể: 1 nơi khai cho Mẫu 06 / 16TD / 04 / Kế hoạch (thẻ Hội – xã + tab nhỏ Chuẩn hó | D2 — chuyển gianho31 |
| t120 | 24 | 13 | ✓ | 3.115 — Mẫu 06: dòng Thời điểm · Địa bàn · Tổ không rớt dòng (thu khoảng cách, bỏ tỉnh, viết tắt KP / P. / X.) | D2 — chuyển gianho31 |
| t133 | 24 | 10 | ✓ | 3.139 — Tab Tổ TK&VV › báo cáo "Dự kiến chia tách tổ" (A4 ngang, tối đa 2 trang, mỗi hộ 1 dòng theo mã KH, cột | D2 — chuyển gianho31 |
| t196 | 24 | 22 |  | 3.234 (R2 chuẩn hóa — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): bộ nhận lệnh data-lenh · mảnh giao diện (ô rộng theo | giữ |
| t115 | 23 | 21 | ✓ | 3.111 — Mẫu 06 theo mẫu gốc (tên hoa đầu từ, dòng đầu Thời điểm · Địa bàn · Tổ, Đơn vị tính dòng riêng, cột ti | D2 — chuyển gianho31 |
| t150 | 23 | 23 | ✓ | 3.154 — Khai báo Hội = 1 bảng như Excel (anh chốt ý 8 — docs/KE_HOACH_GON_GIAO_DIEN.md): 1 Hội = 1 CT, 1 PCT,  | D2 — chuyển gianho31 |
| t263 | 23 | 17 |  | t263 (TK 3, 3.343 — KE_HOACH_DIEN_THOAI_2 bước Đ1; anh 24/10 "tra cứu KH của TK 2 đang làm rất ổn, em dựa vào  | giữ |
| t185 | 22 | 18 |  | 3.223 M8 (anh chốt 16/10) — LƯU THEO NGĂN (IndexedDB 'tuhoso_ngan'): lần đầu chép từ localStorage + giữ bản cũ | giữ |
| t262 | 22 | 17 |  | t262 (TK 3, 3.342 — KE_HOACH_DIEN_THOAI_2 bước Đ0, anh chốt 24/10): bản điện thoại tạm bỏ PIN (mở thẳng, không | giữ |
| t313 | 22 | 6 |  | 3.391 (BAN_GIAO_TK3_2710 mục 3.2 phần còn — anh 27/10 "khi hiện báo cáo nên tối ưu để hiện trong 1 khung, in t | giữ |
| t176 | 21 | 29 |  | 3.215 (anh 15/10) — KHAI BÁO RIÊNG từng mẫu Hồ sơ vay (đợt 1: 01/TD · 03/TD · 01/UQ): ô tùy biến liệt kê từ tr | giữ |
| t180 | 21 | 3 |  | 3.223 M0 (anh chốt 16/10, QUY_CHUAN mục 9): CHUẨN GỐC — bản in TRẮNG của app so với file Word anh gửi (tests/m | giữ |
| t312 | 21 | 11 |  | 3.390 (BAN_GIAO_TK3_2710 mục 3.1, anh duyệt hướng 27/10): bộ lọc chuẩn giống hệt mọi tab Số liệu — | giữ |
| hoiquy2 | 20 | 11 |  | Mục 13 bàn giao: có thư viện thật, thêm file vào từng tab, đi 6 tab ở máy tính và iPhone | giữ |
| t195 | 20 | 7 |  | 3.233 — BẢN ĐIỆN THOẠI phần 3: 🏢 Giao dịch xã (máy tính đẩy kèm bản mini 04/TD · 12/GDX · Giấy lĩnh theo kỳ mớ | giữ |
| t200 | 20 | 23 |  | 3.242 (anh 17/10, ý 1–19): FORM LẬP 01/TD theo thứ tự tờ giấy — gõ người vay mới (Tab / Enter đi ô kế, ngày li | giữ |
| t241 | 20 | 17 |  | 3.328 (anh chốt 23/10) — cây địa bàn dùng chung: mặc định kiểu ☰ Gọn mọi nơi (1 dòng ô sổ xuống Xã › Điểm › Hộ | giữ |
| t143 | 19 | 16 |  | 3.147 — Thanh bên điều hướng (đợt F, anh duyệt 10/10/2026): máy tính ≥ 1100 px có thanh bên, ẩn thanh tab ngan | giữ |
| t308 | 19 | 3 |  | 3.366 (KE_HOACH_DIEN_THOAI_MAY Đ5) — khung xem trước bản in: điện thoại — thanh 1 hàng vuốt ngang, nút ≥ 34 px | giữ |
| t163 | 18 | 24 |  | 3.170 (anh chốt 11/10) — 2 tab con mới của Số liệu: 📝 Hồ sơ Tổ (10C cũ / mới, 10A, 10B, 11/TD, 01/BG, 02/BG) · | giữ |
| t264 | 18 | 12 |  | t264 (TK 3, 3.344 — KE_HOACH_DIEN_THOAI_2 bước Đ2; 3.374 anh 26/10 "chỉ xem khi có mạng" → bỏ 📌 ghim): Văn bản | giữ |
| t311 | 18 | 8 |  | 3.372 (KE_HOACH_DIEN_THOAI_MAY Đ6, anh 25/10: "Hôm nay, Văn bản, Tra cứu KH là 3 tab chính", ô 4 = Scan) — bản | giữ |
| t164 | 17 | 23 |  | 3.171 (anh chốt 11/10) — mẫu bám sát PDF anh gửi: kẻ mảnh dưới tiêu ngữ (không gạch chân), logo khai báo 1 lần | giữ |
| t201 | 17 | 15 |  | 3.252 (anh 17–18/10, ý 15 — "triển khai hết các mẫu khai báo riêng 1 lần"): KHAI BÁO RIÊNG mọi mẫu nền ô — chỉ | giữ |
| t265 | 17 | 19 |  | t265 (TK 3, 3.354 — anh 24/10: "tối ưu tab hôm nay bao gồm lịch và ghi chú trước"; "giao diện tương tự máy tín | giữ |
| t315 | 17 | 5 |  | 3.394 (BAN_GIAO_TK3_2710 mục 3.3 "Tổ TK&VV: chip DS · Nợ · TK · Chia tách lên hàng thao tác"): báo cáo của tab | giữ |
| t158 | 16 | 22 |  | 3.163 (anh chốt 11/10) — Nạp & KT: dải lịch ●◐○ + ⦿ Gần nhất, cột từng ngày có dữ liệu (mới nhất bên phải) + c | giữ |
| t228 | 16 | 7 |  | 3.307 — chế độ lọc cho bản photo (anh 21/10: "xám hay trắng vẫn chưa đạt, magic cũng vậy"): thẻ giả → giả lập  | giữ |
| t253 | 16 | 35 |  | 3.289 P3 🎯 BIỂU 07 PHÂN BỔ KH — mẫu js/mau/07pb.js + hộp xem trước (js/48) trên trình duyệt, bộ GIẢ tests/gian | giữ |
| t266 | 15 | 7 |  | t266 (TK 3, 3.367 — anh 25/10): ① "mã điểm giao dịch ghi đầy đủ có TXN" — tab Giao dịch xã, mẫu 12/GDX, bản mi | giữ |
| t269 | 15 | 8 |  | t269 (TK 3, 3.373 — RA_SOAT_BO_CUC_2510 Đợt A ① ② ③ ⑥, anh 26/10 "gom làm 1 lần"): js/69-bo-cuc-a.js (cắm rút) | giữ |
| t155 | 14 | 10 |  | 3.159 — Chân thanh bên + chế độ tối (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): | giữ |
| t168 | 14 | 32 |  | 3.177 (anh chốt 13/10) — 📦 MINI APP Giao dịch xã: xuất 1 file HTML từ app (bộ GIẢ tests/gianho31 + TK 104 giả) | giữ |
| t170 | 14 | 22 |  | 3.206 (anh chốt 14/10) — cây địa bàn ▾ Mở rộng / ▴ Thu gọn mọi tab (gọn 1 dòng, bấm mắt đường dẫn về cấp trên) | giữ |
| t199 | 14 | 17 |  | 3.240 (anh 17/10, đối chiếu 2 file 01/TD anh gửi): bảng đối tượng đúng số dòng có số liệu, chữ dài xuống dòng  | giữ |
| t204 | 14 | 12 |  | 3.257 (anh 18/10 "rà soát lại form của mẫu nào không lọt mẫu khác, ví dụ trong mẫu 01TG mà có GQVL là không đú | giữ |
| t209 | 14 | 17 |  | 3.269 — đọc CCCD ảnh cả tờ (2 thẻ trên 1 trang), thẻ Căn cước mẫu mới (QR mặt sau, nội dung khác mẫu), đọc lại | giữ |
| t210 | 14 | 15 |  | 3.271 — CCCD lưu 3 file lên Drive (PDF + Mặt trước.jpg + Mặt sau.jpg, chung thư mục), đổi tên / dời / thùng rá | giữ |
| t212 | 14 | 16 |  | 3.273 — 🪪 Quét CCCD điền form: nút cạnh Họ tên (Sổ hộ vay mỗi người · 01/TD người vay), ảnh có sẵn (QR giả) →  | giữ |
| t217 | 14 | 21 |  | 3.280 — CCCD cũ chỉ có PDF (không ảnh trong máy, không ảnh trên Drive): mở xem → tự tách 2 mặt thẻ, hiện 2 mặt | giữ |
| t234 | 14 | 20 |  | 3.315 (anh 22/10): 01/TGTV in bằng 2 cách — 📊 lấy từ Mẫu 31 (tổ viên, tích in hàng loạt, in lại cả người đã có | giữ |
| t304 | 14 | 4 |  | 3.362 (KE_HOACH_DIEN_THOAI_MAY Đ2) — bản máy tính trên điện thoại: thẻ khách món vay thành thẻ dọc (CSS, có nh | giữ |
| t307 | 14 | 3 |  | 3.365 (KE_HOACH_DIEN_THOAI_MAY Đ4) — Số liệu › Tổ TK&VV: bảng vuốt ngang, ô tiêu đề góc (cột tên đứng yên) nằm | giữ |
| t317 | 14 | 12 |  | 3.396 (anh 28/10, ảnh Tra cứu KH › Tìm theo Tổ trưởng: "làm bộ lọc và sắp xếp của các cột này") — js/77-bang-l | giữ |
| t319 | 14 | 14 |  | 3.398 (anh 28/10): ① Kế hoạch năm — 📌 Chốt (ngày chốt + khóa), ✏ Sửa (mở khóa, Định kỳ / Mẫu 04 vẫn dùng bản c | giữ |
| t117 | 13 | 10 |  | 3.113 — Đồng bộ TOÀN BỘ cài đặt qua Drive (cauhinh.json): 2 máy giả (A, B) dùng chung Drive giả. | giữ |
| t173 | 13 | 19 |  | 3.209 (anh 14/10) — SỔ HỘ VAY: lấy từ Mẫu 31 (mã KH, SĐT, tên vợ/chồng), hộ mới (tổ, nhiều HSSV), trùng CCCD,  | giữ |
| t192 | 13 | 6 |  | 3.230 (R1 chuẩn hóa — KE_HOACH_CHUAN_HOA): "Có gì mới" ≤ 15 dòng + link CHANGELOG · hàm mồ côi đã dọn không cò | giữ |
| t303 | 13 | 6 |  | 3.361 (KE_HOACH_DIEN_THOAI_MAY Đ1) — bản máy tính trên điện thoại: css/dt-may.css chỉ nạp ở màn ≤ 600 px (cắm  | giữ |
| t314 | 13 | 7 |  | 3.392 (BAN_GIAO_TK3_2710 mục 6 — cắm rút): báo cáo Sao kê dạng danh sách tách sang js/76-sk-danh-sach.js (SK_B | giữ |
| t157 | 12 | 20 |  | 3.161 — Tab Tổ (anh chốt 11/10): chip gom 3 nhóm Xem · Khách · Cần xử lý (tối đa 2 dòng), nút In / Excel / ⚙ C | giữ |
| t189 | 12 | 28 |  | 3.227 (anh 17/10) — 📒 Sổ hộ vay gộp tab 👪 Hộ vay: lọc theo khối LỌC ĐỊA BÀN (Xã › Điểm · Hội › Tổ), ngày nhập  | giữ |
| t194 | 12 | 8 |  | 3.232 — BẢN ĐIỆN THOẠI phần 2: 📄 Văn bản · 📷 Scan (danh sách theo khối Drive, lọc không dấu, mở file → bảng nú | giữ |
| t202 | 12 | 11 |  | 3.253 (anh chốt 17–18/10, ý 12–14): MẪU 06/TD trong Hồ sơ vay — gọi hàm Mẫu 06 KTGS (khóa mẫu); hộ chung danh  | giữ |
| t245 | 12 | 15 |  | 3.334 (RA_SOAT_BO_CUC_2410 Đợt 1) — bố cục máy tính: dải chip mẫu cuộn ngang + nút ‹ ›, 📅 Số liệu / ⚙ Khai báo | giữ |
| t246 | 12 | 38 |  | 3.335 (anh 24/10 — tham khảo app "Truy vấn thông tin") — Tra cứu KH: ô tìm + LỌC ĐỊA BÀN dải ngang toàn trang; | giữ |
| t247 | 12 | 12 |  | 3.337 (anh 24/10) — Tra cứu KH: thẻ khách gọn trong 1 khung (3 cột Nhân thân │ Liên hệ · TK 105 │ Tổ, món vay  | giữ |
| t147 | 11 | 26 |  | 3.151 — Thanh lọc chung tab file (anh chốt ý 6a, 9, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md): | giữ |
| t153 | 11 | 18 |  | 3.157 — Khung xem bên phải + 2 kiểu lọc (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): | giữ |
| t162 | 11 | 5 |  | 3.167 (anh chốt 11/10) — KHỐI LỌC ĐỊA BÀN đồng bộ mọi tab: khung "LỌC ĐỊA BÀN", mỗi dòng 1 thanh, Điểm GD và H | giữ |
| t175 | 11 | 23 |  | 3.214 (anh 15/10) — Sổ hộ vay: form nhập dạng lưới có tiêu đề cột (Enter / Tab sang ô, không mất con trỏ, Lưu  | giữ |
| t178 | 11 | 22 |  | 3.222 (anh 16/10, phương án B + bổ sung 1–3) — ⚙ KHAI BÁO ĐƠN VỊ dùng chung mọi tab; bố cục A cột trái Hồ sơ v | giữ |
| t243 | 11 | 19 |  | 3.328 (anh chốt 23/10) — thanh bên 2 cấp (sổ lối vào DH_MUC + nhóm DH_NHOM) · Giao dịch xã = bàn thao tác gọi  | giữ |
| t323 | 11 | 11 |  | 3.403 (anh 29/10: CCCD đã lưu dạng PDF — thẻ nhỏ giữa trang trắng — "nhận biết và cắt được luôn"): js/81 (cắm  | giữ |
| t144 | 10 | 14 |  | 3.148 — Nút & trạng thái (anh chốt ý 10, 12, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md): | giữ |
| t145 | 10 | 12 |  | 3.149 — Kỳ + phạm vi CHUNG (anh chốt ý 6b, 6c — docs/KE_HOACH_GON_GIAO_DIEN.md): | giữ |
| t148 | 10 | 16 |  | 3.152 — Xuất chung (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): mọi khung xem báo cáo cùng 1 hàng nút,  | giữ |
| t156 | 10 | 12 |  | 3.160 + 3.162 — Lọc số liệu chung 5 tab (anh chốt 11/10): hàng 1 = Xã (luôn hiện, đang chọn xanh) + 📍 đường dẫ | giữ |
| t172 | 10 | 20 |  | 3.208 (anh chốt 14/10) — KHAI BÁO CHUNG (tab con PGD · Trưởng ấp · Tổ phó · Chương trình vay) + THẺ CHƯƠNG TRÌ | giữ |
| t174 | 10 | 18 |  | 3.211 (anh chốt 14/10) — GQVL: thẻ dạng riêng, 01/GQVL (mẫu mới VB 4039), 07b/GQVL hợp đồng; lịch trả gốc 24 t | giữ |
| t184 | 10 | 26 |  | 3.223 M3 (anh chốt 16/10) — NỀN Ô MẪU (js/31-o-mau.js) trên 01/TD: 3 kiểu in (📄 trắng · 🖨 thật · 📝 mẫu + mức đ | giữ |
| t218 | 10 | 9 |  | 3.285 — 🪪 Đọc số CCCD cạnh 🔎 Tra Mẫu 31 (tab Scan): tài liệu → đọc chữ số trên trang, tìm số CCCD → điền + tự  | giữ |
| t219 | 10 | 8 |  | 3.287 — Ctrl+V file: tab Văn bản → văn bản; tab Scan → ảnh CCCD vào hàng quét (chế độ Thẻ); hộp 🪪 Quét CCCD đa | giữ |
| t225 | 10 | 8 |  | 3.300 — tối ưu tốc độ + đồng hồ: bộ đọc chữ dùng lại 1 lần khởi động; ảnh đã cắt đúng 1 thẻ không đọc 4 mảnh;  | giữ |
| t230 | 10 | 14 |  | 3.310 (anh 21/10): 07b giữ nguyên mẫu chuẩn; lịch trả gốc tự phân kỳ (≤ 60 tháng: 24 tháng/lần, vay/3 làm tròn | giữ |
| t231 | 10 | 3 |  | 3.311 (anh 21/10): công cụ 🎓 Hạn trả HSSV trên màn thấp (17 inch ~1366×650, laptop 125% ~1536×730) — lịch thán | giữ |
| t238 | 10 | 16 |  | 3.330 (KE_HOACH_KTGS_GON bước 3–4): thanh 3 khối 📅 Bắt buộc · 🎯 Đột xuất · ⚙ Khai báo (thay 6 chip), màn 🧩 Bộ  | giữ |
| t244 | 10 | 19 |  | 3.333 (anh chốt 23–24/10) — QT-18 thành viên chuẩn (KHO.tvChuan) · Tra cứu KH khung cố định + khối Tổ & địa bà | giữ |
| t258 | 10 | 9 |  | 3.348 (RA_SOAT_BO_CUC_2410 mục 8 việc 6) — 📜 Nhật ký đã lập / in: hàng nút xuất chung ghi dòng (mẫu, cách, khá | giữ |
| t152 | 9 | 19 |  | 3.156 — Tab Nạp & KT gọn 2 (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): | giữ |
| t171 | 9 | 12 |  | 3.207 (anh yêu cầu 14/10) — 🏠 HỘ VAY MỚI: form nhập nhanh (ngày gõ liền số), suy giới tính / năm sinh theo CCC | giữ |
| t191 | 9 | 16 |  | 3.229 (anh 17/10) — Khai báo riêng 4 nguồn từng mẫu: ✍ Ghi tay · 📊 Mẫu 31 · ⚙ Khai báo chung · ⌨ Tự gõ (nhớ ri | giữ |
| t203 | 9 | 7 |  | 3.256 (anh chốt 17/10 ý 10.3, "code tiếp" 18/10): GIẤY ỦY QUYỀN 01/UQ chọn hộ từ 📒 Sổ hộ vay — form theo thứ t | giữ |
| t229 | 9 | 9 |  | 3.309 — gọn tab Scan (anh 21/10): menu ⋯ bỏ "Chế độ quét", "📷 Webcam", "📁 Chữ ký · CCCD"; điện thoại bỏ Thẻ /  | giữ |
| t242 | 9 | 10 |  | 3.328 (anh chốt 23/10) — cây địa bàn nhúng dùng chung CAY (js/57): 4 nơi chọn địa bàn trong form / hộp khai bá | giữ |
| t259 | 9 | 29 |  | 3.355 (KE_HOACH_DANG_KY đợt N1) — nền báo cáo bảng DANG_KY: nút ở tab Sao kê, báo cáo mẫu "Danh sách nợ cần xử | giữ |
| t267 | 9 | 5 |  | t267 (TK 3, 3.371 — PHOI_HOP mục 6 G3, anh 25/10 "làm tiếp văn bản và scan"): tab Văn bản + Scan của bản máy t | giữ |
| t277 | 9 | 16 |  | t277 (TK 3, 3.383 — anh 26/10): bộ lọc địa bàn chung — thêm Ấp / KP, lọc đa chiều (Xã + Hội, Xã + Ấp, Hội toàn | giữ |
| t103 | 8 | 0 |  | 3.88.1 — tab con Tổ TK&VV trên máy thứ 2: bảng số liệu chưa tải (Drive hết phiên) → cây tổ dựng tạm từ danh bạ | D1 — thêm câu kiểm / bỏ |
| t140 | 8 | 17 |  | 3.144 — Sắp lại tab (anh chốt Q5, Q12, Q13, Q15): | giữ |
| t165 | 8 | 54 |  | 3.172 → 3.174 (anh chốt 12/10) — tab 🏢 Giao dịch xã KHI CHƯA CÓ SỐ LIỆU (điểm GD theo Cài đặt › Địa bàn): 04/T | giữ |
| t183 | 8 | 15 |  | 3.223 M2 (anh chốt 16/10) — SỔ HỘ VAY ĐỦ CỘT: ➕ Thông tin thêm mỗi người (giới tính, dân tộc, nghề nghiệp, thu | giữ |
| t187 | 8 | 11 |  | 3.225 (anh chốt 17/10) — ĐỒNG BỘ DRIVE THEO KHỐI: _Hệ thống/khoi/<khối>__<lô>.json; 3 máy giả lập + Drive giả  | giữ |
| t188 | 8 | 13 |  | 3.226 — CÀI ĐẶT THEO KHỐI: _Hệ thống/caidat/<khối>.json (chia chính cơ chế cauhinh.json, luật gộp theo khóa gi | giữ |
| t190 | 8 | 42 |  | 3.228 (anh 17/10) — 🔎 Kiểm tra hộ vay (khai báo được: bật / tắt · mức · ngưỡng): tuổi, CCCD, trùng (sổ + Mẫu 3 | giữ |
| t207 | 8 | 38 |  | 3.264 — 🗂 Lưu scan tập trung · 🧹 Sắp xếp · 📊 Kiểm tra · 📇 đọc CCCD (QR giả / 3 dòng mã máy đọc giả) · bản phot | giữ |
| t208 | 8 | 28 |  | 3.268 — 🔎 Rà CCCD đã lưu: đúng khách (QR giả), sai khách → đổi + ảnh khách đi theo, CMND cũ, lệch số, không ph | giữ |
| t214 | 8 | 14 |  | 3.275 — 🔎 Tra Mẫu 31 cạnh ô tên (tab Scan): hộp Sửa bản quét · Lưu mới (Tên file) · Chữ ký / Ảnh; gõ CCCD / mã | giữ |
| t252 | 8 | 21 |  | 3.288 P2 🎯 PHÂN BỔ KH — giao diện tab con (js/48-phan-bo-gd.js) trên trình duyệt, bộ GIẢ tests/gianho31 (taogi | giữ |
| t256 | 8 | 17 |  | 3.308 🎯 PHÂN BỔ KH — điều hướng + sửa lỗi rà soát (anh 21/10): thanh tab ngang 4 mục (nhớ mục, phím 1 – 4, số  | giữ |
| t139 | 7 | 15 |  | 3.143 (Q14) — ngày số liệu lấy từ NỘI DUNG file; file không ghi ngày → anh khai khi nạp, tên file chỉ là gợi ý | giữ |
| t159 | 7 | 13 |  | 3.164 (anh chốt, BAN_GIAO_3161.md §2.1) — Tab Tổng hợp: sửa lọc "Theo nguồn vốn" tới Điểm GD / Hội / Tổ (pvLoc | giữ |
| t186 | 7 | 13 |  | 3.224 (anh chốt 17/10) — QUY TRÌNH SCAN MỚI: ① chọn loại (CCCD / Tài liệu / Chữ ký / Ảnh khách) — loại quyết đ | giữ |
| t224 | 7 | 6 |  | 3.297 (bước 3 kế hoạch tên + lưu) — tài liệu là mẫu hồ sơ vay → thư mục Hồ sơ vay, tên chuẩn; hộ mới khóa số C | giữ |
| t249 | 7 | 7 |  | 3.340 (anh duyệt 24/10, RA_SOAT_BO_CUC_2410 mục 8 việc 5): dữ liệu > 1 MB → thôi ghi bản sao localStorage mỗi  | giữ |
| t255 | 7 | 23 |  | 3.301 📈 DIỄN BIẾN PHÂN VỐN THEO KH (anh 21/10) — pbDienBien (js/47) + màn thẻ số / biểu đồ SVG / dòng thời gia | giữ |
| t268 | 7 | 6 |  | t268 (TK 3, 3.373 — anh 26/10 "báo chưa nối được drive gì tùm lum rối quá", "điện thoại và máy tính phải thống | giữ |
| t276 | 7 | 0 |  | t276 (TK 3, 3.382 — anh 26/10 "mọi truy vấn lấy qua kho"): BẢN CHỤP KẾT QUẢ các báo cáo Sao kê (mọi báo cáo),  | D1 — thêm câu kiểm / bỏ |
| t278 | 7 | 9 |  | t278 (TK 3, 3.383.7 — anh 27/10): bộ lọc địa bàn — đổi cấp cao → cấp thấp về Tất cả (Điểm GD · Hội · Ấp ngang  | giữ |
| t302 | 7 | 11 |  | 3.359 (KE_HOACH_CHOT_SO đợt C3) — 📅 dòng thời gian khách / tổ trong năm: tóm Mẫu 31 từng tháng (qua KHO), sự k | giữ |
| t306 | 7 | 5 |  | 3.364 (KE_HOACH_DIEN_THOAI_MAY Đ3) — bản máy tính trên điện thoại, tab Hôm nay gọn 1 cột: ô lịch thấp, sổ ngày | giữ |
| t316 | 7 | 7 |  | 3.395 (anh 28/10, ảnh: quét CCCD người mới, bấm 🪪 Đọc số CCCD ra số thẻ quét trước — mặt sau thẻ cũ còn sót tr | giữ |
| t136 | 6 | 6 |  | 3.140.4 — Lỗi mất cài đặt 09/10: máy bị trống cài đặt → đồng bộ với file cauhinh.json ở thư mục khác ("undefin | giữ |
| t141 | 6 | 35 |  | 3.145 — nhóm file mới (Ⓑ bắt buộc 3 · Ⓐ chuẩn TW 6 · Ⓓ phụ), xóa hẳn loại đã bỏ, ô ma trận số chính + mũi tên, | giữ |
| t146 | 6 | 12 |  | 3.150 — Tab 📥 Nạp & KT gọn (anh chốt ý 1 — docs/KE_HOACH_GON_GIAO_DIEN.md): | giữ |
| t151 | 6 | 16 |  | 3.155 — Luồng Scan (anh chốt ý 7, 11 — docs/KE_HOACH_GON_GIAO_DIEN.md): quét → chỉnh → Xem → hộp chọn | giữ |
| t169 | 6 | 9 |  | 3.203 (kế hoạch B1) — GOM LƯU: luu() hẹn ghi 300 ms (nhiều lần gọi → 1 lần ghi), luuNgay() ghi ngay; rời trang | giữ |
| t211 | 6 | 5 |  | 3.272 — khung xem phải: dòng "Hồ sơ của khách" (gom CCCD · Chữ ký · Ảnh · tài liệu của 1 khách, thiếu ghi ✗, b | giữ |
| t216 | 6 | 8 |  | 3.278 — bố cục tab Scan: 1 nút 🗂 Quản lý hồ sơ scan → 1 màn 3 thẻ (Chờ sắp xếp · Rà · Kiểm tra); sau khi quét  | giữ |
| t223 | 6 | 8 |  | 3.293 (bước 0) — tải ảnh từ Drive tối đa 2 cùng lúc · 🧹 dọn ảnh tải về · 🔎 Rà: file thả tay trên Drive → Nhận  | giữ |
| t237 | 6 | 15 |  | 3.328 (anh 23/10, KE_HOACH_KTGS_GON bước 2): khối Bắt buộc — ô Tháng kiểm tra, số liệu Mẫu 31 chốt cuối tháng  | giữ |
| t254 | 6 | 19 |  | 3.301 🔎 ĐỐI CHIẾU CHÉO phân bổ KH (anh 21/10: "tại mỗi QĐ tổng giao của Biểu 07 phải khớp số giao của QĐ và dư | giữ |
| t270 | 6 | 3 |  | t270 (TK 3, 3.376 — anh 26/10: "scan cccd … nắn cắt ảnh tương đối lâu, chữ hiện cảnh báo che nút", "chip trắng | giữ |
| t273 | 6 | 13 |  | t273 (TK 3, 3.379 — anh 26/10 "tóm tắt tình hình tổ … trong 1 mặt A4, để cán bộ đi kiểm tra có thông tin"; "nh | giữ |
| t279 | 6 | 8 |  | t279 (TK 3, 3.385 — anh 27/10): SAO KÊ THEO NHÀ ĐẦU TƯ (tab Sao kê, báo cáo 'ndt') — ô chọn NĐT sổ sẵn mọi mã  | giữ |
| t300 | 6 | 13 |  | 3.357 (KE_HOACH_CHOT_SO đợt C1) — Sổ tổ viên / chốt sổ 31/12: nút ở tab Tổ TK&VV, dòng = tổ viên tvChuan (Mẫu  | giữ |
| t309 | 6 | 2 |  | 3.368 (anh 25/10 "ds tổ có cột bị khuất") — Tra cứu › Tổ trưởng: danh sách tổ chia cột theo tỷ lệ khung → đủ 7 | giữ |
| t320 | 6 | 23 |  | 3.400 (anh chốt 28/10 — Tèo): TÊN CHUẨN file gốc <MÃ>_<YYYY-MM-DD> (loại trước, ngày sau; ô tháng → ngày cuối  | giữ |
| t322 | 6 | 18 |  | 3.402 (anh 29/10: củng cố, đóng tổ không hoạt động — "ra tổ rác tất cả"): 📉 Diễn biến tổ ở Tra cứu KH (js/80,  | giữ |
| t142 | 5 | 17 |  | 3.146 — Kiểm tra kỳ (anh chốt 10/10/2026): bỏ hẳn chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc | giữ |
| t160 | 5 | 11 |  | 3.165 (anh chốt, BAN_GIAO_3161.md §2.4) — Kết quả kiểm tra theo cấu trúc ma trận: gom theo từng file (thứ tự d | giữ |
| t161 | 5 | 6 |  | 3.166 (anh chốt, BAN_GIAO_3161.md §2.5) — thanh chọn nhiều có cả 📋 Chép n file và 🗑 Xóa n file; chưa cầu nối → | giữ |
| t177 | 5 | 12 |  | 3.216 (anh 15/10) — CỬA KHO (js/29-kho.js): mỗi cửa trả đúng như hàm được bọc (hợp đồng), chưa dựng kỳ → rỗng  | giữ |
| t197 | 5 | 4 |  | 3.236 (R3 phần 2): khuôn Word KTGS (js/khuon/kt-khuon.js) KHÔNG nạp lúc mở app, tải khi cần (ktKhuon) — 1 lần, | giữ |
| t198 | 5 | 8 |  | 3.239: nút khung app (index.html) theo data-lenh — thanh bên đổi tab + tô sáng, ô tìm ✕, cài đặt / hướng dẫn / | giữ |
| t213 | 5 | 9 |  | 3.274 — anh: "bản mới up đọc CCCD bị lỗi cắt không chuẩn" (ảnh gốc chỉ còn nửa thẻ): ô "Bản photo 2 mặt trên 1 | giữ |
| t215 | 5 | 6 |  | 3.277 — sửa nhanh tab Scan sau rà soát: chữ hướng dẫn đúng cách lưu mới; gộp thanh "chưa khai" vào "Chờ sắp xế | giữ |
| t222 | 5 | 3 |  | 3.292 — tab Scan, kiểu xem ▦ Bảng: cột Tổ trưởng (tổ đã khai trên bản; chưa có → theo mã KH trên Mẫu 31). Dữ l | giữ |
| t226 | 5 | 9 |  | 3.304 — chữ ký gắn cùng CCCD (anh 21/10): bảng Scan cột "Ck" cạnh Loại giấy tờ (khách có chữ ký hiện ✍), nút 💾 | giữ |
| t235 | 5 | 8 |  | 3.321 (anh 23/10, ảnh hộp Sửa bản quét CCCD): "chỗ tổ cho hiện danh sách tổ ra chọn luôn, CCCD này là của tổ t | giữ |
| t240 | 5 | 16 |  | 3.328 (P0 — docs/KE_HOACH_KHO_KTGS.md) — cửa KHO cho KTGS: chotThang · theoNgay · bc37 / bc38 · t105Truoc · mo | giữ |
| t257 | 5 | 4 |  | 3.347 (anh 24/10: "kiểu bù này chỉ tính cho cuối tháng" · "làm trước tra cứu theo ngày không cần bù mẫu") — tv | giữ |
| t271 | 5 | 7 |  | t271 (TK 3, 3.377 — anh 26/10 "code báo trùng", "đo tốc độ ở đâu", "nút mở đóng khung xem trước scan làm tương | giữ |
| t274 | 5 | 16 |  | t274 (TK 3, 3.380 — anh 26/10 "data dựng sẵn từ Mẫu 31, TK 105 và tổ"; "cột số tiền KH đã CK vào riêng, cột CK | giữ |
| t275 | 5 | 8 |  | t275 (TK 3, 3.381 — anh 26/10 "khi nạp dữ liệu dùng khóa liên kết thành 1 data hoàn chỉnh, mọi truy vấn lấy qu | giữ |
| t301 | 5 | 9 |  | 3.358 (KE_HOACH_CHOT_SO đợt C2) — năm sau dùng sổ chốt 31/12: khách TƯ còn giữ (01/TV) mà Mẫu 31 năm nay không | giữ |
| t138 | 4 | 9 |  | 3.142 — đợt A tách file: mở app qua máy chủ web (như link GitHub Pages), không phải file:// | giữ |
| t149 | 4 | 12 |  | 3.153 — Xóa thống nhất (anh chốt ý 3 — docs/KE_HOACH_GON_GIAO_DIEN.md): mọi thứ vào 🗑 Thùng rác app, không tha | giữ |
| t182 | 4 | 18 |  | 3.223 M1 (anh chốt 16/10) — LƯU AN TOÀN B1: cửa KHO1 (chụp / khôi phục), tự chụp trước khi nhận Drive, bỏ bản  | giữ |
| t220 | 4 | 4 |  | 3.290 — lưu 1 lượt quét nhiều người vào Chờ sắp xếp: mỗi người đọc được thẻ → tên "cccd-Họ tên - số CCCD" + lư | giữ |
| t221 | 4 | 6 |  | 3.291 — lưới "Bản vừa quét" chế độ Thẻ: mỗi mặt dời 4 chiều (◀ ▶ ▲ ▼), chọn ảnh rồi bấm phím mũi tên, nút 🔄 Lậ | giữ |
| t305 | 4 | 6 |  | 3.363 (TU_VAN_KY_THUAT mục 5) — ⚠ nhật ký lỗi tự động: bắt lỗi chạy + lời hứa bị từ chối, lưu trên máy (localS | giữ |
| t321 | 4 | 12 |  | 3.401 (anh chốt 28/10 — Tèo QT-C-10 / 11, docs/TEO_QUY_TAC_CHUNG.md): chuỗi món → tổ → ấp → điểm GD. | giữ |
| t326 | 4 | 11 |  | 3.406 (anh 29/10): 🗺 Địa bàn (Hôm nay) theo Mẫu 31 + File Tổ trưởng mới nhất (js/82, cắm rút) — không cài cứng | giữ |
| t101 | 3 | 0 |  | 3.87 → 3.120: Mẫu 10 (sao kê chi tiết theo ngày) ĐÃ BỎ HẲN từ bản 3.120 (anh chốt) — dùng Mẫu 31 (số liệu chín | D1 — thêm câu kiểm / bỏ |
| t166 | 3 | 17 |  | 3.173 (anh duyệt 12/10) — KHĐ tự tính theo ĐÚNG luật hệ thống (câu 14 "Sao kê món vay N tháng không hoạt động" | giữ |
| t206 | 3 | 5 |  | 3.260 — Phần C: 🧾 Sổ cài đặt (Khai báo › Sao lưu): khóa trên máy theo khối, khóa lạ; hàm con kéo độ rộng đổi t | giữ |
| t232 | 3 | 13 |  | 3.312 (anh 22/10, gửi bản scan Giấy nộp tiền): tab Giao dịch xã — 🏦 Giấy nộp tiền (nộp để ghi vào tài khoản) + | giữ |
| t233 | 3 | 7 |  | 3.314 (anh 22/10): tab Giao dịch xã › 🧾 Bảng kê — chọn Thu / Chi, in được 2 loại, cùng mẫu chỉ khác chữ. Dữ li | giữ |
| t248 | 3 | 10 |  | 3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2): 🩺 Sức khỏe sao lưu ở ⚙ Khai báo đơn vị › 💾 Sao lưu — mỗi đường lưu 1 | giữ |
| t310 | 3 | 3 |  | 3.369 (tối ưu nạp — phương án A anh duyệt 25/10): slNen / slMoBang viết lại cho nhanh phải cho KẾT QUẢ Y HỆT t | giữ |
| t324 | 3 | 11 |  | 3.404 (anh chốt 28/10 — Tèo QT-C-12): ngày chuyển quá hạn theo phiên của điểm GD — ưu tiên cột hệ thống "Ngày  | giữ |
| t325 | 3 | 9 |  | 3.405 (Tèo — TEO_KE_HOACH_KY_3110 mục 3): file đối chiếu DOI_CHIEU_APP_<ngày>.csv — đúng hợp đồng cột với giao | giữ |
| t250 | 1 | 46 |  | P1 🎯 PHÂN BỔ KH — lõi nghiệp vụ js/47-phan-bo.js (QT-15…17, docs/KE_HOACH_PHAN_BO_KH.md). Chạy bằng node, khôn | giữ |
| t251 | 0 | 8 |  | P1 🎯 PHÂN BỔ KH — cửa chung KHO.duNoAp(kỳ) (js/29-kho.js): dư nợ Mẫu 31 gộp xã × thôn × CT × nguồn. Chạy bằng  | giữ |

## 4. Nhật ký

| Ngày | Nội dung |
|---|---|
| 30/10/2026 | Lập bảng từ lượt hồi quy 3.406 (1 luồng); R1 làm ở 3.407. |
