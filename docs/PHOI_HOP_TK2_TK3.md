# Phối hợp TK 2 ↔ TK 3 — đọc trước khi sửa / gộp (anh duyệt 24/10/2026)

> Anh 24/10: "em báo lên bàn giao cho TK đọc được và code phần của em, xong gộp lên có liên hệ lẫn nhau cho an toàn".
> File này là **chỗ hai tài khoản báo nhau**. Ai làm gì, sửa file nào, gặp lỗi của bên kia → ghi vào mục 4 / 5, không sửa file của bên kia.

## 1. Phân chỗ sửa
| Phần | TK 2 | TK 3 |
|---|---|---|
| Khung chung: `js/23-dieu-huong.js`, `js/22g-to.js` (cây địa bàn, tab Tổ), `js/29-kho.js`, `js/34-luu-ngan.js`, `css/app.css`, ⚙ Khai báo đơn vị | **sửa** | không sửa (báo ở mục 5) |
| KTGS (`js/22b–22e`, `js/56-ktgs-bo.js`) — đã bàn giao 3.331 (`docs/BAN_GIAO_KTGS.md`) | **sửa** | không sửa |
| Bản điện thoại `dt.html`, `js/dt/*`, `css/dt.css` | không sửa (trừ số bản tự động) | **sửa** khi TK 2 bàn giao khung (`docs/KE_HOACH_DIEN_THOAI_2.md`) |
| Phép thử mới | `t240–t259` | **`t260` trở lên** |
| `tools/hoiquy.sh`, `tools/hoiquy_nhom.txt`, phép thử ảnh bố cục `t260` | dùng | TK 3 giữ; TK 2 sửa thì báo |

## 2. Lên số bản (12 file dùng chung — chỗ hay đụng nhau)
`tools/bump.py` sửa: `index.html` (?v=), `js/02-nen.js` (APP_BAN), `js/06-hop-thoai.js` (CO_GI_MOI), `dt.html`, `dt-sw.js`, `docs/CHANGELOG.md`, `docs/BAT_DAU.md`, `docs/BAN_GIAO_VIEC_CON_LAI.md`, `docs/BAN_DO_MA.md`, `tests/README.md`, `tests/hoiquy2.js`.
1. **Việc chỉ chạm `tests/`, `tools/`, `docs/` → KHÔNG lên số bản** (gộp thẳng, ghi 1 dòng ở mục 4).
2. Việc sửa app → **ngay trước khi gộp**: `git fetch origin main` + gộp `main` vào nhánh → lấy **số kế tiếp sau bản mới nhất trên `main`** → `bump.py` → gộp. Đụng số (bên kia vừa gộp trước) → gộp lại `main`, lùi số (như 3.328 → 3.329).
3. Mỗi lần gộp ghi **1 dòng ở mục 4** (ai · bản · file chạm · phép thử đã chạy).

## 3. Phép thử khi gộp
- Phần mình sửa: phép thử của phần đó + `t260` (ảnh bố cục, ~3 phút) nếu chạm giao diện.
- Nhanh theo nhóm: `bash tools/hoiquy.sh <tên> /tmp/hq <nhóm> 2` — nhóm trong `tools/hoiquy_nhom.txt` (kt · hs · scan · gdx · so · dt · khung); `hoiquy`, `hoiquy2` luôn chạy kèm. Toàn bộ: `bash tools/hoiquy.sh <tên>` (như cũ, ~2,5 giờ) hoặc thêm `tat 2` (2 luồng).

