# KẾ HOẠCH + BÀN GIAO — 🎯 PHÂN BỔ KẾ HOẠCH (gộp app WPF "Phân bổ kế hoạch" vào Tủ hồ sơ) · viết 20/10/2026

> **Cho cả 2 tài khoản đọc.** Tài khoản CHÍNH làm phần này; tài khoản PHỤ đang làm việc khác → đọc **mục 7 (phân công file)** để không sửa đè, và **mục 9 (tiến độ)** để biết đang ở đâu.
> Đọc riêng file này là đủ để làm: bản WPF chỉ nằm trên máy anh Nhân (không có trên GitHub) → mọi quy tắc, thuật toán đã ghi đủ ở đây.
> Repo công khai: ví dụ trong file này là **số giả**; không đưa QĐ / số liệu thật vào repo.

## 0. Anh Nhân chốt (20/10/2026)
- Gộp app WPF "Phân bổ kế hoạch" (bản v9.20, chạy ổn trên dữ liệu thật của anh) vào Tủ hồ sơ: **1 tab Phân bổ kế hoạch**, **đọc dữ liệu từ tab dữ liệu đã nạp** (Mẫu 31…), **giữ nguyên quy tắc / logic phân bổ** (mục 2–3), **dựng lại Biểu 07 theo chuẩn mẫu bên này** (nền ô mẫu, như các mẫu đang làm).
- Anh duyệt hướng ("ok theo em"): ① tab con **🎯 Phân bổ KH** trong **📈 Số liệu** (dùng kỳ chung + cây địa bàn) · ② mẫu Word gốc = file Biểu 07 anh đang dùng (em kiểm là **mẫu trắng** rồi mới đưa vào `tests/mau_goc/`) · ③ chuyển QĐ đã nhập ở bản WPF bằng **file sao lưu .json** của bản WPF · ④ tài khoản chính làm trên nhánh `claude/html-app-review-ck346k`.
- **Luật repo vẫn áp dụng:** kế hoạch này → **chờ anh nhắn "code"** cho từng bản → PR → **anh nhắn "gộp"** mới gộp.
- Bản WPF vẫn dùng làm Biểu 07 cho tới khi bản web chạy khớp (so từng ấp, mục 6.3); anh quyết bỏ bản WPF sau.

## 1. Tư vấn đặt chỗ (QUY_CHUAN mục 1a)
| | Nội dung |
|---|---|
| ① Tab | **📈 Số liệu › 🎯 Phân bổ KH** (tab con, cạnh Tổ / Sao kê / Tổng hợp). Kỳ chung ở đầu trang dùng làm kỳ dư nợ mặc định. |
| ② Số liệu từ `KHO` (chung) | Cây địa bàn: xã → ấp (thôn) theo kỳ (`KHO.dsTo`: `xa, tenXa, thon, tenThon`) · danh sách kỳ có Mẫu 31 (`slDsKy`, `KHO.coBang('hstd', kỳ)`) · **CỬA MỚI `KHO.duNoAp(kỳ)`** (mục 4.1) · tên / viết tắt chương trình (⚙ Khai báo đơn vị › 📋 Chương trình vay, `hsoCTV`) · tên PGD (⚙ › 🏦 PGD, `hsoPGD`). |
| ③ Riêng của khối (tiền tố `pb…`) | Danh sách QĐ + form nhập QĐ nhiều xã · tham số phân bổ · màn phân bổ (sửa tay) · mẫu **"Biểu 07 Phân bổ KH"** (mã mẫu `07pb` — **khác 07b/GQVL**, luôn gọi kèm tên khối). |
| ④ QT mới cần anh chốt | **QT-15, QT-16, QT-17** (mục 2) — đều là quy tắc đang chạy ở bản WPF. |
| ⑤ Ảnh hưởng tab khác | Không. Chỉ thêm 1 cửa `KHO` chỉ đọc. Không đụng KTGS, Giao dịch xã, mẫu khóa. |

