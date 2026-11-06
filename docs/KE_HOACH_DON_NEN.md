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

## 2. Luật "thêm 1 – dọn 1" (mới, áp từ 3.462) — ⚠ ý 1 (ngân sách KB) THAY bằng mục 7.2: anh không ép dung lượng, chỉ chống mã rác
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
| N1 | Chuyển dần mẫu Hồ sơ sang `hsoMauGan` (09A, 01/TĐCK, 10A–10D, 01/TGTV…) — **mẫu nào đụng thì chuyển mẫu đó**. ✅ 3.462 06A, BBLV · ✅ 3.463 11 mới, 11 cũ (+ bỏ `hsoLap11` cũ 72 dòng) | mọi bản sửa mẫu | nhánh mẫu riêng 54 → 52 |
| N2 | `onclick` → `data-lenh` (`GD.dangKy`) ở file đang sửa | mọi bản | onclick 1.266 → giảm |
| N3 | Bản dọn khi ⚠ ngân sách: bỏ mã chết, mẫu cũ không còn dùng (anh duyệt từng mẫu), gộp CSS trùng | khi ⚠ | JS / CSS về dưới ngân sách |
| N6 | Báo cáo bảng còn lại qua `DANG_KY` khi sửa báo cáo đó | khi đụng | số khối DANG_KY tăng |

## 6. Anh chốt 04/11
- **"Việc cần xử lý" ở Hôm nay** (QUY_CHUAN mục 8 bước 8): **bỏ khỏi việc chờ** — anh: "nào cần anh sẽ yêu cầu làm". Không làm khi anh chưa yêu cầu.
- **Danh mục lý do lệch anh khai được** (bước 6): **không cần** — giữ "lưu ý đã biết" trong bảng đối chiếu (js/22k) như hiện nay.

## 7. BẢN DỌN (3.464) — kế hoạch (04/11, chờ anh "code"; 3.463 dành cho Mẫu 11 anh yêu cầu trước)
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

### 7.2 Anh chốt hướng 04/11
> Anh: "ý anh là hạn chế code rác, tối ưu chương trình, ko phải gò ép trong khoảng nào"; "giữ mẫu cũ".
- **Bỏ ngân sách KB** (không ép dung lượng): app lớn vì chức năng thật là bình thường. `kiem.py` chỉ **in số KB để theo dõi**, không ⚠.
- **Không rút chú thích** (C4 bỏ): chú thích không chạy, không phải mã rác — giữ để người / AI sau hiểu luật anh chốt.
- **Thước đo đổi sang "mã rác" — không được tăng, mốc 0 khi dọn xong:** hàm không tới được (dò từ index.html, acorn) · hàm trùng y hệt · lớp CSS không còn dùng · mồ côi · onclick (giảm dần) · nhánh mẫu riêng (giảm dần).
- **Tối ưu chương trình = đo tốc độ thật** (nạp app, mở tab nặng, lập mẫu) — chỉ sửa chỗ đo thấy chậm.

### 7.3 Việc làm bản dọn 3.464 (chờ "code") — 3.463 đã làm trước: bỏ ⚠ ngân sách KB trong `kiem.py`
| # | Việc | Chứng minh không đổi chức năng |
|---|---|---|
| C1 | Bỏ 2 hàm không ai gọi (`ktDsBC`, `ktChonBC`); 5 hàm chỉ phép thử gọi — xem từng hàm, thừa thì bỏ cùng phép thử | `kiem.py`; phép thử liên quan |
| C2 | Gộp hàm trùng: `P()` (10A–10D, 11), `chanTrang` (07b, 10C) vào phần chung `js/mau/0hst.js`; 2 hàm ẩn trùng 04e / 09; `nguon` js/29 ↔ `pbNguon` js/47 | bản in trước / sau giống hệt (t181 + so HTML) |
| C3 | Bỏ CSS của lớp đã gỡ (~223 quy tắc, soát từng lớp — bỏ lớp ghép tên động) | ảnh bố cục t260 + hồi quy đủ |
| C4 | `kiem.py`: thêm thước đo hàm không tới được · hàm trùng · lớp CSS chết (mốc 0 sau C1–C3); bỏ ⚠ ngân sách KB | t192 |
| C5 | Đo tốc độ: nạp app, mở Tổng hợp / Sao kê / Tổ / Hồ sơ vay với bộ giả lớn (`js/68-do-toc-do.js` có sẵn) → ghi bảng; chỗ > 300 ms mới đề xuất tối ưu | số đo |

