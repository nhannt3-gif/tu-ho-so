# Kế hoạch gọn tab KTGS Hội — bản 3 (anh đã chốt 5 ý 23/10 — chờ anh nhắn "code")

> Người làm: **TK 3** (tài khoản này, anh gọi mặc định 23/10). Làm xong giao **TK 2** đưa KTGS qua `KHO` — mục 9.

> Anh 23/10/2026: chia 2 phần — (1) **bắt buộc**: kiểm tra định kỳ theo Kế hoạch + kiểm tra sau giải ngân 30 ngày, số liệu **tháng liền trước**; (2) **đột xuất**, số liệu **ngày chọn**. Rà khai báo, mẫu biểu, bỏ trùng, bố cục gọn.
> "Lên plan từ bố cục giao diện đến cấu trúc dữ liệu, theo hướng **khai báo tùy biến tối đa**." Tuyệt đối không làm mất / hư KTGS đang có (số liệu đang đúng).

---

## 1. Hiện trạng (rà 3.325) — tóm tắt

- **6 chip ngang**: 🏛 Khai báo Hội đoàn thể · 🎯 Đột xuất · 📅 Sau giải ngân · 🗓 Định kỳ · 📋 Mẫu 04 · 🗓 Kế hoạch 01/KH.
- **Tháng / ngày số liệu chọn 4 kiểu**: đột xuất = ô đầu trang (ngày) · sau GN = ô "từ → đến tháng" riêng · định kỳ = ô đầu trang nhưng bắt buộc là tháng · Kế hoạch = bấm tháng.
- **Trùng lối**: Định kỳ (chip + Kế hoạch › in theo tháng) · Mẫu 04 (chip + Kế hoạch › chọn tháng).
- **Khai báo rải 6 nơi** (dữ liệu đang lưu trong `D.cauHinh`):

| Khóa | Nội dung | Ghi chú |
|---|---|---|
| `ktHoiKB['xã\|hội']` | tên Hội cấp xã, CT, PCT, 5 UV BTV, HĐUT, KH Hội tỉnh | gốc — giữ |
| `ktChuan[mã hội]` | tên chuẩn Hội, chữ đặc thù, KH Hội tỉnh chung | giữ |
| `ktPC['xã\|hội']` | thông báo phân công BTV | giữ |
| `ktKH['năm\|xã\|hội']` | lịch kiểm tra năm (tổ → tháng) | giữ |
| `ktApThu[xã]` | thứ tự ấp trong kế hoạch | giữ |
| `ktIn[mẫu]`, `ktIn['dx_'+mẫu]` | lựa chọn khi in (mục đích, nhận xét, Bảng II, người KT, đơn vị…) | chuyển vào Bộ khai báo |
| `ktKBLuu` (dv, cbtu, cb2, cv2) · `ktNhanXet` · `ktMucDich` · `ktBang16` | lựa chọn cũ trước 3.114 | chuyển vào Bộ khai báo |
| `ktKN04` | kiến nghị Mẫu 04 bật / chữ | chuyển vào Bộ khai báo (mẫu 04) |
| `ktPnkt` | bảng ngành kinh tế rút gọn | giữ |
| `ktHaiMat` | in 2 mặt | chuyển vào Bộ khai báo (chung) |
| `ktgs` | trạng thái tab (che, ky, gnTu/gnDen, khNam, hdtTab…) | mở rộng |

---

## 2. Bố cục giao diện mới

