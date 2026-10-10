# KIẾN TRÚC 3 LỚP — Bước 1: rà soát & thiết kế (10/10/2026, nền bản 3.141)

> Tài liệu thiết kế, **chưa sửa code**. Mọi đợt ở mục 8 chỉ làm khi anh Nhân duyệt từng đợt và nhắn "code".
> Không chứa dữ liệu thật. Số đo lấy từ mã nguồn (`tests/bando.py`).

---

## 0. Anh Nhân đã chốt (09–10/10/2026)

| # | Quyết định |
|---|---|
| Q1 | CCCD **không mã hóa** (giữ như 3.32). |
| Q2 | Chuyển hẳn sang **mô hình lớp riêng biệt** — sửa / đổi 1 tính năng không ảnh hưởng tính năng khác. |
| Q3 | **File hồ sơ chi tiết là nguồn chính** (anh cố xuất 1 file chuẩn nhất); các file khác chỉ để **đối chiếu**. Cấu trúc file có thể đổi chút (thêm cột, đổi thứ tự cột) nhưng bản chất số liệu không đổi → lớp dữ liệu phải chịu được. |
| Q4 | **Cây địa bàn gắn với hồ sơ chi tiết**, cập nhật hằng tháng (đổi tổ trưởng, tách / sáp nhập tổ). |
| Q5 | **Bỏ tab Tháng.** Nạp dữ liệu thành **1 tab riêng, độc lập**; mọi tab khác chỉ tra cứu từ **1 kho chung**. |
| Q6 | **Lớp chung** gồm các chuẩn dùng cho mọi tab: cây địa bàn, cây nghiệp vụ, chế độ xem, lưu trữ, xóa, sao lưu. Mẫu biểu / nghiệp vụ mới = thêm **1 tab con hoặc 1 nút báo cáo**, không dựng lại. |
| Q7 | **Máy tính là trọng tâm.** Điện thoại sau này là **mini app** (xem VB, thêm VB từ Zalo, vài báo cáo cơ bản, chủ yếu scan CCCD) — giai đoạn đầu chưa làm, chừa sẵn. |
| Q8 | **Tách file** (nhiều `.js` / `.css`, vẫn không build, không npm). |
| Q9 | **Máy chủ nhỏ trong mạng cơ quan** (phương án ③) + vẫn giữ link web. |
| Q10 | **Scan** → mini app riêng, chia sẻ được: chỉ scan → PDF → lưu máy / in. **Văn bản** → mini app / trang riêng, chia sẻ được; định kỳ trích gửi **kho văn bản trên máy chủ nội bộ** để tra cứu. |
| Q11 | Ví dụ chuẩn: scan CCCD → Lưu → chọn cây địa bàn + gõ tên → app gợi ý khách hàng → anh chốt → lưu kèm **tên + mã KH**. |

