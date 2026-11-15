# ĐÁNH GIÁ CHUYÊN GIA + Ý TƯỞNG MỚI — hiệu suất app, điểm nghẽn, phối hợp App ↔ Giao ban (15/11/2026)

> Anh 15/11: *"đóng vai 1 chuyên gia, đánh giá và góp ý cải thiện, tối ưu hiệu suất của app, chỉ ra điểm nghẽn hiệu suất và công nghệ, góp ý về ý tưởng phối hợp giữa app và giao ban"* · *"cái anh cần ở em là thiên về đánh giá và đề xuất ý tưởng mới"*.
> **Anh duyệt hướng 15/11 ("gộp và theo ý em") — mục 6.** Từng việc vẫn: vai tương ứng (App / Giao ban) lên kế hoạch ngắn → anh nhắn "code".
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
> **Anh 15/11: "file đối chiếu sau này chỉ cần mốc 30/10 là được"** → từ nay **chỉ giữ 1 mốc cuối tháng 10** (bộ file ngày số liệu 31/10/2026 — `…_2026-10-31` — anh xác nhận 15/11 "đúng cuối tháng 10"); **mốc 30/09 thôi dùng**, không phải xuất lại / so lại. → A1 thành **nút "Kiểm mốc" với 1 mốc cuối tháng 10**; thêm mốc mới chỉ khi anh giao.
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

## 4b. Kỹ thuật nên áp dụng — chạy app + giao diện (anh hỏi 15/11; **anh duyệt ghi vào, máy / trình duyệt anh dùng đều bản mới nhất** → các kỹ thuật cần trình duyệt mới đều dùng được)

> Dò trên mã 3.544. Cột "Lợi" là nhận định, chưa đo. Vai làm: **App (TK 2)** — xếp vào các đợt mục 5; mỗi việc vẫn trình kế hoạch ngắn → anh "code".

### E — Kỹ thuật chạy app (app chưa dùng)
| # | Kỹ thuật | Hiện trạng | Lợi | Công |
|---|---|---|---|---|
| E1 | **Khóa giữa các tab** (Web Locks / BroadcastChannel / sự kiện `storage`) | chưa có | Mỗi lần lưu ghi cả khối → mở 2 tab thì tab lưu sau đè mất phần tab kia (mất dữ liệu âm thầm) | ít |
| E2 | **Tự xin "lưu bền"** (`navigator.storage.persist`) khi mở app | mới có nút bấm tay ở Ghi chú | Trình duyệt không tự xóa dữ liệu app khi máy đầy (nhất là iPhone) | rất ít |
| E3 | **CSP cho bản máy tính + dấu vân tay thư viện (SRI)** | CSP mới có ở `dt.html`; thư viện CDN không kiểm dấu | App giữ CCCD, số liệu khách — CDN bị sửa mã thì trình duyệt chặn | ít – vừa |
| E4 | **Chỉ vẽ phần đang nhìn** (`content-visibility`) cho bảng / danh sách dài | chưa dùng | Tab Tổ, Sao kê, danh sách khách mở + cuộn nhẹ hơn, không viết lại bảng; trang in không ảnh hưởng | ít (đo trước / sau) |
| E5 | **Việc nặng lúc máy rảnh** (`requestIdleCallback`) / thêm luồng nền | luồng nền mới dùng cho đọc Excel | Dựng số liệu lần đầu mỗi phiên (≈ 1,8 s) không đứng màn hình | vừa |
| E6 | **Cài như phần mềm** (manifest + biểu tượng) | đã chạy không mạng, chưa có manifest | Mở từ màn hình chính, cửa sổ riêng | ít |
| E7 | **Thư mục thả file** (app tự nhận file mới trong thư mục đã cấp quyền) | đã có chọn thư mục ở 1 chỗ | Xuất file vào đúng thư mục, mở app là tự nạp — đi cùng B1 | vừa |
| E8 | **Lọc trước khi hiển thị** chữ lấy từ file ngoài (DOMPurify đã trong danh mục) | hàm thoát chữ tự viết, `innerHTML` ở 70 file | Giảm rủi ro khi nạp file lạ (hiện thấp — chỉ nạp file hệ thống) | vừa, làm dần |

Thứ tự: **E1, E2** trước (bảo vệ dữ liệu, rẻ nhất) → **E3** → E4, E5, E6 khi thấy chậm / cần tiện → E7 cùng B1.
Không áp dụng: React / TypeScript, máy chủ riêng, gửi dữ liệu khách cho AI ngoài (như `KE_HOACH_NANG_CAP_0111.md` mục 3); cơ sở dữ liệu SQL trong trình duyệt (chưa cần).

### F — Giao diện / chuẩn CSS
Hiện trạng `css/app.css` (356 KB, ≈ 4.100 luật): màu ghi cứng **637 chỗ / 239 màu khác nhau** · cỡ chữ **20**, bo góc **18**, lớp chồng z-index **20** giá trị khác nhau · `!important` **228** · **149** luật theo bề rộng với **> 14 mốc** (899 / 900, 699 / 700, 560, 600, 520…) · kiểu dáng viết thẳng trong JS **483 chỗ** · cỡ chữ không theo hệ số `--co` **112 chỗ** · `100vh` **25 chỗ** · `@layer` 0 · `@container` 2 · `:focus-visible` 0 · `accent-color` 0 · `tabular-nums` 13.

