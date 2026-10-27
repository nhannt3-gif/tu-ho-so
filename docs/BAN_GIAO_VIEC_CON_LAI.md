# BÀN GIAO VIỆC CÒN LẠI — App Tủ hồ sơ (v2.1)

**Bản hiện tại:** 3.144 · build 10/10/2026
**Kho:** `nhannt3-gif/tu-ho-so` → `index.html` + `css/app.css` + `js/*.js` (từ 3.142 tách file; ghép lại 1 file: `python3 tests/ghep.py ra.html`)
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

### Danh sách thử trên máy thật (3.385)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sao kê › Sao kê theo nhà đầu tư › ô Nhà đầu tư | Sổ sẵn 5 mã (Vốn TW + 4 mã INV), có số món · dư nợ | |
| 2 | Chọn 1 NĐT, lọc 1 xã › 👁 Xem | Chia chương trình › tổ › món, cộng khớp | |
| 3 | ✏ Tên NĐT gõ tên | Ô chọn + bản in ghi tên | |
| 4 | Lọc Hội = Trực tiếp | Chỉ món vay trực tiếp | |

**Ghi chú kỹ thuật 3.385:** món tính = có số KU và (dư nợ / QH / khoanh > 0). `skCH().ndt`: '' tất cả · '-' mã trống · mã.

### Danh sách thử trên máy thật (3.384.1)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổng hợp, Giao dịch xã › Giấy lĩnh tiền › Làm trống, KTGS › In Mẫu 06 / 16 | Như bản trước | |

**Ghi chú kỹ thuật 3.384.1:** hàm phục vụ riêng phép thử đặt trong `tests/tro_*.js` (nạp bằng `p.addInitScript`), không để trong app.

### Danh sách thử trên máy thật (3.384)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › Giấy lĩnh tiền 1 tổ | Số liệu như bản trước | |
| 2 | Tra cứu › 1 khách › danh sách món | Như bản trước | |
| 3 | Tab Tổ › TK 105 của tổ / TK cần đóng | Như bản trước | |

**Ghi chú kỹ thuật 3.384:** chỗ đọc bảng gốc còn được phép: lõi nạp (`22-so-lieu`, `22g-to`, `22k-nap-kt`) + kho (`29-kho`, `73-kho-chuan`). Hồi quy: `tools/hoiquy_pt.py` (CHUNG = danh sách file phần chung — đổi 1 file trong đó → chạy lại hết).

### Danh sách thử trên máy thật (3.383.7)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn Xã › Hội › Tổ, tắt app, mở lại | Vẫn đúng địa bàn đó | |
| 2 | Bấm 📌 nhỏ cạnh ô Xã, đổi sang xã khác, tắt mở lại | Về xã đã ghim, các ô dưới Tất cả | |
| 3 | Đổi Xã khi đang chọn Hội + Tổ | Hội, Ấp, Tổ về Tất cả | |
| 4 | Đổi Điểm GD khi đang chọn Hội | Hội giữ, Tổ về Tất cả | |
| 5 | Dải LỌC ĐỊA BÀN | Số tổ · khách · ngày + ▦ Chip ⬆ 📌 Về ghim nằm trên viền | |
| 6 | Tra cứu › thẻ tổ › 📊 Biến động TK 105 | Mở Sao kê đúng tổ, hiện báo cáo | |

**Ghi chú kỹ thuật 3.383.7:** `pvChungO` luôn trả `D.cauHinh.pvChung`; đầu phiên (PV_PHIEN !== D.cauHinh) áp ghim `pvApGhim(S, true)`. Ghim: `D.cauHinh.pvGhimO` (đồng bộ khối Số liệu theo tiền tố pvGhim). Dải tiêu đề `.pv-dau` (absolute top:-12px) thay `::before`; kiểu gọn ẩn mắt đường dẫn trên dải.

### Danh sách thử trên máy thật (3.383.6)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp Mẫu 31 + file Tổ trưởng 25/10 → Tra cứu › Tổ trưởng "linh" | Không còn tổ 0231094 | |
| 2 | Tab Tổ › ô tìm gõ mã tổ đã đóng | "Không thấy tổ khớp" | |
| 3 | Tổ của điểm GD có tổ dư nợ 0 | Chip "cần đóng tổ", rê chuột ghi còn / đã đóng TK 104 | |

**Ghi chú kỹ thuật 3.383.6:** `toDong0` là chỗ DUY NHẤT quyết định tổ hiện / ẩn (K.to / K.toAn / K.canDong / K.ngoaiDS); tab không lọc lại. `toDongNguon(t)` = căn cứ cần đóng.

### Danh sách thử trên máy thật (3.383.5)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › Tổ trưởng, lọc 1 ấp | Dòng Cộng n tổ = số dòng, TV / Có DN = tổng cột | |
| 2 | Danh sách dài, cuộn | Dòng cộng luôn hiện ở đáy | |
| 3 | Gõ chữ ô tìm Tra cứu → bấm ✕ | Ô trống, danh sách về ban đầu | |
| 4 | Thẻ tổ › 🏘 Tổ của điểm GD, cuộn chuột trong bảng | Chỉ bảng cuộn, hộp đứng yên, không giật | |
| 5 | Tra cứu › Tổ trưởng gõ "linh" (kỳ 25/10) | Không còn tổ 0231094 đã đóng | |

**Ghi chú kỹ thuật 3.383.5:** cộng từ `KHO.tvChuan` của đúng các tổ đã lọc (`tcToLoc`). Hộp Tổ của điểm GD: `tcBangRong` đo bảng 1 lần đặt `width` px, hộp `overflow:hidden` + bảng `flex:1` (1 thanh cuộn); `moHop` xóa `style.width`. `toDong0`: thiếu Danh sách tổ / LEN_31 → tổ dư nợ 0, không dòng nào `t105>0` (cả `K.lap`) → `K.toAn`.

### Danh sách thử trên máy thật (3.383.4)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › mở tổ có khách quá hạn / khoanh / 3T KHĐ | Ô dư nợ đỏ / tím / cam; rê chuột có giải thích | |
| 2 | Thẻ tổ › 🏘 Tổ của điểm GD (màn 1366) | Cửa sổ vừa bảng, không thanh cuộn ngang | |

**Ghi chú kỹ thuật 3.383.4:** màu theo món (`m.qh`, `m.kn`, `KHO.khdKy` theo KU); dòng gộp nhiều món lấy mức nặng nhất. Hộp dùng `:has(.tc-bt-khung)` + `width:fit-content`.

### Danh sách thử trên máy thật (3.383.3)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › mở 1 tổ có tổ trưởng / tổ phó đang vay | Nhãn TT / TP cạnh tên | |
| 2 | Tổ có TT đã tất nợ còn 105 | Dòng "Tất nợ · còn TGTK" vẫn có nhãn TT | |

**Ghi chú kỹ thuật 3.383.3:** mã KH tổ phó = `t.ds.phoKH` (Danh sách tổ) → `t.tt.phoKH` → `t.phoKH`.

### Danh sách thử trên máy thật (3.383.2)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH — danh sách khách / tổ, thẻ tổ | Chữ nhỏ gọn, nhiều dòng hơn, vẫn đọc rõ | |

**Ghi chú kỹ thuật 3.383.2:** khối CSS cuối `css/app.css` (3.383.2).

### Danh sách thử trên máy thật (3.383.1)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › Tìm theo Tổ trưởng | Tên cột thẳng với số / chữ bên dưới | |

**Ghi chú kỹ thuật 3.383.1:** CSS `table.tc-to-ds` (canh + độ rộng), `table.tc-kq-bang:not(.tc-to-ds) th:nth-child(n+2){text-align:center}`.

### Danh sách thử trên máy thật (3.383)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH › Lọc địa bàn: Xã + Hội (không chọn điểm) | Ra tổ / khách của Hội trong xã | |
| 2 | Chọn Ấp / KP | Danh sách tổ, khách theo ấp; ô Hội thu theo ấp | |
| 3 | Bấm ✕ cạnh ô Ấp | Chỉ ô Ấp về tất cả, ô khác giữ | |
| 4 | Tab Tổ / Sao kê / Tổng hợp chọn ấp | Lọc đúng, dòng phạm vi có tên ấp | |
| 5 | Thẻ tổ trong Tra cứu | Không còn Đã lập / In, Dòng thời gian | |

**Ghi chú kỹ thuật 3.383:** `PV_CAP` thêm `ap`; `pvApKhoa(t)` = xa|thon (hoặc tenThon), `pvApChu(t)`; `pvLuaChon` đa chiều lọc chéo hoi/ap/diem; `pvCha` ap = true khi đa chiều; `pvChon`: đổi xã bỏ ap, cấp khác giữ; `pvLoc` + ap; `pvChu` + ap; `pvGan` gắn 5 cấp (getter ap); khóa bộ nhớ đệm tab Tổ / bảng tổ + C.ap; `skPVTrucTiep`, Tổng hợp `thToTrongPV` tính ap. Nút `.pv-x`. `TC_KHOI_PHU` (js/22f).

### Danh sách thử trên máy thật (3.382)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › Sao kê / Tổng hợp / Thông tin tổ — xem vài báo cáo quen | Số liệu như trước | |

**Ghi chú kỹ thuật 3.382:** `js/73` thêm `kcGoc(x)` / `kcLap(x)` / `kcBang(x, loai)` nhận K hoặc B, giữ ngữ nghĩa cũ (bảng chưa nạp → undefined); `kcDung` nhận cả B (Tổng hợp, Sao kê tháng trước). t276: `node tests/t276.js --chup` ghi lại bản chụp — CHỈ khi anh duyệt đổi nội dung báo cáo.

### Danh sách thử trên máy thật (3.381)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › chọn tổ › In Mẫu 06 / 16 / 📋 Tóm tắt | Số liệu như trước 3.381 | |
| 2 | Tab Tổ › 1 tổ | Danh sách tổ viên, dư nợ, 105 như trước | |
| 3 | Sao kê › Biến động TK 105 | Như 3.380.1 | |

**Ghi chú kỹ thuật 3.381:** `js/73`: `kcDung(K)` → `K.kc = {B, dong, huy, lap, theoKH, theoKU, theoTo, to, nqh, nk, khd, gan}` (tham chiếu chỉ mục có sẵn của `slBo` / `toNap`, không chép); `kcTK(K, 'tk105'|'tk104')` dựng lại khi Sao kê đổi bản; `kcKH / kcKU / kcTo`. `toKhach` (js/22h) lấy dòng qua `kcTo`; `hvSaoKe` = `kcTK`.

### Danh sách thử trên máy thật (3.380.1)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sao kê › Biến động TK 105 › Xem / In | Tiêu đề ghi ngày 2 cột số dư; cột Ghi chú đủ chữ; chữ nhỏ gọn | |

**Ghi chú kỹ thuật 3.380.1:** `hvBaoCao` (js/72): bảng lớp `hv105` (10 pt, `td.gc` cho xuống dòng — thắng `.trang td{white-space:nowrap}` của skInTu); ngày đầu = `tdnCuoiKy(kyLui(tháng Sao kê, −1))`.

### Danh sách thử trên máy thật (3.380) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp Mẫu 31 + Sao kê TK 105 cùng ngày → Số liệu › Sao kê › kỳ ngày đó › chọn 1 tổ › Biến động TK 105 › Xem | Bảng đủ 14 cột, xếp mã KH, dòng tóm tắt "tổ trưởng đã trích 105…" | |
| 2 | So 2–3 khách với Sao kê TK 105 / Mẫu 31 | Số dư, trả lãi, trả gốc khớp file; khách chuyển vào = công thức | |
| 3 | In / Excel | Đủ cột, có dòng cộng tổ | |

**Ghi chú kỹ thuật 3.380:** `js/72`: `hvSaoKe(K)` (K.tk.tk105 theo mã KH), `hvGhep(rows, sk)` → [{kh, ten, to, mon[], dn, ct{}, laiDT, thuLai{th,qh}, thuGoc{th,qh,kn}, ngayGD, tk{ds, cuoi, dau, nguon}, tinh{traLai, traGoc, tangGiam, vao, ctGhi, ky}}] — trường Mẫu 31 `c_lai_dt_trong_thang`, `c_thu_lai_th_thang`, `c_thu_lai_qh_thang`, `tnTH/tnQH/tnK`; bỏ khách không dư nợ và không phát sinh tháng. `hvBaoCao(rows, ngay)` dùng `skBang`. `js/29` cửa `hoVay`, `hoVayKH`. `js/22h` SK_BC `b105` (nhóm tt), gọi trước `skMau31()` để chạy cả kỳ ngày. Lệch nhỏ đã biết (file thật): ~16 KU lặp + 27 món không tổ → trả lãi app thấp hơn tổng file ~0,07%.

### Danh sách thử trên máy thật (3.379) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › 🎯 Đột xuất › chọn 1 tổ › 📋 Tóm tắt tổ | Mở hộp in, 1 mặt A4, dòng "số liệu đến ngày …" đúng ngày số liệu | |
| 2 | Tổ có quá hạn / lãi tồn | Hộ quá hạn đầu bảng, chữ đỏ; số khớp tab | |
| 3 | Điền Ngày kiểm tra rồi bấm 📋 | Đầu trang ghi ngày kiểm tra | |
| 4 | KTGS › 📅 Định kỳ › tích 2 tổ › 📋 Tóm tắt 2 tổ | 1 file, mỗi tổ 1 trang, số liệu đến ngày cuối tháng | |

**Ghi chú kỹ thuật 3.379:** `js/71` (cắm rút, nạp sau js/70): `ktttSo(t)` → `{s, ngay, nguon, soMon, nTK, nLT, nLTC, nQH, monKHD, hoKHD, gn, ct:[[ten, dn]], ho:[{kh, ten, dn, v:[{chu, do}], uu}]}` (uu 1 QH/khoanh · 2 KHĐ / lãi tồn > 6 tháng · 3 lãi tồn · 4 không 105 · 5 mới GN); `ktttHTML(x)` (KTTT_TOI_DA = 18); `ktttIn(ma)` / `ktttInDs(ts)` → `ktttVo(ds)` (mỗi tổ `<section class="kttt">`, sang trang) → `inBlob`; định kỳ bật `KT_SO_CUNG` khi tính; lệnh `kttt.in` (data-m) · `kttt.dk`; nút định kỳ ở `ktDKVeG` (`js/22e`). Nút ở `ktChonHTML` (`js/22b`) chỉ hiện khi có `ktttIn`.

### Danh sách thử trên máy thật (3.378) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › 🎯 Đột xuất › chọn tổ › In › hộp Chọn khi in | Mẫu 16 có 3 ô Ưu điểm / Tồn tại / Kiến nghị; Bảng II chỉ Để trống / Điền đầy đủ | |
| 2 | Chọn Tồn tại = Để chấm, còn lại ghi → Word | III.2 Tồn tại dòng chấm; Ưu điểm, Kiến nghị có ý ghi sẵn | |
| 3 | Bảng II Để trống → Word | Ô kết quả trống (không chấm), 2 dòng có số trống | |
| 4 | Mẫu 04 › hộp Chọn khi in | 2 ô Nhận xét / Kiến nghị chọn riêng | |

**Ghi chú kỹ thuật 3.378:** `js/22b` `KT_IN_MD` thêm `nxud, nxtt, nxkn` (m16), `nxto, nxkn` (m04); `ktInLay` khóa `nx*` chưa có → theo `nx` cũ; `b2==='cham'` → '' và `b2o[i].c==='cham'` → 'trong'. `ktNxCo(v, p)` (p = ud · tt · kn · to; v chỉ có `nx` thì theo `nx`). `ktNhanXet16` lọc từng phần, `kq1/kq2` theo `ktB16Mac(v)==='dien'`; bỏ `KT_B16_CHAM`, `ktB16NX`. `js/22d` `ktBC04`: `nx` theo `ktNxCo(v,'to')`, `kn` theo `ktNxCo(v,'kn')`. `js/56` `KT_B2_CACH` bỏ 'cham'.

### Danh sách thử trên máy thật (3.377) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › quét lại 1 CCCD đã lưu | Kết quả đọc có "⚠ Đã có CCCD này trong tủ (lưu ngày …)", ◉ Thay bản cũ; Lưu → bản cũ vào 🗑, bản mới không "(2)" | |
| 2 | Sổ hộ vay › 🪪 Quét CCCD đã lưu, tích Lưu ảnh vào tủ | Có dòng báo trùng + chọn Thay / Lưu thêm | |
| 3 | Scan (máy tính) › nút ▣ | Bật / tắt khung xem như Văn bản | |
| 4 | Chân thanh bên › ⏱ | Mở hộp Đo tốc độ, 📋 Chép gửi em | |

**Ghi chú kỹ thuật 3.377:** `js/70`: `BTC {scan:{i:'thay'|'them'}, qc}`, `btcTim(cccd, ma)` (D.scan `che==='the'`, so `cccd`/`khoaCCCD` 9+ số hoặc `maKH`), `btcScanThay()`, `btcRac()` → `chuyenVaoRac`; bọc `sxVeDoc` (chèn `.btc` vào dòng người i của `#sx-doc`), `scanLuuTu` (trước khi lưu), `qcVeKQ`, `qcLuuTu`. `js/69` `bcaNutDo()` thêm `[data-lenh=dtd.mo]` vào `#thanh-ben .tb-chan`. `js/11` `tlKieuXemHTML` + menu ⋯ không loại Scan.

### Danh sách thử trên máy thật (3.376) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › Quét 1 CCCD (2 mặt) | Chip "Đã tự cắt, nắn…" hiện ở ĐẦU màn hình, không che nút "Xem trước ›" | |
| 2 | Sau khi quét: ⚙ / ☰ Thêm › ⏱ Đo tốc độ › 📋 Chép → gửi em | Có dòng "Scan · …" từng bước (để em sửa đúng bước chậm) | |

**Ghi chú kỹ thuật 3.376:** `css/app.css`: `body:has(#hop.hien) .bao:not(.goc){top…;bottom:auto}`, `.bao.hien:not(:has(button)){pointer-events:none}`. `js/68` `dtdGan()` thêm `thuGoc, heicRaJPG, xuLyAnhScan, timKhungThe, timKhungGiay, nanPhoiCanh, apLoc, docCCCD, sxQR, sxOCR, napOCR`.

### Danh sách thử trên máy thật (3.375) — máy tính, anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Văn bản › mở 1 văn bản › ✕ tắt khung xem | Góc trên phải hiện "▣ Xem trước"; bấm → khung mở lại, nút ẩn | |
| 2 | Văn bản (chưa chọn mục — khung thu) | Nút "▣ Xem trước" hiện; bấm → khung mở (trống) tới khi đổi tab | |

**Ghi chú kỹ thuật 3.375:** `js/69`: `#bca-pv-nut` chèn trước `.dau .gio`, hiện khi `body.bca-pv-an` (tab `[1,2,3,4,5,6]` và (`anPV` hoặc `.than.bca-pvgon`)); `BCA_MO` = tab anh bấm mở (không thu tự động); bọc thêm `anPreview / hienPreview`.

### Danh sách thử trên máy thật (3.374) — iPhone (bản gọn dt.html), anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📱 › Văn bản › mở 1 văn bản | Xem trong app; chỉ còn nút 📤 Gửi · ⬇ Lưu máy (không còn 📌 Ghim) | |
| 2 | Bật chế độ máy bay › mở văn bản | Báo "Chưa có mạng — văn bản chỉ xem khi có mạng" | |

**Ghi chú kỹ thuật 3.374:** `js/dt/dt-nen.js` bỏ `OFF_TOI / off / offDung / offLuu / offDoc / offXoa`, thêm `donGhimCu()` (xóa `vb:<id>` + `CH.vbOff`, gọi ở `moApp`); `dt-giao-dien.js` bỏ chip / nút / lọc ghim, `veXem` tải thẳng `DT.taiFile`.

### Danh sách thử trên máy thật (3.373) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | iPhone mở app lần đầu trong ngày | Chân trang có chip "🟡 Nối Drive"; bấm 1 lần → 🟢 (chip ẩn); không còn thông báo nổi rối | |
| 2 | Đóng app, mở lại trong 1 giờ | Nối ngay, không hỏi Google; ☰ Thêm › ⏱ ghi "Nối Drive (dùng lại quyền cũ)" | |
| 3 | Máy tính › Văn bản (chưa chọn mục) | Danh sách rộng hết; bấm 1 văn bản → khung xem mở ra | |
| 4 | Máy tính › đầu trang | Ghi "📊 Số liệu › 👥 Tổ TK&VV" theo tab đang mở | |
| 5 | Máy tính › Văn bản › chip "⚠ N văn bản khai thiếu" | Bấm → chỉ hiện văn bản khai thiếu; bấm lại → hiện hết | |

**Ghi chú kỹ thuật 3.373:** `js/06c-drive.js`: `DR_TK` (localStorage `tuhoso_drtk` = {t, h}), `drCatQuyen / drKhoiPhuc / drLyDo / drChuaNoi / drSauKhiNoi`, `DR.lyDo`, `DR.quyenCu`; `noiDrive(true)` khôi phục quyền trước khi gọi Google; lỗi xin lại ngầm giữ `sanSang` khi `hetHan` còn; `capNhatChip` 1 chip + `body[data-drive]` (xanh / vang / do / xam) cho `css/dt-may.css`. `js/69-bo-cuc-a.js` bọc `doiNgan / dhVe / veVanBan / veDay` + MutationObserver `#cotphai`; `DH_MUC.nap.do` thành getter.

### Danh sách thử trên máy thật (3.372) — iPhone
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Thanh dưới | Hôm nay · Tra cứu · Văn bản · Scan · Thêm; bấm đúng tab | |
| 2 | Tra cứu | Danh sách khách lên ngay, Lọc địa bàn 1 hàng | |
| 3 | ☰ Thêm | Có GD xã, Số liệu, Hồ sơ, Cài đặt, Thùng rác, 📱 Bản điện thoại gọn, ⏱ Đo tốc độ | |
| 4 | **Mở app (đã nối Drive) → dùng 1–2 phút → ☰ Thêm › ⏱ Đo tốc độ › 📋 Chép → gửi em** | Có số đo từng bước | |

**Ghi chú kỹ thuật 3.372:** Đ6 bọc `DT_NUT` / `dtDang` / `dtVe` / `dtThem` / `ttVe` trong `js/66` (chỉ ≤ 600 px). `js/68` bọc hàm toàn cục theo tên (`noiDrive`, `taiChiMucTuDrive`, `dayChiMucLenDrive`, `dongBoScan`, `dongBoCauHinh`, `slTaiTuDrive`, `slTaiBlob`, `goiDrive`, `KHO.nap`) lúc `load`. `js/41` `.then` cuối luồng đọc CCCD ngầm kiểm `if(!SX) return;`. Nút 📱 nổi (`#ve-dt`, TK 3) giữ nguyên — có thêm lối ☰ Thêm.

### Danh sách thử trên máy thật (3.371) — iPhone, anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | iPhone › Thêm › Văn bản | Hàng nút không cắt chữ; mỗi văn bản thấy số hiệu + trích yếu 2 dòng; ⋯ có Sửa thông tin | |
| 2 | iPhone › Thêm › Scan | Danh sách bản quét lên ngay dưới nút Quét; thẻ gọn | |
| 3 | Máy tính › Văn bản / Scan | Như cũ (không đổi) | |

**Ghi chú kỹ thuật 3.371:** `css/dt-may-vbsc.css` nạp sau `css/dt-may.css` với `media="(max-width:600px)"`; chọn theo `#nam-vb .dau-tab`, `#ds-vb .d2`, `#tr4 .sc-dt / .thanh-chon.sx-thanh / .cam-kieu / .sc-d`. Phép thử t267 so khổ 390 và 1440.

### Danh sách thử trên máy thật (3.370) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy tính › Giao dịch xã › chọn Truông Mít › 12/GDX | Dòng 📍 "mã TXN0548302"; mẫu in "Mã điểm giao dịch: TXN0548302" | |
| 2 | iPhone mở app | Vào thẳng bản chính (giống máy tính); nút 📱 nhỏ góc phải → bản gọn; bản gọn bấm 🖥 về lại | |

**Ghi chú kỹ thuật 3.370:** `gdxMaDu(ma, maXa)` trong `gdxDsDiem` (nhánh số liệu `KHO`); nhánh danh mục ⚙ vốn đã đủ mã. `index.html` dòng 7–8 chỉ còn `?dt=1` → `dt.html`; `js/60-ve-dt.js` bỏ điều kiện cờ `tuhoso_ban`.

### Danh sách thử trên máy thật (3.369)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp & KT › nạp lại Mẫu 31 tháng mới | Đứng màn hình ngắn hơn rõ (máy tính ~1 giây); số khách / dư nợ như trước | |
| 2 | Nạp Mẫu 01/TV, Sao kê TK 105 | Nhận đúng loại như cũ | |
| 3 | Tab Tổ TK&VV / Tra cứu sau khi nạp | Số liệu như cũ | |

**Ghi chú kỹ thuật 3.369:** `tv01Doc` / `tkSKDoc` dò tên cột ở `a.slice(0, 100)` — file nào có dòng tên cột sau dòng 100 sẽ không nhận (thực tế dòng 5–30). `slNen` / `slMoBang` phải cho kết quả y hệt bản cũ (t310 giữ bản cũ để so) — dữ liệu đã lưu đọc được như trước. Công cụ đo: `do_nap.js` (scratchpad, không vào repo) — số đo ghi ở `docs/TU_VAN_KY_THUAT.md` mục 1.

### Danh sách thử trên máy thật (3.368)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › Tìm theo Tổ trưởng (không gõ gì → mọi tổ) | Đủ 7 cột đến Hội, không phải cuộn ngang | |
| 2 | Rê chuột vào ô Hội / tên dài / tiêu đề TV | Hiện tên đủ | |

**Ghi chú kỹ thuật 3.368:** `table.tc-to-ds{table-layout:fixed}` + `th:nth-child(n){width:%}` — thêm / bớt cột ở `tcToTim` thì sửa lại tỷ lệ trong `css/app.css`.

### Danh sách thử trên máy thật (3.367)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › thẻ tổ / thẻ khách | Dòng thời gian chỉ 1 dòng "▸ … bấm mở" | |
| 2 | Bấm dòng đó → Xem năm 2026 | Danh sách sự kiện như cũ; bấm lại tiêu đề → thu gọn | |

### Danh sách thử trên máy thật (3.366) — iPhone, bản máy tính
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › Sao kê › 👁 Xem | Thanh nút 1 hàng, vuốt ngang thấy đủ nút | |
| 2 | Chụm / mở 2 ngón trên trang | Trang phóng to / thu nhỏ, ô % đổi theo, thanh nút không phóng | |
| 3 | ‹ › / ô số trang / In / PDF | Chạy như cũ | |

**Ghi chú kỹ thuật 3.366:** `trDan` gắn `touchstart` (passive) / `touchmove` (không passive, `preventDefault` khi 2 ngón) / `touchend` trên document của khung xem → `zm = z0 × khoảng cách / khoảng cách đầu`, `vua=''`, gọi `thu()` (kẹp 20–400%). CSS `@media (max-width:600px)` trong chuỗi CSS khung xem.

### Danh sách thử trên máy thật (3.365)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | iPhone (bản máy tính) › Số liệu › Tổ TK&VV › vuốt ngang bảng | Cột tên đứng yên, tiêu đề thẳng cột số, thấy được Dư nợ + Quá hạn + Khoanh | |
| 2 | Chụm 2 ngón trên bảng | Phóng to / thu nhỏ được | |
| 3 | Máy tính, thu nhỏ cửa sổ cho bảng tổ cuộn ngang | Ô "Xã / Điểm GD" luôn nằm trên, không bị tiêu đề cột khác đè | |

**Ghi chú kỹ thuật 3.365:** luật chung `td:first-child,th:first-child{position:sticky;left:0}` (app.css ~1222) + `.to-cuon-khung thead th{sticky top; z-index:2}` → ô góc cần `z-index:3`. Bảng khác có tiêu đề đứng yên + cột đầu đứng yên thì cũng cần z-index góc cao hơn.

### Danh sách thử trên máy thật (3.364) — iPhone, bản máy tính
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở tab Hôm nay | Thấy trọn lịch tháng + đầu sổ ngày trong 1 màn hình | |
| 2 | Chạm 1 ngày trên lịch, ‹ › đổi tháng, Danh sách / Tính ngày | Chạy như cũ, ô chạm không bị nhầm ngày bên cạnh | |
| 3 | Hạn trả HSSV / Địa bàn / CT vay | Mở công cụ như cũ | |

**Ghi chú kỹ thuật 3.364:** Đ3 chỉ thêm khối cuối `css/dt-may.css` (bộ chọn `#lich …`, `.blv-*`, `.nk-trang …`); ô lịch 34 px = cỡ bản máy tính ≥ 900 px (`css/app.css` khối `@media (min-width:900px)`).

### Danh sách thử trên máy thật (3.363)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Dùng app bình thường | Không có chip ⚠ ở chân trang (không lỗi) | |
| 2 | Nếu thấy chip "⚠ N lỗi" | Bấm → danh sách lỗi; 📋 Chép → dán vào Zalo gửi em được | |
| 3 | 🗑 Xóa nhật ký | Chip ẩn, danh sách trống | |

