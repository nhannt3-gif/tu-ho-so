# REVIEW — App "Tủ hồ sơ" (bản 3.30, cập nhật 26/09/2026 20:58)

- **Phạm vi rà soát:** toàn bộ `index.html` (11.699 dòng — CSS, HTML, JavaScript) và `README.md`. Phần CSS (dòng 7–1217) chỉ đọc lướt, không rà từng quy tắc.
- **Lịch sử:** rà lần đầu trên bản 3.29, sau đó đối chiếu lại toàn bộ phần thay đổi của bản 3.30. Số dòng trong file này tính theo **bản 3.30**. Các thay đổi của 3.30 xem mục **2.0**.
- **Nguyên tắc:** chỉ đọc, **không sửa mã**. File này là file duy nhất được thêm vào repo.
- **Cách kiểm chứng:** ngoài đọc mã, đã chạy thử app bằng trình duyệt Chromium không giao diện (chặn mạng CDN/Google), gọi trực tiếp các hàm để tái hiện lỗi.
  - Mục đánh dấu **[Đã chạy thử]** là lỗi đã tái hiện được.
  - Mục đánh dấu **[Đọc mã]** là kết luận rút ra từ việc đọc mã, chưa tái hiện trên máy thật. Mức độ chắc chắn ghi kèm.
- Số dòng ghi dạng `index.html:1234` để tra nhanh.

---

## 1. App đang làm gì

"Tủ hồ sơ" là **một file HTML duy nhất**, chạy trên GitHub Pages, không có máy chủ riêng. Người dùng là CBTD của PGD NHCSXH Gò Dầu. App dùng để lưu, đặt tên chuẩn, tra cứu và quản lý tài liệu công việc. Dữ liệu nằm trong trình duyệt và có thể đồng bộ lên Google Drive.

### 1.1. Các tab chính

| Tab | Chức năng |
|---|---|
| **Hôm nay** | Bàn làm việc: lịch dương/âm (thuật toán Hồ Ngọc Đức), ngày chay Cao Đài, can chi, giờ hoàng đạo, việc theo lịch (SCHEDULE, có lặp tuần/tháng/năm), sổ ghi chép dạng TO-DO hoặc mẩu giấy màu, hoàn tác 20 bước, "Ngày này năm xưa" và câu ca dao, danh ngôn; thẻ "Cần xử lý" (file chờ khai, kỳ thiếu báo cáo). |
| **Văn bản** | Kho công văn, quyết định, kế hoạch… Đọc chữ trong PDF (pdf.js) để tự rút số hiệu, ngày, trích yếu, loại văn bản, mảng nghiệp vụ, chương trình vay, tag. Đặt tên file chuẩn. Quản lý quan hệ VB chính / VB sửa đổi / thay thế / hết hiệu lực. Danh sách "Chờ khai" gom file còn thiếu thông tin. |
| **Tháng** | Dữ liệu báo cáo tháng (KQGD, nợ quá hạn, nợ khoanh, chất lượng Tổ TK&VV, THHĐ, sao kê Excel…). Có **ma trận đối chiếu** kỳ × đơn vị (PGD / xã / điểm giao dịch) để biết đủ, thiếu. Phân biệt bản cuối tháng và bản dữ liệu phụ theo "ngày số liệu" đọc trong nội dung. Có chức năng "Chép sang AI" (Excel → Markdown, cộng thử dòng tổng) và ghép cả kỳ thành một PDF. |
| **Biểu mẫu** | Kho mẫu đơn trắng hoặc mẫu hướng dẫn theo chương trình vay; ghim, đếm lần dùng, bộ biểu mẫu theo việc, in cả bộ (ghép PDF), mở bằng Word/Excel/Google Docs. |
| **Scan** | Máy scan trong app: chế độ **Thẻ** (CCCD cắt đúng khổ 85,6×54 mm, in ghép A4) và **Tài liệu** (nhiều trang ghép PDF). Ảnh lưu trong máy, có mã hóa AES-GCM. Gắn địa bàn xã → điểm GD → ấp → tổ. |
| **Ghi chú** | Ảnh chụp ghi chú theo dòng thời gian, có nhãn, gắn vào văn bản. |
| **Khay chờ duyệt** (tab ẩn) | Nơi file vừa thêm được đọc và gợi ý tên. Người dùng Duyệt / Sửa / Để khai sau / Bỏ. |

### 1.2. Các thành phần nền

