# ĐÁNH GIÁ CHUYÊN GIA + Ý TƯỞNG MỚI — hiệu suất app, điểm nghẽn, phối hợp App ↔ Giao ban (15/11/2026)

> Anh 15/11: *"đóng vai 1 chuyên gia, đánh giá và góp ý cải thiện, tối ưu hiệu suất của app, chỉ ra điểm nghẽn hiệu suất và công nghệ, góp ý về ý tưởng phối hợp giữa app và giao ban"* · *"cái anh cần ở em là thiên về đánh giá và đề xuất ý tưởng mới"*.
> File này **chỉ là đánh giá + đề xuất** — chưa việc nào được duyệt làm. Việc nào anh chọn → vai tương ứng (App / Giao ban) lên kế hoạch → anh nhắn "code".
> Số đo: máy chủ đám mây, Chromium không giao diện, dữ liệu GIẢ — **chưa đo trên máy / điện thoại thật của anh**. Phần ghi "(suy luận)" là nhận định, không phải số đo.

## 1. Kết luận ngắn

1. **App chạy không chậm.** Điểm nghẽn khi dùng chỉ còn **nạp Excel**.
2. **Điểm nghẽn lớn nhất là vòng phản hồi:** bản ra nhanh hơn khả năng anh thử; AI không thấy máy thật của anh (lỗi thật, số thật, bản đang chạy trên từng máy).
3. **Mô hình App ↔ Giao ban anh chốt 14/11 đã được số thật xác nhận** (2 mốc khớp tuyệt đối các chỉ tiêu chính) — việc tiếp là **giữ cho khỏi lệch lại** với chi phí thấp nhất, không phải so tay mỗi kỳ.

## 2. Số đo (bản 3.541)

| Việc | Số đo | Đánh giá |
|---|---|---|
| Mở app | 0,4 s · giả lập CPU chậm 4 lần 0,9 s | Tốt |
| Tải lần đầu qua mạng | 153 file JS · 4,4 MB (nén 1,3 MB) · CSS 356 KB | Được (đã có chạy không mạng 3.419); lần đầu trên 4G chậm |
| Nạp bộ Excel 25.000 dòng | ≈ 18 s (`DO_TOC_DO.md`, 31/10) | **Nghẽn số 1.** Mẫu 31 thật 22 MB — điện thoại có nguy cơ thiếu bộ nhớ (suy luận) |
| Dựng số liệu lần đầu mỗi phiên | ≈ 1,8 s, sau đó tức thì | Ổn |
| Tab Tổ toàn PGD · tab khác | 0,7 s · 10–30 ms | Ổn / tốt |
| Tên toàn cục · hàm chung | 4.782 · 3.740 | Nghẽn công nghệ (mục 3) |
| Phép thử · hồi quy đủ | 281 · ≈ 1 giờ | Chỉ chạy khi AI nhớ chạy |
| Nhịp ra bản 17/10 → 15/11 | 316 bản / 29 ngày (≈ 11 bản / ngày) · 536 commit | Nghẽn quy trình (mục 3) |
| Tài liệu `docs/` | 72 file · 1,9 MB | Mỗi phiên AI đọc nhiều → tốn hạn mức |

## 3. Điểm nghẽn — theo mức ảnh hưởng