| Q12 | (10/10) **Tab Tháng: bỏ hẳn, xóa luôn dữ liệu cũ** (anh chưa nạp nhiều — coi là rác). **Không cần sao lưu trước khi xóa**; thư mục Drive vào thùng rác Drive (anh chốt). ✅ 3.144 |
| Q13 | (10/10) **Bỏ nút Giao ban và Buổi giao dịch** — làm lại sau khi các chức năng khác ổn. ✅ 3.144 (ẩn, giữ mã) |
| Q14 | (10/10) **Nạp file phải tự nhận đúng ngày số liệu từ nội dung file, không phụ thuộc tên file** (tên file chỉ là gợi ý cuối, phải báo rõ khi dùng). File không có ngày trong nội dung → **anh khai khi nạp**. ✅ 3.143 |
| Q15 | (10/10) **Tách tab con 📥 Nạp & Kiểm tra ra khỏi Số liệu thành tab riêng, đặt vào chỗ tab Tháng** — nơi duy nhất nạp và kiểm tra toàn vẹn dữ liệu của app; các tab khác chỉ đọc. **Nạp BC0437 / BC0438 của KTGS cũng gộp vào đây**; quy tắc kiểm tra (② Kiểm tra tháng + 🔍 kiểm tra KTGS) sẽ **thống nhất 1 lần** thành một bộ chung. ✅ 3.144 (tab + chỗ nạp; thống nhất quy tắc kiểm tra: **chưa làm**) |
| Q16 | (10/10) **Vai trò từng file:** **Mẫu 31 + Dư nợ chi tiết là cơ bản nhất** (bổ trợ nhau ở TK 105, mục đích vay, điểm GD; sau này 1 file thay được thì dùng 1). **4 file LEN_31** (XAPUONG, DONVIUT, CHTRINH, TO_TRUONG) xuất cuối tháng = **đối chiếu chuẩn** cho Mẫu 31 + chi tiết. **BC0437 / BC0438** chỉ phục vụ KTGS (chấm điểm tổ). **Mẫu 10 bỏ hẳn** (cả mục kiểm tra). **KHĐ:** app **tự tính từ Mẫu 31**, đối chiếu với file KHĐ mẫu 14; nhiều tháng khớp đúng danh sách thì KHĐ thành file phụ. Chia file thành 2 nhóm: **bắt buộc** (nguồn dữ liệu) · **tham chiếu** (đối chiếu). **Cây địa bàn cũng đối chiếu với LEN_31 TW** (anh chốt): xã + số tổ / số hộ mỗi xã (XAPUONG), số tổ xã × hội (DONVIUT), từng tổ ↔ dòng TO_TRUONG (tổ thừa / thiếu, tên tổ trưởng, dư nợ). LEN_31 không có cấp điểm GD / ấp → điểm GD đối chiếu Dư nợ chi tiết ↔ Thông tin tổ trưởng ↔ DSTO. **BCDHTD 01.1 / 01.2, B32: không cần nữa — dùng LEN_31 làm chuẩn** (anh chốt 10/10; dữ liệu đã nạp vẫn đọc được, không bắt buộc, không tính đủ file). Còn chờ: file nào bắt buộc để chốt tháng. |

**Còn chờ anh:** ~~(a) dữ liệu cũ tab Tháng~~ (đã chốt Q12: xóa); (b) dòng tên cột file hồ sơ chi tiết chuẩn mới; (c) hỏi bộ phận tin học về máy chủ nội bộ + dữ liệu khách hàng trên mạng cơ quan / Drive cá nhân.

---

## 1. Hiện trạng (số đo 3.141)

| Chỉ số | Giá trị | Nhận xét |
|---|---|---|
| `index.html` | 28.389 dòng · 2,7 MB | Một file; CSS 2.762 dòng; ~30 khối `<script>` |
| Hàm cấp ngoài | 2.223 | 1.279 hàm không theo tiền tố khối (phần Văn bản / giao diện chung cũ) |
| Biến toàn cục | 327 | Khối nào cũng đọc / ghi được của khối khác → sửa chỗ này ảnh hưởng chỗ kia |
| `onclick=` viết trong chuỗi HTML | 1.090 | Gắn chặt giao diện với tên hàm toàn cục |
| Lời gọi `luu()` | 244 | Mỗi lần ghi **toàn bộ** chỉ mục `D` |
| Phép thử | 56 file `tests/*.js` + `kiem.py` | Hồi quy đủ ~1 giờ; tốt, giữ và mở rộng |

**Bản đồ khối hiện tại** (chi tiết dòng: `docs/BAN_DO_MA.md`):

