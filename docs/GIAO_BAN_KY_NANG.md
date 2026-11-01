# bàn giao kỹ năng làm bộ văn bản giao ban (TK 1 → TK 2)

> **Bản 1.1 · 31/10/2026** · TK 1 (Project giao ban) soạn theo thư TK 2 (mục 14, 31/10) và lời anh Nhân 31/10: *"bàn giao đầy đủ để app có thể làm được 1 bộ chuẩn như bên giao ban, có kiểm tra đối chiếu độ tin cậy"*. Anh chọn **cách 1**: **repo chỉ giữ khuôn + luật**; **dữ liệu thật** (bộ ví dụ, đáp án số, văn bản đã phát hành) để trên **Drive** — repo này công khai.
> **Vai trò anh chốt 31/10:** *"chủ yếu anh đối chiếu, còn làm chính vẫn là dự án giao ban"*. → **Giao ban (Project chat) làm văn bản chính thức**; app dựng **một bộ chuẩn song song** (số + bản nháp văn bản) để **đối chiếu độ tin cậy**, không thay giao ban. Mục 7 `PHOI_HOP_CHUNG.md` giữ nguyên.
> **Căn cứ cao nhất** cho văn bản vẫn là Google Doc **QUY_CHUAN_GIAO_BAN** (Drive `0 Hop giao ban\00_CLAUDE`, bản 2.2). Luật số liệu chung: `docs/QUY_TAC_SO_LIEU.md` (QT-C-xx). File này **tóm lại để app làm theo**; khác nhau thì theo Quy chuẩn / sổ QT và báo TK 1.
> Không có tên khách, tên tổ trưởng, mã tổ, số tiền của khách trong file này. Ví dụ dùng tên giả ("Tổ A", "hộ X").

---

## 0. Đọc nhanh — app cần làm gì

| # | Việc | Mục |
|---|---|---|
| 1 | Dựng **bộ số chuẩn** cho 1 điểm / 1 kỳ = đúng các chỉ tiêu của `so_lieu_tong_hop.json` (giao ban) | 2, 3 |
| 2 | Dựng **bản nháp văn bản** đúng khuôn: Nội dung họp (mẫu 08) · Thông báo KL theo phiên (08/GDX) · (sau) báo cáo BĐD | 4 |
| 3 | Viết **nhận định / đề xuất** theo luật chọn (ngưỡng, ưu tiên) — câu chữ theo khuôn; giao ban chuốt câu | 5 |
| 4 | **Kiểm độ tin cậy**: 4 tầng kiểm, mỗi số gắn nhãn Thực tế / Suy luận / Chờ chốt; lệch → báo, không tự chọn | 6 |
| 5 | **Qua bộ ví dụ chuẩn** Gia Lộc 2 (số 30/09 + phiên 07/10/2026, dữ liệu thật trên Drive): khớp đáp án mới coi là đạt | 7 |

---

## 1. Dữ liệu vào và chuỗi xử lý của giao ban

**Dữ liệu vào** (Quy chuẩn mục 4; từ kỳ 31/10/2026 lấy qua sổ nạp app `Tủ hồ sơ\Số liệu\<YYYY-MM>\DANH_MUC_NAP.csv` — QT-C-09):

| Loại | Dùng cho | Bắt buộc |
|---|---|---|
| Mẫu 31 kỳ này | mọi số | ✅ |
| Mẫu 31 kỳ so sánh (cuối tháng trước; với phiên: cuối tháng trước) | ± kỳ trước, kết quả nợ đến hạn tháng trước, món KHĐ mới vào | ✅ |
| Mẫu 31 ngày 31/12 năm trước | mốc KH 1166 | ✅ |
| File Tổ trưởng **cùng ngày** Mẫu 31 | ấp, điểm của tổ (QT-C-10, 11, 13) | ✅ từ 31/10/2026 |
| Chấm điểm tổ: CLT02 (tháng + định kỳ), dự phòng BC0437 | xếp loại tổ | khi có |
| 3 tháng KHĐ của TW (mẫu 14) | kiểm danh sách KHĐ kỳ cuối tháng | ✅ cuối tháng |
| KQGD của phiên (PDF) | chỉ **đối chiếu** + câu "tại phiên giao dịch ngày …" của TB KL | khi làm TB KL |

**Chuỗi script giao ban** (Drive `0 Hop giao ban\06_CONG_CU\v2` — TK 2 đọc thuật toán gốc ở đây):

```
bang_so_lieu.py <gốc> <kỳ> <kỳ trước> 31-12-<năm trước> --ra=<04>/<YYYY-MM>   → Bang_so_lieu_chuan_SL<kỳ>.xlsx (toàn PGD, sheet 6_Kiem_tra) + DOI_CHIEU_GB_<ngày>.csv
tong_hop.py <gốc> <kỳ> <kỳ trước> <04>/<YYYY-MM>[/<Diem>_phien_<dd-mm>] 31-12-<năm trước>   → so_lieu_tong_hop.json + doi_chieu.txt (4 điểm)
nd_hop_m08.py <json> <cau_hinh_ky.json> <05>/<YYYY-MM> <Diem>        → Nội dung họp (thân bài + _PHU_LUC)
tb_kl.py <json> <cau_hinh_kl.json> <05>/<YYYY-MM> <Diem>             → Thông báo KL (theo phiên: "theo_phien": true)
xuat_pdf.py <ND.docx> <PHU_LUC.docx> <thư mục> "<tên điểm>"          → PDF gửi Hội (thân bài + Phụ lục 1)
bc_bdd_so_lieu.py / bc_bdd_9t.py                                     → báo cáo Ban đại diện (theo xã, theo quý)
doi_chieu_app.py                                                     → KQ_DOI_CHIEU_APP_<ngày>.xlsx (so với DOI_CHIEU_APP của app)
```

