# Chức năng đã chốt (tự sinh — `python3 tools/hoiquy_pt.py bang`, đừng sửa tay)

Phép thử đạt và các file nó dựa vào chưa đổi từ lần đạt đó → chức năng coi là **đã chốt**; chế độ hồi quy `doi` không chạy lại (luật: `tests/README.md`).

| Phép thử | Chốt từ bản | Lần đạt | Kiểm gì |
|---|---|---|---|
| hoiquy | 3.385 | 2026-10-27 |  |
| hoiquy2 | 3.385 | 2026-10-27 | Mục 13 bàn giao: có thư viện thật, thêm file vào từng tab, đi 6 tab ở máy tính và iPhone |
| t100 | 3.385 | 2026-10-27 | 3.86 — Mẫu 31 (175 cột, GIẢ: tests/gia31 = taogia.py 25000 tests/gia31 m31): nhận đúng loại, gộp khế ước trùng, món tất toán, khách chỉ gửi TK, |
| t101 | 3.385 | 2026-10-27 | 3.87 → 3.120: Mẫu 10 (sao kê chi tiết theo ngày) ĐÃ BỎ HẲN từ bản 3.120 (anh chốt) — dùng Mẫu 31 (số liệu chính) + Dư nợ chi tiết (tham chiếu số TK 10 |
| t102 | 3.385 | 2026-10-27 | 3.88 — tab Số liệu: luồng theo tháng (file của tháng, ② Kiểm tra lưu kết quả, dữ liệu đổi → báo kiểm lại, bảng nhiều tháng thu gọn) |
| t103 | 3.385 | 2026-10-27 | 3.88.1 — tab con Tổ TK&VV trên máy thứ 2: bảng số liệu chưa tải (Drive hết phiên) → cây tổ dựng tạm từ danh bạ + cảnh báo + nút Nối Drive / Thử lại; n |
| t104 | 3.385 | 2026-10-27 | 3.89 — bộ chọn phạm vi chung · Tra cứu KH (phạm vi, kiểm trùng CCCD / CMND HSSV, tìm tên khách / vợ-chồng / HSSV) · tab con 📑 Sao kê (8 báo cáo, theo  |
| t105 | 3.385 | 2026-10-27 | 3.90 — 7 file chuẩn TW (BCDHTD 01.1 / 01.2 · B32 · LEN_31 × 4): đọc, kỳ tháng / ngày, kiểm tra chéo với Mẫu 31, tab con 📊 Tổng hợp, |
| t106 | 3.385 | 2026-10-27 | 3.93 — tab con 🛡 KTGS Hội: đọc BC0437 / BC0438 GIẢ (dựng trong trang từ Mẫu 31 giả), xếp loại theo công thức khi cột = 0, dòng lặp, |
| t107 | 3.385 | 2026-10-27 | 3.94 — 👤 Tra cứu KH gọn: danh sách 2 dòng (điện thoại 50 dòng + Xem thêm), thẻ chia nhóm (số tóm tắt, nhân thân, liên hệ, tiết kiệm, món vay có mục đí |
| t108 | 3.385 | 2026-10-27 | 3.95 — tab con 🛡 KTGS Hội: 📋 Mẫu 04/BC-TH (Báo cáo tổng hợp kết quả kiểm tra) + ⚙ Khai báo Hội. |
| t109 | 3.385 | 2026-10-27 | 3.96 — tab con 🛡 KTGS Hội: 🗓 Kế hoạch KTGS năm của Hội cấp xã (01/KH) — khuôn dự thảo HĐT cấp xã (căn cứ 727, 90%, bỏ MẪU THAM KHẢO, A4), |
| t110 | 3.385 | 2026-10-27 | 3.97 — KTGS: 🗓 kiểm tra định kỳ theo lịch (Mẫu 06 + 16, số liệu cuối tháng trước → tháng kiểm tra, ngày trống, ≥ 90% hộ, QH / khoanh không tích), |
| t111 | 3.385 | 2026-10-27 | 3.98–3.103 — HSSV cửa sổ nổi 3 mức + nền sáng/tối (3.103) · HSSV cửa sổ nổi 📌 (3.102) · HSSV tiền vay theo năm học (3.101) · HSSV ngày vay gợi ý GDX g |
| t112 | 3.385 | 2026-10-27 | 3.107 — xếp tổ / món vay trực tiếp vào điểm GD khi file Thông tin tổ trưởng thiếu tổ · dòng báo vàng ở KTGS Hội · KTGS bỏ mục vay trực tiếp · Mẫu 16 " |
| t113 | 3.385 | 2026-10-27 | 3.108 — Danh sách tổ TK&VV (DSTO): đọc (vùng dữ liệu khai sai, dòng tên cột phụ, chữ ký), bổ sung tổ thiếu trong Thông tin tổ trưởng, |
| t114 | 3.385 | 2026-10-27 | 3.109 — Mẫu 04 / Mẫu 16: ngày tháng theo tháng kiểm tra, III. Nội dung kiểm tra ghi sẵn (727), nhận xét có lãi tồn, |
| t115 | 3.385 | 2026-10-27 | 3.111 — Mẫu 06 theo mẫu gốc (tên hoa đầu từ, dòng đầu Thời điểm · Địa bàn · Tổ, Đơn vị tính dòng riêng, cột tiền thu hẹp / Vào việc rộng, |
| t116 | 3.385 | 2026-10-27 | 3.112 — Kế hoạch KTGS: chọn căn cứ 727 (mặc định) hoặc hướng dẫn cũ 10566 (kế hoạch lập trước 727), áp cả khuôn ① ②, |
| t117 | 3.385 | 2026-10-27 | 3.113 — Đồng bộ TOÀN BỘ cài đặt qua Drive (cauhinh.json): 2 máy giả (A, B) dùng chung Drive giả. |
| t118 | 3.385 | 2026-10-27 | 3.113 — 🏛 Khai báo Hội đoàn thể: 1 nơi khai cho Mẫu 06 / 16TD / 04 / Kế hoạch (thẻ Hội – xã + tab nhỏ Chuẩn hóa), |
| t119 | 3.385 | 2026-10-27 | 3.114 — Hộp chọn khi in (Mẫu 06 / 16 / 04 / Kế hoạch): người kiểm tra / người ký theo vai trò, nhớ lựa chọn, Điền đầy đủ, |
| t120 | 3.385 | 2026-10-27 | 3.115 — Mẫu 06: dòng Thời điểm · Địa bàn · Tổ không rớt dòng (thu khoảng cách, bỏ tỉnh, viết tắt KP / P. / X.), cột Chương trình canh giữa, |
| t121 | 3.385 | 2026-10-27 | 3.117 — Mẫu 06 phân trang: 1–3 hộ gọn 1 mặt; nhiều hộ thì không cắt đôi hộ, hộ cuối đi cùng dòng Cộng + nhận xét + ký; |
| t122 | 3.385 | 2026-10-27 | 3.118 — Rà mẫu chung (06 / 16 / 04): "Chức vụ:" có hai chấm, chữ sau dòng chấm cách 1 khoảng, đơn vị dài xuống dòng trước "xã / phường", |
| t123 | 3.385 | 2026-10-27 | 3.120 — Nạp số liệu: dòng riêng "Dư nợ chi tiết" (chỉ tham chiếu số TK 105 + điểm GD xã; Mẫu 31 là số liệu chính), bỏ hẳn Mẫu 10. |
| t124 | 3.385 | 2026-10-27 | 3.121 — Đối chiếu Mẫu 31 ↔ Dư nợ chi tiết cùng kỳ: tổng (món, khách, dư nợ, số dư 105), danh sách món lệch, cột "Dư nợ CT" ở bảng đối chiếu ② Kiểm tra |
| t125 | 3.385 | 2026-10-27 | 3.123 — Phân công BTV: tích người phân công, khuyết Chủ tịch (Phó đôn lên) / khuyết Phó (CT kiêm), người ký, ô kiểm tra đủ nhiệm vụ; |
| t126 | 3.385 | 2026-10-27 | 3.124 — dòng chấm mịn (cỡ ≈ 65%, đủ dài như cũ) cho Word + bản In mọi mẫu KTGS; in 2 mặt khi xuất nhiều bản |
| t127 | 3.385 | 2026-10-27 | 3.125 — giữ sẵn số liệu nhiều tháng trong phiên: nạp ngầm (mới nhất trước), chuyển tháng không nạp lại, bỏ tháng lâu không xem (giữ tháng mới nhất), |
| t128 | 3.385 | 2026-10-27 | 3.128 — (C) bộ in chuẩn: chia trang A4, số trang, 2 mặt, khung xem (đếm trang PDF thật). |
| t129 | 3.385 | 2026-10-27 | 3.134 — Mẫu 06: mục đích cùng cỡ 8 pt, cột đúng / sai mục đích hẹp lại + Hiệu quả đầu tư rộng ra, tên Hội không đậm, "Mẫu số 06/TD" nhỏ + canh phải; |
| t130 | 3.385 | 2026-10-27 | 3.136 — Số liệu theo NGÀY: mọi loại nạp được theo ngày; kỳ ngày lấy bảng đúng ngày, thiếu thì bảng liền trước (cuối tháng trước) + ghi căn cứ; |
| t131 | 3.385 | 2026-10-27 | 3.138 — ⟳ Làm mới cạnh ô Số liệu + chip kỳ đang dùng; TK 105 "đã mở TK"; KU hủy / nhập nhầm tổ (CLOSE + giải ngân 0) loại khỏi tổ; |
| t132 | 3.385 | 2026-10-27 | 3.138 — In ấn: Mẫu 06 (chấm nhạt, kẻ dòng hộ mảnh, tiêu đề cỡ 11, ngày lên dòng chấm Biện pháp, chỗ ký, mẫu trắng 3 cột chữ bằng nhau, số trang PDF th |
| t133 | 3.385 | 2026-10-27 | 3.139 — Tab Tổ TK&VV › báo cáo "Dự kiến chia tách tổ" (A4 ngang, tối đa 2 trang, mỗi hộ 1 dòng theo mã KH, cột Tổ mới, vợ/chồng, SĐT, |
| t134 | 3.385 | 2026-10-27 | 3.140 — Kế hoạch: thứ tự ấp (điểm GD → mã thôn → tên, sắp lại ▲▼, về mặc định); mỗi tháng TRỌN ẤP; đổi tháng chỉ theo ấp; kế hoạch cũ tách ấp → cảnh b |
| t135 | 3.385 | 2026-10-27 | 3.140.1 — Mẫu 06 số tiền: 2 số lẻ (nợ lãi dưới 5.000 đ giữ 3 số lẻ), ô số tiền canh phải + lề ô hẹp, cỡ chữ tự thu theo đúng bề rộng ô (1,3 cm) |
| t136 | 3.385 | 2026-10-27 | 3.140.4 — Lỗi mất cài đặt 09/10: máy bị trống cài đặt → đồng bộ với file cauhinh.json ở thư mục khác ("undefined") rồi quay về thư mục thật |
| t137 | 3.385 | 2026-10-27 | 3.141 — Kế hoạch › In theo tháng kiểm tra TỰ LẤY số liệu cuối tháng liền trước (Mẫu 31 + BC0437 đã nạp), không đổi kỳ anh đang chọn; |
| t138 | 3.385 | 2026-10-27 | 3.142 — đợt A tách file: mở app qua máy chủ web (như link GitHub Pages), không phải file:// |
| t139 | 3.385 | 2026-10-27 | 3.143 (Q14) — ngày số liệu lấy từ NỘI DUNG file; file không ghi ngày → anh khai khi nạp, tên file chỉ là gợi ý. |
| t140 | 3.385 | 2026-10-27 | 3.144 — Sắp lại tab (anh chốt Q5, Q12, Q13, Q15): |
| t141 | 3.385 | 2026-10-27 | 3.145 — nhóm file mới (Ⓑ bắt buộc 3 · Ⓐ chuẩn TW 6 · Ⓓ phụ), xóa hẳn loại đã bỏ, ô ma trận số chính + mũi tên, bấm ô = nạp / hỏi thay, |
| t142 | 3.385 | 2026-10-27 | 3.146 — Kiểm tra kỳ (anh chốt 10/10/2026): bỏ hẳn chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã kiểm, sau lần đổi file cuối); |
| t143 | 3.385 | 2026-10-27 | 3.147 — Thanh bên điều hướng (đợt F, anh duyệt 10/10/2026): máy tính ≥ 1100 px có thanh bên, ẩn thanh tab ngang + tab con Số liệu; |
| t144 | 3.385 | 2026-10-27 | 3.148 — Nút & trạng thái (anh chốt ý 10, 12, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md): |
| t145 | 3.385 | 2026-10-27 | 3.149 — Kỳ + phạm vi CHUNG (anh chốt ý 6b, 6c — docs/KE_HOACH_GON_GIAO_DIEN.md): |
| t146 | 3.385 | 2026-10-27 | 3.150 — Tab 📥 Nạp & KT gọn (anh chốt ý 1 — docs/KE_HOACH_GON_GIAO_DIEN.md): |
| t147 | 3.385 | 2026-10-27 | 3.151 — Thanh lọc chung tab file (anh chốt ý 6a, 9, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md): |
| t148 | 3.385 | 2026-10-27 | 3.152 — Xuất chung (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): mọi khung xem báo cáo cùng 1 hàng nút, cùng thứ tự |
| t149 | 3.385 | 2026-10-27 | 3.153 — Xóa thống nhất (anh chốt ý 3 — docs/KE_HOACH_GON_GIAO_DIEN.md): mọi thứ vào 🗑 Thùng rác app, không thanh Hoàn tác; |
| t150 | 3.385 | 2026-10-27 | 3.154 — Khai báo Hội = 1 bảng như Excel (anh chốt ý 8 — docs/KE_HOACH_GON_GIAO_DIEN.md): 1 Hội = 1 CT, 1 PCT, 3 BTV; |
| t151 | 3.385 | 2026-10-27 | 3.155 — Luồng Scan (anh chốt ý 7, 11 — docs/KE_HOACH_GON_GIAO_DIEN.md): quét → chỉnh → Xem → hộp chọn |
| t152 | 3.385 | 2026-10-27 | 3.156 — Tab Nạp & KT gọn 2 (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): |
| t153 | 3.385 | 2026-10-27 | 3.157 — Khung xem bên phải + 2 kiểu lọc (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): |
| t154 | 3.385 | 2026-10-27 | 3.158 — Khai báo Hội vừa 1 trang (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): bỏ cột Xã (dòng nhóm "Xã · n Hội · m tổ"), |
| t155 | 3.385 | 2026-10-27 | 3.159 — Chân thanh bên + chế độ tối (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): |
| t156 | 3.385 | 2026-10-27 | 3.160 + 3.162 — Lọc số liệu chung 5 tab (anh chốt 11/10): hàng 1 = Xã (luôn hiện, đang chọn xanh) + 📍 đường dẫn chỉ báo + 🔎; |
| t157 | 3.385 | 2026-10-27 | 3.161 — Tab Tổ (anh chốt 11/10): chip gom 3 nhóm Xem · Khách · Cần xử lý (tối đa 2 dòng), nút In / Excel / ⚙ Cột ở đầu bảng, |
| t158 | 3.385 | 2026-10-27 | 3.163 (anh chốt 11/10) — Nạp & KT: dải lịch ●◐○ + ⦿ Gần nhất, cột từng ngày có dữ liệu (mới nhất bên phải) + cột chốt tháng, ⇔ Tổng quan, ▾ Thu gọn ↔  |
| t159 | 3.385 | 2026-10-27 | 3.164 (anh chốt, BAN_GIAO_3161.md §2.1) — Tab Tổng hợp: sửa lọc "Theo nguồn vốn" tới Điểm GD / Hội / Tổ (pvLoc), danh sách 3 nhóm |
| t160 | 3.385 | 2026-10-27 | 3.165 (anh chốt, BAN_GIAO_3161.md §2.4) — Kết quả kiểm tra theo cấu trúc ma trận: gom theo từng file (thứ tự dòng ma trận), mỗi file "✓ n · ⚠ n · ⓘ n" |
| t161 | 3.385 | 2026-10-27 | 3.166 (anh chốt, BAN_GIAO_3161.md §2.5) — thanh chọn nhiều có cả 📋 Chép n file và 🗑 Xóa n file; chưa cầu nối → hộp chia sẻ (Windows: nút Sao chép); |
| t162 | 3.385 | 2026-10-27 | 3.167 (anh chốt 11/10) — KHỐI LỌC ĐỊA BÀN đồng bộ mọi tab: khung "LỌC ĐỊA BÀN", mỗi dòng 1 thanh, Điểm GD và Hội 2 thanh riêng (bỏ vạch │), |
| t163 | 3.385 | 2026-10-27 | 3.170 (anh chốt 11/10) — 2 tab con mới của Số liệu: 📝 Hồ sơ Tổ (10C cũ / mới, 10A, 10B, 11/TD, 01/BG, 02/BG) · 📄 Hồ sơ vay (01/TD, 03/TD, 04/TD, 09A/T |
| t164 | 3.385 | 2026-10-27 | 3.171 (anh chốt 11/10) — mẫu bám sát PDF anh gửi: kẻ mảnh dưới tiêu ngữ (không gạch chân), logo khai báo 1 lần + tích mẫu, 01/TD theo chương trình (HS |
| t165 | 3.385 | 2026-10-27 | 3.172 → 3.174 (anh chốt 12/10) — tab 🏢 Giao dịch xã KHI CHƯA CÓ SỐ LIỆU (điểm GD theo Cài đặt › Địa bàn): 04/TD + 12/GDX. |
| t166 | 3.385 | 2026-10-27 | 3.173 (anh duyệt 12/10) — KHĐ tự tính theo ĐÚNG luật hệ thống (câu 14 "Sao kê món vay N tháng không hoạt động", N = 3): |
| t167 | 3.385 | 2026-10-27 | 3.174 (anh chốt 12/10) — tab 🏢 Giao dịch xã CÓ SỐ LIỆU (bộ GIẢ tests/gianho31): cây địa bàn theo Mẫu 31 (khối LỌC ĐỊA BÀN, mẫu cấp Điểm GD ẩn Hội / Tổ |
| t168 | 3.385 | 2026-10-27 | 3.177 (anh chốt 13/10) — 📦 MINI APP Giao dịch xã: xuất 1 file HTML từ app (bộ GIẢ tests/gianho31 + TK 104 giả), mở file mini: |
| t169 | 3.385 | 2026-10-27 | 3.203 (kế hoạch B1) — GOM LƯU: luu() hẹn ghi 300 ms (nhiều lần gọi → 1 lần ghi), luuNgay() ghi ngay; rời trang / ẩn app / tải lại không mất; |
| t170 | 3.385 | 2026-10-27 | 3.206 (anh chốt 14/10) — cây địa bàn ▾ Mở rộng / ▴ Thu gọn mọi tab (gọn 1 dòng, bấm mắt đường dẫn về cấp trên) · Giấy lĩnh ↺ Phiếu mới · |
| t171 | 3.385 | 2026-10-27 | 3.207 (anh yêu cầu 14/10) — 🏠 HỘ VAY MỚI: form nhập nhanh (ngày gõ liền số), suy giới tính / năm sinh theo CCCD (lệch → ⚠), nơi cấp, hạn CCCD; |
| t172 | 3.385 | 2026-10-27 | 3.208 (anh chốt 14/10) — KHAI BÁO CHUNG (tab con PGD · Trưởng ấp · Tổ phó · Chương trình vay) + THẺ CHƯƠNG TRÌNH VAY → 01/TD, 03/TD tự điền; |
| t173 | 3.385 | 2026-10-27 | 3.209 (anh 14/10) — SỔ HỘ VAY: lấy từ Mẫu 31 (mã KH, SĐT, tên vợ/chồng), hộ mới (tổ, nhiều HSSV), trùng CCCD, tự gắn mã KH; |
| t174 | 3.385 | 2026-10-27 | 3.211 (anh chốt 14/10) — GQVL: thẻ dạng riêng, 01/GQVL (mẫu mới VB 4039), 07b/GQVL hợp đồng; lịch trả gốc 24 tháng/lần chia đều làm tròn trăm nghìn kỳ |
| t175 | 3.385 | 2026-10-27 | 3.214 (anh 15/10) — Sổ hộ vay: form nhập dạng lưới có tiêu đề cột (Enter / Tab sang ô, không mất con trỏ, Lưu & thêm hộ tiếp), |
| t176 | 3.385 | 2026-10-27 | 3.215 (anh 15/10) — KHAI BÁO RIÊNG từng mẫu Hồ sơ vay (đợt 1: 01/TD · 03/TD · 01/UQ): ô tùy biến liệt kê từ trên xuống, công tắc ✍ chấm / 🖨 in sẵn, |
| t177 | 3.385 | 2026-10-27 | 3.216 (anh 15/10) — CỬA KHO (js/29-kho.js): mỗi cửa trả đúng như hàm được bọc (hợp đồng), chưa dựng kỳ → rỗng không lỗi; |
| t178 | 3.385 | 2026-10-27 | 3.222 (anh 16/10, phương án B + bổ sung 1–3) — ⚙ KHAI BÁO ĐƠN VỊ dùng chung mọi tab; bố cục A cột trái Hồ sơ vay |
| t179 | 3.385 | 2026-10-27 | 3.223 M0 (anh chốt 16/10, QUY_CHUAN mục 9): CHUẨN KHÓA — bản in MỌI mẫu so TỪNG KÝ TỰ với tests/chuan/*.html. |
| t180 | 3.385 | 2026-10-27 | 3.223 M0 (anh chốt 16/10, QUY_CHUAN mục 9): CHUẨN GỐC — bản in TRẮNG của app so với file Word anh gửi (tests/mau_goc/so_do.json, tools/domau.py): |
| t181 | 3.385 | 2026-10-27 | 3.223 (anh chốt 16/10, QUY_CHUAN mục 9.3): CHỒNG KHÍT — mẫu trên nền ô: 📄 bản trắng · 🖨 bản thật có số liệu · 📝 bản mẫu điền hết |
| t182 | 3.385 | 2026-10-27 | 3.223 M1 (anh chốt 16/10) — LƯU AN TOÀN B1: cửa KHO1 (chụp / khôi phục), tự chụp trước khi nhận Drive, bỏ bản trùng, giữ 10 bản; |
| t183 | 3.385 | 2026-10-27 | 3.223 M2 (anh chốt 16/10) — SỔ HỘ VAY ĐỦ CỘT: ➕ Thông tin thêm mỗi người (giới tính, dân tộc, nghề nghiệp, thu nhập, địa chỉ, nơi làm việc, hộ KD), |
| t184 | 3.385 | 2026-10-27 | 3.223 M3 (anh chốt 16/10) — NỀN Ô MẪU (js/31-o-mau.js) trên 01/TD: 3 kiểu in (📄 trắng · 🖨 thật · 📝 mẫu + mức điền), cách từng ô (✍ / 🤖 / ✎ / ⌨), |
| t185 | 3.385 | 2026-10-27 | 3.223 M8 (anh chốt 16/10) — LƯU THEO NGĂN (IndexedDB 'tuhoso_ngan'): lần đầu chép từ localStorage + giữ bản cũ 30 ngày, chỉ ghi ngăn đổi, |
| t186 | 3.385 | 2026-10-27 | 3.224 (anh chốt 17/10) — QUY TRÌNH SCAN MỚI: ① chọn loại (CCCD / Tài liệu / Chữ ký / Ảnh khách) — loại quyết định số mặt (Tài liệu không ghép mặt sau) |
| t187 | 3.385 | 2026-10-27 | 3.225 (anh chốt 17/10) — ĐỒNG BỘ DRIVE THEO KHỐI: _Hệ thống/khoi/<khối>__<lô>.json; 3 máy giả lập + Drive giả (máy C = bản cũ, chỉ chimuc.json / cauhi |
| t188 | 3.385 | 2026-10-27 | 3.226 — CÀI ĐẶT THEO KHỐI: _Hệ thống/caidat/<khối>.json (chia chính cơ chế cauhinh.json, luật gộp theo khóa giữ nguyên); |
| t189 | 3.385 | 2026-10-27 | 3.227 (anh 17/10) — 📒 Sổ hộ vay gộp tab 👪 Hộ vay: lọc theo khối LỌC ĐỊA BÀN (Xã › Điểm · Hội › Tổ), ngày nhập (từ / đến, nút nhanh), |
| t190 | 3.385 | 2026-10-27 | 3.228 (anh 17/10) — 🔎 Kiểm tra hộ vay (khai báo được: bật / tắt · mức · ngưỡng): tuổi, CCCD, trùng (sổ + Mẫu 31: CCCD, SĐT, tên gần đúng, vợ/chồng), |
| t191 | 3.385 | 2026-10-27 | 3.229 (anh 17/10) — Khai báo riêng 4 nguồn từng mẫu: ✍ Ghi tay · 📊 Mẫu 31 · ⚙ Khai báo chung · ⌨ Tự gõ (nhớ riêng mẫu); mẫu lấy khai báo riêng trước; |
| t192 | 3.385 | 2026-10-27 | 3.230 (R1 chuẩn hóa — KE_HOACH_CHUAN_HOA): "Có gì mới" ≤ 15 dòng + link CHANGELOG · hàm mồ côi đã dọn không còn · thanh lọc Sổ hộ vay không bung khi t |
| t193 | 3.385 | 2026-10-27 | 3.231 (anh duyệt 17/10) — BẢN ĐIỆN THOẠI: gói số liệu xem (máy tính) · tự chuyển trên điện thoại · PIN + mã hóa · tra cứu khách · địa bàn theo cấp · k |
| t194 | 3.385 | 2026-10-27 | 3.232 — BẢN ĐIỆN THOẠI phần 2: 📄 Văn bản · 📷 Scan (danh sách theo khối Drive, lọc không dấu, mở file → bảng nút Xem / Lưu vào máy / Gửi / Lưu vào app; |
| t195 | 3.385 | 2026-10-27 | 3.233 — BẢN ĐIỆN THOẠI phần 3: 🏢 Giao dịch xã (máy tính đẩy kèm bản mini 04/TD · 12/GDX · Giấy lĩnh theo kỳ mới nhất; điện thoại mở trong app, cất mã  |
| t196 | 3.385 | 2026-10-27 | 3.234 (R2 chuẩn hóa — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): bộ nhận lệnh data-lenh · mảnh giao diện (ô rộng theo loại) · bộ nút xuất chuẩn (mờ không ẩn, |
| t197 | 3.385 | 2026-10-27 | 3.236 (R3 phần 2): khuôn Word KTGS (js/khuon/kt-khuon.js) KHÔNG nạp lúc mở app, tải khi cần (ktKhuon) — 1 lần, giữ cờ in 1 / 2 mặt lúc gọi, Kế hoạch n |
| t198 | 3.385 | 2026-10-27 | 3.239: nút khung app (index.html) theo data-lenh — thanh bên đổi tab + tô sáng, ô tìm ✕, cài đặt / hướng dẫn / thùng rác, khung xem file (Gửi file → m |
| t199 | 3.385 | 2026-10-27 | 3.240 (anh 17/10, đối chiếu 2 file 01/TD anh gửi): bảng đối tượng đúng số dòng có số liệu, chữ dài xuống dòng (HSSV không thu nhỏ); bản trắng 3 dòng c |
| t200 | 3.385 | 2026-10-27 | 3.242 (anh 17/10, ý 1–19): FORM LẬP 01/TD theo thứ tự tờ giấy — gõ người vay mới (Tab / Enter đi ô kế, ngày liền số, nơi cấp tự điền) → hộ mới vào 📒 S |
| t201 | 3.385 | 2026-10-27 | 3.252 (anh 17–18/10, ý 15 — "triển khai hết các mẫu khai báo riêng 1 lần"): KHAI BÁO RIÊNG mọi mẫu nền ô — chỉ chỗ chấm (câu chữ mẫu không sửa); |
| t202 | 3.385 | 2026-10-27 | 3.253 (anh chốt 17–18/10, ý 12–14): MẪU 06/TD trong Hồ sơ vay — gọi hàm Mẫu 06 KTGS (khóa mẫu); hộ chung danh sách 03/TD; |
| t203 | 3.385 | 2026-10-27 | 3.256 (anh chốt 17/10 ý 10.3, "code tiếp" 18/10): GIẤY ỦY QUYỀN 01/UQ chọn hộ từ 📒 Sổ hộ vay — form theo thứ tự giấy: hộ → I. ngày lập, số người, thàn |
| t204 | 3.385 | 2026-10-27 | 3.257 (anh 18/10 "rà soát lại form của mẫu nào không lọt mẫu khác, ví dụ trong mẫu 01TG mà có GQVL là không đúng"): |
| t205 | 3.385 | 2026-10-27 | 3.259–3.263 — 📒 Sao kê › Thông tin tổ (3.263: Bộ thông tin tổ → THHD 1 trang theo cấp): KQGD từng điểm GD (Mẫu 13/GDX + thông tin tổ) · 3 tháng KHĐ ·  |
| t206 | 3.385 | 2026-10-27 | 3.260 — Phần C: 🧾 Sổ cài đặt (Khai báo › Sao lưu): khóa trên máy theo khối, khóa lạ; hàm con kéo độ rộng đổi tên không trùng hàm chung |
| t207 | 3.385 | 2026-10-27 | 3.264 — 🗂 Lưu scan tập trung · 🧹 Sắp xếp · 📊 Kiểm tra · 📇 đọc CCCD (QR giả / 3 dòng mã máy đọc giả) · bản photo 2 mặt. |
| t208 | 3.385 | 2026-10-27 | 3.268 — 🔎 Rà CCCD đã lưu: đúng khách (QR giả), sai khách → đổi + ảnh khách đi theo, CMND cũ, lệch số, không phải chủ hộ, |
| t209 | 3.385 | 2026-10-27 | 3.269 — đọc CCCD ảnh cả tờ (2 thẻ trên 1 trang), thẻ Căn cước mẫu mới (QR mặt sau, nội dung khác mẫu), đọc lại bản cũ đọc hỏng, |
| t210 | 3.385 | 2026-10-27 | 3.271 — CCCD lưu 3 file lên Drive (PDF + Mặt trước.jpg + Mặt sau.jpg, chung thư mục), đổi tên / dời / thùng rác đi theo PDF, |
| t211 | 3.385 | 2026-10-27 | 3.272 — khung xem phải: dòng "Hồ sơ của khách" (gom CCCD · Chữ ký · Ảnh · tài liệu của 1 khách, thiếu ghi ✗, bấm → xem ngay). Dữ liệu GIẢ. |
| t212 | 3.385 | 2026-10-27 | 3.273 — 🪪 Quét CCCD điền form: nút cạnh Họ tên (Sổ hộ vay mỗi người · 01/TD người vay), ảnh có sẵn (QR giả) → hộp xác nhận |
| t213 | 3.385 | 2026-10-27 | 3.274 — anh: "bản mới up đọc CCCD bị lỗi cắt không chuẩn" (ảnh gốc chỉ còn nửa thẻ): ô "Bản photo 2 mặt trên 1 tờ" nhớ cả phiên → ảnh chụp 1 mặt thẻ b |
| t214 | 3.385 | 2026-10-27 | 3.275 — 🔎 Tra Mẫu 31 cạnh ô tên (tab Scan): hộp Sửa bản quét · Lưu mới (Tên file) · Chữ ký / Ảnh; gõ CCCD / mã KH / họ tên → tên chuẩn; |
| t215 | 3.385 | 2026-10-27 | 3.277 — sửa nhanh tab Scan sau rà soát: chữ hướng dẫn đúng cách lưu mới; gộp thanh "chưa khai" vào "Chờ sắp xếp"; 1 khách nhiều bản cùng loại → " (2)" |
| t216 | 3.385 | 2026-10-27 | 3.278 — bố cục tab Scan: 1 nút 🗂 Quản lý hồ sơ scan → 1 màn 3 thẻ (Chờ sắp xếp · Rà · Kiểm tra); sau khi quét 1 nút 🗄 Lưu vào tủ tự nhận khách. Dữ liệ |
| t217 | 3.385 | 2026-10-27 | 3.280 — CCCD cũ chỉ có PDF (không ảnh trong máy, không ảnh trên Drive): mở xem → tự tách 2 mặt thẻ, hiện 2 mặt; dò không ra → ghi catHong, xem PDF; |
| t218 | 3.385 | 2026-10-27 | 3.285 — 🪪 Đọc số CCCD cạnh 🔎 Tra Mẫu 31 (tab Scan): tài liệu → đọc chữ số trên trang, tìm số CCCD → điền + tự tra; |
| t219 | 3.385 | 2026-10-27 | 3.287 — Ctrl+V file: tab Văn bản → văn bản; tab Scan → ảnh CCCD vào hàng quét (chế độ Thẻ); hộp 🪪 Quét CCCD đang mở → ảnh vào hộp; tab khác → chỉ báo. |
| t220 | 3.385 | 2026-10-27 | 3.290 — lưu 1 lượt quét nhiều người vào Chờ sắp xếp: mỗi người đọc được thẻ → tên "cccd-Họ tên - số CCCD" + lưu số CCCD; |
| t221 | 3.385 | 2026-10-27 | 3.291 — lưới "Bản vừa quét" chế độ Thẻ: mỗi mặt dời 4 chiều (◀ ▶ ▲ ▼), chọn ảnh rồi bấm phím mũi tên, nút 🔄 Lật. Ảnh GIẢ. |
| t222 | 3.385 | 2026-10-27 | 3.292 — tab Scan, kiểu xem ▦ Bảng: cột Tổ trưởng (tổ đã khai trên bản; chưa có → theo mã KH trên Mẫu 31). Dữ liệu GIẢ. |
| t223 | 3.385 | 2026-10-27 | 3.293 (bước 0) — tải ảnh từ Drive tối đa 2 cùng lúc · 🧹 dọn ảnh tải về · 🔎 Rà: file thả tay trên Drive → Nhận vào app |
| t224 | 3.385 | 2026-10-27 | 3.297 (bước 3 kế hoạch tên + lưu) — tài liệu là mẫu hồ sơ vay → thư mục Hồ sơ vay, tên chuẩn; hộ mới khóa số CCCD; |
| t225 | 3.385 | 2026-10-27 | 3.300 — tối ưu tốc độ + đồng hồ: bộ đọc chữ dùng lại 1 lần khởi động; ảnh đã cắt đúng 1 thẻ không đọc 4 mảnh; bộ nhớ tạm PDF (Drive / dựng từ ảnh); |
| t226 | 3.385 | 2026-10-27 | 3.304 — chữ ký gắn cùng CCCD (anh 21/10): bảng Scan cột "Ck" cạnh Loại giấy tờ (khách có chữ ký hiện ✍), nút 💾 cuối dòng bản CCCD |
| t227 | 3.385 | 2026-10-27 | 3.306 — chữ ký / lăn tay (anh 21/10): nhận dạng chữ ký · lăn tay · ảnh CCCD · ảnh trắng; lưu chữ ký là ảnh CCCD bị chặn; ✍ Rà chữ ký (tích sẵn |
| t228 | 3.385 | 2026-10-27 | 3.307 — chế độ lọc cho bản photo (anh 21/10: "xám hay trắng vẫn chưa đạt, magic cũng vậy"): thẻ giả → giả lập bản photo (nền xám không đều, |
| t229 | 3.385 | 2026-10-27 | 3.309 — gọn tab Scan (anh 21/10): menu ⋯ bỏ "Chế độ quét", "📷 Webcam", "📁 Chữ ký · CCCD"; điện thoại bỏ Thẻ / Tài liệu + 📁; |
| t230 | 3.385 | 2026-10-27 | 3.310 (anh 21/10): 07b giữ nguyên mẫu chuẩn; lịch trả gốc tự phân kỳ (≤ 60 tháng: 24 tháng/lần, vay/3 làm tròn xuống trăm nghìn, kỳ cuối phần còn lại) |
| t231 | 3.385 | 2026-10-27 | 3.311 (anh 21/10): công cụ 🎓 Hạn trả HSSV trên màn thấp (17 inch ~1366×650, laptop 125% ~1536×730) — lịch tháng thu còn 1 hàng nút, |
| t232 | 3.385 | 2026-10-27 | 3.312 (anh 22/10, gửi bản scan Giấy nộp tiền): tab Giao dịch xã — 🏦 Giấy nộp tiền (nộp để ghi vào tài khoản) + 🧾 Bảng kê các loại tiền nộp, |
| t233 | 3.385 | 2026-10-27 | 3.314 (anh 22/10): tab Giao dịch xã › 🧾 Bảng kê — chọn Thu / Chi, in được 2 loại, cùng mẫu chỉ khác chữ. Dữ liệu GIẢ. |
| t234 | 3.385 | 2026-10-27 | 3.315 (anh 22/10): 01/TGTV in bằng 2 cách — 📊 lấy từ Mẫu 31 (tổ viên, tích in hàng loạt, in lại cả người đã có TK 105) hoặc ✍ in nhanh tự khai, |
| t235 | 3.385 | 2026-10-27 | 3.321 (anh 23/10, ảnh hộp Sửa bản quét CCCD): "chỗ tổ cho hiện danh sách tổ ra chọn luôn, CCCD này là của tổ trưởng nhưng app báo không có trong Mẫu 3 |
| t236 | 3.385 | 2026-10-27 | 3.323 (anh 23/10): Kiểm tra đột xuất — đơn vị kiểm tra (Mẫu 06 + 16, cả "ĐOÀN KIỂM TRA") chọn: theo Hội · chấm ghi tay · khai báo tên đoàn; |
| t237 | 3.385 | 2026-10-27 | 3.328 (anh 23/10, KE_HOACH_KTGS_GON bước 2): khối Bắt buộc — ô Tháng kiểm tra, số liệu Mẫu 31 chốt cuối tháng liền trước (không theo ô Kỳ đầu trang); |
| t238 | 3.385 | 2026-10-27 | 3.330 (KE_HOACH_KTGS_GON bước 3–4): thanh 3 khối 📅 Bắt buộc · 🎯 Đột xuất · ⚙ Khai báo (thay 6 chip), màn 🧩 Bộ khai báo mẫu (sửa 2 bộ không cần In, ché |
| t240 | 3.385 | 2026-10-27 | 3.328 (P0 — docs/KE_HOACH_KHO_KTGS.md) — cửa KHO cho KTGS: chotThang · theoNgay · bc37 / bc38 · t105Truoc · monGN |
| t241 | 3.385 | 2026-10-27 | 3.328 (anh chốt 23/10) — cây địa bàn dùng chung: mặc định kiểu ☰ Gọn mọi nơi (1 dòng ô sổ xuống Xã › Điểm › Hội › Tổ), đổi ▦ Chip; |
| t242 | 3.385 | 2026-10-27 | 3.328 (anh chốt 23/10) — cây địa bàn nhúng dùng chung CAY (js/57): 4 nơi chọn địa bàn trong form / hộp khai báo cùng 1 nguồn danh sách + 1 kiểu ô chọn |
| t243 | 3.385 | 2026-10-27 | 3.328 (anh chốt 23/10) — thanh bên 2 cấp (sổ lối vào DH_MUC + nhóm DH_NHOM) · Giao dịch xã = bàn thao tác gọi 👤 Tra cứu KH có sẵn · KTGS là mục con Số |
| t244 | 3.385 | 2026-10-27 | 3.333 (anh chốt 23–24/10) — QT-18 thành viên chuẩn (KHO.tvChuan) · Tra cứu KH khung cố định + khối Tổ & địa bàn (mã tổ, tổ trưởng + mã KH chép được, s |
| t245 | 3.385 | 2026-10-27 | 3.334 (RA_SOAT_BO_CUC_2410 Đợt 1) — bố cục máy tính: dải chip mẫu cuộn ngang + nút ‹ ›, 📅 Số liệu / ⚙ Khai báo dời xuống dòng tên mẫu, |
| t246 | 3.385 | 2026-10-27 | 3.335 (anh 24/10 — tham khảo app "Truy vấn thông tin") — Tra cứu KH: ô tìm + LỌC ĐỊA BÀN dải ngang toàn trang; chip "Tìm theo" (Tự nhận · Tên KH · Vợ/ |
| t247 | 3.385 | 2026-10-27 | 3.337 (anh 24/10) — Tra cứu KH: thẻ khách gọn trong 1 khung (3 cột Nhân thân │ Liên hệ · TK 105 │ Tổ, món vay chiếm phần còn lại), |
| t248 | 3.385 | 2026-10-27 | 3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2): 🩺 Sức khỏe sao lưu ở ⚙ Khai báo đơn vị › 💾 Sao lưu — mỗi đường lưu 1 dòng + màu theo tuổi |
| t249 | 3.385 | 2026-10-27 | 3.340 (anh duyệt 24/10, RA_SOAT_BO_CUC_2410 mục 8 việc 5): dữ liệu > 1 MB → thôi ghi bản sao localStorage mỗi lần lưu (đường "localStorage đầy" của 3. |
| t250 | 3.385 | 2026-10-27 | P1 🎯 PHÂN BỔ KH — lõi nghiệp vụ js/47-phan-bo.js (QT-15…17, docs/KE_HOACH_PHAN_BO_KH.md). Chạy bằng node, không cần trình duyệt. |
| t251 | 3.385 | 2026-10-27 | P1 🎯 PHÂN BỔ KH — cửa chung KHO.duNoAp(kỳ) (js/29-kho.js): dư nợ Mẫu 31 gộp xã × thôn × CT × nguồn. Chạy bằng node (giả slBo / SLM), dữ liệu GIẢ. |
| t252 | 3.385 | 2026-10-27 | 3.288 P2 🎯 PHÂN BỔ KH — giao diện tab con (js/48-phan-bo-gd.js) trên trình duyệt, bộ GIẢ tests/gianho31 (taogia.py 300 tests/gianho31 m31 — 2 kỳ Mẫu 3 |
| t253 | 3.385 | 2026-10-27 | 3.289 P3 🎯 BIỂU 07 PHÂN BỔ KH — mẫu js/mau/07pb.js + hộp xem trước (js/48) trên trình duyệt, bộ GIẢ tests/gianho31 + QĐ giả. |
| t254 | 3.385 | 2026-10-27 | 3.301 🔎 ĐỐI CHIẾU CHÉO phân bổ KH (anh 21/10: "tại mỗi QĐ tổng giao của Biểu 07 phải khớp số giao của QĐ và dư nợ đến cuối năm cũng khớp theo QĐ"; |
| t255 | 3.385 | 2026-10-27 | 3.301 📈 DIỄN BIẾN PHÂN VỐN THEO KH (anh 21/10) — pbDienBien (js/47) + màn thẻ số / biểu đồ SVG / dòng thời gian / bảng xã (js/48), bộ GIẢ tests/gianho |
| t256 | 3.385 | 2026-10-27 | 3.308 🎯 PHÂN BỔ KH — điều hướng + sửa lỗi rà soát (anh 21/10): thanh tab ngang 4 mục (nhớ mục, phím 1 – 4, số đỏ lệch), chọn nhanh QĐ · xã, |
| t257 | 3.385 | 2026-10-27 | 3.347 (anh 24/10: "kiểu bù này chỉ tính cho cuối tháng" · "làm trước tra cứu theo ngày không cần bù mẫu") — tvChuan kỳ ngày không bù Mẫu 01/TV; Tra cứ |
| t258 | 3.385 | 2026-10-27 | 3.348 (RA_SOAT_BO_CUC_2410 mục 8 việc 6) — 📜 Nhật ký đã lập / in: hàng nút xuất chung ghi dòng (mẫu, cách, khách, tổ, kỳ), lấy tiêu đề khi thiếu tên,  |
| t259 | 3.385 | 2026-10-27 | 3.355 (KE_HOACH_DANG_KY đợt N1) — nền báo cáo bảng DANG_KY: nút ở tab Sao kê, báo cáo mẫu "Danh sách nợ cần xử lý" (lấy dòng qua KHO), chọn loại / nhó |
| t260 | 3.385 | 2026-10-27 | t260 (TK 3, 24/10 — RA_SOAT_BO_CUC_2410 mục 8 việc 1): PHÉP THỬ ẢNH BỐ CỤC — mở từng tab ở 2 cỡ màn máy tính (1366, 1440) + bản điện thoại dt.html (iP |
| t262 | 3.385 | 2026-10-27 | t262 (TK 3, 3.342 — KE_HOACH_DIEN_THOAI_2 bước Đ0, anh chốt 24/10): bản điện thoại tạm bỏ PIN (mở thẳng, không tự khóa, số liệu vẫn mã hóa trong máy), |
| t263 | 3.385 | 2026-10-27 | t263 (TK 3, 3.343 — KE_HOACH_DIEN_THOAI_2 bước Đ1; anh 24/10 "tra cứu KH của TK 2 đang làm rất ổn, em dựa vào đó làm bản cho điện thoại"): |
| t264 | 3.385 | 2026-10-27 | t264 (TK 3, 3.344 — KE_HOACH_DIEN_THOAI_2 bước Đ2; 3.374 anh 26/10 "chỉ xem khi có mạng" → bỏ 📌 ghim): Văn bản trên điện thoại — chip Tất cả · năm · l |
| t265 | 3.385 | 2026-10-27 | t265 (TK 3, 3.354 — anh 24/10: "tối ưu tab hôm nay bao gồm lịch và ghi chú trước"; "giao diện tương tự máy tính nhưng lược bỏ các chức năng phức tạp") |
| t266 | 3.385 | 2026-10-27 | t266 (TK 3, 3.367 — anh 25/10): ① "mã điểm giao dịch ghi đầy đủ có TXN" — tab Giao dịch xã, mẫu 12/GDX, bản mini lấy mã đủ TXN… từ danh mục địa bàn kh |
| t267 | 3.385 | 2026-10-27 | t267 (TK 3, 3.371 — PHOI_HOP mục 6 G3, anh 25/10 "làm tiếp văn bản và scan"): tab Văn bản + Scan của bản máy tính trên điện thoại (css/dt-may-vbsc.css |
| t268 | 3.385 | 2026-10-27 | t268 (TK 3, 3.373 — anh 26/10 "báo chưa nối được drive gì tùm lum rối quá", "điện thoại và máy tính phải thống nhất, điện thoại chỉ gọn hơn"): |
| t269 | 3.385 | 2026-10-27 | t269 (TK 3, 3.373 — RA_SOAT_BO_CUC_2510 Đợt A ① ② ③ ⑥, anh 26/10 "gom làm 1 lần"): js/69-bo-cuc-a.js (cắm rút) — khung xem phải thu khi chưa chọn mục, |
| t270 | 3.385 | 2026-10-27 | t270 (TK 3, 3.376 — anh 26/10: "scan cccd … nắn cắt ảnh tương đối lâu, chữ hiện cảnh báo che nút", "chip trắng có khi che nút xem trước"): |
| t271 | 3.385 | 2026-10-27 | t271 (TK 3, 3.377 — anh 26/10 "code báo trùng", "đo tốc độ ở đâu", "nút mở đóng khung xem trước scan làm tương tự bên vb"): |
| t272 | 3.385 | 2026-10-27 | t272 (TK 3, 3.378 — anh 26/10 "nhận xét, tồn tại, kiến nghị cho chọn 3 phần riêng, tự ghi theo số liệu hay để chấm"; "Bảng II chỉ để trống, không chấm |
| t273 | 3.385 | 2026-10-27 | t273 (TK 3, 3.379 — anh 26/10 "tóm tắt tình hình tổ … trong 1 mặt A4, để cán bộ đi kiểm tra có thông tin"; "nhớ ghi số liệu đến ngày"). |
| t274 | 3.385 | 2026-10-27 | t274 (TK 3, 3.380 — anh 26/10 "data dựng sẵn từ Mẫu 31, TK 105 và tổ"; "cột số tiền KH đã CK vào riêng, cột CK trả lãi và gốc"; "ký hiệu theo dõi"). |
| t275 | 3.385 | 2026-10-27 | t275 (TK 3, 3.381 — anh 26/10 "khi nạp dữ liệu dùng khóa liên kết thành 1 data hoàn chỉnh, mọi truy vấn lấy qua kho; data chuẩn lấy nguyên bản Mẫu 31, |
| t276 | 3.385 | 2026-10-27 | t276 (TK 3, 3.382 — anh 26/10 "mọi truy vấn lấy qua kho"): BẢN CHỤP KẾT QUẢ các báo cáo Sao kê (mọi báo cáo), tab Tổ (ds · no · tk · ct), Tổng hợp, ki |
| t277 | 3.385 | 2026-10-27 | t277 (TK 3, 3.383 — anh 26/10): bộ lọc địa bàn chung — thêm Ấp / KP, lọc đa chiều (Xã + Hội, Xã + Ấp, Hội toàn PGD, Hội + Ấp), mỗi ô có "— Tất cả —" + |
| t278 | 3.385 | 2026-10-27 | t278 (TK 3, 3.383.7 — anh 27/10): bộ lọc địa bàn — đổi cấp cao → cấp thấp về Tất cả (Điểm GD · Hội · Ấp ngang cấp giữ nhau), dải tiêu đề LỌC ĐỊA BÀN |
| t279 | 3.385 | 2026-10-27 | t279 (TK 3, 3.385 — anh 27/10): SAO KÊ THEO NHÀ ĐẦU TƯ (tab Sao kê, báo cáo 'ndt') — ô chọn NĐT sổ sẵn mọi mã trong Mẫu 31 (mã trống = vốn TW), |
| t300 | 3.385 | 2026-10-27 | 3.357 (KE_HOACH_CHOT_SO đợt C1) — Sổ tổ viên / chốt sổ 31/12: nút ở tab Tổ TK&VV, dòng = tổ viên tvChuan (Mẫu 31 + bù Mẫu 01/TV cùng tháng), kỳ tháng  |
| t301 | 3.385 | 2026-10-27 | 3.358 (KE_HOACH_CHOT_SO đợt C2) — năm sau dùng sổ chốt 31/12: khách TƯ còn giữ (01/TV) mà Mẫu 31 năm nay không còn → tra sổ chốt tháng 12 năm trước (n |
| t302 | 3.385 | 2026-10-27 | 3.359 (KE_HOACH_CHOT_SO đợt C3) — 📅 dòng thời gian khách / tổ trong năm: tóm Mẫu 31 từng tháng (qua KHO), sự kiện vào / ra / chuyển tổ, tất nợ, vay th |
| t303 | 3.385 | 2026-10-27 | 3.361 (KE_HOACH_DIEN_THOAI_MAY Đ1) — bản máy tính trên điện thoại: css/dt-may.css chỉ nạp ở màn ≤ 600 px (cắm rút), đầu trang gọn 2 hàng, không tràn n |
| t304 | 3.385 | 2026-10-27 | 3.362 (KE_HOACH_DIEN_THOAI_MAY Đ2) — bản máy tính trên điện thoại: thẻ khách món vay thành thẻ dọc (CSS, có nhãn), ô kỳ chữ gọn "T8/26 · M31" (giá trị |
| t305 | 3.385 | 2026-10-27 | 3.363 (TU_VAN_KY_THUAT mục 5) — ⚠ nhật ký lỗi tự động: bắt lỗi chạy + lời hứa bị từ chối, lưu trên máy (localStorage, cộng dồn lỗi trùng), chip "⚠ N l |
| t306 | 3.385 | 2026-10-27 | 3.364 (KE_HOACH_DIEN_THOAI_MAY Đ3) — bản máy tính trên điện thoại, tab Hôm nay gọn 1 cột: ô lịch thấp, sổ ngày lên trong màn hình đầu, |
| t307 | 3.385 | 2026-10-27 | 3.365 (KE_HOACH_DIEN_THOAI_MAY Đ4) — Số liệu › Tổ TK&VV: bảng vuốt ngang, ô tiêu đề góc (cột tên đứng yên) nằm trên các ô tiêu đề khác |
| t308 | 3.385 | 2026-10-27 | 3.366 (KE_HOACH_DIEN_THOAI_MAY Đ5) — khung xem trước bản in: điện thoại — thanh 1 hàng vuốt ngang, nút ≥ 34 px, bỏ ⏮ ⏭; |
| t309 | 3.385 | 2026-10-27 | 3.368 (anh 25/10 "ds tổ có cột bị khuất") — Tra cứu › Tổ trưởng: danh sách tổ chia cột theo tỷ lệ khung → đủ 7 cột không cuộn ngang |
| t310 | 3.385 | 2026-10-27 | 3.369 (tối ưu nạp — phương án A anh duyệt 25/10): slNen / slMoBang viết lại cho nhanh phải cho KẾT QUẢ Y HỆT thuật toán cũ |
| t311 | 3.385 | 2026-10-27 | 3.372 (KE_HOACH_DIEN_THOAI_MAY Đ6, anh 25/10: "Hôm nay, Văn bản, Tra cứu KH là 3 tab chính", ô 4 = Scan) — bản máy tính trên điện thoại: |

Tổng 192 phép đã chốt / 192 phép thử.
