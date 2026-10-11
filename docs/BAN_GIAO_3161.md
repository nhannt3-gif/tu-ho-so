# Bàn giao sau bản 3.161 — cho tài khoản / phiên Claude làm tiếp

> Viết ngày 11/10/2026, khi `main` = **3.161**; cập nhật cuối phiên: `main` = **3.162**. **Việc kế tiếp: mục 2.0 (bản 3.163).** Đọc file này **sau** `CLAUDE.md` và `docs/BAT_DAU.md`.
> Mục 2 là các việc **anh Nhân đã duyệt hướng** nhưng **chưa nhắn "code"**: muốn làm việc nào thì trình lại ngắn kế hoạch của việc đó, chờ anh nhắn "code".

---

## 1. Luật làm việc với anh Nhân (bắt buộc — đã nhắc nhiều lần)

- Trả lời **tiếng Việt**, gọi **anh Nhân** (CBTD NHCSXH PGD Gò Dầu). Ngắn, thực dụng, có ví dụ / sơ đồ chữ khi bàn giao diện.
- **Chỉ sửa code khi anh nhắn "code"** (hoặc ra lệnh làm rõ ràng như "em code phần này", "gộp lên anh test"). Còn lại là **tư vấn**: đề xuất cụ thể, hỏi điểm cần chốt, rồi chờ.
  Anh dặn: *"khi nào anh bảo code hay yêu cầu mới làm, còn thông thường là cho ý kiến tiếp"*.
- **Gộp (merge) khi anh nhắn "gộp"** hoặc khi anh đã cho phép "xong phần nào gộp phần đó".
- Không làm ngoài phạm vi đã chốt; đổi / bỏ chức năng cũ phải hỏi. Thiếu thông tin thì hỏi, không đoán.
- Repo **công khai**: không đưa dữ liệu thật (tên khách, CCCD, tổ trưởng, ảnh / file anh gửi) vào repo, kể cả trong phép thử hay tài liệu. Ảnh chụp màn hình anh gửi có dữ liệu thật → chỉ xem, không lưu vào repo.
- Không ghi tên / mã model vào commit, PR, mã nguồn.
- Anh hay gửi **ảnh chụp màn hình** kèm 1 câu ngắn (có khi gõ tắt / sai dấu: "stck" = tick, "bắt cầu" = cầu nối, "tổng qaun" = Tổng hợp…). Đọc kỹ ảnh, nói lại em hiểu thế nào trước khi đề xuất.

## 2.0 ⭐ VIỆC KẾ TIẾP: bản 3.163 (anh đã chốt nội dung, CHỜ ANH NHẮN "code")
Anh hỏi "còn bao nhiêu việc đã chốt chưa làm" — em liệt kê 19 việc (mục 2.1–2.7 bên dưới + các ý mới này). Anh đồng ý làm theo thứ tự: **3.163** Nạp & KT + bảng tab Tổ + chip báo → **3.164** Tổng hợp + cách viết số → **3.165** Kết quả kiểm tra theo ma trận → **3.166** Chép / gửi file.

