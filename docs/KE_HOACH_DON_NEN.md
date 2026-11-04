# KẾ HOẠCH DỌN NỀN THEO NHỊP PHÁT TRIỂN — 04/11/2026 (TK 3, vai App chính, bản 3.462)

> Anh 04/11 (sau bản rà kiểm thử): "em so với định hướng bố cục có đi lệch khi app phình to quá nhanh ko" → "em làm tất cả luôn, theo kế hoạch dọn nền tương ứng với phát triển thêm".
> Nối tiếp: `KIEN_TRUC_3_LOP.md` (KT3L), `QUY_CHUAN_KIEN_TRUC.md` mục 7 (đo lệch hướng), 8 (lộ trình), 13 (quản lý code khi app lớn dần), `RA_SOAT_BO_CUC_2410.md`.

## 1. Số đo — app lớn nhanh tới đâu (git, thật)
| Ngày | File JS | JS | Ghi chú |
|---|---|---|---|
| 12/10 | 26 | 2,88 MB | trước KT3L |
| 17/10 | 65 | 3,48 MB | đợt tách file |
| 24/10 | 103 | 4,15 MB | |
| 27/10 | 113 | 4,23 MB | |
| 03/11 | 140 | 4,47 MB | +236 KB / 1 tuần |
- Thước đo `kiem.py` so mốc 3.429 (31/10): **JS +180 KB trong 4 ngày** (06A, 10A, BBLV, các bản TK 2).
- Nạp app (đo 04/11, file máy, trung vị 5 lần): 231 ms; bỏ hết 20 mẫu `js/mau` 201 ms; CPU chậm ×4: 714 / 739 ms (không phân biệt được).
- Lập Biên bản làm việc: 1 biên bản 12 ms, 3 hộ 51 ms; vẽ lại cột trái + xem 61 ms.

## 2. Luật "thêm 1 – dọn 1" (mới, áp từ 3.462)
1. **Ngân sách tăng** trong `tests/kiem.py`: vượt mốc quá **JS +100 KB · CSS +15 KB · hàm chung +60 · biến chung +15** → dòng ⚠ NGÂN SÁCH TĂNG (riêng, không làm trượt t192 — các thước đo cứng vẫn ⚠ VƯỢT MỐC). Khi ⚠: bản kế tiếp phải là **bản dọn** (giảm lại / tách / bỏ mã thừa) rồi mới đặt mốc mới (`python3 tests/kiem.py --moc`, ghi lý do trong CHANGELOG). Các thước đo cũ (onclick, dòng dài, mồ côi, đọc thẳng kho / bảng gốc, file lớn) vẫn "không được tăng".
2. **Thước đo mới `nhánh mẫu riêng (js/25*)`**: đếm `M.k===…` / `.test(M.k)` ở khung Hồ sơ (`js/25`, `25b`, `25c`) — **chỉ được giảm**. Mẫu mới gắn qua cổng `hsoMauGan` (mục 3), không thêm nhánh.
3. Mỗi bản thêm chức năng ghi 1 dòng "Dọn kèm:" trong CHANGELOG (việc nền nào làm kèm, hoặc "không — lý do").
4. Chức năng mới = file riêng + 1 chỗ gắn (QUY_CHUAN mục 13) — phép thử **rút file** (như t367) cho khối mới có thể cắm rút.

## 3. Đã làm ở 3.462
| # | Việc | Kết quả |
|---|---|---|
| D1 | Luật mục 2 vào `kiem.py`; bớt báo nhầm "thiếu hàm" (hàm gán biến, `var a, b = null` gán lại ở `js/mau`, CompressionStream / Response của trình duyệt) | "Thiếu hàm: không" (trước 10 tên báo nhầm) |
| D2 | **Cổng gắn mẫu `hsoMauGan(p, {k, ma, ten, mg, sau, lap, ai, trai})`** (js/25). 06A, BBLV tự gắn chip + cách lập + cột trái từ file mẫu; bỏ nhánh riêng ở 25 / 25b / 25c; `HSN.trai` dùng chung cột trái | rút `0hsn` + `06a` + `bblv` → app chạy, không lỗi, mẫu khác đủ (t367); thứ tự chip như cũ |
| D3 | Nạp khi dùng `js/mau/*` — **đo trước, KHÔNG làm**: lợi ~30 ms (máy thường), không đo được khi CPU chậm; rủi ro vỡ chỗ gọi chéo (KTGS → 06A, phép thử gọi thẳng hàm mẫu) | Đo lại khi JS > 5 MB hoặc nạp app > 1 giây (`js/68-do-toc-do.js`) |

