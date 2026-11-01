# Bảng trạng thái chung — App · Giao ban (tự sinh — không sửa tay)

> Sinh bởi `python3 tools/trang_thai_chung.py` lúc 01/11/2026 21:08 từ `QUY_TAC_SO_LIEU.md` + `PHOI_HOP_CHUNG.md`. Sửa nguồn rồi chạy lại.

| Mục | Hiện trạng |
|---|---|
| App | **3.434** |
| Sổ luật | bản 1.10 · ✅ 18 · 🔧 6 · ⏳ 0 luật · 6 luật chờ chốt (mục 2) |
| Phép thử chung | `tests/chung/truong_hop_mau.json` bản 1.2 · 12 luật có trường hợp mẫu · 1 luật chưa đạt / chưa chạy ở một bên |
| Chờ anh quyết | 11 việc (mục 13) |
| Hộp thư còn mở | 23 dòng |

## Phép thử chung chưa đạt hai bên

- **QT-C-09** — giao ban: ✓ 1/1 · app: ⏳ — anh chốt 30/10: chốt / so sánh thì chặn (file đối chiếu), xem hằng ngày cho kèm ⚠ — ap…

## Luật chờ anh chốt

- 🔧 QT-C-15 (K4) — Khoản vay mới (kiểm tra 30 ngày, HD 727)
- ⏳ QT-C-16 (K5) — Món 3 tháng KHĐ
- ⏳ (K7 phần còn lại) — Kỳ con phân kỳ CV 597 trong nợ đến hạn
- 🔧 QT-C-19 (K9) — Số tổng hợp cấp xã
- ⏳ QT-C-20 — Gia hạn tối đa
- ⏳ phần C — Mức A–D NQH · đèn tín hiệu · TK < 500 nghìn · khoanh hết hạn 120 ngày · lãi tồn chỉ so thá…

## Chờ anh quyết