- **Lưu trữ trong máy:** chỉ mục và cài đặt ở `localStorage` (khóa `tuhoso_v1`); nội dung file ở IndexedDB (`tuhoso_file`); thư viện CDN được lưu đệm vào IndexedDB (`tuhoso_tv`) để dùng khi không có mạng.
- **Google Drive** (quyền `drive.file`): đưa file lên đúng thư mục, đổi tên, dời thư mục, ghi `appProperties` để khôi phục chỉ mục; đồng bộ `_Hệ thống/chimuc.json` (giữ 7 bản dự phòng), `cauhinh.json`, `lich.json`; khay `_Chờ xử lý`; thùng rác `_ThungRac`; quét tủ, quét dọn rác.
- **Thùng rác 2 lớp:** Xóa → thùng rác app và `_ThungRac` trên Drive; Xóa hẳn → xóa vĩnh viễn trên Drive.
- **Hỗ trợ AI:** xuất CSV kèm câu nhắc cho AI, nạp lại kết quả; dán kết quả AI để so sánh với phần app tự đọc.
- **Danh mục địa bàn** gắn sẵn trong mã: 5 xã/phường, các điểm giao dịch, ấp/khu phố, **378 tổ TK&VV kèm mã tổ và họ tên tổ trưởng**; xuất/nhập bằng Excel hoặc JSON.
- **Cài đặt:** cỡ chữ, giao diện sáng/tối, kiểu đặt tên, danh mục, mẫu báo cáo, tag từng tab, ngày chay, phông chữ sổ, bố cục 2 cột có kéo chỉnh.

---

## 2. Lỗi và rủi ro phát hiện

Mức độ: 🔴 Nghiêm trọng · 🟠 Cao · 🟡 Trung bình · ⚪ Thấp.

### 2.0. Bản 3.30 thay đổi gì, và ảnh hưởng tới danh sách lỗi

Bản 3.30 thay đổi 38 dòng so với 3.29, gồm 3 việc:
1. Đổi kiểu nút "+ Thêm file" (viền mảnh, nền trắng) và nút ở khung xem trước.
2. Danh sách Chờ khai ghi rõ file sẽ vào kho nào (`→ Văn bản`, `→ Dữ liệu tháng`…) qua hàm mới `tenKho` (`index.html:6396`).
3. Hàm mới `nangCapDanhMuc()` (`index.html:9311–9326`), chạy mỗi lần mở app: mẫu báo cáo nào có trong danh mục mặc định mà máy chưa có thì thêm vào.

**Chạy thử lại trên 3.30:** tất cả lỗi đã chạy thử ở bản 3.29 (L1, L2, L3, L4, L5, L6 phần `moCaiDat('cm')`, L14 phần `data-iso`) **vẫn còn nguyên**. Bản 3.30 không sửa lỗi nào trong danh sách.

**🟠 N1. Lỗi mới ở 3.30: báo cáo đã "Bỏ khỏi danh mục" tự quay lại mỗi lần mở app.** [Đã chạy thử]
- `nangCapDanhMuc` không phân biệt được hai trường hợp: (a) mẫu mới chưa từng có trên máy, và (b) mẫu anh đã chủ động bỏ bằng nút "Bỏ khỏi danh mục" (`boBaoCao`) hoặc xóa dòng ở Cài đặt / Excel. Trường hợp (b) cũng bị thêm lại.
- Chạy thử: bỏ mẫu "Nợ khoanh" (NK) → mở lại app → NK có lại trong danh mục.
- Cách xử lý đề xuất: lưu danh sách mã đã bỏ (ví dụ `D.cauHinh.maDaBo`) và bỏ qua các mã này khi bổ sung. Hoặc đánh số phiên bản danh mục và chỉ bổ sung các mã **mới thêm từ phiên bản sau**.

**⚪ N2. `nangCapDanhMuc` chỉ thêm mẫu còn thiếu, không khôi phục các cờ đã mất do lỗi L2.** [Đọc mã]
- Máy nào đã từng bấm Lưu cài đặt tab Dữ liệu tháng thì các mẫu KQGD, THHĐ, sao kê… vẫn còn trong danh mục nhưng đã mất `theoNgay`, `thuanXLS`, `coExcel`, `gopPGD`. Mã các mẫu này đã có nên hàm bỏ qua. Nếu sửa L2, nên kèm một bước bổ sung cờ còn thiếu theo `ma` (chỉ điền cờ trống, không ghi đè cờ anh đã chỉnh).

