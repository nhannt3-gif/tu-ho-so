# Rà bố cục + tư vấn tối ưu — 24/10/2026 (bản 3.332) — TK 3, CHỜ ANH CHỌN, CHƯA SỬA CODE

> Anh 24/10: "sau đó em đóng vai trò kiểm tra lại bố cục, và tư vấn phát triển, tối ưu tiếp theo".
> Cách rà: chụp 15 tab máy tính 1440 px + 6 tab điện thoại 390 px (dữ liệu giả `tests/gianho31`), đo mã bằng grep, kết quả hồi quy đủ 3.330. Bổ sung cho `RA_SOAT_TONG_THE_2310.md` (TK 2) — không lặp ý đã có ở đó.

## 1. Đã tốt sau đợt 23–24/10
- Thanh bên 2 cấp gọn (7 mục cấp 1), điện thoại có thanh dưới 5 nút; khối LỌC ĐỊA BÀN 1 dòng gọn mặc định.
- Tab Tổ, Sao kê, Nạp & KT, Giao dịch xã (04/TD) rõ, xem trước bên phải đúng mẫu.
- KTGS: thanh 3 khối, ô Tháng kiểm tra, màn Bộ khai báo (TK 3 đã bàn giao TK 2).

## 2. Lỗi / chỗ chưa ổn thấy trên ảnh (số thật từ ảnh chụp)
| # | Tab | Thấy gì | Mức |
|---|---|---|---|
| 1 | Giao dịch xã, Hồ sơ vay (máy tính 1440 px) | **Dải chip mẫu bị cắt**: GDX nút thứ 5 chỉ còn chữ "B"; Hồ sơ vay chip "01/1…" bị chữ "📅 Số liệu: T8/2026" đè lên — không thấy hết mẫu, không biết còn mẫu phía sau | **cao** |
| 2 | Tra cứu KH | Khối lọc nằm trong cột trái hẹp → **ô chọn xã bị bóp còn 1 chữ "P"**, gần như không bấm được; mở tab chưa có danh sách khách mà cột phải ghi "chọn 1 khách ở danh sách bên trái" | **cao** |
| 3 | KTGS Hội | Ô chọn lọc bị cắt chữ ("Phường Gia Lộc (24", "Gia Lộc · ngày 23 (12") vì chip BC0437 / BC0438 chen vào hàng lọc, xếp 2 dòng | vừa |
| 4 | Tổng hợp | Hàng **Nguồn vốn / Chương trình nằm TRÊN khối lọc địa bàn** — ngược mọi tab khác (lọc địa bàn luôn đứng đầu) | vừa |
| 5 | Hồ sơ vay, Hồ sơ Tổ | Tiêu đề viết hoa **lặp chữ** ("SỐ HỘ VAY SỐ HỘ VAY — HỘ MỚI / LẤY TỪ MẪU 31…") + 3 chip chú thích màu; Hồ sơ Tổ hàng nút xuất 6 nút làm nút **Gửi rớt xuống dòng riêng** | vừa |
| 6 | Tổng hợp, Hồ sơ vay, Hồ sơ Tổ | Nút **mờ không dùng được** (Word, Excel) vẫn chiếm chỗ | thấp |
| 7 | Điện thoại (mọi tab) | Đầu trang **3 dòng** (logo · kỳ + 4 nút · ô tìm) + hàng tab con + lọc **2 dòng** → nội dung bắt đầu ở **~45% màn hình**; ô lọc bị cắt "Phườr", "Hội: tế"; chân trang **2 dòng** (dòng trạng thái + thanh dưới) | **cao** (anh dùng điện thoại khi đi GDX) |
| 8 | Hôm nay (điện thoại) | Lịch tháng chiếm cả màn đầu, việc cần làm phải cuộn | thấp (A1 KPI anh đã chốt làm sau) |

