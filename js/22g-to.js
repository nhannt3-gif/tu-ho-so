/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 4546–5436 của bản 3.234), không đổi logic — 👥 Tổ TK&VV — chọn tổ, báo cáo tổ */
/* ==========================================================
   3.88 — 👥 TAB CON TỔ TK&VV (trong tab Số liệu, cạnh Tra cứu KH): chọn 1 tổ (cây xã → điểm GD → hội → tổ, hoặc gõ tên) → báo cáo của tổ (tích → Xem → In / Excel)
   - Chỉ ĐỌC từ tab Số liệu (luồng một chiều), không sửa dữ liệu
   - Báo cáo chỉ là thông tin để xem / in (anh chốt): Danh sách hộ vay · Nợ cần xử lý (QH + khoanh + KHĐ, 1 mặt A4) · TK 105 của tổ
   ========================================================== */
/* tên chương trình ngắn, dễ đọc trên báo cáo in (mã → tên); mã chưa có thì dùng tên viết tắt hệ thống */
var CT_NGAN = {'01':'Hộ nghèo','02':'HSSV','03':'Giải quyết việc làm','04':'Xuất khẩu LĐ','05':'Nhà ở trả chậm','06':'Nước sạch VSMT','07':'Nhà ở hộ nghèo',
  '08':'DN vừa và nhỏ (KfW)','09':'Hộ mới thoát nghèo','10':'SXKD vùng khó khăn','11':'DTTS đặc biệt KK','12':'Nhà ở xã hội','13':'LĐ sau cai nghiện',
  '14':'DTTS nghèo ĐBSCL','15':'Thương nhân vùng KK','16':'XKLĐ huyện nghèo','17':'DTTS nghèo QĐ 755','18':'Chòi tránh lũ','19':'Hộ cận nghèo',
  '20':'Trồng rừng, chăn nuôi','21':'DTTS QĐ 2085','22':'Thanh niên xung phong','23':'Trả lương ngừng việc','24':'Trường MN, TH ngoài CL',
  '25':'Vùng DTTS, miền núi','26':'Chấp hành xong án','91':'Lâm nghiệp (WB)','92':'Dự án IFAD','93':'Dự án RIDP','94':'Dự án CWDP','96':'Dự án NIPPON','99':'Cho vay khác'};
/* 3.91: tên viết tắt chương trình theo mã chuẩn (anh chốt) — mọi món mã 03 là GQVL; riêng HSSV STEM (Mã Quyết định 43) ghi HSSVSTEM */
var CT_VT = {'01':'HN','02':'HSSV','03':'GQVL','04':'XKLD','06':'NSVSMT','07':'NOHN','09':'MTN','12':'NOXH','13':'SCN','19':'HCN','26':'APT','99':'KHAC'};
var CT_VT_TEN = {HN:'Hộ nghèo', HSSV:'Học sinh, sinh viên', HSSVSTEM:'HSSV ngành STEM', GQVL:'Giải quyết việc làm', XKLD:'Xuất khẩu lao động', NSVSMT:'Nước sạch & VSMT nông thôn',
  NOHN:'Nhà ở hộ nghèo', MTN:'Hộ mới thoát nghèo', NOXH:'Nhà ở xã hội', SCN:'Người sau cai nghiện', HCN:'Hộ cận nghèo', APT:'Người chấp hành xong án phạt tù', KHAC:'Cho vay khác'};
var CT_DUNG = null;   /* gom tên viết tắt đã dùng trong 1 báo cáo → dòng chú thích cuối báo cáo */
function ctHT(ma, o){   /* 3.128 (anh chốt): mẫu biểu chuẩn hệ thống ghi đúng tên viết tắt của hệ thống (TENVT, Danh mục chương trình vay); HSSV theo QĐ 43 hệ thống không có mã riêng → HSSV_STEM */
  ma = String(ma||''); if(!ma) return ''; if(o && String(o.c_ma_quyet_dinh||'')==='43') return 'HSSV_STEM'; var c = TDN_CT[ma]; return c ? c[0] : ma; }
function ctNgan(ma, o){
  ma = String(ma||''); if(!ma) return '';
  var v = (o && String(o.c_ma_quyet_dinh||'')==='43') ? 'HSSVSTEM' : CT_VT[ma];
  if(!v){ var c = TDN_CT[ma]; return ma+' '+(CT_NGAN[ma] || (c ? c[0] : '')); }
  if(CT_DUNG) CT_DUNG[v] = 1;
  return v;
}
function ctChuThich(){ var ds = Object.keys(CT_DUNG||{}).sort(); return ds.length ? 'Chương trình: '+ds.map(function(k){ return k+' = '+CT_VT_TEN[k]; }).join('; ')+'.' : ''; }
function bcCT(x){ return x && x.ctChu ? '<div class="bc-ghi">'+coChuHTML(x.ctChu)+'</div>' : ''; }
function laiTon(o){ return (typeof o.lt==='number') ? o.lt : (o.ltTH||0)+(o.ltQH||0); }   /* Mẫu 10 có cột Lãi tồn; Mẫu 31 = lãi tồn TH + QH */
var TO_BC = [{k:'ds', ten:'Danh sách hộ vay'}, {k:'no', ten:'Nợ cần xử lý (quá hạn · khoanh · KHĐ)'}, {k:'tk', ten:'TK 105 của tổ'}, {k:'ct', ten:'Dự kiến chia tách tổ'}];   /* 3.139 */
var TO_K = null, TO_Q = '';
function toCH(){ return pvGan(D.cauHinh.toTK = D.cauHinh.toTK || {ky:'', xa:'', diem:'', hoi:'', to:'', bc:{ds:true}}); }
/* 3.149 (anh chốt "dùng chung hết"): phạm vi xã › điểm › hội › tổ DÙNG CHUNG cho Tổ, Sao kê, Tổng hợp, KTGS, Tra cứu —
   các ô xa / diem / hoi / to của từng tab trỏ vào 1 chỗ D.cauHinh.pvChung (getter / setter); lần đầu lấy theo tab Tổ */
/* 3.383.7 (anh 27/10 "giữ lại chọn của phiên làm việc trước"; "ghim theo từng ô lọc"): địa bàn LUÔN nhớ cho lần mở sau (D.cauHinh.pvChung);
   ô nào 📌 ghim (D.cauHinh.pvGhimO {cap: giá trị}) thì mở app luôn về giá trị ghim — ưu tiên cao nhất, ô cấp dưới chưa ghim không còn hợp thì về Tất cả.
   (thay 3.328: mở app về Toàn PGD, 📌 ghim chung cả địa bàn — D.cauHinh.pvGhimBat cũ chuyển thành ghim từng ô đang có giá trị) */
var PV_PHIEN = null;   /* đã áp ghim cho phiên này chưa */
function pvChungO(){ var c = D.cauHinh;
  if(!c.pvChung){ var t = c.toTK || {}, g = c.pvChung = {}; ['xa','diem','hoi','ap','to'].forEach(function(f){ var d = Object.getOwnPropertyDescriptor(t, f); g[f] = (d && !d.get && d.value) || ''; }); }
  if(PV_PHIEN!==c){ PV_PHIEN = c;   /* đầu phiên (hoặc cài đặt vừa nạp lại) → áp ghim */
    if(c.pvGhimBat){ var o = c.pvGhimO = c.pvGhimO || {}; PV_CAP.forEach(function(x){ if(c.pvChung[x[0]] && !o[x[0]]) o[x[0]] = c.pvChung[x[0]]; }); delete c.pvGhimBat; }
    pvApGhim(c.pvChung, true); }
  return c.pvChung; }
function pvGan(C){
  if(!C || (Object.getOwnPropertyDescriptor(C, 'ap')||{}).get) return C;   /* 3.383: + ap (bộ cũ đã gắn 4 cấp → gắn lại đủ 5) */
  ['xa','diem','hoi','ap','to'].forEach(function(f){ Object.defineProperty(C, f, {enumerable:true, configurable:true, get:function(){ return pvChungO()[f]||''; }, set:function(v){ pvChungO()[f] = v||''; }}); });
  return C;
}
/* các kỳ số liệu có bảng món vay: Mẫu 31 theo tháng, Mẫu 10 theo ngày — mới nhất trước */
function toDsKy(){   /* 3.97 (anh chốt): Mẫu 31 chốt tháng lên trước (mới nhất trước), số liệu theo ngày xếp sau — chỉ dùng khi anh chọn
     3.136: ngày chỉ có Dư nợ chi tiết (chưa có Mẫu 31 ngày) cũng chọn được — món vay theo Mẫu 31 liền trước */
  var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return slLaHS(e.loai) || (e.loai==='dnct' && String(e.ky).length>7); })
    .sort(function(a, b){ var na = a.ky.length>7, nb = b.ky.length>7; if(na!==nb) return na ? 1 : -1; return slThuTu(a.ky)<slThuTu(b.ky) ? 1 : -1; });
  var gap = {}, ra = [];
  ds.forEach(function(e){ if(gap[e.ky]) return; gap[e.ky] = 1;
    var ngay = e.ky.length>7, co31 = !!SLM.bang[slKhoa('hstd', e.ky)];
    if(!ngay){ if(co31) ra.push({ky:e.ky, chu:kyVN(e.ky)+' · Mẫu 31 (chốt tháng)'}); return; }
    var nh = co31 ? '' : slKyDung('hstd', e.ky);
    ra.push({ky:e.ky, chu:'ngày '+ngayVNsl(e.ky)+(co31 ? ' · Mẫu 31' : ' · Dư nợ chi tiết'+(nh ? ' (món vay theo Mẫu 31 '+slKyChu(nh)+')' : ''))}); });
  return ra;
}
/* 3.97: kỳ mặc định = Mẫu 31 chốt tháng gần nhất; kỳ đã chọn (tháng) giữ; kỳ THEO NGÀY chỉ giữ trong lần mở app anh chọn nó (mở lại → về cuối tháng) */
var KY_PHIEN = {};
function toKyMacDinh(C, dsKy, tab){
  var kc = kyChungLay(); if(kc){ C.ky = kc; KY_PHIEN[tab] = kc; }   /* 3.149: kỳ chung ở đầu trang */
  var co = dsKy.some(function(x){ return x.ky===C.ky; }), ngay = String(C.ky||'').length>7;
  if(!co || (ngay && KY_PHIEN[tab]!==C.ky)){ var th = dsKy.find(function(x){ return x.ky.length===7; }); C.ky = (th || dsKy[0]).ky; }
  return C.ky;
}
/* ---------- 3.149 (anh chốt ý 6b): KỲ CHUNG — 1 ô ở đầu trang, phủ mọi tab (Nạp & KT, Tổng hợp, Sao kê, Tổ, KTGS, Tra cứu…)
   kỳ theo ngày NHỚ qua lần mở app (3.326 — trước: chỉ giữ trong phiên như 3.97); tab không có số liệu đúng kỳ thì dùng kỳ gần nhất và ghi rõ (kyGhiHTML)
   ngoại lệ (anh chốt): KTGS › Kế hoạch › In theo tháng kiểm tra lấy kỳ theo kế hoạch (3.141), không theo ô này ---------- */
