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
| Danh mục lý do lệch | ✅ đủ — "lưu ý đã biết" trong bảng đối chiếu (js/22k); anh 04/11: không cần danh mục khai thêm |
| Nhật ký lỗi tự động | ✅ 3.363 `js/67` (thay đề xuất "sổ lỗi" của bản rà) |
| Sức khỏe sao lưu | ✅ 3.338 `js/59` |
| `DANG_KY` (báo cáo bảng) | 🟡 có nền (js/62); dùng: Báo cáo của tôi, Sổ tổ viên |
| "Việc cần xử lý" ở Hôm nay | ⏸ anh 04/11: bỏ khỏi việc chờ, cần thì anh yêu cầu (mục 6) |

## 5. Lộ trình dọn nền xen phát triển (mỗi bản: kế hoạch → anh duyệt → "code")
| Thứ tự | Việc nền | Đi kèm khi | Thước đo |
|---|---|---|---|
| N1 | Chuyển dần mẫu Hồ sơ sang `hsoMauGan` (09A, 01/TĐCK, 10A–10D, 11, 01/TGTV…) — **mẫu nào đụng thì chuyển mẫu đó** | mọi bản sửa mẫu | nhánh mẫu riêng 54 → giảm |
| N2 | `onclick` → `data-lenh` (`GD.dangKy`) ở file đang sửa | mọi bản | onclick 1.266 → giảm |
| N3 | Bản dọn khi ⚠ ngân sách: bỏ mã chết, mẫu cũ không còn dùng (anh duyệt từng mẫu), gộp CSS trùng | khi ⚠ | JS / CSS về dưới ngân sách |
| N6 | Báo cáo bảng còn lại qua `DANG_KY` khi sửa báo cáo đó | khi đụng | số khối DANG_KY tăng |

## 6. Anh chốt 04/11
- **"Việc cần xử lý" ở Hôm nay** (QUY_CHUAN mục 8 bước 8): **bỏ khỏi việc chờ** — anh: "nào cần anh sẽ yêu cầu làm". Không làm khi anh chưa yêu cầu.
- **Danh mục lý do lệch anh khai được** (bước 6): **không cần** — giữ "lưu ý đã biết" trong bảng đối chiếu (js/22k) như hiện nay.

## 7. BẢN DỌN 3.463 — kế hoạch (04/11, chờ anh duyệt + "code")
### 7.1 Đo trước khi dọn (bản 3.462, 137 file JS nạp lúc mở app = 3.903 KB)
| Thành phần | KB | Cách đo |
|---|---|---|
| Mã chạy | 1.864 | phân tích cú pháp (acorn) |
| Chuỗi chữ / HTML trong mã | 1.331 | rải đều; chuỗi đơn > 1,5 KB chỉ 3 cái (logo, CSS mini GDX) |
| **Chú thích** | **594** | trong đó **278 KB mở đầu bằng số bản** ("3.214: …" — kể lại diễn biến sửa, đã có trong CHANGELOG); 225 KB có trích lời anh / luật |
| Thụt đầu dòng | 113 | |
| Hàm không tới được (dò từ index.html + mã chạy lúc nạp) | 3 (7 hàm) | 2 không ai gọi (`ktDsBC`, `ktChonBC`), 5 chỉ phép thử gọi |
| Hàm trùng y hệt | 6 | `P()` lặp ở 10A / 10B / 10C / 10D / 11; `chanTrang` 07b ↔ 10C |
| CSS lớp không còn trong js / html | ~16 (223 quy tắc) | cần soát từng lớp (tên ghép động) |
| Mẫu cũ còn giữ | 37 | `10ccu` (12) · `11cu` (25) — hồ sơ trước 01/10/2026 |
**Kết luận:** app lớn lên do **chức năng thật + chú thích lịch sử**, không phải do mã thừa (mã chết chỉ 3 KB). Muốn giảm đáng kể chỉ có 2 đường: rút gọn chú thích lịch sử, hoặc bỏ mẫu cũ.

### 7.2 Việc làm (mỗi việc có cách chứng minh không đổi chức năng)
| # | Việc | Ước giảm | Chứng minh |
|---|---|---|---|
| C1 | Bỏ 2 hàm không ai gọi; 5 hàm chỉ phép thử gọi: giữ nếu phép thử kiểm lõi nghiệp vụ, còn lại bỏ cùng phép thử | ~3 KB | `kiem.py` thiếu hàm = 0; phép thử liên quan |
| C2 | Gộp `P()` / `chanTrang` trùng vào phần chung Hồ sơ Tổ (`js/mau/0hst.js`) | ~6 KB | so HTML bản in 10A–10D, 11, 07b trước / sau giống hệt (t181) |
| C3 | Bỏ quy tắc CSS của lớp đã gỡ — soát từng lớp, bỏ lớp ghép động | ~10–16 KB | ảnh bố cục t260 + hồi quy đủ |
| C4 | **Rút gọn chú thích lịch sử**: chú thích mở đầu bằng số bản → giữ **luật / vì sao / lời anh chốt** (1–2 dòng + số bản để tra CHANGELOG), bỏ phần kể diễn biến sửa | ~120–180 KB | **so cây cú pháp trước / sau (bỏ chú thích) giống hệt từng file** → chắc chắn 0 thay đổi mã; hồi quy đủ |
| C5 | ~~Bỏ mẫu cũ `10C/TD cũ`, `11/TD cũ`~~ — **anh 04/11: GIỮ mẫu cũ** | 0 | — |
| C6 | Thước đo: tách "JS mã" (không tính chú thích) và "chú thích" trong `kiem.py` — ngân sách áp cho **mã**; chú thích có trần riêng (≤ 15 % JS) | — | `kiem.py` |
Sau dọn: đặt mốc mới (`kiem.py --moc`), ghi CHANGELOG.

### 7.3 Câu hỏi chờ anh
1. **C4 rút gọn chú thích lịch sử** — đồng ý? (không đổi mã; lịch sử đầy đủ vẫn ở CHANGELOG + git)
2. ~~C5 mẫu cũ~~ — **anh 04/11: giữ mẫu cũ.**
3. **C6 đổi thước đo** sang tính mã không kèm chú thích — đồng ý?