- `cau_hinh_ky.json` / `cau_hinh_kl.json` = phần **người viết** (văn bản mới, nhận định, kiến nghị, cờ trình bày). Số liệu luôn từ `so_lieu_tong_hop.json`.
- Phiên bản đang dùng 31/10/2026: `bang_so_lieu.py` 1.7 · `tong_hop.py` 2.22 · `nd_hop_m08.py` 1.9 · `tb_kl.py` 3.2.

**Một bộ số cuối tháng N → 2 văn bản:** Nội dung họp **tháng N+1** + Thông báo KL **tháng N** (tháng cũ). **Từ 10/2026 TB KL làm theo từng phiên**: số đến ngày giao dịch (Mẫu 31 ngày phiên), so với cuối tháng trước; cho vay / thu nợ = **lũy kế từ đầu tháng đến ngày phiên**.

---

## 2. Từ điển chỉ tiêu — `so_lieu_tong_hop.json`

Cấu trúc: `{ngay_sl, ngay_truoc, nguon_dia_ban, ban, diem: {<Diem>: {...}}}`. `<Diem>` không dấu: `GiaLoc`, `GiaLoc2`, `TruongMit`, `TruongMit2` (điểm khác theo `pham_vi_<ten>.json`). Đơn vị tiền: **triệu đồng** (số gốc đồng ÷ 1e6, giữ số lẻ; làm tròn khi in).

### 2.1 Theo Hội — `diem.<D>.hoi.<HND|HPN|HCCB|DTN>`

Hội theo **Mã ĐVUT** (QT-C-06): 11 HND · 12 HPN · 13 HCCB · 14 ĐTN (json ghi `DTN`; file đối chiếu giao ban ghi `ĐTN`). Khác / trống = **trực tiếp** (2.2). Mỗi số món vay chỉ tính **1 lần / số khế ước** (QT-C-01).

| Khóa | Nghĩa | Cách tính từ Mẫu 31 |
|---|---|---|
| `du_no` | Dư nợ | Σ "Tổng dư nợ" |
| `nqh` / `khoanh` | Nợ quá hạn / nợ khoanh | Σ "Dư nợ quá hạn" / "Dư nợ khoanh" |
| `cho_vay` | Doanh số cho vay | Σ ("Giải ngân trong tháng" − "Đảo khoản GN tháng") — QT-C-02 |
| `thu_no` | Doanh số thu nợ | Σ ("Thu nợ TH tháng" + "Thu nợ QH tháng" + "Thu nợ khoanh tháng") — **mọi khế ước, kể cả đã tất nợ trong tháng** |
| `lai_ton` | Lãi tồn | Σ ("Lãi tồn TH" + "Lãi tồn QH") — QT-C-03 |
| `tien_gui` | Tiền gửi TK 105 | Σ "Số dư tiền gửi 105" **mỗi sổ 1 lần**, sổ gắn tổ |
| `so_kh_du_no` | Tổ viên còn dư nợ | số Mã KH có dư nợ > 0 |
| `so_kh_tat_no_con_tg` | Tổ viên tất nợ còn TK 105 | Mã KH không còn dư nợ nhưng sổ 105 > 0 |
| `so_ho` | Số khách hàng (json) | `so_kh_du_no + so_kh_tat_no_con_tg`. **Văn bản từ số liệu 31/10/2026 dùng `so_kh_du_no`** — câu ghi "với … khách hàng còn dư nợ" (QT-C-14, anh chốt 31/10; script `ap_k1` gán `so_ho = so_kh_du_no` lúc dựng văn bản). Văn bản đã phát hành (đến 30/10) dùng `so_ho` cũ, câu "với … khách hàng" |
| `so_to` | Số tổ | tổ có khách hàng (Mã KH còn dư nợ, hoặc tất nợ còn TK 105 > 0) hoặc dư nợ > 0 — app cùng cách là đúng |
| `du_no_truoc`, `so_to_truoc` | Kỳ so sánh | `du_no_truoc` xếp theo **vị trí hiện nay của khế ước** (QT-C-21, từ `tong_hop.py` 2.22); `so_to_truoc` = số tổ thật kỳ trước |
| `du_no_tang`, `tien_gui_tang`, `lai_ton_tang` | ± so kỳ trước | kỳ này − kỳ so sánh (đã xếp theo QT-C-21) |
| `khd_mon`, `khd_du` | Món 3 tháng KHĐ: số món, dư nợ | danh sách mục 3.3 |
| `ndh`, `ndh_ho` | Nợ đến hạn **tháng tới**: tiền, số hộ | QT-C-17 (mục 3.4). Tiền = **toàn bộ dư nợ của món** có ngày đến hạn (gia hạn / HĐ) rơi vào tháng tới — **không** phải số tiền kỳ trả; chưa tính kỳ con phân kỳ CV 597 |

