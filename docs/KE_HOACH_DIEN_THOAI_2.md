# Kế hoạch bản điện thoại 2 — chuyên 🔎 Tra cứu KH · 📄 Văn bản · 📷 Scan — TK 3, 24/10/2026 — ANH ĐÃ CHỐT HƯỚNG (mục 7), CODE SAU KHI TK 2 BÀN GIAO

> Anh 24/10: "trên điện thoại em cứ lên plan, sẽ có 1 bản làm riêng cho điện thoại chuyên về tra cứu KH, Văn bản và Scan; có lẽ em sẽ làm chính mục trên điện thoại sau khi TK 2 bàn giao lại; giờ em chỉ rà bố cục, lên plan và góp ý phát triển thêm".
> **Ai làm / khi nào:** TK 3, sau khi TK 2 bàn giao khung chung (điều hướng, cây địa bàn, KHO). Đến lúc đó chỉ là kế hoạch.

## 1. Hiện trạng (đọc mã + chụp `dt.html` 390 px bằng dữ liệu giả, 24/10)
- Điện thoại mở `index.html` → **tự chuyển `dt.html`** (bản riêng, Framework7 kiểu iOS, 3.231–3.233). Ảnh "điện thoại" trong `RA_SOAT_BO_CUC_2410.md` mục 2 #7 là **bản máy tính thu hẹp** (máy tính bảng / cửa sổ hẹp), không phải bản anh dùng trên điện thoại.
- `dt.html` = 352 dòng mã (`js/dt/dt-nen.js` lõi PIN + mã hóa + Drive chỉ đọc; `js/dt/dt-giao-dien.js` giao diện), thanh dưới 5 nút: **🔎 Tra cứu · 🗺 Địa bàn · 🏢 Giao dịch · 📄 Tài liệu (Văn bản | Scan) · ⚙ Cài đặt**.
- Số liệu: **gói xem** `_Hệ thống/xem/xem.json.gz` máy tính tự đẩy sau mỗi lần nạp Mẫu 31 (`js/38-goi-xem.js`): tổ + khách (mã, tên, ngày sinh, CCCD, ngày cấp, SĐT, ấp, vợ/chồng, TK 105) + món (CT, KU, ngày vay, giải ngân, dư nợ, QH, khoanh, hạn). Cất trong máy **mã hóa AES-256 theo PIN**, tự khóa 5 phút.

| Phần | Đang có | Thiếu / chưa ổn (thấy trên ảnh + mã) |
|---|---|---|
| 🔎 Tra cứu | 1 ô tìm (tên không dấu, CCCD, mã KH, SĐT, ấp) → danh sách → thẻ khách (nhân thân, tổ, gọi tổ trưởng, món vay) | dòng kỳ dưới ô tìm vẫn ghi **"chưa có số liệu"** sau khi đã lấy số liệu (chỉ đúng khi mở lại trang); chưa có lãi tồn, số KU tìm thẳng, hộ đã tất nợ; **không thấy hồ sơ scan của khách** (CCCD, 01/TD đã lưu); không quét QR CCCD |
| 🗺 Địa bàn | PGD → Xã → Điểm → Hội → Tổ → Khách, số dư nợ / QH / khoanh | trùng vai trò với Tra cứu (cùng đi tới thẻ khách) |
| 🏢 Giao dịch | bản mini máy tính (04/TD, 12/GDX, Giấy lĩnh) trong khung | khung nhúng nhỏ, khó dùng trên điện thoại |
| 📄 Văn bản | danh sách khối đồng bộ, lọc số hiệu / trích yếu / loại, mở file (tab ngoài), gửi file vào khay chờ | xem file mở **ra ngoài app**; không ghim / lưu xem không mạng; không lọc năm / loại |
| 📷 Scan | chụp nhiều ảnh → PDF A4 (ảnh thu 1600 px) → Lưu vào app (khay chờ) / máy / Gửi; danh sách scan Drive | **chưa có** cắt mép, làm phẳng, lọc (Xám / Trắng / Photo rõ), CCCD 2 mặt 1 tờ, đặt tên chuẩn theo mã KH, lưu thẳng thư mục khách — các phần này bản máy tính đã có (js/12, 44, 49, 52) |

