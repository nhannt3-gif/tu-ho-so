# Sổ cấu hình `D.cauHinh` (tự sinh — `python3 tools/so_cau_hinh.py`, đừng sửa tay)

> Mỗi khóa: **chủ** = file khai đầu tiên theo thứ tự nạp · số chỗ dùng · các file dùng · mô tả (ghi ở `tests/cau_hinh.json`). Luật: `docs/QUY_CHUAN_KIEN_TRUC.md` mục 13 (08/11/2026).
> Khóa động (`D.cauHinh[k]`) không quét được. Khóa có trong sổ mà code không còn dùng → cột "dùng" = 0 (xem có bỏ được không — dữ liệu cũ vẫn phải đọc được).

**176 khóa** trong code · 176 khóa trong sổ.

| Khóa | Chủ | Dùng | File | Mô tả |
|---|---|---|---|---|
| `anBangDC` | 04c-van-ban-thang.js | 3 | 04c-van-ban-thang.js |  |
| `anLocNhanh` | 11-khung-tab.js | 2 | 11-khung-tab.js |  |
| `anPV` | 10-danh-sach.js | 6 | 10-danh-sach.js · 20-khoi-dong.js |  |
| `anPVTab` | 10-danh-sach.js | 5 | 10-danh-sach.js · 20-khoi-dong.js |  |
| `apiKey` | 06c-drive.js | 2 | 06c-drive.js · 10-danh-sach.js |  |
| `bangTab` | 11-khung-tab.js | 7 | 11-khung-tab.js |  |
| `bblvHaiMat` | mau/0hsn.js | 2 | mau/0hsn.js | 3.480: BBLV công tắc riêng |
| `bcToi` | 63-bao-cao-toi.js | 4 | 63-bao-cao-toi.js |  |
| `boMau` | 09-bieu-mau.js | 3 | 09-bieu-mau.js |  |
| `boThang` | 06a-dong-bo-cai-dat.js | 3 | 06a-dong-bo-cai-dat.js · 06c-drive.js | 3.144: sau khi kéo chỉ mục — bỏ dữ liệu tab Tháng |
| `camGiu` | 12c-scan-camera-drive.js | 2 | 12c-scan-camera-drive.js |  |
| `camId` | 12c-scan-camera-drive.js | 3 | 12c-scan-camera-drive.js |  |
| `camTuDong` | 12c-scan-camera-drive.js | 4 | 12c-scan-camera-drive.js |  |
| `capThang` | 04c-van-ban-thang.js | 2 | 04c-van-ban-thang.js |  |
| `cayMo` | 04c-van-ban-thang.js | 4 | 04c-van-ban-thang.js |  |
| `ccNho` | 28-tv-tk.js | 6 | 28-tv-tk.js | ---------- ⑤ Giấy lĩnh: tổ trưởng (Mã CIF TT) → TK 104 · CCCD anh gõ tay nhớ theo mã KH (D.cauHinh.ccNho, đồng… |
| `chBam` | 17-dong-bo-cai-dat.js | 7 | 17-dong-bo-cai-dat.js · 36-dong-bo-khoi.js |  |
| `cheCau` | 04b3-hom-nay-lich-viec.js | 1 | 04b3-hom-nay-lich-viec.js | ngay / moi / bam / tat |
| `cheChay` | 04b-hom-nay.js | 3 | 04b-hom-nay.js · 04b3-hom-nay-lich-viec.js · 06a-dong-bo-cai-dat.js |  |
| `chFileId` | 17-dong-bo-cai-dat.js | 3 | 17-dong-bo-cai-dat.js | 3.140.4: nhớ đúng file đã đồng bộ — khác file (vd thư mục khác) thì luôn lấy về gộp trước, không ghi đè |
| `chGhiLuc` | 17-dong-bo-cai-dat.js | 2 | 17-dong-bo-cai-dat.js · 59-suc-khoe.js |  |
| `chiMucDriveTG` | 07-cccd.js | 6 | 07-cccd.js · 17-dong-bo-cai-dat.js · 59-suc-khoe.js |  |
| `chiMucThoi` | 07-cccd.js | 8 | 07-cccd.js · 10-danh-sach.js · 17-dong-bo-cai-dat.js · 36-dong-bo-khoi.js |  |
| `chKeoLuc` | 17-dong-bo-cai-dat.js | 4 | 17-dong-bo-cai-dat.js | 3.140.4: nhớ đúng file đã đồng bộ — khác file (vd thư mục khác) thì luôn lấy về gộp trước, không ghi đè |
| `chKhoi` | 36-dong-bo-khoi.js | 1 | 36-dong-bo-khoi.js |  |
| `chuongTrinh` | 06-hop-thoai.js | 13 | 06-hop-thoai.js · 09-bieu-mau.js · 10-danh-sach.js · 11-khung-tab.js · 15-ai-chuan-hoa.js · 18-cai-dat.js |  |
| `clientId` | 06c-drive.js | 1 | 06c-drive.js |  |
| `coChu` | 06-hop-thoai.js | 2 | 06-hop-thoai.js · 20-khoi-dong.js |  |
| `ctNCHXAPT` | 10-danh-sach.js | 2 | 10-danh-sach.js |  |
| `ctTen` | 06-hop-thoai.js | 10 | 06-hop-thoai.js · 10-danh-sach.js · 19-danh-muc.js |  |
| `daXemMoi` | 06-hop-thoai.js | 3 | 06-hop-thoai.js · 20-khoi-dong.js |  |
| `db5p` | 12c-scan-camera-drive.js | 1 | 12c-scan-camera-drive.js |  |
| `dbGhi` | 82-dia-ban-so-lieu.js | 3 | 82-dia-ban-so-lieu.js |  |
| `dbMoApp` | 06c-drive.js | 1 | 06c-drive.js | 3.46: mở app → đẩy bản còn chờ |
| `dbRoiApp` | 12c-scan-camera-drive.js | 1 | 12c-scan-camera-drive.js |  |
| `dbSauLuu` | 12-scan.js | 5 | 12-scan.js · 12b-scan-dien-thoai.js · 12d-scan-ocr-cau-noi.js · 41-scan-sap-xep.js · 44-quet-cccd-form.js | 3.46: lưu tạm xong đưa lên Drive liền (có mạng) |
| `demDung` | 06-hop-thoai.js | 3 | 06-hop-thoai.js |  |
| `diaBan` | 04b-hom-nay.js | 41 | 04b-hom-nay.js · 04b3-hom-nay-lich-viec.js · 04c-van-ban-thang.js · 04d-bo-ho-so.js · 08-dia-ban.js · 11-khung-tab.js …+6 | số liệu hệ thống trước, danh mục Cài đặt sau (QT-C-10) |
| `diaBanCu` | 82-dia-ban-so-lieu.js | 5 | 82-dia-ban-so-lieu.js |  |
| `dkChon` | 62-dang-ky.js | 6 | 62-dang-ky.js · 63-bao-cao-toi.js | đổi khai báo → nhóm theo lấy lại mặc định mới |
| `dmTo` | 26-giao-dich-xa.js | 1 | 26-giao-dich-xa.js |  |
| `dongGon` | 10-danh-sach.js | 3 | 10-danh-sach.js · 11-khung-tab.js |  |
| `donvi` | 04c-van-ban-thang.js | 6 | 04c-van-ban-thang.js · 18-cai-dat.js · 20-khoi-dong.js · 22b-ktgs.js · 22d-ktgs-04.js · 22e-ktgs-kh.js | 3.39: đếm đủ 5 tab |
| `gbSoNgay` | 04c-van-ban-thang.js | 1 | 04c-van-ban-thang.js |  |
| `gbTuKhoa` | 04c-van-ban-thang.js | 1 | 04c-van-ban-thang.js |  |
| `gdx` | 26-giao-dich-xa.js | 5 | 26-giao-dich-xa.js · 26c-gdx-to.js |  |
| `gdxTK` | 26-giao-dich-xa.js | 2 | 26-giao-dich-xa.js |  |
| `giaoDien` | 06-hop-thoai.js | 6 | 06-hop-thoai.js · 23-dieu-huong.js |  |
| `gocMay` | 10-danh-sach.js | 1 | 10-danh-sach.js |  |
| `gxBat` | 38-goi-xem.js | 4 | 38-goi-xem.js | sau khi nạp Mẫu 31: chờ nạp xong cả lô |
| `gxCho` | 38-goi-xem.js | 4 | 38-goi-xem.js | sau khi nạp Mẫu 31: chờ nạp xong cả lô |
| `gxKy` | 38-goi-xem.js | 1 | 38-goi-xem.js |  |
| `gxLuc` | 38-goi-xem.js | 1 | 38-goi-xem.js |  |
| `gxSo` | 38-goi-xem.js | 1 | 38-goi-xem.js |  |
| `hoiDoanThe` | 11-khung-tab.js | 1 | 11-khung-tab.js |  |
| `hoMoi` | 25c-ho-so-giao-dien.js | 2 | 25c-ho-so-giao-dien.js · 33-so-ho-them.js |  |
| `hsApCuoi` | 08-dia-ban.js | 6 | 08-dia-ban.js · 12-scan.js · 12d-scan-ocr-cau-noi.js |  |
| `hsDiemCuoi` | 08-dia-ban.js | 3 | 08-dia-ban.js · 12-scan.js |  |
| `hsDS` | 02-nen.js | 2 | 02-nen.js · 07-cccd.js |  |
| `hsKhoa` | 07-cccd.js | 1 | 07-cccd.js |  |
| `hsoBo` | 25b-ho-so-vay.js | 1 | 25b-ho-so-vay.js | ---------- 3.171 (anh chốt 11/10): BỘ HỒ SƠ VAY — lưu tạm (D.cauHinh.hsoBo, đồng bộ Drive), in thành bộ gửi tổ… |
| `hsoKB` | 25-ho-so.js | 4 | 25-ho-so.js · 30-khai-bao.js |  |
| `hsoO` | 25-ho-so.js | 3 | 25-ho-so.js | lựa chọn nhớ cho lần sau (mức tiết kiệm, vai trò Hội…) |
| `hsoTK` | 25-ho-so.js | 2 | 25-ho-so.js | 3.211: mở tab Hồ sơ vay vào 👪 Hộ vay (Bộ HS đã ẩn ở 3.209) |
| `hsToCuoi` | 08-dia-ban.js | 6 | 08-dia-ban.js · 12-scan.js · 12d-scan-ocr-cau-noi.js |  |
| `hsTuDrive` | 08-dia-ban.js | 4 | 08-dia-ban.js · 12-scan.js · 12d-scan-ocr-cau-noi.js · 18-cai-dat.js | 3.33: tài liệu cũng tự lên Drive |
| `hsXaCuoi` | 08-dia-ban.js | 6 | 08-dia-ban.js · 12-scan.js · 12d-scan-ocr-cau-noi.js |  |
| `inThe` | 06a-dong-bo-cai-dat.js | 3 | 06a-dong-bo-cai-dat.js · 19-danh-muc.js |  |
| `kaMuc` | 12b-scan-dien-thoai.js | 2 | 12b-scan-dien-thoai.js |  |
| `kaTM` | 12b-scan-dien-thoai.js | 7 | 12b-scan-dien-thoai.js |  |
| `kdBoCu` | 36-dong-bo-khoi.js | 6 | 36-dong-bo-khoi.js |  |
| `khoiMo` | 04b3-hom-nay-lich-viec.js | 4 | 04b3-hom-nay-lich-viec.js |  |
| `kieuTen` | 03-doc-pdf.js | 5 | 03-doc-pdf.js · 06-hop-thoai.js |  |
| `kieuTenThang` | 03-doc-pdf.js | 1 | 03-doc-pdf.js |  |
| `ktApThu` | 22e-ktgs-kh.js | 5 | 22e-ktgs-kh.js |  |
| `ktBang16` | 22b-ktgs.js | 3 | 22b-ktgs.js | 3.111: nhớ lựa chọn Bảng II Mẫu 16 |
| `ktChuan` | 22d-ktgs-04.js | 10 | 22d-ktgs-04.js · 79-ktgs-khoa.js |  |
| `ktgs` | 22b-ktgs.js | 2 | 22b-ktgs.js |  |
| `ktHaiMat` | 22b-ktgs.js | 3 | 22b-ktgs.js · 22c-ktgs-m06.js · mau/0hsn.js | 3.124 |
| `ktHdt5` | 22d-ktgs-04.js | 2 | 22d-ktgs-04.js |  |
| `ktHdtDoi` | 22d-ktgs-04.js | 2 | 22d-ktgs-04.js |  |
| `ktHoiKB` | 22d-ktgs-04.js | 8 | 22d-ktgs-04.js · 30-khai-bao.js | 3.158: đúng chữ đã khai riêng cho Hội – xã |
| `ktIn` | 22b-ktgs.js | 14 | 22b-ktgs.js · 22d-ktgs-04.js · 56-ktgs-bo.js · 56b-ktgs-727.js | khai báo 03/BB-CX: cán bộ NH (cb1, cv1, cb2, cv2) — đồng bộ Drive cùng ktIn |
| `ktKBKhoa` | 79-ktgs-khoa.js | 3 | 79-ktgs-khoa.js |  |
| `ktKBLuu` | 22b-ktgs.js | 8 | 22b-ktgs.js | ô "Đơn vị kiểm tra" gõ ở Tùy chọn khác trước 3.323 |
| `ktKBNK` | 79-ktgs-khoa.js | 3 | 79-ktgs-khoa.js |  |
| `ktKH` | 06a-dong-bo-cai-dat.js | 14 | 06a-dong-bo-cai-dat.js · 22d-ktgs-04.js · 22e-ktgs-kh.js | 3.398: bản chốt mới nhất |
| `ktKHChuan` | 22d-ktgs-04.js | 2 | 22d-ktgs-04.js |  |
| `ktKN04` | 22d-ktgs-04.js | 6 | 22d-ktgs-04.js | 3.329: + màn Bộ khai báo |
| `ktMucDich` | 22b-ktgs.js | 2 | 22b-ktgs.js | lựa chọn cột mục đích trước 3.114 |
| `ktNhanXet` | 22b-ktgs.js | 3 | 22b-ktgs.js | 3.98: nhớ lựa chọn gợi ý nhận xét Mẫu 16 |
| `ktPC` | 22d-ktgs-04.js | 4 | 22d-ktgs-04.js |  |
| `ktPnkt` | 22b-ktgs.js | 5 | 22b-ktgs.js |  |
| `kyBang` | 04c-van-ban-thang.js | 5 | 04c-van-ban-thang.js · 05-them-file.js |  |
| `kyChot` | 04c-van-ban-thang.js | 5 | 04c-van-ban-thang.js |  |
| `kyChung` | 22g-to.js | 4 | 22g-to.js · 22k-nap-kt.js | 3.326 (anh 23/10): ngày chọn NHỚ qua lần mở app (bỏ luật 3.97 "kỳ theo ngày chỉ giữ trong phiên" — Ctrl+F5 xon… |
| `kyRa` | 51-chu-ky.js | 3 | 51-chu-ky.js | 3.309: rà lại 1 lần theo cách xét mới |
| `loaiBoHS` | 04d-bo-ho-so.js | 3 | 04d-bo-ho-so.js |  |
| `loaiVB` | 06-hop-thoai.js | 9 | 06-hop-thoai.js · 15-ai-chuan-hoa.js · 18-cai-dat.js · 91-nguon-vb.js |  |
| `loaiVB3438` | 91-nguon-vb.js | 2 | 91-nguon-vb.js |  |
| `maDaBo` | 10-danh-sach.js | 6 | 10-danh-sach.js |  |
| `mauBaoCao` | 03-doc-pdf.js | 31 | 03-doc-pdf.js · 04b3-hom-nay-lich-viec.js · 04c-van-ban-thang.js · 05-them-file.js · 06-hop-thoai.js · 06a-dong-bo-cai-dat.js …+3 | 3.85: sao kê thuần Excel nạp ở tab Số liệu |
| `moCXL` | 04b3-hom-nay-lich-viec.js | 1 | 04b3-hom-nay-lich-viec.js |  |
| `moGanDay` | 04b3-hom-nay-lich-viec.js | 1 | 04b3-hom-nay-lich-viec.js |  |
| `moLocDT` | 11-khung-tab.js | 2 | 11-khung-tab.js |  |
| `nghiepVu` | 03-doc-pdf.js | 6 | 03-doc-pdf.js · 06-hop-thoai.js · 15-ai-chuan-hoa.js · 18-cai-dat.js | 3.40: từ khóa sửa được ở Cài đặt |
| `nhanGCDaGop` | 10-danh-sach.js | 2 | 10-danh-sach.js |  |
| `nhanGhiChu` | 10-danh-sach.js | 1 | 10-danh-sach.js |  |
| `nhomCau` | 04b3-hom-nay-lich-viec.js | 2 | 04b3-hom-nay-lich-viec.js · 06a-dong-bo-cai-dat.js |  |
| `nkChe` | 04b2-hom-nay-ghi-chu.js | 2 | 04b2-hom-nay-ghi-chu.js |  |
| `pbGonQD` | 48-phan-bo-gd.js | 3 | 48-phan-bo-gd.js | 3.467 (anh 04/11 "có nút chuyển xem gọn, 1 QĐ 1 dòng, nhấp vào hiện bảng bên phải") |
| `pbKieuQD` | 48-phan-bo-gd.js | 3 | 48-phan-bo-gd.js | xaThu: thứ tự xã như QĐ (khóa số của object tự xếp lên trước) |
| `pbMuc` | 48-phan-bo-gd.js | 4 | 48-phan-bo-gd.js | 3.308: nhớ mục đang mở |
| `pdfNet` | 12b-scan-dien-thoai.js | 4 | 12b-scan-dien-thoai.js |  |
| `phongGanDay` | 04b3-hom-nay-lich-viec.js | 3 | 04b3-hom-nay-lich-viec.js |  |
| `phongSo` | 04b3-hom-nay-lich-viec.js | 4 | 04b3-hom-nay-lich-viec.js · 06a-dong-bo-cai-dat.js |  |
| `pvApCu` | 83-ap-cu.js | 4 | 83-ap-cu.js |  |
| `pvChung` | 22g-to.js | 2 | 22g-to.js |  |
| `pvGhimBat` | 22g-to.js | 1 | 22g-to.js |  |
| `pvGhimO` | 22g-to.js | 2 | 22g-to.js · 22ga-pham-vi.js | ---------- 3.383.7 (anh 27/10): 📌 GHIM TỪNG Ô LỌC — D.cauHinh.pvGhimO {cap: giá trị}; mở app ô ghim luôn về gi… |
| `pvGon` | 22ga-pham-vi.js | 1 | 22ga-pham-vi.js | 3.206 (anh chốt 14/10): mọi tab — đã chọn địa bàn thì có nút ▾ Mở rộng / ▴ Thu gọn (nhớ theo tab: D.cauHinh.pv… |
| `pvKieu` | 22ga-pham-vi.js | 3 | 22ga-pham-vi.js | 3.383.7: kiểu gọn / chip luôn nhớ cho lần mở sau (D.cauHinh.pvKieu) — trước 3.328 chỉ nhớ khi ghim |
| `racTuXoa` | 10-danh-sach.js | 3 | 10-danh-sach.js | 3.153 (anh chốt): mặc định giữ 30 ngày rồi tự xóa hẳn |
| `rong3304` | 10-danh-sach.js | 2 | 10-danh-sach.js | 3.304: bỏ độ rộng Scan đã kéo 1 lần → mặc định gọn mới |
| `rong339` | 10-danh-sach.js | 2 | 10-danh-sach.js |  |
| `rongPhai` | 10-danh-sach.js | 5 | 10-danh-sach.js · 20-khoi-dong.js |  |
| `rongPV` | 10-danh-sach.js | 4 | 10-danh-sach.js · 20-khoi-dong.js |  |
| `rongTab` | 10-danh-sach.js | 9 | 10-danh-sach.js | 3.304: bỏ độ rộng Scan đã kéo 1 lần → mặc định gọn mới |
| `rongTrai` | 10-danh-sach.js | 5 | 10-danh-sach.js · 20-khoi-dong.js |  |
| `saoLuuNgay` | 17-dong-bo-cai-dat.js | 4 | 17-dong-bo-cai-dat.js · 59-suc-khoe.js |  |
| `scanChe` | 12-scan.js | 4 | 12-scan.js · 35-scan.js · 51-chu-ky.js | loại quyết định cách xử lý — không theo chế độ nhớ cũ |
| `scanLoai` | 35-scan.js | 3 | 35-scan.js · 51-chu-ky.js |  |
| `scanLoc` | 19-danh-muc.js | 2 | 19-danh-muc.js · 35-scan.js |  |
| `scanNguon` | 12-scan.js | 5 | 12-scan.js · 35-scan.js · 51-chu-ky.js |  |
| `scanNhom` | 11-khung-tab.js | 3 | 11-khung-tab.js · 12-scan.js |  |
| `scanXem` | 11-khung-tab.js | 3 | 11-khung-tab.js · 12-scan.js |  |
| `skTK` | 22h-cap-hoi-sao-ke.js | 2 | 22h-cap-hoi-sao-ke.js |  |
| `slgbDaDoi` | 10-danh-sach.js | 2 | 10-danh-sach.js |  |
| `slGiu` | 22-so-lieu.js | 4 | 22-so-lieu.js · 22k-nap-kt.js |  |
| `slKqMo` | 22k-nap-kt.js | 2 | 22k-nap-kt.js |  |
| `slKtLoc` | 22k-nap-kt.js | 4 | 22k-nap-kt.js |  |
| `slMo` | 22k-nap-kt.js | 3 | 22k-nap-kt.js | Ⓚ KTGS mặc định gập |
| `slMt` | 22-so-lieu.js | 6 | 22-so-lieu.js | gon · tq (tổng quan) · thu (thu gọn 1 dòng) |
| `slMtTruoc` | 22-so-lieu.js | 2 | 22-so-lieu.js |  |
| `slNdtTen` | 74-sk-ndt.js | 5 | 74-sk-ndt.js |  |
| `slTab` | 04-giao-dien.js | 53 | 04-giao-dien.js · 17-dong-bo-cai-dat.js · 22b-ktgs.js · 22e-ktgs-kh.js · 22f-tra-cuu.js · 22g-to.js …+12 | 3.163: mở tab Nạp & KT → ⦿ Gần nhất |
| `slTabBC` | 04-giao-dien.js | 2 | 04-giao-dien.js · 22f-tra-cuu.js |  |
| `slTQ` | 22f-tra-cuu.js | 1 | 22f-tra-cuu.js |  |
| `soKyBang` | 04c-van-ban-thang.js | 1 | 04c-van-ban-thang.js |  |
| `soTrangDoc` | 05-them-file.js | 2 | 05-them-file.js · 06c-drive.js |  |
| `suaDM` | 04c-van-ban-thang.js | 4 | 04c-van-ban-thang.js · 06a-dong-bo-cai-dat.js |  |
| `tabCD` | 04-giao-dien.js | 1 | 04-giao-dien.js |  |
| `tagDCBo` | 11-khung-tab.js | 2 | 11-khung-tab.js |  |
| `tagGan` | 11-khung-tab.js | 7 | 11-khung-tab.js |  |
| `tagTab` | 11-khung-tab.js | 16 | 11-khung-tab.js · 18-cai-dat.js |  |
| `taNhacKhac` | 04c-van-ban-thang.js | 2 | 04c-van-ban-thang.js |  |
| `tcPV` | 22h-cap-hoi-sao-ke.js | 2 | 22h-cap-hoi-sao-ke.js |  |
| `tcTim` | 22f-tra-cuu.js | 2 | 22f-tra-cuu.js |  |
| `tenCauTruc` | 03-doc-pdf.js | 1 | 03-doc-pdf.js |  |
| `thTK` | 22i-tong-hop.js | 2 | 22i-tong-hop.js |  |
| `thumuc` | 03-doc-pdf.js | 71 | 03-doc-pdf.js · 04b2-hom-nay-ghi-chu.js · 04b3-hom-nay-lich-viec.js · 04d-bo-ho-so.js · 06-hop-thoai.js · 06a-dong-bo-cai-dat.js …+16 | mục trong thùng rác → file nằm ở _ThungRac |
| `tk104Tay` | 28-tv-tk.js | 3 | 28-tv-tk.js |  |
| `tkChon` | 28-tv-tk.js | 5 | 28-tv-tk.js · 72-ho-vay.js | TK chính: anh đã chọn (js/28) → số dư lớn nhất |
| `toCot` | 22gb-to-giao-dien.js | 1 | 22gb-to-giao-dien.js |  |
| `toNguong` | 22gb-to-giao-dien.js | 3 | 22gb-to-giao-dien.js · 58-tc-to.js | QĐ 70: tổ 20–100 thành viên; ô ⚙ Ngưỡng của tab Tổ khai thì theo ô đó |
| `toTK` | 22g-to.js | 2 | 22g-to.js |  |
| `tuKhoa` | 19-danh-muc.js | 6 | 19-danh-muc.js | từ khóa = bộ gói sẵn trong app, anh sửa dòng nào thì dòng đó theo anh (D.cauHinh.tuKhoa) |
| `tuLenDrive` | 05-them-file.js | 4 | 05-them-file.js · 09-bieu-mau.js · 18-cai-dat.js |  |
| `tuTai` | 05-them-file.js | 2 | 05-them-file.js |  |
| `tvPhan` | 04c-van-ban-thang.js | 5 | 04c-van-ban-thang.js · 04d-bo-ho-so.js · 05-them-file.js | 3.399: bỏ ⚠ Theo dõi nợ — cấu hình cũ 'no' về Bộ hồ sơ |
| `vtLoai` | 19-danh-muc.js | 2 | 19-danh-muc.js |  |
| `xaHien` | 04c-van-ban-thang.js | 8 | 04c-van-ban-thang.js · 20-khoi-dong.js | ma trận hiện lại theo địa bàn quản lý mới |
| `xaMo` | 04c-van-ban-thang.js | 5 | 04c-van-ban-thang.js |  |
| `xaQuanLy` | 04c-van-ban-thang.js | 7 | 04c-van-ban-thang.js · 06a-dong-bo-cai-dat.js · 57-cay.js | giữ thứ tự như cây địa bàn |
| `xemChe` | 05-them-file.js | 3 | 05-them-file.js | 3.157: chế độ xem lần trước |
| `xqlDaAp` | 20-khoi-dong.js | 2 | 20-khoi-dong.js |  |
