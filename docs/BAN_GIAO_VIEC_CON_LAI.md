# BÀN GIAO VIỆC CÒN LẠI — App Tủ hồ sơ (v2.1)

**Bản hiện tại:** 3.64 · build 03/10/2026 12:00
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

### Danh sách thử trên máy thật (3.64) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Thư viện › ⚠ Theo dõi nợ › 📥 Cập nhật tháng: chọn 3 file tháng 8 | Xem trước: 327 · 54 · 55 món, kỳ 08/2026 → Cập nhật | |
| 2 | Tháng 9: cập nhật file mới | Món mới / phát sinh lại / ra khỏi DS đúng thực tế; thông tin đã bổ sung còn nguyên | |
| 3 | 🌳 Cây địa bàn | Xã › Điểm › Ấp › Tổ đúng; món "Chưa rõ ấp" / "Ấp <mã>" → bổ sung mã ấp trong Cài đặt › Địa bàn | |
| 4 | Mở 1 món → ✎ bổ sung 7 mục hồ sơ hộ | Lưu, sửa lại thấy 🕘 lịch sử | |
| 5 | ➕ Ghi lần làm việc có hạn cam kết | Việc "💰 Cam kết trả nợ" lên lịch Hôm nay đúng ngày | |
| 6 | 📝 Biên bản | File Word mở được trên máy tính và điện thoại, đúng bố cục mẫu, số liệu đúng | |
| 7 | 📎 Chụp hồ sơ gốc trên điện thoại | Ảnh lưu vào hộ, lên Drive Theo dõi nợ/<Xã>/<Tên KH – mã> | |
| 8 | 📍 Lấy vị trí tại nhà khách → 🧭 Chỉ đường | Google Maps mở đúng chỗ | |
| 9 | Máy thứ 2 nối Drive | Thấy đủ danh sách, hồ sơ hộ, nhật ký | |

**Ghi chú kỹ thuật 3.64:** biến `NO` (IndexedDB khóa `tdn_du_lieu`; `napNo`, `luuNo`, `dayNoLenDrive`, `taiNoTuDrive`, `gopNo`) · đọc file `tdnDocFile` → `tdnPhanTich` (bảng cột `TDN_COT`, nhận loại theo cột) → `tdnSoSanh` → `tdnXemTruoc` → `tdnGhi` · giao diện `veTheoDoiNo`, `tdnDSLoai`, `tdnNhom`, `tdnDongHTML`, `tdnCayHTML`, `tdnTheHTML` · hồ sơ hộ `TDN_MUC` (7 mục; thêm mục = thêm 1 dòng), `tdnSuaMuc`/`tdnLuuMuc` (lịch sử `ho.ls`) · lần làm việc `tdnLanMoi`/`tdnLuuLan` (cam kết → `lcData().viec`, trường `tdn`) · biên bản `MAU_BB` (danh mục mẫu), `bbXacMinhNo`, `taoDocx` (dựng .docx bằng `taoZip` có sẵn) · tài liệu `tdnThemFile`, `dayFileNoCho`, gắn file qua `GAN.tdn` · địa bàn theo mã `tdnDiaBan`, ấp của nợ khoanh suy theo `NO.toAp`. Phép thử: `t74.js` (dữ liệu giả 4 tháng, hồ sơ, lần làm việc, biên bản, Hôm nay, tải lại trang), `t75.js` (2 máy qua Drive), `that.js` (đọc file thật — chỉ chạy trong máy thử).

### Danh sách thử trên máy thật (3.62) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Hôm nay (máy tính) | Lịch chiếm ~70%, bên phải cột 🧰: Hạn trả HSSV · Địa bàn · Công cụ 3–5 | |
| 2 | 🎓 Hạn trả HSSV: 25092026 · 28022029 · GDX 25 · tiền 40 | 29 tháng · 70 tháng · hạn cuối 04/08/2032 → **25/07/2032** · lần 1 25/02/2030 · 10.000.000 đ/lần | |
| 3 | Đổi thử hồ sơ thật đã duyệt (anh tự so) | Khớp hồ sơ; nếu lệch ghi lại để em xem | |
| 4 | Bấm câu chốt → dán vào Word / Zalo | Dán đúng câu | |
| 5 | Nhánh "Đến 12 tháng · Y khoa" (khi có hồ sơ) | Anh kiểm kỹ — PGD chưa cho vay trường hợp này | |
| 6 | 🗺 Địa bàn: gõ tên 1 ấp/KP mới gộp/tách | Ra đúng điểm GD, xã, kèm mã; bấm mã → chép | |
| 7 | Điện thoại · Hôm nay | Hàng nút công cụ trên lịch; bấm → hộp công cụ | |
| 8 | Tab Scan (máy tính): bấm 1 bản CCCD | Khung phải hiện 2 mặt thẻ to, kéo sát đáy màn hình | |
| 9 | Văn bản: đếm số dòng thấy trên 1 màn | Nhiều hơn trước (~6 dòng ở 1366, 13 ở 1920), không mất chữ | |
| 10 | Máy chưa cài cầu nối: bấm 🖥 Mở máy ở khung xem | Hiện hộp "chưa cài cầu nối"; "Để sau" → không nhắc nữa, nút ẩn | |

**Ghi chú kỹ thuật 3.62 (cho người tiếp tục):**
- **Công cụ:** mảng `CONG_CU` ({id, ico, ten, tit, ve, nut}); `ccCotHTML` (vẽ trong `veLich`, bọc `.lc-ben`), `ccMo`, `ccDong`, `veCC`, `ccVeThan`, `ccVuaMan` (cao tới đáy). Ô nằm ở `#cc-o` **ngoài** `#lich` để `veLich` vẽ lại không mất chữ đang gõ. Điện thoại: `moHop`, `CC.hop`. Esc: `phimChung` → `ccDong` khi ở tab Hôm nay.
  - Thêm công cụ mới: thêm 1 mục vào `CONG_CU` với `ve()` trả HTML; không phải sửa bố cục.
- **HSSV:** `hsTinh(v)` (thuần, dễ thử) · `hsEdate` (EDATE), `hsThang` (DATEDIF "M"), `hsVeGD` (cột I Excel, trùng ngày lùi 1 tháng, ngày 29–31 lấy cuối tháng), `hsNgayGD`, `hsDoc` (dd/mm/yyyy, dd/mm/yy, 6/8 số). Giao diện `ccHSSVHTML`, `hsKetQuaHTML`, `hsChep`, `hsGhiTodo`; ngày GDX nhớ ở localStorage `tuhoso_gdx`.
- **Địa bàn:** `ccDiaBanHTML`, `dbCayHTML` (lọc theo `CC.db.tim`, `boDau`), `dbSoMa` (so mã kiểu số), `dbChepBang` (TSV).
- **Khung xem:** `veVaoKhung` → scan thẻ có ảnh trong máy hiện `.the-xem` (2 ảnh `docAnhHS`), còn lại `veVaoKhungPDF` (phần cũ). `veDieuKhien`/`veTrang`: 1 trang bỏ lật trang, ô tích, nhãn trang.
- **Cầu nối:** `cnDaBoQua()`, `hoiCaiCauNoi(duPhong)`; `veNutCN` không còn dòng `#cp-cnmeo`.
- **CSS 3.62** nằm cuối thẻ `<style>` (khối "3.62 — việc U/V/W") để đè quy tắc cũ.
- **Phép thử mới:** `t73.js` (HSSV khớp Excel, giao diện, Esc, Địa bàn, điện thoại); đo dòng bằng `dem.js`.

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

#### Đợt gom sau 3.61 — ✅ đã làm hết U · V · W · W① · W② ở bản 3.62 (03/10/2026). Việc mới anh nêu thì ghi tiếp bên dưới.

