# CHANGELOG — Tủ hồ sơ

Ghi theo từng bản. Chi tiết lỗi/rủi ro và mã số (L1, R1, N1…) xem `docs/REVIEW.md`.

---

## 3.532 — 14/11/2026 — Lãi tồn: món không có lãi suất (TK 2)
- **Nguồn:** TK 1 so 2 mốc bản 3.531: tiền gửi khớp TW 20/20 Hội cả 2 mốc; lãi tồn giữ luật trừ lãi dồn mọi kỳ (kể cả chốt tháng — 30/09 chạy `lai_ton_ngay` gần TW hơn). Còn 2 tổ app thấp hơn giao ban ~1,7 tr (30/09 tổ 3405, 31/10 tổ 8202).
- **Sửa (`toLaiTonNgay`, js/22g):** món đã GD ở phiên mà không có lãi suất (trống / 0) → trước bỏ hết lãi tồn TH; nay như giao ban: lãi dồn = 0 → TH ≤ 1.000 đ thì bỏ, lớn hơn thì giữ. Chỉ khi file có cột lãi suất (`coCot`); file theo ngày cũ không có cột lãi suất giữ cách cũ.
- t352 +1 ý (K9).

## 3.531 — 14/11/2026 — Lãi tồn + tiền gửi theo đúng hàm giao ban (TK 2)
- **Nguồn:** TK 1 so app thật 3.528 / 3.530 với TW BC0438: 30/09 lãi tồn bằng giao ban từng tổ (chênh nền +84,7 tr chung 2 bên — việc riêng); 31/10 app 2.623,2 tr ≠ TW 2.246,4 tr — 3 điểm 2 phiên/tháng do gộp điểm (3405: 07 + 23; 3503: 12 + 18; 3502: 05 + 18). TK 1 gửi quy tắc giao ban.
- **Lãi tồn (`toLaiTonNgay`, js/22g — như `lai_ton_ngay` giao ban, QT-C-03 bổ sung):** phiên = Ngày GDXA của chính món trong tháng ngày số liệu (chưa tới → tháng trước); món đổi Ngày GDXA so kỳ trước (`toGdxaTruoc`, đọc Mẫu 31 tháng trước) → phiên sớm hơn; GD ≥ phiên: lãi dồn = dư nợ × lãi suất / 100 / 360 × (ngày số liệu − ngày GD + 1); TH ≤ lãi dồn × 1,05 + 1.000 → bỏ hết, ngược lại **chỉ trừ phần lãi dồn**; giữ QH; món vay trực tiếp không trừ. Giữ tầng nhận file 3.530 (30/09 không trừ — TK 1 xác nhận khớp giao ban từng tổ).
- **Tiền gửi tổ (`slT105To`, js/22 — như `mon_vay` giao ban, khớp BC0438 20/20 Hội):** duyệt mọi dòng Mẫu 31 theo thứ tự file (kể cả KU hủy, tất nợ — `B.hsGoc`); khóa "Sổ tiết kiệm 105", sổ gặp lần đầu lấy số dư dòng đó; cộng vào tổ của dòng khi có Hội (Mã ĐVUT 11–14); vay trực tiếp không cộng. `toSoTo` dùng số này (thẻ tổ, bảng xã / điểm, file đối chiếu). Tiền gửi từng khách giữ cách cũ.
- t352 +2 ý (đổi Ngày GDXA, vay trực tiếp), sửa ý trừ một phần; t396 +1 ý tiền gửi khóa sổ.

## 3.530 — 14/11/2026 — Lãi tồn: xét lãi dồn theo số tiền từng món (TK 2)
- **Nguồn:** anh xuất lại 2 mốc bằng 3.528 — 30/09 nhận đúng "chốt tháng thật" (823/20.817 = 4% món đã GD ở phiên còn lãi TH), nhưng **31/10 cũng bị nhận nhầm là chốt thật** (4.843/18.653 = 26% < ngưỡng 50%) → không bỏ lãi dồn (lỗi 3.527).
- **Sửa `toLaiTonNgay` (js/22g) — 2 tầng theo SỐ TIỀN:** lãi dồn của món = dư nợ trong hạn × lãi suất %/năm × số ngày từ ngày GD gần nhất tới ngày số liệu / 36500 (+5% +1.000đ). ① FILE có lãi dồn khi phần lớn (≥ 50%) món đã GD ở phiên còn TH có TH ≤ lãi dồn (file chốt thật: TH lớn hơn hẳn — 30/09 trung bình ~535 nghìn/món). ② File có lãi dồn: từng món chỉ bỏ khi TH ≤ lãi dồn; TH lớn hơn = lãi tồn thật → giữ. Món không có lãi suất theo tầng ①; kỳ theo ngày luôn coi có lãi dồn.
- Dòng `#` file đối chiếu: `lãi tồn=file có lãi dồn / chốt tháng thật (khớp/có LS) — bỏ … món, giữ … món`.
- Phép thử chung 1.4: C03-2 lãi TH 120.000 → 40.000 (đúng luật mới). t352 +2 ý, t396 sửa dữ liệu mẫu (có lãi suất).

## 3.529 — 14/11/2026 — Dọn hàm trùng (TK 2)
- Anh 14/11 "em làm tiếp phần tối ưu" · "app đã chạy cơ bản nên dần tinh gọn". Thước đo `kiem.py` hàm trùng 2 → 0, không đổi chức năng.
- `ghepPDFVao(moi, ds)` (js/04e) dùng chung cho Ghép PDF kỳ (`lamGhep`) và Ghép bộ biểu mẫu (js/09) — trước chép nguyên đoạn 13 dòng ở 2 nơi.
- `KHO` nguồn vốn (js/29) dùng `pbNguon` (js/47) thay bản chép.

## 3.528 — 14/11/2026 — Cỡ chữ tự động theo cỡ màn (TK 2)
- **Anh 14/11:** màn ở nhà 24" (1920), cơ quan 17" 1600×900 100%, laptop 17" để 125%; "không nên tự ẩn nút" · "em nên tự nhận và tối ưu cỡ chữ".
- **Cỡ chữ Tự động** (mặc định, khóa mới `coTu` — lưu riêng từng máy, `CH_RIENG`): `coTuDong` theo cỡ trang (px CSS) — rộng ≥ 1800 → 1.1 · thấp < 760 mà rộng ≥ 1400 (laptop 125% ~1536×730) → 0.95 · còn lại (1600×780, 1366…) → 1. Tự đổi khi kéo cửa sổ / đổi màn (`resize`). Không ẩn, không đổi nút.
- ⚙ Cài đặt › Hiển thị › Cỡ chữ: thêm nút **Tự động**; bấm Nhỏ / Vừa / To → dùng cỡ chọn (tắt tự động). Máy đã chọn cỡ trước đây → nay theo Tự động (bấm lại cỡ cũ nếu muốn giữ).
- Phép thử bố cục t260 thêm 3 màn thật của anh (1536×730, 1600×780, 1920×950): 84/84 — không nút nào cắt chữ / tràn. Phép thử mới t400 (7 ý).

## 3.527 — 14/11/2026 — Lãi tồn: nhận đúng file có lãi dồn + ngày phiên theo món (TK 2)
- **Nguồn:** TK 1 so app thật 3.525 với biểu TW BC0438 theo Hội (14/11): lãi tồn 30/09 lỗi app (3.522 bỏ lãi dồn cả file chốt tháng thật — file 30/09 không có lãi dồn: TW 2.201,1 tr, GB thô 2.285,9 tr, app 1.844,9 tr); 31/10 lỗi app hai chiều (điểm 3405 / 3503 không có ngày phiên → để thô; 8201/8202, 7901/7902 trừ quá tay — sai ngày phiên sau gộp xã).
- **Sửa `toLaiTonNgay` (js/22g):** ① ngày phiên theo TỪNG MÓN = cột Ngày GDXA của dòng Mẫu 31 (trống → ngày của điểm như cũ); ② kỳ chốt tháng chỉ bỏ lãi dồn khi file có lãi dồn: trong các món đã GD ở phiên mà không có lãi QH, ≥ 50% còn lãi TH > 0 → file xuất theo ngày (31/10) → bỏ; ít hơn → chốt tháng thật (30/09) → giữ (cách nhận biết TK 1 đề xuất). Kỳ theo ngày luôn bỏ (3.436). Kết quả xét lưu 1 lần trên bảng dòng.
- File đối chiếu: dòng `#` ghi thêm `lãi tồn=…` (bỏ / giữ, căn cứ) để TK 1 so.
- Tiền gửi lệch nhỏ (9 tổ 30/09, 1 tổ 31/10): **chưa sửa** — chờ TK 1 cho biết giao ban xác định "mỗi sổ 1 lần" theo cột nào (nghi dòng chỉ ghi số TK 14 số, không số sổ 10 số; sửa đoán có thể cộng trùng).
- t352 thêm 2 ý.

## 3.526 — 14/11/2026 — Chọn File Tổ trưởng theo ngày + sửa khung lọc 3.524 (TK 2)
- **Anh 14/11:** "tinh chỉnh lại tại sao chọn file tổ cũ" — xuất file đối chiếu T10 bị chặn (QT-C-09) tới khi anh xóa các bản theo ngày cũ.
- **Nguyên nhân:** `dsChonKy` (js/28) xếp các File Tổ trưởng theo CHỮ của kỳ — bản chốt `2026-10` đứng trước `2026-10-25` … `2026-10-30` → "bản mới nhất trong tháng" lấy nhầm bản ngày 30/10 thay bản chốt 31/10 → lệch ngày Mẫu 31 → chặn.
- **Sửa:** `dsNgayKy` / `dsSoKy` — xếp theo NGÀY (chốt tháng = cuối tháng; trùng ngày → ưu tiên bản chốt). Áp cho Danh sách tổ, Sao kê TK 104 / 105 (`tkMoiNhat`, `tkChonBan` — so ngày thay so chữ).
- **Khung LỌC ĐỊA BÀN (3.524, hồi quy đủ trượt t162 / t260 / t278):** kiểu 1 hàng chỉ áp chế độ gọn (`.gon`, chế độ ▦ Chip như cũ); hàng ô chọn co lại / xuống dòng trong khung khi nhiều ô (đã chọn xã → thêm Điểm GD, Tổ) — không tràn ngang; thiếu chỗ thì hàng ô chọn xuống dòng 2.
- Phép thử mới t399 (6 ý); t278 cập nhật theo bố cục 3.524.

## 3.525 — 14/11/2026 — File đối chiếu ghi giờ xuất + File Tổ trưởng (TK 2)
- **TK 1 nhờ (anh 14/11 "làm thêm ý này")**: xuất file đối chiếu 2 mốc bằng app thật, dòng đầu ghi bản app, ngày giờ xuất, File Tổ trưởng đã dùng.
- `slDCCsv` (js/22k): dòng `#` thêm `xuất lúc=dd/mm/yyyy hh:mm` (`slDCLuc`) + `File Tổ trưởng=<tên file> (ngày …)` hoặc `không có (điểm GD theo dự phòng)`; ghi "KHÁC NGÀY Mẫu 31" nếu lệch ngày (`slDCTT`). Không đổi số, không đổi cột.
- t325 thêm 1 ý.

## 3.524 — 14/11/2026 — Gọn giao diện các tab còn lại (TK 2)
- **Anh 14/11** "code hết 1 lần và gộp" (đề xuất rà 5 tab, đo 1366×768).
- **④ Khung LỌC ĐỊA BÀN** (CSS chung, màn ≥ 1100px): nhãn · số tổ / chip báo · 3 ô chọn · nút Tìm tổ / Chip / Về ghim **1 hàng** (trước: nhãn nổi trên viền + hàng ô chọn, khung 56px + lề 14px → 45px); ô chọn co theo chỗ trống (96–168px). Màn hẹp giữ như cũ. Bảng các tab lên cao ~13–20px.
- **① 📥 Nạp & KT:** nút thanh công cụ 28px → 1 hàng (trước ⋯ / ❓ rớt hàng 2) — bảng file lên 40px.
- **② Tổng hợp:** chip Nguồn vốn nhỏ (22px). **Giữ vị trí trên khung lọc** — anh đã chốt 3.157 (nguồn vốn là lọc lớn nhất) + 11/10 ("Nguồn vốn + Chương trình 1 dòng, cây lọc dưới").
- **③ Tra cứu:** chữ gợi ý ô tìm ngắn cho vừa ô (đủ ý ở chú thích chip). **Giữ cỡ chip Tìm theo 28px** — anh chốt 3.383 "nổi hơn".
- Không đổi chức năng. Phép thử mới t398 (10 ý).

## 3.523 — 14/11/2026 — Kiểm tra sau 30 ngày: chọn tổ + cột mới (TK 2)
- **Anh 14/11** (ảnh màn hình): "ghi rõ ngày giải ngân, mục đích, các cột còn trống và bị lệch" + "nên có ô tích chọn tổ hoặc chọn hết"; "ok code theo em" (có cột Hạn KT).
- Bảng tổ (`ktGNDsHTML`, js/22c): cột ☐ · Tổ (mã) · Ấp · **Ngày GN** (các ngày trong tháng) · **Hạn KT** (ngày GN sớm nhất + 30 ngày — 727; quá hạn tô đỏ) · Số hộ · Số món · GN (tr) · **Mục đích** (ngành kinh tế như phiếu Mẫu 06, gom "×n"). Bỏ cột Tháng GN; xã chỉ hiện khi ≥ 2 xã.
- **Ấp:** tra theo danh sách tổ của kỳ (`KT_K`, File Tổ trưởng — QT-C-10) như phiếu in; trước lấy ô ấp Mẫu 31 (thường trống) → "(chưa rõ ấp)".
- **Chọn tổ:** ô tích từng tổ (1 tổ × 1 tháng = 1 phiếu) + ô Chọn hết ở tiêu đề; `KT_GN_BO_TO`; nút Xem phiếu / dòng đếm chỉ tính tổ đang tích; tổ bỏ tích hiện mờ. Chọn hộ / món khi xem 1 tổ giữ như cũ.
- **Cột thẳng:** bảng co theo nội dung, tên tổ căn trái, tiêu đề + số căn phải.
- Phép thử mới t397 (13 ý).

## 3.522 — 14/11/2026 — Lãi tồn cuối tháng + tiền gửi sổ trên KU hủy (TK 2)
- **Nguồn:** TK 1 so 2 mốc 30/09 + 31/10 (Drive `KQ_DOI_CHIEU_2_MOC_30-09_31-10-2026.xlsx`): khớp tuyệt đối dư nợ, NQH, khoanh, tổ viên còn dư nợ, cho vay, thu nợ, KHĐ, đến hạn; lệch lãi tồn 31/10 (app +759 tr) và tiền gửi (app −268 tr / −172 tr).
- **A — lãi tồn (anh chốt 14/11: "món vay đã trả lãi đến ngày giao dịch coi như không có lãi tồn"; file 31/10 là bản chốt tháng nhưng lãi tồn TH có lãi dồn như bản ngày):** `toLaiTonNgay` (js/22g) áp cả kỳ chốt tháng (trước chỉ kỳ theo ngày, 3.436). `KHO.monGN` (KTGS sau giải ngân) chạy qua `toNap` trước → lãi tồn phiếu Mẫu 06 cùng số thẻ tổ. Với file chốt tháng không có lãi dồn: không đổi số.
- **B — tiền gửi TK 105 (lỗi app, QT-C-01):** dòng KU hủy vẫn loại khỏi món / tổ viên (3.138), nhưng sổ TK 105 trên dòng đó giữ thành dòng lặp (`slHuyLap`, js/22 — không mã KU, không dư nợ) → mọi chỗ cộng 105 đã đọc `B.lap` tự tính, mỗi sổ 1 lần. Gắn sau `slDanhRaTo` → không đổi luật ra khỏi tổ.
- Phép thử chung `tests/chung/truong_hop_mau.json` 1.3: C03-1 đặt Ngày GD 05/09 (giữ ý TH + QH), thêm C03-2 (GD đúng phiên → chỉ còn QH) — báo TK 1 chạy lại phía giao ban.
- Phép thử mới t396 (7 ý); t352 sửa ý "chốt tháng không đổi" theo luật mới.

## 3.521 — 14/11/2026 — Gọn chip các tab (TK 2)
- **Anh 14/11** "gộp và code 4 ý" (đề xuất đo 1366×768).
- **① Hồ sơ vay › 📒 Sổ hộ vay** (`hmSoHTML`, js/25c + CSS): chip Ngày nhập + loại hộ (Tất cả / Hộ cũ / Hộ mới / HSSV / Cần bổ sung / Chưa có tổ / Có cảnh báo) chung 1 khung chip nhỏ (22px); số hộ lên hàng nút ＋ Hộ mới (bỏ dòng "📒 Sổ hộ vay — n hộ"); dòng "✎ Nhập liệu — Sổ hộ vay" ẩn (chế độ rộng); hướng dẫn vào ⓘ Cách dùng sổ; nút Phóng to / In / PDF / Word / Gửi cùng hàng tiêu đề (màn ≥ 900px). Bảng y 493 → 338.
- **② Giao dịch xã:** chip mẫu nhỏ (22px, chữ 12px), chip + cụm nút chảy chung dòng (`display:contents`) → khung chip 134 → 93px (2 hàng chip + nút).
- **③ Phân bổ KH › 📋 Quyết định:** 6 nút (QĐ mới · Đọc QĐ · Nạp QĐ · Tải mẫu · Xuất · Dòng thời gian) 1 nhóm, nút nhỏ 26px (cột hẹp tự xuống dòng: 4 → 3 hàng); ☰ Xem gọn nhỏ.
- **④ Hồ sơ Tổ / Hồ sơ vay:** chip mẫu 12.5px, cao 26px.
- CSS áp riêng từng tab; Tổ TK&VV, Tra cứu, Sao kê, Tổng hợp giữ nguyên. Không đổi chức năng.
- Phép thử mới t395 (12 ý). t245 cập nhật (khung chip GDX dùng `display:contents`).

## 3.520 — 14/11/2026 — Dọn code màn cũ KTGS (TK 2)
- **Anh 14/11** "ok" (việc 1: dọn hàm màn cũ KTGS sau 3.514).
- Bỏ nhánh vẽ màn cũ ở `ktVeThe` (Định kỳ `dk`, Mẫu 04 `bc`, khung 1 tổ cũ) và lệnh nút cũ (`ktk.dx04 · kieu · so · goiYLai · loc · xuat · dkTich · dkMo · dkLich · che`, `kta.th`, `f22b.ktTich · ktChonTo`, `f22d.ktBCTich · ktBCNgay · ktBCXem`, `f22e.ktDKXem · ktDKIn`).
- Xóa 36 hàm không còn gọi (đo bằng `tests/rac.js`): js/22b `ktToanPGDHTML ktHoi38 ktBangToHTML ktTheHTML ktTich ktChonHTML ktXuatNut ktInNut ktXuat ktDoiKieu ktDoiSo ktGoiYLai` · js/22d `ktBCVe ktBCVeG ktBCTheoKHHTML ktBCGhi ktBCKH ktBCTheoKH ktBCTich ktBCTichAp ktBCNgay` · js/22e `ktKHBanDung ktDKVe ktDKVeG ktDKXem ktDKXemG ktDKIn ktDKTich ktDKLich` · js/56 `ktNguonKy ktNguonVe ktAThangDs ktAThangHTML` · js/56b `kt727Nut`; CSS chết `.kt-hoi .kt-chon .kt-kieu .kt-loc .kt-dk-bang .kt-bc-bang`. Giữ hàm Kế hoạch năm còn dùng (in theo tháng `ktDKGiaTri · ktDKTyLe · ktDKMo…`) và hàm phép thử khóa mẫu dùng (`ktDaChon`, `ktGoiY`, `ktChonTo`).
- **Sửa thiếu sót 3.514:** ↺ Gợi ý lại ở 🎯 Kiểm tra tổ chỉ tính lại cùng kết quả → nay mỗi lần ra lượt hộ khác (tránh hộ đã gợi ý, giữ hộ bắt buộc, hết thì quay vòng — như `ktGoiYLai` cũ) — `KTTO.lai`.
- Phép thử sửa theo hàm mới (KTTO): t106, t108, t110, t111, t119, t122, t125, t132, t319. t179 (khóa mẫu) không đổi. Thước đo: hàm không tới được 0, lớp CSS chết 0.

## 3.519 — 12/11/2026 — Sửa nút đổi chữ che ô Tên văn bản (TK 2)
- **Anh 12/11** (ảnh): "tab văn bản bị che, em ghi nhận sửa 1 lần".
- Nguyên nhân: 4 nút đổi chữ (3.437) đặt nổi `position:absolute; top:0; right:0` — nút cao hơn dòng nhãn nên đè lên ô nhập (đo: nút y 295–329, ô y 310–339).
- Sửa (`js/06-hop-thoai.js` `suaCho`, `css/app.css`): nhãn + nút trong 1 hàng flex `.o-chu-dau` (nút bên phải, tự xuống dòng khi hẹp), nút cao 22px. Chỉ ô Tên văn bản dùng nút này (`chuDoiNut` 1 chỗ).
- Phép thử mới t394 (10 ý: 1366 / 1100 tối / 420px — không đè, nút ≤ 26px, Aa Aa vẫn đổi chữ). t353, t374 đạt.

## 3.518 — 12/11/2026 — Nhận kế hoạch đã chốt về mã xã / Hội hiện tại (TK 2)
- **Anh 12/11:** "bản cũ anh đã chốt nhưng chuyển qua bản mới làm lại báo chưa chốt" → "code và gộp". Kiểm code: không chỗ nào khi lên bản tự xóa / đổi trạng thái chốt; nghi do Mẫu 31 sau sáp nhập (01/7/2026) đổi mã xã → khóa kế hoạch (năm · mã xã · mã Hội) khác.
- `js/80b-ktgs-kh-sl.js`: bảng 🔎 Kế hoạch đã lưu — dòng mã xã / Hội không còn trong số liệu có nút **↪ Nhận về xã / Hội hiện tại** (`KTKH.nhan`): tìm đích theo mã tổ trong kế hoạch ở Mẫu 31 mới nhất (nhiều tổ khớp nhất, `KTKH.dich`); hộp hỏi trước (bản cũ, số lần chốt, đích, khớp n tổ); chép lịch + lịch sử chốt (giữ đã chốt, ghi `nhan.tu`); bản cũ giữ nguyên; đích có bản nháp → nháp vào 🗑 Thùng rác (khôi phục được); đích đã chốt → không ghi đè. Mở đúng kế hoạch sau khi nhận; tổ đã gộp chỉ cảnh báo.
- Phép thử mới t393 (9 ý).

## 3.517 — 11/11/2026 — Kế hoạch năm lập theo Mẫu 31 đầu năm (TK 2)
- **Anh 11/11:** "KH năm lấy theo Mẫu 31 đầu năm" · "khi lập, còn in số liệu thì lấy đúng tháng KH" → "code và gộp".
- `js/80b-ktgs-kh-sl.js` (`KTKH`): màn 🗓 Kế hoạch năm **lập** theo Mẫu 31 **đầu năm = chốt 31/12 năm trước** (`KTKH.dau(năm)`; chưa nạp → tháng chốt gần nhất trước đó; không có → bản sớm nhất, dòng 📌 ghi ⚠) — thay "Mẫu 31 mới nhất" của 3.516. In theo tháng giữ như cũ (cuối tháng liền trước tháng kiểm tra).
- So danh sách đầu năm với **Mẫu 31 mới nhất** (`KTKH.baoHTML`): tổ đã gộp / đi khỏi → ⚠ **chỉ cảnh báo**, kế hoạch / bản chốt giữ nguyên, tháng in mà tổ không còn thì không in; tổ mới → 🆕 "in theo T… của ấp" hoặc ⚠ "ấp chưa có tháng". Số liệu đã mở theo kỳ cache `KTKH.c`.
- Phép thử t392 viết lại (15 ý: KH 2026 chưa có T12/2025 → bản sớm nhất + ⚠; KH 2027 → T8/2026; tổ gộp / tổ mới giả). t125 xóa tổ ở số liệu lập (`KTKH.Kdung`).

## 3.516 — 11/11/2026 — Kế hoạch năm theo Mẫu 31 mới nhất + 🔎 Kế hoạch đã lưu (TK 2)
- **Anh 11/11:** "kế hoạch anh đã ghi chốt lưu sao giờ lại không lưu" · "hiện tại theo Mẫu 31 mới đã sắp xếp lại các tổ, nhưng kế hoạch phải lưu và chạy theo Mẫu 31 hàng tháng" · "KH vẫn hiện đúng dữ liệu hiện tại, tổ đã gộp" · "nếu hiện tại tổ đã gộp thì chỉ cảnh báo" → duyệt A + B + C.
- Kiểm tra code: 3.513–3.515 không sửa chỗ lưu / chốt / đọc Kế hoạch năm (đối chiếu diff). Ảnh anh gửi: bản đang mở là nháp có từ trước, chưa có lần chốt nào → bản chốt (nếu có) nằm ở năm / mã xã / mã Hội khác hoặc máy khác — 🔎 để tìm.
- Gói mới `js/80b-ktgs-kh-sl.js` (`KTKH`, cắm rút): **B** màn Kế hoạch năm lấy Mẫu 31 **mới nhất đã nạp** (chốt tháng hoặc theo ngày — tổ hiện tại), không theo Kỳ đầu trang (`ktKHDsTo` đọc `KTKH.Kdung()`); In theo tháng giữ như cũ — Mẫu 31 cuối tháng liền trước tháng kiểm tra (bọc `ktKHVoiSL` đặt cờ `KTKH.muon`). **A** kế hoạch đã chốt giữ nguyên khi Mẫu 31 sắp lại tổ: tổ đã gộp / đi khỏi → chỉ cảnh báo ⚠ (dòng sẵn có), không sửa kế hoạch / bản chốt; tổ mới của ấp có tháng → 🆕 tự theo tháng ấp, không cần chốt lại; tổ mới ở ấp chưa có tháng → ⚠ cần xếp, bản chốt vẫn dùng để in. **C** 🔎 Kế hoạch đã lưu (chỉ xem): mọi kế hoạch trong máy + bản đã xóa trong 🗑 Thùng rác — năm · xã · Hội · số tổ · nháp · số lần chốt + ngày · trạng thái; ghi rõ bản có mã xã / Hội không còn trong số liệu; bấm Mở → đúng năm / xã / Hội.
- Không đổi chỗ lưu (`D.cauHinh.ktKH[năm|xã|hội]`), bản in 01/KH / 06 / 16 / 04.
- Phép thử mới t392 (13 ý). t389 sửa dòng 📌 Kế hoạch.

