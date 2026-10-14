# QUY CHUẨN KIẾN TRÚC — bắt buộc cho MỌI thay đổi (bản nháp 14/10/2026, chờ anh Nhân duyệt)

> **Đọc file này trước khi thêm / sửa bất kỳ chức năng nào.** Bổ sung cho `docs/KIEN_TRUC_3_LOP.md` (thiết kế đích + lộ trình) — file này là **luật** để không lệch hướng khi app phát triển nhanh theo nhu cầu thực tế.
> Không chứa dữ liệu thật.

---

## 0. Anh chốt (14/10/2026)
- App phát triển nhanh theo nhu cầu thực tế → **rất dễ lệch hướng**. Từ nay **ưu tiên BỀN VỮNG hơn nhanh**.
- **Tách biệt 3 phần: DỮ LIỆU – NGHIỆP VỤ – GIAO DIỆN.**
- **Chia rõ** cái gì lấy từ **kho chung**, cái gì là **cá nhân hóa của từng chức năng**.
- **Khi có nhiều nơi gọi VÀ có quy tắc rõ → đưa vào chung.**

---

## 1. Ba phần và chiều phụ thuộc

```
GIAO DIỆN (khối / tab: Tổ, KTGS, Giao dịch xã, Hồ sơ, Sao kê…)   ← chỉ vẽ, nhận thao tác
      │ chỉ gọi ↓
NGHIỆP VỤ  · chung: quy tắc anh chốt dùng nhiều nơi (tổ viên, ra / vào tổ, nợ cần xử lý…)
           · riêng: quy tắc chỉ 1 khối dùng (chọn hộ Mẫu 06, chia mệnh giá Bảng kê…)
      │ chỉ gọi ↓
DỮ LIỆU    · kho chung: bảng chuẩn theo kỳ từ file (Mẫu 31, Mẫu 18…), cây địa bàn, khai báo dùng chung
           · lưu trữ: máy + Drive, đồng bộ, sao lưu
```

**Luật cứng:**
1. Chỉ gọi **xuống**, không gọi ngược lên (dữ liệu không biết giao diện; nghiệp vụ không vẽ HTML).
2. **Khối không gọi khối.** Khối A cần thứ khối B đang có → thứ đó phải được đưa xuống **chung** (mục 2), rồi cả A và B cùng gọi chung.
3. Khối **không đọc biến toàn cục của khối khác** (vd `TO_K`, `KT_K`, `SLM` chỉ phần dữ liệu / nghiệp vụ chung được đụng; khối dùng qua cửa).
4. **Không chép mã quy tắc** sang khối khác. Thấy cần chép = dấu hiệu phải đưa vào chung.
5. Giao diện **không tự tính số nghiệp vụ** (tổ viên, dư nợ, nợ cần xử lý…) — chỉ lấy kết quả từ nghiệp vụ.

---

## 2. Tiêu chí CHUNG hay RIÊNG

| Đưa vào **CHUNG** khi đủ cả 3 | Để **RIÊNG** của khối khi |
|---|---|
| ① **≥ 2 nơi** dùng (hoặc chắc chắn sẽ dùng) | Chỉ 1 khối dùng |
| ② Có **quy tắc rõ, anh đã chốt** (ghi số QT ở mục 4) | Là cách **trình bày**: cột, thứ tự, chữ, màu, khổ giấy, mẫu in |
| ③ Kết quả **phải giống nhau mọi nơi** (vd số tổ viên ở tab Tổ = Hồ sơ Tổ = KTGS) | Là **khai báo / lựa chọn riêng** của chức năng (logo Bảng kê, khổ Giấy lĩnh, người ký mẫu 06…) |

**Vòng đời:** chức năng mới viết quy tắc **trong khối** và đánh dấu `/* ứng viên chung */` → khi **nơi thứ 2** cần → **chuyển xuống chung** (không chép), khối cũ đổi sang gọi chung, chạy hồi quy cả 2 khối.

**Bảng phân loại hiện tại** (dùng để chuyển dần, mục 6):