| # | Điểm nghẽn | Bằng chứng | Hệ quả |
|---|---|---|---|
| N1 | **AI không thấy máy thật** | Lỗi thật chỉ lưu trên máy (`js/67`, anh phải 📋 chép gửi); kết quả "thử máy thật" anh gõ tay; 15/11 laptop anh còn bản 3.519 trong khi main 3.542 → file đối chiếu 30/09 phải xuất lại | Lỗi lộ muộn; so số nhầm bản; anh tốn công truyền tin |
| N2 | **Ra bản nhanh hơn thử** | ≈ 11 bản / ngày; hàng "chờ anh thử" dài dần | Tính năng chồng lên phần chưa ai dùng thật |
| N3 | **Một không gian tên chung** | 4.782 tên toàn cục | Sửa 1 chỗ phải chạy lại rất nhiều phép thử; đã có luật "gói mới 1 không gian tên" (QUY_CHUAN mục 13) — gói cũ hay sửa chưa theo |
| N4 | **Phép thử không tự chạy** | Repo chỉ có 1 workflow (dựng exe HSSV); 3.524–3.525 gộp trước khi hồi quy xong → lộ lỗi sau | Chất lượng phụ thuộc AI nhớ chạy |
| N5 | **Script Giao ban ngoài vòng kiểm** | Nằm trên Drive, chạy tay, số bản ghi lệch (nhật ký GIAO_BAN 01/11 tự đính chính), bản vá phải nhờ anh chạy | Nửa "linh hoạt" cũng là nửa dễ sai nhất |
| N6 | **Nạp Excel** | 18 s / bộ; đọc cả file vào bộ nhớ | Chậm, nặng máy yếu |
| N7 | **Chi phí phối hợp** | Sổ chung 83 KB, hộp thư dài, nhiều TK song song | Tốn hạn mức, dễ sót thư |

Không phải nghẽn (em khuyên **giữ**): ES5 không build, 153 file rời (hợp với AI sửa trực tiếp, anh không phải cài gì); tốc độ các tab; cách lưu theo ngăn.

## 4. Ý tưởng mới — xếp theo lợi ích / công sức

### Nhóm A — khép vòng phản hồi (giải N1, N2) — **em khuyên làm trước**

**A1. "Kiểm 2 mốc" một nút trong app (mốc vàng trên số thật).**
Hai mốc 30/09 + 31/10 đã khớp → lưu kết quả đã khớp làm **đáp án vàng** trên Drive (không vào repo). App thêm nút: tính lại 2 mốc bằng bản app đang chạy → so đáp án → **xanh / đỏ + số chỗ lệch**. Sau mỗi lần cập nhật app, anh bấm 1 nút là biết bản mới có làm lệch số thật không — việc mà phép thử dữ liệu giả không bao giờ bắt được. Mỗi quý thêm 1 mốc. (Phần lõi `slDCTinh` + 🔎 So đã có — chủ yếu là ghép lại + chỗ lưu đáp án.)

**A2. Sổ thử máy thật ngay trong app, AI đọc được.**
"Có gì mới" đã ghi hướng dẫn thử (3.432). Thêm cho mỗi dòng 2 nút **Đạt / Chưa (+ ghi chú)** → lưu 1 file nhỏ trên Drive (vd `_Hệ thống/thu_may.json`: bản, việc, kết quả, máy, lúc — không dữ liệu khách). Phiên AI có kết nối Drive đọc file này lúc "Đọc trạng thái" → biết ngay việc nào anh đã thử, việc nào trượt, **không cần anh gõ lại**. Kèm luật: khu vực còn việc "chưa thử" quá N bản → không chồng tính năng mới lên.

**A3. Nhật ký lỗi tự lên Drive.**
`js/67` đang giữ lỗi trên máy, anh phải chép gửi. Cho đồng bộ 1 file `_Hệ thống/loi_may.json` (lỗi, file:dòng, bản app, tab, máy — đã lọc không có dữ liệu khách). AI đọc đầu phiên → sửa lỗi thật trước khi anh kịp báo. *Cần anh duyệt vì đổi nguyên tắc "không gửi đi đâu" của 3.363 (vẫn chỉ nằm trong Drive của anh).*

**A4. Biết máy nào đang chạy bản nào + nhắc cập nhật.**
Sự cố 15/11 (laptop còn 3.519). Mỗi máy ghi bản đang chạy vào file A2; app hiện dải "Máy này đang bản X — đã có bản Y, bấm để cập nhật"; file đối chiếu / bộ số chuẩn **từ chối xuất** khi bản cũ hơn bản tối thiểu ghi trong sổ chung.

