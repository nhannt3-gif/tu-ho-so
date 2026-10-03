# BÀN GIAO TIẾP TỤC — ĐỌC TRƯỚC (cập nhật 03/10/2026, bản 3.97)

Tài liệu này để **một phiên / tài khoản Claude khác làm tiếp ngay** trên repo `nhannt3-gif/tu-ho-so`, không cần đọc lại lịch sử chat.
Đọc theo thứ tự: mục 1 → 2 → 3 (bắt buộc), rồi mục 7 (việc đang dở). Chi tiết từng bản ở `docs/CHANGELOG.md`; bảng thử máy thật + ghi chú kỹ thuật từng bản ở `docs/BAN_GIAO_VIEC_CON_LAI.md`; cấu trúc bộ file Excel tháng ở `docs/DU_LIEU_THANG.md`; phép thử ở `tests/README.md`.

---

## 1. Người dùng và cách làm việc

**Anh Nhân** — cán bộ tín dụng (CBTD) quản lý địa bàn, **NHCSXH PGD Gò Dầu (Tây Ninh)**. Làm với tín dụng chính sách: hộ vay, món vay, dư nợ, lãi, TK 105, Tổ TK&VV, hội đoàn thể (ĐVUT), xã / điểm giao dịch / ấp; báo cáo, họp giao ban. Dùng Excel, Word, PDF, dữ liệu hệ thống nghiệp vụ. Trả lời **tiếng Việt**, xưng "em", gọi "anh".

**Quy tắc anh đã chốt (bắt buộc):**
1. **Lắng nghe → ghi nhận → phân tích → phản biện → đề xuất → anh duyệt → thực hiện → kiểm tra → bàn giao.**
2. **Lên kế hoạch trước; anh nhắn "code" mới sửa code.** Khi anh hỏi "em định làm gì" → nói rõ phương án, phạm vi, kết quả dự kiến. Việc nhỏ trong phạm vi đã duyệt thì làm luôn.
3. **Không làm thừa, không tự ý thay đổi, không phá cái đang chạy.** Đổi / xóa chức năng cũ phải được anh duyệt. Chức năng mới phải kiểm hồi quy.
4. Thiếu thông tin quan trọng → **hỏi, không đoán**. Có rủi ro → cảnh báo + phương án an toàn. Bất đồng → kiểm chứng bằng dữ liệu.
5. Nhận file → **rà soát tổng thể trước**. Không sửa dữ liệu gốc, không tạo số liệu. Phân biệt rõ số thật / suy luận / mức chắc chắn.
6. Ưu tiên nhanh, thực dụng, dùng được ngay; đơn giản thì trả lời ngắn.
7. Mỗi bản quan trọng: trạng thái, quyết định, changelog, backlog, tài liệu bàn giao / hướng dẫn thử.
8. Anh thường giao **"làm tuần tự tất cả"** rồi thử một lượt → làm từng bản, mỗi bản PR riêng, cuối cùng gửi một tổng kết + danh sách thử.

**Đăng web (GitHub Pages):** repo có file `.nojekyll` (thêm 03/10/2026) — Pages đăng nguyên file, không qua Jekyll. Từ 3.93 tài liệu có `{{…}}` (dấu chèn khuôn Word) làm Jekyll báo lỗi → Pages kẹt ở 3.92 suốt 3.93–3.96. **Không xóa `.nojekyll`.** Gộp xong nên xem Actions › "pages build and deployment" xanh.

**Bảo mật dữ liệu (rất quan trọng):** repo **công khai** (GitHub Pages). **Không bao giờ** commit tên khách, CCCD, tên tổ trưởng, file / ảnh anh gửi. File thật anh gửi (ví dụ các file Excel mẫu) chỉ đọc trong thư mục nháp của phiên. Phép thử dùng dữ liệu giả (`tests/taogia.py`). Anh đã chốt: Drive của anh là nơi lưu bảo mật (CCCD không mã hóa, 3.32); dữ liệu khách chỉ nằm trong máy + Drive của anh.

---

## 2. Quy trình kỹ thuật

- **Nhánh làm việc:** `claude/html-app-review-ck346k` (hoặc nhánh phiên mới được giao). Mỗi bản: sửa → kiểm → commit → push → PR vào `main` tiêu đề **"Tủ hồ sơ X.YZ"** → **squash merge** tiêu đề **"Tủ hồ sơ X.YZ (#N)"** → đặt lại nhánh về `origin/main` (`git checkout -B <nhánh> origin/main && git push -f`).
- **Mỗi bản phải:**
  1. `python3 tests/kiem.py` → `Cú pháp OK · Trùng tên: không · Thiếu hàm: không` (bỏ qua CompressionStream / DecompressionStream / Response).
  2. Hồi quy: `node tests/hoiquy.js` (28), `node tests/hoiquy2.js` (20, sửa chuỗi số bản trong file), các `tests/t8x–t99` liên quan; phép thử mới cho chức năng mới (dữ liệu giả); xem ảnh chụp máy tính 1366 + điện thoại 390.
  3. Tăng `APP_BAN`, `APP_LUC` (tìm `var APP_BAN`) và thêm dòng đầu `CO_GI_MOI` (hộp "Có gì mới", mỗi dòng: chữ + lệnh mở đúng chỗ).
  4. `docs/CHANGELOG.md` (mục bản mới ở đầu), `docs/BAN_GIAO_VIEC_CON_LAI.md` (dòng "Bản hiện tại", bảng **Danh sách thử trên máy thật (X)** + **Ghi chú kỹ thuật X**).
- **Commit / PR:** không ghi tên hay mã model. Đuôi commit theo hướng dẫn attribution của phiên đang chạy.
- **Cách sửa file lớn (~22.000 dòng):** viết script Python thay chuỗi có `assert s.count(a)==1` (mẫu cũ dùng `chen_xxx.py`), hoặc Edit; luôn `grep` tên hàm / lớp CSS trước khi đặt mới (tránh trùng).
- **Nếp mã:** ES5 (`var`, `function`, Promise), tên tiếng Việt không dấu (`veSoLieu`, `slDocFile`…), chú thích tiếng Việt có ghi số bản (`/* 3.85: … */`). CSS mới đặt khối riêng `/* ===== X.YZ — … ===== */` trong `<style>` (khối mới chèn **trước** khối của bản trước). Màu dùng biến `--xanh --luc --vang --do --nen --the --vien --chu-phu` (+ `-nen`, `-nhat`), có chế độ tối.

---

## 3. Kiến trúc (một file `index.html`)

**Thư viện** (cdnjs, cất vào IndexedDB `tuhoso_tv` để offline): pdf.js 3.11.174, pdf-lib 1.17.1, SheetJS xlsx 0.18.5. `xongTV` = Promise nạp xong. Không thêm thư viện.

**Các khối `<script>`:** bộ nạp thư viện → khối chính (hằng số, lưu trữ, tiện ích, đọc PDF, tên chuẩn, giao diện từng tab, thêm file, xem / in / gửi, cài đặt, Drive, lập chỉ mục, CCCD, biểu mẫu, danh sách / thùng rác, khung tab, Scan, tìm / lọc / sắp xếp) → đồng bộ chỉ mục + sao lưu → cài đặt Drive → `khoiDong()` / `batDau()` → **khối 3.85 Số liệu** (cuối file).

