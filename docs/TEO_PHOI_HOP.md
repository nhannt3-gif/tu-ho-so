# Tèo — bộ não công việc của anh Nhân · phối hợp App Tủ hồ sơ ↔ Giao ban

> **Bản 1.0 · 28/10/2026** · soạn từ phiên Project giao ban (chat) 28/10/2026, anh Nhân duyệt từng ý trong phiên.
> **Đọc file này trước** khi đụng tới: nạp file / kho số liệu gốc · luật số liệu dùng chung (tổ viên, điểm GD, 3 tháng KHĐ…) · cây điểm giao dịch từ 11/2026 · báo cáo chuyển giữa app và giao ban.
> File này **chỉ ghi định hướng và việc đã thống nhất**. Mọi sửa code vẫn theo quy trình repo: lên kế hoạch → anh duyệt → anh nhắn "code" → PR → anh nhắn "gộp".
> Repo công khai: file này **không có dữ liệu khách, tên tổ trưởng, mã tổ** — chỉ số đếm tổng.

---

## 1. Tèo là gì

**Tèo** = tên anh Nhân đặt cho "bộ não công việc" (anh chốt 28/10/2026: "rất Việt Nam" — như JARVIS của Iron Man): **một kho số liệu, một bộ luật, hai tay làm việc**.

| Phần | Vai trò | Ở đâu |
|---|---|---|
| **Tủ hồ sơ (app)** | Kho và trí nhớ: **nạp file, kiểm ngày, đặt tên**, tra cứu, lọc, bảng biểu, **báo cáo thuần số liệu theo khuôn cố định** (01/DS, danh sách giải ngân, sao kê…) | repo này · Drive `Tủ hồ sơ` |
| **Giao ban (Project chat)** | Giọng nói: **phân tích, nhận định, đề xuất đúng thực trạng**, văn bản hành chính theo mẫu TW (Nội dung họp, Thông báo KL mẫu 08/GDX, báo cáo BĐD) | Project claude.ai "THHD - Hop giao ban" · Drive `0 Hop giao ban` (script Python ở `06_CONG_CU\v2`) |
| **Repo (file này + sổ quy tắc)** | Nơi ghi chung: luật số liệu, phối hợp, việc giữa hai bên | `docs/TEO_*.md` |

Hai cách anh giao tiếp = **hai cửa vào cùng một bộ não**: (1) chat Project giao ban, (2) Claude Code trên repo app.

## 2. Ba luật giữ "một bộ não"

1. **Một nơi ghi quyết định chung:** `docs/TEO_PHOI_HOP.md` (file này) + `docs/TEO_QUY_TAC_CHUNG.md` (sổ luật số liệu QT-xx — **lập ở bước B2, sau khi anh chốt mục 6**). Anh chốt ở cửa nào cũng ghi về đây. Luật **riêng** giữ chỗ cũ: giao diện / kho app → `QUY_CHUAN_KIEN_TRUC.md`; văn bản giao ban → `QUY_CHUAN_GIAO_BAN` (Drive). Hai file riêng chỉ ghi "theo QT-xx".
2. **Mở phiên ở cửa nào cũng đọc sổ chung trước** (app: dòng trỏ đầu `CLAUDE.md`; giao ban: bước "Đọc trạng thái").
3. **Cùng một bộ lệnh, cùng nghĩa:** "Đọc trạng thái" · "Chốt QT: …" · "Chốt phiên" · "code" · "gộp".

Giữ hai bên không lệch (anh duyệt hướng 28/10): **chung sổ quy tắc + chung bộ phép thử** (dữ liệu giả + đáp án cho từng QT; hàm JS của app và hàm Python của giao ban đều phải ra đúng đáp án — như các trình duyệt cùng chạy một bộ test chuẩn web). Mỗi QT có số bản; đổi QT thì cả hai bên qua phép thử trước khi dùng cho kỳ mới. Kiểm số thật (kỳ 30/09/2026) làm riêng, không đưa vào repo.

## 3. Bộ file nạp chung (anh chốt 28/10/2026)

Nguyên tắc: **nạp ít file nhất, còn lại tự tính từ Mẫu 31.** Hai bên dùng **đúng một bộ**.

