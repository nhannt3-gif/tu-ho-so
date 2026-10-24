# Kế hoạch ĐĂNG KÝ KHỐI (`DANG_KY`) — TK 2, 24/10/2026 (anh duyệt — đang làm)

> Anh 24/10: "nên làm trước việc 5, bỏ qua việc 1–3 làm sau, chia ra từng đợt, xong đợt gộp lên cho anh kiểm tra rồi làm tiếp, xong hết rồi thử 1 lần, em lên plan coi tốn bao nhiêu thời gian".
> Nguồn thiết kế: `KIEN_TRUC_3_LOP.md` mục 5 (Lớp 3 — đăng ký khối), `QUY_CHUAN_KIEN_TRUC.md` mục 8 (đợt E).

## 1. Mục tiêu
- Mỗi báo cáo **dạng bảng** khai 1 lần (tên · nằm ở tab nào · dùng chọn địa bàn + kỳ · lấy số liệu qua `KHO` · cột · nhóm · dòng tổng · khổ in) → app **tự** gắn nút, ô chọn địa bàn / kỳ, xem trước, 🖨 In · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi, 📜 nhật ký in.
- **Báo cáo bảng tự khai trong ⚙ Cài đặt** (không cần sửa code): chọn nguồn, cột, lọc, nhóm, tổng.
- **Không đổi bản in** báo cáo cũ: mỗi báo cáo chuyển sang `DANG_KY` phải ra **HTML in + bảng Excel giống hệt** trước khi chuyển (phép thử so trước / sau).
- **Không đụng mẫu đã khóa**: KTGS (06 / 16 / 04 / KH / Phân công), Giao dịch xã (04/TD, 12/GDX, Giấy lĩnh), Hồ sơ vay / Hồ sơ Tổ, Biểu 07 Phân bổ — giữ cách vẽ riêng (đã qua `KHO` + hàng nút xuất chung).

## 2. Kiểm kê báo cáo bảng sẽ chuyển (đếm trong code 24/10)
| Nhóm | File | Số báo cáo |
|---|---|---|
| Sao kê (nợ QH, khoanh, KHĐ, chưa GN, đến hạn, phân kỳ NOXH, phân kỳ tổ, giải ngân, đổi dư nợ, cần mở TK 105, SĐT, KQGD điểm, THHD, QH / khoanh chia điểm › hội › tổ) | `js/22h` (`SK_BC`) | ~16 |
| Cấp Hội (nợ cần xử lý, đến hạn, phát sinh, khách hàng, thông tin tổ) | `js/22h` | 5 |
| Tổng hợp (BCDHTD 01.1 / 01.2, LEN_31 đơn vị / hội / chương trình…) | `js/22i` (`TH_BC`) | 9 |
| Thông tin tổ (THHD, 3 tháng KHĐ, QH, khoanh, KQGD…) | `js/22j` | ~6 |
| Tab Tổ (danh sách hộ vay, nợ cần xử lý, TK 105 của tổ, dự kiến chia tách) | `js/22gb` (`TO_BC`) | 4 |
| **Cộng** | | **~40** |

Các báo cáo này đã trả cùng 1 dạng `{ten, tieuDe, ngang, ngay, html, aoa}` → `DANG_KY` bọc lại được, không viết lại cách tính.

