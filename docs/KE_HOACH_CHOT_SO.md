# Kế hoạch VIỆC 1 — Chốt sổ tổ viên cuối năm + dòng thời gian (TK 2, 24/10/2026 — anh chốt, đang làm)

> Nguồn: `QUY_CHUAN_KIEN_TRUC.md` mục 8 điểm 3–4 (bước 5), `KE_HOACH_B_C.md` hàng 6. **Hạn: trước khi nạp Mẫu 31 tháng 1/2027.**

## 1. Vấn đề (vì sao phải làm)
- App suy tổ viên từ **Mẫu 31** (+ TK 105, Mẫu 01/TV nếu có). Mẫu 31 chỉ chứa món **còn nợ + món tất nợ trong năm**.
- Sang **tháng 1/2027**, Mẫu 31 không còn các món đã tất nợ năm 2026 → khách **tất nợ năm 2026 nhưng vẫn còn TK 105 trong tổ** biến mất khỏi danh sách tổ của app (số tổ viên tụt, thẻ tổ thiếu người, đối chiếu 01/TV báo lệch giả).
- Đồng thời mất dấu vết "ai vào / ra / chuyển tổ, tất nợ ngày nào" của năm cũ.

## 2. Đề xuất
**A. Sổ tổ viên chốt 31/12 (mỗi năm 1 bản, lưu riêng + đồng bộ Drive)**
- Mỗi tổ: mã tổ, tổ trưởng, địa bàn; mỗi tổ viên: mã KH, họ tên, CCCD, trạng thái (còn nợ / tất nợ còn TK 105), dư nợ, số dư + số TK 105, ngày tất nợ (nếu có).
- **Nguồn:** ưu tiên **Mẫu 01/TV tháng 12** (chuẩn TW); không có thì app tự suy từ Mẫu 31 + sao kê TK 105 kỳ 31/12 (như tab Tổ đang tính) — ghi rõ nguồn trên sổ.
- **Cách chốt:** app **tự chốt** khi bộ số liệu kỳ 12/2026 dựng xong (có Mẫu 31 tháng 12) + nút **📌 Chốt sổ năm** ở tab Tổ TK&VV để chốt lại khi nạp bổ sung (giữ bản cũ để so, không cho sửa tay từng dòng).
- In được "Sổ tổ viên 31/12/2026" từng tổ / theo địa bàn (khuôn in chuẩn `DANG_KY`).

**B. Năm sau dùng sổ chốt**
- Tổ viên 2027 = khách có trong Mẫu 31 năm 2027 **∪** khách trong sổ chốt 31/12/2026 **còn TK 105** (theo sao kê TK 105 / 01/TV mới nhất).
- Thẻ tổ / Tra cứu ghi rõ "Tất nợ 2026 · còn TGTK"; TK 105 đóng / tách khỏi tổ → vào "Ra khỏi tổ" như luật hiện nay.

**C. Dòng thời gian khách / tổ trong năm** (làm sau A–B, cùng việc)
- Từ các kỳ đã nạp: vào tổ, ra tổ, chuyển tổ, tất nợ, phát sinh QH / khoanh, đổi tổ trưởng → `KHO` trả sẵn; thẻ khách / thẻ tổ hiện "📅 Dòng thời gian".

## 3. Chia đợt
| Đợt | Việc | Ước |
|---|---|---|
| C1 | Sổ chốt (A): lưu ngăn riêng + Drive, tự chốt kỳ 12 + nút chốt lại, xem / in | 1 phiên |
| C2 | Dùng sổ chốt năm sau (B) + phép thử giả "sang năm" (bộ giả T12 → T1) | 1 phiên |
| C3 | Dòng thời gian (C) | 1–2 phiên |

## 4. Câu hỏi chờ anh
1. Nguồn chuẩn của sổ chốt: **Mẫu 01/TV tháng 12** (anh có nạp hằng tháng / ít nhất tháng 12?) hay app tự suy là đủ?
2. **Tự chốt** khi nạp số liệu 31/12 + nút chốt lại (em đề xuất) — hay chỉ chốt khi anh bấm?
3. Có cần **in sổ tổ viên 31/12** từng tổ không (mẫu nào, cột nào)?
4. Dòng thời gian (C) làm liền sau C1–C2 hay để sau?