function toGanNeuTrong(K){ if(!TO_K) TO_K = K; }   /* 3.326: tab khác (Scan) cần kỳ dựng mà chưa có — gán TO_K ở đây (kiem: không đọc thẳng biến kho ngoài khối số liệu) */
function kyChungLay(){ return D.cauHinh.kyChung || ''; }   /* 3.326 (anh 23/10): ngày chọn NHỚ qua lần mở app (bỏ luật 3.97 "kỳ theo ngày chỉ giữ trong phiên" — Ctrl+F5 xong KTGS đột xuất về 30/09); kiểm tra bắt buộc KTGS dùng ô tháng riêng */
function kyChungDs(){
  var gap = {}, ra = [];
  toDsKy().concat(thDsKy().filter(function(x){ return x.ky.length===7; })).forEach(function(x){ if(gap[x.ky]) return; gap[x.ky] = 1; ra.push(x); });
  return ra.sort(function(a, b){ var na = a.ky.length>7, nb = b.ky.length>7; if(na!==nb) return na ? 1 : -1; return slThuTu(a.ky)<slThuTu(b.ky) ? 1 : -1; });
}
function kyChungVe(){
  var o = document.getElementById('ky-chung'); if(!o) return;
  if(typeof SLM==='undefined' || !SL_SAN){ o.innerHTML = ''; return; }
  var ds = kyChungDs(); if(!ds.length){ o.innerHTML = ''; return; }
  var cur = kyChungLay() || toCH().ky || ds[0].ky, kc = cur; if(!ds.some(function(x){ return x.ky===cur; })) cur = ds[0].ky;
  var canh = kc!==cur ? slKyChu(kc)+' chưa có số liệu' : SL_CHIP.lech && slChipHTML() ? slKyChu(cur)+' chưa có số liệu cho tab này' : '';   /* 3.163: ⚠ khi tháng chọn chưa có số liệu */
  o.innerHTML = (canh ? '<span class="ky-canh" title="'+coChuHTML(canh)+'">⚠</span>' : '')+'<label title="Kỳ số liệu dùng chung cho mọi tab">📅 <select id="ky-chung-o" onchange="kyChungDoi(this.value)">'+toKyOpt(ds, cur)+'</select></label>'+
    '<button class="ky-chung-lm" onclick="kyChungDoi(document.getElementById(\'ky-chung-o\').value, 1)" title="⟳ Đọc lại số liệu kỳ này (khi Drive vừa đổi ở máy khác)">⟳</button>';
}
function kyChungDoi(v, lamMoi){
  if(!v) return; D.cauHinh.kyChung = v; KY_PHIEN.chung = v;
  [toCH(), skCH(), ktCH(), thCH()].forEach(function(C){ C.ky = v; }); KY_PHIEN.to = KY_PHIEN.sk = KY_PHIEN.kt = v; skCH().tu = ''; skCH().den = '';
  SL_KY = slThang(v);
  TO_K = null; TO_KS = lamMoi ? {} : TO_KS; SL_BO = lamMoi ? {} : SL_BO; TH_KS = {}; TH_K = null; TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null; KT_K = null; KT_CHON = null; KT_GN = null; SK_K = null;
  luu(); bao('📅 Kỳ số liệu: '+slKyChu(v)+(lamMoi ? ' — đã đọc lại' : '')+' (mọi tab).', 3);
  if(nganHienTai===7) veSoLieu(); kyChungVe();
}
function kyGhiHTML(K){   /* tab đang dùng kỳ khác kỳ chung (kỳ chung chưa có số liệu loại tab cần) → 3.163 (anh chốt): chip "⚠ Dùng T9/2026" cuối hàng Xã (trước 📍), rê chuột đủ câu, bấm → Nạp & KT đúng tháng */
  SL_CHIP = {tab:D.cauHinh.slTab, h:'', lech:false};
  var kc = kyChungLay(); if(!K || !K.ky || !kc || K.ky===kc){ slChipVe(); return ''; }
  SL_CHIP.lech = true;
  slChipThem('<button class="sl-chip vang" onclick="slMoNapKy(\''+kc+'\')" title="'+coChuHTML(slKyChu(kc)+' chưa có số liệu cho tab này — đang dùng '+slKyChu(K.ky)+'. Bấm để mở 📥 Nạp & KT tháng '+kyVN(slThang(kc)))+'">⚠ Dùng '+coChuHTML(String(K.ky).length>7 ? ngayVNsl(K.ky).slice(0, 5) : kyVN(K.ky))+'</button>');
  return '';
}
/* 3.163: chip báo trạng thái số liệu (thay các hàng vàng riêng) — gom theo tab, vẽ vào chỗ .pv-chip-o của cây địa bàn */
var SL_CHIP = {tab:'', h:'', lech:false};
function slChipThem(h){ if(SL_CHIP.tab!==D.cauHinh.slTab) SL_CHIP = {tab:D.cauHinh.slTab, h:'', lech:false}; SL_CHIP.h += h; slChipVe(); }
function slChipHTML(){ return nganHienTai===7 && SL_CHIP.tab===D.cauHinh.slTab ? SL_CHIP.h : ''; }
function slChipVe(){ setTimeout(function(){ Array.prototype.forEach.call(document.querySelectorAll('.pv-chip-o'), function(o){ o.innerHTML = slChipHTML(); }); kyChungVe(); }, 0); }
function slMoNapKy(kc){ slDoiTab('nap'); SL_KY = slThang(kc); KT_KY_KT = SL_KY; veSoLieu(); }
/* 3.138 (anh chốt): ⟳ Làm mới cạnh ô chọn số liệu — áp kỳ đang chọn cho cả Tổ TK&VV, Sao kê, KTGS, bỏ bộ đã dựng, mở lại; chip = kỳ máy ĐANG dùng (khác kỳ chọn → vàng) */
function toKyOpt(dsKy, cur){   /* ô chọn số liệu: nhóm cuối tháng · nhóm theo ngày (khi cần) */
  var o = function(x){ return '<option value="'+x.ky+'"'+(x.ky===cur ? ' selected' : '')+'>'+coChuHTML(x.chu)+'</option>'; };
  var th = dsKy.filter(function(x){ return x.ky.length===7; }), ng = dsKy.filter(function(x){ return x.ky.length>7; });
  return (th.length ? '<optgroup label="Cuối tháng (mặc định)">'+th.map(o).join('')+'</optgroup>' : '')+(ng.length ? '<optgroup label="Theo ngày — khi cần">'+ng.map(o).join('')+'</optgroup>' : '');
}
/* nạp bộ số liệu cho tab: bảng món vay (hs) + bộ tháng (Thông tin tổ trưởng, Mẫu 7, QH, khoanh, KHĐ) → danh sách tổ */
var TO_KS = {};   /* 3.89: bộ số liệu đã nạp theo kỳ (dùng chung Tổ / Tra cứu / Sao kê), giữ 3 kỳ */
function toDvTuTen(x){ var c = slChuan(x), r = ''; TW_HOI.some(function(h){ if(c.indexOf(h[0])>=0){ r = h[1]; return true; } return false; }); return r==='99' ? '' : r; }   /* 3.108: "HỘI NÔNG DÂN" → 11 … */
function tenHoaDau(x){ return String(x||'').replace(/\s+/g, ' ').trim().toLocaleLowerCase('vi').replace(/(^| )(\S)/g, function(m, a, b){ return a+b.toLocaleUpperCase('vi'); }); }
function toTenChuan(K){   /* 3.108 (anh chốt): tên tổ trưởng / tổ phó hiện + in "Nguyễn Văn A": bỏ "Ông / Bà" đầu tên; tên không dấu → tên trên Mẫu 31 (theo mã KH, hoặc thành viên tổ trùng tên); tên hộ vay giữ nguyên */
  var T = K.to, ten = {};
  (K.hs||[]).forEach(function(o){ if(o.kh && o.ten && !ten[o.kh]) ten[o.kh] = o.ten; });
  var chuan = function(x, kh, ma, t){
    x = String(x||'').replace(/\s+/g, ' ').trim(); if(!x) return x;
    var bo = x.replace(/^(ông|bà|ong|ba)\.?\s+/i, ''); if(bo!==x && bo.split(' ').length>=2) x = bo;
    if(!/[^\x00-\x7f]/.test(x)){   /* không dấu */
      var c = kh && ten[kh] && slChuan(ten[kh])===slChuan(x) ? ten[kh] : '';
      if(!c) (K.kh[ma]||[]).some(function(o){ if(o.ten && /[^\x00-\x7f]/.test(o.ten) && slChuan(o.ten)===slChuan(x)){ c = o.ten; return true; } return false; });
      if(c) x = c; else if(t) t.tenKhongDau = true;
    }
    return tenHoaDau(x);
  };
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep) return;
    if(t.ten){ t.tenGoc = t.ten; t.ten = chuan(t.ten, t.ds && t.ds.ttKH, m, t); }
    if(t.pho) t.pho = chuan(t.pho, (t.ds && t.ds.phoKH) || (t.tt && t.tt.phoKH), m, null); });
}
function toDanhBaDiem(K){
  var T = K.to, ma = {}; if(!SL_DB || !SL_DB.to) return;
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.diem && t.tenDiem) ma[t.xa+'|'+slChuan(t.tenDiem)] = t.diem; });
  Object.keys(T).forEach(function(m){ var t = T[m], c = SL_DB.to[m]; if(t.diem || t.trucTiep || !c || !c.diem) return;
    var d = ma[t.xa+'|'+slChuan(c.diem)]; if(!d) return;   /* chỉ nhận khi đối được ra mã điểm GD của tổ khác cùng xã */
    t.diem = d; t.tenDiem = c.diem; if(!t.ngayGD && c.ngayGD) t.ngayGD = c.ngayGD; t.diemTu = 'danh bạ tổ'+(c.ky ? ' ('+kyVN(String(c.ky).slice(0, 7))+')' : ''); });
}
function toSuyDiem(K){   /* 3.98: tổ không có điểm GD (không có trong Thông tin tổ trưởng / Mẫu 7 tháng này và 4 tháng gần nhất — thường là tổ mới / tách) → suy:
     ① danh mục địa bàn (Cài đặt) theo mã ấp · ② tổ khác cùng ấp · ③ tổ khác cùng xã cùng ngày GDXA (ngày giao dịch của món). Đánh dấu t.diemSuy để báo, không sửa số liệu gốc */
  var T = K.to, ds = Object.keys(T).map(function(m){ return T[m]; }).filter(function(t){ return !t.trucTiep; });
  var ngay = function(v){ var s = String(v||'').trim(), m = s.match(/^(\d{4})-(\d{2})-(\d{2})/) || s.match(/^(\d{1,2})\/\d{1,2}\/\d{4}/); return m ? String(+(m[3] || m[1])) : (/^\d{1,2}$/.test(s) ? String(+s) : ''); };
  var ngayTo = function(t){ if(t.ngayGD) return ngay(t.ngayGD); var r = ''; (K.kh[t.ma]||[]).some(function(o){ r = ngay(o.ngayGD || o.c_ngay_gdxa); return !!r; }); return r; };
  var nhieu = function(L){ var d = {}, tot = null; L.forEach(function(x){ var k = x.diem; d[k] = d[k] || {n:0, x:x}; d[k].n++; if(!tot || d[k].n>tot.n) tot = d[k]; }); return tot && tot.x; };
  var co = ds.filter(function(t){ return t.diem && !t.diemSuy; });
  ds.filter(function(t){ return !t.diem; }).forEach(function(t){
    var g = null, ly = '';
    if(t.thon) (D.cauHinh.diaBan||[]).forEach(function(x){ if(g || (t.xa && x.ma && String(x.ma)!==String(t.xa))) return;
      (x.diem||[]).forEach(function(z){ if(!g && (z.ap||[]).some(function(a){ return String(a.ma)===String(t.thon); })) g = {diem:z.ma, tenDiem:z.ten}; }); });
    if(g) ly = 'danh mục địa bàn (ấp)';
    if(!g && t.thon){ g = nhieu(co.filter(function(x){ return x.xa===t.xa && String(x.thon)===String(t.thon); })); if(g) ly = 'tổ khác cùng ấp'; }
    var n = ngayTo(t);
    if(!g && n){ g = nhieu(co.filter(function(x){ return x.xa===t.xa && ngayTo(x)===n; })); if(g) ly = 'tổ cùng xã, cùng ngày GDXA '+n; }
    if(!g) return;
    t.diem = g.diem; t.tenDiem = g.tenDiem; if(!t.ngayGD && (g.ngayGD || n)) t.ngayGD = g.ngayGD || n; t.diemSuy = ly;
  });
}
function toNap(ky){
  if(TO_KS[ky]){ slDung(ky); return Promise.resolve(TO_KS[ky]); }
  var K = {ky:ky, ngay:ky.length>7 ? ky : tdnCuoiKy(ky), thang:slThang(ky)}, Bm;
  return slBo(ky).then(function(b){ Bm = b;   /* 3.136: kỳ ngày — mỗi loại lấy bảng đúng ngày, thiếu thì bảng liền trước (slKyDung) */
    K.hs = Bm.co.hstd || []; K.lap = Bm.lap || []; var nh = Bm.nguon.hstd || ky;
    K.hsTen = 'Mẫu 31 '+slKyChu(nh); if(ky.length>7) K.Bd = Bm;
  }).then(function(){
    K.B = Bm; var T = {}, KH = {};
    /* 3.88.1: bảng món vay chưa có trong máy (nằm trên Drive, chưa tải được) → vẫn dựng cây tổ từ danh bạ, báo rõ để anh nối Drive */
    var eHS = SLM.bang[slKhoa('hstd', Bm.nguon.hstd || ky)];   /* 3.120: bỏ Mẫu 10 */
    K.thieuBang = !K.hs.length && !!eHS && (eHS.soDong||0) > 0;
    var lay = function(ma){ return T[ma] = T[ma] || {ma:ma}; };
    var chung = [['xa','xa'],['tenXa','tenXa'],['thon','thon'],['tenThon','tenThon'],['dv','dv'],['ten','toTen']];
    K.hs.forEach(function(o){ if(!o.to || o.to===TO_GIA) return; var t0 = lay(o.to); toDien(t0, o, chung); if(o.ttKH && !t0.cif) t0.cif = o.ttKH; if(o.raTo) return; (KH[o.to] = KH[o.to] || []).push(o); });   /* 3.138.1: khách đã ra khỏi tổ không tính tổ viên */   /* 3.92: tổ 0000000 = khách chỉ gửi TK (xã giả 482000), không lên cây */
    (Bm.co.dnct||[]).forEach(function(o){ var t = o.to && T[o.to]; if(t && o.ttKH && !t.cif) t.cif = o.ttKH; if(!t || t.diem || !o.diem) return; toDien(t, o, [['diem','diem'],['tenDiem','tenDiem'],['ngayGD','ngayGD']]); t.diemTu = 'Dư nợ chi tiết '+slKyChu(Bm.nguon.dnct || K.thang); });   /* 3.120 (anh chốt): điểm GD xã lấy thẳng từ file Dư nợ chi tiết (ưu tiên) */
    var coTT = {}; (Bm.co.tt||[]).forEach(function(o){ coTT[o.to] = 1; });
    /* 3.409 (anh 30/10 "nên quay lại lấy như cũ nhưng Mẫu 31 vẫn là chính"): File Tổ trưởng vẫn lấy bản gần nhất như cũ (3.202);
       khác ngày Mẫu 31 → K.dsLech (báo), File Tổ trưởng chỉ BÙ chỗ trống — không đè ấp của Mẫu 31; cùng ngày → ấp theo File Tổ trưởng (3.401 QT-C-10) */
    var eDS = Bm.nguon.dsto ? SLM.bang[slKhoa('dsto', Bm.nguon.dsto)] : null, e31 = SLM.bang[slKhoa('hstd', Bm.nguon.hstd || ky)];
    var ngDS = eDS ? slNgaySo(eDS) : '', ng31 = e31 ? slNgaySo(e31) : K.ngay;
    K.dsLech = (ngDS && ng31 && ngDS!==ng31) ? {ds:ngDS, m31:ng31} : null; K.dsDung = Bm.co.dsto||[];
    K.dsDung.forEach(function(o){ var t = lay(o.to), co = !!t.diem; t.ds = o;   /* 3.145 (anh chốt Q16): DSTO là file bắt buộc → điền TRƯỚC Thông tin tổ trưởng (SĐT, tổ phó lấy theo DSTO) */
      toDien(t, o, [['diem','diem'],['tenDiem','tenDiem'],['tenXa','tenXa'],['tenThon','tenThon'],['ten','toTen'],['sdt','sdt'],['pho','phoTen']]);
      if(!t.dv && o.dvTen) t.dv = toDvTuTen(o.dvTen);
      if(o.thon && !(K.dsLech && t.thon)){ if(t.thon && String(t.thon)!==String(o.thon)) t.thonM31 = t.thon; t.thon = String(o.thon); if(o.tenThon) t.tenThon = o.tenThon; t.thonTT = true; }   /* 3.401 QT-C-10 (anh chốt 28/10): ấp của tổ = mã thôn (MADP) trên File Tổ trưởng */
      if(!co && t.diem && !coTT[o.to]) t.diemTu = 'Danh sách tổ '+slKyChu(Bm.nguon.dsto || K.thang); });
    (Bm.co.tt||[]).forEach(function(o){ var t = lay(o.to); t.tt = o; toDien(t, o, chung.concat([['diem','diem'],['tenDiem','tenDiem'],['ngayGD','ngayGD'],['sdt','sdt'],['pho','phoTen']])); });   /* Thông tin tổ trưởng: file phụ — chỉ bù chỗ DSTO trống */
    if(K.thieuBang && SL_DB){
      Object.keys(SL_DB.kh||{}).forEach(function(m){ var c = SL_DB.kh[m]; if(c.to) toDien(lay(c.to), c, chung); });
      Object.keys(SL_DB.to||{}).forEach(function(ma){ var c = SL_DB.to[ma], t = T[ma]; if(t) toDien(t, c, [['ten','ten'],['sdt','sdt'],['pho','pho'],['tenDiem','diem'],['ngayGD','ngayGD']]); });
    }
    K.to = T; K.kh = KH;
    /* tổ chưa có điểm GD (tháng này chưa nạp Thông tin tổ trưởng / Mẫu 7) → lấy thông tin tổ ở tháng gần nhất có file (thông tin tổ ít đổi) */
    var thieu = function(){ return Object.keys(T).some(function(ma){ return !T[ma].diem; }); };
    /* 3.107: chỉ lấy bảng chốt tháng (bỏ bảng theo ngày), tháng gần kỳ đang xem nhất trước (trước rồi sau), tối đa 6 bảng; ghi căn cứ t.diemTu */
    var cach = function(ky){ var a = ky.split('-'), b = K.thang.split('-'); return Math.abs((+a[0]*12 + +a[1]) - (+b[0]*12 + +b[1])) + (ky>K.thang ? 0.5 : 0); };
    var khac = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return (e.loai==='dsto' || e.loai==='tt') && String(e.ky).length===7 && e.ky!==K.thang; })
      .sort(function(a, b){ return cach(a.ky)-cach(b.ky) || (a.loai==='dsto' ? -1 : 1); }).slice(0, 6);
    return khac.reduce(function(p, e){ return p.then(function(){ if(!thieu()) return; return slDocBang(e.loai, e.ky).then(function(b){
      if(!b) return; slMoBang(b).forEach(function(o){ var t = T[o.to]; if(t && !t.diem && o.diem){ toDien(t, o, [['diem','diem'],['tenDiem','tenDiem'],['ngayGD','ngayGD'],['sdt','sdt'],['pho','phoTen'],['dv','dv'],['tenThon','tenThon'],['tenXa','tenXa']]); t.diemTu = (e.loai==='tt' ? 'Thông tin tổ trưởng ' : 'Danh sách tổ ')+kyVN(e.ky); } }); }); }); }, Promise.resolve());
  }).then(function(){
    var T = K.to;
    toDanhBaDiem(K);   /* 3.107: bảng tháng trước không mở được → danh bạ tổ (lưu từ các lần nạp Thông tin tổ trưởng) */
    toSuyDiem(K);   /* 3.98: tổ chưa có trong Thông tin tổ trưởng → suy điểm GD theo ấp / ngày GDXA */
    toGanTrucTiep(K, Bm);   /* 3.92: món vay trực tiếp (không mã tổ) → mục "Vay trực tiếp" ở đúng xã / điểm GD */
    toTenXa(K);   /* 3.409 */
    var ngD = {}; Object.keys(T).forEach(function(ma){ var t = T[ma]; if(t.diem && t.ngayGD && !ngD[t.diem]) ngD[t.diem] = t.ngayGD; });
    /* 3.407 (Tèo QT-C-12, phép thử chung teo_ca C12): File Tổ trưởng không có ngày GD, Dư nợ chi tiết đã thôi xuất → ngày GD của ĐIỂM = ngày GDXA chiếm đa số
       trong Mẫu 31 của các tổ thuộc điểm (tổ mới chuyển đến còn mang GDXA điểm cũ vẫn theo điểm mới) — chỉ điền khi chưa có (không đè nguồn file) */
    var demD = {}; Object.keys(T).forEach(function(ma){ var t = T[ma]; if(t.trucTiep || !t.diem || ngD[t.diem]) return;
      (K.kh[ma]||[]).forEach(function(o){ var n = +o.ngayGD || 0; if(n){ var d = demD[t.diem] = demD[t.diem] || {}; d[n] = (d[n]||0)+1; } }); });
    Object.keys(demD).forEach(function(dm){ var d = demD[dm], tot = 0, n = 0; Object.keys(d).forEach(function(k){ if(d[k]>n){ n = d[k]; tot = k; } }); if(tot) ngD[dm] = hai(+tot); });
    Object.keys(T).forEach(function(ma){ var t = T[ma]; if(t.diem && !t.ngayGD && ngD[t.diem]) t.ngayGD = ngD[t.diem]; });   /* 3.108: DSTO không có ngày GDXA → theo mã điểm GD */
    (K.hs||[]).forEach(function(o){ var t = T[toMaCua(o)]; o._ngGD = t && !t.trucTiep && t.ngayGD ? String(+t.ngayGD || '') : ''; });   /* 3.404 QT-C-12: ngày GD của điểm cho ngày chuyển QH (skCQH) */
    Object.keys(T).forEach(function(ma){ var t = T[ma]; t.tenDiemDu = t.tenDiem ? String(t.tenDiem).trim()+(t.ngayGD ? ' · ngày '+t.ngayGD : '') : '(chưa rõ điểm GD)'; t.khoaDiem = t.diem || t.tenDiemDu; });
    /* 3.90: chỉ tiêu chuẩn TW của tổ — dòng LEN_31 TO_TRUONG cùng kỳ (ghép theo tên tổ trưởng trong xã) */
    var ltR = Bm && Bm.co.lt;
    if(ltR) twGhepTo(ltR, twToTu(K.hs, T)).forEach(function(g){ g.ma.forEach(function(m){ if(T[m]){ T[m].len = g.o; T[m].lenGop = g.ma.length; } }); });
    toDong0(K, Bm);   /* 3.145 (anh chốt): tổ dư nợ 0 */
    toKiemAp(K);   /* 3.401 QT-C-10 / 11: món lệch ấp so với tổ · ấp nhiều điểm · món trực tiếp gán điểm tạm · 3.406: tổ còn dư nợ không chuẩn (sau toDong0 để có t.ngoaiDS) — chỉ báo */
    toTenChuan(K);   /* 3.108: tên tổ trưởng / tổ phó: bỏ "Ông / Bà", lấy dấu theo Mẫu 31, hoa đầu từ — 1 lần mỗi kỳ (TO_KS giữ sẵn) */
    TO_KS[ky] = K; slDung(ky); slBot(TO_KS);
    return tkNapMoi(K).then(function(){ return K; });   /* 3.201: Sao kê TK 104 / 105 — luôn lấy file mới nhất */
  });
}
/* 3.145 (anh chốt): tổ dư nợ 0 còn trên DSTO hoặc LEN_31 TO_TRUONG → vẫn là 1 tổ, ghi "cần đóng tổ"; không còn ở cả 2 → ẩn khỏi cây (vẫn tìm được) */
function toDong0(K, Bm){   /* 3.383.6 (anh 26/10 "chỉ hiện các tổ chưa đóng; tổ đóng rồi không hiện nữa, cần thì sao kê bên tab Sao kê") — QUY_CHUAN mục 16:
     tổ CHƯA ĐÓNG = có mã trên Danh sách tổ của kỳ (hệ thống chỉ xuất tổ còn mở); thiếu → Thông tin tổ trưởng → LEN_31 TO_TRUONG → Mẫu 31 (còn khách TK 105); có thu trong tháng thì luôn giữ.
     Dư nợ 0 mà chưa đóng → "cần đóng tổ". Đã đóng → bỏ khỏi cây (K.toAn, không tìm, không hiện). Còn dư nợ mà không có trên Danh sách tổ → vẫn hiện + cảnh báo (không giấu món vay). */
  var T = K.to, coDS = !!(K.dsDung || Bm.co.dsto || []).length, coTT = !!(Bm.co.tt||[]).length, coLen = !!(Bm.co.lt||[]).length; K.toAn = {}; K.canDong = []; K.ngoaiDS = [];
  var thuThang = function(ma){ return (K.kh[ma]||[]).some(function(o){ return (o.tnTH||0)+(o.tnQH||0)+(o.tnK||0)+(+o.c_thu_lai_th_thang||0)+(+o.c_thu_lai_qh_thang||0)>0; }); };   /* tất toán + đóng ngay trong tháng → còn số thu tháng: giữ để báo cáo tháng đủ số */
  var guiTK = function(ma){ return (K.kh[ma]||[]).concat((K.lap||[]).filter(function(o){ return o.to===ma; })).some(function(o){ return (o.t105||0)>0; }); };
  Object.keys(T).forEach(function(ma){ var t = T[ma]; if(toLaTT(t)) return;
    var dn = (K.kh[ma]||[]).reduce(function(a, o){ return a+(o.dn||0); }, 0);
    if(dn>0){ if(coDS && !t.ds){ t.ngoaiDS = true; K.ngoaiDS.push(ma); } return; }
    var mo = (coDS ? !!t.ds : coTT ? !!t.tt : coLen ? !!t.len : guiTK(ma)) || thuThang(ma);   /* chuỗi căn cứ: Danh sách tổ → Thông tin tổ trưởng → LEN_31 → Mẫu 31 */
    if(mo){ t.canDong = true; K.canDong.push(ma); } else { K.toAn[ma] = t; delete T[ma]; } });
}
function toDongNguon(t){   /* căn cứ "cần đóng tổ" + TK 104 (Danh sách tổ có cột TK 104) */
  return (t.ds ? 'Danh sách tổ'+(t.ds.tk104 ? ' · còn TK 104' : ' · đã đóng TK 104') : t.tt ? 'Thông tin tổ trưởng' : t.len ? 'LEN_31 TO_TRUONG' : 'Mẫu 31 — còn khách có TK 105 hoặc có thu trong tháng'); }