| Khối | Dòng (≈) | Lớp đích |
|---|---|---|
| Bộ nạp thư viện (pdf.js, pdf-lib, SheetJS, cache IDB `tuhoso_tv`) | 2942–3010 | Lớp 1 |
| Hằng số, `D`, `luu`, kho file IDB `tuhoso_file` | 3011–3366 | Lớp 1 (+ cấu hình mặc định → lớp chung) |
| Đọc PDF, rút số hiệu / trích yếu, tên chuẩn | 3367–3999, 9497–10853 | Khối Văn bản |
| Vẽ giao diện các tab (Hôm nay, Văn bản, Tháng, Ghi chú, Khay chờ), Theo dõi nợ, Giao ban, Buổi GD | 4000–9496 | Lớp 3 (nhiều khối trộn chung) |
| Hộp thoại chung, cài đặt, danh mục | 10854–14208, 21224–21848 | Lớp chung |
| Hồ sơ CCCD, danh mục địa bàn tay | 14209–15018 | Khối Scan CCCD / cây địa bàn |
| Biểu mẫu | 15021–15583 | Khối Biểu mẫu |
| Danh sách / thùng rác / trạng thái, khung chuẩn mọi tab | 15586–17268 | Lớp chung (xóa, xem) |
| Scan + xử lý ảnh | 17271–20199 | Khối Scan (→ mini app) |
| Tìm kiểu Finder, nhờ AI chuẩn hóa | 20202–20780 | Lớp chung (tìm) / khối Văn bản |
| Đồng bộ cài đặt Drive | 20781–21223 | Lớp 1 |
| Số liệu: đọc Excel, kho kỳ, Drive, ma trận, kiểm tra, Tổ, KTGS, Sao kê, Tổng hợp, Tra cứu, in | 22030–28386 | Tách: Lớp 1 (lưu) · Lớp 2 (kho) · Lớp 3 (các khối) |

**Vấn đề chính (theo mức ảnh hưởng):**
1. **Chỉ mục chính `D` nằm trọn trong `localStorage` 1 khóa** (`tuhoso_v1`, giới hạn ~5 MB), mỗi `luu()` ghi lại tất cả. Dữ liệu lớn dần → chậm và **có thể đầy, ghi hỏng**. Số liệu (bảng Excel) đã ở IndexedDB — đúng hướng; chỉ mục văn bản / scan / cài đặt chưa.
2. **Đồng bộ Drive có 3 đường riêng** (chỉ mục văn bản `henDongBoChiMuc`, cài đặt `chTheoDoi` / `cauhinh.json`, số liệu `slDay` / `slDayMeta`), mỗi đường quy tắc gộp riêng → sự cố 09/10 (mất khai báo Hội). Cần **1 cơ chế đồng bộ chung** có phép thử.
3. **Hai bộ đọc Excel**: Số liệu (`slDocFile`) và Theo dõi nợ (`tdnDocFile`). Giao ban / Buổi GD tính từ Theo dõi nợ, **chưa** từ kho Số liệu → số có thể lệch nhau.
4. **Nghiệp vụ nằm lẫn trong hàm vẽ**: ví dụ `toTV`, `toKhach` (Tổ) vừa tính tất nợ / nợ lãi vừa phục vụ bảng; KTGS tự tính lại các chỉ tiêu tương tự → sửa quy tắc phải sửa nhiều nơi (đã gặp ở 3.137: "còn nợ lãi = còn dư nợ" phải sửa ở 3 chỗ).
5. **Cây địa bàn có 2 nguồn**: danh mục tay `D.cauHinh.diaBan` (Cài đặt) và cây dựng từ Mẫu 31 / Thông tin tổ trưởng / DSTO trong `toNap` (+ suy điểm GD). Chưa có lịch sử theo kỳ, chưa báo thay đổi tổ trưởng.
6. **Mỗi tab tự làm chip / bảng / In / Excel**; đã có bộ in chuẩn `inChuan` (tốt) và bộ chọn phạm vi `pv…` (tốt, mới dùng ở Tổ / Sao kê / KTGS / Tra cứu).
7. **Mã chết / bỏ dở**: Mẫu 10 (`m10`), Mẫu 7 (`kttk`), Sao kê KH (`kh`), `khd08`, chuyển đổi Mẫu 10 (`slChuyenMau10`, `slBoMau10`), mã hóa CCCD cũ (giữ để đọc dữ liệu cũ), tab Tháng (`veThang` + `D.duLieu`).
8. **CSS chồng lớp** qua nhiều bản (18 khối `@media` máy tính / 18 điện thoại riêng lẻ) → khó đoán kiểu nào thắng.

---

## 2. Kiến trúc đích — 4 tầng

