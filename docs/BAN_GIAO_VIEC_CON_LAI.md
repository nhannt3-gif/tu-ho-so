# BÀN GIAO VIỆC CÒN LẠI — App Tủ hồ sơ (v2.1)

**Bản hiện tại:** 3.61 · build 02/10/2026 08:00
**Kho:** `nhannt3-gif/tu-ho-so` → `index.html` (một file HTML duy nhất)
**App đang chạy thật:** https://nhannt3-gif.github.io/tu-ho-so/
**Tài liệu kèm:** `docs/CHANGELOG.md` (đã làm gì) · `docs/REVIEW.md` (rà soát lỗi, rủi ro, tình trạng từng mục)
**Dự án tách riêng:** `docs/DAC_TA_APP_SCAN_EXE.md` — đặc tả app Scan + Chữ ký·CCCD chạy offline dạng .exe (anh làm riêng)

---

## 0. Ràng buộc bắt buộc (giữ nguyên từ v1.1)

- **Quy tắc làm việc (anh Nhân chốt 27/09/2026): lên kế hoạch trước, anh chốt "code" mới được sửa code.**

1. Giữ kiến trúc **một file HTML**. Không tách file, không thêm thư viện, không build, không npm. Mở được bằng nhấp đúp khi không có mạng.
2. **Không phá** chức năng đang chạy.
3. **Không xóa dữ liệu** người dùng; không đổi cấu trúc `D` theo cách làm mất dữ liệu cũ. Trường mới phải chịu được khi chưa có.
4. Tên hàm, biến bằng tiếng Việt không dấu theo nếp cũ; chú thích bằng tiếng Việt.
5. **Sau mỗi lần sửa, chạy 3 phép kiểm:** `Cú pháp OK · Trùng tên: không · Thiếu hàm: không`.
   - ⚠ Phép "thiếu hàm" phải quét **mọi lời gọi hàm trong mã**, không chỉ `onclick=`. Bản cũ chỉ quét `onclick` nên bỏ sót lỗi `demDiaBan` (xem mục 3).
6. `grep` tên lớp CSS và tên hàm mới trước khi đặt.
7. Cập nhật `APP_BAN`, `APP_LUC` (hiện ở dòng 1697) mỗi bản.
8. Giao lại đúng tên `index.html`. Làm trên nhánh mới + Pull Request.
9. **Mới:** không đưa dữ liệu cá nhân (tên tổ trưởng, tên khách hàng…) vào mã nguồn — repo đang **công khai**.

---

## 1. Đã xong ở bản 3.31 → 3.53

Mục 1 → 11 của bàn giao v1.1 và toàn bộ đợt 0 (lỗi nền). Chi tiết ở `docs/CHANGELOG.md`.

**Quyết định đã chốt với anh Nhân:**
- Bỏ danh sách tổ khỏi mã nguồn, giữ cây xã → điểm → ấp; tổ trưởng anh nhập tay. Thay tổ trưởng thì giữ mã tổ, sửa tên.
- **Mục 2:** không sửa `dsDonVi('xa')`, vì hàm này còn dùng để nhận dạng phạm vi file. Chỉ đổi phần hiển thị và phần đếm của ma trận.
- **Mục 1:** dùng lại `D.cauHinh.capThang`, không tạo thêm `capMaTran`.
- **Mục 6:** "Dùng chung" là tag **suy từ nhóm** của biểu mẫu, không lưu thêm dữ liệu trùng.
- **Mục 5 + 6:** ghim và Dùng chung đều "đứng đầu" → thứ tự là nhóm 📌 Đã ghim, rồi Dùng chung, rồi các chương trình.
- **Mục 8:** thay hẳn nút Dọn cũ. Bản thừa vào thùng rác, không xóa hẳn.
- **Mục 9:** mở rộng `lienQuanHTML` có sẵn. Không có hàm `veChiTiet`.
- **Mục 7:** hàm cần sửa là `veCayDB` (cây địa bàn). `veCay` là mã chết.
- **3.32 — Ảnh CCCD không mã hóa.** Anh Nhân coi Drive của anh là nơi lưu bảo mật; PDF hồ sơ mặc định lên Drive.
- **3.32 — "Xóa hẳn" chuyển file vào thùng rác Google Drive,** không xóa vĩnh viễn.
- **3.32 — Nhiều máy cùng lúc:** ít khi dùng, nên việc đồng bộ gộp trước khi ghi để ưu tiên thấp.
- **Tên tổ trưởng ở các bản cũ trên GitHub:** anh chốt **để nguyên, không viết lại lịch sử**.
- **3.33 — Scan:**
  - Mỗi hồ sơ một PDF trên Drive, lưu lại là cập nhật đè, đổi địa bàn là dời file.
  - Xóa hồ sơ thì PDF vào thùng rác Drive.
  - Để trống địa bàn thì giữ trống, không tự điền lần trước.
