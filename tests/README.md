# Bộ phép thử — Tủ hồ sơ

Chỉ dùng **dữ liệu giả**. Repo công khai: **không bao giờ** đưa file / ảnh / tên / CCCD thật của khách vào thư mục này.
File thật anh Nhân gửi để xem cấu trúc chỉ dùng trong máy làm việc (thư mục nháp), không commit.

## Chuẩn bị (một lần)
```bash
# Playwright + Chromium cài sẵn (npm -g playwright). Thư viện CDN mà app tải → bản npm cùng phiên bản:
cd tests && mkdir -p lib && cd lib
for p in xlsx@0.18.5 pdfjs-dist@3.11.174 pdf-lib@1.17.1 framework7@8.3.4 dompurify@3.2.6 jsqr@1.4.0 heic-to@1.6.5 qrcode-generator@1.4.4 tesseract.js@5.1.1 tesseract.js-core@5.1.0; do n=${p%@*}; v=${p#*@}; mkdir -p $n-$v && (cd $n-$v && npm pack $p && tar xzf *.tgz && rm *.tgz); done
mkdir -p tesseract.js-data-eng-1.0.0 && (cd tesseract.js-data-eng-1.0.0 && npm pack @tesseract.js-data/eng@1.0.0 && tar xzf *.tgz && rm *.tgz)   # 3.269: chữ tiếng Anh cho Tesseract (đọc mã máy đọc CCCD)
cd ../..
# bộ file Excel GIẢ cho tab Số liệu (cùng cấu trúc hệ thống)
python3 tests/taogia.py 25000 tests/gia      # bộ lớn (đo tốc độ)
python3 tests/taogia.py 300 tests/gianho     # bộ nhỏ (giao diện, đồng bộ) — có Mẫu 10 (đã bỏ từ 3.120)
python3 tests/taogia.py 300 tests/gianho31 m31   # bộ nhỏ có Mẫu 31 — cho t103.js (3.120)
python3 tests/taogia.py 25000 tests/gia31 m31   # bộ có Mẫu 31 (2 tháng) thay Mẫu 10 — cho t100.js
```
`tests/lib`, `tests/gia*` (gồm `gia31`), `tests/*.png` nằm trong `.gitignore`.

## Hồi quy theo đổi — chức năng đã chốt không chạy lại (3.384, anh 26/10)
- `bash tools/hoiquy.sh <tên> <tmp> doi 2` — **mặc định mỗi bản**: chỉ chạy phép thử **chưa chốt** hoặc có **file phụ thuộc đã đổi** (`tools/hoiquy_pt.py` dò: phần chung + file JS định nghĩa hàm phép thử gọi + `css/app.css` nếu đo bố cục + tệp phụ / bộ sinh dữ liệu giả). Đổi 1 file **phần chung** (khung, KHO, bộ lọc, hộp thoại, lưu…) → chạy lại hết.
- `bash tools/hoiquy.sh <tên> <tmp> tat 2` — **hồi quy đủ**: định kỳ 3–4 bản và trước bản lớn (bắt chỗ phụ thuộc dò sót — phép dò chỉ 1 tầng).
- Mọi lượt xong tự ghi mốc `tests/hoiquy_moc.json`: phép đạt → **đã chốt** (dấu vân tay file phụ thuộc, bỏ phần đổi theo mỗi bản: số bản, `?v=`, Có gì mới), phép trượt → bỏ chốt. Commit mốc cùng bản.
- `python3 tools/hoiquy_pt.py xem t278` — phép thử dựa vào file nào, file nào đổi (✱) so với mốc · `python3 tools/hoiquy_pt.py bang` → `docs/DA_CHOT.md` (bảng chức năng đã chốt, chốt từ bản nào).
- Cột `✗=` chỉ đếm dòng **bắt đầu** bằng ✗ (✗ trong câu mô tả của ý đạt không tính — hết 6 báo nhầm t192 / t207 / t208 / t210 / t224 / t254).

