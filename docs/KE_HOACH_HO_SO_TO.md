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
  - **Cách dùng 04/TD (anh 11/10):** in **hằng tháng sau khi phê duyệt**. Khai báo 1 lần thông tin cố định (đầu trang PGD, nơi lập, người lập, Giám đốc, **giờ phát tiền mặc định** — có thể riêng từng điểm GD). Mỗi đợt anh chỉ gõ **số hộ + số tiền**; app tự điền: UBND xã / phường, điểm GD, ngày phát tiền = ngày GD kế tiếp của điểm, ngày lập = hôm nay, bằng chữ → in. Đề xuất: 1 bảng các điểm GD (lọc theo xã / PGD), mỗi dòng ô Số hộ · Số tiền; dòng có số → 1 thông báo, **in / Word tất cả 1 lần** (mỗi thông báo 1 trang). **Anh chốt 11/10: mỗi điểm GD 1 thông báo.** **Anh chốt thêm:** đầu đợt chọn 1 lần các thông tin chung của đợt (ngày lập, giờ phát tiền, ngày phát tiền — mặc định ngày GD kế tiếp của từng điểm), rồi mỗi điểm **chỉ nhập 2 ô: số hộ, số tiền** → in. **Anh chốt cuối: in từng thông báo một** (chọn điểm GD → nhập số hộ, số tiền → xem → In / Word), không in hàng loạt; bỏ bảng nhiều điểm.
8. **Anh chốt 11/10 (trả lời câu hỏi):** ① các **ngày đến hạn / hạn trả cuối mặc định để trống** (không tự tính, anh ghi tay); ② **giữ cả 2 mẫu 10C** (mẫu cũ để in bổ sung các tháng trước 01/10/2026); ③ **danh mục đối tượng thụ hưởng khai báo theo từng chương trình** (⚙ Khai báo 1 lần); ④ **người thừa kế chỉ có ở Giấy ủy quyền (01/UQ)**; ⑤ "danh sách nào quá nhiều người": em rà — chỉ **02/BG** (mọi tổ viên còn số dư + từng món → thường 2–4 trang) và **10A** (tổ trên 40 người, mẫu 2 cột × 20 dòng) có thể vượt 1 trang; 10C (vài người kết nạp / ra), 03/TD (mỗi đợt vài người), 01/UQ (≤ 5 thành viên) gần như không. Đề xuất chung: **giữ số dòng mẫu, quá thì nối dài bảng sang trang sau, lặp dòng tiêu đề bảng, phần ký ở cuối** (bỏ phương án "danh sách kèm theo" cho đơn giản) — chờ anh đồng ý.
9. **Danh sách dài (anh chốt 11/10):** mọi mẫu cố gắng **đúng form chuẩn đã gửi, không phụ thuộc số người**. **10C**: dài thì **kéo dài bảng** (thêm dòng, sang trang thì lặp dòng tiêu đề bảng, phần ký ở cuối). **02/BG**: làm **như Mẫu 06 dài** — bộ in chuẩn chia trang: lặp tiêu đề bảng (3 dòng đầu + dòng số cột) mỗi trang, mỗi khách + các dòng món là 1 nhóm không tách trang (lớp `kt-ho`), số trang "Trang x/y", dòng Tổng cộng + phần ký ở trang cuối; Word: tiêu đề bảng lặp (`w:tblHeader`), dòng không cắt (`w:cantSplit`).

