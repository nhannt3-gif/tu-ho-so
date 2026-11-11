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
Chạy `bash tools/hoiquy.sh 330` trên bản 3.330 (153 phép, xong 24/10): **hoiquy ✓, hoiquy2 ✓, còn lại đạt** trừ: t134 (tên thẻ Định kỳ) + t138 (thứ tự nạp `js/56` trước `js/57`) → **đã sửa ở 3.332, chạy lại đạt**; t151 lỗi trang 1 lần, chạy lại đạt (chập chờn); **t100** (bộ 25.000 hộ — chờ `#tr7 .sl-tt-1` quá 120 giây) và **t158** (tab Tổ: chưa tự thêm cột theo ưu tiên) **sai y hệt trên 3.327 và 3.328** (chạy đối chứng) — không do KTGS, để TK 2 / anh xem.

## 8. Việc TK 2 làm tiếp
1. Cửa `KHO` cho KTGS (spec `docs/KE_HOACH_KTGS_GON.md` mục 9).
2. Thay thân các hàm `ktNguon*` + `veKTGS` qua `KHO`; thước đo "đọc thẳng biến kho" giảm dần.
3. Chạy bộ phép thử mục 5 + hồi quy đủ.

## 9. TK 2 đã làm (24/10, bản 3.333 — anh: "TK 3 đã bàn giao, em tiếp tục toàn bộ app theo kế hoạch")
| Hàm KTGS | Nay đi qua | Ghi chú |
|---|---|---|
| `ktNapBC(ky)` | `KHO.bc37` + `KHO.bc38` | cùng luật `ktChonBC` (t240 so khớp) |
| `ktTruocNap(K)` | `KHO.t105Truoc(K)` | giữ đệm `KT_TRUOC` |
| `ktGNNgayCua(th)` | `KHO.chotThang(th)` | `tam` → ngày mới nhất trong tháng |
| `ktGNNap()` | `KHO.monGN(th)` — **thêm `kh`** (lãi tồn / 105 / QH từng khách, như 3.329) | `KT_GN` giữ nguyên dạng |
| `veKTGS` · `ktKHNapSL` (khối A) | `KHO.nap(ky)` | |
| Còn đọc thẳng (để lại, chỉ đọc): `ktKiemTra` (`slBo` — so bảng thô BC0437 ↔ 0438 ↔ Mẫu 31), `ktDsBC` / `ktChonBC` (hiện chip BC), `toKhach` / `KT_K.to` (đọc kỳ đã dựng) | | |
Phép thử mục 5 chạy lại sau khi đổi; mẫu khóa (t179) không đổi.

## 10. Bản 3.498 (07/11/2026) — 2 mẫu VB 727/HD-NHCS (gói `js/56b-ktgs-727.js`, cắm rút)
- **📄 15/TD Danh sách đối chiếu số dư tiền vay và tiền gửi** (A4 ngang): toàn bộ tổ viên còn nợ / lãi tồn / tiền gửi (`KHO.doiChieu` — QT-22, cùng 02/BG), nợ lãi = lãi tồn, dòng khách + dòng từng món, Tổng cộng.
- **🏛 03/BB-CX Biên bản kiểm tra Hội cấp xã**: mục I tự điền theo Hội – xã của tổ (số tổ, thôn, khách, dư nợ / NQH / khoanh triệu đồng + tỷ lệ, xếp loại tổ theo BC0437); mục III / IV (mẫu gốc ghi IV / V — anh chốt sửa); cán bộ NH khai báo lưu `D.cauHinh.ktIn.kt03`.
- 15/TD (cấp tổ): nút ở khối B (tổ đang chọn) và khối A Định kỳ (tổ đã tích — chạy qua `ktNguonVoi`, số liệu chốt tháng).
- **3.500 (anh 08/11): 03/BB-CX là cấp Hội → khối riêng thứ 4 🏛 Hội cấp xã** trên thanh khối (`che = 'hx'`, `ktKhoi` → 'D', vẽ `kt7HXVe`): bảng Hội – xã theo lọc xã + Hội (số tổ, thôn, khách, dư nợ, NQH, xếp loại BC0437), mỗi Hội 1 nút 03/BB-CX; số liệu Kỳ đầu trang. Bỏ nút 03 ở cấp tổ (khối B, Định kỳ, Mẫu 04).
- Word: khuôn dựng từ mẫu gốc `tests/mau_goc/15td.docx`, `03bbcx.docx` bằng `tools/khuon_727.py` → `js/khuon/kt-khuon-727.js` (nạp khi cần — `kt727Khuon`); `ktDocxLam` gọi `KT_DOCX_THEM[mau]` nếu có (mẫu cũ không đổi). Điền bằng `kt7Dien` (thêm cách khi mẫu gốc để nhãn dính chấm).
- Phép thử: `tests/t383.js` (16 phép, có kiểm XML hợp lệ); t179 (khóa mẫu) không đổi.
- **3.503:** 15/TD, 03/BB-CX chuyển sang khung mẫu in chung `MAU_IN` (js/31b): khuôn `js/khuon/kt727.js` (`MAU_KHUON.kt727`), hộp xem `MAU_IN.hop`, Word `MAU_IN.word` (+ `sau: ktChamMin` — dòng chấm mịn như mọi Word KTGS; thân XML giống hệt 3.502). Bỏ móc `KT_DOCX_THEM` ở `ktDocxLam` (lõi Word KTGS về như trước 3.498).

