# Bàn giao sau 3.223.1 — cho tài khoản phụ / phiên Claude làm tiếp (viết 17/10/2026)

> Đọc kèm: `CLAUDE.md` (luật), `docs/BAT_DAU.md` (lệnh, trạng thái), `docs/QUY_CHUAN_KIEN_TRUC.md` (luật kiến trúc, mục 9 = mẫu trên nền ô + chuẩn khóa).
> Mục "Tiến độ" cuối file được cập nhật mỗi khi xong 1 phần — **đọc mục đó trước để biết đang dừng ở đâu.**

## 1. Luật làm việc với anh Nhân (tóm tắt — đủ ở `CLAUDE.md`, `BAN_GIAO_3161.md` mục 1)
- Tiếng Việt, gọi **anh Nhân**; ngắn, thực dụng; phân biệt số liệu thật / suy luận.
- Bình thường: kế hoạch → anh duyệt → anh nhắn "code" → làm → PR → anh nhắn "gộp".
- **Riêng đợt này (anh chốt 17/10, còn ít token):** *"sắp xếp làm 1 lần tất cả, cái nào xong cứ gộp lên anh thử, rồi làm tiếp không cần hỏi lại; khi xong mốc lớn hãy thử 1 lần"* → làm liền các việc ở mục 3 theo thứ tự, **xong phần nào tự mở PR + gộp**, hồi quy đủ ở mốc lớn (cuối 3.224, cuối 3.225).
- Repo công khai: chỉ dữ liệu / ảnh GIẢ trong `tests/`. Không ghi tên / mã model vào commit, PR, mã.
- Mỗi bản: `python3 tests/kiem.py` sạch + phép thử + `tools/bump.py spec.json` (mẫu `tools/mau_spec.json`) + `python3 tests/bando.py`.

## 2. Trạng thái `main` = 3.223.1
- **3.223 (bản lớn):** 14 mẫu Hồ sơ vay / Hồ sơ Tổ đúng form Word gốc trên **nền ô** (`js/31-o-mau.js` + `js/mau/*.js`, 3 kiểu in trắng / thật / mẫu); 10C, 11 cũ – mới chip riêng; 10D; sổ hộ vay đủ cột (`js/33`); lưu an toàn KHO1 (`js/32`); **lưu theo ngăn IndexedDB** (`js/34-luu-ngan.js`, công tắc quay lại, giữ bản cũ 30 ngày, localStorage bị xóa không ghi đè IndexedDB).
- **3.223.1:** Bảng kê viết tắt "khu phố" → "KP" (`gdxBKDC`, js/26).
- Hồi quy: sạch trừ **t100, t116 trượt sẵn trên main** (không do các bản này).
- Công cụ đo mẫu: `t180` (so file gốc `tests/mau_goc/`), `t181` (chồng khít 3 kiểu in), `t179` + `tests/chuan_tao.js <tên>` (chuẩn khóa từng ký tự — chỉ ghi lại chuẩn của mẫu anh duyệt đổi).
- Thêm mẫu mới trên nền ô: chép 1 file `js/mau/*.js` gần giống (vd 10b.js cho biên bản), `omDangKy({k, ma, phan, co, o:[…], V, lap})`, đo bằng t180 với file gốc trong `tests/mau_goc/`, thêm vào `khop.json`.

## 3. Việc còn lại — thứ tự anh duyệt 17/10
1. **3.224 — quy trình scan mới**: `docs/KE_HOACH_3224_SCAN.md` (đã chốt đủ: 1 luồng, loại quyết định số mặt — Tài liệu / Chữ ký / Ảnh khách luôn 1 mặt, Ảnh khách = 1 mặt CCCD; bộ chỉnh chung lấy từ CCCD; Văn bản rõ; chữ ký **giữ nguyên mẫu chụp JPG, chỉ khử bóng mờ nhẹ + nén**; chữ ký / ảnh **dưới 200 KB**; bộ nút In · Lưu vào máy / Lưu vào app (⏳ Chờ khai báo → khai cây địa bàn → mới lên Drive) · Gửi Zalo · Bỏ; bỏ tự lưu, giữ bản nháp chống mất).
2. **3.225 — tách lưu trữ + đồng bộ theo khối**: `docs/KE_HOACH_3225_LUU.md` (đã chốt hướng A2 + B2/B1 + C2, bản cũ `chimuc.json` ghi tới khi anh tắt).
3. **Rà chữ dài từng ô**: `docs/RA_SOAT_CHU_DAI.md` — **chờ anh ghi ý từng chỗ** (xuống dòng / thu nhỏ / viết ngắn); anh nói chưa rảnh, sẽ góp 1 lần.
4. **Sổ góp ý mẫu**: `docs/GOP_Y_MAU.md` — ghi ý anh gửi khi xem mẫu, làm 1 lần khi anh báo xong.
5. Để sau (anh hẹn): 01/BG, 02/BG lên nền ô · bản điện thoại · tab Theo dõi nợ độc lập · tab Mẫu biểu chuyển vào Giao dịch xã (nút con in mẫu chuẩn / xuất Word gửi Zalo) · tách app Văn bản (bước 2 của 3.225).

