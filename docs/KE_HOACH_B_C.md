# KẾ HOẠCH CHI TIẾT — Đợt B (lưu an toàn) + Đợt C rút gọn (kho chung `KHO`) — bản 14/10/2026, chờ anh Nhân duyệt

> Căn cứ: `docs/QUY_CHUAN_KIEN_TRUC.md` (kế hoạch tổng của tài khoản lập kế hoạch, mục 8 bước 2–3) + `docs/KIEN_TRUC_3_LOP.md` mục 6, 8.
> Nền: `main` = **3.201** (đã gộp: Mẫu 01/TV, Sao kê TK 104 / 105, Mã CIF TT, CCCD tổ trưởng, bỏ danh mục tổ).
> Quy trình mỗi bản: kế hoạch → anh duyệt → anh nhắn "code" → làm → `kiem.py` + phép thử + `tools/hoiquy.sh` → PR → anh nhắn "gộp".
> **Không đổi giao diện, không đổi mẫu in** trong 2 đợt này (mẫu KTGS + 3 mẫu Giao dịch xã đã khóa — quy chuẩn mục 1b, 8).

---

## 0. Chuẩn lại sổ QT trước khi làm (đề xuất — anh chốt rồi em ghi vào `QUY_CHUAN_KIEN_TRUC.md` mục 4)

Kế hoạch tổng viết QT-11…13 trước khi có file thật Sao kê / 01/TV. Đối chiếu file thật (chỉ đọc trong thư mục nháp) thấy cần chỉnh:

| Số | Kế hoạch tổng ghi | Thực tế file | Đề xuất chuẩn lại |
|---|---|---|---|
| **QT-11** TK 105 khách | "Mẫu 31 ưu tiên → Mẫu 18 → danh bạ theo CCCD" | Cột Sổ TK 105 của **Mẫu 31** thường là **số tài khoản hệ thống 13–14 số** (1482…); **Mẫu 18** ghi **số sổ 10 số** (khớp Sao kê TK 105: 17.737 / 17.738 khách). Từ 3.120 anh chốt in **số sổ 10 số**. | Số in = **số sổ 10 số**. Nguồn: **Mẫu 18** → Mẫu 31 (khi có số 10 số) → **Sao kê TK 105** (khách đã tất nợ — Mẫu 18 không ghi) → danh bạ theo CCCD → gõ tay. **Số tiền gõ tay**; **gợi ý số dư 105 theo Mẫu 31 mới nhất** (nút "rút hết" chỉ điền khi anh bấm — như hiện nay). *Cần anh xác nhận: in số sổ 10 số (không in số TK 14 số).* |
| **QT-12** TK 104 tổ trưởng | Sao kê 104 **tháng** là chuẩn; tra theo mã tổ → mã chuẩn hóa → tên tổ trưởng; danh mục tổ là nguồn phụ | Sao kê 104 **không có cột Mã tổ** (chỉ Mã KH, Mã xã, Mã thôn). Ghép **Mã CIF TT** (Mẫu 31 / 18) ↔ Mã KH: 369 / 377 tổ (8 tổ không có TK — báo rõ). Danh mục tổ: anh chốt **bỏ hẳn** (14/10, đã bỏ ở 3.201). | Ghép theo **Mã CIF TT**. Kỳ: **Sao kê 104 tháng của kỳ đang xem**; kỳ ngày → Sao kê 104 đúng ngày, thiếu thì ngày gần nhất trước đó trong tháng, rồi tháng trước (như `slKyDung` 3.136); ghi nguồn + ngày. 3.201 đang lấy **file mới nhất** → đổi trong đợt C. Không còn danh mục tổ. |
| **QT-13** CCCD | Mẫu 31 → Thông tin tổ trưởng → DSTO → danh mục tổ; CCCD hết hạn → cảnh báo | 46 / 367 tổ trưởng (30/09) **chưa từng vay** → không có trong Mẫu 31; **Mẫu 01/TV có CCCD 18.802 / 18.802 thành viên** (không có ngày cấp). | Mẫu 31 → Mẫu 18 → **Mẫu 01/TV** → Thông tin tổ trưởng → DSTO → **số anh gõ tay lần trước** (nhớ theo mã KH, 3.201). Nơi cấp tự tính theo ngày cấp. **CCCD hết hạn / sắp hết hạn → cảnh báo khi in Giấy lĩnh** (dùng `toCCCDHan` sẵn có) — *chưa làm, đưa vào đợt C*. |
| **QT-14** (mới) Mẫu 01/TV | — | 01/TV = danh sách thành viên tổ của TƯ, **chỉ theo tháng**; cột Dư nợ = gốc, **không tính lãi tồn**. App ↔ 01/TV (30/09): 18.648 / 18.648 cặp khách–tổ của app đều có trong 01/TV; TƯ thêm 168 thành viên không còn món vay. | 01/TV là **chuẩn thành viên tháng**. **Cần cho ra khỏi tổ** = TƯ còn giữ + dư nợ 0 + tiền gửi 0 + **không còn lãi tồn** (Mẫu 31). Còn lãi tồn = chưa tất nợ (anh chốt 14/10). Khách ở ≥ 2 tổ → cho ra ở tổ không còn dư nợ / tiền gửi. Kỳ tháng; KTGS chưa dùng (QT-08). |

