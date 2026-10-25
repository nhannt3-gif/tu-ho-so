# Rà soát lệch hướng + kỹ thuật mới (TK 2, 25/10/2026 — bản 3.372)

> Anh 25/10: *"em ktra xem app có lệch hướng gì ko, có kỹ thuật nào mới cần áp dụng ko"*.
> Đối chiếu số đo thật trong code (bản 3.372) với hướng đã chốt: `KIEN_TRUC_3_LOP.md` (KT3L, mốc 3.141), `QUY_CHUAN_KIEN_TRUC.md` mục 7 (mốc 14/10, 3.194), `KE_HOACH_CHUAN_HOA.md`. **Chỉ phân tích — chưa sửa gì.**

## 1. Đúng hướng (số đo)
| Chỉ số | Mốc cũ | Nay (3.372) | Đánh giá |
|---|---|---|---|
| Đọc thẳng biến kho (thước đo `kiem.py`) | nhiều | **0** | ✓ mọi khối đọc qua cửa `KHO` |
| Hồ sơ Tổ `js/25` đọc biến chung (`TO_K`, `SLM`…) | 57 lần (14/10) | **0** | ✓ |
| Giao dịch xã `js/26` đọc biến chung | 60 lần (14/10) | **0** | ✓ |
| `onclick=` trong khung `index.html` | 1.090 (3.141, cả app) | **0** trong khung; 1.369 trong `js/` (giảm dần) | ✓ khung sạch, phần JS đang giảm |
| Tách file | 1 file 2,7 MB | 86 file `js/` + 4 CSS, `js/22` tách 10 file | ✓ |
| Lưu dữ liệu | `luu()` ghi toàn bộ `localStorage` | gom ghi 300 ms (3.203) + lưu theo ngăn IndexedDB (3.223 M8) | ✓ (402 chỗ gọi `luu()` không còn là rủi ro lớn) |
| Hàm mồ côi | — | 0 | ✓ |
| Chức năng mới cắm rút (QUY_CHUAN 13) | — | `js/66`, `67`, `68`, `css/dt-may.css`, `dt-may-vbsc.css` | ✓ bỏ 1 dòng là về như cũ |
| Khuôn in chuẩn / báo cáo chung | chưa có | `trDan` / `inChuan` + `DANG_KY` | ✓ đã có nền |

