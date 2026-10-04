// Hạn trả HSSV — công cụ riêng (WinForms, .NET Framework 4.x có sẵn trên Windows 10/11).
// Công thức chép đúng từ index.html (hsDoc, hsEdate, hsThang, hsVeGD, hsTinh, hsGoiY, hsVayGoiY) — sửa quy tắc thì sửa CẢ HAI nơi,
// rồi chạy `node tests/hssv_exe.js` để so kết quả hai bản.
// Dựng: tools/hssv/dung.sh (mono mcs) — ra HanTraHSSV.exe.
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;

[assembly: AssemblyTitle("Hạn trả HSSV")]
[assembly: AssemblyProduct("Tủ hồ sơ — công cụ Hạn trả HSSV")]
[assembly: AssemblyCompany("NhanNT")]
[assembly: AssemblyCopyright("© NhanNT")]
[assembly: AssemblyVersion("1.2.1.0")]
[assembly: AssemblyFileVersion("1.2.1.0")]

namespace TuHoSo
{
    // ===================== CÔNG THỨC (giống index.html) =====================
    public class HsVao { public string Vay = "", Rt = "", Gdx = "", Tien = "", Loai = "tren"; }
    public class HsKy { public DateTime Goc, Ngay; public bool Cuoi; public long? Tien; }
    public class HsGoiY { public int Nua, Thang, Trieu; public string Nam = ""; public List<string> Ds = new List<string>(); }
    public class HsKq
    {
        public List<string> Loi = new List<string>();
        public int Tp, SoNgay, Ttn, ThoiHan, G;
        public string Loai;
        public DateTime Vay, Rt, Hc, HcGD, Moc;
        public List<HsKy> Ky = new List<HsKy>();
        public long T, Moi, CuoiTien;
        public bool Kiem;
        public HsGoiY GoiY;
        public string Cau = "";
    }

    public static class Hs
    {
        static readonly Regex RNgay = new Regex(@"^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{2}|\d{4})$");
        public static DateTime? Doc(string v)
        {
            v = (v ?? "").Trim();
            string d, m, y;
            var k = RNgay.Match(v);
            if (k.Success) { d = k.Groups[1].Value; m = k.Groups[2].Value; y = k.Groups[3].Value; }
            else
            {
                var so = Regex.Replace(v, @"\D", "");
                if (so.Length == 8 || so.Length == 6) { d = so.Substring(0, 2); m = so.Substring(2, 2); y = so.Substring(4); }
                else return null;
            }
            int dd = int.Parse(d), mm = int.Parse(m), yy = int.Parse(y);
            if (yy < 100) yy += 2000;
            if (mm < 1 || mm > 12 || dd < 1 || dd > DateTime.DaysInMonth(yy, mm)) return null;
            return new DateTime(yy, mm, dd);
        }
        public static string Ngay(DateTime d) { return d.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture); }
        static int FloorDiv(int a, int b) { return (int)Math.Floor((double)a / b); }
        static int Mod(int a, int b) { return ((a % b) + b) % b; }
        /* EDATE: cộng n tháng, ngày lớn hơn cuối tháng thì lấy cuối tháng */
        public static DateTime Edate(DateTime d, int n)
        {
            int th = d.Month - 1 + n, yy = d.Year + FloorDiv(th, 12), mm = Mod(th, 12) + 1;
            return new DateTime(yy, mm, Math.Min(d.Day, DateTime.DaysInMonth(yy, mm)));
        }
        /* DATEDIF(…,"M") */
        public static int Thang(DateTime a, DateTime b) { int m = (b.Year - a.Year) * 12 + b.Month - a.Month; if (b.Day < a.Day) m--; return m; }
        public static int SoNgay(DateTime a, DateTime b) { return (int)(b.Date - a.Date).TotalDays; }
        /* ngày GDX của tháng th (0-based, có thể âm / vượt 11) */
        public static DateTime NgayGD(int y, int th, int g)
        {
            int yy = y + FloorDiv(th, 12), mm = Mod(th, 12) + 1;
            return new DateTime(yy, mm, Math.Min(g, DateTime.DaysInMonth(yy, mm)));
        }
        /* hạn ≤ ngày GDX cùng tháng → GDX tháng trước; ngược lại GDX tháng đó */
        public static DateTime VeGD(DateTime h, int g)
        {
            var cur = NgayGD(h.Year, h.Month - 1, g);
            return SoNgay(cur, h) <= 0 ? NgayGD(h.Year, h.Month - 2, g) : cur;
        }
        public static string Tien(long so) { return so.ToString("#,##0", CultureInfo.InvariantCulture).Replace(",", "."); }
        static bool LaGdx(string s, out int g) { double x; g = 0; if (!double.TryParse((s ?? "").Trim(), NumberStyles.Float, CultureInfo.InvariantCulture, out x)) return false; if (x < 1 || x > 31 || x != Math.Floor(x)) return false; g = (int)x; return true; }