| # | Kỹ thuật | Giải quyết | Công |
|---|---|---|---|
| F1 | **Bộ biến chuẩn (design tokens):** 1 bảng màu ~20 màu, 1 thang cỡ chữ / khoảng cách / bo góc / lớp chồng; mọi chỗ chỉ dùng biến | Đồng đều; nền tối tự đúng; đổi 1 chỗ đổi cả app | vừa, làm dần theo khối + thước đo `kiem.py` "không thêm màu ghi cứng mới" |
| F2 | **Trang mẫu giao diện** — 1 trang liệt kê mọi mảnh chuẩn (nút, chip, thẻ, bảng, hộp, ô nhập) kèm tên lớp | AI làm màn mới lấy đúng mảnh có sẵn, không tự chế kiểu mới — **lợi nhất với app nhiều AI viết** | ít |
| F3 | **Phân tầng CSS (`@layer`)**: nền → khung → khối → ghi đè | Hết đè nhau bằng `!important` | vừa |
| F4 | **Bố cục theo khung chứa (`@container`)** + gom về 3 mốc chuẩn | Thẻ / bảng / khung lọc tự co đúng dù ở cột hẹp hay màn rộng | vừa, khi sửa từng khối |
| F5 | **`dvh` thay `100vh`** | Điện thoại không bị che nút ở đáy | ít |
| F6 | **Hộp thoại / bảng chọn chuẩn trình duyệt** (`<dialog>`, popover) | Tự lo Esc, giữ con trỏ trong hộp, luôn nổi trên cùng — bớt quản lớp chồng | vừa, hộp mới trước |
| F7 | **`:focus-visible`** (vòng sáng khi đi phím Tab) + **`accent-color`** (ô tích theo màu app) | Nhập liệu bằng bàn phím thấy rõ đang ở ô nào | rất ít |
| F8 | **`tabular-nums`** cho mọi cột tiền | Số thẳng hàng, dễ so | rất ít |

Thứ tự: **F2, F7, F8, F5** trước (ít công, thấy ngay) → **F1** làm dần (sửa khối nào chuyển khối đó) → **F3, F4, F6** chỉ cho màn mới.
Chưa làm: CSS lồng nhau, hiệu ứng chuyển màn (lợi ít); đổi cách in mẫu sang CSS trang in (mẫu đang khóa chuẩn — rủi ro lệch form).

## 5. Thứ tự em đề xuất

| Đợt | Việc | Vì sao trước |
|---|---|---|
| 1 | **A1** Kiểm 2 mốc · **B4** kiểm tự động PR · **A4** nhắc bản | Ít công, chặn ngay 2 loại sai đắt nhất (lệch số thật, gộp khi chưa kiểm, so nhầm bản) |
| 2 | **A2** sổ thử máy · **A3** lỗi lên Drive · **B2** sổ tham số chung | Khép vòng phản hồi; "linh hoạt" an toàn |
| 3 | **B1** gói số liệu kỳ · **B3** script vào repo · **A5** hai kênh | Nền dài hạn |
| 4 | **C1**, **C2** | Giá trị nghiệp vụ, cần nền ổn |

## 6. Anh đã quyết (15/11: "gộp và theo ý em")

1. **Làm theo thứ tự 4 đợt ở mục 5.** Vai làm: A1, A2, A3, A4, A5, B1, B4, C2, D1–D3 → **App (TK 2)**; B2 → **App + Giao ban**; B3, C1 → **Giao ban (TK 1) + App**. Mỗi việc vẫn theo quy trình: vai làm lên kế hoạch ngắn → anh nhắn "code" → PR → anh nhắn "gộp".
2. **A3 ✓** — nhật ký lỗi được tự lưu lên Drive của anh (đã lọc, không dữ liệu khách).
3. **B3 ✓** — đưa mã script Giao ban vào repo (chỉ mã; TK 1 rà trước, không đưa dữ liệu / thông tin không công khai).
4. **B5 ✓** — dừng báo cáo BĐD trong app; văn bản chỉ phát hành ở Giao ban.

## 7. Nhật ký

| Ngày | Nội dung |
|---|---|
| 15/11/2026 | Lập theo yêu cầu anh (phiên đánh giá, TK chính). Đo trên 3.541; khảo sát B4 nhưng **không làm** (anh: thiên về đánh giá + ý tưởng). |
| 15/11/2026 | Anh "gộp và theo ý em": duyệt thứ tự 4 đợt, A3, B3, B5 (mục 6). Đợt 1 = A1 + B4 + A4. |
| 15/11/2026 | Thêm mục 4b: kỹ thuật chạy app E1–E8, giao diện / CSS F1–F8 (anh duyệt ghi vào; trình duyệt anh dùng bản mới nhất). Anh xác nhận mốc đối chiếu = cuối tháng 10. |
