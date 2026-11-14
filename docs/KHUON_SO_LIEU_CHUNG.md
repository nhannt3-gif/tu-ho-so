# KHUÔN SỐ LIỆU CHUẨN CHUNG App ↔ Giao ban — bản 1.0 (14/11/2026)

> Anh chốt 14/11: nguyên tắc ở mục 1; phần kỹ thuật TK 1 quyết (anh: *"phần kỹ thuật em tự quyết"*). Luật tính vẫn ở `QUY_TAC_SO_LIEU.md` (QT-C-xx); file này chỉ quy định **khuôn file** hai bên cùng xuất để so. Repo công khai: không ghi mã tổ, tên khách.

## 1. Nguyên tắc (anh chốt 14/11/2026)
- **App cố định, Giao ban linh hoạt.** Khi làm văn bản, **Giao ban là bên chính**. **Hai bên đều làm được** cùng một việc, bên này trục trặc thì bên kia làm thay.
- Hai bộ tính **độc lập**, dùng **chung luật** ghi trong sổ `docs/QUY_TAC_SO_LIEU.md` (QT-C-xx), xuất **chung khuôn file** theo bản này.
- Mỗi kỳ (cuối tháng và mỗi phiên) so hai file. Lệch thì lấy **biểu TW cuối tháng** làm trọng tài: BC0438 theo Hội, Mẫu 01/TV cho tổ viên, BCDHTD 01.1 cho cho vay và thu nợ, danh sách TW cho món 3 tháng KHĐ. Bên khớp TW là bên đúng, TK tự kết luận.
- Đổi luật thì ghi sổ QT-C trước, hai bên cùng sửa theo. Đổi khuôn file thì tăng số phiên bản ở mục 6.

## 2. File 1 — Số liệu theo tổ (ĐÃ CÓ, giữ nguyên)
Tên file: `DOI_CHIEU_GB_<YYYY-MM-DD>.csv` (Giao ban) và `DOI_CHIEU_APP_<YYYY-MM-DD>.csv` (App). UTF-8 có BOM.
- **Dòng 1:** dòng chú thích, bắt đầu bằng `#`. Ghi bên xuất, phiên bản, ngày số liệu, nguồn và cách tính.
- **Dòng 2:** tên cột. Từ dòng 3: mỗi tổ một dòng, nhóm vay trực tiếp mỗi ấp một dòng (`TT|<mã ấp>`). Tiền tính bằng đồng.

| Cột | Ý nghĩa | Luật |
|---|---|---|
| khoa | Mã tổ; vay trực tiếp `TT|<mã ấp>` | QT-C-10, 11 |
| ma_xa, ma_ap | Mã xã, mã ấp/khu phố của tổ | File Tổ trưởng cùng ngày |
| ma_diem | Mã điểm giao dịch | ⚠ thống nhất 1 cách ghi, xem mục 5 |
| hoi | HND, HPN, HCCB, ĐTN, TT | ĐVUT 11–14 |
| so_tv | Tổ viên: tổ theo Mẫu 01/TV cùng ngày; nhóm trực tiếp là số KH còn dư nợ | QT-18 app, bang_so_lieu 1.9 |
| so_tv_du_no | Tổ viên còn dư nợ (= "khách hàng còn dư nợ" trong văn bản) | QT-C-14 |
| du_no, nqh, khoanh | Dư nợ, nợ quá hạn, nợ khoanh; mỗi khế ước tính 1 lần | 5.1 Quy chuẩn |
| lai_ton | Lãi tồn TH + QH, đã trừ lãi dồn của món giao dịch ở phiên; món giao dịch sau ngày số liệu thì giữ nguyên lãi | QT-C-03 (14/11) |
| tien_gui | Số dư TK 105: mỗi sổ tính 1 lần (dòng đầu tiên của sổ), tổ theo dòng có Hội | khóa sổ (14/11) |
| cho_vay, thu_no | Giải ngân (trừ đảo khoản), thu nợ TH + QH + khoanh trong tháng | 5.1 |
| so_mon_khd | Món 3 tháng KHĐ: cuối tháng theo danh sách TW, giữa tháng dựng từ Mẫu 31 | 5.3 |
| so_mon_lech_ap | Món ở ấp khác ấp của tổ | QT-C-10 |
| so_mon_den_han_thang_toi | Món còn dư nợ, chưa quá hạn, đến hạn tháng tới | QT-C-17 |

Kết quả 14/11: App 3.533 = Giao ban toàn bộ ở cả 2 mốc 30/09 và 31/10 (lãi tồn lệch làm tròn 4–6 đồng); còn đúng các điểm ở mục 5.1–5.3, nay đã quyết.