### 7.5 Kết quả bản dọn 3.464 (04/11, anh "code tiếp cho bản dọn")
| # | Việc | Kết quả |
|---|---|---|
| C1 | Hàm thừa | bỏ `ktDsBC`, `ktChonBC` (không ai gọi). Giữ 5 hàm chỉ phép thử gọi — lõi nghiệp vụ có phép thử: `pbTongHopCT` (t250), `dsTimCCCD` (t337, t357), `kcNguon` (t275), `soTrDau` (t158), `ktttHTML` (t273) |
| C2 | Hàm trùng | `P()` của 10A / 10B / 10C / 10D → `HST.P` (cùng 11 mới, 11 cũ từ 3.463); `chanTrang` 07b / 10C → `omChanTrang` (js/31). **Giữ có lý do:** `nguon` (js/29 lớp kho) ↔ `pbNguon` (js/47 chạy độc lập trong phép thử node — không gọi chéo tầng); đoạn gộp trang PDF trong 04e / 09 (hàm lồng dùng biến tại chỗ) |
| C3 | CSS chết | bỏ 82 quy tắc / 50 lớp (~8 KB). Giữ: `gl-c3…12` (ghép tên `'gl-c'+o[2]`, Giấy lĩnh), lớp pdf.js tự sinh (`markedContent`, `endOfContent`, `active`) |
| C4 | Thước đo | `kiem.py` + `tests/rac.js` (acorn): **hàm không tới được 0 · hàm trùng 2 · lớp CSS chết 0** — không được tăng; bỏ ⚠ ngân sách KB (3.463) |
| C5 | Tốc độ (máy ảo, bộ giả 25.000 khách, 2 kỳ Mẫu 31) | mở app 475 ms · nạp 7 file 13 giây (1 lần / kỳ) · dựng kỳ 686 ms · mở tab Tổng hợp 39 · **Tổ 461 (lại 174)** · Tra cứu 149 · Sao kê 19 · Hồ sơ vay 31 · Hồ sơ Tổ 27 · KTGS 71 · Nạp & KT 8 ms. **Chỉ tab Tổ > 300 ms** → đề xuất tối ưu riêng (chờ anh) |

## 8. KẾ HOẠCH DỌN + CHUYỂN CHUẨN TUẦN TỰ — anh duyệt 04/11 ("duyệt, em làm tuần tự không cần hỏi lại, đảm bảo code sạch, tối ưu")
Luật: mỗi bản `kiem.py` sạch + trong mốc · phép thử phần sửa · hồi quy theo đổi (đủ mỗi 3–4 bản / khi đụng phần chung) · tự PR + gộp, báo anh vài dòng. **Chỉ dừng hỏi** khi phải đổi / bỏ chức năng hoặc đụng chữ mẫu biểu. Chuyển mẫu Hồ sơ: bản in trước / sau **giống hệt từng chữ** (phép thử so tự động), lệch → dừng.

| # | Bản | Việc | Thước đo | Tiến độ |
|---|---|---|---|---|
| Đ1 | 3.471 | Phân bổ › Diễn biến bảng cơ bản (a Xem thêm ẩn biểu đồ · b cột dư nợ 31/12 · c CT › Xã) | anh dùng được | ✅ 3.471 (+ tách js/48b) |
| Đ2 | 3.472 | Gom lớp vá tên xã cũ (`toTenXa`, `xaTenSach`) về bảng tên chuẩn 3.470 | ít hàm trùng | ✅ 3.472 (lõi `slXaTenTu`) |
| Đ3 | 3.473–3.476 | Mẫu Hồ sơ còn lại → `hsoMauGan`: ① 01/TD · 03/TD · 01/UQ · 01/GQVL · 07B · PDNH ② Sổ hộ vay ③ 09A · 01/TĐCK · 06/TD · 01/BG · 02/BG · 01/TGTV ④ 10A–10D · 10C cũ | nhánh mẫu riêng 52 → 0 || ✅ **gộp 1 bản 3.473** (cả 4 nhóm: nhánh 52 → 0; chụp 172 trạng thái giống hệt) |
| Đ4 | 3.477–3.480 | `onclick` → `data-lenh` (2–3 file lớn / bản: 22k, 04c, 10, 22e, 12, 12b, 06a, 11, 04b3…) | onclick 1.266 → ~700 || 🟡 3.474 Nạp & KT (66) + hàng chờ `gdDangKy` · 3.475 menu chuột phải + dải tháng · 3.476 công cụ `tools/doi_onclick.py` cho 70 file · 1.266 → 467 (còn: dạng phức tạp + js/04b cửa sổ nổi) |
| Đ5 | 3.481–3.482 | Phần còn đọc số liệu riêng → `KHO` (Theo dõi nợ, mini GDX, đọc sâu kỳ riêng) | chỗ đọc riêng 0 || ✅ rà 3.477: đã xong từ trước (Theo dõi nợ gỡ 3.399, mini GDX qua KHO, thước đo đọc thẳng = 0) |
| Đ6 | 3.483 | Tối ưu tab Tổ (461 ms) | < 300 ms || ✅ 3.489: lần đầu 312–333 → 173–273 ms (cùng máy, bộ giả 25.000 khách) — `toKhach` / hạn CCCD 1 lần trong 1 lần vẽ thẻ tổ, `skNhomDH` bỏ tính ngày chuyển QH khi không cần; bản in / bảng giống hệt từng ký tự (so cũ ↔ mới) |
| Đ7 | xen kẽ | File đang sửa: tách dòng > 400 ký tự, báo cáo bảng qua `DANG_KY` | dòng dài 159 → giảm | |
Không trong kế hoạch (chờ anh): "Việc cần xử lý" Hôm nay; ý a / b QĐ (cảnh báo Biểu 07 đã xuất, nhật ký sửa QĐ); máy chủ nội bộ.
