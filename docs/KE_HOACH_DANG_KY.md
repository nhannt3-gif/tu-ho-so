# Kế hoạch ĐĂNG KÝ KHỐI (`DANG_KY`) — TK 2, 24/10/2026 (chờ anh duyệt)

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

## 5. Câu hỏi chờ anh (trả lời trước D5, D1–D4 không cần)
1. "🧩 Báo cáo của tôi" đặt ở đâu: (a) tab Tổng hợp (em đề xuất) · (b) tab nào tự chọn khi khai.
2. Nguồn cho báo cáo tự khai: món vay (Mẫu 31) · khách · tổ · TK 105 — đủ chưa, cần thêm nguồn nào (TK 104, KTGS…)?

## 6. Tiến độ
- 24/10 · TK 2: lập kế hoạch này — chờ anh duyệt / nhắn "code".