| Nhóm | File | Ghi chú |
|---|---|---|
| **① Hằng tháng, bắt buộc** | **Mẫu 31** (31 – Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu) | Nguồn tính duy nhất |
| | **File Tổ trưởng** (danh sách tổ hệ thống: NGAYBC, MADGD/TENDGD, MADP thôn, DVUT, MATO, MATT, CMT, NGAYCAP, TK104, MATP…) | **Thay DSTO** (anh chốt). Dùng làm danh bạ tổ + **điểm GD, mã thôn, Hội, tổ trưởng, tổ phó**. **Không lấy số liệu** từ file này (DUNO trống nhiều tổ, SOTV trống) |
| | **Chấm điểm tổ: CLT02** (chuẩn TW) | BC0437 chỉ dự phòng khi chưa có CLT02 / số phụ cho KTGS. Cần hỏi: hệ thống có xuất CLT02 Excel toàn PGD không |
| **② Theo phiên** | **Mẫu 31 ngày phiên** + File Tổ trưởng cùng ngày | Mẫu 31 theo ngày **xuất được** (đã có file thật ngày 19/10, 25/10/2026) |
| **③ Kiểm chuẩn TW, cuối tháng** | 3 tháng KHĐ **mẫu 14** (thống nhất, bỏ 08/KTNB) · 6 biểu TW (BCDHTD 01.1/01.2, LEN_31 ×4) · Mẫu 01/TV | Chỉ để **kiểm khớp**, không lấy số |
| **④ Theo việc** | LEN18 (01/DS, danh sách giải ngân) · Nợ khoanh (ngày hiệu lực, nguyên nhân) · Nợ đến hạn phân kỳ (kỳ con CV 597) · Sao kê TK 104/105 (in) · BC0438 (KTGS) | Có việc mới nạp |
| **⑤ Thôi dùng** | Dư nợ chi tiết (điểm GD đã có ở file Tổ trưởng) · DSTO · Thông tin tổ trưởng (cũ) · Nợ quá hạn · Nợ đến hạn (file) · KQGD · THTHDCS 01B · Tổng dư nợ theo CT · B32 · Mẫu 10 · Mẫu 7 | Các tháng cũ vẫn đọc được để tra |

**Trường tự tính từ Mẫu 31 + File Tổ trưởng:** điểm GD · cây ấp/tổ/Hội · tổ viên (+ 01/TV) · 3 tháng KHĐ · NQH + ngày chuyển QH · nợ đến hạn · khoản vay mới · số tháng lãi · tiết kiệm thấp · tổ cần đóng.

## 4. Kho "Số liệu gốc" — app tạo, nạp qua app (anh chốt 28/10/2026)

- **Anh nạp file qua app**; app là "cửa nhập kho" duy nhất: kiểm ngày số liệu, đặt tên chuẩn, lưu. **Giao ban chỉ đọc.**
- **Nơi lưu + tên chuẩn (anh chốt 28/10, app làm ở bản 3.400):** `Tủ hồ sơ\Số liệu\<YYYY-MM>\<MÃ>_<YYYY-MM-DD>.<đuôi gốc>` — **loại trước, ngày sau** (anh: "tên file trước rồi đến phân loại theo thời gian"); giữ thư mục `Số liệu` app đang dùng (không lập `Số liệu gốc`, khỏi dời tháng cũ).
  - Ví dụ: `MAU31_2026-10-31.xlsx` (cuối tháng) · `MAU31_2026-10-19.xlsx` (kỳ phiên) · `TOTRUONG_2026-10-31.xlsx` · `KHD14_2026-10-31.xlsx` · `BCDHTD011_2026-10-31.xls`. Danh mục MÃ đủ: `docs/FILE_XUAT_HANG_THANG.md` mục F.
  - Anh đặt tên nhanh thế nào cũng được — app nhận loại theo **nội dung**, ngày theo **trong file**, tự đổi sang tên chuẩn; tên anh đặt giữ ở mô tả file Drive + sổ nạp. File tháng cũ: ⋯ › 🏷 Chuẩn hóa tên (anh bấm mới đổi).
