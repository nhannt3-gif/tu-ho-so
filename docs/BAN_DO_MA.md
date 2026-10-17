# BẢN ĐỒ MÃ (tự sinh bởi `tests/bando.py`, đừng sửa tay)

Bản 3.236 · 17/10/2026 18:23 · 64 file · 36325 dòng · 2874 hàm cấp ngoài · 442 biến toàn cục.

Cách dùng: tìm file / mục dưới đây rồi `grep -n "function tênHàm" js/*.js` hoặc đọc đúng khoảng dòng (Read offset/limit). Thứ tự nạp = thứ tự bảng 1 (đúng như các khối <script> trước khi tách). `python3 tests/ghep.py ra.html` ghép lại 1 file. Số dòng đổi theo bản — chạy lại script khi cần.


## 1. Các file (thứ tự nạp)

| File | Số dòng | Số hàm | Mở đầu |
|---|---|---|---|
| `index.html` | 249 | 0 | Khung trang (thẻ HTML tĩnh) + thẻ nạp css / js |
| `css/app.css` | 3553 | 0 | :root{ box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); |
| `js/01-thu-vien.js` | 68 | 4 | /*   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được Lần đầu có mạng: tải về và cất vào máy. |
| `js/02-nen.js` | 370 | 24 | /*   TỦ HỒ SƠ — bản 1.0  (giai đoạn 1) Cấu trúc file: |
| `js/03-doc-pdf.js` | 627 | 46 | /*   4. ĐỌC PDF & RÚT THÔNG TIN   */  function sanSangPDF(){ |
| `js/04-giao-dien.js` | 5407 | 504 | /*   6. VẼ GIAO DIỆN   */ var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', l |
| `js/05-them-file.js` | 1353 | 71 | /*   7. THÊM FILE & DUYỆT TÊN   */ var dangDoc = false; |
| `js/06-hop-thoai.js` | 3116 | 213 | /*   HỘP THOẠI CHUNG   */ var hamDong = null, khoaHop = false; function moHop(html, rong){ |
| `js/07-cccd.js` | 194 | 14 | /*   12. HỒ SƠ CCCD - 3.32: KHÔNG mã hóa nữa (anh Nhân chốt: Drive của anh là nơi lưu bảo mật). |
| `js/08-dia-ban.js` | 576 | 47 | /*   danh mục địa bàn: Xã/phường → Điểm GD → Ấp/KP → Tổ   */ function dsXa(){ return (D.cauHinh.diaBan//[]).ma |
| `js/09-bieu-mau.js` | 552 | 45 | /*   13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền Xếp theo chương trình vay; có nhóm dùng chung và th |
| `js/10-danh-sach.js` | 1214 | 90 | /*   14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI   */ |
| `js/11-khung-tab.js` | 587 | 53 | /*   17. KHUNG CHUẨN CHO MỌI TAB Ba phần giống nhau ở mọi tab: |
| `js/12-scan.js` | 2563 | 213 | /*   18. SCAN HỒ SƠ — máy scan trong app Hai chế độ: |
| `js/13-xu-ly-anh.js` | 408 | 31 | /*   3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu) Tự động trước: tìm |
| `js/14-tim-loc.js` | 176 | 14 | /*   19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER Gõ vào ô tìm → app gợi ý "Nghiệp vụ: Xử lý rủi |
| `js/15-ai-chuan-hoa.js` | 153 | 8 | /*   15. NHỜ AI CHUẨN HÓA Xuất danh sách ra bảng → anh đưa AI (Gemini, ChatGPT, Claude) |
| `js/16-ai-dan-ket-qua.js` | 222 | 10 | /*   16. DÁN KẾT QUẢ TỪ AI Anh chép nguyên đoạn Gemini trả về, app tự đọc ra số hiệu, ngày, |
| `js/17-dong-bo-cai-dat.js` | 431 | 38 | /*   ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE   */ /* 3.113 (anh chốt: app cá nhân → lưu lên Drive hết): đồng bộ TOÀN BỘ cài  |
| `js/18-cai-dat.js` | 398 | 20 | /*   20. CÁC HÀM CÀI ĐẶT — bản dựng lại   */ |
| `js/19-danh-muc.js` | 222 | 23 | /*   21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU Một bộ sửa dùng chung cho: Mảng · Chương trình |
| `js/20-khoi-dong.js` | 140 | 4 | /*   KHỞI ĐỘNG   */ function capNhatDau(){ document.getElementById('donvi').textContent = |
| `js/21-ngay-gy.js` | 38 | 3 | /* 3.135 — anh Nhân: mọi ô chọn ngày ghi rõ kiểu ngày/tháng/năm (trình duyệt tiếng Anh hiện tháng/ngày → dễ nh |
| `js/22-so-lieu.js` | 1102 | 114 | /* 3.235 (R3): file này giữ phần lõi; các khối khác tách sang js/22b…22i (nạp ngay sau theo thứ tự tên) + khuô |
| `js/22b-ktgs.js` | 724 | 108 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1102–1816 của bản 3.234), không  |
| `js/22c-ktgs-m06.js` | 439 | 56 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1817–2251 của bản 3.234), không  |
| `js/22d-ktgs-04.js` | 695 | 101 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2252–2945 của bản 3.234), không  |
| `js/22e-ktgs-kh.js` | 536 | 78 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2946–3477 của bản 3.234), không  |
| `js/22f-tra-cuu.js` | 1061 | 95 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 3486–4545 của bản 3.234), không  |
| `js/22g-to.js` | 892 | 122 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 4546–5436 của bản 3.234), không  |
| `js/22h-cap-hoi-sao-ke.js` | 792 | 82 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 5437–6227 của bản 3.234), không  |
| `js/22i-tong-hop.js` | 737 | 54 | /* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 6228–6963 của bản 3.234), không  |
| `js/23-dieu-huong.js` | 140 | 18 | /*   3.147 (đợt F, anh duyệt 10/10/2026): THANH BÊN ĐIỀU HƯỚNG — máy tính màn ≥ 1100 px   - Chỉ đổi cách đi gi |
| `js/24-xuat.js` | 147 | 14 | /*   3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG Mọi mẫu / báo cáo: 👁 Xem → hàng nút  |
| `js/25-ho-so.js` | 1890 | 252 | /*   3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY Hai tab con của Số liệu |
| `js/26-giao-dich-xa.js` | 1090 | 133 | /*   3.172 (anh chốt 11/10/2026): 🏢 GIAO DỊCH XÃ — in nhanh 04/TD + 12/GDX, KHÔNG cần số liệu hộ vay   - Mẫu i |
| `js/27-mini-gdx.js` | 324 | 8 | /*   3.177 (anh chốt 13/10/2026): 📦 MINI APP Giao dịch xã — 1 file HTML gửi đồng nghiệp, có thời hạn   - Nút " |
| `js/28-tv-tk.js` | 318 | 37 | /*   3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ ① Mẫu 01/TV — Danh sách thành viên tổ (t |
| `js/29-kho.js` | 90 | 2 | /*   3.216 (anh 15/10/2026): CỬA KHO — kho số liệu chung (KIEN_TRUC_3_LOP 3.5 · QUY_CHUAN_KIEN_TRUC mục 3 "cửa |
| `js/30-khai-bao.js` | 28 | 2 | /*   3.222 (anh 16/10/2026, phương án B): ⚙ KHAI BÁO ĐƠN VỊ — 1 cửa sổ dùng chung mọi tab   - Mở từ nút "⚙ Kha |
| `js/31-o-mau.js` | 164 | 40 | /*   3.223 M3 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9): NỀN Ô MẪU — "OM"   Mỗi chỗ chấm trên  |
| `js/32-kho-luu.js` | 97 | 8 | /*   3.223 M1 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): CỬA LƯU KHO1 + LƯU AN TOÀN B1   - B |
| `js/33-so-ho-them.js` | 48 | 7 | /*   3.223 M2 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON mục 0.8): SỔ HỘ VAY ĐỦ CỘT   - Rà ngược các ô của mẫu gố |
| `js/34-luu-ngan.js` | 174 | 3 | /*   3.223 M8 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): LƯU THEO NGĂN TRONG IndexedDB (bước |
| `js/35-scan.js` | 136 | 9 | /*   3.224 (anh chốt 17/10/2026 — docs/KE_HOACH_3224_SCAN.md): QUY TRÌNH SCAN MỚI — 1 luồng chuẩn, cắm / rút   |
| `js/36-dong-bo-khoi.js` | 183 | 22 | /*   3.225 (anh chốt 17/10/2026 — docs/KE_HOACH_3225_LUU.md): ĐỒNG BỘ DRIVE THEO KHỐI   Khối (danh sách): vanb |
| `js/37-kiem-ho.js` | 193 | 23 | /*   3.228 (anh 17/10/2026): 🔎 KIỂM TRA HỘ VAY — luật logic khi nhập hộ, KHAI BÁO ĐƯỢC (bật / tắt · mức · ngưỡ |
| `js/38-goi-xem.js` | 71 | 11 | /*   3.231 (anh duyệt 17/10/2026 — KE_HOACH_CHUAN_HOA mục 8–9): 📱 GÓI SỐ LIỆU XEM cho bản điện thoại   Máy tín |
| `js/39-gd.js` | 78 | 0 | /*   3.234 (R2 — KE_HOACH_CHUAN_HOA mục 2, 4, 5, 6): GIAO DIỆN CHUNG "GD" + ĐIỀU HƯỚNG "DH"   - Bộ nhận lệnh:  |
| `js/mau/01td.js` | 94 | 0 | /*   3.223 M4 — MẪU 01/TD trên nền ô (js/31-o-mau.js) — dựng theo file gốc tests/mau_goc/01td.docx   Lề 10 / 1 |
| `js/mau/01uq.js` | 66 | 0 | /*   3.223 M4 — MẪU 01/UQ Giấy ủy quyền trên nền ô — dựng theo file gốc tests/mau_goc/01uq.docx (VB 10493, áp  |
| `js/mau/03td.js` | 52 | 0 | /*   3.223 M5 — MẪU 03/TD Danh sách tổ viên đề nghị vay vốn trên nền ô — dựng theo file gốc tests/mau_goc/03td |
| `js/mau/09a.js` | 84 | 0 | /*   3.223 M5 — MẪU 09A/TD Giấy đề nghị gia hạn nợ trên nền ô — dựng theo file gốc tests/mau_goc/09a.docx (QĐ  |
| `js/mau/01tdck.js` | 53 | 0 | /*   3.223 M5 — MẪU 01/TĐCK Giấy đề nghị thay đổi mẫu chữ ký giao dịch trên nền ô — dựng theo file gốc tests/m |
| `js/mau/01tgtv.js` | 120 | 0 | /*   3.223 M5 — MẪU 01/TGTV Giấy đăng ký mở tài khoản tổ viên trên nền ô   BỐ CỤC GIỮ NGUYÊN 3.218–3.219 (anh  |
| `js/mau/01gqvl.js` | 160 | 0 | /*   3.223 M5 — MẪU 01/GQVL Phương án sử dụng vốn vay (người lao động) trên nền ô — dựng theo file gốc tests/m |
| `js/mau/07b.js` | 186 | 0 | /*   3.223 M5 — MẪU 07b/GQVL Hợp đồng tín dụng (người lao động) trên nền ô — dựng theo file gốc tests/mau_goc/ |
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
- `js/02-nen.js:300` · 3. TIỆN ÍCH
- `js/03-doc-pdf.js:1` · 4. ĐỌC PDF & RÚT THÔNG TIN
- `js/03-doc-pdf.js:381` · RÚT THÔNG TIN TỪ CHÍNH TÊN FILE
- `js/03-doc-pdf.js:456` · 5. SINH TÊN CHUẨN
- `js/04-giao-dien.js:1` · 6. VẼ GIAO DIỆN
- `js/04-giao-dien.js:182` · LỊCH (tab Hôm nay) — bản 3.9, theo tab Lịch của CBTD AI
- `js/04-giao-dien.js:202` · NGÀY CHAY · MÙNG 1 · RẰM · LỄ ÂM (3.12)
- `js/04-giao-dien.js:272` · vẽ
- `js/04-giao-dien.js:312` · 3.62 — VIỆC W: CỘT 🧰 CÔNG CỤ cạnh lịch (anh chốt 02/10/2026)
- `js/04-giao-dien.js:332` · 3.83 — 📊 SỐ LIỆU GIAO BAN (từ Theo dõi nợ): mỗi danh sách (3 tháng KHD · quá hạn · khoanh) kỳ mới nhất SO VỚI kỳ trước
- `js/04-giao-dien.js:415` · 3.83 — 📅 CHUẨN BỊ BUỔI GIAO DỊCH XÃ: chọn điểm GD (mặc định điểm có ngày GD gần nhất)
- `js/04-giao-dien.js:479` · 3.71 — 🧰 CÔNG CỤ: 📋 CHƯƠNG TRÌNH VAY
- `js/04-giao-dien.js:617` · W① HẠN TRẢ NỢ HSSV — đúng công thức file Excel Sheet2 anh đang dùng
- `js/04-giao-dien.js:913` · W② CÂY ĐỊA BÀN — mã xã · mã điểm GD · mã ấp/KP, xếp theo mã
- `js/04-giao-dien.js:959` · trang NHẬT KÝ CÔNG VIỆC (giấy vàng) của ngày đang chọn
- `js/04-giao-dien.js:960` · GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
- `js/04-giao-dien.js:980` · SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
- `js/04-giao-dien.js:1027` · HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
- `js/04-giao-dien.js:1267` · ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
- `js/04-giao-dien.js:1593` · 💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
- `js/04-giao-dien.js:1708` · CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
- `js/04-giao-dien.js:1872` · CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
- `js/04-giao-dien.js:2187` · thao tác
- `js/04-giao-dien.js:2260` · Danh sách: quá hạn + 60 ngày tới
- `js/04-giao-dien.js:2288` · Tính ngày
- `js/04-giao-dien.js:2333` · đồng bộ _Hệ thống/lich.json
- `js/04-giao-dien.js:2489` · TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
- `js/04-giao-dien.js:2732` · BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào
- `js/04-giao-dien.js:2737` · MA TRẬN THÁNG (3.21) — màn chính của tab Tháng
- `js/04-giao-dien.js:2928` · QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
- `js/04-giao-dien.js:3141` · 3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
- `js/04-giao-dien.js:3377` · CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
- `js/04-giao-dien.js:3600` · 3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
- `js/04-giao-dien.js:3872` · 3.64 — ⚠ THEO DÕI NỢ (Thư viện): 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh (anh chốt 03/10/2026)
- `js/04-giao-dien.js:3932` · lưu / nạp
- `js/04-giao-dien.js:4001` · tiện ích
- `js/04-giao-dien.js:4054` · ĐỌC FILE SAO KÊ THÁNG
- `js/04-giao-dien.js:4208` · GIAO DIỆN: danh sách + cây
- `js/04-giao-dien.js:4319` · 3.82 — 🏠 HỒ SƠ HỘ MỘT TRANG: gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab
- `js/04-giao-dien.js:4438` · THẺ MÓN: số liệu · hồ sơ hộ · nhật ký · tài liệu · vị trí
- `js/04-giao-dien.js:4525` · lần làm việc
- `js/04-giao-dien.js:4600` · vị trí nhà
- `js/04-giao-dien.js:4629` · tài liệu của hộ
- `js/04-giao-dien.js:4696` · 📝 BIÊN BẢN — danh mục mẫu (thêm mẫu sau không sửa phần khác)
- `js/04-giao-dien.js:4780` · 🧾 PHIẾU THÔNG TIN MÓN VAY (3.66 · việc AI) — "sơ yếu lý lịch" món nợ xấu
- `js/04-giao-dien.js:5031` · 🖨 DANH SÁCH CHI TIẾT + TỔNG HỢP THEO XÃ, ĐIỂM GD (3.67 · việc AH)
- `js/04-giao-dien.js:5170` · nhắc ở Hôm nay
- `js/05-them-file.js:1` · 7. THÊM FILE & DUYỆT TÊN
- `js/05-them-file.js:533` · 8. XEM TRƯỚC / IN / GỬI
- `js/05-them-file.js:619` · TRÌNH XEM DÙNG CHUNG cho khung lớn (#x-than) và cột phải (#cp-than)
- `js/05-them-file.js:1170` · 3.128 — BỘ IN CHUẨN (anh chốt): app tự chia trang A4 → xem trước = bản in
- `js/06-hop-thoai.js:1` · HỘP THOẠI CHUNG
- `js/06-hop-thoai.js:103` · SỬA MỘT MỤC
- `js/06-hop-thoai.js:119` · PHÂN LOẠI 3 CẤP (bản 3.4): Mảng (1) · CT vay (1 hoặc Dùng chung) · Tag (nhiều)
- `js/06-hop-thoai.js:310` · 3.69 (việc AJ, anh chốt) — HỘP SỬA GỌN: ô chọn, Tag gợi ý, phím nhập nhanh, dòng 💡 hướng dẫn chung
- `js/06-hop-thoai.js:931` · ĐỒNG BỘ MỤC LÊN FILE THẬT TRÊN DRIVE (bản 3.6)
- `js/06-hop-thoai.js:1119` · XÓA · THÙNG RÁC · XÓA HẲN (bản 3.10)
- `js/06-hop-thoai.js:1261` · 3.144 — BỎ TAB THÁNG (anh chốt Q5, Q12, 10/10/2026): xóa dữ liệu cũ của tab một lần, không sao lưu.
- `js/06-hop-thoai.js:1319` · CHỜ KHAI (3.11) — mọi file chưa đủ thông tin về MỘT danh sách, xem ở tab Văn bản
- `js/06-hop-thoai.js:1411` · CHỤP / CHỌN ẢNH GHI CHÚ
- `js/06-hop-thoai.js:1431` · 9. CÀI ĐẶT
- `js/06-hop-thoai.js:1856` · 3.50: ❓ HƯỚNG DẪN TRỰC QUAN — chia theo tab, sơ đồ luồng dữ liệu, các bước theo logic.
- `js/06-hop-thoai.js:2217` · 3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc ch
- `js/06-hop-thoai.js:2421` · 10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
- `js/06-hop-thoai.js:2691` · 3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
- `js/06-hop-thoai.js:2806` · 11. LẬP CHỈ MỤC
- `js/06-hop-thoai.js:2865` · 3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
- `js/07-cccd.js:1` · 12. HỒ SƠ CCCD
- `js/07-cccd.js:42` · 3.79.1 — KHÔI PHỤC DANH SÁCH SCAN TỪ ẢNH CÒN TRONG MÁY
- `js/08-dia-ban.js:475` · 3.33 — ĐƯA HỒ SƠ SCAN LÊN DRIVE
- `js/09-bieu-mau.js:1` · 13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền
- `js/09-bieu-mau.js:88` · BIỂU MẪU 3.24 — như một thư mục: ghim · đếm lần dùng · ghi chú cách dùng ·
- `js/09-bieu-mau.js:221` · 3.31 — MỞ FILE WORD/EXCEL KHÔNG PHẢI TẢI VỀ (tránh rác trong thư mục Tải xuống)
- `js/09-bieu-mau.js:328` · 3.61 (việc M): GỬI NHIỀU BIỂU MẪU · NÉN .ZIP
- `js/10-danh-sach.js:1` · 14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI
- `js/10-danh-sach.js:203` · QUÉT DỌN RÁC — chỉ trong thư mục Tủ hồ sơ, chỉ đọc cho tới khi anh chọn
- `js/10-danh-sach.js:530` · 3.50: 🧰 DỌN KHO — một nơi duy nhất (thay Bảo trì kho ở Cài đặt và Thư viện).
- `js/10-danh-sach.js:673` · 3.77 — VĂN BẢN TRÙNG: cùng số hiệu (bỏ dấu, khoảng trắng, gạch) + cùng năm ban hành
- `js/11-khung-tab.js:1` · 17. KHUNG CHUẨN CHO MỌI TAB
- `js/12-scan.js:1` · 18. SCAN HỒ SƠ — máy scan trong app
- `js/12-scan.js:930` · 3.43: SCAN TRÊN ĐIỆN THOẠI THEO KIỂU LENS — Quét → Xong → PDF lưu tạm (tên Scan ngày giờ, sửa ngay) → xem trước → Gửi
- `js/12-scan.js:1096` · 3.49: MÁY BÀN — 💾 LƯU NHANH + 📋 COPY thay nút Gửi (điện thoại giữ 📤 Gửi). Drive vẫn là nơi lưu mặc định.
- `js/12-scan.js:1220` · 3.44: CHỮ KÝ · ẢNH KHÁCH HÀNG — file ảnh nhỏ (dưới 200 KB, càng nhỏ càng tốt) để nhập lên hệ thống khi tạo hồ sơ.
- `js/12-scan.js:1514` · 3.45: CAMERA TRONG APP — dùng chung iPhone và máy bàn có webcam.
- `js/12-scan.js:1733` · 3.46: ĐỒNG BỘ DRIVE — mặc định khi mở app, khi rời app, ngay sau khi lưu; tùy chọn mỗi 5 phút; nút ☁ Đồng bộ ngay.
- `js/12-scan.js:1843` · 3.46 (mục K): ĐỌC CHỮ PDF ẢNH (OCR) — chỉ khi anh bấm, chỉ hiện nút khi mục còn thiếu thông tin.
- `js/12-scan.js:1885` · 3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
- `js/12-scan.js:2127` · 3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi"
- `js/13-xu-ly-anh.js:1` · 3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu)
- `js/14-tim-loc.js:1` · 19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER
- `js/15-ai-chuan-hoa.js:1` · 15. NHỜ AI CHUẨN HÓA
- `js/16-ai-dan-ket-qua.js:1` · 16. DÁN KẾT QUẢ TỪ AI
- `js/17-dong-bo-cai-dat.js:1` · ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE
- `js/17-dong-bo-cai-dat.js:84` · ĐỒNG BỘ CHỈ MỤC TỦ HỒ SƠ QUA DRIVE (việc #4)
- `js/17-dong-bo-cai-dat.js:104` · 3.81 — SAO LƯU & KHÔI PHỤC
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
- `js/22b-ktgs.js:142` · nạp + kiểm tra theo chuẩn tab Nạp & Kiểm tra (anh chốt): ma trận loại × tháng · 📥 nạp nhiều file (xem trước, xác nhận) ·
- `js/22b-ktgs.js:257` · số liệu tổ từ BC0437 (thiếu thì tính từ Mẫu 31, ghi rõ nguồn)
- `js/22b-ktgs.js:270` · màn: chưa chọn tổ → bảng các tổ (BC0437) · chọn tổ → thẻ + chọn hộ
- `js/22b-ktgs.js:326` · phân loại hộ + gợi ý (Mẫu 06 kiểm tra đột xuất)
- `js/22b-ktgs.js:432` · khai báo khi in (mặc định trống) → Word đúng khuôn / In PDF
- `js/22b-ktgs.js:436` · 3.98 (anh chốt): khai báo nằm ngay trong tab của mẫu (khung ✎ thu gọn được), lưu lâu dài trừ ngày; cán bộ kiểm tra lấy t
- `js/22b-ktgs.js:447` · 3.114 (anh chốt): HỘP CHỌN KHI IN — mỗi mẫu 1 phần, nhớ lựa chọn lần trước (D.cauHinh.ktIn[mẫu], đồng bộ Drive);
- `js/22c-ktgs-m06.js:2` · 3.138 (anh chốt): Mẫu 06 gọn & nhạt
- `js/22c-ktgs-m06.js:130` · 3.93.1: Mẫu 06 KIỂM TRA SAU GIẢI NGÂN (727: kiểm tra sử dụng vốn trong 30 ngày) — anh chốt (làm đơn giản):
- `js/22c-ktgs-m06.js:257` · 3.98: dòng hộ dùng chung 3 màn chọn hộ (đột xuất · sau giải ngân · định kỳ)
- `js/22c-ktgs-m06.js:296` · bản In / PDF — cùng bố cục mẫu (A4 ngang Mẫu 06, A4 dọc Mẫu 16); trống = dòng chấm
- `js/22d-ktgs-04.js:21` · 3.98: 📖 BẢNG CHUẨN HÓA HỘI – ĐOÀN (anh chốt: chữ đặc thù dùng chung mọi mẫu, sửa 1 chỗ)
- `js/22d-ktgs-04.js:330` · ⚙ Khai báo Hội (mỗi Hội – xã 1 khối)
- `js/22d-ktgs-04.js:371` · 3.113 (anh chốt): 🏛 KHAI BÁO HỘI ĐOÀN THỂ — 1 nơi khai cho mọi mẫu (06, 16TD, 04, Kế hoạch); tab nhỏ Hội – xã · Chuẩn hó
- `js/22d-ktgs-04.js:374` · 3.117 (anh gửi mẫu tham khảo + bản Đoàn thật, anh: "làm mẫu luôn"): 📄 THÔNG BÁO PHÂN CÔNG NHIỆM VỤ BAN THƯỜNG VỤ trong c
- `js/22e-ktgs-kh.js:31` · 3.140 (anh chốt): IN THEO THÁNG KIỂM TRA (chip 🗓 Kế hoạch) — bấm tháng → các tổ của tháng (theo ấp):
- `js/22f-tra-cuu.js:39` · cột trái
- `js/22f-tra-cuu.js:89` · kiểm trùng 2 ô
- `js/22f-tra-cuu.js:143` · thẻ chi tiết (phải / hộp trên điện thoại)
- `js/22f-tra-cuu.js:303` · 3.150: tab Nạp & KT gọn
- `js/22f-tra-cuu.js:463` · 3.88: ① FILE THÁNG · ② KIỂM TRA (kết quả lưu theo tháng, dữ liệu đổi thì báo kiểm lại)
- `js/22f-tra-cuu.js:570` · 3.146 (anh chốt 10/10): KIỂM TRA KỲ — không chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã bấm kiểm, s
- `js/22f-tra-cuu.js:630` · 3.90.1: BẢNG ĐỐI CHIẾU CHÉO — chỉ tiêu × nguồn (BCDHTD chuẩn · LEN_31 · Mẫu 31 · Dư nợ chi tiết), toàn PGD và từng xã
- `js/22f-tra-cuu.js:867` · 12. NẠP: cả bộ / từng file
- `js/22f-tra-cuu.js:1025` · 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng
- `js/22g-to.js:2` · 3.88 — 👥 TAB CON TỔ TK&VV (trong tab Số liệu, cạnh Tra cứu KH): chọn 1 tổ (cây xã → điểm GD → hội → tổ, hoặc gõ tên) → b
- `js/22g-to.js:62` · 3.149 (anh chốt ý 6b): KỲ CHUNG — 1 ô ở đầu trang, phủ mọi tab (Nạp & KT, Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu…)
- `js/22g-to.js:237` · 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ)
- `js/22g-to.js:387` · 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể)
- `js/22g-to.js:447` · 3.92: TAB TỔ — mục đích (anh Nhân): biết số tổ viên để KẾT NẠP thêm hoặc CHO RA khỏi tổ, căn cứ dư nợ và số dư 105
- `js/22h-cap-hoi-sao-ke.js:2` · 3.132 (anh chốt) — CẤP HỘI / ĐIỂM GD / XÃ / PGD: dòng tóm tắt + chip lọc như của tổ; mặc định bảng các tổ (PGD: Cộng PGD
- `js/22h-cap-hoi-sao-ke.js:127` · báo cáo: mỗi báo cáo trả {ten, tieuDe, html (phần thân), aoa (Excel)}
- `js/22h-cap-hoi-sao-ke.js:299` · xem → in / Excel
- `js/22h-cap-hoi-sao-ke.js:349` · 3.89 — 👤 TRA CỨU KH: phạm vi (bộ chọn chung) + KIỂM TRÙNG trước khi nhập máy
- `js/22h-cap-hoi-sao-ke.js:384` · 3.89 — 📑 TAB CON SAO KÊ (trong Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi (bộ chọn chung) → tích → Xem → In / Excel
- `js/22h-cap-hoi-sao-ke.js:541` · 3.91: NỢ ĐẾN HẠN — theo ngày đến hạn hợp đồng (gia hạn nếu có) + kỳ GDXA chuyển quá hạn (anh chốt)
- `js/22h-cap-hoi-sao-ke.js:595` · 3.91: MÓN VAY TRẢ GỐC PHÂN KỲ — NỢ ĐẾN HẠN KỲ CON (anh Nhân; Công văn 597/NHCS-TDNN 30/01/2026)
- `js/22i-tong-hop.js:2` · 3.90 — 7 FILE TỔNG HỢP CHUẨN TW (anh chốt: số chính thức của TW, chuẩn nhất)
- `js/22i-tong-hop.js:112` · ghép tổ LEN_31 TO_TRUONG (chỉ có tên tổ trưởng, có khi bị cắt; 2 tổ trùng tên trong 1 xã gộp 1 dòng) với mã tổ
- `js/22i-tong-hop.js:160` · ② KIỂM TRA: số chuẩn TW khớp nhau (nhóm 7) · Mẫu 31 ↔ số chuẩn TW (nhóm 8) · KHĐ, tổ trưởng (nhóm 3)
- `js/22i-tong-hop.js:290` · 3.90 — 📊 TAB CON TỔNG HỢP (Số liệu): tiêu chí + bộ lọc → tích → Xem → In (A4 ngang) / Excel
- `js/22i-tong-hop.js:592` · 3.90: CHUẨN IN mọi báo cáo (anh chốt): A4, lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi tr
- `js/22i-tong-hop.js:597` · 3.90: XÓA cả bộ tháng / LÀM MỚI toàn bộ số liệu (chỉ phần Số liệu; Drive vào thùng rác, lấy lại được 30 ngày)
- `js/22i-tong-hop.js:642` · 3.90: THAY FILE 1 ô — file mới phải đúng loại, đúng kỳ của ô; khác thì báo, không thay
- `js/22i-tong-hop.js:660` · 3.90.1: TẢI FILE GỐC (bản sao để dùng việc khác) — trong máy nếu còn, không thì tải từ Drive
- `js/22i-tong-hop.js:678` · 3.90.1: TÌM FILE RÁC CỦA SỐ LIỆU (riêng phần Số liệu: trong máy sl_… + Drive Số liệu/ và _Hệ thống/so_lieu/; không đụng 
- `js/24-xuat.js:1` · 3.152 (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): XUẤT CHUNG
- `js/25-ho-so.js:1` · 3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY
- `js/25-ho-so.js:46` · ⚙ khai báo 1 lần
- `js/25-ho-so.js:91` · 3.208 (anh chốt 14/10): CHƯƠNG TRÌNH VAY — mỗi CT 1 thẻ (D.cauHinh.hsoKB.ctv): tên tắt, tên in 01/03, đối tượng thụ hưởn
- `js/25-ho-so.js:158` · thông tin tổ / khách dùng cho mẫu
- `js/25-ho-so.js:182` · ô điền
- `js/25-ho-so.js:208` · khối dựng chung
- `js/25-ho-so.js:234` · 10C/TD
- `js/25-ho-so.js:299` · 10A/TD
- `js/25-ho-so.js:344` · 10B/TD
- `js/25-ho-so.js:377` · 11/TD
- `js/25-ho-so.js:449` · 01/BG · 02/BG
- `js/25-ho-so.js:508` · HỒ SƠ VAY: 01/TD · 03/TD · 04/TD · 09A/TD
- `js/25-ho-so.js:751` · 3.171 (anh chốt 11/10): BỘ HỒ SƠ VAY — lưu tạm (D.cauHinh.hsoBo, đồng bộ Drive), in thành bộ gửi tổ đi ký
- `js/25-ho-so.js:812` · 01/TD Giấy đề nghị vay vốn — đúng PDF (HSSV có xác nhận UBND xã; NSVSMT không)
- `js/25-ho-so.js:814` · 03/TD Danh sách tổ viên đề nghị vay vốn — đúng PDF (A4 ngang, số dòng = số người + 2 dòng trống, kẻ chấm)
- `js/25-ho-so.js:815` · 04/TD Thông báo kết quả phê duyệt — đúng PDF; in từng thông báo (chọn điểm GD, nhập số hộ + số tiền)
- `js/25-ho-so.js:816` · 09A/TD Giấy đề nghị gia hạn nợ — đúng PDF
- `js/25-ho-so.js:817` · 01/UQ Giấy ủy quyền — đúng PDF (thành viên hộ + người thừa kế chỉ ở mẫu này)
- `js/25-ho-so.js:849` · 01/TGTV Giấy đăng ký mở tài khoản tổ viên (mẫu 03/2026) — đúng PDF, có logo + chân trang
- `js/25-ho-so.js:993` · lập mẫu đang chọn
- `js/25-ho-so.js:1017` · WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang)
- `js/25-ho-so.js:1113` · giao diện tab
- `js/25-ho-so.js:1178` · 3.207 (anh yêu cầu 14/10): 🏠 HỘ VAY MỚI — khai báo 1 lần (form nhập nhanh), lưu danh sách (D.cauHinh.hoMoi, đồng bộ Driv
- `js/25-ho-so.js:1202` · 3.209 (anh 14/10): SỔ HỘ VAY — hộ mới / lấy từ Mẫu 31; khai tổ khi tạo; chỉ bắt buộc người đứng tên, thành viên / thừa k
- `js/25-ho-so.js:1362` · 3.214 (anh 15/10): 📒 SỔ HỘ VAY — tab xem lại: lọc, sắp xếp, sửa thẳng từng ô (hộ mới), in đúng danh sách đang lọc
- `js/25-ho-so.js:1537` · 3.209 (anh 14/10): 03/TD NHIỀU HỘ — cùng 1 chương trình in chung 1 tờ; tích hộ ở sổ → 📋 Lập 03/TD, hoặc mở 03/TD → ＋ Thê
- `js/25-ho-so.js:1568` · 3.211 (anh chốt 14/10): GQVL — người lao động vay qua Tổ: 01/GQVL (mẫu mới VB 4039, từ 01/10/2026) · 03/TD · 07b/GQVL Hợ
- `js/25-ho-so.js:1760` · 3.209: cột trái 01/TD · 01/UQ · 03/TD · 01/TGTV theo hộ — chọn hộ → chọn chương trình → phương án → in (+ in kèm)
- `js/25-ho-so.js:1790` · cột tùy chọn của từng mẫu
- `js/26-giao-dich-xa.js:40` · hàm của file gốc (chuyển ES5, giữ nguyên cách tính)
- `js/26-giao-dich-xa.js:90` · điểm GD · tổ — 3.174 (anh chốt 12/10): cây địa bàn theo Mẫu 31 (kỳ chung, như các tab khác);
- `js/26-giao-dich-xa.js:153` · MẪU IN — chuyển nguyên văn từ file gốc
- `js/26-giao-dich-xa.js:291` · 3.174 (anh chốt 12/10 — docs/KE_HOACH_HO_SO_TO.md mục E): BỐ CỤC MỚI tab 🏢 Giao dịch xã
- `js/26-giao-dich-xa.js:314` · ngày của 04/TD: ngày ký (hôm nay / chọn ngày) · ngày phát (mặc định = ngày GD gần nhất của điểm; tại PGD = ngày mai)
- `js/26-giao-dich-xa.js:319` · bản chụp lựa chọn để dựng mẫu (xem trước · in · nhật ký in lại dùng chung 1 bản)
- `js/26-giao-dich-xa.js:343` · mục của từng mẫu — theo thứ tự trên mẫu; nhanh = mặc định ra khung chọn nhanh (anh đổi ở ⚙)
- `js/26-giao-dich-xa.js:390` · ô điều khiển dùng chung
- `js/26-giao-dich-xa.js:428` · vẽ 1 mục (khung chọn nhanh và ⚙ dùng chung; kb = đang ở ⚙ → có thêm phần quản lý)
- `js/26-giao-dich-xa.js:496` · theo khối lọc: điểm GD / xã đang chọn → điền mẫu
- `js/26-giao-dich-xa.js:511` · vẽ tab
- `js/26-giao-dich-xa.js:610` · 📋 Tóm tắt bản in: chip + cảnh báo (không chặn — hỏi 1 lần) + nút in
- `js/26-giao-dich-xa.js:693` · ⚙ Khai báo riêng mẫu: MỌI mục, theo thứ tự trên mẫu; tích "Chọn nhanh" → ra khung trái
- `js/26-giao-dich-xa.js:705` · 3.174: 💵 GIẤY LĨNH TIỀN MẶT (anh chốt 12/10) — khách rút TK 105 hoặc tổ trưởng rút TK 104; số liệu theo kỳ / ngày số liệ
- `js/26-giao-dich-xa.js:937` · 3.187 (anh gửi ảnh mẫu 13/10): 🧾 BẢNG KÊ CÁC LOẠI TIỀN NGÂN HÀNG CHI RA — in kèm Giấy lĩnh, cùng người lĩnh / số tiền.
- `js/26-giao-dich-xa.js:1035` · ⚙ Khai báo chung
- `js/26-giao-dich-xa.js:1038` · 📜 Nhật ký in: chỉ lưu lựa chọn (không lưu PDF), trên máy này, tự xóa sau 1 tháng (anh chốt)
- `js/26-giao-dich-xa.js:1057` · ⭐ Mẫu hay in (số hộ + số tiền) · mức tiền · danh sách cán bộ — giữ từ 3.172
- `js/27-mini-gdx.js:24` · gói số liệu (chỉ chạy trên máy anh lúc xuất)
- `js/27-mini-gdx.js:76` · KHUNG MINI APP — chỉ chạy TRONG file mini (gdxMiniApp được chép nguyên vào file lúc xuất). Không chạy trong app chính.
- `js/28-tv-tk.js:1` · 3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ
- `js/28-tv-tk.js:102` · ③ ĐỐI CHIẾU THÀNH VIÊN TỔ: app (Mẫu 31) ↔ Mẫu 01/TV (TƯ)
- `js/28-tv-tk.js:147` · ④ TK 104 / TK 105 theo Sao kê ngày
- `js/28-tv-tk.js:253` · ⑤ Giấy lĩnh: tổ trưởng (Mã CIF TT) → TK 104 · CCCD anh gõ tay nhớ theo mã KH (D.cauHinh.ccNho, đồng bộ Drive như cài đặt
- `js/29-kho.js:79` · lõi kho (dời từ js/25 ở 3.216 — giữ tên hàm cũ để mọi chỗ gọi cũ vẫn chạy; tab mới gọi qua KHO.*)
- `js/31-o-mau.js:83` · giao diện cột trái: kiểu in · khai báo riêng (tóm tắt + Chọn nhanh)
- `js/31-o-mau.js:123` · 🖼 KHAI BÁO TRỰC QUAN: mẫu như giấy thật (trái) · ô đang chọn (phải)
- `js/32-kho-luu.js:40` · giao diện: tab 💾 Sao lưu trong ⚙ Khai báo đơn vị
- `js/34-luu-ngan.js:152` · giao diện: nhóm 🗄 Nơi lưu trong tab 💾 Sao lưu
- `js/37-kiem-ho.js:60` · dữ liệu phụ
- `js/37-kiem-ho.js:84` · bộ kiểm
- `js/37-kiem-ho.js:171` · hiển thị

## 3. Nhóm hàm theo tiền tố (khối chức năng)

| Tiền tố | Số hàm | File | Ví dụ |
|---|---|---|---|
| `kt` KTGS Hội (Mẫu 06/16/04, KH…) | 341 | `22b-ktgs.js` 107, `22d-ktgs-04.js` 101, `22e-ktgs-kh.js` 77 | ktXepLoai, ktNgayDau, ktDocBC, ktPhanTich |
| `sl` Số liệu (nạp, kho kỳ, ma trận) | 221 | `22-so-lieu.js` 111, `22f-tra-cuu.js` 77, `22i-tong-hop.js` 18 | slLoai, slChuan, slLaNgay, slLaHS |
| `to` Tổ TK&VV | 115 | `22g-to.js` 84, `22h-cap-hoi-sao-ke.js` 27, `04-giao-dien.js` 2 | toSang, toNutSL, toStkChu, toCH |
| `tdn` Theo dõi nợ | 92 | `04-giao-dien.js` 92 | tdnChuan, tdnSo, tdnNgay, tdnTien |
| `sk` Sao kê | 41 | `22h-cap-hoi-sao-ke.js` 41 | skChon, skKhoCua, skChonBC, skDoiKho |
| `hs` Hồ sơ CCCD / hộ | 37 | `04-giao-dien.js` 37 | hsDoc, hsNgay, hsCuoiThang, hsEdate |
| `lc` Lịch | 35 | `04-giao-dien.js` 35 | lcISO, lcNgay, lcDM, lcDMY |
| `th` Tổng hợp | 26 | `22i-tong-hop.js` 26 | thSau, thChon, thChonBC, thCH |
| `tc` Tra cứu KH | 21 | `22f-tra-cuu.js` 17, `22h-cap-hoi-sao-ke.js` 4 | tcChep, tcC, tcDiaChi, tcSdtDat |
| `ch` Đồng bộ cài đặt | 20 | `17-dong-bo-cai-dat.js` 11, `36-dong-bo-khoi.js` 9 | chRieng, chBamChu, chKhoa, chBamKhoa |
| `pv` Bộ chọn phạm vi (cây địa bàn) | 19 | `22g-to.js` 19 | pvChungO, pvGan, pvLuaChon, pvApNgan |
| `bm` Biểu mẫu | 12 | `09-bieu-mau.js` 12 | bmTim, bmDungThem, bmSapXep, bmGhiChu |
| `tg` Tìm / gợi ý | 11 | `06-hop-thoai.js` 10, `07-cccd.js` 1 | tgChipHTML, tgDem, tgGoi, tgThem |
| `ln` Lưu nhanh | 11 | `12-scan.js` 8, `34-luu-ngan.js` 3 | lnCai, lnGhi, lnThuMuc, lnDoi |
| `ka` Chữ ký · CCCD (khay ảnh) | 11 | `12-scan.js` 8, `35-scan.js` 3 | kaTuTimKhung, kaXuLy, kaXoay, kaThang |
| `cg` Chỉnh gốc ảnh | 9 | `12-scan.js` 9 | cgDung, cgDiem, cgDiemKeo, cgKeo |
| `gb` Giao ban | 8 | `04-giao-dien.js` 8 | gbKyTruoc, gbTinh, gbLech, gbNhanDinh |
| `bgd` Buổi GD xã | 7 | `04-giao-dien.js` 7 | bgdDsDiem, bgdChon, bgdChonHTML, bgdTinh |
| `sc` Scan | 2 | `35-scan.js` 2 | scLoaiNho, scChonNguon |
| `tr` Bộ in chuẩn | 1 | `05-them-file.js` 1 | trLe |

## 4. Điểm vào hay dùng

- `ve` `js/04-giao-dien.js:96`
- `doiNgan` `js/04-giao-dien.js:4`
- `luu` `js/02-nen.js:200`
- `luuFile` `js/02-nen.js:261`
- `docFile` `js/02-nen.js:275`
- `moHop` `js/06-hop-thoai.js:3`
- `dongHop` `js/06-hop-thoai.js:55`
- `hoi` `js/06-hop-thoai.js:94`
- `bao` `js/02-nen.js:329`
- `veHomNay` `js/04-giao-dien.js:2428`
- `veVanBan` `js/04-giao-dien.js:2626`
- `veThang` `js/04-giao-dien.js:3522`
- `veGhiChu` `js/04-giao-dien.js:5179`
- `veScan` `js/12-scan.js:11`
- `veBieuMau` `js/09-bieu-mau.js:15`
- `veThem` `js/05-them-file.js:4`
- `veSoLieu` `js/22f-tra-cuu.js:252`
- `slDocFile` `js/22-so-lieu.js:346`
- `slGhi` `js/22-so-lieu.js:602`
- `slBo` `js/22-so-lieu.js:901`
- `slKyDung` `js/22-so-lieu.js:896`
- `toNap` `js/22g-to.js:154`
- `toVe` `js/22g-to.js:227`
- `veKTGS` `js/22b-ktgs.js:123`
- `veSaoKe` `js/22h-cap-hoi-sao-ke.js:406`
- `veTongHop` `js/22i-tong-hop.js:333`
- `inChuan` `js/05-them-file.js:1333`
- `inBlob` `js/05-them-file.js:1141`
- `xemChuan` `js/05-them-file.js:1341`
- `pvLuaChon` `js/22g-to.js:243`
- `chTheoDoi` `js/17-dong-bo-cai-dat.js:42`
- `slDay` `js/22-so-lieu.js:764`
- `slDayMeta` `js/22-so-lieu.js:815`
- `henDongBoChiMuc` `js/17-dong-bo-cai-dat.js:99`
- `batDau` `js/20-khoi-dong.js:127`
- `khoiDong` `js/20-khoi-dong.js:14`

Tab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · 5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).