## Chạy (từ thư mục gốc repo)
| Lệnh | Kiểm gì |
|---|---|
| `python3 tests/kiem.py` | (3.142: ghép `index.html` + `css/` + `js/` rồi kiểm; báo nếu `?v=` khác `APP_BAN`) Cú pháp mọi khối `<script>` · trùng tên hàm · gọi hàm chưa định nghĩa. Phải ra `Cú pháp OK · Trùng tên: không · Thiếu hàm: không` (riêng `CompressionStream, DecompressionStream, Response` là hàm có sẵn của trình duyệt — bỏ qua). Viết regex có `_(`/`_t(` thì dùng `[_]` để khỏi báo nhầm. |
| `node tests/hoiquy.js` | Hồi quy chính (28 phép, máy trắng + máy có dữ liệu cũ). Thỉnh thoảng 27/28 do chờ cố định → chạy lại. |
| `node tests/hoiquy2.js` | Hồi quy 2 (20 phép). **Mỗi bản sửa chuỗi số bản** trong file (`sed -i "s/3\.85/3.86/g" tests/hoiquy2.js`). |
| `node tests/t100.js` (lỗi sẵn từ 3.90.1 — chờ phần tóm tắt cũ; không thuộc bộ hồi quy) | 3.86 Mẫu 31: nhận đúng loại, gộp khế ước trùng, món tất toán, khách chỉ gửi TK, công thức dư nợ 2 tháng, tab con Tra cứu KH (SĐT, khế ước), ô tìm chung ở tab Số liệu. |
| `node tests/t101.js` | 3.120: kiểm Mẫu 10 đã bỏ (loại X, không còn bảng Mẫu 10). Phép cũ của chức năng Mẫu 10 (3.87) giữ ở `tests/t101_mau10_cu.js` — chỉ chạy với bản ≤ 3.119. |
| `node tests/t102.js` | 3.88: tab Số liệu theo tháng (file của tháng, ② Kiểm tra lưu kết quả, dữ liệu đổi → kiểm lại, thu gọn bảng nhiều tháng) · tab con 👥 Tổ TK&VV (phím chung ở cây chọn tổ, chip, gõ tên, 3 báo cáo Xem / In / Excel) — bộ `gia31`, máy tính + điện thoại. |
| `node tests/t103.js` | 3.88.1: máy thứ 2 chưa tải bảng (Drive hết phiên) → cây tổ từ danh bạ + cảnh báo + Nối Drive / Thử lại. |
| `node tests/t104.js` | 3.89: bộ chọn phạm vi chung · Tra cứu KH kiểm trùng CCCD / CMND HSSV, tìm tên khách / vợ-chồng / HSSV, phạm vi · tab con 📑 Sao kê 8 báo cáo (theo xã chia tổ, theo tổ) — bộ `gia31`. |
| `node tests/t105.js` | 3.90: 7 file chuẩn TW giả (dựng từ Mẫu 31 giả) — đọc, kỳ tháng / ngày, kiểm tra chéo (khớp + làm lệch 1 xã), loại đã bỏ (Mẫu 7, Sao kê KH, KHĐ 08/KTNB, KHĐ rỗng), thay file 1 ô, tab con 📊 Tổng hợp 9 báo cáo + phạm vi, chuẩn in, thẻ tổ LEN_31, xóa cả bộ tháng, làm mới toàn bộ; 3.90.1: bảng đối chiếu chéo (ô đỏ → chi tiết), kiểm tháng trống, tải file gốc, tìm / xóa file rác; 3.92: tổ viên + nút lọc, bảng các tổ, hạn CCCD, vay trực tiếp vào cây, sao kê 2 khổ (dọc bỏ Số KU), tổng hợp tiêu đề 2 tầng; 3.91.1: tháng trống không hiện kết quả kiểm cũ, danh sách hộ vay bỏ KU đã tất toán, giữ dòng khách; 3.91: ma trận nhóm sổ / gọn + chip, chọn tháng chữ Việt, 4 bước kiểm tra, chốt (chặn khi chưa Đạt / chưa tích; chặn nạp / xóa) + mở khóa, nợ đến hạn 3 khung + nút chọn nhanh, viết tắt CT + chú thích, sao kê nợ đến hạn kỳ con (NOXH + trực tiếp, in ngang, ước tính ≈, nạp file phân kỳ giả → kỳ tới theo file), bản scan chỉ có PDF trên Drive đổi tên → chỉ đổi tên / dời — bộ `gia31`. |
| `node tests/t106.js` | 3.93 / 3.93.1: tab con 🛡 KTGS Hội — 3.93.1: Mẫu 06 sau giải ngân (2 tháng, chọn xã → mỗi tổ mỗi tháng 1 phiếu, chọn tổ → bỏ tích món, xem trước, Word nhiều phiếu ngắt trang / id hình không trùng, In nhiều phiếu), dòng trống bù, bảng ngành ẩn < 10 món; 3.93: — BC0437 / BC0438 giả dựng từ Mẫu 31 giả (xếp loại theo công thức khi cột = 0, dòng lặp, 3 phần BC0438, chọn sai loại), nạp qua luồng xem trước chung, ma trận KTGS, 🔍 kiểm tra (khớp ① ② và từng tổ, đổi file → kiểm lại, không làm kiểm tra tháng chính cũ), cột mục đích ngành rút gọn, không lên ma trận Nạp, bảng tổ, gợi ý hộ 3 kiểu (bỏ QH / khoanh, HSSV, giải ngân < 30 ngày), mã khoản vay 2-4 / 6, Word Mẫu 06 + 16 (XML hợp lệ, hết dấu `{{`, trống giữ dòng chấm, lặp tiêu đề, giữ liền chữ ký, không trang mẫu tham khảo), In / PDF, lịch sử kiểm tra — bộ `gia31`. |
| `node tests/t107.js` | 3.94: Tra cứu KH gọn — danh sách 2 dòng, thẻ chia nhóm (5 ô số, nhân thân, liên hệ, tiết kiệm, món vay + mục đích, dòng 🎓 HSSV), bấm giá trị để chép, không còn Hồ sơ hộ, hạn CCCD (hết / sắp / còn), địa chỉ gọn, kiểm trùng CCCD người vay / CCCD HSSV / tên vợ-chồng (người thừa kế, gõ không dấu) / không trùng, chi tiết ở cột phải, gõ CCCD ở ô tìm tự kiểm trùng, điện thoại 50 dòng + Xem thêm — bộ `gia31`. |
| `node tests/t108.js [thư mục]` | 3.95: KTGS › 📋 Mẫu 04/BC-TH — xuất Biên bản 16 / Mẫu 06 ghi nhật ký tổ, tổ có phiếu trong tháng tích sẵn (không lấy tháng khác), ngày + phiếu 06 + Biên bản 16, cảnh báo thiếu Biên bản 16, mỗi Hội – xã 1 báo cáo, phạm vi cây (lọc + thêm tổ chưa có phiếu, giữ tổ đã tích), sửa ngày, ⚙ Khai báo Hội (lọc xã, lưu gọn), Word (XML hợp lệ, bỏ MẪU THAM KHẢO, ngắt trang, đơn vị + đoàn, số dòng chấm đúng, lặp tiêu đề, VI.1 số phiếu, giữ liền chữ ký), In / PDF, Hội chưa khai báo giữ dòng chấm — bộ `gia31`; có tham số thì lưu `t108_m04.docx` để mở bằng LibreOffice. |
| `node tests/t109.js [thư mục]` | 3.96: KTGS › 🗓 Kế hoạch năm 01/KH — chip hội của xã, 100% tổ gom ấp, mặc định 02 → 10 chia đều theo ấp, đổi cả ấp / từng tổ (lưu), bỏ tháng → nhắc chưa đủ 100%, đổi khoảng tháng, năm khác lịch riêng, giá trị điền (in hoa, /HĐUT, Gò Dầu, bảng lịch không số hộ), Word (XML hợp lệ, căn cứ 727, không 10566 / 75% / MẪU THAM KHẢO, đoàn đủ 3 dòng, lặp tiêu đề, xuống dòng trong ô, A4, chân trang, không đầu trang, không chữ đỏ), khuôn Mẫu 04 vẫn đủ phần, In / PDF — bộ `gia31`; có tham số thì lưu `t109_kh.docx`. |
| `node tests/t110.js [thư mục]` | 3.97: kỳ số liệu mặc định cuối tháng (theo ngày chỉ trong phiên), ô chọn chia nhóm; BC0437 / BC0438 không theo khóa tháng; ↺ Gợi ý lại ra lượt khác, giữ hộ bắt buộc; khai báo theo thứ tự mẫu (06, 16, Khai báo Hội, định kỳ); 🗓 định kỳ: tháng kiểm tra = tháng sau số liệu, tổ theo lịch 01/KH, món các năm trước, 100% / < 90% đỏ, QH-khoanh tích tay, Word 06 + 16 (…../09/2026, ngày trống, số liệu đến 31/08), nhật ký → Mẫu 04; Kế hoạch khuôn ② (hợp lệ, không tên riêng, TM. BAN THƯỜNG VỤ, footer), không viền bảng đầu trang / ký, cột Quốc hiệu — bộ `gia31`; có tham số thì lưu `t110_*.docx`. |
| `node tests/hssv_exe.js [số ca]` | 3.102: so công thức Hạn trả HSSV giữa app và `tools/hssv/HanTraHSSV.exe` (cần mono; dựng trước bằng `tools/hssv/dung.sh`) — phải khớp 100%. |
| `node tests/t111.js [thư mục]` | 3.106: KH ① câu thành phần, ② căn cứ đủ, bảng khai báo In ra, Mẫu 04 đoàn + nhận xét tổ, dọn rác, chép nhiều file (giả cầu nối) · 3.103: cửa sổ nổi 3 mức + nền sáng / tối · 3.102: 📌 cửa sổ nổi (giả PiP bằng window.open) · 3.101: HSSV tiền vay theo năm học (ca anh gửi, vay giữa năm, cùng năm học), dòng Cách tính · 3.100: HSSV ngày vay gợi ý GDX gần nhất (giả `nay`), làm tròn gần nhất theo nửa năm · 3.99: HSSV gợi ý tiền vay theo nửa năm, ô tiền tự điền / gõ đè, 5 khối (3 lớn + 2 phụ) · 3.98: KTGS chỉ in (không lịch sử / nhật ký / đã lập) · địa danh chuẩn (ấp / khu phố, viết thường, tỉnh Tây Ninh) · danh sách hộ chung (mã KH, số KU, lãi tồn, 105, ghi chú, theo mã KH) · Mẫu 06 Word (bỏ dòng chấm Đơn vị, Chức vụ tab, địa bàn + Tổ, cột Mục đích 2099, dòng 1,5 cm, vMerge theo hộ, PNKT52) + bản In (rowspan) · xem trước tách tờ · Mẫu 16 (địa danh đúng chữ, tên Hội, tab, gợi ý nhận xét / để trống) · Đơn vị kiểm tra tự điền (Mẫu 06 / 16, tên gọn, "-") · 📖 Bảng chuẩn hóa + Kế hoạch ① ② Đoàn ở phường · điểm GD suy · khai báo trong tab + bảng cán bộ theo Hội – xã · Văn bản: CT vay không bắt buộc, sắp xếp Vừa thêm — bộ `gia31`; có tham số thì lưu `t111_*.docx`. `t106` / `t108` / `t110` đã cập nhật theo quy tắc 3.98. |
| `node tests/t112.js` | 3.107: bảng tổ kỳ đang xem thiếu tổ (bảng T7 giả = T8 bỏ 3 tổ) → điểm GD lấy theo bảng tổ tháng gần nhất + căn cứ, Hội theo ĐVUT món; danh bạ tổ (đối ra mã điểm); vay trực tiếp xếp theo ấp → ngày GDXA → xã 1 điểm; dòng báo vàng KTGS (số tổ thiếu, bảng từng tổ); cây KTGS bỏ vay trực tiếp; Mẫu 16 Đoàn kiểm tra = tên Hội cấp xã, bỏ ô khai — bộ `gia31`. |
| `node tests/t113.js` | 3.108: Danh sách tổ (DSTO) giả dựng từ bảng tổ T8 (tiêu đề, dòng tên cột phụ, tổng, chữ ký; cài lệch 1 điểm GD, 1 Hội, thiếu 1 tổ) + bảng tổ T7 thiếu 3 tổ — đọc đúng loại / kỳ, vùng dữ liệu khai sai (`slSuaRef`), tổ thiếu lấy điểm theo DSTO, ② Kiểm tra mục 6 (thiếu, lệch điểm, lệch Hội, tổ trưởng khớp không phân biệt hoa thường, không báo trùng), tên tổ trưởng chuẩn (bỏ Ông / Bà, lấy dấu theo mã KH / thành viên, hoa đầu từ, không lấy nhầm) — bộ `gia31`. |
| `node tests/t114.js` | 3.109: Mẫu 04 dòng ngày theo tháng kiểm tra, III nội dung ghi sẵn, IV.1 lãi tồn, IV.2 a) b) c) liệt kê hộ (món KHĐ, lãi tồn > 6 tháng lãi, ≤ 10 hộ + "và n hộ khác"), Word + bản In; Mẫu 16 tháng theo tháng kiểm tra, tên hộ ở Tồn tại / Kiến nghị; lãi 1 tháng theo lãi suất — bộ `gia31` (cài lãi tồn giả trong phép thử). |
| `node tests/t115.js` | 3.111: Mẫu 06 theo mẫu gốc (tên hoa đầu từ, Nợ lãi = lãi tồn + tổng, lưới cột mới, dòng 567, CT / mục đích dài cỡ 10, Thời điểm ⇥ Địa bàn ⇥ Tổ, Đơn vị tính riêng, tiêu đề cách trên), bản In; Mẫu 16 đầu trang tab giữa, Bảng II điền sẵn / để trống, nhớ lựa chọn; `tgTuId` chặn ngày tương lai / trước 2020 |
| `node tests/t116.js` | 3.112: Kế hoạch ① ② chọn căn cứ 727 / 10566 — chỉ thay 1 dòng, Word hợp lệ, bản In, nhớ theo Hội, tên file |
| `node tests/t117.js` | 3.113: đồng bộ toàn bộ cài đặt qua Drive — 3 máy giả: khóa riêng không lên, máy mới lấy về, 2 máy cùng sửa gộp đủ, xóa lan theo, không đổi thì không đẩy, lưu là tự hẹn đẩy, Lấy từ Drive bằng tay |
| `node tests/t118.js` | 3.113: 🏛 Khai báo Hội đoàn thể — chuyển khai báo cũ, thẻ Hội – xã, Đoàn đổi chức danh, In ra, người kiểm tra = PCT / người ký KH = CT, dòng nhắc thiếu, chép KH tỉnh, tab nhỏ Chuẩn hóa (tô xanh, ↺) |
| `node tests/t119.js` | 3.114: hộp chọn khi in — vai trò → tên / chức vụ, hộp hiện trước khi xuất, nhớ lựa chọn, Mẫu 06 / 16 / 04 / KH theo lựa chọn, ✚ Điền đầy đủ, tên Trưởng đoàn Mẫu 04, nhận xét nợ quá hạn / nợ khoanh có tên hộ, ngày đột xuất cạnh nút In |
| `node tests/t131.js` | 3.138: ⟳ Làm mới + chip kỳ đang dùng (Tổ / Sao kê / KTGS cùng kỳ), TK 105 "đã mở TK" (số TK 14 số, số dư 0), KU hủy / nhập nhầm tổ bị loại (+ dòng ② Kiểm tra), KU chưa giải ngân (không tất nợ, báo cáo Sao kê, quá 1 tháng theo tháng lịch), chip Đến hạn 2 cột (màn hình / In / Excel) — bộ `gia31` + dòng giả cài trong phép thử |
| `node tests/t136.js` | 3.140.4 / 3.141: đồng bộ cài đặt — máy trống chạy với thư mục khác rồi quay về → không ghi đè, lấy file thật về gộp (chFileId); không tạo thư mục "undefined" (Drive giả) |
| `node tests/t137.js` | 3.141: Kế hoạch › In theo tháng tự lấy số liệu cuối tháng trước (T8 → Mẫu 31 T7), kỳ đang chọn giữ nguyên, tên file SL đúng ngày, thiếu tháng → ⚠ (bộ gia31) |
| `node tests/t138.js` | 3.142 (đợt A tách file): mở app qua **máy chủ web tạm** (như GitHub Pages, không phải file://) — đủ 22 file js theo thứ tự, `?v=` = APP_BAN, index.html không còn khối viết trong trang, CSS có tác dụng, mọi hàm cấp ngoài của js/ có trên trang; cửa sổ nổi HSSV chép luật CSS ngay (không link), nền tối đúng màu. **Phép thử dò chữ trong mã** (t111–t113) đọc mã ghép qua `tests/nguon.js` (trước dùng `document.documentElement.innerHTML`). |
| `node tests/t139.js` | 3.143 (Q14): ngày số liệu theo nội dung file — Mẫu 31 tự nhận; KHĐ / tổ trưởng chỉ có ngày tên file → cần khai, ô Kỳ trống, không tích, slGhi từ chối; nút gợi ý tên file; khai tay; ghi nhận nguồn "anh chọn"; nạp từng file chọn kỳ trước như cũ — bộ `gianho31`. **Lưu ý:** `tests/tv.js` (từ 3.143) giả lập anh bấm dùng ngày tên file cho mọi phép thử cũ; t139 tắt bằng `window.KHAI_TU_DONG = false`. |
| `node tests/t140.js` | 3.144 Sắp lại tab: thanh tab (Nạp & KT thay Tháng, tô nút), tab con Số liệu không còn Nạp, nhớ tab con báo cáo, khối BC0437 / BC0438 ở tab Nạp, KTGS chỉ còn nút sang, `doiNgan(2)` → Nạp; Công cụ ẩn Giao ban / Buổi GD; `boThangDon` (chưa / đã nối Drive, khay chờ + thùng rác, daXoaHan, thư mục Drive vào thùng rác, văn bản không bị đụng) — Drive giả `fakedrive.js`. |
| `node tests/t141.js` | 3.145 Bộ file chuẩn mới: 9 file cần cho Đạt, nhóm Ⓑ / Ⓐ / Ⓓ; xóa hẳn bảng B32 / Mẫu 7 / Sao kê KH (`slBoLoaiDon`); ô ma trận số chính + mũi tên đúng chiều / màu; bấm ô trống = nạp, ô có file hỏi thay; 📋 File cần xuất; thay + hoàn tác (trong máy và Drive giả: lấy lại khỏi thùng rác); KHĐ tự tính từ Mẫu 31; DSTO trước Thông tin tổ trưởng; tổ dư nợ 0 cần đóng / ẩn / tìm được. |
| `node tests/t142.js` | 3.146 Kiểm tra kỳ: không còn hàm chốt; meta cũ có chốt đọc được; Đạt = đủ 9 file + đúng kỳ + đúng cấu trúc + đã kiểm; chênh lệch vẫn Đạt; sai kỳ / 0 dòng → chưa Đạt; lưu ý không làm trượt; theo loại báo cáo; giao diện 4 bước, pill, tiêu đề cột ✓, mục Ghi nhận chênh lệch. |
| `node tests/t143.js` | 3.147 Thanh bên: có ở 1536 px (216 px), ẩn tab ngang; đủ 11 mục; bấm mục → đúng màn + tô đúng; lối cũ tô đúng; số đếm; Công cụ; Alt+số; thu 60 px nhớ qua lần mở; 1200 px tự thu; 1000 px / iPhone không thanh bên, không tràn ngang; in; nền tối. |
| `node tests/t135.js [thư mục]` | 3.140.1: Mẫu 06 số tiền 2 số lẻ (nợ lãi dưới 5.000 đ 3 số lẻ), ô số tiền canh phải + lề 30, cỡ theo đúng ô 1,3 cm (1.178,4 · 128,56 · 12.345,67 nằm 1 dòng), Cộng từ số gốc, bản In nowrap; ghi Word ra thư mục để dựng thử |
| `node tests/t134.js` | 3.140 (+3.140.1 Mẫu 16 từng tổ, +3.140.2 tên file Xã_Hội_Ấp_Tổ_Mẫu_Tháng_SL, 📤 PDF gửi Hội): Kế hoạch thứ tự ấp (điểm GD → mã thôn, sắp lại, về mặc định), trọn ấp mỗi tháng, chỉ đổi tháng cả ấp, cảnh báo kế hoạch cũ tách ấp, in theo tháng (06 từng tổ 1 mặt + hỏi dưới 90%, 16 cả tháng 2 mặt, 04 tháng 2 mặt, Word), Định kỳ chọn tự do — bộ `gia31` |
| `node tests/t133.js` | 3.139: báo cáo Dự kiến chia tách tổ (cột, theo mã KH, Tổ mới trống, QH / khoanh in đậm, dòng dự kiến 1 dòng, ký Tổ trưởng, tổ 50 / 60 hộ ≤ 2 trang bản In) · "PGD NHCSXH GÒ DẦU" in đậm góc trái báo cáo Tổ / Sao kê / Tổng hợp — bộ `gia31` |
| `node tests/t132.js` | 3.138 in ấn: Mẫu 06 (chấm nhạt xám, kẻ dòng hộ mảnh, tiêu đề cỡ 11, ngày lên dòng chấm Biện pháp, chỗ ký, mẫu trắng 3 cột chữ bằng nhau; bản In 1 hộ / trắng 1 mặt = 1 trang, 2 mặt = 2 trang), Mẫu 04 (kiến nghị 2d 2đ 3a 3b tùy chọn + nhớ câu sửa, bảng 97,3%, Trưởng đoàn tab 6900, gạch tên đơn vị), Kế hoạch ① ② (gạch theo chữ, cân giữa, không còn hình đường thẳng, bản In có gạch) — bộ `gia31` |
| `node tests/t129.js` | 3.134: Mẫu 06 mục đích cùng cỡ, cột đúng / sai / Hiệu quả đầu tư, tên Hội không đậm, "Mẫu số 06/TD" nhỏ canh phải; Mẫu 06 trắng 1 mặt (4 dòng) / 2 mặt (21 dòng) — đếm trang PDF thật, Word hợp lệ; 3.135: ngày kiểu Mỹ / mơ hồ + tên file / kiểu Việt Nam; xóa riêng bản ngày; dòng gợi ý "ngày/tháng/năm" cạnh mọi ô chọn ngày |
| `node tests/t130.js` | 3.136: kỳ ngày lấy bảng đúng ngày / liền trước (`slKyDung`, `B.nguon`), ghi chú căn cứ + cảnh báo KTGS, Ra khỏi tổ so ngày với cuối tháng trước, ngày chỉ có Dư nợ chi tiết, loại mới nạp theo ngày (ngày chỉ trên tên file → ô tháng), Sau giải ngân dùng Mẫu 31 ngày, cột 📅 Theo ngày + Xóa ngày cũ, dựng sẵn ngày mới nhất; 3.137: cột Nợ lãi cạnh Dư nợ, dư nợ 0 còn lãi = chưa tất nợ |
| `node tests/t128.js` | 3.128: Tổ TK&VV (bản đồ khách → tổ 2 tháng, Mới vào / Ra khỏi tổ, chip chưa TK 105, ngày tất nợ, Biến động cả năm); bộ in chuẩn (chia A4, @page lề 0, Trang x/y Mẫu 06, số trang từ trang 2, lặp tiêu đề bảng, cột cố định, tiêu đề mục không bỏ lại cuối trang, in 2 mặt — đếm trang PDF thật, khung xem) |
| `node tests/t127.js` | 3.125: giữ sẵn nhiều tháng — nạp ngầm 4 tháng (T8 chép thành T5, T6), chuyển tháng không đọc lại bảng, giới hạn + bỏ tháng lâu không xem (giữ tháng mới nhất), Tất cả, nạp lại 1 tháng bỏ bản đã dựng, điện thoại chỉ tháng mới nhất |
| `node tests/t126.js` | 3.124: dòng chấm mịn (Word tách run cỡ 65%, đủ dài; bản In .kt-cham; số tiền không đụng), in 2 mặt (mặc định bật, nhớ lựa chọn, Word oddPage, Mẫu 04 thay nextPage, bản In chèn trang trắng — đếm trang PDF thật) |
| `node tests/t125.js` | 3.123: Phân công BTV (tích người, khuyết CT → Phó đôn lên, khuyết Phó → CT kiêm, không Ủy viên, người ký, ô kiểm tra, hỏi khi còn ⚠, giữ ấp chỉnh tay); rà tên (gợi ý, trùng, NFC, nút Sửa theo gợi ý); Kế hoạch chip tháng (Chọn nhanh, hỏi khi đã chỉnh tay, Word), tự lưu khi Xem, tổ không còn trong số liệu, Báo cáo tổ theo kế hoạch, Xóa kế hoạch, đọc kế hoạch bản cũ |
| `node tests/t124.js` | 3.121 + 3.122 (DSTO báo số tổ): đối chiếu Mẫu 31 ↔ Dư nợ chi tiết (khớp, lệch + danh sách món, cột Dư nợ CT, bản nạp 3.120 nhắc nạp lại) |
| `node tests/t123.js` | 3.120: dòng Dư nợ chi tiết (tự nhận, chỉ lưu cột tham chiếu), số TK 105 từ file tham chiếu (10 chữ số, Mẫu 31 không đè), số dư 105 theo Mẫu 31, điểm GD tổ, bỏ Mẫu 10 (dọn dữ liệu cũ, từ chối file) |
| `node tests/t122.js` | 3.118 + 3.119 (đầu văn bản Phân công): rà mẫu chung 06 / 16 / 04 (Chức vụ:, cách sau dòng chấm, tách đơn vị, viết tắt chức vụ, chứng kiến ngang, Cộng đậm + không rớt dòng, bỏ nhãn đơn vị, tỷ lệ, nơi nhận 04); Phân công: đủ ấp theo cây, chia sẵn, ô nhiệm kỳ |
| `node tests/t121.js` | 3.117: Mẫu 06 phân trang (keepNext Word, khối hộ bản In, đếm trang PDF 1 / 2 / 3 / 4 / 6 hộ); Thông báo phân công BTV (hộp, chia đều, căn cứ, người, ấp, kế toán / thủ quỹ, Word, In, Đoàn) |
| `node tests/t120.js` | 3.115: Mẫu 06 dòng Thời điểm · Địa bàn · Tổ (gọn dần cho vừa 1 dòng), CT canh giữa, tên cán bộ kiểm tra dưới khối ký; Mẫu 16 tên Trưởng đoàn + Tổ trưởng, Bảng II như mẫu tham khảo; KH ① hết dính chữ |
| `node tests/t144.js` | 3.148 Nút & trạng thái: bỏ 🗑 cuối dòng, nút Thêm xanh, hộp thoại Thôi trái / nút chính phải + nút không giãn, tin trong hộp vẫn nổi, tin thường vào ô trạng thái (thanh bên / thanh đáy iPhone), đèn đỏ / vàng, thanh %, hộp Đang xử lý ẩn khi không có Dừng, 🔔 danh sách tin, NhanNT trên thanh bên, thanh đáy ẩn / hiện theo tab, nút ≤ 240 px. |
| `node tests/t145.js` | 3.149 Kỳ + phạm vi chung: ô Kỳ đầu trang, tab không còn ô kỳ riêng, đổi kỳ → mọi tab + SL_KY, phạm vi chọn ở Tổ → các tab khác + pvChung, cây 2 hàng (chip cấp kế tiếp, chọn tới tổ hết chip, bỏ chọn về PGD), KTGS bỏ dòng nạp + cảnh báo Thông tin tổ trưởng. |
| `node tests/t146.js` | 3.150 Tab Nạp & KT gọn: 1 hàng công cụ ≤ 40 px, bỏ chữ / nút thừa, 1 dòng trạng thái (thiếu file liệt kê 1 lần, tooltip báo cáo), ma trận trọn ngang, kết quả kiểm + KTGS gập sẵn, ⋯ đủ việc phụ, ❓, tháng chưa có file, bấm tên tháng → kỳ chung. |
| `node tests/t147.js` | 3.151 Thanh lọc chung tab file (VB, BM, Scan): 1 hàng ≤ 44 px, ⚲ Lọc + chip ✕, ⇅, ☰, ⋯ từng tab, ▦ Bảng (cột, ≤ 32 px / dòng, sắp theo tiêu đề, ô tích, ↑↓), Gọn cũ → Bảng, iPhone vẫn danh sách. |
| `node tests/t148.js` | 3.152 Xuất chung: tên file Loại_Phạm vi_Kỳ, hàng nút Tổng hợp / Sao kê đúng thứ tự, PDF tên điền sẵn, 📤 Gửi (PDF · Excel · Copy ảnh · Copy chữ), Copy chữ ra tab, Copy ảnh PNG, KTGS nhận cách pdf, khung xem file In · Sửa · Gửi, copy số hiệu + trích yếu. |
| `node tests/t149.js` | 3.153 Xóa thống nhất: xóa 1 file không hỏi / nhiều file hỏi 1 lần, không Hoàn tác, việc lịch · lần làm việc · bộ biểu mẫu vào ngăn Mục nhỏ và khôi phục, ngăn Số liệu, tự xóa 30 ngày bật sẵn. |
| `node tests/t150.js` | 3.154 Khai báo Hội 1 bảng: chuyển dữ liệu cũ đủ 9 vai (PCT đầu tiên, 3 BTV dồn lên, người dư ở du), phân công + chọn người in đổi vai theo, cột bảng, ⓘ, Enter / Tab / ↓, dán khối Excel, ngày sai tô đỏ, Đoàn Bí thư, Mẫu 06 dùng Phó CT mới. |
| `node tests/t151.js` | 3.155 Luồng Scan: hộp Lưu máy · Gửi · Copy ảnh · Lưu tủ, không tự lưu tạm, Copy ảnh PNG, chọn khách theo danh bạ, lưu mã KH + tên + ấp, đường dẫn Xã / Ấp / Mã KH Tên.pdf, trạng thái không đòi tổ, Xong hỏi khi chưa làm gì, phiên quá 7 ngày tự bỏ. |
| `node tests/t152.js` | 3.156 Tab Nạp & KT gọn 2: hàng nút, 1 nút nạp (Ⓚ KTGS trong ma trận), 2 tháng + Theo ngày, cột chọn sáng, ô 28 px, tên dài, tự kiểm ngầm + tự kiểm lại sau xóa, dấu ✓ / ⚠, kết quả 1 dòng, vừa 1 màn hình, chuyển tháng, Tổng quan 12 tháng, Thu gọn, ❓. |
| `node tests/t153.js` | 3.157 Khung xem phải sát đáy, đầu 1 dòng + tên khi rê chuột, ⊡ Vừa trang trọn A4 + nhớ chế độ; lọc số liệu hàng chip có nhãn, Hội mọi cấp, 🔎 tìm nhanh (Sao kê tự điền), Tổng hợp Nguồn vốn chip + CT dưới cây + báo cáo 1 dòng, KTGS Kế hoạch bỏ chip Hội riêng. |
| `node tests/t154.js` | 3.158 Khai báo Hội vừa 1 trang: chuyển KH Hội tỉnh cũ sang Chuẩn hóa (+ ngoại lệ xã), cột mới, dòng nhóm xã, 📋 Phân công cạnh tên Hội, bỏ ⇩ Chép, vừa ngang, Excel Enter, Chuẩn hóa 14 mục, Riêng từng xã, KH riêng / chung, in Kế hoạch. |
| `node tests/t155.js` | 3.159 Chân thanh bên: dòng trạng thái không lặp Drive, tin dài ≤ 3 dòng, chip xuống dòng; nút ◐ / ☀ / ☾ xoay giao diện + nhớ; rà tương phản chữ / nền 7 tab ở nền tối; bản in giữ trắng. |
| `node tests/t156.js` | 3.160 Lọc số liệu chung: dòng 📍 + ✕, hàng ① / ② / ③, Hội trước điểm, bấm tên mở lại, ✕ bỏ từng cấp, 5 tab, Tra cứu bỏ khung gập + số khách, nền tối ô nhập, điện thoại giữ ô thả xuống. |
| `node tests/t157.js` | 3.161 Tab Tổ: cách viết số triệu đồng, chip 3 nhóm ≤ 2 dòng, nút đầu bảng, khung cuộn + tiêu đề / Cộng dính, kẻ ô, ngày đủ, cột tự ẩn khi lọc Hội, ⚙ Cột, In A4 dọc / In đầy đủ A4 ngang / Excel, cảnh báo in đậm + cột Lưu ý. |
| `node tests/t156.js` | 3.160 + 3.162 Lọc số liệu chung: hàng Xã luôn hiện + 📍 chỉ báo cùng hàng, Điểm GD │ Hội 1 dòng, Tổ chip + ô sổ xuống, Hội trước điểm, bấm PGD quay lại, 5 tab, Tra cứu, nền tối ô nhập, điện thoại giữ ô thả xuống. |
| `node tests/t158.js` | 3.163 Nạp & KT dải lịch ●◐○ + ⦿ Gần nhất, cột theo ngày + cột chốt, Tổng quan / Thu gọn; tab Tổ cột Tự động không tràn ngang, ⚙ Cột 3 chế độ, In đầy đủ / Excel đủ cột danh sách khách; tiền 2 số lẻ; chip tổ kèm ấp; chip ⚠ Dùng T… + ⚠ ô kỳ. |
| `node tests/t159.js` | 3.164 Tổng hợp: 3 nhóm + nhãn cấp, chọn 1 báo cáo xem ngay ở khung phải, dữ liệu cũ tích nhiều giữ cái đầu, lọc Nguồn vốn tới Hội / Tổ (= Lọc sâu), dòng cộng đúng phạm vi, phạm vi sâu hơn biểu → mờ + dòng vàng. |
| `node tests/t160.js` | 3.165 Kết quả kiểm tra theo file (thứ tự ma trận), đếm ✓ ⚠ ⓘ, "↗ xem ở", chip lọc mặc định ⚠ + ⓘ, Mở hết / Gập hết, tìm mục, bấm ⚠ ô ma trận → đúng file. |
| `node tests/t161.js` | 3.166 thanh chọn nhiều có 📋 Chép n file + Xóa n file; chưa cầu nối → hộp chia sẻ đủ file; không hộp chia sẻ → tải về; có cầu nối → chepNhieu; khung xem 1 file có 🪟 Hộp chia sẻ Windows. |
| `node tests/t162.js` | 3.167 Khối LỌC ĐỊA BÀN ở 5 tab, Điểm GD / Hội 2 thanh riêng, màu chip theo cấp, tên dòng to / đậm, không tràn ngang. |
| `node tests/t153.js` | (3.168) Tổng hợp: Chương trình cùng dòng Nguồn vốn. |
| `node tests/t162.js` | (3.169) khối lọc + tab Tổ hàng Báo cáo của tổ ở đầu. |
| `node tests/t163.js` | (3.170) tab 📝 Hồ sơ Tổ + 📄 Hồ sơ vay: 10 mẫu điền từ số liệu, mẫu trắng, 10C theo ngày họp, khai báo 1 lần, Word đúng khổ, đọc số thành chữ. |
| `node tests/t164.js` | (3.171) bộ hồ sơ vay HSSV / NSVSMT, hộ cũ / hộ mới, mẫu theo PDF (01/UQ, 01/TD, 03/TD, 04/TD, 09A, 01/TGTV), logo, tiêu ngữ nét mảnh, Word nhiều section. |
| `node tests/t165.js` | (3.172) tab 🏢 Giao dịch xã: kiểm tra trước đợt + ngày GD gần nhất, nơi giải ngân điểm / PGD, tên UBND đầy đủ, GQVL, 2 bản, ⭐ Mẫu hay in, mức tiền / cán bộ, 12/GDX tổ từ Địa bàn + trọn 1 trang, lưu cài đặt (Địa bàn giả). |
| `node tests/t166.js` | (3.173) KHĐ tự tính theo luật hệ thống: MONTHS_BETWEEN / ADD_MONTHS kiểu Oracle, ngày GN đầu khi chưa GD, ân hạn CT 05/07/18 · 01 C2 · 06, lãi suất 0, khoanh + gia hạn tháng, bảng Kiểm tra số liệu ghi lý do (dữ liệu giả). |
| `node tests/t167.js` | (3.174) Giao dịch xã có số liệu (`gianho31`): cây theo Mẫu 31, ẩn Hội / Tổ cho mẫu cấp điểm, 12/GDX tên tổ trưởng theo Mẫu 31, 💵 Giấy lĩnh (tìm không dấu, TK 105 / 104, bỏ chấm khi có thông tin, rút hết số dư, cảnh báo vượt số dư, A5 / A4), danh mục tham chiếu + file TK 104 giả, TK 104 không còn là tổ trưởng, 📜 nhật ký in (in lại đúng bản, tự xóa 1 tháng), điện thoại không tràn. `t165.js` viết lại theo bố cục 3.174 (chưa có số liệu, 04/TD + 12/GDX, trọn 1 trang 10–45 dòng). |
| `node tests/t167.js` | (3.174 / 3.175) … thêm 3.175: nạp danh mục qua nút 📥 Nạp file chung (không vào bảng xem trước), khối 📚 Danh mục tổ ở Nạp & KT, chuyển dữ liệu 3.174, Giấy lĩnh bằng chữ 2 dòng / VBSP / 13 pt / form gõ tay / mẫu trắng 1 · 2 mẫu A4. `t165` thêm ▲▼, mức tiền, ngày gõ nhanh, lỗi mở ⚙, 12/GDX in đậm · ô ký · 1 chip ngày. |
| `node tests/t167.js` | (3.175.1) thêm: so tên tổ trưởng danh mục ↔ Mẫu 31 bỏ "Ông / Bà", không dấu, không phân biệt hoa thường. |
| `node tests/t167.js` | (3.176) thêm: ↑↓ Enter ô tìm, khung gọn, ▲▼ 100 nghìn, Nội dung ngang đáy ô Số tiền, chữ chìm 4 mức, nút Làm trống sau in. |
| `node tests/t168.js` | (3.177) 📦 Mini app Giao dịch xã: xuất file từ app (gianho31 + TK 104 giả), số liệu xáo (không thấy tên / TK 104 trong mã), không gói khách TK 105, mở mini in 04/TD · 12/GDX · Giấy lĩnh TK 104, mẫu trắng, lưu lựa chọn, nhắc < 7 ngày, lùi giờ / quá hạn / sửa hạn → khóa, điện thoại không tràn. |
| `node tests/t168.js` | (3.178) thêm: hộp xuất ghi số CCCD tổ trưởng, CCCD không đọc được trong mã, mini chọn tổ trưởng điền CCCD / nơi cấp, tìm trong điểm đang chọn (app + mini) và mở rộng cả PGD. |
| `node tests/t167.js` | (3.179) thêm: Giấy lĩnh mặc định TK 104; Làm trống rồi chọn lại tổ cũ ở khối lọc → điền lại TK 104. Các phép TK 105 chọn loại 105 trước. |
| `node tests/t168.js` | (3.180) thêm: TK 104 tra theo mã lệch số 0 / tên tổ trưởng cùng xã, câu lý do khi không có, Tóm tắt 1 dòng, khối lọc thu gọn Xã / Điểm khi đã chọn điểm. |
| `node tests/t168.js` | (3.181) thêm: khối lọc gọn khi chọn Xã › Hội › Tổ (không chọn điểm), bấm vùng nhập → gọn, đầu khung 1 hàng + menu ⋯. `t167` nút Làm trống sau in kiểm theo lớp `.gdx-moi`. |
| `node tests/t167.js` | (3.182) thêm: ngày lĩnh chỉ Hôm nay · nhập ngày · Để chấm (1 dòng), ô tiền nổi bật, CSS lề trên 13 mm + chữ chìm 42,4 mm + gạch dọc ô Người lĩnh ngắn 5 mm, nút Làm trống ở đầu khung. |
| `node tests/t167.js` | (3.183) thêm: công thức nơi cấp theo ngày cấp (đủ chữ), gõ ngày cấp → nơi cấp tự điền, Họ tên · CCCD · Ngày cấp 1 dòng, nút 👁 Xem: Bật / Tắt. |
| `node tests/t167.js` | (3.184) thêm: bỏ ô Nơi cấp (chữ mờ cạnh nhãn Địa chỉ), Địa chỉ · TK 1 dòng, thẻ cấp trước 10/10/2018 ghi "Cục Cảnh sát" + cảnh báo. `t168` mini kiểm chữ mờ nơi cấp. |
| `node tests/t167.js` | (3.185) thêm: tìm theo 6 số cuối CCCD + ↑↓ Enter → ô số tiền; TK 105 chưa có số sổ → lý do / lấy theo CCCD ở danh bạ (giả lập); Làm trống bỏ chọn tổ. `t168` mini tìm theo CCCD. |
| `node tests/t167.js` | (3.186) CSS Giấy lĩnh: đầu phiếu → Họ tên 8 mm, chữ chìm 48,4 mm, `.gl-len` bằng chữ + Nội dung lên 1 mm. |
| `node tests/t167.js` | (3.187) thêm: Bảng kê (xem theo 💵/🧾, tự chia mệnh giá, mẫu trắng 2 tờ), CCCD tổ trưởng từ Thông tin tổ trưởng + lý do. `t165`: ngày gõ liền 5 / 7 số, năm 2 số cũ. |
| `node tests/t167.js` | (3.188) thêm: Giấy lĩnh + Bảng kê chung 1 tờ A4 (Bảng kê 185 × 105 sát góc dưới trái, tự chia, bằng chữ đủ, 2 nét cắt) + mẫu trắng. |
| `node tests/t167.js` | (3.189) thêm: Bảng kê chữ chìm = logo đã nạp, chưa nạp → VBSP. |
| `node tests/t167.js` | (3.190) thêm: Bảng kê — Họ tên dưới chỗ ký để chấm. |
| `node tests/t167.js` | (3.191) in kèm: Bảng kê 210 × 115, chữ 13 pt, không in sẵn tên, Tổng cộng đậm, bằng chữ đậm nghiêng. |
| `node tests/t167.js` | (3.192) thêm: mẫu trắng Bảng kê 2 tờ / A4 ngang sát 2 mép + nét cắt; ⚙ 2 nhóm Giấy lĩnh / Bảng kê. |
| `node tests/t167.js` | (3.193) mẫu 🧾 Bảng kê riêng (2 tờ A4 ngang, 6 mục khai báo, logo riêng); Giấy lĩnh không còn Bảng kê. `t131`: khách vay món mới ở tổ khác không tính ở tổ cũ. |
| `node tests/t167.js` | (3.194) Giấy lĩnh 3 nút in + Mẫu trắng; Kết hợp điền theo Giấy lĩnh, tự chia, ký tên trống, logo NHCSXH; logo có sẵn + Tải logo. |
| `node tests/t167.js` | (3.195) Bảng kê: tên PGD liền khối cùng font, trống → chấm. |
| `node tests/t165.js` | (3.196) Đường kẻ mọi mẫu ≤ 0,9 px, 12/GDX kẻ giữa dòng xám, Giấy lĩnh chấm mịn (t126: chấm Mẫu 06 xám mịn). |
| `node tests/t167.js` | (3.197) Giấy lĩnh: gạch dọc dài thêm 2 mm, ô Số tiền giãn đều, PGD đậm; Bảng kê: Họ tên nhỏ nghiêng. |
| `node tests/t167.js` | (3.198) Giấy lĩnh không viết tắt PGD. |
| `node tests/t167.js` | (3.199) Giấy lĩnh: ngày tháng cùng dòng PGD, thân phiếu lên 1,25 mm. |
| `node tests/t167.js` | (3.200) Giấy lĩnh: PGD Đậm / Thường; số tiền bằng chữ nghiêng. |
| `node tests/t167.js` | (3.201) Sao kê TK 104 giả → Giấy lĩnh + TK 104 cần đóng; Mẫu 01/TV giả → cần cho ra khỏi tổ; nhớ ngày cấp gõ tay; bỏ danh mục tổ. |
| `node tests/t167.js` | (3.202) Bảng tổ dựng sẵn, hộp thiếu dữ liệu, TK 105 Sao kê 2 TK → chọn TK đang dùng, ⚠ TK trùng. |
| `node tests/t169.js` | (3.203) Gom lưu: 10 lần `luu()` → 1 lần ghi, ghi ngay khi ẩn app / rời trang, bộ nhớ đầy, xóa sạch không ghi lại. |
| `node tests/t167.js` | (3.204) + khối nguồn tổ trưởng: dòng Danh sách tổ, bảng tổ ghi thiếu gì. |
| `node tests/t167.js` | (3.205) + bấm TK 104 chưa đóng khi kỳ đang mở chưa gắn Sao kê → tự gắn. |
| `node tests/t170.js` | (3.206) Cây địa bàn Mở rộng / Thu gọn + về cấp trên, ↺ Phiếu mới, Hồ sơ vay tab mẫu, 09A ô chấm tùy biến, in kèm Mẫu 06/TD. |
| `node tests/t171.js` | (3.207) Hộ vay mới: form nhập nhanh, suy CCCD, địa chỉ, thành viên, Lưu hộ, Lập HS → 01/TD · 01/UQ. |
| `node tests/t172.js` | (3.208) Khai báo chung tab con, thẻ chương trình vay → 01/TD · 03/TD tự điền, thời hạn / hạn cuối gõ hoặc chấm, HSSV gõ số tháng. |
| `node tests/t173.js` | (3.209) Sổ hộ vay: lấy Mẫu 31, hộ mới (tổ, nhiều HSSV), trùng CCCD, gắn mã KH; in theo hộ + in kèm; chuyển Bộ HS cũ. |
| `node tests/t173.js` | (3.209–3.210) Sổ hộ vay + in theo hộ + 03/TD nhiều hộ cùng chương trình. |
| `node tests/t174.js` | (3.211) GQVL: thẻ, lịch trả gốc 24 tháng/lần làm tròn trăm nghìn, lãi theo ưu tiên, 01/GQVL, 07b, in kèm 03/TD. |
| `node tests/t167.js` (3.213) | thêm: Bảng kê 118 × 210 mm, 💵+🧾 Bảng kê cao 118 mm sát đáy không đè Giấy lĩnh. |
| `node tests/t175.js` | 3.214 Sổ hộ vay: form lưới (Enter / Tab, giữ con trỏ khi vẽ lại, Lưu & thêm tiếp), tab 📒 Sổ hộ vay (sửa ô, ↑ ↓, CCCD trùng, Cần bổ sung, tìm / chip / sắp xếp, in đúng danh sách lọc, bản in 12 cột). |
| `node tests/t176.js` | 3.215 Khai báo riêng 01/TD · 03/TD · 01/UQ: thứ tự ô từ trên xuống, mặc định chấm, 🖨 ngày = hôm nay / gõ, lãi suất theo chương trình, số tiền / thời hạn phê duyệt, 03/TD tự đếm + cộng, tên trưởng thôn, bật lại ✍. |
| `node tests/t177.js` | 3.216 Cửa KHO: hợp đồng từng cửa = hàm được bọc, chưa dựng kỳ → rỗng, kiểm tĩnh js/25 + js/26 không đọc thẳng biến kho. |
| `node tests/t167.js` (3.217) | Bảng kê sau chỉnh chữ / logo / nét cắt vẫn 118 × 210, đủ phép cũ. |
| `node tests/t176.js` (3.218) | thêm: 01/TGTV vừa 3 trang. |
| `node tests/t176.js` (3.219) | thêm: 01/TGTV ô tùy biến mặc định chấm / bật in, chữ ký mẫu 2 ô, ép in màu, vẫn 3 trang. |
| `node tests/t176.js` (3.220) | thêm: 01/TĐCK chấp thuận NH, 01/GQVL ngày ký, 07b nơi ký. |
| `node tests/t176.js` (3.221) | thêm: bản ghi mẫu — in số liệu thật, UBND / NH vẫn chấm, không lưu, tên file GhiMau. |
| `node tests/t178.js` | 3.222 Khai báo đơn vị dùng chung (Giao dịch xã mở cùng cửa sổ, tên đơn vị từng mẫu, Hội, TK), bố cục A cột trái, chương trình vay 1 lối vào, 📎 nguồn, ↺ về mặc định, ⚠ nhắc thiếu, 09A / 01/TĐCK cùng khung. |
| `node tests/t179.js` | 3.223 M0 chuẩn khóa: bản in mọi mẫu so từng ký tự với `tests/chuan/*.html` (ghi lại chuẩn mẫu anh duyệt đổi: `node tests/chuan_tao.js <tên>`). |
| `node tests/t180.js` | 3.223 M0 chuẩn gốc: so với file Word gốc (`tests/mau_goc/`) — chữ, số trang, lề, vị trí dòng; mẫu trong `khop.json` bắt buộc đạt. |
| `node tests/t181.js` | 3.223 chồng khít: bản trắng / thật / mẫu cùng số trang, cùng vị trí đoạn ±0,5 mm. |
| `node tests/t182.js` | 3.223 M1 lưu an toàn B1: KHO1 chụp / khôi phục, giữ 10 bản, xuất / nạp khai báo theo nhóm. |
| `node tests/t183.js` | 3.223 M2 sổ hộ vay đủ cột: thông tin thêm, chép sang phiếu, cần bổ sung theo mẫu. |
| `node tests/t184.js` | 3.223 M3 nền ô trên 01/TD: 3 kiểu in, cách từng ô, chữ dài thu nhỏ + ⚠, khai báo trực quan. |
| `node tests/t185.js` | 3.223 M8 lưu theo ngăn IndexedDB: chuyển lần đầu + giữ bản cũ, chỉ ghi ngăn đổi, dữ liệu > 5 MB, localStorage bị xóa mất, công tắc quay lại, IndexedDB bị chặn, xóa sạch, 2 máy giả lập. |
| `node tests/t179.js` (3.223.1) | chuẩn khóa Giấy lĩnh không lệch theo ngày chạy (chuẩn hóa "Ngày"). |
| `node tests/t186.js` | 3.224 scan mới: chọn loại, Tài liệu không ghép mặt sau, Văn bản rõ, bộ nút chuẩn, Lưu vào app không lên Drive khi chưa khai, chữ ký giữ nguyên mẫu ≤ 200 KB, ảnh khách 1 mặt CCCD. |
| `node tests/t187.js` | 3.225 đồng bộ Drive theo khối: 3 máy (1 máy cũ chỉ chimuc.json), chỉ gửi / tải file đổi, dấu xóa, chặn ghi trống, chimuc.json 1 lần / giờ. |
| `node tests/t188.js` | 3.226 Cài đặt theo khối: chia file khối, chỉ ghi khối đổi, không đổi không ghi, máy mới ↔ máy cũ qua cauhinh.json, xóa lan sang, gộp 2 máy, Máy cũ đã cập nhật hết, Lấy từ Drive, máy tắt đồng bộ khối. |
| `node tests/t189.js` | 3.227 Sổ hộ vay gộp tab: lọc khối LỌC ĐỊA BÀN (xã / tổ / hội, hộ chưa có tổ), ngày nhập (nút nhanh, từ ngày), sắp theo ngày nhập, nhóm theo tháng (gập, tích cả tháng, bản in), tích → Lập 03/TD; 📌 Ghim, ⬆ Lên 1 cấp, Backspace. |
| `node tests/t190.js` | 3.228 🔎 Kiểm tra hộ vay: luật khai báo (ngưỡng, mức, tắt), tuổi, CCCD, trùng CCCD / SĐT / tên gần đúng / vợ chồng (sổ + Mẫu 31), trong hộ, hộ đang vay (món, quá hạn, cùng CT), đổi tổ, theo chương trình; form (🔴 chặn lưu, ✓ Đã kiểm tra), lưới (chip, ô 🔎), Khai báo; GQVL số lượng + đơn vị. |
| `node tests/t191.js` | 3.229 Khai báo riêng 4 nguồn: nguồn ô (📊 / ⚙), ⌨ cho mọi ô tự động, 11/TD Bên A mặc định ⌨ (in như chung khi chưa gõ), gõ riêng chỉ đổi mẫu đó, riêng trước, chọn lại 📊, ✍, ⧉ chép, khai báo trực quan, tóm tắt, bản trắng. |
| `node tests/t192.js` | 3.230 R1 chuẩn hóa: "Có gì mới" 15 dòng + link, hàm mồ côi đã dọn, hàm phép thử giữ, thanh lọc Sổ hộ vay không bung, kiem.py thước đo trong mốc, bump.py tự cắt. · `node tests/do_bo_cuc.js [thư mục ảnh]` — đo bố cục 17 trang × 4 cỡ (bảng Markdown). |
| `node tests/t193.js` | 3.231 Bản điện thoại: gói số liệu xem (máy tính), tự chuyển trên điện thoại, đặt PIN, mã hóa trong máy, tra cứu không dấu, thẻ khách, lùi, địa bàn từng cấp (tổng khớp), khóa / PIN sai / mở lại không cần Drive, cài đặt, mở bản máy tính. |
| `node tests/t194.js` | 3.232 Điện thoại phần 2: thanh tab 5 mục, Văn bản (danh sách, lọc không dấu, mục chưa lên Drive), Scan (danh sách, 2 ảnh → PDF A4 bằng pdf-lib), bảng nút chuẩn Xem / Lưu máy / Lưu vào app / Đóng. |
| `node tests/t195.js` | 3.233 Điện thoại phần 3: máy tính lập bản mini GDX theo kỳ mới nhất (không đổi kỳ đang xem, số liệu xáo), điện thoại mở trong app (04/TD, 12/GDX, Giấy lĩnh), cất mã hóa, mở lại không cần Drive, dt-sw.js. |
| `node tests/t196.js` | 3.234 R2: bộ nhận lệnh data-lenh, ô rộng theo loại, bộ nút xuất (thứ tự, mờ không ẩn, Ctrl+P, Lưu vào app), lùi / tiến tab và mẫu, ◀ đóng hộp, hộp con giữ hộp cha, Sổ hộ vay theo data-lenh, hộ nhập bản cũ vẫn hiện khi lọc địa bàn, bảng trống có ✕ Bỏ lọc, tiêu đề bảng chế độ tối, Khai báo 390 px. |
| `node tests/t197.js` | 3.236 R3 phần 2: khuôn Word KTGS không nạp lúc mở app, `ktDocx` tự tải (giữ cờ in 2 mặt), tải đúng 1 lần, Kế hoạch năm tự tải trước khi xem. |
| `node tests/nhanh/thu.js` | 3.237 R4: phép thử NHANH lớp Nghiệp vụ (node, không trình duyệt, < 1 giây; `kiem.py` tự chạy) — chuẩn hóa chữ / ngày, hạn CCCD, thiếu thông tin hộ, kiểm tra tuổi, địa bàn, tổng gói điện thoại, khối cài đặt, thoát HTML, bộ nút xuất. |
| `node tests/t198.js` | 3.239: nút khung app theo data-lenh (tab, ✕ tìm, thùng rác, nền hộp, Gửi file trong khung xem), trả bộ nhớ ảnh tạm (xoayAnh, anhTam). |
| `node tests/t199.js` | 3.240: 01/TD bảng giữ 3 dòng, HSSV xuống dòng, chỗ ký UBND, 1 trang A4; 03/TD 1 hộ 3 dòng / trắng 5 dòng, theo 01/TD; khai báo riêng mở / tắt; phiếu cũ tự gắn Sổ hộ vay. |
| `node tests/t200.js` | (3.242) Form lập 01/TD: thứ tự tờ giấy, gõ Tab / Enter, ngày liền số, nơi cấp tự điền, hộ mới vào Sổ, Xã › Thôn › Tổ (Hội lọc), tự tính, loại công trình theo thẻ, tự có mặc định, Lưu / Làm trống / mở lại, hỏi lưu khi In / Mẫu 03, hộ cũ khóa nhân thân. |
| `node tests/t201.js` | (3.252) Khai báo riêng mọi mẫu nền ô: 💾 Lưu, ✕ Hủy / đóng chưa lưu trả lại, ↺ từng ô, ô gõ tự ra cột trái, nút thẻ chương trình. |
| `node tests/t202.js` | (3.253) Mẫu 06/TD Hồ sơ vay: khuôn KTGS, phần ghi theo hồ sơ điền sẵn, nhiều hộ / phiếu, Word, 01/TD In kèm 06/TD. |
| `node tests/t203.js` | (3.256) Giấy ủy quyền 01/UQ: form theo thứ tự giấy, chọn hộ từ sổ, thành viên ≥ 18 tuổi, người được ủy quyền = người đứng tên vay. |
| `node tests/t204.js` | (3.257) Rà form / bản in từng mẫu không lọt mẫu khác (01/GQVL, 07b, 01/UQ, 01/TGTV, 06/TD, 01/TĐCK, 01/TD) với hộ HSSV / GQVL. |
| `node tests/t205.js` | 3.259 Bộ thông tin tổ: KQGD từng điểm (24 cột, công thức), 3 sao kê chia Điểm › Hội › Tổ, Excel nhiều sheet (24). |
| `node tests/t206.js` | 3.260 Sổ cài đặt (Sao lưu › 🧾), khóa lạ, hàm con kéo đổi tên (5). |
| `node tests/t207.js` | 3.264 Scan lưu tập trung, Sắp xếp, Kiểm tra, đọc QR / mã máy đọc giả, bản photo 2 mặt, ảnh khách từ CCCD (25). |
| `node tests/t250.js` | 3.285 P1 🎯 Phân bổ KH — lõi `js/47-phan-bo.js` (node, không trình duyệt): chia đều / theo tỷ lệ, số chẵn 1 ấp lẻ, giảm không âm, chính xác = dư nợ thật + chênh, "(Chưa rõ ấp)", QT-16 khớp Đã giao / Đến 31/12, sửa tay, 3.000 tình huống ngẫu nhiên, gợi ý Đã giao, đầu năm theo QĐ, chọn kỳ, nhập file WPF. |
| `node tests/t251.js` | 3.285 cửa `KHO.duNoAp(kỳ)` với Mẫu 31 giả (node): gộp thôn × CT × nguồn, dòng lặp khế ước, CLOSE / dư nợ 0 / khách chỉ gửi TK bỏ, kỳ chưa có → null, nối `pbDuNoXa`. |
| `node tests/t252.js` | 3.293 P2 🎯 Phân bổ KH — giao diện (trình duyệt, bộ `gianho31`): nút tab con, cây xã → ấp, 📥 nhập file WPF giả, phân bổ tương đối / chính xác, số chẵn, sửa tay lệch → khớp, giữ ô, hộp QĐ (ngày liền số, gợi ý Đã giao, Đến 31/12 tự tính, ⚠ đứt chuỗi, lưu, tích thêm xã), không lỗi trang. |
| `node tests/t253.js` | 3.293 P3 📄 Biểu 07 Phân bổ KH (trình duyệt, bộ `gianho31` + QĐ giả): ngày thông báo né T7/CN, đơn vị xã / phường, chặn khi lệch QĐ, đúng form gốc `mau_goc/07pb.docx` (chữ, khổ, lề, cỡ, cột), 2 trang, chỉ ấp có tăng/giảm, ngày tự tính / chấm / gõ, Word .docx, 📦 mọi xã, sửa tay lệch → khóa. · 3.303: chuẩn hành chính — tên cơ quan góc trái 2 trang, bảng 13 / 83 / 32 / 32 số canh phải, đoạn canh đều thụt 1 cm, chấm mịn, tên loại 14 đậm. |
| `node tests/t255.js` | 3.301 📈 Diễn biến phân vốn theo KH (`pbDienBien` + màn, bộ `gianho31` + QĐ giả): KH hiệu lực bậc thang theo tháng, KH cuối năm, còn phải TH, %, theo xã, lọc, mốc QĐ, thẻ số, biểu đồ SVG, dòng thời gian, bảng xã → chi tiết, bản in, Excel 4 sheet, thẻ số màn phân bổ / đối chiếu · 3.302: dòng CT không giao, cột Dư nợ CT không giao / Tổng dư nợ thực tế. · 3.305: KH so tổng dư nợ mọi CT, thẻ + sheet nguồn TW / ĐP, KH CT không giao = dư nợ đầu năm / đợt giao mới nhất, chip ↑ / ↓. · 3.308: bảng so theo mốc cuối tháng, ma trận xã × CT (xoay, tách nguồn, tỷ). |
| `node tests/t256.js` | 3.308 🎯 Phân bổ KH — thanh tab ngang 4 mục (nhớ mục, phím 1 – 4, số lệch), chọn nhanh QĐ · xã, L1 vượt KH đỏ, L3 QĐ chưa ghép xã, L5 CT phát sinh giữa năm, L6 giữ sửa tay + ↺ Chia lại, bản chụp Biểu 07 đã xuất, bảng gọn. |
| `node tests/t254.js` | 3.301 🔎 Đối chiếu chéo phân bổ KH (`pbDoiChieu` + màn, bộ `gianho31` + QĐ giả): ngưỡng, đứt chuỗi, đầu năm ↔ dư nợ 31/12 năm trước, cả năm ↔ Đến 31/12 QĐ cuối, nhập lệch, Biểu 07 lệch, xã chưa có ấp, tóm tắt, chỉ nhóm lệch, thực tế tham khảo, bản in, bấm dòng → phân bổ. |
| `node tests/t240.js` | 3.328 Cửa KHO cho KTGS: chotThang, theoNgay, bc37 / bc38 (BC0437 giả), t105Truoc, monGN khớp hàm cũ, không gán KT_*. |
| `node tests/t241.js` | 3.328 Cây địa bàn: mặc định ☰ Gọn mọi tab, ▦ Chip, ⬆, mở lại app về PGD, 📌 ghim giữ địa bàn + kiểu, điện thoại. |
| `node tests/t242.js` | 3.328 Cây nhúng CAY: danh sách Xã / Điểm / Ấp / Tổ, 👪 Hộ vay, ⚙ Khai báo chung. |
| `node tests/t243.js` | 3.328 Thanh bên 2 cấp (nhóm, tô theo nhóm, GDX › Tra cứu KH › quay về, thu gọn) + thanh dưới điện thoại 5 nút + ☰ Thêm. |
| `node tests/t244.js` | 3.333 QT-18 thành viên chuẩn (bù 01/TV, có dư nợ = gốc), Tra cứu KH khung cố định + khối Tổ & địa bàn, bảng tổ của điểm GD theo Hội (cộng, ngưỡng 20–100), kết nạp gọi form Hộ vay, chip 7 màu. |
| `node tests/t245.js` | 3.334 Đợt 1 bố cục: dải chip mẫu cuộn ngang + ‹ ›, Số liệu / Khai báo xuống dòng tên mẫu, tiêu đề không lặp, nút xuất mờ gọn (Gửi 1 hàng), chip BC0437/0438 ở thanh khối KTGS, Tra cứu KH có sẵn danh sách, ô Xã gọn. |
| `node tests/t246.js` | 3.335 Tra cứu KH: dải tìm + lọc toàn trang, chip Tìm theo 9 loại (Tên KH, vợ/chồng, CCCD, mã KH, món vay, Số TK 105 từ Sao kê giả…), kiểu bảng ↔ thẻ, bấm dòng mở chi tiết. |
| `node tests/t246.js` | 3.335–3.336 Tra cứu KH: dải tìm + lọc toàn trang, chip Tìm theo 10 loại (Tên KH, Tổ trưởng, vợ/chồng, CCCD, mã KH, món vay, Số TK 105…), kiểu bảng ↔ thẻ, thẻ tổ (số TV QT-18, thành viên, nút), gợi ý tổ ở Tự nhận. |
| `node tests/t247.js` | 3.337 Tra cứu KH: ngày đến hạn tô màu (quá hạn / 30 / 90 ngày, GH), thẻ khách gọn 1 khung + bảng món vay không tràn ở 1366 và 1920 px, danh sách tình trạng chữ nhỏ cùng dòng tên. |
| `node tests/t248.js` | 3.338 🩺 Sức khỏe sao lưu: màu theo tuổi (≤ 2 / 3–7 / > 7 ngày, chưa có), chưa nối Drive, đếm file chưa lên Drive, mức xấu nhất, thẻ ở ⚙ › 💾 Sao lưu trước bảng 📸. |
| `node tests/t249.js` | 3.340 dữ liệu > 1 MB: bỏ bản sao localStorage, dấu chờ, mở lại trang đọc IndexedDB đủ 6.000 mục, không báo đầy; nhỏ lại → ghi localStorage như cũ. |
| `node tests/t246.js` | 3.335–3.344 Tra cứu KH: dải tìm + lọc, chip Tìm theo 10 loại, kiểu bảng ↔ thẻ, thẻ tổ (3.344: đầu thẻ 3 hàng có tên cột; bảng thành viên STT · mã KH sắp theo mã · CT · dư nợ · ngày vay · hạn trả · lãi tồn · TGTK, Đủ / Gọn, bấm CT / ▸, không tràn), gợi ý tổ. |
| `node tests/t246.js` | 3.335–3.345 Tra cứu KH: dải tìm + lọc, chip Tìm theo 10 loại, kiểu bảng ↔ thẻ, thẻ tổ (3 hàng có tên cột; bảng thành viên Đủ / Gọn, bấm CT / ▸; 3.345: cột Họ tên cân đối, khách không còn món ghi trong tổ / cho ra), gợi ý tổ. |
| `node tests/t257.js` | 3.347 tvChuan kỳ ngày không bù Mẫu 01/TV (kỳ tháng vẫn bù); Tra cứu dựng theo số liệu mới nhất (ngày). |
| `node tests/t258.js` | 3.348 📜 nhật ký đã lập / in: ghi từ hàng nút xuất, tiêu đề dự phòng, thẻ khách / tổ / hộp lọc, gộp máy khác theo id, 13 tháng, còn sau tải lại. |
| `node tests/t258.js` | 3.348–3.349 📜 nhật ký đã lập / in (ghi, tiêu đề dự phòng, thẻ khách / tổ / hộp, gộp máy khác, 13 tháng, còn sau tải lại) + nút `data-lenh="hop.dong"` đóng hộp. |
| `node tests/t246.js` | 3.335–3.350 Tra cứu KH + thẻ tổ (3 hàng, bảng thành viên Đủ / Gọn, cột cân đối, tình trạng khách không còn món + ngày tất nợ). |
| `node tests/t246.js` | 3.335–3.351 Tra cứu KH + thẻ tổ + bảng tổ (đủ mọi tổ, cột Thành viên sau Mã tổ). |
| `node tests/t258.js` | 3.348–3.353 📜 nhật ký đã lập / in (+ KTGS Mẫu 06 ghi tổ / hộ) + nút `hop.dong`. |
| `node tests/t259.js` | 3.355 nền báo cáo bảng `DANG_KY` + Danh sách nợ cần xử lý (khuôn in chuẩn, nhóm, Excel, nhật ký). |
| `node tests/t259.js` | 3.355–3.356 nền báo cáo bảng `DANG_KY` + Danh sách nợ cần xử lý + 🧩 Báo cáo của tôi (tự khai từ Mẫu 31, đối chiếu TW). |
| `node tests/t300.js` | 3.357 Sổ tổ viên / chốt sổ 31/12 (tvChuan + bù 01/TV, tiêu đề chốt tháng 12, chip Gồm, ngày tất nợ, hỏi trước khi xóa ô tháng 12). |
| `node tests/t301.js` | 3.358 năm sau dùng sổ chốt 31/12 (tvChuan gắn sổ, Sổ tổ viên, đối chiếu 01/TV lý do tất nợ năm trước, dựng sổ từ bộ tháng 12). |
| `node tests/t302.js` | 3.359 📅 dòng thời gian khách / tổ (tóm Mẫu 31 từng tháng, sự kiện vào / ra / chuyển tổ, tất nợ, QH, đổi tổ trưởng, khối ở thẻ khách + thẻ tổ). |
| `node tests/t302.js` | 3.359–3.360 📅 dòng thời gian khách / tổ (tóm Mẫu 31 từng tháng, sự kiện vào / ra / chuyển tổ, tất nợ — còn lãi tồn = chưa tất nợ, QH, đổi tổ trưởng; khối ở thẻ khách + thẻ tổ). |
| `node tests/t303.js` | 3.361 bản máy tính trên điện thoại Đ1: css/dt-may.css chỉ nạp ≤ 600 px, đầu trang / Lọc địa bàn gọn, chip vuốt ngang, máy tính 1440 không đổi. |
| `node tests/t304.js` | 3.362 điện thoại Đ2: thẻ khách món vay thành thẻ (CSS), ô kỳ chữ gọn, thẻ tổ không tràn ngang; máy tính 1440 không đổi. |
| `node tests/t305.js` | 3.363 nhật ký lỗi: bắt lỗi chạy + lời hứa, cộng dồn lỗi trùng, chip ⚠ ở chân trang, hộp xem / xóa, bỏ qua lỗi tải ảnh. |
| `node tests/t306.js` | 3.364 điện thoại Đ3: Hôm nay — ô lịch ≤ 36 px, sổ ngày trong màn hình đầu, không tràn ngang, đủ nút; máy tính 1440 không đổi. |
| `node tests/t307.js` | 3.365 Đ4 + sửa lỗi: bảng tổ vuốt ngang — ô tiêu đề góc không bị đè (điện thoại + máy tính 700 px), cột tên ≤ 42% bề ngang ở điện thoại. |
| `node tests/t308.js` | 3.366 Đ5: khung xem trước — điện thoại thanh 1 hàng, nút ≥ 34 px, ẩn ⏮ ⏭; chụm 2 ngón đổi mức phóng + chặn phóng cả màn hình; máy tính 1440 như cũ. |
| `node tests/t309.js` | 3.368 Tra cứu › Tổ trưởng: danh sách tổ đủ 7 cột không cuộn ngang ở 1280 / 1366 / 1920, mã tổ đủ, Hội viết tắt (title tên đủ). |
| `node tests/t310.js` | 3.369 tối ưu nạp: `slNen` / `slMoBang` mới = thuật toán cũ (giữ bản cũ để so), dò Mẫu 01/TV trong 100 dòng đầu vẫn nhận dòng tên cột ở dòng 30. |
| `node tests/t311.js` | 3.372 Đ6 điện thoại: thanh dưới Hôm nay · Tra cứu · Văn bản · Scan · Thêm, đầu trang gọn, Tra cứu gọn, ☰ Thêm có 📱 + ⏱ đo tốc độ (ghi Dựng kỳ); máy 1440 / 900 không đổi. |
| (3.386.2) | t276 chụp lại b105. |
| (3.386.1) | t276 chụp lại b105 (chữ nhỏ). |
| (3.386) | t205 nới tên ngắn báo cáo THHD (màn xem chỉ ghi tên ngắn). |
| (3.385.1) | t276 chụp lại `dh` (khổ dọc mặc định). |
| t279 | (3.385) Sao kê theo nhà đầu tư: ô chọn sổ sẵn mã NĐT, chia NĐT › CT › tổ, tổng khớp Mẫu 31, chọn 1 NĐT, lọc địa bàn, tên NĐT, 👁 Xem (8). |
| (3.384.1) | `tests/tro_thxem.js` (thXem chuyển khỏi app) cho t105 / t148 / t196; t192 canh 9 hàm đã gỡ; hoiquy bỏ N1, t114 bỏ 2 ý ktDsLTC. |
| (3.384) | t158 sửa ý cột Tự động (hết chỗ thì không thêm là đúng). Hồi quy theo đổi: `tools/hoiquy_pt.py` + `hoiquy.sh … doi`, mốc `tests/hoiquy_moc.json`, bảng `docs/DA_CHOT.md`. |
| t278 | (3.383.7) Lọc địa bàn: đổi cấp cao → cấp thấp về Tất cả, dải tiêu đề, 📌 từng ô; Tra cứu: dòng cộng cấp lọc cuối, nút 📊 Biến động TK 105 (9). t241 viết lại: mở lại app giữ địa bàn / ghim từng ô / Về ghim. |
| (3.383.6) | t141: tìm tổ đã đóng không ra; có DS → tổ còn dư nợ không trên DS cảnh báo, dư nợ 0 không trên DS ẩn; thiếu DS → còn TK 105 = cần đóng (35). |
| (3.383.5) | t277 +2: danh sách tổ có dòng cộng theo lọc; nút ✕ ô tìm (17). |
| (3.383.4) | t277 +1: ô dư nợ thẻ tổ tô màu QH / khoanh / 3T KHĐ (gán tạm qh / kn cho món giả) (15). |
| (3.383.3) | t277 +1: nhãn TT / TP cạnh tên tổ viên (gán tạm tổ viên giả làm TT / TP) (14). |
| (3.383.2) | Chỉ CSS — t309, t277, t156 đạt. |
| (3.383.1) | Chỉ CSS canh cột bảng Tra cứu — không thêm phép thử. |
| (3.383) | t277 mới: lọc Xã + Hội / Xã + Ấp / Xã + Hội + Ấp / Hội toàn PGD, ô thu chéo + số tổ, phạm vi có ấp, dòng Tất cả + nút ✕ (giữ ô khác, mờ khi tất cả), Tra cứu bố cục mới, lọc 1 dòng không cắt chữ, thẻ tổ bỏ Đã lập / Dòng thời gian (13). |
| (3.382) | t276 mới: bản chụp kết quả 64 báo cáo (Sao kê, tab Tổ, Tổng hợp, kiểm Nạp TW) — chuyển sang đọc kho phải giống hệt; `--chup` ghi lại khi anh duyệt đổi báo cáo. |
| (3.381) | t275 mới: KHO CHUẨN — toKhach qua kho giống hệt cách cũ (mọi tổ, mọi khách), gốc = mảng Mẫu 31 + chỉ mục, gắn TK 105 (2 TK) / 104 / tổ / Nợ QH theo khóa, kỳ từng nguồn, hoVay, gốc không bị sửa, KU hủy giữ riêng (9). |
| (3.380.1) | t274: cột theo thứ tự dòng tiền + tiêu đề có ngày số dư, bảng hv105 / ô gc. |
| (3.380) | t274 mới: dữ liệu Hộ vay + báo cáo biến động TK 105 — cột, xếp mã KH, 🏦 công thức khách chuyển vào, 2 CT ghi chú, ⏳, 💵? âm, 2 TK 105 cộng, 💵? không TK, 🟠, tổng cộng, tóm tắt, KHO.hoVay / hoVayKH, chưa nạp Sao kê (17). |
| (3.379) | t273 mới: 📋 Tóm tắt tổ — nút ở 🎯 Đột xuất + 📅 Định kỳ (mỗi dòng tổ, n tổ 1 file mỗi tổ 1 trang, số liệu cuối tháng), số liệu đến ngày, đầu trang, 8 ô số khớp ktSoTo, chương trình cộng = dư nợ, hộ cần quan tâm xếp ưu tiên, quá hạn đỏ, 4 nhóm 727 + mục V, quá 18 hộ cắt, tên file, vừa 1 mặt A4 (15). |
| (3.378) | t272 mới: Mẫu 16 Ưu điểm / Tồn tại / Kiến nghị chọn riêng (HTML + Word), Bảng II theo ô (2 dòng có số), dữ liệu cũ nx / b2 'cham', hộp 3 + 2 ô, lưu riêng bộ đột xuất, dòng tóm tắt, ✚ Điền đầy đủ, Mẫu 04 Nhận xét / Kiến nghị riêng (14). |
| (3.377) | t271 mới: báo trùng CCCD lúc đọc ở tab Scan (theo mã KH, theo số CCCD hộ chưa có mã, thẻ mới không báo, mặc định Thay), Thay → bản cũ vào 🗑 / Lưu thêm giữ, Quét ở form Thay / Lưu thêm, ⏱ ở chân thanh bên, Scan có ▣ (8). |
| (3.376) | t270 mới: chip báo khi mở hộp nằm đầu màn hình + bấm xuyên (máy tính, điện thoại), chip có nút vẫn bấm được, ⏱ ghi các bước quét (5). |
| (3.375) | t269 + mục nút ▣ Xem trước: ẩn khi khung mở, hiện góc trên phải khi tắt ✕ / thu tự động, bấm mở khung (9). |
| (3.374) | t264 viết lại: chip năm / loại (không còn Đã ghim), xem PDF trong app, chỉ còn Gửi · Lưu máy, dọn file ghim cũ, danh mục cất máy, mất mạng báo "chỉ xem khi có mạng", chưa lên Drive (12). |
| (3.373) | t268 mới: Drive — dùng lại quyền còn hạn, quyền sắp hết không dùng, tự nối hỏng không báo nổi + ⏱ ghi lý do, xin lại ngầm hỏng giữ nối, hàng chờ không báo nổi, câu chưa nối thống nhất + số chưa lên trong chip, điện thoại chip ngắn chỉ hiện khi cần (7). t269 mới: bố cục Đợt A ① ② ③ ⑥ (7). |
| (3.371) | t267 mới: điện thoại Văn bản (hàng nút không cắt, bớt nút, trích yếu 2 dòng, ≥ 5 / màn), Scan (bỏ chữ lặp, thẻ đầu lên sớm); máy tính không đổi (6). |
| (3.370) | t266 mới: mã điểm ngắn → TXN đủ (đúng xã / xã khác / đủ sẵn / không có → giữ / trống), số liệu giả cắt mã ngắn → tab + 12/GDX in mã đủ, khóa điểm giữ; điện thoại mở index.html ở lại bản chính, cờ cũ, 📱 → dt.html, 🖥 về (8). |
| (3.354) | t265 mới: Hôm nay trang đầu, âm lịch (24/10 = 15/9, Tết 2026), lịch tháng, thêm việc lặp tuần + lưu ý, sắp tới, tick việc lặp theo ngày, ghi chú dòng (Enter / Thêm / tick / xóa), cất mã hóa + mở lại, sửa / xóa "chỉ ngày này", gộp chéo với `gopLich` máy tính và ngược lại, Khách chưa có số liệu có nút Tải (19). |
| (3.352) | t264 mới: chip Văn bản (năm, loại, Đã ghim), xem PDF trong app (canvas đủ trang, vừa ngang), ghim cất mã hóa, trần 200 MB, mở lại không mạng (danh sách + văn bản ghim), báo lỗi chưa ghim / chưa lên Drive, bỏ ghim (18). |
| `python3 tools/ra_kho.py` (3.341 · 3.346) | đếm theo file chỗ đọc thẳng kho số liệu — sau K1–K5 chỉ còn lõi (22-so-lieu, 22g, 22k, 28, 29) + đọc sâu kỳ riêng của tab (`docs/RA_SOAT_KHO_2410.md` mục 4). |
| (3.343) | t263 mới: gói xem có lãi tồn / GH / mã KH TT; 8 chip Tìm theo + nhớ; tìm Vợ/chồng, Tên, CCCD, Khế ước, Tổ trưởng (tên / mã tổ / trống); thẻ khách 5 ô + hạn tô màu; thẻ tổ; Vừa xem (18). |
| (3.342) | t262 mới: điện thoại tạm bỏ PIN, thanh 4 nút, 🖥 mọi trang, 📍 Địa bàn, GDX trong ⚙, dòng kỳ tự cập nhật, 📱 về bản điện thoại (17). t193–t195 bật cờ PIN. |
| `python3 tools/ra_kho.py` (3.341) | đếm theo file chỗ đọc thẳng kho số liệu (biến + hàm tầng dưới) — tiến độ chuyển qua `KHO` (`docs/RA_SOAT_KHO_2410.md`). |
| (3.339 tách file) | `node tests/t138.js` kiểm thứ tự nạp gồm 04 + 04b–04e, 06 + 06b–06c; `tests/hssv_exe.js` đọc công thức HSSV ở `js/04b-hom-nay.js`. |
| (3.332) | t134 tên thẻ Định kỳ mới (khối Bắt buộc). Hồi quy 3.330: t100, t158 sai từ trước 3.327 — chưa sửa. |
| (3.331) | Không thêm phép thử — bàn giao KTGS: bộ phải giữ ghi ở `docs/BAN_GIAO_KTGS.md` mục 5. |
| (3.330) | t238 mới: thanh 3 khối, thẻ con nhớ lần trước, màn Bộ khai báo sửa ① / ② không mở hộp, chép ① → ②, Mẫu 04 đột xuất, tích tổ theo lịch, ô tích data-lenh (17). t108 / t109 / t118 theo thanh khối. |
| (3.329) | t237 mới: Tháng kiểm tra khối Bắt buộc (mặc định, đổi tháng nạp số liệu tháng trước, ô đầu trang giữ, Mẫu 16 / 04 theo tháng), Sau GN 1 tổ × 1 tháng, nhắc 30 ngày, hộ theo Mẫu 31 tháng GN (16). t106 đếm tổ × tháng; t110 dòng Tháng kiểm tra. |
| (3.327) | t236 thêm: hộp in chọn bộ ① / ②, mở hộp mới về mặc định, Bảng II cả bảng + từng ô (chấm / gõ / trống), cả bảng trống như cũ (26). t110 bỏ ô b2o khỏi danh sách id; t114 Mẫu 16 tự ghi tháng chỉ ở định kỳ; t116 tên file KH theo 3.140.2. |
| (3.326) | t110 hộp chọn theo 3.323 (dvc, không dv chung); t236 bấm nút data-lenh ktdx.khai (21). |
| (3.325) | t236 thêm: số liệu tổ = Mẫu 31 ngày chọn (không lấy dư nợ BC0437 giả), xếp loại BC0437 tháng 09; Mẫu 16 đến thời điểm = ngày chọn + chấm điểm tháng 09/2026; đột xuất ngày tháng năm chấm; định kỳ vẫn ghi tháng (20). |
| (3.324) | t236 thêm: dòng Khai báo đột xuất trong tab, khai đơn vị ở 06 → 16 nhận theo, đóng hộp cập nhật tóm tắt (16). |
| (3.323) | t236: đột xuất khóa riêng dx_m06 / dx_m16 (m04 chung); mặc định theo Hội; khai tên đoàn + cán bộ → Mẫu 06 / 16 (đầu trang, ĐOÀN KIỂM TRA, 2 cán bộ); số liệu vẫn ghi sẵn; Bảng II chấm; đơn vị để chấm 06 / 16; chế độ khác không đổi; hộp chọn có ô + nhãn riêng, sửa ô lưu khóa riêng (13). |

| (3.321) | t235: tổ trưởng giả (CCCD chỉ ở bảng tổ) → tra theo CCCD đúng tổ, tên tổ trưởng theo danh bạ tổ, trùng thì không nhận bừa, CCCD lạ null; hộp Sửa: ô tên = tên tổ trưởng + CIF + tổ; không có ở đâu → tên trên thẻ (QR); nút tổ bày sẵn, bấm chọn (9). |

| (3.319) | t234 thêm: nơi cấp dài → viết tắt Cục CS QLHC về TTXH, không font-size nhỏ; chữ quá dài → ⚠ "dài hơn ô" (24). |


| (3.316) | t234 thêm: form khai nhanh 5 ô + chọn xã / ấp, ngày ISO, tự tính ☒ Nữ theo CCCD · Kinh · ☒ Có cư trú · hạn CCCD · nơi cấp, dòng Tự tính (22). |
| (3.315) | t234: 01/TGTV 3 nguồn — Mẫu 31 tích mặc định chưa có TK 105 + in lại người đã có TK, tự khai trống = mẫu trắng, chữ gõ in (in hoa tên, ngày, ấp, xã, ô chấm mặc định), gõ trống giữ chấm, nơi cấp / CCCD 12 ô, ☒ nghề, tên file, không rò OM_TAY, Bản trắng, chép từ Mẫu 31, bấm ô trên bản xem → hộp đúng mục, Enter sang mục kế, ☐ giới tính, Khai người mới (18). |
| (3.314) | t233: Bảng kê Thu / Chi — mặc định Chi, mục Loại đứng đầu, Chi giữ chữ cũ, Thu đổi tiêu đề / người nộp / người nhận, cùng khung mệnh giá, tên file, tóm tắt (8). |

| (3.312) | t232: Giấy nộp tiền — mẫu trong danh mục, tiêu đề / chi nhánh / ngày / VND, người nộp = người nhận, TK CÓ, nội dung mặc định 105 / 104, bằng chữ + Cộng, 5 chữ ký, A5, Để chấm người nhận, Bảng kê nộp (chia mệnh giá, người nộp / nhận), in chung A4, mẫu trắng, Bảng kê chi ra không đổi, bản chụp gn không kiểm số dư, cảnh báo người nộp, tên file (14). |
| (3.311) | t231: 17 inch / laptop 125% mở Hạn trả HSSV — lịch thu gọn, công cụ không cuộn, câu chốt trong màn, tiêu đề không tràn; đóng → lịch lại; màn cao giữ nguyên (6). |
| (3.310) | t230: phân kỳ 24 tháng từ ngày giải ngân (16,6 · 16,6 · 16,8 tr), 36 / 84 / 12 tháng, gốc lịch theo ngày ký khi chưa giải ngân, phương án k = 1, 🎲 đổi k, ô gõ tay giữ, k tự gán, 07b in lịch + giữ chữ mẫu, 01/GQVL in phương án, ③ có tự tính / Đổi số / Ngày giải ngân / In kèm Phê duyệt, Phê duyệt NH in riêng đủ số, in chung sau 01/GQVL (15); t163, t170, t174, t204 sửa. |
| (3.309) | t229: menu ⋯ Scan bỏ 3 mục trùng, điện thoại bỏ Thẻ / Tài liệu + 📁, khung xem có dải chữ ký dưới CCCD (tài liệu không), Hồ sơ của khách bỏ 🧑 Ảnh, nét giống chữ ký mà đọc được số thẻ → Ảnh CCCD, dữ liệu rà ở 3.306 tự rà lại (nhóm đúng hiện, không tích), mốc 3.309, moKyAnh đóng hộp (9); t147, t211, t215, t227 sửa. |
| (3.307) | t228: bản photo giả — đo nền / chữ / chấm / ảnh chân dung cho Photo rõ, Xám, Giấy trắng, Magic, Đen trắng cũ và mới; ảnh màu Magic giữ y cũ; Bản photo mặc định Photo rõ (7). |
| (3.306) | t227: nhận dạng chữ ký / lăn tay / thẻ QR / ảnh trắng, lưu chữ ký là ảnh CCCD bị chặn, chữ ký / lăn tay lưu được (kieuKy), ảnh trắng hỏi, ✍ Rà chữ ký tích sẵn mục nhầm → Thùng rác, mốc rà, không tạo ảnh khách, xuất Ảnh = mặt trước ≤ 200 KB, Quét gì? Bản photo CCCD, tờ photo 2 thẻ tách đúng khung (14); t186, t207, t226 sửa. |
| (3.304) | t226: cột Ck (cùng mã KH / cùng tên khi chưa mã, tài liệu không hiện), nút 💾 chỉ dòng CCCD, khung xem Scan tỉ lệ 3, hộp Xuất (Ảnh chưa có thì mờ), xuất 2 file tên chuẩn vào thư mục giả, CCCD ghép ≤ 200 KB, nhớ thư mục, bỏ tích → chỉ Chữ ký, bản không ảnh mặt thẻ báo lý do (9). |
| (3.300) | t225: đồng hồ (đang chạy đếm giây, xong ≥ 1,5 giây báo kèm thời gian, việc nhanh không ghi), bộ đọc chữ khởi động 1 lần, ảnh 1 thẻ không đọc mảnh, bộ nhớ tạm PDF Drive / dựng từ ảnh, khung xem đếm giây (8). |
| (3.299) | t222 thêm: tổ "mã — tên" chỉ hiện tên, cột Tên rộng hơn cột Tổ trưởng (3). |
| (3.298) | t223 thêm: Rà 3 thư mục — bản 01GQVL ở Hồ sơ scan vào khối Sai thư mục, ✔ dời về Hồ sơ vay tên chuẩn; PDF tài liệu thả tay nhận vào app (8); t208 sửa Drive giả. |
| (3.297) | t224: tài liệu mẫu hồ sơ vay → thư mục Hồ sơ vay, hộ mới khóa số CCCD, Quét bản đã ký điền sẵn → Lưu vào tủ tên chuẩn, Hồ sơ của khách có 01TD, hộ mới không vào Chờ sắp xếp và đổi khóa khi có mã KH (6); t200: nút 📷 Quét bản đã ký (23); t207 sửa thư mục. |
| (3.296) | t200 sửa: Lưu 01/TD tên chuẩn (số CCCD - Họ tên - 01TD) + dòng phụ tổ · ấp; bản cũ đổi tên giữ tên cũ (22). tests/nhanh: tcKhoa, tcLoaiMau (37). |
| (3.295) | tests/nhanh thêm: tcTen, tcSoThu, tcDuong + duongScan dùng chung (35). |
| (3.294) | t223: Rà Drive file thả tay — nhóm theo khách, Nhận vào app (PDF + 2 ảnh tên chuẩn; chỉ ảnh → dựng PDF; PDF lạ → Chờ sắp xếp); tải ảnh ≤ 2 cùng lúc; Dọn ảnh tải về (6). |
| (3.292) | t222: bảng Scan có cột Tổ trưởng sau Ấp — tổ khai trên bản / theo mã KH trên Mẫu 31 (2); t147 sửa thứ tự cột. |
| (3.291) | t221: lưới Bản vừa quét (Thẻ) — ◀ ▶ ▲ ▼ từng mặt, mép tắt nút, chọn + phím mũi tên, nút 🔄 Lật (6). |
| (3.290) | t220: lượt quét nhiều người vào Chờ sắp xếp — tên theo thẻ đọc được + số CCCD, người chưa đọc giữ tên tự đặt, bản cũ đổi tên khi Sắp xếp đọc ra số (4). |
| (3.289) | t219 thêm: ảnh HEIC GIẢ (`tests/mau_anh/the_gia.heic`) — nhận nhãn HEIC, đổi JPG đúng cỡ / màu, dán ở tab Scan vào hàng quét (8). Thư viện thử: `heic-to@1.6.5` trong `tests/lib`. |
| (3.288) | t219 thêm: dán 1 ảnh hỏng (HEIC) + 1 ảnh tốt — ảnh tốt vẫn vào hàng, báo tên ảnh hỏng (5). |
| (3.287) | t219: dán file theo tab — Hôm nay chỉ báo, Văn bản thêm văn bản, Scan vào hàng quét Thẻ, hộp Quét CCCD nhận ảnh (4); t106 sửa: dán ở tab Văn bản. |
| (3.286) | t218: 🪪 Đọc số CCCD — tài liệu đọc chữ số ra số → tự tra, không thấy → hộp quét CCCD → tự tra, gõ 12 số tự tra, nhiều số ưu tiên số trên Mẫu 31; nút Xóa đỏ + Xóa n bản đã tích (9). |
| (3.284) | t217 thêm: dòng trạng thái nhìn thấy ở khung phải máy tính, cách dò 2 (thẻ gần trắng cạnh nhau / chồng dọc / trang trắng), bản hỏng cách cũ thử lại (21). |
| (3.283) | t217 thêm: CCCD cũ che trống vẫn tách + báo; ảnh ghi có mà không tải được → báo đỏ + Tách 2 mặt từ PDF (17). |
| (3.282) | t217 thêm: in nhiều CCCD 4 / A4 — bản cũ tự tách rồi ghép, bản không tách được không ghép + báo tên (15). |
| (3.281) | t217 thêm: dòng trạng thái tách 2 mặt (đã tách / không tách được + lý do / chưa nối Drive / ảnh lúc quét), Thử tách lại, Rà khối bản hỏng (13). |
| (3.280) | t217: CCCD cũ chỉ có PDF mở xem tự tách 2 mặt, dò hỏng xem PDF, Rà gồm bản cũ chưa tách; tài liệu cùng loại đánh số không báo trùng (8). |
| (3.279) | t214 thêm: tài liệu chỉ có PDF trên Drive — Tra Mẫu 31 rồi Lưu được, Tải trang từ Drive (14). |
| t216 | (3.278) 🗂 Quản lý hồ sơ scan 1 nút / 3 thẻ, Khai hàng loạt trong thẻ Chờ; 🗄 Lưu vào tủ tự nhận khách (đọc CCCD / Tên file / chưa rõ → chờ) (8). |
| t215 | (3.277) Sửa nhanh Scan: tên " (2)" khi khách nhiều bản, gộp thanh chưa khai, chữ Chữ ký, in PDF gốc khi ảnh cắt chưa duyệt (6). |
| (3.276) | t213 thêm: khung công cụ Hạn trả HSSV cao tới đáy cửa sổ (9). |
| t214 | (3.275) 🔎 Tra Mẫu 31 cạnh ô tên tab Scan: hộp Sửa (CCCD → gắn khách + địa bàn + tên chuẩn), mã KH, trùng tên ưu tiên tổ, Enter, Lưu mới, Chữ ký / Ảnh (11). |
| t213 | (3.274) Ảnh 1 thẻ không chia đôi dù tích "photo 2 mặt", tờ 2 thẻ vẫn chia, quét mới bỏ tích; Magic khử ám vàng / xanh, giữ màu thẻ (8). |
| t212 | (3.273) 🪪 Quét CCCD điền form: nút cạnh Họ tên (Sổ hộ vay, 01/TD), ảnh có sẵn (QR giả) → hộp xác nhận → Điền + lưu tủ, lấy từ tủ, tên Mẫu 31 khi thẻ không dấu, camera giả (16). |
| t211 | (3.272) Khung xem phải: dòng "Hồ sơ của khách" gom CCCD / chữ ký / ảnh / tài liệu, thiếu ✗, bấm chuyển xem (5). |
| t210 | (3.271) CCCD 3 file lên Drive (Drive giả 2 máy): đổi tên / dời / thùng rác theo PDF, đưa ảnh bản cũ, máy B tự tải ảnh, cắt 2 thẻ từ PDF (PDF gốc giữ), Rà "Ảnh cắt từ PDF", bảng đối chiếu, CMND 9 số (15). |
| (3.270) | t209 thêm: Mẫu 31 ngày mới nhất → Kiểm tra dùng kỳ ngày, Sắp xếp ghi kỳ (17). |
| t209 | (3.269) Đọc CCCD ảnh cả tờ 2 thẻ (mã máy đọc + QR nhỏ, Tesseract trong máy), QR khác mẫu, đọc lại bản cũ đọc hỏng, trùng tên theo ngày sinh, màn Sắp xếp hiện số Mẫu 31 + ảnh thẻ, tổ chọn khi quét (mã tổ), PDF trên Drive khi máy không có ảnh (14). |
| t208 | (3.268) 🔎 Rà CCCD đã lưu: đúng / sai khách / CMND cũ / lệch số / không phải chủ hộ / ngoài Mẫu 31 / 2 mã KH / hết hạn / không đọc được; bản trùng (giống hệt, trước+sau); Drive giả lập (28). |
| (3.267) | t207 thêm: màn Sắp xếp rộng, nút tròn / ô tích, nút đáy đếm số bản (38). |
| (3.266) | t207 thêm: Sắp xếp đọc số CCCD từ ảnh (QR giả) → hết trùng tên, chữ ký cùng tên gợi ý (37). |
| (3.265) | t207 thêm: quy tắc khớp ≥ 2 trong 3 (CCCD · mã KH · tên), gợi ý chờ xác nhận (30). |
| (3.263) | t205 viết lại: KQGD, THHD theo 5 cấp, 3 sao kê riêng (37). |
| (3.262) | t205 thêm: Số hộ / Số hộ đang có dư nợ, nhãn kỳ ngày / chốt tháng, đơn vị tính trên bảng, KQGD xã liền sau điểm, 3 nút sao kê riêng, NK in A4 dọc (35). |
| (3.261) | t205 viết lại: khung đủ sheet như file tổng hợp, cột theo file, bản in cột chính (28). |
| (3.258) | t204 thêm 2 phép thứ tự chip Hồ sơ vay + 01/TD tách theo chương trình (13); t163, t170 đếm 11 chip. |
| (3.255) | t202 thêm 4 phép khai báo riêng 06/TD (12). |
| (3.254) | t201 thêm 5 phép cỡ chữ 13 / 13,5 / 14 (16 phép); chuẩn khóa hst_01bg_*, hsv_01td_*, hsv_01uq_*, hsv_09a_* ghi lại. |
| (3.251) | t199 thêm phép ĐTTH HSSV trên 03/TD (18 phép); chuẩn khóa hsv_03td_so ghi lại. |
| (3.250) | chuẩn khóa hsv_01td_* ghi lại (UBND 4 dòng, NH 2 dòng). |
| (3.249) | t199 UBND ≥ 3 dòng; t164 kẻ tiêu ngữ mới; t180 01/TD lề trên 7 mm; chuẩn khóa hst_01bg_*, hsv_01td_*, hsv_01uq_*, hsv_09a_* ghi lại. |
| (3.248) | t199 NSVSMT +1 dòng chấm; t184 Họ tên in liền + Năm sinh cách 1 tab, thu nhỏ chữ thử ở 09A; chuẩn khóa hsv_01td_* ghi lại; t181 chồng khít đạt với chấm mảnh. |
| (3.247) | t199 thêm 3 phép in 01/TD như đánh máy + hsoHoiNgan; t172, t180, t181, t184 theo chữ 14; chuẩn khóa hsv_01td_* ghi lại. |
| (3.246) | t163, t164, t171, t172, t192 theo luồng Sổ hộ vay → 01/TD + In kèm (Bộ HS cũ đã gỡ). |
| (3.245) | t165: bỏ chip tóm tắt GDX; t168 bắt lỗi bản mini thiếu hàm. |
| (3.244) | t173, t178 theo form 01/TD mới; t200 thêm phép In kèm (21 phép). |
| (3.243) | t165 thêm: Gò Dầu / 03 người / tại địa điểm không tách; 3 nét gạch tay mục 2; Ẩn nét gạch. Chuẩn khóa gdx_m04 ghi lại. |
| (3.241) | t165 theo kiểu gạch mới (½ chữ, nét mảnh); chuẩn khóa gdx_m04, gdx_m12 ghi lại. |
| (3.238) | t196 thêm: Sổ hộ vay › Phóng to xem trong hộp, ＋ Hộ mới sau khi phóng to, mở hộp khi đang toàn màn hình. |
| (3.235) | Tách `22-so-lieu.js`: không thêm phép thử — chạy lại t106, t108, t129, t134, t179–t181 (khóa bản in), t196 + hồi quy; ghép các file `js/22*` + `js/22k-kt-khuon.js` khớp từng byte bản cũ. |


Tiện ích: `tv.js` (định tuyến cdnjs → `tests/lib`), `fakedrive.js` (Drive giả đủ lệnh app dùng: tìm, tạo thư mục, multipart upload, PATCH, alt=media, thùng rác).

Mẫu một phép thử mới: chép `t264.js` (dùng `ok(...)` in ✓ / ✗ + số đạt cuối), đổi phần `p.evaluate(...)`; luôn in `lỗi` (pageerror) cuối cùng — phải là `[]`.

**Bản đồ mã:** `python3 tests/bando.py` sinh `docs/BAN_DO_MA.md` (file, mục, nhóm hàm theo tiền tố, điểm vào — vị trí `file:dòng`) — chạy lại sau mỗi bản.
**Ghép 1 file (3.142):** `python3 tests/ghep.py ra.html` — ghép `index.html` + `css/` + `js/` thành 1 file như trước khi tách (đối chiếu / dùng offline).