## 11. Bản 3.513 (11/11/2026) — thống nhất cách lấy số liệu (anh "gom lại không bỏ chức năng")
| Màn / mẫu | Số liệu |
|---|---|
| 🗓 Kế hoạch năm 01/KH · 🗓 Định kỳ 06 + 16 | **như cũ** — ô Tháng kiểm tra, Mẫu 31 chốt cuối tháng liền trước (`ktNguonVoi`) |
| 🎯 1 tổ (Tóm tắt · 06 · 15/TD · 16) · 🏛 Hội cấp xã 03/BB-CX · 📋 Mẫu 04 | Kỳ đầu trang (`KT_K`), Mẫu 31 đúng ngày |
| 📅 Sau giải ngân | tháng của kỳ chọn (kỳ ngày giữa tháng → Mẫu 31 ngày đó, món GN đến ngày đó); ô từ–đến anh đổi được (`KT_GN_KY`) |
| Chấm điểm BC0437 / BC0438 | theo tháng: kỳ là ngày giữa tháng → cuối tháng liền trước (`ktBCKyChon`) |
Bỏ nút lặp: 📋 Mẫu 04 ở hàng 1 tổ; 📋 Tóm tắt + 📄 15/TD ở Định kỳ (hàm giữ). Mỗi màn dòng 📌 Số liệu (`ktSLDong`). Phép thử t389.

## 12. Bản 3.514 (11/11/2026) — 5 nút + 🎯 Kiểm tra tổ nhiều tổ (gói `js/80-ktgs-to.js`, `KTTO`)
```
🛡 KTGS Hội   [🎯 Kiểm tra tổ][📅 Kiểm tra sau 30 ngày][🏛 Kiểm tra Hội][🗓 Kế hoạch năm][⚙ Khai báo]   ‹ Lùi (Esc)
📌 Số liệu: Mẫu 31 kỳ chọn · chấm điểm BC0437 đúng tháng (thiếu → để trống)
```
- `che`: `dx` Kiểm tra tổ (khóa cũ `dk` / `bc` đọc thành `dx`) · `gn` · `hx` · `kh` · `hdt`.
- Kiểm tra tổ: tổ đã tích = `KT_DK_CHON`; hộ từng tổ `KTTO.ho` (= `ktGoiY(t, kiểu, số, null, loc)`); món xét `luat` (GN trước 01/01 năm KT) / `tat`; kiểu `tot` · `xau` · `trung` (% khai báo) · `het`; 1 ô ngày chung (`KT_KB.ngay`); in 06 / 16 qua `KTTO.giaTri` (như `ktDKGiaTri`), 04 `ktBC04` (`KT_BC_XEM.tu = 'to'`), 15/TD `kt7Mo15('to')`, Tóm tắt `ktttInDs`.
- Tương thích: tổ chọn ở cây (`C.to`) → `KT_CHON` = hộ của tổ đó (hàm 1 tổ cũ `ktXuat`, `ktDaChon`, `ktDoiKieu`, `ktGoiYLai` vẫn chạy).
- Khai báo chọn hộ: `D.cauHinh.ktChonHo` (⚙ Khai báo › 🎯 Chọn hộ kiểm tra), theo khóa / nhật ký khai báo Hội (`t:'chonho'`).
- Còn hàm cũ không gọi từ giao diện (giữ cho Kế hoạch in theo tháng / phép thử): `ktDKVe`, `ktBCVe`, `ktChonHTML`, `ktTheHTML`, `ktBangToHTML`, `ktDX04` — dọn ở đợt rà mã sau (cần anh duyệt khi xóa).

## 13. Bản 3.516 (11/11/2026) — Kế hoạch năm theo Mẫu 31 mới nhất + 🔎 Kế hoạch đã lưu (gói `js/80b-ktgs-kh-sl.js`, `KTKH`)
- Màn 🗓 Kế hoạch năm: `ktKHDsTo` đọc `KTKH.Kdung()` = Mẫu 31 mới nhất đã nạp (chốt tháng hoặc ngày); trong `ktKHVoiSL` (In theo tháng / `ktNguonVoi`) cờ `KTKH.muon` → số liệu tháng kiểm tra như cũ.
- Bản chốt không tự sửa khi tổ đổi: tổ đã gộp / đi khỏi chỉ ⚠ (L.mat); tổ mới của ấp có tháng theo ấp (3.140); ấp mới chưa có tháng → ⚠ cần xếp.
- 🔎 `KTKH.hop()` liệt kê `D.cauHinh.ktKH` + `D.rac` (loaiNho 'ktKH'); `KTKH.mo(khóa)` đặt năm / xã / Hội.

## 14. Bản 3.517 (11/11/2026) — Kế hoạch năm lập theo Mẫu 31 đầu năm
- `KTKH.dau(năm)` = chốt 31/12 năm trước (chưa có → tháng chốt gần nhất trước; không có → bản sớm nhất, ⚠); `ktKHDsTo` ← `KTKH.Kdung()`; In theo tháng (`ktKHVoiSL`, cờ `KTKH.muon`) như cũ.
- `KTKH.baoHTML`: so đầu năm ↔ Mẫu 31 mới nhất (`KTKH.kyMoi`) → ⚠ tổ đã gộp / đi khỏi (chỉ cảnh báo), 🆕 tổ mới (tháng của ấp). Cache `KTKH.c[kỳ]`.
