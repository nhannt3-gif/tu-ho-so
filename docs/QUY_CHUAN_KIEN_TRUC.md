# QUY CHUẨN KIẾN TRÚC — luật áp dụng cho MỌI thay đổi (bản nháp 14/10/2026, chờ anh Nhân duyệt)

> **Kế thừa, không thay thế** `docs/KIEN_TRUC_3_LOP.md` (gọi tắt **KT3L**): giữ nguyên các quyết định **Q1–Q17**, kiến trúc **4 tầng** (KT3L mục 2), tên cửa **`KHO1` · `KHO` · `CHUAN`**, **`DANG_KY`** (KT3L mục 5), **phép tính chung** (KT3L mục 3.5) và **lộ trình đợt A–J** (KT3L mục 8).
> File này bổ sung phần còn thiếu để **không lệch hướng khi app lớn nhanh**: cách phân **chung / riêng**, **sổ quy tắc nghiệp vụ**, **cá nhân hóa của khối**, **checklist mỗi PR**, **chỉ số đo lệch**.
> Liên quan: `docs/QUY_TAC_SOAN_MAU.md` (soạn mẫu in Giao dịch xã), `docs/KE_HOACH_GON_GIAO_DIEN.md` (In / Xuất / Gửi / Xóa chung). Không chứa dữ liệu thật.

---

## 0. Anh chốt
- **Đã chốt trước** (KT3L mục 0): **Q2** mô hình lớp riêng biệt — sửa 1 tính năng không ảnh hưởng tính năng khác · **Q3** hồ sơ chi tiết là nguồn chính, file khác để đối chiếu · **Q4** cây địa bàn gắn hồ sơ chi tiết theo kỳ · **Q6** lớp chung: cây địa bàn, cây nghiệp vụ, chế độ xem, lưu, xóa, sao lưu — mẫu / nghiệp vụ mới = thêm 1 tab con hoặc 1 nút · **Q8** tách file · **Q16–Q17** vai trò từng file.
- **14/10/2026 (bổ sung 2):** khi anh mô tả chức năng / mẫu biểu mới → **em tư vấn đặt vào tab nào, lấy số liệu từ đâu** trước khi làm; các tab chia **theo nhu cầu giao diện** nhưng **gắn chặt nhau về số liệu** → xử lý gắn kết ở kho chung, không ở giữa các tab; **KTGS là phần tương đối hoàn chỉnh, độc lập**, dùng để kiểm tra, **không so số liệu theo ngày** → **đóng gói riêng**, không để thay đổi nơi khác làm sai lệch.
- **14/10/2026 (bổ sung):** app phát triển nhanh theo nhu cầu thực tế nên dễ lệch hướng → **ưu tiên bền vững**; **tách biệt Dữ liệu – Nghiệp vụ – Giao diện**; **chia rõ cái lấy từ kho chung và cái cá nhân hóa của từng chức năng**; **nhiều nơi gọi + có quy tắc rõ → đưa vào chung**.

---

## 1. Ba phần anh nói ↔ 4 tầng KT3L (cùng một kiến trúc, không thêm tầng mới)

| Anh gọi | Tầng KT3L | Gồm | Cửa |
|---|---|---|---|
| **DỮ LIỆU** | Lớp 1 Lưu trữ + Lớp 2 bảng chuẩn (KT3L 3.1–3.4, 6) | lưu máy / Drive / máy chủ, đồng bộ, sao lưu; bảng chuẩn theo kỳ, từ điển cột, cây địa bàn theo kỳ, đối chiếu file khác | `KHO1`, `KHO` |
| **NGHIỆP VỤ chung** | Lớp 2 · **phép tính chung** (KT3L 3.5) | mọi quy tắc anh chốt dùng nhiều nơi — ghi ở **sổ QT** (mục 4 dưới) | `KHO` |
| **NGHIỆP VỤ riêng** | trong khối Lớp 3 | quy tắc chỉ 1 khối dùng (chọn hộ Mẫu 06, chia mệnh giá Bảng kê…) | — (nội bộ khối) |
| **GIAO DIỆN** | Lớp chung (KT3L 4) + khối Lớp 3 (KT3L 5) | bộ chọn kỳ / phạm vi, chip, bảng, In / Excel / Word / PDF, xóa; màn hình từng khối | `CHUAN`, `DANG_KY` |

**Luật phụ thuộc** giữ nguyên KT3L mục 2 (chỉ gọi xuống qua cửa; khối không gọi nhau, không đọc biến toàn cục của nhau; tiền tố riêng; phép thử riêng). **Nhấn mạnh thêm:**
1. **Không chép mã quy tắc** sang khối khác — cần chép = dấu hiệu phải đưa vào phép tính chung.
2. **Giao diện không tự tính số nghiệp vụ** (tổ viên, dư nợ, nợ cần xử lý…) — chỉ hiện kết quả lấy từ `KHO`.
3. Phần **dữ liệu** không chứa HTML / chữ hiển thị; phần **nghiệp vụ** không vẽ, không đọc ô nhập trên màn hình.

---

## 1a. Tab = cách nhìn, số liệu = một kho (mới, 14/10)
- Tab / tab con chia **theo nhu cầu giao diện** (người dùng làm việc gì ở đâu) — **không** phải ranh giới số liệu. Nhiều tab cùng dùng tổ, khách, món vay, TK 105… → các thứ đó **chỉ nằm ở `KHO`**, tab nào cũng hỏi `KHO`, **không tab nào "sở hữu" số liệu dùng chung** và không lấy số từ tab khác.
- Hệ quả: đổi / thêm / bỏ một tab **không đụng** số liệu; sửa một quy tắc ở `KHO` thì **mọi tab đổi theo cùng lúc** (đúng QT, giống nhau mọi nơi) → phải hồi quy các tab dùng quy tắc đó.
- **Tư vấn đặt chỗ (bước 0 của checklist mục 6):** mỗi yêu cầu chức năng / mẫu biểu mới, em trả lời trước khi làm: ① đặt ở **tab / tab con nào** (theo việc anh làm ở đâu) · ② **số liệu lấy từ `KHO`** (cái gì đã có, cái gì phải thêm vào chung) · ③ phần **riêng** của khối (trình bày, khai báo) · ④ quy tắc mới cần anh chốt (QT) · ⑤ ảnh hưởng tới tab khác.

