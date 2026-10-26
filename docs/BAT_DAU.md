# BẮT ĐẦU — đọc file này trước (≈ 5 phút), không cần đọc gì khác để bắt tay vào việc

> Mục đích: phiên / tài khoản Claude mới làm tiếp ngay mà **không tốn token đọc lại toàn bộ**.
> Cập nhật mục 3 (Trạng thái) mỗi bản — **thay**, không chèn thêm; lịch sử dài để ở CHANGELOG.

## 1. Người dùng & luật làm việc (bắt buộc)
- **Anh Nhân** — CBTD NHCSXH PGD Gò Dầu (Tây Ninh). Trả lời **tiếng Việt**, xưng "em", gọi "anh". Ngắn gọn, thực dụng; tách rõ số thật / suy luận.
- **Kế hoạch → anh duyệt → anh nhắn "code" mới sửa code → hồi quy → PR → anh nhắn "gộp" mới gộp.** Không làm ngoài phạm vi; đổi / bỏ chức năng cũ phải anh duyệt; thiếu thông tin thì hỏi.
- **Anh nhắc 24/10:** ý mới (kể cả khi anh nói "cứ làm theo kế hoạch") → **trao đổi kỹ, chốt lại ý anh bằng 1 bản tóm tắt (làm gì · ở đâu · giữ gì) → anh xác nhận → mới code**. "Làm theo kế hoạch" chỉ áp cho việc đã có trong kế hoạch anh duyệt.
- **Repo công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, file anh gửi) vào repo; phép thử dùng dữ liệu giả `tests/gia31`. File thật anh gửi chỉ đọc trong thư mục nháp của phiên (`python3 -I`), phiên mới không có → xin anh gửi lại.
- Không ghi tên / mã model vào commit, PR, mã nguồn.
- App (từ 3.142) = `index.html` (khung) + `css/app.css` + `js/01-…` → `js/22-so-lieu.js`, nạp đúng thứ tự (ES5, không build, không npm, không thêm thư viện). Ghép lại 1 file: `python3 tests/ghep.py ra.html`.

- **Luật kiến trúc (14/10, bắt buộc): `docs/QUY_CHUAN_KIEN_TRUC.md`** — đọc trước khi thêm / sửa chức năng: chung hay riêng, sổ quy tắc QT, KTGS gói riêng + khóa mẫu (gọi "Mẫu 06 KTGS"…), mẫu Giao dịch xã đã chốt, **thứ tự làm tiếp (mục 8): B lưu an toàn → C kho chung (làm thử TK 104 / 105 / CCCD) → tách KTGS → chốt sổ tổ viên cuối năm → đối chiếu chéo** — tạm dừng chức năng lớn.

