# CHANGELOG — Tủ hồ sơ

Ghi theo từng bản. Chi tiết lỗi/rủi ro và mã số (L1, R1, N1…) xem `docs/REVIEW.md`.

---

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
