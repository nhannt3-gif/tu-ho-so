# BẢN ĐỒ MÃ (tự sinh bởi `tests/bando.py`, đừng sửa tay)

Bản 3.511 · 10/11/2026 11:03 · 150 file · 47058 dòng · 3768 hàm cấp ngoài · 642 biến toàn cục.

Cách dùng: tìm file / mục dưới đây rồi `grep -n "function tênHàm" js/*.js` hoặc đọc đúng khoảng dòng (Read offset/limit). Thứ tự nạp = thứ tự bảng 1 (đúng như các khối <script> trước khi tách). `python3 tests/ghep.py ra.html` ghép lại 1 file. Số dòng đổi theo bản — chạy lại script khi cần.


## 1. Các file (thứ tự nạp)

| File | Số dòng | Số hàm | Mở đầu |
|---|---|---|---|
| `index.html` | 334 | 0 | Khung trang (thẻ HTML tĩnh) + thẻ nạp css / js |
| `css/app.css` | 4103 | 0 | :root{ box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); |
| `css/dt-may.css` | 127 | 0 | /*   3.361 (docs/KE_HOACH_DIEN_THOAI_MAY.md — đợt Đ1: khung chung) — BẢN MÁY TÍNH TRÊN ĐIỆN THOẠI   Cắm rút: c |
| `css/dt-may-vbsc.css` | 37 | 0 | /*   3.371 (TK 3 — PHOI_HOP mục 6 G3; anh 25/10 "làm tiếp văn bản và scan", "giao diện tương tự máy tính nhưng |
| `js/01-thu-vien.js` | 68 | 4 | /*   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được Lần đầu có mạng: tải về và cất vào máy. |
| `js/02-nen.js` | 379 | 29 | /*   TỦ HỒ SƠ — bản 1.0  (giai đoạn 1) Cấu trúc file: |
| `js/03-doc-pdf.js` | 638 | 46 | /*   4. ĐỌC PDF & RÚT THÔNG TIN   */  function sanSangPDF(){ |
| `js/04-giao-dien.js` | 115 | 12 | /*   6. VẼ GIAO DIỆN   */ var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', l |
| `js/04b-hom-nay.js` | 702 | 91 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 117–2633 của bản 3.33 |
| `js/04b2-hom-nay-ghi-chu.js` | 771 | 77 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): HÔM NAY — ghi chú 2 chế độ · sổ gạch dòng (to-do) · ho |
| `js/04b3-hom-nay-lich-viec.js` | 951 | 69 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): HÔM NAY — câu chữ & ngày này năm xưa · can chi, giờ ho |
| `js/04c-van-ban-thang.js` | 1005 | 81 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 2634–3608 của bản 3.3 |
| `js/04d-bo-ho-so.js` | 275 | 23 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 3609–3880 của bản 3.3 |
| `js/04e-chung.js` | 292 | 25 | /*   3.399 (anh 28/10: "theo dõi nợ tạm thời bỏ, xóa code rác, sẽ phát triển sau cho gọn" · "gỡ luôn cho gọn c |
| `js/05-them-file.js` | 1394 | 72 | /*   7. THÊM FILE & DUYỆT TÊN   */ var dangDoc = false; |
| `js/06-hop-thoai.js` | 1357 | 106 | /*   HỘP THOẠI CHUNG   */ var hamDong = null, khoaHop = false; function moHop(html, rong){ |
| `js/06a-dong-bo-cai-dat.js` | 961 | 53 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): đồng bộ mục lên file thật trên Drive · xóa / thùng rác |
| `js/06b-xoa-nhieu.js` | 226 | 25 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/06-hop-thoai.js (dòng 2218–2421 của bản 3.3 |
| `js/06c-drive.js` | 717 | 38 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/06-hop-thoai.js (dòng 2422–3118 của bản 3.3 |
| `js/07-cccd.js` | 194 | 14 | /*   12. HỒ SƠ CCCD - 3.32: KHÔNG mã hóa nữa (anh Nhân chốt: Drive của anh là nơi lưu bảo mật). |
| `js/08-dia-ban.js` | 602 | 50 | /*   danh mục địa bàn: Xã/phường → Điểm GD → Ấp/KP → Tổ   */ function dsXa(){ return (D.cauHinh.diaBan//[]).ma |
| `js/09-bieu-mau.js` | 573 | 45 | /*   13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền Xếp theo chương trình vay; có nhóm dùng chung và th |
| `js/10-danh-sach.js` | 1268 | 93 | /*   14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI   */ |
| `js/11-khung-tab.js` | 617 | 54 | /*   17. KHUNG CHUẨN CHO MỌI TAB Ba phần giống nhau ở mọi tab: |
| `js/12-scan.js` | 972 | 79 | /*   18. SCAN HỒ SƠ — máy scan trong app Hai chế độ: |
| `js/12b-scan-dien-thoai.js` | 617 | 54 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): SCAN — điện thoại kiểu Lens · máy bàn 💾 Lưu nhanh / 📋  |
| `js/12c-scan-camera-drive.js` | 385 | 36 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): SCAN — camera trong app · đồng bộ Drive (mở app, rời a |
| `js/12d-scan-ocr-cau-noi.js` | 700 | 47 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): SCAN — đọc chữ PDF ảnh (OCR) · đọc lại theo bố cục · c |
| `js/13-xu-ly-anh.js` | 435 | 34 | /*   3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu) Tự động trước: tìm |
| `js/14-tim-loc.js` | 178 | 14 | /*   19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER Gõ vào ô tìm → app gợi ý "Nghiệp vụ: Xử lý rủi |
| `js/15-ai-chuan-hoa.js` | 161 | 8 | /*   15. NHỜ AI CHUẨN HÓA Xuất danh sách ra bảng → anh đưa AI (Gemini, ChatGPT, Claude) |
| `js/16-ai-dan-ket-qua.js` | 230 | 10 | /*   16. DÁN KẾT QUẢ TỪ AI Anh chép nguyên đoạn Gemini trả về, app tự đọc ra số hiệu, ngày, |
| `js/17-dong-bo-cai-dat.js` | 435 | 40 | /*   ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE   */ /* 3.113 (anh chốt: app cá nhân → lưu lên Drive hết): đồng bộ TOÀN BỘ cài  |
| `js/17b-so-cai-dat.js` | 95 | 6 | /*   3.260 (R4 phần 2 — docs/KE_HOACH_CHUAN_HOA.md mục 3.6): SỔ ĐĂNG KÝ CÀI ĐẶT — mọi khóa D.cauHinh app dùng, |
| `js/18-cai-dat.js` | 406 | 20 | /*   20. CÁC HÀM CÀI ĐẶT — bản dựng lại   */ |
| `js/19-danh-muc.js` | 222 | 23 | /*   21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU Một bộ sửa dùng chung cho: Mảng · Chương trình |
| `js/20-khoi-dong.js` | 139 | 4 | /*   KHỞI ĐỘNG   */ function capNhatDau(){ document.getElementById('donvi').textContent = |
| `js/21-ngay-gy.js` | 38 | 3 | /* 3.135 — anh Nhân: mọi ô chọn ngày ghi rõ kiểu ngày/tháng/năm (trình duyệt tiếng Anh hiện tháng/ngày → dễ nh |
| `js/22-so-lieu.js` | 1212 | 125 | /* 3.235 (R3): file này giữ phần lõi; các khối khác tách sang js/22b…22i (nạp ngay sau theo thứ tự tên) + khuô |
| `js/22b-ktgs.js` | 767 | 109 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1102–1816 của bản 3.234), không  |
| `js/22c-ktgs-m06.js` | 446 | 60 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1817–2251 của bản 3.234), không  |
| `js/22d-ktgs-04.js` | 717 | 102 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2252–2945 của bản 3.234), không  |
| `js/22e-ktgs-kh.js` | 604 | 87 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2946–3477 của bản 3.234), không  |
| `js/22f-tra-cuu.js` | 353 | 40 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 3486–4545 của bản 3.234), không  |
| `js/22g-to.js` | 499 | 58 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 4546–5436 của bản 3.234), không  |
| `js/22ga-pham-vi.js` | 226 | 29 | /* Tủ hồ sơ — bộ chọn phạm vi / cây địa bàn dùng chung mọi tab (tách nguyên văn khỏi 22g-to.js ở 3.346 — K5).  |
| `js/22gb-to-giao-dien.js` | 347 | 55 | /* Tủ hồ sơ — giao diện tab 👥 Tổ TK&VV: vẽ tab, thẻ tổ, chip lọc, bảng cột, in / Excel danh sách (tách nguyên  |
| `js/22h-cap-hoi-sao-ke.js` | 675 | 88 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 5437–6227 của bản 3.234), không  |
| `js/22i-tong-hop.js` | 604 | 43 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 6228–6963 của bản 3.234), không  |
| `js/22j-thong-tin-to.js` | 298 | 39 | /*   3.259 → 3.263 (anh chốt 18–19/10) — 📒 Sao kê › nhóm "Thông tin tổ" (theo file tổng hợp anh dùng hằng thán |
| `js/22k-nap-kt.js` | 1113 | 98 | /* Tủ hồ sơ — tab 📥 Nạp & KT (tách khỏi 22f-tra-cuu.js ở 3.346, nguyên văn): tóm tắt kỳ, ma trận file, kiểm tr |
| `js/23-dieu-huong.js` | 202 | 27 | /*   3.147 (đợt F, anh duyệt 10/10/2026): THANH BÊN ĐIỀU HƯỚNG — máy tính màn ≥ 1100 px   - Chỉ đổi cách đi gi |
| `js/24-xuat.js` | 156 | 14 | /*   3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG Mọi mẫu / báo cáo: 👁 Xem → hàng nút  |
| `js/25-ho-so.js` | 460 | 56 | /*   3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY Hai tab con của Số liệu |
| `js/25b-ho-so-vay.js` | 690 | 87 | /*   3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): HỒ SƠ VAY — mẫu 01/TD · 03/TD · 04/TD · 09A/TD · 01/UQ |
| `js/25c-ho-so-giao-dien.js` | 912 | 137 | /*   3.411 (A2 — tách file lớn): HỒ SƠ — giao diện tab · 🏠 hộ vay mới · 📒 Sổ hộ vay · 03/TD nhiều hộ · GQVL ·  |
| `js/26-giao-dich-xa.js` | 1158 | 138 | /*   3.172 (anh chốt 11/10/2026): 🏢 GIAO DỊCH XÃ — in nhanh 04/TD + 12/GDX, KHÔNG cần số liệu hộ vay   - Mẫu i |
| `js/26b-gdx-4368.js` | 330 | 33 | /*   3.493 (anh 07/11/2026 "các mẫu nào dựng nhanh đơn giản em cứ dựng theo đúng chuẩn gắn mẫu đã làm — mẫu 12 |
| `js/26c-gdx-to.js` | 223 | 31 | /*   js/26c-gdx-to.js — 3.497 (tách từ js/26b, QUY_CHUAN 1.3 "tách dữ liệu – nghiệp vụ – giao diện"; không đổi |
| `js/27-mini-gdx.js` | 324 | 8 | /*   3.177 (anh chốt 13/10/2026): 📦 MINI APP Giao dịch xã — 1 file HTML gửi đồng nghiệp, có thời hạn   - Nút " |
| `js/28-tv-tk.js` | 398 | 43 | /*   3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ ① Mẫu 01/TV — Danh sách thành viên tổ (t |
| `js/29-kho.js` | 178 | 2 | /*   3.216 (anh 15/10/2026): CỬA KHO — kho số liệu chung (KIEN_TRUC_3_LOP 3.5 · QUY_CHUAN_KIEN_TRUC mục 3 "cửa |
| `js/30-khai-bao.js` | 28 | 2 | /*   3.222 (anh 16/10/2026, phương án B): ⚙ KHAI BÁO ĐƠN VỊ — 1 cửa sổ dùng chung mọi tab   - Mở từ nút "⚙ Kha |
| `js/31-o-mau.js` | 297 | 67 | /*   3.223 M3 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9): NỀN Ô MẪU — "OM"   Mỗi chỗ chấm trên  |
| `js/31b-mau-in.js` | 87 | 0 | /*   js/31b-mau-in.js — 3.503 (anh duyệt 08/11/2026 "làm đợt tiếp theo, gom 1 lần" — rà soát kiến trúc Đợt 2 m |
| `js/32-kho-luu.js` | 107 | 8 | /*   3.223 M1 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): CỬA LƯU KHO1 + LƯU AN TOÀN B1   - B |
| `js/33-so-ho-them.js` | 48 | 7 | /*   3.223 M2 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON mục 0.8): SỔ HỘ VAY ĐỦ CỘT   - Rà ngược các ô của mẫu gố |
| `js/34-luu-ngan.js` | 181 | 3 | /*   3.223 M8 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): LƯU THEO NGĂN TRONG IndexedDB (bước |
| `js/35-scan.js` | 147 | 9 | /*   3.224 (anh chốt 17/10/2026 — docs/KE_HOACH_3224_SCAN.md): QUY TRÌNH SCAN MỚI — 1 luồng chuẩn, cắm / rút   |
| `js/36-dong-bo-khoi.js` | 188 | 22 | /*   3.225 (anh chốt 17/10/2026 — docs/KE_HOACH_3225_LUU.md): ĐỒNG BỘ DRIVE THEO KHỐI   Khối (danh sách): vanb |
| `js/37-kiem-ho.js` | 200 | 23 | /*   3.228 (anh 17/10/2026): 🔎 KIỂM TRA HỘ VAY — luật logic khi nhập hộ, KHAI BÁO ĐƯỢC (bật / tắt · mức · ngưỡ |
| `js/38-goi-xem.js` | 71 | 11 | /*   3.231 (anh duyệt 17/10/2026 — KE_HOACH_CHUAN_HOA mục 8–9): 📱 GÓI SỐ LIỆU XEM cho bản điện thoại   Máy tín |
| `js/39-gd.js` | 93 | 0 | /*   3.234 (R2 — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): GIAO DIỆN CHUNG "GD" + ĐIỀU HƯỚNG "DH"   - Bộ nhận lệnh:  |
| `js/40-lap-01td.js` | 113 | 0 | /*   3.242 (anh 17/10 — KE_HOACH_CHUAN_HOA mục Hồ sơ vay hướng B, ý 1–19): FORM LẬP 01/TD   Cột trái tab 01/TD |
| `js/41-scan-sap-xep.js` | 612 | 57 | /*   3.264 (anh chốt 20/10/2026) — 🗂 LƯU SCAN TẬP TRUNG · 🧹 SẮP XẾP · 📊 KIỂM TRA · 📇 ĐỌC CCCD (QR / 3 dòng mã  |
| `js/42-scan-ra-soat.js` | 323 | 31 | /*   3.268 (anh chốt 20/10/2026) — 🔎 RÀ CCCD ĐÃ LƯU · BẢN TRÙNG - Anh: "có nên có bước chạy kiểm tra các CCCD  |
| `js/43-scan-anh-drive.js` | 357 | 30 | /*   3.271 (anh chốt 20/10/2026) — 🖼 ẢNH 2 MẶT CCCD LÊN DRIVE · CẮT ẢNH TỪ PDF CŨ · BẢNG ĐỐI CHIẾU · CMND 9 SỐ |
| `js/44-quet-cccd-form.js` | 144 | 19 | /*   3.273 (anh duyệt 20/10/2026: "cạnh ô nhập họ tên sẽ là 1 nút quét, khi bấm sẽ mở cam hoặc quét từ ảnh CCC |
| `js/45-tra-mau31.js` | 223 | 20 | /*   3.275 (anh 20/10/2026: "khi mở 1 file lên chỉnh sửa hay lưu mới anh sẽ đánh số CCCD hoặc họ tên hoặc mã K |
| `js/46-quan-ly-scan.js` | 140 | 9 | /*   3.278 (rà soát tab Scan 20/10 — anh: "em cứ code theo ý em và gộp lên"): BỐ CỤC GỌN - Thanh tab Scan: 1 n |
| `js/47-phan-bo.js` | 535 | 57 | /*   P1 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md): 🎯 PHÂN BỔ KẾ HOẠCH — LÕI NGHIỆP VỤ (tiền tố pb)   |
| `js/48-phan-bo-gd.js` | 898 | 94 | /*   P2 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 5): 🎯 PHÂN BỔ KH — GIAO DIỆN tab con trong 📈 Số |
| `js/48b-phan-bo-db.js` | 282 | 29 | /*   js/48b-phan-bo-db.js — 📈 DIỄN BIẾN PHÂN VỐN THEO KH (tách khỏi js/48 ở 3.471 cho file < 150 KB; lệnh pb.d |
| `js/48c-pb-to-trinh.js` | 88 | 12 | /*   js/48c-pb-to-trinh.js — 3.494 (anh 07/11/2026, QĐ 4686): 📤 TỜ TRÌNH ĐIỀU CHỈNH KH — Biểu 09/KH (QUY TRÌNH |
| `js/49-ten-chuan.js` | 34 | 5 | /*   3.295 — SỔ QUY TẮC TÊN + NƠI LƯU HỒ SƠ THEO KHÁCH (lớp Nghiệp vụ, dùng chung) — bước 1 `docs/KE_HOACH_TEN |
| `js/50-xuat-khach.js` | 117 | 13 | /*   3.304 — CHỮ KÝ GẮN CÙNG CCCD + XUẤT FILE THEO KHÁCH (lớp Nghiệp vụ + Giao diện tab Scan) Anh 21/10/2026:  |
| `js/51-chu-ky.js` | 194 | 8 | /*   3.306 — CHỮ KÝ / LĂN TAY: NHẬN DẠNG, DỌN BẢN QUÉT NHẦM, BỎ ẢNH KHÁCH LƯU SẴN, NÚT BẢN PHOTO 2 MẶT (lớp Ng |
| `js/52-loc-photo.js` | 91 | 11 | /*   3.307 — CHẾ ĐỘ LỌC CHO BẢN PHOTO (lớp Nghiệp vụ xử lý ảnh, dùng chung Scan) Anh 21/10/2026: "tinh chỉnh t |
| `js/53-giay-nop.js` | 104 | 8 | /*   3.312 (anh 22/10/2026 gửi bản scan Giấy nộp tiền NHCSXH — "tạo mẫu tương tự Giấy lĩnh tiền kèm bảng kê nộ |
| `js/mau/01td.js` | 101 | 0 | /*   3.223 M4 — MẪU 01/TD trên nền ô (js/31-o-mau.js) — dựng theo file gốc tests/mau_goc/01td.docx   Lề 10 / 1 |
| `js/mau/01uq.js` | 66 | 0 | /*   3.223 M4 — MẪU 01/UQ Giấy ủy quyền trên nền ô — dựng theo file gốc tests/mau_goc/01uq.docx (VB 10493, áp  |
| `js/mau/03td.js` | 54 | 0 | /*   3.223 M5 — MẪU 03/TD Danh sách tổ viên đề nghị vay vốn trên nền ô — dựng theo file gốc tests/mau_goc/03td |
| `js/mau/09a.js` | 89 | 0 | /*   3.223 M5 — MẪU 09A/TD Giấy đề nghị gia hạn nợ trên nền ô — dựng theo file gốc tests/mau_goc/09a.docx (QĐ  |
| `js/mau/0hsn.js` | 124 | 0 | /*   3.461 (anh 03/11/2026) — PHẦN CHUNG chọn món nợ của tổ cho mẫu kiểm tra hộ vay (06A/TD, Biên bản làm việc |
| `js/mau/06a.js` | 140 | 0 | /*   3.430 (anh chốt 01/11/2026) — MẪU 06A/TD Phiếu kiểm tra sử dụng vốn vay (727) trên nền ô — dựng theo file |
| `js/mau/bblv.js` | 239 | 0 | /*   3.461 (anh 03/11/2026) — BIÊN BẢN LÀM VIỆC: xác minh, đánh giá khoản nợ của hộ vay (nợ quá hạn, nợ khoanh |
| `js/mau/01tdck.js` | 53 | 0 | /*   3.223 M5 — MẪU 01/TĐCK Giấy đề nghị thay đổi mẫu chữ ký giao dịch trên nền ô — dựng theo file gốc tests/m |
| `js/mau/01tgtv.js` | 123 | 0 | /*   3.223 M5 — MẪU 01/TGTV Giấy đăng ký mở tài khoản tổ viên trên nền ô   BỐ CỤC GIỮ NGUYÊN 3.218–3.219 (anh  |
| `js/mau/01gqvl.js` | 160 | 0 | /*   3.223 M5 — MẪU 01/GQVL Phương án sử dụng vốn vay (người lao động) trên nền ô — dựng theo file gốc tests/m |
| `js/mau/07b.js` | 183 | 0 | /*   3.223 M5 — MẪU 07b/GQVL Hợp đồng tín dụng (người lao động) trên nền ô — dựng theo file gốc tests/mau_goc/ |
| `js/mau/0pb.js` | 35 | 10 | /*   js/mau/0pb.js — 3.497 (QUY_CHUAN 9.4 "mẫu không gọi mẫu khác"): PHẦN CHUNG CÁC MẪU PHÂN BỔ KH   Tách nguy |
| `js/mau/07pb.js` | 57 | 3 | /*   3.289 P3 (anh Nhân 21/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 6): BIỂU 07 PHÂN BỔ KH — mẫu in dựng theo |
| `js/mau/07kh.js` | 133 | 12 | /*   3.494 (anh 07/11/2026 — QĐ 4686/QĐ-NHCS ngày 21/10/2026 "Quy định về xây dựng và tổ chức thực hiện kế hoạ |
| `js/54-tgtv-khai.js` | 163 | 15 | /*   3.315 (anh 22/10 "làm hoàn chỉnh 01TGTV in bằng 2 cách: lấy từ Mẫu 31 hoặc in nhanh tự khai, khai nhanh t |
| `js/56-ktgs-bo.js` | 110 | 20 | /*   3.327 — KTGS bước 1 (docs/KE_HOACH_KTGS_GON.md mục 2.4, 3): 2 BỘ KHAI BÁO CỐ ĐỊNH (anh chốt 23/10)   ① Hộ |
| `js/56b-ktgs-727.js` | 150 | 14 | /*   js/56b-ktgs-727.js — 3.498 (anh 07/11/2026 "VB 727 còn 2 mẫu này em đưa vào phần kiểm tra giám sát"): 🛡 K |
| `js/57-cay.js` | 34 | 0 | /*   3.328 (anh chốt 23/10): CÂY ĐỊA BÀN NHÚNG — 1 chỗ lấy danh sách Xã › Điểm GD › Ấp › Hội › Tổ và vẽ ô chọn |
| `js/58-tc-to.js` | 210 | 22 | /*   3.333 (anh chốt 23–24/10): TRA CỨU KH — KHỐI TỔ + BẢNG TỔ CỦA ĐIỂM GD (kết nạp) - Khi duyệt hồ sơ: tra kh |
| `js/58b-tc-to-in.js` | 39 | 0 | /*   js/58b-tc-to-in.js — 3.505 (anh 09/11/2026 "cần xuất nhanh ds tổ có xã, điểm theo ds lọc khi cần, A4 dọc, |
| `js/59-suc-khoe.js` | 34 | 7 | /*   3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2 — anh 24/10 "cứ theo KH làm"): 🩺 SỨC KHỎE SAO LƯU Thẻ ở ⚙ Khai bá |
| `js/60-ve-dt.js` | 12 | 0 | /*   3.342 (TK 3): NÚT 📱 SANG BẢN GỌN dt.html — 3.367 (anh 25/10 "bản chính như máy tính, điện thoại là bản ph |
| `js/61-nhat-ky-in.js` | 52 | 9 | /*   3.348 (RA_SOAT_BO_CUC_2410 mục 8 việc 6 — góp ý 7.1): NHẬT KÝ ĐÃ LẬP / ĐÃ IN   - Mỗi lần bấm 🖨 In · 📄 PDF |
| `js/62-dang-ky.js` | 145 | 15 | /*   3.355 (KE_HOACH_DANG_KY — đợt N1, anh 24/10: "chưa có mẫu nào bắt buộc… em cứ tạo 1 cái nền sẵn, sau này  |
| `js/63-bao-cao-toi.js` | 122 | 12 | /*   3.356 (KE_HOACH_DANG_KY — đợt D5): 🧩 BÁO CÁO CỦA TÔI — anh tự khai báo cáo bảng, không sửa code   Anh chố |
| `js/64-so-to-vien.js` | 60 | 8 | /*   3.357 (KE_HOACH_CHOT_SO — đợt C1): SỔ TỔ VIÊN / CHỐT SỔ 31/12   Anh 24/10: "theo em, tiếp tục Mẫu 01/TV — |
| `js/65-dong-thoi-gian.js` | 78 | 10 | /*   3.359 (KE_HOACH_CHOT_SO — đợt C3): 📅 DÒNG THỜI GIAN KHÁCH / TỔ TRONG NĂM   QUY_CHUAN_KIEN_TRUC mục 8 điểm |
| `js/66-dt-may.js` | 34 | 2 | /*   3.362 (docs/KE_HOACH_DIEN_THOAI_MAY.md — Đ2): BẢN MÁY TÍNH TRÊN ĐIỆN THOẠI — phần cần JS   Cắm rút: chỉ c |
| `js/67-nhat-ky-loi.js` | 53 | 7 | /*   3.363 (docs/TU_VAN_KY_THUAT.md mục 5 — anh 25/10 "Ok em làm tiếp"): ⚠ NHẬT KÝ LỖI TỰ ĐỘNG   - Bắt mọi lỗi |
| `js/68-do-toc-do.js` | 60 | 7 | /*   3.372 (KE_HOACH_DIEN_THOAI_MAY — Đ6 mục 5, anh duyệt 25/10: "drive nạp rất lâu"): ⏱ ĐO TỐC ĐỘ TRÊN MÁY TH |
| `js/69-bo-cuc-a.js` | 71 | 0 | /*   3.373 (TK 3 nhận bàn giao — RA_SOAT_BO_CUC_2510 Đợt A việc ① ② ③ ⑥; anh 26/10 "còn gì nữa gom làm 1 lần l |
| `js/70-bao-trung-cccd.js` | 52 | 5 | /*   3.377 (anh 26/10 "kiểm tra 1 số cccd scan rồi lưu nữa hay đọc có báo trùng hay ko" → "code báo trùng") —  |
| `js/71-ktgs-tom-tat.js` | 79 | 6 | /* 3.379 (anh 26/10 "khi chọn kiểm tra đột xuất tổ nào đó thì thêm 1 chức năng tóm tắt tình hình tổ, từ tổng q |
| `js/72-ho-vay.js` | 67 | 8 | /* 3.380 (anh 26/10 "nên có 1 data dựng sẵn từ kết hợp Mẫu 31, TK 105 và tổ"; "1 cột số tiền KH đã CK vào riên |
| `js/73-kho-chuan.js` | 40 | 9 | /* 3.381 (anh 26/10): KHO CHUẨN — "khi nạp dữ liệu, em dùng khóa có thể để liên kết với nhau thành 1 data hoàn |
| `js/74-sk-ndt.js` | 87 | 8 | /* 3.385 (anh 27/10): SAO KÊ THEO NHÀ ĐẦU TƯ — tab Sao kê (báo cáo 'ndt'). Anh: "làm thêm 1 sao kê theo mã nhà |
| `js/74b-sk-ct.js` | 60 | 0 | /*   js/74b-sk-ct.js — 3.506 (anh 09/11/2026 "thêm chức năng sao kê danh sách theo chương trình vay"): SAO KÊ  |
| `js/75-khuon-in.js` | 8 | 2 | /* 3.387 (anh 27/10 "mẫu biểu tập trung"): KHUÔN IN CHUNG cho báo cáo tab Số liệu (Tổ · Sao kê · Tổng hợp) — 1 |
| `js/76-sk-danh-sach.js` | 213 | 7 | /*   3.392 (TK 2 — BAN_GIAO_TK3_2710 mục 6 "chuyển dần báo cáo còn trong skBaoCao sang lap()"): báo cáo Sao kê |
| `js/77-bang-loc.js` | 51 | 4 | /*   3.396 (anh 28/10, ảnh Tra cứu KH › Tìm theo Tổ trưởng: "làm bộ lọc và sắp xếp của các cột này") — LỌC + S |
| `js/78-ktgs-gon.js` | 35 | 3 | /*   3.397 (anh 28/10 duyệt demo D1–D4 "em làm luôn"): KTGS gọn — CHỈ SẮP XẾP LẠI phần đã vẽ trong #kt-the (CẮ |
| `js/79-ktgs-khoa.js` | 63 | 9 | /*   3.398 (anh 28/10: "các khai báo tên hội nên có nút khóa lại để khỏi đổi nhầm và em nên lưu lại nhật ký để |
| `js/81-scan-pdf-the.js` | 120 | 7 | /*   3.403 (anh 29/10/2026, ảnh CCCD lưu dạng PDF — thẻ nhỏ giữa trang trắng: "khi cccd đã lưu dưới dạng pdf a |
| `js/82-dia-ban-so-lieu.js` | 160 | 23 | /*   3.406 (anh 29/10/2026): 🗺 ĐỊA BÀN (Hôm nay › 🧰) THEO SỐ LIỆU MỚI NHẤT — cắm rút (bỏ dòng nạp file này là  |
| `js/83-ap-cu.js` | 35 | 3 | /*   3.407 (anh 30/10 qua TK 1 — docs/AP_KP_CU.md 1.0): GHI CHÚ ẤP / KHU PHỐ CŨ — chỉ để tham khảo, nhớ dần; K |
| `js/84-cccd-to-truong.js` | 117 | 11 | /*   3.416 (anh 31/10: "gặp CCCD tổ trưởng dù cũ hay mới cũng lưu trữ, sau này có 1 chỗ lọc ra CCCD của tổ trư |
| `js/85-khong-mang.js` | 7 | 0 | /*   3.419 P1 (docs/KE_HOACH_NANG_CAP_0111.md — anh 31/10 "làm theo thứ tự em thấy ổn nhất"): BẢN MÁY TÍNH CHẠ |
| `js/86-o-lenh.js` | 51 | 6 | /*   3.420 P2 (docs/KE_HOACH_NANG_CAP_0111.md): ⌨ Ô LỆNH Ctrl+K   Ctrl+K (Mac: ⌘K) ở bất kỳ đâu → hộp gõ: tìm  |
| `js/87-bo-chuan.js` | 133 | 10 | /*   3.424 (docs/GIAO_BAN_KY_NANG.md — TK 1 bàn giao 31/10; anh 31/10 "em chờ TK 1 bàn giao skill rồi đọc và l |
| `js/88-nd-hop.js` | 120 | 9 | /*   3.425 (docs/GIAO_BAN_KY_NANG.md mục 4.1, 4.4, 4.5, 5 — anh 31/10 "bàn giao cho TK 2 làm tiếp", "em làm lu |
| `js/89-tb-kl.js` | 103 | 3 | /*   3.426 (docs/GIAO_BAN_KY_NANG.md mục 4.2, 4.4, 4.5, 5 — anh 31/10 "em làm luôn GĐ 3 và gộp lên")   📄 NHÁP  |
| `js/90-so-gb.js` | 69 | 6 | /*   3.427 (anh 01/11 chốt ý 3 TK 2 đề xuất — KE_HOACH_KY_DOI_CHIEU mục 5, bàn giao GIAO_BAN_KY_NANG mục 6 tần |
| `js/91-nguon-vb.js` | 63 | 7 | /*   3.438 (anh 01/11 "đồng ý em code") — NGUỒN VĂN BẢN THEO SỐ HIỆU: tự gắn tag 3 nhóm + nhận đúng loại văn b |
| `js/mau/0hst.js` | 149 | 0 | /*   3.452 (anh 02/11 "làm tiếp 10B, 10C theo đúng quy chuẩn 10A") — PHẦN CHUNG mẫu Hồ sơ Tổ làm lại theo QUY_ |
| `js/mau/10c.js` | 148 | 0 | /*   3.223 M6 — MẪU 10C/TD MỚI (QĐ 70, từ 01/10/2026) Biên bản họp kết nạp, cho ra khỏi Tổ — trên nền ô, dựng  |
| `js/mau/10ccu.js` | 84 | 0 | /*   3.223 M6 — MẪU 10C/TD CŨ (vào tổ đến 30/09/2026) Biên bản họp kết nạp bổ sung, cho ra khỏi Tổ — trên nền  |
| `js/mau/10a.js` | 191 | 0 | /*   3.223 M6 — MẪU 10A/TD Biên bản họp thành lập Tổ TK&VV (QĐ 70) trên nền ô — dựng theo file gốc tests/mau_g |
| `js/mau/10b.js` | 106 | 0 | /*   3.223 M6 — MẪU 10B/TD Biên bản họp kết nạp tổ viên, bầu thay đổi Ban quản lý Tổ (QĐ 70) trên nền ô — dựng |
| `js/mau/10d.js` | 73 | 0 | /*   3.223 M6 — MẪU 10D/TD Biên bản họp giải thể Tổ TK&VV (QĐ 70) — MẪU MỚI, dựng trên nền ô theo file gốc tes |
| `js/mau/11.js` | 144 | 0 | /*   3.223 M6 — MẪU 11/TD MỚI (QĐ 70, từ 01/10/2026) Hợp đồng ủy nhiệm — trên nền ô, dựng theo file gốc tests/ |
| `js/mau/11cu.js` | 133 | 0 | /*   3.223 M6 — MẪU 11/TD CŨ (trước 01/10/2026, QĐ 15) Hợp đồng ủy nhiệm — trên nền ô, dựng theo file gốc test |

## 2. Mục trong mã (chú thích tiêu đề)

- `js/01-thu-vien.js:1` · BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được
- `js/02-nen.js:1` · TỦ HỒ SƠ — bản 1.0  (giai đoạn 1)
- `js/02-nen.js:14` · 1. HẰNG SỐ
- `js/02-nen.js:180` · 2. LƯU TRỮ
- `js/02-nen.js:307` · 3. TIỆN ÍCH
- `js/03-doc-pdf.js:1` · 4. ĐỌC PDF & RÚT THÔNG TIN
- `js/03-doc-pdf.js:383` · RÚT THÔNG TIN TỪ CHÍNH TÊN FILE
- `js/03-doc-pdf.js:462` · 5. SINH TÊN CHUẨN
- `js/03-doc-pdf.js:635` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f03.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/04-giao-dien.js:1` · 6. VẼ GIAO DIỆN
- `js/04b-hom-nay.js:71` · LỊCH (tab Hôm nay) — bản 3.9, theo tab Lịch của CBTD AI
- `js/04b-hom-nay.js:91` · NGÀY CHAY · MÙNG 1 · RẰM · LỄ ÂM (3.12)
- `js/04b-hom-nay.js:161` · vẽ
- `js/04b-hom-nay.js:201` · 3.62 — VIỆC W: CỘT 🧰 CÔNG CỤ cạnh lịch (anh chốt 02/10/2026)
- `js/04b-hom-nay.js:218` · 3.71 — 🧰 CÔNG CỤ: 📋 CHƯƠNG TRÌNH VAY
- `js/04b-hom-nay.js:360` · W① HẠN TRẢ NỢ HSSV — đúng công thức file Excel Sheet2 anh đang dùng
- `js/04b-hom-nay.js:656` · W② CÂY ĐỊA BÀN — mã xã · mã điểm GD · mã ấp/KP, xếp theo mã
- `js/04b-hom-nay.js:702` · trang NHẬT KÝ CÔNG VIỆC (giấy vàng) của ngày đang chọn
- `js/04b2-hom-nay-ghi-chu.js:3` · GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
- `js/04b2-hom-nay-ghi-chu.js:23` · SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
- `js/04b2-hom-nay-ghi-chu.js:70` · HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
- `js/04b2-hom-nay-ghi-chu.js:310` · ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
- `js/04b2-hom-nay-ghi-chu.js:636` · 💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
- `js/04b2-hom-nay-ghi-chu.js:752` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f04b2.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng
- `js/04b3-hom-nay-lich-viec.js:3` · CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
- `js/04b3-hom-nay-lich-viec.js:167` · CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
- `js/04b3-hom-nay-lich-viec.js:482` · thao tác
- `js/04b3-hom-nay-lich-viec.js:555` · Danh sách: quá hạn + 60 ngày tới
- `js/04b3-hom-nay-lich-viec.js:583` · Tính ngày
- `js/04b3-hom-nay-lich-viec.js:628` · đồng bộ _Hệ thống/lich.json
- `js/04b3-hom-nay-lich-viec.js:782` · TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
- `js/04b3-hom-nay-lich-viec.js:918` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f04b3.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng
- `js/04c-van-ban-thang.js:109` · BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào
- `js/04c-van-ban-thang.js:114` · MA TRẬN THÁNG (3.21) — màn chính của tab Tháng
- `js/04c-van-ban-thang.js:293` · QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
- `js/04c-van-ban-thang.js:506` · 3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
- `js/04c-van-ban-thang.js:742` · CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
- `js/04c-van-ban-thang.js:965` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f04c.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/04d-bo-ho-so.js:2` · 3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
- `js/04d-bo-ho-so.js:265` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f04d.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/04e-chung.js:30` · tiện ích
- `js/04e-chung.js:280` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f04e.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/05-them-file.js:1` · 7. THÊM FILE & DUYỆT TÊN
- `js/05-them-file.js:546` · 8. XEM TRƯỚC / IN / GỬI
- `js/05-them-file.js:632` · TRÌNH XEM DÙNG CHUNG cho khung lớn (#x-than) và cột phải (#cp-than)
- `js/05-them-file.js:1184` · 3.128 — BỘ IN CHUẨN (anh chốt): app tự chia trang A4 → xem trước = bản in
- `js/05-them-file.js:1383` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f05.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/06-hop-thoai.js:1` · HỘP THOẠI CHUNG
- `js/06-hop-thoai.js:105` · SỬA MỘT MỤC
- `js/06-hop-thoai.js:121` · PHÂN LOẠI 3 CẤP (bản 3.4): Mảng (1) · CT vay (1 hoặc Dùng chung) · Tag (nhiều)
- `js/06-hop-thoai.js:312` · 3.69 (việc AJ, anh chốt) — HỘP SỬA GỌN: ô chọn, Tag gợi ý, phím nhập nhanh, dòng 💡 hướng dẫn chung
- `js/06-hop-thoai.js:942` · 3.50: ❓ HƯỚNG DẪN TRỰC QUAN — chia theo tab, sơ đồ luồng dữ liệu, các bước theo logic.
- `js/06-hop-thoai.js:1335` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f06.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/06a-dong-bo-cai-dat.js:3` · ĐỒNG BỘ MỤC LÊN FILE THẬT TRÊN DRIVE (bản 3.6)
- `js/06a-dong-bo-cai-dat.js:191` · XÓA · THÙNG RÁC · XÓA HẲN (bản 3.10)
- `js/06a-dong-bo-cai-dat.js:330` · 3.144 — BỎ TAB THÁNG (anh chốt Q5, Q12, 10/10/2026): xóa dữ liệu cũ của tab một lần, không sao lưu.
- `js/06a-dong-bo-cai-dat.js:388` · CHỜ KHAI (3.11) — mọi file chưa đủ thông tin về MỘT danh sách, xem ở tab Văn bản
- `js/06a-dong-bo-cai-dat.js:480` · CHỤP / CHỌN ẢNH GHI CHÚ
- `js/06a-dong-bo-cai-dat.js:500` · 9. CÀI ĐẶT
- `js/06a-dong-bo-cai-dat.js:926` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f06a.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/06b-xoa-nhieu.js:2` · 3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc ch
- `js/06b-xoa-nhieu.js:213` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f06b.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/06c-drive.js:2` · 10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
- `js/06c-drive.js:286` · 3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
- `js/06c-drive.js:401` · 11. LẬP CHỈ MỤC
- `js/06c-drive.js:460` · 3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
- `js/06c-drive.js:712` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f06c.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/07-cccd.js:1` · 12. HỒ SƠ CCCD
- `js/07-cccd.js:42` · 3.79.1 — KHÔI PHỤC DANH SÁCH SCAN TỪ ẢNH CÒN TRONG MÁY
- `js/08-dia-ban.js:493` · 3.33 — ĐƯA HỒ SƠ SCAN LÊN DRIVE
- `js/08-dia-ban.js:596` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f08.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/09-bieu-mau.js:1` · 13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền
- `js/09-bieu-mau.js:88` · BIỂU MẪU 3.24 — như một thư mục: ghim · đếm lần dùng · ghi chú cách dùng ·
- `js/09-bieu-mau.js:221` · 3.31 — MỞ FILE WORD/EXCEL KHÔNG PHẢI TẢI VỀ (tránh rác trong thư mục Tải xuống)
- `js/09-bieu-mau.js:328` · 3.61 (việc M): GỬI NHIỀU BIỂU MẪU · NÉN .ZIP
- `js/09-bieu-mau.js:554` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f09.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/10-danh-sach.js:1` · 14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI
- `js/10-danh-sach.js:216` · QUÉT DỌN RÁC — chỉ trong thư mục Tủ hồ sơ, chỉ đọc cho tới khi anh chọn
- `js/10-danh-sach.js:543` · 3.50: 🧰 DỌN KHO — một nơi duy nhất (thay Bảo trì kho ở Cài đặt và Thư viện).
- `js/10-danh-sach.js:686` · 3.77 — VĂN BẢN TRÙNG: cùng số hiệu (bỏ dấu, khoảng trắng, gạch) + cùng năm ban hành
- `js/10-danh-sach.js:1237` · 3.475 (Đ4 kế hoạch dọn — bỏ onclick viết thẳng): LỆNH MENU CHUỘT PHẢI của danh sách file — data-lenh="menu.*", mục đang 
- `js/10-danh-sach.js:1248` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f10.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/11-khung-tab.js:1` · 17. KHUNG CHUẨN CHO MỌI TAB
- `js/11-khung-tab.js:598` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f11.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/12-scan.js:1` · 18. SCAN HỒ SƠ — máy scan trong app
- `js/12-scan.js:946` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f12.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/12b-scan-dien-thoai.js:3` · 3.43: SCAN TRÊN ĐIỆN THOẠI THEO KIỂU LENS — Quét → Xong → PDF lưu tạm (tên Scan ngày giờ, sửa ngay) → xem trước → Gửi
- `js/12b-scan-dien-thoai.js:166` · 3.49: MÁY BÀN — 💾 LƯU NHANH + 📋 COPY thay nút Gửi (điện thoại giữ 📤 Gửi). Drive vẫn là nơi lưu mặc định.
- `js/12b-scan-dien-thoai.js:290` · 3.44: CHỮ KÝ · ẢNH KHÁCH HÀNG — file ảnh nhỏ (dưới 200 KB, càng nhỏ càng tốt) để nhập lên hệ thống khi tạo hồ sơ.
- `js/12b-scan-dien-thoai.js:583` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f12b.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/12c-scan-camera-drive.js:3` · 3.45: CAMERA TRONG APP — dùng chung iPhone và máy bàn có webcam.
- `js/12c-scan-camera-drive.js:222` · 3.46: ĐỒNG BỘ DRIVE — mặc định khi mở app, khi rời app, ngay sau khi lưu; tùy chọn mỗi 5 phút; nút ☁ Đồng bộ ngay.
- `js/12c-scan-camera-drive.js:332` · 3.46 (mục K): ĐỌC CHỮ PDF ẢNH (OCR) — chỉ khi anh bấm, chỉ hiện nút khi mục còn thiếu thông tin.
- `js/12c-scan-camera-drive.js:375` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f12c.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/12d-scan-ocr-cau-noi.js:3` · 3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
- `js/12d-scan-ocr-cau-noi.js:245` · 3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi"
- `js/12d-scan-ocr-cau-noi.js:689` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f12d.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/13-xu-ly-anh.js:1` · 3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu)
- `js/14-tim-loc.js:1` · 19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER
- `js/14-tim-loc.js:175` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f14.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/15-ai-chuan-hoa.js:1` · 15. NHỜ AI CHUẨN HÓA
- `js/15-ai-chuan-hoa.js:154` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f15.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/16-ai-dan-ket-qua.js:1` · 16. DÁN KẾT QUẢ TỪ AI
- `js/16-ai-dan-ket-qua.js:224` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f16.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/17-dong-bo-cai-dat.js:1` · ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE
- `js/17-dong-bo-cai-dat.js:91` · ĐỒNG BỘ CHỈ MỤC TỦ HỒ SƠ QUA DRIVE (việc #4)
- `js/17-dong-bo-cai-dat.js:111` · 3.81 — SAO LƯU & KHÔI PHỤC
- `js/17-dong-bo-cai-dat.js:432` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f17.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/17b-so-cai-dat.js:1` · 3.260 (R4 phần 2 — docs/KE_HOACH_CHUAN_HOA.md mục 3.6): SỔ ĐĂNG KÝ CÀI ĐẶT — mọi khóa D.cauHinh app dùng, 1 dòng mô tả.
- `js/17b-so-cai-dat.js:92` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f17b.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/18-cai-dat.js:1` · 20. CÁC HÀM CÀI ĐẶT — bản dựng lại
- `js/18-cai-dat.js:400` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f18.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/19-danh-muc.js:1` · 21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU
- `js/20-khoi-dong.js:1` · KHỞI ĐỘNG
- `js/22-so-lieu.js:2` · 3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng
- `js/22-so-lieu.js:120` · 1. ĐỌC WORKBOOK (thử Worker để màn hình không treo; không được thì đọc trực tiếp)
- `js/22-so-lieu.js:159` · 2. NHẬN DẠNG + LẤY DÒNG DỮ LIỆU
- `js/22-so-lieu.js:261` · 3. KỲ (ngày chốt): cột ngày → ngày ở tiêu đề → tên file
- `js/22-so-lieu.js:318` · 4. TỔNG CHÍNH của từng loại
- `js/22-so-lieu.js:353` · 5. ĐỌC MỘT FILE → kết quả xem trước
- `js/22-so-lieu.js:454` · 6. DẠNG ĐỌC NHANH: lưu theo cột, chữ lặp thay bằng số thứ tự
- `js/22-so-lieu.js:492` · 7. CHỈ MỤC (meta) + danh bạ khách hàng
- `js/22-so-lieu.js:618` · 8. GHI NHẬN 1 file đã đọc
- `js/22-so-lieu.js:643` · 3.153 (anh chốt "thống nhất quy tắc xóa"): Ô SỐ LIỆU VÀO 🗑 THÙNG RÁC APP (ngăn Số liệu)
- `js/22-so-lieu.js:770` · 9. ĐỒNG BỘ DRIVE
- `js/22-so-lieu.js:875` · 10. BỘ DỮ LIỆU KỲ: nối các bảng
- `js/22-so-lieu.js:1124` · 11. TAB 📈 SỐ LIỆU
- `js/22b-ktgs.js:13` · đọc file BC0437 / BC0438
- `js/22b-ktgs.js:90` · trạng thái + nạp dữ liệu cho tab
- `js/22b-ktgs.js:127` · nạp + kiểm tra theo chuẩn tab Nạp & Kiểm tra (anh chốt): ma trận loại × tháng · 📥 nạp nhiều file (xem trước, xác nhận) ·
- `js/22b-ktgs.js:242` · số liệu tổ từ BC0437 (thiếu thì tính từ Mẫu 31, ghi rõ nguồn)
- `js/22b-ktgs.js:258` · màn: chưa chọn tổ → bảng các tổ (BC0437) · chọn tổ → thẻ + chọn hộ
- `js/22b-ktgs.js:315` · phân loại hộ + gợi ý (Mẫu 06 kiểm tra đột xuất)
- `js/22b-ktgs.js:422` · khai báo khi in (mặc định trống) → Word đúng khuôn / In PDF
- `js/22b-ktgs.js:424` · 3.98 (anh chốt): khai báo nằm ngay trong tab của mẫu (khung ✎ thu gọn được), lưu lâu dài trừ ngày; cán bộ kiểm tra lấy t
- `js/22b-ktgs.js:436` · 3.114 (anh chốt): HỘP CHỌN KHI IN — mỗi mẫu 1 phần, nhớ lựa chọn lần trước (D.cauHinh.ktIn[mẫu], đồng bộ Drive);
- `js/22b-ktgs.js:755` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22b.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22c-ktgs-m06.js:2` · 3.138 (anh chốt): Mẫu 06 gọn & nhạt
- `js/22c-ktgs-m06.js:130` · 3.93.1: Mẫu 06 KIỂM TRA SAU GIẢI NGÂN (727: kiểm tra sử dụng vốn trong 30 ngày) — anh chốt (làm đơn giản):
- `js/22c-ktgs-m06.js:254` · 3.98: dòng hộ dùng chung 3 màn chọn hộ (đột xuất · sau giải ngân · định kỳ)
- `js/22c-ktgs-m06.js:295` · bản In / PDF — cùng bố cục mẫu (A4 ngang Mẫu 06, A4 dọc Mẫu 16); trống = dòng chấm
- `js/22c-ktgs-m06.js:439` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22c.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22d-ktgs-04.js:21` · 3.98: 📖 BẢNG CHUẨN HÓA HỘI – ĐOÀN (anh chốt: chữ đặc thù dùng chung mọi mẫu, sửa 1 chỗ)
- `js/22d-ktgs-04.js:331` · ⚙ Khai báo Hội (mỗi Hội – xã 1 khối)
- `js/22d-ktgs-04.js:372` · 3.113 (anh chốt): 🏛 KHAI BÁO HỘI ĐOÀN THỂ — 1 nơi khai cho mọi mẫu (06, 16TD, 04, Kế hoạch); tab nhỏ Hội – xã · Chuẩn hó
- `js/22d-ktgs-04.js:375` · 3.117 (anh gửi mẫu tham khảo + bản Đoàn thật, anh: "làm mẫu luôn"): 📄 THÔNG BÁO PHÂN CÔNG NHIỆM VỤ BAN THƯỜNG VỤ trong c
- `js/22d-ktgs-04.js:698` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22d.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22e-ktgs-kh.js:31` · 3.140 (anh chốt): IN THEO THÁNG KIỂM TRA (chip 🗓 Kế hoạch) — bấm tháng → các tổ của tháng (theo ấp):
- `js/22e-ktgs-kh.js:221` · 3.398 (anh 28/10: "KH năm em đang tự lưu phải ko — anh muốn chốt lưu và chốt ngày lưu luôn, sau này có sửa thì lưu lại t
- `js/22e-ktgs-kh.js:579` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22e.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22f-tra-cuu.js:43` · cột trái
- `js/22f-tra-cuu.js:184` · kiểm trùng 2 ô
- `js/22f-tra-cuu.js:239` · thẻ chi tiết (phải / hộp trên điện thoại)
- `js/22f-tra-cuu.js:339` · 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng
- `js/22g-to.js:2` · 3.88 — 👥 TAB CON TỔ TK&VV (trong tab Số liệu, cạnh Tra cứu KH): chọn 1 tổ (cây xã → điểm GD → hội → tổ, hoặc gõ tên) → b
- `js/22g-to.js:72` · 3.149 (anh chốt ý 6b): KỲ CHUNG — 1 ô ở đầu trang, phủ mọi tab (Nạp & KT, Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu…)
- `js/22g-to.js:260` · 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể)
- `js/22g-to.js:352` · 3.92: TAB TỔ — mục đích (anh Nhân): biết số tổ viên để KẾT NẠP thêm hoặc CHO RA khỏi tổ, căn cứ dư nợ và số dư 105
- `js/22g-to.js:495` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22g.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22ga-pham-vi.js:2` · 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ)
- `js/22ga-pham-vi.js:167` · 3.383.7 (anh 27/10): 📌 GHIM TỪNG Ô LỌC — D.cauHinh.pvGhimO {cap: giá trị}; mở app ô ghim luôn về giá trị ghim (ưu tiên c
- `js/22ga-pham-vi.js:216` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22ga.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng
- `js/22gb-to-giao-dien.js:344` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22gb.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng
- `js/22h-cap-hoi-sao-ke.js:2` · 3.132 (anh chốt) — CẤP HỘI / ĐIỂM GD / XÃ / PGD: dòng tóm tắt + chip lọc như của tổ; mặc định bảng các tổ (PGD: Cộng PGD
- `js/22h-cap-hoi-sao-ke.js:132` · báo cáo: mỗi báo cáo trả {ten, tieuDe, html (phần thân), aoa (Excel)}
- `js/22h-cap-hoi-sao-ke.js:306` · xem → in / Excel
- `js/22h-cap-hoi-sao-ke.js:356` · 3.89 — 👤 TRA CỨU KH: phạm vi (bộ chọn chung) + KIỂM TRÙNG trước khi nhập máy
- `js/22h-cap-hoi-sao-ke.js:380` · 3.89 — 📑 TAB CON SAO KÊ (trong Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi (bộ chọn chung) → tích → Xem → In / Excel
- `js/22h-cap-hoi-sao-ke.js:494` · 3.91: NỢ ĐẾN HẠN — theo ngày đến hạn hợp đồng (gia hạn nếu có) + kỳ GDXA chuyển quá hạn (anh chốt)
- `js/22h-cap-hoi-sao-ke.js:529` · 3.91: MÓN VAY TRẢ GỐC PHÂN KỲ — NỢ ĐẾN HẠN KỲ CON (anh Nhân; Công văn 597/NHCS-TDNN 30/01/2026)
- `js/22h-cap-hoi-sao-ke.js:665` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22h.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22i-tong-hop.js:2` · 3.90 — 7 FILE TỔNG HỢP CHUẨN TW (anh chốt: số chính thức của TW, chuẩn nhất)
- `js/22i-tong-hop.js:112` · ghép tổ LEN_31 TO_TRUONG (chỉ có tên tổ trưởng, có khi bị cắt; 2 tổ trùng tên trong 1 xã gộp 1 dòng) với mã tổ
- `js/22i-tong-hop.js:160` · ② KIỂM TRA: số chuẩn TW khớp nhau (nhóm 7) · Mẫu 31 ↔ số chuẩn TW (nhóm 8) · KHĐ, tổ trưởng (nhóm 3)
- `js/22i-tong-hop.js:290` · 3.90 — 📊 TAB CON TỔNG HỢP (Số liệu): tiêu chí + bộ lọc → tích → Xem → In (A4 ngang) / Excel
- `js/22i-tong-hop.js:592` · 3.90: CHUẨN IN mọi báo cáo (anh chốt): A4, lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi tr
- `js/22i-tong-hop.js:597` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f22i.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/22j-thong-tin-to.js:1` · 3.259 → 3.263 (anh chốt 18–19/10) — 📒 Sao kê › nhóm "Thông tin tổ" (theo file tổng hợp anh dùng hằng tháng):
- `js/22j-thong-tin-to.js:22` · số liệu 1 tổ (theo món Mẫu 31) — dùng cho KQGD
- `js/22j-thong-tin-to.js:74` · 3.261 (anh 18/10: "cần dữ liệu tương tự, chốt cuối tháng"): KQGD theo khung file tổng hợp
- `js/22j-thong-tin-to.js:157` · 3.263 (anh chốt 19/10): 📊 TÌNH HÌNH HOẠT ĐỘNG (THHD) — thay "Bộ thông tin tổ": 1 trang A4 dọc, triệu đồng;
- `js/22j-thong-tin-to.js:228` · 3 sao kê chia Điểm GD › Hội › Tổ (dòng nhóm mang số cộng)
- `js/22j-thong-tin-to.js:289` · vào từ skBaoCao
- `js/22k-nap-kt.js:88` · 3.150: tab Nạp & KT gọn
- `js/22k-nap-kt.js:251` · 3.88: ① FILE THÁNG · ② KIỂM TRA (kết quả lưu theo tháng, dữ liệu đổi thì báo kiểm lại)
- `js/22k-nap-kt.js:359` · 3.146 (anh chốt 10/10): KIỂM TRA KỲ — không chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã bấm kiểm, s
- `js/22k-nap-kt.js:400` · 3.90.1: BẢNG ĐỐI CHIẾU CHÉO — chỉ tiêu × nguồn (BCDHTD chuẩn · LEN_31 · Mẫu 31 · Dư nợ chi tiết), toàn PGD và từng xã
- `js/22k-nap-kt.js:643` · 12. NẠP: cả bộ / từng file
- `js/22k-nap-kt.js:802` · 3.90: XÓA cả bộ tháng / LÀM MỚI toàn bộ số liệu (chỉ phần Số liệu; Drive vào thùng rác, lấy lại được 30 ngày)
- `js/22k-nap-kt.js:848` · 3.90: THAY FILE 1 ô — file mới phải đúng loại, đúng kỳ của ô; khác thì báo, không thay
- `js/22k-nap-kt.js:866` · 3.90.1: TẢI FILE GỐC (bản sao để dùng việc khác) — trong máy nếu còn, không thì tải từ Drive
- `js/22k-nap-kt.js:884` · 3.90.1: TÌM FILE RÁC CỦA SỐ LIỆU (riêng phần Số liệu: trong máy sl_… + Drive Số liệu/ và _Hệ thống/so_lieu/; không đụng 
- `js/22k-nap-kt.js:945` · 3.400 (anh chốt 28/10 — Tèo, docs/PHOI_HOP_CHUNG.md mục 4): TÊN CHUẨN file gốc + SỔ NẠP + CHUẨN HÓA TÊN THÁNG CŨ
- `js/22k-nap-kt.js:1024` · 3.401 (anh chốt 28/10 — Tèo QT-C-10 / 11): KIỂM ẤP / ĐIỂM GD — nhóm 6 Bất thường dữ liệu, chỉ báo để anh sửa trên hệ thố
- `js/22k-nap-kt.js:1038` · 3.405 (Tèo — docs/KE_HOACH_KY_DOI_CHIEU.md mục 3, bước 2): FILE ĐỐI CHIẾU APP DOI_CHIEU_APP_<YYYY-MM-DD>.csv
- `js/22k-nap-kt.js:1095` · 3.474 (Đ4 kế hoạch dọn — bỏ onclick viết thẳng): LỆNH NẠP & KT — data-lenh="nkt.*", tham số ở data-a / data-b / data-c, 
- `js/23-dieu-huong.js:188` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f23.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/24-xuat.js:1` · 3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG
- `js/24-xuat.js:149` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f24.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/25-ho-so.js:1` · 3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY
- `js/25-ho-so.js:59` · ⚙ khai báo 1 lần
- `js/25-ho-so.js:104` · 3.208 (anh chốt 14/10): CHƯƠNG TRÌNH VAY — mỗi CT 1 thẻ (D.cauHinh.hsoKB.ctv): tên tắt, tên in 01/03, đối tượng thụ hưởn
- `js/25-ho-so.js:173` · thông tin tổ / khách dùng cho mẫu
- `js/25-ho-so.js:197` · ô điền
- `js/25-ho-so.js:223` · khối dựng chung
- `js/25-ho-so.js:250` · 10C/TD
- `js/25-ho-so.js:314` · 10A/TD
- `js/25-ho-so.js:362` · 10B/TD
- `js/25-ho-so.js:395` · 11/TD
- `js/25-ho-so.js:396` · 01/BG · 02/BG
- `js/25-ho-so.js:455` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f25.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/25b-ho-so-vay.js:3` · HỒ SƠ VAY: 01/TD · 03/TD · 04/TD · 09A/TD
- `js/25b-ho-so-vay.js:286` · 3.171 (anh chốt 11/10): BỘ HỒ SƠ VAY — lưu tạm (D.cauHinh.hsoBo, đồng bộ Drive), in thành bộ gửi tổ đi ký
- `js/25b-ho-so-vay.js:331` · 01/TD Giấy đề nghị vay vốn — đúng PDF (HSSV có xác nhận UBND xã; NSVSMT không)
- `js/25b-ho-so-vay.js:337` · 03/TD Danh sách tổ viên đề nghị vay vốn — đúng PDF (A4 ngang, số dòng = số người + 2 dòng trống, kẻ chấm)
- `js/25b-ho-so-vay.js:338` · 04/TD Thông báo kết quả phê duyệt — đúng PDF; in từng thông báo (chọn điểm GD, nhập số hộ + số tiền)
- `js/25b-ho-so-vay.js:339` · 09A/TD Giấy đề nghị gia hạn nợ — đúng PDF
- `js/25b-ho-so-vay.js:340` · 01/UQ Giấy ủy quyền — đúng PDF (thành viên hộ + người thừa kế chỉ ở mẫu này)
- `js/25b-ho-so-vay.js:372` · 01/TGTV Giấy đăng ký mở tài khoản tổ viên (mẫu 03/2026) — đúng PDF, có logo + chân trang
- `js/25b-ho-so-vay.js:480` · lập mẫu đang chọn
- `js/25b-ho-so-vay.js:501` · WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang)
- `js/25b-ho-so-vay.js:659` · 3.473 (Đ3 kế hoạch dọn — KE_HOACH_DON_NEN mục 8): CÁCH LẬP TỪNG MẪU gắn qua cổng hsoMauGan — thân giữ nguyên các nhánh c
- `js/25b-ho-so-vay.js:683` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f25b.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/25c-ho-so-giao-dien.js:3` · giao diện tab
- `js/25c-ho-so-giao-dien.js:80` · 3.207 (anh yêu cầu 14/10): 🏠 HỘ VAY MỚI — khai báo 1 lần (form nhập nhanh), lưu danh sách (D.cauHinh.hoMoi, đồng bộ Driv
- `js/25c-ho-so-giao-dien.js:104` · 3.209 (anh 14/10): SỔ HỘ VAY — hộ mới / lấy từ Mẫu 31; khai tổ khi tạo; chỉ bắt buộc người đứng tên, thành viên / thừa k
- `js/25c-ho-so-giao-dien.js:262` · 3.214 (anh 15/10): 📒 SỔ HỘ VAY — tab xem lại: lọc, sắp xếp, sửa thẳng từng ô (hộ mới), in đúng danh sách đang lọc
- `js/25c-ho-so-giao-dien.js:441` · 3.209 (anh 14/10): 03/TD NHIỀU HỘ — cùng 1 chương trình in chung 1 tờ; tích hộ ở sổ → 📋 Lập 03/TD, hoặc mở 03/TD → ＋ Thê
- `js/25c-ho-so-giao-dien.js:485` · 3.211 (anh chốt 14/10): GQVL — người lao động vay qua Tổ: 01/GQVL (mẫu mới VB 4039, từ 01/10/2026) · 03/TD · 07b/GQVL Hợ
- `js/25c-ho-so-giao-dien.js:712` · 3.209: cột trái 01/TD · 01/UQ · 03/TD · 01/TGTV theo hộ — chọn hộ → chọn chương trình → phương án → in (+ in kèm)
- `js/25c-ho-so-giao-dien.js:773` · cột tùy chọn của từng mẫu
- `js/25c-ho-so-giao-dien.js:798` · 3.473 (Đ3 kế hoạch dọn — KE_HOACH_DON_NEN mục 8): CỘT TRÁI TỪNG MẪU gắn qua cổng hsoMauGan — thân giữ nguyên các nhánh c
- `js/25c-ho-so-giao-dien.js:880` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f25c.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/26-giao-dich-xa.js:40` · hàm của file gốc (chuyển ES5, giữ nguyên cách tính)
- `js/26-giao-dich-xa.js:90` · điểm GD · tổ — 3.174 (anh chốt 12/10): cây địa bàn theo Mẫu 31 (kỳ chung, như các tab khác);
- `js/26-giao-dich-xa.js:159` · MẪU IN — chuyển nguyên văn từ file gốc
- `js/26-giao-dich-xa.js:300` · 3.174 (anh chốt 12/10 — docs/KE_HOACH_HO_SO_TO.md mục E): BỐ CỤC MỚI tab 🏢 Giao dịch xã
- `js/26-giao-dich-xa.js:325` · ngày của 04/TD: ngày ký (hôm nay / chọn ngày) · ngày phát (mặc định = ngày GD gần nhất của điểm; tại PGD = ngày mai)
- `js/26-giao-dich-xa.js:330` · bản chụp lựa chọn để dựng mẫu (xem trước · in · nhật ký in lại dùng chung 1 bản)
- `js/26-giao-dich-xa.js:361` · mục của từng mẫu — theo thứ tự trên mẫu; nhanh = mặc định ra khung chọn nhanh (anh đổi ở ⚙)
- `js/26-giao-dich-xa.js:410` · ô điều khiển dùng chung
- `js/26-giao-dich-xa.js:459` · vẽ 1 mục (khung chọn nhanh và ⚙ dùng chung; kb = đang ở ⚙ → có thêm phần quản lý)
- `js/26-giao-dich-xa.js:530` · theo khối lọc: điểm GD / xã đang chọn → điền mẫu
- `js/26-giao-dich-xa.js:545` · vẽ tab
- `js/26-giao-dich-xa.js:646` · 📋 Tóm tắt bản in: chip + cảnh báo (không chặn — hỏi 1 lần) + nút in
- `js/26-giao-dich-xa.js:731` · ⚙ Khai báo riêng mẫu: MỌI mục, theo thứ tự trên mẫu; tích "Chọn nhanh" → ra khung trái
- `js/26-giao-dich-xa.js:743` · 3.174: 💵 GIẤY LĨNH TIỀN MẶT (anh chốt 12/10) — khách rút TK 105 hoặc tổ trưởng rút TK 104; số liệu theo kỳ / ngày số liệ
- `js/26-giao-dich-xa.js:974` · 3.187 (anh gửi ảnh mẫu 13/10): 🧾 BẢNG KÊ CÁC LOẠI TIỀN NGÂN HÀNG CHI RA — in kèm Giấy lĩnh, cùng người lĩnh / số tiền.
- `js/26-giao-dich-xa.js:1074` · ⚙ Khai báo chung
- `js/26-giao-dich-xa.js:1077` · 📜 Nhật ký in: chỉ lưu lựa chọn (không lưu PDF), trên máy này, tự xóa sau 1 tháng (anh chốt)
- `js/26-giao-dich-xa.js:1097` · ⭐ Mẫu hay in (số hộ + số tiền) · mức tiền · danh sách cán bộ — giữ từ 3.172
- `js/26-giao-dich-xa.js:1132` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f26.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/26b-gdx-4368.js:1` · 3.493 (anh 07/11/2026 "các mẫu nào dựng nhanh đơn giản em cứ dựng theo đúng chuẩn gắn mẫu đã làm — mẫu 12 đã làm ổn rồi"
- `js/26b-gdx-4368.js:42` · phần dùng chung
- `js/26b-gdx-4368.js:75` · CSS chung các mẫu (thêm sau GDX_CSS; đường kẻ theo QUY_TAC_SOAN_MAU: chính ≤ 0,9 px đen, phụ mảnh xám)
- `js/26b-gdx-4368.js:98` · 03/GDX Bảng kê theo dõi giao dịch xã (A4 ngang, 2 tờ)
- `js/26b-gdx-4368.js:129` · 06/GDX Giấy đề nghị tiếp quỹ kiêm tạm ứng tiền và thẻ tiết kiệm (A4 dọc)
- `js/26b-gdx-4368.js:142` · 07/GDX Nội dung phổ biến cho khách hàng vay vốn (A4 dọc, chữ cố định)
- `js/26b-gdx-4368.js:170` · 09/GDX Báo cáo thẻ tiết kiệm tại điểm giao dịch (A4 ngang)
- `js/26b-gdx-4368.js:184` · 10/GDX Bảng kê kiểm quỹ cuối phiên giao dịch (A4 dọc)
- `js/26b-gdx-4368.js:198` · 11/GDX Biên bản xác định thẻ tiết kiệm hỏng, mất (A4 dọc)
- `js/26b-gdx-4368.js:208` · 14/GDX Phiếu xuất kho · 15/GDX Phiếu nhập kho (A4 dọc)
- `js/26b-gdx-4368.js:220` · khai báo riêng của mẫu (ngoài mục chung với 12/GDX)
- `js/26b-gdx-4368.js:260` · 📘 NHIỆM VỤ TỔ GIAO DỊCH — 1 mặt A4 dọc (anh 07/11 "1 tờ chung bố trí gọn, đủ nhiệm vụ, chữ nhỏ") — tóm tắt VB 4368 mục I
- `js/26c-gdx-to.js:8` · 3.496 (anh 07/11 "mẫu 03 cho chọn trực quan, 1 số quy tắc đọc kỹ VB — ví dụ tổ trưởng tổ GD kiêm bảo vệ"; "tạm cứ cho kh
- `js/26c-gdx-to.js:106` · 3.510 (anh 10/11 "thêm chức năng lưu phiên theo điểm, có thể mở ra xem lại theo tháng, khi lưu có thể liên kết dữ liệu i
- `js/27-mini-gdx.js:24` · gói số liệu (chỉ chạy trên máy anh lúc xuất)
- `js/27-mini-gdx.js:76` · KHUNG MINI APP — chỉ chạy TRONG file mini (gdxMiniApp được chép nguyên vào file lúc xuất). Không chạy trong app chính.
- `js/28-tv-tk.js:1` · 3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ
- `js/28-tv-tk.js:102` · 3.333 QT-18 (anh chốt 24/10): THÀNH VIÊN CHUẨN 1 TỔ theo kỳ đang dựng (TO_K — chốt tháng hoặc ngày)
- `js/28-tv-tk.js:124` · ③ ĐỐI CHIẾU THÀNH VIÊN TỔ: app (Mẫu 31) ↔ Mẫu 01/TV (TƯ)
- `js/28-tv-tk.js:170` · ④ TK 104 / TK 105 theo Sao kê ngày
- `js/28-tv-tk.js:323` · ⑤ Giấy lĩnh: tổ trưởng (Mã CIF TT) → TK 104 · CCCD anh gõ tay nhớ theo mã KH (D.cauHinh.ccNho, đồng bộ Drive như cài đặt
- `js/28-tv-tk.js:390` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f28.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/29-kho.js:167` · lõi kho (dời từ js/25 ở 3.216 — giữ tên hàm cũ để mọi chỗ gọi cũ vẫn chạy; tab mới gọi qua KHO.*)
- `js/31-o-mau.js:103` · giao diện cột trái: kiểu in · khai báo riêng (tóm tắt + Chọn nhanh)
- `js/31-o-mau.js:151` · 🖼 KHAI BÁO TRỰC QUAN: mẫu như giấy thật (trái) · ô đang chọn (phải)
- `js/31-o-mau.js:285` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f31.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/32-kho-luu.js:40` · giao diện: tab 💾 Sao lưu trong ⚙ Khai báo đơn vị
- `js/32-kho-luu.js:101` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f32.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/34-luu-ngan.js:153` · giao diện: nhóm 🗄 Nơi lưu trong tab 💾 Sao lưu
- `js/34-luu-ngan.js:177` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f34.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/35-scan.js:137` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f35.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/36-dong-bo-khoi.js:185` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f36.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/37-kiem-ho.js:60` · dữ liệu phụ
- `js/37-kiem-ho.js:84` · bộ kiểm
- `js/37-kiem-ho.js:171` · hiển thị
- `js/37-kiem-ho.js:195` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f37.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/41-scan-sap-xep.js:1` · 3.264 (anh chốt 20/10/2026) — 🗂 LƯU SCAN TẬP TRUNG · 🧹 SẮP XẾP · 📊 KIỂM TRA · 📇 ĐỌC CCCD (QR / 3 dòng mã máy đọc)
- `js/41-scan-sap-xep.js:17` · 1. tên + nơi lưu
- `js/41-scan-sap-xep.js:70` · 2. tra khách trên Mẫu 31 (danh bạ)
- `js/41-scan-sap-xep.js:147` · 3. đọc CCCD: QR → 3 dòng mã máy đọc → dòng "Số"
- `js/41-scan-sap-xep.js:240` · 4. quét CCCD: đọc số → tra khách → lưu thẳng đúng chỗ
- `js/41-scan-sap-xep.js:345` · 5. bản photo 2 mặt trên 1 tờ → chia đôi tờ
- `js/41-scan-sap-xep.js:390` · 6. 🧹 SẮP XẾP
- `js/41-scan-sap-xep.js:548` · 7. 📊 KIỂM TRA theo cây địa bàn
- `js/41-scan-sap-xep.js:601` · 8. tab Scan: dòng 🧹 Sắp xếp · 📊 Kiểm tra
- `js/42-scan-ra-soat.js:1` · 3.268 (anh chốt 20/10/2026) — 🔎 RÀ CCCD ĐÃ LƯU · BẢN TRÙNG
- `js/42-scan-ra-soat.js:48` · B. bản trùng: dấu vân tay nội dung
- `js/42-scan-ra-soat.js:97` · C. Drive: thư mục CCCD
- `js/42-scan-ra-soat.js:132` · chạy rà
- `js/42-scan-ra-soat.js:167` · giao diện
- `js/42-scan-ra-soat.js:290` · làm việc đã chọn
- `js/43-scan-anh-drive.js:1` · 3.271 (anh chốt 20/10/2026) — 🖼 ẢNH 2 MẶT CCCD LÊN DRIVE · CẮT ẢNH TỪ PDF CŨ · BẢNG ĐỐI CHIẾU · CMND 9 SỐ
- `js/43-scan-anh-drive.js:91` · cắt 2 thẻ từ trang PDF (khuôn app dựng: nền trắng, trước | sau cạnh nhau ở hàng đầu)
- `js/43-scan-anh-drive.js:178` · bảng đối chiếu: thông tin đọc được trên thẻ ↔ Mẫu 31
- `js/43-scan-anh-drive.js:197` · CMND 9 số đọc từ thẻ (theo mã KH)
- `js/43-scan-anh-drive.js:203` · 3.272 (bố trí anh duyệt ở 3.264): khung xem phải — dòng "Hồ sơ của khách"
- `js/43-scan-anh-drive.js:245` · 3.280 (anh: "cccd cũ app vẫn lưu PDF chưa tách ra 2 mặt"): bản CCCD cũ chỉ có PDF
- `js/43-scan-anh-drive.js:280` · 3.281 (anh: "có cái app tự tách, có cái không — báo app có làm chưa, làm không được cũng báo")
- `js/43-scan-anh-drive.js:314` · 3.282 (anh: "in nhiều CCCD 1 lúc, 4 CCCD trên 1 trang A4")
- `js/43-scan-anh-drive.js:335` · 3.293 (bước 0 kế hoạch tên + lưu): 🧹 dọn ảnh tải về từ Drive
- `js/43-scan-anh-drive.js:345` · 3.300 (anh: "mở / scan CCCD xử lý lâu, load các PDF cũng vậy — rà soát tối ưu"): bộ nhớ tạm PDF trong phiên
- `js/44-quet-cccd-form.js:1` · 3.273 (anh duyệt 20/10/2026: "cạnh ô nhập họ tên sẽ là 1 nút quét, khi bấm sẽ mở cam hoặc quét từ ảnh CCCD chụp sẵn" — "
- `js/44-quet-cccd-form.js:33` · lấy ảnh
- `js/44-quet-cccd-form.js:80` · đọc + hộp xác nhận
- `js/45-tra-mau31.js:1` · 3.275 (anh 20/10/2026: "khi mở 1 file lên chỉnh sửa hay lưu mới anh sẽ đánh số CCCD hoặc họ tên hoặc mã KH, em làm 1 nút
- `js/45-tra-mau31.js:160` · 3.285 (anh 20/10: "chỗ lưu tên có nút Tra Mẫu 31 sau khi đã đánh số CCCD — anh muốn app có nút đọc số CCCD điền vào và t
- `js/46-quan-ly-scan.js:1` · 3.278 (rà soát tab Scan 20/10 — anh: "em cứ code theo ý em và gộp lên"): BỐ CỤC GỌN
- `js/46-quan-ly-scan.js:121` · 3.297 (bước 3 kế hoạch tên + lưu): 📷 QUÉT BẢN ĐÃ KÝ từ hồ sơ vay
- `js/47-phan-bo.js:23` · QT-15.1 dòng CT nào phải phân bổ
- `js/47-phan-bo.js:44` · thuật toán chia
- `js/47-phan-bo.js:95` · phân bổ 1 QĐ (1 xã)
- `js/47-phan-bo.js:161` · QT-17 nhập QĐ: gợi ý "Đã giao" + tổng hợp đầu năm
- `js/47-phan-bo.js:196` · tiện ích cho giao diện (vẫn thuần, không DOM)
- `js/47-phan-bo.js:219` · 3.439 (anh 01/11 "bỏ app cũ, nạp QĐ mới" — file scan / chụp không đọc chuẩn 100% → anh cho Gemini điền MẪU EXCEL CHUẨN):
- `js/47-phan-bo.js:268` · 3.465 (anh 04/11 "QĐ của tỉnh có cấu trúc theo từng chương trình vay, khi nhập liệu cũng cho nhập như vậy"; gửi QĐ mẫu 1
- `js/47-phan-bo.js:339` · 3.467 (anh 04/11 "thêm 1 nút thống kê QĐ theo ngày, dòng thời gian, có số thứ tự để kiểm tra xem có đợt nào bỏ sót; tỉnh
- `js/47-phan-bo.js:364` · 3.289 P3: dữ liệu Biểu 07 Phân bổ KH (QT-16) — thuần, mẫu in ở js/mau/07pb.js
- `js/47-phan-bo.js:397` · 3.494 · 3.497 — QT-20 TỜ TRÌNH ĐIỀU CHỈNH 09/KH (quy trình ngược của phân bổ — anh 07/11 "khi trình lấy số dư của chương
- `js/47-phan-bo.js:413` · 3.478 (anh 05/11 "khi nhập KH cơ bản sẽ liền mạch nhưng đôi khi có vài chương trình bị đứt quãng, không khớp — nguyên tắ
- `js/47-phan-bo.js:429` · 3.301: ĐỐI CHIẾU CHÉO (anh 21/10: "tại mỗi QĐ tổng giao của Biểu 07 phải khớp số giao của QĐ và dư nợ đến cuối năm cũng 
- `js/47-phan-bo.js:471` · DIỄN BIẾN PHÂN VỐN THEO KH (anh 21/10: "làm thêm diễn biến phân vốn … theo KH", giao diện web hiện đại)
- `js/48-phan-bo-gd.js:22` · dựng: kỳ chung → cây địa bàn (xã → ấp)
- `js/48-phan-bo-gd.js:53` · 3.308 (anh 21/10 "tab phân bổ còn hiện chung các chức năng hơi rối … thanh tab ngang"): THANH TAB NGANG 4 MỤC — 📋 Quyết 
- `js/48-phan-bo-gd.js:68` · 📋 Quyết định: danh sách QĐ (thẻ)
- `js/48-phan-bo-gd.js:96` · cột phải: phân bổ 1 xã của QĐ
- `js/48-phan-bo-gd.js:163` · hộp nhập / sửa QĐ (QT-17)
- `js/48-phan-bo-gd.js:328` · 3.439 (anh 01/11 "bỏ app cũ, nạp QĐ mới" + mẫu Excel chuẩn cho Gemini điền): 📥 Nạp QĐ (Excel mẫu) · ⬇ Tải mẫu
- `js/48-phan-bo-gd.js:401` · 3.289 P3: BIỂU 07 (QT-16 — chỉ xuất khi khớp QĐ) · xem trước / In / PDF / Word · 1 xã hoặc mọi xã của QĐ
- `js/48-phan-bo-gd.js:446` · 3.301: ⚙ KHAI BÁO RIÊNG Biểu 07 (ô kiểu nền ô — js/mau/07pb.js PB07_O) · lưu KHO1 'pb' → ch.b07 = {cach, gt, co}; ✏ gõ t
- `js/48-phan-bo-gd.js:496` · 3.301: 🔎 ĐỐI CHIẾU CHÉO (pbDoiChieu ở js/47) — cột phải; cấp xã (cấp ấp chờ cách chia 3)
- `js/48-phan-bo-gd.js:578` · lệnh
- `js/48-phan-bo-gd.js:579` · 3.465 (anh 04/11, QĐ mẫu 13821 đợt 7): 📄 ĐỌC QĐ (PDF có chữ) · Excel sheet DANH_MUC — cùng 1 đường: đầu QĐ + danh mục (p
- `js/48-phan-bo-gd.js:659` · 3.465 (anh 04/11 "khi hiện thì cho chọn qua lại cả 2 kiểu: theo xã (các chương trình của xã) hoặc theo chương trình (các
- `js/48-phan-bo-gd.js:749` · 3.467 (anh 04/11): 📅 DÒNG THỜI GIAN QĐ (STT từ QĐ đầu tiên, soát đợt sót) · QĐ KHÔNG GIAO CHO PGD (chỉ số QĐ)
- `js/48b-phan-bo-db.js:3` · 3.301: 📈 DIỄN BIẾN PHÂN VỐN THEO KH (pbDienBien ở js/47) — thẻ số · biểu đồ SVG (KH hiệu lực bậc thang ↔ dư nợ Mẫu 31) ·
- `js/48b-phan-bo-db.js:174` · 3.471 (anh 04/11 "anh cần bảng biểu cơ bản trước, theo đúng phong cách giao vốn đầu năm, giao tăng giảm, KH cuối năm, dư
- `js/48b-phan-bo-db.js:267` · 3.478 (anh 05/11 "báo bị đứt chênh ở QĐ nào, chương trình nào"): ⚠ ĐỨT CHUỖI QĐ — bảng dùng chung (Diễn biến · Quyết địn
- `js/49-ten-chuan.js:1` · 3.295 — SỔ QUY TẮC TÊN + NƠI LƯU HỒ SƠ THEO KHÁCH (lớp Nghiệp vụ, dùng chung) — bước 1 `docs/KE_HOACH_TEN_LUU_HO_SO_VAY.
- `js/50-xuat-khach.js:1` · 3.304 — CHỮ KÝ GẮN CÙNG CCCD + XUẤT FILE THEO KHÁCH (lớp Nghiệp vụ + Giao diện tab Scan)
- `js/51-chu-ky.js:1` · 3.306 — CHỮ KÝ / LĂN TAY: NHẬN DẠNG, DỌN BẢN QUÉT NHẦM, BỎ ẢNH KHÁCH LƯU SẴN, NÚT BẢN PHOTO 2 MẶT (lớp Nghiệp vụ + Giao 
- `js/51-chu-ky.js:53` · lưu chữ ký: xét trước khi lưu
- `js/51-chu-ky.js:74` · không lưu sẵn ảnh khách từ CCCD (xuất khi cần — 50)
- `js/51-chu-ky.js:77` · ✍ Rà chữ ký đã lưu
- `js/51-chu-ky.js:147` · "Quét gì?": 🧑 Ảnh khách → 🗎 Bản photo CCCD (2 mặt trên 1 tờ)
- `js/51-chu-ky.js:178` · 3.309 (anh: "khi chọn 1 KH sẽ hiện CCCD và ck phía dưới nếu có"): khung xem — dải chữ ký dưới nội dung CCCD
- `js/51-chu-ky.js:192` · 3.309 (anh: "chức năng thừa hay trùng trong nút ⋯ thì bỏ"): hộp 📁 Chữ ký · CCCD cũ không còn —
- `js/52-loc-photo.js:1` · 3.307 — CHẾ ĐỘ LỌC CHO BẢN PHOTO (lớp Nghiệp vụ xử lý ảnh, dùng chung Scan)
- `js/53-giay-nop.js:1` · 3.312 (anh 22/10/2026 gửi bản scan Giấy nộp tiền NHCSXH — "tạo mẫu tương tự Giấy lĩnh tiền kèm bảng kê nộp"):
- `js/mau/09a.js:86` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="m09a.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng 
- `js/mau/bblv.js:236` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="mbblv.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng
- `js/mau/07kh.js:32` · dùng chung 3 mẫu
- `js/mau/07kh.js:53` · 07/KH · 08/KH: d = pbBieu07DL(...) (1 xã) · K = khai báo · du = liệt kê đủ các thôn
- `js/mau/07kh.js:100` · 09/KH Tờ trình: d = {dv, nam, nguon, qd:{so, kyHieu, ngay, laDC} (QĐ gần nhất của tỉnh), ct:[{ma, ten, dg, dn, nam}]}
- `js/54-tgtv-khai.js:64` · 3.316 (anh 23/10 "form cứng, chuẩn: họ tên, ngày sinh, CCCD, ngày cấp, SĐT, chọn xã, ấp — còn lại tự tính: giới tính, ng
- `js/54-tgtv-khai.js:90` · bấm trên bản xem
- `js/54-tgtv-khai.js:156` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f54.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/56b-ktgs-727.js:13` · NGHIỆP VỤ (thuần theo số liệu đang dựng — gọi trong ktNguonVoi / kỳ khối B)
- `js/56b-ktgs-727.js:43` · MẪU IN (HTML — xem trước / In / PDF; Word theo khuôn gốc)
- `js/56b-ktgs-727.js:94` · 3.503: đăng ký vào khung mẫu in chung MAU_IN (js/31b) — bản in, hộp xem, Word theo khuôn gốc (js/khuon/kt727.js)
- `js/56b-ktgs-727.js:105` · GIAO DIỆN: nút ở 3 chỗ KTGS + hộp xem / in
- `js/57-cay.js:1` · 3.328 (anh chốt 23/10): CÂY ĐỊA BÀN NHÚNG — 1 chỗ lấy danh sách Xã › Điểm GD › Ấp › Hội › Tổ và vẽ ô chọn kiểu ☰ Gọn
- `js/58-tc-to.js:1` · 3.333 (anh chốt 23–24/10): TRA CỨU KH — KHỐI TỔ + BẢNG TỔ CỦA ĐIỂM GD (kết nạp)
- `js/58-tc-to.js:42` · bảng tổ của 1 điểm GD, gom theo Hội
- `js/58-tc-to.js:87` · 3.336 (anh 24/10): "cho tìm tổ trưởng và hiện thông tin cơ bản của tổ" — chip Tìm theo › Tổ trưởng
- `js/59-suc-khoe.js:1` · 3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2 — anh 24/10 "cứ theo KH làm"): 🩺 SỨC KHỎE SAO LƯU
- `js/72-ho-vay.js:45` · báo cáo Sao kê 'b105' (js/22h skBaoCao): phạm vi cây, chia theo tổ, cộng tổ
- `js/74-sk-ndt.js:83` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f74.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/79-ktgs-khoa.js:58` · 3.476 (Đ4 kế hoạch dọn): LỆNH data-lenh="f79.*" — tools/doi_onclick.py chuyển từ onclick viết thẳng; mỗi lệnh gọi đúng h
- `js/81-scan-pdf-the.js:1` · 3.403 (anh 29/10/2026, ảnh CCCD lưu dạng PDF — thẻ nhỏ giữa trang trắng: "khi cccd đã lưu dưới dạng pdf anh cũng cần nhậ
- `js/82-dia-ban-so-lieu.js:1` · 3.406 (anh 29/10/2026): 🗺 ĐỊA BÀN (Hôm nay › 🧰) THEO SỐ LIỆU MỚI NHẤT — cắm rút (bỏ dòng nạp file này là quay về danh mụ
- `js/83-ap-cu.js:1` · 3.407 (anh 30/10 qua TK 1 — docs/AP_KP_CU.md 1.0): GHI CHÚ ẤP / KHU PHỐ CŨ — chỉ để tham khảo, nhớ dần; KHÔNG dùng tính 
- `js/84-cccd-to-truong.js:15` · ② màn kiểm

## 3. Nhóm hàm theo tiền tố (khối chức năng)

| Tiền tố | Số hàm | File | Ví dụ |
|---|---|---|---|
| `kt` KTGS Hội (Mẫu 06/16/04, KH…) | 389 | `22b-ktgs.js` 108, `22d-ktgs-04.js` 102, `22e-ktgs-kh.js` 86 | ktXepLoai, ktNgayDau, ktDocBC, ktPhanTich |
| `sl` Số liệu (nạp, kho kỳ, ma trận) | 246 | `22-so-lieu.js` 122, `22k-nap-kt.js` 97, `22f-tra-cuu.js` 7 | slLoai, slChuan, slLaNgay, slLaHS |
| `to` Tổ TK&VV | 125 | `22gb-to-giao-dien.js` 53, `22g-to.js` 37, `22h-cap-hoi-sao-ke.js` 30 | toSang, toNutSL, toTruongScan, toStkChu |
| `tc` Tra cứu KH | 65 | `22f-tra-cuu.js` 33, `58-tc-to.js` 22, `22h-cap-hoi-sao-ke.js` 5 | tcChep, tcC, tcDiaChi, tcSdtDat |
| `sk` Sao kê | 60 | `22h-cap-hoi-sao-ke.js` 45, `59-suc-khoe.js` 7, `76-sk-danh-sach.js` 7 | skChon, skKhoCua, skChonBC, skVeDS |
| `hs` Hồ sơ CCCD / hộ | 37 | `04b-hom-nay.js` 37 | hsDoc, hsNgay, hsCuoiThang, hsEdate |
| `lc` Lịch | 35 | `04b3-hom-nay-lich-viec.js` 18, `04b-hom-nay.js` 15, `04b2-hom-nay-ghi-chu.js` 2 | lcISO, lcNgay, lcDM, lcDMY |
| `pv` Bộ chọn phạm vi (cây địa bàn) | 31 | `22ga-pham-vi.js` 29, `22g-to.js` 2 | pvChungO, pvGan, pvApChu, pvApKhoa |
| `ch` Đồng bộ cài đặt | 28 | `17-dong-bo-cai-dat.js` 13, `36-dong-bo-khoi.js` 9, `17b-so-cai-dat.js` 6 | chRieng, chBamChu, chKhoa, chBamKhoa |
| `th` Tổng hợp | 27 | `22i-tong-hop.js` 27 | thSau, thChon, thChonBC, thCH |
| `tg` Tìm / gợi ý | 26 | `54-tgtv-khai.js` 15, `06-hop-thoai.js` 10, `07-cccd.js` 1 | tgChipHTML, tgDem, tgGoi, tgThem |
| `tr` Bộ in chuẩn | 19 | `45-tra-mau31.js` 17, `05-them-file.js` 1, `84-cccd-to-truong.js` 1 | trLe, trNoi, trTim, trNut |
| `bm` Biểu mẫu | 12 | `09-bieu-mau.js` 12 | bmTim, bmDungThem, bmSapXep, bmGhiChu |
| `ln` Lưu nhanh | 11 | `12b-scan-dien-thoai.js` 8, `34-luu-ngan.js` 3 | lnCai, lnGhi, lnThuMuc, lnDoi |
| `ka` Chữ ký · CCCD (khay ảnh) | 11 | `12b-scan-dien-thoai.js` 7, `35-scan.js` 3, `12c-scan-camera-drive.js` 1 | kaTuTimKhung, kaXuLy, kaXoay, kaThang |
| `cg` Chỉnh gốc ảnh | 9 | `12-scan.js` 9 | cgDung, cgDiem, cgDiemKeo, cgKeo |
| `sc` Scan | 9 | `81-scan-pdf-the.js` 7, `35-scan.js` 2 | scLoaiNho, scChonNguon, scDoThe, scVeTrang |
| `tdn` Theo dõi nợ | 7 | `04e-chung.js` 7 | tdnNgay, tdnTien, tdnTr, tdnCuoiKy |

## 4. Điểm vào hay dùng

- `ve` `js/04-giao-dien.js:100`
- `doiNgan` `js/04-giao-dien.js:4`
- `luu` `js/02-nen.js:205`
- `luuFile` `js/02-nen.js:268`
- `docFile` `js/02-nen.js:282`
- `moHop` `js/06-hop-thoai.js:3`
- `dongHop` `js/06-hop-thoai.js:57`
- `hoi` `js/06-hop-thoai.js:96`
- `bao` `js/02-nen.js:338`
- `veHomNay` `js/04b3-hom-nay-lich-viec.js:723`
- `veVanBan` `js/04c-van-ban-thang.js:3`
- `veThang` `js/04c-van-ban-thang.js:887`
- `veGhiChu` `js/04e-chung.js:55`
- `veScan` `js/12-scan.js:11`
- `veBieuMau` `js/09-bieu-mau.js:15`
- `veThem` `js/05-them-file.js:4`
- `veSoLieu` `js/22k-nap-kt.js:35`
- `slDocFile` `js/22-so-lieu.js:358`
- `slGhi` `js/22-so-lieu.js:619`
- `slBo` `js/22-so-lieu.js:963`
- `slKyDung` `js/22-so-lieu.js:928`
- `toNap` `js/22g-to.js:166`
- `toVe` `js/22gb-to-giao-dien.js:15`
- `veKTGS` `js/22b-ktgs.js:108`
- `veSaoKe` `js/22h-cap-hoi-sao-ke.js:404`
- `veTongHop` `js/22i-tong-hop.js:333`
- `inChuan` `js/05-them-file.js:1361`
- `inBlob` `js/05-them-file.js:1155`
- `xemChuan` `js/05-them-file.js:1369`
- `pvLuaChon` `js/22ga-pham-vi.js:10`
- `chTheoDoi` `js/17-dong-bo-cai-dat.js:49`
- `slDay` `js/22-so-lieu.js:790`
- `slDayMeta` `js/22-so-lieu.js:841`
- `henDongBoChiMuc` `js/17-dong-bo-cai-dat.js:106`
- `batDau` `js/20-khoi-dong.js:126`
- `khoiDong` `js/20-khoi-dong.js:14`

Tab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · 5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).