## 3.172 — Tab "🏢 Giao dịch xã" (anh chốt 11/10, đã "code")
1. **Anh gửi file HTML in 04/TD + 12/GDX, đã in thử trên mẫu giấy thật → "ra đúng mẫu chuẩn, em đừng làm thay đổi".** Mẫu in chép **nguyên khuôn** file đó (HTML + CSS, chuyển tự động sang ES5, xem / in trong iframe riêng). Bản 04/TD dựng theo PDF ở 3.171 **bỏ** — 04/TD rời tab Hồ sơ vay, chỉ còn ở tab Giao dịch xã. File gốc có dữ liệu thật (cán bộ, tổ trưởng, mã điểm) → **không đưa vào repo**; so ảnh in file gốc ↔ app (6 trường hợp, trùng 100% điểm ảnh) làm ở máy làm việc.
2. **Thuần túy hỗ trợ in nhanh, không phụ thuộc số liệu hộ vay.** Điểm GD, xã, mã điểm, ngày GD, tổ + tên tổ trưởng lấy từ **Cài đặt › Địa bàn** (danh mục anh khai).
3. **Giữ đủ khai báo / tùy chọn của file, tinh chỉnh cho hợp app:** GQVL, mức tiền hay dùng, danh sách cán bộ, Khai báo sẵn (tự lưu, đồng bộ Drive — `D.cauHinh.gdx`), Khôi phục mặc định; 12/GDX số dòng (10/12/15/20/36, theo số tổ), tên tổ trưởng trắng / in sẵn, GDV / KSV / tổ trưởng tổ GD, Phần II (giờ ngày để trống / ghi sẵn), tên cơ quan đầu mẫu khai được.
4. **Bỏ In hàng loạt** → **⭐ Mẫu hay in**: lưu cặp số hộ + số tiền (vd 1 hộ 40 tr, 2 hộ 80 tr, 3 hộ 120 tr), bấm là điền / 🖨 in ngay, dùng mãi cho các đợt.
5. **Trước mỗi đợt kiểm tra khai báo**: tự hiện khi đợt cũ đã qua ngày phát / nút 🔄 Đợt mới; app đề xuất **điểm có ngày GD gần nhất** + ngày phát (chọn 1 trong 3 ngày GD gần nhất), ngày ký = hôm nay; cảnh báo ngày đã qua / ký sau ngày phát / thiếu người lập.
6. **Giao dịch xã diễn ra cả ngày nghỉ** → không nhắc, không dời ngày. Ngày GD lớn hơn số ngày của tháng → ngày cuối tháng.
7. **Nơi giải ngân: Tại điểm GD / Tại PGD.** Tại PGD: địa điểm = câu khai báo (mặc định "Phòng giao dịch NHCSXH Gò Dầu"), ngày gợi ý ngày mai, giờ nhớ riêng, vẫn chọn xã để kính gửi UBND.
8. **Không viết tắt:** câu "Đề nghị … thông báo" ghi **"Ủy ban nhân dân phường / xã …"** đầy đủ (file gốc mặc định "UBND …").

