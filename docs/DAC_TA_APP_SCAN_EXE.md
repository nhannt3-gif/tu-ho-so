# ĐẶC TẢ BÀN GIAO — App "Tủ hồ sơ · Scan" chạy dạng .exe (Windows)

**Người đặt hàng:** anh Nhân — CBTD NHCSXH PGD Gò Dầu
**Lập từ:** Tủ hồ sơ bản **3.49b** (28/09/2026), kho `nhannt3-gif/tu-ho-so`, file `index.html`
**Mục đích:** tách phần **Scan hồ sơ + Chữ ký · CCCD** thành một app nhỏ chạy **offline**, **lưu trên máy**, cài bằng **file .exe** trên Windows. Tài liệu này để anh (hoặc một AI / người khác) làm riêng dự án đó, không cần đọc lại lịch sử trao đổi.

> **Cách dùng tài liệu:** mở chat / phiên mới, đưa kèm tài liệu này và file `index.html` bản 3.49b, rồi nói: *"Làm theo DAC_TA_APP_SCAN_EXE.md, bắt đầu Đợt 1 mục 9. Lập kế hoạch trước, chờ tôi duyệt rồi mới code."*

---

## 0. Quy tắc làm việc (giữ như dự án chính)

- Lắng nghe → phân tích → đề xuất → **anh duyệt** → code → chạy thử → kiểm tra → bàn giao.
- **Lập kế hoạch trước, chỉ code khi anh nói "code".**
- Không làm thêm ngoài phạm vi đã thống nhất. Muốn thay đổi hoặc bỏ chức năng thì phải hỏi anh.
- Thiếu thông tin thì **hỏi, không đoán**. Có rủi ro thì cảnh báo và đưa phương án an toàn.
- **Không đưa ảnh CCCD thật, tên khách, tên tổ trưởng vào kho mã nguồn** (kho có thể công khai). Ảnh mẫu dùng để thử chỉ để ngoài kho.
- Mỗi bản có: số bản, CHANGELOG, tài liệu bàn giao, danh sách thử trên máy thật.
- **App Tủ hồ sơ (web) đang dùng thật: không được làm hỏng.** Dự án exe là kho / thư mục riêng.

---

## 1. Phạm vi

### 1.1 Có trong app exe
| Nhóm | Chức năng |
|---|---|
| Quét **Thẻ** (CCCD 2 mặt) | Camera tự động / thủ công, webcam hoặc chọn ảnh có sẵn · tự tìm khung, nắn thẳng · ghép **4 người / A4**, có đường cắt |
| Quét **Tài liệu** | Nhiều trang → 1 PDF · ảnh ngang ra trang ngang · chèn trang PDF có sẵn |
| **Chữ ký** | Chụp → kéo khung cắt → nền trắng, nét đậm → JPG ~10–60 KB |
| **CCCD mặt trước** | Chụp → tự tìm khung thẻ → cắt vừa → JPG **dưới 200 KB** (3 mức Nhỏ / Vừa / Nét) |
| Luồng 3 bước | ① Chỉnh → ② Xem → ③ Lưu & gửi (xem mục 3) |
| Lưu / gửi | **Lưu thẳng vào thư mục cố định** · **📋 Copy đúng file** (Ctrl+V vào Zalo) · 🖨 In · 📂 Mở thư mục |
| Danh sách | Tìm theo tên, xem lại, đổi tên, in lại, copy lại, **xóa nhiều file** |
| OCR (tùy chọn) | Đọc chữ trên tài liệu quét để gợi ý tên — chỉ khi anh bấm |

### 1.2 KHÔNG có (giữ ở app Tủ hồ sơ web)
Google Drive, chỉ mục, đồng bộ 2 máy, cầu nối `.reg`, văn bản, dữ liệu tháng, ma trận, biểu mẫu, lịch.

