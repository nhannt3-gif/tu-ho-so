# Bàn giao KTGS — TK 3 → TK 2

> Anh Nhân 23/10/2026: "em cứ làm theo kế hoạch, xong bàn giao đầy đủ cho TK 2 làm tiếp". Kế hoạch gốc: `docs/KE_HOACH_KTGS_GON.md` (mục 11 = tiến độ từng bước).
> Từ bản bàn giao này **khóa file KTGS (CLAUDE.md dòng 23/10) được mở** — TK 2 sửa được `js/22b…22e`, `js/56-ktgs-bo.js` và phép thử KTGS, theo các luật dưới đây.

**Trạng thái: ĐÃ BÀN GIAO — 24/10/2026, bản 3.331** (TK 3 xong bước 0–5; hồi quy mục 7).

## 1. Sơ đồ tab KTGS sau tinh chỉnh

```
🛡 KTGS Hội
├─ 📅 Bắt buộc · theo tháng      (khối A — số liệu Mẫu 31 chốt cuối tháng LIỀN TRƯỚC tháng kiểm tra)
│   ├─ 🗓 Định kỳ · Mẫu 06 + 16    ô 📅 Tháng kiểm tra (chung khối A) · tích tổ tự do + nút tích theo Lịch năm
│   ├─ 📅 Sau giải ngân · Mẫu 06   tháng GN từ → đến · 1 tổ × 1 tháng = 1 phiếu · nhắc 30 ngày (727)
│   ├─ 📋 Báo cáo tổng hợp · Mẫu 04 ô 📅 Tháng kiểm tra · theo kế hoạch / tự chọn tổ
│   └─ 🗓 Lịch năm · Kế hoạch 01/KH  lập lịch, in Kế hoạch, in theo tháng (Mẫu 06 / 16 / 04)
├─ 🎯 Đột xuất · theo ngày       (khối B — số liệu Mẫu 31 theo ô Kỳ đầu trang, ngày được nhớ qua lần mở app)
│   └─ chọn tổ → gợi ý hộ → Mẫu 06 · Mẫu 16 · Mẫu 04; dòng 🎯 Khai báo đột xuất (bộ ②)
└─ ⚙ Khai báo                    (khối C)
    ├─ 🏛 Hội – xã (bảng như Excel) · 📖 Chuẩn hóa quy tắc
    └─ 🧩 Bộ khai báo mẫu (① Hội kiểm tra · ② Khai báo khi cần)
```
`D.cauHinh.ktgs.che` vẫn là khóa chế độ (`dk` · `gn` · `bc` · `kh` = khối A; `dx` = khối B; `hdt` = khối C) — dữ liệu cũ đọc được nguyên.

## 2. Ba tầng khai báo

| Tầng | Nội dung | Lưu | Hàm |
|---|---|---|---|
| 1. Đơn vị | Hội – xã: CT, PCT, BTV, HĐUT, KH Hội tỉnh; Chuẩn hóa; ngành kinh tế; thứ tự ấp | `ktHoiKB`, `ktChuan`, `ktPnkt`, `ktApThu`, `ktPC`, `ktKH` | `ktHoiKB`, `ktChuan`, `ktNguoi` |
| 2. Bộ khai báo | ① Hội kiểm tra = `D.cauHinh.ktIn[mẫu]` · ② Khai báo khi cần = `D.cauHinh.ktIn['dx_'+mẫu]` (m06, m16; m04 / kh 1 bộ) | `ktIn` | `KT_BO`, `ktBoDang`, `ktBoKhoa`, `ktInLay`, `ktInV` |
| 3. Lần in | chọn bộ kia cho lần in này, ngày kiểm tra | phiên (`KT_BO_IN`, `KT_KB.ngay`) | `ktInHop(ds, nut, hoi, veThe, ve)` |

Bảng II Mẫu 16: `b2` cả bảng (`''` trống · `cham` · `dien` 727) + `b2o[i] = {c:'trong'|'cham'|'dien'|'go', v}` từng ô → `ktB16Mang(t, v)`.

## 3. Lớp nguồn số liệu `ktNguon*` — CHỖ TK 2 THAY QUA `KHO`

