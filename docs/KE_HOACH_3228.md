# Kế hoạch 3.228 – 3.229 (anh duyệt hướng 17/10/2026)

> Viết lúc làm 3.227. Đọc kèm `docs/QUY_CHUAN_KIEN_TRUC.md` (chung / riêng, sổ quy tắc QT).
> Luật chung mỗi bản (anh dặn 17/10): **dọn rác code trong phạm vi bản** (bỏ hàm / CSS không còn dùng, gộp hàm trùng việc, grep trước khi xóa) + **kiểm tra toàn vẹn** (`python3 tests/kiem.py` — gồm "Hàm mồ côi", phép thử phần sửa, hồi quy đủ).

## 3.228 — Kiểm tra logic khi nhập hộ (khai báo được) + mục đích GQVL có số lượng / đơn vị

### A. Nguyên tắc
- **Một bộ kiểm chung** (lớp Nghiệp vụ, file mới `js/37-kiem-ho.js`): `khKiem(hộ, bối cảnh) → [{ma, muc:'do'|'cam'|'vang'|'xanh', chu, nguoi, mo:{…}}]`. Dùng ở: form nhập hộ (khi rời ô), lưới 📒 Sổ hộ vay (cột ⚠, lọc "chỉ hộ có cảnh báo"), tab Tra cứu (thay phần riêng của `tcKiemTrung2` — giữ nguyên kết quả, có phép thử khóa).
- **Khai báo được** (anh chốt 17/10 "logic kiểm tra này sẽ cho khai báo cho tiện"): ⚙ Khai báo đơn vị → thẻ mới **"🔎 Kiểm tra hộ vay"**, mỗi luật 1 dòng: bật / tắt · mức (🔴 chặn / 🟠 / 🟡 / ℹ) · ngưỡng (nếu có). Lưu `hsoKB().khLuat` (đồng bộ cùng khai báo đơn vị). Ngưỡng chưa có số chính sách → ghi "(tạm)".
- 🔴 chặn = không cho lưu như hộ mới (chỉ "Mở hộ đó"); 🟠 / 🟡 có nút **"Đã kiểm tra"** — ghi ngày vào hộ (`o.daKiem[ma] = {luc, giaTri}`), dữ liệu đổi thì nhắc lại.

### B. Danh mục luật (mặc định)
| Mã | Luật | Mức | Ngưỡng |
|---|---|---|---|
| tuoi65 | Người vay **trên 65 tuổi** (anh chốt) | 🟠 | 65 |
| tuoiDH | Tuổi lúc đáo hạn (ngày nhập + thời hạn chương trình) vượt ngưỡng | 🟡 | 65 |
| tuoi18 | Người vay dưới 18 | 🔴 | 18 |
| tkTuoi | Người thừa kế dưới 18 | 🟠 | 18 |
| cccd12 | CCCD không đủ 12 số / mã tỉnh không có | 🟠 | |
| cccdNS | Số thứ 4 CCCD (giới + thế kỷ) lệch năm sinh / giới tính | 🟠 | |
| cccdCap | Ngày cấp ở tương lai / trước 14 tuổi | 🟠 | |
| cccdHan | CCCD hết hạn 🔴 · sắp hết hạn 🟡 | 🔴/🟡 | 30 ngày |
| trungCCCD | Trùng CCCD (Mẫu 31 + sổ): đang vay 🔴 · đã tất toán ℹ | 🔴 | |
| trungSDT | Trùng SĐT với hộ khác | 🟡 | |
| trungTen | Họ tên gần đúng (bỏ dấu, lệch 1–2 chữ, đảo tên đệm) + cùng năm sinh / ấp | 🟡 | 2 chữ |
| tkVay | Người thừa kế đang là người vay / thừa kế hộ khác | 🟠 | |
| hoTrung | Trong hộ 2 người cùng CCCD · người vay = thừa kế | 🔴 | |
| qhGT | Quan hệ vợ / chồng không khớp giới tính theo CCCD | 🟡 | |
| thieuTK | Chưa có người thừa kế | 🟡 | |
| quaHan | Hộ có món quá hạn / nợ xấu (Mẫu 31) | 🔴 | |
| cungCT | Còn dư nợ cùng chương trình định vay | 🟠 | |
| sapDH | Món sắp đáo hạn | ℹ | 90 ngày (tạm) |
| doiTo | Đổi tổ: luôn hiện "Tổ cũ: Tổ X — tổ trưởng Y — ấp Z"; còn món ở tổ cũ → nhắc chuyển tổ trên hệ thống | ℹ/🟠 | |
| apTo | Ấp của hộ khác ấp của tổ | 🟡 | |
| toDay | Tổ vượt số thành viên tối đa | 🟡 | 60 (tạm) |
| sdtSai | SĐT không đủ 10 số | 🟡 | |
| HSSV | Thiếu HSSV là thành viên hộ · CCCD HSSV trùng món HSSV còn dư nợ 🟠 · thiếu trường / ngày ra trường 🟡 | | |
| NSVSMT | Vượt mức / công trình 🟠 (25 triệu theo thẻ chương trình) · còn dư nợ cùng loại công trình 🟠 · đối tượng nông thôn / thành thị lệch xã / phường 🟡 | | |
| GQVL | Tổng dòng ≠ số tiền 🔴 · thiếu số lượng / đơn vị 🟡 · thời hạn không chia hết kỳ hạn 🟠 · tích ưu tiên chưa ghi giấy tờ 🟡 · chênh lệch hiệu quả âm 🟠 | | |

