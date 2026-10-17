# KẾ HOẠCH 3.224 — QUY TRÌNH SCAN MỚI (1 luồng chuẩn) — bản 17/10/2026, CHỜ ANH DUYỆT

> Căn cứ: anh chốt 17/10 (theo đề xuất của em): bỏ tự lưu, giữ bản nháp chống mất; Lưu vào máy có hộp "Lưu thành"; gộp Chữ ký / ảnh khách vào cùng luồng;
> thứ tự **3.224 scan → 3.225 tách lưu trữ + đồng bộ theo khối (`KE_HOACH_3225_LUU.md`) → bàn giao tài khoản phụ**.
> Quy trình: kế hoạch → anh duyệt → anh nhắn "code" → làm → kiểm → PR → anh nhắn "gộp".

## 0. Hiện trạng (đọc từ mã 3.223) — vì sao rối
| Luồng | Ở đâu | Bước | Vấn đề |
|---|---|---|---|
| Máy bàn | `js/12-scan.js` hàng chờ `HANG` | Chỉnh → Xem → hộp 4 nút (Lưu máy · Gửi · Copy ảnh · Lưu vào tủ) | hàng chờ giữ 7 ngày; chế độ Thẻ / Tài liệu chọn ở chỗ khác |
| Điện thoại (kiểu Lens, 3.43) | `quetNhanh` → `moXemPDF` | quét xong **tự lưu tạm** "Scan ngày giờ" → xem → hàng nút khác (In · Copy · Lưu nhanh · In chung · ⋯) | tự lưu, bộ nút khác máy bàn |
| 📁 Chữ ký · CCCD (3.44) | `moKyAnh` … `luuKA` | 3 bước riêng, lưu xong **tự đưa lên Drive** | luồng thứ 3; xóa nền chữ ký cắt cứng (ngưỡng 72 %, nét ép gần đen) + JPG → **chữ ký ảo, lem** |
| Chung | — | ảnh từ file / tài liệu đôi khi bị xếp **cặp mặt trước – mặt sau** như CCCD | xếp cặp theo chế độ đang nhớ (`SC.che`), không theo loại anh chọn lúc quét |

Phần **làm tốt, giữ và dùng chung**: tìm khung + nắn phối cảnh + kéo 4 góc có kính lúp + xoay / lật + lọc ảnh (`js/13-xu-ly-anh.js`, đang dùng cho CCCD), bộ dựng PDF đúng khổ, đọc chữ (OCR), cầu nối máy tính.

## 1. Luồng mới — 1 luồng cho máy bàn + điện thoại, mọi loại
**① Chọn loại + nguồn** (1 màn): 🪪 **CCCD** (2 mặt) · 📄 **Tài liệu / văn bản** (nhiều trang, 1 mặt mỗi trang) · ✍ **Chữ ký** (1 ảnh) · 🧑 **Ảnh khách** (1 ảnh) — nguồn 📷 máy quét / camera · 🖼 lấy từ file (ảnh, PDF).
- **Loại quyết định cách xử lý**, không đoán: chỉ CCCD mới ghép cặp mặt trước | mặt sau; Tài liệu, Chữ ký, Ảnh khách luôn 1 mặt → **hết nhầm đòi mặt 2**.
- Loại chọn lần trước được nhớ (riêng máy), đổi 1 chạm.

