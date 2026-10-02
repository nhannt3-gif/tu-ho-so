# Bộ phép thử — Tủ hồ sơ

Chỉ dùng **dữ liệu giả**. Repo công khai: **không bao giờ** đưa file / ảnh / tên / CCCD thật của khách vào thư mục này.
File thật anh Nhân gửi để xem cấu trúc chỉ dùng trong máy làm việc (thư mục nháp), không commit.

## Chuẩn bị (một lần)
```bash
# Playwright + Chromium cài sẵn (npm -g playwright). Thư viện CDN mà app tải → bản npm cùng phiên bản:
cd tests && mkdir -p lib && cd lib
for p in xlsx@0.18.5 pdfjs-dist@3.11.174 pdf-lib@1.17.1; do n=${p%@*}; v=${p#*@}; mkdir -p $n-$v && (cd $n-$v && npm pack $p && tar xzf *.tgz && rm *.tgz); done
cd ../..
# bộ file Excel GIẢ cho tab Số liệu (cùng cấu trúc hệ thống)
python3 tests/taogia.py 25000 tests/gia      # bộ lớn (đo tốc độ)
python3 tests/taogia.py 300 tests/gianho     # bộ nhỏ (giao diện, đồng bộ)
python3 tests/taogia.py 25000 tests/gia31 m31   # bộ có Mẫu 31 (2 tháng) thay Mẫu 10 — cho t100.js
```
`tests/lib`, `tests/gia*` (gồm `gia31`), `tests/*.png` nằm trong `.gitignore`.

## Chạy (từ thư mục gốc repo)
| Lệnh | Kiểm gì |
|---|---|
| `python3 tests/kiem.py` | Cú pháp mọi khối `<script>` · trùng tên hàm · gọi hàm chưa định nghĩa. Phải ra `Cú pháp OK · Trùng tên: không · Thiếu hàm: không` (riêng `CompressionStream, DecompressionStream, Response` là hàm có sẵn của trình duyệt — bỏ qua). Viết regex có `_(`/`_t(` thì dùng `[_]` để khỏi báo nhầm. |
| `node tests/hoiquy.js` | Hồi quy chính (28 phép, máy trắng + máy có dữ liệu cũ). Thỉnh thoảng 27/28 do chờ cố định → chạy lại. |
| `node tests/hoiquy2.js` | Hồi quy 2 (20 phép). **Mỗi bản sửa chuỗi số bản** trong file (`sed -i "s/3\.85/3.86/g" tests/hoiquy2.js`). |
| `node tests/t87.js` … `t96.js` | Phép thử riêng các bản 3.75–3.84 (scan, gộp trùng, an toàn dữ liệu 3.81, hồ sơ hộ 3.82, giao ban 3.83, phím chung 3.84). |
| `node tests/t97.js` | 3.85 tab Số liệu với bộ `tests/gia`: nạp cả bộ, ghi nhận, đối chiếu, tra KH, sai loại / lệch kỳ, tải lại trang. |
| `node tests/t97m.js` | Ảnh giao diện tab Số liệu máy tính + điện thoại (bộ `gianho`). |
| `node tests/t97w.js` | Đọc Excel ở Worker không làm treo màn hình. |
| `node tests/t98.js` | 2 máy qua Drive giả (`fakedrive.js`): đẩy / kéo / thay file / xóa ô. |
| `node tests/t100.js` | 3.86 Mẫu 31: nhận đúng loại, gộp khế ước trùng, món tất toán, khách chỉ gửi TK, công thức dư nợ 2 tháng, tab con Tra cứu KH (SĐT, khế ước), ô tìm chung ở tab Số liệu. |
| `node tests/t101.js [index.html bản 3.86]` | 3.87: Mẫu 10 theo ngày (dòng lặp do nhiều sổ 105 giữ riêng, 105 lấy 1 lần mỗi khách), Mẫu 7 + ngày xuất, đối chiếu tạm bằng Mẫu 10 cuối tháng, đổi ngày, nạp từng file theo ngày. Có tham số (bản cũ, vd `git show <commit 3.86>:index.html > /tmp/cu.html`) thì thử thêm **chuyển dữ liệu 3.86 → 3.87** qua Drive giả và máy thứ 2. |
| `node tests/t102.js` | 3.88: tab Số liệu theo tháng (file của tháng, ② Kiểm tra lưu kết quả, dữ liệu đổi → kiểm lại, thu gọn bảng nhiều tháng) · tab con 👥 Tổ TK&VV (phím chung ở cây chọn tổ, chip, gõ tên, 3 báo cáo Xem / In / Excel) — bộ `gia31`, máy tính + điện thoại. |
| `node tests/t103.js` | 3.88.1: máy thứ 2 chưa tải bảng (Drive hết phiên) → cây tổ từ danh bạ + cảnh báo + Nối Drive / Thử lại. |
| `node tests/t104.js` | 3.89: bộ chọn phạm vi chung · Tra cứu KH kiểm trùng CCCD / CMND HSSV, tìm tên khách / vợ-chồng / HSSV, phạm vi · tab con 📑 Sao kê 8 báo cáo (theo xã chia tổ, theo tổ) — bộ `gia31`. |
| `node tests/t105.js` | 3.90: 7 file chuẩn TW giả (dựng từ Mẫu 31 giả) — đọc, kỳ tháng / ngày, kiểm tra chéo (khớp + làm lệch 1 xã), loại đã bỏ (Mẫu 7, Sao kê KH, KHĐ 08/KTNB, KHĐ rỗng), thay file 1 ô, tab con 📊 Tổng hợp 9 báo cáo + phạm vi, chuẩn in, thẻ tổ LEN_31, xóa cả bộ tháng, làm mới toàn bộ; 3.90.1: bảng đối chiếu chéo (ô đỏ → chi tiết), kiểm tháng trống, tải file gốc, tìm / xóa file rác; 3.91.1: tháng trống không hiện kết quả kiểm cũ; 3.91: ma trận nhóm sổ / gọn + chip, chọn tháng chữ Việt, 4 bước kiểm tra, chốt (chặn khi chưa Đạt / chưa tích; chặn nạp / xóa) + mở khóa, nợ đến hạn 3 khung + nút chọn nhanh, viết tắt CT + chú thích, sao kê nợ đến hạn kỳ con (NOXH + trực tiếp, in ngang, ước tính ≈, nạp file phân kỳ giả → kỳ tới theo file), bản scan chỉ có PDF trên Drive đổi tên → chỉ đổi tên / dời — bộ `gia31`. |
| `node tests/t99.js` | Chuyển tiếp tab Tháng: bỏ 7 dòng thuần Excel, ô XLS không tính thiếu, ô "đọc file cũ". |

Tiện ích: `tv.js` (định tuyến cdnjs → `tests/lib`), `fakedrive.js` (Drive giả đủ lệnh app dùng: tìm, tạo thư mục, multipart upload, PATCH, alt=media, thùng rác).

Mẫu một phép thử mới: chép `t96.js`, đổi phần `p.evaluate(...)`; luôn in `lỗi` (pageerror) cuối cùng — phải là `[]`.