## 4. Tiến độ (cập nhật mỗi lần xong 1 phần)
- 17/10: 3.223.1 đã gộp (PR #190). Bàn giao gộp (PR #191).
- 17/10: **3.225** = 3.224 scan (`js/35-scan.js`) + đồng bộ Drive theo khối (`js/36-dong-bo-khoi.js`) — xem CHANGELOG 3.225. **Khác kế hoạch:** cài đặt vẫn qua cauhinh.json (2 đường song song làm lẫn mốc chBam — t117/t136); kho IndexedDB theo khối (C2) chưa làm.
- 17/10: **3.225 đã gộp (PR #192)** — hồi quy đủ sạch trừ t100 / t116 (trượt sẵn trên main). Anh chưa thử máy thật (bảng 3.225 trong BAN_GIAO_VIEC_CON_LAI.md). **Tài khoản phụ làm tiếp từ đây.**
- **Việc tiếp:** (a) tách cài đặt theo khối — làm bằng cách chia CHÍNH cơ chế cauhinh.json thành file theo khối (cùng chBam, chFileId từng file), không chạy 2 đường; (b) C2 kho IndexedDB theo khối (sửa js/34 `LN`: mỗi khối 1 DB, chuyển từ tuhoso_ngan, giữ 30 ngày); (c) chờ anh: RA_SOAT_CHU_DAI, GOP_Y_MAU, thử máy thật 3.225.
- 17/10: **3.226** = (a) cài đặt theo khối (`_Hệ thống/caidat/<khối>.json`, js/36 cuối file, t188). **(b) C2 kho IndexedDB theo khối: KHÔNG LÀM lúc này** — anh giao em quyết (17/10: "em đánh giá lợi hại và ra quyết định"): lợi ích người dùng thấy được ít, rủi ro dữ liệu trong máy cao (ghi nhiều kho không cùng 1 giao dịch → mất điện giữa chừng các kho lệch nhau). Chỉ làm khi thật cần: lúc tách app Văn bản (bước 2) — khi đó mỗi app 1 kho là tự nhiên.
- 17/10: **3.227** = 📒 Sổ hộ vay gộp tab 👪 Hộ vay (lọc khối LỌC ĐỊA BÀN, ngày nhập, nhóm theo tháng, tích → 03/TD) + 📌 Ghim khối lọc, ⬆ Lên 1 cấp, Backspace; kiem.py báo hàm mồ côi. **Việc tiếp: `docs/KE_HOACH_3228.md`** (3.228 kiểm tra logic khi nhập hộ — khai báo được; GQVL số lượng + đơn vị; 3.229 khai báo riêng 4 nguồn từng mẫu, bắt đầu 11/TD).
- **20/10 · TK CHÍNH nhận việc mới — 🎯 PHÂN BỔ KẾ HOẠCH** (gộp app WPF "Phân bổ kế hoạch" của anh vào tab 📈 Số liệu, Biểu 07 trên nền ô): kế hoạch + bàn giao đầy đủ **`docs/KE_HOACH_PHAN_BO_KH.md`** (quy tắc QT-15…17, thuật toán, dữ liệu, **mục 7 phân công file**). **TK phụ đọc mục 7:** không tạo `js/47`, `js/48`, `js/mau/07pb.js`, `tests/t250–t259`; chỗ chung (số bản, `index.html`, CHANGELOG…) → ai gộp trước lấy số kế tiếp, người sau rebase. Tiến độ phần này ghi ở mục 9 file đó. Chờ anh nhắn "code" cho P1.
- 17/10: **3.228** 🔎 kiểm tra hộ vay khi nhập (khai báo được, `js/37-kiem-ho.js`) + GQVL số lượng / đơn vị · **3.229** khai báo riêng 4 nguồn từng mẫu (lõi `js/31-o-mau.js`, 11/TD trước). Anh dặn 17/10: **làm nhiều chức năng rồi chạy hồi quy 1 lần**; mỗi bản dọn rác + kiểm toàn vẹn. Trạng thái chi tiết: `docs/KE_HOACH_3228.md` mục Trạng thái.
