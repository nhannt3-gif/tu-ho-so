# BẮT ĐẦU — đọc file này trước (≈ 5 phút), không cần đọc gì khác để bắt tay vào việc

> Mục đích: phiên / tài khoản Claude mới làm tiếp ngay mà **không tốn token đọc lại toàn bộ**.
> Cập nhật mục 3 (Trạng thái) mỗi bản — **thay**, không chèn thêm; lịch sử dài để ở CHANGELOG.

## 1. Người dùng & luật làm việc (bắt buộc)
- **Anh Nhân** — CBTD NHCSXH PGD Gò Dầu (Tây Ninh). Trả lời **tiếng Việt**, xưng "em", gọi "anh". Ngắn gọn, thực dụng; tách rõ số thật / suy luận.
- **Kế hoạch → anh duyệt → anh nhắn "code" mới sửa code → hồi quy → PR → anh nhắn "gộp" mới gộp.** Không làm ngoài phạm vi; đổi / bỏ chức năng cũ phải anh duyệt; thiếu thông tin thì hỏi.
- **Repo công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả `tests/gia31`. File thật anh gửi chỉ đọc trong thư mục nháp của phiên (`python3 -I`), phiên mới không có → xin anh gửi lại.
- Không ghi tên / mã model vào commit, PR, mã nguồn.
- App (từ 3.142) = `index.html` (khung) + `css/app.css` + `js/01-…` → `js/22-so-lieu.js`, nạp đúng thứ tự (ES5, không build, không npm, không thêm thư viện). Ghép lại 1 file: `python3 tests/ghep.py ra.html`.

