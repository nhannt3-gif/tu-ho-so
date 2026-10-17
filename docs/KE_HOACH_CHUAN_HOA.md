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
