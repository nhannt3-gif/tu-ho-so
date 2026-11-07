# Bản đồ tài liệu `docs/` — đọc gì, bỏ qua gì (08/11/2026, bản 3.502)

> Mục đích (rà soát 08/11, Đợt 1 "gọn nền"): 68 file / 2,5 MB, AI mới vào không biết file nào còn hiệu lực → đọc nhầm kế hoạch cũ, tốn thời gian.
> Luật: **chỉ đọc nhóm A khi bắt đầu**; nhóm B khi việc đụng tới; nhóm C, D chỉ khi cần tra lịch sử. File mới thêm vào `docs/` phải ghi 1 dòng vào bảng này.

## A. Đang dùng — đọc khi bắt đầu
| File | Nội dung |
|---|---|
| `../AGENTS.md` · `../CLAUDE.md` | Luật chung mọi AI · luật riêng Claude |
| `TRANG_THAI_CHUNG.md` (tự sinh) | Trạng thái chung App · Giao ban, chờ anh, hộp thư mở |
| `nhat_ky/APP.md` (mục đầu) | Nhật ký vai App chính: đã làm, đang dở, bước tiếp, bẫy |
| `BAT_DAU.md` | Lệnh, quy trình mỗi bản, trạng thái `main` |
| `QUY_CHUAN_KIEN_TRUC.md` | Luật kiến trúc + sổ quy tắc QT (bắt buộc mọi thay đổi) |
| `BAN_DO_MA.md` (tự sinh) | Tìm code theo chức năng |

## B. Tra khi việc đụng tới
| File | Khi nào |
|---|---|
| `PHOI_HOP_CHUNG.md` · `QUY_TAC_SO_LIEU.md` | Nạp file, kho số liệu, luật số liệu chung (App ↔ Giao ban), hộp thư |
| `PHOI_HOP_TK2_TK3.md` | Số bản / phân file khi 2 TK cùng làm app |
| `COT_FILE_MAU.md` (tự sinh) · `DU_LIEU_THANG.md` · `FILE_XUAT_HANG_THANG.md` | Tên cột file hệ thống, bộ file tháng |
| `BAN_GIAO_KTGS.md` | Trước khi sửa KTGS (mẫu khóa, cửa số liệu, VB 727) |
| `QUY_TAC_SOAN_MAU.md` · `GOP_Y_MAU.md` | Soạn / sửa mẫu in |
| `KE_HOACH_PHAN_BO_KH.md` | Tab 🎯 Phân bổ kế hoạch |
| `SO_CAU_HINH.md` (tự sinh) | Khóa cấu hình `D.cauHinh` — chủ, chỗ dùng (3.502) |
| `DA_CHOT.md` (tự sinh) | Phép thử đã chốt (hồi quy theo đổi) |
| `DO_TOC_DO.md` | Số đo tốc độ, đề xuất tốc độ chưa làm |
| `BAN_GIAO_VIEC_CON_LAI.md` | Bảng thử máy thật từng bản + ghi chú kỹ thuật (grep, không đọc cả) |
| `CHANGELOG.md` | Thay đổi từ 01/11/2026 (grep). Trước đó: `luu_tru/CHANGELOG_DEN_3110.md` |
| `KIEN_TRUC_3_LOP.md` | Nền tảng kiến trúc (lý do của QUY_CHUAN) |

## C. Kế hoạch còn việc dở — chỉ đọc mục còn mở
| File | Còn gì |
|---|---|
| `KE_HOACH_DON_NEN.md` | Dọn nền theo nhịp (Đ4 onclick, Đ7 dòng dài — làm dần khi đụng file) |
| `KE_HOACH_NANG_CAP_0111.md` · `KE_HOACH_KY_DOI_CHIEU.md` | Nâng cấp kỹ thuật 01/11 · kỳ đối chiếu app ↔ giao ban |
| `KE_HOACH_CHUAN_HOA.md` · `KE_HOACH_BAN_LON.md` · `KE_HOACH_GON_GIAO_DIEN.md` | Chuẩn hóa code / mẫu / giao diện (nhiều mục đã xong — code còn trỏ tới) |
| `TU_VAN_KY_THUAT.md` · `RA_SOAT_HOI_QUY.md` · `THIET_KE_HO_VAY.md` | Tư vấn kỹ thuật, rà phép thử, thiết kế dữ liệu hộ vay |
| `DAC_TA_APP_SCAN_EXE.md` · `KE_HOACH_DIEN_THOAI_2.md` · `KE_HOACH_DIEN_THOAI_MAY.md` | Scan .exe, bản điện thoại (vai App phụ) |

## D. Lịch sử — KHÔNG đọc khi bắt đầu (kế hoạch / rà soát / bàn giao đã xong; code cũ còn trỏ tới nên giữ chỗ)
`BAN_GIAO_3161` · `BAN_GIAO_TK3_2710` · `KE_HOACH_3206` · `KE_HOACH_3207` · `KE_HOACH_3208` · `KE_HOACH_3209` · `KE_HOACH_3224_SCAN` · `KE_HOACH_3225_LUU` · `KE_HOACH_3228` · `KE_HOACH_B_C` · `KE_HOACH_CAY_DIA_BAN` · `KE_HOACH_CHOT_SO` · `KE_HOACH_DANG_KY` · `KE_HOACH_DIEU_HUONG` · `KE_HOACH_HO_SO_TO` · `KE_HOACH_KBR` · `KE_HOACH_KHO_KTGS` · `KE_HOACH_KIEM_TRA_KY` · `KE_HOACH_KTGS_GON` · `KE_HOACH_SO_HO_VAY` · `KE_HOACH_TEN_LUU_HO_SO_VAY` · `KIEM_KE_GIAO_DIEN` · `RA_SOAT_BO_CUC_2410` · `RA_SOAT_BO_CUC_2510` · `RA_SOAT_CHU_DAI` · `RA_SOAT_HUONG_DI_2510` · `RA_SOAT_KHO_2410` · `RA_SOAT_TONG_THE_2310` · `REVIEW` (bản 3.30) · `AP_KP_CU` · `GIAO_BAN_KY_NANG` (vai Giao ban) · `TEO_*` (chỉ là dòng chuyển tên) · thư mục `luu_tru/`.