**⚪ N3. Kiểu nút mới ở khung xem lớn không áp dụng.** [Đọc mã]
- CSS mới dùng bộ chọn `.xem-lon .day-p button` (`index.html:591–593`), nhưng trong trang không có phần tử nào mang lớp `xem-lon`. Khung xem lớn dùng lớp `xem-day`. Kết quả: kiểu nút mới chỉ có ở cột phải. Chỉ ảnh hưởng giao diện.
- Quy tắc `.nut-them.keo` được khai báo 2 lần với màu khác nhau (`index.html:659` và 1098). Quy tắc sau thắng. Không gây lỗi, chỉ thừa.

### 2.1. Bảo mật và dữ liệu cá nhân

**🔴 R1. Danh sách 378 tổ trưởng (họ tên + mã tổ + mã xã/ấp) đang công khai trên Internet.** [Đọc mã + kiểm tra repo]
- Repo `nhannt3-gif/tu-ho-so` đang ở chế độ **public**, và GitHub Pages cũng công khai. Dữ liệu nằm trong `MAC_DINH.diaBan` (`index.html:1490–1584`).
- Ai cũng xem được danh sách này, kể cả người ngoài ngành. Đây là dữ liệu nội bộ của đơn vị và là dữ liệu cá nhân (họ tên gắn với vai trò tổ trưởng, địa bàn).
- Dữ liệu đã nằm trong **lịch sử git (40 commit)**. Chỉ xóa ở bản mới nhất thì vẫn xem được ở các commit cũ.

**🟠 R2. "Mã hóa ảnh CCCD" chỉ có tác dụng hình thức.** [Đọc mã — chắc chắn]
- Từ khi bỏ mã PIN, khóa AES được tạo ngẫu nhiên rồi **lưu dạng thô ngay trong `localStorage`** (`D.cauHinh.hsKhoa`, `index.html:7854–7855`), cạnh ảnh đã mã hóa trong IndexedDB. Ai mở được trình duyệt trên máy đó, hoặc có phần mềm đọc được dữ liệu trình duyệt, đều giải mã được.
- Giao diện vẫn ghi "Ảnh trong máy vẫn mã hóa" (`index.html:6729`, 6810) nên dễ tạo cảm giác an toàn chưa đúng.
- Nếu `crypto.subtle` không dùng được, ảnh được lưu **không mã hóa** mà không báo rõ (`index.html:7984`).
- Nếu trình duyệt tự xóa `localStorage` (ví dụ Safari xóa dữ liệu trang web lâu không dùng) mà IndexedDB còn, **mất khóa thì toàn bộ ảnh CCCD không mở được**.

**🟠 R3. Dữ liệu tab Scan có đưa lên Drive, trái với mô tả "KHÔNG đồng bộ lên Drive".** [Đọc mã — chắc chắn]
- `goiChiMuc()` (`index.html:10979–10990`) đưa `scan` (họ tên khách, xã, ấp, tổ, ghi chú) vào `chimuc.json` và 7 bản `du_phong/chimuc_*.json` trên Drive. Ảnh thì không đưa lên, nhưng danh sách khách thì có.
- Bản dự phòng tải về máy (`xuatDuPhong`) cũng chứa danh sách này.

**🟡 R4. Nút "Chép sang AI" có thể đưa dữ liệu khách hàng ra dịch vụ AI bên ngoài.** [Đọc mã]
- Danh mục có các loại "Sao kê khách hàng", "Sao kê tín dụng chi tiết" (`index.html:1602–1603`). Nút 📋 chép nguyên bảng để dán vào AI mà không cảnh báo về dữ liệu cá nhân (khác với tab Scan, nơi app có cảnh báo).

**🟡 R5. Thư viện ngoài được nạp và cất vĩnh viễn, không kiểm tra toàn vẹn, không bao giờ cập nhật.** [Đọc mã — chắc chắn]
- `napMotTV` (`index.html:1426–1446`) tải pdf.js, pdf-lib, SheetJS từ cdnjs rồi chèn vào trang, **không có SRI (mã kiểm tra toàn vẹn)**. Bản đã cất vào IndexedDB được dùng mãi (khóa theo tên `pdfjs`, `xlsx`… chứ không theo URL/phiên bản). Nếu sau này đổi phiên bản trong `THU_VIEN`, máy cũ vẫn chạy bản cũ.
- SheetJS 0.18.5 trên cdnjs là bản cũ, có lỗ hổng đã công bố (Prototype Pollution / ReDoS khi đọc file lạ). Rủi ro thực tế thấp vì chỉ đọc file do chính anh chọn, nhưng nên nâng.