### 2.2 Trực tiếp — `diem.<D>.truc_tiep`

`du_no, nqh, khoanh, cho_vay, thu_no, lai_ton, so_mon, so_ho, du_no_tang` — cùng cách tính. Gán điểm **theo ấp của món vay** (QT-C-11). Bảng II.1 mẫu 08: dòng **"I. TRỰC TIẾP"**, **"II. ỦY THÁC"**, dòng Cộng gồm cả trực tiếp. *Lãi tồn trong câu nhận định = cộng các Hội* (không gồm trực tiếp).

### 2.3 Danh sách chi tiết (mỗi phần tử = 1 món, thông tin chung: `hoi, ma_to, to, kh, ct, soku, thon, ma_kh, ls, ngay_gd, thang_lai, tien_gui_kh`)

| Khóa | Gồm món | Trường riêng |
|---|---|---|
| `nqh_list` | dư nợ QH > 0 | `so_tien` (dư QH), `ngay` (ngày chuyển QH), `ngay_cach` (`he_thong` / `gdxa_he_thong` / `QT-C-12`), `den_han_cuoi`, `moi` (chuyển QH trong tháng), `lai_ton` |
| `khoanh_list` | dư khoanh > 0 | `so_tien`, `het_han` (ngày hết hạn khoanh) |
| `khd_list` | món 3 tháng KHĐ (3.3) | `du_no`, `moi` (mới vào so kỳ trước), `den_han`, `qua_han` |
| `gn_list` | giải ngân trong tháng > 0 | `so_tien`, `ngay`, `ngay_dau`, **`ky_dau`** (= khoản vay mới HD 727: giải ngân lần 1 trong tháng) |
| `ndh_list` | nợ đến hạn tháng `ndh_thang` | `so_tien`, `den_han`, `gn_goi_y` (= số thu nợ, dùng bảng III.1) |
| `ndh_sau_list`, `ndh_sau` | nợ đến hạn tháng sau nữa | `ndh_sau.{thang, so_mon, so_tien, hoi}` |
| `ndh_kq` | **kết quả** nợ đến hạn tháng trước | `da_thu`, `con_lai`, `qua_han`, `den_han_moi`, `kq` |
| `khd_list_truoc`, `nqh_list_truoc`, `to_truoc` | kỳ so sánh | dùng cho "mới vào", ± theo tổ |
| `to` | từng tổ | `ma, ten, hoi, thon, so_kh, kh_du_no, du_no, nqh, khoanh, cho_vay, thu_no, tien_gui, lai_ton, lt3_mon, lt3_tien` (món lãi tồn > 3 tháng lãi), `tk_thap` (tổ viên tiền gửi < 500 nghìn), `cham_diem`/`clt` khi có |
| `moc` | 31/12 năm trước | `ngay, du_no, nqh, khoanh, lai_ton, tien_gui, khd_mon, khd_du` |
| `xep_loai`, `xep_loai_hoi`, `cham_diem` | chấm điểm tổ | chỉ khi có CLT02 / BC0437 (mục 5.3) |

---

## 3. Luật số liệu riêng của văn bản (ngoài QT-C)

### 3.1 Ngày chuyển quá hạn (Quy chuẩn 5.1, QT-C-12)
Có "Ngày CNQH gần nhất" → theo hệ thống. Trống → "Ngày ĐH theo GDXA" nếu có → không thì **phiên đầu tiên của điểm kể từ ngày đến hạn cuối** (gia hạn, không thì hợp đồng); món trực tiếp: ngay sau ngày đến hạn. Không có ngày đến hạn → để trống. **Không bao giờ ghi "trước ngày 31/12/2025".** Thời gian quá hạn để phân cấp KH 1166 tính từ ngày này.

### 3.2 Phân cấp nợ quá hạn (KH 1166, cột "Mức" A–D)
1 tháng → Tổ trưởng · 2 tháng → Hội cấp xã · 3 tháng → NH + Hội + Trưởng ấp · **từ 4 tháng → lãnh đạo PGD tham mưu UBND xã**.

### 3.3 Món 3 tháng KHĐ dựng từ Mẫu 31 (Quy chuẩn 5.3 — khớp 100% TW qua 11 kỳ)
1 lần / khế ước · món OPEN, dư nợ > 0 · **bỏ món có nợ khoanh** · **bỏ HSSV (mã CT 02)** · "Ngày giao dịch gần nhất" **trước hẳn** ngày số liệu lùi 3 tháng · **nước sạch mã quyết định 37: bỏ món vay chưa đủ ~9 tháng** (cách lập báo cáo của TW, không phải quy định — không viết "được miễn") · kỳ giữa tháng: ô ngày giao dịch trống lấy Mẫu 31 cuối tháng trước.
**Kỳ cuối tháng phải đúng danh sách TW** (lệch → theo TW, báo từng món); kỳ phiên cho lệch nhỏ.

### 3.4 Nợ đến hạn (QT-C-17)
Còn dư nợ, chưa QH, ngày ĐH theo gia hạn (chưa gia hạn: hợp đồng) rơi vào tháng tới. Bảng III.1: **giải ngân = thu nợ** (vốn thu về cho vay lại), không ghi ngày giải ngân dự kiến.