## 3.515 — 11/11/2026 — KTGS gọn chỗ chip (TK 2)
- **Anh 11/11** "rà soát giao diện tối ưu tránh chiếm quá nhiều chỗ của các chip" → "code và gộp" (chỉ trong KTGS).
- Đo ở 1366×768 (t391): 🎯 Kiểm tra tổ — khung chọn hộ 3 hàng (116px) → 1 hàng (34px), chip nhãn ngắn (👍 Tốt · ⚠ Cần QT · ⚖ Trung hòa · ✅ Hết tổ; 📜 Đúng luật · Mọi món — tên đủ + chú thích số hộ ở title), ↺ thay "↺ Gợi ý lại"; nút ▾ Hộ thành chữ nhỏ (dòng tổ đã tích 39 → 27px); bảng tổ bắt đầu y 358 → 262. 📅 Sau 30 ngày — chip Tất cả / Lần 1 lên hàng tháng giải ngân, nhắc 30 ngày vào dòng đếm phiếu: bảng y 335 → 262. Thanh 5 nút 32 → 28px, ‹ Lùi nhỏ.
- CSS chỉ trong `#kt-the` (chip tab khác giữ cỡ — t391 kiểm). Không đổi chức năng, bản in, dữ liệu.
- Phép thử mới t391 (10 ý đo chiều cao).

## 3.514 — 11/11/2026 — KTGS: 5 nút, Kiểm tra tổ nhiều tổ + kiểu chọn hộ, khai báo chọn hộ, Esc lùi (TK 2)
- **Anh 11/11:** "nút giờ em làm Kiểm tra sau 30 ngày, Kiểm tra tổ, Kiểm tra Hội, Kế hoạch năm, Khai báo" · "định kỳ coi như nằm trong kiểm tra tổ, kiểm tra tổ cho chọn nhiều tổ" · "kế hoạch năm để riêng, không link qua kiểm tra tổ… cho các kiểu chọn hộ: toàn hộ tốt, toàn hộ cần quan tâm, chia đều hoặc chọn hết tổ" · "theo đúng luật, nên có nút chọn 2 kiểu; chia 30% cần quan tâm gọi là trung hòa; 1 ô ngày chung cho 1 đợt" · "mẫu 04 in kèm bộ 06, 16, 15TD" · "cấu trúc trung hòa và số hộ cho khai báo" · "nút Esc để lùi về 1 cấp" · BC0437 thiếu tháng → "để trống".
- **Thanh 5 nút** (`ktKhoiHTML`, js/56): 🎯 Kiểm tra tổ (`dx`) · 📅 Kiểm tra sau 30 ngày (`gn`) · 🏛 Kiểm tra Hội (`hx`) · 🗓 Kế hoạch năm (`kh`, như cũ) · ⚙ Khai báo (`hdt`) + ‹ Lùi (Esc). Khóa cũ `dk` / `bc` đọc thành `dx` (`ktCheDo`) — dữ liệu cũ đọc được.
- **🎯 Kiểm tra tổ** (gói mới `js/80-ktgs-to.js`, `KTTO`): bảng tổ theo cây lọc, tích 1 hay nhiều tổ (chung `KT_DK_CHON` — giữ khi đổi cây); **Món xét** 📜 Đúng luật (món GN trước 01/01 năm kiểm tra — như Định kỳ cũ) / Mọi món còn dư nợ; **Kiểu chọn hộ** 👍 tốt · ⚠ cần quan tâm · ⚖ Trung hòa (% cần quan tâm) · ✅ hết tổ (`ktGoiY` thêm `loc`, kiểu `het`, Trung hòa theo %; trước: 2 hộ KHĐ); số hộ − / + cho đợt; ▾ Hộ sửa từng tổ; **1 ô ngày chung**; hàng nút ngay trên bảng 📋 Tóm tắt · 📄 06/TD · 15/TD · 16/TD · 04 (mỗi nút → hộp xem In / PDF / Word). Chưa khai ngày → phiếu ghi tháng kiểm tra như Định kỳ cũ (kỳ tháng → tháng sau; kỳ ngày → chính tháng). **✅ Hết tổ + 📜 Đúng luật + kỳ cuối tháng = bản in Định kỳ cũ giống hệt** (t390). Bộ khai báo mặc định ① Hội kiểm tra mọi chỗ (② chọn ở hộp In); dòng 🧾 Khai báo in + ✎.
- **⚙ Khai báo › 🎯 Chọn hộ kiểm tra** (`D.cauHinh.ktChonHo`): số hộ theo số tổ viên (6 / 7 / 8 ≤ 20 / ≤ 40 TV), Trung hòa % (30), kiểu + món xét mặc định; theo 🔒 khóa + 📜 nhật ký khai báo Hội (↶ khôi phục).
- **BC0437 đúng tháng** (`ktBC37Dung`): không có đúng tháng cần → điểm / xếp loại để trống (trước: lấy bản mới nhất) — Kiểm tra tổ, Hội cấp xã (03/BB-CX), Tóm tắt; dòng 📌 ghi "điểm để trống".
- **Esc lùi 1 cấp** (`KTTO.esc` gọi cuối `phimChung`, js/10 — chỉ khi Esc chưa dùng cho hộp / menu, không lùi khi đang gõ): ▾ tổ → cấp cây lọc (`pvLen`); ⚙ mục con → 🏛 Hội – xã.
- Bỏ: thanh Bắt buộc / Đột xuất + 4 thẻ con; màn Định kỳ, màn Mẫu 04 (gộp Kiểm tra tổ — hàm giữ cho Kế hoạch in theo tháng); nút "Tích tổ có lịch", hàng "Theo kế hoạch". `js/78` bỏ qua màn Kiểm tra tổ / Kiểm tra Hội (tự sắp hàng).
- Phép thử mới t390 (28 ý). Sửa theo màn mới: t106, t108, t109, t110, t111, t114, t118, t125, t134, t236, t237, t238, t273, t318, t383, t389 (phần kiểm số liệu / bản in / Word giữ). t179 (khóa mẫu) không đổi.

## 3.513 — 11/11/2026 — KTGS tinh gọn: thống nhất cách lấy số liệu (TK 2)
- **Anh 11/11** "tạm thời không phân chia bắt buộc hay đột xuất mà thống nhất cách lấy số liệu của các mẫu cho gọn; kiểm tra KH năm lấy dữ liệu như cũ… các mẫu khác theo dữ liệu chọn" · "khi chọn tổ cho in Tóm tắt, 06TD, 15TD, 16TD" · "Hội cấp xã 03CX vẫn giữ… gom lại không bỏ chức năng" · "lấy ngày chọn, chấm điểm ngày không có thì lấy cuối tháng trước" · "kiểm tra sau giải ngân chọn kỳ 31/5 thì hiện tất cả các món giải ngân trong tháng 5" · "không có phiếu kiểm tra 3 tháng".
- **Giữ như cũ:** Kế hoạch năm 01/KH + Định kỳ 06 + 16 — ô Tháng kiểm tra, Mẫu 31 chốt cuối tháng liền trước (`ktNguonVoi`). Bản in 06 / 16 / 04 / 01/KH không đổi (t179 khóa).
- **Theo Kỳ đầu trang:** 🎯 1 tổ, 🏛 Hội cấp xã (như trước) + **Mẫu 04** (bỏ `ktNguonVoi` — `ktBCVe / ktBCGiaTri / ktBCXem`; kỳ là ngày → tháng kiểm tra = chính tháng đó, `ktThangKT` chỉ ở Mẫu 04 / Sau GN) + **Sau giải ngân** (khoảng mặc định = tháng của kỳ chọn; kỳ là ngày giữa tháng → Mẫu 31 ngày đó, món GN đến ngày đó — `KHO.monGN(th, ky)` thêm tham số tùy chọn, không truyền thì như cũ; anh tự đổi ô từ–đến thì giữ trong kỳ đó — `KT_GN_KY`).
- **Chấm điểm BC0437 / BC0438** (chỉ có theo tháng): kỳ là ngày giữa tháng → cuối tháng liền trước (`ktBCKyChon`, áp ở `veKTGS`; ngày cuối tháng / có BC đúng ngày → như cũ). Chip BC0437 trên dải lọc so theo luật này.
- **Gọn nút (không bỏ chức năng):** hàng nút 1 tổ = 📋 Tóm tắt · 06/TD · 15/TD · 16/TD (bỏ 📋 Mẫu 04 — lập ở thẻ Báo cáo tổng hợp); Định kỳ bỏ 📋 Tóm tắt từng dòng / n tổ + 📄 15/TD (lặp). Hàm cũ giữ (`ktDX04`, `kttt.dk`).
- **Dòng 📌 Số liệu** mỗi màn (`ktSLDong`: Mẫu 31 kỳ · BC0437 tháng, ⚠ khi lệch): bảng tổ / 1 tổ, Mẫu 04, Hội cấp xã, Sau giải ngân (tháng + ngày), Kế hoạch năm (ghi giữ như cũ); Định kỳ giữ dòng "Số liệu in T…".
- Phép thử mới t389 (19 ý: Mẫu 31 giả ngày 15/08 + BC0437 giả T7 / T8). Sửa theo bố cục mới: t106, t237, t238, t273, t318.

## 3.512 — 11/11/2026 — Sao kê TK 105 của khách vay trong tổ — 3 trường hợp (TK 2)
- **Anh 11/11:** "sao kê hộ vay có TK105 nhưng chưa gán mã tổ" → "KH có dư nợ trong tổ nhưng TK 105 chưa có gán mã tổ" → "kiểm 2 loại: có dư nợ chưa có TK 105 → tạo mới; TK 105 còn hoạt động nhưng đã gỡ mã tổ → gắn lại; dư nợ 1 tổ nhưng TK 105 ở tổ khác — phân rõ" · "có dư nợ chưa có TK 105 em có làm rồi nên kiểm lại thôi" · "cho sao kê" · "lấy Mẫu 31 làm chuẩn, kiểm cấu trúc rút ra logic" · "em tự nội suy, anh không chắc".
- **Cấu trúc Mẫu 31** (`docs/COT_FILE_MAU.md`, file thật 19/10): mỗi dòng = 1 khế ước mang mã tổ của món vay; cột 173 "Sổ tiết kiệm 105" + 174 "Số dư tiền gửi 105" nằm trên dòng món vay (nhiều sổ → khế ước lặp dòng); không có dòng TK 105 riêng cho khách đang vay; ~1/4 món trống sổ.
- **Logic suy ra (chưa xác nhận — mỗi dòng ghi cột Căn cứ để anh đối chiếu hệ thống):** khách còn dư nợ ở tổ A, mọi dòng tổ A (cả dòng lặp) không có sổ 105 → ③ cùng khách có dòng tổ khác mang sổ → TK 105 ở tổ khác, chuyển về tổ A · ② không, nhưng có TK 105 (Sao kê TK 105 cùng kỳ / số TK hệ thống 13–14 số / số dư 105 Mẫu 31 / danh bạ) → chưa gán vào tổ, gắn lại · ① không thấy TK 105 ở đâu → mở mới. Tổ A có sổ → không báo.
- **Kiểm lại chức năng đã có** (chip "Chưa có TK 105" tab Tổ, 3.161): luật chip gộp số sổ Mẫu 31 + danh bạ + Sao kê 105 — khách có TK 105 mà dòng vay trống sổ bị coi là "đã có", không báo → nay hiện ở ②. Phép thử: ① ⊆ chip (cùng luật).
- Gói `js/76b-sk-105-to.js` (không gian tên `SK105T`, cắm rút — `SK_BC` 'tk0', nhóm Khách hàng, A4 ngang): 3 phần ① ② ③, chia theo tổ đang vay (lọc tới tổ): STT · Mã KH · Họ tên · Dư nợ trong tổ · Số TK 105 · Số dư 105 · Căn cứ · Việc cần làm (… tổ tên (mã)).
- Phép thử t388 (10 ý — Mẫu 31 T7 + T8 giả: P ①, Q ② có Sao kê 105, R ③ thêm món tổ khác mang sổ, S có sổ không ra; ① ⊆ chip tab Tổ; lọc đến tổ; Xem + Excel). t314 + t276 cập nhật theo báo cáo mới (70 báo cáo cũ giống hệt bản chụp).
## 3.511 — 10/11/2026 — 03/GDX: Tổ giao dịch chọn từ danh sách khai báo cán bộ (TK 3)
- **Anh 10/11:** "ds lấy từ khai báo cán bộ".
- Ô tên mỗi vai (Tổ trưởng · KSV · GDV chính · GDV) đổi từ ô gõ + gợi ý sang **ô chọn từ danh sách cán bộ** (⚙ khai báo đơn vị › cán bộ — dùng chung 12/GDX, `gdx.danhSachCanBo`), như 12/GDX: "— chọn —" + cán bộ, **đã loại người giữ vai khác** (trừ Tổ trưởng ↔ KSV) và người đã ở vai đó. Chưa có danh sách → cảnh báo + liên kết ⚙ khai báo cán bộ. Tên cũ không còn trong danh sách vẫn hiện ở ô (không mất dữ liệu).
- **Kiêm nhiệm theo vai** (anh 10/11 "chỉ có tổ trưởng kiêm bảo vệ, KS hay GDV có thể kiêm lái xe"): dòng Tổ trưởng chỉ có nút 🛡 Bảo vệ; KSV, GDV chỉ có 🚗 Lái xe; GDV chính không kiêm (`G4_O` cột 5, `g4KiemDuoc` — hàm `g4KiemDoi` không bật kiêm ngoài quy tắc). Kiêm cũ ngoài quy tắc (dữ liệu trước, hoặc nút PA 1 / PA 3 cho Tổ trưởng lái xe) vẫn hiện nút đang bật để tắt.
- **Bỏ mục Phương án đi đường (PA 1/2/3, 04/GDX)** ở 03/GDX (anh 10/11 "phần phương án bỏ, chưa cần") — kiêm Lái xe / Bảo vệ khai thẳng ở Tổ giao dịch; bỏ `G4_PA`, `g4PaGan`, lệnh `g4.pa` và phép thử PA. Cảnh báo "Đi đường: chưa có lái xe / bảo vệ" giữ.
- t382 (33/33) cập nhật theo ô chọn + kiêm theo vai + bỏ PA; tests/nhanh 52/52.

## 3.510 — 10/11/2026 — 03/GDX: Tổ giao dịch khung cố định + lưu phiên theo điểm (TK 3)
- **Anh 10/11** (ảnh 03/GDX khai từng người + chip vai): "làm trước mẫu 03 theo dạng khung cố định theo thứ tự tổ trưởng, ksv, gdv chính, gdv". TK 3 nhận lại vai App chính.
- **Anh 10/11** (sau demo): "chỉ cần khai đơn giản vậy thôi, Lái xe và BV là kiêm nhiệm — Tổ trưởng kiêm bảo vệ, Kiểm soát hoặc GDV kiêm lái xe, cho chọn thêm kiêm nhiệm; BV chỉ chung 1 dạng bảo vệ; sang Mẫu 03 đúng như cũ" · "có thể có 2 KSV nên có nút thêm nếu cần, GDV mặc định để 3, có thể thêm xóa".
- **👥 Tổ giao dịch** (js/26c `g4ToHTML`): bỏ khai từng người + bấm chip vai → **khung cố định 4 vai đúng thứ tự**: Tổ trưởng · Kiểm soát viên (＋ thêm KSV khi cần) · GDV chính (áp tải) · Giao dịch viên (mặc định 3 dòng, ＋ thêm / × bớt). Gõ hoặc chọn tên (gợi ý = danh sách cán bộ + người đã khai); cùng tên ở 2 ô = 1 người kiêm (vd Tổ trưởng kiêm KSV). Mỗi dòng có nút **kiêm nhiệm 🚗 Lái xe · 🛡 Bảo vệ** (Bảo vệ 1 dạng chung = bảo vệ đường đi + tại điểm; chỉ 1 lái xe; GDV chính áp tải không có nút kiêm). Enter / Tab chuyển ô kế.
- **03/GDX như cũ:** dữ liệu giữ `g4To = [{ten, vai}]` (hàm thuần mới `g4OGan`, `g4KiemDoi`; bỏ `g4VaiDoi` + lệnh chip cũ) → Phần I áp tải · lái xe · bảo vệ, Phần II mỗi vai 1 dòng + CCDC, 📘 Nhiệm vụ, đồng bộ 12/GDX, kiểm QT-19, PA 1/2/3, ⭐ tổ hay dùng không đổi. Người không còn vai Tổ GD nào tự bỏ. Không còn khai người ngoài (bảo vệ thuê) — theo anh "khai đơn giản".
- **Loại trừ cán bộ như cũ** (anh 10/11 "tổ trưởng có thể kiêm KSV, còn các nơi khác em loại trừ cán bộ như cũ"): mỗi người chỉ 1 vai Tổ GD, trừ cặp Tổ trưởng ↔ KSV. Gợi ý tên từng ô bỏ người đang giữ vai khác (ô KSV vẫn có Tổ trưởng); gõ người đang giữ vai khác → không nhận, báo "… đang là … — bỏ ở ô đó trước" (`g4VaiChan`).
- **💾 Phiên giao dịch theo điểm** (anh 10/11 "thêm chức năng lưu phiên theo điểm, có thể mở ra xem lại theo tháng, khi lưu có thể liên kết dữ liệu in mẫu 12"; "trong tháng cho lưu, khai bổ sung cho các phiên cũ, cảnh báo thiếu phiên nào, bắt đầu từ tháng 11"): mục mới ở 03/GDX — **💾 Lưu phiên: điểm · ngày GD** (Tổ GD + kiêm, phương tiện, công cụ hỗ trợ, GDV / KSV / Tổ trưởng 12/GDX; cùng điểm + ngày lưu lại = ghi đè) · **📂 Phiên đã lưu**: chọn tháng ‹ ›, tất cả điểm / điểm đang chọn, bảng Ngày · Điểm · Tổ trưởng · KSV · GDV chính · GDV · Lái xe · Bảo vệ, **📂 Mở** (điền lại 03/GDX), **🖨 12/GDX** (điền lại GDV · KSV · Tổ trưởng + chuyển sang 12/GDX), × xóa. **⚠ Thiếu phiên từ tháng 11/2026**: mỗi điểm có ngày GD hằng tháng, tháng chưa có phiên nào mà ngày GD đã qua → cảnh báo dưới nút + mục "Thiếu … phiên tháng …" trong hộp, **＋ Khai bổ sung** chọn đúng điểm + ngày (đặt cả bộ lọc địa bàn) để khai rồi lưu. Dữ liệu `D.cauHinh.gdx.g4Phien` (đồng bộ Drive cùng khối Giao dịch xã; nhật ký in không chụp). Hàm thuần `g4PhienTao` · `g4PhienGhi` · `g4PhienDung` · `g4PhienThieu`.
- **Dữ liệu gốc phân công** (anh 10/11 "số liệu phân công giao dịch này lưu lại để sau này dùng làm dữ liệu cho việc khác, như chấm công GD xã, thanh toán xăng, lệnh điều xe"; "em vẫn làm khai báo riêng cho mẫu này để tùy biến, ví dụ giờ giao dịch của phiên là cố định"): ⚙ khai báo riêng 03/GDX thêm **Giờ phiên cố định** (giờ đi · bắt đầu GD · kết thúc GD · giờ về; mặc định GD 07:30–11:00, anh sửa); mục mới **Km đi – về của điểm** (nhớ theo điểm, khai 1 lần). Mỗi phiên lưu kèm `gio`, `km` và **phiên bản dạng dữ liệu `v = 1`** (thêm trường sau này thì tăng v, phiên cũ vẫn đọc). **Chỗ đọc chung** `g4PhanCong(ds, tháng, điểm)` — mỗi người × mỗi phiên 1 dòng (vai, lái xe, bảo vệ, xe, giờ, km chỉ tính cho lái xe) cho chấm công / xăng / lệnh điều xe sau này. Hộp 📂 thêm cột Giờ GD · Km và **📊 Excel tháng** (bảng phân công `Phan cong To GD yyyy-mm.xlsx`).
- t382 (33/33): loại trừ + gợi ý từng ô, phiên lưu / tháng / Mở / 12/GDX / ghi đè / xóa, thiếu phiên + khai bổ sung; thứ tự ô, ＋ / × GDV, kiêm Lái xe / Bảo vệ, 1 lái xe, ＋ KSV, GDV chính không kiêm, 03/GDX Phần I–II. `tests/nhanh` thay ý chip vai bằng `g4OGan` / `g4KiemDoi`, thêm phiên + thiếu phiên + bảng phân công (53/53).

## 3.509 — 09/11/2026 — Biểu 07 cũ: giãn dòng theo mẫu gốc (TK 2)
- **Anh 09/11** "em xem lại biểu 07 hiện tại chưa giãn dòng và canh lề chuẩn 2,2,3,2" → "biểu 07 cũ".
- Đối chiếu mẫu gốc `tests/mau_goc/07pb.docx`: lề trên 2 · phải 2 · dưới 2 · trái 3 cm (app đã đúng — `omMg([20, 20, 20, 30])`, khung xem chia trang theo `data-tr-mg`); đoạn thân giãn 1,15 + cách sau 10 pt. App trước: 1,15 + cách trước 6 pt → dày hơn mẫu.
- Sửa (js/mau/07pb.js `P`): đoạn thân (canh đều) giãn dòng 1,3 + cách trước 6 / sau 4 pt (≈ 10 pt giữa đoạn); dòng căn giữa (Kính gửi, Kèm theo…) giữ 1,15. Word dựng từ bản in (`hsoDocx`) nên cùng thông số. Trang Thông báo vẫn 1 trang.
- 07/KH · 08/KH · 09/KH không đổi (đã thử giãn 1,2–1,3 thì chữ ký 07/KH bị đẩy sang trang 2 → trả lại).
- t381 (25/25) thêm `T381_SNAP` ghi khung xem đã chia trang (khung07, khungCu) để so bố cục.

## 3.508 — 09/11/2026 — Tên mới chương trình GQVL chung cả app (TK 2)
- **Anh 09/11** "cho tên mới, lúc trước làm chưa đúng, em gộp lên và sửa hết nếu ổn" (sau 3.507 Phân bổ; Biểu 07 cũ cũng ghi tên mới).
- Bảng tên chung: `TDN_CT['03']` (js/04e — danh mục hệ thống, tên đầy đủ) và `MAC_DINH.ctTen.GQVL` (js/02 — khai báo) = "Cho vay hỗ trợ tạo việc làm, duy trì và mở rộng việc làm"; `CT_VT_TEN.GQVL` (js/22g — 02/BG, 15/TD, sao kê) = "Hỗ trợ tạo việc làm, duy trì và mở rộng việc làm" (bảng này không có chữ "Cho vay" như các CT khác); `CT_NGAN['03']` (cột bảng tổng hợp) = "Hỗ trợ tạo việc làm" (tên dài làm vỡ cột).
- Dữ liệu đã lưu: `D.cauHinh.ctTen.GQVL` còn đúng tên mặc định cũ → tự đổi tên mới mỗi lần mở (js/10); tên anh tự sửa giữ nguyên. Giữ `js/03-doc-pdf.js` (bảng đọc chữ viết tắt GQVL khi tìm văn bản PDF cũ).
- §18 so đầu ra: t179 (bản in chuẩn khóa) 45/45 không đổi · t276: 66/70 báo cáo giống hệt, 4 bản (sao kê nhà đầu tư · theo chương trình, toàn PGD + 1 xã) chỉ khác đúng chữ tên CT — đã kiểm bằng thay tên mới về cũ thì băm khớp bản chụp cũ → ghi lại bản chụp. 02/BG (t163, t164, t180), 15/TD (t383), sao kê (t279, t387), Phân bổ (t381), Tổng hợp (t102) đạt. t276 thêm `T276_RA` (ghi nội dung để so khi đổi có chủ đích).

## 3.507 — 09/11/2026 — Phân bổ KH: tên mới chương trình 03 (TK 2)
- **Anh 09/11** "Chương trình Cho vay hỗ trợ tạo việc làm, duy trì và mở rộng việc làm" · "trong QĐ mẫu 07 em ghi Cho vay giải quyết việc làm" · "em sửa trước ở chỗ Phân bổ kế hoạch".
- `pbTenDung(ma, ten)` (js/47, `PB_CT_TEN`): mã 03 — dòng QĐ đã lưu tên cũ ("… giải quyết việc làm") hoặc trống → hiện / in tên mới; **dữ liệu QĐ đã lưu không ghi đè**. Áp ở `pbBieu07DL` (Biểu 07 cũ, 07/KH, 08/KH), `pbTenCT` (danh mục, Tờ trình 09/KH, xuất Excel), màn đối chiếu, bảng toàn tỉnh.
- Đọc QĐ (PDF / Excel): tên mới "hỗ trợ tạo việc làm…" cũng nhận là mã 03 (`PB_CT_TU`).
- **Chưa đổi** bảng tên chung của app (`TDN_CT`, `CT_VT_TEN`, `CT_NGAN`, khai báo `ctTen` — 02/BG, 15/TD, sao kê, Tổng hợp): anh dặn sửa Phân bổ trước, phần chung chờ anh chốt.
- Phép thử: `tests/nhanh` +2 (tên mới / giữ tên khác · đọc QĐ nhận mã 03), t381 +1 (07/KH ghi tên mới). Phép thử Phân bổ t252–t256, t355, t370–t372, t376, t380 đạt.