## 2. Hướng (đề xuất)
**Thanh dưới 4 nút:** **🔎 Khách · 📄 Văn bản · 📷 Scan · ⚙**. Địa bàn thành **bộ lọc trong 🔎 Khách** (nút 📍 chọn Xã › Điểm › Hội › Tổ). Giao dịch xã mini: **anh chọn** giữ trong ⚙ › "Công cụ" hay bỏ (câu hỏi 1).

**Nguyên tắc**
- Điện thoại **chỉ xem + chụp**, không sửa số liệu; số liệu vẫn từ gói xem máy tính đẩy (khớp số máy tính).
- **Dùng chung lõi, không chép mã**: tên chuẩn (`js/49`), lọc ảnh (`js/52`), đọc QR CCCD (`js/44`) → tách phần tính toán thành lõi không phụ thuộc giao diện máy tính, cả 2 bản cùng gọi (QUY_CHUAN mục 1–2).
- Giữ bảo mật hiện có (PIN, AES, tự khóa); thêm quyền **ghi** Drive chỉ khi anh chọn lưu scan thẳng (câu hỏi 3).

## 3. Chi tiết 3 trụ
### 🔎 Khách
1. 1 ô tìm: tên không dấu · CCCD · mã KH · SĐT · **số KU** · ấp; **📷 quét QR CCCD** → mở thẳng khách (khách mới: hiện thông tin trên thẻ, báo "chưa có trong Mẫu 31").
2. Thẻ khách: nhân thân (gọi / Zalo 1 chạm) · tổ + tổ trưởng (gọi) · món vay: dư nợ, hạn, **lãi tồn**, QH, khoanh, 30 ngày đến hạn tô cam · **🗂 Hồ sơ đã lưu** (CCCD, 01/TD, UQ… trên Drive theo mã KH) mở xem ngay.
3. Lọc 📍 địa bàn (thay tab Địa bàn): chọn tới tổ → danh sách khách của tổ + số tổng (dư nợ, QH, khoanh).
4. "Vừa xem" 10 khách gần nhất (cất mã hóa).

### 📄 Văn bản
1. Tìm số hiệu / trích yếu + chip **loại** và **năm**; xếp mới nhất.
2. **Xem PDF ngay trong app** (pdf.js đã có trong danh mục thư viện) — vuốt trang, phóng to; nút Gửi (Zalo) / Lưu máy.
3. **📌 Ghim** văn bản hay dùng + **lưu xem không mạng** (cất mã hóa, giới hạn dung lượng anh chọn).

### 📷 Scan
1. Chụp nhiều trang có **khung căn mép** → tự cắt + làm phẳng → chọn lọc (Màu · Xám · Trắng · Photo rõ — lõi `js/52`).
2. Kiểu nhanh: **🪪 CCCD 2 mặt 1 tờ** (như máy tính 3.307) · **📄 Hồ sơ nhiều trang** · **🖼 Ảnh**.
3. Gắn khách: chọn từ 🔎 Khách hoặc **quét QR CCCD** → tên file chuẩn theo sổ quy tắc (`js/49`: mã KH + tên + loại giấy).
4. Lưu: **thẳng thư mục khách trên Drive** (cần quyền ghi) hoặc **khay chờ** như hiện nay → máy tính nhận (câu hỏi 3); Gửi Zalo; lưu máy.