## Chờ tiếp (lưu 12/10 — chưa "code")
### A. 3.173 — bố cục lại tab 🏢 Giao dịch xã (anh: "hơi rối, sẽ có rất nhiều mẫu")
- **Anh chốt:** dùng chung **kỳ / ngày số liệu** (kỳ chung như các tab) + **khối Lọc địa bàn** (xã › điểm GD, chọn 1 lần cho mọi mẫu); khai báo **chung** chỉ gồm danh sách cán bộ ngân hàng (bổ sung dần), **mỗi mẫu có khai báo riêng** — mục trùng nhiều mẫu thì báo anh rồi mới gom về chung; **điện thoại chỉ xem** (không làm nhập); sau này có **quy tắc soạn mẫu** (`docs/QUY_TAC_SOAN_MAU.md`) để AI khác soạn, em chỉ gắn.
- **Anh chưa ưng 3 phương án** (3 cột · Bảng mẫu → Bàn làm mẫu · trang giấy trung tâm). Yêu cầu: **in hằng ngày chủ yếu tích / bấm chọn, hạn chế nhập; khai báo 1 lần dùng lâu dài; khi in chỉ chọn cơ bản nhất.**
- **Đề xuất đang chờ duyệt — phương án D "màn chip":** mỗi mẫu là các hàng chip (mẫu · điểm GD sắp theo ngày GD gần nhất · tổ / khách khi mẫu cần · ⭐ mẫu hay in · lựa chọn riêng) do khai báo + số liệu sinh ra; app chọn sẵn lựa chọn hợp lý nhất (lần trước / ngày GD gần nhất); "+ khác" là ngoại lệ → hỏi lưu thành chip; dòng **"Sẽ in: …"** + [🖨 IN]; khung xem 👁 bật / tắt; ⚙ Khai báo chia mục chung / từng mẫu.
- Còn hỏi: khung xem mặc định bật hay tắt.
### B. Mẫu mới: Giấy lĩnh tiền mặt (anh gửi ảnh mẫu trắng 12/10)
- Dùng khi **KH rút TK 105** hoặc **tổ trưởng rút TK 104**; số liệu theo **ngày số liệu**; **cả 2 kiểu in** (in đè lên giấy in sẵn / in cả mẫu trên giấy trắng), khổ **A5 và A4**; nội dung khác khai báo / chọn riêng của mẫu.
- Còn hỏi: A4 in 1 hay 2 giấy / tờ; bản scan thẳng 100% hoặc kích thước giấy (để in đè); TK 104 lấy từ truy vấn (mục C).
### C. Truy vấn "Mẫu 31 mở rộng" (anh gửi các câu truy vấn hệ thống 12/10)
- Anh chốt: **câu 31 của TW là chuẩn** → giữ nguyên lõi (số liệu trùng 100%), chỉ **thêm cột cuối**: điểm GD xã + ngày GD, CCCD / ngày cấp / nơi cấp / địa chỉ tổ trưởng, tổ phó, TK 104 tổ trưởng, tên ngành / học phí HSSV đúng mã, **ngày cấp CCCD HSSV**. Hai bản: theo ngày và theo tháng.
- **Sổ phân tích chi tiết (tên bảng hệ thống) KHÔNG để trong repo** — anh giữ file riêng; lần sau anh gửi lại cùng kết quả 4 câu tra cấu trúc bảng.
- **Tạm dừng: anh chưa kết nối được để chạy truy vấn.**
- Phát hiện liên quan app (chờ duyệt): số **KHĐ app tự tính** (khi không nạp file KHĐ) lệch luật hệ thống ở 3 chỗ — sót món chưa giao dịch lần nào (hệ thống tính từ ngày GN đầu tiên), chưa loại món trong thời gian ân hạn (CT 05/07/18 60 tháng, CT 01 sản phẩm 011SC2/MC2/LC2 24 tháng, CT 06 6 tháng, lãi suất 0), điều kiện nợ khoanh.
### D. Đợt code tới (anh chốt 12/10 — làm khi anh nhắn "code")
1. **KHĐ tự tính (3.174):** món có **nợ khoanh → loại** (bỏ cách "OR" của câu hệ thống); **HSSV (CT 02)**: chưa ra trường → loại; đã ra trường nhưng chưa quá **12 + 3 tháng** từ ngày ra trường (ân hạn ≤ 12 tháng) → loại; quá → tính như món thường; không có ngày ra trường → loại như cũ. **Chỉ áp cho KHĐ.** Vẫn rà soát đủ với file KHĐ: món lệch do quy định PGD (khoanh / HSSV) liệt kê riêng, không tính lỗi; lệch khác vẫn cảnh báo. Anh test máy thật, khớp file là xong.
2. **12/GDX — 3 ô ký (anh gửi ảnh 12/10, chốt cách sửa):** cho tiêu đề **"GIAO DỊCH VIÊN" xuống dòng** (2 dòng như 2 cột kia) → 3 tên người ký cùng 1 hàng; **khi chọn trên 15 dòng** khoảng ký vẫn đủ rộng (hiện thu còn 38 / 32 / 26 px nên tên sát tiêu đề) → giữ khoảng ký tối thiểu, phần thu gọn dồn vào bảng. So ảnh lại: phần còn lại không đổi.
3. **04/TD — đường kẻ dưới tên cơ quan và dưới tiêu ngữ (anh gửi ảnh 12/10):** xích **gần chữ hơn 1 ít nhưng không chạm chữ** (đo trên ảnh in thử, giữ nét mảnh như cũ).
4. **12/GDX theo mẫu trắng chuẩn (anh gửi ảnh 12/10):** nét kẻ dưới tên cơ quan **sát lên 1 ít (không sát nhiều)**, **dài 50–60 % dòng chữ** (hiện 1/3); dòng "Điểm giao dịch: … Mã điểm giao dịch: …" và "Xã: …" **không in đậm** nhãn, **mã điểm giao dịch đứng gần** ngay sau (không đẩy sang sát lề phải); dòng **"Giao dịch viên"** giãn thêm khoảng cách trên / dưới như mẫu (hiện hơi hẹp). Mẫu 04/TD: kẻ dưới cơ quan + tiêu ngữ sát chữ hơn (mục 3).
### E. Bố cục tab 🏢 Giao dịch xã — BẢN CHỐT đề xuất (12/10, chờ anh duyệt + "code")
- **Thanh trên (dùng chung mọi mẫu):** kỳ / ngày số liệu (kỳ chung) · khối Lọc địa bàn xã › điểm GD (chưa nạp số liệu → theo Cài đặt › Địa bàn) · [⚙ Khai báo] · [👁 Xem: bật / tắt, nhớ máy].
- **Hàng chip mẫu:** ⭐ ghim mẫu hay dùng lên đầu · nhóm (Giải ngân · Biên lai · Tiết kiệm …) · 🔍 tìm khi nhiều mẫu.
- **Các hàng chip của mẫu đang chọn** (sinh từ khai báo + số liệu, app chọn sẵn lựa chọn hợp lý nhất / lần trước; "+ khác" là ngoại lệ, gõ xong hỏi lưu thành chip) → dòng **"Sẽ in: …"** + **[🖨 IN]**.
  - 04/TD: điểm (★ ngày GD gần nhất) · ⭐ Mẫu hay in (số hộ + số tiền) · Tại điểm / Tại PGD · GQVL · đợt (ngày phát, ngày ký — bấm mở Kiểm tra trước đợt).
  - 12/GDX: số dòng (Theo số tổ / 10 / 12 / 15 / 20 / 36) · tên tổ trưởng trắng / in sẵn · GDV · KSV · tổ trưởng tổ GD (chip cán bộ) · Phần II giờ trống / ghi sẵn.