| # | Việc | Nội dung đã thống nhất | Còn chờ anh chốt |
|---|---|---|---|
| U | Khung xem file (PDF văn bản, scan CCCD…): vùng xem rộng tối đa, kéo chạm đáy màn hình | Anh nêu 02/10/2026 (ảnh khung xem scan "Đạt"): nút đang chiếm nhiều chỗ, khung xem chưa chạm dòng cuối. **Đề xuất:** (1) Hộp xem cao gần hết màn hình, vùng trang tự giãn kéo tới sát hàng nút dưới cùng, không để khoảng trắng thừa. (2) Thanh công cụ (⏮ ‹ trang › ⏭ · − % + · ↔ · ⊡ · ↗) gọn còn 1 dòng nút 28px, gộp lên cùng dòng tiêu đề khi đủ chỗ; file chỉ 1 trang thì ẩn cụm lật trang. (3) Hàng nút dưới (Gửi cả file · In · Sửa) thấp lại khoảng 34px, giữ đủ 3 nút và chữ. (4) **Bỏ hẳn dòng nhắc "Mở thẳng file trên máy… Cài cầu nối" khỏi khung xem, không thêm chip thường trực** (anh chốt lại 02/10/2026: việc cài chỉ làm 1 lần). Chỉ báo khi cần: trên máy tính **chưa xác nhận cài**, lần đầu anh bấm việc cần cầu nối (🖥 Mở trên máy · 📋 Copy file · 📂 Mở thư mục) → hiện hộp "Máy này chưa cài cầu nối" với [Tải bộ cài · Mở thử · Để sau]; Mở thử thấy hộp "Cầu nối đã chạy" → bấm "Có, đã thấy" → app nhớ theo máy, **từ đó không nhắc gì nữa**. "Để sau" → dùng cách dự phòng như hiện nay (tải file / chép ảnh), không nhắc lại mỗi lần. Máy đã cài → bỏ qua hoàn toàn. Điện thoại không liên quan. **Giới hạn kỹ thuật:** trình duyệt không cho trang web tự dò lối mở `tuhoso:` đã cài hay chưa và không báo khi mở thất bại, nên "đã cài" dựa trên lần xác nhận Mở thử (như 3.49). Nếu sau này gỡ / cài lại: Cài đặt › Cầu nối vẫn có ô "Máy này đã cài cầu nối" + nút Mở thử. (5) Scan CCCD mở sẵn chế độ "vừa khung" để 2 mặt thẻ to nhất có thể. Áp chung cho khung xem lớn và khung xem bên phải. | ✅ Anh chốt: chỉ báo khi chưa cài, cài rồi bỏ qua (02/10/2026) |
| V | Dòng danh sách (Văn bản, Scan, các tab khác) mỏng hơn — thấy nhiều file hơn trên 1 màn hình | Anh nêu 02/10/2026: đã 2 dòng/mục nhưng còn dày. **Yêu cầu:** vẫn đủ thông tin, **không mất chữ**. **Đề xuất:** đo chiều cao hiện tại mỗi mục rồi giảm khoảng 25–30%: bớt khoảng đệm trên/dưới, khoảng cách giữa 2 dòng, dòng 2 chữ nhỏ hơn một chút (11,5px), nút 24–26px canh giữa theo 2 dòng; biểu tượng file nhỏ lại; đường kẻ giữa các mục mảnh hơn. Không cắt chữ thêm so với hiện nay (tên vẫn dài hết dòng 1, rê chuột thấy đủ). Chụp màn hình trước/sau ở khổ 1366 và iPhone để anh so số file thấy được trên 1 màn hình. Áp cho mọi danh sách đã chuẩn 2 dòng ở mục Q. | — |
| W | Tab Hôm nay: lịch thu 70% + cột **Công cụ** (gadget) bên phải — **đợt này chỉ làm bố cục** | Anh chốt 02/10/2026 (đã xem ảnh demo). **Bố cục:** lưới lịch rộng 70% (ô ≈ 43×34 ở 1366, không mất ngày âm, chấm việc); 30% còn lại là cột nút Công cụ xếp dọc, cao bằng lịch. Bấm một nút → **ô công cụ mở ngay dưới lịch** (không che sổ bên phải), có "Đóng (Esc)"; bấm nút khác thì thay ô; bấm lại nút đang mở thì đóng. Điện thoại: nút thành hàng biểu tượng vuốt ngang trên lịch, ô mở toàn màn.<br>**Khung dùng chung:** mỗi công cụ là 1 mục đăng ký (biểu tượng · tên · hàm vẽ ô) → thêm công cụ sau này không sửa bố cục. **Tên (anh chốt 02/10/2026):** cột **🧰 Công cụ**; Công cụ 1 nút **"🎓 Hạn trả HSSV"** (nút hẹp thì rút còn "🎓 HSSV"), tiêu đề khi mở "Tính hạn trả nợ HSSV"; Công cụ 2 nút **"🗺 Địa bàn"**, tiêu đề "Cây địa bàn — mã xã, điểm GD, ấp/KP"; công cụ sau đặt tên kiểu biểu tượng + 2–3 chữ; còn lại đặt sẵn ô **"Công cụ 3, 4…"** (bấm vào hiện "Đang chuẩn bị"), trừ công cụ nào đã có nghiệp vụ.<br>**Thứ tự làm công cụ (từng bước, mỗi cái anh cung cấp đủ nghiệp vụ khi làm):** ① 🎓 **Tính ngày đến hạn HSSV** — làm đầu tiên, chờ anh gửi quy định; sau đó các công cụ khác (tính lãi, lãi suất các CT, nợ quá hạn, phân kỳ 12/24 tháng…) theo thứ tự anh chọn. **Nguyên tắc:** số liệu nghiệp vụ (lãi suất, tỷ lệ, quy định) do anh nhập / cung cấp, app không tự đặt số; kết quả luôn hiện công thức để đối chiếu, có 📋 Chép và 📝 Ghi vào to-do. | Chờ anh gửi nghiệp vụ HSSV khi bắt đầu công cụ ①. Chưa chốt: dời nút "Danh sách" / "Tính ngày" ở đầu lịch xuống cột Công cụ hay giữ nguyên. |

**W① Công cụ 1 — 🎓 Tính ngày đến hạn HSSV (thiết kế nháp, chờ anh chốt các câu hỏi dưới; chưa code)**

*Căn cứ anh gửi 02/10/2026:* Hướng dẫn nghiệp vụ cho vay HSSV của NHCSXH, ký tháng 12/2024, **hiệu lực 01/01/2025** (bản PDF là ảnh quét, em đọc qua lớp chữ nhận dạng nên số hiệu văn bản chưa đọc rõ — anh ghi giúp số hiệu). Các điểm dùng cho công cụ:
- **9.1.1 Thời hạn phát tiền vay (TP):** từ ngày nhận vốn vay lần đầu đến ngày HSSV kết thúc khóa học (SV Y khoa: kết thúc thời gian thực hành), kể cả thời gian nghỉ học có thời hạn được bảo lưu.
- **9.1.2 Thời hạn trả nợ (TTN) tối đa:** đào tạo **đến 1 năm** và **SV Y khoa sau tốt nghiệp** = **2 × TP**; đào tạo **trên 1 năm** = **TP**. Y khoa vay tiếp khi còn dư nợ: TP = TP trước + TP lần này; TTN tối đa = TP trước + 2 × TP lần này.
- **9.1 Thời hạn cho vay** = TP + TTN (từ ngày nhận vốn đến ngày trả hết nợ).
- **9.2 Nhập ngũ / nghĩa vụ công an:** thời hạn cho vay **cộng thêm thời gian tại ngũ** (từ ngày ghi trên Lệnh gọi nhập ngũ đến ngày QĐ xuất ngũ có hiệu lực); 14.4: kéo dài thời hạn trả nợ tương ứng.
- **14.1 Kỳ hạn trả nợ gốc 12 tháng/lần**; **12 tháng kể từ ngày kết thúc khóa học** phải trả nợ gốc + lãi lần đầu (Y khoa: tính từ ngày kết thúc thực hành). Lãi trả hằng tháng trong thời hạn trả nợ.
- **21.2 Chuyển tiếp:** khoản vay **phê duyệt trước 01/01/2025** vẫn theo văn bản 2162/NHCS-TD ngày 02/10/2007.
- (Tham khảo, không dùng cho công cụ này) 8: lãi suất 0,55%/tháng, quá hạn 130% — theo văn bản tại thời điểm ban hành.