```
┌──────────────────────────────────────────────────────────────────────┐
│ LỚP 3 · KHỐI CHỨC NĂNG (đăng ký vào app)                              │
│  Nạp dữ liệu · Tra cứu KH · Tổ TK&VV · Báo cáo (Tổng hợp, Sao kê…)    │
│  KTGS (Mẫu 06/16/04/KH) · Scan CCCD · Văn bản · Biểu mẫu · Hôm nay…   │
│  → chỉ gọi LỚP CHUNG + KHO (Lớp 2); không gọi thẳng khối khác          │
├──────────────────────────────────────────────────────────────────────┤
│ LỚP CHUNG · BỘ CHUẨN: cây địa bàn · cây nghiệp vụ · xem / chip / bảng │
│  · In / Excel / Word / PDF · lưu · xóa (thùng rác) · sao lưu · tìm      │
├──────────────────────────────────────────────────────────────────────┤
│ LỚP 2 · KHO DỮ LIỆU NGHIỆP VỤ: bảng chuẩn theo kỳ (từ hồ sơ chi tiết) │
│  · từ điển cột · đối chiếu file khác · phép tính chung · cửa tra cứu   │
├──────────────────────────────────────────────────────────────────────┤
│ LỚP 1 · LƯU TRỮ: "ổ cắm" ① trình duyệt + Drive  ② máy chủ nội bộ       │
│  · đồng bộ chung · nhật ký · sao lưu / khôi phục phiên bản             │
└──────────────────────────────────────────────────────────────────────┘
```

**Luật phụ thuộc (bắt buộc):** lớp trên chỉ gọi lớp dưới qua **cửa công khai** (một đối tượng duy nhất mỗi lớp: `KHO1`, `CHUAN`, `KHO`); khối Lớp 3 không gọi nhau, không đọc biến toàn cục của nhau. Mỗi khối có **tiền tố riêng** (hàm, CSS, khóa lưu) và **phép thử riêng**.

---

## 3. Lớp 2 — Kho dữ liệu nghiệp vụ (ưu tiên số 1)

### 3.1 Bảng chuẩn

| Bảng | Khóa | Trường chính (tên chuẩn) |
|---|---|---|
| `khach` | `maKH` | ten, cccd, ngaySinh, gioiTinh, diaChi, sdt, maTo, stk105[], soDu105, nguon |
| `mon` | `soKU` (= mã món vay 16 số) | maKH, ct (mã CT), maQD, ngayVay, denHan, denHanGDXA, duNo, noLai (TH+QH), qh, khoanh, giaiNgan, trangThai (OPEN/CLOSE), phatSinh{gn, tn, …} |
| `to` | `maTo` | ten (tổ trưởng), pho, maDiem, maAp, maXa, maHoi, sdt |
| `diem` / `ap` / `xa` / `hoi` | mã | tên, ngày GD, cấp trên |
| `ky` | `'2026-09'` / `'2026-10-07'` | ngày số liệu, nguồn từng bảng (`nguon[loai] = kỳ thật`, như 3.136) |
| `taiLieu` | id | loai (CCCD, VB, biên bản…), gắn `maKH` / `maTo` / `maXa`, tệp (máy / Drive / máy chủ), tên chuẩn |
| `nhatKyNap` | id | file, kỳ, số dòng, cột lạ, cảnh báo, người / máy, lúc |

- Mỗi **kỳ là 1 ảnh chụp** (tháng / ngày) — giữ nguyên quy tắc 3.136 (`slKyDung`: kỳ ngày lấy bảng đúng ngày → ngày gần nhất trong tháng → cuối tháng trước).
- Lưu dạng cột nén như hiện nay (`slNen` / `slMoBang`) — đã nhanh, giữ.

### 3.2 Nạp chịu được đổi cấu trúc file (Q3)
- **Từ điển cột** `TU_DIEN_COT`: mỗi trường chuẩn → danh sách tên gọi (không dấu, bỏ khoảng trắng / ký tự đặc biệt). Đọc **theo tên, không theo vị trí** (hiện `SL_LOAI[].can / mot / khong` + `slTimDau` đã theo tên → mở rộng thành từ điển sửa được trong Cài đặt).
- **Cột lạ**: giữ nguyên trong bảng thô (`_them`), báo "có N cột mới: …", anh gán vào trường chuẩn khi cần — không mất dữ liệu.
- **Thiếu cột bắt buộc** (maKH, soKU, duNo… với hồ sơ chi tiết) → chặn nạp, báo đúng cột thiếu.
- **Phiên bản cấu trúc**: mỗi lần nạp ghi "dấu vân tay" dòng tên cột; đổi so với lần trước → báo "file đổi cấu trúc: thêm X, bỏ Y" để anh biết.

