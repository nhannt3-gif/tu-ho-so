# BẮT ĐẦU — đọc file này trước (≈ 5 phút), không cần đọc gì khác để bắt tay vào việc

> Mục đích: phiên / tài khoản Claude mới làm tiếp ngay mà **không tốn token đọc lại toàn bộ**.
> Cập nhật mục 3 (Trạng thái) mỗi bản — **thay**, không chèn thêm; lịch sử dài để ở CHANGELOG.

## 1. Người dùng & luật làm việc (bắt buộc)
- **Anh Nhân** — CBTD NHCSXH PGD Gò Dầu (Tây Ninh). Trả lời **tiếng Việt**, xưng "em", gọi "anh". Ngắn gọn, thực dụng; tách rõ số thật / suy luận.
- **Kế hoạch → anh duyệt → anh nhắn "code" mới sửa code → hồi quy → PR → anh nhắn "gộp" mới gộp.** Không làm ngoài phạm vi; đổi / bỏ chức năng cũ phải anh duyệt; thiếu thông tin thì hỏi.
- **Repo công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả `tests/gia31`. File thật anh gửi chỉ đọc trong thư mục nháp của phiên (`python3 -I`), phiên mới không có → xin anh gửi lại.
- Không ghi tên / mã model vào commit, PR, mã nguồn.
- App hiện là **1 file `index.html`** (ES5, không build, không npm, không thêm thư viện). Đang có kế hoạch tách file (xem mục 4).

## 2. Quy trình kỹ thuật (lệnh)
- Nhánh: nhánh phiên được giao (ví dụ `claude/html-app-review-ck346k`). Bắt đầu: `git fetch origin main && git checkout -B <nhánh> origin/main`.
- Kiểm: `python3 tests/kiem.py` → bình thường là `Cú pháp OK · Trùng tên: không · Thiếu hàm: CompressionStream, DecompressionStream, Response`.
- Hồi quy (chạy ngầm, ~1 giờ): `for t in hoiquy hoiquy2 $(seq -f 't%g' 101 130); do echo "$t: $(timeout 900 node tests/$t.js 2>&1 | tail -1)"; done` — dòng cuối "lỗi []" hoặc "n/n đạt" là sạch. `t100` hỏng sẵn, bỏ qua. Sửa `index.html` khi phép thử đang chạy → có thể lỗi giả, chạy lại.
- Mỗi bản: tăng `APP_BAN` / `APP_LUC`, dòng đầu `CO_GI_MOI`, chuỗi `APP_BAN==='x'` trong `tests/hoiquy2.js`; `docs/CHANGELOG.md` (mục mới ở đầu); `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật); **mục 3 file này**; `python3 tests/bando.py`.
- Sửa file lớn: script Python thay chuỗi có `assert s.count(a)==1`; `grep` tên hàm / lớp CSS trước khi đặt mới.
- Gộp xong: `git fetch -q origin main && git checkout -q -B <nhánh> origin/main && git push -q -f -u origin <nhánh>`.

## 3. Trạng thái (cập nhật 10/10/2026)
- **Bản đang chạy:** 3.141 trên `main` (không còn PR mở).
- **Đang làm:** kiến trúc lại app theo `docs/KIEN_TRUC_3_LOP.md` — **Bước 1 (thiết kế) đã xong, chờ anh duyệt đợt A** (tách file nguyên trạng). Chưa sửa code.
- **Chờ anh:** (a) dữ liệu cũ tab Tháng chuyển đi đâu; (b) dòng tên cột file hồ sơ chi tiết chuẩn mới; (c) hỏi tin học về máy chủ nội bộ; thử máy thật 3.136 / 3.138 (bảng trong `BAN_GIAO_VIEC_CON_LAI.md`); số TK 105 khách chỉ có 105 (cần nguồn); văn bản củng cố / chia tách tổ; "nhớ người ký theo khuyết" (chưa xác nhận); Mẫu 06 trắng 2 mặt trên Word thật.

## 4. Tìm thông tin mà không đọc hết (tiết kiệm token)
| Cần gì | Xem ở đâu | Cách đọc |
|---|---|---|
| Hướng đi lớn, quyết định anh đã chốt | `docs/KIEN_TRUC_3_LOP.md` | Đọc mục 0 + mục 8 (lộ trình) |
| Code nằm đâu | `docs/BAN_DO_MA.md` (tự sinh) | Tra khối / tiền tố → `grep -n "function tên"` → Read đúng khoảng dòng (offset/limit). **Không đọc cả `index.html`.** |
| Một bản cũ đã làm gì | `docs/CHANGELOG.md` (≈ 280 KB) | `grep -n "^## 3.13" docs/CHANGELOG.md` rồi đọc đúng mục. **Không đọc cả file.** |
| Bảng thử máy thật, ghi chú kỹ thuật từng bản | `docs/BAN_GIAO_VIEC_CON_LAI.md` (≈ 260 KB) | `grep -n "3.138" …` rồi đọc khoảng nhỏ |
| Nghiệp vụ chi tiết, quy tắc số liệu, kiến trúc cũ | `docs/BAN_GIAO_TIEP_TUC.md` (≈ 70 KB) | Chỉ đọc mục cần (mục 4 Số liệu, 4a quy tắc kỳ ngày) |
| Phép thử nào kiểm gì | `tests/README.md` | `grep` tên chức năng |
| Cấu trúc file Excel hệ thống | `docs/DU_LIEU_THANG.md` | Khi làm phần nạp |

**Nguyên tắc cho phiên sau:** mỗi bản chỉ thêm ≤ 15 dòng vào CHANGELOG cho phần tóm tắt + ghi chi tiết kỹ thuật ngắn; giữ file này dưới ~80 dòng; thông tin dài để ở tài liệu chuyên đề và trỏ link.