## 2. Sổ quy tắc mới (đưa vào QUY_CHUAN mục 4 khi anh chốt)
**QT-15 · Phân bổ 1 QĐ xuống ấp — tính theo TỪNG QĐ** (mỗi xã × chương trình × nguồn, không dựa lịch sử):
1. **Dòng CT cần phân bổ:** QĐ điều chỉnh → số phân bổ = `Tăng/giảm` (≠ 0). Dòng `Tăng/giảm` trống / 0: chỉ phân bổ khi QĐ loại "Giao mới" **và** `Đã giao` trống / 0 (giao mới thật) → số phân bổ = `Đến 31/12`; còn lại = dòng chỉ có số dư → **bỏ qua**.
2. **Chỉ tiêu xã trước QĐ** = `Đã giao` (giao mới thật = 0; trống → `Đến 31/12 − số phân bổ`; âm → 0).
3. **Hai cách chia** (anh chọn mỗi lần, mặc định ở cấu hình):
   - **Tương đối (chia đều):** tăng / giảm chia đều **chẵn 100 tr**, tối đa 10 ấp, các ấp chênh ≤ 1 bước, **phần lẻ < 1 bước dồn 1 ấp (ấp cuối)**. **Chỉ tiêu trước của ấp** = chỉ tiêu xã **chia đều chẵn 100** cho mọi ấp của xã (1 ấp lẻ).
   - **Chính xác (theo dư nợ):** kỳ dư nợ = **kỳ cuối tháng gần nhất TRƯỚC (hoặc bằng) ngày QĐ** (anh chọn kỳ khác được). Tăng / giảm chia **theo tỷ lệ dư nợ** của ấp (cùng xã + mã CT + nguồn), **chẵn 50 tr**, làm tròn kiểu **phần dư lớn nhất**, **phần lẻ < 1 bước dồn ấp dư nợ lớn nhất**. **Chỉ tiêu trước của ấp = ĐÚNG DƯ NỢ THẬT** (làm tròn triệu); **phần chênh (Đã giao − tổng dư nợ) dồn vào 1 ấp có dư nợ lớn nhất** (chênh âm lớn hơn ấp đó → lấy tiếp ấp lớn kế tiếp, không ấp nào âm) — *"cách A" anh chốt 20/10*. Ấp không có dư nợ: chỉ tiêu trước 0, vẫn hiện để chỉnh tay. Giao mới thật: chỉ tiêu trước 0.
   - CT **không có dư nợ** ở xã trong kỳ → tự chia như **Tương đối** + cảnh báo. Xã **không có danh sách ấp** → chia cho "Đơn vị 1…n" + cảnh báo (thường do tên xã QĐ khác tên trong Mẫu 31).
4. **SỐ GIAO CHẴN — chỉ 1 ấp lẻ** (anh chốt 20/10): mọi số tăng / giảm của ấp là bội số của bước, trừ đúng 1 ấp nhận phần lẻ. Ngoại lệ bất khả: QĐ giảm gần hết chỉ tiêu (giảm > tổng phần chẵn chịu được) → buộc vài ấp giảm số lẻ (vẫn khớp, không âm).
5. **GIẢM không làm âm ấp:** ấp bị giảm quá chỉ tiêu trước → hạ về mức giảm chẵn lớn nhất chịu được; phần vượt (+ phần lẻ sẵn có) dồn theo từng bước sang ấp còn nhiều chỉ tiêu nhất; phần lẻ cuối vào 1 ấp còn đủ; không đủ → báo đỏ (tổng giảm > tổng chỉ tiêu).
6. **Chỉ tiêu năm của ấp = chỉ tiêu trước + tăng/giảm.** Anh **sửa tay** được tăng/giảm từng ấp; app tính lại ngay.
7. Bước chẵn (100 / 50), số ấp tối đa (10) **khai báo được** (riêng khối `pb`). Bước chính xác tối thiểu 10.

**QT-16 · Biểu 07 BẮT BUỘC khớp QĐ** (anh chốt): với mỗi CT: Σ tăng/giảm các ấp = số QĐ · Σ chỉ tiêu trước = `Đã giao` · Σ chỉ tiêu năm = `Đến 31/12` · và QĐ tự đúng `Đã giao + Tăng/giảm = Đến 31/12` (khi đủ 3 số). Sai bất kỳ điều nào → **chặn Xem trước / In / Xuất** (kể cả xuất hàng loạt), báo rõ lý do. Có ấp âm → hỏi trước khi xuất. **Biểu 07 chỉ liệt kê ấp có tăng/giảm ≠ 0.** Không lưu lịch sử Biểu 07.