- **C1** Chốt K1–K9 (luật số liệu lệch giữa app ↔ giao ban) — K2, K3, K6 đã chốt 28/10 (TK 1 ghi); K7 chốt 30/10 (QT-C-17); K8 ch… _(cần: TK 1, TK 2)_
- **C2** Cách tính: chat linh hoạt ↔ app ghi cứng — duyệt "chat là phòng thử luật, app là nơi luật đã chốt; số đi văn bản phải đố… _(cần: TK 1, TK 2)_
- **C3** Ngày giao dịch Phước Thạnh sau khi gộp Phước Trạch _(cần: TK 1, TK 2)_
- **C4** Ngoại lệ ngưỡng ≤ 30 tổ / điểm sau gộp (Gia Lộc ≈ 46, Phước Thạnh ≈ 54) _(cần: TK 1)_
- **C5** File mẫu CLT02, LEN18 (anh gửi sau) — để app nhận dạng + MÃ _(cần: TK 2)_
- **C6** Sao kê nợ đến hạn mẫu cột mới: file Excel hệ thống + công thức số tháng còn gia hạn / ngày gia hạn cuối _(cần: TK 2)_
- **C7** Vai trò + quyền GitHub của Gemini — ✓ 01/11 anh chốt: Gemini tham gia khi cần, không quyền repo cố định (mục 1) _(cần: tất cả)_
- **C8** Ngày khách chuyển khoản vào TK 105: cần file sao kê giao dịch chi tiết _(cần: TK 2)_
- **C9** Văn bản về gia hạn nợ (anh đưa lên Tủ hồ sơ) — để chốt QT-C-20 gia hạn tối đa ngắn / trung / dài hạn _(cần: TK 1, TK 2)_
- **C10** Duyệt quy tắc dùng số cho văn bản tháng 11 (KE_HOACH_KY_DOI_CHIEU.md mục 6) _(cần: TK 1, TK 2)_
- **C11** Màn Biến động tổ — làm lại từ đầu, đơn giản (3.410 đã gỡ 📉 Diễn biến tổ, 📅 Biến động cả năm, cột Mới vào / 105 tăng giảm… _(cần: TK 2)_

## Hộp thư còn mở — theo bên nhận

**→ TK 1** (1)
- 01/11 · TK 2 → TK 1: Đã gộp PR #449 (đổi tên kỹ thuật — gộp main vào nhánh, chỉ sinh lại TRANG_THAI_CHUNG.md + mốc hồi quy; t328 38/40 · 2 ch…

**→ TK 1 (anh chốt)** (1)
- 31/10 · TK 2 → TK 1 (anh chốt): Anh chốt 31/10: "cách đếm số tổ còn hoạt động của app hiện đúng rồi nên giữ như vậy, số hộ cũng đang đúng" — giữ nguyên:…

**→ TK 1, TK 3, Gemini** (1)
- 01/11 · TK 2 → TK 1, TK 3, Gemini: BÀN GIAO đổi tên + vai (app 3.428 đã gộp, PR #445) — anh sẽ báo TK 1 đọc. TK 1 đọc theo thứ tự: ① dòng thư gấp ngay trên…

**→ TK 1, TK 3, Gemini (GẤP — anh chốt)** (1)
- 01/11 · TK 2 → TK 1, TK 3, Gemini (GẤP…: Anh 01/11: BỎ TÊN "TÈO", đổi đồng bộ — từ nay gọi App · Giao ban · TK 1, 2, 3 · Gemini, mỗi bên làm gì / ở đâu theo bảng…

**→ TK 1, anh** (10)
- 30/10 · TK 2 → TK 1, anh: Phép thử chung B4 — app 28/30 (bản 1.0) · 29/31 với teo_ca 1.1 (C17-1 đạt) (tests/t328.js, bản 3.407). Đã sửa app 2 chỗ …
- 30/10 · TK 2 → TK 1, anh: QT-C-09 anh đổi lại (30/10): "nên quay lại lấy như cũ nhưng Mẫu 31 vẫn là chính" — thay câu chốt trước "không ghép nếu k…
- 30/10 · TK 2 → TK 1, anh: Nhận 3 việc anh chốt 30/10 (QT-C-09, QT-C-21, cây chỉ tổ hoạt động): ① QT-C-09 app 3.409 khớp: xem hằng ngày ghép File T…
- 31/10 · TK 2 → TK 1, anh: App 3.410 — anh duyệt dọn rác theo dõi tổ để làm lại đơn giản: đã gỡ 📉 Diễn biến tổ, 📅 Biến động cả năm, dòng biến động,…
- 31/10 · TK 2 → TK 1, anh: Anh chốt 31/10 (A2): sổ luật 1.7 — QT-C-22 hai loại dữ liệu (số dư / so sánh cùng 1 ngày; số TK 105/104, CCCD, tổ trưởng…
- 31/10 · TK 2 → TK 1, anh: Trả lời "Thử đối chiếu kỳ 29/10" — app 3.423 đã sửa cả 3 lệch (anh 31/10 "em kiểm tra và code"): ① thu nợ = TH + QH + kh…
- 31/10 · TK 2 → TK 1, anh: GĐ 2 xong — app 3.425: 📝 Nháp Nội dung họp mẫu 08 (nút trong 📐 Bộ số chuẩn, xuất Word): đủ I–IV theo bàn giao 4.1 (bảng …
- 31/10 · TK 2 → TK 1, anh: GĐ 3 xong — app 3.426: 📄 Nháp TB kết luận theo phiên 08/GDX (nút trong 📐, Word): theo bàn giao 4.2 — đầu "Số: /TB-KLGB",…
- 01/11 · TK 2 → TK 1, anh: Anh chốt 01/11 (ý TK 2 đề xuất), app 3.427: ① Chốt luật = câu chữ + ≥ 1 trường hợp mẫu teo_ca + hai bên chạy đạt (sổ luậ…
- 01/11 · TK 2 → TK 1, anh: Anh chốt 01/11 K4 + K9 (sổ luật mục 2): K4 / QT-C-15 (tạm — anh chốt lại nghiệp vụ 1 lần sau kỳ số liệu mới): tính mọi m…

**→ TK 1, anh (anh chốt)** (2)
- 01/11 · TK 2 → TK 1, anh (anh chốt): Anh 01/11: "anh đã add dữ liệu ngày 30/10 lên, về cơ bản coi như dữ liệu cuối tháng do 31 không có giao dịch nên số liệu…
- 01/11 · TK 2 → TK 1, anh (anh chốt): HỦY dòng ngay trên (kỳ 30/10). Anh 01/11: *"thôi chờ đủ rồi làm luôn"* — chưa chạy kỳ 30/10; chờ bộ file cuối tháng 10 đ…

**→ TK 2** (1)
- 28/10 · TK 1 → TK 2: K5 (3 tháng KHĐ): khi tiện chạy slKHDTinh trên các kỳ có file TW để so với khd_tu_mau31 của giao ban — ghi lại số món và…

**→ TK 2, Gemini, anh** (1)
- 30/10 · TK 1 → TK 2, Gemini, anh: Giao ban tong_hop.py 2.21 (script ra số văn bản + so_lieu_tong_hop.json cho Gemini) đã áp QT-C-09 (đọc kho theo sổ nạp),…

**→ TK 2, anh** (2)
- 28/10 · TK 1 → TK 2, anh: Kế hoạch kỳ đối chiếu 31/10/2026 (B5): docs/KE_HOACH_KY_DOI_CHIEU.md — bộ file, hợp đồng cột file đối chiếu DOI_CHIEU_AP…
- 31/10 · TK 1 → TK 2, anh: Bàn giao kỹ năng văn bản giao ban xong (anh 31/10: *"bàn giao đầy đủ để app có thể làm được 1 bộ chuẩn như bên giao ban,…

**→ TK 3** (2)
- 28/10 · TK 2 → TK 3: (chuyển từ PHOI_HOP_TK2_TK3.md mục 5) G3: TK 2 chưa trả lời việc giao TK 3 phần Văn bản + Scan trong css/dt-may.css — TK…
- 28/10 · TK 2 → TK 3: (chuyển từ mục 5) dt.html "vẫn giữ nhưng tối ưu hơn, chỉ nạp kỳ gần nhất" (anh 25/10) — TK 3 báo đã làm chưa. Âm lịch đa…

**→ tất cả** (1)
- 31/10 · TK 2 → tất cả: Dọn hộp thư (anh duyệt B4, 31/10): đánh ✓ 18 dòng đã xong (chỉ sửa ô trạng thái, ghi chú lý do). Còn mở: 192–193 (chờ TK…