function toDien(t, o, ds){ ds.forEach(function(f){ if(!t[f[0]] && o[f[1]]) t[f[0]] = o[f[1]]; }); }   /* điền trường còn trống của tổ từ 1 dòng dữ liệu */
/* ---------- 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể) ----------
   mỗi xã + điểm GD có món trực tiếp → 1 mục giả trong cây (mã TT…, hội 99 "Trực tiếp", tên "Vay trực tiếp (không qua tổ)");
   điểm GD suy từ XÃ + NGÀY GDXA (mỗi điểm trong xã có ngày GD riêng; thôn không dùng được vì 19/59 thôn có tổ thuộc 2 điểm).
   Không đổi o.to của dữ liệu (kiểm tra vẫn thấy món không tổ) — chỉ gắn o._tt; tra tổ của 1 dòng dùng toMaCua(o). */
var TO_GIA = '0000000';
function toMaCua(o){ return (o && o.to && o.to!==TO_GIA) ? o.to : ((o && o._tt) || ''); }
function toLaTT(t){ return !!(t && t.trucTiep); }
/* 3.409 (anh 30/10: cây địa bàn 3 xã hiện tên "Vay trực tiếp"): tên xã của tổ = tên chiếm đa số trong Mẫu 31 của mã xã đó (Mẫu 31 là chính),
   bỏ tên dạng "… trực tiếp"; Mẫu 31 không có → danh mục ⚙ Cài đặt. Trước: lấy tên ở dòng đầu tiên gặp của tổ. */
