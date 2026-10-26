# Từ điển cột file hệ thống (tự sinh — `python3 tools/cot_mau.py`)

> Anh 26/10: "các tên cột của Mẫu 31 và các mẫu em luôn lưu trong code để suy luận khi cần, không cần nạp lại file để test".
> Tên cột lấy từ file GIẢ trong `tests/` (đúng khuôn file thật). **Trường app**: tên trường sau khi nạp (`SL_TRUONG` trong `js/22-so-lieu.js`, khớp tên cột đã bỏ dấu, viết thường).
> Mẫu 31 giữ **mọi** cột: cột chưa khai báo lưu là `c_<tên chuẩn>` (vd `c_thu_lai_th_thang`) → dùng thêm cột KHÔNG cần nạp lại file. Muốn tên ngắn thì khai báo thêm vào `SL_TRUONG` (dữ liệu cũ vẫn đọc qua `c_…`).

## Mẫu 31 · Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu (175 cột) — loại `hstd`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã CN | `cn` |
| 2 | Mã PGD | `pgd` |
| 3 | Tên PGD | `c_ten_pgd` |
| 4 | Mã xã | `xa` |
| 5 | Tên xã | `tenXa` |
| 6 | Mã thôn | `thon` |
| 7 | Tên thôn | `tenThon` |
| 8 | Mã KH | `kh` |
| 9 | Tên KH | `ten` |
| 10 | Ngày sinh | `ns` |
| 11 | Phân loại | `c_phan_loai` |
| 12 | Loại KH | `c_loai_kh` |
| 13 | Giới tính | `gt` |
| 14 | Mã dân tộc | `c_ma_dan_toc` |
| 15 | Tên DT | `danToc` |
| 16 | Số CMND | `cccd` |
| 17 | Nơi cấp CMND | `noiCap` |
| 18 | Ngày cấp CMND | `ncap` |
| 19 | Tên vợ/chồng | `voChong` |
| 20 | Địa chỉ | `dc` |
| 21 | Số điện thoại | `sdt` |
| 22 | Mã tổ | `to` |
| 23 | Loại tổ | `loaiTo` |
| 24 | Mã CIF TT | `ttKH` |
| 25 | Tên tổ | `toTen` |
| 26 | Mã ĐVUT | `dv` |
| 27 | Tên ĐVUT | `tenDv` |
| 28 | Số khế ước | `ku` |
| 29 | Ngày vay | `nv` |
| 30 | Ngày ĐH theo hợp đồng | `dhg` |
| 31 | Ngày ĐH theo Gia hạn | `dhgh` |
| 32 | Ngày ĐH theo GDXA | `dhgd` |
| 33 | Thời hạn vay | `thoiHan` |
| 34 | Lãi suất | `ls` |
| 35 | Ngày B đầu trả gốc | `c_ngay_b_dau_tra_goc` |
| 36 | Ngày B đầu trả lãi | `c_ngay_b_dau_tra_lai` |
| 37 | Ngày KTAHSV | `c_ngay_ktahsv` |
| 38 | Ngày GDXA | `ngayGD` |
| 39 | Hình thức vay | `c_hinh_thuc_vay` |
| 40 | Tình trạng món vay | `ttMon` |
| 41 | Cấp QL vốn | `c_cap_ql_von` |
| 42 | Tên cấp QLV | `c_ten_cap_qlv` |
| 43 | Đối tượng thụ hưởng | `c_doi_tuong_thu_huong` |
| 44 | Tên ĐTTH | `c_ten_dtth` |
| 45 | Mã sản phẩm cụ thể | `c_ma_san_pham_cu_the` |
| 46 | Mã SP tín dụng | `c_ma_sp_tin_dung` |
| 47 | Mã DM sản phẩm | `c_ma_dm_san_pham` |
| 48 | Nguồn vốn | `nguon` |
| 49 | Mã chương trình | `ct` |
| 50 | Tên chương trình | `ctTen` |
| 51 | Mã Quyết định | `c_ma_quyet_dinh` |
| 52 | Tên Quyết định | `c_ten_quyet_dinh` |
| 53 | Mức vay | `mucVay` |
| 54 | Tổng giải ngân | `gn` |
| 55 | Ngày GN đầu tiên | `ngn` |
| 56 | Ngày GN cuối cùng | `c_ngay_gn_cuoi_cung` |
| 57 | Dư nợ trong hạn | `th` |
| 58 | Dư nợ quá hạn | `qh` |
| 59 | Dư nợ khoanh | `kn` |
| 60 | Tổng dư nợ | `dn` |
| 61 | Gốc đến hạn LK | `c_goc_den_han_lk` |
| 62 | Gốc đã trả | `c_goc_da_tra` |
| 63 | Gốc xóa | `c_goc_xoa` |
| 64 | Lãi xóa | `c_lai_xoa` |
| 65 | Lũy kế thu lãi | `c_luy_ke_thu_lai` |
| 66 | Lũy kế thu lãi TH | `c_luy_ke_thu_lai_th` |
| 67 | Lãi tồn TH | `ltTH` |
| 68 | Lũy kế thu lãi QH | `c_luy_ke_thu_lai_qh` |
| 69 | Lãi tồn QH | `ltQH` |
| 70 | Lãi DT chưa đến hạn | `c_lai_dt_chua_den_han` |
| 71 | Lãi DT trong tháng | `c_lai_dt_trong_thang` |
| 72 | Lãi TT trong tháng | `c_lai_tt_trong_thang` |
| 73 | Thu lãi TH tháng | `c_thu_lai_th_thang` |
| 74 | Thu lãi QH Tháng | `c_thu_lai_qh_thang` |
| 75 | Giải ngân trong tháng | `gnT` |
| 76 | Đảo khoản GN tháng | `dkT` |
| 77 | Lưu vụ trong tháng | `c_luu_vu_trong_thang` |
| 78 | Gia hạn trong tháng | `c_gia_han_trong_thang` |
| 79 | Chuyển QH trong tháng | `cqh` |
| 80 | Chuyển khoanh trong tháng | `c_chuyen_khoanh_trong_thang` |
| 81 | Thu nợ TH tháng | `tnTH` |
| 82 | Thu nợ QH tháng | `tnQH` |
| 83 | Thu nợ khoanh tháng | `tnK` |
| 84 | Gốc xóa trong tháng | `xoaT` |
| 85 | Lãi DT Quý | `c_lai_dt_quy` |
| 86 | Lãi TT Quý | `c_lai_tt_quy` |
| 87 | Thu lãi TH Quý | `c_thu_lai_th_quy` |
| 88 | Thu lãi QH Quý | `c_thu_lai_qh_quy` |
| 89 | Giải ngân trong Quý | `c_giai_ngan_trong_quy` |
| 90 | Đảo khoản GN Quý | `c_dao_khoan_gn_quy` |
| 91 | Lưu vụ trong Quý | `c_luu_vu_trong_quy` |
| 92 | Gia hạn trong Quý | `c_gia_han_trong_quy` |
| 93 | CQH trong Quý | `c_cqh_trong_quy` |
| 94 | Chuyển Khoanh Quý | `c_chuyen_khoanh_quy` |
| 95 | Thu nợ TH Quý | `c_thu_no_th_quy` |
| 96 | Thu nợ QH Quý | `c_thu_no_qh_quy` |
| 97 | Thu nợ Khoanh Quý | `c_thu_no_khoanh_quy` |
| 98 | Gốc xóa trong Quý | `c_goc_xoa_trong_quy` |
| 99 | Lãi DT Năm | `c_lai_dt_nam` |
| 100 | Lãi TT Năm | `c_lai_tt_nam` |
| 101 | Thu lãi TH Năm | `c_thu_lai_th_nam` |
| 102 | Thu lãi QH Năm | `c_thu_lai_qh_nam` |
| 103 | Giải ngân Năm | `c_giai_ngan_nam` |
| 104 | Đảo khoản GN Năm | `c_dao_khoan_gn_nam` |
| 105 | Lưu vụ Năm | `c_luu_vu_nam` |
| 106 | Gia hạn Năm | `c_gia_han_nam` |
| 107 | CQH Năm | `c_cqh_nam` |
| 108 | Chuyển Khoanh Năm | `c_chuyen_khoanh_nam` |
| 109 | Thu nợ TH Năm | `c_thu_no_th_nam` |
| 110 | Thu nợ QH Năm | `c_thu_no_qh_nam` |
| 111 | Thu nợ Khoanh Năm | `c_thu_no_khoanh_nam` |
| 112 | Xóa trong Năm | `c_xoa_trong_nam` |
| 113 | Tài khoản TH | `c_tai_khoan_th` |
| 114 | Tài khoản QH | `c_tai_khoan_qh` |
| 115 | Tài khoản khoanh | `c_tai_khoan_khoanh` |
| 116 | Tài khoản thu lãi | `c_tai_khoan_thu_lai` |
| 117 | Tổng thu nợ TH | `c_tong_thu_no_th` |
| 118 | Tổng thu nợ QH | `c_tong_thu_no_qh` |
| 119 | Tổng thu nợ Khoanh | `c_tong_thu_no_khoanh` |
| 120 | Tổng gia hạn nợ | `ghT` |
| 121 | Số lần đã gia hạn | `c_so_lan_da_gia_han` |
| 122 | Ngày GH gần nhất | `c_ngay_gh_gan_nhat` |
| 123 | Số tháng đã GH | `c_so_thang_da_gh` |
| 124 | Tổng chuyển nợ QH | `c_tong_chuyen_no_qh` |
| 125 | Ngày CNQH gần nhất | `c_ngay_cnqh_gan_nhat` |
| 126 | Tổng chuyển nợ khoanh | `c_tong_chuyen_no_khoanh` |
| 127 | Ngày hết hạn Khoanh | `nhh` |
| 128 | Gốc hết hạn Khoanh | `c_goc_het_han_khoanh` |
| 129 | Ngày lưu vụ | `c_ngay_luu_vu` |
| 130 | Tồn RPA | `c_ton_rpa` |
| 131 | Ngày giao dịch gần nhất | `ngdg` |
| 132 | Ngày dự thu | `c_ngay_du_thu` |
| 133 | Tổng Lãi phải HT | `c_tong_lai_phai_ht` |
| 134 | Lãi chưa hỗ trợ | `c_lai_chua_ho_tro` |
| 135 | Chuẩn nghèo ĐP | `c_chuan_ngheo_dp` |
| 136 | Mã nhà đầu tư | `ndt` |
| 137 | Mã PNKT51 | `c_ma_pnkt51` |
| 138 | Tên PNKT51 | `c_ten_pnkt51` |
| 139 | Mã PNKT52 | `c_ma_pnkt52` |
| 140 | Mã HQĐT | `c_ma_hqdt` |
| 141 | Tên HQĐT | `c_ten_hqdt` |
| 142 | Giá trị HQĐT1 | `c_gia_tri_hqdt1` |
| 143 | Giá trị HQĐT2 | `c_gia_tri_hqdt2` |
| 144 | Ký quý | `c_ky_quy` |
| 145 | Mục đích nhà | `c_muc_dich_nha` |
| 146 | Mục đích 30A | `c_muc_dich_30a` |
| 147 | Mã dự án | `c_ma_du_an` |
| 148 | Mã HSSV | `c_ma_hssv` |
| 149 | Tên HSSV | `c_ten_hssv` |
| 150 | CMND HSSV | `c_cmnd_hssv` |
| 151 | Mã trường HSSV | `c_ma_truong_hssv` |
| 152 | Tên trường | `c_ten_truong` |
| 153 | Mã Hệ đào tạo | `c_ma_he_dao_tao` |
| 154 | Tên Hệ ĐT | `c_ten_he_dt` |
| 155 | Mã ngành ĐT | `c_ma_nganh_dt` |
| 156 | Tên Ngành ĐT | `c_ten_nganh_dt` |
| 157 | Mã ĐT học phí | `c_ma_dt_hoc_phi` |
| 158 | Tên ĐT học phí | `c_ten_dt_hoc_phi` |
| 159 | Ngày nhập học | `nhapHoc` |
| 160 | Ngày ra trường | `raTruong` |
| 161 | Số ATM | `c_so_atm` |
| 162 | Đơn vị cấp thẻ | `c_don_vi_cap_the` |
| 163 | Tên LĐXK | `c_ten_ldxk` |
| 164 | Ngày sinh LĐXK | `c_ngay_sinh_ldxk` |
| 165 | Số thẻ LĐXK | `c_so_the_ldxk` |
| 166 | Ngày hợp đồng XK | `c_ngay_hop_dong_xk` |
| 167 | Ngày hết hạn XK | `c_ngay_het_han_xk` |
| 168 | Lĩnh vực LĐXK | `c_linh_vuc_ldxk` |
| 169 | Công ty xuất khẩu | `c_cong_ty_xuat_khau` |
| 170 | Quốc gia xuất khẩu | `c_quoc_gia_xuat_khau` |
| 171 | Tên Quốc Gia | `c_ten_quoc_gia` |
| 172 | Công ty môi giới XK | `c_cong_ty_moi_gioi_xk` |
| 173 | Sổ tiết kiệm 105 | `stk` |
| 174 | Số dư tiền gửi 105 | `t105` |
| 175 | Ngày số liệu | `nbc` |