## 1b. KTGS — gói độc lập (mới, 14/10)
- **KTGS** (Mẫu 06 / 16 / 04, Kế hoạch, Phân công BTV, Khai báo Hội cho KTGS, BC0437 / BC0438) là **phần tương đối hoàn chỉnh, độc lập**, dùng để **kiểm tra là chính**, **không so số liệu theo ngày** → **đóng gói riêng**:
  1. **Mã riêng** (tiền tố `kt…`, file riêng khi tách `22-so-lieu.js` — làm **đầu tiên**, cơ học, không đổi logic) + **bộ phép thử riêng** (t106, t108–t122, t129, t132, t134, t137…).
  2. **(Anh sửa 23/10/2026)** Số liệu KTGS: **kiểm tra bắt buộc** (định kỳ theo kế hoạch, sau giải ngân, Mẫu 04) = **Mẫu 31 chốt cuối tháng liền trước** + BC0437 / BC0438 tháng đó; **kiểm tra đột xuất** = **Mẫu 31 theo ngày chọn** ở ô đầu trang (chấm điểm, xếp loại vẫn theo tháng BC0437). Kế hoạch gọn KTGS: `KE_HOACH_KTGS_GON.md`. Câu cũ dưới đây giữ để đối chiếu:
     ~~Số liệu vào qua 1 cửa hẹp, theo kỳ THÁNG:~~ KTGS chỉ nhận **ảnh chụp cuối tháng** (Mẫu 31 / Mẫu 18 cuối tháng — như In theo tháng 3.141 tự lấy cuối tháng trước) + **BC0437 / BC0438 của riêng KTGS** (QT-08). Số liệu theo ngày của các tab khác **không chảy vào** KTGS.
  3. **Không phá cấu trúc:** các đợt dọn kiến trúc (mục 8) **không viết lại bên trong KTGS**; chỉ đặt **bộ chuyển** trả đúng dữ liệu như KTGS đang dùng. Đổi quy tắc chung (QT) có ảnh hưởng KTGS → **chạy riêng bộ phép thử KTGS** và báo anh trước khi gộp.
  0. **Tên gọi phân biệt (anh chốt 14/10):** mẫu thuộc KTGS luôn gọi kèm chữ **"KTGS"** — *Mẫu 06 KTGS*, *Mẫu 16 KTGS*, *Mẫu 04 KTGS*, *Kế hoạch KTGS*… — trong tài liệu, kế hoạch, PR, phép thử (và trên giao diện khi anh duyệt đổi nhãn). Quy tắc chung: **mẫu trùng số / trùng tên ở nhiều khối phải ghi kèm tên khối** (vd Mẫu 06 KTGS ≠ mẫu 06 trong bộ hồ sơ vay / Mẫu 06/A vay trực tiếp) để không sửa nhầm.
  4. Dùng chung với nơi khác **chỉ**: cây địa bàn, khai báo Hội + Chuẩn hóa, xuất In / Word / PDF — qua cửa chung.
  5. **Mẫu biểu KTGS đã chốt — khóa** (**Mẫu 06 KTGS**, **Mẫu 06 trắng KTGS**, **Mẫu 16 KTGS**, **Mẫu 04 KTGS**, **Kế hoạch KTGS** ① ②, **Thông báo phân công BTV KTGS**): khuôn Word (`KT_KHUON`), CSS in (`KT_IN_CSS`…), hàm dựng mẫu `kt…` **thuộc riêng KTGS**. Sửa mẫu ở nơi khác (Giao dịch xã, Hồ sơ, báo cáo…) **không được đụng** tới các phần này. Bộ in chung (`inChuan`, xuất Word / PDF) mà KTGS đang dùng nếu phải sửa → **giữ nguyên kết quả in KTGS** (so bản in / Word KTGS trước – sau bằng phép thử) và **hỏi kỹ anh trước**. Muốn sửa chính mẫu KTGS → **chỉ khi anh yêu cầu rõ**, nói trước phạm vi, anh duyệt.

---

## 2. Chung hay riêng — tiêu chí (mới)

| Đưa vào **CHUNG** (`KHO` phép tính chung / `CHUAN`) khi **đủ cả 3** | Để **RIÊNG** của khối khi |
|---|---|
| ① **≥ 2 nơi** dùng (hoặc chắc chắn sẽ dùng) | Chỉ 1 khối dùng |
| ② Có **quy tắc rõ, anh đã chốt** (ghi số QT, mục 4) | Là cách **trình bày**: cột, thứ tự, chữ, màu, khổ giấy, mẫu in |
| ③ Kết quả **phải giống nhau mọi nơi** (vd số tổ viên tab Tổ = Hồ sơ Tổ = KTGS = Giao dịch xã) | Là **khai báo / lựa chọn riêng** của chức năng (logo Bảng kê, khổ Giấy lĩnh, người ký Mẫu 06…) |

**Vòng đời:** quy tắc mới viết **trong khối**, đánh dấu `/* ứng viên chung */` → khi **nơi thứ 2** cần → **chuyển xuống phép tính chung** (không chép), khối cũ đổi sang gọi `KHO`, hồi quy cả 2 khối, ghi QT.

**Phân loại hiện tại** (bổ sung danh sách KT3L 3.5 / 3.6 / 4 theo các chức năng mới 3.142–3.194):

| CHUNG | RIÊNG của khối |
|---|---|
| Kỳ & ngày số liệu, danh sách kỳ, nguồn từng bảng (KT3L 3.1) | **KTGS:** chọn hộ Mẫu 06, lịch Kế hoạch, Mẫu 04 / 16, phân công BTV, nhật ký |
| Cây địa bàn theo kỳ: xã · điểm GD · ấp · tổ · Hội (KT3L 3.4) | **Giao dịch xã:** Giấy lĩnh, Bảng kê, 04/TD, 12/GDX, mini app |
| Tổ: tổ trưởng / tổ phó, điểm GD, Hội | **Hồ sơ Tổ / Hồ sơ vay:** ô mẫu, cách điền |
| Khách + món vay (`KHO.khach`, `KHO.monTrong`) | **Sao kê, Tổng hợp:** bố cục báo cáo |
| **Tổ viên, vào / ra / chuyển tổ** (`bienDongTo`, QT-01…07) | **Scan, Văn bản, Biểu mẫu, Hôm nay** |
| TK 105 (`tk105`), TK 104, tra theo CCCD | Cấu hình hiển thị từng tab (cột, ngưỡng, chip đang bật) |
| Nợ cần xử lý: quá hạn, khoanh, KHĐ, đến hạn, KU hủy / chưa GN | |
| CCCD hết / sắp hết hạn, nơi cấp theo ngày cấp | |
| Khai báo Hội + bảng Chuẩn hóa (KTGS, Hồ sơ, Giao dịch xã cùng dùng) | |
| Định dạng: tiền 2 số lẻ, ngày, số thành chữ, tên không dấu, tên file theo cây | |
| In / Excel / Word / PDF, xóa → thùng rác, sao lưu (KT3L 4) | |

