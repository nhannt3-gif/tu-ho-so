# Kế hoạch TK 2 — cửa `KHO` cho KTGS (làm song song với TK 3) — ĐÃ LÀM bước 1 (3.327)

> Căn cứ: `KE_HOACH_KTGS_GON.md` mục 9 (TK 3 viết, anh chốt 23/10): TK 2 **làm song song** cửa mới trong `js/29-kho.js` + phép thử của cửa; **không sửa** file KTGS (22b–22e, 22k, 55, 56, t106–t150, t236–t239) cho tới khi TK 3 báo "bàn giao KTGS".
> Người làm: TK 2 (phiên rà soát tổng thể 23/10, nhánh `claude/html-app-review-ck346k`).

## 1. Hiện trạng KTGS lấy số liệu (đếm trên 3.325, chỉ đọc)
| File | `SLM.` | `KT_K` | `TO_K` | `toKhach(` | `slBo(` |
|---|---|---|---|---|---|
| 22b-ktgs | 14 | 33 | 1 | 5 | 2 |
| 22c-ktgs-m06 | 4 | 12 | 1 | 1 | 1 |
| 22d-ktgs-04 | 0 | 20 | 0 | 1 | 0 |
| 22e-ktgs-kh | 0 | 35 | 3 | 0 | 0 |
Hàm nguồn chính: `toNap(ky)` → `KT_K` (kỳ dựng) · `ktNapBC(ky)` (BC0437 / BC0438 cùng tháng hoặc mới nhất) · `ktTruocNap(K)` (số dư 105 tháng trước theo Mẫu 31 chốt) · `ktGNNap()` / `ktGNNgayCua(th)` (món giải ngân theo tháng; tháng chưa chốt → Mẫu 31 ngày cuối của tháng). Kỳ: `'YYYY-MM'` = chốt tháng, `'YYYY-MM-DD'` = theo ngày.

## 2. Cửa mới (chỉ thêm vào `js/29-kho.js`, cuối danh sách, sau `duNoAp` của TK chính) — trả ĐÚNG dạng KTGS đang dùng
| Cửa | Đầu vào → đầu ra | Bọc hàm | Dùng cho |
|---|---|---|---|
| `KHO.chotThang(th)` | `'YYYY-MM'` → `{ky, tam}` — `ky` = `'YYYY-MM'` nếu có Mẫu 31 chốt; chưa chốt → Mẫu 31 ngày mới nhất trong tháng, `tam:true`; không có → `null` | `SLM.bang`, `slCacNgay` | khối A "tháng liền trước" |
| `KHO.theoNgay(iso)` | ngày → kỳ Mẫu 31 đúng ngày, không có thì ngày gần nhất **trước** đó (ghi `lui:true`) | `slCacNgay` | khối B đột xuất |
| `KHO.bc37(ky)` / `KHO.bc38(ky)` | kỳ → `{e, rows, theoTo}` / `{e, rows}` (cùng tháng hoặc mới nhất, như `ktChonBC`) · Promise | `ktChonBC` + `slDocBang` | Mẫu 16, 04 |
| `KHO.t105Truoc(K)` | kỳ đã dựng → `{ky, co, t105:{maKH: số dư}}` · Promise | `ktTruocNap` | gửi tiết kiệm đều |
| `KHO.monGN(th)` | tháng → `{ky, ds:{maTo:{t, mon:[…]}}}` (món giải ngân trong tháng, dạng `KT_GN.ds[th]`) · Promise | phần đọc của `ktGNNap` | Sau giải ngân |
- Bước 1 (C1 như các cửa cũ): **chỉ bọc**, kết quả giống hệt — KTGS chưa gọi cửa (TK 3 đang giữ file). Sau bàn giao TK 3 → TK 2 thay thân `ktNguon*` gọi các cửa này.
- Không đụng `KT_K` / `KT_GN` toàn cục: cửa trả dữ liệu, không gán biến của KTGS.

## 3. Phép thử (dữ liệu giả `tests/gianho31`, số mới trong dải TK phụ)
`t237`?? — **tránh** t236–t239 (TK 3 khóa) → dùng **`t240`**: mỗi cửa so với hàm cũ trên cùng kỳ (chotThang tháng có / chưa chốt, theoNgay lùi ngày, bc37 theoTo khớp `KT_BC`, t105Truoc khớp `KT_TRUOC`, monGN khớp `KT_GN.ds`). Chạy kèm t106 / t150 (KTGS) để chắc không ảnh hưởng.

## 4. Không làm trong đợt này
- Không sửa file KTGS, không đổi giao diện KTGS, không gộp hệ `KT_O` với nền ô Hồ sơ vay (`KE_HOACH_KTGS_GON` 2b ④).
- Thanh bên 2 cấp (KTGS thành tab con Số liệu — `RA_SOAT_TONG_THE_2310.md` mục 7) chỉ sửa `js/23-dieu-huong.js` + giữ lối vào `dhSL('kt')` → không đụng file KTGS; làm sau khi anh duyệt.

## 5. Trạng thái
- ✅ 3.327 bước 1: thêm 5 cửa (`js/29-kho.js`, sau `duNoAp`) + `t240` (so với `ktChonBC`/`ktNapBC`, `ktTruocNap`, `ktGNNap`, `ktGNNgayCua` — khớp; không gán `KT_TRUOC` / `KT_GN`). `theoNgay` trả thêm `ngay` (ngày số liệu; chốt tháng = ngày cuối tháng).
- ☐ bước 2 (sau khi TK 3 báo "bàn giao KTGS"): thay thân `ktNguon*` gọi các cửa này.
