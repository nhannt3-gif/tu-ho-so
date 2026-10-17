# Kế hoạch CHUẨN HÓA code + BẢN ĐIỆN THOẠI (anh duyệt 17/10/2026)

> Anh chốt 17/10: "em code và gộp lên tuần tự, điện thoại đường dẫn như cũ và em tự chuyển"; làm nhiều chức năng rồi chạy hồi quy **1 lần** mỗi đợt; mỗi bản dọn rác + kiểm toàn vẹn.
> Thứ tự: **R1 → bản điện thoại → R2 → R3 → R4**, sau đó cuốn chiếu. Mỗi đợt giữ nguyên chức năng + bản in (chuẩn khóa t179 / t180 / t181).
> Các điểm anh chưa trả lời, em tự quyết theo đề xuất: Framework7 (giao diện điện thoại), PIN + mã hóa bắt buộc, làm chạy cả iPhone lẫn Android.

## 1. Hiện trạng (đo 17/10, bản 3.229)
| Hạng mục | Số đo |
|---|---|
| JS | 3,5 MB · 37 file + 15 mẫu · ~31.700 dòng; `22-so-lieu.js` 1,3 MB / 835 hàm (37%) |
| Tên chung toàn app | ~2.950 hàm + 440 biến |
| Hàm mồ côi | 103 |
| `onclick=` trong chuỗi HTML | 1.514 |
| Dòng > 400 ký tự | 223 |
| "Có gì mới" trong app | 103 KB (≈ 400 dòng, gửi xuống máy mỗi lần mở) |
| Chú thích | 378 KB (~11%) |
| CSS | 300 KB · 126 khối `@media` · 20 bộ chọn lặp |
| Khởi động | 52 file nạp hết từ đầu |
| Phép thử | 113 (trình duyệt thật, ~1 giờ) |

## 2. Chuẩn (không build, ES5 — giữ luật repo)
1. **Hộp riêng mỗi khối** (`var HoSo = (function(){ … return {…}; })()`), chỉ để lộ hàm cửa. Code mới theo chuẩn ngay; code cũ khi sửa tới.
2. **Bỏ `onclick` trong chuỗi** → `data-lenh="khối.lệnh"` + 1 bộ nhận lệnh mỗi khối.
3. **Tách file theo lớp / tab**, ngân sách ~150 KB / ~150 hàm mỗi file.
4. **Nạp theo tab** (Scan, KTGS, mẫu) khi mở lần đầu.
5. **Nhẹ phần gửi xuống máy:** "Có gì mới" ≤ 15 dòng gần nhất (đầy đủ ở CHANGELOG); chú thích chỉ ghi *vì sao*.
6. **Sổ đăng ký cài đặt** (`D.cauHinh` — 244 khóa): khối · mặc định · chuyển đổi → tìm rác dữ liệu.
7. **Thước đo chống lệch hướng** (`tests/kiem.py` + `tests/do_moc.json`): trượt khi vượt mốc (file quá cỡ, dòng quá dài, tên chung tăng, mồ côi tăng, tab đọc thẳng biến kho).
8. **Phép thử nhanh lớp Nghiệp vụ** chạy bằng node (vài giây).

## 4. Bố cục
Khung bố cục chuẩn mọi tab (thanh công cụ · vùng làm việc · khung xem bật / tắt); tắt khung xem: **biểu mẫu khai báo giữ rộng ~960 px**, chỉ bảng dữ liệu dùng hết bề ngang; bộ mảnh giao diện dùng chung (hàng nút, nút vừa chữ, ô nhập rộng tối đa theo loại, nhóm chip, ô "nhãn – giá trị", hộp thoại); kích thước bằng biến CSS; mốc màn hình cố định; phép thử chụp màn hình 4 cỡ (1440 · 1024 · 768 · 390) có / không khung xem.

## 5. Bộ nút xuất thống nhất
Chọn → bản xem hiện ngay → `Bỏ / Đóng` … `🖨 In` · `💾 Lưu vào app` · `⬇ Lưu vào máy ▾ (PDF · Word · Excel · file gốc)` · `📤 Gửi ▾ (gửi file · Copy ảnh · Copy chữ)`. Loại không có → nút mờ (không ẩn). Excel chỉ cho bảng chuẩn. Ctrl+P In, Ctrl+S Lưu vào app. (Trình duyệt không chép được nguyên file PDF / Word vào bộ nhớ tạm: điện thoại dùng bảng Chia sẻ; máy tính lưu rồi kéo vào Zalo.)

## 6. Điều hướng
Bộ điều hướng chung `DH`: ngăn lịch sử mọi bước (tab → tab con → mục → hộp → bước), gắn lịch sử trình duyệt (nút ◀ điện thoại, Back chuột, Alt+← / Alt+→). 4 nút nghĩa cố định: ⬅ Lùi (giữ dữ liệu) · ✕ Đóng (về màn chính tab; chưa lưu → hỏi) · Bỏ (hủy, có dữ liệu thì hỏi) · Thoát (rời quy trình nhiều bước, giữ nháp). ⬅ ➡ + đường dẫn ở đầu thanh trên; ✕ góc phải hộp; `Bỏ / Đóng` trái … `Lưu / Tiếp` phải. Hộp chồng có thứ tự. Phím: Esc / Backspace (ngoài ô nhập) lùi 1 cấp, Enter Tiếp / Lưu. Mở lại app về đúng chỗ.

