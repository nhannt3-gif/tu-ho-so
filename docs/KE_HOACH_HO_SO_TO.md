# Kế hoạch: Bộ hồ sơ Tổ TK&VV (QĐ 70) — điền tự động từ số liệu

> Ghi nhận 11/10/2026. Anh chốt nguyên tắc: **căn cứ số liệu điền tự động hết mức có thể; thông tin nào không có thì để chấm ghi tay.**
> File mẫu anh gửi chỉ đọc trong thư mục nháp của phiên — **không đưa vào repo**. Lời văn mẫu là mẫu công khai của ngành (QĐ 70/QĐ-HĐQT ngày 27/8/2026), không có dữ liệu thật → được nhúng vào app.
> **Đã code ở 3.170** (anh 11/10: "code cả 2 tab và gộp lên"): tab 📝 Hồ sơ Tổ (10C cũ / mới, 10A, 10B, 11/TD, 01/BG, 02/BG) + tab 📄 Hồ sơ vay (01/TD, 03/TD, 04/TD, 09A/TD) — `js/25-ho-so.js`. Còn lại: quy tắc từng mẫu vay (thời hạn, kỳ hạn, mức vay, gia hạn) bàn với anh rồi điền thêm.

## Anh chốt thêm 11/10 (sau khi gửi đủ mẫu)
- **Tab riêng "📝 Hồ sơ Tổ"** trong nhóm Số liệu (không nhét vào tab Tổ). Áp dụng đồng bộ quy tắc các tab: hàng lọc Xã · Điểm GD │ Hội · Tổ (chip kèm ấp), chip trạng thái cuối hàng Xã, 📍; chọn 1 mẫu → xem ngay khung phải; hàng xuất Word · In · PDF · Gửi.
- **⚙ Khai báo 1 lần** (lưu + đồng bộ Drive như cài đặt): PGD (tên, đại diện, chức vụ, địa chỉ, điện thoại, tỉnh in sẵn) · trưởng ấp theo từng ấp · người của Hội cấp xã (lấy sẵn từ tab Khai báo Hội đoàn thể) · **tổ phó thực tế** theo tổ (một số tổ trên máy chưa khớp thực tế) — có khai thì ưu tiên, khác máy thì chip ⚠.
- **Hàng lọc dễ nhận biết, đồng bộ mọi tab** (anh 11/10): 3 kiểu trong bản mẫu để anh chọn — A mỗi cấp 1 màu (Xã xanh dương · Điểm GD xanh lá · Hội cam · Tổ tím; nhãn + chip đang chọn cùng màu cấp) · B cả hàng lọc 1 khối khung · C 1 khối + màu từng cấp (em đề xuất C). **Anh duyệt màu; khối làm rõ hơn** (viền 2px, nền xanh nhạt, nhãn "LỌC ĐỊA BÀN", mỗi dòng 1 thanh trắng nổi + vạch màu cấp bên trái); **Điểm GD và Hội tách 2 thanh riêng** (vạch xanh lá / cam) dù cùng 1 hàng. Tên dòng (Xã · Điểm GD · Hội · Tổ) **chữ to hơn chip con (14px) và đậm hơn**. Màu cấp là token dùng chung, giữ nguyên ở mọi chỗ có Xã / Điểm GD / Hội / Tổ (cây địa bàn, chip tổ, 📍 đường dẫn, tiêu đề bảng theo cấp).
- **Tên dòng lọc nổi bật** (Xã · Điểm GD · Hội · Tổ — lớp `.pv-nhan` dùng chung mọi tab): nhãn nền xanh nhạt, viền xanh, chữ đậm, rộng đều. Áp cho **mọi tab có cây địa bàn** ở 3.167 (anh duyệt hướng 11/10, xem bản mẫu).
- Ô điền 3 màu: xanh lá = số liệu · vàng = khai báo 1 lần · viền đứt = chấm ghi tay. Sửa ô chỉ áp cho lần in đó.
- **Bố cục mẫu (dữ liệu giả)** để anh duyệt: artifact "Tab Hồ sơ Tổ — bố cục" (https://claude.ai/artifact/N81fqoLC7RwsTGL8byDjSg).

## Cách dùng (đề xuất)
Tab **📝 Hồ sơ Tổ** → chọn tổ ở hàng lọc → chọn mẫu ở cột trái → hộp chọn trước khi in (ngày họp / kỳ chốt, tích người, sửa nhanh ô điền sẵn) → **Word (.docx) đúng khổ** + 🖨 In / PDF (bộ in chuẩn). Ô app không có dữ liệu → dòng chấm như mẫu gốc.

Nguồn dữ liệu: Mẫu 31 (khách, món, nợ gốc, lãi tồn, số dư 105, CCCD, ngày vay), DSTO / LEN_31 TO_TRUONG (tổ trưởng, tổ phó, ấp), Khai báo Hội (Hội, người của Hội), Cài đặt (PGD, tỉnh), biến động tổ (`TO_BD`: mới vào / ra khỏi tổ), so 2 kỳ (tổ trưởng đổi).

## Mặc định khi anh chưa nói khác
- Mẫu 10C: chọn theo **ngày họp** — đến 30/09/2026 mẫu cũ, từ 01/10/2026 mẫu mới (đổi tay được).
- Mức tiết kiệm tối thiểu: **để chấm** (ô nhập tùy chọn trong hộp in, app nhớ mức anh gõ lần trước).
- 02/BG: **tổ viên còn dư nợ / còn nợ lãi / còn số dư 105** (khách đã tất nợ và 105 = 0 không đưa vào); hộp in có tích "gồm cả tổ viên không còn số dư".
- 11/TD Bên A: người đại diện, chức vụ, địa chỉ, điện thoại PGD lưu 1 lần ở Cài đặt; chưa khai → chấm.

## Từng mẫu — ô nào app điền, ô nào để chấm

### 10C/TD mẫu cũ (tổ viên vào tổ đến 30/09/2026) — A4 dọc
| Ô | Điền tự động | Nguồn |
|---|---|---|
| Ấp (kp), xã (phường), tỉnh Tây Ninh | ✓ | DSTO / Mẫu 31 (`tenThon`, `tenXa`); tỉnh in sẵn |
| Tên tổ, thuộc Hội | ✓ | tổ, `tdnHoi(dv)` |
| Chủ trì (Tổ trưởng), Thư ký (Tổ phó) | ✓ (tổ phó nếu DSTO / LEN có) | `t.ten`, `t.pho` |
| Trưởng ấp, đại diện Hội (tên, chức vụ) | ✓ nếu đã khai ở Khai báo Hội; không → chấm | Khai báo Hội |
| Số tổ viên dự / tổng | tổng ✓, số dự → chấm | `toTV` |
| Bảng 1 Kết nạp, bảng 2 Cho ra (STT · Họ tên │ STT · Họ tên, 2 nửa) | ✓ theo người anh tích | chip Mới vào / Ra khỏi tổ / Tất nợ – 105 = 0 |
| Tổng số tổ viên sau kỳ họp | ✓ = hiện có + kết nạp − cho ra | |
| Giờ, ngày họp, mức tiết kiệm, nội dung khác, giờ kết thúc | chấm (ngày họp điền nếu anh chọn) | |

### 10C/TD mẫu mới (QĐ 70, từ 01/10/2026) — A4 dọc
Như mẫu cũ, thêm: "Về việc …" (✓ "kết nạp, cho tổ viên ra khỏi Tổ" khi có danh sách; trống → chấm); hình thức họp (ô tích → để trống); bảng I Kết nạp │ II Cho ra (✓); **mục 2 danh sách đề nghị vay** (Họ tên · CT vay · Số tiền · Mục đích · Thời hạn) → chấm (app chưa có hồ sơ đề nghị vay); mục 4 biểu quyết → chấm. Ký: Thư ký · Tổ chức CT-XH cấp xã · Chủ trì · Trưởng thôn.

### 01/BG Bàn giao hồ sơ Tổ — A4 dọc, 2 bản
| Ô | Điền tự động |
|---|---|
| Thôn, xã, tỉnh; Hội quản lý | ✓ |
| Bên giao (tổ trưởng cũ), Bên nhận (tổ trưởng mới) | ✓ gợi ý khi so 2 kỳ thấy tổ trưởng đổi; không thấy → tổ trưởng hiện tại ở Bên giao, Bên nhận chấm |
| Ngày biên bản họp thay đổi BQL, UBND xã chấp thuận | xã ✓, ngày chấm |
| Thành phần chứng kiến | ✓ nếu đã khai ở Khai báo Hội |
| Mục 1 số bản 10A / 10B / 10C / 03TD; mục 2 việc đang làm; mục 3 ý kiến | chấm |

### 02/BG Biên bản bàn giao kiêm đối chiếu số dư tiền vay, tiền gửi — A4 ngang, đơn vị đồng
| Ô | Điền tự động |
|---|---|
| Xã; "Đến ngày" | ✓ ngày số liệu của kỳ chốt anh chọn (Mẫu 31) |
| Ông (bà) đại diện 2 Hội; Tổ trưởng bên giao / bên nhận thuộc Hội | Hội ✓; tổ trưởng như 01/BG; tên người của Hội ✓ nếu đã khai |
| Bảng cột 1–6: dòng khách (đậm: STT, họ tên, Mã khoản vay "x", tổng nợ gốc, nợ lãi, số dư 105); dòng con mỗi món (chương trình, mã khoản vay, nợ gốc, nợ lãi của món) | ✓ Mẫu 31 |
| Số dư tiền gửi | ✓ ghi 1 lần ở dòng khách (105 là theo khách, không theo món) |
| Cột 7–14 (đối chiếu, chênh lệch, nguyên nhân, chữ ký) | để trống |
| Tổng cộng; Nợ quá hạn … món, số tiền; Nợ khoanh … món, số tiền | ✓ |
| Số tổ viên chưa đối chiếu được | chấm |

### 10A/TD Thành lập tổ (3.168) — A4 dọc
Thôn, xã, tỉnh, Hội ✓; danh sách tổ viên (2 cột × 20 dòng) ✓ nếu tổ đã có trong dữ liệu (tích chọn), không → chấm; quy ước hoạt động: lời văn mẫu, ngày họp định kỳ và mức tiết kiệm → chấm; Ban quản lý: tổ trưởng / tổ phó ✓ nếu có; phần UBND phê duyệt: thôn, xã ✓, còn lại chấm.

### 10B/TD Kết nạp + thay đổi Ban quản lý (3.168) — A4 dọc
Thôn, xã, tỉnh, Hội ✓; số tổ viên tổng ✓; kết nạp (danh sách tích) ✓; "bầu … thay Ông (Bà) …" ✓ gợi ý khi so 2 kỳ thấy tổ trưởng / tổ phó đổi; lý do họp, biểu quyết → chấm; phần UBND phê duyệt: thôn, Hội ✓.

### 11/TD Hợp đồng ủy nhiệm (3.168) — A4 dọc, nhiều trang
Bên A: PGD, đại diện, chức vụ, địa chỉ, điện thoại ✓ từ Cài đặt (khai 1 lần). Bên B: tên tổ, Hội, tổ trưởng, thôn, xã, tỉnh ✓; số thẻ căn cước, ngày cấp, nơi cấp ✓ **chỉ khi tổ trưởng cũng là khách trong Mẫu 31 và khớp được tên trong tổ** (rê chuột ghi căn cứ; không chắc → chấm). Ngày biên bản 10A / 10B, ngày ký, số tài khoản nhận hoa hồng → chấm. Lời văn Điều 1–4 và mức hoa hồng: nguyên văn mẫu.

## Kèm trong 3.167 (anh đã chốt 11/10)
- Bảng cuộn trong khung (tiêu đề + dòng Cộng dính) **đồng nhất mọi bảng cùng loại**: Sao kê, KTGS… như tab Tổ.
- Chip "Mới vào": kỳ ngày → "Mới vào 07/09"; kỳ tháng → "Mới vào 31/07→31/08".

## Tab riêng "📄 Hồ sơ vay" (anh chốt 11/10)
- Tab riêng, **tách khỏi tab Hồ sơ Tổ**; cùng quy tắc bố cục: khối LỌC ĐỊA BÀN (xã · điểm GD · Hội · tổ) → chọn khách / tổ viên → chọn mẫu → xem A4 ngay khung phải → Word · In · PDF · Gửi; ô điền 3 màu (số liệu · khai báo 1 lần · ghi tay).
- Mẫu đầu tiên: **01/TD** Giấy đề nghị vay vốn kiêm phương án (theo từng chương trình, mở đầu HSSV) và **03/TD** Danh sách tổ viên đề nghị vay (theo tổ, nhiều người 1 lần).
- Người vay chọn từ Mẫu 31 (khách đã có) hoặc gõ mới (khách chưa vay); app điền tên, ngày sinh, CCCD, ngày / nơi cấp, địa chỉ, tổ, tổ trưởng, Hội; số tiền tự đổi ra chữ.
- **Mục đích chính (anh 11/10): hỗ trợ in mẫu đơn vay.** Mặc định: 1 mẫu 01/TD chung, chọn **chương trình** (danh mục CT của app); bảng phương án (Đối tượng · Số lượng · Thành tiền) có dòng gợi ý theo CT (HSSV: chi phí học tập, sinh hoạt cho sinh viên …; CT khác để trống ghi tay), sửa được trước khi in. Mẫu riêng từng CT anh gửi thêm thì thay vào sau.
- **Anh chốt nguyên tắc dữ liệu (11/10):** họ tên + thông tin tổ, Hội **lấy sẵn** từ số liệu; **chương trình vay, mục đích vay có danh mục khai báo** (chọn, không gõ tự do); **quy tắc cụ thể (thời hạn vay, kỳ hạn trả, mức vay…) bàn kỹ riêng từng mẫu** trước khi code mẫu đó — chưa tự đặt quy tắc.
- **04/TD Thông báo kết quả phê duyệt cho vay** (anh gửi 11/10, file có tên thật → chỉ ghi cấu trúc): đầu trái "NHCSXH TỈNH TÂY NINH / PGD GÒ DẦU", đầu phải quốc hiệu, "Mẫu số 04/TD · lập 02 liên (01 lưu tổ, 01 lưu NH)"; "Gò Dầu, ngày … tháng … năm …"; THÔNG BÁO KẾT QUẢ PHÊ DUYỆT CHO VAY; Kính gửi UBND xã / phường …; 1. tổng số người được vay đợt này (kèm 03/TD) … người, số tiền … đồng, bằng chữ …; 2. số người chưa được vay … người, STT trong danh sách …, số tiền …; 3. lịch phát tiền vay … giờ … ngày … tại điểm giao dịch … (xã …); đề nghị UBND thông báo cho người vay; ký Người lập (CBTD, ghi tên) · Giám đốc (ký, đóng dấu).
  - Điền tự động: xã / phường, điểm GD + ngày giao dịch kế tiếp của điểm (gợi ý, sửa được), số người + tổng tiền + bằng chữ từ danh sách 03/TD vừa lập (hoặc anh gõ), ngày lập = hôm nay, người lập = tên CBTD (khai báo 1 lần), chức danh Giám đốc. Ghi tay: mục 2 (chưa được vay), giờ phát tiền nếu khác mặc định.
- **09A/TD Giấy đề nghị gia hạn nợ** (QĐ 54 ngày 15/9/2023; anh gửi 11/10, chỉ ghi cấu trúc): quốc hiệu, "Mẫu số 09A/TD · lập 01 liên lưu NH"; Kính gửi NHCSXH Gò Dầu; họ tên khách hàng, năm sinh, nơi cư trú; tổ viên tổ TK&VV do ông (bà) … làm tổ trưởng, thuộc Hội … quản lý; đang vay mã khoản vay … chương trình …, gốc … đồng, nợ lãi … đồng; phải trả ngày …/…/… nhưng chưa trả được vì lý do …; đề nghị gia hạn gốc … đồng, thời gian … tháng, kế hoạch trả … tháng/kỳ, … đồng/kỳ, kỳ cuối … đồng; cam kết; ký Tổ TK&VV · "…, ngày … tháng … năm …" · Người vay (ký hoặc điểm chỉ); ý kiến tổ chức CT-XH cấp xã (ký, đóng dấu); xác nhận UBND cấp xã; PHÊ DUYỆT CỦA NHCSXH (số tiền được gia hạn, thời gian gia hạn từ … đến …; CBTD · Trưởng phòng KH-NVTD (Tổ trưởng KH-NV) · Giám đốc).
  - Điền tự động: chọn **1 món vay** (Mẫu 31) → họ tên, năm sinh, nơi cư trú, tổ trưởng, Hội, mã khoản vay, chương trình, dư nợ gốc, nợ lãi (nếu file có cột lãi tồn), ngày phải trả = ngày đến hạn hợp đồng / gia hạn của món; xã / phường; ngày lập = hôm nay. Số tiền đề nghị gia hạn mặc định = dư nợ gốc (sửa được).
  - Để chấm ghi tay: lý do chưa trả, thời gian đề nghị, kế hoạch trả (tháng/kỳ, đồng/kỳ, kỳ cuối), ý kiến Hội, xác nhận UBND, toàn bộ phần phê duyệt NH. Quy tắc gia hạn (thời gian tối đa theo CT, cách chia kỳ) **bàn riêng trước khi code**, chưa tự đặt.
  - Lối vào đề xuất: trong tab Hồ sơ vay chọn khách → món; thêm nút "In 09A" ở danh sách món **đến hạn / quá hạn** của tab Tổ (chip "Đến hạn tháng sau") — chờ anh duyệt.
- Thứ tự đề xuất: làm sau tab Hồ sơ Tổ (dùng chung bộ dựng mẫu + khai báo 1 lần).

## Hồ sơ vay HSSV (anh gửi 11/10 — làm sau bộ hồ sơ Tổ)
File anh gửi là bản đã ghi tham khảo có tên, CCCD người thật → **chỉ ghi cấu trúc, không đưa file vào repo**.
- **01/TD Giấy đề nghị vay vốn kiêm phương án sử dụng vốn vay** (CT Học sinh sinh viên): kính gửi NHCSXH Gò Dầu; 1. người vay (họ tên, năm sinh, CCCD / ngày cấp / nơi cấp, địa chỉ, thuộc tổ … do ông bà … làm tổ trưởng, Hội quản lý); 2. số tiền đề nghị (+ bằng chữ), phương án, tổng nhu cầu = vốn tự có + vốn vay; bảng Đối tượng (sinh viên …) · Số lượng (tháng) · Thành tiền; thời hạn, kỳ hạn trả, hạn trả cuối; cam kết; xác nhận Hội (Chủ tịch ký đóng dấu); người vay ký; phần phê duyệt NH (số tiền, lãi suất, thời hạn, kỳ hạn, số tiền trả / lần, ngày trả lãi; CBTD, Trưởng phòng TD).
- **03/TD Danh sách tổ viên đề nghị vay vốn** (CT HSSV): tên tổ (tổ trưởng), khu phố, phường; ngày họp bình xét; bảng STT · Họ tên · Đối tượng thụ hưởng · Đề nghị của Tổ (Số tiền · Mục đích · Thời hạn) · Phê duyệt NH; dòng Cộng; Tổ trưởng ký; xác nhận UBND phường.
- Điền tự động được: thông tin người vay từ Mẫu 31 (tên, ngày sinh, CCCD, ngày cấp, nơi cấp, địa chỉ, tổ, tổ trưởng, Hội), tên tổ / khu phố / phường, Gò Dầu; số tiền chữ tự đổi từ số. Ghi tay: phương án, đối tượng, số tiền đề nghị, thời hạn, phê duyệt.

## Bố cục chuẩn theo PDF anh gửi (11/10, bản đã điền có tên thật → chỉ ghi cấu trúc)
- **Quy tắc chung (anh 11/10):** giữ đúng form mẫu giấy, không phụ thuộc ít / nhiều hộ vay, trừ khi quá nhiều. **Logo NHCSXH** in lên các mẫu gốc có logo và các mẫu anh tự tạo.
- **01/TD** (3 bản: HSSV, NSVSMT xây mới, NSVSMT sửa chữa): hàng đầu = logo trái · quốc hiệu giữa (gạch dưới) · "Mẫu số 01/TD" phải; tiêu đề; "Chương trình cho vay: …"; Kính gửi; mục 1 (họ tên + năm sinh cùng dòng, CC/CCCD + ngày cấp + nơi cấp, địa chỉ, tổ trưởng, Hội); mục 2 (số tiền, bằng chữ, phương án, tổng nhu cầu, vốn tự có, vốn vay); bảng phương án **không kẻ** 3 cột Đối tượng · Số lượng · Thành tiền; thời hạn, kỳ hạn, hạn cuối; cam kết; "Ngày … tháng … năm …" + Người vay bên phải.
  - Khác theo chương trình: **HSSV** có khối "Xác nhận của UBND xã" (Ông/bà … 2 dòng chấm, Chủ tịch ký đóng dấu) bên trái; **NSVSMT** không có khối xác nhận.
  - Bảng phương án theo CT: HSSV 1 dòng "Chi phí học tập, sinh hoạt cho sinh viên: [tên SV]" · "[n] tháng"; NSVSMT mỗi công trình 1 dòng ("Công trình cấp nước" / "Công trình vệ sinh" · "01 công trình"), dòng chấm khi chỉ 1 công trình. Bản điền mẫu ghi kỳ hạn 12 tháng/lần, NSVSMT thời hạn 60 tháng — **chờ anh chốt có in sẵn không**.
  - Phê duyệt NH 5 dòng + 3 ô ký (CBTD · Trưởng phòng (Tổ trưởng) TD · ngày + Giám đốc).
- **03/TD** (A4 ngang): hàng đầu 3 cột = Tên tổ / Ấp / Xã (trái) · tiêu đề + CT (giữa) · Mẫu số + lập liên (phải); bảng 8 cột, **số dòng = số người + 2 dòng trống**, đường kẻ ngang trong bảng nét chấm, dòng Cộng có tổng số tiền; dưới: Tổ trưởng (trái) · Ngày + Phần xác nhận của UBND xã + UBND xã (giữa) · Ngày + Phê duyệt NH 3 dòng + 3 ô ký CBTD / Trưởng phòng / Giám đốc (phải, dưới).
- **01/UQ Giấy ủy quyền** (mẫu mới, 2 trang, không logo): Mẫu số + lập 02 bản (phải, nghiêng); quốc hiệu; GIẤY ỦY QUYỀN; căn cứ Bộ luật dân sự; I. ngày, hộ gồm … người⁽¹⁾ + bảng TT · Họ tên · Ngày sinh · CCCD · Nơi cư trú (5 dòng); II. cử ông (bà) … STT⁽²⁾ …, sinh ngày, CCCD, ngày cấp, nơi cấp làm Bên được ủy quyền; III. Cam kết 1–4; IV.; ký: Bên ủy quyền⁽³⁾ (bảng TT · Họ tên · Quan hệ · Ký tên, 5 dòng + …) │ Bên được ủy quyền⁽⁴⁾; Chứng kiến của Trưởng thôn │ Xác nhận của UBND cấp xã; chú thích (1)–(4) cuối trang.
- **09A/TD** (PDF trắng anh gửi 11/10): bản 3.170 đã đúng nội dung; chỉnh bố cục: quốc hiệu giữa + "Mẫu số: 09A/TD · Lập 01 liên lưu NH" nghiêng bên phải cùng hàng; không logo; ô ký hàng 1 = Tổ TK&VV (trái) │ "…, ngày … tháng … năm …" + Người vay (phải); hàng 2 = Ý kiến tổ chức CT-XH cấp xã (Chủ tịch/Bí thư) │ Xác nhận UBND cấp xã (Chủ tịch); phê duyệt NH 2 dòng + 3 ô ký (CBTD · Trưởng phòng KH-NVTD (Tổ trưởng KH-NV) · ngày + Giám đốc).
- **01/TGTV Giấy đăng ký mở tài khoản tổ viên** (mẫu 03/2026, PDF trắng, 3 trang + trang 4 trống; có **logo** trái + khung "Mẫu 01/TGTV" phải; chân trang "Ngân hàng Chính sách xã hội · Website www.vbsp.org.vn · Hotline 1900 638583 · Trang x/4"): lời đề nghị (chi nhánh/PGD **Gò Dầu**); khung Ngày · Số hồ sơ thông tin KH (CIF); **A** thông tin cá nhân (họ tên khai sinh, ngày sinh, giới tính ☐Nam ☐Nữ, quốc tịch, dân tộc, cư trú, giấy tờ tùy thân ☐Thẻ CC/☐CC điện tử, **Số = 12 ô**, ngày cấp, ngày hết hạn, nơi cấp, MST, nghề nghiệp 12 ô tích, chức vụ, nơi thường trú: số nhà · đường · tổ dân phố/thôn · phường/xã · tỉnh; nơi ở khác; nơi làm việc; điện thoại · email; thu nhập 6 tháng; nguồn thu nhập; hôn nhân; **đăng ký chữ ký mẫu** 2 khung); **B** đăng ký dịch vụ (6 nghiệp vụ, SMS ☐Có ☐Không); **C** cam kết (nguyên văn, 2 ô Đồng ý); ký Khách hàng; **D** phần ngân hàng (tiếp nhận ngày; Gò Dầu, ngày; Cán bộ tiếp nhận · Giao dịch viên · Kiểm soát viên · Giám đốc; Số CIF · Số tài khoản tổ viên · Hiệu lực từ ngày).
  - Điền tự động được (Mẫu 31 / danh bạ): họ tên, ngày sinh, giới tính (tích ô), dân tộc, số CCCD vào 12 ô, ngày cấp, nơi cấp, **ngày hết hạn** (tính theo ngày sinh như chip CCCD), thôn / xã / tỉnh thường trú, điện thoại, số CIF (mã KH) ở phần D; còn lại ô tích / chấm.
  - Lối vào đề xuất: tab Hồ sơ vay chọn tổ viên; **in hàng loạt** cho chip "Chưa có TK 105" của tab Tổ (mỗi người 1 bộ, sang trang mới).

## 3.171 — Lập BỘ HỒ SƠ VAY (anh chốt 11/10 — chờ "code")
**Nguyên tắc (anh):** mọi ô phải điền so với mẫu trắng đều có chỗ khai / chọn; ô nào tính hoặc lấy tự động được thì lấy; nhập ít nhất, đơn giản nhất.
1. **Chọn chương trình:** Học sinh sinh viên · Cấp nước sạch & VSMT nông thôn (CT khác thêm sau).
2. **Người vay:** hộ cũ → chọn từ cây (xã › điểm › tổ › tổ viên) hoặc gõ CCCD / tên để tìm; hộ mới → 1 form nhập thông tin cơ bản theo Giấy ủy quyền (01/UQ): họ tên, ngày sinh, CCCD, ngày cấp, nơi cấp, nơi cư trú (theo tổ chọn), thành viên hộ (≤ 5: họ tên, ngày sinh, CCCD, quan hệ), người được ủy quyền. Tự lấy: giới tính + năm sinh đối chiếu từ số CCCD, nơi cấp gợi ý theo ngày cấp, thôn / xã / tỉnh theo tổ, tổ trưởng, Hội.
3. **Phương án theo CT:**
   - HSSV: mục đích cố định "Chi phí học tập, sinh hoạt"; tên SV, ngày ra trường; số tiền gợi ý + thời hạn, hạn cuối, kỳ trả theo công cụ 🎓 HSSV đã chốt (`hsGoiY`, `hsTinh`: 40 triệu / năm học); ngày vay = ngày GD kế tiếp của điểm.
   - NSVSMT: xây mới / sửa chữa; 1 hay 2 công trình (1 công trình: cấp nước hay vệ sinh); tối đa **25 triệu / công trình** (vượt → cảnh báo); thời hạn **60 tháng**, kỳ hạn **12 tháng / lần**; ngày vay mặc định = ngày GD kế tiếp gần nhất của điểm; hạn trả cuối = ngày vay + 60 tháng; ngày trả lãi = ngày GD của điểm.
4. **Bộ hồ sơ** (tích chọn, in / Word 1 lần, mỗi mẫu sang trang mới): Giấy ủy quyền 01/UQ · Đơn vay 01/TD · Biên bản họp kết nạp và bình xét cho vay (10C mới: mục 1 kết nạp nếu hộ mới, mục 2 danh sách đề nghị vay điền sẵn) · Danh sách 03/TD · **01/TGTV nếu hộ mới**.
5. **Gạch dưới quốc hiệu / tên cơ quan (anh nhắc 11/10 — bố cục phải như PDF đã gửi):** 3.170 đang gạch chân chữ (`<u>`) → **sai**. Sửa theo thể thức (Nghị định 30/2020/NĐ-CP) và đúng PDF: tiêu ngữ "Độc lập - Tự do - Hạnh phúc" có **đường kẻ ngang liền, nằm dưới dòng chữ (không chạm chữ), dài bằng dòng chữ, căn giữa**; tên cơ quan (vd "PGD GÒ DẦU" ở 04/TD) có đường kẻ ngang dài khoảng 1/3–1/2 dòng chữ, căn giữa. **Nét mảnh** (anh 11/10: không quá dày) — 0,5 pt như PDF (Word viền `w:sz="4"`, bản in `0.5pt solid`). Bản xem / in: phần tử kẻ riêng có độ dài đo theo chữ; Word: đoạn trống có viền trên, thụt hai bên cho đúng độ dài (không dùng gạch chân). Áp cho mọi mẫu (10A, 10B, 10C, 11/TD, 01/BG, 01/TD, 01/UQ, 04/TD, 09A/TD) và phép thử kiểm không còn `<u>` ở quốc hiệu.
6. **Hộ mới chưa có trên số liệu (anh chốt 11/10):** nhập mới → **lưu tạm** ("📂 Hồ sơ đang làm", lưu máy + đồng bộ Drive như dữ liệu app, không vào repo) → in thành bộ hồ sơ gửi tổ đi ký. Mỗi bộ có trạng thái: Đang soạn → Đã in, gửi tổ → Tổ đã nộp lại → Đã giải ngân (tự nhận khi người vay xuất hiện trong Mẫu 31 kỳ mới: khớp CCCD / tên + tổ → gợi ý đóng bộ, dùng dữ liệu Mẫu 31 từ đó). In lại / sửa bất kỳ lúc nào; bộ đóng quá 90 ngày tự vào Thùng rác (khôi phục được).
7. **Người thừa kế (anh 11/10):** form nhập tay có thêm mục **người thừa kế đầy đủ** (họ tên, ngày sinh, CCCD, ngày cấp, nơi cấp, quan hệ với người vay, nơi cư trú) — app chỉ có tên vợ / chồng trên Mẫu 31 nên không đủ. Hộ cũ: gợi ý sẵn tên vợ / chồng làm người thừa kế, anh bổ sung phần còn thiếu; chọn nhanh từ danh sách thành viên hộ (Giấy ủy quyền) nếu đã nhập. Lưu cùng bộ hồ sơ (lưu tạm), dùng lại cho mẫu nào cần.
- **04/TD theo PDF (anh gửi 11/10, bản đã điền → chỉ ghi cấu trúc):** hàng đầu **3 cột** = "NHCSXH TỈNH TÂY NINH / PGD GÒ DẦU" (đậm, trái) · quốc hiệu + tiêu ngữ (giữa) · "Mẫu số 04/TD · Lập 02 liên · - 01 liên lưu tổ · - 01 liên lưu NH" (nghiêng, phải, 4 dòng); không logo. "Gò Dầu, ngày … tháng … năm …" nghiêng, phải. Tiêu đề 2 dòng đậm, cỡ lớn (THÔNG BÁO / KẾT QUẢ PHÊ DUYỆT CHO VAY). "**Kính gửi:**" đậm gạch chân + UBND xã/phường. Mục 1 xuống dòng "Số tiền … đồng. Bằng chữ: …"; mục 2 ba dòng (số người · STT · số tiền); mục 3 lịch phát tiền "… giờ … phút, ngày … tháng … năm …, tại địa điểm: Điểm giao dịch … (phường …)"; câu đề nghị UBND. Ký: Người lập (trái) · Giám Đốc (phải); tên người lập đậm nghiêng dưới khoảng ký. Bản 3.170 đang để mẫu số dưới quốc hiệu, tách giờ / phút chưa có → sửa ở 3.171.
  - **Cách dùng 04/TD (anh 11/10):** in **hằng tháng sau khi phê duyệt**. Khai báo 1 lần thông tin cố định (đầu trang PGD, nơi lập, người lập, Giám đốc, **giờ phát tiền mặc định** — có thể riêng từng điểm GD). Mỗi đợt anh chỉ gõ **số hộ + số tiền**; app tự điền: UBND xã / phường, điểm GD, ngày phát tiền = ngày GD kế tiếp của điểm, ngày lập = hôm nay, bằng chữ → in. Đề xuất: 1 bảng các điểm GD (lọc theo xã / PGD), mỗi dòng ô Số hộ · Số tiền; dòng có số → 1 thông báo, **in / Word tất cả 1 lần** (mỗi thông báo 1 trang).