---

## 1. Đợt B — Lưu an toàn (bước 2 kế hoạch tổng). Chia 2 bản để giảm rủi ro

### Hiện trạng (đo trên mã 3.201)
- `luu()` (`js/02-nen.js`) mỗi lần: `JSON.stringify` **toàn bộ** chỉ mục `D` (13 ngăn) → ghi đè `localStorage['tuhoso_v1']`; rồi `chTheoDoi()` (`js/17`) **stringify lại** phần cài đặt đồng bộ để so. **293 chỗ gọi** `luu()`, nhiều chỗ gọi liên tiếp trong 1 thao tác.
- Hệ quả: khựng khi dữ liệu lớn (nhất là iPhone); `localStorage` giới hạn ~5 MB → đầy thì **không lưu được** (đang chỉ báo lỗi).
- Sự cố 09/10 (mất cài đặt khi đồng bộ Drive) đã vá ở 3.141 (`chFileId`), **chưa có phép thử 2 máy** cho đường đồng bộ cài đặt.

### Bản 3.202 — B1: gom lưu (rủi ro thấp, không đổi nơi lưu)
1. `luu()` **giữ tên** (293 chỗ không phải sửa) nhưng chỉ **đánh dấu cần lưu + hẹn ghi sau 300 ms**; nhiều lần gọi sát nhau → **ghi 1 lần**.
2. `luuNgay()` ghi ngay — dùng ở: `pagehide`, `visibilitychange` (ẩn), `beforeunload`, trước tải lại trang / khôi phục / xóa dữ liệu, trước đẩy Drive. Chỗ cần kết quả ngay (`if(!luu())…`) đổi sang `luuNgay()` (rà từng chỗ).
3. `chTheoDoi()` chạy **trong lần ghi gom**, không chạy mỗi lần gọi → bỏ stringify lặp.
4. Đo trước / sau bằng phép thử (dữ liệu giả lớn: 20.000 văn bản, cài đặt lớn): số lần ghi, thời gian mỗi thao tác.
5. Phép thử mới `t169`: gom (10 lần gọi → 1 lần ghi), ghi ngay khi `pagehide`, đóng tab ngay sau thao tác không mất, `luu()` lỗi đầy bộ nhớ vẫn báo như cũ; **hồi quy đủ** (`hoiquy.sh`).

### Bản 3.203 — B2: chỉ mục theo ngăn trong IndexedDB + phép thử đồng bộ 2 máy (rủi ro cao — làm kỹ)
1. Chỉ mục `D` chuyển sang IndexedDB **mỗi ngăn 1 khóa** (`cauHinh`, `vanBan`, `duLieu`, `ghiChu`, `scan`, `rac`, `lich`, `bieuMau`, còn lại gom 1 ngăn) → mỗi lần chỉ ghi **ngăn đổi** (so chuỗi đã ghi của ngăn).
2. **Chuyển 1 lần**: lần mở đầu tiên đọc `localStorage` cũ → ghi sang IndexedDB → **giữ nguyên bản `localStorage` làm dự phòng 30 ngày** (không xóa ngay); có nút khôi phục từ dự phòng ở Cài đặt.
3. IndexedDB hỏng / bị chặn (trình duyệt riêng tư) → **tự quay về `localStorage`** như hiện nay, báo 1 lần.
4. Khởi động: đọc IndexedDB (bất đồng bộ) **trước** khi vẽ; giữ dự phòng đầu ngày (3.81), chặn ghi trống (3.81).
5. Phép thử 2 máy giả lập cho **đường đồng bộ cài đặt** (sự cố 09/10): máy A sửa khai báo Hội, máy B sửa lựa chọn in → không ai mất của ai; file Drive khác (`chFileId`) không ghi đè.
6. Gộp 3 đường đồng bộ (chỉ mục / cài đặt / số liệu) thành 1 cơ chế: **để sau** (ghi việc tồn) — B2 chỉ thêm phép thử, không viết lại đồng bộ.

---

## 2. Đợt C rút gọn — kho chung `KHO` (bước 3 kế hoạch tổng), làm thử bằng TK 104 / 105 / CCCD

