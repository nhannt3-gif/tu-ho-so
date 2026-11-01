# Nhật ký vai: Giao ban

> Hiện do: **TK 1** · Làm ở: Project claude.ai "THHD - Hop giao ban" · Drive `0 Hop giao ban` · ghi repo qua PR nhánh riêng. Bảng vai: `docs/PHOI_HOP_CHUNG.md` mục 1; cách ghi / đổi vai: mục 1a.
> **Mẫu mục** (thêm ở ĐẦU danh sách, mới nhất trên cùng; không dữ liệu khách / tên tổ trưởng / mã tổ):
>
> ```
> ### dd/mm/yyyy hh:mm — TK x · [PHIÊN | BÀN GIAO | NHẬN VAI]
> - Đã làm: … (bản / PR)
> - Đang dở: …
> - Bước tiếp: …
> - Chờ ai: anh / TK … (việc gì)
> - Lưu ý / bẫy: …
> ```

### 01/11/2026 23:15 — TK 1 · PHIÊN (rà kiểm toán Gemini, vai Gemini)
- Đã làm: rà 3 góp ý code + đợt kiểm toán Gemini 01/11 trên file Drive thật (kết quả hộp thư mục 14); anh chốt vai Gemini = kiểm toán và đề xuất, phối hợp ghi ở repo → `PHOI_HOP_CHUNG.md` 1.4 (mục 1, 1b, 1c), `GEMINI.md`, `nhat_ky/GEMINI.md`. Chạy thử `cap_nhat_QTC14.py` trên bản sao `tb_kl.py` / `nd_hop_m08.py` lấy từ Drive: khớp MD5 đích cả 2.
- **Sửa mục NHẬN VAI 08:10:** `tb_kl.py` trên Drive vẫn **3.2**, `nd_hop_m08.py` **chưa vá QT-C-14** (ghi 3.3 / 1.10 là nhầm) — chờ anh chạy `python cap_nhat_QTC14.py` trong `06_CONG_CU\v2`.
- Đang dở: GB-4 (anh chạy bản vá); GB-6 dọn `06_CONG_CU\v2` + README (chờ anh duyệt); tách module đọc chung (sau kỳ đối chiếu).
- Bước tiếp: tóm tắt QĐ 54/QĐ-HĐQT + VB 7442/NHCS-TDNN (gia hạn nợ, C9) vào `_TOM_TAT`; kỳ đối chiếu khi đủ bộ cuối tháng 10.
- Chờ ai: anh (chạy bản vá; duyệt GB-6); TK 2 (GB-5 sổ nạp, APP-1 thu nợ).
- Lưu ý / bẫy: bản lưu `99_LUU_TRU\CLAUDE\nd_hop_m08_v1.9.py` giống hệt file đang dùng có đầu file ghi v1.8 — tên bản lưu lệch số bản trong file, không đổi gì khác.

### 01/11/2026 08:40 — TK 1 · PHIÊN (đổi tên bỏ "Tèo")
- Đã làm: đổi tên kỹ thuật đọc là hiểu — repo `tests/chung/truong_hop_mau.json`, `tools/dap_an_giao_ban.py` (PR nhánh `giao-ban/doi-ten-bo-teo`, phép thử y hệt trước khi đổi, mốc hồi quy 228); Drive `chay_truong_hop_mau.py` 1.2, `doi_chieu_app.py` 1.1 (ra `KQ_DOI_CHIEU_APP_<ngày>.xlsx`), thư mục `00_PHOI_HOP\BAN_GIAO_APP`, bản cũ ở `99_LUU_TRU\CLAUDE`; Quy chuẩn giao ban 2.4 (bỏ "Tèo", tên sổ mới, luật đặt tên đọc là hiểu — mục 6).
- Đang dở: không.
- Bước tiếp: 02/11 số liệu cuối tháng đủ → `bang_so_lieu.py` + `tong_hop.py` kỳ 31/10, so với file app bằng `doi_chieu_app.py`, rồi văn bản tháng 11; áp K4 / QT-C-15 và K9 / QT-C-19 vào script, thêm trường hợp mẫu C15, C19 (file trường hợp mẫu bản 1.3).
- Chờ ai: anh (dán đoạn hướng dẫn Project mới; gộp PR); TK 2 (đổi tên hàm `slDCTeoTinh` khi lên bản app kế tiếp).
- Lưu ý / bẫy: `bang_so_lieu.py`, `tong_hop.py` trên Drive còn chú thích nhắc tên sổ cũ `TEO_*.md` — file trỏ còn tới ~01/12, sửa chú thích ở lần lên bản kế tiếp của từng script, không sửa riêng trước ngày chạy số. Bản `truong_hop_mau.json` trên Drive chép từ bản 1.2 cũ, dòng ghi chú đầu còn ghi đường dẫn cũ (đáp án giống hệt) — chép lại từ repo khi lên 1.3.

### 01/11/2026 08:10 — TK 1 · NHẬN VAI
- Trạng thái: kỹ năng văn bản giao ban đã bàn giao cho App (`GIAO_BAN_KY_NANG.md` 1.1); giao ban vẫn làm văn bản chính thức. Script đang dùng (Drive `06_CONG_CU\v2`): `bang_so_lieu.py` 1.7, `tong_hop.py` 2.22, `tb_kl.py` 3.3, `nd_hop_m08.py` 1.10; Quy chuẩn giao ban 2.3 → 2.4.
- Việc dở: kỳ đối chiếu 31/10 (số liệu đủ 02/11); văn bản tháng 11; sửa đáp án C09-1 (đo ở file đối chiếu); trả lời TK 2 cách nhận biết điểm chính / phụ; chạy lại so sánh kỳ 29/10 với app 3.423; tóm tắt văn bản mới trong Tủ hồ sơ (18 văn bản từ 27/10 chưa đọc).
- Chờ anh: K5 (sau kỳ 02/11); C3, C4, C9, C10 (`PHOI_HOP_CHUNG.md` mục 13).
