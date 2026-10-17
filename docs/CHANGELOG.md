# CHANGELOG — Tủ hồ sơ

Ghi theo từng bản. Chi tiết lỗi/rủi ro và mã số (L1, R1, N1…) xem `docs/REVIEW.md`.

---

## 3.223.1 — 17/10/2026 — Bảng kê: viết tắt KP
- **Anh báo:** Bảng kê che mất chữ cuối dòng Địa chỉ ("tỉnh Tây N…"). **Anh chốt:** không thu nhỏ chữ trong mẫu đơn; Bảng kê chỉ cần viết tắt "khu phố" → "KP".
- `gdxBKDC` (js/26) áp cho dòng Địa chỉ Bảng kê (từ Giấy lĩnh và nhập tay); Giấy lĩnh không đổi.
- **Phép thử:** `tests/chuan_lay.js` chuẩn hóa cả "Ngày …" viết hoa (chuẩn khóa Giấy lĩnh không lệch theo ngày chạy); ghi lại chuẩn `gdx_gl_104/105`.
- Kèm kế hoạch: `docs/KE_HOACH_3224_SCAN.md`, `docs/KE_HOACH_3225_LUU.md`, `docs/RA_SOAT_CHU_DAI.md` (rà từng ô: xuống dòng / thu nhỏ / viết ngắn — chờ anh ghi ý).