## 3. Chia đợt (mỗi đợt: code → phép thử + hồi quy đủ → gộp → anh kiểm tra → đợt sau)
| Đợt | Việc | Anh thấy gì | Thời gian em làm (ước) |
|---|---|---|---|
| **D1 · Nền** | `js/62-dang-ky.js`: sổ đăng ký `DANG_KY({…})`, khung chung (chọn địa bàn + kỳ qua bộ phạm vi / `KHO`, xem trước, hàng nút xuất, 📜 nhật ký), **bộ vẽ bảng chuẩn** `{cot, dong, nhom, tong}` → trang in chuẩn A4 (dọc / ngang) + Excel. Thử bằng **1 báo cáo mới nhỏ**: "Danh sách hộ quá hạn theo tổ" (từ `KHO`) đặt ở tab Sao kê. Phép thử nền. | 1 báo cáo mới chạy theo cách mới | 2,5–3 giờ |
| **D2 · Sao kê** | Chuyển ~16 sao kê (`SK_BC`) sang `DANG_KY` — nút / danh sách lấy từ sổ đăng ký; hàm tính giữ nguyên; phép thử so bản in từng báo cáo trước / sau. | Tab Sao kê y như cũ (bản in không đổi) | 2,5–3 giờ |
| **D3 · Tổng hợp + Thông tin tổ** | Chuyển 9 + ~6 báo cáo, giữ luật "biểu không chia được theo phạm vi → mờ + dòng vàng" (`sau`) vào khai báo. | Như cũ | 2–2,5 giờ |
| **D4 · Tab Tổ + cấp Hội** | Chuyển 4 + 5 báo cáo; bộ cột ⚙ của tab Tổ giữ nguyên. | Như cũ | 2 giờ |
| **D5 · Báo cáo tự khai** | ⚙ Cài đặt › 🧩 **Báo cáo của tôi**: chọn nguồn (món vay Mẫu 31 · khách · tổ · TK 105), chọn cột, điều kiện lọc (dư nợ > 0, quá hạn, CT…), nhóm theo xã / điểm / hội / tổ, dòng tổng, khổ in → hiện thành nút ở tab đã chọn; lưu cài đặt + đồng bộ Drive. | Anh tự tạo báo cáo bảng mới | 3–4 giờ |
| **D6 · Dọn + bàn giao** | Bỏ code nút / danh sách cũ trùng, hướng dẫn ❓, tài liệu, phép thử so bản in toàn bộ ~40 báo cáo, hồi quy tổng. | Bản thử 1 lần toàn bộ | 1,5–2 giờ |
| | **Cộng** | | **≈ 14–17 giờ làm việc của em** |

**Nhịp thực tế:** mỗi đợt gồm code + hồi quy đủ (~40 phút máy chạy) + gộp → khoảng **6 đợt × 2,5–3,5 giờ**; làm liền thì **khoảng 2 ngày** (như nhịp hôm nay ~5–6 đợt / ngày dài). Anh kiểm tra mỗi đợt **10–20 phút** (D2–D4 chỉ cần mở vài báo cáo xem bản in giống cũ); **thử 1 lần toàn bộ sau D6 ~1 giờ** (danh sách thử ghi sẵn).

## 4. Rủi ro + cách giữ an toàn
- **Bản in lệch khi chuyển** → phép thử chụp HTML + Excel từng báo cáo TRƯỚC khi chuyển (bộ giả `tests/gianho31`), sau khi chuyển so khớp từng ký tự; lệch là dừng.
- **2 tài khoản sửa song song** (TK 3 bản điện thoại) → file mới `js/62-dang-ky.js` + sửa trong `22gb / 22h / 22i / 22j` (file TK 2 giữ); ghi `PHOI_HOP_TK2_TK3.md`.
- **Việc 1 (chốt sổ tổ viên cuối năm) có hạn trước Mẫu 31 T1/2027** → sau D6 làm ngay (còn ~2 tháng, đủ).

## 5. Câu hỏi D5 — anh trả lời 24/10: "theo em, nếu lúc làm thấy không ổn anh đổi; nguồn cơ bản trên Mẫu 31, có kiểm tra chéo nếu có số liệu chuẩn TW"
→ **Chốt:** (1) đặt ở tab **Tổng hợp** (đổi sau nếu anh thấy không ổn); (2) nguồn chính = **Mẫu 31** (món vay → gộp được theo khách / tổ / địa bàn); có file chuẩn TW cùng kỳ (Tổng dư nợ theo CT) thì cuối báo cáo hiện dòng **đối chiếu** tổng dư nợ / QH / khoanh (dùng lại `slDoiChieu`) — khớp ✓ / lệch số tiền; không có file thì ghi "chưa có số liệu TW để đối chiếu". TK 104 / KTGS chưa làm.

(câu hỏi gốc:)
1. "🧩 Báo cáo của tôi" đặt ở đâu: (a) tab Tổng hợp (em đề xuất) · (b) tab nào tự chọn khi khai.
2. Nguồn cho báo cáo tự khai: món vay (Mẫu 31) · khách · tổ · TK 105 — đủ chưa, cần thêm nguồn nào (TK 104, KTGS…)?

