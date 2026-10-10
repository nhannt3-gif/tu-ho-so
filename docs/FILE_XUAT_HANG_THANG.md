# 📋 FILE CẦN XUẤT HẰNG THÁNG — ghi nhớ cho anh Nhân

> Chốt 10/10/2026 (Q16, Q17). Xuất **ngày cuối tháng** (ngày số liệu = ngày cuối tháng). Nạp ở tab **📥 Nạp & KT** → "📥 Nạp nhiều file".
> Bản trong app: nút **📋 File cần xuất** ở tab Nạp & KT (từ 3.145, có ✓ file tháng đang xem đã có).

## A. Bắt buộc — nguồn dữ liệu của app (3 file)
| # | File | Chọn mẫu khi xuất | Tên file thường gặp | Dùng vào |
|---|---|---|---|---|
| 1 | **Mẫu 31** | **31 – Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu** (175 cột) | `Ho_so_tin_dung_chi_tiet_…` | Số liệu chính: món vay, khách, tổ, tổ trưởng, Hội, ấp, doanh số, nguồn vốn, Quyết định |
| 2 | **Dư nợ chi tiết** (HS chi tiết) | **Dư nợ chi tiết** (169 cột, có cột "Ngày số liệu") | `004820_DU_NO__CHI_tiet_DEN_dd-mm-yyyy_` | Bổ trợ Mẫu 31: **điểm GD**, số TK 105, mục đích vay (Mẫu 31 không có điểm GD) |
| 3 | **DSTO** | **Danh sách tổ TK&VV** | `004820_ddmmyyyy_DSTO` | SĐT tổ trưởng, tổ phó, đủ danh sách tổ (thay file Thông tin tổ trưởng) |

## B. Đối chiếu chuẩn TW — xuất cuối tháng (6 file)
| # | File | Mẫu | Tên file thường gặp | Dùng vào |
|---|---|---|---|---|
| 4 | **BCDHTD 01.1** | 01.1/BCTD — theo xã | `4820_BCDHTD_01.1_ddmmyyyy_…` | Chuẩn **doanh số** theo xã (cho vay, thu nợ, xóa nợ, dư nợ, số KH) · báo cáo tổng quan xã / PGD |
| 5 | **BCDHTD 01.2** | 01.2/BCTD — theo chương trình | `4820_BCDHTD_01.2_ddmmyyyy_…` | Chuẩn theo **chương trình** · báo cáo tổng quan theo CT |
| 6 | **LEN_31 XAPUONG** | Tổng hợp số liệu tín dụng — theo xã | `4820_LEN_31_XAPUONG_ddmmyyyy_…` | Chuẩn dư nợ, số tổ, số hộ theo xã |
| 7 | **LEN_31 DONVIUT** | — theo Hội | `4820_LEN_31_DONVIUT_…` | Chuẩn theo xã × Hội |
| 8 | **LEN_31 CHTRINH** | — theo chương trình | `4820_LEN_31_CHTRINH_…` | Chuẩn theo xã × Hội × chương trình |
| 9 | **LEN_31 TO_TRUONG** | — theo tổ trưởng | `4820_LEN_31_TO_TRUONG_…` | Chuẩn **từng tổ** + cây địa bàn |

**Kiểm tra kỳ báo ✓ Đạt khi đủ 9 file A + B (không còn chốt tháng).**

## C. Phụ — có thì đối chiếu thêm, không bắt buộc
| File | Chọn mẫu | Ghi chú |
|---|---|---|
| **Món vay 3 tháng KHĐ** | **MẪU 14** – "Sao kê món vay N tháng không hoạt động (DL Tháng)" | **Không dùng mẫu 08/KTNB** (cùng số nhưng thiếu điểm GD xã, ngày đến hạn GDXA — app không nhận). App tự tính KHĐ từ Mẫu 31; file chỉ để đối chiếu |
| Nợ quá hạn · Nợ khoanh | sao kê theo PGD | Khoanh: thêm ngày hết hạn khoanh |
| Nợ đến hạn phân kỳ | NOXH · cho vay trực tiếp | Số tiền từng kỳ con (CV 597) |
| Thông tin tổ trưởng | 12. Thông tin tổ trưởng | Không cần xuất hằng tháng (DSTO thay); dữ liệu cũ giữ để tra soát tháng cũ |

## D. Riêng KTGS (khi làm kiểm tra giám sát Hội)
| File | Ghi chú |
|---|---|
| **BC0437** · Thông tin tổ TK&VV do HĐT quản lý | Chấm điểm, xếp loại tổ |
| **BC0438** · Thông tin ủy thác theo xã · hội | Đối chiếu với BC0437 |

## E. KHÔNG cần xuất nữa
B32 · Mẫu 10 · Mẫu 7 · Sao kê khách hàng · KHĐ mẫu 08/KTNB.