**QT-17 · Nhập QĐ + chuỗi "Đã giao"**:
- 1 QĐ (cùng số + ngày + ký hiệu) giao **nhiều xã**: mỗi xã 1 bản ghi; anh **nhập trước vài xã** (2 xã anh quản lý), lần sau mở QĐ tích thêm xã.
- **Gợi ý `Đã giao`** = `Đến 31/12` của **QĐ gần nhất trước đó** trong năm (cùng xã + CT + nguồn, bỏ chính QĐ đang sửa); chưa có QĐ nào trong năm → dư nợ 31/12 năm trước (Mẫu 31 kỳ 12 năm trước). **Chỉ gợi ý, sửa được** — số làm tay nên không bắt khớp chuỗi 100 %. `Đến 31/12` tự tính = Đã giao + Tăng/giảm (sửa được).
- Cảnh báo: **✗ đỏ** `Đã giao + Tăng/giảm ≠ Đến 31/12` (Biểu 07 sẽ bị chặn) · **⚠ vàng** `Đã giao` khác QĐ trước (đứt chuỗi — chỉ nhắc, vẫn lưu).
- **Chỉ tiêu đầu năm theo QĐ** (khi làm màn Chỉ tiêu đầu năm sau này) = `Đã giao` của **QĐ đầu tiên trong năm NHẮC TỚI CT đó** (không chỉ QĐ loại "Giao mới" — mỗi QĐ chỉ ghi CT nó thay đổi). KH cuối năm = `Đến 31/12` QĐ mới nhất.

## 3. Thuật toán (giả mã — bản WPF `PhanBoService.cs` v9.20, đã kiểm 74 phép thử + 45 QĐ thật)
```
soCanPhanBo(qd, c):           // null = bỏ qua
  giaoMoi = (c.tangGiam == null || c.tangGiam == 0)
  if giaoMoi: if !(qd.loai chứa "giao mới" && (c.daGiao == null || c.daGiao == 0)) return null
              so = c.den3112 || 0
  else so = c.tangGiam
  return so == 0 ? null : so

chiTieuXaTruoc(c, so, giaoMoi) = giaoMoi ? 0 : max(0, c.daGiao ?? (c.den3112 ?? 0) − so)

chiaTuongDoi(tong, nToiDa, buoc=100):        // trả mảng ≤ nToiDa phần, cùng dấu tong
  if tong == 0 → []; val = |tong|; if val ≤ buoc → [tong]
  soBuoc = floor(val/buoc); le = val − soBuoc*buoc; n = min(soBuoc, nToiDa)
  moi = floor(soBuoc/n); du = soBuoc − moi*n
  phần i = (moi + (i < du ? 1 : 0)) * buoc;  phần cuối += le;  nhân dấu

chiaChinhXac(tong, [(ấp, dưNợ>0)], buoc=50):   // phần dư lớn nhất
  soBuoc = floor(|tong|/buoc); le = |tong| − soBuoc*buoc
  q_i = soBuoc * dn_i / Σdn; n_i = floor(q_i); phát thêm (soBuoc − Σn_i) bước cho ấp phần thập phân lớn nhất (bằng nhau → dư nợ lớn hơn)
  v_i = n_i*buoc;  ấp dư nợ lớn nhất += le;  nhân dấu

duNoThatCongChenh(dnThat[], daGiao):        // chỉ tiêu trước chế độ chính xác
  kq = dnThat; chenh = daGiao − Σkq
  chenh > 0 → kq[ấp dư nợ lớn nhất] += chenh
  chenh < 0 → trừ dần từ ấp lớn nhất, hết thì ấp lớn kế tiếp (không âm)

gioiHanGiam(dc[], truoc[], buoc):           // dc âm = giảm; trả false nếu không đủ chỉ tiêu
  vuot = 0
  với ấp truoc+dc < 0: moi = −floor(max(0,truoc)/buoc)*buoc; vuot += moi − dc; dc = moi
  vuot == 0 → true
  gom phần lẻ sẵn có: với dc<0 mà (−dc) % buoc ≠ 0: dc += le; vuot += le
  while vuot ≥ buoc: ấp còn (truoc+dc) ≥ buoc lớn nhất → dc −= buoc; vuot −= buoc (hết ấp → thoát)
  vuot > 0: 1 ấp còn ≥ vuot (lớn nhất) → dc −= vuot
  còn vuot: lấy nốt phần còn của từng ấp (lớn trước)
  còn nữa → dc[0] −= vuot; return false

kiemNhapQD(c): đủ den3112 và (daGiao hoặc tangGiam) mà (daGiao||0)+(tangGiam||0) ≠ den3112 → lỗi

phanBoTuongDoi(qd, dsAp):
  mỗi c có so: phan = chiaTuongDoi(so, min(|dsAp|,10), 100) gán ấp 0..; truoc = chiaTuongDoi(xaTruoc, |dsAp|, 100) gán ấp 0..
  gioiHanGiam(dc, truoc, 100); nam_i = truoc_i + dc_i
phanBoChinhXac(qd, duNoKy, dsAp):
  dnAp = Σ dư nợ (triệu) theo ấp, cùng xã + CT + nguồn; không ấp nào > 0 → như tương đối + cảnh báo
  danh sách ấp = ấp có dư nợ (xếp tên) + các ấp khác của xã (dư nợ 0)
  truoc = giaoMoi ? 0 : duNoThatCongChenh(round(dnAp), xaTruoc); dc = chiaChinhXac(so, dnAp, 50)
  gioiHanGiam(dc, truoc, 50); nam = truoc + dc; ghi kèm dnThat từng ấp (cột "Dư nợ thật")
khop: Σdc == so · Σtruoc == xaTruoc · Σnam == (den3112 ?? xaTruoc+so) · kiemNhapQD ok  → mới cho xuất (QT-16)

goiYDaGiao(xa, ct, nguon, ngayQD, boQuaId[]):
  QĐ cùng xã+nguồn, cùng năm, ngày ≤ ngayQD, không thuộc boQuaId, có dòng ct → lấy QĐ mới nhất (ngày, rồi lúc ghi) → den3112 ?? daGiao+tangGiam
  không có → dư nợ 31/12 năm trước (xã+ct+nguồn, triệu, làm tròn); không có → null
```
Ngày thông báo trên Biểu 07 mặc định = ngày QĐ + 1, né thứ 7 / CN (khai báo được; có lựa chọn "để trống điền tay").