## 3. File 2 — Danh sách món (MỚI, đề xuất)
Mục đích: hai bên ra **cùng danh sách hộ** cho nợ quá hạn, nợ khoanh, món 3 tháng KHĐ, nợ đến hạn tháng tới. Đây là phần phụ lục và phần nêu tên trong văn bản. Hiện chỉ so được số món, chưa so được từng món.
Tên file: `DOI_CHIEU_MON_GB_<YYYY-MM-DD>.csv` và `DOI_CHIEU_MON_APP_<YYYY-MM-DD>.csv`. Mỗi khế ước thuộc ít nhất 1 nhóm là một dòng.

| Cột | Ý nghĩa |
|---|---|
| so_ku | Số khế ước (khóa) |
| ma_kh | Mã khách hàng |
| khoa | Mã tổ hoặc `TT|<mã ấp>` (như File 1) |
| hoi, ma_ap, ma_diem | Như File 1 |
| chuong_trinh | Mã chương trình |
| du_no, nqh, khoanh, lai_ton | Đồng; lãi tồn theo luật QT-C-03 |
| la_nqh, la_khoanh, la_khd, la_den_han | 1 hoặc 0, cho biết món thuộc nhóm nào |
| ngay_chuyen_qh | Ngày chuyển quá hạn theo QT-C-12 (dd/mm/yyyy, trống nếu không có) |
| ngay_den_han | Ngày đến hạn tháng tới (QT-C-17) |
| ngay_het_khoanh | Ngày hết hạn khoanh (nếu nguồn có) |
| so_thang_lai | Lãi tồn ÷ (dư nợ × lãi suất năm ÷ 12), 1 chữ số thập phân |

Không ghi họ tên khách hàng (mục 5.4).

## 4. So sánh hai bên
- Công cụ: `doi_chieu_app.py` (Giao ban) hiện so File 1. Nâng lên so cả File 2: món chỉ có ở 1 bên, món khác nhóm, món lệch số tiền.
- Ngưỡng: tiền lệch ≤ 2 đồng một dòng coi là làm tròn. Số món, số tổ viên phải bằng nhau.
- Kết quả ghi `KQ_DOI_CHIEU_APP_<dd-mm-yyyy>.xlsx`. Lệch thì xếp loại A–D theo `docs/KE_HOACH_KY_DOI_CHIEU.md`, kèm kết luận theo TW.
- Thời điểm: cuối tháng (bắt buộc) và sau mỗi phiên khi làm Thông báo KL.

## 5. Đã quyết (TK 1, 14/11/2026)
1. **Mã điểm ghi 4 số cuối** (vd `3405`), không ghi tiền tố `TXN054`. → App sửa (kỳ 31/10 đang ghi đủ mã).
2. **Nhóm vay trực tiếp (`TT|<mã ấp>`) chỉ đếm khách còn dư nợ** ở cột `so_tv`; TW không có số tổ viên cho vay trực tiếp. → App sửa (2 nhóm hết dư nợ ở kỳ 30/09, 31/10 app đang đếm khách tất nợ).
3. **Tổ có trên Mẫu 01/TV mà không có trong Mẫu 31:** vẫn ghi 1 dòng, ấp / điểm / Hội lấy theo File Tổ trưởng cùng ngày. → Giao ban đã áp (`bang_so_lieu.py` 1.9, chạy lại 30/09: khớp dòng app).
4. **File 2 chỉ ghi mã KH và số khế ước, không ghi họ tên** (file trên Drive dùng chung; khi làm văn bản mỗi bên tự tra tên từ Mẫu 31).

## 6. Lộ trình và phiên bản
| Phiên bản | Nội dung | Thời điểm |
|---|---|---|
| 1.0 | File 1 như hiện nay + 3 điểm ở mục 5 | Kỳ 30/11/2026 |
| 1.1 | Thêm File 2 (danh sách món), nâng `doi_chieu_app.py` | Sau khi anh duyệt khuôn, chạy song song 2 kỳ |
| 1.2 | Khung văn bản và file cấu hình kỳ dùng chung, để App dựng được văn bản khi cần | Sau 1.1 ổn định |

## 7. Việc của từng bên
- **TK 1 (Giao ban):** ✓ ghi khuôn (file này) · ✓ `bang_so_lieu.py` theo mục 5.3 · làm File 2 và nâng `doi_chieu_app.py` (bản 1.1).
- **TK 2 (App):** sửa theo mục 5.1, 5.2 (bản 1.0, kịp kỳ 30/11) · xuất File 2 cùng khuôn (bản 1.1).