## Nợ quá hạn — loại `nqh`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã PGD | `pgd` |
| 2 | Mã xã | `xa` |
| 3 | Tên xã | `tenXa` |
| 4 | Thôn | `thon` |
| 5 | Mã điểm GD | `diem` |
| 6 | Tên điểm GD | `tenDiem` |
| 7 | Mã tổ | `to` |
| 8 | Tên tổ trưởng | `toTen` |
| 9 | ĐVUT | `dv` |
| 10 | Tên ĐVUT | `tenDv` |
| 11 | Mã khách hàng | `kh` |
| 12 | Tên khách hàng | `ten` |
| 13 | Số khế ước | `ku` |
| 14 | Dư nợ quá hạn | `qh` |
| 15 | Chuyển QH trong tháng | `cqh` |
| 16 | Ngày chuyển quá hạn | `ncqh` |
| 17 | Nguồn vốn | `nguon` |
| 18 | Chương trình | `ct` |
| 19 | Chương trình VT | `ctVT` |
| 20 | Tên Chương trình | `ctTen` |
| 21 | Số dư 105 | `t105` |
| 22 | Ngày báo cáo | `nbc` |

## Nợ khoanh — loại `nk`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã PGD | `pgd` |
| 2 | Ngày GDXA | `ngayGD` |
| 3 | Điểm GDXA | `diem` |
| 4 | Tên điểm GDXA | `tenDiem` |
| 5 | Mã xã | `xa` |
| 6 | Tên xã | `tenXa` |
| 7 | Mã khách hàng | `kh` |
| 8 | Tên khách hàng | `ten` |
| 9 | Mã tổ | `to` |
| 10 | Tên tổ trưởng | `toTen` |
| 11 | Số khế ước | `ku` |
| 12 | ĐVUT | `dv` |
| 13 | Dư nợ khoanh | `kn` |
| 14 | Ngày hiệu lực | `nhl` |
| 15 | Ngày hết hạn khoanh | `nhh` |
| 16 | Nguồn vốn | `nguon` |
| 17 | Chương trình | `ct` |
| 18 | Tên chương trình | `ctTen` |
| 19 | Nguyên nhân | `nn` |