### 3.5 Phân tích
- Lãi tồn đo bằng **số tháng lãi** (QT-C-04). Ngưỡng giao ban: **> 3** cần theo dõi (món sắp đến hạn mà > 3 tháng lãi → Hội, Tổ đặc biệt theo dõi) · **< 6** và mới vào KHĐ → xử lý được trong tháng · **≥ 12** → lưu ý xử lý rủi ro hoặc có biện pháp.
- Tiền gửi của hộ **< 500 nghìn** là thấp.
- Nợ khoanh **sắp hết hạn trong 120 ngày** → nhắc VB 368, Mẫu 01/QLNK.
- Lãi tồn **chỉ so tháng trước** (không so 31/12). KH 1166 so **31/12 năm trước**.

---

## 4. Khuôn văn bản

### 4.1 Nội dung họp giao ban — "Bản theo mẫu 08" (từ tháng 10/2026, `nd_hop_m08.py`)
- **Đầu:** khối tên cơ quan 2 dòng ("NGÂN HÀNG CHÍNH SÁCH XÃ HỘI" / "PHÒNG GIAO DỊCH GÒ DẦU" đậm) + Quốc hiệu, tiêu ngữ; **không có** dòng "Số:", dòng địa danh ngày tháng → "NỘI DUNG HỌP GIAO BAN THÁNG MM/YYYY" → tên điểm → *(Số liệu đến ngày DD/MM/YYYY)*.
- **Thân bài** (đánh số gộp, xếp theo 4 phần TB KL mẫu 08):
  - **I.** Văn bản mới (không chia mục): văn bản mới trước (nhóm tháng của ngày số liệu) → 1 gạch đầu dòng văn bản thường xuyên (722, 727, 597, 132, 180) → khối sắp xếp Tổ.
  - **II.** 1 Kết quả theo Hội (bảng có TRỰC TIẾP / ỦY THÁC) · 2 Nợ quá hạn · 3 Nợ khoanh · 4 Món 3 tháng KHĐ, lãi tồn · 5 Chất lượng Tổ, đối chiếu KH 1166 · (điểm chính) 6 Kết quả chung toàn xã/phường.
  - **III.** Đúng 4 tiêu đề mẫu 08: 1 Kế hoạch thu nợ, giải ngân (III.1 a = kết quả thu nợ đến hạn tháng trước, liền kế hoạch tháng này) · 2 Kiểm tra, giám sát (khoản vay mới 30 ngày, 100% món KHĐ — HD 727) · 3 Đôn đốc, xử lý nợ · 4 Nội dung khác.
  - **IV.** Nhận định chung, kiến nghị, đề xuất (không chia mục).
- Mỗi mục mở đầu **1 câu kết luận in đậm**; mỗi số nêu **một nơi**; thân bài dừng ở **Hội và Tổ**, danh sách hộ sang phụ lục (trừ nợ quá hạn và danh sách ≤ 5 hộ); việc phải làm chỉ ở III–IV.
- **Phụ lục 1** = bảng tổng các Hội (in trước, ≤ 2 tờ 2 mặt) · **Phụ lục 2** = từng Hội (mỗi Hội 1 trang, ≤ 2 mặt): chỉ danh sách nợ quá hạn, nợ khoanh, món KHĐ, nợ đến hạn. In 2 mặt: mỗi phần bắt đầu trang lẻ.
- **Ký:** "TỔ TRƯỞNG TỔ GIAO DỊCH" (trái), "PHÊ DUYỆT CỦA BAN GIÁM ĐỐC" (phải), không có dòng "(Ký, ghi rõ họ tên)".
- **PDF gửi Hội** = thân bài + Phụ lục 1.