## 3.506 — 09/11/2026 — Sao kê theo chương trình vay (TK 2)
- **Anh 09/11** "thêm chức năng sao kê danh sách theo chương trình vay"; anh chốt: ô chọn 1 CT / Tất cả · chia Chương trình › Tổ › món · cột cơ bản, món còn dư nợ, A4 ngang.
- Gói mới `js/74b-sk-ct.js` (không gian tên `SKCT`, cắm rút — tự đăng ký `SK_BC` 'ct', nhóm Thông tin tổ): ô chọn sổ sẵn CT còn dư nợ trong phạm vi (số món · dư nợ, lớn trước) — lưu `skCH().ctLoc`; bảng STT · Mã KH · Họ tên · Số KU · Ngày vay · Hạn trả · Dư nợ · Quá hạn · Khoanh · Lãi tồn; vay trực tiếp nhóm riêng; cộng tổ · chương trình · TỔNG CỘNG; theo cây lọc địa bàn Sao kê. Nguồn Mẫu 31 qua kho chuẩn (`kcGoc`), tên CT `ctNgan` + `CT_VT_TEN` như sao kê nhà đầu tư.
- Phép thử t387 (8 ý: danh mục + khổ ngang, ô chọn đủ CT, chia nhóm, tổng = Mẫu 31, chọn 1 CT, lọc đến tổ, 👁 Xem + Excel, không lỗi).

## 3.505 — 09/11/2026 — Tra cứu KH: in danh sách tổ theo lọc (TK 2)
- **Anh 09/11** (ảnh Tra cứu › danh sách tổ: "cần xuất nhanh ds tổ có xã, điểm theo ds lọc khi cần, A4 dọc, các cột cơ bản"); anh chọn: nhóm theo Xã → Điểm GD, xuất In / PDF.
- Gói mới `js/58b-tc-to-in.js` (không gian tên `TCIN`, khung `MAU_IN` — mẫu thứ 3 dùng khung): nút 🖨 In DS tổ ở đầu bảng tổ (js/58, kiểm `typeof TCIN`). In đúng danh sách đang hiện (cây lọc + ô tìm + lọc / sắp từng cột — dòng bị lọc cột không in, giữ thứ tự sắp), cột STT · Tổ trưởng · Mã tổ · Ấp / Khu phố · Hội · TV · Có DN; dòng nhóm "Xã · Điểm GD · ngày GD — n tổ", cộng từng điểm, Tổng cộng cuối; tiêu đề cột lặp mỗi trang. TV / Có DN = `KHO.tvChuan` (QT-18) như bảng trên màn.
- Phép thử t386 (7 ý: nút, A4 dọc + 7 cột, đúng danh sách lọc cột, thứ tự, nhóm + tổng, mở lại sau khi đóng, không lỗi).

## 3.504 — 08/11/2026 — Thử nhanh QT + bộ giả "giống file thật" (Đợt 2 mục 5, 6) (TK 2)
- **Thử nhanh QT** (`tests/nhanh/thu.js`, node, không trình duyệt): +10 phép — QT-19 Tổ GD (đủ vai, TT làm bảo vệ điểm không kiêm KSV, GDV chính không lái xe / bảo vệ đường, thiếu TT, dưới 3 người, bấm vai, phương án đi đường), QT-20 chọn QĐ gần nhất (đúng xã + nguồn, cùng ngày → lập sau), QT-22 danh sách đối chiếu, khung mẫu in (điền ô, mẫu chưa đăng ký). 48/48 · ~180 ms.
- **Bộ giả "giống file thật"** (`tests/gia_that.js` — biến thể gianho31, QUY_CHUAN §18.3): Thông tin tổ trưởng TÊN XÃ / THÔN TOÀN HOA + khoảng trắng thừa, "Ông  …" tổ trưởng; Mẫu 31 tên khách thừa khoảng trắng, ô SĐT / ngày sinh trống, mã tổ mất số 0. Phép thử t385 chạy app với bộ gốc và bộ giống thật, so số tổ / khách / dư nợ, tên, địa danh, các màn chính.
- **Lỗi thật bộ giả bắt được (sửa):** tên thôn TOÀN CHỮ HOA từ File Tổ trưởng / Thông tin tổ trưởng hiện nguyên chữ hoa (cây tổ, mẫu in) — cùng kiểu lỗi tên xã 3.479 nhưng thôn chưa sửa. `toNap` (js/22g): tên thôn toàn hoa → cách viết Mẫu 31 cùng mã thôn, không có thì `tenHoaDau`; tên thường giữ nguyên (bỏ khoảng trắng thừa).
- §18 chỗ dùng: `tenThon` của cây tổ — 41 file (tab Tổ, Tra cứu, KTGS, Hồ sơ, GDX, mẫu in). So đầu ra bộ gốc: t179 (bản in chuẩn khóa) 45/45, t276 (64 báo cáo) 4/4, t373 đạt — không đổi.

## 3.503 — 08/11/2026 — Khung mẫu in chung MAU_IN (Đợt 2 mục 4) (TK 2)
- **Anh 08/11** "làm đợt tiếp theo, có thể gom 1 lần tất cả".
- Gói mới `js/31b-mau-in.js` (1 không gian tên `MAU_IN`): sổ mẫu (`dangKy` / `lay`), bản in (`trang` — qua `hsoTrang`), hộp xem + bộ nút chuẩn (`hop` — mở lại an toàn sau khi đóng, `chiXem` giữ ô đang gõ), khuôn Word tải khi cần (`khuon` → `js/khuon/<tệp>.js` ghi `MAU_KHUON`), điền ô (`dien` — thêm cách khi nhãn dính chấm), ghép .docx từ khuôn file gốc (`docx` — nhiều bản ngắt trang, chân trang số trang), `word` / `wordTai`.
- **Chuyển 15/TD, 03/BB-CX (js/56b) sang khung:** khuôn `js/khuon/kt727.js` (`tools/khuon_727.py`), bỏ `kt727Khuon`, `kt7Dien`, `kt7Trang`, `kt7Word`, `KT_DOCX_THEM`; bỏ móc ở `ktDocxLam` (js/22c — lõi Word KTGS về như trước 3.498). So trước / sau: bản in HTML 15/TD, 03/BB-CX giống hệt từng ký tự; thân Word (document.xml trừ phần cài đặt trang) giống hệt — gói khai `sau: ktChamMin` giữ dòng chấm mịn KTGS.
- §18 chỗ dùng: `ktDocxLam` (mọi Word KTGS — chỉ bỏ 1 dòng móc, t179 45/45), `MAU_IN` mới chỉ 56b dùng.
- Luật QUY_CHUAN mục 9.9: mẫu mới dùng khung; mẫu cũ chuyển dần khi sửa tới.
- Phép thử: t384 (khung, 11 ý: sổ, bản in, hộp mở lại / chiXem, điền, khuôn lỗi rõ, docx 1 / nhiều bản hợp lệ) · t383 20/20 (đổi sang `MAU_IN.word`).

## 3.502 — 08/11/2026 — Đợt 1 "gọn nền" sau đánh giá kiến trúc (TK 2)
- **Anh 08/11** ("rà soát cấu trúc code, đánh giá tốc độ phát triển và sự bền vững… ok làm đi"): Đợt 1 — không đổi chức năng, không đổi code chạy.
- **Tài liệu:** `CLAUDE.md` còn luật + thứ tự đọc (lịch sử bàn giao → `docs/luu_tru/CLAUDE_LICH_SU.md`); `docs/README.md` bản đồ 68 file (A đọc khi bắt đầu · B tra khi đụng · C kế hoạch còn dở · D lịch sử); `docs/CHANGELOG.md` chỉ giữ từ 01/11 (881 → 118 KB; cũ → `docs/luu_tru/CHANGELOG_DEN_3110.md`); nhật ký vai `docs/nhat_ky/APP.md` ghi phiên 3.489–3.502.
- **Luật gói mới = 1 không gian tên** (QUY_CHUAN mục 13): `tests/js_cu.json` = 143 file có trước; file mới không khai hàm rời toàn cục — `kiem.py` thước đo "hàm rời ở gói mới" (mốc 0). Code cũ chuyển dần khi sửa tới.
- **Sổ cấu hình `D.cauHinh`:** `tools/so_cau_hinh.py` → `docs/SO_CAU_HINH.md` (176 khóa: chủ, số chỗ, file dùng, mô tả — 51 khóa lấy được mô tả từ chú thích code) + `tests/cau_hinh.json`; `kiem.py` thước đo "khóa cấu hình chưa ghi sổ" (mốc 0). Đã thử: bỏ 1 khóa khỏi sổ / bỏ 1 file khỏi danh sách cũ → báo VƯỢT MỐC.

## 3.501 — 08/11/2026 — Rà tổng thể 3.480–3.500 theo QUY_CHUAN + hồi quy định kỳ (TK 2)
- **Anh 08/11** chọn "Rà tổng thể + hồi quy định kỳ".
- **Lỗi thật (sửa):** hộp 15/TD · 03/BB-CX (js/56b) đóng rồi mở lại không hiện — `dongHop` chỉ ẩn hộp, khung cũ còn trong trang nên `kt7Hop` tưởng hộp đang mở. Nay mở lại khi hộp đã đóng hoặc đổi mẫu. Đã tìm cùng kiểu ở chỗ khác: không có.
- **§11 bàn phím:** khai báo cán bộ hộp 03 dùng bộ phím chung (`phim-chung`: Enter / Tab sang ô kế); đổi ô chỉ dựng lại bản xem, không vẽ lại khung khai báo (giữ con trỏ).
- **Rà, không phải sửa:** onclick mới 0 (dòng 22e là dòng cũ tách ra); style trong chuỗi chỉ ở khuôn in (mm — như các mẫu cũ); mẫu không gọi mẫu khác; số liệu qua KHO (đọc thẳng biến kho 0, bảng gốc 0); gói mới cắm rút (`typeof`). §18: 3.498 đổi 02/BG sang `KHO.doiChieu` — `hsoTVTo` vốn = `KHO.toVien` nên kết quả không đổi; `hsoCTMon` → `ctTenMon` cùng thân (dùng ở 25, 25b, mẫu 06a, 09a, 0hsn).
- Phép thử t383: + bàn phím hộp 03 + mở lại sau khi đóng (20/20).

## 3.500 — 08/11/2026 — KTGS: khối riêng 🏛 Hội cấp xã cho 03/BB-CX (TK 2)
- **Anh 08/11** "mẫu 03 là kiểm tra Hội nên phải trên cấp tổ, em riêng ra cho dễ kiếm" — anh chọn: khối riêng thứ 4, bỏ nút 03 ở cấp tổ.
- Thanh khối KTGS: 📅 Bắt buộc · 🎯 Đột xuất · **🏛 Hội cấp xã** · ⚙ Khai báo (`che = 'hx'`; `ktCheDo`, `ktKhoi`, `ktKhoiHTML`, `ktVeThe` thêm 1 nhánh, gói 56b cắm rút — kiểm `typeof kt7HXVe`).
- Màn 🏛 Hội cấp xã (`kt7HXVe`, js/56b): bảng Hội – xã theo lọc xã + Hội — số tổ, thôn, khách, dư nợ, nợ quá hạn (triệu, %), xếp loại tổ BC0437; mỗi dòng nút 🏛 03/BB-CX mở hộp xem / In / Word (như 3.498). Số liệu theo Kỳ đầu trang.
- Bỏ nút 03/BB-CX ở cấp tổ (khối Đột xuất, Định kỳ, Mẫu 04); 📄 15/TD giữ ở cấp tổ.
- Phép thử: t383 19/19 (khối Hội cấp xã, không còn nút 03 cấp tổ); t238 thanh 4 khối.

## 3.499 — 07/11/2026 — Giao dịch xã: chip mẫu hiện đủ (TK 2)
- **Anh 07/11** "các chip mẫu biểu tab GDX em cho hiện ra đủ hết như bên tab hồ sơ vay, hồ sơ tổ": GDX nay 14 mẫu, khung trái hẹp → dải cuộn 1 hàng (3.334) chỉ thấy 4 chip. Đổi riêng GDX: chip xuống dòng hiện đủ (`.gdx2-du`), khung hẹp thì nhóm nút Tra cứu / Xem / ⋯ xuống hàng dưới (`.gdx2-dau-du`). Hồ sơ vay / Hồ sơ tổ giữ khung cuộn ‹ › (`cnHang`).
- Rà kỹ thuật 3.498 (anh 07/11 "rà coi có đúng hướng"): 03/BB-CX bỏ khoảng trắng thừa "Hội  Đoàn…" (HOIXA); t383 thêm 2 ý khối A (Định kỳ → 15/TD, Mẫu 04 → 03/BB-CX) — 18/18.
- Phép thử t245: ý GDX đổi từ "khung cuộn có ‹ ›" sang "đủ chip, hiện hết không khuất, không nút ‹ ›".

## 3.498 — 07/11/2026 — KTGS: 15/TD + 03/BB-CX (VB 727) (TK 2)
- **Anh 07/11** (gửi 2 mẫu 727: "đưa vào phần kiểm tra giám sát"; chốt: 15/TD in toàn bộ, nợ lãi = lãi tồn, 03/BB-CX sửa IV → III, V → IV, Word dùng khuôn từ file gốc).
- Gói mới `js/56b-ktgs-727.js` (cắm rút): 📄 **15/TD** — toàn bộ tổ viên còn nợ / lãi tồn / tiền gửi (`KHO.doiChieu`, QT-22 — dùng chung 02/BG), dòng khách + dòng món, Tổng cộng, A4 ngang; 🏛 **03/BB-CX** — Hội – xã của tổ, mục I tự điền (số tổ, thôn, khách, dư nợ / NQH / khoanh triệu đồng + tỷ lệ, xếp loại tổ theo BC0437), khai báo cán bộ NH lưu `ktIn.kt03`.
- Nút ở khối B (tổ đang chọn), khối A Định kỳ (tổ đã tích), khối A Mẫu 04 (chỉ 03/BB-CX).
- Word theo khuôn gốc: `tools/khuon_727.py` → `js/khuon/kt-khuon-727.js` (nạp khi cần), `ktDocxLam` gọi `KT_DOCX_THEM[mau]` nếu có; hàng tiêu đề 15/TD lặp mỗi trang; cột số 9–10 pt cho không ngắt dòng.
- Chung: `KHO.doiChieu(t)` (js/29), `ctTenMon(m)` (js/22g) — 02/BG đổi sang dùng, kết quả không đổi (t163, t164, t180 đạt). Mẫu KTGS khóa (t179) không đổi.
- Phép thử: t383 (16 phép, có kiểm XML hợp lệ).

## 3.497 — 07/11/2026 — Dọn cấu trúc theo QUY_CHUAN (soát 07/11), không đổi chức năng
- **Anh 07/11:** "em soát lại các mẫu mới … ý anh là cấu trúc code" → em soát 6 chỗ lệch; "em làm tuần tự và gộp lên rồi tiếp không cần hỏi lại".
- **① Mục 9.4 — mẫu không gọi mẫu khác:** phần dùng chung các mẫu Phân bổ (khai báo nền ô `pb07Cach / pb07GT / pb07OK`, chữ `pb07O / pb07SoQD / pb07NgayDai / pb07Ten0`, bọc cỡ chữ `pb07Boc`, `pbNgayVN`) tách sang **`js/mau/0pb.js`**; Biểu 07 cũ (07pb) và 07/KH · 08/KH · 09/KH (07kh) cùng gọi phần chung.
- **② Mục 1 — mẫu không đọc biến giao diện:** danh sách ô khai báo truyền qua `K.ds` (js/48 `pb07DsO`), bỏ đọc `PB07.mau` trong mẫu; ô 🤖 khai `tuFn` ở mẫu; ngày đọc cấu hình qua `KHO1.doc('pb')` thay `pbDL()`.
- **③ Mục 1.2 — giao diện không tự tính:** phép tính Tờ trình 09/KH chuyển sang **js/47 `pbToTrinh` + `pbQDCuoi`** (thuần, QT-20); js/48c chỉ vẽ.
- **④ Mục 1.3 — tách lớp:** 👥 Tổ giao dịch tách khỏi js/26b sang **`js/26c-gdx-to.js`** (dữ liệu · nghiệp vụ thuần `g4KiemTo / g4Dong03II / g4PaGan / g4VaiDoi` (QT-19) · giao diện); js/26b chỉ còn mẫu in (gọi 26c có kiểm `typeof` — cắm rút).
- **⑤ Mục 4 — sổ QT:** thêm **QT-19** thành phần Tổ giao dịch, **QT-20** Tờ trình 09/KH, **QT-21** 07/KH · 08/KH dùng chung phân bổ, Biểu 07 cũ giữ.
- **⑥ Mục 11 — bàn phím:** khung Tổ giao dịch: Enter / Tab ô tên kế, Shift lùi, ô cuối Enter thêm người, vẽ lại vẫn giữ con trỏ; Tờ trình 09/KH: Enter / Tab ô đề nghị dòng kế.
- **Kiểm:** 14 bản in (Biểu 07 cũ, 07/08/09KH, 03/06/07/09/10/11/14/15/GDX, 03/GDX có tổ, Nhiệm vụ) **trùng từng ký tự** trước / sau dọn; t381 +2 (bàn phím, `pbToTrinh` thuần), t382 +3 (bàn phím ×2, QT-19 thuần).

## 3.496 — 07/11/2026 — Giao dịch xã: Tổ giao dịch trực quan (03/GDX) + 📘 Nhiệm vụ Tổ giao dịch
- **Anh 07/11:** "mẫu 03 cho chọn trực quan, 1 số quy tắc em đọc kỹ VB — ví dụ tổ trưởng tổ GD kiêm bảo vệ"; "tạm cứ cho khai thủ công tất cả các thành viên"; "thêm 1 phần in nhiệm vụ … các thành viên tổ giao dịch tóm gọn để thực hiện"; "1 tờ chung bố trí gọn, đủ nhiệm vụ, chữ nhỏ" → "Được code".
- **👥 Tổ giao dịch** (js/26b, mục `g4to` của 03/GDX và Nhiệm vụ): mỗi người 1 dòng gõ tên (gợi ý từ danh sách cán bộ) + chip vai Tổ trưởng · KSV · GDV chính · GDV · Lái xe · BV đường · BV tại điểm; 1 Tổ trưởng, 1 GDV chính (bấm ở người khác tự chuyển); PA 1/2/3 theo 04/GDX gán lái xe, bảo vệ đường; ⭐ lưu / chọn lại tổ hay dùng (không chụp vào nhật ký in); tổ trống lấy sẵn Tổ trưởng · KSV · GDV của 12/GDX, khai xong đồng bộ ngược 12/GDX (ô chọn 12/GDX hiện cả tên khai tay — `gdxCB` js/26).
- **Kiểm tra quy tắc VB 4368** (mục II.2, II.7 — cảnh báo, không chặn): < 3 người; thiếu Tổ trưởng / GDV chính (đỏ), KSV (vàng); Tổ trưởng bảo vệ tại điểm + kiêm KSV (đỏ); GDV chính lái xe / bảo vệ đường (đỏ, là người áp tải); thiếu lái xe / bảo vệ đường / bảo vệ tại điểm; lái xe = bảo vệ; trùng tên.
- **03/GDX tự điền:** Phần I áp tải = GDV chính, lái xe, bảo vệ, phương tiện / biển số, công cụ hỗ trợ (khai 1 lần), nơi đi / đến (trụ sở PGD ↔ điểm GD, chọn để chấm); Phần II mỗi (người, vai) 1 dòng + CCDC theo vai (chọn để trống); quá số dòng thì tờ 2 dài thêm.
- **📘 Nhiệm vụ Tổ giao dịch** (chip mới, A4 dọc 1 mặt, chữ 8,5 pt — 9 / 9,5 pt cảnh báo sang mặt 2): quy định chung 4 ý + bảng 6 vai × ① trước khi đi ② tại điểm ③ sau phiên, tên thành viên cạnh vai; tóm tắt VB 4368 mục II, III.
- **Phép thử:** `tests/t382.js` (mới, 24).

## 3.495 — 07/11/2026 — Giao dịch xã: rà 03/GDX theo mẫu gốc
- **Anh 07/11:** "em rà mẫu GDX làm mẫu 03". So với VB 4368 trang 34–35: ô Lái xe — Nơi đi / Nơi đến mỗi nơi + 2 dòng chấm; Phần II mặc định tờ 1 = 1 dòng, tờ 2 = 8 dòng + chỗ ký (như mẫu trắng; lựa chọn 1|8 · 3|8 · 1 tờ 4 dòng); dòng trống Phần II cao 15 mm, Phần I 8 mm.
- **Sửa lỗi CSS** (js/26b): chiều cao dòng riêng từng bảng (03, 10, 11, 14/15/GDX) bị luật chung `table.g4-b tbody tr` đè → nay đúng chiều cao đặt; mọi mẫu vẫn trọn trang (t380).

## 3.494 — 07/11/2026 — Phân bổ KH: 07/KH · 08/KH · 09/KH theo QĐ 4686
- **Anh 07/11:** QĐ 4686/QĐ-NHCS ngày 21/10/2026 (thay QĐ 86/2014) + mẫu trắng Biểu 05, 07, 08, 09/KH. Anh chốt: "Biểu 07 cũ vẫn giữ, không được bỏ, tạo thêm mẫu mới — để in lại cái cũ khi cần"; "mẫu 09 khi trình sẽ lấy số dư của chương trình, QĐ trước đó, là 1 quy trình ngược của phân bổ"; 01/02/03 làm sau; "em làm 1 lần tất cả".
- **07/KH** (QĐ Ban Đại diện HĐQT xã …/QĐ-BĐD, căn cứ QĐ 56/QĐ-HĐQT · QĐ 4686 · QĐ tỉnh · Nghị quyết xã, Điều 1–3, TM. Ban Đại diện – Trưởng ban) và **08/KH** (QĐ Giám đốc PGD …/QĐ-NHCS khi được Nghị quyết xã giao): `js/mau/07kh.js`, dùng chung số liệu phân bổ + chặn khớp QĐ (QT-16) + hộp xem / In / PDF / Word của Biểu 07; chọn mẫu ở đầu hộp (nhớ lần chọn, mặc định Biểu 07 cũ). Bảng thôn → CT: Số tăng trưởng (tăng/giảm) · Số dư nợ năm; chip "đủ các thôn" (mặc định chỉ thôn có tăng / giảm như Biểu 07 cũ — `pbBieu07DL` thêm `apDu`). Cỡ chữ mặc định 13,5 (vừa 1 trang QĐ).
- **Khai báo riêng** 3 mẫu mới lưu `ch.bKH` (tách `ch.b07` của Biểu 07 cũ); số / ngày QĐ 56 và QĐ 4686 điền sẵn (⌨ sửa được); Nghị quyết xã, số văn bản, Trưởng ban, Giám đốc: để chấm hoặc khai.
- **📤 Tờ trình 09/KH** (`js/48c-pb-to-trinh.js`, mục thứ 5 tab Phân bổ): chọn năm · xã · nguồn; mỗi CT có QĐ: Số tăng trưởng đã giao = cộng dồn tăng / giảm các QĐ trong năm (sửa tay được, ↺ bỏ), KH hiện tại = Đến 31/12 QĐ gần nhất, dư nợ thực tế Mẫu 31 kỳ mới nhất + KH còn trống (tham khảo), Đề nghị điều chỉnh anh gõ, Số dư nợ năm = KH + đề nghị; lưu `KHO1 'pb'.tt`; in tờ trình căn cứ QĐ gần nhất của tỉnh, danh mục chỉ CT có đề nghị (hoặc đủ CT); bản chụp đã in `pb.b09`.
- **Không đổi:** Biểu 07 cũ (bản in y hệt — t253 · t256 đạt); `pb07Lap` chỉ tách hàm bọc cỡ chữ `pb07Boc` (dùng chung), `pb07OK` đọc danh sách ô theo mẫu đang chọn.
- **Phép thử:** `tests/t381.js` (mới, 22).

## 3.493 — 07/11/2026 — Giao dịch xã: 8 mẫu GDX theo VB 4368
- **Anh 07/11:** "các mẫu nào dựng nhanh đơn giản em cứ dựng theo đúng chuẩn gắn mẫu đã làm, mẫu 12 đã làm ổn rồi". VB 4368/HD-NHCS hiệu lực 01/10/2026 (Phụ lục II, 15 mẫu 01–15/GDX).
- **Mẫu mới** (`js/26b-gdx-4368.js`, cắm vào js/26 qua `GDX_THEM`): 03/GDX Bảng kê theo dõi GDX (A4 ngang, 2 tờ — Phần II tờ 1 · tờ 2 chọn số dòng) · 06/GDX Giấy đề nghị tiếp quỹ kiêm tạm ứng tiền và thẻ TK · 07/GDX Nội dung phổ biến cho KH vay vốn (chữ cố định, SĐT PGD khai 1 lần) · 09/GDX Báo cáo thẻ TK tại điểm (A4 ngang) · 10/GDX Bảng kê kiểm quỹ cuối phiên · 11/GDX Biên bản thẻ TK hỏng, mất · 14/GDX Phiếu xuất kho · 15/GDX Phiếu nhập kho. Bố cục / chữ / cột theo mẫu trong VB; ô không có thông tin để chấm (dòng chấm tự lấp đủ chỗ, không tràn), không tự tạo số.
- **Dùng chung với 12/GDX** (cùng phiên): 2 dòng tên cơ quan đầu mẫu, điểm GD (khối LỌC ĐỊA BÀN), ngày GD, GDV · KSV · Tổ trưởng tổ GD — đổi ở mẫu nào cũng áp cho các mẫu kia.
- **js/26 (móc chung):** `GDX_THEM` + 7 chỗ gọi (gdxChup / gdxDung / gdxMucHTML / gdxTom / gdxThanhHTML / gdxXem / gdxTenFile); `gdxRuotHTML` lấy điểm theo `m04 ? ma04 : m12SelectedDiem`; `gdxDoiMau` tự chọn điểm theo `cap==='diem'` (như cũ với 04/TD, 12/GDX, Bảng kê). Mẫu cũ không đổi.
- **Chưa làm (để sau, anh 07/11):** 01, 02, 04, 05, 13/GDX; 08/GDX lấy bản chuẩn bên Giao ban.
- **Phép thử:** `tests/t380.js` (mới, 19 — gồm đếm trang khi in: 03 = 2 tờ, còn lại 1 trang).