- **Khung xem bên phải** bật / tắt; tắt thì vùng chip giãn hết ngang. **Điện thoại: chỉ xem + in.**
- **⚙ Khai báo:** mục Chung (danh sách cán bộ ngân hàng — bổ sung dần) + mục riêng từng mẫu; mục trùng nhiều mẫu → báo anh rồi mới gom.
- **Mẫu in 04/TD, 12/GDX không đổi** (ngoài các chỉnh anh đã chốt ở D); khai báo cũ chuyển sang chỗ mới, không phải khai lại.
- **Thêm mẫu mới** = 1 mục khai trong code (chip cần có · khai báo riêng · câu "Sẽ in" · hàm dựng trang) — đúng khuôn `docs/QUY_TAC_SOAN_MAU.md` (viết cùng đợt) để AI khác soạn.
- Giấy lĩnh tiền mặt làm SAU bố cục (bản giấy trắng trước, in đè khi có bản scan thẳng).
- **Anh chốt thêm (12/10, sau demo):** dùng **khối LỌC ĐỊA BÀN của app** (Xã · Điểm GD · **Hội** · Tổ) — mỗi mẫu khai cần đến cấp nào (04/TD, 12/GDX: đến Điểm GD; Giấy lĩnh: đến Tổ / khách), **giữ hàng Hội** để lọc tổ gọn; khai báo **chung** để trên cùng; khai báo **riêng** chia 2 loại: (a) bố cục / quy tắc ít đổi → nút ⚙ của mẫu, (b) chọn nhanh khi in → khung bên trái (radio cho 2–3 lựa chọn, chip cho danh sách hay dùng, **danh sách cán bộ = ô sổ xuống**); **mỗi mục có ô tích chuyển qua lại giữa ⚙ và chọn nhanh** (tùy biến tối đa); mọi mục (⚙ và chọn nhanh) **xếp theo thứ tự trên mẫu: trên → dưới, trái → phải**; **ngày ký** khi chọn hiện rõ ngày, mặc định tùy mẫu; khung xem ~40 % bên phải; thanh "Sẽ in" ghim đáy khung chọn.
- **Anh chốt thêm (12/10):** 04/TD **mặc định 2 bản, chọn được 1 bản**; PGĐ ký tạm theo thể thức **"KT. GIÁM ĐỐC / PHÓ GIÁM ĐỐC"** (anh xem lại sau); **giờ hẹn** cố định, giống nhau mọi điểm → để trong ⚙ (không ra chọn nhanh); 04/TD **không chọn người lập → để trống (không chấm)** — mỗi ô trống tùy chỗ: để trắng hay chấm chấm (khai được từng ô); **12/GDX: 2 lựa chọn riêng** — "Ngày tiêu hủy = ngày GD" (hiện ngày) và giờ tiêu hủy (mặc định chấm chấm), **không gộp 1**; tên thanh "Sẽ in" → đổi tên (anh chọn).
- **Tên thanh tóm tắt:** "📋 Tóm tắt bản in" (anh đồng ý 12/10).
- **Giấy lĩnh tiền mặt — khổ (anh chốt 12/10):** in **A5**, hoặc **A4 dọc in nửa trang (1/2 tờ)**.
- **Góp ý từng mẫu (anh chốt 12/10, demo v3):**
  - **Nguyên tắc mọi mẫu:** mọi mục của mẫu đều tùy biến được trong khai báo riêng (⚙) và đưa ra được chọn nhanh; chọn gì thì "📋 Tóm tắt bản in" hiện thành **chip** (bấm chip → tới đúng mục; chip vàng = ô để trống).
  - **04/TD:** ngày ký chỉ **[Hôm nay] + [📅 chọn ngày]** (bỏ "Ngày GD"), hiện rõ ngày đã chọn; **số hộ + số tiền là 2 ô nhập duy nhất**, dưới ô là chip chọn nhanh tạo sẵn (1 hộ · 40.000.000 …, lưu thêm chip được); **lịch phát tiền vay** mặc định = ngày GD của điểm GD gần nhất, có [📅 chọn ngày] và nút **[↺ Mặc định]**; **người lập** chọn từ danh sách cán bộ (không chọn → để trống).
  - **12/GDX:** **giờ ghi sẵn** (giờ tiêu hủy) khai báo được trong ⚙; **3 ô GDV · KSV · Tổ trưởng tổ GD đặt cạnh nhau**, mỗi người chỉ 1 vai — đã chọn ở 1 ô thì không còn trong 2 ô kia (GDV trống → chấm; 2 ô kia trống → để trắng).
