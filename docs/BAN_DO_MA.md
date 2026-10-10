# BẢN ĐỒ MÃ (tự sinh bởi `tests/bando.py`, đừng sửa tay)

Bản 3.148 · 11/10/2026 00:47 · 25 file · 28754 dòng · 2250 hàm cấp ngoài · 332 biến toàn cục.

Cách dùng: tìm file / mục dưới đây rồi `grep -n "function tênHàm" js/*.js` hoặc đọc đúng khoảng dòng (Read offset/limit). Thứ tự nạp = thứ tự bảng 1 (đúng như các khối <script> trước khi tách). `python3 tests/ghep.py ra.html` ghép lại 1 file. Số dòng đổi theo bản — chạy lại script khi cần.


## 1. Các file (thứ tự nạp)

| File | Số dòng | Số hàm | Mở đầu |
|---|---|---|---|
| `index.html` | 205 | 0 | Khung trang (thẻ HTML tĩnh) + thẻ nạp css / js |
| `css/app.css` | 2875 | 0 | :root{ box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); |
| `js/01-thu-vien.js` | 67 | 4 | /*   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được Lần đầu có mạng: tải về và cất vào máy. |
| `js/02-nen.js` | 358 | 22 | /*   TỦ HỒ SƠ — bản 1.0  (giai đoạn 1) Cấu trúc file: |
| `js/03-doc-pdf.js` | 631 | 47 | /*   4. ĐỌC PDF & RÚT THÔNG TIN   */  function sanSangPDF(){ |
| `js/04-giao-dien.js` | 5515 | 523 | /*   6. VẼ GIAO DIỆN   */ var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', l |
| `js/05-them-file.js` | 1364 | 75 | /*   7. THÊM FILE & DUYỆT TÊN   */ var dangDoc = false; |
| `js/06-hop-thoai.js` | 3419 | 223 | /*   HỘP THOẠI CHUNG   */ var hamDong = null, khoaHop = false; function moHop(html, rong){ |
| `js/07-cccd.js` | 194 | 14 | /*   12. HỒ SƠ CCCD - 3.32: KHÔNG mã hóa nữa (anh Nhân chốt: Drive của anh là nơi lưu bảo mật). |
| `js/08-dia-ban.js` | 612 | 53 | /*   danh mục địa bàn: Xã/phường → Điểm GD → Ấp/KP → Tổ   */ function dsXa(){ return (D.cauHinh.diaBan//[]).ma |
| `js/09-bieu-mau.js` | 561 | 50 | /*   13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền Xếp theo chương trình vay; có nhóm dùng chung và th |
| `js/10-danh-sach.js` | 1212 | 93 | /*   14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI   */ |
| `js/11-khung-tab.js` | 472 | 40 | /*   17. KHUNG CHUẨN CHO MỌI TAB Ba phần giống nhau ở mọi tab: |
| `js/12-scan.js` | 2517 | 205 | /*   18. SCAN HỒ SƠ — máy scan trong app Hai chế độ: |
| `js/13-xu-ly-anh.js` | 408 | 31 | /*   3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu) Tự động trước: tìm |
| `js/14-tim-loc.js` | 198 | 14 | /*   19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER Gõ vào ô tìm → app gợi ý "Nghiệp vụ: Xử lý rủi |
| `js/15-ai-chuan-hoa.js` | 153 | 8 | /*   15. NHỜ AI CHUẨN HÓA Xuất danh sách ra bảng → anh đưa AI (Gemini, ChatGPT, Claude) |
| `js/16-ai-dan-ket-qua.js` | 222 | 10 | /*   16. DÁN KẾT QUẢ TỪ AI Anh chép nguyên đoạn Gemini trả về, app tự đọc ra số hiệu, ngày, |
| `js/17-dong-bo-cai-dat.js` | 441 | 39 | /*   ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE   */ /* 3.113 (anh chốt: app cá nhân → lưu lên Drive hết): đồng bộ TOÀN BỘ cài  |
| `js/18-cai-dat.js` | 399 | 21 | /*   20. CÁC HÀM CÀI ĐẶT — bản dựng lại   */ |
| `js/19-danh-muc.js` | 222 | 23 | /*   21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU Một bộ sửa dùng chung cho: Mảng · Chương trình |
| `js/20-khoi-dong.js` | 140 | 4 | /*   KHỞI ĐỘNG   */ function capNhatDau(){ document.getElementById('donvi').textContent = |
| `js/21-ngay-gy.js` | 38 | 3 | /* 3.135 — anh Nhân: mọi ô chọn ngày ghi rõ kiểu ngày/tháng/năm (trình duyệt tiếng Anh hiện tháng/ngày → dễ nh |
| `js/22-so-lieu.js` | 6403 | 732 | /*   3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng - Nạp cả bộ (app tự nhận loại + kỳ) hoặc từng fil |
| `js/23-dieu-huong.js` | 128 | 16 | /*   3.147 (đợt F, anh duyệt 10/10/2026): THANH BÊN ĐIỀU HƯỚNG — máy tính màn ≥ 1100 px   - Chỉ đổi cách đi gi |

## 2. Mục trong mã (chú thích tiêu đề)

- `js/01-thu-vien.js:1` · BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được
- `js/02-nen.js:1` · TỦ HỒ SƠ — bản 1.0  (giai đoạn 1)
- `js/02-nen.js:14` · 1. HẰNG SỐ
- `js/02-nen.js:176` · 2. LƯU TRỮ
- `js/02-nen.js:288` · 3. TIỆN ÍCH
- `js/03-doc-pdf.js:1` · 4. ĐỌC PDF & RÚT THÔNG TIN
- `js/03-doc-pdf.js:381` · RÚT THÔNG TIN TỪ CHÍNH TÊN FILE
- `js/03-doc-pdf.js:456` · 5. SINH TÊN CHUẨN
- `js/04-giao-dien.js:1` · 6. VẼ GIAO DIỆN
- `js/04-giao-dien.js:181` · LỊCH (tab Hôm nay) — bản 3.9, theo tab Lịch của CBTD AI
- `js/04-giao-dien.js:201` · NGÀY CHAY · MÙNG 1 · RẰM · LỄ ÂM (3.12)
- `js/04-giao-dien.js:274` · vẽ
- `js/04-giao-dien.js:314` · 3.62 — VIỆC W: CỘT 🧰 CÔNG CỤ cạnh lịch (anh chốt 02/10/2026)
- `js/04-giao-dien.js:334` · 3.83 — 📊 SỐ LIỆU GIAO BAN (từ Theo dõi nợ): mỗi danh sách (3 tháng KHD · quá hạn · khoanh) kỳ mới nhất SO VỚI kỳ trước
- `js/04-giao-dien.js:417` · 3.83 — 📅 CHUẨN BỊ BUỔI GIAO DỊCH XÃ: chọn điểm GD (mặc định điểm có ngày GD gần nhất)
- `js/04-giao-dien.js:481` · 3.71 — 🧰 CÔNG CỤ: 📋 CHƯƠNG TRÌNH VAY
- `js/04-giao-dien.js:623` · W① HẠN TRẢ NỢ HSSV — đúng công thức file Excel Sheet2 anh đang dùng
- `js/04-giao-dien.js:919` · W② CÂY ĐỊA BÀN — mã xã · mã điểm GD · mã ấp/KP, xếp theo mã
- `js/04-giao-dien.js:965` · trang NHẬT KÝ CÔNG VIỆC (giấy vàng) của ngày đang chọn
- `js/04-giao-dien.js:966` · GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
- `js/04-giao-dien.js:986` · SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
- `js/04-giao-dien.js:1033` · HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
- `js/04-giao-dien.js:1299` · ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
- `js/04-giao-dien.js:1625` · 💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
- `js/04-giao-dien.js:1741` · CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
- `js/04-giao-dien.js:1905` · CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
- `js/04-giao-dien.js:2220` · thao tác
- `js/04-giao-dien.js:2309` · Danh sách: quá hạn + 60 ngày tới
- `js/04-giao-dien.js:2337` · Tính ngày
- `js/04-giao-dien.js:2382` · đồng bộ _Hệ thống/lich.json
- `js/04-giao-dien.js:2538` · TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
- `js/04-giao-dien.js:2830` · BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào
- `js/04-giao-dien.js:2845` · MA TRẬN THÁNG (3.21) — màn chính của tab Tháng
- `js/04-giao-dien.js:3036` · QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
- `js/04-giao-dien.js:3249` · 3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
- `js/04-giao-dien.js:3485` · CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
- `js/04-giao-dien.js:3707` · 3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
- `js/04-giao-dien.js:3979` · 3.64 — ⚠ THEO DÕI NỢ (Thư viện): 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh (anh chốt 03/10/2026)
- `js/04-giao-dien.js:4039` · lưu / nạp
- `js/04-giao-dien.js:4108` · tiện ích
- `js/04-giao-dien.js:4161` · ĐỌC FILE SAO KÊ THÁNG
- `js/04-giao-dien.js:4315` · GIAO DIỆN: danh sách + cây
- `js/04-giao-dien.js:4426` · 3.82 — 🏠 HỒ SƠ HỘ MỘT TRANG: gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab
- `js/04-giao-dien.js:4545` · THẺ MÓN: số liệu · hồ sơ hộ · nhật ký · tài liệu · vị trí
- `js/04-giao-dien.js:4632` · lần làm việc
- `js/04-giao-dien.js:4706` · vị trí nhà
- `js/04-giao-dien.js:4735` · tài liệu của hộ
- `js/04-giao-dien.js:4802` · 📝 BIÊN BẢN — danh mục mẫu (thêm mẫu sau không sửa phần khác)
- `js/04-giao-dien.js:4886` · 🧾 PHIẾU THÔNG TIN MÓN VAY (3.66 · việc AI) — "sơ yếu lý lịch" món nợ xấu
- `js/04-giao-dien.js:5137` · 🖨 DANH SÁCH CHI TIẾT + TỔNG HỢP THEO XÃ, ĐIỂM GD (3.67 · việc AH)
- `js/04-giao-dien.js:5276` · nhắc ở Hôm nay
- `js/05-them-file.js:1` · 7. THÊM FILE & DUYỆT TÊN
- `js/05-them-file.js:539` · 8. XEM TRƯỚC / IN / GỬI
- `js/05-them-file.js:625` · TRÌNH XEM DÙNG CHUNG cho khung lớn (#x-than) và cột phải (#cp-than)
- `js/05-them-file.js:1185` · 3.128 — BỘ IN CHUẨN (anh chốt): app tự chia trang A4 → xem trước = bản in
- `js/06-hop-thoai.js:1` · HỘP THOẠI CHUNG
- `js/06-hop-thoai.js:103` · SỬA MỘT MỤC
- `js/06-hop-thoai.js:119` · PHÂN LOẠI 3 CẤP (bản 3.4): Mảng (1) · CT vay (1 hoặc Dùng chung) · Tag (nhiều)
- `js/06-hop-thoai.js:317` · 3.69 (việc AJ, anh chốt) — HỘP SỬA GỌN: ô chọn, Tag gợi ý, phím nhập nhanh, dòng 💡 hướng dẫn chung
- `js/06-hop-thoai.js:979` · ĐỒNG BỘ MỤC LÊN FILE THẬT TRÊN DRIVE (bản 3.6)
- `js/06-hop-thoai.js:1167` · XÓA · THÙNG RÁC · XÓA HẲN (bản 3.10)
- `js/06-hop-thoai.js:1295` · 3.144 — BỎ TAB THÁNG (anh chốt Q5, Q12, 10/10/2026): xóa dữ liệu cũ của tab một lần, không sao lưu.
- `js/06-hop-thoai.js:1361` · CHỜ KHAI (3.11) — mọi file chưa đủ thông tin về MỘT danh sách, xem ở tab Văn bản
- `js/06-hop-thoai.js:1461` · CHỤP / CHỌN ẢNH GHI CHÚ
- `js/06-hop-thoai.js:1481` · 9. CÀI ĐẶT
- `js/06-hop-thoai.js:1906` · 3.50: ❓ HƯỚNG DẪN TRỰC QUAN — chia theo tab, sơ đồ luồng dữ liệu, các bước theo logic.
- `js/06-hop-thoai.js:2504` · 3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc ch
- `js/06-hop-thoai.js:2698` · 10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
- `js/06-hop-thoai.js:2968` · 3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
- `js/06-hop-thoai.js:3083` · 11. LẬP CHỈ MỤC
- `js/06-hop-thoai.js:3143` · 3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
- `js/07-cccd.js:1` · 12. HỒ SƠ CCCD
- `js/07-cccd.js:42` · 3.79.1 — KHÔI PHỤC DANH SÁCH SCAN TỪ ẢNH CÒN TRONG MÁY
- `js/08-dia-ban.js:513` · 3.33 — ĐƯA HỒ SƠ SCAN LÊN DRIVE
- `js/09-bieu-mau.js:1` · 13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền
- `js/09-bieu-mau.js:88` · BIỂU MẪU 3.24 — như một thư mục: ghim · đếm lần dùng · ghi chú cách dùng ·
- `js/09-bieu-mau.js:227` · 3.31 — MỞ FILE WORD/EXCEL KHÔNG PHẢI TẢI VỀ (tránh rác trong thư mục Tải xuống)
- `js/09-bieu-mau.js:337` · 3.61 (việc M): GỬI NHIỀU BIỂU MẪU · NÉN .ZIP
- `js/10-danh-sach.js:1` · 14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI
- `js/10-danh-sach.js:204` · QUÉT DỌN RÁC — chỉ trong thư mục Tủ hồ sơ, chỉ đọc cho tới khi anh chọn
- `js/10-danh-sach.js:532` · 3.50: 🧰 DỌN KHO — một nơi duy nhất (thay Bảo trì kho ở Cài đặt và Thư viện).
- `js/10-danh-sach.js:671` · 3.77 — VĂN BẢN TRÙNG: cùng số hiệu (bỏ dấu, khoảng trắng, gạch) + cùng năm ban hành
- `js/11-khung-tab.js:1` · 17. KHUNG CHUẨN CHO MỌI TAB
- `js/12-scan.js:1` · 18. SCAN HỒ SƠ — máy scan trong app
- `js/12-scan.js:838` · 3.43: SCAN TRÊN ĐIỆN THOẠI THEO KIỂU LENS — Quét → Xong → PDF lưu tạm (tên Scan ngày giờ, sửa ngay) → xem trước → Gửi
- `js/12-scan.js:1005` · 3.49: MÁY BÀN — 💾 LƯU NHANH + 📋 COPY thay nút Gửi (điện thoại giữ 📤 Gửi). Drive vẫn là nơi lưu mặc định.
- `js/12-scan.js:1129` · 3.44: CHỮ KÝ · ẢNH KHÁCH HÀNG — file ảnh nhỏ (dưới 200 KB, càng nhỏ càng tốt) để nhập lên hệ thống khi tạo hồ sơ.
- `js/12-scan.js:1423` · 3.45: CAMERA TRONG APP — dùng chung iPhone và máy bàn có webcam.
- `js/12-scan.js:1642` · 3.46: ĐỒNG BỘ DRIVE — mặc định khi mở app, khi rời app, ngay sau khi lưu; tùy chọn mỗi 5 phút; nút ☁ Đồng bộ ngay.
- `js/12-scan.js:1752` · 3.46 (mục K): ĐỌC CHỮ PDF ẢNH (OCR) — chỉ khi anh bấm, chỉ hiện nút khi mục còn thiếu thông tin.
- `js/12-scan.js:1798` · 3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
- `js/12-scan.js:2041` · 3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi"
- `js/13-xu-ly-anh.js:1` · 3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu)
- `js/14-tim-loc.js:1` · 19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER
- `js/15-ai-chuan-hoa.js:1` · 15. NHỜ AI CHUẨN HÓA
- `js/16-ai-dan-ket-qua.js:1` · 16. DÁN KẾT QUẢ TỪ AI
- `js/17-dong-bo-cai-dat.js:1` · ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE
- `js/17-dong-bo-cai-dat.js:83` · ĐỒNG BỘ CHỈ MỤC TỦ HỒ SƠ QUA DRIVE (việc #4)
- `js/17-dong-bo-cai-dat.js:103` · 3.81 — SAO LƯU & KHÔI PHỤC
- `js/18-cai-dat.js:1` · 20. CÁC HÀM CÀI ĐẶT — bản dựng lại
- `js/19-danh-muc.js:1` · 21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU
- `js/20-khoi-dong.js:1` · KHỞI ĐỘNG
- `js/22-so-lieu.js:1` · 3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng
- `js/22-so-lieu.js:115` · 1. ĐỌC WORKBOOK (thử Worker để màn hình không treo; không được thì đọc trực tiếp)
- `js/22-so-lieu.js:154` · 2. NHẬN DẠNG + LẤY DÒNG DỮ LIỆU
- `js/22-so-lieu.js:254` · 3. KỲ (ngày chốt): cột ngày → ngày ở tiêu đề → tên file
- `js/22-so-lieu.js:301` · 4. TỔNG CHÍNH của từng loại
- `js/22-so-lieu.js:335` · 5. ĐỌC MỘT FILE → kết quả xem trước
- `js/22-so-lieu.js:428` · 6. DẠNG ĐỌC NHANH: lưu theo cột, chữ lặp thay bằng số thứ tự
- `js/22-so-lieu.js:469` · 7. CHỈ MỤC (meta) + danh bạ khách hàng
- `js/22-so-lieu.js:586` · 8. GHI NHẬN 1 file đã đọc
- `js/22-so-lieu.js:610` · 3.145: HOÀN TÁC LẦN THAY FILE (1 bước, trong 30 ngày — Thùng rác Drive giữ 30 ngày)
- `js/22-so-lieu.js:711` · 9. ĐỒNG BỘ DRIVE
- `js/22-so-lieu.js:809` · 10. BỘ DỮ LIỆU KỲ: nối các bảng
- `js/22-so-lieu.js:968` · 11. TAB 📈 SỐ LIỆU
- `js/22-so-lieu.js:995` · đọc file BC0437 / BC0438
- `js/22-so-lieu.js:1072` · trạng thái + nạp dữ liệu cho tab
- `js/22-so-lieu.js:1115` · nạp + kiểm tra theo chuẩn tab Nạp & Kiểm tra (anh chốt): ma trận loại × tháng · 📥 nạp nhiều file (xem trước, xác nhận) ·
- `js/22-so-lieu.js:1255` · số liệu tổ từ BC0437 (thiếu thì tính từ Mẫu 31, ghi rõ nguồn)
- `js/22-so-lieu.js:1268` · màn: chưa chọn tổ → bảng các tổ (BC0437) · chọn tổ → thẻ + chọn hộ
- `js/22-so-lieu.js:1324` · phân loại hộ + gợi ý (Mẫu 06 kiểm tra đột xuất)
- `js/22-so-lieu.js:1430` · khai báo khi in (mặc định trống) → Word đúng khuôn / In PDF
- `js/22-so-lieu.js:1434` · 3.98 (anh chốt): khai báo nằm ngay trong tab của mẫu (khung ✎ thu gọn được), lưu lâu dài trừ ngày; cán bộ kiểm tra lấy t
- `js/22-so-lieu.js:1446` · 3.114 (anh chốt): HỘP CHỌN KHI IN — mỗi mẫu 1 phần, nhớ lựa chọn lần trước (D.cauHinh.ktIn[mẫu], đồng bộ Drive);
- `js/22-so-lieu.js:1728` · 3.138 (anh chốt): Mẫu 06 gọn & nhạt
- `js/22-so-lieu.js:1853` · 3.93.1: Mẫu 06 KIỂM TRA SAU GIẢI NGÂN (727: kiểm tra sử dụng vốn trong 30 ngày) — anh chốt (làm đơn giản):
- `js/22-so-lieu.js:1980` · 3.98: dòng hộ dùng chung 3 màn chọn hộ (đột xuất · sau giải ngân · định kỳ)
- `js/22-so-lieu.js:2018` · bản In / PDF — cùng bố cục mẫu (A4 ngang Mẫu 06, A4 dọc Mẫu 16); trống = dòng chấm
- `js/22-so-lieu.js:2175` · 3.98: 📖 BẢNG CHUẨN HÓA HỘI – ĐOÀN (anh chốt: chữ đặc thù dùng chung mọi mẫu, sửa 1 chỗ)
- `js/22-so-lieu.js:2468` · ⚙ Khai báo Hội (mỗi Hội – xã 1 khối)
- `js/22-so-lieu.js:2516` · 3.113 (anh chốt): 🏛 KHAI BÁO HỘI ĐOÀN THỂ — 1 nơi khai cho mọi mẫu (06, 16TD, 04, Kế hoạch); tab nhỏ Hội – xã · Chuẩn hó
- `js/22-so-lieu.js:2519` · 3.117 (anh gửi mẫu tham khảo + bản Đoàn thật, anh: "làm mẫu luôn"): 📄 THÔNG BÁO PHÂN CÔNG NHIỆM VỤ BAN THƯỜNG VỤ trong c
- `js/22-so-lieu.js:2809` · 3.140 (anh chốt): IN THEO THÁNG KIỂM TRA (chip 🗓 Kế hoạch) — bấm tháng → các tổ của tháng (theo ấp):
- `js/22-so-lieu.js:3353` · cột trái
- `js/22-so-lieu.js:3403` · kiểm trùng 2 ô
- `js/22-so-lieu.js:3458` · thẻ chi tiết (phải / hộp trên điện thoại)
- `js/22-so-lieu.js:3697` · 3.88: ① FILE THÁNG · ② KIỂM TRA (kết quả lưu theo tháng, dữ liệu đổi thì báo kiểm lại)
- `js/22-so-lieu.js:3801` · 3.146 (anh chốt 10/10): KIỂM TRA KỲ — không chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã bấm kiểm, s
- `js/22-so-lieu.js:3851` · 3.90.1: BẢNG ĐỐI CHIẾU CHÉO — chỉ tiêu × nguồn (BCDHTD chuẩn · LEN_31 · Mẫu 31 · Dư nợ chi tiết), toàn PGD và từng xã
- `js/22-so-lieu.js:4080` · 12. NẠP: cả bộ / từng file
- `js/22-so-lieu.js:4237` · 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng
- `js/22-so-lieu.js:4283` · 3.88 — 👥 TAB CON TỔ TK&VV (trong tab Số liệu, cạnh Tra cứu KH): chọn 1 tổ (cây xã → điểm GD → hội → tổ, hoặc gõ tên) → b
- `js/22-so-lieu.js:4483` · 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ)
- `js/22-so-lieu.js:4557` · 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể)
- `js/22-so-lieu.js:4618` · 3.92: TAB TỔ — mục đích (anh Nhân): biết số tổ viên để KẾT NẠP thêm hoặc CHO RA khỏi tổ, căn cứ dư nợ và số dư 105
- `js/22-so-lieu.js:4916` · 3.132 (anh chốt) — CẤP HỘI / ĐIỂM GD / XÃ / PGD: dòng tóm tắt + chip lọc như của tổ; mặc định bảng các tổ (PGD: Cộng PGD
- `js/22-so-lieu.js:5054` · báo cáo: mỗi báo cáo trả {ten, tieuDe, html (phần thân), aoa (Excel)}
- `js/22-so-lieu.js:5226` · xem → in / Excel
- `js/22-so-lieu.js:5279` · 3.89 — 👤 TRA CỨU KH: phạm vi (bộ chọn chung) + KIỂM TRÙNG trước khi nhập máy
- `js/22-so-lieu.js:5315` · 3.89 — 📑 TAB CON SAO KÊ (trong Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi (bộ chọn chung) → tích → Xem → In / Excel
- `js/22-so-lieu.js:5473` · 3.91: NỢ ĐẾN HẠN — theo ngày đến hạn hợp đồng (gia hạn nếu có) + kỳ GDXA chuyển quá hạn (anh chốt)
- `js/22-so-lieu.js:5527` · 3.91: MÓN VAY TRẢ GỐC PHÂN KỲ — NỢ ĐẾN HẠN KỲ CON (anh Nhân; Công văn 597/NHCS-TDNN 30/01/2026)
- `js/22-so-lieu.js:5726` · 3.90 — 7 FILE TỔNG HỢP CHUẨN TW (anh chốt: số chính thức của TW, chuẩn nhất)
- `js/22-so-lieu.js:5836` · ghép tổ LEN_31 TO_TRUONG (chỉ có tên tổ trưởng, có khi bị cắt; 2 tổ trùng tên trong 1 xã gộp 1 dòng) với mã tổ
- `js/22-so-lieu.js:5884` · ② KIỂM TRA: số chuẩn TW khớp nhau (nhóm 7) · Mẫu 31 ↔ số chuẩn TW (nhóm 8) · KHĐ, tổ trưởng (nhóm 3)
- `js/22-so-lieu.js:6003` · 3.90 — 📊 TAB CON TỔNG HỢP (Số liệu): tiêu chí + bộ lọc → tích → Xem → In (A4 ngang) / Excel
- `js/22-so-lieu.js:6257` · 3.90: CHUẨN IN mọi báo cáo (anh chốt): A4, lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi tr
- `js/22-so-lieu.js:6262` · 3.90: XÓA cả bộ tháng / LÀM MỚI toàn bộ số liệu (chỉ phần Số liệu; Drive vào thùng rác, lấy lại được 30 ngày)
- `js/22-so-lieu.js:6308` · 3.90: THAY FILE 1 ô — file mới phải đúng loại, đúng kỳ của ô; khác thì báo, không thay
- `js/22-so-lieu.js:6326` · 3.90.1: TẢI FILE GỐC (bản sao để dùng việc khác) — trong máy nếu còn, không thì tải từ Drive
- `js/22-so-lieu.js:6344` · 3.90.1: TÌM FILE RÁC CỦA SỐ LIỆU (riêng phần Số liệu: trong máy sl_… + Drive Số liệu/ và _Hệ thống/so_lieu/; không đụng 

## 3. Nhóm hàm theo tiền tố (khối chức năng)

| Tiền tố | Số hàm | File | Ví dụ |
|---|---|---|---|
| `kt` KTGS Hội (Mẫu 06/16/04, KH…) | 338 | `22-so-lieu.js` 338 | ktXepLoai, ktNgayDau, ktDocBC, ktPhanTich |
| `sl` Số liệu (nạp, kho kỳ, ma trận) | 181 | `22-so-lieu.js` 181 | slLoai, slChuan, slLaNgay, slLaHS |
| `to` Tổ TK&VV | 97 | `22-so-lieu.js` 95, `04-giao-dien.js` 2 | toSang, toNutSL, toStkChu, toCH |
| `tdn` Theo dõi nợ | 92 | `04-giao-dien.js` 92 | tdnChuan, tdnSo, tdnNgay, tdnTien |
| `sk` Sao kê | 43 | `22-so-lieu.js` 43 | skChon, skKhoCua, skChonBC, skDoiKho |
| `lc` Lịch | 37 | `04-giao-dien.js` 37 | lcISO, lcNgay, lcDM, lcDMY |
| `hs` Hồ sơ CCCD / hộ | 37 | `04-giao-dien.js` 37 | hsDoc, hsNgay, hsCuoiThang, hsEdate |
| `tc` Tra cứu KH | 23 | `22-so-lieu.js` 23 | tcChep, tcC, tcDiaChi, tcSdtDat |
| `th` Tổng hợp | 18 | `22-so-lieu.js` 18 | thCH, thDsKy, thNap, thTr |
| `bm` Biểu mẫu | 15 | `09-bieu-mau.js` 15 | bmTim, bmGhim, bmDungThem, bmSapXep |
| `tg` Tìm / gợi ý | 11 | `06-hop-thoai.js` 10, `07-cccd.js` 1 | tgChipHTML, tgDem, tgGoi, tgThem |
| `ch` Đồng bộ cài đặt | 11 | `17-dong-bo-cai-dat.js` 11 | chRieng, chBamChu, chKhoa, chBamKhoa |
| `cg` Chỉnh gốc ảnh | 9 | `12-scan.js` 9 | cgDung, cgDiem, cgDiemKeo, cgKeo |
| `gb` Giao ban | 8 | `04-giao-dien.js` 8 | gbKyTruoc, gbTinh, gbLech, gbNhanDinh |
| `ln` Lưu nhanh | 8 | `12-scan.js` 8 | lnCai, lnGhi, lnThuMuc, lnDoi |
| `ka` Chữ ký · CCCD (khay ảnh) | 8 | `12-scan.js` 8 | kaTuTimKhung, kaXuLy, kaXoay, kaThang |
| `bgd` Buổi GD xã | 7 | `04-giao-dien.js` 7 | bgdDsDiem, bgdChon, bgdChonHTML, bgdTinh |
| `pv` Bộ chọn phạm vi (cây địa bàn) | 7 | `22-so-lieu.js` 7 | pvLuaChon, pvCha, pvVeCay, pvBoTT |
| `tr` Bộ in chuẩn | 1 | `05-them-file.js` 1 | trLe |

## 4. Điểm vào hay dùng

- `ve` `js/04-giao-dien.js:95`
- `doiNgan` `js/04-giao-dien.js:4`
- `luu` `js/02-nen.js:198`
- `luuFile` `js/02-nen.js:249`
- `docFile` `js/02-nen.js:263`
- `moHop` `js/06-hop-thoai.js:3`
- `dongHop` `js/06-hop-thoai.js:55`
- `hoi` `js/06-hop-thoai.js:94`
- `bao` `js/02-nen.js:317`
- `veHomNay` `js/04-giao-dien.js:2477`
- `veVanBan` `js/04-giao-dien.js:2679`
- `veThang` `js/04-giao-dien.js:3630`
- `veGhiChu` `js/04-giao-dien.js:5286`
- `veScan` `js/12-scan.js:11`
- `veBieuMau` `js/09-bieu-mau.js:15`
- `veThem` `js/05-them-file.js:4`
- `veSoLieu` `js/22-so-lieu.js:3564`
- `slDocFile` `js/22-so-lieu.js:340`
- `slGhi` `js/22-so-lieu.js:587`
- `slBo` `js/22-so-lieu.js:860`
- `slKyDung` `js/22-so-lieu.js:855`
- `toNap` `js/22-so-lieu.js:4400`
- `toVe` `js/22-so-lieu.js:4473`
- `veKTGS` `js/22-so-lieu.js:1097`
- `veSaoKe` `js/22-so-lieu.js:5337`
- `veTongHop` `js/22-so-lieu.js:6040`
- `inChuan` `js/05-them-file.js:1344`
- `inBlob` `js/05-them-file.js:1156`
- `xemChuan` `js/05-them-file.js:1352`
- `pvLuaChon` `js/22-so-lieu.js:4489`
- `chTheoDoi` `js/17-dong-bo-cai-dat.js:42`
- `slDay` `js/22-so-lieu.js:724`
- `slDayMeta` `js/22-so-lieu.js:775`
- `henDongBoChiMuc` `js/17-dong-bo-cai-dat.js:98`
- `batDau` `js/20-khoi-dong.js:127`
- `khoiDong` `js/20-khoi-dong.js:14`

Tab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · 5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).