## 2. Quy trình kỹ thuật (lệnh)
- Nhánh: nhánh phiên được giao (tài khoản chính: `claude/html-app-review-ck346k`; tài khoản phụ: `claude/busy-curie-2qescm`). Bắt đầu: `git fetch origin main && git checkout -B <nhánh> origin/main`.
- **Anh chốt 14/10 — gom thử:** trong lúc làm chỉ chạy **phép thử liên quan** (1–3 file `tests/tNNN.js`); **hồi quy đầy đủ (`bash tools/hoiquy.sh <tên>`, ~80 phép) chạy 1 lần cho cả đợt, trước khi anh nhắn "gộp"**; ý nhỏ phát sinh khi anh test gom vào cùng PR, không mở PR lẻ.
- Kiểm: `python3 tests/kiem.py` → bình thường là `Cú pháp OK · Trùng tên: không · Thiếu hàm: CompressionStream, DecompressionStream, Response`. Dòng 2 "Hàm mồ côi" (3.227) chỉ báo — `--mo-coi` in đủ danh sách.
- **Anh dặn 17/10:** làm nhiều chức năng rồi chạy hồi quy đủ **1 lần** (không chạy riêng từng bản); bản xong thì gộp. **Mỗi bản:** dọn rác code trong phạm vi bản (bỏ hàm / CSS / nhánh không còn dùng — grep `js/`, `index.html`, `tests/` trước khi xóa; gộp hàm trùng việc; không xóa phần đọc dữ liệu cũ) + kiểm toàn vẹn (kiem.py, phép thử phần sửa, hồi quy đủ); ghi vào CHANGELOG đã bỏ / gộp gì.
- Hồi quy (chạy ngầm, ~1 giờ): `for t in hoiquy hoiquy2 $(seq -f 't%g' 101 130); do echo "$t: $(timeout 900 node tests/$t.js 2>&1 | tail -1)"; done` — dòng cuối "lỗi []" hoặc "n/n đạt" là sạch. `t100` hỏng sẵn, bỏ qua. Sửa mã khi phép thử đang chạy → có thể lỗi giả, chạy lại. Phiên mới phải dựng `tests/lib` + `tests/gia*` trước (lệnh ở đầu `tests/README.md`, ~3 phút).
- Mỗi bản: tăng `APP_BAN` / `APP_LUC` (`js/02-nen.js`), dòng đầu `CO_GI_MOI` (`js/06-hop-thoai.js`), **`?v=` trong `index.html`** (`sed -i 's/?v=3.142/?v=3.143/' index.html`; `kiem.py` báo nếu lệch), chuỗi `APP_BAN==='x'` trong `tests/hoiquy2.js`; `docs/CHANGELOG.md` (mục mới ở đầu); `docs/BAN_GIAO_VIEC_CON_LAI.md` (bảng thử máy thật + ghi chú kỹ thuật); **mục 3 file này**; `python3 tests/bando.py`.
- Sửa file lớn: script Python thay chuỗi có `assert s.count(a)==1`; `grep` tên hàm / lớp CSS trước khi đặt mới.
- **Mốc quay lại:** nhánh `moc/v3.141-truoc-tach-file` = bản 3.141 (1 file `index.html`, trước kiến trúc 3 lớp) — **không xóa, không đẩy gì vào**. Bản sau lỗi nặng: Revert PR trên GitHub, hoặc lấy lại file từ nhánh mốc. Mốc mới đặt tên `moc/v<bản>-<gợi nhớ>`.
- Gộp xong: `git fetch -q origin main && git checkout -q -B <nhánh> origin/main && git push -q -f -u origin <nhánh>`.

## 3. Trạng thái — BẮT ĐẦU Ở ĐÂY (cập nhật 15/10/2026)
- **`main` = 3.381** — TK 3: KHO CHUẨN `js/73` (Mẫu 31 gốc + gắn TK 105/104, QH/khoanh/KHĐ, tổ; cửa KHO.kc / kcKH / kcKU / kcTo), toKhach + KHO.hoVay đọc qua kho; luật QUY_CHUAN mục 15. Tiếp: 3.382 Sao kê · Tổng hợp · Thông tin tổ qua kho. Chờ anh: số đo ⏱ quét CCCD.
- **20/10 — 2 tài khoản làm song song:** TK chính làm **🎯 Phân bổ KH** (`docs/KE_HOACH_PHAN_BO_KH.md` — đọc **mục 7 phân công file** trước khi sửa chỗ chung); TK phụ làm tiếp các việc dưới.
- **Việc tiếp (thứ tự):**
  1. Chờ anh so bản in 01/GQVL, 07b với mẫu giấy (dựng theo nội dung Word anh gửi; file gốc không vào repo) → chỉnh bố cục nếu lệch. Đợt sau GQVL: "mẫu tính" hiệu quả theo từng mục đích.
  2. `KE_HOACH_3206.md` mục 6 (nút 09A từ chip đến hạn, in nhiều hộ) · ô chấm tùy biến cho 01/UQ, 01/TGTV.
  3. Đợt kiến trúc B / C (`KE_HOACH_B_C.md`) — anh đã tạm dừng chức năng lớn trước đó, hỏi lại anh thứ tự.
- **Đang chờ anh:** thử máy thật 3.202–3.212 (bảng thử từng bản trong `BAN_GIAO_VIEC_CON_LAI.md`). Hồi quy: t100 / t116 trượt sẵn trên main (không do các bản này).
- **Kế hoạch đã xong (tham khảo khi sửa):** `KE_HOACH_SO_HO_VAY.md` (3.209–3.210), `KE_HOACH_3209.md` (GQVL 3.211), `KE_HOACH_3208.md`, `KE_HOACH_3207.md`, `KE_HOACH_3206.md`.