- **Ngày trong tên = ngày số liệu** — app đọc trong file (cột Ngày số liệu / NGAYBC / dòng tiêu đề), không lấy ngày xuất. Thư mục tháng theo ngày số liệu. Không đọc được ngày → hỏi anh, không đoán.
- **Ngày số liệu kỳ phiên (anh chốt):** Mẫu 31 của phiên 19/10 mang ngày **19/10** = số liệu đến cuối ngày 19/10 sau khóa sổ (anh xuất file ngày hôm sau). Ngày trong file khác ngày trong tên → báo, không tự sửa.
- **Mẫu 31 và File Tổ trưởng phải cùng ngày** (anh chốt: cùng ngày thì logic khớp) — lệch ngày thì app **báo** (xem trước + cột Kiểm của sổ), không tự ghép.
- **Sổ nạp mỗi tháng `DANH_MUC_NAP.csv`** (có từ 3.400, trong thư mục tháng, mở bằng Excel; cột: Tên chuẩn · Tên anh đặt · Mã · Loại · Kỳ Cuối tháng / Theo ngày · Ngày số liệu · Ngày lấy từ · Số dòng · Ngày nạp · Kiểm · Lần thay · Tên trước khi thay): mỗi dòng = tên gốc · tên chuẩn · loại · ngày số liệu · ngày nạp · kết quả kiểm (✓ / lý do). Giao ban đọc sổ này thay vì dò tên file; giữ tên gốc → vẫn đúng nguyên tắc "không đổi tên file gốc" của giao ban.
- Bản app đã đọc (`_Hệ thống\so_lieu\…json.gz`) vẫn là của app; giao ban **không** đọc định dạng nội bộ này. Về sau, khi app ổn định, có thể có "gói số liệu kỳ" với định dạng + số phiên bản rõ ràng để giao ban đọc thẳng.

## 5. Điểm giao dịch từ tháng 11/2026 (anh xác nhận 28/10/2026)

Toàn PGD **giảm 3 điểm (12 → 9)** — bỏ các điểm giao dịch **ngày 06, 07, 12**:

| Điểm bỏ (ngày) | Gộp vào |
|---|---|
| Gia Lộc 2 (07) | **Gia Lộc**, giao dịch ngày **23** |
| Gia Bình (12) | **Thanh Phước** |
| Phước Trạch (06) | **Phước Thạnh** (ngày giao dịch: chờ anh cho) |

Còn 9 điểm: Gia Lộc · Truông Mít · Truông Mít 2 · Phước Thạnh · Phước Thạnh 2 · Thạnh Đức · Cẩm Giang · Phường Gò Dầu · Thanh Phước.

- **Điểm GD của tổ = mã điểm trên File Tổ trưởng cùng ngày.** Ngày GDXA của Mẫu 31 chỉ dùng suy điểm cho **món vay trực tiếp** (không tổ). Anh cho biết Mẫu 31 sẽ đổi logic theo cơ cấu mới.
- Bảng "điểm bỏ → điểm nhận" ở trên chỉ là **dự phòng** khi file chưa cập nhật; áp **từ kỳ số liệu tháng 11/2026**, các tháng cũ giữ nguyên.
- So file Tổ trưởng 27/10 với DSTO 10/10: 49 tổ đã đổi điểm (Gia Lộc 2 → Gia Lộc 18 · Gia Bình → Thanh Phước 21 · Thanh Phước → Phường Gò Dầu 10); Phước Trạch lúc đó chưa chuyển. Phần lớn chênh lệch giữa hai file là do **khác ngày**, không phải lỗi dữ liệu.
- **Lưu ý ngưỡng ≤ 30 tổ / điểm (TB 1006):** sau gộp, Gia Lộc ≈ 46 tổ, Phước Thạnh ≈ 54 tổ → đèn đỏ; báo cáo nêu "sau gộp điểm, tiếp tục sắp xếp Tổ theo hướng dẫn" (chờ anh xác nhận có văn bản cho ngoại lệ hay không).

## 6. Luật số liệu — bảng đối chiếu (bước B1, 28/10/2026)