### 4.2 Thông báo kết luận theo phiên — mẫu 08/GDX (VB 4368; từ tháng 10/2026, `tb_kl.py` `"theo_phien": true`)
- Khối tiêu đề 2 cột, "Số: /TB-KLGB", "Tây Ninh, ngày … tháng … năm" → "THÔNG BÁO" / "Kết luận cuộc họp giao ban tháng MM/YYYY" / "Tại điểm giao dịch …". **Không** dòng "(Số liệu đến ngày …)".
- Đoạn mở: ngày phiên, thành phần; **thông tin không có (chủ trì, vắng mặt, lãnh đạo UBND) thì không viết**.
- **I. Chính sách mới trong tháng** = đúng Phần I Nội dung họp cùng phiên (đã triển khai tại cuộc họp).
- **II. KẾT QUẢ THỰC HIỆN TẠI ĐIỂM GIAO DỊCH (đến ngày …)**: II.1 câu mở "Tổng dư nợ đạt … triệu đồng, với … khách hàng, thông qua … Tổ TK&VV; trong đó cho vay trực tiếp …, ủy thác …(tăng … so với ngày …)" + bảng 11 cột (Stt | Đơn vị | Số tổ | Số khách hàng | DS cho vay | DS thu nợ | Dư nợ | Tỷ trọng % | NQH | Khoanh | Số món KHĐ) có I. TRỰC TIẾP / II. ỦY THÁC + câu **"Biểu Kết quả giao dịch tại điểm giao dịch kèm theo."** + câu kết quả phiên theo KQGD (giải ngân, thu nợ, thu lãi, thu / chi tiết kiệm). II.2 Tồn tại: nợ quá hạn · nợ khoanh (hạn 120 ngày) · món KHĐ (± so cuối tháng trước, theo Hội) · chất lượng Tổ · nợ đến hạn tháng này (đã thu đến ngày phiên, còn lại) · nợ đến hạn tháng tới · lãi tồn (± tháng trước, tổ cao) · vốn chưa giải ngân (câu chung) · đối chiếu KH 1166 · huy động. (Điểm chính) II.3 đánh giá chung toàn xã/phường.
- **III. NHIỆM VỤ THÁNG TIẾP THEO**: III.1 bảng 5 cột Hội → Tổ (Stt | Đơn vị/Tổ | Chương trình | Số tiền thu nợ | Số tiền giải ngân) + "(Danh sách nợ đến hạn đính kèm)" — **phụ lục danh sách nợ đến hạn GIỮ**; III.2 kiểm tra giám sát; III.3 đôn đốc xử lý nợ; III.4 khác.
- **IV. KIẾN NGHỊ, ĐỀ XUẤT**: ngắn, có nhiệm vụ của Hội (đến sớm điểm giao dịch, kiểm tra giám sát Tổ, hỗ trợ tổ còn nhiều món tồn lãi).
- **Nơi nhận:** điểm chính: Đảng ủy, UBND (để b/c) + …; **điểm phụ: không gửi UBND** — "Các tổ chức CT-XH nhận ủy thác; Các Trưởng ấp/khu phố, Tổ trưởng Tổ TK&VV; Ban Giám đốc, Tổ trưởng Tổ KH-TD; Lưu: VT, CBTD". Ký **GIÁM ĐỐC**.
- **Chấm điểm:** không có kết quả chấm điểm của kỳ → **không nêu xếp loại**; đánh giá tổ theo NQH, món lãi tồn > 3 tháng lãi, tổ viên tiền gửi < 500 nghìn.
- Tên hộ trong ngoặc ngay trong câu, nhóm theo Hội; **> 10 hộ/món thì gom theo tổ** ("tổ A 10 món/191,0; …").
- Ngày ký: trong 3 ngày làm việc sau phiên (mặc định ngày làm việc kế tiếp).

### 4.3 Báo cáo Ban đại diện (theo xã/phường, theo quý — `bc_bdd_9t.py`)
6 phần đúng mẫu `02_MAU_BIEU\Mau_bao_cao\Dự thảo sườn báo cáo họp BĐD.docx`; so đầu quý, đầu năm; lãi tồn so tháng trước; chỗ chưa có thông tin → *[Cần bổ sung: …]* nền vàng (riêng loại sườn này được để trống); giọng UBND chỉ đạo; ký "TM. BAN ĐẠI DIỆN HĐQT NHCSXH – TRƯỞNG BAN – CHỦ TỊCH UBND". Căn cứ thay QĐ 162 bằng **QĐ 56/QĐ-HĐQT**. *App làm sau cùng — chưa cần ngay.*

### 4.4 Cách viết (Quy chuẩn 12)
- **Chỉ viết điều biết chắc** (từ 10/2026): không có số → bỏ qua; không "chưa xác định", "sẽ cập nhật", không "……".
- Không ghi ngày script tự tính (giải ngân dự kiến, hạn kiểm tra cụ thể) — ghi "tháng tới", "trong vòng 30 ngày kể từ ngày giải ngân". Ngày thực tế từ dữ liệu vẫn ghi.
- Giọng nhẹ ("mong", "cần quan tâm thêm"); **tránh** "khẩn trương", "quyết liệt", "nghiêm trọng", "yêu cầu". Từ 10/2026 dùng "đề nghị" với Hội/Tổ; tháng cũ (≤ 09/2026) không dùng "đề nghị", "yêu cầu".
- Với UBND: "tranh thủ sự lãnh đạo của UBND … trong việc chỉ đạo các ban, ngành liên quan phối hợp, hỗ trợ thực hiện" — không đề nghị cụ thể.
- **Xã ghi "ấp", phường ghi "khu phố"** (không ghi "ấp/khu phố"). Tên TW "thôn" → ấp / khu phố.
- Tên người: bỏ "Ông", "Bà" đầu tên; viết hoa đầu từ; tên không dấu để nguyên.
- Bảng: Hội viết tắt (HND, HPN, HCCB, ĐTN); văn xuôi tên đầy đủ (Hội Nông dân, Hội Liên hiệp Phụ nữ, Hội Cựu chiến binh, Đoàn Thanh niên).
- **Không nêu KH 958** cho số từ 30/09/2026 (VB 1047 thay); tiêu chí sắp xếp Tổ vẫn nêu: theo ấp/khu phố, phấn đấu 50–90 tổ viên (khung 20–100 QĐ 70), ≤ 30 Tổ/điểm, Ban quản lý ≤ 70 tuổi, không còn Tổ NQH > 2%, 99% Tổ Tốt Khá, hạn 25/12/2026.
- Văn bản căn cứ đúng số, ngày theo `01_VAN_BAN_CAN_CU\_TOM_TAT` (Google Doc). Ngày đã chốt: QĐ 70 = 27/08/2026 · HD 4368 = 29/09/2026 · HD 4309 = 23/09/2026 · **CV 18047 = 30/09/2026**. Phần I chỉ đưa văn bản liên quan tín dụng tại xã.