### Ghi chú cũ (đọc khi cần)
- ✅ **3.207 đã làm — `docs/KE_HOACH_3207.md`** (danh sách hộ vay mới: form nhập nhanh, gọi ra làm 01/TD · 01/UQ · 03/TD). Trạng thái mục 5 của file đó.
- ✅ **3.206 đã làm xong (14/10 tối) — `docs/KE_HOACH_3206.md`**: anh chốt gom 1 bản 3.206 (cây địa bàn Mở rộng / Thu gọn mọi tab · Giấy lĩnh ↺ Phiếu mới · Hồ sơ vay mỗi mẫu 1 tab · 09A/TD ô chấm tùy biến + in kèm Mẫu 06/TD). Trạng thái từng phần ở mục 5 của file đó — **tài khoản nào làm tiếp cũng đọc file đó trước**.
- ⚠ **LƯU Ý 14/10 cho tài khoản làm code — đọc `docs/QUY_CHUAN_KIEN_TRUC.md` trước khi làm bất cứ bản nào.** Anh chốt: ① **tạm dừng chức năng lớn**; thứ tự làm tiếp (mục 8): **B lưu an toàn → C kho chung `KHO` (làm thử bằng TK 104 / 105 / CCCD — QT-11…13) → tách KTGS ra gói riêng → dòng thời gian + chốt sổ tổ viên cuối năm (trước 01/2027) → đối chiếu chéo có danh mục lý do lệch → Giao dịch xã / Hồ sơ Tổ qua `KHO` → "Việc cần xử lý" ở Hôm nay**; ② **KTGS gói riêng, chỉ dùng kỳ tháng; mẫu KTGS đã chốt bị khóa** (gọi "Mẫu 06 KTGS"…); **3 mẫu Giao dịch xã (04/TD, 12/GDX, Giấy lĩnh) đã chốt — khóa**, chỉ đổi phần lấy dữ liệu; ③ **QT-11…13 đã chốt:** file tháng là chuẩn; Giấy lĩnh in số TK, số tiền gõ tay, gợi ý số dư 105 theo Mẫu 31 mới nhất; TK 105 + CCCD **ưu tiên Mẫu 31**; **CCCD hết hạn → cảnh báo**; **TK 104 lấy từ Sao kê 104 xuất theo tháng** (sao kê ngày gắn Mẫu 31 ngày) — **xin anh dòng tên cột Sao kê 104** trước khi làm bộ đọc; ④ quy tắc tổ viên QT-01…07 (Mẫu 31 chứa toàn bộ món tất nợ trong năm; BC0437/0438 chỉ cho KTGS; LEN_31 "Số hộ" QT-09 đang bàn); ⑤ mỗi yêu cầu mới: **tư vấn đặt chỗ** (tab nào, số liệu từ `KHO` nào, chung / riêng) → anh duyệt → "code".
- **Kế hoạch chi tiết đợt B + C (14/10, chờ anh duyệt): `docs/KE_HOACH_B_C.md`** — chuẩn lại QT-11…14 theo file thật, 3.202 gom lưu → 3.203 IndexedDB theo ngăn → 3.204 cửa `KHO` → 3.205 Giấy lĩnh qua `KHO`.
- Mốc quay lại: nhánh `moc/v3.141-truoc-tach-file`.
- **Việc tiếp:** anh thử máy thật 3.163 → 3.166 (bảng thử trong `BAN_GIAO_VIEC_CON_LAI.md`, mỗi bản 4–8 dòng). Còn trong `BAN_GIAO_3161.md`: §2.6 (đề xuất chưa trả lời) · §2.7 lỗi hoiquy chập chờn · LEN_31 giả cho phép thử Tổng hợp (§2.1). Sau đó: đợt B (góp ý `luu()`, đồng bộ Drive) · đợt D (kỳ + phạm vi chung trên đầu trang).
- **Anh chốt 10/10:** bỏ hẳn tab Tháng + xóa dữ liệu cũ (rác); bỏ nút Giao ban, Buổi giao dịch (làm lại sau); nạp file nhận ngày số liệu từ **nội dung** file (Q12–Q14). Anh làm luân phiên 2 tài khoản — tài khoản nào cũng bắt đầu từ file này (nhánh đang dùng ghi ở mục 2).
- **Anh trả lời 11/10 (sau 3.166):** ① danh sách khách tab Tổ **giữ đồng** (cho chính xác) · ② bảng cuộn trong khung **đồng nhất mọi bảng cùng loại** (Sao kê, KTGS… như tab Tổ) — chờ "code" · ③ chip "Mới vào" có thông tin ngày thì ghi ngày — chờ "code" · ④ dòng tên cột hồ sơ chi tiết mới: chưa có · ⑤ máy chủ nội bộ, ⑥ TK 105 khách chỉ có 105: làm sau · ⑦ văn bản củng cố / chia tách tổ: anh gửi đường link · ⑧ "nhớ người ký theo khuyết": em giải thích lại, chờ anh xác nhận · ⑨ Mẫu 06 trắng 2 mặt: anh thấy đã in được · **mới:** 2 mẫu biên bản kết nạp / cho ra khỏi tổ (mẫu cũ cho món đến 30/09/2026, mẫu mới theo QĐ 70 từ 01/10/2026) — anh đã gửi đủ bộ mẫu Tổ (10A, 10B, 10C cũ / mới, 11/TD, 01/BG, 02/BG); kế hoạch điền tự động từng ô: **`docs/KE_HOACH_HO_SO_TO.md`** (3.167 / 3.168, chờ "code").