## 3.492 — 07/11/2026 — Word 10A khóa trang như bản in (TK 2)
- **Anh 07/11:** "làm tiếp đi" (phương án 1 — khóa trang 10A cho cả Word; 3.454 khóa chỉ áp bản in vì Word khi đó chưa theo bản in).
- `hsoDocx` (js/25b, khối nền ô): lớp `tr-sang-in` → ngắt trang cứng cả Word; bảng có `data-cao-w` → chiều cao hàng riêng cho Word. `js/mau/10a.js`: khung tổ viên Word thấp hơn bản in **0,5 mm / hàng** (`HSO_10A_CAO_W`, js/25) — bù phông Word / LibreOffice rộng hơn trình duyệt (~2 dòng ở trang 2); chữ trong ô không bị cắt.
- Kết quả (LibreOffice): Word 10A **4 trang**, trang 3 "b) Tổ phó", trang 4 "III." — cả khi tên Trưởng ấp / Thư ký dài (khung bớt hàng).
- `t358` (Word: 2 chỗ ngắt cứng, hàng Word thấp hơn bản in).

## 3.491 — 07/11/2026 — Word 07b, BBLV đúng số trang (TK 2)
- **Anh 07/11:** "gộp và làm tiếp" — 2 mẫu còn lệch sau 3.490.
- `hsoDocx` (js/25b), chỉ khối nền ô: bảng ghi cỡ chữ / giãn dòng trên thẻ bảng (07b lịch trả nợ 12 pt) → Word theo đúng (trước: chữ 14, dòng cao hơn → dư 1 trang); khối "không cắt giữa trang" (`break-inside:avoid` — BBLV tình huống) → Word giữ liền các đoạn (`keepNext` / `keepLines`).
- Kết quả (LibreOffice, Bản mẫu): **17/17** mẫu nền ô Word cùng số trang bản in. Mẫu không nền ô vẫn xuất như cũ.
- `t379` thêm 2 kiểm tra.

## 3.490 — 07/11/2026 — Word các mẫu nền ô giống bản in (TK 2)
- **Anh 07/11:** "gộp và code tiếp" (kế hoạch Word giống bản in).
- **Hiện trạng đo:** hàm xuất Word `hsoDocx` (js/25b) chỉ đọc lớp (`c`, `j`, `thut`, `s14`…), bỏ qua style viết thẳng mà mẫu nền ô dùng → Word canh trái hết, không thụt dòng, chữ 13, giãn dòng tự động; 3/17 mẫu lệch số trang.
- **Sửa (chỉ trong khối nền ô `.om-goc` / `.om-co`; mẫu khác xuất như cũ — so Word Sổ hộ vay, Phê duyệt NH, 01/BG, 02/BG cũ ↔ mới giống hệt từng byte):** đọc canh lề, thụt đầu dòng, lề trái, cỡ chữ thân mẫu / từng đoạn / từng chữ, nén chữ; giãn dòng → **cố định đúng pt** (CSS 1,15 = 1,15 × cỡ chữ; Word "1,15" cao hơn ~15 %); cách đoạn gộp như bản in (lấy số lớn, không cộng), không nhận cách âm; dòng 1 dòng có dãy chấm → bớt chấm cho vừa (Word không nén chữ); hộp "Mẫu số…" neo trên–phải → khung nổi; khối chú thích neo đáy → khung đáy trang; ô nhiều dòng (chữ phủ dòng chấm ẩn) → đoạn chữ + dòng trống cho đủ; bảng không khai `data-w` → lấy cột theo bản in (trước: cột rộng 0, bảng phình nhiều trang).
- **Kết quả (LibreOffice đếm trang, Bản mẫu):** 15/17 mẫu Word = bản in (trước 14/17 nhưng chữ 13, canh trái). Còn lệch: **07b** Word +1 trang (dòng trống cuối bảng lịch trả nợ tràn), **BBLV** bản mẫu (tờ hướng dẫn) Word −1 trang (lệch từ trước). Khóa trang 10A vẫn chỉ áp bản in (Word dài hơn ~2 dòng ở LibreOffice → khóa sẽ thành 5 trang).
- Lớp cách đoạn có sẵn (`tr` / `tr2` / `tr3`, `sau` / `sau2` — Thông báo KH dư nợ 07pb) vẫn ưu tiên như hàm cũ (hồi quy đủ bắt ở `t253`).
- Phép thử mới `t379`. Hồi quy đủ.

## 3.489 — 06/11/2026 — Tab Tổ mở lần đầu dưới 300 ms (TK 2, Đ6 kế hoạch dọn)
- **Kế hoạch dọn** (`docs/KE_HOACH_DON_NEN.md` mục 8, anh duyệt 04/11 làm tuần tự; anh 06/11 "gộp rồi làm tiếp"): Đ6 còn thiếu — tab Tổ lần đầu ~350 ms (3.477), mục tiêu < 300 ms.
- **Đo** (máy ảo, bộ giả 25.000 khách `tests/gia31`, mở tab Tổ cấp PGD): lần đầu `toKhach` mỗi tổ bị tính **2 lần** (danh sách tổ viên phạm vi `toTVPV` + bảng số PGD `toSoTo`); `skNhomDH` luôn tính ngày chuyển QH (phiên điểm GD) kể cả món đến hạn còn xa; hạn CCCD mỗi khách tính 2 lần.
- **Sửa:** ghi nhớ CHỈ trong 1 lần vẽ thẻ tổ (`TO_KH_TAM`, js/22gb `toVeThe` → `toVeThe0`; js/22h `toKhach` → `toKhach0`; js/22g `toCCCDHan` → `toCCCDHan0`) — xong lần vẽ là bỏ, không giữ số sang lần sau (lý do TK 3 không ghi nhớ lâu dài vẫn giữ). `skNhomDH` (js/22h): đến hạn ngoài 2 nhánh → 0 ngay (đổi thứ tự xét, kết quả như cũ).
- **Kết quả** (cùng máy, 3 lượt): lần đầu **312–333 → 173–273 ms**; các lần sau ~120–140 ms như cũ. **So cũ ↔ mới:** HTML tab Tổ cấp PGD, cấp xã, 4 tổ giống hệt từng ký tự.
- **Sửa lỗi có từ 3.474–3.476** (hồi quy đủ phát hiện ở `t147`, `t229` — có cả trên 3.488): menu nhỏ `moMenuTL` (js/11) gọi qua `data-lenh` → `ev.currentTarget` là cả trang → "getBoundingClientRect is not a function", menu không định vị được; nay lấy đúng nút được bấm.
- Phép thử mới `t378` (có / không ghi nhớ bằng nhau 60 tổ; `skNhomDH` = công thức cũ 301 món × 3 mốc kỳ). Hồi quy đủ.

## 3.488 — 06/11/2026 — Khung xem trước: mất dấu chữ HOA dòng đầu trang (TK 3)
- **Anh 06/11** (ảnh khung xem BBLV: "CONG HOA XA HOI CHU NGHIA VIET NAM"): "in ra có dấu đầy đủ, em xem lại bản view, nêu lõi sửa cho chuẩn".
- **Lõi:** bộ in chuẩn (js/05, `TR_CSS`) đặt vùng nội dung mỗi trang `.tr-nd` là `overflow:hidden`, mép trên đúng bằng đầu dòng thứ nhất. Dấu trên chữ HOA (Ộ, Ò, Ã, Ủ, Ĩ, Ệ) nhô cao hơn khoảng dòng (dòng 1,15) → phần nhô bị cắt. Trên máy Windows (phông Times New Roman, chỉ số ascent thấp hơn phông Linux) dấu mất hẳn ở khung xem; bản in không cắt nên vẫn đủ dấu. Dòng chữ thường (Độc lập…) và tiêu đề có lề trên không bị.
- **Sửa chung (mọi mẫu dùng bộ in chuẩn):** `.tr-nd` bỏ `overflow:hidden`, thay `clip-path:inset(-3mm 0 0 0)` — trái · phải · dưới vẫn cắt như cũ (bảng rộng, chống tràn trang), riêng mép trên chừa 3 mm (nằm trong lề trang ≥ 15 mm, trống); `display:flow-root` giữ khối riêng như cũ (lề không gộp). Chia trang, số trang, bản in không đổi (t179 chuẩn khóa 45/45).
- Phép thử t366 thêm ý: mép trên không cắt, mép dưới vẫn cắt.

## 3.487 — 06/11/2026 — BBLV: gạch dưới tiêu ngữ chuẩn (TK 3)
- **Anh 06/11** (ảnh đầu BBLV có dòng "--------"): "em gạch chuẩn dưới tiêu ngữ".
- Dòng gạch "--------------------------------" dưới tiêu ngữ thay bằng **kẻ liền mảnh 0,5 pt, dài đúng bằng dòng "Độc lập – Tự do – Hạnh phúc"** (theo thể thức văn bản — Nghị định 30/2020), cùng cách các mẫu khác đang dùng (`hsoKe` + `omRong` đo bề rộng chữ 13 pt đậm — như 01/TĐCK, quốc hiệu `hsoQH`). In / PDF / Word cùng 1 đường kẻ. 06A không có quốc hiệu nên không đổi.
- Vẫn 1 trang / biên bản (t366 đạt).

## 3.486 — 05/11/2026 — Hồ sơ vay › BBLV / 06A: chọn món theo cả Hội; bảng chọn món hiện đủ cột (TK 3)
- **Anh 05/11** (ảnh Hồ sơ vay › BBLV): "chỗ này khi lọc Hội nên cho hiện cả Hội ra luôn" · "có chỗ chọn" · "cột STT nhỏ lại, cho hiện đủ cột".
- **Lọc tới Hội / điểm GD / xã, ô tổ để "— Tất cả tổ —"** → bảng chọn món hiện hộ còn nợ của **mọi tổ trong phạm vi** (dòng nhóm "Tổ · ấp — n hộ", xếp xã › Hội › tổ); nút nhóm (Nợ quá hạn, Khoanh, 3T KHĐ…), Tích hết, tìm, đếm chạy trên cả Hội; bản xem / In / PDF / Word gộp biên bản các tổ có món đã tích (mỗi hộ 1 BBLV; 06A mỗi món 1 phiếu), tên file theo phạm vi. Chọn 1 tổ ở ô tổ → như cũ (chỗ chọn: ô tổ của bộ lọc). Không còn nhắc "Chọn 1 tổ" cho 2 mẫu này khi đã chọn tới Hội.
- **Bảng chọn món đủ cột:** luật CSS chung "cột đầu bảng dính, rộng tối thiểu 150px" (css/app.css dòng ~1175, cho bảng thường) làm cột ô tích rộng 150px → bảng tràn, mất cột Lãi tồn / Tình trạng. Bỏ luật đó riêng cho `.hsn-bang`; cột STT hẹp lại, lề ô 4px, Tình trạng nhiều chip tự xuống dòng; ẩn Số KU khi khung < 680px.
- **Kỹ thuật:** `HSN.pvTo` (tổ trong phạm vi qua `KHO.dsTo` + `pvLoc`), `HSN.ds` nhận mảng tổ, `HSN.tHien`, `HSN.pvNhieu` → `hsoLap` (js/25b) gộp như 3.484; js/25c bỏ nhắc chọn tổ khi mẫu `nhieuTo` có phạm vi. t377 thêm 2 ý.

## 3.485 — 05/11/2026 — Sổ quy tắc tên: thêm BBLV, 06A (TK 3)
- **Anh 05/11:** "ok theo em" (đề xuất thêm 2 mẫu vào sổ quy tắc tên).
- `TC.loaiMau` (js/49) thêm `06a → 06A`, `06atd → 06ATD`, `bblv → BBLV`: **chữ trong tên file giữ như cũ** (trước đây tự suy ra đúng chữ này), nay được nhận là **mẫu hồ sơ vay** → bản scan BBLV / 06A đã ký gắn khách lưu vào thư mục **Hồ sơ vay** (trước: Hồ sơ scan).
- Chỗ dùng sổ: tên file Scan / Hồ sơ vay (`tcLoaiMau`), nơi lưu Scan (`sxLaHSV` js/41). Mẫu khác không đổi. Phép thử: tests/nhanh (tcLoaiMau), t207 thêm ca scan BBLV / 06A.

## 3.484 — 05/11/2026 — BBLV / 06A: in 1 lần theo Hội đoàn thể (nhiều tổ) (TK 3)
- **Anh 05/11:** "anh cần in 1 theo Hội đoàn thể hoặc từng tổ".
- **Tab Tổ:** danh sách nhiều tổ (chọn Hội / xã / toàn PGD + chip Nợ quá hạn / Nợ khoanh / 3 tháng KHĐ) → 📄 BBLV / 📄 06A → hộp có nút **🖨 In 1 lần cả danh sách: <phạm vi> — n tổ · m hộ**; vẫn chọn được từng tổ như 3.483. Tổ xếp Xã › Hội › tên tổ.
- **Hồ sơ vay chế độ nhiều tổ** (`HSO.nhieu`): cột trái thay bảng chọn 1 tổ bằng khung tóm tắt (từng tổ: số hộ · số món), ô In 2 mặt, nút **↩ Về từng tổ**; bản xem / In / PDF / Word gộp đủ biên bản (mỗi hộ 1 BBLV; 06A mỗi món 1 phiếu) của mọi tổ, tên file theo phạm vi. Đổi tổ ở bộ lọc → tự về chế độ 1 tổ.
- **Kỹ thuật:** `hsoLap` (js/25b) — mẫu có đặc tính `nhieuTo` (BBLV, 06A) + `HSO.nhieu` → lập `M.lap` từng tổ rồi nối `x.ds`; `HSN.tuTo` nhận mảng tổ; `HSN.nhieuHTML` khung tóm tắt; lệnh `hsn.boNhieu`, `to.hsnCa`. Mẫu khác không đổi (không có `nhieuTo`). t377 thêm 5 ý.

## 3.483 — 05/11/2026 — Tab Tổ → BBLV / 06A tích sẵn theo loại nợ (TK 3)
- **Anh 05/11:** "em liên kết 2 biên bản qua bên tab Tổ luôn" (bước 2, sau 3 chip riêng 3.482).
- **Nút 📄 BBLV · 📄 06A** ở đầu danh sách tab Tổ khi đang chọn chip Nợ quá hạn / Nợ khoanh / 3 tháng KHĐ (cả danh sách 1 tổ lẫn phạm vi xã / Hội / toàn PGD).
  - Danh sách 1 tổ → mở thẳng Hồ sơ vay: đúng tổ, đúng mẫu, **tích sẵn mọi món đúng loại nợ đang lọc** (cờ `f.qh` / `f.kn` / `f.khd` của bộ chọn món HSN — cùng nguồn với bảng chọn món), giữ kỳ đang xem.
  - Danh sách nhiều tổ → hộp chọn tổ (tên tổ · số hộ); Hồ sơ vay lập theo từng tổ, in xong quay lại chọn tổ tiếp.
- **Kỹ thuật:** `HSN.tuTo(mẫu, tổ, loại)` (js/mau/0hsn.js, dùng chung 2 mẫu); tích sau khi Hồ sơ vay đổi tổ / mẫu qua `HSO_DEN.ap` (js/25c — `hsoVe` đổi tổ tạo `HSO` mới nên tích trước bị mất). Nút + hộp ở js/22gb (`toHsnNut` / `toHsnMo` / `toHsnChon`), danh sách phạm vi js/22h (`toHsnDsTo`). Lệnh `to.hsn` · `to.hsnChon` (data-lenh).
- Chỗ dùng `HSO_DEN` (KTGS Mẫu 06 → 06A, `hso06aMo`) giữ nguyên: vẫn đặt người vay + món như cũ (t366 đạt). Phép thử t377 thêm 6 ý.

## 3.482 — 05/11/2026 — Tab Tổ: chip lọc Nợ quá hạn · Nợ khoanh · 3 tháng KHĐ riêng (TK 3)
- **Anh 05/11:** "làm từng bước, trước tiên em làm chip lọc các loại Nợ quá hạn, Nợ khoanh, 3 tháng KHĐ riêng, hiện tại chung 1 chip" (bước 1 của việc lọc + in theo Xã · Hội · Tổ, rồi lập BBLV / 06A hàng loạt).
- **Tách** chip "Có nợ cần xử lý (QH · khoanh · KHĐ)" (nhóm Cần xử lý, `TO_LOC` js/22g) thành 3 chip: **Nợ quá hạn** (dư nợ quá hạn > 0) · **Nợ khoanh** (nợ khoanh > 0) · **3 tháng KHĐ** (món không giao dịch 3 tháng — `slKHD`, như cũ). Số trên chip = số khách.
- Dùng ở mọi phạm vi bộ lọc (toàn PGD / xã / điểm GD · Hội / 1 tổ) — danh sách, In, Excel theo chip đang chọn như các chip khác.
- Chỗ dùng chip cũ `xl`: chỉ danh sách `TO_LOC` + nhóm `TO_LOC_NHOM` (đã kê, không phép thử / báo cáo nào gọi theo mã). Phép thử mới t377.

## 3.481 — 05/11/2026 — Bản in: bỏ tô nền dòng tiêu đề bảng (TK 3)
- **Anh 05/11:** "dòng tiêu đề không cần fill màu, in ra hơi rối, các mẫu khác cũng vậy nên bỏ".
- **Bỏ nền `th`** ở mọi mẫu in có tô: BBLV bảng nhiều món (js/mau/bblv.js, nền xám 3.480), Mẫu 12 / Mẫu 04 GDX (`.m12-table th`, js/26), sao kê cấp Hội (js/22h), tóm tắt KTGS (js/71), nội dung họp giao ban (js/88, 3 bảng), thông báo kết luận (js/89, 2 bảng). Tiêu đề vẫn đậm, canh giữa.
- **Giữ nguyên:** thanh xanh A- / B- / C- của 01/TGTV (đúng mẫu NHCSXH); màu dòng nhóm / tổng trong sao kê, thông tin tổ (không phải dòng tiêu đề); màu trên màn hình app.
- **Chuẩn khóa:** ghi lại `tests/chuan/gdx_m04.html`, `gdx_m12.html` (anh duyệt đổi) — t179 45/45.

## 3.480 — 05/11/2026 — Hồ sơ vay › BBLV: mặc định in 1 mặt; sửa tắt 2 mặt vẫn in 2 mặt (TK 3)
- **Anh 05/11:** "mẫu BBLV in 1 mặt mặc định cho an toàn" · "do hiện tại bị lỗi có 1 số trường hợp tắt in 2 mặt vẫn ra 2 mặt".
- **Nguyên nhân lỗi:** bấm ô ☐ In 2 mặt (06A, BBLV — bộ chọn hộ HSN js/mau/0hsn.js) chỉ ghi lựa chọn, **không vẽ lại khung xem trước** → 🖨 In in đúng khung đang hiện (bản cũ 2 mặt, có trang trắng chèn).
- **Sửa:** bấm ô → vẽ lại khung xem trước ngay (06A cũng hết lỗi này). **BBLV có công tắc riêng** `bblvHaiMat` — **chưa khai = 1 mặt**; bản in BBLV gắn cờ 1 / 2 mặt cho bộ in chuẩn (đặc tính mẫu `haiMat`, `hsoLap` đọc chung). 06A và KTGS vẫn dùng công tắc In 2 mặt cũ (không đổi). Sổ cài đặt: thêm khóa `bblvHaiMat`.
- **Đơn vị tiền** (anh 05/11 "số tiền vay hiện đơn vị đồng"): BBLV dạng bảng (nhiều món) ghi "; đơn vị: đồng" ở tiêu đề mục 1 (cột Số tiền vay, Nợ gốc, Nợ lãi); dạng 1 món vẫn ghi "… đồng" sau từng số. Vẫn 1 trang.
- **Bảng nhiều món gọn hơn** (anh 05/11 "bảng tốn nhiều dòng quá"): số KU 9pt không bẻ dòng, mục đích + 3 ngày 9pt, lề ô nhỏ, cột chia lại → mỗi món còn 3 dòng (đúng 3 ngày).
- **Tình trạng ghi ngắn** (anh 05/11 "không cần diễn giải số tháng"): Nợ quá hạn · Nợ khoanh · 3 tháng KHĐ · Lãi tồn — hàm riêng `bblvTT` (js/mau/bblv.js, anh "dùng hàm riêng cho các loại đặc thù"); `HSN.nhan` dùng chung (bộ chọn món 06A / BBLV) giữ nguyên.
- **Bảng chuẩn trình bày** (anh 05/11 "tiêu đề canh giữa đều đẹp… theo quy chuẩn ngân hàng"): tiêu đề in đậm, canh giữa cả ngang lẫn dọc, nền xám nhạt; ô canh giữa theo chiều dọc; tiền canh phải, ngày canh giữa, "Cộng" canh giữa; cột chia lại (TT 7 · CT·KU 28 · Mục đích 24 · Số tiền vay 22 · Ngày 18 · Nợ gốc 22 · Nợ lãi 17 mm · Tình trạng phần còn lại) → số trăm triệu không tràn cột.
- **Bỏ số tháng nợ trên biên bản** (anh 05/11 "quá cụ thể"): dạng 1 món dòng "- Tình trạng:" bỏ "(≈ N tháng)", nhãn thống nhất với bảng: ☐ Nợ quá hạn ☐ Nợ khoanh ☐ 3 tháng KHĐ ☐ Lãi tồn (cả bản trắng). Nút lọc trên màn hình (Lãi > 3T · 6T · 12T) giữ nguyên để CB chọn món — không in ra biên bản.
- **Phép thử** t366: mặc định 1 mặt (không trang trắng), ô bỏ tích sẵn; tích → chèn trang trắng, công tắc KTGS không đổi; bấm ô → khung xem trước đổi ngay.

## 3.479 — 05/11/2026 — Sửa: tên xã viết hoa đầu từ (TK 3)
- **Anh 05/11:** "sao tên xã lại viết hoa hết, phải viết hoa đầu từ như trước".
- **Nguyên nhân** (lỗi của 3.470 / 3.472): tên xã lấy ưu tiên File Tổ trưởng — cột TENXA của file này ghi **toàn chữ hoa** ("PHƯỜNG GIA LỘC") → mọi tab hiện tên xã chữ hoa.
- **Sửa** (lõi `slXaTenTu`, js/22): đếm phiếu tên **không phân biệt hoa thường** (thứ tự ưu tiên giữ nguyên: File Tổ trưởng → Mẫu 31 → danh bạ → danh mục); hiển thị cách viết có chữ thường (Mẫu 31 — viết hoa đầu từ); chỉ có bản toàn chữ hoa → tự viết hoa đầu từ.
- **Phép thử:** t373 thêm 2 ý (File Tổ trưởng chữ hoa → hoa đầu từ; bộ số liệu không còn tên xã toàn chữ hoa).

## 3.478 — 05/11/2026 — Phân bổ KH: báo đứt chuỗi QĐ (TK 3)
- **Anh 05/11:** "khi nhập KH cơ bản sẽ liền mạch nhưng đôi khi có vài chương trình bị đứt quãng, không khớp — nguyên tắc luôn theo QĐ mới nhất, và báo bị đứt chênh ở QĐ nào, chương trình nào".
- **Lõi** `pbDutChuoi(dsQD, năm, ngưỡng)` (js/47, chạy được trong node): theo (xã, chương trình, nguồn) trong năm, QĐ theo ngày rồi lúc ghi — Đã giao của QĐ sau khác Đến 31/12 của QĐ trước (QĐ trước không ghi Đến 31/12 → Đã giao + Tăng/giảm) quá ngưỡng lệch (⚙ ngưỡng đối chiếu, mặc định 1 triệu) → 1 dòng: QĐ bị đứt · QĐ trước · chương trình · xã · nguồn · Đã giao · Đến 31/12 trước · chênh. **Chỉ báo — KH vẫn theo QĐ mới nhất** (không đổi cách tính Diễn biến).
- **Bảng ⚠ Đứt chuỗi QĐ** (js/48b `pbDutHTML`): cuối danh sách 📋 Quyết định (mọi năm) và đầu 📈 Diễn biến (theo năm + bộ chọn xã / chương trình / nguồn); bấm dòng = ✎ sửa QĐ đó. Bảng cơ bản: dòng có đứt ghi **⚠ đứt ±x** (dòng tổng cộng dồn); **Tách từng QĐ**: ô QĐ bị đứt tô màu, rê chuột thấy chênh. In có bảng; Excel thêm sheet `Dut chuoi`.
- **Lưu QĐ:** câu hỏi "n dòng đứt chuỗi" nay liệt kê từng dòng: chương trình · xã · Đã giao khác Đến 31/12 QĐ trước bao nhiêu.
- **Phép thử** mới `t376` (6 ý lõi + 8 ý màn); t255 thêm sheet Excel.

## 3.477 — 05/11/2026 — Tab Tổ mở nhanh hơn (TK 3, Đ5 + Đ6 kế hoạch dọn)
- **Đ6 — đo lại** (máy ảo, bộ giả 25.000 khách `tests/taogia.py`, Mẫu 31 hai kỳ): mở tab Tổ lần đầu **470 ms**, các lần sau ~160 ms. Đo từng hàm: `toTV` (danh sách tổ viên mỗi tổ, gọi 60 lần) chiếm phần lớn lần đầu — với mỗi khách lại lọc **toàn bộ** dòng Mẫu 31 của tổ để tìm dòng của khách đó (tăng theo bình phương số khách / tổ) và tính lại danh sách KHĐ cho từng tổ.
- **Sửa** (js/22g `toTV`): gom dòng theo khách 1 lần / tổ; danh sách KHĐ tính 1 lần / kỳ (`K._khd`). Kết quả không đổi (cùng thứ tự dòng). Sau sửa: lần đầu **~350 ms**, các lần sau **~150 ms** (dưới ngưỡng 300). Không ghi nhớ `toKhach` (nhiều tab dùng chung, ghi nhớ dễ lệch số khi dữ liệu đổi).
- **Đ5 — rà lại:** đã xong từ trước — Theo dõi nợ đã gỡ (3.399), mini Giao dịch xã đọc qua `KHO`, thước đo `kiem.py` "đọc thẳng biến kho" = 0, "đọc thẳng bảng gốc" = 0. Phần đọc sâu kỳ riêng của tab (KTGS, Sao kê, Tổng hợp) là thiết kế "kỳ là của tab" (RA_SOAT_KHO_2410 mục 4) — làm khi sửa tab đó.