### F. File TK 104 tổ trưởng (anh gửi 12/10 — chỉ ghi cấu trúc, không dữ liệu)
- File Excel xuất từ báo cáo hệ thống, 1 sheet, **1 dòng / 1 tài khoản**, cột: `NGAYBC · TENPGD · TENTINH · MADP · MATO · SOTK · MAKH · TENKH · SDT · DIACHI · TENTT · TENDVUT · ANH · TENCT · CHUCVU`. Một ngày số liệu; `SOTK` 10 chữ số, mỗi dòng 1 số khác nhau; `MAKH` mỗi dòng 1 khách khác nhau; `MATO` gần như trống (không gắn được tổ trực tiếp); `TENTT`, `TENDVUT` hầu như trống; `ANH`, `TENCT`, `CHUCVU` trống; `SDT` cùng 1 giá trị cho mọi dòng (không phải số điện thoại — cần anh xác nhận).
- Hướng: nạp như 1 loại file mới (theo ngày) → lưu **số TK 104 theo mã khách**; gắn vào tổ qua **mã khách tổ trưởng** (cột "Mã CIF TT" của Mẫu 31, app đã giữ). Dùng cho: Giấy lĩnh TK 104 tự điền, hồ sơ khách / tổ hiện TK 104, xuất danh sách khi cần, cảnh báo "TK 104 chưa đóng — không còn là tổ trưởng" (như câu hệ thống 17). Chờ anh duyệt + "code".
- **Anh chốt (12/10, sau khi gửi file danh mục địa bàn 369 tổ — dữ liệu thật, không đưa lên repo):** **cây địa bàn lấy theo Mẫu 31** (kỳ chung, như các tab khác); file danh mục **chỉ là nguồn tham chiếu khi cần** — tra các thông tin Mẫu 31 không có (mã điểm GD dạng TXN…, ngày GD cố định của điểm, số TK 104 tổ trưởng, SĐT, tổ phó) và đối chiếu lệch, **không thay cây**. File có sheet `Diem_giao_dich` · `Danh_muc_dia_ban` · `To_truong` (mã tổ · tổ trưởng: mã KH, TK 104, SĐT · tổ phó · Hội); mã dạng chữ. **Không ghi thẳng TK 104 vào code** (repo công khai) → làm chỗ nạp tham chiếu, dữ liệu ở máy / Drive của anh. Đã đối chiếu TK 104 file này với file TK 104 hệ thống: khớp toàn bộ tổ.
- **Nhật ký in (đề xuất, chờ anh chốt thời hạn):** chỉ lưu lựa chọn mỗi lần in (~0,3–0,5 KB / lần, file riêng `nhatky_in.json` trên Drive), không lưu PDF; bấm dòng nhật ký → in lại đúng bản cũ (kể cả ngày ký cũ).
- **Anh chốt (12/10):** nhật ký in **giữ 1 tháng rồi tự xóa** (không cần lưu lâu); **có theo dõi TK 104 chưa đóng của khách không còn làm tổ trưởng** (nạp thêm file TK 104 hệ thống → đối chiếu với tổ trưởng hiện tại theo Mẫu 31 → danh sách riêng để anh xử lý).
- **Anh chốt (12/10):** **gom Đợt 1 + 2 + 3 làm 1 lần (bản 3.174)** — sửa mẫu 12/GDX + 04/TD, danh mục tham chiếu + TK 104, nhật ký in, bố cục mới tab Giao dịch xã, Giấy lĩnh tiền mặt (giấy trắng); **KHĐ (khoanh / HSSV) làm sau**.
- **Đã làm 3.174 (12/10):** bố cục mới tab Giao dịch xã (mục E), sửa mẫu 04/TD + 12/GDX (mục D 2–4; anh đổi: "GIAO DỊCH VIÊN" giữ 1 dòng, 3 tên vẫn cùng hàng), Giấy lĩnh tiền mặt giấy trắng (mục B; in đè chờ bản scan), danh mục tham chiếu + TK 104 (mục F), nhật ký in 1 tháng, `docs/QUY_TAC_SOAN_MAU.md`. **Còn để sau (anh chốt):** KHĐ bỏ nợ khoanh + HSSV ân hạn 12 + 3 (mục D 1).
### G. Góp ý sau 3.174 (anh, 12/10 — chờ góp ý Giấy lĩnh + "code")
- **12/GDX:**
  - Ngày GD: chỉ 1 chip "ngày GD kế gần nhất" + ô chọn ngày; bỏ 2 chip ngày GD tháng sau.
  - Ô ký GDV: "(Ký, ghi rõ họ tên)" lên sát tiêu đề, không chừa dòng trống. 3 tên vẫn cùng hàng: bù chiều cao vào khoảng ký của cột GDV.
  - In đậm phần giá trị (tên điểm GD, mã điểm, xã, tên GDV); nhãn giữ chữ thường.