**⚪ R6. Dữ liệu lấy từ Drive được ghép vào HTML/`onclick` chưa thoát ký tự đầy đủ.** [Đọc mã]
- Nhiều chỗ ghép `id`, tên xã, mã báo cáo thẳng vào chuỗi `onclick="...('...')"` (ví dụ `index.html:4126`, 4276, 9208). Nếu `chimuc.json` / `cauhinh.json` / `nguon-cau.json` trên Drive bị người khác sửa (khi thư mục được chia sẻ), có thể chèn mã chạy trong app — mà app đang giữ token Drive. Hiện tại chỉ anh ghi các file này nên rủi ro thấp.

### 2.2. Lỗi chức năng

**🔴 L1. Cài đặt → Địa bàn bị hỏng hoàn toàn (lỗi `demDiaBan is not defined`).** [Đã chạy thử]
- Hàm `demDiaBan()` **không được khai báo ở đâu cả**, trong khi 7 chỗ gọi tới nó (`index.html:6576`, 11181, 11197, 11402, 11404, 11494, 11561). Hàm `demDiaBan2()` lại gọi chính `demDiaBan`. Có thể hàm này bị mất khi ghép file.
- Hậu quả:
  - Bấm **Cài đặt → 🗺 Địa bàn**: báo lỗi, trang trắng.
  - **Nạp JSON địa bàn** và **Nạp Excel**: lỗi ngay đầu hàm, báo "File không đúng định dạng/khuôn" dù file đúng → không nạp được danh mục.
  - **Lấy cài đặt từ Drive**: dữ liệu *đã được ghi* nhưng app lại báo "Không lấy được…" → báo sai kết quả.

**🟠 L2. Lưu cài đặt tab "Dữ liệu tháng" làm mất các thuộc tính của mẫu báo cáo.** [Đã chạy thử]
- `luuCDTab` (`index.html:6776–6786`) dựng lại `mauBaoCao` từ ô chữ và chỉ giữ `ten, ma, tuKhoa, cap`. Các cờ `theoNgay`, `gopPGD`, `coExcel`, `thuanXLS`, `chuKy`, `an` **bị xóa**.
- Chạy thử: trước khi lưu có 14 mẫu mang cờ; sau một lần bấm "Lưu cài đặt tab Dữ liệu tháng" (hoặc nút Lưu chung khi đang ở trang này) còn **0**.
- Hậu quả: KQGD mất "theo ngày" (tên file và cách xếp phiên thay đổi), 8 loại sao kê không còn nằm ở khối "Sao kê thuần Excel", dòng XLS biến mất, các báo cáo đã ẩn hiện lại. Chỉ bấm Lưu để đổi **tag** cũng gây lỗi này.
- **Nạp Excel** (`index.html:11514–11525`) cũng có cùng lỗi với sheet "Mau bao cao" (còn làm mất cả `cap`).

**🟠 L3. Thả file vào ô "kéo thả" ở màn Thêm file thì file bị xử lý 2 lần.** [Đã chạy thử]
- Ô `#vung-tha` có trình xử lý `drop` riêng (`index.html:11636–11639`), sự kiện lại nổi lên `document` và gặp trình xử lý thứ hai (`index.html:11660–11663`). Cả hai cùng gọi `gioiThieuFile`.
- Chạy thử: thả 1 file → khay chờ có **2** mục. Kiểm tra trùng theo vân tay không chặn được vì 2 lượt chạy song song.
- Kéo thả ở chỗ khác trong trang thì không bị lỗi này.

**🟡 L4. Nút "Thêm" cạnh ô "Gõ việc rồi bấm Enter…" không làm gì.** [Đã chạy thử]
- `dongGoThem(el, iso)` (`index.html:2555`) đọc biến toàn cục `event` và chỉ chạy khi `event.key==='Enter'`. Khi bấm chuột, `event` là sự kiện click nên hàm thoát ngay (tham số `{key:'Enter'}` truyền vào ở `index.html:3277` bị bỏ qua). Gõ Enter bằng bàn phím vẫn chạy bình thường.

**🟡 L5. Nhấn Enter ở giữa danh sách TO-DO không thêm được dòng mới.** [Đã chạy thử]
- `dongPhim` gọi `dongThem(iso, ' ')` (`index.html:2703`), nhưng `dongThem` từ chối chuỗi chỉ có dấu cách (`index.html:2548`) nên trả về `null`.

