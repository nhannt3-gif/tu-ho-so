# VIỆC CHUNG — bảng chia việc (phiên đánh giá soạn 28/11/2026, **chờ anh duyệt**)

> Anh 28/11: *"Phối hợp và chia việc tối ưu"* → *"Hiện nay cứ tối ưu phát triển app và kho dữ liệu chung, giao ban sẽ làm sau"*.
> Bảng này thay cho việc dò hộp thư (`PHOI_HOP_CHUNG.md` mục 14 có 92 dòng, 58 dòng "mở", phần lớn đã cũ). Mỗi việc có **1 chủ**; bên nhận sửa ô trạng thái. Mỗi dòng tối đa 2 câu, chi tiết để ở file kế hoạch.

## 1. Vai trong giai đoạn này (Giao ban tạm hoãn)

| Vai | Ai | Phạm vi file (chủ sửa) | Không đụng |
|---|---|---|---|
| **App chính**: nghiệp vụ, báo cáo, màn hình | TK 2 | Sao kê / ô báo cáo (`js/22h`, `74*`–`76*`, `99c`–`99g`), hồ sơ, KTGS, mẫu in, GD lệnh, CSS | Lớp kho / nạp, chỉ gọi qua cửa kho |
| **Kho dữ liệu chung** (vai mới, thay Giao ban tạm thời) | TK 1 | Nạp + kiểm + lưu + đồng bộ: `js/22k-nap-kt`, `29-kho`, `32-kho-luu`, `36-dong-bo-khoi`, `73-kho-chuan`, `93-moc-vang`, `94-may-that`, `95-clt02`, `99h-tu-quet`, phần nạp của `22-so-lieu`; `docs/COT_FILE_MAU.md`, `TU_DIEN_TRUONG.md` | Màn hình báo cáo của TK 2 |
| **Đánh giá và đề xuất** | phiên đánh giá (TK chính), tuần 1 lần hoặc khi anh gọi | Chỉ `docs/`: đo tốc độ, rà kiến trúc, dọn hộp thư, ý tưởng mới | Không code app |
| Giao ban | hoãn | Giữ nguyên Drive / sổ luật; mở lại khi anh nhắn | — |

**Luật giao tiếp giữa 2 vai code:**
1. TK 2 chỉ đọc kho qua cửa kho (`js/29-kho.js`, QUY_CHUAN mục 3). TK 1 đổi cửa kho thì phải giữ hàm cũ chạy được và kèm phép thử.
2. Lên số bản: vẫn theo `PHOI_HOP_TK2_TK3.md` mục 2. Hai TK không mở 2 PR đổi số bản cùng lúc: ai gộp sau thì gộp main vào nhánh, lấy số kế tiếp rồi mới gộp.
3. Đụng file của vai kia thì ghi 1 dòng ở mục 2 bảng này trước, không sửa ngầm.

## 2. Bảng việc

| Mã | Việc | Chủ | Chờ ai | Trạng thái |
|---|---|---|---|---|
| V1 | **Thử máy thật 30 phút**: 🧪 Kiểm mốc 31/10; đơn vị lãi suất nhóm A/B/C (3.572); khớp điểm KQGD (3.566 / 3.573); quyền đọc Drive tự quét (3.574); lỗi lưu iPhone | anh | — | mở |
| V2 | Kiểm mốc đỏ sau 3.563 (KHĐ / QH lấy từ Mẫu 31) thì làm lại đáp án mốc 31/10 cho đúng luật mới | TK 1 | V1 | mở |
| V3 | **Tốc độ nạp**: Excel 25k dòng ≈ 18 s, đưa phần đọc sang Web Worker (thư viện đã duyệt, không npm), có thanh tiến độ | TK 1 | — | mở |
| V4 | **Kho chuẩn**: liên kết khóa (KH · món · tổ · điểm) giữa Mẫu 31, Dư nợ chi tiết, KQGD, CLT02; báo dòng mồ côi ở Nạp & KT | TK 1 | — | mở |
| V5 | **Gói số liệu chung** (B1): 1 file JSON / CSV xuất từ kho theo `KHUON_SO_LIEU_CHUNG.md`. Kho tự chốt định dạng; Giao ban dùng khi mở lại | TK 1 | — | mở |
| V6 | **File tham số chung** (B2): ngưỡng, hệ số, danh mục điểm / Hội ở 1 chỗ, app và giao ban cùng đọc | TK 1 | anh duyệt danh mục | mở |
| V7 | Lỗi lưu iPhone: đọc `may_that.json` (Drive `_Hệ thống`), tìm nguyên nhân | TK 1 | V1 | mở |
| V8 | Việc nghiệp vụ App đang dở (KQGD, VB 180: điểm CL giao dịch xã, lãi tồn so đầu năm) | TK 2 | nguồn số liệu | mở |
| V9 | C1 chấm điểm việc giao tự động | TK 2 | anh duyệt | chờ |
| V10 | CSP (E3) bật lại chỉ sau khi thử Safari iPhone đạt | TK 2 | V7 | chờ |
| V11 | Dọn hộp thư: chuyển 34 dòng ✓ và các dòng Giao ban đã cũ sang `docs/luu_tru/HOP_THU_DEN_2811.md`, giữ nguyên văn | phiên đánh giá | anh duyệt | chờ |

## 3. Nhịp làm việc
- Mỗi phiên chỉ đọc: `TRANG_THAI_CHUNG.md` + bảng này + mục đầu nhật ký vai.
- Mỗi bản: gộp liền khi phép thử khối đạt (anh 28/11). Bản kế tiếp chỉ bắt đầu khi 5 kiểm tra GitHub của bản trước đã xanh.
- Anh dành 1 buổi / tuần thử máy thật (V1). Phiên đánh giá chạy sau buổi đó để cập nhật bảng.
- Model: việc thường dùng mặc định; việc thiết kế kho (V4, V5) hoặc dò lỗi khó (V7) mới dùng model mạnh nhất.