function toTenXa(K){
  var dem = {}, T = K.to, laTT = function(s){ return /tr[ựu]c ti[ếe]p/i.test(String(s||'')); };
  (K.hs||[]).forEach(function(o){ if(!o.xa || !o.tenXa || laTT(o.tenXa)) return; var d = dem[o.xa] = dem[o.xa] || {}; d[o.tenXa] = (d[o.tenXa]||0)+1; });
  var dm = {}; (D.cauHinh.diaBan||[]).forEach(function(x){ if(x.ma && x.xa) dm[String(x.ma)] = x.xa; });
  var ten = {}; Object.keys(dem).forEach(function(m){ var d = dem[m], tot = ''; Object.keys(d).forEach(function(k){ if(!tot || d[k]>d[tot]) tot = k; }); ten[m] = tot; });
  Object.keys(T).forEach(function(m){ var t = T[m], v = ten[t.xa] || (laTT(t.tenXa) || !t.tenXa ? dm[String(t.xa)] : ''); if(v && v!==t.tenXa) t.tenXa = v; });
}
function toGanTrucTiep(K, Bm){
  /* 3.107: điểm GD của món vay trực tiếp: ① ấp của món (danh mục địa bàn / tổ cùng ấp) → ② ngày GDXA trùng tổ cùng xã → ③ xã chỉ có 1 điểm GD */
  var T = K.to, KH = K.kh, diem = {}, ap = {}, xa = {}, ku = {};
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep || !t.xa || !t.diem) return;
    if(t.ngayGD){ var k = t.xa+'|'+(+t.ngayGD); if(!diem[k]) diem[k] = t; }
    if(t.thon){ var a = ap[t.xa+'|'+t.thon] = ap[t.xa+'|'+t.thon] || {}; a[t.diem] = a[t.diem] || {n:0, t:t}; a[t.diem].n++; }
    var x = xa[t.xa] = xa[t.xa] || {}; if(!x[t.diem]) x[t.diem] = t; });
  var nhieu = function(a){ var tot = null; Object.keys(a||{}).forEach(function(k){ if(!tot || a[k].n>tot.n) tot = a[k]; }); return tot && tot.t; };
  var theoAp = function(o){ var g = null; if(!o.thon) return null;   /* 3.401 QT-C-10 / 11: ấp của món → điểm của các tổ cùng ấp (File Tổ trưởng) trước, danh mục địa bàn sau */
    g = nhieu(ap[o.xa+'|'+o.thon]); if(g){ o._ttCach = 'ap'; return g; }
    (D.cauHinh.diaBan||[]).forEach(function(x){ if(g || (x.ma && String(x.ma)!==String(o.xa))) return;
      (x.diem||[]).forEach(function(z){ if(!g && (z.ap||[]).some(function(a){ return String(a.ma)===String(o.thon); })){ var c = Object.keys(T).map(function(m){ return T[m]; }).find(function(t){ return !t.trucTiep && t.xa===o.xa && String(t.diem)===String(z.ma); }); g = c || {diem:z.ma, tenDiem:z.ten, ngayGD:''}; } }); });
    if(g) o._ttCach = 'danhMuc'; return g; };
  (K.hs||[]).forEach(function(o){
    if(o.to || !o.ku || !o.xa) return;
    var mot = Object.keys(xa[o.xa]||{}), d = theoAp(o), ma;
    if(!d && (d = diem[o.xa+'|'+(+(o.ngayGD||0))])) o._ttCach = 'gdxa';   /* ấp chưa có tổ nào → tạm theo ngày GDXA (như giao ban), báo ở Kiểm tra kỳ */
    if(!d && mot.length===1){ d = xa[o.xa][mot[0]]; o._ttCach = 'xa1'; }
    if(!d) o._ttCach = 'chua';
    ma = 'TT'+o.xa+'_'+(d ? String(d.diem||d.tenDiem) : 'd'+(o.ngayGD||''));
    var t = T[ma] = T[ma] || {ma:ma, trucTiep:true, xa:o.xa, tenXa:o.tenXa||'', dv:'99', ten:'Vay trực tiếp (không qua tổ)', diem:d ? d.diem : '', tenDiem:d ? d.tenDiem : '', ngayGD:d ? d.ngayGD : (o.ngayGD||''), soMon:0};
    if((o.dn||0)>0 || (o.qh||0)>0 || laiTon(o)>0) t.soMon++;   /* món còn lãi = chưa tất toán (anh chốt) */
    (KH[ma] = KH[ma] || []).push(o); o._tt = ma; ku[o.ku] = ma;
  });
  ['nqh','nk','khd'].forEach(function(L){ ((Bm && Bm.co[L])||[]).forEach(function(o){ if(!o.to && ku[o.ku]) o._tt = ku[o.ku]; }); });
}
/* 3.401 (anh chốt 28/10 — Tèo QT-C-10 / 11, docs/TEO_QUY_TAC_CHUNG.md): kiểm chuỗi món → tổ → ấp → điểm. Chỉ BÁO (QT-C-08), không sửa số liệu, món vẫn tính theo tổ.
   K.qtc = {lechAp: món ở ấp khác ấp của tổ (ấp tổ theo File Tổ trưởng), apNhieu: ấp có tổ thuộc nhiều điểm GD, ttTam: món trực tiếp chưa gán được theo ấp} */