---

## 3. Cửa = hợp đồng (bổ sung KT3L 3.6)
- Mỗi hàm trên cửa ghi ngay trên hàm: **đầu vào, đầu ra (tên trường chuẩn KT3L 3.1), đơn vị (đồng / triệu), quy tắc nguồn (số QT)**.
- **Đổi hợp đồng** (bỏ / đổi nghĩa trường) = thay đổi lớn → **anh duyệt** + hồi quy **mọi khối dùng cửa**. Thêm trường mới không phá trường cũ thì được.
- Mỗi cửa có **phép thử riêng** (dữ liệu giả `tests/gia31`) — đổi quy tắc là phép thử báo ngay.

---

## 4. Sổ quy tắc nghiệp vụ (QT) — một nơi duy nhất (mới)
Mỗi quy tắc anh chốt: **số · nội dung · bản / ngày chốt · căn cứ**; mã thực hiện ở **1 hàm** phép tính chung, chú thích ghi số QT. Sửa quy tắc = sửa hàm đó + dòng này.

| Số | Quy tắc | Chốt | Căn cứ |
|---|---|---|---|
| QT-01 | Mẫu 31: mỗi dòng 1 món; **Mã tổ = tổ lúc vay**; Mẫu 31 chứa **toàn bộ món tất nợ trong năm** | 3.138.1 · 14/10 | anh xác nhận |
| QT-02 | Khách còn món vay ở tổ T → tổ viên T | 3.138.1 | |
| QT-03 | Chỉ còn món đã tất nợ: TK 105 **còn mã tổ** → còn trong tổ; TK 105 **Mã tổ 0 / đã đóng** → đã ra | 3.138.1 · kiểm 1 tổ thật 14/10 | file 07/10, 11/10 |
| QT-04 | Món mới ở tổ B, món cũ đã đóng ở tổ A → chỉ tính tổ B | 3.193 | Mẫu 31 đến 11/10 |
| QT-05 | KU hủy (CLOSE + giải ngân 0) bỏ; KU chưa giải ngân (OPEN, GN 0, DN 0) không tính tất nợ | 3.138 | |
| QT-06 | Khách **TK 105 số dư 0, không món vay trong năm** không có trong Mẫu 31 / Mẫu 18 → app **không tự biết**; tổ trưởng / tổ phó không có trong số liệu → **cảnh báo** ở Cần xử lý | 14/10 | 1 tổ phó (tổ thật) |
| QT-07 | So **Mẫu 31 + Mẫu 18 qua các kỳ** (2026 đủ số liệu); kỳ trước có, kỳ này mất cả 2 file → "Không còn trong số liệu" + trạng thái lần cuối | 14/10 | |
| QT-08 | **BC0437 / BC0438 chỉ dùng cho KTGS**, không đối chiếu tổ viên | 14/10 | |
| QT-09 | LEN_31 TO_TRUONG "Số hộ" ≈ hộ có món còn mở + khách chỉ có TK 105 (số dư > 0, không món trong năm) — khớp 283 / 367 tổ (30/09), lệch ±1–2 còn lại → **đang bàn**, chưa đưa vào app | 14/10 | file 30/09 |
| QT-10 | Tiền trên mẫu in 2 số lẻ (nợ lãi < 5.000 đ giữ 3 số lẻ) | 3.140.1 | |
| QT-11 | **TK 105 của khách** — số **10 số theo Sao kê TK 105** (Mẫu 31 không có số 10 số); tra **khi chọn khách** (không dựng sẵn — ít dùng, ~21.000 KH); kỳ chưa có Sao kê mới → **bản gần nhất** (thiếu TK mới mở → báo, gõ tay). Khách ≥ 2 TK → **cảnh báo, anh chọn TK đang dùng** (nhớ theo mã KH), danh sách ⚠ TK trùng để đóng TK thừa. In **số TK**, **số tiền gõ tay**, gợi ý số dư theo Mẫu 31 mới nhất. Mẫu 18 = file đối chiếu của Mẫu 31, **không lấy TK** | 3.185 · **chuẩn lại 14/10 (3.202)** | file thật 30/09, 13/10 |
| QT-12 | **TK 104 của tổ** — **Danh sách tổ hệ thống (baocao_…, có Ngày báo cáo) là nguồn thống nhất** (anh chốt 14/10, bản 3.202): cột TK104 theo tổ, ghép Mẫu 31 qua **Mã CIF TT** = MATT; kỳ nào cũng dùng **bản Danh sách tổ gần nhất**. **Sao kê TK 104 chỉ để tham khảo**: báo **TK 104 chưa đóng** (chủ TK không còn là tổ trưởng / tổ trưởng còn TK khác TK trên Danh sách tổ); chưa có Danh sách tổ thì mới lấy TK theo Sao kê. Danh sách tổ ghi tổ trưởng khác Mã CIF TT → báo lệch, không đoán. Danh mục tổ: bỏ hẳn. |
| QT-13 | **CCCD, ngày cấp, nơi cấp** (1 hàm `cccdCua`) — **tổ trưởng: Danh sách tổ hệ thống trước** (CMT, NGAYCAP, NGAYSINHTT; anh chốt 14/10, bản 3.202) → Mẫu 31 → Mẫu 01/TV → Thông tin tổ trưởng (cũ) → **số anh gõ** (nhớ theo mã KH); **khách: Mẫu 31 mọi dòng / các kỳ → Mẫu 01/TV → số anh gõ**; nơi cấp tự tính theo ngày cấp; **CCCD hết / sắp hết hạn → cảnh báo**. Danh sách tổ hệ thống **thay DSTO cũ và Thông tin tổ trưởng** (file cũ vẫn đọc được để tra tháng cũ). |
| QT-14 | **Mẫu 01/TV** = danh sách thành viên tổ chuẩn của TƯ, **chỉ kỳ tháng**. **Cần cho ra khỏi tổ** = TƯ còn giữ + dư nợ 0 + tiền gửi 0 + **không còn lãi tồn** (còn lãi tồn = chưa tất nợ — cột Dư nợ 01/TV là gốc). Khách ở ≥ 2 tổ → cho ra ở tổ không còn dư nợ / tiền gửi. Tổ không còn thành viên (mọi món tất nợ, không có trong 01/TV) → không tính thiếu dữ liệu | **anh chốt / giao 14/10 (3.201–3.202)** | app 18.648 / 18.648 khớp 01/TV (30/09) |
| QT-15 | **Phân bổ 1 QĐ xuống ấp — theo TỪNG QĐ** (`js/47-phan-bo.js`, `pbPhanBo`): dòng có Tăng/giảm ≠ 0 → phân bổ số đó; giao mới thật (loại "Giao mới", Đã giao trống/0) → phân bổ Đến 31/12; còn lại bỏ qua. **Tương đối:** chia đều chẵn 100, ≤ 10 ấp, chỉ tiêu trước = Đã giao chia đều chẵn 100. **Chính xác:** kỳ Mẫu 31 cuối tháng gần nhất ≤ ngày QĐ (`KHO.duNoAp`); tăng/giảm theo tỷ lệ dư nợ ấp (cùng CT + nguồn) chẵn 50, phần dư lớn nhất; **chỉ tiêu trước = ĐÚNG dư nợ thật, phần chênh (Đã giao − tổng dư nợ) dồn ấp dư nợ lớn nhất**; dư nợ không gắn được ấp → "(Chưa rõ ấp)" + cảnh báo; CT không dư nợ → chia đều + cảnh báo. **Số giao chẵn, chỉ 1 ấp lẻ**; giảm không làm âm ấp (dồn theo bước). Bước / số ấp khai báo được | **anh chốt 20/10/2026** (P1) | bản WPF v9.20 — 45 QĐ thật, khớp 100 % 2.229 dòng ấp với lõi JS |
| QT-16 | **Biểu 07 BẮT BUỘC khớp QĐ** (`pbKiem`): Σ tăng/giảm ấp = số QĐ · Σ chỉ tiêu trước = Đã giao · Σ chỉ tiêu năm = Đến 31/12 · QĐ tự đúng Đã giao + Tăng/giảm = Đến 31/12 → sai thì **chặn In / Xuất**; Biểu 07 chỉ in ấp có tăng/giảm; không lưu lịch sử Biểu 07 | **anh chốt 20/10/2026** | |
| QT-17 | **Nhập QĐ:** 1 QĐ (số + ngày + ký hiệu) nhiều xã, nhập trước vài xã rồi thêm sau; **gợi ý Đã giao** = Đến 31/12 QĐ gần nhất trước (cùng xã + CT + nguồn, cùng năm; chưa có → dư nợ 31/12 năm trước) — chỉ gợi ý, sửa được; cảnh báo ✗ lệch số, ⚠ đứt chuỗi. **Chỉ tiêu đầu năm theo QĐ** = Đã giao của QĐ đầu tiên trong năm nhắc tới CT (`pbTongHopCT`) | **anh chốt 20/10/2026** | |
| QT-18 | **Thành viên tổ chuẩn** (1 hàm `tvChuan` js/28 → cửa `KHO.tvChuan`, gom QT-01…07 + QT-14): **Tổng TV** = tổ viên Mẫu 31 kỳ đang dựng (chốt tháng hoặc ngày; QT-01…05, mỗi mã KH 1 lần / tổ, bỏ vay trực tiếp; khách **chưa giải ngân vẫn tính** như TƯ — file thật T9: 21 / 21 khách chưa giải ngân có trong 01/TV, kể cả 4 người chưa có TK 105; anh chốt "căn cứ TƯ, đúng thì áp") **+ người Mẫu 01/TV gần nhất TƯ còn giữ ở tổ** mà Mẫu 31 không có (dư nợ 0 — QT-06); cùng tháng chốt với 01/TV → bù đủ như TƯ (khách ở ≥ 2 tổ tính ở mỗi tổ); kỳ ngày → không bù người đã có món ở tổ khác (chuyển tổ). **Có dư nợ = dư nợ GỐC > 0** (như TƯ); không dư nợ tách: còn TK 105 · **còn lãi tồn** (cam) · **cần cho ra** (TƯ còn giữ, 0 / 0 — QT-14). Ngưỡng **QĐ 70: 20–100 TV / tổ** (ô ⚙ Ngưỡng tab Tổ khai thì theo ô) | **anh chốt 24/10/2026** (3.333) | file thật 30/09: **khớp 18.816 / 18.816 TV, 370 / 370 tổ** (tổng + có dư nợ) với Mẫu 01/TV T9 |