## 3.476 — 05/11/2026 — Dọn: bỏ onclick viết thẳng đồng loạt (TK 3, Đ4 kế hoạch dọn — phần 3)
- **Công cụ `tools/doi_onclick.py`**: chuyển dạng chuẩn `on<sự kiện>="[dongHop();]HÀM(tham số…)"` (tham số: chuỗi từ biểu thức, chữ, số, true / false / null, this.value / this.checked / this / event) → `data-lenh="<khối>.<lệnh>"` + `data-a1…`, sinh khối `gdDangKy('<khối>', gdLenh({…}))` cuối file — mỗi lệnh gọi **đúng hàm cũ**, đúng kiểu tham số. `dongHop()` trơn → lệnh chung `hop.dong`. Bỏ qua (giữ nguyên): `event.stopPropagation()`, chuỗi có `.replace(/'/g…)`, tham số ghép thô, câu lệnh gán / nhiều lệnh, chú thích, và **hàm mà chỗ khác tra theo chữ onclick** (chonDong, doiNgan, doiCD, ktKHXepLai…, boChonHS, quetThemHang, ccMo).
- **Chạy cho 70 file** (trừ js/04b — cửa sổ nổi HSSV vẽ vào cửa sổ PiP riêng, không có bộ nghe chung): **onclick 1.174 → 467**. Hàm chung mới (js/02): `gdA(el, i)` tham số, `gdLenh(ds)` (data-dong="1" = đóng hộp trước). `GD.coLenh(k)` (js/39) cho phép thử.
- **Sửa lỗi có sẵn:** nút **⚙ Khai báo riêng** ở đầu Hồ sơ Tổ có lúc bấm không ăn (lệnh `omkb.*` chỉ đăng ký khi cột trái vẽ Chọn nhanh) → đăng ký lúc nạp. Esc trong hộp: nút `hop.dong` (Đóng / Thôi) nay cũng được nhận là nút Esc (js/06 `ganNutEsc` nhận cả data-lenh). Bộ chọn dòng scan đang xem (js/08) theo data-lenh.
- **Phép thử:** mới **t375** — lưới an toàn: đi 16 tab / tab con, mọi phần tử data-lenh đang hiện (~1.000) phải có lệnh đăng ký; các phép thử chọn nút theo onclick đổi sang data-lenh; mọi phép thử phát `change` / `input` nay lan lên (`bubbles:true`, như trình duyệt thật).

## 3.475 — 05/11/2026 — Dọn: menu chuột phải + dải tháng bỏ onclick (TK 3, Đ4 kế hoạch dọn — phần 2)
- **Menu chuột phải danh sách file** (js/10): 21 mục `onclick="dongMenu();…('id')"` → `data-lenh="menu.*"`; mục đang mở ghi ở `#menu[data-id]` (biểu mẫu: `data-bm`), một khối lệnh đóng menu rồi gọi đúng hàm cũ (xem, đọc lại & gợi ý tên, gửi, in, sửa, Drive, mở trên máy tính 4 kiểu, đường dẫn ổ G, khung xem nhanh, tên file, ghi chú / gắn VB / bản mới biểu mẫu, chép AI, Excel / Word, xóa vào thùng rác).
- **Dải tháng Nạp & KT** (js/22): nút tháng, ‹ › số tháng hiện, ▾ chọn tháng, ⦿ Gần nhất → `nkt.*`.
- Phép thử mới **t374**: bấm từng mục menu (hàm đích thay bằng bộ ghi) → đúng hàm, đúng mã mục, menu đóng; Nạp & KT không còn `onclick` viết thẳng; hộp chọn tháng, Kiểm tra kỳ, ô ma trận; không nút nào "Chưa có lệnh".
- Thước đo: onclick 1.200 → 1.174.

## 3.474 — 05/11/2026 — Dọn: Nạp & KT bỏ onclick viết thẳng (TK 3, Đ4 kế hoạch dọn — phần 1)
- **Nền:** hàng chờ `gdDangKy(khối, lệnh)` (js/02) — file nạp **trước** bộ lệnh chung `GD` (js/39) vẫn đăng ký `data-lenh` được; js/39 nhận hàng chờ khi nạp. Bỏ cách đăng ký "lười lúc vẽ lần đầu" của dải chip mẫu (`cnHang`, js/26).
- **js/22k (Nạp & KT):** 66 `onclick` / `onchange` / `oninput` → `data-lenh="nkt.*"` (tham số ở `data-a` / `data-b` / `data-c`, `data-dong="1"` = đóng hộp trước), một khối lệnh cuối file. Bấm như cũ: chọn tháng, ô ma trận, nạp / thay / xóa / tải file gốc, Kiểm tra kỳ (lọc, mở hết, tìm, bấm ⚠ tới mục), đối chiếu chéo, hộp nạp nhiều file / 1 file.
- Thước đo: onclick 1.266 → 1.200.
- Phép thử t127, t129 đổi chọn nút theo `data-lenh`.

## 3.473 — 05/11/2026 — Dọn: mẫu Hồ sơ gắn qua cổng chung, bỏ 52 nhánh rẽ theo mã mẫu (TK 3, Đ3 kế hoạch dọn)
- Trước: `hsoLap` (25b) và `hsoTuyHTML` / `hsoTuyVay` / `hsoTuyHo` (25c) rẽ nhánh theo mã từng mẫu (`M.k==='10c'`, `/^(01uq|01td…)$/.test(M.k)`…) — **52 chỗ**, thêm mẫu là phải sửa nhiều nơi.
- Nay mỗi mẫu tự mang **cách lập** (`lap`, `ai`, `kem`, `lapRieng` — khối cuối js/25b) và **cột nhập liệu** (`trai` — khối cuối js/25c) qua cổng `hsoMauGan` (đã dùng cho 06A, BBLV, 11/TD từ 3.462–3.463); chỗ khác so **đặc tính mẫu** (khối cờ ở js/25: `canBD`, `canTruongAp`, `rong`, `khongCanTo`, `logoSan`, `kbRieng`, `gq`, `coKem`, `kem06`…). Thân từng nhánh giữ nguyên. Bỏ 3 nhánh không bao giờ tới (01/UQ, 01/TGTV trong `hsoTuyHo`; 01/GQVL không GQVL sau khi đã trả về).
- **Kiểm giống hệt:** công cụ chụp 172 trạng thái (mọi mẫu Hồ sơ Tổ + Hồ sơ vay × mẫu trắng / có số liệu / bản ghi mẫu: bản in + cột nhập liệu + tên file) trước và sau — **khác 0**; t179 (bản in chuẩn từng ký tự) 45/45.
- Thước đo `kiem.py`: **nhánh mẫu riêng 52 → 0**.

## 3.472 — 05/11/2026 — Dọn: một lõi tên xã chung (TK 3, Đ2 kế hoạch dọn)
- Trước có **3 cách tính tên xã** song song: `toTenXa` (3.409/3.448, cây tổ: đếm đa số Mẫu 31 + File Tổ trưởng + danh bạ), `xaTenSach` (3.433, danh bạ / Tra cứu / hồ sơ: dò tổ cùng mã xã) và `slXaTenChuan` (3.470, chỗ đọc bộ số liệu).
- Nay **một lõi** `slXaTenTu(hs, dsto, phu)` (js/22): File Tổ trưởng / Thông tin tổ trưởng (TENXA) → Mẫu 31 tên sạch (đa số) → nguồn phụ (danh bạ khách) → danh mục ⚙ Cài đặt → "Mã xã …". `slXaTenChuan` (bộ số liệu) và `toTenXa` (cây tổ) cùng gọi lõi này; `xaTenSach` (danh bạ đã lưu) tra bảng `SL_XA_TEN` (gộp từ các bộ đã dựng) rồi danh mục. Hàm `slLaTT` dùng chung thay 4 chỗ viết lại biểu thức "trực tiếp".
- Không đổi kết quả: t330, t350, t360, t373, t321, t112, t113, t128, t167, t205 đạt nguyên.

## 3.471 — 05/11/2026 — Phân bổ KH › Diễn biến: bảng cơ bản (TK 3, Đ1 kế hoạch dọn)
- **Anh 04/11** (ảnh Diễn biến): "tab nhìn còn rối rắm quá, biểu đồ này nọ khó hiểu, anh cần bảng biểu cơ bản trước, theo đúng phong cách giao vốn đầu năm, giao tăng giảm, KH cuối năm, dư nợ hiện tại, còn thực hiện, kẻ bảng, chọn đa chiều, chia nguồn"; anh duyệt kế hoạch (em chọn sẵn: Xem thêm ẩn biểu đồ, có cột dư nợ 31/12 năm trước, mặc định chương trình › xã).
- **Bảng cơ bản** (`pbDBHang` / `pbDBBang`, js/48b): STT · Đơn vị · Dư nợ 31/12 năm trước · Giao đầu năm · Tăng / giảm (hoặc **Tách từng QĐ** = mỗi QĐ 1 cột) · KH cuối năm · Dư nợ kỳ chọn · Còn phải thực hiện (âm = vượt, đỏ) · % thực hiện. Khối **A. Nguồn TW / B. Nguồn ĐP / TỔNG CỘNG**; cấp 1 in đậm = tổng, bấm gập / mở; chương trình không giao ghi "không giao" (KH = dư nợ đầu năm, luật 3.305); có dư nợ mà chưa có KH (chưa nạp Mẫu 31 kỳ 12 năm trước) → ô Còn phải TH "—" + cảnh báo trên bảng (không báo vượt sai).
- **Chọn đa chiều**: năm · kỳ dư nợ (Mẫu 31 kỳ nào) · nguồn (cả 2 chia khối / TW / ĐP) · xếp chương trình › xã / xã › chương trình · chip chọn nhiều xã, nhiều chương trình (lõi `pbDienBien` nhận mảng — `pbLocCo`).
- Thẻ số, biểu đồ, ma trận xã × chương trình, bảng theo mốc tháng: giữ nguyên, vào **▸ Xem thêm** (mặc định ẩn). In / Excel: bảng cơ bản trước (sheet `Bang KH`), phần Xem thêm khi đang mở.
- **Dọn:** tách phần Diễn biến khỏi js/48 sang `js/48b-phan-bo-db.js` (js/48 159 KB → 119 KB, không còn file > 150 KB); đoạn cách dòng Word (`hsoDocx`) gom thành `khTr` / `khSau` (bớt dòng dài).
- **Phép thử:** t255 thêm 6 ý bảng cơ bản; t256, t373 theo bố cục mới.

## 3.470 — 04/11/2026 — Tên xã theo mã xã ở chỗ đọc chung (gộp điểm GD) (TK 3)
- **Anh 04/11** (ảnh Diễn biến: chọn Tất cả xã lại ra "Vay trực tiếp"): "lỗi này đã phát hiện nhưng em chưa sửa hết các tab" · "có thể do đang chuyển đổi dữ liệu nên Mẫu 31 chưa chuẩn" · "đang gộp các điểm giao dịch, Gia Lộc gộp làm 1".
- **Nguyên nhân (suy từ các lần anh báo):** lúc hệ thống gộp điểm GD, cột Tên xã Mẫu 31 ghi "… Vay trực tiếp", mỗi kỳ sai một kiểu (29/10: 3 xã; T10: cả 5 xã). Mã xã không đổi. 3.409 / 3.433 / 3.448 chỉ vá từng chỗ (cây địa bàn, danh bạ, Tra cứu); Phân bổ › Diễn biến lấy tên thẳng từ dòng dư nợ nên vẫn dính.
- **Sửa ở gốc** (`slXaTenChuan`, js/22, gọi trong `slBo`): tên xã mọi dòng mọi bảng của bộ số liệu = tên chuẩn theo mã xã — File Tổ trưởng / Thông tin tổ trưởng (TENXA) → Mẫu 31 tên sạch (đa số) → danh mục ⚙ Cài đặt → "Mã xã …". Tên gốc giữ ở `tenXaGoc`; `B.xaTen` = bảng mã → tên. Món vay trực tiếp vẫn nhận theo tổ / ấp như cũ. Các lớp đỡ cũ (`toTenXa`, `xaTenSach`) giữ cho dữ liệu đã lưu.
- **Kiểm tra kỳ** (nhóm 6): dòng "Tên xã trên Mẫu 31 = tên chuẩn theo mã xã" — liệt kê mã xã · tên chuẩn · tên trên Mẫu 31 · số dòng; hết chênh = Mẫu 31 đã chuẩn lại.
- **Phân bổ › Diễn biến:** ô chọn xã ghi tên theo cây địa bàn; dòng không có mã xã không còn thành mục trùng "Tất cả xã".
- **Biểu 07 (Thông báo giao / điều chỉnh KH dư nợ) bản Word** (anh 04/11 ảnh: "dòng tiêu đề sát các dòng trên dưới, nên giãn dòng thêm"): bộ chuyển Word (`hsoDocx`) chỉ hiểu lớp `tr` / `sau` (6 pt), bỏ qua `margin-top:18pt` ghi thẳng → thêm lớp chung `tr3` (trước 18 pt) / `sau2` (sau 12 pt) cho màn hình + Word; Biểu 07: trước "THÔNG BÁO …" 18 pt, sau "NĂM …" 12 pt.
- **Phép thử** mới `t373` (Mẫu 31 giả: cả 1 xã ghi "… Vay trực tiếp"). t253 thêm kiểm khoảng cách tiêu đề Word. Hồi quy đủ.

## 3.469 — 04/11/2026 — Phân bổ KH: QĐ không giao cho PGD gom vào ＋ QĐ mới (QĐ 0 xã) (TK 3)
- **Anh 04/11**: "QĐ không giao cho PGD cũng gom 1 chỗ nhập QĐ mới nhưng không add xã nào, chỉ nhập thông tin và lưu, báo 0 xã" · "anh đã nhập 1 QĐ không giao cho PGD em gom lại luôn" · "nếu nhìn nhầm thì sửa thêm xã là xong".
- Bỏ nút / hộp riêng "＋ QĐ không giao cho PGD". ＋ QĐ mới không tích xã → Lưu hỏi xác nhận → ghi QĐ 0 xã (vẫn lưu ở `qdKhong`, dữ liệu cũ tự hiện chung).
- Danh sách QĐ (chi tiết + xem gọn) xếp chung theo ngày, QĐ 0 xã có nhãn **0 xã — không giao cho PGD**; bấm → cột phải báo 0 xã + ✎ Sửa QĐ. Dòng thời gian: bấm dòng 0 xã cũng mở như vậy.
- ✎ Sửa QĐ 0 xã dùng cùng hộp QĐ: tích thêm xã + Lưu → thành QĐ có số liệu (bỏ khỏi 0 xã); QĐ có xã bỏ hết xã → thành QĐ 0 xã. Hộp QĐ có thêm ô Ghi chú. Dòng thiếu đợt (＋ ghi số QĐ) và QĐ đọc vào không có khối PGD mình đều mở ＋ QĐ mới điền sẵn.
- Sửa lỗi nhỏ: vẽ lại bảng hộp sau khi đã Lưu không còn báo lỗi.
- **Phép thử**: t372 cập nhật (thêm sửa 0 xã → có số liệu).

## 3.468 — 04/11/2026 — Phân bổ KH: đối chiếu dòng PGD chỉ theo cột điều chỉnh (TK 3)
- **Anh 04/11** (ảnh hộp sửa QĐ): "trên QĐ chỉ có cột chỉ tiêu đợt này mới có tổng, còn cột đầu, cuối có hiện thêm các xã có tên mà không có giao chỉ tiêu, nên chỉ đối chiếu được tổng chỉ tiêu đợt này thôi, em sửa lại cho đơn giản".
- Hộp nhập / sửa: dòng **"Tổng điều chỉnh PGD trên QĐ"** chỉ còn 1 ô ở cột Điều chỉnh đợt này; đã giao / đến 31/12 chỉ hiện Σ các xã. Báo lệch chỉ khi Σ điều chỉnh các xã ≠ dòng PGD.
- Bảng xem QĐ: dòng chương trình = Σ các xã; chip "✓ khớp điều chỉnh PGD" / "✗ Σ điều chỉnh n xã ≠ PGD +…". Xuất Excel THEO_QD / DM_<số> theo cùng cách.
- Đọc PDF / Excel vẫn kiểm đủ 3 cột dòng PGD với các xã **trên chính bảng QĐ** (kiểm việc đọc đúng). Dữ liệu cũ đọc được (dòng tổng lưu cũ vẫn giữ, chỉ so cột điều chỉnh).
- **Phép thử**: t370 cập nhật.

## 3.467 — 04/11/2026 — Phân bổ KH: dòng thời gian QĐ, ghi số QĐ không giao cho PGD (TK 3)
- **Anh 04/11**: "thêm 1 nút thống kê QĐ theo ngày, dòng thời gian, có số thứ tự để kiểm tra xem có đợt nào bỏ sót; có trường hợp tỉnh có đợt giao QĐ nhưng không giao cho Gò Dầu anh cũng muốn nhập số QĐ … để theo dõi đợt"; "số đợt lưu theo QĐ anh nhập nếu QĐ có ghi, còn em cứ ghi stt từ QĐ đầu tiên"; "code và gộp lên".
- **📅 Dòng thời gian QĐ** (mục 📋 Quyết định, cột phải): mỗi năm × nguồn TW / ĐP 1 bảng, xếp theo ngày, **STT 1, 2, 3… từ QĐ đầu tiên**; cột Đợt (như QĐ ghi) · Số QĐ · Ngày · Loại · Giao cho PGD (số xã / không giao) · Σ điều chỉnh PGD · Ghi chú. Soát đợt trên QĐ có ghi đợt: **dòng đỏ "⚠ Thiếu đợt N — chưa nhập"** + nút ＋ ghi số QĐ (điền sẵn đợt, nguồn); đợt trùng / đợt nhỏ hơn QĐ trước tô vàng; QĐ không ghi đợt không nhắc. Bấm dòng → xem QĐ. In / PDF / Word / Excel.
- **QĐ không giao cho PGD**: nút ＋ — chỉ số QĐ, ký hiệu, ngày, nguồn, loại, đợt, ghi chú; lưu riêng (`qdKhong`) — phân bổ, Biểu 07, Diễn biến, Đối chiếu không đụng; có STT trong dòng thời gian, nhóm riêng ở cột trái (bấm sửa / xóa). Đọc PDF / Excel mà QĐ **không có khối PGD mình** → báo + nút "📄 Lưu số QĐ (không giao cho PGD)" điền sẵn từ QĐ.
- Lõi `pbDongThoiGian` (js/47, chạy được trong node).
- **Anh 04/11 (ảnh tab Phân bổ):** "có nút chuyển xem gọn, 1 QĐ 1 dòng, khi nhấp vào sẽ hiện bảng bên phải, bảng bên phải dòng tổng thì in đậm, dòng con in thường" → nút **☰ Xem gọn / ▤ Xem chi tiết** (nhớ lựa chọn `pbGonQD`): mỗi QĐ 1 dòng (số · ngày · nguồn · đợt · GM/ĐC · số xã · Σ điều chỉnh, ✎); bảng bên phải: dòng tổng (chương trình / xã) đậm cả 3 cột số, dòng con in thường.
- **Anh 04/11:** "em cũng nên xuất số liệu đã lưu để kiểm tra đối chiếu xem số liệu đã nhập có đúng không"; "em xuất ra 1 file đầy đủ như file đã nhập để cho các AI khác rà soát lại" → bảng xem 1 QĐ có thanh xuất (In / PDF / Word / Excel — đúng bảng đang xem); nút **⬇ Xuất số liệu đã lưu** = 1 file Excel: DANH_SACH (dòng thời gian, STT, đợt sót) · THEO_QD (từng QĐ như danh mục) · CHI_TIET (xã × chương trình, kiểm 3 + 4 = 5) · **QD + DM_<số QĐ> đúng cột mẫu nhập** · HUONG_DAN_AI (lời nhắc rà soát với QĐ gốc, liệt kê chỗ khác). Chỉ có số của PGD mình — dòng chương trình toàn tỉnh để trống, ghi rõ.
- **Phép thử**: t372 mới (21).

## 3.466 — 04/11/2026 — Phân bổ KH: sửa QĐ linh động (TK 3)
- **Anh 04/11**: "khi sửa các QĐ, sao cho linh động được" → "làm hết, em code".
- **① ✎ Sửa nhanh ngay tại bảng xem** (cột phải mục 📋 Quyết định): cùng bộ sửa với hộp QĐ — Lưu / Bỏ ở cuối bảng, Enter xuống cùng cột, Ctrl+Enter = Lưu; Bỏ → về bảng xem, không ghi.
- **② Hộp sửa xếp theo chương trình ↔ theo xã** (mở theo kiểu đang xem, chuyển qua lại không mất số đang gõ).
- **③ Thao tác theo khối**: đầu khối chương trình — đổi mã (cả khối, giữ số, không trùng mã), ＋ xã (xã trong QĐ hoặc xã cây chưa có trong QĐ), 🗑 bỏ chương trình; kiểu theo xã — ＋ chương trình cho riêng xã, 🗑 bỏ xã.
- **④ Ghép xã chưa khớp cây địa bàn**: ô "⚠ ghép xã…" — lưu thì nhớ tên trên QĐ → mã xã (`ch.xaQD`), lần đọc PDF / Excel sau tự ghép.
- **⑤ ⧉ QĐ kế tiếp**: chép xã + chương trình, Đã giao = Đến 31/12 của QĐ này, đợt + 1, loại Điều chỉnh — chỉ gõ số, ngày, cột điều chỉnh.
- **⑥ Đọc lại PDF / Excel của QĐ đã có**: màn xem trước so sánh cũ ↔ mới từng xã · chương trình (chỉ dòng đổi, số dòng giữ nguyên) trước khi ghi đè.
- Sửa thêm: dòng QĐ đã lưu đang khớp 3 + 4 = 5 → sửa cột điều chỉnh thì Đến 31/12 tự tính lại (dòng gõ tay lệch giữ nguyên).
- **Phép thử**: t371 mới (15); t370 cập nhật (hộp sửa mở theo kiểu đang xem, đầu khối có ô đổi mã).

## 3.465 — 04/11/2026 — Phân bổ KH: nhập QĐ theo chương trình — đọc thẳng PDF QĐ, Excel chép nguyên bảng, xem 2 kiểu (TK 3)
- **Anh 04/11** (gửi QĐ mẫu 13821/QĐ-BĐDHĐQT điều chỉnh đợt 7): "QĐ của tỉnh sẽ có cấu trúc theo từng chương trình vay, nên khi nhập liệu em cũng cho nhập như vậy"; "code cả a, b, c, khi nhập thì theo chương trình, nhưng khi hiện thì cho chọn qua lại cả 2 kiểu theo xã (các chương trình của xã) hoặc chương trình (các xã có giao), và hiện đủ 3 cột như trên QĐ để đối chiếu".
- **Lõi đọc danh mục QĐ** (`js/47`, chạy được trong node): `pbDauQD` (số / ký hiệu / ngày / nguồn TW-ĐP / loại / đợt — kể cả số + ngày đóng thêm ở lớp riêng, không lấy số của Căn cứ), `pbChuDM` (chữ PDF — font dùng ký tự rỗng làm dấu cách), `pbXlsDM` (Excel DANH_MUC), `pbDanhMuc` (chương trình → PGD → xã, 3 cột; kiểm từng dòng 5 = 3 + 4, tổng các xã = dòng PGD, tổng các PGD = dòng chương trình), `pbCTMa` (tên CT trên QĐ → mã; dân tộc thiểu số hỏi anh; nhớ lựa chọn), `pbQDTuDM` (bản ghi mỗi xã của PGD đang dùng, giữ dòng tổng PGD). QĐ mẫu của anh: 3 chương trình · 24 PGD · 96 xã, mọi phép kiểm khớp.
- **A · 📄 Đọc QĐ (PDF)**: chọn file → xem trước theo chương trình (dòng chương trình toàn tỉnh · dòng PGD · các xã), tự chọn PGD khai báo (Gò Dầu), bỏ tích xã, chọn mã CT chưa ghép, sửa phần đầu → Lưu (trùng → ghi đè / bỏ qua). PDF dạng ảnh scan → báo dùng cách khác.
- **B · Nhập tay theo chương trình**: hộp QĐ xếp I, II, III… như QĐ → dòng **Tổng PGD trên QĐ** (gõ để đối chiếu, báo tổng các xã ≠ dòng PGD) → các xã theo thứ tự QĐ; cột "Chỉ tiêu KH đã giao (3) · Điều chỉnh đợt này (4) · Đến 31/12 (5 = 3 + 4)"; gõ "-" = 0; **Enter xuống dòng dưới cùng cột**.
- **C · Mẫu Excel mới**: sheet DANH_MUC chép nguyên bảng QĐ (Gemini chép đúng thứ tự) → cùng màn xem trước. Mẫu cũ CHI_TIET vẫn nạp được.
- **Xem QĐ 2 kiểu** (mục 📋 Quyết định, cột phải — bấm đầu QĐ): **Theo chương trình** (dòng PGD trên QĐ + các xã có giao, chip ✓ khớp / ✗ Σ xã ≠ dòng PGD) ↔ **Theo xã** (các chương trình của xã); đủ 3 cột như QĐ; nhớ lựa chọn.
- Dữ liệu cũ đọc được (bản ghi QĐ thêm `pgd`, `tong` — không có thì như cũ). File QĐ thật chỉ dùng thử trong vùng tạm, không vào repo.
- **Dọn kèm:** bỏ CSS `pb-f-xa-dong` (bảng nhập cũ theo xã).
- **Phép thử**: t369 mới (lõi, node, QĐ giả — 15) · t370 mới (giao diện, PDF QĐ giả dựng bằng trình duyệt — 13) · t252, t256, t355 (mẫu Excel mới DANH_MUC; mẫu cũ CHI_TIET vẫn nạp được) cập nhật.