### 4.5 Thể hiện số và trình bày (Quy chuẩn 5.4, 13)
- Triệu đồng, định dạng Việt Nam `57.012,4`; **số chẵn không ghi ",0"** (`1.690`); số lẻ 1 chữ số (`197,6`); tỷ trọng % 2 chữ số (`59,39`). Ô bảng = 0 ghi "-"; văn xuôi "không phát sinh".
- Times New Roman 14, giãn dòng 1,15, cách đoạn 3pt, A4, lề T3–P2–T2–D2 cm. Gạch dưới tên cơ quan / tiêu ngữ bằng **đường kẻ Shape (Line)** (tên cơ quan dài 1/2 dòng chữ, tiêu ngữ bằng dòng chữ).
- Bảng: cột **Hội → Tổ trưởng → Khách hàng**; ô liền nhau cùng Hội/Tổ thì **gộp**; dòng tiêu đề nhóm Hội tô nền, đậm; bảng dài lặp dòng tiêu đề, không ép liền trang.
- Excel xuất ra **luôn hiện đường lưới**.

---

## 5. Luật nhận định — chọn gì để nêu

### 5.1 Đèn tín hiệu (Bảng số liệu chuẩn sheet 8a theo điểm / 8b theo tổ; ngưỡng `NG_DEN` đầu `bang_so_lieu.py`, anh duyệt 28/10)

| Đèn | Xanh | Vàng | Đỏ | Căn cứ |
|---|---|---|---|---|
| Tỷ lệ NQH | < 0,15% | ≥ 0,15% nhưng NQH giảm so kỳ trước | còn lại | KH 1166 |
| Món 3 tháng KHĐ so 31/12 | giảm ≥ 20% (hoặc 0/0) | giảm < 20% | không giảm | KH 1166 |
| Lãi tồn so tháng trước | không tăng | — | tăng | KH 1166 |
| Tổ Yếu | 0 | — | > 0 | KH 1166 |
| Tổ Trung bình so 31/12 | 0 hoặc giảm ≥ 30% | giảm < 30% | không giảm | KH 1166 (năm 2025 không có tổ TB → viết "cố gắng không để phát sinh", không viết "giảm 30%") |
| Số tổ / điểm | ≤ 30 | > 30 | — | TB 1006 |
| Tổ có NQH | không tổ nào > 1% | có tổ 1–2% | có tổ ≥ 2% | VB 4289 |
| Quy mô tổ (sheet 8b) | 50–90 tổ viên | 20–49 hoặc 91–100 | ngoài 20–100 | QĐ 70 / định hướng |

### 5.2 Chọn nêu tên (thân bài)
- Nợ quá hạn: **nêu hết từng món** (bảng: Hội → Tổ → hộ, ngày chuyển QH, mức A–D).
- Món KHĐ: thân bài theo Hội/Tổ; nêu bật **món mới vào** và **≥ 12 tháng lãi**; danh sách hộ ở phụ lục.
- Lãi tồn: nêu **tổ có nhiều món > 3 tháng lãi** (thường 3 tổ cao nhất), không nêu hộ.
- Nợ đến hạn: theo Hội; hộ có **lãi tồn > 3 tháng lãi** hoặc **tiền gửi < 500 nghìn** → "cần quan tâm".
- Danh sách ≤ 5 hộ được nêu tên trong thân bài; nhiều hơn → phụ lục.

### 5.3 Chất lượng tổ
- Có CLT02 → xếp loại tháng + lũy kế, phân tích tổ TB/Yếu do tiêu chí nào. Chưa có CLT02 → BC0437 (lũy kế từ đầu năm), chỉ ghi kết quả lũy kế. Không có cả hai → **không nhắc xếp loại**.
- Tổ NQH > 1% bắt đầu mất điểm, ≥ 2% mất trọn 30 điểm (VB 4289) → nêu là diện cần quan tâm.
- Tổ đổi Tổ trưởng: tên theo Mẫu 31 kỳ chốt.

### 5.4 Khuôn câu nhận định (mẫu, số giả)
> Tháng MM/YYYY, hoạt động tín dụng chính sách tại điểm giao dịch [Điểm] tiếp tục ổn định. Tổng dư nợ đạt [x] triệu đồng, tăng [a] triệu đồng so với tháng trước và tăng [b] triệu đồng so với ngày 31/12/[năm]; trong tháng giải ngân [n] món/[y] triệu đồng tại phiên giao dịch ngày [dd/mm]. Số dư tiền gửi tiết kiệm qua Tổ đạt [z] triệu đồng, tăng [c] triệu đồng so với tháng trước.
> Chất lượng tín dụng được giữ vững: [không phát sinh nợ quá hạn | nợ quá hạn … ]; nợ khoanh [k] triệu đồng/[m] món, [đều còn trong hạn khoanh]; món vay từ 3 tháng trở lên không hoạt động còn [p] món/[q] triệu đồng, giảm [r] món so với tháng trước và giảm [s] món so với ngày 31/12/[năm].
> Một số nội dung cần tiếp tục quan tâm: lãi tồn [l] triệu đồng, tăng [t] triệu đồng so với tháng trước, số lãi tồn cao tại tổ A, tổ B, tổ C; …