**🟡 L6. "Nhờ AI chuẩn hóa" ghi cột `nghiep_vu` vào **Tag** chứ không vào **Mảng nghiệp vụ**.** [Đọc mã — chắc chắn]
- Từ bản 3.4, mảng là `m.mang` (chọn một), tag là `m.the`. Nhưng `xuatChoAI` xuất `m.the` ra cột `nghiep_vu`, và `napTuAI` (`index.html:10670–10671`) ghi kết quả vào `m.the`. Câu nhắc lại bảo AI chọn trong danh sách **mảng**. Kết quả: danh sách tag bị lẫn tên mảng, mảng vẫn trống.
- `napTuAI` và `apSoSanh` (dán kết quả AI) cập nhật `trichYeu` nhưng không cập nhật `tenVB` → hộp Sửa vẫn hiện tên cũ; cũng không bật cờ `choDB` nên **tên file trên Drive không đổi theo**.
- Nút "Đóng" trong hộp Nhờ AI gọi `moCaiDat('cm')` (`index.html:10571`), mục `cm` không tồn tại → Cài đặt mở ra trang trống. [Đã chạy thử]

**🟡 L7. Dán kết quả AI: ghép mục theo số hiệu dễ ghép nhầm văn bản.** [Đọc mã]
- `ghepMuc` (`index.html:10783–10791`) so **chỉ phần số** trước dấu "/" (ví dụ "958"), và mặc định chọn "Lấy AI". Hai văn bản khác cơ quan cùng số 958 sẽ bị ghép nhầm, người dùng bấm "Áp dụng" là ghi đè sai.

**🟡 L8. Đồng bộ nhiều máy: ghi đè cả file, có thể bỏ lỡ bản mới.** [Đọc mã — mức chắc chắn trung bình]
- `dayChiMucLenDrive` và `dayLichLenDrive` **ghi đè nguyên file** trên Drive bằng bản của máy đang dùng, không gộp bản trên Drive trước. Việc gộp chỉ diễn ra **một lần khi nối Drive** (`DR.daKeoCM`, `DR.daKeoLich`). Hai máy mở cùng lúc sẽ lần lượt ghi đè nhau; dữ liệu chỉ còn trong máy nào tạo ra nó cho tới phiên sau.
- `taiChiMucTuDrive` bỏ qua việc tải khi `modifiedTime` (giờ máy chủ Google) ≤ `chiMucThoi` (giờ **của máy tính**) (`index.html:11095`). Đồng hồ máy chạy nhanh là có thể bỏ lỡ bản mới hơn.
- "Bản sửa sau thắng" dựa trên `suaLuc` theo giờ từng máy → phụ thuộc đồng hồ máy.

**🟡 L9. Bản scan đã xóa có thể "sống lại" khi đồng bộ.** [Đọc mã — chắc chắn]
- Xóa scan (`xoaScanIm`) không ghi dấu đã xóa, còn `gopNhanh` (`index.html:11078–11087`) thêm mọi mục có trên Drive mà máy này chưa có. Máy khác chưa xóa, hoặc bản `chimuc.json` cũ, sẽ đưa mục đã xóa quay lại (ảnh thì đã mất).

**🟡 L10. Khôi phục từ file dự phòng chỉ lấy lại một phần.** [Đọc mã — chắc chắn]
- `xuatDuPhong` gọi là "bản dự phòng đầy đủ" (có Biểu mẫu, Scan, Lịch/ghi chép, Thùng rác…), nhưng `napDL` (`index.html:7002–7024`) chỉ nạp lại `vanBan`, `duLieu`, `ghiChu` và cài đặt. **Lịch, sổ ghi chép, biểu mẫu, scan, thùng rác không khôi phục được** từ file này. Điều này quan trọng vì "Xóa sạch máy" dựa vào chính file dự phòng này.

**🟡 L11. Quét Drive bỏ sót file khi thư mục có trên 200 mục.** [Đọc mã — chắc chắn]
- `gomFile` (`index.html:7512–7533`) và `napKhayCho` (`index.html:7346`) gọi API với `pageSize=200` nhưng **không đọc trang tiếp** (`nextPageToken`). Thư mục nào có trên 200 file thì phần dư bị bỏ qua mà không báo. (Hàm quét dọn `gomTatCaDon` thì đã xử lý phân trang đúng.)

**🟡 L12. Khay `_Chờ xử lý` không thấy file anh tự bỏ vào bằng Drive/ổ G.** [Đọc mã — theo tài liệu quyền `drive.file` của Google]
- Với quyền `drive.file`, app chỉ thấy file **do app tạo**. Chính app đã ghi điều này (`index.html:7717`, 9092). Nhưng màn Thêm file và cây thư mục vẫn hướng dẫn "lấy file anh đã bỏ vào thư mục _Chờ xử lý trên Drive" (`index.html:4711`, 11229) → hướng dẫn mâu thuẫn, dễ tưởng app lỗi.
- Tương tự, nếu thư mục "Tủ hồ sơ" do anh tạo tay, app có thể không thấy và **tạo thêm một thư mục trùng tên**.