        /* ngày giải ngân gợi ý = ngày GDX gần nhất kể từ hôm nay (hôm nay đúng GDX thì lấy hôm nay) */
        public static string VayGoiY(string gdx, DateTime homNay)
        {
            int g; if (!LaGdx(gdx, out g)) return "";
            var h = homNay.Date; var c = NgayGD(h.Year, h.Month - 1, g);
            if (SoNgay(h, c) < 0) c = NgayGD(h.Year, h.Month, g);
            return Ngay(c);
        }
        /* tiền vay gợi ý theo năm học (tháng 9): năm cuối theo tháng ra (6–8 tròn, 2–5 nửa, 9–12 và 1 không tính);
           năm đầu theo tháng vay (9–12 tròn, 1–5 nửa, 6–8 từ năm sau); tối thiểu nửa năm; nửa năm = 5 tháng = 20 triệu */
        public static HsGoiY GoiY(HsVao v)
        {
            var a = Doc(v.Vay); var b = Doc(v.Rt);
            if (a == null || b == null || SoNgay(a.Value, b.Value) <= 0) return null;
            Func<DateTime, int> nh = d => d.Month >= 9 ? d.Year : d.Year - 1;
            int ma = a.Value.Month, mb = b.Value.Month;
            double fa = ma >= 9 ? 1 : (ma <= 5 ? 0.5 : 0), fb = (mb >= 6 && mb <= 8) ? 1 : (mb >= 2 && mb <= 5 ? 0.5 : 0);
            int na = nh(a.Value), nb = nh(b.Value); double tong;
            var ds = new List<KeyValuePair<int, double>>();
            if (na == nb) { tong = fa + fb - 1; ds.Add(new KeyValuePair<int, double>(na, Math.Max(0, tong))); }
            else
            {
                tong = fa + (nb - na - 1) + fb; ds.Add(new KeyValuePair<int, double>(na, fa));
                for (int y = na + 1; y < nb; y++) ds.Add(new KeyValuePair<int, double>(y, 1));
                ds.Add(new KeyValuePair<int, double>(nb, fb));
            }
            int nua = Math.Max(1, (int)Math.Floor(tong * 2 + 0.5)), nam = nua / 2;
            var r = new HsGoiY { Nua = nua, Thang = nua * 5, Trieu = nua * 20 };
            r.Nam = (nam > 0 ? nam + " năm" : "") + (nua % 2 == 1 ? (nam > 0 ? " rưỡi" : "nửa năm") : "");
            foreach (var x in ds) r.Ds.Add(x.Key + "-" + (x.Key + 1) + " (" + (x.Value == 1 ? "tròn năm" : x.Value == 0.5 ? "nửa năm" : "không tính") + ")");
            return r;
        }
        static readonly Regex RSo = new Regex(@"^\s*[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?");
        static double ParseFloat(string s)
        {
            int i = s.IndexOf(','); if (i >= 0) s = s.Substring(0, i) + "." + s.Substring(i + 1);   /* JS replace(',', '.') chỉ thay dấu đầu */
            var m = RSo.Match(s); if (!m.Success) return double.NaN;
            return double.Parse(m.Value.Trim(), NumberStyles.Float, CultureInfo.InvariantCulture);
        }
        public static HsKq Tinh(HsVao v)
        {
            var kq = new HsKq();
            var vay = Doc(v.Vay); var rt = Doc(v.Rt); int g; bool coG = LaGdxJs(v.Gdx, out g);
            if (vay == null) kq.Loi.Add("Ngày vay chưa đúng (dd/mm/yyyy)");
            if (rt == null) kq.Loi.Add("Ngày ra trường chưa đúng (dd/mm/yyyy)");
            if (!coG) kq.Loi.Add("Ngày GDX phải từ 1 đến 31");
            if (vay != null && rt != null && SoNgay(vay.Value, rt.Value) <= 0) kq.Loi.Add("Ngày ra trường phải sau ngày vay");
            if (kq.Loi.Count > 0) return kq;
            int tp = Thang(vay.Value, rt.Value), soNgay = SoNgay(vay.Value, rt.Value);
            string loai = v.Loai == "duoi" ? "duoi" : "tren";
            kq.Tp = tp; kq.SoNgay = soNgay; kq.Loai = loai; kq.Vay = vay.Value; kq.Rt = rt.Value; kq.G = g;
            if (loai == "tren")
            {
                kq.Moc = rt.Value.AddDays(soNgay);           /* ra trường + số ngày phát tiền vay */
                kq.Hc = Edate(kq.Moc, 12);                   /* + 12 tháng ân hạn */
                kq.Ttn = tp; kq.ThoiHan = tp * 2 + 12;
            }
            else
            {
                kq.Hc = Edate(rt.Value, tp * 2 + 12);
                kq.Ttn = tp * 2; kq.ThoiHan = tp * 3 + 12;
            }
            kq.HcGD = VeGD(kq.Hc, g);
            for (int k = 1; k < 60; k++)
            {
                var r = Edate(rt.Value, 12 * k); if (SoNgay(r, kq.Hc) <= 0) break;
                var gd = VeGD(r, g); if (SoNgay(gd, kq.HcGD) <= 0) break;
                kq.Ky.Add(new HsKy { Goc = r, Ngay = gd });
            }
            kq.Ky.Add(new HsKy { Goc = kq.Hc, Ngay = kq.HcGD, Cuoi = true });
            kq.GoiY = GoiY(v);
            double tien = ParseFloat(v.Tien ?? "");
            if (tien > 0)
            {
                long T = (long)Math.Floor(tien * 1e6 + 0.5); int n = kq.Ky.Count;
                long moi = (long)(Math.Floor((double)T / n / 1e5) * 1e5);
                if (moi <= 0) moi = (long)Math.Floor((double)T / n);
                kq.T = T;
                for (int i = 0; i < n; i++) kq.Ky[i].Tien = i < n - 1 ? moi : T - moi * (n - 1);
                kq.Moi = moi; kq.CuoiTien = T - moi * (n - 1);
            }
            kq.Kiem = SoNgay(Edate(vay.Value, kq.ThoiHan), kq.Hc) >= 0;
            var cau = (kq.T > 0 ? "Số tiền vay " + Tien(kq.T) + " đồng, " : "") + "thời hạn " + kq.ThoiHan + " tháng, hạn cuối " + Ngay(kq.HcGD) +
                (kq.T > 0 ? ", trả " + Tien(kq.Moi) + " đồng/lần" : "") + ", lần 1: " + Ngay(kq.Ky[0].Ngay) +
                (kq.T > 0 && kq.CuoiTien != kq.Moi ? ", lần cuối " + Tien(kq.CuoiTien) + " đồng" : "");
            kq.Cau = char.ToUpper(cau[0]) + cau.Substring(1);
            return kq;
        }
        /* JS: g = +v.gdx; g>=1 && g<=31 (chấp nhận số lẻ như JS — ô GDX chỉ cho gõ số nguyên) */
        static bool LaGdxJs(string s, out int g)
        {
            g = 0; s = (s ?? "").Trim(); double x;
            if (s == "") return false;
            if (!double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out x)) return false;
            if (!(x >= 1 && x <= 31)) return false;
            g = (int)x; return true;
        }
    }

    // ===================== GIAO DIỆN =====================
    public class FormHs : Form
    {
        /* 1.1: tông màu theo app (thanh đầu xanh #185FA5), ô có chữ gợi ý.
           1.2: 3 mức (thu nhỏ / thu gọn / chi tiết) + nền sáng / tối — nhớ trong hssv.ini */
        Color Dau, DauDam, Nen, The, VienThe, Chu, ChuPhu, XanhNen, XanhVien, XanhChu, XanhLa, XamNen, XamVien, XamChu, Cam, CamNen, VangO, ONen;
        bool toi; string muc = "gon";   /* nho | gon | chi */
        void DatMau()
        {
            if (!toi)
            {
                Dau = Color.FromArgb(0x18, 0x5F, 0xA5); DauDam = Color.FromArgb(0x0F, 0x44, 0x78); Nen = Color.FromArgb(0xEC, 0xF1, 0xF7); The = Color.White; VienThe = Color.FromArgb(0xC9, 0xD6, 0xE3);
                Chu = Color.FromArgb(0x1F, 0x29, 0x33); ChuPhu = Color.FromArgb(0x5A, 0x65, 0x70);
                XanhNen = Color.FromArgb(0xE3, 0xF4, 0xE8); XanhVien = Color.FromArgb(0x3C, 0x9A, 0x5F); XanhChu = Color.FromArgb(0x14, 0x55, 0x2A); XanhLa = Color.FromArgb(0x1E, 0x6A, 0x33);
                XamNen = Color.FromArgb(0xE6, 0xEE, 0xF7); XamVien = Color.FromArgb(0x7F, 0x9D, 0xBF); XamChu = Color.FromArgb(0x23, 0x46, 0x6E);
                Cam = Color.FromArgb(0xB4, 0x53, 0x09); CamNen = Color.FromArgb(0xFF, 0xF1, 0xE0); VangO = Color.FromArgb(0xFF, 0xF8, 0xD6); ONen = Color.White;
            }
            else
            {
                Dau = Color.FromArgb(0x12, 0x29, 0x3E); DauDam = Color.FromArgb(0x0B, 0x1C, 0x2C); Nen = Color.FromArgb(0x1B, 0x22, 0x2B); The = Color.FromArgb(0x24, 0x2D, 0x38); VienThe = Color.FromArgb(0x3A, 0x47, 0x57);
                Chu = Color.FromArgb(0xE6, 0xED, 0xF3); ChuPhu = Color.FromArgb(0x9A, 0xA7, 0xB4);
                XanhNen = Color.FromArgb(0x16, 0x3A, 0x24); XanhVien = Color.FromArgb(0x3F, 0xAF, 0x6A); XanhChu = Color.FromArgb(0x9B, 0xE3, 0xB4); XanhLa = Color.FromArgb(0x1E, 0x6A, 0x33);
                XamNen = Color.FromArgb(0x1C, 0x2E, 0x44); XamVien = Color.FromArgb(0x4F, 0x78, 0xA6); XamChu = Color.FromArgb(0xB7, 0xD3, 0xF2);
                Cam = Color.FromArgb(0xF0, 0xA0, 0x50); CamNen = Color.FromArgb(0x3A, 0x2A, 0x16); VangO = Color.FromArgb(0x3A, 0x35, 0x20); ONen = Color.FromArgb(0x1F, 0x27, 0x31);
            }
        }

        TableLayoutPanel goc, nhap; FlowLayoutPanel tren;
        ComboBox cbLoai; TextBox tGdx, tVay, tRt, tTien; CheckBox ckNoi; Button bChep, bNho, bMau, bChiTiet;
        Label lTacGia, lTen, lG, lVay, lRt, lTien, lHd, lLuuY, lLoi, lMini, lCau, lChiTiet, lBao; ListView lvKy; Panel pKq;
        Label[] oNhan = new Label[5], oSo = new Label[5], oPhu = new Label[5]; Panel[] oKhoi = new Panel[5]; string[] oChep = new string[5];
        readonly HsVao V = new HsVao();
        bool vayTay, dangDat, chuotBam, coKq; int kqCao;
        readonly string tepCH = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "TuHoSo", "hssv.ini");
        Timer tBao = new Timer { Interval = 2500 };
        ToolTip goiY = new ToolTip { AutoPopDelay = 8000, InitialDelay = 400 };

        [DllImport("user32.dll", CharSet = CharSet.Unicode)]
        static extern IntPtr SendMessage(IntPtr hWnd, int msg, IntPtr wParam, string lParam);
        /* chữ gợi ý xám trong ô trống (EM_SETCUEBANNER) — máy không phải Windows thì bỏ qua */
        static void ChuMo(TextBox t, string chu)
        {
            EventHandler dat = (s, e) => { try { SendMessage(t.Handle, 0x1501, (IntPtr)1, chu); } catch { } };
            if (t.IsHandleCreated) dat(t, EventArgs.Empty); else t.HandleCreated += dat;
        }
        static void VeVien(Control c, Func<Color> mau, int day)
        {
            c.Paint += (s, e) => { using (var pen = new Pen(mau(), day)) { int n = day / 2; e.Graphics.DrawRectangle(pen, n, n, c.Width - day, c.Height - day); } };
            c.Resize += (s, e) => c.Invalidate();
        }
        static Button NutPhang(string chu)
        {
            var b = new Button { Text = chu, AutoSize = true, FlatStyle = FlatStyle.Flat, Margin = new Padding(0, 3, 6, 0), Cursor = Cursors.Hand, UseVisualStyleBackColor = false };
            b.FlatAppearance.BorderSize = 1; return b;
        }

        public FormHs()
        {
            Text = "Hạn trả HSSV — Tủ hồ sơ";
            Font = new Font("Segoe UI", 10f);
            StartPosition = FormStartPosition.Manual;
            ClientSize = new Size(500, 470);
            MinimumSize = new Size(380, 150);
            TopMost = true;
            KeyPreview = true;
            DocCauHinhMau();
            DatMau();

            goc = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 1, RowCount = 8 };
            goc.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));   /* cột co theo cửa sổ, không giãn theo chữ */
            for (int r = 0; r < 5; r++) goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            goc.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            Controls.Add(goc);

            /* thanh đầu: tên · loại khóa học · GDX · ghim · thu nhỏ · nền · chép */
            tren = new FlowLayoutPanel { AutoSize = true, Dock = DockStyle.Fill, WrapContents = true, Margin = new Padding(0), Padding = new Padding(10, 7, 10, 7) };
            lTen = new Label { Text = "Hạn trả HSSV", AutoSize = true, Font = new Font("Segoe UI", 12f, FontStyle.Bold), Margin = new Padding(0, 4, 10, 0) };
            cbLoai = new ComboBox { DropDownStyle = ComboBoxStyle.DropDownList, Width = 145, Margin = new Padding(0, 4, 8, 0), FlatStyle = FlatStyle.Flat };
            cbLoai.Items.AddRange(new object[] { "Trên 12 tháng", "Đến 12 th · Y khoa" }); cbLoai.SelectedIndex = 0;
            cbLoai.SelectedIndexChanged += (s, e) => { V.Loai = cbLoai.SelectedIndex == 1 ? "duoi" : "tren"; ApMau(); VeKq(); };
            lG = new Label { Text = "GDX", AutoSize = true, Margin = new Padding(0, 8, 4, 0) };
            tGdx = O(48); tGdx.Margin = new Padding(0, 3, 10, 0); tGdx.TextAlign = HorizontalAlignment.Center;
            ckNoi = new CheckBox { Text = "Ghim: Bật", Appearance = Appearance.Button, AutoSize = true, Checked = true, FlatStyle = FlatStyle.Flat, Margin = new Padding(0, 3, 6, 0), Cursor = Cursors.Hand };
            ckNoi.CheckedChanged += (s, e) => { TopMost = ckNoi.Checked; ckNoi.Text = ckNoi.Checked ? "Ghim: Bật" : "Ghim: Tắt"; };
            bNho = NutPhang("Thu nhỏ"); bNho.Click += (s, e) => DatMuc(muc == "nho" ? "gon" : "nho");
            bMau = NutPhang("Nền tối"); bMau.Click += (s, e) => { toi = !toi; DatMau(); ApMau(); VeKq(); GhiCauHinh(); };
            bChep = new Button { Text = "Chép câu chốt", AutoSize = true, FlatStyle = FlatStyle.Flat, Font = new Font("Segoe UI", 10f, FontStyle.Bold), Margin = new Padding(0, 3, 0, 0), Cursor = Cursors.Hand, UseVisualStyleBackColor = false };
            bChep.FlatAppearance.BorderSize = 0;
            bChep.Click += (s, e) => ChepCau();
            tren.Controls.AddRange(new Control[] { lTen, cbLoai, lG, tGdx, ckNoi, bNho, bMau, bChep });
            goc.Controls.Add(tren, 0, 0);   /* 1.0.1: gán cố định hàng — Windows dồn ô khi dòng ẩn, khung kết quả bị co */
            goiY.SetToolTip(tGdx, "Ngày giao dịch của xã (1–31) — app nhớ cho lần mở sau");
            goiY.SetToolTip(cbLoai, "Phân loại theo thời gian khóa đào tạo");
            goiY.SetToolTip(ckNoi, "Bật: cửa sổ luôn nằm trên các cửa sổ khác");
            goiY.SetToolTip(bNho, "Thu nhỏ còn 1 dải: ô ra trường, tiền vay và 1 dòng kết quả");
            goiY.SetToolTip(bMau, "Đổi nền sáng / tối");

            lLuuY = new Label { AutoSize = true, Visible = false, Padding = new Padding(8, 5, 8, 5), Margin = new Padding(10, 8, 10, 0), MaximumSize = new Size(900, 0) };
            goc.Controls.Add(lLuuY, 0, 1);

            /* thẻ nhập: ngày vay · ngày ra trường · tiền vay + dòng hướng dẫn */
            nhap = new TableLayoutPanel { Dock = DockStyle.Fill, AutoSize = true, ColumnCount = 3, RowCount = 3, Margin = new Padding(10, 8, 10, 6), Padding = new Padding(10, 8, 10, 8) };
            VeVien(nhap, () => VienThe, 1);
            nhap.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33)); nhap.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 31)); nhap.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 36));
            lVay = NhanO("Ngày vay"); lRt = NhanO("Ngày ra trường"); lTien = NhanO("Tiền vay (triệu)");
            tVay = O(0); tRt = O(0); tTien = O(0);
            foreach (var t in new[] { tVay, tRt, tTien }) { t.Dock = DockStyle.Fill; t.Margin = new Padding(0, 0, 8, 0); }
            nhap.Controls.Add(lVay, 0, 0); nhap.Controls.Add(lRt, 1, 0); nhap.Controls.Add(lTien, 2, 0);
            nhap.Controls.Add(tVay, 0, 1); nhap.Controls.Add(tRt, 1, 1); nhap.Controls.Add(tTien, 2, 1);
            lHd = new Label { Text = "Mỗi món: ngày ra trường → Enter → tiền vay → Enter sang món kế · bấm khối kết quả để chép", AutoSize = true, Font = new Font("Segoe UI", 8.5f), Margin = new Padding(0, 6, 0, 0), MaximumSize = new Size(900, 0) };
            nhap.Controls.Add(lHd, 0, 2); nhap.SetColumnSpan(lHd, 3);
            nhap.Resize += (s, e) => { lHd.MaximumSize = new Size(Math.Max(200, nhap.ClientSize.Width - 24), 0); };
            goc.Controls.Add(nhap, 0, 2);
            ChuMo(tGdx, "1–31"); ChuMo(tVay, "dd/mm/yyyy"); ChuMo(tRt, "dd/mm/yyyy"); ChuMo(tTien, "vd 40");
            goiY.SetToolTip(tVay, "Ngày giải ngân — tự gợi ý ngày GDX gần nhất kể từ hôm nay; gõ đè nếu khác");
            goiY.SetToolTip(tRt, "Gõ số liền, vd 30082030 — tự thêm dấu /");
            goiY.SetToolTip(tTien, "Tự điền gợi ý theo năm học (từ tháng 9); gõ đè nếu hộ vay ít hơn");

            lLoi = new Label { AutoSize = true, Visible = false, Padding = new Padding(8, 6, 8, 6), Margin = new Padding(10, 0, 10, 6), MaximumSize = new Size(900, 0) };
            goc.Controls.Add(lLoi, 0, 3);

            /* mức thu nhỏ: 1 dòng kết quả, bấm là chép câu chốt */
            lMini = new Label { AutoSize = true, Visible = false, Font = new Font("Segoe UI", 10f, FontStyle.Bold), Padding = new Padding(10, 6, 10, 6), Margin = new Padding(10, 0, 10, 8), MaximumSize = new Size(900, 0), Cursor = Cursors.Hand };
            lMini.Click += (s, e) => ChepCau();
            goiY.SetToolTip(lMini, "Bấm để chép câu chốt");
            goc.Controls.Add(lMini, 0, 4);

            /* kết quả: 3 khối lớn + 2 khối nhỏ, câu chốt, [Chi tiết], chi tiết, các kỳ trả */
            pKq = new Panel { Dock = DockStyle.Fill, AutoScroll = true, Margin = new Padding(10, 0, 4, 6) };
            for (int i = 0; i < 5; i++)
            {
                bool phu = i >= 3;
                var p = new Panel { Padding = new Padding(5, 4, 5, 4), Height = phu ? 60 : 82, Cursor = Cursors.Hand };
                int idx = i;
                VeVien(p, phu ? (Func<Color>)(() => XamVien) : () => XanhVien, 2);
                oNhan[i] = new Label { Dock = DockStyle.Top, Height = 19, TextAlign = ContentAlignment.MiddleCenter, Font = new Font("Segoe UI", 8.5f), AutoEllipsis = true, BackColor = Color.Transparent };
                oSo[i] = new Label { Dock = DockStyle.Top, Height = phu ? 23 : 31, TextAlign = ContentAlignment.MiddleCenter, Font = new Font("Segoe UI", phu ? 12f : 15f, FontStyle.Bold), BackColor = Color.Transparent };
                oPhu[i] = new Label { Dock = DockStyle.Fill, TextAlign = ContentAlignment.TopCenter, Font = new Font("Segoe UI", 8f, i == 0 ? FontStyle.Bold : FontStyle.Regular), BackColor = Color.Transparent };
                p.Controls.Add(oPhu[i]); p.Controls.Add(oSo[i]); p.Controls.Add(oNhan[i]);
                EventHandler bam = (s, e) => { if (!string.IsNullOrEmpty(oChep[idx])) Chep(oChep[idx], "Đã chép: " + oChep[idx]); };
                p.Click += bam; oNhan[i].Click += bam; oSo[i].Click += bam; oPhu[i].Click += bam;
                goiY.SetToolTip(p, "Bấm để chép"); goiY.SetToolTip(oSo[i], "Bấm để chép");
                oKhoi[i] = p; pKq.Controls.Add(p);
            }
            lCau = new Label { AutoSize = false, ForeColor = Color.White, Font = new Font("Segoe UI", 10f, FontStyle.Bold), Padding = new Padding(10, 7, 10, 7), Cursor = Cursors.Hand };
            lCau.Click += (s, e) => { if (lCau.Text != "") Chep(lCau.Text, "Đã chép câu chốt — dán vào hồ sơ."); };
            goiY.SetToolTip(lCau, "Bấm để chép câu chốt");
            bChiTiet = NutPhang("Chi tiết ▼"); bChiTiet.AutoSize = false; bChiTiet.Height = 28;
            bChiTiet.Click += (s, e) => DatMuc(muc == "chi" ? "gon" : "chi");
            lChiTiet = new Label { AutoSize = false, Font = new Font("Segoe UI", 8.5f), Padding = new Padding(8, 5, 8, 5) };
            lvKy = new ListView { View = View.Details, FullRowSelect = true, GridLines = true, HeaderStyle = ColumnHeaderStyle.Nonclickable, Height = 150, Font = new Font("Segoe UI", 9.5f), BorderStyle = BorderStyle.FixedSingle };
            lvKy.Columns.Add("Kỳ trả", 110); lvKy.Columns.Add("Ngày trả (GDX)", 120); lvKy.Columns.Add("Gốc phải trả", 130, HorizontalAlignment.Right);
            lvKy.DoubleClick += (s, e) => { if (lvKy.SelectedItems.Count > 0) { var t = lvKy.SelectedItems[0].SubItems[1].Text; Chep(t, "Đã chép: " + t); } };
            goiY.SetToolTip(lvKy, "Bấm đúp một dòng để chép ngày trả");
            pKq.Controls.Add(lCau); pKq.Controls.Add(bChiTiet); pKq.Controls.Add(lChiTiet); pKq.Controls.Add(lvKy);
            pKq.Resize += (s, e) => XepKq();
            goc.Controls.Add(pKq, 0, 5);

            lBao = new Label { Dock = DockStyle.Fill, AutoSize = true, ForeColor = Color.White, Font = new Font("Segoe UI", 9.5f, FontStyle.Bold), Padding = new Padding(10, 6, 10, 6), Margin = new Padding(0), Visible = false };
            goc.Controls.Add(lBao, 0, 6);
            /* 1.2.1: tên tác giả (chỉ tên) — dòng nhỏ xanh lá cuối cửa sổ */
            lTacGia = new Label { Text = "NhanNT", AutoSize = true, Font = new Font("Segoe UI", 8f, FontStyle.Bold), Margin = new Padding(12, 0, 0, 4) };
            goc.Controls.Add(lTacGia, 0, 7);
            tBao.Tick += (s, e) => { lBao.Visible = false; tBao.Stop(); };

            /* thứ tự Enter: GDX → ngày vay → ra trường → tiền vay → (về ra trường cho món kế) */
            var thu = new[] { tGdx, tVay, tRt, tTien };
            for (int i = 0; i < thu.Length; i++)
            {
                int idx = i; var t = thu[i];
                t.KeyDown += (s, e) =>
                {
                    int di = 0;
                    if (e.KeyCode == Keys.Enter) di = e.Shift ? -1 : 1;
                    else if (e.KeyCode == Keys.Right && t.SelectionStart == t.TextLength && t.SelectionLength == 0) di = 1;
                    else if (e.KeyCode == Keys.Left && t.SelectionStart == 0 && t.SelectionLength == 0) di = -1;
                    if (di == 0) return;
                    e.SuppressKeyPress = true; e.Handled = true;
                    int j = (idx == 3 && di > 0) ? 2 : Math.Max(0, Math.Min(thu.Length - 1, idx + di));
                    if (!thu[j].Visible) j = 2;   /* mức thu nhỏ: chỉ còn ra trường + tiền */
                    thu[j].Focus(); thu[j].SelectAll();
                };
            }
            tGdx.TextChanged += (s, e) => Doi("gdx", tGdx);
            tVay.TextChanged += (s, e) => Doi("vay", tVay);
            tRt.TextChanged += (s, e) => Doi("rt", tRt);
            tTien.TextChanged += (s, e) => Doi("tien", tTien);
            KeyDown += (s, e) => { if (e.KeyCode == Keys.Escape) Close(); };

            DocCauHinh();
            FormClosing += (s, e) => GhiCauHinh();
            Shown += (s, e) => { DatMuc(muc); tRt.Focus(); };
            ApMau(); VeNhan(); VeKq();
        }

        TextBox O(int rong)
        {
            var t = new TextBox { BorderStyle = BorderStyle.FixedSingle, Font = new Font("Segoe UI", 12f) };
            if (rong > 0) t.Width = rong;
            /* bấm vào ô là bôi đen số cũ (gõ là thay); ô đang gõ nền vàng nhạt */
            t.Enter += (s, e) => { t.BackColor = VangO; if (!chuotBam) t.SelectAll(); };
            t.Leave += (s, e) => { t.BackColor = ONen; };
            t.MouseDown += (s, e) => { if (!t.Focused) chuotBam = true; };
            t.MouseUp += (s, e) => { if (chuotBam) { t.SelectAll(); chuotBam = false; } };
            return t;
        }
        Label NhanO(string t) { return new Label { Text = t, AutoSize = false, AutoEllipsis = true, Dock = DockStyle.Fill, Height = 19, Font = new Font("Segoe UI", 8.5f, FontStyle.Bold), Margin = new Padding(0, 0, 8, 3) }; }

        /* tô màu toàn bộ theo nền sáng / tối */
        void ApMau()
        {
            BackColor = Nen; goc.BackColor = Nen; pKq.BackColor = Nen;
            tren.BackColor = Dau; lTen.ForeColor = Color.White; lG.ForeColor = Color.White;
            foreach (var b in new[] { bNho, bMau }) { b.BackColor = DauDam; b.ForeColor = Color.White; b.FlatAppearance.BorderColor = Color.FromArgb(0x9F, 0xC3, 0xE8); }
            ckNoi.BackColor = DauDam; ckNoi.ForeColor = Color.White; ckNoi.FlatAppearance.BorderColor = Color.FromArgb(0x9F, 0xC3, 0xE8); ckNoi.FlatAppearance.CheckedBackColor = Color.FromArgb(0x3B, 0x8E, 0xD8);
            bChep.BackColor = toi ? Color.FromArgb(0x3B, 0x8E, 0xD8) : Color.White; bChep.ForeColor = toi ? Color.White : Dau;
            bMau.Text = toi ? "Nền sáng" : "Nền tối";
            bool cam = V.Loai == "duoi";
            cbLoai.BackColor = cam ? (toi ? Color.FromArgb(0x6A, 0x40, 0x10) : Color.FromArgb(0xFF, 0xD8, 0xA8)) : ONen; cbLoai.ForeColor = Chu;
            nhap.BackColor = The; lHd.ForeColor = ChuPhu; lRt.ForeColor = ChuPhu;
            foreach (var t in new[] { tGdx, tVay, tRt, tTien }) { t.BackColor = t.Focused ? VangO : ONen; t.ForeColor = Chu; }
            lLuuY.ForeColor = Cam; lLuuY.BackColor = CamNen;
            lMini.BackColor = XanhLa; lMini.ForeColor = Color.White;
            for (int i = 0; i < 5; i++)
            {
                bool phu = i >= 3; oKhoi[i].BackColor = phu ? XamNen : XanhNen;
                oNhan[i].ForeColor = phu ? XamChu : XanhChu; oSo[i].ForeColor = phu ? XamChu : XanhChu; oPhu[i].ForeColor = i == 0 ? XanhChu : ChuPhu;
                oKhoi[i].Invalidate();
            }
            lCau.BackColor = XanhLa;
            bChiTiet.BackColor = The; bChiTiet.ForeColor = toi ? XamChu : Dau; bChiTiet.FlatAppearance.BorderColor = VienThe;
            lChiTiet.BackColor = The; lChiTiet.ForeColor = ChuPhu;
            lvKy.BackColor = The; lvKy.ForeColor = Chu;
            lBao.BackColor = XanhLa; lTacGia.ForeColor = toi ? Color.FromArgb(0x6F, 0xCF, 0x97) : Color.FromArgb(0x2E, 0x8B, 0x57);
            nhap.Invalidate();
            VeNhan();
        }

        /* đổi mức: nho (1 dải) · gon (5 khối + câu chốt) · chi (thêm chi tiết + kỳ trả); cửa sổ tự co / giãn chiều cao */
        void DatMuc(string m)
        {
            muc = m == "nho" || m == "chi" ? m : "gon";
            bool nho = muc == "nho";
            foreach (Control c in new Control[] { cbLoai, lG, tGdx, bMau }) c.Visible = !nho;
            lVay.Visible = tVay.Visible = lHd.Visible = !nho;
            nhap.ColumnStyles[0] = nho ? new ColumnStyle(SizeType.Absolute, 0) : new ColumnStyle(SizeType.Percent, 33);
            bNho.Text = nho ? "Mở ra" : "Thu nhỏ";
            bChiTiet.Text = muc == "chi" ? "Thu gọn ▲" : "Chi tiết ▼";
            lChiTiet.Visible = lvKy.Visible = muc == "chi";
            VeKq();
            CoVua();
            GhiCauHinh();
        }
        void CoVua()
        {
            if (WindowState != FormWindowState.Normal) return;
            goc.PerformLayout();
            int w = goc.ClientSize.Width, h = 0;
            foreach (Control c in new Control[] { tren, lLuuY, nhap, lLoi, lMini, lTacGia })
                if (c.Visible) h += c.GetPreferredSize(new Size(w - c.Margin.Horizontal, 0)).Height + c.Margin.Vertical;
            if (pKq.Visible) h += kqCao + pKq.Margin.Vertical + 4;
            var vung = Screen.FromControl(this).WorkingArea;
            int cao = Math.Max(110, Math.Min(vung.Height - 20, h + 6));
            ClientSize = new Size(ClientSize.Width, cao);
            if (Bottom > vung.Bottom) Top = Math.Max(vung.Top, vung.Bottom - Height);
        }

        /* ô ngày: gõ số tự chèn dấu / (như app) */
        static string GoNgay(string s)
        {
            var v = Regex.Replace(s, @"[^\d]", ""); if (v.Length > 8) v = v.Substring(0, 8);
            if (v.Length > 4) return v.Substring(0, 2) + "/" + v.Substring(2, 2) + "/" + v.Substring(4);
            if (v.Length > 2) return v.Substring(0, 2) + "/" + v.Substring(2);
            return v;
        }
        void Dat(TextBox t, string s) { dangDat = true; t.Text = s; t.SelectionStart = t.TextLength; dangDat = false; }

        void Doi(string k, TextBox t)
        {
            if (dangDat) return;
            if (k == "vay" || k == "rt")
            {
                var f = GoNgay(t.Text);
                if (f != t.Text) { int c = t.SelectionStart, them = f.Length - t.Text.Length; Dat(t, f); t.SelectionStart = Math.Min(f.Length, Math.Max(0, c + them)); }
            }
            if (k == "gdx") V.Gdx = t.Text; else if (k == "vay") V.Vay = t.Text; else if (k == "rt") V.Rt = t.Text; else V.Tien = t.Text;
            if (k == "vay") vayTay = t.Text != "";
            if (k == "gdx" && !vayTay) { V.Vay = Hs.VayGoiY(V.Gdx, DateTime.Today); Dat(tVay, V.Vay); }
            if (k == "vay" || k == "rt" || (k == "gdx" && !vayTay))
            {
                var gy = Hs.GoiY(V); V.Tien = gy != null ? gy.Trieu.ToString() : ""; Dat(tTien, V.Tien);
            }
            bool coTruoc = coKq;
            VeNhan(); VeKq();
            if (coKq != coTruoc) CoVua();   /* vừa có / mất kết quả → co giãn cho vừa */
        }

        void VeNhan()
        {
            lVay.Text = "Ngày vay" + (!vayTay && V.Vay != "" && V.Vay == Hs.VayGoiY(V.Gdx, DateTime.Today) ? " · GDX gần nhất" : "");
            var gy = Hs.GoiY(V);
            lTien.Text = "Tiền vay (tr)" + (gy != null ? " · gợi ý " + gy.Thang + " th = " + gy.Trieu : "");
            lVay.ForeColor = lVay.Text.Contains("·") ? XanhChu : ChuPhu; lTien.ForeColor = gy != null ? XanhChu : ChuPhu;
        }

        void VeKq()
        {
            bool nho = muc == "nho";
            lLuuY.Visible = V.Loai == "duoi" && !nho;
            lLuuY.Text = "⚠ Đang tính theo khóa học đến 12 tháng / SV Y khoa: trả nợ tối đa = 2 × phát tiền vay.";
            var kq = Hs.Tinh(V);
            bool trong = V.Vay == "" && V.Rt == "";
            coKq = !trong && kq.Loi.Count == 0;
            if (!coKq)
            {
                pKq.Visible = false;
                if (nho) { lLoi.Visible = false; lMini.Visible = true; lMini.Text = trong ? "Gõ ngày ra trường" : "⚠ " + kq.Loi[0]; lMini.BackColor = trong ? XamNen : CamNen; lMini.ForeColor = trong ? XamChu : Cam; return; }
                lMini.Visible = false; lLoi.Visible = true;
                if (trong) { lLoi.ForeColor = XamChu; lLoi.BackColor = The; lLoi.Text = "Gõ GDX của xã ở thanh trên → ngày vay tự gợi ý. Rồi gõ ngày ra trường — kết quả hiện ngay."; }
                else { lLoi.ForeColor = Cam; lLoi.BackColor = CamNen; lLoi.Text = "⚠ " + string.Join(" · ", kq.Loi); }
                return;
            }
            lLoi.Visible = false;
            lMini.Visible = nho; pKq.Visible = !nho;
            lMini.BackColor = XanhLa; lMini.ForeColor = Color.White;
            lMini.Text = kq.ThoiHan + " th · hạn " + Hs.Ngay(kq.HcGD) + (kq.Moi > 0 ? " · " + Hs.Tien(kq.Moi) + " × " + kq.Ky.Count + " kỳ" : "") + " · lần đầu " + Hs.Ngay(kq.Ky[0].Ngay);
            var gy = kq.GoiY;
            string tienPhu = kq.T == 0 ? (gy != null ? "Gợi ý: " + gy.Thang + " tháng = " + gy.Trieu + " tr" : "gõ tiền vay")
                : (gy != null && kq.T != gy.Trieu * 1000000L ? "Gợi ý: " + gy.Thang + " tháng = " + gy.Trieu + " tr" : (gy != null ? gy.Thang + " tháng vay (" + gy.Nam + ") × 4 tr" : ""));
            Khoi(0, "Số tiền vay", kq.T > 0 ? Hs.Tien(kq.T) : "—", tienPhu, kq.T > 0 ? Hs.Tien(kq.T) : "");
            Khoi(1, "Thời hạn cho vay", kq.ThoiHan + " tháng", "phát tiền vay " + kq.Tp + " th", kq.ThoiHan + " tháng");
            Khoi(2, "Hạn cuối (theo GDX)", Hs.Ngay(kq.HcGD), "", Hs.Ngay(kq.HcGD));
            Khoi(3, "Trả mỗi lần", kq.Moi > 0 ? Hs.Tien(kq.Moi) : "—", kq.Moi > 0 ? kq.Ky.Count + " kỳ" + (kq.CuoiTien != kq.Moi ? " · lần cuối " + Hs.Tien(kq.CuoiTien) : "") : "", kq.Moi > 0 ? Hs.Tien(kq.Moi) : "");
            Khoi(4, "Lần đầu", Hs.Ngay(kq.Ky[0].Ngay), "", Hs.Ngay(kq.Ky[0].Ngay));
            lCau.Text = kq.Cau;
            var ct = new StringBuilder();
            ct.Append("Phát tiền vay " + kq.Tp + " tháng (" + kq.SoNgay + " ngày) · ân hạn 12 tháng · trả nợ tối đa " + kq.Ttn + " tháng · hạn cuối " + Hs.Ngay(kq.Hc) + " → theo GDX " + Hs.Ngay(kq.HcGD));
            ct.Append(kq.Kiem ? " · ✓ không vượt hạn cuối" : " · ⚠ vượt hạn cuối — kiểm lại");
            if (gy != null) ct.Append("\nTiền vay gợi ý theo năm học (từ tháng 9): " + string.Join(" · ", gy.Ds) + " = " + gy.Thang + " tháng vay × 4 tr = " + gy.Trieu + " triệu");
            if (kq.Loai == "tren" && kq.Tp <= 12) ct.Append("\n⚠ Phát tiền vay chỉ " + kq.Tp + " tháng — khóa học đến 1 năm / Y khoa thì đổi ô chọn loại.");
            lChiTiet.Text = ct.ToString();
            lvKy.BeginUpdate(); lvKy.Items.Clear();
            for (int i = 0; i < kq.Ky.Count; i++)
            {
                var x = kq.Ky[i];
                var it = new ListViewItem((i + 1) + (i == 0 ? " · đầu tiên" : (x.Cuoi ? " · cuối" : "")));
                it.SubItems.Add(Hs.Ngay(x.Ngay)); it.SubItems.Add(x.Tien.HasValue ? Hs.Tien(x.Tien.Value) : "—");
                if (i == 0) { it.BackColor = XanhNen; it.ForeColor = XanhChu; }
                if (x.Cuoi) it.Font = new Font(lvKy.Font, FontStyle.Bold);
                lvKy.Items.Add(it);
            }
            lvKy.EndUpdate();
            lvKy.Height = Math.Min(220, 26 + kq.Ky.Count * 22);
            XepKq();
        }
        void XepKq()
        {
            int g = 6, W = Math.Max(240, pKq.ClientSize.Width - SystemInformation.VerticalScrollBarWidth - 2), y = 0;
            int wl = (W - 2 * g) / 3, wn = (W - g) / 2;
            for (int i = 0; i < 3; i++) oKhoi[i].SetBounds(i * (wl + g), y, i == 2 ? W - 2 * (wl + g) : wl, oKhoi[i].Height);
            y += oKhoi[0].Height + g;
            for (int i = 3; i < 5; i++) oKhoi[i].SetBounds((i - 3) * (wn + g), y, i == 4 ? W - wn - g : wn, oKhoi[i].Height);
            y += oKhoi[3].Height + g;
            lCau.SetBounds(0, y, W, lCau.GetPreferredSize(new Size(W, 0)).Height); y += lCau.Height + g;
            bChiTiet.SetBounds(0, y, W, bChiTiet.Height); y += bChiTiet.Height + g;
            if (lChiTiet.Visible) { lChiTiet.SetBounds(0, y, W, lChiTiet.GetPreferredSize(new Size(W, 0)).Height + 4); y += lChiTiet.Height + g; }
            if (lvKy.Visible)
            {
                lvKy.SetBounds(0, y, W, lvKy.Height); y += lvKy.Height + g;
                int c0 = Math.Max(80, W * 30 / 100), c1 = Math.Max(90, W * 32 / 100);
                lvKy.Columns[0].Width = c0; lvKy.Columns[1].Width = c1; lvKy.Columns[2].Width = Math.Max(90, W - c0 - c1 - 6);
            }
            kqCao = y;
        }
        void Khoi(int i, string nhan, string so, string phu, string chep) { oNhan[i].Text = nhan; oSo[i].Text = so; oPhu[i].Text = phu; oChep[i] = chep; }

        void ChepCau() { var kq = Hs.Tinh(V); if (kq.Loi.Count > 0) Bao("Chưa đủ số liệu: " + string.Join(" · ", kq.Loi)); else Chep(kq.Cau, "Đã chép câu chốt — dán vào hồ sơ."); }
        void Chep(string t, string bao) { try { Clipboard.SetText(t); Bao(bao); } catch { Bao("⚠ Không chép được — thử lại."); } }
        void Bao(string t) { lBao.Text = t; lBao.Visible = true; tBao.Stop(); tBao.Start(); }

        /* nền sáng / tối + mức đọc trước khi dựng giao diện */
        void DocCauHinhMau()
        {
            try
            {
                if (!File.Exists(tepCH)) return;
                foreach (var dong in File.ReadAllLines(tepCH, Encoding.UTF8))
                {
                    if (dong == "toi=1") toi = true;
                    else if (dong.StartsWith("muc=")) muc = dong.Substring(4);
                }
            }
            catch { }
        }
        void DocCauHinh()
        {
            Rectangle vung = Screen.PrimaryScreen.WorkingArea;
            Location = new Point(vung.Right - Width - 20, vung.Top + 60);
            try
            {
                if (!File.Exists(tepCH)) return;
                foreach (var dong in File.ReadAllLines(tepCH, Encoding.UTF8))
                {
                    int i = dong.IndexOf('='); if (i < 0) continue;
                    string k = dong.Substring(0, i), v = dong.Substring(i + 1);
                    if (k == "gdx") { V.Gdx = v; Dat(tGdx, v); V.Vay = Hs.VayGoiY(v, DateTime.Today); Dat(tVay, V.Vay); }
                    else if (k == "ghim") ckNoi.Checked = v != "0";
                    else if (k == "vitri")
                    {
                        var p = v.Split(','); int x, y, w, h;
                        if (p.Length == 4 && int.TryParse(p[0], out x) && int.TryParse(p[1], out y) && int.TryParse(p[2], out w) && int.TryParse(p[3], out h))
                        {
                            var r = new Rectangle(x, y, Math.Max(380, w), Height);   /* chiều cao tự tính theo mức */
                            foreach (var sc in Screen.AllScreens) if (sc.WorkingArea.IntersectsWith(r)) { Bounds = r; break; }
                        }
                    }
                }
            }
            catch { }
        }
        void GhiCauHinh()
        {
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(tepCH));
                var r = WindowState == FormWindowState.Normal ? Bounds : RestoreBounds;
                File.WriteAllLines(tepCH, new[] { "gdx=" + V.Gdx, "ghim=" + (ckNoi.Checked ? "1" : "0"), "toi=" + (toi ? "1" : "0"), "muc=" + muc, "vitri=" + r.X + "," + r.Y + "," + r.Width + "," + r.Height }, Encoding.UTF8);
            }
            catch { }
        }
    }

    static class ChuongTrinh
    {
        [STAThread]
        static int Main(string[] args)
        {
            /* --kiem: đọc ca thử từ stdin (mỗi dòng: vay|rt|gdx|tien|loai|homnay), in kết quả — dùng cho tests/hssv_exe.js so với bản app */
            if (args.Length > 0 && args[0] == "--kiem")
            {
                try { Console.OutputEncoding = new UTF8Encoding(false); } catch { }   /* exe dạng cửa sổ có thể không có console */
                string dong;
                while ((dong = Console.ReadLine()) != null)
                {
                    var p = dong.Split('|'); if (p.Length < 6) continue;
                    var v = new HsVao { Vay = p[0], Rt = p[1], Gdx = p[2], Tien = p[3], Loai = p[4] };
                    var hn = Hs.Doc(p[5]) ?? DateTime.Today;
                    var kq = Hs.Tinh(v); var gy = Hs.GoiY(v);
                    var sb = new StringBuilder();
                    sb.Append(Hs.VayGoiY(p[2], hn)).Append('|').Append(gy == null ? "" : gy.Nua + "," + gy.Thang + "," + gy.Trieu + "," + gy.Nam + "," + string.Join(";", gy.Ds)).Append('|');
                    if (kq.Loi.Count > 0) sb.Append("LOI:" + string.Join(";", kq.Loi));
                    else
                    {
                        sb.Append(kq.Tp + "," + kq.SoNgay + "," + kq.Ttn + "," + kq.ThoiHan + "," + Hs.Ngay(kq.Hc) + "," + Hs.Ngay(kq.HcGD) + "," + (kq.Kiem ? 1 : 0) + "," + kq.T + "," + kq.Moi + "," + kq.CuoiTien + "|");
                        var ky = new List<string>(); foreach (var x in kq.Ky) ky.Add(Hs.Ngay(x.Ngay) + ":" + (x.Tien.HasValue ? x.Tien.Value.ToString() : ""));
                        sb.Append(string.Join(";", ky)).Append('|').Append(kq.Cau);
                    }
                    Console.WriteLine(sb.ToString());
                }
                return 0;
            }
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new FormHs());
            return 0;
        }
    }
}