- **04/TD:**
  - Ô số hộ và ô số tiền có nút ▲▼ tăng / giảm: số hộ bước 1, số tiền bước 5 triệu.
  - Mức tiền gợi ý: 25 · 30 · 40 · 50 · 80 · 100 · 120 · 160 triệu.
- **Lỗi:** bấm chip ⭐ / Hôm nay / ô chọn ngày lại mở hộp ⚙ cài đặt.
  - Nguyên nhân: đã mở ⚙ một lần thì nội dung hộp vẫn nằm trong trang sau khi đóng, nên lần đổi sau app tưởng hộp còn mở và vẽ lại.
  - Sửa: chỉ vẽ lại khi hộp đang hiện.
- **Ngày gõ nhanh:** không cần gõ / hay -. Ví dụ "1410" = 14/10 năm nay, "141026" và "14102026" = 14/10/2026. Vẫn giữ nút 📅 chọn trên lịch. Áp cho mọi ô ngày của tab.
- **Giấy lĩnh (anh góp 12/10, sau khi in thử):**
  - **Dòng "bằng chữ":**
    - dài quá 1 dòng thì tràn xuống dòng dưới, dòng đó bỏ chấm;
    - vừa 1 dòng thì dòng dưới giữ chấm;
    - tối đa 2 dòng.
  - **Dòng PGD dưới tên chi nhánh:**
    - có chữ thì xích lên, giãn dòng đều như 2 dòng trên;
    - phiếu trắng thì giữ khoảng cách như form mẫu để dễ ghi tay.
  - **Dòng Nội dung xích lên** một chút, để phần chữ ký rộng hơn.
  - **Chữ VBSP chìm** làm luôn cho bản giấy trắng.
  - **Font chữ 13–14 pt.**
  - **Người lĩnh (TK 105 hay TK 104 đều vậy):**
    - tìm tên ở ô tìm;
    - ngay dưới ô tìm có form gõ tay đủ các ô của giấy lĩnh, bố trí giống mẫu thật;
    - tìm ra thì app điền sẵn vào form, anh sửa được.
  - **Nạp TK 104 chỉ ở 1 chỗ:** chỗ nạp & kiểm tra dữ liệu (file xls nhiều sheet).
    - Nạp xong kiểm tra luôn.
    - Gán TK 104 của tổ trưởng vào danh bạ tổ đã lưu (lưu kèm hồ sơ tổ).
    - Không nạp ở nhiều nơi.
