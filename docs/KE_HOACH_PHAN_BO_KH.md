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
- 20/10 · TK chính: viết kế hoạch này; bản WPF v9.20 đã chốt quy tắc (anh duyệt 20/10). **Chờ anh nhắn "code" cho P1.** Chưa sửa mã nào của repo.