## 4. Dữ liệu
### 4.1 Cửa chung mới (thêm vào `js/29-kho.js`, hợp đồng ghi trên dòng)
`KHO.duNoAp(kỳ)` → `{ky, ngay, ds:[{xa, tenXa, thon, tenThon, ct (mã 2 số), nguon (1 TW / 2 ĐP), dn (đồng)}]}` gộp theo (xã, thôn, ct, nguồn) từ **Mẫu 31 kỳ đó** (món OPEN có dư nợ; khách chỉ gửi TK bỏ) | null khi chưa có Mẫu 31 kỳ đó. Chỉ đọc. *Ứng viên chung: Tổng hợp / Tra cứu có thể dùng sau.* Phép thử riêng bằng `tests/gia31`.
### 4.2 Lưu của khối (qua cửa lưu chung — đồng bộ Drive như khai báo khác, khóa tiền tố `pb`)
- `pb.qd = [{id, so, kyHieu, ngay 'yyyy-mm-dd', nguon 1|2, loai 'Giao mới'|'Điều chỉnh', dot, xa (tên xã như cây địa bàn), ct:[{ma, ten, daGiao, tangGiam, den3112}] }]` — mỗi xã 1 bản ghi; **đơn vị triệu đồng**.
- `pb.ch = {buocTD:100, buocCX:50, soApToiDa:10, cheDo:0|1, ngayTB:+1, neCuoiTuan:true}`.
- **Nhập từ bản WPF:** file `SaoLuu_QD_*.json` = `{"DanhSachQD":[{Id, SoQD, KyHieuVanBan, NgayQD (ISO "o"), NguonVon, Loai, Dot, TenXa, ChiTiet:[{MaChuongTrinh, TenChuongTrinh, ChiTieuDaGiao, GiaoTangGiam, ChiTieuDen3112}], NgayGhiNhan}]}`. Trùng (số + xã + ngày + nguồn): giống hệt → bỏ qua; khác số liệu → báo, không nhập. Tên xã ở WPF lấy từ file dư nợ → ghép với cây địa bàn theo **tên đã chuẩn hóa** (bỏ khoảng trắng thừa); không ghép được → báo.