**3.163 gồm 6 phần (đã chốt từng ý, trừ phần 6):**
1. **Tab Nạp & KT** (chi tiết mục 2.3): dải lịch tháng ●◐○ · ⦿ Gần nhất mặc định (đang mở vào T10 trống trong khi số liệu mới nhất 07/10 / chốt T9) · mỗi ngày có dữ liệu 1 cột, mới nhất bên phải · cột chốt `30/09/2026 · T9 · chốt` · ⇔ Tổng quan chỉ cột chốt mọi tháng, canh phải, bấm lại để về · **▾ Thu gọn ↔ ▴ Bung ra 1 nút, bỏ nút "2 tháng"** (anh nhắc: đã chốt mà chưa làm) · mũi tên ▲▼ ghi "so với dd/mm/yyyy" · **bỏ dòng cảnh báo vàng "T10/2026 chưa Đạt — thiếu n file…"** (anh: tab Nạp không cần; trạng thái thể hiện bằng dấu trên dải lịch + rê chuột) · tên báo cáo dài bị cắt ("Nợ đến hạn phân kỳ (NOXH") → 2 dòng / chữ nhỏ.
2. **Lỗi màu nền tối ở ma trận Nạp & KT:** chip ngày ("07/10") nền trắng chữ sáng không đọc được; nút ⊕ ở cột Theo ngày tròn trắng chói.
3. **Bảng tab Tổ (bảng các tổ + danh sách khách):**
   - cột **vừa nội dung, chữ canh trái, tiền canh phải**; không cột nào giãn thừa (hiện cột Tổ trưởng / Họ tên giãn quá rộng, cột số bị ép tiêu đề 3–4 dòng; danh sách khách cột Lưu ý bị cắt — tràn ngang);
   - **còn dư bề ngang → tự thêm cột thông tin vào cuối cho trọn màn hình**, không bao giờ tràn ngang. Bảng các tổ ưu tiên: Số món vay → Tỷ lệ QH % → Dư nợ BQ / hộ → Điểm GD → Nợ lãi → Món đến hạn tháng sau → Số khách CCCD hết / sắp hết hạn → Số khách chưa có TK 105. Danh sách khách ưu tiên: Ngày vay gần nhất → Ngày đến hạn → Hạn CCCD (ngày) → Ấp → Ngày sinh → Số món → Lãi tồn → QH / khoanh (tiền);
   - **⚙ Cột: mỗi cột 3 lựa chọn Tự động / Luôn hiện / Ẩn** (nhớ);
   - **in vừa A4**: In = bộ cột chính cố định (bảng tổ A4 dọc 10 cột như 3.161; danh sách khách A4 ngang ~12 cột: STT · Mã KH · Họ tên · CT vay · Dư nợ · Nợ lãi · Số dư 105 · Số TK 105 · SĐT · CCCD · Lưu ý · Ghi chú); In đầy đủ = cột đang hiện, tự co chữ vừa A4 ngang; Excel đủ cột.
4. **Chip báo trạng thái số liệu** (các tab xem số liệu Tổ, KTGS, Sao kê, Tổng hợp, Tra cứu — KHÔNG ở tab Nạp): bỏ các hàng vàng riêng, thành chip nhỏ cuối hàng Xã (trước 📍): `⚠ Dùng T9/2026` (rê chuột đủ câu, bấm → Nạp & KT đúng tháng) · `BC0437 ✓` `BC0438 ✓` (KTGS; ⚠ cam khi thiếu / lệch kỳ); ghi chú 📌 giải ngân KTGS ("T10 chưa có Mẫu 31 cuối tháng — lấy món GN đến 07/10…") thành chip cạnh ô chọn tháng. Ô kỳ đầu trang thêm ⚠ khi tháng chọn chưa có số liệu.
5. **Chip tổ (hàng Tổ của bộ lọc) kèm tên ấp chữ nhỏ, màu nhạt**: ấp tên chữ bỏ "Ấp" / "KP" ("Thuận An", "Lộc Khê"); **ấp / KP tên là số giữ chữ** ("ấp 1", "KP 2" — anh: ấp 1–5 không có chữ khó hiểu); rê chuột: "Tổ … · Ấp … · mã … · n tổ viên"; ô "Chọn tổ ▾" ghi giống.
6. **Cách viết tiền trong bảng — CHỜ ANH CHỐT:** em phân tích biểu chuẩn (mục 2.2): BCDHTD 01.1 / 01.2, B32, Mẫu 06 / 16 đều **triệu đồng 2 số lẻ**; LEN_31 đồng. Đề xuất: **bảng + bản in = triệu đồng 2 số lẻ CỐ ĐỊNH kể cả số chẵn (`3.679,00`) cho thẳng cột** như biểu TW; số 0 để trống; câu chữ ngoài bảng viết gọn (5,40 tỷ, 819 tr); Excel số thật định dạng `#,##0.00`. (Đổi so với quy tắc "chẵn bỏ ,00" đã làm ở `soTr` 3.161 — nếu anh chốt thì sửa `soTr` cho bảng.) Em có nhờ anh xem 1 trang 01.1 in gốc xem số chẵn có ghi ,00 không.

## 2. Việc đã duyệt hướng — chưa làm (thứ tự đề xuất)