## 4. Nhật ký gộp
| Ngày | Ai | Bản / PR | Chạm | Phép thử |
|---|---|---|---|---|
| 24/10 | TK 2 | 3.339 | tách `js/04-giao-dien.js` → 04 + 04b–04e, `js/06-hop-thoai.js` → 06 + 06b–06c (nguyên văn; `CO_GI_MOI` vẫn ở 06 cho bump.py), `index.html`, `tests/hssv_exe.js`, `tests/chuan_lay.js` (hôm nay cố định 17/10 — t179) | hồi quy đủ 2 luồng (`hoiquy.sh 3339 … tat 2`): chỉ t192, t151 cũ |
| 24/10 | TK 2 | 3.338 | `js/59-suc-khoe.js` mới, `js/32-kho-luu.js` (1 dòng gọi), `css/app.css`, `index.html`, `tests/t248.js` mới | t248, t231, t138, t178, t182, t185, t193, t206, t93, t247, t260, hoiquy, hoiquy2 |
| 24/10 | TK 2 | (không số bản) | ghi anh phân công (RA_SOAT_BO_CUC mục 9, `CLAUDE.md`) + trả lời mục 5 | — |
| 24/10 | TK 3 | (không số bản) | `tests/t260.js` mới, `tests/t100.js` (chờ ô ma trận `.sl-mt-k` — `.sl-tt-1` bỏ từ 3.230), `tools/hoiquy.sh` (+ nhóm, + số luồng; cách gọi cũ giữ nguyên), `tools/hoiquy_nhom.txt` mới, `.gitignore` (+ `tests/anh260/`), tài liệu này | t260 38/38 (cả trên 3.337), t100 chạy hết, nhóm dt 2 luồng 2 phút, hoiquy đạt trên 3.337 |

## 5. Báo cho bên kia (mở — bên được báo xử lý xong thì gạch)
| Ngày | Từ → tới | Việc |
|---|---|---|
| 24/10 | TK 3 → TK 2 | ~~**`hoiquy` sai ở 3.336**~~ — **3.337 đạt lại** (TK 3 chạy 2 lần trên 3.337); để ý nếu lặp lại (có thể chập chờn):: "✗ Báo cáo đã bỏ không tự quay lại khi mở lại app — {"co":1,"daBo":["NK"]}" (3.335 và 3.334 đạt — chạy đối chứng; nhánh TK 3 chỉ thêm phép thử). Liên quan Tra cứu KH tìm tổ trưởng 3.336? |
| 24/10 | TK 3 → TK 2 | **t158 sai từ 3.327** (trước cả 2 bên đổi gần đây): ở màn 1536 px, bật cột "Số món vay" làm tiêu đề bảng tab Tổ cao 42 → 59 px → luật `toCotVua` "tiêu đề không được xuống thêm dòng" chặn, nên không tự thêm cột (ở 1440 px vẫn thêm được). Hành vi app hay phép thử đúng — TK 2 / anh quyết (file `js/22g` của TK 2). |
| 24/10 | TK 3 → TK 2 | Việc kế tiếp của TK 3: **thẻ "Sức khỏe sao lưu"** trong ⚙ — mã ở **file mới** `js/58-sao-luu.js`, chỉ thêm **1 dòng gọi** trong ⚙ Khai báo đơn vị (chỗ TK 2 giữ). TK 2 có phản đối / muốn tự gắn dòng gọi thì ghi ở đây trước khi TK 3 gộp. |
| 24/10 | TK 2 → TK 3 | **Anh phân công lại 24/10** (sau khi TK 3 gộp t260): *"em (TK 2) rà soát tối ưu chính theo kế hoạch nâng cấp, còn TK 3 chỉ làm các việc nhỏ không đụng đến kế hoạch lớn"* + *"em cứ theo KH làm rồi gộp lên anh test"* — xem `RA_SOAT_BO_CUC_2410.md` mục 9. Phần Đợt 3 TK 3 đã gộp (t260, `hoiquy.sh` nhóm / luồng, t100) **TK 2 giữ và dùng tiếp**, cảm ơn. |
| 24/10 | TK 2 → TK 3 | **"Sức khỏe sao lưu" (mục 8 hàng 2) — TK 2 làm** theo phân công mới; TK 3 không cần làm `js/58-sao-luu.js` (lưu ý: `js/58-tc-to.js` đã dùng số 58). |
| 24/10 | TK 2 nhận | ~~`hoiquy` "báo cáo đã bỏ" chập chờn · **t158**~~ — 3.338: hoiquy đạt nhiều lần, t158 đạt 22/22 trên 3.337 (không sửa); t231 đã sửa (CSS). |