## Món vay 3 tháng không hoạt động (mẫu 14) — loại `khd`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã CN | `cn` |
| 2 | Mã PGD | `pgd` |
| 3 | Mã thôn/ấp | `thon` |
| 4 | Mã điểm GDX | `diem` |
| 5 | Tên điểm GDX | `tenDiem` |
| 6 | ĐVUT | `dv` |
| 7 | Mã tổ | `to` |
| 8 | Tên tổ trưởng | `toTen` |
| 9 | Mã khách hàng | `kh` |
| 10 | Tên khách hàng | `ten` |
| 11 | Số khế ước | `ku` |
| 12 | Mã sản phẩm | `sp` |
| 13 | Ngày đăng ký khoản vay | `ndk` |
| 14 | Ngày giải ngân đầu tiên | `ngn` |
| 15 | Ngày đến hạn gốc | `dhg` |
| 16 | Ngày đến hạn GH | `dhgh` |
| 17 | Ngày đến hạn GDXA | `dhgd` |
| 18 | Chương trình | `ct` |
| 19 | Tổng dư nợ | `dn` |
| 20 | Dư nợ trong hạn | `th` |
| 21 | Dư nợ quá hạn | `qh` |
| 22 | Dư nợ khoanh | `kn` |
| 23 | Ngày giao dịch gần nhất | `ngdg` |
| 24 | Lãi đã thu | `ldt` |
| 25 | Lãi tồn | `lt` |