## 7. Báo cáo Sao kê + Tổ TK&VV làm lại (anh 24/10: "tối ưu lại, làm lại từ đầu em thấy sao cho gọn nhất")
21 báo cáo hiện có ≈ 7 nội dung → gom còn **7 báo cáo có tùy chọn** (anh "đồng ý theo em"):
1. **Nợ cần xử lý** — tích: Quá hạn · Khoanh · 3 tháng KHĐ · KU chưa GN > 1 tháng; nhóm theo (không · Xã › Điểm · Điểm › Hội › Tổ · từng tổ) — thay 8 bản (qh, kh, khd, cgn, tqh, tkn, tkhd, tab Tổ "Nợ cần xử lý").
2. **Nợ đến hạn** — hạn HĐ · kỳ GDXA · kỳ con phân kỳ; khoảng tháng; kiểu in "mỗi tổ 1 trang (gửi tổ trưởng — CV 597)" — thay 3 (dh, noxh, pkto).
3. **Phát sinh trong tháng** — giải ngân · thay đổi dư nợ · cần mở TK 105 — thay 3.
4. **Danh sách khách / hộ vay** — chọn cột (SĐT, CCCD + hạn, TK 105, dư nợ, món…), lọc (SĐT trống / không đạt, chưa TK 105, CCCD hết hạn, còn nợ / tất nợ) — thay 3 (sdt, tab Tổ DS hộ vay, TK 105 của tổ).
5. **THHD** · 6. **KQGD tại điểm** · 7. **Dự kiến chia tách tổ** — giữ nội dung, đưa vào khuôn mới.
Bản cũ chạy song song (mục "Báo cáo cũ") tới khi anh thử xong và duyệt bỏ. Nhóm mặc định: Điểm › Hội › Tổ.

## 8. CHUẨN IN BÁO CÁO BẢNG (anh chốt 24/10 — "đồng ý theo em, góc trái có logo và tên NHCSXH"; 2 ảnh mẫu anh gửi: 05/GDX, Tổng hợp theo đơn vị ủy thác)
- **Đầu trang (trang 1):** góc trái **logo cánh sen** + chữ: danh sách → "NGÂN HÀNG CHÍNH SÁCH XÃ HỘI / PGD Gò Dầu - Chi nhánh Tây Ninh" (đậm, như 05/GDX); bảng tổng quát → "Ngân hàng CSXH Tỉnh Tây Ninh / PGD Gò Dầu / <phạm vi: xã · điểm GD…>" (thường, 3 dòng, như mẫu Tổng hợp theo ĐVUT). Góc phải: "Mẫu số …" (nếu có). Giữa: **TÊN BÁO CÁO** in hoa; dòng nghiêng "Số liệu tính đến …" / "Ngày …"; dòng phạm vi (danh sách: "Tên điểm giao dịch: … · Mã điểm …" / xã · hội · tổ đã chọn). Trên bảng bên phải: *Đơn vị tính: đồng / triệu đồng*.
- **Khổ:** bảng số liệu tổng quát → **A4 ngang**, cố gắng **1 trang** (tự co chữ 11 → 8 pt, thu lề; vẫn tràn → báo "2 trang — in 2 mặt"); danh sách → **A4 dọc**, đầu bảng lặp mỗi trang, "Trang x/y".
- **Lề báo cáo bảng** (anh đồng ý thay 3/2 cm của 3.90 — chỉ báo cáo bảng; văn bản / KTGS / Hồ sơ giữ lề cũ): ngang 1,2 · 1,2 · 1,5 · 1,0 cm; dọc 1,5 · 1,5 · 2,0 · 1,0 cm.
- **Bảng:** tiêu đề nhiều tầng (nhóm cột "Trong đó", "Phát sinh từ đầu năm…"), cột số căn phải không xuống dòng, cột tên xuống dòng; dòng **Tổng cộng** đậm; nhóm có dòng cộng đậm, tiêu đề nhóm không rơi cuối trang; tùy chọn "mỗi tổ 1 trang".
- **Số:** tổng hợp triệu đồng (QT-10: 2 số lẻ khi cần), danh sách đồng; tỷ lệ %.
- **Excel / Word:** cùng đầu trang + cột; Excel cài khổ ngang / dọc, co vừa 1 trang bề ngang, đóng băng tiêu đề.
- Còn chờ anh: ô số 0 để trống hay ghi 0 (mẫu ĐVUT ghi 0 → mặc định **ghi 0**); dòng "Người lập" ký cuối (3.140 đã bỏ → mặc định **không**).

