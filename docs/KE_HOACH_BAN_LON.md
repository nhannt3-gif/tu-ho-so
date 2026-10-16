# Kế hoạch BẢN LỚN 3.223 — mẫu đúng form gốc · ô tùy biến mọi chỗ chấm · sổ hộ vay đủ cột · lưu an toàn (anh chốt 16/10/2026 — CHỜ ANH NHẮN "code")

> Tài khoản nào làm tiếp: đọc file này + `QUY_CHUAN_KIEN_TRUC.md` mục 9 trước. Làm **1 bản** (anh: "gộp làm 1 lần, làm kỹ"), bên trong chia **mốc**; qua đủ cửa kiểm của mốc trước mới làm mốc sau. Anh thử **1 lần** theo bảng thử cuối bản.

## 0. Ý anh (16/10, ghi đủ)
1. Mọi chỗ chấm trên hồ sơ: **in bản trắng mặc định chấm**; **mọi chỗ** khai được: để chấm / lấy số liệu tự động / khai 1 lần.
2. **Bản trắng:** phần NH in sẵn trên giấy thật (đầu trang, tên PGD, kính gửi) **vẫn in**, có công tắc bỏ.
3. **Bản mẫu:** mức điền tùy lúc — điền hết / chừa phê duyệt NH / chừa UBND + NH / tùy chọn từng phần. **Câu phê duyệt (UBND / NH / chữ ký) anh tự khai.**
4. **Khai báo riêng trực quan:** rộng rãi, hiện mẫu như giấy thật, bấm đúng vị trí ô để khai. **Chọn nhanh** như Giao dịch xã: ô tích Chọn nhanh ra cột trái để đổi nhanh khi in.
5. **Khung xem luôn đúng bố cục file gốc:** số liệu nằm vào đúng chỗ chấm, **không xô form**, không thêm / bớt trang. Chữ dài quá khung: thu nhỏ, quá mức thì báo (ít gặp — thử thực tế sẽ báo để tối ưu, vd tên quá dài). Bảng: đúng số dòng theo mẫu, hết sang trang mới (lặp tiêu đề).
6. **Lưu file Word / PDF mẫu anh gửi làm chuẩn gốc** và so theo đó. Lưu hết trên repo; cần thì đổi sang tên giả / số liệu giả.
7. **Cấu trúc:** dễ bảo trì, có lớp từng loại; hàm / mẫu đã chuẩn giữ an toàn — **sửa mẫu này không lỗi mẫu kia**; bản mới phải đảm bảo mẫu cũ chạy chuẩn; mọi thứ **độc lập, cắm và rút**.
8. **Sổ hộ vay đủ cột** (thêm hộ — đã bàn, chưa làm): đủ thông tin cho mọi ô tự động của các mẫu.
9. Hồ sơ Tổ làm đồng bộ (10C, 10A, 10B, 11); **01/BG, 02/BG làm riêng sau**. **Điện thoại tạm dừng** (bàn riêng: chủ yếu truy vấn, xem).