**② Chỉnh — 1 bộ chỉnh chung** (bê bộ chỉnh CCCD đang tốt sang mọi loại): tự tìm khung / bắt viền → nắn thẳng → kéo 4 góc có kính lúp · xoay 90° · lật · cắt lại · lấy nét · chọn lọc. Mỗi loại chỉ khác **khổ ra** và **bộ lọc mặc định**:
| Loại | Khổ ra | Lọc mặc định | Lọc chọn thêm |
|---|---|---|---|
| CCCD | 85,6 × 54 mm, 2 mặt | Magic màu (như nay) | Gốc · Xám |
| Tài liệu / văn bản | A4 dọc / ngang (tự theo tờ giấy) | **Văn bản rõ** (mới: nền giấy trắng đều, chữ đen đậm, giữ dấu đỏ / chữ ký màu) | Giấy trắng · Xám · Đen trắng · Gốc |
| Chữ ký | khung quanh nét ký (app đoán sẵn, kéo được) | **Xóa nền nhẹ** (mới) | Xóa nền vừa · Không xóa (chỉ cắt) |
| Ảnh khách | khung cắt tự do / chân dung | Gốc (chỉnh sáng nhẹ) | Magic màu |

- **Văn bản rõ** (tài liệu): trừ nền theo độ sáng từng vùng (khử bóng, khử vàng giấy) bằng `nenSang` sẵn có → kéo giãn chữ → lấy nét nhẹ; điểm có màu rõ (dấu đỏ, mực xanh) giữ màu. Nhiều trang: chụp liên tục, mỗi trang tự cắt, dời / xóa trang được.
- **Xóa nền chữ ký nhẹ**: nền ước theo vùng (không 1 ngưỡng cả ảnh) → chuyển mềm (không cắt cứng) → **giữ độ đậm nhạt thật của nét** (không ép đen) → mép nét mịn, không răng cưa; khử chấm bẩn nhỏ. Lưu **PNG xám** nếu nhẹ hơn, JPG chất lượng cao nếu không — tránh lem do nén JPG trên nét đen trắng.
- **Chữ ký / Ảnh khách: nén dưới 200 KB** (anh chốt 17/10, giữ mức như nay — để nhập hệ thống): hạ chất lượng dần → thu nhỏ dần tới khi ≤ 200 KB, ưu tiên giữ nét; hiện dung lượng + ✓ dưới 200 KB.

**③ ✓ Chốt đạt** → **④ Xem thử bản in**: PDF thật (CCCD đúng khổ — 1 người / 2 mặt, hoặc 4 người / A4; tài liệu A4 nhiều trang) hoặc ảnh (chữ ký, ảnh khách); tên file sửa được (gợi ý: "CCCD Nguyen Van A", "2026-10-17 Nguyen Van A CK.jpg"…).

**⑤ Bộ nút chuẩn** (cùng 1 bộ ở mọi loại, mọi máy):
| Nút | Làm gì |
|---|---|
| 🖨 **In** | in đúng khổ |
| 💾 **Lưu ▸ Lưu vào máy** | chỉ ra file, **không lưu vào app**. Máy bàn: hộp "Lưu thành" chọn thư mục (trình duyệt hỗ trợ), không được → Tải xuống. Điện thoại: bảng chia sẻ / Lưu vào Tệp |
| 💾 **Lưu ▸ Lưu vào app** | lưu tạm vào mục **⏳ Chờ khai báo** (trong máy) → khai sau đúng **cây địa bàn** xã › ấp › tổ › khách như bên Văn bản → **khai xong mới đưa lên Drive** đúng thư mục |
| 📤 **Gửi Zalo** | máy bàn: chép file (cầu nối) / kéo thả; điện thoại: bảng chia sẻ |
| ✕ **Bỏ** | bỏ bản này (hỏi lại 1 lần) |

**Bản nháp chống mất** (anh chốt giữ): ảnh đang quét giữ trong máy, **không hiện trong danh sách**, tự xóa khi bấm Xong / Bỏ hoặc sau 1 ngày; mở lại app giữa chừng → hỏi "Làm tiếp bản đang quét?".