Đề xuất (Phần IV): mỗi ý 1 câu, chủ ngữ là **Hội / Tổ trưởng** cụ thể, có việc + căn cứ (vd "kiểm tra sử dụng vốn đối với [n] khoản vay mới giải ngân ngày [dd/mm] trong thời hạn 30 ngày; kiểm tra 100% món vay từ 3 tháng trở lên không hoạt động ([p] món); nộp Phiếu kiểm tra mẫu 06/TD, Biên bản mẫu 16/TD tại phiên giao dịch gần nhất (HD 727/HD-NHCS)"). Câu cuối với UBND theo khuôn 4.4.

---

## 6. Kiểm tra độ tin cậy

Mỗi bộ chuẩn app dựng phải chạy đủ 4 tầng, ra **bảng kiểm** (Đạt / Lệch / Không kiểm được + lý do). **Lệch → báo anh và TK 1, không tự chọn nguồn, không sửa nguồn** (QT-C-08).

### Tầng A — cân đối nội bộ (sai số 0,001 triệu)
1. Σ Hội + trực tiếp = tổng điểm; Σ điểm = toàn PGD (dư nợ, NQH, khoanh, tiền gửi).
2. Σ dư nợ theo chương trình = tổng dư nợ.
3. **Đầu kỳ + cho vay − thu nợ = cuối kỳ** theo Hội (sau khi xếp kỳ trước theo QT-C-21; chênh do xóa nợ / điều chỉnh → liệt kê món).
4. Σ `to[].du_no` = `hoi.du_no` từng Hội; số tổ = số dòng `to`.
5. Danh sách = tổng: Σ `nqh_list` = `nqh`; Σ `khoanh_list` = `khoanh`; Σ `khd_list.du_no` = `khd_du`; Σ `ndh_list` = `ndh`; Σ `gn_list` = `cho_vay`.
6. Số dòng Mẫu 31 / số khế ước (phát hiện lặp dòng).

### Tầng B — đối chiếu nguồn ngoài
1. **Món 3 tháng KHĐ dựng / danh sách TW**: kỳ cuối tháng phải khớp từng món (thiếu, thừa → liệt kê).
2. **KQGD của phiên**: dư nợ từng Hội, giải ngân, thu nợ phiên khớp KQGD (KQGD chỉ để kiểm).
3. Tổ có xếp loại (CLT02/BC0437) / số tổ — thiếu tổ nào ghi rõ.
4. File Tổ trưởng: tổ có Hội khác Mẫu 31 · món ở ấp khác ấp của tổ · ấp thuộc nhiều điểm (QT-C-10) — đếm và liệt kê.
5. **Ngày**: Mẫu 31 và File Tổ trưởng cùng ngày (QT-C-09/22) — khác ngày thì **không chốt số**.

### Tầng C — đối chiếu chéo app ↔ giao ban (`DOI_CHIEU_APP_<ngày>.csv` ↔ `DOI_CHIEU_GB_<ngày>.csv`, `doi_chieu_app.py`)
Phân loại lệch (`KE_HOACH_KY_DOI_CHIEU.md`): **A** cùng luật mà lệch (lỗi code, phải sửa) · **B** luật chưa chốt (K4, K5, K9 — chờ anh) hoặc **khác định nghĩa** (tổng tổ viên app / giao ban — QT-C-14) · **C** khác phạm vi / thời điểm nguồn · **D** làm tròn. Kỳ 29/10 đã khớp tuyệt đối các tổng tiền; còn mở: thu nợ (món tất nợ trong tháng, tổ đã đóng), 1 tổ thiếu mã xã, dòng trực tiếp toàn 0, tổ viên +59 (K1) — hộp thư 31/10.

### Tầng D — đối chiếu văn bản đã phát hành (bộ ví dụ chuẩn, mục 7)
- Mọi số trong bảng II.1, III.1, câu nhận định của văn bản đã phát hành phải khớp số app dựng (sai số làm tròn 0,05).
- Rà chữ: không còn "……", ",0" ở số chẵn, "yêu cầu", "ấp/khu phố", "trước ngày 31/12/2025", "(Số liệu đến ngày …)" trong TB KL; mục I TB KL = Phần I Nội dung họp cùng phiên; điểm phụ không có UBND ở Nơi nhận.

### Nhãn độ tin cậy cho từng số / câu
| Nhãn | Khi nào |
|---|---|
| **Thực tế** | tính thẳng từ Mẫu 31 / file nguồn cùng ngày, qua tầng A–B |
| **Suy luận** | có bước suy ra: ngày chuyển QH theo QT-C-12, điểm của món trực tiếp theo ấp, KHĐ kỳ giữa tháng (điều kiện 7), ghép CLT02 theo thứ tự mã tổ, số tháng lãi khi lãi suất = 0 |
| **Chờ chốt** | phụ thuộc luật chưa chốt (K4, K5, K9) hoặc nguồn lệch chưa xử lý |