**A5. Hai kênh: bản ổn định ↔ bản thử.**
Máy làm việc hằng ngày của anh chạy **bản ổn định** (chốt tuần 1–2 lần, sau khi A1 xanh + A2 đủ); bản mới nhất ở đường dẫn **/thu/**. AI vẫn ra bản nhanh mà công việc thật của anh không bị xáo trộn. (Suy luận: làm được bằng 1 nhánh `on-dinh` + GitHub Pages; cần TK 2 xác nhận cách đang đăng app.)

### Nhóm B — App ↔ Giao ban không lệch lại (giải N5, N7)

**B1. Tách "đọc" khỏi "tính": App đọc Excel 1 lần, cả hai cùng tính trên bản đã đọc.**
Đúng ý anh "cả 2 tính từ số liệu gốc của app nạp", đi thêm 1 bước: App xuất **gói số liệu kỳ** (bảng đã đọc, có số bản khuôn — `PHOI_HOP_CHUNG.md` mục 4 đã nhắc "về sau") → script Giao ban đọc gói này thay vì tự mở Excel 22 MB. Lợi: hết lớp lỗi "hai bên đọc file khác nhau" (ngày, cột, dòng lặp); script chạy nhanh hơn nhiều; Giao ban **vẫn tự tính, vẫn linh hoạt**. Excel gốc vẫn giữ trong kho để kiểm khi nghi ngờ.

**B2. "Linh hoạt bằng tham số, cứng bằng công thức" — sổ tham số chung.**
Phần Giao ban hay cần chỉnh nhanh thật ra là **ngưỡng và cách chọn** (đèn tín hiệu, N tháng lãi 3 / 6 / 12, nêu tên mấy tổ, ngưỡng tiết kiệm…), không phải công thức. Gom vào **1 file tham số** (trong repo, không có dữ liệu khách) mà **cả App và script cùng đọc**. Anh muốn chỉnh nhanh → đổi 1 dòng tham số → hai bên đổi cùng lúc, không ai phải sửa code, không lệch. Công thức (dư nợ, lãi tồn, KHĐ…) vẫn là luật cứng QT-C. Đây là cách dung hòa "app cứng – giao ban linh hoạt" ít rủi ro nhất.

**B3. Đưa mã script Giao ban vào repo (chỉ mã, không dữ liệu).**
Thư mục `giao_ban/` trong repo: có lịch sử sửa, có PR, có số bản thật, AI nào cũng đọc được; Drive chỉ còn dữ liệu + sản phẩm. Hết cảnh "nhật ký ghi bản 3.3 nhưng Drive vẫn 3.2" và "nhờ anh chạy bản vá". *Cần anh + TK 1 xác nhận trong script không có thông tin không được công khai.*

**B4. Kiểm tự động khi mở PR (thiết kế sẵn cho TK 2 — em đã khảo sát, chưa làm).**
GitHub tự chạy trên mỗi PR (miễn phí với repo công khai): ① `tests/kiem.py`; ② phép thử **bị ảnh hưởng bởi PR** — dùng `tools/hoiquy_pt.py chon` nhưng với mốc `tests/hoiquy_moc.json` **của nhánh main** (để kiểm độc lập, không tin mốc PR tự ghi); ③ phép thử chung `tests/chung/truong_hop_mau.json` cho **cả JS lẫn Python** nếu làm B3; chia 4 phần chạy song song, phép trượt chạy lại 1 lần rồi mới báo đỏ (tránh chập chờn). Cần cài: Playwright đúng bản đang dùng (1.63), thư viện `tests/lib` theo `tests/README.md` (lưu đệm), dữ liệu giả `taogia.py`, phông Liberation (phép đo bố cục). Kèm luật: PR đỏ không gộp.

**B5. Văn bản chỉ có 1 nơi phát hành.**
App dừng ở **bộ số + bản nháp để soát**; không làm tiếp báo cáo BĐD trong app (GĐ 4) — tránh 3 bản của cùng 1 văn bản. Công sức đó chuyển sang A1 / B1.

### Nhóm C — giá trị nghiệp vụ mới (sau khi A, B ổn)

**C1. Khép vòng "họp → giao việc → theo dõi → báo cáo" (B6 cũ, làm theo cách tự chấm).**
Mỗi việc giao trong TB kết luận ghi dạng có cấu trúc: đối tượng (tổ / món) · chỉ tiêu · mức cần đạt · hạn. Kỳ sau App **tự chấm từ Mẫu 31** (món quá hạn đã thu chưa, lãi tồn giảm chưa, tổ đã nâng tiết kiệm chưa) → Giao ban điền sẵn mục "Kết quả thực hiện kết luận kỳ trước". Anh không phải theo dõi tay; cuộc họp có số đo hiệu quả.

**C2. Phiếu chuẩn bị phiên 1 trang / điểm.**
Trước mỗi phiên giao dịch, từ Mẫu 31 theo ngày: món sẽ chuyển quá hạn đúng phiên này (QT-C-12), món đến hạn, tổ lãi tồn cao, việc giao chưa xong (C1) → 1 trang in mang đi phiên. (Suy luận: phần lớn số đã có ở Sao kê / Chuẩn bị buổi GD — cần TK 2 xem gộp lại được tới đâu.)

### Nhóm D — tốc độ và công nghệ

**D1. Nạp Excel:** ① hỏi hệ thống có xuất **CSV** không (nhanh hơn ~ chục lần — suy luận); ② chỉ đọc sheet / cột cần; ③ điện thoại không nạp Excel, chỉ đọc gói đã xử lý (đi cùng B1).
**D2. Nâng thư viện đọc Excel** (0.18.5 là bản cũ, có lỗ hổng đã công bố — em nhớ vậy, chưa tra lại; rủi ro thấp vì chỉ nạp file hệ thống).
**D3. Nhịp bản:** 1–2 bản / ngày, mỗi bản 3–5 việc thử; mỗi tuần 1 bản chỉ dọn; đi cùng A2, A5.
**D4. Giảm chi phí đọc của AI:** hộp thư đã xong → lưu trữ hằng tháng; mỗi vai 1 "thẻ phiên" tự sinh ≤ 60 dòng (trạng thái + chờ anh + bẫy); việc thường dùng model thường, chỉ kiểm toán / chốt luật mới dùng model mạnh.

## 5. Thứ tự em đề xuất

| Đợt | Việc | Vì sao trước |
|---|---|---|
| 1 | **A1** Kiểm 2 mốc · **B4** kiểm tự động PR · **A4** nhắc bản | Ít công, chặn ngay 2 loại sai đắt nhất (lệch số thật, gộp khi chưa kiểm, so nhầm bản) |
| 2 | **A2** sổ thử máy · **A3** lỗi lên Drive · **B2** sổ tham số chung | Khép vòng phản hồi; "linh hoạt" an toàn |
| 3 | **B1** gói số liệu kỳ · **B3** script vào repo · **A5** hai kênh | Nền dài hạn |
| 4 | **C1**, **C2** | Giá trị nghiệp vụ, cần nền ổn |

## 6. Anh quyết

1. Chọn ý nào làm (theo đợt hay chọn lẻ) — vai nào làm ý nào: A1, A2, A3, A4, A5, B1, B4, C2, D1–D3 → **App (TK 2)**; B2 → **App + Giao ban**; B3, C1 → **Giao ban (TK 1) + App**.
2. A3: cho phép nhật ký lỗi lên Drive của anh không.
3. B3: đưa mã script Giao ban vào repo công khai được không.
4. B5: đồng ý dừng báo cáo BĐD trong app không.

## 7. Nhật ký

| Ngày | Nội dung |
|---|---|
| 15/11/2026 | Lập theo yêu cầu anh (phiên đánh giá, TK chính). Đo trên 3.541; khảo sát B4 nhưng **không làm** (anh: thiên về đánh giá + ý tưởng). |