**Bỏ** (anh duyệt bỏ chức năng cũ): tự lưu tạm trên điện thoại · hàng chờ 7 ngày · tự đưa lên Drive ngay khi lưu · các bộ nút trùng · luồng 📁 Chữ ký · CCCD riêng (gộp vào loại Chữ ký / Ảnh khách).
**Giữ**: danh sách scan cũ, chữ ký · CCCD cũ (xem, in, gửi, khai, dùng trong hồ sơ như nay) · bản cũ "lưu tạm chưa khai" chuyển vào ⏳ Chờ khai báo · đọc chữ (OCR) · cầu nối máy tính · webcam · quét từ máy quét.

## 2. Cách làm (kiến trúc)
- Mô-đun mới `js/35-scan.js` (cắm / rút): luồng ①–⑤ + bộ nút chuẩn; **xử lý ảnh dùng chung** đưa vào `js/13-xu-ly-anh.js` (thêm lọc Văn bản rõ, xóa nền chữ ký nhẹ, nén ≤ 200 KB — hàm cũ giữ nguyên).
- Lưu qua **cửa khối Scan** `KHO_SCAN` (lưu tạm, khai báo, danh sách, ảnh) → 3.225 tách lưu trữ chỉ đổi bên trong cửa, luồng scan không sửa.
- Nút "Quét" / "📷" / "📁 Chữ ký · CCCD" ở tab Scan, Hồ sơ… trỏ vào luồng mới. Mã luồng cũ **chưa xóa** ở 3.224 (chỉ không gọi nữa) → anh thử máy thật đạt mới xóa ở bản sau.

## 3. Phép thử (dữ liệu / ảnh GIẢ — tự vẽ trong phép thử, không ảnh thật)
`t186` (mới): ① mỗi loại đúng số mặt (Tài liệu / Chữ ký / Ảnh không bao giờ đòi mặt 2; CCCD ghép cặp đúng); ② bộ chỉnh chung chạy cho cả 4 loại (tìm khung, xoay, kéo góc); ③ Văn bản rõ: nền xám / bóng → nền trắng đều, chữ còn đậm, dấu đỏ còn đỏ; ④ chữ ký: nét xám nhạt giữ được độ nhạt, mép không răng cưa (đo số mức xám ở mép), không chấm bẩn; ⑤ ≤ 200 KB với ảnh lớn (chữ ký, ảnh khách); ⑥ Lưu vào máy không tạo mục trong app; Lưu vào app → ⏳ Chờ khai báo, chưa lên Drive; khai xong → lên Drive (Drive giả) đúng thư mục; ⑦ bản nháp: tắt app giữa chừng → mở lại hỏi làm tiếp; xong / bỏ → xóa nháp; ⑧ dữ liệu cũ (scan, chữ ký · CCCD, lưu tạm cũ) đọc được, lưu tạm cũ hiện ở Chờ khai báo; ⑨ máy bàn + điện thoại (khung iPhone) cùng bộ nút.
Hồi quy đủ (`tools/hoiquy.sh`) — các phép thử scan cũ (Lens, chữ ký, Drive scan…) cập nhật theo luồng mới khi đúng là chức năng anh duyệt đổi; còn lại phải giữ đạt.

## 4. Rủi ro + ước lượng
- Trung bình – cao (file scan 2.600 dòng, 3 luồng). Giảm: mô-đun mới, luồng cũ giữ mã tới khi anh duyệt xóa; xử lý ảnh mới là hàm thêm, không sửa hàm CCCD đang tốt.
- Chất lượng chữ ký / văn bản rõ chỉ chấm chuẩn được trên **ảnh thật của anh** → bảng thử máy thật có mục so trước / sau; chỉnh mức lọc sau khi anh xem.
- Ước lượng 2–3 phiên.

## 5. Anh duyệt
1. Luồng ①–⑤, bộ nút chuẩn, danh sách Bỏ / Giữ như trên?
2. Chữ ký lưu **PNG xám khi nhẹ hơn** — hệ thống của NH có nhận PNG không? (không nhận → luôn JPG chất lượng cao).
3. Ảnh khách là ảnh chân dung / ảnh chụp khách (không phải CCCD) — đúng ý anh?