Văn bản chính thức chỉ dùng số **Thực tế**; số **Suy luận** dùng được khi luật đã chốt (QT-C) và ghi trong bảng kiểm; **Chờ chốt** không đưa vào văn bản.

---

## 7. Bộ ví dụ chuẩn (dữ liệu thật — trên Drive, không vào repo)

**Thư mục:** Drive `0 Hop giao ban\00_PHOI_HOP\BAN_GIAO_APP\VD_GiaLoc2_2026-10\` (bản sao; bản gốc ở `04_DU_LIEU_XU_LY\2026-10`, `05_BAO_CAO\2026-10` — không sửa).

| File | Nội dung |
|---|---|
| `A1`, `A2` | Nội dung họp tháng 10/2026 điểm Gia Lộc 2 (số 30/09/2026) — thân bài, phụ lục, bản đã dùng tại phiên 07/10 |
| `A3`, `A4`, `A5`, `A6` | `so_lieu_tong_hop.json` 30/09 · `cau_hinh_ky.json` · Bảng số liệu chuẩn 30/09 · `doi_chieu.txt` |
| `B1` | Thông báo KL phiên 07/10/2026 Gia Lộc 2 — đã phát hành |
| `B3`, `B4`, `B5`, `B6`, `B7` | `so_lieu_tong_hop.json` phiên 07/10 · `cau_hinh_kl.json` · Bảng số liệu chuẩn 07/10 · `doi_chieu.txt` · KQGD 07/10 |
| `C1_DAP_AN_GiaLoc2.md` | **Đáp án số**: theo Hội × chỉ tiêu, số dòng / tổng từng danh sách, mốc 31/12, ghi chú đọc |

**Chạy đáp án đầy đủ (kèm từng tổ):** `python3 tools/dap_an_giao_ban.py GiaLoc2 <A3>.json <B3>.json` → `DAP_AN_GiaLoc2.xlsx` (hiện lưới) + `.csv` dạng dài `ky, diem, hoi, chi_tieu, gia_tri` — app xuất cùng dạng là so được bằng máy. Chạy ở máy / thư mục ngoài repo; **không commit** file đầu ra.

**Tiêu chí đạt:** (1) bảng Hội × chỉ tiêu 2 kỳ khớp đáp án (sai số 0,05 triệu); (2) số dòng + tổng các danh sách khớp; (3) bản nháp văn bản app dựng có đủ đề mục, bảng, câu của A1 / B1, các số trong câu trùng văn bản đã phát hành.

**Lưu ý đã biết của bộ ví dụ** (ghi đủ trong `C1`):
- Phiên 07/10: 1 món trực tiếp Hồ sơ tín dụng để trống ngày GDXA → giao ban gán theo KQGD (khóa `truc_tiep` trong `B4`) nên văn bản có dòng TRỰC TIẾP và Cộng gồm món này, json thì không. Từ QT-C-11 gán theo ấp → app phải tự ra đúng.
- Số 30/09 tính trước QT-C-21 (± theo vị trí kỳ trước). App theo QT-C-21 có thể lệch phần ± nếu trong tháng có tổ đổi Hội / chuyển tổ → báo, ghi loại lệch.
- `A4` cập nhật 19/10 (thêm 2 văn bản cho phiên sau) nên Phần I của `A1` ít hơn `A4`.
- Văn bản tháng 10 đã phát hành dùng số khách hàng cách cũ (912 khách hàng ngày 30/09; 926 phiên 07/10). Theo QT-C-14 (từ số liệu 31/10) số khách hàng còn dư nợ là 873 / 889 (888 ủy thác + 1 trực tiếp) — app so `so_kh_du_no`.
- `B1` còn ghi CV 18047 ngày 29/09 (đúng 30/09) — văn bản đã phát hành giữ nguyên; bản app dựng phải ghi 30/09.

---

## 8. Ranh giới và việc chưa chốt
- **Văn bản chính thức do giao ban phát hành**; bản app chỉ để đối chiếu (anh 31/10). Hai bản lệch → giao ban kiểm lại số, báo anh.
- K1 đã chốt 31/10 (QT-C-14). Chờ anh: K4, K5, K9 (`PHOI_HOP_CHUNG.md` mục 6B, 13). Báo cáo BĐD: làm sau cùng.
- Kỳ đối chiếu tới: số cuối tháng 10 (anh báo **02/11 mới đủ**) — chạy bộ chuẩn 4 điểm, so 4 tầng.
- TK 2 nhận xong lên kế hoạch trình anh (thư 31/10); câu hỏi gửi TK 1 qua hộp thư mục 14.

## 9. Nhật ký
| Bản | Ngày | Nội dung |
|---|---|---|
| 1.1 | 31/10/2026 | QT-C-14 (K1): số khách hàng văn bản = tổ viên còn dư nợ từ số liệu 31/10; trả lời câu hỏi TK 2 (số tổ, nợ đến hạn) ở mục 2.1. |
| 1.0 | 31/10/2026 | TK 1 lập: quy trình, từ điển chỉ tiêu, luật văn bản, luật nhận định, 4 tầng kiểm độ tin cậy, bộ ví dụ Gia Lộc 2 (Drive) + `tools/teo_dap_an.py` |