## 3.464 — 04/11/2026 — Bản dọn: bỏ mã rác, thước đo mã rác, đo tốc độ (TK 3)
- **Anh 04/11**: "ý anh là hạn chế code rác, tối ưu chương trình, ko phải gò ép trong khoảng nào" → "code tiếp cho bản dọn". Kế hoạch / kết quả: `docs/KE_HOACH_DON_NEN.md` mục 7.
- **Hàm thừa**: bỏ `ktDsBC`, `ktChonBC` (js/22b — không ai gọi từ 3.333). 5 hàm chỉ phép thử gọi giữ (lõi nghiệp vụ có phép thử).
- **Hàm trùng**: `P()` của mẫu 10A / 10B / 10C / 10D → phần chung `HST.P` (js/mau/0hst.js); `chanTrang` 07b / 10C → `omChanTrang` (js/31). Bản in mọi mẫu khớp chuẩn từng ký tự (t179 45/45).
- **CSS**: bỏ 82 quy tắc của 50 lớp không còn dùng (~8 KB) — soát từng lớp; giữ lớp ghép tên động (`gl-c`+số) và lớp pdf.js tự sinh.
- **Thước đo mã rác** (`tests/kiem.py` + `tests/rac.js` phân tích cú pháp bằng acorn): hàm không tới được **0** · hàm trùng **2** (có lý do) · lớp CSS chết **0** — không được tăng. Đặt mốc mới.
- **Đo tốc độ** (bộ giả 25.000 khách): chỉ tab Tổ mở lần đầu > 300 ms (461 ms) → ghi đề xuất, chưa sửa.
- **Dọn kèm:** chính bản này.

## 3.463 — 04/11/2026 — Mẫu 11/TD mới + cũ theo chuẩn 10A, đúng mẫu gốc từng chữ, tổ trưởng theo Danh sách tổ mới nhất (TK 3)
- **Anh 04/11**: "em tiếp tục làm Mẫu 11 mới theo chuẩn 10A"; "đúng mẫu từng chữ, ko được bỏ hay sửa"; "tổ trưởng lấy theo danh sách tổ mới nhất"; "khi cần in bổ sung lại tổ cũ thì chọn dữ liệu cũ"; "làm luôn mẫu 11 cũ song song với mẫu mới"; "nhớ chuyển qua mẫu chung".
- **Đúng chữ mẫu gốc** (so từng chữ với `tests/mau_goc/11_moi.docx`, `11_cu.docx`): 11 mới sửa 3 chỗ lệch có từ trước — "…nợ bị rủi ro **để trình** cấp có thẩm quyền" (app in nhầm "gửi"), "(Ký tên, đóng dấu)" (thừa khoảng trắng), tên PGD dính chữ "xã hội". 11 cũ khớp sẵn. Chữ in sẵn không đổi; không đổi "Thôn" / "xã" của mẫu.
- **Tổ trưởng ký hợp đồng** (cột trái, chung 2 mẫu — `HST.tt`, `HST.ttHTML`): mặc định **Danh sách tổ mới nhất** đã nạp (tên, mã KH, CCCD, ngày cấp; nơi cấp từ danh bạ cùng số thẻ); **in bổ sung tổ cũ** → ô "Lấy theo" chọn bản Danh sách tổ cũ hoặc Mẫu 31 kỳ đang chọn, nhớ theo tổ, nút ↺ Về mới nhất; bản chọn không có tổ → báo, lấy bản gần nhất có tổ (QT-C-18 / QT-C-22).
- **Chuẩn 10A trên phần chung HST** (`js/mau/0hst.js`): chữ điền liền, in thường; tên hoa đầu từ; "Đại diện Ông (Bà): tên ⇥ Chức vụ"; Hội bỏ xã; tách ô (Bên A chức vụ · ngày cấp · nơi cấp · xã · tỉnh · chữ ký Bên A — cách đã chọn ở ô cũ tự chuyển); khối Nhập liệu riêng Điền hết / Tùy chọn. Đoạn văn chung `HST.P` (thay bản `P` riêng của 2 mẫu).
- **Gắn qua cổng `hsoMauGan`**: bỏ 2 dòng danh sách (js/25), hàm thay `hsoLap11Cu`, **hàm lập 11 kiểu cũ `hsoLap11` (72 dòng, không còn dùng)**, 2 mục trong bảng lập (js/25b), nhánh cột trái (js/25c → `M.trai`). Rút file mẫu → mất chip, app chạy như trước.
- **Dọn kèm:** bỏ `hsoLap11` cũ; `kiem.py` bỏ ⚠ ngân sách KB (anh 04/11 "không gò ép trong khoảng nào" — KB chỉ theo dõi); phép thử nhanh node nạp cả dòng `<script>` có chú thích (trước bỏ sót `0hst`, `0hsn`, `bblv`).
- **Phép thử**: t368 mới (chữ in sẵn = file gốc 2 mẫu, chuẩn 10A, nguồn tổ trưởng: mới nhất / bản cũ / không có tổ / Mẫu 31 / về mới nhất — Danh sách tổ GIẢ); t181 11 / 11cu vào nhóm chữ liền; chuẩn in t179 ghi lại 4 bản 11 (anh duyệt đổi).

## 3.462 — 04/11/2026 — Dọn nền theo nhịp phát triển: cổng gắn mẫu, ngân sách tăng (TK 3)
- **Anh 04/11**: "em so với định hướng bố cục có đi lệch khi app phình to quá nhanh ko" → "em làm tất cả luôn, theo kế hoạch dọn nền tương ứng với phát triển thêm". Kế hoạch: `docs/KE_HOACH_DON_NEN.md`.
- **Cổng gắn mẫu `hsoMauGan`** (`js/25-ho-so.js`): file `js/mau/*.js` tự gắn chip + `lap` + `ai` (tên file) + `trai` (cột trái) vào `HSO_MAU`. 06A, Biên bản làm việc chuyển sang cổng — bỏ nhánh riêng ở `js/25` (2 dòng danh sách), `js/25b` (nhánh BBLV, 3 hàm thay, 06A trong bảng lập), `js/25c` (cột trái); `HSN.trai` dùng chung. Rút 3 file `0hsn` / `06a` / `bblv` → app chạy như trước (KTGS mở 06A chỉ báo thiếu).
- **`tests/kiem.py`**: ngân sách tăng (JS +100 KB · CSS +15 · hàm +60 · biến +15 so mốc → dòng ⚠ NGÂN SÁCH TĂNG riêng, t192 vẫn đạt); thước đo mới "nhánh mẫu riêng (js/25*)" (54, chỉ được giảm); bớt báo nhầm "thiếu hàm" (10 → 0). Hiện ⚠ JS +180 KB so mốc 3.429 → **bản kế là bản dọn** (KE_HOACH_DON_NEN mục 5 N3) rồi mới đặt mốc mới.
- **Đo, không làm**: nạp khi dùng `js/mau/*` — lợi ~30 ms, rủi ro gọi chéo; đo lại khi JS > 5 MB / nạp > 1 giây.
- **Sửa bản rà 04/11**: lưu theo ngăn, dòng thời gian, nhật ký lỗi, sức khỏe sao lưu **đã có** (bản rà ghi nhầm "chưa thấy"); còn thiếu thật: "Việc cần xử lý" ở Hôm nay, danh mục lý do lệch anh khai được — chờ anh (KE_HOACH_DON_NEN mục 6).
- **Dọn kèm:** chính bản này (cổng mẫu, −8 nhánh / hàm thay ở khung Hồ sơ).
- **Phép thử**: t367 mới (cổng + rút file); t366, t349 đạt.

## 3.461.9 — 04/11/2026 — 8 tình huống mẫu biên bản làm việc (TK 3)
- **Anh 04/11**: "nghĩ thêm có tình huống nào nữa ngoài 3 t/h trên"; "3 t/h đã 2 mặt hướng dẫn, em soạn tiếp các tình huống còn lại luôn"; "khi in bản mẫu sẽ sổ ra các tùy chọn tình huống".
- `js/mau/bblv.js`: thêm ④ Khách chết / mất tích / mất năng lực hành vi · ⑤ Rủi ro khách quan (thiên tai, dịch bệnh) · ⑥ Sử dụng vốn sai mục đích / vay hộ · ⑦ Đã nộp cho Tổ trưởng nhưng Ngân hàng chưa nhận · ⑧ Đang chấp hành án / tạm giam — mỗi tình huống có Dấu hiệu, Nên mời, câu mẫu mục 2–5 (cũng vào gợi ý bản thật). Ô chọn ở khung 📝 Bản mẫu thành **danh sách sổ xuống**: Tất cả tình huống (tờ hướng dẫn ≈ 5 trang) · ① … ⑧ (biên bản mẫu đầy đủ 1 tình huống). Câu do TK 3 soạn theo nghiệp vụ thường gặp, chưa đối chiếu văn bản — anh sửa thì báo.
- t181: bản mẫu BBLV là tờ hướng dẫn / mẫu tham khảo → không so chồng khít (chỉ bản thật). t366 theo 8 tình huống.

## 3.461.8 — 04/11/2026 — Tờ Hướng dẫn ghi biên bản làm việc (TK 3)
- **Anh 04/11**: "đây là hướng dẫn nên em hướng dẫn kỹ các tình huống, câu văn sát thực tế nhất" → 📝 Bản mẫu **Cả 3 tình huống** thành tờ **HƯỚNG DẪN GHI BIÊN BẢN LÀM VIỆC** (≈ 2 trang): khung **Lưu ý chung** (nơi lập, thành phần tối thiểu, đối chiếu mục 1 với sổ vay vốn / biên lai, ghi cụ thể không chung chung, cam kết có số tiền + ngày, đọc lại và ký đủ); mỗi tình huống ① ② ③ có **Dấu hiệu**, **Nên mời**, câu mẫu mục 2 – 5 (viết lại sát thực tế, chỗ "…" để ghi thời gian, số tiền, tên người). Câu mới cũng thay vào gợi ý bản thật. Câu do TK 3 soạn — anh sửa thì báo.
- t366 sửa theo câu mới.

## 3.461.7 — 04/11/2026 — Tờ mẫu gọn 3 tình huống (TK 3)
- **Anh 04/11**: "anh định in 3 tình huống trong 1 bản, cho gọn"; "có thể bỏ bớt các phần không cần, thêm dòng hướng dẫn ghi mẫu" → 📝 Bản mẫu **Cả 3 tình huống** = 1 tờ: tiêu đề, khung **Hướng dẫn ghi** (chọn tình huống đúng với hộ, chép câu vào từng mục, ghi tiếp chỗ "…", ghép câu nếu nhiều nguyên nhân; thành phần / món vay / chữ ký ghi như biên bản thật), rồi mục 2–5 mỗi mục liệt kê câu ① ② ③. Bỏ thành phần, thông tin món vay, chữ ký ở tờ mẫu này. Chọn ① / ② / ③ vẫn in biên bản mẫu đầy đủ theo 1 tình huống.
- t366 sửa ý 3.461.6 → 3.461.7.

## 3.461.6 — 04/11/2026 — Bản mẫu BBLV: chọn tình huống ngay ở khung Bản mẫu, in cả 3 (TK 3)
- **Anh 03/11**: "cho chọn 3 tình huống ngay chỗ này luôn, hiện cả 3 t/h luôn để in ra làm mẫu" → khung 📝 Bản mẫu (dưới dòng Điền) có dòng **Tình huống mẫu: Cả 3 tình huống · ① · ② · ③**; mặc định **Cả 3** → 3 biên bản mẫu liền nhau, mỗi tình huống 1 trang.
- Lớp nền ô (`js/31-o-mau.js` `omKieuHTML`): mẫu tự thêm lựa chọn riêng cho Bản mẫu qua `OM_MAU[mk].mauThem()`. Ô `tinhMau` thôi ở Chọn nhanh cột trái.
- t366 thêm 1 ý.

## 3.461.5 — 04/11/2026 — Biên bản làm việc: tình huống mẫu cho mục 2–5 (TK 3)
- **Anh 03/11**: "khi chọn bản mẫu anh muốn các gợi ý này hiện ra tương ứng từng mục 2-3-4-5"; "cho chọn tình huống mẫu: KH bỏ địa phương hay còn gọi đi làm ăn xa, khách hàng còn địa phương nhưng khó khăn, nhóm KH có điều kiện nhưng chây ỳ"; "em code và gộp lên".
- `js/mau/bblv.js`: 3 bộ câu `MAU` (mục 2 Nguyên nhân · 3 Thực trạng · 4 Cam kết · 5 Kiến nghị); ô chọn **📝 Bản mẫu — tình huống mẫu** (`tinhMau`, Chọn nhanh, không báo thiếu số liệu); 📝 Bản mẫu in bộ câu của tình huống chọn; 12 câu thêm vào gợi ý chọn nhanh của bản thật (mặc định vẫn ✍ chấm). Câu do TK 3 soạn theo cách ghi thường gặp — anh sửa chữ thì báo.
- t366 thêm 2 ý.

## 3.461.4 — 03/11/2026 — Biên bản làm việc chỉnh theo góp ý; bảng chọn có STT (TK 3)
- **Anh 03/11**: "mất chữ Tây Ninh" → dòng "Hôm nay, ngày …, tại …" có địa chỉ thì tự xuống dòng (trước khóa 1 dòng nên cắt chữ); bản trắng vẫn giữ 1 dòng chấm.
- "số tiền vay nếu chương trình vay dài thì cho xuống dòng" → đo độ dài (> 150 mm) thì "- Số tiền vay: … đồng;" thành dòng riêng.
- "ghi thêm là thành viên tổ … cho đồng nhất với bên 06A" → câu "Là thành viên Tổ TK&VV do Ông (bà): … làm Tổ trưởng, thuộc tổ chức Hội … quản lý." sau Địa chỉ (ô `tt`, `hoi` có khai báo riêng; Hội không lặp chữ).
- "số thứ tự của các thành phần in thường, không đậm".
- "cột tích còn lớn, nên có cột STT" (STT theo hộ — anh chốt) → `HSN.bang`: cột ô tích 22 px, cột STT đánh theo hộ (món sau của cùng hộ để trống).
- t366 thêm 2 ý.

## 3.461.3 — 03/11/2026 — Bảng chọn món gọn, cuộn trong khung (TK 3)
- **Anh 03/11**: "bố trí cuộn trong 1 cửa sổ cố định, tính cho laptop 125% và màn hình 17 inch, nếu đủ chỗ thì bố trí 1 dòng 1 món vay, 1 hộ vay"; "các cột còn rộng thì bố trí đủ, nếu không đủ thì bỏ số KU, ghi chương trình vay, thêm cột lãi tồn"; "theo cho là tốt nhất, đầy đủ nhất, em code".
- `HSN.bang` (js/mau/0hsn.js) viết lại: khung cuộn cao = phần màn hình còn lại (`calc(100vh − 330px)`, tối thiểu 260 px), tiêu đề cột đứng yên; mỗi món 1 dòng 22 px; hộ nhiều món: tên + mã KH ở dòng đầu, dòng sau 〃; cột ☑ · Hộ · Mã KH · Số KU (ẩn khi khung < 600 px — container query) · CT (viết tắt, rê chuột ra tên Mẫu 31) · Dư nợ · Lãi tồn · Tình trạng (chip màu Quá hạn / Khoanh / 3T KHĐ / Lãi ≈ nT).
- **Bấm cả dòng để tích / bỏ tích**, bấm tên hộ để xem trước; **"Chỉ món có vấn đề" mặc định bật**; ô 🔎 tìm tên / mã KH / số KU; Tích hết = các món đang hiện. CSS cuối `css/app.css`.
- Cảnh báo "Trước khi in" bỏ qua ô cài đặt (`khongBao` — BBLV "Bản trắng — mục 1").

## 3.461.2 — 03/11/2026 — 06A chỗ ký / chú thích sát đáy, tên chương trình chuẩn; BBLV giao dịch lần cuối (TK 3)
- **Anh 03/11**: "chỗ ký cho rộng ra, hàng hướng dẫn cho sát đáy" → bộ in chung (`js/05-them-file.js`) thêm lớp **`tr-day`**: khối mang lớp được đẩy xuống sát đáy trang chứa nó (sau khi chia trang). 06A: họ tên dưới chữ ký + chú thích (1), (2) là khối `tr-day` → khoảng ký giãn theo chỗ trống của trang.
- **Anh 03/11**: "chương trình vay lấy từ dữ liệu nào cho chuẩn, mã món vay bị xuống dòng" → tên chương trình theo cột **"Tên chương trình" Mẫu 31** (`ctTen`, bỏ chữ "Cho vay" đầu — `HSN.ctTen`), trước là tên rút gọn của app; tên dài thì "- Mã món vay" xuống dòng riêng (không bẻ số KU). Áp 06A + Biên bản làm việc.
- **Anh 03/11**: "tên hộ vay chuyển hoa đầu từ" → 06A tên khách, tổ trưởng `tenHoaDau`.
- **Anh 03/11**: "trong biên bản ghi thêm giao dịch lần cuối" → BBLV dạng dòng thêm "- Giao dịch lần cuối: dd/mm/yyyy" (Ngày GDXA gần nhất của món, Mẫu 31); dạng bảng cột ngày thêm dòng *GD cuối*.

## 3.461.1 — 03/11/2026 — Ô In 2 mặt ở BBLV / 06A (TK 3)
- **Anh 03/11**: "em nên để chế độ chọn nếu máy in 1 mặt" → ô ☑ **In 2 mặt** ở bảng chọn món (`HSN.bang`, js/mau/0hsn.js), dùng chung công tắc của bộ in (`D.cauHinh.ktHaiMat`, như KTGS — mặc định bật). Bỏ tích → in nhiều bản không chèn trang trắng. t366 thêm ý.

## 3.461 — 03/11/2026 — Biên bản làm việc + 06A chọn nhiều phiếu, khai báo đủ (TK 3, vai App chính)
- **Anh 03/11**: "tạo 1 biên bản đơn giản để kiểm tra hộ vay linh hoạt nhiều tình huống, từ nợ lãi, 3 tháng KHĐ, nợ quá hạn, nợ khoanh"; "làm chung 1 hộ nhiều món… liệt kê ra"; "lãi tồn chỉ lấy các món lãi tồn cao, cụ thể trên 3 tháng lãi, 6 tháng lãi, 12 tháng lãi"; "mặc định để chấm ghi tay là tốt nhất"; "4 dòng đại diện để trống"; "nếu chọn nhiều món của 1 hộ thì kẻ dạng bảng"; "BB sẽ trọn 1 trang A4 nên em cứ giãn dòng"; 06A: "sau ông bà có :, tên Hội bị trùng, chỗ tại ghi địa chỉ, đến ngày gõ liền, chữ đồng ghi liền, cho chọn được 1 lần nhiều hộ", "rà soát lại các dòng đều cho khai báo riêng theo quy chuẩn".
- **Mới `js/mau/0hsn.js` (`HSN`)**: bảng chọn món nợ của tổ (nhóm Nợ quá hạn · khoanh · 3 tháng KHĐ · lãi tồn > 3/6/12 tháng · ⭐ Nợ cần quan tâm, tích tay), chọn nhớ theo mẫu trong phiên. Luật **QT-C-23** lãi tồn cao (sổ luật 1.11): lãi tồn > N × (dư nợ × lãi suất ÷ 100 ÷ 12) — lãi suất Mẫu 31 là %/năm (kiểm file thật 25/10).
- **Mới `js/mau/bblv.js` — Biên bản làm việc** (mẫu gốc `tests/mau_goc/bblv.doc`, anh cho phép lưu): mỗi hộ 1 biên bản; 1 món → dạng dòng như mẫu gốc ("Dư nợ đến ngày …: gốc … đồng; lãi … đồng.", tình trạng ☒/☐), nhiều món → bảng (CT · Số KU, Mục đích, Số tiền vay, Ngày vay / đến hạn, Nợ gốc, Nợ lãi, Tình trạng, Cộng); câu "khoản nợ quá hạn, nợ khoanh…" theo tình huống; tại / địa chỉ = địa chỉ khách; 4 dòng thành phần + chỗ ký để chấm (bật 🤖 được); mục 2–5 chấm, câu gợi ý tùy chọn (chọn nhiều); **trọn 1 trang**: đo chiều cao, nhiều dòng chấm nhất (4 → 1 / mục) rồi giãn dòng (1,15 → 1,5); không vừa → ⚠. Bản trắng dạng dòng (⚙ chọn bảng 3–6 dòng trống).
- **06A** (`js/mau/06a.js`): khai báo đủ 39 ô (đoàn kiểm tra, thực tế + chênh lệch, sử dụng đúng / sai mục đích, hóa đơn, hiệu quả, khả năng trả nợ, ý kiến, ký tên); có chữ in liền, ô giữa dòng kiểu cột giữ bề rộng chấm (QUY_CHUAN 9.7); "Ông (bà): Tên"; Hội không lặp chữ; tại = địa chỉ khách; ngày dd/mm/yyyy liền; "đồng" liền; ô nhiều dòng chữ phủ lên dòng chấm (không chen dòng). Chọn nhiều món → mỗi món 1 phiếu (2 trang); 📄 06A từ KTGS tích sẵn đúng món.
- Phép thử mới `t366`; t163 / t170 / t204 (14 chip, thứ tự + BBLV); t181 06A, BBLV nhóm DUNG (chỉ giữ số trang).

## 3.460 — 03/11/2026 — 10A về khuôn chung HST (TK 3, vai App chính)
- **Anh 03/11**: "10A em chưa đưa kiểu HST à" → "gộp rồi code" (anh đã đồng ý "chuẩn cho 3 mẫu").
- `js/mau/10a.js` dùng chung `HST` (js/mau/0hst.js) như 10B / 10C: danh sách tổ viên `HST.ds`, bảng hộ vay `HST.bang` (cột In, giữ mặc định tích hết + dòng tổng hộ / dư nợ), tỷ lệ tham dự / tán thành `HST.tl / so / bq / tlHTML`, cấp ấp `HST.capAp`, tên Hội `HST.hoi`. Bỏ bản riêng `hso10aTl / So / TlDat / TL10A / dvAp / hso10aHoi` và bảng riêng `h10a.*`.
- **Dữ liệu cũ:** tỷ lệ đã lưu `hsoLuu().tl10a / tl10aBq` chuyển 1 lần sang `tlHop['10a'].du / bq` (cờ `tl10aHST`).
- Giữ riêng 10A: phê duyệt UBND (`hso10aUbNut / UbDat`), khóa trang in (`hso10aDong`, `HSO_10A_DAU`), Thành lập / Kiện toàn, tách ô 3.449.
- **Bản in 10A không đổi:** t179 (chuẩn khóa `hst_10a_*`) 45/45, t181 49/49. t358 / t364 sửa theo tên nút mới (`hst.*`, `hstl.*`), t364 thêm ý chuyển tỷ lệ cũ.

## 3.459 — 03/11/2026 — 10A: địa chỉ phê duyệt tách dòng, dòng chấm gọn, tên dưới chữ ký theo dòng trên (TK 2)
- **Anh 03/11:** "phê duyệt UB, địa chỉ cho chọn tự điền và chấm — chia ra, không làm chung cả cụm"; "đổi tên cả phần dễ hiểu nhầm"; "form chức vụ khi chấm phần III làm ngắn lại cỡ như khi có chữ"; "số tiền làm dấu ngăn nhóm số"; "dòng trưởng ấp khi chọn chấm thì canh phải cho khoảng ghi rộng ra"; "tổ trưởng in sẵn, thư ký, tổ phó ghi tay"; "tên thư ký, trưởng ấp và Hội chỗ ký".
- `js/mau/10a.js`: phê duyệt UBND địa chỉ = 3 ô `ubAp` / `ubXa` / `ubTinh` (Chọn nhanh; ô cũ `ubDiaBan` chuyển cách sang cả 3); nút "Phê duyệt UBND — Tên Tổ trưởng, Tổ phó, ngày" (`hso10aUbDat`, chỉ `ubTT` / `ubPho` / `ubNgay`); III để chấm → chấm đến điểm tab chung, "Chức vụ" thẳng cột (`chamMM`); Trưởng ấp / Thư ký để chấm → chấm kín dòng (`chamDay`, nowrap + canh đều cuối); tiết kiệm tối thiểu có dấu ngăn nhóm số (cả số tự gõ); ô mới `kyTK` (tên dưới chữ ký Thư ký); `kyTK` / `kyTA` / `kyCT` mặc định theo dòng Thư ký / Trưởng ấp / Chủ trì (trên chấm → trống, trên gõ → đúng chữ gõ).
- `t358`, `t364` cập nhật + 7 kiểm tra mới; chuẩn in `t179` 10A ghi lại.

## 3.458 — 03/11/2026 — 10A phê duyệt UBND theo Về việc (TK 2)
- **Anh 03/11:** "đổi luôn (hay cho nút bật đổi hay không)" — chọn Kiện toàn thì phần Phê duyệt UBND đổi theo.
- `js/mau/10a.js`: Kiện toàn → "… làm Tổ phó được kiện toàn, hoạt động theo Quy ước…" (Thành lập giữ "được thành lập"); ô chọn mới `ubVv` (Theo Về việc · Luôn "thành lập"), có ở Chọn nhanh.
- `t364` thêm 3 kiểm tra.

## 3.457 — 02/11/2026 — 10B, 10C số tham dự / biểu quyết theo tỷ lệ (TK 2)
- **Anh 02/11:** "làm luôn" (10B, 10C như 10A 3.456).
- Phần chung `js/mau/0hst.js`: `HST.tl` / `HST.so` / `HST.thamDu` / `HST.bq` / `HST.tlHTML` / `HST.tlDat` / `HST.nhanhThem` — tỷ lệ nhớ riêng từng mẫu `hsoLuu().tlHop[mẫu]`.
- `js/mau/10b.js`, `js/mau/10c.js`: "…/… tổ viên dự họp" = số tham dự (tổ viên trước họp × tỷ lệ, làm tròn lên, > 1/2) / số tổ viên; ⌨ gõ 1 số = số tham dự, tổng tự lấy. Biểu quyết "tán thành / tham dự" theo số dự họp in ở trên (> 2/3, QĐ 70); dự họp để chấm → biểu quyết chấm. 2 ô ra Chọn nhanh, có − / + tỷ lệ.
- Phép thử mới `t365`; chuẩn in `t179` 10B, 10C ghi lại. (10A giữ hàm riêng 3.456 — chuyển sang `HST` cùng lần đưa 10A về phần chung.)

