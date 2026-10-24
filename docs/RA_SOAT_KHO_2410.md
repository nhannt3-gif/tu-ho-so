# Rà soát: mọi chỗ đọc số liệu đã qua cửa `KHO` chưa — TK 2, 24/10/2026 (bản 3.340; **kết quả K1–K5 ở mục 4 — bản 3.346**)

> Anh 24/10: "sau mục này rà soát mọi thứ đọc qua kho đã chuyển hết chưa".
> Cách rà: đếm trong từng `js/*.js` (bỏ chú thích) các chỗ đọc thẳng biến kho số liệu (`TO_K`, `SL_DB`, `SL_KHMON`, `SL_PHU`, `SL_TIM`, `SLM.bang`), hàm đọc tầng dưới (`slBo(`, `slDocBang(`, `toNap(`, `tkBang(`) và kỳ riêng của tab (`TC_K`, `KT_K`, `TH_K`, `TT_K`…). Công cụ: `tests/kiem.py` chỉ đếm 4 biến và bỏ qua cả nhóm `22*` → con số 58 của thước đo **thấp hơn thực tế**.

## 1. Kết luận
**Chưa chuyển hết.** Cửa `KHO` (js/29) đã có 46 cửa và các tab Hồ sơ Tổ / Hồ sơ vay / Giao dịch xã / KTGS (phần ktNguon*) / thẻ tổ Tra cứu đã đọc qua `KHO`. Còn đọc thẳng:

| Nhóm | File | Đọc thẳng (ước) | Ghi chú |
|---|---|---|---|
| **Lõi số liệu — được phép** | `22-so-lieu.js` (đọc / nạp file), `28-tv-tk.js` (thành viên, TK), `29-kho.js` (cửa) | — | đây là tầng kho; KHO bọc các hàm ở đây |
| Lõi + giao diện lẫn | `22g-to.js` (dựng kỳ `toNap` + cây địa bàn + tab Tổ) | TO_K 51 | tách phần dựng kỳ khỏi giao diện tab Tổ |
| **Lọt nhỏ ngoài nhóm số liệu** | `12-scan.js` (SL_DB 3, SL_TIM 1) · `41-scan-sap-xep.js` (SLM.bang 2, toNap 1) · `21-ngay-gy.js` (SLM.bang 1) · `23-dieu-huong.js` (SLM.bang 2) · `25-ho-so.js` / `26-giao-dich-xa.js` (`toNap` thay vì `KHO.nap`) | ~15 | có sẵn cửa: `KHO.khach`, `KHO.coDanhBa`, `KHO.tim`, `KHO.coBang`, `KHO.nap` |
| **Tra cứu KH** | `22f-tra-cuu.js` (SL_DB 23, SL_TIM 14, SL_PHU 7, SL_KHMON 3, SLM.bang 45*) · `58-tc-to.js` (TC_K.to 15) | ~100 | *22f còn chứa phần trạng thái Nạp & KT (slTrangThai) — tách khi chuyển |
| **Sao kê · cấp Hội · Tổng hợp · Thông tin tổ** | `22h` (TO_K 42, SLM.bang 11, kỳ riêng 36) · `22i` (SLM.bang 19, TH_K 21) · `22j` (TT_K 15) | ~140 | cần cửa đọc bảng theo kỳ (`KHO.bang(loại, kỳ)`, `KHO.bo(kỳ)`) |
| **KTGS** | `22b–22e`, `56` (KT_K ~100, TO_K 4, SLM.bang 7) | ~110 | theo `BAN_GIAO_KTGS.md`: thay thân `ktNguon*`, không đổi hàm dựng mẫu |
| Hợp lệ (trạng thái tab) | `TO_K = K` sau `KHO.nap`, `PV_DUNG.K` trả kỳ tab, `17`, `36` (kiểm `KT_K` để vẽ lại) | — | thiết kế KHO: "gán kỳ là việc của tab" |

Số đầy đủ theo file: `python3 tools/ra_kho.py` (mục 3 = kết quả lúc rà).

## 2. Đề xuất chuyển theo đợt (mỗi đợt 1 bản, không đổi kết quả hiển thị — so bản in / phép thử cũ)
| Đợt | Việc | Ghi chú |
|---|---|---|
| **K1** | Lọt nhỏ: Scan (12, 41), 21, 23, 25, 26 → cửa có sẵn + thêm `KHO.dsKyHS()` (kỳ có Mẫu 31), `KHO.soBang()`; **sửa thước đo `kiem.py`** đếm đủ biến + mọi file tab (trừ lõi 22-so-lieu / 28 / 29) để thấy tiến độ | trùng mục 8 việc 4 "Scan qua KHO" (anh đã duyệt) |
| K2 | Tra cứu KH (22f, 58): danh bạ / tìm / vợ-chồng-HSSV / món theo khách qua cửa có sẵn (`dsKhach`, `tim`, `hssvPhu`, `monKH`) + cửa nhận kỳ của tab (như `tvChuan(x, K)`) | tách phần Nạp & KT khỏi 22f |
| K3 | Sao kê, cấp Hội, Tổng hợp, Thông tin tổ (22h, 22i, 22j): thêm cửa đọc bảng theo kỳ | lớn nhất — có thể chia 2 bản |
| K4 | KTGS (22b–e, 56) | theo `BAN_GIAO_KTGS.md` mục 5 (giữ phép thử khóa mẫu) |
| K5 | Tách `22g`: dựng kỳ (lõi) ↔ giao diện tab Tổ / cây địa bàn | sau K1–K4 |

