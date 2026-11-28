# TỐI ƯU APP · DỌN RÁC · KIỂM LOGIC — đo 28/11/2026 (bản 3.574) · **chờ TK 2 + anh chia việc**

> Anh 28/11: *"Phiên này tối ưu app"* → *"Tối ưu app, dọn rác, kiểm logic"* → *"Em chờ TK 2 và chia việc làm"*.
> Phiên TK chính. **Chưa sửa code.**
> Máy đo: máy chủ đám mây, Chromium không giao diện. Dữ liệu GIẢ `tests/gia31` (`taogia.py 25000 … m31`: 25.057 món, cỡ một PGD thật). Nên so tỉ lệ giữa các lần đo, không so số tuyệt đối với máy anh.

## 1. Số đo

| Bước | 15/11 (3.544) | 28/11 (3.574) | Nhận xét |
|---|---|---|---|
| Mở app (chưa có số) | 0,4 s | 0,45 s · CPU chậm ×4: 0,9 s | Ổn |
| Đọc bộ 7 file Excel | ≈ 18 s | **10,8–11,3 s** | Vẫn chậm nhất khi nạp |
| Ghi kho sau khi đọc | — | 2,4 s | |
| Mở tab Sao kê (`KHO.nap`) | — | 1,5 s | |
| **Xem Sao kê theo chương trình (`ct`), toàn PGD** | — | **26,7 s** (lập 1,6 s + vẽ khung xem 25 s) | **Điểm nghẽn mới, lớn nhất** |
| **Sao kê biến động TK 105 (`b105`)** | — | **19,5 s** | HTML ra 4 MB |
| Sao kê theo nhà đầu tư (`ndt`) | — | lập 1,6 s, HTML ra 5,8 MB (≈ như `ct`) | |
| Danh bạ SĐT (`sdt`) | — | 8,4 s | HTML 1,6 MB |
| Dư nợ theo đối tượng (`ddn`) | — | 4,0 s | |
| Các ô mới 3.570–3.574 (KHĐ / QH / Khoanh / VB 180 / KQGD) | — | 0,4–0,7 s mỗi ô | Ổn |

**Nguyên nhân (suy từ số đo, chưa bấm giờ từng hàm):**
- Phần lập báo cáo chỉ mất 1,6 s.
- Gần hết thời gian còn lại là khung xem (`xemChuan` → `inChuan`) dựng một trang HTML 4–6 MB, chia trang và đo co chữ cho từng trang trong khung xem.
- Ở cấp tổ / điểm thì nhanh. Chậm chỉ khi xem toàn PGD hoặc cả xã.

## 2. Kiểm logic (bước đầu, tự động)
- Chạy **44 báo cáo Sao kê** ở cấp toàn PGD trên bộ giả lớn: **không báo cáo nào lỗi**, trang không có lỗi JS.
- **8 báo cáo gần rỗng** vì bộ giả thiếu cột / file, nên **chưa kiểm được logic**: `khd_abc`, `khd_ng`, `kn_hh` (thiếu lãi suất / file hạn), `tk0`, `m105`, `kqgd31` (thiếu PDF KQGD), `dh_kq`, `cgn`.
- Đề xuất bổ sung bộ giả cho đủ, rồi thêm 1 phép thử **"khớp tổng"**: dư nợ / QH / khoanh / KHĐ ở mọi báo cáo phải bằng tổng bộ giả (`taogia` in sẵn TONG).

## 3. Rác tìm thấy
| Loại | Hiện trạng | Đề xuất |
|---|---|---|
| Hàm chỉ phép thử gọi | 6 hàm: `kcNguon`, `ktNguonNap`, `ktttHTML`, `pbTongHopCT`, `scanAnhGhep`, `soTrDau` | Xem từng hàm: bỏ hẳn hoặc nối lại vào chỗ dùng |
| Tài liệu cũ | `docs/` có 76 file; `KE_HOACH_*`, `RA_SOAT_*`, `TEO_*` đã làm xong nằm lẫn với file đang dùng | Chuyển sang `docs/luu_tru/`, cập nhật `docs/README.md` |
| `BAN_GIAO_VIEC_CON_LAI.md` | 580 KB, mỗi bản lại dài thêm | Cắt phần cũ sang lưu trữ, giữ bảng thử máy thật còn mở |
| Hộp thư `PHOI_HOP_CHUNG.md` mục 14 | 95 dòng, ≈ 50 dòng mở, nhiều dòng đã cũ | Chuyển nguyên văn sang `luu_tru` (V11) |
| Phép thử | 303 file `tests/t*.js` | Rà trùng và phép thử của chức năng đã gỡ (luật CLAUDE.md "rà định kỳ") |
| Mã ẩn giữ lại | Còn ít (`kyThieu` — 3.144) | Gỡ khi rà hàm |

## 4. Đề xuất chia việc (chờ TK 2 đồng ý + anh duyệt)
TK 2 đang giữ `js/22*`, `js/99b`–`99h`, `css/app.css`. Phiên này nhận các việc không đụng những file đó, hoặc báo trước khi đụng.

| Mã | Việc | Ai | File | Mức phép thử |
|---|---|---|---|---|
| T1 | **Sao kê toàn PGD nhanh lại** (mục tiêu < 3 s): bấm giờ từng hàm trước. Hướng dự kiến: khung xem chỉ dựng vài trang đầu và vẽ tiếp khi cuộn; chia trang theo số dòng, không đo co chữ từng trang; Excel / In vẫn đủ | TK chính | `js/05-them-file.js` (khuôn xem / in chung), `js/72`, `74`, `74b`, `76` | Hồi quy đủ (đụng khuôn in chung) |
| T2 | **Đọc Excel ở luồng nền** (11 s): đọc cả file trong Web Worker, có thanh tiến độ | **TK 2** (file `js/22k` của TK 2), hoặc TK 2 giao lại cho TK chính | `js/22k-nap-kt.js` | Hồi quy đủ |
| T3 | Dọn rác mục 3: 6 hàm, tài liệu cũ, hộp thư, phép thử trùng | TK chính | `docs/`, `tests/`, các hàm lẻ (báo TK 2 nếu nằm trong file của TK 2) | `kiem.py` + `doi 2` |
| T4 | Kiểm logic: bổ sung bộ giả + phép thử "khớp tổng" mục 2 | TK chính | `tests/taogia.py`, `tests/t4xx.js` | Chỉ phép thử mới |
| T5 | Sửa lỗi logic T4 tìm ra trong file của TK 2 | TK 2 | `js/22*`, `99*` | Theo khối |

**Thứ tự đề xuất:** T1 (anh thấy ngay) → T4 → T3. T2 làm song song khi TK 2 rảnh.