### 2.1 Tab 📊 Tổng hợp — sửa lọc + bố trí lại (ưu tiên: có lỗi số liệu)
Anh: *"các báo cáo chưa phân cấp đúng, số liệu luôn ra cả PGD, em cũng xem bố trí lại"*.
- **Lỗi thật:** báo cáo **Theo nguồn vốn** (`thBaoCao('nv')`, `js/22-so-lieu.js`) chỉ lọc đến **xã** — chọn Điểm GD / Hội / Tổ vẫn ra số cả xã (Hội toàn PGD ra cả PGD). Sửa: lọc bằng `pvLoc(S, tổ)` như báo cáo `tk` (Lọc sâu) — Mẫu 31 có đủ tổ.
- BCDHTD 01.1 / 01.2 là biểu TW: chỉ chia đến xã (01.1) / chỉ toàn PGD (01.2) — **đúng bản chất**, nhưng phải nói rõ (xem dưới).
- LEN_31 (`dv`, `hoi`, `ctx`, `to`, `tg`): đọc mã thấy `hoi` / `to` lọc được; `dv` dòng xã là số cả xã; `ctx` không chia điểm / tổ. **Chưa thử bằng số** vì bộ giả chưa có file LEN_31 → cần thêm file LEN_31 giả vào `tests/taogia.py` (cấu trúc xem `slDocFile` nhánh `lx / lh / lc / lt`).
- **Bố trí anh duyệt:**
  - danh sách báo cáo chia 3 nhóm: **Chuẩn TW** (01.1, 01.2) / **LEN_31** / **Tính từ Mẫu 31** (Nguồn vốn, Lọc sâu); mỗi báo cáo có **nhãn cấp** `[PGD·Xã]`, `[→Tổ]`…;
  - **mỗi lần chọn 1 báo cáo** (◉, không còn ☐ nhiều cái) → **xem ngay ở khung bên phải** (bỏ nút Xem + hộp xem); app nhớ báo cáo đang chọn; lần đầu tự chọn báo cáo đầu tiên đủ file; dữ liệu cũ tích nhiều → giữ cái đầu;
  - **bỏ hẳn in / xuất nhiều báo cáo 1 lần** (anh: "ko cần in 1 lần nhiều báo cáo");
  - phạm vi đang chọn sâu hơn khả năng báo cáo → báo cáo mờ + đầu bảng dòng vàng "Biểu này chỉ chia tới xã — đang hiện số cả xã. Xem 'Lọc sâu' để có số Hội ND";
  - dòng cộng ghi đúng phạm vi ("Cộng Hội ND – Phường Gia Lộc", không "Cộng xã").
- Phép thử mới: 5 phạm vi (PGD / xã / xã+điểm / xã+Hội / Hội toàn PGD) × từng báo cáo, so dòng cộng.

### 2.2 Cách viết số chung toàn app (anh: "theo em")
- Dấu chấm phân nhóm, dấu phẩy phần lẻ; **số chẵn bỏ phần lẻ** (`12.910`), **lẻ bỏ 0 thừa** (`1.234,5`), **0 để trống trong bảng**, dòng cộng ghi `0`.
- Đã có hàm `soTr(n, giu0)` / `soTrDau(n)` (triệu đồng, 3.161) — dùng cho bảng Tổ. Còn: **Tổng hợp** (`thTr(n, 2)` đang in luôn 2 số lẻ — `tests/t105.js` đang kiểm `/1,00/`, sửa phép thử theo), Sao kê, KTGS, kết quả kiểm tra, ma trận Nạp & KT (`tdnTr` "12,91 tỷ" / "185,8 tr").
- **Excel giữ số thật** (đồng) — chỉ đặt định dạng ô `#,##0.##`.

### 2.3 Tab 📥 Nạp & KT — dải lịch + cột theo ngày (anh đã chốt từng ý)
1. **Dải lịch tháng nằm ngang** thay `‹ T9 · T10/2026 ▾ · T11 ›`: mỗi tháng 1 ô, dấu dưới ô **● Đạt · ◐ thiếu/lệch · ○ chưa nạp**; bấm tháng = chọn; ‹ › trượt dải; tháng chọn sáng như cột ma trận.
2. Nút **⦿ Gần nhất** (mặc định khi mở tab): về tháng / ngày có số liệu mới nhất.
3. **Cột theo thời gian, mới nhất bên phải**: `30/09/2026 (chốt T9) | 05/10/2026 | 12/10/2026 | … | 31/10/2026 (chốt T10)`.
   - **Có dữ liệu ngày nào thì hiện cột ngày đó** (không gom, không giới hạn) — chỉ các ngày của tháng đang chọn.
   - Cột mới nhất sát phải, sáng; tràn thì tự cuộn về phải.
   - **Ghi đủ ngày/tháng/năm** `31/10/2026`; cột chốt 2 tầng: `31/10/2026` đậm + `T10 · chốt tháng` nhỏ, viền đậm hơn; cột ngày nền nhạt. File chốt mà ngày số liệu ≠ cuối tháng → ⚠ trên ô.