*Ô nhập:* loại đào tạo (trên 1 năm / đến 1 năm / Y khoa sau TN) · ngày nhận vốn lần đầu · ngày kết thúc khóa học (thực hành) · ngày phê duyệt (để cảnh báo khoản vay trước 01/01/2025) · tổng số tiền vay (không bắt buộc) · kỳ hạn trả gốc (mặc định 12 tháng/lần) · ☐ có thời gian tại ngũ (từ ngày → đến ngày) · ☐ Y khoa vay tiếp (TP trước, tháng).
*Kết quả:* TP (tháng) · TTN tối đa · thời hạn cho vay · **ngày trả nợ gốc + lãi lần đầu** · bảng các kỳ trả gốc (ngày, số tiền mỗi kỳ) · **hạn trả nợ cuối cùng** · dòng công thức + căn cứ điểm/khoản; nút 📋 Chép (dán Zalo) — ghi sẵn đúng các ô của mẫu 01/TD và phần phê duyệt ("Thời hạn cho vay … tháng; Kỳ hạn trả nợ … tháng/lần; Số tiền trả nợ … đồng/lần; Hạn trả nợ cuối cùng …").

*Bảng Excel "Công thức tính hạn trả nợ HSSV" anh gửi 02/10/2026 (Phòng Tin học xây dựng, gửi PGD tham khảo) — em đã rà từng công thức:*
- **Hạn trả nợ cuối** (cột H):
  - Học **trên 12 tháng**: `= EDATE(ngày ra trường + (ngày ra trường − ngày vay), 12)` → ra trường + **số ngày phát tiền vay** + **12 tháng ân hạn**. (Dòng ghi "số tháng" nhưng công thức thực ra cộng số **ngày**; cột E "47 tháng" chỉ để xem, không dùng.)
  - Học **dưới 12 tháng**: `= EDATE(ngày ra trường, số tháng × 2 + 12)`, số tháng = DATEDIF "M" (bỏ ngày lẻ).
  - Cách "số ngày": `ra trường + số ngày (×2 nếu dưới 12 tháng) + 365`.
- **Hạn trả nợ cuối theo ngày GDX** (cột I): đưa về **ngày giao dịch xã gần nhất trước hạn cuối**: nếu hạn cuối ≤ ngày GDX của cùng tháng → ngày GDX tháng trước; nếu không → ngày GDX tháng đó. Ví dụ Sheet2: vay 25/09/2026, ra trường 28/02/2029, GDX 25 → hạn cuối 04/08/2032 → **25/07/2032**.
- ⇒ Trả lời câu hỏi 1 ở trên: PGD tính theo **cách (b)** — 12 tháng ân hạn **tính riêng**, cộng thêm ngoài thời hạn trả nợ (TTN = TP hoặc 2 × TP).
- **Điểm em thấy cần anh lưu ý (không tự sửa, chờ anh quyết):**
  1. Học dưới 12 tháng: cách "tháng" và cách "ngày" lệch nhau tới **52 ngày** (ví dụ mẫu: 20/04/2019 so với 11/06/2019) vì DATEDIF "M" bỏ 26 ngày lẻ rồi nhân 2. Học trên 12 tháng thì 2 cách chỉ lệch 1 ngày (năm nhuận). → PGD dùng dòng nào làm chuẩn?
  2. Hạn cuối **trùng đúng** ngày GDX (ví dụ hạn 10/09, GDX 10) → công thức lùi về 10/08 (dấu ≤). Có đúng ý không, hay giữ 10/09?
  3. Ngày GDX 29–31 rơi vào tháng thiếu ngày (tháng 2…) → Excel tự nhảy sang tháng sau. App sẽ lấy ngày cuối tháng — anh xác nhận.
  4. Sheet2 ô I6 gõ nhầm `YEAR(I10)` (ô trống) — không ảnh hưởng kết quả mẫu nhưng sai nếu đổi số; Sheet1 đúng.
  5. Excel chỉ ra hạn cuối, **chưa có lịch các kỳ trả gốc 12 tháng/lần** và số tiền mỗi kỳ — app có thể làm thêm nếu anh cần (hỏi ở dưới).

*Thiết kế công cụ theo Excel (thay phần ô nhập/kết quả ở trên):*
- **Ô nhập:** ngày vay (nhận vốn lần đầu) · ngày ra trường (Y khoa: kết thúc thực hành) · thời gian học: *trên 12 tháng / đến 12 tháng / Y khoa sau TN* (app tự gợi ý theo 2 ngày, anh đổi được) · **điểm giao dịch** (chọn từ danh mục địa bàn → tự điền ngày GDX đã khai trong Cài đặt; hoặc gõ ngày) · ☐ thời gian tại ngũ (từ → đến) · ngày phê duyệt (cảnh báo khoản trước 01/01/2025).
- **Kết quả:** thời hạn phát tiền vay (ngày · tháng) · ân hạn 12 tháng · thời hạn trả nợ · **ngày trả nợ lần đầu** · **hạn trả nợ cuối** · **hạn cuối theo ngày GDX** (dòng đậm, dùng ghi hồ sơ) · công thức từng bước + căn cứ · 📋 Chép (dán Zalo / ghi vào mẫu 01/TD).
- **Kiểm thử bắt buộc:** app phải ra **đúng từng số** trong 2 sheet mẫu (15/09/2024 → 10/09/2024; 14/09/2024; 20/04/2019 → 10/04/2019; 11/06/2019 → 10/06/2019; 04/08/2032 → 25/07/2032).

*✅ Anh chốt 02/10/2026:* (1) tính **theo tháng**; (2) hạn trùng đúng ngày GDX → **lùi 1 tháng** (chắc chắn không vượt thời hạn tối đa); (3) **tính thêm ngày trả đầu tiên + lịch các kỳ + số tiền trả mỗi kỳ**; (4) **không** đưa tại ngũ vào công cụ này; (5) **không** xét khoản vay trước 01/01/2025. Đã gửi ảnh demo bố cục.

*Bố cục chốt theo cột Excel (ô mở dưới lịch):*
- **Hàng nhập 1:** Ngày vay · Ngày ra trường · Ngày GDX (gõ tay 1–31, nhớ lần trước).
- **Hàng nhập 2:** Thời gian học [Trên 12 tháng | Đến 12 tháng · Y khoa] (app tự gợi ý theo 2 ngày) · Số tiền vay.
- **Bảng kết quả 1 dòng như Excel:** Phát tiền vay (tháng) · Ân hạn 12 tháng · Trả nợ tối đa (= TP hoặc 2×TP) · Hạn cuối · **Hạn cuối theo GDX** (ô đậm).
- **Bảng kỳ trả:** Kỳ · Ngày trả (theo GDX) · Gốc phải trả — kỳ 1 (đầu tiên) tô nổi.
- Dòng công thức · 📋 Chép · 📝 Ghi vào to-do. Đổi ô nào tính lại ngay, không cần bấm.