### 2.1 Thanh trên cùng tab — 3 khối (thay 6 chip)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ [📅 Bắt buộc · theo tháng]   [🎯 Đột xuất · theo ngày]   [⚙ Khai báo]           │
└───────────────────────────────────────────────────────────────────────────────┘
(cây Xã › Điểm GD › Hội › Tổ dùng chung như hiện tại)
```

### 2.2 Khối A — 📅 Bắt buộc (Hội phải làm), số liệu THÁNG LIỀN TRƯỚC

```
Tháng kiểm tra [◀ 11/2026 ▶]   Số liệu: Mẫu 31 chốt 31/10/2026 ✓ · BC0437 T10 ✓   Bộ khai báo: [Hội tự kiểm tra ▾] ✎
┌ thẻ con ─────────────────────────────────────────────────────────────────────┐
│ [🗓 Định kỳ theo kế hoạch · 12 tổ] [📅 Sau giải ngân · 5 món] [📋 Mẫu 04] [🗓 Lịch năm 01/KH] │
└──────────────────────────────────────────────────────────────────────────────┘
(nội dung thẻ: bảng tổ / món như hiện tại — tích, In / Word)
```
- **Tháng kiểm tra** là ô DUY NHẤT của khối A; app tự lấy Mẫu 31 chốt cuối tháng trước + BC0437 tháng trước. Ô Kỳ đầu trang KHÔNG ảnh hưởng khối A. Tháng trước chưa có bản chốt → Mẫu 31 ngày mới nhất của tháng đó + ghi rõ ⚠.
- **Định kỳ**: tổ có lịch tháng đó (từ Lịch năm) tích sẵn; thêm tổ ngoài lịch như cũ. Gộp chip Định kỳ + "Kế hoạch › in theo tháng".
- **Sau giải ngân**: mặc định món giải ngân trong tháng trước; nút "gom nhiều tháng" mở từ → đến (như cũ).
- **Mẫu 04**: tổ đã kiểm tra tháng đó (định kỳ) tích sẵn; gộp chip 📋 + "Kế hoạch › Mẫu 04".
- **Lịch năm 01/KH**: lập / sửa lịch, in Kế hoạch — như hiện tại, chỉ chuyển vào đây.

### 2.3 Khối B — 🎯 Đột xuất, số liệu NGÀY CHỌN (ô Kỳ đầu trang)

```
Số liệu: Mẫu 31 ngày 19/10/2026 (ô đầu trang)   Bộ khai báo: [Đoàn NHCSXH ▾] ✎   Ngày kiểm tra [__/__/____]
Tổ … → gợi ý hộ (tốt / cần quan tâm / trung hòa) → [In / Word Mẫu 06] [Mẫu 16] [Mẫu 04]
```
- Giữ nguyên logic 3.325; thêm nút Mẫu 04 (nếu anh chốt).
- **Ngày chọn phải nhớ qua lần mở app** (anh 23/10 thử 3.325: "vẫn ghi số liệu đến 30/9" — nguyên nhân: luật 3.97 "kỳ theo ngày chỉ giữ trong lần mở app", Ctrl+F5 xong ô đầu trang tự về tháng chốt T9). Khối A đã có ô tháng riêng nên ô đầu trang được nhớ ngày; hoặc khối B có ô ngày riêng (nhớ lâu).

### 2.4 Khối C — ⚙ Khai báo (1 nơi cho tất cả)

Tab nhỏ: **🏛 Hội đoàn thể** (như cũ) · **🧩 Bộ khai báo mẫu** (mới) · **📖 Chuẩn hóa** · **📄 Phân công BTV** · **🏷 Ngành kinh tế** · **↕ Thứ tự ấp**.

**🧩 Bộ khai báo mẫu** — khai báo tùy biến tối đa:
```
Bộ: (●) ① Hội kiểm tra (cố định)   ( ) ② Khai báo khi cần      [⧉ Chép ① sang ②]
Mẫu: [06] [16] [04] [01/KH]          Xem: [Bản điền thử ▾]
┌ danh sách ô (trái) ──────────────────────┐ ┌ xem trước mẫu (phải) — bấm vào ô trên mẫu để chọn ┐
│ Phần đầu                                 │ │                                                    │
│  Đơn vị kiểm tra   🤖 Hội | ✍ | ⌨ [....] │ │   (trang Mẫu 06 / 16 / 04 thu nhỏ, ô đang chọn    │
│  Đoàn kiểm tra     🤖 Hội | ✍ | ⌨ [....] │ │    viền đỏ, màu theo cách: 🤖 xanh, ⌨ vàng, ✍ xám) │
│ Cán bộ kiểm tra                          │ │                                                    │
│  Người 1  🤖 vai trò [PCT▾] | ✍ | ⌨ tên + chức vụ │                                            │
│  Người 2  … (như trên)                   │ │                                                    │
│ Ngày / thời điểm                         │ │                                                    │
│  Ngày kiểm tra   ✍ | 🗓 tháng KT | ⌨ ngày │ │                                                    │
│ Số liệu (luôn 🤖, có thể ✍ để trống)     │ │                                                    │
│ Nội dung kiểm tra                        │ │                                                    │
│  Mục đích (06)   ✍ | 🤖 ngành KT          │ │                                                    │
│  Bảng II (16): cả bảng ☐ trống | ✍ chấm theo mẫu | 🤖 727  [▸ từng ô] │                        │
│  Nhận xét / tồn tại / kiến nghị  ✍ | 🤖 gợi ý | ⌨ chữ cố định │                               │
│ Chung: in 2 mặt ☑, cỡ chữ …              │ │                                                    │
└──────────────────────────────────────────┘ └────────────────────────────────────────────────────┘
```
- **Mỗi ô trên mẫu = 1 dòng khai báo** với 4 cách: 🤖 tự động (số liệu / khai báo Hội) · ✍ chấm ghi tay · ☐ để trống · ⌨ gõ chữ riêng (nhớ trong bộ). Ô số liệu chỉ 🤖 / ✍.
- **2 bộ cố định** (anh chốt 23/10): **① Hội kiểm tra** (cố định — khối A dùng) · **② Khai báo khi cần** (khối B dùng; khối A khi cần cũng chọn được lúc In). Không tạo thêm bộ.
- Hộp 🖨 Chọn khi in hiện tại → gọn thành: **Bộ khai báo [▾] · ✎ sửa nhanh vài ô hay dùng (Chọn nhanh) · Ngày kiểm tra · In / Word**.

---

## 2b. Mẫu biểu & khai báo — điều chỉnh trước khi phối hợp TK 2 (TK 3 đề xuất 23/10)

**① Khai báo 3 tầng — mỗi thông tin khai đúng 1 chỗ, tầng dưới chỉ THAM CHIẾU tầng trên, không gõ lại**
| Tầng | Khai cái gì | Lưu | Ví dụ |
|---|---|---|---|
| **1. Đơn vị** (sự thật) | ai là ai: Hội – xã, CT, PCT, UV BTV, HĐUT, KH Hội tỉnh, tên chuẩn Hội, ngành kinh tế, thứ tự ấp | `ktHoiKB`, `ktChuan`, `ktPnkt`, `ktApThu` (giữ) | "PCT Hội ND xã Truông Mít = Nguyễn Văn A" |
| **2. Bộ khai báo mẫu** (cách điền) | mỗi ô trên mẫu điền thế nào: 🤖 theo tầng 1 / số liệu · ✍ chấm · ☐ trống · ⌨ chữ riêng | `ktBo` (2 bộ cố định) | "Người kiểm tra = 🤖 PCT của Hội phụ trách tổ" |
| **3. Lần in** (không lưu, trừ ngày đang gõ) | chọn bộ ①/②, ngày kiểm tra, sửa nhanh 1–2 ô cho lần này | phiên | "lần này đơn vị = Đoàn NHCSXH" |
→ ô "⌨ chữ riêng" ở tầng 2 chỉ dùng khi tầng 1 không có (vd đoàn ngoài Hội); không còn ô gõ tên cán bộ ở nhiều nơi.

**② Sổ mẫu KTGS `KT_MAU` — 1 bảng duy nhất cho mọi mẫu**
| Mẫu | Khối dùng | Khuôn Word | Sổ ô `KT_O` | Ghi chú |
|---|---|---|---|---|
| Mẫu 06 KTGS (phiếu KT sử dụng vốn) | A Định kỳ, A Sau GN, B Đột xuất | m06 | có | 1 tổ × 1 lần (Sau GN: × 1 tháng) |
| Mẫu 16 KTGS (biên bản KT tổ) | A Định kỳ, B Đột xuất | m16 | có | |
| Mẫu 04 KTGS (báo cáo tổng hợp) | A (theo tháng), B (khi cần) | m04 | có | |
| Kế hoạch KTGS 01/KH | A › Lịch năm | m01 | có (ít ô) | |
| Thông báo phân công BTV KTGS | C | pc | không | giữ như cũ |
→ **Mẫu trắng không còn là đường riêng**: mọi mẫu có nút "📄 Mẫu trắng" = cùng hàm dựng với **bộ ảo "Trắng"** (mọi ô ✍, số liệu ✍). Mẫu 06 trắng hiện tại (1 mặt / 2 mặt) giữ nguyên số dòng.

**③ 1 đường in duy nhất** — hiện có 12 hàm mở / in riêng (`ktXuat`, `ktGNXem/In`, `ktDKXem/In`, `ktBCXem/In`, `ktKH04Xem`, `ktKHXem/In`, `ktTrang06Xuat`, `ktPCXuat`…) → gom về **`ktInMau(mẫu, dsPhiếu, {bo, cach:'xem'|'in'|'word'|'pdf'})`**: hộp in chung (chọn bộ · ngày · sửa nhanh) → xem trước → In / Word / PDF; tên file theo `QUY_CHUAN` mục 12. Các hàm cũ còn lại làm "lối tắt" gọi `ktInMau` (không xóa đến khi TK 2 nhận bàn giao). **Hàm dựng mẫu + khuôn Word không đổi.**

**④ KTGS KHÔNG dùng nền ô Hồ sơ vay (`js/31-o-mau.js`)** — `KT_O` / `ktBo` giống ý tưởng nhưng là **mã riêng KTGS** (QUY_CHUAN 1b: gói riêng, mẫu khóa, không viết lại bên trong). Ghi rõ để TK 2 không gộp 2 hệ khi đưa qua `KHO`.

**⑤ Nhãn giao diện** gọi đủ "Mẫu 06 KTGS / Mẫu 16 KTGS / Mẫu 04 KTGS / Kế hoạch KTGS" (QUY_CHUAN 1b.0) ở thanh khối, hộp in, tên file — tránh nhầm với Mẫu 06/TD hồ sơ vay.

**Ranh giới với TK 2** (bổ sung mục 9): TK 2 chỉ chạm **tầng số liệu** (`ktNguon*` → `KHO`). Tầng 1 – 2 – 3, `KT_MAU`, `KT_O`, `ktBo`, `ktInMau`, hàm dựng mẫu, khuôn Word = **của KTGS (TK 3 làm, sau bàn giao chỉ sửa khi anh yêu cầu)**. Cây địa bàn, `inChuan`, xuất Word / PDF = dùng chung, TK 2 sửa thì chạy bộ phép thử KTGS.

## 3. Cấu trúc dữ liệu mới

### 3.1 Sổ ô mẫu (trong code, không lưu) — `KT_O[mẫu]`
```js
KT_O.m06 = [
  {k:'dv',  ten:'Đơn vị kiểm tra', phan:'dau',   cach:['tu','cham','go'], md:'tu', tu:'hoi'},
  {k:'ng1', ten:'Người kiểm tra',  phan:'canbo', cach:['tu','cham','go'], md:'tu', tu:'vaitro', vt:'pct'},
  {k:'ngay',ten:'Ngày kiểm tra',   phan:'ngay',  cach:['cham','thang','go'], md:'cham'},
  {k:'md',  ten:'Cột Mục đích',    phan:'noidung', cach:['cham','tu'], md:'cham', tu:'nganh'},
  {k:'so',  ten:'Số liệu hộ / món',phan:'so',    cach:['tu','cham'], md:'tu'},
  …]