var TO_TT_CACH = {gdxa:'tạm theo ngày GDXA (ấp chưa có tổ)', xa1:'xã chỉ có 1 điểm GD', chua:'chưa rõ điểm GD'};
function toKiemAp(K){
  var T = K.to, q = {lechAp:[], apNhieu:[], ttTam:[]}, ap = {};
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep) return;
    if(t.thon && t.diem){ var k = t.xa+'|'+t.thon, a = ap[k] = ap[k] || {xa:t.tenXa||t.xa, thon:t.thon, ten:t.tenThon||'', d:{}}; a.d[t.diem] = a.d[t.diem] || {ten:t.tenDiem||t.diem, n:0}; a.d[t.diem].n++; }
    if(!t.thonTT) return;
    (K.kh[m]||[]).forEach(function(o){ if(o.ku && o.thon && String(o.thon)!==String(t.thon) && ((o.dn||0)>0 || (o.qh||0)>0)) q.lechAp.push([o.ku, o.kh||'', o.ten||'', m, String(o.thon), String(t.thon), o.dn||0]); });
  });
  Object.keys(ap).forEach(function(k){ var a = ap[k], ds = Object.keys(a.d); if(ds.length<2) return;
    q.apNhieu.push([a.xa, a.thon, a.ten, ds.map(function(d){ return a.d[d].ten+' ('+a.d[d].n+' tổ)'; }).join(' · ')]); });
  (K.hs||[]).forEach(function(o){ if(o.to || !o.ku || !o._ttCach || !TO_TT_CACH[o._ttCach] || !((o.dn||0)>0 || (o.qh||0)>0)) return;
    var t = T[o._tt]; q.ttTam.push([o.ku, o.kh||'', o.ten||'', o.tenXa||o.xa||'', String(o.thon||''), t ? (t.tenDiem||'(chưa rõ)') : '(chưa rõ)', TO_TT_CACH[o._ttCach]]); });
  /* 3.406 (anh 29/10 "kiểm tra tất cả các tổ có dư nợ có thuộc địa bàn điểm GD xã — có tổ nào không chuẩn"): tổ còn dư nợ không chuẩn → q.toLech */
  var apD = {}, diemXa = {}, nh = function(o){ var b = '', n = -1; Object.keys(o).forEach(function(k){ if(o[k]>n){ n = o[k]; b = k; } }); return b; };
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep || !t.diem) return;
    if(t.thon){ var k = t.xa+'|'+t.thon; apD[k] = apD[k] || {}; apD[k][t.diem] = (apD[k][t.diem]||0)+1; }
    diemXa[t.diem] = diemXa[t.diem] || {}; diemXa[t.diem][t.xa] = (diemXa[t.diem][t.xa]||0)+1; });
  q.toLech = []; q.toDuNo = 0;
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep) return;
    var dn = (K.kh[m]||[]).reduce(function(a, o){ return a+(o.dn||0); }, 0); if(!(dn>0)) return; q.toDuNo++;
    var ly = [];
    if(!t.xa) ly.push('chưa rõ xã');
    if(!t.diem) ly.push('chưa rõ điểm GD');
    else if(t.diemSuy) ly.push('điểm GD suy ('+t.diemSuy+') — không có trên File Tổ trưởng');
    if(t.ngoaiDS) ly.push('không có trên Danh sách tổ (File Tổ trưởng)');
    if(!t.thon) ly.push('chưa rõ ấp');
    var ka = t.xa+'|'+t.thon, d0 = t.thon && apD[ka] ? nh(apD[ka]) : '';
    if(t.diem && d0 && d0!==String(t.diem) && Object.keys(apD[ka]).length>1) ly.push('ấp có tổ thuộc điểm khác (đa số tổ cùng ấp ở điểm '+d0+')');
    var x0 = t.diem && diemXa[t.diem] ? nh(diemXa[t.diem]) : '';
    if(x0 && x0!==String(t.xa) && Object.keys(diemXa[t.diem]).length>1) ly.push('điểm GD '+t.diem+' phần lớn tổ ở xã khác ('+x0+')');
    if(ly.length) q.toLech.push([m, t.ten||'', t.tenXa||t.xa||'', t.tenDiemDu||'', t.tenThon||t.thon||'', dn, ly.join(' · ')]); });
  K.qtc = q; return q;
}
/* ---------- 3.92: TAB TỔ — mục đích (anh Nhân): biết số tổ viên để KẾT NẠP thêm hoặc CHO RA khỏi tổ, căn cứ dư nợ và số dư 105 ----------
   chọn 1 tổ → mặc định hiện toàn bộ tổ viên (Mã KH · Họ tên · CT vay · Dư nợ · 105 · Số TK 105 · CCCD) + hàng nút lọc;
   chưa chọn tổ (tất cả tổ của xã / điểm / hội) → bảng các tổ: số tổ viên, mới vào, đề xuất cho ra, kết quả giao dịch tháng */
var TO_LOC = [
  ['tat', 'Tất cả', function(){ return true; }, ''],
  ['co', 'Có dư nợ', function(k){ return k.conNo; }, ''],
  ['ctk', 'Chưa có TK 105', function(k){ return !k.stk.length && !k.coTK; }, 'vang'],   /* 3.161 (anh chốt b): mọi khách còn mã tổ */   /* 3.128 · 3.138: có số TK 105 trên Mẫu 31 (kể cả số dư 0) = đã mở, không báo */
  ['ko', 'Tất nợ · còn TK 105', function(k){ return !k.conNo && !k.chuaGN; }, ''],   /* 3.137 (anh chốt): gồm 105 có số dư và = 0; còn nợ lãi = chưa tất nợ (không vào đây); 105 trên 100.000 đ tô màu cảnh báo */
  ['ko105', 'Không dư nợ · còn 105', function(k){ return !k.conNo && !k.chuaGN && k.t105>0; }, 'vang', true],   /* 3.137: ẩn chip (anh bỏ) — giữ hàm cho dòng tóm tắt / bảng */
  ['ra', 'Đề xuất cho ra (không dư nợ, 105 = 0)', function(k){ return !k.conNo && !k.chuaGN && !(k.t105>0); }, 'do', true],
  ['cccd', 'CCCD hết hạn', function(k){ return k.cc.kq==='het'; }, 'do'],
  ['cccd30', 'CCCD sắp hết hạn', function(k){ return k.cc.kq==='sap'; }, 'vang'],   /* 3.161: còn dưới 30 ngày (ngày hiện tại) */
  ['sdt', 'Thiếu / sai SĐT', function(k){ return !k.sdtDat; }, 'vang'],
  ['xl', 'Có nợ cần xử lý (QH · khoanh · KHĐ)', function(k){ return k.qh>0 || k.kn>0 || k.khd; }, 'do'],
  ['dh', 'Đến hạn tháng sau', function(k){ return k.dhSau; }, 'vang'],
  ['moi', 'Mới vào tổ', function(k){ return !!k.vao; }, 'xanh'],   /* 3.128: so Mẫu 31 tháng trước */
  ['rk', 'Ra khỏi tổ', function(){ return false; }, 'do'],   /* 3.128: danh sách lấy từ tháng trước (không còn trong tổ tháng này) */
  ['tvra', 'Cần cho ra khỏi tổ (TƯ)', function(){ return false; }, 'do']   /* 3.201: theo Mẫu 01/TV — TƯ còn giữ, dư nợ 0 + tiền gửi 0, không còn lãi tồn */
];
var TO_LOC_NHOM = {tat:'kh', co:'kh', ko:'kh', moi:'kh', rk:'kh', dh:'kh', tvra:'xl', ctk:'xl', cccd:'xl', cccd30:'xl', sdt:'xl', xl:'xl'};   /* 3.161 (anh chốt): chip gom nhóm Khách / Cần xử lý */
var TO_TV_MA = '', TO_LOC_MO = 'tat', TO_TRUOC = null, TO_MAP = {}, TO_BD = null;
function toLocHam(ma){ var l = TO_LOC.find(function(x){ return x[0]===ma; }); return l ? l[2] : function(){ return false; }; }   /* 3.128.1: lấy chip theo mã, không theo vị trí (thêm chip không làm lệch số) */
/* 3.128 (anh chốt): biến động tổ viên — so Mẫu 31 hai tháng liền nhau; khách → tổ của từng tháng (TO_MAP[kỳ] = {mã KH: {to, ten, dn, t105, nv}});
   ngày kết nạp = ngày vay sớm nhất của khách; chuyển tổ tính cả "mới vào" (từ tổ X) lẫn "ra khỏi tổ" (sang tổ Y) */