## 6. Tiến độ
- 24/10 · TK 2: lập kế hoạch này.
- 24/10 · anh: "chưa có mẫu nào bắt buộc… em cứ tạo 1 cái nền sẵn, sau này cần mẫu nào sẽ tạo khi cần" + "bảng tổng quan (tab Tổ TK&VV theo Xã / Điểm GD) anh muốn giữ lại" → **không chuyển hàng loạt** báo cáo cũ (D2–D4 chỉ làm khi anh cần mẫu nào); báo cáo cũ + bảng tổng quan tab Tổ giữ nguyên.
- **3.355 · N1 Nền xong** (TK 3 đã dùng 3.354) (`js/62-dang-ky.js`): `DANG_KY({ma, ten, o, loai:'ds'|'bang', dvt, mauSo, nhom, chon, du})` → nút ở tab (nhóm 🧩 Báo cáo chuẩn mới), hộp xem trước có chip tùy chọn + Nhóm theo (Không · Xã › Điểm · Điểm › Hội › Tổ · Từng tổ — nhớ trong cài đặt `dkChon`), khuôn in chuẩn mục 8 (logo + tên NHCSXH, tiêu đề in hoa, ngày nghiêng, phạm vi, ĐVT, tiêu đề cột 2 tầng, dòng cộng nhóm, Tổng cộng, ô 0 ghi 0, không dòng ký), chia trang + Trang x/y + tự co chữ qua bộ in chung `trDan` (bảng tổng quát cố 1 trang ngang), 🖨 In · 📄 PDF · 📝 Word (.doc HTML) · 📊 Excel (cùng đầu trang, tiêu đề 2 tầng) · 📤 Gửi, 📜 nhật ký in. Báo cáo mẫu 1: **Danh sách nợ cần xử lý** (tab Sao kê — tích Quá hạn · Khoanh · 3 tháng KHĐ · KU chưa GN > 1 tháng). Phép thử t259.
- Phát hiện khi làm (chưa sửa — sửa sẽ đổi bản in cũ, chờ anh): bộ chia trang chung `trDan` (js/05) **chưa bao giờ co chữ 9 / 8,5 / 8 pt** cho sao kê cũ (`.trang`) — đo cỡ chữ lúc bản chưa gắn vào trang nên ra rỗng; chỉ bậc thu lề + ẩn cột SĐT chạy. Báo cáo DANG_KY không bị (đặt cỡ chữ thẳng).
- **3.356 · D5 Báo cáo tự khai xong** (`js/63-bao-cao-toi.js`): tab Tổng hợp › 🧩 Báo cáo của tôi › ⚙ Tạo / sửa — tên · gộp theo (từng món / từng khách / từng tổ) · cột (chip, giữ thứ tự danh mục) · chỉ lấy (còn dư nợ / có QH / có khoanh / có lãi tồn) · nhóm sẵn · khổ (tự động > 10 cột → ngang). Lưu `D.cauHinh.bcToi` (đồng bộ Drive). Dòng = Mẫu 31 kỳ đang xem, theo phạm vi + Chương trình + Nguồn vốn của tab. Cuối báo cáo: dòng **đối chiếu TW** (Mẫu 31 cả phạm vi trước điều kiện lọc so với Tổng dư nợ theo CT: dư nợ · QH · khoanh khớp ✓ / lệch); phạm vi điểm GD / tổ → ghi "không chia tới điểm GD / tổ"; chưa có file TW → ghi rõ.
- Tiếp: mẫu mới làm khi anh cần (khai 1 khối `DANG_KY` + phép thử); D5 báo cáo tự khai ⚙ chờ anh trả lời mục 5.