**Tab** (`doiNgan(i)`, `nganHienTai`, phần tử `#tr<i>`; thứ tự nút trên thanh khác số tab):
| i | Tab | Hàm vẽ |
|---|---|---|
| 0 | Hôm nay (lịch, việc, 🧰 Công cụ: Giao ban, Buổi GD, HSSV, Địa bàn…) | `veHomNay`, `CONG_CU`, `ccMo` |
| 1 | Văn bản | `veVanBan` |
| 2 | Tháng (ma trận báo cáo tháng theo PGD / xã / điểm) | `veThang`, `bangDoiChieuHTML` |
| 7 | **Số liệu** (3.85, bộ Excel hệ thống; 3.88 theo tháng + Kiểm tra) — 5 tab con (3.90): 📥 Nạp & Kiểm tra · 📊 Tổng hợp (3.90) · 📑 Sao kê (3.89) · 👥 Tổ TK&VV (3.88) · 👤 Tra cứu KH | `veSoLieu`, `veTongHop`, `veSaoKe`, `veToTK`, `slTraHTML` |
| 5 | Biểu mẫu | `veBieuMau` |
| 4 | Scan (hồ sơ quét, CCCD) | `veScan` |
| 3 | Thư viện = Ghi chú · Theo dõi nợ · Bộ hồ sơ (`tvPhan()` = gc / no / bo) | `veGhiChu` |
| 6 | Khay chờ duyệt (thêm file) | `veThem` |