| Thuộc CHUNG (dữ liệu / nghiệp vụ) | Thuộc RIÊNG (khối) |
|---|---|
| Kỳ & ngày số liệu đang dùng; danh sách kỳ | KTGS: chọn hộ Mẫu 06, lịch Kế hoạch, Mẫu 04 / 16, phân công BTV |
| Cây địa bàn theo kỳ (xã · điểm GD · ấp · tổ · Hội) | Giao dịch xã: Giấy lĩnh, Bảng kê, 04/TD, 12/GDX, mini app |
| Tổ: thông tin, tổ trưởng / tổ phó, điểm GD, Hội | Hồ sơ Tổ / Hồ sơ vay: ô mẫu, cách điền |
| Khách & món vay của khách / của tổ | Sao kê, Tổng hợp: bố cục báo cáo |
| **Tổ viên + vào / ra / chuyển tổ** (QT-01…QT-05) | Scan, Văn bản, Biểu mẫu, Hôm nay |
| TK 105, TK 104 (số TK, số dư, theo CCCD) | Cấu hình hiển thị từng tab (cột, ngưỡng, chip) |
| Nợ cần xử lý: quá hạn, khoanh, KHĐ (QT) | |
| Đến hạn, CCCD hết / sắp hết hạn | |
| Khai báo Hội + bảng Chuẩn hóa (dùng cho KTGS, Hồ sơ, Giao dịch xã) | |
| Định dạng chung: tiền (2 số lẻ), ngày, chữ số, tên không dấu, tên file | |
| Xuất chung (In / PDF / Word / Excel), xóa / thùng rác, sao lưu | |

---

## 3. Cửa công khai (hợp đồng)
- Mỗi phần chung có **một cửa duy nhất** (`KHO` dữ liệu, `NV` nghiệp vụ chung, `CHUAN` giao diện chung, `KHO1` lưu trữ). Khối chỉ dùng hàm trên cửa.
- Mỗi hàm trên cửa có **hợp đồng** ghi ngay trên hàm: đầu vào, đầu ra (tên trường), quy tắc nguồn (số QT), đơn vị (đồng / triệu).
- **Đổi hợp đồng** (thêm / bỏ / đổi nghĩa trường) = thay đổi lớn → **anh duyệt** + hồi quy **mọi khối dùng cửa đó**. Thêm trường mới không phá trường cũ thì được.
- Mỗi cửa có **phép thử riêng** (dữ liệu giả) — đổi quy tắc là phép thử báo ngay.

---

## 4. Sổ quy tắc nghiệp vụ (QT) — một nơi duy nhất
Mỗi quy tắc anh chốt ghi 1 dòng: **số · nội dung · ngày chốt · căn cứ dữ liệu · hàm thực hiện**. Sửa quy tắc = sửa 1 hàm chung + dòng này.

| Số | Quy tắc | Chốt | Căn cứ |
|---|---|---|---|
| QT-01 | Mẫu 31: mỗi dòng 1 món; **Mã tổ = tổ lúc vay**. Mẫu 31 chứa **toàn bộ món tất nợ trong năm** | 13–14/10 | anh xác nhận |
| QT-02 | Khách còn món vay ở tổ T → tổ viên T | 3.138.1 | |
| QT-03 | Khách chỉ còn món đã tất nợ: TK 105 **còn gắn mã tổ** → còn trong tổ; TK 105 **Mã tổ 0 / đã đóng** → đã ra | 3.138.1 · kiểm 1 tổ thật 14/10 | file 07/10, 11/10 |
| QT-04 | Có món mới ở tổ B, món cũ đã đóng ở tổ A → chỉ tính tổ B | 3.193 | Mẫu 31 đến 11/10 (73 khách) |
| QT-05 | KU hủy (CLOSE + giải ngân 0) bỏ; KU chưa giải ngân (OPEN, giải ngân 0, dư nợ 0) không tính tất nợ | 3.138 | |
| QT-06 | Khách **TK 105 số dư 0, không món vay trong năm** không có trong Mẫu 31 / Mẫu 18 → app **không tự biết**; tổ trưởng / tổ phó không có trong số liệu → **cảnh báo** (Cần xử lý) | 14/10 | trường hợp 1 tổ phó (tổ thật, 14/10) |
| QT-07 | So sánh **Mẫu 31 + Mẫu 18 qua các kỳ** (năm 2026 đủ số liệu); khách kỳ trước có, kỳ này mất cả 2 file → nhóm "Không còn trong số liệu" + trạng thái lần cuối | 14/10 | |
| QT-08 | **BC0437 / BC0438 chỉ dùng cho KTGS**, không dùng đối chiếu tổ viên | 14/10 | |
| QT-09 | Đối chiếu số hộ hằng tháng: **LEN_31 TO_TRUONG "Số hộ"** ≈ hộ có món còn mở + khách chỉ có TK 105 (số dư > 0, không món vay trong năm) — **khớp 283/367 tổ (30/09)**, còn lệch ±1–2 → **chờ bàn tiếp** trước khi đưa vào app | 14/10 (đang bàn) | file 30/09 |
| QT-10 | Tiền trên mẫu in 2 số lẻ (nợ lãi < 5.000 đ giữ 3 số lẻ) | 3.140.1 | |