## Tổng dư nợ theo chương trình — loại `tdn`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã PGD | `pgd` |
| 2 | Nguồn vốn | `nguon` |
| 3 | Mã xã | `xa` |
| 4 | Tên xã | `tenXa` |
| 5 | Mã điểm giao dịch | `diem` |
| 6 | Điểm giao dịch | `tenDiem` |
| 7 | Mã Thôn | `thon` |
| 8 | Tên Thôn | `tenThon` |
| 9 | Chương Trình | `ct` |
| 10 | Chương trình VT | `ctVT` |
| 11 | Tên Chương trình | `ctTen` |
| 12 | Số KH | `skh` |
| 13 | Tổng Dư nợ | `dn` |
| 14 | DN Trong hạn | `th` |
| 15 | DN Quá hạn | `qh` |
| 16 | DN Khoanh | `kn` |
| 17 | Mã NĐT | `ndt` |
| 18 | Ngày báo cáo | `nbc` |

## Thông tin tổ trưởng (cũ) — loại `tt`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã PGD | `pgd` |
| 2 | Mã xã | `xa` |
| 3 | Tên xã | `tenXa` |
| 4 | Mã điểm GDXA | `diem` |
| 5 | Tên điểm GDXA | `tenDiem` |
| 6 | Ngày GDXA | `ngayGD` |
| 7 | Mã thôn | `thon` |
| 8 | Tên thôn | `tenThon` |
| 9 | ĐVUT | `dv` |
| 10 | Mã tổ trưởng | `to` |
| 11 | Tên tổ trưởng | `toTen` |
| 12 | Năm sinh tổ trưởng | `ns` |
| 13 | SĐT Tổ trưởng | `sdt` |
| 14 | Mã KH tổ phó | `phoKH` |
| 15 | Tên Tổ phó | `phoTen` |
| 16 | Trạng thái | `ttTo` |
| 17 | Loại tổ | `loaiTo` |

