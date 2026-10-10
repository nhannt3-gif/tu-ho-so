# BẢN ĐỒ MÃ — index.html (tự sinh bởi `tests/bando.py`, đừng sửa tay)

Bản 3.141 · 09/10/2026 16:00 · 28389 dòng · 2223 hàm cấp ngoài · 327 biến toàn cục.

Cách dùng: tìm khối / mục theo dòng dưới đây rồi `grep -n "function tênHàm"` hoặc đọc đúng khoảng dòng (Read offset/limit). Số dòng đổi theo bản — chạy lại script khi cần.


## 1. Khối <style> / <script> (≥ 50 dòng)

| Loại | Dòng | Số dòng | Mở đầu |
|---|---|---|---|
| style | 7–2769 | 2762 | :root{ box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); |
| script | 2942–3010 | 68 | /*   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được Lần đầu có mạng: tải về và cất vào máy. |
| script | 3011–3366 | 355 | /*   TỦ HỒ SƠ — bản 1.0  (giai đoạn 1) Cấu trúc file: |
| script | 3367–3999 | 632 | /*   4. ĐỌC PDF & RÚT THÔNG TIN   */  function sanSangPDF(){ |
| script | 4000–9496 | 5496 | /*   6. VẼ GIAO DIỆN   */ var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', l |
| script | 9497–10853 | 1356 | /*   7. THÊM FILE & DUYỆT TÊN   */ var dangDoc = false; |
| script | 10854–14208 | 3354 | /*   HỘP THOẠI CHUNG   */ var hamDong = null, khoaHop = false; function moHop(html, rong){ |
| script | 14209–14404 | 195 | /*   12. HỒ SƠ CCCD - 3.32: KHÔNG mã hóa nữa (anh Nhân chốt: Drive của anh là nơi lưu bảo mật). |
| script | 14405–15018 | 613 | /*   danh mục địa bàn: Xã/phường → Điểm GD → Ấp/KP → Tổ   */ function dsXa(){ return (D.cauHinh.diaBan//[]).ma |
| script | 15021–15583 | 562 | /*   13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền Xếp theo chương trình vay; có nhóm dùng chung và th |
| script | 15586–16792 | 1206 | /*   14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI   */ |
| script | 16795–17268 | 473 | /*   17. KHUNG CHUẨN CHO MỌI TAB Ba phần giống nhau ở mọi tab: |
| script | 17271–19789 | 2518 | /*   18. SCAN HỒ SƠ — máy scan trong app Hai chế độ: |
| script | 19790–20199 | 409 | /*   3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu) Tự động trước: tìm |
| script | 20202–20401 | 199 | /*   19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER Gõ vào ô tìm → app gợi ý "Nghiệp vụ: Xử lý rủi |
| script | 20402–20556 | 154 | /*   15. NHỜ AI CHUẨN HÓA Xuất danh sách ra bảng → anh đưa AI (Gemini, ChatGPT, Claude) |
| script | 20557–20780 | 223 | /*   16. DÁN KẾT QUẢ TỪ AI Anh chép nguyên đoạn Gemini trả về, app tự đọc ra số hiệu, ngày, |
| script | 20781–21223 | 442 | /*   ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE   */ /* 3.113 (anh chốt: app cá nhân → lưu lên Drive hết): đồng bộ TOÀN BỘ cài  |
| script | 21224–21624 | 400 | /*   20. CÁC HÀM CÀI ĐẶT — bản dựng lại   */ |
| script | 21625–21848 | 223 | /*   21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU Một bộ sửa dùng chung cho: Mảng · Chương trình |
| script | 21849–21989 | 140 | /*   KHỞI ĐỘNG   */ function capNhatDau(){ document.getElementById('donvi').textContent = |
| script | 22030–28386 | 6356 | /*   3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng - Nạp cả bộ (app tự nhận loại + kỳ) hoặc từng fil |
| script | 27652–28386 | 734 | (function(){var t=document.querySelectorAll(".trang"),k=document.getElementById("sk-kho"),'+ 'tran=function(){ |

## 2. Mục trong mã (chú thích tiêu đề)

- 2943 · BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được
- 3012 · TỦ HỒ SƠ — bản 1.0  (giai đoạn 1)
- 3025 · 1. HẰNG SỐ
- 3187 · 2. LƯU TRỮ
- 3299 · 3. TIỆN ÍCH
- 3368 · 4. ĐỌC PDF & RÚT THÔNG TIN
- 3748 · RÚT THÔNG TIN TỪ CHÍNH TÊN FILE
- 3823 · 5. SINH TÊN CHUẨN
- 4001 · 6. VẼ GIAO DIỆN
- 4169 · LỊCH (tab Hôm nay) — bản 3.9, theo tab Lịch của CBTD AI
- 4189 · NGÀY CHAY · MÙNG 1 · RẰM · LỄ ÂM (3.12)
- 4262 · vẽ
- 4302 · 3.62 — VIỆC W: CỘT 🧰 CÔNG CỤ cạnh lịch (anh chốt 02/10/2026)
- 4322 · 3.83 — 📊 SỐ LIỆU GIAO BAN (từ Theo dõi nợ): mỗi danh sách (3 tháng KHD · quá hạn · khoanh) kỳ mới nhất SO VỚI kỳ trước
- 4405 · 3.83 — 📅 CHUẨN BỊ BUỔI GIAO DỊCH XÃ: chọn điểm GD (mặc định điểm có ngày GD gần nhất)
- 4469 · 3.71 — 🧰 CÔNG CỤ: 📋 CHƯƠNG TRÌNH VAY
- 4610 · W① HẠN TRẢ NỢ HSSV — đúng công thức file Excel Sheet2 anh đang dùng
- 4900 · W② CÂY ĐỊA BÀN — mã xã · mã điểm GD · mã ấp/KP, xếp theo mã
- 4946 · trang NHẬT KÝ CÔNG VIỆC (giấy vàng) của ngày đang chọn
- 4947 · GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
- 4967 · SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
- 5014 · HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
- 5280 · ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
- 5606 · 💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
- 5722 · CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
- 5886 · CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
- 6201 · thao tác
- 6290 · Danh sách: quá hạn + 60 ngày tới
- 6318 · Tính ngày
- 6363 · đồng bộ _Hệ thống/lich.json
- 6519 · TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
- 6811 · BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào
- 6826 · MA TRẬN THÁNG (3.21) — màn chính của tab Tháng
- 7017 · QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
- 7230 · 3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
- 7466 · CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
- 7688 · 3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
- 7960 · 3.64 — ⚠ THEO DÕI NỢ (Thư viện): 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh (anh chốt 03/10/2026)
- 8020 · lưu / nạp
- 8089 · tiện ích
- 8142 · ĐỌC FILE SAO KÊ THÁNG
- 8296 · GIAO DIỆN: danh sách + cây
- 8407 · 3.82 — 🏠 HỒ SƠ HỘ MỘT TRANG: gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab
- 8526 · THẺ MÓN: số liệu · hồ sơ hộ · nhật ký · tài liệu · vị trí
- 8613 · lần làm việc
- 8687 · vị trí nhà
- 8716 · tài liệu của hộ
- 8783 · 📝 BIÊN BẢN — danh mục mẫu (thêm mẫu sau không sửa phần khác)
- 8867 · 🧾 PHIẾU THÔNG TIN MÓN VAY (3.66 · việc AI) — "sơ yếu lý lịch" món nợ xấu
- 9118 · 🖨 DANH SÁCH CHI TIẾT + TỔNG HỢP THEO XÃ, ĐIỂM GD (3.67 · việc AH)
- 9257 · nhắc ở Hôm nay
- 9498 · 7. THÊM FILE & DUYỆT TÊN
- 10027 · 8. XEM TRƯỚC / IN / GỬI
- 10113 · TRÌNH XEM DÙNG CHUNG cho khung lớn (#x-than) và cột phải (#cp-than)
- 10673 · 3.128 — BỘ IN CHUẨN (anh chốt): app tự chia trang A4 → xem trước = bản in
- 10855 · HỘP THOẠI CHUNG
- 10957 · SỬA MỘT MỤC
- 10973 · PHÂN LOẠI 3 CẤP (bản 3.4): Mảng (1) · CT vay (1 hoặc Dùng chung) · Tag (nhiều)
- 11171 · 3.69 (việc AJ, anh chốt) — HỘP SỬA GỌN: ô chọn, Tag gợi ý, phím nhập nhanh, dòng 💡 hướng dẫn chung
- 11833 · ĐỒNG BỘ MỤC LÊN FILE THẬT TRÊN DRIVE (bản 3.6)
- 12021 · XÓA · THÙNG RÁC · XÓA HẲN (bản 3.10)
- 12173 · CHỜ KHAI (3.11) — mọi file chưa đủ thông tin về MỘT danh sách, xem ở tab Văn bản
- 12273 · CHỤP / CHỌN ẢNH GHI CHÚ
- 12293 · 9. CÀI ĐẶT
- 12719 · 3.50: ❓ HƯỚNG DẪN TRỰC QUAN — chia theo tab, sơ đồ luồng dữ liệu, các bước theo logic.
- 13295 · 3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc ch
- 13489 · 10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
- 13758 · 3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
- 13872 · 11. LẬP CHỈ MỤC
- 13932 · 3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
- 14210 · 12. HỒ SƠ CCCD
- 14251 · 3.79.1 — KHÔI PHỤC DANH SÁCH SCAN TỪ ẢNH CÒN TRONG MÁY
- 14918 · 3.33 — ĐƯA HỒ SƠ SCAN LÊN DRIVE
- 15022 · 13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền
- 15109 · BIỂU MẪU 3.24 — như một thư mục: ghim · đếm lần dùng · ghi chú cách dùng ·
- 15248 · 3.31 — MỞ FILE WORD/EXCEL KHÔNG PHẢI TẢI VỀ (tránh rác trong thư mục Tải xuống)
- 15358 · 3.61 (việc M): GỬI NHIỀU BIỂU MẪU · NÉN .ZIP
- 15587 · 14. DANH SÁCH GỌN + MENU + NHÓM + THÙNG RÁC + TRẠNG THÁI
- 15783 · QUÉT DỌN RÁC — chỉ trong thư mục Tủ hồ sơ, chỉ đọc cho tới khi anh chọn
- 16111 · 3.50: 🧰 DỌN KHO — một nơi duy nhất (thay Bảo trì kho ở Cài đặt và Thư viện).
- 16250 · 3.77 — VĂN BẢN TRÙNG: cùng số hiệu (bỏ dấu, khoảng trắng, gạch) + cùng năm ban hành
- 16796 · 17. KHUNG CHUẨN CHO MỌI TAB
- 17272 · 18. SCAN HỒ SƠ — máy scan trong app
- 18109 · 3.43: SCAN TRÊN ĐIỆN THOẠI THEO KIỂU LENS — Quét → Xong → PDF lưu tạm (tên Scan ngày giờ, sửa ngay) → xem trước → Gửi
- 18276 · 3.49: MÁY BÀN — 💾 LƯU NHANH + 📋 COPY thay nút Gửi (điện thoại giữ 📤 Gửi). Drive vẫn là nơi lưu mặc định.
- 18400 · 3.44: CHỮ KÝ · ẢNH KHÁCH HÀNG — file ảnh nhỏ (dưới 200 KB, càng nhỏ càng tốt) để nhập lên hệ thống khi tạo hồ sơ.
- 18694 · 3.45: CAMERA TRONG APP — dùng chung iPhone và máy bàn có webcam.
- 18913 · 3.46: ĐỒNG BỘ DRIVE — mặc định khi mở app, khi rời app, ngay sau khi lưu; tùy chọn mỗi 5 phút; nút ☁ Đồng bộ ngay.
- 19023 · 3.46 (mục K): ĐỌC CHỮ PDF ẢNH (OCR) — chỉ khi anh bấm, chỉ hiện nút khi mục còn thiếu thông tin.
- 19069 · 3.48: ĐỌC LẠI THEO BỐ CỤC — lấy đúng chỗ trên văn bản thay vì đọc dồn cả trang:
- 19312 · 3.48: CẦU NỐI MÁY TÍNH (Windows) — bấm là mở thẳng file thật trên ổ Google Drive (tự dò ổ + "My Drive" / "Drive của tôi"
- 19791 · 3.35 — XỬ LÝ ẢNH SCAN KIỂU APP SCAN CHUYÊN NGHIỆP (chạy tại chỗ, không gửi ảnh đi đâu)
- 20203 · 19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER
- 20403 · 15. NHỜ AI CHUẨN HÓA
- 20558 · 16. DÁN KẾT QUẢ TỪ AI
- 20782 · ĐỒNG BỘ CÀI ĐẶT LÊN DRIVE
- 20864 · ĐỒNG BỘ CHỈ MỤC TỦ HỒ SƠ QUA DRIVE (việc #4)
- 20884 · 3.81 — SAO LƯU & KHÔI PHỤC
- 21225 · 20. CÁC HÀM CÀI ĐẶT — bản dựng lại
- 21626 · 21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU
- 21850 · KHỞI ĐỘNG
- 22031 · 3.85 — 📈 SỐ LIỆU: bộ file Excel hệ thống nạp hằng tháng
- 22144 · 1. ĐỌC WORKBOOK (thử Worker để màn hình không treo; không được thì đọc trực tiếp)
- 22183 · 2. NHẬN DẠNG + LẤY DÒNG DỮ LIỆU
- 22283 · 3. KỲ (ngày chốt): cột ngày → ngày ở tiêu đề → tên file
- 22330 · 4. TỔNG CHÍNH của từng loại
- 22366 · 5. ĐỌC MỘT FILE → kết quả xem trước
- 22449 · 6. DẠNG ĐỌC NHANH: lưu theo cột, chữ lặp thay bằng số thứ tự
- 22490 · 7. CHỈ MỤC (meta) + danh bạ khách hàng
- 22607 · 8. GHI NHẬN 1 file đã đọc
- 22719 · 9. ĐỒNG BỘ DRIVE
- 22818 · 10. BỘ DỮ LIỆU KỲ: nối các bảng
- 22963 · 11. TAB 📈 SỐ LIỆU
- 22990 · đọc file BC0437 / BC0438
- 23066 · trạng thái + nạp dữ liệu cho tab
- 23108 · nạp + kiểm tra theo chuẩn tab Nạp & Kiểm tra (anh chốt): ma trận loại × tháng · 📥 nạp nhiều file (xem trước, xác nhận) ·
- 23248 · số liệu tổ từ BC0437 (thiếu thì tính từ Mẫu 31, ghi rõ nguồn)
- 23261 · màn: chưa chọn tổ → bảng các tổ (BC0437) · chọn tổ → thẻ + chọn hộ
- 23317 · phân loại hộ + gợi ý (Mẫu 06 kiểm tra đột xuất)
- 23423 · khai báo khi in (mặc định trống) → Word đúng khuôn / In PDF
- 23427 · 3.98 (anh chốt): khai báo nằm ngay trong tab của mẫu (khung ✎ thu gọn được), lưu lâu dài trừ ngày; cán bộ kiểm tra lấy t
- 23439 · 3.114 (anh chốt): HỘP CHỌN KHI IN — mỗi mẫu 1 phần, nhớ lựa chọn lần trước (D.cauHinh.ktIn[mẫu], đồng bộ Drive);
- 23721 · 3.138 (anh chốt): Mẫu 06 gọn & nhạt
- 23846 · 3.93.1: Mẫu 06 KIỂM TRA SAU GIẢI NGÂN (727: kiểm tra sử dụng vốn trong 30 ngày) — anh chốt (làm đơn giản):
- 23973 · 3.98: dòng hộ dùng chung 3 màn chọn hộ (đột xuất · sau giải ngân · định kỳ)
- 24011 · bản In / PDF — cùng bố cục mẫu (A4 ngang Mẫu 06, A4 dọc Mẫu 16); trống = dòng chấm
- 24168 · 3.98: 📖 BẢNG CHUẨN HÓA HỘI – ĐOÀN (anh chốt: chữ đặc thù dùng chung mọi mẫu, sửa 1 chỗ)
- 24461 · ⚙ Khai báo Hội (mỗi Hội – xã 1 khối)
- 24509 · 3.113 (anh chốt): 🏛 KHAI BÁO HỘI ĐOÀN THỂ — 1 nơi khai cho mọi mẫu (06, 16TD, 04, Kế hoạch); tab nhỏ Hội – xã · Chuẩn hó
- 24512 · 3.117 (anh gửi mẫu tham khảo + bản Đoàn thật, anh: "làm mẫu luôn"): 📄 THÔNG BÁO PHÂN CÔNG NHIỆM VỤ BAN THƯỜNG VỤ trong c
- 24802 · 3.140 (anh chốt): IN THEO THÁNG KIỂM TRA (chip 🗓 Kế hoạch) — bấm tháng → các tổ của tháng (theo ấp):
- 25344 · cột trái
- 25394 · kiểm trùng 2 ô
- 25449 · thẻ chi tiết (phải / hộp trên điện thoại)
- 25692 · 3.88: ① FILE THÁNG · ② KIỂM TRA (kết quả lưu theo tháng, dữ liệu đổi thì báo kiểm lại)
- 25736 · 3.91: KIỂM TRA & CHỐT — chỉ để biết và chốt, không sửa số liệu (anh chốt)
- 25797 · 3.90.1: BẢNG ĐỐI CHIẾU CHÉO — chỉ tiêu × nguồn (BCDHTD chuẩn · LEN_31 · B32 · Mẫu 31 · Mẫu 10), toàn PGD và từng xã
- 26038 · 12. NẠP: cả bộ / từng file
- 26196 · 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng
- 26242 · 3.88 — 👥 TAB CON TỔ TK&VV (trong tab Số liệu, cạnh Tra cứu KH): chọn 1 tổ (cây xã → điểm GD → hội → tổ, hoặc gõ tên) → b
- 26433 · 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ)
- 26507 · 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể)
- 26568 · 3.92: TAB TỔ — mục đích (anh Nhân): biết số tổ viên để KẾT NẠP thêm hoặc CHO RA khỏi tổ, căn cứ dư nợ và số dư 105
- 26866 · 3.132 (anh chốt) — CẤP HỘI / ĐIỂM GD / XÃ / PGD: dòng tóm tắt + chip lọc như của tổ; mặc định bảng các tổ (PGD: Cộng PGD
- 27000 · báo cáo: mỗi báo cáo trả {ten, tieuDe, html (phần thân), aoa (Excel)}
- 27172 · xem → in / Excel
- 27225 · 3.89 — 👤 TRA CỨU KH: phạm vi (bộ chọn chung) + KIỂM TRÙNG trước khi nhập máy
- 27261 · 3.89 — 📑 TAB CON SAO KÊ (trong Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi (bộ chọn chung) → tích → Xem → In / Excel
- 27419 · 3.91: NỢ ĐẾN HẠN — theo ngày đến hạn hợp đồng (gia hạn nếu có) + kỳ GDXA chuyển quá hạn (anh chốt)
- 27473 · 3.91: MÓN VAY TRẢ GỐC PHÂN KỲ — NỢ ĐẾN HẠN KỲ CON (anh Nhân; Công văn 597/NHCS-TDNN 30/01/2026)
- 27672 · 3.90 — 7 FILE TỔNG HỢP CHUẨN TW (anh chốt: số chính thức của TW, chuẩn nhất)
- 27801 · ghép tổ LEN_31 TO_TRUONG (chỉ có tên tổ trưởng, có khi bị cắt; 2 tổ trùng tên trong 1 xã gộp 1 dòng) với mã tổ
- 27849 · ② KIỂM TRA: số chuẩn TW khớp nhau (nhóm 7) · Mẫu 31 ↔ số chuẩn TW (nhóm 8) · KHĐ, tổ trưởng (nhóm 3)
- 27980 · 3.90 — 📊 TAB CON TỔNG HỢP (Số liệu): tiêu chí + bộ lọc → tích → Xem → In (A4 ngang) / Excel
- 28236 · 3.90: CHUẨN IN mọi báo cáo (anh chốt): A4, lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi tr
- 28241 · 3.90: XÓA cả bộ tháng / LÀM MỚI toàn bộ số liệu (chỉ phần Số liệu; Drive vào thùng rác, lấy lại được 30 ngày)
- 28289 · 3.90: THAY FILE 1 ô — file mới phải đúng loại, đúng kỳ của ô; khác thì báo, không thay
- 28308 · 3.90.1: TẢI FILE GỐC (bản sao để dùng việc khác) — trong máy nếu còn, không thì tải từ Drive
- 28326 · 3.90.1: TÌM FILE RÁC CỦA SỐ LIỆU (riêng phần Số liệu: trong máy sl_… + Drive Số liệu/ và _Hệ thống/so_lieu/; không đụng 

## 3. Nhóm hàm theo tiền tố (khối chức năng)

| Tiền tố | Số hàm | Dòng đầu – cuối | Ví dụ |
|---|---|---|---|
| `kt` KTGS Hội (Mẫu 06/16/04, KH…) | 338 | 22999 – 25294 | ktXepLoai, ktNgayDau, ktDocBC, ktPhanTich |
| `sl` Số liệu (nạp, kho kỳ, ma trận) | 176 | 22130 – 28374 | slLoai, slChuan, slLaNgay, slLaHS |
| `to` Tổ TK&VV | 94 | 4069 – 27211 | toSang, toStkChu, toCH, toDsKy |
| `tdn` Theo dõi nợ | 92 | 8029 – 9258 | tdnChuan, tdnSo, tdnNgay, tdnTien |
| `sk` Sao kê | 43 | 27275 – 27660 | skChon, skKhoCua, skChonBC, skDoiKho |
| `lc` Lịch | 37 | 4178 – 6342 | lcISO, lcNgay, lcDM, lcDMY |
| `hs` Hồ sơ CCCD / hộ | 37 | 4611 – 4898 | hsDoc, hsNgay, hsCuoiThang, hsEdate |
| `tc` Tra cứu KH | 23 | 25332 – 27258 | tcChep, tcC, tcDiaChi, tcSdtDat |
| `th` Tổng hợp | 18 | 27997 – 28225 | thCH, thDsKy, thNap, thTr |
| `bm` Biểu mẫu | 15 | 15114 – 15347 | bmTim, bmGhim, bmDungThem, bmSapXep |
| `tg` Tìm / gợi ý | 11 | 11186 – 14285 | tgChipHTML, tgDem, tgGoi, tgThem |
| `ch` Đồng bộ cài đặt | 11 | 20792 – 20823 | chRieng, chBamChu, chKhoa, chBamKhoa |
| `cg` Chỉnh gốc ảnh | 9 | 17811 – 17890 | cgDung, cgDiem, cgDiemKeo, cgKeo |
| `gb` Giao ban | 8 | 4326 – 4397 | gbKyTruoc, gbTinh, gbLech, gbNhanDinh |
| `ln` Lưu nhanh | 8 | 18293 – 18367 | lnCai, lnGhi, lnThuMuc, lnDoi |
| `ka` Chữ ký · CCCD (khay ảnh) | 8 | 18482 – 18921 | kaTuTimKhung, kaXuLy, kaXoay, kaThang |
| `bgd` Buổi GD xã | 7 | 4410 – 4465 | bgdDsDiem, bgdChon, bgdChonHTML, bgdTinh |
| `pv` Bộ chọn phạm vi (cây địa bàn) | 7 | 26439 – 26494 | pvLuaChon, pvCha, pvVeCay, pvBoTT |
| `tr` Bộ in chuẩn | 1 | 10830 – 10830 | trLe |

## 4. Điểm vào hay dùng

- `ve` dòng 4083
- `doiNgan` dòng 4004
- `luu` dòng 3209
- `luuFile` dòng 3260
- `docFile` dòng 3274
- `moHop` dòng 10857
- `dongHop` dòng 10909
- `hoi` dòng 10948
- `bao` dòng 3328
- `veHomNay` dòng 6458
- `veVanBan` dòng 6660
- `veThang` dòng 7611
- `veGhiChu` dòng 9267
- `veScan` dòng 17282
- `veBieuMau` dòng 15036
- `veThem` dòng 9501
- `veSoLieu` dòng 25555
- `slDocFile` dòng 22371
- `slGhi` dòng 22608
- `slBo` dòng 22865
- `slKyDung` dòng 22860
- `toNap` dòng 26359
- `toVe` dòng 26423
- `veKTGS` dòng 23091
- `veSaoKe` dòng 27283
- `veTongHop` dòng 28017
- `inChuan` dòng 10832
- `inBlob` dòng 10644
- `xemChuan` dòng 10840
- `pvLuaChon` dòng 26439
- `chTheoDoi` dòng 20823
- `slDay` dòng 22732
- `slDayMeta` dòng 22783
- `henDongBoChiMuc` dòng 20879
- `batDau` dòng 21976
- `khoiDong` dòng 21863

Tab (`nganHienTai` → hàm vẽ): 0 Hôm nay `veHomNay` · 1 Văn bản `veVanBan` · 2 Tháng `veThang` · 3 Ghi chú `veGhiChu` · 4 Scan `veScan` · 5 Biểu mẫu `veBieuMau` · 6 Khay chờ `veThem` · 7 Số liệu `veSoLieu` (tab con `D.cauHinh.slTab`: nap · th · sk · to · kt · tra).