*Công thức chốt = đúng Sheet2 anh đang dùng (02/10/2026; "theo tháng" = các dòng "Thời hạn phát tiền vay là số tháng"):*
- **Trên 12 tháng (Sheet2 dòng 2):** Hạn cuối = EDATE(ngày ra trường + (ngày ra trường − ngày vay), 12) — tức ra trường + số ngày phát tiền vay + 12 tháng ân hạn. Hiện thêm TP = DATEDIF "M" để xem.
- **Đến 12 tháng / Y khoa (dòng 5):** Hạn cuối = EDATE(ngày ra trường, DATEDIF "M" × 2 + 12).
- **Tổng thời hạn cho vay (tháng, ghi hồ sơ / mẫu 01/TD), tính từ ngày nhận món vay đầu tiên:** trên 12 tháng = TP × 2 + 12 (như J2); đến 12 tháng / Y khoa = TP × 3 + 12 (TP + ân hạn 12 + trả nợ 2 × TP) — anh xác nhận thêm công thức cho trường hợp đến 12 tháng.
- **Theo GDX (cột I):** hạn ≤ ngày GDX cùng tháng → ngày GDX tháng trước; ngược lại → ngày GDX tháng đó. Áp cho mọi ngày trả (kỳ đầu, các kỳ, hạn cuối). Kỳ đầu = ra trường + 12 tháng; các kỳ sau cách 12 tháng; kỳ cuối = hạn cuối theo GDX.
- Đã chạy thử lại bằng máy đúng công thức trên: ra **đúng từng số** trong file (Sheet2 dòng 2: 04/08/2032 → 25/07/2032; dòng 5: 20/04/2019 → 10/04/2019; Sheet1: 15/09/2024 → 10/09/2024).

*Lỗi nhỏ trong Sheet2 (anh sửa file Excel nếu còn dùng; app sẽ tránh):*
- **Dòng 3** ("số ngày", trên 12 tháng): trống công thức — E3, H3, I3 không có gì, D3 = 0.
- **Ô I6** (dòng 6): gõ nhầm `YEAR(I10)` (ô trống → năm 1900). Kết quả mẫu đúng do tình cờ; nếu hạn cuối rơi trước hoặc đúng ngày GDX thì I6 ra ngày GDX **sau** hạn cuối (vượt hạn). Sửa: `YEAR(H6)`.
- ~~Ô J2 và E10 sai~~ — **em nhận định nhầm, đã sửa:** J2/E10 = 70 là **tổng thời hạn cho vay (tháng) tính từ ngày nhận món vay đầu tiên** = TP 29 + ân hạn 12 + trả nợ 29 (anh xác nhận 02/10/2026). Kiểm: 25/09/2026 + 70 tháng = 25/07/2032, khớp hạn cuối theo GDX.
- **Ngày GDX 29–31:** tháng thiếu ngày thì Excel nhảy sang đầu tháng sau, có thể **vượt** hạn cuối (ví dụ hạn 01/03/2032, GDX 31 → ra 02/03/2032). App lấy ngày cuối tháng để không vượt.

*✅ Anh chốt thêm 02/10/2026:*
- Tổng thời hạn cho vay: trên 12 tháng = TP × 2 + 12; **đến 12 tháng / Y khoa = TP × 3 + 12** (đúng). Anh sẽ tự thử kỹ nhánh đến 12 tháng / Y khoa khi có hồ sơ thật (PGD chưa cho vay trường hợp này).
- **Số tiền vay: anh tự gõ**, đơn vị **triệu đồng** (gõ `40` = 40.000.000 đ).
- **Phân kỳ: chia đều, làm tròn xuống hàng trăm nghìn, phần dư dồn kỳ cuối.** Ví dụ 40 triệu / 3 kỳ → 13.300.000 · 13.300.000 · **13.400.000**. (Em hiểu "hàng trăm" là hàng trăm nghìn đồng — nếu anh muốn khác thì báo.)
- Kỳ đầu = ra trường + 12 tháng (điểm 14.1 hướng dẫn), đưa về ngày GDX; các kỳ sau cách 12 tháng; kỳ cuối = hạn cuối theo GDX — anh kiểm lúc thử.

*Hiện công thức để kiểm chứng (anh yêu cầu "càng trực quan càng tốt"):* dưới bảng kết quả có khung **"Cách tính"** ghi từng bước **có thay số thật**, giống cột Excel, ví dụ:
1. Thời gian phát tiền vay = DATEDIF(25/09/2026 → 28/02/2029, tháng) = **29 tháng** (887 ngày)
2. Hạn cuối = 28/02/2029 + 887 ngày = 04/08/2031 → + 12 tháng ân hạn = **04/08/2032**
3. Theo ngày GDX 25: 04/08/2032 ≤ 25/08/2032 → lùi về **25/07/2032**
4. Thời hạn cho vay = 29 × 2 + 12 = **70 tháng** (kiểm: 25/09/2026 + 70 tháng = 25/07/2032 ✓)
5. Kỳ đầu = 28/02/2029 + 12 tháng = 28/02/2030 → GDX **25/02/2030**; …
6. Mỗi kỳ = 40.000.000 ÷ 4 = 10.000.000 (làm tròn trăm nghìn) · kỳ cuối nhận phần dư
- Nhánh đến 12 tháng / Y khoa hiện đúng các bước tương ứng (× 2, × 3) để anh đối chiếu khi thử.
- Có dấu ✓/⚠ tự kiểm: ngày vay + thời hạn cho vay phải ≤ hạn cuối; ngày ra trường phải sau ngày vay; ngày GDX 1–31.
- Kiểm thử máy bắt buộc: khớp mọi số trong Sheet1, Sheet2 và ví dụ chia tiền ở trên.

*✅ Ngày GDX (anh chốt 02/10/2026): **gõ tay** một ô số (1–31) cho nhanh, không phụ thuộc danh mục địa bàn (ngày GDX xã có thể đổi). App nhớ số gõ lần trước để lần sau khỏi gõ lại. Bỏ ô chọn "Điểm GD" ở bố cục.*

*✅ Hiển thị (anh chốt 02/10/2026):* **giữ đúng bố cục ảnh demo** (bảng 1 dòng giống cột Excel: Phát tiền vay · Ân hạn · Trả nợ tối đa · **Thời hạn cho vay (tháng)** (như cột "THÁNG" J2 của Excel, anh chốt thêm) · Hạn cuối · Hạn cuối theo GDX; bảng kỳ trả; dòng công thức), gói trong 1 màn hình (bảng kỳ trả / Cách tính dài thì thu gọn ▸, đủ chỗ thì mở sẵn). **Thêm "Câu chốt"** ô chữ đậm ngay dưới bảng Excel, bấm là chép, đúng mẫu anh dùng ghi hồ sơ:
`Số tiền vay 160.000.000 đồng, thời hạn 104 tháng, hạn cuối 25/07/2032, trả 10.000.000 đồng/lần, lần 1: 25/06/2029`
(câu anh gửi chỉ là **mẫu cách ghi** — số trong câu tự lấy từ kết quả; kỳ hạn giữ 12 tháng/lần, không thêm ô kỳ hạn: số tiền anh gõ · thời hạn cho vay · hạn cuối theo GDX · số tiền mỗi kỳ · ngày trả kỳ đầu; kỳ cuối khác số thì thêm ", lần cuối …đồng").