| Hàm (`js/56-ktgs-bo.js`) | Trả về | Bên trong hiện tại |
|---|---|---|
| `ktNguonThangKT()` | tháng kiểm tra khối A (`KT_A_TH` hoặc mặc định theo kỳ đầu trang) | `ktCH().ky`, `kyChungLay()` |
| `ktNguonKy(th)` | `{can, ky}` kỳ Mẫu 31 dùng cho tháng kiểm tra | `ktKHKySL` (đọc `toDsKy`) |
| `ktNguonNap(th)` | Promise — nạp Mẫu 31 + BC0437/0438 + 105 tháng trước | `ktKHNapSL` → `toNap`, `ktNapBC`, `ktTruocNap` |
| `ktNguonSan(th)` | đã nạp xong cho `th` chưa | `KT_KH_SL` |
| `ktNguonVoi(th, fn)` | chạy `fn` với số liệu tháng `th` | `ktKHVoiSL`: tạm đổi `KT_K / TO_K / KT_BC / KT_TRUOC` rồi trả lại |
| `ktNguonVe(o, th, ve)` | vẽ thẻ khối A sau khi nạp | — |

Khối B (đột xuất) dùng `KT_K` = kỳ chung (`veKTGS` → `toNap(C.ky)`). Sau giải ngân: `ktGNNap` đọc `slBo(tháng)` từng tháng GN.

**Ghép với 5 cửa TK 2 đã viết (3.328, `js/29-kho.js`, `docs/KE_HOACH_KHO_KTGS.md`):**
| Thân hàm KTGS cần thay | Cửa KHO | Lưu ý |
|---|---|---|
| `ktKHKySL(th)` (← `ktNguonKy`) | `KHO.chotThang(kyLui(th, -1))` | giữ luật "chưa có tháng đó → tháng gần nhất trước, ghi ⚠" (`S.khong`, `S.ky!==S.can`) |
| `ktKHNapSL(th)` (← `ktNguonNap`) | `KHO.chotThang` + `toNap` / `KHO.nap` + `KHO.bc37/bc38` + `KHO.t105Truoc` | trả `{ky, K, BC:{k37, k38}, TR, th, can, goc}` như cũ — `ktKHVoiSL` dùng `S.K / S.BC / S.TR` |
| `veKTGS` → `toNap(C.ky)` (khối B) | `KHO.theoNgay(kyChungLay())` / `KHO.nap` | `KT_K = TO_K = K` |
| `ktNapBC(ky)` | `KHO.bc37(ky)` / `KHO.bc38(ky)` | dạng `{e, rows, theoTo}` |
| `ktTruocNap(K)` | `KHO.t105Truoc(K)` | giữ cache `KT_TRUOC` |
| `ktGNNap()` (đọc `slBo(tháng)`) | `KHO.monGN(th)` | **3.329 thêm `KT_GN.kh[th][maKH] = {lt, t105, loai}`** (tổng lãi tồn / 105 / QH của khách trong Mẫu 31 tháng GN, mọi món) — cửa `monGN` cần trả thêm phần này hoặc KTGS tự tính từ bảng tháng |
| `ktKiemTra(ky)` (đọc `slBo`, tab con kiểm tra) | `KHO.nap(ky)` | |

**Chỗ còn đọc thẳng biến số liệu (đếm grep 24/10, bản 3.330):**
| File | `KT_K` | `KT_BC` | `KT_TRUOC` | `SLM.` | `toKhach(` | `TO_K` | `slBo(` | `toNap(` |
|---|---|---|---|---|---|---|---|---|
| 22b-ktgs.js | 33 | 17 | 11 | 14 | 5 | 1 | 2 | 1 |
| 22c-ktgs-m06.js | 10 | 0 | 0 | 4 | 0 | 0 | 1 | 0 |
| 22d-ktgs-04.js | 20 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| 22e-ktgs-kh.js | 35 | 5 | 8 | 0 | 0 | 3 | 0 | 1 |
| 56-ktgs-bo.js | 8 | 1 | 1 | 0 | 0 | 1 | 0 | 0 |
`KT_K.to[...]`, `toKhach(t)`, `ktHo(t)` là **đọc kỳ đã dựng** (không cần đổi nếu `KHO.nap` trả đúng dạng); việc chính là 6 chỗ NẠP ở bảng trên.