**Anh chốt 14/10 (đủ QT-11 → QT-13), chuẩn lại theo file thật ở 3.201–3.202 (bảng trên là bản đúng):** chuẩn là **file tháng**; Giấy lĩnh in số TK, số tiền gõ tay, **gợi ý số dư 105 theo Mẫu 31 mới nhất**; CCCD và TK 105 **ưu tiên Mẫu 31**; **CCCD hết hạn → cảnh báo**; **TK 104 lấy từ Sao kê 104 xuất theo tháng**, sao kê theo ngày chỉ gắn vào Mẫu 31 ngày. Tài khoản làm code: cần **mẫu tên cột Sao kê 104** (xin anh gửi file / dòng tên cột, chỉ đọc trong thư mục nháp) trước khi làm bộ đọc.
| … | Các quy tắc cũ (3.90 thứ bậc tin cậy, 3.136 kỳ ngày, 3.137 còn lãi = còn nợ…) chuyển vào đây khi đụng tới | | KT3L 3.3, 3.5 |

---

## 5. Cá nhân hóa của từng khối (mở rộng "tiền tố riêng" KT3L mục 2)
- Mỗi khối có **vùng cấu hình riêng**, khóa mang **tiền tố của khối** (`gdx…`, `kt…`, `hs…`, `to…`). Khối **không ghi** vào khóa của khối khác.
- Phân rõ **đồng bộ qua Drive** (khai báo, lựa chọn in…) và **riêng máy** (độ rộng, đang chọn, mốc đồng bộ — `CH_RIENG`).
- Cấu hình / khai báo mà **≥ 2 khối dùng** (khai báo Hội, logo NHCSXH, tên PGD) → chuyển thành **khai báo chung** (mục 2).
- **3.222 (anh chốt 16/10, phương án B): ⚙ Khai báo đơn vị** = 1 cửa sổ dùng chung mọi tab (`hsoKBHop`, `gdxKBChung` mở cùng cửa sổ, `js/30-khai-bao.js`): 🏦 PGD · logo · tên đơn vị trên từng mẫu Giao dịch xã · 👤 Cán bộ · 🤝 Hội (xem, sửa ở KTGS) · 🏘 Trưởng ấp · 👥 Tổ phó · 📋 Chương trình vay · 🏦 TK 104 / 105. **Chỗ lưu giữ nguyên** (`hsoKB`, `gdx`, `ktHoiKB`) → không chuyển dữ liệu, mẫu khóa không đổi bản in.
- **Bố cục cột trái mỗi mẫu (bố cục A):** đầu cột **✎ Nhập liệu — Mẫu …** (số liệu của lần làm) · cuối cột **⚙ Khai báo riêng — Mẫu …** (ô ✍ / 🖨, thu gọn được, ↺ về mặc định, 📎 nguồn số liệu) · ⚠ nhắc thiếu ngay dưới tiêu đề. Chương trình vay chỉ 1 lối vào (① ⚙ khai báo chương trình). Mẫu mới theo đúng khung này.