**W② Công cụ 2 — 🗺 Cây địa bàn (anh nêu 02/10/2026; chưa code)**
- Nút ở cột Công cụ → ô mở dưới lịch (cùng kiểu W①), gói trong 1 màn hình, cuộn bên trong nếu dài.
- **Cây:** Xã/phường (mã xã) → Điểm giao dịch (mã điểm · ngày GD) → Ấp/KP (mã ấp) → số tổ. **Sắp theo thứ tự mã** ở mọi cấp. Mặc định mở cấp Xã → Điểm, bấm để xổ ấp.
- Ví dụ một dòng: `540035 Phường Gò Dầu` → `TXN0543502 Phường Gò Dầu · GD ngày 05` → `54003507 Thanh Hà`.
- **Ô tìm nhanh** trên cùng: gõ tên hoặc mã ấp/KP (không dấu cũng được) → hiện đúng nhánh Xã › Điểm › Ấp kèm mã — tiện khi ấp/KP mới gộp, tách chưa nhớ.
- **Bấm vào mã để chép** (dán vào hệ thống / Excel). Nút 📋 chép cả cây dạng bảng (mã xã · xã · mã điểm · điểm · ngày GD · mã ấp · ấp) để dán Excel.
- **Nguồn dữ liệu:** đúng danh mục đã khai ở Cài đặt › Địa bàn (app đã có sẵn mã xã, mã điểm, ngày GD, mã ấp). Không thêm dữ liệu mới; ấp/KP gộp, tách thì sửa ở Cài đặt, cây tự cập nhật. Có nút "✎ Sửa danh mục" dẫn tới Cài đặt › Địa bàn.
- Ô nào thiếu mã → hiện "chưa có mã" màu nhạt để anh biết mà bổ sung.

#### Đợt gom sau 3.62 — ✅ X đã làm ở bản 3.63 (03/10/2026). Việc mới ghi tiếp bên dưới.

| # | Việc | Đề xuất | Chờ anh chốt |
|---|---|---|---|
| X | 🎓 Hạn trả HSSV: gọn phần "Thời gian học" | Anh nêu 03/10/2026: nút "Tự chọn" thừa; thường chỉ cho vay trên 12 tháng; đưa lên dòng trên cùng, nhỏ lại, tránh bấm nhầm. **✅ Anh chốt 03/10/2026:** (1) bỏ nút "Tự chọn", bỏ dòng "Thời gian học"; (2) **ô chọn (danh sách thả xuống) nhỏ** trên dòng tiêu đề: `🎓 Hạn trả HSSV [Trên 12 tháng ▾] ······ 📋 Chép 📝 To-do Đóng (Esc)`, **mặc định Trên 12 tháng**, lựa chọn còn lại "Đến 12 tháng · Y khoa"; (3) chọn "Đến 12 tháng · Y khoa" → ô chọn **đổi màu cam** + dòng lưu ý nhỏ màu cam ngay dưới tiêu đề ("Đang tính theo đến 12 tháng / Y khoa: trả nợ = 2 × phát tiền vay") — **không bật hộp / cửa sổ**; (4) nếu số tháng phát tiền vay ≤ 12 mà đang để Trên 12 tháng → chỉ hiện dòng lưu ý cam trong ô kết quả: "Phát tiền vay chỉ N tháng — nếu **khóa học** dài trên 1 năm (vay ở năm cuối) thì giữ nguyên; khóa học đến 1 năm / Y khoa thì đổi ô chọn", không bật hộp. **Lý do bỏ "Tự chọn":** nó đoán theo số tháng phát tiền vay (từ ngày vay đến ra trường), nhưng hướng dẫn phân loại theo **thời gian khóa đào tạo** — SV học 4 năm, vay năm cuối (phát tiền vay 10 tháng) sẽ bị đoán nhầm "đến 12 tháng" → thời hạn trả nợ gấp đôi, sai.; (5) mở lại công cụ thì về mặc định Trên 12 tháng. Bớt 1 dòng cho phần kết quả. | ✅ Làm ở 3.63 |
| Y | Bỏ chữ nhắc "file Excel (Sheet2)" trên giao diện | Anh nêu 03/10/2026: nhìn kỳ. Bỏ ở 3 chỗ anh thấy được: (1) dòng hướng dẫn trong ô Hạn trả HSSV "Gõ ngày vay, ngày ra trường và ngày GDX — kết quả hiện ngay~~, đúng công thức file Excel (Sheet2)~~"; (2) mục Hướng dẫn › Hôm nay "tính đúng như file Excel (Sheet2)"; (3) Có gì mới "đúng công thức file Excel (Sheet2)". Chú thích trong code và tài liệu bàn giao giữ nguyên để người sau biết nguồn công thức. | ✅ Làm ở 3.64 |

**Z. Theo dõi món vay có vấn đề — Nợ quá hạn · Nợ khoanh · 3 tháng không hoạt động (anh nêu 03/10/2026; thiết kế nháp, chưa code)**

*✅ Anh chốt 03/10/2026:*
- **Chỗ đặt:** trong tab **Thư viện** — ngăn mới "⚠ Theo dõi nợ" (cạnh Bộ hồ sơ, Ghi chú ảnh).
- **Nguồn danh sách:** anh có danh sách 3 tháng KHD, nợ quá hạn, nợ khoanh **theo tháng**. Mỗi tháng anh chỉ file → app đọc vào, **cập nhật số dư** của món đã có, thêm món mới.
- **Hai cách xem:** ☰ Danh sách và 🌳 Cây địa bàn Xã › Điểm › Ấp › **Tổ** (như tab Scan).
- **Khi cần làm việc / bổ sung một món:** mở món đó lên để: 📎 thêm bản scan **hồ sơ gốc**; 📍 **định vị nhà**; 📝 **xuất biên bản làm việc theo mẫu**; 📈 **theo dõi tiến độ làm việc**.

*Thiết kế đề xuất:*
1. **Cập nhật hằng tháng** (nút 📥 Cập nhật tháng): chọn file sao kê tháng — lấy từ file đã lưu ở tab Tháng (NQH, NK, 3TKHD, SK_NQH, SK_NK) hoặc chọn file mới → app đọc Excel, nhận từng món bằng **mã món vay / số khế ước** (nếu sao kê có), không có thì theo tên + ấp/tổ + chương trình → màn **xem trước** trước khi ghi: `+ 5 món mới · 12 món cập nhật số dư · 3 món không còn trong danh sách`. Món không còn trong sao kê **không xóa** — chuyển trạng thái "Đã ra khỏi danh sách tháng MM/YYYY" (thu hồi xong / hết quá hạn), vẫn giữ lịch sử. Mỗi món lưu **lịch sử số dư theo tháng** (xem biến động).
2. **Dòng danh sách (2 dòng):** tên khách · ấp · tổ · chương trình ······ dư nợ / số quá hạn · **nhãn loại** (QH / Khoanh / 3T KHD) · ngày làm việc gần nhất · ⚠ "chưa làm việc > 30 ngày" / "đến hạn cam kết". Lọc theo loại, trạng thái, địa bàn; đầu cây có đếm số món + tổng dư nợ từng nhánh.
3. **Mở một món** (khung phải trên máy tính, toàn màn trên điện thoại): thông tin món vay (từ sao kê, không sửa tay số liệu gốc) · lịch sử số dư · **nhật ký làm việc** (ngày, hình thức, thành phần, nội dung, kết quả, cam kết trả số tiền + hạn → tự lên lịch Hôm nay, số thu được) · **tài liệu**: hồ sơ gốc (dùng lại bộ quét Scan → PDF), biên bản đã ký (chụp lại), ảnh nhà · **📍 vị trí**: điện thoại bấm "Lấy vị trí tại đây" khi đứng ở nhà khách (GPS) hoặc dán link Google Maps → nút "Chỉ đường".
4. **📝 Xuất biên bản theo mẫu:** anh đưa file Word mẫu có chỗ trống đánh dấu (ví dụ `{Họ tên}`, `{Địa chỉ}`, `{Dư nợ}`, `{Số quá hạn}`, `{Ngày}`…) → app điền thông tin món vay + lần làm việc, tạo file Word để sửa / in / ký; bản ký xong chụp lại gắn vào lần làm việc.
5. **Lưu trữ:** Drive `Tủ hồ sơ/Theo dõi nợ/<Xã>/<Điểm>/<Ấp>/<Tổ>/<Tên khách>/`; dữ liệu khách chỉ nằm trên máy + Drive của anh (không đưa lên kho mã nguồn).
6. **Tổng hợp:** số món / dư nợ theo loại, theo xã; "cần làm việc tuần này" lên dòng ⚠ Cần xử lý ở Hôm nay. *(Đợt sau: xuất Excel theo dõi cho giao ban.)*