## Sao kê TK 104 / TK 105 — "9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)" (đọc riêng js/28 tkSKDoc; cột Sản phẩm = 104 / 105) — loại `tk104 · tk105`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | Mã PGD |  |
| 2 | Mã xã | `xa` |
| 3 | Mã thôn | `thon` |
| 4 | Mã khách hàng | `kh` |
| 5 | Tên khách hàng | `ten` |
| 6 | Tên TK |  |
| 7 | Tài khoản | `stk` |
| 8 | Số Dư Ngày báo cáo | `t105 (số dư ngày BC)` |
| 9 | Số dư tháng trước | `t105d (số dư cuối tháng trước)` |
| 10 | Sản phẩm | `sp` |
| 11 | Ngày đăng ký | `ndk` |
| 12 | Ngày BC | `nbc` |

## Danh sách tổ TK&VV hệ thống (baocao_…, đọc riêng js/28) — loại `dsto`

| # | Tên cột | Trường app |
|---|---|---|
| 1 | NGAYBC | (js/28 dstoDoc) |
| 2 | MADGD | (js/28 dstoDoc) |
| 3 | TENDGD | (js/28 dstoDoc) |
| 4 | MADP | (js/28 dstoDoc) |
| 5 | TENXA | (js/28 dstoDoc) |
| 6 | TENTHON | (js/28 dstoDoc) |
| 7 | DVUT | (js/28 dstoDoc) |
| 8 | TENDVUT | (js/28 dstoDoc) |
| 9 | MATO | (js/28 dstoDoc) |
| 10 | MATT | (js/28 dstoDoc) |
| 11 | TENTT | (js/28 dstoDoc) |
| 12 | CMT | (js/28 dstoDoc) |
| 13 | NGAYCAP | (js/28 dstoDoc) |
| 14 | MOBILE | (js/28 dstoDoc) |
| 15 | NGAYSINHTT | (js/28 dstoDoc) |
| 16 | SOTV | (js/28 dstoDoc) |
| 17 | DUNO | (js/28 dstoDoc) |
| 18 | TK104 | (js/28 dstoDoc) |
| 19 | MATP | (js/28 dstoDoc) |
| 20 | TENTP | (js/28 dstoDoc) |
| 21 | MOBILETP | (js/28 dstoDoc) |

## Ghi chú nghiệp vụ (đã xác minh với anh)

- **Mẫu 31 lãi**: `Lũy kế thu lãi*` = cộng dồn từ khi vay; **trong tháng** = `Lãi DT trong tháng` (dự thu) · `Lãi TT trong tháng` (thực thu) · `Thu lãi TH tháng` + `Thu lãi QH Tháng`; quý / năm có cột riêng.
- **Mẫu 31 gốc trong tháng**: `Thu nợ TH tháng` + `Thu nợ QH tháng` + `Thu nợ khoanh tháng`.
- **TK 105**: Mẫu 31 chỉ có `Số dư tiền gửi 105` tại ngày số liệu (không có số dư đầu tháng) — số dư cuối tháng trước lấy Mẫu 31 chốt tháng trước hoặc Sao kê TK 105 cột `Số dư tháng trước`.
- **Đã kiểm trên file thật 19/10 (chỉ đếm, không lưu số liệu)**: `Tài khoản TH / QH / khoanh / thu lãi` là **tài khoản hạch toán** (212x/252x/213x · 292x/293x · 702x/714x), KHÔNG phải TK 105 → Mẫu 31 không tách được thu qua 105 hay tiền mặt. `Lãi TT trong tháng` = `Thu lãi TH tháng` + `Thu lãi QH Tháng` (gần như mọi món). `Sổ tiết kiệm 105` 13–14 ký tự, khoảng 1/4 món trống.
- Thu lãi bằng chuyển khoản (anh 26/10): khách CK vào TK 105 của mình → ngày GD tổ trưởng trích 105 nộp lãi / gốc. Khách CK vào = (số dư 105 ngày chọn − cuối tháng trước) + thu lãi tháng + thu gốc tháng.