KT_O.m16 = [ dv, doan, ng1, ng2, ngay, so (mục I), xl (chấm điểm), b2_01 … b2_14, kq1, kq2, ud, tt, kn, sph … ]
KT_O.m04 = [ dv, doan, ng1, ng2, ngay, kn04_* … ]
KT_O.kh  = [ ky (người ký), hdut, khTinh, doan … ]
```
→ 1 chỗ khai mọi ô; giao diện khai báo, hộp in, Word đều đọc từ đây (QUY_CHUAN mục 9 — cùng cách nền ô Hồ sơ vay).

### 3.2 Dữ liệu lưu — `D.cauHinh.ktBo` (mới, đồng bộ Drive cùng cài đặt)
```js
ktBo = {
  ban: 1,
  ds: {
    'b1': {ten:'Hội tự kiểm tra', tao:'2026-10-23', chung:{haiMat:1},
           mau:{ m06:{ dv:{c:'tu'}, ng1:{c:'tu', vt:'pct'}, md:{c:'cham'} },
                 m16:{ dv:{c:'tu'}, b2_01:{c:'tu'}, …, ud:{c:'tu'} },
                 m04:{…}, kh:{ky:{c:'tu', vt:'ct'}} }},
    'b2': {ten:'Đoàn NHCSXH đột xuất', mau:{ m06:{ dv:{c:'go', v:'Đoàn kiểm tra NHCSXH PGD …'}, ng1:{c:'go', ten:'…', cv:'…'} }, … }}
  },
  macDinh: {A:'hoi', B:'cancan'},   // 2 bộ cố định (anh chốt): 'hoi' = ① Hội kiểm tra · 'cancan' = ② Khai báo khi cần
  nhanh: {m06:['dv','ng1','md'], m16:['dv','ng1','ng2','b2','ud']}   // ô hiện ở "sửa nhanh"
}
```
- Ô không có trong bộ → dùng `md` của sổ ô (mặc định an toàn).
- Hàm đọc duy nhất: `ktBoGT(mẫu, ô, khối) → {c, v, …}`; `ktInV(mẫu)` hiện tại được viết lại để trả đúng object `v` cũ từ bộ → **các hàm dựng mẫu (`ktGiaTri06/16`, `ktBC04`, `ktKHGiaTri`) không phải sửa**.

### 3.3 Trạng thái tab — `D.cauHinh.ktgs` (mở rộng, giữ khóa cũ)
```js
ktgs = { …cũ…, khoi:'A'|'B'|'C', A:{thang:'2026-11', the:'dk'|'gn'|'bc'|'kh', gom:{tu, den}}, C:{tab:'hoi'|'bo'|'chuan'|'pc'|'nganh'|'ap'} }
```
- `che` cũ → `khoi` + `A.the` (dx → B; gn / dk / bc / kh → A; hdt → C).

### 3.4 Chuyển dữ liệu cũ (1 lần, không xóa bản cũ)
- Bộ **"Mặc định (từ bản cũ)"** = `ktIn[m06/m16/m04/kh]` + `ktKBLuu` + `ktNhanXet / ktMucDich / ktBang16` + `ktKN04` + `ktHaiMat` → dùng cho khối A.
- Bộ **"Đột xuất (từ bản cũ)"** = `ktIn['dx_'+mẫu]` (nếu có) → khối B.
- Ghi `ktBo.ban = 1`; khóa cũ GIỮ NGUYÊN (quay lại bản trước vẫn chạy).

---

## 4. Tách lớp (QUY_CHUAN mục 1 – 2)
- **Dữ liệu**: `ktSoTo(t, ky)`, `ktHo(t, ky)`, Sau GN / Định kỳ nhận **kỳ truyền vào** (khối A = Mẫu 31 chốt tháng trước, khối B = kỳ chung) thay vì đọc `KT_K` ngầm — dựng `KT_K` theo đúng kỳ của khối đang mở.
- **Nghiệp vụ**: gợi ý hộ, 90% định kỳ, món 30 ngày — giữ nguyên hàm.
- **Giao diện**: file mới `js/55-ktgs-khung.js` (thanh 3 khối, khối A / B), `js/56-ktgs-bo.js` (sổ ô `KT_O`, `ktBo`, màn Bộ khai báo, chuyển dữ liệu cũ). File cũ 22b–22e chỉ gọi sang, không xóa hàm đang dùng.

---

## 5. An toàn
- Không sửa hàm tính số liệu / dựng mẫu / khuôn Word; chỉ thay **nơi lấy kỳ** và **nơi lấy lựa chọn in**.
- Chuẩn khóa kt_06 / kt_16 / kt_04 / kt_kh (t179) + t106–t150, t181, t197, t236 phải đạt mỗi bước; thêm: bộ "Mặc định (từ bản cũ)" in ra **trùng từng ký tự** bản 3.325 với cùng lựa chọn; khối A tháng 11 → số liệu đúng Mẫu 31 chốt 31/10 dù ô đầu trang chọn ngày khác.
- Mỗi bước 1 bản gộp riêng, anh thử xong mới làm bước sau; hồi quy đủ gom cuối bước 3 và bước 5.

## 6. Các bước (TK 3)
0. **Nhớ ngày chọn** ở ô đầu trang qua lần mở app (anh thử 3.325 bị về 30/09 sau Ctrl+F5) — nhỏ, làm trước.
1. **Dữ liệu**: `ktBo` + sổ ô `KT_O` (06, 16) + chuyển dữ liệu cũ + `ktInV` đọc từ bộ (giao diện chưa đổi; in ra trùng 3.325).
2. **Khối A số liệu tháng trước** + lớp nguồn `ktNguon*`: ô Tháng kiểm tra; Định kỳ / Mẫu 04 lấy Mẫu 31 chốt tháng trước; Sau GN chọn tháng như cũ, 1 tổ × 1 tháng = 1 phiếu, dòng nhắc 30 ngày (mục 8) (màn cũ giữ).
3. **Thanh 3 khối** + chuyển chip cũ vào khối; gộp 2 lối Định kỳ, 2 lối Mẫu 04; Lịch năm thành thẻ trong khối A.
4. **🧩 Bộ khai báo mẫu + đường in chung `ktInMau`** (2 bộ + bộ ảo Trắng; màn khai báo trực quan: danh sách ô + xem trước bấm ô) cho 06, 16 — Bảng II cả bảng + ▸ từng ô; hộp in gọn (chọn bộ + sửa nhanh); Mẫu 04 trong khối B.
5. Mở rộng sổ ô cho Mẫu 04, 01/KH; dọn khai báo trùng (Ông bà 2 gõ tay, ô cũ) → hồi quy đủ → **bàn giao TK 2** (mục 9).

## 7. Anh đã chốt (23/10)
1. **2 bộ khai báo**: ① **Hội kiểm tra** (cố định, khối A) · ② **Khai báo khi cần** (khối B, và chọn được khi in khối A). Không làm "nhiều bộ có tên".
2. **Bảng II Mẫu 16**: khai **cả bảng 1 cách** — ☐ **để trống** (ô trống, KHÔNG chấm trong bảng) · ✍ **chấm theo mẫu** (tùy chỗ: ô nào mẫu gốc có chấm thì chấm) · 🤖 điền 727; nút con **▸ Từng ô** mở 14 ô khi cần chỉnh riêng (mỗi ô cùng 4 cách + chữ riêng).
3. **Sau giải ngân**: gom nhiều tháng được, nhưng **in 1 tổ × 1 tháng = 1 phiếu Mẫu 06** (đổi so với 3.98 "mỗi tổ 1 phiếu gom các tháng"); lưu ý **ngày kiểm tra tối đa 30 ngày sau giải ngân** — mục 8.
4. **Đột xuất có nút Mẫu 04** (in khi cần, cùng khuôn Mẫu 04 KTGS).
5. Làm xong phần tinh chỉnh → **giao TK 2** đưa KTGS qua `KHO` — mục 9.

## 8. Sau giải ngân — hạn 30 ngày (anh chốt 23/10: chỉ lưu ý, không làm cứng)
- 727: kiểm tra trong 30 ngày sau giải ngân — nhưng **ngày ghi tay trên phiếu lùi lại được**, nên **không thêm cách chọn ngày, không chặn, không kiểm ngày**.
- Giữ cách chọn tháng như hiện tại (mặc định tháng liền trước, gom nhiều tháng được); in **1 tổ × 1 tháng = 1 phiếu Mẫu 06**.
- Chỉ thêm **1 dòng nhắc** ở thẻ Sau giải ngân: "Kiểm tra trong 30 ngày kể từ ngày giải ngân (727)".

## 9. Phối hợp TK 3 → TK 2 (bàn giao)
**Phân việc**
| Việc | Ai | Khi nào |
|---|---|---|
| Tinh chỉnh KTGS: bố cục 3 khối, 2 bộ khai báo, Sau GN theo tháng + hạn 30 ngày, Mẫu 04 đột xuất, nhớ ngày chọn | **TK 3** | bước 0 → 5 (mục 6) |
| Đưa KTGS qua `KHO` (bỏ đọc thẳng `KT_K` / `TO_K` / `SLM.bang` / `toKhach`) | **TK 2** | sau khi TK 3 báo "bàn giao KTGS" |
| Cửa mới trong `js/29-kho.js` cho KTGS (spec bên dưới) | **TK 2** làm song song được (chỉ file 29 + phép thử của cửa) | bất kỳ lúc nào |

**Khóa file (tránh đụng nhau)** — trong lúc TK 3 làm: `js/22b-ktgs.js` · `22c-ktgs-m06.js` · `22d-ktgs-04.js` · `22e-ktgs-kh.js` · `22k-kt-khuon.js` · `js/55-ktgs-khung.js` · `js/56-ktgs-bo.js` (mới) · phép thử t106–t150 (KTGS), t236–t239 → **chỉ TK 3 sửa**. TK 2 không sửa các file này đến khi bàn giao; TK 3 không sửa `js/29-kho.js`. Số bản: ai gộp trước lấy số kế tiếp, người sau gộp lại theo `main` (như 3.308 → 3.309).

**TK 3 chuẩn bị sẵn cho TK 2** (trong bước 1–2):
- Gom mọi chỗ KTGS lấy số liệu về **1 lớp nguồn** `ktNguon*` (file `js/56-ktgs-bo.js` hoặc đầu 22b): `ktNguonKy(khối)` → kỳ dựng · `ktNguonTo(t)` · `ktNguonHo(t)` · `ktNguonMonGN(thang, tổ)` · `ktNguonBC37(thang)` · `ktNguonBC38(thang)`. Code KTGS chỉ gọi `ktNguon*`; bên trong tạm đọc `KT_K` / `SLM` như cũ → **TK 2 chỉ cần viết lại thân các hàm `ktNguon*` qua `KHO`**, không đụng phần còn lại.
- Hiện còn đọc thẳng: `SLM.` 18 chỗ · `KT_K` 100 · `TO_K` 5 · `toKhach(` 7 (22b–22e) — bảng chi tiết từng chỗ ghi vào `docs/BAN_GIAO_KTGS.md`.

**Cửa `KHO` TK 2 cần có (spec)**: `KHO.chotThang(th)` → kỳ Mẫu 31 chốt tháng (hoặc ngày mới nhất trong tháng + cờ `tam`) · `KHO.ngay(iso)` → kỳ Mẫu 31 theo ngày · `KHO.bc37(th)` / `KHO.bc38(th)` → bảng BC0437 / BC0438 theo tổ / xã–hội · `KHO.monGN(th)` → món giải ngân trong tháng (ngày GN, tổ) — trả **đúng dạng KTGS đang dùng** (QUY_CHUAN 1b.3 "bộ chuyển").

**Bàn giao (TK 3 làm khi xong bước 5)**: `docs/BAN_GIAO_KTGS.md` gồm — sơ đồ 3 khối · sổ ô `KT_O` · `ktBo` · danh sách `ktNguon*` + chỗ gọi · phép thử phải giữ (t106–t150, t179 kt_*, t181, t236+) · hồi quy đủ sạch · chỗ còn đọc thẳng · việc TK 2.

**Sửa QUY_CHUAN mục 1b.2** (anh duyệt): "KTGS chỉ nhận số liệu cuối tháng" → **khối A (bắt buộc) = cuối tháng liền trước; khối B (đột xuất) = Mẫu 31 theo ngày chọn**.

## 10. Còn cần anh chốt
1. Bước 0 (làm ngay): **ngày chọn ở ô đầu trang nhớ qua lần mở app** (bỏ luật 3.97 "chỉ giữ trong phiên") — đồng ý?

## 11. Tiến độ (TK 3)
| Bước | Bản | Đã làm |
|---|---|---|
| 0 | 3.326 | Ô ngày đầu trang nhớ ngày chọn qua lần mở app; QUY_CHUAN 1b.2 sửa (anh đã đồng ý mục 10.1 — "cách làm em quyết"). |
| 1 | 3.327 | `js/56-ktgs-bo.js`: **2 bộ cố định** `KT_BO` (① Hội kiểm tra = `ktIn[mẫu]`, ② Khai báo khi cần = `ktIn['dx_'+mẫu]` — **dùng lại chỗ lưu cũ, không cần chuyển dữ liệu** thay cho mục 3.2/3.4); `ktInKhoa` → `ktBoKhoa`; hộp in có dòng **Bộ khai báo** (chọn bộ kia cho lần in, mở hộp mới về mặc định); **Bảng II cả bảng + Từng ô** (`b2o`, `ktB16Mang`). Sổ ô `KT_O` đầy đủ dời sang bước 4 (cùng màn Bộ khai báo — tránh mã chưa dùng). Bản in kt_06/16/04/kh trùng 3.326 (t179). |
| 2 | 3.329 | Lớp nguồn `ktNguon*` (`js/56-ktgs-bo.js`, bọc `ktKHNapSL / ktKHVoiSL` 3.141); ô **📅 Tháng kiểm tra** chung cho Định kỳ + Mẫu 04 (số liệu cuối tháng liền trước, ô Kỳ đầu trang không ảnh hưởng; mặc định như cũ). **Sau GN: 1 tổ × 1 tháng = 1 phiếu**, lãi tồn / 105 theo Mẫu 31 tháng GN, dòng nhắc 30 ngày. t237 (16). |
| 3–4 | 3.330 | **Thanh 3 khối** 📅 Bắt buộc · 🎯 Đột xuất · ⚙ Khai báo (`ktKhoiHTML`, thay 6 chip; khóa `che` cũ giữ, `ktgs.aThe` nhớ thẻ con khối A); **🧩 Bộ khai báo mẫu** trong ⚙ Khai báo (`ktBoVe` — sửa 2 bộ ngay trên màn, cùng ô với hộp In, ⧉ Chép ① sang ②, 📄 Mẫu 06 trắng); **đột xuất có 📋 Mẫu 04** (`ktDX04`); Định kỳ nút **📅 Tích tổ có lịch T…** (gộp lối Kế hoạch › in theo tháng). Nút KTGS chuyển `data-lenh` (lệnh `ktk.*`) → onclick về trong mốc. `ktInMau` (1 đường in) **không làm** — các hàm in cũ giữ, danh sách lối in ghi ở `docs/BAN_GIAO_KTGS.md` (tránh viết lại hàm đang đúng). t238 (17). |

## 12. TK 2 phản hồi phối hợp (23/10 — chỉ ghi ở mục này, không sửa mục khác)
1. **Đồng ý mục 9 + khóa file:** TK 2 không sửa `js/22b–22e`, `22k`, `55`, `56`, t106–t150, t236–t239 cho tới khi TK 3 báo "bàn giao KTGS".
2. **TK 2 làm song song cửa `KHO` cho KTGS** theo spec mục 9 — chi tiết `docs/KE_HOACH_KHO_KTGS.md`: `KHO.chotThang`, `KHO.theoNgay`, `KHO.bc37` / `bc38`, `KHO.t105Truoc`, `KHO.monGN` — chỉ bọc hàm cũ, trả đúng dạng KTGS đang dùng; phép thử `t240` (tránh t236–t239). TK 3 khi viết `ktNguon*` cứ gọi hàm cũ; sau bàn giao TK 2 thay thân bằng cửa.
3. **Bước 0 của TK 3 (nhớ ngày chọn qua lần mở app)** chạm kỳ chung — Hồ sơ vay, Giao dịch xã cũng đọc kỳ đầu trang; TK 2 không phản đối, nhờ TK 3 chạy kèm t173 / t174 (Hồ sơ vay) và t165 (GDX) khi đổi.
4. **Đề xuất thanh bên 2 cấp** (anh đang duyệt, `RA_SOAT_TONG_THE_2310.md` mục 7): KTGS Hội thành **tab con của 📊 Số liệu**. TK 2 chỉ sửa `js/23-dieu-huong.js`, giữ lối vào `dhSL('kt')` và tên tab — thanh 3 khối của TK 3 không bị ảnh hưởng.
5. **Khối lọc gọn mặc định** (đề xuất A2): sửa `pvVeCay` (js/22g, dùng chung, KTGS có dùng cây) → TK 2 sẽ báo ở đây trước khi làm và chạy bộ phép thử KTGS.
6. **23/10 tối — TK 2 đã làm (bản 3.328, anh cho làm liên tục, gộp 1 lần):**
   - **Cây địa bàn** (`pvVeCay`, js/22g — dùng chung, có `kt`): mặc định **☰ Gọn 1 dòng mọi nơi** (ô sổ Xã › Điểm › Hội › Tổ), nút `▦ Chip` đổi kiểu; **mở app về Toàn PGD**; **📌 Ghim chung mọi tab** giữ địa bàn + kiểu (`D.cauHinh.pvGhimBat`, `pvChung`, `pvKieu`); thiết lập cũ `pvGhim` / `pvGon` thôi dùng. KTGS không cần sửa gì (vẫn `PV_DUNG.kt`, `ktCH()`).
   - **Phép thử KTGS đã chạy lại** (t106–t137, t150, t154, t236): đạt hết trừ **t110** (hộp chọn khi in Mẫu 06 / 16), **t114** (Mẫu 16 chưa khai ngày) và **t116** — **3 phép này sai y hệt trên `main`** (đã chạy đối chứng), không do cây; nhờ TK 3 xem.
   - **t145 (dải t106–t150 của TK 3) — TK 2 sửa 1 dòng** vì hành vi đã đổi theo ý anh: "phạm vi chung ở `D.cauHinh.pvChung`" → `pvChungO()` (chưa ghim chỉ giữ trong phiên). TK 3 gộp `main` sẽ thấy dòng này.
   - **5 cửa KHO** (`js/29-kho.js`, cuối danh sách): `KHO.chotThang`, `KHO.theoNgay` (= `KHO.ngay` của spec mục 9 — tên theo `KE_HOACH_KHO_KTGS.md`), `KHO.bc37` / `bc38`, `KHO.t105Truoc`, `KHO.monGN` — khớp hàm cũ, không gán `KT_*` (phép thử `t240`). KTGS chưa gọi; sau bàn giao TK 2 thay thân `ktNguon*`.
   - **Thanh bên 2 cấp** (chỉ js/23): KTGS Hội là mục con của 📊 Số liệu, vẫn mở bằng `dhSL('kt')`; điện thoại thanh dưới 5 nút.