### C. Hộ cũ lấy từ Mẫu 31
- Thẻ **"Hộ đang vay N món"**: mỗi món 1 dòng — chương trình · ngày vay · số tiền · dư nợ · hạn trả · 🔴 quá hạn. Nguồn: `SL_KHMON[mã KH]` (qua cửa `KHO`, thêm `KHO.monKH(kh)` nếu chưa có).

### D. Mục đích GQVL (anh chốt 17/10)
- Đã có: HSSV → 01/TD có xác nhận UBND; NSVSMT → 01/TD thường; GQVL → 01/GQVL + 07b (không 01/TD, 01/UQ) — **giữ nguyên**.
- Dòng mục đích GQVL: `{md, sl, dv, tien}` — **số lượng là số, đơn vị riêng** (gợi ý: con, m², ha, công, cây, cái, tấn, chiếc…). Ví dụ "Chăn nuôi bò sinh sản · 4 · con", "Cải tạo quán bán cà phê · 25 · m²".
- Nhớ cặp mục đích → đơn vị (`hsoKB().mdDv`), mục đích gõ mới thêm vào gợi ý của thẻ GQVL.
- In 01/GQVL / 07b: "4 con", "25 m²" (không đổi bố cục — kiểm t179 / t180 / t181).
- Dữ liệu cũ `sl:"4 con"` → tách số + đơn vị khi đọc (không ghi đè đến khi sửa).
- Nhu cầu vay nhập ngay trong sổ (`o.nc = {ct, dong:[…], tien}`) → lập hồ sơ tự chuyển sang phiếu (`hmDongBo`).

### E. Phép thử
- `t190` (mới): từng luật (bật / tắt / đổi mức / ngưỡng), Đã kiểm tra, hộ cũ N món, đổi tổ, GQVL số lượng + đơn vị + dữ liệu cũ.
- Tra cứu: t-phép thử kiểm trùng cũ giữ nguyên kết quả.

## 3.229 — Khai báo riêng 4 nguồn từng mẫu (bắt đầu 11/TD mới + cũ)
- Mỗi ô `tukb` / `kb` trên mẫu chọn nguồn: ✍ Ghi tay (chấm) · 📊 Mẫu 31 · ⚙ Khai báo chung · ⌨ Tự gõ; mẫu lấy **khai báo riêng trước**.
- 4 luật điền (anh chốt): font / cỡ theo mẫu gốc, đủ chỗ ký; giữ form — tên dài đẩy "Năm sinh" ra xa nhưng **1 dòng, không thu nhỏ chữ** (tối thiểu 2 khoảng trắng, không đủ → cảnh báo); địa chỉ nối liền, chọn đúng xã / phường (mẫu trắng giữ "xã (phường)"); ô khung / chấm: điền đủ viết liền, thiếu mới hiện khung.
- Làm trong lõi `js/31-o-mau.js`; mặc định in không đổi (t179 / t180 / t181); `kb` cũ chuyển thành ⌨ Tự gõ.
- Cuốn chiếu: 07b → 01/TD, 03/TD, 01/UQ → 01/TĐCK, 01/GQVL, 01/TGTV, 09A → 10a, 10b, 10c, 10c cũ, 10d.

## Trạng thái (17/10)
- ✅ **3.228 đã làm** (`js/37-kiem-ho.js`, t190): đủ mục A, B, C (thẻ món đang vay = dòng ℹ trong khung 🔎), D trừ "nhu cầu vay nhập ngay trong sổ (`o.nc`)" — để sau. Khác kế hoạch: Tra cứu giữ `tcKiemTrung2` riêng (nhập rời, không có hộ) — chỉ dùng chung chỉ mục món `slKhMonNap`; cccdHet mặc định 🟠 (không 🔴) để không chặn lưu hộ; luật GQVL "tổng dòng ≠ số tiền" bỏ (số tiền GQVL = tổng dòng) — thay bằng `ctCanh` (cảnh báo phương án sẵn có: vượt mức / công trình, vượt 200 triệu, hiệu quả âm).
- ✅ **3.229 phần lõi đã làm** (`js/31-o-mau.js`, t191): 4 nguồn, riêng trước, ⌨ chưa gõ in như tự động, ⧉ chép; 11/TD mới + cũ Bên A mặc định ⌨. **Còn:** 4 luật điền + cuốn chiếu từng mẫu khi anh rà (chữ dài theo `RA_SOAT_CHU_DAI.md`).