## 3. Số đo mã (24/10, bản 3.332)
| Chỉ số | Số | Ghi chú |
|---|---|---|
| File js · dòng | 82 · 37,2 nghìn | 23/10: 67 · 35,3 nghìn |
| File lớn nhất | `04-giao-dien.js` 5.416 · `06-hop-thoai.js` 3.117 · `12-scan.js` 2.564 · `25-ho-so.js` 1.974 | chưa tách |
| `luu()` "lưu tất cả" · `luuNgan()` | 395 · **0** | lưu theo ngăn chưa dùng ở nơi gọi |
| Scan đọc qua `KHO` | `35-scan` 0 · `46-quan-ly-scan` 0 | KTGS: đã có lớp `ktNguon*` chờ TK 2 |
| `onclick=` · `data-lenh` | 1.206 · 110 | cách gắn lệnh mới mới ~8% |
| `style=` viết trong js · CSS | 376 · 3.857 dòng | |
| Hồi quy đủ | 153 phép · **~2,5 giờ** chạy tuần tự | t100 (bộ 25.000 hộ treo > 120 giây ở Nạp & KT) và t158 (tab Tổ tự thêm cột) **sai từ 3.327**, chưa ai sửa |

## 4. Đề xuất — xếp theo lợi ích / công sức (anh chọn đợt, em lên kế hoạch chi tiết rồi chờ "code")
**Đợt 1 — sửa bố cục nhanh, ít rủi ro (1 bản, chỉ CSS + khung chung)**
1. Dải chip mẫu: **1 hàng cuộn ngang có mép mờ + nút ‹ ›** (hoặc 6 mẫu hay dùng + "⋯ Thêm"); chữ "📅 Số liệu" + "⚙ Khai báo đơn vị" dời xuống hàng nút xuất → hết bị cắt / bị đè (#1).
2. Ô chọn trong khối lọc: **bề rộng tối thiểu + nhãn ngắn** ("Gia Lộc · 24 tổ"); cột hẹp thì tự xuống dòng; chip BC0437/0438 của KTGS dời vào dòng số liệu dưới thanh khối (#2, #3).
3. Tra cứu KH: mở tab **hiện sẵn danh sách khách theo lọc** (200 khách giả — ảo hóa danh sách nếu nhiều) (#2).
4. Tổng hợp: Nguồn vốn / Chương trình **xuống dưới** khối lọc (#4).
5. Bỏ tiêu đề viết hoa lặp; chip chú thích gom vào 1 nút "ⓘ"; **ẩn** nút xuất không dùng được (#5, #6).

**Đợt 2 — điện thoại (anh dùng khi đi GDX)**
6. Đầu trang **2 dòng**: ô kỳ thu thành chip nhỏ cạnh ô tìm; 4 nút (❓ 🧰 🗑 ⚙) vào ☰ Thêm.
7. Khối lọc điện thoại: **1 dòng chỉ hiện cấp sâu nhất đang chọn** ("📍 Gia Lộc · ngày 23 ▾"), bấm mở bảng chọn toàn màn.
8. Bỏ dòng trạng thái phía trên thanh dưới (đưa vào ☰) → nội dung bắt đầu ở ~20% màn thay vì ~45%.

**Đợt 3 — công cụ kiểm (giảm lỗi lọt + giảm thời gian chờ)**
9. **Phép thử ảnh bố cục tự động**: chụp 15 tab × 2 cỡ màn, tự báo **chữ / nút bị cắt, tràn ngang, ô chọn hẹp hơn 60 px** — bắt được loại lỗi #1–#3 mà phép thử chức năng không thấy.
10. **Hồi quy chia nhóm** (`tools/hoiquy.sh` nhận nhóm: khung / số liệu / hồ sơ / scan / KTGS) + chạy 2 luồng → ~1 giờ; mỗi bản chạy nhóm của phần vừa sửa.
11. Sửa / xem lại **t100** (tốc độ nạp bộ lớn — liên quan máy thật của anh) và **t158**.

**Đợt 4 — nền mã (đã có trong RA_SOAT 23/10 mục B, nêu thứ tự em đề nghị)**
12. Gọi `luuNgan()` thay `luu()` ở các khối ghi nhiều (Sổ hộ vay, Scan, GDX) — giảm rủi ro mất dữ liệu khi 2 máy.
13. Scan đọc qua `KHO` (như KTGS); TK 2 làm KTGS theo `docs/BAN_GIAO_KTGS.md`.
14. Tách `04-giao-dien.js`, `06-hop-thoai.js` theo khối; mỗi bản đặt mốc **giảm 50 `onclick`** (thước đo `do_moc.json`).

**Đợt 5 — tính năng (anh đã duyệt hướng, làm sau)**: thẻ KPI Hôm nay từng thẻ · Ctrl+K lệnh nhanh · Giao dịch xã thêm mục con theo danh sách anh chọn.

## 5. Câu hỏi chờ anh
1. Làm **Đợt 1 + 2** trước (bố cục máy tính + điện thoại) rồi Đợt 3 — đồng ý? Ai làm: TK 3 (em) hay TK 2 (đang giữ khung chung `js/23`, `js/22g`)?
2. Dải chip mẫu: **cuộn ngang** hay **6 mẫu hay dùng + ⋯ Thêm**?
3. Điện thoại: gom 4 nút đầu trang vào ☰ Thêm — đồng ý?

## 6. TK 2 đã làm — Đợt 1 (bản 3.334, 24/10)
Anh 24/10: "em cứ làm theo kế hoạch ko cần hỏi lại" → TK 2 làm Đợt 1 (máy tính); Đợt 2 (điện thoại) làm tiếp.
| # | Việc | Đã làm | Ghi chú |
|---|---|---|---|
| 1 | Dải chip mẫu | ✓ cuộn ngang + mép mờ + nút ‹ › (`cnHang` js/26, chung GDX / Hồ sơ Tổ / Hồ sơ vay); 📅 Số liệu + ⚙ Khai báo đơn vị xuống dòng tên mẫu | chọn **cuộn ngang** (câu hỏi 2) — giữ đủ mẫu, không phải chọn "6 mẫu hay dùng" |
| 2 | Ô chọn lọc + Tra cứu | ✓ ô Xã bỏ chữ "Xã / Phường"; Tra cứu KH mở tab có sẵn danh sách theo lọc | |
| 3 | KTGS chip BC | ✓ dời sang cuối thanh 3 khối | |
| 4 | Tổng hợp Nguồn vốn / CT xuống dưới lọc | **✗ không làm** — anh đã chốt 3.168 "Nguồn vốn + Chương trình 1 dòng, cây lọc dưới"; chờ anh quyết | |
| 5 | Tiêu đề lặp, chip chú thích | ✓ bỏ lặp chữ, 1 dòng "…"; chú thích màu **giữ cùng dòng** (anh 3.317), không gom vào ⓘ | |
| 6 | Nút mờ | ✓ **giữ chỗ** (3.234 anh duyệt: mờ, không ẩn) nhưng chỉ còn biểu tượng → Gửi không rớt dòng | |

## 7. TK 3 bổ sung 24/10 (sau ý anh về điện thoại)
- **Đợt 2 (điện thoại) đổi hướng:** điện thoại thật chạy **`dt.html`** (bản riêng), không phải bản máy tính thu hẹp mà mục 2 #7 đã chụp. Anh 24/10: điện thoại sẽ là **bản riêng chuyên 🔎 Tra cứu KH · 📄 Văn bản · 📷 Scan**, TK 3 làm sau khi TK 2 bàn giao → kế hoạch **`docs/KE_HOACH_DIEN_THOAI_2.md`**. Mục 4 #6–#8 chỉ còn áp cho **máy tính bảng / cửa sổ hẹp** (ưu tiên thấp) — TK 2 không cần làm Đợt 2 cho điện thoại.
- **Góp ý phát triển thêm (chưa có trong các bản rà trước, chờ anh chọn):**
  1. **Nhật ký đã lập / đã in** theo khách và theo tổ (mẫu nào, ngày nào, bộ khai báo nào) — tra lại "khách này đã làm 01/TD, 03/TD chưa", KTGS "tháng này đã in Mẫu 06 cho tổ nào" (hiện chỉ nhớ trong phiên).
  2. **Kiểm sức khỏe sao lưu**: thẻ nhỏ ở ⚙ báo lần sao lưu / đồng bộ Drive gần nhất của từng ngăn, đỏ khi quá 7 ngày — giảm rủi ro mất dữ liệu khi 2 máy (đi cùng Đợt 4 #12 `luuNgan`).
  3. **Một chỗ khai báo người ký / chức danh** dùng chung Hồ sơ vay, Hồ sơ Tổ, KTGS (hiện mỗi khối có bảng riêng: Khai báo đơn vị, Hội đoàn thể, Bộ khai báo KTGS) — làm theo kiểu 3 tầng của KTGS (Đơn vị · Bộ khai báo · Lần in).
  4. **Phép thử ảnh bố cục** (Đợt 3 #9) chạy cả `dt.html` 390 px — bắt lỗi giao diện điện thoại trước khi anh thử máy thật.
