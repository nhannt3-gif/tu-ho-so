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

## 4. Chia việc — đã chốt ở `docs/VIEC_CHUNG.md` (28/11)
- T1 Sao kê nhanh → **A1 (TK 2)**: khung xem / in và `js/72`, `74`, `76` là file TK 2.
- T2 đọc Excel luồng nền → **K1 (TK 1)**.
- T3 dọn rác → **K6 (TK 1)**.
- T4 kiểm logic → **K5 (TK 1)**; lỗi tìm ra thì TK 2 sửa (A4).

## 5. Kết quả A1 (TK 2, 3.577)
| Báo cáo toàn PGD | 3.574 | 3.577 |
|---|---|---|
| `ct` | 24,9 s | 3,6 s |
| `b105` | 18,1 s | 2,8 s |
| `sdt` | 8,2 s | 1,3 s |
| `ddn` | 4,0 s | 2,2 s |

Cách làm: khung xem chỉ dựng 20 trang đầu; HTML > 400 KB cắt còn 1.200 dòng trước khi nạp khung; In / PDF nạp lại bản đủ. Phần còn lại (1,5–2 s) là lập báo cáo (`skBaoCao`) + cắt dòng (DOMParser ≈ 0,5 s).