**🟡 L13. Hàm `docChuPDF` có thể treo khi PDF lỗi giữa chừng.** [Đọc mã]
- `Promise.all(ds).then(...)` (`index.html:1865`) không có nhánh bắt lỗi. Nếu một trang không đọc được chữ, Promise không bao giờ kết thúc → file đó kẹt ở "Đang đọc file…", thanh tiến độ không chạy xong.

**⚪ L14. Các lỗi nhỏ khác** [Đọc mã]
- Chấm trên lịch khi gõ ghi chép không cập nhật ngay: `capNhatChamNgay` tìm `.lc-o[data-iso]` nhưng ô lịch không có thuộc tính `data-iso` (`index.html:2763`). [Đã chạy thử: 0 ô]
- `lcChonNgay` gọi `nkLuu()` không tồn tại; hiện không lỗi vì `NK_HEN` không bao giờ được gán (mã thừa, `index.html:3281`, 3311).
- "Duyệt tất cả" với file lấy từ khay: đổi tên trên Drive **2 lần** cho mỗi file (trong `duyetThat` và trong `lamDuyetHet`, `index.html:4965`, 4999–5007).
- Lịch âm: ngày 29 tháng Chạp luôn ghi "Giao thừa" kể cả tháng đủ 30 ngày (`index.html:2400`).
- Chọn lẫn bản "Thẻ" và bản "Tài liệu" rồi In/Lưu: chỉ xử lý các bản Tài liệu, bản Thẻ bị bỏ qua không báo (`index.html:8361–8363`).
- `luuKhach`, `luuScanTL` tự điền xã/ấp/tổ **của lần trước** khi bỏ trống (`index.html:8225–8228`) → dễ gắn sai địa bàn cho khách.
- `boiCanh` ghi cứng "PGD Gò Dầu" thay vì lấy tên đơn vị trong Cài đặt (`index.html:4422`).
- `soTu` giả định số kiểu Việt (chấm ngăn nghìn); Excel định dạng kiểu Anh sẽ bị đọc sai → "cộng thử lệch" báo nhầm.
- Thẻ "Kỳ gần nhất còn thiếu báo cáo" ở tab Hôm nay (`kyThieu`) không xét cấp áp dụng, chu kỳ quý/năm, báo cáo đã ẩn → có thể báo thiếu nhiều hơn thực tế.
- Nội dung "kiến thức": "Việt Nam có 63 tỉnh, thành phố" (`index.html:2945`) đã lỗi thời sau sắp xếp đơn vị hành chính năm 2025.
- Hướng dẫn ghi "File gốc trên Drive không bao giờ bị đụng tới" (`index.html:6891`) — không đúng nữa, vì app có đổi tên, dời thư mục và **xóa vĩnh viễn** file trên Drive.

### 2.3. Rủi ro vận hành

**🟠 V1. "Xóa hẳn" xóa vĩnh viễn trên Drive, bỏ qua thùng rác của Google.** [Đọc mã]
- `xoaFileDrive` dùng lệnh `DELETE` (`index.html:6281–6290`). Không có lớp an toàn 30 ngày của Google. Dấu `daXoaHan` còn đồng bộ sang máy khác, và "Dọn dữ liệu thử" có ô "Xóa hẳn luôn".
- "Quét dọn rác" coi file có trên Drive mà không có trong chỉ mục là "file thừa". Trên máy mới, chỉ mục chưa đầy đủ thì tài liệu thật cũng bị liệt kê là "thừa".

**🟡 V2. Dữ liệu chính nằm trong bộ nhớ trình duyệt.** [Đọc mã]
- Chỉ mục ở `localStorage` (giới hạn khoảng 5 MB). `luu()` ghi lại **toàn bộ** dữ liệu sau mỗi thao tác (kể cả mỗi lần gõ ghi chép, mỗi lần bấm xem) và hẹn đẩy cả chỉ mục lên Drive sau 5 giây. Dữ liệu càng lớn thì càng chậm và càng dễ chạm giới hạn.
- Trình duyệt có thể tự xóa dữ liệu trang web (Safari/iOS, chế độ ẩn danh, dọn bộ nhớ). Drive là lớp dự phòng chính, nhưng xem L8, L10.

**⚪ V3. Tốn bộ nhớ khi xem PDF lớn hoặc thêm nhiều file cùng lúc.** [Đọc mã]
- Trang PDF đã vẽ không được giải phóng; `URL.createObjectURL` không được thu hồi; thêm nhiều file sẽ đọc song song cả file vào RAM. Trên iPhone, PDF dài hoặc thư mục lớn có thể làm tab tải lại.