## 7. Thư viện
Đang dùng: pdf.js 3.11, pdf-lib 1.17, SheetJS 0.18.5 (⚠ có lỗi bảo mật khi đọc file cố tình làm hỏng, vá từ 0.19.3 — bản vá chỉ có ở cdn.sheetjs.com, máy làm việc không tải được để thử → **chưa nâng**, chờ thử trên máy anh), Word / zip tự viết (giữ).
Tiêu chí: qua bộ nạp `js/01`, nạp khi dùng, chạy offline, cố định bản, MIT / Apache, không build, nhẹ so với lợi.
- Làm: **Framework7 Core** (điện thoại), **DOMPurify** (lọc HTML từ file), 📷 quét QR CCCD (BarcodeDetector + jsQR dự phòng).
- Cân nhắc khi cần: ExcelJS (Excel có định dạng), Chart.js / uPlot (biểu đồ), Dexie (kho IndexedDB), Preact + htm (nếu mảnh giao diện tự viết chưa đủ).
- Không: Tesseract, OpenCV, React / Vue / Angular + build.
Luật mới: thêm thư viện phải anh duyệt từng cái, đạt tiêu chí, ghi danh mục ở `QUY_CHUAN_KIEN_TRUC.md` mục 10.

## 8–9. Bản điện thoại
- **Cùng đường dẫn** `https://nhannt3-gif.github.io/tu-ho-so/`: máy điện thoại → tự chuyển giao diện điện thoại (có nút "Bản máy tính" khi cần).
- **Giao diện riêng, kiểu iOS — Framework7 Core**; chỉ dùng chung lớp Nghiệp vụ + số liệu Drive.
- **5 phần:** 🔎 Tra cứu khách (tên không dấu / CCCD / mã KH / SĐT → thẻ nhân thân + tổ, tổ trưởng + từng món vay) · 🗺 Địa bàn theo cấp (PGD → Xã → Điểm → Hội → Tổ → Khách: dư nợ, số hộ, số tổ, số món, quá hạn, khoanh) · 🏢 Giao dịch xã mẫu nhẹ (04/TD, 12/GDX, Giấy lĩnh) · 📄 Văn bản · 📷 Scan.
- **Bỏ trên điện thoại:** Nạp & KT, Số liệu chi tiết, Hồ sơ vay, Hồ sơ Tổ, KTGS, Mẫu biểu.
- **Số liệu từ Drive:** văn bản, scan, gdx đọc khối đồng bộ sẵn có; tra cứu / địa bàn đọc **gói số liệu xem** máy tính tự đẩy lên `_Hệ thống/xem/` sau mỗi lần nạp Mẫu 31 (tính sẵn → nhẹ, khớp số máy tính).
- **Bảo mật:** PIN (Web Crypto, khóa tạm khi sai nhiều lần), dữ liệu trong máy mã hóa AES-256, vân tay / Face ID nếu máy hỗ trợ, tự khóa khi để yên, DOMPurify, CSP.
- iPhone: cài qua Safari "Thêm vào màn hình chính", không nhận file chia sẻ thẳng từ Zalo. Android: đủ.

## Lộ trình
| Đợt | Việc |
|---|---|
| **R1** | Tài liệu này + luật · thước đo `kiem.py` (mốc) · "Có gì mới" ≤ 15 dòng · dọn hàm mồ côi · CSS trùng y hệt · bố cục 📒 Sổ hộ vay · kiểm kê bố cục (ảnh 4 cỡ) / bộ nút / điều hướng → `docs/KIEM_KE_GIAO_DIEN.md` |
| **Điện thoại** | Gói số liệu xem + trang điện thoại (Framework7) + PIN / mã hóa + 5 phần |
| **R2** | Khung bố cục + mảnh giao diện + bộ nút xuất + điều hướng `DH` cho Hồ sơ vay, Scan |
| **R3** | Tách `22-so-lieu.js` theo tab + cây địa bàn chung; nạp theo tab |
| **R4** | Phép thử nhanh lớp Nghiệp vụ + sổ đăng ký cài đặt |

