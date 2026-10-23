# Kế hoạch gọn tab KTGS Hội — bản 2 (chờ anh duyệt — chưa làm)

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
Bộ: [Hội tự kiểm tra ▾] [+ Tạo bộ] [⧉ Nhân bản] [✎ Đổi tên] [🗑]     Dùng mặc định cho: ☑ Khối A  ☐ Khối B
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
│  Bảng II 14 ô (16) — mỗi ô: ✍ chấm | ☐ trống | 🤖 727 | ⌨ chữ riêng │                        │
│  Nhận xét / tồn tại / kiến nghị  ✍ | 🤖 gợi ý | ⌨ chữ cố định │                               │
│ Chung: in 2 mặt ☑, cỡ chữ …              │ │                                                    │
└──────────────────────────────────────────┘ └────────────────────────────────────────────────────┘
```
- **Mỗi ô trên mẫu = 1 dòng khai báo** với 4 cách: 🤖 tự động (số liệu / khai báo Hội) · ✍ chấm ghi tay · ☐ để trống · ⌨ gõ chữ riêng (nhớ trong bộ). Ô số liệu chỉ 🤖 / ✍.
- **Nhiều bộ khai báo có tên** (vd "Hội tự kiểm tra", "Đoàn NHCSXH đột xuất", "Đoàn huyện") — tạo, nhân bản, đổi tên, xóa; chọn bộ mặc định cho khối A, khối B; khi In vẫn đổi bộ được cho lần in đó.
- Hộp 🖨 Chọn khi in hiện tại → gọn thành: **Bộ khai báo [▾] · ✎ sửa nhanh vài ô hay dùng (Chọn nhanh) · Ngày kiểm tra · In / Word**.

---

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
  macDinh: {A:'b1', B:'b2'},
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

## 6. Các bước
1. **Dữ liệu**: `ktBo` + sổ ô `KT_O` (06, 16) + chuyển dữ liệu cũ + `ktInV` đọc từ bộ (giao diện chưa đổi; in ra trùng 3.325).
2. **Khối A số liệu tháng trước**: ô Tháng kiểm tra; Định kỳ / Sau GN / Mẫu 04 lấy Mẫu 31 chốt tháng trước (màn cũ giữ).
3. **Thanh 3 khối** + chuyển chip cũ vào khối; gộp 2 lối Định kỳ, 2 lối Mẫu 04; Lịch năm thành thẻ trong khối A.
4. **🧩 Bộ khai báo mẫu** (màn khai báo trực quan: danh sách ô + xem trước bấm ô) cho 06, 16; hộp in gọn (chọn bộ + sửa nhanh).
5. Mở rộng sổ ô cho Mẫu 04, 01/KH; dọn khai báo trùng (Ông bà 2 gõ tay, ô cũ).

## 7. Cần anh chốt
1. **Nhiều bộ khai báo có tên** (tạo / nhân bản / chọn mặc định cho khối A, B) — hay chỉ 2 bộ cố định (A, B)? Em đề xuất nhiều bộ.
2. Bảng II Mẫu 16: khai **từng ô** (14 ô, mỗi ô chọn cách + chữ riêng) hay **cả bảng 1 cách**? Em đề xuất từng ô (mặc định cả bảng 1 cách, bấm "chi tiết" mới hiện 14 ô).
3. Sau giải ngân mặc định 1 tháng liền trước, vẫn cho gom nhiều tháng? (em đề xuất: có)
4. Đột xuất có nút Mẫu 04? (em đề xuất: có)
5. Thứ tự 5 bước như mục 6?
6. Ngày chọn ở ô đầu trang **nhớ qua lần mở app** (bỏ luật 3.97 "ngày chỉ giữ trong phiên") — làm ngay trước bước 1? (em đề xuất: có, vì khối A sẽ có ô tháng riêng)