4. **⇔ Tổng quan:** ẩn hết cột ngày, chỉ cột chốt của **mọi** tháng có số liệu, canh phải, cuộn sẵn về tháng mới nhất (cột tên báo cáo đứng yên).
5. **Thu gọn / Bung ra = 1 nút** (`▾ Thu gọn` ↔ `▴ Bung ra`, về đúng kiểu đang xem); ⇔ Tổng quan cũng bấm lần nữa để về; **bỏ nút "2 tháng"**.
- Mã hiện tại: `slDsKy`, `slMtKieu`, `slNapThanhHTML`, `veSoLieu` phần nạp (`js/22-so-lieu.js`), CSS `.sl-luoi`, `.sl-cot`, `.sl-mt-*`. Phép thử liên quan: `t152`, `t146`, `t106`, `t140`, `t102`.

### 2.4 Kết quả kiểm tra theo cấu trúc ma trận (sau 2.3)
- Khung "🔍 Kết quả kiểm tra" dùng **cùng dòng (nhóm Ⓑ Ⓐ Ⓓ Ⓚ, từng file), cùng cột (ngày) với ma trận**, gập / mở nhóm theo ma trận, cuộn ngang cùng ma trận.
- Mỗi ô: `✓ n · ⚠ n · ⓘ n`; bấm ô → bung các mục kiểm tra của file đó ở kỳ đó ngay dưới dòng; bấm mục → bảng chi tiết (xã nào lệch…). Mục so 2 file hiện ở dòng file đứng trước, dòng kia "↗ xem ở …".
- **Chip lọc** Tất cả / ✓ Khớp / ⚠ Chênh lệch / ⓘ Lưu ý (có số đếm) — **mặc định chỉ ⚠ + ⓘ**, không có chênh thì Tất cả; **▾ Bung ra / ▴ Thu gọn 1 nút** (nhớ); **⊞ Mở hết / ⊟ Gập hết**; 🔎 tìm mục; bấm dấu ⚠ trên ô ma trận → nhảy tới đúng ô bảng kiểm tra.
- Dữ liệu: `SLM.kt[ky]` (`slKiemTra`), `SLM.ktg[ky]` (`ktKiemTra`), map mục → file `SL_KT_KHOP` / `slKTO`.

### 2.5 📋 Chép n file (cầu nối) + sửa nút Gửi trên máy tính
Anh: *"lúc trước bấm gửi file hiện hộp thoại Windows có nút Sao chép"*, *"em làm chức năng bắc cầu như trước được không"*.
- **Cầu nối còn nguyên** (`js/12-scan.js`: `taiBoCaiCauNoi`, `goiCauNoi`, `chepMot`, `chepNhieu`, lệnh `chepn` tối đa 20 file / lần, `chepTiep`). Nút **"☑ Chọn chép"** (`nutChepNhieu`, `js/06-hop-thoai.js`) **bị rơi ở 3.151** (không nơi nào gọi).
- Làm: thanh chọn nhiều (`thanhBot`, chế độ 🗑) có **cả 📋 Chép n file và 🗑 Xóa n file** (bỏ chọn chế độ riêng):
  1. có cầu nối → `chepNhieu` (như cũ, "📋 Chép tiếp" khi > 20);
  2. chưa cầu nối → `navigator.share({files})` (Windows 11 Chrome / Edge mở hộp chia sẻ có nút **Sao chép**) + dòng nhắc cài cầu nối;
  3. không có hộp chia sẻ → tải về, báo rõ.
  Điện thoại: 📤 Gửi n file. File chưa lên Drive → báo "n file chưa lên Drive — ☁ Đồng bộ ngay", còn lại vẫn chép. Áp dụng Văn bản, Biểu mẫu, Scan, Chữ ký·CCCD.