## 5. Màn hình (theo khung tab chung, KE_HOACH_CHUAN_HOA)
- **Cột trái ✎ Nhập liệu:** danh sách QĐ (nhóm theo QĐ, mỗi dòng 1 xã + tóm tắt CT, dòng nhập lệch tô đỏ) · nút ＋ QĐ mới · 📥 Nhập từ bản WPF (.json).
- **Form QĐ:** số · ký hiệu · ngày (gõ liền số) · nguồn · loại · đợt · **tích xã** · chọn CT (● có dư nợ ở xã đã tích) → thêm cho mọi xã đã tích · bảng nhóm theo xã: Mã · CT · Đã giao (gợi ý) · Tăng/giảm · Đến 31/12 (tự tính) · Kiểm tra. Phím theo QUY_CHUAN mục 11.
- **Phân bổ:** chọn QĐ → cách chia → kỳ dư nợ (chính xác) → ⚙ Phân bổ. Bảng đối chiếu từng CT (QĐ: Đã giao ± → Đến 31/12 · Tổng ấp: Trước ± → Năm · Kết luận) + bảng ấp (Dư nợ thật [chính xác] · Chỉ tiêu trước · **Tăng/giảm ✎ sửa tay** · Chỉ tiêu năm · Ghi chú). Thanh trạng thái xanh / vàng / đỏ.
- **Xuất:** 👁 Biểu 07 (1 xã) · 📦 Biểu 07 cho MỌI xã của QĐ (xã chưa khớp → bỏ qua + báo). In / Word / PDF bằng bộ nút chung.
- **⚙ Khai báo riêng — Phân bổ KH:** bước chẵn, số ấp tối đa, cách chia mặc định, ngày thông báo.

## 6. Biểu 07 Phân bổ KH (mẫu `07pb`, nền ô `js/31-o-mau.js`, QUY_CHUAN mục 9)
1. Gốc: file Word anh gửi → kiểm **mẫu trắng** → `tests/mau_goc/07pb.docx`; đo bằng `t180` (lề, chữ, số trang), chuẩn khóa `tests/chuan/` sau khi anh duyệt bản in.
2. Nội dung (theo mẫu WPF): đầu trang tên UBND xã/phường (HOA) · Quốc hiệu · "{địa danh}, ngày … tháng … năm …" (ngày thông báo) · **THÔNG BÁO GIAO / ĐIỀU CHỈNH KẾ HOẠCH DƯ NỢ NĂM {năm}** · "Kính gửi: Trưởng các ấp trên địa bàn xã" (phường → khu phố) · căn cứ QĐ số {số} ngày {dd/mm/yyyy} của Trưởng Ban đại diện HĐQT NHCSXH tỉnh {tỉnh} · bảng **DANH MỤC GIAO / ĐIỀU CHỈNH CHỈ TIÊU KẾ HOẠCH DƯ NỢ NGUỒN VỐN TRUNG ƯƠNG / ĐỊA PHƯƠNG NĂM {năm}** (đơn vị triệu đồng): STT · Chỉ tiêu (dòng ấp "1", dòng CT "1.1" tên đầy đủ) · Giao tăng/giảm (giảm in dấu "−") · Chỉ tiêu KH năm; chữ ký.
3. Ô mẫu: số / ngày QĐ, nguồn, loại, đơn vị (🤖 từ QĐ + phân bổ) · địa danh, tỉnh (⚙ khai báo đơn vị › PGD, thêm ô Tỉnh nếu chưa có) · ngày thông báo (⌨ gõ / tự tính / để chấm) · bảng ấp (🤖). Tiền tố Ấp / Kp theo xã / phường như các mẫu khác. Tên file theo chuẩn chung.
4. Đối chiếu bản in web với bản Word WPF (cùng QĐ giả) trước khi khóa.

## 7. Phân công file (tránh sửa đè — QUAN TRỌNG cho tài khoản phụ)
| File | Ai sửa | Ghi chú |
|---|---|---|
| `js/47-phan-bo.js` (nghiệp vụ thuần, không DOM), `js/48-phan-bo-gd.js` (giao diện tab), `js/mau/07pb.js`, `tests/t250…t259`, `tests/mau_goc/07pb.docx`, `docs/KE_HOACH_PHAN_BO_KH.md` | **Chỉ tài khoản CHÍNH** | file mới — tài khoản phụ **không tạo file trùng tên / số** (giữ chỗ `js/47`, `js/48`, `t250–t259`) |
| `js/29-kho.js` | Chính thêm **1 cửa** `duNoAp` ở cuối danh sách | Phụ sửa cửa khác thì báo trong mục 9; xung đột chỉ là thêm dòng |
| Chỗ đăng ký tab con trong 📈 Số liệu (`js/22*` / `js/11`), `index.html` (thêm `<script>` + `?v=`), `js/02-nen.js` (`APP_BAN`), `js/06-hop-thoai.js` (`CO_GI_MOI`), `tests/hoiquy2.js` (`APP_BAN==='x'`), `docs/CHANGELOG.md`, `docs/BAT_DAU.md` mục 3, `docs/BAN_GIAO_VIEC_CON_LAI.md` | **Cả hai** (chỗ chung) | **Số bản:** ai gộp trước lấy số kế tiếp của `main`; người sau `git fetch origin main && git rebase origin/main`, tăng lên số tiếp theo, giải xung đột ở các dòng số bản. Không giữ chỗ số bản trước. |
| Mọi file khác (Scan, Hồ sơ, KTGS, Giao dịch xã…) | Tài khoản PHỤ như đang làm | Tài khoản chính **không đụng** |

