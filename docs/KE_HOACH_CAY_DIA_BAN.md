# Kế hoạch — CÂY ĐỊA BÀN DÙNG CHUNG (1 chỗ làm, mọi nơi gọi) + Giao dịch xã chỉ gọi chức năng có sẵn — CHỜ ANH NHẮN "code"

> Anh 23/10: "Tab Giao dịch xã chỉ gọi các chức năng có sẵn, tránh thêm trùng chỗ khác đã có; **Tra cứu KH là chức năng cần thiết trước**. Cây địa bàn bố cục lại theo 2 kiểu: (1) dạng chip và danh sách sổ ra như cũ; (2) danh sách gọn 1 dòng và linh hoạt trở về 1 cấp trên — áp dụng cho mọi nơi cần chọn, kiểu thống nhất; cây địa bàn làm 1 chỗ, các nơi chỉ gọi để sử dụng."
> Người làm: TK 2. Phối hợp: KTGS (TK 3) dùng cây chung `pvVeCay('kt')` → báo ở `KE_HOACH_KTGS_GON.md` mục 11 trước khi đổi; Phân bổ KH (TK chính) chọn xã của QĐ — **không đụng**.

## 1. Hiện trạng (đọc mã 3.325)
- **Đã có cây chung** `pvVeCay(p)` (`js/22g-to.js`): Xã → Điểm GD → Hội → Tổ, chip + ô sổ xuống, 📍 đường dẫn bấm từng mắt, ⬆ Lên 1 cấp (Backspace), ▴ Thu gọn / ▾ Mở rộng, 📌 Ghim. **7 nơi dùng:** Tổ (`to`), Tra cứu (`tc`), Sao kê (`sk`), Tổng hợp (`th`), KTGS (`kt`), Hồ sơ Tổ / Hồ sơ vay (`hst`, `hsv`), Giao dịch xã (`gdx`).
- **Chỗ chưa thống nhất:**
  1. Kiểu **gọn** hiện chỉ là đường dẫn — muốn chọn tiếp phải **Mở rộng** ra; tab ghim sẵn (Tổ, KTGS, Sao kê, Tổng hợp) **không bao giờ gọn** → khối lọc cao 118–204 px máy tính, 192–274 px điện thoại (đo 23/10).
  2. **4 bộ chọn riêng tự viết** (ô chọn Xã → Ấp → Tổ): form 👪 Hộ vay (`hmVe`, js/25), lập 01/TD (js/40), khai nhanh 01/TGTV (js/54), ⚙ Khai báo chung tab Trưởng ấp / Tổ phó (`hsoKBHop`, js/25). Cây chung **chưa có cấp Ấp** nên các nơi này phải tự làm.

## 2. Thiết kế 1 cây — 2 kiểu, người dùng đổi được, nhớ theo từng nơi
| Kiểu | Hình | Dùng khi |
|---|---|---|
| **① Chip** (như cũ) | hàng chip Xã · Điểm GD · Hội · Tổ (+ ô sổ đủ danh sách) | ít tổ, chọn bằng chuột nhanh |
| **② Gọn 1 dòng** (mới) | `📍 🏠 PGD › [Xã ▾] › [Điểm ▾] › [Hội ▾] › [Tổ ▾]  ⬆  🔎` — **mỗi mắt là ô sổ xuống chọn ngay** (không cần mở rộng), bấm tên mắt = về cấp đó, ⬆ / Backspace = lên 1 cấp | mặc định điện thoại; máy tính anh chọn |
- Nút đổi kiểu `▦ Chip | ☰ Gọn` ở cuối dòng, nhớ theo nơi (`D.cauHinh.pvKieu[p]`); thay cặp Thu gọn / Mở rộng + Ghim hiện nay (Ghim = kiểu Chip, Bỏ ghim = kiểu Gọn → chuyển dữ liệu cũ 1 lần, không mất lựa chọn).
- **Cấp linh hoạt theo nơi gọi**: mỗi nơi khai `cap:['xa','diem','hoi','to']` (như cũ) hoặc `['xa','ap','to']` (form hộ vay, 01/TD, 01/TGTV, trưởng ấp) — thêm **cấp Ấp** vào cây chung.
- **Nhúng trong hộp** (form, khai báo): cùng hàm, gắn vào 1 phần tử bất kỳ, trả lựa chọn qua `khiChon(S)` — 4 bộ chọn riêng chuyển sang gọi cây chung, **bỏ mã tự viết** (giữ đúng dữ liệu đang lưu: xa, thon, tenThon, to…).
- **1 lối gọi**: `CAY.ve(p, {cap, batBuoc, S, khiChon, kieuMd})` bọc `pvVeCay` — nơi mới chỉ gọi `CAY.ve`, không đọc thẳng `TO_K` (lấy cây qua `KHO.dsTo()`).

## 3. Giao dịch xã = bàn thao tác, chỉ gọi chức năng có sẵn
- Không viết lại chức năng; mỗi mục con là **lối vào** chức năng đã có, mang theo địa bàn đang chọn ở GDX (cùng `S` của cây chung).
- **Trước tiên: 👤 Tra cứu KH** — gọi khối Tra cứu hiện có (`tc`) ngay trong GDX với tổ / điểm đang chọn; kết quả, nút in như tab Tra cứu.
- Mục khác (anh chọn dần): in nhanh hồ sơ (gọi tab Hồ sơ vay chọn sẵn hộ), giấy lĩnh / giấy nộp / bảng kê / 04 / 12 (đã ở GDX), Hạn trả HSSV (công cụ có sẵn)…

## 4. Bước làm (mỗi bước: "code" → làm → phép thử chức năng mới + phép thử các nơi gọi → PR → "gộp")
- **C1** cây chung thêm kiểu ② Gọn 1 dòng (ô sổ từng mắt) + nút đổi kiểu + nhớ theo nơi + chuyển Ghim / Thu gọn cũ; 7 nơi đang dùng tự có. Phép thử mới + chạy phép thử Tổ, Tra cứu, Sao kê, Tổng hợp, Hồ sơ, GDX, **KTGS (báo TK 3)**.
- **C2** thêm cấp Ấp + kiểu nhúng trong hộp + `CAY.ve`; chuyển form 👪 Hộ vay, 01/TD, 01/TGTV, Khai báo chung sang cây chung (giữ dữ liệu cũ).
- **C3** GDX mục con 👤 Tra cứu KH gọi khối Tra cứu có sẵn.

## 5. Câu hỏi chờ anh
1. Máy tính mặc định kiểu nào: **Chip** cho Tổ / KTGS / Sao kê / Tổng hợp (như ghim hiện nay) và **Gọn** cho Hồ sơ / GDX / Tra cứu — đồng ý?
2. Kiểu Gọn bỏ hẳn nút Ghim (thay bằng nút đổi kiểu) — đồng ý?