## 3.456 — 02/11/2026 — 10A số tham dự, biểu quyết theo tỷ lệ; III, IV, phê duyệt linh hoạt (TK 2)
- **Anh 02/11:** "số tv tham dự tối thiểu 50% số thành viên tổ, chọn theo số tv tổ, tỷ lệ điều chỉnh được nhưng > 50% <= 100%"; "để sẵn 100% cho chọn được tăng giảm %, mục III, IV và phần phê duyệt cũng cho chọn linh hoạt".
- `js/mau/10a.js`: số tham dự = số tổ viên (ô Tổng số) × tỷ lệ, làm tròn lên, luôn > 1/2 (`hso10aThamDu`); tỷ lệ mặc định 100%, − / + 5%, gõ 51–100 (`hso10aTlHTML`, nhớ `hsoLuu().tl10a`). IV "tán thành / tham dự" theo số tham dự in ở trên (tự tính / tự gõ; để chấm → IV chấm), tán thành > 2/3 (QĐ 70), tỷ lệ riêng mặc định 100% (`tl10aBq`). III a / b: ⌨ gõ hoặc chọn tên trong tổ (gợi ý `goiY`); Phê duyệt UBND lấy tên theo III. Cuối Chọn nhanh: Phê duyệt UBND cả phần ✍ chấm / 🤖 tự điền. Số tham dự, III a / b, IV ra Chọn nhanh.
- Khung mẫu chung (js/31): ô tự động có thể kèm nút riêng (`tuUi`), ô tự gõ có danh sách gợi ý (`goiY`).
- Phép thử mới `t364`; chuẩn in `t179` 10A ghi lại.

## 3.455 — 02/11/2026 — Khai báo riêng thống nhất mọi mẫu, trực quan liên kết 2 chiều (TK 2)
- **Anh 02/11:** "chỗ khai báo riêng trực quan rất hay, nên bố trí cho mọi mẫu, và có ký hiệu tương đồng — ví dụ chọn bên trong mẫu thì chỗ khai bên ngoài nổi bật lên để biết, còn khai báo thường bị dồn chữ rất xấu"; "càng trực quan càng dễ dùng" → làm cả bấm chữ trên bản xem trước.
- `js/31-o-mau.js`: phần dòng dùng chung `omO1Phan` / `omDsDong` (tên + nguồn · nút ✍ / 🤖 / ⌨ · giá trị · Chọn nhanh, vạch màu trái = nguồn, cùng màu nền ô trên mẫu); ⚙ Khai báo riêng hết dồn chữ (trước tên rơi vào cột 170 px), tiêu đề có tóm tắt số ô theo nguồn (`omDemNguon`), chọn cỡ chữ; bấm tên dòng → mở 🖼 trực quan đúng dòng.
- 🖼 Trực quan: khung phải = cả danh sách, dòng đang chọn mở rộng chi tiết cũ (`omKBChiTiet`: nguồn, tự gõ, chép tự động, chữ mẫu, mặc định ô, cả phần); bấm trên mẫu ↔ dòng sáng, `omKBDanh` viền đỏ + cuộn; gõ không mất con trỏ.
- Bản xem trước (`omXemGan` / `omXemBam`): chữ app điền rê chuột có viền màu nguồn (chỉ màn hình); bấm → dòng Chọn nhanh cột trái sáng + con trỏ vào ô, không có → mở trực quan đúng dòng.
- Mọi mẫu nền ô: nút ⚙ Khai báo riêng cạnh ⚙ Khai báo đơn vị; cột trái chỉ Chọn nhanh (có vạch màu); mẫu in kèm (01/TĐCK theo 09A) có nút ⚙ ngay ở Chọn nhanh.
- Phép thử mới `t363`; `t176`, `t184`, `t191`, `t201` cập nhật theo bố cục mới.

## 3.454 — 02/11/2026 — Mẫu 10A khóa trang 3–4, tự bù khi phần đầu dài (TK 2)
- **Anh 02/11:** "Mẫu 10A anh muốn khóa cứng trang cuối như vậy" (trang 3 bắt đầu "b) Tổ phó", trang 4 bắt đầu "III."); "trang 1-2 nếu có dài ra 1 dòng thì giảm…"; "có thể giảm dòng số hộ vay, vì ít khi tổ đủ 100".
- `js/mau/10a.js`: ngắt trang cứng bản in trước "b) Tổ phó" và "III. BẦU BAN QUẢN LÝ" (lớp `tr-sang-in`); app ước số dòng phần đầu trang 1 (`hso10aDong`, mốc `HSO_10A_DAU` = 15 ở js/25) — dư bao nhiêu dòng bớt bấy nhiêu hàng khung tổ viên (còn đủ ô cho tổ); tổ gần đủ 100 / khung để chấm → giữ 34 hàng, thu chiều cao hàng.
- **Word:** chưa khóa ngắt — Word các mẫu nền ô chưa theo canh / cỡ chữ của bản in (đoạn canh trái, chữ 13), khóa ngắt trong Word thành 5 trang; Word giữ như cũ (4 trang). Việc làm Word giống bản in để sau, chờ anh duyệt.
- Phép thử `t358` thêm 4 trường hợp (thường, Trưởng ấp tên dài, + Thư ký tên dài, khung để chấm + tên dài); chuẩn in `t179` 10A ghi lại.

## 3.453 — 02/11/2026 — Mẫu 10C theo quy chuẩn 10A, kết nạp / cho ra số lượng lớn (TK 2)
- **Anh 02/11:** "10C cũng tương tự, riêng 10C cho chọn hộ từ danh sách để kết nạp và cho ra khi chia tách số lượng lớn"; Về việc "Kết nạp tổ viên, cho tổ viên ra khỏi Tổ, bình xét cho vay, sửa đổi Quy ước hoạt động của Tổ,… và các nội dung khác"; "bảng kẻ ô tùy biến số dòng kết nạp, cho ra (cùng 1 bảng như nhau), số dòng họp bình xét thêm hoặc bớt"; "chọn KH từ danh sách tổ chọn từ cây địa bàn"; "cho ra là từ tổ đang chọn, kết nạp từ tổ khác và cũng có thể từ tổ của mình (hoàn thiện thủ tục)"; "kết nạp hay cho ra qua lại chỉ trong cùng 1 ấp".
- `js/mau/10c.js` (dùng chung `HST`): chữ 14, tiêu đề 15 + kẻ; Về việc **chọn nhiều** (tự theo việc đã làm: kết nạp / cho ra / có danh sách vay); chữ liền in thường, chấm giữ form; ấp / khu phố – xã / phường, Trưởng ấp; Chủ trì / Thư ký / cán bộ Hội "Ông (bà): tên ⇥ Chức vụ"; Hội bỏ xã; bảng I / II và bảng 2 có dòng tiêu đề lặp khi sang trang, **số dòng ＋ / −** (không ít hơn số hộ); tên theo Mã KH, hoa đầu từ; tách ô (cán bộ Hội 3, kết nạp / cho ra 2, chữ ký 4); Nhập liệu riêng (Điền hết / Tùy chọn); 2 trang.
- **Cột trái 10C** (`hso10cTrai`): bảng hộ vay 2 cột **Cho ra · Kết nạp** (loại trừ nhau; mới vào → Kết nạp, tất nợ / đã ra khỏi tổ → Cho ra tích sẵn), hộ khác ấp không cho tích Kết nạp; **➕ Kết nạp từ tổ khác (cùng ấp)**: hộp chỉ hiện tổ cùng xã + cùng mã ấp, tích / tích hết, "Kết nạp n hộ"; app nhớ hộ chuyển sang tổ nào (`chuyen10c`) → lập 10C cho tổ nguồn tự tích Cho ra.
- Sổ luật: QT-C-10 bổ sung "kết nạp / cho ra chỉ trong cùng 1 ấp".
- Phép thử mới `t362`; `t163` cập nhật; `t180` / `t181` 10C nhóm đổi bố cục anh duyệt; chuẩn in `t179` 10C. Hồi quy đủ.

## 3.452 — 02/11/2026 — Mẫu 10B theo quy chuẩn 10A (TK 2)
- **Anh 02/11:** "làm tiếp mẫu 10B theo đúng quy chuẩn 10A đã làm".
- **Phần chung mới `js/mau/0hst.js` (`HST`)** cho mẫu Hồ sơ Tổ làm lại (10B, 10C; 10A chuyển sang dùng chung lần sửa tới): `HST.ds` (tổ viên + TT / TP theo File Tổ trưởng, sắp Mã KH), `HST.bo` (chữ liền / chấm, ô 1 giá trị ⌨ đè, "Ông (Bà): tên", địa bàn, tab chức vụ, tiêu đề + Về việc vừa dòng + kẻ), `HST.bang` (bảng hộ vay: cột tích theo mẫu, lọc ấp, tìm, tích / bỏ hết, sắp), `HST.tach`, `HST.noi`, `HST.hoi`.
- Khung mẫu chung (js/31): **ô chọn nhiều** `nhieu:1` (nút bật / tắt theo thứ tự chọn, `chonTu` = theo việc đã làm, ➕ thêm nội dung).
- `js/mau/10b.js`: Về việc chọn nhiều (kết nạp tổ viên · bầu thay đổi thành viên BQL — tự theo việc tích); chữ 14, tiêu đề 15 + kẻ; chữ liền in thường, chấm giữ form (dòng chấm không xuống dòng); ấp / khu phố / thôn – xã / phường, Trưởng ấp / khu phố; "Ông (bà): tên" ⇥ "Chức vụ" (chủ trì, bầu thay); Hội bỏ xã; kết nạp in theo Mã KH, hoa đầu từ; PHÊ DUYỆT đậm; tách ô (bầu thay 4, UBND 4, chủ trì 3, chữ ký 2, tổ tại thôn / Hội, tổng số sau họp); Nhập liệu riêng (Điền hết / Chừa phê duyệt UBND / Tùy chọn); 2 trang, 3 chú thích giữ đáy trang 1.
- `js/25c`: 10B bảng hộ vay (cột Kết nạp, mới vào tích sẵn), ô bầu thay có danh sách tên trong tổ, Chọn nhanh; nút ⚙ Khai báo riêng chung cho mẫu có khối Nhập liệu riêng.
- Phép thử mới `t361`; `t180` / `t181` 10B vào nhóm đổi bố cục anh duyệt; chuẩn in `t179` 10B. Hồi quy đủ.

## 3.451 — 02/11/2026 — Thông báo kế hoạch dư nợ: giãn tiêu đề, gọn số (TK 2)
- **Anh 02/11** (ảnh Thông báo điều chỉnh KH dư nợ, tab Phân bổ KH): "giãn thêm dòng tiêu đề như hình, thu gọn khoảng trống số QĐ".
- `js/mau/07pb.js`: 2 dòng tiêu đề "THÔNG BÁO … KẾ HOẠCH DƯ NỢ" / "NĂM …" cách 6 pt giữa và sau (lớp `sau` — Word cùng thông số); chỗ trống số thông báo khi chưa có số 10 → 5 khoảng trắng.
- Phép thử `t253`, `t256` đạt.

## 3.450 — 02/11/2026 — Mẫu 10A: sửa thụt dòng Chủ trì (TK 2)
- **Anh 02/11** (ảnh): "chủ trì bị thụt vào".
- Nguyên nhân: khung tên trước tab thừa hưởng thụt đầu dòng 12,7 mm → thụt gấp đôi (cả III a / b). Sửa: khung tên `text-indent:0`.
- Dòng dài (Chủ trì có chức vụ + Hội): điểm tab lùi về sát tên để vừa 1 dòng; vẫn dài thì canh trái (không giãn chữ). III a / b dùng chung 1 điểm tab → thẳng hàng cả khi tên dài. Word theo cùng điểm tab.
- Ô 1 giá trị (họ tên trưởng thôn, chủ trì, chức vụ, Hội, thư ký, III a / b, UBND tổ trưởng / tổ phó, chữ ký): ⌨ tự gõ / 📝 chữ mẫu nay đè số liệu tự động (trước in số liệu tự động).
- `t358` thêm 3 ý; chuẩn in `t179` 10A.

## 3.449 — 02/11/2026 — Mẫu 10A: bảng hộ vay của tổ, họ tên ⇥ chức vụ, tách ô (TK 2)
- **Anh 02/11:** "app điền thì cách 1 tab và có 2 chấm, để chấm thì giữ form"; "Về việc dài thu nhỏ 1 cấp cho vừa 1 dòng hoặc cân 2 dòng"; "có dòng gạch dưới tiêu đề, dài bằng chữ Biên bản họp"; "Hội Nông dân, Hội Phụ nữ không cần ghi tên xã phường"; "mỗi dòng cho chọn tự động hay chấm ghi tay — phần III bầu, phần UB phê duyệt cũng vậy"; "chọn tổ hiện bảng danh sách hộ vay theo mã KH, dư nợ để loại hộ dư nợ = 0 — in theo mã KH, mặc định tích hết — phải có tổ trưởng, tổ phó".
- `js/mau/10a.js`: **bảng hộ vay của tổ** ở cột trái (`hso10aDs`, `hso10aBang`, lệnh `h10a.*`): tổ viên + **tổ trưởng / tổ phó theo File Tổ trưởng (MATT / MATP) dù không vay**, nhãn TT / TP, sắp Mã KH (bấm Dư nợ để sắp theo dư nợ), hộ dư nợ 0 tô vàng, nút bỏ tích hộ dư nợ = 0 (giữ TT / TP), mặc định tích hết, ghi kỳ số liệu; **in vào khung theo Mã KH**. Họ tên app điền: "Ông (Bà): tên" (trưởng thôn, chủ trì, thư ký, III a / b), III a / b và Chủ trì có **tab** trước "Chức vụ:" (Word: tab thật + điểm dừng 95 mm); để chấm giữ form gốc. Dòng Về việc dài → cỡ 13 vừa 1 dòng, không vừa → 2 dòng cân; **kẻ dưới tiêu đề dài bằng "BIÊN BẢN HỌP"**. Hội ở dòng Chủ trì bỏ xã / phường. **Tách ô**: III a / b · phê duyệt UBND (địa bàn / tổ trưởng / tổ phó) · địa bàn 2 dòng · chủ trì (họ tên / chức vụ / Hội) · chữ ký (trưởng thôn / chủ trì) — cách đã chọn ở ô cũ chuyển sang ô con.
- `hsoDocx` (js/25b): `span.tab` → tab, `p[data-tab]` → điểm dừng tab (chỉ mẫu dùng mới có tác dụng).
- Phép thử `t358` thêm ý, `t163` Tổng số tính cả TT / TP; chuẩn in `t179` 10A. Hồi quy đủ.

## 3.448 — 02/11/2026 — Mẫu 10A theo VB 4336, khai báo riêng dạng nút; cây lọc tên xã (TK 2)
- **Anh 02/11:** "cây lọc địa bàn bị lỗi ra vay trực tiếp" (ảnh: kỳ T10 cả 5 xã hiện "Vay trực tiếp"); "khai báo riêng làm 1 nút riêng như các mẫu Giao dịch xã"; "tổng số tổ viên để bên cột cuối, chữ 14 vẫn vừa"; "dòng phê duyệt UBND in đậm"; "họ tên — chức vụ ghi liền"; "phần Nhập liệu thiết kế cho đơn vay, mỗi mẫu thiết kế riêng"; "xã ấp tự đổi theo đơn vị hành chính"; VB 4336/HD-NHCS: tiêu đề "Biên bản họp về việc kiện toàn hoạt động của Tổ TK&VV theo Quyết định số 70/QĐ-HĐQT", nội dung "…tự nguyện họp để kiện toàn hoạt động của Tổ Tiết kiệm và vay vốn…".
- **Cây lọc (js/22g `toTenXa`):** tên xã của tổ lấy Mẫu 31 → File Tổ trưởng (TENXA theo mã tổ, ưu tiên) → danh bạ khách → danh mục; không bao giờ để tên dạng "… trực tiếp"; không ra tên → "Mã xã …". Nguyên nhân (suy từ code): file T10 cột Tên xã không cho ra tên thật, bước sửa 3.409 chỉ dựa Mẫu 31 + danh mục.
- **10A (`js/mau/10a.js`):** ô Về việc **Thành lập / Kiện toàn** — Kiện toàn đổi tiêu đề và câu nội dung theo VB 4336 (phê duyệt UBND giữ); chữ 14, tiêu đề 15; "Tổng số … tổ viên" ở dòng cuối cột 3; dòng PHÊ DUYỆT UBND in đậm; địa bàn "Ấp / Khu phố / Thôn …, xã / phường …", "Trưởng ấp / khu phố / thôn" theo tên ấp (để chấm giữ gốc); dòng chấm Trưởng thôn / Thư ký vừa 1 dòng; ô ✏ gõ trong lần làm (giờ, số người, biểu quyết, kết thúc) nay in đúng; 4 trang (in + Word).
- **Khối Nhập liệu riêng 10A:** Điền hết / Chừa phê duyệt UBND / Tùy chọn (tên phần theo 10A) — khung chung cho mẫu tự khai `dien` / `phanTen`, mẫu chưa khai như cũ.
- **Nút ⚙ Khai báo riêng** cạnh ⚙ Khai báo đơn vị: hộp mọi dòng theo thứ tự mẫu (nguồn, giá trị / nút chọn, Chọn nhanh, sang 🖼 trực quan, ↺ mặc định); cột trái chỉ còn dòng Chọn nhanh.
- Quy chuẩn mẫu ghi `QUY_CHUAN_KIEN_TRUC.md` mục 9.8. Phép thử `t358` cập nhật, mới `t360`; chuẩn in `t179` 10A. Hồi quy đủ.

## 3.447 — 02/11/2026 — Mẫu 10A: rà bố cục tổng thể (TK 2)
- **Anh 02/11:** "rà xem lại khung Mẫu 10A, đảm bảo bố cục tổng thể".
- **Sửa lỗi (từ 3.443):** biến dòng tổ viên trùng tên biến ngày họp → dòng "Thời gian bắt đầu" in sai "ngày 1/0/2"; nay in đúng ngày đã chọn (hoặc chấm).
- Chữ liền: thêm khoảng trắng sau ", xã", ", tỉnh" (thành phần tham dự, phê duyệt UBND), "kể từ tháng" — trước dính "xãGia Lộc", "tỉnhTây Ninh".
- Dòng "Thư ký" để chấm vừa 1 dòng (rút dòng chấm).
- Rà 4 trang (dữ liệu giả, bản in): trang 1 đầu mẫu + tổ viên 1–22 · trang 2 tổ viên 23–34 / 57–68 / 91–100, Tổng số, II.1–4 · trang 3 II.4a–5g · trang 4 hết II, III, IV, chữ ký (~4 cm), phê duyệt UBND (~3 cm dưới chỗ ký). Word 4 trang.
- `t358` thêm ý ngày họp. Hồi quy đủ 3.446: 238/239 — `t181` (chồng khít) 10A trượt do chữ liền anh chốt → 10A chỉ giữ cùng số trang (như 01/TD, 03/TD).

## 3.446 — 02/11/2026 — Mẫu 10A: chữ đều, khai báo riêng (TK 2)
- **Anh 02/11:** "chữ cả file không đều, lúc to lúc nhỏ, đậm lợt không khớp mẫu — font 13, tiêu đề Biên bản họp lớn hơn; điền tự động theo dạng gõ tự nhiên, để chấm mới giữ form ghi tay; tên qua bước hoa đầu từ; làm khai báo riêng mẫu từ trên xuống: Về việc có 2 loại (thành lập / củng cố — tạm chỉ đổi tiêu đề), số người, trưởng thôn, chủ trì…; họp định kỳ chọn quý hoặc tháng rồi ngày; nút chọn 1–2 hoặc danh sách sổ xuống, thêm được trong khai báo riêng; Thời gian / Địa điểm chỉ đậm phần có sẵn; vừa đủ 4 trang".
- `js/mau/10a.js`: cả mẫu cỡ 13 (ô "Mẫu số" góc phải giữ 11 như gốc), "BIÊN BẢN HỌP" cỡ 15; chữ điền **liền như gõ tay, in thường** (`lien`), ô trống giữ chấm; đậm đúng gốc (nhãn "Thời gian bắt đầu:", "Địa điểm:", "Tổng số:"…; "PHÊ DUYỆT…" thường); tên tổ viên, tổ trưởng, tổ phó, trưởng thôn, chủ trì, thư ký **hoa đầu từ** (`tenHoaDau`, không thêm dấu); khung tổ viên cỡ 13, tên dài thu 12 / 11 / 10; 4 trang (in + Word).
- Ô mới: **Về việc** (Thành lập / Củng cố — chỉ đổi dòng tiêu đề, nội dung + phê duyệt giữ "thành lập" chờ anh), **Họp định kỳ hằng tháng / quý** (chưa chọn → giữ "tháng (quý)"), ngày họp định kỳ + tiết kiệm lấy số đã gõ ở ô cũ.
- **⚙ Khai báo riêng 10A** ở cuối cột trái (mẫu Hồ sơ Tổ trước chưa có): đủ ô từ trên xuống, 🖼 Khai báo trực quan, Chọn nhanh mặc định Về việc · ngày họp · họp định kỳ · ngày · tiết kiệm. Bỏ 2 ô cũ cột trái (vẫn hiện nếu rút mô-đun 10A).
- Phần chung: khung mẫu nền ô (js/31) thêm **ô chọn** `l:'chon'` — ≤ 3 lựa chọn nút bấm, nhiều hơn danh sách sổ xuống, ➕ thêm lựa chọn riêng (`hsoLuu().omChon`), lệnh GD `omc.*`; Word (`hsoDocx`) giữ in thường cho chữ điền trong dòng đậm. Mẫu khác không dùng nên không đổi.
- Phép thử `t358` thêm ý; chuẩn in `t179` 10A ghi lại. Hồi quy đủ.

## 3.445 — 02/11/2026 — Scan: bổ sung ấp cho bản tổ trưởng thiếu ấp (TK 2)
- **Anh 02/11** (ảnh tab Scan): "t/h là tổ trưởng nhưng không nhận ấp" → duyệt: sửa lúc lưu + nút bổ sung cho bản cũ.
- Nguyên nhân (suy từ code): tổ trưởng nhận qua **chủ TK 104** (3.442) không có dòng File Tổ trưởng → ấp, tổ trống; tổ trưởng cũ từ File Tổ trưởng thiếu cột tên thôn; bản lưu từ bản app trước.
- `ttApBu(k)` (js/84): bản đã gắn mã KH mà trống ấp → ấp theo ① tổ (bảng tổ kỳ đang mở / danh bạ tổ) ② File Tổ trưởng mọi kỳ (mã KH = MATT hoặc mã tổ) ③ Mẫu 31 (chính khách đó, rồi ấp đa số món vay của tổ) ④ mã thôn đã có (TK 104) → tên ấp theo tổ / khách cùng mã thôn, cuối cùng danh mục Cài đặt. Không ra → để trống, vẫn ⚠ (không đoán). Ghi nguồn `k.apTu`.
- Lúc lưu (`scanLuuTu`, js/41): giữ `k.maTo`, tự gọi `ttApBu`. Bản đã lưu: nút **🔧 Bổ sung ấp (n)** trên thanh Chờ sắp xếp (lệnh `ttap.bu`) — anh bấm mới điền, chỉ điền ô trống.
- Dòng CCCD không nhận (QR không đọc ra tên, số không có trong Mẫu 31 / File Tổ trưởng): chờ anh cho biết người đó — chưa sửa.
- Phép thử mới `t359` (dữ liệu giả).

## 3.444 — 02/11/2026 — Mẫu 10A gọn 4 trang, chừa chỗ ký (TK 2)
- **Anh 02/11:** "bố cục lại còn 4 trang" → chọn cách A; "chừa chỗ ký tên cho thoải mái, có thể giảm lề và các giãn dòng dư".
- `js/mau/10a.js`: bỏ ngắt trang cứng trước phần II (khung 100 dòng cao cố định + Tổng số đã giữ bố cục — sửa tên không xô trang); lề trên / dưới 20 → 15 mm; thân bài giãn dòng 17 → 16 pt (chữ vẫn 14); khoảng trống dưới tiêu đề 11 → 6 mm; dòng khung 6,2 → 5,8 mm (`HSO_10A_CAO`); chỗ ký Thư ký / Trưởng thôn / Chủ trì 3 → 4 dòng trống; tiêu đề mục II–IV không treo cuối trang (class `kt-b`).
- Tên dài hơn ô → tự thu chữ 11 / 10 / 9 (`hso10aCo`), ô không xuống dòng.
- Kết quả (dữ liệu giả): bản in **4 trang**, trang 4 dưới "UBND CẤP XÃ (Ký tên, đóng dấu)" còn ~31 mm; Word (mở bằng LibreOffice) 4 trang, 100 tên dài vẫn 4 trang.
- Phép thử `t358` cập nhật; chuẩn in `t179` 10A ghi lại; `t180` `doiChuY` 10A thêm bỏ so lề (lề 15 mm anh duyệt).

## 3.443 — 02/11/2026 — Mẫu 10A: khung 100 tổ viên cố định (TK 2)
- **Anh 02/11:** "Mẫu 10A của tổ có tối đa 100 thành viên, dựng sẵn khung tối đa 100 tv, 3 cột, nằm trong trang 1 và trang 2, để khi thay đổi thành viên nếu gõ nhầm không ảnh hưởng trang 3, 4" → chọn 3 cột.
- `js/mau/10a.js`: danh sách tổ viên = khung cố định **100 ô, 3 cột × 34 dòng, đánh số dọc theo cột** (1–34 │ 35–68 │ 69–100), chữ cỡ 12, ô trống để chấm; "Tổng số" ngay dưới khung; "II. QUY ƯỚC" luôn sang **trang 3** (phần II → phê duyệt UBND vẫn 3 trang như mẫu gốc → cả mẫu 5 trang).
- Tích > 100 tổ viên → cột trái báo ⚠, chỉ in 100 người đầu, Tổng số 100.
- Phần chung (chỉ mẫu dùng mới có tác dụng): bộ in `trDan` (js/05) nhận `.tr-sang` = buộc sang trang; Word `hsoDocx` (js/25b): `.tr-sang` → ngắt trang (pageBreakBefore), bảng `data-cao` → dòng cao cố định (sửa tên không đẩy trang). Hằng `HSO_10A_TV / DONG / CAO` (js/25).
- Phép thử mới `t358` (dữ liệu giả). Hồi quy đủ 235/238 → sửa 3 phép (gộp sau): chuẩn in `t179` 10A ghi lại (anh duyệt đổi mẫu); `t180` 10A đổi bố cục chủ ý (`khop.json` `doiChuY`: 5 trang / gốc 4, không so vị trí dòng); `t309` bảng Tổ trưởng 7 cột (3.440 thêm CCCD — phép thử cũ chưa cập nhật).