---

## 6. Checklist mỗi chức năng mới / sửa (ghi vào mô tả PR)
0. **Tư vấn đặt chỗ** (mục 1a) — anh duyệt chỗ đặt trước khi làm. Chạm tới KTGS → theo mục 1b.
1. Dữ liệu cần → có trên `KHO` chưa? **Có → dùng.** Chưa → mục 2: chung hay riêng.
2. Quy tắc nghiệp vụ mới? → anh chốt → **QT** (mục 4) → 1 hàm.
3. Giao diện chỉ gọi `KHO` / `CHUAN`; không đọc biến khối khác; không tự tính số nghiệp vụ.
4. Phép thử: cửa chung (nếu đụng) + khối + hồi quy khối dùng chung.
5. PR ghi: **"Chung thêm / đổi: … · Riêng của khối: … · QT mới: …"**.

---

## 7. Đo lệch hướng mỗi bản (ghi vào `BAN_DO_MA.md`, mục tiêu theo KT3L)
| Chỉ số | 14/10 (3.194) | Mục tiêu |
|---|---|---|
| Hồ sơ Tổ (`js/25`) gọi thẳng hàm khối khác | 31 hàm · 57 lần đọc biến chung (`TO_K`, `KT_K`, `SLM`…) | 0 — qua `KHO` |
| Giao dịch xã (`js/26`) | 19 hàm · 60 lần đọc biến chung | 0 |
| `js/22-so-lieu.js` | ~~7.020 dòng · 827 hàm~~ → **3.235 đã tách** 10 file `js/22*` + `js/22k-kt-khuon.js` (mỗi file < 1.300 dòng) | còn: nạp khi dùng (R3 phần 2) |
| Cửa `KHO1` / `KHO` / `CHUAN` / `DANG_KY` | chưa có | có (đợt B / C / D / E) |

**Cập nhật 15/10 (3.216 — cửa `KHO`):** `js/29-kho.js` có 24 cửa (ky, coKy, maTo, maDong, coBang, nap, to, dsTo, dongTo, toVien, bangTo, toTruong, toTruongKH, khach, danhBa, coDanhBa, dsDanhBa, timCCCD, tim, cccd, hanCCCD, tk105, tk104, saoKe, thanhVienTW, tv01); lõi `hsoKhach`, `hsoTTKH` dời về js/29. **`js/25` 109 → 7 dòng, `js/26` 48 → 4 dòng** còn chạm biến kho — chỉ chỗ tab đặt kỳ (`TO_K = …`), cây chọn (`PV_DUNG.K`), đọc tổ trưởng kỳ trước (Hồ sơ Tổ). `t177` kiểm tĩnh, thêm đọc thẳng ở 2 file này → trượt. Bản in Giấy lĩnh, 12/GDX, 04/TD, mini app, 6 mẫu Hồ sơ Tổ, Hồ sơ vay, sổ hộ vay so trước – sau giống hệt. Còn lại đọc thẳng: KTGS (gói riêng, chưa đụng), `js/22` (chính là khối kho cũ — tách dần).
| Chỗ gọi `luu()` lưu toàn bộ | 295 | lưu theo ngăn (đợt B) |

---

## 8. Lộ trình — so với kế hoạch đã chốt trước đợt bố cục (KT3L mục 8) và thứ tự mới (14/10)

**Hướng không đổi** (Q2, Q3, Q4, Q6, Q16; các cửa `KHO1` / `KHO` / `CHUAN`; `DANG_KY`). Chỉ **bổ sung** và **sắp lại thứ tự**.

| Đợt KT3L | Thực tế đến 3.194 | Quyết định 14/10 |
|---|---|---|
| A. Tách file | ✅ 3.142 | — |
| B. Lưu an toàn (`luu()`, đồng bộ Drive) | ✅ (rà 24/10) 3.203 hẹn ghi · 3.223 lưu theo ngăn IndexedDB · 3.225–3.226 đồng bộ Drive theo khối · 3.340 bỏ bản sao localStorage khi > 1 MB | **Giữ — đưa lên số 2** (sự cố mất cài đặt 09/10) |
| C. Kho dữ liệu `KHO` | ✅ (rà 24/10) cửa `KHO` js/29 + sổ QT-01…18; mọi tab đọc qua KHO 3.341–3.346 (thước đo 0); còn K6 đọc sâu kỳ riêng của tab — làm dần (RA_SOAT_KHO_2410 mục 4) | Giữ — số 3, kèm sổ QT; **làm thử bằng TK 104 / 105 / CCCD** (QT-11…13) |
| D. Lớp chung | 🟡 một phần (3.149–3.167) | Giữ |
| E. Đăng ký khối | ❌ chưa (rà 24/10: chưa có `DANG_KY`) | Giữ, sau C |
| F. Bố cục máy tính | ✅ 3.144–3.168 | — |
| G. Nghiệp vụ nối kho | 🟡 (rà 24/10) Hồ sơ Tổ / Hồ sơ vay / GDX / Scan qua KHO; Theo dõi nợ còn bộ đọc riêng | Giữ; thêm **Hồ sơ Tổ** (mới có khung → **dựng thẳng trên `KHO`**, không phải chuyển) và **phần lấy dữ liệu Giao dịch xã** |
| H. Máy chủ nội bộ | chờ tin học | Giữ, để sau |
| I. Mini app | 🟡 mini Giao dịch xã (3.177) chưa qua `KHO` | Giữ; mini app sau phải qua `KHO` |
| J. Dọn mã chết | xen kẽ | Giữ |