- Nút 📤 Gửi ở khung xem 1 file trên máy tính: mở lại hộp chia sẻ Windows (hiện `laMayBan()` chặn → chỉ tải về; 15 chỗ dùng `laMayBan()`).

### 2.6 Đề xuất chưa được anh trả lời
- Bảng dài ở **Sao kê / KTGS**: làm khung cuộn + nút đầu bảng như tab Tổ (em hỏi "nếu anh đồng ý" — anh chưa trả lời) → hỏi lại.
- Chip "Mới vào tổ T8" vẫn ghi tháng (dòng tóm tắt đã ghi đủ ngày) — có thể đổi sang ngày nếu anh muốn.

### 2.7 Lỗi hoiquy chập chờn (chưa tìm ra)
- `tests/hoiquy.js` mục **"Báo cáo đã bỏ không tự quay lại khi mở lại app"** đôi khi trượt (`{"co":1,"daBo":["NK"]}`) — chỉ khi chạy **cả loạt** / máy nặng; chạy riêng luôn đạt (đã thử ≥ 6 lần). `tests/README.md` cũng ghi hoiquy "thỉnh thoảng 27/28 do chờ cố định".
- Nghi: phép thử `reload()` sau 900 ms; nếu trên máy thật cũng có lúc cấu hình vừa đổi bị mất khi tải lại trang quá nhanh thì là lỗi thật. Hướng điều tra: ghi vết `localStorage.setItem` (đã thử, lần đó lại đạt), xem có đường nào ghi `D` cũ / đọc bản dự phòng khi khởi động (`khoiDong`, `js/20-khoi-dong.js`; `luu`, `js/02-nen.js`).

## 3. Trạng thái các bản gần đây (chi tiết: `docs/CHANGELOG.md`)
| Bản | Nội dung | Phép thử |
|---|---|---|
| 3.156 | Nạp & KT gọn 2: 1 nút nạp (Ⓚ KTGS trong ma trận), ma trận kẻ ô, 2 tháng / Tổng quan / Thu gọn, tự kiểm ngầm + dấu ✓ ⚠ | t152 |
| 3.157 | Khung xem phải sát đáy + ⊡ Vừa trang; lọc số liệu hàng chip; Tổng hợp Nguồn vốn chip; lọc file bảng lọc dưới thanh | t153 |
| 3.158 | Khai báo Hội vừa 1 trang; tên Hội cấp xã + KH Hội tỉnh sang Chuẩn hóa (1 lần / Hội + riêng xã, chuyển cũ) | t154 |
| 3.159 | Chân thanh bên đủ chữ; nút ◐ / ☀ / ☾ chế độ tối; rà màu cứng | t155 |
| 3.160 | Lọc số liệu chung: dòng 📍 (bấm tên đổi, ✕ bỏ) + ① Xã › ② Điểm GD · Hội › ③ Tổ; Tra cứu bỏ khung gập; nền tối ô nhập | t156 |
| 3.162 | Tinh chỉnh lọc: hàng Xã luôn hiện (đang chọn xanh, bấm PGD quay lại) + 📍 chỉ báo cùng hàng; Điểm GD │ Hội 1 dòng; Tổ chip + ô sổ xuống | t156 |
| 3.161 | Tab Tổ: chip 3 nhóm ≤ 2 dòng, nút đầu bảng, khung cuộn, kẻ ô, triệu đồng, ⚙ Cột, In A4 dọc / đầy đủ A4 ngang, ngày đủ, cảnh báo in đậm + cột Lưu ý | t157 |

Lỗi đã biết: `t116` trượt 1 mục từ trước (không liên quan); hoiquy chập chờn (mục 2.7).