## 3.223 — 16/10/2026 — Bản lớn: mẫu đúng form gốc trên nền ô, sổ hộ vay đủ cột, lưu an toàn (M0–M8)
- **Anh chốt (16/10, `docs/KE_HOACH_BAN_LON.md`):** mọi chỗ chấm thành ô tùy biến; 3 kiểu in trắng / thật / mẫu; xem luôn đúng form Word gốc, chữ dài thu nhỏ + báo; giữ file gốc để so; mỗi mẫu là mô-đun cắm / rút riêng; 10C, 11 cũ / mới là mẫu độc lập (chip riêng, bỏ chọn theo ngày); ngày Hồ sơ Tổ mặc định chấm; thêm 10D (phương án a); 01/BG, 02/BG, bản điện thoại để sau.
- **M0 chuẩn:** `tests/mau_goc/` 17 file Word đã làm sạch + `so_do.json` (`tools/domau.py`, bỏ bản trùng hộp chữ `mc:Fallback`); `tests/chuan/` bản in khóa; **t179** so từng ký tự, **t180** so với gốc (chữ NFC, số trang, lề, vị trí dòng — bắt buộc với mẫu trong `khop.json`), **t181** chồng khít trắng / thật / mẫu.
- **M1 lưu an toàn B1** (`js/32-kho-luu.js`, cửa `KHO1`): tự chụp khai báo hằng ngày + trước khi nhận Drive / khôi phục / nạp file (giữ 10, bỏ trùng); tab 💾 Sao lưu: ↩ khôi phục, ⬆ xuất / ⬇ nạp khai báo theo nhóm (nhóm có số liệu khách mặc định không tích) — t182.
- **M2 sổ hộ vay đủ cột** (`js/33-so-ho-them.js`): ➕ thông tin thêm mỗi người, chép sang phiếu (`B.nv` / `B.ho`), cột Cần bổ sung theo mẫu + lọc — t183.
- **M3 nền ô** (`js/31-o-mau.js`): `omDangKy` / `omG` / `omLap` / `omMg` / `omCach`; ô khung cố định theo chuỗi chấm gốc, tự thu nhỏ + ⚠ (`OM_DAI`), nén / giãn ký tự, ô 2 dòng trong bảng, khối nhiều dòng; 3 kiểu in + mức điền; Chọn nhanh; 🖼 khai báo trực quan; khóa cũ `hsoLuu().cham / chamGT` đọc được — t184.
- **M4–M7 mẫu theo file gốc** (`js/mau/*.js`, mỗi file 1 mẫu; bỏ file → chip báo chưa có mô-đun): 01/TD, 01/UQ, 03/TD, 09A, 01/TĐCK (≤ 2 mm) · 01/TGTV (giữ bố cục 3 trang đo theo Word 3.219) · 01/GQVL 1,9 mm · 07b 1,8 mm (chú thích ghim đáy trang, phụ lục sang trang mới) · 10C mới 0,9 mm · 10C cũ ~2 mm · 10A 0,7 mm · 10B 1,1 mm · 11 mới 0,3 mm · 11 cũ ~2 mm · **10D mới** 0,6 mm. Kỹ thuật: dòng nowrap tự nén khoảng chữ vừa 159,5 mm; `P2` ngắt dòng đúng chỗ gốc; cách đoạn như Word (dồn sau đoạn, đầu trang không thêm); đoạn gốc tách trang thì tách đúng dòng; hộp chữ trên lề trên vẽ tuyệt đối; giới tính suy theo CCCD khi Mẫu 31 ghi mã.
- **Hồ sơ Tổ:** `HSO_MAU.hst` = 10C mới · 10C cũ · 10A · 10B · 10D · 11 mới · 11 cũ · 01/BG · 02/BG; bỏ hộp chọn `mau10c`; `hsoLap10cCu`, `hsoLap11Cu`, `hsoLap10d` (dự phòng khi thiếu mô-đun).
- **M8 lưu theo ngăn (B2)** (`js/34-luu-ngan.js`, `LN`): IndexedDB `tuhoso_ngan`, mỗi ngăn 1 khóa (chuỗi JSON), chỉ ghi ngăn đổi; `luuNgay()` ghép chuỗi từ từng ngăn (không stringify 2 lần), đóng dấu `luuLuc` cuối chuỗi localStorage; localStorage vẫn ghi khi còn chỗ — đầy thì bỏ bản cũ ở đó + dấu `tuhoso_ln_cho` → lần mở sau đọc IndexedDB trước khi vẽ (`khoiDong` bọc). Lần đầu chép sang + giữ bản cũ 30 ngày (`ln:banCu`, ↩ dùng lại, giữ bản ngay trước `ln:truocDungLai`). Công tắc quay lại cách cũ theo từng máy (`tuhoso_luu`='cu'; chặn khi dữ liệu lớn hơn localStorage). IndexedDB bị chặn → cách cũ, báo 1 lần. Xóa sạch máy bỏ cả kho ngăn. **localStorage trống lúc mở** (máy mới, hoặc bị xóa mất — chạy nặng Chromium có lúc xóa cả kho localStorage sau lần ghi quá chỗ): khởi động ngay nhưng `LN.giu` hoãn mọi lần ghi tới khi đọc xong IndexedDB; IndexedDB có dữ liệu thật → nạp vào, vẽ lại, báo — không bao giờ ghi đè IndexedDB bằng bản trống. **Đồng bộ Drive giữ nguyên 2 đường (cauhinh.json + chỉ mục)** — tách theo ngăn để bản sau.
- **Sửa nhỏ:** 07b "Hanh phúc" → "Hạnh phúc" (lỗi chính tả trong file gốc).
- **Thứ tự nạp:** js/31 trước js/32 (đúng thứ tự tên — t138 kiểm, tách riêng js/mau/*).
- **Phép thử:** t179–t185 (mới); t138, t163, t164, t169, t174, t176 cập nhật. Hồi quy: t100, t116 trượt sẵn trên main (không do bản này).

## 3.222 — 16/10/2026 — ⚙ Khai báo đơn vị dùng chung + bố cục cột trái Hồ sơ vay
- **Anh (16/10):** làm 1 lần theo phương án B + bổ sung 1–3 (bổ sung 4 xuất / nhập khai báo ra file: làm sau khi ổn), gom nhiều chức năng thử 1 lần.
- **⚙ Khai báo đơn vị** (`js/30-khai-bao.js`, `hsoKBHop`): 1 cửa sổ cho Hồ sơ Tổ, Hồ sơ vay, Giao dịch xã (nút ⚙ Khai báo đơn vị ở cả 3 tab; Giao dịch xã mở ở tab 👤 Cán bộ). Tab: 🏦 PGD · logo · **tên đơn vị in trên từng mẫu Giao dịch xã** (04/TD, 12/GDX, Giấy lĩnh, Bảng kê — sửa ở đây hoặc khai báo riêng mẫu, cùng 1 chỗ lưu) · 👤 Cán bộ · 🤝 Hội (danh sách đã khai + nút sang KTGS; KTGS gói khóa nên vẫn sửa ở KTGS) · 🏘 Trưởng ấp · 👥 Tổ phó · 📋 Chương trình vay · 🏦 TK 104 / 105. **Chỗ lưu giữ nguyên** → không chuyển dữ liệu.
- **Bố cục A cột trái Hồ sơ vay:** tiêu đề **✎ Nhập liệu — Mẫu …**; **⚙ Khai báo riêng — Mẫu …** xuống cuối cột, thu gọn được (app nhớ); 03/TD, 01/TGTV dời khối xuống cuối; **09A, 01/TĐCK** cùng khung. Chương trình vay chỉ 1 lối vào (① ⚙ khai báo chương trình) — bỏ link ở dòng Đối tượng thụ hưởng và mục đích GQVL.
- **Bổ sung 1 — 📎 nguồn:** ô đang 🖨 ghi nguồn số liệu (Mẫu 31 kỳ …, sổ hộ vay, ③ Phương án, khai 1 lần theo chương trình, gõ trong lần làm…).
- **Bổ sung 2 — ↺ Về mặc định:** nút ở khối khai báo riêng (hiện số ô đã đổi), hỏi trước; giá trị đã khai (lãi suất…) giữ lại.
- **Bổ sung 3 — ⚠ Trước khi in:** dòng nhắc dưới tiêu đề cột trái: người vay thiếu CCCD / ngày cấp / ngày sinh; ô đã bật 🖨 mà chưa có số liệu (sẽ in chấm). Bản ghi mẫu không nhắc ô.
- **Bản in không đổi:** so 23 mục (01/TD, 01/UQ, 03/TD, 01/TGTV, 09A, 01/TĐCK, Hồ sơ Tổ, 12/GDX, 04/TD, Giấy lĩnh 104 / 105, sổ hộ vay) với 3.221 — giống từng ký tự.
- **Phép thử:** t178 22/22 (mới); t172, t176 sửa chữ tiêu đề.

## 3.221 — 16/10/2026 — 📝 Bản ghi mẫu (Hồ sơ vay)
- **Anh (16/10):** tất cả các phần đều tùy biến in sẵn được để xuất dạng ghi mẫu — "bản ghi mẫu lấy dữ liệu thật, kiểu in ra cho khách hàng viết lại được".
- Đầu khối "Ô tùy biến" mỗi mẫu (01/TD, 03/TD, 01/UQ, 01/TGTV, 01/TĐCK, 09A, 01/GQVL, 07b): **🖨 Bản thật | 📝 Bản ghi mẫu**.
- **Bản ghi mẫu:** mọi ô của khách / tổ in sẵn số liệu thật của hộ (không cần bật từng ô); ô nào chưa có số liệu vẫn chấm; ngày chỉ in khi đã gõ (logic ngày Hồ sơ vay). Phần **UBND / Hội / Ngân hàng / người chứng kiến** vẫn chấm (`HSO_GM_KHAC`: 01/TD UBND + phê duyệt NH, 03/TD cột UBND + NH, 01/UQ trưởng thôn, 01/TĐCK chấp thuận NH).
- **Không lưu** (chỉ trong lần làm) — mở lại app luôn là Bản thật, tránh quên tắt; ✍ / 🖨 từng ô của bản thật giữ nguyên. Tên file in / Word thêm "GhiMau". Khối ô tùy biến viền vàng + dòng nhắc khi đang ở bản ghi mẫu.
- **Phép thử:** t176 29/29 (thêm 4).

## 3.220 — 15/10/2026 — ⚙ Ô tùy biến 01/TĐCK · 01/GQVL · 07b
- **Anh (15/10):** "gộp và tiếp tục" — đợt 2 khai báo riêng (`docs/KE_HOACH_KBR.md`).
- **01/TĐCK:** thêm nhóm "Chấp thuận của NHCSXH": "chấp thuận cho ông/bà …" = tên khách (tự lấy) · "kể từ ngày …/…/…" (ngày đã gõ). Ngày khách hàng ký giữ như cũ.
- **01/GQVL:** "…, ngày … tháng … năm …" chỗ người vay ký phương án (ngày đã gõ).
- **07b/GQVL:** "Hôm nay, ngày … tại …" — nơi ký hợp đồng khai 1 lần, app nhớ (ngày ký HĐ vẫn ở ô "Ngày ký HĐ").
- Khối "✍ / 🖨 Ô tùy biến" hiện ở cột trái 01/GQVL, 07b (như 01/TD, 01/UQ). **Mặc định ✍ chấm → bản in giống hệt 3.219** (so từng ký tự: 01/GQVL, 07b có hộ + mẫu trắng, 01/TĐCK, 09A in kèm 01/TĐCK).
- **Phép thử:** t176 25/25 (thêm 5).

## 3.219 — 15/10/2026 — 📄 01/TGTV: ô tùy biến + sửa theo bản in thử
- **Anh (15/10, gửi ảnh bản in 3.218):** mấy phần điền sẵn để tùy chọn, mặc định chấm ghi tay; chỗ khách hàng ký trang cuối rộng xuống; chữ ký 2 bị lỗi; màu xanh lá in ra lợt không thấy; còn lệch nhiều chỗ.
- **Ô tùy biến 01/TGTV** (`HSO_CHAM['01tgtv']`, khối ✍ / 🖨 ở cột trái, **mặc định ✍ chấm**): Số CIF (ô đầu trang + phần D) · ☒ Việt Nam · Dân tộc · ☒ Có cư trú · Ngày hết hạn CCCD · Nơi thường trú (Thôn, Xã, Tỉnh) · Điện thoại · Ngày khách hàng ký (chỉ in ngày đã gõ). Họ tên, ngày sinh, giới tính, số CCCD, ngày cấp, nơi cấp luôn in. **Đổi mặc định:** trước đây dân tộc, thường trú, điện thoại, Số CIF, ☒ Việt Nam tự in — nay chấm, bật 🖨 để in.
- **Chữ ký mẫu:** 2 ô giống nhau như mẫu Word — tiêu đề + khung nét đứt cao 27 mm, "(Ký và ghi rõ họ tên)" trong khung (trước: ô "Xác nhận chữ ký mẫu" lệch giữa, không khung).
- **Dải tiêu đề A / B / C:** màu đúng mẫu `#538135` + **ép in nền** (`print-color-adjust:exact`) — trước đây trình duyệt bỏ nền khi in nên chữ trắng gần như mất.
- Chỗ khách hàng ký (phần C) thêm 1 dòng trống; "Phường/Xã … Tỉnh/Thành phố" cách đều.
- **Phần D (anh: "chưa khớp lắm") đo lại theo file Word mẫu:** cột 2689 · 2409 · 2410 · 2874 twip (≈ 26 · 23 · 23 · 28 %); dòng 1 ≥ 6,3 mm ("Tiếp nhận ngày …" canh giữa nghiêng · "Gò Dầu, ngày …" gộp 3 cột); dòng chức danh ≥ 10 mm, 4 ô thẳng hàng trên (tên đậm, chú thích nghiêng); dòng ký 27 mm không kẻ ngang giữa; bảng thụt vào trong khung; Số CIF / Số TK tổ viên / Hiệu lực dưới bảng.
- Vẫn **3 trang** (mặc định và bật hết ô).
- **Phép thử:** t176 20/20 (thêm 4: mặc định chấm, bật 🖨 in đủ, chữ ký mẫu 2 ô + ép in màu, bật hết vẫn 3 trang) · t164 sửa theo mặc định mới (ngày hết hạn CCCD chấm).

## 3.218 — 15/10/2026 — 📄 01/TGTV 3 trang theo file Word mẫu
- **Anh (15/10):** 01/TGTV rớt qua trang phần cuối — tinh chỉnh, canh lề lại; gửi file Word mẫu (03/2026, PGD Gò Dầu — chỉ dùng đo, không đưa lên repo); "chỉ 3 trang, trang cuối là trang trắng dùng để in 2 mặt nhiều bản".
- **Đo file mẫu:** A4; lề trên 10 · phải 12,5 · dưới 16 · trái 7,1 mm (Word 567 · 708 · 907 · 403 twip); chữ 12 pt; giãn dòng đơn; chú thích ¹ ở chân trang 2 ngay sau phần B; phần D (khung ký NH, Số CIF, Hiệu lực) trọn trang 3.
- **Trước:** app 4 trang — khung ký phần D bị cắt đôi, trang 4 chỉ còn đuôi khung + Số CIF + Hiệu lực + chú thích.
- **Sửa (chỉ 01/TGTV):** lề theo mẫu (`mg:[10, 12.5, 16, 7.1]`); giãn dòng 1,15 như Word đơn (lớp `.tgtv`); chú thích ¹ dời vào cuối phần B (như chân trang 2 của mẫu); tiêu đề mục A / B / C / D không đứng trơ cuối trang (dòng `tr-td` kéo theo dòng sau — `js/05` bộ chia trang). Cỡ chữ giữ như cũ (khung trong 12 pt = mẫu).
- **Kết quả:** 3 trang (có hộ và mẫu trắng): trang 1 → "Thu nhập bình quân…", trang 2 → hết phần B + chú thích + đầu phần C, trang 3 → phần C còn lại + **trọn phần D**; chân trang "Trang x / 3".
- **Trang trắng in 2 mặt:** in nhiều bản (in hàng loạt tổ viên) khi bật in 2 mặt → app đã tự chèn 1 trang trắng sau mỗi bản lẻ trang (có từ trước) → mỗi bản đủ 2 tờ, bản sau bắt đầu mặt trước.
- **Phép thử:** t176 16/16 (thêm: 01/TGTV có hộ / mẫu trắng = 3 trang, chú thích ở trang 2, phần D + Số CIF ở trang 3).

## 3.217 — 15/10/2026 — 🧾 Bảng kê: chữ, logo, nét cắt
- **Anh (15/10):** tên hộ vay in đậm, tên cơ quan to hơn, dòng các loại tiền chi ra + ngày tháng to lên tương ứng, lằn kẻ đứt để cắt hơi mờ, logo cánh sen to lên 1 chút.
- **Tên người lĩnh tiền in đậm** — sửa bộ chọn CSS cũ viết ngược (`.bk-ten .bk-trang .gl-v` → `.bk-trang .bk-ten .gl-v`) nên trước đây không đậm.
- Tên cơ quan + dòng PHÒNG GIAO DỊCH 8 → 9,5 pt · "CÁC LOẠI TIỀN NGÂN HÀNG CHI RA" 6,8 → 8,3 pt · "Ngày … tháng … năm …" 9,5 → 11 pt.
- **Nét cắt** (anh: mờ quá → đậm lên chút, cách quãng, có hình kéo mảnh): vạch xám đậm `#8c8c8c` 0,3 mm, gạch 2,6 mm cách 2,2 mm (vẽ bằng nền lặp, in đúng màu), **hình kéo ✂ mảnh** (SVG nét 1,5) ở đầu đường cắt — cả Bảng kê 2 tờ (dọc, kéo hướng xuống) và 💵+🧾 kết hợp (ngang).
- Logo cánh sen 50,5 × 66,7 → 56,5 × 74,7 mm (giữ tâm). Chữ chìm VBSP (khi chưa có logo) giữ nguyên.
- Khổ 118 × 210 mm giữ nguyên; đo không tràn chữ (đầu tờ, thân tờ). Áp mọi cách in Bảng kê (mẫu trắng, từ Giấy lĩnh, kết hợp).
- **Phép thử:** t167 85/85 · t168 33/33.

## 3.216 — 15/10/2026 — 🏛 Cửa KHO (kho số liệu chung)
- **Anh (15/10):** "làm cửa kho trước cho hoàn chỉnh rồi tiếp các mẫu còn lại". Theo `KE_HOACH_B_C.md` mục 2 (C1 + chuyển chỗ gọi C2), `KIEN_TRUC_3_LOP` 3.5, `QUY_CHUAN_KIEN_TRUC` mục 3 (cửa = hợp đồng).
- **File mới `js/29-kho.js`** — `KHO.*` 26 cửa, mỗi cửa ghi hợp đồng (vào · ra · QT): `ky, coKy, maTo, maDong, coBang, nap, to, dsTo, dongTo, toVien, bangTo, toTruong, toTruongKH, khach, danhBa, coDanhBa, dsDanhBa, timCCCD, tim, cccd, hanCCCD, tk105, tk104, saoKe, thanhVienTW, tv01`. Chỉ **bọc** hàm sẵn có (bên trong chưa viết lại); chưa dựng kỳ → rỗng / null, không lỗi. Lõi `hsoKhach`, `hsoTTKH` dời từ js/25 về js/29 (giữ tên).
- **Chuyển chỗ gọi:** Giấy lĩnh (`gdxGLDuLieu`, danh sách khách, tìm), mini app (gói số liệu lúc xuất), Hồ sơ vay + sổ hộ vay (`hsoTVTo`, `hmM31` → `KHO.timCCCD`, `hmTuM31`, `hmDongBo`, `hmNguoiDung`, tìm Mẫu 31 → `KHO.tim`), Hồ sơ Tổ, Giao dịch xã (12/GDX, 04/TD, chọn điểm). **js/25: 109 → 7 dòng, js/26: 48 → 4 dòng** còn chạm biến kho (chỉ chỗ tab đặt kỳ, cây chọn, tổ trưởng kỳ trước).
- **Không đổi màn hình, dữ liệu, bản in:** so trước – sau 26 nhóm giống hệt từng ký tự (Giấy lĩnh TK 104 từng tổ / TK 105 từng khách, 12/GDX, 04/TD, mini app, 10C · 10A · 10B · 11 · 01/BG · 02/BG, 01/TD · 03/TD · 01/UQ, sổ hộ vay). KTGS không đụng.
- **Phép thử:** `t177` 14/14 (mới: hợp đồng từng cửa = hàm được bọc, chưa dựng kỳ, kiểm tĩnh js/25 + js/26 chỉ qua KHO) · t167 t168 t170 t173–t176 đạt.

## 3.215 — 15/10/2026 — ⚙ Khai báo riêng từng mẫu Hồ sơ vay (đợt 1: 01/TD · 03/TD · 01/UQ)
- **Anh (15/10):** khai báo riêng liệt kê từ trên xuống của mẫu (từ dòng Kính gửi), dòng nào cần thì cho khai báo / tùy biến, theo kinh nghiệm tab KTGS; anh bổ sung sau. Kế hoạch + danh sách ô: `docs/KE_HOACH_KBR.md`.
- **Kế thừa ô chấm tùy biến 3.206 (09A)** — mở rộng `HSO_CHAM`: loại `kb` (khai 1 lần, nhớ `hsoLuu().chamGT[mẫu]`, cột 5 `'ct'` = nhớ theo chương trình vay), `tu` (app tự lấy), `nhom` (tiêu đề nhóm theo thứ tự trên mẫu); `hsoChamNgayTT` (Ngày … tháng … năm — **mặc định ✍ chấm ghi tay; 🖨 chỉ in ngày anh gõ, trống vẫn chấm, không tự lấy hôm nay** — anh 15/10: áp mọi mẫu Hồ sơ vay **kể cả 09A, 01/TĐCK** (trước: 🖨 trống = hôm nay); `hsoChamNgay` bỏ mặc định hôm nay). Khối **✍ / 🖨 Ô tùy biến — Mẫu …** ở cột trái (có hộ và mẫu trắng).
- **01/TD:** ngày người vay ký · UBND "Ông/bà" = người vay · Phê duyệt NH: số tiền + bằng chữ, thời hạn / kỳ hạn, hạn cuối (= đề nghị), **lãi suất theo chương trình**, lãi quá hạn, ngày trả lãi hàng tháng, ngày Giám đốc ký.
- **03/TD:** ngày cột UBND · Phê duyệt NH: cột 7–8 + dòng Cộng = đề nghị, ngày, **số người + tổng số tiền tự tính** theo danh sách.
- **01/UQ:** ngày lập giấy (mục I) · **tên trưởng thôn** (⚙ Khai báo chung › Trưởng ấp) dưới chỗ ký Chứng kiến.
- **Mặc định mọi ô ✍ chấm → bản in giống hệt 3.214** (so từng ký tự 01/TD, 03/TD, 01/UQ có hộ + mẫu trắng). 09A / 01/TĐCK không đổi.
- **Phép thử:** `t176` 14/14 (mới) · t170 09A ngày chưa gõ → chấm · t163 t164 t171–t175 đạt.

## 3.214 — 15/10/2026 — 📒 Sổ hộ vay: tab xem lại + form nhập dạng lưới
- **Anh (15/10):** tối ưu phần nhập và bố cục các cột; có tab xem lại sổ hộ vay để chỉnh sửa (theo cách văn bản: thêm, xem lại, sắp xếp, sửa, tìm); Tab / Enter qua ô. Tối ưu lưu trữ để sau (cùng đợt chuẩn hóa lưu).
- **Tab con mới 📒 Sổ hộ vay** (`sohv`, cạnh 👪 Hộ vay): dùng hết bề ngang (`.hso-bo.hso-rong`, khung xem ẩn — 🖨 In / PDF / Word / ⤢ Phóng to vẫn ở trên). Bảng: STT · ✎ 📄 🗑 · Người đứng tên · Ngày sinh · Số CCCD · Ngày cấp · Hạn CCCD · SĐT · Mã KH · Tổ · địa chỉ · Người · HSSV · **Cần bổ sung** (CCCD thiếu / sai số chữ số, ngày sinh, ngày cấp, địa chỉ / tổ, CCCD hết / sắp hết hạn). Tìm tên / CCCD / mã KH / ấp (gõ tới đâu lọc tới đó, giữ con trỏ) · chọn tổ · chip Tất cả / Hộ cũ / Hộ mới / Có HSSV / ⚠ Cần bổ sung (n) · sắp xếp (mới thêm, tên theo chữ cuối, ngày sinh, tổ · ấp, mới sửa — bấm tiêu đề cột hoặc ô ↕, nhớ ở `hsoLuu().soSX`).
- **Sửa thẳng ô** (hộ mới): họ tên, ngày sinh, CCCD, ngày cấp, SĐT — Enter / Tab sang ô kế, ↑ ↓ cùng cột dòng trên / dưới; tự lưu (`hmSoSua`: chuẩn hóa như form, ngày gõ liền, nơi cấp tự suy; CCCD trùng hộ khác → không đổi; cập nhật cột Cần bổ sung / Hạn CCCD tại chỗ; phiếu làm hồ sơ của hộ đồng bộ theo). Hộ cũ (mã KH): nhân thân theo Mẫu 31 mới nhất, chữ xám, sửa đầy đủ bằng ✎.
- **🖨 In sổ** = đúng danh sách đang lọc (ghi bộ lọc dưới tiêu đề). Bản in SỔ HỘ VAY (cả tab 👪 Hộ vay) đổi **A4 ngang, 12 cột** (thêm Ngày cấp, Hạn CCCD, SĐT; Tổ / Ấp · xã tách cột; số không xuống dòng); hộ cũ in theo Mẫu 31 mới nhất (`hmNguoiDung`).
- **Form hộ (`hmVe`)**: dòng tiêu đề cột 1 lần, mỗi người 1 dòng lưới (`.hm-luoi`); hộp dùng phím chung (Enter / Tab sang ô, Shift lùi, ↑ ↓ ô chọn, Ctrl+Enter lưu); gõ xong 1 ô **không vẽ lại cả hộp** (`hmDat` chỉ sửa ô + dòng gợi ý); vẽ lại khi đổi địa chỉ / thêm người vẫn giữ con trỏ (`data-hm`, `HM_O`); mở hộp → con trỏ ở ô đầu còn trống của người đứng tên; ＋ Thành viên → con trỏ vào tên người mới; **💾 Lưu & thêm hộ tiếp** (giữ xã, điểm, ấp, tổ). Tìm Mẫu 31 hiện thêm năm sinh.
- Chuẩn hóa ô dùng chung `hmChuan` (form + bảng). Dữ liệu không đổi cấu trúc (`D.cauHinh.hoMoi`).
- **Phép thử:** `t175` 23/23 (mới) · t163 / t170 đếm 10 tab.

## 3.213 — 15/10/2026 — 🧾 Bảng kê ngang 118 mm
- **Anh (15/10, gấp):** chiều ngang Bảng kê phải đúng phủ bì giấy thật **118 mm** (trước 105 mm).
- `BK_CSS_TO`: `.bk-trang.bk-to` 118 × 210 mm (chữ, lề trong giữ nguyên; cột Thành tiền giãn thêm); logo / chữ chìm dời theo giữa tờ (+6,5 mm).
- 🧾 Bảng kê 2 tờ / A4 ngang: nét cắt ở 118 mm từ 2 mép (`.bk-cat-t`, `.bk-cat-p`); 🧾 in từ Giấy lĩnh 1 tờ sát mép trái theo khổ mới.
- 💵+🧾 kết hợp (A4 dọc): Bảng kê xoay ngang cao 118 mm sát đáy (`GL_CSS_KEM`: `.gl-bkk`, nét cắt ngang ở 118 mm từ đáy) — Giấy lĩnh nửa trên 148 mm không bị đè (còn 31 mm trống giữa).
- Không đổi dữ liệu, khai báo, Giấy lĩnh, mini app (mini chưa có Bảng kê).
- **Phép thử:** `t167` 85/85 (đo tờ 118 × 210; mới: 💵+🧾 Bảng kê cao 118 mm sát đáy, không đè Giấy lĩnh).

## 3.212 — 15/10/2026 — sửa nhỏ sau hồi quy 3.211
- Tab Hồ sơ vay mở mặc định vào **👪 Hộ vay** (máy đang lưu tab Bộ HS cũ → tự chuyển 1 lần); tránh hiện lại tab Bộ HS đã ẩn.
- Hồi quy đầy đủ 3.211: t163 sửa đếm 9 tab; hoiquy 1 dòng chập chờn (chạy lại riêng 28/28 đạt); t100 / t116 trượt sẵn trên main.

## 3.211 — 15/10/2026 — 💼 Hồ sơ vay GQVL (01/GQVL · 07b/GQVL · 03/TD)
- **Anh (14/10):** GQVL có mẫu riêng — dùng 01/GQVL (phương án), 03/TD, 07b/GQVL (hợp đồng tín dụng) theo VB 11055 + VB 4039 (thay mẫu từ 01/10/2026). Chốt: ô chấm theo mẫu, cố định được thì khai báo; lịch trả gốc app tự tính — **mặc định 24 tháng/lần, chia đều làm tròn xuống trăm nghìn, kỳ cuối nhiều nhất, không ân hạn** (≤ 12 tháng trả 1 lần); **lãi 7,9248 %, ưu tiên 6,24 %, quá hạn 130 %**; tạm 1 món 1 mẫu 03; chọn nhanh như tab Giao dịch xã. Kế hoạch `docs/KE_HOACH_3209.md`.
- **Thẻ GQVL** (dạng riêng): lãi suất, lãi ưu tiên, % quá hạn, làm tròn, kỳ trả lãi, chip số tiền, mục đích, ĐTTH "Người lao động", 60 tháng, 24 tháng/lần — sửa ở ⚙ Khai báo chung › Chương trình vay. Thẻ GQVL tạm của 3.208 tự chuyển (giữ mục đích đã khai); bật lại ở Bộ HS.
- **Tab 01/GQVL** (mẫu mới): nhân thân, có thời hạn đến (hạn CCCD), ưu tiên ☐1–6, tên phương án, địa điểm, lao động, vốn (tự có + vay, bằng chữ), **bảng mục đích nhiều dòng**, thời hạn, kỳ hạn trả gốc / lãi, **doanh thu – chi phí → chênh lệch, thu nhập BQ/tháng**, ghi chú (1)–(7). Cột trái: chip mục đích / số tiền / thời hạn / kỳ hạn; tích ưu tiên → lãi ưu tiên; ⚠ vượt 200 triệu, 120 tháng, kỳ hạn vượt mức VB, chi phí < vốn + lãi vay dự kiến. In kèm ☐ 03/TD ☐ 10C ☐ 07b ☐ 01/TGTV.
- **Tab 07b/GQVL** (hợp đồng): Bên cho vay từ ⚙ PGD, Bên vay từ hộ; số tiền + bằng chữ, mục tiêu lao động, thời hạn + **hạn cuối**, lãi + quá hạn, **kỳ hạn trả gốc (ngày theo ngày ký HĐ, trống → chấm)**, giải ngân ☐ tiền mặt / ☐ chuyển khoản, mục đích, nơi thực hiện, đủ Điều 4–10, phụ lục 3 bảng.
- Tab 01/TD chọn GQVL → nhắc dùng 01/GQVL. Không dùng 01/UQ cho GQVL.
- **Phép thử:** `t174` 19/19 (mới) · t170 9 tab · t172 thẻ tự thêm thay GQVL.

## 3.210 — 15/10/2026 — 📋 03/TD nhiều hộ cùng chương trình
- **Anh (14/10):** "nếu cần 2 hộ chung mẫu 03 thì chọn 2 hộ 1 lần, hoặc chọn mẫu 03 trước rồi add hộ; cùng 1 chương trình in chung 1 mẫu 03". Kế hoạch `docs/KE_HOACH_SO_HO_VAY.md` mục C.
- **Cách 1:** tab 👪 Hộ vay tích nhiều hộ → **📋 Lập 03/TD (n hộ)**. **Cách 2:** tab 03/TD → chip chương trình → **＋ Thêm hộ** (từ sổ). Đi từ hộ đang làm (01/TD) sang 03/TD → hộ đó tự vào tờ.
- Mỗi dòng sửa được: số tiền, thời hạn, đối tượng thụ hưởng (danh sách thẻ CT), mục đích; ✕ bỏ dòng; dòng **Cộng** tự tính; đổi chương trình → cả tờ theo thẻ CT mới (tên CT, thời hạn, ĐTTH). Dòng lấy sẵn số liệu từ phiếu làm hồ sơ của hộ nếu cùng chương trình. "làm tờ mới" xóa tờ đang lập (không lưu lịch sử).
- Bộ HS cũ chưa gắn hộ + 03/TD tích tổ viên (cách cũ) vẫn dùng được; có thêm ô "＋ Thêm hộ từ sổ".
- **Phép thử:** `t173` 20/20.

## 3.209 — 14/10/2026 — 👪 Sổ hộ vay (thay 🏠 Hộ mới + Bộ HS) · in hồ sơ theo hộ
- **Anh (14/10):** Bộ HS rối, sửa theo cách gọn: tạo hộ vay (nhập mới hoặc lấy Mẫu 31), khai tổ khi tạo, chỉ cần người đứng tên — thừa kế / thành viên bổ sung khi cần (giấy UQ mới cần đủ), 1 hộ vay nhiều HSSV, hộ cũ có mã KH, danh sách lưu lâu dài, **không lưu lịch sử đề nghị vay** — in 01/TD: chọn hộ, chọn chương trình, in, cần thì in kèm. Kế hoạch `docs/KE_HOACH_SO_HO_VAY.md`.
- **Tab "👪 Hộ vay"** (thay 🏠 Hộ mới; tab Bộ HS ẩn): **＋ Hộ mới** (form nhanh + **chọn tổ**, **HSSV tích nhiều người**) · **＋ Lấy từ Mẫu 31** (tìm tên / CCCD, hoặc tích nhiều tổ viên tổ đang chọn; tên vợ/chồng trên Mẫu 31 thành người thừa kế gợi ý) · trùng CCCD → mở hộ đã có · hộ mới khớp CCCD trên Mẫu 31 → **tự gắn mã KH**. Khung phải: bảng SỔ HỘ VAY.
- **📄 In hồ sơ** (tab 01/TD, 01/UQ): ô **👪 Hộ vay** chọn hộ → chip **chương trình** → chip **sinh viên** (hộ nhiều SV) → phương án (theo thẻ CT) → **In kèm** ☐ 03/TD ☐ 10C ☐ 01/UQ ☐ 01/TGTV (1 lần in, 1 file Word). Hộ cũ: nhân thân, SĐT theo Mẫu 31 mới nhất. 01/UQ thiếu thành viên / ngày sinh, CCCD → ⚠ + **✎ Bổ sung**. Mỗi hộ 1 phiếu làm hồ sơ (ghi đè, không lưu lịch sử).
- **Dữ liệu cũ:** Hộ mới 3.207 giữ nguyên (cùng khóa `hoMoi`); Bộ HS cũ tự chuyển người vay / thành viên / HSSV vào sổ, **bản gốc giữ**.
- **Chưa làm (3.209 phần 3):** 03/TD nhiều hộ cùng chương trình 1 tờ (chọn nhiều hộ / ＋ Thêm hộ) — hiện 03/TD in kèm theo từng hộ.
- **Phép thử:** `t173` 15/15 (mới) · t171 theo luồng mới.

## 3.208 — 14/10/2026 — ⚙ Khai báo chung (tab con) + thẻ chương trình vay → 01/TD, 03/TD tự điền
- **Anh (14/10):** mục đích vay, đối tượng thụ hưởng khai theo chương trình vay (HSSV, NSVSMT, GQVL); khai báo chung là cửa sổ riêng có tab con (trưởng ấp, tổ phó chọn theo xã / điểm, chương trình vay); thẻ CT: tên tắt, tên in 01/03, ĐTTH, mục đích (xây mới / sửa chữa), mức vay 1 công trình, thời hạn & phân kỳ ghi sẵn hay chấm. Chốt thêm: **HSSV số tháng, số tiền gõ tay (không tự tính)**; **01/TD thời hạn xin vay, hạn trả nợ cuối: gõ thì in, không gõ thì chấm; số tháng gõ mang sang 03/TD**; **NSVSMT mặc định ghi sẵn hết, đổi trong cài đặt**; bố cục như tab Giao dịch xã; khai báo riêng ghi rõ của mẫu nào. Kế hoạch `docs/KE_HOACH_3208.md`.
- **⚙ Khai báo chung** (thay "Khai báo 1 lần"): tab con 🏦 PGD · logo · 🏘 Trưởng ấp · 👥 Tổ phó (chọn xã → điểm GD ngay trong cửa sổ) · 📋 Chương trình vay.
- **Thẻ chương trình vay** (`hsoKB().ctv`; mặc định HSSV, NSVSMT, GQVL; ＋ thêm, 🗑 xóa): tên tắt (đổi → bộ hồ sơ đổi theo) · tên in · dạng phương án (HSSV / theo công trình / 1 mục đích) · công trình + mức vay 1 công trình · có Xây mới / Sửa chữa · mục đích · đối tượng thụ hưởng + mặc định xã / phường · thời hạn & kỳ hạn **✍ Chấm / 🖨 Ghi sẵn** · khối Xác nhận UBND xã trên 01/TD · câu "Đề nghị NHCSXH cho vay". Khai báo cũ (ô chữ "MÃ: …" mục đích / ĐTTH) tự chuyển vào thẻ.
- **Bộ HS / 01/TD / 03/TD:** chọn chương trình theo thẻ → tự điền tên CT, mục đích, bảng phương án, thời hạn, kỳ hạn, ĐTTH (trống → mặc định thẻ theo xã / phường). HSSV: **ô Số tháng + Số tiền gõ tay** (bỏ chia 4 triệu / tháng). Ô **Thời hạn xin vay, Kỳ hạn, Hạn trả nợ cuối cùng** (Bộ HS và tab 01/TD): gõ thì in, trống thì theo thẻ (ghi sẵn / chấm); thời hạn 01/TD = cột Thời hạn 03/TD. NSVSMT in như cũ (60 tháng, 12 tháng/lần).
- **Giao diện:** khung nhập liệu rộng 60 %, xem trước 40 % như tab Giao dịch xã (Hồ sơ Tổ, Hồ sơ vay); cột trái ghi **"⚙ Khai báo riêng — Mẫu …"** (Bộ HS / Hộ mới: "✎ Nhập liệu").
- **GQVL** (anh: "GQVL có mẫu riêng"): thẻ mặc định tắt ở Bộ HS, ghi chờ mẫu đơn riêng — bật được ở thẻ nếu cần.
- **Bộ HS cũ:** HSSV đã lập trước đây không còn tự tính số tháng → ô số lượng để chấm, gõ lại nếu cần.
- **Phép thử:** `t172` 20/20 (mới) · t164 gõ số tháng HSSV.

## 3.207 — 14/10/2026 — 🏠 Danh sách hộ vay mới (khai báo 1 lần, gọi ra làm hồ sơ)
- **Anh (14/10):** "xong mẫu 09, chuyển qua 01/TD, 03/TD, giấy UQ — đầu tiên khai báo hộ vay mới: form họ tên, ngày sinh (nhập nhanh), CCCD, ngày cấp → suy giới tính, ngày hết hạn, kiểm năm khớp CCCD; địa chỉ chọn xã → ấp (hoặc điểm GD cho gọn); thêm thành viên; chọn ai đứng tên vay, ai là HSSV; Lưu hộ vào danh sách, gọi ra làm hồ sơ". Kế hoạch `docs/KE_HOACH_3207.md`.
- **Tab con đầu "🏠 Hộ mới"** (Hồ sơ vay): danh sách hộ đã khai (tìm tên / CCCD; ✓ Mẫu 31 khi CCCD người đứng tên đã có trên số liệu) · ✎ sửa · **📄 Lập HS** · 🗑; khung phải = bảng DANH SÁCH HỘ VAY MỚI (in được).
- **Form hộ** (`hmMo` / `hmVe`): ngày gõ liền số (`150378` = 15/03/1978, `9112021` = 09/11/2021); tên tự viết hoa đầu từ; **giới tính + năm sinh theo số CCCD (lệch năm sinh đã nhập → ⚠)**, CCCD ≠ 12 số → ⚠, **nơi cấp theo ngày cấp, hạn CCCD (hết / sắp hết → ⚠)**; địa chỉ **Xã → Điểm GD (lọc) → Ấp** lấy từ cây tổ (không có số liệu thì gõ tay); **＋ Thành viên** (họ tên, ngày sinh, CCCD, quan hệ); **Đứng tên vay** / **HSSV** / Không vay HSSV; **💾 Lưu hộ** → `D.cauHinh.hoMoi` (đồng bộ Drive cùng cài đặt).
- **Gọi ra làm hồ sơ:** 📄 Lập HS tạo Bộ HS mới điền sẵn người vay (nhân thân, nơi cấp, địa chỉ), thành viên (01/UQ), HSSV (01/TD) → 01/UQ · 01/TD · 03/TD theo bộ như cũ. Bộ HS → Hộ mới có thêm ô **"Hộ vay mới đã khai"** (vẫn giữ nhập tay cũ). Mặc định em chọn (anh chưa trả lời chi tiết): ghi ở `docs/KE_HOACH_3207.md` mục 4.
- **Phép thử:** `t171` 14/14 (mới) · t163 / t170 đếm 8 tab mẫu.

## 3.206 — 14/10/2026 — 📍 Cây địa bàn thống nhất · ↺ Phiếu mới · Hồ sơ vay theo tab · 09A/TD ô chấm tùy biến + in kèm Mẫu 06/TD
- **Kế hoạch:** `docs/KE_HOACH_3206.md` (anh chốt 14/10, gom 1 bản; trạng thái từng phần ở mục 5).
- **Cây địa bàn — mọi tab** (Tổ · Sao kê · Hồ sơ · KTGS · Giao dịch xã, hàm chung `pvVeCay`): đã chọn địa bàn thì có nút **▾ Mở rộng / ▴ Thu gọn** (anh chốt tên); gọn = **1 dòng 🏠 PGD › Xã › Điểm · Hội › Tổ**, **bấm từng mắt để về cấp đó** (kiểu nút Home); chọn xong tổ tự gọn; nhớ theo tab (`D.cauHinh.pvGon[p]`; GDX mặc định gọn như 3.180). Điện thoại giữ ô chọn khi gọn.
- **Giấy lĩnh:** nút **"↺ Phiếu mới"** thay "✕ Làm trống" (app + mini app; chức năng như cũ); in xong con trỏ về ô tìm người kế.
- **Hồ sơ Tổ / Hồ sơ vay:** **mỗi biểu mẫu 1 tab con** (thanh tab như tab Giao dịch xã) + dòng **📅 Số liệu: kỳ đang chọn** + ⚙ Khai báo 1 lần; cột trái còn tên mẫu + chú thích màu.
- **09A/TD — ô chấm tùy biến (cách chung cho mọi mẫu):** số liệu cố định (tên, nhân thân, món vay, tổ, Hội) không tùy biến; mỗi ô chấm có công tắc **✍ viết tay | 🖨 in sẵn**, nhớ theo mẫu (`hsoLuu().cham`, đồng bộ Drive): lý do (danh sách, **mặc định "Đang gặp khó khăn về kinh tế, tài chính"**, ＋ thêm / ✕ bỏ), số tiền đề nghị gia hạn (mặc định = dư nợ, in sẵn), thời gian đề nghị, kế hoạch trả nợ (tháng/kỳ, tiền/kỳ, kỳ cuối), ngày tháng người vay ký. Ý kiến Hội · UBND · phê duyệt NH luôn chấm. Thêm ô cho mẫu khác = 1 dòng `HSO_CHAM`.
- **In kèm Mẫu 06/TD** (bên KTGS gọi "Mẫu 06 KTGS"): ô tích ở 09A → **🖨 In** in 09A rồi in tiếp Mẫu 06/TD (2 khổ giấy → 2 lần in), nút **🖨 06/TD** in riêng, **Word** ra thêm file Mẫu 06/TD. Điền sẵn hộ vay (món đang gia hạn) + Hội quản lý; **cán bộ kiểm tra để trống**; cột **mục đích ✍ để trống | 🖨 in ngành kinh tế (Mẫu 31)**. **Không chép / sửa mẫu KTGS (khóa)** — gọi đúng `ktGiaTri06` / `ktHTML06` / `ktDocx('m06')`.
- **Mẫu mới 01/TĐCK — Giấy đề nghị thay đổi mẫu chữ ký giao dịch với NHCSXH** (anh gửi file mẫu 14/10, VB 2407 ngày 28/3/2025): tab con riêng ở Hồ sơ vay + **ô tích "In kèm 01/TĐCK" ở 09A** (cùng khổ dọc → **1 lần in, 1 file Word** chung với 09A). Điền sẵn người vay đang chọn (tên, ngày sinh, CCCD, ngày cấp, nơi cấp, nơi cư trú), tổ trưởng, PGD; 2 ô chữ ký thứ nhất / thứ hai; phần chấp thuận NH để chấm; ngày khách ký = ô chấm ✍ / 🖨. Đổi mẫu cùng tổ (09A ↔ 01/TĐCK) giữ người vay đang chọn. Bố cục dựng theo nội dung file .doc (máy không mở được bản .doc để so hình — anh so với bản giấy).
- **Phép thử:** `t170` 23/23 (mới) · `t163` đếm tab mẫu · `t168` chữ Mở rộng · t164, t165, t167 đạt.

## 3.205 — 14/10/2026 — 🏦 Sao kê TK 104 / 105 dùng được ngay sau khi nạp
- **Anh (14/10):** 2 nút "TK 104 chưa đóng" / "TK 105 cần đóng" không chạy — anh nạp Sao kê ngày 13/10, không có file 30/9.
- Nguyên nhân: nạp Sao kê chỉ xóa các kỳ đã dựng trong bộ đệm, **kỳ đang mở (T9) vẫn là bản dựng trước khi có Sao kê** → báo "chưa có Sao kê" tới khi tải lại trang. (Ngày 13/10 khác 30/9 không phải nguyên nhân — kỳ không có Sao kê cùng ngày thì app lấy bản gần nhất.)
- Sửa: nạp Sao kê xong **gắn ngay vào kỳ đang mở** (`tkNapMoi(TO_K)` sau `slGhi`); các nút TK 104 chưa đóng · TK 105 cần đóng · ⚠ TK trùng · Tổ chưa đủ **tự kiểm và gắn Sao kê mới nhất trước khi mở** (`tkDamBao`).
- **Anh hỏi (ảnh ma trận T9):** "LEN_31 374, DS tổ 370 — lệch 4 tổ là tổ nào, ghi chú ra luôn" · "cột 30/09/2026 trống là sao".
  - **② Kiểm tra số liệu** thêm mục **"Số tổ: LEN_31 TO_TRUONG (N dòng) ↔ Danh sách tổ (M tổ)"** — liệt kê từng dòng chênh + lý do: dòng vay trực tiếp (LEN_31 đếm cả, không phải tổ) · dòng chưa ghép được mã tổ (tên tổ trưởng LEN_31 khác Mẫu 31) · tổ chỉ có ở LEN_31 · 1 dòng LEN_31 gộp 2 tổ trùng tên · tổ chỉ có ở Danh sách tổ (không còn dư nợ / có dư nợ mà không có dòng LEN_31). Chỉ ghi nhận, không sửa số.
  - **Ma trận:** cột ngày trùng ngày chốt cuối tháng (vd 30/09 — file Nợ đến hạn phân kỳ nạp theo ngày) **không mở cột riêng nữa** — đã hiện ở cột chốt T9 ("✓ 1 ngày · 30/09").
- Hồi quy 3.203: `t117`, `t155` đọc bộ nhớ ngay sau `luu()` → chờ 300 ms ghi gom (app đúng, sửa phép thử).
- **Phép thử:** `t167` 84/84 (kỳ đang mở chưa gắn Sao kê → bấm nút tự gắn; ② LEN_31 ↔ Danh sách tổ với dữ liệu giả) · `t117` 10/10 · `t155` 10/10 · `t130`, `t146`, `t152`, `t163` đạt.

## 3.204 — 14/10/2026 — 🏦 Khối nguồn tổ trưởng báo rõ Danh sách tổ
- **Anh gửi ảnh (14/10):** Bảng tổ "đủ 0 · chưa đủ 369", khối chỉ ghi Sao kê / Mẫu 01/TV — không biết vì sao.
- Nguyên nhân: máy chưa có **Danh sách tổ hệ thống** (cũng chưa có Sao kê TK 104) → cả 369 tổ thiếu TK 104; khối chưa có dòng Danh sách tổ nên không thấy.
- Khối 🏦 (⚙ Khai báo chung · 📥 Nạp & KT): thêm dòng **"Danh sách tổ (hệ thống): ngày … · N tổ / chưa nạp"** (bản kiểu cũ → nhắc nạp lại file baocao_…); bảng tổ chưa đủ **ghi thiếu gì, bao nhiêu tổ** (vd "thiếu TK 104 369"); ghi chú nguồn theo 3.202 (Danh sách tổ chính, Sao kê TK 104 tham khảo); nút "TK 104 chưa đóng".
- Lộ trình `docs/KE_HOACH_B_C.md`: bản IndexedDB theo ngăn lùi sang số kế tiếp (3.205).
- **Phép thử:** `t167` 82/82 · `t168` 33/33; file thật không có Danh sách tổ → khối ghi "chưa nạp", "chưa đủ 47 (thiếu ngày cấp 47)".

## 3.203 — 14/10/2026 — 💾 Gom lưu (kế hoạch B1)
- **Theo `docs/KE_HOACH_B_C.md` mục 1 (bản B1 — gom lưu, rủi ro thấp, không đổi nơi lưu); anh nhắn "làm tiếp" (14/10).**
- `luu()` **giữ tên** (≈ 295 chỗ gọi không sửa) — chỉ **hẹn ghi sau 300 ms**; nhiều lần gọi sát nhau → **ghi 1 lần**. `luuNgay()` ghi ngay; `luuHuy()` hủy hẹn.
- **Ghi ngay khi** rời trang (`pagehide`, `beforeunload`) và khi ẩn app (`visibilitychange` → hidden) — đóng tab / tải lại ngay sau thao tác không mất.
- `chTheoDoi()` (so cài đặt đồng bộ Drive) và hẹn đẩy chỉ mục Drive chạy **1 lần mỗi lần ghi gom** (trước: mỗi lần gọi `luu()` stringify lại).
- **Xóa sạch máy:** hủy hẹn + chặn ghi lại sau khi xóa (`LUU_KHOA_XOA`).
- Bộ nhớ đầy → vẫn báo "bộ nhớ trình duyệt đã đầy" như cũ.
- **Phép thử:** `t169` 8/8 (10 lần gọi → 1 lần ghi, ghi ngay, ẩn app, chTheoDoi 1 lần, bộ nhớ đầy, tải lại không mất, xóa sạch không ghi lại); `hoiquy.js` đọc bộ nhớ sau `luuNgay()`.

## 3.202 — 14/10/2026 — 📒 Bảng tổ dựng sẵn (TK 104 · CCCD), TK 105 tra khi cần, TK trùng
- **Anh (14/10):** "tạo 1 data sẵn khi khởi tạo đảm bảo 369 tổ đủ số liệu" · "TK 105 rất nhiều, ít dùng, không cần chạy sẵn; mặc định 104" · "TK trùng thì cảnh báo để xác định TK đang dùng, đóng TK thừa" · "nguồn = Mẫu 31 + 2 Sao kê; chưa có mới thì dùng bản gần nhất" · "Mẫu 18 giữ làm đối chiếu của Mẫu 31" · thuật toán CCCD anh giao, "tránh trường hợp không load ra CCCD".
- **Bảng tổ dựng sẵn** (`toBangDung`, `js/28`): dựng 1 lần cho kỳ đang dùng (dựng lại khi nạp file / anh bổ sung) — mỗi tổ: mã KH tổ trưởng (**Mã CIF TT**), CCCD, ngày cấp, hạn CCCD, **TK 104 theo Sao kê**, điểm GD + **nguồn từng ô**, **thiếu gì + lý do**. Tổ không còn thành viên (mọi món tất nợ, không có trong 01/TV) → bỏ qua, không tính thiếu. ⚙ Khai báo chung / 📥 Nạp & KT: dòng **"Bảng tổ: N tổ · đủ X · thiếu Y"** + hộp **📒 Tổ chưa đủ dữ liệu · bổ sung** (gõ CCCD / ngày cấp / TK 104 1 lần — nhớ theo mã KH tổ trưởng, nạp file mới không đè). Giấy lĩnh TK 104 + mini app **đọc từ bảng**.
- **CCCD 1 hàm chung** (`cccdCua`, QT-13): Mẫu 31 mọi dòng / các kỳ → Mẫu 01/TV → Thông tin tổ trưởng / DSTO (bù ngày cấp nếu cùng số) → số anh gõ. Không có mã KH tổ trưởng vẫn tra file về tổ. **CCCD hết / sắp hết hạn → cảnh báo** ở Tóm tắt Giấy lĩnh.
- **TK 104 / 105 theo Sao kê bản gần nhất** (`tkChonBan`: ngày ≤ ngày kỳ, không có thì bản sớm nhất sau đó) — thay "file mới nhất" của 3.201. **TK 105 tra khi chọn khách** (không dựng sẵn); Mẫu 31 / Mẫu 18 chỉ dự phòng; không có → lý do (TK mới mở sau ngày Sao kê?) + gõ tay.
- **TK trùng:** ≥ 2 TK → lấy TK mở gần nhất + cảnh báo + ô chọn TK đang dùng (`D.cauHinh.tkChon`, nhớ theo mã KH); nút **⚠ TK trùng** (TK 104 tổ trưởng + TK 105 khách) xuất Excel.
- **File thật (30/09 + Sao kê 13/10, chỉ thư mục nháp):** **369 tổ đang hoạt động** — TK 104 **369 / 369**, CCCD tổ trưởng **369 / 369** (329 Mẫu 31, 40 Mẫu 01/TV…), đủ hết **322**, **47 tổ chỉ thiếu ngày cấp** (CCCD lấy từ 01/TV — không có ngày cấp → anh gõ 1 lần); 8 tổ không còn thành viên (bỏ qua); 21 khách có ≥ 2 TK 105.
- **Danh sách tổ hệ thống (anh chốt 14/10):** "thống nhất CCCD, TK 104 lấy từ file này [baocao_…] và đồng bộ qua Mẫu 31; TK 104 [Sao kê] chỉ dùng tham khảo, các tổ còn 104 chưa đóng" · "thống nhất ds tổ này thay cho các loại ds đã có, trong file có đủ số liệu ngày báo cáo, đưa vào ds nạp và kiểm tra".
  - **Đọc riêng** (`dsHTDoc`, `js/28`): nhận theo cột MATO + MATT + CMT, vào ô **Danh sách tổ** (loại `dsto`, Ⓑ bắt buộc) — **kỳ theo cột NGAYBC**; lấy tổ trưởng (MATT), CCCD, ngày cấp, ngày sinh, TK 104, điểm GD (MADGD / TENDGD), Hội, tổ phó, số TV, dư nợ. **Thay DSTO cũ và Thông tin tổ trưởng** (file cũ vẫn đọc được để tra tháng cũ).
  - **Kỳ nào cũng có Danh sách tổ** (`dsChonKy`: **bản của tháng** — mới nhất ≤ ngày kỳ; tháng không có → bản mới nhất; anh chốt: nạp theo tháng là chính, theo ngày khi thay đổi lớn); file bắt buộc của tháng tính bản gần nhất (`slBBE`), không báo "không phải cuối tháng".
  - **Tổ trưởng: CCCD, ngày cấp, TK 104 theo Danh sách tổ trước** (ghép Mẫu 31 qua Mã CIF TT = MATT); Danh sách tổ ghi tổ trưởng khác Mã CIF TT → báo lệch (vào "chưa đủ"), không đoán. Sao kê TK 104 chỉ dùng khi chưa có Danh sách tổ.
  - **TK 104 chưa đóng** (Sao kê, tham khảo): chủ TK không còn là tổ trưởng + tổ trưởng còn TK khác TK trên Danh sách tổ — hộp + Excel có cột **Lý do**.
  - **Ma trận chỉ còn 1 dòng về tổ** (anh chốt 14/10): dòng Thông tin tổ trưởng ẩn (`an`) — file cũ vẫn đọc để tra tháng cũ, nạp nhầm thì báo "không cần nữa"; ô cũ dọn được ở 🧰 Dọn kho. DSTO kiểu cũ vẫn vào dòng Danh sách tổ, kèm lưu ý nên xuất bản hệ thống. **Số liệu tháng cũ không cần nạp lại Danh sách tổ** (dùng bản mới nhất).
  - Tổ Danh sách tổ ghi 0 thành viên, 0 dư nợ và Mẫu 31 không còn thành viên → **tổ ngừng** (không tính thiếu).
  - **② Kiểm tra số liệu** nhóm 6 thêm: "Tổ trưởng trên Danh sách tổ khớp Mã CIF TT" · "Danh sách tổ đủ CCCD · ngày cấp · TK 104 tổ trưởng"; chữ "DSTO" trên giao diện đổi thành "Danh sách tổ"; 📋 File cần xuất ghi file `baocao_yyyymmdd_hhmmss`.
  - **File thật (Mẫu 31 30/09 + Danh sách tổ 13/10, chỉ thư mục nháp):** **369 / 369 tổ đủ** CCCD, ngày cấp, TK 104 (tất cả theo Danh sách tổ; TK 104 trùng khớp Sao kê 369 / 369; tổ trưởng lệch Mã CIF TT: 0); 1 tổ ngừng; **40 TK 104 chưa đóng** (không còn là tổ trưởng); CCCD: 362 còn hạn, **1 hết hạn**, 7 chưa xác định hạn.
- **Sổ QT:** QT-11…14 chuẩn lại theo file thật ghi vào `docs/QUY_CHUAN_KIEN_TRUC.md` mục 4. Kế hoạch + ước số phiên: `docs/KE_HOACH_B_C.md`.
- **Phép thử:** `t167` 82/82 (bảng tổ, hộp thiếu, TK 105 Sao kê 2 TK → chọn, TK trùng, Danh sách tổ hệ thống giả: đọc, kỳ gần nhất, CCCD / TK 104 theo Danh sách tổ, TK 104 chưa đóng, file bắt buộc) · `t168` 33/33.

## 3.201 — 14/10/2026 — Nguồn TƯ: Mẫu 01/TV, Sao kê TK 104 / 105, Mã CIF TT; bỏ danh mục tổ
- **Anh (14/10):** đổi cơ bản cách lấy TK 104 / TK 105 ("nạp danh mục không khả thi"); số liệu chính là Mẫu 31 + Mẫu 18; nạp 2 file Sao kê TK 104 / 105 theo ngày; báo tổ trưởng đã nghỉ cần đóng 104, khách ra khỏi tổ cần đóng 105; rà thuật toán thành viên tổ, đối chiếu chéo Mẫu 01/TV (chính xác theo TƯ, chỉ có theo tháng); "Mẫu 01/TV lấy dư nợ = 0 nhưng không tính lãi tồn — các món đó coi như chưa tất nợ"; bỏ hẳn danh mục tổ; chữ "Rút tiền" chọn nghiêng / không (mặc định nghiêng); "làm và chạy 1 lần anh test".
- **Rà thuật toán thành viên tổ (file thật 30/09, chỉ trong vùng nháp):** app (Mẫu 31) **18.648 / 18.648 cặp khách–tổ đều có trong 01/TV** (app không sai chỗ nào); TƯ còn 168 thành viên Mẫu 31 không thể hiện (không còn món vay, dư nợ 0, tiền gửi 0). Khế ước hủy: app đã loại trước khi xét (`slBo`) — không phải lỗi.
- **Mã CIF TT** (Mẫu 31 / Mẫu 18) = mã KH tổ trưởng → `t.cif`, `hsoTTKH` dùng trước DSTO / trùng tên. Mẫu 18 = loại "Dư nợ chi tiết" sẵn có (đổi tên hiển thị, đọc thêm cột Mã CIF TT).
- **Loại file mới** (đọc riêng theo khuôn, `js/28-tv-tk.js`): `tv01` Mẫu 01/TV (theo tháng — dòng "Đến ngày…"), `tk104` / `tk105` "9. Sao kê tài khoản theo mã sản phẩm" (theo ngày — cột Ngày BC, tự nhận 104 / 105 theo cột Sản phẩm). Nạp qua 📥 Nạp file như các file khác.
- **Đối chiếu 01/TV** (`tvDoiChieu`): ② Kiểm tra số liệu nhóm 6 — khớp / TƯ có Mẫu 31 không thể hiện / app có TƯ không; **Cần cho ra khỏi tổ**: TƯ còn giữ, dư nợ 0 + tiền gửi 0 và **không còn lãi tồn** (còn lãi tồn = chưa tất nợ, liệt kê riêng); khách đứng tên ≥ 2 tổ. Tab 👥 Tổ (1 tổ): chip **Cần cho ra khỏi tổ (TƯ)**. File thật T9: 182 khách cần cho ra, 9 khách ở 2 tổ, 7 khách dư nợ 0 nhưng còn lãi tồn.
- **TK 104 / 105** (`tkTT`, `tkCanDong`): luôn dùng Sao kê **mới nhất** (gắn `K.tk` khi dựng kỳ). Giấy lĩnh TK 104 = Sao kê TK 104 theo Mã CIF TT (file thật: 369/377 tổ, 8 tổ báo rõ "không có trong Sao kê"); TK 105 khách: số sổ Mẫu 18 → thiếu thì Sao kê TK 105. Nút **📋 TK 104 cần đóng** (chủ TK không còn là tổ trưởng — file thật 40) / **TK 105 cần đóng** (không còn là thành viên tổ theo 01/TV — file thật 2.292), xuất Excel — ở ⚙ Khai báo chung (Giao dịch xã) và 📥 Nạp & KT.
- **CCCD tổ trưởng / khách**: Mẫu 31 → Mẫu 01/TV → Thông tin tổ trưởng / DSTO → số anh gõ tay lần trước (`D.cauHinh.ccNho`, nhớ theo mã KH; 01/TV không có ngày cấp → lấy ngày anh đã gõ). File thật: 376/377 tổ trưởng có CCCD.
- **Bỏ hẳn danh mục tổ** (khối 📚, nạp / kiểm tra, tra theo tên, `gdxTC` / `dmt*`, `gdxTK104*`); dữ liệu cũ `D.cauHinh.dmTo` / `dmTK104` để nguyên, không dùng. Mini app lấy TK 104 / CCCD theo nguồn mới.
- **Giấy lĩnh:** chữ nội dung ("Rút tiền") chip **Nghiêng** (mặc định) / **Thường** (`glNDNghieng`).
- **Không làm** (anh từng bỏ ở 3.137): tách chip "Tất nợ · còn TK 105" theo số dư 0.
- **Phép thử:** `t167` 74/74 (Sao kê TK 104 giả, 01/TV giả, cần cho ra khỏi tổ, nhớ ngày cấp) · `t168` 33/33 (mini app theo Sao kê TK 104) · hồi quy đầy đủ.

## 3.200 — 14/10/2026 — 💵 Giấy lĩnh: PGD đậm / thường, số tiền bằng chữ in nghiêng
- **Anh (14/10):** "dòng Phòng giao dịch Gò Dầu em cho tùy chọn in đậm hoặc không" · "số tiền bằng chữ cho in nghiêng".
- Khai báo dòng đầu phiếu (ô tên PGD) thêm 2 chip **Đậm** (mặc định, như 3.197) / **Thường** — khóa `glPGDDam` ('dam' / 'thuong'), mini app mang theo.
- Số tiền bằng chữ (cả 2 dòng) in nghiêng; nhãn “Yêu cầu cho rút tiền (bằng chữ):” giữ như cũ.
- **Phép thử:** `t167` 75/75 · `t168` 33/33.

## 3.199 — 14/10/2026 — 💵 Giấy lĩnh: ngày tháng cùng dòng PGD
- **Anh (14/10):** "dòng ngày tháng cho cùng dòng PGD Gò Dầu" · "cho giãn dòng xích lên 1 mm thấy khoảng cách hơi trống".
- Dòng *Ngày … tháng … năm …* (cột giữa) cách tiêu đề 4 → 2,75 mm → ngang hàng dòng **PHÒNG GIAO DỊCH GÒ DẦU** (đo lệch < 0,1 px); khai báo PGD trống → dòng chấm cũng ngang dòng ngày.
- Đầu phiếu thấp lại → thân phiếu (từ dòng Họ, tên khách hàng) **xích lên 1,25 mm**; chữ chìm VBSP dời theo (48,4 → 47,15 mm).
- **Sửa lỗi 3.198:** mini app thiếu hàm `gdxTenPGD` → in Giấy lĩnh trong mini app báo lỗi; đã thêm vào gói mini app.
- **Phép thử:** `t167` 74/74 · `t168` 33/33 · `t165` 54/54.

## 3.198 — 14/10/2026 — 💵 Giấy lĩnh: không viết tắt PGD
- **Anh (14/10):** "không viết tắt PGD".
- `gdxTenPGD`: khai báo tên PGD ghi “Gò Dầu”, “PGD Gò Dầu” hay “Phòng giao dịch Gò Dầu” đều in **“PHÒNG GIAO DỊCH GÒ DẦU”** (viết hoa, đậm, 1 dòng); dữ liệu cũ đã ghi “PGD …” tự in đầy đủ. Trống → chấm như cũ. Gợi ý ô khai báo đổi thành “vd: Gò Dầu”.
- **Phép thử:** `t167` 73/73.

## 3.197 — 14/10/2026 — 💵 Giấy lĩnh / 🧾 Bảng kê: chỉnh theo ý anh
- **Anh (14/10):** "hai gạch dọc trong giấy lĩnh tiền cho dài thêm xuống dưới 2 mm, ô số tiền bằng số canh đều ô cho đẹp, chữ phòng giao dịch Gò Dầu in đậm như 2 dòng trên… bảng kê… chỗ họ tên người ký, chữ họ tên in nhỏ nghiêng, kéo dài chỗ chấm để ghi đủ tên".
- **Giấy lĩnh:** 2 gạch dọc ô Người lĩnh tiền dài thêm 2 mm (cách đáy 2,5 → 0,5 mm); ô **Số tiền bằng số**: tiêu đề và số giãn đều trong ô; dòng tên PGD (khai báo `glPGD`) **in đậm** như 2 dòng tên cơ quan.
- **Bảng kê:** chữ “Họ tên:” dưới 2 chỗ ký nhỏ, nghiêng; khoảng cách 2 cột hẹp lại để dòng chấm dài hơn, đủ chỗ ghi họ tên. “PHÒNG GIAO DỊCH: GÒ DẦU” liền khối, in đậm đã có từ 3.195 (cùng PR).
- **Phép thử:** `t167` 72/72.

## 3.196 — 14/10/2026 — 📏 Đường kẻ mảnh, đường phụ nhạt hơn đường chính — mọi mẫu biểu
- **Anh (14/10):** "các lằn kẻ con nên lợt nhỏ hơn lằn chính" → "áp dụng cho mọi mẫu biểu". Quy tắc ghi ở `docs/QUY_TAC_SOAN_MAU.md` (mục Đường kẻ): chính ≤ 0,9 px đen; phụ 0,4–0,6 px xám hoặc chấm xám; chấm ghi tay 0,5 pt / 0,7 px xám đậm; không đường nào ≥ 1,2 px.
- **💵 Giấy lĩnh:** dòng chấm 1,4 px đen → 0,7 px `#333` (như Bảng kê); khung 3 ô 1,2 → 0,9 px; vạch chia giữa các ô và 2 gạch dọc ô Người lĩnh → 0,6 px xám (đường phụ).
- **04/TD, 12/GDX:** vạch dưới tên cơ quan / tiêu ngữ 1,2–1,5 px → 0,9 px; bảng 12/GDX: khung, cột, đầu bảng, dòng Tổng cộng 0,9 px đen, kẻ ngang giữa các dòng 0,5 px xám.
- **Mẫu 06 / 16 / 04 KTGS / Kế hoạch KTGS (bản In):** bảng 1 px → 0,5 pt; dòng chấm 1 px đen → 0,5 pt chấm xám (Mẫu 06 đã theo quy tắc từ trước, chỉ làm mịn dòng chấm lý do). **Xuất Word của các mẫu này giữ nguyên khung file gốc.**
- **📄 Hồ sơ vay:** lưới vẫn 0,5 pt đen; kẻ chấm giữa các dòng (bảng có chấm) đen → xám, cả bản In và bản Word.
- **Bản in báo cáo nội bộ:** khung tóm tắt 1,5 → 0,9 px, dòng chấm 0,7 px xám, vạch cột trung tâm / tên khung 0,9 px.
- Chỉ đổi độ dày / màu nét, không đổi bố cục.

## 3.195 — 14/10/2026 — 🧾 Bảng kê: font đầu tờ như tờ thật, tên PGD liền khối, lằn kẻ mảnh
- **Anh (14/10):** "font chữ bảng kê em dùng font chuẩn như bảng kê, chữ Gò Dầu em thêm vào liền khối cùng cỡ font chữ, chỉ khi bỏ trong khai báo thì hiện chấm".
- **Tên PGD** (`gdxBKTrang`): có khai báo → in **“PHÒNG GIAO DỊCH: GÒ DẦU”** thành 1 khối, cùng font Arial đậm, cùng cỡ, viết hoa (trước đây tên PGD là ô riêng, chữ thường mảnh, cách xa); **bỏ trống khai báo → “PHÒNG GIAO DỊCH:” + dòng chấm** ghi tay. Áp cho tab 🧾 Bảng kê, mẫu trắng và phần Bảng kê in từ Giấy lĩnh.
- **Font đầu tờ theo tờ in sẵn:** 2 dòng tên cơ quan dùng chữ không chân đứng hẹp (Arial Narrow, máy chưa có thì Arial); BẢNG KÊ chữ có chân đậm; CÁC LOẠI TIỀN… và đầu bảng chữ không chân đậm; nhãn, số tiền chữ có chân (Times New Roman) — như tờ thật.
- **Lằn kẻ / chấm** (anh: "chấm nhuyễn, các lằn kẻ không dày quá nhìn thô, các lằn kẻ con nên lợt nhỏ hơn lằn chính"): chấm ghi tay nhỏ, mịn (0,7 px, xám đậm); lằn chính (khung bảng, đầu cột, Tổng cộng, ô bằng chữ, cột Loại tiền / Số lượng) mảnh lại 1,1 → 0,9 px; lằn con lợt và nhỏ hơn — dòng mệnh giá chấm 0,6 px xám, chia ô Thành tiền 0,5 px xám nhạt.
- **Phép thử:** `t167` 71/71 (tên PGD liền khối, trống → chấm).

## 3.194 — 14/10/2026 — 💵 Giấy lĩnh in kèm Bảng kê (theo cài đặt tab Bảng kê); 🌸 logo NHCSXH có sẵn
- **Anh (14/10):** "bên tab Giấy lĩnh tiền, khi in em sẽ kết hợp bảng kê cùng 1 trang A4 như bản cũ, có điền đầy đủ thông tin tổ trưởng, số tiền theo mẫu lĩnh tiền, số tiền chi mặc định từ mệnh giá cao đến thấp, chỗ ký tên để trống KH tự ký ghi họ tên"; "em bố trí như cũ, nút chọn in chỉ giấy lĩnh, chỉ bảng kê, cả 2, mẫu trắng khi không chọn dữ liệu"; "mẫu nào lấy theo cài đặt mẫu đó"; gửi logo NHCSXH (cánh sen) — "logo em tích hợp vào app luôn", "lưu lại logo này trên app và cho xuất khi cần", "tích logo này vào bảng kê, sau này khi nói tích hợp logo thì sẽ ở góc hoặc chìm", "nếu bật lên để xem thì hiện màu"; "em gom lại và code phần này".
- **💵 Giấy lĩnh — 4 nút in** như bản 3.192: **💵 Lĩnh** (chỉ Giấy lĩnh, A5 / A4 nửa trên) · **🧾 Bảng kê** (A4 ngang, 1 tờ 105 × 210 sát mép trái + nét cắt) · **💵+🧾** (1 tờ A4 dọc, Bảng kê xoay ngang sát đáy, cắt 1 nhát) · **📄 Mẫu trắng** (Giấy lĩnh 1 / 2 mẫu · Bảng kê 2 tờ / A4 ngang · Kết hợp). Phần Bảng kê: **họ tên người lĩnh in sẵn** (tổ trưởng / khách), địa chỉ, nội dung, ngày, **số tiền theo Giấy lĩnh — tự chia mệnh giá từ cao đến thấp**, Tổng cộng, bằng chữ đậm nghiêng; **dòng Họ tên dưới chỗ ký để trống** (khách tự ký, ghi tên). **Mẫu nào lấy cài đặt mẫu đó:** phần Giấy lĩnh theo ⚙ Giấy lĩnh (chữ chìm VBSP), phần Bảng kê theo ⚙ tab 🧾 Bảng kê (tên cơ quan, PGD, logo chìm).
- **🌸 Logo NHCSXH (cánh sen) có sẵn trong app** (`LOGO_NHCSXH`, PNG nền trong suốt ~5 KB, xử lý từ ảnh anh gửi): logo mặc định cho **logo chìm Bảng kê** (giữ màu hồng, mờ theo Nhạt / Vừa / Đậm, Tắt = không in) và **logo góc các mẫu Hồ sơ vay** (01/TD, 01/TGTV mặc định — nay không cần nạp). Logo anh nạp ở 📄 Hồ sơ vay › ⚙ Khai báo 1 lần vẫn được ưu tiên; có **⬇ Tải logo** (PNG) và **↺ Về logo NHCSXH**. Anh đồng ý đưa logo vào repo (biểu trưng công khai, ngoại lệ ghi ở `docs/QUY_TAC_SOAN_MAU.md`).
- **Quy ước "tích hợp logo"** (ghi ở `docs/QUY_TAC_SOAN_MAU.md`): logo góc hoặc logo chìm — chưa nói rõ thì hỏi lại.
- **Phép thử:** `t167` 71/71 (3 nút in, Kết hợp điền dữ liệu + tự chia + ký tên trống + logo NHCSXH; Bảng kê riêng 1 tờ; Lĩnh chỉ Giấy lĩnh) · `t164` 26/26 · `t168` 33/33.

## 3.193 — 13/10/2026 — 🧾 Bảng kê thành mẫu riêng; Giấy lĩnh gọn lại; khách chuyển tổ khi vay mới
- **Anh (13/10):** "anh muốn thay đổi cơ bản 2 mẫu này, tách biệt ra thành 2 mẫu độc lập … bỏ hết các phần in lằng nhằng giữa 2 mẫu, anh sẽ setup lại từng mẫu, gỡ toàn bộ gì liên quan bảng kê tiền ra khỏi mẫu lĩnh tiền, đem bảng kê tiền qua tab mới, ban đầu là mẫu trắng, có khai báo riêng các nội dung từ trên xuống như tên cơ quan, họ tên KH, địa chỉ, nội dung có ghi hay để chấm, logo tách rõ 2 kiểu logo chìm khác nhau"; "các món vay tất nợ đã gỡ mã tổ ngày 11 nhưng số liệu vẫn còn hiện trong chip" (gửi Mẫu 31 / Mẫu 18 đến 11/10 + 3 mã KH); "cái này do em tổng hợp và ràng buộc, em tự quyết".
- **🧾 Bảng kê = mẫu thứ 4** ở tab Giao dịch xã (`GDX_MAU` `bk`, chip 🧾 Bảng kê): **mẫu trắng 2 tờ 105 × 210 mm / A4 ngang**, mỗi tờ sát 1 mép, nét đứt cắt đúng khổ; không cần lọc địa bàn (khối lọc ẩn). Khai báo riêng (`GDX_MUC.bk`, hiện sẵn ở khung trái): **Tên cơ quan** (2 dòng + Phòng giao dịch, in hoa) · **Ngày** (để chấm / ghi sẵn hôm nay) · **Họ và tên người lĩnh tiền** · **Địa chỉ** · **Nội dung** (có chữ thì in, để trống = chấm ghi tay) · **Logo chìm** (logo Hồ sơ vay, Tắt / Nhạt / Vừa / Đậm — riêng Bảng kê). Bảng mệnh giá, Tổng cộng, bằng chữ, chữ ký để trắng ghi tay. Chữ 13 pt, logo cân theo tờ thật như 3.192.
- **💵 Giấy lĩnh gọn lại:** bỏ 3 chip 💵 / 🧾 / 💵+🧾, bỏ khổ "A4 + Bảng kê" (máy đang chọn → A4 nửa trên), bỏ nhóm 🧾 trong ⚙ Khai báo riêng, 📄 Mẫu trắng chỉ còn Giấy lĩnh 1 / 2 mẫu. Giấy lĩnh dùng chữ chìm VBSP, Bảng kê dùng logo — 2 kiểu riêng.
- **👥 Tổ TK&VV — khách chuyển tổ khi vay mới** (`slDanhRaTo`): đối chiếu Mẫu 31 đến 11/10 thật — khách có món cũ đã tất toán ở tổ A (Mẫu 31 giữ mã tổ lúc vay) và **món mới đang vay ở tổ B** trước đây vẫn bị tính tổ viên tổ A (chip "Tất nợ · còn TK 105"). Nay: món đã đóng ở tổ khác tổ đang vay chỉ là lịch sử → không tính khách vào tổ cũ, chỉ tính ở tổ đang vay; ② Kiểm tra số liệu có dòng riêng "Khách vay món mới ở tổ khác" (chạy thử Mẫu 31 đến 11/10 thật: 73 khách toàn PGD, gồm 7122152059 · 7070797171). Khách chỉ có món đã đóng giữ quy tắc cũ (TK 105 còn gắn tổ → còn trong tổ).
- **Phép thử:** `t167` 68/68 (mẫu 🧾 Bảng kê: 2 tờ A4 ngang, 6 mục khai báo, ghi / chấm, logo riêng; Giấy lĩnh không còn Bảng kê) · `t131` 26/26 (khách chuyển tổ) · hồi quy đủ (t100, t116 trượt sẵn trên main — không do bản này).

## 3.192 — 13/10/2026 — ⚙ Bảng kê khai báo riêng; mẫu trắng 2 tờ / A4 ngang
- **Anh (13/10):** "trong phần khai riêng tách ra 2 phần riêng cho giấy lĩnh và bảng kê, 2 mẫu là 2 kiểu logo chìm khác nhau, nên để khai riêng không gộp"; "bảng kê có các kiểu in: in chung giấy lĩnh tiền như đã có; in riêng mẫu trắng 2 bảng kê lên 1 tờ A4 ngang mỗi tờ canh 1 đầu"; "2 tờ không hết tờ A4 nên có gạch để cắt cho đúng cỡ, bỏ kiểu cũ"; "chỉ in trắng mới in 2 tờ trên 1 A4 ngang, còn có dữ liệu thì in chung giấy lĩnh tiền; mẫu trắng có chữ Gò Dầu, cho khai trong cài đặt riêng bảng kê".
- **⚙ Khai báo riêng mẫu (Giấy lĩnh)** chia **2 nhóm có tiêu đề**: 💵 Giấy lĩnh tiền mặt (các mục cũ, Chữ chìm VBSP chỉ cho Giấy lĩnh) · 🧾 Bảng kê các loại tiền: **Tên phòng giao dịch** (`bkPGD`, trống = Địa danh), **Logo chìm** (`bkChim` Tắt / Nhạt / Vừa / Đậm, mặc định Nhạt — **bỏ "Theo Giấy lĩnh"**), **Bảng mệnh giá** (để trắng / tự chia), **Kiểu in** (giải thích + nút In mẫu trắng). Bỏ mục gộp `glbk` cũ.
- **Kiểu in Bảng kê:** (bản đầu: có dữ liệu → in chung Giấy lĩnh — nay tách 3 chip, xem dưới). **Mẫu trắng → 2 tờ / A4 ngang** (`gdxHTMLBK`, `BK_CSS`): mỗi tờ **105 × 210 mm** (cao hết khổ), tờ trái sát mép trái, tờ phải sát mép phải, **nét đứt cách mỗi mép 105 mm** để cắt đúng cỡ; tên PGD in sẵn (GÒ DẦU), ngày / họ tên / địa chỉ / nội dung / mệnh giá / bằng chữ để chấm ghi tay. **Bỏ kiểu cũ 105 × 185** (1 tờ góc trái / 2 liên cạnh nhau, `bkKho`).
- **Ngang 105 mm đúng mẫu** (anh: "chiều ngang bảng kê 105 đúng mẫu"): Bảng kê in chung Giấy lĩnh nay 210 × 105 mm (cắt 1 nhát ngang cách đáy 105 mm), mẫu trắng 105 × 210; chữ vẫn 13 pt, đầu tờ thu cỡ để mỗi dòng 1 hàng, logo cân lại theo bảng.
- **Tách biệt hẳn Giấy lĩnh / Bảng kê** (anh: "các cài đặt giữa 2 cái đang đan xen rối rắm, tạm em tách biệt ra hết, bố trí phần in riêng rồi cho chọn kết hợp"; "logo lấy logo trong hồ sơ vay"): dòng Tóm tắt có **3 chip chọn in** (`glIn`): **💵 Lĩnh** = chỉ Giấy lĩnh (khổ A5 / A4 nửa trên theo ⚙ Giấy lĩnh) · **🧾 Bảng kê** = chỉ Bảng kê, **A4 ngang, 1 tờ 105 × 210 sát mép trái + nét cắt** (bảng mệnh giá theo ⚙ Bảng kê) · **💵+🧾** = Kết hợp 1 tờ A4 dọc (Bảng kê luôn tự chia). Khổ giấy Giấy lĩnh **bỏ lựa chọn "A4 + Bảng kê"** (máy đang chọn khổ đó tự chuyển sang 💵+🧾). 📄 Mẫu trắng chia nhãn 💵 Giấy lĩnh · 🧾 Bảng kê · 💵+🧾 Kết hợp. Logo chìm Bảng kê lấy logo đã nạp ở 📄 Hồ sơ vay. Khung xem tự vừa khổ A4 ngang.
- **Kỹ thuật:** cỡ 115 × 210 + chữ 13 pt tách thành `BK_CSS_TO` (lớp `.bk-to`, 105 × 210) dùng chung cho in kèm và mẫu trắng; `GL_CSS_KEM` chỉ còn xoay + nét cắt.
- **Phép thử:** `t167` 72/72 (3 chip in tách biệt; Bảng kê riêng 1 tờ sát mép trái; mẫu trắng A4 ngang 2 tờ sát 2 mép, 2 nét cắt, PGD in sẵn; ⚙ 2 nhóm; logo riêng) · `t168` 33/33.

## 3.191 — 13/10/2026 — 🧾 Bảng kê in kèm: to hơn, chữ 13 pt, đậm số tiền
- **Anh (13/10):** "Bảng kê chiều dài cho full chiều ngang trang, chiều ngang cho rộng hơn 1 cm, bỏ ghi sẵn tên hộ vay, số tiền cộng in đậm, bằng chữ in đậm nghiêng, chữ Gò Dầu gần chữ PGD, cả cụm tên cơ quan lớn lên 1 chút, dùng font 13–14, logo in chìm là logo cánh sen anh gửi lần trước (in góc trái)".
- **In kèm Giấy lĩnh** (`GL_CSS_KEM`): Bảng kê **210 × 115 mm** (dài hết bề ngang A4, rộng 105 → 115 mm), sát đáy tờ → **chỉ cắt 1 nhát ngang** (cách đáy 115 mm). Chữ **13 pt** (bảng mệnh giá 13 pt, Thành tiền 12 pt, đầu bảng 10,5 pt); cột Loại tiền 24 mm; logo chìm 62 mm giữa bảng.
- **Mọi Bảng kê** (`gdxBKTrang`, `BK_CSS_LOI`): **không in sẵn tên người lĩnh** (dòng "Họ và tên người lĩnh tiền" để chấm, ghi tay); **Tổng cộng in đậm**; **số tiền bằng chữ in đậm nghiêng** (rất dài thì xuống dòng 3); tên PGD **viết hoa, sát chữ "PHÒNG GIAO DỊCH:"** (vd PHÒNG GIAO DỊCH: GÒ DẦU); cụm tên cơ quan 7,5 → 8,5 pt (in kèm 9 pt, mỗi dòng 1 hàng).
- **Logo chìm:** dùng logo anh đã nạp ở 📄 Hồ sơ vay › ⚙ Khai báo 1 lần (logo in góc trái mẫu 01/TD) — không có trong repo.
- **Logo cân đối như tờ thật** (anh: "logo cân đối như hình"): khung logo đo theo ảnh tờ in sẵn — mép trên giữa dòng 100.000, mép dưới giữa dòng Tổng cộng, trái ¾ cột Số lượng, phải ⅓ cột Thành tiền cuối; ảnh co vừa khung, giữ tỷ lệ (tờ riêng 54,5 × 56,6 mm; in kèm 58,7 × 66,7 mm).
- **Đầu tờ mỗi dòng 1 hàng** (tờ riêng trước bị xuống dòng "XÃ HỘI"): 2 cụm đầu canh 2 mép, lề trái / phải 5,5 / 5 mm, "CÁC LOẠI TIỀN…" 6,8 pt (in kèm 7,4 pt), cụm cơ quan 8 pt (in kèm 8,6 pt).
- **⚙ Khai báo riêng mẫu › 🧾 Bảng kê (khai báo riêng)** thêm **Logo chìm Bảng kê: Theo Giấy lĩnh (mặc định) · Tắt · Nhạt · Vừa · Đậm** (`bkChim`), cùng chỗ với Bảng mệnh giá để trắng / tự chia và 1 tờ / 2 liên.
- **Phép thử:** `t167` 68/68 · `t168` 33/33.

## 3.190 — 13/10/2026 — 🧾 Bảng kê: Họ tên người lĩnh ghi tay
- **Anh (13/10):** "tên người nhận tự ký và ghi tay".
- **Bảng kê** (`gdxBKTrang`): dòng **Họ tên** dưới chỗ ký Người lĩnh tiền không in sẵn tên nữa, để chấm cho người lĩnh tự ký và ghi tay (như Người chi tiền). Dòng "Họ và tên người lĩnh tiền" ở đầu tờ vẫn in sẵn.
- **Phép thử:** `t167` 67/67.

## 3.189 — 13/10/2026 — 🧾 Bảng kê: chữ chìm bằng logo
- **Anh (13/10):** "em code đi, em có logo rồi phải không" (tờ Bảng kê in sẵn có logo VBSP in chìm to giữa bảng).
- **Bảng kê** (`gdxBKTrang`, `BK_CSS_LOI`): chữ chìm dùng **logo anh đã nạp ở 📄 Hồ sơ vay › ⚙ Khai báo 1 lần** (`hsoKB().logo`, lưu trong cài đặt máy anh, đồng bộ Drive — không có trong repo), rộng 58 mm, giữa vùng bảng mệnh giá như tờ in sẵn; đậm nhạt theo Chữ chìm của Giấy lĩnh (Nhạt / Vừa / Đậm, Tắt = không in). Chưa nạp logo → giữ chữ VBSP như cũ. Áp cho Bảng kê in riêng, in kèm Giấy lĩnh và mẫu trắng. Giấy lĩnh giữ chữ VBSP.
- **Phép thử:** `t167` 66/66 (logo giả 1 điểm ảnh → chữ chìm là ảnh; chưa nạp → VBSP).

## 3.188 — 13/10/2026 — 🧾 Giấy lĩnh + Bảng kê in chung 1 tờ A4
- **Anh (13/10):** "thêm mẫu bảng kê tiền in kèm phiếu chi luôn, in ở phần A4 dưới em bố trí" → chọn cách A (giữ đúng tờ in sẵn, xoay ngang) "canh cạnh dưới cho dễ cắt", "in chung 1 tờ A4", "tiền kê từ mệnh giá lớn xuống", "tự chia sẵn, chốt tổng tiền bằng chữ đầy đủ", "đồng ý gộp". Dòng chấm dưới Nội dung (6,0 mm) anh để nguyên.
- **⚙ Khổ giấy** thêm **A4 dọc · Giấy lĩnh trên + 🧾 Bảng kê dưới** (`glKho='a4bk'`, `GL_CSS_KEM`): bấm IN 1 lần ra cả 2 phần trên 1 tờ A4. Giấy lĩnh nửa trên như bản A4 cũ; Bảng kê (105 × 185 mm) **xoay ngang 185 × 105 mm sát cạnh dưới và cạnh trái** → cắt 2 nhát theo nét đứt (ngang cách đáy 105 mm, dọc cách mép trái 185 mm). Bảng kê in kèm **luôn tự chia mệnh giá từ tờ lớn xuống** (Số lượng, Thành tiền, Tổng cộng), **số tiền bằng chữ đầy đủ** (dài tự xuống dòng 2). Cùng dữ liệu Giấy lĩnh.
- **📄 Mẫu trắng** thêm **Giấy lĩnh + 🧾 Bảng kê / A4**.
- **Kỹ thuật:** lõi CSS Bảng kê tách thành `BK_CSS_LOI` (chữ `.gl-*` bó trong `.bk-trang`) dùng chung cho tờ riêng và in kèm — Bảng kê in riêng không đổi. Mini app chưa gói Bảng kê: khổ này ở mini in như A4 nửa trên.
- **Lưu ý máy in:** máy không in sát mép được thì nét đứt mép dưới có thể không lên (chữ cách mép 5–7 mm nên không mất chữ) — in thử báo em dời lên nếu cần. Khổ tờ Bảng kê 105 × 185 mm vẫn là số ước, chờ anh đo.
- **Phép thử:** `t167` 65/65 (in chung: 1 tờ, Bảng kê 185 × 105 sát góc dưới trái, tự chia, bằng chữ đủ, 2 nét cắt; mẫu trắng) · `t168` 33/33 · `t165` 53/53.

## 3.187 — 13/10/2026 — 🧾 Bảng kê các loại tiền; CCCD tổ trưởng từ file về tổ; ngày gõ liền
- **Anh (13/10):** gửi ảnh tờ "Bảng kê các loại tiền ngân hàng chi ra", "em chuẩn bị mẫu bảng kê luôn"; "tổ này không lấy được CCCD" → "CCCD tổ trưởng có trong các file về tổ"; "nhập ngày CCCD tay không cần nhập dấu cách".
- **🧾 Bảng kê** (`gdxBKTrang`, `gdxHTMLBK`, `BK_CSS`, `gdxBKChia`): dựng theo ảnh tờ in sẵn (giấy trắng cả khung, chữ chìm VBSP): NGÂN HÀNG CHÍNH SÁCH XÃ HỘI · CHI NHÁNH TỈNH TÂY NINH · PHÒNG GIAO DỊCH (địa danh khai báo) | BẢNG KÊ · CÁC LOẠI TIỀN NGÂN HÀNG CHI RA · ngày; Họ và tên người lĩnh tiền · Địa chỉ · Nội dung; bảng 11 mệnh giá (500.000 → 200) · Số lượng · Thành tiền 4 ô (nhóm 3 chữ số) · Tổng cộng; Số tiền bằng chữ (2 dòng, tự xuống dòng); Người lĩnh tiền / Người chi tiền + Họ tên. **Cùng dữ liệu Giấy lĩnh** (người lĩnh, địa chỉ, nội dung, ngày, số tiền). Dòng Tóm tắt có **💵 Giấy lĩnh · 🧾 Bảng kê** → xem / in cái đang chọn (nhật ký in nhớ đúng loại). ⚙ Khai báo riêng › Bảng kê: **bảng mệnh giá để trắng (mặc định) / tự chia mệnh giá** (tờ lớn trước), **1 tờ / A4 (góc trái) / 2 liên / A4**. 📄 Mẫu trắng thêm **Bảng kê trắng 2 tờ / A4**. **Khổ tờ tạm 105 × 185 mm ước theo ảnh — chờ anh đo tờ thật.**
- **CCCD tổ trưởng (TK 104)** (`gdxTTNhanThan`): danh bạ khách không có → lấy từ **file Thông tin tổ trưởng** → **DSTO** → **danh mục tổ** (danh mục nay đọc thêm cột CCCD / ngày cấp tổ trưởng nếu có). Không thấy ở đâu → Tóm tắt báo "Chưa có CCCD tổ trưởng — lý do — gõ tay". Mini app gói theo cùng cách.
- **Ngày gõ liền** (`gdxDocNgay`): thêm 5 / 7 số (2542021 = 25/04/2021, 252021 = 02/05/2021, 25421 = 25/04/2021); năm 2 số quá năm nay + 10 → 19xx (250299 = 25/02/1999); năm ngoài 1900–2100 không nhận. Ô Ngày cấp rời ô tự hiện dd/mm/yyyy để soát.
- **Mẫu in Giấy lĩnh** (`GL_CSS`, anh 13/10: "kéo dài 2 đường dọc chỗ cuối thêm 2,5 mm, 2 đường chấm ngang lên chút, dòng Yêu cầu rút tiền giãn ra so hàng trên, các dòng trong khối giãn đều nhau"): 2 gạch dọc ô Người lĩnh tiền **dài thêm 2,5 mm** (cách đáy 5 → 2,5 mm); 9 dòng khối trái (Họ tên → Nội dung) **giãn đều 7,08 mm** (bỏ rút 1 mm của 3.186 — dòng Yêu cầu trước chỉ cách dòng trên 6,2 mm); 2 đường chấm bằng chữ **lên 0,8 mm**. Đã đo: dòng Họ tên và Nội dung giữ nguyên chỗ, ô Số tiền vẫn ngang dòng Nội dung, phiếu trọn 148 mm không tràn.
- **Phép thử:** `t167` 63/63 (Bảng kê xem / tự chia / mẫu trắng; CCCD tổ trưởng từ Thông tin tổ trưởng + lý do) · `t165` 53/53 (ngày 5 / 7 số, năm 2 số cũ) · `t168` 33/33.

## 3.186 — 13/10/2026 — Giấy lĩnh: dòng Họ tên xuống 6 mm, dòng bằng chữ + Nội dung rút lên 1 mm
- **Anh (13/10):** "giãn dòng chỗ họ tên xuống 5 mm cho thoáng"; "giảm 1 mm đi"; "giãn thêm dòng họ tên 2 mm, rút 2 dòng chấm chấm chỗ số tiền bằng chữ và nội dung lên 1 mm".
- **Bằng chữ + Nội dung** (`.gl-len{margin-top:-1mm}` bọc 2 dòng bằng chữ + dòng Nội dung): rút lên 1 mm; đáy ô Số tiền bằng số vẫn ngang dòng Nội dung như 3.176 (đã đo).
- **Mẫu in** (`GL_CSS`): khoảng cách đầu phiếu → dòng "Họ, tên khách hàng" 2 → **8 mm** (anh chỉnh: xuống 5 mm → giảm 1 mm → giãn thêm 2 mm) (cả thân phiếu và khung PHẦN DO NGÂN HÀNG GHI xuống theo); chữ chìm dời theo (top 42,4 → 48,4 mm) để giữ đúng vị trí so với form. Đã đo: phiếu vẫn trọn 148 mm, không tràn; chỗ ký còn ~29 mm. Mini app dùng chung mẫu nên tự theo.
- **Phép thử:** `t167` 59/59 (kiểm CSS 8 mm + chữ chìm 48,4 mm + bằng chữ / Nội dung lên 1 mm).

## 3.185 — 13/10/2026 — Giấy lĩnh: tìm theo CCCD, Enter tới ô số tiền, TK 105 theo CCCD, Làm trống bỏ chọn tổ
- **Anh (13/10):** "TK 105 chưa hiện ra"; "cho tìm tên theo số CCCD cho chính xác"; "khi tìm tên xong danh sách hiện ra, dùng phím mũi tên lên xuống để di chuyển chọn ngay tên, Enter sẽ đi đến ô số tiền luôn"; "khi chọn tổ từ cây địa bàn, nếu bấm làm trống cũng bỏ chọn" (đã ghi việc chờ, làm bản này); "code và gộp".
- **Tìm theo CCCD** (`gdxGLTim`, `gdxCCCDCua`): gõ số (4 số cuối trở lên hoặc đủ CCCD) → tìm theo **số CCCD** (danh bạ khách các kỳ / dòng Mẫu 31), không lẫn người trùng tên; kết quả kèm "CCCD …". Gõ chữ vẫn tìm theo tên như cũ. Mini app: tìm tổ trưởng theo CCCD đã gói.
- **↑↓ Enter → ô số tiền** (`gdxGLToiTien`): chọn người trong danh sách tìm (↑↓ Enter hoặc bấm) hay chọn khách ở ô sổ xuống → con trỏ nhảy ngay ô **Số tiền** (bôi sẵn để gõ đè).
- **TK 105** (`gdxGLDuLieu`): số sổ lấy theo Mẫu 31 / Dư nợ chi tiết như cũ (chỉ nhận 10 chữ số); chưa có → tra **danh bạ các kỳ theo số CCCD** (không theo tên), thấy thì lấy và ghi "theo CCCD — mã KH …, kỳ …"; vẫn không có → dòng **TK 105: chưa có — lý do** (Mẫu 31 chỉ báo đã mở TK, chưa có số sổ 10 chữ số — nạp Dư nợ chi tiết kỳ này hoặc gõ tay / khách chưa có TK 105).
- **✕ Làm trống** (`gdxGLLamTrong` = `gdxGLMoi`): trước hay sau in như nhau — bỏ người lĩnh, form, số tiền và **bỏ luôn chọn tổ** ở cây địa bàn (giữ Xã / Điểm), con trỏ về ô tìm.
- **Phép thử:** `t167` 59/59 (thêm: tìm 6 số cuối CCCD + ↑↓ Enter → ô số tiền; TK 105 chưa có số sổ → lý do, có số sổ cùng CCCD ở danh bạ → lấy; Làm trống bỏ chọn tổ) · `t168` 33/33 · `t165` 52/52.

## 3.184 — 13/10/2026 — Giấy lĩnh: nơi cấp chữ mờ, trường hợp cũ ghi chung
- **Anh (13/10):** "nơi cấp hiện dòng nhỏ dưới dòng số CCCD, cùng dòng địa chỉ mờ, không cần ra ô tốn 1 dòng"; "hiện tại đã đổi chỉ còn 2 dạng nơi cấp, nếu rơi vào trường hợp cũ thì báo và ghi Cục Cảnh sát thôi, ghi chung vậy".
- **Form:** bỏ ô Nơi cấp; nơi cấp hiện **chữ nhỏ, mờ** cùng dòng nhãn Địa chỉ (ngay dưới ô CCCD), tự đổi khi gõ ngày cấp; bấm vào để gõ tay (để trống = tự tính lại, có dấu ✎ khi đang gõ tay). Địa chỉ · Tài khoản số cùng 1 dòng → form còn 2 dòng ô nhập.
- **Công thức** (`gdxNoiCap`, mốc `GDX_NC_CU`): từ 01/07/2024 → Bộ Công an; từ 10/10/2018 → Cục Cảnh sát quản lý hành chính về trật tự xã hội; **trước 10/10/2018 (thẻ đợt đầu — trường hợp cũ) → ghi chung "Cục Cảnh sát"** + ⚠ ở chữ nơi cấp và cảnh báo vàng ở Tóm tắt (kiểm lại trên thẻ). Mốc 10/10/2018 là em chọn theo hiểu biết, chưa có văn bản kèm — anh chỉnh nếu khác. Mini app cùng cách.
- **Phép thử:** `t167` 57/57 (thêm: không còn ô Nơi cấp, chữ mờ đúng, Địa chỉ · TK 1 dòng, trường hợp cũ ghi "Cục Cảnh sát" + cảnh báo) · `t168` 32/32 · `t165` 52/52.

## 3.183 — 13/10/2026 — Giấy lĩnh: nơi cấp tự tính, form gọn, nút Xem rõ trạng thái
- **Anh (13/10):** "chỗ bật tắt xem bị ngược, họ tên, căn cước, ngày cấp lên cùng 1 dòng, nơi cấp app tự tính và ghi vào không phụ thuộc số liệu, em nhớ công thức chứ, viết đủ ra luôn không viết tắt".
- **Nơi cấp** (`gdxNoiCap`): tự tính theo **ngày cấp**, không lấy số liệu — cùng công thức đã có ở hồ sơ (`hsoNoiCapGY`): cấp từ 01/07/2024 → **Bộ Công an**; trước đó → **Cục Cảnh sát quản lý hành chính về trật tự xã hội** (viết đủ). Gõ tay ô Nơi cấp thì theo anh gõ. Đã đo trên mẫu in: dòng Nơi cấp viết đủ vẫn vừa (A5 và A4). Mini app cùng cách.
- **Form:** Họ tên · CCCD · Ngày cấp cùng 1 dòng (lưới 12 cột); Địa chỉ 1 dòng; Nơi cấp · Tài khoản số 1 dòng.
- **Nút xem trước** ghi rõ trạng thái **👁 Xem: Bật / Tắt** (3.181 ghi "Xem" / "Tắt xem" dễ hiểu ngược).
- **Phép thử:** `t167` 55/55 (thêm: công thức nơi cấp, gõ ngày cấp → nơi cấp tự điền, 3 ô cùng dòng + nút Xem) · `t168` 32/32 · `t165` 52/52.

## 3.182 — 13/10/2026 — Giấy lĩnh: lề trên, gạch dọc, ngày lĩnh gọn, vừa 1 màn hình
- **Anh (13/10):** "mẫu in ra hơi sát đầu trang, canh lề trên thêm 5 mm, hai gạch dọc chỗ người lĩnh tiền ngắn lại 5 mm, ô nhập số tiền nổi bật hơn, dòng ngày lĩnh còn chiếm chỗ, bỏ ngày theo điểm giao dịch xã, chỉ hôm nay và nhập ngày và để trống (chấm chấm), nút làm trống để lên trên kế nút xem, như vậy sẽ vừa 1 ô màn hình chuẩn".
- **Mẫu in** (`GL_CSS`): `.gl-trang` lề trên 8 → **13 mm**; chữ chìm dời theo (top 37,4 → 42,4 mm, giữ đúng vị trí so với form); `.gl-ky-l` (2 gạch dọc ô Người lĩnh tiền) `margin-bottom:5mm` → ngắn 5 mm. Mini app dùng chung mẫu nên tự theo.
- **Ngày lĩnh** (`gdxGLNgay`, `gdxGLMuc('glngay')`): bỏ "Ngày GD điểm"; chỉ **Hôm nay** (mặc định) · ô nhập ngày · **Để chấm**, gọn 1 dòng. Khai báo cũ `glNgayCach='gd'` chuyển sang Hôm nay. Mini app cùng cách.
- **Ô số tiền** nổi bật (`.gdx-tien-to`: chữ to đậm, viền xanh, nền vàng nhạt).
- **✕ Làm trống** lên đầu khung, kế 👁 Xem (in xong → nút tô vàng = Làm trống — in người khác); bỏ nút trùng trong khung phiếu và Tóm tắt.
- **Phép thử:** `t167` 52/52 (thêm: ngày lĩnh 3 lựa chọn 1 dòng + ô tiền nổi bật; CSS lề 13 mm, chữ chìm 42,4 mm, gạch dọc ngắn 5 mm; nút Làm trống ở đầu khung) · `t168` 32/32 · `t165` 52/52.

## 3.181 — 13/10/2026 — Giao dịch xã: tối ưu vùng nhập
- **Anh (13/10, kèm ảnh):** "các nút quá nhiều che hết khung nhập, cơ cấu lại, khối lọc gom gọn khi nhập luôn, nhấp vào sổ ra, chọn vùng nhập thu lại, nói chung tối ưu vùng nhập"; "nhiều hàng nút quá nên chiếm chỗ".
- **Khối lọc** (`pvVeCay`, lớp `.loc-khoi.gon`, chỉ tab Giao dịch xã): đã chọn **Điểm GD hoặc Tổ** (3.180 chỉ xét điểm — ảnh anh chọn Xã › Hội › Tổ nên chưa gọn) → còn 1 dòng 📍 đường dẫn + **▾ Đổi** + 🔎; bấm ▾ Đổi sổ ra đủ Xã · Điểm · Hội · Tổ; chọn xong hoặc **bấm vào vùng nhập** (`gdxGonLoc`, chỉ đổi lớp — không vẽ lại ô đang bấm) → gọn lại.
- **Đầu khung 1 hàng** (`gdxDauHTML`, `gdxMenu`): chip 04/TD · 12/GDX · Giấy lĩnh · 👁 Xem · **⋯** (⚙ Khai báo riêng mẫu, ⚙ Khai báo chung, 📜 Nhật ký in, 📦 Mini app). Bỏ hàng tiêu đề mẫu (trùng chip) và nhãn nhóm Giải ngân / Biên lai / Tiết kiệm (còn trong chú thích chip).
- **Tóm tắt:** 📄 Mẫu trắng gom 1 nút (sổ lên: 1 mẫu / A4 · 2 mẫu / A4); nút sau in rút gọn "✕ Làm trống" (chú thích: in người khác).
- **Phép thử:** `t168` 32/32 (thêm: chọn Xã › Hội › Tổ không chọn điểm → gọn; bấm vùng nhập → gọn; đầu khung 1 hàng + menu ⋯) · `t167` 50/50 · `t165` 52/52.

## 3.180 — 13/10/2026 — TK 104 tra chắc hơn; Tóm tắt 1 dòng; khối lọc thu gọn
- **Anh (13/10):** "không có tổ nào hiện 104 hết"; "chỗ tóm tắt thu gọn 1 dòng chừa chỗ nhập rộng ra"; "chọn điểm rồi thì thu gọn xã, điểm lại luôn cho rộng nhất".
- **TK 104** (`dmtTimTo`, `dmtViSao`): trên dữ liệu giả đường tra theo mã tổ vẫn đúng → chưa rõ nguyên nhân trên máy anh (chưa xem được dữ liệu thật). Nay tra 3 bước: ① đúng mã tổ · ② mã bỏ khoảng trắng / số 0 đầu · ③ tổ trưởng trùng tên (không dấu, bỏ Ông / Bà) cùng xã, chỉ 1 tổ có TK 104 (ghi rõ "theo tên tổ trưởng, mã tổ danh mục …"). Không thấy → dòng TK 104 và Tóm tắt **ghi lý do**: máy / trình duyệt này chưa có danh mục · mã tổ … không có trong danh mục (kèm 2 mã mẫu của danh mục) · danh mục có tổ nhưng ô TK 104 trống. Mini app tra cùng cách.
- **📋 Tóm tắt 1 dòng** (`gdxTomHTML`, CSS `.gdx2-tom`): 📋 · chip cuộn ngang · cảnh báo đầu tiên (+n, rê chuột xem hết, bấm → tới mục) · nút in gọn (📄 Trắng 1/A4 · 📄 2/A4 · PDF · 🖨 IN). Điện thoại vẫn xuống dòng.
- **Khối lọc thu gọn** (`pvVeCay`, cờ `PV_DUNG.gdx.gonDiem` — chỉ tab Giao dịch xã): đã chọn Điểm GD → ẩn hàng chip Xã và Điểm GD, còn dòng 📍 đường dẫn + nút **▾ Đổi xã / điểm** (mở lại; chọn xong tự gọn). Tab khác không đổi.
- **Phép thử:** `t168` thêm 4 phép (31/31) · `t167` 50/50 · `t165` 52/52.

## 3.179 — 13/10/2026 — Giấy lĩnh mặc định TK 104
- **Anh (13/10):** nạp danh mục rồi nhưng Giấy lĩnh chưa hiện TK 104; chốt "mặc định 104".
- **Nguyên nhân (thử bằng dữ liệu giả):** ① Giấy lĩnh mặc định "TK 105 khách" → chọn tổ trưởng thì lấy TK 105 của tổ trưởng (không có thì trống), không lấy TK 104; ② bấm ✕ Làm trống rồi chọn lại đúng tổ cũ ở khối LỌC ĐỊA BÀN → các ô vẫn trống.
- **Sửa:** `GDX_MD.glLoai = '104'`; máy đang dùng chuyển 1 lần sang 104 (cờ `glLoai104` trong `gdxC`), sau đó giữ lựa chọn của anh. Nút loại TK xếp **TK 104 tổ trưởng** trước. `gdxGLLamTrong` quên tổ đang điền → chọn lại tổ cũ thì điền lại theo số liệu. Mini app: mặc định TK 104, bản mini đã lưu 105 chuyển 1 lần.
- **Phép thử:** `t167` thêm 2 phép (mặc định 104; Làm trống → chọn lại tổ cũ điền lại TK 104) — 50/50; `t168` 27/27; `t165` 52/52.

## 3.178 — 13/10/2026 — Mini app gói CCCD tổ trưởng; tìm Giấy lĩnh gọn theo xã / điểm
- **Anh (13/10):** "Vẫn gói" (CCCD tổ trưởng vào mini app); "trong chức năng tìm khi anh chọn xã, điểm thì em giới hạn tìm cho gọn".
- **Mini app** (`gdxMiniGoi`): gói thêm số CCCD, ngày cấp, nơi cấp tổ trưởng (`hsoKhach` theo mã KH tổ trưởng) — xáo mã như số liệu khác; hộp xuất ghi số CCCD được gói. Chọn tổ trưởng TK 104 → điền tên, CCCD, ngày cấp, nơi cấp, TK 104, địa chỉ; con trỏ nhảy xuống ô số tiền.
- **Tìm Giấy lĩnh — app** (`gdxGLTim`): khối LỌC ĐỊA BÀN đã chọn Điểm GD → chỉ tìm trong điểm đó; chỉ chọn Xã → trong xã đó. Đầu danh sách ghi "Đang tìm trong …" + liên kết **Tìm cả PGD** (`GDX.glTatCa`); chọn xong người thì trở về tìm theo phạm vi.
- **Tìm — mini:** chip **Điểm này · Cả xã · Cả PGD** (mặc định Điểm này, nhớ trên máy); không thấy thì gợi ý "tìm cả PGD".
- **Phép thử:** `t168` thêm 5 phép (27/27); `t167` phép tìm tổ trưởng ở điểm khác bật Tìm cả PGD.

## 3.177 — 13/10/2026 — 📦 Mini app Giao dịch xã (1 file HTML, có thời hạn)
- **Anh (13/10):** tách Giao dịch xã thành app đơn giản gửi đồng nghiệp: in mẫu theo điểm GD, TK 104 tổ trưởng gói sẵn, TK 105 gõ tay; "chỉ cần gói 104 thôi"; lúc xuất chọn 30-60-90 ngày, hết hạn khóa hết, bảo mật tối đa, không cần mật khẩu; "em code đi và gộp lên luôn".
- **Xuất** (`js/27-mini-gdx.js`: `gdxMiniHop`, `gdxMiniGoi`, `gdxMiniHTML`, `gdxMiniXuat`): nút **📦 Mini app** ở tab 🏢 Giao dịch xã → chọn hạn → tải `GiaoDichXa_mini_han-ddmmyyyy.html` (~70 KB, chạy offline, không CDN). Gói: điểm GD (tên, mã, xã, ngày GD), tổ (tên tổ trưởng, ấp, địa chỉ, TK 104 theo danh mục / file TK 104), danh sách cán bộ, khai báo mẫu. **Không** gói khách TK 105.
- **Mẫu in dùng chung 1 nguồn:** hàm mẫu của app (`gdxHTML04`, `gdxHTML12`, `gdxGLTrang`, `GL_CSS`, `GDX_CSS`, `gdxDocTien`…) chép vào file lúc xuất (`Function.toString`) → sửa mẫu ở app thì bản mini xuất sau tự theo.
- **Bảo vệ:** số liệu xáo mã (khóa ngẫu nhiên từng bản + hạn + mã bản), mở Notepad không đọc được; sửa ngày hạn trong file → không giải được → khóa. Hết hạn → khóa hết, ghi nhớ đã hết hạn (chỉnh giờ lại vẫn khóa); lùi giờ máy về trước lần mở trước → khóa. Còn ≤ 7 ngày → dòng hạn tô vàng, nhắc liên hệ anh Nhân. Không mật khẩu nên đây là che, không phải mã hóa tuyệt đối (người rành kỹ thuật vẫn gỡ được) — chỉ gửi người trong đơn vị.
- **Mini** (`gdxMiniApp`, chỉ chạy trong file mini): chọn điểm GD theo xã (⏱ Gần nhất); 04/TD (số hộ / số tiền ▲▼ bước 5 triệu, chip mức tiền, ⭐ mẫu hay in, nơi phát, ngày phát = ngày GD gần nhất, ngày ký, người lập, GĐ / PGĐ, 1 / 2 bản); 12/GDX (ngày GD, GDV / KSV / TT loại trừ nhau, số dòng, in sẵn tên tổ trưởng, giờ / ngày tiêu hủy); Giấy lĩnh (TK 105 gõ tay; TK 104 gõ tên không dấu ↑↓ Enter hoặc chọn tổ của điểm → điền tên, TK 104, địa chỉ; ▲▼ 100 nghìn; chữ chìm 4 mức; A5 / nửa A4; mẫu trắng 1 · 2 / A4; Làm trống). Lựa chọn lưu trên máy dùng (localStorage).
- **Phép thử** `tests/t168.js` (22 phép, dữ liệu giả `gianho31` + TK 104 giả).

## 3.176 — 13/10/2026 — Giấy lĩnh: chữ chìm 4 mức, 3 ô, khung nhập gọn
- **Anh (13/10):** chữ chìm nhạt khi in kèm chữ điền, dời trái / lên 1 cm, có tắt và chọn đậm nhạt; 3 ô bên phải cao hơn, đáy ô Số tiền ngang dòng Nội dung, dòng chấm cách cạnh ô 1–1,5 mm; form nhập quá dài → gọn trong 1 khung; tìm tên dùng ↑↓ chọn; số tiền bước 100 nghìn; in xong có nút làm trống; nút in mẫu trắng giữ chỗ cũ; "em code và gộp lên luôn".
- **Mẫu in** (`gdxGLTrang`, `GL_CSS`): chữ chìm `left:32.4mm; top:37.4mm`, mức `chim-nhat / vua / dam` (màu #e6e6e6 / #d2d2d2 / #bcbcbc) hoặc tắt (`C.glChim`, mặc định Nhạt; phiếu trắng in Vừa, Tắt thì tắt); dòng Nội dung chuyển vào cột trái → khung phải (2 ô trên + ô Số tiền) kéo hết chiều cao, đáy ô Số tiền ngang dòng Nội dung; dòng chấm trong ô cách cạnh 1,2 mm.
- **Khung "Người lĩnh · số tiền"** (`gdxGLPhieuHTML`, thay 3 mục glloai / glnguoi / gltien): loại TK + ô tìm (↑↓ chọn, Enter, Esc — `gdxGLPhim`) + khách trong tổ (ô sổ xuống, có số dư 105) / dòng TK 104 tổ trưởng + form 6 cột như mẫu thật + số tiền ▲▼ / phím ↑↓ bước 100 nghìn (`gdxGLBuoc`) + Rút hết + chip + bằng chữ + ✕ Làm trống / ↺ Theo số liệu. Mục mới "Chữ chìm VBSP" ở khung chọn nhanh.
- **In xong** (Giấy lĩnh) → nút "✕ Làm trống — in người khác" (`gdxGLMoi`): bỏ người lĩnh, tổ, form, số tiền; giữ ngày, khổ, loại TK; con trỏ về ô tìm.
- Gồm 3.175.1 (so tên tổ trưởng bỏ Ông / Bà, không dấu). Phép thử `t167` 48 mục, `t165` 52 mục.

## 3.175.1 — 13/10/2026 — Danh mục tổ: hết báo lệch tên tổ trưởng giả
- **Anh (13/10, gửi ảnh):** 7 tổ báo "tên tổ trưởng lệch" chỉ do danh mục ghi "ÔNG / BÀ" + không dấu, hoa (vd "ÔNG TRAN MINH SON" ↔ "Trần Minh Sơn").
- `dmtTenSo`: bỏ tiền tố Ông / Bà (như cách app chuẩn tên tổ trưởng từ 3.108), bỏ dấu, không phân biệt hoa thường rồi mới so. Tổ có trong Mẫu 31 mà danh mục không có vẫn báo như cũ (lệch thật).
- Phép thử `t167` thêm ca "ÔNG / BÀ + không dấu".

## 3.175 — 12/10/2026 — Giao dịch xã: góp ý sau 3.174 + Giấy lĩnh sau in thử + nạp TK 104 một chỗ
- **Anh (12/10):** góp ý 12/GDX, 04/TD, lỗi mở cài đặt, gõ ngày nhanh; Giấy lĩnh sau in thử (bằng chữ bị cắt, dòng PGD, dòng Nội dung xa, VBSP chìm, form gõ tay, chữ 13–14 pt); TK 104 nạp 1 chỗ ở chỗ nạp & kiểm tra dữ liệu, kiểm tra khi nạp, gắn vào tổ; nút in mẫu trắng 1 mẫu / A4 hoặc 2 mẫu / A4 cắt đôi; "em code và gộp lên luôn".
- **Lỗi bấm chip ⭐ / Hôm nay / ô ngày mở hộp ⚙:** hộp đã đóng vẫn còn trong trang → `gdxVe` tưởng đang mở và vẽ lại. Sửa: `gdxHopMo(id)` chỉ vẽ lại khi hộp đang hiện (cả ⚙ Khai báo chung).
- **Ô ngày gõ nhanh** (`gdxDocNgay`, `gdxNgayChon`): mọi ô ngày tab Giao dịch xã gõ liền số — "1410" = 14/10 năm nay, "141026" / "14102026" / "14/10/26" = 14/10/2026; ngày sai không nhận (báo); vẫn có 📅 chọn trên lịch.
- **12/GDX:** ngày GD chỉ 1 chip ngày GD kế gần nhất + ô ngày; ô ký GDV: "(Ký, ghi rõ họ tên)" sát tiêu đề, khoảng ký cột GDV dài thêm 20 px → 3 tên vẫn cùng hàng (10–45 dòng vẫn trọn 1 trang); giá trị điểm GD, mã điểm, xã, tên GDV in đậm (nhãn chữ thường).
- **04/TD:** ▲▼ (và phím ↑ ↓) số hộ bước 1, số tiền bước 5 triệu (số lẻ → bước kế tiếp); mức tiền gợi ý 25 · 30 · 40 · 50 · 80 · 100 · 120 · 160 triệu (máy còn bộ cũ chưa sửa tự đổi, đã sửa thì giữ).
- **💵 Giấy lĩnh** (`gdxGLTrang`, `GL_JS`, `GL_CSS`): bằng chữ dài → đo trên trang, phần thừa xuống dòng dưới (bỏ chấm), vừa 1 dòng → dòng dưới giữ chấm (tối đa 2 dòng); dòng PGD có chữ → dòng thứ 3 giãn đều, trống → giữ khoảng ghi tay; Nội dung canh đều các dòng trên (khung phải gọn lại) → chỗ ký rộng hơn; chữ VBSP chìm (giấy trắng); chữ 13 pt; cột chữ ký giãn lại. Form gõ tay (`GL_O`, `GDX.glSua`) ngay dưới ô tìm, bố trí như mẫu thật — tìm ra thì điền sẵn, sửa / gõ thẳng được, chỉ cho lần in đó (không ghi đè số liệu; nhật ký in lưu bản đã sửa); ✕ Làm trống form / ↺ Theo số liệu. In mẫu trắng (`gdxGLTrangIn`): 1 mẫu / A4 (nửa trên) hoặc 2 mẫu / A4 (mỗi nửa 148,5 mm, vạch cắt mờ).
- **📚 Danh mục tổ · TK 104 nạp 1 chỗ:** bỏ nút nạp trong ⚙ Khai báo chung của tab Giao dịch xã; 📥 Nạp & KT: nút 📥 Nạp file chung tự nhận file danh mục (sheet tổ có Mã tổ + Số TK 104, sheet điểm GD) / file TK 104 (SOTK + MAKH) → lưu + kiểm tra ngay (`dmtKiem`: so Mẫu 31 — khớp, chỉ trong file, chỉ trong Mẫu 31, tên tổ trưởng lệch, thiếu TK 104, TK 104 trùng, TK 104 không còn là tổ trưởng); khối 📚 Danh mục tổ ở tab (nạp, kiểm tra lại, danh sách TK 104 không còn là tổ trưởng, xóa). Lưu `D.cauHinh.dmTo` / `dmTK104` (Drive của anh), tra theo mã tổ `dmtToCua`; dữ liệu 3.174 (`gdxTC` / `gdxTK104`) tự chuyển. TK 104 chưa hiện ở chỗ khác (anh chốt).
- Phép thử: `t165` 52 mục (thêm ▲▼, mức tiền, ngày gõ nhanh, lỗi mở ⚙, 12/GDX in đậm / ô ký / 1 chip ngày); `t167` 40 mục (nạp danh mục qua nút Nạp file chung, khối Nạp & KT, chuyển dữ liệu 3.174, bằng chữ 2 dòng, VBSP, 13 pt, form gõ tay, mẫu trắng 1 / 2 mẫu A4).

## 3.174 — 12/10/2026 — Tab Giao dịch xã: bố cục mới, Giấy lĩnh tiền mặt, tham chiếu TK 104, nhật ký in
- **Anh (12/10):** "em gom tất cả làm 1 lần, còn tính KHĐ có thể làm sau" · "Giao dịch viên ko xuống 2 hàng, vẫn như cũ" · Giấy lĩnh: ô tìm tên tổ trưởng gõ không dấu hoặc chọn, mở mẫu chọn ngày điểm GD, dòng có thông tin bỏ chấm (trống giữ chấm), nội dung "Rút tiền" · "em code đi".
- **Bố cục** (`js/26-giao-dich-xa.js`, demo v3 anh chốt — `docs/KE_HOACH_HO_SO_TO.md` mục E): khối LỌC ĐỊA BÀN của app (`PV_DUNG.gdx`, cây theo Mẫu 31 kỳ chung; chưa có số liệu → Cài đặt › Địa bàn), mẫu khai cấp (`GDX_MAU[].cap`: 04/TD, 12/GDX = điểm → ẩn Hội / Tổ; Giấy lĩnh = tổ). Mục mẫu `GDX_MUC` theo thứ tự trên mẫu; ⚙ Khai báo riêng có ô "Chọn nhanh" từng mục (`C.nhanh`); 📋 Tóm tắt bản in (`gdxTom`: chip bấm tới mục, cảnh báo vàng / đỏ, hỏi 1 lần rồi in); khung xem ~40 % bật / tắt (`C.xem`). In qua khung ẩn `#gdx-in-tam`; PDF qua `inPDF`.
- **Thay "Kiểm tra trước đợt"** (3.172): mở tab / mẫu tự chọn điểm có ngày GD gần nhất (`gdxChonDiemGan`); ngày phát mặc định tính lại mỗi lần (ngày GD gần nhất của điểm; tại PGD = ngày mai), chọn tay + ↺ Mặc định (`ngayPhatTay`); ngày ký Hôm nay / chọn ngày (`ky04Hom`). Cảnh báo đợt chuyển vào Tóm tắt.
- **04/TD:** đường kẻ dưới tên cơ quan / tiêu ngữ xích gần chữ (khe 7,75 → 3,75 px và 4 → 2,5 px, không chạm — đo trên ảnh); PGĐ ký "KT. GIÁM ĐỐC / PHÓ GIÁM ĐỐC" (`kyPGD`, `chucPGD` — anh xem lại thể thức); 1 / 2 bản (`soBan`). Ngoài đường kẻ, so ảnh với bản 3.173: trùng khít.
- **12/GDX:** kẻ dưới tên cơ quan dài 55 %, sát lên; nhãn Điểm / Mã điểm / Xã không in đậm, mã điểm đứng gần; dòng Giao dịch viên giãn thêm; ô ký: GIAO DỊCH VIÊN giữ 1 dòng, 3 tiêu đề cao bằng nhau → 3 tên cùng hàng; trên 15 dòng giữ chỗ ký 52 px, trên 20 dòng chiều cao dòng tính theo chỗ còn lại → 10–45 dòng đều trọn 1 trang A4 (trước 28+ dòng tràn 2 trang); giờ tiêu hủy (chấm / ghi sẵn giờ khai báo) và ngày tiêu hủy (chấm / = ngày GD) tách 2 lựa chọn (`m12GioHuy`, `m12NgayHuy`; khai báo cũ `m12TimeMode:'prefill'` tự chuyển); 3 ô GDV · KSV · TT tổ GD cạnh nhau, người đã chọn ở 1 vai không còn ở 2 vai kia.
- **💵 Giấy lĩnh tiền mặt** (`gdxHTMLGL`, `GL_CSS`): giấy trắng dựng theo ảnh mẫu anh gửi; khách rút TK 105 (tổ viên theo Mẫu 31: tên, số TK 105, số dư, CCCD, ngày / nơi cấp, địa chỉ) hoặc tổ trưởng rút TK 104 (số TK từ danh mục tham chiếu / file TK 104); ô tìm gõ tên không dấu (tổ trưởng + khách) → nhảy cây lọc tới tổ; ngày lĩnh mặc định = ngày GD của điểm (Hôm nay / chọn ngày / chấm); số tiền + chip + Rút hết số dư (105), cảnh báo vượt số dư; dòng có thông tin bỏ chấm, trống giữ chấm; A5 ngang / A4 dọc nửa trên. Chưa làm: in đè giấy in sẵn (chờ bản scan thẳng).
- **Danh mục tham chiếu + TK 104** (`gdxDocFile`, `gdxNapFile`): 1 nút nạp tự nhận file danh mục (sheet tổ có Mã tổ + Số TK 104, sheet điểm GD) hoặc file TK 104 hệ thống (SOTK, MAKH…); xem trước (so Mẫu 31: khớp / chỉ trong file / chỉ trong Mẫu 31) rồi lưu `D.cauHinh.gdxTC` / `gdxTK104` (cài đặt — Drive của anh, không vào mã nguồn). Cây vẫn theo Mẫu 31; tham chiếu chỉ bù mã điểm / ngày GD / TK 104. `gdxTK104Lech`: TK 104 chưa đóng của người không còn là tổ trưởng — xét đủ tham chiếu + Mẫu 31 (DSTO / Thông tin tổ trưởng / trùng tên) để không báo nhầm; bảng + Xuất Excel.
- **📜 Nhật ký in** (`gdxNKThem` / `gdxNKMo`): mỗi lần in lưu bản chụp lựa chọn + dữ liệu (`gdxChup`, không lưu PDF) ở máy này (`localStorage` khóa `tuhoso_gdx_nhatky`), tự xóa sau 30 ngày; 🖨 In lại / 📄 PDF đúng bản cũ.
- `docs/QUY_TAC_SOAN_MAU.md`: khuôn để người / AI khác soạn mẫu mới.
- Phép thử: `tests/t165.js` viết lại theo bố cục mới (43 mục, chưa có số liệu); `tests/t167.js` mới (29 mục, bộ `gianho31` + tham chiếu / TK 104 giả dựng trong phép thử). KHĐ (khoanh, HSSV ân hạn 12 + 3) để sau (anh chốt).

## 3.173 — 12/10/2026 — KHĐ tự tính theo đúng luật hệ thống
- **Anh (12/10):** "em code theo phương án em cho là tốt nhất trước" — từ phân tích câu truy vấn hệ thống số 14 (Sao kê món vay N tháng không hoạt động).
- `slKHDLy(o, ky)` trả lý do món không vào KHĐ ('' = vào): `dong` (CLOSE) · `gd` (MONTHS_BETWEEN(ngày BC, ngày GD gần nhất / ngày GN đầu) ≤ 3) · `du` (dư nợ TH + QH = 0) · `khoanh` (có khoanh VÀ gia hạn trong tháng — đúng câu hệ thống `khoanh = 0 OR gia hạn tháng = 0`) · `hssv` (CT 02) · `anhan` (CT 05/07/18 chưa qua 60+3 tháng từ ngày GN đầu; CT 01 sản phẩm 011SC2/MC2/LC2 24+3; CT 06 6+3) · `ls0` (lãi suất 0; file không có cột thì không xét). `slThangGiua` / `slCongThang` = MONTHS_BETWEEN / ADD_MONTHS kiểu Oracle. Ngày BC: kỳ tháng → cuối tháng, kỳ ngày → ngày đó.
- Cột Mẫu 31 dùng thêm (app đã giữ sẵn khi nạp, không phải nạp lại): `c_ma_san_pham_cu_the`, `c_gia_han_trong_thang`; `ngn` (ngày GN đầu), `ls`, `th`, `ttMon`.
- `slKHDTinh` dùng `slKHDLy`; bỏ luật cũ (ngày GD < cuối tháng kỳ − 3, bỏ mọi món khoanh, bỏ món vay sau mốc). Kiểm tra số liệu mục 3: bảng lệch tự tính ↔ file có cột "Lệch" (lý do), bảng mới "món quá 3 tháng bị loại theo luật".
- Phép thử `tests/t166.js` (18 mục); `t141` sửa ca F (món chưa GD → theo ngày GN đầu).

## 3.172 — 11/10/2026 — Tab 🏢 Giao dịch xã (04/TD + 12/GDX in nhanh)
- **Anh (11/10):** gửi file HTML in 04/TD + 12/GDX đã in thử đúng mẫu thật — "em đừng làm thay đổi"; tab riêng, thuần túy in nhanh, không phụ thuộc số liệu hộ vay; giữ mọi khai báo / tùy chọn; bỏ in hàng loạt → mẫu hay in; kiểm tra trước đợt + ngày GD gần nhất (cả ngày nghỉ); nơi giải ngân tại PGD; không viết tắt. Quyết định ghi `docs/KE_HOACH_HO_SO_TO.md` mục 3.172.
- File mới `js/26-giao-dich-xa.js` (tiền tố `gdx`): `gdxHTML04` / `gdxHTML12` + `GDX_CSS` chuyển **tự động** từ file gốc (template → nối chuỗi ES5, CSS nguyên văn) — xem / in trong iframe `#gdx-khung` (CSS app không chạm mẫu). Zoom khung xem dùng `zoom`, khi in luôn 100%. So ảnh in file gốc ↔ app: 6 trường hợp (04 thường / GQVL, 12/GDX 10–36 dòng) trùng 100% điểm ảnh (làm ở máy làm việc — file gốc có dữ liệu thật, không vào repo).
- Khai báo `D.cauHinh.gdx` (đồng bộ Drive cùng cài đặt; khóa giữ tên của file gốc: donViTren, kinhGui, tenUBNDVietTat, quickAmounts, danhSachCanBo, m12*…) + mới: `mauHay [{h,t}]`, `noiGN` (diem | pgd), `ma04`, `xa04`, `ngayPhatISO`, `gioDiem` / `gioPGD`, `diaDiemPGD`, `dotXN`, `m12DonVi1/2`.
- Điểm / tổ: `gdxDsDiem()` đọc `D.cauHinh.diaBan` (tổ dạng `{ma, ten}` hoặc chuỗi "mã | tên"); `gdxNgayToi(ngay, k)` k ngày GD tới (không dời ngày nghỉ, ngày 31 → cuối tháng); `gdxDiemGanNhat()`.
- Hồ sơ vay: bỏ `hsoLap04td`, `hsoDiemXa`, `hsoNgayGDToi`, khai báo giờ / phút 04/TD (`HSO_PGD_O`). Số liệu: tab con `gdx` (vẽ trước khi mở số liệu), thanh bên mục 🏢 Giao dịch xã. Phép thử `tests/t165.js` (30 mục); t140 / t143 / t163 / t164 cập nhật.

## 3.171 — 11/10/2026 — Bộ hồ sơ vay · mẫu bám sát PDF
- **Anh (11/10):** "em code đi về mẫu bám sát các mẫu PDF ko dc làm sai lệch" — quyết định ghi ở `docs/KE_HOACH_HO_SO_TO.md` (mục 1–9).
- Bộ hồ sơ vay `D.cauHinh.hsoBo` (đồng bộ cùng cài đặt): chương trình HSSV (mục đích cố định, 40 triệu / năm học) / NSVSMT (xây mới / sửa chữa, 1–2 công trình, tối đa 25 triệu / công trình — cảnh báo, 60 tháng, kỳ hạn 12 tháng); ngày đến hạn / hạn trả cuối để trống; hộ mới: CCCD tự suy giới tính, năm sinh, nơi cấp (từ 01/07/2024 = Bộ Công an); người thừa kế chỉ ở 01/UQ; `hsoBoTrenM31` dò CCCD trên Mẫu 31.
- Mẫu mới / làm lại theo PDF: `hsoLap01uq`, `hsoLap01td` (HSSV có xác nhận UBND xã, NSVSMT không), `hsoLap03td`, `hsoLap04td` (chọn 1 lần cho đợt: ngày lập, giờ, phút, ngày phát; nhập số hộ, số tiền; in từng điểm GD), `hsoLap09a`, `hsoLap01tgtv` (khung ngoài chia trang được — `hsoKhungNgoai`; hàng loạt cho hộ mới).
- Tiêu ngữ `hsoQH`: nét kẻ 0.5pt riêng (`p.ke`), dài bằng chữ. Logo `hsoKB.logo` + `logoMau` (không đưa logo vào repo).
- Bộ in chuẩn `trDan`: đơn vị `.kt-to` có `data-tr-ngang`, `data-tr-mg`, `data-tr-so`, `data-tr-chan` (chân trang trái | phải + Trang x / N). 10C / 02/BG: `thead` lặp, `tbody.kt-ho` không tách khách.
- Word `hsoDocx`: nhiều section (khổ ngang / dọc riêng từng mẫu), ảnh logo, chân trang, `tblHeader`, khung `ngoai` / `cham`, ô nền.
- Phép thử `tests/t164.js` (26 mục, dữ liệu giả); `tests/t163.js` cập nhật.

## 3.170 — 11/10/2026 — Tab 📝 Hồ sơ Tổ · 📄 Hồ sơ vay
- **Anh (11/10):** "code cả 2 tab và gộp lên" — theo `docs/KE_HOACH_HO_SO_TO.md` (căn cứ số liệu điền tự động hết mức; thiếu thì chấm ghi tay; quy tắc thời hạn / kỳ hạn / mức vay chưa đặt, bàn riêng từng mẫu).
- File mới `js/25-ho-so.js` (tiền tố `hso`, tránh trùng `hs*` của công cụ HSSV). 2 tab con Số liệu `hst` / `hsv` (thanh tab con + thanh bên nhóm Hồ sơ); dùng chung khối LỌC ĐỊA BÀN (`PV_DUNG.hst/hsv`), kỳ chung, `toNap` / `toTV` / `toBDNap` của tab Tổ.
- Hồ sơ Tổ: 10C cũ / mới (tự theo ngày họp, đổi tay được; tích kết nạp — mới vào tích sẵn, cho ra — ra khỏi tổ + tất nợ 105 = 0 tích sẵn; tổng trước / sau họp), 10A (danh sách tổ viên 2 cột, quy ước nguyên văn), 10B (bầu thay — gợi ý so tổ trưởng / tổ phó Mẫu 31 tháng trước), 11/TD (Bên A khai báo, CCCD tổ trưởng khi khớp mã KH DSTO / trùng tên duy nhất), 01/BG, 02/BG (dòng khách + dòng món, nợ gốc / lãi / 105, tổng, QH / khoanh).
- Hồ sơ vay: 01/TD, 03/TD (A4 ngang), 04/TD (UBND xã, điểm GD, ngày GD kế tiếp), 09A/TD (món còn dư nợ, ngày đến hạn HĐ / gia hạn, gốc, lãi).
- ⚙ Khai báo 1 lần `D.cauHinh.hsoKB` (PGD, trưởng ấp theo xã|ấp, tổ phó theo mã tổ, mục đích vay); người Hội lấy theo 🏛 Khai báo Hội đoàn thể (`ktNguoi`, vai trò chọn ở tùy chọn, nhớ `hsoO.hoiVT`).
- Word: `hsoDocx` đổi HTML mẫu → WordprocessingML (đoạn, bảng gộp ô ngang / dọc, khổ / lề theo mẫu); `taoDocx(than, sect)` thêm tham số `sect` (cũ không đổi). `hsoChuSo` đọc số thành chữ.
- `thVuaKhung` / `thXemRong(id)` dùng chung cho khung xem `#hso-xem-khung`. Phép thử `tests/t163.js` (26 mục, dữ liệu giả).

## 3.169 — 11/10/2026 — Tab Tổ: "Báo cáo của tổ" lên đầu khung xem
- **Anh (11/10, ảnh chụp):** tab Tổ còn khuất dòng "Báo cáo của tổ" → đem lên đầu khung xem.
- `toVeThe` (đã chọn tổ): hàng `.to-bc.to-bc-dau` (Danh sách hộ vay · Nợ cần xử lý · TK 105 của tổ · Dự kiến chia tách tổ · 👁 Xem) đặt trên thẻ tóm tắt tổ, ngay dưới khối lọc.
- `slVua()`: sau khi đặt chiều cao bảng, còn phần nào dưới bảng làm trang dài hơn cửa sổ thì bớt chiều cao bảng tương ứng (không khuất dòng).

## 3.168 — 11/10/2026 — Tab Số liệu gọn trong 1 cửa sổ, lọc cố định
- **Anh (11/10):** tối ưu khoảng trống tab Tổng hợp, bản xem gọn trong 1 cửa sổ và cuộn trong ô; các cửa sổ khác cũng vậy — lọc cố định, dồn sát lên trên.
- `doiNgan`: lớp `body.ngan7` khi ở tab Số liệu. CSS (≥ 900px): `.than` bớt đệm trên; `#tr7 .pv-cay` `position:sticky` dưới thanh trên (`--dau-cao`); `.sk-thanh` thôi sticky (tránh chồng).
- `slVua()` (gọi sau `pvVeCay` và sau `toCotVua`, khi đổi cỡ cửa sổ): đo `--dau-cao` / `--loc-cao`; bảng `#tr7 .to-cuon-khung` cao = phần còn lại của cửa sổ (tính theo vị trí thật) → trang không cuộn dài, bảng cuộn trong khung; Tổng hợp `thVuaKhung()` cho khung xem `#th-xem-khung`.
- Tổng hợp: Nguồn vốn + Chương trình chung 1 dòng (`.th-loc-1`), cây lọc dưới; bớt khoảng cách danh sách / hàng nút; cột danh sách báo cáo đứng yên.
- **Phép thử:** t153 sửa theo bố cục mới (Chương trình cùng dòng Nguồn vốn).

## 3.167 — 11/10/2026 — Khối LỌC ĐỊA BÀN đồng bộ mọi tab
- **Anh chốt (duyệt trên bản mẫu tab Hồ sơ Tổ):** tên dòng lọc nổi bật, chữ to và đậm hơn chip con; mỗi cấp 1 màu; cả phần lọc là 1 khối rõ nét; Điểm GD và Hội tách riêng; áp đồng bộ mọi tab.
- `pvVeCay` (dùng chung Tổ / KTGS / Sao kê / Tổng hợp / Tra cứu): bọc hàng lọc trong `.loc-khoi` (khung 2px + nhãn "LỌC ĐỊA BÀN"), lớp cấp `cap-xa` / `cap-diem` / `cap-hoi` / `cap-to` trên dòng / nhóm; bỏ vạch `.pv-vach` giữa Điểm GD và Hội (2 thanh riêng, tự xuống dòng khi hẹp).
- CSS: token màu cấp `--c-xa/-diem/-hoi/-to` (+ nền nhạt, có bản nền tối); mỗi dòng 1 thanh nền thẻ, vạch màu cấp bên trái; `.pv-nhan` 14px đậm 800, nền nhạt + chữ màu cấp; chip đang chọn tô màu cấp.
- Ghi nhận (chưa làm): 2 mẫu HSSV anh gửi để sau này in tự động Hồ sơ vay — 01/TD Giấy đề nghị vay vốn kiêm phương án, 03/TD Danh sách tổ viên đề nghị vay (file có dữ liệu thật → chỉ ghi cấu trúc vào `docs/KE_HOACH_HO_SO_TO.md`).
- **Phép thử:** `tests/t162.js` (mới, 9). t145 (cây ≤ 135 px vì có khung), t156 (2 thanh thay vạch │) sửa theo quy tắc mới.

## 3.166 — 11/10/2026 — 📋 Chép n file trong thanh chọn nhiều + hộp chia sẻ Windows
- **Anh chốt (BAN_GIAO_3161.md §2.5):** nút "☑ Chọn chép" (`nutChepNhieu`) rơi từ 3.151 → gộp vào thanh chọn nhiều sẵn có (nút 🗑 Xóa ở thanh công cụ không đổi): `thanhBot` thêm `.bot-chep` "📋 Chép n file" (điện thoại "📤 Gửi n file") + "📋 Chép tiếp" cạnh "Xóa n file"; `capNhatBot` cập nhật số.
- `botChep()`: có cầu nối (máy tính) → `chepNhieu` như cũ (20 file / lần, file chưa lên Drive bỏ qua + báo); chưa cầu nối → `navigator.share({files})` (Windows 11 Chrome / Edge có nút Sao chép) + mẹo cài cầu nối; không có hộp chia sẻ → tải từng file. File chưa có trên máy (chưa tải từ Drive) → bỏ qua + báo. Áp dụng mọi tab có thanh chọn (Văn bản, Biểu mẫu, Scan, Chữ ký · CCCD…).
- Khung xem 1 file, máy tính: menu 📤 Gửi thêm "🪟 Hộp chia sẻ Windows (Sao chép)" (`guiChiaSeFile`) — không đổi nút Tải về sẵn có.
- **Phép thử:** `tests/t161.js` (mới, 6).

## 3.165 — 11/10/2026 — Kết quả kiểm tra theo cấu trúc ma trận
- **Anh chốt (BAN_GIAO_3161.md §2.4).** `slKTHTML(ky)`: sau đầu khung + bảng đối chiếu chéo, mục kiểm tra gom theo file (`slKTFile(x)` dò tên file trong mục bằng `SL_KT_KHOP`); thứ tự file = dòng ma trận (nhóm `SL_NHOM` Ⓑ Ⓐ Ⓓ Ⓚ, rồi `SL_LOAI`); mục không gắn file → dòng "Chung — đủ file, toàn vẹn từng file". Mỗi file `details.sl-kt-file#sl-kt-f-<loại>`: "✓ n · ⚠ n · ⓘ n" (mở sẵn khi có ⚠); mục so 2 file hiện ở file đứng trước, file kia "↗ xem ở …" (`slKTToi`).
- Chip lọc `D.cauHinh.slKtLoc` (lc = ⚠ + ⓘ mặc định khi có chênh / lưu ý · all · ok · lech · canh, nhớ); `slKTMo(1|0)` Mở hết / Gập hết; `slKTTim(q)` tìm mục (ẩn file không còn mục, tự mở file có mục khớp). `slDauO`: bấm ⚠ trên ô ma trận → `slKTToi(loại)` mở khung kết quả + đúng dòng file (nháy viền).
- Kết quả cũ (`SLM.kt`) đọc được nguyên; KTGS (`ktKTHTML`) giữ khối riêng Ⓚ bên dưới như 3.156. Chưa làm: cột theo ngày trong khung kết quả (kiểm tra hiện chạy theo tháng).
- **Phép thử:** `tests/t160.js` (mới, 10).

## 3.164 — 11/10/2026 — Tổng hợp: sửa lọc Nguồn vốn, chọn 1 báo cáo xem ngay, 3 nhóm + nhãn cấp
- **Anh chốt (BAN_GIAO_3161.md §2.1):** báo cáo chưa phân cấp đúng (luôn ra cả PGD); bố trí lại; mỗi lần 1 báo cáo; bỏ in nhiều báo cáo 1 lần.
- **Lỗi thật đã sửa:** `thBaoCao('nv')` chỉ lọc tới xã → thêm `trongN(o)` (xã theo tên + `pvLoc(S, tổ)` khi chọn Điểm GD / Hội / Tổ; Hội toàn PGD đúng). Dòng cộng "Cộng <phạm vi>" (nv, hoi/tg cấp dưới xã, tk) thay "Cộng xã" / "Cộng phạm vi".
- **Bố cục:** hàng lọc (Nguồn vốn · cây địa bàn · Chương trình) trên; dưới 2 cột: danh sách (`thDsHTML`, nhóm `TH_NHOM`, ◉ radio, nhãn cấp `b.cap`) │ khung xem `#th-xem-khung` + hàng xuất (In · PDF · Excel · Gửi · ⤢ Phóng to). `thChonBC(k)` nhớ `thCH().bcChon`; dữ liệu cũ tích nhiều → `thChon()` giữ cái đầu; lần đầu → báo cáo đầu tiên đủ file. Đổi phạm vi → `PV_DUNG.th.sau` → `thXemNgay()`.
- **Phạm vi sâu hơn biểu:** `TH_BC[].sau` (lựa chọn biểu không chia) + `toi`; `thSau(b, S)` → dòng mờ (`.th-mo2`, rê chuột ghi lý do) + dòng vàng đầu bảng "Biểu này chỉ chia tới … — đang hiện số cả xã… Xem “Lọc sâu”".
- `thXem()` (nhiều báo cáo 1 lần) giữ lại cho phép thử đối chiếu, giao diện không gọi. Cách viết số Tổng hợp giữ triệu đồng 2 số lẻ (`thTr(n, 2)`) — khớp quyết định 3.163.
- **Phép thử:** `tests/t159.js` (mới, 13).

## 3.163 — 11/10/2026 — Nạp & KT dải lịch + cột theo ngày · bảng tab Tổ tự vừa · chip báo số liệu · tiền 2 số lẻ
- **Anh chốt (BAN_GIAO_3161.md §2.0, 6 phần):** phần 6 chốt theo biểu TW BCDHTD 01.1 anh gửi (triệu đồng, 2 số lẻ, số chẵn vẫn ",00").
- **Nạp & KT** (`js/22-so-lieu.js`): `slDaiLich(ky)` dải 6 tháng (`.sl-dl` + `.sl-dl-dau dat|thieu|chua`, rê chuột = `slTTChu(ky).tit`), ‹ › (`SL_DAI`), ▾ chọn tháng, ⦿ `slGanNhat()`; mở tab → `SL_KY=''` = gần nhất. `slCotNap(ky, mt)`: [chốt tháng trước] + mỗi ngày có dữ liệu + [chốt tháng]; tq = chốt mọi tháng có số liệu. Ô ngày `slONgayO`, nhóm `slChipNgayO`. `slTongQuan()`, `slThuGon()` (1 nút ▾/▴, nhớ kiểu trước; bỏ "2 tháng"). `slMuiTen` so với bản liền trước cùng loại, ghi "so với dd/mm/yyyy". `slOMT` thêm ⚠ khi file tháng có ngày số liệu ≠ cuối tháng. Bỏ dòng `slNapTTHTML` (`.sl-tt-1`). Tên báo cáo `slTenNgan`, xuống 2 dòng. Màu nền tối chip ngày / ⊕ dùng biến CSS.
- **Tab Tổ — cột:** `toCotChe(c, kho)` = `tu|hien|an` (dữ liệu cũ true/false → hien/an; cột chính mặc định Luôn hiện, cột thêm Tự động); `toCotHop(kho)` hộp chọn 3 chế độ; nhớ `D.cauHinh.toCot` (bảng) / `toCotKH` (danh sách). Cột Tự động vẽ sẵn lớp `tu tc-<mã>` (ẩn), `toCotVua()` sau khi vẽ bật dần theo thứ tự cho tới khi bảng sắp tràn ngang hoặc tiêu đề cột khác phải xuống thêm dòng; kết quả `TO_TU_HIEN.bang|ds` (dùng cho In đầy đủ); vẽ lại khi đổi cỡ cửa sổ.
- **Bảng các tổ / PGD:** `TO_COT` / `TO_COT_PGD` xếp cột thêm cuối theo ưu tiên anh chốt; cột mới Nợ lãi `lt`, Món ĐH tháng sau `dhs`, Khách CCCD hết / sắp hết `cch`, Khách chưa có TK 105 `ctk` (tính trong `toSoTo`). Excel dựng từ `dsCot` (đủ mọi cột, số đồng).
- **Danh sách khách:** `toCotDS(pv, coXa, nc, mo)` danh mục cột + `toDsBangHTML` (thay bảng viết tay trong `toDsTVHTML` / `toDsPVHTML`); cột thêm Ngày vay gần nhất · Ngày đến hạn · Hạn CCCD · Ấp · Ngày sinh · Số món · QH / khoanh (`toTV` thêm `ns, ap, nvm, dhan, smon, qhkn`). "Lãi tồn" = cột Nợ lãi sẵn có. 🖨 In danh sách giữ nguyên (cột chính A4 ngang); 🖨 In đầy đủ `toInDuDS(pv)` = cột đang hiện, tự co chữ; Excel thêm cột (`toThemCotX`).
- **Tiền:** `soTr` / `soTrDau` luôn 2 số lẻ (bảng các tổ / PGD + bản in). Danh sách khách vẫn ghi đồng (như 3.161).
- **Chip báo số liệu:** `kyGhiHTML(K)` không còn dòng vàng — đặt chip `⚠ Dùng T8/2026` vào `SL_CHIP` (`slChipThem`, vẽ vào `.pv-chip-o` trước 📍 của cây địa bàn); bấm `slMoNapKy(kc)`. KTGS: BC0437 / BC0438 thành chip (⚠ cam khi thiếu / lệch kỳ, bấm → Nạp & KT); dòng nguồn kỳ ngày `slNguonHTML(B, true)` thành chip; ghi chú giải ngân Mẫu 31 ngày thành chip. Ô kỳ đầu trang `⚠` (`.ky-canh`) khi tháng chọn chưa có số liệu (cho tab).
- **Chip tổ:** `pvApNgan(ap)` (bỏ "Ấp"/"KP"/"Thôn" khi tên chữ; tên số giữ "ấp 1", "KP 2"); chip tổ thêm `<small class="pv-ap">`, rê chuột "Tổ … · Ấp … · mã … · n tổ viên"; ô "Chọn tổ ▾" ghi giống.
- **Phép thử:** `tests/t158.js` (mới, 22). Sửa theo giao diện mới: t102, t142, t146, t152, t157.

## 3.162 — 11/10/2026 — Tinh chỉnh lọc số liệu (anh chốt)
- **Anh chốt:** chọn xã rồi không có chỗ quay lại (phải ✕); dòng 📍 chỉ để báo đường dẫn; hàng Xã giữ nguyên, PGD / xã đang chọn tô xanh; Hội + Điểm 1 dòng; Tổ 1 dòng chip kèm danh sách sổ xuống; dòng chip đường dẫn để cùng hàng Xã cho gọn.
- **`pvVeCay`:** hàng 1 `.pv-hang1` = nhóm Xã (luôn hiện) + `.pv-dan` (📍 chip chỉ báo, không nút) + 🔎; hàng 2 `data-cap="diem-hoi"` = Điểm GD `│` Hội (luôn hiện); hàng 3 `data-cap="to"` = ≤ 30 chip tổ + `select.pv-to-ds` đủ danh sách. Bỏ số ① ② ③, bỏ ✕ / bấm tên mở lại (`pvMo` còn trong mã, không dùng).
- **Phép thử:** t156 viết lại theo bố cục mới (13); t145, t153 theo hàng mới.

## 3.161 — 11/10/2026 — Tab Tổ: chip nhóm, nút đầu bảng, bảng gọn + in A4, cảnh báo in đậm
- **Anh chốt:** nút In nằm cuối khó thấy; bảng giữ khung cuộn; chip sau này nhiều thì tối đa 2 dòng, gom nhóm; cột vừa số liệu, kẻ ô, bản in vừa A4, bỏ cột thừa, bảng xem thêm được cột; so sánh ghi đủ ngày; in danh sách in đậm khách tất nợ còn TK 105 / CCCD hết hạn (cảnh báo trước 30 ngày, theo ngày hiện tại) / khách còn mã tổ chưa có TK 105.
- **Chip** `toChipKhung(xem, tv, mo, bien, B)`: nhóm Xem (Bảng, Biến động cả năm) · Khách · Cần xử lý theo `TO_LOC_NHOM`; chip 0 mờ (`.mo0`) không ẩn; `toChipGon()` sau khi vẽ: quá 2 dòng → chip cuối mỗi nhóm (trừ chip đầu / đang chọn) vào `details.to-them` "⋯ thêm n". Chip mới `cccd30` (CCCD sắp hết hạn), `ctk` đổi thành "Chưa có TK 105" cho mọi khách còn mã tổ.
- **Đầu bảng** `toBangDau(tiêu đề, nút)` + `toNutXuat()`: 🖨 In (A4 dọc) · 🖨 In đầy đủ (A4 ngang) · 📊 Excel · ⚙ Cột (`toCotHop`, nhớ `D.cauHinh.toCot`) · ⚙ Ngưỡng. Danh sách khách: 🖨 In danh sách · 📊 Excel ở đầu bảng.
- **Bảng các tổ / bảng PGD** dựng lại theo danh mục cột `TO_COT` / `TO_COT_PGD` ([mã, tên, xem mặc định, in A4 dọc, tiền]); `toBangHTML(X)` vẽ cột đang bật, ẩn cột trùng lọc (`X.an`: Hội khi lọc Hội, Điểm GD khi lọc điểm, Còn nhận khi không ngưỡng, Mới vào / 105 tăng giảm khi thiếu tháng trước); thêm cột tùy chọn Số món vay, Tỷ lệ QH (%), Dư nợ BQ / hộ. Số: `soTr` / `soTrDau` (triệu đồng, `vi-VN` tối đa 2 số lẻ, 0 để trống). `toBangXuat('in'|'inDu'|'excel')`; `TO_BANG_XUAT` giữ `cot` / `aoa` / `tong` cũ cho Excel (số đồng).
- **Khung cuộn** `.to-cuon-khung` (cao `100vh − 330px`), `thead th` + dòng `tr.tong` cuối dính; `.to-bang.luoi` kẻ ô, ô `width:1%` (cột tên giãn).
- **Ngày đủ:** `toNgay31(ky)` = ngày số liệu thật của Mẫu 31 kỳ đó; `toBDChu` "Biến động 31/07/2026 → 31/08/2026", "so với 31/07/2026", cột "105 tăng/giảm từ …", bảng Ra khỏi tổ "Dư nợ 31/07/2026".
- **Cảnh báo:** `toCanh(k)`, `toCanhTong(ds)`; `toCCCDHan` thêm `kq:'sap'` (≤ 30 ngày) + `den`; `toCCHTML` / `toCCNhan`. In (`toBCDS`, `toBCDSPV`): cột Lưu ý + `tr.canh` in đậm (`TO_IN_CSS`) + dòng tổng; màn hình: dòng `.to-canh` nền vàng nhạt + cột Lưu ý.
- **Sửa lỗi cũ:** danh sách tổ viên lệch 1 cột (thừa ô ngày khi không có cột ngày — SĐT hiện ở cột CCCD).
- **Phép thử:** `tests/t157.js` (mới, 20). t128 theo cách ghi ngày mới.

## 3.160 — 11/10/2026 — Lọc số liệu chung ① Xã › ② Điểm GD · Hội › ③ Tổ
- **Anh chốt:** lọc còn rối (ô thả xuống + chip trùng nhau; chọn xã rồi tới điểm hay Hội không rõ thứ tự); Tra cứu khác các tab.
- **`pvVeCay`:** dòng `.pv-dan` (📍 Toàn PGD / Xã ✕ › Điểm ✕ · Hội ✕ › Tổ ✕ · n tổ; bấm tên → `pvMo(p, cap)` mở lại hàng đó, ✕ → `pvChon(p, cap, '')`); hàng chip `data-cap` đánh số ① Xã, ② Điểm GD + Hội (ngang hàng), ③ Tổ (≤ 40 chip, còn lại 🔎); cấp đã chọn ẩn hàng (trừ khi đang mở `PV_MO[p]`). Ô thả xuống bọc `.pv-sel`: ẩn ở máy tính (≥ 700 px), điện thoại giữ.
- **Tổ theo Hội không cần điểm:** `pvLuaChon(…, 'to', dc)` lọc xã (+ điểm nếu có); `pvCha('to', dc)` = có xã và (điểm hoặc Hội).
- **Tra cứu:** bỏ `details.tc-pv`, `#tc-cay` dưới ô tìm khách; `PV_DUNG.tc.ghi` → "n khách · số liệu …" trên dòng 📍; không thêm ô 🔎 tìm tổ.
- **Nền tối:** `color-scheme:dark` (ô nhập / ô thả xuống / ô tích theo giao diện); ô đã sửa Chuẩn hóa chữ sáng.
- **Phép thử:** `tests/t156.js` (mới, 14). t145, t153 theo cây mới.

## 3.159 — 11/10/2026 — Chân thanh bên + chế độ tối
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md Gói 2):** chân thanh bên còn chỗ trống mà chữ bị cắt, Drive báo 2 lần; muốn có chế độ tối.
- **Chân thanh bên:** `.tt-chu` xuống dòng (`-webkit-line-clamp:3`), chip `#so-lieu .chip` `white-space:normal`; `ttNghi` bỏ phần Drive khi có `#chip-drive`, phần còn lại "⚡ Số liệu sẵn dùng …" hoặc "Sẵn sàng".
- **Chế độ tối:** nút `.tb-gd` ở `.tb-chan` (◐ Theo máy / ☀ Sáng / ☾ Tối) → `dhDoiGD` xoay `D.cauHinh.giaoDien` auto → light → dark, dùng `apGiaoDien` sẵn có (cùng ô Giao diện trong Cài đặt). Rà màu cứng trong `css/app.css` (trừ khối `@media print`): nền `#fdecea / #fff6dc / #FFF6DA / #e6f4ea / #eef3f9` → `var(--do-nen / --vang-nen / --luc-nen / --xanh-nhat)`, chữ `#c0392b / #b23b2e / #b3261e / #2c7a46 / #8a5a00` → `var(--do / --luc / --vang)` (47 chỗ; giao diện sáng gần như không đổi). CSS bản in (`TDN_IN_CSS`, khuôn Word / PDF) không đổi.
- **Phép thử:** `tests/t155.js` (mới, 10) — gồm rà tương phản chữ / nền ở 7 tab khi nền tối.

## 3.158 — 11/10/2026 — Khai báo Hội vừa 1 trang + Chuẩn hóa
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md Gói 2, phương án a):** bảng Khai báo Hội dài quá 1 trang; Tên Hội cấp xã hợp với Chuẩn hóa; Số / Ngày KH Hội tỉnh khai 1 lần mỗi Hội.
- **Bảng khai báo** (`ktHdtBang`): `KT_HKB_COT` = CT · PCT · BTV 1–3 · Nhiệm kỳ · Số HĐUT · Ngày HĐ; dòng nhóm `tr.hkb-nhom` "Xã · n Hội · m tổ" thay cột Xã; nút 📋 `.hkb-pc` trong ô Hội (bỏ cột ⋯); bảng `width:100%`, ô nhập co theo bề ngang. Bỏ `ktHoiKBChep` / `ktHoiKBChep1` và nút ⇩ Chép.
- **Chuẩn hóa:** `KT_CHUAN_O` thêm `kh`, `khNgay` (chữ mờ `KT_CHUAN_PH`); mục **Riêng từng xã** (`ktChuanRiengHTML`, bảng `.kt-rieng`, ô `hkr-…`): Tên Hội cấp xã (`kb.ten`, giữ chỗ lưu cũ) · Số KH · Ngày KH riêng xã (trống = chung của Hội).
- **Đọc:** `ktHoiKB(k)` trả thêm `kh` / `khNgay` chung của Hội khi xã không khai riêng (in Kế hoạch, dòng nhắc, Phân công dùng sẵn); `ktHoiKBGoc(k)` = đúng chữ đã khai riêng.
- **Chuyển cũ 1 lần** (`ktHdtKH`, cờ `D.cauHinh.ktKHChuan`): mỗi Hội lấy cặp số / ngày nhiều xã khai nhất → Chuẩn hóa (nếu Chuẩn hóa chưa có); xã khai trùng → bỏ ô riêng; xã khác → giữ làm ngoại lệ.
- **Phép thử:** `tests/t154.js` (mới, 17). t108, t111, t118, t150 theo bảng mới.

## 3.157 — 11/10/2026 — Khung xem bên phải + 2 kiểu lọc (số liệu, file)
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md Gói 2):** khung xem dư dòng đầu / cuối, đầu khung 4 dòng tên file; lọc rối (Nguồn vốn lẫn giữa, chip chỉ 1 cấp); kiểu xem tab file là ô thả xuống.
- **Khung xem** (`xemBenPhai`, `05-them-file.js`): `cp-phu` bọc dòng chính `.cp-dong`, `title` = tên file; ẩn `#cp-ten` + phần phụ ở khung phải; khung `top:60px; height:calc(100vh - 72px)`. ⊡ Vừa trang (`S.che==='trang'`): `.than-p.vua-trang` (scroll-snap từng trang, canvas `width:auto`, cao = khung − 28), nhớ ở `D.cauHinh.xemChe` (`datChe2` ghi, `veVaoKhung` áp).
- **Lọc số liệu** (`pvVeCay`): hàng chip `hang(nhãn, …)` có `.pv-nhan` — chưa chọn xã: Xã (PGD + các xã); chọn xã: Điểm GD (Cả xã + điểm); có điểm: Tổ (≤ 12 chip); hàng Hội luôn có (đa chiều mặc định mọi tab: `d.daChieu!==false`). 🔎 `.pv-tim` cuối hàng 1 (`<p>-tim` / `<p>-gy`; Tổ → `toTim`, KTGS → `ktTim`, còn lại `pvTim(p)` + `pvChonTo`); bỏ ô tìm riêng ở `toVe` / `ktVe`. KTGS Kế hoạch bỏ chip `kt-kh-hoi`.
- **Tổng hợp** (`veTongHop`): chip `.th-nguon` (Tất cả / Trung ương / Địa phương) trên `#th-cay`, `.th-ct` dưới cây; danh sách báo cáo `.th-bc-gon` 1 dòng, chưa nạp → ⚠ (title nêu file thiếu).
- **Lọc file** (`veDauTab`): máy tính → chip kiểu xem `tlKieuXemHTML` (`.tl-kx`), ⚲ Lọc bật `TL_LOC_MO[tab]` → `.tl-panel` (`boLocHTML`) ngay dưới thanh + nút Bỏ hết lọc / Sửa tag / ▴ Đóng; dòng `.tl-dang` "Đang lọc:"; điện thoại giữ ô thả xuống + hộp lọc.
- **Sửa 3.156:** tự kiểm ngầm chỉ vẽ lại khi đang ở tab Nạp & KT, không đổi tháng KTGS, không bật thông báo (trước làm mất thẻ khách đang xem ở Tra cứu).
- **Phép thử:** `tests/t153.js` (mới, 18). t145, t147 theo cây / thanh lọc mới.

## 3.156 — 11/10/2026 — Tab Nạp & KT gọn 2: ma trận gọn, tự kiểm tra, 1 nút nạp
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md Gói 2):** ma trận chiếm cả màn, 2 chỗ chuyển tháng, 2 nút nạp (Nạp file + Nạp nhiều file KTGS), phải bấm Kiểm tra.
- **Nhóm Ⓚ KTGS** (`SL_NHOM` thêm `K`, gập sẵn): BC0437 / BC0438 trong ma trận chính; bỏ khối `ktNapHTML` (không gọi), nạp chung `slNapBo`. Kết quả kiểm tra KTGS (`ktKTHTML`) nằm trong `details#sl-kq`.
- **Ma trận** (`.sl-luoi`): kẻ ô, ô cao 28 px, cột tháng chọn `.sl-cot` sáng (tiêu đề + ô); `slDsKy` theo `slMtKieu()` (`D.cauHinh.slMt`): `gon` = tháng chọn + tháng trước (+ Theo ngày), `tq` = 12 tháng trọn ngang (ô hẹp, ẩn mũi tên), `thu` = 1 dòng `slMtThuHTML`. Tên báo cáo > 22 ký tự: chữ nhỏ, xuống dòng (`.dai`). Bỏ `SL_LECH` / ‹ › góc ma trận.
- **Hàng công cụ** `slNapThanhHTML`: ‹ T7 · T8/2026 ▾ · T9 › · 📥 Nạp file · 🔍 Kiểm tra lại · 📋 File cần xuất · [▾ Thu gọn | 2 tháng | ⇔ Tổng quan] · ☁ · ⋯ · ❓. Dòng trạng thái bỏ nút kiểm tra.
- **Tự kiểm ngầm:** `slBoXoa` (mọi lần dữ liệu tháng đổi) → `slHenKiem` (hẹn 1,5 giây) → `slTuKiem`: tháng có file chính chưa kiểm / đã đổi → `slKiemTra(ky, im)`; BC0437/0438 chưa kiểm / đã đổi → `ktKiemTra(ky, im)`. Chế độ ngầm: không khung chờ, không xóa phần dựng sẵn, lỗi chỉ báo ở ô trạng thái. `window.SL_KHONG_TU_KIEM` để tắt khi cần.
- **Dấu trên ô** `slKTO` / `slDauO`: mục kiểm tra gắn file theo tên (`SL_KT_KHOP`; bỏ nhóm 1 đủ file, 2 toàn vẹn, mục lưu ý / bỏ qua); có chênh → ⚠ cam, còn lại khớp → ✓ xanh; KTGS theo `SLM.ktg`. Chưa kiểm / dữ liệu đổi → không dấu.
- **Phép thử:** `tests/t152.js` (mới, 18). t146, t106, t140, t102 theo ma trận mới.

## 3.155 — 11/10/2026 — Luồng Scan: Lưu máy / Gửi / Copy / Lưu tủ, lưu theo mã KH + tên + ấp
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 7, 11):** chưa có nút lưu rõ ràng, app tự lưu tạm lên tủ; học Scanner Lens: xong → chọn Lưu máy / Gửi / Copy / Lưu tủ; PDF lưu như bản in (4 CCCD / A4); lưu file scan chỉ cần mã KH + tên + ấp (khách có thể chuyển tổ). Phần tối ưu chụp / quét để phiên riêng.
- **`tiepHang`** (bước ③) không gọi `luuSauHang` nữa → `scanXongHop(bl)` (`.sx-luoi`): `scanLuuMay` (máy tính tải về, điện thoại bảng chia sẻ), `scanGui` (`chiaSePDF`), `scanCopyAnh` (`scanAnhGhep`: ghép ảnh đã xử lý — thẻ 2 cột mặt trước | sau — thành PNG, ClipboardItem), `scanLuuTuHop` / `scanTimKH` (`slTimKH` danh bạ) / `scanChonKH` / `scanLuuTu` (thẻ nhiều người: mỗi người 1 khách). ✓ Xong (`scanXongBo`): đã làm gì đó thì bỏ phiên, chưa thì hỏi.
- **Hồ sơ mới** có `maKH`, `ten`, `xa`, `ap` (+ `maXa`, `maAp`), không `diem`/`to`: `duongScan` → `<thư mục>/CCCD|Hồ sơ scan/<Xã>/<Ấp>`, `tenScanDrive` / `tenTheCCCD` → `<Mã KH> <Tên>[ - loại giấy].pdf`; `ttScan` không đòi điểm GD / tổ.
- **Phiên quét dở:** `ghiHang` ghi mốc `luc`; `napHangCu` quá 7 ngày → bỏ (xóa ảnh trong máy).
- `luuSauHang` / khai hàng loạt / bản lưu tạm cũ giữ nguyên để đọc dữ liệu cũ (hồ sơ cũ chuẩn hóa sau — anh chốt).
- **Phép thử:** `tests/t151.js` (mới, 16).

## 3.154 — 11/10/2026 — Khai báo Hội = 1 bảng như Excel
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 8):** gom 1 bảng như Excel, không diễn giải; 1 Hội = 1 CT, 1 PCT, 3 BTV; app tự lấy số liệu cũ điền lại, anh không nhập lại.
- **Chuyển dữ liệu 1 lần** `ktHdt5` (gọi trong `ktHdtChuyen`, cờ `D.cauHinh.ktHdt5`): PCT = người đầu có tên trong pct → pct2 → pct3; BTV 1–3 = 3 người đầu trong uv1 → uv5 (dồn lên); người dư → `kb.du = [{vt, ten}]`. Phân công BTV (`D.cauHinh.ktPC`: `p`, `chon`, `ky`, `phuTrach`) đổi vai theo người, bỏ vai không tên. Chọn người in cũ (`ktIn.*.ng1/ng2/ky`) Phó 2–3 → Phó CT, ủy viên 4–5 → để trống.
- `KT_PC_VT` = ct, pct, uv1–3; `KT_IN_VT`, `KT_HKB_O` bỏ pct2, pct3, uv4, uv5.
- **Bảng** `ktHdtBang` (`.hkb-xls`): Xã · Hội (tổ) [ⓘ người dư] · Tên Hội cấp xã · CT · Phó CT · BTV 1–3 · Nhiệm kỳ · Số HĐUT · Ngày HĐ · Số KH Hội tỉnh · Ngày KH · ⋯ (phân công BTV). Ô `input.hkb-o` (id cũ `hkb-<khóa>-<ô>`), `ktHkbPhim` (Enter / Tab / Shift / ↑↓), `ktHkbDan` (dán khối tab / xuống dòng), `ktHkbDoi` (lưu + tô đỏ ngày sai `ktHkbNgaySai`), tên nghi sai tô vàng + gợi ý ở chữ rê chuột, bấm đúp sửa theo gợi ý. Chữ mờ trong ô = chức danh theo Chuẩn hóa (Đoàn: Bí thư / Phó Bí thư). Đầu cuộn dọc, cột Xã đứng yên.
- **Bỏ:** thẻ từng Hội (`ktHdtThe` không gọi), dòng "In ra", ↺ từng ô, đoạn giải thích (→ rê chuột số Hội – xã).
- **Phép thử:** `tests/t150.js` (mới, 22). t108, t110, t111, t118, t121, t125 theo bảng mới / 1 PCT 3 BTV.

## 3.153 — 11/10/2026 — Xóa thống nhất: mọi thứ vào Thùng rác app
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 3):** không cần thanh Hoàn tác — cần thì vào Thùng rác khôi phục; bỏ "↩ hoàn tác lần thay" ở ô Số liệu; ô Số liệu bị xóa và bản cũ khi thay file đều vào Thùng rác ngăn Số liệu.
- **Số liệu** (`js/22-so-lieu.js`): `slRacVao(k, lyDo)` chép bản trong máy (bảng + file gốc) sang `slr_<id>_a / _g` và thêm mục `khoCu:'soLieu'` (`sl:{loai, ky, e}`) vào `D.rac`. `slXoa` (không hỏi), `slXoaVaoRac` (xóa tháng / bản ngày cũ: hỏi 1 lần), `slGhi` khi thay file → bản cũ vào thùng (bỏ `e.truoc`, `slGiuTruoc`, `slHoanTac`). `slKhoiPhucRac`: ô đang có file khác → vào thùng (đổi chỗ); chép lại bản trong máy; nối Drive thì lấy file khỏi Thùng rác Drive (giữ id), không nối thì đẩy lại lên Drive. `slXoaHanRac` bỏ bản trong máy. `slChuyenTruoc`: meta cũ có `e.truoc` (3.145) → mục thùng rác trỏ khóa `_truoc`, 1 lần. "Làm mới toàn bộ" (gõ XOA) giữ như cũ, không qua thùng.
- **Mục nhỏ** (`js/06-hop-thoai.js` `MUC_NHO`, `racMucNho`, `mucNhoKhoiPhuc`): việc lịch (`lcXoaHan`), lần làm việc (`tdnXoaLan`, kèm việc cam kết), kế hoạch KTGS (`ktKHXoa`), bộ biểu mẫu (`xoaBo`) — không hỏi, vào ngăn 🗒 Mục nhỏ; mẩu ghi chú (`ntXoa`) không hỏi, vào ngăn Hôm nay như cũ.
- **Xóa nhiều file** (`thucHienBot`): 1 file không hỏi; nhiều file hỏi 1 lần "Xóa N file?".
- **Thùng rác** (`js/10-danh-sach.js`): thêm ngăn 📈 Số liệu, 🗒 Mục nhỏ; dòng "Trước ở: …"; "Tự xóa hẳn rác cũ hơn 30 ngày" bật sẵn (`racTuXoa!==false`).
- **Phép thử:** `tests/t149.js` (mới, 14). t141 (thay file → thùng rác, khôi phục trong máy / Drive, chuyển e.truoc, xóa ô không hỏi, xóa hẳn), t125 (xóa kế hoạch không hỏi + khôi phục).

## 3.152 — 11/10/2026 — Xuất chung: In · PDF · Word · Excel · Gửi
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 2, 4):** mỗi báo cáo một kiểu nút, tên file khác nhau; Copy gộp vào Gửi; PDF = hộp in "Lưu dưới dạng PDF" tên điền sẵn; máy tính Gửi = tải về.
- **File mới `js/24-xuat.js`:** `xuatHang(o)` hàng nút chuẩn `.xuat-hang` (Đóng · `o.truoc` · 🖨 In · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi; ẩn định dạng không có); `o.html()` → In / PDF / Copy dùng chung. `xuatTen(loại, phạm vi, kỳ)` → `Loai_PhamVi_Tmm-yy`. `xuatGui` menu (Gửi file PDF / Word / Excel · 📋 Copy ảnh · 📋 Copy chữ). `xuatChepChu` (ClipboardItem text/plain + text/html, bảng → tab giữa ô). `xuatChepAnh` / `xuatAnhBlob`: vẽ trang báo cáo thành PNG bằng SVG foreignObject → canvas (không thêm thư viện); máy không cho thì chép chữ thay.
- **Áp cho:** Tổ (`toXem`), Sao kê (`skXem`), Tổng hợp (`thXem`), biến động năm (`toBDNamXuat('html')`), KTGS Mẫu 06 sau giải ngân / Mẫu 06 trắng / Mẫu 04 / Thông báo phân công / Kế hoạch 01 — các hàm `ktGNIn`, `ktTrang06Xuat`, `ktBCIn`, `ktPCXuat` nhận thêm cách `'pdf'` (`inPDF`).
- **Khung xem file** (`index.html` cột phải + xem lớn): 🖨 In · ✎ Sửa · 📤 Gửi (`guiFileMenu`: gửi / tải file, 📋 chép nguyên file qua cầu nối, 📋 Copy ảnh với file ảnh, 📋 Copy số hiệu + trích yếu).
- `tests/kiem.py` biết thêm `DOMParser`, `XMLSerializer`.
- **Phép thử:** `tests/t148.js` (mới, 16).

## 3.151 — 11/10/2026 — Thanh lọc chung tab file + kiểu xem ▦ Bảng
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 6a, 9, 13; "dùng chung hết"):** mỗi tab file một kiểu lọc / sắp / xem, hàng chip Năm / Mảng / CT / Tag chiếm 3 hàng.
- **`veDauTab` viết lại** (`js/11-khung-tab.js`, lớp `.tl-thanh`): ＋ Thêm · 🗑 Xóa (`nutBot`) · ⚲ Lọc (n) ▾ (`moBoLoc`) · ⇅ (`moSapTab`; Scan = nhóm Ngày / Tuần / Tháng) · ☰ ▾ (`moXemTab`) · chip đang lọc `.tl-chip` (`chipDangLoc`) · số mục · ⋯ (`moThemTab`: `opt.themPhu` / `opt.nutThem` + chọn chép, ổ G, Drive, sửa tag) · ❓. Menu thả xuống dùng chung `#menu` (`moMenuTL`). Áp cho mọi tab gọi `veDauTab` (Văn bản, Biểu mẫu, Scan máy tính, Dữ liệu tháng, Ghi chú).
- **Bỏ:** hàng lọc nhanh (`hangLocNhanh` không gọi), dòng "Đang lọc", hàng chip lọc, hàng Sắp xếp / Xem (`veThanhSap` trả rỗng), ▤ Gọn; Scan máy tính bỏ hàng Danh sách / Ngày-Tuần-Tháng / ⚠ Chưa đạt và dòng giải thích (→ ❓).
- **⚲ Lọc** theo nhóm của tab (`nhomLocNhanh`, kèm số mục) + Tháng khi chọn năm + Khác (Chưa phân loại, hết hiệu lực, Trùng số hiệu, ★) ; Scan: Xã · Tag · ⚠ Chưa đạt. `boLoc('scan')` bỏ cả Chưa đạt / cây.
- **▦ Bảng** (`bangTabHTML`, `bangCot`, `BANG_SAP`, `D.cauHinh.bangTab` nhớ từng tab; điện thoại luôn Danh sách): Văn bản Số hiệu · Ngày ký · Tên & Trích yếu · Mảng NV · CT vay · Trạng thái (★ ⚠ ☁ ⛔ ⧉); Biểu mẫu Tên mẫu · Chương trình · Loại · Số lần dùng · Trạng thái; Scan (Mã KH nếu có) · Tên · Ấp · Loại giấy tờ · Ngày · Trạng thái. Bấm tiêu đề sắp ▲▼, ô tích (VB: chọn xóa; BM: gửi / nén / in; Scan: in ghép), ↑↓ chuyển dòng. Bản cũ bật Gọn → tự chuyển ▦ Bảng (Văn bản) một lần.
- **Phép thử:** `tests/t147.js` (mới, 25). t88 đọc chip trong ⚲ Lọc.

## 3.150 — 11/10/2026 — Tab Nạp & KT gọn
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 1, ảnh anh gửi):** tab rối, chọn tháng 3 chỗ, "thiếu" in 2 lần, trạng thái 5 chỗ, nút rải, chữ phụ nhiều, ma trận nửa màn; tháng chưa có file vẫn báo "kiểm lại".
- **Hàng công cụ** `slNapThanhHTML` (lớp `.sl-con-nap .sl-thanh-nap`): ‹ tháng › · 📥 Nạp file · 📋 File cần xuất · ☁ chờ · ⋯ (`slNapThem`) · ❓ (`slNapHoi`). `slTabConHTML` trả rỗng cho tab nap.
- **Dòng trạng thái** `slNapTTHTML` (`.sl-tt .sl-tt-1`): ưu tiên chưa có file → thiếu file (link nạp từng file) → sai kỳ / cấu trúc → cần kiểm → ✅ Đạt (link "N chênh lệch ghi nhận" mở `details#sl-kq`). Tooltip: báo cáo dùng được + lưu ý (`slDanhGia`).
- **Ma trận** trọn ngang (`.sl-bang` 100% ≥ 700 px), ‹ › ở ô góc, bấm tên tháng → `slChonThang` (kỳ chung theo khi tháng có số liệu). Cột 📅 Theo ngày giữ; nút Xóa ngày cũ → ⋯.
- **Bỏ** khung ① (`slTTHTML` không dùng ở tab nap), 4 ô bước, khung 2 cột vuốt (điện thoại), dòng chú thích, "Sẵn dùng", Làm sạch / Giữ sẵn trên hàng, tóm tắt chi tiết + quản lý dữ liệu cuối trang (→ ⋯, `slTomTatXem`).
- `.nho{min-width:0}`: nút biểu tượng không bị kéo rộng 76 px.
- **Phép thử:** `tests/t146.js` (mới, 12). t142 (dòng trạng thái thay 4 bước), t130 (Xóa ngày cũ ở ⋯), t105 (quan sát), t106 (ma trận chính).

## 3.149 — 11/10/2026 — Kỳ + phạm vi chung; cây chọn 2 hàng; bỏ cảnh báo Thông tin tổ trưởng
- **Anh chốt (KE_HOACH_GON_GIAO_DIEN.md ý 6b, 6c):** kỳ nằm ngoài cùng phủ mọi tab; phạm vi "dùng chung hết"; ngoại lệ KTGS in theo kế hoạch giữ kỳ kế hoạch (không đổi — 3.141).
- **Kỳ chung:** `#ky-chung` ở đầu trang (`kyChungVe`, `kyChungDs` = kỳ Mẫu 31 + tháng có file TW, `kyChungDoi`, `kyChungLay`: kỳ ngày chỉ giữ trong lần mở app). Đổi → `toCH/skCH/ktCH/thCH().ky`, `SL_KY` cùng đổi, bỏ bộ đã dựng. `toKyMacDinh` và Tổng hợp lấy kỳ chung trước; tab không có số liệu đúng kỳ → `kyGhiHTML` ghi "đang dùng …". Bỏ ô `select[data-ky]` + `kyLamMoiHTML` ở Tổ / Sao kê / KTGS và ô kỳ Tổng hợp (hàm `kyLamMoi` còn, không gọi từ giao diện).
- **Phạm vi chung:** `pvChungO` (`D.cauHinh.pvChung`, lần đầu lấy theo tab Tổ) + `pvGan(C)`: ô xa / diem / hoi / to của toCH, skCH, ktCH, thCH, tcCH thành getter / setter trỏ về 1 chỗ.
- **Cây chọn 2 hàng** (`pvVeCay`): hàng 1 `.pv-hang1` các ô chọn nối ›, ẩn cấp chưa tới (Hội luôn có, là lọc); hàng 2 `.pv-hang2` chip của cấp cần chọn tiếp (chọn tới tổ thì hết). Logic chọn (`pvLuaChon`, `pvChon`, `pvCha`) giữ nguyên.
- **KTGS:** bỏ dòng "Nạp và kiểm tra … ở tab" → nút 📥 nạp cạnh chip BC thiếu; `ktSuyHTML` chỉ còn báo tổ chưa rõ điểm GD.
- **Phép thử:** `tests/t145.js` (mới, 12). t113 (bỏ cảnh báo), t131 (⟳ Làm mới → kỳ chung), t127 (báo dựng sẵn ở ô trạng thái — 3.148).

## 3.148 — 11/10/2026 — Nút & trạng thái: 1 nơi báo trạng thái, nút vừa chữ, thứ tự nút hộp thoại, bỏ 🗑 cuối dòng
- **Anh chốt (docs/KE_HOACH_GON_GIAO_DIEN.md ý 10, 12, 13; anh duyệt làm cả gói 3.148–3.155 + gộp, 11/10 00:40).**
- **1 nơi trạng thái** (`js/23-dieu-huong.js`: `TTB`, `ttTin`, `ttVe`, `ttDung`, `ttDs`): khối `#tt-khoi` = đèn (`ttDen`: đỏ mất mạng · vàng đang chạy · đỏ lỗi < 12 giây · xanh Drive nối · xám) + thanh màu (`TTB.pt`, 101 = chạy không rõ %) + 1 dòng chữ (tin mới 8 giây, lỗi 12 giây, rồi về chữ nghỉ `ttNghi`). Máy tính ≥ 1100 px: chân thanh bên (`#tb-tt`, dời cả `#so-lieu` chip Drive / bộ nhớ); nhỏ hơn: thanh đáy. Bấm chữ → 🔔 20 tin.
- **Nối vào:** `bao` (không mở hộp thoại → vào ô trạng thái; đang mở hộp → vẫn nổi), `baoLoi` (đèn đỏ), `baoHoanTac` (bỏ nút Hoàn tác, nhắc Thùng rác), `batChay` / `tienChay` / `tatChay` / `dangLam` / `hetLam` (hộp "Đang xử lý…" chỉ hiện khi có nút Dừng), `slNapSanChip` (bỏ chip nổi `#sl-san`), `capNhatChip`.
- **Nút:** `.nho` mặc định `flex:0 0 auto` (trước `flex:1` giãn đầy hàng — gốc của nút dài như lỗi); máy tính cao 32 px, điện thoại trong hộp thoại vẫn dàn đều. Hộp thoại: `button[onclick="dongHop()"]` (Đóng / Thôi) đứng trái, `.chinh` đứng phải (CSS `order`). `.nut-them` xanh nhạt.
- **Bỏ 🗑 cuối dòng** (`10-danh-sach.js` dòng văn bản / biểu mẫu, `08-dia-ban.js` dòng scan) — xóa qua 🗑 Xóa file (chọn nhiều) như cũ; hướng dẫn sửa theo.
- **Thanh bên:** số bản (bấm → Hướng dẫn) + NhanNT; máy tính ẩn thanh đáy trừ khay chờ duyệt / nút Xem trước ở tab có khung xem (`dhDay`).
- **Phép thử:** `tests/t144.js` (mới, 14).

## 3.147 — 10/10/2026 — Thanh bên điều hướng (đợt F) cho máy tính
- **Anh duyệt (KE_HOACH_DIEU_HUONG.md mục 5–7, "làm theo chuẩn em nghĩ"):** máy tính ≥ 1100 px dùng thanh bên trái; điện thoại / màn < 1100 px giữ thanh tab ngang như cũ. Quy chuẩn tham khảo (mục 8) chưa áp dụng.
- **`js/23-dieu-huong.js` (mới):** `DH_MUC` (Hôm nay · Văn bản · Nạp & KT · Số liệu: Tổng hợp, Sao kê, Tổ TK&VV, KTGS Hội, Tra cứu KH · Hồ sơ: Biểu mẫu, Scan, Thư viện) + `DH_CC` (HSSV, Địa bàn, CT vay → mở ở cột Công cụ Hôm nay) + chân: 🗑 (số mục) · 🧰 · ❓ · ⚙. Mỗi mục gọi lối cũ (`doiNgan`, `moNapSL`, `slDoiTab`, `ccMo`…). Tô mục: `toNutSL` → `dhTo`.
- **Số đếm:** Văn bản = file chờ duyệt; Nạp & KT = ⚠ số file bắt buộc còn thiếu của tháng mới nhất (`dhThieuNap`); Thùng rác.
- **Thu gọn 60 px:** nút « / » — nhớ riêng từng máy (`localStorage tb_gon`); chưa chọn thì màn < 1280 px tự thu. Alt+1…9 mở mục theo thứ tự.
- **CSS:** thanh tab ngang, tab con Số liệu, logo / nút ❓ 🧰 🗑 ⚙ trên đầu trang chỉ **ẩn bằng CSS** khi có thanh bên (lối cũ, phép thử cũ vẫn chạy); đầu trang còn 1 hàng (52 px); thanh đáy dời theo thanh bên; nền tối cả khi máy tự chọn; in không có thanh bên.
- **Phép thử:** `tests/t143.js` (mới, 16).
- **Kiểm tra:** kiem.py sạch; hoiquy, hoiquy2, t101–t143 đạt (t116 1 phép hỏng sẵn từ 3.141). Ảnh 1536×730 / 1366×768 / 1000 / iPhone 390, nền tối.

## 3.146 — 10/10/2026 — Kiểm tra kỳ: Đạt = đủ file · đúng kỳ · đúng cấu trúc; chênh lệch chỉ ghi nhận; bỏ hẳn chốt / khóa tháng
- **Anh chốt (KE_HOACH_KIEM_TRA_KY.md mục 3–4):** không chốt tháng — bấm Kiểm tra, app báo **✓ Đạt** khi đủ 9 file (Ⓑ 3 + Ⓐ 6), đúng kỳ, đúng cấu trúc; chênh lệch giữa các file **chỉ ghi nhận để biết**, không ảnh hưởng Đạt, không sửa số; **xóa mã chốt** tránh rác.
- **`slDanhGia(ky)`**: `thieu` (file Ⓑ / Ⓐ chưa có) · `ky` (ngày số liệu không phải cuối tháng) · `ct` (0 dòng dữ liệu) · `luuY` (dòng sai mã khóa, ngày anh khai — không làm trượt) · `daKiem` (đã bấm kiểm sau lần đổi file cuối, dấu `slDauKy`) · `dat` · `bc` (theo loại báo cáo `SL_BC_CAN`: Tổ · Sao kê · Tra cứu / Tổng hợp tổng quan / KTGS — thiếu file gì).
- **Giao diện:** khung "Kiểm tra kỳ" 4 bước ✓ Đủ file · Đúng kỳ · Đúng cấu trúc · Đã kiểm; hộp ✅ Đạt (xanh) hoặc "Chưa Đạt — thiếu / sai gì"; chip theo loại báo cáo; mục lệch gom dưới "Ghi nhận chênh lệch — chỉ để biết" (viền xanh, không đỏ); dòng ① pill "✓ Đạt · N chênh lệch ghi nhận"; tiêu đề cột tháng Đạt ✓ xanh. Nút "🔍 Kiểm tra kỳ"; tháng có BC0437 / BC0438 thì kiểm luôn phần KTGS (`ktKiemTra` trả promise).
- **Xóa mã chốt (3.91):** `slChot`, `slKhoaO`, `slKhoaBao`, `slChotHop`, `slChotGhi`, `slMoKhoaHop`, `slMoKhoa`, `slDatChot`, ô 🔒, chặn nạp / thay / xóa tháng chốt, `SLM.chot` (meta cũ: `slChuanMeta` bỏ phần chốt, `slGopMeta` không đọc; lần ghi meta sau tự rơi). Tháng từng chốt tự mở, dữ liệu giữ nguyên.
- **Phép thử:** `tests/t142.js` (mới, 18). t105 (phần chốt → Đạt / không chặn ghi), t110 (bỏ phép tháng chốt khóa / KTGS không khóa).
- **Kiểm tra:** kiem.py sạch; hoiquy, hoiquy2, t101–t142 đạt (t116 1 phép hỏng sẵn từ 3.141).

## 3.145 — 10/10/2026 — Bộ file chuẩn mới; xóa hẳn mẫu đã bỏ; ô ma trận số chính + mũi tên; bấm ô hỏi thay + hoàn tác; KHĐ tự tính; tổ dư nợ 0
- **Anh chốt (Q16, Q17, KE_HOACH_KIEM_TRA_KY.md):** Ⓑ bắt buộc 3 file (Mẫu 31, Dư nợ chi tiết, DSTO) · Ⓐ chuẩn TW 6 file (BCDHTD 01.1 / 01.2, 4 LEN_31) — đủ 9 file mới Đạt · Ⓓ phụ (KHĐ mẫu 14, QH, khoanh, phân kỳ, Tổng dư nợ, **Thông tin tổ trưởng** giữ để tra soát tháng cũ) · KTGS BC0437 / BC0438.
- **Xóa hẳn mã + dữ liệu:** B32, Mẫu 10, Mẫu 7, Sao kê KH, KHĐ 08/KTNB — chỉ còn 1 dòng nhận diện (thả file → báo "đã bỏ"). `slBoLoaiDon` (thay `slBoMau10`) chạy khi mở app / kéo Drive: xóa bảng trong máy + meta (dấu `SLM.xoa`), file Drive vào Thùng rác (chưa nối → `sl_rac_cho`). Bỏ kiểm tra chéo Mẫu 31 ↔ B32, Mẫu 10; Tổng hợp › "Theo nguồn vốn TW / ĐP" tính từ Mẫu 31 (`twTinh31` theo `nguon|xã`).
- **Ô ma trận:** `slChinh` (số chính theo loại: dư nợ · KHĐ số món · QH / khoanh số món + tiền · tổ số tổ), `slMuiTen` so ô tháng liền trước: dư nợ tăng ▲ xanh, QH / khoanh / KHĐ ngược lại, tổ không mũi tên.
- **Bấm ô:** trống → `slNapMot`; có file → `slOBam` hỏi "Thay bằng file mới?" (Thôi / Thay + nút nhỏ Xem / Tải / Xóa / ↩ Hoàn tác).
- **Hoàn tác lần thay (1 bước, 30 ngày):** `slGhi` thay ô → `e.truoc` (bản meta cũ) + bản trong máy `sl_b_…_truoc`, `sl_g_…_truoc` (`slGiuTruoc`). `slHoanTac`: bản mới đã lên Drive → lấy file cũ khỏi Thùng rác (`slBoRac`, PATCH trashed:false), file mới vào Thùng rác (`slRacCho`); mốc `luc` mới để máy khác tải lại.
- **KHĐ tự tính** `slKHDTinh` (còn dư nợ, GD gần nhất trước ngày cùng kỳ 3 tháng trước, bỏ khoanh / HSSV / món vay sau mốc); `slKHD(B)` = file nếu có, không thì số tự tính (Tra cứu, Tổ, KTGS). Kiểm tra: "KHĐ app tự tính ↔ file" (tính / file / khớp).
- **Cây tổ:** DSTO điền trước Thông tin tổ trưởng (SĐT, tổ phó theo DSTO); `toDong0`: tổ dư nợ 0 còn trên DSTO / LEN_31 → `canDong` (nhãn "⚠ Dư nợ 0 — cần đóng tổ", chip ở tóm tắt phạm vi, thẻ tổ); không còn ở cả 2 → `K.toAn` (ẩn khỏi cây, ô tìm vẫn thấy).
- **📋 File cần xuất** (`slFileXuat`, `SL_FILE_XUAT`): nút ở tab Nạp & KT, ✓ file tháng đang xem đã có.
- **Phép thử:** `tests/t141.js` (mới, 31 — Drive giả). t123 (`slBoLoaiDon`, Dư nợ chi tiết bắt buộc), t105 (B32 bị từ chối, chốt dùng bộ bắt buộc thu gọn), **hoiquy** (sửa: phép "XLS từ ô ma trận tab Tháng" hỏng từ 3.144 → "Excel sang Số liệu"; Cài đặt 11 trang), `fakedrive.js` (lấy lại khỏi thùng rác).
- **Kiểm tra:** kiem.py sạch; hoiquy, hoiquy2, t101–t141 đạt (t116 1 phép hỏng sẵn từ 3.141). t113: tổ lệch điểm GD giữa DSTO và Thông tin tổ trưởng → nay theo DSTO (anh chốt DSTO bắt buộc).
- **Chưa làm (3.146):** Kiểm tra kỳ thống nhất (Đạt + ghi chênh lệch), xóa mã chốt tháng.

## 3.144 — 10/10/2026 — Sắp lại tab: tab 📥 Nạp & KT thay tab Tháng; bỏ tab Tháng + dữ liệu; ẩn Giao ban, Buổi GD
- **Anh chốt:** Q5 + Q12 (bỏ tab Tháng, xóa dữ liệu cũ, **không sao lưu**, thư mục Drive vào **thùng rác Drive**), Q13 (bỏ nút Giao ban, Buổi GD — làm lại sau), Q15 (tách Nạp & Kiểm tra thành tab riêng vào chỗ tab Tháng; **nạp BC0437 / BC0438 của KTGS gộp vào đây**; quy tắc kiểm tra thống nhất 1 lần — làm sau). Anh duyệt gộp 3 bước thành 1 bản.
- **Thanh tab:** `📥 Nạp & KT` (`moNapSL`) ở chỗ tab Tháng, `Số liệu` (`moBCSL`) mở tab con báo cáo gần nhất (`D.cauHinh.slTabBC`, mặc định Tổng hợp); tô nút theo `toNutSL`. Bên trong vẫn là khung tab 7 (`slTab='nap'`) — chưa tách mã (đợt kiến trúc F). `doiNgan(2)` (lối cũ: Có gì mới, lời nhắc) → tab Nạp & KT.
- **Tab Nạp & KT:** tiêu đề riêng (không thanh tab con); thêm khối **File KTGS · BC0437 / BC0438** (`ktNapHTML`, chuyển từ tab con KTGS). KTGS chỉ còn dòng "Nạp và kiểm tra BC0437 / BC0438 ở tab 📥 Nạp & KT". Thanh tab con Số liệu: Tổng hợp · Sao kê · Tổ · KTGS · Tra cứu.
- **Bỏ tab Tháng:** `boThangDon` chạy 3 giây sau khi mở app và 7 giây sau khi nối Drive: mục `D.duLieu` + khay chờ / thùng rác nhóm duLieu → xóa bản trong máy, file Drive vào thùng rác Drive, dấu `daXoaHan` (máy khác bỏ theo); thư mục `<gốc>/Dữ liệu tháng` vào thùng rác Drive; xong đặt `D.cauHinh.boThang='xong'`. Chưa nối Drive: mục có file Drive chờ lần sau. Bỏ lời nhắc "thiếu báo cáo tháng" (Hôm nay), trang Cài đặt "Dữ liệu tháng", mục Hướng dẫn "Tháng", nút "Tìm ở tab khác → Tháng"; Lập chỉ mục Drive không dựng lại mục Dữ liệu tháng.
- **Thêm file:** Excel thêm ngoài tab Văn bản → xem trước của tab Nạp & KT (`slDocNhieu`), không vào khay chờ; PDF bảng số liệu → Văn bản. Mã tab Tháng (`veThang`, `D.duLieu`…) **giữ lại** (mảng rỗng) — dọn ở đợt J.
- **Công cụ:** `CONG_CU` thêm cờ `an` cho Giao ban, Buổi GD — ẩn khỏi cột, `ccMo` báo "đã bỏ"; mã `gb*` / `bgd*` giữ.
- **Phép thử:** `tests/t140.js` (mới, 20 — Drive giả). hoiquy2: phép "Excel tab Tháng" → "Excel sang tab Nạp", Cài đặt 11 trang. t106, t110: ma trận BC0437 / BC0438 kiểm ở tab Nạp & KT.
- **Kiểm tra:** kiem.py sạch; hoiquy, hoiquy2, t101–t140 đạt (t116 1 phép hỏng sẵn từ 3.141). Ảnh máy tính 1366 / điện thoại 390 tab Nạp & KT, KTGS.

## 3.143 — 10/10/2026 — Ngày số liệu theo nội dung file; file không ghi ngày → anh khai khi nạp (Q14)
- **Anh chốt:** Q14 — nạp file phải nhận đúng ngày số liệu từ **nội dung** file; file không có ngày trong nội dung thì anh khai khi nạp (tên file chỉ là gợi ý).
- **Trước:** cột ngày → tiêu đề → **tên file** (tự dùng, chỉ báo vàng); loại "tùy kỳ mới" (3.136) có ngày tên file giữa tháng thì tự đưa về ô cuối tháng.
- **Nay:** file chỉ có ngày trên tên file (hoặc không có ngày) → `kq.canKhai`, ô Kỳ trống, không tự tích, trạng thái "⚠ Cần khai ngày…"; nút **"Tên file: dd/mm/yyyy — dùng"** (`.sl-goi-y`) khi tên file có ngày; chọn ngày / bấm nút → nguồn "anh chọn" (hiện "anh khai"), trạng thái ghi "Ngày số liệu do anh khai". Chưa khai → không tích, `slGhi` từ chối. Nạp từng file / Thay file (anh chọn ô trước) giữ như cũ. Áp cả file KTGS (BC0437 / BC0438). Dữ liệu đã nạp không đổi.
- **Hàm:** `slCanKhai(kq, tuTen)` (cuối `slPhanTich`, `ktPhanTich`), `slGoiYKy`; `slTrangThai`, `slXemTruoc` (nút gợi ý); bỏ nhánh 3.136 tự đưa về cuối tháng (cờ `tuyMoi` còn trong `SL_LOAI`, không dùng nữa).
- **Phép thử:** `tests/t139.js` (mới, 15). `tests/tv.js` giả lập "anh bấm dùng ngày tên file" cho phép thử cũ (bộ file giả KHĐ / QH / khoanh / tổ trưởng chỉ có ngày trên tên file); t139 tắt bằng `window.KHAI_TU_DONG = false`. t130: phép "KHĐ ngày chỉ có trên tên file" đổi theo quy tắc mới.
- **Kiểm tra:** kiem.py sạch; hoiquy, hoiquy2, t101–t139 đạt (t116 1 phép hỏng sẵn từ 3.141).

## 3.142 — 10/10/2026 — Kiến trúc đợt A: tách app thành nhiều file (nguyên trạng)
- **Anh chốt:** Q8 (`docs/KIEN_TRUC_3_LOP.md`) — tách file, vẫn không build / không npm; đợt A chỉ cắt nguyên trạng, không đổi chức năng.
- **Đã làm:** `index.html` (28.389 dòng) → khung 203 dòng + `css/app.css` + 22 file `js/01-thu-vien.js` … `js/22-so-lieu.js`, **đúng thứ tự** các khối `<script>` cũ (bỏ 5 khối rỗng). Thẻ nạp có `?v=<APP_BAN>` để trình duyệt không lấy lẫn file bản cũ.
- **Chứng minh không đổi logic:** `python3 tests/ghep.py ra.html` ghép lại 1 file → **giống từng byte** bản 3.141 (trừ 5 khối rỗng); trước khi lên số bản / sửa cửa sổ nổi. Ảnh chụp 5 tab × máy tính 1366 / điện thoại 390: phần thân trùng từng điểm ảnh với 3.141.
- **Sửa duy nhất về mã:** cửa sổ nổi HSSV (`hsNoi`) trước chép thẻ `<style>` → nay chép cả `link[rel=stylesheet]` (đọc luật CSS; mở bằng `file://` không đọc được thì gắn link đường dẫn đầy đủ).
- **Phép thử:** `tests/t138.js` (mới, 8 — mở qua máy chủ web tạm, cửa sổ nổi chép CSS, nền tối đúng); `tests/nguon.js` (mã ghép cho phép thử dò chữ trong mã: t111, t112, t113); t111 phần cửa sổ nổi: mở bằng file:// trình duyệt chặn cửa sổ nổi tải css → phép thử thay link bằng `<style>` cùng nội dung (đường web thật ở t138).
- **Công cụ:** `tests/ghep.py` (mới); `tests/kiem.py` kiểm bản ghép + báo khi `?v=` khác `APP_BAN`; `tests/bando.py` ghi vị trí dạng `file:dòng`; `tests/hssv_exe.js` đọc `js/`.
- **Lưu ý dùng:** link web như cũ. Tải app về máy thì tải **cả thư mục** (index.html + css/ + js/).
- **Kiểm tra:** kiem.py sạch; hồi quy hoiquy (28/28, lần 1 vướng phép chập chờn "Báo cáo đã bỏ…" đã biết — chạy lại đạt), hoiquy2, t101–t138 đạt hết, **trừ t116 (11/12 — hỏng sẵn trên 3.141, cùng phép "tên file Word có (can cu 10566)")**. Mốc so sánh chạy trên 3.141 cùng máy.

## 3.141 — 09/10/2026 16:00 — Sửa lỗi mất cài đặt khi đồng bộ Drive (3.140.4); In theo tháng tự lấy số liệu
- **Sự cố anh báo (09/10):** khai báo Hội (tên CT / PCT / ủy viên, HĐUT, KH Hội tỉnh), Phân công BTV, lựa chọn in, khóa ảnh CCCD… mất trên máy và trên Drive (`Tủ hồ sơ/_Hệ thống/cauhinh.json`); có thêm thư mục lạ `undefined/_Hệ thống/cauhinh.json` (11:18).
- **Nguyên nhân (dựng lại được bằng phép thử t136 trên bản cũ):** cài đặt trong trình duyệt máy này bị trống (chưa rõ vì sao) → app đồng bộ với file ở thư mục "undefined" → nhớ "giờ đã lấy" của file đó → quay về file thật thì tưởng không có gì mới, **không lấy về mà ghi đè** bản trống.
- **Khôi phục (đã làm cùng anh):** lấy phiên bản 01:36 09/10 trong Quản lý phiên bản Drive, ghép với 4 Kế hoạch + lựa chọn sáng 09/10, tải lên làm phiên bản mới, "Lấy từ Drive". File thật chỉ xử lý trong phiên, không vào repo.
- **Sửa (3.140.4):** nhớ đúng file đã đồng bộ (`chFileId`, riêng máy) — khác file thì luôn lấy về gộp trước khi ghi; `baoDamDuong` không bao giờ tạo thư mục "undefined" / "null" (tên thư mục trống → "Tủ hồ sơ").
- **3.141 (anh chốt):** Kế hoạch › In theo tháng kiểm tra — Mẫu 06 (từng tổ), 16 (tổ / cả tháng), 04 (tháng) **tự lấy số liệu cuối tháng liền trước** (Mẫu 31 + BC0437 / BC0438 đã nạp), kỳ anh chọn ở ô Số liệu giữ nguyên; thiếu tháng → tháng gần nhất trước, ghi ⚠; bảng ghi "Số liệu in Tm: …"; tên file SL theo đúng ngày số liệu. Các chỗ kiểm tra khác (Định kỳ, sau giải ngân, Mẫu 04 lập tay…) vẫn theo kỳ anh chọn.
- **Hàm:** `ktKHKySL`, `ktKHNapSL`, `ktKHVoiSL` (mượn KT_K / TO_K / KT_BC / KT_TRUOC rồi trả), `ktKHSLChu`; `ktKHIn06 / 16 / 04T` bọc → `…G`.
- **Kiểm tra:** `tests/t136.js` (6 — đồng bộ, trên bản cũ 2/6), `tests/t137.js` (8 — in theo tháng), t134 (đổi phép nhắc kỳ), t117, t98, t109, t110, t119, t132, t135, hoiquy2.

## 3.140.3 — 09/10/2026 10:00 — Bỏ dòng "PGD NHCSXH GÒ DẦU" cuối báo cáo in
- **Anh yêu cầu:** các bảng in ra do app lập bỏ chữ PGD Gò Dầu ở cuối trang.
- **Đã làm:** `bcKy()` trả rỗng → bản In / PDF báo cáo Tổ TK&VV, Sao kê, Tổng hợp chỉ còn "PGD NHCSXH GÒ DẦU" in đậm góc trên trái (3.139). Mẫu chia tách tổ giữ khối ký Tổ trưởng. **Excel giữ dòng cuối** (Excel không có đầu trang ghi đơn vị).
- **Kiểm tra:** t133 thêm 1 phép; t105, hoiquy2.

## 3.140.2 — 09/10/2026 09:00 — 📤 PDF gửi Hội; tên file theo cây địa bàn
- **Anh yêu cầu / chốt:** nút xuất PDF gửi Hội, nút riêng từng mẫu (06, 16, 04, Kế hoạch); tên file ngắn mà hiểu được: theo cây địa bàn, Hội ngay sau xã, bỏ điểm GD (cách 2); file Word cùng tên.
- **Tên file:** `Xã_Hội_Ấp_Tổ_Mẫu_Tháng_SL` — vd `TruongMit_HND_Ap06_VoVanTao_M06_T10-26_SL30-09-26`, `TruongMit_HND_M16_T10-26_3to_SL30-09-26`, `TruongMit_HND_M04_T10-26_SL30-09-26`, `TruongMit_HND_KH2026`. Hội: HND / HPN / CCB / DTN; ấp `Ap…`, khu phố `Kp…`; SL = ngày số liệu đang dùng (kỳ tháng = ngày cuối tháng).
- **Nút:** Kế hoạch › In theo tháng — mỗi dòng tổ 📤 PDF 06 · 📤 PDF 16; dưới bảng 📤 PDF 16 (cả tháng) · 📤 PDF 04; xem Kế hoạch 📤 PDF.
- **Cách làm:** app không tự dựng PDF (không thêm thư viện) → mở hộp in, tiêu đề trang (và tiêu đề app, tạm 30 giây) = tên file để Chrome / Edge máy tính điền sẵn khi "Lưu dưới dạng PDF"; tên được chép vào bộ nhớ tạm (điện thoại dán khi máy hỏi tên). Tiêu đề đổi SAU bộ in chuẩn (bộ in nhận Mẫu 06 theo tiêu đề cũ để đánh "Trang x/y").
- **Hàm:** `ktFTen(t, o)`, `ktFChu`, `ktFSL`, `KT_HOI_VT`, `inPDF(h, ten)`; `inBlob(b, ten, tb)` thêm lời nhắc tùy chọn; `ktKHIn06 / ktKHIn16 / ktKHIn04T / ktKHIn` nhận cách `'pdf'`.
- **Kiểm tra:** t134 thêm 8 phép (31/31); t109, t110 (tên KH mới), t119, t132, t135, hoiquy2.

## 3.140.1 — 09/10/2026 06:30 — Mẫu 06: số tiền 2 số lẻ, canh phải, 1 dòng; Mẫu 16 từng tổ trong In theo tháng
- **Anh báo:** Mẫu 06 Word — ô "Dư nợ đến ngày kiểm tra" dòng Cộng xuống dòng (1.178,4 → "1.178," / "4"); số dòng hộ (65,556 · 0,417) sát mép, canh trái.
- **Nguyên nhân:** cỡ chữ dòng Cộng (3.118, `ktCoVua(v, 992)`) tính theo ô cũ rộng 992 twip, trong khi cột số tiền hiện 737 twip (1,3 cm) trừ lề ô 2 × 108.
- **Anh chốt:** canh phải; lấy 2 số lẻ; dòng Cộng tính từ số gốc rồi làm tròn (có thể lệch 0,01 so cộng tay); nợ lãi dưới 5.000 đ giữ 3 số lẻ.
- **Đã làm:** `ktGiaTri06` dùng `ktTr(x, 2)` + `ktTr06Lai`; `ktCoTien06(v, o, dam)` đo theo đúng ô (`KT06_O_TIEN`: 737 / 737 / 794) với lề ô `KT06_LE_TIEN` = 30 twip; `ktOTien06` (canh phải + `tcMar`) cho 3 ô số tiền dòng hộ và dòng Cộng (`ktCong06`); bản In: ô số tiền `nowrap`, đệm 1,5 pt, cỡ theo `ktCoTien06`. Bố cục, độ rộng cột, tên hộ giữ nguyên.
- **In theo tháng (anh yêu cầu):** mỗi dòng tổ thêm 🖨 In / PDF 16 · 📄 Word 16 (biên bản riêng tổ, in 2 mặt — `ktKHIn16(cach, ok, ma)`); nút Mẫu 06 đổi nhãn "🖨 In / PDF 06" cho rõ. Nút cả tháng giữ.
- **Kiểm tra:** t134 thêm 3 phép (23/23); `tests/t135.js` (16 phép) + LibreOffice dựng Word: 128,56 · 1.178,4 · 12.345,67 nằm 1 dòng, canh phải; t106, t115, t119, t122, t126, t129, t132, t134, hoiquy2.

## 3.140 — 09/10/2026 10:00 — Kế hoạch trọn ấp; thứ tự ấp; in theo tháng kiểm tra; Định kỳ chọn tự do
- **Anh chốt:** kế hoạch kiểm tra 1 tháng phải trọn 1 ấp (không lẻ tổ của ấp); ấp xếp theo mã thôn / điểm GD, trong điểm GD theo tên, có tùy chỉnh và khôi phục mặc định; đổi tháng chỉ theo cả ấp (bỏ đổi từng tổ); in 1 bộ theo tháng kiểm tra trong chip Kế hoạch — Mẫu 06 in từng tổ 1 mặt (đảm bảo tối thiểu 90%), Mẫu 16 và 04 in 2 mặt; chip Định kỳ Mẫu 06 + 16 chọn tự do, không căn cứ kế hoạch.
- **Đã làm:**
  - **Thứ tự ấp** (`ktKHApMacDinh`, `ktKHApThu`): điểm GD (mã điểm) → mã thôn → tên ấp; nút "⇅ Sắp lại ấp" (▲ ▼ từng ấp, lưu `D.cauHinh.ktApThu[xã]`), "↺ Về mặc định".
  - **Trọn ấp** (`ktKHMacDinh`): chia dãy ấp (theo thứ tự) vào các tháng, tối thiểu hóa tháng đông nhất, không tách ấp; tháng nhiều hơn ấp → báo tháng chưa có ấp. Tổ mới của ấp đã có tháng tự theo tháng của ấp. Bảng chỉ còn chọn tháng **cả ấp**; ấp đang chia nhiều tháng (kế hoạch cũ) → cảnh báo vàng + "↺ Xếp lại theo ấp".
  - **In theo tháng kiểm tra** (chip 🗓 Kế hoạch → "🖨 In theo tháng kiểm tra" → bấm T…): bảng tổ của tháng (theo ấp) — tỷ lệ món / hộ kiểm tra (xanh ≥ 90%, đỏ dưới), "✎ Chọn hộ" ngay tại chỗ, 🖨 / 📄 Mẫu 06 từng tổ (1 mặt; dưới 90% hỏi "Vẫn in" / "Chọn thêm hộ"; ✓ đã in); 🖨 / 📄 Mẫu 16 cả tháng (2 mặt — mỗi biên bản tờ mới); 🖨 / 📄 Mẫu 04 tháng (2 mặt). Nhắc khi ô Số liệu không phải cuối tháng trước tháng kiểm tra. Hộ chọn sẵn như kiểm tra định kỳ (món giải ngân trước 01/01 năm kiểm tra).
  - **Định kỳ · Mẫu 06 + 16 (chọn tự do)**: không còn tích sẵn tổ theo lịch kế hoạch.
- **Phép thử:** `tests/t134.js` (20 phép).

## 3.139.1 — 09/10/2026 08:00 — Sửa bản In Kế hoạch
- **Anh báo:** in Kế hoạch ra PDF bị lỗi đầu trang (Word không bị).
- **Nguyên nhân:** gạch dưới tên cơ quan (3.138, viền dưới của đoạn) làm bản In nhận nhầm bảng đầu trang là bảng có kẻ khung; ô Quốc hiệu bản In hẹp hơn Word nên "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" xuống dòng.
- **Sửa (`ktXmlHTML`):** chỉ coi là bảng có khung khi có viền bảng / viền ô; trong bảng không khung (đầu trang, khối ký) đoạn ngắn (≤ 60 ký tự) không xuống dòng.
- **Kiểm tra:** t109, t110, t111, t113, t116, t125, t132, hoiquy2 đạt; xem ảnh bản In Kế hoạch ① ②.

## 3.139 — 09/10/2026 01:00 — Mẫu "Dự kiến chia tách tổ"; tên cơ quan góc trái báo cáo
- **Anh yêu cầu / chốt:** mẫu chia tách tổ A4 ngang từ Danh sách hộ vay — bỏ Số KU thay bằng tên vợ/chồng, thêm SĐT, bỏ cột QH (QH / khoanh ghi ngay sau tên, in đậm), cột trống "Tổ mới dự kiến" cạnh tên; sắp theo mã KH (cùng ấp nên không cột ấp); dòng dự kiến 1 dòng, 1 tổ chia tối đa 3 tổ (ghi tên tổ trưởng); ký Tổ trưởng; tối đa 2 trang. Mọi báo cáo app lập ghi "PGD NHCSXH GÒ DẦU" in đậm góc trên trái.
- **Đã làm:**
  - Tab Tổ TK&VV › chọn tổ › báo cáo **"Dự kiến chia tách tổ"** (Xem / In / Excel): mỗi hộ 1 dòng (gộp các món), cột STT · Mã KH · Họ tên người vay (QH / Khoanh in đậm) · **Tổ mới (1/2/3)** (để trống, viền đậm) · Tên vợ / chồng · SĐT · Chương trình · Dư nợ · Nợ lãi · Số dư 105 · Ghi chú; dòng Cộng; dòng "Tổ hiện có n tổ viên, m hộ còn dư nợ. Dự kiến chia tách: (1) … hộ sang tổ … · (2) … · (3) …"; khối ký "TỔ TRƯỞNG" (tên tổ trưởng in sẵn). Tổ trên 46 hộ cỡ 10, trên 56 hộ cỡ 9 → tổ 60 hộ vẫn 2 trang.
  - Báo cáo tab Tổ, Sao kê, Tổng hợp: góc trên trái "**PGD NHCSXH GÒ DẦU**" (thay tên đơn vị trong Cài đặt). Mẫu quy định (06, 16, 04, Kế hoạch, Phân công) giữ tên đơn vị theo mẫu gốc.
- **Phép thử:** `tests/t133.js` (11 phép, có đếm trang bản In tổ 50 / 60 hộ).

## 3.138.1 — 08/10/2026 23:30 — "Đã mở TK" chỉ khách đang vay; hộ đã ra khỏi tổ theo TK 105; Mẫu 06 ngắt trang tự nhiên
- **Anh báo / chốt:**
  - Khách đã tất nợ trước năm 2026 cũng bị ghi "đã mở TK".
  - Trước ngày GD 7/10 đã cho ra khỏi tổ các hộ tất nợ nhưng Mẫu 31 / Dư nợ chi tiết vẫn còn trong tổ.
  - Mẫu 06 3–5 hộ sang trang cả khối → trang 1 trống nhiều; chữ ký chỉ cần kèm 2 dòng cuối, thống nhất mọi phiếu.
  - Mẫu 06 trắng kẻ trên dòng Cộng phải đậm; xuất Word bị tràn 2 trang (giữ chú thích cuối trang, miễn không tràn).
- **"Đã mở TK":** số TK 105 hệ thống (14 số) có ở mọi khách từng mở 105 → chỉ ghi "đã mở TK" khi khách đang vay (dư nợ / nợ lãi) hoặc có KU chưa giải ngân; khách đã tất nợ giữ như trước 3.138.
- **Ra khỏi tổ (đối chiếu Mẫu 31 ngày 07/10 thật, 4 hộ tổ Nguyễn Văn Hết):** Mẫu 31 mỗi dòng là 1 món vay, "Mã tổ" là tổ lúc vay → món tất toán vẫn mang tổ cũ. Dấu hiệu thật là **TK 105**: hộ còn trong tổ thì TK 105 nằm trên dòng của tổ; hộ đã ra thì TK 105 tách sang dòng riêng **Mã tổ 0** hoặc **đã đóng**. Quy tắc: khách đã tất nợ (mọi món Đã đóng, dư nợ 0, lãi 0) mà TK 105 không còn gắn tổ → **không tính tổ viên**, hiện ở chip **Ra khỏi tổ** với "Đi đâu" = "tất nợ, TK 105 không còn gắn tổ" / "tất nợ, đã đóng TK 105"; báo cáo TK 105 của tổ cũng bỏ; ② Kiểm tra số liệu có dòng đếm. Khách đang vay, vay trực tiếp không đổi. File 07/10: 499 khách (477 tách, 22 đóng); tổ Hết còn 50 tổ viên, 3 hộ anh cho ra nằm ở Ra khỏi tổ, hộ "Chờ vay lại" vẫn trong tổ.
- **Mẫu 06 ngắt trang (mọi phiếu, Word + In):** mỗi hộ không cắt; Cộng đi liền hộ cuối; "Nhận xét:" đi liền dòng 1; **"Biện pháp xử lý" + dòng ngày đi liền chữ ký**; các dòng khác tự chảy. Bản In: phần nhận xét ra ngoài bảng để chia trang được. Phiếu 5 hộ: trang 1 = 5 hộ + Cộng + nhận xét, trang 2 = Biện pháp + ngày + ký.
- **Kẻ dòng:** dòng hộ đầu (giáp tiêu đề) cạnh trên và dòng hộ cuối (giáp Cộng) cạnh dưới nét đen 0,5 pt; giữa các dòng hộ vẫn xám mảnh.
- **Mẫu 06 trắng (Word):** giữ chú thích cuối trang; chừa thêm khoảng dư — bỏ dòng trống ô Đơn vị kiểm tra, dòng cán bộ 14 pt, nhận xét dòng 12,5 pt.
- **Phép thử:** `t131` 26/26 (thêm khách ra tổ: TK 105 tách / đã đóng, lý do Ra khỏi tổ), `t132` 31/31 (ngắt trang Word / In, phiếu 5 hộ 2 trang đúng nội dung, kẻ đen).

## 3.138 — 08/10/2026 22:30 — Làm mới kỳ số liệu; TK 105 "đã mở TK"; KU hủy / chưa giải ngân; chip đến hạn 2 ngày; Mẫu 06 / 04 / Kế hoạch in gọn
- **Anh yêu cầu / chốt:**
  - Chọn kỳ (vd ngày 7/10) mà màn hình còn kỳ cũ (cuối T9) → **nút ⟳ Làm mới cạnh ô "Số liệu"** + **chip "📌 Đang dùng: …"** cho biết máy đang nhận số liệu kỳ nào.
  - Khách có TK 105 nhưng số dư 0 (file chi tiết chưa có số sổ) bị báo nhầm "chưa có TK 105".
  - KU đóng do nhập máy nhầm tổ rồi nhập lại tổ khác vẫn tính vào tổ cũ.
  - KU đã nhập máy chưa giải ngân: xếp riêng, quá 1 tháng (tính theo tháng lịch) cần đóng KU — báo cáo riêng.
  - Chip "Đến hạn tháng sau" phải hiện ngày ĐH theo HĐ và theo GDXA.
  - Mẫu 06: chấm nhạt, kẻ dòng mảnh, phiếu ít hộ in gọn, mẫu trắng cân cột + đủ chỗ ký, mẫu trắng 2 mặt. Mẫu 04: kẻ lòi lề phải (PDF), tên Trưởng đoàn lệch, kiến nghị tùy chọn. Kế hoạch: gạch dưới tên cơ quan ngắn hơn tên, cách chữ vừa phải.
- **Đã làm:**
  - **⟳ Làm mới** (tab Tổ TK&VV, Sao kê, KTGS): áp kỳ đang chọn cho cả 3 tab, bỏ các bộ đã dựng sẵn, đọc lại; chip xanh "Đang dùng: ngày 07/10/2026 · Mẫu 31 …", vàng khi khác kỳ đã chọn.
  - **TK 105:** Mẫu 31 có số tài khoản 105 hệ thống (13–14 số, kể cả số dư 0) = đã mở → không vào chip "Có dư nợ · chưa có TK 105"; ô Số TK 105 ghi **"đã mở TK"** khi chưa có số sổ 10 số (danh sách tổ viên, In / Excel, báo cáo TK 105).
  - **KU hủy / nhập nhầm** = Tình trạng **CLOSE** + Tổng giải ngân = 0 (không dư nợ, không lãi): loại khỏi bảng món vay khi dựng số liệu → không tính tổ viên, tất nợ, mới vào / ra khỏi tổ, giải ngân. ② Kiểm tra số liệu có dòng "KU hủy / nhập nhầm … n KU — đã loại".
  - **KU đã nhập máy chưa giải ngân** = còn mở (OPEN), Tổng giải ngân = 0, dư nợ = 0: không vào "Tất nợ" / "Đề xuất cho ra", ghi chú "Chưa giải ngân". **Sao kê › Nợ cần xử lý › "KU đã nhập máy chưa giải ngân"**: Tổ · Xã · Hội · Mã KH · Họ tên · Số KU · Chương trình · Mức vay · Ngày vay (nhập máy) · Số ngày · Ghi chú; **quá 1 tháng** (ngày vay + 1 tháng lịch, 31/01 → 28/02, so với ngày số liệu) tô nền, ghi "Quá 1 tháng — cần đóng KU", xếp đầu; Xem / In / Excel theo phạm vi.
  - **Chip "Đến hạn tháng sau":** 2 cột "ĐH theo HĐ (gia hạn)" và "ĐH theo GDXA · ghi chú" từng món: "đã quá ĐH HĐ — chưa chuyển QH do ngày GD xã" / "ĐH HĐ T10, chuyển QH ngày 07/11" / "chuyển QH ngày …" (màn hình, In, Excel).
  - **Mẫu 06** (Word + bản In): chấm / dòng chấm tab không đậm, xám nhạt; kẻ ngang giữa các dòng hộ mảnh, xám (khung, đường dọc, tiêu đề, dòng Cộng giữ 0,5 pt); bản In nét 0,5 pt như Word; tiêu đề cột cỡ 11 (ô cột tiền hẹp cỡ 10, lề trong ô hẹp lại; "Ký xác nhận…" bỏ phông "Times New Roman Bold"); "Biện pháp xử lý" 1 dòng rưỡi chấm, **"Ngày … tháng … năm" đưa lên nửa phải dòng chấm 2**; chừa 3 dòng ký khi không in sẵn tên; giãn dòng gọn hơn. Mẫu trắng: **Họ tên = Mục đích = Vào việc** (tổng 3 cột giữ nguyên, cột tiền không hẹp), nhận xét cỡ 12. Kết quả đo (LibreOffice + Chrome): phiếu 1 / 2 / 5 hộ = 1 trang; trắng 1 mặt (4 dòng) = 1 trang; trắng 2 mặt (21 dòng) = 2 trang. Phiếu nhiều hộ giữ cách ngắt trang cũ (khối cuối liền chữ ký).
  - **Mẫu 04:** bảng mục II bản In không tràn lề phải (97,3% + lùi 2,7%); Trưởng đoàn: chức danh và tên cùng 1 điểm canh giữa (Word); gạch dưới tên đơn vị (1/3–1/2 dòng chữ, cân giữa); "Kết quả kiểm tra…" bỏ phông "Times New Roman Bold"; **kiến nghị 2d, 2đ, 3a, 3b** chọn ở hộp "Chọn khi in": không tích = **1 dòng chấm** (mặc định, gọn báo cáo), tích = in câu gợi ý (sửa được, app nhớ, ↺ về câu gợi ý). Báo cáo 1 tổ (giả) = 2 trang.
  - **Kế hoạch ① ②:** bỏ 2 đường vẽ cố định ở đầu trang, thay bằng gạch theo độ dài chữ: dưới tên cơ quan 40% dòng chữ, cân giữa, sát chữ; dưới Tiêu ngữ dài bằng dòng chữ; dòng "Số:" và dòng ngày cách gạch 5 pt. Bản In Kế hoạch nay cũng có 2 gạch này.
- **Phép thử:** `tests/t131.js` (22 phép, số liệu) + `tests/t132.js` (27 phép, in ấn — có đếm trang PDF bản In). Số trang Word đo bằng LibreOffice (dữ liệu giả): phiếu 1 / 2 / 5 hộ = 1 trang, trắng 1 mặt = 1, 2 mặt = 2, Mẫu 04 1 tổ = 2.
- **Chưa làm / cần anh thử:** số trang trên **Word thật** (Word và LibreOffice dàn trang hơi khác; mẫu trắng 1 mặt còn dư rất ít — nếu Word đẩy chữ ký sang trang 2 anh báo để thu thêm).

## 3.137 — 14/10/2026 20:00 — Cột Nợ lãi cạnh Dư nợ (Tổ TK&VV, TK 105)
- **Anh yêu cầu (gấp):** ở các báo cáo TK 105 / cho ra khỏi tổ, hiện cột Nợ lãi ngay cạnh cột Dư nợ; hộ dư nợ = 0 mà còn nợ lãi vẫn coi là **chưa tất nợ**.
- **Đã làm:**
  - Danh sách tổ viên (cấp tổ và cấp Hội / điểm / xã / PGD — màn hình, In, Excel): thêm cột **Nợ lãi** sau Dư nợ (ô trống khi 0; dư nợ 0 còn lãi tô đỏ), dòng Cộng có tổng nợ lãi.
  - Cột Gợi ý chữ ngắn (anh chốt): "Cho ra", "Vận động vay / tất 105", "Còn lãi — chưa tất nợ" (dư nợ 0 còn lãi); hộ không có gợi ý để trống.
  - **Cột Tổ in trước Họ tên** (anh chốt): danh sách cấp Hội / điểm / xã / PGD, Ra khỏi tổ (Tổ cũ), bảng chi tiết vào / ra. Quy tắc lọc không đổi: "Có dư nợ" đã tính cả còn lãi; "Đề xuất cho ra" chỉ khi đã tất nợ (dư nợ 0, nợ lãi 0) và 105 = 0. Dòng ghi chú cuối báo cáo nói rõ.
  - Ra khỏi tổ (màn hình, In, Excel): thêm cột **Nợ lãi** tháng trước.
  - Báo cáo **TK 105 của tổ**: mục A thêm cột Dư nợ, Nợ lãi; thêm mục **A2 "Dư nợ 0 nhưng còn nợ lãi"** (khách còn 105) — chưa tất nợ, chưa xem xét cho ra.
- **Chip (anh chốt sau khi xem):** bỏ 2 chip "Không dư nợ · còn 105" và "Đề xuất cho ra"; chip "Không dư nợ" đổi tên **"Tất nợ · còn TK 105"** (gồm 105 có số dư và = 0). Không tô màu sặc sỡ: bỏ nền vàng / đỏ, thay bằng **nền nhạt xen kẽ theo tổ** (danh sách cấp Hội / điểm / xã / PGD, màn hình + In) để phân biệt tổ; TK 105 **trên 100.000 đ** in đậm số. Gợi ý "Vận động vay…" đổi thành **"Chờ vay lại"**. Cột **Gợi ý đổi tên "Ghi chú"**: màn hình ghi chữ ngắn, **In / Excel để trống** để ghi tay. Hộ còn nợ lãi tính như còn dư nợ ở mọi chỗ đếm (cả bảng chỉ tiêu tổ / danh sách hộ vay).
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