## 3. Số đếm theo file (bản 3.340)
```
file | TO_K | SL_DB | SL_KHMON | SL_PHU | SL_TIM | SLM.bang | slBo( | slDocBang( | toNap( | tkBang( | TC_K/KT_K/TH_K… | KHO.
12-scan.js | 0 | 3 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0
17-dong-bo-cai-dat.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 2
21-ngay-gy.js | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0
22-so-lieu.js | 2 | 40 | 0 | 0 | 2 | 56 | 1 | 4 | 1 | 0 | 4 | 0
22b-ktgs.js | 1 | 0 | 0 | 0 | 0 | 5 | 1 | 0 | 0 | 0 | 33 | 4
22c-ktgs-m06.js | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 9 | 2
22d-ktgs-04.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 20 | 0
22e-ktgs-kh.js | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 34 | 1
22f-tra-cuu.js | 2 | 23 | 3 | 7 | 14 | 45 | 4 | 0 | 0 | 1 | 9 | 0
22g-to.js | 51 | 8 | 0 | 0 | 0 | 9 | 3 | 1 | 2 | 0 | 4 | 0
22h-cap-hoi-sao-ke.js | 42 | 7 | 1 | 2 | 1 | 11 | 3 | 1 | 2 | 0 | 36 | 0
22i-tong-hop.js | 1 | 1 | 0 | 1 | 0 | 19 | 1 | 0 | 1 | 0 | 21 | 0
22j-thong-tin-to.js | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 1 | 0 | 15 | 0
23-dieu-huong.js | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0
25-ho-so.js | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 58
26-giao-dich-xa.js | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 36
28-tv-tk.js | 42 | 0 | 0 | 0 | 0 | 7 | 0 | 1 | 0 | 6 | 0 | 0
29-kho.js | 25 | 24 | 2 | 2 | 0 | 6 | 3 | 1 | 1 | 1 | 0 | 0
36-dong-bo-khoi.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0
41-scan-sap-xep.js | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 1 | 0 | 0 | 9
56-ktgs-bo.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0
58-tc-to.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 15 | 4
```

## 4. Kết quả sau K1–K5 (bản 3.341 + 3.346 — anh 24/10: "em làm tiếp theo kh đi và gộp lên rồi làm tiếp ko cần chờ anh")
**Biến kho chung + hàm tầng dưới: đã chuyển hết** — thước đo `kiem.py` "đọc thẳng biến kho" 233 (3.340) → 221 (K1) → 122 (K2) → 67 (K3) → 55 (K4) → 42 (Hồ sơ / GDX) → **0** (K5). Mốc `tests/do_moc.json` `kho_thang` = 0: từ nay tab nào đọc thẳng kho là ⚠ ngay.

| Lõi (được phép đọc thẳng) | Vai trò |
|---|---|
| `22-so-lieu.js` | đọc / nạp file, danh bạ, chỉ mục tìm (`slTimKH`), chỉ mục phụ Mẫu 31 (`slMau31Moi`, `slKhMonNap` — chuyển từ 22h) |
| `22g-to.js` | dựng kỳ (`toNap`, `toTV`, biến động) — K5 tách giao diện ra `22ga-pham-vi.js` (bộ chọn phạm vi dùng chung) + `22gb-to-giao-dien.js` (tab Tổ) |
| `22k-nap-kt.js` (mới) | tab 📥 Nạp & KT = **cửa ghi kho** (nạp / đổi ngày / xóa / làm mới / thay ô / tìm rác) — tách từ 22f + 22i |
| `28-tv-tk.js`, `29-kho.js` | thành viên / TK · cửa KHO |

**Cửa KHO thêm ở 3.346:** `chiMuc`, `phu`, `bo`, `dsToDanhBa`, `bang`, `dsBang`, `docBang`, `kyDung`, `datKy`; cửa kỳ của tab: `toKy`, `dsToKy`, `monKy`, `khdKy`, `saoKeKy`.

**Còn lại (không tính vào thước đo — thiết kế "kỳ là của tab"):** các tab giữ kỳ riêng đã dựng bằng `KHO.nap` (`TC_K`, `KT_K`, `TH_K`, `TT_K`, `SK_K`) và còn đọc sâu bên trong (`K.B.co…`, `K.to`) — chủ yếu KTGS (22b–e ~100, khóa mẫu), Sao kê / cấp Hội (22h 35), Tổng hợp (22i 20), Thông tin tổ (22j 15), thẻ tổ (58 13). Nếu cần làm tiếp (K6): thêm cửa đọc kỳ của tab theo từng nhu cầu như `monKy` / `khdKy`, làm dần khi sửa từng tab — không làm một lượt (rủi ro bản in khóa mẫu).

```
file | TO_K | SL_DB | SL_KHMON | SL_PHU | SL_TIM | SLM.bang | slBo( | slDocBang( | toNap( | tkBang( | TC_K/KT_K/TH_K… | KHO.
17-dong-bo-cai-dat.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 2
22-so-lieu.js | 2 | 40 | 2 | 2 | 5 | 58 | 2 | 4 | 1 | 0 | 4 | 0
22b-ktgs.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 33 | 10
22c-ktgs-m06.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 9 | 3
22d-ktgs-04.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 20 | 0
22e-ktgs-kh.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 34 | 4
22f-tra-cuu.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 45
22g-to.js | 17 | 8 | 0 | 0 | 0 | 8 | 2 | 1 | 1 | 0 | 3 | 0
22ga-pham-vi.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1
22h-cap-hoi-sao-ke.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 35 | 60
22i-tong-hop.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 20 | 7
22j-thong-tin-to.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 15 | 3
22k-nap-kt.js | 1 | 1 | 0 | 1 | 0 | 58 | 3 | 0 | 0 | 0 | 1 | 0
36-dong-bo-khoi.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0
56-ktgs-bo.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 0
58-tc-to.js | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 13 | 9
```