function toMapKy(ky){
  if(TO_MAP[ky]) return Promise.resolve(TO_MAP[ky]);
  if(!SLM.bang[slKhoa('hstd', ky)]) return Promise.resolve(null);
  return slBo(ky).then(function(B){ var M = {}, R = {};
    (B.raTo||[]).forEach(function(x){ R[x.kh] = x.ly; }); Object.defineProperty(M, '_ra', {value:R});   /* 3.138.1: lý do ra khỏi tổ */
    (B.co.hstd||[]).forEach(function(o){ var m = toMaCua(o); if(!o.kh || !m || o.raTo) return; var x = M[o.kh] = M[o.kh] || {to:m, ten:o.ten||'', dn:0, lt:0, t105:0, nv:'', gd:''};
      if(o.ngdg && o.ngdg>x.gd) x.gd = String(o.ngdg).slice(0, 10);   /* 3.133: ngày GD gần nhất (≈ ngày ra) */
      x.dn += o.dn||0; if(o.ku) x.lt += laiTon(o); x.t105 = slT105Them(x, o); var d = o.nv || o.ngn || ''; if(d && (!x.nv || d<x.nv)) x.nv = d; });
    (B.lap||[]).forEach(function(o){ var x = M[o.kh]; if(x) x.t105 = slT105Them(x, o); });   /* 3.409 QT-C-01 cộng sổ */
    return TO_MAP[ky] = M;
  }).catch(function(){ return null; });
}
function toTenToMa(ma){ var t = TO_K && TO_K.to[ma]; return t ? 'tổ '+(t.ten||ma)+' ('+ma+')' : 'tổ '+ma; }
/* 3.132 (anh chốt): khách mới vào tổ chia 3 nhóm — CIF lớn hơn mọi CIF của Mẫu 31 tháng trước = hộ mới nhập (chắc chắn);
   CIF cũ mà tháng trước không có = dùng lại CIF cũ (quay lại vay); tháng trước ở tổ khác = chuyển tổ. Không kết luận chỉ bằng CIF. */
function toCifMax(M){ if(M._mx===undefined){ var mx = 0; Object.keys(M).forEach(function(k){ var n = +k; if(n>mx) mx = n; }); Object.defineProperty(M, '_mx', {value:mx}); } return M._mx; }
function toVaoTu(kh, Mp){ var p = Mp[kh]; if(p) return {nhom:'chuyen', tu:'từ '+toTenToMa(p.to)}; return +kh > toCifMax(Mp) ? {nhom:'moi', tu:'hộ mới (CIF mới)'} : {nhom:'cu', tu:'CIF cũ dùng lại'}; }
function toBienDong(ma, Mn, Mp){   /* ma = mã tổ hoặc hàm(mã tổ) → trong phạm vi · → {vao:{kh:{ngay, tu, nhom, to}}, ra:[{kh, ten, dn, t105, di, to}]} */
  var vao = {}, ra = [], trong = typeof ma==='function' ? ma : function(m){ return m===ma; };
  Object.keys(Mn).forEach(function(kh){ var x = Mn[kh]; if(!trong(x.to)) return; var p = Mp[kh]; if(p && p.to===x.to) return;
    var v = toVaoTu(kh, Mp); vao[kh] = {ngay:x.nv, tu:v.tu, nhom:v.nhom, to:x.to, tuTo:p ? p.to : ''}; });
  Object.keys(Mp).forEach(function(kh){ var p = Mp[kh]; if(!trong(p.to)) return; var x = Mn[kh]; if(x && x.to===p.to) return;
    ra.push({kh:kh, ten:p.ten, dn:p.dn, lt:p.lt||0, t105:p.t105, to:p.to, gd:p.gd||'', chuyen:!!x, di:x ? 'sang '+toTenToMa(x.to) : ((Mn._ra && Mn._ra[kh]) || 'không còn trong Mẫu 31')}); });
  ra.sort(function(a, b){ return a.kh<b.kh ? -1 : 1; });
  return {vao:vao, ra:ra};
}
function toBDNap(t){   /* biến động tháng đang xem của tổ t → TO_BD (đồng bộ lại khi đủ bảng) */
  var ky = TO_K.ky, tr = kyLui(TO_K.thang, -1);   /* 3.136: kỳ ngày → so ngày đó với cuối tháng trước */
  if(TO_BD && TO_BD.to===t.ma && TO_BD.ky===ky) return Promise.resolve(TO_BD);
  return Promise.all([toMapKy(ky), toMapKy(tr)]).then(function(a){
    TO_BD = a[0] && a[1] ? Object.assign(toBienDong(t.ma, a[0], a[1]), {to:t.ma, ky:ky, tr:tr, co:true}) : {to:t.ma, ky:ky, tr:tr, co:false, vao:{}, ra:[]};
    return TO_BD;
  });
}
var TO_BDN = null;
function toBDNam(){   /* 3.128 (anh chốt): biến động tổ viên cả năm theo tháng — bảng Vào / Ra từng tháng, bấm ô xem danh sách; In / Excel */
  if(!TO_K) return; var C = toCH(), t = TO_K.to[C.to], C0 = Object.assign({}, C), f = t ? t.ma : toPVFn(C0), ten = t ? toTenToMa(t.ma) : pvChu(C0, TO_K);   /* 3.132: chưa chọn tổ → cả phạm vi (Hội / điểm / xã / PGD) */
  var nam = String(TO_K.thang).slice(0, 4), ths = [];
  for(var m = 1; m<=12; m++){ var ky = nam+'-'+hai(m); if(ky>TO_K.thang) break; ths.push(ky); }
  moHop('<div class="hop-tit">📅 Biến động tổ viên năm '+nam+' — '+coChuHTML(ten)+'</div><div class="rong">Đang so Mẫu 31 các tháng…</div>', true);
  [kyLui(ths[0], -1)].concat(ths).reduce(function(p, ky){ return p.then(function(){ return toMapKy(ky); }); }, Promise.resolve()).then(function(){
    TO_BDN = {t:t || toGiaPV(C0), pv:!t, ten:ten, C:C0, nam:nam, ds:ths.map(function(ky){ var Mn = TO_MAP[ky], Mp = TO_MAP[kyLui(ky, -1)]; return {ky:ky, bd:Mn && Mp ? toBienDong(f, Mn, Mp) : null, Mn:Mn, Mp:Mp}; })};
    toBDNamVe('', '');
  });
}
function toBDNamDs(i, loai){ var x = TO_BDN.ds[i]; if(!x.bd) return [];   /* loai: vao · moi · cu · chuyen (3 nhóm của Vào) · ra */
  return loai!=='ra' ? Object.keys(x.bd.vao).sort().filter(function(kh){ return loai==='vao' || x.bd.vao[kh].nhom===loai; }).map(function(kh){ var v = x.bd.vao[kh], n = x.Mn[kh]; return {ky:x.ky, loai:'Vào', kh:kh, ten:n.ten, ngay:v.ngay ? ngayVNsl(v.ngay) : '', ghi:v.tu, dn:n.dn, t105:n.t105, to:v.to}; })
    : x.bd.ra.map(function(r){ return {ky:x.ky, loai:'Ra', kh:r.kh, ten:r.ten, ngay:'', ghi:r.di, dn:r.dn, t105:r.t105, to:r.to}; }); }