## 4. Dữ liệu cần thêm (máy tính đẩy — phần TK 2 / KHO)
| Thêm vào gói xem | Nguồn | Ghi chú |
|---|---|---|
| lãi tồn từng món, số KU tìm được, 30 ngày đến hạn | Mẫu 31 qua `KHO` | nhẹ |
| danh sách hồ sơ đã lưu theo mã KH (tên, loại, id Drive) | khối Scan + Hồ sơ vay (`js/32`, `js/46`) | chỉ danh mục, file tải khi bấm |
| văn bản: loại, năm (đã có trong khối) | khối Văn bản | |

## 5. Các bước (mỗi bước 1 bản, anh thử máy thật rồi làm bước sau)
| Bước | Việc | Cần trước |
|---|---|---|
| Đ0 | Sửa nhỏ ngay khi nhận lại: dòng kỳ "chưa có số liệu" không cập nhật; thanh dưới 4 nút; Địa bàn vào lọc 📍 | TK 2 bàn giao khung |
| Đ1 | 🔎 Khách: tìm số KU, lãi tồn, gọi / Zalo, Vừa xem; gói xem thêm trường | cửa `KHO` cho gói xem |
| Đ2 | 📄 Văn bản: xem PDF trong app, chip loại / năm, ghim + không mạng | — |
| Đ3 | 📷 Scan: tách lõi lọc ảnh + cắt mép dùng chung; CCCD 2 mặt; tên chuẩn theo khách | lõi `js/49`, `js/52` tách được |
| Đ4 | Quét QR CCCD (Khách + Scan); 🗂 Hồ sơ đã lưu của khách; lưu thẳng Drive (nếu anh chọn) | danh mục hồ sơ theo mã KH |
| Đ5 | Hồi quy điện thoại (t193–t195 + phép mới), bàn giao | |

## 6. Câu hỏi chờ anh
1. **Giao dịch xã mini** trên điện thoại: giữ (vào ⚙ › Công cụ) hay **bỏ** để chỉ còn 3 trụ?
2. **Địa bàn** gộp thành bộ lọc 📍 trong 🔎 Khách — đồng ý?
3. Scan trên điện thoại: **lưu thẳng thư mục khách trên Drive** (cần cho điện thoại quyền ghi Drive) hay giữ **khay chờ** (máy tính nhận rồi xếp)?
4. Anh dùng **iPhone hay Android** là chính? (iPhone không nhận file chia sẻ thẳng từ Zalo; camera / QR khác nhau đôi chút)
5. Lưu văn bản xem không mạng: giới hạn bao nhiêu (đề nghị 200 MB)?

## 7. Anh chốt 24/10
> "trên điện thoại khi cần cũng có nút chuyển sang bản web; em có thể bỏ PIN mã hóa trong lúc này, sau này cần sẽ mở lại; bản điện thoại em tối ưu cho iOS; ảnh scan trên điện thoại lưu vào khay chờ, VB cũng vậy, theo em đề nghị".

| # | Chốt | Cách làm |
|---|---|---|
| 1 | **Nút chuyển sang bản web (máy tính)** luôn có | nút **🖥** trên thanh tiêu đề mọi trang (hiện chỉ có trong ⚙ Cài đặt); bản web có nút **📱** quay lại (đã có cờ `tuhoso_ban`) |
| 2 | **Tạm bỏ PIN** | 1 cờ `DT_PIN = false` trong `js/dt/dt-nen.js`: mở app **không hỏi PIN**, không tự khóa; số liệu trong máy **vẫn mã hóa bằng khóa tự sinh cất trong máy** (để bật lại PIN chỉ cần đổi cờ, không phải viết lại). Lưu ý: ai cầm điện thoại đang mở khóa là xem được số liệu khách → dựa vào khóa màn hình / Face ID của iPhone |
| 3 | **Tối ưu iOS** | Safari "Thêm vào màn hình chính" (chạy toàn màn); vùng an toàn tai thỏ / thanh home; chụp ảnh bằng ô chọn ảnh (`capture`) của iOS; xem PDF trong app (iOS mở tab ngoài kém); Gửi qua bảng chia sẻ iOS (Zalo); quét QR CCCD bằng camera trong trang (jsQR — iOS không có BarcodeDetector); phép thử chạy giả lập iPhone (WebKit) |
| 4 | **Scan → khay chờ**, **Văn bản gửi từ điện thoại → khay chờ** | giữ cách 3.232 (`_Chờ xử lý`), máy tính nhận rồi xếp; **không** xin quyền ghi thư mục khách |
| 5 | Theo đề nghị của em | **Địa bàn** gộp thành lọc 📍 trong 🔎 Khách · **Giao dịch xã mini** giữ, chuyển vào ⚙ › Công cụ (đã có sẵn, không tốn thêm) · văn bản xem không mạng giới hạn **200 MB** |

