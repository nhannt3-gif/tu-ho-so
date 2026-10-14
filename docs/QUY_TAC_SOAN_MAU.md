# Quy tắc soạn mẫu in — tab 🏢 Giao dịch xã (từ 3.174)

Tài liệu này dành cho người (hoặc AI khác) **soạn mẫu in mới**. Người soạn chỉ cần làm đúng khuôn dưới đây, rồi Claude gắn mẫu vào app (`js/26-giao-dich-xa.js`).

> **Repo công khai.** Trong mẫu, ví dụ và phép thử chỉ được dùng **dữ liệu giả**: tên khách, CCCD, số tài khoản, tổ trưởng… đều phải là giả. Ảnh hoặc bản scan mẫu thật anh Nhân gửi chỉ dùng ở máy làm việc, không đưa lên repo.

## 1. Người soạn gửi gì

Gửi **một file HTML** (mở được bằng trình duyệt, in thử đúng mẫu giấy thật), gồm 4 phần:

1. **Hàm dựng trang:** `function dungMau(g, c){ return '<div class="sheet-…">…</div>'; }`
   - `g` = dữ liệu lấy từ số liệu (họ tên, số TK, ngày…). App truyền vào.
   - `c` = các khai báo / lựa chọn của mẫu.
   - Hàm trả về HTML của **một tờ**.
2. **CSS của mẫu**, gom trong một chuỗi:
   - phải có `@page{size:…;margin:0}`;
   - đơn vị đo dùng `mm` hoặc `pt`;
   - không dùng thư viện ngoài, không dùng font tải từ mạng (chỉ dùng Times New Roman / Arial có sẵn).
3. **Bảng mục của mẫu**, xếp **theo thứ tự trên tờ giấy: trên → dưới, trái → phải**. Mỗi mục có các cột:

   | Mã mục | Tên hiện cho anh | Nguồn | Chọn nhanh mặc định | Ô trống in ra |
   |---|---|---|---|---|
   | `ngay` | Ngày lĩnh | số liệu / khai báo / chọn khi in | có / không | chấm · để trắng |

4. **Hai bộ dữ liệu giả** để thử: một bộ đủ mọi ô, một bộ để trống hết.

## 2. Luật bắt buộc của mẫu (anh Nhân chốt)

- **Giữ đúng form giấy thật.** Bố cục, chữ, khung và vị trí bám ảnh / bản in mẫu. Mẫu đã được anh duyệt thì không tự sửa nữa.
- **Ô có thông tin thì bỏ chấm; ô không có thông tin thì giữ chấm** để giữ form.
  - Mỗi ô khai riêng khi trống thì in **chấm** hay **để trắng**.
  - Ví dụ: người lập ở 04/TD để trắng; giao dịch viên ở 12/GDX để chấm.
- **Căn cứ số liệu điền tự động được bao nhiêu thì điền bấy nhiêu**, phần còn lại để chấm cho ghi tay. Không tự nghĩ ra số liệu.
- **Chỉ nhập tay khi thật cần** (ví dụ số hộ, số tiền). Mọi thứ khác chọn bằng chip, nút chọn hoặc ô sổ xuống.
- **Ngày:** có [Hôm nay], [📅 chọn ngày], và chọn xong phải hiện rõ ngày. Mặc định tùy mẫu (ví dụ ngày GD gần nhất của điểm).
- **Tên cơ quan, UBND ghi đầy đủ**, không viết tắt (trừ khi chính mẫu gốc viết tắt).
- **Khổ giấy:** in trọn trang. Nếu có nhiều dòng thì thu nhỏ bảng, không bóp chỗ ký.

## 3. Cấp địa bàn của mẫu

Khai mẫu cần chọn tới cấp nào trong khối **LỌC ĐỊA BÀN** (cây theo Mẫu 31):

| Cấp | Ví dụ | Khối lọc |
|---|---|---|
| `diem` | 04/TD, 12/GDX | Xã · Điểm GD (ẩn Hội / Tổ) |
| `to` | Giấy lĩnh tiền mặt | Xã · Điểm GD · Hội · Tổ (+ ô tìm tên không dấu) |

## 4. Claude gắn vào app như thế nào

1. **Thêm mẫu** vào `GDX_MAU`: `{k, ma, bt, ten, nhom, cap}`.
2. **Thêm danh sách mục** vào `GDX_MUC[k]`: `{k, ten, nhanh}`, đúng thứ tự trên mẫu.
   - Mọi mục tự có trong **⚙ Khai báo riêng mẫu**, kèm ô tích *Chọn nhanh* để đưa ra khung trái.
3. **Vẽ ô điều khiển** của từng mục trong `gdxMucHTML` (hoặc trong hàm riêng của mẫu, như `gdxGLMuc` của Giấy lĩnh).
   - Dùng sẵn các hàm `gdxChip`, `gdxRadio`, `gdxIn1`, `gdxCB` (danh sách cán bộ), `gdxNgayChon`.
4. **Giá trị mặc định** của mẫu thêm vào `GDX_MD`, lưu ở `D.cauHinh.gdx`. Khai báo cũ phải đọc được: cần chuyển đổi thì viết trong `gdxC()`.
5. **Dữ liệu và hàm dựng:**
   - `gdxChup()` chụp các lựa chọn và dữ liệu lúc in, để in lại từ nhật ký cho đúng bản cũ.
   - `gdxDung(X)` trả về `{than, css}` để dựng trang.