## 4. Quy trình mỗi bản (đã dùng từ 3.145)
1. Code trên nhánh làm việc; `python3 tests/kiem.py` phải sạch (chỉ được báo `CompressionStream, DecompressionStream, Response`).
2. Viết phép thử mới `tests/tNNN.js` (dữ liệu giả `tests/gianho31` …, chuẩn bị theo `tests/README.md`), chạy các phép thử cũ liên quan (grep tên hàm / lớp CSS đã đổi trong `tests/`).
3. Nâng bản: tạo spec JSON theo mẫu `tools/mau_spec.json` (khóa: `ban`, `cu`, `moi` [chữ, lệnh demo] cho hộp "Có gì mới", `changelog`, `bangiao` (bảng thử máy thật + ghi chú kỹ thuật), `readme` (dòng bảng phép thử), `batdau` (mục 3 BAT_DAU)) rồi `python3 tools/bump.py spec.json` — tự đổi `APP_BAN` / `APP_LUC` (`js/02-nen.js`), `?v=` (`index.html`), `tests/hoiquy2.js`, `CO_GI_MOI` (`js/06-hop-thoai.js`), CHANGELOG, BAN_GIAO_VIEC_CON_LAI, tests/README, BAT_DAU.
4. `python3 tests/bando.py` (cập nhật `docs/BAN_DO_MA.md`), commit, push.
5. Hồi quy toàn bộ: `bash tools/hoiquy.sh <tên>` (~1 giờ, chạy nền, **không chạy gì nặng song song**), đọc `/tmp/tuhoso_hq/hq<tên>/tong.txt` — dòng nào `✗=` khác 0 là trượt (kể cả mã thoát 0).
6. Gộp: tạo PR vào `main` → merge (kiểu merge) → `git fetch origin main && git rebase origin/main && git push -f` nhánh làm việc.
7. Báo anh: những gì đã làm, phép thử, việc anh cần thử trên máy thật (bảng trong `BAN_GIAO_VIEC_CON_LAI.md`).

## 5. Bản đồ mã hay đụng (chi tiết: `docs/BAN_DO_MA.md`)
- `js/22-so-lieu.js` (rất lớn — **grep, đừng đọc cả file**): Nạp & KT (`veSoLieu`, `slNapThanhHTML`, `slDsKy`, `slKiemTra`, `slTuKiem`), lọc chung (`pvVeCay`, `pvLuaChon`, `pvChon`, `pvMo`, `pvLoc`, `PV_DUNG`), tab Tổ (`toVe`, `toVeThe`, `toPVHTML`, `toBangToHTML`, `toBangPGDHTML`, `toBangHTML`, `TO_COT`, `toBangXuat`, `toDsTVHTML`, `toDsPVHTML`, `toBCDS`, `toBCDSPV`, `toCanh`, `toCCCDHan`, `TO_LOC`), KTGS (`kt*`, Khai báo Hội `ktHdtBang`, Chuẩn hóa `ktChuanHTML`, `ktChuanRiengHTML`), Tổng hợp (`veTongHop`, `thBaoCao`, `TH_BC`, `thXem`), Tra cứu (`slTraHTML`, `slTraTim`).
- `js/11-khung-tab.js`: đầu tab file (thanh lọc, chip kiểu xem, `boLocHTML`).
- `js/06-hop-thoai.js`: thanh chọn nhiều (`thanhBot`, `BOT`), cài đặt, `CO_GI_MOI`.
- `js/12-scan.js`: cầu nối Windows (`scriptCauNoi`, `goiCauNoi`, `chepNhieu`), `laMayBan`.
- `js/23-dieu-huong.js`: thanh bên, ô trạng thái (`ttVe`, `ttNghi`), nút giao diện (`dhDoiGD`).
- `css/app.css`: thêm khối CSS mới ở **cuối file**, ghi số bản trong chú thích.

## 6. Mẹo kỹ thuật đã rút ra
- Chế độ tối: biến màu ở `:root` (`--nen`, `--the`, `--chu`, `--do-nen`…), `color-scheme:dark` cho ô nhập; đừng viết màu cứng `#fff` / pastel — dùng biến. Bản in (`TO_IN_CSS`, `TDN_IN_CSS`, khuôn Word) giữ trắng đen.
- Bảng có `td:first-child{min-width:150px}` toàn cục (CSS cũ ~dòng 1219) — bảng mới cần ghi đè `min-width:0`.
- Tự kiểm ngầm (`slTuKiem`) chỉ vẽ lại khi đang ở tab Nạp & KT; phép thử muốn tắt: `window.SL_KHONG_TU_KIEM = 1`.
- Chụp màn hình kiểm giao diện: viết script Playwright nhỏ (mẫu: các `tests/t15x.js`), viewport 1536×730, nạp `tests/gianho31`.
