# BÀN GIAO VIỆC CÒN LẠI — App Tủ hồ sơ (v2.1)

**Bản hiện tại:** 3.119 · build 09/10/2026 19:00
**Kho:** `nhannt3-gif/tu-ho-so` → `index.html` (một file HTML duy nhất)
**App đang chạy thật:** https://nhannt3-gif.github.io/tu-ho-so/
**ĐỌC TRƯỚC khi làm tiếp:** `docs/BAN_GIAO_TIEP_TUC.md` (người dùng, quy tắc, kiến trúc, quy trình, việc đang dở) · phép thử: `tests/README.md` · `CLAUDE.md`
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

### Danh sách thử trên máy thật (3.119) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Phân công BTV Hội CCB / LHPN (tên dài) | Đầu văn bản: tên Hội 1 dòng, hoặc xuống dòng đúng trước "XÃ / PHƯỜNG …" | |

**Việc chờ anh xác nhận:** nhớ người kiểm tra / người ký theo từng Hội – xã (hiện nhớ chung 1 lựa chọn mỗi mẫu).

**Ghi nhận 06/10/2026 — Số TK 105 sai (làm ở bản sau, khi anh gửi file):**
- Anh xác nhận: **Mẫu 31 (LEND_31) có số dư 105 nhưng KHÔNG có số TK 105.** App đang lấy cột "Số TK" (`SL_TRUONG.stk`, tên cột 'so tk' / 'so tiet kiem 105') ra số 14 chữ số (dạng 1482…) và gắn nhãn "Số TK 105" — **sai nhãn**. Số TK 105 đúng có dạng 10 chữ số giống Mã KH (dạng 48000…).
- Số dư 105 (`t105`, cột '105 ngày BC' / 'số dư 105') đúng — giữ.
- **Cập nhật 06/10:** anh đã chép đè Mẫu 31 bản có số TK 105 đúng (cột cũ của file trước ra số 1482…). Cách đọc cột của app không đổi; chờ anh xác nhận Tra cứu hiện đúng. Nếu vẫn sai → kiểm tra file kỳ mới hơn (Mẫu 10 / Sao kê KH) đang đè danh bạ.
- **Việc cần làm (nếu vẫn sai):** (A) bỏ số 1482… khỏi mọi chỗ ghi "Số TK 105" (Tra cứu KH, Tổ TK&VV, Sao kê, Excel), không xóa dữ liệu đã nạp; (B) anh sẽ gửi file có số TK 105 → thêm loại file vào Nạp số liệu, ghép theo Mã KH. Chờ anh gửi tên file + dòng tiêu đề cột (không đưa số liệu thật vào repo).

### Danh sách thử trên máy thật (3.118) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mẫu 06 Word tổ Đoàn | "Đơn vị kiểm tra: Đoàn Thanh niên" / "xã …" xuống dòng gọn; "Chức vụ:" có hai chấm; dòng chấm cách chữ; Cộng in đậm, số tổng dài không rớt dòng; Chứng kiến ngang Cán bộ kiểm tra | |
| 2 | Mẫu 16 | Không còn dòng "ĐƠN VỊ KIỂM TRA" (khi có tên); "(tỷ lệ 0%)"; Ủy viên BTV đủ dòng | |
| 3 | Mẫu 04 | Nơi nhận "- PGD NHCSXH Gò Dầu;"; đầu trang bỏ nhãn | |
| 4 | Phân công BTV | Đủ ấp của xã; mở lần đầu đã chia sẵn, Chủ tịch ít hơn; sửa nhiệm kỳ trong hộp | |

**Ghi chú kỹ thuật 3.118:** khuôn Word đổi bằng sửa JSON `KT_KHUON` (m06.sau: <w:b/> cho TGN/TDN/TNL, dời đoạn chấm 030FF9C2 ra trước bảng ký; m16.than: `{{DV0|ĐƠN VỊ KIỂM TRA}}`, " Chức vụ:", "(tỷ lệ {{TLKN}}%)"; m04.than: `{{DV0|…}}`, `{{NN04|NHCSXH ...}}`). Bản In: ô trong `.kt-bg` kế thừa `vertical-align:middle` → khối ký phải đặt `vertical-align:top`. Phân công: `x.chia` = đã chia sẵn (không chia đè lựa chọn tay).

### Danh sách thử trên máy thật (3.117) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mẫu 06 Word, 1 / 2 / 3 hộ (mỗi hộ 1 khế ước) | In 1 mặt | |
| 2 | Mẫu 06 Word, ≥ 4 dòng hoặc khách nhiều khế ước | Khách nhiều khế ước không bị cắt; hộ cuối sang trang cùng dòng Cộng + nhận xét + ký; trang 2 có dòng tiêu đề bảng | |
| 3 | 🏛 Khai báo Hội đoàn thể › 📄 Phân công BTV | Đủ người đã khai; tích ấp / ⇄ chia đều; Word mở được, chữ đúng mẫu | |
| 4 | Phân công của Đoàn | Đầu: BCH ĐOÀN XÃ …, Số -TB/ĐTN; ký BÍ THƯ | |

**Ghi chú kỹ thuật 3.117:** Word không có "không tách nhóm dòng" → dùng `keepNext` trên đoạn của các dòng (`KT_KHUON.m06` có `dongKN` = `dong` + keepNext); dòng cuối của mỗi hộ không giữ (trừ hộ cuối) để Word được ngắt giữa các hộ. Sức chứa đo bằng PDF Chromium của bản In (Word có thể lệch ± 1 dòng tùy máy in / phông). Phân công: `ktPCNoiDung(k)` dựng nội dung chung cho Word (`ktBungPC`, dùng gói A4 dọc của KH ②) và bản In (`ktHTMLPC`); câu nhiệm vụ ở `KT_PC_CT / PHO / UV / KT / TQ`, chỗ thay `{xa} {ten} {CT} {ap}…`.

### Danh sách thử trên máy thật (3.116) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mẫu 16 ✚ Điền đầy đủ | Bảng II không còn chữ "đầy đủ"; 4 ô điều cấm ghi "Không" | |

**Ghi chú 3.116 (anh chốt, áp cho mọi mẫu về sau):** chữ ghi sẵn không khẳng định quá (bỏ "đầy đủ", dùng "Có thực hiện / Có tham gia / Đảm bảo đúng thành phần"); điều cấm ghi rõ "Không"; câu có số liệu dẫn chứng → ghi cụ thể.

### Danh sách thử trên máy thật (3.115) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mẫu 06 tổ ở phường (địa bàn dài) | "Thời điểm · Địa bàn · Tổ TK&VV" 1 dòng (có thể bỏ tỉnh / viết tắt KP, P.) | |
| 2 | Mẫu 06 cột Chương trình | Chữ giữa ô | |
| 3 | Khối ký Mẫu 06 / 16 | Tên cán bộ kiểm tra; Mẫu 16 có thêm tên Tổ trưởng | |
| 4 | Mẫu 16 ✚ Điền đầy đủ | Bảng II ghi chữ như mẫu tham khảo | |

**Ghi chú kỹ thuật 3.115:** rà dính chữ bằng cách xuất bản đã điền rồi dò từ có ≥ 2 cụm nguyên âm (2 âm tiết dính) và dấu câu dính chữ — đổi `<w:tab/>`, `<w:br/>` thành khoảng trắng trước khi dò (không thì báo nhầm). `ktKyTen(xml, nhãn, tên)` chèn tên dưới đoạn "(Ký, ghi rõ họ tên" đầu tiên sau nhãn.

### Danh sách thử trên máy thật (3.114) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Đột xuất › Word Mẫu 06 | Hiện hộp chọn; mặc định Phó Chủ tịch; đổi Chủ tịch → phiếu ghi tên + chức vụ Chủ tịch | |
| 2 | Word Mẫu 16 | Bảng II trống (mặc định); bấm ✚ Điền đầy đủ → có x / Không / Định kỳ theo quý; chọn người 2 → in 2 dòng | |
| 3 | Mẫu 04 | Đoàn kiểm tra theo người 1, 2; tên người 1 dưới TRƯỞNG ĐOÀN KIỂM TRA; tổ có nợ quá hạn / khoanh → kiến nghị b) có tên hộ | |
| 4 | Kế hoạch › Xem | Hỏi người ký; chọn Phó Chủ tịch → tên phó, chức danh vẫn CHỦ TỊCH | |
| 5 | Mở lại app / máy khác | Lựa chọn lần trước được nhớ | |

**Ghi chú kỹ thuật 3.114:** các hàm in nhận cờ "đã chọn": `ktXuat(mau, cach, 1)`, `ktGNXem(1)`, `ktDKXem('', 1)`, `ktBCXem(1)`, `ktKHXem(1)`, `ktKH04Xem(1)`, `ktKHInCa(1)` — không có cờ thì mở `ktInHop`. Lựa chọn lấy bằng `ktInV(mẫu)`; `ktCanBo(t, v)` theo `v.ng1` khi có. `ktBC04(ds, th, v)`, `ktKHGiaTri(v)`, `ktDKGiaTri(v06, v16)`. Ngày đột xuất ở ô `#kb-ngay` cạnh nút In (`ktDocKB`).

### Danh sách thử trên máy thật (3.113) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy đã khai bảng Hội: mở app bản mới (đã nối Drive), đợi vài giây | Cài đặt › Drive: "Lần lưu gần nhất" cập nhật | |
| 2 | Laptop: mở app, nối Drive | KTGS › 🏛 Khai báo Hội đoàn thể có đủ dữ liệu máy kia; độ rộng khung của laptop giữ nguyên | |
| 3 | Khai báo cũ | Cán bộ chức vụ Phó Chủ tịch nằm ở ô Phó CT, người ký nằm ở ô Chủ tịch | |
| 4 | Sửa 1 ô ở laptop → mở máy kia | Máy kia thấy ô mới, ô khác không mất | |
| 5 | In Mẫu 06 / 16 / 04 / Kế hoạch | Người kiểm tra = Phó CT; người ký KH = Chủ tịch | |

**Ghi chú kỹ thuật 3.113:** khóa cài đặt mới mặc định **đồng bộ**; khóa chỉ hợp từng máy (màn hình, đang xem, mở – đóng) phải thêm vào `CH_RIENG`. `chBam` không bao giờ lên Drive. Lãnh đạo Hội lưu trong `ktHoiKB['xã|hội']` = `{ten, ct, pct, uv1…uv5, hd, hdNgay, kh, khNgay}` (+ `cb`/`cbcv` khai cũ khi chưa có Phó CT). `ktChuanHop` / `ktHoiKBHop` giữ tên, giờ mở tab `hdt`.

### Danh sách thử trên máy thật (3.112) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › Kế hoạch › Căn cứ: 10566 → Word khuôn ② | Dòng căn cứ đầu "- Căn cứ hướng dẫn 10566/HD-NHCS ngày 29/12/2022 …"; phần còn lại như bản 727; tên file có "(can cu 10566)" | |
| 2 | Cùng Hội, khuôn ① | Cũng căn cứ 10566; bấm lại 727 → về như cũ | |

**Ghi chú kỹ thuật 3.112:** `KT_CC727` phải trùng đúng chữ dòng căn cứ trong khuôn `m01` / `m01b` (sửa khuôn thì sửa cả hằng này — t116 kiểm). Lựa chọn lưu `D.cauHinh.ktHoiKB['xã|hội'].ccKH = '10566'` (727 = xóa khóa).

### Danh sách thử trên máy thật (3.111) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › Mẫu 06 → Word | Dòng đầu như mẫu gốc (Thời điểm · Địa bàn · Tổ; Đơn vị tính dòng riêng); tên hoa đầu từ; 1 món 2 dòng; NSVSMTNT không rớt chữ; Nợ lãi có lãi tồn, Cộng có tổng | |
| 2 | Mẫu 06 địa bàn dài (phường) | Tổ TK&VV xuống dòng thẳng cột Địa bàn, không tràn lề | |
| 3 | Mẫu 16 → Word | "ĐƠN VỊ KIỂM TRA" canh giữa tên đơn vị; Bảng II có x / Không / Định kỳ theo quý; chọn "Để trống" → bảng trống | |
| 4 | Scan › khôi phục ảnh | Không còn ngày 2036 | |

**Ghi chú kỹ thuật 3.111:** khuôn `m06`: lưới bảng `[454,1276,992,1360,992,992,2099,850,850,1476,850,850,851,850,1134]` (đầu bảng, `dong`, `dongKN`, dòng Cộng); ô 13 `{{R8|}}`, Cộng `{{TNL|}}`; `ktDongCo` → trHeight 567, ô CT cỡ 20; `ktOSz(x, ix, sz)` đổi cỡ ô; `ktDai2` đo chữ thường (`ktDoRong(x, sz, thuong)`) so 2 dòng × 90% bề rộng `KT_06_O`. `ktCB06` / `ktCB06HTML` dùng `ktDong3_06` (a, b twip, `mot`). Khuôn `m16`: đầu trang tab giữa 1800 / 6350; 14 ô `{{B1|}}…{{B14|}}`, `ktGiaTri16` → `b2`, `ktB16Mac`. `tgTuId` giới hạn 2020 … hôm nay + 1 ngày.

### Danh sách thử trên máy thật (3.110) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Kế hoạch ② Word | "- Địa điểm: Văn phòng khu phố.", "- Hội Nông dân phường … giao đồng chí …" có dấu cách | |
| 2 | Kế hoạch ① Word | Mục hoạt động Tổ / hộ vay không còn chữ dính | |

**Ghi chú kỹ thuật 3.110:** khi sửa khuôn bằng thay chuỗi, **không xóa ô `<w:t>` chỉ có dấu cách** (nó là khoảng cách giữa 2 ô chữ). Phép thử t114 mục 6 chặn tái phát.

### Danh sách thử trên máy thật (3.109) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › Mẫu 04 (số liệu T9) → Word | "Gia Lộc, ngày ....... tháng 10 năm 2026"; III có 2 ý nội dung; IV.1 có lãi tồn; IV.2 a) b) c) ghi sẵn, b) liệt kê hộ theo tổ (≤ 10 hộ) | |
| 2 | Kiểm lãi tồn cao 1 hộ trong danh sách | Lãi tồn > 6 tháng lãi (dư nợ × lãi suất ÷ 12 × 6) — nếu lãi suất Mẫu 31 không phải %/năm thì báo em | |
| 3 | Mẫu 16 đột xuất, chưa khai ngày → Word | "Hôm nay, ngày … tháng 10 năm 2026"; Tồn tại / Kiến nghị có tên hộ | |

**Ghi chú kỹ thuật 3.109:** khuôn `m04`: dòng ngày `{{NOI04}}…{{TH04}}…{{NAM04}}`, III `{{@ND}}{{@CHAM1}}`, IV.2 a/b/c `{{@KNA}}` `{{@KNB}}` `{{@KNC}}`; `ktBC04` → `f.NOI04/TH04/NAM04`, `nd`, `kn` (`ktKN04`); `ktBung04` / `ktHTML04` điền cùng nội dung. `ktLaiThang(m)`, `ktDsDon(t)` (dựa `ktHo`), `ktDsChu` / `ktDsKHD` / `ktDsLTC`, `KT_DS_TOI = 10`. `ktGiaTri16`: chưa khai ngày → `ktThangKT()`. `ktNhanXet16`: tt / kn có tên hộ.

### Danh sách thử trên máy thật (3.108) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › Nạp file `004820_30092026_DSTO.xlsx` | Nhận "Danh sách tổ TK&VV (DSTO)" kỳ T9/2026, **369 dòng** (không phải 6) | |
| 2 | ② Kiểm tra T9 | Mục 6: thiếu 18 tổ trong Thông tin tổ trưởng (lưu ý), DSTO đủ, điểm GD / Hội / tổ trưởng / SĐT khớp | |
| 3 | KTGS Hội T9 | Dòng vàng "… thiếu 18 tổ … đã xếp điểm GD: Danh sách tổ (DSTO) 18" | |
| 4 | Tổ TK&VV / Mẫu 06 / Mẫu 16 | Tên tổ trưởng "Nguyễn Văn A" (không IN HOA, không "Ông / Bà"); tên hộ vay giữ như hệ thống | |
| 5 | Kế hoạch KTGS ② Word (Hội Nông dân phường Gia Lộc) | Tên cơ quan 1 dòng (cỡ 12); gạch dưới đen, sát tên hơn; gạch dưới tiêu ngữ thấp xuống chút; câu "Hội … xây dựng kế hoạch" không còn gạch đầu dòng; lịch ghi tên tổ trưởng chuẩn | |
| 6 | Kế hoạch ② của Hội LHPN / Đoàn ở phường | Tên cơ quan 2 dòng gọn "HỘI LIÊN HIỆP PHỤ NỮ / PHƯỜNG …", gạch dưới nằm dưới dòng 2 | |

**Ghi chú kỹ thuật 3.108:** `SL_LOAI` thêm `dsto` (nhóm D, `giuHet`, `khong` mã KH / KU); `SL_TRUONG` thêm `dvTen`, `ttKH`, `skv`, `tk`, alias tổ phó "hien tai". `slSuaRef(ws)` (đọc trực tiếp + chuỗi Worker qua `toString()`). `slLayDong`: `thu truong`, `ghi ro ho ten` → ký; dòng chỉ "con lai ton / con tiet kiem" → tiêu đề. `toNap`: vòng `Bm.co.dsto` sau `tt` (`t.ds`, `toDvTuTen`, `diemTu`), điền `ngayGD` theo mã điểm, `toTenChuan(K)` sau `twGhepTo` (tên gốc `tenGoc`). `slKTDsTo(B, them)` gọi sau `slKTTW`; Kế hoạch: `ktHXCo(hx, rộng)` + `ktDoRong` (canvas), khuôn `{{HXZ|26}}`, cột trái ② 4560 / ① 4380, gạch dưới ② đen (bỏ `wps:style` accent1); `slDoiChieu` bỏ phép "có trong danh sách tổ trưởng" khi có `co.dsto`. `ktSuyHTML` nhóm "Danh sách tổ (DSTO)".

### Danh sách thử trên máy thật (3.107) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu T9 › KTGS Hội (đã nạp Thông tin tổ trưởng T8 + T9) | Dòng vàng "File Thông tin tổ trưởng T9/2026 thiếu … tổ — đã xếp điểm GD: tháng trước …"; bấm ra bảng từng tổ, điểm GD đúng như T8 | |
| 2 | KTGS Hội › Phường Gia Lộc | Không còn chip "(chưa rõ điểm GD)", "Trực tiếp", "Vay trực tiếp" | |
| 3 | Tổ TK&VV › Phường Gia Lộc | Vay trực tiếp nằm trong đúng điểm GD (theo ấp của món) | |
| 4 | Mẫu 16 Word (tổ Hội Nông dân, tổ Đoàn) | "ĐOÀN KIỂM TRA: Hội Nông dân phường …" / "Đoàn Thanh niên …"; khung ✎ Khai báo không còn ô Đoàn kiểm tra | |

**Ghi chú kỹ thuật 3.107:** `toNap`: bảng tổ tháng khác lọc `ky.length===7`, xếp theo khoảng cách tháng (`cach`), 6 bảng, chỉ nhận dòng có `diem`, ghi `t.diemTu`; `toDanhBaDiem(K)` (danh bạ `SL_DB.to` → mã điểm qua tổ cùng xã cùng tên điểm) chạy trước `toSuyDiem`. `toGanTrucTiep`: `theoAp` (danh mục địa bàn / đa số tổ cùng `xa|thon`) → `diem[xa|ngày]` → xã 1 điểm. `ktSuyHTML(K)`: tổ không có `t.tt` mà có `diemTu`/`diemSuy` (thiếu) hoặc không `diem` (chưa rõ), bảng `.kt-suy`. `PV_DUNG.kt.boTT` + `pvBoTT(T)` trong `pvVeCay`. Mẫu 16: `DOAN` = `ktHoiTenTD(t)` (dv ≠ 99), bỏ `doan` khỏi `KT_KB_LUU` / `ktDocKB` / khung; dọn `ktKBLuu.doan` ở khối dọn rác 3.106.

### Danh sách thử trên máy thật (3.106) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › Mẫu 04 (cây hoặc theo kế hoạch) → Word | Đoàn kiểm tra = cán bộ 06/16 + 2 dòng "- Ông (bà): … Chức vụ: …"; thời gian "Tháng 10/2026" (số liệu tháng 9); địa điểm "Ấp …, xã …, tỉnh Tây Ninh"; IV.1 chỉ "Đối với Tổ TK&VV:" + từng tổ có số; kiến nghị trống; VI có 2 dòng chấm | |
| 2 | Kế hoạch ① Word | Mục thành phần 1 câu "… thành lập đoàn kiểm tra gồm: Các đồng chí Chủ tịch, Phó Chủ tịch, Ủy viên Ban Thường vụ …" | |
| 3 | Kế hoạch ② Word (chưa khai số KH / HĐ) | Đủ 3 căn cứ như ①, số / ngày để chấm | |
| 4 | ⚙ Bảng khai báo Hội – xã | Không còn cột Đoàn kiểm tra; dưới mỗi ô "In ra: …" đổi theo khi gõ; ↺ về chuẩn | |
| 5 | Văn bản: bấm 📋 trên 1 dòng → Zalo Ctrl+V | Dán đúng file | |
| 6 | ☑ Chọn chép → chọn 3 file → 📋 Chép 3 file (lần đầu: cài lại cầu nối, Mở thử thấy "bản 2") → Zalo / thư mục Ctrl+V | Dán cả 3 file một lần | |