### 3.3 Nguồn chính / đối chiếu
- **Hồ sơ chi tiết** (hiện: Mẫu 31; sau: file chuẩn mới của anh) dựng `khach`, `mon`, `to`, cây.
- **Dư nợ chi tiết** bổ sung TK 105 + điểm GD (như 3.120 / 3.130) — đánh dấu nguồn.
- **Chuẩn TW** (BCDHTD, LEN_31, B32), QH, khoanh, KHĐ, Thông tin tổ trưởng, DSTO, BC0437/0438 → **đối chiếu**, lệch thì báo, **không sửa kho** (giữ thứ bậc tin cậy 3.90).

### 3.4 Cây địa bàn theo kỳ (Q4)
- Dựng từ hồ sơ chi tiết **mỗi kỳ** (xã → điểm → ấp → tổ, tổ trưởng, Hội); lưu theo kỳ → báo cáo kỳ cũ in đúng tổ trưởng kỳ cũ.
- **Báo thay đổi khi nạp**: đổi tổ trưởng, tổ mới, tổ mất, đổi điểm GD → anh xác nhận.
- **Lớp khai tay** (tên điểm, ấp, ngày GD, Hội cấp xã…) đặt **trên** cây từ file; nạp file mới không ghi đè, lệch thì báo.
- Thông tin tổ trưởng / DSTO / BC0437 chỉ đối chiếu + bổ sung chỗ trống (có ghi nguồn).

### 3.5 Phép tính chung (một chỗ duy nhất)
`tatNo(khach)`, `noLai(mon)`, `conDuNo(khach)` (còn lãi = còn nợ — 3.137), `quaHan`, `khoanh`, `khd3Thang`, `denHan(kỳ, khoảng)`, `ku Huy / chưa GN` (3.138), `bienDongTo(kỳ, kỳ trước)` (mới vào 3 nhóm, ra khỏi tổ), `tk105(khach)`, `ctVietTat(mon)`. Khối nào cần đều gọi ở đây.

### 3.6 Cửa tra cứu `KHO`
```
KHO.ky(ky)                     → bộ kỳ (đã dựng sẵn, có nguon)
KHO.khach(maKH, ky)            → khách + món + tổ
KHO.timKhach(ten, phamVi, ky)  → gợi ý theo tên (không dấu, đảo thứ tự từ) trong phạm vi cây
KHO.cay(ky)                    → cây địa bàn của kỳ
KHO.monTrong(phamVi, ky, loc)  → món vay theo phạm vi + bộ lọc
KHO.taiLieu.gan(tep, {maKH…})  → gắn tài liệu (scan CCCD, VB…)
```
Hiện có sẵn phần lớn bên dưới: `slBo`, `toNap`, `toKhach`, `toTV`, `slTimKH`, danh bạ `SL_DB`. Đợt chuyển đổi **bọc** chúng sau cửa `KHO` trước, đổi bên trong sau.

### 3.7 Ví dụ Q11 — Scan CCCD gắn mã KH
Lưu → chọn cây (xã → ấp → tổ) → gõ tên → `KHO.timKhach` (trong phạm vi) → danh sách: tên · mã KH · năm sinh · tổ · CCCD → anh chốt → tên chuẩn `MãKH_Họ tên_loại_ngày` + `taiLieu.gan`. CCCD đọc được số → khớp thẳng với `khach.cccd`.

---

## 4. Lớp chung — bộ chuẩn (Q6)