**Các bước sau khi chốt** (thay mục 5): Đ0 = sửa dòng kỳ + thanh dưới 4 nút + nút 🖥 + cờ tắt PIN + lọc 📍 · Đ1 Khách · Đ2 Văn bản (xem trong app, ghim, không mạng 200 MB) · Đ3 Scan (lõi lọc ảnh / cắt mép dùng chung, CCCD 2 mặt, tên chuẩn, → khay chờ) · Đ4 quét QR CCCD + 🗂 Hồ sơ đã lưu của khách · Đ5 hồi quy (t193–t195 + phép mới chạy WebKit) và bàn giao.

## 8. Tiến độ
| Bước | Bản | Đã làm |
|---|---|---|
| Đ0 | 3.342 | tạm bỏ PIN (cờ `tuhoso_dt_pin`), thanh dưới 4 nút, 🖥 mọi trang + 📱 ở bản web, 📍 Địa bàn trong Khách, Giao dịch xã trong ⚙ › Công cụ, sửa dòng kỳ + nút ⟳ thanh tiêu đề iOS; t262 |
| Đ1 | 3.343 | **Khách theo Tra cứu KH của TK 2**: 8 chip Tìm theo (cả Khế ước, Tổ trưởng), danh sách + tình trạng chữ nhỏ, Vừa xem, thẻ khách 5 ô (lãi tồn) + đến hạn tô màu / GH, gọi · Zalo, chép mã; thẻ tổ; gói xem + 3 trường; t263. Chưa: quét QR CCCD (Đ4) |
| Đ2 | 3.352 | **Văn bản**: xem PDF trong app (pdf.js, vừa ngang màn, không mở tab ngoài), chip Tất cả · 📌 Đã ghim · năm · loại (nhớ), 📌 Ghim cất mã hóa xem không mạng ≤ 200 MB, danh sách Văn bản / Scan cất máy (mở lại không cần ⟳); scan cũng xem trong app; t264. Kế tiếp: Đ3 Scan |
| Đ2b | 3.354 | **Anh 24/10: Hôm nay trước, giao diện như máy tính bỏ chức năng phức tạp.** Tab 📅 Hôm nay (lịch âm lịch, việc lặp / lưu ý, ghi chú dòng, sắp tới 7 ngày, đồng bộ 2 chiều lich.json với máy tính); giao diện bảng màu máy tính + biểu tượng SVG + thanh 5 nút; Khách có Tổng quan + nút Tải số liệu; bỏ tự đăng nhập lúc mở (iPhone chặn → "chưa có số liệu"); t265. Kế tiếp: Văn bản + Scan theo giao diện mới (Đ3) |

**25/10 — anh chốt: "bản chính như máy tính, điện thoại là bản phụ cho gọn".** dt.html thành bản phụ gọn (không mạng: tra khách, văn bản ghim, scan → khay chờ, Hôm nay dùng chung lịch); các bước Đ3–Đ5 cũ dừng, thay bằng G1–G3 ở `PHOI_HOP_TK2_TK3.md` mục 6.
- **3.371 · G3** — Văn bản + Scan của bản chính trên điện thoại: `css/dt-may-vbsc.css` (cắm rút), t267.
