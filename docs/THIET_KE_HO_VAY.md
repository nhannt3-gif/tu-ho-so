# Thiết kế dữ liệu "Hộ vay" — ghép Mẫu 31 + Sao kê TK 105 + Tổ (bản nháp chờ file mẫu)

> Anh 26/10: "nên có 1 data dựng sẵn từ kết hợp Mẫu 31, TK 105 và tổ"; "tiền KH chuyển vào là tính được chính xác… 1 cột số tiền KH đã CK vào riêng… cột CK trả lãi và gốc để biết tổ đã CK bao nhiêu từ 105 qua trả lãi và gốc";
> "nếu tách được thu qua 105 và thu qua tiền mặt thì tốt… ký hiệu theo dõi"; "em cứ coi cấu trúc file và thiết kế data, anh sẽ gửi Mẫu 31 và Sao kê TK 105 cùng ngày".
> Tên cột: `docs/COT_FILE_MAU.md`. Chưa code — chờ anh gửi 2 file cùng ngày để chốt khóa nối + cách tách tiền mặt, rồi anh duyệt → "code".

## 1. Nguồn và cột dùng

| Nguồn | Cột (tên gốc) | Trường app | Ghi chú |
|---|---|---|---|
| Mẫu 31 (ngày chọn) | Mã KH · Tên KH · Mã tổ · Tên thôn · Tên xã | `kh` `ten` `to` `tenThon` `tenXa` | 1 dòng = 1 món |
| | Số khế ước · Mã chương trình · Tổng dư nợ · Dư nợ quá hạn · Dư nợ khoanh | `ku` `ct` `dn` `qh` `kn` | |
| | Lãi DT trong tháng | `c_lai_dt_trong_thang` | lãi phải thu tháng |
| | Thu lãi TH tháng · Thu lãi QH Tháng | `c_thu_lai_th_thang` · `c_thu_lai_qh_thang` | thực thu (= Lãi TT trong tháng) |
| | Thu nợ TH / QH / khoanh tháng | `tnTH` `tnQH` `tnK` | trả gốc trong tháng |
| | Lãi tồn TH · Lãi tồn QH | `ltTH` `ltQH` | |
| | Ngày giao dịch gần nhất | `ngdg` | ngày tổ trưởng nhập thu |
| | Sổ tiết kiệm 105 · Số dư tiền gửi 105 | `stk` · `t105` | số TK hệ thống 13–14 ký tự; số dư LẶP LẠI ở mỗi món của cùng khách → lấy 1 lần / khách (không cộng) |
| Sao kê TK 105 (cùng ngày) | Mã khách hàng · Tài khoản · Số Dư Ngày báo cáo · **Số dư tháng trước** · Ngày đăng ký · Ngày BC | `kh` `stk` `t105` `t105d` `ndk` `nbc` | 1 dòng = 1 tài khoản; khách có thể nhiều TK 105 |
| Tổ (cây tổ / DSTO) | Mã tổ · tên · tổ trưởng · Hội · điểm GD (mã TXN) · ngày GD | `KHO.to(ma)` | |

## 2. Bảng dựng sẵn `KHO.hoVay(maTo)` — 1 dòng / khách vay

```
{ kh, ten, to, ap,
  mon:[{ku, ct, dn, laiDT, thuLai, thuGoc, ngdg}],          // từng món (Mẫu 31)
  dn, ctGhi,                                                 // tổng dư nợ; "HN 30 + GQVL 50" khi ≥ 2 chương trình
  laiDT, thuLai:{th, qh}, thuGoc:{th, qh, kn}, ngayGD,       // cộng các món; ngày GD gần nhất
  tk:{ds:[stk…], dau, cuoi, nguon},                          // TK 105: số dư cuối tháng trước (dau) · đến ngày chọn (cuoi)
  tinh:{tangGiam, traLai, traGoc, ckVao, kyHieu} }           // tính sẵn (mục 3)
```
- Nối Mẫu 31 ↔ Sao kê TK 105 theo **Mã KH** (cả 2 file đều có). Số TK: chờ file để xem Sao kê ghi 10 số hay 13–14 số như Mẫu 31.
- `dau` = Sao kê "Số dư tháng trước" (cùng ngày nên không cần Mẫu 31 tháng trước); thiếu Sao kê → Mẫu 31 chốt tháng trước; thiếu cả 2 → trống + lý do.
- `cuoi` = Sao kê "Số Dư Ngày báo cáo"; thiếu → Mẫu 31 "Số dư tiền gửi 105".
- Dựng 1 lần / kỳ, nhớ tạm; đổi kỳ / nạp file mới thì dựng lại. Chỉ đọc, không ghi dữ liệu.

## 3. Công thức (chốt với anh)
- Tăng / giảm 105 = `cuoi − dau`
- Trích 105 trả lãi = Thu lãi TH tháng + Thu lãi QH Tháng
- Trích 105 trả gốc = Thu nợ TH + QH + khoanh tháng
- **Khách chuyển vào 105 = Tăng / giảm + Trả lãi + Trả gốc** (giả định trả qua 105 — mục 4)

## 4. Thu qua 105 hay tiền mặt — đã kiểm Mẫu 31 thật 19/10
- `Tài khoản thu lãi` / `TH` / `QH` / `khoanh` là **tài khoản hạch toán** (702x/714x, 212x…), không phải TK 105 → Mẫu 31 KHÔNG tách được.
- Hướng khi có Sao kê cùng ngày: ký hiệu suy ra — **🏦** khớp (số dư đầu + khách vào đủ trừ khoản trả) · **💵?** có thể tiền mặt (khách vào tính ra âm, hoặc không có TK 105 mà vẫn có thu) · **⚠** lệch khác.
- Tách CHÍNH XÁC cần sao kê giao dịch chi tiết TK 105 (từng lần nộp / rút) — hỏi anh hệ thống có xuất được không.

## 5. Dùng ở đâu
1. Báo cáo **Sao kê biến động TK 105 và thu lãi, gốc** (theo tổ; cột: STT, mã KH, họ tên, dư nợ + ghi chú CT, số TK 105, số dư cuối tháng trước, **khách chuyển vào**, tăng / giảm, số dư đến ngày, **trả lãi**, **trả gốc**, lãi phải thu, ngày GD, ký hiệu) + dòng cộng tổ.
2. Sau (anh duyệt từng việc): 📋 Tóm tắt tổ KTGS, Giao dịch xã, Tra cứu khách đọc chung bảng này.

## 6. Chờ file anh gửi (Mẫu 31 + Sao kê TK 105 cùng ngày) để chốt
- [ ] Số TK trong Sao kê: 10 số hay 13–14 số; khớp với Mẫu 31 không.
- [ ] Khách nhiều TK 105: cộng hết hay chỉ TK chính.
- [ ] "Số dư tháng trước" của Sao kê = số dư cuối tháng trước thật (so với Mẫu 31 chốt 30/09 đã có).
- [ ] Thử công thức "khách chuyển vào" trên vài tổ: tỷ lệ khách ra âm (dấu hiệu tiền mặt).
