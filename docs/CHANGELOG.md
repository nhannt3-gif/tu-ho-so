# CHANGELOG — Tủ hồ sơ

Ghi theo từng bản. Chi tiết lỗi/rủi ro và mã số (L1, R1, N1…) xem `docs/REVIEW.md`.

---

## 3.137 — 14/10/2026 20:00 — Cột Nợ lãi cạnh Dư nợ (Tổ TK&VV, TK 105)
- **Anh yêu cầu (gấp):** ở các báo cáo TK 105 / cho ra khỏi tổ, hiện cột Nợ lãi ngay cạnh cột Dư nợ; hộ dư nợ = 0 mà còn nợ lãi vẫn coi là **chưa tất nợ**.
- **Đã làm:**
  - Danh sách tổ viên (cấp tổ và cấp Hội / điểm / xã / PGD — màn hình, In, Excel): thêm cột **Nợ lãi** sau Dư nợ (ô trống khi 0; dư nợ 0 còn lãi tô đỏ), dòng Cộng có tổng nợ lãi.
  - Cột Gợi ý chữ ngắn (anh chốt): "Cho ra", "Vận động vay / tất 105", "Còn lãi — chưa tất nợ" (dư nợ 0 còn lãi); hộ không có gợi ý để trống.
  - **Cột Tổ in trước Họ tên** (anh chốt): danh sách cấp Hội / điểm / xã / PGD, Ra khỏi tổ (Tổ cũ), bảng chi tiết vào / ra. Quy tắc lọc không đổi: "Có dư nợ" đã tính cả còn lãi; "Đề xuất cho ra" chỉ khi đã tất nợ (dư nợ 0, nợ lãi 0) và 105 = 0. Dòng ghi chú cuối báo cáo nói rõ.
  - Ra khỏi tổ (màn hình, In, Excel): thêm cột **Nợ lãi** tháng trước.
  - Báo cáo **TK 105 của tổ**: mục A thêm cột Dư nợ, Nợ lãi; thêm mục **A2 "Dư nợ 0 nhưng còn nợ lãi"** (khách còn 105) — chưa tất nợ, chưa xem xét cho ra.
- Nợ lãi = lãi tồn trong hạn + quá hạn theo Mẫu 31 (`laiTon`).

## 3.136 — 14/10/2026 17:00 — Số liệu theo ngày: kỳ nào lấy kỳ đó
- **Anh yêu cầu:** chọn file ngày thì số liệu phải cập nhật theo ngày. Mỗi lần nạp ngày anh nạp Mẫu 31 + Dư nợ chi tiết, có thể thêm KHĐ.
- **Quy tắc (anh chốt):**
  - Chọn **cuối tháng** → lấy đúng bảng cuối tháng (như cũ).
  - Chọn **ngày** → mỗi loại file lấy bản đúng ngày; thiếu thì lấy bản theo ngày gần nhất trước đó trong tháng, rồi đến cuối tháng trước.
  - Tab Tổ / Sao kê: dòng ghi căn cứ "📌 Số liệu ngày 07/10/2026 · Mẫu 31: 07/10 · KHĐ: 07/10 · Quá hạn: cuối T9" (bản mượn tô vàng). Bản in / Excel tab Tổ ghi thêm loại mượn ở dòng "Số liệu đến ngày …".
  - KTGS: chỉ cảnh báo trên màn hình (đủ / thiếu → lấy cuối tháng trước); Mẫu 06 / 16 / 04 in ra không ghi chú.
  - Mới vào / Ra khỏi tổ / 105 tăng giảm khi chọn ngày: so **ngày đó với cuối tháng trước**; chip ghi "Mới vào 07/10". Biến động cả năm vẫn theo cuối tháng.
- **Nạp theo ngày cho mọi loại:** thêm KHĐ, Nợ quá hạn, Nợ khoanh, Thông tin tổ trưởng, DSTO, Tổng dư nợ. Ngày cuối tháng vẫn vào ô tháng. Loại mới này nếu trong file không ghi ngày (chỉ có ngày trên tên file — thường là ngày xuất) thì vẫn vào ô cuối tháng như trước, có dòng báo.
- **Ô "Số liệu":** ngày chỉ có Dư nợ chi tiết (chưa có Mẫu 31 ngày) cũng chọn được — món vay theo Mẫu 31 liền trước, ghi rõ.
- **Ma trận:** cột "📅 Theo ngày" sau tháng mới nhất (bấm ngày để xem / xóa, "+" nạp thêm); ô tháng thôi hiện "+ n ngày". Nút **🗑 Xóa ngày cũ** (giữ ngày mới nhất, bản cuối tháng không đụng, Drive vào thùng rác). Nạp ngày mới mà còn ngày cũ → app hỏi xóa.
- **Dựng sẵn:** mở app 6 giây sau tự dựng ngầm tháng mới nhất + ngày mới nhất + các tháng giữ sẵn; chip ⚡ báo tiến độ từng kỳ. Nạp file xong dựng lại ngay. Nút **🧹 Làm sạch & nạp lại** (thay "↻ Nạp lại", không xóa file). Nạp nhiều file có tiến độ từng file.
- **Sau giải ngân (30 ngày):** tháng chưa có Mẫu 31 cuối tháng mà có Mẫu 31 ngày → hiện "T10/2026 (đến 07/10 — Mẫu 31 ngày)", lấy món giải ngân trong tháng đến ngày số liệu (lọc theo ngày GN cuối cùng nếu file có). Có Mẫu 31 cuối tháng thì tự theo bản cuối tháng.
- **Kỹ thuật:** xem ghi chú 3.136 trong `docs/BAN_GIAO_VIEC_CON_LAI.md`. Phép thử mới `tests/t130.js`.

## 3.135 — 13/10/2026 17:00 — Đọc đúng ngày kiểu Mỹ (tháng/ngày)
- **Anh báo:** nạp file Dư nợ chi tiết ngày 7/10/2026, app đọc thành 10/07/2026; file vào ô T7/2026 ("+ 1 ngày").
- **Nguyên nhân (suy luận, chưa xem file thật):** ô ngày ghi dạng chữ kiểu Mỹ (tháng/ngày/năm, thường kèm giờ "12:00:00 AM"), trong khi app luôn hiểu ngày/tháng. Ô ngày thật của Excel (số ngày bên trong) không bị lỗi này.
- **Sửa — app tự nhận kiểu ngày của từng file (`slKieuNgay`):**
  - Có ô mà số đứng sau > 12 (vd 5/23/2026) → cả file là tháng/ngày; có ô mà số đứng trước > 12 → ngày/tháng.
  - Mọi ô đều mơ hồ thì so với ngày trên tên file.
  - Khi đọc kiểu Mỹ, màn hình nạp có dòng báo. File kiểu Việt Nam đọc như cũ.
- **Hiển thị:**
  - Ô "Kỳ" ở bảng nạp là ô chọn ngày của trình duyệt. Máy đặt tiếng Anh thì ô này hiện **tháng trước ngày** (10/07/2026 = 7 tháng 10); app không đổi được cách hiện của ô này.
  - **Mọi ô chọn ngày trong app** (nạp số liệu, ngày số liệu, ngày kiểm tra KTGS, Mẫu 04, sao kê từ / đến, Số / Sao…) nay có dòng nhỏ ngay cạnh: "= 07/10/2026 (ngày/tháng/năm)", đổi ngày là cập nhật liền; ô trống ghi "ngày/tháng/năm". Ô đổi sang kiểu tháng thì dòng này ẩn.
  - Dòng báo trùng file: nếu bản cũ nằm ở ô khác (vào nhầm do đọc sai ngày) thì ghi rõ "đã nạp vào ô KHÁC… tích để nạp vào ô đúng, rồi xóa bản ở …".
- **Xóa riêng bản theo ngày (anh báo không xóa được):**
  - Ô tháng vừa có bản cuối tháng vừa có bản theo ngày ("+ n ngày") thì trước đây bấm vào chỉ mở bản cuối tháng, không vào được bản ngày.
  - Nay hộp của ô tháng liệt kê thêm "Bản theo ngày trong tháng", bấm từng bản để xem; nút ghi rõ "🗑 Xóa bản ngày dd/mm/yyyy", không đụng bản cuối tháng.
- **Anh cần làm:** ô T7/2026 của dòng Dư nợ chi tiết đang có thêm "1 ngày" (file 7/10 vào nhầm) → xóa bản đó rồi nạp lại file.
- Kiểm tra: `kiem.py` sạch; t129 thêm 3 phép (kiểu Mỹ có giờ, mơ hồ + tên file, kiểu Việt Nam).

---

## 3.134 — 13/10/2026 15:00 — Mẫu 06 chỉnh theo mẫu chuẩn · Mẫu 06 trắng ghi tay · lời văn lãi tồn Mẫu 16 / 04
- **Mẫu 06 (anh yêu cầu, cả Word và bản In):**
  - Mục đích sử dụng vốn: mọi dòng cùng cỡ chữ 8 pt cho thống nhất (trước đây to nhỏ theo độ dài).
  - Cột "Số tiền sử dụng đúng / sai mục đích" hẹp lại (Word 907 → 807), cột "Hiệu quả đầu tư" rộng ra (794 → 994); tổng chiều ngang không đổi.
  - Tên Hội ở góc trên trái không in đậm (bản In; Word vốn không đậm).
  - Khối số hiệu "Mẫu số 06/TD · Lập 02 liên…" thu nhỏ chữ (11 → 10 pt), canh phải theo mẫu chuẩn.
- **Mẫu 06 trắng để ghi tay:**
  - Nút "📄 Mẫu 06 trắng" cạnh "Xem phiếu Mẫu 06". Dòng hộ cao 0,8 cm (1 hộ ghi dài thì dùng 2 dòng).
  - **In 1 mặt**: đủ phiếu, 4 dòng hộ. **In 2 mặt**: 1 tờ, 21 dòng hộ (mặt trước 12, mặt sau 9 kèm nhận xét và ký). Số dòng đo bằng bộ in chuẩn, đếm trang PDF thật.
  - Có In / PDF và Word. Mở hộp thì mặc định theo ô "In 2 mặt".
- **Mẫu 16 / Mẫu 04 (anh chốt):**
  - Lời văn không ghi số tháng lãi; nhóm chung "Món vay không có giao dịch từ 3 tháng trở lên, lãi tồn cao", mỗi hộ ghi dư nợ / lãi tồn.
  - Câu "Món vay không có giao dịch từ 3 tháng trở lên" giữ nguyên (mốc quan trọng).
  - Khi tính vẫn theo số tháng (không giao dịch ≥ 3 tháng, lãi tồn > 6 tháng lãi) để chọn hộ và xếp hộ nặng trước.
- **Bộ in chuẩn:** khung nội dung trang chừa 1,5 px mỗi bên để nét viền ngoài của bảng tràn ngang không bị cắt.
- Kiểm tra: `kiem.py` sạch; t129 mới (10 phép, đếm trang PDF thật); t114 đổi theo lời văn mới (20/20).

---

## 3.133 — 13/10/2026 11:00 — Tab Tổ chọn đa chiều · bảng chi tiết vào / ra kiểu báo cáo tổ
- **Chọn đa chiều (anh chốt: chỉ tab Tổ trước):** Hội lọc độc lập với địa bàn.
  - Xã + Hội (để trống điểm GD) → Hội đó **cả xã**.
  - PGD + Hội → Hội đó **toàn PGD**; bảng PGD chỉ cộng tổ của Hội, dòng Cộng ghi tên Hội.
  - Đổi xã / điểm vẫn giữ Hội đang lọc; Hội không có ở phạm vi mới thì tự bỏ.
  - Ô tổ vẫn cần điểm GD. Tab KTGS Hội… giữ như cũ.
- **Bảng chi tiết vào / ra cả năm (trong 📅 Biến động cả năm):** kiểu báo cáo tổ.
  - Cột: STT · Mã KH · Họ tên hộ vay · Vào (ngày) · Ra (ngày) · Ghi chú diễn giải. Cấp Hội thêm cột Tổ; cấp xã thêm Điểm GD; cấp PGD thêm Xã.
  - Xếp theo thời gian trong năm. Khách vào rồi ra trong năm (cùng tổ) ghi chung 1 dòng.
  - Ngày vào = ngày vay đầu tiên; ngày ra ≈ ngày GD cuối trong Mẫu 31 tháng trước. Chuyển tổ không có ngày nên ghi tháng.
  - Dòng Cộng: n vào · m ra · chênh lệch.
  - Bảng tổng theo tháng (ô bấm được) giữ nguyên. In / Excel cả năm = bảng chi tiết + bảng tổng theo tháng, đầu báo cáo như báo cáo tổ.
- Kiểm tra: `kiem.py` sạch; t128 46/46 (thêm 9 phép).

---

## 3.132 — 13/10/2026 09:00 — Tổ TK&VV: tóm tắt + chip ở cấp Hội / điểm GD / xã / PGD · vay trực tiếp STT 0 · mới vào 3 nhóm
- **Anh yêu cầu:** chọn tới Hội, xã hoặc PGD cũng có dòng tóm tắt và chip lọc như của tổ; các danh sách đã có giữ nguyên.
- **Chưa chọn tổ:**
  - Dòng tóm tắt của phạm vi: số tổ, tổ viên, có dư nợ, không dư nợ còn 105, đề xuất cho ra, CCCD hết hạn; dư nợ, quá hạn, khoanh, 105; biến động tháng.
  - Chip lọc giống của tổ. Chip đầu "📋 Bảng" mặc định là bảng như trước.
  - Bấm chip ra danh sách khách cả phạm vi, có cột Tổ (bấm để mở tổ) và cột Xã khi xem cả PGD. Màn hình hiện tối đa 800 dòng, In và Excel có đủ.
  - 📅 Biến động cả năm cho cả phạm vi, cộng theo từng tổ.
- **Hàng chip xã có chip PGD.** Tab Tổ xem được cả PGD; trước đây phải chọn xã.
- **Bảng cấp PGD:** dòng **Cộng toàn PGD trên đầu** (bảng dài khỏi cuộn), rồi từng xã (dòng tổng), dưới là các điểm GD. Bấm dòng xã hoặc điểm GD thì xuống bảng các tổ. Có In và Excel.
- **Vay trực tiếp không phải tổ:**
  - Dòng vay trực tiếp ghi STT 0, nằm đầu nhóm điểm GD; các tổ đánh số từ 1.
  - Số tổ (đầu bảng, dòng Cộng, ô chọn xã / điểm "(n tổ)") không tính vay trực tiếp; khách và số tiền vẫn cộng.
  - Bảng các tổ thêm 🖨 In bảng và 📊 Excel.
- **Mới vào tổ chia 3 nhóm** (anh lưu ý CIF cũ có thể dùng lại nên không kết luận chỉ bằng CIF):
  - **hộ mới (CIF mới)**: CIF lớn hơn mọi CIF của Mẫu 31 tháng trước;
  - **CIF cũ dùng lại**: CIF cũ nhưng tháng trước không có;
  - **chuyển tổ**: tháng trước ở tổ khác.
  - Ghi ở cột "từ đâu", ở dòng tóm tắt, và thành 3 hàng trong Biến động cả năm.
  - Đã kiểm với file Dư nợ chi tiết thật 30/09: dãy CIF 71… tăng đều theo tháng; tháng 9/2026 có 98 khách vay lần đầu, trong đó 74 CIF mới và 24 CIF cũ.
- Chuyển tổ trong cùng phạm vi vẫn tính vào / ra, để theo dõi biến động tổ (anh chốt).
- Kiểm tra: `kiem.py` sạch; t128 37/37 (thêm 12 phép).

---

## 3.131 — 12/10/2026 22:00 — Dư nợ chi tiết lấy kỳ theo "Ngày số liệu"
- **Anh báo:** tên file Dư nợ chi tiết ghi theo ngày xuất (ngày tạo file), không phải ngày số liệu. Trong file có cột "Ngày số liệu" ở cuối, phải lấy theo cột đó.
- **Nguyên nhân:** app đã có sẵn quy tắc ưu tiên cột ngày trong file. Nhưng riêng file Dư nợ chi tiết, bước gọn cột (chỉ giữ cột cần dùng) chạy **trước** bước tìm ngày, nên cột "Ngày số liệu" bị bỏ, app phải lấy ngày theo tên file. Đã kiểm với file thật đặt tên 07/10/2026: trước khi sửa vào kỳ 07/10/2026, sau khi sửa vào đúng 30/09/2026.
- **Sửa:** đọc ngày trước khi gọn cột. Tên file khác ngày trong file thì app báo "lấy theo trong file".
- **Lưu ý:** file Dư nợ chi tiết đã nạp mà vào sai ô (tên file khác ngày số liệu) thì anh nạp lại để vào đúng ô tháng. Ô sai xóa ở ma trận.
- Kiểm tra: `kiem.py` sạch; t128 thêm 1 phép.

---

## 3.130 — 12/10/2026 21:00 — Số TK 105 của khách đã tất nợ (nạp Dư nợ chi tiết tháng cũ)
- **Anh cần:** muốn cho khách ra khỏi tổ thì phải biết số TK 105.
- **Đã kiểm với file thật 30/09:** file Dư nợ chi tiết không ghi số sổ ở các món đã tất toán (3.662 món tất toán, cả 3.662 đều trống). Anh chốt: nạp thêm file Dư nợ chi tiết các tháng trước, đến 31/12/2025.
- **Cách app ghép số TK khi có nhiều tháng:**
  - Khách còn vay: lấy số sổ của tháng mới nhất.
  - Khách đã tất nợ: tháng mới không có số, app giữ số của tháng gần nhất còn ghi số.
- **Sửa lỗi:** khi dựng lại danh bạ (máy mới, tải từ Drive), file tháng cũ được đọc trước Mẫu 31, lúc đó khách chưa có trong danh bạ nên bị mất số. Nay `slDungDanhBa` gắn Dư nợ chi tiết sau mọi Mẫu 31 (`slApDnct`, kỳ cũ → mới).
- Kiểm tra: `kiem.py` sạch; t128 thêm 2 phép.

---

## 3.129 — 12/10/2026 20:00 — Sửa dòng tóm tắt tổ lệch số
- **Anh báo (ảnh tổ Gia Tân):** dòng tóm tắt ghi "5 không dư nợ còn 105 · 0 đề xuất cho ra", trong khi 5 khách đều có số dư 105 = 0 và chip "Đề xuất cho ra" đếm 5.
- **Nguyên nhân (lỗi của 3.128):** thêm chip "Có dư nợ · chưa có TK 105" làm thứ tự các chip lùi 1 nấc; dòng tóm tắt lấy chip theo vị trí nên đếm nhầm sang chip bên cạnh: "còn 105" ra số của "Không dư nợ", "đề xuất cho ra" ra số của "còn 105", "CCCD hết hạn" ra số của "Đề xuất cho ra".
- **Sửa:** dòng tóm tắt lấy chip theo mã (`toLocHam`); thêm chip về sau không làm lệch số nữa.
- Kiểm tra: `kiem.py` sạch; t128 thêm 1 phép (23/23); hoiquy2.

---

## 3.128 — 12/10/2026 18:00 — Tổ TK&VV biến động thành viên · Mẫu 06 theo mẫu chuẩn · bộ in chuẩn + khung xem · số trang
- **A. Tổ TK&VV (anh yêu cầu):**
  - Chip mới "Có dư nợ · chưa có TK 105".
  - Chip "Không dư nợ" có cột **Ngày tất nợ**: lấy ngày giao dịch gần nhất của món đã tất toán trong Mẫu 31; không có thì ghi "trước <năm>".
  - Chip **Mới vào tổ** (so với Mẫu 31 tháng trước): ngày kết nạp ≈ ngày vay; ghi "từ tổ X" hoặc "kết nạp mới".
  - Chip **Ra khỏi tổ**: ghi "sang tổ Y" hoặc "không còn trong Mẫu 31". Khách chuyển tổ được tính ở cả hai tổ, đúng như anh chốt.
  - Dòng tóm tắt "Biến động T9: +n vào · −n ra".
  - Nút **📅 Biến động cả năm**: bảng theo tháng, bấm ô để xem danh sách; In và Excel.
- **B. Mẫu 06 theo mẫu chuẩn (anh yêu cầu):**
  - Lề trái 12 mm, lề phải 10 mm.
  - Cột Họ tên rộng hơn, ưu tiên tên nằm 1 dòng. Cột Mục đích hẹp lại, tối đa 2 dòng (dài hơn thì thu chữ). Cột Chương trình hẹp lại.
  - "1. Ông (bà)" sát nhãn như mẫu chuẩn.
  - Dòng chấm Nhận xét và Biện pháp xử lý chạy tới cuối dòng.
  - Tên chương trình ghi theo **viết tắt của hệ thống** (cột TENVT trong danh mục anh gửi); HSSV QĐ43 ghi "HSSV_STEM". Chỉ Mẫu 06 (mẫu của hệ thống) dùng cách này; báo cáo app tự thiết kế vẫn ghi mã kèm tên viết tắt của app.
- **C. Bộ in chuẩn + khung xem (anh yêu cầu):**
  - Mọi bản In nhanh và mọi khung Xem trước đều do app tự chia trang A4, nên xem thế nào thì in ra đúng như vậy. Áp dụng cho Mẫu 06 / 16 / 04, Kế hoạch, Phân công, báo cáo tổ, sao kê, tổng hợp, danh sách Theo dõi nợ, phiếu thông tin món vay, số liệu giao ban, buổi giao dịch.
  - Trình duyệt **không còn in dòng đầu / cuối trang** (ngày giờ, đường dẫn), vì lề trang của trình duyệt đặt bằng 0 và lề thật nằm trong từng trang.
  - Chia trang:
    - Tiêu đề bảng lặp lại ở mỗi trang.
    - Không cắt ngang dòng; các dòng của 1 hộ không bị tách.
    - Tiêu đề mục đi liền với nội dung phía dưới.
    - Cột bảng giữ nguyên bề rộng ở mọi trang.
  - Báo cáo nhanh tự chọn khổ theo thứ tự: A4 dọc → dọc gọn (bỏ cột SĐT, chữ 9) → A4 ngang. Lề dọc 20/15/20/30 mm, lề ngang 15/15/15/20 mm.
  - Số trang (chữ nhỏ):
    - Mẫu 06: "Trang x/y" ở mọi trang, đếm riêng từng tổ.
    - Văn bản khác: số trang ở góc dưới phải, bắt đầu từ trang 2.
  - In 2 mặt khi xuất nhiều bản: bản có số trang lẻ được thêm **đúng 1 trang trắng**, thay cho cách ước lượng của bản 3.124.
  - Khung xem mới có các nút:
    - Lật trang: ⏮ ‹ n/N › ⏭ (ô n gõ được số trang).
    - Thu phóng: − % +, ↔ vừa ngang, ⊡ vừa trang.
    - Khổ: Tự động / Dọc / Ngang (chỉ có ở báo cáo nhanh).
    - 🖨 In, 💾 PDF (qua hộp in), 📄 Word (nếu mẫu đó có bản Word), ⤢ toàn màn hình.
    - Phím PageUp / PageDown / Home / End.
- **D. Số trang Word:**
  - Mẫu 06: "Trang x/y" theo từng tổ.
  - Kế hoạch, 04, 16, Phân công: số trang góc dưới phải, từ trang 2.
  - Khi xuất nhiều bản, mỗi bản là 1 phần và đánh số lại từ 1.
- **Sửa lỗi số TK 105 không hiện (anh báo trên 3.127):**
  - Nguyên nhân: file Dư nợ chi tiết nạp **trước** Mẫu 31 (hoặc chạy trước trong cùng đợt) thì số sổ chỉ gắn được cho khách đã có trong danh bạ; khách vào sau thì không có số. Còn Mẫu 31 thật ghi số hệ thống 14 chữ số, app bỏ qua loại số này, nên ô TK 105 để trống.
  - Sửa: mỗi lần nạp Mẫu 31, app gắn lại số TK từ mọi file Dư nợ chi tiết đã có (`slApDnct`). Máy đã lỡ nạp sai thứ tự thì lần mở app đầu tiên sau khi cập nhật tự gắn lại (`slNapDanhBa`).
- Kiểm tra: `kiem.py` sạch; t128 mới (Tổ + bộ in, đếm trang PDF thật, số TK 105 khi nạp sai thứ tự); các phép thử cũ đổi theo bố cục mới: t106, t108, t111, t115, t120, t126.

---

## 3.127 — 12/10/2026 08:00 — Hộp Chọn khi in hiện tên người
- **Anh yêu cầu:** chỗ chọn chức danh người ký / người kiểm tra hiện kèm tên đã khai báo để dễ nhận biết.
- Hộp "Chọn khi in" (Mẫu 06 / 16 / 04 / Kế hoạch): mỗi lựa chọn ghi "Chức danh — Tên" theo 🏛 Khai báo Hội – xã của các tổ đang in (Đoàn: Bí thư / Phó Bí thư); nhiều Hội khác tên → "theo từng Hội (n người)"; chưa khai → "chưa khai tên". Ô Phó 2–3, Ủy viên 1–5 không Hội nào khai thì ẩn (trừ ô đang chọn). Giá trị lưu không đổi (`ktInVTTen`).
- Kiểm tra: `kiem.py` sạch; t126 (+2); t114, t118, t119 không lỗi.

---

## 3.126 — 11/10/2026 18:00 — Gạch dưới mảnh · tab Số liệu báo tháng đang giữ
- **Gạch dưới tiêu ngữ / tên cơ quan mảnh lại (anh yêu cầu):** Word — đường kẻ màu đen trong khuôn 06 / Kế hoạch ① ② từ 0,75 pt → 0,5 pt (các đường theo kiểu khuôn vốn 0,5 pt); bản In — `.kt-gach` 0,5 pt, gạch chân chữ (`.kt-u`, Phân công) dày 0,5 pt.
- **Tab Số liệu (anh yêu cầu):** đầu tab hiện "⚡ Đang giữ n tháng: T9, T8, …" (đang nạp thì kèm tiến độ) + nút **↻ Nạp lại** (bỏ bản đang giữ, nạp lại ngầm — khi máy khác vừa đổi số liệu). Nạp ngầm lúc máy rảnh đã có từ 3.125.
- Kiểm tra: `kiem.py` sạch; t126 (+1), t127 (+3); hoiquy2, t106, t108, t111, t114, t115, t121, t122 không lỗi.

---

## 3.125 — 11/10/2026 17:00 — Giữ sẵn số liệu nhiều tháng trong phiên
- **Anh yêu cầu:** chuyển tháng phải nạp lại lâu → máy tính giữ hẳn 1 năm (hoặc tất cả), điện thoại chỉ tháng mới nhất.
- Trước đây chỉ giữ 3 kỳ và bỏ kỳ nạp sớm nhất (kể cả kỳ vừa xem). Nay: máy tính giữ **12 tháng gần nhất** (đầu tab Số liệu chọn "⚡ Giữ sẵn 12 tháng / Tất cả"), điện thoại giữ tháng mới nhất + tháng đang xem; đầy thì bỏ tháng **lâu không xem nhất**, không bỏ tháng mới nhất.
- Lần đầu vào tab Số liệu: app nạp ngầm từng tháng (mới nhất trước, nghỉ giữa các tháng cho máy không giật), chip "⚡ Đang nạp sẵn x/y tháng"; điện thoại chỉ nạp tháng mới nhất. Tháng còn trên Drive thì tải luôn.
- Giữ cả phần đã tính theo tháng: bộ số liệu (`SL_BO`), cây tổ (`TO_KS`), tổng hợp (`TH_KS` mới). Nạp lại / xóa / kéo bảng của 1 tháng → bỏ bản đã dựng của tháng đó (`slBoXoa`), lần sau dựng theo file mới (trước đây cây tổ cũ có thể còn giữ).
- Kiểm tra: `kiem.py` sạch; t127 mới (10 phép); hoiquy, hoiquy2, t103–t105, t110, t113, t123–t126 không lỗi. **Chưa đo bộ nhớ với dữ liệu thật** — anh để ý nếu máy chậm / trình duyệt tự tải lại thì chọn lại 12 tháng hoặc báo em.

---

## 3.124 — 11/10/2026 14:00 — Mẫu 16 bỏ số khách ở mục III · dòng chấm mịn · in 2 mặt
- **Dòng chấm mịn (anh chốt: chấm nhuyễn như dùng cỡ chữ nhỏ):** đoạn ……/....... (≥ 4 dấu) in cỡ ≈ 65% cỡ chữ, thêm chấm theo tỷ lệ để đủ dài như cũ; màu vẫn đen, chữ điền giữ cỡ. Áp chung Mẫu 06 / 16 / 04 / Kế hoạch / Phân công, cả Word (`ktChamMin` tách run) và bản In (`ktChamHTML`, `.kt-cham`); đường kẻ chấm `.kt-ld` mảnh .6pt.
- **In 2 mặt (anh chốt, mặc định bật):** ô "In 2 mặt" trong hộp Chọn khi in (`D.cauHinh.ktHaiMat`, đồng bộ Drive). Xuất nhiều bản trong 1 file: Word dùng ngắt phần "sang trang lẻ" (Word tự thêm trang trắng khi bản trước lẻ trang); bản In từ trình duyệt (Chrome không hỗ trợ ngắt trang lẻ) đo chiều cao từng bản theo khổ giấy rồi chèn trang trắng — ước lượng, in số lượng lớn nên dùng Word.
- **Anh yêu cầu:** tổ có 34 tổ viên nhưng kiểm tra thực tế 21 khách → câu "thực tế tại 21 khách hàng" gây hiểu nhầm không khớp; bỏ số lượng.
- Mục III Mẫu 16 (Word + bản In) ghi: "Qua kiểm tra tại Tổ và kiểm tra thực tế tổ viên, Đoàn có nhận xét như sau:". Số phiếu kèm theo giữ nguyên. `tools/khuon_docx.py` sửa theo để dựng lại khuôn ra cùng chữ.
- Kiểm tra: `kiem.py` sạch; t106 sửa phép số khách theo câu mới; t126 mới (16 phép: chấm mịn Word / In, in 2 mặt Word + đếm trang PDF thật); hồi quy các phép mẫu in không lỗi.

---

## 3.123 — 11/10/2026 10:00 — Phân công khi khuyết CT / PCT · rà tên · Kế hoạch chọn tháng, lưu, xóa
- **Anh yêu cầu:** Hội khuyết Chủ tịch / Phó (chuyển công tác, chưa kiện toàn) cần phân công lại — khuyết CT thì Phó đôn lên, khuyết PCT thì CT kiêm, nhiệm vụ phải đủ; không phải ai có tên cũng phân công.
- **Phân công BTV:** cột tích "Phân công" (mặc định tích hết — Thông báo như cũ). Bỏ tích Chủ tịch = khuyết → chọn Phó đôn lên phụ trách ("Phó Chủ tịch phụ trách", đứng đầu, nhận đủ 10 nhiệm vụ CT; câu "tham mưu / theo sự phân công của…" chỉ người phụ trách; tiêu đề chỉ nêu chức danh có phân công). Không còn Phó → người đứng đầu kiêm 3 nhiệm vụ riêng của Phó (3 việc kia đã trùng nhiệm vụ CT). Không Ủy viên → Phó đầu tiên (hoặc người đứng đầu) nhận nhiệm vụ Ủy viên. Đổi người: chưa chỉnh ấp tay thì chia lại đều; đã chỉnh tay thì giữ, ô kiểm tra báo ấp thiếu.
- **Ô "Kiểm tra đủ nhiệm vụ":** nhiệm vụ CT / Phó / Ủy viên đã có người nhận, ấp chưa ai nhận / giao trùng, Kế toán, Thủ quỹ, tên viết sai; còn ⚠ thì bấm Word / In hỏi lại ("Vẫn xuất").
- **Chỗ ký (anh chốt):** mặc định ghi chung "TM. BAN THƯỜNG VỤ / CHỦ TỊCH" (Đoàn: BÍ THƯ), **để trống tên** — ai ký đóng dấu, Phó ký ghi thêm "P". Ô chọn "Người ký" (chỉ chọn CT / PCT, không gõ) để in chức vụ + tên khi cần. *Thay đổi so với trước:* trước đây tự in tên Chủ tịch.
- **Rà chính tả tên** Ban Thường vụ ở thẻ Khai báo Hội – xã và ô kiểm tra Phân công: khoảng trắng thừa, viết hoa, chưa dấu, có số / ký tự lạ, một chữ 2 dấu thanh, chỉ 1 chữ, trùng tên 2 vai trò → ⚠ + nút "Sửa theo gợi ý" (không tự sửa); lưu tên tự chuẩn bảng mã dựng sẵn (NFC). Không biết được tên thật đúng hay sai.
- **Kế hoạch năm:** 2 cách chọn tháng — "Từ tháng → đến tháng" (như cũ, mặc định) / "Chọn tháng" bằng chip T1–T12 (dưới chip số tổ) + Chọn nhanh Cuối quý, Tháng lẻ, Tháng chẵn, Bỏ hết; tổ chia đều theo thứ tự ấp vào các tháng chọn; đã chỉnh tháng tay thì hỏi trước khi chia lại. Xem / In / Mẫu 04 theo KH là **lưu kế hoạch** (ghi "💾 Đã lưu kế hoạch năm … · ngày …"); không khóa, sửa là tự lưu; ↺ Xếp lại hỏi trước; **🗑 Xóa kế hoạch** (hỏi trước, xóa cả trên Drive, về xếp tự động). Tổ không còn trong số liệu vẫn giữ trong kế hoạch + báo ⚠.
- **Báo cáo tổ (Mẫu 04):** hàng "📅 Theo kế hoạch …" — bấm tháng → tích sẵn các tổ của tháng đó (tổ không còn trong số liệu không tích).
- Kiểm tra: `kiem.py` sạch; t125 mới (54 phép); t121 (chỗ ký để trống), t109 (đổi khoảng khi đã chỉnh tay → xác nhận) sửa theo hành vi anh duyệt; hồi quy chạy lại.

---

## 3.122 — 10/10/2026 16:00 — DSTO báo số tổ
- Ô Danh sách tổ TK&VV (DSTO) ở ma trận Nạp số liệu báo **số tổ** (mỗi dòng 1 tổ, trùng mã tổ đã tách riêng) thay cho "… dòng" — anh yêu cầu; dòng tóm tắt DSTO / Thông tin tổ trưởng thêm "N tổ".
- Kiểm tra: t124 thêm 2 phép (10/10); hồi quy liên quan không lỗi.

---

## 3.121 — 10/10/2026 14:00 — Đối chiếu Mẫu 31 ↔ Dư nợ chi tiết
- **Anh yêu cầu:** cả 2 file báo số tiền, số dòng để biết có khớp không; thêm vào bảng đối chiếu ② Kiểm tra tháng.
- File Dư nợ chi tiết lưu thêm cột số tiền **chỉ để đối chiếu** (dư nợ trong hạn / quá hạn / khoanh / tổng, giải ngân, đảo khoản, thu nợ TH / QH / khoanh, gốc xóa tháng, số dư 105, tình trạng món) và tách dòng lặp khế ước như Mẫu 31 (không cộng trùng). Số liệu chính vẫn là Mẫu 31.
- Dòng nạp Dư nợ chi tiết hiện tóm tắt như Mẫu 31 (món đang vay / tất toán, dư nợ…).
- **Bảng đối chiếu** thêm cột **"Dư nợ CT"** (dư nợ, quá hạn, khoanh, cho vay tháng, thu nợ tháng, tiền gửi 105, số KH dư nợ) so với số chuẩn BCDHTD / LEN_31 như các cột khác, theo từng xã.
- **Mục kiểm tra 5 (thay Mẫu 10): "Mẫu 31 ↔ Dư nợ chi tiết"** — so số món, số khách có món, tổng dư nợ, số dư 105 (khách có món — Dư nợ chi tiết không có khách chỉ gửi tiết kiệm); lệch thì liệt kê món (chỉ có ở 1 file / dư nợ khác). Chỉ báo, không sửa. File nạp ở 3.120 (chưa có số tiền) → nhắc nạp lại, không báo lệch sai.
- Đọc thử file thật của anh (chỉ trên máy thử): tổng dư nợ 743.685,283 tr — khớp Mẫu 31 T9 trên bảng đối chiếu anh gửi.
- Kiểm tra: `kiem.py` sạch; t124 mới (8 phép); t123 cập nhật (lưu thêm cột đối chiếu); hồi quy không lỗi.

---

## 3.120 — 10/10/2026 09:00 — Dòng "Dư nợ chi tiết" (tham chiếu TK 105 + điểm GD) · bỏ hẳn Mẫu 10
- **Anh chốt:** từ nay chỉ xuất 2 file — **Mẫu 31** (số liệu chính) và **Dư nợ chi tiết** (cùng khuôn Mẫu 31, có thêm cột Sổ tiết kiệm 105 + Mã / Tên điểm giao dịch). File Dư nợ chi tiết **chỉ dùng tham chiếu số TK 105 và điểm giao dịch xã**; 2 dòng nạp riêng cho dễ nhận biết. **Bỏ hẳn Mẫu 10.**
- **Nguyên nhân số TK 105 sai (dạng 1482…, 14 chữ số):** đến từ cột "Số TK" của **Mẫu 10** (số tài khoản hệ thống), app lấy theo file mới nhất nên đè lên. Số sổ 105 đúng là 10 chữ số (cùng dạng Mã KH).
- **Loại mới `dnct`** (nhóm Ⓑ, không bắt buộc, `thamChieu`): nhận theo cột (Số khế ước, Mã KH, Tổng dư nợ, **Mã điểm giao dịch**, Sổ tiết kiệm 105); Mẫu 31 thêm `khong:['ma diem giao dich']` để 2 file không lẫn. Chỉ lưu cột tham chiếu (`L.chi`: ku, kh, tên, số sổ, điểm GD, ngày GDXA, tổ, thôn, xã) — nhẹ máy.
- **Số TK 105:** `slStk` chỉ nhận số 10 chữ số; danh bạ lấy số sổ từ Dư nợ chi tiết (`stkNguon='dnct'`, Mẫu 31 nạp sau không đè; kỳ mới thay kỳ cũ); Tra cứu KH, Tổ TK&VV (`slStkKH`), sao kê "cần mở TK 105" (có số dư 105 hoặc có số sổ tham chiếu là đã có sổ). **Số dư 105 vẫn theo Mẫu 31** (nay không phụ thuộc có số sổ). Cột ưu tiên "Sổ tiết kiệm 105" trước "Số TK".
- **Điểm GD xã:** tổ lấy thẳng Mã / Tên điểm giao dịch từ Dư nợ chi tiết cùng kỳ (ưu tiên trước Thông tin tổ trưởng / DSTO / suy theo ấp), ghi căn cứ "Dư nợ chi tiết T…".
- **Bỏ Mẫu 10:** loại `m10` thành "đã bỏ" (thả file → báo không dùng nữa); `slLaHS` chỉ còn Mẫu 31; bỏ dùng tạm Mẫu 10 cuối tháng (bộ dữ liệu kỳ, KTGS tháng trước, cây tổ), bỏ phép so Mẫu 31 ↔ Mẫu 10 và cột Mẫu 10 ở bảng đối chiếu. **Dọn 1 lần khi mở app (`slBoMau10`):** bản Mẫu 10 đã nạp bỏ khỏi máy, đánh dấu xóa (máy khác cũng bỏ), file trên Drive vào Thùng rác (chưa nối Drive thì để hàng chờ `sl_rac_cho`); danh bạ **làm sạch tại chỗ** 1 lần (`SL_DB.b120`): bỏ số sổ không đủ 10 chữ số; không dựng lại từ bảng — t103 phát hiện máy chưa tải bảng mà dựng lại thì danh bạ rỗng và chặn kéo danh bạ từ Drive; chỉ ghi lại (đẩy Drive) khi thật sự có sửa.
- **Cây chọn tổ** (chip + danh sách, mọi tab): tổ xếp **theo ấp** (số / tên ấp), cùng ấp theo tên tổ trưởng; không có ấp (vay trực tiếp) xuống cuối — anh báo chip lộn xộn (`pvLuaChon`).
- Kiểm tra: `kiem.py` sạch; t123 mới (19 phép, file Dư nợ chi tiết giả); t101 (phép Mẫu 10 cũ) chuyển thành kiểm "Mẫu 10 đã bỏ", bản cũ giữ ở `tests/t101_mau10_cu.js`; t103 chuyển sang bộ giả nhỏ có Mẫu 31 `tests/gianho31`; hồi quy không lỗi. Đọc thử file thật của anh (chỉ trên máy thử, không đưa vào repo): nhận đúng loại, kỳ 09/2026, 25.325 món, số sổ 10 chữ số.

---

## 3.119 — 09/10/2026 19:00 — Rà việc đã chốt: đầu văn bản Phân công
- Rà lại các việc anh đã chốt (3.113 → 3.118): sót 1 chỗ — quy tắc "tên đơn vị dài xuống dòng trước XÃ / PHƯỜNG" chưa áp cho đầu văn bản Phân công BTV ("HỘI CỰU CHIẾN BINH XÃ / TRUÔNG MÍT" bị ngắt giữa tên). Nay dùng chung `ktHXCo` như Kế hoạch (vừa cỡ 13 thì giữ, không thì cỡ 12, vẫn dài thì xuống dòng trước XÃ / PHƯỜNG), Word + bản In.
- Các việc khác đã chốt đều có trong 3.118 (đã đối chiếu); "nhớ người ký theo từng Hội" chưa làm — chờ anh xác nhận.
- Kiểm tra: t122 thêm 1 phép (27/27); hồi quy không lỗi.

---

## 3.118 — 09/10/2026 17:00 — Rà mẫu chung 06 / 16 / 04 · Phân công BTV chia sẵn theo cây
- **Rà mẫu theo ảnh anh gửi (áp chung các mẫu, Word + bản In):**
  - "Chức vụ:" có hai chấm (Mẫu 06 trước ghi "Chức vụ ").
  - Chữ đứng sau dòng chấm cách 1 khoảng (Địa bàn, Chức vụ, Tổ TK&VV ở 06; Chức vụ ở 16, 04); bản In `.kt-ld` thêm lề phải.
  - Tên đơn vị kiểm tra dài (Mẫu 06) xuống dòng trước "xã / phường" (`ktTachDV`, đo bề rộng ô 4219 twip).
  - Chức vụ không vừa chỗ → viết tắt "Ban Thường vụ" → BTV, "Ban Chấp hành" → BCH (`ktCVGon`; 06, 16, 04).
  - Mẫu 06: Cán bộ chứng kiến ngang hàng Cán bộ kiểm tra (Word: dòng chấm thứ 2 ra ngoài bảng ký, ô trái thêm dòng trống như dòng "Ngày …"; bản In: ô ký canh trên — trước bị canh giữa dọc theo bảng); số tiền dòng Cộng in đậm.
  - Mẫu 16 / 04: có tên đơn vị thì bỏ dòng "ĐƠN VỊ KIỂM TRA", tên lên dòng đầu (dài thì xuống dòng trước "XÃ / PHƯỜNG …"); để trống (ghi tay) thì giữ nhãn + dòng chấm (`{{DV0|ĐƠN VỊ KIỂM TRA}}`, `ktDV04`).
  - Mẫu 16: "(tỷ lệ 0%)" thống nhất cả nợ quá hạn và nợ khoanh (trước "tỷ lệ0%" dính, "0 %" cách).
  - Mẫu 06: số tiền dòng Cộng dài (vd 1.653,808) không còn rớt dòng — tự thu cỡ chữ cho vừa ô (`ktCoVua`, khuôn `{{SZTDN|22}}`), không làm tròn số.
  - Mẫu 04: nơi nhận "- PGD NHCSXH <đơn vị trong Cài đặt>;" (`ktNoiNhanNH`).
- **Phân công BTV:** ấp lấy đủ của xã (mọi tổ, mọi Hội) theo thứ tự cây (điểm GD → ấp); mở lần đầu tự chia sẵn (`ktPCChia`): Chủ tịch / Bí thư ≈ nửa phần (≥ 1 khi đủ ấp, ít ấp hơn số người thì không nhận), rồi Phó 1–3, Ủy viên 1–5, mỗi người 1 đoạn liền nhau, dư dồn người trước; Chủ tịch có ấp → thêm câu "Trực tiếp thực hiện kiểm tra tại …"; nút ⇄ Chia lại đều; hộp có ô Nhiệm kỳ, Số HĐ ủy thác, Ngày ký HĐ (lưu chung khai báo Hội).
- Kiểm tra: `kiem.py` sạch; t122 mới (25 phép); t106, t108, t111, t115, t119 cập nhật theo cách ghi mới; hồi quy không lỗi.

---

## 3.117 — 09/10/2026 15:00 — Mẫu 06 phân trang · Thông báo phân công nhiệm vụ Ban Thường vụ
- **Mẫu 06** (anh yêu cầu rà 1 hộ → nhiều hộ, 1 mặt nếu được): lề trên / dưới 1 cm (Word `pgMar` 567, bản In `@page 10mm`), thu khoảng cách phần nhận xét. Đo bằng PDF Chromium: **1 mặt chứa tối đa 3 dòng khế ước** (1, 2, 3 hộ mỗi hộ 1 khế ước). Nhiều hơn: Word gắn "giữ với dòng sau" (`dongKN`) cho các dòng của 1 khách nhiều khế ước và cho hộ cuối → không cắt đôi hộ, hộ cuối sang trang cùng dòng Cộng + nhận xét + ký; bản In mỗi hộ 1 `<tbody class="kt-ho">` không tách trang, hộ cuối nằm trong khối `kt-giu`; tiêu đề bảng lặp lại ở trang 2.
- **Thông báo phân công nhiệm vụ BTV** (theo mẫu tham khảo anh gửi): nút 📄 trên mỗi thẻ ở 🏛 Khai báo Hội đoàn thể → hộp tích ấp phụ trách kiểm tra từng người (⇄ Gợi ý chia đều cho Phó + ủy viên; Chủ tịch phụ trách chung), kiêm kế toán / thủ quỹ; xem trước, In / PDF, Word (A4 dọc, Times 14). Nội dung: căn cứ Điều lệ, HĐUT (số, ngày), Quy chế BCH nhiệm kỳ; Chủ tịch 10 nhiệm vụ, Phó 6, ủy viên 1 (+ kế toán / thủ quỹ nếu tích) + "nhiệm vụ khác"; nơi nhận; ký TM. BAN THƯỜNG VỤ / CHỦ TỊCH. Đoàn: BCH ĐOÀN XÃ …, Số -TB/ĐTN, ĐOÀN TNCS HỒ CHÍ MINH, ký BÍ THƯ. Lưu `D.cauHinh.ktPC` (lên Drive).
- Nút **📄 Phân công BTV** đặt ở dòng tiêu đề mỗi thẻ (anh duyệt — để cuối thẻ khó thấy).
- Thẻ Hội – xã thêm ô **Phó Chủ tịch 2, 3** và **Nhiệm kỳ** (`KT_HKB_O` 15 ô); người kiểm tra / ký chọn được PCT 2, 3.
- Mặc định em chọn (anh chưa trả lời 4 câu hỏi): tối đa 3 Phó; ấp tích tay + nút chia đều; sửa chữ sai trong mẫu tham khảo ("tháo gỡ", "các ban liên quan đến"); Đoàn ký BÍ THƯ.
- Kiểm tra: `kiem.py` sạch; t121 mới (21 phép, có đếm trang PDF); t110 / t118 cập nhật số ô thẻ; hồi quy không lỗi.

---

## 3.116 — 09/10/2026 11:00 — Mẫu 16 Bảng II bỏ chữ "đầy đủ"
- Anh chốt: giữ cách ghi như 3.115, chỉ bỏ chữ "đầy đủ" (không khẳng định quá); điều cấm ghi rõ "Không".
- `KT_B16`: Theo cụm dân cư liền kề · 02 người (Tổ trưởng, Tổ phó), có phân công cụ thể · Không ×3 · Tại văn phòng ấp / khu phố, định kỳ theo quý · Có thực hiện · **Đảm bảo đúng thành phần** · **Có tham gia** · Không · **Có thực hiện** · **Có tham gia** · Có phối hợp · **Có lưu giữ**.
- Kiểm tra: `kiem.py` sạch; t115 / t120 cập nhật chữ; t106–t120, hoiquy2 không lỗi.

---

## 3.115 — 09/10/2026 09:00 — Mẫu 06 không rớt dòng Tổ · tên dưới khối ký 06 / 16 · Bảng II Mẫu 16 như mẫu tham khảo · dính chữ KH ①
- **Mẫu 06** (ảnh anh gửi: Tổ TK&VV rớt dòng): `ktDong3_06` thử lần lượt — Tổ thẳng cột Chức vụ → thu khoảng cách (Địa bàn sát Thời điểm, Tổ sát Địa bàn) → bỏ ", tỉnh Tây Ninh" → viết tắt KP / P. / X. / TT. (`ktDbGon`); vẫn không vừa mới cho Tổ xuống dòng. Địa bàn in ra = bản gọn đã chọn (Word + In).
- Cột Chương trình canh giữa ngang + dọc (`ktOGiua`, bản In `td.giua`).
- Tên người kiểm tra 1 in dưới "CÁN BỘ KIỂM TRA (Ký, ghi rõ họ tên)" (`ktKyTen`); chọn để trống thì không in.
- **Mẫu 16:** tên Trưởng đoàn (người kiểm tra 1) và Tổ trưởng in dưới khối ký; **Bảng II** khi chọn điền ghi theo Mẫu 16 điền tham khảo anh gửi (`KT_B16`): Theo cụm dân cư liền kề · 02 người (Tổ trưởng, Tổ phó), có phân công cụ thể · Không · Không · Không · Tại văn phòng ấp / khu phố, định kỳ theo quý · Có thực hiện · Đảm bảo, thành phần tham dự đầy đủ · Tham gia đầy đủ · Không · Thực hiện đầy đủ · Thực hiện đầy đủ · Có phối hợp · Có lưu giữ đầy đủ.
- **Rà soát dính chữ:** xuất mọi mẫu (06, 16, 04, KH ① ②) bằng dữ liệu giả, dò chữ ghép 2 âm tiết / dấu câu dính chữ — chỉ còn 2 chỗ ở KH ① (gốc khuôn): ")?Các" → ")? Các", "Lưu:VT" → "Lưu: VT".
- Kiểm tra: `kiem.py` sạch; t120 mới (13 phép); t115 / t119 cập nhật chữ Bảng II; hoiquy, hoiquy2, t101–t120 không lỗi.

---

## 3.114 — 08/10/2026 15:00 — Hộp chọn khi in · người kiểm tra theo vai trò · nhận xét nợ quá hạn, nợ khoanh
- **Hộp chọn khi in** (`ktInHop`, anh duyệt): bấm In / Word / Xem của mẫu nào thì hỏi lựa chọn mẫu đó, nhớ lần sau (`D.cauHinh.ktIn[mẫu]`, đồng bộ Drive):
  - Mẫu 06: cột Mục đích để trống / in sẵn · người kiểm tra (dòng 2 để sau, vẫn gõ tay được ở "Tùy chọn khác").
  - Mẫu 16: nhận xét gợi ý (mặc định) / trống · **Bảng II để trống (mặc định)** / theo 727 · người kiểm tra 1, 2.
  - Mẫu 04: nhận xét + kiến nghị gợi ý (mặc định) / trống · người kiểm tra 1 (Trưởng đoàn), 2; **tên người 1 in dưới "TRƯỞNG ĐOÀN KIỂM TRA"** (Word + In).
  - Kế hoạch: người ký Chủ tịch (mặc định) / Phó Chủ tịch / trống — chức danh luôn "CHỦ TỊCH" (anh tự thêm "P" khi phó ký).
  - Định kỳ hỏi cả 06 + 16; Kế hoạch + Mẫu 04 in chung hỏi cả 2. Nút ✚ Điền đầy đủ (mục đích, gợi ý, Bảng II). "Tùy chọn khác": đơn vị kiểm tra, Ông (bà) 2 gõ tay.
- **Người kiểm tra theo vai trò** (`ktNguoi`): Phó Chủ tịch (mặc định) / Chủ tịch / ủy viên BTV 1–5 / để trống; tên lấy theo Khai báo Hội của Hội phụ trách từng tổ (in nhiều tổ nhiều Hội vẫn đúng); vai trò chưa khai tên → in chức vụ, tên dòng chấm + nhắc cam trong hộp.
- **Nhận xét** Mẫu 16 / 04 (`ktDsDon` + `qh`, `kn`): liệt kê hộ nợ quá hạn, nợ khoanh (≤ 10 hộ, tiền lớn trước) với đề xuất nhẹ nhàng; món không giao dịch từ 3 tháng: "đôn đốc duy trì trả lãi, gửi tiết kiệm đều đặn".
- Đột xuất: ô Ngày kiểm tra cạnh nút In; các tab bỏ khung ✎ (chỉ còn dòng nhắc Khai báo Hội). Xem trước có nút "‹ Đổi lựa chọn in".
- Kiểm tra: `kiem.py` sạch; t119 mới (22 phép); t106 / t108 / t109 / t110 / t111 / t112 / t116 cập nhật cách gọi (cờ "đã chọn") và hộp chọn; hoiquy, hoiquy2, t101–t119 không lỗi.

---

## 3.113 — 08/10/2026 09:00 — Đồng bộ toàn bộ cài đặt qua Drive · 🏛 Khai báo Hội đoàn thể
- **Nguyên nhân anh gặp:** bảng khai báo Hội khai ở máy cơ quan, mở laptop không thấy — `cauhinh.json` chỉ chứa ~30 mục chọn tay, không có phần KTGS; sửa bảng khai báo cũng không tự đẩy.
- **Đồng bộ cài đặt (anh chốt: app cá nhân → lưu lên Drive hết):** `goiCauHinh` gửi mọi khóa `D.cauHinh` trừ `CH_RIENG` (độ rộng khung, cỡ chữ, camera, đang xem / đang chọn, khung mở – đóng, mốc đồng bộ / sao lưu). `chBam` (riêng máy) = dấu băm từng khóa lúc đồng bộ gần nhất: khóa máy này chưa sửa → theo Drive (cả phần đã xóa); đã sửa → gộp, máy này ưu tiên; lần đầu → gộp, Drive ưu tiên. `dongBoCauHinh('tu' | 'day' | 'lay')` luôn hỏi Drive trước rồi mới đẩy. Tự chạy khi nối Drive, khi quay lại app, và 4 giây sau mỗi lần `luu()` làm đổi phần cài đặt đồng bộ (`chTheoDoi`). Nút Lưu lên / Lấy từ Drive giữ nguyên.
- **🏛 Khai báo Hội đoàn thể** (tab đầu hàng chọn loại KTGS, `che='hdt'`): mỗi Hội – xã 1 thẻ — tên Hội cấp xã (trống = tên chuẩn theo cây), Chủ tịch, Phó Chủ tịch, 5 ủy viên BTV, số / ngày HĐUT, số / ngày KH Hội tỉnh (⇩ chép cho xã cùng Hội), dòng "In ra" như cũ; tab nhỏ **📖 Chuẩn hóa quy tắc** (từ hộp bật lên; ô đã sửa tô xanh, ↺ từng ô / cả bảng; thêm "Chức danh ủy viên"). Tên Hội cấp tỉnh sửa ở Chuẩn hóa.
- **Dùng khi in:** người kiểm tra Mẫu 06 / 16 / 04 = Phó Chủ tịch (chức vụ theo Chuẩn hóa); người ký Kế hoạch = Chủ tịch. Khai báo cũ chuyển 1 lần (`ktHdtChuyen`): cán bộ chức vụ "Phó…" → Phó CT, "Chủ tịch / Bí thư" → CT, khác → ủy viên (vẫn in như cũ khi chưa khai Phó CT); người ký → CT.
- Các tab mẫu bỏ khung ✎ Hội – xã / bảng cán bộ, thay bằng dòng nhắc (`ktHdtNhac`) Hội nào còn thiếu ô mẫu đó cần + nút sang khai báo. Lựa chọn khi in (mục đích, Bảng II, nhận xét…) tạm giữ ở khung ✎ — bản 3.114 chuyển thành hộp chọn khi in.
- Kiểm tra: `kiem.py` sạch; t117 mới (10 phép, 3 máy giả dùng chung Drive giả), t118 mới (22 phép); t108 / t110 / t111 cập nhật theo tab mới; hoiquy, hoiquy2, t101–t118 không lỗi.

---

## 3.112 — 07/10/2026 09:00 — Kế hoạch KTGS: chọn căn cứ 727 / 10566
- Anh gửi kế hoạch thật lập 15/01/2026 (trước văn bản 727) căn cứ hướng dẫn 10566/HD-NHCS ngày 29/12/2022. Anh chốt: áp cả khuôn ① ②, chỉ thay dòng căn cứ đầu, nội dung theo khuôn đã chuẩn hóa; chọn tay.
- Màn Kế hoạch có hàng **Căn cứ: 727 (từ 11/02/2026) · 10566 (trước 727)**, nhớ theo Hội (`ktHoiKB(...).ccKH`, `ktKHCC` / `ktKHDoiCC`); `ktBung01` thay `KT_CC727` → `KT_CC10566` trong khuôn; bản In đọc lại Word nên cùng nội dung; tên file thêm "(can cu 10566)".
- Mẫu 04 (lập kèm theo kế hoạch) giữ nội dung theo 727 như cũ.
- Kiểm tra: `kiem.py` sạch; t116 mới (12 phép); hoiquy, hoiquy2, t109–t116 không lỗi.

---

## 3.111 — 06/10/2026 14:00 — Mẫu 06 theo mẫu gốc · Mẫu 16 Bảng II điền sẵn · ngày ảnh scan khôi phục
- **Mẫu 06/TD** (anh duyệt):
  - Dòng đầu theo mẫu gốc: "Đơn vị kiểm tra" canh trái; "Chức vụ" không dấu hai chấm; "Thời điểm kiểm tra ⇥ Địa bàn kiểm tra ⇥ Tổ TK&VV" cùng dòng, đo chữ thấy dài thì Tổ xuống dòng (`ktDong3_06`); "Đơn vị tính: triệu đồng" dòng riêng. Tiêu đề PHIẾU KIỂM TRA cách trên 10 pt.
  - Cột: CT 1360, tiền theo sổ 992, tiền thực tế 850, Vào việc 1476 (twip). Dòng món cao tối thiểu 567 (≈ 1,0 cm, 2 dòng chữ), chữ 11; cột Chương trình cỡ 10; tên / mục đích đo thấy quá 2 dòng thì cỡ 10 (`ktDai2`, không cắt chữ).
  - Tên người vay viết hoa đầu từ trong mọi mẫu in (`tenHoaDau`, cả danh sách hộ Mẫu 04 / 16); app vẫn hiện như hệ thống.
  - Cột Nợ lãi (kiểm tra thực tế) = lãi tồn món (trong hạn + quá hạn, không ân hạn), triệu đồng; dòng Cộng có tổng (`TNL`); tổng giải ngân / dư nợ cỡ 11 không rớt chữ.
- **Mẫu 16/TD:** "ĐƠN VỊ KIỂM TRA" và tên đơn vị canh giữa bằng điểm dừng tab (1800 / 6350); Bảng II điền sẵn theo 727 (`KT_B16`: x việc phải làm, "Không" điều cấm, "Định kỳ theo quý"), khung khai báo có chọn "Để trống (ghi tay)", nhớ lần sau (`D.cauHinh.ktBang16`).
- **Ảnh scan khôi phục:** `tgTuId` chỉ nhận ngày từ 01/01/2020 đến hôm nay + 1 ngày; ngoài khoảng → hôm nay (hết "2036-02").
- Kiểm tra: `kiem.py` sạch; t115 mới (21 phép); t106 / t110 / t111 cập nhật theo bố cục mới; hoiquy, hoiquy2, t101–t115 không lỗi.

---

## 3.110 — 06/10/2026 10:00 — Kế hoạch KTGS: sửa chữ dính
- Anh gửi ảnh khuôn ②: "Địa điểm:Văn phòng", "phườnggiao". Nguyên nhân: bản 3.105 (chuẩn gạch đầu dòng) xóa nhầm các ô chữ chỉ có dấu cách nằm giữa câu. Đối chiếu từng đoạn với khuôn 3.104 và chèn lại đúng dấu cách: khuôn ① 7 chỗ ("hạn. Thực", "giữ hồ", "nghệ, đào", "không? Có", "giữ sổ"…), khuôn ② 3 chỗ ("Hội nhận", "Địa điểm: Văn", "xã giao"). Dấu cách 3.105 cố ý thêm sau "+" giữ nguyên.
- Kiểm tra: `kiem.py` sạch; t114 thêm phép chống tái phát (20 phép); hồi quy Kế hoạch t109 / t110 / t111 / t113.

---

## 3.109 — 06/10/2026 09:00 — Mẫu 04 / Mẫu 16: ngày theo tháng kiểm tra, nội dung kiểm tra, kiến nghị liệt kê hộ
- **Mẫu 04/BC-TH** (anh duyệt):
  - Dòng ngày: "{xã}, ngày ....... tháng mm năm yyyy" — tháng kiểm tra (tháng kế hoạch, hoặc tháng ngày đã ghi, mặc định tháng sau số liệu); ngày ghi tay (`NOI04`, `TH04`, `NAM04`).
  - III. Nội dung kiểm tra: 2 ý ghi sẵn (`KT_ND04`) — hoạt động Tổ / Ban quản lý Tổ theo khoản 3 Phụ lục I văn bản 727; kiểm tra sử dụng vốn, đối chiếu dư nợ, lãi tồn, tiền gửi (mẫu 06/TD) + 1 dòng chấm.
  - IV.1 nhận xét từng tổ thêm "n tổ viên còn lãi tồn … đồng, trong đó m hộ lãi tồn trên 6 tháng lãi".
  - IV.2 kiến nghị (`ktKN04`) — a) chỉ đạo Ban quản lý Tổ đôn đốc; b) theo từng tổ "đề nghị Ban quản lý Tổ phối hợp đôn đốc các hộ: + Món vay không có giao dịch từ 3 tháng trở lên: … + Còn lãi tồn trên 6 tháng lãi: …"; c) tổ viên. d), đ), mục 3 giữ dòng chấm. (Thay quy tắc 3.106 "kiến nghị để trống".)
- **Lãi tồn cao** (anh chốt): lãi tồn món (trong hạn + quá hạn, không tính ân hạn) > 6 × lãi 1 tháng; lãi 1 tháng = dư nợ × lãi suất (cột Lãi suất Mẫu 31, %/năm ÷ 12; ≤ 2 coi là %/tháng — suy luận, chưa thấy Mẫu 31 thật). Không có lãi suất (chỉ Mẫu 10) → không xét. Mỗi tổ tối đa 10 hộ + "và n hộ khác" (`KT_DS_TOI`, `ktDsDon`, `ktDsKHD`, `ktDsLTC`).
- **Mẫu 16/TD:** chưa khai ngày kiểm tra → tháng / năm theo tháng kiểm tra, ngày ghi tay; III. Tồn tại / Kiến nghị ghi tên hộ (món không giao dịch từ 3 tháng, lãi tồn trên 6 tháng lãi), kiến nghị "Đề nghị Ban quản lý Tổ phối hợp đôn đốc …".
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t114 không lỗi (t114 mới, 19 phép; t108 cập nhật số dòng chấm vì III và a b c đã ghi sẵn).

---

## 3.108 — 05/10/2026 22:00 — nạp Danh sách tổ (DSTO) đối chiếu với Thông tin tổ trưởng · tên tổ trưởng chuẩn
- **Loại file mới `dsto`** (nhóm Ⓓ phụ, không bắt buộc) — "Danh sách tổ TK&VV" (…_DSTO.xlsx): nhận theo cột MÃ TỔ + MÃ ĐIỂM GDX + ĐƠN VỊ ỦY THÁC, kỳ theo tên file (`_30092026_` → T9). Trường mới: `dvTen` (Hội bằng chữ → mã qua `toDvTuTen` / `TW_HOI`), `ttKH` (mã KH tổ trưởng), `skv`, `tk`; tổ phó "(HIỆN TẠI)"; cột còn lại giữ `c_…` (xếp loại, năm sinh, tuổi — chưa dùng).
- **Đọc đủ dòng:** file DSTO hệ thống khai `<dimension A1:AA14>` dù dữ liệu tới dòng 382 → SheetJS chỉ đọc 6 tổ. `slSuaRef` mở rộng `!ref` theo ô thật (cả đọc trực tiếp và Worker). Dòng tên cột phụ "CÒN LÃI TỒN / CÒN TIẾT KIỆM" → tiêu đề; "Thủ trưởng đơn vị", "(Ký, ghi rõ họ tên)" → phần ký.
- **Dựng tổ (`toNap`):** sau Thông tin tổ trưởng, DSTO cùng tháng bổ sung trường còn trống; tổ không có trong file tổ trưởng lấy điểm GD theo DSTO (`diemTu` = "Danh sách tổ T9/2026"), trước bảng tháng khác / danh bạ / suy. Ngày GDXA thiếu → theo mã điểm GD của tổ khác.
- **② Kiểm tra — đối chiếu 2 danh sách (`slKTDsTo`, nhóm 6, chỉ khi có DSTO):** tổ có món thiếu trong Thông tin tổ trưởng (lưu ý — app đã bù) / thiếu trong DSTO; tổ trong danh sách không còn món dư nợ; lệch điểm GD; lệch tổ trưởng / SĐT (không phân biệt hoa thường, bỏ Ông / Bà); lệch Hội (DSTO, Thông tin tổ trưởng ↔ ĐVUT món); tên không dấu chưa tìm được tên có dấu. **Không so dư nợ / số tổ viên / số khoản vay**: số thật T9 lệch 139 / 305 / 134 tổ (DSTO không cùng thời điểm với Mẫu 31). Có DSTO thì bỏ phép cũ "Tổ … có trong danh sách tổ trưởng" (không báo trùng).
- **Tên tổ trưởng / tổ phó (anh chốt, `toTenChuan` — 1 lần mỗi kỳ khi dựng tổ):** bỏ "Ông / Bà / Ong / Ba" đầu tên (còn ≥ 2 chữ); tên không dấu → tên có dấu trên Mẫu 31 theo mã KH tổ trưởng (DSTO) hoặc thành viên tổ trùng tên (so không dấu); viết hoa chữ đầu mỗi từ (`tenHoaDau`); không tìm được thì giữ không dấu + `tenKhongDau`. Tên gốc giữ ở `t.tenGoc`. **Tên hộ vay giữ nguyên** như hệ thống. Thử số liệu thật T9 (chỉ đọc, không đưa vào repo): 179 tên đổi, 0 còn IN HOA / Ông / Bà, 13 tên không dấu chưa tìm được (dùng Mẫu 10; Mẫu 31 có thể tìm thêm).
- Thử số liệu thật T9 (TT T8 + T9, DSTO, Mẫu 10 30/09): 370 tổ, 0 chưa rõ điểm GD, 18 tổ lấy điểm theo DSTO; đối chiếu điểm GD / Hội / tổ trưởng / SĐT khớp hết.
- **Kế hoạch KTGS (anh gửi ảnh khuôn ②):**
  - Gạch dưới tên cơ quan khuôn ② vẽ theo màu giao diện (`schemeClr accent1` → xanh) → đặt hẳn đen, nét 0,75 pt; xích lên (`posOffset` 10000 → −25400). Gạch dưới tiêu ngữ xích xuống (193675 → 226695).
  - Tên cơ quan dài bị xuống dòng: nới cột trái (② 4300 → 4560, ① 4081 → 4380; cột phải vẫn đủ cho "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM") + `ktHXCo(hx, rộng)` đo chữ (canvas, Times New Roman đậm): vừa cỡ 13 thì giữ, không thì cỡ 12, vẫn dài thì 2 dòng ngắt trước "XÃ / PHƯỜNG / THỊ TRẤN" (cỡ chữ qua `{{HXZ|26}}`). Đường gạch dời theo cột mới (giữ canh giữa như cũ).
  - Khuôn ②: bỏ "- " trước câu "Hội … xây dựng kế hoạch …".
  - Lịch kiểm tra trong Kế hoạch dùng tên tổ trưởng đã chuẩn (`toTenChuan`).
- **⚙ Bảng khai báo Hội – xã (anh gửi ảnh):** dòng "In ra:" tràn đè sang ô bên cạnh (bảng `white-space:nowrap`) → xuống dòng trong ô, tối đa 3 dòng, rê chuột xem đủ (`title`). Số KH "06-KH/HNDT" bị nhắc cam nhầm (đòi "/KH") → chỉ cần có chữ "KH".
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t113 không lỗi (t113 mới, 35 phép).

---

## 3.107 — 05/10/2026 18:00 — tổ thiếu trong file Thông tin tổ trưởng · vay trực tiếp theo ấp · KTGS bỏ mục trực tiếp · Mẫu 16 Đoàn kiểm tra
- **Rà số liệu thật T9/2026 (anh nhờ, chỉ đọc):** file Thông tin tổ trưởng T9 xuất **thiếu 26 tổ** so với T8 (352 / 378); 18 tổ vẫn còn món (993 món, ≈ 40,3 tỷ). Hội (mã ĐVUT món) khớp 100% bảng tổ; mỗi ấp chỉ thuộc 1 điểm GD → suy theo ấp đúng như bảng T8. Chip "(chưa rõ điểm GD)" ở Gia Lộc = 1 món vay trực tiếp không trùng ngày GDXA tổ nào.
- **B. Điểm GD tổ thiếu:** bảng tổ tháng khác chỉ lấy bảng **chốt tháng** (bỏ bảng theo ngày), **tháng gần kỳ đang xem nhất trước**, tối đa 6 bảng (trước chỉ 4 bảng "mới nhất", có thể toàn bảng theo ngày); ghi căn cứ `t.diemTu`. Không mở được bảng → **danh bạ tổ** (`SL_DB.to`, chỉ nhận khi đối được ra mã điểm GD của tổ cùng xã — `toDanhBaDiem`) → suy ấp / ngày GDXA như cũ.
- **A. Vay trực tiếp:** điểm GD theo **ấp của món** (danh mục địa bàn / tổ cùng ấp) → ngày GDXA trùng tổ cùng xã → xã chỉ 1 điểm GD; không xếp được vẫn để "chưa rõ" (không đoán).
- **C. Dòng báo vàng KTGS:** "File Thông tin tổ trưởng T9/2026 thiếu n tổ (có trong Mẫu 31) — đã xếp điểm GD: tháng trước a · danh bạ tổ b · theo ấp c · ngày GDXA d"; bấm ra bảng từng tổ (xã, ấp, Hội, điểm GD + căn cứ, món còn dư nợ); chưa nạp file kỳ này thì báo "Chưa nạp …".
- **E. KTGS Hội:** cây chọn bỏ mục "Trực tiếp" / "Vay trực tiếp" (`PV_DUNG.kt.boTT`, `pvBoTT`); tab Tổ TK&VV, Tra cứu KH, Sao kê giữ nguyên.
- **D. Mẫu 16:** "ĐOÀN KIỂM TRA:" = tên Hội cấp xã của tổ theo Bảng chuẩn hóa (`ktHoiTenTD`), trực tiếp → dòng chấm; bỏ ô khai "Đoàn kiểm tra"; dọn `ktKBLuu.doan` khi mở app.
- Kiểm tra: `kiem.py` sạch; hoiquy2, t101–t112 không lỗi (t112 mới 23 phép; t106 / t110 / t111 cập nhật theo quy tắc 3.107: bỏ ô Đoàn, dòng báo mới). hoiquy: 1 lần chạy cả bộ báo 1 ✗ không rõ phép, chạy lại 7 lần (cả khi chạy song song) đều sạch — ghi nhận chập chờn, chưa tái hiện.

---

## 3.106 — 05/10/2026 14:00 — Mẫu 04 theo ý anh · Kế hoạch ① ② · dòng "In ra" ở bảng khai báo · chép file hàng loạt · dọn dữ liệu rác
- **Mẫu 04/BC-TH** (anh chốt, văn bản 727):
  - I.1 Đoàn kiểm tra = **cán bộ kiểm tra khai cho Mẫu 06 / 16** (cán bộ của Hội – xã + "Ông (bà) 2" ở khung ✎ Khai báo), dạng "- Ông (bà): … ⇥ Chức vụ: …" + **2 dòng in sẵn** "- Ông (bà): …… Chức vụ: ……" để ghi tay (`ktDoan04`). I.2 cấp ủy: 2 dòng chấm.
  - II. Thời gian: **"Tháng mm/yyyy"** — mặc định tháng sau tháng số liệu (`ktThangKT`), không ghi ngày. Địa điểm: **ấp, xã, tỉnh** (dài quá 40 ký tự bỏ tỉnh — `ktDiaDiem04`); tiêu đề cột in sẵn của mẫu giữ nguyên.
  - IV.1: **bỏ ý a) và c)**; "Đối với Tổ TK&VV:" ghi tự động từng tổ: dư nợ, nợ quá hạn (số tổ viên), nợ khoanh, món vay không giao dịch từ 3 tháng — có tồn tại thì "Đề nghị Ban quản lý Tổ phối hợp … đôn đốc, có kế hoạch xử lý" (`ktNxTo04`). Mục 2, 3 kiến nghị để trống ghi tay. VI: thêm 2 dòng chấm ghi tài liệu khác. Khuôn `KT_KHUON.m04`: bỏ đoạn a)/c) mục IV.1, dấu `{{@NXTO}}`, thêm `{{@CHAM2}}` sau "2. Danh sách đối chiếu".
- **Kế hoạch ①:** mục thành phần ghi 1 câu chung theo Bảng chuẩn hóa: "… thành lập đoàn kiểm tra gồm: Các đồng chí Chủ tịch, Phó Chủ tịch, Ủy viên Ban Thường vụ …" (Đoàn: Bí thư, Phó Bí thư), bỏ dòng chấm. **Kế hoạch ②:** đủ 3 căn cứ như ① (727 · KH Hội tỉnh · Hợp đồng ủy thác) — số / ngày chưa khai để chấm (bỏ câu gọn `{{@KHT}}` / "Thực hiện một số nội dung…").
- **⚙ Bảng khai báo Hội – xã:** dưới mỗi ô dòng **"In ra:"** đúng chữ sẽ in (đầu trang / trong câu, căn cứ KH, căn cứ HĐ, cán bộ, người ký); trống = "(tự lấy)" nghiêng; đã gõ = đậm + nút **↺** về chuẩn; nghi sai (thiếu "/KH", ngày sai dạng, lặp "Hội") = cam. **Bỏ ô Đoàn kiểm tra** (không mẫu nào dùng nữa); khung Mẫu 04 trong tab hiện cán bộ kiểm tra thay vào. Ô Đoàn kiểm tra ở khung ✎ của tab kiểm tra ghi rõ "chỉ in Mẫu 16".
- **Dọn dữ liệu rác** (anh chốt): `ktgsLS`, `ktgsNK`, `ktgsGN` (bỏ từ 3.98), `ktHoiKB[…].doan` — xóa mỗi lần mở app (bản cũ trên Drive gộp lại vẫn bị dọn); dự phòng đầu ngày vẫn có.
- **📋 Chép file** (anh chốt): nút 📋 trên từng dòng văn bản (cầu nối, 1 file). **☑ Chọn chép** ở đầu tab → bấm chọn nhiều file → "📋 Chép n file" — cầu nối đặt cả danh sách vào bộ nhớ tạm Windows, Ctrl+V một lần là dán hết; tối đa 20 file / lần (ít hơn nếu tên dài — giới hạn độ dài lệnh), còn lại "📋 Chép tiếp"; file chưa lên Drive bỏ qua và báo. Cầu nối **bản 2** (lệnh `chepn`, danh sách gói base64url UTF-8): máy đã cài bản cũ thì lần đầu chép nhiều app hỏi cài lại 1 lần; "Mở thử" hiện "bản 2".
- Gộp luôn 3.105 (gạch đầu dòng Kế hoạch).
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t111 không lỗi (t108 / t110 / t111 cập nhật theo quy tắc mới; t111 thêm 8 phép 3.106).

---

## 3.105 — 05/10/2026 10:00 — Kế hoạch KTGS: gạch đầu dòng chuẩn
- Anh gửi ảnh mục "2. Ban quản lý Tổ TK&VV" (khuôn ②): dòng gạch đầu dòng thụt bằng dấu cách, không đều. Sửa **một lần cho cả 2 khuôn** (`KT_KHUON.m01`, `m01b`): mọi đoạn thân văn (căn đều) bắt đầu bằng "-" / "+" → bỏ khoảng trắng đầu dòng, chuẩn "- " / "+ " (một dấu cách), thụt đầu dòng thống nhất (① 720, ② 567 twip; trước lẫn 426 / 562 / 567 / 680 / không thụt). Phần Nơi nhận giữ nguyên. Chữ khuôn không đổi (đã so).
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t111 không lỗi.

---

## 3.104 + HanTraHSSV.exe 1.2.1 — 05/10/2026 09:00 — tên tác giả
- Anh chốt: ghi **"NhanNT"** (chữ xanh lá nhỏ, **không số điện thoại** vì repo công khai) ở: dải trạng thái dưới cùng (sau ô Drive / bộ nhớ), dòng số bản trong Cài đặt và Hướng dẫn, cuối cửa sổ 📌 Nổi (ẩn ở mức thu nhỏ), cuối cửa sổ exe + thông tin file (Company / Copyright: NhanNT). Không gắn vào biểu mẫu in, Word, PDF.
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t111 không lỗi; app ↔ exe khớp.

---

## 3.103 (bổ sung) — 05/10/2026 — Tra cứu KH: tên hộ vay + mã KH nổi bật
- Anh chốt: **tên hộ vay và mã khách hàng luôn nổi bật** khi tra cứu. Danh sách bên trái: tên chữ xanh đậm + mã KH trong khung xanh ngay cạnh tên (dòng nhỏ còn CCCD, địa bàn). Đầu thẻ chi tiết: tên 19px đậm xanh, mã KH khung xanh 15px (`.tc-ten`, `.tc-ma`, dùng biến màu nên nền tối tự đổi). `t107` cập nhật theo quy tắc mới.

---

## 3.103 + HanTraHSSV.exe 1.2.0 — 04/10/2026 23:00 — HSSV: 3 mức thu nhỏ / thu gọn / chi tiết · nền sáng / tối
- **Cửa sổ 📌 Nổi** (anh chốt):
  - Mặc định **thu gọn**: dòng trên, ô nhập, 5 khối, câu chốt.
  - Nút **▾ Chi tiết / ▴ Thu gọn** hiện / ẩn bảng phát tiền vay, các kỳ trả, cách tính.
  - Nút **▁** thu nhỏ còn 1 dải: ô ra trường, tiền vay và 1 dòng kết quả "104 th · hạn … · 32.000.000 × 5 kỳ · lần đầu …" (bấm là chép câu chốt). Nút **▢** mở ra lại.
  - Cửa sổ tự co / giãn chiều cao theo mức (`resizeTo`, cần anh bấm / gõ — trình duyệt không cho thì giữ nguyên cỡ).
  - Nút **☀ / 🌙** đổi nền riêng cửa sổ nổi, nhớ lựa chọn (`tuhoso_hs_noi_mau`).
- **Khối HSSV ở nền tối** (cả trong app): 3 khối lớn nền xanh lá đậm chữ xanh sáng, 2 khối nhỏ nền xanh dương đậm — hết cảnh khối sáng trên nền tối.
- **🔎 Tra cứu KH** (anh góp ý): cột trái / phải đổi sang **40 / 60** (`minmax(320px,2fr) minmax(0,3fr)`) — danh sách bên trái không còn mất chữ. Dòng HSSV dưới món vay tô màu: **tên trường** chữ xanh đậm, **khóa học + nhập học → ra trường** khung cam (`.hs-truong`, `.hs-khoa`, có màu nền tối) — đối chiếu nhanh khi cho vay năm mới.
- **Exe 1.2.0:** cùng 3 mức (nút **Thu nhỏ / Mở ra** trên thanh đầu, nút **Chi tiết ▼ / Thu gọn ▲** dưới câu chốt), cửa sổ tự co giãn chiều cao; nút **Nền tối / Nền sáng** (mặc định sáng); nhớ mức + nền trong `hssv.ini`.
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t110 không lỗi; `t111` 77/77; app ↔ exe 1010/1010 ca khớp. Exe chạy thử bằng mono trên màn hình ảo (3 mức × 2 nền).

---

## HanTraHSSV.exe 1.1.0 — 04/10/2026 — gợi ý trong ô + giao diện rõ màu · sửa bố cục trên Windows
- **Gợi ý trong ô** (anh góp ý — như bản web): chữ xám `1–31` / `dd/mm/yyyy` / `vd 40` khi ô trống (EM_SETCUEBANNER), rê chuột hiện chú thích từng ô / khối, dòng hướng dẫn "Mỗi món: ngày ra trường → Enter → tiền vay → Enter…" luôn hiện dưới ô nhập.
- **Giao diện** (anh: "sơ sài, nhợt nhạt"): thanh đầu xanh #185FA5 như app (tên, loại khóa học, GDX, nút Ghim: Bật/Tắt, Chép câu chốt nền trắng chữ xanh); nền xám xanh, thẻ nhập nền trắng có viền; ô đang gõ nền vàng nhạt; 3 khối lớn nền xanh lá viền đậm 2px, số 15pt; 2 khối nhỏ xanh dương viền rõ; câu chốt nền xanh lá đậm chữ trắng; bảng kỳ trả: kỳ đầu tô xanh, kỳ cuối in đậm; báo lỗi / lưu ý nền cam nhạt.
- Anh thử trên Windows thật: khung kết quả bị co thành ô nhỏ có thanh cuộn, phần dưới trống. Nguyên nhân: `TableLayoutPanel` của Windows dồn ô khi dòng lưu ý / dòng lỗi đang ẩn → khung kết quả rơi vào hàng tự co (mono trên Linux không dồn nên không thấy). Sửa: gán cố định hàng cho từng phần (`goc.Controls.Add(x, 0, hàng)`). App không đổi. So app ↔ exe vẫn khớp.

---

## 3.102 — 04/10/2026 21:00 — Hạn trả HSSV: 📌 cửa sổ nổi + công cụ riêng HanTraHSSV.exe
- **📌 Nổi** (anh chốt): nút trên ô Hạn trả HSSV mở cửa sổ nhỏ **luôn nằm trên mọi cửa sổ** (Document Picture-in-Picture — Chrome / Edge 116+). Đủ ô nhập (loại, GDX, ngày vay, ra trường, tiền), 5 khối, câu chốt, Chép, 📝, Enter qua ô; dùng chung số liệu + công thức với app; ô trong app hiện "Đang mở ở cửa sổ nổi" (không trùng ô); **↩** / đóng cửa sổ thì ô trong app hiện lại với số đang nhập. Chép trong cửa sổ nổi dùng clipboard của chính cửa sổ đó, báo ngay trong cửa sổ. Trình duyệt chưa hỗ trợ → báo cần Chrome / Edge, gợi ý dùng exe.
- **Công cụ riêng `tools/hssv/HanTraHSSV.exe`** (C# WinForms, .NET Framework 4.x có sẵn trên Windows 10/11, ~30 KB, không cài): ghim trên cùng (bật sẵn), cùng bố cục 3 khối lớn + 2 khối nhỏ, câu chốt, chi tiết + dòng năm học, bảng kỳ trả; ngày vay gợi ý GDX gần nhất, tiền vay gợi ý theo năm học; gõ ngày tự thêm "/"; Enter / Shift+Enter / mũi tên; bấm khối là chép; nhớ GDX, ghim, vị trí cửa sổ (`%APPDATA%\TuHoSo\hssv.ini`). Mã nguồn `HanTraHSSV.cs`, dựng bằng `tools/hssv/dung.sh`; hướng dẫn `tools/hssv/README.md`.
- **Phát hành tự động** (anh chốt): `.github/workflows/hssv-release.yml` — gộp vào main có sửa `HanTraHSSV.cs` hoặc bấm *Run workflow* → so công thức app ↔ exe → dựng exe bằng csc trên Windows → đăng Release `hssv-v1.0.0.0` (file exe ở mục Assets). Lần đầu chạy ngay khi gộp bản này.
- **So công thức app ↔ exe:** `node tests/hssv_exe.js` — 3010/3010 ca khớp (ca anh chốt + ngẫu nhiên + ca lỗi / biên).
- Chưa kiểm được: exe chưa chạy trên **Windows thật** (máy làm việc là Linux, chạy thử bằng mono trên màn hình ảo — bố cục và số đúng); cửa sổ nổi thật cần Chrome / Edge có giao diện (phép thử giả bằng cửa sổ phụ).
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t110 không lỗi; `t111` 70/70.

---

## 3.101 — 04/10/2026 18:00 — Hạn trả HSSV: tiền vay gợi ý theo năm học
- **Tiền vay gợi ý tính theo năm học** (bắt đầu tháng 9; anh chốt), thay cho đếm tháng phát tiền vay: mỗi năm học 10 tháng vay = 40 tr, nửa năm 5 tháng = 20 tr.
  - Năm cuối theo **tháng ra trường**: 6–8 → tròn năm · **2–5** → nửa năm · 9–12 và **tháng 1** → tính vào năm học trước (0) — anh chốt: tháng 1 thường chưa đủ 6 tháng từ lúc nhận tiền.
  - Năm đầu theo **tháng vay**: 9–12 → tròn năm · 1–5 → nửa năm · 6–8 (nghỉ hè) → bắt đầu từ năm học sau. Vay và ra trong cùng năm học: cộng hai phần trừ 1; tối thiểu nửa năm.
  - Ví dụ anh gửi: 15/09/2026 → 15/09/2030 = 40 tháng (160 tr); → 15/02/2030 = 35 tháng (140 tr); → 15/12/2028 = 20 tháng (80 tr).
- Ô **Cách tính** thêm dòng liệt kê từng năm học (tròn năm / nửa năm / không tính).
- Thời hạn cho vay, hạn cuối, phát tiền vay: không đổi (vẫn theo tháng).
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t110 không lỗi; `t111` 62/62.

---

## 3.100 — 04/10/2026 16:00 — Hạn trả HSSV: ngày vay gợi ý GDX gần nhất · sửa làm tròn tiền vay
- **Ngày vay (giải ngân) tự gợi ý** = ngày giao dịch (số GDX ở dòng trên) **gần nhất kể từ hôm nay**; hôm nay đúng ngày GDX thì lấy hôm nay; tháng thiếu ngày (31, 30/02) lấy ngày cuối tháng. Đổi GDX (xã khác) thì gợi ý lại, trừ khi anh đã gõ tay. Nhãn "Ngày vay · GDX gần nhất".
- **Sửa làm tròn tiền vay gợi ý** (anh chốt — ca 26 tháng chỉ tính 2 năm = 80 tr): làm tròn **gần nhất** theo nửa năm thay cho làm tròn lên — phần dư trong nửa năm 1–2 tháng bỏ, 3–5 tháng tính thêm nửa năm (tối thiểu nửa năm). Ví dụ: 26 → 80 tr; 39 → 140; 41 → 140; 43 → 140 (3.99 ra 160); 46 → 160; 48 → 160.
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t110 không lỗi; `t111` 61/61.

---

## 3.99 — 04/10/2026 14:00 — Hạn trả HSSV: tự gợi ý tiền vay · 5 khối kết quả
- **Tự gợi ý số tiền vay** (anh chốt): theo thời gian phát tiền vay (ngày vay → ra trường), mỗi **nửa năm** (làm tròn lên, không tính lẻ) = 5 tháng vay = **20 triệu**; 1 năm = 10 tháng = 40 triệu. Ví dụ 48 tháng → 160 tr; 41 tháng (3 năm rưỡi) → 140 tr; 46 tháng → 160 tr.
- Ô **Tiền vay điền sẵn** số gợi ý (đang bôi đen khi Enter tới), anh gõ đè nếu cần; đổi ngày vay / ra trường (món mới) thì điền lại. Nhãn ô ghi "gợi ý 40 th = 160".
- **5 khối kết quả:** hàng 1 — 3 khối lớn xanh: **Số tiền vay** (dòng dưới "40 tháng vay (4 năm) × 4 tr", hoặc "Gợi ý: … tr" khi anh gõ khác) · Thời hạn cho vay · Hạn cuối theo GDX; hàng 2 — 2 khối **nhỏ, nền xám xanh** (ưu tiên thấp): Trả mỗi lần · Lần đầu. Điện thoại chữ nhỏ lại cho vừa.
- Kiểm tra: `kiem.py` sạch; hoiquy, hoiquy2, t101–t110 không lỗi; `t111` 59/59 (thêm 5 phép HSSV).

---

## 3.98 — 04/10/2026 10:00 — KTGS chỉ phục vụ in · Mẫu 06 bố cục mới · Mẫu 04 hai chỗ chọn · Bảng chuẩn hóa Hội – Đoàn · Mẫu 16 gợi ý nhận xét · điểm GD suy
- **Bỏ phần theo dõi** (anh chốt — "tạm không theo dõi, chỉ phục vụ in lấy mẫu, khi cần sẽ có quy tắc khoa học hơn"):
  - Mẫu 06 sau giải ngân: bỏ cột "Đã lập phiếu", dấu "↺ đã lập", không ghi `ktgsGN`.
  - Đột xuất: bỏ lịch sử / "lần kiểm tra trước" (`ktGhiLS`, `ktLanTruoc`, cột "KT gần nhất"); gợi ý hộ không còn né hộ đã kiểm.
  - Bỏ nhật ký `ktGhiNK` (06gn / 06dk / 16 / 16dk) gửi sang Mẫu 04.
  - Dữ liệu cũ `ktgsLS / ktgsNK / ktgsGN` **giữ nguyên trong cấu hình, không dùng** (không xóa).
- **Mẫu 06 (Word + In / PDF):**
  - Đơn vị kiểm tra đã điền → **bỏ dòng chấm thứ 2**; để trống → giữ 2 dòng chấm.
  - 4 dòng đầu dựng bằng **điểm dừng tab** (`ktCB06`): "Chức vụ" 2 dòng cán bộ **thẳng cột**; ô có chữ → khoảng trắng, trống → chấm.
  - Địa bàn: "**ấp / khu phố …, xã / phường …, tỉnh Tây Ninh**" (xã → ấp, phường → khu phố, trong câu viết thường), tab rồi "Tổ TK&VV: …".
  - "Thời điểm kiểm tra" cùng dòng "Đơn vị tính: triệu đồng".
  - Cột: Stt 1,0 → 0,8 cm · Chương trình, Tổng GN, Dư nợ 2,0 → 1,5 cm · **Mục đích 2,0 → 3,7 cm**; cột ghi tay giữ nguyên. Số tiền triệu, bỏ số 0 thừa.
  - Mọi dòng bảng cao ≥ **1,5 cm** (3 dòng chữ ở cột Mục đích); bù cho đủ 2 dòng.
  - **1 khách nhiều khế ước** → Stt, Họ tên, ô Ký gộp dọc (Word `vMerge`, In `rowspan`); Stt đếm theo hộ.
  - Hộ xếp theo **mã KH**.
  - Cột Mục đích: món có **Mã PNKT52** khác PNKT51 (vd nước sạch 36000 + vệ sinh 39000) → in cả 2; ⚙ Bảng ngành đếm cả PNKT52. Tra cứu KH cũng hiện đủ 2 mục đích.
  - Không đo được trang Word bằng LibreOffice trong máy làm việc (thiếu Writer); đo bản In: 1–2 dòng vừa 1 trang, từ 3 dòng sang trang 2 (tiêu đề bảng lặp lại).
- **Sau giải ngân: mỗi tổ 1 phiếu** cho cả lần kiểm tra (gom các tháng đã chọn; 1 khế ước GN nhiều tháng lấy tháng mới nhất).
- **Xem trước nhiều phiếu / biên bản / báo cáo: mỗi bản 1 tờ riêng** có nhãn (`ktGhepTo`); khi in mỗi bản sang trang mới.
- **Danh sách chọn hộ chung 3 màn** (đột xuất, sau giải ngân, định kỳ — `ktHoDongHTML`): Chọn · STT · Mã KH · Họ tên · Món vay (mã KV, số KU, CT, dư nợ, ngày GN) · Lãi tồn · Số dư 105 · Ghi chú tình trạng; xếp theo mã KH. Sau giải ngân: tích theo hộ, nhiều món thì tích từng món.
- **Mẫu 04 hai chỗ lập:**
  - ① tab con 📋 Mẫu 04: chọn xã / hội ở cây → tổ chia nhóm theo ấp, **tích cả ấp hoặc từng tổ**, mặc định không tích; ngày tùy chọn (trống = dòng chấm); số phiếu VI.1 để dòng chấm.
  - ② trong 🗓 Kế hoạch năm: chọn tháng có lịch → Mẫu 04 lấy đúng tổ của tháng (thời gian "…../mm/yyyy"), mỗi tháng 1 báo cáo; nút **In Kế hoạch + Mẫu 04** (1 lần in); Word vẫn 2 file riêng.
- **📖 Bảng chuẩn hóa Hội – Đoàn** (`KT_CHUAN`, sửa trong app → `D.cauHinh.ktChuan`): tên trong câu, gọi tắt, đầu trang tỉnh / xã, nơi nhận cấp tỉnh, chức danh ký, cấp phó, cấp trên, viết tắt số văn bản.
  - Đầu trang theo bản kế hoạch thật anh gửi: Đoàn "TỈNH ĐOÀN TÂY NINH" / "**ĐTN XÃ …**"; Hội LHPN "**HỘI LHPN TỈNH TÂY NINH**" / "**HỘI LHPN XÃ …**" (ký hiệu /KH-HPN). Đoàn: Bí thư, "Tỉnh Đoàn", "Đoàn cấp trên".
  - Nơi nhận cấp tỉnh viết gọn như bản thật: "Hội ND tỉnh", "Hội LHPN tỉnh", "Hội CCB tỉnh", "Tỉnh Đoàn". Hội Nông dân giữ đầu trang đủ "HỘI NÔNG DÂN TỈNH TÂY NINH / HỘI NÔNG DÂN XÃ …" (đúng bản thật).
  - Kế hoạch ② bỏ chữ cố định phải sửa tay: "Trưởng thôn", "thôn", "ở xóm" → ấp / khu phố (cả ①), bỏ "tổ trưởng tổ dân phố"; "Ủy viên BTV", "Quyết định của BTV" giữ (dấu chèn sẵn nếu sau này cần đổi).
  - Hội Phụ nữ trong câu: "**Hội Liên hiệp Phụ nữ**"; tên gọn khi thiếu chỗ: "Hội LHPN", "Hội CCB" (mục "Tên gọn" trong bảng).
  - **Đơn vị kiểm tra tự điền** (anh chốt): Mẫu 06 ô "Đơn vị kiểm tra" và Mẫu 16 đầu trang "ĐƠN VỊ KIỂM TRA" = Hội cấp xã của từng tổ ("Hội Nông dân xã …", "Hội Liên hiệp Phụ nữ phường …", "Đoàn Thanh niên xã …"), viết đủ nếu đủ chỗ, thiếu chỗ thì tên gọn; anh gõ ở khai báo thì dùng chữ anh gõ, gõ "-" để chừa dòng chấm. Mẫu 16: chữ hoa, dài thì xuống dòng trước "XÃ / PHƯỜNG …"; tiêu ngữ canh bằng tab (không lệch khi tên dài).
  - Hội cấp xã (cả Đoàn) đều có Ban Thường vụ (anh chốt) → ghi chung "TM. BAN THƯỜNG VỤ" cho mọi Hội và Đoàn, cả khuôn ① (thêm dòng trên chức danh ký); chức danh: Hội "CHỦ TỊCH", Đoàn "BÍ THƯ" (anh chốt; sửa được ở mục "Ký thay mặt" trong bảng), "Ủy viên BTV", "Quyết định của BTV".
  - Khuôn Kế hoạch ① ② có dấu chèn mới: "HĐT xã" → xã / phường, "{Hội} xã" → phường, "do hội mình / do Hội quản lý" → Đoàn, "Chủ tịch, phó Chủ tịch", "Hội cấp trên", "Văn phòng ấp", "trưởng ấp", "Ban Thường vụ", "{Hội} tỉnh" (nơi nhận), "TM. BAN THƯỜNG VỤ".
  - Quốc hiệu giữ đúng mẫu Ngân hàng (anh chốt).
- **Khai báo nằm ngay trong tab của mẫu** (anh chốt — "mẫu nào cần khai báo thì kèm ngay tab của mẫu đó"): bỏ các hộp bật lên khi in; mỗi tab có khung **✎ Khai báo khi in** (thu gọn được, nhớ theo tab):
  - Đột xuất (06 + 16), Sau giải ngân (06), Định kỳ (06 + 16, không ngày): đơn vị (trống = Hội của tổ, "-" = chấm), **cán bộ kiểm tra: Theo bảng / Để trống (điền tay)**, ông (bà) 2, ngày, cột mục đích, đoàn kiểm tra, gợi ý nhận xét; nút In / Word ngay dưới khung.
  - **Bảng cán bộ kiểm tra theo Hội – xã** (mỗi Hội 1 người, 4 người / xã) ngay trong khung; phiếu tự lấy cán bộ của Hội phụ trách tổ.
  - Mẫu 04: bảng tên đơn vị + đoàn kiểm tra; Kế hoạch: bảng của Hội đang chọn (tên, căn cứ, đoàn, người ký) + nút bảng tất cả Hội – xã (chép kế hoạch Hội tỉnh).
  - Khai báo được nhớ lần sau (trừ ngày kiểm tra).
- **🎓 Hạn trả HSSV** (anh chốt): dòng trên (giữ cả đợt nhập) = loại khóa học · **ngày GDX**; **ngày vay giữ chỗ cũ** (đầu dòng nhập, gõ một lần cho cả đợt); mỗi món chỉ bấm ô **ngày ra trường → tiền vay**; **Enter / →** sang ô sau, **Shift+Enter / ←** lùi, Enter ở tiền vay về ô ngày ra trường cho món kế tiếp; bấm vào ô là bôi đen số cũ (gõ là thay). Kết quả hiện **4 khối số lớn** (2×2, bấm để chép): thời hạn cho vay (tháng) · hạn cuối theo GDX · số tiền trả mỗi lần · ngày trả lần đầu.
- **Văn bản:** CT vay **không còn bắt buộc** để rời "Chờ khai" (văn bản chung như quy chế, chức năng nhiệm vụ, hướng dẫn 727 không thuộc chương trình vay — lọc "Chưa gắn CT" vẫn tìm được); sắp xếp thêm kiểu **"Vừa thêm"** (file mới đưa vào tủ lên đầu).
- **⚙ Khai báo Hội thành 1 bảng** (anh chốt): mỗi dòng 1 Hội – xã, cột: tên đơn vị · số / ngày KH Hội tỉnh · số / ngày HĐ ủy thác · đoàn kiểm tra · người ký; nút "⇩ cùng Hội" chép số / ngày KH Hội tỉnh xuống các xã cùng Hội (khi xem nhiều xã). Cùng chỗ lưu, dữ liệu cũ giữ nguyên. Kế hoạch ① ghi đủ căn cứ (số / ngày KH Hội tỉnh, HĐUT); ② căn cứ gọn khi chưa khai, **đã khai đủ thì ② cũng in đủ** (thêm dòng căn cứ KH Hội tỉnh, "hợp đồng ủy thác số … ngày …"). Đoàn: "của Tỉnh Đoàn Tây Ninh".
- **Mẫu 16:**
  - Chữ in sẵn "thôn/tổ dân phố", "xã/phường/đặc khu", "tỉnh/thành phố" → đúng chữ (ấp / khu phố, xã / phường, tỉnh); trống thì giữ chữ mẫu.
  - "Tổ thuộc" + **tên Hội đầy đủ** (hết lỗi "Hội Đoàn Thanh niên").
  - 4 dòng Ông (bà) theo tab, Chức vụ thẳng cột.
  - **Gợi ý nhận xét theo số liệu** (727 khoản 3 Phụ lục I), chọn khi in "Gợi ý theo số liệu / Để trống" (nhớ lựa chọn):
    - ô kết quả "Số lượng tổ viên (05–60)" và "Số tổ viên lãi tồn, quá hạn";
    - III. ưu điểm (khi số liệu tốt), tồn tại (có số), kiến nghị đi theo từng tồn tại.
- **Điểm GD suy** (`toSuyDiem`): tổ không có trong Thông tin tổ trưởng / Mẫu 7 (tháng này + 4 tháng gần nhất — thường là tổ mới / tách) → suy điểm GD theo:
  - danh mục địa bàn (mã ấp);
  - rồi tổ cùng ấp;
  - rồi tổ cùng xã cùng ngày GDXA.
  - Đánh dấu `diemSuy`; KTGS hiện dòng báo (tổ suy / tổ vẫn chưa rõ). Không sửa số liệu gốc.
- Phép thử: mới `tests/t111.js` (43 phép); cập nhật `t106` (dòng 1,5 cm, không lịch sử, mỗi tổ 1 phiếu), `t108` (Mẫu 04 chọn theo cây / ấp), `t110` (ô Nhận xét, Mẫu 04 ① ②, đầu trang theo Bảng chuẩn hóa).

## 3.97 — 03/10/2026 20:00 — 🗓 Kiểm tra định kỳ theo lịch (Mẫu 06 + 16) · số liệu mặc định cuối tháng · khuôn Kế hoạch ② · gợi ý lại
- **KTGS Hội › 🗓 Định kỳ theo lịch · Mẫu 06 + 16** (anh chốt — 4 loại kiểm tra: ① sau giải ngân 30 ngày Mẫu 06 · ② đột xuất 6–8 hộ Mẫu 06 + 16 · ③ **định kỳ theo lịch** Mẫu 06 + 16 · ④ Mẫu 04 tổng hợp):
  - anh chọn **số liệu cuối tháng** ở ô Số liệu (vd Mẫu 31 chốt 30/09/2026) → **tháng kiểm tra = tháng sau** (10/2026); trên mẫu "ngày …… tháng 10 năm 2026" (**ngày để trống**), Mẫu 06 "Thời điểm kiểm tra: …../10/2026"; Mẫu 16 mục I "đến thời điểm 30/09/2026" (BC0437 chỉ dùng khi cùng tháng số liệu, không thì tính từ Mẫu 31). Số liệu theo ngày không dùng cho định kỳ.
  - **Tổ:** gợi ý (tích sẵn) các tổ có lịch tháng đó trong **Kế hoạch 01/KH**; chọn xã / hội ở cây → thêm tổ ngoài lịch — kế hoạch có thể đổi, chọn độc lập. Lập Kế hoạch (Word / In) là lưu lịch.
  - **Mẫu 06 mỗi tổ:** hộ còn dư nợ có **món giải ngân từ các năm trước** (trước 01/01 năm kiểm tra), chỉ in các món đó; **tích sẵn 100%**, bỏ tích hộ không kiểm; tỷ lệ **theo hộ** ≥ 90% (đỏ nếu thiếu) kèm tỷ lệ món; **hộ quá hạn / khoanh không tích** (kiểm tra riêng), anh tích tay khi cần (không tính vào tỷ lệ).
  - Khai báo 1 lần theo thứ tự mẫu (Mẫu 06: đơn vị → cán bộ → cột mục đích; Mẫu 16: đoàn) → 👁 Xem (chuyển 06 / 16) → **Word 06** (mọi tổ 1 file, mỗi phiếu trang mới) · **Word 16** · In.
  - Nhật ký `ktgsNK` mau `06dk` / `16dk` (ngày trống, `th` = tháng kiểm tra, danh sách hộ) → **Mẫu 04** tháng đó tự hiện tổ (Biên bản 16 ✓, 1 phiếu 06, thời gian "…../10/2026").
- **Ô Số liệu mặc định Mẫu 31 cuối tháng gần nhất** (Tổ TK&VV, Sao kê, KTGS — anh chốt); số liệu theo ngày nằm nhóm "Theo ngày — khi cần", **chỉ giữ trong lần mở app anh chọn** (mở lại → về cuối tháng). Tra cứu KH giữ số liệu mới nhất (kiểm trùng cần số mới).
- **BC0437 / BC0438 (KTGS) không theo khóa tháng 🔒** của số liệu (anh chốt): tháng đã chốt vẫn nạp / thay / xóa; file số liệu chính vẫn khóa như cũ (`slKhoaO`).
- **↺ Gợi ý lại** (kiểm tra đột xuất): trước đây tính lại y hệt (thứ tự cố định) nên như "không chạy" → nay **mỗi lần ra lượt hộ khác** (tránh hộ đã gợi ý các lượt trước, giữ hộ bắt buộc: giải ngân < 30 ngày, ≥ 1 HSSV), hết thì quay vòng; luôn **ưu tiên hộ chưa kiểm lần trước**; dòng "Tổ có n hộ tốt · m hộ cần quan tâm…" + lý do khi kiểu ra trùng (vd tổ ít hộ tốt).
- **Kế hoạch 01/KH khuôn ② "mẫu gọn"** theo bản kế hoạch mẫu của Hội cấp xã anh gửi (4 trang, "TM. BAN THƯỜNG VỤ / CHỦ TỊCH", bảng Stt · Thời gian · Kiểm tra tại các tổ · Ghi chú): `tools/khuon_docx.py m01b`, **đã xóa mọi tên riêng** (tổ trưởng, ấp, xã, Hội) — app điền tên Hội, ký hiệu KH-HND/HPN/CCB/ĐTN, năm, thời hiệu, tháng giám sát, bảng "Tháng n · tổ trưởng… (ấp)". Chọn ① / ② trên màn Kế hoạch, nhớ theo Hội; giữ chữ "ủy nhiệm" như bản gốc.
- **Khai báo theo thứ tự trên mẫu:** Mẫu 06 (đột xuất, sau giải ngân): Đơn vị → Cán bộ 1, 2 → Thời điểm → cột Mục đích; Mẫu 16: Ngày → Đoàn → Cán bộ; ⚙ Khai báo Hội theo sườn Kế hoạch: Tên → KH Hội tỉnh → HĐUT → Thành phần đoàn → Người ký.
- **Rà bố cục Word:** bảng đầu trang / chữ ký (Mẫu 04, Kế hoạch ①, ②) ghi rõ **không viền**; cột Quốc hiệu Kế hoạch ① 5656 → 5956 twip, ② 5761 → 5961 (Quốc hiệu cỡ 13 cần ≈ 5424 twip — đo bằng phông Liberation Serif cùng số đo Times New Roman) để không rớt dòng; lề giữ theo file gốc (đúng khoảng Nghị định 30).
- Phép thử mới `tests/t110.js` (38 phép).

## 3.96.1 — 03/10/2026 17:30 — sửa đăng web
- GitHub Pages kẹt ở bản 3.92 từ 3.93 (Jekyll lỗi vì tài liệu có `{{…}}`) → thêm `.nojekyll`, Pages đăng nguyên file. Không đổi mã app.

## 3.96 — 03/10/2026 17:00 — 🗓 Kế hoạch KTGS năm của Hội cấp xã (01/KH)
- **KTGS Hội › 🗓 Kế hoạch năm · 01/KH** (chế độ thứ 4) — anh chốt: chọn **năm** → **xã** (cây) → **hội** (chip hội của xã, không cần chọn điểm GD) → app lấy **100% tổ của Hội tại xã** (mọi điểm GD), gom theo **ấp**.
  - **Mặc định app xếp sẵn** tổ vào các tháng **02 → 10** (chia đều theo thứ tự ấp; ấp nhiều tổ tự tràn sang tháng kế bên); đổi **từ tháng / đến tháng** thì xếp lại trong khoảng; **đổi tháng cả ấp** hoặc **từng tổ**; ↺ Xếp lại tự động.
  - Đổi là **lưu** theo năm + xã + hội (`D.cauHinh.ktKH`); tổ chưa xếp tháng (tổ mới, hoặc anh bỏ tháng) → **nhắc chưa đủ 100% tổ** (727).
  - **Không ghi số hộ cụ thể** (anh chốt — số món thay đổi hàng tháng): cột cuối ghi "Tối thiểu 90% món vay"; dòng Cộng "n tổ (100% tổ do Hội quản lý)".
- **Khuôn Word = dự thảo HĐT cấp xã anh gửi** (`tools/khuon_docx.py m01`, .doc → .docx bằng LibreOffice, mẫu trắng): **căn cứ đổi sang 727/HD-NHCS ngày 11/02/2026** (dự thảo còn ghi HD 10566/2022), **chỉ ghi mức 90%** (bỏ câu 75% vùng khó khăn), **bỏ khung "MẪU THAM KHẢO HĐT CẤP XÃ"**, ngày lập để trống, **khổ A4** (dự thảo khổ Letter), chữ đỏ / tô vàng của dự thảo → chữ đen; giữ nguyên toàn bộ mục I–III (nội dung kiểm tra tại Tổ, tại khách hàng), chân trang số trang.
  - App điền: HỘI … TỈNH TÂY NINH / HỘI … XÃ … (in hoa), nơi lập (tên xã), năm, năm trước (thời hiệu), từ tháng / đến tháng, tên Hội ở mọi chỗ "Hội……xã……", NHCSXH Gò Dầu; **số / ngày Hợp đồng ủy thác** (tự thêm "/HĐUT"), **số / ngày Kế hoạch Hội tỉnh**, **thành phần đoàn** (đủ 3 dòng, thiếu thì dòng chấm), **người ký** — theo ⚙ Khai báo Hội; trống giữ dòng chấm.
  - Bảng lịch: mỗi tháng có tổ 1 dòng "Ấp …: tổ trưởng, …" (xuống dòng trong ô), tiêu đề lặp khi sang trang. Đường kẻ dưới tên Hội dời xuống trên dòng "Số:" để tên Hội dài 2 dòng vẫn kẻ đúng. LibreOffice: 12 tổ ≈ 7 trang.
  - Bản In / PDF đọc lại chính tài liệu Word đã điền (`ktXmlHTML`) nên cùng nội dung.
- Tên ấp: dữ liệu đã có "Ấp / Thôn / Khu phố…" thì giữ, không thêm "Ấp" lần nữa (áp dụng cả Mẫu 04 mục II).
- `ktDocx` dựng phần phụ theo khuôn (đầu trang / chú thích / chân trang có mới đưa vào) — Mẫu 06 / 16 / 04 không đổi; `ktDien` đổi xuống dòng thành ngắt dòng trong ô.
- Phép thử mới `tests/t109.js` (24 phép).

## 3.95 — 03/10/2026 15:30 — 📋 Mẫu 04/BC-TH Báo cáo tổng hợp kết quả kiểm tra · ⚙ Khai báo Hội
- **KTGS Hội › 📋 Báo cáo tổng hợp · Mẫu 04** (chế độ thứ 3, cạnh Kiểm tra đột xuất / Sau giải ngân) — anh chốt: chọn tháng kiểm tra → app liệt kê **các tổ đã lập phiếu trong tháng** (Mẫu 06 đột xuất · Biên bản 16 · Mẫu 06 sau giải ngân), **tích sẵn**, ngày kiểm tra theo lịch sử (sửa được từng tổ).
  - Phạm vi: Toàn PGD = mọi tổ có phiếu trong tháng; chọn xã / hội ở cây = chỉ tổ trong phạm vi + hiện thêm **tổ khác chưa có phiếu (chưa tích) để thêm tay**; tổ đã tích vẫn giữ khi đổi phạm vi.
  - **Mỗi Hội – xã 1 báo cáo** (Đơn vị kiểm tra = Hội cấp xã); nhiều Hội – xã → 1 file Word, mỗi báo cáo sang trang mới.
  - Nhắc theo 727: tổ chưa thấy **Biên bản 16** trong app → cảnh báo "Mẫu 04 chỉ lập khi kiểm tra hoạt động của Tổ" (chỉ nhắc, không chặn).
  - 👁 Xem trước → 🖨 In / PDF · 📄 Word (.docx) để sửa.
- **Word đúng khuôn file mẫu gốc anh gửi** (`tools/khuon_docx.py m04`, mẫu trắng): giữ khung "Mẫu số 04/BC-TH · 01 liên lưu…", Quốc hiệu, đường kẻ, bảng mục II; **bỏ khung "MẪU THAM KHẢO"**; 2 dòng đầu (căn bằng dấu cách) đổi thành bảng 2 cột không viền cùng vị trí để điền tên đơn vị không xô dòng.
  - App điền: **Đơn vị kiểm tra** (in hoa), **Đoàn kiểm tra** (theo ⚙ Khai báo Hội), **bảng mục II** mỗi tổ 1 dòng (Stt · ngày · "Tổ TK&VV [tổ trưởng] (mã tổ)" · "Tây Ninh, xã …, ấp …"), **VI.1 số phiếu Mẫu 06** theo lịch sử lập phiếu trong app.
  - **Dòng chấm ghi tay** (tab dẫn chấm hết dòng — sửa trong Word không vỡ): I.1 Đoàn kiểm tra đủ **4 dòng**, I.2 **2 dòng**, III **4 dòng** (1… 2… + 2), **mỗi mục a) b) … của IV: 3 dòng** (anh chốt 3–4 dòng). Ngày lập, Nơi nhận NHCSXH, VI.2 số danh sách 15/TD để chấm.
  - Hàng tiêu đề bảng lặp khi sang trang, dòng tổ không cắt, khối VI + Nơi nhận + Trưởng đoàn đi liền. LibreOffice: 1 báo cáo 1 tổ ≈ 2 trang, 3 tổ + 2 dòng đoàn ≈ 3 trang.
- **⚙ Khai báo Hội** (mỗi Hội – xã 1 khối, lọc theo xã đang chọn ở cây): tên đơn vị (mặc định tự sinh "Hội … xã …"), số / ngày Hợp đồng ủy thác, số / ngày Kế hoạch KTGS của Hội tỉnh, Đoàn kiểm tra (mỗi người 1 dòng), người ký — lưu `D.cauHinh.ktHoiKB` (máy + Drive cùng cấu hình), dùng chung cho Mẫu 04 và Kế hoạch 01/KH (bản sau). Ô trống → dòng chấm.
- **Nhật ký lập phiếu theo tổ** `D.cauHinh.ktgsNK` (mới): xuất Biên bản 16 và Mẫu 06 sau giải ngân giờ ghi tổ + ngày (trước chỉ Mẫu 06 đột xuất ghi `ktgsLS`; sau giải ngân chỉ ghi món). Phiếu / biên bản lập **trước 3.95** chưa có tổ → thêm tay bằng cây.
- Phép thử mới `tests/t108.js` (28 phép).

## 3.94 — 03/10/2026 14:00 — 👤 Tra cứu KH gọn, chia nhóm khoa học · kiểm trùng CCCD + tên vợ/chồng (người thừa kế)
- **Cột trái:** ô tìm + chip 📍 phạm vi cùng hàng; **danh sách 2 dòng/khách** (tên + nhãn đang vay n món / tất nợ / chỉ gửi TK · mã KH · CCCD · xã · ấp · tổ); ↑ ↓ chọn, Enter mở; điện thoại hiện 50 dòng + **Xem thêm 50** (trước: 300 dòng, trang dài ~47.000 px).
- **Cột phải (thẻ khách) chia nhóm:** đầu thẻ (tên, mã KH, nhãn CCCD hết hạn / sắp hết hạn / SĐT không đạt / quá hạn / khoanh / KHĐ) · **5 ô số tóm tắt** (tổng dư nợ, quá hạn, khoanh, lãi tồn, số dư 105) · **Nhân thân** (CCCD + ngày cấp + nơi cấp, **hạn CCCD** xanh / vàng < 6 tháng / đỏ hết hạn, sinh · giới · DT, vợ/chồng = người thừa kế) · **Liên hệ & địa bàn** (SĐT đạt / không, địa chỉ bỏ dấu thừa "- -", tổ trưởng ☎, hội, điểm GD) · **Tiết kiệm 105** (mọi sổ) · **Món vay** (CT viết tắt, khế ước, vay → đến hạn, giải ngân, dư nợ, lãi tồn, **mục đích vay vốn** rút gọn theo ⚙ bảng ngành, tình trạng; dòng cộng; món đã tất toán thu gọn).
  - **Món HSSV:** dòng 🎓 ngay dưới — tên SV, CCCD SV, trường, hệ, ngành, **khóa năm nhập học–năm ra trường** (Mẫu 31 không có cột lớp / khoa), đối tượng học phí.
  - **Bấm vào giá trị là chép** (CCCD, mã KH, SĐT, khế ước, số TK 105, tên / CCCD HSSV, địa chỉ…) — bỏ 12 nút 📋 (anh duyệt). **Bỏ nút 🏠 Hồ sơ hộ** ở thẻ này (anh chốt); thêm **👥 Mở tổ**. Chép cả khối thêm vợ/chồng, TK 105, tổ.
  - Điện thoại: thẻ mở trong hộp, cùng bố cục 1 cột.
- **🔍 Kiểm trùng 2 ô (CCCD/CMND + họ tên)** — báo rõ trùng ở đâu, với ai: 🔴 trùng CCCD người vay · 🔴 trùng CCCD HSSV (của món HSSV người vay nào) · 🟠 **trùng tên vợ/chồng của người đang vay = người thừa kế** (anh chốt: quan trọng; Mẫu 31 chỉ có tên vợ/chồng → so trọn họ tên, bỏ dấu / hoa thường, cần đối chiếu) · 🟡 cùng họ tên người vay / HSSV khác. Mỗi thẻ: mã KH, sinh, CCCD + ngày cấp, địa bàn, các món đang vay (CT, mã KV, dư nợ, ngày vay, mục đích) + nút Mở khách này; khớp cùng xã đang chọn xếp trên. Kết luận: 🔴 trùng đang vay / 🟠 có thể trùng người thừa kế / 🟢 có thể nhập máy. Màn rộng: chi tiết sang cột phải. Gõ CCCD ở ô tìm vẫn tự kiểm trùng.
- Phép thử mới `tests/t107.js` (19 phép); `t104.js` đọc kết quả kiểm trùng ở khung mới, `t101.js` đọc thẻ khách mới.

## 3.93.1 — 03/10/2026 11:00 — Mẫu 06 kiểm tra sau giải ngân (30 ngày) · bảng ngành gọn
- **KTGS Hội › 📅 Sau giải ngân (30 ngày) · Mẫu 06** (văn bản 727: kiểm tra sử dụng vốn trong 30 ngày kể từ giải ngân) — anh chốt làm đơn giản: chọn **tháng** (hoặc **từ tháng → đến tháng**) → chọn **địa bàn** ở cây Xã → Điểm GD → Hội → Tổ → **👁 Xem** → **🖨 In / 📄 Word**.
  - Món = **mọi lần giải ngân trong tháng** ("Giải ngân trong tháng" > 0 của Mẫu 31 tháng đó), **kể cả HSSV nhận tiền lần 2 trở đi** (anh chốt); chỉ món qua tổ (bỏ vay trực tiếp). Số thật T9/2026: 185 tổ · 419 món (285 HSSV).
  - **Mỗi tổ, mỗi tháng 1 phiếu Mẫu 06**; chọn đến xã / điểm / hội = mọi tổ trong phạm vi; chọn đến tổ = **tích / bỏ tích từng món**. Nhiều phiếu → **1 file Word, mỗi phiếu sang trang mới** (đánh lại id hình, bỏ mã đoạn trùng); bản In / PDF cũng vậy.
  - Cột Dư nợ = **tổng dư nợ của món cuối tháng** (anh chốt); Tổng số tiền giải ngân = tổng đã giải ngân của món. Tháng chưa có Mẫu 31 → báo thiếu. Món đã lập phiếu ghi lại (`D.cauHinh.ktgsGN`) và đánh dấu.
  - Dòng trống bù của mẫu: chỉ bù khi tổng chiều cao còn trong khung 3 dòng × 0,8 cm (1 món → 1 dòng trống, từ 2 món → không bù) để phiếu ít món vừa 1 trang (LibreOffice: 38 phiếu xã Truông Mít T9 → Word 56 trang, In 48 trang; phiếu nhiều món / tên dài sang trang 2).
- **⚙ Bảng ngành kinh tế:** ngành nhiều món đang vay lên trên, **ẩn ngành dưới 10 món** (trừ ngành đã sửa / đang tìm), nút **▾ Hiện thêm / ▴ Thu gọn**. Chữ lựa chọn: **"In mục đích vay vốn (theo hệ thống, rút gọn)"** — đối chiếu file Danh sách giải ngân 30/09: cột "Mục đích vay vốn" = "Tên PNKT51" của Mẫu 31 (3.340/3.340 món); danh sách giải ngân không cần nạp (Mẫu 31 có đủ: giải ngân tháng / năm, ngày GN đầu tiên / cuối cùng, dư nợ khớp 100%).
- **Thêm file bằng dán (Ctrl+V)** (anh hay copy file văn bản cũ trong thư mục rồi dán): copy file → Ctrl+V ở bất kỳ đâu trong app → nhận như kéo thả (cùng `gioiThieuFile`, xếp vào tab đang mở); dán chữ vào ô nhập không ảnh hưởng. Ô thả file và nút "+ Thêm file" ghi thêm "hoặc copy file rồi dán (Ctrl+V)".
- Phép thử `tests/t106.js` thêm 12 phép (61 phép).

## 3.93 — 03/10/2026 09:30 — Tab con 🛡 KTGS Hội: BC0437 / BC0438 · chọn hộ kiểm tra đột xuất · Mẫu 06/TD + 16/TD đúng khuôn Word
- **Tab con mới 🛡 KTGS Hội** (Số liệu, cạnh Tổ TK&VV). **Nạp BC0437** (Thông tin tổ TK&VV do HĐT quản lý) **+ BC0438** (Thông tin ủy thác theo xã × hội: dư nợ ủy thác, chấm điểm, theo chương trình) **ngay trong tab, theo đúng chuẩn tab Nạp & Kiểm tra** (anh chốt): khung "📥 File BC0437 / BC0438 · 🔍 Kiểm tra" có **ma trận loại × tháng** (bấm ô: xem · 🔁 thay · ⬇ tải gốc · 🗑 xóa; ô trống: nạp; tháng chốt 🔒 khóa), **📥 Nạp nhiều file** (cùng luồng xem trước → tích → ghi nhận, nhiều tháng một lần), không hiện ở ma trận Nạp chính; lưu máy + Drive như file số liệu khác.
  - **🔍 Kiểm tra theo tháng** (lưu kết quả `SLM.ktg`, đổi file → "⟳ kiểm lại"; chỉ báo, không sửa số): BC0437 ↔ BC0438 ① số tổ, dư nợ, tiết kiệm theo xã × hội · ② chấm điểm Tốt / Khá / TB / Yếu · BC0437 ↔ Mẫu 31 từng tổ (tổ viên còn dư nợ, dư nợ, QH, khoanh, tiết kiệm; lãi tồn = lưu ý; tổ chỉ có ở 1 bên) · BC0438 ③ ↔ Mẫu 31 + KHĐ mẫu 14 theo chương trình (ghép theo tên quyết định: dư nợ, QH, khoanh, số món KHĐ; số khách, lãi tồn = lưu ý). BC0437 làm tròn triệu → lệch < 1 triệu / tổ (cộng hội: < 0,5 triệu × số tổ) coi là khớp. Số thật T9: ② khớp 20/20; ① lệch dư nợ 5/20 hội; 18/369 tổ lệch với Mẫu 31 (có tổ BC0437 gấp đôi QH, khoanh); ③ 2/187 dòng lệch số món KHĐ. Số tổ viên / số khách 2 báo cáo đếm khác Mẫu 31 → không so (tổ viên) hoặc chỉ lưu ý (khách).
  - Kiểm tra tháng chính **không tính** BC0437 / BC0438 (nạp file KTGS không làm tháng phải kiểm lại).
  - File .xls hệ thống: cột **Xếp loại = 0** (Excel xuất mất kết quả công thức) → app tính lại đúng công thức của file `=IF(điểm<50;"Yếu";IF(<70;"Trung bình";IF(<85;"Khá";"Tốt")))`; **dòng tổ lặp y hệt** chỉ lấy 1 lần (T9: 380 dòng → 369 tổ; 314 Tốt · 51 Khá · 4 TB). BC0438: dòng "Tổng số" / "Tổng cộng" = 0 (công thức) → app tự cộng.
- **Chọn tổ** bằng cây chuẩn Xã → Điểm GD → Hội → Tổ (hoặc gõ tên tổ trưởng). Chưa chọn tổ → **bảng các tổ**: tổ viên, dư nợ, QH, lãi tồn, tiết kiệm (BC0437, triệu đồng), **điểm, xếp loại**, ngày kiểm tra gần nhất + dòng BC0438 theo hội (số tổ tại x/y ấp, khách, dư nợ, chấm điểm). Không có BC0437 thì số tổ tính từ Mẫu 31 (ghi rõ nguồn).
- **Chọn hộ kiểm tra đột xuất (Mẫu 06)** — anh chốt:
  - gợi ý **6–8 hộ** theo số tổ viên (≤ 20 → 6 · 21–40 → 7 · > 40 → 8), nút − / + đổi số;
  - 3 kiểu: **Hộ tốt** (món giải ngân trong 12 tháng, số dư 105 tăng so với tháng trước — chưa có tháng trước thì xét có 105, không lãi tồn, không món KHĐ) · **Hộ cần quan tâm** (món KHĐ ≥ 3 tháng theo file mẫu 14 — chưa nạp thì xét ngày GD gần nhất, lãi tồn, không gửi TK đều) · **Trung hòa = 6 hộ tốt + 2 hộ có món KHĐ ≥ 3 tháng** (thiếu KHĐ thì lãi tồn, không gửi TK, rồi hộ tốt);
  - **bỏ hộ có quá hạn / khoanh** (kiểm tra riêng) — vẫn tích tay được; tổ có HSSV thì **≥ 1 món HSSV**; **món giải ngân dưới 30 ngày tự vào** (727: kiểm tra 100%);
  - mỗi hộ ghi **lý do chọn**, nhóm (Tốt / Cần quan tâm), các món (mã · CT · dư nợ · ngày GN), 105 tăng / giảm; đánh dấu hộ đã kiểm ở lần trước.
- **Mẫu 06/TD Phiếu kiểm tra sử dụng vốn vay · Mẫu 16/TD Biên bản kiểm tra hoạt động tổ — Word (.docx) đúng 100% khuôn mẫu gốc** (khuôn dựng từ file mẫu trắng anh gửi bằng `tools/khuon_docx.py`, giữ chữ, bảng, phông, lề, đường kẻ dạng shape dưới tên cơ quan / tiêu ngữ; bỏ trang "Mẫu tham khảo cách ghi chép"):
  - chỉ điền thông tin có sẵn vào đúng dòng chấm; thiếu thì **giữ nguyên dòng chấm** để ghi tay; **ngày kiểm tra + đơn vị / đoàn + cán bộ khai khi in, mặc định trống**; **không ghi tổ phó**;
  - Mẫu 06: mỗi món 1 dòng (STT, họ tên, **mã khoản vay 2 số đầu - 4 số cuối**, trùng 4 số trong phiếu thì 6 số; CT; giải ngân; dư nợ — triệu đồng) + dòng Cộng; **cột Mục đích: anh chọn khi in — Để trống / In ngành kinh tế (rút gọn)** (Mẫu 31 / Mẫu 10 không có cột mục đích vay; dùng Tên PNKT51; đề xuất rút gọn 176 ngành `KT_PNKT` theo mã — anh chốt: **chỉ dùng từ chuẩn có trong tên gốc, rút theo hướng chung**; anh sửa trong **⚙ Bảng ngành kinh tế** (mã · tên gốc · đề xuất · tên in trên phiếu · số món đang vay; tìm, lọc Đã sửa, ↺ trả về đề xuất; lưu Cài đặt); ngành mới tự rút gọn; nhớ lựa chọn lần sau); phần thực tế, nợ lãi, nhận xét để trống; ít hơn 3 món thì giữ dòng trống của mẫu;
  - Mẫu 16: ngày, thôn, xã, tỉnh, hội, tổ trưởng · mục I từ BC0437 (dư nợ, tổ viên, QH, khoanh + tỷ lệ, lãi tồn, tiền gửi, **điểm + xếp loại + tháng**) · số khách thực tế + "01 Phiếu" theo số hộ đã chọn;
  - **sang trang**: hàng tiêu đề bảng lặp lại, không cắt đôi dòng, dòng cuối + Cộng + nhận xét + chữ ký đi liền; dòng có số liệu **cao tối thiểu 1,2 cm** (mẫu 0,8 cm) để có chỗ ghi phần kiểm tra thực tế, chữ dài tự xuống dòng (mã khoản vay giữ 1 dòng), chữ 11; bản In / PDF cùng cách.
- **In / PDF** cùng bố cục (Mẫu 06 A4 ngang, Mẫu 16 A4 dọc), trống = dòng chấm. **Lịch sử kiểm tra** theo tổ (ngày, kiểu, hộ) lưu trong Cài đặt (máy + Drive của anh) khi xuất Mẫu 06.
- Phép thử mới `tests/t106.js` (BC0437 / BC0438 giả, 49 phép).

## 3.92 — 04/10/2026 15:00 — Sao kê bố cục mới + in 2 khổ · Tổ TK&VV: tổ viên / kết nạp / cho ra · vay trực tiếp vào xã–điểm · Tổng hợp khuôn 01.1 · Tra cứu 2 cột
(gồm cả các sửa của 3.91.1 chưa phát hành — mục dưới)
- **A. In 2 khổ, mỗi món 1 dòng** (anh chốt): sao kê chọn **Khổ Ngang** (đủ cột) / **Dọc** (gọn) ngay trên thanh; mỗi báo cáo có khổ mặc định (nợ đến hạn, kỳ con, thay đổi dư nợ: ngang; còn lại: dọc), đổi được, nhớ theo báo cáo. Ô **không xuống dòng**; bỏ xếp 2 tầng trong ô (Số KU, ngày GH thành cột riêng).
  - Khổ dọc: bảng có cột CT thì **bỏ Số KU** (khách 2 món cùng CT ghi thêm 6 số cuối KU); nợ đến hạn bỏ cột Chuyển QH (khung ① ② ③ đã theo kỳ chuyển QH), ngày GH thay ngày ĐH kèm "GH"; kỳ con bỏ KU, hình thức, xã, đã chuyển QH, GD gần nhất; ngày dd/mm/yy.
  - **Tự co khi in**: lề 20/20/20/30 → 15 mm → 10 mm → (dọc) **bỏ cột SĐT** → chữ 9 → 8,5 → 8 pt, dừng ở bậc đầu tiên vừa khổ; áp cho sao kê và báo cáo tổ. Excel luôn đủ cột. Khung xem trước rộng gần hết màn hình.
  - Số thật T9: nợ đến hạn ngang 14 cột vừa ở lề 10 mm chữ 10 pt; kỳ con ngang 18 cột vừa ở 8 pt (hội viết tắt HND / HPN / HCCB / ĐTN, xã bỏ chữ "Phường / Xã").
- **C. Màn Sao kê bố cục lại:** thanh trên (Số liệu · Khổ · 👁 Xem, dính khi cuộn) · phạm vi gọn · **chọn 1 báo cáo mỗi lần** (nút tròn), xếp **2 cột theo nhóm** Nợ cần xử lý · Nợ đến hạn · Phát sinh tháng · Khách hàng (chừa chỗ mẫu mới) · khoảng ngày chỉ hiện 1 chỗ khi báo cáo cần.
- **B. Vay trực tiếp** (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD): mỗi xã + điểm có món trực tiếp → mục **"Vay trực tiếp (không qua tổ) · n món"** ở cấp Tổ, hội **"Trực tiếp"**; điểm GD suy từ **xã + ngày GDXA** (số thật khớp file phân kỳ: Xóm Mới → Thanh Phước ngày 18, Cẩm Bình → Cẩm Giang ngày 15). Chọn xã / điểm thì sao kê, tổng hợp tính cả món trực tiếp (trước bị sót). **Bỏ chip xã giả "Vay trực tiếp"** — thực ra là tổ 0000000 = 1.402 khách chỉ gửi TK (xã giả 482000).
- **D.** Món còn lãi tồn là món **chưa tất toán** (anh chốt) — không còn ghi "(đã TT, còn lãi)".
- **E. Tab Tổ TK&VV gọn:** ô tìm lên cùng hàng Số liệu, chip nhỏ; thẻ tổ 2 dòng (bỏ ô KPI lớn). **Chọn 1 tổ → mặc định hiện toàn bộ tổ viên**: STT · Mã KH · Họ tên · CT vay · Dư nợ · Số dư 105 · **Số TK 105** · SĐT · **CCCD còn hạn / hết hạn** · Gợi ý; **hàng nút lọc** có số: Tất cả · Có dư nợ · Không dư nợ · Không dư nợ còn 105 · **Đề xuất cho ra** (không dư nợ, 105 = 0) · CCCD hết hạn · Thiếu SĐT · Có nợ cần xử lý · Đến hạn tháng sau; in / Excel đúng bộ lọc. Hạn CCCD theo Luật Căn cước 2023 (mốc 14 / 25 / 40 / 60 tuổi, cấp trong 2 năm trước mốc dùng đến mốc sau; CMND 9 số hết hiệu lực 01/01/2025) — tính từ ngày sinh + ngày cấp Mẫu 31 (cũng hiện ở Tra cứu KH).
- **H. Chưa chọn tổ (tất cả tổ của xã / điểm / hội) → bảng các tổ**: Mã tổ · Tổ trưởng · Ấp · Hội · **Tổ viên · Có dư nợ · Mới vào · Đề xuất cho ra** · (Còn nhận) · Dư nợ · QH · Khoanh · Thu nợ tháng · Thu lãi tháng · Số dư 105 · 105 tăng/giảm; bấm dòng mở tổ. Mới vào / 105 tăng giảm so với Mẫu 31 tháng trước (có thì tính). **⚙ Ngưỡng tổ viên** (tối thiểu / tối đa) đặt trong app — tô tổ ngoài ngưỡng, tính "còn nhận thêm" (anh chưa chốt số → để trống).
- **F. Tổng hợp in theo khuôn BCDHTD 01.1:** A4 ngang, **lề 7 mm**, tiêu đề **2 tầng** (Doanh số cho vay / thu nợ / xóa nợ · Phân theo tính chất nợ · thời hạn; LEN: Dư nợ · Trong tháng), **hàng đánh số cột (1) (2) …**, "Đơn vị: triệu đồng, hộ" canh phải, **mọi bảng triệu đồng 2 số lẻ** (Excel cũng triệu), mỗi dòng 1 hàng, tràn thì co chữ 9,5 → 8 pt.
- **G. Tra cứu KH 2 cột** (màn ≥ 900 px): trái ô tìm + kiểm trùng + danh sách gọn; phải chi tiết khách (bấm 1 dòng; chỉ 1 kết quả thì mở luôn), thêm **Hạn CCCD**. Điện thoại giữ 1 cột, chạm mở hộp chi tiết.

## 3.91.1 — (không phát hành riêng, gộp vào 3.92) — Sửa kiểm tra tháng trống · chữ "Chưa vay vốn"
- **Tra cứu KH › kiểm trùng CCCD:** đổi chữ "chưa dây vốn / đang dây vốn" thành **"Chưa vay vốn, có thể nhập máy" / "Trùng — đang vay vốn"** (anh Nhân: "dây vốn" dễ đọc nhầm).
- **Tổ TK&VV › Danh sách hộ vay** (anh chốt): món đã tất toán **bỏ khỏi danh sách món vay** (KU không còn trong tổ); **khách còn trong tổ vẫn hiện mã KH + TK 105** (kể cả 105 = 0), ghi "không còn món vay"; món đã đóng mà còn lãi tồn vẫn hiện, ghi "(đã TT, còn lãi)".
- **Kiểm tra tháng:** tháng chưa có file nào (vd T10/2026) vẫn hiện kết quả kiểm cũ "Đã kiểm 02/10 07:15 · 2 đạt · 1 lệch" (lưu từ bản trước khi có chặn tháng trống) → nay tháng chưa có file nhóm Ⓐ chuẩn TW / Ⓑ chi tiết thì **không kiểm, ẩn kết quả cũ**, bước 2 "Đã kiểm tra" không sáng; tháng chỉ có file phụ / theo ngày (vd file Nợ đến hạn phân kỳ ngày 01/10) cũng chưa kiểm.

## 3.91 — 03/10/2026 21:00 — Nợ đến hạn theo hạn HĐ + kỳ GDXA · nợ đến hạn kỳ con (phân kỳ) · kiểm tra & chốt khóa tháng · ma trận nhóm sổ / gọn · viết tắt chương trình
- **Sao kê nợ đến hạn — tính đúng quy tắc anh chốt:** món chuyển quá hạn ở **kỳ giao dịch xã đầu tiên sau ngày đến hạn** (vd hạn HĐ 22/10, GDXA định kỳ ngày 07 → chuyển QH 07/11). Lấy theo ngày đến hạn hiệu lực (gia hạn nếu có, không thì hợp đồng), chỉ món trong hạn (không QH, không khoanh), chia **3 khung**: ① đã quá hạn HĐ (đến ngày số liệu) mà chưa chuyển QH — tra soát · ② đến hạn, chuyển QH trong kỳ · ③ đến hạn, chuyển QH kỳ sau. Bản trước chỉ lọc theo ngày GDXA nên sót món hạn HĐ trong tháng mà kỳ GDXA sang tháng sau (T10/2026: 48 món). Số thật T9: tháng 10 = 117 món (15 · 54 · 48), đến hết năm = 630 món.
  - Cột: STT · Mã KH · Họ tên / Số KU · **SĐT** (tô nền nếu trống / không đạt) · CT · **NV** (TW / ĐP) · Dư nợ · **Lãi tồn** · **Số dư 105** (1 lần mỗi khách) · Ngày ĐH (dòng GH nếu gia hạn) · Chuyển QH · Còn GH; chia theo tổ, cộng tổ; đầu báo cáo tóm tắt + bảng theo xã, khoảng > 1 tháng có thêm bảng theo tháng. Excel tách đủ 15 cột.
  - Nút chọn nhanh **Tháng sau · Đến cuối quý · Đến hết năm** (tính từ tháng sau kỳ số liệu).
  - In **A4 dọc**; sao kê (để xem) tràn thì app tự thu lề còn 1,5 cm, vẫn tràn thì chữ 8,5 pt (anh chốt).
- **Sao kê nợ đến hạn kỳ con — món vay trả gốc phân kỳ** (anh đề nghị; căn cứ **Công văn 597/NHCS-TDNN 30/01/2026** về điều chỉnh kỳ hạn trả nợ gốc): chung 1 báo cáo, cột CT / hình thức phân biệt, gồm **nhà ở xã hội (CT 12)** · **cho vay trực tiếp** (không mã tổ: GQVL Hội người mù, XKLD) · **cho vay ủy thác qua tổ vay từ 01/03/2026** (trừ HSSV STEM). Quy tắc chuyển QH kỳ con (anh chốt): vay từ 01/03/2026 không trả đúng kỳ, không được điều chỉnh (Mẫu 08/TD) → chuyển QH (Mẫu 14/TD); **vay trước 01/03/2026 theo HĐ đã ký — không chuyển QH kỳ con**; NOXH theo quy định riêng — có chuyển.
  - 3 khung: ① **kỳ con đã đến hạn chưa trả** (Gốc ĐH LK − gốc đã trả; đã trả lấy số lớn hơn giữa cột Gốc đã trả và giải ngân − dư nợ, vì có món trả trước kỳ cột này chưa ghi) · ② kỳ đến hạn từ sau ngày số liệu đến ngày "đến" · ③ kỳ tới sau đó (> 40 món thì gom theo chương trình, từng món ở Excel). Cột thêm **Hạn nộp 08/TD** (ngày kỳ lùi 3 ngày làm việc, chưa trừ ngày lễ) cho món ủy thác mới; Excel 27 cột có cột "Chuyển QH kỳ con". In A4 ngang.
  - **Nạp thêm file "Nợ đến hạn phân kỳ"** (loại phụ Ⓓ, theo ngày NGAYBC) → kỳ tới đúng ngày + số còn phải trả. Không có file: NOXH / trực tiếp **ước tính ≈** (6 / 12 tháng/kỳ, ngày theo GDXA; ngày khớp 14/14, số tiền khớp 4/7 NOXH); ủy thác mới chỉ biết **ngày kỳ đầu** (= ngày bắt đầu trả gốc), số tiền "(cần file phân kỳ)".
  - Số thật 30/09 + file 01/10: 1.910 món (NOXH 19 · trực tiếp 9 · ủy thác mới 1.882) · ① 10 món / 102,18 tr (7 GQVL trực tiếp vay trước 03/2026 — không chuyển QH; **3 món GQVL qua tổ vay 03–04/2026 có kỳ 05/2026 · 09/2026 chưa trả mà chưa chuyển QH**) · ② đến 31/12: 7 món NOXH / 81,8 tr · kỳ đầu của ủy thác mới phần lớn từ T3/2027.
- **Danh sách nợ gốc đến hạn phân kỳ theo tổ — gửi tổ trưởng** (CV 597 mục I.3a: CBTD gửi tổ trưởng trước 30 ngày): chia theo tổ, cột Ngày ĐH kỳ · Số tiền gốc kỳ · Kỳ trước chưa trả · Hạn nộp đề nghị ĐC (08/TD) · Ghi chú; khoảng ngày theo ô từ / đến (mặc định tháng sau).
- **Sửa lỗi Scan:** bản tài liệu chỉ có PDF trên Drive (quét ở máy khác / ảnh đã xóa) mà đổi tên thì cứ báo "⚠ Chưa lên Drive" (không vào hàng đẩy) hoặc báo "không có trang" khi bấm lưu → nay app **chỉ đổi tên / dời file có sẵn trên Drive**, không dựng lại PDF.
- **Kiểm tra & chốt tháng** (chỉ để biết và chốt, không sửa số liệu — anh chốt): khung "Đang kiểm tra: T…" có ‹ › chọn tháng; 4 bước Đủ file → Đã kiểm tra → **Đạt** → **🔒 Đã chốt**. Đạt = đủ 10 file bắt buộc + đã kiểm (còn mục lệch vẫn chốt được, ghi vào biên bản). Chốt: tích "đã xem các mục lệch" → tháng **khóa**: không nạp đè / thay / xóa ô / xóa cả tháng (nạp nhiều file tự bỏ file của tháng chốt); vẫn xem, kiểm lại, tải file gốc, in. **🔓 Mở khóa** có xác nhận, ghi lại lần mở. Trạng thái chốt lên Drive cùng chỉ mục.
- **Ma trận:** mỗi nhóm Ⓐ Ⓑ Ⓒ Ⓓ 1 dòng đầu bấm **sổ / gọn** (nhớ lựa chọn; mặc định Ⓑ sổ, nhóm khác gọn); thu gọn thì mỗi tháng là **chip** 7/7 ✓ (xanh) / 5/7 (đỏ, rê xem file thiếu), Ⓒ số ngày, Ⓓ số file phụ; tháng chốt có 🔒, ô khóa màu tím.
- **Chọn tháng bằng chữ Việt** (ô tháng của trình duyệt hiện tiếng Anh): nút ‹ T9/2026 ▾ ›, bấm tên tháng mở lưới 12 tháng theo năm (✓ có file, 🔒 đã chốt); chọn tháng ngoài 6 cột thì ma trận tự dời.
- **Bố cục:** máy tính (≥ 1100 px) chia **2 cột** — trái: dòng ① + ma trận · phải: kiểm tra & chốt + bảng đối chiếu chéo; điện thoại: **2 khung vuốt ngang**, nút "📋 Ma trận file / 🔍 Kiểm tra & chốt".
- **Chương trình ghi tên viết tắt thống nhất** (mọi báo cáo): 01 HN · 02 HSSV (riêng Mã Quyết định 43 = HSSVSTEM) · 03 GQVL (mọi món mã 03) · 04 XKLD · 06 NSVSMT · 07 NOHN · 09 MTN · 12 NOXH · 13 SCN · 19 HCN · 26 APT · 99 KHAC; cuối mỗi báo cáo có dòng chú thích các tên viết tắt dùng trong báo cáo (bản in + Excel).

## 3.90.1 — 02/10/2026 21:00 — Số liệu gọn: ma trận như cũ · bảng đối chiếu chéo · tải file gốc · tìm file rác
- **Ma trận file theo tháng là màn chính, gọn như trước** (anh chọn phương án a): mỗi loại file 1 dòng (tên ngắn, chấm tròn A/B/C/D = nhóm, tên đủ khi rê chuột), ô chỉ ✓ + số ngắn (dư nợ / số tổ / số ngày), bản giữa tháng "+ n ngày"; bỏ các dòng tiêu đề nhóm; ma trận không còn khung cuộn dọc.
- **① tình trạng tháng còn 1 dòng:** Ⓐ TW x/7 · Ⓑ chi tiết y/3 · tên file thiếu (bấm để nạp) · tình trạng kiểm tra · ⬇ Tải file gốc cả tháng · 🗑 Xóa cả bộ tháng. Danh sách file tháng dài (3.90) bỏ; tóm tắt chi tiết từng file vẫn còn, thu gọn ở cuối ("📄 Tóm tắt chi tiết các file tháng").
- **② Bảng đối chiếu chéo** (đầu phần kiểm tra, lưu cùng kết quả kiểm): chỉ tiêu (dư nợ, quá hạn, khoanh, cho vay tháng, thu nợ tháng, tiền gửi, số KH dư nợ) × nguồn (BCDHTD số chuẩn · LEN_31 · B32 · Mẫu 31 · Mẫu 10 cuối tháng), triệu đồng; ô xanh = khớp số chuẩn (cho vay LEN_31 / B32 ghi "gồm … đảo khoản"), đỏ = lệch (ghi số chênh), vàng = lưu ý đã biết (thu nợ LEN_31, tiền gửi Mẫu 31); chip **Toàn PGD / từng xã**; bấm ô đỏ / vàng → mở mục kiểm tra chi tiết (lọc theo xã). Danh sách kiểm tra: các mục đạt gom 1 dòng "✅ n mục đạt"; số nhóm đánh liền 1, 2, 3…
- **Sửa:** tháng chưa có file nào mà bấm Kiểm tra vẫn chạy → nay báo "chưa có file nào — nạp file trước rồi kiểm"; số nhóm kiểm tra bị nhảy (1, 2, 8).
- **⬇ Tải file gốc** (bản sao Excel để dùng việc khác): nút trong ô ma trận và "tải cả tháng" ở dòng ①; file còn trong máy thì lấy ngay, không thì tải từ Drive (cần nối Drive); tên file giữ như lúc nạp.
- **🧹 Tìm file rác của Số liệu** (trong "Quản lý dữ liệu Số liệu" — phần Số liệu chạy riêng, dọn rác riêng, không đụng văn bản, hồ sơ, scan; Dọn kho chung của app vẫn bỏ qua thư mục Số liệu): liệt kê bảng / file gốc trong máy không còn ô nào dùng (hoặc file gốc đã lên Drive mà bản trong máy còn), file trên Drive (`Số liệu/`, `_Hệ thống/so_lieu/`) app không còn dùng, ô của loại đã bỏ; mỗi mục có nơi nằm + dung lượng; anh tích → Xóa (Drive vào Thùng rác, 30 ngày). App không tự xóa.
- Điện thoại: số bản dài không đẩy nút ⚙ xuống dòng.

## 3.90 — 02/10/2026 18:00 — 7 file chuẩn TW · tab con 📊 Tổng hợp · kiểm tra chéo với số chuẩn · nạp theo nhóm · chuẩn in
- **Nạp thêm 7 file tổng hợp chuẩn TW mỗi tháng** (anh chốt: số chính thức, chuẩn nhất): **BCDHTD 01.1** (kết quả cho vay theo xã) · **BCDHTD 01.2** (theo chương trình) · **B32** (Mẫu 13/BC, theo nguồn vốn TW / ĐP) · **LEN_31 XAPUONG / DONVIUT / CHTRINH / TO_TRUONG** (theo xã, hội, chương trình, tổ trưởng). App đọc file biểu theo **hàng mốc cột (1) (2) (3)…** (mốc lặp ở đầu mỗi trang cũng đọc lại), nhận loại theo tiêu đề / mẫu biểu, ngày theo dòng "Ngày … tháng … năm …" trong file; BCDHTD, B32 tính **triệu đồng** → app lưu ra **đồng**; LEN_31 tính đồng.
- **Thứ bậc tin cậy (anh chốt):** BCDHTD > LEN_31, B32 > Mẫu 31 > Mẫu 10. Lệch thì báo, không sửa nguồn.
- **File nạp chia 4 nhóm:** Ⓐ Tổng hợp chuẩn TW (7 file, bắt buộc) · Ⓑ Chi tiết tháng (Mẫu 31, Thông tin tổ trưởng **nạp mỗi tháng**, Món vay 3 tháng KHĐ **mẫu 14**; bắt buộc) · Ⓒ Theo ngày (Mẫu 10) · Ⓓ Phụ — Nợ quá hạn, Nợ khoanh, Tổng dư nợ theo CT (không bắt buộc, có thì đối chiếu thêm với Mẫu 31). **Bỏ** (anh chốt): **Mẫu 7** (khỏi tham chiếu), **Sao kê khách hàng** (anh không xuất được nữa — thông tin khách lấy từ Mẫu 31). Kéo các file đã bỏ vào → app báo "đã bỏ", không lưu; dữ liệu cũ vẫn xem / xóa được.
- **KHĐ chỉ nhận mẫu 14** "Sao kê món vay N tháng không hoạt động (DL Tháng)" (2 file cùng số, mẫu 14 có điểm GD xã, ngày đến hạn GDXA). File **mẫu 08/KTNB** → báo "dùng file mẫu 14"; file KHĐ **0 dòng** → báo xuất lại, không lưu.
- **Mẫu 31 / file TW xuất giữa tháng:** app **tự đọc ngày trong file** — ngày cuối tháng vào **ô tháng** (số chốt), ngày khác vào **ô theo ngày** của tháng đó (chip ngày; ô ma trận ghi "+ n ngày"). Nạp từng file: chọn ngày (mặc định cuối tháng).
- **Màn 📥 Nạp & Kiểm tra:** ① file tháng theo nhóm (đếm Ⓐ x/7 · Ⓑ y/3), ma trận nhiều tháng có dòng nhóm; **🔁 Thay file** 1 ô (file mới phải đúng loại, đúng kỳ — khác thì báo, không thay; bản cũ vào thùng rác Drive); **🗑 Xóa cả bộ tháng**; **♻ Làm mới toàn bộ số liệu** (trong "🧹 Quản lý dữ liệu", gõ XOA + xác nhận lần 2; chỉ xóa phần Số liệu — mọi ô, danh bạ, kết quả kiểm tra — trên máy, Drive vào thùng rác, máy khác nhận lệnh xóa; không đụng hồ sơ, văn bản…). Nạp nhiều file: 1 bộ của 1 tháng hay 1 loại nhiều tháng đều được, app đọc từng file rồi xếp vào ô.
- **② Kiểm tra tháng thêm 2 nhóm:** **Số chuẩn TW khớp nhau** — BCDHTD 01.1 = 01.2 (13 chỉ tiêu dòng tổng); 01.1 ↔ LEN_31 XAPUONG từng xã (dư nợ, trong hạn, quá hạn, khoanh); cho vay LEN_31 = BCDHTD + đảo khoản; thu nợ BCDHTD ↔ LEN_31 (lưu ý); 4 biểu LEN_31 khớp nhau và dòng con cộng = dòng xã; B32 ↔ BCDHTD từng xã (cho vay B32 gồm đảo khoản, "thu nợ" B32 = thu nợ thực + cho vay). **Mẫu 31 ↔ số chuẩn TW** — từng xã 10 chỉ tiêu (dư nợ, trong hạn, quá hạn, khoanh, cho vay tháng / lũy kế = giải ngân − đảo khoản, thu nợ tháng / lũy kế, xóa nợ lũy kế, số KH dư nợ); xã × nguồn vốn với B32; tiền gửi LEN_31 ↔ số dư 105 (lưu ý); **từng tổ LEN_31 TO_TRUONG** (ghép theo tên tổ trưởng trong xã, LEN_31 không có mã tổ, tên có thể bị cắt, 2 tổ trùng tên gộp 1 dòng); thu nợ từng tổ (lưu ý); dòng tổ chưa ghép được. Nhóm chi tiết thêm: KHĐ ↔ Mẫu 31 cùng món; món đủ điều kiện mà không có trong KHĐ (hệ thống tự loại món khoanh, HSSV — còn lại báo lưu ý); tổ có dư nợ (LEN_31) có trong Thông tin tổ trưởng. Bỏ phép so Mẫu 7.
- **Tab con mới 📊 Tổng hợp** (thứ tự tab con: 📥 Nạp & Kiểm tra · 📊 Tổng hợp · 📑 Sao kê · 👥 Tổ TK&VV · 👤 Tra cứu KH): chọn kỳ → tích tiêu chí → bộ lọc (phạm vi xã → điểm GD → hội → tổ dùng chung, + chương trình, + nguồn vốn) → Xem → In A4 ngang / Excel. 9 báo cáo: Kết quả cho vay theo xã (01.1) · theo chương trình (01.2) · Đơn vị hành chính PGD → xã → điểm GD (LEN_31; điểm GD = cộng các tổ) · Theo hội · Theo chương trình từng xã · hội (CHTRINH) · Theo tổ trưởng · Tiền gửi tổ viên · Nguồn vốn TW / ĐP (B32 + dòng thu nợ thực) · **Lọc sâu tính từ Mẫu 31 (tham khảo)** — tự đối chiếu số cả xã với BCDHTD 01.1, lệch thì báo ⚠ ngay trên báo cáo.
- **Thẻ tổ (👥 Tổ TK&VV):** thêm chỉ tiêu chuẩn TW từ LEN_31 (số hộ, dư nợ, tiền gửi, cho vay / thu nợ / thu lãi tháng; ⚠ khi lệch Mẫu 31; ghi "gộp 2 tổ trùng tên"); bỏ dòng xếp loại Mẫu 7.
- **Chuẩn in mọi báo cáo** (anh chốt): A4, **lề trên 2 · dưới 2 · trái 3 · phải 2 cm**, Times New Roman, đầu bảng lặp mỗi trang, **số trang** (trình duyệt hỗ trợ), báo cáo tổng hợp **A4 ngang**, danh sách **A4 dọc**; cuối mỗi báo cáo ghi **"PGD NHCSXH GÒ DẦU"**, không ký; Excel cũng có dòng này. Xuất PDF = In → Lưu PDF.
- Kiểm trên bộ file thật 30/09/2026 (chỉ trong máy kiểm, không đưa lên kho): Mẫu 31 khớp tuyệt đối BCDHTD 01.1 cả 5 xã (10 chỉ tiêu), khớp B32 theo xã × nguồn; 4 biểu LEN_31 khớp nhau; ghép 369 / 370 dòng tổ LEN_31 (1 dòng gộp 2 tổ trùng tên), khớp dư nợ / quá hạn / khoanh / cho vay từng tổ; lưu ý còn: thu nợ LEN_31 thấp hơn BCDHTD 71.999.298 (12 tổ), tiền gửi LEN_31 ↔ 105 Mẫu 31 chênh 19.258.156, 3 món vay mới năm 2026 không có trong KHĐ, 19 tổ có dư nợ chưa có trong Thông tin tổ trưởng.

## 3.89 — 01/10/2026 23:20 — Bộ chọn phạm vi chung · Tra cứu kiểm trùng · tab con 📑 Sao kê (8 báo cáo)
- **Bộ chọn phạm vi dùng chung** (anh chốt: mọi tra cứu / in): Xã → Điểm GD → Hội (lọc, bỏ trống = mọi hội) → Tổ; dừng ở cấp nào lấy phạm vi cấp đó; ô chọn theo phím chung + chip chọn nhanh (bấm lại chip = bỏ chọn); mỗi nơi nhớ phạm vi riêng; báo cáo ghi "Phạm vi: …" trên đầu. Dùng cho Tra cứu KH, Tổ TK&VV (bắt buộc đến tổ), Sao kê.
- **👤 Tra cứu KH — kiểm trùng trước khi nhập máy:** gõ **CCCD / CMND (9–12 số)** → rà CCCD khách + **CMND HSSV** trên **toàn PGD**: ✅ "Không trùng — chưa dây vốn, có thể nhập máy" / ⚠ "Trùng — đang dây vốn: …" (chủ hộ hoặc HSSV của ai, món, dư nợ, xã · ấp · tổ) / ⓘ "đã tất nợ / chỉ gửi TK — không tính dây vốn"; luôn ghi "theo số liệu ngày …". **Gõ tên** → chỉ khớp tên người (không còn khớp tên tổ trưởng / ấp), tìm cả **tên vợ/chồng (người thừa kế)** và **tên HSSV** (Mẫu 31), hiện hết (tối đa 300 dòng mỗi nhóm, nhắc thu hẹp), mỗi dòng có xã · ấp · tổ · tình trạng (đang vay n món / đã tất nợ / chỉ gửi TK). Ô **📍 Phạm vi tìm** để thu hẹp. CCCD người thừa kế: chưa có báo cáo nào có cột này — anh sẽ tìm.
- **Tab con mới 📑 Sao kê** (Số liệu, cạnh Tổ TK&VV): chọn kỳ + phạm vi → tích → Xem → In / Excel; phạm vi từ xã trở lên thì bảng **chia theo tổ, có dòng cộng tổ**:
  1–3. **Nợ quá hạn · Nợ khoanh · Món vay 3 tháng KHĐ** (từ 3 file tháng).
  4. **Số điện thoại khách hàng** (khách đang vay): SĐT **đạt = đúng 10 chữ số, bắt đầu bằng 0**; chưa có số → ô trống tô nền "Chưa có SĐT — bổ sung"; không đạt → in số + "SĐT không đạt yêu cầu"; dòng đầu tóm tắt số đạt / trống / không đạt.
  5. **Nợ đến hạn từ ngày … đến ngày …** (mặc định tháng sau ngày số liệu): lọc theo **ngày ĐH theo GDXA**, kèm ngày ĐH hợp đồng, ngày ĐH gia hạn, số tháng đã gia hạn, **còn được gia hạn** (= ½ thời hạn cho vay − đã gia hạn; cột gia hạn trong file không khớp nhau thì ghi "⚠ kiểm trên hệ thống").
  6. **Giải ngân trong tháng** · 7. **Món vay có thay đổi dư nợ** (dư nợ đầu tháng, giải ngân, thu nợ, khác, dư nợ cuối tháng) · 8. **Khách giải ngân cần mở TK 105**.
  Báo cáo 4–8 cần **Mẫu 31** (Mẫu 10 không có các cột này) — thiếu thì báo rõ.
- Gồm luôn **3.88.1** (cây tổ khi máy chưa có bảng số liệu). Hàng tab con của Số liệu nằm 1 hàng, điện thoại vuốt ngang, tự cuộn tới tab đang mở.

## 3.88.1 — 01/10/2026 22:18 — Sửa: cây tổ trống khi máy chưa có bảng số liệu
- Máy chưa có bảng số liệu (lưu trên Drive nhưng chưa tải về — Drive chưa nối / hết phiên; thường là máy khác máy đã nạp): tab con Tổ TK&VV ra cây trống, không báo. Nay: cây tổ dựng tạm từ danh bạ khách hàng, có cảnh báo vàng + nút **☁ Nối Drive và tải** / **⟳ Thử lại**; nối được thì tải bảng, hết cảnh báo. Lỗi khi mở số liệu → báo lỗi + Thử lại (trước đây đứng ở "Đang mở…"). Xem báo cáo khi chưa có bảng → nhắc nối Drive.

## 3.88 — 01/10/2026 21:52 — 👥 Tab con Tổ TK&VV (3 báo cáo của tổ) · Số liệu: luồng theo tháng + nút Kiểm tra
- **Tab con mới 👥 Tổ TK&VV** trong tab Số liệu, cạnh 👤 Tra cứu KH (anh chốt; chỉ ĐỌC số liệu): chọn **kỳ số liệu** (Mẫu 31 theo tháng / Mẫu 10 theo ngày) → chọn tổ theo cây **Xã → Điểm GD → Hội → Tổ** (ô chọn theo **phím chung**: Enter / Tab sang 1 ô, Shift lùi, ← → ↑ ↓ ở ô chọn, ô cha trống thì báo; đủ chỗ thì có thêm **chip** bấm nhanh; cấp chỉ có 1 lựa chọn tự chọn) hoặc **gõ tên tổ trưởng / mã tổ / ấp**. Thẻ tổ: địa chỉ, điểm GD (ngày GD), hội, tổ phó, SĐT, chỉ tiêu nhanh (tổ viên, còn dư nợ, dư nợ, tỷ lệ quá hạn, khoanh, 105, xếp loại Mẫu 7). Tháng chưa nạp Thông tin tổ trưởng / Mẫu 7 → thông tin tổ lấy ở tháng gần nhất có file.
- **3 báo cáo** (tích → 👁 Xem → 🖨 In / PDF hoặc 📊 Excel; chỉ là thông tin để xem, in; A4 dọc; cuối trang để trống):
  1. **Danh sách hộ vay** — sắp theo Mã KH; cột STT · Mã KH · Họ tên · Số KU · Chương trình · Ngày vay · Dư nợ · Dư nợ QH · Số dư 105 · Lãi tồn; KH nhiều món: mỗi món 1 dòng + dòng cộng, 105 ghi 1 lần; món đã tất toán ghi "(đã TT)", khách không có món vẫn hiện; dòng tổng tổ.
  2. **Nợ cần xử lý** — 1 mặt A4: phần chung (tổ, dải chỉ tiêu) + 3 khung lần lượt **Nợ quá hạn** (ngày chuyển QH, số ngày QH, mới trong tháng, số dư 105) · **Nợ khoanh** (ngày hiệu lực, hết hạn, còn bao nhiêu ngày, nguyên nhân) · **Món vay 3 tháng KHĐ** (ngày GD gần nhất, số ngày không GD, ngày đến hạn, lãi tồn); khung trống ghi "Không có"; nhiều món thì tự thu nhỏ chữ.
  3. **TK 105 của tổ** (nguồn Mẫu 31) — tóm tắt: tổ viên, còn dư nợ, dư nợ 0 còn lãi tồn (chưa tất nợ), đã tất nợ (dư nợ 0 và lãi tồn 0), số dư 105; **A. Khách đã tất nợ còn số dư 105** (có Số TK 105 — căn cứ xem xét cho ra khỏi tổ); **B. Khách mới kết nạp trong tháng** (có dư nợ tháng này, tháng trước không có trong tổ) — chưa có số TK 105 ghi **"CHƯA MỞ — cần mở"**.
- **Chương trình vay** trên báo cáo ghi mã + **tên ngắn dễ đọc** (03 Giải quyết việc làm, 06 Nước sạch VSMT…; bảng `CT_NGAN`).
- **Tab Số liệu — luồng theo tháng:** chọn tháng (‹ › hoặc ô tháng) → **① File tháng**: từng loại một dòng (✓ tóm tắt / ✗ chưa nạp + nút Nạp; Mẫu 7 không bắt buộc), dữ liệu theo ngày (Mẫu 10, Sao kê KH) là các chip ngày; **② 🔍 Kiểm tra tháng**: đủ file · toàn vẹn (sai mã, 0 dòng, ngày không phải cuối tháng, xuất sau ngày số liệu, kỳ do anh chọn, dữ liệu bản cũ) · khớp giữa các file (các đối chiếu cũ + **Mẫu 7 so từng tổ**: dư nợ, QH, khoanh) · khớp với tháng trước (công thức dư nợ, món đang vay biến mất) · **Mẫu 31 ↔ Mẫu 10 cùng ngày cuối tháng** (từng món) · bất thường (mã thôn, tổ lạ). **Kết quả lưu lại** (máy + Drive), mở lại không chạy lại; nạp / thay / xóa file sau lần kiểm → báo **"dữ liệu đã đổi — kiểm lại"**. Mỗi mục lệch bấm mở xem bảng chi tiết. **③ Chốt số liệu** để sau. Bảng nhiều tháng giữ nguyên, **thu gọn được** (nhớ lựa chọn).

## 3.87 — 01/10/2026 21:00 — Số liệu: tách Mẫu 31 (chốt tháng) / Mẫu 10 (theo ngày) · khách nhiều sổ 105 · Mẫu 7
- **Hai loại file riêng:** **Mẫu 31 · HS tín dụng (chốt tháng)** lưu theo tháng, là **số chuẩn**. **Mẫu 10 · Sao kê chi tiết (theo ngày)** lưu theo **ngày**: nạp ngày nào cũng được, mỗi ngày một bản riêng. Ô tháng của Mẫu 10 ghi số ngày đã nạp và ngày mới nhất; bấm vào là ra danh sách ngày, mở từng ngày, **📅 Đổi ngày** nếu cần. **Sao kê khách hàng** cũng lưu theo ngày (chưa có mẫu file).
- **Tự nhận loại theo bộ cột** (Mẫu 10 không có cột "Tình trạng món vay", Mẫu 31 có), không dựa vào tên file. **Ngày số liệu:** cột ngày trong file → tiêu đề → tên file (Mẫu 10 không ghi ngày bên trong nên lấy theo tên file, app ghi rõ). Nạp từng file: Mẫu 10 / Sao kê KH chọn **ngày**, các loại khác chọn tháng.
- **Chuyển dữ liệu cũ, không mất gì:** Mẫu 10 đã nạp ở bản 3.85–3.86 (đang nằm ở ô "Hồ sơ tín dụng chi tiết" theo tháng) **tự chuyển** sang dòng Mẫu 10 theo ngày khi mở app. Dữ liệu đã đọc giữ nguyên, file gốc trên Drive giữ nguyên, bản dữ liệu đọc nhanh trên Drive đổi tên theo ngày (bản cũ vào thùng rác Drive). Danh bạ khách hàng cập nhật theo.
- **Khách có nhiều sổ 105 — giữ nguyên như file, sửa lỗi cộng thừa 105:** hệ thống xuất 2–3 dòng cùng một khế ước khi khách có nhiều sổ. 3.86 gộp các dòng và **cộng số dư 105 → thừa** (file Mẫu 10 ngày 31/08 thật: thừa 603.650.349 đ). Từ 3.87: dòng lặp **giữ nguyên ở bảng riêng** (đủ từng sổ, "105 đầu tháng" từng sổ), dư nợ đếm mỗi khế ước 1 lần, **số dư 105 lấy 1 lần mỗi khách** (anh xác nhận cột "105 Ngày BC" là tổng 105 của khách). Tóm tắt ghi "n KH có từ 2 sổ 105"; thẻ khách hàng ghi "TK 105 (nhiều sổ)". Dữ liệu nạp ở bản cũ có dòng lặp → tóm tắt cảnh báo "nạp lại file để tính đúng".
- **Loại mới Mẫu 7 · Kiểm tra Tổ TK&VV** (file tổng hợp theo tổ: tổ viên, dư nợ, quá hạn, khoanh, lãi tồn, 105, điểm, xếp loại; ngày lấy theo cột "Ngày dữ liệu"). Lưu để đối chiếu và dùng cho danh sách theo tổ (bản sau).
- **Ngày xuất file:** tên file có 2 ngày (vd `QUERY…_02092026_…_31-08-2026`) → app nhận ngày xuất; file theo tháng xuất **sau** ngày số liệu thì cảnh báo "có thể lẫn phát sinh sau ngày chốt (lệch thì lấy Mẫu 31 làm chuẩn)".
- **Đối chiếu tháng:** chưa có Mẫu 31 thì tạm dùng **Mẫu 10 của ngày cuối tháng** (ghi rõ "Mẫu 10 ngày 31/08/2026") — giữ các phép đối chiếu cũ khi máy mới chỉ có Mẫu 10.

## 3.86 — 08/10/2026 14:00 — Số liệu: Mẫu 31 thay Mẫu 10 · tab con Tra cứu KH độc lập
- **Mẫu 31 "Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu"** (175 cột, ~22 MB) được nhận vào ô **Hồ sơ tín dụng chi tiết**, thay Mẫu 10 (Mẫu 10 vẫn đọc được). Kỳ lấy theo cột **Ngày số liệu**. **Sửa lỗi 3.85:** file có cột "Tình trạng món vay" không còn bị nhận nhầm là KHĐ / Nợ quá hạn / Nợ khoanh.
- **Giữ đủ 175 cột** (cột chưa dùng lưu dạng `c_<tên cột>`, gồm cả nhóm XKLĐ, HSSV, hiệu quả đầu tư…) — không phải nạp lại khi cần cột mới. Nén ~3 MB/tháng (file 31/07 thật).
- **Gộp khế ước trùng:** khách có 2 sổ 105 → hệ thống xuất 2 dòng cùng khế ước; app gộp, cộng số dư 105, **không cộng trùng dư nợ** (file 31/07: 12 khế ước, tránh thừa 493 triệu). Lưu cả **món đã tất toán (CLOSE)** và **khách chỉ gửi tiết kiệm** (không có món).
- **Đọc nhẹ hơn:** bỏ phần định dạng khi đọc Excel — file 31/07 thật đọc ~24 giây (3.85: ~47 giây), màn hình không treo.
- **Tóm tắt kỳ:** món đang vay / đã tất toán / khách chỉ gửi TK, giải ngân và thu nợ trong tháng (số hệ thống). **Đối chiếu mới:** dư nợ tháng trước + giải ngân − đảo khoản − thu nợ − gốc xóa = dư nợ tháng này. Kiểm mã thôn bỏ qua khách chỉ gửi TK (thôn 48200000).
- **Tab Số liệu chia 2 tab con:** **📥 Nạp số liệu** (như 3.85) · **👤 Tra cứu KH** với **ô tìm riêng**: tên không dấu, CCCD, mã KH, **SĐT**, **số khế ước (kể cả món đã tất toán, kỳ cũ)**, ngày sinh. Thẻ khách hàng thêm SĐT, vợ/chồng, giới tính, dân tộc; món: ngày đến hạn, lãi suất, **đã tất toán**, thông tin XKLĐ / HSSV.
- **Ô tìm chung không còn tra khách hàng** (tránh chồng chéo). Đang ở tab Số liệu mà gõ ô tìm chung → gợi ý **tab có kết quả** (Văn bản, Tháng, Thư viện, Scan, Biểu mẫu) với số kết quả, bấm là sang tab đó.

## 3.85 — 08/10/2026 09:00 — 📈 Tab Số liệu: nạp bộ Excel hằng tháng · tra khách hàng
- **Tab mới 📈 Số liệu** (sau tab Tháng): ma trận **7 loại file × 6 kỳ** — Hồ sơ tín dụng chi tiết · Sao kê khách hàng · Món vay 3 tháng KHĐ · Nợ quá hạn · Nợ khoanh · Tổng dư nợ theo CT · Thông tin tổ trưởng. Ô có số liệu ghi ✓ + số dòng + tổng; ô trống bấm **+** để nạp đúng ô đó.
- **2 cách nạp:** **📥 Nạp cả bộ** (chọn hoặc kéo thả nhiều file — app tự nhận loại + kỳ, xem trước rồi tích file ghi nhận) · **📄 Nạp từng file** (anh chọn loại + kỳ, app vẫn đọc nội dung kiểm lần cuối: sai loại thì chặn, ngày trong file khác kỳ thì báo cho anh chọn).
- **Bộ đọc:** nhận loại theo **các cột trong file**, không phụ thuộc tên file (không dấu, đảo từ vẫn được); chỉ đọc sheet có bảng đúng cột (bỏ qua sheet phụ như "BC Gia Lộc", "Sheet4"); tự dò dòng tên cột; bỏ dòng trống, dòng tổng cộng, tiêu đề lặp do ngắt trang, phần chữ ký; kiểm mã khóa từng dòng; giữ số 0 đầu mã. **Kỳ:** cột Ngày báo cáo → ngày ở tiêu đề → tên file → anh chọn (ghi rõ lấy từ đâu). File đúng mẫu nhưng 0 dòng (vd tháng không có nợ quá hạn) vẫn ghi nhận được.
- **Dạng đọc nhanh:** Excel chỉ đọc **một lần** lúc nạp (đọc ở luồng phụ, màn hình không treo; bộ giả 25.000 món ~10 giây), sau đó lưu theo cột, nén; tra cứu không đọc lại Excel. **Lưu trên Drive của anh:** file gốc ở `Tủ hồ sơ/Số liệu/<kỳ>/`, số liệu đã đọc + chỉ mục + danh bạ ở `_Hệ thống/so_lieu/`; máy chỉ giữ bản sao. Máy khác tự kéo về; thay file thì bản cũ vào Thùng rác Drive.
- **Bộ dữ liệu kỳ + đối chiếu (chỉ báo):** tổng dư nợ HS tín dụng = Tổng dư nợ theo CT (từng xã) · quá hạn / khoanh của sao kê = Tổng dư nợ theo CT · món QH / khoanh / KHĐ có trong HS tín dụng (nối theo số khế ước = mã món vay) · mã thôn lạ so với danh mục địa bàn · dòng thiếu tên thôn / điểm · tổ chưa có trong danh sách tổ trưởng. Danh mục mã của kỳ: nguồn vốn TW/ĐP → Mã NĐT (anh đặt tên gọi), chương trình, tổ theo hội, điểm GD.
- **👤 Tra khách hàng ở ô tìm (mọi tab):** gõ tên không dấu, CCCD (đủ hoặc vài số cuối), mã KH, năm sinh hoặc ngày sinh → **thẻ khách hàng**: họ tên, ngày sinh, CCCD, ngày cấp, nơi cấp, địa chỉ, mã KH, TK 105 (mỗi ô có 📋 chép, có 📋 chép cả khối), tổ trưởng + SĐT, hội, điểm GD, các món vay kỳ đó (dư nợ, quá hạn, khoanh, KHĐ, ra trường, gia hạn), nút 🏠 Hồ sơ hộ.
- **Tab Tháng:** gỡ 7 dòng sao kê thuần Excel khỏi ma trận, tính thiếu, Cài đặt (bỏ hẳn "Sao kê món vay có TK trên 10%"); file đã nạp trước đây **không xóa, không di chuyển** — ô tương ứng ở tab Số liệu hiện **📄 đọc file cũ**. Dòng XLS bật thêm: ô trống xám, không tính thiếu, không cảnh báo.

## 3.84 — 08/10/2026 01:30 — Việc nhỏ: tên có dấu cho Scan · phím chung · chip chờ khai
- **✍ Tab Scan — tên có dấu:** bản scan tên không dấu (thường do Lập chỉ mục lấy từ tên file, vd "Nguyen Van A Hdtd") → thanh nhắc "✍ n bản scan tên không dấu" + **Xem & đổi**: đề xuất tên có dấu theo danh sách khách Theo dõi nợ (khớp tên không dấu + cùng tổ nếu cả 2 có; đuôi như "Hdtd" giữ nguyên). **Nhiều khách cùng tên → không đoán.** Anh tích bản muốn đổi rồi mới đổi; bản đã lên Drive tự đổi tên file trên Drive theo.
- **⌨ Phím chung** (Enter / Tab sang 1 ô, Shift lùi, ↑ ↓ ở ô chọn, Ctrl+Enter lưu) áp thêm cho hộp **sửa mục hồ sơ hộ**, **lần làm việc** (Theo dõi nợ) và **sửa lịch**. Ô nhiều dòng (ghi thêm, diễn biến…) vẫn dùng Enter để xuống dòng — dùng Tab để sang ô kế.
- **📥 Chip chờ khai trên điện thoại** chỉ còn "📥 n" → không đè các nút bên cạnh (máy tính giữ nguyên chữ).

## 3.83 — 08/10/2026 00:30 — 📊 Số liệu giao ban · 📅 Chuẩn bị buổi giao dịch
- **🧰 Công cụ › 📊 Giao ban** (tab Hôm nay; mở hộp rộng): từ Theo dõi nợ, mỗi danh sách (quá hạn · 3 tháng KHD · khoanh) **kỳ mới nhất so với kỳ trước** theo xã › điểm GD: số món, số tiền, ± món, ± tiền (tăng đỏ, giảm xanh); **tổ tăng / giảm nhiều nhất**; **món mới vào / đã ra khỏi danh sách** (bấm tên mở 🏠 hồ sơ hộ); **💡 nhận định gợi ý** tính từ số liệu (không tự đặt số, anh sửa câu chữ). 🖨 In (A4 ngang) · 📋 Chép nhận định.
- **🧰 Công cụ › 📅 Buổi GD:** chọn điểm giao dịch (mặc định điểm có ngày GD gần nhất theo danh mục địa bàn) → **cam kết đến hạn trước / đúng buổi**, **món đang theo dõi ở điểm** (theo ấp, tổ, trạng thái), **hồ sơ scan còn thiếu ở điểm**. 🖨 In · 📋 Chép (dán Zalo gửi tổ trưởng).
- Cần nạp ít nhất 2 kỳ sao kê liên tiếp để có số so sánh; 1 kỳ thì chỉ hiện số kỳ hiện tại.

## 3.82 — 07/10/2026 23:00 — 🏠 Hồ sơ hộ một trang
- **Gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab** vào một trang: 🪪 CCCD (ảnh mặt trước) · 📑 hồ sơ đã quét · ✍ Chữ ký·CCCD · 📁 Bộ hồ sơ · 💰 mọi món vay đang theo dõi (CT, danh sách, số tiền, trạng thái) · 📈 3 lần làm việc gần nhất (cam kết, hạn, giữ đúng / thất hứa) · 🗂 tóm tắt hồ sơ hộ 8 mục · SĐT.
- Bấm vào từng dòng là mở đúng chỗ (bản quét, thẻ món vay, bộ hồ sơ); nút **🖨 In / gửi bộ giấy tờ** ghép CCCD + hồ sơ quét thành 1 file; **🧾 Phiếu món vay**.
- **Mở từ:** gõ tên khách ở ô tìm (gợi ý **🏠 Hồ sơ hộ**) · nút **🏠** trên dòng Scan · nút **🏠 Hồ sơ 1 trang** trên thẻ món vay.
- **Ghép theo tên (không dấu) + mã tổ** khi cả 2 bên có — trùng tên khác tổ không bị gộp nhầm; tên file kèm đuôi ("Vo Van Cuong Hdtd") vẫn nhận. Chỉ đọc, không sửa / không gắn gì vào dữ liệu.

## 3.81 — 07/10/2026 22:00 — An toàn dữ liệu: luôn gộp, chặn ghi trống, sao lưu & khôi phục
- **Luôn gộp trước khi ghi chỉ mục lên Drive** (việc F): trước chỉ gộp khi máy khác vừa gửi, nên máy này lỡ mất danh sách (lỗi Scan 3.79) là ghi đè luôn bản tốt trên Drive. Nay mỗi lần ghi đều tải bản trên Drive về gộp trước (gộp có dấu xóa + thùng rác nên không làm sống lại mục đã xóa).
- **Chặn ghi trống:** Drive đang có dữ liệu mà bản sắp ghi trống trơn → không ghi, báo đỏ.
- **Bản dự phòng đầu ngày trên Drive** (`_Hệ thống/du_phong`, 7 ngày): không còn ghi đè trong ngày → sự cố giữa ngày không xóa mất bản dự phòng của ngày đó.
- **Sao lưu trong máy mỗi ngày** (IndexedDB, giữ 7 bản, gồm cả Theo dõi nợ) — máy chưa nối Drive vẫn có bản sao lưu.
- **🧰 Dọn kho › 🛟 Sao lưu:** danh sách các bản (trong máy / Drive) với số mục và **"máy đang thiếu n"**; bấm **So sánh** xem thiếu gì theo từng tab; **♻ Lấy lại** chỉ **thêm mục bị thiếu** — không ghi đè, không đụng mục đang có, mục trong thùng rác hay đã xóa hẳn. Nút 💾 Sao lưu ngay.
- **Theo dõi nợ:** không lưu khi dữ liệu nợ chưa nạp xong (tránh ghi đè trống); không ghi file nợ trống lên Drive.
- Rà các danh sách khác có cùng kiểu lỗi Scan: Chữ ký·CCCD, Bộ hồ sơ không dùng danh sách trung gian → không dính; Theo dõi nợ đã chặn như trên.

## 3.80.1 — 07/10/2026 21:00 — Scan: bản có PDF trên Drive không báo nhầm · khôi phục không tạo trùng
- Bản scan tài liệu **đã có PDF trên Drive** nhưng máy này không còn ảnh từng trang (lấy về từ Drive / máy khác) không còn báo nhầm **"⚠ Chưa có trang · 0 trang"** — chip ghi **☁ PDF trên Drive**; xem / in / gửi dùng file PDF trên Drive như trước.
- **♻ Khôi phục:** ảnh trang / mặt thẻ còn trong máy mà **cùng mã với bản đã có trong danh sách** → gắn vào bản đó (không tạo bản trùng); việc đếm để hiện thanh nhắc không còn sửa dữ liệu — chỉ khi anh bấm Khôi phục mới gắn.

## 3.80 — 07/10/2026 20:00 — Hộp sửa: văn bản liên quan gọn
- Chip văn bản liên quan trong hộp sửa **chỉ ghi số hiệu** (rê chuột thấy tên đầy đủ + ngày; ↗ xem bên cạnh, ✕ gỡ vẫn có) — ô gõ số hiệu nằm cùng hàng, không bị đẩy xuống dòng.
- **Văn bản liên quan + Ghi chú riêng chung 1 hàng** (điện thoại vẫn 2 hàng).
- Ô Trích yếu thật sự 1 dòng (kéo giãn được); dải gợi ý: khi có hướng dẫn của ô thì bỏ phần phím tắt cho đủ chỗ, dòng mở đầu gọn 1 dòng.
- Đo ở màn 1280×720 (giống máy anh): hộp vừa 1 khung, không cuộn.

## 3.79.1 — 07/10/2026 19:00 — SỬA KHẨN: mất danh sách Scan
- **Lỗi (có từ 3.50, lộ ra khi dùng nút Gộp 3.77):** khi mở app, danh sách Scan của tab Scan chỉ nạp khi bấm vào tab; trước đó nếu **xóa / gộp văn bản** (đưa vào thùng rác) hoặc **app tự đẩy bản scan lên Drive** thì app lấy nhầm danh sách trống của tab Scan ghi đè danh sách thật → tab Scan báo 0 bản. **Ảnh trong máy không mất** — chỉ mất danh sách (tên, địa bàn).
- **Sửa gốc:** `chuyenVaoRac`, `luuHoSo`, `xoaScanIm` không bao giờ thay danh sách thật bằng danh sách của tab Scan chưa mở; tab Scan và dữ liệu dùng chung 1 danh sách ngay khi mở app.
- **Khôi phục:** tab Scan hiện thanh đỏ "⚠ Còn n bản scan có ảnh trong máy nhưng không có trong danh sách" + nút **♻ Khôi phục**:
  - có Drive: kéo lại chỉ mục trên Drive trước (bản nào còn trên Drive lấy lại đủ tên, địa bàn);
  - còn lại dựng từ ảnh trong máy: thẻ CCCD theo mặt trước / sau; tài liệu gom các trang theo mã bản quét (đúng thứ tự trang); ảnh / PDF lẻ gom theo giờ tạo (≤ 15 phút = 1 bản);
  - bản khôi phục để **chưa khai** (tên trống, ghi chú "Khôi phục từ ảnh còn trong máy") → bấm **Khai hàng loạt** ghi lại tên, địa bàn. Không xóa gì.

## 3.79 — 07/10/2026 17:00 — Hộp sửa gọn trong 1 khung
- Hộp sửa văn bản (và hộp sửa bản quét) **vừa 1 khung, không phải cuộn** dù nhiều tag (đo ở 1366×768: trước tràn 69px).
- **Chip tag nhỏ lại** (cao 19px, chữ 11px), khối tag tối đa 3 hàng — nhiều hơn thì cuộn trong khối; tag đang chọn vẫn đứng đầu; ô **＋ tag / lọc** đứng đầu khối (không bị khuất).
- **Hàng nút đáy thấp lại** (Xóa · Thôi · Lưu một hàng 32px, trước 61px); ô Trích yếu 1 dòng (kéo giãn được); dải gợi ý xanh thấp hơn.

## 3.78 — 07/10/2026 16:00 — Gợi ý ô nhập thành dải chip cố định · văn bản liên quan 1 dòng
- **Hộp sửa văn bản / sửa bản quét:** bỏ bong bóng đen nổi (che các ô phía trên). Hướng dẫn + ví dụ của ô đang gõ hiện ở **dải chip xanh lá cố định** ngay đầu hộp (dưới hàng Nhóm / tiêu đề); dải giữ chỗ sẵn nên các ô không bị xô; phím tắt chữ nhỏ cuối dải (điện thoại ẩn phím tắt). Gợi ý tag (＋ tag) vẫn hiện trong dải.
- **Khung xem văn bản:** bỏ khối "🕘 Dòng thời gian" (tốn chỗ). Văn bản liên quan gọn thành **1 dòng chip số hiệu xanh lá** dưới tên file, xếp theo ngày; rê chuột thấy ngày + tên đầy đủ, bấm là đi tới; văn bản hết hiệu lực gạch ngang; "‹ số hiệu" (quay lại văn bản vừa xem) đứng đầu dòng. Cảnh báo ⛔ hết hiệu lực giữ nguyên.

## 3.77 — 07/10/2026 14:00 — Văn bản trùng: báo + gộp · lọc không sót
- **Vì sao trước không báo trùng:** app chỉ coi là trùng khi nội dung file giống hệt từng byte — cùng văn bản tải 2 nguồn (Zalo, Drive, email…) là lọt; file vào bằng Lập chỉ mục / đồng bộ máy khác không qua kiểm tra trùng.
- **Trùng = cùng số hiệu + cùng năm ban hành** (so không dấu, bỏ khoảng trắng, gạch; khác năm là văn bản khác):
  - Dòng danh sách có chip đỏ **⚠ trùng n bản**; hàng lọc có chip **⚠ Trùng số hiệu** (lọc ra các bản trùng, xếp cạnh nhau).
  - Bấm chip → hộp **Gộp văn bản trùng**: chọn bản giữ lại (app chọn sẵn bản nhiều thông tin nhất), ↗ Xem từng bản; **Gộp** → bản kia chuyển hết văn bản liên quan, tag, CT vay, mảng, ⭐, ghi chú, tóm tắt sang bản giữ rồi vào **Thùng rác** (hoàn tác / lấy lại 30 ngày).
  - **Lưu file mới** (khay chờ) trùng với văn bản đã có → hỏi **Bỏ file mới / Giữ cả 2 / Lưu rồi gộp**. ("Duyệt tất cả" không hỏi từng file — trùng vẫn hiện chip ⚠ trên danh sách.)
- **Lọc không sót (anh chốt: tối ưu nhưng không để văn bản nào lọc không ra):**
  - Mỗi nhóm lọc có chip nét đứt **Chưa có ngày · Chưa gắn mảng · Chưa gắn CT · Chưa có tag** (tab Tháng: Chưa ghi phạm vi / hội; Scan: Chưa khai xã) — chỉ hiện khi có mục để trống.
  - Giá trị đang gắn trên file nhưng không còn trong danh mục (mảng, CT, tag cũ) vẫn hiện chip để lọc.
  - **Lọc 1 chương trình (vd HN) ra cả văn bản "Tất cả CT"** (áp dụng mọi CT). Văn bản để trống CT không lẫn vào — xem bằng chip Chưa gắn CT.
  - Hàng lọc nhóm ngắn được xuống dòng — không nhóm nào bị che; chip Chưa có tag đứng đầu hàng tag.
- Sửa nhỏ: văn bản không có ngày không còn hiện chip rỗng trên dòng.

## 3.76 — 07/10/2026 10:00 — Ô gõ chữ: ← → chỉ di chuyển trong ô
- Anh chốt cho an toàn: trong **ô gõ chữ** (tên, ghi chú, số hiệu, trích yếu…) phím **← →** chỉ di con trỏ trong ô, **không nhảy ô** nữa. **Ô chọn** (Xã, Điểm, Ấp, Tổ, Mảng, CT vay…) vẫn dùng ← → qua lại ô, ↑ ↓ chọn. Enter / Tab / Shift giữ nguyên.

## 3.75 — 07/10/2026 09:00 — AP: tự chụp nhanh hơn · hộp sửa bản quét gọn · quy tắc phím chung
- **Tự chụp nhanh, đỡ run tay:** giữ yên **0,5 giây** là chụp (trước 1 giây); app dò khung **10 lần/giây** (trước 5); nới ngưỡng rung tay (lệch khung 2,5% → 4%). Trong lúc giữ yên app nhớ **khung hình nét nhất** để lưu, không lấy khung lúc tay vừa run. Máy hỗ trợ thì bật lấy nét liên tục. Nút **⏱** trên màn chụp đổi **⚡ Nhanh 0,5s / Vừa 0,8s / Chắc 1,2s** (nhớ theo máy).
- **Hộp Sửa bản quét (CCCD và tài liệu) theo kiểu hộp sửa văn bản:** máy tính chia đôi — **trái** ô nhập gọn (Tên · Xã/Điểm/Ấp/Tổ 2 cột · Ghi chú · CT vay và Tag dạng chip nhỏ), nút 📷 Chụp / 🖼 Ảnh nhỏ một hàng; **phải** khung xem bản quét (2 mặt thẻ / các trang, vẫn bỏ · xoay · dời trang được). Lưu + Đóng dính đáy, vừa 1 màn hình. Hướng dẫn dài chuyển thành bong bóng gợi ý trên ô và chữ khi rê chuột vào tiêu đề. Điện thoại: xem ở trên, ô ở dưới.
- **Quy tắc phím chung** (hộp sửa bản quét + hộp sửa văn bản): **Enter / Tab / →** ghi nhận và sang đúng 1 ô kế; **Shift / ←** lùi 1 ô (ô chữ: ← → chỉ nhảy ô khi con trỏ ở đầu / cuối chữ hoặc đang bôi hết, để vẫn sửa chữ được); **↑ ↓** chọn trong ô chọn (lướt qua "+ Gõ giá trị khác…"); **Ctrl+Enter** Lưu. Ô **Xã / Điểm GD / Ấp** còn trống mà sang ô con → báo "Chưa có dữ liệu — chọn … trước", đứng lại; ô tự do trống vẫn cho qua. Chọn Xã / Điểm / Ấp xong con trỏ vẫn ở ô đó.

## 3.74 — 06/10/2026 16:00 — Gom tồn đọng: chép chữ PDF · danh sách lên cao · che dữ liệu khách khi chép sang AI
- **AL — Khung xem PDF chép chữ được:** thêm lớp chữ trong suốt đè lên trang (khung xem bên phải, khung xem lớn, khung cạnh hộp sửa) → **bôi đen, Ctrl+C, chuột phải Chép** như mở PDF thường. Nút **📋** trên thanh khung xem chép cả trang đang xem (nối dòng như chức năng đọc tên). Trang không có chữ (bản chụp / scan) hiện nhãn nhỏ **"Trang ảnh · 🔍 Đọc chữ"** → OCR trang đó, hiện hộp chữ để soát rồi chép. PDF gõ font cũ (TCVN3 / VNI) → báo "chữ dán ra có thể sai dấu". Trình duyệt chặn chép (iPhone sau khi chờ) → hiện hộp chữ để bôi đen / bấm 📋 Chép.
- **AK phần 2 — danh sách lên cao:** bỏ dòng "n kết quả" riêng và khoảng trống dưới hàng lọc; **số kết quả nằm đầu hàng Sắp xếp** (Văn bản, Biểu mẫu, Ghi chú, Tháng dạng danh sách). Chữ "đang lọc …" chỉ hiện khi hàng lọc đang ẩn (hàng lọc đã có ✕ Bỏ lọc). 📂 Ổ G và ☁ Drive thành nút biểu tượng (rê chuột thấy tên), nút hàng Sắp xếp sát lại → khổ 1366 không còn bị che nút Drive. Máy tính lên thêm ~46px, điện thoại ~70px.
- **H (R4) — Chép sang AI có dữ liệu khách:** bảng Excel có cột họ tên / CCCD / điện thoại / địa chỉ hoặc ô có số CCCD, số điện thoại → khung **⚠ cảnh báo** + ô **"Che dữ liệu khách khi chép"** (bật sẵn): họ tên → KH1, KH2…; CCCD, điện thoại → ***; địa chỉ → (đã che); **số tiền, dòng Tổng cộng giữ nguyên**. Bỏ tích thì chép nguyên.
- **I — Cộng thử đọc đúng số kiểu Anh:** `1,234,567` · `1,234,567.5` · `3,000` (bộ đọc Excel hay trả kiểu này) — trước bị đọc thành 1,234 → báo lệch sai. Kiểu Việt `1.234.567,5` vẫn đúng.

## 3.73 — 06/10/2026 11:00 — Bung / thu cây · chế độ gọn
- Hàng Sắp xếp: khi xem **🗂 Nhóm** (năm › tháng) có **⊞** bung hết và **⊟** thu hết.
- **▤ Gọn:** ẩn dòng 2 (tag, CT vay) — mỗi file 1 dòng, nút ✎ 🗑 ⋯ dồn lên cùng dòng, thấy được nhiều file nhất; bấm lại để hiện; app nhớ lựa chọn (mọi tab danh sách file, trừ Theo dõi nợ).

## 3.72 — 06/10/2026 09:00 — Khay chờ: Lưu = duyệt · tag hiện sẵn · gợi ý trên ô · số hiệu tự thêm /
- **File trong khay chờ:** bấm ✎ Sửa, sửa xong **Lưu là duyệt vào tủ luôn** (trước chỉ khi mở từ danh sách Chờ khai).
- **Tag hiện sẵn toàn bộ dạng chip nhỏ** (hộp còn chỗ): đang chọn xanh đứng đầu, tag gợi ý theo nội dung viền xanh lá đứt, rồi tag dùng nhiều; bấm chip chọn / bỏ; ô **＋** cuối hàng gõ để lọc (không dấu), Enter chọn chip khớp hoặc tạo tag mới; Enter khi ô trống sang ô kế.
- **Gợi ý hiện ngay trên ô đang gõ** (bong bóng nhỏ: hướng dẫn + ví dụ); dòng dưới cùng chỉ còn phím tắt.
- **Số hiệu gõ nhanh:** `4336hd nhcs` → `4336/HD-NHCS`, `70qđ hđqt` → `70/QĐ-HĐQT` (tự thêm "/", in hoa, khoảng trắng sau "/" thành "-").

## 3.71 — 05/10/2026 17:00 — 🧰 📋 Chương trình vay + thống nhất danh mục CT
- **Công cụ mới 📋 CT vay** (tab Hôm nay › cột Công cụ):
  - **Đang cho vay (9):** Hộ nghèo, Hộ cận nghèo, Hộ mới thoát nghèo, HSSV, Hỗ trợ tạo việc làm, XKLĐ, NS&VSMT, Nhà ở xã hội, Người chấp hành xong án phạt tù — mỗi dòng: viết tắt · mã · lãi suất · thời hạn · mức cho vay; bấm mở đối tượng, lãi suất theo nhóm, kỳ hạn trả nợ (VB 2174); 📋 Chép tóm tắt. Chép nguyên file "Tóm tắt các chương trình tín dụng chính sách tại PGD Gò Dầu (2025)".
  - **Danh mục mã (32):** mã CT · viết tắt hệ thống · viết tắt app · tên chương trình; chương trình đang cho vay tô xanh; bấm mã để chép. Theo file "Danh mục chương trình vay".
  - Gõ tìm không dấu theo tên, viết tắt, mã, đối tượng, lãi suất.
- **Thống nhất dữ liệu:** bổ sung chương trình còn thiếu **NCHXAPT — Cho vay người chấp hành xong án phạt tù** vào danh mục CT vay (một lần, không sửa mục anh đã có) + từ khóa nhận dạng; Theo dõi nợ nhận đủ **32 mã** chương trình hệ thống (trước 15 mã), tên chuẩn theo danh mục hệ thống; ghép viết tắt app ↔ mã hệ thống.

## 3.70 — 05/10/2026 14:00 — AM văn bản liên quan: số hiệu bấm đi tới
- Dòng danh sách: chip "🔗 1" đổi thành **số hiệu văn bản liên quan** (tối đa 2, dư "+n"; chưa có số thì tên ngắn), rê chuột thấy tên đầy đủ + ngày.
- **Bấm số hiệu → đi tới văn bản đó** (chọn dòng, cuộn tới, mở khung xem). Văn bản đang bị lọc ẩn thì vẫn mở ở khung xem, báo kèm nút **Bỏ lọc**.
- Khung xem: nút **‹ Quay lại** văn bản vừa xem (nhớ 20 bước); link trong dòng thời gian cũng nhớ để quay lại.
- Hộp sửa: chip liên quan rê chuột thấy tên đầy đủ; nút **↗** mở văn bản đó ở khung xem cạnh hộp (hộp giữ nguyên), **↩ Về văn bản đang sửa**.

## 3.69 — 05/10/2026 09:00 — AJ hộp sửa văn bản gọn, hàng lọc gọn
**Hộp sửa / khai văn bản — vừa 1 màn hình máy tính, nhập nhanh theo bước**
- Đầu hộp 2 dòng: **Tên cũ** (gạch mờ, kèm dung lượng · số trang · trạng thái Drive) và **Tên mới** đổi theo từng chữ gõ; nút nhỏ ☆ và 🔍 (đọc lại & gợi ý) luôn có sẵn.
- Thanh **① Nhận dạng · ② Phân loại · ③ Liên quan & lưu** sáng theo ô đang gõ, khối đang gõ viền xanh.
- ① Số · Ngày · Loại 1 hàng; Tên văn bản; **Trích yếu để trống, không chép lại tên** (chỉ ghi thêm ý chính để tìm; trích yếu cũ giữ nguyên).
- ② **Mảng · CT vay · Hiệu lực là ô chọn chung 1 hàng** (CT vay hiện cả tên đầy đủ); **Tag = chip + ô gõ**: đứng vào ô thì dòng 💡 hiện gợi ý bấm được (theo nội dung + gần đây), **↓ mở cả danh sách tag** (dùng nhiều trước, kèm số văn bản), gõ không dấu vẫn ra, "＋ Tạo tag mới"; link Sửa danh sách tag.
- ③ Văn bản liên quan = chip + ô gõ số hiệu; Ghi chú riêng 1 dòng; **Nơi lưu 1 dòng** đủ ✎ · Mặc định · 📂 · ☁ · ↗.
- **Phím:** Enter / Tab sang ô kế · Shift+Enter / Shift+Tab ô trước · ↑ ↓ đổi lựa chọn tại ô và chọn trong gợi ý · **Ctrl+Enter Lưu** · Esc đóng (giữ phần đang điền). Mở hộp: con trỏ ở ô trống đầu tiên.
- Hướng dẫn từng ô gom về **1 dòng 💡** dưới cùng; trong ô có chữ mờ là ví dụ thật. Nhóm Dữ liệu tháng / Ghi chú / Khác cùng đầu hộp, phím, dòng 💡, nơi lưu 1 dòng.
- Sửa lỗi 3.68: đang có nháp mà bấm 🔍 chọn gợi ý thì gợi ý không được điền.
**Hàng lọc — vẫn chip nhưng gọn:** 4 dòng → 2 dòng (Năm · Mảng · CT vay chung 1 dòng, Tag 1 dòng); **bỏ chip "Tất cả"** — bấm chip để lọc (xanh có ✕), bấm lại để bỏ, **✕ Bỏ lọc (n)**; chip kèm số mục; ★ Quan trọng và ẩn ▴ nằm cuối dòng 1; dòng "Đang lọc" không nhắc lại lọc đã thấy trên hàng lọc.
**"Dùng chung" → "Tất cả CT"** ở mọi chỗ hiển thị (hàng lọc, dòng văn bản, hộp sửa, Biểu mẫu, Cài đặt); giá trị lưu và thư mục Drive giữ tên cũ.
**Tìm hiểu viết tắt:** gõ "tiết kiệm và vay vốn" vẫn ra văn bản ghi TK&VV.

## 3.68 — 04/10/2026 15:00 — AF · AD · AE · AG (gom hết tồn đọng)
**AF. Văn bản liên quan** (thay cho vai trò VB chính / sửa đổi / hướng dẫn)
- Bỏ ô Vai trò và nhãn "VB chính", "Sửa đổi", "Hướng dẫn TH"; bỏ ô "Được thay thế bởi". Giữ **Hết hiệu lực**.
- Hộp sửa có mục **🔗 Văn bản liên quan**: gõ số hiệu để thêm (nhiều văn bản), ✕ để gỡ; **liên kết 2 chiều** — văn bản kia tự thấy văn bản này. Văn bản chưa có Mảng / CT vay thì lấy theo văn bản liên quan đầu tiên.
- Khung xem: **🕘 Dòng thời gian** = văn bản đang xem + văn bản liên kết **trực tiếp** (không bắt cầu), xếp theo ngày ban hành; đang xem tô nền, hết hiệu lực gạch ngang; bấm dòng nào mở dòng đó. Văn bản hết hiệu lực: dải đỏ kèm văn bản mới hơn còn hiệu lực trong nhóm liên quan. Sửa luôn lỗi khung xem cắt còn 2 dòng.
- Dòng danh sách: chip **🔗 n**. Danh sách không còn xếp "VB treo dưới VB chính".
- Dữ liệu cũ tự chuyển (khi mở app, khi nhận từ máy khác, khi khôi phục từ Drive): sửa đổi / hướng dẫn / thay thế → liên kết; không mất quan hệ nào. Thuộc tính dự phòng trên Drive: `lq`.
**AD. Hộp nhập** — hộp có ô nhập **không đóng khi lỡ nhấp ra ngoài** (nút Đóng nháy, nhắc); **nút Lưu / Đóng dính đáy hộp**. Bấm Đóng / Esc khi đang điền dở → **giữ nguyên**, mở lại đúng hộp đó còn nguyên (sửa văn bản / khai, hồ sơ hộ, lần làm việc, sửa việc lịch); Lưu thì bỏ nháp. Hộp chỉ xem / thông báo vẫn nhấp ngoài là đóng.
**AE. Hoàn tác** — khung "↩ Hoàn tác" nhỏ ở góc (máy tính), tự tắt sau **3 giây** trên toàn app.
**AG. Nút đầu lịch** — Hôm nay · Danh sách · Tính ngày đổi màu khi rê chuột; nút **Hôm nay mờ khi đang xem hôm nay**, nổi lên khi sang ngày / tháng khác.

## 3.67 — 04/10/2026 11:00 — AH 🖨 Danh sách chi tiết + tổng hợp theo xã, điểm GD
**Theo dõi nợ › 🖨 Danh sách** — hộp 2 lựa chọn, xem trước rồi **🖨 In** (A4 ngang, tiêu đề cột lặp mỗi trang) hoặc **📊 Xuất Excel**.
- **☰ Chi tiết** (danh sách đang xem, đúng lọc: loại · Đang có / Đã ra / Tất cả · nhánh 🌳 · ô tìm): gom **Xã › Điểm GD › Ấp** có dòng cộng từng nhóm + TỔNG CỘNG; trong ấp xếp theo tổ, tên. Cột: STT · Họ tên · Mã KH · Số khế ước · Tổ trưởng · Chương trình · số tiền (dư nợ / dư nợ quá hạn / dư nợ khoanh) · mốc (ngày GD gần nhất + số tháng / ngày chuyển QH + số ngày / ngày hết hạn khoanh) · Trạng thái làm việc · Ghi chú (trống để ghi tay). Excel thêm cột Xã, Điểm, Ấp, Mã tổ để lọc.
- **Σ Tổng hợp theo xã, điểm GD** (anh bổ sung): 3 danh sách cạnh nhau — món · số tiền · chưa làm việc — theo xã, từng điểm GD, tổng PGD; món đang có ở kỳ mới nhất, không theo lọc.

## 3.66 — 04/10/2026 09:00 — AI 🧾 Phiếu thông tin món vay
**Theo dõi nợ › thẻ món › 🧾 In phiếu** — "sơ yếu lý lịch" món nợ xấu, xem trước trong hộp rồi **🖨 In** (A4) hoặc **📄 Ra Word**.
- **Trang đầu tóm tắt (đọc 30 giây):** tên, mã KH, địa chỉ, tổ; ô số chính (dư nợ · quá hạn · khoanh · lãi tồn, ghi kỳ số liệu); nhãn tình trạng (QUÁ HẠN n ngày/tháng · NỢ KHOANH đến … · n THÁNG KHÔNG GIAO DỊCH · đã ra DS · ↻ phát sinh lại · Thất hứa x/y lần); khả năng thu hồi; hướng xử lý; **▶ Việc tiếp theo** (cam kết chưa đánh giá gần nhất → phương án có hạn → lần làm việc gần nhất).
- **Dòng thời gian:** giải ngân, đến hạn, giao dịch gần nhất, vào / ra / phát sinh lại từng danh sách, chuyển quá hạn, khoanh, các lần làm việc, hạn cam kết (✓/✗/chờ) — chỉ dựng từ dữ liệu đã có.
- **I–VI chi tiết:** khách hàng · món vay (+ tình trạng ở 3 danh sách, bảng số dư 12 kỳ gần nhất) · hồ sơ hộ (kèm ngày cập nhật) · quá trình làm việc + tổng đã thu · tài liệu đã có · món khác cùng hộ · nhận xét, đề xuất + ô ký Người lập. Mục trống in "chưa có".
- **🧾 In phiếu (n)** ở thanh Theo dõi nợ: in cả nhánh — các món đang hiện (theo lọc, nhánh 🌳 cây, ô tìm), mỗi món sang trang mới, xếp Xã › Điểm › Ấp › Tổ; trên 40 phiếu thì nhắc chọn nhánh nhỏ hơn.
- **Cam kết giữ / thất hứa:** mỗi lần làm việc có cam kết có nút ✓ Giữ đúng / ✗ Thất hứa (bấm lại để bỏ); nhật ký ghi "Thất hứa x/y lần"; cam kết đã đánh dấu thì Hôm nay thôi nhắc.
- **Hồ sơ hộ thêm mục ⚖ Khả năng thu hồi** (chọn 1: có khả năng / khó / không còn khả năng; bỏ chọn = chưa đánh giá), có lịch sử như các mục khác. *Hướng xử lý* lấy từ mục **Phương án đề xuất** có sẵn (không thêm ô trùng).
- Để sau: danh mục hồ sơ ✓/✗ (% đầy đủ) — chờ anh gửi danh mục giấy tờ chuẩn.

## 3.65 — 03/10/2026 16:00 — AA · AB · AC (quan hệ văn bản, hộp khai, dấu sao)
**AA. Quan hệ văn bản** (anh báo chọn VB chính không chạy — ô chỉ liệt kê văn bản đã đánh dấu "VB chính", kho chưa có nên trống)
- Giữ "VB chính"; thêm vai trò **"VB hướng dẫn thực hiện"** (hướng dẫn thực hiện một QĐ — khác "sửa đổi, bổ sung").
- Ô **"Sửa đổi, bổ sung cho / Hướng dẫn thực hiện văn bản số…"**: gõ số hiệu (vd "70/QĐ") → tìm trong **mọi văn bản của app, mọi loại**; chọn xong văn bản kia **tự thành VB chính**. App không tự đoán.
- Ô "Được thay thế bởi" cũng tìm theo số hiệu. Chuỗi hiệu lực ghi "(hướng dẫn thực hiện)"; dòng danh sách có nhãn "Hướng dẫn TH".
**AB. Hộp khai / sửa văn bản**
- Tên file không còn cắt dở ở 60 ký tự ("…hoạt động của.pdf") → tối đa 110 ký tự, cắt ở ranh giới từ, bỏ từ nối treo cuối (của, và, về…).
- "Hướng dẫn **T**hực hiện…" → "Hướng dẫn thực hiện…": chữ đầu sau tên loại văn bản viết thường (trừ tên riêng, viết tắt: Tổ, Hội, Ngân hàng, UBND, NHCSXH…).
- Ô Trích yếu trống → điền sẵn bản **mở rộng viết tắt** (Tổ TK&VV → Tổ Tiết kiệm và vay vốn, NHCSXH, HĐQT, UBND…) để tìm; giống hệt tên thì để trống.
- Ô Nhóm gọn 1 dòng dưới tên (trước chiếm cả khung).
- Rê chuột vào tên văn bản: chỉ hiện tên đầy đủ, không lặp thêm trích yếu.
**AC. ★ Đánh dấu quan trọng** — bấm ☆ trên dòng văn bản / biểu mẫu (hoặc nút trong hộp sửa); chip lọc "★ Quan trọng · n" ở hàng lọc. Biểu mẫu dùng chung cờ ghim cũ (nhóm "★ Quan trọng" trên cùng) — bỏ nút 📌 trùng việc.

## 3.64 — 03/10/2026 12:00 — ⚠ Theo dõi nợ (đợt 1) + Y
**Thư viện › ⚠ Theo dõi nợ** — 3 danh sách riêng: ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh.
- **📥 Cập nhật tháng:** chọn file sao kê xuất từ hệ thống (trên máy, hoặc file đã lưu ở tab Tháng; chọn được cả 3 file một lần). App tìm bảng có cột "Số khế ước", tự nhận loại theo cột, kỳ theo cột "Ngày báo cáo" hoặc ngày trong tên file / tiêu đề (không đọc được thì hỏi).
  - **Màn xem trước:** số món, tổng tiền · món mới · phát sinh lại · tăng · giảm · giữ nguyên · ra khỏi DS; cảnh báo file cũ hơn kỳ đã nhập; báo nhập lại cùng kỳ.
  - **Lưu vết, không bao giờ xóa:** món nhận theo số khế ước, hộ theo mã khách hàng; lưu số liệu từng tháng; món vắng mặt chuyển "Đã ra khỏi DS", quay lại ghi **↻ phát sinh lại**; nhập lại cùng kỳ thì thay số liệu kỳ đó; file cũ hơn chỉ bổ sung lịch sử.
  - Thử bằng 3 file thật kỳ 31/08/2026 (chỉ trong máy thử, không lưu vào repo): 327 + 54 + 55 món → 393 món, 354 hộ, kỳ nhận đúng.
- **Danh sách** xếp theo nghiệp vụ: 3T KHD theo số tháng không giao dịch (3–6 · 6–12 · trên 12 tháng), lãi tồn, sắp đến hạn; quá hạn — 🆕 mới phát sinh lên đầu, số ngày quá hạn, TK105; khoanh — ⏰ sắp hết hạn khoanh (≤ 6 tháng). Lọc Đang có / Đã ra khỏi DS / Tất cả; tìm tên, mã KH, số KƯ; **🌳 Cây địa bàn** Xã › Điểm › Ấp › Tổ có số món + tổng tiền (địa bàn theo mã trong Cài đặt; nợ khoanh không có cột ấp → suy theo mã tổ).
- **Thẻ món:** số liệu sao kê, lịch sử từng tháng, món này ở danh sách khác, món khác cùng hộ.
- **🗂 Hồ sơ hộ vay** (dùng chung 3 danh sách): người vay & hộ · thừa kế / người trả nợ thay · thực trạng kinh tế · tài sản · sử dụng vốn · nguyên nhân · phương án — chọn nhanh + ghi thêm; ngày cập nhật, nguồn, **lịch sử thay đổi**.
- **Nhật ký làm việc:** ngày, địa điểm (mặc định ấp của khách), hình thức, thành phần, mục 2–5 đúng biên bản (điền sẵn từ hồ sơ hộ), cam kết (số tiền, hạn → **tự lên lịch Hôm nay**), số đã thu, trạng thái.
- **📝 Biên bản Word (.docx)** theo mẫu "Biên bản làm việc" của PGD: điền sẵn tên, địa chỉ, chương trình, ngày vay / đến hạn, nợ gốc / lãi, mục 2–5, ô ký Hội đoàn thể; thành phần để trống. Danh mục mẫu biên bản để thêm mẫu khác sau.
- **Tài liệu của hộ:** 📎 chụp / chọn file (hồ sơ gốc, biên bản đã ký, ảnh, giấy tờ) lên Drive `Theo dõi nợ/<Xã>/<Tên KH – mã KH>`; 🔗 gắn file có sẵn (bản scan ở tab Scan…). **📍 Vị trí nhà:** lấy GPS tại nhà khách hoặc dán link Google Maps → 🧭 Chỉ đường.
- **Hôm nay › ⚠ Cần xử lý:** "Theo dõi nợ: n cam kết đến hạn · n sắp hết hạn khoanh".
- **Lưu trữ:** IndexedDB (không chiếm chỗ localStorage) + đồng bộ Drive `_Hệ thống/theodoino.json` (bản sửa sau thắng, số liệu tháng gộp cả hai máy).

**Y.** Bỏ chữ "đúng công thức file Excel (Sheet2)" ở công cụ Hạn trả HSSV, Hướng dẫn, Có gì mới.

 — 03/10/2026 09:00 — Việc X: gọn phần thời gian học (🎓 Hạn trả HSSV)
- Bỏ nút **Tự chọn** và dòng "Thời gian học". Lý do: nút đoán theo số tháng phát tiền vay, nhưng hướng dẫn phân loại theo **thời gian khóa đào tạo** — SV học 4 năm vay năm cuối (phát tiền vay ~10 tháng) sẽ bị đoán nhầm "đến 12 tháng", thời hạn trả nợ gấp đôi.
- **Ô chọn nhỏ trên dòng tiêu đề**: `🎓 Hạn trả HSSV [Trên 12 tháng ▾] … 📋 Chép · 📝 · Đóng (Esc)`; mặc định Trên 12 tháng, mỗi lần mở lại công cụ về mặc định.
- Chọn **Đến 12 th · Y khoa** → ô đổi **màu cam** + dòng lưu ý cam dưới tiêu đề; **không bật hộp**.
- Để Trên 12 tháng mà phát tiền vay ≤ 12 tháng → chỉ hiện dòng lưu ý cam trong kết quả ("nếu khóa học dài trên 1 năm thì giữ nguyên…").
- Nút ghi to-do rút còn 📝 để tiêu đề vừa 1 dòng; phần kết quả thêm ~30 px.

 — 03/10/2026 06:00 — Gói U · V · W (khung xem, danh sách mỏng, cột Công cụ)
**U. Khung xem rộng tối đa**
- Khung xem bên phải (máy tính) kéo sát dải trạng thái dưới cùng; đầu khung, thanh công cụ, hàng nút Gửi cả file · In · Sửa thấp lại.
- File 1 trang: bỏ cụm lật trang (⏮ ‹ 1/1 › ⏭), bỏ ô tích chọn trang và nhãn "Trang 1/1".
- Bản scan CCCD (thẻ): hiện thẳng **2 mặt thẻ vừa khung** thay cho cả trang A4 (thẻ to hơn nhiều). Không có ảnh trong máy thì vẫn xem bản PDF như cũ.
- **Cầu nối:** bỏ dòng nhắc "Mở thẳng file trên máy… Cài cầu nối" dưới khung xem. Máy tính chưa cài chỉ còn nút nhỏ 🖥 Mở máy; bấm (hoặc 📋 Copy bản scan) mới hiện hộp "Máy này chưa cài cầu nối" [⬇ Tải bộ cài · Mở thử · Để sau (không nhắc nữa) · Đóng (Esc)]. Cài rồi (Mở thử → "Có, đã thấy") hoặc "Để sau" thì không nhắc gì nữa. Trình duyệt không cho tự dò máy đã cài hay chưa, nên dựa vào lần xác nhận Mở thử (như 3.49).

**V. Dòng danh sách mỏng hơn, không bớt chữ** (máy tính)
- Đo khổ 1366×768: Văn bản 76,8 → 53,9 px/dòng (−30%), thấy 4 → 6 dòng; Scan 75,2 → 56,4 px/dòng (−25%), thấy 5 → 7 dòng. Khổ 1920×1080: 9 → 13 dòng.
- Bớt khoảng đệm, nút dòng 22 px, nhãn gọn.
- Tên file không còn bị cắt ở 56% bề ngang khi đã ẩn chữ mờ trích yếu → tên dài hiện đủ hơn.
- Điện thoại giữ như cũ.

**W. Tab Hôm nay: lịch 70% + cột 🧰 Công cụ**
- Lưới lịch thu còn 70% (ô gần vuông, vẫn đủ ngày âm, chấm việc); 30% còn lại là cột nút Công cụ. Bấm → ô công cụ mở ngay dưới lịch, cao vừa tới đáy màn hình; Đóng (Esc) / bấm lại để đóng. Điện thoại: hàng nút trên lịch, ô mở thành hộp.
- Khung dùng chung: mỗi công cụ là một mục đăng ký → thêm công cụ sau không sửa bố cục. Công cụ 3, 4, 5 để sẵn ("đang chuẩn bị").
- **① 🎓 Hạn trả HSSV** — đúng công thức file Excel Sheet2 anh dùng (Phòng Tin học gửi PGD):
  - Trên 12 tháng: hạn cuối = EDATE(ra trường + số ngày phát tiền vay, 12); đến 12 tháng / Y khoa: EDATE(ra trường, tháng × 2 + 12). Tháng = DATEDIF "M".
  - Hạn cuối theo ngày GDX: hạn ≤ ngày GDX cùng tháng → ngày GDX tháng trước (trùng ngày thì lùi 1 tháng — anh chốt); ngày GDX 29–31 ở tháng thiếu → ngày cuối tháng (Excel nhảy sang tháng sau, có thể vượt hạn).
  - Thời hạn cho vay (tháng, tính từ món vay đầu) = tháng × 2 + 12 (trên 12 tháng) · × 3 + 12 (đến 12 tháng / Y khoa).
  - Kỳ trả 12 tháng/lần: kỳ đầu = ra trường + 12 tháng; kỳ cuối = hạn cuối theo GDX; mọi ngày đưa về ngày GDX. Tiền anh gõ theo triệu, chia đều, làm tròn xuống trăm nghìn, dư dồn kỳ cuối.
  - Bảng 1 dòng giống cột Excel + **câu chốt** ("Số tiền vay … đồng, thời hạn … tháng, hạn cuối …, trả … đồng/lần, lần 1: …") bấm là chép; 📝 ghi vào to-do; ▸ Các kỳ trả; ▸ Cách tính từng bước có số thật + tự kiểm ✓/⚠.
  - Ngày GDX gõ tay, app nhớ lần trước. Không xét tại ngũ, không xét khoản vay trước 01/01/2025 (anh chốt).
  - Kiểm: khớp mọi số Sheet1, Sheet2 (04/08/2032 → 25/07/2032, 70 tháng; 15/09/2024 → 10/09/2024; 20/04/2019 → 10/04/2019).
- **② 🗺 Địa bàn** — cây Xã (mã) › Điểm GD (mã · ngày GD) › Ấp/KP (mã · số tổ), xếp theo mã; ô tìm tên / mã không dấu; bấm mã để chép; 📋 Chép bảng (dán Excel); ✎ Sửa danh mục → Cài đặt › Địa bàn. Lấy đúng danh mục đã khai, không thêm dữ liệu.

**Rà lại**
- Thanh Sắp xếp · Danh sách/Nhóm · Khung xem · Ổ G · Drive (tab Văn bản) vẫn xuống 2 hàng ở khổ 1366 dù 3.61 đã sửa (quy tắc CSS khác đè) → nay 1 hàng, hẹp thì vuốt ngang.
- Rà mọi lời gọi phần tử theo id: các chỗ còn lại đều có kiểm tra tồn tại, không gây lỗi.

## 3.61 — 02/10/2026 08:00 — Gói tinh chỉnh L–T (anh dùng thử, gom một lượt)
**S. Sửa 3 lỗi đọc tên (do 3.53)**
- Luật "ban hành kèm theo Quyết định số … ngày …" chỉ áp khi tiêu đề là QUY CHẾ / QUY ĐỊNH / ĐIỀU LỆ. Trước: hướng dẫn 4336/HD-NHCS bị lấy nhầm số 70/QĐ-HĐQT.
- Số hiệu, ngày chỉ tìm ở các dòng **trước dòng V/v**. Trước: công văn 4339 bị lấy ngày 27/8 của QĐ được nhắc trong V/v.
  - Dòng V/v dính chung dòng địa danh-ngày ("… Gò Dầu, 11-09-2026") → vẫn lấy đúng ngày có dấu phẩy địa danh; trích yếu bỏ phần địa danh-ngày.
- Trích yếu V/v dài 2–3 dòng được nối đủ.
- Nhận ra lớp chữ PDF **lỗi font** ("NQI DUNG… LA4P… DO!") → không dùng làm trích yếu, lấy theo tên file, ghi "⚠ chữ trong PDF bị lỗi font". Viết tắt QĐ, HĐQT không bị nhận nhầm là lỗi.

**L. Nút "Đóng (Esc)" / "Thôi (Esc)" toàn app** — bấm Esc làm đúng việc của nút đó.
- Nút đóng trong mọi hộp tự ghi "(Esc)".
- Màn có thanh bước (‹ Lùi) thì Esc = Lùi, chỉ gắn nhãn cho nút cùng việc.
- Cài đặt, khung xem lớn: "Đóng (Esc)".

**N · P. Tab Scan**
- **Mỗi bản 2 dòng:**
  - Dòng 1: ☐ · tên · ấp · tổ ······ ngày · nút 🖨 ✎ 🗑.
  - Dòng 2: **✓ Đạt** hoặc **⚠ thiếu gì** · nơi lưu rút gọn từ cấp Xã (bấm mở thư mục, rê chuột thấy đủ) · nhãn.
- **Đạt** (anh chốt) khi đủ 4 điều: tên khách (không phải tên tạm) · đủ 2 mặt (tài liệu ≥ 1 trang) · đủ Xã › Điểm › Ấp › Tổ · đã lên Drive đúng thư mục tổ.
- Chip **⚠ Chưa đạt (n)** để lọc.
- **☰ Danh sách** (mặc định, mới lưu lên trước), nhóm **Ngày / Tuần / Tháng**, đầu nhóm ghi số bản · đạt · chưa.
- **🌳 Cây địa bàn** Xã › Điểm › Ấp › Tổ có đếm và số chưa đạt; bấm nhánh để lọc; nhánh riêng "Chưa khai địa bàn".

**O. Scan (máy tính): bấm một bản → xem ở khung bên phải trước** (ghi trạng thái Đạt / thiếu gì).
- ⛶ mở màn Lưu & gửi đầy đủ.
- Các nút Gửi / In / Sửa dưới khung làm đúng cho bản quét.
- Điện thoại vẫn mở khung lớn.

**Q. Danh sách gọn ở mọi tab**
- Nút cuối dòng 28px.
- Chữ mờ sau tên (trích yếu) bỏ khi đã nằm trong tên, rê chuột vẫn thấy.
- Chờ khai: đường dẫn gộp vào dòng 2 (từ 3 dòng còn 2).
- Thanh Sắp xếp một hàng (máy tính).

**R. Chi tiết / Sửa văn bản: văn bản hiện ngay bên cạnh.**
- Máy tính: trái là ô nhập (một cột), phải là văn bản — lật trang, phóng to.
- Điện thoại: văn bản ở trên, thu gọn được.
- Bảng so sánh "🔍 Đọc lại" cũng vậy.

**T. Mẫu gợi ý ô nhập:** chữ mờ mẫu trong ô + dòng 💡 hướng dẫn khi bấm vào ô (số hiệu, ngày, trích yếu, kỳ, tên khách, biểu mẫu, việc lịch…).

**M. Biểu mẫu: gửi nhiều mẫu một lần**
- Ô ☐ ở mỗi dòng.
- Thanh dính trên cùng: `Đã chọn N mẫu (bộ …) · 📤 Gửi N file · 🗜 Nén .zip · 🖨 In cả bộ · Bỏ chọn`.
- Điện thoại: chia sẻ cả N file một lần (Zalo). Máy tính: Nén .zip.
- 📚 Bộ biểu mẫu › **📤 Chọn cả bộ để gửi**.
- Tên zip `Bieu mau - <tên bộ> - dd-mm-yyyy.zip`; tên tiếng Việt bên trong giữ đúng; trùng tên tự thêm (2).
- **Không sửa cầu nối** (không phải cài lại): máy tính gửi nhiều file bằng .zip.

---

## 3.60 — 01/10/2026 10:00 — Giữ nút Đóng · Chữ ký·CCCD bước Lưu cùng bố cục với Scan
- **Scan · Lưu & gửi:** trả lại nút **Đóng** ở cuối hàng nút chính (anh chốt giữ).
- **Chữ ký · CCCD · bước ③ Lưu** làm cùng kiểu với Scan:
  - **Dòng đầu:** tên file · dung lượng · trạng thái Drive, gộp một hàng.
  - **Ảnh vừa lưu** hiện lớn ở giữa. Trước bước này không có ảnh xem lại.
  - **Một hàng nút:** 📋 Copy + 💾 Lưu nhanh (máy tính) / 📤 Gửi (điện thoại) · ✍ Chữ ký · 🪪 CCCD (chụp tiếp khách khác) · ⋯ · Đóng.
  - **⋯ gom:** 📂 Mở thư mục trên máy (có cầu nối) · ☁ Mở thư mục Drive · 🗑 Xóa · cài đặt Lưu nhanh.
  - Nút "Xong" đổi tên thành **Đóng** cho thống nhất (vẫn về danh sách Chữ ký · CCCD).

---

## 3.59 — 01/10/2026 08:00 — Scan · Lưu & gửi: sắp nút theo luồng, vùng xem CCCD lớn nhất
- **Dòng đầu gộp một hàng:** tên người · trạng thái Drive · ô tên file. Trước chiếm 3 dòng: tiêu đề, trạng thái, nhãn + ô tên file.
- **Vùng xem trước** chiếm toàn bộ phần còn lại.
- **Một hàng nút chính** dính dưới đáy, theo luồng: **🖨 In · 📋 Copy (máy tính) / 📤 Gửi (điện thoại) · 💾 Lưu nhanh (máy tính) · ＋ In chung · ⋯**.
  - Trước là 3 hàng: Lưu nhanh / Copy / Xem trong tab → dòng cài đặt Lưu nhanh → In / Drive / Khai / Xóa / Đóng → dòng In chung.
- **⋯ gom việc ít dùng:** 👁 Xem trong tab (hoặc Xem nhanh · Mở thư mục khi có cầu nối) · ☁ Lên Drive / Mở trên Drive · ✎ Khai đầy đủ · 🗑 Xóa · cài đặt Lưu nhanh (thư mục, chia theo tháng, tự lưu).
- **Bỏ nút "Đóng"** — trùng với "‹ Về danh sách" và phím Esc.
- Không bỏ chức năng nào khác; chỉ dời vào ⋯.

---

## 3.58 — 30/09/2026 21:00 — In nhiều CCCD đơn giản hơn: tích ☐ ở danh sách
- **Anh báo:** nút "＋ Chọn thêm CCCD" của 3.57 khó dùng. Đã bỏ khung chọn trong popup, thay bằng cách chọn ngay trên danh sách.
- **Danh sách tab Scan:** mỗi dòng có ô ☐ rõ ràng (trước phải bấm vào biểu tượng 🪪 nhỏ).
  - Tích nhiều người → thanh dính trên cùng: `Đã chọn 4 bản · 1 trang A4 [🖨 In 4 người] Lưu PDF · Lên Drive · Bỏ chọn`.
  - Chưa đủ 4 người thì ghi "còn trống N chỗ".
- **Đang mở 1 bản** (bước ③ hoặc bấm vào một dòng) → nút **＋ Chọn thêm người để in chung**.
  - Bấm → về danh sách, bản đó đã tích sẵn → tích thêm → 🖨 In.
- Lưu vẫn mỗi người một bản như cũ.

---

## 3.57 — 30/09/2026 19:00 — In ghép CCCD cho đủ 4 người / trang A4
- **Lưu vẫn từng người một bản** như trước (quét nhiều người thì tự tách mỗi người một bản).
- **Bước ③ Lưu & gửi** (và khi mở một bản CCCD đã lưu) có thêm dòng: `🖨 Trang in: 1 người · trang cuối còn trống 3 chỗ [＋ Chọn thêm CCCD để in]`.
  - Bấm → danh sách CCCD đã lưu. **Cùng tổ, cùng ấp** lên đầu, rồi mới nhất trước. Có ô tìm theo tên, ấp, tổ.
  - Tích thêm người → dòng đếm cập nhật, ví dụ "4 người (ghép thêm 3) · đủ 1 trang A4".
  - Bấm **🖨 In 4 người** (hoặc nút 🖨 In) → dựng trang in chung, 4 người mỗi A4.
  - Bản quét ở máy khác (ảnh không có trong máy này) hiện mờ, không chọn được.
- **Chỉ ghép khi IN.** Gửi, Lưu nhanh, Copy, Lên Drive, Khai, Xóa vẫn chỉ áp cho bản đang mở — không đụng bản ghép thêm.
- Cách cũ vẫn dùng được: ở danh sách tab Scan chọn nhiều bản rồi bấm In ghép A4.

---

## 3.56 — 30/09/2026 17:00 — Nút 🗑 Xóa trong danh sách Chờ khai
- Mỗi file trong **Chờ khai** có thêm nút **🗑 Xóa** cạnh nút Khai. File không cần thì bỏ luôn, không phải khai.
- Theo quy tắc chung: file vào thùng rác, có ↩ Hoàn tác.
  - File ở **khay** (chưa vào tủ): Hoàn tác trả về đúng khay.
  - Khôi phục từ thùng rác thì vẫn vào tab như cũ.

---

## 3.55 — 30/09/2026 16:00 — Nút ↶ Hoàn tác kiểu Word ở dòng tiêu đề sổ
- **Nút ↶ Hoàn tác** chuyển lên cùng dòng tiêu đề "TO-DO LIST", dạng nút biểu tượng như Word, có số bước nhỏ (↶¹).
  - Không còn gì để hoàn tác thì nút mờ đi.
  - Ctrl+Z vẫn dùng được.
  - Chế độ Note màu cũng có nút này.
- **Số "1/3 xong"** chuyển lên cùng dòng tiêu đề (thay chữ "Ghi chép trong ngày"). Bỏ hẳn dòng dưới danh sách, nhường chỗ cho việc.
- **Điện thoại:** tiêu đề sổ không còn gãy chữ "TO-DO / LIST". Các nút Dòng / Note màu / kiểu chữ xuống hàng thứ hai.
- Rà các chỗ khác: nút Hoàn tác cố định chỉ có ở sổ Hôm nay. Chỗ khác dùng nút ↩ Hoàn tác trên thông báo (hiện 7 giây sau khi xóa) — giữ nguyên.

---

## 3.54 — 30/09/2026 14:00 — Chờ khai thành chip bên phải dòng "+ Thêm file" · nút tab Văn bản cùng cỡ các tab
- **Dải vàng Chờ khai bỏ.** Thay bằng chip vàng `📥 4 chờ khai ›` ở bên phải dòng "+ Thêm file", cạnh số đếm của tab.
  - Tab Văn bản đếm tất cả file chờ khai.
  - Tab Tháng, Biểu mẫu, Scan chỉ đếm phần của tab đó.
  - Bấm chip → mở danh sách Chờ khai. Rê chuột lên chip → xem chia theo nhóm.
- **Điện thoại:** chip ghim ở mép phải dòng nút (dòng vuốt ngang vẫn thấy chip). Số đếm ẩn trên điện thoại cho gọn.
- **Nút tab Văn bản** trước cao 38 px (quy tắc CSS cũ `.nam button`), nay 34 px, cùng chữ đậm như các tab khác.

---

## 3.53b — 30/09/2026 11:00 — Sổ ghi chú kéo dài sát thanh đáy
- Máy tính: sổ ghi chú (và cột lịch bên trái) kéo dài xuống sát thanh đáy mới — dùng phần chỗ vừa tiết kiệm được. Khổ 1366×850 sổ cao thêm khoảng 40 px.
- Chiều cao tính theo màn hình thật (`canCaoSo`), tự chỉnh khi đổi cỡ cửa sổ.

---

## 3.53 — 30/09/2026 10:00 — Đọc số hiệu đúng phần đầu văn bản · Hôm nay gọn · thanh đáy chỉ còn chip hệ thống · 💾 bộ nhớ máy

**1. Đọc văn bản (anh chốt quy tắc)**
- **Lỗi:** thẻ chờ khai quy chế Tổ TK&VV ra `2002/NĐ-CP · 04/10/2002`. App lấy nhầm từ dòng *"Căn cứ Nghị định số 78/2002/NĐ-CP ngày 04/10/2002"*, trong khi tên file đúng là `70 QĐ-HĐQT · 24/07/2026`.
- **Số hiệu, ngày chỉ lấy ở phần đầu** — các dòng trước tiêu đề (QUYẾT ĐỊNH, QUY CHẾ…), trước "Căn cứ / Kính gửi / Điều 1":
  - ưu tiên dòng "Số: …";
  - ngày lấy theo dòng "…, ngày … tháng … năm …".
  - Bỏ hẳn bước "tìm trên cả trang".
- **Văn bản ban hành kèm** (quy chế, quy định, điều lệ): số, ngày lấy ở dòng *"(Ban hành kèm theo Quyết định số … ngày …)"* ngay dưới tiêu đề.
- **Trích yếu:** dòng V/v (công văn) → tiêu đề + dòng ngay dưới (quyết định, quy chế). Không còn lấy nhầm dòng in hoa như "HỘI ĐỒNG QUẢN TRỊ".
- **Phần đầu không đọc được** → lấy theo tên file, thẻ đánh dấu chưa chắc. **Khác tên file** → thẻ ghi "⚠ tên file ghi số …".
- Áp dụng cho: thêm file, 🔍 Đọc lại & gợi ý tên, đọc lại mục thiếu.

**2. Tab Hôm nay gọn hơn**
- **Cần xử lý** gom 1 dòng: `⚠ Cần xử lý 📥 1 chờ khai · 📊 Thiếu 3 BC · còn 2 ngày GB ▾`.
  - Bấm chip thì đi thẳng tới việc đó. Bấm ▾ mở thẻ đầy đủ, ▴ thu lại. App nhớ trạng thái mở / thu.
- **Vừa xem gần đây** thu 1 dòng, bấm để mở.
- **"Hôm qua còn N việc"** thành 1 dòng mảnh, có nút "→ Hôm nay".
- **Dòng To-do** chỉ 1 dòng (chữ dài bị cắt).
  - Chạm vào dòng: hiện đủ chữ và dòng 2 có chấm màu. Máy tính rê chuột cũng hiện chấm màu.
  - Các nút 📎 🕘 ↑ ↓ ✕ hiện sẵn.
  - Điện thoại ẩn giờ khi chưa chạm.

**3. Thanh đáy**: 1 dòng thấp (~27 px), chỉ chip hệ thống, nhiều thì vuốt ngang.
- **Drive:** 🟢 đã nối · giờ đồng bộ / 🟡 bấm nối lại / 🔴 mất mạng / ⚪ chưa cài.
- **☁ N chưa lên Drive:** thay dải vàng nổi trên cùng. Bấm → hàng đợi, hoặc nối Drive rồi đẩy lên.
- **⚠ N lỗi đẩy lên:** bấm → hàng đợi.
- **💾 Bộ nhớ máy** (luôn hiện, xanh / vàng / đỏ theo mức 60% / 80%). Bấm vào xem:
  - dung lượng chia theo loại;
  - số file chưa lên Drive, kèm ☁ Đồng bộ ngay;
  - 🔒 Xin giữ dữ liệu lâu dài;
  - Thùng rác, Dọn kho.
- Bỏ "N việc cần xử lý" khỏi thanh đáy.

**4. Số đếm của tab** chuyển lên cùng dòng nút "+ Thêm file", ví dụ `123 văn bản`. Đang lọc thì ghi `12 / 123 văn bản`. Khay chờ duyệt giữ số ở thanh đáy.

---

## 3.52b — 29/09/2026 20:00 — Bỏ nút 📷 nổi trên điện thoại
- iPhone: nút tròn nổi ở góc phải đè lên nội dung. Chạm gần góc phải (✕, ô chọn, nút Thêm) là máy ảnh tự mở → **bỏ nút nổi** (anh báo).
- Chụp nhanh dùng nút 📷 ở ô gõ dưới cùng sổ, trên điện thoại làm to hơn cho dễ bấm.

---

## 3.52 — 29/09/2026 18:00 — Tab Hôm nay: 📷 chụp nhanh, 📎 gắn file vào việc, ✎ sửa việc SCHEDULE

**1. 📷 Chụp nhanh một chạm**
- Ô gõ đáy sổ có nút 📷.
- Bấm là mở camera sau. Chụp xong app tự tạo dòng "📷 Ảnh 14:32" của ngày đang chọn, kèm ảnh.
- Muốn ghi thêm thì bấm vào chữ mà gõ.
- Ở chế độ Note màu, ảnh thành một mẩu mới.

**2. 📎 Gắn file vào từng dòng To-do hoặc mẩu Note**
- Ba cách gắn:
  - 📷 chụp thêm;
  - 📁 chọn file trong máy;
  - 🔗 file có sẵn trong tủ (chỉ liên kết, file gốc giữ chỗ cũ).
- Ảnh hiện thành ô nhỏ dưới dòng. Bấm vào để xem lớn, vuốt hoặc bấm ‹ › để qua lại, có ⬇ Tải về. File khác bấm vào để xem thử.
- ✕ trên file:
  - file liên kết chỉ gỡ, có ↩ Hoàn tác;
  - file riêng vào thùng rác, ngăn **📅 Hôm nay**.

**3. Dung lượng**
- Ảnh tự thu nhỏ: cạnh dài 1600 px, JPEG. Đo giả lập: ảnh 1,7 MB còn khoảng 300 KB.
- Danh sách chỉ nạp ảnh nhỏ (240 px).
- File không phải ảnh mà trên 15 MB thì app hỏi trước khi gắn.
- File lưu trong máy và lên Drive ở `Tủ hồ sơ / Nhật ký / YYYY-MM`.
- `lich.json` chỉ ghi tên và mã file, nên vẫn nhẹ.
- Máy thứ hai tải ảnh từ Drive một lần rồi giữ ảnh nhỏ trong máy.

**4. Xóa**
- Xóa dòng hoặc mẩu có ảnh: cả dòng lẫn ảnh vào thùng rác, ngăn 📅 Hôm nay.
- Khôi phục thì về đúng ngày. ↶ Hoàn tác (Ctrl+Z) vẫn dùng được.
- Xóa hẳn thì ảnh bị xóa trong máy và trên Drive.
- Lập chỉ mục và Quét rác coi file `Nhật ký` là file của app, không báo nhầm là rác.

**5. ✎ Sửa việc SCHEDULE**
- Bấm một việc rồi chọn ✎ Sửa, hoặc nhấp đúp vào việc.
- Sửa được tên, ngày, lặp lại, lưu ý. Có ↶ Hoàn tác.

**6. Điện thoại:** hàng nút của dòng To-do (màu, 📎, 🕘, ↑↓, ✕) xuống dòng riêng. Trước đây chữ của việc bị ép chỉ còn 1–2 chữ.

**7. Sửa lỗi có từ 3.50**
- Biến hoàn tác của thông báo "↩ Hoàn tác" trùng tên với ngăn hoàn tác của sổ Hôm nay.
- Hậu quả: sau khi xóa một file, tick xong hoặc xóa dòng ở Hôm nay có thể lỗi tới khi tải lại trang.
- Đã tách riêng: `BAO_HT` và `HOAN_TAC`.

**8. Hướng dẫn:** có thêm mục ❓ **📅 Hôm nay**. Đang ở tab Hôm nay bấm ❓ là mở đúng mục này. "Có gì mới" đã cập nhật.

Cài đặt › Bảo trì kho giữ nguyên (anh chốt).

---

## 3.51 — 29/09/2026 12:00 — Mở PDF nhanh · 📁 Bộ hồ sơ trong Thư viện · sửa Chữ ký·CCCD không lưu trong máy

**1. Mở PDF nhanh hơn** (đo trên giả lập)
- Mở lần đầu: 1,6 giây → 0,23 giây. Mở lại file vừa xem: 0,6 giây → 0,02 giây.
- Cách làm:
  - bộ đọc PDF khởi động sẵn sau 3 giây mở app;
  - giữ 6 file vừa xem;
  - rê chuột lên dòng là tải trước;
  - vẽ từng trang nối nhau, trang 1 hiện trước;
  - không vẽ lại cả danh sách khi chọn file.
- File trên Drive chưa có trong máy: hiện "☁ Đang tải từ Drive…".

**2. 📁 Bộ hồ sơ** — Thư viện thành nơi ghi chú tự do theo từng bộ (ví dụ "Rủi ro · Võ Văn Cường").
- Mỗi bộ có:
  - loại;
  - khách;
  - địa bàn Xã → Điểm GD → Ấp/KP → Tổ, còn **Hội tự lấy theo tổ**;
  - ghi chú tự lưu;
  - danh sách file.
- **🔗 Gắn file có sẵn** (Văn bản, Dữ liệu, Biểu mẫu, Scan, Chữ ký·CCCD): chỉ liên kết, file gốc giữ chỗ cũ.
- **📎 Thêm file mới** (giấy chứng tử, ảnh…): lên Drive ở `Tủ hồ sơ / Bộ hồ sơ / <tên bộ>`.
- Mỗi file hiện đường dẫn thật và bấm để xem thử. Khi xem một file ở tab bất kỳ có dòng "📁 Thuộc bộ …" để mở bộ.
- **Cây địa bàn** Xã › Điểm › Ấp › Tổ · Hội có đếm số bộ; bấm để lọc; có lọc theo Hội.
- Xóa bộ hoặc file riêng → thùng rác ngăn **📁 Bộ hồ sơ**. Gỡ file gắn → chỉ bỏ liên kết, có ↩ Hoàn tác.
- Đồng bộ 2 máy qua chỉ mục như các tab khác.

**3. Thư viện bỏ phần Bảo trì kho** (trùng với 🧰 Dọn kho). Tóm tắt sức khỏe kho chuyển lên đầu trang Dọn kho. Cài đặt › Bảo trì kho vẫn còn lối dẫn sang Dọn kho.

**4. Sửa lỗi:** Chữ ký·CCCD trước đây không lưu trong máy. Tải lại trang mà chưa đồng bộ Drive thì mất khỏi danh sách. Nay đã lưu.

**5. Hướng dẫn ❓ Thư viện** viết lại theo Bộ hồ sơ; "Có gì mới" cập nhật.

---

## 3.50b — 28/09/2026 — Đường dẫn dưới mỗi dòng Scan và Chữ ký·CCCD
- Mỗi bản scan và mỗi ảnh Chữ ký·CCCD hiện dòng "📂 Tủ hồ sơ / …" ghi nơi đang lưu thật.
- Bấm vào dòng đó để mở thư mục Drive. Nếu chưa lên Drive, dòng ghi "chỉ trong máy".

---

## 3.50 — 28/09/2026 22:00 — 🧰 Dọn kho · thùng rác chia ngăn · Lập chỉ mục theo thư mục · xem thử mọi file · Chữ ký·CCCD dùng màn chỉnh Scan · Esc/Lùi/Tiếp · ❓ Hướng dẫn

**1. Xóa & Thùng rác — một quy tắc** (anh chốt)
- **Cứ xóa là vào thùng rác**, kể cả bản scan và Chữ ký · CCCD.
  - Ảnh giữ trong máy tới khi xóa hẳn; file Drive dời vào `_ThungRac`, khôi phục thì dời về đúng thư mục cũ.
- **Không hỏi mức nữa.** Xóa xong có nút **↩ Hoàn tác** trên thông báo.
- Hai chỗ xóa: 🗑 cuối mỗi file · **🗑 Xóa file** ở đầu tab (xóa nhiều file một lần).
- **Thùng rác chia ngăn** theo tab: Văn bản · Dữ liệu tháng · Biểu mẫu · Thư viện · Scan · Chữ ký·CCCD · Khác.
  - Dòng đầu ghi rõ bao nhiêu file, ở ngăn nào.
  - Khôi phục về đúng tab.
  - **Làm trống ngăn** hoặc **Làm trống cả thùng**.
  - Nút bật/tắt **Tự xóa hẳn rác cũ hơn 30 ngày** (mặc định tắt).
- Đồng bộ 2 máy: xóa / khôi phục scan, Chữ ký·CCCD ở máy này thì máy kia theo (so giờ sửa).

**2. 🧰 Dọn kho** — nút trên thanh trên cùng, cạnh 🗑. **Thay hẳn Bảo trì kho**: Cài đặt và Thư viện chỉ còn lối dẫn sang.
- Trang nằm ở **cột trái**; bấm tên file bất kỳ là **xem thử ở khung phải**; điện thoại mở khung xem lớn.
- 4 phần:
  - **🗑 Thùng rác**;
  - **🗂 Lập chỉ mục** (thay tên "Quét tủ");
  - **🧹 Quét rác**;
  - **⋯ Khác**: Picker kho cũ, đẩy / lấy chỉ mục, nhờ AI.
- **Lập chỉ mục** xác định tab của file theo thứ tự: dấu app ghi trên file → **thư mục chứa file** → tên / nội dung.
  - Thư mục được nhận: Văn bản · Dữ liệu tháng/năm/Tn (lấy **kỳ** từ thư mục) · Biểu mẫu/nhóm · Ghi chú · CCCD/xã/điểm/ấp/tổ (lấy **địa bàn**) · Hồ sơ scan/Chưa khai · Chữ ký - CCCD/tháng · `_ThungRac` → thùng rác.
  - Chỗ khác → khay chờ (ghi "chưa rõ phần").
  - Kết quả chia theo tab, có "nằm khác thư mục của tab" và "mất file".
  - **Sửa lỗi:** trước đây file scan / Chữ ký·CCCD mất dấu bị nhận nhầm thành Văn bản.
- **Quét rác** gộp "Gom file trùng nội dung" và "Bảng lập chỉ mục" (đọc lại mục thiếu, dọn mục trùng). Các nhóm:
  - B. Không có dữ liệu;
  - C. Thiếu thông tin: Sửa / Đọc lại / Đọc lại tất cả;
  - D. Trùng: chọn bản giữ;
  - E. Thư mục trống.
  - File chưa có chỉ mục không còn tính là rác — app nhắc chạy Lập chỉ mục.
  - Dọn là vào thùng rác, có ↩ Hoàn tác.

**3. Đường dẫn thật + xem thử ở mọi danh sách** (Thùng rác, Chờ khai, Lập chỉ mục, Quét rác)
- Dưới tên file luôn có đường dẫn:
  - ☁ `Tủ hồ sơ / …`;
  - 💻 chỉ trong máy;
  - 📥 khay chờ (+ file gốc);
  - ☁ `_ThungRac · trước ở …`.
- **Sửa "Chờ khai có file không xem được":**
  - dòng Chờ khai bấm được để xem;
  - **Excel xem dạng bảng**, **Word (.docx) xem phần chữ**;
  - file từ kho cũ (chỉ có trên Drive) tự tải về;
  - nhận PDF theo nội dung, không chỉ theo đuôi tên.
  - Word cũ `.doc` vẫn cần 🖥 Mở máy.

**4. Chữ ký · CCCD dùng đúng màn chỉnh tay của Scan** (màn chỉnh bên Scan giữ nguyên)
- Kéo 4 góc tự do có kính lúp, kéo cạnh, Tự tìm lại, Lấy cả ảnh, 📐 Làm thẳng, ⟲ Trái / ⟳ Phải / ⇅ Lật.
- CCCD nắn về đúng tỉ lệ thẻ; chữ ký nắn theo khung anh kéo.
- Giữ nguyên: tên nhanh, 3 mức nén (< 200 KB), chữ ký nền trắng nét đậm, Lưu nhanh / Copy / Gửi.

**5. Lùi / Tiếp và phím Esc thống nhất**
- Mọi bước Scan và Chữ ký·CCCD có thanh `‹ Lùi · ① ② ③ · Tiếp ›`; bấm số bước đã qua để quay lại.
- **Esc = lùi 1 cấp** ở mọi nơi: màn kéo góc → hộp đang mở (bước ② về ①…) → khung xem lớn → chế độ chọn xóa → Chờ khai / Dọn kho.
- **Enter = Tiếp** ở các bước Scan.

**6. ❓ Hướng dẫn trực quan**
- Nút ❓ trên thanh trên cùng; nút ❓ ở đầu mỗi tab, Dọn kho, 📁 Chữ ký·CCCD.
- 11 phần: Tổng quan (sơ đồ luồng dữ liệu), Văn bản, Tháng, Biểu mẫu, Thư viện, Scan, Chữ ký·CCCD, Xóa & Thùng rác, Dọn kho, Phím & mẹo, Có gì mới.
- **✨ Có gì mới** hiện 1 lần khi mở bản mới. Bấm dòng nào thì app dẫn tới đúng chỗ; kèm 6 bước thử nhanh.

**7. 🔄 Reset dữ liệu thử** (Cài đặt › Dữ liệu; thay "Dọn hàng loạt")
- Chọn nhóm: thêm Chữ ký·CCCD.
- Chọn phạm vi: tất cả / trước ngày.
- Chọn mức: vào thùng rác / xóa hẳn luôn.
- Báo trước sẽ xóa bao nhiêu mục, bao nhiêu file trên Drive.

**Bỏ (đã gộp chỗ khác):**
- Các nút riêng "Gom file trùng", "Bảng lập chỉ mục";
- màn cắt khung chữ nhật cũ của Chữ ký·CCCD;
- hộp chọn 2 mức khi xóa.

**Kiểm thử:**
- `kiem.py` sạch; `hoiquy.js` + `hoiquy2.js` đạt 48/48.
- `t25`–`t50` đạt. `t30`, `t33`, `t34`, `t36`, `t47` đã sửa theo hành vi mới đã chốt.
- Phép thử mới:
  - `t51`: Chữ ký·CCCD với màn chỉnh Scan, Esc / Enter;
  - `t52`: thùng rác chia ngăn, dời file Drive vào / ra `_ThungRac`, đồng bộ 2 máy, tự xóa 30 ngày, Lập chỉ mục 9 loại thư mục, Quét rác trùng, xem Excel / Word, hướng dẫn, Reset.

---

## 3.49b — 28/09/2026 16:00 — Sửa lỗi 3.49 theo phản hồi của anh

- **Nút Xóa nhiều file không có bước tiếp theo** (ví dụ tab Tháng: chọn được file nhưng nút vẫn "0 file", bấm không được).
  - Nguyên nhân: thanh chọn của tab dùng trước còn nằm ẩn trong trang và "giành" nút.
  - Sửa: đổi tab là xóa thanh cũ; mọi thanh cập nhật theo lớp, không dùng id.
- **Đổi tên theo anh:** "− Bớt file" → **🗑 Xóa file**; nút dưới cùng "Xóa N file". Nút 🗑 kế bên từng file vẫn giữ để xóa lẻ.
- **Máy bàn không thấy 💾 Lưu nhanh / 📋 Copy.**
  - Nguyên nhân: Chrome/Edge trên Windows có bảng chia sẻ nên app tưởng là điện thoại, vẫn hiện nút Gửi.
  - Sửa: nhận máy bàn theo loại thiết bị (không phải iPhone / iPad / Android, màn hình rộng).
  - Điện thoại và iPad vẫn giữ 📤 Gửi.

---

## 3.49 — 28/09/2026 14:00 — − Bớt file · Quét rác mở rộng · nút cầu nối ở khung xem · máy bàn: 💾 Lưu nhanh + 📋 Copy

**1. − Bớt file** — nút cạnh **+ Thêm file** ở mọi tab (Văn bản, Tháng, Biểu mẫu, Thư viện, Scan; Chữ ký · CCCD: nút trong 📁).
- Bấm **− Bớt file** → mỗi dòng có ô tích; bấm dòng là tích/bỏ tích (không mở file).
- Chọn nhanh: **Chọn tất cả đang lọc (N)** · **Thêm vào tủ trước ngày …** · Bỏ chọn · **Bớt N file** · Thôi. Đổi tab là thôi chọn.
- **Hai mức**:
  - **Vào thùng rác** (mặc định): khôi phục được; file Drive dời vào `_ThungRac`.
  - **Xóa hẳn**: file Drive vào thùng rác Google Drive (30 ngày).
- Bản scan, Chữ ký · CCCD không có thùng rác trong app nên **chỉ có Xóa hẳn**. Bản PDF/JPG trên Drive vào thùng rác Google Drive.
- **Cảnh báo đỏ** khi file vốn có sẵn trên Drive từ trước (Quét tủ / kho cũ): bớt là dời/xóa chính file gốc.
- Xóa hẳn ghi dấu để **máy kia bỏ theo** khi đồng bộ, gồm cả scan và Chữ ký · CCCD.
- **Dọn dữ liệu thử nghiệm** (Cài đặt › Dữ liệu) thay bằng hướng dẫn dùng − Bớt file.
  - Hộp cũ còn giữ với tên **Dọn hàng loạt (khay chờ, Lịch)…** vì − Bớt file chưa dọn được Lịch.
  - Dọn scan trong hộp cũ giờ cũng đưa bản PDF trên Drive vào thùng rác Drive.

**2. Quét rác** (Thư viện › Bảo trì kho, và nút 🧹 trong 🗑). Tìm file anh không biết. App **chỉ liệt kê, không tự xóa**.
- **A. File lạc:** có trong Tủ hồ sơ trên Drive nhưng chưa có chỉ mục.
  - Chọn **Đưa vào khay chờ** (lập chỉ mục, Duyệt thì app đổi tên và dời chính file đó) hoặc **Bỏ**.
- **B. Không có dữ liệu:**
  - File 0 byte.
  - **🔎 Kiểm tra nội dung** (tùy chọn, chậm hơn): tải từng file PDF / Excel / ảnh về, báo PDF hỏng, Excel trống, ảnh hỏng.
  - Mục gãy: có trong tủ nhưng file trên Drive đã mất.
  - Bản scan / Chữ ký · CCCD không còn ảnh trong máy và chưa lên Drive.
- **C. Không đủ thông tin:** nút **Sửa** (và **🔍 Đọc lại** với văn bản PDF/ảnh); tích nếu muốn bỏ.
  - Văn bản thiếu số hiệu, ngày hoặc tên.
  - Dữ liệu tháng thiếu kỳ hoặc chưa phân loại.
  - Scan thiếu tên hoặc địa bàn.
  - Lưu tạm chưa khai quá 30 ngày.
  - Khay chờ quá 30 ngày.
- **D. Khác:** giữ như cũ — file trùng, file lạc trong `_ThungRac`, thư mục trống.
- Cùng **hai mức** Vào thùng rác / Xóa hẳn.
- **Chưa nối Drive vẫn quét được** phần trong app (nhóm B phần scan và nhóm C).
- **Sửa lỗi:** bản scan, Chữ ký · CCCD và file ở khay chờ trước đây bị báo nhầm là "file thừa".

**3. Nút cầu nối ở khung xem**
- Máy đã cài cầu nối: cạnh Gửi cả file · In · Sửa có thêm **🖥 Mở máy · 📋 Chép · 📂**.
  - Có ở cả khung xem bên phải và khung xem lớn.
  - File chưa lên Drive thì nút mờ; bấm sẽ báo cần đồng bộ trước.
- Máy chưa cài: dòng gợi ý nhỏ "Cài cầu nối (1 lần)", bấm ✕ để ẩn.
- **Mở thử** (Cài đặt › Google Drive): sau 2,5 giây app hỏi "Có thấy hộp Cầu nối đã chạy?". Bấm **Có** là tự bật "Máy này đã cài cầu nối".

**4. Máy bàn: 💾 Lưu nhanh + 📋 Copy thay nút Gửi / Tải về** (Chữ ký · CCCD và bước ③ Scan). Điện thoại giữ 📤 Gửi. Drive vẫn là nơi lưu mặc định.
- **💾 Lưu nhanh:**
  - Lần đầu chọn thư mục cố định (vd `D:\Nhap may\CK-CCCD`); lần sau bấm là ghi thẳng file đúng tên, không hỏi.
  - Chữ ký · CCCD và bản scan dùng hai thư mục riêng. Có **Đổi thư mục**.
  - Tùy chọn **Chia thư mục theo tháng**.
  - Tùy chọn **Tự lưu xuống máy mỗi lần lưu**.
  - Trình duyệt không hỗ trợ (Firefox…) thì tải về thư mục Tải về.
- **📋 Copy:**
  - Có cầu nối và file đã lên Drive: chép đúng **file** (JPG giữ dưới 200 KB, PDF).
  - Chữ ký · CCCD không có cầu nối: chép **ảnh** dán Zalo được, kèm nhắc có thể lớn hơn 200 KB khi dán vào hệ thống.
  - PDF không có cầu nối: báo cách làm (cài cầu nối, hoặc Lưu nhanh rồi kéo file vào Zalo).
- Thiết lập Lưu nhanh theo **từng máy** (không đồng bộ).

**Kiểm thử:**
- `kiem.py` sạch; hồi quy `hoiquy.js` + `hoiquy2.js` đạt 48/48; `t25`–`t46` chạy lại, chỉ khác ngày giờ và các nút mới.
- Phép thử mới:
  - `t47`: Bớt file máy tính + iPhone — chọn dòng, theo ngày, 2 mức, scan và CK·CCCD, dấu xóa, Drive.
  - `t48`: Quét rác — không Drive / có Drive, kiểm tra nội dung, lạc → khay chờ.
  - `t49`: Lưu nhanh, Copy, nút cầu nối, Mở thử.

---

## 3.48 — 28/09/2026 08:00 — Cầu nối máy tính (mở file thật, chép file dán Zalo) · đọc lại theo bố cục + bảng so sánh · hàng đợi Drive

**1. Cầu nối máy tính (Windows)** — Cài đặt › Google Drive › Cầu nối máy tính.
- **Cài một lần mỗi máy:** Tải bộ cài → bấm đúp file `.reg` → Yes → OK → **Mở thử**. Không cần quyền quản trị; có file **Gỡ cầu nối**.
- **Tự dò ổ Google Drive** (mọi ổ đĩa, thư mục "My Drive" hoặc "Drive của tôi" có chứa Tủ hồ sơ), nên máy khác ổ khác vẫn chạy.
- **Các lệnh:**
  - **📋 Chép file** — chép đúng file (PDF, ảnh…) vào bộ nhớ tạm của Windows; mở Zalo, email, thư mục bấm **Ctrl+V** là gửi.
  - **👁 Xem nhanh** — chép ra thư mục tạm của Windows (chỉ đọc) rồi mở; bản tạm tự xóa sau 12 giờ.
  - **🖥 Mở trên máy / 📝 Mở bằng Word, Excel** — mở file thật trên ổ G:, sửa xong Drive tự đồng bộ.
  - **📂 Mở thư mục** — Explorer mở đúng thư mục, chọn sẵn file.
- **Có ở:** bước ③ của Scan, Chữ ký · CCCD, menu ⋯ của văn bản, hộp "Mở bằng Word/Excel".
- **An toàn:** chỉ file trong thư mục Tủ hồ sơ; chỉ PDF / Word / Excel / ảnh; không nhận "..", ký tự lạ, .exe. File chưa chép về máy thì báo "Drive đang chép về, chờ ít phút".
- **Máy chưa cài cầu nối:** nút **👁 Xem trong tab** (PDF, ảnh mở trong trình duyệt, không lưu file); Word / Excel vẫn tải về.
- Đã thử script bằng PowerShell 7 với ổ Drive giả: dò được cả "My Drive" và "Drive của tôi", chặn đường dẫn ngoài và file .exe, báo khi thiếu file.

**2. Đọc lại & gợi ý tên — lấy đúng chỗ, so sánh rõ ràng**
- **Đọc theo bố cục:** dựa vào vị trí dòng chữ, không đọc dồn cả trang.
  - Công văn: dòng **"Số:"** cột trái + dòng **"V/v"** (in nghiêng) ngay dưới số hiệu, nối cả dòng thứ 2, bỏ qua dòng cột phải xen cùng độ cao.
  - Quyết định / Kế hoạch / Báo cáo…: **tiêu đề in hoa giữa trang + dòng ngay dưới**.
  - Ngày: dòng "ngày … tháng … năm …".
  - Áp dụng cho cả PDF có chữ và PDF chụp / ảnh (OCR tách 2 cột).
- **Bảng so sánh** — cột Hiện tại | Đọc được (sửa được) | Đổi (tích), kèm nơi lấy (ví dụ "dòng V/v ngay dưới số hiệu").
  - Tự tích những mục đang trống hoặc giống tên file.
  - **Tên file mới tính lại ngay**.
  - Nút **Áp dụng mục đã chọn** / **Giữ nguyên** / **Xem chữ đọc được**.
- Nút **🔍 Đọc lại & gợi ý tên** có ở khay chờ, màn Sửa, menu ⋯.
- Thử công văn, quyết định, kế hoạch dựng giống thật và công văn chụp (OCR): số hiệu, ngày, loại, trích yếu đều đúng.

**3. Bỏ "Kiểm tra bản PDF trắng"** (anh: thừa — 3.47 đã chặn tạo bản trắng từ gốc).

**4. Lưu tạm và đẩy lên Drive**
- **Tự nối Drive ở lần bấm đầu tiên** sau khi mở app, và khi bấm Tiếp ở bước ② (iPhone chỉ cho nối khi có thao tác tay).
- **Hàng đợi Drive:** bấm chấm Drive khi còn bản chờ → từng bản với trạng thái (đang lên / chờ / lỗi + lý do + số lần thử) và nút **Thử lại tất cả**.
  - Tự động thì bản lỗi thử lùi dần 1, 2, 4… tới 30 phút.
- **Đẩy danh sách ngay** khi có bản vừa lên Drive (trước đợi 5 giây).
- **Mỗi 1 phút** khi app đang mở, máy hỏi Drive danh sách có đổi không (rất nhẹ), đổi thì lấy về → điện thoại quét xong khoảng 1 phút máy tính thấy.

## 3.47 — 28/09/2026 05:00 — Sửa đồng bộ 2 máy (lệch danh sách, mở lên trắng) · Zalo trên máy tính · khai hàng loạt có chọn · Đọc lại & gợi ý tên

**Lỗi anh báo:** danh sách lưu tạm điện thoại 6, máy tính 3; mở bản của máy kia lên trắng.
- **Nguyên nhân 1:** gửi danh sách (chỉ mục) lên Drive là **ghi đè cả file** → máy gửi sau xóa mất phần máy kia vừa gửi.
- **Nguyên nhân 2:** máy chỉ lấy danh sách về **1 lần khi mở app**, và so bằng giờ của máy (2 máy lệch giờ là bỏ sót).
- **Nguyên nhân 3:** ảnh scan chỉ nằm trong máy đã quét → máy kia dựng PDF không có ảnh = trang trắng; tệ hơn, máy kia còn có thể **đẩy bản trắng lên Drive** hoặc **ghi đè file tốt** khi khai.

**Sửa:**
1. **Gộp rồi mới ghi:** trước khi gửi danh sách, app tải bản trên Drive về gộp với máy mình. So giờ theo **giờ của Drive**, không theo giờ máy. Bản scan và chữ ký gộp theo "sửa lúc" (bản sửa sau thắng), nên khai ở máy này thì máy kia thấy tên mới. Danh sách chữ ký · CCCD cũng đồng bộ giữa 2 máy.
2. **Lấy về thường xuyên:** khi mở app, **khi quay lại app** (chuyển từ app khác về), và khi bấm **☁ Đồng bộ ngay**. Nút này giờ làm cả 2 chiều: lấy về → đẩy bản chờ → gửi danh sách đã gộp.
3. **Mở bản của máy khác:**
   - Máy không có ảnh thì **tải PDF trên Drive về** để xem, in, gửi.
   - Bản chưa lên Drive thì báo rõ "quét ở máy khác, chưa lên Drive — mở máy kia bấm Đồng bộ ngay".
   - Danh sách có nhãn **☁ trên Drive** / **📱 máy khác**.
4. **Chặn bản trắng:**
   - Chỉ máy có ảnh mới dựng PDF và gửi lên.
   - Máy không có ảnh khai đầy đủ thì **chỉ đổi tên và dời thư mục** file trên Drive, không ghi đè nội dung.
   - Bảo trì kho thêm **🪪 Kiểm tra bản PDF trắng**: tìm PDF thẻ dưới 15 KB trên Drive → chọn xóa → máy có ảnh gửi lại bản đúng.
5. **Điện thoại đẩy lên ngay:**
   - Chấm Drive **đỏ** kèm số bản chưa lên.
   - Drive chưa nối mà còn bản chờ thì hiện **dải vàng "N bản chưa lên Drive — bấm để nối Drive và đẩy lên"** (iPhone cần anh bấm thì Google mới cho nối lại).

**Thêm:**
- **Máy tính gửi Zalo:**
  - PDF: nút **📥 Tải về để gửi Zalo** kèm hướng dẫn (📎 chọn file / kéo thả từ thanh tải về) và link **Mở Zalo Web**.
  - Chữ ký / CCCD: nút **📋 Chép ảnh**, mở Zalo PC bấm **Ctrl+V** là gửi.
  - Không làm gửi link Drive, vì phải mở quyền xem cho người có link, lộ CCCD.
- **Khai hàng loạt có tích chọn:**
  - Mỗi bản có ô tích và ảnh nhỏ; có **Chọn tất cả** và "đã chọn 2/3".
  - Địa bàn, CT vay, tag chỉ áp cho bản đã tích; bản không tích giữ nguyên.
  - Từ màn ③ nhiều người thì mở sẵn đúng các bản đó.
- **🔍 Đọc lại & gợi ý tên** trong màn **Chi tiết / Sửa** của mọi văn bản PDF / ảnh (cũ hay mới), và trong menu ⋯:
  - PDF có lớp chữ thì đọc thẳng; PDF chụp hoặc ảnh thì OCR.
  - Hiện số hiệu, ngày, trích yếu và **tên file chuẩn gợi ý**.
  - Bấm Áp dụng thì điền vào màn Sửa (ô viền xanh là giá trị mới, giữ nguyên các ô anh đang gõ), **chưa lưu** — anh xem rồi bấm Lưu.

## 3.46 — 28/09/2026 03:00 — Luồng 3 bước Chỉnh › Xem › Lưu & gửi · đồng bộ Drive · PDF nhanh + thanh chạy · đọc chữ PDF ảnh

**A. Luồng 3 bước, giống nhau trên máy tính và điện thoại** (Scan và Chữ ký · CCCD). Thanh bước ở đầu màn: ① Chỉnh › ② Xem › ③ Lưu & gửi.
- **① Chỉnh** (hàng chờ): máy tự cắt không chắc đúng 100%, anh duyệt qua.
  - **Chạm 1 ảnh rồi chạm ảnh khác** là đổi chỗ, kể cả giữa 2 người, để ghép lại mặt trước / mặt sau bị lệch.
  - **▲ ▼** dời cả người. Máy tính kéo thả được.
  - Ảnh app đoán sai mặt hiện **⚠ đỏ**.
  - Vẫn giữ: chỉnh viền, ⇄, ⇅, 📐, kiểu màu, ✕.
- **② Xem**: đúng bản PDF sẽ lưu / in / gửi; chưa lưu gì.
  - **‹ Chỉnh tiếp** quay lại. **Đạt — Tiếp ›** thì lưu tạm ngay.
  - Chữ ký · CCCD: ảnh lớn, số KB, ô tên khách.
- **③ Lưu & gửi**: tên file sửa được; nút 📤 Gửi (Zalo, Drive, Tệp) · 🖨 In · ☁ Lên Drive / Mở trên Drive · ✎ Khai đầy đủ (ngay hoặc sau) · 🗑 Xóa.
  - Chạm một bản trong danh sách cũng mở màn này, trên cả máy tính.
- **Bỏ** (anh duyệt): "In ngay, không lưu" và hộp hỏi khi in của 3.41 — muốn in phải qua ② ③, tức là đã lưu tạm, không còn mất bản quét. Nút "Khai đầy đủ" chuyển sang bước ③.

**B. Đồng bộ Drive để không mất dữ liệu**
- **Bản lưu tạm cũng lên Drive** vào `Hồ sơ scan / Chưa khai / yyyy-mm`. Khai đầy đủ sau thì app **dời file** sang đúng thư mục xã / điểm / ấp / tổ và đổi tên chuẩn (không tạo bản mới).
- **Chữ ký · CCCD** bấm Tiếp là lên Drive liền.
- **Mặc định tự đồng bộ:**
  - khi mở app;
  - khi rời app (chuyển app, khóa máy, đóng);
  - ngay sau khi lưu.
  - Tùy chọn thêm: mỗi 5 phút.
  - Bật / tắt ở Cài đặt › Google Drive › Tự đồng bộ.
- **Nút ☁ Đồng bộ ngay** ở Cài đặt; bấm chấm Drive ở chân màn hình cũng đồng bộ ngay. Chấm Drive đếm cả bản scan, chữ ký, CCCD còn chờ.
- Mất mạng / chưa nối: bản nằm chờ, có mạng hoặc lần mở / rời app sau tự đẩy.
- Rời app trên iPhone chỉ được vài giây: chỉ mục kịp lên; PDF lớn chưa xong thì lần sau đẩy tiếp.

**C. PDF nhanh hơn + thanh chạy**
- Ảnh đưa vào PDF thu về cỡ vừa in: thẻ khoảng 1000 px (≈270 dpi), trang A4 khoảng 1800 px (≈150 dpi), JPG 0,85. Nút **Chuẩn · nhẹ, nhanh / Nét cao** ở bước ②.
- PDF dựng **một lần**, dùng chung cho Xem, Lưu, Gửi, In.
- Xem trước **hiện trang 1 ngay**, trang sau vẽ khi cuộn tới.
- **Thanh chạy có chữ và %** cho việc lâu: "Đang cắt, nắn ảnh 3/8…", "Đang dựng PDF · trang 2/4…", "Đang đưa lên Drive 1/3…", "Đang đọc chữ… 45%" (có nút Dừng).

**D. PDF chụp không có chữ (mục K)**
- Không tự điền ngày hôm nay nữa. Gắn nhãn "PDF ảnh — chưa đọc được chữ"; tên file không gắn ngày khi chưa có ngày.
- Nút **🔍 Đọc chữ** chỉ hiện khi mục còn thiếu thông tin (ở khay chờ và menu ⋯):
  - Đọc trang 1 ngay trong máy (Tesseract tiếng Việt), không gửi ra ngoài. Lần đầu tải bộ đọc khoảng 10–15 MB.
  - Chữ đọc được hiện bên trái (sửa được, có nút ↻ Tách lại); số hiệu, ngày, trích yếu điền sẵn bên phải để anh xem rồi bấm Áp dụng.
  - Thử: công văn chụp đọc đúng "942/NHCS-KHNV", ngày 15/09/2026, trích yếu.

## 3.45 — 28/09/2026 01:00 — Camera trong app (tự chụp kiểu Lens, webcam máy bàn) · đường cắt đứt quãng có hình kéo · thư mục Chữ ký - CCCD

- **PDF thẻ CCCD:** chỉ còn **đường ngang mỏng, đứt quãng nằm giữa khe giữa 2 người**, đầu trái có **hình cái kéo** (vẽ bằng nét). Bỏ đường dọc và đường ngoài cùng; 2 mặt của một người để liền.
- **Camera trong app** (iPhone và máy bàn có webcam). Chọn kiểu chụp ở đầu tab Scan và ở màn Chữ ký · CCCD: **⚡ Tự động** / **✋ Thủ công**.
  - **Tự động (như Lens):** dò khung thẻ hoặc tờ giấy khoảng 5 lần mỗi giây, **khung xanh bám theo**, vòng tròn đầy dần; **đứng yên khoảng 1 giây là tự chụp** (chớp sáng). Sau đó chờ cảnh đổi (lật mặt, đổi tờ) mới chụp tiếp, không chụp lặp.
    - Thẻ: nhắc "mặt trước / lật mặt sau" theo từng người.
    - Chữ ký: không có khung, chụp khi hình đứng yên.
    - Áp dụng cho mọi chức năng quét: thẻ, tài liệu, chữ ký, CCCD.
  - **Thủ công:** iPhone dùng **camera gốc của máy** (ảnh nét nhất). Máy bàn bấm nút tròn hoặc **phím cách**, Esc để xong.
  - Máy bàn có nhiều camera thì chọn trong danh sách, app nhớ camera đã chọn. Không cho quyền camera thì app báo cách cho phép và quay về chọn ảnh.
  - Chụp xong đi đúng luồng cũ:
    - Scan: bấm **Xong** → hàng chờ.
    - Chữ ký / CCCD: vào màn **cắt vừa** → lưu.
  - Máy bàn: nút **📷 Webcam** ở đầu tab Scan. Nguồn "Camera" trong hộp Thêm file cũng mở webcam.
  - Giới hạn trình duyệt: không điều khiển tiêu cự, đèn flash; ảnh kém camera gốc một chút.
- **Chữ ký · CCCD** (đổi tên từ "Chữ ký · Ảnh KH"):
  - Ảnh là **cả mặt trước CCCD**.
  - **Tên file:** anh chỉ gõ tên khách, app thêm ngày ở đầu, CK/CCCD ở cuối: `2026-09-25 Nguyen Van A CK.jpg`, `2026-09-25 Nguyen Van A CCCD.jpg`. Trùng tên thì thêm (2).
  - **Mỗi tháng một thư mục:** `Tủ hồ sơ / Chữ ký - CCCD / 2026-09`.
  - **Phím tắt từ tab Scan:** nút 📁 (điện thoại) / "📁 Chữ ký · CCCD" (máy tính) → danh sách theo tháng, nút **☁ Mở thư mục tháng trên Drive**.

## 3.44 — 27/09/2026 23:59 — Scan: xóa hẳn bản hư, đường cắt giữa khe, chữ ký · ảnh khách hàng

- **Xóa hẳn cho đỡ rác** (xóa khỏi máy, không vào thùng rác):
  - Mỗi dòng bản đã quét trên điện thoại có lại nút 🗑. Bản 3.43 lỡ ẩn cả nút này khi làm gọn dòng.
  - Màn xem trước PDF có nút **🗑 Xóa**.
  - Dải "N bản vừa quét chưa lưu" có nút **🗑 Bỏ**.
  - Thanh Xong ở hàng chờ có nút **🗑 Bỏ hết**.
  - Bản đã lên Drive thì PDF trên Drive chuyển vào thùng rác Google Drive.
- **PDF thẻ CCCD** (anh chỉnh ý):
  - Không in chữ gì (bỏ tiêu đề, bỏ tên khách), bỏ vạch góc và viền.
  - Chỉ còn **đường mỏng nằm giữa khe giữa 2 thẻ** làm dấu cắt kéo: giữa khe 2 mặt, giữa khe các người, và 2 đường ngoài cách mép thẻ đúng nửa khe. Cắt theo đường là các miếng thẻ bằng nhau.
  - Khe giữa các người 12 mm, cả khối căn giữa trang, nên đường ngoài cùng cách mép giấy khoảng 8 mm (máy in in tới được).
- **Mới: ✍ Chữ ký · Ảnh khách hàng** (tab Scan: nút ✍ trên điện thoại, nút "✍ Chữ ký · Ảnh KH" trên máy tính). File JPG dưới 200 KB để nhập hệ thống khi tạo hồ sơ.
  - **Chữ ký:** chụp → **kéo khung cắt tùy ý như Zalo** (4 góc, 4 cạnh, kéo giữa để dời; app đoán sẵn khung quanh nét ký, có nút Tự tìm lại, ⟳ Xoay) → nền trắng tinh, nét đậm. Thử: khoảng 15 KB.
  - **Ảnh:** chụp mặt trước CCCD → app tự tìm khung thẻ, nắn thẳng. Có nút **Ảnh gốc** để cắt tay (theo quy tắc hiện bản gốc). Chọn mức nén **Nhỏ / Vừa / Nét**, thử được 29 / 45 / 64 KB; luôn giữ dưới 195 KB.
  - **Đặt tên nhanh:** ô tên khách ở đầu màn; tên nhớ 30 phút cho lần chụp kế. File tên `CK_Nguyen_Van_A.jpg`, `ANH_Nguyen_Van_A.jpg` (bỏ dấu, trùng thì thêm _2).
  - **Lưu nhanh lên Drive:** `Tủ hồ sơ / Chữ ký - Ảnh KH / yyyy-mm-dd`. Chưa nối Drive thì lưu trong máy, bấm ☁ sau.
  - Danh sách "Gần đây" có ☁ đưa lên, 📤 gửi (Zalo, Tệp…), 🗑 xóa hẳn.

## 3.43 — 27/09/2026 23:55 — Scan điện thoại kiểu Lens · ma trận tab Tháng đồng nhất, canh trái · tab Thư viện

**Scan trên iPhone** (anh duyệt, tham khảo cách làm của app scan Lens trên iOS; máy tính giữ nguyên màn cũ):
- Đầu tab chỉ còn: nút lớn **📷 Quét** (vào thẳng camera, không hỏi nguồn mỗi lần) · công tắc **Thẻ | Tài liệu** · 🖼 lấy ảnh có sẵn · ☰ bộ lọc.
- Hàng chờ có thanh dính dưới đáy: **✓ Xong — tạo PDF, xem trước, gửi** · 📷 Chụp tiếp. Các nút cũ (chỉnh viền, làm thẳng, kiểu màu, in ngay, khai đầy đủ, bỏ hết) vẫn còn.
- Bấm Xong: app **lưu tạm** (tên "Scan ngày-tháng-năm giờ"), dựng PDF rồi mở **màn xem trước PDF thật** (đúng bản sẽ gửi/in):
  - ô **Tên file** sửa ngay; đổi tên thì bản lưu tạm cũng đổi theo.
  - **📤 Gửi — Zalo, Drive, Tệp…** mở bảng chia sẻ của iPhone. Web không gửi thẳng vào Zalo được, phải qua bảng chia sẻ.
  - 🖨 In · ☁ Lên tủ Drive · ✎ Khai hồ sơ · Đóng.
- Danh sách bản đã quét gọn một dòng; chạm là mở màn xem trước để gửi lại.

**Tab Ghi chú → tab Thư viện** (anh duyệt phương án a):
- Gồm 2 phần chuyển qua lại: **🖼 Ghi chú** (giữ nguyên như cũ) · **🧰 Bảo trì kho** (chuyển ra từ Cài đặt, vì bảo trì chuẩn hóa làm thường xuyên).
- Đầu phần Bảo trì có dòng tình trạng kho: số mục · chưa nối Drive / số mục chưa có trên Drive · dữ liệu tháng chưa phân loại · thùng rác · lần đồng bộ chỉ mục gần nhất.
- Không mất dữ liệu ghi chú. Cài đặt › Bảo trì kho vẫn còn. Vừa lưu một ghi chú thì app tự mở phần Ghi chú.

**Ma trận tab Tháng** (anh chốt: mọi báo cáo hiện giống nhau):
- Mọi báo cáo hiện **đủ các cột**. Bỏ ô gộp ngang của sao kê Excel và của dòng "chưa tới kỳ"; dòng chưa tới kỳ có nhãn nhỏ cạnh tên.
- **Một quy tắc cho mọi ô:**
  - Có file thì ✓; chưa có thì **+** (bấm để thêm).
  - Ô xã: dấu chính là file riêng của xã. Báo cáo có tính ở cấp điểm thì kèm **n/n điểm**, còn báo cáo chỉ tính theo điểm thì ô xã hiện **n/n** như cũ. Trước đây ô xã chưa có file hiện "—", nay là "+".
- **Ô không tính thiếu vẫn là dấu +** (thêm file được) nhưng **nhạt màu**: báo cáo không áp dụng cấp đó, xã ngoài địa bàn, chưa tới kỳ. Rê chuột vào ô để xem lý do. Số "thiếu" giữ nguyên cách tính.
- Sao kê thuần Excel chưa khai cấp thì chỉ tính thiếu ở Toàn PGD. Hộp ⚙ đổi "Dạng hiển thị" thành "Nhóm trên ma trận".
- **Canh trái:** cột tên báo cáo rộng vừa chữ, các ô nằm sát ngay sau tên. Trước đây bảng bị kéo giãn 100% nên ô dồn sát lề phải. Trên điện thoại, cột tên chiếm khoảng 40% màn hình.

## 3.42 — 27/09/2026 23:30 — trang "Bảo trì kho"

- Cài đặt › **🧰 Bảo trì kho** (thay trang "Lập chỉ mục"): gom mọi việc quét / dọn / đồng bộ về một chỗ, mỗi việc một thẻ ghi rõ **làm gì** và nhãn màu **đụng tới gì** (Chỉ sửa chỉ mục · Đổi file khi anh duyệt · Vào thùng rác, khôi phục được):
  - Tìm file mới: **Quét tủ** (vẫn giữ nút ở đầu tab Văn bản) · **Lấy file từ kho Drive cũ (Picker)** (chưa có API key thì có nút sang khai).
  - Đồng bộ chỉ mục: **Đẩy chỉ mục lên Drive** · **Lấy chỉ mục từ Drive**.
  - Dọn dẹp: **Quét dọn rác** · **Gom file trùng nội dung** · **Thùng rác**.
  - Nâng cao: **Bảng lập chỉ mục** · **Nhờ AI chuẩn hóa** (xuất / dán kết quả).
  - Việc cần Drive mà chưa nối thì nút mờ, ghi "cần nối Drive trước".
- Trang Dữ liệu app: 2 nút Quét dọn rác / Gom file trùng thay bằng lối sang Bảo trì kho (không còn trùng hai nơi). Không bỏ chức năng nào.

## 3.41 — 27/09/2026 22:00 — Scan: in không mất bản quét, kéo giữa cạnh, tự làm thẳng

Anh Nhân thử trên điện thoại: xuất PDF bấm in mà không lưu thì mất luôn (điện thoại chưa nối máy in); muốn kéo cả cạnh cho nhanh; muốn tự chỉnh thẳng đứng. **Quy tắc chung (anh chốt): việc gì app tự làm cũng hiện kèm bản gốc, chưa vừa ý thì chỉnh tay.**

- **In ngay hỏi trước** (trình duyệt không báo in được hay không, nên app không thể "báo khi in lỗi" — thay vào đó không để mất):
  - 💾 **Lưu tạm rồi in** (mặc định) · 📤 **Lưu PDF / Gửi** (bảng chia sẻ: Lưu vào Tệp, Zalo, email; máy tính thì tải về) · 🖨 **Chỉ in, chưa lưu** (hàng chờ vẫn giữ) · Quay lại.
  - Trước đây in xong hàng chờ đóng lại, không có nút mở lại → coi như mất.
- **Hàng chờ không mất khi trang tải lại** (điện thoại hay tải lại khi chuyển qua bảng in / chia sẻ): tab Scan hiện dải "N bản vừa quét chưa lưu — Mở lại".
- **Tên lưu tạm:** "Scan 27-09-2026 14h05m32" (ngày-tháng-năm giờ), trùng thì thêm (2), (3); nhiều người thì "… - người 1", "… - người 2". Trước là "Chưa khai 2026-09-27 14h05-32".
- **Màn kéo viền: thêm 4 điểm giữa cạnh** (gạch ngắn) — kéo là cả cạnh dời song song, 2 góc hai đầu đi theo; có kính lúp như kéo góc.
- **Tự làm thẳng:** dò độ nghiêng của dòng chữ (−15°…15°) rồi xoay cho thẳng đứng; tài liệu chụp ngang (chữ nằm dọc) thì tự xoay 90° (sai chiều bấm ⇅). Tài liệu bật sẵn; thẻ CCCD (đã nắn theo 4 góc) bật khi bấm. Nút 📐 trên từng ảnh ở hàng chờ để bật/tắt (rê chuột thấy đã chỉnh bao nhiêu độ); nút **📐 Làm thẳng** trong màn kéo viền. Ảnh gốc có viền vẫn hiện bên cạnh như trước.
  - Đo trên công văn thật: nghiêng 3°, −5°, 8°, −12° đều về 0°, khoảng 0,2 giây mỗi ảnh; nhận đúng trang nằm ngang.

## 3.40 — 27/09/2026 20:00 — Cài đặt viết lại: mọi danh mục sửa trên giao diện, tự lưu

Anh chốt: tự lưu (1a) · bỏ ô "Nhãn nút Thêm" (2a) · "Dùng chung" của Biểu mẫu chỉ ở hàng Chương trình (3a).

- **Bộ sửa danh mục dùng chung** (thay các ô gõ nhiều dòng): Mảng nghiệp vụ, Chương trình vay, Loại văn bản (trang Chung); Tag từng tab, Nhãn ghi chú, Hội đoàn thể (trang của tab).
  - Mỗi dòng: tên · tên đầy đủ / viết tắt · từ khóa nhận dạng · số file đang dùng · ↑ ↓ ✕; ô "Thêm … mới" + "Lấy lại mặc định".
  - **Đổi tên → file đang dùng đổi theo** (văn bản, biểu mẫu, scan, dữ liệu tháng, khay chờ); bộ lọc đang chọn tên cũ cũng theo.
  - **Xóa mục đang có file** → hỏi ngay tại dòng: chuyển các file đó sang mục nào, hoặc để trống. Mục chưa file nào dùng thì xóa luôn.
- **Từ khóa nhận dạng sửa được** (trước nằm trong code): Mảng, Chương trình vay, Tag văn bản. Mảng/CT/tag mới thêm giờ cũng được app tự nhận khi đọc văn bản. Gõ có dấu hay không dấu đều được.
- **Viết tắt loại văn bản sửa được** (trước nằm trong code — loại mới thêm bị ghi "VB" trong tên file không dấu). Chỉ áp cho file lưu từ nay.
- **Tự lưu:** mọi ô trong Cài đặt đổi là lưu ngay, báo "✓ Đã lưu"; đẩy cauhinh.json lên Drive gom sau 4 giây. Bỏ 3 nút Lưu, chỉ còn Đóng.
- **Trang Dữ liệu tháng:** danh sách mẫu báo cáo, mỗi dòng nút ⚙ (mở hộp thiết lập, lưu xong quay lại Cài đặt) — bỏ ô gõ `Tên | MÃ | từ khóa | cấp` dễ sai. Thêm **Nhắc giao ban**: chữ nhận ra việc giao ban trên lịch và số ngày báo trước (mặc định "giao ban", 7 ngày).
- **Trang Scan:** kiểu màu mặc định cho Thẻ và Tài liệu; **cỡ in CCCD** (bề ngang thẻ, khe 2 mặt) — app tự giới hạn để 4 người luôn vừa A4, hiện luôn cỡ thẻ và khe giữa các người.
- Bỏ ô "Nhãn nút Thêm" (không có tác dụng). "Dùng chung" bỏ khỏi danh sách tag Biểu mẫu một lần (lọc y hệt nút ở hàng Chương trình). Tab Biểu mẫu có thêm lựa chọn sắp mặc định "Số lần dùng", "Năm VB gốc".
- Đồng bộ Drive (cauhinh.json) thêm: từ khóa, viết tắt, nhắc giao ban, cỡ in, kiểu màu.
- **Sửa lỗi anh báo (gộp vào 3.40):**
  - **Thêm từ tab nào thì mặc định lưu vào tab đó** (anh chốt): bấm Thêm file hoặc thả file ở tab Văn bản → Văn bản, tab Tháng → Dữ liệu tháng, tab Ghi chú → Ghi chú; app không tự chuyển sang tab khác. App vẫn đọc nội dung để điền sẵn; thấy giống loại khác thì chỉ ghi chú "nội dung giống …", anh đổi nhóm ở Chi tiết / Sửa nếu cần. Thả thẳng vào khay chờ, quét Drive, Picker thì app tự xếp như cũ.
  - **Khay chờ ghi rõ thuộc tab nào:** mỗi file có nhãn "→ Tab …" (duyệt là vào tab đó); đổi nhóm khác tab gốc thì thêm nhãn "thêm từ tab …". Danh sách chờ khai cũng ghi tab.
  - (Nguyên nhân lỗi cũ) nút Thêm file của tab Văn bản sang khay chờ trước khi chọn file nên app nhớ tab trước đó (vd Tháng) → Excel vào Dữ liệu tháng.
  - **Đọc tên file sai.** Viết lại bộ đọc tên: nhận ngày khi có gạch dưới (4079_NHCS-TDNN_07-09-2026), ngày viết liền (20260915, 15092026); số hiệu không còn ăn lan sang ngày/năm (trước ra 942/NHCS-KHNV-15, 25/HD-NHCS-2026); nhận CV942, TB_125, "Công văn 942", "Số 4079"; tiền tố TB/QĐ/KH… cho ra đúng loại; kiểu anh hay đặt **"11068 - cho vay LĐNN"** (số đứng đầu, gạch nối, nội dung) ra số 11068 · trích yếu "cho vay LĐNN" (số thứ tự "01 - …" và năm "2026 - …" đứng đầu không bị nhận là số); trích yếu bỏ chữ thừa (QD, V.v, Về việc, giờ chụp của file Scan_, năm đứng trơ).


## 3.39 — 27/09/2026 14:00 — khung xem vừa đủ, điện thoại tối giản, sửa nhanh sau rà soát

- **Khung xem bên phải (máy tính) — cố định, vừa đủ xem trước** (anh chốt không thu lại để bố cục không nhảy):
  - Mặc định danh sách 60% · khung xem 40%; tab Tháng 65/35 để ma trận rộng. Khung xem tối thiểu 340px.
  - Độ rộng nhớ **riêng từng tab**: kéo vạch ⠿ ở tab nào nhớ cho tab đó; bấm đúp vạch về mặc định.
  - Độ rộng chung đời cũ được bỏ **một lần** để về mặc định mới.
  - Chưa chọn mục: 3 nút Gửi cả file · In · Sửa mờ đi, không bấm nhầm.
- **Điện thoại (dưới 700px) — tối giản, nhường màn cho nội dung:**
  - Hàng lọc nhanh mặc định ẩn; bấm **Lọc nhanh ▾** mới hiện (nhớ riêng cho điện thoại, không đổi lựa chọn trên máy tính).
  - Đầu trang gọn hơn (ẩn dòng đơn vị · số mục), hàng tab thấp hơn.
  - Dải "file chờ khai" còn 1 dòng; hàng nút đầu tab 1 dòng vuốt ngang.
  - Thanh nút ma trận tab Tháng: 2 dòng vuốt ngang (trước xuống 5 dòng).
  - Thanh dưới cùng 1 dòng; ẩn dòng giải thích ở tab Scan.
  - Tab Văn bản thấy khoảng 4 văn bản ngay khi mở (trước chưa tới 1).
- **Sửa nhanh sau rà soát:**
  - Số mục trên đầu trang đếm đủ 5 tab và luôn cập nhật (trước chỉ đếm 3 tab, chỉ cập nhật lúc mở app).
  - Cài đặt: căn trái, rộng hơn; ô tick "Cấu trúc tên" hết bị phóng to.
  - Hàng lọc nhanh: chữ "ẩn ▴" có chỗ riêng, không đè chip cuối.
  - **Nhãn Ghi chú gộp một nguồn:** lúc sửa ghi chú và hàng lọc Nhãn dùng chung danh sách tag tab Ghi chú; nhãn cũ được gộp vào một lần, không mất.
  - Nút "Kiểm tra khung xem / Đặt lại bố cục" dời từ trang Google Drive sang trang **Chung**.
  - Cài đặt từng tab chỉ hiện tùy chọn có tác dụng: "Kiểu xem mặc định" chỉ ở tab Văn bản; tab Scan bỏ "Sắp xếp mặc định" (tab không có thanh sắp xếp). Kiểu xem lưu nhầm ở tab khác không còn lây sang Văn bản.

## 3.38 — 27/09/2026 10:00 — sổ ghi chú dịu lại khi nền tối, in CCCD thẻ to hơn, dấu cắt gọn

- **Sổ ghi chú ở chế độ tối:** giấy vàng dịu xuống một chút (vàng sẫm nhẹ #D8CBA6) cho đỡ chói; ô gõ, nút bên trong dịu theo. Vẫn là giấy vàng, không đổi sang nâu sậm như trước 3.36. Chế độ sáng giữ nguyên.
- **In CCCD (4 người/A4, xếp từ trên xuống):**
  - Thẻ to hơn: 92 × 58 mm (trước 88 × 55,5 mm).
  - 2 mặt của một người sát nhau hơn: khe giữa 6 mm (trước 14 mm).
  - Khe giữa các người ≈ 15 mm để cắt và ghi tên; lề 10 mm.
  - **Dấu cắt:** bỏ dấu 4 góc từng thẻ; mỗi đường cắt chỉ có 1 vạch ở đầu, giữa và cuối, nằm ngoài thẻ (lề trái – khe giữa 2 mặt – lề phải cho đường ngang; lề trên – giữa trang – lề dưới cho đường dọc).

## 3.37 — 27/09/2026 04:50 — hàng chờ Scan hiện ảnh gốc kèm viền cắt, nút màu hiện sẵn, khe cắt rộng hơn

- **Mỗi ảnh ở hàng chờ hiện cả 2 bản:**
  - **Kết quả** app đã cắt.
  - **Ảnh gốc có viền xanh** chỗ app cắt; phần bị bỏ tô mờ, chỉ hiện vùng quanh viền cho gọn.
  - Nhìn là biết cắt đúng hay lệch. Bấm vào ảnh gốc (hoặc nút **✂ Chỉnh viền**) để kéo viền toàn màn hình, có kính lúp.
- **Kiểu màu hiện sẵn thành nút:** Magic · Giấy trắng · Xám · Đen trắng · Gốc. Nút đang chọn tô xanh (trước là ô chọn thả xuống).
- **Điện thoại:** mỗi mặt thẻ một hàng cho đủ chỗ.
- **In CCCD:**
  - Khe giữa các thẻ **nới từ 8 lên 14 mm**, đều cả ngang lẫn dọc, cho dễ cắt.
  - Lề giấy 10 mm; thẻ 88 × 55,5 mm (vẫn to hơn thẻ thật); vẫn đủ 4 người mỗi A4.
  - Dòng tiêu đề dời khỏi dấu cắt.
- Kiểm thử: `kiem.py`, `hoiquy.js`, `hoiquy2.js`, t17, t19, t20 đạt; chụp màn hình máy tính và iPhone.

---

## 3.36 — 27/09/2026 04:10 — sổ ghi chú giữ giấy vàng ở chế độ tối

- Máy để chế độ tối, sổ ghi chú ở tab Hôm nay trước đây đổi nền sang nâu sậm. Nhưng chữ và các ô bên trong vẫn giữ màu dành cho giấy vàng, nên nền tối, chữ tối, ô sáng lẫn lộn, rất khó coi.
- Nay sổ **luôn là giấy vàng** như sổ thật. Phần còn lại của app vẫn sáng/tối theo máy như cũ.
- Ô gõ và thanh cuộn trong sổ cũng giữ kiểu sáng (`color-scheme:light`).
- Kiểm thử: `kiem.py` đạt; `hoiquy.js`, `hoiquy2.js` đạt; đã chụp chế độ tối trên máy tính và iPhone.

---

## 3.35 — 27/09/2026 03:40 — tab Scan kiểu app scan chuyên nghiệp

- **Tự động trước, chỉnh tay khi còn sót** (xử lý ngay trong máy, ảnh không gửi đi đâu, không thêm thư viện):
  - **Tìm khung thẻ CCCD:** neo theo màu xanh ngọc của thẻ, dò 4 cạnh thẳng, chọn khung có tỉ lệ gần 1,585, cạnh song song. Bỏ qua mép bao nhựa, sọc vải.
  - **Tìm tờ giấy (tài liệu):** vùng sáng lớn nhất, lấy 4 góc.
  - **Nắn phối cảnh** về đúng khổ: thẻ 85,6×54 mm (~300 dpi), tài liệu A4 (hoặc giữ tỉ lệ thật nếu không phải A4).
  - **Tự lật khi thẻ ngược** và **tự nhận mặt trước/sau:**
    - dấu đỏ luôn ở nửa trên;
    - 3 dòng mã IDVNM ở dưới cùng (mặt sau thẻ mới);
    - chip vàng lớn (mặt sau thẻ cũ).
  - **Lọc làm đẹp**, không còn bị tối:
    - **Magic màu** cho thẻ: khử bóng, kéo tương phản, tươi màu, làm nét.
    - **Giấy trắng** cho tài liệu: nền trắng hẳn, khử ám vàng/xám, chữ đậm, dấu đỏ giữ màu.
    - Thêm Xám, Đen trắng, Gốc.
  - Ảnh tự tìm khung chưa chắc được gắn **⚠ xem lại**.
- **Hàng chờ mới:**
  - Thẻ xếp theo **Người 1, 2…** với cặp **Mặt trước | Mặt sau**. Chụp xen kẽ, hay chụp hết mặt trước rồi mới tới mặt sau, app đều tự xếp đúng cặp.
  - Mỗi ảnh có nút: **◀ ▶** dời, **✂** chỉnh khung, **⇄** đổi mặt, **⇅** lật 180°, **⟲** xoay 90° (tài liệu), chọn kiểu lọc, **✕** bỏ.
- **Màn chỉnh khung:**
  - Kéo 4 chấm góc trên ảnh gốc, có **kính lúp** phóng to chỗ đang kéo (đặt phía đối diện ngón tay).
  - Nút "Lấy cả ảnh" và "Tự tìm lại".
  - Ảnh gốc (thu còn 2000 px) giữ tới khi lưu nên chỉnh nhiều lần không giảm chất lượng; lưu xong thì xóa cho nhẹ máy.
- **In CCCD** (theo ý anh Nhân: thẻ thật nhỏ, in to hơn cho dễ đọc):
  - Mỗi A4 xếp **4 người × 2 mặt**.
  - Thẻ **in to hơn thẻ thật**: 89 × 56 mm, thẻ thật 85,6 × 54 mm; giữ đúng tỉ lệ.
  - **Chừa chỗ cắt:**
    - Lề giấy 12 mm, máy in nào cũng in tới.
    - Khe giữa các thẻ **đều 8 mm cả ngang lẫn dọc**.
    - **Dấu cắt** ở 4 góc mỗi thẻ (vạch mảnh nằm ngoài thẻ).
    - Cắt ra các mép đều nhau.
  - **Xếp từ trên xuống**: 1 người thì nằm đầu trang, không căn giữa dọc.
  - Dùng chung cho "In ngay" và in hồ sơ đã lưu; tên khách ghi dưới mỗi cặp.
  - Nhắc chọn **"Kích thước thật / 100%"** khi in để trang in đúng bản xem trước.
- **PDF trong tab Scan (chế độ Tài liệu):**
  - Tách từng trang để **dời, xoay, bỏ**. Nút **+ Thêm PDF** ở hàng chờ và **+ Chọn PDF** trong hộp sửa tài liệu (chèn vào cuối rồi dời tới chỗ cần).
  - Khi dựng PDF, trang gốc được **chép nguyên**: chữ vẫn là chữ, không đổi thành ảnh.
  - Trang lưu dạng tham chiếu `pdf:<nguồn>:<trang>:<xoay>`. Xóa hồ sơ thì file PDF nguồn cũng bị xóa.
  - Ảnh ngang ra trang ngang.
- **Sửa lỗi cũ:**
  - PDF chọn từ nguồn "File" trong tab Scan trước đây **bị bỏ mất khi lưu**.
  - "Khai đầy đủ rồi lưu" với nhiều hơn 2 ảnh thẻ trước đây chỉ lấy 2 ảnh đầu. Nay lưu tạm từng người rồi mở Khai hàng loạt.
  - Hộp khai CCCD: chọn 2 ảnh mà app nhận ra lộn mặt thì tự đổi chỗ.
- **Kết quả đo trên ảnh CCCD thật anh gửi** (4 ảnh × 4 hướng xoay, cả ảnh nén lại):
  - Thẻ trên nền có màu (khăn sọc) và mặt sau thẻ cũ: khung khớp 94–98%.
  - Thẻ nhạt màu trên bàn kính: khớp 71–91%. Có lúc cắt lệch nên nhận sai mặt; app gắn ⚠ để anh kéo góc và lật.
  - Tự lật và nhận mặt: đúng 12/12 trường hợp khi khung đúng.
  - Tài liệu: tìm tờ giấy lệch dưới 10 px, nền ra trắng 255 (thử với trang công văn 942 giả lập chụp điện thoại).
- Kiểm thử: `kiem.py` đạt; `hoiquy.js`, `hoiquy2.js`, t14–t18 đạt; t17 (Scan → Drive) đạt sau khi cho chờ xử lý ảnh xong; phép thử mới t19 (toàn luồng thẻ + tài liệu + PDF) đạt. Chụp màn hình máy tính và iPhone.

---

## 3.34 — 26/09/2026 23:50 — tab Tháng: thêm file, báo cáo tự thiết lập, thanh nút, hàng lọc

- **Sửa lỗi "Tổng dư nợ theo chương trình vay" thêm file không vào ô.** Nguyên nhân đã tái hiện:
  - Nút "+ Thêm file" ở tab Tháng không nhớ đang ở tab Tháng. Excel có tên không chứa từ khóa (ví dụ `TongDuNo_CTV.xlsx`) bị đưa sang **Văn bản**.
    - Nay nút đi qua `nutChinh` (`TAB_TRUOC=2`).
    - Kéo thả file vào tab Tháng cũng nhớ tab.
  - Tên có từ khóa nhưng không có kỳ thì bị gán **tháng hiện tại** (T9), trong khi ma trận đang xem T8.
    - Nay lấy **kỳ đang xem trên ma trận** (`kyBang()`) và ghi căn cứ "tạm lấy kỳ đang xem — anh xem lại".
  - Excel không khớp mẫu nào → vẫn vào Dữ liệu tháng, loại "Khác", để anh chọn loại ở khay chờ.
- **File trùng nội dung không còn bị bỏ qua lặng lẽ.** Đọc xong, app hiện hộp ghi rõ file đã nằm ở tab nào, kèm nút **Mở**.
  - Nếu anh thêm từ một ô ma trận, hộp có thêm nút **"Chuyển vào ô …"**. Bấm vào thì mục cũ (ví dụ đang nằm nhầm ở Văn bản) dời hẳn sang ô đó.
  - Mục được dời sẽ đặt lại tên chuẩn, và tên cùng thư mục trên Drive đổi theo. App không tạo bản sao.
  - Hàm mới: `baoTrung`, `chuyenVaoO`, `tenTabMuc`, `timMucCaCho`.
- **Mỗi báo cáo tự thiết lập trên giao diện, không cần sửa code** — nút **⚙** ở cột Sửa (✎ Danh mục trên ma trận). Hộp thiết lập gồm:
  - Tên và từ khóa nhận dạng.
  - Dạng hiển thị: **bảng theo đơn vị** hoặc **một ô Toàn PGD**.
  - Cấp tính thiếu: PGD / Xã, phường / Điểm giao dịch.
  - Chu kỳ: tháng / theo ngày / quý / 6 tháng / năm.
  - Có hay không dòng Excel cấp PGD.
  - Mã báo cáo giữ nguyên, vì file đã lưu gắn với mã.
  - Thêm báo cáo mới xong, hộp ⚙ mở luôn.
  - Hàm mới: `moThietLapBC`, `luuThietLapBC`.
- **"Số liệu báo cáo họp giao ban" (SL_GB) chuyển sang bảng theo điểm giao dịch** (chỉ cấp điểm, như anh chốt).
  - Chuyển **một lần** trên máy đang dùng, đánh dấu bằng cờ `slgbDaDoi`. Sau đó anh chỉnh gì app giữ nguyên.
- **Thanh nút ma trận chia 2 dòng, nút gọn 28px, không còn bị che hay phải cuộn ngang:**
  - Dòng 1: kỳ, Chốt kỳ, So 2 kỳ, ▴.
  - Dòng 2: 👁 Xã, cấp, ✎ Danh mục.
  - Hai nút ‹ › thu về 28px.
  - Thanh Sắp xếp/Xem trên máy tính cũng gọn 28px.
- **Hàng lọc nhanh hiện sẵn ở mọi tab** (kiểu Biểu mẫu). Mỗi nhóm một dòng, chip 22px; dòng dài thì vuốt ngang.
  - Nhóm lọc theo tab:
    - Văn bản: Năm · Mảng · CT vay · Tag.
    - Tháng: Năm · Phạm vi · Hội.
    - Biểu mẫu: Chương trình · Tag.
    - Ghi chú: Năm · Nhãn.
    - Scan: Xã (lọc mới) · Tag.
  - Mảng, CT vay, Phạm vi, Hội, Xã chỉ hiện giá trị đang có file. Năm hiện khi có từ 2 năm trở lên.
  - Chữ "ẩn ▴" cuối dòng đầu để ẩn hàng lọc; nút "Lọc nhanh ▾" để hiện lại. App nhớ riêng từng tab (`D.cauHinh.anLocNhanh`).
  - Điện thoại cũng hiện, vuốt ngang.
- Kiểm thử:
  - `kiem.py` đạt.
  - Bộ hồi quy cũ đạt hết: `hoiquy.js`, `hoiquy2.js`, t14–t17.
  - Phép thử mới t18: đủ các ý (a0), (a), (b), (c), (e) trong kế hoạch.
  - Đo thanh nút ma trận ở khổ 1024/1280/1440/iPhone: 0 nút bị che, không cuộn ngang.

---

## 3.33 — 26/09/2026 22:42 — hoàn thiện tab Scan

- **Mỗi hồ sơ một file PDF trên Drive, đúng thư mục:**
  - `Tủ hồ sơ/CCCD/xã/điểm/ấp/tổ` cho bản thẻ.
  - `Tủ hồ sơ/Hồ sơ scan/…` cho bản tài liệu (mới).
- **Lưu lại hồ sơ đã sửa → cập nhật đè đúng file cũ trên Drive**, không sinh file trùng như trước. Đổi địa bàn thì file tự dời sang thư mục mới. File trên Drive đã bị xóa tay thì app tải lên file mới.
  - Hàm mới: `dayHoSoLenDrive`, `dayScanNhieu`, `taoPDFScan`, `duongScan`, `tenScanDrive`.
- **Bản Tài liệu (đơn vay, biên bản…):**
  - Bấm "Lên Drive" nay lên Drive thật (trước chỉ lưu ra máy).
  - Lưu bản tài liệu cũng tự đưa lên Drive như bản thẻ.
- **Chọn nhiều bản → Lên Drive:** từng bản vào đúng thư mục của mình. Trước đây gộp chung một file `_Nhieu-khach`.
- **Khai hàng loạt xong:** các bản vừa khai tự lên Drive.
- **Xóa hồ sơ:** bản PDF trên Drive vào thùng rác Google Drive (trước đây vẫn nằm lại trên Drive).
- **Lưu mà để trống xã/ấp/tổ thì giữ trống**, không tự điền địa bàn lần trước nữa (dễ gắn sai khách). Hộp khai vẫn điền sẵn lần trước để anh sửa. Điểm giao dịch vẫn tự suy ra từ ấp.
- **"Lưu tạm"** chờ chép ảnh xong mới lưu và báo; trước đây tắt app ngay lúc đó có thể mất ảnh.
- **Hộp xem hồ sơ:**
  - Bản Tài liệu hiện đủ các trang (trước đây để trống).
  - Có dòng "Trên Drive: …", nút "☁ Mở trên Drive" và "Cập nhật Drive".
  - Nút Sửa mở đúng hộp khai tài liệu.
- **Giao diện tab Scan:**
  - Khung vàng cảnh báo đổi thành lời nhắc nhỏ.
  - Bỏ nhãn "CCCD" lặp; chỉ báo "thiếu mặt sau" khi thiếu; thêm "chưa lên Drive".
  - Dải đáy hiện trạng thái Drive như các tab khác.

---

## 3.32 — 26/09/2026 22:17

Theo góp ý của anh Nhân sau khi xem 3.31.

### Nhận dạng công văn và báo cáo
- **Công văn không còn bị nhận nhầm thành báo cáo tháng.** Trước đây công văn nhắc tới "Tổ TK&VV", "nợ quá hạn", "giao ban"… đều bị coi là báo cáo. Nay app xét hai loại dấu hiệu **trước** khi so từ khóa:
  - Dấu hiệu văn bản hành chính: quốc hiệu, tiêu ngữ, `Số: …/…`, V/v, Kính gửi, Nơi nhận, tên loại văn bản.
  - Dấu hiệu bảng số liệu: STT, Đơn vị tính, Tổng cộng, Người lập biểu, "đến ngày", nhiều số tiền.
  - Hàm: `diemVanBan`, `diemBangSoLieu`, `khopMauNoiDung`.
- **Quét Drive theo tên file:** tên có số hiệu văn bản (958 KH-NHCS, 4079/NHCS-TDNN) thì là văn bản (`khopMauTenQuet`).
- **Chọn mẫu báo cáo khớp nhất,** không lấy mẫu đứng đầu danh sách nữa. Thứ tự ưu tiên: từ khóa ở tiêu đề → khớp nhiều từ khóa hơn → xuất hiện sớm hơn → từ khóa dài hơn. Sửa được 2 lỗi cũ:
  - "Chất lượng Tổ" có cột nợ quá hạn bị nhận thành Nợ quá hạn.
  - "KQGD toàn phòng" bị nhận thành KQGD xã.
- `rutNgay` đọc được ngày viết không dấu ("ngay 11 thang 9 nam 2026").

### Ảnh CCCD — bỏ mã hóa
- Ảnh mới lưu thẳng, không mã hóa. Bản PDF hồ sơ mặc định đưa lên Drive (`hsTuDrive` mặc định bật).
- Ảnh cũ đã mã hóa vẫn mở được bằng khóa cũ. Mở lần đầu, ảnh tự lưu lại dạng thường.
- Bỏ hộp cảnh báo "không mã hóa" khi lưu hoặc đưa PDF lên Drive.
- Bỏ mã PIN và các hàm mã hóa không còn dùng.

### Xóa hẳn → thùng rác Google Drive
- "Xóa hẳn", "Dọn dữ liệu thử", xóa thư mục trống và dọn bản dự phòng cũ nay đều **chuyển file vào thùng rác Google Drive** (`trashed:true`), không xóa vĩnh viễn nữa.
- Google giữ file 30 ngày rồi tự xóa; trong thời gian đó vẫn lấy lại được.
- Sửa mọi lời nhắc trong app cho đúng.

### Giao diện
- **Chuẩn hóa nút** (một khối CSS cuối phần giao diện):
  - Nút thanh công cụ cao 34px, bo góc 10px, viền 1.3px, chữ 12.5px đậm.
  - Màu: thường · đang bật · nút chính · nguy hiểm dùng chung một bộ.
- **Tab Văn bản:** dải chờ khai, hàng nút, hàng lọc xếp dọc. Trước đây chen chung một hàng và chữ "Tag" đè lên nút.
- **Dòng danh sách:**
  - Bỏ ngày/kỳ nếu tên file đã có; bỏ nhãn "Drive" trên mọi dòng.
  - Gộp các cảnh báo thiếu phân loại thành một nhãn "⚠ Thiếu …"; nhãn "Chỉ mục" đổi thành "Chưa tải về máy".
- **Thẻ biểu mẫu:** bỏ nhãn "ghim", tên nhóm, "Mẫu trắng" vì đã thể hiện ở chỗ khác; thêm nhãn "chưa lên Drive".
- **Tab Hôm nay:** thẻ "còn thiếu báo cáo" tối đa 3 dòng.
- **Tab Tháng:** bỏ nút "Ghép để xem" bị lặp ở dải đáy.
- **Điện thoại:** ẩn đồng hồ để nút ⚙ không rớt xuống dòng riêng; thanh Sắp xếp gọn thành một hàng vuốt ngang.

---

## 3.31 — 26/09/2026 21:54

Làm theo `BAN_GIAO_VIEC_CON_LAI v1.1`: đợt 0 (lỗi nền) + mục 1–11. Giữ nguyên kiến trúc một file `index.html`, không thêm thư viện, không đổi cấu trúc `D`. Chỉ thêm trường mới; code vẫn chạy được khi dữ liệu cũ chưa có các trường này.

### Dữ liệu cá nhân
- Bỏ danh sách **378 tổ** (mã tổ, tên tổ trưởng) khỏi mã nguồn công khai. Giữ cây xã → điểm giao dịch → ấp.
  - Máy đang có dữ liệu tổ **giữ nguyên**.
  - Máy mới: nhập tay ở Cài đặt › Địa bàn › Sửa danh sách tổ, hoặc Lấy từ Drive.
- Chữ mẫu xem phông: thay họ tên cụ thể bằng "Nguyễn Văn A".

### Đợt 0 — lỗi nền
- **Cài đặt › Địa bàn, Nạp Excel, Nạp JSON, Lấy cài đặt từ Drive**: viết lại hàm `demDiaBan()` bị mất.
- **Mẫu báo cáo giữ cờ** (`theoNgay`, `thuanXLS`, `coExcel`, `gopPGD`, `an`…) khi Lưu cài đặt tab Dữ liệu tháng hoặc Nạp Excel (`gopMauBaoCao`).
- `nangCapDanhMuc` (từ 3.30):
  - Không thêm lại báo cáo anh đã bỏ (ghi nhớ trong `D.cauHinh.maDaBo`).
  - Điền lại cờ còn trống cho máy đã mất cờ.
- Thả file vào ô kéo thả: chỉ xử lý **1 lần** (trước đây mỗi file vào khay 2 lần).
- **File Excel/CSV thêm từ ô ma trận hoặc tab Tháng:**
  - Vào đúng nhóm **Dữ liệu tháng**; nhận loại, kỳ, đơn vị từ tên file (kể cả tên dạng `NQH_Phuong_Gia_Loc_2026_09.xlsx`).
  - Duyệt xong quay về tab Tháng, ma trận nhảy đúng kỳ, báo "Đã lưu vào ô …".
  - Ô ma trận nay áp cho mọi loại file, không còn gán nhầm sang file PDF thêm sau đó.
- Duyệt **ghi chú** về tab Ghi chú (trước nhảy sang Biểu mẫu).
- Sổ ghi chép: nút **Thêm** chạy; **Enter giữa danh sách** thêm dòng; chấm trên lịch cập nhật ngay khi gõ.
- **Nhờ AI:**
  - Cột nghiệp vụ ghi vào **Mảng** (trước ghi vào Tag).
  - Cập nhật Tên văn bản; tên file trên Drive đổi theo.
  - Nút Đóng mở đúng trang.
- **Dán kết quả AI:** ghép theo số hiệu đầy đủ. Chỉ khớp phần số thì mặc định "Giữ app" và có cảnh báo.
- **Nạp dự phòng:** nạp đủ Lịch, sổ ghi chép, Biểu mẫu, Scan, Thùng rác. Vẫn là gộp, không xóa gì của máy.
- **Quét Drive / Nạp khay chờ:**
  - Đọc đủ mọi trang kết quả (trước bỏ sót khi thư mục có trên 200 file).
  - Không gắn nhầm file khi có file trùng.
- Đọc PDF lỗi một trang không làm treo cả file.
- Bản scan đã xóa không "sống lại" khi đồng bộ từ máy khác.
- "Duyệt tất cả" không đổi tên file Drive 2 lần.
- Chọn lẫn bản Thẻ và bản Tài liệu thì báo rõ, không lặng lẽ bỏ qua.
- **Lịch âm:** 29 tháng Chạp chỉ ghi Giao thừa khi tháng thiếu.
- **Nội dung:**
  - "63 tỉnh" → 34 tỉnh (từ 01/7/2025).
  - Hướng dẫn Xóa an toàn nói đúng việc Xóa hẳn.
  - Hướng dẫn khay `_Chờ xử lý` nói đúng giới hạn quyền của Google.
- **Thanh tab:** mở Biểu mẫu tô sáng đúng nút (trước tô nhầm Ghi chú).

### Mục 1–3: Ma trận tab Tháng
- 3 nút **Toàn PGD · Xã, phường · Điểm giao dịch** thay cho 3 nút kiểu xem bị trùng. Dùng lại `D.cauHinh.capThang`.
- **Địa bàn quản lý** `D.cauHinh.xaQuanLy`:
  - Mặc định Phường Gia Lộc và Xã Truông Mít.
  - Tick chọn ở Cài đặt › Địa bàn.
  - Ma trận mặc định chỉ hiện các xã này. Nút 👁 vẫn bật thêm xã khác được.
- **Chỉ đếm thiếu** cho PGD và xã quản lý, đúng **cấp áp dụng** của từng báo cáo. Ô không tính thiếu hiện dấu chấm mờ.
- **Dòng tổng ghi rõ** đơn vị nào thiếu gì, ví dụ "PGD: … · Gia Lộc: …". Dài thì rút gọn, bấm "xem đủ".
- Thẻ "còn thiếu báo cáo" ở tab Hôm nay dùng chung quy tắc này, số liệu khớp với ma trận.

### Mục 4–6: Bộ lọc, tab Biểu mẫu
- **Hàng lọc hiện sẵn:**
  - Biểu mẫu: Chương trình + Tag.
  - Văn bản: chỉ Tag.
  - Màn hình dưới 900px: thu vào nút Bộ lọc.
- **Lọc chương trình vay ở tab Biểu mẫu:**
  - Lọc theo nhóm của mẫu (trước luôn ra rỗng).
  - Lọc một chương trình thì kèm luôn nhóm Dùng chung.
- **Tag ở tab Biểu mẫu:**
  - 3 tag tự suy: **Dùng chung**, Mẫu trắng, Mẫu hướng dẫn.
  - Hộp sửa biểu mẫu có ô chọn tag.
- **Sắp xếp ở tab Biểu mẫu:**
  - Chạy theo thanh Sắp xếp; thêm cột **Số lần dùng**, **Năm VB gốc**.
  - Mặc định vẫn sắp theo số lần dùng như trước.
- **Thứ tự nhóm:** 📌 Đã ghim trên cùng → Dùng chung → các chương trình. Mỗi nhóm ghi số mẫu.

### Biểu mẫu Word — mở không phải tải về
- Thêm biểu mẫu là đặt tên chuẩn và tự đưa lên Drive vào `Tủ hồ sơ/Biểu mẫu/<nhóm>` (khi đã nối Drive).
- Nút **W** mở hộp chọn: **Google Docs/Sheets** (mặc định) · **chép đường dẫn ổ G** để mở bằng Word trên máy · Tải về (có cảnh báo tạo file).
- Nút **G**: mục chưa có trên Drive thì đưa lên rồi mở.

### Mục 7–9
- **Cây địa bàn:**
  - Mở/đóng chỉ bật tắt đúng nhánh, không dựng lại cả cây (đo dưới 10 ms với 378 tổ).
  - Mở một xã không còn bung hết các cấp con.
- **Gom file trùng theo dấu vân** (Cài đặt › Dữ liệu app, và nút Dọn ở Lập chỉ mục):
  - Anh chọn bản giữ; bản thừa vào Thùng rác.
  - Có nút Hoàn tác. Thay cho nút Dọn cũ (trước xóa thẳng khỏi chỉ mục).
- **Chuỗi hiệu lực** trong hộp xem văn bản:
  - Sơ đồ VB gốc → sửa đổi → thay thế, bấm mở được từng văn bản.
  - Văn bản hết hiệu lực có dải đỏ ở đầu.

### Mục 10–11
- **Google Picker** (Cài đặt › Google Drive, cần API key):
  - Chọn thư mục/file kho cũ → đọc nội dung → khay chờ.
  - Chỉ đổi tên, dời file khi anh bấm Duyệt.
- **Chốt kỳ** trên ma trận. Thêm hoặc duyệt file vào kỳ đã chốt phải xác nhận.
- **So 2 kỳ:**
  - Chọn kỳ tự do, hoặc bấm nhanh: so tháng trước, so đầu quý (tháng cuối quý trước), so đầu năm (T12 năm trước).
  - Chép 2 bảng Excel dạng Markdown kèm câu hỏi sang AI.
- **Nhắc giao ban** ở tab Hôm nay: trong 7 ngày tới có việc lịch chứa chữ "giao ban" mà còn thiếu báo cáo.

### Trường dữ liệu mới
Trong `D.cauHinh`: `xaQuanLy`, `xqlDaAp`, `maDaBo`, `kyChot`, `apiKey`, `tagDCDaAp`.
- Tất cả đều có giá trị mặc định khi chưa có.
- `xaQuanLy`, `maDaBo`, `boMau` đồng bộ qua `cauhinh.json`.
- `apiKey` chỉ lưu trong máy.

---

## 3.30 — 26/09/2026 20:58
- Nút "+ Thêm file" kiểu mới; danh sách Chờ khai ghi kho đích (`tenKho`).
- `nangCapDanhMuc()` bổ sung mẫu báo cáo mới vào danh mục đã lưu. Có lỗi N1, sửa ở 3.31.
