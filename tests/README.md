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
| `node tests/t100.js` (lỗi sẵn từ 3.90.1 — chờ phần tóm tắt cũ; không thuộc bộ hồi quy) | 3.86 Mẫu 31: nhận đúng loại, gộp khế ước trùng, món tất toán, khách chỉ gửi TK, công thức dư nợ 2 tháng, tab con Tra cứu KH (SĐT, khế ước), ô tìm chung ở tab Số liệu. |
| `node tests/t101.js [index.html bản 3.86]` | 3.87: Mẫu 10 theo ngày (dòng lặp do nhiều sổ 105 giữ riêng, 105 lấy 1 lần mỗi khách), Mẫu 7 + ngày xuất, đối chiếu tạm bằng Mẫu 10 cuối tháng, đổi ngày, nạp từng file theo ngày. Có tham số (bản cũ, vd `git show <commit 3.86>:index.html > /tmp/cu.html`) thì thử thêm **chuyển dữ liệu 3.86 → 3.87** qua Drive giả và máy thứ 2. |
| `node tests/t102.js` | 3.88: tab Số liệu theo tháng (file của tháng, ② Kiểm tra lưu kết quả, dữ liệu đổi → kiểm lại, thu gọn bảng nhiều tháng) · tab con 👥 Tổ TK&VV (phím chung ở cây chọn tổ, chip, gõ tên, 3 báo cáo Xem / In / Excel) — bộ `gia31`, máy tính + điện thoại. |
| `node tests/t103.js` | 3.88.1: máy thứ 2 chưa tải bảng (Drive hết phiên) → cây tổ từ danh bạ + cảnh báo + Nối Drive / Thử lại. |
| `node tests/t104.js` | 3.89: bộ chọn phạm vi chung · Tra cứu KH kiểm trùng CCCD / CMND HSSV, tìm tên khách / vợ-chồng / HSSV, phạm vi · tab con 📑 Sao kê 8 báo cáo (theo xã chia tổ, theo tổ) — bộ `gia31`. |
| `node tests/t105.js` | 3.90: 7 file chuẩn TW giả (dựng từ Mẫu 31 giả) — đọc, kỳ tháng / ngày, kiểm tra chéo (khớp + làm lệch 1 xã), loại đã bỏ (Mẫu 7, Sao kê KH, KHĐ 08/KTNB, KHĐ rỗng), thay file 1 ô, tab con 📊 Tổng hợp 9 báo cáo + phạm vi, chuẩn in, thẻ tổ LEN_31, xóa cả bộ tháng, làm mới toàn bộ; 3.90.1: bảng đối chiếu chéo (ô đỏ → chi tiết), kiểm tháng trống, tải file gốc, tìm / xóa file rác; 3.92: tổ viên + nút lọc, bảng các tổ, hạn CCCD, vay trực tiếp vào cây, sao kê 2 khổ (dọc bỏ Số KU), tổng hợp tiêu đề 2 tầng; 3.91.1: tháng trống không hiện kết quả kiểm cũ, danh sách hộ vay bỏ KU đã tất toán, giữ dòng khách; 3.91: ma trận nhóm sổ / gọn + chip, chọn tháng chữ Việt, 4 bước kiểm tra, chốt (chặn khi chưa Đạt / chưa tích; chặn nạp / xóa) + mở khóa, nợ đến hạn 3 khung + nút chọn nhanh, viết tắt CT + chú thích, sao kê nợ đến hạn kỳ con (NOXH + trực tiếp, in ngang, ước tính ≈, nạp file phân kỳ giả → kỳ tới theo file), bản scan chỉ có PDF trên Drive đổi tên → chỉ đổi tên / dời — bộ `gia31`. |
| `node tests/t106.js` | 3.93 / 3.93.1: tab con 🛡 KTGS Hội — 3.93.1: Mẫu 06 sau giải ngân (2 tháng, chọn xã → mỗi tổ mỗi tháng 1 phiếu, chọn tổ → bỏ tích món, xem trước, Word nhiều phiếu ngắt trang / id hình không trùng, In nhiều phiếu), dòng trống bù, bảng ngành ẩn < 10 món; 3.93: — BC0437 / BC0438 giả dựng từ Mẫu 31 giả (xếp loại theo công thức khi cột = 0, dòng lặp, 3 phần BC0438, chọn sai loại), nạp qua luồng xem trước chung, ma trận KTGS, 🔍 kiểm tra (khớp ① ② và từng tổ, đổi file → kiểm lại, không làm kiểm tra tháng chính cũ), cột mục đích ngành rút gọn, không lên ma trận Nạp, bảng tổ, gợi ý hộ 3 kiểu (bỏ QH / khoanh, HSSV, giải ngân < 30 ngày), mã khoản vay 2-4 / 6, Word Mẫu 06 + 16 (XML hợp lệ, hết dấu `{{`, trống giữ dòng chấm, lặp tiêu đề, giữ liền chữ ký, không trang mẫu tham khảo), In / PDF, lịch sử kiểm tra — bộ `gia31`. |
| `node tests/t107.js` | 3.94: Tra cứu KH gọn — danh sách 2 dòng, thẻ chia nhóm (5 ô số, nhân thân, liên hệ, tiết kiệm, món vay + mục đích, dòng 🎓 HSSV), bấm giá trị để chép, không còn Hồ sơ hộ, hạn CCCD (hết / sắp / còn), địa chỉ gọn, kiểm trùng CCCD người vay / CCCD HSSV / tên vợ-chồng (người thừa kế, gõ không dấu) / không trùng, chi tiết ở cột phải, gõ CCCD ở ô tìm tự kiểm trùng, điện thoại 50 dòng + Xem thêm — bộ `gia31`. |
| `node tests/t108.js [thư mục]` | 3.95: KTGS › 📋 Mẫu 04/BC-TH — xuất Biên bản 16 / Mẫu 06 ghi nhật ký tổ, tổ có phiếu trong tháng tích sẵn (không lấy tháng khác), ngày + phiếu 06 + Biên bản 16, cảnh báo thiếu Biên bản 16, mỗi Hội – xã 1 báo cáo, phạm vi cây (lọc + thêm tổ chưa có phiếu, giữ tổ đã tích), sửa ngày, ⚙ Khai báo Hội (lọc xã, lưu gọn), Word (XML hợp lệ, bỏ MẪU THAM KHẢO, ngắt trang, đơn vị + đoàn, số dòng chấm đúng, lặp tiêu đề, VI.1 số phiếu, giữ liền chữ ký), In / PDF, Hội chưa khai báo giữ dòng chấm — bộ `gia31`; có tham số thì lưu `t108_m04.docx` để mở bằng LibreOffice. |
| `node tests/t109.js [thư mục]` | 3.96: KTGS › 🗓 Kế hoạch năm 01/KH — chip hội của xã, 100% tổ gom ấp, mặc định 02 → 10 chia đều theo ấp, đổi cả ấp / từng tổ (lưu), bỏ tháng → nhắc chưa đủ 100%, đổi khoảng tháng, năm khác lịch riêng, giá trị điền (in hoa, /HĐUT, Gò Dầu, bảng lịch không số hộ), Word (XML hợp lệ, căn cứ 727, không 10566 / 75% / MẪU THAM KHẢO, đoàn đủ 3 dòng, lặp tiêu đề, xuống dòng trong ô, A4, chân trang, không đầu trang, không chữ đỏ), khuôn Mẫu 04 vẫn đủ phần, In / PDF — bộ `gia31`; có tham số thì lưu `t109_kh.docx`. |
| `node tests/t110.js [thư mục]` | 3.97: kỳ số liệu mặc định cuối tháng (theo ngày chỉ trong phiên), ô chọn chia nhóm; BC0437 / BC0438 không theo khóa tháng; ↺ Gợi ý lại ra lượt khác, giữ hộ bắt buộc; khai báo theo thứ tự mẫu (06, 16, Khai báo Hội, định kỳ); 🗓 định kỳ: tháng kiểm tra = tháng sau số liệu, tổ theo lịch 01/KH, món các năm trước, 100% / < 90% đỏ, QH-khoanh tích tay, Word 06 + 16 (…../09/2026, ngày trống, số liệu đến 31/08), nhật ký → Mẫu 04; Kế hoạch khuôn ② (hợp lệ, không tên riêng, TM. BAN THƯỜNG VỤ, footer), không viền bảng đầu trang / ký, cột Quốc hiệu — bộ `gia31`; có tham số thì lưu `t110_*.docx`. |
| `node tests/t111.js [thư mục]` | 3.99: HSSV gợi ý tiền vay theo nửa năm, ô tiền tự điền / gõ đè, 5 khối (3 lớn + 2 phụ) · 3.98: KTGS chỉ in (không lịch sử / nhật ký / đã lập) · địa danh chuẩn (ấp / khu phố, viết thường, tỉnh Tây Ninh) · danh sách hộ chung (mã KH, số KU, lãi tồn, 105, ghi chú, theo mã KH) · Mẫu 06 Word (bỏ dòng chấm Đơn vị, Chức vụ tab, địa bàn + Tổ, cột Mục đích 2099, dòng 1,5 cm, vMerge theo hộ, PNKT52) + bản In (rowspan) · xem trước tách tờ · Mẫu 16 (địa danh đúng chữ, tên Hội, tab, gợi ý nhận xét / để trống) · Đơn vị kiểm tra tự điền (Mẫu 06 / 16, tên gọn, "-") · 📖 Bảng chuẩn hóa + Kế hoạch ① ② Đoàn ở phường · điểm GD suy · khai báo trong tab + bảng cán bộ theo Hội – xã · Văn bản: CT vay không bắt buộc, sắp xếp Vừa thêm — bộ `gia31`; có tham số thì lưu `t111_*.docx`. `t106` / `t108` / `t110` đã cập nhật theo quy tắc 3.98. |
| `node tests/t99.js` | Chuyển tiếp tab Tháng: bỏ 7 dòng thuần Excel, ô XLS không tính thiếu, ô "đọc file cũ". |

Tiện ích: `tv.js` (định tuyến cdnjs → `tests/lib`), `fakedrive.js` (Drive giả đủ lệnh app dùng: tìm, tạo thư mục, multipart upload, PATCH, alt=media, thùng rác).

Mẫu một phép thử mới: chép `t96.js`, đổi phần `p.evaluate(...)`; luôn in `lỗi` (pageerror) cuối cùng — phải là `[]`.
