# Rà soát tổng thể app — 23/10/2026 (bản 3.325) — CHỜ ANH DUYỆT, CHƯA SỬA CODE

> Anh 23/10: "kiểm tra tổng thể app có đi đúng hướng không, cần tinh chỉnh cấu trúc, bố cục không, đề xuất giao diện theo xu hướng mới; sửa khi 2 tài khoản kia chốt bàn giao".
> Cách rà: đo mã (`BAN_DO_MA.md`, grep), đối chiếu `QUY_CHUAN_KIEN_TRUC.md` / `KIEN_TRUC_3_LOP.md`, chụp 17 tab trên máy tính 1440 px và điện thoại 390 px bằng dữ liệu giả `tests/gianho31`.

## 1. Kết luận ngắn
**Đúng hướng về nghiệp vụ và khung giao diện** (khung chung: thanh bên · ô tìm · kỳ số liệu · khối LỌC ĐỊA BÀN · nhập trái / xem trước phải; mẫu in dựng trên nền ô; tối / sáng; bản điện thoại dùng được). **Lệch hướng về cấu trúc mã**: chức năng mới tăng nhanh hơn việc dọn nền (đúng điều `QUY_CHUAN` mục 8 đã cảnh báo "làm nhiều chức năng mới trên nền chưa có kho chung").

