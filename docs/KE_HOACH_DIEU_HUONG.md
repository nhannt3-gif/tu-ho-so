# KẾ HOẠCH — Đợt F: giao diện điều hướng (thanh bên) — chờ anh duyệt

> Soạn 10/10/2026 sau khi gộp 3.145. Hướng chung đã có ở `KIEN_TRUC_3_LOP.md` mục 7.1 + đợt F (mục 8).
> Nguyên tắc: **chỉ đổi cách đi giữa các màn hình** — nội dung từng màn, dữ liệu, phím tắt cũ giữ nguyên; lối cũ (`doiNgan`, `slDoiTab`, `moNapSL`, `moBCSL`) vẫn chạy.

## 1. Hiện nay (3.145)
- Đầu trang: logo · ô tìm · giờ · ❓ 🧰 🗑 ⚙ · **thanh tab ngang** 7 nút: Hôm nay · Văn bản · 📥 Nạp & KT · Số liệu · Biểu mẫu · Scan · Thư viện.
- Bấm **Số liệu** → thêm **thanh tab con** thứ 2: Tổng hợp · Sao kê · Tổ TK&VV · KTGS Hội · Tra cứu KH. Công cụ (HSSV, Địa bàn, CT vay) nằm ở cột phải tab Hôm nay.
- Vướng: 2 tầng tab (mất 1 lần bấm + chỗ dọc trên laptop 730 px); các màn Số liệu "ẩn" sau 1 nút; Công cụ chỉ mở được từ Hôm nay.

## 2. Đề xuất (máy tính, màn ≥ 1100 px)
```
┌──────────────────┬──────────────────────────────────────────────────────────┐
│ TH Tủ hồ sơ   «  │ 🔍 Gõ số văn bản, tên khách, tổ…        10:42 · T7 10/10  │
│──────────────────│──────────────────────────────────────────────────────────│
│ 🏠 Hôm nay       │                                                          │
│ 📄 Văn bản    12 │                                                          │
│ 📥 Nạp & KT   ⚠2 │              nội dung màn đang chọn                      │
│ ─ SỐ LIỆU ─      │        (giữ nguyên như hiện nay, chỉ bỏ thanh tab)       │
│ 📊 Tổng hợp      │                                                          │
│ 📑 Sao kê        │                                                          │
│ 👥 Tổ TK&VV      │                                                          │
│ 🛡 KTGS Hội      │                                                          │
│ 👤 Tra cứu KH    │                                                          │
│ ─ HỒ SƠ ─        │                                                          │
│ 📋 Biểu mẫu      │                                                          │
│ 🪪 Scan          │                                                          │
│ 🖼 Thư viện      │                                                          │
│ ─ CÔNG CỤ ─      │                                                          │
│ 🎓 HSSV · 🗺 Địa bàn · 📚 CT vay                                            │
│──────────────────│                                                          │
│ 🗑 Thùng rác  3  │                                                          │
│ 🧰 Dọn kho       │                                                          │
│ ❓ Hướng dẫn     │                                                          │
│ ⚙ Cài đặt       │                                                          │
└──────────────────┴──────────────────────────────────────────────────────────┘
```
- Thanh bên rộng ~220 px; nút **«** thu gọn còn ~60 px (chỉ biểu tượng, rê chuột hiện tên); app **nhớ** trạng thái thu gọn.
- **Một tầng**: 5 màn Số liệu thành 5 mục riêng trên thanh bên → bỏ thanh tab con; bấm thẳng tới màn cần.
- Số đếm / dấu nhắc cạnh mục: Văn bản (chờ duyệt), Nạp & KT (⚠ thiếu file bắt buộc tháng mới nhất), Thùng rác.
- Đầu trang gọn lại: ô tìm + giờ (bỏ hàng nút ❓ 🧰 🗑 ⚙ — chuyển xuống chân thanh bên).
- Màn hẹp (700–1100 px, vd laptop 125%): thanh bên tự thu gọn 60 px.
- **Điện thoại (< 700 px): giữ nguyên thanh tab ngang như hiện nay** (KIEN_TRUC Q7: giao diện điện thoại giữ đến khi làm mini app).

## 3. Cách làm (kỹ thuật)
- File mới `js/23-dieu-huong.js` + phần CSS: 1 bảng khai `DH_MUC = [{k, ten, bt, mo:function(){…}, dem:function(){…}}]` → vẽ thanh bên; mỗi mục gọi đúng lối cũ (`doiNgan(i)`, `slDoiTab(k)`, `moNapSL()`, `ccMo('hssv')`…). Tô mục đang mở theo `nganHienTai` + `D.cauHinh.slTab` (thay `toNutSL`).
- `index.html`: thêm khung `<nav id="thanh-ben">`; thanh tab ngang + thanh tab con **chỉ ẩn bằng CSS** ở màn ≥ 1100 px (điện thoại vẫn dùng) → không phá lối cũ, phép thử cũ vẫn bấm được.
- Phím tắt mới (đề xuất): Alt+1…9 mở mục theo thứ tự; Ctrl+K đặt con trỏ vào ô tìm.
- Không đổi dữ liệu, không đổi IndexedDB / Drive. Rủi ro: trung bình (bố cục, CSS cột trái / phải, hộp thoại, in).

## 4. Các bước
1. **F1 — ảnh mẫu (mockup)**: dựng thật trên app (dữ liệu giả), chụp 1366×768 · 1536×730 · nền sáng / tối · thanh bên mở / thu gọn → anh chọn. Không gộp.
2. **F2 — code** sau khi anh nhắn "code": thanh bên + đầu trang gọn + nhớ thu gọn + số đếm; phép thử `t142` (mỗi mục mở đúng màn, tô đúng, thu gọn nhớ, điện thoại vẫn tab ngang, lối cũ chạy); hồi quy đủ; ảnh trước / sau 5 màn chính.
3. Số bản: đề xuất **4.0** (mốc bố cục mới, đúng ghi chú đợt F) — hoặc 3.147 nếu anh muốn giữ dãy 3.x.

## 5. Cần anh chốt
1. Gộp 5 màn Số liệu thành **5 mục riêng** trên thanh bên (bỏ thanh tab con) — **đề xuất**; hay giữ 1 mục "Số liệu" + thanh tab con như cũ?
2. **Công cụ** (HSSV, Địa bàn, CT vay): đưa lên thanh bên (mở được từ mọi màn) — **đề xuất**; cột Công cụ ở Hôm nay giữ hay bỏ?
3. **Kỳ + phạm vi chung trên đầu trang** (đổi 1 lần, Tổng hợp / Sao kê / Tổ / KTGS cùng theo): làm luôn trong đợt F, hay để đợt D (đề xuất **để D** — đợt F chỉ đổi điều hướng cho an toàn)?
4. Thứ tự làm: **đợt F trước rồi 3.146** (Kiểm tra kỳ + bỏ mã chốt) — hay 3.146 trước? (đề xuất: 3.146 trước vì nhỏ và đã chốt xong; F làm ngay sau).
5. Số bản 4.0 hay 3.147?