## Trạng thái
- 17/10: **R1 xong = 3.230** (thước đo + mốc `tests/do_moc.json`, dọn 99 hàm, "Có gì mới" 15 dòng, CSS trùng, bố cục Sổ hộ vay, `docs/KIEM_KE_GIAO_DIEN.md`). Chưa làm trong R1: nâng SheetJS (không tải được để thử), DOMPurify (làm cùng bản điện thoại). Tiếp: **bản điện thoại**.
- 17/10: **Điện thoại phần 1 = 3.231** (`dt.html`, `js/dt/`, `js/38-goi-xem.js`): PIN + mã hóa, tra cứu khách, địa bàn theo cấp, gói số liệu xem trên Drive. Tiếp: phần 2 Văn bản + Scan, phần 3 Giao dịch xã mẫu nhẹ + chạy không mạng.
- 17/10: **Điện thoại phần 2 = 3.232**: Văn bản, Scan (chụp → PDF), khay chờ, bảng nút chuẩn. Tiếp: phần 3 Giao dịch xã mẫu nhẹ + chạy không mạng.
- 17/10: **Điện thoại phần 3 = 3.233**: Giao dịch xã mẫu nhẹ (bản mini 3.177 đẩy kèm, mở trong app), chạy không mạng (`dt-sw.js`). **Bản điện thoại đủ 3 phần.** Còn để sau: vân tay / Face ID, quét QR CCCD. Tiếp: **R2**.
- 17/10: **R2 = 3.234**: `js/39-gd.js` (hộp `GD`: bộ nhận lệnh `data-lenh`, mảnh `GD.nut/o/chip/kv`, điều hướng lùi / tiến, hộp con), bộ nút xuất thứ tự cố định (mờ không ẩn, Ctrl+P / Ctrl+S); chuyển trước Sổ hộ vay, form hộ, gói số liệu xem. Các chỗ còn `onclick` chuyển dần khi chạm tới (cuốn chiếu). Tiếp: **R3** (tách `22-so-lieu.js`).
- 17/10: **R3 phần 1 = 3.235**: `22-so-lieu.js` tách 10 file theo khối (KTGS `22b…22e`, Tra cứu `22f`, Tổ `22g`, Cấp hội · Sao kê `22h`, Tổng hợp `22i`, khuôn Word `js/22k-kt-khuon.js`), nguyên văn, đúng thứ tự nạp. Tiếp: **R3 phần 2** (nạp khi dùng: khuôn + khối KTGS).
- 17/10: **R3 phần 2 = 3.236**: khuôn Word KTGS `js/khuon/kt-khuon.js` nạp khi dùng (`ktKhuon`) — JS lúc mở app 3.430 → 2.950 KB. Khối code KTGS vẫn nạp lúc mở (nhiều lối gọi) → làm sau R4 khi có sổ đăng ký. Tiếp: **R4**.
- 17/10: **R4 phần 1 = 3.237**: phép thử nhanh `tests/nhanh/` (node, nạp cả app với DOM giả, 26 phép thử < 0,2 giây, `kiem.py` tự chạy) — bắt được lỗi `coChuHTML` không thoát `"` (133 chỗ trong thuộc tính), đã sửa. Tiếp: **R4 phần 2** sổ đăng ký cài đặt.

## Hồ sơ vay — hướng B (anh chốt hướng 17/10, logic chi tiết anh nói dần — CHƯA CODE)
- Hiện trạng (3.237): mọi tab mẫu (01/UQ, 01/TD, 01/GQVL, 03/TD, 07b, 01/TGTV, 09A, 01/TĐCK) có khối 👪 chọn hộ + ＋ Hộ mới + ＋ Lấy từ Mẫu 31 → trùng Sổ hộ vay; anh: "không đúng".
- Hướng B: **đi từ hộ** — 📒 Sổ hộ vay là màn làm việc chính: tích hộ → 📄 Lập hồ sơ → chọn các mẫu cần → in / lưu một lượt. Tab mẫu: in mẫu trắng + khai báo riêng mẫu (khai báo trực quan, chọn nhanh).
- Logic từng phần (ghi theo lời anh, ngày):
  - **Ý 1 (17/10):**
    1. Các tab mẫu (01/UQ, 01/TD, 01/GQVL, 03/TD, 07b, 01/TGTV, 09A, 01/TĐCK) **không ngang hàng** với tab 📒 Sổ hộ vay — chúng là **1 bộ mẫu độc lập**.
    2. Mẫu **không gắn sẵn dữ liệu**; chỉ khi **chọn hộ ở Sổ hộ vay rồi gọi tới mẫu** thì mẫu mới được điền.
    3. Cần **1 nơi riêng** để **trực quan chọn từng mẫu biểu**, tối ưu, khai báo cho thật hoàn chỉnh.
    4. Nơi đó có cả **mẫu trắng** và **gắn dữ liệu mẫu (giả) để thử**.
  - **Ý 2 (17/10):**
    1. Mẫu là phần **dùng nhiều nhất**, sau này **nhiều mẫu hơn nữa** → đặt **ở ngoài**, trong **1 tab Mẫu biểu** riêng (để như hiện tại cũng ổn, nhưng sợ nhiều mẫu sẽ rối).
    2. Mẫu có **chế độ gõ tay** khi cần — thay việc mở Word gõ thủ công (phải sửa / xóa, hay làm lệch form).
    3. Bố trí: **form bên trái, màn xem bên phải**; ô nào **chọn từ danh sách** được thì cho chọn, ô nào **tự động** được thì tự động.
    4. Các chế độ: **thủ công** (không gắn dữ liệu tự động) · **bán tự động** · (tự động khi gọi từ Sổ hộ vay).
    5. **Gõ xong lưu lại được.**
  - (chờ anh bàn tiếp — đề xuất của em ở tin nhắn 17/10, chưa chốt)

