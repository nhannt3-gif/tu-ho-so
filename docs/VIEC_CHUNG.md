# VIỆC CHUNG — bảng chia việc TK 1 (Kho) · TK 2 (App) — **chốt 28/11/2026**

> Anh 28/11:
> - *"tối ưu phát triển app và kho dữ liệu chung, giao ban sẽ làm sau"*;
> - *"Em cứ chia đều 2 TK và báo anh khi yêu cầu 2 bên cùng làm"*;
> - *"Tối ưu app, dọn rác, kiểm logic"*;
> - *"Khi nào 2 bên chia xong báo anh và cùng làm 1 lần"*.
>
> Bảng này theo dòng hộp thư TK 2 "CHIA VIỆC CHỐT" ngày 28/11, cộng thêm việc tối ưu / dọn rác / kiểm logic ở `TOI_UU_2811.md`.
> Mỗi việc có **1 chủ**. Chủ việc tự sửa ô trạng thái. Theo dõi việc ở bảng này, không dò hộp thư.

## 1. Vai và file mỗi bên giữ (Giao ban hoãn)

| Vai | Ai | File giữ (chủ sửa) |
|---|---|---|
| **Kho dữ liệu chung**: nạp, kiểm, lưu, đồng bộ, tốc độ nạp, dọn rác, kiểm logic | **TK 1** | `js/22k-nap-kt`, `29-kho`, `32-kho-luu`, `36-dong-bo-khoi`, `73-kho-chuan`, `93-moc-vang`, `94-may-that`, `95-clt02`, `99h-tu-quet`, phần nạp của `22-so-lieu`; `docs/COT_FILE_MAU.md`, `TU_DIEN_TRUONG.md`; `tests/taogia.py` + phép thử mới của TK 1 |
| **App chính**: nghiệp vụ, báo cáo, màn hình, khung xem / in | **TK 2** | Mọi file `js/` còn lại + `css/app.css` |
| Giao ban | hoãn | Giữ nguyên Drive / sổ luật |

**Việc 2 bên cùng làm (báo anh trước khi bắt đầu):**
- đổi cửa kho (`js/29-kho.js`) mà màn App đang gọi;
- khuôn gói số liệu B1 nếu App cần đọc lại;
- lên số bản: fetch main ngay trước khi gộp, lấy số kế tiếp, không mở 2 PR đổi số bản cùng lúc.

Đụng file của bên kia: ghi 1 dòng hộp thư trước, không sửa ngầm.

## 2. Bảng việc

| Mã | Việc | Chủ | Chờ | Trạng thái |
|---|---|---|---|---|
| **K1** (V3 + T2) | **Đọc Excel ở luồng nền** (Web Worker) + thanh tiến độ. Hiện 11 s / bộ 25k món, mục tiêu ≤ 5 s và không đứng màn | TK 1 | — | mở |
| **K2** (V4) | Liên kết khóa KH · món · tổ · điểm giữa các file trong kho; báo dòng mồ côi ở Nạp & KT | TK 1 | — | mở |
| **K3** (B1 / V5) | Gói số liệu kỳ `GOI_SO_LIEU_<ngày>.json.gz` theo `KHUON_SO_LIEU_CHUNG.md` | TK 1 | — | mở |
| **K4** | QT-C-09: phép thử chung C09-1 đo ở 📤 file đối chiếu | TK 1 | — | mở |
| **K5** (T4) | **Kiểm logic**: bổ sung bộ giả (lãi suất, file hạn, PDF KQGD) cho 8 báo cáo đang ra rỗng; phép thử "khớp tổng" dư nợ / QH / khoanh / KHĐ ở mọi báo cáo = TONG bộ giả. Lỗi tìm ra → hộp thư, TK 2 sửa | TK 1 | — | mở |
| **K6** (T3) | **Dọn rác**: tài liệu cũ sang `docs/luu_tru/`; cắt `BAN_GIAO_VIEC_CON_LAI.md` (580 KB); hộp thư (V11); rà phép thử trùng / phép thử của chức năng đã gỡ; 6 hàm chỉ phép thử gọi (hàm ở file TK 2 thì báo TK 2) | TK 1 | — | mở |
| **K7** | Soát số thật các ô Sao kê 3.570–3.575 trên Drive (chỉ số đếm) + số chỉ tiêu Gò Dầu ở phụ lục CV 180 → hộp thư | TK 1 | — | mở |
| **K8** (V2, V7) | Làm lại đáp án Kiểm mốc nếu đỏ; tìm nguyên nhân lỗi lưu iPhone | TK 1 | V1 | chờ |
| **A1** (T1) | **Sao kê toàn PGD nhanh lại**: hiện `ct` 26,7 s, `b105` 19,5 s, `sdt` 8,4 s, `ddn` 4 s; mục tiêu < 3 s. Khung xem chỉ dựng vài trang đầu, chia trang theo số dòng; Excel / In vẫn đủ | TK 2 | — | ✓ 3.577 (ct 24,9 → 3,6 s · b105 18,1 → 2,8 s · sdt 8,2 → 1,3 s · ddn 4,0 → 2,2 s; còn lại là lập báo cáo) |
| **A2** | Số tháng lãi nhóm A/B/C theo QT-C-23 (lãi suất %/năm) | TK 2 | — | ✓ 3.576 |
| **A3** | Đặt mặc định chỉ tiêu VB 180 | TK 2 | K7 | chờ |
| **A4** | Soát CI + hồi quy, sửa ngay lỗi TK 1 báo (gồm lỗi từ K5) | TK 2 | — | thường trực |
| **A5** | C11 Biến động tổ làm lại đơn giản: đề xuất khuôn → anh duyệt | TK 2 | anh | mở |
| **A6** (V10) | CSP, sau K8 | TK 2 | K8 | chờ |
| — | ~~C1 giao việc tự chấm~~: anh 28/11 *"Để bên giao ban"*, **hoãn ở app** | — | Giao ban mở lại | hoãn |
| **V1** | Anh thử máy thật 30 phút: Kiểm mốc, lãi suất A/B/C, khớp điểm KQGD, quyền đọc Drive tự quét, lưu iPhone | anh | — | mở |

## 3. Nhịp làm việc
- Mỗi phiên chỉ đọc: `TRANG_THAI_CHUNG.md` + bảng này + mục đầu nhật ký vai.
- Mỗi bản gộp liền khi phép thử khối đạt (anh 28/11). Bản kế chỉ bắt đầu khi 5 kiểm tra GitHub của bản trước đã xanh.
- Việc đụng khuôn xem / in chung (A1) hoặc lưu / đồng bộ (K1–K3) phải chạy hồi quy đủ (`tat`).
- Số đo trước / sau mỗi việc tối ưu ghi vào `TOI_UU_2811.md`.