*Đã rà 3 file mẫu anh gửi (kỳ 31/08/2026 — file thật có tên khách, **không đưa vào repo**, phép thử sẽ dùng dữ liệu giả cùng cấu trúc):*
- Cả 3 file xuất từ hệ thống, trang **BCQUERY**, dòng tiêu đề cột ở **dòng 5** (B5), dữ liệu từ dòng 6. File 3 tháng KHD còn các trang "BC <điểm>" anh tự lập và trang bảng mã chương trình — app chỉ đọc BCQUERY.
- **Khóa nhận món vay: "Số khế ước"** (có ở cả 3 file, không trùng) + "Mã khách hàng".
- **3 tháng KHD** ("14. Sao kê món vay N tháng không hoạt động"): mã ấp · mã/tên điểm GDX · ĐVUT · mã tổ · tổ trưởng · mã/tên KH · số khế ước · mã sản phẩm · ngày đăng ký, giải ngân, đến hạn (gốc, GH, GDX) · chương trình (mã) · tổng dư nợ, trong hạn, quá hạn, khoanh · **ngày giao dịch gần nhất** · lãi đã thu · lãi tồn. Không có cột mã xã (suy từ mã ấp / điểm).
- **Nợ khoanh** ("13. Danh sách nợ khoanh"): ngày GDX · mã/tên điểm · mã/tên xã · KH · mã tổ · tổ trưởng · số khế ước · ĐVUT · **dư nợ khoanh** · ngày hiệu lực · **ngày hết hạn khoanh** · chương trình · **nguyên nhân**. **Không có cột ấp** → app suy ấp theo mã tổ (từ 2 file kia / danh mục): kỳ này 41/55 món suy được, 14 món hiện "chưa rõ ấp" để anh gán 1 lần, app nhớ.
- **Nợ quá hạn** ("2. Sao kê danh sách nợ quá hạn"): mã/tên xã · mã ấp (cột Thôn) · điểm · tổ · ĐVUT · KH · số khế ước · **dư nợ quá hạn** · chuyển QH trong tháng · **ngày chuyển quá hạn** · chương trình · số dư TK105 · ngày báo cáo.
- **Số lượng kỳ 31/08/2026:** 3T KHD 327 món · khoanh 55 · quá hạn 54 (43 món có mặt ở cả DS quá hạn và DS 3T KHD).
- **✅ Anh chốt 03/10/2026: 3 loại theo dõi RIÊNG, không gộp.** Ngăn "⚠ Theo dõi nợ" chia 3 mục con: **⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh** — mỗi mục có danh sách + cây địa bàn riêng, nhập file tháng riêng, cột riêng theo đúng file, nhật ký làm việc / biên bản / tiến độ riêng. *Đề xuất nhỏ (chờ anh):* món có mặt ở 2 danh sách chỉ hiện dòng nhắc nhỏ "cũng có trong DS quá hạn" (bấm để mở), không gộp; hồ sơ gốc scan và định vị nhà gắn theo **khách hàng** (mã KH) để khỏi nhập lại ở từng danh sách.
- Mã ĐVUT: 11 Hội Nông dân · 12 Hội Phụ nữ · 13 Hội CCB · 14 Đoàn TN. Mã chương trình → tên viết tắt theo bảng mã (HONGHEO, GQVL, NSVSMT…).
- *Đề xuất thêm:* 3T KHD nhiều món (327) → mặc định lọc hiện món **quá hạn / khoanh + 3T KHD lâu nhất** (xếp theo ngày giao dịch gần nhất cũ nhất), có ô tìm tên / mã KH / số khế ước.

*Mẫu biên bản làm việc anh gửi (BIEN_BAN_LAM_VIEC_Go_Dau.doc, 1 trang — Word đời cũ .doc; không đưa vào repo):* Tiêu đề Quốc hiệu · "BIÊN BẢN LÀM VIỆC" · Hôm nay ngày …, tại … tỉnh Tây Ninh · **Chúng tôi gồm** 4 người (1–2 đại diện …, 3 đại diện Tổ TK&VV, 4 khách hàng vay vốn) · xác minh khoản nợ của ông (bà) … · Địa chỉ · **Thông tin món vay** (chương trình, số tiền vay, mục đích, ngày vay, ngày đến hạn, tổng nợ đến ngày …: nợ gốc, nợ lãi) · **2. Nguyên nhân không trả được nợ · 3. Thực trạng kinh tế và khả năng trả nợ · 4. Cam kết của khách hàng (hoặc người trả nợ thay) · 5. Kiến nghị biện pháp xử lý nợ** · ký: KH vay vốn · Tổ TK&VV · Đại diện … · Đại diện ….
- *Đề xuất:* app **dựng sẵn biên bản đúng bố cục mẫu này thành file Word (.docx)** để sửa / in / ký — anh không phải chuẩn bị gì thêm. (App không ghi được .doc đời cũ; .docx mở bằng Word bình thường.)
- **Ô nhập "Lần làm việc" đặt theo đúng 4 mục 2–5 của biên bản** (nguyên nhân · thực trạng · cam kết · kiến nghị) + ngày, địa điểm, thành phần → ghi nhật ký xong là có biên bản.
- **Điền sẵn từ file sao kê:** tên KH, địa chỉ (ấp, xã), chương trình, tổ trưởng (thành phần 3), Hội đoàn thể theo ĐVUT (thành phần 2 + ô ký), dư nợ (nợ gốc), nợ lãi = lãi tồn (DS 3T KHD), ngày vay / ngày đến hạn (DS 3T KHD có; DS quá hạn không có → để chấm cho anh ghi tay), ngày tổng nợ = ngày sao kê. Mục đích sử dụng vốn, số tiền vay ban đầu không có trong sao kê → để trống (hoặc anh nhập 1 lần ở thẻ món vay).
- Chờ anh: thành phần 1 (cán bộ NHCSXH — tên, chức vụ mặc định?), địa điểm mặc định ("nhà khách hàng, ấp …, xã …"?), có cần dòng đầu "NGÂN HÀNG CSXH TỈNH TÂY NINH · PGD GÒ DẦU" bên trái không.
- *Danh mục đề xuất (anh sửa):* **Hình thức:** Đến nhà khách hàng · Mời lên điểm giao dịch / UBND xã · Họp Tổ TK&VV · Điện thoại / Zalo · Cùng Hội đoàn thể. **Trạng thái:** Chưa làm việc · Đang làm việc · KH cam kết trả · Đã thu một phần · Đã thu hồi hết · Đề nghị gia hạn / điều chỉnh kỳ hạn · Đề nghị khoanh · Đề nghị xử lý rủi ro · KH vắng mặt / bỏ địa phương.