- **Đã làm 3.175 (12/10):** toàn bộ mục G (12/GDX, 04/TD, lỗi mở ⚙, ngày gõ nhanh) + góp ý Giấy lĩnh sau in thử (bằng chữ 2 dòng, dòng PGD, Nội dung canh đều, VBSP chìm, 13 pt, form gõ tay, in mẫu trắng 1 / 2 mẫu A4) + nạp danh mục tổ / TK 104 một chỗ ở 📥 Nạp & KT (kiểm tra khi nạp, gắn theo tổ). TK 104 chưa hiện ở chỗ khác (anh chốt: khi cần anh báo).
- **Đã làm 3.176 (13/10):** Giấy lĩnh — chữ chìm dời trái / lên 1 cm, 4 mức Tắt · Nhạt · Vừa · Đậm (điền sẵn Nhạt, phiếu trắng Vừa); 3 ô cao hơn, đáy ô Số tiền ngang dòng Nội dung, dòng chấm trong ô cách cạnh ~1,2 mm; khung "Người lĩnh · số tiền" gọn (↑↓ Enter, khách trong tổ ô sổ xuống, ▲▼ bước 100 nghìn); in xong có nút Làm trống — in người khác. Nút in mẫu trắng giữ chỗ cũ (anh chốt). **Kế tiếp 3.177:** mini app (gói TK 104, hạn 30/60/90 ngày, hết hạn khóa hết, mã hóa, không mật khẩu).
- **Đã làm 3.177 (13/10):** 📦 mini app Giao dịch xã — nút ở tab, xuất 1 file HTML (04/TD, 12/GDX, Giấy lĩnh; gói điểm GD, tổ trưởng + TK 104, cán bộ, khai báo; không gói khách TK 105), hạn 30/60/90 ngày, hết hạn / lùi giờ / sửa hạn → khóa, số liệu xáo mã (không mật khẩu). Mẫu in chép từ hàm của app lúc xuất (1 nguồn).
- **Đã làm 3.178 (13/10):** mini app gói thêm CCCD · ngày cấp · nơi cấp tổ trưởng (anh chốt "vẫn gói"); tìm Giấy lĩnh gọn theo Xã / Điểm GD đang chọn (app: liên kết Tìm cả PGD; mini: chip Điểm này · Cả xã · Cả PGD).
- **Đã làm 3.179 (13/10):** Giấy lĩnh mặc định TK 104 tổ trưởng (anh chốt), chuyển 1 lần cho máy đang dùng; sửa Làm trống rồi chọn lại tổ cũ không điền lại.
- **Đã làm 3.180 (13/10):** TK 104 tra 3 bước (mã · mã bỏ số 0 · tên tổ trưởng cùng xã) + câu lý do khi không có; 📋 Tóm tắt 1 dòng; khối lọc thu gọn Xã / Điểm khi đã chọn điểm (riêng tab Giao dịch xã).
- **Đã làm 3.181 (13/10):** tối ưu vùng nhập — khối lọc gom 1 dòng khi đã chọn điểm / tổ (▾ Đổi sổ ra, bấm vùng nhập tự gọn), đầu khung 1 hàng + menu ⋯, Mẫu trắng gom 1 nút.
- **Đã làm 3.182 (13/10):** Giấy lĩnh — lề trên +5 mm (chữ chìm dời theo), 2 gạch dọc ô Người lĩnh tiền ngắn 5 mm, ngày lĩnh chỉ Hôm nay · nhập · Để chấm (bỏ ngày GD điểm), ô tiền nổi bật, ✕ Làm trống kế 👁 Xem.
- **Đã làm 3.183 (13/10):** nơi cấp tự tính theo ngày cấp đủ chữ (Bộ Công an từ 01/07/2024; trước đó Cục Cảnh sát quản lý hành chính về trật tự xã hội); Họ tên · CCCD · Ngày cấp 1 dòng; nút 👁 Xem: Bật / Tắt.
- **Đã làm 3.184 (13/10):** nơi cấp không ra ô — chữ mờ cạnh nhãn Địa chỉ (bấm để sửa); thẻ cấp trước 10/10/2018 ghi chung "Cục Cảnh sát" + cảnh báo; Địa chỉ · Tài khoản số 1 dòng.
- **Đã làm 3.185 (13/10):** tìm theo số CCCD (4 số cuối trở lên); ↑↓ Enter → điền form, nhảy ô số tiền; TK 105 chưa có số sổ → tra danh bạ theo CCCD, không có thì ghi lý do; ✕ Làm trống bỏ luôn chọn tổ ở cây địa bàn (việc chờ đã ghi — xong).
- **Đã làm 3.186 (13/10):** mẫu in Giấy lĩnh — dòng Họ tên xuống thêm 6 mm (đầu phiếu cách 8 mm); 2 dòng bằng chữ + Nội dung rút lên 1 mm, chữ chìm dời theo.
- **Đã làm 3.187 (13/10):** 🧾 Bảng kê các loại tiền ngân hàng chi ra (theo ảnh tờ in sẵn, cùng dữ liệu Giấy lĩnh, mệnh giá để trắng / tự chia, mẫu trắng 2 tờ / A4 — khổ tạm 105 × 185 mm chờ đo); CCCD tổ trưởng từ file về tổ; ngày gõ liền 5 / 7 số. Mẫu in Giấy lĩnh: 9 dòng khối trái giãn đều 7,08 mm, chấm bằng chữ lên 0,8 mm, 2 gạch dọc Người lĩnh tiền dài thêm 2,5 mm.
- **Đã làm 3.188 (13/10):** Giấy lĩnh + Bảng kê in chung 1 tờ A4 (⚙ Khổ giấy) — Bảng kê xoay ngang sát góc dưới trái, cắt 2 nhát, tự chia mệnh giá, bằng chữ đủ; mẫu trắng cùng kiểu.
- **Đã làm 3.189 (13/10):** Bảng kê chữ chìm = logo đã nạp ở Hồ sơ vay (chưa nạp → VBSP).
- **Đã làm 3.190 (13/10):** Bảng kê — Họ tên dưới chỗ ký Người lĩnh tiền để chấm (người lĩnh tự ghi tay).
- **Đã làm 3.191 (13/10):** Bảng kê in kèm 210 × 115 mm (cắt 1 nhát), chữ 13 pt; không in sẵn tên người lĩnh; Tổng cộng đậm, bằng chữ đậm nghiêng; PGD sát nhãn; cụm cơ quan lớn hơn.
- **Đã làm 3.192 (13/10):** ⚙ Khai báo riêng tách 2 nhóm Giấy lĩnh / Bảng kê (Tên PGD, Logo chìm riêng, Bảng mệnh giá, Kiểu in); mẫu trắng Bảng kê 2 tờ 105 × 210 / A4 ngang sát 2 mép + nét cắt; Bảng kê ngang 105 đúng mẫu; có dữ liệu in chung Giấy lĩnh; bỏ kiểu 105 × 185.