## 4. Rà lại việc nền trong lộ trình (QUY_CHUAN mục 8) — sửa bản rà 04/11 của TK 3
Bản rà kiểm thử 04/11 ghi "chưa thấy" một số việc nền — **sai, đã có**:
| Việc nền | Thực tế |
|---|---|
| Lưu theo ngăn | ✅ 3.223 IndexedDB chỉ ghi ngăn đổi (`js/34`); `luuNgan()` ở nơi gọi **đo 3.339: lợi ít, dễ sót ngăn → không dùng** (đúng, không phải nợ) |
| Dòng thời gian khách / tổ + chốt sổ tổ viên 31/12 | ✅ 3.359 `js/65-dong-thoi-gian.js`; cảnh báo tháng 12 khi nạp / xóa (3.357) |
| Danh mục lý do lệch | 🟡 bảng đối chiếu có "lưu ý đã biết" (js/22k); chưa có danh mục riêng anh khai được |
| Nhật ký lỗi tự động | ✅ 3.363 `js/67` (thay đề xuất "sổ lỗi" của bản rà) |
| Sức khỏe sao lưu | ✅ 3.338 `js/59` |
| `DANG_KY` (báo cáo bảng) | 🟡 có nền (js/62); dùng: Báo cáo của tôi, Sổ tổ viên |
| "Việc cần xử lý" ở Hôm nay (CCCD hết hạn, chưa TK 105, tổ lệch đối chiếu, khách không còn trong số liệu, nợ cần xử lý) | ❌ Hôm nay mới có file chờ khai + ghi chú cần xử lý |

## 5. Lộ trình dọn nền xen phát triển (mỗi bản: kế hoạch → anh duyệt → "code")
| Thứ tự | Việc nền | Đi kèm khi | Thước đo |
|---|---|---|---|
| N1 | Chuyển dần mẫu Hồ sơ sang `hsoMauGan` (09A, 01/TĐCK, 10A–10D, 11, 01/TGTV…) — **mẫu nào đụng thì chuyển mẫu đó** | mọi bản sửa mẫu | nhánh mẫu riêng 54 → giảm |
| N2 | `onclick` → `data-lenh` (`GD.dangKy`) ở file đang sửa | mọi bản | onclick 1.266 → giảm |
| N3 | Bản dọn khi ⚠ ngân sách: bỏ mã chết, mẫu cũ không còn dùng (anh duyệt từng mẫu), gộp CSS trùng | khi ⚠ | JS / CSS về dưới ngân sách |
| N4 | **"Việc cần xử lý" ở Hôm nay** (bước 8) — chờ anh chọn danh sách (mục 6) | bản riêng | — |
| N5 | Danh mục lý do lệch anh khai được (bước 6) — chờ anh (mục 6) | sau N4 | — |
| N6 | Báo cáo bảng còn lại qua `DANG_KY` khi sửa báo cáo đó | khi đụng | số khối DANG_KY tăng |

## 6. Câu hỏi chờ anh (đụng quy tắc số liệu — chưa code)
1. **Việc cần xử lý ở Hôm nay** — gom những loại nào, theo địa bàn đang lọc? Đề xuất: ① CCCD hết hạn / sắp hết hạn 30 ngày · ② tổ viên chưa có TK 105 · ③ tổ lệch đối chiếu (Mẫu 31 ↔ DSTO) · ④ khách "không còn trong số liệu" · ⑤ nợ cần quan tâm (QH, khoanh, 3 tháng KHĐ, lãi tồn > 3 tháng — như HSN). Mỗi loại có "đã xử lý" (tích, nhớ theo khách / tổ).
2. **Danh mục lý do lệch**: anh muốn tự khai thêm lý do (ô chữ + loại lệch) hay chỉ dùng danh sách app có sẵn?
