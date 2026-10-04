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
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;

[assembly: AssemblyTitle("Hạn trả HSSV")]
[assembly: AssemblyProduct("Tủ hồ sơ — công cụ Hạn trả HSSV")]
[assembly: AssemblyVersion("1.0.1.0")]
[assembly: AssemblyFileVersion("1.0.1.0")]

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
        static readonly Color XanhNen = Color.FromArgb(0xEE, 0xF8, 0xF0), XanhVien = Color.FromArgb(0x9C, 0xC3, 0xA4), XanhChu = Color.FromArgb(0x1E, 0x6A, 0x33);
        static readonly Color XamNen = Color.FromArgb(0xF1, 0xF5, 0xF9), XamVien = Color.FromArgb(0xB9, 0xC8, 0xD6), XamChu = Color.FromArgb(0x33, 0x50, 0x6B);
        static readonly Color ChuPhu = Color.FromArgb(0x66, 0x70, 0x7A), Cam = Color.FromArgb(0xC2, 0x5E, 0x00), XanhDam = Color.FromArgb(0x1F, 0x5C, 0x99);

        ComboBox cbLoai; TextBox tGdx, tVay, tRt, tTien; CheckBox ckNoi; Button bChep;
        Label lVay, lTien, lLuuY, lLoi, lCau, lChiTiet, lBao; ListView lvKy; Panel pKq;
        Label[] oNhan = new Label[5], oSo = new Label[5], oPhu = new Label[5]; Panel[] oKhoi = new Panel[5]; string[] oChep = new string[5];
        readonly HsVao V = new HsVao();
        bool vayTay, dangDat, chuotBam;
        readonly string tepCH = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "TuHoSo", "hssv.ini");
        Timer tBao = new Timer { Interval = 2500 };

        public FormHs()
        {
            Text = "Hạn trả HSSV — Tủ hồ sơ";
            Font = new Font("Segoe UI", 10f);
            BackColor = Color.White;
            StartPosition = FormStartPosition.Manual;
            ClientSize = new Size(480, 640);
            MinimumSize = new Size(420, 520);
            TopMost = true;
            KeyPreview = true;
            Padding = new Padding(10);

            var goc = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 1, RowCount = 6 };
            goc.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));   /* cột co theo cửa sổ, không giãn theo chữ */
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            goc.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
            goc.RowStyles.Add(new RowStyle(SizeType.AutoSize));
            Controls.Add(goc);

            /* dòng trên: loại khóa học · GDX · ghim · chép */
            var tren = new FlowLayoutPanel { AutoSize = true, Dock = DockStyle.Fill, WrapContents = true, Margin = new Padding(0, 0, 0, 6) };
            cbLoai = new ComboBox { DropDownStyle = ComboBoxStyle.DropDownList, Width = 150, Margin = new Padding(0, 3, 8, 0) };
            cbLoai.Items.AddRange(new object[] { "Trên 12 tháng", "Đến 12 th · Y khoa" }); cbLoai.SelectedIndex = 0;
            cbLoai.SelectedIndexChanged += (s, e) => { V.Loai = cbLoai.SelectedIndex == 1 ? "duoi" : "tren"; cbLoai.BackColor = V.Loai == "duoi" ? Color.FromArgb(0xFF, 0xE8, 0xCC) : SystemColors.Window; VeKq(); };
            var lG = new Label { Text = "GDX", AutoSize = true, ForeColor = ChuPhu, Margin = new Padding(0, 7, 3, 0) };
            tGdx = O(46); tGdx.Margin = new Padding(0, 3, 10, 0); tGdx.TextAlign = HorizontalAlignment.Center;
            ckNoi = new CheckBox { Text = "Ghim trên cùng", Appearance = Appearance.Button, AutoSize = true, Checked = true, FlatStyle = FlatStyle.Flat, Margin = new Padding(0, 2, 6, 0) };
            ckNoi.FlatAppearance.CheckedBackColor = Color.FromArgb(0xDD, 0xEB, 0xF7);
            ckNoi.CheckedChanged += (s, e) => { TopMost = ckNoi.Checked; };
            bChep = new Button { Text = "Chép câu chốt", AutoSize = true, FlatStyle = FlatStyle.Flat, BackColor = XanhDam, ForeColor = Color.White, Margin = new Padding(0, 2, 0, 0) };
            bChep.FlatAppearance.BorderSize = 0;
            bChep.Click += (s, e) => { var kq = Hs.Tinh(V); if (kq.Loi.Count > 0) Bao("Chưa đủ số liệu: " + string.Join(" · ", kq.Loi)); else Chep(kq.Cau, "Đã chép câu chốt — dán vào hồ sơ."); };
            tren.Controls.AddRange(new Control[] { cbLoai, lG, tGdx, ckNoi, bChep });
            goc.Controls.Add(tren, 0, 0);   /* 1.0.1: gán cố định hàng — Windows dồn ô khi dòng trên ẩn, khung kết quả bị co */

            lLuuY = new Label { AutoSize = true, ForeColor = Cam, Visible = false, Margin = new Padding(0, 0, 0, 4), MaximumSize = new Size(900, 0) };
            goc.Controls.Add(lLuuY, 0, 1);

            /* dòng nhập: ngày vay · ngày ra trường · tiền vay */
            var nhap = new TableLayoutPanel { Dock = DockStyle.Fill, AutoSize = true, ColumnCount = 3, RowCount = 2, Margin = new Padding(0, 0, 0, 6) };
            nhap.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33)); nhap.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 31)); nhap.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 36));
            lVay = NhanO("Ngày vay"); var lRt = NhanO("Ngày ra trường"); lTien = NhanO("Tiền vay (triệu)");
            tVay = O(0); tRt = O(0); tTien = O(0);
            foreach (var t in new[] { tVay, tRt, tTien }) { t.Dock = DockStyle.Fill; t.Margin = new Padding(0, 0, 6, 0); }
            nhap.Controls.Add(lVay, 0, 0); nhap.Controls.Add(lRt, 1, 0); nhap.Controls.Add(lTien, 2, 0);
            nhap.Controls.Add(tVay, 0, 1); nhap.Controls.Add(tRt, 1, 1); nhap.Controls.Add(tTien, 2, 1);
            goc.Controls.Add(nhap, 0, 2);

            lLoi = new Label { AutoSize = true, ForeColor = Cam, Visible = false, Margin = new Padding(0, 0, 0, 4), MaximumSize = new Size(900, 0) };
            goc.Controls.Add(lLoi, 0, 3);

            /* kết quả: 3 khối lớn + 2 khối nhỏ, câu chốt, chi tiết, các kỳ trả */
            pKq = new Panel { Dock = DockStyle.Fill, AutoScroll = true };
            /* bố cục tay (tính theo độ rộng khung) — không để bảng tự giãn tràn ngang */
            for (int i = 0; i < 5; i++)
            {
                bool phu = i >= 3;
                var p = new Panel { BackColor = phu ? XamNen : XanhNen, Padding = new Padding(4, 3, 4, 4), Height = phu ? 58 : 76, Cursor = Cursors.Hand };
                int idx = i; Color vien = phu ? XamVien : XanhVien;
                p.Paint += (s, e) => { using (var pen = new Pen(vien)) e.Graphics.DrawRectangle(pen, 0, 0, ((Panel)s).Width - 1, ((Panel)s).Height - 1); };
                oNhan[i] = new Label { Dock = DockStyle.Top, Height = 18, TextAlign = ContentAlignment.MiddleCenter, ForeColor = ChuPhu, Font = new Font("Segoe UI", 8.5f), AutoEllipsis = true };
                oSo[i] = new Label { Dock = DockStyle.Top, Height = phu ? 22 : 28, TextAlign = ContentAlignment.MiddleCenter, ForeColor = phu ? XamChu : XanhChu, Font = new Font("Segoe UI", phu ? 11.5f : 14f, FontStyle.Bold) };
                oPhu[i] = new Label { Dock = DockStyle.Fill, TextAlign = ContentAlignment.TopCenter, ForeColor = i == 0 ? XanhChu : ChuPhu, Font = new Font("Segoe UI", 8f, i == 0 ? FontStyle.Bold : FontStyle.Regular) };
                p.Controls.Add(oPhu[i]); p.Controls.Add(oSo[i]); p.Controls.Add(oNhan[i]);
                EventHandler bam = (s, e) => { if (!string.IsNullOrEmpty(oChep[idx])) Chep(oChep[idx], "Đã chép: " + oChep[idx]); };
                p.Click += bam; oNhan[i].Click += bam; oSo[i].Click += bam; oPhu[i].Click += bam;
                oKhoi[i] = p; pKq.Controls.Add(p);
            }
            lCau = new Label { AutoSize = false, BackColor = XanhNen, ForeColor = XanhChu, Font = new Font("Segoe UI", 10f, FontStyle.Bold), Padding = new Padding(8, 6, 8, 6), Cursor = Cursors.Hand };
            lCau.Click += (s, e) => { if (lCau.Text != "") Chep(lCau.Text, "Đã chép câu chốt — dán vào hồ sơ."); };
            lChiTiet = new Label { AutoSize = false, ForeColor = ChuPhu, Font = new Font("Segoe UI", 8.5f) };
            lvKy = new ListView { View = View.Details, FullRowSelect = true, GridLines = true, HeaderStyle = ColumnHeaderStyle.Nonclickable, Height = 150, Font = new Font("Segoe UI", 9f) };
            lvKy.Columns.Add("Kỳ", 110); lvKy.Columns.Add("Ngày trả (GDX)", 120); lvKy.Columns.Add("Gốc phải trả", 130, HorizontalAlignment.Right);
            lvKy.DoubleClick += (s, e) => { if (lvKy.SelectedItems.Count > 0) { var t = lvKy.SelectedItems[0].SubItems[1].Text; Chep(t, "Đã chép: " + t); } };
            pKq.Controls.Add(lCau); pKq.Controls.Add(lChiTiet); pKq.Controls.Add(lvKy);
            pKq.Resize += (s, e) => XepKq();
            goc.Controls.Add(pKq, 0, 4);

            lBao = new Label { Dock = DockStyle.Fill, AutoSize = true, ForeColor = Color.White, BackColor = XanhChu, Padding = new Padding(6, 4, 6, 4), Visible = false };
            goc.Controls.Add(lBao, 0, 5);
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
            Shown += (s, e) => { tRt.Focus(); };
            VeNhan(); VeKq();
        }

        TextBox O(int rong)
        {
            var t = new TextBox { BorderStyle = BorderStyle.FixedSingle, Font = new Font("Segoe UI", 11f) };
            if (rong > 0) t.Width = rong;
            /* bấm vào ô là bôi đen số cũ (gõ là thay) */
            t.Enter += (s, e) => { if (!chuotBam) t.SelectAll(); };
            t.MouseDown += (s, e) => { if (!t.Focused) chuotBam = true; };
            t.MouseUp += (s, e) => { if (chuotBam) { t.SelectAll(); chuotBam = false; } };
            return t;
        }
        Label NhanO(string t) { return new Label { Text = t, AutoSize = false, AutoEllipsis = true, Dock = DockStyle.Fill, Height = 18, ForeColor = ChuPhu, Font = new Font("Segoe UI", 8.5f), Margin = new Padding(0, 0, 6, 2) }; }

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
            VeNhan(); VeKq();
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
            lLuuY.Visible = V.Loai == "duoi";
            lLuuY.Text = "⚠ Đang tính theo khóa học đến 12 tháng / SV Y khoa: trả nợ tối đa = 2 × phát tiền vay.";
            var kq = Hs.Tinh(V);
            bool trong = V.Vay == "" && V.Rt == "";
            if (trong || kq.Loi.Count > 0)
            {
                lLoi.Visible = !trong; lLoi.Text = "⚠ " + string.Join(" · ", kq.Loi);
                pKq.Visible = false;
                if (trong) { lLoi.Visible = true; lLoi.ForeColor = ChuPhu; lLoi.Text = "Gõ GDX của xã → ngày vay tự gợi ý. Mỗi món: ngày ra trường → Enter → tiền vay (điền sẵn gợi ý) → Enter sang món kế."; }
                else lLoi.ForeColor = Cam;
                return;
            }
            lLoi.Visible = false; pKq.Visible = true;
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
                if (i == 0) it.BackColor = XanhNen;
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
            lChiTiet.SetBounds(0, y, W, lChiTiet.GetPreferredSize(new Size(W, 0)).Height + 4); y += lChiTiet.Height + g;
            lvKy.SetBounds(0, y, W, lvKy.Height);
            int c0 = Math.Max(80, W * 30 / 100), c1 = Math.Max(90, W * 32 / 100);
            lvKy.Columns[0].Width = c0; lvKy.Columns[1].Width = c1; lvKy.Columns[2].Width = Math.Max(90, W - c0 - c1 - 6);
        }
        void Khoi(int i, string nhan, string so, string phu, string chep) { oNhan[i].Text = nhan; oSo[i].Text = so; oPhu[i].Text = phu; oChep[i] = chep; }

        void Chep(string t, string bao) { try { Clipboard.SetText(t); Bao(bao); } catch { Bao("⚠ Không chép được — thử lại."); } }
        void Bao(string t) { lBao.Text = t; lBao.Visible = true; tBao.Stop(); tBao.Start(); }

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
                            var r = new Rectangle(x, y, w, h);
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
                File.WriteAllLines(tepCH, new[] { "gdx=" + V.Gdx, "ghim=" + (ckNoi.Checked ? "1" : "0"), "vitri=" + r.X + "," + r.Y + "," + r.Width + "," + r.Height }, Encoding.UTF8);
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