| Chuẩn | Thiết kế | Có sẵn để dùng lại |
|---|---|---|
| **Cây địa bàn** | 1 bộ chọn cho mọi khối: xã → điểm → hội → ấp → tổ, chọn đa chiều, vay trực tiếp STT 0, theo kỳ | `pvLuaChon`, `pvCha`, `pvVeCay` (3.89 / 3.133) |
| **Cây nghiệp vụ** | Danh mục CT vay (mã chuẩn + viết tắt hệ thống), nguồn vốn, Hội, loại VB / mẫu biểu — 1 nơi khai, sửa trong Cài đặt | `CT_VT`, `TDN_CT`, bảng chuẩn hóa Hội 3.98, danh mục 3.40 |
| **Chế độ xem** | Chip lọc, bảng (cột khai báo), thẻ, cây; nền xen kẽ theo nhóm (3.137); xem trước | chip `TO_LOC`, khung chuẩn mục 17 |
| **In / Excel / Word / PDF** | 1 bộ: báo cáo trả `{tieuDe, cot, dong, tong, ghiChu, kho}` → In (A4, số trang, 2 mặt), Excel, Word (khuôn), PDF gửi Hội | `inChuan` / `trDan`, `toHTMLIn`, `toExcel`, khuôn Word KTGS |
| **Lưu** | Gọi `KHO1.ghi / doc` theo "ngăn" (vanBan, scan, kho, caiDat…), không gọi `localStorage` / IDB trực tiếp | `luuFile`, `docFile` |
| **Xóa** | Mọi xóa → thùng rác 30 ngày, kiểm `lienKetDen`, khôi phục đúng chỗ (cả Số liệu) | thùng rác 3.50, `lienKetDen` |
| **Sao lưu** | Đầu ngày, phiên bản, không ghi trống, gộp trước khi ghi — 1 cơ chế cho mọi ngăn | 3.81, 3.113 |

---

## 5. Lớp 3 — đăng ký khối, tab con, nút báo cáo

Mỗi khối là **1 file** và 1 lời đăng ký:
```js
DANG_KY({
  ma: 'kt-m06', ten: 'Mẫu 06 · Kiểm tra đột xuất', o: 'KTGS',        // nằm ở tab / tab con nào
  thietBi: ['mayTinh'],                                             // Q7: 'mayTinh' | 'dienThoai'
  cay: 'diaBan', ky: true,                                          // dùng bộ chọn phạm vi + kỳ
  du: function(phamVi, ky){ return KHO.monTrong(phamVi, ky, {...}); },
  bang: {cot:[...], nhom:'to', tong:[...]},                         // hoặc ve: function(...) tự vẽ
  in: {kho:'A4 ngang', word:'m06.docx'}
});
```
- App tự gắn tab con / nút, tự có chọn phạm vi + kỳ, xem trước, In, Excel, Word.
- **Báo cáo dạng bảng đơn giản** khai trong Cài đặt (chọn bảng kho, cột, lọc, nhóm) — không cần code (mở rộng hộp ⚙ Thiết lập báo cáo 3.34).
- Mẫu phức tạp (Mẫu 06 / 16 / 04, Kế hoạch, Thông báo phân công) giữ hàm vẽ riêng nhưng lấy dữ liệu qua `KHO`, in qua bộ chuẩn.

---

## 6. Lớp 1 — lưu trữ 2 lối vào (Q9)

| Lối vào | Mở bằng | Dữ liệu | Ghi chú |
|---|---|---|---|
| ① Link web | `https://nhannt3-gif.github.io/tu-ho-so/` | IndexedDB trình duyệt + Google Drive của anh | Như hiện nay; dùng ngoài cơ quan / điện thoại |
| ③ Máy chủ nội bộ | `http://<máy-chủ>:<cổng>` | Kho chung trên máy chủ (thư mục file thật, có thể nằm trong thư mục Drive đồng bộ → sao lưu + cầu nối với ①) | Mọi máy cơ quan chung 1 kho; không cần Internet |

