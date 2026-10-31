# Đo tốc độ app — B3 (TK 2, 31/10/2026, bản 3.411.3)

> Anh 31/10 "chốt làm tuần tự" — bước B3 (`BAN_GIAO_TK3_2710.md` mục 7, B1 cũ: "đo trước khi tính lưu tạm"). **Chỉ đo, chưa sửa code.**
> Máy đo: máy chủ đám mây, Chromium không giao diện (máy anh có thể nhanh / chậm hơn — so **tỉ lệ**, không so số tuyệt đối). Dữ liệu GIẢ: `gianho31` (331 món, 60 tổ) và `gia31` (25.031 món, 60 tổ, ≈ cỡ PGD thật).

## 1. Kết quả (mili giây)

| Bước | Bộ nhỏ (331 món) | Bộ lớn (25.031 món) | Nhận xét |
|---|---|---|---|
| Mở app đến sẵn sàng (`xongTV`) | 747 | 591 | Nhanh; không phụ thuộc số liệu |
| Nạp 7 file Excel (đọc + ghi kho) | 1.092 | **17.972** | Chậm nhất — đọc XLSX 25.000 dòng (thư viện SheetJS). Chỉ khi anh nạp file, mỗi kỳ 1 lần |
| Dựng bộ số liệu 1 tháng (`slBo`) lần đầu / lần sau | 21 / 0 | **1.005** / 0 | Lần sau lấy bộ đã giữ — tức thì |
| Dựng cây tổ (`toNap`) lần đầu / lần sau | 21 / 0 | 825 / 0 | |
| Kho chuẩn (`KHO.nap`) khi đã dựng | 3 | 42 | |
| Chuyển tab Tra cứu KH | 10 | 12 | |
| Chuyển tab **Tổ TK&VV** (toàn PGD) | 105 | **2.214** | Chậm nhất khi xem |
| Chuyển tab Sao kê / Tổng hợp / Hôm nay | 27 / 27 / 11 | 27 / 32 / 15 | |

### Tab Tổ TK&VV 2,2 giây — tách ra (bộ lớn)
| Phần | ms |
|---|---|
| Danh sách khách của cả phạm vi (`toTVPV`) | 346 |
| Bảng PGD theo xã · điểm (`toBangPGDHTML`) | 200 |
| **Nạp tháng trước để biết "Ra khỏi tổ"** (`toBDTNap` — đọc Mẫu 31 tháng trước) | **993** |
| Vẽ lại cả màn sau khi có tháng trước (lặp phần 1 + 2) | ≈ 550 |

## 2. Đề xuất (chờ anh duyệt — chưa làm)
1. **T1 — tab Tổ:** chỉ nạp tháng trước khi anh **bấm chip "Ra khỏi tổ"** (hoặc mở biên bản Hồ sơ tổ cần danh sách ra / kết nạp), không nạp ngay khi mở tab → tab Tổ toàn PGD dự kiến **2,2 s → ≈ 0,6 s**. Sau 3.410 (bỏ cột Mới vào / 105 tăng giảm) tháng trước chỉ còn phục vụ chip này + Hồ sơ tổ. Không đổi số, không đổi giao diện.
2. **T2 — nạp file:** 18 s cho bộ 25.000 dòng là do đọc Excel; giữ nguyên (mỗi kỳ 1 lần, có thanh tiến độ). Nếu anh thấy chậm trên máy thật → tính đọc trong luồng nền (Web Worker) — việc lớn, để sau.
3. **T3 — lần mở đầu mỗi phiên:** `slBo` + `toNap` ≈ 1,8 s lần đầu (sau đó tức thì). App đã có "dựng sẵn ngầm" (`slNapSan`) — giữ.

## 3. Cách đo lại
Phép đo (chỉ đọc) ở thư mục nháp của phiên; khi cần đưa vào `tools/` thì anh duyệt. Mỗi lần tối ưu: đo trước / sau cùng máy.

## 4. Đã làm
- **3.413 R1 (= T1)** — anh 31/10 "code theo em đề xuất": tab Tổ cấp phạm vi không nạp tháng trước khi mở; chip Ra khỏi tổ hiện "…", bấm mới nạp. Đo lại: tab Tổ toàn PGD (bộ lớn) **2.214 ms → 684 ms**.
- **R2 (đo một lần thay vì thêm từng cột — `toCotVua`) — thử chia đôi, đo lại CHẬM HƠN (58 → 110 ms: bật / tắt nhiều cột cùng lúc trên 255 dòng) → bỏ, giữ cách cũ.**
- Thử CSS `contain` cho khung bảng khi đổi khung cửa sổ: không đỡ → không làm.

- **3.422 (31/10)** — mở lại app (bộ lớn 25.000 món): bảng Mẫu 31 / danh bạ / sổ nạp bị đọc + dựng 2 lần (dựng sẵn ngầm + tab cùng gọi) → dùng chung khi đang chạy; `slStk` nhớ theo chuỗi. Tổng đứng máy: Tra cứu 2,4 → 1,2 s · Tổ 3,0 → 1,4 s · Tổng hợp 1,7 → 1,0 s · Sao kê 2,1 → 0,9 s. Nhớ `toKhach` theo kỳ: bỏ (t114 — đổi dữ liệu cùng kỳ phải tính lại).