## 2. Có dấu hiệu lệch / chưa theo kịp
| # | Chỗ | Số đo / thấy gì | Rủi ro | Đề xuất |
|---|---|---|---|---|
| L1 | **Theo dõi nợ** (`js/04e`) | Vẫn **bộ đọc Excel riêng** (`tdnDocFile`), **0 lần dùng `KHO`** — KT3L vấn đề #3 (mốc 3.141) chưa xử lý | Giao ban / Buổi GD tính từ nguồn khác Mẫu 31 → **số có thể lệch** giữa các tab | Hỏi anh: Theo dõi nợ còn dùng không? Còn → chuyển sang đọc `KHO` (giữ giao diện); không → đánh dấu ngưng, thôi bảo trì |
| L2 | **App phình nhanh** | JS **3,6 MB (+646 KB so mốc thước đo)**, hàm chung 3.477 (+603), biến chung 571 (+130); **128 bản trong 1 tuần** (18–25/10) | Mỗi chức năng mới thêm hàm / biến toàn cục → dễ đụng nhau giữa 2 TK; điện thoại tải / đọc lâu hơn | Giữ luật cắm rút + tiền tố riêng; đợt rà "hàm chung không tiền tố" định kỳ; xem lại nạp khi cần (R3 phần 2) cho khối lớn ít dùng (`js/25` 317 KB, `js/04e` 131 KB) |
| L3 | **CSS chồng lớp** | `css/app.css` **146 khối `@media`**, **303 `!important`** (KT3L vấn đề #8 ngày càng nặng); 2 TK cùng thêm CSS điện thoại (dt-may, dt-may-vbsc) | Sửa 1 chỗ vỡ chỗ khác; phải dùng `!important` để thắng → vòng lặp | Kỹ thuật **K8 `@layer`** (mục 3) + đợt dọn CSS |
| L4 | **2 khuôn báo cáo song song** | `DANG_KY` mới có **5 báo cáo**; hầu hết Sao kê / Tổng hợp cũ vẫn tự vẽ bảng / In / Excel | Sửa khuôn in phải sửa 2 nơi; không thống nhất (đúng cảnh báo KT3L #6) | Chuyển dần báo cáo cũ sang `DANG_KY` mỗi khi đụng tới; gắn với "Kho báo cáo chung" (rà bố cục Đợt B-7) |
| L5 | **2 giao diện điện thoại** | `dt.html` + `js/dt` (~96 KB) song song với bản máy tính trên ĐT (anh chốt bản chính = máy tính) | Làm 2 lần cùng 1 màn hình (đã trùng ở Hôm nay, thẻ khách); 3.370 / 3.371 trùng việc giữa 2 TK | `dt.html` **đóng băng chức năng** — chỉ "xem nhanh kỳ gần nhất" như anh chốt; mọi chức năng mới chỉ làm ở bản chính |
| L6 | **Mã chết còn sót** | 33 chỗ nhắc Mẫu 10 / `m10` / `kttk` (KT3L vấn đề #7) | Rác, dễ hiểu nhầm | Rà: giữ phần đọc dữ liệu cũ, bỏ phần giao diện / xử lý |
| L7 | **Dòng > 400 ký tự** | 164 — **vượt mốc** `kiem.py` | Khó đọc, khó sửa an toàn | Bẻ dòng khi đụng tới (không làm riêng 1 đợt) |
| L8 | **Phối hợp 2 TK** | 3.370 / 3.371 trùng số + trùng việc | Mất công, rủi ro gộp | Đã ghi phân vùng file (BAN_GIAO_TK2 mục 6); luôn `git fetch` + xem `HEAD..origin/main` trước khi lên số |

## 3. Kỹ thuật mới nên cân nhắc (thêm vào `TU_VAN_KY_THUAT.md` mục 8–12)
Ràng buộc giữ nguyên: ES5, không build, không npm; iPhone anh dùng Safari (đã kiểm hỗ trợ từng mục).

| # | Kỹ thuật | Giải quyết | Hỗ trợ | Công sức | Em đánh giá |
|---|---|---|---|---|---|
| **K8** | **CSS `@layer`** (lớp kiểu: nền → khung → khối → điện thoại) | Thứ tự đè rõ ràng, **bỏ dần `!important`**; CSS điện thoại của 2 TK không giẫm nhau (L3) | Safari 15.4+, Chrome 99+ | 1 phiên (bọc file vào lớp, không đổi luật) | **Nên làm** — rẻ, giảm rủi ro lâu dài |
| **K9** | **`content-visibility: auto`** cho danh sách / bảng dài | Trình duyệt **bỏ vẽ phần khuất màn hình** → Tra cứu 21.000 khách, bảng tổ, sao kê cuộn nhẹ hơn (nhất là ĐT) | Safari 18+, Chrome 85+ (máy cũ bỏ qua, không hại) | ½ phiên (vài dòng CSS) | **Nên làm** — gần như không rủi ro |
| **K10** | **Container queries** (`@container`) | Khối tự co theo **bề rộng khung chứa** (khung trái / phải, ĐT) thay vì theo cỡ màn hình → bớt `@media` (L3), cùng 1 khối dùng được ở máy tính, khung xem hẹp, ĐT | Safari 16+, Chrome 105+ | dần dần (khối mới dùng trước) | Nên áp cho **khối mới**, không viết lại cũ |
| **K11** | **Chia nhỏ việc nặng theo nhịp** (chạy từng lô ~16 ms, nhả cho màn hình vẽ) | Dựng kỳ / vẽ bảng tổ ĐT đứng 2,5–3,3 s → thành có thanh tiến độ, **không đứng màn hình**; rẻ hơn Worker (phương án B) | Mọi trình duyệt (`setTimeout` / `MessageChannel`; Safari **không có** `requestIdleCallback`) | 1 phiên | **Nên làm trước phương án B** |
| **K12** | **Drive: tải theo ETag / chỉ trường cần (`fields=`) / gộp lời gọi** | Giảm số lần + dung lượng gọi Drive khi mở app (anh báo "Drive nạp rất lâu") | API Drive v3 sẵn có | 1 phiên | **Chờ số đo ⏱** của anh để biết bước nào chậm rồi mới chọn |
| (3) | **Lưu sẵn tóm tắt kỳ** (đã có trong bảng, mục 3) | Mở Tra cứu / tab Tổ khỏi dựng lại kỳ (ĐT 2,8–3,3 s) | IndexedDB | 1 phiên | **Nâng ưu tiên** — số đo 3.369 cho thấy dựng kỳ là chỗ chậm lớn còn lại trên ĐT |

## 4. Em đề xuất thứ tự (anh chọn)
1. **Chờ số đo ⏱ trên iPhone** → sửa đúng chỗ Drive chậm (K12 nếu đúng là Drive).
2. **Lưu tóm tắt kỳ (TU_VAN 3) + K11 chia nhỏ việc nặng** — lợi lớn nhất cho điện thoại, rủi ro vừa.
3. **K9 `content-visibility` + K8 `@layer`** — rẻ, giảm rủi ro CSS khi 2 TK cùng làm.
4. **L1 Theo dõi nợ** — cần anh trả lời còn dùng không.
5. **L5** — chốt `dt.html` đóng băng chức năng (chỉ xem nhanh kỳ gần nhất).

## 5. Câu hỏi chờ anh
1. Tab **Theo dõi nợ** (biên bản, cam kết, nhắc ở Hôm nay) anh **còn dùng** không? (quyết định L1)
2. Đồng ý **`dt.html` không làm thêm chức năng** (chỉ tối ưu xem nhanh như anh đã chốt) không? (L5)
3. Chọn mục nào ở mục 4 làm trước.