---

## 5. Cá nhân hóa của từng chức năng
- Mỗi khối có **vùng cấu hình riêng** trong cài đặt, khóa có **tiền tố của khối** (vd `gdx…`, `kt…`, `hs…`). Khối **không ghi** vào khóa của khối khác.
- Phân rõ **đồng bộ qua Drive** (khai báo, lựa chọn in, khai báo Hội…) và **riêng máy** (độ rộng, đang chọn, mốc đồng bộ — `CH_RIENG`).
- Thứ cá nhân hóa mà **≥ 2 khối dùng** (vd khai báo Hội, logo NHCSXH) → chuyển thành **khai báo chung** (mục 2).

---

## 6. Quy trình cho MỖI chức năng mới / sửa (checklist trong PR)
1. Liệt kê dữ liệu cần → có trên cửa chung chưa? **Có → dùng.** Chưa → theo mục 2: chung hay riêng.
2. Có quy tắc nghiệp vụ mới? → anh chốt → ghi **QT** (mục 4) → viết ở **một** hàm.
3. Giao diện chỉ gọi cửa; không đọc biến khối khác; không tự tính số nghiệp vụ.
4. Phép thử: cửa chung (nếu đụng) + khối mới + hồi quy các khối dùng chung.
5. PR ghi rõ: "Chung đã thêm / đổi: …", "Riêng của khối: …", "QT mới: …".

---

## 7. Đo để không lệch (mỗi bản, ghi vào `BAN_DO_MA.md`)
| Chỉ số | 14/10 (3.194) | Mục tiêu |
|---|---|---|
| Hàm nội bộ khối khác bị gọi thẳng — Hồ sơ Tổ (`25`) | 31 hàm · 57 lần đọc biến chung | 0 (qua cửa) |
| — Giao dịch xã (`26`) | 19 hàm · 60 lần đọc biến chung | 0 |
| File lớn nhất `22-so-lieu.js` | 7.020 dòng · 827 hàm (dữ liệu + Tổ + KTGS + Sao kê + Tổng hợp + Tra cứu) | tách theo phần, mỗi file < 2.500 dòng |
| Cửa `KHO` / `NV` / `CHUAN` / `KHO1` / `DANG_KY` | chưa có | có |
| Chỗ gọi `luu()` lưu toàn bộ | 295 | lưu theo phần (đợt B) |

---

## 8. Đưa app hiện tại về đúng quy chuẩn (đề xuất — mỗi bước anh duyệt, "code", hồi quy, "gộp")
1. **Tạm dừng chức năng lớn ~2–3 bản.**
2. Dựng cửa **`KHO` + `NV`** rút gọn (10–15 câu hỏi ở bảng mục 2: kỳ, cây, tổ, khách & món, tổ viên QT-01…07, TK 105/104, nợ cần xử lý, đến hạn, CCCD) — bọc hàm hiện có, **không đổi kết quả**.
3. Chuyển **Hồ sơ Tổ** rồi **Giao dịch xã** sang gọi cửa (2 bản).
4. Tách `22-so-lieu.js`: dữ liệu chung / Tổ / KTGS / Sao kê – Tổng hợp – Tra cứu (cơ học).
5. **Đăng ký khối `DANG_KY`** — thêm / bỏ tab, báo cáo = 1 file + 1 dòng.
6. **Đợt B** lưu an toàn (song song hoặc ngay sau).
7. Từ đó: mọi chức năng mới theo mục 6.