## 1. Mốc trong bản (thứ tự làm)
| Mốc | Việc | Cửa kiểm để qua mốc |
|---|---|---|
| **M0** | **Chuẩn & khóa:** `tests/chuan/` = bản in chuẩn khóa của MỌI mẫu đang chạy (Giao dịch xã 4, KTGS khóa, Hồ sơ vay 8, Hồ sơ Tổ 6) × trạng thái (trắng · có số liệu giả · bản mẫu); `tests/mau_goc/` = file Word / PDF anh gửi (số liệu giả nếu có) + số đo rút ra; `tools/domau.py` (tách chữ, chuyển trang ra ảnh bằng LibreOffice / pdftoppm, đo lề, khối, số trang); phép thử **t179 chuẩn khóa** (từng ký tự) · **t180 chuẩn gốc** (chữ + số trang + lề ±1–2 mm) · **t181 chồng khít** (vị trí khối bản trắng = có số liệu = bản mẫu ±0,5 mm, cùng số trang) | Bộ chuẩn chạy xanh trên bản 3.222 hiện tại (ghi lại chỗ lệch chuẩn gốc → việc của M3–M7) |
| **M1** | **Lưu an toàn B1:** tự chụp khai báo (hằng ngày + trước mỗi lần đồng bộ, giữ 10 bản) · khôi phục 1 bản chụp · **xuất / nhập khai báo ra file** (bổ sung 4, theo nhóm; nhóm có số liệu khách mặc định không tích) · cửa lưu `KHO1` mỏng (doc / ghi / chup / khoiPhuc) bọc cách lưu hiện tại | t182; dữ liệu cũ đọc được; t179 xanh |
| **M2** | **Sổ hộ vay đủ cột:** rà ngược mọi ô 🤖 của 12 mẫu → danh sách trường (nhân thân · địa chỉ thường trú / hiện tại · liên hệ · nghề nghiệp, nơi làm việc, thu nhập, MST, email · thành viên / thừa kế · HSSV · TK) → form lưới thêm nhóm (Enter / Tab, thu gọn nhóm ít dùng) + cột **Cần bổ sung theo mẫu**; hộ cũ vẫn đọc Mẫu 31 mới nhất, chỉ lưu phần Mẫu 31 không có | t175 + phép thử mới; sổ cũ đọc được |
| **M3** | **Nền ô `js/31-o-mau.js`** (lớp riêng, hợp đồng + phép thử riêng): hàm ô chung (khung cố định mm, chữ trên đường chấm, tự thu nhỏ, báo dài) · **sổ mẫu** (mỗi mẫu đăng ký: mã, tên, tab, phần, ô, hàm dựng — mẫu không gọi mẫu khác) · 3 kiểu in 📄 Trắng / 🖨 Thật / 📝 Mẫu + mức điền · **cửa sổ khai báo trực quan** (trang như giấy ~65 % + ô đang chọn ~35 %, màu ✍ xám / 🤖 xanh lá / ✎ xanh dương, đổi cả phần, ↺, xem thử 3 kiểu) · Chọn nhanh ra cột trái · khóa cũ `hsoLuu().cham / chamGT` giữ nguyên | t183 nền; mẫu chưa chuyển chạy cách cũ, t179 xanh |
| **M4** | 01/TD, 01/UQ lên nền mới, đo theo file gốc | t179 (mặc định = bản cũ, trừ bản trắng chấm) · t180 · t181 |
| **M5** | 03/TD (bảng số dòng cố định), 01/TGTV, 09A + 01/TĐCK | như M4 |
| **M6** | 01/GQVL, 07b | như M4 |
| **M7** | Hồ sơ Tổ 10C, 10A, 10B, 11 | như M4; 01/BG, 02/BG không đụng |
| **M8** | **Lưu B2 / B3:** IndexedDB theo ngăn qua `KHO1` (cài đặt máy · khai báo đơn vị · khai báo mẫu · sổ hộ vay · văn bản · nhật ký); lần đầu chép từ localStorage, **giữ bản cũ 30 ngày + công tắc quay lại**; xóa = thùng rác; đồng bộ Drive theo ngăn | phép thử 2 máy giả lập; dữ liệu cũ đọc được; quay lại được |
| **M9** | Tổng kiểm: chuẩn khóa + chuẩn gốc + chồng khít + hồi quy đủ + tài liệu + bảng thử máy thật theo từng mẫu | sạch mới báo anh |

## 2. Luật giữ an toàn (ghi vào QUY_CHUAN mục 9)
- Mẫu Giao dịch xã, KTGS **không lên nền mới**; chỉ được canh bằng chuẩn khóa. Lệch form → báo anh, không tự sửa.
- Chuẩn khóa của 1 mẫu **chỉ cập nhật khi anh duyệt đổi chính mẫu đó**; mọi mẫu khác phải giữ nguyên từng ký tự.
- Dữ liệu cũ luôn đọc được; chuyển dữ liệu có bản sao + quay lại.
- Repo công khai: file mẫu, bản chuẩn chỉ chứa mẫu trắng / số liệu giả.

## 3. Cần anh
- **File gốc Word / PDF** từng mẫu: 01/TD, 03/TD, 01/UQ, 09A, 01/TĐCK, 01/GQVL, 07b, 10C (cũ + mới QĐ 70), 10A, 10B, 11 (đã có 01/TGTV). Có số liệu khách → em đổi sang giả trước khi lưu.
- Thử máy thật 1 lần theo bảng thử cuối bản.

## 4. Rủi ro (đã báo anh)
- Bản lớn → lâu mới có bản thử; lỗi khó khoanh → giảm bằng mốc + cửa kiểm, mỗi mốc 1 commit riêng (quay lại được từng mốc).
- M8 chạm dữ liệu thật → làm sau cùng, có bản sao + công tắc quay lại; nếu M8 chưa đạt thì bản vẫn giao M0–M7 và báo anh (không giao nửa vời).
