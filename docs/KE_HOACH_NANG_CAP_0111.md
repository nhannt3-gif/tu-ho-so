# Kế hoạch nâng cấp kỹ thuật — dọn rác, tốc độ, bố cục (anh duyệt 31/10/2026)

> Anh 31/10: "làm theo thứ tự em thấy ổn nhất, làm xong gộp lên luôn … em sắp xếp chạy các phần em tự quyết về tốc độ, bố cục; khi ngồi máy được anh sẽ test và góp ý thêm".
> Luật giữ nguyên: ES5, không build, không npm, thư viện theo danh mục `QUY_CHUAN_KIEN_TRUC.md` mục 10; dữ liệu khách không rời máy; mỗi bước 1 bản, đo trước / sau.
> **Ưu tiên số 1 vẫn là kỳ đối chiếu 02/11** (anh nạp file đủ tháng → dừng việc khác chốt số).

## 1. Hiện trạng (đo 31/10, bản 3.416.5)
JS 4,4 MB / 109 file (lớn nhất 139 KB) · CSS 396 KB · `onclick` trong chuỗi 1.297 · hàm chung 3.505, biến chung 576 · 220 phép thử · nạp 25.000 dòng Excel ≈ 18 s (màn hình đứng) · bản máy tính chưa chạy không mạng.

## 2. Thứ tự (TK 2 tự xếp)
| # | Việc | Rủi ro | Trạng thái |
|---|---|---|---|
| D1 | Dọn CSS chết — công cụ `tools/css_chet.py` (lớp không còn ở js/**, *.html; lớp ghép động, lớp thư viện ngoài giữ lại) | thấp | ✅ 3.417: −289 luật, −21 KB |
| D4 | Chụp ảnh hồi quy giao diện — `tools/chup_man.js` (16 màn, bộ giả, khổ 1366 + 400; so % điểm ảnh khác) | không | ✅ 3.417 |
| D3 | Ghi lỗi tự động: lỗi trên máy anh lưu cục bộ, nút 🐞 xem / chép gửi (không tự gửi đi đâu) | thấp | |
| D2 | `onclick` → `data-lenh` ở khối hay dùng (Tra cứu, Sao kê, Scan) | trung bình | |
| T2 | Đọc Excel ở luồng nền (Web Worker): màn hình không đứng khi nạp file | trung bình — hồi quy đủ | |
| T4 | Bảng ảo (chỉ vẽ phần đang nhìn) cho bảng > 500 dòng | trung bình | |
| P1 | Bản máy tính chạy không mạng, cài như phần mềm, báo có bản mới | trung bình — hồi quy đủ | |
| P2 | Ô lệnh Ctrl+K tìm chức năng / khách | thấp | |
| B | Rà bố cục từng màn theo khuôn thẻ tổ (dòng tên · dòng phụ · bảng kẻ ô · Lưu ý) — gửi ảnh trước / sau | thấp | |

## 3. Không làm (đã cân nhắc)
Viết lại bằng React / Vue / TypeScript (phải build, rủi ro phá cái đang chạy) · máy chủ riêng (dữ liệu khách rời máy) · gửi dữ liệu khách cho AI bên ngoài.

## 4. Cách kiểm mỗi bước
`python3 tests/kiem.py` · phép thử khối · `node tools/chup_man.js <app cũ> <ảnh A>` + `<app mới> <ảnh B>` + `--so A B` (đụng CSS / bố cục) · hồi quy theo đổi; đụng phần chung → hồi quy đủ.