So trên: app (repo bản gộp PR #387 — `QUY_CHUAN_KIEN_TRUC.md` mục 4, `DU_LIEU_THANG.md`, `js/22-so-lieu.js`, `js/22g-to.js`, `js/76-sk-danh-sach.js`, `js/22d-ktgs-04.js`) và giao ban (Quy chuẩn 2.1, `bang_so_lieu.py` v1.2, `tong_hop.py`). **Mới so luật và mã, chưa chạy số** (trừ số tổ viên lấy từ nhật ký giao ban).

### A. Trùng — chỉ cần ghi vào sổ chung
1. Mẫu 31 là nguồn chi tiết; khế ước lặp dòng (nhiều sổ 105) → dư nợ 1 lần / khế ước.
2. **Cho vay = Giải ngân tháng − Đảo khoản GN tháng; Thu nợ = TH + QH + khoanh** (khớp BCDHTD).
3. Lãi tồn = Lãi tồn TH + QH (không gồm lãi tồn ân hạn).
4. Số tháng lãi = lãi tồn ÷ (dư nợ × lãi suất năm ÷ 12) (ngưỡng là luật riêng từng báo cáo: KTGS > 6; giao ban 3 / 6 / 12).
5. Xếp loại theo điểm: < 50 Yếu · < 70 Trung bình · < 85 Khá · ≥ 85 Tốt. Mã ĐVUT 11 HND · 12 HPN · 13 HCCB · 14 ĐTN.
6. Mã tổ là khóa; cây địa bàn dựng theo kỳ.
7. Hai nguồn lệch → báo, không tự chọn, không sửa nguồn.

### B. Khác — **chờ anh chốt** (kèm khuyến nghị)
| # | Nội dung | Giao ban | App | Khuyến nghị |
|---|---|---|---|---|
| K1 | Tổ viên | còn dư nợ + tất nợ còn TK 105: 18.636 / 369 tổ (30/09) | QT-18: + khách chưa giải ngân + bù Mẫu 01/TV: 18.816 / 370, khớp 100% TW | **Theo QT-18** |
| K2 | Điểm GD món vay trực tiếp | theo ấp | xã + ngày GDXA của món | **Theo app** (ấp có thể chia 2 điểm) |
| K3 | Điểm GD của tổ | suy từ xã + GDXA phần lớn dư nợ | mã điểm trên file (nay là File Tổ trưởng) | **Theo file** (mục 5) |
| K4 | Khoản vay mới (kiểm tra 30 ngày, HD 727 "giải ngân kỳ đầu") | giải ngân lần 1 | mọi món có GN trong tháng, kể cả HSSV lần sau | **Lần 1**; lần 2+ thành danh sách theo dõi riêng |
| K5 | Món 3 tháng KHĐ | so ngày "trước hẳn" mốc lùi 3 tháng; nước sạch mã QĐ 37 < 9 tháng từ Ngày vay; loại mọi món khoanh; trống ngày GD kỳ giữa tháng lấy Mẫu 31 cuối tháng trước | MONTHS_BETWEEN kiểu Oracle; chưa GD lần nào tính từ ngày GN đầu; ân hạn CT 06 (6+3), CT 05/07/18 (60+3), CT 01 SC2/MC2/LC2 (24+3); loại lãi suất 0; khoanh chỉ loại khi gia hạn trong tháng | **Chạy cả hai hàm trên các kỳ có file TW** rồi chọn; dự kiến hàm app làm gốc + điều kiện kỳ giữa tháng của giao ban |
| K6 | Ngày chuyển QH khi hệ thống trống | ngày đến hạn cuối | kỳ GDXA đầu tiên sau ngày đến hạn | **Cột "Ngày ĐH theo GDXA"** của Mẫu 31 |
| K7 | Nợ đến hạn tháng tới | chỉ cột "Ngày ĐH theo Gia hạn" (nguy cơ sót nếu trống) | GH có thì dùng, không thì HĐ; + kỳ con phân kỳ CV 597 | **Theo app** |
| K8 | Tổ trưởng | tên theo Mẫu 31 cuối tháng | danh sách tổ hệ thống (mã KH TT) | **Theo File Tổ trưởng**, không có mới lấy Mẫu 31 |
| K9 | Thứ bậc nguồn tổng hợp | tính từ Mẫu 31 | lấy thẳng biểu TW cấp PGD / xã | Giao ban giữ cách tính + **thêm bước kiểm khớp từng xã** với BCDHTD |

### C. Chỉ một bên có
- **Giao ban có → đề xuất đưa vào sổ chung:** mức A–D NQH (KH 1166) · đèn tín hiệu (ngưỡng KH 1166, VB 4289, TB 1006, QĐ 70) · tiết kiệm < 500 nghìn · khoanh sắp hết hạn trong 120 ngày · món sắp đến hạn lãi tồn > 3 tháng lãi · lãi tồn chỉ so tháng trước. Giữ riêng: ghép CLT02, theo dõi đổi tổ trưởng.
- **App có → đề xuất đưa vào sổ chung:** QT-03/04/05/14 (ra khỏi tổ, chuyển tổ, KU hủy / chưa GN, cần cho ra) · kỳ con phân kỳ CV 597 · còn được gia hạn (½ thời hạn) · số lượt KH vay. Giữ riêng: QT-10…13, QT-15…17.

## 7. Phân vai báo cáo (anh chốt 28/10/2026)

| Việc | Hiện ở | Về sau |
|---|---|---|
| Mẫu 01/DS (HSSV) · danh sách giải ngân LEND18 | giao ban | **app** |
| Danh sách phụ lục (NQH, khoanh, 3 tháng KHĐ, nợ đến hạn) | giao ban | app (sau) |
| Bảng số liệu chuẩn, đèn tín hiệu | giao ban | cân nhắc sau |
| Nội dung họp, TB KL, BĐD — nhận định, đề xuất, kiến nghị | giao ban | **giao ban** |

**Nguyên tắc chuyển:** giao ban giữ chức năng cũ cho tới khi app làm ra **cùng kết quả** trên một kỳ thật và anh xác nhận — rồi mới thôi bên giao ban. Không bỏ trước.

## 8. Việc đề xuất cho app (TK 2) — chờ anh duyệt theo quy trình repo

1. ✓ **3.400** (trừ CLT02 / LEN18 chờ file mẫu) — **Kế hoạch kho "Số liệu gốc" + nạp qua app** (mục 4): tạo thư mục, đặt tên chuẩn, đọc ngày số liệu trong file, kiểm cặp Mẫu 31 + Tổ trưởng cùng ngày, sổ `DANH_MUC_NAP`.
2. **Cập nhật tài liệu cũ:** `DU_LIEU_THANG.md` dòng "Mẫu 31 chỉ xuất được số chốt tháng" (02/10) → nay đã xuất được theo ngày; `FILE_XUAT_HANG_THANG.md` theo bộ file mục 3 (bỏ Dư nợ chi tiết, DSTO; thêm File Tổ trưởng, CLT02).
3. **Cây điểm GD tháng 11** theo mục 5 (điểm từ File Tổ trưởng; dự phòng bảng điểm bỏ → điểm nhận từ kỳ 11/2026).
4. **K5:** chuẩn bị chạy hàm KHĐ của app trên các kỳ có file TW để so với giao ban.
5. ✓ Thêm 1 dòng trỏ `docs/TEO_PHOI_HOP.md` vào `docs/BAT_DAU.md` khi làm bản kế tiếp (dòng trỏ đầu `CLAUDE.md` đã thêm cùng file này).

## 9. Việc bên giao ban (Project chat)

- Quy chuẩn giao ban: sửa mục 3–4 (bộ file, kho chung), mục 6 (câu "phiên ngày X thì file ngày X+1" → nghĩa là anh **xuất** ngày X+1, ngày số liệu là X), cây điểm GD từ 11/2026 (giao ban còn 3 điểm: Truông Mít 2 ngày 19, Gia Lộc 23, Truông Mít 25).
- Script: bỏ Gia Lộc 2 khỏi khai báo điểm từ kỳ 11/2026 (giữ cho tháng cũ); đọc File Tổ trưởng; đọc kho Số liệu gốc (vẫn đọc `03_DU_LIEU_GOC` cho tháng đã qua). Chỉ sửa khi anh nói "code".
- Thư mục `0 Hop giao ban`: `03_DU_LIEU_GOC` thôi dùng sau khi có kho chung (giữ làm lưu trữ, không xóa). Thư mục ngoài: anh sẽ có đợt làm sạch riêng.

## 10. Lộ trình

B1 bảng đối chiếu ✓ (mục 6) · **B1b bộ file chung ✓ (mục 3)** · B2 anh chốt K1–K9 → lập `TEO_QUY_TAC_CHUNG.md` (mỗi QT có cột phép thử) · B3 trỏ hai bên về sổ chung · B4 sửa code theo QT (giữ cái cũ, hồi quy) · B5 kiểm chéo kỳ 30/09/2026 · **B6** danh sách việc giao từ TB KL → app theo dõi đến kỳ sau (khép vòng họp → giao việc → theo dõi → báo cáo).

## 11. Nhật ký

| Bản | Ngày | Nội dung |
|---|---|---|
| 1.0 | 28/10/2026 | Tạo file từ phiên giao ban: tên Tèo, phân vai, 3 luật, bộ file nạp chung, kho Số liệu gốc nạp qua app, ngày số liệu kỳ phiên, điểm GD 12 → 9 từ 11/2026, bảng đối chiếu luật số liệu (K1–K9 chờ chốt), việc cho hai bên. |
| 1.1 | 28/10/2026 | Mục 4: chốt tên chuẩn `<MÃ>_<YYYY-MM-DD>` (loại trước, ngày sau), giữ thư mục `Số liệu`, sổ `DANH_MUC_NAP.csv` — app làm ở bản 3.400. Anh 28/10 về cách tính: "tận dụng tối đa suy luận linh hoạt của chat so với ghi cứng trong app" (cách phối hợp cụ thể chờ anh duyệt). |
