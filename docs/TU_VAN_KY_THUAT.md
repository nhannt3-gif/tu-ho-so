# Tư vấn kỹ thuật mới (TK 2 — anh dặn 25/10: "em luôn tư vấn anh cái mới về kỹ thuật có thể dùng để tối ưu so hiện tại, để anh không cứ theo lối mòn cũ lệch hướng mà không biết")

Ràng buộc giữ nguyên: ES5, không build, không npm, thư viện theo danh mục anh duyệt (QUY_CHUAN mục 10); mỗi mục = file riêng cắm rút (QUY_CHUAN mục 13).

| # | Kỹ thuật | Hiện tại | Lợi ích | Công sức | Trạng thái |
|---|---|---|---|---|---|
| 1 | **Web Worker** — đọc Excel + dựng số liệu kỳ ở luồng phụ | Chạy chung luồng giao diện → đơ khi nạp Mẫu 31 lớn | Nạp file không treo màn hình, điện thoại đỡ đứng | 2 phiên | **3.369: đo lại → đọc Excel đã ở Worker từ 3.86; chỗ đứng thật là tách dòng 2,35 s (dò tên cột cả file). Phương án A (sửa thẳng, anh duyệt) xong: tách dòng 0,74 s, đứng màn hình 2,5 → 0,86 s (ĐT giả lập 11,4 → 3,7 s). Phương án B (Worker cho tách dòng + ghi) để sau, chờ anh** |
| 2 | **Nạp module khi cần** (tải JS của tab lúc mở tab) | Tải ~3,6 MB JS lúc mở app | Mở app nhanh hơn rõ, nhất là điện thoại | 1–2 phiên | chờ anh (em đề xuất làm sớm) |
| 3 | **Lưu sẵn bản tóm tắt số liệu kỳ** đã dựng vào bộ nhớ máy | Mỗi lần mở dựng lại từ bảng gốc | Mở tab Số liệu gần như tức thì | 1 phiên | chờ anh |
| 4 | **Cài app lên màn hình chính (PWA)** cho bản máy tính | Chỉ bản điện thoại có | Mở như app thật, toàn màn hình, nhanh khi mạng yếu | 1 phiên | chờ anh |
| 5 | **Nhật ký lỗi tự động** + 1 nút gửi em | Lỗi chỉ lộ khi chạy phép thử | Bắt lỗi thật trên máy anh (như lỗi Scan 3.361) | 0,5 phiên | **xong 3.363** (`js/67-nhat-ky-loi.js`) |
| 6 | **Danh sách ảo** (chỉ vẽ phần đang nhìn) cho ~21.000 khách | Vẽ 50 dòng, "gõ thêm để lọc" | Cuộn được toàn bộ danh sách không chậm | 1 phiên | chờ anh |
| 7 | **Dùng chung bộ dữ liệu giả đã nạp** trong phép thử | Mỗi phép thử nạp lại (~10 s) | Hồi quy đủ ~40 → ~15–20 phút | 1 phiên | anh đã duyệt hướng (rà phép thử) |
| 8 | **CSS `@layer`** (lớp kiểu nền → khung → khối → điện thoại) | 146 khối `@media`, 303 `!important`, 2 TK cùng thêm CSS điện thoại | Thứ tự đè rõ, bỏ dần `!important`, không giẫm nhau (Safari 15.4+) | 1 phiên | chờ anh — em đề xuất (RA_SOAT_HUONG_DI_2510 K8) |
| 9 | **`content-visibility: auto`** cho danh sách / bảng dài | Vẽ cả phần khuất màn hình | Cuộn Tra cứu / bảng tổ / sao kê nhẹ hơn, nhất là ĐT (Safari 18+, máy cũ bỏ qua) | ½ phiên | chờ anh — em đề xuất (K9) |
| 10 | **Container queries** (`@container`) | Khối co theo cỡ màn hình (`@media`) | Khối tự co theo khung chứa; dùng chung máy tính / khung hẹp / ĐT (Safari 16+) | dần (khối mới) | chờ anh (K10) |
| 11 | **Chia nhỏ việc nặng theo nhịp** (lô ~16 ms, có thanh tiến độ) | Dựng kỳ / vẽ bảng tổ ĐT đứng 2,5–3,3 s | Không đứng màn hình, rẻ hơn Worker; Safari không có `requestIdleCallback` → dùng `MessageChannel` | 1 phiên | chờ anh — nên làm trước phương án B (K11) |
| 12 | **Drive: ETag / `fields=` / gộp lời gọi** | Mở app gọi Drive nhiều lần | Giảm số lần + dung lượng gọi Drive | 1 phiên | chờ số đo ⏱ của anh (K12) |
