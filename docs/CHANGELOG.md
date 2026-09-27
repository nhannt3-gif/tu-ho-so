# CHANGELOG — Tủ hồ sơ

Ghi theo từng bản. Chi tiết lỗi/rủi ro và mã số (L1, R1, N1…) xem `docs/REVIEW.md`.

---

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
