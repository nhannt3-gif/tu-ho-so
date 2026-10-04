# 🎓 Hạn trả HSSV — công cụ riêng (HanTraHSSV.exe)

Cửa sổ nhỏ **luôn nằm trên** trình duyệt / chương trình nghiệp vụ, để vừa nhìn vừa nhập liệu. Cùng công thức với ô 🎓 Hạn trả HSSV trong app Tủ hồ sơ.

## Dùng
1. Tải `HanTraHSSV.exe` ở trang **[Releases](https://github.com/nhannt3-gif/tu-ho-so/releases)** (mục Assets của bản `hssv-v…` mới nhất) về máy, để đâu cũng được (vd Desktop). Không cần cài.
2. Bấm đúp để mở. Lần đầu Windows có thể báo **SmartScreen** ("Windows protected your PC") vì file chưa có chữ ký số → bấm **More info → Run anyway**.
3. Cần **.NET Framework 4.x** — có sẵn trên Windows 10 / 11 (Windows 7 / 8 cần cài .NET Framework 4.8).

## Nhập
- Dòng trên: loại khóa học (Trên 12 tháng / Đến 12 th · Y khoa) · **GDX** của xã (nhớ cho lần mở sau) · nút **Ghim: Bật / Tắt** (bật sẵn = luôn trên cùng) · **Chép câu chốt**.
- **Ngày vay** tự gợi ý = ngày GDX gần nhất kể từ hôm nay (gõ đè nếu khác).
- Mỗi món: gõ **ngày ra trường** (gõ số, tự thêm dấu /) → Enter → **tiền vay** (điền sẵn gợi ý theo năm học, gõ đè nếu khác) → Enter về ô ngày ra trường cho món kế.
- Enter / → sang ô sau, Shift+Enter / ← về ô trước; bấm vào ô là bôi đen số cũ; Esc đóng.
- Bấm vào khối kết quả / câu chốt là chép; bấm đúp dòng kỳ trả là chép ngày.
- Vị trí cửa sổ, GDX, ghim lưu ở `%APPDATA%\TuHoSo\hssv.ini`.

## Cho người sửa mã
- Mã nguồn: `HanTraHSSV.cs` (một file, C# 5, WinForms). Công thức trong lớp `Hs` chép đúng từ `index.html` (`hsDoc … hsTinh, hsGoiY, hsVayGoiY`) — **đổi quy tắc thì sửa cả hai nơi**.
- Dựng: `tools/hssv/dung.sh` (Linux, cần `mono-mcs` + `libmono-system-windows-forms4.0-cil`), hoặc trên Windows:
  `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:winexe /codepage:65001 /r:System.Windows.Forms.dll /r:System.Drawing.dll /out:HanTraHSSV.exe HanTraHSSV.cs`
- **Phát hành tự động:** `.github/workflows/hssv-release.yml` — gộp vào main có sửa `HanTraHSSV.cs` (hoặc bấm *Run workflow* ở tab Actions) → so 3000 ca app ↔ exe → dựng exe bằng csc trên Windows → đăng / cập nhật Release `hssv-v<AssemblyFileVersion>`. Ra bản mới thì tăng `AssemblyFileVersion` trong `HanTraHSSV.cs`; giữ nguyên số thì chỉ thay file exe trong bản cũ.
- So kết quả hai bản: `node tests/hssv_exe.js` (cần mono) — 3000+ ca ngẫu nhiên + ca anh chốt, phải khớp 100%.
