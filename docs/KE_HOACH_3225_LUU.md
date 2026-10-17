# KẾ HOẠCH 3.225 — TÁCH LƯU TRỮ + ĐỒNG BỘ THEO KHỐI (bước 1) — bản 17/10/2026, ĐÃ CHỐT HƯỚNG, chờ anh nhắn "code" (sau 3.224 scan)

> Anh chốt 17/10: theo đề xuất A2 + B2/B1 + C2; Ghi chú → khối Lịch; Chữ ký, CCCD, scan → khối Scan; Số liệu độc lập (chỉ nạp + kiểm tra);
> Theo dõi nợ sau này thành tab / khối riêng; Bộ hồ sơ + mẫu biểu vay = khối Hồ sơ; tab Mẫu biểu chuyển sang Giao dịch xã (bước 2);
> bản cũ `chimuc.json` / `cauhinh.json` vẫn ghi cho máy chưa cập nhật **đến khi anh tự tắt**.
> Bước 1 (bản này) **không đổi giao diện, không đổi mã các tab** — chỉ thay lớp lưu bên dưới. Bước 2 (bản sau, từng khối): đưa mã tab vào sau cửa khối, tách app Văn bản, Mẫu biểu sang GDX.

## 1. Các khối
| Khối | Dữ liệu (hiện ở đâu → về đâu) | Đọc ai |
|---|---|---|
| 📄 Văn bản | `D.vanBan`, `D.cho`, `D.ganDay`, `D.nguonCau`, file PDF (`tuhoso_file`), cài đặt phân loại / thẻ | không ai |
| 📅 Lịch | `D.lich`, `D.ghiChu`, `lich.json` | không ai |
| 📷 Scan | `D.scan`, `D.kyAnh`, ảnh `hs_*`, `ln_tm_*` | không ai |
| 📊 Số liệu | `sl_meta`, `sl_danhba`, file Mẫu 31 / sao kê / 01/TV (`D.duLieu`), `tkChon`, `ccNho`, `tk104Tay` | **không ai** (chỉ cung cấp qua `KHO`) |
| 📁 Hồ sơ | `D.boHS`, `hsoKB`, `hsoO`, sổ hộ vay `hoMoi`, khai báo mẫu Hồ sơ vay / Tổ | Số liệu (qua `KHO`), Chung |
| 🏦 Giao dịch xã | khai báo `gdx`, `D.bieuMau` (mẫu biểu chuẩn) | Số liệu (qua `KHO`), Chung |
| 🔍 KTGS | `ktHoiKB`, `ktChuan`, `ktKBLuu`, `ktPC`, `ktIn`, `ktMucDich`, `ktNhanXet` | Số liệu (qua `KHO`), Chung |
| 💰 Theo dõi nợ | `tdn_du_lieu`, `theodoino.json` — **giữ nguyên chỗ** đến khi phát triển tab | — |
| ⚙ Chung | PGD / đơn vị / cán bộ dùng chung, dấu xóa (`daXoaHan`), cài đặt riêng máy (`CH_RIENG`) | mọi khối đọc |

- Bảng **khóa cài đặt → khối** (`KHOI_KHOA`) ghi 1 chỗ; khóa chưa có trong bảng → khối Chung (không mất).
- Thùng rác theo khối (mục mang `khoCu` → về rác của khối đó); dấu xóa dùng chung (nhỏ).

## 2. Lưu trong máy (C2)
- Mỗi khối 1 kho IndexedDB riêng: `tuhoso_k_vanban`, `…_lich`, `…_scan`, `…_solieu`, `…_hoso`, `…_gdx`, `…_ktgs`, `…_chung`; mỗi kho: `du_lieu` (theo ngăn như 3.223) + `meta` (dấu bản, phiên bản cấu trúc).
- Chuyển 1 lần từ kho ngăn 3.223 (`tuhoso_ngan`) + localStorage; **giữ bản cũ 30 ngày**, ↩ dùng lại; công tắc quay lại cách 3.223.
- Giữ các lưới an toàn 3.223: localStorage trống / bị xóa không coi là máy mới; IndexedDB bị chặn → cách cũ; xóa sạch máy bỏ mọi kho.
- `D.*` trong bộ nhớ **giữ nguyên** (293 chỗ `luu()` không sửa) — lớp lưu tự chia ra khối khi ghi, ghép lại khi đọc.

## 3. Đồng bộ Drive (A2 + B2 / B1)
- `_Hệ thống/<khối>/`: `caidat.json` (cài đặt của khối — **cùng cách gộp từng khóa** như `cauhinh.json`), `muc_luc.json` (mã mục → dấu băm, giờ sửa; dấu băm từng lô).
- **B2** (Văn bản, Scan — nhiều mục): dữ liệu chia lô (Văn bản theo năm, Scan theo tháng) → chỉ tải lên / về **lô đổi**.
- **B1** (Lịch, Hồ sơ, GDX, KTGS — nhỏ): 1 file dữ liệu / khối.
- Số liệu: **giữ cách đang chạy** (file gốc trên Drive + `meta.json`, `khach_hang.json`).
- Mỗi phút chỉ đọc **mục lục** các khối (nhỏ); khối nào đổi mới tải. Luật gộp **giữ nguyên** (theo mục, bản sửa sau thắng, dấu xóa; cài đặt theo khóa).
- Ghi lô xong mới ghi mục lục (mất mạng giữa chừng không trỏ sai); chặn ghi trống theo từng lô / khối; dự phòng đầu ngày theo khối (7 bản).
- **Chuyển tiếp:** vẫn ghi `chimuc.json` + `cauhinh.json` (tối đa 1 lần / giờ + khi bấm Quét lại) và đọc chúng nếu máy cũ vừa ghi — đến khi anh tắt công tắc "Máy cũ đã cập nhật hết".

## 4. Phép thử
`t187` (mới): 3 máy giả lập + Drive giả (1 máy chạy bản cũ chỉ `chimuc.json` / `cauhinh.json`) — A thêm văn bản, B xóa ghi chú + sửa khai báo Hội, C (cũ) thêm scan → cả 3 hội tụ; đếm lệnh Drive: đổi 1 ghi chú chỉ ghi khối Lịch; đổi 1 văn bản năm 2026 chỉ ghi lô 2026; kéo chỉ lô đổi; mất mạng giữa lô và mục lục; chặn ghi trống; mục đã xóa hẳn không sống lại; chuyển từ 3.223 + giữ bản cũ + quay lại; dữ liệu > 5 MB; localStorage bị xóa. Hồi quy đủ (t93, t117, t136, t182, t185…).

## 5. Rủi ro + ước lượng
Cao (chạm mọi dữ liệu + đồng bộ nhiều máy) — giảm bằng ghi song song bản cũ, công tắc quay lại, bản cũ 30 ngày, phép thử 3 máy. Ước lượng 3–4 phiên. Xong → **bàn giao tài khoản phụ** (`docs/BAN_GIAO_3225.md` + sổ góp ý mẫu `docs/GOP_Y_MAU.md` + `CLAUDE.md`).