**Ghi chú kỹ thuật 3.106:** Mẫu 04: `ktBC04` → `{doan:[{cb,cv}], nx:[…], rows}`, `ktThangKT`, `ktDiaDiem04`, `ktDoan04`, `ktNxTo04`; `ktBung04` dựng đoạn Ông (bà) (tab 5670, dòng in sẵn tab dẫn chấm 5670 + phải 9213) + `{{@NXTO}}`; `ktHTML04` cùng bố cục. Kế hoạch: ① `doan:[câu thành phần]` (KT_CHUAN ky / pho / ld); ② căn cứ = 3 đoạn như ① (pPr đoạn 727), `f` thêm KH, KHN, HOIT, HD, HDN. Bảng khai báo: `KT_HKB_O` bỏ `doan`, `ktHkbIn(t, kb, ô, id)` / `ktHkbXem` / `ktHkbVe`, lớp `.hkb-in .tu/.da/.cam`. Dọn rác ở khối khởi động cạnh `slgbDaDoi`. Chép: `chepMot`, `chepNhieu` / `chepNhieuRel` / `chepTiep` (`CN_CHEP_CON`), `b64url`, `cnBan2` (`localStorage.tuhoso_cn_ban`), `hoiCauNoiBan2`; script cầu nối nhánh `chepn`; chế độ chọn `BOT.muc` ('xoa' / 'chep'), `nutChepNhieu`.

### Danh sách thử trên máy thật (3.103 + exe 1.2.0) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📌 Nổi → gõ 1 món | Mở ở mức thu gọn (không có bảng / kỳ trả); cửa sổ vừa nội dung | |
| 2 | Bấm ▾ Chi tiết rồi ▴ Thu gọn | Hiện / ẩn bảng + kỳ trả + cách tính; cửa sổ dài ra / ngắn lại | |
| 3 | Bấm ▁ | Còn 1 dải: ô ra trường, tiền vay, 1 dòng kết quả; gõ món mới dòng đổi theo; bấm dòng là chép; ▢ mở lại | |
| 4 | Bấm ☀ / 🌙 | Đổi nền sáng / tối riêng cửa sổ nổi; mở lại vẫn nhớ; khối kết quả ở nền tối không còn nền sáng | |
| 4c | 🔎 Tra cứu KH: tìm theo tên | Danh sách: tên xanh đậm + mã KH khung xanh cạnh tên; đầu thẻ: tên to đậm + mã KH khung xanh | |
| 4b | Số liệu → 🔎 Tra cứu KH: chọn khách có món HSSV | Cột trái rộng ~40% (tên, mã, CCCD đủ chữ); dòng HSSV: tên trường xanh đậm, khóa + nhập học → ra trường khung cam | |
| 5 | Exe 1.2.0 (Releases): Thu nhỏ / Mở ra, Chi tiết ▼, Nền tối | Như cửa sổ nổi; cửa sổ tự co giãn; đóng mở lại nhớ mức + nền | |

**Ghi chú kỹ thuật 3.103:** cửa sổ nổi: `HS_NOI_MUC` (nho / gon / chi, mỗi lần mở = gon), lớp `hs-m-<mức>` trên `<body>` PiP + CSS trong `hsNoi` (ẩn `.hs-bang` / `.hs-ct` ở gon; ở nho ẩn `#hs-kq`, ô ngày vay, loại, GDX…), `hsMiniHTML` (`#hs-mini`), `hsNoiVe` (vẽ nút + gọi `hsNoiCoVua` → `w.resizeTo`), `hsNoiMuc`, `hsNoiChi`, `hsNoiMau` + `hsNoiToi` (data-theme riêng PiP, `localStorage.tuhoso_hs_noi_mau`); `hsDat` / `hsLoai` gọi `hsNoiVe` khi đang nổi. CSS nền tối `.hs-k` / `.hs-k.phu` (cả `prefers-color-scheme`). Exe 1.2.0: bảng màu `DatMau()` (sáng / tối) + `ApMau()`, `DatMuc(m)` + `CoVua()` (tính chiều cao theo phần đang hiện), `lMini`, `bChiTiet`, ini thêm `toi=`, `muc=` (vị trí chỉ lấy x, y, rộng).

### Danh sách thử trên máy thật (3.102) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | App trên Chrome / Edge → 🎓 Hạn trả HSSV → 📌 Nổi | Cửa sổ nhỏ nổi trên mọi cửa sổ (kể cả chương trình nghiệp vụ); kéo đi được; ô trong app ghi "Đang mở ở cửa sổ nổi" | |
| 2 | Gõ trong cửa sổ nổi: GDX, ra trường, Enter, tiền; bấm Chép / khối | Kết quả như trong app; chép được (báo trong cửa sổ nổi) | |
| 3 | Bấm ↩ hoặc đóng cửa sổ nổi | Ô trong app hiện lại với số đang nhập | |
| 3b | Sau khi gộp: tab Actions → "Phát hành HanTraHSSV.exe" chạy xanh; trang Releases có bản `hssv-v1.0.0.0` kèm file exe | Có bản Release, tải được exe | |
| 4 | Tải `HanTraHSSV.exe` ở trang Releases → mở trên Windows | Mở được (SmartScreen: More info → Run anyway); cửa sổ ghim trên cùng | |
| 5 | Trong exe: GDX 07 → ra trường 30082030 | Ngày vay 07/10/2026 (nếu hôm nay 04/10), tiền 160, thời hạn 104 tháng, hạn cuối 07/07/2035, lần đầu 07/08/2031 | |
| 6 | Đóng exe, mở lại | Nhớ GDX, vị trí cửa sổ, ghim | |