## 8. Các bản dự kiến (mỗi bản: anh nhắn "code" → làm → hồi quy liên quan → PR → anh nhắn "gộp")
| Bản | Việc | Kiểm |
|---|---|---|
| **P1 · lõi** | `js/47-phan-bo.js` (mục 3, ES5) + `KHO.duNoAp` + QT-15…17 vào QUY_CHUAN mục 4 | `t250` thuật toán (chia đều, chính xác, chẵn 1 ấp lẻ — 3.000 tình huống ngẫu nhiên cố định hạt, giảm chạm trần, dư nợ thật + chênh, khớp QT-16, QĐ nhập lệch), `t251` `KHO.duNoAp` trên `tests/gia31`; **so với bản WPF** trên QĐ thật của anh — chỉ chạy trong thư mục nháp, **không** đưa vào repo (mục 6.3) |
| **P2 · tab** | `js/48-phan-bo-gd.js`: danh sách + form QĐ nhiều xã, nhập .json WPF, phân bổ + sửa tay, khai báo riêng | `t252` nhập .json mẫu giả, `t253` bàn phím form (mục 11) |
| **P3 · Biểu 07** | `js/mau/07pb.js` trên nền ô, xem trước / In / Word / PDF, xuất cho mọi xã | `t180` với `07pb.docx`, `t181` chồng khít, chuẩn khóa sau khi anh duyệt |
| Sau (tư vấn đặt chỗ riêng) | Chỉ tiêu đầu năm (QT-17 đầu năm), Diễn biến, Đối chiếu chéo, xuất Excel bảng theo dõi, cách chia thứ 3 (theo số đã thông báo lần trước — anh để sau) | |

**Số liệu kiểm ở bản WPF (để so khi làm P1):** 45 bản ghi QĐ / 93 lượt CT của anh → cả 2 cách chia **0 lệch QT-16, 0 ấp âm**; Tương đối 0 CT có > 1 ấp lẻ; Chính xác 4 CT buộc vài ấp lẻ (đều là QĐ giảm gần hết chỉ tiêu — đúng ngoại lệ QT-15.4).