**Lệch đã xảy ra (ghi để không lặp lại):** sau đợt F lẽ ra làm B → C; thực tế làm nhiều chức năng mới (3.167–3.194) trên nền chưa có kho chung.

**Điểm mới (KT3L chưa có):**
1. **KTGS gói riêng + khóa mẫu đã chốt** (mục 1b).
2. **Giao dịch xã:** 3 mẫu (04/TD, 12/GDX, Giấy lĩnh) **đã cân chỉnh đúng mẫu chuẩn → khóa như mẫu KTGS** (thuộc riêng khối, sửa phải anh yêu cầu rõ); chỉ **phần lấy dữ liệu** (TK 104 / 105 / CCCD) chuyển về `KHO`.
3. **Dòng thời gian khách / tổ cả năm** trong `KHO` (vào / ra / chuyển tổ, tất nợ, phát sinh QH / khoanh, đổi tổ trưởng) — tab chỉ đọc kết quả, không tự so 2 kỳ.
4. **Chốt sổ tổ viên cuối năm:** Mẫu 31 chỉ chứa món tất nợ **trong năm** → lưu danh sách tổ viên 31/12 kèm trạng thái TK 105 để năm sau đối chiếu. **Hạn: trước khi nạp Mẫu 31 tháng 1/2027.**
5. **Đối chiếu chéo có "danh mục lý do lệch đã biết"** (hộ chỉ còn TK 105, tất nợ trong tháng, hệ thống gỡ mã tổ sau ngày chốt, cách đếm số hộ LEN_31 — QT-09) → chỉ báo **lệch thật**.
6. **"Việc cần xử lý"** gom ở tab Hôm nay theo địa bàn (CCCD hết hạn, chưa TK 105, BQL tổ không còn trong số liệu, tổ lệch đối chiếu, khách "không còn trong số liệu", nợ cần xử lý), tích "đã xử lý".
7. Kỳ: **kỳ tháng (chốt)** cho báo cáo + KTGS, **kỳ ngày** cho tác nghiệp (Giao dịch xã, tra cứu) — `KHO` trả đúng loại kỳ.

**Rà 24/10 (TK 2, bản 3.353):** bước 1–4 ✅ · bước 7 ✅ trừ `DANG_KY` · **còn: bước 5 (dòng thời gian + chốt sổ tổ viên cuối năm — HẠN trước khi nạp Mẫu 31 T1/2027), bước 6 (danh mục lý do lệch), bước 8 (Việc cần xử lý ở Hôm nay), `DANG_KY`, thống nhất quy tắc kiểm tra (KT3L Q15)** — chờ anh chọn thứ tự.

**Thứ tự làm (mỗi bước: kế hoạch → anh duyệt → "code" → hồi quy → "gộp"):**

| # | Việc |
|---|---|
| 1 | Gộp quy chuẩn này + trỏ từ `CLAUDE.md`, `BAT_DAU.md` ✅ |
| 2 | **Đợt B** lưu an toàn (ít nhất cài đặt + đồng bộ) |
| 3 | **Đợt C rút gọn:** `KHO` bọc hàm hiện có + QT-01…07, phép thử; **làm thử bằng QT-11…13** (TK 104 / 105 / CCCD) cho Giấy lĩnh — sau khi anh trả lời câu hỏi A–C |
| 4 | **Tách KTGS** ra file riêng (cơ học) + gom bộ phép thử KTGS |
| 5 | Dòng thời gian + **chốt sổ tổ viên cuối năm** (trước 01/2027) |
| 6 | Bảng đối chiếu chéo + danh mục lý do lệch (xong QT-09) |
| 7 | Giao dịch xã lấy dữ liệu qua `KHO`; Hồ sơ Tổ dựng trên `KHO`; tách phần còn lại `js/22-so-lieu.js`; `DANG_KY` |
| 8 | "Việc cần xử lý" ở Hôm nay |
| 9 | Sau đó mới thêm chức năng / mẫu mới (tư vấn đặt chỗ trước — mục 1a) |

**Rủi ro cần nhớ:** Mẫu 31 đổi cấu trúc (→ từ điển cột) · dung lượng nhiều kỳ (~20 MB / Mẫu 31 → lưu gọn, giữ cuối tháng, dọn kỳ ngày cũ) · 2 tài khoản làm song song (→ theo quy chuẩn + cập nhật `BAT_DAU.md` mỗi bản) · repo công khai (quy tắc rút từ dữ liệu thật chỉ ghi tổng quát).

---