6. **📋 Tóm tắt bản in:** thêm các chip và cảnh báo của mẫu trong `gdxTom()`.
   - Cảnh báo vàng = nhắc; đỏ = sai rõ.
   - Không cảnh báo nào chặn việc in: còn cảnh báo thì app hỏi một lần rồi in.
7. **Phép thử** viết với dữ liệu giả (xem `tests/t165.js`, `tests/t167.js`). Phải kiểm:
   - in trọn trang;
   - ô trống in chấm / để trắng đúng như khai;
   - dữ liệu điền đúng;
   - mở lại khai báo cũ không lỗi.
8. **Mini app (từ 3.177):** mẫu nào có trong 📦 mini app thì hàm dựng mẫu được chép vào file mini lúc xuất (`gdxMiniHTML` trong `js/27-mini-gdx.js`, danh sách `ham`).
   - Hàm mẫu gọi thêm hàm phụ mới → thêm hàm phụ đó vào danh sách, rồi chạy `node tests/t168.js`.
9. **Mục trùng nhau giữa nhiều mẫu** (ví dụ danh sách cán bộ) thì gom về **⚙ Khai báo chung**, nhưng phải báo anh trước.

## 5. Ví dụ đã làm

- **04/TD Thông báo kết quả phê duyệt cho vay** (`gdxHTML04`): chép nguyên khuôn file HTML anh đã in thử.
- **12/GDX Bảng kê giao, nhận, tiêu hủy biên lai** (`gdxHTML12`): như trên. Từ 20 dòng trở lên, app tự tính chiều cao dòng để trọn một trang A4.
- **Giấy lĩnh tiền mặt** (`gdxHTMLGL` + `GL_CSS`): dựng theo ảnh mẫu, A5 ngang hoặc nửa trên A4 dọc.
  - Dòng có thông tin thì bỏ chấm.
  - Bản in đè lên giấy in sẵn làm sau, khi có bản scan thẳng 100 %.
- **Bảng kê các loại tiền ngân hàng chi ra** (3.193–3.194): mẫu riêng ở tab Giao dịch xã (chip 🧾 Bảng kê) — mẫu trắng 2 tờ 105 × 210 / A4 ngang, khai báo từng dòng (có chữ thì in, trống = chấm). Tab 💵 Giấy lĩnh in kèm: 🧾 (A4 ngang 1 tờ) hoặc 💵+🧾 (1 tờ A4 dọc), dữ liệu theo Giấy lĩnh, tự chia mệnh giá, phần cơ quan / logo theo cài đặt tab Bảng kê.
- **Quy ước "tích hợp logo"** (anh chốt 14/10): khi anh nói tích hợp logo vào mẫu nào thì có 2 cách — **logo góc** (rõ, nhỏ, góc trái đầu tờ) hoặc **logo chìm** (to, mờ, giữa tờ, giữ màu logo, mờ theo mức Nhạt / Vừa / Đậm). Anh chưa nói cách nào thì **hỏi lại** trước khi làm.
  - Logo mặc định = **logo NHCSXH (cánh sen)** có sẵn trong app (`LOGO_NHCSXH`, js/25) — ngoại lệ được anh đồng ý đưa vào repo (biểu trưng công khai, không phải dữ liệu khách). Logo anh nạp ở 📄 Hồ sơ vay › ⚙ Khai báo 1 lần được ưu tiên; nút ⬇ Tải logo xuất PNG nền trong suốt.
  - Giấy lĩnh dùng chữ chìm VBSP; Bảng kê dùng logo chìm.

## Đường kẻ — áp cho mọi mẫu biểu (3.196, anh chốt 14/10)

> Anh: "chấm nhuyễn, các lằn kẻ không dày quá nhìn thô, các lằn kẻ con nên lợt nhỏ hơn lằn chính — áp dụng cho mọi mẫu biểu".

| Loại đường | Dùng cho | Quy cách |
|---|---|---|
| **Đường chính** | khung ngoài, kẻ đầu bảng / dòng tổng, vạch dưới tên cơ quan & tiêu ngữ | liền, đen `#000`, **≤ 0,9 px (≈ 0,7 pt)**; mẫu Hồ sơ / Số liệu dùng 0,5 pt |
| **Đường phụ (con)** | kẻ giữa các dòng trong thân bảng, vạch chia ô / cột ký | **mảnh hơn và lợt hơn** đường chính: liền 0,4–0,6 px xám `#666`–`#a6a6a6`, hoặc chấm xám `#555`–`#777` |
| **Dòng chấm ghi tay** | chỗ để trống cho viết tay | chấm mịn **0,5 pt / 0,7 px**, xám đậm `#333`–`#555` |
| **Nét cắt** | tờ in 2 phiếu / 2 bảng kê | gạch nhạt `#b8b8b8` (giữ như cũ) |

- Không dùng đường ≥ 1,2 px cho bất kỳ mẫu nào.
- Mẫu chép nguyên từ file Word anh gửi (khung Word gốc của Mẫu 06/16/04/KH khi **xuất Word**) giữ nguyên đường kẻ của file gốc; quy tắc trên áp cho **bản In** và các bảng app tự dựng.