### 1.3 Nối với Tủ hồ sơ (tùy chọn, Đợt 3)
App exe chỉ cần **lưu file vào thư mục Google Drive trên máy** (vd `G:\My Drive\Tủ hồ sơ\Chữ ký - CCCD\2026-09\`). Google Drive for Desktop tự đưa lên mạng; app web "Quét tủ" là thấy. **Không** gọi API Drive trong exe.

---

## 2. Kiến trúc đề xuất (đã phân tích với anh)

### Cách B — Python bọc giao diện web (**khuyên dùng**)
```
TuHoSoScan.exe  (PyInstaller, 1 file)
 ├─ Python: pywebview → cửa sổ Edge WebView2 (có sẵn trên Windows 10/11)
 │    └─ nạp ui/index.html (HTML/JS lấy từ Tủ hồ sơ 3.49b, đã lược phần Drive)
 └─ Python API (js_api) — làm những việc trình duyệt không làm được:
      luu_file, copy_file, mo_thu_muc, mo_file, chon_thu_muc, doc_cau_hinh, ghi_cau_hinh, doc_ds, ghi_ds
```
- **Ưu:**
  - dùng lại code xử lý ảnh / PDF đã chạy thật;
  - exe khoảng 15–30 MB;
  - cùng giao diện với bản web trên iPhone.
- Thư viện JS phải **đóng kèm trong exe** (không tải CDN) để chạy offline: `pdf-lib 1.17.1`, `pdf.js 3.11.174` (xem trước PDF), `tesseract.js 5.1.1` + `vie.traineddata` (tùy chọn, ~10 MB).

### Cách A — viết lại hẳn bằng Python (không khuyên)
- Thư viện: PySide6 + OpenCV + Pillow + pikepdf/img2pdf + pytesseract.
- Nhược điểm:
  - phải viết lại khoảng 4.000–5.000 dòng;
  - exe 100–200 MB;
  - iPhone không dùng được, phải giữ 2 bộ code khác nhau.
- Chỉ chọn khi anh chốt bỏ hẳn giao diện web.

---

## 3. Luồng sử dụng (giữ đúng như 3.49b)

1. **Mở app → Quét** (chọn Thẻ | Tài liệu) hoặc **✍ Chữ ký / 🪪 CCCD**.
2. **Camera tự động:**
   - dò khung khoảng 5 lần/giây trên khung hình thu nhỏ 640 px;
   - khung xanh bám theo, giữ yên khoảng 1 giây thì tự chụp;
   - chụp xong chờ cảnh thay đổi (lật mặt, đổi tờ) mới chụp tiếp.
   - **Thủ công:** nút tròn hoặc phím cách. Có ô chọn camera khi máy có nhiều webcam.
3. **① Chỉnh:**
   - kéo 4 góc, có kính lúp; xoay, lật, lọc (gốc / trắng đen / tăng nét);
   - chạm 2 ảnh để đổi chỗ, ▲▼ dời người, kéo thả (máy tính);
   - Thẻ: ghép theo cặp trước | sau.
4. **② Xem:** PDF thật dựng sẵn; trang 1 hiện ngay, trang sau vẽ khi cuộn tới. Chưa ưng thì quay lại ①.
5. **③ Lưu & gửi:** bấm Tiếp là **lưu ngay** (an toàn), rồi mới chọn Copy / In / Mở thư mục / Đổi tên.
   - Tùy chọn **"Tự lưu vào thư mục mỗi lần lưu"**.
6. **Danh sách:** mới nhất trên cùng, nhóm theo tháng, tìm theo tên.
   - Chế độ **🗑 Xóa file**: tích nhiều dòng, "Chọn tất cả đang lọc", "Thêm trước ngày…".
   - Xóa: bỏ vào **Thùng rác của Windows** (lấy lại được), không xóa vĩnh viễn.

---

## 4. Quy tắc nghiệp vụ & thông số (lấy đúng từ code 3.49b)

### 4.1 Tên file
| Loại | Mẫu tên | Hàm gốc |
|---|---|---|
| Chữ ký | `yyyy-mm-dd Ten Khong Dau CK.jpg` | `tenFileKA` |
| CCCD mặt trước | `yyyy-mm-dd Ten Khong Dau CCCD.jpg` | `tenFileKA` |
| Thẻ đã khai | `CCCD_<ten>_To-<to>_<ap>.pdf` | `tenTheCCCD` |
| Tài liệu đã khai | `HS_<ten>_To-<to>_<ap>.pdf` | `tenScanDrive` |
| Lưu tạm (chưa đặt tên) | `Scan dd-mm-yyyy HHhMMmSSs.pdf`, trùng thì thêm (2), (3)… | `tenLuuTam` |

- Anh **chỉ gõ tên khách**; app tự thêm ngày ở đầu, CK/CCCD ở cuối.
- Bỏ dấu tiếng Việt, đổi `đ`→`d`, ký tự lạ thành khoảng trắng.
- Trùng tên thì thêm ` (2)`, ` (3)`…
- App nhớ tên khách vừa gõ trong 30 phút cho lần chụp kế tiếp (`tenKhachKA`).

### 4.2 Thư mục lưu (mặc định, anh đổi được trong Cài đặt)
```
<Thư mục gốc>\Chữ ký - CCCD\yyyy-mm\      ← chữ ký, CCCD mặt trước (mỗi tháng 1 thư mục)
<Thư mục gốc>\Hồ sơ scan\Chưa khai\yyyy-mm\ ← bản lưu tạm
<Thư mục gốc>\CCCD\<xã>\<điểm>\<ấp>\Tổ <n>\   ← thẻ đã khai (nếu dùng khai địa bàn)
<Thư mục gốc>\Hồ sơ scan\<xã>\<điểm>\<ấp>\Tổ <n>\
```
- `<Thư mục gốc>` mặc định `D:\Nhap may` hoặc `G:\My Drive\Tủ hồ sơ` (hỏi anh lần đầu chạy).
- **Câu hỏi còn mở:** app exe có cần khai xã / điểm / ấp / tổ không, hay chỉ tên khách? (mục 10)

### 4.3 Nén Chữ ký · CCCD (`dungKA`)
- **Chữ ký:**
  - rộng tối đa 700 px;
  - lấy mức sáng nền (phân vị 40 % sáng nhất) và mức mực (2 % tối nhất), kéo giãn;
  - điểm có t > 0,72 thành trắng; phần còn lại `255·(t/0,72)^1,8·0,85` (nét đậm);
  - JPG bắt đầu q = 0,85, mục tiêu ≤ 60 KB.
- **CCCD:** 3 mức `KA_MUC` = Nhỏ 560 px / 50 KB · **Vừa 760 px / 90 KB** (mặc định) · Nét 1000 px / 190 KB. JPG bắt đầu q = 0,82.
- **Vòng nén:**
  - hạ q mỗi lần 0,1 tới 0,45;
  - vẫn > 195 KB thì thu ảnh còn 80 % rồi thử lại từ q = 0,7.
  - **Bắt buộc < 200 KB.**
- **Khung chữ ký đoán sẵn** (`khungKy`): vùng nét tối quanh tâm ảnh, bỏ 5 % mép, nới lề 8 %.
- **Khung CCCD:** dùng đúng bộ tìm khung thẻ của chế độ Thẻ (`xuLyTuAnh`, `timKhungThe`). Không tìm được thì mở ảnh gốc, khung mặc định 80 % bề ngang, tỉ lệ 1,585.

### 4.4 PDF Thẻ — 4 người / A4 (`dungPDFThe`)
- A4 dọc 210 × 297 mm.
- Thẻ thật 85,6 × 54 mm. Mặc định in thẻ rộng **92 mm**, khe giữa 2 mặt **6 mm** (`IN_THE_MD = {rong:92, khe:6}`); anh chỉnh được ở Cài đặt › Scan (`cauHinhInThe`: khe 2–15 mm).
- Mỗi người một hàng: **mặt trước | mặt sau** cạnh nhau, căn giữa ngang.
- **Khe giữa 2 người 12 mm**, cả khối căn giữa dọc. Lề trên dưới tối thiểu 14 mm; thiếu chỗ thì thu nhỏ thẻ.
- **Đường cắt:**
  - chỉ đường **ngang, đứt quãng** (nét 0,4 pt, dash [3; 2,5], màu xám 60 %) nằm giữa khe 2 người;
  - chạy từ x = 12,5 mm tới mép phải − 5 mm;
  - **hình cái kéo vẽ bằng nét** ở x = 4 mm (2 vòng tròn bán kính 1,1 mm + 2 lưỡi chéo);
  - **không** in chữ, không góc ke, không đường dọc, không đường ngoài cùng.
- Ảnh trong PDF thu về cạnh dài 1000 px, JPG q = 0,85 (`thuChoPDF`). Tùy chọn "Nét cao" giữ nguyên ảnh.

### 4.5 PDF Tài liệu (`dungPDFTaiLieu`)
- Mỗi ảnh một trang A4, lề 8 mm, căn giữa. Ảnh ngang thì trang ngang.
- Trang PDF gốc được chép nguyên trang, xoay theo chỉnh.
- Ảnh thu về cạnh dài 1800 px, JPG q = 0,85.

### 4.6 Xử lý ảnh tự động (`xuLyTuAnh`, `timKhungThe`, `timKhungGiay`)
- Trọng số dò khung thẻ `TS_THE = {tp:0.85, v:0.35, tl:6, lech:0.06, sl:20}`. Ngưỡng diện tích khung ≥ 5 % ảnh.
- Các bước:
  - tìm tứ giác;
  - nắn phối cảnh về tỉ lệ thẻ 1,585 (hoặc khổ giấy);
  - tự xoay / lật;
  - đoán mặt trước / mặt sau.
- **Giới hạn đã biết (backlog J):** CCCD nhạt trên nền kính bóng dò lệch 71–91 %, phải kéo góc tay.

### 4.7 Dữ liệu danh sách (thay cho `D.scan`, `D.kyAnh` ở bản web)
Lưu file `danhsach.json` cạnh thư mục gốc (hoặc `%APPDATA%\TuHoSoScan\`):
```json
{ "ban": 1,
  "scan":  [{"id":"...", "che":"the|tailieu", "ten":"", "ngay":"yyyy-mm-dd", "taoLuc":"ISO", "suaLuc":"ISO",
             "chuaKhai":true, "xa":"", "diem":"", "ap":"", "to":"", "tag":[], "file":"đường dẫn tương đối .pdf",
             "anh":["anh/<id>_matTruoc.jpg", "..."], "trang":["anh/<id>_1.jpg", "pdf:<nguon>:<so>:<xoay>"]}],
  "kyAnh": [{"id":"ka...", "loai":"ky|anh", "ten":"2026-09-28 Nguyen Van A CK.jpg", "khach":"Nguyen Van A",
             "ngay":"yyyy-mm-dd", "luc":"ISO", "co":12345, "file":"Chữ ký - CCCD/2026-09/...jpg"}] }
```
- Ảnh gốc từng mặt / trang lưu thư mục `anh\` để **dựng lại PDF** khi đổi thứ tự hoặc in lại. Ở bản web phần này nằm trong IndexedDB, khóa `hs_<id>_matTruoc`, `hs_<id>_matSau`, `hs_<trang>`.
- Ghi file theo kiểu "ghi ra file tạm rồi đổi tên" để không hỏng khi mất điện.

---

## 5. Python API cho giao diện (Cách B)

| Hàm (`window.pywebview.api.*`) | Việc | Ghi chú |
|---|---|---|
| `luu_file(duong_tuong_doi, base64)` | Ghi file vào thư mục gốc, tự tạo thư mục con, chống trùng tên | Chặn `..`, ký tự lạ, chỉ nhận `.pdf .jpg .jpeg .png .json` |
| `copy_file(duong)` | Chép **file** vào clipboard (CF_HDROP) → Ctrl+V vào Zalo, Explorer, hệ thống | `pywin32` hoặc `ctypes` |
| `mo_thu_muc(duong)` | `explorer /select,"<file>"` | |
| `mo_file(duong)` | `os.startfile` | PDF mở bằng trình đọc mặc định |
| `in_file(duong)` | `os.startfile(p, "print")` hoặc mở PDF để in | In 100 %, không co giãn |
| `chon_thu_muc()` | Hộp chọn thư mục của Windows | Lưu vào `cauhinh.json` |
| `doc_cau_hinh()` / `ghi_cau_hinh(obj)` | `%APPDATA%\TuHoSoScan\cauhinh.json` | Thư mục gốc, mức nén, tự lưu, chia tháng, camera đã chọn |
| `doc_ds()` / `ghi_ds(obj)` | `danhsach.json` | |
| `xoa_vao_thung_rac(duong)` | `send2trash` | Không xóa vĩnh viễn |
| `phien_ban()` | Trả số bản | Hiện ở Cài đặt |

Trong code JS, thay các chỗ gọi trình duyệt:

| Chỗ gọi trong bản web | Thay bằng |
|---|---|
| `showDirectoryPicker` / `luuNhanh` | `luu_file` |
| `chepAnhKA` / `goiCauNoi('chep')` | `copy_file` |
| `goiCauNoi('thumuc')` | `mo_thu_muc` |
| `luuAnhHS` / `docAnhHS` (IndexedDB) | ghi / đọc file trong `anh\` |
| `goiDrive`, `dayHoSoLenDrive`, `dongBoScan`… | bỏ |

---

## 6. Bản đồ code nguồn cần lấy từ `index.html` 3.49b

Tìm theo tên hàm (số dòng thay đổi theo bản):

| Nhóm | Hàm / biến chính |
|---|---|
| Camera | `CAM`, `moCamera`, `batCam`, `vongCam` (200 ms/lần), `khungCam`, `camTuDong`, `nutKieuCam`, `doiCamMay`, `dongCam` |
| Tìm khung, nắn | `timKhungThe`, `timKhungGiay`, `xuLyTuAnh`, `TS_THE`, `THE_MM`, `anhTuBlob`, `thuGoc`, `canvasRaBlob` |
| Hàng chờ ① ② ③ | `HANG`, `nhanVaoScan`, `moHangCho`, `xemTruocHang` (`XH`), `tiepHang`, `chamHang`, `doiHaiHang`, `dichNguoi`, `buocHTML`, `moXemPDF` (`XP`), `veTrangXP`, `tenFileXP`, `xoaXP`, `inXP` |
| Dựng PDF | `dungTrangThe`, `dungPDFThe`, `dungTaiLieu`, `dungPDFTaiLieu`, `thuChoPDF`, `PDF_THU`, `cauHinhInThe`, `IN_THE_MD`, `laTrangPDF` / `tachTrangPDF` / `ghepTrangPDF`, `moPDFNguon` |
| Khai | `themKhach`, `scanTaiLieu`, `khaiHangLoat`, `tenLuuTam`, `tenTheCCCD`, `duongTheCCCD`, `duongScan`, `tenScanDrive` |
| Chữ ký · CCCD | `KA`, `KA_MUC`, `moKyAnh`, `chupKA`, `nhanKA`, `datNguonKA`, `khungKy`, `veCatKA`, `xemKA`, `dungKA`, `luuKA`, `kaXong`, `tenFileKA`, `duongKA`, `tenKhachKA` |
| Lưu / copy (3.49) | `luuNhanh`, `lnKA`, `lnXP`, `copyKA`, `copyXP`, `lnCaiHTML` — thay bằng Python API |
| Xóa nhiều (3.49b) | `BOT`, `batBot`, `thanhBot`, `capNhatBot`, `botXacNhan`, `thucHienBot` |
| OCR | `napOCR`, `docDongOCR`, `canOCR` (tesseract.js nạp lười) |
| Tiện ích | `boDau`, `slug`, `sachTen`, `ngayISO`, `ngayVN`, `hai`, `idMoi`, `bao`, `baoLoi`, `hoi`, `moHop`, `dongHop`, `batChay` / `dangLamChu` / `tienChay` / `tatChay` |

---

## 7. Đóng gói & phát hành (Release)

- **Công cụ:** Python 3.11+, `pywebview`, `pyinstaller`, `pywin32`, `send2trash`.
- **Lệnh dựng:** `pyinstaller --onefile --windowed --name TuHoSoScan --add-data "ui;ui" --icon ui/icon.ico app.py`
- **Tự động bằng GitHub Actions** (`.github/workflows/release.yml`): khi đẩy tag `v*` thì chạy trên `windows-latest`:
  1. cài Python và thư viện;
  2. chạy kiểm thử;
  3. dựng exe;
  4. đưa `TuHoSoScan-<bản>.exe` lên **Releases** kèm ghi chú thay đổi.
- **WebView2:** Windows 10/11 thường có sẵn. Máy thiếu thì app báo và dẫn tới bộ cài của Microsoft.
- **Cập nhật:** app kiểm tra bản mới trên Releases khi có mạng (tùy chọn, chỉ báo — không tự tải).

---

## 8. Rủi ro — phải báo anh trước khi làm

1. **Máy cơ quan:** exe lạ có thể bị chính sách tin học NHCSXH chặn. Máy chứa ảnh CCCD khách hàng → **hỏi bộ phận tin học trước**.
2. **Cảnh báo "không rõ nhà phát hành"** (chưa có chữ ký số, khoảng vài triệu đồng/năm). Người dùng bấm "Thêm thông tin → Vẫn chạy".
3. **Phần mềm diệt virus đôi khi báo nhầm** exe PyInstaller → có thể dùng `--onedir` thay `--onefile`, hoặc xin ký số.
4. **Webcam trong WebView2:** cần kiểm việc hỏi quyền camera. pywebview có thể cần cấu hình cho phép sẵn.
5. **Dữ liệu cá nhân:** ảnh CCCD nằm trên ổ máy. Khuyên để trong thư mục có quyền hạn chế, không để ở Desktop hay thư mục chia sẻ.
6. **Hai bản code** (web và exe) lệch dần theo thời gian → Đợt 4: gom phần JS dùng chung thành một thư mục chung.

---

## 9. Lộ trình đề xuất

| Đợt | Việc | Xong khi |
|---|---|---|
| **1** | Tách `ui/index.html` từ 3.49b: giữ mục 1.1, bỏ Drive / chỉ mục / cầu nối, thư viện đóng kèm; chạy được trong trình duyệt **không mạng** | Quét Thẻ, Tài liệu, Chữ ký, CCCD ra đúng PDF/JPG như bản web |
| **2** | `app.py` pywebview + Python API mục 5; lưu thẳng thư mục, Copy đúng file, danh sách `danhsach.json` | Chạy `python app.py` trên Windows đủ luồng mục 3 |
| **3** | PyInstaller + GitHub Actions → Release exe; tùy chọn thư mục gốc là ổ G để Tủ hồ sơ tự thấy | Anh tải exe từ Releases, cài chạy trên máy thật |
| 4 (tùy chọn) | Gom code JS dùng chung giữa bản web và exe | Sửa lỗi xử lý ảnh chỉ sửa 1 nơi |

---

## 10. Câu hỏi còn mở — anh chốt trước Đợt 1

1. Cách **B** (Python bọc giao diện web) hay **A** (viết lại hẳn)? — khuyên **B**.
2. Có cần **khai xã / điểm / ấp / tổ** trong app exe, hay chỉ tên khách?
3. Thư mục gốc mặc định: `D:\Nhap may\…` hay `G:\My Drive\Tủ hồ sơ\…`?
4. Có cần **OCR** trong exe không (thêm khoảng 10 MB)?
5. Đã hỏi tin học cơ quan về chạy exe chưa?

---

## 11. Kiểm thử & nghiệm thu

- **Phép thử tự động:**
  - dùng lại ý các phép thử của bản web (`t28`–`t49` trong thư mục nháp của dự án chính: quét thẻ 2 người, tài liệu nhiều trang, cắt CCCD dưới 200 KB, nén chữ ký, PDF 4 người/A4 có đường cắt, xóa nhiều file);
  - dùng **ảnh mẫu không phải của khách thật**.
- **Python:** `pytest` cho `luu_file` (chặn `..`, trùng tên), `copy_file`, đọc/ghi `danhsach.json`, xóa vào Thùng rác.
- **Danh sách thử trên máy thật (anh ghi Đạt / Chưa):**
  1. Cài exe, mở không có mạng.
  2. Webcam Tự động: 2 người CCCD → ① đổi chỗ → ② Xem → ③ lưu.
  3. PDF in 100 %: đường cắt nằm giữa 2 người, có hình cái kéo, thẻ đều.
  4. Chữ ký: kéo khung → file < 60 KB, nền trắng.
  5. CCCD mặt trước mức Vừa: file < 200 KB, đọc rõ số.
  6. 📋 Copy → Ctrl+V vào Zalo PC và vào phần mềm nhập hồ sơ: đúng file JPG, đúng dung lượng.
  7. Tự lưu vào thư mục tháng; 📂 mở đúng thư mục.
  8. Xóa nhiều file → file nằm trong Thùng rác Windows, lấy lại được.
  9. Thư mục gốc là ổ G → mở app Tủ hồ sơ web, Quét tủ thấy file.