**⚪ V4. Khả năng bảo trì.**
- 11.670 dòng trong một file, 25 khối `<script>` (có 5 khối rỗng), nhiều hàm trùng chức năng (`goNgay`/`gonNgay`, `ngayISOo`/`ngayISOtu`/`ngayVao`…), mã chết (`if(false){…}` ở `index.html:3755`, `moHoSoCu`, `datPIN`, `kiemPIN`). Mỗi bản sửa rất dễ làm hỏng chỗ khác (L1 là ví dụ).
- Không có bài kiểm tra tự động; README trống; không có CHANGELOG. Ghi chú phiên bản chỉ nằm rải rác trong comment ("3.12", "3.23"…).

---

## 3. Đề xuất cải tiến (xếp theo ưu tiên)

> Đây chỉ là đề xuất. Mọi thay đổi phải chờ anh duyệt; khi làm sẽ đi từng việc nhỏ, kèm kiểm tra hồi quy.

### Ưu tiên 1 — Làm ngay (an toàn dữ liệu, lỗi đang chặn chức năng)

| # | Việc | Giải quyết | Công sức |
|---|---|---|---|
| 1 | **Gỡ danh sách tổ trưởng khỏi repo công khai** (R1) | Phương án an toàn: chuyển repo sang **Private**. Lưu ý: GitHub Pages cho repo private cần gói trả phí; nếu không, tách dữ liệu địa bàn khỏi mã: để `MAC_DINH.diaBan` rỗng, danh mục thật chỉ nạp từ `cauhinh.json` trên Drive hoặc từ file Excel (chức năng đã có). Sau đó **xóa khỏi lịch sử git** (việc này ghi đè lịch sử, cần anh đồng ý riêng). | Thấp–Trung bình |
| 2 | **Khôi phục hàm `demDiaBan()`** (L1) | Viết lại hàm đếm xã/điểm/ấp/tổ trả về `{xa, diem, ap, to}`. | Rất thấp |
| 3 | **Giữ nguyên cờ của mẫu báo cáo khi lưu cài đặt / nạp Excel** (L2) | Khi dựng lại `mauBaoCao`, tìm mẫu cũ theo `ma` rồi chỉ ghi đè `ten`, `tuKhoa`, `cap`, giữ các thuộc tính khác. | Thấp |
| 4 | **Chống xử lý file 2 lần khi thả** (L3) | Thêm `stopPropagation()` ở trình xử lý thả của `#vung-tha`, hoặc bỏ trình xử lý riêng đó. | Rất thấp |
| 5a | **Sửa `nangCapDanhMuc` để không thêm lại báo cáo đã bỏ** (N1, lỗi mới của 3.30) | Ghi nhớ mã đã bỏ, bỏ qua khi bổ sung. Làm cùng việc #3. | Thấp |
| 5 | **Sửa khôi phục dự phòng cho đủ** (L10) | `napDL` nạp thêm `bieuMau`, `scan`, `lich` (gộp theo `id` + `suaLuc`), `rac`, `daXoaHan`. | Thấp |

### Ưu tiên 2 — Sớm (độ tin cậy dữ liệu và đồng bộ)

| # | Việc | Giải quyết |
|---|---|---|
| 6 | Đồng bộ an toàn hơn (L8) | Trước khi đẩy `chimuc.json`/`lich.json`: tải bản trên Drive về, gộp, rồi mới ghi; so thời gian bằng `modifiedTime` của Drive thay vì giờ máy. |
| 7 | Dấu xóa cho scan (L9) | Ghi `daXoa` cho scan giống các tab khác; `gopNhanh` bỏ qua mục đã xóa. |
| 8 | "Xóa hẳn" chuyển vào thùng rác Google (V1) | Dùng `PATCH {trashed:true}` thay cho `DELETE` → vẫn còn 30 ngày để cứu. "Quét dọn": thêm cảnh báo khi chỉ mục chưa đồng bộ lần nào trong phiên. |
| 9 | Phân trang khi quét Drive (L11) | Dùng `nextPageToken` như `gomTatCaDon` đã làm. |
| 10 | Sửa "Nhờ AI" / "Dán kết quả AI" (L6, L7) | Ghi cột nghiệp vụ vào `mang`; cập nhật `tenVB`, bật `choDB`; ghép theo **số hiệu đầy đủ** (số + ký hiệu), mặc định "Giữ app" khi chỉ khớp phần số; sửa `moCaiDat('cm')` → `'chimuc'`. |
| 11 | Bắt lỗi trong `docChuPDF` (L13) | Thêm `.catch` trả về chữ rỗng. |