*✅ Anh chốt 03/10/2026 về biên bản:* (1) các dòng **thành phần để trống** cho linh hoạt; (2) **địa điểm mặc định = ấp của khách** ("ấp …, xã/phường …", sửa được); (3) chưa cần dòng tên đơn vị bên trái; (4) **sau này sẽ có nhiều dạng biên bản** cho các mục đích kiểm tra khác nhau → làm **danh mục mẫu biên bản** (như cột Công cụ): mỗi mẫu là 1 mục đăng ký (tên, các ô cần nhập, cách dựng file Word); đợt đầu có 1 mẫu "Biên bản làm việc — xác minh khoản nợ"; thêm mẫu sau không sửa phần khác. Các vấn đề còn lại anh giao em tư vấn theo nghiệp vụ (bên dưới) — anh xem, không hợp thì bỏ.

*Tư vấn theo nghiệp vụ (em đề xuất, anh duyệt ở ảnh demo):*
- **⏳ 3 tháng KHD** — mục tiêu: không để chuyển quá hạn, đôn đốc trả lãi. Xếp mặc định theo **số tháng không giao dịch** (tính từ "ngày giao dịch gần nhất" tới ngày sao kê), nhóm 3–6 tháng / 6–12 tháng / trên 12 tháng; nhãn **"sắp đến hạn"** khi ngày đến hạn (hoặc hạn GDX) còn ≤ 3 tháng; hiện **lãi tồn**. Tháng sau món biến mất khỏi danh sách → ghi "đã giao dịch lại".
- **🔴 Nợ quá hạn** — mục tiêu: thu hồi, xác định nguyên nhân. Tính **số ngày quá hạn** từ "ngày chuyển quá hạn"; nhãn **"mới phát sinh tháng này"** (cột Chuyển QH trong tháng > 0) xếp lên đầu; nhóm theo thời gian quá hạn; hiện **số dư TK105** của khách để anh cân nhắc khi làm việc; so với tháng trước: tăng / giảm / đã thu hết.
- **🔒 Nợ khoanh** — mục tiêu: rà soát trước khi hết thời hạn khoanh. Nhãn **"sắp hết hạn khoanh"** khi ngày hết hạn khoanh còn ≤ 6 tháng (lên dòng ⚠ Cần xử lý ở Hôm nay); hiện **nguyên nhân khoanh** từ sao kê; theo dõi số đã thu trong thời gian khoanh.
- **Chung cả 3:** dòng nhắc chéo khi món có ở danh sách khác (không gộp); **hồ sơ gốc scan + định vị nhà dùng chung theo mã khách hàng**; nhắc "chưa làm việc > 30 ngày" (số ngày đổi được); **tiến độ** = mỗi tháng: số món, dư nợ, số món đã làm việc, số tiền thu được, so tháng trước; hạn cam kết của khách tự lên SCHEDULE Hôm nay.
- **Mẫu biên bản sau này** (ví dụ): kiểm tra sử dụng vốn vay (tham chiếu Phiếu kiểm tra sử dụng vốn vay mẫu 06/TD), xác minh khách vắng mặt / bỏ địa phương, đề nghị xử lý rủi ro — anh gửi mẫu khi cần.
- **Bảo mật:** danh sách khách chỉ lưu trên máy + Drive của anh; khi chia sẻ biên bản qua Zalo chỉ gửi đúng file đó.

*✅ Anh chốt 03/10/2026 — trọng tâm & lưu vết:*
- **Quan trọng nhất là phần bổ sung thông tin hộ vay:** thừa kế / người trả nợ thay · thực trạng hộ · tài sản · tình hình sử dụng vốn · nguyên nhân.
- **Lưu vết:** danh sách tháng mới sẽ thay đổi; món 3T KHD tháng này không có nhưng tháng sau có thể **phát sinh lại** → **không bao giờ xóa**, lần sau chỉ **cập nhật số liệu**, thông tin đã bổ sung giữ nguyên.

*Thiết kế dữ liệu đề xuất (3 lớp):*
1. **Hồ sơ hộ vay** — khóa **Mã khách hàng**, dùng chung cho cả 3 danh sách, **không bao giờ xóa**. Chứa toàn bộ phần anh bổ sung (mục dưới) + hồ sơ gốc scan + vị trí nhà + SĐT. Một hộ có thể có nhiều món (kỳ 31/08 đã thấy hộ 2–3 khế ước).
2. **Món vay** — khóa **Số khế ước**, thuộc 1 hộ. Mỗi tháng nhập file → lưu **bản số liệu của tháng đó** theo từng danh sách (dư nợ, quá hạn, khoanh, lãi tồn, ngày GD gần nhất…). Có **dòng thời gian xuất hiện**: tháng nào có trong DS nào, "ra khỏi DS tháng 09/2026", "**phát sinh lại** tháng 11/2026 (lần 2)".
3. **Nhật ký làm việc** — mỗi lần gắn với hộ + món + loại danh sách; xem được ở cả thẻ món và hồ sơ hộ.

*Phần bổ sung thông tin hộ vay (tư vấn nghiệp vụ — anh sửa):* mỗi mục có **ngày cập nhật + nguồn** (lần làm việc nào / anh gõ tay) và **lịch sử các lần thay đổi** (không ghi đè mất cũ).
- **Người vay & hộ:** tình trạng người vay (bình thường · ốm đau / tai nạn · đã chết · mất tích · bỏ khỏi địa phương · đi làm ăn xa · đang chấp hành án…); thành viên hộ, số lao động; SĐT liên hệ (người vay, người thân).
- **Thừa kế / người trả nợ thay:** họ tên · quan hệ với người vay · năm sinh · SĐT · nơi ở · đồng ý trả nợ thay không · cam kết (số tiền, thời hạn) · giấy tờ kèm theo (giấy chứng tử, xác nhận của UBND xã…, scan gắn vào).
- **Thực trạng kinh tế:** nghề / nguồn thu nhập chính · thu nhập ước tính tháng · hoàn cảnh đặc biệt (hộ nghèo, cận nghèo, ốm đau dài ngày…) · đánh giá **khả năng trả nợ**: có khả năng / khó khăn tạm thời / không có khả năng.
- **Tài sản:** danh sách (đất ở / đất sản xuất · nhà · vật nuôi · phương tiện · khác) + ước giá trị + ghi chú; tổng tài sản ước tính.
- **Tình hình sử dụng vốn:** mục đích vay (đối tượng đầu tư: bò, heo, giếng, nhà vệ sinh…) · sử dụng **đúng / sai mục đích (một phần · toàn bộ)** · **hiện trạng vốn** (còn · đã bán · chết / mất · hư hỏng) + giá trị còn lại · ảnh chụp hiện trạng · tham chiếu Phiếu kiểm tra sử dụng vốn vay (mẫu 06/TD).
- **Nguyên nhân không trả được nợ:** tích nhiều — *khách quan:* thiên tai · dịch bệnh vật nuôi / cây trồng · ốm đau, tai nạn · người vay chết / mất tích · giá cả, thị trường; *chủ quan:* sử dụng vốn sai mục đích · làm ăn thua lỗ · chây ỳ · bỏ khỏi địa phương · khác + ghi rõ. (Nợ khoanh đã có sẵn nguyên nhân từ sao kê → điền sẵn để đối chiếu.)
- **Phương án đề xuất:** đôn đốc thu hồi · người thừa kế trả thay · gia hạn / điều chỉnh kỳ hạn · đề nghị khoanh · đề nghị xử lý rủi ro · phối hợp chính quyền, Hội đoàn thể — kèm hạn thực hiện.
- Các mục trên **điền sẵn vào biên bản** (mục 2 Nguyên nhân, 3 Thực trạng, 4 Cam kết, 5 Kiến nghị) → anh chỉ sửa câu chữ.
- Nhập nhanh trên điện thoại khi đi thực địa: chọn bằng nút (chip) + ô ghi thêm; không có mạng vẫn ghi, có mạng tự lên Drive.

