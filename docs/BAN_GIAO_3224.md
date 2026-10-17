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
- 17/10: 3.223.1 đã gộp (PR #190). Bắt đầu 3.224 scan.