## 2. Số đo (thật, đo trên mã 3.325)
| Chỉ số | 14/10 | 23/10 | Mục tiêu |
|---|---|---|---|
| File js · dòng · hàm cấp ngoài · biến toàn cục | — | **67 · 35,3 nghìn · 3.327 · 538** | biến toàn cục giảm dần |
| File lớn nhất | — | `04-giao-dien.js` 5.416 dòng (398 KB) · `25-ho-so.js` 1.974 dòng (325 KB) · `06-hop-thoai.js` 3.117 dòng | < 1.500 dòng / file |
| Lời gọi `luu()` | 295 | **395** (đã có lưu theo ngăn IndexedDB `34-luu-ngan.js`, nhưng nơi gọi vẫn "lưu tất cả") | gọi theo ngăn |
| Đọc thẳng biến số liệu thay vì `KHO` | Hồ sơ 57, GDX 60 | Hồ sơ: `KHO.` 58 / `TO_K` 8 · GDX: `KHO.` 36 / `TO_K` 5 ✅ · **Scan 0 `KHO`**, **KTGS 0 `KHO`** | 0 |
| CSS | — | 1 file 3.805 dòng (324 KB), **13 biến màu**, **115 bộ chọn lặp lại**, 245 chỗ `style=` viết thẳng trong js | bộ biến (màu, cỡ, khoảng cách), không lặp |
| Thanh bên | — | **17 mục** (Số liệu 7 · Hồ sơ 6 · Tài liệu 4) + 3 công cụ | ≤ 8 mục cấp 1 |
| "Việc cần xử lý" ở Hôm nay (QUY_CHUAN 8 #8) | chưa | **chưa** | có |

## 3. Bố cục — điều thấy trên ảnh chụp
1. **Phần đầu mỗi tab cao**: thanh trên + dải chip mẫu + khối LỌC ĐỊA BÀN 2 dòng (Xã / Hội) → nội dung bắt đầu khoảng 1/4 màn hình (Hồ sơ vay, Hồ sơ Tổ, KTGS). Trên điện thoại, khối lọc chiếm gần nửa màn hình đầu.
2. **Hôm nay** chỉ là lịch + ghi chú + to-do; các con số cần làm đã có sẵn ở chỗ khác (ví dụ tab Tổ: CCCD hết hạn 26, có nợ cần xử lý 7; Nạp & KT ⚠ 8 file thiếu) nhưng không gom về đây.
3. **Thanh bên 17 mục**, nhiều mục là "cách nhìn" của cùng một kho (Tổng hợp / Sao kê / Tổ / Tra cứu) → khó nhớ, điện thoại phải cuộn ngang 2 tầng tab.
4. **Tiêu đề / dòng mô tả dài, viết hoa** (vd "SỔ HỘ VAY SỐ HỘ VAY — HỘ MỚI / LẤY TỪ MẪU 31, LỌC ĐỊA BÀN · NGÀY NHẬP…") và **chip chú thích màu** lặp ở mọi mẫu → chiếm chỗ, ít giá trị khi đã quen.
5. **Nút / biểu tượng chưa đồng nhất**: emoji khác nhau cho cùng việc, cỡ nút nhiều kiểu; một số nút xám (Excel, Word) hiện cả khi không dùng được.
6. Tốt: khung xem phải + bộ nút In / PDF / Word / Gửi đã thống nhất; bảng tab Tổ gọn, đọc tốt; chế độ tối ổn.

## 4. Đề xuất (xếp theo lợi ích / công sức) — chờ anh chọn
**A. Giao diện (xu hướng mới, vẫn ES5, không thêm thư viện)**
1. **Hôm nay = bảng việc** (thẻ số lớn bấm vào là tới chỗ xử lý): CCCD hết / sắp hết hạn · chưa TK 105 · nợ cần xử lý · đến hạn tháng sau · file nạp thiếu · hồ sơ vay đang dở · lịch hôm nay. Đây là việc #8 QUY_CHUAN đã chốt — làm sớm vì dùng hằng ngày.
2. **Khối lọc 1 dòng gọn mặc định** (đường dẫn 🏠 PGD › Xã › Điểm › Tổ + nút ▾ mở rộng — đã có ở 3.206, nay đặt **mặc định gọn mọi tab**, nhất là điện thoại); phần đầu tab còn 1 dòng chip mẫu + 1 dòng lọc.
3. **Thanh bên 2 cấp, ≤ 7 mục**: 🏠 Hôm nay · 📥 Nạp & KT · 📊 Số liệu (Tổng hợp, Sao kê, Tổ, Tra cứu, Phân bổ) · 🛡 KTGS · 📄 Hồ sơ (Hộ vay, Hồ sơ vay, Hồ sơ Tổ, Giao dịch xã) · 🗂 Tủ tài liệu (Văn bản, Biểu mẫu, Scan, Thư viện) · ⚙. Mục con mở trong tab con ngang (đã có). Điện thoại: thanh dưới 5 nút cố định.
4. **Bảng lệnh nhanh Ctrl+K** (gõ "01/TD", "tổ Gia Lộc", "Nguyễn…" → nhảy thẳng; ô tìm hiện có nâng lên).
5. **Bộ chuẩn nhìn**: 1 bộ biến màu / cỡ chữ / khoảng cách / bo góc; 1 bộ biểu tượng cho 1 việc; chế độ **Gọn / Thoáng**; nút chính 1 màu, nút phụ viền; bỏ dòng mô tả viết hoa (đưa vào ❓), chip chú thích màu gộp vào 1 nút "ⓘ".
6. Điện thoại: khung xem trước mở bằng nút "Xem trước" (đã có) → mặc định **ẩn form dài, hiện từng bước** (Hộ → Chương trình → Phương án → In).

**B. Cấu trúc mã (làm nền, không đổi chức năng — mỗi bước kiểm theo chức năng)**
1. Tách `04-giao-dien.js` (5,4 nghìn dòng) và `25-ho-so.js` theo khối (như đã làm với `js/22*`); `06-hop-thoai.js` tách phần "Có gì mới / Hướng dẫn" ra file dữ liệu.
2. Nơi gọi `luu()` → gọi theo ngăn (`luuNgan('hoMoi')`…) — giảm ghi thừa, giảm rủi ro mất dữ liệu khi 2 máy.
3. Scan, KTGS đọc số liệu qua `KHO` (KTGS là gói khóa: chỉ đổi phần lấy dữ liệu, không đụng mẫu).
4. CSS: gom biến (mục A5), xóa 115 bộ chọn lặp, chuyển dần `style=` trong js thành lớp.

**C. Quy trình**
- **Hồi quy (anh chốt 23/10): mỗi bản chỉ chạy phép thử của chức năng mới / sửa; chỉ chạy hồi quy đầy đủ khi có thay đổi lớn (cấu trúc, lưu, khung chung) hoặc khi có lỗi.** Đã ghi vào `BAT_DAU.md` mục 2.
- Làm B trước A3–A5 (tách file xong mới đổi khung đỡ xung đột 2 tài khoản); A1–A2 làm được ngay vì ít chạm file chung.

## 5. Câu hỏi chờ anh
1. Chọn thứ tự: em đề nghị (A1 dời sau — anh chốt 23/10) **A2 lọc gọn mặc định → B1–B2 → A3 thanh bên 2 cấp → A4–A6 → B3–B4**.
2. Thanh bên 2 cấp (A3) đổi chỗ các mục quen dùng — anh đồng ý hướng này không? (cần anh duyệt vì đổi giao diện cũ)
3. Hôm nay bảng việc (A1): anh muốn thẻ nào đứng đầu?

## 6. Chi tiết đề xuất A1 — tab 🏠 Hôm nay thành "bàn làm việc" (anh hỏi thêm 23/10)
**Hiện nay (đọc mã `veHomNay`, js/04):** lịch tháng + Schedule + To-do + lối tắt (Hạn trả HSSV, Địa bàn, CT vay) + 1 dòng "⚠ Cần xử lý" chỉ gom **file chờ khai · theo dõi nợ (cam kết đến hạn, khoanh sắp hết) · ghi chú đánh dấu**. Các con số nghiệp vụ đã tính sẵn ở tab khác **chưa về đây**: chip tab Tổ (`TO_LOC` js/22g: CCCD hết / sắp hết hạn, chưa TK 105, thiếu SĐT, nợ cần xử lý QH · khoanh · KHĐ, đến hạn tháng sau, mới vào / ra khỏi tổ, cần cho ra theo 01/TV), file nạp thiếu (`dhThieuNap`), văn bản chờ duyệt, cột "Cần bổ sung" Sổ hộ vay, ngày giao dịch điểm (`ngayGD`).

**Đề xuất bố cục (máy tính):**
1. **Dòng đầu:** ngày (âm lịch) · **trạng thái số liệu** ("Mẫu 31 mới nhất 31/08 — cách hôm nay N ngày", đỏ nếu cũ quá X ngày) · lọc gọn 1 dòng (🏠 PGD / xã đang quản lý).
2. **Lưới thẻ "Việc cần xử lý"** — mỗi thẻ: **số lớn · tên · màu mức gấp** (đỏ gấp / vàng sắp / xám đã xong), bấm vào → mở đúng tab với bộ lọc đặt sẵn:
   | Thẻ | Nguồn (đã có) | Bấm vào |
   |---|---|---|
   | 🏢 Giao dịch xã hôm nay / tuần này (điểm nào, ngày nào) | `ngayGD` cây địa bàn | tab Giao dịch xã chọn sẵn điểm |
   | ⚠ Nợ cần xử lý (QH · khoanh · KHĐ) | chip `xl` tab Tổ | tab Tổ lọc chip |
   | ⏰ Đến hạn tháng sau | chip `dh` | tab Tổ / nút lập 09A gia hạn |
   | 🪪 CCCD hết hạn · sắp hết 30 ngày | chip `cccd`, `cccd30` | tab Tổ lọc chip |
   | 🏦 Chưa có TK 105 | chip `ctk` | tab Tổ / 01/TGTV in hàng loạt |
   | 👥 Cần cho ra khỏi tổ · mới vào tổ | chip `tvra`, `moi` | Hồ sơ Tổ 10C |
   | 📥 Số liệu: file bắt buộc còn thiếu | `dhThieuNap` | Nạp & KT |
   | 📄 Hồ sơ vay đang dở (Sổ hộ vay "Cần bổ sung") | Sổ hộ vay | 👪 Hộ vay lọc thiếu |
   | 📑 Văn bản chờ duyệt · file chờ khai · theo dõi nợ · ghi chú cần xử lý | như hiện nay | như hiện nay |
3. **Dưới:** 2 cột — trái lịch tháng + To-do (giữ nguyên chức năng hiện có), phải "Vừa xem gần đây" + lối tắt (Hạn trả HSSV, Địa bàn, CT vay, mẫu hay in).
4. **Điện thoại:** thẻ thành danh sách dọc (số + tên + ›), lịch thu gọn 1 tuần.

**Cách tính (không chậm app):** chỉ đếm, tính 1 lần khi mở app / nạp số liệu mới, lưu tạm theo kỳ; danh sách chi tiết chỉ dựng khi bấm vào thẻ. Lấy số qua `KHO` (đúng QUY_CHUAN) — thẻ nào chưa có cửa `KHO` thì thêm cửa đếm, không đọc thẳng biến chung.

**Anh chốt 23/10:** "Các nút dạng KPI sẽ phát triển sau khi các phần sau đi vào hoạt động ổn — hướng như vậy nhưng làm sau, **từng nút KPI một**." → A1 **duyệt hướng, chưa làm**; mỗi thẻ làm riêng khi khối nguồn đã chạy ổn (anh báo thẻ nào thì làm thẻ đó). Câu hỏi dưới để dành khi làm từng thẻ.

**Câu hỏi chờ anh (A1):**
1. Thẻ nào cần, thứ tự trên → dưới? (em đề nghị: Giao dịch xã hôm nay → Nợ cần xử lý → Đến hạn tháng sau → CCCD → Chưa TK 105 → Số liệu thiếu → Hồ sơ vay dở → còn lại)
2. Có cần **tích "đã xử lý"** từng việc (ẩn đến kỳ số liệu mới) như QUY_CHUAN mục 8 #6 không?
3. Phạm vi mặc định: **toàn PGD** hay **các xã anh quản lý**?
4. Số liệu cũ quá bao nhiêu ngày thì báo đỏ (em đề nghị 35 ngày với Mẫu 31 tháng)?
5. Lịch + Schedule + To-do giữ nguyên ở dưới — đồng ý?

## 7. Thanh bên 2 cấp — demo `demo/thanh-ben-2-cap.html` (anh góp ý 23/10)
- Anh: **"KTGS ít khi dùng → đưa vào 1 tab con"** → KTGS Hội thành mục con của 📊 Số liệu.
- Anh: **"Giao dịch xã hay dùng khi đi GDX hay duyệt hồ sơ → bố trí ra riêng; muốn đưa 1 số cái cơ bản dùng thường xuyên khi duyệt hồ sơ ra đó"** → 🏢 Giao dịch xã **mục cấp 1 ngay dưới Hôm nay**, có mục con chứa các công cụ duyệt hồ sơ (anh chọn danh sách).
- Cấp 1 (7): 🏠 Hôm nay · 🏢 Giao dịch xã ▸ · 📥 Nạp & KT · 📊 Số liệu ▸ (Tổng hợp, Sao kê, Tổ TK&VV, Tra cứu KH, KTGS Hội, Phân bổ KH) · 📄 Hồ sơ ▸ (Hồ sơ vay / Hộ vay, Hồ sơ Tổ) · 🗂 Tủ tài liệu ▸ (Văn bản, Biểu mẫu, Scan, Thư viện) · 🧰 Công cụ ▸. Điện thoại: thanh dưới Hôm nay · GD xã · Số liệu · Hồ sơ · ☰ Thêm.
- Chờ anh: danh sách "cái cơ bản khi duyệt hồ sơ" đưa vào Giao dịch xã. Làm sau khi 2 tài khoản kia chốt bàn giao (đụng khung chung `js/23-dieu-huong.js`).
