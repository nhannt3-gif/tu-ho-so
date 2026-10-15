# Kế hoạch — KHAI BÁO RIÊNG từng mẫu Hồ sơ vay (anh chốt 15/10/2026)

> Ý anh (15/10): "Phần khai báo riêng cứ liệt kê từ trên xuống của mẫu, từ dòng Kính gửi, dòng nào em thấy cần cứ cho khai báo hoặc tùy biến, căn cứ kinh nghiệm làm bên tab KTGS; anh sẽ bổ sung thêm nếu thấy thiếu."

## Nguyên tắc (kế thừa 3.206 — ô chấm tùy biến 09A)
- Mỗi ô có công tắc **✍ chấm ghi tay / 🖨 in sẵn**, app nhớ theo mẫu (`hsoLuu().cham[mẫu][ô]`, đồng bộ Drive cùng cài đặt).
- Loại ô: `ngay` (**mặc định ✍ chấm ghi tay; 🖨 chỉ in ngày đã gõ, trống vẫn chấm — anh 15/10: "bấm in ghi ngày hôm nay là chưa đúng ý" · "app cho tất cả mẫu kể cả 09 đã làm, không tự ghi ngày khi anh không gõ vào"**; ngày gõ chỉ giữ trong lần làm) · `kb` (khai 1 lần, app nhớ `hsoLuu().chamGT`; cột 5 `'ct'` = nhớ theo chương trình vay) · `tu` (app tự lấy theo hộ / danh sách / ⚙ Khai báo chung — chỉ có công tắc) · `nhom` (tiêu đề nhóm, theo thứ tự trên mẫu).
- **Không tùy biến:** nhân thân, món vay, tổ, Hội, chương trình, Kính gửi (⚙ Khai báo chung › PGD), số tiền / phương án (gõ ở phiếu hộ).
- **Mặc định mọi ô = ✍ chấm → bản in giống hệt trước** (đã so từng ký tự 01/TD, 03/TD, 01/UQ — có hộ và mẫu trắng). Anh bật 🖨 ô nào thì ô đó in sẵn.
- Thêm ô = thêm 1 dòng `HSO_CHAM[mẫu]` + 1 chỗ dùng trong hàm lập mẫu.

## Đợt 1 — 3.215 (đã làm)
| Mẫu | Nhóm (từ trên xuống) | Ô | Loại |
|---|---|---|---|
| 01/TD | Người vay | Ngày tháng (người vay ký) | ngay |
| | Xác nhận của UBND xã | "Ông/bà …" = họ tên người vay | tu |
| | Phê duyệt của Ngân hàng | 1. Số tiền cho vay + bằng chữ (= đề nghị) | tu |
| | | 2. Lãi suất (%/năm) — **theo chương trình** | kb·ct |
| | | 2. Lãi suất nợ quá hạn (% lãi suất khi cho vay) | kb |
| | | 3. Thời hạn cho vay, kỳ hạn trả nợ (= đề nghị) | tu |
| | | 4. Hạn trả nợ cuối cùng (= đề nghị) | tu |
| | | 5. Lãi trả hàng tháng vào ngày | kb |
| | | Ngày tháng (Giám đốc ký) | ngay |
| 03/TD | Tổ trưởng · UBND | Ngày tháng (cột xác nhận UBND) | ngay |
| | Phê duyệt của Ngân hàng | Cột 7–8: số tiền, thời hạn (= đề nghị của tổ) + dòng Cộng | tu |
| | | Ngày tháng (phần phê duyệt) | ngay |
| | | Số người được vay, tổng số tiền (tự tính theo danh sách) | tu |
| 01/UQ | Mục I | "Ngày … tháng … năm …" lập giấy | ngay |
| | Chữ ký | Chứng kiến của Trưởng thôn — họ tên (⚙ Khai báo chung › Trưởng ấp) | tu |

Ngày họp bình xét 03/TD: giữ ô cũ (`hsoNgayTuy`). 4. Số tiền trả nợ/lần (01/TD): để chấm (cách chia khác nhau theo chương trình — anh chốt nếu muốn tự tính).

## Đợt 2 — đề xuất (chờ anh xem, bổ sung)
| Mẫu | Ô đề xuất | Loại |
|---|---|---|
| 01/TGTV | Địa chỉ thường trú / hiện tại: Tổ dân phố/Thôn, Phường/Xã, Tỉnh (= sổ hộ vay / Mẫu 31) | tu |
| | Số nhà, Đường | kb theo hộ? (đa số nông thôn để trống) |
| | Nghề nghiệp ("Khác — ghi rõ"), Nơi làm việc, Điện thoại nơi làm việc, Email, Mã số thuế | ✍ (🖨 gõ theo hộ) |
| | Mục đích mở TK ("Khác") | kb |
| | Ngày ký người mở TK | ngay |
| | Phần NH (tiếp nhận, số TK tổ viên, hiệu lực, số CIF) | luôn chấm (số CIF đã tự lấy khi có mã KH) |
| 01/TĐCK | Ngày ký khách hàng (đã có) · "kể từ ngày …" phần NH chấp thuận | ngay |
| 01/GQVL · 07b/GQVL | Gom chip / thẻ chương trình (3.211) về cùng khối ô tùy biến cho thống nhất; ngày ký HĐ, ngày ký phương án | ngay |
| 10C · 01/TGTV · Hồ sơ Tổ | Người ký theo vai trò Hội (như KTGS: chọn vai trò → tên đã khai) | tu |

**Logic ngày — anh chốt 15/10:** chỉ áp **Hồ sơ vay** (mọi mẫu, kể cả 09A, 01/TĐCK): mặc định chấm ghi tay, chỉ in ngày anh gõ. **Các mẫu Giao dịch xã giữ như cũ** (Giấy lĩnh mặc định hôm nay / gõ tay / chấm; 04/TD ký hôm nay; Bảng kê chấm).

~~Logic ngày (anh chốt sau):~~ (các hướng cũ, giữ để tham khảo) gợi ý để anh chọn — (A) giữ như hiện nay: chấm, muốn in thì gõ; (B) 1 "ngày lập hồ sơ" chung cho cả bộ, các ô ngày 🖨 dùng ngày đó; (C) ngày theo sự kiện: đơn = ngày họp tổ, 03/TD = ngày họp, phần UBND / NH luôn chấm.

Câu hỏi còn mở (anh trả lời khi rảnh): 01/TD mục 4 "Số tiền trả nợ / lần" có cho app tự chia theo thời hạn / kỳ hạn không? 03/TD "Số người chưa được vay" có cần không?
