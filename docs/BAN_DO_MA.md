# BẢN ĐỒ MÃ (tự sinh bởi `tests/bando.py`, đừng sửa tay)

Bản 3.342 · 24/10/2026 16:33 · 93 file · 41709 dòng · 3403 hàm cấp ngoài · 554 biến toàn cục.

Cách dùng: tìm file / mục dưới đây rồi `grep -n "function tênHàm" js/*.js` hoặc đọc đúng khoảng dòng (Read offset/limit). Thứ tự nạp = thứ tự bảng 1 (đúng như các khối <script> trước khi tách). `python3 tests/ghep.py ra.html` ghép lại 1 file. Số dòng đổi theo bản — chạy lại script khi cần.


## 1. Các file (thứ tự nạp)

| File | Số dòng | Số hàm | Mở đầu |
|---|---|---|---|
| `index.html` | 278 | 0 | Khung trang (thẻ HTML tĩnh) + thẻ nạp css / js |
| `css/app.css` | 3977 | 0 | :root{ box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); |
| `js/01-thu-vien.js` | 68 | 4 | /*   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được Lần đầu có mạng: tải về và cất vào máy. |
| `js/02-nen.js` | 374 | 26 | /*   TỦ HỒ SƠ — bản 1.0  (giai đoạn 1) Cấu trúc file: |
| `js/03-doc-pdf.js` | 627 | 46 | /*   4. ĐỌC PDF & RÚT THÔNG TIN   */  function sanSangPDF(){ |
| `js/04-giao-dien.js` | 115 | 12 | /*   6. VẼ GIAO DIỆN   */ var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', l |
| `js/04b-hom-nay.js` | 2517 | 254 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 117–2633 của bản 3.33 |
| `js/04c-van-ban-thang.js` | 976 | 82 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 2634–3608 của bản 3.3 |
| `js/04d-bo-ho-so.js` | 273 | 23 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 3609–3880 của bản 3.3 |
| `js/04e-theo-doi-no.js` | 1537 | 135 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 3881–5417 của bản 3.3 |
| `js/05-them-file.js` | 1353 | 71 | /*   7. THÊM FILE & DUYỆT TÊN   */ var dangDoc = false; |
| `js/06-hop-thoai.js` | 2217 | 157 | /*   HỘP THOẠI CHUNG   */ var hamDong = null, khoaHop = false; function moHop(html, rong){ |
| `js/06b-xoa-nhieu.js` | 205 | 23 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/06-hop-thoai.js (dòng 2218–2421 của bản 3.3 |
| `js/06c-drive.js` | 697 | 33 | /* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/06-hop-thoai.js (dòng 2422–3118 của bản 3.3 |
| `js/07-cccd.js` | 194 | 14 | /*   12. HỒ SƠ CCCD - 3.32: KHÔNG mã hóa nữa (anh Nhân chốt: Drive của anh là nơi lưu bảo mật). |
| `js/08-dia-ban.js` | 583 | 49 | /*   danh mục địa bàn: Xã/phường → Điểm GD → Ấp/KP → Tổ   */ function dsXa(){ return (D.cauHinh.diaBan//[]).ma |
| `js/09-bieu-mau.js` | 552 | 45 | /*   13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền Xếp theo chương trình vay; có nhóm dùng chung và th |
| `js/10-danh-sach.js` | 1234 | 93 | /*   14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI   */ |
| `js/11-khung-tab.js` | 595 | 54 | /*   17. KHUNG CHUẨN CHO MỌI TAB Ba phần giống nhau ở mọi tab: |
| `js/12-scan.js` | 2564 | 213 | /*   18. SCAN HỒ SƠ — máy scan trong app Hai chế độ: |
| `js/13-xu-ly-anh.js` | 435 | 34 | /*   3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu) Tự động trước: tìm |
| `js/14-tim-loc.js` | 176 | 14 | /*   19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER Gõ vào ô tìm → app gợi ý "Nghiệp vụ: Xử lý rủi |
| `js/15-ai-chuan-hoa.js` | 153 | 8 | /*   15. NHỜ AI CHUẨN HÓA Xuất danh sách ra bảng → anh đưa AI (Gemini, ChatGPT, Claude) |
| `js/16-ai-dan-ket-qua.js` | 222 | 10 | /*   16. DÁN KẾT QUẢ TỪ AI Anh chép nguyên đoạn Gemini trả về, app tự đọc ra số hiệu, ngày, |
| `js/17-dong-bo-cai-dat.js` | 431 | 38 | /*   ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE   */ /* 3.113 (anh chốt: app cá nhân → lưu lên Drive hết): đồng bộ TOÀN BỘ cài  |
| `js/17b-so-cai-dat.js` | 88 | 6 | /*   3.260 (R4 phần 2 — docs/KE_HOACH_CHUAN_HOA.md mục 3.6): SỔ ĐĂNG KÝ CÀI ĐẶT — mọi khóa D.cauHinh app dùng, |
| `js/18-cai-dat.js` | 398 | 20 | /*   20. CÁC HÀM CÀI ĐẶT — bản dựng lại   */ |
| `js/19-danh-muc.js` | 222 | 23 | /*   21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU Một bộ sửa dùng chung cho: Mảng · Chương trình |
| `js/20-khoi-dong.js` | 140 | 4 | /*   KHỞI ĐỘNG   */ function capNhatDau(){ document.getElementById('donvi').textContent = |
| `js/21-ngay-gy.js` | 38 | 3 | /* 3.135 — anh Nhân: mọi ô chọn ngày ghi rõ kiểu ngày/tháng/năm (trình duyệt tiếng Anh hiện tháng/ngày → dễ nh |
| `js/22-so-lieu.js` | 1102 | 114 | /* 3.235 (R3): file này giữ phần lõi; các khối khác tách sang js/22b…22i (nạp ngay sau theo thứ tự tên) + khuô |
| `js/22b-ktgs.js` | 753 | 112 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1102–1816 của bản 3.234), không  |
| `js/22c-ktgs-m06.js` | 415 | 56 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1817–2251 của bản 3.234), không  |
| `js/22d-ktgs-04.js` | 697 | 103 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2252–2945 của bản 3.234), không  |
| `js/22e-ktgs-kh.js` | 538 | 80 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2946–3477 của bản 3.234), không  |
| `js/22f-tra-cuu.js` | 1141 | 107 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 3486–4545 của bản 3.234), không  |
| `js/22g-to.js` | 904 | 124 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 4546–5436 của bản 3.234), không  |
| `js/22h-cap-hoi-sao-ke.js` | 803 | 82 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 5437–6227 của bản 3.234), không  |
| `js/22i-tong-hop.js` | 739 | 54 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 6228–6963 của bản 3.234), không  |
| `js/22j-thong-tin-to.js` | 298 | 39 | /*   3.259 → 3.263 (anh chốt 18–19/10) — 📒 Sao kê › nhóm "Thông tin tổ" (theo file tổng hợp anh dùng hằng thán |
| `js/23-dieu-huong.js` | 186 | 27 | /*   3.147 (đợt F, anh duyệt 10/10/2026): THANH BÊN ĐIỀU HƯỚNG — máy tính màn ≥ 1100 px   - Chỉ đổi cách đi gi |
| `js/24-xuat.js` | 147 | 14 | /*   3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG Mọi mẫu / báo cáo: 👁 Xem → hàng nút  |
| `js/25-ho-so.js` | 1977 | 273 | /*   3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY Hai tab con của Số liệu |
| `js/26-giao-dich-xa.js` | 1121 | 139 | /*   3.172 (anh chốt 11/10/2026): 🏢 GIAO DỊCH XÃ — in nhanh 04/TD + 12/GDX, KHÔNG cần số liệu hộ vay   - Mẫu i |
| `js/27-mini-gdx.js` | 324 | 8 | /*   3.177 (anh chốt 13/10/2026): 📦 MINI APP Giao dịch xã — 1 file HTML gửi đồng nghiệp, có thời hạn   - Nút " |
| `js/28-tv-tk.js` | 338 | 39 | /*   3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ ① Mẫu 01/TV — Danh sách thành viên tổ (t |
| `js/29-kho.js` | 150 | 2 | /*   3.216 (anh 15/10/2026): CỬA KHO — kho số liệu chung (KIEN_TRUC_3_LOP 3.5 · QUY_CHUAN_KIEN_TRUC mục 3 "cửa |
| `js/30-khai-bao.js` | 28 | 2 | /*   3.222 (anh 16/10/2026, phương án B): ⚙ KHAI BÁO ĐƠN VỊ — 1 cửa sổ dùng chung mọi tab   - Mở từ nút "⚙ Kha |
| `js/31-o-mau.js` | 203 | 50 | /*   3.223 M3 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9): NỀN Ô MẪU — "OM"   Mỗi chỗ chấm trên  |
| `js/32-kho-luu.js` | 99 | 8 | /*   3.223 M1 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): CỬA LƯU KHO1 + LƯU AN TOÀN B1   - B |
| `js/33-so-ho-them.js` | 48 | 7 | /*   3.223 M2 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON mục 0.8): SỔ HỘ VAY ĐỦ CỘT   - Rà ngược các ô của mẫu gố |
| `js/34-luu-ngan.js` | 175 | 3 | /*   3.223 M8 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): LƯU THEO NGĂN TRONG IndexedDB (bước |
| `js/35-scan.js` | 135 | 9 | /*   3.224 (anh chốt 17/10/2026 — docs/KE_HOACH_3224_SCAN.md): QUY TRÌNH SCAN MỚI — 1 luồng chuẩn, cắm / rút   |
| `js/36-dong-bo-khoi.js` | 183 | 22 | /*   3.225 (anh chốt 17/10/2026 — docs/KE_HOACH_3225_LUU.md): ĐỒNG BỘ DRIVE THEO KHỐI   Khối (danh sách): vanb |
| `js/37-kiem-ho.js` | 193 | 23 | /*   3.228 (anh 17/10/2026): 🔎 KIỂM TRA HỘ VAY — luật logic khi nhập hộ, KHAI BÁO ĐƯỢC (bật / tắt · mức · ngưỡ |
| `js/38-goi-xem.js` | 71 | 11 | /*   3.231 (anh duyệt 17/10/2026 — KE_HOACH_CHUAN_HOA mục 8–9): 📱 GÓI SỐ LIỆU XEM cho bản điện thoại   Máy tín |
| `js/39-gd.js` | 91 | 0 | /*   3.234 (R2 — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): GIAO DIỆN CHUNG "GD" + ĐIỀU HƯỚNG "DH"   - Bộ nhận lệnh:  |
| `js/40-lap-01td.js` | 113 | 0 | /*   3.242 (anh 17/10 — KE_HOACH_CHUAN_HOA mục Hồ sơ vay hướng B, ý 1–19): FORM LẬP 01/TD   Cột trái tab 01/TD |
| `js/41-scan-sap-xep.js` | 592 | 57 | /*   3.264 (anh chốt 20/10/2026) — 🗂 LƯU SCAN TẬP TRUNG · 🧹 SẮP XẾP · 📊 KIỂM TRA · 📇 ĐỌC CCCD (QR / 3 dòng mã  |
| `js/42-scan-ra-soat.js` | 323 | 31 | /*   3.268 (anh chốt 20/10/2026) — 🔎 RÀ CCCD ĐÃ LƯU · BẢN TRÙNG - Anh: "có nên có bước chạy kiểm tra các CCCD  |
| `js/43-scan-anh-drive.js` | 357 | 30 | /*   3.271 (anh chốt 20/10/2026) — 🖼 ẢNH 2 MẶT CCCD LÊN DRIVE · CẮT ẢNH TỪ PDF CŨ · BẢNG ĐỐI CHIẾU · CMND 9 SỐ |
| `js/44-quet-cccd-form.js` | 144 | 19 | /*   3.273 (anh duyệt 20/10/2026: "cạnh ô nhập họ tên sẽ là 1 nút quét, khi bấm sẽ mở cam hoặc quét từ ảnh CCC |
| `js/45-tra-mau31.js` | 200 | 17 | /*   3.275 (anh 20/10/2026: "khi mở 1 file lên chỉnh sửa hay lưu mới anh sẽ đánh số CCCD hoặc họ tên hoặc mã K |
| `js/46-quan-ly-scan.js` | 138 | 9 | /*   3.278 (rà soát tab Scan 20/10 — anh: "em cứ code theo ý em và gộp lên"): BỐ CỤC GỌN - Thanh tab Scan: 1 n |
| `js/47-phan-bo.js` | 359 | 38 | /*   P1 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md): 🎯 PHÂN BỔ KẾ HOẠCH — LÕI NGHIỆP VỤ (tiền tố pb)   |
| `js/48-phan-bo-gd.js` | 718 | 85 | /*   P2 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 5): 🎯 PHÂN BỔ KH — GIAO DIỆN tab con trong 📈 Số |
| `js/49-ten-chuan.js` | 33 | 5 | /*   3.295 — SỔ QUY TẮC TÊN + NƠI LƯU HỒ SƠ THEO KHÁCH (lớp Nghiệp vụ, dùng chung) — bước 1 `docs/KE_HOACH_TEN |
| `js/50-xuat-khach.js` | 117 | 13 | /*   3.304 — CHỮ KÝ GẮN CÙNG CCCD + XUẤT FILE THEO KHÁCH (lớp Nghiệp vụ + Giao diện tab Scan) Anh 21/10/2026:  |
| `js/51-chu-ky.js` | 194 | 8 | /*   3.306 — CHỮ KÝ / LĂN TAY: NHẬN DẠNG, DỌN BẢN QUÉT NHẦM, BỎ ẢNH KHÁCH LƯU SẴN, NÚT BẢN PHOTO 2 MẶT (lớp Ng |
| `js/52-loc-photo.js` | 91 | 11 | /*   3.307 — CHẾ ĐỘ LỌC CHO BẢN PHOTO (lớp Nghiệp vụ xử lý ảnh, dùng chung Scan) Anh 21/10/2026: "tinh chỉnh t |
| `js/53-giay-nop.js` | 104 | 8 | /*   3.312 (anh 22/10/2026 gửi bản scan Giấy nộp tiền NHCSXH — "tạo mẫu tương tự Giấy lĩnh tiền kèm bảng kê nộ |
| `js/mau/01td.js` | 101 | 0 | /*   3.223 M4 — MẪU 01/TD trên nền ô (js/31-o-mau.js) — dựng theo file gốc tests/mau_goc/01td.docx   Lề 10 / 1 |
| `js/mau/01uq.js` | 66 | 0 | /*   3.223 M4 — MẪU 01/UQ Giấy ủy quyền trên nền ô — dựng theo file gốc tests/mau_goc/01uq.docx (VB 10493, áp  |
| `js/mau/03td.js` | 54 | 0 | /*   3.223 M5 — MẪU 03/TD Danh sách tổ viên đề nghị vay vốn trên nền ô — dựng theo file gốc tests/mau_goc/03td |
| `js/mau/09a.js` | 84 | 0 | /*   3.223 M5 — MẪU 09A/TD Giấy đề nghị gia hạn nợ trên nền ô — dựng theo file gốc tests/mau_goc/09a.docx (QĐ  |
| `js/mau/01tdck.js` | 53 | 0 | /*   3.223 M5 — MẪU 01/TĐCK Giấy đề nghị thay đổi mẫu chữ ký giao dịch trên nền ô — dựng theo file gốc tests/m |
| `js/mau/01tgtv.js` | 123 | 0 | /*   3.223 M5 — MẪU 01/TGTV Giấy đăng ký mở tài khoản tổ viên trên nền ô   BỐ CỤC GIỮ NGUYÊN 3.218–3.219 (anh  |
| `js/mau/01gqvl.js` | 160 | 0 | /*   3.223 M5 — MẪU 01/GQVL Phương án sử dụng vốn vay (người lao động) trên nền ô — dựng theo file gốc tests/m |
| `js/mau/07b.js` | 186 | 0 | /*   3.223 M5 — MẪU 07b/GQVL Hợp đồng tín dụng (người lao động) trên nền ô — dựng theo file gốc tests/mau_goc/ |
| `js/mau/07pb.js` | 86 | 12 | /*   3.289 P3 (anh Nhân 21/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 6): BIỂU 07 PHÂN BỔ KH — mẫu in dựng theo |
| `js/54-tgtv-khai.js` | 154 | 15 | /*   3.315 (anh 22/10 "làm hoàn chỉnh 01TGTV in bằng 2 cách: lấy từ Mẫu 31 hoặc in nhanh tự khai, khai nhanh t |
| `js/56-ktgs-bo.js` | 110 | 20 | /*   3.327 — KTGS bước 1 (docs/KE_HOACH_KTGS_GON.md mục 2.4, 3): 2 BỘ KHAI BÁO CỐ ĐỊNH (anh chốt 23/10)   ① Hộ |
| `js/57-cay.js` | 34 | 0 | /*   3.328 (anh chốt 23/10): CÂY ĐỊA BÀN NHÚNG — 1 chỗ lấy danh sách Xã › Điểm GD › Ấp › Hội › Tổ và vẽ ô chọn |
| `js/58-tc-to.js` | 127 | 16 | /*   3.333 (anh chốt 23–24/10): TRA CỨU KH — KHỐI TỔ + BẢNG TỔ CỦA ĐIỂM GD (kết nạp) - Khi duyệt hồ sơ: tra kh |
| `js/59-suc-khoe.js` | 34 | 7 | /*   3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2 — anh 24/10 "cứ theo KH làm"): 🩺 SỨC KHỎE SAO LƯU Thẻ ở ⚙ Khai bá |
| `js/60-ve-dt.js` | 12 | 0 | /*   3.342 (TK 3 — KE_HOACH_DIEN_THOAI_2 mục 7.1, anh 24/10 "khi cần cũng có nút chuyển sang bản web"): NÚT 📱  |
| `js/mau/10c.js` | 106 | 0 | /*   3.223 M6 — MẪU 10C/TD MỚI (QĐ 70, từ 01/10/2026) Biên bản họp kết nạp, cho ra khỏi Tổ — trên nền ô, dựng  |
| `js/mau/10ccu.js` | 84 | 0 | /*   3.223 M6 — MẪU 10C/TD CŨ (vào tổ đến 30/09/2026) Biên bản họp kết nạp bổ sung, cho ra khỏi Tổ — trên nền  |
| `js/mau/10a.js` | 109 | 0 | /*   3.223 M6 — MẪU 10A/TD Biên bản họp thành lập Tổ TK&VV (QĐ 70) trên nền ô — dựng theo file gốc tests/mau_g |
| `js/mau/10b.js` | 91 | 0 | /*   3.223 M6 — MẪU 10B/TD Biên bản họp kết nạp tổ viên, bầu thay đổi Ban quản lý Tổ (QĐ 70) trên nền ô — dựng |
| `js/mau/10d.js` | 82 | 0 | /*   3.223 M6 — MẪU 10D/TD Biên bản họp giải thể Tổ TK&VV (QĐ 70) — MẪU MỚI, dựng trên nền ô theo file gốc tes |
| `js/mau/11.js` | 141 | 0 | /*   3.223 M6 — MẪU 11/TD MỚI (QĐ 70, từ 01/10/2026) Hợp đồng ủy nhiệm — trên nền ô, dựng theo file gốc tests/ |
| `js/mau/11cu.js` | 131 | 0 | /*   3.223 M6 — MẪU 11/TD CŨ (trước 01/10/2026, QĐ 15) Hợp đồng ủy nhiệm — trên nền ô, dựng theo file gốc test |

## 2. Mục trong mã (chú thích tiêu đề)

- `js/01-thu-vien.js:1` · BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được
- `js/02-nen.js:1` · TỦ HỒ SƠ — bản 1.0  (giai đoạn 1)
- `js/02-nen.js:14` · 1. HẰNG SỐ
- `js/02-nen.js:176` · 2. LƯU TRỮ
- `js/02-nen.js:302` · 3. TIỆN ÍCH
- `js/03-doc-pdf.js:1` · 4. ĐỌC PDF & RÚT THÔNG TIN
- `js/03-doc-pdf.js:381` · RÚT THÔNG TIN TỪ CHÍNH TÊN FILE
- `js/03-doc-pdf.js:456` · 5. SINH TÊN CHUẨN
- `js/04-giao-dien.js:1` · 6. VẼ GIAO DIỆN
- `js/04b-hom-nay.js:71` · LỊCH (tab Hôm nay) — bản 3.9, theo tab Lịch của CBTD AI
- `js/04b-hom-nay.js:91` · NGÀY CHAY · MÙNG 1 · RẰM · LỄ ÂM (3.12)
- `js/04b-hom-nay.js:161` · vẽ
- `js/04b-hom-nay.js:201` · 3.62 — VIỆC W: CỘT 🧰 CÔNG CỤ cạnh lịch (anh chốt 02/10/2026)
- `js/04b-hom-nay.js:222` · 3.83 — 📊 SỐ LIỆU GIAO BAN (từ Theo dõi nợ): mỗi danh sách (3 tháng KHD · quá hạn · khoanh) kỳ mới nhất SO VỚI kỳ trước
- `js/04b-hom-nay.js:305` · 3.83 — 📅 CHUẨN BỊ BUỔI GIAO DỊCH XÃ: chọn điểm GD (mặc định điểm có ngày GD gần nhất)
- `js/04b-hom-nay.js:369` · 3.71 — 🧰 CÔNG CỤ: 📋 CHƯƠNG TRÌNH VAY
- `js/04b-hom-nay.js:511` · W① HẠN TRẢ NỢ HSSV — đúng công thức file Excel Sheet2 anh đang dùng
- `js/04b-hom-nay.js:807` · W② CÂY ĐỊA BÀN — mã xã · mã điểm GD · mã ấp/KP, xếp theo mã
- `js/04b-hom-nay.js:853` · trang NHẬT KÝ CÔNG VIỆC (giấy vàng) của ngày đang chọn
- `js/04b-hom-nay.js:854` · GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
- `js/04b-hom-nay.js:874` · SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
- `js/04b-hom-nay.js:921` · HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
- `js/04b-hom-nay.js:1161` · ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
- `js/04b-hom-nay.js:1487` · 💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
- `js/04b-hom-nay.js:1602` · CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
- `js/04b-hom-nay.js:1766` · CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
- `js/04b-hom-nay.js:2081` · thao tác
- `js/04b-hom-nay.js:2154` · Danh sách: quá hạn + 60 ngày tới
- `js/04b-hom-nay.js:2182` · Tính ngày
- `js/04b-hom-nay.js:2227` · đồng bộ _Hệ thống/lich.json
- `js/04b-hom-nay.js:2383` · TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
- `js/04c-van-ban-thang.js:109` · BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào
- `js/04c-van-ban-thang.js:114` · MA TRẬN THÁNG (3.21) — màn chính của tab Tháng
- `js/04c-van-ban-thang.js:305` · QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
- `js/04c-van-ban-thang.js:518` · 3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
- `js/04c-van-ban-thang.js:754` · CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
- `js/04d-bo-ho-so.js:2` · 3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
- `js/04e-theo-doi-no.js:2` · 3.64 — ⚠ THEO DÕI NỢ (Thư viện): 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh (anh chốt 03/10/2026)
- `js/04e-theo-doi-no.js:62` · lưu / nạp
- `js/04e-theo-doi-no.js:131` · tiện ích
- `js/04e-theo-doi-no.js:184` · ĐỌC FILE SAO KÊ THÁNG
- `js/04e-theo-doi-no.js:338` · GIAO DIỆN: danh sách + cây
- `js/04e-theo-doi-no.js:449` · 3.82 — 🏠 HỒ SƠ HỘ MỘT TRANG: gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab
- `js/04e-theo-doi-no.js:568` · THẺ MÓN: số liệu · hồ sơ hộ · nhật ký · tài liệu · vị trí
- `js/04e-theo-doi-no.js:655` · lần làm việc
- `js/04e-theo-doi-no.js:730` · vị trí nhà
- `js/04e-theo-doi-no.js:759` · tài liệu của hộ
- `js/04e-theo-doi-no.js:826` · 📝 BIÊN BẢN — danh mục mẫu (thêm mẫu sau không sửa phần khác)
- `js/04e-theo-doi-no.js:910` · 🧾 PHIẾU THÔNG TIN MÓN VAY (3.66 · việc AI) — "sơ yếu lý lịch" món nợ xấu
- `js/04e-theo-doi-no.js:1161` · 🖨 DANH SÁCH CHI TIẾT + TỔNG HỢP THEO XÃ, ĐIỂM GD (3.67 · việc AH)
- `js/04e-theo-doi-no.js:1300` · nhắc ở Hôm nay
- `js/05-them-file.js:1` · 7. THÊM FILE & DUYỆT TÊN
- `js/05-them-file.js:533` · 8. XEM TRƯỚC / IN / GỬI
- `js/05-them-file.js:619` · TRÌNH XEM DÙNG CHUNG cho khung lớn (#x-than) và cột phải (#cp-than)
- `js/05-them-file.js:1170` · 3.128 — BỘ IN CHUẨN (anh chốt): app tự chia trang A4 → xem trước = bản in
- `js/06-hop-thoai.js:1` · HỘP THOẠI CHUNG
- `js/06-hop-thoai.js:104` · SỬA MỘT MỤC
- `js/06-hop-thoai.js:120` · PHÂN LOẠI 3 CẤP (bản 3.4): Mảng (1) · CT vay (1 hoặc Dùng chung) · Tag (nhiều)
- `js/06-hop-thoai.js:311` · 3.69 (việc AJ, anh chốt) — HỘP SỬA GỌN: ô chọn, Tag gợi ý, phím nhập nhanh, dòng 💡 hướng dẫn chung
- `js/06-hop-thoai.js:932` · ĐỒNG BỘ MỤC LÊN FILE THẬT TRÊN DRIVE (bản 3.6)
- `js/06-hop-thoai.js:1120` · XÓA · THÙNG RÁC · XÓA HẲN (bản 3.10)
- `js/06-hop-thoai.js:1262` · 3.144 — BỎ TAB THÁNG (anh chốt Q5, Q12, 10/10/2026): xóa dữ liệu cũ của tab một lần, không sao lưu.
- `js/06-hop-thoai.js:1320` · CHỜ KHAI (3.11) — mọi file chưa đủ thông tin về MỘT danh sách, xem ở tab Văn bản
- `js/06-hop-thoai.js:1412` · CHỤP / CHỌN ẢNH GHI CHÚ
- `js/06-hop-thoai.js:1432` · 9. CÀI ĐẶT
- `js/06-hop-thoai.js:1857` · 3.50: ❓ HƯỚNG DẪN TRỰC QUAN — chia theo tab, sơ đồ luồng dữ liệu, các bước theo logic.
- `js/06b-xoa-nhieu.js:2` · 3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc ch
- `js/06c-drive.js:2` · 10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
- `js/06c-drive.js:272` · 3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
- `js/06c-drive.js:387` · 11. LẬP CHỈ MỤC
- `js/06c-drive.js:446` · 3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
- `js/07-cccd.js:1` · 12. HỒ SƠ CCCD
- `js/07-cccd.js:42` · 3.79.1 — KHÔI PHỤC DANH SÁCH SCAN TỪ ẢNH CÒN TRONG MÁY
- `js/08-dia-ban.js:482` · 3.33 — ĐƯA HỒ SƠ SCAN LÊN DRIVE
- `js/09-bieu-mau.js:1` · 13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền
- `js/09-bieu-mau.js:88` · BIỂU MẪU 3.24 — như một thư mục: ghim · đếm lần dùng · ghi chú cách dùng ·
- `js/09-bieu-mau.js:221` · 3.31 — MỞ FILE WORD/EXCEL KHÔNG PHẢI TẢI VỀ (tránh rác trong thư mục Tải xuống)
- `js/09-bieu-mau.js:328` · 3.61 (việc M): GỬI NHIỀU BIỂU MẪU · NÉN .ZIP
- `js/10-danh-sach.js:1` · 14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI
- `js/10-danh-sach.js:215` · QUÉT DỌN RÁC — chỉ trong thư mục Tủ hồ sơ, chỉ đọc cho tới khi anh chọn
- `js/10-danh-sach.js:542` · 3.50: 🧰 DỌN KHO — một nơi duy nhất (thay Bảo trì kho ở Cài đặt và Thư viện).
- `js/10-danh-sach.js:685` · 3.77 — VĂN BẢN TRÙNG: cùng số hiệu (bỏ dấu, khoảng trắng, gạch) + cùng năm ban hành
- `js/11-khung-tab.js:1` · 17. KHUNG CHUẨN CHO MỌI TAB
- `js/12-scan.js:1` · 18. SCAN HỒ SƠ — máy scan trong app
- `js/12-scan.js:933` · 3.43: SCAN TRÊN ĐIỆN THOẠI THEO KIỂU LENS — Quét → Xong → PDF lưu tạm (tên Scan ngày giờ, sửa ngay) → xem trước → Gửi
- `js/12-scan.js:1096` · 3.49: MÁY BÀN — 💾 LƯU NHANH + 📋 COPY thay nút Gửi (điện thoại giữ 📤 Gửi). Drive vẫn là nơi lưu mặc định.
- `js/12-scan.js:1220` · 3.44: CHỮ KÝ · ẢNH KHÁCH HÀNG — file ảnh nhỏ (dưới 200 KB, càng nhỏ càng tốt) để nhập lên hệ thống khi tạo hồ sơ.
- `js/12-scan.js:1513` · 3.45: CAMERA TRONG APP — dùng chung iPhone và máy bàn có webcam.
- `js/12-scan.js:1732` · 3.46: ĐỒNG BỘ DRIVE — mặc định khi mở app, khi rời app, ngay sau khi lưu; tùy chọn mỗi 5 phút; nút ☁ Đồng bộ ngay.
- `js/12-scan.js:1842` · 3.46 (mục K): ĐỌC CHỮ PDF ẢNH (OCR) — chỉ khi anh bấm, chỉ hiện nút khi mục còn thiếu thông tin.
- `js/12-scan.js:1884` · 3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
- `js/12-scan.js:2126` · 3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi"
- `js/13-xu-ly-anh.js:1` · 3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu)
- `js/14-tim-loc.js:1` · 19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER
- `js/15-ai-chuan-hoa.js:1` · 15. NHỜ AI CHUẨN HÓA
- `js/16-ai-dan-ket-qua.js:1` · 16. DÁN KẾT QUẢ TỪ AI
- `js/17-dong-bo-cai-dat.js:1` · ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE
- `js/17-dong-bo-cai-dat.js:84` · ĐỒNG BỘ CHỈ MỤC TỦ HỒ SƠ QUA DRIVE (việc #4)
- `js/17-dong-bo-cai-dat.js:104` · 3.81 — SAO LƯU & KHÔI PHỤC
- `js/17b-so-cai-dat.js:1` · 3.260 (R4 phần 2 — docs/KE_HOACH_CHUAN_HOA.md mục 3.6): SỔ ĐĂNG KÝ CÀI ĐẶT — mọi khóa D.cauHinh app dùng, 1 dòng mô tả.
- `js/18-cai-dat.js:1` · 20. CÁC HÀM CÀI ĐẶT — bản dựng lại
- `js/19-danh-muc.js:1` · 21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU
- `js/20-khoi-dong.js:1` · KHỞI ĐỘNG
- `js/22-so-lieu.js:2` · 3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng
- `js/22-so-lieu.js:120` · 1. ĐỌC WORKBOOK (thử Worker để màn hình không treo; không được thì đọc trực tiếp)
- `js/22-so-lieu.js:159` · 2. NHẬN DẠNG + LẤY DÒNG DỮ LIỆU
- `js/22-so-lieu.js:259` · 3. KỲ (ngày chốt): cột ngày → ngày ở tiêu đề → tên file
- `js/22-so-lieu.js:306` · 4. TỔNG CHÍNH của từng loại
- `js/22-so-lieu.js:341` · 5. ĐỌC MỘT FILE → kết quả xem trước
- `js/22-so-lieu.js:442` · 6. DẠNG ĐỌC NHANH: lưu theo cột, chữ lặp thay bằng số thứ tự
- `js/22-so-lieu.js:483` · 7. CHỈ MỤC (meta) + danh bạ khách hàng
- `js/22-so-lieu.js:601` · 8. GHI NHẬN 1 file đã đọc
- `js/22-so-lieu.js:626` · 3.153 (anh chốt "thống nhất quy tắc xóa"): Ô SỐ LIỆU VÀO 🗑 THÙNG RÁC APP (ngăn Số liệu)
- `js/22-so-lieu.js:751` · 9. ĐỒNG BỘ DRIVE
- `js/22-so-lieu.js:849` · 10. BỘ DỮ LIỆU KỲ: nối các bảng
- `js/22-so-lieu.js:1055` · 11. TAB 📈 SỐ LIỆU
- `js/22b-ktgs.js:13` · đọc file BC0437 / BC0438
- `js/22b-ktgs.js:90` · trạng thái + nạp dữ liệu cho tab
- `js/22b-ktgs.js:132` · nạp + kiểm tra theo chuẩn tab Nạp & Kiểm tra (anh chốt): ma trận loại × tháng · 📥 nạp nhiều file (xem trước, xác nhận) ·
- `js/22b-ktgs.js:247` · số liệu tổ từ BC0437 (thiếu thì tính từ Mẫu 31, ghi rõ nguồn)
- `js/22b-ktgs.js:263` · màn: chưa chọn tổ → bảng các tổ (BC0437) · chọn tổ → thẻ + chọn hộ
- `js/22b-ktgs.js:319` · phân loại hộ + gợi ý (Mẫu 06 kiểm tra đột xuất)
- `js/22b-ktgs.js:425` · khai báo khi in (mặc định trống) → Word đúng khuôn / In PDF
- `js/22b-ktgs.js:428` · 3.98 (anh chốt): khai báo nằm ngay trong tab của mẫu (khung ✎ thu gọn được), lưu lâu dài trừ ngày; cán bộ kiểm tra lấy t
- `js/22b-ktgs.js:440` · 3.114 (anh chốt): HỘP CHỌN KHI IN — mỗi mẫu 1 phần, nhớ lựa chọn lần trước (D.cauHinh.ktIn[mẫu], đồng bộ Drive);
- `js/22c-ktgs-m06.js:2` · 3.138 (anh chốt): Mẫu 06 gọn & nhạt
- `js/22c-ktgs-m06.js:130` · 3.93.1: Mẫu 06 KIỂM TRA SAU GIẢI NGÂN (727: kiểm tra sử dụng vốn trong 30 ngày) — anh chốt (làm đơn giản):
- `js/22c-ktgs-m06.js:233` · 3.98: dòng hộ dùng chung 3 màn chọn hộ (đột xuất · sau giải ngân · định kỳ)
- `js/22c-ktgs-m06.js:272` · bản In / PDF — cùng bố cục mẫu (A4 ngang Mẫu 06, A4 dọc Mẫu 16); trống = dòng chấm
- `js/22d-ktgs-04.js:21` · 3.98: 📖 BẢNG CHUẨN HÓA HỘI – ĐOÀN (anh chốt: chữ đặc thù dùng chung mọi mẫu, sửa 1 chỗ)
- `js/22d-ktgs-04.js:332` · ⚙ Khai báo Hội (mỗi Hội – xã 1 khối)
- `js/22d-ktgs-04.js:373` · 3.113 (anh chốt): 🏛 KHAI BÁO HỘI ĐOÀN THỂ — 1 nơi khai cho mọi mẫu (06, 16TD, 04, Kế hoạch); tab nhỏ Hội – xã · Chuẩn hó
- `js/22d-ktgs-04.js:376` · 3.117 (anh gửi mẫu tham khảo + bản Đoàn thật, anh: "làm mẫu luôn"): 📄 THÔNG BÁO PHÂN CÔNG NHIỆM VỤ BAN THƯỜNG VỤ trong c
- `js/22e-ktgs-kh.js:31` · 3.140 (anh chốt): IN THEO THÁNG KIỂM TRA (chip 🗓 Kế hoạch) — bấm tháng → các tổ của tháng (theo ấp):
- `js/22f-tra-cuu.js:40` · cột trái
- `js/22f-tra-cuu.js:158` · kiểm trùng 2 ô
- `js/22f-tra-cuu.js:212` · thẻ chi tiết (phải / hộp trên điện thoại)
- `js/22f-tra-cuu.js:383` · 3.150: tab Nạp & KT gọn
- `js/22f-tra-cuu.js:543` · 3.88: ① FILE THÁNG · ② KIỂM TRA (kết quả lưu theo tháng, dữ liệu đổi thì báo kiểm lại)
- `js/22f-tra-cuu.js:650` · 3.146 (anh chốt 10/10): KIỂM TRA KỲ — không chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã bấm kiểm, s
- `js/22f-tra-cuu.js:710` · 3.90.1: BẢNG ĐỐI CHIẾU CHÉO — chỉ tiêu × nguồn (BCDHTD chuẩn · LEN_31 · Mẫu 31 · Dư nợ chi tiết), toàn PGD và từng xã
- `js/22f-tra-cuu.js:947` · 12. NẠP: cả bộ / từng file
- `js/22f-tra-cuu.js:1105` · 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng
- `js/22g-to.js:2` · 3.88 — 👥 TAB CON TỔ TK&VV (trong tab Số liệu, cạnh Tra cứu KH): chọn 1 tổ (cây xã → điểm GD → hội → tổ, hoặc gõ tên) → b
- `js/22g-to.js:64` · 3.149 (anh chốt ý 6b): KỲ CHUNG — 1 ô ở đầu trang, phủ mọi tab (Nạp & KT, Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu…)
- `js/22g-to.js:240` · 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ)
- `js/22g-to.js:398` · 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể)
- `js/22g-to.js:458` · 3.92: TAB TỔ — mục đích (anh Nhân): biết số tổ viên để KẾT NẠP thêm hoặc CHO RA khỏi tổ, căn cứ dư nợ và số dư 105
- `js/22h-cap-hoi-sao-ke.js:2` · 3.132 (anh chốt) — CẤP HỘI / ĐIỂM GD / XÃ / PGD: dòng tóm tắt + chip lọc như của tổ; mặc định bảng các tổ (PGD: Cộng PGD
- `js/22h-cap-hoi-sao-ke.js:127` · báo cáo: mỗi báo cáo trả {ten, tieuDe, html (phần thân), aoa (Excel)}
- `js/22h-cap-hoi-sao-ke.js:299` · xem → in / Excel
- `js/22h-cap-hoi-sao-ke.js:349` · 3.89 — 👤 TRA CỨU KH: phạm vi (bộ chọn chung) + KIỂM TRÙNG trước khi nhập máy
- `js/22h-cap-hoi-sao-ke.js:384` · 3.89 — 📑 TAB CON SAO KÊ (trong Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi (bộ chọn chung) → tích → Xem → In / Excel
- `js/22h-cap-hoi-sao-ke.js:546` · 3.91: NỢ ĐẾN HẠN — theo ngày đến hạn hợp đồng (gia hạn nếu có) + kỳ GDXA chuyển quá hạn (anh chốt)
- `js/22h-cap-hoi-sao-ke.js:600` · 3.91: MÓN VAY TRẢ GỐC PHÂN KỲ — NỢ ĐẾN HẠN KỲ CON (anh Nhân; Công văn 597/NHCS-TDNN 30/01/2026)
- `js/22i-tong-hop.js:2` · 3.90 — 7 FILE TỔNG HỢP CHUẨN TW (anh chốt: số chính thức của TW, chuẩn nhất)
- `js/22i-tong-hop.js:112` · ghép tổ LEN_31 TO_TRUONG (chỉ có tên tổ trưởng, có khi bị cắt; 2 tổ trùng tên trong 1 xã gộp 1 dòng) với mã tổ
- `js/22i-tong-hop.js:160` · ② KIỂM TRA: số chuẩn TW khớp nhau (nhóm 7) · Mẫu 31 ↔ số chuẩn TW (nhóm 8) · KHĐ, tổ trưởng (nhóm 3)
- `js/22i-tong-hop.js:290` · 3.90 — 📊 TAB CON TỔNG HỢP (Số liệu): tiêu chí + bộ lọc → tích → Xem → In (A4 ngang) / Excel
- `js/22i-tong-hop.js:594` · 3.90: CHUẨN IN mọi báo cáo (anh chốt): A4, lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi tr
- `js/22i-tong-hop.js:599` · 3.90: XÓA cả bộ tháng / LÀM MỚI toàn bộ số liệu (chỉ phần Số liệu; Drive vào thùng rác, lấy lại được 30 ngày)
- `js/22i-tong-hop.js:644` · 3.90: THAY FILE 1 ô — file mới phải đúng loại, đúng kỳ của ô; khác thì báo, không thay
- `js/22i-tong-hop.js:662` · 3.90.1: TẢI FILE GỐC (bản sao để dùng việc khác) — trong máy nếu còn, không thì tải từ Drive
- `js/22i-tong-hop.js:680` · 3.90.1: TÌM FILE RÁC CỦA SỐ LIỆU (riêng phần Số liệu: trong máy sl_… + Drive Số liệu/ và _Hệ thống/so_lieu/; không đụng 
- `js/22j-thong-tin-to.js:1` · 3.259 → 3.263 (anh chốt 18–19/10) — 📒 Sao kê › nhóm "Thông tin tổ" (theo file tổng hợp anh dùng hằng tháng):
- `js/22j-thong-tin-to.js:22` · số liệu 1 tổ (theo món Mẫu 31) — dùng cho KQGD
- `js/22j-thong-tin-to.js:74` · 3.261 (anh 18/10: "cần dữ liệu tương tự, chốt cuối tháng"): KQGD theo khung file tổng hợp
- `js/22j-thong-tin-to.js:157` · 3.263 (anh chốt 19/10): 📊 TÌNH HÌNH HOẠT ĐỘNG (THHD) — thay "Bộ thông tin tổ": 1 trang A4 dọc, triệu đồng;
- `js/22j-thong-tin-to.js:228` · 3 sao kê chia Điểm GD › Hội › Tổ (dòng nhóm mang số cộng)
- `js/22j-thong-tin-to.js:289` · vào từ skBaoCao
- `js/24-xuat.js:1` · 3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG
- `js/25-ho-so.js:1` · 3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY
- `js/25-ho-so.js:47` · ⚙ khai báo 1 lần
- `js/25-ho-so.js:92` · 3.208 (anh chốt 14/10): CHƯƠNG TRÌNH VAY — mỗi CT 1 thẻ (D.cauHinh.hsoKB.ctv): tên tắt, tên in 01/03, đối tượng thụ hưởn
- `js/25-ho-so.js:161` · thông tin tổ / khách dùng cho mẫu
- `js/25-ho-so.js:185` · ô điền
- `js/25-ho-so.js:211` · khối dựng chung
- `js/25-ho-so.js:238` · 10C/TD
- `js/25-ho-so.js:303` · 10A/TD
- `js/25-ho-so.js:348` · 10B/TD
- `js/25-ho-so.js:381` · 11/TD
- `js/25-ho-so.js:453` · 01/BG · 02/BG
- `js/25-ho-so.js:512` · HỒ SƠ VAY: 01/TD · 03/TD · 04/TD · 09A/TD
- `js/25-ho-so.js:794` · 3.171 (anh chốt 11/10): BỘ HỒ SƠ VAY — lưu tạm (D.cauHinh.hsoBo, đồng bộ Drive), in thành bộ gửi tổ đi ký
- `js/25-ho-so.js:839` · 01/TD Giấy đề nghị vay vốn — đúng PDF (HSSV có xác nhận UBND xã; NSVSMT không)
- `js/25-ho-so.js:845` · 03/TD Danh sách tổ viên đề nghị vay vốn — đúng PDF (A4 ngang, số dòng = số người + 2 dòng trống, kẻ chấm)
- `js/25-ho-so.js:846` · 04/TD Thông báo kết quả phê duyệt — đúng PDF; in từng thông báo (chọn điểm GD, nhập số hộ + số tiền)
- `js/25-ho-so.js:847` · 09A/TD Giấy đề nghị gia hạn nợ — đúng PDF
- `js/25-ho-so.js:848` · 01/UQ Giấy ủy quyền — đúng PDF (thành viên hộ + người thừa kế chỉ ở mẫu này)
- `js/25-ho-so.js:880` · 01/TGTV Giấy đăng ký mở tài khoản tổ viên (mẫu 03/2026) — đúng PDF, có logo + chân trang
- `js/25-ho-so.js:988` · lập mẫu đang chọn
- `js/25-ho-so.js:1013` · WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang)
- `js/25-ho-so.js:1110` · giao diện tab
- `js/25-ho-so.js:1182` · 3.207 (anh yêu cầu 14/10): 🏠 HỘ VAY MỚI — khai báo 1 lần (form nhập nhanh), lưu danh sách (D.cauHinh.hoMoi, đồng bộ Driv
- `js/25-ho-so.js:1206` · 3.209 (anh 14/10): SỔ HỘ VAY — hộ mới / lấy từ Mẫu 31; khai tổ khi tạo; chỉ bắt buộc người đứng tên, thành viên / thừa k
- `js/25-ho-so.js:1364` · 3.214 (anh 15/10): 📒 SỔ HỘ VAY — tab xem lại: lọc, sắp xếp, sửa thẳng từng ô (hộ mới), in đúng danh sách đang lọc
- `js/25-ho-so.js:1543` · 3.209 (anh 14/10): 03/TD NHIỀU HỘ — cùng 1 chương trình in chung 1 tờ; tích hộ ở sổ → 📋 Lập 03/TD, hoặc mở 03/TD → ＋ Thê
- `js/25-ho-so.js:1587` · 3.211 (anh chốt 14/10): GQVL — người lao động vay qua Tổ: 01/GQVL (mẫu mới VB 4039, từ 01/10/2026) · 03/TD · 07b/GQVL Hợ
- `js/25-ho-so.js:1814` · 3.209: cột trái 01/TD · 01/UQ · 03/TD · 01/TGTV theo hộ — chọn hộ → chọn chương trình → phương án → in (+ in kèm)
- `js/25-ho-so.js:1878` · cột tùy chọn của từng mẫu
- `js/26-giao-dich-xa.js:40` · hàm của file gốc (chuyển ES5, giữ nguyên cách tính)
- `js/26-giao-dich-xa.js:90` · điểm GD · tổ — 3.174 (anh chốt 12/10): cây địa bàn theo Mẫu 31 (kỳ chung, như các tab khác);
- `js/26-giao-dich-xa.js:153` · MẪU IN — chuyển nguyên văn từ file gốc
- `js/26-giao-dich-xa.js:294` · 3.174 (anh chốt 12/10 — docs/KE_HOACH_HO_SO_TO.md mục E): BỐ CỤC MỚI tab 🏢 Giao dịch xã
- `js/26-giao-dich-xa.js:318` · ngày của 04/TD: ngày ký (hôm nay / chọn ngày) · ngày phát (mặc định = ngày GD gần nhất của điểm; tại PGD = ngày mai)
- `js/26-giao-dich-xa.js:323` · bản chụp lựa chọn để dựng mẫu (xem trước · in · nhật ký in lại dùng chung 1 bản)
- `js/26-giao-dich-xa.js:354` · mục của từng mẫu — theo thứ tự trên mẫu; nhanh = mặc định ra khung chọn nhanh (anh đổi ở ⚙)
- `js/26-giao-dich-xa.js:403` · ô điều khiển dùng chung
- `js/26-giao-dich-xa.js:452` · vẽ 1 mục (khung chọn nhanh và ⚙ dùng chung; kb = đang ở ⚙ → có thêm phần quản lý)
- `js/26-giao-dich-xa.js:522` · theo khối lọc: điểm GD / xã đang chọn → điền mẫu
- `js/26-giao-dich-xa.js:537` · vẽ tab
- `js/26-giao-dich-xa.js:638` · 📋 Tóm tắt bản in: chip + cảnh báo (không chặn — hỏi 1 lần) + nút in
- `js/26-giao-dich-xa.js:722` · ⚙ Khai báo riêng mẫu: MỌI mục, theo thứ tự trên mẫu; tích "Chọn nhanh" → ra khung trái
- `js/26-giao-dich-xa.js:734` · 3.174: 💵 GIẤY LĨNH TIỀN MẶT (anh chốt 12/10) — khách rút TK 105 hoặc tổ trưởng rút TK 104; số liệu theo kỳ / ngày số liệ
- `js/26-giao-dich-xa.js:966` · 3.187 (anh gửi ảnh mẫu 13/10): 🧾 BẢNG KÊ CÁC LOẠI TIỀN NGÂN HÀNG CHI RA — in kèm Giấy lĩnh, cùng người lĩnh / số tiền.
- `js/26-giao-dich-xa.js:1066` · ⚙ Khai báo chung
- `js/26-giao-dich-xa.js:1069` · 📜 Nhật ký in: chỉ lưu lựa chọn (không lưu PDF), trên máy này, tự xóa sau 1 tháng (anh chốt)
- `js/26-giao-dich-xa.js:1088` · ⭐ Mẫu hay in (số hộ + số tiền) · mức tiền · danh sách cán bộ — giữ từ 3.172
- `js/27-mini-gdx.js:24` · gói số liệu (chỉ chạy trên máy anh lúc xuất)
- `js/27-mini-gdx.js:76` · KHUNG MINI APP — chỉ chạy TRONG file mini (gdxMiniApp được chép nguyên vào file lúc xuất). Không chạy trong app chính.
- `js/28-tv-tk.js:1` · 3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ
- `js/28-tv-tk.js:102` · 3.333 QT-18 (anh chốt 24/10): THÀNH VIÊN CHUẨN 1 TỔ theo kỳ đang dựng (TO_K — chốt tháng hoặc ngày)
- `js/28-tv-tk.js:122` · ③ ĐỐI CHIẾU THÀNH VIÊN TỔ: app (Mẫu 31) ↔ Mẫu 01/TV (TƯ)
- `js/28-tv-tk.js:167` · ④ TK 104 / TK 105 theo Sao kê ngày
- `js/28-tv-tk.js:273` · ⑤ Giấy lĩnh: tổ trưởng (Mã CIF TT) → TK 104 · CCCD anh gõ tay nhớ theo mã KH (D.cauHinh.ccNho, đồng bộ Drive như cài đặt
- `js/29-kho.js:139` · lõi kho (dời từ js/25 ở 3.216 — giữ tên hàm cũ để mọi chỗ gọi cũ vẫn chạy; tab mới gọi qua KHO.*)
- `js/31-o-mau.js:102` · giao diện cột trái: kiểu in · khai báo riêng (tóm tắt + Chọn nhanh)
- `js/31-o-mau.js:143` · 🖼 KHAI BÁO TRỰC QUAN: mẫu như giấy thật (trái) · ô đang chọn (phải)
- `js/32-kho-luu.js:40` · giao diện: tab 💾 Sao lưu trong ⚙ Khai báo đơn vị
- `js/34-luu-ngan.js:153` · giao diện: nhóm 🗄 Nơi lưu trong tab 💾 Sao lưu
- `js/37-kiem-ho.js:60` · dữ liệu phụ
- `js/37-kiem-ho.js:84` · bộ kiểm
- `js/37-kiem-ho.js:171` · hiển thị
- `js/41-scan-sap-xep.js:1` · 3.264 (anh chốt 20/10/2026) — 🗂 LƯU SCAN TẬP TRUNG · 🧹 SẮP XẾP · 📊 KIỂM TRA · 📇 ĐỌC CCCD (QR / 3 dòng mã máy đọc)
- `js/41-scan-sap-xep.js:17` · 1. tên + nơi lưu
- `js/41-scan-sap-xep.js:70` · 2. tra khách trên Mẫu 31 (danh bạ)
- `js/41-scan-sap-xep.js:147` · 3. đọc CCCD: QR → 3 dòng mã máy đọc → dòng "Số"
- `js/41-scan-sap-xep.js:240` · 4. quét CCCD: đọc số → tra khách → lưu thẳng đúng chỗ
- `js/41-scan-sap-xep.js:325` · 5. bản photo 2 mặt trên 1 tờ → chia đôi tờ
- `js/41-scan-sap-xep.js:370` · 6. 🧹 SẮP XẾP
- `js/41-scan-sap-xep.js:528` · 7. 📊 KIỂM TRA theo cây địa bàn
- `js/41-scan-sap-xep.js:581` · 8. tab Scan: dòng 🧹 Sắp xếp · 📊 Kiểm tra
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
- `js/45-tra-mau31.js:143` · 3.285 (anh 20/10: "chỗ lưu tên có nút Tra Mẫu 31 sau khi đã đánh số CCCD — anh muốn app có nút đọc số CCCD điền vào và t
- `js/46-quan-ly-scan.js:1` · 3.278 (rà soát tab Scan 20/10 — anh: "em cứ code theo ý em và gộp lên"): BỐ CỤC GỌN
- `js/46-quan-ly-scan.js:119` · 3.297 (bước 3 kế hoạch tên + lưu): 📷 QUÉT BẢN ĐÃ KÝ từ hồ sơ vay
- `js/47-phan-bo.js:23` · QT-15.1 dòng CT nào phải phân bổ
- `js/47-phan-bo.js:44` · thuật toán chia
- `js/47-phan-bo.js:95` · phân bổ 1 QĐ (1 xã)
- `js/47-phan-bo.js:161` · QT-17 nhập QĐ: gợi ý "Đã giao" + tổng hợp đầu năm
- `js/47-phan-bo.js:196` · tiện ích cho giao diện (vẫn thuần, không DOM)
- `js/47-phan-bo.js:219` · nhập QĐ từ file sao lưu .json của bản WPF ("SaoLuu_QD_*.json")
- `js/47-phan-bo.js:228` · 3.289 P3: dữ liệu Biểu 07 Phân bổ KH (QT-16) — thuần, mẫu in ở js/mau/07pb.js
- `js/47-phan-bo.js:254` · 3.301: ĐỐI CHIẾU CHÉO (anh 21/10: "tại mỗi QĐ tổng giao của Biểu 07 phải khớp số giao của QĐ và dư nợ đến cuối năm cũng 
- `js/47-phan-bo.js:296` · DIỄN BIẾN PHÂN VỐN THEO KH (anh 21/10: "làm thêm diễn biến phân vốn … theo KH", giao diện web hiện đại)
- `js/48-phan-bo-gd.js:22` · dựng: kỳ chung → cây địa bàn (xã → ấp)
- `js/48-phan-bo-gd.js:53` · 3.308 (anh 21/10 "tab phân bổ còn hiện chung các chức năng hơi rối … thanh tab ngang"): THANH TAB NGANG 4 MỤC — 📋 Quyết 
- `js/48-phan-bo-gd.js:68` · 📋 Quyết định: danh sách QĐ (thẻ)
- `js/48-phan-bo-gd.js:87` · cột phải: phân bổ 1 xã của QĐ
- `js/48-phan-bo-gd.js:153` · hộp nhập / sửa QĐ (QT-17)
- `js/48-phan-bo-gd.js:260` · 📥 nhập file sao lưu QĐ của bản WPF
- `js/48-phan-bo-gd.js:291` · 3.289 P3: BIỂU 07 (QT-16 — chỉ xuất khi khớp QĐ) · xem trước / In / PDF / Word · 1 xã hoặc mọi xã của QĐ
- `js/48-phan-bo-gd.js:330` · 3.301: ⚙ KHAI BÁO RIÊNG Biểu 07 (ô kiểu nền ô — js/mau/07pb.js PB07_O) · lưu KHO1 'pb' → ch.b07 = {cach, gt, co}; ✏ gõ t
- `js/48-phan-bo-gd.js:377` · 3.301: 🔎 ĐỐI CHIẾU CHÉO (pbDoiChieu ở js/47) — cột phải; cấp xã (cấp ấp chờ cách chia 3)
- `js/48-phan-bo-gd.js:459` · 3.301: 📈 DIỄN BIẾN PHÂN VỐN THEO KH (pbDienBien ở js/47) — thẻ số · biểu đồ SVG (KH hiệu lực bậc thang ↔ dư nợ Mẫu 31) ·
- `js/48-phan-bo-gd.js:655` · lệnh
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
- `js/54-tgtv-khai.js:64` · 3.316 (anh 23/10 "form cứng, chuẩn: họ tên, ngày sinh, CCCD, ngày cấp, SĐT, chọn xã, ấp — còn lại tự tính: giới tính, ng
- `js/54-tgtv-khai.js:90` · bấm trên bản xem
- `js/57-cay.js:1` · 3.328 (anh chốt 23/10): CÂY ĐỊA BÀN NHÚNG — 1 chỗ lấy danh sách Xã › Điểm GD › Ấp › Hội › Tổ và vẽ ô chọn kiểu ☰ Gọn
- `js/58-tc-to.js:1` · 3.333 (anh chốt 23–24/10): TRA CỨU KH — KHỐI TỔ + BẢNG TỔ CỦA ĐIỂM GD (kết nạp)
- `js/58-tc-to.js:35` · bảng tổ của 1 điểm GD, gom theo Hội
- `js/58-tc-to.js:76` · 3.336 (anh 24/10): "cho tìm tổ trưởng và hiện thông tin cơ bản của tổ" — chip Tìm theo › Tổ trưởng
- `js/59-suc-khoe.js:1` · 3.338 (RA_SOAT_BO_CUC_2410 mục 8 việc 2 — anh 24/10 "cứ theo KH làm"): 🩺 SỨC KHỎE SAO LƯU

## 3. Nhóm hàm theo tiền tố (khối chức năng)

| Tiền tố | Số hàm | File | Ví dụ |
|---|---|---|---|
| `kt` KTGS Hội (Mẫu 06/16/04, KH…) | 369 | `22b-ktgs.js` 111, `22d-ktgs-04.js` 103, `22e-ktgs-kh.js` 79 | ktXepLoai, ktNgayDau, ktDocBC, ktPhanTich |
| `sl` Số liệu (nạp, kho kỳ, ma trận) | 221 | `22-so-lieu.js` 111, `22f-tra-cuu.js` 77, `22i-tong-hop.js` 18 | slLoai, slChuan, slLaNgay, slLaHS |
| `to` Tổ TK&VV | 117 | `22g-to.js` 85, `22h-cap-hoi-sao-ke.js` 27, `04-giao-dien.js` 2 | toSang, toNutSL, toTruongScan, toStkChu |
| `tdn` Theo dõi nợ | 92 | `04e-theo-doi-no.js` 92 | tdnChuan, tdnSo, tdnNgay, tdnTien |
| `tc` Tra cứu KH | 54 | `22f-tra-cuu.js` 29, `58-tc-to.js` 16, `49-ten-chuan.js` 5 | tcChep, tcC, tcDiaChi, tcSdtDat |
| `sk` Sao kê | 48 | `22h-cap-hoi-sao-ke.js` 41, `59-suc-khoe.js` 7 | skChon, skKhoCua, skChonBC, skDoiKho |
| `hs` Hồ sơ CCCD / hộ | 37 | `04b-hom-nay.js` 37 | hsDoc, hsNgay, hsCuoiThang, hsEdate |
| `lc` Lịch | 35 | `04b-hom-nay.js` 35 | lcISO, lcNgay, lcDM, lcDMY |
| `tg` Tìm / gợi ý | 26 | `54-tgtv-khai.js` 15, `06-hop-thoai.js` 10, `07-cccd.js` 1 | tgChipHTML, tgDem, tgGoi, tgThem |
| `ch` Đồng bộ cài đặt | 26 | `17-dong-bo-cai-dat.js` 11, `36-dong-bo-khoi.js` 9, `17b-so-cai-dat.js` 6 | chRieng, chBamChu, chKhoa, chBamKhoa |
| `th` Tổng hợp | 26 | `22i-tong-hop.js` 26 | thSau, thChon, thChonBC, thCH |
| `pv` Bộ chọn phạm vi (cây địa bàn) | 20 | `22g-to.js` 20 | pvChungO, pvGan, pvLuaChon, pvApNgan |
| `tr` Bộ in chuẩn | 17 | `45-tra-mau31.js` 16, `05-them-file.js` 1 | trLe, trNoi, trTim, trNut |
| `bm` Biểu mẫu | 12 | `09-bieu-mau.js` 12 | bmTim, bmDungThem, bmSapXep, bmGhiChu |
| `ln` Lưu nhanh | 11 | `12-scan.js` 8, `34-luu-ngan.js` 3 | lnCai, lnGhi, lnThuMuc, lnDoi |
| `ka` Chữ ký · CCCD (khay ảnh) | 11 | `12-scan.js` 8, `35-scan.js` 3 | kaTuTimKhung, kaXuLy, kaXoay, kaThang |
| `cg` Chỉnh gốc ảnh | 9 | `12-scan.js` 9 | cgDung, cgDiem, cgDiemKeo, cgKeo |
| `gb` Giao ban | 8 | `04b-hom-nay.js` 8 | gbKyTruoc, gbTinh, gbLech, gbNhanDinh |
| `bgd` Buổi GD xã | 7 | `04b-hom-nay.js` 7 | bgdDsDiem, bgdChon, bgdChonHTML, bgdTinh |
| `sc` Scan | 2 | `35-scan.js` 2 | scLoaiNho, scChonNguon |

## 4. Điểm vào hay dùng

- `ve` `js/04-giao-dien.js:100`
- `doiNgan` `js/04-giao-dien.js:4`
- `luu` `js/02-nen.js:200`
- `luuFile` `js/02-nen.js:263`
- `docFile` `js/02-nen.js:277`
- `moHop` `js/06-hop-thoai.js:3`
- `dongHop` `js/06-hop-thoai.js:56`
- `hoi` `js/06-hop-thoai.js:95`
- `bao` `js/02-nen.js:333`
- `veHomNay` `js/04b-hom-nay.js:2322`
- `veVanBan` `js/04c-van-ban-thang.js:3`
- `veThang` `js/04c-van-ban-thang.js:899`
- `veGhiChu` `js/04e-theo-doi-no.js:1309`
- `veScan` `js/12-scan.js:11`
- `veBieuMau` `js/09-bieu-mau.js:15`
- `veThem` `js/05-them-file.js:4`
- `veSoLieu` `js/22f-tra-cuu.js:331`
- `slDocFile` `js/22-so-lieu.js:346`
- `slGhi` `js/22-so-lieu.js:602`
- `slBo` `js/22-so-lieu.js:901`
- `slKyDung` `js/22-so-lieu.js:896`
- `toNap` `js/22g-to.js:157`
- `toVe` `js/22g-to.js:230`
- `veKTGS` `js/22b-ktgs.js:112`
- `veSaoKe` `js/22h-cap-hoi-sao-ke.js:410`
- `veTongHop` `js/22i-tong-hop.js:333`
- `inChuan` `js/05-them-file.js:1333`
- `inBlob` `js/05-them-file.js:1141`
- `xemChuan` `js/05-them-file.js:1341`
- `pvLuaChon` `js/22g-to.js:246`
- `chTheoDoi` `js/17-dong-bo-cai-dat.js:42`
- `slDay` `js/22-so-lieu.js:764`
- `slDayMeta` `js/22-so-lieu.js:815`
- `henDongBoChiMuc` `js/17-dong-bo-cai-dat.js:99`
- `batDau` `js/20-khoi-dong.js:127`
- `khoiDong` `js/20-khoi-dong.js:14`

Tab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · 5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).