**Dữ liệu:**
- `localStorage['tuhoso_v1']` = `D` = `{cauHinh, vanBan, duLieu, ghiChu, cho, ganDay, bieuMau, rac, scan, kyAnh, boHS, daXoaHan…}` (`luu()` / `nap()`). Trường mới phải chịu được khi chưa có.
- IndexedDB `tuhoso_file` store `f` (`luuFile/docFile/xoaFile`): file theo id mục; `hs_*` ảnh scan, `hs_ka*` chữ ký·CCCD, `nf*` file Hôm nay, `bf*` bộ hồ sơ, `tdn_du_lieu` (Theo dõi nợ `NO`), `saoluu_YYYY-MM-DD` (sao lưu 7 ngày, 3.81), `sl_*` (Số liệu 3.85).
- **Drive** (`D.cauHinh.thumuc` = "Tủ hồ sơ"; KHÔNG đổi tên thư mục chuẩn): Văn bản / Dữ liệu tháng / Ghi chú / Khác / _Chờ xử lý / **Số liệu/<kỳ>/** (3.85) / `_Hệ thống/` (cauhinh.json, chimuc.json, lich.json, theodoino.json, du_phong/, **so_lieu/**). Hàm: `goiDrive`, `baoDamDuong`, `timFileTrong`, `ghiJSONLenDrive`, `dayBlobLenDrive`, `xoaFileDrive` (= vào thùng rác Drive, không xóa vĩnh viễn).
- **Đồng bộ nhiều máy:** chỉ mục `chimuc.json` luôn tải về gộp trước khi ghi (`dayChiMucLenDrive` → `gopTuRemote`, dấu xóa `daXoaHan`), chặn ghi trống, dự phòng đầu ngày (3.81). Theo dõi nợ: `taiNoTuDrive`/`dayNoLenDrive` (bản sửa sau thắng). Số liệu: `slTaiTuDrive`/`slDay` (mục 4).

**Quy ước giao diện đã chốt:**
- Hộp thoại `moHop(html, rong)` / `dongHop()`; lớp `sua-gon` (hộp sửa gọn), `co-xem-ben` (xem cạnh), `quet-gon`, `phim-chung`.
- **Phím chung** (3.75–3.84): Enter / Tab ghi nhận và sang **đúng 1 ô**; Shift lùi; ô gõ chữ thì ← → chỉ di con trỏ, ô chọn (SELECT) thì ← → sang ô; ↑ ↓ cuộn lựa chọn; ô cha của cây (Xã / Điểm / Ấp) trống thì cảnh báo, không cho sang ô con; ô tự do được để trống; Ctrl+Enter lưu; textarea trong `phim-chung` Enter = xuống dòng. Hàm: `sgPhim`, `sgO`, `sgSang`, `SG_CAY`, `SG_HD`.
- Gợi ý / cảnh báo: dải chip xanh cố định (`#sg-hd`), không bong bóng nổi.
- Ô tìm trên cùng: gợi ý `veGoiY` gồm Lọc nhanh · 🏠 Hồ sơ hộ (`timHo`); ở tab Số liệu: "Tìm ở tab khác" (`slNhayTabHTML`, 3.86). Khách hàng chỉ tra trong tab con Tra cứu KH.

---

## 4. Tab 📈 Số liệu (3.85 → 3.87) — phần mới nhất, sẽ phát triển tiếp

**Nguyên tắc anh chốt 01/10/2026 (bắt buộc cho mọi bản sau):**
- **Luồng một chiều:** tab Số liệu là **nguồn** — chỉ nhận dữ liệu từ file Excel hệ thống, không lấy từ tab khác. Các tab khác (Theo dõi nợ, Giao ban, Buổi GD, Hồ sơ hộ…) khi cần thì **chỉ đọc** từ Số liệu, không ghi ngược.
- **Lỗi logic / dữ liệu:** app phải **báo + chỉ ra nguyên nhân** (file nào, dòng / món / thôn / tổ nào, lệch bao nhiêu), **tuyệt đối không sửa dữ liệu nguồn**; có thể lập danh sách, đề xuất hướng xử lý, ghi nhận để ghi chú / bổ sung ở báo cáo đầu ra. Ví dụ: khách có 2 sổ 105 → danh sách theo xã → điểm GD → ấp → tổ để theo dõi đóng sổ thừa (kỳ sau mới biết đã đóng chưa).
- **Thứ bậc tin cậy (3.90, anh chốt):** **BCDHTD (01.1, 01.2) > LEN_31, B32 > Mẫu 31 > Mẫu 10.** BCDHTD là số chính thức của TW, chuẩn nhất. Báo cáo cấp PGD / xã lấy thẳng số chuẩn TW; lọc sâu hơn (điểm, hội, tổ, chương trình, nguồn) tính từ Mẫu 31, ghi "tham khảo", tự đối chiếu với số chuẩn của xã — lệch thì báo. Mẫu 7 bỏ khỏi tham chiếu. File xuất sau ngày chốt có thể không chuẩn.
- **Dữ liệu theo ngày:** Mẫu 31 xuất cuối tháng; **Mẫu 10 và Sao kê KH xuất / nạp bất kỳ ngày nào** (không đều — thường dùng cuối tháng trước, khi cần thì lấy mới nhất). Muốn biết dư nợ hiện tại → Mẫu 10 ngày mới nhất. Khách đã nhập máy chưa có dư nợ chỉ có ở Sao kê KH.
- **Sau khi nạp phải có bước đánh giá đa chiều → chốt số liệu → báo cáo dạng checklist** (nhiều kỳ, làm khoa học). **Anh nói: phần dữ liệu và tổ chức là quan trọng nhất; đánh giá / chốt làm khi đủ dữ liệu** (kế hoạch: trạng thái kỳ Đang nạp → Đã đánh giá → Đã chốt; checklist 6 nhóm: đủ file · toàn vẹn · khớp ngang · khớp dọc · Mẫu 31 ↔ Mẫu 10 cuối tháng · bất thường nghiệp vụ; mỗi mục lệch có nguyên nhân, danh sách, hướng xử lý, ghi nhận của anh).
- **"105 Ngày BC" = tổng 105 của khách** (anh xác nhận) — cộng 105 thì lấy 1 lần mỗi khách.
- **Phân vai tab (anh chốt 01/10/2026):** tab con **👤 Tra cứu KH chỉ để tra cứu khách hàng** (bố cục tra cứu sẽ thiết kế lại sau cho tiện nhất — không đặt báo cáo vào đây). **👥 Tổ TK&VV chỉ là báo cáo của 1 tổ.** Khách có 2 sổ 105 → **tab kiểm tra / chuẩn hóa số liệu** (làm sau), không ở tab Tổ.
- **Báo cáo của tổ là thông tin thuần để xem / in** (không thêm cột làm việc, ô ghi tay…). Bố cục theo chuẩn ngân hàng hiện đại: dải chỉ tiêu trên cùng, xếp theo mức nghiêm trọng, có tuổi nợ. A4 dọc, cuối trang để trống, sắp theo Mã KH. Chương trình ghi mã + tên ngắn (`CT_NGAN`).
- **Cách làm việc (anh chốt 01/10/2026):** anh hay dùng **điện thoại** → **gom nhiều ý rồi làm một lần**, kiên nhẫn; mỗi bản mở PR, **chờ anh nhắn "gộp" mới gộp** (không tự gộp).
- **Quy tắc phạm vi chung:** mọi tra cứu / in đều chọn xã → điểm GD → hội (lọc) → tổ; báo cáo ghi phạm vi, chia và cộng theo tổ.
- **Kiểm trùng trước khi nhập máy:** dùng CCCD là chính; rà CCCD khách đang dư nợ + CMND HSSV (+ CCCD người thừa kế khi có báo cáo). Không trùng = chưa vay vốn, có thể nhập máy. Khách tất nợ vẫn hiện, ghi rõ. Người thừa kế = vợ/chồng (Mẫu 31 chỉ có tên) → tìm theo tên, hiện hết kèm xã / tổ để anh tự chọn.
- **SĐT đạt** = đúng 10 chữ số, bắt đầu bằng 0. **Nợ đến hạn** lọc theo ngày ĐH GDXA (căn cứ chuyển QH), kèm ngày HĐ; gia hạn tối đa = ½ thời gian cho vay.
- **Tất nợ = dư nợ 0 VÀ lãi tồn 0**; dư nợ 0 còn lãi tồn = chưa tất nợ. **Khách mới kết nạp** = có dư nợ tháng này mà tháng trước không có trong tổ.

**3.97 (mới nhất):** KTGS có **4 loại kiểm tra** (anh chốt): ① sau giải ngân 30 ngày (Mẫu 06) · ② đột xuất 6–8 hộ (06 + 16) · ③ **định kỳ theo lịch** (06 + 16: số liệu cuối tháng → tháng sau, ngày trống, tổ theo lịch 01/KH, hộ có món các năm trước ≥ 90%, QH / khoanh kiểm riêng) · ④ Mẫu 04 tổng hợp. Số liệu mặc định cuối tháng; BC0437 / 0438 không theo khóa tháng; Gợi ý lại xoay vòng; Kế hoạch khuôn ② mẫu gọn; khai báo theo thứ tự mẫu; bảng đầu trang / ký không viền.

**3.96:** KTGS › **🗓 Kế hoạch năm · 01/KH** — năm → xã → hội → 100% tổ của Hội gom theo ấp, xếp sẵn tháng 02 → 10 (đổi cả ấp / từng tổ, lưu theo năm + xã + hội, nhắc tổ chưa xếp); Word theo **dự thảo HĐT cấp xã** (căn cứ 727, chỉ 90%, bỏ MẪU THAM KHẢO, A4, không ghi số hộ); số HĐUT / KH Hội tỉnh / đoàn / người ký từ ⚙ Khai báo Hội.

**3.95:** KTGS › **📋 Báo cáo tổng hợp · Mẫu 04/BC-TH** — chọn tháng → tổ đã lập phiếu trong tháng tích sẵn (thêm tổ bằng cây, sửa ngày), mỗi Hội – xã 1 báo cáo, Word đúng khuôn mẫu gốc (bỏ khung MẪU THAM KHẢO; dòng chấm: I.1 4, I.2 2, III 4, mỗi mục IV 3; app điền đơn vị, đoàn, bảng mục II, số phiếu 06). **⚙ Khai báo Hội** (số HĐUT, KH Hội tỉnh, đoàn, người ký) dùng chung cho 01/KH. Nhật ký lập phiếu theo tổ `ktgsNK` (Biên bản 16, Mẫu 06 sau GN).

**3.94:** 👤 Tra cứu KH gọn — danh sách 2 dòng, thẻ chia nhóm (số tóm tắt, nhân thân + hạn CCCD, liên hệ, tiết kiệm, món vay có mục đích, HSSV đủ trường / hệ / ngành / khóa), bấm giá trị để chép, bỏ nút Hồ sơ hộ ở thẻ; **kiểm trùng 2 ô CCCD + họ tên**: CCCD người vay, CCCD HSSV, **tên vợ/chồng của người đang vay = người thừa kế** (anh chốt quan trọng; chỉ so được theo tên), cùng họ tên. **Chờ / làm sau:** Mẫu 15/TD, 03/BB-CX, 06A/TD, liên kết scan.

**3.93.1:** KTGS › **📅 Sau giải ngân (30 ngày) · Mẫu 06**: chọn tháng / từ tháng → đến tháng → địa bàn → Xem → In / Word; mỗi tổ mỗi tháng 1 phiếu; món = mọi lần giải ngân trong tháng (cả HSSV lần 2+); dư nợ = tổng dư nợ cuối tháng. Bảng ngành gọn (ẩn < 10 món). Danh sách giải ngân hệ thống **không cần nạp** — Mẫu 31 đủ (khớp 100%, "Mục đích vay vốn" = Tên PNKT51).

**3.93:** tab con **🛡 KTGS Hội** — nạp **BC0437 / BC0438** trong tab (xếp loại tổ tính theo công thức của file khi cột = 0), bảng tổ có điểm / xếp loại, **chọn hộ kiểm tra đột xuất** (6–8 hộ theo tổ viên; Hộ tốt / Cần quan tâm / **Trung hòa = 6 tốt + 2 KHĐ**; bỏ QH / khoanh; ≥ 1 HSSV; giải ngân < 30 ngày tự vào), xuất **Mẫu 06/TD + 16/TD Word đúng 100% khuôn gốc** (chỉ điền thông tin có sẵn, thiếu giữ dòng chấm; ngày + đoàn khai khi in, mặc định trống; không ghi tổ phó; cột mục đích anh chọn Để trống / In ngành kinh tế rút gọn) + In / PDF. Nạp BC0437 / BC0438 **theo chuẩn tab Nạp**: ma trận loại × tháng, nạp nhiều file (xem trước → ghi nhận), 🔍 kiểm tra BC0437 ↔ BC0438 ↔ Mẫu 31 ↔ KHĐ (lưu kết quả). **Chờ anh góp ý bảng tên ngành rút gọn** (`KT_PNKT`). Anh chốt (03/10): áp mức **90%** (xã không thuộc vùng khó khăn). **Chờ / làm sau:** Mẫu 15/TD (đối chiếu — làm đúng khuôn), 03/BB-CX (app tự tính I.1, I.2), 06A/TD, 01/KH (anh gửi mẫu tham khảo), bảng tiến độ 727, liên kết scan.

**3.92:** Sao kê chọn 1 báo cáo, **in 2 khổ** (ngang đủ cột / dọc gọn), **mỗi món 1 dòng**, tự co (lề → bỏ SĐT → chữ). Tổ TK&VV: **danh sách tổ viên có lọc** (đề xuất cho ra = không dư nợ & 105 = 0, CCCD hết hạn…), **bảng các tổ** khi chưa chọn tổ (tổ viên, mới vào, cho ra, KQGD tháng), ngưỡng tổ viên đặt trong app. **Vay trực tiếp** vào đúng xã / điểm (xã + ngày GDXA). Món còn lãi = chưa tất toán. Tổng hợp in **khuôn 01.1** (lề 7 mm, 2 tầng, hàng số cột, triệu 2 số lẻ). Tra cứu KH 2 cột. **Chờ anh:** ngưỡng tổ viên tối thiểu / tối đa; "CCCD sắp hết hạn" làm sau ở tab Kiểm tra.

**3.91.1:** sửa kiểm tra tháng chưa có file vẫn hiện kết quả cũ; chữ "Chưa vay vốn"; danh sách hộ vay bỏ KU đã tất toán (giữ dòng khách).

**3.91:** **Nợ đến hạn** theo hạn HĐ (gia hạn) + **kỳ GDXA chuyển quá hạn** (anh chốt: hạn HĐ 22/10, GDXA ngày 07 → chuyển QH 07/11; tháng nào cũng phải tra soát món đã quá hạn HĐ chưa chuyển) — 3 khung, cột Mã KH · SĐT · NV · Lãi tồn · Số dư 105, A4 dọc (sao kê để xem: tràn thì thu lề). **Kiểm tra & chốt tháng** — chỉ để biết và chốt, không sửa số; chốt = khóa tháng. Ma trận nhóm sổ / gọn, chọn tháng chữ Việt, 2 cột / vuốt ngang. **Viết tắt chương trình thống nhất** theo mã (03 = GQVL mọi món; HSSV STEM riêng). **Sao kê nợ đến hạn kỳ con** (CV 597/NHCS-TDNN): NOXH + cho vay trực tiếp (không mã tổ) + ủy thác qua tổ vay từ 01/03/2026; vay trước 01/03/2026 (trừ NOXH) không chuyển QH kỳ con; kỳ tới theo file **Nợ đến hạn phân kỳ** (loại phụ mới) hoặc ước tính ≈; **Danh sách nợ gốc đến hạn phân kỳ theo tổ** gửi tổ trưởng. Sửa lỗi scan chỉ có PDF trên Drive đổi tên báo "Chưa lên Drive".

**3.90.1:** màn 📥 gọn: dòng ① + **ma trận file theo tháng là màn chính** (anh chốt: gọn như cũ, vẫn đủ chức năng) + ② **bảng đối chiếu chéo** (chỉ tiêu × nguồn, toàn PGD / từng xã, bấm ô xem chi tiết) + **⬇ tải file gốc** (bản sao để dùng việc khác) + **🧹 tìm file rác của Số liệu**. **Anh chốt: phần Số liệu tách biệt với phần Văn bản, chạy độc lập; dọn rác cũng làm riêng** (Dọn kho chung bỏ qua `Số liệu/`, `_Hệ thống/`).

**3.90:**
- **Bộ file mỗi tháng (anh chốt):** Ⓐ 7 file chuẩn TW — BCDHTD 01.1, 01.2 · B32 · LEN_31 XAPUONG / DONVIUT / CHTRINH / TO_TRUONG (bắt buộc) · Ⓑ Mẫu 31, Thông tin tổ trưởng (nạp mỗi tháng), KHĐ **mẫu 14** (bắt buộc) · Ⓒ Mẫu 10 theo ngày · Ⓓ phụ: Nợ quá hạn, Nợ khoanh, Tổng dư nợ theo CT (có thì đối chiếu thêm). **Bỏ:** Mẫu 7, Sao kê KH, KHĐ mẫu 08/KTNB. Cấu trúc biểu TW + quy tắc đã kiểm: `docs/DU_LIEU_THANG.md`.
- **Kỳ:** Mẫu 31 / file TW xuất cuối tháng → ô tháng, giữa tháng → ô theo ngày (app tự đọc ngày trong file). Nạp nhiều file: 1 bộ 1 tháng hay 1 loại nhiều tháng đều được. 🔁 Thay file 1 ô (đúng loại, đúng kỳ), 🗑 xóa cả bộ tháng, ♻ làm mới toàn bộ (chỉ phần Số liệu).
- **② Kiểm tra** thêm: số chuẩn TW khớp nhau, Mẫu 31 ↔ số chuẩn TW (từng xã, nguồn, từng tổ LEN_31), KHĐ ↔ Mẫu 31, tổ trưởng ↔ LEN_31.
- **📊 Tổng hợp:** tiêu chí + bộ lọc (phạm vi chung + chương trình + nguồn) → In A4 ngang / Excel; 9 báo cáo (xem CHANGELOG).
- **Chuẩn in mọi báo cáo (anh chốt):** A4; lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi trang; số trang; tổng hợp A4 ngang, danh sách A4 dọc; cuối báo cáo ghi "PGD NHCSXH GÒ DẦU", không ký; PDF = In → Lưu PDF. Báo cáo mới phải theo chuẩn này (`bcCSS(ngang)`, `bcKy()`).

**3.89:**
- **Bộ chọn phạm vi chung** `pvVeCay(p)` (xã → điểm GD → hội lọc → tổ) — **mọi tra cứu / báo cáo mới phải dùng bộ này** (anh chốt). Thêm nơi dùng = thêm `PV_DUNG[p]` + `<div id="p-cay" class="to-cay pv-cay">`.
- **Tra cứu KH:** gõ CCCD = kiểm trùng toàn PGD (khách + CMND HSSV); gõ tên = khách / vợ-chồng / HSSV, hiện hết kèm xã · ấp · tổ · tình trạng; 📍 phạm vi.
- **Tab con 📑 Sao kê:** 8 báo cáo (QH, khoanh, KHĐ, SĐT, nợ đến hạn + còn được gia hạn, giải ngân, thay đổi dư nợ, cần mở 105), chia theo tổ.

**3.88:**
- **Tab Số liệu theo tháng:** chọn tháng → ① file của tháng (đủ / thiếu, nạp ngay; file theo ngày là chip) → ② **🔍 Kiểm tra** (6 nhóm: đủ file · toàn vẹn · khớp giữa các file + Mẫu 7 từng tổ · với tháng trước · Mẫu 31 ↔ Mẫu 10 cuối tháng · bất thường). Kết quả lưu `SLM.kt[tháng]` (lên Drive cùng meta), không chạy lại; file đổi → "kiểm lại" (`slDauKy`). ③ Chốt để sau. Bảng nhiều tháng thu gọn được.
- **Tab con 👥 Tổ TK&VV** (trong Số liệu, cạnh Tra cứu KH): chọn kỳ số liệu → cây Xã → Điểm GD → Hội → Tổ (phím chung + chip) hoặc gõ tên → thẻ tổ → tích báo cáo → Xem → In / Excel. 3 báo cáo: **Danh sách hộ vay**, **Nợ cần xử lý** (3 khung QH / khoanh / KHĐ, 1 mặt A4), **TK 105 của tổ** (nguồn Mẫu 31: tất nợ còn 105 kèm số TK; khách mới chưa mở 105).

**3.87:**
- Tách **Mẫu 31 · HS tín dụng (chốt tháng)** (hstd, kỳ tháng) và **Mẫu 10 · Sao kê chi tiết (theo ngày)** (m10, kỳ `yyyy-mm-dd`); Sao kê KH cũng theo ngày. Tự nhận loại theo cột; Mẫu 10 không ghi ngày bên trong → ngày theo tên file (ghi rõ). Mẫu 10 nạp ở 3.85–3.86 (nằm ở hstd theo tháng) **tự chuyển** sang m10 (`slChuyenMau10`, `slDoiKhoa`), không mất dữ liệu.
- Khế ước lặp dòng do khách nhiều sổ 105: **giữ nguyên ở bảng riêng** (`b.lap`), dư nợ 1 lần / khế ước, 105 một lần / khách (sửa lỗi 3.86 cộng thừa).
- Loại mới **Mẫu 7 · Kiểm tra Tổ TK&VV** (kttk, khóa mã tổ). Ngày xuất file (`slNgayXuat`) → cảnh báo xuất sau ngày số liệu.
- Tháng chưa có Mẫu 31 → đối chiếu tạm bằng Mẫu 10 ngày cuối tháng (ghi tên nguồn).

**3.86:**
- **Mẫu 31** "Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu" (175 cột, ~22 MB) **thay Mẫu 10** trong ô Hồ sơ tín dụng chi tiết (3.87: Mẫu 10 tách thành loại riêng theo ngày) — anh chốt: hằng tháng xuất Mẫu 31; các file khác của bộ vẫn nạp như cũ (KHĐ, Nợ quá hạn, Nợ khoanh, Tổng dư nợ theo CT, Thông tin tổ trưởng, Sao kê KH khi có). Giữ **đủ 175 cột** (trường `c_<tên cột>` cho cột chưa khai báo — tháng 9 có món **XKLĐ** đầu tiên, cột XKLĐ phải còn). Gộp khế ước trùng (khách 2 sổ 105 — **3.87 bỏ gộp**, giữ dòng lặp riêng), lưu món **đã tất toán** và khách **chỉ gửi tiết kiệm**. Chi tiết cột: `docs/DU_LIEU_THANG.md`.
- **Tab con:** `D.cauHinh.slTab` = 'nap' (📥 Nạp số liệu) / 'tra' (👤 Tra cứu KH, ô tìm **riêng** `#sl-tim`). Anh chốt: phần Số liệu chạy **độc lập như một app riêng**, không nối các tab khác. **Ô tìm chung không tra khách hàng**; đang ở tab Số liệu thì ô tìm chung gợi ý tab có kết quả (Văn bản, Scan…) và nhảy sang (`slNhayTabHTML`).
- **Chi tiết tra cứu (lọc, xuất, truy vấn) anh sẽ bàn kỹ sau khi dữ liệu hoàn chỉnh** — không tự làm thêm.
- Đo file 31/07 thật: đọc ~24 giây (máy thử), 27.391 dòng (24.968 khế ước sau gộp, 3.205 tất toán, 2.423 khách chỉ gửi TK), dư nợ 735.955.328.485 — khớp tính tay.

**3.85 (nền):**

Mục tiêu anh đặt: mỗi tháng nạp **một bộ file Excel hệ thống**, app đọc đúng, lưu theo kỳ, đối chiếu, sau này **truy vấn / trích xuất đa chiều**; tra **CCCD, ngày sinh, địa chỉ** nhanh khi làm việc.

- **7 loại file** (`SL_LOAI`): hstd Hồ sơ tín dụng chi tiết (mỗi dòng 1 món) · kh Sao kê KH (**chưa có mẫu**) · khd Món vay 3 tháng KHĐ · nqh Nợ quá hạn · nk Nợ khoanh · tdn Tổng dư nợ theo CT (thôn × CT × nguồn × NĐT) · tt Thông tin tổ trưởng. Cột + nhận dạng: `docs/DU_LIEU_THANG.md`.
- **Nhận dạng theo cột** (`can` / `mot` / `khong`), không theo tên file; tên cột so sau khi bỏ dấu (`slChuan`); trường + bí danh cột ở `SL_TRUONG` (thêm cột mới = thêm bí danh). **Thêm loại file mới:** thêm 1 phần tử `SL_LOAI` (+ trường vào `SL_TRUONG`, + `slTong`, `slTomTat`), kiểm không trùng chữ ký với loại khác.
- **Luồng đọc:** `slDocSheet` (Worker dựng từ mã xlsx đã cache, dự phòng đọc thẳng) → `slTimDau` (dò dòng tên cột, BCQUERY trước) → `slLayDong` (bỏ trống / tiêu đề lặp / tổng / phần ký / sai mã khóa, bù số 0 đầu mã) → `slTimKy` (cột Ngày báo cáo → tiêu đề → tên file; `slNgayTrongChu`) → `slTong`.
- **Nạp:** `slNapBo` / `slDocNhieu` (cả bộ, kéo thả vào tab 7 cũng vào đây) → `slXemTruoc` (sửa loại / kỳ, tích) → `slGhiDaTich`; `slNapMot` → `slKiemMot` (sai loại chặn, lệch kỳ báo vàng) → `slGhiMot`; `slDocMucCu` đọc file sao kê cũ đã nạp ở tab Tháng.
- **Lưu:** `slGhi` → IDB `sl_b_<loại>_<kỳ>` (dạng cột + từ điển: `slNen` / `slMoBang`), file gốc tạm `sl_g_…` (xóa sau khi lên Drive), `sl_meta` (`SLM = {bang:{'loại|kỳ':{…tong, luc, goc, dl, choDay}}, xoa, ndt, dbLuc}`), `sl_danhba` (`SL_DB = {kh:{maKH:{ten, ns, cccd, ncap, noiCap, dc, thon, to, stk, t105, ky…}}, to:{…}}`, mỗi KH giữ bản kỳ mới nhất; `slVaoDanhBa`, `slDungDanhBa`, chỉ mục tìm `SL_TIM`).
- **Drive:** `slDay` (gốc → `Số liệu/<kỳ>/<ngày> <Tên loại>.xlsx`; dữ liệu → `_Hệ thống/so_lieu/<kỳ>/<loại>.json.gz`; danh bạ `khach_hang.json.gz`; `slDayMeta` tải `meta.json` gộp `slGopMeta` rồi ghi), `slTaiTuDrive` (gọi khi nối Drive), `slDocBang` tải bảng khi cần. Mỗi ô (loại × kỳ): bản ghi nhận sau thắng; xóa có dấu `xoa`. Thay file → bản cũ vào thùng rác Drive.
- **Bộ kỳ + đối chiếu:** `slBo(ky)` (mon theo số khế ước, theoKH, nqh / nk / khd theo khế ước, to, tdn) · `slDoiChieu` (chỉ báo). **Khóa nối: Số khế ước = Mã món vay (16 số)** — anh xác nhận "món vay theo mã món vay, 1 KH nhiều mã món vay".
- **Tra KH (tab con 👤, 3.86):** `slTraHTML` / `slTraTim` → `slTimKH` (tên không dấu mọi thứ tự, CCCD đủ / số cuối, mã KH, SĐT, số khế ước kể cả đã tất toán — danh bạ giữ `ku[]` mọi kỳ, năm / ngày sinh) · `slTheKH` (thẻ có nút chép; SĐT, vợ/chồng, giới, dân tộc; món: đến hạn, lãi suất, đã tất toán, XKLĐ / HSSV) · `slChepKH`.
- **Tab Tháng sau 3.85:** 7 mã cũ `SL_MA_CU` (`laMaSoLieu`) ẩn khỏi ma trận, tính thiếu, Cài đặt; dòng XLS (`coExcel`) ô trống lớp `trong`, không tính thiếu; các dòng báo cáo theo xã / điểm (Nợ quá hạn, Nợ khoanh, 3 tháng KHĐ — file XLS / PDF theo điểm) **giữ ở tab Tháng** (anh chốt).
- **Đo (dữ liệu giả):** 25.000 món ~10 giây đọc, màn hình không treo; tra < 10 ms. File T7 thật ~22 MB → có thể 40–60 giây.

---

## 5. Các phần lớn khác (tóm tắt để định vị mã)

- **Scan** (3.33–3.79): chụp / quét, tìm khung, nắn, lọc; `HS` (dùng chung `D.scan`), `veScan`, `quetGon`, `timAnhScanMoCoi` / `khoiPhucScan` (3.79.1 sửa lỗi mất danh sách), đề xuất tên có dấu `goiYTenCoDau` (3.84).
- **Văn bản:** đọc PDF lấy số hiệu / trích yếu, tên chuẩn, quan hệ VB liên quan (chip số hiệu), gộp trùng (`gopTrung`, 3.77), lọc nhanh (giá trị trống `LOC_TRONG` — "không để sót văn bản nào").
- **Tháng:** ma trận PGD / xã / điểm, ⚙ thiết lập báo cáo không sửa code (`moThietLapBC`), chốt kỳ.
- **Theo dõi nợ** (3.64, Thư viện › no): `NO` (ho, mon, lan…), đọc sao kê KHĐ / QH / khoanh có "Số khế ước" (`tdnDocFile` — riêng với tab Số liệu), lần làm việc, biên bản Word, cam kết lên lịch.
- **Hồ sơ hộ 1 trang** (3.82) `moHoSoHo`, `thuThapHo` (ghép tên không dấu + mã tổ).
- **Giao ban / Buổi GD** (3.83) `gbTinh`, `bgdTinh` — **hiện lấy số từ Theo dõi nợ**, chưa từ tab Số liệu.
- **An toàn dữ liệu** (3.81): Dọn kho › 🛟 Sao lưu, `saoLuuTrongMay`, `layLaiSaoLuu`.
- **Dọn kho / Lập chỉ mục / Quét rác** (3.50): `moDonKho`, `lapChiMuc`, `gomTatCaDon` (bỏ qua `_Hệ thống`, `Số liệu`).

---

## 6. Quyết định gần đây anh đã chốt (3.74 → 3.85)

- Phím chung như mục 3; ô bắt buộc sẽ chốt sau.
- Lọc: tối ưu nhưng **không để sót văn bản nào**; CT vay không cụ thể thì để trống (không gán "Tất cả CT").
- Gợi ý = dải chip xanh cố định; văn bản liên quan hiện cạnh tên (chip số hiệu), bỏ khối dòng thời gian.
- Số liệu: bỏ "Sao kê món vay có TK trên 10%" (sau tính ra được); thêm Thông tin tổ trưởng để tham chiếu; ma trận cũ chủ yếu nạp PDF; nút XLS giữ nhưng không cảnh báo; 2 nút nạp (cả bộ / từng file có kiểm lần cuối); lưu tất cả trên Drive của anh; Excel đọc một lần rồi chuyển dạng đọc nhanh; **chép đủ CCCD, ngày sinh, địa chỉ** để tra nhanh.
- Nguồn vốn: **1 = Trung ương (TW), 2 = Địa phương (ĐP)**; **Mã NĐT** = cấp chia tiếp của nguồn (anh đặt tên trong Danh mục mã của kỳ). ĐVUT: 11 Hội Nông dân, 12 Hội LH Phụ nữ, 13 Hội CCB, 14 Đoàn TN.
- **Truy vấn đa chiều sẽ bàn riêng một bản** (chưa làm).
- Rác / ảnh mồ côi: "không để tồn rác mà không quản lý — mồ côi thì đưa vào khay để theo dõi hoặc xóa".

---

## 7. Việc đang dở / tiếp theo (theo ưu tiên)

| # | Việc | Trạng thái / cần gì |
|---|---|---|
| 0k | **ĐANG CHỜ: anh test bố cục 3.97 (Word thật) → góp ý → làm 1 bản 3.98** gồm việc đã thống nhất ở mục **7a** bên dưới + góp ý của anh. Sau đó: Mẫu 15/TD (đúng khuôn), 03/BB-CX (tự tính I.1 từ BC0438 / BC0437, I.2 chấm điểm tổ), 06A/TD, bảng tiến độ 727 (nối lịch 01/KH: tháng này đến lượt tổ nào → đã kiểm chưa) | **Chưa code 3.98** — chờ anh test xong + nhắn "code". Anh còn 2 câu chưa trả lời (mục 7a). |
| 0s | **Liên kết scan / thêm PDF → tự chuẩn hóa tên + gắn dữ liệu** (sau KTGS) | Chờ anh trả lời: dạng tên file, đổi tên scan cũ, iPhone / Android, chia giai đoạn. |
| 0a | **Phân kỳ** — 3 món GQVL qua tổ vay 03–04/2026 có kỳ 05/2026 · 09/2026 chưa trả mà Mẫu 31 chưa chuyển QH (theo CV 597 phải chuyển nếu không được điều chỉnh) — anh kiểm | Ước tính số tiền kỳ chỉ khớp 4/7 NOXH; ủy thác mới cần file phân kỳ để biết số tiền kỳ → nạp file mỗi tháng (kỳ đầu đa số từ T3/2027). |
| 0 | **Anh thử 3.90** (anh đã xóa tay dữ liệu cũ, sẽ nạp lại 31/12/2025, T8, T9 — nên nạp thêm Mẫu 31 T7 để T8 so được khách mới) | Bảng thử 3.90 trong `BAN_GIAO_VIEC_CON_LAI.md`. **Mẫu 31 chỉ xuất được theo tháng** (anh kiểm) → số theo ngày dùng Mẫu 10. **Chờ anh thử xuất BCDHTD / LEN_31 / B32 theo ngày** (app đã nhận sẵn vào ô theo ngày): kiểm ngày trong file, doanh số lũy kế hay theo ngày, khớp Mẫu 10 cùng ngày → nếu được thì thêm đối chiếu + bảng đối chiếu chéo cho kỳ theo ngày. Lưu ý còn mở (số thật T9): thu nợ LEN_31 thấp hơn BCDHTD 71.999.298 (12 tổ), 3 món vay mới năm 2026 không có trong KHĐ, 19 tổ có dư nợ chưa có trong Thông tin tổ trưởng — anh kiểm trên hệ thống. |
| 1 | **Anh thử 3.81 → 3.85 trên máy thật** (bảng thử trong `BAN_GIAO_VIEC_CON_LAI.md`) | Chờ anh báo Đạt / Chưa → sửa |
| 1a | **Anh thử 3.87** (Mẫu 10 tự chuyển sang dòng theo ngày; nạp lại Mẫu 10 31/08 để sửa 105; Mẫu 7; nạp Mẫu 31 T8, T9) | Bảng thử 3.87 trong `BAN_GIAO_VIEC_CON_LAI.md`. **Anh cần nạp Mẫu 31 T8 + T9 vào app** (máy thật mới có Mẫu 10) — cần cho đối chiếu chuẩn và danh sách 2 sổ 105. |
| 1b | **Anh thử 3.86** (Mẫu 31 T8/T9, tab con Tra cứu KH) | Bảng thử 3.86 trong `BAN_GIAO_VIEC_CON_LAI.md`. Tháng 9 có món XKLĐ đầu tiên — kiểm thẻ khách hàng hiện thông tin XKLĐ (tên cột thật có thể khác file giả → nếu không hiện, xem trường `c_…` trong bảng hstd và sửa `slTheKH`). |
| 1c | ~~3.88 — Danh sách hộ vay theo tổ~~ **ĐÃ LÀM ở 3.88 (tab con 👥 Tổ TK&VV của Số liệu)** — anh thử theo bảng 3.88; ghi chú cũ: | Ở tab con Tra cứu KH. Chọn tổ: gõ tên tổ trưởng / mã tổ / ấp, hoặc xã → điểm GD → ấp → tổ. Nguồn: Mẫu 31 hoặc Mẫu 10 (mặc định mới nhất, ghi rõ ngày). Đầu: tổ trưởng, tổ phó, địa chỉ, điểm GD, hội quản lý (Mẫu 7 + Thông tin tổ trưởng; thiếu thì trống). Bảng: STT · Mã KH · Họ tên · Số KU · Dư nợ KU · Số dư 105 · Lãi tồn; KH nhiều KU có dòng cộng khách (105 ghi 1 lần); KH đã tất toán (dư nợ 0) vẫn hiện; dòng tổng tổ. **In PDF: A4 dọc, gom vừa khổ, dư chỗ thì thêm cột (Chương trình → Ngày vay → Dư nợ QH), tiêu đề "DANH SÁCH HỘ VAY" + "Số liệu đến ngày…", sắp theo Mã KH, cuối trang để trống**; xuất Excel. |
| 1d | **Tab kiểm tra / chuẩn hóa số liệu** — danh sách khách 2 sổ 105 (theo xã → điểm GD → ấp → tổ, theo dõi đóng sổ thừa qua các kỳ), 820 khách chỉ gửi TK không có tổ… | Cần ≥ 2 kỳ Mẫu 31. Hướng xử lý chuẩn: **chờ anh cung cấp** (không tự viết). Bàn bố cục với anh trước. |
| 1e | **Chốt số liệu (bước ③)** + ghi nhận của anh cho mục lệch, hướng xử lý — bước ② Kiểm tra đã có ở 3.88 (mục 4) | Làm khi đủ dữ liệu; anh bổ sung danh sách lỗi cần bắt. File Mẫu 7 anh gửi để đối chiếu: cần Mẫu 31 ngày 31/08 để kết luận phần lệch (ghi chú ở `DU_LIEU_THANG.md`). |
| 1h | **Phát triển tab Tổ TK&VV theo văn bản thành lập / củng cố tổ** | Anh sẽ gửi văn bản → đọc, lên kế hoạch, anh duyệt. |
| 1i | ~~Xác nhận "thời hạn cho vay"~~ | **Anh chốt:** thời hạn cho vay = ngày vay → ngày đến hạn đầu tiên; gia hạn tối đa ½; đã gia hạn thì còn = phần còn lại (3.89 tính theo ngày, hiện tháng + ngày). |
| 1j | **CCCD người thừa kế** cho kiểm trùng | Anh tìm báo cáo hệ thống có cột này. |
| 1f | **Tài liệu tìm hiểu báo cáo của ngân hàng / tổ chức tài chính vi mô nước ngoài** (PAR30, chia tuổi nợ, phiếu họp nhóm Grameen, watch list…) | Em đã đề nghị làm tài liệu có trích nguồn — **chờ anh đồng ý**. |
| 1g | **Thiết kế lại bố cục 👤 Tra cứu KH** cho tiện nhất | Anh nói bàn sau. |
| 2 | ~~Sao kê khách hàng — đọc file~~ | **Bỏ ở 3.90** (anh không xuất được nữa; thông tin khách lấy từ Mẫu 31). Ghi chú cũ: | Anh sẽ gửi mẫu ("giống HS tín dụng nhưng không có dư nợ, khế ước"; 01/10 anh chưa xuất được). Có cả **khách đã nhập máy chưa có dư nợ**. Từ 3.87 lưu theo **ngày**. Ô đã có; chữ ký nhận dạng tạm: có Mã KH + CCCD, không có Mã món vay / Số khế ước / Tổng dư nợ. Kiểm cột thật, bổ sung bí danh, gộp vào danh bạ (`slVaoDanhBa` đã hỗ trợ loại kh). |
| 3 | **Tra cứu / truy vấn đa chiều trên tab Số liệu** (tab con Tra cứu KH + có thể tab con Truy vấn) | **Anh nói bàn kỹ sau khi dữ liệu hoàn chỉnh — hỏi anh trước, không tự làm.** Đề xuất đã nêu: chọn Hàng (xã → điểm → thôn → tổ → hộ), Cột (CT / nguồn / kỳ), Chỉ tiêu (dư nợ, số món, số hộ không trùng, QH, khoanh, lãi tồn, 105, giải ngân), Lọc; bấm số → danh sách món / hộ; xuất Excel (SheetJS `XLSX.writeFile`), chép Zalo / Word; lưu truy vấn hay dùng; so 2 kỳ (món mới, tất toán = có kỳ trước không có kỳ này, mới chuyển QH). Dùng `slBo` + `slMoBang`; danh sách việc: HSSV đã ra trường, gia hạn, tổ tỷ lệ QH cao, hộ chưa có TK 105. Mẫu 31 **đã có** ngày đến hạn, phát sinh tháng / quý / năm, tình trạng OPEN / CLOSE → doanh số cho vay, thu nợ, đến hạn, tất toán lấy thẳng. |
| 4 | **Theo dõi nợ + chức năng liên quan** | Anh: làm tiếp **khi có đủ số liệu tháng 30/09**. Hướng: Theo dõi nợ / Giao ban / Buổi GD / Hồ sơ hộ **chỉ đọc** từ Số liệu (luồng một chiều, khóa số khế ước, Mã KH) — anh duyệt trước. |
| 5 | **Ảnh / file mồ côi** | Đã đề xuất (chưa code): nhóm "🧩 Không thuộc mục nào" trong Dọn kho › Quét rác (ảnh gốc / thu nhỏ còn sót, ảnh chữ ký·CCCD lẻ, file trên Drive không có trong chỉ mục), mỗi mục: 📥 Đưa vào Chờ khai · 🔗 Gắn vào bản có sẵn · 🗑 Vào thùng rác; thanh nhắc khi mở app. Anh đồng ý hướng "không để rác không quản lý" — **xác nhận lại phạm vi rồi code**. |
| 6 | ~~Thôn **54003520**~~ | **Đã rõ (01/10/2026):** lỗi dữ liệu hệ thống, thôn không còn; dữ liệu hệ thống còn lỗi chưa chỉnh hết → app chỉ báo. |
| 7 | Backlog cũ chờ anh chốt | G thư viện offline / SRI · J tìm khung CCCD trên nền kính (cần ảnh thật) · ô bắt buộc · NOXH kỳ hạn / "phục viên" · danh mục Theo dõi nợ · dời nút Danh sách / Tính ngày · tìm theo nội dung văn bản · con số "N thiếu" của ma trận đếm theo danh sách chốt kỳ |

**Lưu ý / rủi ro đã biết:**
- `tests/hoiquy.js` đôi khi 27/28 do chờ cố định → chạy lại (nên đổi sang chờ theo điều kiện).
- Tab Số liệu cần trình duyệt có `CompressionStream` (Chrome 80+, Safari 16.4+); thiếu thì lưu JSON không nén (vẫn chạy).
- Máy mới chưa có bảng trong máy → mở kỳ / thẻ KH tải bảng từ Drive (cần đã nối Drive).
- `tenTab()` của tab 7 trả `'duLieu'` (cho an toàn với mã cũ dùng `D[tenTab()]`); `tenTabPV()` trả `'soLieu'` (khung xem ẩn mặc định).
- Mẫu 31 đọc ~24 giây / 320 MB bộ nhớ trên máy tính; **nạp file gốc nên làm trên máy tính**, điện thoại chỉ tải dữ liệu đã đọc (~3 MB / tháng). Nếu sau này chậm hơn nữa: phương án tự đọc XML theo dòng trong Worker (chưa làm).
- Theo dõi nợ có bộ đọc sao kê riêng (`tdnDocFile`, nạp ở Thư viện › Theo dõi nợ) — **chưa** dùng chung với tab Số liệu (anh chọn tách lần này).


## 7a. Bản 3.98 — ĐÃ THỐNG NHẤT, CHỜ ANH TEST 3.97 RỒI MỚI CODE (ghi 03/10/2026 tối)

Anh chốt: **anh test đầy đủ bố cục 3.97 trước, góp ý 1 lần → làm 1 bản**. Không tự code trước khi anh nhắn "code".

**A. Chữ đặc thù xã / phường, Hội / Đoàn Thanh niên trong Word** (rà 03/10/2026 — khoảng 20 chỗ):

| Mẫu | Chỗ | Hiện | Cần |
|---|---|---|---|
| Mẫu 06, Mẫu 04 | địa bàn, đơn vị | lấy theo dữ liệu (Xã… / Phường…) | đã đúng |
| Mẫu 16 (1) | "Tổ thuộc Hội …" (`ktGiaTri16` HOI) | Đoàn ra "Hội Đoàn Thanh niên" ❌ | Đoàn → "Tổ thuộc Đoàn Thanh niên …" (chữ "Hội" in sẵn trong khuôn → cần dấu chèn mới) |
| Mẫu 16 | "thôn/tổ dân phố", "xã/phường/đặc khu" | chữ in sẵn của mẫu | giữ nguyên |
| Kế hoạch ① (6) | đầu trang Hội tỉnh | Đoàn ra "ĐOÀN THANH NIÊN TỈNH TÂY NINH" | "TỈNH ĐOÀN TÂY NINH" |
| | "HĐT xã" ×3 (thành phần; báo cáo Chủ tịch HĐT xã; báo cáo cho HĐT xã) | | phường → "HĐT phường" |
| | "do hội mình quản lý"; Nơi nhận "do Hội quản lý" | | Đoàn → "Đoàn" |
| Kế hoạch ② (13) | "{{HL}} xã" ×9 | | phường → "phường" |
| | "Chủ tịch, phó Chủ tịch, Ủy viên BTV"; "Phó chủ tịch … Chủ tịch" (phân công giám sát) | | Đoàn → "Bí thư, Phó Bí thư…" |
| | "Hội cấp trên" ×2; Nơi nhận "{{HL}} tỉnh" | | Đoàn → "Đoàn cấp trên", "Tỉnh Đoàn" |
| | "Văn phòng ấp"; "Trưởng ấp" ×2 | | phường → "khu phố" (chờ anh xác nhận) |
| | "TM. BAN THƯỜNG VỤ" | | Đoàn → "TM. BAN CHẤP HÀNH"? (chờ anh xác nhận) |

Cách làm đề xuất: **tự nhận** xã / phường từ tên xã trong dữ liệu (`tenXa` bắt đầu "Phường"), Hội / Đoàn từ mã ĐVUT (14 = Đoàn); **⚙ Khai báo Hội** thêm ô đặc thù để anh sửa khi cần (chức danh người ký, tên ban lãnh đạo, tên đơn vị cấp trên, "ấp" / "khu phố"); ô trống = giá trị tự nhận. Anh nói sau khi test sẽ chỉnh 1 lần các thông tin đặc thù này.

**B. Mẫu 16 — tự gợi ý đánh giá, nhận xét theo tình hình tổ** (căn cứ nhiệm vụ ủy nhiệm của Tổ, khoản 3 Phụ lục I văn bản 727):
- Nguồn: BC0437 cùng tháng (điểm, xếp loại, tổ viên, QH, khoanh, lãi tồn, tiền gửi, tổ viên nộp lãi / gửi TK 3 tháng) · Mẫu 31 · file món 3 tháng KHĐ · hộ đã chọn ở Mẫu 06.
- **Bảng II cột "Kết quả kiểm tra":** chỉ điền dòng có số liệu (số tổ viên so 05–60; số tổ viên lãi tồn / QH + số tiền); dòng định tính (sinh hoạt, bình xét, giữ sổ…) để trống ghi tay.
- **III.1 Ưu điểm** (chỉ khi số liệu tốt): không QH, không lãi tồn, tỷ lệ tổ viên gửi TK, xếp loại Tốt / Khá + điểm.
- **III.2 Tồn tại** (có số): QH n món / tiền / tỷ lệ; khoanh; lãi tồn n hộ / tiền; n món KHĐ ≥ 3 tháng; tổ viên > 60 hoặc < 5; xếp loại TB / Yếu.
- **III.3 Kiến nghị** đi theo từng tồn tại: đôn đốc thu hồi QH + phối hợp chính quyền; thu lãi tồn; rà soát xử lý món KHĐ; vận động gửi TK đều; kiện toàn / sắp xếp lại tổ; lưu giữ hồ sơ.
- Khi in có lựa chọn **"Gợi ý nhận xét: In theo số liệu / Để trống"**; mọi câu là gợi ý, có số kèm theo, anh sửa trong Word.
- **Chờ anh gửi lại "Mẫu 16 bản điền mẫu"** (anh nói đã gửi nhưng trong phiên chỉ có Mẫu 16 trắng; bản "mẫu tham khảo cách ghi chép" chỉ có của Mẫu 06). Không có thì soạn theo 727 như trên.

**C. Hai câu anh chưa trả lời:** (1) Đoàn Thanh niên ký "TM. BAN CHẤP HÀNH / BÍ THƯ" hay giữ "TM. BAN THƯỜNG VỤ"? (2) Phường ghi "khu phố" thay "ấp"?

**D. Lưu ý cho phiên làm tiếp (tài khoản khác):**
- Khuôn Word (Mẫu 04, Kế hoạch ① ②) **đã nằm sẵn trong `index.html`** — sửa chữ đặc thù làm trực tiếp bằng dấu chèn mới trong khuôn + `ktKHGiaTri` / `ktGiaTri16`, **không cần file gốc**. Chỉ khi phải dựng lại khuôn từ đầu mới cần anh gửi lại file gốc (Mẫu 04 .docx, dự thảo KH HĐT xã .doc → LibreOffice ra .docx, bản kế hoạch mẫu của Hội xã — **có tên thật, không đưa vào repo**; `tools/khuon_docx.py m01b` tự lấy tên riêng từ file để kiểm, không ghi tên vào mã).
- Đăng web: repo có `.nojekyll` (đừng xóa); gộp xong xem Actions "pages build and deployment" xanh.
- Quy trình mỗi bản: `python3 tests/kiem.py` sạch + hồi quy hoiquy, hoiquy2, t101–t110 (`hoiquy` có 1 phép chập chờn "Báo cáo đã bỏ…" — chạy lại) + APP_BAN / APP_LUC / CO_GI_MOI + CHANGELOG + BAN_GIAO_VIEC_CON_LAI (bảng thử + ghi chú kỹ thuật) + file này + tests/README; `sed -i "s/3\.97/3.98/g" tests/hoiquy2.js`.