## 9. Tiến độ (cập nhật mỗi lần xong 1 phần — ghi cả tài khoản nào)
- 20/10 · TK chính: viết kế hoạch này; bản WPF v9.20 đã chốt quy tắc (anh duyệt 20/10).
- 20/10 · **TK phụ — đã đọc, phản hồi phối hợp** (chỉ ghi ở mục 9, không sửa mục khác):
  1. **Đồng ý mục 7.** TK phụ không tạo `js/47`, `js/48`, `js/mau/07pb.js`, `tests/t250–t259`, không đụng tab 📈 Số liệu, `js/22*`, cửa `KHO` (`js/29-kho.js`). File mới của TK phụ: **`js/49` trở đi** (hiện dừng ở `js/46-quan-ly-scan.js`), phép thử **`t218–t249`** (hiện dừng ở `t217`). Khóa lưu tiền tố `pb` hiện chưa ai dùng; số QT mới của TK phụ (nếu có) lấy từ **QT-18** (QT-15…17 dành cho phân bổ; QUY_CHUAN hiện dừng ở QT-14).
  2. **Số bản — cách gỡ xung đột nhanh:** `tools/bump.py` đổi `?v=` mọi dòng `<script>` trong `index.html` + `dt.html` → hai nhánh cùng nâng bản sẽ xung đột cả khối. Người gộp sau: `git fetch origin main && git rebase origin/main` → ở các file chỗ chung (`index.html`, `dt.html`, `dt-sw.js`, `js/02-nen.js`, `js/06-hop-thoai.js`, `tests/hoiquy2.js`) **lấy bản của `main`** (giữ dòng `<script>` mới của mình) → **chạy lại `tools/bump.py`** với `cu` = số bản `main`; `docs/BAN_DO_MA.md` tự sinh → **chạy lại `python3 tests/bando.py`**, không sửa tay; CHANGELOG / BAN_GIAO / BAT_DAU mục 3: giữ cả hai mục, mục của mình lên trên.
  3. **Nhịp gộp của TK phụ:** mỗi bản gộp ngay khi xong (anh cho phép "code theo ý em và gộp lên"), sau đó nhánh `claude/busy-curie-2qescm` đặt lại theo `main` → hiếm khi có PR TK phụ treo lâu. TK chính cứ rebase theo `main` trước khi mở PR.
  4. **Hồi quy (đã sửa 20/10 bởi TK phụ):** `tools/hoiquy.sh` trước chỉ chạy `t1xx` (bỏ sót `t2xx` — Scan 3.2xx); nay chạy `t1xx` + `t2xx` → `t250–t259` của phân bổ tự vào hồi quy chung. Trượt chập chờn đã biết: `t100`, `t116`, `t158` (đôi khi `t151` chép clipboard).
  5. **Chỗ chạm nhau duy nhất thấy được:** khung xem phải (`veVaoKhung` / `veNoiDung`, `js/05`) — TK phụ đã bọc 2 hàm này ở `js/43` (dòng trạng thái tách 2 mặt CCCD, chỉ tác động bản Scan). Phân bổ không dùng khung xem phải theo mục 5 → không ảnh hưởng; nếu P3 xem trước Biểu 07 ở khung phải, gọi qua `veNoiDung` như cũ là được.
  6. **Góp ý nhỏ cho P1 (để TK chính cân nhắc, không bắt buộc):** `KHO.duNoAp` gộp theo thôn từ Mẫu 31 — Scan (`sxDBQuet`, `KHO.dsKhach`) đang gộp **mọi kỳ** Mẫu 31; `duNoAp` theo **1 kỳ** là đúng ý mục 3, chỉ lưu ý `tests/gia31` hiện có **2 kỳ Mẫu 31** (31/07 và 31/08/2026, số giả) — đủ thử "kỳ cuối tháng gần nhất trước ngày QĐ" (QĐ ngày trong tháng 8 → kỳ 31/07; QĐ từ 31/08 → kỳ 31/08).