*Quy tắc cập nhật danh sách tháng (lưu vết):*
- Món **có trong file**: lưu số liệu tháng đó; nếu trước đó đã ra khỏi DS → ghi "**phát sinh lại**" (đếm số lần); thông tin hộ, nhật ký giữ nguyên.
- Món **không có trong file** tháng này: giữ nguyên, ghi "không có trong DS từ tháng …" (số liệu tháng cuối còn xem được); mặc định ẩn khỏi danh sách "Đang có", xem ở bộ lọc "Đã ra khỏi DS".
- **Nhập lại cùng tháng** (file sửa lại): thay số liệu tháng đó, không nhân đôi. File **cũ hơn** tháng đã nhập: cảnh báo, chỉ bổ sung lịch sử, không đè số mới.
- Màn **xem trước** trước khi ghi: món mới · phát sinh lại · cập nhật số dư (tăng / giảm) · ra khỏi DS.

*🛠 KẾ HOẠCH CODE ĐỢT 1 — bản 3.64 (anh bảo "lên KH vào code" 03/10/2026) — ✅ ĐÃ LÀM ở 3.64:*
- **Z1 · Dữ liệu:** biến `NO` = {ho (theo mã KH), mon (theo số khế ước, số liệu từng tháng từng loại), lan (lần làm việc), nhap (kỳ đã nhập từng loại), toAp (mã tổ → mã ấp học được)} — lưu **IndexedDB** (không chiếm chỗ localStorage), đồng bộ Drive `_Hệ thống/theodoino.json` (gộp theo thời điểm sửa, như lịch). **Đọc sao kê**: tự tìm trang có cột "Số khế ước", tự nhận loại theo cột (khoanh / quá hạn / 3T KHD), kỳ theo cột "Ngày báo cáo" hoặc ngày trong tên file (hỏi nếu không rõ); chọn file từ máy hoặc từ file đã lưu ở tab Tháng. **Màn xem trước** rồi mới ghi; quy tắc lưu vết như trên.
- **Z2 · Giao diện:** Thư viện › **⚠ Theo dõi nợ** · 3 ô ⏳ / 🔴 / 🔒 · ☰ Danh sách (nhóm theo nghiệp vụ từng loại) / 🌳 Cây Xã › Điểm › Ấp › Tổ (đếm + tổng tiền) · lọc Đang có / Đã ra khỏi DS · tìm tên, mã KH, số KƯ · bấm món → **thẻ món**: số liệu, lịch sử tháng, danh sách khác có món này, món khác cùng hộ · **Hồ sơ hộ vay** 7 mục (người vay & hộ, thừa kế, thực trạng, tài sản, sử dụng vốn, nguyên nhân, phương án) — mỗi mục có ngày cập nhật + lịch sử · **Nhật ký làm việc** · **Tài liệu** (thêm file / chụp, gắn file có sẵn; lên Drive `Theo dõi nợ/<Xã>/<Tên KH – mã KH>`) · **📍 Vị trí** (lấy GPS / dán link, chỉ đường).
- **Z3 · Biên bản & nhắc việc:** danh mục mẫu biên bản (đợt 1: "Biên bản làm việc — xác minh khoản nợ" theo mẫu PGD) → tạo **file Word .docx** điền sẵn; cam kết trả (số tiền + hạn) tự lên lịch Hôm nay; dòng ⚠ Cần xử lý có "Theo dõi nợ: n việc" (cam kết đến hạn, sắp hết hạn khoanh). Kèm **Y** (bỏ chữ "file Excel (Sheet2)").
- **Kiểm thử:** file sao kê **giả** cùng cấu trúc (không dùng file thật); nhập 2 tháng liên tiếp để thử phát sinh lại / ra khỏi DS / nhập lại cùng tháng / file cũ hơn; biên bản mở được (kiểm cấu trúc docx); hồi quy toàn bộ.
- **Đợt 2 (sau):** xuất Excel theo dõi cho giao ban, thống kê tiến độ theo tháng, thêm mẫu biên bản khác.

*Cần anh gửi trước khi code (che tên khách):*
- (a) ✅ Đã nhận 3 file mẫu kỳ 31/08/2026 (xem phần rà ở trên).
- (b) ✅ Đã nhận mẫu biên bản (xem trên).
- (c) Danh mục **trạng thái** và **hình thức làm việc** anh hay ghi (em có đề xuất sẵn, anh sửa).
- (d) ✅ Theo dõi riêng 3 loại (anh chốt). Chờ anh: dòng nhắc chéo + dùng chung hồ sơ gốc / định vị theo mã KH?

#### Đợt gom sau 3.64 — ghi nhận, chưa làm

| # | Việc | Nội dung | Chờ anh chốt |
|---|---|---|---|
| AA | **Quan hệ văn bản — chọn VB chính bằng số hiệu** (anh báo chọn VB chính không chạy, 03/10/2026) | **Nguyên nhân:** ô chọn chỉ liệt kê văn bản đã đánh dấu "VB chính" → kho chưa có → trống. **✅ Anh chốt (đã nghĩ lại):** (1) **giữ khái niệm "VB chính"**; (2) vai trò: VB độc lập · VB chính · VB sửa đổi, bổ sung · **VB hướng dẫn thực hiện** (thêm mới); (3) chọn "sửa đổi" hoặc "hướng dẫn" → ô **"Của văn bản số…"**: **gõ số hiệu để tìm trong TẤT CẢ văn bản của app, mọi loại** (QĐ, HD, CV, TB…), hiện gọn số hiệu + tên; chọn xong văn bản kia **tự thành "VB chính"** (không phải đánh dấu trước); (4) **không tự đoán / tự gợi ý** — anh chọn tay. Ô "Được thay thế bởi" cũng tìm theo số hiệu. Khi VB chính hết hiệu lực vẫn hỏi có cho các VB sửa đổi / hướng dẫn của nó hết theo không. | — |
| AC | **⭐ Đánh dấu sao văn bản quan trọng** (anh nêu 03/10/2026) — **tách riêng với VB chính** | Nút ☆/⭐ trên dòng văn bản (cạnh tên) và trong hộp Sửa — bấm bật/tắt; **không cần quan tâm nữa thì bỏ sao**; chip lọc **"⭐ Quan trọng"** ở hàng lọc tab Văn bản; đồng bộ các máy. **Áp cả tab Biểu mẫu** (mẫu hay dùng) — anh đồng ý. | — |
| AB | Hộp Khai / Sửa văn bản + dòng văn bản (✅ anh đồng ý 03/10/2026) | (1) Tên file mới bị cắt dở "…Quy chế hoạt động **của.pdf**" trong khi tên văn bản đủ "…của Tổ TK&VV" → không cắt giữa chừng, cắt thì cắt ở ranh giới cụm từ và báo độ dài; (2) chữ hoa giữa câu "Hướng dẫn **Thực** hiện…" → "thực"; (3) ô Trích yếu để trống dù có dòng tiêu đề → điền từ tiêu đề; (4) ô "NHÓM" chiếm cả khung chỉ để 4 nút → thu 1 dòng; (5) **rê / nhấp vào tên văn bản ở danh sách, dòng gợi ý lặp lại tên + trích yếu gần như y hệt → thừa**: trích yếu đã nằm trong tên thì chỉ hiện tên đầy đủ (bỏ phần lặp). | — |

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