## 9. Mẫu biểu: chuẩn gốc · chuẩn khóa · chồng khít · cắm và rút (anh chốt 16/10/2026 — chi tiết `KE_HOACH_BAN_LON.md`)
1. **Chuẩn gốc:** file Word / PDF anh gửi lưu ở `tests/mau_goc/` (mẫu trắng / số liệu giả). Bản in app phải khớp chữ, số trang, lề (±1–2 mm).
2. **Chuẩn khóa:** bản in app đã đạt, anh duyệt → `tests/chuan/`, so **từng ký tự** mỗi bản. Sửa mẫu A làm lệch mẫu B → đỏ, không gộp. Chỉ cập nhật chuẩn của mẫu anh duyệt đổi.
3. **Chồng khít:** bản trắng / có số liệu / bản mẫu cùng vị trí khối (±0,5 mm), cùng số trang. Số liệu nằm trong khung ô cố định, không xô form; chữ dài → thu nhỏ, quá mức → ⚠ báo.
4. **Sổ mẫu — cắm và rút:** mỗi mẫu là 1 mô-đun đăng ký (mã, tên, tab, phần, ô, hàm dựng); mẫu không gọi mẫu khác; khai báo lưu theo mã mẫu. Nền ô (`js/31-o-mau.js`) là lớp riêng có hợp đồng + phép thử; sửa nền → chạy chuẩn khóa mọi mẫu.
5. **Cửa lưu `KHO1`:** tab không tự đụng localStorage / IndexedDB; có lịch sử chụp, khôi phục, xuất / nhập.
6. Mẫu Giao dịch xã, KTGS: không lên nền mới, chỉ được chuẩn khóa canh giữ.
7. **Giữ khung hay gõ liền — theo VỊ TRÍ ô trên mẫu gốc** (anh 23/10/2026: "khi nào cần cách xa đúng form, khi nào gõ liền tùy nội dung và vị trí, không cứng nhắc"). Trước khi dựng / sửa mẫu: chụp mẫu gốc (`tests/mau_goc/`), xét từng ô theo bảng:

   | Vị trí ô trên mẫu gốc | Có chữ thì in | Ví dụ (01/TGTV) |
   |---|---|---|
   | **Trong câu văn** (chữ in sẵn chảy liền trước / sau) | **Gõ liền**, 1 khoảng trắng, không giữ khung | "chi nhánh/PGD **Gò Dầu** mở hồ sơ…", "…, ngày **23** tháng **10** năm **2026**" |
   | **Cuối dòng / cuối ô bảng** (sau nó không còn chữ in sẵn) | **Gõ liền** | Nơi cấp, Chức vụ, Tiếp nhận ngày, Hiệu lực từ ngày |
   | **Giữa dòng kiểu cột** (sau nó còn nhãn in sẵn: "Nhãn: …… Nhãn kế: ……") | Chữ **gõ liền từ đầu ô**, ô **giữ đúng bề rộng chuỗi chấm** → nhãn kế đứng yên như bản trắng | Ngày sinh → Giới tính; Ngày cấp → Ngày hết hạn → Nơi cấp; Số nhà → Đường → Tổ dân phố |
   | **Trong khung / bảng / ô kẻ** (khung họ tên, 12 ô CCCD, ô bảng) | Theo khung: chữ lọt giữa khung, mỗi ký tự 1 ô | Họ tên, số CCCD |
   | **Ngày tháng năm** | Luôn **dd/mm/yyyy liền**, không chừa khoảng như chấm; vị trí ô theo 3 dòng trên | "28/03/1978" |

   Trống → luôn in đúng chuỗi chấm gốc. Mẫu phải giữ số trang như mẫu gốc (có phép thử số trang). Nền ô: `G.o(k, chấm, {lien:1})` = gõ liền; mặc định = giữ khung.
   **Chữ dài hơn ô — KHÔNG tự thu nhỏ chữ** (anh 23/10: "khi lập form đã tính đủ chữ, khi cần viết kiểu ngắn lại"): ① viết tắt chuẩn (`omTat`: Cục CS QLHC về TTXH, TP., P., TT., KP., H., T., NHCSXH, UBND) → ② vẫn dài: ô giãn, nhãn sau dịch phải, cỡ chữ giữ nguyên → ③ ⚠ báo trước khi in "dài hơn ô — xem rớt dòng, cần thì gõ ngắn lại". Canh dòng và lề: nhãn đầu dòng thẳng cột như form gốc, không để chữ tràn lề phải. Nền ô bật theo từng mẫu (`giuCo:1`) khi anh duyệt chuẩn khóa — đang bật: 01/TGTV; các mẫu khác chuyển dần (còn thu nhỏ / nén dòng kiểu cũ).

## 10. Chuẩn hóa code, giao diện, thư viện (anh duyệt 17/10/2026 — chi tiết `KE_HOACH_CHUAN_HOA.md`)
- **Code mới:** hộp riêng mỗi khối, `data-lenh` thay `onclick` trong chuỗi, file ≤ ~150 KB; mỗi bản dọn rác trong phạm vi + kiểm toàn vẹn; thước đo `tests/kiem.py` không được vượt mốc `tests/do_moc.json` (hạ mốc khi dọn bớt: `python3 tests/kiem.py --moc`).
- **Giao diện mới:** chỉ dùng khung bố cục + mảnh giao diện chung (khi có ở R2); không gắn độ rộng / cỡ chữ cứng trong chuỗi HTML; xuất / in chỉ dùng bộ nút chuẩn; màn / hộp mới đi qua bộ điều hướng chung, 4 nút ⬅ Lùi · ✕ Đóng · Bỏ · Thoát nghĩa cố định.
- **Danh mục thư viện được phép** (nạp qua `js/01`, cố định bản, chạy offline): pdf.js 3.11.174 · pdf-lib 1.17.1 · SheetJS 0.18.5 (chờ nâng bản vá) · DOMPurify 3.x · Framework7 Core 8.x · Tesseract.js 5.1.1 (đọc chữ trong máy, từ 3.46) · **jsQR 1.4.0** (đọc mã QR CCCD trong máy — anh duyệt 20/10/2026, 3.264) · **heic-to 1.6.5** (đổi ảnh HEIC iPhone sang JPG trong máy, libheif, giấy phép LGPL-3.0 — dùng nguyên file, không sửa; anh duyệt 20/10/2026, 3.289; nạp khi gặp ảnh HEIC đầu tiên) (chỉ bản điện thoại) · jsQR (dự phòng quét QR). Thêm thư viện khác: anh duyệt từng cái.