var TO_BD_NHOM = [['moi', '· hộ mới (CIF mới)'], ['cu', '· CIF cũ dùng lại'], ['chuyen', '· chuyển tổ']];
function toBDNamVe(i, loai){
  var X = TO_BDN, tv = 0, tr = 0, o = function(v, j, l){ return v===null ? '<td class="c">—</td>' : '<td class="c"><button class="to-loc'+(String(j)===String(i) && l===loai ? ' bat' : '')+'" onclick="toBDNamVe('+j+',\''+l+'\')"'+(v ? '' : ' disabled')+'>'+v+'</button></td>'; };
  var hV = '', hR = '', hN = {moi:'', cu:'', chuyen:''}, tN = {moi:0, cu:0, chuyen:0};
  X.ds.forEach(function(x, j){ var nv = x.bd ? Object.keys(x.bd.vao).length : null, nr = x.bd ? x.bd.ra.length : null, d = x.bd ? toBDDem(x.bd) : null; tv += nv||0; tr += nr||0; hV += o(nv, j, 'vao'); hR += o(nr, j, 'ra');
    TO_BD_NHOM.forEach(function(g){ tN[g[0]] += d ? d[g[0]] : 0; hN[g[0]] += o(d ? d[g[0]] : null, j, g[0]); }); });
  var ds = loai ? toBDNamDs(i, loai) : [], nhan = {vao:'Vào tổ', ra:'Ra khỏi tổ', moi:'Vào tổ · hộ mới (CIF mới)', cu:'Vào tổ · CIF cũ dùng lại', chuyen:'Vào tổ · chuyển tổ'};
  moHop('<div class="hop-tit">📅 Biến động tổ viên năm '+X.nam+' — '+coChuHTML(X.ten || toTenToMa(X.t.ma))+'</div>'+
    '<div class="hop-phu">So Mẫu 31 hai tháng liền nhau'+(X.pv ? ', cộng theo từng tổ trong phạm vi (chuyển tổ trong phạm vi vẫn tính vào / ra để theo dõi biến động tổ)' : '')+'. Vào = có trong tổ tháng này, tháng trước không: <b>hộ mới</b> = CIF lớn hơn mọi CIF của Mẫu 31 tháng trước; <b>CIF cũ dùng lại</b> = CIF cũ nhưng tháng trước không có (quay lại vay); <b>chuyển tổ</b> = tháng trước ở tổ khác. Ra = tháng trước có, tháng này không (sang tổ khác hoặc không còn trong Mẫu 31). Ngày kết nạp ≈ ngày vay. "—" = thiếu Mẫu 31 tháng đó hoặc tháng trước. Tháng 1 có thể báo Ra nhiều hơn thực tế (Mẫu 31 đầu năm bỏ món đã tất toán năm trước).</div>'+
    '<div class="to-bang-cuon"><table class="to-bang kt-bd-nam"><thead><tr><th>Tháng</th>'+X.ds.map(function(x){ return '<th>T'+(+x.ky.slice(5))+'</th>'; }).join('')+'<th>Cả năm</th></tr></thead><tbody>'+
    '<tr><td><b>Vào</b></td>'+hV+'<td class="c"><b>'+tv+'</b></td></tr>'+TO_BD_NHOM.map(function(g){ return '<tr><td>'+g[1]+'</td>'+hN[g[0]]+'<td class="c">'+tN[g[0]]+'</td></tr>'; }).join('')+'<tr><td><b>Ra</b></td>'+hR+'<td class="c"><b>'+tr+'</b></td></tr></tbody></table></div>'+
    (loai ? '<div class="nhan-nhom">'+nhan[loai]+' '+kyVN(X.ds[i].ky)+' — '+ds.length+' khách</div><div class="to-bang-cuon"><table class="to-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th>'+(X.pv ? '<th>'+(loai==='ra' ? 'Tổ cũ' : 'Tổ')+'</th>' : '')+(loai!=='ra' ? '<th>Ngày kết nạp (≈ ngày vay)</th><th>Từ đâu</th>' : '<th>Dư nợ tháng trước</th><th>Số dư 105</th><th>Đi đâu</th>')+'</tr></thead><tbody>'+
      ds.map(function(r, k){ return '<tr><td class="c">'+(k+1)+'</td><td>'+r.kh+'</td><td class="to-ten">'+coChuHTML(r.ten)+'</td>'+(X.pv ? '<td>'+coChuHTML(toTenToMa(r.to))+'</td>' : '')+(loai!=='ra' ? '<td>'+(r.ngay||'—')+'</td><td>'+coChuHTML(r.ghi)+'</td>' : '<td class="s">'+tdnTien(r.dn)+'</td><td class="s">'+tdnTien(r.t105)+'</td><td>'+coChuHTML(r.ghi)+'</td>')+'</tr>'; }).join('')+'</tbody></table></div>' : '<p class="ghi">Bấm số ở ô để xem danh sách khách.</p>')+
    '<div class="nhan-nhom">Bảng chi tiết vào / ra năm '+X.nam+'</div><div class="to-bang-cuon">'+toBDNamBangHTML(toBDNamBang(), 'to-bang')+'</div>'+
    xuatHang({ten:xuatTen('Bien dong to vien', TO_BDN.pv ? TO_BDN.ten : TO_BDN.t.ma, TO_BDN.nam), html:function(){ return toBDNamXuat('html'); }, excel:'toBDNamXuat(\'excel\')'}), true);   /* 3.152 */
}
/* 3.133 (anh chốt): bảng chi tiết vào / ra cả năm kiểu báo cáo tổ — STT · Mã KH · Họ tên hộ vay · [Xã · Điểm GD · Tổ theo cấp] · Vào (ngày) · Ra (ngày) · Ghi chú;
   xếp theo thời gian; khách vào rồi ra trong năm (cùng tổ) ghi chung 1 dòng; ngày vào = ngày vay đầu tiên (chuyển tổ: tháng); ngày ra ≈ ngày GD cuối trong Mẫu 31 tháng trước (chuyển tổ: tháng) */