### Bản 3.204 — C1: cửa `KHO` bọc hàm sẵn có (không đổi màn hình)
File mới `js/29-kho.js` (nạp sau `js/28`). Mỗi hàm ghi **hợp đồng** ngay trên hàm (đầu vào, đầu ra, đơn vị, số QT):

| Cửa | Bọc hàm hiện có | QT |
|---|---|---|
| `KHO.ky(ky)` → bộ kỳ (bảng + nguồn từng loại) | `slBo` | 3.136 |
| `KHO.cay(ky)` → cây địa bàn (xã → điểm → ấp → tổ) | `toNap` | Q4 |
| `KHO.to(maTo, ky)` → tổ (tổ trưởng, mã KH tổ trưởng = Mã CIF TT, điểm GD, Hội) | `TO_K.to`, `hsoTTKH` | QT-12 |
| `KHO.toVien(maTo, ky)` → tổ viên + trạng thái (còn nợ / tất nợ còn TK 105 / ra khỏi tổ + lý do) | `toKhach`, `toTV`, `slDanhRaTo` | QT-01…07 |
| `KHO.khach(maKH, ky)` → nhân thân + món + tổ | `hsoKhach`, danh bạ `SL_DB` | QT-13 |
| `KHO.tk104(maTo, ky)` → `{so, nguon, ngay, ly}` | `tkTT` (3.201) — đổi sang **theo kỳ** | QT-12 |
| `KHO.tk105(maKH, ky)` → `{so[], soDu, nguon, ly}` | `slStkKH`, `tkCua('tk105')` | QT-11 |
| `KHO.cccd(maKH, ky)` → `{so, ngayCap, noiCap, han, nguon, ly}` | `hsoKhach`, `tv01Cua`, `gdxTTNhanThan`, `ccNho`, `gdxNoiCap`, `toCCCDHan` | QT-13 |
| `KHO.thanhVienTW(ky)` → đối chiếu 01/TV + cần cho ra khỏi tổ | `tvDoiChieu` (3.201) | QT-14 |

- Bên trong **chưa viết lại** — chỉ bọc + gom quy tắc nguồn về 1 chỗ (đúng KT3L 3.6 "bọc trước, đổi bên trong sau").
- Phép thử cửa `t170` (dữ liệu giả `tests/gia31` + Sao kê / 01/TV giả): mỗi cửa trả đúng nguồn, đúng thứ tự ưu tiên, thiếu thì có lý do.

### Bản 3.205 — C2: Giấy lĩnh + mini app lấy dữ liệu qua `KHO` (mẫu in KHÔNG đổi)
1. `gdxGLDuLieu` (`js/26`) và `gdxMiniGoi` (`js/27`) chỉ gọi `KHO.tk104 / tk105 / cccd` — bỏ đọc thẳng `TO_K`, `SL_DB`, `tkCua`… trong khối Giao dịch xã (giảm chỉ số "đọc biến chung" mục 7 quy chuẩn).
2. **TK 104 theo kỳ** (QT-12 chuẩn lại) thay "file mới nhất".
3. **Cảnh báo CCCD hết hạn / sắp hết hạn** ở dòng Tóm tắt Giấy lĩnh (QT-13).
4. Phép thử: **so HTML bản in Giấy lĩnh / Bảng kê / mini app trước – sau = giống hệt** (với cùng dữ liệu giả) — chứng minh mẫu khóa không đổi; `t167`, `t168` giữ đạt.
5. Ghi QT-11…14 vào `QUY_CHUAN_KIEN_TRUC.md` mục 4 + chú thích số QT trong hàm `KHO`.

### Sau C (kế hoạch tổng bước 4–9 — lập kế hoạch chi tiết riêng khi tới lượt)
Tách KTGS ra file riêng (cơ học) → dòng thời gian + chốt sổ tổ viên cuối năm (**hạn trước khi nạp Mẫu 31 tháng 1/2027**) → đối chiếu chéo có danh mục lý do lệch → Hồ sơ Tổ / phần còn lại Giao dịch xã qua `KHO`, tách `js/22` → "Việc cần xử lý" ở Hôm nay.

---

## 3. Cần anh chốt trước khi em nhắn bắt đầu
1. **QT-11:** Giấy lĩnh in **số sổ 10 số** (Mẫu 18 / Sao kê 105), không in số TK 14 số của Mẫu 31 — đúng không?
2. **QT-12, 13, 14** như bảng mục 0 — đồng ý?
3. **Đợt B chia 2 bản** (3.202 gom lưu · 3.203 IndexedDB theo ngăn) — đồng ý? Làm 3.202 trước.
4. Thứ tự: **3.202 → 3.203 → 3.204 → 3.205** — mỗi bản anh test / "gộp" rồi mới sang bản sau.