## 5. Anh chốt 24/10 + điều chỉnh khi làm
- Anh: **"theo em, tiếp tục Mẫu 01/TV — anh sẽ gửi mỗi tháng kèm Mẫu 31"** → nguồn chuẩn = 01/TV hằng tháng; câu 2–4 theo đề xuất (tự có sổ, in được, dòng thời gian sau C1–C2).
- **Điều chỉnh khi đọc code (kết quả với anh không đổi, gọn hơn):** 3.347 đã **bù tổ viên theo 01/TV cùng tháng** → có 01/TV hằng tháng thì tháng 1/2027 số tổ viên vẫn đúng; thứ mất là **thông tin** của khách tất nợ năm trước (ngày tất nợ, CT) + đối chiếu báo "TƯ có, Mẫu 31 không" giả. Mẫu 31 + 01/TV tháng 12 **vốn lưu vĩnh viễn** (máy + Drive) → **không tạo bản sao riêng**: sổ chốt 31/12 dựng thẳng từ bộ số liệu tháng 12; xóa ô / cả tháng 12 của Mẫu 31 hoặc 01/TV → app hỏi trước. Không cần nút "chốt lại" (nạp lại file tháng 12 → sổ tự đúng).

## 6. Tiến độ
- **3.357 · C1 xong** (`js/64-so-to-vien.js`): tab Tổ TK&VV › 👁 **Sổ tổ viên** (khối `DANG_KY`): mỗi tổ viên 1 dòng theo `tvChuan` (Mẫu 31 + bù 01/TV cùng tháng) — trạng thái (còn nợ · còn lãi tồn · tất nợ còn TK 105 · cần cho ra), dư nợ, lãi tồn, số dư TK 105, ngày tất nợ, CT, nguồn (Mẫu 31 / 01/TV); chip Gồm; nhóm Từng tổ / Điểm › Hội › Tổ; kỳ tháng 12 → "Sổ tổ viên Tổ TK&VV — chốt 31/12/<năm>"; ghi chú nguồn (đã đối chiếu 01/TV, bù N khách / chưa có 01/TV). Hỏi trước khi xóa ô Mẫu 31 / 01/TV tháng 12 (`slSoChot`). Phép thử t300.
- **3.358 · C2 xong**: `STV_CHOT[năm]` = sổ chốt 31/12 dựng 1 lần (ngầm, chỉ khi có khách TƯ còn giữ mà Mẫu 31 không còn) từ bộ số liệu tháng 12 năm trước (`KHO.nap(<năm>-12)`) → `tvChuan` gắn `chot` cho khách bù theo 01/TV; Sổ tổ viên ghi "Tất nợ <năm> · còn TK 105" + ngày tất nợ + CT, nguồn "01/TV · sổ <năm>"; Tra cứu › thẻ tổ ghi "Tất nợ <năm> (ngày) · CT … · còn TGTK"; đối chiếu 01/TV: lý do cần cho ra ghi theo sổ chốt, Kiểm tra số liệu ghi "N khách tất nợ năm trước, có trong sổ chốt 31/12". Không có Mẫu 31 tháng 12 năm trước → như cũ. Phép thử t301.
- **3.359 · C3 xong** (`js/65-dong-thoi-gian.js`): thẻ khách (Tra cứu) + thẻ tổ › khối **📅 Dòng thời gian** → bấm "Xem năm …" mới đọc: tóm Mẫu 31 từng tháng của năm (+ tháng 12 năm trước làm mốc) qua `KHO.docBang`; khách: vào tổ, chuyển tổ, tất nợ, vay thêm món, phát sinh / hết QH, khoanh, không còn trong Mẫu 31; tổ: khách vào / không còn món vay, đổi tổ trưởng. Phép thử t302.
- **Việc 1 xong (C1–C3).** Còn chờ số liệu thật: thử máy thật sổ chốt khi có Mẫu 31 + 01/TV tháng 12/2026 và tháng 1/2027.
- (đã làm ở C2) năm sau: khách 01/TV không có trong Mẫu 31 mà có trong sổ chốt tháng 12 năm trước → ghi "Tất nợ <năm> (ngày) · CT …" ở thẻ tổ / Tra cứu; đối chiếu 01/TV xếp vào lý do đã biết "tất nợ năm trước" thay vì báo lệch.
