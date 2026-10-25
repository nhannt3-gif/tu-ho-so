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
| Đ3 · Hôm nay | lịch + việc gọn 1 cột | Sổ ngày hiện ngay màn hình đầu (3.364) |
| Đ4 · Số liệu (Tổ TK&VV, Sao kê, Tổng hợp, Báo cáo chuẩn) | danh sách báo cáo / cây địa bàn 1 cột; **bảng giữ cột như máy tính** trong khung **vuốt ngang**, cột đầu đứng yên (anh 25/10: "tận dụng tối đa kiểu vuốt trượt, phóng to thu nhỏ của iOS") | |
| Đ5 · Xem trước bản in + hộp xuất | khung xem mặc định vừa bề ngang, **chụm 2 ngón phóng to / thu nhỏ**, vuốt xem; nút In / PDF / Gửi cỡ ngón tay | |

## 5. Tiến độ
- 25/10: lập kế hoạch (anh duyệt). Anh thêm: "độc lập, cắm rút, an toàn, tối ưu tốc độ" (QUY_CHUAN mục 13) + "sao kê, báo cáo tận dụng vuốt trượt, phóng to thu nhỏ của iOS".
- **3.361 · Đ1 xong** — `css/dt-may.css` (mới, nạp `media="(max-width:600px)"`): đầu trang 137 → 83 px (bỏ chữ TH / tên app / đơn vị / giờ / nút ➡, ô kỳ co giãn, ô tìm 1 hàng), khung Lọc địa bàn 157 → 84 px, hàng chip "Tìm theo" vuốt ngang, chân trạng thái bỏ tên người dùng + nút khung xem, nút 📱 (TK 3) nhỏ + dời phải, hộp không vượt chiều cao màn hình. Phép thử t303 (cả kiểm máy tính 1440 không đổi).
- **3.362 · Đ2 (thẻ khách) xong** — anh 25/10: "theo em" (bảng món vay → thẻ) + "thẻ gọn 1 màn hình xem trọn" + "thêm màu sắc, chip màu, không khô cứng, chữ to chiếm hết màn hình": `css/dt-may.css` — thẻ khách chữ nhỏ theo `--co` (.88), mỗi món vay 1 thẻ 3 dòng (chip CT xanh, chip tình trạng xanh lá / đỏ / vàng, viền trái theo tình trạng, "Hạn · GN · Dư nợ · Lãi tồn" có nhãn); **mới `js/66-dt-may.js`** (chỉ chạy ≤ 600 px): ô kỳ chữ gọn "T8/26 · M31" (giá trị + title đủ, bọc `kyChungVe`). Phép thử t304. Bảng dài (thành viên tổ, sao kê) giữ kiểu vuốt ngang — đợt Đ4.
- **3.364 · Đ3 (Hôm nay) xong** — `css/dt-may.css`: lịch ô 44 → 34 px, nút lịch / công cụ 28 px (công cụ dạng chip tròn), khoảng cách khối mỏng, chữ ngày sổ 20 px → sổ ngày bắt đầu 692 → 557 px (vào màn hình đầu). Chỉ CSS, thứ tự / chức năng giữ. Phép thử t306.
- **3.365 · Đ4 (Số liệu) xong** — bảng tab Tổ đã có khung vuốt ngang + cột tên đứng yên; điện thoại: cột tên 205 → 140 px (tên dài xuống dòng) thấy thêm cột số; **sửa lỗi chung** ô tiêu đề góc bị đè khi cuộn ngang (`css/app.css` z-index 3). Báo cáo Sao kê / Tổng hợp mở trong khung xem trước → đợt Đ5. Phép thử t307.
- **3.366 · Đ5 (xem trước bản in) xong** — `trDan` (js/05): chụm 2 ngón trên trang đổi mức phóng của trang (chặn iOS phóng cả màn hình), điện thoại thanh nút 1 hàng vuốt ngang, nút 34 px, ẩn ⏮ ⏭. Phép thử t308. **Xong Đ1–Đ5** — chờ anh thử máy thật.
- **25/10 anh:** "giao diện điện thoại còn rối, Drive nạp rất lâu, Hôm nay · Văn bản · Tra cứu KH là 3 tab chính" → **Đ6** (anh duyệt, ô 4 = Scan). TK 3 làm trước ở 3.370 (mở thẳng bản chính) + 3.371 (Văn bản + Scan gọn, `css/dt-may-vbsc.css`) — TK 2 bỏ phần trùng. **3.372 · Đ6 xong:** thanh dưới Hôm nay · Tra cứu · Văn bản · Scan · ☰ Thêm (`js/66`), đầu / chân trang gọn, Tra cứu gọn (`css/dt-may.css`), ⏱ đo tốc độ trên máy thật (`js/68`). Phép thử t311. Tiếp: chờ số đo ⏱ của anh → sửa đúng chỗ Drive chậm.
- **25/10 anh:** "Nên giữ nút chuyển bên ngoài" → nút 📱 nổi sang `dt.html` giữ nguyên (không ẩn trong ☰ Thêm).