- **3.34 — Báo cáo tự thiết lập:** mỗi báo cáo chỉnh bằng nút ⚙ (cấp, dạng bảng/một ô, chu kỳ, dòng Excel), không sửa code. Mã báo cáo không đổi trong hộp ⚙.
- **3.34 — SL_GB:** chỉ cấp điểm giao dịch; chuyển một lần (`slgbDaDoi`).
- **3.34 — Hàng lọc nhanh:** hiện ở mọi tab kể cả điện thoại (vuốt ngang), ẩn/hiện nhớ theo tab.
- **3.34 — File trùng:** không lưu bản sao; thêm từ ô ma trận thì cho chuyển mục cũ vào ô.
- **3.35 — Scan:** tự động trước (tìm khung, nắn, tự lật, nhận mặt, lọc Magic/Giấy trắng), còn sót thì chỉnh tay (4 góc có kính lúp, ⇅, ⇄, ◀ ▶). In CCCD 4 người × 2 mặt mỗi A4, thẻ 88 × 55,5 mm (to hơn thẻ thật), lề 10 mm, khe cắt đều 14 mm (3.37), có dấu cắt góc, xếp từ trên xuống — anh chốt không cần đúng cỡ thật. PDF trong tab Scan dời/xoay/bỏ/chèn trang, chép nguyên trang không đổi thành ảnh.
- **3.35 — Ảnh CCCD thật anh gửi** chỉ dùng để thử trong phiên làm việc, **không đưa vào repo**.
- **3.37 — Hàng chờ Scan:** luôn hiện ảnh gốc kèm viền cắt để kéo chỉnh khi app cắt lệch; kiểu màu là nút bấm hiện sẵn.
- **3.38:** sổ ghi chú nền tối dịu vàng (#D8CBA6), không sậm. In CCCD thẻ 92 × 58 mm, 2 mặt cách 6 mm, khe người ≈ 15 mm; dấu cắt chỉ 1 vạch đầu–giữa–cuối mỗi đường cắt (bỏ dấu 4 góc) — anh chốt.
- **3.39 (sau rà soát bố cục):** khung xem cố định vừa đủ — 60/40, tab Tháng 65/35, nhớ riêng từng tab (anh chốt KHÔNG thu khung xem). Điện thoại tối giản: lọc nhanh ẩn mặc định, đầu trang/dải chờ khai/thanh nút gọn 1 dòng (anh chốt: điện thoại để xem và vuốt, máy tính hiện đủ chi tiết). Gộp nhãn Ghi chú một nguồn; số mục trên đầu đủ 5 tab; Cài đặt căn trái; ẩn tùy chọn không có tác dụng.

- **3.40 — Cài đặt viết lại (anh chốt 1a 2a 3a):** bộ sửa danh mục dùng chung (đổi tên lan sang file, xóa có chuyển), từ khóa nhận dạng Mảng/CT/Tag và viết tắt loại VB sửa được, tự lưu (bỏ nút Lưu), mẫu báo cáo qua ⚙, nhắc giao ban, cỡ in CCCD và kiểu màu Scan mặc định trong Cài đặt; bỏ "Nhãn nút Thêm"; "Dùng chung" Biểu mẫu chỉ ở hàng Chương trình.
  - **Quyết định anh chốt: thêm từ tab nào thì mặc định lưu vào tab đó** (Văn bản/Tháng/Ghi chú), khay chờ ghi rõ "→ Tab …"; chỉ thả vào khay chờ, quét Drive, Picker mới tự xếp.
  - Sửa lỗi anh báo: thêm file ở tab Văn bản bị vào Dữ liệu tháng (nhớ sai tab trước); bộ đọc tên file viết lại (gạch dưới, ngày viết liền, số hiệu ăn lan sang ngày/năm).
  - Không làm cột "Ẩn" đã nêu trong đề xuất: xóa một mục vốn đã giữ nguyên tên trên file cũ (hoặc chuyển sang mục khác), nên "Ẩn" trùng việc với "Xóa".

- **3.41 — Scan (anh thử trên điện thoại):** In ngay hỏi trước, mặc định lưu tạm rồi in; Lưu PDF / Gửi; hàng chờ giữ qua lần tải lại; tên lưu tạm "Scan dd-mm-yyyy HHhMMmSS" chống trùng; kéo giữa cạnh; tự làm thẳng (📐). **Quy tắc chung anh chốt: việc app tự làm luôn kèm bản gốc để chỉnh tay.**
  - Giới hạn: trình duyệt không báo in thành công hay không → app không "báo khi in lỗi" được, thay bằng lưu trước.

- **3.42 — Bảo trì kho:** Cài đặt › 🧰 Bảo trì kho (thay "Lập chỉ mục") gom Quét tủ, Picker, đồng bộ chỉ mục, quét dọn rác, gom trùng, thùng rác, bảng lập chỉ mục, nhờ AI — mỗi việc ghi rõ làm gì, đụng tới gì.

- **3.43 — Scan iPhone kiểu Lens + ma trận đồng nhất:**
  - Luồng Scan trên iPhone: 📷 Quét → hàng chờ → ✓ Xong → lưu tạm "Scan ngày giờ" → xem trước PDF (sửa tên) → 📤 Gửi qua bảng chia sẻ (Zalo, Drive, Tệp).
  - Ma trận: mọi báo cáo hiện đủ các cột; có file ✓, chưa có +; ô xã theo điểm n/n; ô không tính thiếu thì cùng dấu + nhưng nhạt; bảng canh trái.
  - **Anh chốt:** mọi báo cáo hiện đồng nhất; ô không tính thiếu vẫn cho thêm file.
  - **Tab Thư viện** (thay tên tab Ghi chú): 2 phần Ghi chú · Bảo trì kho (`tvPhan()`, `D.cauHinh.tvPhan`), dùng lại `veNoiCD('chimuc')`.

- **3.44 — Scan:**
  - Xóa hẳn bản scan hư (dòng danh sách, màn xem trước, hàng chờ).
  - PDF thẻ không in chữ; chỉ đường mỏng giữa khe giữa 2 thẻ.
  - **Chữ ký · Ảnh KH:**
    - Hàm `moKyAnh`, `nhanKA`, `veCatKA`, `dungKA`, `luuKA`, `dayKAMot`; dữ liệu `D.kyAnh`, ảnh lưu `hs_ka…`.
    - Kéo khung cắt như Zalo; nén dưới 200 KB; đặt tên nhanh; lưu lên Drive `Chữ ký - Ảnh KH/ngày`.
- **3.45 — Camera trong app + thư mục Chữ ký - CCCD:**
  - Module "CAMERA TRONG APP": `moCamera`, `khungCam`, `chupCam`, `xongCam`, `dongCam`.
    - Dò khung bằng `timKhungThe` / `timKhungGiay` trên khung hình 640px, khoảng 5 lần mỗi giây.
    - Tự chụp khi đứng yên 1 giây; chờ cảnh đổi (`CAM.sanSang`) mới chụp tiếp.
    - Kiểu chụp nhớ ở `D.cauHinh.camTuDong`, camera chọn nhớ ở `camId`.
  - PDF thẻ: đường ngang đứt quãng giữa 2 người, có hình kéo (`veKeo`, `duongCat`).
  - Chữ ký · CCCD: `tenFileKA` ra "ngày tên CK|CCCD.jpg"; thư mục tháng (`duongKA`, `moThuMucKA`, `D.cauHinh.kaTM`).
  - **Cần anh thử trên máy thật:**
    - iPhone: khung xanh có bám kịp, tự chụp có đúng lúc không.
    - Webcam máy bàn: có nét không.
    - Mở thư mục Drive từ nút ☁.

- **3.46 — Luồng 3 bước + đồng bộ Drive + PDF nhanh + OCR:**
  - **Luồng 3 bước:**
    - Hàm `moHangCho` (①), `xemTruocHang` (②, `XH.bl`), `tiepHang` → `moXemPDF(ids, moi, blSan)` (③).
    - Thao tác: `chamHang` / `doiHaiHang` (chạm đổi chỗ, kéo thả), `dichNguoi` (▲▼).
    - Chữ ký · CCCD: `veCatKA` → `xemKA2` → `luuKA` → `kaXong`. Thanh bước `buocHTML`.
    - Đã bỏ `inNgayHang` / `inHang`.
  - **Đồng bộ Drive:**
    - Hàm `dongBoScan`, `dongBoNgay`, `scanCanDay`, `kaCanDay`; cờ `k.canDay`.
    - Bản chưa khai có đường dẫn riêng trong `duongScan` / `tenScanDrive`.
    - Tùy chọn `D.cauHinh.dbMoApp`, `dbRoiApp`, `dbSauLuu`, `db5p`.
  - **PDF:** `thuChoPDF` (cache `PDF_THU`), `nutNetPDF` (`D.cauHinh.pdfNet`), `veTrangXP` vẽ dần.
  - **OCR:** `canOCR`, `docChuOCR` (Tesseract 5.1.1 từ jsdelivr), `moKetQuaOCR`, `apDungOCR`; cờ `m.anhPDF`.

- **3.47 — Sửa đồng bộ 2 máy + tiện ích:**
  - **Gộp chỉ mục:**
    - Hàm `dayChiMucLenDrive` gộp trước khi ghi (`gopTuRemote`); `taiChiMucTuDrive` so `D.cauHinh.chiMucDriveTG` (giờ Drive).
    - `gopTheoSua` gộp scan / kyAnh theo `suaLuc`; bản ghi có `may` = máy tạo.
  - **Mở bản máy khác:** `coAnhTrongMay`, `taiPDFDrive`.
  - **Gửi lên / dời file:** `dayMotScan` (có ảnh thì dựng PDF, không có thì `dayMetaScan` chỉ đổi tên / dời).
  - **Khác:**
    - Kiểm tra bản trắng: `kiemBanTrang`. Dải nối Drive: `capNhatDaiDrive`.
    - Zalo máy tính: `coChiaSeFile`, `chepAnhKA`.
    - Khai hàng loạt có chọn: `khaiHangLoat(chon)`, `demKL`.
    - Đọc lại & gợi ý tên: `coTheDocLai`, `docLaiGoiY`, `apDungOCRSua`, `apGoiYSua`.
  - Phép thử 2 máy dùng chung Drive giả: `t42.js` + `fakedrive.js` (thư mục nháp).
- **3.48 — Cầu nối máy tính + đọc theo bố cục + hàng đợi Drive:**
  - **Cầu nối:**
    - Hàm `scriptCauNoi` (PowerShell nhúng base64 trong `.reg`, lối mở `tuhoso:`), `taiBoCaiCauNoi`, `goiCauNoi`, `cnHanh`, `relCua`, `nutCauNoi`.
    - Đánh dấu "đã cài" lưu theo từng máy (localStorage `tuhoso_caunoi`, không đồng bộ).
    - Có sẵn PowerShell 7 Linux trong thư mục nháp để thử script (biến `TUHOSO_THU=1` in ra thay vì mở).
  - **Đọc theo bố cục:** `docLaiGoiY` → `dongTuPDF` / `docDongOCR` → `phanTichBoCuc` → `moSoSanhGoiY` / `apDungSS`. Màn Sửa dùng `GOI_Y_SUA` + `apGoiYSua` (chỉ điền mục đã tích).
  - **Hàng đợi Drive:** `moHangDoiDrive`; cờ `k.dbLoi` / `dbThu` / `dbLuc` / `dbDang`; nối ở lần bấm đầu (`DB_BAM_DAU`); kiểm tra chỉ mục mỗi 60 giây.
  - **Đã bỏ:** `kiemBanTrang` / `xoaBanTrang`.
  - **Máy anh:** ổ **G:\\My Drive**; máy cơ quan chạy được `.reg`.

- **3.49 — − Bớt file · Quét rác mở rộng · nút cầu nối ở khung xem · Lưu nhanh + Copy máy bàn:**
  - **Bớt file:**
    - `BOT` / `BOT_DS` (danh sách đang lọc từng tab), `botAt(id)` gắn `data-bot` vào dòng, bắt bấm ở pha capture.
    - `thanhBot`, `botXacNhan`, `thucHienBot`, `boScanHan`, `boKAHan`.
    - Mức Vào thùng rác dùng `chuyenVaoRac`; Xóa hẳn thêm `thucHienXoaHan`.
  - **Quét rác:**
    - `moQuetDon` gọi `phanLoaiDriveQD` (phần Drive) và `quetTrongApp` (phần trong app, chạy cả khi chưa nối Drive).
    - `kiemNoiDungQD` / `kiemMotFileQD` kiểm tra nội dung; `lapChiMucQD` đưa file lạc vào khay chờ (`tuKhay` + `tuKhayCha`).
    - Tập file "đã biết" gồm cả `D.scan`, `D.kyAnh`, `D.cho`.
  - **Cầu nối:** `veNutCN(m)` vẽ nút ở `#cp-cn` / `#x-cn` và gợi ý ở `#cp-cnmeo` (ẩn: localStorage `tuhoso_cn_an`). `moThuCauNoi` hỏi để tự bật.
  - **Lưu nhanh:**
    - `luuNhanh(loai, bl, ten, thang, tuDong)`: thư mục (FileSystemDirectoryHandle) lưu IndexedDB khóa `ln_tm_ka` / `ln_tm_scan`; tùy chọn ở localStorage `tuhoso_ln`.
    - `lnKA`, `lnXP`, `copyKA`, `copyXP`, `lnCaiHTML`. `laMayBan()` = không phải điện thoại và không có bảng chia sẻ file.
  - **Còn giới hạn:**
    - Scan, Chữ ký · CCCD không có thùng rác trong app — chỉ Xóa hẳn (Drive giữ 30 ngày).
    - Copy PDF không có cầu nối thì trình duyệt không chép được.
    - Kiểm tra nội dung chỉ biết PDF hỏng / không trang; chưa dò PDF có trang nhưng trắng.
  - Phép thử mới: `t47.js`, `t48.js`, `t49.js`. `fakedrive.js` đã trả thêm size / md5 / mimeType / parents khi liệt kê.

- **3.49b:**
  - "Bớt file" đổi tên thành **🗑 Xóa file**.
  - Thanh chọn cập nhật theo lớp `.thanh-bot .bot-nut/.bot-dem/.bot-tat/.bot-ngay`; `doiNgan` xóa thanh cũ.
  - `laMayBan()` nhận theo loại thiết bị (Windows có `canShare` nên không dùng được làm dấu hiệu). Phép thử mới `t50.js`.

- **3.50 — Dọn kho · thùng rác chia ngăn · Lập chỉ mục theo thư mục · xem thử · Chữ ký·CCCD dùng màn chỉnh Scan · Esc · Hướng dẫn:**
  - **Rác:**
    - `chuyenVaoRac` nhận thêm `scan`, `kyAnh`; `khoiPhucRac` trả về đúng mảng.
    - `laScanKA` + `doiChoScanKA` chỉ DỜI file Drive (không ghi thuộc tính văn bản); `xoaAnhMayCua` xóa ảnh khi xóa hẳn.
    - `gopChiMuc` gộp cả `scan` / `kyAnh` theo giờ sửa; `gopTheoSua` bỏ qua mục đang ở rác.
    - `xoaNhieuVaoRac` + `baoHoanTac` (↩ Hoàn tác).
    - `tuDonRac` (cờ `D.cauHinh.racTuXoa`).
  - **Dọn kho:**
    - `DK`, `moDonKho(phan)`, `veDonKho`, `veRacHTML`, `nganRac`, `noiCu`, `duongThat`.
    - Trang vẽ trong `#ds-vb` của tab Văn bản (giống Chờ khai); `doiNgan` tự tắt.
  - **Lập chỉ mục:** `lapChiMuc` (tên cũ `quetTu` vẫn gọi được), `phanTheoDuong`, `taoMucTuDrive`, `veLapChiMucHTML`; file chưa rõ phần → `lapChiMucQD`.
  - **Quét rác:** `moQuetDon` → `veQuetRacHTML` (trang), `nhomTrungQD` (SHA trong app + md5 Drive), `xuLyQuetDon` → thùng rác.
  - **Xem thử:** `xemThu(loai,id,i)`; `layNoiDung` hiểu scan / KA / `tuKhay` / `khongLuu`; `xemExcel` (SheetJS), `xemWord` (XLSX.CFB đọc docx).
  - **Chữ ký·CCCD:** `kaTuTimKhung`, `kaXuLy` (nanPhoiCanh), `moChinhGocKA` dùng chung `moManCG` với Scan.
  - **Thanh bước:** `buocHTML(n, {lui, tiep, b1..b3})`; `phimChung` (Esc / Enter, bắt ở pha capture).
  - **Hướng dẫn:** `moHuongDan(phan)`, `noiDungHD`, `CO_GI_MOI` (sửa mỗi bản), `kiemCoGiMoi` (cờ `D.cauHinh.daXemMoi`; máy chưa có dữ liệu thì không hiện).
  - **Đã xóa:** `moChiMuc`, `quetDrive`, `moGomTrung`, `gomTrungLam`, `gomFile`, `napMotTuDrive`, màn cắt KA cũ, `boScanHan` / `boKAHan`.
  - **Giới hạn:** Lập chỉ mục chỉ thấy file app tạo hoặc chọn qua Picker (quyền Drive giữ như hiện tại, nâng cấp sau); Word `.doc` cũ không xem được trong app.

- **3.50b — Đường dẫn dưới mỗi dòng Scan và Chữ ký·CCCD:** `duongDongHTML` / `moNoiLuu` (bấm mở thư mục Drive; chưa lên Drive ghi "chỉ trong máy"). Phép thử `t53.js`.

- **3.51 — Mở PDF nhanh · 📁 Bộ hồ sơ trong Thư viện · sửa Chữ ký·CCCD không lưu trong máy:**
  - **PDF nhanh:**
    - `moPDFNho(khoa, b)` giữ 6 tài liệu đã mở (`PDF_MO`/`PDF_MO_THU`), mở lại không đọc lại.
    - `hamNongPDF()` khởi động worker PDF.js sau 3 giây mở app.
    - Rê chuột lên dòng 150 ms → `taiTruocMuc(id)` tải sẵn.
    - `veTamNhin` vẽ từng trang nối tiếp (`S.chuoi`), dpr tối đa 2; `veVaoKhung` bỏ kết quả cũ khi đã chọn file khác.
    - `xemBenPhai` chỉ đổi lớp `.chon`, không vẽ lại cả danh sách; `luu` dời 1,5 giây.
    - Đo giả lập: mở lần đầu 1,6 s → 0,23 s; mở lại 0,6 s → 0,02 s.
  - **Sửa lỗi cũ:** `nap()`/`luu()` trước đây không lưu `kyAnh` trong máy (chỉ có trên Drive) → nay lưu cả `kyAnh`, `boHS`.
  - **Bộ hồ sơ (`D.boHS`):**
    - Mục: `{id, ten, loai, khach, xa, diem, ap, to, hoi, ghiChu, file:[{k:'muc'|'scan'|'ka'|'rieng', id, ten, co, loai, driveId, driveCha}], taoLuc, suaLuc}`.
    - Hàm: `BO`, `LOAI_BO_MD`/`dsLoaiBo` (`D.cauHinh.loaiBoHS`), `taoBoHS`/`xongTaoBo`, `suaBoHS` (chọn Xã → Điểm → Ấp → Tổ; Hội tự lấy theo tổ qua `hoiCuaTo`), `veBoHS` (cây + lọc Hội), `veMotBo`, `moGanFileBo`/`xongGanFile` (gắn file có sẵn), `themFileBo` (file riêng, IDB `bf…`), `dayFileBoCho` (đẩy lên `Tủ hồ sơ / Bộ hồ sơ / <tên bộ>`), `goFileBo`, `xoaBoHS`, `boCuaFileHTML` (dòng "Thuộc bộ" ở khung xem).
    - Gỡ file gắn = chỉ bỏ liên kết (có Hoàn tác), file gốc giữ nguyên; xóa file riêng / xóa bộ → thùng rác ngăn **📁 Bộ hồ sơ**.
    - Đồng bộ qua chỉ mục (`goiChiMuc`, `gopChiMuc` theo giờ sửa). Lập chỉ mục / Quét rác coi file riêng của bộ là file đã biết.
    - Lớp CSS `bhs-*` (tránh trùng `.bo-*` của bộ biểu mẫu); hàm `suaBoHS` (tránh trùng `suaBo`).
  - **Thư viện:** 2 phần 📁 Bộ hồ sơ (mặc định) · 🖼 Ghi chú ảnh. **Bỏ phần Bảo trì kho trong Thư viện**; tóm tắt sức khỏe kho chuyển lên đầu trang 🧰 Dọn kho.
  - Phép thử mới `t54.js` (tốc độ), `t55.js` (Bộ hồ sơ), sửa `t33.js`.

- **3.52 — Hôm nay: chụp nhanh, gắn file, sửa việc SCHEDULE:**
  - **Dữ liệu:** mẩu / dòng (`D.lich.note`) có thêm `dinh:[{k:'rieng'|'muc'|'scan'|'ka', id, ten, co, loai, anh, driveId, driveCha, may, themLuc}]`.
    - File riêng nằm trong IDB `nf…`, ảnh nhỏ ở `nf…_nho`.
    - Lên Drive ở `Tủ hồ sơ / Nhật ký / YYYY-MM`.
  - **Hàm:**
    - Lưu và chọn file: `nkAnhRa` (thu nhỏ), `nkLuuFile`, `nkChonFile`, `nkThemVao`, `nkChupNhanh` / `nkTaoDongAnh`, `nkMenuDinh`, `moGanFileNK`.
    - Hiển thị và xem: `nkDinhHTML`, `nkNapAnhNho` / `nkLayAnhNho`, `nkXem` + `nkVeLB` / `nkLat` / `nkVuot` / `nkTaiVe`.
    - Gỡ và thùng rác: `nkGo`, `nkVaoRac` / `nkKhoiPhuc` / `nkFileCuaRac`.
    - Drive: `nkDriveIds`, `dayFileNKCho`, `dayBlobLenDrive` (dùng chung với Bộ hồ sơ).
    - SCHEDULE: `lcSua` / `lcSuaXong`.
  - **Hộp Gắn file dùng chung:** `GAN.nk` + `ganDich()`.
  - **Thùng rác:** mục `khoCu:'homNay'` giữ `note` (cả dòng) hoặc `nkFile` + `nkNote` (một file). `khoiPhucRac` gọi `nkKhoiPhuc`; `xoaAnhMayCua` xóa file riêng.
  - **Sửa lỗi trùng biến:** `HOAN_TAC` là ngăn hoàn tác của sổ; biến của `baoHoanTac` đổi thành `BAO_HT`. ⚠ `kiem.py` chỉ bắt trùng tên hàm, không bắt trùng biến `var` → khi thêm biến toàn cục phải `grep` trước.
  - **Phép thử mới:** `t56.js` (máy tính + iPhone: chụp, nén, xem, gắn, gỡ, rác, Drive, tải lại), `t57.js` (máy thứ hai lấy ảnh từ Drive).

- **3.53 — Đọc phần đầu văn bản · Hôm nay gọn · chip hệ thống · bộ nhớ máy:**
  - **Đọc văn bản:**
    - Nhận tiêu đề và thân: `RE_TIEU_DE_VB`, `RE_THAN_VB`, `laTieuDeVB`.
    - Phần đầu: `vungDauVB` (các dòng trước tiêu đề / "Căn cứ"), `docDauVB` (số, ngày, dòng "ban hành kèm theo").
    - Trích yếu: `rutTyVB` (V/v → tiêu đề + dòng dưới → cách cũ).
    - So số hiệu: `chuanSoHieu`.
    - `phanTichBoCuc` giới hạn `yThan` và bỏ tìm cả trang.
    - ⚠ Regex tiếng Việt: không dùng `\b` sau chữ có dấu (JS coi "Ế" không phải ký tự chữ) → dùng `(?![A-Za-zÀ-ỹĐđ])`.
  - **Hôm nay:**
    - `datGon(k)` với cờ `D.cauHinh.moCXL` / `moGanDay`; lớp CSS `.gon-dong`, `.gon-chip`.
    - Chấm màu tách ra `.dong-mau` (hiện khi `:focus-within` / `:hover`).
  - **Thanh đáy và bộ nhớ:**
    - `capNhatChip` chỉ báo trạng thái nối; thêm `#chip-chua`, `#chip-loi`, `#chip-bn`.
    - `capNhatDaiDrive` không tạo dải vàng nữa.
    - Bộ nhớ: `BN`, `capNhatBoNho` (hỏi `navigator.storage.estimate` tối đa 15 giây / lần), `moBoNho`, `demKhoTheoLoai` (duyệt IndexedDB theo tiền tố khóa), `xinGiuDuLieu`, `nkChuaLen`.
  - **Số đếm:** `capNhatDemTab` điền `.dem-tab` từ `BOT_DS[tab]`.
  - **Phép thử mới:** `t58.js` (4 mẫu văn bản), `t59.js` (giao diện Hôm nay, thanh đáy, bộ nhớ, số đếm).

### Danh sách thử trên máy thật (3.61) — anh ghi Đạt / Chưa
1. Thêm lại hướng dẫn 4336/HD-NHCS và công văn 4339 → số, ngày, trích yếu đúng chưa.
2. Tab Scan: dòng ✓ Đạt / ⚠ thiếu gì có đúng với từng bản không; ⚠ Chưa đạt; đổi Ngày / Tuần / Tháng; 🌳 Cây → bấm một tổ.
3. Máy tính · tab Scan: bấm một bản → khung phải; ⛶ → Lưu & gửi; Gửi / In ở khung phải.
4. Chờ khai › Khai: văn bản hiện bên phải hộp sửa — sửa tên theo văn bản.
5. Biểu mẫu: tích 3 mẫu → điện thoại 📤 Gửi vào Zalo nhóm tổ; máy tính 🗜 Nén .zip → giải nén thử, tên file tiếng Việt đúng.
6. Mở vài hộp → Esc đóng đúng như nút "Đóng (Esc)" / "Thôi (Esc)".

### Danh sách thử trên máy thật (3.53) — anh ghi Đạt / Chưa
1. Thêm lại file quy chế Tổ TK&VV (bản PDF gốc) → thẻ chờ khai ra 70/QĐ-HĐQT · 24/07/2026 chưa.
2. Thêm một công văn và một quyết định có dòng "Căn cứ…" → số, ngày đúng không.
3. Hôm nay (iPhone): Cần xử lý, Vừa xem gần đây 1 dòng; bấm chip 📥 đi thẳng Chờ khai.
4. Chạm dòng To-do → hiện chấm màu → đổi màu → chạm ra ngoài thu lại.
5. Chip 💾 → số MB có hợp lý không; bấm 🔒 Xin giữ dữ liệu (iPhone cần Thêm vào MH chính trước).
6. Tắt mạng chụp 1 ảnh ở Hôm nay → thanh đáy có "☁ 1 chưa lên Drive" không; bật mạng → mất đi.

### Danh sách thử trên máy thật (3.52) — anh ghi Đạt / Chưa
1. iPhone · tab Hôm nay: bấm 📷 ở ô gõ dưới cùng sổ → chụp → có dòng "📷 Ảnh giờ:phút" với ảnh nhỏ; thời gian từ bấm chụp tới lúc thấy ảnh.
2. Bấm ảnh → xem lớn → chữ trên giấy có đọc rõ không (nếu không, anh báo để tăng lên 2000 px).
3. 📎 trên dòng → 📁 chọn 1 PDF trong máy → bấm tên để xem; 🔗 gắn một văn bản có sẵn.
4. Máy tính mở app → dòng đó có ảnh không (sau khi đồng bộ); trên Drive có `Tủ hồ sơ / Nhật ký / 2026-09`.
5. Xóa dòng có ảnh → 🗑 ngăn 📅 Hôm nay → Khôi phục → dòng và ảnh về đúng ngày.
6. SCHEDULE: bấm việc → ✎ Sửa → đổi tên, lặp lại → Lưu.

### Danh sách thử trên máy thật (3.51) — anh ghi Đạt / Chưa
1. Tab Văn bản: bấm 1 PDF nhiều trang → thấy trang 1 nhanh không; bấm file khác rồi quay lại → hiện ngay.
2. Thư viện › 📁 Bộ hồ sơ › ＋ Bộ mới: loại Rủi ro, khách "…" → chọn Xã → Điểm → Ấp → Tổ → Hội tự điền đúng không.
3. 🔗 Gắn file có sẵn: tìm biên bản ở Văn bản, bản scan HĐ → tích → Gắn; bấm từng file xem được ở khung phải.
4. 📎 Thêm file mới (giấy chứng tử) → trên Drive có trong `Tủ hồ sơ / Bộ hồ sơ / <tên bộ>` không.
5. Cây bên trên: bấm Xã / Điểm / Ấp / Tổ / Hội → lọc đúng bộ; mở máy thứ hai → bộ và ghi chú có theo không.
6. Chụp 1 Chữ ký·CCCD → tải lại trang (F5) → vẫn còn trong danh sách.

### Danh sách thử trên máy thật (3.50) — anh ghi Đạt / Chưa
1. Xóa 1 file ở tab Văn bản → bấm **↩ Hoàn tác** trên thông báo → file về chỗ cũ.
2. 🗑 Xóa file → tích 2 file → Xóa 2 file → mở 🗑: dòng đầu ghi đúng ngăn → Khôi phục 1 file, Làm trống ngăn.
3. Xóa 1 bản scan đã lên Drive → trên Drive file nằm ở `_ThungRac` → Khôi phục → file về CCCD / xã / ấp / tổ.
4. 📁 Chữ ký · CCCD → chụp CCCD → ✂ Chỉnh viền kéo 1 góc (kính lúp) → Xong → Esc (về ①) → Enter (sang ②) → lưu (< 200 KB).
5. 🧰 › 🗂 Lập chỉ mục → kết quả chia theo tab; bấm 1 tên → xem ở khung phải; đường dẫn đúng.
6. 🧰 › 🧹 Quét rác → nhóm Trùng chọn bản giữ → Dọn → ↩ Hoàn tác.
7. Chờ khai: bấm 1 file Excel / Word → xem được bảng / chữ.
8. ⚙ › Dữ liệu › 🔄 Reset dữ liệu thử: xem dòng "Sẽ …" có đúng số không (chưa cần bấm Reset).

### Danh sách thử trên máy thật (3.49) — anh ghi Đạt / Chưa
1. Tab Văn bản rồi tab Tháng: 🗑 Xóa file → tích 2 file → Xóa 2 file → Vào thùng rác → 🗑 Khôi phục 1 file về đúng chỗ.
2. "Thêm vào tủ trước ngày" gõ ngày hôm nay → Chọn → số file có khớp không → Thôi.
3. Máy bàn: 📁 Chữ ký · CCCD → chụp → bước ③ bấm 💾 Lưu nhanh → chọn thư mục `D:\Nhap may\CK-CCCD` → bấm lần 2 có ghi thẳng không hỏi không.
4. Bật "Tự lưu xuống máy mỗi lần lưu" → chụp tiếp → file tự có trong thư mục không.
5. 📋 Copy → dán vào Zalo PC; dán vào hệ thống nhập máy — file có dưới 200 KB không (có cầu nối là file JPG gốc).
6. Khung xem bên phải: có 🖥 Mở máy · 📋 Chép · 📂 không; bấm 🖥 mở Word/PDF đúng file.
7. Bảo trì kho › Quét rác → xem nhóm A/B/C; thử 🔎 Kiểm tra nội dung; đưa 1 file lạc vào khay chờ → Duyệt.

### Danh sách thử trên máy thật (3.46) — anh ghi Đạt / Chưa
1. iPhone · tab Scan · ⚡ Tự động · Thẻ: quét 2 người (4 mặt) → ① chạm đổi chỗ 2 ảnh, ▲▼ dời người → Xem trước → Tiếp.
2. Bước ③: sửa tên → 📤 Gửi qua Zalo; thử 🖨 In (chọn 100%) → cắt theo đường đứt quãng có hình kéo, các thẻ có đều không.
3. Có nối Drive: bản vừa lưu tạm có nằm trong `Hồ sơ scan / Chưa khai / 2026-09` không → ✎ Khai đầy đủ → file có tự dời sang `CCCD / xã / điểm / ấp / tổ` không.
4. Tắt mạng, quét + lưu tạm → bật mạng, mở lại app (hoặc bấm chấm Drive) → bản đó có tự lên Drive không.
5. Tài liệu nhiều trang (5–8 trang): thời gian từ "Xem trước" tới lúc thấy trang 1; thanh chạy có hiện số trang không.
6. Chữ ký: 📁 → tên khách → ✍ Chụp chữ ký → kéo khung → Xem (dưới 200 KB?) → Tiếp → file `ngày Tên CK.jpg` có trong `Chữ ký - CCCD / 2026-09` không.
7. CCCD mặt trước: như bước 6 với 🪪 Chụp CCCD; thử mức Nhỏ / Vừa / Nét.
8. Máy bàn có webcam: 📷 Webcam → Tự động và Thủ công (phím cách); ảnh CCCD có nét không.
9. Khay chờ: thêm một PDF chụp (không chữ) → có nhãn "PDF ảnh", ngày để trống → 🔍 Đọc chữ (lần đầu cần mạng) → sửa → Áp dụng.
10. Cài đặt › Google Drive › Tự đồng bộ: tắt / bật từng mục; ☁ Đồng bộ ngay.

### Ghi chú kiểm thử
- `hoiquy.js` thỉnh thoảng báo 1 lỗi rồi chạy lại thì đạt (7 lần liên tiếp sạch, cả khi chạy song song) — do thời gian chờ cố định trong kịch bản thử, không phải lỗi app. Lần sau nên đổi các chỗ chờ cố định sang chờ theo điều kiện.

### Kế hoạch tiếp theo
- **Để sau (anh nói sẽ tính kỹ):** con số "N thiếu" dưới ma trận đang đếm theo cột đang hiện, nên gộp hay tách điểm thì số đổi. Nên đếm theo đúng danh sách thiếu dùng khi Chốt kỳ để số không đổi.
- Backlog cũ (F đồng bộ nhiều máy, G SRI, H cảnh báo chép AI, I định dạng số, J cắt ảnh nền kính, K ngày của PDF scan không chữ) vẫn chờ anh chốt.
- Khuyên KHÔNG mở tên thư mục chuẩn trên Drive (đổi là lệch chỉ mục).
- **3.36 — Chế độ tối:** sổ ghi chú luôn giữ giấy vàng, không đổi theo máy.
- **3.32 — Giao diện:** mọi nút mới dùng khối CSS "CHUẨN HÓA NÚT & BỐ CỤC" ở cuối `<style>`, không tự đặt cỡ hay màu riêng.

---

## 2. Việc còn lại — chờ anh Nhân quyết

| # | Việc | Vì sao chưa làm |
|---|---|---|
| F | Đồng bộ nhiều máy ghi đè cả file — L8 | Anh ít dùng nhiều máy cùng lúc → ưu tiên thấp |
| G | Thư viện CDN không có SRI, bản cất không tự cập nhật — R5 | Nâng SheetJS, thêm SRI, cất theo phiên bản |
| H | Cảnh báo dữ liệu khách khi bấm 📋 Chép sang AI — R4 | Nhỏ, làm được ngay khi anh đồng ý |
| I | `soTu` đọc sai số viết kiểu Anh (1,234.5) khi cộng thử bảng Excel | Nhỏ |
| J | Tìm khung CCCD nhạt màu trên nền sáng bóng (bàn kính) còn lệch 71–91% → phải kéo góc tay | Cần thêm ảnh thật nhiều kiểu nền để dò tiếp trọng số `TS_THE` |
| K | PDF chụp scan không có chữ: ngày tự điền "hôm nay" khi thêm vào tab Văn bản | Đề xuất để trống ngày và nhắc dùng Chép sang AI — chờ anh duyệt |
| L | **Thống nhất nút Đóng ↔ Esc toàn app** (anh chốt 01/10/2026): mọi hộp / màn có nút đóng ghi **"Đóng (Esc)"**, bấm nút và bấm Esc làm **cùng một việc**. Gộp các nút trùng việc (Xong, Thôi đóng hộp, ✕, ‹ Về danh sách…) cho khớp. | Anh dặn chưa cần làm liền — **làm luôn ở lần sửa kế tiếp** |

### Kế hoạch gom — làm một lượt (anh chốt 01/10/2026: anh dùng thử, ghi thêm tinh chỉnh vào đây; gom đủ thì làm một lần)

✅ **Đã làm hết L → T ở bản 3.61** (02/10/2026). M: không sửa cầu nối (máy tính dùng .zip), tên zip tự đặt. Việc mới anh nêu thì ghi tiếp dưới bảng này.

| # | Việc | Nội dung đã thống nhất | Còn chờ anh chốt |
|---|---|---|---|
| L | Nút Đóng ↔ Esc toàn app | Mọi hộp / màn: nút ghi **"Đóng (Esc)"**, bấm nút = bấm Esc; gộp các nút trùng việc (Xong, Thôi đóng hộp, ✕, ‹ Về danh sách…) | — |
| M | Biểu mẫu: gửi nhiều mẫu một lần | **1. Chọn:** ô ☐ rõ ở mỗi dòng (như tab Scan 3.58). Thanh dính trên cùng: `Đã chọn N mẫu (x MB) · 📤 Gửi N file · 🗜 Nén .zip · 🖨 In cả bộ · Bỏ chọn`. 📚 Bộ biểu mẫu tích sẵn mẫu của bộ → Gửi ngay.<br>**2. 📤 Gửi nhiều:** điện thoại mở bảng chia sẻ với cả N file (Zalo nhận đủ một lần, giữ tên chuẩn); máy tính có cầu nối: 📋 Copy N file → Ctrl+V vào Zalo PC; không cầu nối: dùng .zip.<br>**3. 🗜 Nén .zip:** app tự nén (không cần mạng / thư viện), tên tiếng Việt giữ đúng, ví dụ `Bieu mau - Ho so vay HN - 01-10-2026.zip`; điện thoại → chia sẻ, máy tính → Lưu nhanh / tải về.<br>**4.** Mẫu chỉ có trên Drive tự tải về trước, có tiến độ "Đang lấy 3/5…".<br>**Tư vấn:** gửi tổ trưởng / Hội → dùng Gửi nhiều file (mở trên điện thoại dễ); .zip cho người dùng máy tính hoặc > 10 file → Gửi là nút chính, Nén là nút phụ. | (1) Sửa cầu nối để Copy nhiều file — anh phải chạy lại file cài cầu nối 1 lần? (2) Tên .zip theo mẫu trên hay hỏi tên mỗi lần? |
| N | Scan: trạng thái Đạt / Chưa đạt + 2 cách xem danh sách | **N1.** Dòng dưới tên mỗi bản: **✓ Đạt** (xanh) `✓ Đạt · Xã › Điểm › Ấp › Tổ · ☁ đã lên Drive`; hoặc **⚠ Chưa đạt** (vàng) ghi rõ thiếu gì trên một dòng (Tên tạm · Thiếu mặt sau · Chưa gán tổ · Chưa lên Drive). Đề xuất Đạt khi: tên là tên khách (không phải tên tạm) + đủ 2 mặt CCCD (tài liệu ≥ 1 trang) + đủ Xã › Điểm › Ấp › Tổ + đã lên Drive đúng thư mục tổ. Chip lọc nhanh `⚠ Chưa đạt (n)`.<br>**N2.** Nút chuyển kiểu xem (nhớ lựa chọn): **☰ Danh sách** nhóm theo Ngày / Tuần / Tháng (đầu nhóm: số bản · đạt · chưa); **🌳 Cây** Xã › Điểm GD › Ấp/KP › Tổ (đếm + số chưa đạt, bấm tổ để lọc, nhánh riêng "Chưa khai địa bàn"; dùng lại kiểu cây Bộ hồ sơ; điện thoại thu gọn). Ô ☐ in nhiều người vẫn dùng ở cả hai. | ✅ Anh chốt 01/10/2026: (1) tiêu chí Đạt giữ đúng 4 điều kiện trên, **không** thêm "đã in"; (2) mặc định mở tab: **☰ Danh sách, bản mới lưu lên trước** (nhóm theo ngày). |
| O | Scan (và Chữ ký · CCCD): bấm vào file → xem ở khung preview bên phải trước | Theo đúng nguyên tắc tab Văn bản: **máy tính** bấm một dòng → PDF / ảnh hiện ở **khung xem bên phải** (tên, đường dẫn, trạng thái Đạt / thiếu gì), dưới khung có nút nhanh 🖨 In · 📋 Copy / 📤 Gửi · ✎ Khai · **⛶ Mở lớn** — cần chỉnh / lưu & gửi đầy đủ mới bấm Mở lớn (ra màn ③ Lưu & gửi như hiện nay). **Điện thoại** (không có khung phải) giữ như cũ: mở khung xem lớn. Rê chuột tải trước như PDF văn bản (3.51). | Anh nêu 01/10/2026 — chưa cần chốt thêm |
| P | Scan: mỗi bản 2 dòng thay 3 (làm chung với N) | Hiện 3 dòng (tên · đường dẫn · nhãn + nút). Gom 2 dòng, không bớt thông tin: **Dòng 1** `☐ 🪪 Tên · Ấp · Tổ ······ ngày [🖨][✎][🗑]` (ngày + nút sang phải); **Dòng 2** trạng thái + nơi lưu gộp: `✓ Đạt · ☁ Xã › Điểm › Ấp › Tổ` hoặc `⚠ Thiếu mặt sau · Chưa khai tổ · 💻 chỉ trong máy`; đường dẫn rút từ cấp Xã (bỏ "Tủ hồ sơ / CCCD /"), rê chuột thấy đủ, bấm mở thư mục như 3.50b; tag / chương trình vay thành chip nhỏ cuối dòng 2, ghi chú hiện khi rê chuột. Điện thoại vẫn 2 dòng (ẩn 🖨 ✎ như nay). Đề xuất làm cùng kiểu cho danh sách Chữ ký · CCCD. | Anh nêu 01/10/2026 |
| Q | Mọi danh sách toàn app: mỗi mục tối đa 2 dòng (mở rộng P) | **Quy tắc chung:** **Dòng 1** = ☐ · biểu tượng · **tên** · thông tin chính (trích yếu / kỳ / ấp-tổ, cắt "…" khi dài) · ngày bên phải; **Dòng 2** = trạng thái (✓ đủ / ⚠ thiếu gì) · nơi lưu rút gọn (bấm mở thư mục, rê chuột thấy đủ) · chip nhãn nhỏ · **nút nhỏ 28px** bên phải (hiện nay nút 34px làm dòng 2 dày). Áp cho: Văn bản, Tháng (danh sách), Biểu mẫu, Thư viện (Bộ hồ sơ, Ghi chú ảnh), Scan, Chữ ký·CCCD, **Chờ khai** (nay 3 dòng: tên / nhãn / đường dẫn), Thùng rác, Dọn kho (Lập chỉ mục, Quét rác), Hôm nay › Vừa xem gần đây. Kèm: thanh "Sắp xếp · Danh sách / Nhóm · Khung xem · Ổ G · Drive" đang xuống 2 hàng ở khổ 1366 → gọn 1 hàng (nút nhỏ, vuốt ngang khi hẹp). Điện thoại: vẫn 2 dòng, nút phụ ẩn như nay. **Thêm (anh nêu):** chữ mờ sau tên file ở tab Văn bản là trích yếu — bỏ khi trích yếu đã nằm trong tên (đa số), chỉ hiện khi tên khác trích yếu (file chưa đổi tên chuẩn / tên bị cắt); rê chuột vào tên thấy đủ tên + trích yếu; tên dài được cả dòng 1. | Anh nêu 01/10/2026 |
| R | Chi tiết / Sửa văn bản: khung xem văn bản ngay bên cạnh | Máy tính: hộp sửa chia đôi — trái là ô số hiệu, ngày, trích yếu, loại + tên chuẩn đề xuất (cập nhật khi gõ); phải là khung xem văn bản mở sẵn trang 1 (lật trang, phóng to). Điện thoại: văn bản ở trên (thu gọn được), ô sửa ở dưới. 🔍 Đọc lại & gợi ý tên / bảng so sánh cũng kèm khung xem. Áp cho thẻ Chờ khai, khay chờ duyệt, ✎ Sửa ở tab Văn bản. | Anh nêu 01/10/2026 |
| S | **Lỗi đọc tên (do 3.53)** — đề xuất sửa riêng ngay | (1) Luật "ban hành kèm theo Quyết định số … ngày …" chỉ áp khi tiêu đề là QUY CHẾ / QUY ĐỊNH / ĐIỀU LỆ — hướng dẫn 4336/HD-NHCS bị lấy nhầm 70/QĐ-HĐQT. (2) Không lấy ngày trong dòng V/v (4339 bị lấy ngày 27/8 của QĐ được nhắc) — ưu tiên dòng "…, ngày … tháng … năm …". (3) Nhận ra lớp chữ PDF lỗi font ("NQI DUNG… LA4P… DO!") → không dùng, lấy trích yếu theo tên file + ghi "chữ PDF lỗi font — kiểm tra bằng khung xem". Thêm 3 mẫu này vào t58. | Chờ anh: sửa riêng ngay hay gom |
| T | Mọi ô nhập có mẫu gợi ý | Mỗi ô nhập có **chữ mờ mẫu** trong ô + **1 dòng nhỏ hướng dẫn** ngay dưới (hiện khi bấm vào ô). Ví dụ: Số hiệu `4339/NHCS-TDNN · 70/QĐ-HĐQT · 125/TB-NHCS` (số / loại-cơ quan; không cần gõ dấu, app tự thêm Đ); Ngày `dd/mm/yyyy — gõ 150926 tự thành 15/09/2026`; Trích yếu `Viết như dòng V/v, không ghi "V/v", không dấu chấm cuối`; Kỳ `08/2026`; Tên khách `Họ tên đầy đủ, có dấu`; Tổ `05 — Nguyễn Văn A`. Áp cho: Khai / Sửa văn bản, Dữ liệu tháng, Biểu mẫu, Scan (khai khách), Chữ ký·CCCD, Bộ hồ sơ, Lịch (sửa việc), Cài đặt. Rà ô nào chưa có thì thêm, ô đã có thì thống nhất cách ghi. | Anh nêu 01/10/2026 |

#### Đợt gom tiếp theo (sau 3.61) — ghi nhận, chưa làm

| # | Việc | Nội dung đã thống nhất | Còn chờ anh chốt |
|---|---|---|---|
| U | Khung xem file (PDF văn bản, scan CCCD…): vùng xem rộng tối đa, kéo chạm đáy màn hình | Anh nêu 02/10/2026 (ảnh khung xem scan "Đạt"): nút đang chiếm nhiều chỗ, khung xem chưa chạm dòng cuối. **Đề xuất:** (1) Hộp xem cao gần hết màn hình, vùng trang tự giãn kéo tới sát hàng nút dưới cùng, không để khoảng trắng thừa. (2) Thanh công cụ (⏮ ‹ trang › ⏭ · − % + · ↔ · ⊡ · ↗) gọn còn 1 dòng nút 28px, gộp lên cùng dòng tiêu đề khi đủ chỗ; file chỉ 1 trang thì ẩn cụm lật trang. (3) Hàng nút dưới (Gửi cả file · In · Sửa) thấp lại khoảng 34px, giữ đủ 3 nút và chữ. (4) **Bỏ hẳn dòng nhắc "Mở thẳng file trên máy… Cài cầu nối" khỏi khung xem, không thêm chip thường trực** (anh chốt lại 02/10/2026: việc cài chỉ làm 1 lần). Chỉ báo khi cần: trên máy tính **chưa xác nhận cài**, lần đầu anh bấm việc cần cầu nối (🖥 Mở trên máy · 📋 Copy file · 📂 Mở thư mục) → hiện hộp "Máy này chưa cài cầu nối" với [Tải bộ cài · Mở thử · Để sau]; Mở thử thấy hộp "Cầu nối đã chạy" → bấm "Có, đã thấy" → app nhớ theo máy, **từ đó không nhắc gì nữa**. "Để sau" → dùng cách dự phòng như hiện nay (tải file / chép ảnh), không nhắc lại mỗi lần. Máy đã cài → bỏ qua hoàn toàn. Điện thoại không liên quan. **Giới hạn kỹ thuật:** trình duyệt không cho trang web tự dò lối mở `tuhoso:` đã cài hay chưa và không báo khi mở thất bại, nên "đã cài" dựa trên lần xác nhận Mở thử (như 3.49). Nếu sau này gỡ / cài lại: Cài đặt › Cầu nối vẫn có ô "Máy này đã cài cầu nối" + nút Mở thử. (5) Scan CCCD mở sẵn chế độ "vừa khung" để 2 mặt thẻ to nhất có thể. Áp chung cho khung xem lớn và khung xem bên phải. | ✅ Anh chốt: chỉ báo khi chưa cài, cài rồi bỏ qua (02/10/2026) |
| V | Dòng danh sách (Văn bản, Scan, các tab khác) mỏng hơn — thấy nhiều file hơn trên 1 màn hình | Anh nêu 02/10/2026: đã 2 dòng/mục nhưng còn dày. **Yêu cầu:** vẫn đủ thông tin, **không mất chữ**. **Đề xuất:** đo chiều cao hiện tại mỗi mục rồi giảm khoảng 25–30%: bớt khoảng đệm trên/dưới, khoảng cách giữa 2 dòng, dòng 2 chữ nhỏ hơn một chút (11,5px), nút 24–26px canh giữa theo 2 dòng; biểu tượng file nhỏ lại; đường kẻ giữa các mục mảnh hơn. Không cắt chữ thêm so với hiện nay (tên vẫn dài hết dòng 1, rê chuột thấy đủ). Chụp màn hình trước/sau ở khổ 1366 và iPhone để anh so số file thấy được trên 1 màn hình. Áp cho mọi danh sách đã chuẩn 2 dòng ở mục Q. | — |
| W | Tab Hôm nay: lịch thu 70% + cột **gadget** (công cụ tính mini) bên phải | Anh nêu 02/10/2026; đã gửi ảnh demo dựng tạm. **Bố cục:** lưới lịch rộng 70% (ô ≈ 43×34 ở 1366, không mất ngày âm); 30% còn lại là cột nút gadget xếp dọc, cao bằng lịch. Bấm gadget → **ô tính mở ngay dưới lịch** (không che sổ bên phải), có "Đóng (Esc)"; bấm gadget khác thì thay ô. Điện thoại: gadget thành hàng biểu tượng vuốt ngang trên lịch, ô tính mở toàn màn.<br>**Khung gadget dùng chung (làm trước):** mỗi gadget là 1 mục đăng ký (biểu tượng, tên, hàm vẽ ô) → sau này thêm gadget mới không phải sửa bố cục; ô "＋ Thêm" / Cài đặt để bật-tắt, sắp thứ tự.<br>**Bảng tham số do anh nhập (không gắn cứng trong code):** Cài đặt › Lãi suất & quy định: mỗi chương trình vay → lãi suất %/tháng, **ngày áp dụng** (giữ lịch sử khi lãi suất đổi), tỷ lệ lãi quá hạn, ghi căn cứ văn bản (số hiệu, có thể liên kết tới VB trong tab Văn bản). App **không tự điền số** lãi suất.<br>**Gadget đợt 1 (đề xuất):** (1) 🧮 **Tính lãi**: chương trình · dư nợ · từ ngày → đến ngày → số ngày + tiền lãi + công thức hiện rõ; nếu kỳ tính vắt qua ngày đổi lãi suất thì tự chia đoạn. (2) 📈 **Lãi suất CT**: bảng tra lãi suất hiện hành các chương trình (lấy từ bảng anh nhập). (3) ⏰ **Nợ quá hạn**: nhập ngày đến hạn + dư nợ → số ngày quá hạn, lãi quá hạn theo tỷ lệ đã nhập. (4) 📆 **Phân kỳ trả nợ**: số tiền vay · ngày vay · thời hạn · số kỳ (hoặc 12/24 tháng một kỳ) → bảng các kỳ: ngày đến hạn, tiền gốc mỗi kỳ (kỳ cuối nhận phần lẻ). (5) 🎓 **Hạn HSSV**: tính ngày đến hạn / bắt đầu trả theo quy định chương trình HSSV. Kết quả mỗi gadget có nút 📋 Chép (dán Zalo) và 📝 Ghi vào to-do hôm nay. | **Cần anh cung cấp trước khi code:** (a) công thức tính lãi chuẩn nội bộ đang dùng (dự kiến: dư nợ × lãi suất tháng ÷ 30 × số ngày thực tế — anh xác nhận); (b) tỷ lệ lãi quá hạn và cách tính áp dụng; (c) quy định phân kỳ (làm tròn, kỳ cuối) và quy tắc thời hạn / đến hạn HSSV (văn bản căn cứ); (d) danh sách lãi suất hiện hành để anh tự nhập lần đầu. (e) Chốt 5 gadget đợt 1 và thứ tự. |

## 3. Việc cần kiểm trên máy thật

Đã chạy thử bằng Chromium giả lập. Các phần sau **chưa thử được** trong môi trường giả lập:
- **Google Picker (mục 10):** cần API key thật — cách tạo và cách dùng xem mục 5. Với quyền `drive.file`, chưa chắc chọn **thư mục** thì app có đọc được file bên trong không. Nếu không đọc được, app đã báo và hướng dẫn chọn trực tiếp file.
- **Mở biểu mẫu bằng Google Docs** (`docs.google.com/document/d/<id>/edit?rtpof=true`) với file `.docx` trên Drive của anh.
- **Chép đường dẫn ổ G:** tên ổ đĩa đúng theo máy (Cài đặt › Google Drive › Thư mục Drive trên máy).
- **Cây địa bàn trên iPhone thật:** trên giả lập đo dưới 10 ms mỗi lần bấm.
- **Tab Scan 3.35 trên điện thoại thật:** tốc độ xử lý ảnh (giả lập 0,3–0,5 giây/ảnh), kéo góc bằng ngón tay, in thật xem thẻ rộng khoảng 88 mm, khe cắt đều 14 mm (nhớ chọn "Kích thước thật / 100%").

## 4. Cách kiểm thử đã dùng cho 3.31

- 3 phép kiểm mục 0.5 (bản quét mọi lời gọi hàm).
- Chromium không giao diện, chạy cả khổ máy tính và iPhone 13, trên máy trắng và máy có dữ liệu cũ (dữ liệu dạng 3.29):
  - Đi đủ 6 tab và 12 trang Cài đặt.
  - Thêm file vào từng tab: PDF văn bản thật, Excel tab Tháng, biểu mẫu, ảnh ghi chú, scan 2 mặt.
  - Xuất và nạp lại dự phòng.
  - Tái hiện lại từng lỗi đã sửa để xác nhận đã hết.
- Thư viện pdf.js 3.11.174, pdf-lib 1.17.1, SheetJS 0.18.5 lấy qua npm cùng phiên bản với CDN, định tuyến thay cdnjs khi chạy thử.
- Các kịch bản thử hiện nằm ngoài repo (cần Playwright). Nếu anh đồng ý, có thể đưa vào thư mục `tests/`; việc này không ảnh hưởng app.

## 5. Google Picker — quét kho Drive cũ (giải thích cho anh Nhân)

**Vì sao cần Picker:** app xin quyền hẹp `drive.file`, tức là **chỉ thấy file do chính app tạo ra hoặc file anh tự tay chọn cho app**. Kho cũ anh chép bằng tay vào ổ G thì app không nhìn thấy. Picker là cửa sổ chọn file của chính Google: anh chọn file nào, Google cấp cho app quyền **với đúng file đó**, không cấp gì thêm.

**Vì sao không xin quyền đọc toàn bộ Drive:** quyền đó (`drive.readonly`/`drive`) bị Google xếp loại nhạy cảm, phải qua Google thẩm định app mới dùng được cho người ngoài dự án, và mở cho app đọc mọi thứ trong Drive. Picker an toàn hơn và không cần thẩm định.

**Cần chuẩn bị một lần (anh tự làm trong Google Cloud, cùng dự án với Client ID đang dùng):**
1. APIs & Services › Library › bật **Google Picker API**.
2. APIs & Services › Credentials › Create credentials › **API key**.
3. Giới hạn key: Application restrictions = Websites, chỉ cho `https://nhannt3-gif.github.io/*`; API restrictions = chỉ Google Picker API.
4. Dán key vào app: Cài đặt › Google Drive › ô "API key của Google Picker". Key chỉ lưu trong máy, không đồng bộ lên Drive.

**Cách dùng:** Cài đặt › Google Drive › **Chọn thư mục / file cũ trên Drive…** → cửa sổ Google hiện ra → chọn → app tải từng file về đọc (số hiệu, ngày, trích yếu, loại báo cáo) → đưa cả xấp vào **khay chờ** → anh xem tên đề xuất, sửa nếu cần, bấm **Duyệt** → lúc đó app mới đổi tên và dời file vào đúng thư mục trong Tủ hồ sơ. Bấm "Bỏ" thì file gốc không bị đụng tới.

**Giới hạn cần biết:**
- **Chọn thư mục:** theo tài liệu Google, quyền `drive.file` cấp cho mục được chọn; với thư mục, **chưa chắc** app đọc được các file bên trong. Nếu không đọc được, app báo và anh chọn thẳng các file (giữ Ctrl hoặc Shift để chọn nhiều, có thể chọn cả trăm file một lần). Việc này phải thử trên Drive thật mới chắc.
- **File Google Docs/Sheets gốc** (không phải .docx/.xlsx) chưa đọc được → app bỏ qua và báo số lượng.
- **File trùng nội dung** với file đã có trong tủ → app bỏ qua và báo số lượng.
- Mỗi file phải tải về máy để đọc (tốn mạng như mở file). Đọc xong app chỉ giữ bản sao để xem nhanh.
