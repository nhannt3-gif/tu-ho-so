# Kế hoạch tinh chỉnh BẢN MÁY TÍNH chạy mượt trên ĐIỆN THOẠI (TK 2, 25/10/2026 — anh duyệt)

> Anh 25/10: "giao diện điện thoại giao cho TK 3 làm vẫn còn thô… giải pháp tinh chỉnh bản máy tính cho hiện mượt trên điện thoại nay cần làm song song" → "Đồng ý nhưng vẫn quy tắc chức năng mới nhưng đảm bảo cái cũ chạy được".

## 1. Hiện trạng (chụp `index.html?may=1` khổ iPhone 390 px, dữ liệu giả, 25/10)
- Đã dùng được: thanh dưới 5 nút, thẻ khách đọc tốt, danh sách khách dạng thẻ.
- Vướng: đầu trang chiếm ~30% màn hình (2 hàng + ô tìm); khung "Lọc địa bàn" to; hàng chip "Tìm theo" bị cắt; bảng (món vay, thành viên tổ, sao kê) tràn ngang; nút 📱 nổi đè nội dung; dòng trạng thái chân trang chiếm chỗ.
- Điện thoại cảm ứng mở `index.html` tự chuyển sang `dt.html` (3.231); `?may=1` / nút "Mở bản máy tính" giữ bản này.

## 2. Phân công
- **TK 2**: tinh chỉnh `index.html` + `css/app.css` (khối `@media (max-width: 600px)` riêng, cuối file) + chỗ vẽ giao diện các tab TK 2 giữ.
- **TK 3**: giữ `dt.html` (gói xem không mạng, văn bản ghim). Khi bản máy tính trên điện thoại đủ mượt, anh quyết có đổi mặc định điện thoại sang bản máy tính / gộp hay không.

## 3. Nguyên tắc
- **Không đổi bản máy tính**: chỉ thêm CSS / cách hiện trong khối màn hẹp; logic dùng chung.
- Mỗi đợt: chụp màn hình 2 khổ (1440 + 390) trước / sau; phép thử khổ hẹp (dải `t300–t349`) + phép thử cũ của vùng đụng; đụng CSS chung → hồi quy đủ.

## 4. Đợt
| Đợt | Việc | Anh thấy |
|---|---|---|
| Đ1 · Khung chung | đầu trang 1 hàng gọn (ô tìm thu vào nút 🔍), thanh dưới cố định, bỏ / dời nút 📱 nổi, chân trạng thái gọn, hộp (modal) toàn màn hình, khung "Lọc địa bàn" thu gọn 1 dòng | Màn hình rộng chỗ hơn |
| Đ2 · Tra cứu KH + thẻ khách + thẻ tổ | hàng chip cuộn ngang, bảng món vay / thành viên → dạng thẻ dọc | Không còn tràn ngang |
| Đ3 · Hôm nay | lịch + việc gọn 1 cột | |
| Đ4 · Số liệu (Tổ TK&VV, Sao kê, Tổng hợp, Báo cáo chuẩn) | danh sách báo cáo / cây địa bàn 1 cột; **bảng giữ cột như máy tính** trong khung **vuốt ngang**, cột đầu đứng yên (anh 25/10: "tận dụng tối đa kiểu vuốt trượt, phóng to thu nhỏ của iOS") | |
| Đ5 · Xem trước bản in + hộp xuất | khung xem mặc định vừa bề ngang, **chụm 2 ngón phóng to / thu nhỏ**, vuốt xem; nút In / PDF / Gửi cỡ ngón tay | |

## 5. Tiến độ
- 25/10: lập kế hoạch (anh duyệt). Anh thêm: "độc lập, cắm rút, an toàn, tối ưu tốc độ" (QUY_CHUAN mục 13) + "sao kê, báo cáo tận dụng vuốt trượt, phóng to thu nhỏ của iOS".
- **3.361 · Đ1 xong** — `css/dt-may.css` (mới, nạp `media="(max-width:600px)"`): đầu trang 137 → 83 px (bỏ chữ TH / tên app / đơn vị / giờ / nút ➡, ô kỳ co giãn, ô tìm 1 hàng), khung Lọc địa bàn 157 → 84 px, hàng chip "Tìm theo" vuốt ngang, chân trạng thái bỏ tên người dùng + nút khung xem, nút 📱 (TK 3) nhỏ + dời phải, hộp không vượt chiều cao màn hình. Phép thử t303 (cả kiểm máy tính 1440 không đổi).
