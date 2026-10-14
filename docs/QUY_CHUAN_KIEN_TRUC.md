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
  2. **Số liệu vào qua 1 cửa hẹp, theo kỳ THÁNG:** KTGS chỉ nhận **ảnh chụp cuối tháng** (Mẫu 31 / Mẫu 18 cuối tháng — như In theo tháng 3.141 tự lấy cuối tháng trước) + **BC0437 / BC0438 của riêng KTGS** (QT-08). Số liệu theo ngày của các tab khác **không chảy vào** KTGS.
  3. **Không phá cấu trúc:** các đợt dọn kiến trúc (mục 8) **không viết lại bên trong KTGS**; chỉ đặt **bộ chuyển** trả đúng dữ liệu như KTGS đang dùng. Đổi quy tắc chung (QT) có ảnh hưởng KTGS → **chạy riêng bộ phép thử KTGS** và báo anh trước khi gộp.
  4. Dùng chung với nơi khác **chỉ**: cây địa bàn, khai báo Hội + Chuẩn hóa, xuất In / Word / PDF — qua cửa chung.

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
| … | Các quy tắc cũ (3.90 thứ bậc tin cậy, 3.136 kỳ ngày, 3.137 còn lãi = còn nợ…) chuyển vào đây khi đụng tới | | KT3L 3.3, 3.5 |

---

## 5. Cá nhân hóa của từng khối (mở rộng "tiền tố riêng" KT3L mục 2)
- Mỗi khối có **vùng cấu hình riêng**, khóa mang **tiền tố của khối** (`gdx…`, `kt…`, `hs…`, `to…`). Khối **không ghi** vào khóa của khối khác.
- Phân rõ **đồng bộ qua Drive** (khai báo, lựa chọn in…) và **riêng máy** (độ rộng, đang chọn, mốc đồng bộ — `CH_RIENG`).
- Cấu hình / khai báo mà **≥ 2 khối dùng** (khai báo Hội, logo NHCSXH, tên PGD) → chuyển thành **khai báo chung** (mục 2).

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
| `js/22-so-lieu.js` | 7.020 dòng · 827 hàm (kho + Tổ + KTGS + Sao kê + Tổng hợp + Tra cứu) | tách theo khối, mỗi file < 2.500 dòng |
| Cửa `KHO1` / `KHO` / `CHUAN` / `DANG_KY` | chưa có | có (đợt B / C / D / E) |
| Chỗ gọi `luu()` lưu toàn bộ | 295 | lưu theo ngăn (đợt B) |

---

## 8. Đưa app về đúng (theo lộ trình KT3L mục 8 — đã xong A, F, một phần D)
Đề xuất thứ tự, mỗi bước anh duyệt → "code" → hồi quy → "gộp":
1. **Tạm dừng chức năng lớn ~2–3 bản.**
2. **Đợt C rút gọn:** dựng `KHO` bọc hàm hiện có (`slBo`, `toNap`, `toKhach`, `toTV`, `slDanhRaTo`, danh bạ…) + phép tính chung QT-01…07 — **không đổi kết quả**.
3. **Tách KTGS ra file riêng trước** (cơ học, không đổi logic) + gom bộ phép thử KTGS (mục 1b) — để mọi bước sau không đụng KTGS.
4. Chuyển **Hồ sơ Tổ**, rồi **Giao dịch xã** sang gọi `KHO` (2 bản) — 2 khối mới, dính chặt nhất; tách phần còn lại của `js/22-so-lieu.js` theo khối (cơ học).
5. **Đợt E** `DANG_KY`; **đợt D** hoàn tất `CHUAN`.
6. **Đợt B** lưu an toàn (song song / ngay sau — liên quan sự cố mất cài đặt 09/10).
7. Từ đó mọi chức năng mới theo checklist mục 6.