### Ưu tiên 3 — Nên làm (bảo mật dữ liệu cá nhân, minh bạch)

| # | Việc | Giải quyết |
|---|---|---|
| 12 | Nói đúng về mã hóa CCCD (R2) | Hoặc đặt lại mã PIN (mã đã có sẵn `moHoSoCu`, `datPIN`, `kiemPIN`), hoặc sửa chữ trên giao diện thành "lưu trong máy, không mã hóa bằng mật khẩu". Nếu dùng PIN, cần cảnh báo quên PIN là mất ảnh. |
| 13 | Tách danh sách khách Scan khỏi `chimuc.json` (R3) | Hoặc bỏ `scan` khỏi `goiChiMuc`, hoặc ghi rõ trên giao diện rằng danh sách khách được đồng bộ lên Drive. |
| 14 | Cảnh báo khi chép sao kê khách hàng sang AI (R4) | Hiện hộp xác nhận với các mẫu sao kê có dữ liệu cá nhân; có thể có tùy chọn che tên/số CCCD. |
| 15 | Thư viện CDN (R5) | Thêm kiểm tra SRI; cất đệm theo **URL/phiên bản**; nâng SheetJS lên bản mới (bản chính thức phát hành qua cdn.sheetjs.com). |
| 16 | Thoát ký tự khi ghép vào `onclick` (R6) | Dùng `data-id` + một trình nghe sự kiện chung, hoặc hàm thoát chuỗi cho thuộc tính HTML/JS. |

### Ưu tiên 4 — Lỗi nhỏ, trải nghiệm

17. Sửa nút "Thêm" ở ô gõ việc (L4) và Enter giữa danh sách (L5).
18. Thêm `data-iso` cho ô lịch (L14) để chấm cập nhật ngay khi gõ.
19. Bỏ đổi tên Drive lặp trong "Duyệt tất cả"; báo khi chọn lẫn Thẻ/Tài liệu; không tự điền địa bàn của lần trước mà để trống và hỏi.
20. Sửa nội dung đã lỗi thời (63 tỉnh), dòng "Giao thừa" ngày 29 tháng Chạp, câu "File gốc trên Drive không bao giờ bị đụng tới"; thống nhất hướng dẫn về khay `_Chờ xử lý` (L12).
21. Tối ưu: gom lần `luu()` khi gõ phím; thu hồi `ObjectURL`; giới hạn số file đọc song song (ví dụ 3 file một lúc); giải phóng trang PDF ở xa tầm nhìn.

### Ưu tiên 5 — Nền tảng lâu dài (lập kế hoạch riêng, anh duyệt trước)

22. **Tài liệu dự án:** README (mô tả, cách dùng, cách triển khai), `CHANGELOG.md`, `docs/BACKLOG.md`, `docs/HANDOVER.md` — đúng yêu cầu "mỗi phiên bản có trạng thái, quyết định, changelog, backlog, tài liệu bàn giao".
23. **Kiểm tra hồi quy tự động:** một bộ Playwright nhỏ chạy các luồng chính (thêm file, duyệt, cài đặt từng mục, xuất/nạp dự phòng). Các lỗi L1–L5 trong báo cáo này đều bắt được bằng bộ kiểm tra dạng này.
24. **Tách file theo module** (vẫn giữ triển khai tĩnh trên GitHub Pages, không cần build): `css/`, `js/luu-tru.js`, `js/drive.js`, `js/lich.js`, `js/scan.js`… Giảm rủi ro sửa chỗ này hỏng chỗ kia. Làm dần theo từng module, mỗi bước chạy kiểm tra hồi quy.
25. Cân nhắc chuyển chỉ mục từ `localStorage` sang IndexedDB và bật `navigator.storage.persist()` để trình duyệt ít tự xóa dữ liệu hơn.

---

## Phụ lục — Cách tái hiện các lỗi đã chạy thử

Mở app, bấm F12 → Console, rồi chạy:

```js
moCaiDat('diaban');                       // L1: ReferenceError: demDiaBan is not defined
D.cauHinh.mauBaoCao.filter(x=>x.theoNgay||x.thuanXLS).length;  // ghi lại số này
moCaiDat('duLieu'); luuCDTab('duLieu');   // L2: chạy lại dòng trên → 0
dongThem(lcISO(nay()), ' ');              // L5: trả về null
document.querySelectorAll('.lc-o[data-iso]').length;           // L14: 0
```

L2 làm thay đổi cài đặt thật. Chỉ nên thử trên trình duyệt/hồ sơ riêng, hoặc xuất dự phòng trước khi thử.