## 4. Tìm thông tin mà không đọc hết (tiết kiệm token)
| Cần gì | Xem ở đâu | Cách đọc |
|---|---|---|
| Hướng đi lớn, quyết định anh đã chốt | `docs/KIEN_TRUC_3_LOP.md` | Đọc mục 0 + mục 8 (lộ trình) |
| Code nằm đâu | `docs/BAN_DO_MA.md` (tự sinh) | Tra khối / tiền tố → `grep -n "function tên"` → Read đúng khoảng dòng (offset/limit). **Không đọc cả file js lớn** (`04-giao-dien` 5.500 dòng, `06-hop-thoai` 3.350, `22-so-lieu` 6.350). |
| Tên cột file hệ thống (Mẫu 31 175 cột, Nợ QH, Khoanh, KHĐ, Tổng dư nợ, Sao kê TK 104/105, DSTO) | `docs/COT_FILE_MAU.md` (tự sinh `python3 tools/cot_mau.py`) | Cột → trường app (`SL_TRUONG` hoặc `c_<tên chuẩn>`); Mẫu 31 giữ mọi cột → dùng thêm cột không cần nạp lại file. Ghi chú nghiệp vụ lãi / TK 105 cuối file. |
| Một bản cũ đã làm gì | `docs/CHANGELOG.md` (≈ 280 KB) | `grep -n "^## 3.13" docs/CHANGELOG.md` rồi đọc đúng mục. **Không đọc cả file.** |
| Bảng thử máy thật, ghi chú kỹ thuật từng bản | `docs/BAN_GIAO_VIEC_CON_LAI.md` (≈ 260 KB) | `grep -n "3.138" …` rồi đọc khoảng nhỏ |
| Nghiệp vụ chi tiết, quy tắc số liệu, kiến trúc cũ | `docs/BAN_GIAO_TIEP_TUC.md` (≈ 70 KB) | Chỉ đọc mục cần (mục 4 Số liệu, 4a quy tắc kỳ ngày) |
| Phép thử nào kiểm gì | `tests/README.md` | `grep` tên chức năng |
| Cấu trúc file Excel hệ thống | `docs/DU_LIEU_THANG.md` | Khi làm phần nạp |
| File anh xuất hằng tháng (mẫu nào, tên file) | `docs/FILE_XUAT_HANG_THANG.md` | Ngắn, đọc khi bàn về file |
| Kế hoạch giao diện điều hướng (đợt F) | `docs/KE_HOACH_DIEU_HUONG.md` | Ngắn |
| Bộ hồ sơ Tổ (QĐ 70) — ô nào điền tự động | `docs/KE_HOACH_HO_SO_TO.md` | Đã làm ở 3.170 (`js/25-ho-so.js`) — đọc khi sửa / thêm mẫu |
| Ý anh đang gom: gọn tab Nạp & KT, In / Xuất / Gửi / Xóa thống nhất | `docs/KE_HOACH_GON_GIAO_DIEN.md` | Ngắn — đọc trước khi làm bản kế tiếp |

**Nguyên tắc cho phiên sau:** mỗi bản chỉ thêm ≤ 15 dòng vào CHANGELOG cho phần tóm tắt + ghi chi tiết kỹ thuật ngắn; giữ file này dưới ~80 dòng; thông tin dài để ở tài liệu chuyên đề và trỏ link.