## 11. Quy tắc nhập liệu — mọi form (anh chốt 17/10/2026; gom từ các luật đã có: Sổ hộ vay 3.218+, gõ ngày liền số 3.187)
| Phím / thao tác | Tác dụng |
|---|---|
| **Tab** hoặc **Enter** | Sang **ô kế tiếp** (đúng thứ tự trên tờ mẫu) |
| **Shift+Tab** / **Shift+Enter** | Lùi về ô trước |
| **↑ / ↓** ở ô danh sách | **Chọn** trong danh sách (không cần chuột) |
| **← / →** | Đi qua lại **trong chữ** để sửa (không nhảy ô) |
| **Ctrl+Enter** | Lưu |
| **Esc** | **Về 1 cấp** (đóng danh sách đang xổ → rời ô → đóng hộp / khung khai báo riêng → về màn trước) |
| **Backspace** (ngoài ô nhập) | *Chưa chốt — anh tính sau* (hiện chỉ khối LỌC ĐỊA BÀN: lên 1 cấp) |
| Gõ **ngày** | **Không cần dấu /** — gõ liền số (vd 1102026 = 01/10/2026, 2542021 = 25/04/2021); gõ có dấu / - . vẫn được |
| Gõ **số tiền** | Gõ số trơn, app tự chấm nghìn + bằng chữ |
- Mỗi ô có **↺ Mặc định** (ở khai báo riêng); form có **Làm trống**.
- Form mới, mẫu mới **bắt buộc** theo bảng này; phép thử bàn phím cho mỗi form (Tab / Enter / ↑↓ / ngày liền số).


## 12. Quản lý file — mọi file có tên, quản được (anh chốt 20/10/2026)
- Anh: *"nguyên tắc là sau này mọi file đều có tên và quản lý được, file nào không quản được thì đem để chỗ chung để kiểm tra"*.
- Mọi file app đưa lên Drive phải **có tên chuẩn** (đã rõ khách: `MãKH - Họ tên - Loại`; chưa rõ: tên anh gõ có chữ đầu loại `cccd- / ck- / anh- / 01td-…`) và **app biết** (ghi trong dữ liệu: mã file Drive, thư mục cha, tên đã đặt) để đổi tên / dời / xóa / rà theo.
- File **không quản được** (thả tay, không nhận ra khách, máy khác chưa đồng bộ, tên lạ) → đưa về **1 chỗ chung** (Scan: `Scan chờ sắp xếp`) và hiện ở bước kiểm tra (🧹 Sắp xếp / 🔎 Rà) để anh xem — không để rải rác, không tự xóa.
- Áp dụng cho chức năng mới; chức năng cũ (Văn bản, Bộ hồ sơ, Hôm nay…) rà dần theo nguyên tắc này khi sửa tới (đề xuất kế hoạch riêng, anh duyệt).

## 13. Chữ dùng trên giao diện — cân đối chuẩn và gần gũi (anh chốt 21/10/2026)
- Anh: *"cách tiếp cận, hướng dẫn như 'Quét gì' 'ở đâu' rất hay"*; *"từ ngữ quá cá nhân cũng chưa cần, em nên dung hòa giữa ý đó và chuẩn thông dụng"*; *"chỗ đó thì hợp lý rồi, anh cần đa dạng và cân đối giữa chuẩn và gần gũi khi cần"*.
- **Mặc định theo chuẩn thông dụng** của phần mềm: tiêu đề cột, ô nhập, mục cài đặt là danh từ ngắn (Loại giấy tờ, Nguồn ảnh, Nơi lưu, Tổ trưởng); nút là động từ chuẩn (Quét, Lưu, Xuất, In, Gửi, Bỏ, Đóng); thông báo nói việc đã làm + kết quả, không xưng hô.
- **Gần gũi khi cần**: ở bước chọn đầu một việc nhiều nhánh (vd hộp "Quét gì?" › "Lấy từ đâu?" của Scan — giữ nguyên) được dùng câu hỏi ngắn để dẫn từng bước; câu hỏi ≤ 4 chữ, không đùa, không xưng "anh / em".
- Dòng gợi ý: 1 câu ngắn, chỉ khi thật cần; không lặp lại điều nút đã nói.
- Không đổi chữ của chức năng đang chạy chỉ vì quy ước này — áp dụng cho chức năng mới, chỗ cũ chỉnh khi sửa tới.

## 14. Chip / nhãn 7 màu — 1 kiểu cho toàn app (anh chốt 23–24/10/2026, bản 3.333)
| Màu | Nghĩa | Ví dụ |
|---|---|---|
| 🔴 Đỏ `.nh-do` | lỗi · quá hạn · hết hạn · sai · đủ ngưỡng không nhận thêm | nợ quá hạn, CCCD hết hạn, file bắt buộc thiếu, tổ đủ 100 TV |
| 🟠 Cam `.nh-cam` | nợ cần theo dõi | khoanh, KHĐ, còn lãi tồn, cần đóng tổ |
| 🟡 Vàng `.nh-vang` | cảnh báo nhẹ · thiếu thông tin | CCCD sắp hết hạn, thiếu / sai SĐT, chưa TK 105, dưới 20 TV, cần cho ra |
| 🟢 Lục `.nh-luc` | đạt · đủ · trong hạn · xong | trong hạn, đủ file, không trùng |
| 🔵 Xanh dương `.nh-lam` | đang chọn · thông tin · số đếm | chip đang chọn, số có dư nợ |
| 🟣 Tím `.nh-tim` | phân loại · mới | chương trình vay, HSSV, mới vào tổ |
| ⚪ Xám `.nh-xam` | không có · 0 · đã tất toán · tạm ẩn | chip 0, không dư nợ, ra khỏi tổ |
- **Nơi mới chỉ dùng `.nh .nh-<màu>`** (css/app.css cuối file); biến màu `--do --cam --vang --luc --xanh --tim --xam` (+ `-nen`) có bản tối.
- Kiểu cũ (`.tc-nh`, `.kt-nh`, `.sl-chip`, `.chip.do/.vang`) đã cùng hình + cùng màu theo bảng này; đổi tên dần khi đụng tới, không đổi chức năng.
- **Màu cấp của cây địa bàn** (Xã / Điểm / Hội / Tổ — `--c-xa`…) giữ riêng: màu nhận diện cấp, không mang nghĩa trạng thái.


## 13. Quản lý code khi app lớn dần (anh chốt 25/10/2026)
> Anh: "App đang lớn dần nên em luôn quản lý code đảm bảo tiêu chuẩn **độc lập, có thể cắm rút, an toàn và luôn tối ưu tốc độ chạy**." · "chức năng mới nhưng đảm bảo cái cũ chạy được".
- **Độc lập · cắm rút:** chức năng mới = **file riêng** (`js/NN-ten.js`, `css/ten.css`) + **1 chỗ gắn** (1 dòng `<script>/<link>` trong `index.html` và tối đa 1–2 dòng gọi có `typeof … === 'function'` ở nơi hiện). Bỏ file + dòng gắn → app chạy như trước. Không rải sửa nhiều file cũ.
- **Giao tiếp qua cửa chung:** số liệu qua `KHO`, lệnh nút qua `GD.dangKy` / `data-lenh`, báo cáo bảng qua `DANG_KY`, in qua `inChuan` / `trDan` (thuộc tính tùy chọn, không có thì như cũ).
- **An toàn:** thao tác xóa / ghi đè dữ liệu nền phải hỏi hoặc vào Thùng rác; dữ liệu cũ đọc được; hàm đọc dữ liệu không được làm vỡ luồng khi thiếu (trả rỗng, không ném lỗi).
- **Tốc độ:** việc nặng (đọc nhiều tháng, dựng kỳ khác) chỉ chạy **khi bấm / khi cần**, kết quả giữ trong phiên; không làm chậm lúc mở tab / mở thẻ.
- **Điện thoại (25/10):** bản máy tính chạy trên điện thoại bằng `css/dt-may.css` (nạp với `media="(max-width:600px)"`); bảng sao kê / báo cáo **giữ cột như máy tính**, dùng **vuốt trượt + chụm phóng to / thu nhỏ của iOS** (khung cuộn ngang, cột đầu đứng yên; xem trước bản in vừa bề ngang, chụm để phóng) — không xếp lại cột.
- **Phép thử:** theo mức thay đổi (CLAUDE.md); chức năng mới phải kèm phép thử cũ của vùng bị đụng.
