# BÀN GIAO TIẾP TỤC — ĐỌC TRƯỚC (cập nhật 01/10/2026, bản 3.85)

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
| 7 | **Số liệu** (3.85, bộ Excel hệ thống) | `veSoLieu` |
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
- Ô tìm trên cùng: gợi ý `veGoiY` gồm Lọc nhanh · 🏠 Hồ sơ hộ (`timHo`) · 👤 Khách hàng (`slKHGoiYHTML`, 3.85).

---

## 4. Tab 📈 Số liệu (3.85) — phần mới nhất, sẽ phát triển tiếp

Mục tiêu anh đặt: mỗi tháng nạp **một bộ file Excel hệ thống**, app đọc đúng, lưu theo kỳ, đối chiếu, sau này **truy vấn / trích xuất đa chiều**; tra **CCCD, ngày sinh, địa chỉ** nhanh khi làm việc.

- **7 loại file** (`SL_LOAI`): hstd Hồ sơ tín dụng chi tiết (mỗi dòng 1 món) · kh Sao kê KH (**chưa có mẫu**) · khd Món vay 3 tháng KHĐ · nqh Nợ quá hạn · nk Nợ khoanh · tdn Tổng dư nợ theo CT (thôn × CT × nguồn × NĐT) · tt Thông tin tổ trưởng. Cột + nhận dạng: `docs/DU_LIEU_THANG.md`.
- **Nhận dạng theo cột** (`can` / `mot` / `khong`), không theo tên file; tên cột so sau khi bỏ dấu (`slChuan`); trường + bí danh cột ở `SL_TRUONG` (thêm cột mới = thêm bí danh). **Thêm loại file mới:** thêm 1 phần tử `SL_LOAI` (+ trường vào `SL_TRUONG`, + `slTong`, `slTomTat`), kiểm không trùng chữ ký với loại khác.
- **Luồng đọc:** `slDocSheet` (Worker dựng từ mã xlsx đã cache, dự phòng đọc thẳng) → `slTimDau` (dò dòng tên cột, BCQUERY trước) → `slLayDong` (bỏ trống / tiêu đề lặp / tổng / phần ký / sai mã khóa, bù số 0 đầu mã) → `slTimKy` (cột Ngày báo cáo → tiêu đề → tên file; `slNgayTrongChu`) → `slTong`.
- **Nạp:** `slNapBo` / `slDocNhieu` (cả bộ, kéo thả vào tab 7 cũng vào đây) → `slXemTruoc` (sửa loại / kỳ, tích) → `slGhiDaTich`; `slNapMot` → `slKiemMot` (sai loại chặn, lệch kỳ báo vàng) → `slGhiMot`; `slDocMucCu` đọc file sao kê cũ đã nạp ở tab Tháng.
- **Lưu:** `slGhi` → IDB `sl_b_<loại>_<kỳ>` (dạng cột + từ điển: `slNen` / `slMoBang`), file gốc tạm `sl_g_…` (xóa sau khi lên Drive), `sl_meta` (`SLM = {bang:{'loại|kỳ':{…tong, luc, goc, dl, choDay}}, xoa, ndt, dbLuc}`), `sl_danhba` (`SL_DB = {kh:{maKH:{ten, ns, cccd, ncap, noiCap, dc, thon, to, stk, t105, ky…}}, to:{…}}`, mỗi KH giữ bản kỳ mới nhất; `slVaoDanhBa`, `slDungDanhBa`, chỉ mục tìm `SL_TIM`).
- **Drive:** `slDay` (gốc → `Số liệu/<kỳ>/<ngày> <Tên loại>.xlsx`; dữ liệu → `_Hệ thống/so_lieu/<kỳ>/<loại>.json.gz`; danh bạ `khach_hang.json.gz`; `slDayMeta` tải `meta.json` gộp `slGopMeta` rồi ghi), `slTaiTuDrive` (gọi khi nối Drive), `slDocBang` tải bảng khi cần. Mỗi ô (loại × kỳ): bản ghi nhận sau thắng; xóa có dấu `xoa`. Thay file → bản cũ vào thùng rác Drive.
- **Bộ kỳ + đối chiếu:** `slBo(ky)` (mon theo số khế ước, theoKH, nqh / nk / khd theo khế ước, to, tdn) · `slDoiChieu` (chỉ báo). **Khóa nối: Số khế ước = Mã món vay (16 số)** — anh xác nhận "món vay theo mã món vay, 1 KH nhiều mã món vay".
- **Tra KH:** `slTimKH` (tên không dấu mọi thứ tự, CCCD đủ / số cuối, mã KH, năm / ngày sinh) · `slTheKH` (thẻ có nút chép, món vay kỳ đó, tổ trưởng) · `slChepKH`.
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
| 1 | **Anh thử 3.81 → 3.85 trên máy thật** (bảng thử trong `BAN_GIAO_VIEC_CON_LAI.md`) | Chờ anh báo Đạt / Chưa → sửa |
| 2 | **Sao kê khách hàng** — đọc file | Anh sẽ gửi mẫu ("giống HS tín dụng nhưng không có dư nợ, khế ước"). Ô đã có; chữ ký nhận dạng tạm: có Mã KH + CCCD, không có Mã món vay / Số khế ước / Tổng dư nợ. Kiểm cột thật, bổ sung bí danh, gộp vào danh bạ (`slVaoDanhBa` đã hỗ trợ loại kh). |
| 3 | **3.86 Truy vấn đa chiều trên tab Số liệu** | **Bàn kế hoạch với anh trước.** Đề xuất đã nêu: chọn Hàng (xã → điểm → thôn → tổ → hộ), Cột (CT / nguồn / kỳ), Chỉ tiêu (dư nợ, số món, số hộ không trùng, QH, khoanh, lãi tồn, 105, giải ngân), Lọc; bấm số → danh sách món / hộ; xuất Excel (SheetJS `XLSX.writeFile`), chép Zalo / Word; lưu truy vấn hay dùng; so 2 kỳ (món mới, tất toán = có kỳ trước không có kỳ này, mới chuyển QH). Dùng `slBo` + `slMoBang`; danh sách việc: HSSV đã ra trường, gia hạn, tổ tỷ lệ QH cao, hộ chưa có TK 105. **Không có cột ngày đến hạn trong HS tín dụng** (chỉ file KHĐ có). |
| 4 | **Theo dõi nợ + chức năng liên quan** | Anh: làm tiếp **khi có đủ số liệu tháng 30/09**. Hướng: nối Theo dõi nợ / Giao ban / Buổi GD / Hồ sơ hộ với bộ dữ liệu Số liệu (khóa số khế ước, Mã KH) — anh duyệt trước. |
| 5 | **Ảnh / file mồ côi** | Đã đề xuất (chưa code): nhóm "🧩 Không thuộc mục nào" trong Dọn kho › Quét rác (ảnh gốc / thu nhỏ còn sót, ảnh chữ ký·CCCD lẻ, file trên Drive không có trong chỉ mục), mỗi mục: 📥 Đưa vào Chờ khai · 🔗 Gắn vào bản có sẵn · 🗑 Vào thùng rác; thanh nhắc khi mở app. Anh đồng ý hướng "không để rác không quản lý" — **xác nhận lại phạm vi rồi code**. |
| 6 | Thôn **54003520** (Phường Gò Dầu) có dư nợ nhưng thiếu tên / điểm, không có trong danh sách tổ; app có thôn 54003501 Khu Phố Chánh không có dư nợ | Anh kiểm trên hệ thống |
| 7 | Backlog cũ chờ anh chốt | G thư viện offline / SRI · J tìm khung CCCD trên nền kính (cần ảnh thật) · ô bắt buộc · NOXH kỳ hạn / "phục viên" · danh mục Theo dõi nợ · dời nút Danh sách / Tính ngày · tìm theo nội dung văn bản · con số "N thiếu" của ma trận đếm theo danh sách chốt kỳ |

**Lưu ý / rủi ro đã biết:**
- `tests/hoiquy.js` đôi khi 27/28 do chờ cố định → chạy lại (nên đổi sang chờ theo điều kiện).
- Tab Số liệu cần trình duyệt có `CompressionStream` (Chrome 80+, Safari 16.4+); thiếu thì lưu JSON không nén (vẫn chạy).
- Máy mới chưa có bảng trong máy → mở kỳ / thẻ KH tải bảng từ Drive (cần đã nối Drive).
- `tenTab()` của tab 7 trả `'duLieu'` (cho an toàn với mã cũ dùng `D[tenTab()]`); `tenTabPV()` trả `'soLieu'` (khung xem ẩn mặc định).
- Theo dõi nợ có bộ đọc sao kê riêng (`tdnDocFile`, nạp ở Thư viện › Theo dõi nợ) — **chưa** dùng chung với tab Số liệu (anh chọn tách lần này).