## 2. Quy trình kỹ thuật (lệnh)
- Nhánh: nhánh phiên được giao (tài khoản chính: `claude/html-app-review-ck346k`; tài khoản phụ: `claude/busy-curie-2qescm`). Bắt đầu: `git fetch origin main && git checkout -B <nhánh> origin/main`.
- Kiểm: `python3 tests/kiem.py` → bình thường là `Cú pháp OK · Trùng tên: không · Thiếu hàm: CompressionStream, DecompressionStream, Response`.
- Hồi quy (chạy ngầm, ~1 giờ): `for t in hoiquy hoiquy2 $(seq -f 't%g' 101 130); do echo "$t: $(timeout 900 node tests/$t.js 2>&1 | tail -1)"; done` — dòng cuối "lỗi []" hoặc "n/n đạt" là sạch. `t100` hỏng sẵn, bỏ qua. Sửa mã khi phép thử đang chạy → có thể lỗi giả, chạy lại. Phiên mới phải dựng `tests/lib` + `tests/gia*` trước (lệnh ở đầu `tests/README.md`, ~3 phút).
- Mỗi bản: tăng `APP_BAN` / `APP_LUC` (`js/02-nen.js`), dòng đầu `CO_GI_MOI` (`js/06-hop-thoai.js`), **`?v=` trong `index.html`** (`sed -i 's/?v=3.142/?v=3.143/' index.html`; `kiem.py` báo nếu lệch), chuỗi `APP_BAN==='x'` trong `tests/hoiquy2.js`; `docs/CHANGELOG.md` (mục mới ở đầu); `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật); **mục 3 file này**; `python3 tests/bando.py`.
- Sửa file lớn: script Python thay chuỗi có `assert s.count(a)==1`; `grep` tên hàm / lớp CSS trước khi đặt mới.
- **Mốc quay lại:** nhánh `moc/v3.141-truoc-tach-file` = bản 3.141 (1 file `index.html`, trước kiến trúc 3 lớp) — **không xóa, không đẩy gì vào**. Bản sau lỗi nặng: Revert PR trên GitHub, hoặc lấy lại file từ nhánh mốc. Mốc mới đặt tên `moc/v<bản>-<gợi nhớ>`.
- Gộp xong: `git fetch -q origin main && git checkout -q -B <nhánh> origin/main && git push -q -f -u origin <nhánh>`.

## 3. Trạng thái (cập nhật 10/10/2026)
- **Bản đang làm:** 3.142 — **đợt A xong** (tách file nguyên trạng), PR từ nhánh `claude/busy-curie-2qescm` **chờ anh "gộp"**. `main` = 3.141 + tài liệu kiến trúc (PR #121 đã gộp).
- **Đợt A đã chứng minh:** ghép lại giống từng byte 3.141; ảnh 5 tab × máy tính / điện thoại trùng điểm ảnh; hồi quy t101–t138 đạt như mốc 3.141 (t116 hỏng sẵn từ trước — 1 phép tên file Word "can cu 10566", chưa sửa). Sửa mã duy nhất: cửa sổ nổi HSSV chép CSS từ file.
- **Việc tiếp (theo `KIEN_TRUC_3_LOP.md` mục 8):** đợt B (Lớp 1 an toàn: chỉ mục `D` → IndexedDB, 1 cơ chế đồng bộ Drive) — **lên kế hoạch chi tiết, chờ anh duyệt + "code"**. Q12–Q13 (bỏ tab Tháng + xóa dữ liệu, bỏ Giao ban / Buổi GD) và Q14 (ngày số liệu theo nội dung file) chưa làm — đề xuất đặt vào đợt nào thì hỏi anh.
- **Anh chốt 10/10:** bỏ hẳn tab Tháng + xóa dữ liệu cũ (rác); bỏ nút Giao ban, Buổi giao dịch (làm lại sau); nạp file nhận ngày số liệu từ **nội dung** file (Q12–Q14). Anh làm luân phiên 2 tài khoản — tài khoản nào cũng bắt đầu từ file này (nhánh đang dùng ghi ở mục 2).
- **Chờ anh:** (b) dòng tên cột file hồ sơ chi tiết chuẩn mới; (c) hỏi tin học về máy chủ nội bộ; thử máy thật 3.136 / 3.138 / 3.142 (bảng trong `BAN_GIAO_VIEC_CON_LAI.md`); số TK 105 khách chỉ có 105 (cần nguồn); văn bản củng cố / chia tách tổ; "nhớ người ký theo khuyết" (chưa xác nhận); Mẫu 06 trắng 2 mặt trên Word thật.

## 4. Tìm thông tin mà không đọc hết (tiết kiệm token)
| Cần gì | Xem ở đâu | Cách đọc |
|---|---|---|
| Hướng đi lớn, quyết định anh đã chốt | `docs/KIEN_TRUC_3_LOP.md` | Đọc mục 0 + mục 8 (lộ trình) |
| Code nằm đâu | `docs/BAN_DO_MA.md` (tự sinh) | Tra khối / tiền tố → `grep -n "function tên"` → Read đúng khoảng dòng (offset/limit). **Không đọc cả file js lớn** (`04-giao-dien` 5.500 dòng, `06-hop-thoai` 3.350, `22-so-lieu` 6.350). |
| Một bản cũ đã làm gì | `docs/CHANGELOG.md` (≈ 280 KB) | `grep -n "^## 3.13" docs/CHANGELOG.md` rồi đọc đúng mục. **Không đọc cả file.** |
| Bảng thử máy thật, ghi chú kỹ thuật từng bản | `docs/BAN_GIAO_VIEC_CON_LAI.md` (≈ 260 KB) | `grep -n "3.138" …` rồi đọc khoảng nhỏ |
| Nghiệp vụ chi tiết, quy tắc số liệu, kiến trúc cũ | `docs/BAN_GIAO_TIEP_TUC.md` (≈ 70 KB) | Chỉ đọc mục cần (mục 4 Số liệu, 4a quy tắc kỳ ngày) |
| Phép thử nào kiểm gì | `tests/README.md` | `grep` tên chức năng |
| Cấu trúc file Excel hệ thống | `docs/DU_LIEU_THANG.md` | Khi làm phần nạp |

**Nguyên tắc cho phiên sau:** mỗi bản chỉ thêm ≤ 15 dòng vào CHANGELOG cho phần tóm tắt + ghi chi tiết kỹ thuật ngắn; giữ file này dưới ~80 dòng; thông tin dài để ở tài liệu chuyên đề và trỏ link.