**Ghi chú kỹ thuật 3.102:** Cửa sổ nổi: `HS_PIP` (cửa sổ PiP), `hsEl(id)` thay `document.getElementById` trong các hàm HSSV, `hsNoi()` (`documentPictureInPicture.requestWindow` 460×620, chép mọi `<style>` + thuộc tính `<html>` (theme), proxy `HS_NOI_HAM` = hsDat / hsPhim / hsLoai / hsChep / hsGhiTodo / ccChep / hsNoiDong vào cửa sổ PiP), `hsNoiHTML` (`HS_VE_NOI` để vẽ đủ ô), `hsNoiBao`, `hsNoiDong`, sự kiện `pagehide` → `ccVeLai('hssv')`; `ccHSSVHTML` / `hsChonLoaiHTML` khi đang nổi trả dòng báo / rỗng; `ccChep` dùng `HS_PIP.navigator.clipboard`. Exe: `tools/hssv/HanTraHSSV.cs` — lớp `Hs` (Doc, Edate, Thang, SoNgay, NgayGD, VeGD, VayGoiY, GoiY, Tinh — chép từ JS), `FormHs` (TopMost, bố cục tay `XepKq`), chế độ `--kiem` (stdin `vay|rt|gdx|tien|loai|homnay`) cho `tests/hssv_exe.js`. Đổi công thức HSSV phải sửa cả `index.html` lẫn `HanTraHSSV.cs`, dựng lại exe, chạy `node tests/hssv_exe.js`. Phát hành: `.github/workflows/hssv-release.yml` (push main đụng `HanTraHSSV.cs` / workflow_dispatch; job `kiem` ubuntu + mono so ca, job `phat-hanh` windows csc C# 5 + `gh release create/upload --clobber`, tag `hssv-v<AssemblyFileVersion>`). Phiên Claude không tạo được Release trực tiếp (403) — luôn qua workflow này. **Lưu ý WinForms:** mono trên Linux xếp bố cục khác Windows (vd `TableLayoutPanel` bỏ qua ô ẩn trên Windows) — luôn gán hàng / cột cố định; ảnh chụp mono không thay được thử trên Windows thật (lỗi 1.0.0 → sửa ở 1.0.1).

### Danh sách thử trên máy thật (3.101) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🎓 HSSV: vay 15/09/2026, ra 15/09/2030 · 15/02/2030 · 15/12/2028 | Gợi ý 160 / 140 / 80 tr (40 / 35 / 20 tháng vay) | |
| 2 | Vay 15/02/2027 (giữa năm học), ra 15/06/2030 | 140 tr (năm đầu nửa năm) | |
| 2b | Vay 15/09/2026, ra 15/01/2030 | 120 tr (tháng 1 tính vào năm trước) | |
| 3 | Mở "Cách tính" | Có dòng liệt kê từng năm học: tròn năm / nửa năm / không tính | |

**Ghi chú kỹ thuật 3.101:** `hsGoiY` viết lại theo năm học: `nh(d)` = năm bắt đầu năm học (tháng ≥ 9 → năm đó), `fa` (tháng vay: 9–12 → 1, 1–5 → ½, 6–8 → 0), `fb` (tháng ra: 6–8 → 1, 2–5 → ½, 9–12 và 1 → 0); khác năm học: fa + số năm giữa + fb; cùng năm học: fa + fb − 1; `nua = max(1, round(tổng × 2))`; trả thêm `ds` (chuỗi từng năm học) cho dòng Cách tính.

### Danh sách thử trên máy thật (3.100) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở 🎓 Hạn trả HSSV, gõ GDX của xã | Ô Ngày vay tự điền ngày GDX gần nhất từ hôm nay (nhãn "GDX gần nhất"); hôm nay đúng GDX thì là hôm nay | |
| 2 | Đổi GDX sang số khác | Ngày vay đổi theo; nếu đã gõ tay ngày vay thì giữ nguyên | |
| 3 | Ngày vay 07/10/2026, ra trường 30/12/2028 (26 tháng) | Tiền vay gợi ý **80** (20 tháng, 2 năm) | |

**Ghi chú kỹ thuật 3.100:** `hsVayGoiY(g)` (dùng `nay()`, `hsNgayGD`; ngày < hôm nay → tháng sau), cờ `CC.hs.vayTay`, nhãn `hsVayNhan()` → `#hs-vgy`; `hsDat('gdx')` gợi ý lại ngày vay khi chưa gõ tay rồi tính lại tiền. `hsGoiY`: `nua = max(1, round(tp/6))` (3.99 là `ceil`).

### Danh sách thử trên máy thật (3.99) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hôm nay → 🎓 Hạn trả HSSV: GDX 07, ngày vay 07/10/2026, ra trường 30/08/2030 | Ô Tiền vay tự điền **160**, nhãn "gợi ý 40 th = 160"; ô Số tiền vay 160.000.000, dòng "40 tháng vay (4 năm) × 4 tr" | |
| 2 | Đổi ra trường 01/02/2030 (vay 01/09/2026) | Tự điền **140** (35 tháng, 3 năm rưỡi) | |
| 3 | Gõ đè tiền 100 | Kết quả dùng 100 tr; ô Số tiền vay ghi "Gợi ý: 35 tháng = 140 tr"; câu chép "Số tiền vay 100.000.000…" | |
| 4 | Nhập món kế (gõ ngày ra trường mới) | Tiền tự điền lại theo món mới | |
| 5 | Nhìn kết quả (máy tính + điện thoại) | Hàng 1: 3 khối lớn xanh (tiền vay, thời hạn, hạn cuối); hàng 2: 2 khối nhỏ xám xanh (trả mỗi lần, lần đầu); bấm khối là chép | |

**Ghi chú kỹ thuật 3.99:** `hsGoiY(v)` → {nua = ⌈tháng phát tiền vay / 6⌉, thang = nua × 5, trieu = nua × 20, nam} (tháng lấy `hsThang`, cùng số "phát tiền vay" đang hiện); `hsGoiYNhan()` → nhãn `#hs-goiy`; `hsDat`: đổi ngày vay / ra trường → `v.tien` = gợi ý, `tienTay=false`, cập nhật ô `#hs-tien`; gõ tiền → `tienTay=true`; `hsGT` lần đầu tự điền nếu trống. `hsTinh` thêm `kq.goiY`. Khối: `.hs-khoi` lưới 6 cột, `.hs-k` span 2 (3 lớn), `.hs-k.phu` span 3 (2 nhỏ); màn ≤ 600px chữ nhỏ lại. Mức 4 tr/tháng cố định trong `hsGoiY` (đổi mức thì sửa 1 chỗ).

### Danh sách thử trên máy thật (3.98) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Kiểm tra đột xuất 1 tổ → Mẫu 06 Word (điền Đơn vị, 1 cán bộ) → mở **Word thật** | Không còn dòng chấm dưới Đơn vị; "Chức vụ" dòng 1 thẳng dòng 2; "Địa bàn kiểm tra: ấp/khu phố …, xã/phường …, tỉnh Tây Ninh" rồi khoảng cách tới Tổ TK&VV | |
| 2 | Cùng phiếu đó | Cột Mục đích rộng, dòng cao đủ ghi 3 dòng; khách 2 khế ước chỉ 1 tên, 1 ô ký; hộ theo mã KH; **phiếu 1–2 món vừa 1 trang** (anh xem giúp phiếu 3+ món) | |
| 3 | Khách vay nước sạch 50 tr (cột Mục đích "In mục đích") | In đủ 2 mục đích (nếu cột Mã PNKT52 = 39000) | |
| 4 | Sau giải ngân chọn 2 tháng, đến xã → 👁 Xem | Mỗi tổ 1 phiếu, xem trước mỗi phiếu 1 tờ riêng có nhãn; không còn cột "Đã lập phiếu" | |
| 5 | Danh sách chọn hộ (đột xuất / sau GN / định kỳ) | Có Mã KH, số KU, lãi tồn, số dư 105, ghi chú; xếp theo mã KH | |
| 6 | 📋 Mẫu 04 → chọn xã → tích 1 ấp → Xem | Tổ chưa tích sẵn; tích ấp chọn đủ tổ ấp đó; ngày trống = dòng chấm | |
| 7 | 🗓 Kế hoạch → chọn T3, T4 ở "Mẫu 04 theo kế hoạch" → Xem / In Kế hoạch + Mẫu 04 | Mỗi tháng 1 báo cáo đúng tổ của tháng, thời gian "…../03/2026" | |
| 8 | ⚙ Khai báo Hội → 📖 Bảng chuẩn hóa; Hội – xã Đoàn ở phường → Kế hoạch ② | "TỈNH ĐOÀN TÂY NINH" / "ĐTN PHƯỜNG …" (Hội LHPN: "HỘI LHPN TỈNH TÂY NINH" / "HỘI LHPN XÃ …"), "Bí thư", "Tỉnh Đoàn", "TM. BAN THƯỜNG VỤ", "phường", "khu phố" | |
| 9 | Mẫu 16 Word (chọn "Gợi ý theo số liệu") | "(Tổ) ấp/khu phố …, xã/phường …, tỉnh Tây Ninh"; "Tổ thuộc Hội … xã …"; ô kết quả số tổ viên, lãi tồn; III có gợi ý — sửa được trong Word | |
| 11 | Mẫu 06 / 16 để trống ô Đơn vị kiểm tra | Mẫu 06 "Đơn vị kiểm tra: Hội Nông dân xã …" (Đoàn: "Đoàn Thanh niên xã …"); Mẫu 16 đầu trang chữ hoa, dài thì 2 dòng, "Độc lập – Tự do – Hạnh phúc" không bị lệch; gõ "-" → dòng chấm | |
| 12 | KTGS đột xuất / sau giải ngân / định kỳ | Khung ✎ Khai báo ngay trong tab (không hộp bật lên); khai cán bộ 4 Hội của xã 1 lần → phiếu tự đúng người; chọn "Để trống — điền tay" → dòng chấm; mở lại app vẫn nhớ | |
| 13 | Văn bản → Chờ khai: văn bản chung (quy chế, 727…) khai ngày, tên, mảng, không chọn CT → Lưu | Rời danh sách Chờ khai; Sắp xếp → "Vừa thêm" đưa file mới vào tủ lên đầu | |
| 14 | Hôm nay → 🎓 Hạn trả HSSV: gõ GDX (dòng trên), ngày vay (đầu dòng nhập) rồi nhiều món liên tiếp | 4 khối số lớn 2×2 (thời hạn, hạn cuối, trả mỗi lần, lần đầu); mỗi món chỉ gõ ngày ra trường → Enter → tiền vay → Enter (quay về ngày ra trường); bấm vào ô là bôi đen số cũ | |
| 10 | KTGS tab Kế hoạch / cây: Phường Gia Lộc | Không còn "(chưa rõ điểm GD)" nếu ấp có trong danh mục / có tổ cùng ấp; có dòng báo vàng "điểm GD suy" | |

**Ghi chú kỹ thuật 3.98:** bỏ `ktGhiLS / ktLanTruoc / ktGhiNK / ktBCNguon / ktBCThang / ktBCTh / ktBCTo` (dữ liệu cũ giữ). Địa danh chung: `KT_TINH`, `ktLaPhuong`, `ktXaTen`, `ktApTen`, `ktCapAp`, `ktApChu(th, tenXa, hoa)` (đổi chữ ký — `ktKHAp` gọi kèm tenXa), `ktDiaBan`, `ktTheoKH`. Mẫu 06: khuôn `KT_KHUON.m06` đổi lưới cột (454,1276,992,850,850,850,2099,…), dấu `{{@DV2}}` (đoạn gốc ở `m06.dv2`) + `{{@CB}}` (`ktCB06`, `KT_TAB06` = 3600/9356/10773/14600/6237 twip), `ktDongCo` 850 atLeast, `ktDongBu` tối thiểu 2 dòng, `ktGopO` (vMerge cột 0/1/14, dòng `gop: dau|tiep`, `n`), bản In `ktCB06HTML` + rowspan. PNKT52: `ktNganh` → `ktNganh1` × 2, `ktMa52`, `ktCoNganh`. Xem trước: `ktGhepTo(ds, rộng mm, nhãn)` gom CSS từng loại + cỡ chữ riêng (dùng cho Kế hoạch + Mẫu 04). Sau GN: `ktGNTo` (gom tháng theo tổ, `o._th`), `ktGNHo`, `ktGNTichHo`, `ktGNVeLai`. Danh sách hộ: `KT_HO_TH`, `ktMonDong`, `ktHoDongHTML`, `ktGhiHo`. Mẫu 04: `ktBCDs` (cây), `KT_BC_AP`, `ktBCTichAp`, `ktBC04(ds, th)`, `ktBCHop`, `KT_BC_XEM.tu/tenFile`; Kế hoạch: `KT_KH_M04`, `ktKH04`, `ktKH04Xem`, `ktKHInCa`. Chuẩn hóa: `KT_CHUAN_O`, `KT_CHUAN`, `ktChuanGoc`, `ktChuan(t)` (Hội cấp xã luôn có BTV), `ktChuanDauXa`, `ktChuanHop`, `ktChuanSua`; trường `tm` (dòng TM., mặc định chung "BAN THƯỜNG VỤ") → `{{TMB}}`; khuôn m01: `{{CXA}}`, `{{HLN}}`, `{{HLH}}`, `{{CAPA}}` (Trưởng ấp), đoạn mới "TM. {{TMB}}" trên `{{CT}}`; m01b: `{{CXA}} {{LDC}} {{PCT}} {{CTN}} {{CAP}} {{CAPA}} {{LDB}} {{HLT}} {{TMB}} {{BTVV}} {{BTVT}}`, `{{@KHT}}` (đoạn căn cứ KH Hội tỉnh khi đã khai, pPr `m01b.khtPPr`), `{{HDS}}` (" số … ngày …"); `HOIT` = "Tỉnh Đoàn Tây Ninh" / "Hội … tỉnh Tây Ninh" (bỏ "tổ trưởng tổ dân phố"). Đơn vị kiểm tra: `ktDonVi(t, v, tối đa)` ("-" = chấm; quá dài → `KT_CHUAN.gon`), `ktDonVi16` → `{{DVA}}` / `{{DVB}}` (đầu trang Mẫu 16; tiêu ngữ tab giữa 6350 = tâm đường kẻ), `KT_DV_GOI`. Mẫu 16: khuôn `{{CAPA}} {{CAPX}} {{CAPT}}` (+ dạng `~`), `{{HOI|Hội ....}}` (giá trị = `ktHoiTen`), 4 đoạn Ông (bà) tab 5954 / 9213 với leader `{{LCB1|dot}}…` (giá trị 'none' khi có chữ), `{{KQ1}} {{KQ2}}`, `{{@UD}} {{@TT}} {{@KN}}` (đoạn gốc `m16.ud/tt/kn`), `ktNhanXet16`, `ktNxDoan`, `KT_NX_CHON`, `D.cauHinh.ktNhanXet`. Khai báo trong tab: `ktKBKhung(loai, dsHoi)` (dx / gn / dk), `ktKhungHoi(tit, ds, cột, nút)` (bc / kh), `ktHoiKBBang(ds, cột, chép)`, `ktHoiDsXa(xas)`, `ktCanBo(t, v)` (cbtu 'trong' = chấm; `ktHoiKB.cb / cbcv`), `KT_KB_LUU` → `D.cauHinh.ktKBLuu` (dv, cbtu, cb2, cv2, doan), `D.cauHinh.ktKBMo[loai]`; `ktKhaiBao / ktGNKhaiBao / ktDKKhaiBao` chỉ còn mở khung; `ktXuatNut`. HSSV: `hsChonLoaiHTML` (dòng trên: loại + GDX; ngày vay ở `.hs-nhap2` cùng ra trường + tiền), khối `.hs-khoi/.hs-k`, `hsO`, `HS_THU`, `hsPhim` (Enter / mũi tên, tiền → ra trường). Văn bản: `thieuThongTin` bỏ CT vay; `COT_SAP` thêm `them` (`lucThemMuc`). ⚙ Khai báo Hội dạng bảng: `ktHoiKBHop` (tr.kt-hkb, ô `hkb-<khóa>-<trường>`), `ktHoiKBChep(trường)`, `KT_HKB_TU`. Điểm GD: `toSuyDiem(K)` gọi trong `toNap` trước `toGanTrucTiep`, `t.diemSuy`; báo `ktSuyHTML`.

### Danh sách thử trên máy thật (3.97) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở tab Tổ TK&VV / Sao kê / KTGS | Ô Số liệu đang chọn **Mẫu 31 cuối tháng gần nhất**; số liệu theo ngày nằm nhóm "Theo ngày — khi cần" | |
| 2 | KTGS → **🗓 Định kỳ theo lịch**, số liệu T9/2026 | Ghi "Số liệu đến 30/09/2026 → kiểm tra tháng 10/2026"; tổ có lịch T10 trong Kế hoạch tích sẵn | |
| 3 | Bấm ▾ Chọn hộ 1 tổ | Hộ có món giải ngân các năm trước, tích sẵn; hộ QH / khoanh đỏ, không tích; bỏ tích vài hộ → tỷ lệ dưới 90% đỏ | |
| 4 | 👁 Xem → Word 06, Word 16 → mở bằng **Word thật** | Mẫu 06 "Thời điểm kiểm tra …../10/2026", "Ngày … tháng 10 năm 2026"; Mẫu 16 "ngày … tháng 10 năm 2026", số liệu đến 30/09/2026; mỗi tổ trang mới | |
| 5 | 📋 Mẫu 04 tháng 10 | Các tổ vừa lập định kỳ hiện sẵn, Biên bản 16 ✓, thời gian "…../10/2026" | |
| 6 | Tháng đã chốt 🔒 → bên KTGS nạp BC0437 tháng đó | Nạp được (file số liệu chính tháng đó vẫn khóa) | |
| 7 | Kiểm tra đột xuất → bấm **↺ Gợi ý lại** 2–3 lần | Mỗi lần ra hộ khác, hộ giải ngân < 30 ngày vẫn giữ | |
| 8 | Kế hoạch năm → chọn **② Mẫu gọn** → Word | Giống bản kế hoạch mẫu anh gửi (4 trang), tên Hội / tổ đúng của Hội đang chọn, TM. BAN THƯỜNG VỤ | |
| 9 | Mở Word Mẫu 04, Kế hoạch ① ② | Không có đường kẻ khung bảng đầu trang / chữ ký; Quốc hiệu, tiêu ngữ 1 dòng | |

**Ghi chú kỹ thuật 3.97:** Khối "3.97: 🗓 KIỂM TRA ĐỊNH KỲ" (sau khối 3.96): `KT_DK_CHON / KT_DK_BO / KT_DK_THEM` (tổ / hộ bỏ / hộ QH-khoanh tích thêm, theo phiên), `ktDKThang` (= kyLui(C.ky, 1), chỉ khi C.ky là tháng), `ktDKLich(th)` (đọc `D.cauHinh.ktKH` năm của th), `ktDKHo(t)` (ktHo → món có ngày GN < 01/01 năm kiểm tra; cache `KT_DK_CACHE`), `ktDKCo`, `ktDKTyLe` (hộ / món, bỏ QH-khoanh khỏi mẫu số), `ktDKDs`, `ktDKVe`, `ktDKHoHTML`, `ktDKKhaiBao`, `ktDKGiaTri` (ktGiaTri06 / 16 rồi đặt TD "…../mm/yyyy", ND '', NM, NY; `KT_SO_CUNG` để `ktSoTo` chỉ dùng BC0437 cùng tháng), `ktDKXem(che)`, `ktDKIn(cách, '06'|'16')` (ghi `ktGhiNK(t, '06dk'|'16dk', '', th, [mã KH])`). `ktBCNguon` / `ktBCThang` / `ktBCGiaTri` đọc mau *dk theo `th`. `ktHTML16` nhận mảng. Số liệu mặc định: `toDsKy` (tháng trước, ngày sau), `KY_PHIEN`, `toKyMacDinh(C, dsKy, tab)`, `toKyOpt` (optgroup) dùng ở `veToTK`, `veSaoKe`, `veKTGS`. Khóa: `slKhoaO(loai, kỳ)` = slChot trừ k37 / k38 (slOMT, slXoa, slThayO, slDoiNgay, slNapMot, slTrangThai, slGhiDaTich, đọc file). Gợi ý: `ktGoiY(t, kiểu, số, tranh)` xếp hộ trong `tranh` + hộ kiểm lần trước xuống cuối, `KT_CHON.daGoi`, `ktGoiYLai` quay vòng. Kế hoạch: `ktKHMau` / `ktKHDoiMau` (`ktHoiKB[k].mauKH`='2'), `ktKHGiaTri` theo khuôn (② dùng L1..L4, VT, HL), `ktBung01` không có `K.chu` thì chỉ bung lịch; `KT_KHUON.m01b` (`tools/khuon_docx.py m01b`, có footer + chú thích, không header; `TEN_RIENG_KH2` kiểm không còn tên riêng). `tools/khuon_docx.py`: `khong_vien`, `doi_cot`. Phép thử `tests/t110.js`.

### Danh sách thử trên máy thật (3.96) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội → **🗓 Kế hoạch năm · 01/KH** → chọn xã ở cây → bấm chip 1 hội | Bảng 100% tổ của Hội tại xã, gom theo ấp, mỗi tổ đã có tháng (02 → 10), dòng "Lịch: T2 n tổ · …" | |
| 2 | Đổi tháng ở dòng ấp, rồi đổi 1 tổ | Cả ấp sang tháng mới; tổ đổi riêng; mở lại app vẫn giữ | |
| 3 | Đổi "từ tháng / đến tháng" (vd 03 → 08) | Tổ xếp lại trong khoảng mới | |
| 4 | ⚙ Khai báo Hội: số HĐUT, ngày, số KH Hội tỉnh, đoàn (mỗi người 1 dòng), người ký → 👁 Xem → 📄 Word → mở bằng **Word thật** | Đầu trang HỘI … TỈNH / HỘI … XÃ đúng, căn cứ 727, chỉ 90%, không khung MẪU THAM KHẢO, bảng lịch đúng tháng – ấp – tổ, phần III giữ nguyên, ký CHỦ TỊCH + tên; số trang ở chân trang; không báo lỗi khi mở | |
| 5 | 🖨 In / PDF | Cùng nội dung bản Word | |

**Ghi chú kỹ thuật 3.96:** Khối "3.96: 🗓 KẾ HOẠCH KTGS NĂM" (sau khối 3.95): `ktKHNam` (C.khNam), `ktKHHoi` (C.hoi theo cây, hoặc C.khHoi = chip hội — cây cần điểm GD mới chọn được hội), `ktKHDsTo` (tổ của Hội tại xã, mọi điểm GD, theo `ktKHAp` rồi tên), `ktApChu` (giữ "Ấp / Thôn / Khu phố…" có sẵn), `ktKHMacDinh(ds, tu, den)` = tháng tu + ⌊i·M/N⌋, `ktKHLich` → {tu, den, gan, thieu, ds, luu} từ `D.cauHinh.ktKH['năm|xã|hội']` = {tu, den, to:{mã: tháng}, luc}, `ktKHDoiThang(mã, tháng, ấp)`, `ktKHDoiKhoang`, `ktKHXepLai`, `ktKHVe`, `ktKHGiaTri` → {nam, ten, doan[], rows[{L1, L2, L3}], f:{HT, HX, NOI, NAM, NT, TU, DEN, KH, KHN, HOIT, HD, HDN, NH, HXT, HOI1, CT, KY}}, `ktBung01` (bung `{{@DOAN}}` đủ 3 dòng, `{{@LICH}}`), `ktKHXem` / `ktKHIn`, `ktHTML01` + `ktXmlHTML` (Word đã điền → HTML: đoạn, đậm / nghiêng, canh lề, thụt dòng, bảng, tab dẫn chấm). `ktCheDo` thêm 'kh'; `ktHoiKBHop(2)` → Xong mở lại xem Kế hoạch. `ktDocx`: phần phụ `phu` lọc theo khuôn (header rId8 · endnotes rId7 · footnotes rId6 · footer rId11), `lay(k)` = null → không có phần đó. Khuôn `KT_KHUON.m01` = {mo, than, dong, chu, cham, sect, styles, settings, fontTable, theme, footer, header:null, footnotes:null, endnotes:null} dựng bằng `python3 tools/khuon_docx.py m01 <dự thảo .docx>` (hàm `thay` thay chuỗi trên chữ nối các run). Phép thử `tests/t109.js`.

### Danh sách thử trên máy thật (3.95) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội → **📋 Báo cáo tổng hợp · Mẫu 04** → chọn tháng đã lập phiếu | Bảng các tổ có phiếu trong tháng, tích sẵn, có ngày kiểm tra, số phiếu 06, Biên bản 16 ✓ / "chưa thấy" | |
| 2 | Chọn 1 xã (hoặc hội) ở cây | Chỉ còn tổ của xã đó + dòng "Tổ khác trong phạm vi" chưa tích; tích thêm 1 tổ, sửa ngày | |
| 3 | ⚙ Khai báo Hội → khai Đoàn kiểm tra (mỗi người 1 dòng), số HĐUT… → Xong | Đóng mở lại vẫn còn; đổi máy (Drive) vẫn còn | |
| 4 | 👁 Xem → 📄 Word → mở bằng **Word thật** | Đúng khuôn mẫu gốc, không còn khung MẪU THAM KHẢO; đơn vị in hoa; đoàn đủ dòng; bảng mục II mỗi tổ 1 dòng; dòng chấm III / IV đủ chỗ ghi; VI.1 có số phiếu; khối Nơi nhận + Trưởng đoàn không bị tách trang; không báo lỗi khi mở | |
| 5 | Chọn tổ của 2 Hội khác nhau → Word | 2 báo cáo trong 1 file, báo cáo thứ 2 sang trang mới | |
| 6 | 🖨 In / PDF | A4 dọc, bố cục như Word | |
| 7 | Lập Biên bản 16 cho 1 tổ (kiểm tra đột xuất) rồi mở lại Mẫu 04 tháng đó | Tổ hiện trong danh sách, cột Biên bản 16 ✓ | |

**Ghi chú kỹ thuật 3.95:** Khối "3.95: 📋 MẪU 04/BC-TH" (trước khuôn Word 3.93): `KT_BC_CHON` / `KT_BC_NGAY` (tích / ngày anh sửa, trong phiên), `ktGhiNK(t, mau, ngay, th)` → `D.cauHinh.ktgsNK[mã tổ]` = [{ngay, mau:'16'|'06gn', th, ten, thon, tenXa, xa, dv, luc}] (≤ 40 / tổ; gọi trong `ktXuat('m16')` và `ktGNIn`), `ktBCNguon(th)` gộp `ktgsLS` (Mẫu 06 đột xuất) + `ktgsNK` theo tháng của ngày → {ngay[], p06, pgn, bb16}, `ktBCDs` (tổ có phiếu lọc theo phạm vi cây khi đã chọn xã + tổ khác trong phạm vi + tổ đã tích), `ktBCNhom` (theo `xã|hội`), `ktBCGiaTri` → [{k, ten, f:{DV, SP}, doan[], rows[{C1..C4}]}], `ktBCXem` / `ktBCIn`, `ktBung04(K, g)` bung `{{@DOAN}}` (dòng `K.chu` + `K.cham` cho đủ 4), `{{@CHAMn}}`, `{{@DONG}}` (`K.dong`, trống → 2 dòng) rồi `ktDien`; `ktHTML04` (In, nhiều báo cáo `break-before:page`). `ktCheDo` thêm 'bc'. Khai báo Hội: `ktHoiDs`, `ktHoiKBHop(tuXem)`, `ktHoiKBSua(k, ô, v)` → `D.cauHinh.ktHoiKB['xã|hội']` = {ten, hd, hdNgay, kh, khNgay, doan (xuống dòng), ky}; `ktHoiTen` / `ktHoiTenTD` / `ktXaChu`. Khuôn: `KT_KHUON.m04` = {mo, than, dong, cham, chu, sect, styles, settings, fontTable, theme, header, footnotes, endnotes} dựng bằng `python3 tools/khuon_docx.py m04 <Mau04.docx>`; dòng chấm = đoạn có tab phải dẫn chấm ở 9213 twip (bề rộng vùng chữ), cao 22 pt. Phép thử `tests/t108.js`.

### Danh sách thử trên máy thật (3.94) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH (máy tính) → gõ tên | Danh sách 2 dòng/khách, thấy ~14 khách 1 màn; ↑ ↓ Enter chọn | |
| 2 | Bấm 1 khách | Thẻ phải: 5 ô số · Nhân thân (CCCD + cấp, hạn CCCD màu) · Liên hệ · Tiết kiệm · Món vay có cột Mục đích; không còn nút Hồ sơ hộ | |
| 3 | Khách có món HSSV | Dòng 🎓 tên SV, CCCD SV, trường, hệ, ngành, khóa | |
| 4 | Bấm vào CCCD / khế ước / SĐT | Báo "Đã chép …", dán ra đúng số | |
| 5 | 🔍 Kiểm trùng: nhập CCCD khách đang vay | 🔴 Trùng — đang vay vốn, thẻ ghi rõ khách, món, dư nợ, địa bàn (chi tiết ở cột phải) | |
| 6 | Kiểm trùng: nhập **họ tên vợ/chồng** của 1 khách đang vay | 🟠 Có thể trùng người thừa kế — ghi rõ là vợ/chồng của ai, đang vay gì | |
| 7 | Điện thoại: gõ "nguyen" | 50 dòng + nút Xem thêm 50; bấm khách mở hộp thẻ 1 cột | |

**Ghi chú kỹ thuật 3.94:** Khối "3.94 — TRA CỨU KH GỌN" (trước `tcHaiCot`): `TC_KT` {so, ten}, `TC_SL` (giới hạn dòng điện thoại), `SL_KHMON[mã KH]` = [{ct, ku, dn, nv, md, xong, truong, raTruong}] dựng trong `tcNap` từ Mẫu 31 mới nhất (cùng lúc `SL_PHU`). Hàm: `tcChep(el)` / `tcC(v, ten, hien)` (span `.tc-chep` data-chep), `tcDiaChi`, `tcSdtDat`, `tcHan(c)` (het / sap < 183 ngày / ok), `tcNoiGon`, `slTraHTML` (mới: `.tc394`, `.tc-hang`, details `.tc-kt`), `tcPhim` (↑ ↓ Enter), `tcDongHTML`, `slTraTim` (gõ CCCD → điền `#tc-kt-so` + `tcKTVe`), `tcMonGon`, `tcTheTrung`, `tcMoKH`, `tcUuXa`, `tcKiemTrung2(so, ten)` (g1 CCCD chủ hộ · g2 CCCD HSSV · g3 `SL_PHU` vc trùng `slChuan` trọn tên · g4 cùng tên khác CCCD / HSSV), `tcKTVe` (màn rộng: trái kết luận, phải chi tiết), `tcKiemTrung(so)` giữ tên cũ; `slTheKH(ma)` viết lại (`.tc-the`, `#tc-so`, `#tc-nhan`, `#kh-mon` bảng `.tc-mon`, dòng `tr.tc-hs` dùng `c_ten_hssv`, `c_cmnd_hssv`, `c_ten_truong`, `c_ten_he_dt`, `c_ten_nganh_dt`, `nhapHoc`, `raTruong`, `c_ten_dt_hoc_phi`; món tất toán `#tc-xong` hidden), `tcMoTo(to)`, `slChepKH` thêm vợ/chồng, TK 105, tổ. CSS khối "3.94 — Tra cứu KH gọn". `tests/t100.js` lỗi sẵn từ trước (chờ `#sl-ky .sl-tom` của bố cục cũ) — không thuộc bộ hồi quy.

### Danh sách thử trên máy thật (3.93.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội → **📅 Sau giải ngân (30 ngày)** → tháng T9/2026 → chọn xã | Bảng các tổ có món giải ngân trong tháng (số món, GN trong tháng), "x phiếu Mẫu 06" | |
| 2 | Chọn đến 1 tổ | Hiện từng món (KH, mã KV, CT, GN tháng, tổng GN, tổng dư nợ, ngày GN), bỏ tích 1 món → số món giảm | |
| 3 | 👁 Xem → khai báo ngày / cán bộ / mục đích → Xem | Khung xem trước đủ phiếu; ‹ Sửa khai báo quay lại | |
| 4 | 📄 Word (chọn cả xã) → mở bằng Word | 1 file, mỗi tổ 1 phiếu, mỗi phiếu trang mới, không báo lỗi khi mở | |
| 5 | Chọn từ tháng → đến tháng (khi đã có Mẫu 31 nhiều tháng) + 1 tổ | Mỗi tháng 1 phiếu riêng cho tổ đó | |
| 6 | ⚙ Bảng ngành kinh tế | Ngành nhiều món ở trên, ngành dưới 10 món ẩn, nút Hiện thêm / Thu gọn | |
| 7 | Máy tính: mở thư mục văn bản cũ → copy 1–2 file → về app tab Văn bản bấm **Ctrl+V** | File vào như kéo thả (khay chờ khai / tab Văn bản); dán chữ vào ô tìm vẫn bình thường | |

**Ghi chú kỹ thuật 3.93.1:** `ktCheDo()` (`ktCH().che` 'dx' | 'gn'), `ktDoiCheDo`, `ktCheDoHTML`; `ktVeThe` → `ktGNVe(o)` khi 'gn'. Sau giải ngân: `ktThangHS()` (tháng có hstd), `ktGNKhoang()` (`ktCH().gnTu/gnDen`, ≤ 24 tháng), `ktGNNap()` → `KT_GN` {khoa, thang, thieu, ds[tháng][mã tổ] = {t, mon}} (món gnT > 0, có tổ, ≠ TO_GIA, `ktMaKV` theo tổ), `ktGNTrongPV` (pvLoc với tổ trên cây kỳ đang mở, không có thì xét xã / hội), `ktGNChon()`, `KT_GN_BO` (bỏ tích 'tháng|KU'), `ktGNDsHTML`, `ktGNTich`, `ktGNGiaTri(v)` (gom món theo khách → `ktGiaTri06`), `ktGNKhaiBao`, `ktGNXem` (`KT_GN_XEM`), `ktGNIn` (ghi `D.cauHinh.ktgsGN['tháng|KU'] = ngày`). `ktDocx(mau, gt|[gt])` nhiều phiếu: nối bằng đoạn ngắt trang, đánh lại `wp:docPr id`, bỏ `w14:paraId/textId`; `ktHTML06([…])` ghép thân, `break-before:page`. `ktDongBu(rows)` dòng trống bù theo khung 2,4 cm. Bảng ngành: `KT_NG_HET`, `KT_NG_NGUONG` = 10. `veKTGS` đặt `KT_GN = null`. Dán file: `document.addEventListener('paste')` (trong `khoiDong`, cạnh trình nhận `drop` chung) lấy `clipboardData.files` / `items` kind 'file' → `gioiThieuFile(fs)`; không có file thì để mặc định (dán chữ).

### Danh sách thử trên máy thật (3.93) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu → **🛡 KTGS Hội** → khung 📥 File · 🔍 Kiểm tra → **📥 Nạp nhiều file** chọn BC0437 + BC0438 (.xls 30/09) | Bảng xem trước nhận đúng 2 loại, kỳ T9, cảnh báo 11 dòng lặp / xếp loại tính lại → ✓ Ghi nhận → ma trận ô T9 ✓ | |
| 1a | Bấm **🔍 Kiểm tra tháng T9/2026** | ② chấm điểm khớp; ① lệch dư nợ vài hội; tổ lệch với Mẫu 31 (bấm mở xem từng tổ); đổi / thay file thì tháng hiện ⟳ kiểm lại | |
| 1b | Mẫu 06 → Cột Mục đích **In ngành kinh tế**; ⚙ Bảng ngành kinh tế → sửa 1 tên | Cột mục đích ghi tên ngành rút gọn (vd "Khai thác, cung cấp nước", "Chăn nuôi trâu, bò") hoặc tên anh sửa; Để trống thì trống; dòng cao ≥ 1,2 cm, chữ xuống dòng | |
| 2 | Chọn xã + điểm + hội (không chọn tổ) | Bảng các tổ có Điểm, Xếp loại; dòng BC0438 theo hội | |
| 3 | Chọn 1 tổ → kiểu **Trung hòa** | Gợi ý 6–8 hộ (theo tổ viên), 2 hộ KHĐ + hộ tốt, có lý do; không có hộ QH / khoanh; có HSSV nếu tổ có | |
| 4 | Đổi Hộ tốt / Cần quan tâm, − / + số hộ, tích thêm / bỏ | Danh sách đổi theo; "Tất cả hộ còn dư nợ" để tích tay | |
| 5 | 📄 Mẫu 06 → khai ngày + cán bộ → **Word** → mở bằng Word | Đúng khuôn mẫu gốc; ô không khai giữ dòng chấm; sang trang lặp tiêu đề, dòng cuối + Cộng + nhận xét + ký đi liền | |
| 6 | 📄 Mẫu 06 → **🖨 In / PDF** (điện thoại) | A4 ngang, cùng bố cục | |
| 7 | 📄 Mẫu 16 → Word / In | Mục I đúng số BC0437 (điểm + xếp loại), không ghi tổ phó, "thực tế tại 0x khách hàng", "01 Phiếu" | |
| 8 | Mở lại tổ đã xuất phiếu | Thẻ tổ ghi "kiểm tra gần nhất …"; hộ đã kiểm có dấu ↺ (khi làm ngày khác) | |

**Ghi chú kỹ thuật 3.93:** Loại mới `k37`, `k38` (`nhom:'K'`, `kt:true`, `tuy:true`) — không thuộc `SL_NHOM` nên không lên ma trận; `slTimDau` bỏ loại `kt`; `slPhanTich` gọi `ktDocBC(sheets)` trước `slDocTW` → `ktPhanTich(kq, kt)`; `slTomTat` → `ktTomTat`. BC0437: cột theo `KT_COT37` (tên cột chuẩn hóa), tiền triệu ×1e6 (`KT_TRIEU`), `ktXepLoai(d)` khi `xepLoai` rỗng / '0', bỏ dòng trùng mã tổ; BC0438: 3 phần `phan` = ut / cd / ct (nhận theo hàng tên cột), `tong` = tổng 4 loại khi 0. Tab: `slTab='kt'`, `veKTGS` (toNap → `KT_K` = `TO_K`; `ktNapBC(ky)` chọn BC cùng kỳ / cùng tháng / mới nhất → `KT_BC`; `ktTruocNap` 105 từng khách tháng trước — Mẫu 31 hoặc Mẫu 10 cuối tháng), `ktDauHTML`, `ktNapFile` (slDocFile + slGhi, chỉ nhận k37/k38), `ktVe`, `ktTim`, `ktChonTo`, `PV_DUNG.kt` (khai báo cạnh `PV_DUNG.to` — PV_DUNG định nghĩa sau khối KTGS), `ktCH()` = `D.cauHinh.ktgs`. Bảng: `ktSoTo(t)` (BC0437 hoặc Mẫu 31), `ktBangToHTML`, `ktHoi38`, `ktTheHTML`. Chọn hộ: `ktHo(t)` (món dư nợ > 0; loai = QH/khoanh; moi30 / moi12 theo `ngn||nv`; khd theo `K.B.co.khd` hoặc `ngdg ≤ ns − 3 tháng`; hssv = CT 02; tkOK theo 105 tháng trước; tot / xau / uu), `ktMaKV` (2-4, trùng → 6), `ktSoGoiY`, `ktGoiY(t, kieu, so)` → `KT_CHON` {to, kieu, so, goiY, chon{kh:{ly, bb}}, ds}, `ktDoiKieu`, `ktDoiSo`, `ktGoiYLai`, `ktTich`, `ktDaChon`, `ktChonHTML` (`KT_LOC` goi/tat). Xuất: `ktKhaiBao(mau)` → `KT_KB` (phiên, mặc định trống) → `ktXuat(mau, 'word'|'in')`, `ktGiaTri06` / `ktGiaTri16`, `ktGhiLS` (`D.cauHinh.ktgsLS[mã tổ]`, ≤ 20 lần). Word: `KT_KHUON` (dựng bằng `python3 tools/khuon_docx.py <Mẫu 06.docx> <Mẫu 16.docx>`, dán thay khối `var KT_KHUON`) = {m06:{truoc, dong, dongKN, sau, sect, …}, m16:{than, sect, …}, chung:{mo, styles, theme, header}}; dấu `{{KHOA|chấm}}` / `{{KHOA~|chấm}}` (phần chấm ở run sau), `ktDien` (R3 → `<w:noBreakHyphen/>`), `ktDongCo` (dòng có số: hRule atLeast, chữ 11, canh trái), `ktDocx` (taoZip 11 phần, rId giữ như mẫu). In: `ktHTML06` / `ktHTML16`, `KT_IN_CSS`. CSS khối "3.93 — KTGS". Phép thử `tests/t106.js`. **Nạp + kiểm tra (theo chuẩn tab Nạp):** `ktNapHTML()` (details `.kt-nap`, `D.cauHinh.ktNapMo`; ma trận dùng `slDsKy` + `slOMT` với loại k37/k38; nút `slNapBo` — luồng xem trước chung, `slGhiDaTich` → `veSoLieu` về lại tab kt), `KT_KY_KT` / `ktKyKT()` tháng đang xem kiểm tra (bấm tên tháng), `ktDauKy(ky)` (k37·k38·hstd·khd luc), `ktKTCu`, `ktKTHTML`, `ktKiemTra(ky)` → `SLM.ktg[ky]` = {luc, dau, dem{k, v}, muc[{ten, tt c/k/v/l, ghi, cot, ds ≤ 300}]} — `slChuanMeta` + gộp Drive theo `luc` (cạnh `SLM.kt`). `slDauKy` bỏ loại `kt`. Mục đích: `KT_PNKT` (mã PNKT51 → đề xuất, chỉ từ trong tên gốc), `ktNganh(m)` = `D.cauHinh.ktPnkt[mã]` (anh sửa) → `ktNganhDeXuat(ma, ten)`; `ktNganhHop` / `ktNganhVe` / `ktNganhDs` / `ktNganhSua` (`KT_NG_Q`, `KT_NG_LOC`); `ktDongCo` đặt `trHeight 680 atLeast` (1,2 cm) + canh trái; In: `.kt-bg tbody tr{height:34pt}`, ô nhận xét `td.kt-nx`; `KT_KB.md` ('' | 'nganh', nhớ ở `D.cauHinh.ktMucDich`). `ktNapFile` (nạp riêng bản đầu 3.93) đã bỏ.

### Danh sách thử trên máy thật (3.92) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sao kê → chọn **Nợ đến hạn** · Khổ **Ngang** → 👁 Xem | Mỗi món 1 dòng, có Số KU, Ngày GH, Chuyển QH riêng; khung xem rộng | |
| 2 | Cùng báo cáo · Khổ **Dọc** | Không có Số KU, không Chuyển QH; ngày dd/mm/yy; vẫn 1 dòng (tràn thì bỏ SĐT / co chữ) | |
| 3 | Sao kê kỳ con · Ngang / Dọc | 1 dòng mỗi món; * ở kỳ chưa trả của món vay trước 01/03/2026 | |
| 4 | Tổ TK&VV → chọn xã + điểm (không chọn tổ) | Bảng các tổ + dòng "Vay trực tiếp"; bấm 1 dòng mở tổ | |
| 5 | Chọn 1 tổ | Hiện toàn bộ tổ viên; bấm nút lọc "Đề xuất cho ra", "CCCD hết hạn"; 🖨 In danh sách đang lọc | |
| 6 | ⚙ Ngưỡng tổ viên (vd 5–60) | Tổ ngoài ngưỡng tô đỏ, có cột "Còn nhận" | |
| 7 | Tổng hợp → Kết quả cho vay theo xã → Xem / In | A4 ngang lề 7 mm, tiêu đề 2 tầng, hàng (1)(2)…, triệu đồng 2 số lẻ | |
| 8 | Tra cứu KH (máy tính) → gõ tên → bấm 1 dòng | Chi tiết hiện cột phải (có Hạn CCCD); điện thoại vẫn mở hộp | |

**Ghi chú kỹ thuật 3.92:** In: `SK_KHO` ('ngang'/'doc') đặt trong `skXem` theo `skKhoCua(k)` (mặc định `SK_BC[].kho`, anh đổi lưu `skCH().kho[k]`); `skBang` gọi `dong` 1 lần mỗi dòng, ẩn cột 'Số KU' khi dọc + có cột CT (trùng KH+CT ghi 6 số cuối), cột SĐT gắn `c-sdt`; `skNg` ngày ngắn khi dọc; `skBCDH` / `skBCNOXH` có bộ cột theo khổ (`COT`); `skInTu(le)` sinh đoạn mã tự co (bậc lề → bỏ .c-sdt → cỡ chữ), `SK_IN_TU = skInTu()`, tổng hợp `skInTu('7mm')`; `toHTMLIn` cũng tự co. Sao kê: `SK_NHOM`, `skChon`, `skChonBC`, `skDoiKho`, lớp `.sk-thanh` / `.sk-luoi`; xem trước `#hop-in.xem-rong`. Vay trực tiếp: `TO_GIA` ('0000000' bỏ khỏi cây), `toGanTrucTiep(K, Bm)` (khóa điểm `xã|ngày GD`, mã `TT<xã>_<điểm>`, `trucTiep:true`, `dv:'99'`), `toMaCua(o)` (o.to hoặc o._tt) dùng ở `skTrongPV`, `skBang`, tổng hợp lọc sâu. Tổ: `toTV`, `TO_LOC` (+`TO_LOC_MO`), `toCCCDHan(so, ns, ncap)`, `toTheHTML`, `toDsTVHTML`, `toBCDS` / `toInDS` / `toExcelDS`, `toBangToHTML` (+ `toTruocNap` Mẫu 31 tháng trước), `toNguong` / `toDatNguong` (`D.cauHinh.toNguong`). Tổng hợp: `thBang2` cột "Nhóm|Cột" → 2 tầng + hàng số cột, `thAoa2` thay "|" bằng " — ", `tr = dong = thTr(v, 2)`. Tra cứu: `.tc-2cot`, `tcHaiCot`, `tcChonDong`, `slTheKH` vẽ vào `#tc-ct` khi màn rộng.

### Danh sách thử trên máy thật (3.91.1)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 3 | Tổ TK&VV → 1 tổ → Danh sách hộ vay | Không còn KU đã tất toán; khách tất toán hết vẫn có dòng mã KH + 105 ("không còn món vay") | |
| 2 | Tra cứu KH → gõ 1 CCCD chưa có | ✅ "Không trùng … **Chưa vay vốn**, có thể nhập máy" | |
| 1 | Số liệu → Đang kiểm tra: chọn **T10/2026** (chưa nạp file) | Báo "chưa có file Ⓐ / Ⓑ nào — chưa kiểm", không hiện "2 đạt · 1 lệch"; bấm Kiểm tra → báo, không chạy | |

**Ghi chú kỹ thuật 3.91.1:** `toBCDanhSach` lọc món `daTT` (CLOSE hoặc dư nợ 0, không QH, không lãi tồn); khách vẫn giữ dòng. `slCoFileChinh(ky)` (có file nhóm A / B); `slKTHTML`, `slKiemTra`, `slKTDauHTML` dùng để bỏ qua kết quả cũ của tháng trống (`SLM.kt` cũ vẫn giữ, chỉ ẩn).

### Danh sách thử trên máy thật (3.91) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📑 Sao kê → Nợ đến hạn → **Tháng sau** → Xem | 3 khung ① ② ③; T10/2026 (số T9): 117 món = 15 · 54 · 48; cột Mã KH, SĐT, NV, Lãi tồn, Số dư 105; chú thích chương trình cuối trang | |
| 2 | Nút **Đến hết năm** → Xem | 630 món; có bảng tóm tắt theo tháng + theo xã | |
| 3 | In / Lưu PDF nợ đến hạn | A4 dọc, không tràn (lề tự thu 1,5 cm nếu cần) | |
| 3b | Số liệu → nạp file **Nợ đến hạn phân kỳ** → Sao kê → tích **Sao kê nợ đến hạn kỳ con** → Xem / In | 1.910 món (NOXH 19 · trực tiếp 9 · ủy thác mới 1.882); ① 10 món / 102.181.715; ② đến 31/12: 7 món / 81.800.000; ③ gom theo CT; in A4 ngang | |
| 3c | Sao kê → tích **Danh sách nợ gốc đến hạn phân kỳ theo tổ** · từ 01/10 đến 31/10 | Chia theo tổ, có Hạn nộp 08/TD; kỳ trước chưa trả tô nền | |
| 3d | Scan: bản tài liệu quét ở điện thoại, mở ở máy tính → đổi tên → ☁ Đồng bộ | Hết "Chưa lên Drive" / "không có trang"; file trên Drive đổi tên theo | |
| 4 | Số liệu → nút **T9/2026 ▾** | Lưới 12 tháng chữ Việt, ✓ / 🔒 | |
| 5 | Ma trận: bấm dòng Ⓐ / Ⓒ / Ⓓ | Sổ ra / thu gọn; thu gọn thấy chip 7/7 ✓ | |
| 6 | Tháng 9 đủ file + đã kiểm → 🔒 Chốt tháng (tích đã xem) | Bước 4 "Đã chốt"; ô tím 🔒; thử thay / xóa / nạp đè → báo đã chốt | |
| 7 | 🔓 Mở khóa | Có xác nhận; mở xong nạp / thay được | |
| 8 | Máy tính màn rộng / iPhone | 2 cột / 2 khung vuốt ngang | |
| 9 | Các báo cáo khác (Tổ, Sao kê, Tổng hợp) | Chương trình ghi GQVL, NSVSMT, HSSVSTEM…; dòng chú thích cuối | |

**Ghi chú kỹ thuật 3.91:** Viết tắt: `CT_VT`, `CT_VT_TEN`, `ctNgan(ma, o)` (o.c_ma_quyet_dinh 43 → HSSVSTEM), `CT_DUNG` gom khi lập từng báo cáo (`toXem` / `skXem` / `thXem`) → `x.ctChu = ctChuThich()` → `bcCT(x)` + dòng Excel. Nợ đến hạn: `skBCDH(rows, lapKH, M, e31, ngay)` (`skHL` = ĐH gia hạn || HĐ, `skNhomDH(o, tu, den, ns)`: 1 = hl ≤ ns < gd ≥ tu · 2 = hl trong kỳ và (gd ≤ den hoặc chưa có gd) · 3 = hl trong kỳ, gd > den; `skConGH`), `skDatNgay('thang'|'quy'|'nam')`; `skBang` nhận ô `{h, lop}` (HTML tự dựng); in sao kê `SK_IN_TU` (đo `.trang` rộng 160 mm → 180 mm + `@page{margin:15mm}` → chữ 8,5 pt). Chốt: `SLM.chot[tháng]` = {khoa, luc, may, ban, dem, dau, lech[], truoc} / mở khóa {khoa:false, moLuc, chotCu}; gộp Drive theo `luc`; `slChot(ky)`, `slDatChot`, `slKTDauHTML`, `slChotHop`, `slChotGhi`, `slMoKhoaHop`, `slMoKhoa`, `slKhoaBao`; chặn ở `slGhi` (reject), `slXoa`, `slXoaThang`, `slThayO`, `slNapMot`, `slDoiNgay`, `slTrangThai`, `slGhiDaTich`, `slMoO`, `slOMT` (ô `.khoa`); `slLamMoi` xóa cả `SLM.chot`. Ma trận: `slNhomMo` / `slMoNhom` (`D.cauHinh.slMo`), `slChipNhom(N, dsL, k)`. Tháng: `slChonThangHop(nam)`, `slChonThang` dời `SL_LECH`. Bố cục: `.sl-hai` (2 cột ≥ 1100 px, vuốt < 900 px), `slKhung(i)`, `slKhungCuon`. Phân kỳ: loại `pk` (nhóm D, `ngay:true`, trường `pkNgay/pkTien/pkDa/pkCon/pkTK/pkTong`, bí danh viết liền `soku/makh/tenkh/sodt/ngaybc`); `skPKNap(ns)` → `SK_PK` {ky, ngay, han, theoKU} (skXem chờ nạp khi tích noxh / pkto); `SK_PK_MOC` = 2026-03-01; `skPKLoai` (noxh · tt · moi; HSSV STEM = CT 02 + QĐ 43 loại ra), `skKhongCQH`, `skPKGhi`, `skNOXHChua` (đã trả = max(Gốc đã trả, GN − DN)), `skPKLich(o, ns, tu)` (P = 6 NOXH / 12 trực tiếp / 0 ủy thác mới → chỉ kỳ đầu), `skPKKy` (toiTien null = cần file), `skHan08` (lùi 3 ngày làm việc), `skPKTinh`, `skBCNOXH` (③ > 40 món gom theo CT), `skBCPKTo` (theo tổ, dùng `skBang`); chip nhóm Ⓓ đếm cả loại theo ngày. Scan: `dayMotScan` dựng PDF lỗi mà có driveId → `dayMetaScan`; `scanCanDay` / `dayScanNhieu` nhận bản chỉ có driveId. In ngang: báo cáo trả `ngang:true` → `.trang.ngang` + `SK_IN_NGANG` (`@page ngang{size:A4 landscape}`). Phép thử `t105.js` thêm phần 3.91.

### Danh sách thử trên máy thật (3.90.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở Số liệu (điện thoại + máy tính) | Dòng ① gọn 1 dòng; ma trận mỗi loại 1 dòng, chấm A/B/C/D, không có dòng tiêu đề nhóm, thấy hết các dòng | |
| 2 | Bấm tên file thiếu ở dòng ① | Mở hộp nạp đúng loại, đúng tháng | |
| 3 | Kiểm tra tháng 9 | Bảng đối chiếu chéo: xanh / đỏ / vàng; bấm chip từng xã đổi bảng; bấm ô đỏ / vàng ra chi tiết; "✅ n mục đạt" gom 1 dòng; số nhóm liền | |
| 4 | Bấm Kiểm tra ở tháng chưa nạp file | Báo "chưa có file nào", không chạy | |
| 5 | Bấm ô ✓ → ⬇ Tải file gốc; dòng ① → ⬇ Tải file gốc cả tháng | Tải về đúng file Excel gốc (tên như lúc nạp); file chỉ còn trên Drive thì cần nối Drive | |
| 6 | Quản lý dữ liệu Số liệu → 🧹 Tìm file rác | Danh sách (hoặc "không có file rác"), tích → Xóa; văn bản / hồ sơ không bị đụng | |

**Ghi chú kỹ thuật 3.90.1:** `veSoLieu` mới: `slTTHTML(ky)` (dòng ①, thay `slBuocHTML` + `slFileThangHTML` đã bỏ) → ma trận (`.sl-mt-cuon`, tên ngắn `L.ten.split(' · ')[0]`, `.sl-nh`, `slNgan` số ngắn trong ô) → `#sl-kt` (`slKTHTML`) → `details.sl-tq` = tóm tắt chi tiết (`slKyHTML`, chỉ dựng khi mở; `D.cauHinh.slTQ`) → Quản lý dữ liệu. Kiểm tra: tháng không có ô nào thì `slKiemTra` báo và thôi; `SLM.kt[ky].dc = slDCTinh(B, M10)` = {thu, nhan, v[phạm vi][chỉ tiêu][nguồn], tt[…] = [c/k/l/v, ghi]} (chuẩn BCDHTD, tiền gửi LEN_31; cho vay LEN_31 / B32 cộng đảo khoản Mẫu 31; B32 thu nợ = thu nợ − cho vay); `slDCHTML(ky)`, `SL_DC_PV` (phạm vi đang xem), `slDCChi(ky, f, ng)` → mục kiểm tra theo `DC_MUC` (lọc dòng theo xã); `slKTMuc(x, loc, mo)`; mục đạt gom 1 `details`. Tải gốc: `slLayGoc(e)` (IDB `sl_g_…` → Drive `e.goc`), `slTaiGoc`, `slTaiGocThang` (cách nhau 0,7 giây). Rác: `slTimRac` (ô loại `bo` · IDB `sl_b_` / `sl_g_` không có ô hoặc file gốc đã lên Drive · Drive `Số liệu/` + `_Hệ thống/so_lieu/` không phải `e.goc` / `e.dl` / meta.json / khach_hang.json), `slKhoaIDB` (getAllKeys + `khoTam`), `slDSDrive`, `SL_RAC`, `slXoaRac`. Phép thử: `t105.js` thêm bảng đối chiếu, ô đỏ → chi tiết, tháng trống, tải gốc, file rác; `t102.js` đổi chọn phần tử theo màn mới.

### Danh sách thử trên máy thật (3.90) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Anh đã xóa tay dữ liệu cũ → 📥 Nạp nhiều file: chọn cả bộ tháng 9 (7 file TW + Mẫu 31 + Thông tin tổ trưởng + KHĐ mẫu 14 + Mẫu 10) | Bảng xem trước nhận đúng 11 loại, kỳ T9/2026 (Mẫu 10 ngày 30/09); file KTNB nếu kéo vào → báo "dùng file mẫu 14" | |
| 2 | Nạp 1 loại nhiều tháng (vd 3 file BCDHTD 01.1 của 31/12/2025, T8, T9) | Mỗi file vào đúng ô tháng của nó | |
| 3 | ① File tháng | Nhóm Ⓐ 7/7 · Ⓑ 3/3 · Ⓒ · Ⓓ; ô thiếu báo đỏ; dưới cùng có 🗑 Xóa cả bộ tháng | |
| 4 | ② 🔍 Kiểm tra tháng 9 | Nhóm "Số chuẩn TW khớp nhau" và "Mẫu 31 ↔ số chuẩn TW" toàn ✅ (trừ các ⓘ lưu ý: thu nợ LEN_31, tiền gửi); bấm mục mở bảng chi tiết | |
| 5 | Bấm 1 ô → 🔁 Thay file bằng file khác tháng | Báo "File này là số liệu …, không phải ô … — không thay" | |
| 6 | 📊 Tổng hợp: tích hết 9 báo cáo → Xem → In / Lưu PDF | A4 ngang, lề 2/2/3/2 cm, có số trang, cuối mỗi báo cáo "PGD NHCSXH GÒ DẦU"; số theo xã = BCDHTD | |
| 7 | Tổng hợp: chọn 1 xã → 1 điểm GD → chương trình → Xem | Báo cáo theo xã ghi "chỉ chia đến xã"; báo cáo Lọc sâu (tham khảo) có dòng ✅ / ⚠ đối chiếu số chuẩn | |
| 8 | Tổ TK&VV: chọn 1 tổ | Thẻ tổ có thêm "LEN_31 (chuẩn TW)", tiền gửi, cho vay · thu nợ tháng | |
| 9 | In báo cáo tổ / sao kê | Lề mới, có "PGD NHCSXH GÒ DẦU" cuối báo cáo; Nợ cần xử lý vẫn 1 trang (nhiều món thì chữ nhỏ lại) | |
| 10 | (khi có) Nạp Mẫu 31 hoặc LEN_31 xuất giữa tháng (vd ngày 15) | Vào chip ngày 15 của tháng, không đè ô tháng; ô ma trận ghi "+ 1 ngày". **Anh gửi em 1 file giữa tháng** để kiểm cách tính doanh số trong tháng | |
| 11 | 🧹 Quản lý dữ liệu → ♻ Làm mới toàn bộ (chỉ khi cần) | Phải gõ XOA + xác nhận lần 2; chỉ mất phần Số liệu | |

**Ghi chú kỹ thuật 3.90:** `SL_LOAI` thêm `nhom` (A/B/C/D/X), `tw` (biểu TW), `tuy` (kỳ tháng nếu ngày cuối tháng, khác thì kỳ ngày — `bx bc b32 lx lh lc lt hstd`), `bo` (lý do đã bỏ — `kh kttk khd08`); `SL_NHOM`; `slTuy`, `slChonNgay` (ô nhập là ngày), `slKyTu(L, ngay)`, `slKyHopLe` nhận cả 2 dạng với loại `tuy`; `slGhi` chuẩn hóa kỳ loại `tuy`; `slCacNgay` chỉ lấy kỳ ngày; `slTimDau` bỏ loại `tw`. Biểu TW: `slDocTW(sheets, tenFile)` (hàng mốc `twMoc`, ngày `twNgay`, cột `TW_COT.bc` / `.len`, `TW_DEM`, B32 cặp mốc hộ / tiền + tên nhóm ở hàng tên cột, dòng mục I–IV + nguồn TW / ĐP + PGD / xã; LEN: STT chữ = xã, số = hội / tổ / CT, trống = xã / hội của CHTRINH, `twHoi`), `slPhanTichTW`, `slTongTW`, `slTomTatTW`; dòng lưu: BCDHTD {cap xa/ct/tong, cvT cvN tnT tnN xoaT xoaN dn th qh kn ngan trung dai khDn sluot}, B32 {phan cv/tn/dn/qh, nguon TW/ĐP, cap pgd/xa, ten, nhom, ho, tien}, LEN {cap xa/hoi/ct/to/tong, xa, dv, ten, soTo ho dn th qh kn tg cv tn tl ttk ctk}; tiền lưu **đồng**. Ghép tổ: `twGhepTo(dòng LEN, T)` (2 lượt: tên đủ → tên LEN là phần đầu; trùng thì theo dư nợ, không thì cả nhóm nếu tổng dư nợ bằng), `twToTu`. Gom Mẫu 31 kiểu BCDHTD: `twTinh31(rows, lap, khoa)` (cột năm `c_giai_ngan_nam`, `c_dao_khoan_gn_nam`, `c_thu_no_*_nam`, `c_xoa_trong_nam` qua `slSo`). Kiểm tra: `SL_KT_NHOM` thêm 7, 8 (giữ số cũ), `SL_KT_THU` thứ tự hiện, `slKTTW(ky, B, them)`; bỏ phép so Mẫu 7. Nạp: `slOMT` (ô ma trận), `slFileThangHTML` / `slBuocHTML` theo nhóm, `slThayO`, `slXoaCacO`, `slXoaThang`, `slLamMoi` / `slLamMoiGhi`, `slCoDL`. Tổng hợp: `slTab='th'`, `TH_BC`, `thCH` (`D.cauHinh.thTK` {ky, xa, diem, hoi, to, bc, ct, nguon}), `PV_DUNG.th`, `thDsKy`, `thNap` (`TH_K` = {ky, B, K, hs, G}), `veTongHop`, `thBaoCao(k)`, `thBang2` / `thAoa2` (ô `{dem:n}` = số đếm), `thToTrongPV`, `thDiemCua`, `thXem`, `thHTMLIn`, `thIn`, `thExcel`. In: `TO_IN_CSS` lề 20/20/20/30 mm + `@bottom-right` số trang, `bcCSS(ngang)`, `bcKy()` / `BC_KY`. Thẻ tổ: `toNap` gắn `t.len`, `t.lenGop`; `toDsKy` có Mẫu 31 theo ngày; `slBo` ưu tiên Mẫu 31 hơn Mẫu 10 cùng ngày. Phép thử `tests/t105.js` (dựng 7 file TW giả từ Mẫu 31 giả); `t101.js` sửa: Mẫu 7 nay báo đã bỏ.

### Danh sách thử trên máy thật (3.89) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH: gõ CCCD một khách đang vay | ⚠ Trùng — đang dây vốn, có tên, xã · ấp · tổ | |
| 2 | Gõ một CCCD chưa có | ✅ Không trùng — chưa dây vốn, có thể nhập máy (ghi ngày số liệu) | |
| 3 | Gõ CMND của một HSSV (cần Mẫu 31) | ⚠ "HSSV của …", món, dư nợ | |
| 4 | Gõ tên (vd tên vợ/chồng của một khách) | Ra cả dòng 👫 vợ/chồng, 🎓 HSSV; mỗi dòng có xã · ấp · tổ; không còn ra khách chỉ vì tên tổ trưởng trùng | |
| 5 | 📍 Phạm vi tìm: chọn 1 xã | Kết quả chỉ trong xã đó | |
| 6 | 📑 Sao kê: chọn xã → tích 8 báo cáo → Xem → In / Excel | Mỗi báo cáo 1 trang riêng, chia theo tổ có dòng cộng; SĐT tô nền số trống / ghi chú không đạt; nợ đến hạn có ngày GDXA, hợp đồng, còn được gia hạn | |
| 7 | Sao kê theo 1 tổ | Không chia nhóm, ghi "Phạm vi: … · Tổ …" | |
| 8 | Điện thoại: hàng tab con Số liệu | 4 tab trên 1 hàng, vuốt ngang; tab đang mở luôn thấy | |
| 9 | (3.88.1) Tổ TK&VV trên điện thoại | Cây có xã / tổ; nếu chưa có bảng: cảnh báo + ☁ Nối Drive và tải | |

**Ghi chú kỹ thuật 3.89:** Bộ chọn chung: `PV_CAP`, `PV_DUNG[p]` = {S: trạng thái, K: bộ số liệu, sau, toBatBuoc} với p = 'to' / 'tc' / 'sk'; `pvLuaChon(T, S, cap)`, `pvCha`, `pvVeCay(p)` (vẽ vào `#<p>-cay.pv-cay`, chip ≤ 18 / ≤ 6, bấm lại chip = bỏ), `pvChon(p, cap, v, chip)`, `pvLoc(S, tổ)`, `pvChu(S, K)`; phím chung nhận `.pv-cay` (`sgO`, `sgSang`, `sgPhim`); tab Tổ dùng `pvVeCay('to')` (bỏ `toLuaChon` / `TO_CAP` / `toChon`). Bộ số liệu nhiều kỳ: `TO_KS[ky]` (giữ 3), `TO_K` = bộ của tab Tổ. Tra cứu: `tcCH` (`D.cauHinh.tcPV`), `TC_K`, `tcNap` (cây + `SL_PHU` = vợ/chồng `voChong`, HSSV `c_ten_hssv` / `c_cmnd_hssv` từ Mẫu 31 mới nhất `slMau31Moi`, `SL_PHU_KY`), `tcKiemTrung(so)`, `tcTinhTrang`, `tcNoiO`, `tcTrongPV`; `slTraTim` viết lại (tên chỉ khớp `r.ten`, tối đa 300 dòng mỗi nhóm). Sao kê: `slTab='sk'`, `SK_BC`, `skCH` (`D.cauHinh.skTK` {ky, xa, diem, hoi, to, bc, tu, den}), `SK_K`, `veSaoKe`, `skBang(cot, ds, dong, so, lop)` (chia theo tổ khi phạm vi chưa đến tổ, dòng cộng tổ + tổng), `skBaoCao(k)`, `skMau31`, `skCan31`, `skSoThang` (ngày/30,4375), `skXem`, `skHTMLIn` (dùng `TO_IN_CSS`), `skIn`, `skExcel` (mỗi báo cáo 1 sheet). Còn được gia hạn (anh chốt): tính theo ngày — T = ngày vay → ĐH hợp đồng (đến hạn đầu tiên), đã dùng = max(ĐH gia hạn − ĐH HĐ, `c_so_thang_da_gh` × 30,44), còn = ⌊T/2⌋ − đã dùng, hiện "Còn n tháng (d ngày)"; ⚠ khi (`c_so_thang_da_gh` > 0) ≠ (chênh > 0) hoặc `ghT` > 0 mà G = 0. `.sl-con` cuộn ngang + tự cuộn tới tab `.bat`. Phép thử `tests/t104.js`.

### Danh sách thử trên máy thật (3.88.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › 👥 Tổ TK&VV trên máy đang báo cây trống | Cây có xã / điểm / hội / tổ; nếu máy chưa có bảng thì có cảnh báo vàng + nút ☁ Nối Drive và tải → bấm, đăng nhập → cảnh báo mất, xem được báo cáo | |

**Ghi chú kỹ thuật 3.88.1:** `toNap` đặt `K.thieuBang` (có ô số liệu trong chỉ mục nhưng bảng không mở được) → dựng cây từ `SL_DB.kh` / `SL_DB.to`; `toVe` hiện cảnh báo + `toNoiDrive` (`noiDrive(false)` rồi `toThuLai`), `toThuLai` (xóa `TO_K`, `SL_BO`); `veToTK` có `.catch`; `toXem` chặn khi `thieuBang`. Phép thử `tests/t103.js`.

### Danh sách thử trên máy thật (3.88) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab 📈 Số liệu: chọn T8/2026 | ① liệt kê từng loại file, ✗ loại chưa nạp kèm nút + Nạp; Mẫu 10 hiện chip "31/08" | |
| 2 | Bấm 🔍 Kiểm tra tháng | Ra các nhóm 1–6; mục lệch bấm mở bảng chi tiết (vd Mẫu 7 so từng tổ: 16 tổ lệch dư nợ); tải lại trang vẫn còn kết quả, không chạy lại | |
| 3 | Nạp / thay 1 file của tháng đã kiểm | Hiện "dữ liệu đã đổi — kiểm lại", bước ② vàng | |
| 4 | Thu gọn "📊 Tổng quan nhiều tháng", mở lại app | Vẫn thu gọn | |
| 5 | Tab Số liệu › tab con 👥 Tổ TK&VV: chọn bằng phím (Tab / Enter / ↑ ↓) và bằng chip; thử Enter ở ô Xã trống | Ô cha trống thì báo, không sang ô kế; chọn đủ 4 cấp ra thẻ tổ | |
| 6 | Gõ tên tổ trưởng ở ô tìm tổ | Ra gợi ý, bấm là chọn đủ cây | |
| 7 | Tích 3 báo cáo → Xem → In / PDF, Excel | A4 dọc; Danh sách hộ vay đúng cột, sắp theo mã KH; Nợ cần xử lý 1 trang 3 khung; TK 105 (cần Mẫu 31) có mục A, B | |

**Ghi chú kỹ thuật 3.88:** Tổ TK&VV là **tab con thứ 3 của Số liệu** (`D.cauHinh.slTab = 'to'`, `slTabConHTML`, `veSoLieu` → `veToTK` vẽ vào `tr7`; anh chốt: nằm cạnh Tra cứu KH, không phải tab chính). Tổ: `TO_K` (bộ số liệu đã nạp: `hs`, `lap`, `B` bộ tháng, `to` {mã tổ → thông tin}, `kh` {mã tổ → dòng}), `toNap` (Mẫu 31 hoặc Mẫu 10 + Thông tin tổ trưởng / Mẫu 7; thiếu điểm GD thì lấy tt / kttk tháng gần nhất), `toDien`, `D.cauHinh.toTK` {ky, xa, diem, hoi, to, bc}, `toDsKy`, `toVe`, `toLuaChon`, `TO_CAP`, `toVeCay` (ô chọn + chip khi ≤ 18 lựa chọn máy tính / ≤ 6 điện thoại; tự chọn cấp 1 lựa chọn), `toChon`, `toChonTo`, `toTim`, `toVeThe`, `toDiaChi`, `toKhach` (gom theo khách; 105 = max kể cả dòng lặp), `toChiTieu`. Báo cáo: `TO_BC`, `toBaoCao` → `toBCDanhSach`, `toBCNo` (`coChu` thu nhỏ chữ theo số dòng), `toBCTK105` (Promise; Mẫu 31 tháng này + tháng trước); mỗi báo cáo trả {ten, tieuDe, ngay, html, aoa}; `toXem` (iframe `srcdoc` = đúng bản in), `toHTMLIn` + `TO_IN_CSS` (A4 dọc), `toIn` (`inBlob`), `toExcel` (mỗi báo cáo 1 sheet, `taiXuongBlob`). `CT_NGAN` + `ctNgan`, `laiTon` (Mẫu 10: Lãi tồn; Mẫu 31: TH + QH). Phím chung: `sgO(t)` nhận ô trong `#to-cay`, `sgPhim` gồm `#to-cay`, Ctrl+Enter chỉ trong `#hop-in`, `SG_CAY` thêm to-xa / to-diem / to-hoi. Số liệu: `veSoLieu` viết lại (tháng `SL_KY`, `slChonThang`), `SL_BAT_BUOC`, `slBuocHTML`, `slFileThangHTML`, `slKTHTML`, `slKiemTra(ky)` → `SLM.kt[ky]` = {luc, ban, dau, kq[{nhom, ten, kq ok/lech/canh/bo, chu, chi, cot, ds ≤ 200, n}], dem}, `slDauKy` (dấu vân tay: `luc` các file tháng + Mẫu 10 cuối tháng + Mẫu 31 tháng trước), `slKTCu`, `SL_KT_NHOM`; `slChuanMeta` / `slGopMeta` thêm `kt` (lần kiểm sau thắng); `slKyHTML` bỏ phần đối chiếu (đã vào Kiểm tra); bảng nhiều tháng trong `details.sl-tq` (`D.cauHinh.slTQ`). CSS khối 3.88 (`.to-*`, `.sl-buoc`, `.sl-ft*`, `.sl-kt*`, `.sl-tq`, `.sl-phu`). Phép thử `tests/t102.js` (bộ `gia31`, máy tính + điện thoại); `t97` / `t100` / `t101` đọc đối chiếu qua `slDoiChieu`.

### Danh sách thử trên máy thật (3.87) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app (máy đã nạp Mẫu 10 ở bản 3.86) → tab 📈 Số liệu | Báo "đã chuyển n bản Mẫu 10…"; dòng **Mẫu 10 · Sao kê chi tiết (theo ngày)** ô T8 ghi "1 ngày · mới 31/08"; dòng Mẫu 31 trống; tóm tắt có cảnh báo "nạp ở bản cũ… nạp lại file" nếu file có khách nhiều sổ | |
| 2 | Nạp lại file Mẫu 10 ngày 31/08 (Nạp cả bộ hoặc bấm ô → Nạp ngày khác) | Xem trước: loại Mẫu 10, ô **ngày** 31/08/2026 "theo tên file", báo "n dòng lặp khế ước… giữ nguyên"; ghi nhận → TK 105 = 62.930.852.589, "149 KH có từ 2 sổ 105", dư nợ không cộng trùng | |
| 3 | Nạp file Mẫu 7 (QUERY…02092026…31-08-2026) | Nhận "Mẫu 7 · Kiểm tra Tổ TK&VV", kỳ T8/2026 theo cột Ngày dữ liệu; cảnh báo "xuất ngày 02/09/2026, sau ngày số liệu" | |
| 4 | Nạp Mẫu 31 tháng 8 (và 9) | Vào dòng **Mẫu 31** (không vào Mẫu 10); đối chiếu ghi "Mẫu 31" | |
| 5 | Ô Mẫu 10 → danh sách ngày → mở 1 ngày → 📅 Đổi ngày | Đổi được ngày, dữ liệu giữ nguyên; trùng ngày đã có thì báo | |
| 6 | 👤 Tra cứu KH: khách có 2 sổ | Thẻ ghi "TK 105 (nhiều sổ)" kèm các số sổ, số dư 105 một lần; dòng "theo số liệu ngày 31/08/2026" | |
| 7 | Máy thứ 2 nối Drive | Có dòng Mẫu 10 ngày 31/08, mở được; Drive: `_Hệ thống/so_lieu/2026-08/m10_2026-08-31.json.gz` | |

**Ghi chú kỹ thuật 3.87:** `SL_LOAI`: hstd chỉ còn chữ ký Mẫu 31; loại mới `m10` (Mẫu 10, `ngay:true`, `khong:['tinh trang mon vay']`), `kttk` (Mẫu 7, khóa `to`); `kh` thêm `ngay:true`. Kỳ loại theo ngày = `yyyy-mm-dd` (khóa `m10|2026-08-31`, IDB `sl_b_m10_2026-08-31`), theo tháng = `yyyy-mm`. Tiện ích: `slLaNgay`, `slLaHS` (hstd/m10), `slThang`, `slKyChu`, `slThuTu` (so cũ/mới, cùng ngày Mẫu 31 thắng), `slKyHopLe`, `slNgayMacDinh`, `slCacNgay`, `slHSMoi`. Dòng lặp khế ước: `slLayDong` trả `lap` (không gộp), lưu `b.lap` (`slMoLap`), `slTong(loai, rows, lap)` tính `t105` = max mỗi KH, `khNhieuSo`, `lap`; danh bạ `slVaoDanhBa(loai, ky, rows, lap)` gom sổ ở cả dòng lặp, 105 = max; giữ SĐT / CCCD… đã biết khi file mới thiếu cột. `slNgayXuat` (ngày lớn nhất trong tên file > ngày số liệu) → `e.ngayXuat`; `e.ban` = bản app lúc nạp (thiếu → dữ liệu bản cũ). Chuyển dữ liệu: `slDoiKhoa(loaiCu, kyCu, loaiMoi, kyMoi, them)` (dời IDB + chỉ mục, dấu `xoa` khóa cũ, đẩy lại dữ liệu đọc nhanh theo tên mới, bản cũ vào `cuDl`), `slChuyenMau10` (hstd không có `tong.gnT` → m10; gọi sau `slNap` và `slTaiTuDrive`). Drive: thư mục theo tháng `slThang(e.ky)`, tên dữ liệu `m10_<ngày>.json.gz`; `slDay` chỉ đẩy dữ liệu khi chưa có `e.dl`. Giao diện: ô loại theo ngày (`slMoNgay`, `slDoiNgay`, `slDoiNgayGhi`), `slTomDong` (một dòng tóm tắt, dùng cho kỳ / ngày / hộp ô), `SL_BO_CHU`, ô kỳ `date` ở xem trước và nạp từng file (`slNapMotLoai`, `slDoiKy`, `slKiemMot`, `slGhiMot`). `slBo(tháng)` không có Mẫu 31 → lấy Mẫu 10 ngày cuối tháng (`B.hsTen`), `slDoiChieu` ghi tên nguồn. `SL_TRUONG`: dn thêm 'du no' (đứng sau 'tong du no'), nbc thêm 'ngay du lieu', tenDiem thêm 'ten diem giao dich', trường Mẫu 7 `stv stvDn stv105 stvKNL stvKGT tlQH tlKN tgbq diemTo xepLoai`. Phép thử `tests/t101.js` (dữ liệu giả dựng trong trang; tham số = đường dẫn index.html bản 3.86 để thử chuyển dữ liệu + Drive giả).

### Danh sách thử trên máy thật (3.86) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📥 Nạp số liệu › Nạp cả bộ T8 (hoặc T9) với **Mẫu 31** thay Mẫu 10 | Mẫu 31 vào ô **Hồ sơ tín dụng chi tiết** (không vào KHĐ); kỳ theo "Ngày số liệu"; báo "dòng trùng khế ước (đã gộp)"; đọc khoảng 25–40 giây trên máy tính | |
| 2 | Tóm tắt kỳ | Món đang vay / đã tất toán / khách chỉ gửi TK; giải ngân, thu nợ tháng đúng số hệ thống | |
| 3 | Đối chiếu (khi có 2 tháng Mẫu 31 liền nhau) | Dư nợ tháng trước + phát sinh = dư nợ tháng này ✅ | |
| 4 | 👤 Tra cứu KH: gõ SĐT, số khế ước đã tất toán, tên không dấu | Ra đúng khách; thẻ có SĐT, vợ/chồng; món ghi đến hạn, lãi suất, "đã tất toán"; món XKLĐ T9 hiện thông tin lao động | |
| 5 | Ô tìm chung khi đang ở tab Số liệu | Không ra khách hàng; ra "Tìm ở tab khác" kèm số kết quả, bấm sang đúng tab | |

**Ghi chú kỹ thuật 3.86:** `SL_LOAI` hstd thêm `cac` (chữ ký Mẫu 31: Số khế ước + Mã KH + Tình trạng món vay + Tổng dư nợ), `khoaPhu:'kh'` (dòng chỉ có KH), `giuHet:true` (giữ mọi cột: `slLayDong` thêm trường `c_<tên>` vào `kq.them`, kiểu số / chữ dò theo dữ liệu, `slNen.them` khi nén); khd / nqh / nk thêm `khong:['tinh trang mon vay']`; `slKhopLoai` nhận `cac`. Gộp khế ước trùng trong `slLayDong` (`bo.trung`). `SL_TRUONG` thêm bí danh Mẫu 31 + trường `ttMon ls thoiHan mucVay voChong danToc ngdg gnT dkT tnTH tnQH tnK xoaT`. `SL_XLSX_CH` (dense, bỏ định dạng). `slTong` hstd: `mon tatToan chiTK gnT…`. Danh bạ thêm `sdt voChong danToc ku[]` (mọi khế ước, kể cả kỳ cũ); `slTimKH` tìm SĐT, khế ước. Tab con: `D.cauHinh.slTab` ('nap' / 'tra'), `slDoiTab`, `slTabConHTML`, `slTraHTML`, `slTraTim` (`SL_TRA_Q`). Ô tìm chung: `veGoiY` bỏ nhóm KH, tab 7 dùng `slNhayTabHTML`. Phép thử `tests/t100.js` (bộ giả `taogia.py 25000 tests/gia31 m31`: 2 tháng Mẫu 31, trùng khế ước, món tất toán, khách chỉ gửi TK, món XKLĐ).

### Danh sách thử trên máy thật (3.85) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab 📈 Số liệu › 📥 Nạp cả bộ — chọn đủ bộ T8 (HS tín dụng chi tiết 20 MB, KHĐ, Nợ QH, Nợ khoanh, Tổng dư nợ, Tổ trưởng) | Màn hình không treo; bảng xem trước đúng loại, kỳ 08/2026, số dòng lấy / bỏ, tổng | |
| 2 | Ghi nhận | Ô T8 đủ ✓; tóm tắt kỳ; đối chiếu: tổng dư nợ, QH, khoanh khớp; món QH / khoanh / KHĐ tìm thấy trong HS tín dụng; báo thôn 54003520 | |
| 3 | 📄 Nạp từng file: chọn sai loại (vd file Nợ khoanh mà chọn Nợ quá hạn) / chọn sai kỳ | Sai loại bị chặn, có nút đổi loại; lệch kỳ báo vàng cho chọn | |
| 4 | Ô tìm: gõ tên không dấu / 6 số cuối CCCD / mã KH / năm sinh | Nhóm 👤 Khách hàng; bấm → thẻ có CCCD, ngày cấp, địa chỉ, 📋 chép, món vay, tổ trưởng | |
| 5 | Máy thứ 2 (điện thoại) mở app, nối Drive | Tab Số liệu có ô T8; tra khách hàng được; mở kỳ tải số liệu về | |
| 6 | Drive | Có `Tủ hồ sơ/Số liệu/2026-08/` (file gốc) và `_Hệ thống/so_lieu/` | |
| 7 | Tab Tháng | Không còn 7 dòng sao kê thuần Excel; dòng XLS ô xám, không báo thiếu | |

**Ghi chú kỹ thuật 3.85:** khối `<script>` cuối file. Hằng: `SL_MA_CU` (7 mã cũ, `laMaSoLieu`), `SL_NGUON`, `SL_TRUONG` (trường + tên cột chuẩn hóa bỏ dấu `slChuan` + kiểu n/d/s + độ dài mã), `SL_LOAI` (can / mot / khong / khoa / cu / tenFile), `SL_KHOA_DUNG`. Đọc: `slDocSheet` (Worker từ mã xlsx đã cache `tvDoc('xlsx')`, dự phòng đọc trực tiếp) → `slTimDau` → `slLayDong` (bỏ trống / tiêu đề lặp / tổng / phần ký / sai mã) → `slTimKy` (`slNgayTrongChu`) → `slTong`; `slDocFile`, `slPhanTich(kq, loaiChon)`. Lưu: `slNen` / `slMoBang` (theo cột + từ điển), IDB `sl_b_<loại>_<kỳ>`, gốc tạm `sl_g_…` (xóa sau khi lên Drive), `sl_meta` (`SLM` = bang / xoa / ndt / dbLuc), `sl_danhba` (`SL_DB` kh + to, `slVaoDanhBa`, `slDungDanhBa`, `slDungTim`). Drive: `slDay` (gốc → `Số liệu/<kỳ>/`, `slGZ` → `_Hệ thống/so_lieu/<kỳ>/<loại>.json.gz`, danh bạ `khach_hang.json.gz`, `slDayMeta` gộp `slGopMeta` trước khi ghi `meta.json`), `slTaiTuDrive` (gọi khi nối Drive), `slDocBang` tải bảng khi cần. Bộ kỳ: `slBo`, `slDoiChieu`. Giao diện: `veSoLieu` (tab 7, `tr7`), `slKyHTML`, `slDanhMucHTML`, `slMoO`, `slNapBo`/`slDocNhieu`/`slXemTruoc`/`slGhiDaTich`, `slNapMot`/`slKiemMot`/`slGhiMot`, `slDocMucCu`. Tra: `slTimKH`, `slKHGoiYHTML` (gắn vào `veGoiY`), `slTheKH`, `slChepKH`. Tab Tháng: `bangDoiChieuHTML`, `thieuTheoKy`, `mauApDung`, `dsMauCDHTML` lọc `laMaSoLieu`; ô XLS lớp `trong`. `gomTatCaDon` bỏ qua thư mục `Số liệu`. Phép thử: `t97.js` (bộ giả 25.000 món), `t97m.js` (giao diện máy / điện thoại), `t98.js` (2 máy qua Drive giả), `t99.js` (chuyển tiếp tab Tháng); `taogia.py` sinh bộ file giả. Từ điển dữ liệu: `docs/DU_LIEU_THANG.md`.

### Danh sách thử trên máy thật (3.84) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Scan (đã nạp Theo dõi nợ) có bản tên không dấu | Thanh "✍ n bản scan tên không dấu" → Xem & đổi: tên đề xuất đúng khách, đuôi "Hdtd" giữ; bỏ tích bản nào thì bản đó giữ nguyên | |
| 2 | Bản đã lên Drive được đổi tên | Sau đồng bộ, tên file trên Drive đổi theo | |
| 3 | Theo dõi nợ › thẻ món › ✚ Lần làm việc / sửa mục hồ sơ hộ; Lịch › sửa | Enter / Tab sang 1 ô, Shift lùi, ô nhiều dòng Enter xuống dòng, ô cuối Enter → nút Lưu, Ctrl+Enter lưu | |
| 4 | Điện thoại: tab có file chờ khai | Chip chỉ "📥 n", không đè nút | |

**Ghi chú kỹ thuật 3.84:** `coDauViet`, `goiYTenCoDau` (khớp tiền tố 6→2 từ của `tenChuanHo`, lọc `maToTu`, chỉ nhận khi đúng 1 tên), `TDAU`, `moTenCoDau`, `apTenCoDau` (đặt `suaLuc`, `canDay` nếu có `driveId`, `henDongBoScan`); thanh nhắc trong `veScan` (chỉ khi `NO_SAN`). Lớp `phim-chung` gắn sau `nhapDat('lc:…' / 'muc:…' / 'lan:…')`, `moHop` gỡ lớp; `sgPhim` / `sgO` / `sgSang` nhận `#hop-in.phim-chung` và nút `.hang-nut .chinh`; TEXTAREA trong phim-chung giữ Enter. Chip: `<span class="ck-chu">` ẩn khi ≤ 699px. Phép thử `t96.js`.

### Danh sách thử trên máy thật (3.83) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hôm nay › 🧰 📊 Giao ban (đã nạp ≥ 2 kỳ sao kê) | Bảng xã › điểm kỳ này / kỳ trước / ±; tổ tăng; món mới vào / ra; nhận định đúng số | |
| 2 | 🖨 In · 📋 Chép nhận định | Bản in A4 ngang; nhận định dán được vào Word / Zalo | |
| 3 | 📅 Buổi GD → chọn điểm | Cam kết đến hạn, món cần đôn đốc, hồ sơ thiếu đúng điểm; 📋 Chép dán Zalo gọn | |

**Ghi chú kỹ thuật 3.83:** `CONG_CU` thêm `giaoban`, `buoigd` (cờ `hop:true` → `veCC` mở `moHop(…, true)` cả trên máy tính; `ccVeLai`). Giao ban: `gbKyTruoc`, `gbTinh(L)`, `gbLech`, `gbNhanDinh`, `gbBangHTML`, `gbTatCa`, `ccGBHTML`, `gbChep`, `gbIn`. Buổi GD: `BGD`, `bgdDsDiem` (ngày GD từ `diaBan[].diem[].ngay`), `bgdChon`, `bgdChonHTML`, `bgdTinh`, `ccBGDHTML`, `bgdChuTho`, `bgdChep`, `bgdIn`. Phép thử `t95.js`.

### Danh sách thử trên máy thật (3.82) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Gõ tên 1 khách đang nợ ở ô tìm | Có dòng 🏠 Hồ sơ hộ; bấm → 1 trang đủ CCCD, hồ sơ, món vay, lần làm việc | |
| 2 | Tab Scan → 🏠 trên 1 dòng | Mở hồ sơ hộ của khách đó; không lẫn người trùng tên khác tổ | |
| 3 | 🖨 In / gửi bộ giấy tờ | Ghép CCCD + hồ sơ quét thành 1 file để in / gửi | |

**Ghi chú kỹ thuật 3.82:** `tenChuanHo`, `khopTenHo` (tên hộ nằm trọn trong tên kia, ≥ 2 chữ), `maToTu`, `thuThapHo(q)` ({maKH} hoặc {ten, maTo}), `moHoSoHo`, `moHoSoTuScan`, `timHo` (gợi ý ô tìm, `HO_GY`). Nút trên `tdnTheHTML`, `dongScanHTML`; `veGoiY` thêm nhóm 🏠. Phép thử `t94.js` (tên giả).

### Danh sách thử trên máy thật (3.81) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🧰 Dọn kho › 🛟 Sao lưu | Thấy bản 💻 trong máy hôm nay (+ bản ☁ Drive nếu đã nối), số mục, "không thiếu" | |
| 2 | Bấm So sánh ở bản Drive cũ nhất | Hiện thiếu gì (nếu có) theo từng tab; ♻ Lấy lại chỉ thêm mục thiếu | |
| 3 | Dùng app bình thường cả ngày, máy 2 cùng dùng | Không mất mục nào; mục xóa ở máy này không sống lại ở máy kia | |

**Ghi chú kỹ thuật 3.81:** `dayChiMucLenDrive` luôn tải + `gopTuRemote` trước khi ghi; `demChiMuc`, `KHO_SAO_LUU`; chặn khi `soRemote>=3 && demChiMuc(goi)===0`; dự phòng Drive chỉ ghi khi chưa có file ngày đó. `saoLuuTrongMay` (khóa IDB `saoluu_YYYY-MM-DD`, giữ 7, gọi 4 giây sau khởi động, `D.cauHinh.saoLuuNgay`), `dsSaoLuuMay`, `dsSaoLuuDrive`, `docSaoLuu`, `mucThieuTuSaoLuu`, `veSaoLuuHTML`, `napDsSaoLuu`, `xemSaoLuu`, `layLaiSaoLuu`; Dọn kho ngăn `saoluu`. `luuNo` chờ `NO_SAN`; `dayNoLenDrive` không ghi bản trống. Phép thử `t93.js` (Drive giả).

### Danh sách thử trên máy thật (3.80.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Scan: các bản tài liệu có ☁ đường dẫn Drive | Không còn "⚠ Chưa có trang"; chip "☁ PDF trên Drive"; bấm xem mở được PDF | |
| 2 | Nếu còn thanh đỏ ♻ Khôi phục → bấm | Gắn ảnh vào đúng bản đã có, không sinh bản trùng | |

**Ghi chú kỹ thuật 3.80.1:** `ttScan` bỏ "Chưa có trang" khi có `driveId`; chip trang ở dòng Scan; `lapScanKhoiPhuc` trả `{gan:muc, trang|matTruoc|matSau}` cho mã đã có (không sửa dữ liệu khi chỉ đếm), `khoiPhucScan` mới gắn. Phép thử `t92.js`.

### Danh sách thử trên máy thật (3.80) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ✎ Sửa văn bản có văn bản liên quan | Chip chỉ số hiệu, ô gõ cùng hàng; Liên quan + Ghi chú riêng 1 hàng; không cuộn | |

**Ghi chú kỹ thuật 3.80:** `lqSuaHTML` chip = số hiệu (`title` giữ tên + ngày); khối qh bọc `.sg-2` (lưới 1.3fr / 1fr); `#s-tom rows=1`; `sgHd` bỏ `.sg-phim` khi có hướng dẫn. Đo `t90.js` (1280×720).

### Danh sách thử trên máy thật (3.79.1 — sửa khẩn) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở tab Scan trên máy bị mất danh sách | Thanh đỏ "Còn n bản scan…" + nút ♻ Khôi phục | |
| 2 | Bấm ♻ Khôi phục | Danh sách hiện lại (bản từ Drive có tên; bản dựng từ ảnh để chưa khai) → Khai hàng loạt | |
| 3 | Mở app, xóa 1 văn bản ở tab Văn bản rồi mới vào tab Scan | Danh sách Scan còn nguyên | |

**Ghi chú kỹ thuật 3.79.1:** gốc lỗi: `HS.ds` khởi tạo `[]`, chỉ gán `= D.scan` trong `napHoSo` (khi mở tab Scan); `chuyenVaoRac` (`D.scan = HS.ds`), `luuHoSo` (gọi cả từ `dongBoScan` lúc mở app), `xoaScanIm` dùng `HS.ds` cũ → ghi đè `D.scan = []`. Sửa: chỉ lấy `HS.ds` khi `HS.mo`; `luuHoSo` chỉ thêm mục thiếu khi chưa mở; `nap()` và `khoiDong` gán `HS.ds = D.scan`. Khôi phục: `timAnhScanMoCoi` (duyệt khóa `hs_*` IndexedDB trừ đã có / thùng rác / hàng chờ / `hs_ka` / `_goc` / `_nho`), `lapScanKhoiPhuc`, `khoiPhucScan` (kéo chỉ mục Drive trước), `demScanKhoiPhuc` + thanh nhắc. Phép thử `t91.js` (tái hiện lỗi trên bản cũ → 0; bản sửa → giữ nguyên; khôi phục 4 bản).

### Danh sách thử trên máy thật (3.79) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ✎ Sửa văn bản có nhiều tag (máy 1366) | Cả hộp vừa 1 khung, không cuộn; tag 3 hàng, cuộn trong khối; ô ＋ tag ở đầu | |

**Ghi chú kỹ thuật 3.79:** chỉ CSS (khối "3.79 — hộp sửa gọn trong 1 khung"): `.sua-gon .tg-hang` max-height 64px, chip 19px, `input{order:-1}`; `.hop-in.sua-gon .day-form` nút 32px; textarea 30px; `.sg-hd` 30px. Phép thử đo `t89.js` (24 tag giả).

### Danh sách thử trên máy thật (3.78) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở ✎ Sửa văn bản, bấm lần lượt các ô | Dải xanh đầu hộp đổi theo ô (hướng dẫn + ví dụ); không bong bóng nào che ô | |
| 2 | Bấm 1 văn bản có liên quan | Dưới tên file 1 dòng chip số hiệu; bấm chip đi tới văn bản đó; không còn khối Dòng thời gian | |

**Ghi chú kỹ thuật 3.78:** `sgBong` thành rỗng (giữ tên); `sgNoiDungHd(el)` lấy hướng dẫn từ `SG_HD` / `GOI_Y_O`; `sgHd` vẽ `.sg-goi` + `.sg-phim` vào `#sg-hd` (dời lên đầu hộp sửa văn bản và hộp sửa bản quét, chiều cao cố định). `lienQuanHTML`: bỏ `.cl-cay`, thay `.lq-mot` (chip `.lq-c`, quay lại `.lq-lui`). `t81.js` sửa theo dòng chip mới.

### Danh sách thử trên máy thật (3.77) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Văn bản: 2 dòng QĐ 70/QĐ-HĐQT | Mỗi dòng có chip đỏ ⚠ trùng 1 bản; hàng lọc có ⚠ Trùng số hiệu | |
| 2 | Bấm ⚠ trùng → chọn bản giữ → Gộp | Còn 1 dòng, đủ liên quan 1006/TB-LN, 4336, 4339; bản kia ở Thùng rác | |
| 3 | Thêm lại file QĐ 70 → khai → Lưu | Hỏi Bỏ file mới / Giữ cả 2 / Lưu rồi gộp | |
| 4 | Hàng lọc: bấm Chưa gắn CT / Chưa gắn mảng / Chưa có tag | Ra đúng các văn bản để trống mục đó | |
| 5 | Lọc CT vay HN | Ra văn bản gắn HN + văn bản Tất cả CT | |

**Ghi chú kỹ thuật 3.77:**
- **Trùng:** `khoaTrungVB(m)` = số hiệu (bỏ dấu, chỉ chữ + số) + "|" + năm; `tinhTrungSH()` → `TRUNG_SH[id] = [ids]` (gọi đầu `veVanBan`; tên `TRUNG` cũ là việc khác); `vbTrungVoi`, `moGopTrung`, `xemBanTrung`, `gopTrung` (dời `lienQuan` qua `lqGo`/`lqNoi`, gộp tag/the/ctrinh, rồi `xoaNhieuVaoRac`), `hoiTrungVB`, `luuRoiGop`; `duyet()` hỏi khi `!imLang && !m0.xacNhanTrung`. Bộ lọc `L.trung`.
- **Lọc không sót:** `LOC_TRONG = '(chưa có)'`, `NHAN_TRONG`, `locTrong(m, khoa, kn)`; `locChuan` xử lý giá trị `LOC_TRONG` + CT kèm "Dùng chung"; `nhomLocNhanh`: `coDung` thêm giá trị lạ, `tagCo`, chip `LOC_TRONG` (tag đứng đầu); `locTheoThe` chuongtrinh kèm Dùng chung.
- Phép thử `t88.js` (dữ liệu giả: kiểm tra mọi văn bản lọc ra được ở mọi nhóm, gộp, hỏi khi lưu).

### Danh sách thử trên máy thật (3.76) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hộp sửa bản quét / văn bản: đứng ở ô Tên, bấm ← → | Con trỏ chạy trong chữ, không nhảy sang ô khác | |
| 2 | Đứng ở ô Xã (ô chọn), bấm → / ← | Sang ô Điểm GD / về ô trước | |

**Ghi chú kỹ thuật 3.76:** `sgPhim` — ← → chỉ gọi `sgSang` khi `t.tagName==='SELECT'`; `sgHd` hiện gợi ý phím theo loại ô. `t87.js` cập nhật.

### Danh sách thử trên máy thật (3.75) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét CCCD bằng camera trong app, cầm tay | Khung xanh giữ khoảng nửa giây là chụp; ảnh nét, không mờ do run | |
| 2 | Bấm ⏱ trên màn chụp | Đổi Nhanh 0,5s → Vừa 0,8s → Chắc 1,2s; mở lại vẫn nhớ | |
| 3 | Tab Scan › ✎ Sửa một bản CCCD / tài liệu (máy tính) | Trái ô nhập, phải xem bản quét; không phải cuộn; Lưu, Đóng ở đáy | |
| 4 | Trong hộp: Enter / Tab / → qua ô; Shift+Enter / ← lùi; ↑ ↓ ở ô Xã | Đi đúng 1 ô; ↑ ↓ đổi xã, con trỏ vẫn ở ô Xã | |
| 5 | Để trống Xã rồi Enter | Báo "Chưa có dữ liệu — chọn Xã / phường trước", đứng lại ô Xã | |
| 6 | Điện thoại: mở Sửa bản quét | Xem 2 mặt thẻ / các trang ở trên, ô nhập ở dưới | |

**Ghi chú kỹ thuật 3.75:**
- **Chụp:** `camGiu` (`D.cauHinh.camGiu` 500/800/1200), `doiGiuCam`, `nhanGiuCam`, `doNetCam` (phương sai Laplace ảnh 320px); `khungCam` nhớ `CAM.tot` (canvas cỡ thật nét nhất trong lúc giữ yên), `chupCam(true)` dùng `CAM.tot`; `vongCam` 100ms; lấy nét liên tục qua `applyConstraints({advanced:[{focusMode:'continuous'}]})` nếu máy có.
- **Hộp:** `themKhach` / `scanTaiLieu` dựng `.sua-trai` + `.sua-xem.q-xem` (giữ `#k-xem`, `nn-truoc`, `nn-sau`, `nn-trang`, `k-ct`, `k-tag`), `quetGon(kieu)` gắn lớp `sua-gon co-xem-ben quet-gon q-the|q-tl` → dùng chung phím `sgPhim` và bong bóng `sgBong`; `moHop` gỡ các lớp này. `doiDB` giữ con trỏ sau khi vẽ lại địa bàn.
- **Phím chung:** `sgPhim` thêm ← → (`sgSang`), ↑ ↓ lướt qua `__go`; `SG_CAY` (ô cha của cây) chặn sang ô con khi trống; `SG_HD` thêm gợi ý ô `k-*`.
- Phép thử `t87.js` (dữ liệu giả: bố cục 1366 / iPhone, phím, tốc độ).

### Danh sách thử trên máy thật (3.74) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở 1 công văn PDF ở khung xem → bôi đen 1 đoạn → Ctrl+C → dán vào Word / Zalo | Chép đúng chữ, có dấu | |
| 2 | Bấm 📋 trên thanh khung xem | Báo "Đã chép chữ trang n" — dán ra đủ cả trang | |
| 3 | Mở 1 PDF scan (bản chụp) | Góc trang có "Trang ảnh · 🔍 Đọc chữ"; bấm → đọc xong hiện hộp chữ để chép | |
| 4 | Tab Văn bản, Biểu mẫu, Ghi chú | "n kết quả" ở đầu hàng Sắp xếp, không còn dòng trống dưới hàng lọc; nút 📂 ☁ vẫn bấm được | |
| 5 | Tab Tháng › 1 file Excel có cột Họ tên / CCCD → 📋 Chép sang AI | Hiện cảnh báo đỏ, xem trước đã che (KH1, ***), số tiền giữ nguyên; bỏ tích → hiện nguyên | |
| 6 | Chép sang AI một bảng số có dòng Tổng cộng (số dạng 1,234,567) | "✓ Đã cộng thử: các cột khớp" — không còn báo lệch sai | |

**Ghi chú kỹ thuật 3.74:**
- **AL:** `veTamNhin` vẽ xong trang → `lopChuTrang` (pdf.js `renderTextLayer` vào `.lop-chu.textLayer`, `--scale-factor` = `vp.scale`, đặt đúng vị trí canvas; CSS rút từ `pdf_viewer.css` 3.11); nhớ chữ từng trang `S.chuTrang[i]` (xóa khi đổi file). `chepChuTrang(n)` (dùng chữ đã nhớ để chép ngay trong lần bấm), `chepHoacHien` (bộ nhớ tạm bị chặn → hộp `#chep-o`), `hoiOCRTrang`, `ocrTrang` (dùng lại `docDongOCR`). Lỗi font: `chuLoiFont`.
- **AK-2:** `veThanhSap(tab, kieuRieng, dangChon, hamDoi, dem)` — tham số `dem` vẽ `.sap-dem` đầu hàng; `chuDemLoc(tab)`; `#dem-vb` / `#tit-thang` để trống thì ẩn.
- **H:** `KHACH_COT`, `SO_KHACH`, `doKhach(b)`, `cheKhach(b, k)`, `bangChepAI`, `xemChepAI`; `CHEP.khach`.
- **I:** `soTu` viết lại (chấm + phẩy → dấu sau cùng là thập phân; 1 dấu + đúng 3 số → ngăn nghìn).
- Phép thử: `t85.js` (PDF giả: lớp chữ, chép, trang ảnh, số kết quả), `t86.js` (che dữ liệu khách giả, `soTu`).

### Danh sách thử trên máy thật (3.73) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Văn bản › 🗂 Nhóm → bấm ⊞ / ⊟ trên hàng Sắp xếp | Bung hết / thu hết các năm, tháng | |
| 2 | Bấm ▤ Gọn | Mỗi file 1 dòng (ẩn tag, CT vay), nút ✎ 🗑 ⋯ vẫn còn; bấm lại hiện như cũ; mở lại app vẫn nhớ | |

**Ghi chú kỹ thuật 3.73:** `veThanhSap` thêm ⊞ / ⊟ (chỉ khi xem Nhóm) và ▤ Gọn; `bungNhom(mo)`, `batDongGon`, `apDongGon` (lớp `body.dong-gon`, cờ `D.cauHinh.dongGon`, áp mọi tab dùng dòng `.d2`, trừ Theo dõi nợ). Phép thử `t84.js`.

### Danh sách thử trên máy thật (3.72) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Thêm file → trong khay chờ bấm ✎ Sửa → sửa → Lưu | File vào tủ luôn (không phải bấm duyệt nữa), khay chờ bớt 1 | |
| 2 | Ô Số, ký hiệu: gõ `4336hd nhcs` | Tự thành `4336/HD-NHCS`; Loại tự chọn Hướng dẫn | |
| 3 | Bấm vào từng ô | Gợi ý + ví dụ hiện ngay phía trên ô đang gõ; dòng dưới cùng chỉ còn phím tắt | |
| 4 | Ô Tag | Mọi tag hiện sẵn dạng chip nhỏ (đang chọn xanh, gợi ý viền xanh lá đứt); bấm chip chọn / bỏ; ô ＋ gõ để lọc, Enter chọn chip khớp hoặc tạo tag mới | |

**Ghi chú kỹ thuật 3.72:** `luuSua`: file trong `D.cho` → `duyet(id)` sau khi Lưu (trước chỉ khi mở từ danh sách Chờ khai). Tag: `tgHangHTML`, `tgC` (chip `.tg-c` data-v, `layGon('s-nv')` đọc như cũ), `tgLoc`, `tgEnter`; `sgPhim` Enter ở `#s-tag-go` gọi `tgEnter`. Gợi ý trên ô: `sgBong` (bong bóng `#sg-bong` trong `.sua-trai`, gỡ khi rời ô); `#sg-hd` còn dòng phím tắt. Số hiệu: `soHieuGo`. Phép thử `t83.js`; `t80.js` cập nhật theo cách chọn tag mới.

### Danh sách thử trên máy thật (3.71) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hôm nay › 🧰 📋 CT vay › Đang cho vay | 9 chương trình: lãi suất · thời hạn · mức cho vay trên 1 dòng; bấm mở đối tượng, kỳ hạn trả nợ; 📋 Chép tóm tắt | |
| 2 | Gõ tìm: "3,96", "khuyết tật", "HSSV", "26" | Ra đúng chương trình | |
| 3 | Danh mục mã | 32 mã hệ thống, cột viết tắt app, 9 dòng tô xanh "đang cho vay"; bấm mã là chép | |
| 4 | Cài đặt › danh mục Chương trình vay | Có thêm NCHXAPT; các mục anh đã sửa giữ nguyên | |
| 5 | Theo dõi nợ: món có mã CT ít gặp (05, 13, 14…) | Hiện đúng tên chương trình | |
| 6 | Đối chiếu số liệu bảng với văn bản gốc (lãi suất, mức cho vay) | Đúng như file tóm tắt 2025 | |

**Ghi chú kỹ thuật 3.71:** `TDN_CT` đủ 32 mã hệ thống (MACT → [TENVT, TENCT]); `CT_APP_MA` viết tắt app ↔ mã, `ctMaCua`, `ctVTAppCua`; công cụ `CONG_CU` id `ctvay` — `CTV_DS` (9 CT, chép nguyên file tóm tắt 2025), `CTV`, `ccCTVHTML`, `ctvChonHTML`, `ctvDSHTML`, `ctvVeDS`, `ctvChuCT`, `ctvChepCT`, `ctvChep` (dùng `chepChu` có sẵn); bổ sung một lần `D.cauHinh.ctNCHXAPT` (chỉ thêm NCHXAPT nếu thiếu, không sửa mục cũ); `TU_KHOA_CT.NCHXAPT`. Phép thử `t82.js`.

### Danh sách thử trên máy thật (3.70) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Văn bản: dòng có văn bản liên quan | Hiện "🔗 70/QĐ-HĐQT" (tối đa 2 số hiệu, dư "+n"); rê chuột thấy tên đầy đủ + ngày | |
| 2 | Bấm số hiệu trên dòng | Chọn đúng văn bản đó, cuộn tới, khung xem mở; có "‹ Quay lại …" ở khung xem | |
| 3 | Bấm ‹ Quay lại | Về văn bản vừa xem | |
| 4 | Đang lọc (vd theo tag) mà văn bản liên quan bị ẩn | Vẫn mở ở khung xem, báo kèm nút "Bỏ lọc" | |
| 5 | Hộp sửa: chip văn bản liên quan → ↗ | Khung xem cạnh hộp đổi sang văn bản đó, hộp giữ nguyên; "↩ Về văn bản đang sửa" | |

**Ghi chú kỹ thuật 3.70:** `dongHTML` chip `lq-tg` (phần tử thứ 3 của mảng `the` = HTML dựng sẵn), `diToiVB` / `quayLaiVB` / `moVBLienQuan` (ngăn xếp `XEM_LS`, tối đa 20), `baoNut` (báo kèm 1 nút); `lienQuanHTML` thêm `.lq-lui` và link đi qua `diToiVB`; hộp sửa `lqXemBen` / `lqVeVBSua` (khung `XEM.sua`, `#sua-lq-bao`). Phép thử `t81.js`.

### Danh sách thử trên máy thật (3.69) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở ✎ sửa một văn bản trên máy tính (màn 1366×768 trở lên) | Vừa 1 màn hình không cuộn: tên cũ / tên mới 2 dòng, ☆ 🔍, Nhóm, ① ② ③, 3 khối, dòng 💡, Lưu | |
| 2 | Gõ Số → Enter → Ngày (gõ liền 8 số) → Enter … tới ô cuối → Enter | Mỗi Enter sang ô kế; tới nút Lưu thì Enter là lưu; Shift+Enter / Shift+Tab lùi ô trước (ở nút Lưu cũng lùi, không lưu) | |
| 3 | Ô Mảng / CT vay / Hiệu lực / Loại: bấm ↑ ↓ | Đổi lựa chọn ngay tại ô, không bật danh sách | |
| 4 | Ô Tag: đứng vào ô | Dòng 💡 hiện gợi ý bấm được; ↓ mở cả danh sách tag (dùng nhiều trước, số VB); gõ không dấu vẫn ra; "＋ Tạo tag mới" thêm được | |
| 5 | Ô Văn bản liên quan: gõ số hiệu → ↑ ↓ → Enter | Thêm chip, hai bên cùng thấy sau khi Lưu | |
| 6 | Ctrl+Enter ở bất kỳ ô nào | Lưu | |
| 7 | 🔍 Đọc lại → chọn gợi ý | Ô được điền (viền xanh), phần đang điền khác giữ nguyên | |
| 8 | Văn bản mới thêm | Trích yếu để trống (không chép tên); con trỏ ở ô trống đầu tiên | |
| 9 | Hàng lọc tab Văn bản | 2 dòng; không còn chip "Tất cả"; bấm chip lọc (có ✕), bấm lại bỏ; "✕ Bỏ lọc (n)"; số mục trên chip | |
| 10 | "Dùng chung" | Hiện "Tất cả CT" ở hàng lọc, dòng văn bản, hộp sửa, Biểu mẫu; thư mục Drive giữ tên cũ | |
| 11 | Ô tìm: gõ "tiết kiệm và vay vốn" | Ra văn bản ghi TK&VV | |

**Ghi chú kỹ thuật 3.69:** hộp sửa — `suaCho` nhóm Văn bản dựng `.sg-khoi` ×3 + `#sg-buoc`, `#sg-hd`, `.sg-luu`; `#hop-in.sua-gon` (moHop gỡ lớp); ô chọn `sgChon` (Mảng / CT vay), `layGon` / `datChipTheo` đọc cả SELECT; Tag `#s-nv` (chip `.the-loc.bat` data-v) + `#s-tag-go` / `#s-tag-goi`, `tgGoi`, `tgThem`, `tgGoiY`, `tgHd`, `tgDem`, tag mới thêm vào `dsTag('vanBan')` khi Lưu; liên quan chip trong `#lq-o` (`tvbGoi` có dòng `.chon`); phím `sgPhim` (keydown capture) + `sgSang`, `sgO`, `sgMoDau`, focusin → `sgHd` (`SG_HD` + `GOI_Y_O`); `sgSuaDuong`; `saoSuaHTML(m, gon)`. Sửa lỗi 3.68: `suaCho` mở lại nháp rồi `apGoiYSua` nếu có `GOI_Y_SUA.moi`. Hàng lọc — `hangLocNhanh` mới (nhóm ngắn chung dòng, tag riêng, đếm `locTheoThe(locChuan)`, `.ln-bo`), `khoaTrenHangLoc` (dòng Đang lọc / chip-hang không nhắc lại). `hienCT` ("Dùng chung" → "Tất cả CT", chỉ hiển thị); `layThe` đọc data-v. Tìm — `moVietTat` + `diem`. Phép thử `t80.js`.

### Danh sách thử trên máy thật (3.68) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app lần đầu sau khi cập nhật | Quan hệ cũ (sửa đổi / hướng dẫn / thay thế) tự thành "🔗 Văn bản liên quan"; dòng có chip 🔗 n; không còn nhãn VB chính | |
| 2 | Sửa một văn bản → Thêm văn bản liên quan → gõ số hiệu → chọn → Lưu | Mở văn bản kia cũng thấy liên kết ngược lại; ✕ gỡ thì hai bên cùng gỡ | |
| 3 | Bấm một văn bản có liên kết | Khung xem hiện 🕘 Dòng thời gian (chỉ văn bản liên kết trực tiếp), xếp theo ngày; hết hiệu lực gạch ngang | |
| 4 | Đang sửa, lỡ nhấp ra ngoài hộp | Hộp không đóng, nút Đóng nháy | |
| 5 | Đang điền dở → Đóng (Esc) → mở lại đúng văn bản đó | Còn nguyên chỗ đang điền; Lưu xong mở lại thì là bản đã lưu | |
| 6 | Hộp dài (sửa văn bản, ghi lần làm việc) trên điện thoại | Nút Lưu / Đóng luôn thấy ở đáy hộp | |
| 7 | Gỡ file ở Hôm nay | Khung "↩ Hoàn tác" nhỏ ở góc, tự tắt sau 3 giây | |
| 8 | Lịch: đang ở hôm nay / chuyển tháng khác | Nút Hôm nay mờ khi đang ở hôm nay, sáng lên khi sang tháng khác; rê chuột các nút đổi màu | |
| 9 | Máy thứ 2 nối Drive | Liên kết văn bản đồng bộ đủ hai chiều | |

**Ghi chú kỹ thuật 3.68:** AF — trường mới `m.lienQuan=[id…]` (2 chiều), `lqCua`, `lqNoi`, `lqGo`, `chuyenLienQuan()` (goc / thayBoi / vaiTro cũ → liên kết; chạy ở `khoiDong`, `gopTuRemote`, `noiLienKetSauQuet`); hộp sửa `LQ_SUA`, `lqSuaHTML`, `lqThemSua`, `lqBoSua` (ô `s-lq` dùng `oTimVB`); `lienQuanHTML` = dòng thời gian trực tiếp; Drive: thuộc tính `lq` (driveId, cắt khi dài), xóa `vt`/`goc` (biểu mẫu vẫn dùng `thay`). Bỏ `VAI_TRO`, `vaiTroCua`, `laVaiTroCon`, `doiVaiTro`, `doiHieuLuc`, `chonGocVB`; `xepChaCon` còn tên, không xếp cha–con; bỏ hỏi "VB sửa đổi hết hiệu lực theo" (không còn VB chính). AD — `bamNgoaiHop`, `hopCoONhap`, nháp `NHAP` / `HOP_NHAP` / `nhapDat` / `nhapMo` / `nhapGiu` / `nhapXong` (gắn ở `suaCho`, `tdnSuaMuc`, `tdnLanMoi`, `lcSua`; nháp chỉ trong lần mở app); CSS sticky đáy hộp. AE — `baoHoanTac` cố định 3 giây, lớp `.bao.goc`. AG — `.lc-nut:hover`, nút Hôm nay `disabled` / `hn-noi`. Phép thử `t79.js`; `t76.js` bỏ phần vai trò.

### Danh sách thử trên máy thật (3.67) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Theo dõi nợ › 🖨 Danh sách › ☰ Chi tiết (đang ở 🔴 Nợ quá hạn, Đang có) | Bảng A4 ngang gom Xã › Điểm GD › Ấp, dòng cộng từng nhóm + tổng cộng khớp số trên ô 🔴 | |
| 2 | Chọn 1 nhánh 🌳 hoặc gõ tìm rồi mở lại | Chỉ in món đang hiện; dòng dưới tiêu đề ghi đúng lọc | |
| 3 | Σ Tổng hợp theo xã, điểm GD | 3 danh sách cạnh nhau (món · số tiền · chưa làm việc); tổng PGD khớp 3 ô trên đầu | |
| 4 | 🖨 In / 📊 Xuất Excel cả 2 loại | In đủ trang, tiêu đề cột lặp mỗi trang; file Excel mở được, số là số (cộng được) | |

**Ghi chú kỹ thuật 3.67:** `tdnInDS(kieu)` (hộp, `TDN_IN.kieu` 'ct' | 'th', xem trước iframe `#tdn-in-xem`) · chi tiết `tdnInCT()` (theo `tdnDSLoai` = lọc đang xem; gom xã+điểm+ấp, xếp mã tổ + tên), `tdnMocMon`, `tdnInMoTa` · tổng hợp `tdnInTH()` (món đang có ở kỳ mới nhất từng loại, không theo lọc; "chưa LV" = `tdnTrangThai`==='Chưa làm việc') · `tdnInHTML` + `TDN_IN_CSS` (A4 ngang) · `tdnInAOA` → `tdnInExcel` (XLSX, qua `giaoFile`) · `tdnInIn`. Phép thử `t78.js`.

### Danh sách thử trên máy thật (3.66) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở 1 món → 🧾 In phiếu | Hộp xem trước phiếu: trang đầu tóm tắt (số chính, nhãn, khả năng thu, hướng xử lý, ▶ việc tiếp theo), dòng thời gian, I–VI | |
| 2 | 🖨 In (máy tính) | Hộp in của trình duyệt, khổ A4, 1–2 trang/món | |
| 3 | 📄 Ra Word (máy tính + điện thoại) | File .docx mở được, bảng không vỡ, sửa được | |
| 4 | Lần làm việc có cam kết → ✓ Giữ đúng / ✗ Thất hứa | Nút đổi màu; nhật ký ghi "Thất hứa x/y lần"; bấm lại để bỏ; cam kết đã đánh dấu thì Hôm nay thôi nhắc | |
| 5 | ✎ Khả năng thu hồi | Chỉ chọn được 1 mức; có lịch sử như các mục khác; hiện trên phiếu | |
| 6 | 🌳 chọn 1 tổ → 🧾 In phiếu (n) | In / Word đủ n phiếu, mỗi phiếu sang trang mới, xếp theo Xã › Điểm › Ấp › Tổ | |
| 7 | Máy thứ 2 nối Drive | Thấy kết quả cam kết và khả năng thu hồi | |

**Ghi chú kỹ thuật 3.66:** `tdnPhieuDL(m)` dựng dữ liệu phiếu (dùng chung) → `tdnPhieuHTML` + `PHIEU_CSS` + `tdnPhieuTrang` (bản in, qua `inBlob`) và `tdnPhieuDocx` + `wBang` (bản Word, qua `taoDocx`; nhiều phiếu nối bằng `W_NGAT_TRANG`). Mở: `tdnPhieu(kuoc)` (hộp xem trước iframe `#phieu-xem`), `tdnPhieuNhanh()` (các món đang hiện theo lọc/cây/tìm), `PHIEU`, `tdnPhieuIn`, `tdnPhieuWord`, `giaoFile` (tách từ `tdnBienBan`). Cam kết: trường mới `lan.ketQua` ('' | 'giu' | 'that'), `tdnDatKQ`, `tdnHua`, `tdnHuaChu`, `tdnCoCamKet`; `tdnViecCan` bỏ cam kết đã đánh dấu. Hồ sơ hộ: mục mới `khaNang` trong `TDN_MUC` (cờ `mot:true` = chọn 1). `tdnViecTiep`, `tdnSLCuoi`. **Hướng xử lý = mục Phương án đề xuất có sẵn** (không thêm ô trùng). Phép thử: `t77.js`.

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
| H | Cảnh báo dữ liệu khách khi bấm 📋 Chép sang AI — R4 | ✅ **Đã làm 3.74** (cảnh báo + che sẵn họ tên, CCCD, điện thoại, địa chỉ) |
| I | `soTu` đọc sai số viết kiểu Anh (1,234.5) khi cộng thử bảng Excel | ✅ **Đã làm 3.74** |
| J | Tìm khung CCCD nhạt màu trên nền sáng bóng (bàn kính) còn lệch 71–91% → phải kéo góc tay | Cần thêm ảnh thật nhiều kiểu nền để dò tiếp trọng số `TS_THE` |
| K | PDF chụp scan không có chữ: ngày tự điền "hôm nay" khi thêm vào tab Văn bản | ✅ Đã làm ở 3.46 (không tự điền ngày, nhãn "PDF ảnh") — rà lại 3.74 |
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

#### Đợt gom sau 3.64 — ✅ AA · AB · AC đã làm ở bản 3.65 (03/10/2026). Việc mới ghi tiếp bên dưới.

| # | Việc | Nội dung | Chờ anh chốt |
|---|---|---|---|
| AA | **Quan hệ văn bản — chọn VB chính bằng số hiệu** (anh báo chọn VB chính không chạy, 03/10/2026) | **Nguyên nhân:** ô chọn chỉ liệt kê văn bản đã đánh dấu "VB chính" → kho chưa có → trống. **✅ Anh chốt (đã nghĩ lại):** (1) **giữ khái niệm "VB chính"**; (2) vai trò: VB độc lập · VB chính · VB sửa đổi, bổ sung · **VB hướng dẫn thực hiện** (thêm mới); (3) chọn "sửa đổi" hoặc "hướng dẫn" → ô **"Của văn bản số…"**: **gõ số hiệu để tìm trong TẤT CẢ văn bản của app, mọi loại** (QĐ, HD, CV, TB…), hiện gọn số hiệu + tên; chọn xong văn bản kia **tự thành "VB chính"** (không phải đánh dấu trước); (4) **không tự đoán / tự gợi ý** — anh chọn tay. Ô "Được thay thế bởi" cũng tìm theo số hiệu. Khi VB chính hết hiệu lực vẫn hỏi có cho các VB sửa đổi / hướng dẫn của nó hết theo không. | — |
| AC | **⭐ Đánh dấu sao văn bản quan trọng** (anh nêu 03/10/2026) — **tách riêng với VB chính** | Nút ☆/⭐ trên dòng văn bản (cạnh tên) và trong hộp Sửa — bấm bật/tắt; **không cần quan tâm nữa thì bỏ sao**; chip lọc **"⭐ Quan trọng"** ở hàng lọc tab Văn bản; đồng bộ các máy. **Áp cả tab Biểu mẫu** (mẫu hay dùng) — anh đồng ý. | — |
| AB | Hộp Khai / Sửa văn bản + dòng văn bản (✅ anh đồng ý 03/10/2026) | (1) Tên file mới bị cắt dở "…Quy chế hoạt động **của.pdf**" trong khi tên văn bản đủ "…của Tổ TK&VV" → không cắt giữa chừng, cắt thì cắt ở ranh giới cụm từ và báo độ dài; (2) chữ hoa giữa câu "Hướng dẫn **Thực** hiện…" → "thực"; (3) ô Trích yếu để trống dù có dòng tiêu đề → điền từ tiêu đề; (4) ô "NHÓM" chiếm cả khung chỉ để 4 nút → thu 1 dòng; (5) **rê / nhấp vào tên văn bản ở danh sách, dòng gợi ý lặp lại tên + trích yếu gần như y hệt → thừa**: trích yếu đã nằm trong tên thì chỉ hiện tên đầy đủ (bỏ phần lặp). | — |

#### Đợt gom sau 3.65 — ✅ đã làm hết: AI (3.66), AH (3.67), AD · AE · AF · AG (3.68), AJ (3.69, 05/10/2026). AM (3.70), AN (3.72), AO (3.73), AK-2 · AL (3.74) (anh nêu 03/10/2026)

| # | Việc | Đề xuất | Chờ anh chốt |
|---|---|---|---|
| AD | Hộp sửa văn bản: lỡ nhấp ra ngoài là thoát, mất công | **Hộp có ô nhập** (sửa văn bản, khai, ghi lần làm việc, hồ sơ hộ, lịch…) **không đóng khi nhấp ra ngoài** — chỉ đóng bằng nút Đóng / Thôi (Esc) hoặc Lưu. **Nút Lưu + Đóng dính ở đáy hộp**, luôn thấy, không phải cuộn xuống cuối. Hộp chỉ để xem / thông báo vẫn nhấp ra ngoài là đóng như cũ. Bấm Đóng / Esc khi đang điền dở → giữ bản nháp, mở lại còn nguyên. | ✅ **Đã làm 3.68** (hộp sửa văn bản, hồ sơ hộ, lần làm việc, sửa việc lịch; nháp giữ trong lần mở app). ✅ Anh chốt: **không hỏi** — bấm Đóng / Esc thì **giữ bản nháp** đang điền; mở lại hộp của đúng văn bản đó thì các ô **còn nguyên chỗ đang điền dở** (nháp xóa khi bấm Lưu) |
| AE | Gỡ file khỏi dòng (Hôm nay) → khung báo Hoàn tác hiện rất lâu, khó chịu | Khung báo có nút ↩ Hoàn tác **hiện 3 giây** (nay 7 giây), nhỏ gọn ở góc, không che nội dung; lỡ tay sau đó vẫn hoàn tác được bằng nút ↶ trên đầu sổ / Ctrl+Z (đã có). Áp cho mọi khung báo Hoàn tác trong app. | ✅ **Đã làm 3.68.** ✅ Anh đồng ý — áp chung toàn app |
| AF | **Gọn quan hệ văn bản: bỏ "vai trò", chỉ còn "văn bản liên quan" + dòng thời gian** (anh nêu 03/10/2026, thay cho đề xuất "VB có liên quan" trước đó) | **Em góp ý — đồng ý, gọn và đúng cách anh dùng hơn.** (1) **Bỏ ô Vai trò** (độc lập / chính / sửa đổi / hướng dẫn) và nhãn "VB chính"; (2) mỗi văn bản có mục **🔗 Văn bản liên quan**: gõ số hiệu để thêm (như 3.65), thêm được nhiều, **liên kết 2 chiều** (thêm ở 4336 thì mở QĐ 70 cũng thấy), ✕ để gỡ; (3) khung xem hiện **🕘 Dòng thời gian** cả chùm văn bản liên quan (vd QĐ 70 → HD 4336 → CV …) xếp theo **ngày ban hành**, văn bản đang xem in đậm, bấm dòng nào mở dòng đó; dòng danh sách có chip nhỏ "🔗 3"; (4) **giữ "Hết hiệu lực"** (gạch ngang trên dòng thời gian, dải đỏ ở khung xem) vì cần biết văn bản nào còn dùng — "Được thay thế bởi" gộp thành: đánh dấu hết hiệu lực + văn bản thay thế nằm trong chùm liên quan; (5) dữ liệu cũ: quan hệ sửa đổi / hướng dẫn / thay thế đã có **tự chuyển thành liên kết**, không mất; ⭐ giữ nguyên. **✅ Anh lưu ý: liên kết bắt cầu (A–B, B–C ⇒ A–C) đôi khi không chính xác → KHÔNG bắt cầu:** dòng thời gian của một văn bản chỉ gồm **chính nó + các văn bản liên kết TRỰC TIẾP** với nó; muốn xem tiếp thì bấm sang văn bản kia (nó có dòng thời gian riêng). *Tùy chọn (em không đề xuất làm ngay):* ghi chú ngắn cho mỗi liên kết ("sửa đổi", "hướng dẫn") — để sau nếu anh thấy cần. | ✅ **Đã làm 3.68.** Bỏ luôn ô "Được thay thế bởi" (văn bản thay thế nằm trong liên quan; dải đỏ gợi ý văn bản mới hơn còn hiệu lực) và hỏi "VB sửa đổi hết hiệu lực theo". ✅ Bỏ Vai trò, giữ Hết hiệu lực, chỉ liên kết trực tiếp (không bắt cầu) |
| AG | Nút **Hôm nay · Danh sách · Tính ngày** (đầu lịch) rê chuột không đổi màu; đang ở hôm nay thì nút Hôm nay nên chìm | Rê chuột: đổi nền / viền như các nút khác. **Đang xem đúng hôm nay → nút "Hôm nay" mờ, không bấm được**; chuyển sang ngày / tháng khác → nút sáng lên (nổi) để bấm quay về. | ✅ **Đã làm 3.68** |
| AJ | **Hộp sửa văn bản gọn trong 1 màn hình, nhập nhanh theo bước** (anh nêu 04/10/2026) — demo: https://claude.ai/artifact/EoW42PVcRBgnf2on6b2Cs3 | (1) Dòng đầu: **1 dòng tên file sẽ lưu** + ☆ + 🔍 Đọc lại (bỏ khung Tên gốc/Tên mới 3 dòng); Nhóm là dãy nút nhỏ 1 dòng. (2) Thanh **① Nhận dạng · ② Phân loại · ③ Liên quan & lưu** sáng theo ô đang gõ, khối đang gõ viền xanh. (3) ① Số · Ngày · Loại 1 hàng; Tên văn bản; Trích yếu 2 dòng. ② **Mảng · CT vay · Hiệu lực 1 hàng dạng ô chọn** (thay dãy chip dài); Tag = chip + ô gõ chung 1 ô. ③ Văn bản liên quan = chip + ô gõ số hiệu; Ghi chú riêng 1 dòng; Nơi lưu 1 dòng + ✎ đổi. (4) **Enter / Tab sang ô kế** theo thứ tự gõ (cả ô chọn); Shift+Enter xuống dòng trong trích yếu; ô Tag/Liên quan có chữ thì Enter thêm, trống thì sang ô kế; ô cuối Enter = Lưu; **Ctrl+Enter = Lưu** mọi lúc; mở hộp con trỏ ở ô đầu còn trống. (5) Mỗi ô có chữ mờ là **ví dụ thật**; hướng dẫn gom về **1 dòng 💡 dưới cùng** đổi theo ô đang gõ. (6) Giữ: văn bản bên phải để nhìn mà gõ, đủ các ô như cũ, không đóng khi nhấp ngoài, Esc giữ nháp. Hộp Dữ liệu tháng / Ghi chú / Khác làm cùng kiểu. | ✅ Anh chốt 04/10/2026: **dùng ô chọn** (Mảng, CT vay, Hiệu lực, Loại); **↑ ↓ đổi lựa chọn ngay tại ô** (không bật danh sách, máy nào cũng như nhau), cũng dùng ↑ ↓ trong gợi ý Tag / Liên quan; **Enter / Tab sang ô kế, Shift+Enter / Shift+Tab lùi ô trước** (trích yếu không xuống dòng bằng phím, chữ tự xuống dòng). Đầu hộp **2 dòng: Tên cũ (gạch mờ) · Tên mới đổi ngay theo từng chữ gõ**; nút nhỏ ☆ và 🔍 (đọc gợi ý) **luôn hiện sẵn** cạnh bên (anh chốt). **Tag (anh nêu):** đứng ở ô Tag thì dòng 💡 thành hàng **gợi ý bấm được** (tag có chữ trùng tên/trích yếu + tag dùng gần đây); **↓ khi ô trống mở cả danh sách tag đã có**, dùng nhiều xếp trước kèm số văn bản; gõ không dấu vẫn ra; chưa có thì "＋ Tạo tag mới". **Trích yếu (anh chốt): không tự chép lại tên văn bản** — để trống, chỉ ghi thêm ý chính để tìm (bỏ việc điền sẵn bằng `tyDayDu`, dữ liệu cũ giữ nguyên); làm kèm: **ô tìm tự hiểu viết tắt** (bảng `MO_VIET_TAT`, gõ "tiết kiệm và vay vốn" vẫn ra văn bản ghi TK&VV). **Giữ đủ mọi nút (anh dặn):** dung lượng · số trang · trạng thái Drive cạnh tên cũ; ☆; 🔍; Nhóm; gợi ý Loại theo số; gõ ngày liền; cảnh báo trùng số hiệu; CT vay kèm tên đầy đủ; link Sửa danh sách tag; Nơi lưu đủ ✎ · Mặc định · 📂 · ☁ · ↗; Xóa khỏi tủ · Thôi · Lưu; khung xem bên cạnh. **Hàng lọc (anh chốt: vẫn chip nhưng gọn):** 4 dòng → 2 dòng — Năm · Mảng · CT vay chung 1 dòng (vạch ngăn), Tag 1 dòng, cuộn ngang trong dòng; chip cao 22px kèm số văn bản; **bỏ chip "Tất cả"** — bấm chip lọc (xanh có ✕), bấm lại bỏ, đang lọc hiện "✕ Bỏ lọc (n)"; giữ ★ Quan trọng, ẩn ▴; các tab khác cùng kiểu. **"Dùng chung" → hiển thị "Tất cả CT"** mọi chỗ (hàng lọc, hộp sửa, Biểu mẫu); giá trị lưu và thư mục Drive giữ tên cũ để khỏi dời file (✅ anh chốt: thư mục không cần đổi). ✅ **Đã làm 3.69** — kèm sửa lỗi 3.68: chọn gợi ý 🔍 khi đang có nháp không được điền. |
| AK | Sau 3.69 (anh nêu 05/10/2026): (1) Tag trong hộp sửa làm lại **dạng chip**; (2) hàng lọc gọn rồi còn **khoảng trống** phía dưới — dời lên / tận dụng | (1) **Tag = hàng chip bấm bật / tắt** như trước nhưng gọn: chip đang chọn xanh đứng đầu, rồi tag hay dùng; hiện 1–2 dòng, dư thì nút **+n** mở hết; cuối hàng ô nhỏ **＋ tag mới** (gõ không dấu cũng lọc chip); giữ dòng 💡 gợi ý theo nội dung; Enter ở ô ＋ trống thì sang ô kế. (2) **Bỏ khoảng trống** giữa hàng lọc và danh sách; **gộp dòng "n kết quả" vào đầu hàng Sắp xếp** (trái: "3 kết quả", phải: nút sắp xếp / xem) → danh sách lên thêm ~2 dòng; áp mọi tab. | (1) ✅ **Đã làm 3.72** theo ý anh bổ sung: tag hiện sẵn hết dạng chip nhỏ. (2) ✅ **Đã làm 3.74**: số kết quả lên đầu hàng Sắp xếp, bỏ khoảng trống |
| AL | Khung xem PDF không bôi đen / chép chữ được (anh nêu 05/10/2026) | Nguyên nhân: trang PDF đang vẽ thành ảnh (canvas) nên không có chữ để chọn. Đề xuất: (1) thêm **lớp chữ trong suốt** đè lên trang (pdf.js có sẵn) → **bôi đen, Ctrl+C / chuột phải Chép** như mở PDF thường, ở khung xem bên phải, khung xem to và khung xem cạnh hộp sửa; (2) nút **📋 Chép chữ trang này** chép cả trang một lần (nối dòng đúng như chức năng đọc tên đang dùng); (3) **PDF chụp / ảnh** (không có lớp chữ): báo "trang này là ảnh" kèm nút **🔍 Đọc chữ** (OCR có sẵn, lần đầu cần mạng) rồi chép. Lưu ý: PDF gõ bằng font cũ (TCVN3/VNI) chép ra có thể lỗi dấu — app báo khi gặp. | ✅ **Đã làm 3.74** |
| AM | Văn bản liên quan: hiện **số hiệu** thay vì chỉ "🔗 1", bấm vào **đi tới** văn bản đó (anh nêu 05/10/2026) | (1) **Dòng danh sách:** chip "🔗 1" đổi thành **"🔗 70/QĐ-HĐQT"** (tối đa 2 số hiệu, dư thì "+n"; văn bản chưa có số thì hiện tên ngắn); rê chuột thấy tên đầy đủ + ngày. **Bấm số hiệu → đi tới văn bản đó**: chọn dòng, cuộn tới, khung xem mở văn bản đó; nếu văn bản đang bị hàng lọc ẩn (khác năm, khác tag…) thì vẫn mở ở khung xem và báo nhỏ "đang bị lọc ẩn — bỏ lọc". Có nút **‹ Quay lại** văn bản vừa xem. (2) **Khung xem:** dòng thời gian đã bấm được — giữ, thêm nút ‹ Quay lại như trên. (3) **Hộp sửa:** chip liên quan hiện số hiệu (đang có); rê chuột thấy tên đầy đủ; thêm nút nhỏ ↗ trên chip để mở xem văn bản đó ở khung xem cạnh hộp, không đóng hộp, không mất phần đang điền. | ✅ **Đã làm 3.70** |
| AN | Khay chờ / hộp sửa (anh nêu 06/10/2026): Lưu = duyệt; tag hiện sẵn; gợi ý ngay trên ô; số hiệu tự thêm / | ✅ **Đã làm 3.72**: file trong khay chờ sửa xong bấm Lưu là vào tủ; tag chip nhỏ hiện sẵn (gộp AK-1); bong bóng hướng dẫn + ví dụ nằm ngay trên ô đang gõ; số hiệu gõ `4336hd nhcs` → `4336/HD-NHCS`. | ✅ |
| AO | Xem Nhóm (cây năm › tháng) có nút bung / thu hết; chế độ gọn ẩn dòng 2 (tag, CT vay); nút đặt cùng hàng Sắp xếp (anh nêu 06/10/2026) | ✅ **Đã làm 3.73**: ⊞ bung hết · ⊟ thu hết (hiện khi xem 🗂 Nhóm), ▤ Gọn (mỗi file 1 dòng, nhớ lựa chọn), cùng hàng Sắp xếp. | ✅ |
| AP | Quét ảnh: tự chụp chậm, cầm tay run; hộp **Sửa bản quét** dài, nút to — làm gọn 1 trang, phím như hộp sửa văn bản, 1 bên xem bản quét (anh nêu 01/10/2026) | **(1) Chụp nhanh hơn:** hiện phải giữ yên **1 giây** (khung so 5 lần/giây, ảnh dò 640px) mới tự chụp → hạ còn **~0,5 giây**, dò 10 lần/giây, nới ngưỡng rung tay (lệch khung 2,5% → 4%); trong lúc giữ yên app giữ lại khung hình **nét nhất** (đo độ nét) để chụp, không lấy khung đúng lúc bị run; điện thoại hỗ trợ thì bật lấy nét liên tục. Thêm chọn tốc độ ⚡ Nhanh 0,5s / Vừa 0,8s / Chắc 1,2s (nhớ theo máy). **(2) Hộp Sửa bản quét (CCCD và tài liệu) theo kiểu hộp sửa văn bản 3.69:** máy tính chia đôi — **trái** ô nhập gọn (Tên · Xã · Điểm · Ấp · Tổ · CT vay · Tag chip · Ghi chú, nhãn bên trái, ô 30px), nút Chụp / Chọn ảnh thành nút nhỏ một hàng; **phải** khung xem bản quét (2 mặt thẻ / các trang); Lưu + Đóng dính đáy; vừa 1 màn hình không cuộn. Điện thoại: xem ở trên (thu gọn được), ô ở dưới. **(3) Phím — QUY TẮC CHUNG TOÀN APP (anh chốt 01/10/2026, chọn cách a):** **Enter / Tab** = ghi nhận ô và sang **đúng 1 ô kế** (không tự nhảy qua ô đã có dữ liệu); **Shift+Enter / Shift+Tab** lùi 1 ô; **← →** — ô chọn: tiến / lùi 1 ô; **ô gõ chữ: chỉ di con trỏ trong ô, không nhảy ô** (anh chốt lại 07/10/2026 cho an toàn, làm ở 3.76); **↑ ↓** như thanh cuộn — cuộn lựa chọn trong ô chọn / danh sách gợi ý; Ctrl+Enter Lưu. **Ô trống:** ô **gốc của cây** (Xã → Điểm GD → Ấp → Tổ; tương tự các cặp cha–con khác) để trống mà Enter sang ô con → **báo "Chưa có dữ liệu — chọn Xã trước"**, đứng lại; **ô tự do** (tên, ghi chú, tag…) trống vẫn cho qua. **Ô bắt buộc** (phải có dữ liệu mới cho qua / cho Lưu): **chốt sau**. Áp cho hộp Sửa bản quét trước, rồi thống nhất hộp sửa văn bản và các hộp nhập khác. | ✅ **Đã làm 3.75** (hộp sửa bản quét + hộp sửa văn bản; các hộp nhập khác làm dần) |
| AH | Theo dõi nợ: **in danh sách** gom theo Xã › Điểm › Ấp › Tổ, vài cột cơ bản | Nút **🖨 In danh sách** ở từng danh sách (in theo đúng lọc đang xem: loại, Đang có / Đã ra, nhánh cây đang chọn). Bảng A4 ngang, tiêu đề "DANH SÁCH … ĐẾN NGÀY …", gom theo **Xã › Điểm GD › Ấp › Tổ** có dòng cộng từng nhóm + tổng cộng. **Cột:** STT · Họ tên KH · Mã KH · Số khế ước · Tổ trưởng · Chương trình · số tiền chính (dư nợ / quá hạn / khoanh) · cột mốc (ngày GD gần nhất / ngày chuyển QH / ngày hết hạn khoanh) · Trạng thái làm việc · Ghi chú (để trống ghi tay). Kèm nút **Xuất Excel** cùng bảng (tiện chỉnh, gửi). | ✅ **Đã làm 3.67** (anh bổ sung: kèm **tổng hợp theo xã, điểm GD** cả 3 danh sách). Chi tiết gom Xã › Điểm › Ấp (tổ xếp trong ấp, cột Tổ trưởng), cột mốc kèm số tháng/ngày. ✅ Có — kèm **Xuất Excel** cùng bảng |
| AI | **🧾 Phiếu thông tin món vay** — kiểu "sơ yếu lý lịch" món nợ xấu, tóm tắt nhưng đầy đủ nhất (anh nêu 03/10/2026) | Nút **🧾 In phiếu** trên thẻ món (Theo dõi nợ). **1–2 trang A4 dọc**, in thẳng hoặc ra **Word (.docx)** để sửa. Nội dung: **Tiêu đề** "PHIẾU THÔNG TIN MÓN VAY" · ngày lập · kỳ số liệu. **I. Khách hàng:** họ tên, mã KH, địa chỉ (ấp, xã), tổ + tổ trưởng, Hội đoàn thể, SĐT, vị trí nhà (tọa độ + ghi chú đường đi). **II. Món vay:** số khế ước, chương trình, ngày giải ngân, ngày đến hạn, tổng dư nợ / quá hạn / khoanh, lãi tồn, ngày giao dịch gần nhất; **tình trạng ở 3 danh sách** (đang có / đã ra, từ tháng nào, phát sinh lại mấy lần; số tháng không GD · số ngày quá hạn · ngày hết hạn khoanh + nguyên nhân khoanh); bảng **số dư qua các tháng**. **III. Hồ sơ hộ vay:** 7 mục tóm tắt (người vay & hộ, thừa kế / người trả thay, thực trạng, tài sản, sử dụng vốn, nguyên nhân, phương án) kèm ngày cập nhật. **IV. Quá trình làm việc:** bảng các lần (ngày, hình thức, nội dung chính, cam kết, đã thu, trạng thái) + **tổng đã thu**. **V. Tài liệu đã có:** danh sách hồ sơ gốc, biên bản đã ký, ảnh. **VI. Món khác cùng hộ** (nếu có). Cuối phiếu: **Nhận xét / đề xuất** (từ Phương án, để trống thì chừa dòng ghi tay) + ô ký **Người lập**. Mục nào chưa có thông tin thì in "chưa có" để biết còn thiếu gì. *Đề xuất thêm:* ở danh sách (AH) có nút **In phiếu cả nhánh** (vd cả tổ) — in liền nhiều phiếu khi cần đi làm việc một lượt. **Bổ sung (tư vấn theo cách các hệ thống thu hồi nợ hiện đại, anh ok):** (1) **Trang đầu tóm tắt đọc 30 giây** đặt trước I–VI: khung số chính (dư nợ · quá hạn/khoanh · lãi tồn), nhãn tình trạng (vd QUÁ HẠN 26 tháng · Thất hứa 2/3 lần · Hồ sơ đủ 5/8), khả năng thu + hướng xử lý, **▶ Việc tiếp theo** (việc/cam kết sắp tới gần nhất). (2) **Dòng thời gian** món vay: vay → quá hạn/khoanh (theo kỳ số liệu) → các lần làm việc → cam kết → đã thu, xếp theo ngày; chỉ dựng từ dữ liệu đã có. (3) **Cam kết giữ/thất hứa:** mỗi cam kết ở phần Làm việc có nút đánh dấu ✓ giữ đúng / ✗ thất hứa (mặc định: chờ); đếm "thất hứa x/y lần" hiện trên thẻ món và phiếu. (4) **2 ô chọn mới trong hồ sơ hộ:** *Khả năng thu hồi* (Có khả năng / Khó / Không còn khả năng / chưa đánh giá) và *Hướng xử lý* (Đôn đốc thu · Điều chỉnh kỳ hạn · Gia hạn nợ · Lập hồ sơ khoanh/xóa theo cơ chế xử lý nợ bị rủi ro · Nhờ chính quyền, đoàn thể can thiệp · Khác), ghi lịch sử như 7 mục. **Để sau:** danh mục hồ sơ ✓/✗ (% đầy đủ) — chờ anh gửi danh mục giấy tờ chuẩn (nhất là bộ hồ sơ khoanh/xóa), em không tự đặt; tạm thời nhãn "Hồ sơ đủ" chưa hiện. | ✅ **Đã làm 3.66.** Hướng xử lý dùng lại mục *Phương án đề xuất* có sẵn (không thêm ô trùng); In phiếu cả nhánh đặt ở thanh Theo dõi nợ (in các món đang hiện). ✅ Có — In phiếu cả nhánh: **có**; gồm trang đầu tóm tắt, dòng thời gian, cam kết giữ/thất hứa, 2 ô khả năng thu + hướng xử lý. Danh mục hồ sơ ✓/✗: chờ căn cứ |

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