**Ghi chú kỹ thuật 3.363:** `js/67-nhat-ky-loi.js` gắn `window.addEventListener('error', …, true)` (capture — lỗi tải tài nguyên có `target` ≠ window, không `message` → bỏ) + `unhandledrejection`. Khóa `tuhoso_loi` chỉ trên máy, không đồng bộ Drive. Chép dùng `navigator.clipboard` (cần https / localhost; file:// trên iPhone có thể không cho → báo chụp màn hình).

### Danh sách thử trên máy thật (3.362) — iPhone, bản máy tính
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › mở 1 khách có 2–3 món | Mỗi món 1 thẻ nhỏ có chip màu; xem trọn thông tin khách + món trong khoảng 1–1,5 màn hình | |
| 2 | Khách có món quá hạn / khoanh | Viền trái + chip đỏ / vàng | |
| 3 | Ô kỳ trên đầu trang | "T8/26 · M31"; bấm mở thấy đủ chữ, đổi kỳ chạy bình thường | |

**Ghi chú kỹ thuật 3.362:** thẻ món vay dựa thứ tự cột cố định của bảng `table.kh-mon` (js/22f) — đổi cột ở 22f thì sửa nhãn `nth-child` trong `css/dt-may.css`. `js/66-dt-may.js` chỉ bọc khi `matchMedia('(max-width:600px)')`.

### Danh sách thử trên máy thật (3.361) — iPhone, mở bản máy tính (nút 🖥 ở bản điện thoại)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở Số liệu › Tra cứu KH | Đầu trang 2 hàng gọn (⬅ · kỳ · ❓ 🧰 🗑 ⚙ / ô tìm); khung Lọc địa bàn gọn; hàng chip Tìm theo vuốt ngang được | |
| 2 | Hôm nay, Tổ TK&VV, Tổng hợp | Không màn nào bị tràn ngang ngoài ý muốn; nút 📱 góc phải không che chữ quan trọng | |
| 3 | Máy tính (Chrome) | Giao diện y như trước | |
| 4 | Scan › quét CCCD khi vừa mở app | Đặt tên bản scan bình thường, không treo | |

**Ghi chú kỹ thuật 3.361:** CSS điện thoại chỉ ở `css/dt-may.css` (không thêm vào `app.css`); thêm quy tắc mới vào đúng nhóm trong file; phép thử khổ hẹp dải `t300–t349`.

### Danh sách thử trên máy thật (3.360) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Báo cáo của tôi: khai cột Mã KH · Dư nợ · Họ tên (dư nợ đứng thứ 2), nhóm theo Điểm › Hội › Tổ | Dòng cộng nhóm + Tổng cộng có số ở cột Dư nợ | |
| 2 | Thẻ khách hết gốc nhưng còn lãi tồn › 📅 Dòng thời gian | "Hết gốc · còn lãi tồn … (chưa tất nợ)", không ghi "Tất nợ" | |

**Ghi chú kỹ thuật 3.360:** `dkHTML` tính `g` = số cột trước cột `tien`/`cong` đầu tiên (1–3) cho ô gộp dòng nhóm / Tổng cộng. `DTG_T[kỳ].kh[x].lt` = lãi tồn cộng các món (`laiTon`).

### Danh sách thử trên máy thật (3.359) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › mở 1 khách có nhiều tháng số liệu › 📅 Dòng thời gian › Xem năm 2026 | Dòng "Theo Mẫu 31 T…" + các sự kiện (tất nợ, vay thêm, QH…) đúng thực tế | |
| 2 | Thẻ tổ › 📅 › Xem năm 2026 | Khách vào / không còn món vay theo tháng, đổi tổ trưởng (nếu có) | |
| 3 | Khách đã chuyển tổ trong năm | Có dòng "Chuyển tổ A → B" đúng tháng | |

**Ghi chú kỹ thuật 3.359:** `dtgNap(năm)` → [{ky, t}] (đọc `KHO.dsBang('hstd')` kỳ tháng của năm + `<năm-1>-12`); `dtgKH(kh, T)` / `dtgTo(ma, T)` → [{ky, chu, lop}]. Chỉ dùng Mẫu 31 (chưa dùng 01/TV — tổ viên chỉ còn TK 105 không có trong dòng thời gian).

### Danh sách thử trên máy thật (3.358) — thử được từ tháng 1/2027 (khi có Mẫu 31 + 01/TV tháng 1 và vẫn giữ số liệu tháng 12/2026)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổ TK&VV kỳ T1/2027 › 👁 Sổ tổ viên | Khách tất nợ năm 2026 còn TK 105: "Tất nợ 2026 · còn TK 105", có ngày tất nợ + CT, nguồn "01/TV · sổ 2026" | |
| 2 | Tra cứu › thẻ tổ có khách như trên | "Tất nợ 2026 (ngày) · CT … · còn TGTK — vẫn trong tổ" | |
| 3 | Nạp & KT › Kiểm tra số liệu T1/2027 | Dòng thành viên tổ ghi "N khách tất nợ năm trước, có trong sổ chốt 31/12" | |

**Ghi chú kỹ thuật 3.358:** `stvHen(K)` gọi trong `tvChuan` khi `bs>0`; nạp `KHO.nap(<năm-1>-12)` (giữ trong `TO_KS`, `slBot` tự bỏ khi vượt giới hạn kỳ). Tra: `stvChotCua(kh, ky)`; chữ: `stvChotChu(c, ky)`.

### Danh sách thử trên máy thật (3.357) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổ TK&VV (kỳ tháng có Mẫu 01/TV) › 👁 Sổ tổ viên | Mỗi tổ viên 1 dòng; ghi chú "Đã đối chiếu Mẫu 01/TV …, bù N khách"; khách chỉ có ở 01/TV ghi nguồn 01/TV | |
| 2 | Chọn 1 tổ / 1 điểm ở cây địa bàn rồi mở lại | Chỉ tổ viên phạm vi đó; nhóm Từng tổ có dòng cộng | |
| 3 | Chip Gồm: chỉ "Tất nợ · còn TK 105" + "Cần cho ra khỏi tổ" | Danh sách khách đã tất nợ; dòng cần cho ra tô vàng | |
| 4 | Nạp & KT › xóa ô Mẫu 31 tháng 12 (khi có) | App hỏi trước "số liệu chốt sổ tổ viên 31/12" | |

**Ghi chú kỹ thuật 3.357:** sổ = `DANG_KY` mã `sotv` (o:'to' — kỳ `KHO.kyDung()`, phạm vi `toCH()`); dòng từ `tvChuan(t, K)` từng tổ (`KHO.dsToKy`), CT + ngày tất nợ từ `KHO.monKy(K, kh)` (`stvMon`). `slSoChot(loai, ky)` = Mẫu 31 / 01/TV kỳ `YYYY-12`.

### Danh sách thử trên máy thật (3.356) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổng hợp › 🧩 Báo cáo của tôi › ⚙ Tạo / sửa › ＋ Tạo báo cáo mới; đặt tên, chọn Từng khách, bật cột SĐT, 💾 Lưu và xem | Hộp xem trước đúng khuôn in chuẩn, mỗi khách 1 dòng | |
| 2 | Đổi phạm vi (xã / hội) ở tab Tổng hợp rồi mở lại báo cáo | Chỉ dòng trong phạm vi; dòng phạm vi dưới ngày | |
| 3 | Kỳ có file Tổng dư nợ theo CT | Cuối báo cáo: "Đối chiếu Mẫu 31 với Tổng dư nợ theo CT (TW)…" — so số thật với file TW | |
| 4 | Máy thứ 2 (cùng Drive) mở tab Tổng hợp | Thấy báo cáo đã tạo (đồng bộ cài đặt) | |
| 5 | ✎ Sửa đổi cột / 🗑 Xóa | Đổi theo; xóa có hỏi | |

**Ghi chú kỹ thuật 3.356:** khai báo `D.cauHinh.bcToi[] = {id, ten, gop:'mon'|'kh'|'to', cot[], loc[], nhom, kho}`; `btDangKyHet()` đăng ký lại `DANG_KY` mã `bt_<id>` mỗi lần vẽ tab; danh mục cột `BT_COT` (thêm cột = thêm 1 dòng + gán giá trị trong `btDong`). Đối chiếu `btDoiChieu(ctx)` lọc 2 phía theo `xa` / `dv` / `ct` / `nguon` của dòng.

### Danh sách thử trên máy thật (3.355) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sao kê › 🧩 Báo cáo chuẩn mới › 👁 Danh sách nợ cần xử lý | Hộp xem trước: logo + NGÂN HÀNG CHÍNH SÁCH XÃ HỘI góc trái, tên giữa, ngày, Đơn vị tính: đồng, A4 dọc, Trang x/y | |
| 2 | Bấm chip Quá hạn / Khoanh / 3 tháng KHĐ / KU chưa GN | Danh sách đổi theo; mở lại vẫn nhớ lựa chọn | |
| 3 | Nhóm theo Điểm › Hội › Tổ / Xã › Điểm / Không nhóm | Có dòng cộng từng nhóm (đậm), Tổng cộng cuối | |
| 4 | Chọn 1 xã / điểm ở cây phạm vi Sao kê rồi mở lại | Chỉ còn dòng của phạm vi đó; dòng phạm vi dưới ngày | |
| 5 | Excel / Word / In | Excel có đầu trang + 2 tầng tiêu đề; 📜 nhật ký ghi "Danh sách nợ cần xử lý" | |

**Ghi chú kỹ thuật 3.355:** báo cáo mới = 1 khối `DANG_KY({ma, ten, o:'sk'|'to', loai:'ds'|'bang', dvt, mauSo, nhom, nhomMd, chon:[{k, ten, kieu:'tich'|'mot', ds, md}], du(ctx) → {cot:[{k, ten, tien, so, nhom, nw, nho, rong}], dong:[{…, _dv:dkDV(K, maTo), _lop}], ghi}})` cuối `js/62`; ctx = {K, S, pv, chon, ngay}. Lấy số qua `KHO` / `K.B`. Bản in đi qua `inChuan` (bỏ `<script>`), chia trang do `trDan` đọc `.phieu[data-tr-ngang|mg|cb|so|1trang]`.

### Danh sách thử trên máy thật (3.354) — iPhone, anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app (Safari / biểu tượng màn hình chính) | Vào thẳng Hôm nay, không hiện lỗi; thanh dưới 5 nút có biểu tượng rõ | |
| 2 | Khách › Tải số liệu từ Drive → đăng nhập Google **đúng tài khoản máy tính** | Có số liệu; nếu lỗi thì chụp màn hình dòng báo gửi em | |
| 3 | Hôm nay › ＋ Thêm việc → ⟳ trên cùng → máy tính mở tab Hôm nay | Việc hiện ở lịch máy tính (máy tính tự tải lịch khi mở / nối Drive) | |
| 4 | Máy tính thêm việc → điện thoại ⟳ | Việc hiện ở điện thoại | |
| 5 | Ghi chú: gõ dòng, Enter; tick; ✕ | Đúng như sổ gạch dòng máy tính | |

**Ghi chú kỹ thuật 3.354:** `js/dt/dt-lich.js` mới (`DTL`: âm lịch chép nguyên văn js/04b, `co / xong / doiXong / viecNgay / dongNgay / mauNgay / xoaViec / xoaNote / gop / goiDay`). `dt-nen.js`: `lichNap / lichDoi / lichDongBo` (IndexedDB `lich` mã hóa, `CH.lichCho / lichLuc`, `ghiJSON` multipart), lỗi `dangNhap` theo `error_callback.type`, `taiGoi` báo thư mục thiếu. `dt-giao-dien.js`: `IC` (SVG), `trHom / veHom / veThang / oNgay / trViec / ganHom / ganViec`, `danhTab` (app `pageInit` + `pageBeforeIn`), route `/` = Hôm nay, `/tra/` = Khách, `/viec/:id/`; `moApp` bỏ `dongBo(true)`; `tongQuan / rongSL`. `dt.html` thanh `tabbar-icons` 5 nút SVG; `dt-sw.js` + `dt-lich.js`.

### Danh sách thử trên máy thật (3.353) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › Sau giải ngân › in Mẫu 06 cho 1 tổ | Tra cứu › thẻ tổ đó + thẻ khách trong phiếu có "Mẫu 06/TD — kiểm tra sau giải ngân" | |

**Ghi chú kỹ thuật 3.353:** `ktGNNk()` đọc `KT_GN_XEM.gts[i].p` (tổ `p.x.t.ma`, món `p.mon[].kh`).

### Danh sách thử trên máy thật (3.353 phần 1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › danh sách có ảnh nhỏ; mở 1 bản CCCD xem 2 mặt | Ảnh hiện như cũ | |
| 2 | Theo dõi nợ › mở món có ảnh | Ảnh hiện như cũ | |

**Ghi chú kỹ thuật 3.353 phần 1:** gắn ảnh từ Blob vào `<img>`: dùng `anhTam(im, b)` (js/02) — không viết `im.src = URL.createObjectURL(b)` trần.

### Danh sách thử trên máy thật (3.352) — iPhone, anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Văn bản › ⟳ › bấm 1 văn bản PDF | Hiện trong app, đủ trang, vừa ngang màn, kéo xem được; có nút Lùi | |
| 2 | Trong trang xem bấm 📌 Ghim → bật chế độ máy bay → mở lại app › Văn bản › chip 📌 Đã ghim › mở | Danh sách hiện ngay; văn bản ghim xem được không mạng | |
| 3 | Chip năm / loại | Lọc đúng, lần sau mở vẫn nhớ | |
| 4 | 📤 Gửi · ⬇ Lưu máy trong trang xem | Bảng chia sẻ iOS (Zalo, Tệp) | |

**Ghi chú kỹ thuật 3.352:** `dt-nen.js`: `offLuu / offDoc / offXoa / offDung / off` (`CH.vbOff` = {id:{kt,ten,luc}}, file ở IndexedDB `vb:<id>` {iv,c,type}, trần `OFF_TOI` 200 MB), `dsCat / dsNap` (`ds:vanban`, `ds:scan`; `taiKhoi` + `datDS` tự cất). `dt-giao-dien.js`: `vbLoc / locThem / chipVB` (`DT.ch.vbLoc`), route `/xem/:l/:id/` (`trXem / veXem / vePDF / napPDF`), `tacVu(..., boXem)`; bỏ `moMuc`. pdf.js nạp qua `napMotTV` (worker giữ nguyên chữ → blob URL).

### Danh sách thử trên máy thật (3.351) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › Tìm theo Tổ trưởng, chưa gõ (Toàn PGD) | "371 tổ", đủ 371 dòng; cột Thành viên ngay sau Mã tổ, không bị che | |

**Ghi chú kỹ thuật 3.351:** 371 tổ × `KHO.tvChuan` mỗi lần vẽ — nếu máy chậm sẽ thêm đệm theo kỳ.

### Danh sách thử trên máy thật (3.350) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › thẻ tổ có hộ tất nợ còn TGTK | Dòng "Tất nợ dd/mm/yyyy · còn TGTK — vẫn trong tổ" — ngày khớp ngày tất toán món cuối | |

**Ghi chú kỹ thuật 3.350:** ngày tất nợ lấy `max(ngdg)` các dòng món của khách trong `KHO.monKy(TC_K, kh)` — là ngày GD gần nhất, gần đúng ngày tất toán (Mẫu 31 không có cột ngày tất toán riêng).

### Danh sách thử trên máy thật (3.349) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở vài hộp bất kỳ (Thêm file, Sao lưu, Hồ sơ, KTGS…) → bấm Đóng / Thôi | Hộp đóng như cũ | |

**Ghi chú kỹ thuật 3.349:** nút đóng hộp mới viết `data-lenh="hop.dong"` (hoặc `GD.nut({chu:'Đóng (Esc)', lenh:'hop.dong'})`), không viết `onclick="dongHop()"`. Còn ~1.369 onclick — đổi dần theo khối khi sửa từng tab.

### Danh sách thử trên máy thật (3.348) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay: chọn khách → 🖨 In / 📝 Word 1 mẫu | Tra cứu khách đó → khối "📜 Đã lập / in" có mẫu + ngày | |
| 2 | Hồ sơ Tổ: in 1 mẫu cho 1 tổ | Thẻ tổ (Tra cứu › Tổ trưởng) có mẫu đó | |
| 3 | KTGS: in Mẫu 06 / 04 | Hộp 📜 (xem hết) có dòng mang tên mẫu | |
| 4 | Máy thứ 2 sau đồng bộ Drive | Thấy nhật ký máy 1 | |

**Ghi chú kỹ thuật 3.348:** `D.nkIn` thêm vào: `luuNgay` (02), đọc lúc mở (02), `LN.dungBanCu` / `datCach` (34), chỉ mục Drive xuất + `gopTuRemote` (17, `gopTheoSua`). Nơi in muốn ghi rõ khách / tổ: truyền `nk:{mau, kh:[], to:[], ky}` vào `xuatHang` (KTGS chưa gắn tổ — làm khi sửa KTGS).

### Danh sách thử trên máy thật (3.347) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › tổ Bùi Thị Thảo (số liệu ngày 19/10) | Dòng ghi "Số liệu ngày 19/10/2026 · theo Mẫu 31 ngày này…"; hộ dư nợ 0 đã ra khỏi tổ không còn trong danh sách | |
| 2 | Tra cứu 1 khách bất kỳ | Món vay, dư nợ theo ngày 19/10 (cùng mốc thẻ tổ) | |
| 3 | Tab Tổ chọn kỳ chốt T9 | Số thành viên như cũ (vẫn bù theo 01/TV T9) | |

**Ghi chú kỹ thuật 3.347:** `tvChuan` bỏ bù khi `String(K.ky).length!==7`; `tcNap` chọn `toDsKy()` có `slThuTu` lớn nhất.

### Danh sách thử trên máy thật (3.346) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📥 Nạp & KT: mở, đổi tháng, ▸ ma trận, 🔍 Kiểm tra, nạp 1 file | Như cũ | |
| 2 | Tra cứu KH: tìm tên / CCCD / mã / Tổ trưởng; mở thẻ khách, thẻ tổ; 🔍 Kiểm trùng | Như cũ | |
| 3 | Tổ TK&VV: chọn xã → tổ, chip lọc, in / Excel danh sách; Sao kê, cấp Hội, Tổng hợp, Thông tin tổ | Như cũ, số liệu không đổi | |
| 4 | KTGS: mở tab, đổi tháng kiểm tra, in Mẫu 06 / 16 / 04 / KH | Bản in như cũ | |
| 5 | Hồ sơ Tổ / Hồ sơ vay / Giao dịch xã: đổi kỳ ở dải lịch | Như cũ | |

**Ghi chú kỹ thuật 3.346:** file mới `js/22ga-pham-vi.js`, `js/22gb-to-giao-dien.js`, `js/22k-nap-kt.js` (nguyên văn từ 22g / 22f / 22i). `js/29-kho.js` nạp SAU các file 22* → mọi chỗ gọi `KHO.` phải nằm trong hàm (đã rà: chỉ các `PV_DUNG.x = {K:function(){…}}`). Đổi kỳ đang dựng: `KHO.datKy(K)` (không gán `TO_K` ở tab). Mốc `kho_thang` = 0.

### Danh sách thử trên máy thật (3.345) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › thẻ tổ › bảng thành viên | Cột Họ tên gọn, các cột khác rộng ra | |
| 2 | Tổ có khách dư nợ 0 | Dòng ghi rõ "vẫn trong tổ" / "cần cho ra khỏi tổ"; người bù có "(TƯ còn giữ — Mẫu 01/TV)" | |

**Ghi chú kỹ thuật 3.345 — VIỆC CHỜ (anh chốt 24/10):** quy tắc bù Mẫu 01/TV trong `tvChuan` (js/28) **giữ nguyên** tới khi có số liệu cuối T10. Khi anh nạp Mẫu 31 + Mẫu 01/TV cuối T10: so T10 với T9 (người ra / vào tổ, người TƯ giữ mà Mẫu 31 không có) → tìm nguyên tắc chuẩn, báo anh duyệt rồi mới sửa. Đã thấy: kỳ ngày đang bù theo 01/TV tháng trước (anh: "kiểu bù này chỉ tính cho cuối tháng"); Tra cứu dùng kỳ chốt tháng mới nhất, thẻ khách dùng Mẫu 31 mới nhất (có thể là ngày) — đề xuất thống nhất 1 kỳ, chờ anh.

### Danh sách thử trên máy thật (3.344) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu › Tìm theo Tổ trưởng › chọn 1 tổ | Đầu thẻ 3 hàng có tên cột, kẻ dọc; số TV / dư nợ như trước | |
| 2 | Bảng thành viên | Có #, sắp theo mã KH; CT, dư nợ, ngày vay, hạn trả (màu), lãi tồn, TGTK; không phải cuộn ngang | |
| 3 | Chip Đủ / Gọn; khách vay nhiều món; bấm ô CT / ô TGTK / ▸ | Đủ: mỗi món 1 dòng; Gọn: mỗi khách 1 dòng, bấm ▸ hiện dòng nhỏ từng món; bấm CT hiện mã món vay, TGTK hiện số TK 105; app nhớ kiểu đã chọn | |
| 4 | Bấm 1 dòng thành viên | Mở khách đó như cũ | |

**Ghi chú kỹ thuật 3.344:** Đủ / Gọn = `tcTim().tvKieu`; dòng chi tiết `tr.tc-to-ct-mo` (Gọn dựng sẵn `hidden`, CT / TGTK chèn bằng `tcToHien`). món lấy `TC_K.B.theoKH[kh]` (món còn dư nợ hoặc lãi tồn, như thẻ khách); KHĐ đếm theo `TC_K.B.khd[ku]` của món thành viên. Lớp `.tc-to-tv-dong` giữ trên `<tr>` (t246). `@container` cho năm 2 số khi khung hẹp.

### Danh sách thử trên máy thật (3.343) — iPhone, anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy tính: ⚙ › 💾 Sao lưu › 📱 Bản điện thoại › đẩy gói; iPhone ⟳ | Thẻ khách có Lãi tồn, món vay có ngày đến hạn tô màu | |
| 2 | Khách › chip Tổ trưởng › gõ tên tổ trưởng | Danh sách tổ → bấm ra thẻ tổ (thành viên, có / không dư nợ) | |
| 3 | Khách › chip Khế ước › gõ 5 số cuối | Ra đúng khách | |

**Ghi chú kỹ thuật 3.343:** gói xem món `[9]` lãi tồn (`laiTon`), `[10]` 1 = hạn gia hạn; tổ `ttKH`. `dt-giao-dien.js`: `TIM_THEO`, `DT.ch.timTheo`, `timTheo / toTim / hanMon / oSo / kv / goi`, route `/to/:ma/` (`trTo`), `VUA_XEM` (bộ nhớ). CSS `.dt-theo .dt-chip .dt-oso .dt-han-*`.

### Danh sách thử trên máy thật (3.342) — iPhone, anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app trên iPhone | Không hỏi PIN, vào thẳng trang Khách; thanh dưới 4 nút | |
| 2 | Bấm 🖥 ở góc phải trên | Sang bản web; có nút 📱 góc dưới trái; bấm 📱 → về bản điện thoại | |
| 3 | Khách › 📍 | Địa bàn theo cấp (Xã › Điểm › Hội › Tổ › Khách) | |
| 4 | ⚙ › Công cụ › Giao dịch xã | Mở 04/TD, 12/GDX, Giấy lĩnh như cũ | |

**Ghi chú kỹ thuật 3.342:** `DT.pinBat()` (cờ `tuhoso_dt_pin`), `DT.moTuDong()` (khóa AES tự sinh `khoaTu` trong IndexedDB `tuhoso_dt`), `DT.khiNap` → `refreshPage`. `trang()` luôn có `.dt-may`; gắn lệnh qua `tat(sel)` = trang + `page.navbarEl`. `nutTL` bỏ. `js/60-ve-dt.js`: nút `#ve-dt` khi `tuhoso_ban='may'` + màn cảm ứng ≤ 600 px.

### Danh sách thử trên máy thật (3.341) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › chọn khách cho bản scan (gõ tên / mã) | Gợi ý khách như cũ, chọn đúng ấp / xã | |
| 2 | Scan › 📊 Kiểm tra theo cây địa bàn | Mở được, dùng Mẫu 31 mới nhất | |
| 3 | Hồ sơ Tổ / Hồ sơ vay / Giao dịch xã đổi kỳ ở dải lịch | Số liệu đổi theo kỳ như cũ | |

**Ghi chú kỹ thuật 3.341:** `js/23` nạp trước `js/29` → mọi chỗ gọi `KHO` lúc nạp phải kiểm `typeof KHO`. Tiếp: K2 Tra cứu KH (22f, 58) theo `RA_SOAT_KHO_2410.md` mục 2 — chờ anh duyệt K2–K5.

### Danh sách thử trên máy thật (3.340) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sửa vài văn bản / scan rồi đóng hẳn trình duyệt, mở lại | Đủ dữ liệu, không mất mục vừa sửa | |
| 2 | ⚙ › 💾 Sao lưu › 🩺 Sức khỏe sao lưu | Dòng "Lưu trên máy này" xanh, giờ vừa sửa | |
| 3 | Gõ / sửa liên tục ở máy nhiều hồ sơ | Không giật sau mỗi lần sửa | |

**Ghi chú kỹ thuật 3.340:** `LS_TRAN` (js/02) = ngưỡng ký tự; `LN.ghi(lsOk, boLS)` — boLS = chủ ý bỏ localStorage. Đường đọc lúc mở app không đổi (`khoiDong` bọc ở js/34: có dấu chờ → `LN.napIDB()` trước). Theo dõi: hoiquy "báo cáo đã bỏ không tự quay lại" chập chờn (~1/4) — nghi lưu hẹn 300 ms chưa kịp trước khi phép thử tải lại trang.

### Danh sách thử trên máy thật (3.339) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app, đi qua Hôm nay (lịch, 🧰 công cụ), Văn bản, Ghi chú, Bộ hồ sơ, Theo dõi nợ | Y như 3.338, không báo lỗi | |
| 2 | ⚙ Cài đặt, ❓ Hướng dẫn, 🗑 Xóa nhiều file, nối Drive / ☁ đồng bộ, 🗂 Lập chỉ mục | Y như cũ | |

**Ghi chú kỹ thuật 3.339:** file mới 04b–04e, 06b–06c (tìm hàm: `docs/BAN_DO_MA.md`). `CO_GI_MOI` vẫn ở `js/06-hop-thoai.js` (bump.py). **Đề xuất việc 5 (chờ anh):** khi bật lưu theo ngăn và dữ liệu > 1 MB → thôi ghi bản sao localStorage mỗi lần lưu, đi đúng đường "localStorage đầy" đã có từ 3.223 (xóa bản cũ + dấu `tuhoso_ln_cho` → lần mở sau đọc IndexedDB trước khi vẽ) → mỗi lần lưu nhanh ~3 lần; rủi ro: IndexedDB hỏng thì báo "không lưu được" như khi localStorage đầy (đã có).

### Danh sách thử trên máy thật (3.338) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ⚙ Khai báo đơn vị › 💾 Sao lưu | Thẻ 🩺 Sức khỏe sao lưu: 6 dòng có ngày giờ; máy dùng hằng ngày đa số lục | |
| 2 | Máy lâu không mở / chưa nối Drive | Dòng tương ứng vàng / đỏ, chip tổng "cần xử lý" | |
| 3 | 🎓 Hạn trả HSSV trên màn 17 inch | Đầu công cụ 1 dòng, không tràn | |

**Ghi chú kỹ thuật 3.338:** `js/59-suc-khoe.js` chỉ đọc `LN.tt()`, `D.cauHinh.saoLuuNgay / chGhiLuc / chKeoLuc / chiMucDriveTG`, `KHO1.dsChup()`; muốn thêm đường lưu mới → thêm 1 dòng trong `skDs()`. Phân công TK 2 / TK 3: `RA_SOAT_BO_CUC_2410.md` mục 9 + `PHOI_HOP_TK2_TK3.md` mục 5.

### Danh sách thử trên máy thật (3.337) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH › mở khách nhiều món (máy làm việc) | Cả thẻ trong 1 khung: 3 cột thông tin + bảng món vay đủ cột, không phải cuộn ngang | |
| 2 | Cột Đến hạn | Món quá hạn đỏ, còn ≤ 30 ngày cam, ≤ 90 ngày vàng; món gia hạn có GH | |
| 3 | Danh sách bên trái | Tình trạng chữ nhỏ sau tên, mỗi khách 1 dòng; khung chi tiết rộng hơn | |

**Ghi chú kỹ thuật 3.337:** đọc `tong.txt` của hồi quy phải lọc theo **số ✗**, không theo mã thoát (vài phép in ✗ nhưng thoát 0 — t106, t170, t172 lọt từ 3.334, nay đã sửa). Luật chung `td:first-child{min-width:150px;position:sticky}` (css ~dòng 1222) áp mọi bảng — bảng nhỏ trong khung phải tự gỡ (`.tc-the table.tc-mon td:first-child`).

### Danh sách thử trên máy thật (3.336) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH › Tìm theo › Tổ trưởng, gõ tên tổ trưởng (không dấu) | Bảng tổ khớp, đúng xã / ấp / Hội | |
| 2 | Gõ mã tổ / SĐT tổ trưởng | Ra đúng tổ, tự mở thẻ tổ | |
| 3 | Thẻ tổ: số TV, có dư nợ, tổng dư nợ | Khớp tab Tổ (QT-18) | |
| 4 | Bấm thành viên · 👤 Xem tổ trưởng · 👪 Lập hồ sơ hộ mới | Mở khách / form Hộ vay điền sẵn tổ | |
| 5 | Tự nhận gõ tên tổ trưởng | Nút "🏘 n tổ khớp — xem tổ" | |

**Ghi chú kỹ thuật 3.336:** thẻ tổ dùng `tcTo` (TC_K) + `KHO.tvChuan`, không đọc thẳng biến kho (kiểm khách qua `tcCoKH` ở js/22f). Lệnh mới `tc.to / tc.kh / tc.moTo / tc.bangDiem / tc.ketNap / tc.dong` (đăng ký trong `tcDangKy`).

### Danh sách thử trên máy thật (3.335) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH: mở tab | Ô tìm + LỌC ĐỊA BÀN 1 dải trên cùng, ô Xã / Hội đọc đủ; danh sách bảng bên trái, chi tiết bên phải | |
| 2 | Tìm theo Tên KH / Vợ chồng / HSSV | Chỉ ra đúng loại (gõ tên vợ không ra người vay trùng tên) | |
| 3 | Tìm theo CCCD / Mã KH / Mã món vay / SĐT (gõ 1 phần) | Ra đúng khách; dưới 3 số → nhắc gõ thêm | |
| 4 | Tìm theo Số TK 105 (đã nạp Sao kê TK 105) | Ra đúng khách, bảng có cột Số TK 105 | |
| 5 | Bấm dòng bảng · ↑ ↓ Enter · nút ▦ Thẻ | Mở chi tiết; đổi kiểu được và nhớ | |

**Ghi chú kỹ thuật 3.335:** Số TK 105 lấy `TC_K.tk.tk105.rows` (gắn khi dựng kỳ — `tkNapMoi`), dự phòng `tkBang('tk105')`. Lệnh `tc.theo` / `tc.kieu` đăng ký lúc vẽ lần đầu (`tcDangKy`). Khóa cài đặt mới `tcTim` (sổ js/17b).

### Danh sách thử trên máy thật (3.334) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay / Hồ sơ Tổ / Giao dịch xã: dải chip mẫu | 1 hàng, nút › khi còn mẫu, bấm cuộn; mẫu đang chọn luôn thấy | |
| 2 | Hồ sơ: dòng tên mẫu | 1 dòng: tên · chú thích màu · 📅 kỳ · ⚙ Khai báo đơn vị; Sổ hộ vay không lặp chữ | |
| 3 | Hàng nút xuất (khung xem bên phải) | Word / Excel mờ chỉ còn biểu tượng; 📤 Gửi cùng hàng | |
| 4 | Tra cứu KH: mở tab, đổi Xã | Có sẵn danh sách khách; đổi xã danh sách đổi theo; gõ tìm như cũ | |
| 5 | KTGS: chip BC0437 / BC0438 | Ở cuối thanh Bắt buộc · Đột xuất · Khai báo; ô lọc không bị bóp | |
| 6 | Tab Tổ: thẻ tổ (kỳ có 01/TV) | Tổng TV = số TƯ; có dư nợ / còn lãi tồn | |

**Ghi chú kỹ thuật 3.334:** `cnHang` ở js/26 (nạp trước js/39) đăng ký lệnh `cn.cuon` lúc vẽ lần đầu. Nút mờ thu gọn bằng CSS (`font-size:0` + `::before`) → chữ "📝 Word / 📊 Excel" vẫn trong nút (t148, t196 không đổi). Tổng hợp #4 không làm (ngược 3.168).

### Danh sách thử trên máy thật (3.333) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tra cứu KH › mở 2–3 khách khác nhau | Khung không nhảy: 5 ô số, Nhân thân, Tổ & địa bàn, Món vay, nút luôn ở 1 chỗ | |
| 2 | Khối Tổ & địa bàn › bấm mã tổ / tên tổ trưởng / mã KH TT / ☎ | Chép được, báo "Đã chép" | |
| 3 | Số thành viên tổ (kỳ chốt tháng có Mẫu 01/TV) | Trùng số TV của TƯ; có dư nợ = gốc > 0 | |
| 4 | 🏘 Tổ của điểm GD | Đủ tổ, theo Hội, cộng Hội / điểm đúng; tổ dưới 20 / gần 100 có chip | |
| 5 | Gõ CCCD chưa vay › 🏘 Chọn tổ kết nạp › chọn tổ › 👪 Lập hồ sơ | Form Hộ vay mở, điền sẵn tổ + tên / CCCD | |
| 6 | Chip toàn app (Tổ, Nạp & KT, KTGS, Tra cứu) | Cùng kiểu, cùng nghĩa màu | |
| 7 | KTGS: Mẫu 06 / 16 / 04, Sau giải ngân | In như 3.331 | |

**Ghi chú kỹ thuật 3.333:** `tvChuan(t, K)` tạm đặt `TO_K = K` khi gọi `toTV` (Tra cứu dùng `TC_K`). Kỳ ngày 11/10 (file thật) so 01/TV T9: lệch do biến động tháng 10 + tổ chia tách — chờ 01/TV T10 để đối chiếu ngày. Thước đo "đọc thẳng biến kho" 58 (mốc 54): +2 từ trước, +2 `tvChuan` mượn kỳ dựng.

### Danh sách thử trên máy thật (3.332) — như 3.330

**Ghi chú kỹ thuật 3.332:** thứ tự `<script>` js/54 → 56 → 57. Hồi quy 3.330: t100, t158 sai từ trước (3.327).

### Danh sách thử trên máy thật (3.331) — như 3.330 (chỉ thêm tài liệu bàn giao)

**Ghi chú kỹ thuật 3.331:** chỉ tài liệu — `docs/BAN_GIAO_KTGS.md`, CLAUDE.md dòng KTGS, kế hoạch mục 11.

### Danh sách thử trên máy thật (3.330) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội | Thanh 📅 Bắt buộc · 🎯 Đột xuất · ⚙ Khai báo; Bắt buộc có 4 thẻ con | |
| 2 | ⚙ Khai báo › 🧩 Bộ khai báo mẫu › bộ ② › Đơn vị kiểm tra "Khai báo tên đoàn" | Lưu ngay; Đột xuất in Mẫu 16 ra tên đoàn | |
| 3 | Đột xuất › chọn tổ › 📋 Mẫu 04 | Báo cáo 1 tổ, tháng để chấm khi chưa khai ngày | |

**Ghi chú kỹ thuật 3.330:** `ktCheDoHTML()` → `ktKhoiHTML(che)` (56); `ktKhoi(c)`; `ktgs.aThe`; `ktgs.hdtTab = 'bo'` → `ktBoVe(o, h)` (KT_IN_X `tab:1` — `ktInDoc / ktInDayDu / ktKN04Doi / ktKN04Chu / ktbo.chon` vẽ lại tab thay vì mở hộp). `ktDX04(ok)` + `KT_BC_XEM.tu = 'dx'`. Lệnh `GD` khối `ktk` (khoi, che, hdt, chep, trang, dx04, kieu, so, goiYLai, loc, xuat, dkTich, dkMo, dkLich).

### Danh sách thử trên máy thật (3.329) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › Định kỳ › Tháng kiểm tra T11/2026 (ô đầu trang để ngày khác) | Dòng "Số liệu in T11: T10/2026"; Mẫu 16 số liệu cuối tháng 10 | |
| 2 | Sau giải ngân, từ T8 đến T9, 1 tổ có GN cả 2 tháng | 2 phiếu Mẫu 06 (T8, T9); có dòng nhắc 30 ngày | |

**Ghi chú kỹ thuật 3.329:** `KT_A_TH` (phiên) · `ktNguonThangKT / Ky / Nap / San / Voi / Ve` (56). `ktDKThang()` = `KT_DK_TH || ktNguonThangKT()`; `ktDKVe / ktBCVe` → `ktNguonVe(o, th, …G)`; `ktDKXem / ktBCXem / ktBCGiaTri` bọc `ktNguonVoi`. `ktAThangHTML` nhận cả lúc đang mượn (`S.K===KT_K`). Sau GN: `KT_GN.kh[th][kh] = {lt, t105, loai}`, `ktGNTo` → `{x, mon, thang:[th], th}`, `ktGNTichHo(ma, kh, v, th)`.

### Danh sách thử trên máy thật (3.328) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app › tab Tổ / Sao kê / Hồ sơ vay / GDX | Khối LỌC ĐỊA BÀN 1 dòng ô chọn Xã › Điểm › Hội › Tổ, Toàn PGD | |
| 2 | Chọn tổ, tải lại app (chưa ghim) | Về Toàn PGD, kiểu gọn | |
| 3 | Chọn tổ, bấm ▦ Chip rồi 📌, tải lại app | Giữ tổ + kiểu chip | |
| 4 | Thanh bên máy tính | 7 mục cấp 1, nhóm ▸ mở / gập, KTGS trong Số liệu | |
| 5 | GDX › 👤 Tra cứu KH › ← Giao dịch xã | Mở Tra cứu cùng địa bàn, quay về GDX | |
| 6 | Điện thoại (trình duyệt) | Thanh dưới 5 nút, ☰ Thêm đủ mục | |
| 7 | 👪 Hộ vay mới / 01/TD / 01/TGTV / ⚙ Khai báo chung › Trưởng ấp | Chọn Xã › Ấp › Tổ như cũ, dữ liệu lưu đúng | |

**Ghi chú kỹ thuật 3.328:** `pvChungO()` trả `PV_PHIEN` khi chưa ghim; `pvGhimCua()` / `pvGonCua(p)` / `pvGonDoi(p)` / `pvGhimDoi(p)` giữ tên cũ, nghĩa mới. `gdxGonLoc` và cờ `gonDiem` không còn tác dụng (giữ, không lỗi). Lỗi có sẵn trên `main` (đã chạy đối chứng): t110 (hộp in Mẫu 06/16), t114 (Mẫu 16 chưa khai ngày), t116, t231 — vùng KTGS của TK 3 / HSSV.

### Danh sách thử trên máy thật (3.327) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS định kỳ › In Mẫu 16 | Hộp in có dòng "Bộ khai báo: ① Hội kiểm tra (mặc định) · ② Khai báo khi cần"; bấm ② → tên đoàn / cán bộ theo khai báo đột xuất | |
| 2 | Hộp in Mẫu 16 › Bảng II "Điền đầy đủ" › Từng ô › dòng 1 "Chấm ghi tay", dòng 4 "Gõ chữ" | Bản in: dòng 1 chấm, dòng 4 chữ đã gõ, dòng khác theo 727 | |
| 3 | 01/TGTV | "Giới tính*" cách ngày sinh khoảng 1 tab | |

**Ghi chú kỹ thuật 3.327:** `KT_BO` / `KT_BO_IN` / `ktBoDang` / `ktBoKhoa` (56) — `ktInKhoa(mau)` gọi `ktBoKhoa`. `ktInHop(ds, nut, hoi, veThe, ve)`: `ve` = vẽ lại (giữ bộ, giữ khung mở); không `ve` → `KT_BO_IN = null`. Bảng II: `v.b2o[i] = {c:'trong'|'cham'|'dien'|'go', v}` trong bộ m16, `ktB16Mang(t, v)` thay biểu thức cũ trong `ktGiaTri16`; lệnh `GD` khối `ktbo` (chon, doc, b2mo). 01/TGTV: `&emsp;×3` trước "Giới tính*".

### Danh sách thử trên máy thật (3.326) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn ngày 19/10 ở ô đầu trang › Ctrl+F5 | Ô vẫn 19/10; KTGS Mẫu 16 "đến thời điểm 19/10/2026" | |
| 2 | KTGS đột xuất › bấm "✎ Chọn / khai tên" | Mở hộp khai đơn vị / người kiểm tra | |

**Ghi chú kỹ thuật 3.326:** `kyChungLay()` = `D.cauHinh.kyChung || ''` (bỏ giữ-trong-phiên 3.97). `toGanNeuTrong(K)` (22g) cho Tra cứu sau `KHO.nap`. `ktDXTom` đăng ký `GD.dangKy('ktdx', …)` lần đầu vẽ (GD nạp sau 22b).

### Danh sách thử trên máy thật (3.325) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn ngày 19/10 ở ô đầu trang › KTGS › tổ › Mẫu 16 | Mục I "đến thời điểm 19/10/2026", số liệu theo ngày đó; xếp loại ghi tháng BC0437 | |
| 2 | Đột xuất, để trống Ngày kiểm tra › Mẫu 16 | "Hôm nay, ngày … tháng … năm 20…" chấm | |

**Ghi chú kỹ thuật 3.325:** `ktSoTo(t)` — số liệu luôn từ `toKhach(t)` (KT_K = kỳ chung), `diem / xl / ngayXL` từ BC0437 (`KT_BC.k37`); không có dòng Mẫu 31 → BC0437 như cũ. `ktGiaTri16` `thangCD = ktNgayP(s.ngayXL)`; chưa khai ngày + `ktCheDo()==='dx'` → không lấy `ktThangKT()`. `ktTheHTML` ghi tháng chấm điểm. Chuẩn `kt_16` ghi lại.

### Danh sách thử trên máy thật (3.324) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › 🎯 Kiểm tra đột xuất › chọn tổ | Thấy dòng 🎯 Khai báo đột xuất trên ô Ngày kiểm tra | |
| 2 | ✎ Chọn / khai tên → Khai báo tên đoàn + tên cán bộ ở Mẫu 06 | Mẫu 16 cùng tên; đóng hộp → dòng tóm tắt đổi | |

**Ghi chú kỹ thuật 3.324:** `js/22b-ktgs.js` — `ktDXTom(t)` (chỉ khi `ktCheDo()==='dx'`), `ktDXKhai()` → `ktInHop(['m06','m16'], '', hoi, 1)`; `ktInHop(ds, nut, hoi, veThe)` giữ `KT_IN_X.cu` + `HOP_KHI_DONG = ktVeThe`; `ktInDoc` đồng bộ `dvc, dvt, ng1, cb1t, cv1t` giữa dx_m06 / dx_m16 (ô vừa đổi thắng). CSS `.kt-dx-kb`. **Quy trình (anh 23/10): hồi quy đủ gom nhiều bản chạy 1 lần; mỗi bản chạy phép thử phần sửa + kiem.py.**

### Danh sách thử trên máy thật (3.323) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🎯 Kiểm tra đột xuất › In Mẫu 06 › Đơn vị: Khai báo tên đoàn, Người kiểm tra: Khai báo tên | Phiếu in tên đoàn + cán bộ anh gõ | |
| 2 | Mẫu 16 cùng lựa chọn + Bảng II Chấm ghi tay | Đầu trang + ĐOÀN KIỂM TRA = tên đoàn; Bảng II dòng chấm; số liệu tổ vẫn có | |
| 3 | Đổi Đơn vị → Để chấm | Dòng chấm ghi tay ở cả 06 và 16 | |
| 4 | Sang Sau giải ngân / Định kỳ | Lựa chọn cũ không bị đổi | |

**Ghi chú kỹ thuật 3.323:** `js/22b-ktgs.js` — `KT_IN_MD` m06 / m16 thêm `dvc, dvt, cb1t, cv1t` (+ `cb2t, cv2t` m16); `ktInKhoa(mau)` ('dx_'+mẫu khi `ktCheDo()==='dx'`, trừ m04 / kh); `ktInLay` đọc khóa riêng (chưa có → chung) + chuyển `ktKBLuu.dv` cũ; `ktInV` → `v.dv` ('-' chấm / tên / '' Hội), `ng2==='go'` → cb2 / cv2; `ktCanBo` `ng1==='go'`; `ktNguoi` / `ktNguoi2` / `ktInThieu` / `ktInVTTen` bỏ qua 'go'; `ktInPhan` ô chọn + ô gõ; `ktInDoc` / `ktInDayDu` lưu khóa riêng; `ktGiaTri16` DOAN theo `v.dv`, `b2` 'cham' → `KT_B16_CHAM`, `ktB16NX` (kq1 / kq2 chấm); bỏ `KT_DV_GOI`.

### Danh sách thử trên máy thật (3.322) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội (chế độ tối) › chọn tổ › bảng hộ | Dòng đã tích nền xanh đậm, chữ rõ | |

**Ghi chú kỹ thuật 3.322:** `css/app.css` `.kt-bang tr.kt-co td{background:var(--luc-nen)}`.

### Danh sách thử trên máy thật (3.321) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › mở bản quét CCCD của tổ trưởng › 🪪 Đọc số CCCD | Ô tên = tên tổ trưởng, CIF, địa bàn + tổ tự chọn, báo ✓ Tổ trưởng | |
| 2 | CCCD khách mới (không có Mẫu 31) | Ô tên = họ tên trên thẻ (không để số) | |
| 3 | Chọn ấp → các nút tổ dưới ô Tổ | Bấm 1 lần là chọn | |

**Ghi chú kỹ thuật 3.321:** `js/45-tra-mau31.js` — `trChay` nhánh không thấy: chưa dựng kỳ → `KHO.nap(kyChungLay())` gán `TO_K` rồi tra lại; `trTimTT(q)` (bảng tổ `KHO.bangTo(m).cccd` / tên tổ trưởng; trùng nhiều tổ → null), `trTenTT(m, t)` (`KHO.toDanhBa(m).ten` → `tenHoaDau`), `trGanTT(x)` (ô tên, `k.maKH` = CIF TT, xa/ap/diem/to, vẽ lại địa bàn); `trDoc` / `trQuetXong` giữ `e.__the = {so, ten}` (ten chỉ khi đọc từ QR) → không khớp đâu thì ô tên = tên trên thẻ. `js/08-dia-ban.js` — `dbToNut`, `dbChonTo`. CSS `.db-to-ds`.

### Danh sách thử trên máy thật (3.320) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV từ Mẫu 31 / Sổ hộ vay / In nhanh | Ngày hết hạn tự có (vd sinh 1978, cấp 2021 → 28/03/2038) | |

**Ghi chú kỹ thuật 3.320:** `js/mau/01tgtv.js` ô `hanCCCD` md 'tu' (người đã chọn ✍ ở khai báo riêng giữ lựa chọn). `tests/chuan_lay.js` trả thêm `chuan`; `t179` chuẩn hóa cả bản chuẩn.

### Danh sách thử trên máy thật (3.319) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV ✍ In nhanh, bấm Nơi cấp gõ "Cục Cảnh sát quản lý hành chính về trật tự xã hội" | In "Cục CS QLHC về TTXH" cỡ chữ thường | |
| 2 | Gõ Chức vụ rất dài | ⚠ Trước khi in báo dài hơn ô; chữ không bị thu nhỏ | |

**Ghi chú kỹ thuật 3.319:** `js/31-o-mau.js` — `OM_TAT` + `omTat(v)`; `G.o`: mẫu `m.giuCo` → viết tắt, còn dài thì `W = tw/0.98` (giãn) + `OM_DAI.push({…, gian:1})`; ô `hai` quá 2 dòng bỏ max-height; ô `lien` có chấm gốc → viết tắt + ⚠. `js/mau/01tgtv.js` `giuCo:1`, `diaDanh` liền. `js/25-ho-so.js` `hsoThieu`: thông báo `gian`, In nhanh dựng thử bằng `tgTayP()`. Mẫu khác giữ `OM_NHO` (chuẩn khóa không đổi).

### Danh sách thử trên máy thật (3.318) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV từ Mẫu 31 | ☒ Việt Nam, dân tộc Kinh, ☒ Có cư trú; ngày sinh 28/03/1978 liền, Giới tính đúng chỗ như bản trắng | |
| 2 | Khung Ngày / Số CIF | Bo góc tròn, 2 dòng thoáng; vẫn 3 trang | |
| 3 | Phần D | Tiếp nhận ngày …/…/… 1 dòng | |

**Ghi chú kỹ thuật 3.318:** `js/mau/01tgtv.js` — md 'tu' cho `quocTich`, `danToc`, `cuTru`; `ngay(k, a, b, c)`: có ngày + có chấm gốc → `G.o` giữ bề rộng chấm, không có → `lien`; `ngayKy`, `nhNgay` `{lien:1}`; `tiepNhan`, `hieuLuc` liền; `ngan` liền; khung họ tên [29, 71]; khung Ngày / CIF `s10`, line-height 1.5, `border-radius:2.5mm` (`border-collapse:separate`), margin 1pt; td Tiếp nhận nowrap + chấm 4/4/7. `QUY_CHUAN` mục 9.7. Chuẩn khóa `hsv_01tgtv_*` ghi lại.

### Danh sách thử trên máy thật (3.317) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay, mở vài mẫu | Tên mẫu + 3 chip chú thích trên 1 dòng (màn hẹp tự xuống dòng) | |

**Ghi chú kỹ thuật 3.317:** `hsoDsHTML` — `.hso-chu` thành span trong `.hso-dau-ds` (flex, space-between); CSS `#hso-ds .hso-dau-ds .hso-chu`.

### Danh sách thử trên máy thật (3.316) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV › ✍ In nhanh, gõ form 7 ô (Tab qua từng ô) | Bản xem điền ngay; dân tộc Kinh, ☒ Có cư trú, giới tính, ngày hết hạn tự có | |
| 2 | Chọn Xã → Ấp | Ấp lọc theo xã; mẫu ghi Tổ dân phố/Thôn + Phường/Xã | |

**Ghi chú kỹ thuật 3.316:** `js/54-tgtv-khai.js` — `tgFormHTML(T)` (5 ô `.tg-f[data-k]` + 2 select xã / ấp theo `hmDiaBan()`, dòng tự tính), `tgTayDat(k, v)` (ngày → ISO, CCCD chỉ số, `xaMa` → `xa = hsoXaTen(tenXa)`, `apMa` → `ap = tgApTen`), `hsoVeGiuO` giữ con trỏ; `tgTayLuu` bỏ qua mục chưa khai mà trống; `tgTayChep` xóa khóa trống; `tgTayCo` không đếm `xaMa/apMa`. CSS `.tg-form`.

### Danh sách thử trên máy thật (3.315) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV › 📊 Từ Mẫu 31, chọn tổ | Tích sẵn người chưa có TK 105; tích thêm người đã có TK → in thêm bản | |
| 2 | ✍ In nhanh, bấm vào dòng chấm Họ tên trên mẫu | Hộp gõ Họ tên; Enter → in lên mẫu, mở mục kế | |
| 3 | Bấm ô ☐ Nam/Nữ, Nghề nghiệp | Chọn trong hộp → ☒ đúng ô | |
| 4 | Lấy từ Mẫu 31 rồi sửa | Chép đủ nhân thân, sửa tiếp được | |
| 5 | In / PDF / Word | Không có viền xanh khi in | |

**Ghi chú kỹ thuật 3.315:** `js/54-tgtv-khai.js` mới — `TG_O` (ô mẫu → trường gõ), `tgNguon`, `tgTay` (hsoLuu().tgTay), `tgTayP`, `tgTayDe` (đè V), bọc `OM_MAU['01tgtv'].V` + `hsoLap01tgtv` (đặt `OM_TAY`), `tgTayGan(f)` (onload khung xem: CSS hover + click `[data-o]` → `tgTayHop`, giữ scrollTop), `tgTayHop / tgTayLuu / tgTayMoi / tgTayChep / tgCotHTML`. `js/31-o-mau.js`: `OM_TAY` — `omCach` trả 'tu' cho mọi ô khi dựng bản tự khai (ô ⌨ khai riêng chưa gõ vẫn 'kb'). `js/25-ho-so.js`: `hsoTGTVDs` (nhánh 'tay'; nhánh 'to' theo `V.tg[kh]` true/false, mặc định chưa có TK), cột trái 01/TGTV → `tgCotHTML`, `hsoXem` gọi `tgTayGan` trước `xemChuan`. CSS `.tg-hop/.tg-o/.tg-nguon`.

### Danh sách thử trên máy thật (3.314) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🧾 Bảng kê › Loại: 💰 Thu, IN | 2 tờ "CÁC LOẠI TIỀN NỘP VÀO NGÂN HÀNG", ký Người nộp / Người nhận tiền | |
| 2 | Đổi lại 💸 Chi | Như bản cũ (NGÂN HÀNG CHI RA) | |

**Ghi chú kỹ thuật 3.314:** `GDX_MD.bkLoai` ('chi' | 'thu'), `GDX_MUC.bk` thêm `bkloai` đầu; `gdxBKMuc('bkloai')`; `gdxHTMLBK(c)` → `gdxBKTrang(c, null, c.bkLoai==='thu')` (dùng lại cờ `nop` của 3.312, nhánh mẫu trắng đổi nhãn người nộp); `gdxTom`, `gdxTenFile` (BangKeThu_trang_), nhãn khung xem.

### Danh sách thử trên máy thật (3.313) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🏦 Giấy nộp, xem trước + in | Loại N.V: KHTK + kẻ liền; Tài khoản CÓ không chấm; bằng chữ kẻ 3 nét 2 dòng | |
| 2 | 📄 Mẫu trắng | Giống tờ in sẵn | |

**Ghi chú kỹ thuật 3.313:** `js/53-giay-nop.js` — `gdxGNTrang`: hàng `.gn-nv` (KHTK `.gn-khtk`, `gnNV`), `.gn-tk` (CÓ không chấm), `.gn-ba` (3 nét bằng `linear-gradient` nền + `print-color-adjust:exact`, `gl-bc1/gl-bc2` để `GL_JS` chia chữ), `.gn-gach`, `.gn-ky1`; bỏ quy tắc `.gn-co` trùng.

### Danh sách thử trên máy thật (3.312) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › 🏦 Giấy nộp, chọn khách TK 105, số tiền | Xem trước đúng bố cục bản scan; người nộp = người nhận; TK CÓ; bằng chữ | |
| 2 | In 🏦+🧾 | 1 tờ A4: Giấy nộp trên, Bảng kê các loại tiền nộp dưới (chia mệnh giá) | |
| 3 | 📄 Mẫu trắng | Đúng khung, không số liệu | |
| 4 | So bản in với tờ giấy in sẵn | Anh báo chỗ lệch (khổ, vị trí dòng) để em chỉnh | |

**Ghi chú kỹ thuật 3.312:** `js/53-giay-nop.js` mới — `GDX_MUC.gn`, `gdxGNMuc`, `gdxGNND`, `gdxGNTrang(g, c, trang)`, `gdxHTMLGN` (a5 · a4 · a4x2 · a4bk), `gdxDungGN`, `gdxGNTrangIn`, `gdxGNNutIn`, `gdxGNTom`, `GN_CSS` (dùng chung lớp `.gl-r / .gl-c / .gl-v` + `GL_CSS`). 26: `GDX_MAU` thêm `gn`; `gdxChup` (gn → `gdxGLDuLieu()` + `du = null`, `C.gnIn`); `gdxDung` → `gdxDungGN`; `gdxMucHTML` (gn: mục `gl*` dùng `gdxGLMuc`); chọn tổ / đổi mẫu / Phiếu mới / sau in như gl; nhãn khung xem; `gdxTenFile`; `gdxTom` → `gdxGNTom`; chip Rút hết ẩn với gn; `gdxBKTrang(c, g, nop)` + `gdxHTMLBKDL(g, c, nop)` (tiêu đề, người nộp, nội dung, chữ ký).

### Danh sách thử trên máy thật (3.311) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Màn 17 inch / laptop 125%: Hôm nay › 🎓 Hạn trả HSSV, gõ ngày vay, ra trường, tiền | Lịch thu còn 1 hàng nút; đủ ô kết quả + bảng + câu chốt trong 1 khung, không cuộn | |
| 2 | Bấm ✕ | Lịch tháng hiện lại | |

**Ghi chú kỹ thuật 3.311:** 04 `ccGonLich(mo)` — `.blv-lich.cc-gon` khi công cụ mở ở `#cc-o` và `innerHeight < 960` (gọi trong `veCC`, khi chuyển sang hộp, khi resize); CSS ẩn `.lc-dau / .lc-luoi / .lc-sap`, `.cc-cot` thành hàng; `#cc-o .cc-dau` không xuống dòng (b min-width 4em, select ≤ 84 px, nút padding 2 / 4); `@media (max-height:959px)` ô kết quả nhỏ lại.

### Danh sách thử trên máy thật (3.310) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay › 01/GQVL hộ GQVL 50 tr, 60 tháng, để trống kỳ hạn; gõ Ngày giải ngân | Lịch: +24 · +48 · +60 tháng, 16,6 / 16,6 / 16,8 tr | |
| 2 | Để trống vốn tự có, doanh thu, chi phí | Ô ghi "tự tính: …", 01/GQVL in số; 🎲 Đổi số → số khác | |
| 3 | Chip **Phê duyệt NH** | In riêng 1 trang, đủ số | |
| 4 | 01/GQVL › In kèm "Trang Phê duyệt…" | In chung: 01/GQVL rồi trang Phê duyệt | |
| 5 | 07b | Chữ giữ nguyên mẫu chuẩn; Kỳ hạn trả nợ gốc + hạn cuối tự điền | |

**Ghi chú kỹ thuật 3.310:** 25 `hsoGQ` — `ky = +B.ky || (th>12 ? (th<=60 ? 24 : 36) : 0)` (ghi lại `A.ky`); gốc `hsoLich` = `B.ngayGN || B.ngayHD`; tự tính `tuCo / cp / dt` khi trống theo `hsoGQK(B)` (`B.pa.k`, gán 1 lần + `luu`), trả thêm `tuCo, tu{tuCo,cp,dt}, k, ky`; `hsoGQDoiK` (🎲); `hsoBoDat` nhận `ngayGN`; `hsoTuyGQ` placeholder "tự tính", dòng hệ số + nút, ô Ngày giải ngân, lịch ghi ngày. `HSO_MAU.hsv` thêm `pdnh` + `hsoLapPdnh(t, B)`; nối vào bảng hàm in, các regex mẫu theo hộ (628, 993, 994, 1826, 1913), `hsoKemCo` (`k.pd`), `hsoTuyKem` GQVL (`pd`), `hsoLapBo` (sau 01/GQVL khi `c.pd`). `js/mau/01gqvl.js` V: vốn tự có lấy `Q.tuCo` khi tự tính.

### Danh sách thử trên máy thật (3.309) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm 1 khách có chữ ký ở tab Scan | Khung xem: CCCD, dưới có dải ✍ Chữ ký | |
| 2 | Menu ⋯ tab Scan | Chỉ còn Chép đường dẫn ổ G · Mở thư mục Drive · Sửa tag | |
| 3 | Vào tab Scan (lần đầu sau cập nhật) | Hộp ✍ Rà chữ ký hiện lại: chữ ký rác còn sót tích sẵn; nhóm cuối là chữ ký đúng — sai thì tích → Bỏ | |

**Ghi chú kỹ thuật 3.309:** 51: `KY_BAN = '3.309'`; `kyPhanLoai` — heuristic ra ky / lantay vẫn `docCCCD(bl, bl)`, đọc ra → 'the' (chỉ 'trong' trả ngay); `kyDaXet(a)` = `kyXetBan === KY_BAN`; Rà đẩy cả nhóm 'ok' (không tích); mốc `D.cauHinh.kyRa = KY_BAN` (khác → tự rà lại); `kaXong` ghi `kyXetBan`. Bọc `xemThu` → `.sx-ck-xem` (data-lenh `sx.xemHS` loai ka) chèn sau `#cp-than` / `#x-than` khi bản CCCD có chữ ký (`xkCuaKhach`). `moKyAnh` → đóng hộp + `veScan`. 12: `themPhu` rỗng; `dauScanDT` bỏ `.sc-che` + 📁. 43: `sxHoSoKhach` bỏ nhóm 🧑 Ảnh.

### Danh sách thử trên máy thật (3.308) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🎯 Phân bổ KH | Thanh tab 4 mục; phím 1 – 4; mở lại nhớ mục; Đối chiếu có số đỏ khi có lệch | |
| 2 | 📋 Quyết định → bấm 1 xã | Sang Phân bổ đúng QĐ · xã; ô chọn nhanh QĐ · xã | |
| 3 | Sửa tay 1 ấp → đổi xã → quay lại | Vẫn giữ số sửa tay, có nhãn; ↺ Chia lại bỏ | |
| 4 | 📈 Diễn biến | Ma trận xã × CT: ô dư nợ / KH, vượt KH đỏ; xoay, tách nguồn, chọn mốc, tỷ; bảng 📅 mốc cuối tháng | |
| 5 | 🔎 Đối chiếu | Ghi nhận tổng lệch Đã giao ↔ dư nợ 31/12; báo CT phát sinh dư nợ chưa có QĐ; QĐ chưa ghép xã | |
| 6 | 👁 Biểu 07 → Word / In | Màn Phân bổ hiện "📜 Biểu 07 đã xuất …" | |

### Danh sách thử trên máy thật (3.307) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét gì? › 🗎 Bản photo CCCD → chụp 1 tờ photo | Mặc định 📠 Photo rõ: nền trắng, chữ đen rõ, hết lấm tấm | |
| 2 | Ở bước chỉnh, bấm qua Xám · Giấy trắng · Đen trắng · Magic | Đều rõ hơn bản trước; Đen trắng còn dấu thanh | |
| 3 | CCCD thẻ thật có màu → Magic | Như cũ (màu, dấu đỏ giữ) | |

**Ghi chú kỹ thuật 3.307:** `js/52-loc-photo.js` mới — `lpTiNen` (độ sáng / `nenSang` lưới 32 phân vị 0,85, nền không dưới 80% nền giấy chung — phân vị 90% kênh sáng nhất), `lpCong(v, ngưỡng, mũ)`, `lpBoCham(g, W, H, ngưỡng tối, cỡ)` (cụm liền 8 hướng ≤ cỡ = max(6, W·H/60000) → trắng; Đen trắng cỡ W·H/120000), `lpPhanVi`, `lpItMau` (bão hòa trung bình < 0,07). `locPhoto` (giãn từ phân vị 1%, ngưỡng 0,84 mũ 1,9, bỏ chấm, nét 0,5) · `locXam2` (0,9 / 1,35) · `locTrang2` (`locGiayTrang` + mũ 1,35 giữ tỉ lệ màu + bỏ chấm) · `locDenTrang2` (v < 0,75) · `locMagic2` (ít màu → 0,88 / 1,5 + bỏ chấm). Bọc `apLoc`, `locMacDinh` (`SC.photo2` → 'photo'); `TEN_LOC.photo`, `TEN_LOC_NGAN` thêm Photo rõ. Hàm lọc cũ giữ nguyên (t228 so cũ / mới).

### Danh sách thử trên máy thật (3.306) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Vào tab Scan (lần đầu sau cập nhật) | Vài giây sau hiện ✍ Rà chữ ký: chữ ký nhầm CCCD + ảnh khách lưu sẵn tích sẵn → 🗑 Bỏ | |
| 2 | Quét ✍ Chữ ký mà đưa ảnh CCCD | Báo "Ảnh này là CCCD… không lưu" | |
| 3 | Quét lăn tay của hộ không ký được | Lưu được; cột Ck hiện 🖐 | |
| 4 | 💾 cuối dòng CCCD → tích 🧑 Ảnh khách → Xuất | File `MãKH - Họ tên - Ảnh.jpg` = mặt trước thẻ, < 200 KB | |
| 5 | Quét gì? › 🗎 Bản photo CCCD → chụp tờ photo 2 mặt | Ra 2 mặt thẻ đúng khung | |

**Ghi chú kỹ thuật 3.306:** `js/51-chu-ky.js` mới — `kyDacTrung` (400 px, `nenSang` chuẩn nền; mực: sáng chuẩn < 140 hoặc màu đậm; `muc` tỉ lệ mực, `mau` vùng màu không phải mực, `mat` mực trong khung bao 1–99%, `doi` số lần đổi mực / 100 px theo hàng, `dac` mực đặc — 8 điểm cách 3 đều mực), `kyTheoNet` (trong < 0,003; lăn tay: doi ≥ 9, mat 0,22–0,8, dac < 0,03; chữ ký: mau < 0,04, dac < 0,008, muc < 0,12, mat < 0,3, doi < 9), còn lại → `docCCCD(bl, bl)` → the / khac. Bọc `luuKA` (KA.xet nhớ ảnh đã xét — "Vẫn lưu" không xét lại), `kaXong` (kyXet, kieuKy). `sxAnhTuCCCD` → không làm gì. `KYR` + `kyRaChay / kyRaVe / kyRaBo`, lệnh `ky.ra / lai / chon / bo / dong`, bọc `qlThe` (thẻ 4), bọc `veScan` (tự rà 1 lần, mốc `D.cauHinh.kyRa` đăng ký 17b). `SC_LOAI.anhkh` → `photo`, bọc `batDauScan` (bỏ `.sx-photo2`), `scChonNguon` (photo → che 'the' + `SC.photo2`), `sxChiaDoi` (`sxCatThe2 || sxCatThe` + lề 4%, không được → cách cũ). 50: Ảnh = `xkMatThe` mặt trước → `sxNen200`. 11: Ck 🖐 khi `kieuKy==='lantay'`. 12: bỏ nút chụp ảnh khách trong `moKyAnh` / `kaXong`.

### Danh sách thử trên máy thật (3.305) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📈 Diễn biến, Tất cả xã, Cả 2 nguồn | Tổng dư nợ thực tế = tổng Mẫu 31 (mọi CT); Còn phải TH = KH cuối năm − tổng; thẻ Nguồn TW / ĐP đúng từng nguồn | |
| 2 | Lọc Nguồn TW rồi ĐP | Số khớp thẻ nguồn tương ứng | |
| 2 | Danh sách QĐ, bảng phân bổ, đối chiếu chéo | Chip ↑ + xanh / ↓ − đỏ, ✓ Khớp xanh, ✗ Lệch đỏ; chế độ tối đọc rõ | |

### Danh sách thử trên máy thật (3.304) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › ▦ Bảng, khung xem phải | Khung xem gọn vừa thẻ; cột Ck có ✍ ở khách đã có chữ ký | |
| 2 | Bấm 💾 cuối dòng 1 khách có chữ ký → 💾 Xuất (lần đầu chọn thư mục) | Thư mục có 2 file: `MãKH - Họ tên - CCCD.jpg` (2 mặt, < 200 KB) + `- Chữ ký.jpg` | |
| 3 | Xuất khách khác | Không hỏi lại thư mục | |

**Ghi chú kỹ thuật 3.304:** `js/50-xuat-khach.js` mới — `xkCuaKhach(k, 'ky'|'anh')` (maKH, không mã → `sxChuan` tên), `xkBangCK()` bảng tra 1 lần / lần vẽ; `xkGhepCCCD` (`_matTruoc` / `_matSau`, thiếu + `sxCanCat` → `sxCatMot`) ghép canvas rộng ≤ 1000 + `xkNen` (≤ 195 KB, hạ chất lượng rồi thu 0,8); `xkMo / xkXuat / xkGhi` (`lnThuMuc('xuat')` — handle IndexedDB `ln_tm_xuat`, ghi nhiều file 1 lần hỏi quyền; không có `showDirectoryPicker` → `taiXuongBlob`); lệnh `xk.mo / xuat / doi / dong`. 11 `bangCot('scan')` cột `ck` + nút 💾 `data-lenh="xk.mo"`. 10 `RONG_MD.scan = 3` + mốc `rong3304` (bỏ `rongTab.scan` 1 lần; đăng ký 17 / 17b).

### Danh sách thử trên máy thật (3.303) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 👁 Biểu 07 → 🖨 In / 📝 Word | Tên UBND góc trên trái cả 2 trang; bảng cột Chỉ tiêu rộng, số canh phải; đoạn văn canh đều thụt đầu dòng; chấm nhỏ; lề 2 · 2 · 3 · 2 | |

### Danh sách thử trên máy thật (3.302) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📈 Diễn biến, Tất cả xã | Cột Tổng dư nợ thực tế từng xã = tổng dư nợ Mẫu 31 kỳ mới nhất của xã (mọi CT, cả 2 nguồn) | |
| 2 | Bấm 1 xã | Có dòng "không giao" cho CT không có QĐ, dư nợ hiện đủ | |
| 3 | Xã không có QĐ nào | Vẫn hiện trong bảng, chỉ có dư nợ | |

### Danh sách thử trên máy thật (3.301) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 0a | 🎯 Phân bổ KH › 📈 Diễn biến | 4 thẻ số, biểu đồ KH (gạch cam) ↔ dư nợ (xanh) các tháng đã nạp Mẫu 31, dòng thời gian QĐ, bảng xã có thanh tiến độ | |
| 0b | Bấm 1 xã; lọc nguồn / chương trình; 📊 Excel | Chi tiết từng CT · QĐ; số đổi theo lọc; file Excel 4 sheet | |
| 0c | Bật chế độ tối (⚙) | Thẻ, biểu đồ, bảng đọc rõ | |
| 1 | 🎯 Phân bổ KH › 🔎 Đối chiếu chéo | Tóm tắt xanh / đỏ; mỗi xã · CT · nguồn 1 bảng: từng QĐ, dòng Cả năm, dòng Thực tế (tham khảo) | |
| 2 | Có QĐ nhập lệch / Đã giao khác Đến 31/12 QĐ trước | Dòng đỏ ghi rõ lý do (nhập lệch / đứt chuỗi) | |
| 3 | Đã nạp Mẫu 31 kỳ 12 năm trước | Có dòng Dư nợ 31/12 so Đã giao QĐ đầu năm | |
| 4 | Bấm 1 dòng QĐ trong bảng đối chiếu | Về màn phân bổ QĐ đó, đã phân bổ sẵn | |
| 5 | 🖨 In / 📄 PDF đối chiếu | A4 ngang, đủ bảng | |
| 6 | Biểu 07 › ⚙ Khai báo riêng | 7 ô + cỡ chữ; Nơi lập mặc định tên xã / phường của từng xã | |
| 7 | Đổi Chức danh ký sang "KT. CHỦ TỊCH / PHÓ CHỦ TỊCH", gõ Người ký → 💾 Lưu | Bản xem đổi ngay; đóng mở lại vẫn giữ; Word đúng | |
| 8 | Sửa ô rồi ✕ Hủy / đóng hộp chưa lưu | Trả lại như lần lưu trước | |

**Ghi chú kỹ thuật 3.301:** biểu đồ SVG tự vẽ (pbDBSVG) — không thêm thư viện. Diễn biến cấp xã · CT · nguồn (cấp ấp chờ cách chia 3). đối chiếu không lưu kết quả — tính lại mỗi lần mở (Biểu 07 không lưu theo QT-16 / anh chốt); ngưỡng chuỗi đọc `pb.ch.nguongLech` (chưa có ô khai báo, mặc định 1 triệu). Dòng Thực tế dùng Mẫu 31 kỳ mới nhất trong năm của dải kỳ chung.

### Danh sách thử trên máy thật (3.300) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét / chọn ảnh CCCD | Đọc số nhanh hơn rõ; ô trạng thái đếm ⏱ | |
| 2 | Bấm qua lại vài bản scan / PDF trên Drive | Lần 2 mở tức thì; lần đầu thấy ⏱ đếm ở khung xem | |
| 3 | Việc lâu (Rà, Sắp xếp) | Xong báo "· ⏱ x giây" ở ô trạng thái | |

**Ghi chú kỹ thuật 3.300:** 41 `sxOCR` — `SX_OCR {w, hang, hen}` 1 worker xếp hàng, lỗi bỏ worker, rảnh 60 s terminate; `docCCCD` `laThe(c)` (tỉ lệ 1,585 ± 0,2, rộng ≤ 1700) bỏ `sxManh`. 43: `PDF_TAM` (pdfTamLay / pdfTamGhi) bọc `taiPDFDrive`, `pdfCuaScan` (khóa id|suaLuc|số trang|mặt); `sxTrangPDF` qua `taiPDFDrive`; `dongHoKhung`. 10: `DONGHO` + `dongHoGiay / dongHoChu / dongHoVe`, `batChay` bắt đầu đếm, `tatChay` ghi `ket`, bọc `bao` thêm "⏱" (tên `dh*` trùng điều hướng 23 → dùng `dongHo*`).

### Danh sách thử trên máy thật (3.299) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › ▦ Bảng, khung xem phải đang mở | Cột Tên đọc được đủ họ tên; Tổ trưởng chỉ tên | |

**Ghi chú kỹ thuật 3.299:** 11 `bangCot('scan')` cột `to` lớp `bt-to`, hiện bỏ tiền tố "mã — ", title đủ; CSS `.bt-ten` min-width 13em, `.bt-to` max-width 11em + ellipsis.

### Danh sách thử trên máy thật (3.298) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🗂 Quản lý › 🔎 Rà CCCD | Khối "File nằm sai thư mục" (nếu có bản 01GQVL / 01TD cũ ở Hồ sơ scan) — ✔ → dời về Hồ sơ vay | |
| 2 | Thả tay 1 PDF "MãKH - Họ tên - Giấy xác nhận.pdf" vào Hồ sơ scan › Rà | Nhận vào app thành tài liệu đúng khách | |

**Ghi chú kỹ thuật 3.298:** 42 `rsDrive` duyệt `RS_TM` (cccd, tl, hsv) — `R.tm`, file gắn `__tm / __idTM`; app biết + `duongScan(k)` ≠ thư mục → `R.cho` (theo bản, không trùng) → `RS.choTM` (tích sẵn) → `canDay` + `sxDoiDrive`; đổi tên dùng `x.f.__idTM`; ngoài app ở tl/hsv → `{tl:true, loai}` → `rsNhomNhan` 1 file 1 nhóm → `rsNhanVao` che `tailieu`.

### Danh sách thử trên máy thật (3.297) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TD (hộ cũ) › 📷 Quét bản đã ký › quét đơn › 🗄 Lưu vào tủ | Drive › Hồ sơ vay: "MãKH - Họ tên - 01TD.pdf" | |
| 2 | 01/TD hộ mới có CCCD › 📷 Quét bản đã ký › Lưu | "Số CCCD - Họ tên - 01TD.pdf" ở Hồ sơ vay | |
| 3 | Bấm bản scan khách đó | Khung phải "Hồ sơ của khách" có 📄 01TD | |

**Ghi chú kỹ thuật 3.297:** 41: `sxLaHSV` (tài liệu loại ∈ `TC.loaiMau`), `duongScan` → `hsv`; `tenScanDrive` khóa `khoaCCCD`; `scanLuuTu` loại theo `SC_DAT`, `c.khoa` → `k.khoaCCCD`; `sxDangCho` bỏ bản `khoaCCCD`; `sxKeHoach` bản `khoaCCCD` có mã KH trên Mẫu 31 → `khop`. 46: `SC_DAT`, `scanChoKhach`, bọc `scanXongHop` (SXK[0], tên, dòng 📌). 40: lệnh `l01.quet`. 49: `SXT_GIU` thêm Hồ sơ vay.

### Danh sách thử trên máy thật (3.296) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay › 01/TD › hộ mới gõ tên + CCCD › 💾 Lưu | Tên "số CCCD - Họ tên - 01TD", dòng phụ Tổ · Ấp | |
| 2 | Mở danh sách bản đã lưu cũ | Tên đổi sang chuẩn; rê chuột thấy tên cũ | |

**Ghi chú kỹ thuật 3.296:** 40 `L01.tenBan` → `tcTen(tcKhoa({maKH:o.kh, cccd:n.cccd}), n.ten, tcLoaiMau('01td'))`; `noiBan` (tổ · ấp); `doiTenCu` (tenBan cũ → `tenCu`). 49: `tcKhoa`, `tcLoaiMau`, `tcTen` khóa rỗng → "Họ tên - Loại".

### Danh sách thử trên máy thật (3.295) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét / lưu CCCD, tài liệu như thường | Tên file, thư mục y như trước | |

**Ghi chú kỹ thuật 3.295:** `js/49-ten-chuan.js` nạp sau 48; `SXT` (41) lấy giá trị từ `TC.thuMuc`; `sxTenChuan` → `tcTen`; `sxSoThu` → `tcSoThu`; `duongScan` → `tcDuong`. Khóa CCCD (`tcKhoa`) + loại mẫu (`tcLoaiMau`) thêm ở bước 2 khi Hồ sơ vay dùng.

### Danh sách thử trên máy thật (3.294) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Thả tay 1 PDF + 2 ảnh CCCD (tên có mã KH) vào Drive › CCCD → 🗂 Quản lý › 🔎 Rà | Khối File trên Drive: 1 dòng gộp 3 file, tích Nhận vào app → 1 bản tên chuẩn | |
| 2 | Máy khác mở nhiều CCCD | Ảnh tải dần, không treo | |
| 3 | 🔎 Rà › 🧹 Dọn ảnh tải về | Báo đã dọn n bản; mở lại vẫn xem được | |

**Ghi chú kỹ thuật 3.294:** 43: `sxTaiVe` hàng đợi 2 luồng (`SX_TAI_DANG`, `SX_TAI_CHO`, tải thật `sxTaiVe1`); `docAnhHS` tải về → `k.anhTai`; `sxDsAnhTai` / `sxDonAnhTai`. 42: `rsDrive` ghi `ma / anh / pdf / mat` cho file ngoài (bỏ chữ Mặt trước / sau trước khi `sxBoc`); `rsNhomNhan` → `dr.nhan`; `rsNhanVao` (PDF → `driveId`; ảnh → `anhDrive`, `canDay`); `rsApDung` + `RS.nhan`.

### Danh sách thử trên máy thật (3.293) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📈 Số liệu › 🎯 Phân bổ KH (máy tính: thanh bên › Số liệu › 🎯) | Cột trái "Chưa có QĐ" + 2 nút | |
| 2 | 📥 Nhập từ bản WPF → file SaoLuu_QD_….json | Báo số lượt xã đã thêm; xã chưa ghép được báo tên | |
| 3 | Bấm 1 dòng xã → Tương đối / Chính xác → ⚙ Phân bổ | Số giống bản máy tính; ✓ Khớp | |
| 4 | Sửa 1 ô Tăng/giảm lệch | Báo LỆCH đỏ, nút 👁 Biểu 07 mờ; sửa bù → ✓ Khớp, nút bật | |
| 5 | 👁 Biểu 07 | 2 trang giống file Word bản máy tính: đầu trang UBND xã, căn cứ QĐ, bảng ấp → CT; ngày thông báo = QĐ + 1 (né T7/CN) | |
| 6 | Đổi Ngày thông báo: Để chấm / Gõ ngày | Bản xem đổi ngay (2 chỗ ngày) | |
| 7 | 📝 Word · 🖨 In · 📄 PDF | File Word mở được, sửa được; bản in 2 trang A4 | |
| 8 | QĐ nhiều xã → 📦 Biểu 07 mọi xã | 1 file / 1 lần in, mỗi xã 2 trang; xã chưa khớp báo đỏ, không in | |
| 9 | So 1 QĐ thật với Biểu 07 bản máy tính | Từng ấp, từng số giống nhau | |

**Ghi chú kỹ thuật 3.293:** dữ liệu ở `D.cauHinh.pb` qua `KHO1` (khóa `pb`). Biểu 07 không đăng ký nền ô `OM_MAU` (khai báo riêng gắn tab Hồ sơ) — nơi lập / tỉnh ở ⚙ Khai báo đơn vị › PGD (`hsoPGD('noi' | 'tinh')`). Bộ xuất Word chung (`hsoDocx`, js/25) không đọc cỡ chữ ở khung `om-co` → mẫu 07pb gắn lớp `s14` cho từng đoạn / bảng (TK phụ xem: các mẫu nền ô khác chọn cỡ 13,5 / 14 có thể ra Word cỡ 13 — chưa kiểm).

### Danh sách thử trên máy thật (3.292) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Scan › ▦ Bảng | Có cột Tổ trưởng, đúng tổ từng khách | |
| 2 | Bấm tiêu đề Tổ trưởng | Sắp theo tổ | |

**Ghi chú kỹ thuật 3.292:** 11 `bangCot('scan')` thêm cột `to` → `toTruongScan(k)` (`k.to` → `sxKhach(maKH).to`).

### Danh sách thử trên máy thật (3.291) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét 1 tờ 3–4 CCCD lộn mặt › ▲ ▼ ◀ ▶ trên từng mặt | Ráp đúng cặp nhanh | |
| 2 | Bấm 1 ảnh rồi phím mũi tên | Ảnh đi theo, vẫn đang chọn | |
| 3 | Ảnh ngược đầu › 🔄 Lật | Ảnh xoay 180° | |

**Ghi chú kỹ thuật 3.291:** 12 `veAnhHang`: thẻ dùng nút `data-lenh="hc.dich"` (d = ±1, ±2 theo thứ tự ảnh); 46 `hcDichMat` (giữ `HC_CHON` theo ảnh) + nghe `keydown` mũi tên khi có `#hc-anh` và đang chọn.

### Danh sách thử trên máy thật (3.290) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét 1 tờ nhiều CCCD (có người chưa có Mẫu 31) › 🗄 Lưu vào tủ | Chờ sắp xếp: tên "cccd-Họ tên - số" từng người | |
| 2 | 🗂 Quản lý › ⏳ Chờ sắp xếp (có bản "Scan … - người n" cũ) | Đọc ra số → đổi tên theo thẻ | |

**Ghi chú kỹ thuật 3.290:** 46: viết lại `scanLuuApp` (35) — `SAU_LUU_TAM` gắn `SX_DOC[i]` vào bản thứ i (`cccd`, `cccdDoc`, `cmnd`), nhiều người → `qlTenDoc`. 41 `sxDocTuAnh`: đọc ra số mà tên khớp `^Scan \d` → tên `cccd-…`, `canDay` nếu đã lên Drive.

### Danh sách thử trên máy thật (3.289) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Ctrl+F5 → v3.289; tab Scan › chọn / dán 2–4 ảnh IMG_73xx.HEIC | Lần đầu chờ tải bộ đọc; ảnh vào hàng quét, cắt nắn, đọc số | |
| 2 | Hộp 🪪 Quét CCCD › 🖼 Ảnh có sẵn › chọn ảnh HEIC | Đọc được số | |
| 3 | Tắt mạng, chọn ảnh HEIC (sau lần 1) | Vẫn đọc được (bộ đọc lưu trong máy) | |

**Ghi chú kỹ thuật 3.289:** 13: `anhTuBlob` onerror → `laHEIC` (nhãn ftyp byte 8–12: heic/heix/hevc/hevx/mif1/msf1) → `heicRaJPG` (`napMotTV` heic-to@1.6.5 dist/iife → `window.HeicTo`). `tests/tv.js` định tuyến jsdelivr heic-to → `tests/lib/heic-to-1.6.5`; `tests/README.md` thêm heic-to@1.6.5 vào lệnh cài thư viện thử.

### Danh sách thử trên máy thật (3.288) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tải lại trang (Ctrl+F5) → góc trên ghi v3.288 | Đúng bản mới | |
| 2 | Dán lại ảnh lúc nãy báo "Không đọc được ảnh" ở tab Scan | Ảnh tốt vào hàng; ảnh hỏng báo tên + định dạng | |

**Ghi chú kỹ thuật 3.288:** `nhanVaoScan` (12): lỗi `thuGoc` / `xuLyAnhScan` từng ảnh → `hong[]`, không vào `.catch` chung; báo sau `moHangCho`.

### Danh sách thử trên máy thật (3.287) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Copy file PDF công văn, Ctrl+V ở tab Hôm nay / Hồ sơ vay | Không thêm văn bản, chỉ báo | |
| 2 | Ctrl+V ở tab Văn bản | Thêm văn bản như cũ | |
| 3 | Copy ảnh CCCD (Zalo / thư mục), Ctrl+V ở tab Scan | Vào hàng quét Thẻ, đọc số, tra khách | |

**Ghi chú kỹ thuật 3.287:** `js/20-khoi-dong.js` sự kiện `paste` gọi `danFile(fs)` (46) thay `gioiThieuFile`; PDF → `qcTrangPDF` (trang 1 thành ảnh); Scan → `nhanVaoScan(a, 'dan')`.

### Danh sách thử trên máy thật (3.286) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sửa đơn vay / hợp đồng có in số CCCD › 🪪 Đọc số CCCD | Ô tên ra số → tự tra → tên chuẩn Mẫu 31 | |
| 2 | Tài liệu không có số › 🪪 Đọc số CCCD | Mở hộp quét CCCD; chụp thẻ → tự về, tự tra | |
| 3 | Gõ 12 số CCCD vào ô tên | Tự tra không cần Enter | |
| 4 | Tích 2–3 bản scan › 🗑 Xóa n bản | Hỏi 1 lần → vào Thùng rác | |

**Ghi chú kỹ thuật 3.286:** 45: `trNutDoc`, `trSoTrongChu` (dải số > 12 do nhãn đọc thành số → xét mọi đoạn 12 số bắt đầu 0), `trNguon` / `trTrangCanvas` / `trDoc`, `trQuetXong`; nghe `input` gõ đủ số → `trChay`. 44: `qcMo({loai:'tra', o:id})` → `qcDoc` gọi `trQuetXong`. 46: bọc `veScan` thêm `ql.xoaChon` → `qlXoaChon` (`xoaNhieuVaoRac`). CSS `.nut-bot:not(.bat)` đỏ.

### Danh sách thử trên máy thật (3.285) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app sau khi cập nhật | Chạy bình thường như 3.284 (bản này chưa có màn hình mới) | |

**Ghi chú kỹ thuật 3.285 (P1 Phân bổ KH):** lõi `js/47-phan-bo.js` chưa được tab nào gọi (P2 mới gắn giao diện) — kiem.py báo các hàm `pb…` "chỉ phép thử gọi" là đúng. `KHO.duNoAp` dùng `slBo(kỳ)` (bảng Mẫu 31 dạng cột), kết quả đơn vị đồng. Thứ tự ấp ở chế độ chính xác = thứ tự danh sách ấp truyền vào; ấp có dư nợ mà không có trong danh sách xếp cuối + cảnh báo. Chi tiết, phân công file 2 tài khoản: `docs/KE_HOACH_PHAN_BO_KH.md`.

### Danh sách thử trên máy thật (3.284) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm GIAO THỊ ÚT (đang hiện trang A4) | Tách ra 2 mặt, hoặc dòng đỏ "Không tách được" ngay trên khung xem | |
| 2 | Bấm CCCD đã tách / ảnh lúc quét | Có dòng trạng thái trên khung xem | |

**Ghi chú kỹ thuật 3.284:** 43: `sxCatThe2` (nền theo 4 góc, dải hàng ngưỡng 12 %, cột 30 %, khối tỉ lệ 1,2–2,1, 2 khối diện tích ≥ 60 % nhau); `sxCatTuPDF` dùng `sxCatThe || sxCatThe2`; `SX_CAT_BAN = 2`, `catHong` = số bản; `sxVeTTCat` chèn `.sx-cat-khung` trước `#cp-than` / `#x-than`; bọc `veNoiDung` bỏ khung trạng thái cũ.

### Danh sách thử trên máy thật (3.283) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm lại các PDF cũ chưa tách, không báo | Tự tách 2 mặt, hoặc dòng đỏ báo lý do | |
| 2 | Bản báo "Không có ảnh mặt thẻ" › ↻ Tách 2 mặt từ PDF | Hiện 2 mặt | |

**Ghi chú kỹ thuật 3.283:** 43: `sxLaCCCD` nhận bản trong `D.scan` che trống; `sxCanCat` dùng `sxLaCCCD`; `sxCatTuPDF` ghi `che='the'`; `sxVeTTCat` kiểm `docAnhHS` khi ghi "lúc quét"; `sx.catLai` không lấy được ảnh → xóa `anhDrive` / `matTruoc` rồi tách lại (ảnh cũ trên Drive nếu còn → Rà báo "File trên Drive không qua app").

### Danh sách thử trên máy thật (3.282) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tích ☐ 4 CCCD (có bản cũ chỉ có PDF) › 🖨 In 4 người | Tách xong → 1 trang A4 đủ 4 khách, 2 mặt cạnh nhau | |
| 2 | Tích thêm 1 bản không tách được | Không có ô trống; báo tên bản đó | |

**Ghi chú kỹ thuật 3.282:** 43: bọc `dungTrangThe` lần nữa (`SX_DUNG_THE_282`, ngoài bọc 3.277) — chỉ `in` / `luu`, ≥2 bản thẻ: `sxCatMot` các bản `sxCanCat` thiếu ảnh, lọc bản không có `_matTruoc`.

### Danh sách thử trên máy thật (3.281) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm CCCD tự tách được | Dòng "✂ Đã tách 2 mặt từ PDF — chưa duyệt" | |
| 2 | Bấm CCCD không tách được | Dòng đỏ "⚠ Không tách được" + lý do + ↻ Thử tách lại | |
| 3 | 🔎 Rà CCCD | Khối "Không tách được 2 mặt thẻ" liệt kê đúng | |

**Ghi chú kỹ thuật 3.281:** 43: `sxCatTuPDF` ghi `catLoi` (không tải PDF) / `catHong` (không dò ra khung) ở mọi nơi gọi; `sxLaCCCD`, `sxLyCat`, `sxTTCat`, `sxVeTTCat` (chèn `.sx-cat-tt` vào `cp-phu` / `x-phu`), lệnh `sx.catLai`. 42 `rsVeCat`: khối bản hỏng.

### Danh sách thử trên máy thật (3.280) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm 1 CCCD cũ (đang hiện trang A4) | Báo đang tách → hiện Mặt trước / Mặt sau; Drive có thêm 2 file .jpg | |
| 2 | 🗂 Quản lý › 🔎 Rà CCCD | Khối "Ảnh cắt từ PDF" có các bản vừa tách; cắt lệch → ↻ Cắt lại / Bỏ ảnh cắt | |
| 3 | Khách có 2–3 tài liệu cùng loại › 🔎 Rà | Không báo trùng; tên … - Tài liệu (2), (3) | |

**Ghi chú kỹ thuật 3.280:** 43: `sxCanCat` (che the / nhãn CCCD, có driveId, chưa anhDrive / catBo / catTuPDF / catHong), `sxCatMot` (1 lời hứa / bản, dò hỏng → `catHong`), bọc `veVaoKhung` (trừ khung 'sua'; có ảnh trong máy → như cũ). 42: `moRaSoat` thêm bản `sxCanCat && !matTruoc`; `rsLap` nhóm tài liệu chỉ giữ bản `giong`. 41 `scanLuuTu` + 45 `trGan`: cảnh báo đánh số chỉ cho CCCD.

### Danh sách thử trên máy thật (3.279) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sửa tài liệu Võ Văn Cường › 🔎 Tra Mẫu 31 › Lưu | Lưu được; Drive đổi tên MãKH - Võ Văn Cường - … | |
| 2 | ☁ Tải trang từ Drive | Hiện 6 trang | |

**Ghi chú kỹ thuật 3.279:** `luuScanTL` (12-scan) cho lưu khi `k.driveId` dù `k.trang` trống; `veTrangScan` báo + nút lệnh `tl.taiTrang` → `tlTaiTrang()` (45: `taiPDFDrive` → `catPDFNguon` → `ghepTrangPDF`).

### Danh sách thử trên máy thật (3.278) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Scan › 🗂 Quản lý hồ sơ scan | 1 màn, 3 thẻ chuyển qua lại | |
| 2 | Quét CCCD có QR › 🗄 Lưu vào tủ | Tự lưu đúng khách, tên chuẩn | |
| 3 | Quét tài liệu, gõ số CCCD ở Tên file › 🗄 Lưu vào tủ | Lưu đúng khách | |

**Ghi chú kỹ thuật 3.278:** `js/46-quan-ly-scan.js` bọc `sxVeSapXep`, `rsVe`, `sxKiemVe` (chèn `.ql-the`), `veScan` (thay nút thanh); `qlLuuTu()`; lệnh `ql.mo`, `ql.chonKH`. 35-scan: nút `luu` thay `app` + `tu`.

### Danh sách thử trên máy thật (3.277) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét lại CCCD 1 khách đã có | Báo ⚠ đã có bản cũ; Drive tên "… - CCCD (2).pdf" | |
| 2 | Bản cắt từ PDF chưa duyệt › 🖨 In | In PDF gốc | |
| 3 | Mở 🧹 Sắp xếp / 🔎 Rà trên điện thoại | Xếp dọc, đọc được | |

**Ghi chú kỹ thuật 3.277:** `sxSoThu(k, laKA)` (thứ tự theo taoLuc / id trong nhóm cùng mã KH + loại) dùng trong `tenScanDrive`, `sxTenKA`, `sxTenAnh`; `dungTrangThe` bọc (43) cho `catTuPDF && !catDuyet`; veScan (41) gỡ thanh "chưa khai".

### Danh sách thử trên máy thật (3.276) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hôm nay › Hạn trả HSSV, gõ đủ số liệu | Khung cao tới đáy trang, hiện đủ kết quả; tiêu đề 1 dòng | |

**Ghi chú kỹ thuật 3.276:** `ccVuaMan` dùng `window.innerHeight` khi `.day` ẩn; CSS `#cc-o .cc-dau` gap 3px, nút 2px 5px, `.cc-gian` flex:1 1 0.

### Danh sách thử trên máy thật (3.275) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sửa bản quét hộ Thủy › gõ số CCCD / mã KH › 🔎 Tra Mẫu 31 | Ô tên = họ tên Mẫu 31, địa bàn tự chọn, báo tên file chuẩn; Lưu → lên Drive đúng tên | |
| 2 | Lưu mới sau khi quét › gõ số CCCD ở Tên file › 🔎 | Tên chuẩn + nút Lưu đúng khách | |
| 3 | Sửa bản quét trên máy không có ảnh | Hiện 2 mặt thẻ (tải / cắt từ PDF) | |

**Ghi chú kỹ thuật 3.275:** `moHop` bọc → `trGanNut()` gắn nút cho `#k-ten` (bản scan), `#sx-ten`, `#ka-ten(2)`; Enter bắt ở `window` (trước phím chung). `trTim(q, db)` (sxBoc + sxXacDinh + slTimKH); `trGan` theo nơi; `veAnhKhach` bọc → `sxAnhDoc`.

### Danh sách thử trên máy thật (3.274) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét CCCD lần 2 sau khi lần 1 tích "photo 2 mặt" | Ô không tích sẵn; ảnh 1 mặt thẻ cắt đủ thẻ | |
| 2 | Chụp giấy dưới đèn vàng, chọn Magic | Nền trắng, không ám vàng | |

**Ghi chú kỹ thuật 3.274:** `js/13-xu-ly-anh.js` `canBangTrang(p)` gọi trong `locMagic` sau chuẩn nền sáng; `js/41-scan-sap-xep.js` `sxMotTheLon(im)` (timKhungThe + tỉ lệ + diện tích + tỉ lệ điểm không phải nền trắng ≥ 85%).

### Danh sách thử trên máy thật (3.273) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sổ hộ vay › ✎ hộ › 🪪 Quét › 📷 Chụp (điện thoại) | Mở camera sau, chụp thẻ → bảng xác nhận → Điền đúng 4 ô | |
| 2 | 🪪 Quét › 🖼 Ảnh có sẵn (bản photo 2 mặt) | Đọc được, điền được | |
| 3 | 01/TD hộ mới › 🪪 Quét | Điền người vay; tab Scan có bản CCCD mới (chờ sắp xếp) | |

**Ghi chú kỹ thuật 3.273:** `qcMo({loai:'hm'|'l01', i})` mở hộp con (GD.moCon khi đang có hộp); `qcCatThe` = timKhungThe + nanPhoiCanh; `qcGiaTri` (tên Mẫu 31 khi thẻ không dấu); `qcDien` → `hmChuan` rồi `hmVe` / `hsoVe`; `qcLuuTu` thêm bản `tuForm:1`. Camera: getUserMedia trong hộp, tự tắt khi hộp đóng.

### Danh sách thử trên máy thật (3.272) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Scan, bấm 1 bản CCCD đã gắn khách | Khung phải có dòng Hồ sơ của khách; bấm ✍ Chữ ký → chuyển xem chữ ký | |

**Ghi chú kỹ thuật 3.272:** `js/43-scan-anh-drive.js` bọc `xemThu` (loai scan / ka) chèn `sxHoSoKhach(maKH, id)` vào `#cp-phu` (máy tính) hoặc `#x-phu` (khung lớn).

### Danh sách thử trên máy thật (3.271) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét 1 CCCD mới, chờ đồng bộ | Drive › CCCD có 3 file: PDF + Mặt trước.jpg + Mặt sau.jpg | |
| 2 | Mở bản đó trên máy thứ 2 | Khung xem hiện to từng mặt, hộp Sửa có ảnh | |
| 3 | 🔎 Rà trên máy có bản cũ chỉ PDF (hộ Thủy) | Khối "Ảnh cắt từ PDF" có 2 ảnh cắt; chọn Đúng / Cắt lại / Bỏ | |
| 4 | Mở "📋 Thông tin đọc được" ở 1 dòng | Bảng Trên thẻ / Mẫu 31 ✓ / ✗ | |
| 5 | In Mẫu 04/TD | Tên cơ quan và tiêu ngữ cách xa hơn, không tràn lề | |

**Ghi chú kỹ thuật 3.271:** `js/43-scan-anh-drive.js` bọc `docAnhHS` (tải ảnh Drive khi thiếu), `coAnhTrongMay`, `scanCanDay` (bản PDF đã lên mà ảnh chưa lên), `dayMotScan` (chiAnh / catTuPDF → `dayMetaScan`), `doiChoScanKA`, `xoaAnhMayCua`; `k.anhDrive = {truoc|sau: {id, ten, cha}}`; `sxCatThe` dò dải thẻ đầu trang (ngưỡng `SX_CAT_THAM`, lần cắt `k.catLan`); `sxBangDoc`; `sxCmndCua`. 41: `sxDoiDrive` gọi `sxDayAnh`; `sxDriveCho` bỏ qua ảnh của app; 42: `rsDrive` tính cả ảnh; `rsVeCat`.

### Danh sách thử trên máy thật (3.270) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp Mẫu 31 ngày → tab Scan › 📊 Kiểm tra | Dòng đầu ghi "Mẫu 31 ngày dd/mm/yyyy", có khách mới giải ngân | |

**Ghi chú kỹ thuật 3.270:** `sxKy31Moi()` = kỳ hstd mới nhất theo `slThuTu`; `sxChuKy31()` ghi ở đầu hộp Sắp xếp / Rà.

### Danh sách thử trên máy thật (3.269) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🧹 Sắp xếp với bản "Nguyen Thi Bich Thuy" (có mạng) | Thanh "Đang đọc số CCCD từ ảnh…" → dòng hiện "Thẻ đọc được: số · sinh …"; khách đúng ngày sinh lên Gợi ý (hoặc ✓ chắc nếu Mẫu 31 có số CCCD) | |
| 2 | Dòng trùng tên | Mỗi khách ghi CCCD / ngày sinh Mẫu 31, có ảnh nhỏ 2 mặt thẻ | |
| 3 | Hộ Thủy (tổ Mai Văn Quang) trên máy không có ảnh thẻ | Sắp xếp tải PDF từ Drive đọc số; khách tổ Mai Văn Quang lên Gợi ý ("đúng tổ / ấp anh chọn khi quét") | |

**Ghi chú kỹ thuật 3.269:** `docCCCD`: QR cả ảnh → 4 góc phóng to (`sxManh`); mã máy đọc đáy ảnh → 4 góc; `cccdQR` nhận mẫu khác; `SX_DOC_BAN = 2` (cccdKhong / raDoc.ban); `sxXacDinh({ns, db})` tách trùng theo ngày sinh + tổ / ấp chọn khi quét (`sxDBQuet`, `sxHopDB` — so mã tổ); `sxAnhDoc` (ảnh trong máy → PDF Drive); `sxNhanKH2`. tests/tv.js định tuyến Tesseract 5.1.1 + core 5.1.0 + eng → tests/lib.

### Danh sách thử trên máy thật (3.268) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Scan › 🔎 Rà CCCD đã lưu | Thanh chạy đọc từng bản (có Dừng) → hộp nhóm ✓ / ✗ / ⚠ / ⏳ / ⏰ / ? | |
| 2 | Bản sai khách → chọn Đổi sang → ✔ Làm | Tên file trên Drive đổi theo khách đúng, ảnh khách đi theo | |
| 3 | Khách có 2 bản CCCD giống nhau | Khối Bản trùng, ảnh nhỏ cạnh nhau, bản thừa tích sẵn Xóa → vào Thùng rác | |
| 4 | Bấm 🔎 lần 2 | Không đọc lại bản đã rà (nhanh) | |

**Ghi chú kỹ thuật 3.268:** `js/42-scan-ra-soat.js`: `rsDoc` (đọc → `k.raDoc`), `rsXet` (nhóm), `rsVanTay` (băm FNV-1a 2 lượt + dHash 8×8 + ảnh nhỏ), `rsSoSanh`, `rsDrive` (liệt kê thư mục CCCD có md5Checksum), `rsApDung`. Hạn CCCD: `sxHanCCCD(ns, ncap)`; `cccdMRZ` thêm `han`. Chưa so được nội dung file chỉ có trên Drive (chỉ md5).

### Danh sách thử trên máy thật (3.267) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🧹 Sắp xếp có bản trùng tên / gợi ý | Cửa sổ rộng, thấy nút tròn chọn khách, ô ☑ Đúng; nút đáy đếm đúng số bản | |

**Ghi chú kỹ thuật 3.267:** `sxViec()` đếm việc sẽ làm, `sxDemNut()` cập nhật nút; GD `sx.chon` / `sx.xn` không vẽ lại.

### Danh sách thử trên máy thật (3.266) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🧹 Sắp xếp với các bản trùng tên | Thanh chạy "Đang đọc số CCCD từ ảnh…" → bản đọc được số chuyển sang "✓ Xác định chắc" | |

**Ghi chú kỹ thuật 3.266:** đọc 3 dòng mã máy đọc lần đầu tải bộ chữ Tesseract (cần mạng); `k.cccdKhong` = đã đọc không được.

### Danh sách thử trên máy thật (3.265) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Lưu `cccd-Tên` (chỉ tên) → 🧹 Sắp xếp | Nằm ở "? Gợi ý — chưa chắc (chỉ khớp tên)", bấm ✓ Đúng mới xếp | |
| 2 | Lưu `cccd-Tên - <số CCCD>` | Xác định chắc → tự đặt tên + dời | |

**Ghi chú kỹ thuật 3.265:** `sxXacDinh({cccd, ma, ten})` → {ma, theo} chắc · {goiY, ly} · {ds} · {}.

### Danh sách thử trên máy thật (3.264) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Quét CCCD thẻ thật (điện thoại / webcam) | Hiện "✓ Đọc được CCCD … → mã KH · tên" → 🗄 Lưu đúng khách → Drive `CCCD/MãKH - Tên - CCCD.pdf` + `Chữ ký - Ảnh khách/… - Ảnh.jpg` | |
| 2 | Quét bản photo 2 mặt (tích ô) | Ra 2 mặt đúng khổ, đọc được số qua 3 dòng mã máy đọc | |
| 3 | Lưu vào app tên `cccd-Tên` | Drive `Scan chờ sắp xếp/cccd-Tên.pdf` | |
| 4 | 🧹 Sắp xếp | Khớp → đặt tên + dời; trùng → chọn; file cũ dời; thư mục cũ trống vào thùng rác | |
| 5 | 📊 Kiểm tra | Bảng theo tổ đúng số hộ / có CCCD | |

**Ghi chú kỹ thuật 3.264:** đọc 3 dòng mã máy đọc cần tải bộ chữ tiếng Anh của Tesseract lần đầu (có mạng); QR đọc offline sau lần tải jsQR đầu. Chưa làm: dòng "Hồ sơ của khách" ở khung xem phải (gom CCCD / chữ ký / ảnh / tài liệu 1 khách) — bản sau.

### Danh sách thử trên máy thật (3.263) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sao kê › THHD, phạm vi toàn PGD | 1 trang dọc: chỉ tiêu chính, theo xã ├ điểm, theo hội, theo chương trình | |
| 2 | Chọn xã → điểm → hội → tổ | Chi tiết đổi theo cấp (điểm / hội / tổ cần lưu ý / từng tổ / hộ cần lưu ý) | |

**Ghi chú kỹ thuật 3.263:** `ttTHHD` (cấp = to › hoi › diem › xa › pgd theo skCH()); bảng `ttTHBang` + cột `TT_TH_COT`; bỏ ttTongHop / ttTheoXa / ttTheoHoi / ttGhiChu / ttBangDon.

### Danh sách thử trên máy thật (3.262) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn kỳ theo ngày có Mẫu 31 ngày đó → Bộ thông tin tổ | Đầu trang "Số liệu ngày …", số theo ngày | |
| 2 | Cột Số hộ / Số hộ đang có dư nợ | Số hộ = tổ viên (tab Tổ), có dư nợ ≤ Số hộ | |

**Ghi chú kỹ thuật 3.262:** `ttChuanBi` → `TT_NGAY` khi `B.nguon.hstd === ky`; `ttNgayL(L)` = ngày thật của file L đang dùng.

### Danh sách thử trên máy thật (3.261) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sao kê › Bộ thông tin tổ (kỳ T9 chốt tháng) › 👁 Xem | Tổng hợp → theo xã → theo hội → điểm → xã → 3 sao kê → Ghi chú; bản in không chồng chữ | |
| 2 | Chọn kỳ theo ngày rồi Xem | Vẫn ra số chốt cuối tháng của tháng đó | |
| 3 | 📊 Excel, so file tổng hợp tháng 08 | Cột, thứ tự sheet giống; số khớp Mẫu 31 cuối tháng | |

**Ghi chú kỹ thuật 3.261:** `skXem` nạp trước 1 lần cho kqgd / bott (`ttChuanBi` → file phân kỳ → lập, đổi `SK_K` sang số chốt tháng trong lúc lập rồi trả lại). Cột bảng tổ khai ở `TT_COT` (cột 4 = có trong bản in).

### Danh sách thử trên máy thật (3.260) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ⚙ Khai báo › 💾 Sao lưu › 🧾 Sổ cài đặt › Xem | Khóa theo khối, có mô tả; khóa lạ (nếu có) đứng đầu | |
| 2 | Kéo độ rộng khung xem / cột | Kéo được như cũ | |

**Ghi chú kỹ thuật 3.260:** thêm khóa cài đặt mới → thêm 1 dòng vào `CH_SO` (`js/17b-so-cai-dat.js`), không thì `kiem.py` báo lỗi. Khóa đặt tên động thêm vào `CH_SO_MAU` (mẫu regex).

### Danh sách thử trên máy thật (3.259) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › Sao kê › chọn 1 xã → Bộ thông tin tổ → 👁 Xem | Mỗi điểm GD 1 trang KQGD + 3 tháng KHĐ + Nợ QH + Nợ khoanh | |
| 2 | So trang KQGD với 13/GDX cùng điểm | Số tổ, số khách, dư nợ, QH, khoanh, lãi tồn khớp (doanh số / lãi đã nộp có thể lệch vì 13/GDX theo phiên) | |
| 3 | 📊 Excel | Sheet tên điểm GD + 3 sheet; sửa 1 số trong dòng tổ → dòng Hội, CỘNG tự đổi | |

**Ghi chú kỹ thuật 3.259:** `js/22j-thong-tin-to.js` (`ttBaoCao`, `ttDuLieu`, `ttKQBang`, `ttSaoKe`); công thức Excel tính dòng theo `TT_DONG0 = 5` (skExcel chèn 4 dòng đầu) — đổi phần đầu sheet ở `skExcel` thì sửa hằng này. Chấm điểm tổ (BC0437 tháng, lũy kế) chưa đưa vào — chờ anh gửi cách chấm lũy kế.

### Danh sách thử trên máy thật (3.258) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Hồ sơ vay | Chip đúng thứ tự Sổ · 01/UQ · 01/TD HSSV · 01/TD NSVSMT · 03/TD · 06/TD · 01/GQVL · 07b · 01/TGTV · 09A · 01/TĐCK | |
| 2 | Bấm 01/TD NSVSMT | Form 01/TD chương trình nước sạch | |

**Ghi chú kỹ thuật 3.258:** chip 01/TD theo chương trình chỉ ở thanh chip; `hsoMau()` vẫn là `01td`.

### Danh sách thử trên máy thật (3.257) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hộ HSSV → mở 01/GQVL, 07b | Báo chỉ dùng cho GQVL + nút chuyển; bản in không có tên SV | |
| 2 | Hộ GQVL → mở 01/TGTV, 01/TD | 01/TGTV không chữ GQVL; 01/TD chỉ nhắc mở 01/GQVL | |

**Ghi chú kỹ thuật 3.257:** `hsoLaGQ(B)` — phiếu đang ở chương trình dạng GQVL; dữ liệu 01/GQVL, 07b chỉ lấy `hsoGQ(B)` khi đúng.

### Danh sách thử trên máy thật (3.256) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📒 Sổ hộ vay: hộ có vợ, con lớn, con nhỏ → 📄 Lập HS → 01/UQ | Form theo thứ tự giấy; con nhỏ "không vào giấy"; thiếu CCCD báo ⚠ | |
| 2 | Đổi người được ủy quyền | Bản in đổi; 01/TD người vay đổi theo | |

**Ghi chú kỹ thuật 3.256:** người được ủy quyền = `o.dung` (người đứng tên) của hộ trong sổ — một nguồn với 01/TD; tuổi tính đến ngày lập giấy (trống = hôm nay).

### Danh sách thử trên máy thật (3.255) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 06/TD › ⚙ Khai báo riêng → Đơn vị "Để chấm", ngày kiểm tra, cán bộ 2 | Phiếu đổi đúng chỗ | |
| 2 | ↺ Về mặc định | Về như ban đầu | |

**Ghi chú kỹ thuật 3.255:** `hso06V()` → tham số `v` của `ktGiaTri06` (dv '-' = chấm, chữ = gõ riêng, '' = theo Hội; ng1 vai trò; cb2 / cv2; ngay).

### Danh sách thử trên máy thật (3.254) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 01/TD | Thân chữ 14, vẫn 1 trang, gạch tiêu ngữ vừa chữ | |
| 2 | ⚙ Khai báo riêng 09A → Cỡ chữ 13,5 → In | Chữ thân 13,5; quốc hiệu giữ cỡ cũ | |

**Ghi chú kỹ thuật 3.254:** cỡ chữ thân = `div.om-co` bọc HTML mẫu; đoạn có class `s12`, `s14`… hoặc style riêng (quốc hiệu, tiêu đề) giữ cỡ riêng.

### Danh sách thử trên máy thật (3.253) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Lập 01/TD 1 hộ → tab 06/TD | Phiếu khổ ngang Mẫu 06: tên, chương trình, giải ngân, dư nợ, mục đích điền sẵn; phần thực tế trống | |
| 2 | 03/TD thêm 2 hộ cùng tổ → 06/TD | 1 phiếu 3 hộ, dòng Cộng đúng | |
| 3 | 06/TD → Word | File Word khuôn KTGS | |
| 4 | 01/TD tích In kèm 06/TD → In | In bộ hồ sơ rồi in tiếp 06/TD | |

**Ghi chú kỹ thuật 3.253:** 06/TD không qua `hsoTrang` / `hsoDocx` (mẫu KTGS có CSS / khuôn riêng): `hsoLap` trả `x.trang = ktHTML06(...)`, `hsoWord` gọi `hsoWord06HS`. Hộ chưa có tổ → tổ tạm theo xã / thôn của hộ.

### Danh sách thử trên máy thật (3.252) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TD › ⚙ Khai báo riêng › 🖼 → đổi 1 ô → ✕ Hủy | Ô trở lại như cũ | |
| 2 | Đổi ô "Số tiền trả nợ" sang ✏ gõ trong lần làm → 💾 Lưu | Khung đóng, ô đó ra cột trái để gõ | |
| 3 | Mở lại, ↺ Mặc định ô này | Riêng ô đó về mặc định | |
| 4 | Làm như trên ở 03/TD, 09A, 10C | Giống 01/TD | |

**Ghi chú kỹ thuật 3.252:** `HOP_KHI_DONG` (js/06): việc chạy khi `dongHop()` mà chưa Lưu; `moHop` mở hộp khác thì bỏ. Khai báo riêng chụp `hsoLuu().cham/chamGT/chuMau/nhanh[mẫu]` lúc mở.

### Danh sách thử trên máy thật (3.251) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Lập 01/TD HSSV → 📄 Mẫu 03 | Cột Đối tượng thụ hưởng: "Hộ gia đình gặp khó khăn về kinh tế, tài chính do bệnh tật" | |

**Ghi chú kỹ thuật 3.251:** chuyển 1 lần theo cờ `hsoKB().v251` — chỉ điền khi thẻ HSSV chưa có ĐTTH nào.

### Danh sách thử trên máy thật (3.250) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 01/TD HSSV in sẵn UBND + NH | Chủ tịch ký không đè chữ; NH đủ chỗ ký; 1 trang | |

**Ghi chú kỹ thuật 3.250:** cân trang 01/TD: UBND 4 dòng trống, NH 2 dòng trống — trường hợp nặng nhất vừa khít 1 trang (thêm dòng nữa sẽ tràn).

### Danh sách thử trên máy thật (3.249) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 01/TD bật in sẵn UBND + NH | 1 trang; chỗ ký NH còn ≥ 3 dòng; NH "… đồng (Bằng chữ: …)" liền | |
| 2 | Nhìn gạch dưới tiêu ngữ 01/TD, 01/UQ, 09A | Mảnh, sát chữ không dính, dài đúng bằng dòng chữ | |
| 3 | Lề trên 01/TD | Đầu trang gần mép hơn (7 mm) | |

**Ghi chú kỹ thuật 3.249:** độ dài gạch tiêu ngữ = `omRong(tiêu ngữ, cỡ, đậm)` (canvas, Times New Roman); Word dùng `data-ke` (mm) → `pBdr` với lề trái/phải theo độ dài.

### Danh sách thử trên máy thật (3.248) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 01/TD NSVSMT | 2 dòng công trình + 1 dòng chấm | |
| 2 | In 01/TD HSSV tên SV dài | SV xuống 2–3 dòng, số lượng / thành tiền giữa ô, 1 trang | |
| 3 | In 01/TD tên người vay ngắn | "Năm sinh" cách tên khoảng 1 tab | |
| 4 | In / Word 01/UQ, 09A, 10C bản trắng | Dòng chấm nhỏ mịn, dài như cũ, không xô dòng | |

**Ghi chú kỹ thuật 3.248:** `omChamMin(h)` bọc chuỗi chấm (≥ 4 dấu, … = 4) trong `span.om-min` (65 %, line-height 0). Phép thử so chuỗi chấm gốc dùng `hsoLap().h`; bản in dùng `HSO.x.ds[i].h` / `trang` (đã chấm mảnh).

### Danh sách thử trên máy thật (3.247) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 01/TD HSSV có UBND | Chữ 14, 1 trang; dòng CCCD, địa chỉ in liền; Hội không ghi xã; chỗ ký UBND, NH rộng | |
| 2 | In 01/TD bản trắng | 1 trang, bảng 2 dòng chấm | |
| 3 | Hộ thuộc Đoàn thanh niên | "Thuộc tổ chức Đoàn thanh niên quản lý" | |

**Ghi chú kỹ thuật 3.247:** `G.o(k, cham, {lien:1})` — ô in chữ liền khi có số liệu; dùng cho các dòng văn xuôi. Ô trong dòng cần thẳng cột (Họ tên … Năm sinh) vẫn để khung cố định.

### Danh sách thử trên máy thật (3.246) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📒 Sổ hộ vay → 📄 Lập HS một hộ → 01/TD tích In kèm 01/UQ, 10C, 03/TD → In / Word | 1 lần in đủ các mẫu | |
| 2 | Máy có phiếu hồ sơ cũ (lập ở Bộ HS trước đây) | Phiếu vẫn mở được qua Sổ hộ vay, in đúng | |

**Ghi chú kỹ thuật 3.246:** in nhiều mẫu một lần = `hsoLapBo(Object.assign({}, B, {chon:Object.assign({td:1}, B.kem)}))` gọi từ 01/TD khi có In kèm. Không còn mẫu `bo` trong `HSO_MAU`; `hsoCH().hsv==='bo'` cũ đã chuyển `sohv` từ 3.209.

### Danh sách thử trên máy thật (3.245) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › thanh dưới | Không còn dòng chip 📋; cảnh báo + nút In vẫn có | |
| 2 | Xuất bản GDX mini → mở Mẫu 04 | Mở được, có nét gạch tay mục 2, không báo lỗi | |

**Ghi chú kỹ thuật 3.245:** hàm / biến mới dùng trong `gdxHTML04` (hoặc mẫu GDX khác) phải thêm vào danh sách `ham` / `bien` trong `gdxMiniXuat` (`js/27-mini-gdx.js`) — t168 kiểm.

### Danh sách thử trên máy thật (3.244) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TD hộ có 2 SV (HSSV) | Có chip chọn SV, chọn SV nào in đơn SV đó | |
| 2 | 01/TD tích In kèm 01/UQ khi hộ thiếu CCCD thành viên | Hiện ⚠ + nút Bổ sung; In ra 01/UQ + 01/TD (+ 03/TD nếu tích) | |

**Ghi chú kỹ thuật 3.244:** `hsoTuySV`, `hsoTuyKem` dùng chung giữa `hsoTuyVay` (mẫu khác) và `L01.form`.

### Danh sách thử trên máy thật (3.243) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › Mẫu 04 → In | "Gò Dầu" không tách dòng; "tại địa điểm: …" nối liền; 3 dòng chấm mục 2 có nét gạch tay mảnh | |
| 2 | ⚙ Khai báo riêng › Mục 2 → Ẩn → In | Không còn nét gạch, chấm trống để ghi tay | |

**Ghi chú kỹ thuật 3.243:** nét gạch tay = SVG nhỏ (`gdxGachTay`, 14×20 px) đặt tuyệt đối giữa dòng chấm (`span.dots-fine` position:relative). Giữ liền chữ bằng `&nbsp;` (`gdxLien`).

### Danh sách thử trên máy thật (3.242) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay › 01/TD | Form đi đúng thứ tự tờ giấy; chọn chương trình bằng chip, không có GQVL | |
| 2 | Gõ người vay mới, Tab / Enter liên tục, ngày gõ liền số | Con trỏ sang ô kế; ngày đúng; nơi cấp tự điền; hộ mới vào Sổ hộ vay | |
| 3 | Chọn Xã → Thôn → Hội → Tổ | Xã quản lý đầu danh sách; Hội lọc tổ; tổ trưởng + Hội hiện | |
| 4 | NSVSMT tích 2 công trình, để trống tự có | Đề nghị 50 tr, tổng 55 tr (tự có mặc định 5 tr) | |
| 5 | 💾 Lưu → Làm trống → bấm bản đã lưu | Tên không dấu + tổ + ấp; mở lại đúng hộ | |
| 6 | Sửa rồi bấm In / Mẫu 03 chưa lưu | Hỏi "Lưu bản 01/TD này trước?"; Mẫu 03 có hộ vừa lập | |
| 7 | Chọn hộ cũ có mã KH | Ô nhân thân khóa, lấy theo Mẫu 31 | |

**Ghi chú kỹ thuật 3.242:** form 01/TD = `L01.form` (`js/40-lap-01td.js`), vẽ lại bằng `setTimeout` và giữ con trỏ theo `data-l01`; ô cũ giữ con trỏ qua `hsoVeGiuO`. Phím chung nhận thêm gốc `div.phim-chung`. `hsoTuCo(B)` = tự có hoặc mặc định thẻ; `hsoLoaiChu(C, v)` đổi mã loại cũ sang chữ.

### Danh sách thử trên máy thật (3.241) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › Mẫu 04 → In | Lề 2/2/3/2 cm; gạch PGD ½ chữ, mảnh; tiêu đề cùng cỡ; giãn đều; 1 trang | |
| 2 | 12/GDX → In | Như cũ, nét gạch đầu mẫu mảnh | |

**Ghi chú kỹ thuật 3.241:** nét kẻ mảnh trong bản in: dùng vạch `height:1px; background:#000; transform:scaleY(.55)` (viền `border` < 1 px bị làm tròn 1 px).

### Danh sách thử trên máy thật (3.240) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TD HSSV (tên SV dài) → In | Tên xuống dòng, chữ thường; chỗ Chủ tịch ký + đóng dấu rộng; 1 trang, chỗ ký NH đủ | |
| 2 | 01/TD NSVSMT tích 2 công trình → In | 2 dòng số liệu + 1 dòng chấm; 1 trang | |
| 3 | Lập 01/TD xong → 03/TD | Số tiền, mục đích, thời hạn theo 01/TD; 3 dòng; "Khu phố / Phường" đúng địa bàn | |
| 4 | 03/TD → Bản trắng | 5 dòng | |
| 5 | ⚙ Khai báo riêng | Mặc định tắt; bấm ▸ Mở / ▾ Tắt | |
| 6 | Mở phiếu hồ sơ cũ (lập trước đây) | Hiện đúng hộ, hộ có trong Sổ hộ vay | |

**Ghi chú kỹ thuật 3.240:** việc tiếp theo kế hoạch: dọn giao diện Bộ HS / Hộ vay cũ (anh: "cái nào cũ đã bỏ thì dọn rác"), 06/TD, Giấy ủy quyền, form 01/TD theo thứ tự giấy + lưu bản.

### Danh sách thử trên máy thật (3.239) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Ô tìm đầu trang: gõ nhanh từ khóa (tab Văn bản nhiều mục) | Lọc mượt, kết quả như cũ | |
| 2 | Khung xem file: 🖨 In · 📤 Gửi file · ✎ Sửa · + / − / 100% · ⛶ | Như cũ (menu Gửi hiện cạnh nút) | |
| 3 | Mở hộp bất kỳ → bấm ra ngoài hộp | Đóng hộp (hộp đang khóa thì không) | |
| 4 | Scan thẻ: chụp / xoay liên tục 10–20 thẻ (điện thoại) | Không tự tải lại trang | |

**Ghi chú kỹ thuật 3.239:** tạo ảnh / file tạm mới → dùng `anhTam` (ảnh) hoặc `thuHoiSau(url)` (tải về, mở tab). Nút mới trong `index.html` → `data-lenh="khung.…"` + đăng ký ở `js/39-gd.js`.

### Danh sách thử trên máy thật (3.238) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sổ hộ vay › ⤢ Phóng to | Hộp lớn xem bản in sổ; Đóng / 🖨 In | |
| 2 | Đóng → ＋ Hộ mới | Mở form khai báo hộ | |
| 3 | Hồ sơ Tổ › ⤢ Phóng to (toàn màn hình) → Esc → bấm nút mở hộp bất kỳ | Hộp hiện bình thường | |

**Ghi chú kỹ thuật 3.238:** hướng B Hồ sơ vay chờ anh nói logic từng phần — chưa đổi khối chọn hộ ở các tab mẫu.

### Danh sách thử trên máy thật (3.237) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sổ hộ vay: sửa thẳng ô tên / địa chỉ, gõ có dấu nháy kép (vd Ấp "Mới") → mở lại | Ô hiện đủ chữ, bảng không vỡ | |

**Ghi chú kỹ thuật 3.237:** phép thử nhanh chỉ cho hàm thuần (tính toán, chuẩn hóa, kiểm tra) — hàm cần DOM thật vẫn thử bằng trình duyệt. Thêm phép thử: 1 dòng `thu('tên', () => điều kiện)` trong `tests/nhanh/thu.js`; sửa hàm nghiệp vụ nào thì thêm phép thử nhanh cho hàm đó.

### Danh sách thử trên máy thật (3.236) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app → 🛡 KTGS → Word Mẫu 06 / Mẫu 04 / Kế hoạch năm | File Word như cũ | |
| 2 | Hồ sơ Tổ › Mẫu 06 › Word (chưa mở KTGS lần nào) | File Word như cũ (chờ ~1 giây lần đầu) | |

**Ghi chú kỹ thuật 3.236:** khuôn tải bằng thẻ script cùng chỗ với app (đường dẫn tương đối) nên chạy cả file:// lẫn https; trình duyệt giữ bộ đệm như các file khác. Thêm khuôn / dữ liệu lớn chỉ dùng ở 1 tab → đặt ở `js/khuon/`, tải bằng hàm kiểu `ktKhuon`.

### Danh sách thử trên máy thật (3.235) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app, bấm lần lượt các tab con Số liệu (Tra cứu, Tổ, Sao kê, Tổng hợp, KTGS) | Như bản trước, không báo lỗi | |
| 2 | 🛡 KTGS › in Word Mẫu 06 / 04/BC-TH / 01/KH | File Word như cũ | |

**Ghi chú kỹ thuật 3.235:** tách nguyên văn theo dòng (đầu mỗi file ghi khoảng dòng gốc); hàm vẫn để chung toàn app như cũ nên thứ tự nạp chỉ quan trọng với câu lệnh chạy ngay lúc nạp — giữ đúng thứ tự cũ. Sửa code Số liệu: tìm hàm qua `docs/BAN_DO_MA.md` (đã ghi file mới).

### Danh sách thử trên máy thật (3.234) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm 3 tab liên tiếp → nút ⬅ đầu trang (hoặc Back chuột, Alt+←) | Lùi đúng từng tab; ➡ tiến lại | |
| 2 | Hồ sơ vay: 01/TD → Sổ hộ vay → ⬅ | Về 01/TD | |
| 3 | Mở 1 hộp bất kỳ → Back chuột / ◀ điện thoại | Đóng hộp, ở lại trang | |
| 4 | Sổ hộ vay › mở form hộ, gõ tên dở → ⚙ khai báo luật → Đóng | Về form hộ, chữ đang gõ còn | |
| 5 | Xem 1 báo cáo → bộ nút | Đóng · In · PDF · Word · Excel · Gửi (nút không dùng được thì mờ); Ctrl+P in | |
| 6 | Điện thoại (bản máy tính `?may=1`) › ⚙ Khai báo | Nút tab vừa chữ, xuống dòng | |
| 7 | Chế độ tối › Hồ sơ vay › 📒 Sổ hộ vay | Dòng tiêu đề bảng nền tối, chữ đọc được; hộ anh nhập bản trước hiện lại (Tất cả, bỏ lọc ngày) | |

**Ghi chú kỹ thuật 3.234:** `js/39-gd.js` bọc `doiNgan`, `slDoiTab`, `hsoChonMau`, `moHop`, `dongHop` (nạp sau cùng). Đăng ký lệnh theo kiểu lười (`hmSoDangKy`, `khDangKy` gọi lúc vẽ) vì file 25, 37 nạp trước 39. Code giao diện mới: chỉ dùng `GD.*` + `data-lenh`, không thêm `onclick`.

### Danh sách thử trên máy thật (3.233) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy tính: ⚙ › 💾 Sao lưu › 📱 📤 Đẩy ngay | Báo đã đẩy | |
| 2 | Điện thoại › 🏢 Giao dịch › ⟳ | Mở bản mini: 04/TD, 12/GDX, Giấy lĩnh theo điểm GD; in / lưu được như bản mini | |
| 3 | Bật chế độ máy bay → mở lại app trên điện thoại | Vẫn mở được (PIN → xem số liệu đã cất) | |

**Ghi chú kỹ thuật 3.233:** bản mini trên điện thoại hết hạn sau 90 ngày kể từ lần máy tính đẩy gần nhất (mỗi lần nạp Mẫu 31 mới tự đẩy lại).

### Danh sách thử trên máy thật (3.232) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Điện thoại › 📄 Văn bản › ⟳ | Ra danh sách văn bản như máy tính; gõ lọc không dấu | |
| 2 | Bấm 1 văn bản | Bảng nút: Xem (mở PDF) · Lưu vào máy · Gửi (Zalo) | |
| 3 | ＋ Gửi file vào app → chọn file từ Zalo / máy | Máy tính › Nạp khay chờ thấy file | |
| 4 | 📷 Scan › Chụp / chọn ảnh (2 ảnh) › Tạo PDF | PDF 2 trang A4; Lưu vào app → vào khay chờ | |

**Ghi chú kỹ thuật 3.232:** danh sách văn bản / scan giữ trong bộ nhớ (không cất máy), khóa app là xóa. Mục chưa lên Drive (quét ở máy chưa đồng bộ) ghi "chưa lên Drive".

### Danh sách thử trên máy thật (3.231) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy tính: ⚙ Khai báo đơn vị › 💾 Sao lưu › 📱 tích "Tự đẩy…" (đã nối Drive) | Báo "Đã đẩy số liệu T… (n khách)" | |
| 2 | Điện thoại: mở đường dẫn app như mọi khi | Tự sang giao diện điện thoại, đặt PIN 2 lần | |
| 3 | ⟳ → đăng nhập Google | Lấy được số liệu, ghi "Mẫu 31 dd/mm/yyyy" | |
| 4 | 🔎 gõ tên không dấu / CCCD / SĐT | Ra danh sách; bấm → nhân thân, tổ, từng món vay; bấm số điện thoại gọi được | |
| 5 | 🗺 Địa bàn: bấm xã → điểm → hội → tổ → khách | Mỗi cấp có dư nợ, hộ, tổ, món, quá hạn, khoanh; tổng PGD khớp máy tính | |
| 6 | Để yên 5 phút / chuyển app 2 phút rồi quay lại | Đòi PIN | |
| 7 | ⚙ › 🖥 Mở bản máy tính | Về giao diện cũ (máy tính) trên điện thoại | |

**Ghi chú kỹ thuật 3.231:** thư viện điện thoại tải từ jsDelivr lần đầu (Framework7 ~200 KB + 77 KB sau nén) rồi cất máy. Gói số liệu trên Drive là JSON nén (không mã hóa — bảo vệ bằng tài khoản Google như các file số liệu khác); trên điện thoại cất mã hóa theo PIN. iPhone: mở Safari → "Thêm vào màn hình chính".

### Danh sách thử trên máy thật (3.230) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app, dùng các tab như thường ngày | Không có chỗ nào báo lỗi / nút không chạy (bản này chỉ dọn hàm không còn dùng) | |
| 2 | ❓ › Có gì mới | 15 dòng gần nhất + link lịch sử đầy đủ | |
| 3 | Hồ sơ vay › 📒 Sổ hộ vay | Thanh lọc gọn, ô tìm / ô chọn không kéo dài | |

**Ghi chú kỹ thuật 3.230:** nếu anh gặp nút bấm không phản hồi ở chỗ ít dùng, báo em tên nút — có thể là hàm em dọn nhầm (đã đối chiếu tên trong toàn bộ mã + phép thử, nhưng tên ghép động thì không dò được).

### Danh sách thử trên máy thật (3.229) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ Tổ › 11/TD mới, 07b, 01/TĐCK… chưa khai gì | In như trước (ô Bên A / PGD theo khai báo chung), cột trái ghi ⌨ | |
| 2 | 🖼 Khai báo trực quan → ô Bên A → ⧉ Chép từ Khai báo chung, sửa vài chữ | 11/TD mới in chữ đã sửa; 11/TD cũ vẫn chữ chung | |
| 3 | Ô tổ trưởng: chọn ⌨, gõ khác | In chữ gõ; chọn lại 📊 Mẫu 31 → in theo Mẫu 31 | |
| 4 | Cột trái ⚙ Khai báo riêng | Tóm tắt "n 📊 · n ⚙ · n ⌨ · n ✍" | |

**Ghi chú kỹ thuật 3.229:** chữ riêng lưu chỗ cũ `hsoLuu().chamGT[mẫu][ô]` (dữ liệu "khai 1 lần" cũ đọc được ngay, nay gọi là ⌨ Tự gõ).

### Danh sách thử trên máy thật (3.228) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ＋ Hộ mới, gõ ngày sinh 1955 | Khung 🔎 Kiểm tra: 🟠 trên 65 tuổi; bấm ✓ Đã kiểm tra → mờ | |
| 2 | Gõ CCCD / SĐT của khách đang vay làm người thừa kế | 🟠 đang vay ở Mẫu 31 / 🟡 trùng SĐT | |
| 3 | Gõ tên sai 1 chữ của khách cũ, cùng năm sinh | 🟡 gần trùng … (mã KH) | |
| 4 | 📥 Lấy từ Mẫu 31 hộ đang vay | ℹ Đang vay n món · dư nợ …; món quá hạn 🔴 | |
| 5 | Đổi tổ hộ cũ | ℹ tổ cũ + 🟠 còn món ở tổ cũ | |
| 6 | Hộ người vay dưới 18 tuổi → Lưu | Không lưu, báo 🔴 | |
| 7 | ⚙ Khai báo đơn vị › 🔎 Kiểm tra hộ vay: đổi 65 → 70, tắt 1 luật | Sổ / form theo ngay | |
| 8 | 01/GQVL: mục đích "Chăn nuôi bò sinh sản", số lượng 4 | Đơn vị tự "con"; bản in "4 con" | |

**Ghi chú kỹ thuật 3.228:** luật lưu ở `hsoKB().khLuat` (đồng bộ cùng khai báo đơn vị). Món đang vay lấy từ Mẫu 31 mới nhất — nạp 1 lần khi mở sổ / form (`khNap`). Ngưỡng tạm (90 ngày, 60 tổ viên) chờ anh chốt.

### Danh sách thử trên máy thật (3.227) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay | Tab đầu là 📒 Sổ hộ vay (không còn 👪 Hộ vay); có ＋ Hộ mới, 📥 Lấy từ Mẫu 31 | |
| 2 | Chọn Xã → Tổ ở khối LỌC ĐỊA BÀN | Sổ chỉ còn hộ của xã / tổ; hộ mới chưa có tổ vẫn hiện khi chỉ chọn xã | |
| 3 | Nút Tháng này / Tháng trước, gõ từ ngày | Lọc đúng ngày nhập; bản in ghi khoảng ngày | |
| 4 | Dòng "Tháng 10/2026 · n hộ" | Bấm gập / mở; ô tích cả tháng → nút 📋 Lập 03/TD (n hộ) | |
| 5 | Bỏ tích "Nhóm theo tháng" | Bảng phẳng | |
| 6 | Hồ sơ vay: chọn tổ | Khối lọc tự gọn 1 dòng; ⬆ Lên 1 cấp / Backspace → về điểm, khối mở lại để chọn | |
| 7 | Bấm 📌 | Khối lọc luôn mở, chọn tổ không gọn; tab Tổ / KTGS mặc định đã ghim | |

**Ghi chú kỹ thuật 3.227:** ngày nhập = lúc đưa hộ vào sổ (`o.tao`), hộ chuyển từ Bộ HS cũ lấy ngày tạo bộ. Khối lọc Hồ sơ Tổ / Hồ sơ vay dùng chung 1 lựa chọn (`hsoCH()`), nên tổ chọn để in 10C cũng lọc sổ. Hàm mồ côi `kiem.py`: `pvMo`, `hmLapHS` còn phép thử gọi (t168, t171) — giữ.

### Danh sách thử trên máy thật (3.226) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy 1 sửa khai báo Hội; máy 2 mở app (hoặc chờ 1 phút) | Máy 2 có đúng khai báo | |
| 2 | Drive: thư mục `_Hệ thống/caidat` | Có các file chung.json, ktgs.json, … | |
| 3 | Máy chưa cập nhật bản mới sửa cài đặt | Máy mới vẫn nhận | |

**Ghi chú kỹ thuật 3.226:** bảng khóa → khối `CH_KHOI_LUAT` (js/36); khóa mới chưa vào bảng tự về khối Chung — chỉ ảnh hưởng gom file, không mất dữ liệu.

### Danh sách thử trên máy thật (3.225) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan › Quét → chọn 📄 Tài liệu → lấy 2 ảnh có sẵn | 2 trang, không đòi mặt sau; nền giấy trắng, chữ rõ | |
| 2 | Chọn 🪪 CCCD → chụp 2 mặt | Ghép đúng mặt trước | mặt sau như cũ | |
| 3 | Đạt → 💾 Lưu vào máy (máy tính) | Hộp Lưu thành chọn thư mục; app không thêm mục | |
| 4 | Đạt → 🗂 Lưu vào app | Vào ⏳ Chờ khai báo; chưa lên Drive; khai xã/ấp/tổ xong mới lên | |
| 5 | Chọn ✍ Chữ ký → chụp | Chữ ký nhìn như thật (không ảo, không lem), dưới 200 KB | |
| 6 | Chọn 🧑 Ảnh khách → chụp mặt trước CCCD | 1 mặt, cắt đúng khổ thẻ, dưới 200 KB | |
| 7 | 2 máy cùng nối Drive: máy A thêm văn bản / ghi chú | Máy B nhận trong ~1 phút; Drive có thư mục _Hệ thống/khoi | |
| 8 | Điện thoại có nhiều văn bản: mở app, sửa 1 ghi chú | Đồng bộ nhanh, không khựng | |

**Ghi chú kỹ thuật 3.225:** cài đặt vẫn qua cauhinh.json; chimuc.json vẫn ghi mỗi giờ cho máy chưa cập nhật — khi mọi máy đã lên 3.225, vào 💾 Sao lưu bấm "Máy cũ đã cập nhật hết". Hồi quy: t100, t116 trượt sẵn trên main; hoiquy "báo cáo đã bỏ quay lại" chập chờn đã biết (BAN_GIAO_3161).

### Danh sách thử trên máy thật (3.223.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › Giấy lĩnh khách ở khu phố → in Bảng kê | Địa chỉ ghi "KP …", đủ 1 dòng, không bị che | |

### Danh sách thử trên máy thật (3.223) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app lần đầu sau khi cập nhật | Đủ văn bản, dữ liệu, khai báo như trước; 💾 Sao lưu › 🗄 Nơi lưu ghi "theo ngăn (IndexedDB)" + "Bản cũ lúc chuyển" | |
| 2 | Hồ sơ vay › 01/TD 📄 Trắng · 🖨 Thật · 📝 Mẫu, in ra giấy | Đặt lên bản in từ Word gốc: dòng trùng khít, cùng số trang | |
| 3 | Lần lượt 03/TD, 01/UQ, 09A, 01/TĐCK, 01/TGTV, 01/GQVL, 07b — in thật 1 khách | Đúng form gốc; tên / địa chỉ dài thu nhỏ trong khung, có ⚠ báo | |
| 4 | Hồ sơ Tổ: 10C mới, 10C cũ, 10A, 10B, 10D, 11 mới, 11 cũ | Mỗi mẫu 1 chip; ngày họp để chấm; in đúng form gốc | |
| 5 | 🖼 khai báo trực quan: bấm 1 ô trên trang, đổi ✍ / 🤖 / ✎ | Ô đổi màu; in lại đúng cách vừa chọn | |
| 6 | Sổ hộ vay › ➕ Thông tin thêm 1 người → in 01/TGTV | Trường vừa khai lên đúng chỗ | |
| 7 | 💾 Sao lưu › ⬆ Xuất khai báo → máy khác ⬇ Nạp | Máy kia có đủ khai báo nhóm đã tích | |
| 8 | 💾 Sao lưu › ↩ Quay lại cách lưu cũ, mở lại app, rồi 🗄 Bật lưu theo ngăn | Dữ liệu không đổi qua 2 lần chuyển | |
| 9 | iPhone / Android mở app | Mở bình thường, không báo lỗi lưu | |

**Ghi chú kỹ thuật 3.223:** M8 làm phần lưu trong máy; **đồng bộ Drive theo ngăn chưa làm** (giữ 2 đường cauhinh.json + chỉ mục, đã có phép thử 2 máy t136 / t185) — đề xuất bản sau. Số trang của bản in Hồ sơ Tổ đặt ở chân trang theo app (vị trí khác Word một chút). 10D: gốc có trang 3 trắng (đoạn rỗng sau bảng UBND) — app không in trang trắng. 01/TGTV giữ bố cục 3.219 (LibreOffice dàn gốc 4 trang nên t180 chỉ báo). 01/BG, 02/BG chưa lên nền ô (anh hẹn sau).

### Danh sách thử trên máy thật (3.222) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay / Hồ sơ Tổ / Giao dịch xã › ⚙ Khai báo đơn vị | Cùng 1 cửa sổ; tab Cán bộ, Hội, TK 104 / 105 có đủ | |
| 2 | Tab PGD › sửa tên PGD Giấy lĩnh → in Giấy lĩnh | Tên mới in đúng; khai báo riêng Giấy lĩnh hiện cùng tên | |
| 3 | 01/TD cột trái | Đầu: ✎ Nhập liệu; cuối: ⚙ Khai báo riêng (bấm thu gọn → mở lại app vẫn gọn) | |
| 4 | Bật 🖨 ngày ký chưa gõ | ⚠ Trước khi in nhắc ô sẽ in chấm; ô có 📎 nguồn | |
| 5 | ↺ Về mặc định | Hỏi trước; mọi ô về ✍, lãi suất đã khai vẫn còn khi bật lại | |
| 6 | 09A + in kèm 01/TĐCK | Mỗi mẫu 1 khối ⚙ Khai báo riêng | |

**Ghi chú kỹ thuật 3.222:** `js/30-khai-bao.js` (`kbTenGDXHTML`, `kbHoiHTML`) — chỉ giao diện, đọc / ghi chỗ lưu cũ (`gdxC()`, `D.cauHinh.ktHoiKB`). `gdxKBChung(tab)` = `hsoKBHop(tab||'cb')`. Js/25: `hsoKBRieng` → `<details>` + `hsoKBRMo` (nhớ `hsoLuu().kbrDong`), `hsoChamVeMD`, `HSO_NGUON` / `hsoChamNguon`, `hsoThieu` / `hsoThieuHTML`. Bổ sung 4 (xuất / nhập khai báo ra file) để sau.

### Danh sách thử trên máy thật (3.221) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV chọn hộ → 📝 Bản ghi mẫu → In | Dân tộc, thường trú, điện thoại, CIF in sẵn; tên file có GhiMau | |
| 2 | 01/TD 📝 → In | Phần khách in đủ; UBND, phê duyệt NH vẫn chấm | |
| 3 | Bấm 🖨 Bản thật / mở lại app | Về bản thật (chấm như cũ) | |

**Ghi chú kỹ thuật 3.221:** `HSO_GM` (biến phiên) → `hsoChamKieu` trả 'in' cho ô không thuộc `HSO_GM_KHAC`. Ô chưa có trong `HSO_CHAM` (số nhà, nghề nghiệp, email… 01/TGTV) không có số liệu nên vẫn chấm.

### Danh sách thử trên máy thật (3.220) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TĐCK chọn tổ viên, chưa bật gì → In | Như hôm qua | |
| 2 | 07b bật 🖨 nơi ký, gõ "PGD NHCSXH Gò Dầu" | "Hôm nay … tại PGD NHCSXH Gò Dầu"; lần sau vẫn nhớ | |

**Ghi chú kỹ thuật 3.220:** `HSO_CHAM['01gqvl' | '07b']`; `hsoTuyHo` vẽ khối cho `01td|01uq|01gqvl|07b`.

### Danh sách thử trên máy thật (3.219) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 01/TGTV chọn hộ → In (chưa bật gì) | Dân tộc, thường trú, điện thoại, CIF để chấm; dải A/B/C xanh đậm in rõ chữ trắng | |
| 2 | Bật 🖨 vài ô (thường trú, điện thoại) → In | In số liệu đúng ô, vẫn 3 trang | |
| 3 | Trang 2 khung Chữ ký mẫu · trang 3 chỗ khách hàng ký | 2 khung nét đứt đều; chỗ ký rộng hơn | |

**Ghi chú kỹ thuật 3.219:** `Q(k)` trong `hsoLap01tgtv` = ô bật 🖨 và có người (mẫu trắng luôn chấm). Nếu máy in vẫn bỏ nền: Chrome › In › Tùy chọn khác › bật "Đồ họa nền".

### Danh sách thử trên máy thật (3.218) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay → 01/TGTV chọn hộ → In, so với tờ Word mẫu | 3 trang; trang 3 trọn phần D, Số CIF, Hiệu lực; lề giống mẫu | |
| 2 | 📝 Word 01/TGTV | Kiểm số trang trong Word (Word tự ngắt trang — báo em nếu vẫn 4) | |

**Ghi chú kỹ thuật 3.218:** đo theo file Word mẫu anh gửi (không vào repo). Lớp `.tgtv` (dòng 1,15) chỉ bản In / PDF; Word xuất theo lề mới, khoảng dòng Word tự tính. Bộ chia trang (`js/05`): dòng bảng lớp `tr-td` coi là tiêu đề (kéo theo dòng sau).

### Danh sách thử trên máy thật (3.217) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh → 🧾 Bảng kê (có tên) → In | Tên người lĩnh đậm; tên cơ quan, dòng CÁC LOẠI TIỀN…, ngày to hơn; vẫn 1 dòng | |
| 2 | 🧾 Bảng kê mẫu trắng 2 tờ | Đường cắt đứt quãng rõ, có hình kéo ở đầu; logo to hơn chút, không đè chữ | |

**Ghi chú kỹ thuật 3.217:** chỉ CSS `js/26-giao-dich-xa.js` (`BK_CSS_LOI` bộ chọn tên đậm, `BK_CSS_TO`, `.bk-cat`, `GL_CSS_KEM .gl-cat-n`).

### Danh sách thử trên máy thật (3.216) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã → Giấy lĩnh TK 104 / TK 105, in như mọi ngày | Tên, CCCD, TK, địa chỉ như hôm qua | |
| 2 | 12/GDX, 04/TD, 📦 Mini app | Như cũ | |
| 3 | Hồ sơ Tổ 10C, 10A… · Hồ sơ vay 01/TD, sổ hộ vay, ＋ Lấy từ Mẫu 31 | Như cũ | |

**Ghi chú kỹ thuật 3.216:** cửa `KHO` (`js/29-kho.js`) đọc kỳ đang dựng (TO_K). Tab mới / mẫu mới: hỏi số qua `KHO.*`, không đọc `TO_K` / `SL_DB` / Sao kê (t177 kiểm tĩnh js/25, js/26 — thêm file vào danh sách khi chuyển tiếp). Còn đọc thẳng: KTGS (gói riêng), js/22 (khối kho cũ). Bước sau theo kế hoạch: đổi bên trong cửa (nối Sao kê theo kỳ, nhiều kỳ), tách js/22.

### Danh sách thử trên máy thật (3.215) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay → 01/TD chọn hộ, kéo xuống khối ✍ / 🖨 Ô tùy biến | Ô xếp theo thứ tự trên mẫu (Người vay → UBND → Phê duyệt NH) | |
| 2 | Chưa bật gì → In | Giống bản in hôm qua | |
| 3 | Bật 🖨 Lãi suất, gõ 6,6 (chương trình HSSV); đổi sang NSVSMT | HSSV in 6,6; NSVSMT chấm (chưa khai) | |
| 4 | 03/TD bật 🖨 Số người / tổng tiền, cột 7–8 | Tự đếm số hộ, cộng tiền đúng | |
| 5 | 01/UQ bật 🖨 Trưởng thôn (đã khai ở ⚙ Khai báo chung) | Tên in dưới chỗ ký Chứng kiến | |
| 6 | Word / PDF các mẫu trên | Giống bản In | |

**Ghi chú kỹ thuật 3.215:** ô mới khai 1 dòng `HSO_CHAM[mẫu]` + 1 chỗ dùng trong `hsoLap…`; `hsoKBRieng(mẫu, md)` vẽ khối. Ngày: mặc định chấm; 🖨 chỉ in ngày đã gõ (trống vẫn chấm, không tự lấy hôm nay — anh 15/10: áp **mọi mẫu Hồ sơ vay, kể cả 09A / 01/TĐCK**). Ngày gõ chỉ giữ trong lần làm (`HSO.vay`). Đợt 2 (01/TGTV, 01/TĐCK, GQVL, người ký theo vai trò Hội): `docs/KE_HOACH_KBR.md`.

### Danh sách thử trên máy thật (3.214) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay → 👪 Hộ vay → ＋ Hộ mới, gõ họ tên Enter, 150378 Enter, CCCD Enter… | Con trỏ tự sang ô kế, không nhảy mất; ngày tự thành 15/03/1978 | |
| 2 | Đổi ấp / tổ bằng ↑ ↓ trong form | Không mất chữ đã gõ, con trỏ vẫn ở ô đó | |
| 3 | 💾 Lưu & thêm hộ tiếp | Form trống, giữ xã / ấp / tổ | |
| 4 | Tab 📒 Sổ hộ vay: tìm, chip ⚠ Cần bổ sung, chọn tổ, ↕ sắp xếp | Bảng lọc đúng, đếm n / tổng | |
| 5 | Sửa ô ngày cấp / CCCD của hộ mới trong bảng | Tự lưu, cột Cần bổ sung đổi ngay; mở ✎ thấy số mới | |
| 6 | 🖨 In ở tab 📒 Sổ hộ vay (đang lọc) | A4 ngang 12 cột, đúng các hộ đang lọc | |

**Ghi chú kỹ thuật 3.214:** `hsoVe` bật `.hso-rong` khi mẫu `sohv`; `hsoLap` → `hmLapHTML(hmSoDs()…, hmSoLocChu())`. Tìm trong sổ chỉ vẽ lại bảng (`hmSoVeBang`) để giữ con trỏ. Bảng rộng tối thiểu 1348 px — màn nhỏ cuộn ngang trong khung. Chưa làm (để đợt sau): xóa vào thùng rác, dự phòng riêng sổ hộ (đợt chuẩn hóa lưu), tìm Mẫu 31 ↑ ↓ Enter + xem trước.

### Danh sách thử trên máy thật (3.213) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã → 🧾 Bảng kê → In, đặt lên giấy thật | Khung tờ ngang đúng 118 mm, nét cắt trùng mép giấy | |
| 2 | Giấy lĩnh → 🧾 Bảng kê / 💵+🧾 → In | Bảng kê cùng khổ 118 mm, Giấy lĩnh không bị đè | |

**Ghi chú kỹ thuật 3.213:** chỉ đổi CSS khổ (`js/26-giao-dich-xa.js`: `BK_CSS_TO`, `.bk-cat-*`, `GL_CSS_KEM`); `BK_CSS_LOI` (105 × 185, lớp gốc) bị `.bk-to` đè như trước. Nếu máy in co giãn, anh chỉnh tỷ lệ in 100 % / "Kích thước thực".

### Danh sách thử trên máy thật (3.212)
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở tab Hồ sơ vay | Vào 👪 Hộ vay, không còn tab Bộ HS | |

**Ghi chú kỹ thuật 3.212:** `hsoCH()` mặc định `hsv:'homoi'`, cờ `v209` đổi `hsv:'bo'` cũ → `homoi` 1 lần.

### Danh sách thử trên máy thật (3.211) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 👪 Hộ vay → 📄 In hồ sơ → chip GQVL → tab 01/GQVL | Đơn mẫu mới, nhân thân điền sẵn | |
| 2 | Bấm chip mục đích, số tiền 50 tr, 60 tháng, 24 tháng/lần | Bảng mục đích, bằng chữ, thời hạn đúng | |
| 3 | Gõ ngày ký HĐ → tab 07b | Kỳ hạn trả gốc 3 kỳ (16,6 / 16,6 / 16,8 tr), hạn cuối đúng | |
| 4 | Tích đối tượng ưu tiên | 07b lãi 6,24 %, quá hạn 8,112 % | |
| 5 | Gõ doanh thu / chi phí | Chênh lệch, BQ/tháng; ⚠ nếu chi phí < vốn + lãi | |
| 6 | In kèm 03/TD + 07b → In / Word | 1 lần in / 1 file đủ 3 mẫu | |
| 7 | So bản in với mẫu giấy 01/GQVL, 07b (VB 4039) | Đúng nội dung, bố cục chấp nhận được | |

**Ghi chú kỹ thuật 3.211:** thẻ `kieu:'gqvl'` (ls, lsUT, qh, lamTron, kyLai, chipTien); `hsoPA` gqvl đọc `B.pa.dong[] {md, sl, tien}`; `hsoGQ(B)` (lãi theo ưu tiên `pa.ut`, lịch `hsoLich(tien, th, ky, B.ngayHD, R)`, `hsoLaiDK`, hiệu quả, cảnh báo); `hsoLap01gqvl`, `hsoLap07b`, `hsoPLBang`; cột trái `hsoTuyGQ` (gọi từ `hsoTuyPA`); `hsoLapBo` gqvl: đơn 01/GQVL, `kem.hd` → 07b, bỏ 01/UQ. Bố cục 2 mẫu dựng theo nội dung văn bản Word anh gửi (không chép file vào repo) — cần anh so với mẫu giấy.

### Danh sách thử trên máy thật (3.210) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 👪 Hộ vay: tích 2–3 hộ → 📋 Lập 03/TD | 03/TD có đủ hộ, cùng chương trình, Cộng đúng | |
| 2 | Tab 03/TD → ＋ Thêm hộ, sửa số tiền / mục đích | Khung phải cập nhật | |
| 3 | Đổi chip chương trình ở 03/TD | Tên CT, thời hạn, ĐTTH đổi cả tờ | |

**Ghi chú kỹ thuật 3.210:** tờ đang lập `hsoCH().d03` {ct, ds:[{hoId, tien, md, th, dt}]} — `hsoD03`, `hsoD03Moi(o, ct)` (lấy phiếu hộ nếu cùng CT), `hsoD03Them / Bo / Dat / CT / TuChon`, `hsoD03Hang` → `hsoLap03td(t, null, rows, ctMa)` (thêm tham số ctMa), cột trái `hsoTuy03`; tick sổ `HM_CHON`.

### Danh sách thử trên máy thật (3.209) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay → 👪 Hộ vay → ＋ Lấy từ Mẫu 31 (tìm / tích tổ viên) | Hộ vào sổ có mã KH, tổ; vợ/chồng thành thừa kế | |
| 2 | ＋ Hộ mới: chọn xã → ấp → tổ, tích 2 HSSV, Lưu | Hộ mới, chưa mã KH, 2 SV | |
| 3 | Nhập hộ mới trùng CCCD | Báo, mở hộ đã có | |
| 4 | 📄 In hồ sơ → chọn chương trình, SV, gõ số tiền | 01/TD đúng hộ, SV | |
| 5 | Tích In kèm 03/TD, 01/UQ → In / Word | 1 lần in 3 mẫu | |
| 6 | 01/UQ hộ thiếu ngày sinh / CCCD thừa kế | ⚠ + ✎ Bổ sung | |
| 7 | Bộ HS đã lập trước đây | Có trong sổ hộ vay | |

**Ghi chú kỹ thuật 3.209:** sổ = `D.cauHinh.hoMoi` (giữ khóa 3.207) {id, kh, to, xa, tenXa, diem, thon, tenThon, tv[], dung, sv[]} (`hmSV` đọc cả `hssv` cũ). `hmTuM31(kh)`, `hmM31Hop`, `hmLayTo`, `hmGanMa` (tự gắn mã KH), `hmChuyenCu` (cờ `D.cauHinh.hoVayChuyen`), `hmDongBo(o, B)` hộ → phiếu (B.hoId; hộ cũ đọc `hsoKhach` + SL_DB.kh.sdt), `hmBo(o)` 1 phiếu / hộ, `hmLamHS(id, mau)`, `hmChonHo`. Cột trái 01/TD · 01/UQ: `hsoTuyHo` (bộ có hoId; bộ cũ chưa gắn → cách cũ), phương án tách `hsoTuyPA(B)`; in kèm `B.kem` {ds, bb, uq, tgtv} → `hsoLapBo` (`hsoKemCo`). Tab Bộ HS: `HSO_MAU.hsv` `an:1` (ẩn khỏi thanh tab, mã giữ).

### Danh sách thử trên máy thật (3.208) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay → ⚙ Khai báo chung | Cửa sổ 4 tab con; Trưởng ấp / Tổ phó chọn xã → điểm | |
| 2 | Tab 📋 Chương trình vay: mở thẻ NSVSMT, HSSV | Đủ ô; ĐTTH / mục đích cũ đã chuyển vào thẻ | |
| 3 | Bộ HS chọn HSSV, gõ số tháng + số tiền → 01/TD | Bảng in đúng số gõ; trống → chấm | |
| 4 | Gõ Thời hạn 48, Hạn trả cuối → 01/TD, 03/TD | 01/TD in 48 tháng + ngày; 03/TD cột Thời hạn 48 tháng | |
| 5 | Bộ HS NSVSMT (xã / phường) → 03/TD | ĐTTH nông thôn / thành thị; 60 tháng | |
| 6 | Thẻ NSVSMT đổi Thời hạn → ✍ Chấm | 01/TD thời hạn để chấm | |
| 7 | Bố cục: cột trái rộng, xem trước bên phải | Như tab Giao dịch xã | |

**Ghi chú kỹ thuật 3.208:** thẻ CT `hsoKB().ctv[]` {ma, ten, kieu hssv|congtrinh|chung, loai, ctr[{ten, tien}], md[], dtth[], dtthMd, dtthPh, th, thIn, ky, kyIn, ubnd, nhcsxh, bat} — `hsoCTVDs()` (tạo mặc định + chuyển kb.md / kb.dtth cũ), `hsoCTV(ma)`, `hsoCTTenIn`, `hsoCTDat`, `hsoCTVHTML`; cửa sổ `hsoKBHop(tab)` + `HSO_KBT` {tab, xa, diem, mo}, `hsoKBTab`. `hsoPA(B)` đọc thẻ: r.C, th / ky = B.th / B.ky gõ hoặc thẻ (thIn / kyIn 'in'), công trình i lưu ở `hsoPaK(i)` (giữ khóa cũ nuoc / tienN, vs / tienV). Bộ: `B.th`, `B.ky`, `B.hanCuoi` (ISO), `B.pa.soThang`, `B.pa.md / dt / sl`. `hsoDTTHMd(B, phuong)`.

### Danh sách thử trên máy thật (3.207) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay → 🏠 Hộ mới → ＋ Hộ mới: gõ ngày liền số, CCCD | Ngày đúng; giới tính, năm sinh, nơi cấp, hạn CCCD hiện; CCCD lệch năm → ⚠ | |
| 2 | Địa chỉ: Xã → Điểm GD → Ấp | Ấp lọc theo điểm | |
| 3 | ＋ Thành viên, chọn Đứng tên / HSSV → Lưu hộ | Hộ vào danh sách, bảng khung phải | |
| 4 | 📄 Lập HS → tab 01/UQ, 01/TD | Người vay, thành viên, HSSV điền sẵn | |
| 5 | Mở app máy khác (Drive) | Danh sách hộ mới có đủ | |

**Ghi chú kỹ thuật 3.207:** `hmDs()` = `D.cauHinh.hoMoi`; `hmDiaBan()` từ `TO_K.to` (xa → diem, ap{thon, tenThon, diem}); `hmGanBo(id, B)` → B.nv / B.ho / B.pa.sv / B.ct HSSV; `hmM31(cccd)` tra `SL_DB.kh` (chỉ mục lười).

### Danh sách thử trên máy thật (3.206) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ / Sao kê / KTGS / Giao dịch xã: chọn tổ | Khối lọc gọn 1 dòng 🏠 PGD › Xã › Điểm › Tổ + ▾ Mở rộng | |
| 2 | Bấm tên Xã / Điểm / 🏠 PGD trên dòng gọn | Về đúng cấp đó | |
| 3 | Giấy lĩnh: in 1 phiếu → ↺ Phiếu mới | Form trống, con trỏ ở ô tìm | |
| 4 | Hồ sơ vay: các tab mẫu; 09A chọn tổ → người vay → món | Dòng Số liệu đúng kỳ; số tiền gia hạn = dư nợ | |
| 5 | 09A: bật 🖨 Lý do / Thời gian / Ngày ký → In / Word | In đúng chữ; tắt lại ✍ → dòng chấm; mở lại app vẫn nhớ | |
| 6 | 09A: tích In kèm Mẫu 06/TD → In (và 🖨 06/TD) → Word | In 09A rồi 06/TD; Word ra 2 file; 06 có hộ vay + Hội, cán bộ trống; mục đích theo lựa chọn | |
| 7 | Tab KTGS: in Mẫu 06 KTGS như cũ | Không đổi | |
| 8 | 09A: tích In kèm 01/TĐCK → In / Word; tab 01/TĐCK riêng | 09A + 01/TĐCK cùng 1 lần in / 1 file; nhân thân điền sẵn — **anh so bố cục với bản giấy** | |

**Ghi chú kỹ thuật 3.206:** `pvGonCua(p)` / `pvGonDoi(p)` + mắt `.pv-ve` (`pvChon(p, cap, '')`); `hsoTabMauHTML` (#hso-tabm); `HSO_CHAM` + `hsoCham*`; `hso06Gt` gọi KTGS chỉ đọc (truyền v: ng1 '' → cán bộ trống, md 'nganh' / ''). In kèm = 2 lần `inBlob` cách 1,5 s (09A dọc, 06 ngang).

### Danh sách thử trên máy thật (3.205) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ⚙ Khai báo chung → 📋 TK 104 chưa đóng | Danh sách + cột Lý do + Xuất Excel | |
| 2 | 📋 TK 105 cần đóng (chưa có Mẫu 01/TV → so theo thành viên app) | Danh sách khách không còn là thành viên | |
| 3 | Nạp Sao kê mới khi đang mở Giao dịch xã → bấm nút ngay | Không cần tải lại trang | |
| 4 | ② Kiểm tra số liệu T9 → mục "Số tổ: LEN_31 TO_TRUONG ↔ Danh sách tổ" | Liệt kê 4 dòng chênh 374 − 370 + lý do | |
| 5 | Ma trận T9 | Không còn cột 30/09/2026 trống | |

**Ghi chú kỹ thuật 3.205:** `tkDamBao(cb)` so `TO_K.tk[loai].ky` với `tkChonBan(loai, TO_K.ngay)`; khác / thiếu → `tkNapMoi(TO_K)` rồi gọi lại.

### Danh sách thử trên máy thật (3.204) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ⚙ Khai báo chung trước khi nạp Danh sách tổ | Dòng "Danh sách tổ (hệ thống): chưa nạp"; Bảng tổ ghi thiếu gì | |
| 2 | Nạp file baocao_… → mở lại | Dòng Danh sách tổ có ngày + số tổ; Bảng tổ đủ 369 | |

**Ghi chú kỹ thuật 3.204:** `tkKhoiHTML` dùng `dsChonKy(TO_K.ky)`; bản `dsto` không có `tong.rieng` = kiểu cũ.

### Danh sách thử trên máy thật (3.203) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sửa 1 văn bản rồi **đóng tab ngay** → mở lại | Thay đổi còn | |
| 2 | iPhone: sửa cài đặt rồi vuốt thoát app → mở lại | Thay đổi còn | |
| 3 | Thao tác nhanh nhiều lần (chọn / lọc / sửa) trên máy nhiều dữ liệu | Không khựng như trước | |
| 4 | Máy thứ 2 sau khi đồng bộ Drive | Cài đặt đổi ở máy 1 lên đủ | |

**Ghi chú kỹ thuật 3.203:** `LUU_HEN` (hẹn 300 ms), `LUU_LAN` (đếm lần ghi — phép thử đo); `luuNgay()` = ghi `localStorage` + `henDongBoChiMuc()` + `chTheoDoi()`; chỗ nào cần chắc đã ghi (trước đọc lại `localStorage`, trước tải lại trang tự gọi) dùng `luuNgay()`.

### Danh sách thử trên máy thật (3.202) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp Mẫu 31 + Sao kê TK 104 / 105 (+ Mẫu 01/TV) → ⚙ Khai báo chung (Giao dịch xã) | Dòng "Bảng tổ: N tổ · đủ X · thiếu Y" | |
| 2 | 📒 Tổ chưa đủ dữ liệu · bổ sung → gõ ngày cấp 1 tổ → mở lại | Tổ đó hết thiếu; Giấy lĩnh tự điền ngày cấp | |
| 3 | Giấy lĩnh TK 104 nhiều tổ | TK 104 + CCCD tự điền; CCCD hết hạn có cảnh báo | |
| 4 | Giấy lĩnh TK 105 → chọn khách có 2 TK | Cảnh báo + ô chọn TK; chọn xong nhớ | |
| 5 | ⚠ TK trùng | Danh sách + Excel | |
| 6 | Nạp Danh sách tổ hệ thống (`baocao_…xlsx`) ở 📥 Nạp & KT | Vào ô Danh sách tổ, kỳ = ngày báo cáo; kỳ tháng 9 vẫn dùng được | |
| 7 | ⚙ Khai báo chung → dòng Bảng tổ | 369 / 369 đủ; nguồn CCCD / TK 104 = Danh sách tổ | |
| 8 | 🏦 TK 104 chưa đóng | Danh sách có cột Lý do + Excel | |
| 10 | Nạp lại Danh sách tổ số liệu đến 30/09 → ma trận tháng 9 | 1 dòng về tổ (không còn dòng Thông tin tổ trưởng); kỳ 9 dùng bản 30/09, kỳ 10 dùng bản 13/10 | |
| 9 | ② Kiểm tra số liệu tháng 9 | 2 mục mới về Danh sách tổ (khớp Mã CIF TT, đủ CCCD · ngày cấp · TK 104) | |

**Ghi chú kỹ thuật 3.202:** Danh sách tổ hệ thống: `dsHTDoc` (loại `dsto`, `tong.rieng`), `dsChonKy(ky)` chọn bản của tháng, không có thì mới nhất (dùng trong `slBo`); `L.an` = loại ẩn khỏi ma trận (tt), `slBBE(k, ky)` cho file bắt buộc; `cccdCua` / `toBangDung` ưu tiên `t.ds` khi `t.ds.ttKH` = Mã CIF TT; `o.tkThua`, `o.dsLech`; `tkCanDong().k104.ds[].ly`. `TO_K.bangTo` (dựng lười bằng `tkBangTo()`, xóa khi `tkNapMoi` / anh bổ sung / chọn TK); `cccdCua(kh, t, laTT)` dùng chung; `tkCua` lập chỉ mục `theo` lười, TK anh chọn đứng đầu; `D.cauHinh.tk104Tay`, `tkChon`, `ccNho` đồng bộ Drive như cài đặt.

### Danh sách thử trên máy thật (3.201) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📥 Nạp file: Mẫu 31 + Mẫu 18 + Mẫu 01/TV cuối tháng 9 | 01/TV nhận đúng loại, kỳ T9/2026 | |
| 2 | ② Kiểm tra số liệu T9 → nhóm Danh sách tổ | Dòng "Thành viên tổ ↔ 01/TV" + "Cần cho ra khỏi tổ" có bảng, xuất được | |
| 3 | Tab 👥 Tổ → chọn 1 tổ → chip Cần cho ra khỏi tổ (TƯ) | Danh sách + lý do | |
| 4 | Nạp Sao kê TK 104, TK 105 (ngày) | Nhận đúng loại, kỳ theo ngày BC | |
| 5 | Giấy lĩnh TK 104 tổ trưởng | Tự điền TK 104 + CCCD; thiếu thì ghi rõ lý do | |
| 6 | Gõ tay ngày cấp tổ trưởng, chọn tổ khác rồi chọn lại | Ngày cấp vẫn còn | |
| 7 | ⚙ Khai báo chung → TK 104 / TK 105 cần đóng | Bảng + 📊 Xuất Excel | |
| 8 | Giấy lĩnh → Nội dung → chip Thường / Nghiêng | Chữ "Rút tiền" đổi theo | |

**Ghi chú kỹ thuật 3.201:** loại `rieng:true` (tv01, tk104, tk105) đọc ở `slDocRieng` trước bộ nhận cột (js/28); `K.tk` = Sao kê mới nhất, nạp tk104/105 xóa `TO_KS`; `tvDoiChieu(B)` cache `B._tv`; chip `tvra` chỉ hiện khi xem 1 tổ (`TO_TV_MA`).

### Danh sách thử trên máy thật (3.200) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh → khai báo dòng PGD → chip Thường / Đậm | Dòng PHÒNG GIAO DỊCH GÒ DẦU in thường / đậm theo chip | |
| 2 | In Giấy lĩnh có số tiền | Số tiền bằng chữ in nghiêng, vẫn chia 2 dòng đúng | |

### Danh sách thử trên máy thật (3.199) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 💵 Giấy lĩnh | Ngày tháng cùng dòng PHÒNG GIAO DỊCH GÒ DẦU; thân phiếu bớt trống | |
| 2 | Mini app: in Giấy lĩnh | In được, PGD ghi đủ | |

### Danh sách thử trên máy thật (3.198) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 💵 Giấy lĩnh (khai báo PGD “PGD GÒ DẦU” hoặc “Gò Dầu”) | In “PHÒNG GIAO DỊCH GÒ DẦU” đậm, 1 dòng, không lấn tiêu đề | |

### Danh sách thử trên máy thật (3.197) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 💵 Giấy lĩnh | 2 gạch dọc dài thêm 2 mm; ô Số tiền bằng số cân đối; dòng PGD đậm như 2 dòng trên | |
| 2 | In 🧾 Bảng kê | “Họ tên:” nhỏ nghiêng, chấm đủ dài ghi tên | |

### Danh sách thử trên máy thật (3.196) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In 💵 Giấy lĩnh | Chấm mịn, khung ô mảnh, vạch chia ô nhạt hơn khung | |
| 2 | In 12/GDX, 04/TD | Vạch dưới tên cơ quan mảnh; bảng 12/GDX kẻ ngang giữa các dòng nhạt hơn khung | |
| 3 | In Mẫu 06 / 16 / 04 KTGS, Hồ sơ vay | Đường kẻ mảnh, chấm mịn; xuất Word không đổi | |

### Danh sách thử trên máy thật (3.195) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🧾 Bảng kê | “PHÒNG GIAO DỊCH: GÒ DẦU” 1 khối cùng font, cùng cỡ; tên cơ quan chữ đứng hẹp như tờ thật | |
| 2 | Xóa trống ô Phòng giao dịch | Hiện “PHÒNG GIAO DỊCH:” + chấm | |
| 3 | In Bảng kê | Chấm mịn; lằn chính mảnh vừa; dòng mệnh giá và chia ô Thành tiền lợt hơn | |

### Danh sách thử trên máy thật (3.194) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh: chọn tổ trưởng, gõ số tiền → 💵+🧾 → IN | 1 tờ A4: Giấy lĩnh + Bảng kê điền sẵn tên, tự chia mệnh giá, bằng chữ; ký tên trống; logo cánh sen hồng mờ | |
| 2 | 🧾 Bảng kê (từ Giấy lĩnh) → IN | A4 ngang 1 tờ sát mép trái, có dữ liệu | |
| 3 | 📄 Mẫu trắng › Bảng kê 2 tờ / Kết hợp | Trắng đúng form | |
| 4 | 📄 Hồ sơ vay › ⚙ Khai báo 1 lần › Logo › ⬇ Tải logo | Tải được Logo_NHCSXH.png nền trong suốt | |
| 5 | In 01/TD trên máy chưa nạp logo | Có logo cánh sen ở góc | |

- **Ghi chú kỹ thuật 3.194:** `C.glIn` 'gl' | 'bk' | 'kh' → `X.bk` (`gdxHTMLBKDL(g, c)`) / `X.kh` (`glKho='a4bk'` nội bộ + `GL_CSS_KEM`). `gdxBKTrang(c, g)`: có `g` → dữ liệu Giấy lĩnh + `gdxBKChia`; không có → khai báo tab Bảng kê. `gdxLogo()` → `hsoLogoSrc()` = `hsoKB().logo || LOGO_NHCSXH`; `hsoLogoCo(k)` chỉ còn theo danh sách mẫu tích.

### Danh sách thử trên máy thật (3.193) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giao dịch xã › chip 🧾 Bảng kê | Khung trái: Tên cơ quan · Ngày · Họ tên · Địa chỉ · Nội dung · Logo chìm; xem 2 tờ / A4 ngang | |
| 2 | Gõ Họ tên / Nội dung rồi xóa trống | Có chữ thì in, trống thì chấm | |
| 3 | 💵 Giấy lĩnh | Không còn chip Bảng kê / Kết hợp; Mẫu trắng chỉ Giấy lĩnh | |
| 4 | Tổ TK&VV, tổ cũ của 7122152059 / 7070797171 | Không còn ở chip "Tất nợ · còn TK 105"; ở tổ đang vay | |

- **Ghi chú kỹ thuật 3.193:** `gdxBKTrang(c)` / `gdxHTMLBK(c)` chỉ đọc khai báo `bkCQ1`, `bkCQ2`, `bkPGD`, `bkNgay`, `bkTen`, `bkDC`, `bkND`, `bkChim`; `gdxBKMuc(k)` vẽ khai báo. Bỏ `glIn`, `bkChia`, `GL_CSS_KEM`, `gdxBKTrangIn`, `glKho='a4bk'` (cờ chuyển 1 lần `bk193`). `cap:'khong'` → ẩn khối lọc. `slDanhRaTo`: khách có KU chưa đóng → KU đã đóng (không phải KU hủy) ở tổ không có KU mở gắn `raTo='chuyển sang tổ … (vay mới)'`, mục `B.raTo` có `chuyen:1`.

### Danh sách thử trên máy thật (3.192) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ⋯ › ⚙ Khai báo riêng mẫu (Giấy lĩnh) | 2 nhóm 💵 Giấy lĩnh / 🧾 Bảng kê; Bảng kê có Tên PGD, Logo chìm, Bảng mệnh giá, Kiểu in | |
| 2 | 📄 Mẫu trắng › Bảng kê trắng 2 tờ / A4 ngang | 2 tờ sát 2 mép, cắt theo nét đứt ra đúng 105 × 210; GÒ DẦU in sẵn, còn lại chấm | |
| 3 | Tóm tắt › 💵 Lĩnh / 🧾 Bảng kê / 💵+🧾 → IN | Lĩnh: chỉ Giấy lĩnh · Bảng kê: A4 ngang 1 tờ sát mép trái · 💵+🧾: 1 tờ A4 dọc cả 2 | |

- **Ghi chú kỹ thuật 3.192:** `C.glIn` 'gl' | 'bk' | 'kh' → `X.bk` (gdxHTMLBK, A4 ngang: có dữ liệu 1 tờ, mẫu trắng 2 tờ) / `X.kh` (ép `glKho='a4bk'` nội bộ). `glKho='a4bk'` cũ → `glKho='a4'` + `glIn='kh'` (gdxC). `GDX_MUC.gl` thêm trường `nhom` (tiêu đề nhóm trong `gdxKBRieng`). `bkChim` '' (bản 3.191) đọc như 'nhat'.

### Danh sách thử trên máy thật (3.191) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In Giấy lĩnh + Bảng kê / A4 | Bảng kê hết bề ngang, cao 115 mm sát đáy, cắt 1 nhát; chữ 13 pt dễ đọc | |
| 2 | Bảng kê | Tên người lĩnh để trống; Tổng cộng đậm; bằng chữ đậm nghiêng; Gò Dầu sát chữ PGD | |
| 3 | Logo chìm | Logo cánh sen đã nạp ở Hồ sơ vay, cân giữa bảng như tờ thật (dòng 100.000 → Tổng cộng) | |
| 4 | ⋯ › ⚙ Khai báo riêng mẫu › 🧾 Bảng kê: Logo chìm Đậm / Tắt | Logo Bảng kê đổi riêng, Giấy lĩnh không đổi | |

- **Ghi chú kỹ thuật 3.191:** in kèm: `.gl-bkk` 210 × 115, `.bk-trang` 115 × 210 xoay -90° (top 115 mm); `.gl-cat-d` ẩn. Cỡ chữ in kèm riêng trong `GL_CSS_KEM`, tờ Bảng kê riêng (105 × 185) giữ cỡ cũ.

### Danh sách thử trên máy thật (3.190) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In Bảng kê (riêng / kèm Giấy lĩnh) | Họ tên dưới chỗ ký để chấm; đầu tờ vẫn có tên người lĩnh | |

### Danh sách thử trên máy thật (3.189) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Đã nạp logo ở Hồ sơ vay → xem / in Bảng kê (riêng hoặc kèm Giấy lĩnh) | Logo mờ to giữa bảng mệnh giá, không che số | |
| 2 | ⚙ Chữ chìm Nhạt / Vừa / Đậm | Logo đậm nhạt theo | |

- **Ghi chú kỹ thuật 3.189:** `gdxBKTrang` đọc `hsoKB().logo` (data URL PNG ≤ 360 px) → `<img class="bk-chim bk-logo chim-…">`, opacity .16 / .24 / .34. Mini app chưa gói Bảng kê nên không ảnh hưởng.

### Danh sách thử trên máy thật (3.188) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | ⚙ Khổ giấy: A4 Giấy lĩnh trên + Bảng kê dưới → IN | 1 tờ A4: Giấy lĩnh nửa trên, Bảng kê xoay ngang góc dưới trái, tự chia mệnh giá, bằng chữ đủ | |
| 2 | Cắt Bảng kê theo 2 nét đứt | Ra tờ đúng khổ, không mất chữ; nét đứt mép dưới có lên không | |
| 3 | 📄 Mẫu trắng › Giấy lĩnh + Bảng kê / A4 | Cả 2 phần trắng đúng form | |

- **Ghi chú kỹ thuật 3.188:** `glKho='a4bk'` → `gdxHTMLGL` dựng `.sheet-gl.gl-a4.gl-kem` = `gdxGLTrang` + `.gl-bkk` (`gdxBKTrang` với `bkChia=true`, xoay `rotate(-90deg)`, gốc trên trái, top 105 mm) + `.gl-cat-n` / `.gl-cat-d`. CSS = `GL_CSS + GL_CSS_A4 + BK_CSS_LOI + GL_CSS_KEM`; in đặt cao 296 mm tránh trang trắng. `gdxGLTrangIn(3)` = mẫu trắng. Mini app: `a4bk` → `a4`.

### Danh sách thử trên máy thật (3.187) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh → dòng Tóm tắt bấm 🧾 Bảng kê → in | Bảng kê đúng người lĩnh, bằng chữ; đo tờ thật gửi em để chỉnh khổ | |
| 2 | ⚙ Khai báo riêng › Bảng kê: Tự chia mệnh giá | Bảng mệnh giá + Thành tiền + Tổng cộng tự điền | |
| 3 | TK 104 tổ Lê Ân (không có CCCD lần trước) | CCCD lấy từ file về tổ, hoặc Tóm tắt báo lý do | |
| 4 | Ô Ngày cấp gõ 2542021 / 252021 | 25/04/2021 / 02/05/2021 | |
| 5 | In Giấy lĩnh | 9 dòng khối trái cách đều; 2 gạch dọc Người lĩnh tiền dài hơn 2,5 mm; chấm bằng chữ sát chữ hơn | |

- **Ghi chú kỹ thuật 3.187:** Bảng kê = `X.mau='gl'` + `X.bk=true` (`GDX.xemBK`), dựng `gdxHTMLBK`, CSS riêng `BK_CSS` (A4 dọc, tờ 105 × 185 mm). Khai báo `bkChia`, `bkKho` ('1' | '2'). Khổ tờ chờ anh đo.

### Danh sách thử trên máy thật (3.186) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In Giấy lĩnh (A5 / A4) | Dòng Họ tên cách đầu phiếu thêm 6 mm; 2 dòng bằng chữ + Nội dung lên 1 mm, thoáng; chữ chìm đúng chỗ; chỗ ký đủ | |

### Danh sách thử trên máy thật (3.185) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh: gõ 4–6 số cuối CCCD | Ra đúng người, kèm CCCD; ↑↓ Enter → điền form, con trỏ ở ô Số tiền | |
| 2 | TK 105: chọn khách chưa có số sổ (vd HUỲNH THỊ YẾN) | Có số theo CCCD (ghi nguồn) hoặc dòng "TK 105: chưa có — lý do" | |
| 3 | Chọn tổ ở cây địa bàn → ✕ Làm trống | Bỏ chọn tổ, giữ Xã / Điểm, form trống | |

- **Ghi chú kỹ thuật 3.185:** `gdxCCCDCua(kh, t)` = CCCD theo danh bạ `SL_DB.kh` hoặc dòng Mẫu 31; tìm số khi chuỗi tìm là ≥ 4 chữ số (so đuôi). TK 105 bù theo CCCD quét `SL_DB.kh` (cùng CCCD, có `slStk`), lý do ở `r.tkLy`. Nút Làm trống ở đầu khung luôn gọi `gdxGLMoi`.

### Danh sách thử trên máy thật (3.184) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn tổ trưởng / gõ ngày cấp | Chữ mờ "Nơi cấp: …" cạnh nhãn Địa chỉ đổi theo ngày cấp; bấm vào sửa được | |
| 2 | Ngày cấp trước 10/10/2018 | Ghi "Cục Cảnh sát", có ⚠ và cảnh báo vàng ở Tóm tắt | |

- **Ghi chú kỹ thuật 3.184:** `GL_O` không còn `noiCap` (5 ô); `GDX.glSua.noiCap` = gõ tay (qua `gdxGLNoiCapTay`, hộp prompt). Mini: `S.noiCapTay`, `mn.noiCapTay`; file mini mang theo `gdxNgayISO` + `GDX_NC_CU`.

### Danh sách thử trên máy thật (3.183) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn tổ trưởng có ngày cấp trước / sau 01/07/2024 | Nơi cấp: Cục Cảnh sát quản lý hành chính về trật tự xã hội / Bộ Công an — đủ chữ, in không bị cắt | |
| 2 | Form | Họ tên · CCCD · Ngày cấp 1 dòng; nút 👁 Xem: Bật / Tắt đúng | |

- **Ghi chú kỹ thuật 3.183:** `gdxNoiCap` dùng ở `gdxGLDuLieu` (bỏ qua `noiCap` số liệu trừ khi gõ tay `GDX.glSua.noiCap`) và mini (`S.noiCapTay`). Hồ sơ vay / hồ sơ tổ vẫn dùng `hsoNoiCapGY` (gợi ý viết tắt "Cục CS QLHC") — chưa đổi, chờ anh.

### Danh sách thử trên máy thật (3.182) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In Giấy lĩnh (A5 / A4) | Lề trên rộng thêm 5 mm; 2 gạch dọc ô Người lĩnh tiền ngắn 5 mm; chữ chìm đúng chỗ như trước so với form | |
| 2 | Ngày lĩnh | Chỉ Hôm nay · nhập ngày · Để chấm, 1 dòng | |
| 3 | Khung nhập | Vừa 1 màn hình; ô số tiền nổi bật; ✕ Làm trống kế 👁 Xem | |

- **Ghi chú kỹ thuật 3.182:** `gdxC` chuyển `glNgayCach` 'gd' → 'hom'; nút Làm trống ở `gdxDauHTML` (gl): chưa in → `gdxGLLamTrong`, đã in → `gdxGLMoi` (lớp `.gdx-moi`); sau in gọi `gdxVeTrai()` để đổi nút.

### Danh sách thử trên máy thật (3.181) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Chọn Xã › Hội › Tổ (hoặc Điểm) | Khối lọc còn 1 dòng; ▾ Đổi sổ ra; bấm vào vùng nhập thì gọn lại | |
| 2 | Đầu khung | 1 hàng: chip mẫu · 👁 Xem · ⋯ (khai báo, nhật ký, mini app) | |
| 3 | Tóm tắt | 1 dòng; 📄 Mẫu trắng sổ lên 1/A4 · 2/A4 | |

- **Ghi chú kỹ thuật 3.181:** khối lọc gọn bằng lớp `.gon` (CSS ẩn `.pv-nhom.cap-xa` + `.pv-hang2`), `PV_MO.gdx==='xd'` = đang sổ ra; `gdxGonLoc` gắn `mousedown` (capture) vào `#gdx-bo`. Menu ⋯ là `<details class="gdx-menu">` (không JS), `.len` = sổ lên.

### Danh sách thử trên máy thật (3.180) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh TK 104 chọn tổ trưởng | Hiện TK 104; nếu vẫn "chưa có" thì đọc dòng lý do (chụp gửi em) | |
| 2 | Tóm tắt bản in | 1 dòng, chỗ nhập rộng hơn | |
| 3 | Chọn điểm GD ở khối lọc | Hàng Xã / Điểm thu gọn; ▾ Đổi xã / điểm mở lại | |

- **Ghi chú kỹ thuật 3.180:** `dmtTimTo(t)` dùng ở `gdxGLDuLieu` và `gdxMiniGoi`; `dmtViSao(t)` = câu lý do. Thu gọn khối lọc: `PV_MO[p]==='xd'` = đang mở lại; `pvChon` đặt lại '' nên chọn xong tự gọn.

### Danh sách thử trên máy thật (3.179) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở Giấy lĩnh, tìm / chọn 1 tổ trưởng | Mặc định TK 104; ô Tài khoản số = TK 104 theo danh mục | |
| 2 | Bấm ✕ Làm trống rồi chọn lại đúng tổ đó ở khối lọc | Điền lại đủ, có TK 104 | |

- **Ghi chú kỹ thuật 3.179:** cờ `D.cauHinh.gdx.glLoai104` = đã chuyển mặc định 1 lần; mini: `glLoai104` trong `gdxmini_c`.

### Danh sách thử trên máy thật (3.178) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | App: Giấy lĩnh, chọn Điểm GD ở khối lọc rồi gõ tên tổ trưởng điểm khác | Không ra; dòng "Đang tìm trong điểm …" + Tìm cả PGD → ra | |
| 2 | Xuất mini app → hộp ghi số CCCD tổ trưởng | Có số CCCD được gói | |
| 3 | Mini: Giấy lĩnh TK 104 chọn tổ trưởng | Điền đủ tên, CCCD, ngày cấp, nơi cấp, TK 104, địa chỉ; con trỏ ở ô số tiền | |
| 4 | Mini: chip Điểm này · Cả xã · Cả PGD | Tìm đúng phạm vi | |

- **Ghi chú kỹ thuật 3.178:** mini app nay chứa CCCD tổ trưởng (xáo mã, không mật khẩu — anh đã biết rủi ro và chốt gói). Phạm vi tìm app: `gdxGLTim` lọc theo `gdxCH().diem` (so `t.khoaDiem`) hoặc `.xa` (so `t.xa`), `GDX.glTatCa = 1` bỏ lọc, `gdxGLChon` đặt lại 0. Mini: `C.timPham` ('diem' | 'xa' | 'tat') lưu trong `gdxmini_c`.

### Danh sách thử trên máy thật (3.177) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab 🏢 Giao dịch xã → 📦 Mini app → chọn 30 ngày → Xuất file | Tải về GiaoDichXa_mini_han-….html; hộp ghi đúng số điểm / tổ / TK 104 | |
| 2 | Mở file mini bằng Chrome / Edge (máy tính + điện thoại) | Hiện "Dùng tới ngày …"; xem trước 04/TD đúng điểm gần nhất | |
| 3 | Mini: in 04/TD, 12/GDX, Giấy lĩnh TK 104 (gõ tên tổ trưởng → Enter), mẫu trắng 2/A4 | Bản in giống app chính; TK 104 đúng | |
| 4 | Mở file bằng Notepad | Không đọc được tên tổ trưởng / TK 104 | |
| 5 | Đổi ngày máy qua quá hạn rồi mở; đổi ngày lại | Khóa: "Bản này hết hạn ngày …, liên hệ anh Nhân để lấy bản mới"; đổi lại vẫn khóa | |

- **Ghi chú kỹ thuật 3.177:** `js/27-mini-gdx.js` mới (nạp sau 26). `gdxMiniApp` KHÔNG chạy trong app chính — chỉ được chép vào file mini; khung mini gọi qua `window.mn.*`. Hàm mẫu chép bằng `toString` (danh sách trong `gdxMiniHTML`) — thêm hàm phụ cho mẫu thì phải thêm vào danh sách đó, chạy `t168`. Khóa localStorage của mini: `gdxmini_c` (lựa chọn), `gdxmini_max` (ngày mở muộn nhất — chống lùi giờ), `gdxmini_t_<mã bản>` (đã hết hạn). `kiem.py` báo "Thiếu hàm: CompressionStream, DecompressionStream, Response" là có sẵn từ trước (js/22, hàm trình duyệt), không phải lỗi.

### Danh sách thử trên máy thật (3.176) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Giấy lĩnh: gõ tên → ↑↓ → Enter | Chọn đúng người, form tự điền | |
| 2 | Số tiền ▲▼ | Bước 100 nghìn | |
| 3 | In A5 có điền / mẫu trắng; đổi Chữ chìm Nhạt · Vừa · Đậm · Tắt | Chữ chìm lệch trái / lên 1 cm như ảnh; đậm nhạt đúng; 3 ô cao hơn, ô Số tiền ngang dòng Nội dung | |
| 4 | In xong bấm "✕ Làm trống — in người khác" | Trống người lĩnh, số tiền; con trỏ ở ô tìm | |

### Danh sách thử trên máy thật (3.175.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📥 Nạp & KT › 📚 Danh mục tổ › 🔍 Kiểm tra lại | Không còn 7 dòng "tên tổ trưởng lệch" do Ông / Bà, không dấu | |

### Danh sách thử trên máy thật (3.175) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở ⚙ Khai báo riêng rồi đóng; bấm chip ⭐ / Hôm nay / ô ngày | Không còn bật hộp cài đặt | |
| 2 | Gõ ngày "1410", "141026" vào ô ngày (04/TD, 12/GDX, Giấy lĩnh) | Ra 14/10 (năm nay / 2026) | |
| 3 | 04/TD: bấm ▲▼ số hộ, số tiền | Số hộ ±1, số tiền ±5 triệu; mức gợi ý 25–160 triệu | |
| 4 | 12/GDX in 12 và 30 dòng | 1 chip ngày GD; "(Ký, ghi rõ họ tên)" GDV sát tiêu đề, 3 tên cùng hàng; điểm / mã / xã / GDV in đậm; trọn 1 trang | |
| 5 | 📥 Nạp & KT → 📥 Nạp file → chọn file danh mục địa bàn (nhiều sheet) | Không vào bảng xem trước số liệu; hiện kết quả kiểm tra (khớp / lệch / thiếu TK 104); khối 📚 Danh mục tổ ở tab | |
| 6 | Giấy lĩnh: tìm khách số tiền lớn (bằng chữ dài) → In A5 | Bằng chữ xuống dòng dưới, không cắt; VBSP chìm; dòng PGD đều; Nội dung sát dòng trên | |
| 7 | Giấy lĩnh: sửa tay 1 ô trong form / ✕ Làm trống form rồi gõ người khác → In | In đúng chữ đã gõ | |
| 8 | Giấy lĩnh tổ trưởng TK 104 (sau khi nạp danh mục) | Tự điền số TK 104 | |
| 9 | 📄 2 mẫu/A4 (cắt đôi) → in, cắt theo vạch | 2 tờ đều nhau, đúng form | |

**Ghi chú kỹ thuật 3.175:** bằng chữ chia dòng bằng đoạn script nhỏ trong trang in (`GL_JS`, đo `scrollWidth`) — chạy cả ở khung xem, In, PDF. Danh mục tổ lưu ở cài đặt (`dmTo`, `dmTK104`) nên không mất khi dựng lại danh bạ; nút Nạp file chung nhận diện trước khi phân loại số liệu (file danh mục có sheet giống Thông tin tổ trưởng vẫn không bị nạp nhầm).

### Danh sách thử trên máy thật (3.174) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở 🏢 Giao dịch xã (đã có Mẫu 31) | Khối LỌC ĐỊA BÀN tự chọn điểm GD gần nhất; 04/TD / 12/GDX chỉ hiện Xã · Điểm GD | |
| 2 | 04/TD: gõ số hộ + số tiền (hoặc bấm chip), xem 📋 Tóm tắt, bấm IN | In 2 bản; đường kẻ dưới tên cơ quan / tiêu ngữ gần chữ, không chạm | |
| 3 | 04/TD: chọn Phó Giám đốc ký, chọn 1 bản | "KT. GIÁM ĐỐC / PHÓ GIÁM ĐỐC"; in 1 bản — anh xem thể thức | |
| 4 | 12/GDX in 12 dòng và 20 dòng (có chọn GDV / KSV / TT) | Đầu mẫu như mẫu trắng; 3 tên ký cùng hàng; trọn 1 trang | |
| 5 | 12/GDX in 30–36 dòng | Vẫn trọn 1 trang A4, chỗ ký không bị bóp | |
| 6 | 💵 Giấy lĩnh: gõ tên tổ trưởng không dấu → chọn → chọn khách → Rút hết số dư → In A5 (và thử A4 nửa trang) | Đúng tên, TK 105, CCCD; dòng có thông tin không chấm, dòng trống giữ chấm; khớp giấy in sẵn | |
| 7 | ⚙ Khai báo chung → 📥 Nạp file danh mục địa bàn (369 tổ) rồi file TK 104 | Báo số tổ khớp Mẫu 31; Giấy lĩnh tổ trưởng TK 104 tự điền; danh sách TK 104 không còn là tổ trưởng hợp lý | |
| 8 | 📜 Nhật ký in → In lại 1 bản đã in | Ra đúng bản cũ (ngày, người, số tiền) | |
| 9 | ⚙ Khai báo riêng: tích / bỏ "Chọn nhanh" 1 mục | Mục ra / vào khung trái, nhớ sau khi mở lại | |

**Ghi chú kỹ thuật 3.174:** cây địa bàn = Mẫu 31 (`TO_K`), điểm theo `t.diem` (mã TXN…) / `t.ngayGD`; chưa có số liệu dùng `D.cauHinh.diaBan`. Phạm vi lọc dùng chung `pvChung` (như các tab). Tham chiếu chỉ bù, không sửa số liệu. Nhật ký in chỉ ở máy in (không đồng bộ Drive). Còn chờ anh: thể thức PGĐ ký; dòng 1 "NGÂN HÀNG CHÍNH SÁCH XÃ HỘI" mẫu 12 có bỏ in đậm không; bản scan giấy lĩnh in sẵn (để làm in đè); KHĐ (khoanh, HSSV) làm sau.

### Danh sách thử trên máy thật (3.173) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tháng có cả Mẫu 31 và file KHĐ (mẫu 14) → 📥 Nạp & KT › Kiểm tra số liệu | Dòng "KHĐ app tự tính (luật hệ thống) ↔ file KHĐ": khớp, hoặc lệch có ghi lý do từng món | |
| 2 | Xem dòng "Món quá 3 tháng … được loại theo luật hệ thống" | Liệt kê món ân hạn (CT 05/07/18, 01 C2, 06), HSSV, khoanh + gia hạn, lãi suất 0 | |
| 3 | Tháng chỉ có Mẫu 31 (không file KHĐ) → chip / báo cáo KHĐ | Số món KHĐ gần bằng số hệ thống (đối chiếu tháng có file) | |

**Ghi chú kỹ thuật 3.173:** luật lấy từ câu hệ thống "14. Sao kê món vay N tháng không hoạt động (DL Tháng)" — sổ phân tích truy vấn anh giữ riêng (không trong repo). Còn hỏi anh: điều kiện khoanh trong câu hệ thống viết OR (đã làm đúng như câu) — nếu ý định là AND thì đổi 1 dòng trong `slKHDLy`.

### Danh sách thử trên máy thật (3.172) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › 🏢 Giao dịch xã (máy chưa nạp số liệu cũng mở được) | Hiện hộp Kiểm tra trước đợt: điểm có ngày GD gần nhất, ngày phát, ngày ký hôm nay | |
| 2 | Khai báo sẵn: người lập, cán bộ, mức tiền (khai lại 1 lần) | Tự lưu; máy khác (Drive) cũng có | |
| 3 | In 04/TD 1 hộ 40 triệu → so với bản in từ file HTML cũ | Giống hệt (2 bản, gạch 1/2 dòng dưới PGD, tên người lập) | |
| 4 | ⭐ Lưu mẫu 1 hộ 40 tr, 2 hộ 80 tr, 3 hộ 120 tr → bấm 🖨 ở từng mẫu | In ngay, không gõ lại số | |
| 5 | Tích GQVL | "người lao động" ở mục 1, 2 và câu đề nghị | |
| 6 | Nơi giải ngân Tại PGD, chọn xã | Địa điểm = PGD, ngày gợi ý ngày mai, kính gửi UBND xã đã chọn | |
| 7 | 12/GDX: chọn điểm, In sẵn tên tổ trưởng, 12 / 20 / 36 dòng | Tên tổ trưởng theo Địa bàn; trọn 1 trang (36 dòng: xem có tràn không) | |
| 8 | Câu "Đề nghị … thông báo" | Ghi đầy đủ "Ủy ban nhân dân phường / xã …" | |
| 9 | Tab Hồ sơ vay | Không còn 04/TD | |

**Ghi chú kỹ thuật 3.172:** mẫu in KHÔNG sửa tay — muốn đổi bố cục thì sửa file HTML gốc rồi chuyển lại (template → chuỗi, CSS khối `.preview-stage` / `.sheet-a4`… / `@media print`), so ảnh in lại cho trùng. Thứ tự file: `26-giao-dich-xa.js` sau `25-ho-so.js` (dùng `ktXaChu`, `coChuHTML`, `ngayISO`, `ngayVN`). Ô "Tên UBND (câu đề nghị)" giữ khóa `tenUBNDVietTat` của file gốc nhưng app điền đầy đủ. **Lưu ý:** 12/GDX 36 dòng ở file gốc vốn tràn sang trang 2 (đo bằng trình duyệt) — giữ nguyên như file, anh xem bản in thật. Tên tổ trưởng in sẵn cần khai tổ ở Cài đặt › Địa bàn › Sửa danh sách tổ.

### Danh sách thử trên máy thật (3.171) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Hồ sơ vay › Bộ hồ sơ › + Bộ mới, HSSV, chọn hộ cũ trên cây tổ | Họ tên, CCCD, ngày cấp, địa chỉ, tổ điền sẵn; mục đích cố định | |
| 2 | Bộ mới NSVSMT, hộ mới: nhập CCCD | Giới tính, năm sinh, nơi cấp tự điền; nhập 2 công trình, 30 triệu 1 công trình → cảnh báo | |
| 3 | 🖨 In bộ | Đủ Giấy UQ, 01/TD, 10C, 03/TD (+ 01/TGTV nếu hộ mới); 03/TD ngang, còn lại dọc | |
| 4 | So từng mẫu với bản PDF giấy | Bố cục, chữ, đường kẻ tiêu ngữ mảnh, không gạch chân chữ | |
| 5 | ⚙ Khai báo: tải logo, tích thêm 1 mẫu | Logo in ở 01/TD, 01/TGTV và mẫu vừa tích | |
| 6 | 04/TD: chọn đợt 1 lần, nhập số hộ, số tiền từng điểm GD | Mỗi điểm 1 thông báo, giờ / phút / ngày phát đúng | |
| 7 | 02/BG tổ đông, 10C nhiều người | Bảng kéo dài, tiêu đề lặp đầu trang, 02/BG có Trang x/y, khách không bị tách trang | |
| 8 | 📝 Word bộ hồ sơ | Mở được, 03/TD trang ngang, có logo, 01/TGTV có chân trang | |
| 9 | Đổi trạng thái bộ; hộ mới lên Mẫu 31 tháng sau | Trạng thái nhớ; app báo đã thấy CCCD trên Mẫu 31 | |

**Ghi chú kỹ thuật 3.171:** bộ = `{id, ct, tt, moi, kh{ten,cccd,ncap,nc,ns,gt,dc,...}, tv[], tk, pa[]...}` trong `D.cauHinh.hsoBo`, bộ đang chọn `hsoTK.boId`; `hsoLapBo(B,t)` trả danh sách đơn vị `[{M,h}]`, `hsoTrang` bọc mỗi đơn vị 1 `.kt-to` (khổ / lề / số trang / chân trang riêng) và `hsoDocx` sinh 1 section mỗi đơn vị. Logo: `HSO_LOGO_MD` (01td, 01tgtv) + `hsoKB.logoMau`; mẫu không có logo gốc được chèn đầu trang trong `hsoLap`. **Chưa làm:** tự dời bộ đã xong vào thùng rác sau 90 ngày; Word 02/BG chưa có Trang x/y (bản in có); chú thích ¹ 01/TGTV nằm cuối thay vì trang 2; 10A / 10B / 11 / 01BG / 10C chưa có PDF để đối chiếu (mới sửa đường kẻ tiêu ngữ); lối tắt 01/TGTV ở tab Tổ (đang làm hàng loạt trong tab Hồ sơ vay).

### Danh sách thử trên máy thật (3.170) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Số liệu › 📝 Hồ sơ Tổ, chọn 1 tổ, mẫu 10C, ngày họp 05/10/2026 | Mẫu mới QĐ 70; tổ trưởng, tổ phó, thôn, xã, Hội điền sẵn (nền xanh); ô thiếu để chấm | |
| 2 | Đổi ngày họp 15/09/2026 | Tự đổi sang mẫu cũ (kết nạp bổ sung) | |
| 3 | Tích / bỏ tích Kết nạp, Cho ra | Tên vào bảng I / II, tổng số tổ viên sau họp đổi đúng | |
| 4 | ⚙ Khai báo 1 lần: khai PGD, trưởng ấp, tổ phó thực tế | Mẫu dùng ngay (nền vàng); lần sau mở lại vẫn còn (đồng bộ Drive) | |
| 5 | 02/BG cho 1 tổ | A4 ngang; mỗi khách 1 dòng đậm + dòng từng món; tổng nợ gốc khớp tab Tổ | |
| 6 | 📝 Word ở 10C, 11/TD, 02/BG | Mở được trong Word, đúng khổ (02/BG ngang), sửa được chữ | |
| 7 | 📄 Hồ sơ vay › 01/TD: chọn tổ viên, CT HSSV, số tiền | Tên, ngày sinh, CCCD, địa chỉ, tổ trưởng, Hội điền sẵn; bằng chữ đúng | |
| 8 | 04/TD (chọn xã, điểm GD) · 09A/TD (chọn khách, món) | UBND xã, điểm GD, ngày GD kế tiếp; mã khoản vay, gốc, lãi, ngày đến hạn đúng | |
| 9 | Chưa chọn tổ, bấm 🖨 In | In mẫu trắng (chấm) bình thường | |

**Ghi chú kỹ thuật 3.170:** `js/25-ho-so.js` — mỗi mẫu 1 hàm `hsoLap<mã>(t)` trả `{ma, h}` (HTML thân mẫu, lớp `c r j b i thut tr sau s10–s15`, bảng `luoi` / `khung0` có `data-w`); `hsoTrang` bọc trang in (`@page` theo mẫu, `.kt-to` để bộ in chuẩn chia trang); `hsoDocx` đổi cùng HTML ra .docx (thêm mẫu mới chỉ cần viết HTML theo quy ước này). Lựa chọn lần làm việc: `HSO` (đổi tổ / mẫu / kỳ thì đặt lại); nhớ lâu: `D.cauHinh.hsoO` (tkMin, hoiVT, mau10c, ngayDK, bgCa), `D.cauHinh.hsoKB`, `D.cauHinh.hsoTK` (mẫu đang chọn).

### Danh sách thử trên máy thật (3.169) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ, chọn 1 tổ | Hàng "Báo cáo của tổ" ngay dưới khối lọc; bảng tổ viên cuộn trong khung, không khuất | |

### Danh sách thử trên máy thật (3.168) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổng hợp chọn 1 báo cáo | Khung xem vừa hết cửa sổ, cuộn bên trong; trang không phải cuộn | |
| 2 | Tab Tổ, danh sách dài | Khối lọc đứng trên cùng; bảng cuộn trong khung vừa cửa sổ | |
| 3 | Sao kê, KTGS, Tra cứu | Nội dung sát lên trên, khối lọc cố định khi cuộn | |
| 4 | Thu nhỏ / phóng to cửa sổ | Khung tự cao lại cho vừa | |

**Ghi chú kỹ thuật 3.168:** chỉ áp cho màn rộng (≥ 900px); điện thoại giữ như cũ.

### Danh sách thử trên máy thật (3.167) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở lần lượt Tổ, KTGS, Sao kê, Tổng hợp, Tra cứu KH | Phần lọc là 1 khối "LỌC ĐỊA BÀN" giống nhau ở mọi tab | |
| 2 | Chọn xã → điểm GD → tổ | Chip đang chọn: Xã xanh dương, Điểm GD xanh lá, Hội cam, Tổ tím | |
| 3 | Nền tối | Khối, nhãn, chip vẫn đọc rõ | |
| 4 | Tra cứu KH (cột hẹp) | Khối gọn, không tràn ngang | |

**Ghi chú kỹ thuật 3.167:** điện thoại vẫn dùng ô chọn thả xuống (như cũ), khối chỉ thêm khung + màu.

### Danh sách thử trên máy thật (3.166) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Văn bản → 🗑 Xóa → chọn 3 file | Thanh dưới có "📋 Chép 3 file" và "Xóa 3 file" | |
| 2 | Máy có cầu nối: 📋 Chép 3 file → Zalo Ctrl+V | Dán đủ 3 file | |
| 3 | Máy chưa cầu nối (Windows 11, Chrome / Edge) | Hiện hộp chia sẻ Windows có nút Sao chép | |
| 4 | Xem 1 file → 📤 Gửi → 🪟 Hộp chia sẻ Windows | Hộp chia sẻ mở với file đang xem | |

**Ghi chú kỹ thuật 3.166:** hộp chia sẻ Windows chỉ có trên Chrome / Edge Windows 10–11 và file phải có sẵn trong máy (đã mở / tải từ Drive). Firefox không có → tải về.

### Danh sách thử trên máy thật (3.165) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp & KT → 🔍 Kết quả kiểm tra | Mỗi file 1 dòng ✓ · ⚠ · ⓘ, thứ tự như ma trận; mặc định chỉ hiện ⚠ + ⓘ | |
| 2 | Chip Tất cả / ✓ Khớp | Hiện đúng loại mục; lần sau vẫn nhớ | |
| 3 | 🔎 gõ "cccd" | Chỉ còn file có mục khớp, tự mở | |
| 4 | Bấm dấu ⚠ trên ô ma trận | Khung kết quả mở, nhảy tới đúng dòng file | |

### Danh sách thử trên máy thật (3.164) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổng hợp | Danh sách 3 nhóm, mỗi báo cáo có nhãn cấp; bấm 1 báo cáo → khung phải hiện ngay | |
| 2 | Theo nguồn vốn, chọn Xã → Hội → Tổ | Số nhỏ dần đúng phạm vi; dòng cộng ghi "Cộng <xã> · <hội>…" | |
| 3 | Chọn 01.1 rồi chọn Hội | 01.1 mờ, đầu bảng dòng vàng "chỉ chia tới xã — đang hiện số cả xã" | |
| 4 | In / PDF / Excel ở khung phải | Đúng báo cáo đang xem | |

**Ghi chú kỹ thuật 3.164:** LEN_31 (`dv`, `hoi`, `ctx`, `to`, `tg`) chưa thử bằng số vì bộ giả chưa có file LEN_31 (xem BAN_GIAO_3161.md §2.1).

### Danh sách thử trên máy thật (3.163) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở tab Nạp & KT | Tự về tháng có số liệu mới nhất; dải lịch có ●◐○, rê chuột thấy thiếu file nào | |
| 2 | Nạp 1 Mẫu 31 theo ngày | Thêm 1 cột ngày (dd/mm/yyyy) nằm giữa cột chốt tháng trước và cột chốt tháng | |
| 3 | ⇔ Tổng quan / ▾ Thu gọn | Tổng quan chỉ cột chốt tháng; Thu gọn ↔ Bung ra cùng 1 nút | |
| 4 | Tab Tổ, chọn 1 xã, đổi cỡ cửa sổ | Bảng không tràn ngang; màn rộng tự có thêm cột Số món vay, Tỷ lệ QH…; số triệu đồng có ",00" | |
| 5 | ⚙ Cột → 1 cột "Luôn hiện", 1 cột "Ẩn" | Bảng theo đúng, lần sau vẫn nhớ | |
| 6 | Danh sách khách → 🖨 In đầy đủ | A4 ngang, đúng các cột đang thấy trên màn hình, chữ co vừa trang | |
| 7 | Chọn kỳ tháng chưa có Mẫu 31 | Chip "⚠ Dùng T…" cuối hàng Xã, ⚠ ở ô kỳ đầu trang; bấm chip mở Nạp & KT đúng tháng | |
| 8 | Hàng Tổ (bộ lọc) | Chip tổ có tên ấp chữ nhỏ; rê chuột thấy ấp, mã tổ, số tổ viên | |

**Ghi chú kỹ thuật 3.163:** cột Tự động dựa vào bề ngang thật của khung bảng lúc vẽ — in / Excel không đổi theo màn hình (In = cột chính cố định; In đầy đủ = cột đang hiện; Excel = đủ cột). Danh sách khách vẫn ghi tiền đồng (chờ anh quyết có đổi sang triệu đồng không). Tab Tra cứu chưa có chip báo số liệu (tab không dùng `kyGhiHTML`).

### Danh sách thử trên máy thật (3.162) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ chọn 1 xã | Hàng Xã vẫn hiện, xã đó xanh; bấm PGD là về Toàn PGD | |
| 2 | Hàng 2 | Điểm GD │ Hội cùng 1 dòng; chọn cái nào trước cũng được | |
| 3 | Hàng Tổ | Chip tổ + ô "Chọn tổ ▾" đủ danh sách | |
| 4 | 📍 đường dẫn | Nằm cùng hàng Xã, bên phải; chỉ để xem | |

**Ghi chú kỹ thuật 3.162:** cột hẹp (Tra cứu, Tổng hợp) hàng tự xuống dòng.

### Danh sách thử trên máy thật (3.161) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ chọn 1 xã | Chip 3 nhóm ≤ 2 dòng; nút In / Excel / ⚙ Cột ở đầu bảng; bảng cuộn trong khung, dòng Cộng luôn thấy | |
| 2 | Số trong bảng | Triệu đồng, có dấu chấm, không ,00; ô 0 trống | |
| 3 | 🖨 In | A4 dọc 10–11 cột, vừa trang | |
| 4 | ⚙ Cột → bật Số món vay | Bảng có thêm cột, lần sau vẫn nhớ | |
| 5 | Dòng tóm tắt | "Biến động 31/07/2026 → 31/08/2026" | |
| 6 | Chọn 1 tổ → 🖨 In danh sách | Khách tất nợ còn TK 105 / CCCD hết hạn, sắp hết hạn / chưa có TK 105 in đậm, cột Lưu ý ghi lý do, cuối bảng có dòng đếm | |

**Ghi chú kỹ thuật 3.161:** danh sách khách (màn hình / in) vẫn ghi tiền bằng đồng (chính xác từng khách); chỉ bảng tổng hợp các tổ / PGD đổi sang triệu đồng. Chip "Mới vào tổ T8" vẫn ghi tháng (đủ ngày ở dòng tóm tắt). Lỗi hoiquy chập chờn ("báo cáo đã bỏ quay lại") chưa tìm ra — xem BAN_GIAO_3161.md.

### Danh sách thử trên máy thật (3.160) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ: chọn xã | Dòng 📍 có tên xã + ✕; hiện ② Điểm GD và Hội | |
| 2 | Chọn Hội trước, chưa chọn điểm | Hiện ③ Tổ của Hội trong xã; bảng theo Hội cả xã | |
| 3 | Bấm tên xã trên dòng 📍 | Mở lại hàng ① Xã để đổi | |
| 4 | ✕ trên Hội | Bỏ Hội, giữ điểm | |
| 5 | Tra cứu KH | Không còn khung gập "Toàn PGD"; lọc như tab Tổ; số khách trên dòng 📍 | |
| 6 | Nền tối: Chuẩn hóa, ô thả xuống | Ô nền tối, chữ đọc rõ | |

**Ghi chú kỹ thuật 3.160:** hàng ③ Tổ tối đa 40 chip (xã nhiều tổ thì chọn Điểm / Hội trước hoặc 🔎).

### Danh sách thử trên máy thật (3.159) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm ◐ ở chân thanh bên 2 lần | ☀ Sáng rồi ☾ Tối; mở lại app vẫn giữ | |
| 2 | Nền tối: Tổ TK&VV, KTGS, Nạp & KT, Văn bản | Chữ đọc rõ, không còn ô nền sáng chữ sáng | |
| 3 | Nền tối: In / xem file PDF | Bản in, trang PDF vẫn nền trắng | |
| 4 | Chân thanh bên khi có tin dài | Hiện đủ (≤ 3 dòng); chip Drive / bộ nhớ không bị cắt | |

**Ghi chú kỹ thuật 3.159:** màu cứng còn lại trong CSS chủ yếu là nền thanh bên / đầu trang (cố ý) và giấy Hôm nay (nền giấy cả 2 chế độ). Gặp chỗ nào chữ khó đọc ở nền tối thì chụp gửi em.

### Danh sách thử trên máy thật (3.158) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội → 🏛 Khai báo Hội, chọn 1 xã | Bảng vừa 1 trang: dòng nhóm xã, cột Hội (tổ) · CT · PCT · BTV 1–3 · Nhiệm kỳ · HĐUT · Ngày HĐ | |
| 2 | Bấm 📋 cạnh tên Hội | Mở Phân công BTV của Hội – xã đó | |
| 3 | 📖 Chuẩn hóa | Có 2 dòng Số / Ngày KH Hội tỉnh; số đã khai trước đây đã tự chuyển sang (lấy số nhiều xã khai nhất) | |
| 4 | Mục Riêng từng xã | Tên Hội cấp xã đã gõ trước vẫn còn; xã có KH khác vẫn giữ số riêng | |
| 5 | In Kế hoạch 01/KH | Căn cứ KH Hội tỉnh đúng số / ngày | |

**Ghi chú kỹ thuật 3.158:** tên Hội cấp xã vẫn lưu ở `ktHoiKB[k].ten` (không đổi chỗ lưu, chỉ dời ô gõ). `ktHdtThe` / `ktHkbIn` / `ktHkbXem` là mã cũ không gọi.

### Danh sách thử trên máy thật (3.157) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Văn bản → bấm 1 file PDF | Khung phải sát trên dưới; đầu khung 1 dòng 📁 nơi lưu · trang · KB + ⛶ ✕; rê chuột thấy tên file | |
| 2 | Bấm ⊡ Vừa trang | Trọn 1 trang A4 trong khung, cuộn lật từng trang; mở file khác vẫn giữ ⊡ | |
| 3 | Tab Tổ / KTGS: chọn xã → điểm → Hội | Hàng chip có nhãn chỉ hiện con của cấp đã chọn; Hội chọn được ngay ở cấp xã | |
| 4 | 🔎 gõ tên tổ trưởng | Gợi ý, chọn → tự điền Xã › Điểm › Hội › Tổ | |
| 5 | Tổng hợp | Nguồn vốn chip trên cùng; danh sách báo cáo 1 dòng | |
| 6 | Văn bản → ⚲ Lọc | Bảng lọc mở ngay dưới thanh; chọn → dòng "Đang lọc"; chip kiểu xem bấm 1 lần | |

**Ghi chú kỹ thuật 3.157:** hàng Tổ chỉ hiện khi ≤ 12 tổ (nhiều hơn dùng ô chọn / 🔎). Điện thoại giữ ô thả xuống kiểu xem + hộp lọc như cũ.

### Danh sách thử trên máy thật (3.156) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở 📥 Nạp & KT | Hàng nút 1 dòng; ma trận 2 tháng + Theo ngày, kẻ ô rõ, cột tháng chọn sáng; vừa 1 màn hình | |
| 2 | Bấm ‹ T7 / T9 › / tên cột tháng | Đổi tháng, cột sáng theo | |
| 3 | 📥 Nạp file chọn cùng lúc Mẫu 31 + BC0437 | Nhận đúng loại; xong vài giây thấy ô ✓ / ⚠, dòng 🔍 Kết quả có tóm tắt (không bấm Kiểm tra) | |
| 4 | Rê chuột dấu ⚠ | Hiện mục chênh lệch | |
| 5 | ⇔ Tổng quan / ▾ Thu gọn | 12 tháng trọn ngang / 1 dòng tóm tắt; app nhớ | |
| 6 | Nhóm Ⓚ KTGS | Bấm sổ ra thấy BC0437 / BC0438 | |

**Ghi chú kỹ thuật 3.156:** `ktNapHTML` còn trong mã (không gọi). Dấu ✓ / ⚠ gắn file theo tên mục kiểm tra (`SL_KT_KHOP`) — mục mới thêm tên file lạ thì bổ sung bảng này.

### Danh sách thử trên máy thật (3.155) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Scan thẻ 2 người → Xem → Tiếp | Hộp 4 lựa chọn; tủ chưa có gì mới | |
| 2 | 💾 Lưu vào máy | PDF 4 người / A4 như bản in (iPhone: bảng chia sẻ → Lưu vào Tệp) | |
| 3 | 📋 Copy ảnh → dán Zalo PC | Ra ảnh 2 mặt thẻ | |
| 4 | 🗄 Lưu vào tủ → gõ tên khách | Gợi ý khách (mã KH · ấp · xã); lưu → Drive CCCD / Xã / Ấp / Mã KH Tên.pdf | |
| 5 | Đóng hộp giữa chừng, mở lại app | Dải vàng "bản vừa quét chưa lưu" → Mở lại | |

**Ghi chú kỹ thuật 3.155:** khách phải có trong danh bạ Số liệu (Mẫu 31 đã nạp). Tối ưu chụp (khung mép giấy, lọc Tài liệu kiểu Lens, tự xoay) để phiên riêng (anh chốt).

### Danh sách thử trên máy thật (3.154) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS Hội → 🏛 Khai báo Hội đoàn thể | 1 bảng, mỗi Hội – xã 1 dòng, số đã khai giữ nguyên | |
| 2 | Hội trước có Phó 2 / ủy viên 4–5 | Phó CT = người đầu, BTV dồn lên; ⓘ rê chuột thấy người dư | |
| 3 | Gõ ô → Enter / Tab / ↓ | Sang ô kế / dòng dưới, đã lưu | |
| 4 | Chép 1 khối từ Excel → dán vào ô | Điền đúng ô sang phải, xuống dưới | |
| 5 | Gõ ngày sai (vd 2026-01-10) | Ô tô đỏ | |
| 6 | ⋯ cuối dòng | Mở Phân công BTV (5 người tối đa) | |

**Ghi chú kỹ thuật 3.154:** `ktHdtThe`, `ktHkbIn`, `ktHkbXem` còn trong mã (không gọi ở bảng) — dọn khi viết lại Cài đặt / KTGS. Phân công BTV + Chuẩn hóa giữ như cũ (anh chốt: làm lại khi viết lại Cài đặt).

### Danh sách thử trên máy thật (3.153) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Văn bản: 🗑 Xóa → tích 1 file → Xóa | Không hỏi, vào Thùng rác | |
| 2 | Tích 3 file → Xóa | Hỏi 1 lần "Xóa 3 file?" | |
| 3 | Nạp & KT: bấm ô có file → Thay bằng file mới | Bản cũ ở 🗑 Thùng rác ngăn Số liệu; Khôi phục → ô về file cũ | |
| 4 | Xóa 1 ô / cả bộ tháng | Ô vào ngăn Số liệu; khôi phục được | |
| 5 | Xóa việc lịch / mẩu ghi chú / lần làm việc / bộ biểu mẫu / kế hoạch KTGS | Không hỏi; Thùng rác ngăn Mục nhỏ (mẩu ghi chú: ngăn Hôm nay); khôi phục về đúng chỗ | |
| 6 | Thùng rác | "Tự xóa hẳn rác cũ hơn 30 ngày" đã tích sẵn | |

**Ghi chú kỹ thuật 3.153:** D.rac chỉ ở máy đang xóa (như trước); bản trong máy của ô Số liệu nằm ở `slr_<id>_a/_g` tới khi xóa hẳn. Khôi phục ô khi không nối Drive và máy không còn bảng → báo cần nối Drive.

### Danh sách thử trên máy thật (3.152) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổng hợp / Sao kê / Tổ → Xem | Hàng nút: Đóng · 🖨 In · 📄 PDF · 📊 Excel · 📤 Gửi | |
| 2 | 📄 PDF | Hộp in, chọn Lưu dưới dạng PDF — tên file điền sẵn Loại_Phạm vi_Kỳ | |
| 3 | 📤 Gửi → 📋 Copy ảnh → dán vào Zalo PC | Ra ảnh trang báo cáo (chữ rõ) | |
| 4 | 📤 Gửi → 📋 Copy chữ → dán Excel | Ra bảng đúng cột | |
| 5 | KTGS Kế hoạch / Mẫu 04 / Mẫu 06 → Xem | Cùng hàng nút, có 📝 Word | |
| 6 | Văn bản → khung xem → 📤 Gửi | Tải / gửi file; Copy số hiệu + trích yếu | |
| 7 | iPhone: 📤 Gửi → Copy ảnh | Safari có thể không cho → app chép chữ thay | |

**Ghi chú kỹ thuật 3.152:** Copy ảnh dùng SVG foreignObject — Chrome / Edge máy tính chạy; Safari iPhone có thể chặn (tainted canvas) → tự chép chữ. Các nút In / Word riêng trên từng dòng tổ (KTGS) giữ nguyên; danh sách tổ viên / bảng các tổ in thẳng chưa qua khung xem (đợt sau).

### Danh sách thử trên máy thật (3.151) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở Văn bản, Biểu mẫu, Scan | Cùng 1 thanh: Thêm · Xóa · Lọc · Sắp xếp · Kiểu xem · ⋯ · ❓ | |
| 2 | ⚲ Lọc → chọn mảng | Nút "⚲ Lọc (1)", chip trên thanh, bấm ✕ bỏ | |
| 3 | ☰ ▾ → ▦ Bảng | Bảng gọn 20+ dòng / màn; bấm tiêu đề cột sắp xếp; ↑↓ chuyển, khung xem theo | |
| 4 | Tích ô đầu dòng ở bảng VB | Thanh "Xóa N file" hiện | |
| 5 | ⋯ từng tab | Lập chỉ mục / Bộ biểu mẫu / Chế độ quét, Webcam, Chữ ký·CCCD | |
| 6 | iPhone | Vẫn Danh sách, thanh không tràn | |

**Ghi chú kỹ thuật 3.151:** `hangLocNhanh`, `dongDangLoc`, `nutLocNhanh`, `batDongGon` còn trong mã nhưng không gọi (dọn sau). `veThanhSap` giữ tên, trả rỗng.

### Danh sách thử trên máy thật (3.150) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở 📥 Nạp & KT | 1 hàng nút, 1 dòng trạng thái, ma trận hết chiều ngang | |
| 2 | Tháng thiếu file | Dòng vàng: thiếu N file (bấm tên file để nạp); rê chuột thấy báo cáo nào dùng được | |
| 3 | Tháng đủ file → 🔍 Kiểm tra kỳ | Dòng xanh ✅ Đạt; bấm "N chênh lệch ghi nhận" mở kết quả | |
| 4 | ⋯ | Tải gốc cả tháng, xóa cả bộ tháng, tóm tắt, làm sạch, giữ sẵn… | |
| 5 | Tháng chưa có file | Chỉ báo "chưa có file nào" | |

**Ghi chú kỹ thuật 3.150:** `slKhung` / `slKhungCuon` / `slTTHTML` còn trong mã nhưng không gọi ở tab Nạp (để dọn khi chắc không cần).

### Danh sách thử trên máy thật (3.149) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Đầu trang có ô 📅 Kỳ | Đổi kỳ → Tổ, Sao kê, KTGS, Tổng hợp, ma trận Nạp cùng kỳ | |
| 2 | Chọn xã / điểm / tổ ở tab Tổ, sang Sao kê / KTGS / Tổng hợp | Vẫn đúng phạm vi đó | |
| 3 | Cây chọn | 2 hàng: ô chọn nối ›, chip của cấp kế tiếp; chọn tới tổ thì hết chip | |
| 4 | KTGS | Không còn dòng "Nạp … ở tab" và cảnh báo "Thông tin tổ trưởng thiếu tổ" | |
| 5 | Kế hoạch › In theo tháng | Vẫn lấy số liệu theo kế hoạch (cuối tháng liền trước) | |

**Ghi chú kỹ thuật 3.149:** phạm vi dùng getter / setter trên đối tượng cấu hình từng tab (JSON vẫn ghi giá trị) — mọi chỗ cũ `C.xa = …` tự ghi về `pvChung`. Ô tìm tổ ở Tổ / KTGS chưa dời vào hàng cây (để 3.151 / sau).

### Danh sách thử trên máy thật (3.148) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Laptop: nạp 1 file / làm việc lâu | Chân thanh bên: đèn vàng nhấp nháy + thanh màu chạy + chữ việc đang làm; xong → hết vàng | |
| 2 | Một thao tác có báo (vd thêm file) | Chữ hiện ở chân thanh bên, không nổi đè nút; bấm chữ → danh sách tin | |
| 3 | Mở các hộp thoại | Thôi / Đóng bên trái, nút chính (xanh) bên phải; nút không dài bất thường | |
| 4 | Danh sách Văn bản / Scan | Không còn 🗑 cuối dòng; xóa bằng 🗑 Xóa file đầu tab | |
| 5 | Điện thoại | Tin + đèn nằm trong thanh đáy | |

**Ghi chú kỹ thuật 3.148:** biến trạng thái tên `TTB` (tránh trùng biến cục bộ `TT` trong số liệu). Khối trạng thái + `#so-lieu` được giữ tham chiếu (`TTB.o`, `TTB.sl`) vì `dhVe` vẽ lại thanh bên mỗi lần đổi tab.

### Danh sách thử trên máy thật (3.147) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Laptop (màn ≥ 1100 px) | Thanh bên trái; đầu trang 1 hàng (ô tìm + giờ); không còn thanh tab ngang | |
| 2 | Bấm từng mục thanh bên | Mở đúng màn, mục tô trắng; Số liệu không còn thanh tab con | |
| 3 | Nút « | Thu còn biểu tượng (rê chuột hiện tên); mở lại app vẫn thu | |
| 4 | Số đếm | Văn bản = file chờ duyệt; Nạp & KT ⚠ = file bắt buộc còn thiếu tháng mới nhất; 🗑 = số mục thùng rác | |
| 5 | Công cụ HSSV / Địa bàn / CT vay trên thanh bên | Về Hôm nay, mở công cụ ở cột Công cụ | |
| 6 | Alt+1…9 | Mở mục theo thứ tự | |
| 7 | iPhone / cửa sổ hẹp < 1100 px | Như cũ: thanh tab ngang, không thanh bên | |
| 8 | In một báo cáo | Bản in không có thanh bên | |

**Ghi chú kỹ thuật 3.147:** thanh bên vẽ lại mỗi lần đổi tab (`dhTo` → `dhVe`, chỉ đếm mảng nhỏ / meta). Tab ngang vẫn trong DOM (ẩn CSS) để lối cũ + phép thử bấm được. Chưa làm (để anh xem rồi tính): thanh công cụ từng màn ≤ 41 px (quy chuẩn mục 8), dời chip Drive / bộ nhớ vào chân thanh bên, kỳ + phạm vi chung trên đầu trang (đợt D).

### Danh sách thử trên máy thật (3.146) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📥 Nạp & KT, tháng đủ 9 file → 🔍 Kiểm tra kỳ | 4 bước ✓, hộp ✅ Đạt xanh, tiêu đề cột tháng ✓ xanh, dòng ① "✓ Đạt" | |
| 2 | Tháng có chênh lệch (vd thu nợ LEN thấp hơn) | Vẫn ✅ Đạt; mục lệch nằm dưới "Ghi nhận chênh lệch — chỉ để biết" | |
| 3 | Tháng thiếu file | "Chưa Đạt — Thiếu file: …"; chip báo cáo nào dùng được | |
| 4 | Tháng trước đây đã chốt 🔒 | Không còn 🔒, nạp / thay / xóa được; dữ liệu còn nguyên | |
| 5 | Tháng có BC0437 / BC0438 → Kiểm tra kỳ | Kiểm luôn phần KTGS (khối File KTGS có kết quả) | |

**Ghi chú kỹ thuật 3.146:** Đạt tính trực tiếp từ meta (`slDanhGia`), không lưu; `SLM.kt[ky]` vẫn là kết quả các phép so (ghi nhận). Chưa làm (để sau, anh chưa cần): ô "Ghi nhận của anh" cho từng mục, KHĐ "số tháng liên tiếp khớp".

### Danh sách thử trên máy thật (3.145) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app (có nối Drive) | Báo "đã xóa hẳn N bảng của các mẫu đã bỏ" nếu máy còn B32 / Mẫu 10 / Mẫu 7 / Sao kê KH; Drive: file đó vào Thùng rác | |
| 2 | 📥 Nạp & KT › dòng ① | "Ⓑ bắt buộc x/3 · Ⓐ chuẩn TW x/6" | |
| 3 | Ô ma trận Mẫu 31 / QH / khoanh / KHĐ / DSTO | Số chính + mũi tên so tháng trước (dư nợ tăng xanh; QH, khoanh, KHĐ tăng đỏ); tổ chỉ số tổ | |
| 4 | Bấm ô trống | Mở chọn file nạp đúng ô | |
| 5 | Bấm ô có file → Thay bằng file mới | Hỏi trước; thay xong bấm lại ô có "↩ Hoàn tác lần thay" → về file cũ (Drive: file cũ ra khỏi Thùng rác) | |
| 6 | 📋 File cần xuất | Bảng file + mẫu chọn khi xuất (KHĐ mẫu 14), ✓ file tháng đang xem | |
| 7 | Tổ TK&VV | Tổ dư nợ 0 còn trên DSTO / LEN_31 ghi "⚠ Dư nợ 0 — cần đóng tổ", chip liệt kê; SĐT tổ trưởng theo DSTO | |
| 8 | Tháng không nạp file KHĐ | Tra cứu / Tổ vẫn có KHĐ (app tự tính); tháng có file → ② Kiểm tra có dòng "KHĐ app tự tính ↔ file" | |
| 9 | Tổng hợp › Theo nguồn vốn | Số TW / ĐP tính từ Mẫu 31 (không cần B32) | |

**Ghi chú kỹ thuật 3.145:** `SL_BAT_BUOC` 9 loại; `SL_NHOM` B / A / D / X. Loại đã bỏ: `SL_BO_HAN` + `slBoLoaiDon` (khóa chạy trùng `SL_BOLOAI`), giữ stub trong `SL_LOAI` (`bo`) để nhận diện file. Ô ma trận: `slOMT` → `slChinh` / `slMuiTen` / `slOBam`; tháng chốt 🔒 giữ nhánh cũ đến 3.146. Hoàn tác: `e.truoc` đi theo meta lên Drive (máy khác hoàn tác được qua Drive; máy này có bản `_truoc` trong IndexedDB — tốn thêm 1 bảng mỗi ô đã thay); `slXoa` xóa luôn bản `_truoc`. KHĐ tự tính: quy tắc ở `DU_LIEU_THANG.md` (mục KHĐ) — điều kiện "món vay sau mốc" là suy luận từ 3 món vay mới năm 2026 không có trong file T9, cần anh xác nhận qua vài tháng đối chiếu. `toDong0` chỉ ẩn tổ khi kỳ có DSTO hoặc LEN_31 (không có thì không đoán).

### Danh sách thử trên máy thật (3.144) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Thanh tab | Hôm nay · Văn bản · **📥 Nạp & KT** · Số liệu · Biểu mẫu · Scan · Thư viện; không còn Tháng | |
| 2 | Bấm 📥 Nạp & KT | Ma trận file + Kiểm tra & chốt + khối File KTGS (BC0437 / BC0438) | |
| 3 | Bấm Số liệu | Tab con: Tổng hợp · Sao kê · Tổ · KTGS · Tra cứu; mở lại nhớ tab con gần nhất | |
| 4 | KTGS Hội | Không còn khối nạp BC; có nút sang 📥 Nạp & KT; Mẫu 06 / 16 / 04 / Kế hoạch như cũ | |
| 5 | Mở app có nối Drive (máy tính) | Báo "Đã bỏ tab Tháng: xóa N mục…"; drive.google.com: thư mục "Dữ liệu tháng" nằm trong Thùng rác | |
| 6 | Máy thứ 2 / điện thoại | Không còn mục Dữ liệu tháng sau đồng bộ | |
| 7 | Kéo thả file Excel vào app (ngoài tab Văn bản) | Mở xem trước của tab Nạp & KT | |
| 8 | Hôm nay › cột 🧰 Công cụ | Không còn Giao ban, Buổi GD | |

**Ghi chú kỹ thuật 3.144:** tab Nạp & KT là khung tab 7 với `slTab='nap'` (nút `data-sl`); `slTabConHTML` trả tiêu đề riêng khi `nap`. `boThangDon` (06-hop-thoai.js) dùng `xoaFileDrive` / `daXoaHan` như Xóa hẳn ở thùng rác, khóa chạy trùng `BO_THANG_CHAY`. `TAB_KHO` bỏ khóa 2; nhánh Excel → duLieu trong `xuLyMotFile0` tắt (`false &&`), PDF `khopMauNoiDung` → Văn bản.

### Danh sách thử trên máy thật (3.143) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 📥 Nạp nhiều file: bộ tháng có Mẫu 31 + KHĐ + Nợ khoanh + Thông tin tổ trưởng | Mẫu 31 (có cột ngày) tự tích; file không ghi ngày trong nội dung → dòng "⚠ Cần khai ngày", ô Kỳ trống, không tích được | |
| 2 | Bấm "Tên file: … — dùng" hoặc tự chọn ngày ở ô Kỳ | Tích được; ghi "theo anh khai"; ghi nhận vào đúng ô | |
| 3 | File có ngày trong nội dung nhưng tên file ghi ngày khác | Lấy ngày trong file (như cũ) | |
| 4 | Nạp từng file / 🔁 Thay file (chọn ô trước) | Như cũ, không hỏi khai lại | |
| 5 | Ghi lại: loại file nào thật sự không có ngày trong nội dung | Anh báo em để ghi vào tài liệu | |

**Ghi chú kỹ thuật 3.143:** `slCanKhai` chạy sau khi tính kỳ trong `slPhanTich` / `ktPhanTich`: nguồn khác "cột ngày trong file" / "tiêu đề trong file" → `canKhai`, `goiYTen`, xóa `ngay/ky/nguonKy`. `slDoiKy` (sẵn có) đặt `nguonKy='anh chọn'`. Phép thử cũ chạy nhờ `tests/tv.js` bọc `slDocFile` (DOMContentLoaded) trả lại hành vi trước 3.143.

### Danh sách thử trên máy thật (3.142) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở link web (Ctrl+F5 một lần), xem số bản ở góc trái | v3.142; giao diện như cũ | Đạt (anh thử sơ qua 10/10) |
| 2 | Dùng lướt các tab: Hôm nay, Văn bản, Số liệu (Tổ, Sao kê, KTGS, Tổng hợp, Tra cứu), Biểu mẫu, Scan, Thư viện | Chạy như 3.141, không báo lỗi | |
| 3 | In / Word một mẫu KTGS và một báo cáo Tổ | Như cũ | |
| 4 | 🎓 Hạn trả HSSV › 📌 Cửa sổ nổi | Cửa sổ nổi đủ màu / kiểu chữ | Đạt (10/10) |
| 5 | Điện thoại: mở link web | Như cũ | |

**Ghi chú kỹ thuật 3.142:** tách bằng script một lần (dòng `<script>` / `</script>` đứng riêng → file). Thứ tự nạp giữ nguyên nên phạm vi biến / hoisting như cũ (mỗi khối cũ = 1 file). Mỗi bản sau: đổi `?v=` trong `index.html` cùng `APP_BAN` (`kiem.py` báo nếu lệch). Thêm file js mới: thêm thẻ `<script src="js/…?v=…">` đúng chỗ trong `index.html`. `t101_mau10_cu.js` vẫn mở `index.html` (bản cũ 1 file vẫn mở được). **Giới hạn đã biết:** mở app bằng bấm đúp file (file://) thì cửa sổ nổi HSSV không có kiểu chữ (trình duyệt chặn cửa sổ nổi đọc css/app.css; link web không bị). Phép thử dò chữ trong mã dùng `tests/nguon.js`.

### Danh sách thử trên máy thật (3.141) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Sau khi tải phiên bản ghép lên Drive → Cài đặt › Lấy từ Drive | Khai báo Hội, Phân công, lựa chọn in, ảnh CCCD mở được | |
| 2 | Mở app trên máy thứ 2 | Cài đặt về đủ, không mất | |
| 3 | Kế hoạch › In theo tháng › T10 (đang chọn kỳ khác) | Dòng "Số liệu in T10: T9/2026 …"; kỳ ô Số liệu không đổi | |
| 4 | 🖨 / 📤 Mẫu 06, 16, 04 của T10 | Tên file `…_SL30-09-26`; số liệu tháng 9 | |
| 5 | Tháng chưa nạp số liệu tháng trước | ⚠ ghi rõ đang dùng tháng nào | |

**Ghi chú kỹ thuật 3.141:** `dongBoCauHinh`: `keo` thêm điều kiện `D.cauHinh.chFileId!==f.id` (CH_RIENG có `chFileId`), lưu id khi kéo / đẩy. `baoDamDuong`: thay đầu đường dẫn "undefined"/"null"/trống bằng `D.cauHinh.thumuc || MAC_DINH.thumuc`. In theo tháng: `KT_KH_SL = {th, can, ky, K, BC, TR, goc, khong, loi}` — `goc` = KT_K lúc nạp (đổi kỳ → nạp lại); `ktKHInThangHTML` → `ktKHInThangHTML0(L, dem, slChu)`; ktVeThe trong `…G` hoãn bằng setTimeout (không vẽ cả màn khi đang mượn số liệu). **Chưa rõ** vì sao cài đặt trong trình duyệt máy anh bị trống sáng 09/10 — chờ anh nhớ lại (xóa dữ liệu duyệt web / đổi trình duyệt / link khác?). Ghi chú thêm: khóa ảnh CCCD `hsKhoa` đang đồng bộ trong cauhinh.json (xuatDuPhong thì bỏ) — cần anh quyết có giữ cách này không.

### Danh sách thử trên máy thật (3.140.3) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In báo cáo Tổ / Sao kê / Tổng hợp | Không còn "PGD NHCSXH GÒ DẦU" cuối trang; góc trên trái vẫn có | |

**Ghi chú kỹ thuật 3.140.3:** `bcKy()` trả `''` (hàm giữ cho 3 chỗ gọi); `BC_KY` vẫn dùng cho dòng cuối Excel.

### Danh sách thử trên máy thật (3.140.2) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy tính (Chrome / Edge): In theo tháng › 📤 PDF 06 một tổ | Hộp in → "Lưu dưới dạng PDF" → tên điền sẵn dạng `Xa_HND_Ap.._To.._M06_T..-26_SL..` | |
| 2 | 📤 PDF 16 tổ, 📤 PDF 16 cả tháng, 📤 PDF 04, 📤 PDF Kế hoạch | Tên đúng cấu trúc; 16 / 04 in 2 mặt | |
| 3 | Điện thoại: 📤 PDF | Nếu tên không tự điền → dán tên đã chép | |
| 4 | 📄 Word các mẫu trên | File Word cùng tên với PDF | |

**Ghi chú kỹ thuật 3.140.2:** `ktFTen(t, {to, mau, th, n, kh})` ghép `ktFChu(ktXaTen)` + `KT_HOI_VT[dv]` + (Ap/Kp + ấp, tổ trưởng) + mẫu + `T mm-yy` + `n to` + `ktFSL()` (theo `KT_K.ky`). `inPDF(h, ten)`: `inChuan` trước rồi mới thay `<title>` (giữ nhận diện Mẫu 06 cho "Trang x/y"), blob `trChuan = 1`, đổi `document.title` tạm 30 giây (`KT_PDF_TIT`), chép tên vào clipboard. Chưa kiểm chứng trên Chrome thật việc tên lấy từ tiêu đề khung in hay trang chính — đã đặt cả hai.

### Danh sách thử trên máy thật (3.140.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mẫu 06 Word tổ có tổng dư nợ dạng 1.178,4 | Dòng Cộng 1 dòng, số canh phải, in đậm | |
| 2 | Mẫu 06 Word / In: dòng hộ | Số tiền 2 số lẻ (65,56), canh phải, không xuống dòng | |
| 3 | Hộ có nợ lãi rất nhỏ (dưới 5.000 đ) | Ghi 3 số lẻ (vd 0,004), không thành 0 | |
| 4 | Kế hoạch › In theo tháng › dòng tổ: 🖨 In / PDF 16 · 📄 Word 16 | Biên bản 16 của riêng tổ đó (2 mặt) | |

**Ghi chú kỹ thuật 3.140.1:** `KT06_O_TIEN` (bề rộng ô số tiền: R5 / R6 / TGN / TDN 737, R8 / TNL 794), `KT06_LE_TIEN` = 30 (tcMar trái / phải). `ktCoTien06(v, o, dam)` = cỡ lớn nhất trong 22 / 20 / 18 / 16 vừa `(o − 2·30 − 20)·0,95`. `ktOTien06(x, [4, 5, 13])` canh phải + chèn `tcMar` trước `vAlign` / `hideMark`; dòng Cộng qua `ktCong06(ktSau06(K.sau))`. `ktTr06Lai(n)`: n < 5.000 đ → 3 số lẻ. `ktKHIn16(cach, ok, ma)`: có `ma` → 1 tổ, tên file "Mau 16 Tm-yyyy - To …". `ktCoVua` (3.118) giữ cho t122, không còn dùng ở Mẫu 06.

### Danh sách thử trên máy thật (3.140) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | KTGS › 🗓 Kế hoạch, chọn xã + Hội | Ấp xếp theo điểm GD → mã thôn; mỗi tháng trọn ấp; bảng chỉ chọn tháng cả ấp | |
| 2 | ⇅ Sắp lại ấp → ▲ ▼ → ↺ Về mặc định | Thứ tự đổi và nhớ; về mặc định đúng | |
| 3 | Kế hoạch đã lưu trước đây | Nếu có ấp chia nhiều tháng: cảnh báo vàng + Xếp lại theo ấp | |
| 4 | Bấm T10 ở "In theo tháng kiểm tra" | Các tổ của T10, tỷ lệ món; 🖨 06 từng tổ; Mẫu 16 cả tháng; Mẫu 04 T10 | |
| 5 | Bỏ bớt hộ cho dưới 90% rồi 🖨 06 | Hộp hỏi "Vẫn in" / "Chọn thêm hộ" | |
| 6 | Chip Định kỳ · Mẫu 06 + 16 (chọn tự do) | Không tích sẵn tổ theo kế hoạch | |

**Ghi chú kỹ thuật 3.140:** `ktKHDsTo` sắp theo `ktKHApThu`; `ktKHMacDinh` = chia dãy ấp liên tiếp (quy hoạch động tối thiểu max) vào `th`; `ktKHLich` gán tổ chưa xếp theo tháng ấp. Bảng KH: `KT_KH_SAP`, `ktKHApDoi(ap, ±1)`, `ktKHApMacDinhVe()`; cảnh báo `tach`. In theo tháng: `KT_KH_TH`, `KT_KH_DA`, `ktKHInThangHTML(L, dem)`, `ktKHIn06(ma, cach, ok)` (ok=2 bỏ qua hỏi 90%), `ktKHIn16`, `ktKHIn04T`; ép tháng kiểm tra `KT_DK_TH` (đọc ở `ktDKThang`), `ktDKGiaTri(v, v16, dsTo)`; ép 1 / 2 mặt: `KT_HAI_EP` (đọc ở `ktHaiMat`, Word) và `ktMat(h, v)` → `<meta name="kt-hai-mat">` (đọc ở `inChuan`). `ktDKDs` không còn dùng `ktDKLich` (hàm vẫn giữ).

### Danh sách thử trên máy thật (3.139) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ › chọn tổ › tích "Dự kiến chia tách tổ" → Xem / In | A4 ngang, ≤ 2 trang; theo mã KH; cột Tổ mới trống; vợ/chồng, SĐT; QH / khoanh in đậm sau tên; dòng dự kiến (1)(2)(3) 1 dòng; ký Tổ trưởng | |
| 2 | Excel cùng báo cáo | Dòng dự kiến ở đầu, đủ cột, dòng Cộng | |
| 3 | Mọi báo cáo tab Tổ / Sao kê / Tổng hợp | Góc trên trái "PGD NHCSXH GÒ DẦU" in đậm | |

**Ghi chú kỹ thuật 3.139:** `toBCChiaTach(t)` (`TO_BC` k=`ct`) dựng từ `toTV(t)` (đã bỏ hộ ra khỏi tổ 3.138.1), vợ/chồng lấy `o.voChong` dòng Mẫu 31 của tổ; trả `ky` (khối ký riêng) — `toHTMLIn` dùng `x.ky || bcKy()`; `coChu` 11 / 10 (> 46 hộ) / 9 (> 56 hộ); CSS `.ct-tom`, `.bc-bang.ct`, `.ct-ky` trong `TO_IN_CSS`. Tên cơ quan: hằng `BC_DV = 'PGD NHCSXH GÒ DẦU'` thay `D.cauHinh.donvi` ở `toDauBC`, `skHTMLIn`, `thHTMLIn`.

### Danh sách thử trên máy thật (3.138.1) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ › tổ Nguyễn Văn Hết, kỳ 07/10 (⟳ Làm mới) | 3 hộ đã cho ra không còn trong "Tất nợ · còn TK 105"; nằm ở chip "Ra khỏi tổ" với "Đi đâu" = "tất nợ, TK 105 không còn gắn tổ" / "đã đóng TK 105"; hộ "Chờ vay lại" vẫn còn | |
| 2 | Khách đã tất nợ trước 2026 | Ô Số TK 105 không ghi "đã mở TK" | |
| 3 | ② Kiểm tra số liệu (Mẫu 31 07/10) | Dòng "Khách đã tất nợ, đã ra khỏi tổ … n khách" | |
| 4 | Mẫu 06 phiếu 3–5 hộ (Word + In) | Trang 1 đầy (hộ + Cộng + nhận xét); trang 2 chỉ Biện pháp + ngày + chữ ký | |
| 5 | Mẫu 06 trắng 1 mặt / 2 mặt mở bằng **Word thật** | 1 mặt đúng 1 trang, 2 mặt đúng 2 trang, còn chú thích cuối trang; kẻ trên dòng Cộng nét đen | |

**Ghi chú kỹ thuật 3.138.1:** `slDanhRaTo(B, rows)` (gọi trong `slBo` với bảng món vay) gắn `o.raTo = lý do` cho mọi món của khách đã tất nợ mà không còn dòng nào cùng mã tổ mang TK 105 (`slCoTK`/`slStk`/`t105`), lưu `B.raTo`; bỏ qua khách không có mã tổ (vay trực tiếp). Dùng ở: `toNap` (không đưa vào `K.kh`), `toMapKy` (bỏ dòng, `M._ra` lý do → `toBienDong` "Đi đâu"), báo cáo TK 105 của tổ (cả `truoc`), `slDoiChieu`. `toStkChu` chỉ "đã mở TK" khi `conNo || dn>0 || lt>0 || chuaGN`. Mẫu 06: `ktSau06` bỏ `keepNext` từ đoạn "Tình hình thực hiện" đến trước "Biện pháp xử lý"; `ktKeManh(tr, dau, cuoi)`; mẫu trắng bỏ đoạn trống `4F8507C9`, dòng `w:line` 320 → 280 ở phần đầu, nhận xét 250. Bản In: `.kt-nxk` ngoài bảng, `.kt-giu` cho "Nhận xét:" + dòng 1 và cho Biện pháp + ngày + ký; lớp `kt-d1` / `kt-dc` kẻ đen.

### Danh sách thử trên máy thật (3.138) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ (hoặc Sao kê / KTGS): ô Số liệu chọn ngày 07/10 → bấm **⟳ Làm mới** | Chip "📌 Đang dùng: ngày 07/10/2026 …"; sang Sao kê, KTGS cũng đang ở 07/10 | |
| 2 | Khách có dư nợ, TK 105 số dư 0 (chưa có số sổ) | Không nằm trong chip "Có dư nợ · chưa có TK 105"; ô Số TK 105 ghi "đã mở TK". **3.138.1:** khách đã tất nợ (kể cả trước 2026) không ghi "đã mở TK" | |
| 3 | Tổ có KU nhập nhầm rồi đóng (ca tổ Cáo / tổ Quang) | Khách không còn trong tổ nhập nhầm (không ở Tất nợ / Mới vào / Ra khỏi tổ); ② Kiểm tra ghi "KU hủy / nhập nhầm … đã loại" | |
| 4 | Sao kê › Nợ cần xử lý › **KU đã nhập máy chưa giải ngân** | Có các KU còn mở, giải ngân 0; KU quá 1 tháng tô nền, "Quá 1 tháng — cần đóng KU", xếp đầu; In / Excel được | |
| 5 | Tab Tổ › chip "Đến hạn tháng sau" | 2 cột ĐH theo HĐ / ĐH theo GDXA có ghi chú "chưa chuyển QH do ngày GD xã" / "chuyển QH ngày …"; In / Excel đủ 2 cột | |
| 6 | Mẫu 06 phiếu 1–2 hộ (Word **và** In) | Gọn 1 trang; chấm nhạt; kẻ dòng hộ mảnh xám; ngày ký nằm cuối dòng chấm "Biện pháp" thứ 2; chữ ký không sát mép giấy | |
| 7 | Mẫu 06 trắng 1 mặt / 2 mặt (Word **và** In) | 1 mặt đúng 1 trang (4 dòng hộ); 2 mặt đúng 2 trang; 3 cột Họ tên · Mục đích · Vào việc bằng nhau | |
| 8 | Mẫu 04 (In / PDF và Word) | Không còn đường kẻ lòi lề phải; tên Trưởng đoàn thẳng giữa dưới chức danh; có gạch dưới tên đơn vị; kiến nghị 2d, 2đ, 3a, 3b mặc định 1 dòng chấm, tích ở hộp "Chọn khi in" thì in câu gợi ý | |
| 9 | Kế hoạch ① ② (Word và In) | Gạch dưới tên cơ quan ngắn hơn tên (khoảng 1/3–1/2), cân giữa, không sát dòng "Số:"; gạch dưới Tiêu ngữ dài bằng chữ | |

**Ghi chú kỹ thuật 3.138:**
- Làm mới: `kyLamMoiHTML(tab, K)` (nút + chip `.ky-chip`, `.lech` khi `K.ky` ≠ kỳ chọn), `kyLamMoi()` đọc `#tr7 select[data-ky]`, gán `ky` cho `toCH/skCH/ktCH` + `KY_PHIEN`, xóa `TO_K, TO_KS, SL_BO, TH_KS, TH_K, TO_MAP, TO_BD, TO_BDT, TO_PVC, KT_K, KT_CHON, KT_GN, SK_K` rồi `veSoLieu()`.
- TK 105: `slCoTK(v)` (13–14 chữ số), `k.coTK` (3.138.1: `toStkChu` chỉ ghi "đã mở TK" khi `conNo || dn>0 || lt>0 || chuaGN`) trong `toKhach` + báo cáo TK 105; `toStkChu(k)` thay mọi `k.stk.join(', ')`; chip `ctk` thêm `!k.coTK`.
- KU hủy: `slKUHuy(o)` (CLOSE, `gn` có cột và = 0, không dư nợ, không lãi) — lọc trong `slBo` cho bảng món vay, giữ ở `B.huy`; dòng ở `slDoiChieu`. Bộ giả `taogia.py` có sẵn 1 món CLOSE giải ngân 0 (dòng mẫu) → cũng bị loại (t131 tính tương đối).
- Chưa giải ngân: `slKUChuaGN(o)`; `toTV` → `k.chuaGN` (chỉ khi không còn món dư nợ); chip `ko`, `ko105`, `ra` thêm `!k.chuaGN`; `toGoiY` / `toNgayO`. Báo cáo `skBCChuaGN` (`SK_BC` k=`cgn`), `ngayThem1Thang`, `skQua1Thang`; `skBang(..., phang)` = bảng liền không chia nhóm tổ.
- Chip đến hạn: `toDHMon(k)` dùng `skNhomDH` / `skHL`; cột ngày nay có thể nhiều cột: `toNgayCot` trả "A|B", `toNgayH`, `toNgayTh`, `toNgayGT(k, mo)` (mảng giá trị) ở 4 bảng (tổ / phạm vi, màn hình / In-Excel).
- Mẫu 06 Word: `ktTieuDe06` (cỡ 11, ô ≤ 900 twip cỡ 10, `tblCellMar` 45, bỏ "Times New Roman Bold" và giãn -16), `ktKeManh` (kẻ trên / dưới dòng hộ sz 2 màu A6A6A6), `ktLuoi06(x, KT06_LUOI_TRANG)` (đổi lưới + `tcW` theo `gridSpan`), `ktSau06` (đoạn chấm 2 = tab chấm 8600 + tab giữa 11805 + ngày; bỏ đoạn ngày trong bảng ký và đoạn trống đầu ô trái; dòng nhận xét 280), `ktChoKy06` (2 đoạn trống 14 pt sau "(Ký, ghi rõ họ tên)" khi không có tên), `ktChamNhat` (run chỉ chấm / chỉ tab → bỏ đậm, màu 808080) chạy sau `ktChamMin` cho riêng m06; dòng cán bộ `ktCB06` 16 pt; mẫu trắng nhận xét cỡ 12, dòng 13 pt. Bản In: lớp `kt-h` / `tbody.kt-ho` kẻ xám, `th.h` 10 pt, `.kt-nx2` (dòng chấm 2 + ngày), `W` (độ rộng 3 cột chữ).
- Mẫu 04: `ktGach04` (sau `ktBung04`): gạch tên đơn vị, khối "Nơi nhận / TRƯỞNG ĐOÀN" dựng lại với tab giữa `KT04_TD = 6900` (tên cũng 6900); `KT_KN04`, `ktKNIn04()`, `ktKN04HTML()` (trong `ktInHop` khi có m04), `ktKN04Doi`, `ktKN04Chu`, lưu `D.cauHinh.ktKN04 = {d|dd|a3|b3: {bat, chu}}`; `ktBung04` thay đúng `{{@CHAM3}}` sau d), đ), 3a, 3b. Bản In: `mucKN`, `gachDV`, bảng 97,3%.
- Kế hoạch: `ktBung01 = ktGachDau01(ktBung01Goc)`: xóa hình đường thẳng trong bảng đầu trang, `ktGachSau(x, chu, tỉ lệ, ô rộng, sau)` + `ktGachP(L, ô)` (đoạn 1 pt có viền dưới, thụt 2 bên), đo chữ `ktDoChu` (canvas, twip); `ktXmlHTML` vẽ đoạn có `pBdr/bottom` thành gạch.
- Công cụ đo (không thuộc repo): xuất docx → LibreOffice → `pdfinfo`; bản In → `inChuan` → `page.pdf`.

### Danh sách thử trên máy thật (3.137) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ → chọn tổ → chip "Tất nợ · còn TK 105" | Không còn 2 chip "còn 105" / "Đề xuất cho ra"; không tô nền màu, 105 > 100.000 đ in đậm; cột Nợ lãi sau Dư nợ; cột Ghi chú (màn hình: "Chờ vay lại" / "Cho ra"; In / Excel để trống) | |
| 2 | Hộ dư nợ 0 còn lãi | Nằm ở "Có dư nợ", Nợ lãi tô đỏ, gợi ý "Còn lãi — chưa tất nợ"; không vào "Đề xuất cho ra" | |
| 2b | Danh sách cấp Hội / xã / PGD, bảng vào / ra | Cột Tổ đứng trước Họ tên; cột Gợi ý chữ ngắn | |
| 3 | Báo cáo TK 105 của tổ | Mục A có cột Dư nợ, Nợ lãi; có mục A2 nếu có hộ dư nợ 0 còn lãi | |
| 4 | Chip Ra khỏi tổ | Có cột Nợ lãi tháng trước | |

**Ghi chú kỹ thuật 3.137:** cột `k.lt` (= Σ `laiTon` các món) trong `toDsTVHTML`, `toBCDS`, `toDsPVHTML`, `toBCDSPV`; `toGoiY` thêm ca dư nợ 0 còn lãi; chip ẩn bằng phần tử thứ 5 của `TO_LOC` (`ko105`, `ra` vẫn dùng cho dòng tóm tắt / bảng); `toXen(ds)` (nền xen kẽ theo tổ, lớp `to-xen` / in `xen`), `to105(k, html)` + `TO_105_CB = 100000`; In / Excel cột Ghi chú để trống; `TO_MAP[kỳ][kh].lt` → `toBienDong` ra `.lt` → các bảng Ra khỏi tổ; `toBCTK105` dùng hàm `bangA` cho mục A + A2 (`conLai` có 105).

### Danh sách thử trên máy thật (3.136) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp Mẫu 31 + Dư nợ chi tiết (+ KHĐ) ngày 7/10 | Ma trận: cột "📅 Theo ngày" có chip 07/10 ở các dòng đó; nếu còn ngày cũ app hỏi xóa | |
| 2 | Tab Tổ → ô Số liệu chọn "ngày 07/10/2026 · Mẫu 31" | Dòng 📌 ghi Mẫu 31 / Dư nợ chi tiết / KHĐ: 07/10, loại còn lại "cuối T9" (tô vàng); dư nợ, TK 105 theo ngày | |
| 3 | Chip Mới vào / Ra khỏi tổ khi chọn ngày | Ghi "Mới vào 07/10", so với cuối T9 | |
| 4 | KTGS chọn kỳ ngày | Dòng cảnh báo đủ / thiếu trên màn hình; phiếu in không có ghi chú | |
| 5 | KTGS › Sau giải ngân (30 ngày) | Có "T10/2026 (đến 07/10 — Mẫu 31 ngày)", lập được phiếu | |
| 6 | 🗑 Xóa ngày cũ | Chỉ còn ngày mới nhất; bản cuối tháng nguyên | |
| 7 | Đóng app mở lại, đợi vài giây | Chip ⚡ báo đang dựng từng kỳ rồi "sẵn sàng"; vào tab Tổ không phải chờ | |
| 8 | 🧹 Làm sạch & nạp lại | Dựng lại từ file đã lưu, có tiến độ; không mất file | |

**Ghi chú kỹ thuật 3.136:** `slKyDung(loai, ky)` — kỳ tháng: chỉ đúng bảng tháng; kỳ ngày: đúng ngày → bản ngày gần nhất trước đó trong tháng → cuối tháng trước. `slBo(ky)` dùng nó cho mọi loại, ghi `B.nguon[loai] = kỳ thật`. `toNap(ky ngày)` chỉ còn 1 bộ (`K.B` = bộ của ngày), `K.ky` = kỳ chọn, `K.thang` = tháng. Biến động (`toBDNap`, `toBDTNap`) so `TO_K.ky` với `kyLui(TO_K.thang, -1)`; `toMapKy(ngày)` cần Mẫu 31 đúng ngày. Ghi chú: `slNguonHTML(B[, kt])`, `slNguonChu(B)` (in), `toKyKQ(K)`. Loại mới tùy kỳ có cờ `tuyMoi` (ngày chỉ lấy từ tên file → về cuối tháng). Ma trận: `slDsNgay`, `slONgay`, `slChipNgay`, `slXoaNgayCu(giu)`, `slSauNap(ds)`. Dựng sẵn: `slNapSan(lai)` thêm ngày mới nhất, `SL_SAN_NAP.dang/ds/lai`, tự chạy 6 s sau khi mở app. `slBoXoa` bỏ mọi bộ theo ngày. Sau giải ngân: `ktThangHS` gồm tháng chỉ có Mẫu 31 ngày, `ktGNNgayCua(th)`, `ktGNThangChu(th)`, `KT_GN.ngay`.

### Danh sách thử trên máy thật (3.135) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 0 | Bấm ô T7/2026 dòng Dư nợ chi tiết | Hộp có mục "Bản theo ngày trong tháng" → bấm bản 10/07/2026 → "🗑 Xóa bản ngày 10/07/2026", bản 31/07 còn nguyên | |
| 0b | Mở bất kỳ ô chọn ngày (nạp số liệu, ngày kiểm tra KTGS, sao kê từ/đến) | Cạnh ô có "= dd/mm/yyyy (ngày/tháng/năm)", đổi ngày là đổi theo | |
| 1 | Xóa bản Dư nợ chi tiết vào nhầm T7 ("+ 1 ngày"), nạp lại file 7/10/2026 | Vào ô T10/2026 (theo ngày), có dòng báo "kiểu tháng/ngày (Mỹ)" | |

**Ghi chú kỹ thuật 3.135:** `slKieuNgay(sheet, r, tenFile)` cho ra `'md'` | `'dm'` | `''` (quét tối đa 4.000 dòng). `slDocFile` bật `TDN_MD` trong lúc `slLayDong`; `tdnNgay` đọc a/b/yyyy theo cờ đó. Gợi ý ngày toàn app: khối `<script>` riêng sau `batDau` — `ngayGYQuet()` gắn `<small class="ngay-gy">` sau mọi `input[type=date]` (giữ ở `input._gy`), cập nhật bằng sự kiện `input`/`change` (bắt ở `document`) và `MutationObserver` (childList + đổi thuộc tính `type`, gom 30 ms); `tests/kiem.py` thêm `MutationObserver` vào danh sách hàm sẵn có.

### Danh sách thử trên máy thật (3.134) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In / Word Mẫu 06 | Mục đích cùng cỡ chữ nhỏ; cột Hiệu quả đầu tư rộng hơn; tên Hội không đậm; "Mẫu số 06/TD" nhỏ, canh phải | |
| 2 | 📄 Mẫu 06 trắng → In 1 mặt | 1 trang đủ phiếu, 4 dòng hộ | |
| 3 | 📄 Mẫu 06 trắng → In 2 mặt (in 2 mặt thật) | 1 tờ: trước 12 dòng, sau 9 dòng + nhận xét + ký; Word cũng 2 trang | |
| 4 | Mẫu 16 / 04 tổ có lãi tồn cao | "Món vay không có giao dịch từ 3 tháng trở lên, lãi tồn cao…", không còn "x tháng lãi" | |

**Ghi chú kỹ thuật 3.134:**
- `ktCo06Md` luôn 16 (8 pt).
- Khuôn Word m06: lưới `[…,807,807,994,794,1117]`; khối "Mẫu số" cỡ 20.
- Mẫu trắng:
  - `KT_TRANG06 = {mot:4, hai:21}`; `ktTrang06GT(kieu)` cho ra `{f:{}, trang:1, rows}`.
  - `gt.trang` → CSS dòng 22,7 pt; Word `trHeight 454`.
  - `ktTrang06` / `ktTrang06Xuat`.
- Lời văn: `ktDsGop(d)` (gộp hộ KHĐ + lãi tồn cao, nặng trước), `ktDsGopChu`; `ktDsLTC` bỏ số tháng.
- `TR_CSS .tr-nd`: `padding 0 1.5px` (border-box).
- Word mẫu trắng 2 mặt **chưa mở bằng Word thật** để xem có đúng 2 trang không: LibreOffice trong máy thử không mở được docx. Anh kiểm giúp ở mục 3.

### Danh sách thử trên máy thật (3.133) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ: chọn xã, để trống điểm, chọn Hội | Tóm tắt "… · Hội X (cả xã)", bảng chỉ các tổ của Hội đó trong xã | |
| 2 | Chip PGD + chọn Hội | Bảng PGD chỉ cộng tổ của Hội, Cộng trên đầu ghi tên Hội | |
| 3 | 📅 Biến động cả năm ở tổ / Hội / xã | Bảng chi tiết: STT, Mã KH, Họ tên, (Xã / Điểm GD / Tổ theo cấp), Vào, Ra, Ghi chú; In / Excel | |

**Ghi chú kỹ thuật 3.133:**
- **Chọn đa chiều:**
  - `PV_DUNG.to.daChieu`: `pvLuaChon(T, S, cap, dc)` / `pvCha(S, cap, dc)` cho Hội không cần điểm.
  - `pvChon` giữ Hội khi đổi xã / điểm.
  - `pvLoc` khi chưa chọn xã vẫn lọc theo Hội; các tab khác không đặt được Hội khi chưa có xã nên không đổi.
  - `pvChu` ghi "(cả xã)" và "Toàn PGD · Hội".
- **Bảng chi tiết vào / ra:**
  - `toBDNamBang()` + `toBDNamBangHTML(B, lớp)`; `toBDNamXuat` dùng bảng này kèm bảng tổng tháng.
  - `toMapKy` lưu thêm `gd` (ngày GD cuối); `toBienDong` thêm `tuTo` (vào) và `gd` / `chuyen` (ra).

### Danh sách thử trên máy thật (3.132) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tab Tổ, bấm chip PGD | Dòng tóm tắt toàn PGD; bảng có Cộng toàn PGD trên đầu, rồi xã → điểm GD | |
| 2 | Bấm 1 dòng điểm GD | Xuống bảng các tổ của điểm; vay trực tiếp STT 0 ở đầu; "Cộng n tổ" không tính vay trực tiếp | |
| 3 | Chọn xã / Hội, bấm chip Đề xuất cho ra | Danh sách khách cả phạm vi, có cột Tổ; In / Excel được | |
| 4 | Chip Mới vào tổ | Cột "từ đâu" ghi hộ mới (CIF mới) / CIF cũ dùng lại / từ tổ X | |
| 5 | 📅 Biến động cả năm ở cấp xã | Hàng Vào, 3 hàng nhóm, hàng Ra; bấm ô ra danh sách có cột Tổ | |
| 6 | Máy chậm? | Cấp PGD với dữ liệu thật mở trong vài giây | |

**Ghi chú kỹ thuật 3.132:**
- **Phạm vi:**
  - `toPVHTML(C)` gọi `toTVPV(C)`. Kết quả giữ trong `TO_PVC` theo khóa tháng|xã|điểm|hội|có biến động, gồm khách của mọi tổ trong phạm vi (`k.to` = tổ) và `B` = `toBienDong(toPVFn(C), Mn, Mp)`.
  - `TO_BDT` = bản đồ khách → tổ của tháng đang xem và tháng trước (`toBDTNap`).
  - Chip của phạm vi: `TO_LOC_PV` (mặc định `'bang'`); chip của tổ vẫn là `TO_LOC_MO`.
- **Bảng:**
  - `toBangPGDHTML` (cấp PGD), `toSoTo` / `toCongSo` / `toSoMoi` (chỉ tiêu tổ, tách từ `toBangToHTML`).
  - `TO_BANG_XUAT` + `toBangXuat(cach)`: In / Excel bảng.
  - `toGiaPV(C)` = tổ giả `{pv:true}` cho `toDauBC` / `toExcel(tp)`.
- **Biến động:**
  - `toBienDong(ma | hàm, Mn, Mp)`; `toVaoTu(kh, Mp)` cho ra nhóm `moi` / `cu` / `chuyen`; `toCifMax(M)` lưu `_mx` không liệt kê.
  - `toBDDem`, `toBDChu(B)`; `toBDNam` dùng cho cả tổ lẫn phạm vi (`TO_BDN.pv`).
- **Cây chọn:**
  - `pvVeCay` thêm chip PGD cho tab `to` (dù `toBatBuoc`).
  - `pvLuaChon` đếm `n` không tính vay trực tiếp.
- Xóa `TO_BDT` / `TO_PVC` ở `slBoXoa`, `toThuLai`, `slApDnct`.

### Danh sách thử trên máy thật (3.131) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp file Dư nợ chi tiết có tên ghi ngày xuất (khác ngày số liệu) | Vào đúng ô tháng theo cột "Ngày số liệu"; có dòng báo "lấy theo trong file" | |

**Ghi chú kỹ thuật 3.131:** trong `slDocFile`, `slTimKy` chạy ngay sau `slLayDong`, trước khi gọn cột theo `L.chi` (vì `nbc` không nằm trong `chi`).

### Danh sách thử trên máy thật (3.130) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp file Dư nợ chi tiết các tháng 12/2025 → 8/2026 | Mỗi file vào đúng ô tháng của dòng Dư nợ chi tiết | |
| 2 | Tổ TK&VV, chip Không dư nợ / Đề xuất cho ra | Cột Số TK 105 có số của khách đã tất nợ (số của tháng khách còn vay) | |
| 3 | Khách đang vay | Số TK 105 vẫn là số theo file mới nhất | |

**Ghi chú kỹ thuật 3.130:** `slDungDanhBa` không còn đưa `dnct` vào vòng theo kỳ; gắn `dnct` sau cùng bằng `slApDnct` (kỳ cũ → mới; `slVaoDanhBa('dnct')` chỉ ghi khách có số sổ trong file đó, kỳ mới hơn thắng).

### Danh sách thử trên máy thật (3.129) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổ TK&VV, chọn 1 tổ có khách không dư nợ | Số trên dòng tóm tắt (còn 105 · đề xuất cho ra · CCCD hết hạn) bằng số trên chip | |

**Ghi chú kỹ thuật 3.129:** `toLocHam(ma)` trả hàm lọc của chip theo mã; không dùng `TO_LOC[i]` theo vị trí.

### Danh sách thử trên máy thật (3.128) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Tổ TK&VV, chọn 1 tổ: các chip Có dư nợ · chưa TK 105 / Không dư nợ / Mới vào tổ / Ra khỏi tổ | Đếm đúng; có cột Ngày tất nợ, Ngày kết nạp, Đi đâu | |
| 2 | 📅 Biến động cả năm | Bảng T1…T9, bấm ô ra danh sách; In và Excel được | |
| 3 | In Mẫu 06 (bản In và Word) | Tên 1 dòng; Mục đích tối đa 2 dòng; CT ghi viết tắt hệ thống; dòng chấm tới cuối dòng; "Trang x/y" chữ nhỏ | |
| 4 | Xem trước bất kỳ mẫu (06, 16, 04, KH, báo cáo tổ, sao kê, tổng hợp) | Khung xem có lật trang, thu phóng, Khổ, In, PDF, Word, toàn màn hình; xem = in | |
| 5 | In từ trình duyệt (Chrome / Edge) | Không còn ngày giờ / đường dẫn ở đầu, cuối trang; lề đúng; số trang góc dưới phải từ trang 2 | |
| 6 | Xuất In nhiều tổ, in 2 mặt | Mỗi tổ bắt đầu mặt trước, không dính 2 tổ trên 1 tờ | |
| 7 | Báo cáo nhanh nhiều cột (sao kê) | Tự sang dọc gọn / ngang khi không đủ chỗ; chọn Khổ Dọc / Ngang trong khung xem | |
| 8 | iPhone: bấm In | Vẫn ra bảng chia sẻ / hộp in như trước | |
| 9 | Mở app (đã nạp Dư nợ chi tiết) → Tổ TK&VV / Tra cứu KH | Cột / dòng Số TK 105 có số (10 chữ số) | |

**Ghi chú kỹ thuật 3.128:**
- **Phần A (Tổ TK&VV):** `toMapKy(ky)` dựng bảng kh → {tổ, tên, dn, t105, nv} của 1 tháng Mẫu 31. `toBienDong(ma, Mn, Mp)` cho ra `{vao, ra}`. `TO_BD` là biến động của tháng đang xem; `TO_BDN` của cả năm (`toBDNam`, `toBDNamXuat`). `slBoXoa` xóa luôn `TO_MAP` và `TO_BD`.
- **Phần B (Mẫu 06):**
  - Khuôn Word: lưới cột `[397,1928,1020,1134,737,737,1644,737,737,2286,907,907,794,794,1117]`, `pgMar` trái 680, phải 567, tab có chấm dẫn đến 15500.
  - Thu chữ theo ô: `ktCo06Ten`, `ktCo06Md`, `ktCo06CT`.
  - `ctHT(ma)` lấy `TDN_CT[ma][0]`.
- **Phần C (bộ in chuẩn):**
  - `inChuan(html, xem)`:
    - bỏ `<script>` cũ (`skInTu`, `ktHaiMatJS`);
    - đọc khổ và lề từ `@page` đầu tiên (`trLe`);
    - gắn `TR_CSS` và `trDan` vào cuối `<body>`.
  - `trDan(C)` chạy trong trang in:
    - Đơn vị chia trang: `.kt-to` → `.trang` → `.phieu`, nếu không có thì cả body.
    - Rót từng nút vào `.tr-tg` / `.tr-nd` (cao cố định, đo `scrollHeight`).
    - Tách theo cây: `xich` gồm vỏ tổ tiên được nhân bản, `lap` là thead / colgroup cần lặp.
    - Bộ giữ: TR, `break-inside:avoid`, `kt-ho`, `kt-giu`. Nhóm dài hơn 1 trang thì buộc tách.
    - Kéo tiêu đề đi liền nội dung: H1–H6, `.bc-khung-ten`, `p.kt-b`, TR có ô `.kt-b`.
    - `coDinhCot` cố định bề rộng cột.
    - Bậc khổ cho `.trang` nằm trong `bac()`.
    - Khi xong đặt `window.TR_XONG` và `TR_SO`.
  - `inBlob` đổi HTML qua `inChuan` và chờ `TR_XONG` rồi mới in. Khung xem dùng `xemChuan(f, html)`.
  - Chrome không làm theo `break-before:right` → trang trắng 2 mặt do app tự chèn (`.tr-trang-trang`).
- **Sửa số TK 105:** `slApDnct()` gắn lại số TK từ các bảng `dnct` (kỳ cũ → mới) sau mỗi lần nạp Mẫu 31 / Sao kê KH, rồi xóa `TO_KS` để cây tổ dựng lại. `slNapDanhBa` sửa 1 lần khi có bảng `dnct` mà danh bạ chưa khách nào có `stkNguon='dnct'`.
- **Phần D (số trang Word):** `ktSectSo(sect, 'xy'|'so')` + `ktFtrSo`; footer rId11; `pgNumType start=1`.

### Danh sách thử trên máy thật (3.127) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Bấm In / Word Mẫu 06 / 16 / 04 / Kế hoạch → hộp Chọn khi in | Ô người kiểm tra / người ký ghi "Chức danh — Tên đã khai"; ô chưa khai tên bị ẩn | |

**Ghi chú kỹ thuật 3.127:** `ktInVTTen(ops, hoi, gt)` dựng nhãn từ `ktNguoi(h.t, vt)` cho các Hội trong `KT_IN_X.hoi`; dùng ở `ktInPhan` (ng1, ng2, ky).

### Danh sách thử trên máy thật (3.126) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In / Word Mẫu 16, 06, Kế hoạch | Gạch dưới tiêu ngữ và tên cơ quan mảnh hơn | |
| 2 | Tab Số liệu | Dòng "⚡ Đang giữ n tháng: …" đúng các tháng đã nạp; bấm ↻ Nạp lại → nạp lại ngầm | |

**Ghi chú kỹ thuật 3.126:** khuôn: `a:ln w="9525|9360"` (màu 000000) → 6350; `KT_IN_CSS` `.kt-gach` .5pt + `.kt-u` text-decoration-thickness .5pt; `slGiuChu`, `slNapLai`, `#sl-giu-ds` (cập nhật trong `slNapSanChip`).

### Danh sách thử trên máy thật (3.125) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Máy tính: mở app → tab Số liệu | Chip "⚡ Đang nạp sẵn x/y tháng" rồi "Đã nạp sẵn"; trong lúc nạp vẫn thao tác được | |
| 2 | Chuyển qua lại các tháng ở Tổ TK&VV / KTGS / Tổng hợp | Hiện gần như ngay, không còn "Đang mở số liệu…" lâu | |
| 3 | In Mẫu 06 / 16 / 04 ở tháng khác | Không phải chờ nạp lại | |
| 4 | Đầu tab Số liệu chọn "Tất cả" | Nạp thêm các tháng cũ; máy vẫn mượt (nếu nặng → chọn lại 12 tháng) | |
| 5 | Điện thoại | Chỉ nạp sẵn tháng mới nhất; tháng khác mở như cũ | |
| 6 | Nạp lại Mẫu 31 của 1 tháng rồi xem tháng đó | Số liệu theo file mới | |

**Ghi chú kỹ thuật 3.125:** `SL_DUNG` (lần xem cuối theo kỳ), `slDung`, `slGiuToiDa` (ĐT 2 · máy tính `D.cauHinh.slGiu` 12 / 'all'), `slThangMoi`, `slBot(O)` (bỏ theo tháng, LRU, giữ tháng mới nhất), `slBoXoa(ky)` thay mọi `delete SL_BO[ky]` (bỏ cả `TO_KS` / `TH_KS` cùng tháng), `slNapSan` (lần đầu vào tab Số liệu, sau 2,5 s, từng tháng cách 250 ms) + `slNapSanChip` (`#sl-san`). `thNap` giữ `TH_KS[ky]`.

### Danh sách thử trên máy thật (3.124) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | In / Word Mẫu 16 của 1 tổ | Mục III: "Qua kiểm tra tại Tổ và kiểm tra thực tế tổ viên, Đoàn có nhận xét như sau:" — không còn số khách | |
| 2 | In / Word Mẫu 16, 06, 04 | Dòng chấm nhỏ mịn, dài như cũ, không xuống dòng thừa | |
| 3 | Định kỳ / Sau giải ngân xuất nhiều tổ → Word, in 2 mặt | Mỗi tổ bắt đầu tờ mới (tổ lẻ trang có 1 trang trắng) | |
| 4 | Như trên nhưng 🖨 In / PDF | Mỗi tổ bắt đầu tờ mới; nếu lệch ở tổ sát mép trang → báo em | |
| 5 | Hộp Chọn khi in → bỏ tích "In 2 mặt" | Không còn trang trắng chèn thêm | |

**Ghi chú kỹ thuật 3.124:** khuôn `KT_KHUON.m16` bỏ run `{{SKH|…..}} khách hàng`, đổi " và thực tế tại " → " và kiểm tra thực tế tổ viên"; `ktHTML16` cùng câu; `f.SKH` vẫn tính (không dùng ở câu này); `tools/khuon_docx.py` T[25] sửa theo. Dòng chấm mịn: `KT_CHAM_TL`, `ktChamDai`, `ktChamMin` (Word: trong `ktDocx` và `ktHTML01`), `ktChamHTML` (bọc qua `ktHTML06/16/04/PC` → bản gốc đổi tên `…Goc`). In 2 mặt: `ktHaiMat()`, `ktSectLe` (sectPr thêm `w:type oddPage`, bỏ type cũ), `ktHaiMatJS` (script đo trong bản In do `ktGhepTo` dựng; `.kt-trang-trang`).

### Danh sách thử trên máy thật (3.123) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | 🏛 Khai báo Hội – xã → 📄 Phân công BTV của 1 Hội đủ người | Cột "Phân công" tích hết; Thông báo như cũ; chỗ ký "TM. BAN THƯỜNG VỤ / CHỦ TỊCH", **để trống tên** | |
| 2 | Bỏ tích Chủ tịch (Hội khuyết CT) | Hiện "Khuyết Chủ tịch → Đôn lên phụ trách: [Phó ▾]"; Phó đó đứng đầu "Phó Chủ tịch phụ trách", nhận đủ nhiệm vụ CT; các câu "tham mưu cho…" ghi Phó Chủ tịch phụ trách | |
| 3 | Bỏ tích hết Phó (khuyết PCT) | Chủ tịch kiêm thêm 3 nhiệm vụ riêng của Phó (nhận danh sách vay, giám sát Ban quản lý Tổ, báo rủi ro), không lặp | |
| 4 | Ô "Kiểm tra đủ nhiệm vụ" | ✓ / ⚠ đúng: nhiệm vụ CT, Phó, Ủy viên, ấp thiếu / trùng, Kế toán, Thủ quỹ, tên viết sai; còn ⚠ bấm Word → hỏi "Vẫn xuất Word" | |
| 5 | Người ký: chọn Phó Chủ tịch | Chỗ ký "PHÓ CHỦ TỊCH" + tên Phó; chọn lại "Để trống" → ghi chung | |
| 6 | Khai báo: gõ tên "nguyễn  văn a" | ⚠ khoảng trắng thừa, viết hoa → nút "Sửa theo gợi ý" → "Nguyễn Văn A" | |
| 7 | 🗓 Kế hoạch năm → "Chọn tháng" → tích T3, T5, T7 | Tổ chia đều vào 3 tháng, dưới chip có số tổ; Chọn nhanh Cuối quý / Tháng lẻ / Tháng chẵn / Bỏ hết chạy đúng | |
| 8 | 👁 Xem Kế hoạch rồi đóng | Dòng "💾 Đã lưu kế hoạch năm 2026 · ngày …"; mở máy khác (Drive) thấy cùng lịch | |
| 9 | 📋 Báo cáo tổng hợp · Mẫu 04 → chọn xã (+ hội) | Hàng "📅 Theo kế hoạch 2026": bấm T… → tích sẵn đúng tổ của tháng đó | |
| 10 | 🗑 Xóa kế hoạch | Hỏi trước; xóa xong lịch về xếp tự động 02 → 10, không bị kéo lại từ Drive | |

**Ghi chú kỹ thuật 3.123:**
- **Phân công:** `ktPCLay(k)` thêm `chon:{vt:0}` (vắng = tích), `phuTrach`, `ky` (người ký; trống = ghi chung), `tay` (đã chỉnh ấp tay). `ktPCNguoi(k, t, tatCa)` lọc người được tích; khuyết CT → Phó (`ktPCPhuTrach`) thành `loai:'pt'`, đứng đầu. `ktPCNoiDung`: người đứng đầu nhận `KT_PC_CT`; không Phó → chèn `KT_PC_PHO[3..5]` trước "nhiệm vụ phát sinh khác"; không Ủy viên → Phó đầu tiên (không có thì người đứng đầu) nhận `KT_PC_UV`; `{CT}` = "Phó Chủ tịch phụ trách" khi khuyết, `{CTc}` (câu tập huấn) luôn = Chủ tịch. `ktPCKy`, `ktPCKiem` / `ktPCKiemHTML` (ô kiểm tra), `ktPCXuat(k, cach, ok)` hỏi khi còn ⚠. Bỏ tích 1 người → trả ấp của người đó; chưa chỉnh ấp tay → chia lại đều.
- **Rà tên:** `ktTenKiem` (khoảng trắng, viết hoa, ký tự lạ, chưa dấu, 2 dấu thanh, 1 chữ), `ktTenLoiO` (+ trùng tên), `ktTenLoiDs`, `ktTenCanhHTML` / `ktTenVe` / `ktTenSua` ở thẻ Khai báo. `ktHoiKBSua` chuẩn NFC khi lưu.
- **Kế hoạch:** `D.cauHinh.ktKH[năm|xã|hội]` thêm `v:2`, `cach:'chip'`, `thang:[…]`, `snap:{mã:{ten, ap}}`, `tay`; xóa = `{xoa:1, luc}` (giữ dấu để gộp cài đặt Drive không kéo lại). `ktKHThang`, `ktKHLuu`, `ktKHMacDinh(ds, th)`, `ktKHDatThang` (hỏi khi `tay`), `ktKHDoiCach`, `ktKHTichThang`, `ktKHNhanh`, `ktKHXoa`; kế hoạch bản cũ (không `v`) coi như đã chỉnh tay. `ktKHLich().mat` = tổ trong kế hoạch không còn trong số liệu (giữ khi lưu lại). Xem / Mẫu 04 theo KH tự lưu. Báo cáo tổ: `ktBCKH`, `ktBCTheoKHHTML`, `ktBCTheoKH`.
- **Đổi hành vi đã duyệt:** chỗ ký Phân công mặc định không in tên (t121 sửa theo); đổi khoảng tháng khi đã chỉnh tay → hỏi trước (t109 truyền xác nhận).

### Danh sách thử trên máy thật (3.121) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Nạp lại Dư nợ chi tiết 30/09 | Dòng nạp hiện số món, dư nợ | |
| 2 | ② Kiểm tra T9 → Kiểm lại | Bảng đối chiếu có cột "Dư nợ CT"; mục "Mẫu 31 ↔ Dư nợ chi tiết" khớp / lệch + danh sách món | |

**Ghi chú kỹ thuật 3.121:** `dnct.chi` thêm cột số tiền; tách dòng lặp cho dnct (`L.giuHet || L.k==='dnct'`); `slTong` tính cho dnct; `slBo` giữ `B.lapDn`; `slDCTinh` cột `dnct` (bỏ qua nếu bảng chưa có `dn` — bản nạp 3.120); mục 5 `slKiemTra` chỉ so khách có món.

### Danh sách thử trên máy thật (3.120) — anh ghi Đạt / Chưa
| # | Việc thử | Kết quả mong đợi | Đạt? |
|---|---|---|---|
| 1 | Mở app bản mới | Báo đã bỏ N bản Mẫu 10; Nạp số liệu không còn dòng Mẫu 10 | |
| 2 | Nạp lại **Mẫu 31 T9** (ô T9 hiện đang là file Dư nợ chi tiết anh chép đè) | Dòng Mẫu 31 T9 là Mẫu 31 | |
| 3 | Nạp **Dư nợ chi tiết 30/09** | Tự vào dòng "Dư nợ chi tiết" T9 | |
| 4 | Tra cứu KH / Tổ TK&VV | Số TK 105 dạng 10 chữ số (vd hộ Tuyết); số dư 105 như trước | |
| 5 | Cây tổ (KTGS / Tổ TK&VV) | Điểm GD đúng theo file Dư nợ chi tiết; chip tổ xếp theo ấp | |

**Ghi chú kỹ thuật 3.120:** loại `dnct` (L.chi = cột giữ lại; L.thamChieu); `slStk` (10 chữ số), `slStkDB`, `slStkKH`; danh bạ `c.stkNguon='dnct'`, `c.stkKy`; dựng lại danh bạ: dnct xếp sau Mẫu 31 cùng kỳ; `slBoMau10` chạy sau `slChuyenMau10` ở `slNap` và `slTaiTuDrive`; danh bạ chỉ làm sạch tại chỗ (không `slDungDanhBa` — máy chưa tải bảng sẽ làm rỗng danh bạ), danh bạ trống thì bỏ qua, không sửa gì thì không đổi mốc `dbLuc`. Khách không còn trong file Dư nợ chi tiết (đã hết dư nợ) giữ số sổ đã tham chiếu ở kỳ trước nếu có; chưa từng có thì "—". t97 / t100 (ngoài bộ hồi quy chuẩn) đang dừng do quá thời gian cả trên bản chính — lỗi có sẵn, chưa xử lý.

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