## 3b. Lối in (đường in chung `ktInMau` KHÔNG làm — giữ hàm cũ đang đúng)
| Khối / thẻ | Mẫu | Hàm (hộp chọn → xem → in) |
|---|---|---|
| B Đột xuất | 06 · 16 · 04 | `ktXuat(mau, cach, ok)` · `ktDX04(ok)` → `ktBCHop` |
| A Định kỳ | 06 + 16 | `ktDKXem(che, ok)` → `ktDKIn(cach, mau)` |
| A Sau giải ngân | 06 | `ktGNXem(ok)` → `ktGNIn(cach)` |
| A Mẫu 04 | 04 | `ktBCXem(ok)` → `ktBCHop` → `ktBCIn(cach)` |
| A Lịch năm | Kế hoạch, 06/16/04 theo tháng | `ktKHXem / ktKHIn`, `ktKHIn06 / ktKHIn16 / ktKHIn04T`, `ktKH04Xem`, `ktKHInCa` |
| C | Mẫu 06 trắng · Phân công BTV | `ktTrang06 / ktTrang06Xuat` · `ktPCHop / ktPCXuat` |
Mọi lối đều qua hộp `ktInHop` (chọn bộ ① / ②) và `ktInV(mẫu)` (giá trị khai báo).

## 4. Không được đổi (khóa mẫu — QUY_CHUAN 1b)
- Hàm dựng mẫu `ktGiaTri06 / ktGiaTri16 / ktBC04 / ktKHGiaTri`, bản In `ktHTML06/16/04/01`, Word `ktDocx` + khuôn `js/khuon/kt-khuon.js`.
- Chuẩn khóa `tests/chuan/kt_*.html` (t179) phải trùng từng ký tự; đổi mẫu chỉ khi anh duyệt.
- KTGS **không** dùng nền ô Hồ sơ vay (`js/31-o-mau.js`).

## 5. Phép thử phải giữ
`t106–t137, t150, t153, t154, t177, t197` (KTGS cũ) · `t179` (chuẩn khóa kt_*) · `t236` (đột xuất, 2 bộ, Bảng II từng ô) · `t237` (khối A tháng kiểm tra, Sau GN 1 tổ × 1 tháng) · `t238` (thanh 3 khối, màn Bộ khai báo, Mẫu 04 đột xuất, tích theo lịch) · `t240` (cửa KHO của TK 2). Đổi `ktgs.che` / nhãn thanh khối → sửa kèm t108, t109, t118, t238.

## 6. Việc chưa làm / để lại (TK 3 quyết, ghi rõ để TK 2 biết)
- Sổ ô `KT_O` đầy đủ (mục 3.1 kế hoạch) — không làm: màn 🧩 Bộ khai báo dùng chung ô của hộp In (`ktInPhan`), 1 nguồn duy nhất, tránh 2 hệ.
- Ô "Ông (bà) 2, gõ tay" Mẫu 06 (`ktKBLuu.cb2/cv2`, Tùy chọn khác) vẫn dùng chung cho 06 / 16 / 04 (làm dự phòng khi không chọn người 2) — chuyển vào bộ sẽ đổi bản in Mẫu 16 / 04 nên giữ.
- `ktInMau` — xem 3b.

## 7. Hồi quy đủ
Chạy `bash tools/hoiquy.sh 330` trên bản 3.330: **hoiquy ✓, hoiquy2 ✓**; dải t1xx–t2xx đang chạy lúc gộp (anh cho gộp trước) — TK 3 ghi tiếp kết quả vào đây / báo anh. Phép thử KTGS riêng (t106–t154, t177, t179, t197, t236–t238, t240) đã đạt trước khi gộp.

## 8. Việc TK 2 làm tiếp
1. Cửa `KHO` cho KTGS (spec `docs/KE_HOACH_KTGS_GON.md` mục 9).
2. Thay thân các hàm `ktNguon*` + `veKTGS` qua `KHO`; thước đo "đọc thẳng biến kho" giảm dần.
3. Chạy bộ phép thử mục 5 + hồi quy đủ.