## 3.442 — 02/11/2026 — Quét CCCD: đối chiếu chủ TK 104 (TK 2)
- **Anh 02/11:** "em cho quét số TK 104 cho chắc" → chọn **đối chiếu chủ TK 104**.
- `tk104TimTT` (js/28): File Tổ trưởng không khớp (số CCCD / CMND cũ / tên + ngày sinh) → rà MỌI file Sao kê TK 104 đã nạp — người đứng tên TK 104 là tổ trưởng; Sao kê không có số CCCD nên khớp **họ tên**, chỉ nhận khi **đúng 1 mã KH** mang tên đó (trùng → không đoán); tổ lấy theo File Tổ trưởng (MATT = mã KH) hoặc tổ đang có tổ trưởng mã KH đó (`trTTHienTai`) → lưu như tổ trưởng hiện tại / tổ trưởng cũ. Dòng báo ghi "chủ TK 104 <số TK> (cùng họ tên)".
- `t357` thêm 2 ý (9/9); Scan `t336`, `t337` đạt.

## 3.441 — 02/11/2026 — Quét CCCD: nhận tổ trưởng không vay qua mọi File Tổ trưởng (TK 2)
- **Anh 02/11:** "khi gặp CCCD em cũng cho rà ds các tổ trưởng cũ nếu đúng thì lưu luôn, hiện tại có 1 số tổ trưởng nhưng không có vay không nhận ra".
- **Nguyên nhân có thể (chưa có file thật để xác minh):** ① File Tổ trưởng / Danh sách tổ còn ghi **số CMND cũ 9 số** trong khi thẻ là CCCD 12 số → không khớp số; ② Mẫu 31 có **người trùng tên** (gợi ý) → app bỏ qua bước tra tổ trưởng (3.415 chỉ tra khi Mẫu 31 không có gợi ý nào).
- **Sửa:** `dsTimTT` (js/28) rà MỌI File Tổ trưởng đã nạp (mới nhất trước) theo số CCCD → số CMND cũ đọc từ thẻ (QR) → **họ tên + ngày sinh** (2 người trùng → không đoán); `trTimTT` (js/45) bảng tổ kỳ đang dựng khớp cả CMND cũ; `trTTHienTai`: cùng CIF tổ trưởng hiện tại của tổ → lưu như tổ trưởng hiện tại, không → tổ trưởng cũ. Quét CCCD (js/41) tra tổ trưởng cả khi Mẫu 31 chỉ có gợi ý trùng tên (không khớp số); 🔎 Tra Mẫu 31 hộp Lưu dùng CMND cũ + ngày sinh đọc từ thẻ.
- Phép thử mới `t357` (7 ý); Scan `t235`, `t336`, `t337`, `t338`, `t339` đạt.

## 3.440 — 02/11/2026 — Tra cứu: cột CCCD tổ trưởng trong bảng Tổ trưởng (TK 2)
- **Anh 02/11** (ảnh Tra cứu › Tìm theo Tổ trưởng): "anh muốn truy vấn được CCCD tổ trưởng từ đây, dùng cây lọc địa bàn".
- Bảng Tổ trưởng (js/58 `tcToTim`) thêm cột **CCCD**: **Đã lưu** / **Thiếu** — cùng luật 👑 Kiểm CCCD tổ trưởng (`ttkCo`, js/84: khớp mã KH tổ trưởng CIF hoặc số CCCD Danh sách tổ / Mẫu 31 với bản scan đã lưu); rê chuột thấy số CCCD + ngày lưu; lọc cột Đã lưu / Thiếu (js/77); dòng Cộng ghi đã lưu / tổng theo lọc địa bàn. Rút js/84 → không có cột (cắm rút).
- Phép thử mới `t356` (4 ý); `t246` sửa theo cột mới; Tra cứu `t107`, `t244`, `t247`, `t351` đạt.

## 3.439 — 01/11/2026 — Phân bổ KH: nạp QĐ từ mẫu Excel chuẩn, bỏ nhập file app cũ (TK 2)
- **Anh 01/11:** chọn "bỏ app cũ, nạp QĐ mới" + "file scan và chụp không chuẩn để đọc 100%, nên anh cần em đưa ra bố cục Xls chuẩn để anh cho Gemini tạo" → duyệt mẫu → "code rồi gộp".
- **Mẫu Excel** (⬇ Tải mẫu trong tab): HUONG_DAN (luật + lời nhắc cho Gemini) · QD (mỗi QĐ 1 dòng) · CHI_TIET (1 QĐ × 1 xã × 1 CT, triệu đồng, giảm ghi âm) · TONG (dòng tổng trên QĐ) · DM_CT (mã chương trình app).
- **📥 Nạp QĐ (Excel mẫu):** `pbTuXls` (js/47, thuần) đọc + kiểm; giao diện `pbNhapXls` / `pbXlsVe` / `pbXlsLuu` (js/48): **xem trước** — lỗi đỏ (thiếu cột, số QĐ không có ở QD, mã CT ngoài danh mục, số không đọc được, lặp) thì không cho lưu; tô vàng: đến 31/12 ≠ đã giao + tăng/giảm, tổng các xã ≠ dòng tổng QĐ, Gemini ghi "KHÔNG CHẮC", đã giao ≠ đến 31/12 QĐ trước, chưa ghép được xã; QĐ trùng (số + ngày + nguồn + xã) → **ghi đè / bỏ qua**. Bấm Lưu mới ghi.
- **Bỏ:** nút 📥 Nhập từ bản WPF + `pbTuWPF`, `pbNhapWPF` (anh chọn bỏ app cũ); QĐ đã nhập trước đây giữ nguyên.
- Phép thử: `t250` thay ý WPF bằng 6 ý mẫu Excel (69/69); `t252`–`t256` nạp QĐ giả qua mẫu Excel (tiện ích `tests/pb_gia.js`); mới `t355` (5 ý).

## 3.438 — 01/11/2026 — Tag nguồn văn bản theo số hiệu + loại văn bản Trung ương (TK 2)
- **Anh 01/11:** "Nghị định của CP có dạng số hiệu như vậy (54/2026/NĐ-CP) nên em nên có 1 tag riêng để chọn các VB của ban ngành TW" + "của ngân hàng tỉnh thường có dạng NHCS-KHTD, gặp loại này em lọc riêng 1 dạng tag gọi là chỉ đạo của Tỉnh" → "đồng ý em code".
- **Gói cắm rút mới `js/91-nguon-vb.js`:** `vbnNhom(số hiệu)` → 🏛 **VB Trung ương** (số/NĂM/ký hiệu, -CP, -TTg, -BTC, -NHNN, …/QH15…), 🏦 **NHCSXH Trung ương** (HĐQT, NHCS-TDNN / TDSV / KHNV, HD-NHCS), 📍 **Chỉ đạo của Tỉnh** (NHCS-KHTD); ký hiệu khác chưa có trong danh sách → không gắn. Khai / sửa văn bản: gõ số hiệu → tự thêm chip tag (gỡ được). Văn bản cũ: nút **🏷 Gắn tag nguồn (n)** đầu tab Văn bản — hỏi trước, chỉ thêm tag (`suaLuc` để đồng bộ). Lọc: bộ lọc tag sẵn có.
- **Trước:** số hiệu 54/2026/NĐ-CP đoán loại "Công văn". **Nay:** `doanLoai` nhận Nghị định · Thông tư · Nghị quyết · Chỉ thị · Luật · Quyết định (TTg) cho văn bản Trung ương; danh mục loại thêm 5 loại mới (1 lần, giữ loại cũ — anh bỏ thì không tự thêm lại; khóa `loaiVB3438` ghi sổ cài đặt).
- **Tự động khi thêm file (anh 01/11 "dạng 54/2026/NĐ-CP hiện em chưa có tự động"):** đọc chữ PDF "Số: 54/2026/NĐ-CP" trước chỉ ra "54" → nay đủ số hiệu (`rutSoHieu`, js/03); tên file "54_2026_NĐ-CP", "54-2026-NĐ-CP", "54 2026 NĐ-CP" → 54/2026/NĐ-CP (`tuTenFile`; ký hiệu phải VIẾT HOA để không nhận nhầm chữ thường); loại đoán theo số hiệu đủ (Nghị định dù nội dung có chữ "quyết định"). Mở hộp khai (`suaCho`): số hiệu Trung ương có sẵn → tự gắn tag; loại đang "Công văn" (đoán cũ) → đúng loại.
- Phép thử mới `t354` (23 ý); thứ tự nạp `t138`, phép thử nhanh 37/37 đạt.

## 3.437 — 01/11/2026 — Nút đổi chữ ô Tên văn bản (TK 2)
- **Anh 01/11** (ảnh khai văn bản tên viết HOA hết): "anh muốn có nút sang chữ thường, viết hoa đầu câu, hoặc chuyển hết sang chữ hoa, hoặc sang chữ hoa đầu từ như tên".
- Ô **Tên văn bản** (khai / sửa văn bản): 4 nút góc phải **aa** (thường) · **Aa.** (hoa đầu câu) · **AA** (hoa hết) · **Aa Aa** (hoa đầu mỗi từ) — `chuDoi`, `chuDoiNut` (js/06, lệnh GD `chu.doi`). Giữ nguyên ký hiệu / viết tắt: từ có số, "/", "-" hoặc trong danh sách (NHCSXH, HĐQT, QĐ, UBND, TK&VV…); gọn khoảng trắng thừa; đổi xong xem trước tên file cập nhật.
- Phép thử mới `t353` (8 ý).

## 3.436 — 01/11/2026 — Lãi tồn số liệu theo ngày (QT-C-03 bổ sung) (TK 2)
- **Anh 01/11:** "cách tính lãi tồn trước đây đúng, ví dụ món vay đã trả lãi đến ngày GD của tháng trước coi như không có lãi tồn, nếu chưa đến ngày GD tháng sau" → "code rồi gộp".
- **Kiểm:** công thức không đổi từ 24/10 (TH + QH); khác do loại file — Mẫu 31 **theo ngày** ghi Lãi tồn TH gồm lãi tính dồn từ phiên gần nhất đến ngày báo cáo, Mẫu 31 **chốt tháng** thì không (anh so tab Tổ T9: chỉ 3 người có nợ lãi ↔ 30/10: cả tổ có lãi tồn nhỏ).
- **Sửa (js/22g `toLaiTonNgay`, gọi trong dựng kỳ):** kỳ theo ngày — phiên gần nhất = ngày GD của điểm trong tháng của ngày số liệu (chưa tới → tháng trước, `toPhienGan`); món có Ngày GD gần nhất ≥ phiên → lãi tồn = Lãi tồn QH; không giao dịch ở phiên → giữ TH + QH; chốt tháng, món trực tiếp, dòng có cột lãi tồn riêng (Mẫu 10) không đổi. Mọi chỗ dùng `laiTon` theo (thẻ tổ, thẻ khách, số tháng lãi, bộ số, file đối chiếu, 06A).
- Sổ luật QT-C-03 ghi bổ sung (🔧 — giao ban chưa áp); hộp thư nhờ TK 1 áp + thêm trường hợp mẫu C03-2 + kiểm cột *Lãi DT chưa đến hạn*.
- Phép thử mới `t352` (10 ý); `t328` 38/40 như cũ.

## 3.435 — 01/11/2026 — Tra cứu theo ô kỳ góc phải, ghi rõ kỳ số liệu (TK 2)
- **Anh 01/11:** "anh chọn dữ liệu trên góc phải tháng 9 mà vẫn tính tháng 10" → "app sẽ mặc định lấy kỳ mới nhất nhưng khi anh chọn thì phải theo cột số liệu" + "em luôn ghi là lấy dữ liệu theo kỳ nào ở các bảng".
- **Trước (3.347, anh 24/10):** Tra cứu luôn lấy số liệu MỚI NHẤT, không theo ô kỳ. **Nay:** `tcKyDung()` (js/22h) = kỳ chung có số liệu → kỳ đó; chưa chọn / không có → mới nhất. Thẻ khách: món vay, Tổng dư nợ / QH / khoanh / lãi tồn, **Số dư 105 (QT-C-01, theo kỳ)** lấy kỳ đang dùng; đầu thẻ ghi **📅 kỳ**; khách không có ở kỳ chọn → báo "không có trong số liệu … (có ở …)"; nhân thân / SĐT / CCCD theo bản gần nhất (QT-C-22), dòng Số dư 105 khối Liên hệ ghi kỳ nguồn khi khác. Thẻ tổ + cây phạm vi + dòng LỌC ĐỊA BÀN theo kỳ đang dùng.
- Luật ghi `AGENTS.md`: mọi bảng / thẻ có số liệu ghi rõ kỳ.
- Phép thử mới `t351` (9 ý); Tra cứu `t107`, `t244`, `t246`, `t247`, `t277`, `t350` đạt.

## 3.434 — 01/11/2026 — Tra cứu khách: khối Tổ & địa bàn trọn trong ô (TK 2)
- **Anh 01/11** (ảnh thẻ khách): "khối tổ phải cuộn do số liệu nhiều, cân đối lại cho trọn trong ô".
- **Sửa (js/58 `tcToKhoiHTML` + CSS):** mã tổ (chép được) + nút 🏘 Tổ của điểm GD lên dòng tiêu đề khối; ghi chú "Số liệu ngày … theo Mẫu 31 …" → ⓘ rê chuột cuối dòng Thành viên; nhãn "Hội · Điểm". Hàng 3 cột: tối thiểu 170px như 3.337, nhiều số liệu thì cao thêm (không cuộn trong ô); cột Tổ rộng 1,3 phần.
- **Thẻ tổ (Tra cứu): bỏ nút 👪 Lập hồ sơ hộ mới vào tổ** — anh 01/11 "nút lập hs mới của tổ anh đã yêu cầu bỏ đi" (anh 29/10 đã bỏ; 3.410 gỡ Diễn biến tổ đã trả lại nhầm). Lập hồ sơ vào tổ vẫn có ở 🏘 Tổ của điểm GD (chọn tổ → 👪 Lập hồ sơ hộ mới vào tổ này) và Hồ sơ vay › Sổ hộ vay. Bỏ lệnh `tc.ketNap`; `t246` sửa theo.
- Chụp khổ 1366 / 1920 (bộ giả): khối Tổ cao vừa nội dung, không thanh cuộn. `t244` sửa theo (mã tổ ở tiêu đề); `t246`, `t247` đạt.

## 3.433 — 01/11/2026 — Tên xã không còn "Vay trực tiếp" (TK 2)
- **Anh 01/11** (ảnh Tra cứu khách có món GQVL): "chỗ khối liên hệ dòng địa chỉ sao lại có vay trực tiếp" — dòng Ấp · xã ghi "Thuận Tân, Vay trực tiếp".
- **Nguyên nhân:** dòng món vay trực tiếp trong Mẫu 31 ghi cột Tên xã dạng "… Vay trực tiếp"; 3.409 đã sửa cho cây địa bàn (`toTenXa`) nhưng danh bạ khách vẫn lấy nguyên chữ này.
- **Sửa:** danh bạ khách lấy tên xã ở dòng không phải "trực tiếp" (js/22); hàm chung `xaTenSach(mã xã, tên)` (js/22g) — tên dạng "trực tiếp" → tên xã của tổ cùng mã xã, không có → danh mục ⚙ Cài đặt; dùng ở Tra cứu (Ấp · xã, nơi ở gọn, danh sách) và địa chỉ mẫu hồ sơ (`hsoDiaChi` — 09A, 06A…). Danh bạ đã lưu cũng hiện đúng (sửa ở chỗ hiển thị).
- Phép thử mới `t350` (6 ý).

## 3.432 — 01/11/2026 — Có gì mới: hướng dẫn thử + chức năng đã bỏ (TK 2)
- **Anh 01/11:** "mấy hướng dẫn này em luôn ghi vào Có gì mới, và bỏ đi chức năng nào".
- Hộp ✨ Có gì mới: mục **"Thử trên máy — nút mới ở đâu"** (thay "Thử nhanh (5 phút)" cũ — 3 bước của bản 3.2xx) ghi từng nút mới theo bản: Tab › nút: bấm gì → thấy gì (17 dòng 3.415 → 3.431); mục mới **"Đã bỏ / thay thế"** (3.410 gỡ theo dõi tổ, 3.416.x thẻ tổ / danh sách tổ / 👑 bỏ tổ phó).
- `tools/bump.py`: spec **bắt buộc** `thu` (nút mới ở đâu, `[]` nếu không có), `bo` khi bỏ / thay chức năng — tự thêm lên đầu, giữ 20 dòng; mẫu `tools/mau_spec.json`, luật ghi `AGENTS.md`.
- `t192` kiểm 2 mục mới.

## 3.431 — 01/11/2026 — 06A số liệu mặc định cuối tháng trước; đổi tên hàm đối chiếu giao ban (TK 2)
- **Anh 01/11:** "lãi chỉ tính lãi tồn đến ngày báo cáo hoặc số liệu gần nhất có được, nên lấy đến cuối tháng trước làm mặc định".
- **Mẫu 06A:** khi VÀO 06A (bấm chip ở Hồ sơ vay / nút 📄 06A từ KTGS) app đặt kỳ số liệu = **Mẫu 31 chốt tháng trước**; chưa có → số liệu gần nhất trước cuối tháng trước; món chỉ có từ kỳ sau (giải ngân trong tháng này, mở từ KTGS) → kỳ có món. Báo "📅 06A: số liệu đến …"; sau đó anh đổi ô kỳ đầu trang tự do. `hso06aKyMD(kyCo)` (`js/mau/06a.js`), nút KTGS mang `data-ky`.
- **Đổi tên theo TK 1 (bỏ Tèo):** `slDCTeoTinh` → `slDCGBTinh` (`js/22k`, `js/90`, t328, t343, t347); chú thích `js/87`, t344 trỏ `tools/dap_an_giao_ban.py`. Đã gộp PR #449 của TK 1.
- t349 thêm 4 phép (kỳ mặc định 06A).

## 3.430 — 01/11/2026 — Mẫu 06A/TD vào kho mẫu (TK 2)
- **Anh chốt 01/11:** "Mẫu 06 kiểm tra nhiều hộ (hộ vay đúng); khi có sai cần kiểm tra đánh giá từng hộ dùng Mẫu 06A" (sai mục đích, 3 tháng KHĐ) · **mỗi món 1 phiếu** · **số tiền nợ lãi = lãi tồn tất cả** (Mẫu 31 chỉ có Lãi tồn TH + QH — `laiTon`) · "đưa vào kho mẫu, chỗ nào cần thì gọi".
- **Kho mẫu:** file gốc trống `tests/mau_goc/06a.docx` (đã bỏ tên người soạn) + mô-đun `js/mau/06a.js` (nền ô, nguyên văn mẫu, lề 20/20/18/27,5, TNR 13,5, dòng 18 pt) — tab **Hồ sơ vay › 06A/TD**: chọn người vay + món; ô tự điền: tên, mã KH, tổ trưởng, Hội, ngày số liệu, chương trình, số khế ước, giải ngân, dư nợ, nợ lãi, TK 105, mục đích (ngành nghề). Món đã chọn mà kỳ đang mở không còn dư nợ → để chấm (không lấy nhầm món khác).
- **Gọi mẫu:** `hso06aMo(mã tổ, mã KH, số khế ước)` → tab Hồ sơ vay chọn sẵn (`HSO_DEN`). KTGS › Mẫu 06 sau giải ngân (chọn đến tổ): mỗi món có nút **📄 06A**. Danh sách 3 tháng KHĐ: thêm nút sau khi chốt K5.
- Phép thử mới `t349` (Mẫu 31 giả: tự điền, mỗi món 1 phiếu, chữ đúng file gốc, Word, nút KTGS).

## 3.429 — 01/11/2026 — K4: kiểm tra 30 ngày chọn Tất cả / Lần 1; dọn bàn giao cũ (TK 2)
- **Anh chốt 01/11 (K4 / QT-C-15, tạm — chốt lại sau kỳ mới):** "kiểm tra 30 ngày cho chọn lần 1 và tất cả, tính món giải ngân tất cả; 727 chỉ quy định lần 1 nên khi giao kế hoạch cần tối thiểu theo văn bản, còn khi mình cần nên kiểm tra hết".
- **Mẫu 06 kiểm tra sau giải ngân:** chip **Tất cả (n)** (mặc định — như cũ) / **Lần 1 (m)** = món có "Ngày GN đầu tiên" trong tháng GN; thiếu ngày → báo, không tính Lần 1. Ghi chú cuối màn theo lựa chọn. `ktGNLan1`, `ktGNDem`, `ktGNLanHTML` (lệnh GD `ktgn.lan`), `ktGNTo` lọc theo `ktCH().gnLan`.
- **Dọn tài liệu (anh duyệt):** `BAN_GIAO_3224`, `BAN_GIAO_TK2_2510`, `BAN_GIAO_TIEP_TUC` → `docs/luu_tru/` (README); CLAUDE.md dòng đầu trỏ trạng thái hiện nay (`docs/nhat_ky/APP.md`, `TRANG_THAI_CHUNG.md`).
- Phép thử mới `t348` (dữ liệu giả). Hồi quy đủ, chốt lại mốc thước đo.

## 3.428 — 01/11/2026 — Bỏ tên "Tèo", bảng vai, nhật ký theo vai (TK 2)
- **Anh 01/11:** "anh muốn đổi đồng bộ bỏ Tèo … sau này anh sẽ gọi app, giao ban, TK 1, 2, 3 và Gemini — ai sẽ làm gì và ở đâu; các TK khi làm sẽ ghi nhật ký và bàn giao để có thể đổi vai trò".
- **Đổi tên tài liệu** (giữ file tên cũ 1 dòng trỏ — link raw giao ban đang dùng — tới ~01/12): `PHOI_HOP_CHUNG.md` · `QUY_TAC_SO_LIEU.md` · `TRANG_THAI_CHUNG.md` (+ `tools/trang_thai_chung.py`) · `GIAO_BAN_KY_NANG.md` · `KE_HOACH_KY_DOI_CHIEU.md` · `AP_KP_CU.md`; sửa mọi chỗ trỏ trong repo (30 file). Tên kỹ thuật `tests/teo/teo_ca.json` giữ tới khi TK 1 đổi cùng script giao ban.
- **Bảng vai** (`PHOI_HOP_CHUNG.md` mục 1): cổng App (Tủ hồ sơ) · cổng Giao ban (Project chat) · sổ chung; vai App chính (TK 2) · App phụ (TK 3) · Giao ban (TK 1) · Đọc tài liệu (Gemini — đề xuất, chờ anh giao), mỗi vai: làm gì, cửa / quyền ghi, nhật ký.
- **Nhật ký theo vai** `docs/nhat_ky/` (APP · APP_PHU · GIAO_BAN · GEMINI + README): cuối mỗi phiên 1 mục (đã làm · đang dở · bước tiếp · chờ ai · bẫy); đổi vai ghi BÀN GIAO / NHẬN VAI (mục 1a). TK 2 ghi mục đầu `APP.md` (tóm 3.409 → 3.428). `AGENTS.md`, `CLAUDE.md`, `BAT_DAU.md` sửa lời dẫn.
- Chữ app: "📤 File đối chiếu **giao ban**", "Bảng trạng thái chung". Hộp thư: thư gấp cho TK 1 (đổi link raw, cách gọi bên giao ban, tên file phép thử), TK 3, Gemini.
- `t325`, `t328`, `t344`, `t347`, `t138` đạt (sửa chữ nút trong phép thử).

## 3.427 — 01/11/2026 — Tèo: so file giao ban tự phân loại lệch, bảng trạng thái, luật chốt phải có phép thử (TK 2)
- **Anh 01/11:** "em đánh giá nên làm thì anh chốt làm, em code đi" — 3 ý TK 2 đề xuất (ý 2, 3, 1; ý 4 lịch kỳ sau 02/11).
- **Ý 2 — chốt luật = có phép thử** (`QUY_TAC_SO_LIEU.md` 1.10, đầu file): luật ✅ khi đủ câu chữ + ≥ 1 trường hợp mẫu `teo_ca` + hai bên chạy đạt; thiếu → 🔧. **Phân quyền** ghi `AGENTS.md`: kỹ thuật code / GitHub → TK tự chọn tối ưu; việc ảnh hưởng cách anh làm việc / luật → nêu ưu khuyết để anh chọn.
- **Ý 3 — 🔎 So file giao ban** (gói cắm rút mới `js/90-so-gb.js`, nút cạnh 📤 File đối chiếu Tèo): nạp `DOI_CHIEU_GB_<ngày>.csv` (bỏ dòng "#", lấy ngày số liệu), so từng tổ × 17 cột với `slDCTeoTinh`, tự gắn loại: **A** cùng luật mà lệch · **B** `so_tv` (QT-C-14 khác định nghĩa) / `so_mon_khd` (K5 chờ chốt) · **C** khác ngày số liệu · **D** tiền lệch ≤ 1 đồng · **?** dòng chỉ một bên / cột chưa có luật (không đoán); ĐTN ≡ DTN. Bảng tổng tiền 7 cột hai bên, lọc theo loại, 📥 CSV lệch gửi TK 1.
- **Ý 1 — bảng trạng thái Tèo** `docs/TRANG_THAI_CHUNG.md`, tự sinh bởi `tools/trang_thai_chung.py` (gắn vào `tools/bump.py` — mỗi bản tự cập nhật): bản app, sổ luật (✅ / 🔧 / ⏳, luật chờ chốt), phép thử chung chưa đạt hai bên, luật một bên chưa áp, chờ anh quyết (mục 13), hộp thư còn mở theo bên nhận. `AGENTS.md` trỏ tới.
- Phép thử mới `t347` (10 ý); `t138` đạt.

---
Các bản đến 31/10/2026 (3.4xx trở về trước): `docs/luu_tru/CHANGELOG_DEN_3110.md`.