function toBDNamBang(){
  var X = TO_BDN, C = X.C || {}, coTo = X.pv, coDiem = X.pv && !C.diem, coXa = X.pv && !C.xa, mo = {}, hang = [];
  var th = function(ky){ return 'T'+(+ky.slice(5))+'/'+ky.slice(0, 4); }, tt = function(m){ return (TO_K && TO_K.to[m]) || {}; };
  var ghiV = {moi:'Hộ mới (CIF mới), kết nạp vào tổ', cu:'CIF cũ dùng lại, kết nạp lại vào tổ'};
  X.ds.forEach(function(x){ if(!x.bd) return;
    Object.keys(x.bd.vao).sort().forEach(function(kh){ var v = x.bd.vao[kh], n = x.Mn[kh]||{}, k = kh+'|'+v.to;
      var r = {kh:kh, ten:n.ten||'', to:v.to, kyV:x.ky, vao:v.nhom==='chuyen' ? th(x.ky) : (v.ngay ? ngayVNsl(v.ngay) : th(x.ky)), sx:x.ky+(v.nhom==='chuyen' ? '-99' : (v.ngay && v.ngay.slice(0, 7)===x.ky ? v.ngay.slice(7) : '-00')),
        ghi:[v.nhom==='chuyen' ? 'Chuyển từ '+toTenToMa(v.tuTo) : ghiV[v.nhom]], ra:''};
      hang.push(r); mo[k] = r; });
    x.bd.ra.forEach(function(r0){ var k = r0.kh+'|'+r0.to, r = mo[k], ngay = r0.chuyen ? th(x.ky) : (r0.gd ? '≈ '+ngayVNsl(r0.gd) : th(x.ky)), ghi = r0.chuyen ? 'Chuyển '+r0.di : 'Tất nợ / không còn trong Mẫu 31';
      if(r && !r.ra){ r.ra = ngay; r.ghi.push(ghi); delete mo[k]; }
      else hang.push({kh:r0.kh, ten:r0.ten||'', to:r0.to, ra:ngay, vao:'', ghi:[ghi], sx:x.ky+(r0.gd && !r0.chuyen ? '-'+r0.gd.slice(8, 10) : '-98')}); });
  });
  hang.sort(function(a, b){ return a.sx<b.sx ? -1 : a.sx>b.sx ? 1 : a.kh<b.kh ? -1 : 1; });
  var nV = hang.filter(function(r){ return r.vao; }).length, nR = hang.filter(function(r){ return r.ra; }).length;
  var cot = ['STT', 'Mã KH'].concat(coXa ? ['Xã'] : [], coDiem ? ['Điểm GD'] : [], coTo ? ['Tổ'] : [], ['Họ tên hộ vay', 'Vào (ngày)', 'Ra (ngày)', 'Ghi chú']);   /* 3.137 (anh chốt): cột Tổ in trước Họ tên */
  var aoa = hang.map(function(r, i){ var t = tt(r.to); return [i+1, r.kh].concat(coXa ? [t.tenXa||''] : [], coDiem ? [t.tenDiemDu||''] : [], coTo ? [toLaTT(t) ? 'Vay trực tiếp' : (t.ten ? t.ten+' ('+r.to+')' : r.to)] : [], [r.ten, r.vao, r.ra, r.ghi.join('; ')]); });
  return {cot:cot, aoa:aoa, nV:nV, nR:nR, tong:'Cộng: '+nV+' vào · '+nR+' ra · chênh lệch '+(nV-nR>0 ? '+' : nV-nR<0 ? '−' : '')+Math.abs(nV-nR)};
}
function toBDNamBangHTML(B, lop){
  return '<table class="'+lop+'"><thead><tr>'+B.cot.map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+
    (B.aoa.map(function(r){ return '<tr>'+r.map(function(v, j){ return '<td'+(j===0 ? ' class="c"' : (B.cot[j]==='Vào (ngày)' || B.cot[j]==='Ra (ngày)') ? ' class="c" style="white-space:nowrap"' : B.cot[j]==='Họ tên hộ vay' ? ' class="to-ten"' : '')+'>'+coChuHTML(String(v))+'</td>'; }).join('')+'</tr>'; }).join('')
      || '<tr><td colspan="'+B.cot.length+'" class="rong">Không có biến động trong năm.</td></tr>')+
    '<tr class="tong"><td colspan="'+B.cot.length+'"><b>'+B.tong+'</b></td></tr></tbody></table>';
}
function toBDNamXuat(cach){   /* 3.133: In / Excel cả năm = bảng tổng theo tháng + bảng chi tiết vào / ra */
  var X = TO_BDN, t = X.t, B = toBDNamBang(), tieu = 'BIẾN ĐỘNG TỔ VIÊN NĂM '+X.nam;
  var thg = [['Tháng'].concat(X.ds.map(function(x){ return 'T'+(+x.ky.slice(5)); }), ['Cả năm'])], dong = function(ten, f){ var c = 0; return [ten].concat(X.ds.map(function(x){ if(!x.bd) return '—'; var v = f(x.bd); c += v; return v; }), [c]); };
  thg.push(dong('Vào', function(b){ return Object.keys(b.vao).length; }));
  TO_BD_NHOM.forEach(function(g){ thg.push(dong(g[1], function(b){ return toBDDem(b)[g[0]]; })); });
  thg.push(dong('Ra', function(b){ return b.ra.length; }));
  var ten = X.pv ? boDauTen(X.ten) : t.ma;
  if(cach==='excel') return xongTV.then(function(){ var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([[tieu], [X.ten || toTenToMa(t.ma)], [], ['BẢNG CHI TIẾT VÀO / RA']].concat([B.cot], B.aoa, [[B.tong], [], ['TỔNG THEO THÁNG']], thg)), 'Bien dong');
    taiXuongBlob(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Bien dong to vien '+ten+' '+X.nam+'.xlsx'); });
  var hT = '<table class="bc-bang"><thead><tr>'+thg[0].map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+thg.slice(1).map(function(r){ return '<tr>'+r.map(function(v, j){ return toO(coChuHTML(String(v)), j ? 'c' : ''); }).join('')+'</tr>'; }).join('')+'</tbody></table>';
  var h = toBDNamBangHTML(B, 'bc-bang')+'<div class="bc-khung"><div class="bc-khung-ten">Tổng theo tháng</div>'+hT+'</div>'+
    '<div class="bc-ghi">Vào: ngày vay đầu tiên (≈ ngày kết nạp); chuyển tổ ghi tháng. Ra: ≈ ngày giao dịch cuối trong Mẫu 31 tháng trước; chuyển tổ ghi tháng. Hộ mới = CIF lớn hơn mọi CIF tháng trước; CIF cũ dùng lại = CIF cũ, tháng trước không có.</div>';
  var trang = toHTMLIn([{tieuDe:tieu, ngay:toNgayChu(), html:h, ngang:B.cot.length>7}], t); if(cach==='html') return trang;
  inBlob(new Blob([trang], {type:'text/html'}), 'Bien dong to vien '+ten+'.html');
}
function toBDDem(B){ var d = {v:0, moi:0, cu:0, chuyen:0}; Object.keys(B.vao).forEach(function(k){ d.v++; d[B.vao[k].nhom||'chuyen']++; }); return d; }
function toBDChu(B){ B = B || TO_BD; if(!B) return ''; if(!B.co) return ' │ Biến động: chưa có Mẫu 31 '+toNgayDu(B.tr)+' để so';
  var d = toBDDem(B), nh = [d.moi ? 'hộ mới '+d.moi : '', d.cu ? 'CIF cũ dùng lại '+d.cu : '', d.chuyen ? 'chuyển tổ '+d.chuyen : ''].filter(Boolean).join(' · ');
  return ' │ Biến động '+toNgayDu(B.tr)+' → '+toNgayDu(B.ky)+': <b>+'+d.v+'</b> vào'+(nh ? ' ('+nh+')' : '')+' · <b>−'+B.ra.length+'</b> ra'; }   /* TO_TRUOC: số tháng trước (để tính mới vào / 105 tăng giảm) */
/* hạn CCCD (Luật Căn cước 2023): đổi khi đủ 14, 25, 40, 60 tuổi; cấp trong 2 năm trước mốc thì dùng đến mốc kế; từ 60 tuổi không hết hạn.
   CMND 9 số hết hiệu lực từ 01/01/2025. Thiếu ngày sinh / ngày cấp → chưa rõ. */
function toCCCDHan(so, ns, ncap){
  so = String(so||'').replace(/\D/g, ''); var hn = ngayISO(nay());
  if(!so) return {kq:'?', chu:'chưa có số'};
  if(so.length===9) return {kq:hn>='2025-01-01' ? 'het' : 'ok', den:'2025-01-01', chu:'CMND 9 số — hết hiệu lực từ 01/01/2025'};
  if(!ns || !ncap) return {kq:'?', chu:'thiếu ngày sinh / ngày cấp'};
  var y = +ns.slice(0,4), md = ns.slice(4), moc = [14, 25, 40, 60];
  for(var i=0;i<moc.length;i++){
    var den = (y+moc[i])+md, truoc2 = (y+moc[i]-2)+md;
    if(ncap < truoc2) return den<=hn ? {kq:'het', den:den, chu:'hết hạn từ '+ngayVNsl(den)+' (mốc '+moc[i]+' tuổi)'}
      : den<=ngayISO(new Date(nay().getTime()+30*864e5)) ? {kq:'sap', den:den, chu:'sắp hết hạn '+ngayVNsl(den)+' (mốc '+moc[i]+' tuổi, còn dưới 30 ngày)'} : {kq:'ok', den:den, chu:'còn hạn đến '+ngayVNsl(den)};   /* 3.161 (anh chốt): cảnh báo trước 30 ngày, tính theo ngày hiện tại */
  }
  return {kq:'ok', chu:'không thời hạn (cấp sau 58 tuổi)'};
}
/* tổ viên của tổ: gom theo khách + món còn nợ (gốc hoặc lãi) + cờ để lọc */
function toTV(t){
  var K = TO_K, ns = K.ngay, sau = kyLui(K.thang, 1), tu = sau+'-01', den = tdnCuoiKy(sau);
  var khd = {}; slKHD(K.B).forEach(function(o){ khd[o.ku] = 1; });
  var dat = function(s){ return /^0\d{9}$/.test(String(s||'').replace(/[\s.\-]/g, '')); };
  return toKhach(t).map(function(k){
    var rows = (K.kh[t.ma]||[]).filter(function(o){ return o.kh===k.kh; }), r0 = rows.find(function(o){ return o.cccd; }) || rows[0] || {};
    var mon = k.mon.filter(function(m){ return (m.dn||0)>0 || (m.qh||0)>0 || (m.kn||0)>0 || laiTon(m)>0; });
    var ct = []; mon.forEach(function(m){ var c = ctNgan(m.ct, m); if(ct.indexOf(c)<0) ct.push(c); });
    var sdt = (rows.find(function(o){ return o.sdt; })||{}).sdt || '';
    var tat = mon.length ? '' : rows.reduce(function(a, o){ return o.ku && o.ngdg && o.ngdg>a ? o.ngdg : a; }, '');   /* 3.128: ngày tất nợ ≈ ngày GD gần nhất của món đã tất toán */
    var bd = TO_BD && TO_BD.to===t.ma ? TO_BD : null;
    return {kh:k.kh, ten:k.ten, mon:mon, ct:ct.join(' · '), dn:k.dn, qh:k.qh, kn:k.kn, lt:k.lt, t105:k.t105, stk:k.stk, coTK:k.coTK, conNo:mon.length>0, chuaGN:!mon.length && k.mon.some(slKUChuaGN), tatNo:tat, vao:bd ? bd.vao[k.kh] || null : null,
      cccd:r0.cccd||'', cc:toCCCDHan(r0.cccd, r0.ns, r0.ncap), sdt:sdt, sdtDat:dat(sdt),
      khd:mon.some(function(m){ return khd[m.ku]; }), dhSau:mon.some(function(m){ return !(m.qh>0) && skNhomDH(m, tu, den, ns)>0; }),
      ns:r0.ns||'', ap:r0.tenThon||t.tenThon||'', smon:mon.length, qhkn:(k.qh||0)+(k.kn||0),   /* 3.163: cột thêm (tự hiện khi còn chỗ) */
      nvm:mon.reduce(function(a, m){ var d = m.nv || m.ngn || ''; return d>a ? d : a; }, ''), dhan:mon.reduce(function(a, m){ var d = (m.dn||0)>0 ? skHL(m) : ''; return d && (!a || d<a) ? d : a; }, '')};
  });
}
/* 3.132: chỉ tiêu 1 tổ cho bảng (tổ viên, có dư nợ, đề xuất cho ra, mới vào, dư nợ, QH, khoanh, thu nợ / lãi tháng, 105, 105 tăng giảm) */
function toSoTo(t, P){
  var coMoi = P && P.co, ks = toKhach(t), s = {tv:ks.length, co:0, ra:0, moi:0, mon:0, dn:0, qh:0, kn:0, t105:0, tn:0, tl:0, d105:null, lt:0, dhs:0, cch:0, ctk:0};
  var K = TO_K, sau = kyLui(K.thang, 1), tuS = sau+'-01', denS = tdnCuoiKy(sau), r0 = {};   /* 3.163: cột thêm Nợ lãi · món ĐH tháng sau · khách CCCD hết / sắp hết · khách chưa TK 105 */
  (K.kh[t.ma]||[]).forEach(function(o){ if(o.cccd && !r0[o.kh]) r0[o.kh] = o; });
  ks.forEach(function(k){ var no = k.mon.some(function(m){ return (m.dn||0)>0 || (m.qh||0)>0 || (m.kn||0)>0 || laiTon(m)>0; });
    if(no) s.co++; else if(!(k.t105>0)) s.ra++; s.mon += k.mon.filter(function(m){ return (m.dn||0)>0; }).length; s.dn += k.dn; s.qh += k.qh; s.kn += k.kn; s.t105 += k.t105;
    if(coMoi && P.kh[k.kh]!==t.ma) s.moi++;
    s.lt += k.lt||0; if(!k.stk.length && !k.coTK) s.ctk++; var r = r0[k.kh]; if(r){ var cc = toCCCDHan(r.cccd, r.ns, r.ncap); if(cc.kq==='het' || cc.kq==='sap') s.cch++; }
    k.mon.forEach(function(m){ if(!(m.qh>0) && (m.dn||0)>0 && skNhomDH(m, tuS, denS, K.ngay)>0) s.dhs++; });
    k.mon.forEach(function(m){ s.tn += (m.tnTH||0)+(m.tnQH||0)+(m.tnK||0); s.tl += (slSo(m.c_thu_lai_th_thang)||0)+(slSo(m.c_thu_lai_qh_thang)||0); }); });
  if(coMoi) s.d105 = s.t105-(P.t105[t.ma]||0);
  return s;
}
function toCongSo(a, s){ ['tv','co','ra','moi','mon','dn','qh','kn','t105','tn','tl','lt','dhs','cch','ctk'].forEach(function(f){ a[f] += s[f]||0; }); if(s.d105!==null) a.d105 += s.d105; if(s.soTo!==undefined) a.soTo += s.soTo; return a; }
function toSoMoi(){ return {tv:0, co:0, ra:0, moi:0, mon:0, dn:0, qh:0, kn:0, t105:0, tn:0, tl:0, d105:0, soTo:0, lt:0, dhs:0, cch:0, ctk:0}; }
/* 3.161 (anh chốt): bảng gọn — 1 đơn vị triệu đồng (số chẵn bỏ ",00", 0 để trống), kẻ ô mờ, cột vừa số liệu, ⚙ Cột chọn cột xem (nhớ);
   cột trùng bộ lọc tự ẩn (đã lọc 1 Hội → bỏ cột Hội; 1 điểm → bỏ cột Điểm GD); nút In / Excel ở đầu bảng; bảng cuộn trong khung (tiêu đề + dòng Cộng luôn thấy);
   In mặc định A4 dọc 10–11 cột, "In đầy đủ" A4 ngang; Excel đủ cột, số đồng. Mốc so sánh ghi đủ ngày/tháng/năm. */
function soTr(n, giu0){ var v = Math.round((n||0)/1e4)/100; if(!v) return giu0 ? '0' : ''; return v.toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2}); }   /* 3.163 (anh chốt theo biểu TW BCDHTD 01.1): triệu đồng luôn 2 số lẻ (3.679,00) cho thẳng cột */
function soTrDau(n){ var v = Math.round((n||0)/1e4)/100; return v ? (v>0 ? '+' : '−')+Math.abs(v).toLocaleString('vi-VN', {minimumFractionDigits:2, maximumFractionDigits:2}) : '0'; }
function toNgay31(ky){ var e = SLM.bang[slKhoa('hstd', ky)]; return e && e.ngay ? e.ngay : (String(ky).length>7 ? ky : tdnCuoiKy(String(ky).slice(0, 7))); }   /* ngày số liệu thật của Mẫu 31 kỳ đó */
function toNgayDu(ky){ return ngayVNsl(toNgay31(ky)); }