- Cùng một bộ mã; `KHO1` tự nhận lối vào. Trang `https` **không gọi được** máy chủ `http` nội bộ → hai lối gặp nhau **qua Drive**, không gọi trực tiếp.
- **Có công tắc tắt Drive** (nếu quy định không cho để dữ liệu khách hàng trên Drive cá nhân).
- Máy chủ ③ (đợt sau): chương trình nhỏ Windows (C# .NET 4.8 như `tools/hssv`, hoặc 1 exe tương đương), phát thư mục app + API đọc / ghi kho; **chỉ nghe trong mạng nội bộ, có mật khẩu, nhật ký truy cập, sao lưu tự động**. Cần anh hỏi bộ phận tin học trước.
- Việc làm ngay ở Lớp 1 (trước khi có máy chủ): chuyển chỉ mục `D` khỏi `localStorage` sang IndexedDB theo ngăn; gộp 3 đường đồng bộ thành 1 có phép thử.

---

## 7. Bố cục máy tính & mini app

### 7.1 Máy tính (ưu tiên)
```
┌─────────────┬───────────────────────────────────────────────────────┐
│ ☰ Tủ hồ sơ  │  [Kỳ: T9/2026 ▾]  [Phạm vi: Xã › Điểm › Hội › Tổ]  🔎 │
│─────────────│───────────────────────────────────────────────────────│
│ 🏠 Hôm nay  │                                                       │
│ 📥 Nạp DL   │            nội dung khối đang chọn                     │
│ 👤 Tra cứu  │   (tab con ngang ở trên; danh sách trái / xem phải)     │
│ 👥 Tổ TK&VV │                                                       │
│ 📊 Báo cáo  │                                                       │
│ 🛡 KTGS     │                                                       │
│ 🪪 Scan CCCD│                                                       │
│ 📄 Văn bản  │                                                       │
│ 📋 Biểu mẫu │                                                       │
│ 🗒 Ghi chú  │                                                       │
│─────────────│                                                       │
│ 🗑 Thùng rác│                                                       │
│ ⚙ Cài đặt  │                                                       │
└─────────────┴───────────────────────────────────────────────────────┘
```
- Sidebar ~220 px, thu gọn 60 px; **kỳ + phạm vi chung đặt trên cùng** (đổi một lần, mọi khối theo — tiếp nối chip "Đang dùng kỳ" 3.138).
- **Nạp dữ liệu** là mục riêng (từ Số liệu › Nạp & Kiểm tra): ma trận file, cột 📅 Theo ngày, kiểm tra & chốt, từ điển cột, nhật ký nạp, báo thay đổi cây.
- **Bỏ tab Tháng** (Q5, Q12): xóa luôn dữ liệu cũ của tab (anh chốt 10/10 — coi là rác).
- Hộp thoại vừa màn hình laptop 125% (~730 px cao); ↑ / ↓ duyệt danh sách Văn bản, khung xem theo.
- Ảnh mockup thật (1536×730, 1366×768) làm ở đầu đợt bố cục để anh chọn trước khi code.

### 7.2 Điện thoại & mini app (Q7, Q10 — chừa sẵn)
| Mini app | Chức năng | Dữ liệu |
|---|---|---|
| Điện thoại | Xem VB, thêm VB từ Zalo (chia sẻ vào app), vài báo cáo cơ bản, scan CCCD | Đọc kho qua ① |
| Scan (chia sẻ bạn bè) | Scan / chụp → chỉnh → PDF → lưu máy / in (4 người / A4) | **Không** nối kho khách hàng, không Drive |
| Văn bản (chia sẻ) | Xem, thêm, đọc số hiệu / trích yếu, tra cứu; định kỳ trích gửi kho VB máy chủ nội bộ | Kho riêng của người dùng |
Khối khai `thietBi`; mini app = 1 trang chọn bộ file cần dùng. Giao diện điện thoại hiện tại **giữ nguyên** đến khi làm mini app.

---

## 8. Lộ trình từng đợt (mỗi đợt: anh duyệt → "code" → hồi quy đủ → "gộp"; app luôn chạy)

| Đợt | Nội dung | Rủi ro | Ghi chú |
|---|---|---|---|
| **A. Tách file nguyên trạng** ✅ 3.142 | Cắt các khối `<script>` / `<style>` ra `js/*.js`, `css/*.css` theo bản đồ (không đổi 1 dòng logic); `index.html` chỉ còn khung + thẻ nạp file; cập nhật `kiem.py` kiểm nhiều file; hồi quy đủ | Thấp (cơ học) | Sau đợt này mọi đợt sau sửa trong file nhỏ. Không mở bằng bấm đúp file nữa (Q8). |
| **B. Lớp 1 an toàn** | **Anh lưu ý (10/10, góp ý tốc độ):** `luu()` mỗi lần `JSON.stringify` toàn bộ `D` + ghi đè `localStorage` trên luồng giao diện (~240 chỗ gọi), `chTheoDoi` stringify `cauHinh` thêm lần nữa → khựng khi dữ liệu lớn (nhất là iPhone). Cần: ghi theo ngăn chỉ phần đổi, gom các lần lưu sát nhau (ghi nốt khi `pagehide`), bỏ stringify lần 2; đo trước / sau. Chỉ mục `D` → IndexedDB theo ngăn (đọc được dữ liệu cũ trong `localStorage`, chuyển 1 lần); 1 cơ chế đồng bộ Drive chung (gộp, không ghi trống, phiên bản); phép thử 2 máy giả lập | Cao (dữ liệu) | Làm kỹ, có sao lưu trước khi chuyển |
| **C. Kho dữ liệu `KHO`** | Bọc `slBo` / `toNap` / danh bạ sau cửa `KHO`; từ điển cột sửa được; cột lạ; dấu vân tay cấu trúc; phép tính chung (mục 3.5); cây địa bàn theo kỳ + báo thay đổi | Trung bình | Màn hình chưa đổi; các khối chuyển dần sang gọi `KHO` |
| **D. Lớp chung** | Bộ chọn phạm vi + kỳ chung cho mọi khối; bộ báo cáo `{cot, dong, tong}` → In / Excel / Word; xóa / thùng rác thống nhất (cả Số liệu) | Trung bình | |
| **E. Đăng ký khối** | `DANG_KY`; chuyển các báo cáo hiện có sang khai báo; báo cáo bảng tự khai trong Cài đặt | Trung bình | Từ đây mẫu mới = 1 file / 1 dòng khai |
| **F. Bố cục máy tính** | Mockup → sidebar, kỳ + phạm vi chung, mục Nạp riêng, bỏ tab Tháng (chuyển dữ liệu cũ) | Trung bình | Có thể đặt số bản 4.0 |
| **G. Nghiệp vụ nối kho** | Scan CCCD gắn mã KH (Q11); Theo dõi nợ / Giao ban / Buổi GD đọc từ `KHO` (bỏ bộ đọc Excel riêng) | Trung bình | |
| **H. Máy chủ nội bộ** | Exe máy chủ + `KHO1` lối ③ + kho VB tập trung | Cao (hạ tầng) | Sau khi tin học đồng ý |
| **I. Mini app** | Scan, Văn bản, điện thoại | Thấp–TB | |
| **J. Dọn mã chết** | Mẫu 10, Mẫu 7, Sao kê KH, khd08, mã hóa CCCD cũ (sau khi chắc không còn dữ liệu cũ cần đọc) | Thấp | Làm xen kẽ khi đụng tới |

**Mô hình gợi ý:** Opus cho A–F và H (đụng lõi, nhiều phần cùng lúc); Sonnet cho việc lẻ trong một khối khi kiến trúc đã ổn.

---

## 9. Quy tắc giữ vững trong mọi đợt
- Không đổi tên trường dữ liệu đã lưu (`trichYeu` = tên VB, `tomTat` = trích yếu đầy đủ…); dữ liệu cũ phải đọc được.
- Không xóa dữ liệu của anh; mọi chuyển đổi có sao lưu trước + đọc ngược được.
- Mỗi đợt: `kiem.py` sạch + hồi quy đủ (`tests/README.md`) + phép thử mới cho phần mới + cập nhật `docs/BAT_DAU.md` (trạng thái) + `docs/CHANGELOG.md` + `python3 tests/bando.py`.
- Repo công khai: không đưa dữ liệu thật vào repo / phép thử.