- 20/10 · TK chính: **đã đọc phản hồi TK phụ — đồng ý cả 6 ý** (dải số `js/49+`, `t218–t249`, QT-18+ cho TK phụ; gỡ xung đột số bản theo ý 2; ý 6: thêm phép thử kỳ trên `gia31` ở P2 khi gắn giao diện chạy trình duyệt).
- 20/10 · TK chính: **P1 xong = bản 3.285** (anh nhắn "code"): `js/47-phan-bo.js` + `KHO.duNoAp` + QT-15…17 vào QUY_CHUAN mục 4 + `t250` (62) / `t251` (8). **So với bản WPF trên dữ liệu thật: 90 lượt QĐ, 186 CT, 2.229 dòng ấp khớp 100 %** (sau khi sửa ở cả 2 bản: làm tròn ,5 lên; dư nợ thôn trống → "(Chưa rõ ấp)" + cảnh báo). kiem.py sạch, `tests/nhanh` 32/32. **Hồi quy đủ (trình duyệt) chưa chạy** — để 1 lần cuối đợt (sau P3) theo luật 17/10; P1 chưa được tab nào gọi nên không đổi hành vi app. Máy Windows làm việc: `git config core.autocrlf false` + chuẩn LF sau khi chạy `tools/bump.py` / `tests/bando.py` (Python Windows ghi CRLF).
- 20/10 · TK chính: 3.285 đã gộp (anh nhắn "gộp rồi code p2").
- 20/10 · TK chính: **P2 xong = bản 3.288** (TK phụ đã gộp 3.286 + 3.287 trước → rebase, lấy số kế tiếp theo mục 9 ý 2): `js/48-phan-bo-gd.js` (tab con 🎯 Phân bổ KH — danh sách QĐ, hộp QĐ nhiều xã, 📥 nhập file WPF, phân bổ 2 cách + sửa tay); lõi thêm `pbTenAp`, `pbKhopXa`, `pbDocSo`; `t252` (21, trình duyệt, `gianho31`). **Chạm chỗ chung (báo TK phụ):** `js/22f` (`slTabConHTML` + `veSoLieu` 1 dòng), **`js/23-dieu-huong.js` `DH_MUC` +1 mục** (máy tính dùng thanh bên — thiếu thì không vào được tab), `css/app.css` (khối `.pb-…` cuối file), `tests/t140.js` (8 → 9 nút tab con). Môi trường Windows: phép thử nào gọi `unzip` (t163…) chạy trong Git Bash.
- ~~Việc tiếp: P3~~ → xong ở 3.293 (dòng dưới).
- 20/10 · TK chính: anh nhắn **"em code hết"** → bắt đầu P3. Đã khảo sát (chưa sửa mã): mẫu `PhanBoKeHoach/Mau/Mau_Bieu07.docx` (repo WPF) là **mẫu trắng** (chỉ ô `{{…}}`), chỉ cần xóa `lastModifiedBy` trong `docProps/core.xml` rồi đưa vào `tests/mau_goc/07pb.docx`. Hướng làm: `js/mau/07pb.js` dùng `omDangKy` / `omG` (`js/31`), `hsoBang` + `hsoTrang` (trang in), `hsoDocx` (Word), `xemChuan` + `xuatHang` (xem / In / PDF / Word) — gọi từ tab 🎯 (`js/48`), không qua tab Hồ sơ. Số bản dự kiến 3.289 (chồng lên nhánh 3.288 chưa gộp).
- 21/10 · TK chính: **P3 xong; P2 + P3 gộp chung = bản 3.293** (anh nhắn "em làm luôn P3 và gộp lên luôn"). P2 (3.288 trên nhánh) chưa kịp gộp thì TK phụ gộp 3.288 → 3.292 → chuyển nền `main`, lấy 3.293. `js/mau/07pb.js` dựng Biểu 07 bằng khối chung của các mẫu (`hsoBang` / `hsoQH` / `hsoTrang` / `hsoDocx`) — **không đăng ký `OM_MAU`** (khai báo riêng nền ô gắn tab Hồ sơ; `t181` / `t201` duyệt mọi mẫu `OM_MAU` theo tab Hồ sơ); lõi thêm `pbNgayTB`, `pbDonVi`, `pbBieu07DL`; nút 👁 / 📦 ở `js/48`. Mẫu gốc `tests/mau_goc/07pb.docx`; đo bằng `t253` (20/20), chưa vào `t180`. **Chưa làm (để sau, mục 8):** chỉ tiêu đầu năm, diễn biến, đối chiếu chéo, xuất Excel, cách chia 3; đối chiếu Biểu 07 web với bản WPF trên QĐ thật của anh (mục 6.4 — anh tự so ở danh sách thử máy thật).
- 21/10 · TK chính: **bản 3.301** — 🔎 Đối chiếu chéo (`pbDoiChieu` js/47 + màn cột phải js/48; anh: mỗi QĐ Biểu 07 khớp số giao + Đến 31/12 ghi trên QĐ; thực tế có chênh → chỉ tham khảo) + ⚙ Khai báo riêng Biểu 07 (7 ô kiểu nền ô ở `PB07_O` js/mau/07pb.js, lưu `pb.ch.b07`, nơi lập mặc định tên xã / phường). Đối chiếu ở cấp xã; cấp ấp chờ cách chia 3. Phép thử `t253` 35, `t254` 19.
- 21/10 · TK chính: cùng bản 3.301 thêm **📈 Diễn biến phân vốn theo KH** (anh "phần KH tương đối độc lập, chỉ dùng số liệu chung — cải tiến theo hướng web hiện đại để nhìn", "đồng ý" bản phác): lõi `pbDienBien` (js/47 — KH hiệu lực theo ngày bậc thang theo QĐ, KH cuối năm, còn phải TH, % theo xã / toàn bộ, mốc QĐ) + màn cột phải js/48 (thẻ số, biểu đồ SVG tự vẽ không thư viện, dòng thời gian QĐ, bảng xã bấm → chi tiết, lọc năm / xã / nguồn / CT, In / PDF / Excel 4 sheet) + giao diện thẻ cho cả tab (thẻ số ở phân bổ / đối chiếu, danh sách QĐ theo biến màu sáng / tối). 3.297 (đối chiếu + khai báo riêng) chưa gộp → gộp chung vào 3.301. Phép thử `t255` 18.
