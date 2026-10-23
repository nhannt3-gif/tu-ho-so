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
/* 3.326 (anh chốt 23/10): mở app = về Toàn PGD — địa bàn chỉ giữ trong phiên (PV_PHIEN); 📌 Ghim (chung mọi tab) = giữ địa bàn + kiểu cho lần mở sau (D.cauHinh.pvChung) */
var PV_PHIEN = {xa:'', diem:'', hoi:'', to:''};
function pvChungO(){ var c = D.cauHinh; if(!pvGhimCua()) return PV_PHIEN; if(!c.pvChung){ var t = c.toTK || {}, g = c.pvChung = {}; ['xa','diem','hoi','to'].forEach(function(f){ var d = Object.getOwnPropertyDescriptor(t, f); g[f] = (d && !d.get && d.value) || ''; }); } return c.pvChung; }
function pvGan(C){
  if(!C || (Object.getOwnPropertyDescriptor(C, 'xa')||{}).get) return C;
  ['xa','diem','hoi','to'].forEach(function(f){ Object.defineProperty(C, f, {enumerable:true, configurable:true, get:function(){ return pvChungO()[f]||''; }, set:function(v){ pvChungO()[f] = v||''; }}); });
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
   kỳ theo ngày chỉ giữ trong lần mở app (như 3.97); tab không có số liệu đúng kỳ thì dùng kỳ gần nhất và ghi rõ (kyGhiHTML)
   ngoại lệ (anh chốt): KTGS › Kế hoạch › In theo tháng kiểm tra lấy kỳ theo kế hoạch (3.141), không theo ô này ---------- */
function kyChungLay(){ var v = D.cauHinh.kyChung || ''; if(v.length>7 && KY_PHIEN.chung!==v) v = slThang(v); return v; }
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
    (Bm.co.dsto||[]).forEach(function(o){ var t = lay(o.to), co = !!t.diem; t.ds = o;   /* 3.145 (anh chốt Q16): DSTO là file bắt buộc → điền TRƯỚC Thông tin tổ trưởng (SĐT, tổ phó lấy theo DSTO) */
      toDien(t, o, [['diem','diem'],['tenDiem','tenDiem'],['tenXa','tenXa'],['tenThon','tenThon'],['ten','toTen'],['sdt','sdt'],['pho','phoTen']]);
      if(!t.dv && o.dvTen) t.dv = toDvTuTen(o.dvTen);
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
    var ngD = {}; Object.keys(T).forEach(function(ma){ var t = T[ma]; if(t.diem && t.ngayGD && !ngD[t.diem]) ngD[t.diem] = t.ngayGD; });
    Object.keys(T).forEach(function(ma){ var t = T[ma]; if(t.diem && !t.ngayGD && ngD[t.diem]) t.ngayGD = ngD[t.diem]; });   /* 3.108: DSTO không có ngày GDXA → theo mã điểm GD */
    Object.keys(T).forEach(function(ma){ var t = T[ma]; t.tenDiemDu = t.tenDiem ? String(t.tenDiem).trim()+(t.ngayGD ? ' · ngày '+t.ngayGD : '') : '(chưa rõ điểm GD)'; t.khoaDiem = t.diem || t.tenDiemDu; });
    /* 3.90: chỉ tiêu chuẩn TW của tổ — dòng LEN_31 TO_TRUONG cùng kỳ (ghép theo tên tổ trưởng trong xã) */
    var ltR = Bm && Bm.co.lt;
    if(ltR) twGhepTo(ltR, twToTu(K.hs, T)).forEach(function(g){ g.ma.forEach(function(m){ if(T[m]){ T[m].len = g.o; T[m].lenGop = g.ma.length; } }); });
    toDong0(K, Bm);   /* 3.145 (anh chốt): tổ dư nợ 0 */
    toTenChuan(K);   /* 3.108: tên tổ trưởng / tổ phó: bỏ "Ông / Bà", lấy dấu theo Mẫu 31, hoa đầu từ — 1 lần mỗi kỳ (TO_KS giữ sẵn) */
    TO_KS[ky] = K; slDung(ky); slBot(TO_KS);
    return tkNapMoi(K).then(function(){ return K; });   /* 3.201: Sao kê TK 104 / 105 — luôn lấy file mới nhất */
  });
}
/* 3.145 (anh chốt): tổ dư nợ 0 còn trên DSTO hoặc LEN_31 TO_TRUONG → vẫn là 1 tổ, ghi "cần đóng tổ"; không còn ở cả 2 → ẩn khỏi cây (vẫn tìm được) */
function toDong0(K, Bm){
  var T = K.to, xet = !!((Bm.co.dsto||[]).length || (Bm.co.lt||[]).length); K.toAn = {}; K.canDong = [];
  Object.keys(T).forEach(function(ma){ var t = T[ma]; if(toLaTT(t)) return;
    var dn = (K.kh[ma]||[]).reduce(function(a, o){ return a+(o.dn||0); }, 0); if(dn>0) return;
    if(t.ds || t.len){ t.canDong = true; K.canDong.push(ma); }
    else if(xet){ K.toAn[ma] = t; delete T[ma]; } });
}
function toDien(t, o, ds){ ds.forEach(function(f){ if(!t[f[0]] && o[f[1]]) t[f[0]] = o[f[1]]; }); }   /* điền trường còn trống của tổ từ 1 dòng dữ liệu */
function veToTK(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veToTK); return; }
  var C = toCH(), dsKy = toDsKy();
  if(!dsKy.length){ e.innerHTML = slTabConHTML()+'<div class="rong">Chưa có số liệu món vay. Nạp Mẫu 31 hoặc Mẫu 10 ở tab <b>📈 Số liệu</b> trước.</div>'; return; }
  toKyMacDinh(C, dsKy, 'to');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'… (bảng chưa có trong máy thì tải từ Drive)</div>';
  toNap(C.ky).then(function(K){ TO_K = K; if(nganHienTai===7 && D.cauHinh.slTab==='to') toVe(K, dsKy); })
    .catch(function(er){ var o = document.getElementById('tr7'); if(o && D.cauHinh.slTab==='to') o.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+'</div><div class="hang-nut"><button class="nho chinh" onclick="toThuLai()">⟳ Thử lại</button></div>'; });
}
function toThuLai(){ TO_K = null; TO_KS = {}; SL_BO = {}; TH_KS = {}; TO_MAP = {}; TO_BD = null; TO_BDT = null; TO_PVC = null; veSoLieu(); }
function toNoiDrive(){ noiDrive(false).then(function(co){ if(co) toThuLai(); }).catch(function(er){ baoLoi('Chưa nối được Drive: '+(er && er.message || er)); });
}
function toVe(K, dsKy){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = toCH();
  e.innerHTML = slTabConHTML()+kyGhiHTML(K)+'<div class="to-dau">'+
    '</div>'+   /* 3.157: ô 🔎 tìm tổ dời vào cuối hàng cây địa bàn (pvVeCay) */
    (K.thieuBang ? '<div class="sl-bao vang">⚠ Bảng số liệu '+coChuHTML(slKyChu(C.ky))+' <b>chưa có trên máy này</b> (lưu trên Drive nhưng chưa tải về — Drive chưa nối hoặc hết phiên). Cây tổ đang lấy tạm từ danh bạ; báo cáo cần bảng số liệu.'+
      '<div class="hang-nut"><button class="nho chinh" onclick="toNoiDrive()">☁ Nối Drive và tải</button><button class="nho" onclick="toThuLai()">⟳ Thử lại</button></div></div>' : '')+
    slNguonHTML(K.B)+'<div id="to-cay" class="to-cay pv-cay"></div><div id="to-the"></div>';
  toVeCay(); if(TO_Q) toTim();
}
/* ---------- 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ) ----------
   - mỗi nơi dùng 1 tiền tố p (to = tab Tổ, tc = Tra cứu KH, sk = Sao kê) + 1 đối tượng trạng thái {xa, diem, hoi, to}
   - dừng ở cấp nào thì lấy phạm vi cấp đó; Hội là bộ lọc (bỏ trống = mọi hội); tab Tổ bắt buộc chọn đến tổ
   - ô chọn theo phím chung (sgPhim nhận .pv-cay), đủ chỗ thì có chip; cấp chỉ 1 lựa chọn tự chọn; dữ liệu cây = PV_DUNG[p].K() */
var PV_CAP = [['xa','Xã / phường'],['diem','Điểm GD'],['hoi','Hội'],['to','Tổ']];
var PV_DUNG = {};
function pvLuaChon(T, S, cap, dc){   /* dc = chọn đa chiều (3.133, tab Tổ): Hội lọc độc lập — cả xã (chưa chọn điểm) hoặc toàn PGD */
  var ra = {};
  Object.keys(T||{}).forEach(function(m){
    var t = T[m];
    if(dc && cap==='hoi'){ if(S.xa && t.xa!==S.xa) return; if(S.diem && t.khoaDiem!==S.diem) return; }
    else if(dc && cap==='to'){ if(t.xa!==S.xa) return; if(S.diem && t.khoaDiem!==S.diem) return; }   /* 3.160: ③ Tổ theo Điểm GD hoặc Hội (chọn cái nào trước cũng được) */
    else {
    if(cap!=='xa' && t.xa!==S.xa) return;
    if((cap==='hoi' || cap==='to') && t.khoaDiem!==S.diem) return; }
    if(cap==='to' && S.hoi && String(t.dv||'')!==S.hoi) return;
    var k = cap==='xa' ? t.xa : cap==='diem' ? t.khoaDiem : cap==='hoi' ? String(t.dv||'') : t.ma;
    var chu = cap==='xa' ? (t.tenXa||t.xa) : cap==='diem' ? t.tenDiemDu : cap==='hoi' ? (String(t.dv)==='99' ? 'Trực tiếp' : (tdnHoi(t.dv)||'(chưa rõ hội)')) : (t.ten||'Tổ '+t.ma)+(t.canDong ? ' · ⚠ Dư nợ 0 — cần đóng tổ' : '')+(t.trucTiep ? ' · '+t.soMon+' món' : (t.tenThon ? ' · '+t.tenThon : ''));
    if(k===undefined || k===null) return;
    if(!ra[k]) ra[k] = {k:k, chu:String(chu), n:0, ap:cap==='to' ? String(t.tenThon||'') : ''}; if(!t.trucTiep) ra[k].n++;   /* 3.132: số tổ không tính vay trực tiếp */
  });
  return Object.keys(ra).map(function(k){ return ra[k]; }).sort(function(a, b){   /* 3.120 (anh chốt): tổ xếp theo ấp (số / tên ấp), cùng ấp theo tên tổ trưởng; không có ấp (trực tiếp) xuống cuối */
    if(cap==='to' && a.ap!==b.ap){ if(!a.ap) return 1; if(!b.ap) return -1; return ktApTen(a.ap).localeCompare(ktApTen(b.ap), 'vi', {numeric:true}); }
    return a.chu.localeCompare(b.chu, 'vi'); });
}
/* 3.163 (anh chốt): tên ấp ngắn cho chip tổ — ấp tên chữ bỏ "Ấp" / "KP" (Thuận An); ấp / KP tên là số giữ chữ (ấp 1, KP 2) */
function pvApNgan(ap){ var s = String(ap||'').trim(), m = s.match(/^(ấp|ap|thôn|khu phố|kp)\.?\s+(.+)$/i);
  if(m) return /^\d+[a-z]?$/i.test(m[2]) ? (/^(khu phố|kp)$/i.test(m[1]) ? 'KP ' : /^thôn$/i.test(m[1]) ? 'thôn ' : 'ấp ')+m[2] : m[2];
  return /^\d+[a-z]?$/i.test(s) ? 'ấp '+s : s; }
function pvCha(S, cap, dc){ return cap==='xa' ? true : cap==='diem' ? !!S.xa : (cap==='hoi' && dc) ? true : (cap==='to' && dc) ? !!(S.xa && (S.diem || S.hoi)) : !!S.diem; }   /* hội và tổ cần điểm GD · 3.133: tab Tổ chọn Hội không cần điểm */
function pvVeCay(p){
  var d = PV_DUNG[p], o = document.getElementById(p+'-cay'); if(!d || !o) return;
  var K = d.K(); if(!K) return;
  var S = d.S(), T = d.boTT ? pvBoTT(K.to) : K.to, dang = document.activeElement && document.activeElement.id, h = '', rong = window.innerWidth >= 700, bb = !!d.toBatBuoc;
  PV_CAP.forEach(function(c){   /* cấp chỉ có 1 lựa chọn → tự chọn (trừ hội, tổ); lựa chọn cũ không còn → bỏ */
    var ds = pvLuaChon(T, S, c[0], d.daChieu!==false);
    if(pvCha(S, c[0], d.daChieu!==false) && !S[c[0]] && ds.length===1 && (c[0]==='xa' || c[0]==='diem') && (bb || c[0]==='diem')) S[c[0]] = String(ds[0].k);
    if(S[c[0]] && !ds.some(function(x){ return String(x.k)===S[c[0]]; })) S[c[0]] = '';
  });
  /* 3.149 (anh chốt ý 6c): cây chọn 2 hàng — hàng 1: các cấp (ô chọn gọn, nối bằng ›); hàng 2: chip của cấp cần chọn tiếp (chọn tới tổ thì hết chip) */
  var trong = {xa:'Toàn PGD', diem:'— cả xã —', hoi:'Hội: tất cả', to:bb ? '— tất cả tổ —' : '— cả điểm GD —'}, h1 = '', tiep = null, dsTiep = null;
  PV_CAP.forEach(function(c){
    var ds = pvLuaChon(T, S, c[0], d.daChieu!==false), cha = pvCha(S, c[0], d.daChieu!==false), chon = S[c[0]];
    if(!cha && c[0]!=='hoi') return;
    if(!tiep && cha && !chon && c[0]!=='hoi' && ds.length>1){ tiep = c[0]; dsTiep = ds; }
    h1 += (h1 && c[0]!=='hoi' ? '<span class="pv-sep">›</span>' : '')+'<select id="'+p+'-'+c[0]+'" class="pv-o pv-'+c[0]+(chon ? ' co' : '')+'" title="'+c[1]+(c[0]==='hoi' ? ' (lọc)' : '')+'" onchange="pvChon(\''+p+'\',\''+c[0]+'\',this.value)"'+(cha ? '' : ' disabled')+'>'+
      '<option value="">'+trong[c[0]]+'</option>'+ds.map(function(x){ return '<option value="'+coChuHTML(String(x.k))+'"'+(String(x.k)===chon ? ' selected' : '')+'>'+coChuHTML(x.chu)+(c[0]!=='to' ? (x.n ? ' ('+x.n+' tổ)' : ' (vay trực tiếp)') : '')+'</option>'; }).join('')+'</select>';
  });
  /* 3.162 (anh chốt — tinh chỉnh 3.160): hàng 1 = Xã (luôn hiện, PGD / xã đang chọn tô xanh — bấm để quay lại / đổi) + 📍 đường dẫn chỉ báo (chip) + 🔎;
     hàng 2 = Điểm GD │ Hội (cùng 1 dòng, luôn hiện); hàng 3 = Tổ (khi có Điểm GD hoặc Hội): chip + ô sổ xuống đủ danh sách. Điện thoại: ô thả xuống như cũ. */
  var dc = d.daChieu!==false, chip = function(cap, k, nhan, n, tit, phu){ var v = String(k).replace(/'/g, "\\'"), bat = String(S[cap]||'')===String(k);
    return '<button class="to-chip'+(bat ? ' bat' : '')+'" onclick="pvChon(\''+p+'\',\''+cap+'\',\''+v+'\''+(k==='' ? '' : ',1')+')"'+(tit ? ' title="'+coChuHTML(tit)+'"' : '')+'>'+coChuHTML(nhan)+(n ? ' <small>'+n+'</small>' : '')+(phu ? ' <small class="pv-ap">'+coChuHTML(phu)+'</small>' : '')+'</button>'; };
  var toTit = function(x){ var t = T[x.k] || {}, kh = K.kh && K.kh[x.k], n = 0, da = {}; (kh||[]).forEach(function(o){ if(o.kh && !da[o.kh]){ da[o.kh] = 1; n++; } });   /* 3.163: rê chuột chip tổ */
      return x.chu.split(' · ')[0]+(x.ap ? ' · '+(/^(ấp|thôn|kp) /i.test(pvApNgan(x.ap)) ? pvApNgan(x.ap).replace(/^./, function(c){ return c.toUpperCase(); }) : 'Ấp '+pvApNgan(x.ap)) : '')+' · mã '+x.k+(kh ? ' · '+n+' tổ viên' : '')+(t.canDong ? ' · ⚠ dư nợ 0 — cần đóng tổ' : ''); };
  var chuTo = function(x){ return x.chu.split(' · ')[0]+(x.ap ? ' · '+pvApNgan(x.ap) : '')+((T[x.k]||{}).canDong ? ' · ⚠ cần đóng tổ' : ''); };
  var nhan = function(t){ return '<span class="pv-nhan">'+t+'</span>'; }, hh = '';
  var dsX = pvLuaChon(T, S, 'xa', dc), dsD = S.xa ? pvLuaChon(T, S, 'diem', dc) : [], dsH = pvLuaChon(T, S, 'hoi', dc).filter(function(x){ return !(d.boTT && x.k==='99'); }),
    dsT = pvCha(S, 'to', dc) ? pvLuaChon(T, S, 'to', dc) : [];
  var hXa = dsX.length>1 ? '<span class="pv-nhom cap-xa">'+nhan('Xã')+chip('xa', '', 'PGD', 0, 'Toàn PGD (mọi xã)')+dsX.map(function(x){ return chip('xa', x.k, x.chu, x.n); }).join('')+'</span>' : '';
  var hD = S.xa && dsD.length>1 ? '<span class="pv-nhom cap-diem">'+nhan('Điểm GD')+chip('diem', '', 'Cả xã')+dsD.map(function(x){ return chip('diem', x.k, x.chu, x.n); }).join('')+'</span>' : '';
  var hH = dsH.length>1 || S.hoi ? '<span class="pv-nhom cap-hoi">'+nhan('Hội')+chip('hoi', '', 'Tất cả')+dsH.map(function(x){ return chip('hoi', x.k, x.chu, x.n); }).join('')+'</span>' : '';
  /* 3.180 (anh chốt, tab Giao dịch xã — d.gonDiem): đã chọn Điểm GD → thu gọn hàng chip Xã / Điểm cho rộng; nút ▾ Đổi xã / điểm mở lại (chọn xong tự gọn) */
  /* 3.181: thu gọn cả khối (ẩn Xã · Điểm · Hội · Tổ, chỉ còn 📍 đường dẫn + 🔎) bằng lớp .gon — bấm ▾ Đổi để sổ ra; bấm vào vùng nhập thì gọn lại */
  /* 3.206 (anh chốt 14/10): mọi tab — đã chọn địa bàn thì có nút ▾ Mở rộng / ▴ Thu gọn (nhớ theo tab: D.cauHinh.pvGon[p]); gọn = 1 dòng 🏠 PGD › Xã › Điểm › Tổ (bấm từng mắt để về cấp đó) */
  /* 3.227 (anh 17/10): 📌 Ghim — ghim: khối lọc luôn mở; bỏ ghim: chọn xong tổ tự thu gọn còn 1 dòng; ⬆ Lên 1 cấp (Backspace) */
  /* 3.326 (anh chốt 23/10): 2 kiểu — ☰ Gọn (mặc định mọi nơi: 1 dòng ô sổ xuống Xã › Điểm › Hội › Tổ, ⬆ lên 1 cấp) · ▦ Chip (chip + ô sổ đủ danh sách như cũ); 📌 Ghim giữ địa bàn + kiểu khi mở lại app */
  var coChon = !!(S.xa || S.diem || S.hoi || S.to), ghim = pvGhimCua(p), gon = pvGonCua(p),
    nutGon = '<button class="nho pv-gon" onclick="pvGonDoi(\''+p+'\')" title="'+(gon ? 'Đổi sang kiểu chip (chọn bằng chip, đủ danh sách)' : 'Đổi sang kiểu gọn 1 dòng (ô sổ xuống từng cấp)')+'">'+(gon ? '▦ Chip' : '☰ Gọn')+'</button>'+
      (coChon ? '<button class="nho pv-len" onclick="pvLen(\''+p+'\')" title="Về 1 cấp (phím Backspace)">⬆<span class="pv-chu"> Lên 1 cấp</span></button>' : '')+
      '<button class="nho pv-ghim-nut'+(ghim ? ' bat' : '')+'" onclick="pvGhimDoi(\''+p+'\')" title="'+(ghim ? 'Đang ghim: mở lại app vẫn giữ địa bàn và kiểu đang chọn (mọi tab) — bấm để bỏ ghim' : 'Chưa ghim: mở lại app về Toàn PGD, kiểu gọn — bấm để ghim địa bàn và kiểu đang chọn')+'">📌'+(ghim ? ' Đã ghim' : '')+'</button>';
  if(hD || hH) hh += '<div class="pv-hang2 to-chips" data-cap="diem-hoi">'+hD+hH+'</div>';   /* 3.167 (anh chốt): Điểm GD và Hội 2 thanh riêng (bỏ vạch │) */
  if(dsT.length) hh += '<div class="pv-hang2 to-chips cap-to" data-cap="to">'+nhan('Tổ')+dsT.slice(0, 30).map(function(x){ return chip('to', x.k, x.chu.split(' · ')[0], 0, toTit(x), x.ap ? pvApNgan(x.ap) : ''); }).join('')+
    '<select class="pv-to-ds'+(S.to ? ' co' : '')+'" onchange="pvChon(\''+p+'\',\'to\',this.value)" title="Đủ danh sách tổ ('+dsT.length+')"><option value="">'+(dsT.length>30 ? 'Còn '+(dsT.length-30)+' tổ — chọn ▾' : 'Chọn tổ ▾')+'</option>'+
      dsT.map(function(x){ return '<option value="'+coChuHTML(String(x.k))+'"'+(String(x.k)===S.to ? ' selected' : '')+' title="'+coChuHTML(toTit(x))+'">'+coChuHTML(chuTo(x))+'</option>'; }).join('')+'</select></div>';
  /* 📍 đường dẫn — chỉ báo (không bấm) */
  var tenCua = function(cap, ds){ var x = ds.find(function(z){ return String(z.k)===String(S[cap]); }); return x ? x.chu.split(' · ')[0] : S[cap]; };
  var o1 = function(chu, ve){ return ve ? '<button class="pv-dan-o pv-ve" onclick="'+ve+'" title="Về '+coChuHTML(chu)+'">'+coChuHTML(chu)+'</button>' : '<span class="pv-dan-o">'+coChuHTML(chu)+'</span>'; };   /* 3.206: mắt đường dẫn bấm được → về cấp đó */
  var ve = function(cap){ return 'pvVe(\''+p+'\',\''+cap+'\')'; };
  var dsHall = pvLuaChon(T, S, 'hoi', dc), dsTall = S.to ? pvLuaChon(T, S, 'to', dc) : [];
  var giua = [S.diem ? o1('Điểm '+tenCua('diem', dsD), S.to ? ve('to') : '') : '', S.hoi ? o1(tenCua('hoi', dsHall), S.to ? ve('to') : '') : ''].filter(Boolean).join('<span class="pv-sep">·</span>');
  var nTo = Object.keys(T||{}).filter(function(m){ var t = T[m]; return !t.trucTiep && !toLaTT(t) && pvLoc(S, t); }).length;
  var dan = '<span class="pv-chip-o">'+slChipHTML()+'</span><span class="pv-dan">'+(S.xa ? o1('🏠 PGD', ve('xa'))+'<span class="pv-sep">›</span>'+o1(tenCua('xa', dsX), S.diem || S.hoi || S.to ? ve('diem') : '') : o1('🏠 Toàn PGD'))+(giua ? '<span class="pv-sep">›</span>'+giua : '')+(S.to ? '<span class="pv-sep">›</span>'+o1('Tổ '+tenCua('to', dsTall)) : '')+
    '<small class="pv-dem">'+nTo+' tổ'+(d.ghi ? ' · '+d.ghi() : '')+'</small></span>';
  var tim = p==='tc' ? '' : (function(){ var q = p==='to' ? TO_Q : p==='kt' ? KT_Q : (PV_Q[p]||''), ham = p==='to' ? 'TO_Q=this.value;toTim()' : p==='kt' ? 'KT_Q=this.value;ktTim()' : 'PV_Q[\''+p+'\']=this.value;pvTim(\''+p+'\')';
    return '<span class="pv-tim to-tim"><span>🔎</span><input id="'+p+'-tim" autocomplete="off" value="'+coChuHTML(q||'')+'" placeholder="Tìm tổ / tổ trưởng / ấp…" oninput="'+ham+'" onkeydown="if(event.key===\'Enter\'){var b=document.querySelector(\'#'+p+'-gy button\');if(b){event.preventDefault();b.click();}}"><div id="'+p+'-gy" class="pv-gy"></div></span>'; })();
  h = '<div class="loc-khoi'+(gon ? ' gon' : '')+'"><div class="pv-hang1'+(hXa ? ' cap-xa' : '')+'">'+hXa+'<span class="pv-sel"><span class="pv-ghim">📍</span>'+h1+'</span>'+dan+nutGon+tim+'</div>'+hh+'</div>';   /* 3.167 (anh chốt 11/10): khối LỌC ĐỊA BÀN, mỗi cấp 1 màu, đồng bộ mọi tab */
  o.innerHTML = h;
  if(dang){ var f = document.getElementById(dang); if(f) f.focus(); }
  setTimeout(slVua, 0);
  if(d.sau) d.sau();
}
/* 3.157: 🔎 tìm nhanh tổ cho tab không có ô tìm riêng (Sao kê, Tổng hợp) — chọn → tự điền Xã › Điểm › Hội › Tổ */
var PV_Q = {};
function pvTim(p){
  var d = PV_DUNG[p], g = document.getElementById(p+'-gy'); if(!d || !g) return; var K = d.K(); if(!K) return;
  var q = slChuan(PV_Q[p]||''); if(q.length<2){ g.innerHTML = ''; return; }
  var tu = q.split(' '), ds = Object.keys(K.to).map(function(k){ return K.to[k]; }).filter(function(t){
    if(toLaTT(t)) return false; var chu = ' '+slChuan([t.ma, t.ten, t.tenThon, t.tenXa, t.tenDiem].join(' ')); return tu.every(function(w){ return chu.indexOf(w)>=0; }); }).slice(0, 8);
  g.innerHTML = ds.length ? ds.map(function(t){ return '<button onclick="pvChonTo(\''+p+'\',\''+t.ma+'\')"><b>'+coChuHTML(t.ten||('Tổ '+t.ma))+'</b> <small>'+coChuHTML([t.ma, t.tenThon, t.tenXa, tdnHoi(t.dv)].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="rong">Không thấy tổ khớp “'+coChuHTML(PV_Q[p])+'”.</div>';
}
var PV_MO = {};   /* 3.160: cấp đang mở lại để đổi (bấm tên trên dòng 📍) */
/* 3.326: 📌 Ghim chung mọi tab (địa bàn đã dùng chung) — D.cauHinh.pvGhimBat; kiểu theo nơi: ghim → D.cauHinh.pvKieu[p], chưa ghim → chỉ trong phiên (PV_KIEU) */
var PV_KIEU = {};
function pvGhimCua(){ return !!(D.cauHinh && D.cauHinh.pvGhimBat); }
function pvGhimDoi(p){ var c = D.cauHinh, g = !pvGhimCua(), cu = pvChungO(), kieu = pvKieuBang();
  c.pvGhimBat = g;
  if(g){ c.pvChung = {xa:cu.xa||'', diem:cu.diem||'', hoi:cu.hoi||'', to:cu.to||''}; c.pvKieu = JSON.parse(JSON.stringify(kieu)); }
  else { PV_PHIEN = {xa:cu.xa||'', diem:cu.diem||'', hoi:cu.hoi||'', to:cu.to||''}; PV_KIEU = JSON.parse(JSON.stringify(kieu)); }
  PV_MO[p] = ''; luu(); pvVeCay(p); bao(g ? '📌 Đã ghim — mở lại app vẫn giữ địa bàn và kiểu đang chọn (mọi tab).' : 'Bỏ ghim — mở lại app về Toàn PGD, kiểu gọn.'); }
function pvKieuBang(){ return pvGhimCua() ? (D.cauHinh.pvKieu = D.cauHinh.pvKieu || {}) : PV_KIEU; }
function pvVe(p, cap){ pvChon(p, cap, ''); }   /* 3.326: bấm mắt đường dẫn / ⬆ = về cấp đó (kiểu giữ nguyên) */
function pvLen(p){ var d = PV_DUNG[p]; if(!d) return false; var S = d.S(), cap = S.to ? 'to' : S.hoi ? 'hoi' : S.diem ? 'diem' : S.xa ? 'xa' : ''; if(!cap) return false; pvVe(p, cap); return true; }
document.addEventListener('keydown', function(e){   /* 3.227: Backspace (không ở ô nhập, không mở hộp) = ⬆ Lên 1 cấp ở khối lọc đang hiện */
  if(e.key!=='Backspace' || e.ctrlKey || e.altKey || e.metaKey || e.defaultPrevented) return;
  var a = e.target; if(a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) return;
  var hop = document.getElementById('hop'); if(hop && hop.classList.contains('hien')) return;
  var p = Object.keys(PV_DUNG).find(function(k){ var o = document.getElementById(k+'-cay'); return o && o.offsetParent; });
  if(p && pvLen(p)) e.preventDefault();
});
function pvGonCua(p){ return pvKieuBang()[p]!=='chip'; }   /* 3.326 (anh chốt 23/10): mặc định kiểu gọn mọi nơi */
function pvGonDoi(p){ pvKieuBang()[p] = pvGonCua(p) ? 'chip' : 'gon'; PV_MO[p] = ''; if(pvGhimCua()) luu(); pvVeCay(p); }
function pvMo(p, cap){ PV_MO[p] = PV_MO[p]===cap ? '' : cap; pvVeCay(p); }
function pvChonTo(p, ma){
  var d = PV_DUNG[p], K = d && d.K(), t = K && K.to[ma]; if(!t) return;
  var S = d.S(); S.xa = t.xa||''; S.diem = t.khoaDiem; S.hoi = String(t.dv||''); S.to = ma; PV_Q[p] = ''; PV_MO[p] = '';
  luu(); pvVeCay(p);
}
function pvBoTT(T){ var r = {}; Object.keys(T||{}).forEach(function(m){ if(!toLaTT(T[m])) r[m] = T[m]; }); return r; }   /* 3.107: tab KTGS Hội kiểm tra theo tổ → cây bỏ mục vay trực tiếp */
function pvChon(p, cap, v, chip){
  var d = PV_DUNG[p]; if(!d) return;
  var S = d.S(), i = PV_CAP.map(function(c){ return c[0]; }).indexOf(cap);
  v = String(v||''); if(chip && S[cap]===v) v = '';   /* bấm lại chip đang chọn = bỏ chọn */
  PV_MO[p] = '';
  S[cap] = v; for(var j=i+1;j<PV_CAP.length;j++){ if(PV_CAP[j][0]==='hoi' && (d.daChieu!==false || (cap!=='xa' && cap!=='diem'))) continue; S[PV_CAP[j][0]] = ''; }   /* 3.133: tab Tổ đổi xã / điểm giữ Hội (Hội không có ở phạm vi mới thì cây tự bỏ) */
  luu(); pvVeCay(p);
}
/* dòng / tổ có nằm trong phạm vi không (t = thông tin tổ; dòng không có tổ chỉ thuộc phạm vi Toàn PGD) */
function pvLoc(S, t){
  if(!S.xa) return !S.hoi || (!!t && String(t.dv||'')===S.hoi); if(!t) return false;   /* 3.133: Hội toàn PGD (chỉ tab Tổ chọn được Hội khi chưa chọn xã) */
  if(t.xa!==S.xa) return false; if(S.diem && t.khoaDiem!==S.diem) return false;
  if(S.hoi && String(t.dv||'')!==S.hoi) return false; if(S.to && t.ma!==S.to) return false;
  return true;
}
function pvChu(S, K){
  var hoiTen = function(h){ return String(h)==='99' ? 'Vay trực tiếp' : (tdnHoi(h)||'Hội '+h); };
  if(!S.xa) return 'Toàn PGD'+(S.hoi ? ' · '+hoiTen(S.hoi) : '');
  var T = (K && K.to) || {}, mot = function(f, v){ var k = Object.keys(T).find(function(m){ return String(T[m][f]||'')===v; }); return k ? T[k] : {}; };
  var r = [mot('xa', S.xa).tenXa || S.xa];
  if(S.diem){ var td = mot('khoaDiem', S.diem); r.push('Điểm '+(td.tenDiemDu||S.diem)); }
  if(S.hoi) r.push(hoiTen(S.hoi)+(S.diem ? '' : ' (cả xã)'));
  if(S.to){ var tt = T[S.to] || {}; r.push('Tổ '+(tt.ten||S.to)); }
  return r.join(' · ');
}
SG_CAY['to-xa'] = 'Xã / phường'; SG_CAY['to-diem'] = 'Điểm giao dịch';
PV_DUNG.to = {S:function(){ return toCH(); }, K:function(){ return TO_K; }, sau:function(){ toVeThe(); }, toBatBuoc:true, daChieu:true};   /* 3.133: chọn đa chiều chỉ ở tab Tổ (anh chốt) */
PV_DUNG.kt = {S:function(){ return ktCH(); }, K:function(){ return KT_K; }, sau:function(){ ktVeThe(); }, toBatBuoc:true, boTT:true};   /* 3.93: tab KTGS Hội */
/* ---------- 3.92: VAY TRỰC TIẾP (anh Nhân: món không mã tổ — GQVL hội người mù, XKLD… — vẫn có xã, điểm GD cụ thể) ----------
   mỗi xã + điểm GD có món trực tiếp → 1 mục giả trong cây (mã TT…, hội 99 "Trực tiếp", tên "Vay trực tiếp (không qua tổ)");
   điểm GD suy từ XÃ + NGÀY GDXA (mỗi điểm trong xã có ngày GD riêng; thôn không dùng được vì 19/59 thôn có tổ thuộc 2 điểm).
   Không đổi o.to của dữ liệu (kiểm tra vẫn thấy món không tổ) — chỉ gắn o._tt; tra tổ của 1 dòng dùng toMaCua(o). */
var TO_GIA = '0000000';
function toMaCua(o){ return (o && o.to && o.to!==TO_GIA) ? o.to : ((o && o._tt) || ''); }
function toLaTT(t){ return !!(t && t.trucTiep); }
function toGanTrucTiep(K, Bm){
  /* 3.107: điểm GD của món vay trực tiếp: ① ấp của món (danh mục địa bàn / tổ cùng ấp) → ② ngày GDXA trùng tổ cùng xã → ③ xã chỉ có 1 điểm GD */
  var T = K.to, KH = K.kh, diem = {}, ap = {}, xa = {}, ku = {};
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.trucTiep || !t.xa || !t.diem) return;
    if(t.ngayGD){ var k = t.xa+'|'+(+t.ngayGD); if(!diem[k]) diem[k] = t; }
    if(t.thon){ var a = ap[t.xa+'|'+t.thon] = ap[t.xa+'|'+t.thon] || {}; a[t.diem] = a[t.diem] || {n:0, t:t}; a[t.diem].n++; }
    var x = xa[t.xa] = xa[t.xa] || {}; if(!x[t.diem]) x[t.diem] = t; });
  var nhieu = function(a){ var tot = null; Object.keys(a||{}).forEach(function(k){ if(!tot || a[k].n>tot.n) tot = a[k]; }); return tot && tot.t; };
  var theoAp = function(o){ var g = null; if(!o.thon) return null;
    (D.cauHinh.diaBan||[]).forEach(function(x){ if(g || (x.ma && String(x.ma)!==String(o.xa))) return;
      (x.diem||[]).forEach(function(z){ if(!g && (z.ap||[]).some(function(a){ return String(a.ma)===String(o.thon); })){ var c = Object.keys(T).map(function(m){ return T[m]; }).find(function(t){ return !t.trucTiep && t.xa===o.xa && String(t.diem)===String(z.ma); }); g = c || {diem:z.ma, tenDiem:z.ten, ngayGD:''}; } }); });
    return g || nhieu(ap[o.xa+'|'+o.thon]); };
  (K.hs||[]).forEach(function(o){
    if(o.to || !o.ku || !o.xa) return;
    var mot = Object.keys(xa[o.xa]||{}), d = theoAp(o) || diem[o.xa+'|'+(+(o.ngayGD||0))] || (mot.length===1 ? xa[o.xa][mot[0]] : null), ma = 'TT'+o.xa+'_'+(d ? String(d.diem||d.tenDiem) : 'd'+(o.ngayGD||''));
    var t = T[ma] = T[ma] || {ma:ma, trucTiep:true, xa:o.xa, tenXa:o.tenXa||'', dv:'99', ten:'Vay trực tiếp (không qua tổ)', diem:d ? d.diem : '', tenDiem:d ? d.tenDiem : '', ngayGD:d ? d.ngayGD : (o.ngayGD||''), soMon:0};
    if((o.dn||0)>0 || (o.qh||0)>0 || laiTon(o)>0) t.soMon++;   /* món còn lãi = chưa tất toán (anh chốt) */
    (KH[ma] = KH[ma] || []).push(o); o._tt = ma; ku[o.ku] = ma;
  });
  ['nqh','nk','khd'].forEach(function(L){ ((Bm && Bm.co[L])||[]).forEach(function(o){ if(!o.to && ku[o.ku]) o._tt = ku[o.ku]; }); });
}
function toVeCay(){ pvVeCay('to'); }
function toChonTo(ma){
  var t = TO_K && TO_K.to[ma]; if(!t){ var an = TO_K && TO_K.toAn && TO_K.toAn[ma]; if(an) bao('Tổ '+(an.ten||ma)+' (mã '+ma+'): dư nợ 0 và không còn trên Danh sách tổ / LEN_31 TO_TRUONG kỳ này — đã ẩn khỏi cây tổ.', 6); return; }
  var C = toCH(); C.xa = t.xa||''; C.diem = t.khoaDiem; C.hoi = String(t.dv||''); C.to = ma;
  TO_Q = ''; var i = document.getElementById('to-tim'); if(i) i.value = '';
  var g = document.getElementById('to-gy'); if(g) g.innerHTML = '';
  luu(); pvVeCay('to');
}
function toTim(){
  var g = document.getElementById('to-gy'); if(!g || !TO_K) return;
  var q = slChuan(TO_Q); if(q.length<2){ g.innerHTML = ''; return; }
  var an = TO_K.toAn || {}, tu = q.split(' '), ds = Object.keys(TO_K.to).map(function(k){ return TO_K.to[k]; }).concat(Object.keys(an).map(function(k){ return an[k]; })).filter(function(t){
    var chu = ' '+slChuan([t.ma, t.ten, t.tenThon, t.tenXa, t.tenDiem].join(' ')); return tu.every(function(w){ return chu.indexOf(w)>=0; }); }).slice(0, 12);
  g.innerHTML = ds.length ? ds.map(function(t){ return '<button onclick="toChonTo(\''+t.ma+'\')"><b>'+coChuHTML(t.ten||('Tổ '+t.ma))+'</b>'+(an[t.ma] ? ' <small class="do">· dư nợ 0, không còn trên DSTO / LEN_31 — đã ẩn</small>' : t.canDong ? ' <small class="do">· ⚠ cần đóng tổ</small>' : '')+' <small>'+coChuHTML([t.ma, t.tenThon, t.tenXa, tdnHoi(t.dv)].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="rong">Không thấy tổ khớp “'+coChuHTML(TO_Q)+'”.</div>';
}
/* 3.92: tổ đang chọn → thẻ gọn + danh sách tổ viên có lọc + báo cáo; chưa chọn tổ (đã chọn xã) → bảng các tổ trong phạm vi */
function toVeThe(){
  var o = document.getElementById('to-the'); if(!o) return;
  var C = toCH(), t = TO_K && TO_K.to[C.to];
  if(!t){   /* 3.132 (anh chốt): chưa chọn tổ → dòng tóm tắt + chip của cả phạm vi (Hội / điểm GD / xã / PGD); mặc định bảng các tổ (PGD: bảng theo xã, điểm GD) */
    o.innerHTML = toPVHTML(C);
    var khoa = [TO_K.ky, C.xa, C.diem, C.hoi].join('|');
    Promise.all([toTruocNap(), toBDTNap()]).then(function(){ var x = document.getElementById('to-the'), C2 = toCH(); if(x && !C2.to && [TO_K.ky, C2.xa, C2.diem, C2.hoi].join('|')===khoa && !(TO_PVC && TO_PVC.khoa.slice(-2)==='|1' && TO_PVC.K===TO_K && TO_PVC.ve)) { x.innerHTML = toPVHTML(C2); if(TO_PVC) TO_PVC.ve = 1; } });
    return;
  }
  if(!(TO_BD && TO_BD.to===t.ma && TO_BD.ky===TO_K.ky)){ TO_BD = null; toBDNap(t).then(function(){ var C2 = toCH(); if(C2.to===t.ma && document.getElementById('to-the')) toVeThe(); }); }   /* 3.128 */
  var tv = toTV(t);
  o.innerHTML = '<div class="to-bc to-bc-dau"><span class="nhan-nhom">Báo cáo của tổ</span>'+TO_BC.map(function(b){   /* 3.169 (anh 11/10): đem lên đầu khung xem (trước khuất dưới bảng) */
      return '<label class="to-bc-dong"><input type="checkbox"'+(C.bc && C.bc[b.k] ? ' checked' : '')+' onchange="toCH().bc[\''+b.k+'\']=this.checked;luu()"> '+coChuHTML(b.ten)+'</label>'; }).join('')+
    '<button class="nho chinh" onclick="toXem()">👁 Xem</button></div>'+toTheHTML(t, tv)+toDsTVHTML(t, tv);
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
      x.dn += o.dn||0; if(o.ku) x.lt += laiTon(o); if((o.t105||0)>x.t105) x.t105 = o.t105; var d = o.nv || o.ngn || ''; if(d && (!x.nv || d<x.nv)) x.nv = d; });
    (B.lap||[]).forEach(function(o){ var x = M[o.kh]; if(x && (o.t105||0)>x.t105) x.t105 = o.t105; });
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
/* 3.161: nhãn CCCD + cảnh báo khi in (anh chốt): tất nợ còn TK 105 · CCCD hết hạn / sắp hết hạn (30 ngày) · khách còn mã tổ chưa có TK 105 → in đậm + cột Lưu ý */
function toChipKhung(xem, tv, mo, bien, B){   /* 3.161 (anh chốt): chip gom 3 nhóm Xem · Khách · Cần xử lý, tối đa 2 dòng (dư → ⋯ thêm) */
  var g = {kh:'', xl:''};
  TO_LOC.forEach(function(l){ if(l[4]) return; if(l[0]==='tvra' && !TO_TV_MA) return; var n = l[0]==='rk' ? (B && B.co ? B.ra.length : 0) : l[0]==='tvra' ? (tvRaCuaTo(TO_TV_MA)||[]).length : tv.filter(l[2]).length;
    g[TO_LOC_NHOM[l[0]]||'kh'] += '<button class="to-loc '+l[3]+(l[0]===mo ? ' bat' : '')+(n || l[0]==='tat' ? '' : ' mo0')+'" onclick="'+bien+'=\''+l[0]+'\';toVeThe()">'+coChuHTML(toLocNhan(l))+' <b>'+n+'</b></button>'; });
  var nh = function(ten, h){ return h ? '<span class="to-nhom"><span class="to-nhom-ten">'+ten+'</span>'+h+'</span>' : ''; };
  return '<div class="to-loc-hang to-chip-khung">'+nh('Xem', xem)+nh('Khách', g.kh)+nh('Cần xử lý', g.xl)+'</div>';
}
function toChipGon(){   /* quá 2 dòng → chip cuối mỗi nhóm (trừ chip đầu / đang chọn) gom vào ⋯ thêm */
  var k = document.querySelector('#to-the .to-chip-khung'); if(!k || window.innerWidth<700) return;
  var ds = Array.prototype.slice.call(k.querySelectorAll('button.to-loc')); if(!ds.length) return;
  var dong = function(){ var t = []; ds.forEach(function(b){ if(b.parentNode && b.offsetParent && t.indexOf(b.offsetTop)<0) t.push(b.offsetTop); }); return t.sort(function(a, b){ return a-b; }); };
  if(dong().length<=2) return;
  var menu = document.createElement('details'); menu.className = 'to-them'; menu.innerHTML = '<summary class="to-loc">⋯ thêm</summary><div class="to-them-ds"></div>'; k.appendChild(menu);
  var dsM = menu.querySelector('.to-them-ds'), bo = ds.filter(function(b){ return !b.classList.contains('bat') && b.previousElementSibling && b.previousElementSibling.classList.contains('to-loc'); }).reverse();
  for(var i=0;i<bo.length && dong().length>2;i++) dsM.insertBefore(bo[i], dsM.firstChild);
  menu.querySelector('summary').textContent = '⋯ thêm '+dsM.children.length;
}
function toCCNhan(k){ return k.cc.kq==='het' ? 'Hết hạn' : k.cc.kq==='sap' ? 'Sắp hết hạn' : k.cc.kq==='ok' ? 'Còn hạn' : 'Chưa rõ'; }
function toCCLop(k){ return k.cc.kq==='het' ? 'het' : k.cc.kq==='sap' ? 'sap' : k.cc.kq==='ok' ? 'ok' : ''; }
function toCCHTML(k){ return '<span class="to-cc '+toCCLop(k)+'" title="'+coChuHTML(k.cccd+' — '+k.cc.chu)+'">'+toCCNhan(k)+'</span>'; }
function toCanh(k){
  var r = [];
  if(!k.conNo && !k.chuaGN && (k.stk.length || k.coTK || k.t105>0)) r.push('Tất nợ – còn TK 105');
  if(k.cc.kq==='het') r.push('CCCD hết hạn'+(k.cc.den ? ' '+ngayVNsl(k.cc.den) : ''));
  else if(k.cc.kq==='sap') r.push('CCCD sắp hết hạn '+ngayVNsl(k.cc.den));
  if(!k.stk.length && !k.coTK) r.push('Chưa có TK 105');
  return r;
}
function toCanhTong(ds){ var d = [0, 0, 0, 0]; ds.forEach(function(k){ var c = toCanh(k).join('|'); if(/Tất nợ/.test(c)) d[0]++; if(/CCCD hết/.test(c)) d[1]++; if(/CCCD sắp/.test(c)) d[2]++; if(/Chưa có TK/.test(c)) d[3]++; });
  var t = [d[0] ? d[0]+' khách tất nợ còn TK 105' : '', d[1] ? d[1]+' CCCD hết hạn' : '', d[2] ? d[2]+' CCCD sắp hết hạn (30 ngày)' : '', d[3] ? d[3]+' chưa có TK 105' : ''].filter(Boolean);
  return t.length ? '<div class="bc-canh-tong"><b>Lưu ý ('+ngayVNsl(ngayISO(nay()))+'):</b> '+t.join(' · ')+'. Các dòng in đậm là khách cần lưu ý.</div>' : ''; }
var TO_105_CB = 100000;   /* 3.137 (anh chốt): tất nợ mà TK 105 còn trên 100.000 đ → tô màu cảnh báo */
function toXen(ds){ var n = 0, tr = null; return ds.map(function(k){ if(k.to && k.to!==tr){ if(tr) n++; tr = k.to; } return n%2 ? ' class="to-xen"' : ''; }); }   /* 3.137 (anh chốt): không tô màu sặc sỡ — nền nhạt xen kẽ theo tổ để phân biệt tổ */
function to105(k, html){ var v = tdnTien(k.t105); return !k.conNo && k.t105>TO_105_CB ? (html ? '<b>'+v+'</b>' : v) : v; }   /* tất nợ còn 105 trên 100.000 đ: in đậm số */
function toGoiY(k){ if(!k.conNo && k.chuaGN) return 'Chưa giải ngân'; return k.conNo ? (!(k.dn>0) && k.lt>0 ? 'Còn lãi — chưa tất nợ' : '') : (k.t105>0 ? 'Chờ vay lại' : 'Cho ra'); }   /* 3.137 (anh chốt): chữ ngắn cho cột hẹp */
function toTheHTML(t, tv){
  var dn = 0, qh = 0, kn = 0, t105 = 0, co = 0;
  tv.forEach(function(k){ dn += k.dn; qh += k.qh; kn += k.kn; t105 += k.t105; if(k.conNo) co++; });
  var dem = function(f){ return tv.filter(f).length; }, N = toNguong();
  var len = '';
  if(t.len){ var L1 = t.len; len = ' │ LEN_31: '+tdnTien(L1.ho||0)+' hộ · '+tdnTr(L1.dn)+' · tiền gửi '+tdnTr(L1.tg)+' · cho vay / thu nợ '+tdnTr(L1.cv)+' / '+tdnTr(L1.tn)+' · thu lãi '+tdnTr(L1.tl)+(t.lenGop>1 ? ' (gộp '+t.lenGop+' tổ trùng tên)' : ''); }
  return '<div class="to-the">'+
    '<div class="to-the-ten">'+(toLaTT(t) ? '<b>Vay trực tiếp (không qua tổ)</b>' : 'Tổ <b>'+coChuHTML(t.ten||'')+'</b> (mã '+t.ma+')')+' <span class="to-the-phu">· '+coChuHTML(toDiaChi(t))+'</span>'+(t.canDong ? ' <span class="to-dong0" title="Tổ dư nợ 0 nhưng còn trên '+(t.ds ? 'DSTO' : 'LEN_31 TO_TRUONG')+' — làm thủ tục đóng tổ">⚠ Dư nợ 0 — cần đóng tổ</span>' : '')+'</div>'+
    '<div class="to-the-so"><b>'+tv.length+'</b> '+(toLaTT(t) ? 'khách' : 'tổ viên')+': <b>'+co+'</b> có dư nợ · <b>'+dem(toLocHam('ko105'))+'</b> không dư nợ còn 105 · <b class="do">'+dem(toLocHam('ra'))+'</b> đề xuất cho ra · <b class="do">'+dem(toLocHam('cccd'))+'</b> CCCD hết hạn'+
      ' │ dư nợ <b>'+tdnTr(dn)+'</b> · QH <b>'+(qh ? tdnTr(qh) : 0)+'</b> · khoanh <b>'+(kn ? tdnTr(kn) : 0)+'</b> · 105 <b>'+tdnTr(t105)+'</b>'+
      (N.max && !toLaTT(t) ? ' │ còn nhận thêm <b>'+Math.max(0, N.max-tv.length)+'</b> tổ viên (tối đa '+N.max+')' : '')+(toLaTT(t) ? '' : toBDChu())+coChuHTML(len)+'</div></div>';
}
function toNguong(){ var n = D.cauHinh.toNguong || {}; return {min:+n.min||0, max:+n.max||0}; }
function toDatNguong(){
  var N = toNguong();
  moHop('<div class="hop-tit">⚙ Ngưỡng tổ viên của tổ TK&VV</div><div class="hop-phu">Dùng để tô tổ quá ít / quá đông và tính "còn nhận thêm". Để trống = không dùng.</div>'+
    '<div class="hang-nut"><label>Tối thiểu <input id="tn-min" type="number" min="0" style="width:70px" value="'+(N.min||'')+'"></label><label>Tối đa <input id="tn-max" type="number" min="0" style="width:70px" value="'+(N.max||'')+'"></label></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="D.cauHinh.toNguong={min:document.getElementById(\'tn-min\').value,max:document.getElementById(\'tn-max\').value};luu();dongHop();toVeThe()">Lưu</button></div>', true);
}
function toKyKQ(K){ return K.ky.length>7 ? 'Số liệu ngày '+ngayVNsl(K.ky)+' (Mẫu 31 '+slKyChu((K.B && K.B.nguon && K.B.nguon.hstd) || K.ky)+')' : 'Kết quả giao dịch tháng '+kyVN(K.thang)+' (Mẫu 31)'; }   /* 3.136 */
function toLocNhan(l){ return (l[0]==='moi' || l[0]==='rk') && TO_K ? l[1]+' '+(TO_K.ky.length>7 ? ngayVNsl(TO_K.ky).slice(0, 5) : kyVN(TO_K.thang).replace(/\/\d{4}$/, '')) : l[1]; }   /* 3.128 */
function toNgayCot(mo){ mo = mo || TO_LOC_MO; return mo==='dh' ? 'ĐH theo HĐ (gia hạn)|ĐH theo GDXA · ghi chú' : mo==='moi' ? 'Ngày kết nạp (≈ ngày vay) · từ đâu' : mo==='ko105' || mo==='ko' || mo==='ra' ? 'Ngày tất nợ' : ''; }
/* 3.138 (anh chốt): chip Đến hạn tháng sau — mỗi món: ĐH theo HĐ (gia hạn nếu có) + ĐH theo GDXA, ghi rõ vì sao chưa chuyển QH */
function toDHMon(k){
  var K = TO_K, sau = kyLui(K.thang, 1), tu = sau+'-01', den = tdnCuoiKy(sau), ns = K.ngay, nhieu = k.mon.length>1;
  return k.mon.filter(function(m){ return !(m.qh>0) && (m.dn||0)>0; }).map(function(m){ var n = skNhomDH(m, tu, den, ns); if(!n) return null;
    var hl = skHL(m), gd = m.dhgd || '', ct = nhieu ? ctNgan(m.ct, m)+': ' : '';
    var ghi = n===1 ? 'đã quá ĐH HĐ — chưa chuyển QH do ngày GD xã' : n===3 ? 'ĐH HĐ T'+hai(+hl.slice(5, 7))+', chuyển QH ngày '+ngayVNsl(gd).slice(0, 5) : (gd && gd>hl ? 'chuyển QH ngày '+ngayVNsl(gd).slice(0, 5) : '');
    return {hd:ct+ngayVNsl(hl)+(m.dhgh && m.dhgh!==m.dhg ? ' (gia hạn)' : ''), gd:ct+(gd ? ngayVNsl(gd) : 'chưa có')+(ghi ? ' — '+ghi : '')}; }).filter(Boolean);
}
function toNgayGT(k, mo){ mo = mo || TO_LOC_MO; if(mo==='dh'){ var L = toDHMon(k); return [L.map(function(x){ return x.hd; }).join('; '), L.map(function(x){ return x.gd; }).join('; ')]; } return [toNgayO(k, mo)]; }
function toNgayH(nc){ return nc ? nc.split('|') : []; }
function toNgayTh(nc){ return toNgayH(nc).map(function(x){ return '<th>'+x+'</th>'; }).join(''); }
function toNgayO(k, mo){ if((mo || TO_LOC_MO)==='moi') return k.vao ? (k.vao.ngay ? ngayVNsl(k.vao.ngay) : '—')+' · '+k.vao.tu : '';
  if(!k.conNo && k.chuaGN) return 'chưa giải ngân';   /* 3.138 */
  return !k.conNo ? (k.tatNo ? ngayVNsl(k.tatNo) : 'trước '+String(TO_K.thang).slice(0, 4)) : ''; }
function toRaHTML(){   /* 3.128: chip Ra khỏi tổ — khách có trong tổ tháng trước, tháng này không còn */
  var B = TO_BD; if(!B || !B.co) return '<div class="rong">Chưa có Mẫu 31 '+(B ? toNgayDu(B.tr) : 'tháng trước')+' để so — nạp Mẫu 31 tháng trước để biết ai ra khỏi tổ.</div>';
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Dư nợ '+toNgayDu(B.tr)+'</th><th>Nợ lãi '+toNgayDu(B.tr)+'</th><th>Số dư 105 '+toNgayDu(B.tr)+'</th><th>Đi đâu</th></tr></thead><tbody>'+
    (B.ra.map(function(r, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+r.kh+'</td><td class="to-ten">'+coChuHTML(r.ten)+'</td><td class="s">'+tdnTien(r.dn)+'</td><td class="s">'+(r.lt>0 ? tdnTien(r.lt) : '')+'</td><td class="s">'+tdnTien(r.t105)+'</td><td>'+coChuHTML(r.di)+'</td></tr>'; }).join('')
      || '<tr><td colspan="7" class="rong">Không có khách ra khỏi tổ trong tháng.</td></tr>')+'</tbody></table></div>';
}
function toDsTVHTML(t, tv){
  var f = (TO_LOC.find(function(l){ return l[0]===TO_LOC_MO; }) || TO_LOC[0])[2], ds = tv.filter(f), nc = toNgayCot();
  if(TO_LOC_MO==='ko105' || TO_LOC_MO==='ra') TO_LOC_MO = 'ko';
  TO_TV_MA = toLaTT(t) ? '' : t.ma;
  var nut = toChipKhung(toLaTT(t) ? '' : '<button class="to-loc" onclick="toBDNam()" title="Khách vào / ra khỏi tổ từng tháng trong năm (so Mẫu 31 các tháng liền nhau)">📅 Biến động cả năm</button>', tv, TO_LOC_MO, 'TO_LOC_MO', TO_BD && TO_BD.to===t.ma ? TO_BD : null);
  setTimeout(toChipGon, 0);
  var dauDS = function(n){ return toBangDau('<b>'+n+'</b> '+(toLaTT(t) ? 'khách' : 'tổ viên')+' · '+coChuHTML(toLocNhan(TO_LOC.find(function(l){ return l[0]===TO_LOC_MO; }) || TO_LOC[0])), toNutXuat('')+'<button class="nho" onclick="toDatNguong()" title="Ngưỡng số tổ viên">⚙ Ngưỡng</button>'); };
  if(TO_LOC_MO==='rk') return nut+dauDS(TO_BD && TO_BD.co ? TO_BD.ra.length : 0)+toRaHTML();
  if(TO_LOC_MO==='tvra') return nut+dauDS((tvRaCuaTo(t.ma)||[]).length)+tvRaHTML(t.ma);   /* 3.201 */
  return nut+dauDS(ds.length)+toDsBangHTML(ds, toCotDS(false, false, nc, TO_LOC_MO), null, 'Không có tổ viên nào trong bộ lọc này.');
}
/* 3.163 (anh chốt): danh sách khách theo bảng cột — [mã, tên, 1 = cột chính / 0 = cột thêm (Tự động), ô(k, i, cb), lớp ô, 1 = cố định (không chọn ẩn)].
   Cột thêm xếp cuối theo ưu tiên: Ngày vay gần nhất → Ngày đến hạn → Hạn CCCD → Ấp → Ngày sinh → Số món → QH / khoanh (Lãi tồn = cột Nợ lãi sẵn có). */
function toCotDS(pv, coXa, nc, mo){
  var q = coChuHTML, ng = function(d){ return d ? ngayVNsl(d) : ''; };
  var c = [['stt','STT',1,function(k, i){ return String(i+1); },'c',1], ['kh','Mã KH',1,function(k){ return k.kh; },'',1]];
  if(pv) c.push(['to','Tổ',1,function(k){ var t = k.to; return '<a href="#" onclick="toChonTo(\''+t.ma+'\');return false" title="Mở tổ">'+q(toLaTT(t) ? 'Vay trực tiếp' : (t.ten||t.ma))+'</a>'; }]);
  c.push(['ten','Họ tên',1,function(k){ return q(k.ten); },'to-ten',1]);
  if(coXa) c.push(['xa','Xã',1,function(k){ return q(k.to.tenXa||''); }]);
  c.push(['ct','CT vay',1,function(k){ return q(k.ct || '—'); }], ['dn','Dư nợ',1,function(k){ return tdnTien(k.dn)+(k.qh ? ' <small class="do">QH</small>' : ''); },'s'],
    ['lt','Nợ lãi',1,function(k){ return k.lt>0 ? tdnTien(k.lt) : ''; },function(k){ return 's'+(k.lt>0 && !(k.dn>0) ? ' do' : ''); }],
    ['t105','Số dư 105',1,function(k){ return to105(k, true); },'s'], ['stk','Số TK 105',1,function(k){ return q(toStkChu(k)); }]);
  toNgayH(nc).forEach(function(ten, j){ c.push(['ng'+j, ten, 1, function(k){ return q(toNgayGT(k, mo)[j]||''); }, '', 1]); });
  c.push(['sdt','SĐT',1,function(k){ return q(k.sdt); }], ['cc','CCCD',1,function(k){ return toCCHTML(k); }],
    ['gc','Ghi chú',1,function(k){ var g = toGoiY(k); return g ? (g==='Cho ra' ? '<b class="do">'+g+'</b>' : q(g)) : ''; }], ['lu','Lưu ý',1,function(k, i, cb){ return q(cb.join(' · ')); },'to-lu'],
    ['nvm','Ngày vay gần nhất',0,function(k){ return ng(k.nvm); }], ['dhan','Ngày đến hạn',0,function(k){ return ng(k.dhan); }], ['hcc','Hạn CCCD',0,function(k){ return ng(k.cc && k.cc.den); }],
    ['ap','Ấp',0,function(k){ return q(k.ap||''); }], ['ns','Ngày sinh',0,function(k){ return ng(k.ns); }], ['smon','Số món',0,function(k){ return k.smon ? String(k.smon) : ''; },'s'],
    ['qhkn','QH / khoanh',0,function(k){ return k.qhkn>0 ? tdnTien(k.qhkn) : ''; },'s']);
  return c;
}
function toDsBangHTML(ds, cot, xen, rong){
  TO_DS_COT = cot;
  var c2 = cot.filter(function(c){ return c[5] || toCotBat(c, 'toCotKH'); }), tu = c2.filter(function(c){ return !c[5] && toCotChe(c, 'toCotKH')==='tu'; }).map(function(c){ return c[0]; });
  var lo = function(c, k){ var l = typeof c[4]==='function' ? c[4](k) : (c[4]||''); return (l+(tu.indexOf(c[0])>=0 ? ' tu tc-'+c[0] : '')).trim(); };
  var h = ds.slice(0, TO_PV_MAX).map(function(k, i){ var cb = toCanh(k), lop = [xen && xen[i] ? 'to-xen' : '', cb.length ? 'to-canh' : ''].filter(Boolean).join(' ');
    return '<tr'+(lop ? ' class="'+lop+'"' : '')+'>'+c2.map(function(c){ var l = lo(c, k); return '<td'+(l ? ' class="'+l+'"' : '')+'>'+c[3](k, i, cb)+'</td>'; }).join('')+'</tr>'; }).join('');
  setTimeout(toCotVua, 0);
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi" data-khoa="ds" data-tu="'+tu.join(',')+'"><thead><tr>'+c2.map(function(c){ var l = tu.indexOf(c[0])>=0 ? 'tu tc-'+c[0] : ''; return '<th'+(l ? ' class="'+l+'"' : '')+'>'+coChuHTML(c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    (h || '<tr><td colspan="'+c2.length+'" class="rong">'+rong+'</td></tr>')+'</tbody></table></div>';
}
/* 3.163: In đầy đủ danh sách = các cột đang hiện trên màn hình (cột Tự động đang hiện + Luôn hiện), A4 ngang, tự co chữ */
function toInDuDS(pv){
  var C = toCH(), t = !pv && TO_K && TO_K.to[C.to]; if(!pv && !t) return;
  var mo = pv ? (TO_LOC_PV==='bang' ? 'tat' : TO_LOC_PV) : TO_LOC_MO; if(mo==='rk') return pv ? toInDSPV() : toInDS();
  CT_DUNG = {}; var x = pv ? toBCDSPV(C) : toBCDS(t), l = TO_LOC.find(function(z){ return z[0]===mo; }) || TO_LOC[0], ds = (pv ? toTVPV(C).tv : toTV(t)).filter(l[2]);
  var hien = TO_TU_HIEN.ds || [], cot = toCotDS(pv, pv && !C.xa, toNgayCot(mo), mo).filter(function(c){ var m = toCotChe(c, 'toCotKH'); return c[5] || m==='hien' || (m==='tu' && hien.indexOf(c[0])>=0); });
  var xen = pv ? toXen(ds) : [], bo = function(v){ return String(v).replace(/<\/?a\b[^>]*>/g, ''); };
  x.html = '<table class="bc-bang"><thead><tr>'+cot.map(function(c){ return '<th>'+coChuHTML(c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+ds.map(function(k, i){ var cb = toCanh(k);
    return '<tr class="'+(xen[i] ? 'xen' : '')+(cb.length ? ' canh' : '')+'">'+cot.map(function(c){ var lp = typeof c[4]==='function' ? c[4](k) : (c[4]||''); return toO(bo(c[3](k, i, cb)), /\bs\b/.test(lp) ? 's' : lp==='c' ? 'c' : ''); }).join('')+'</tr>'; }).join('')+'</tbody></table>'+toCanhTong(ds);
  x.ngang = true; x.coChu = cot.length>12 ? Math.max(6.5, 10-(cot.length-12)*0.5) : 0; x.ctChu = ctChuThich(); CT_DUNG = null;
  inBlob(new Blob([toHTMLIn([x], pv ? toGiaPV(C) : t)], {type:'text/html'}), (pv ? x.ten : 'Danh sach to vien '+t.ma)+' (day du).html');
}
/* 3.163: Excel danh sách thêm các cột thêm (đủ cột) */
var TO_COT_X = [['Ngày vay gần nhất', function(k){ return k.nvm ? ngayVNsl(k.nvm) : ''; }], ['Ngày đến hạn', function(k){ return k.dhan ? ngayVNsl(k.dhan) : ''; }], ['Hạn CCCD (ngày)', function(k){ return k.cc && k.cc.den ? ngayVNsl(k.cc.den) : ''; }],
  ['Ấp', function(k){ return k.ap||''; }], ['Ngày sinh', function(k){ return k.ns ? ngayVNsl(k.ns) : ''; }], ['Số món', function(k){ return k.smon||0; }], ['QH / khoanh', function(k){ return k.qhkn||0; }]];
function toThemCotX(aoa, ds){ aoa[0] = aoa[0].concat(TO_COT_X.map(function(x){ return x[0]; }));
  for(var i=1;i<aoa.length;i++) aoa[i] = aoa[i].concat(TO_COT_X.map(function(x){ return ds[i-1] ? x[1](ds[i-1]) : ''; })); return aoa; }
/* danh sách đang lọc → báo cáo in / Excel (cùng khuôn báo cáo tổ) */
function toBCDS(t){
  var tv = toTV(t), l = TO_LOC.find(function(x){ return x[0]===TO_LOC_MO; }) || TO_LOC[0], ds = tv.filter(l[2]), nc = toNgayCot();
  if(l[0]==='rk'){ var B = TO_BD && TO_BD.co ? TO_BD : {ra:[], tr:kyLui(TO_K.thang, -1)}, a2 = [['STT','Mã KH','Họ tên','Dư nợ '+toNgayDu(B.tr),'Nợ lãi '+toNgayDu(B.tr),'Số dư 105 '+toNgayDu(B.tr),'Đi đâu']], h2 = '';   /* 3.128 · 3.137: + Nợ lãi */
    B.ra.forEach(function(r, i){ a2.push([i+1, r.kh, r.ten, r.dn, r.lt||0, r.t105, r.di]); h2 += '<tr>'+toO(i+1,'c')+toO(r.kh)+toO(coChuHTML(r.ten))+toO(tdnTien(r.dn),'s')+toO((r.lt>0 ? tdnTien(r.lt) : ''),'s')+toO(tdnTien(r.t105),'s')+toO(coChuHTML(r.di))+'</tr>'; });
    return {ten:'Ra khoi to', tieuDe:'DANH SÁCH KHÁCH RA KHỎI TỔ — '+slKyChu(TO_K.ky).toUpperCase(), ngay:toNgayChu(), aoa:a2,
      html:'<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Dư nợ '+toNgayDu(B.tr)+'</th><th>Nợ lãi '+toNgayDu(B.tr)+'</th><th>Số dư 105 '+toNgayDu(B.tr)+'</th><th>Đi đâu</th></tr></thead><tbody>'+(h2 || '<tr><td colspan="7">Không có khách ra khỏi tổ trong tháng.</td></tr>')+'</tbody></table>'}; }
  var aoa = [['STT','Mã KH','Họ tên','CT vay','Dư nợ','Nợ lãi','Số dư 105','Số TK 105'].concat(toNgayH(nc), ['SĐT','CCCD','Hạn CCCD','Lưu ý','Ghi chú'])], h = '', T = {dn:0, lt:0, t105:0};   /* 3.161: + Lưu ý */   /* 3.137 (anh chốt): cột Nợ lãi cạnh Dư nợ — dư nợ 0 còn lãi = chưa tất nợ */
  ds.forEach(function(k, i){ T.dn += k.dn; T.lt += k.lt; T.t105 += k.t105; var g = toGoiY(k), cc = k.cc.kq==='het' ? 'Hết hạn' : k.cc.kq==='ok' ? 'Còn hạn' : 'Chưa rõ', ng = nc ? toNgayGT(k) : [];
    var cb = toCanh(k); aoa.push([i+1, k.kh, k.ten, k.ct, k.dn, k.lt||0, k.t105, toStkChu(k)].concat(ng, [k.sdt, k.cccd, cc+' — '+k.cc.chu, cb.join(' · '), '']));   /* 3.137: Ghi chú để trống ghi tay */
    h += '<tr'+(cb.length ? ' class="canh"' : '')+'>'+toO(i+1,'c')+toO(k.kh)+toO(coChuHTML(k.ten))+toO(coChuHTML(k.ct))+toO(tdnTien(k.dn),'s')+toO((k.lt>0 ? tdnTien(k.lt) : ''),'s')+toO(to105(k, true),'s')+toO(coChuHTML(toStkChu(k)))+ng.map(function(v){ return toO(coChuHTML(v)); }).join('')+toO(coChuHTML(k.sdt))+toO(k.cc.kq==='het' || k.cc.kq==='sap' ? toCCNhan(k)+' '+ngayVNsl(k.cc.den) : cc)+toO(coChuHTML(cb.join(' · ')))+toO('')+'</tr>'; });
  h += '<tr class="tong">'+toO('')+toO('')+toO('<b>Cộng '+ds.length+' người</b>')+toO('')+toO(tdnTien(T.dn),'s')+toO(tdnTien(T.lt),'s')+toO(tdnTien(T.t105),'s')+toO('')+toNgayH(nc).map(function(){ return toO(''); }).join('')+toO('')+toO('')+toO('')+toO('')+'</tr>';
  aoa.push(['', '', 'Cộng '+ds.length+' người', '', T.dn, T.lt, T.t105, ''].concat(toNgayH(nc).map(function(){ return ''; }), ['', '', '', '', ''])); toThemCotX(aoa, ds);
  return {ten:'Danh sach to vien', tieuDe:'DANH SÁCH TỔ VIÊN'+(l[0]!=='tat' ? ' — '+toLocNhan(l).toUpperCase() : ''), ngay:toNgayChu(), ngang:true, aoa:aoa,
    html:'<table class="bc-bang"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>CT vay</th><th>Dư nợ</th><th>Nợ lãi</th><th>Số dư 105</th><th>Số TK 105</th>'+toNgayTh(nc)+'<th>SĐT</th><th>CCCD</th><th>Lưu ý</th><th style="width:10%">Ghi chú</th></tr></thead><tbody>'+h+'</tbody></table>'+toCanhTong(ds)+
      '<div class="bc-ghi">Có dư nợ = còn món chưa tất toán (còn gốc hoặc còn lãi); dư nợ 0 mà còn nợ lãi vẫn là chưa tất nợ (cột Nợ lãi). Tất nợ = dư nợ 0 và nợ lãi 0; TK 105 còn trên 100.000 đ in đậm (chờ vay lại); 105 = 0 → cho ra. Nền nhạt xen kẽ theo tổ. Hạn CCCD theo Luật Căn cước 2023 (đổi ở tuổi 14, 25, 40, 60; CMND 9 số hết hiệu lực từ 01/01/2025), tính từ ngày sinh + ngày cấp trong Mẫu 31.</div>'};
}
function toInDS(){ var C = toCH(), t = TO_K && TO_K.to[C.to]; if(!t) return; CT_DUNG = {}; var x = toBCDS(t); x.ctChu = ctChuThich(); CT_DUNG = null; inBlob(new Blob([toHTMLIn([x], t)], {type:'text/html'}), 'Danh sach to vien '+t.ma+'.html'); }
function toExcelDS(){ var C = toCH(), t = TO_K && TO_K.to[C.to]; if(!t) return; CT_DUNG = {}; var x = toBCDS(t); x.ctChu = ctChuThich(); CT_DUNG = null; TO_XEM = [x]; toExcel(); }
/* bảng các tổ trong phạm vi (xã / điểm / hội) — chưa chọn tổ */
function toTruocNap(){
  var K = TO_K, tr = kyLui(K.thang, -1);
  if(TO_TRUOC && TO_TRUOC.ky===tr) return Promise.resolve(TO_TRUOC);
  if(!SLM.bang[slKhoa('hstd', tr)]) return Promise.resolve(TO_TRUOC = {ky:tr, co:false});
  return slBo(tr).then(function(B){
    var kh = {}, t105 = {};
    (B.co.hstd||[]).concat(B.lap||[]).forEach(function(o){ var m = toMaCua(o); if(!o.kh || !m) return; kh[o.kh] = m; var k = m+'|'+o.kh; if((o.t105||0) > (t105[k]||0)) t105[k] = o.t105; });
    var tong = {}; Object.keys(t105).forEach(function(k){ var m = k.split('|')[0]; tong[m] = (tong[m]||0)+t105[k]; });
    return TO_TRUOC = {ky:tr, co:true, kh:kh, t105:tong};
  }).catch(function(){ return TO_TRUOC = {ky:tr, co:false}; });
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
var TO_COT = [   /* [mã, tên, 1 = cột chính (Luôn hiện) / 0 = cột thêm (Tự động), in A4 dọc, tiền (triệu)] — 3.163: cột thêm xếp cuối theo thứ tự ưu tiên anh chốt */
  ['stt','STT',1,1], ['ma','Mã tổ',1,1], ['ten','Tổ trưởng',1,1], ['ap','Ấp',1,1], ['hoi','Hội',1,1],
  ['tv','Tổ viên',1,1], ['co','Có dư nợ',1,1], ['moi','Mới vào',1,0], ['ra','Đề xuất cho ra',1,0], ['con','Còn nhận',1,0],
  ['dn','Dư nợ',1,1,1], ['qh','Quá hạn',1,1,1], ['kn','Khoanh',1,1,1], ['tn','Thu nợ tháng',1,0,1], ['tl','Thu lãi tháng',1,0,1], ['t105','Số dư 105',1,1,1], ['d105','105 tăng/giảm',1,0,1],
  ['mon','Số món vay',0,0], ['tlqh','Tỷ lệ QH (%)',0,0], ['bq','Dư nợ BQ / hộ',0,0,1], ['diem','Điểm GD',0,0], ['lt','Nợ lãi',0,0,1], ['dhs','Món ĐH tháng sau',0,0], ['cch','Khách CCCD hết / sắp hết hạn',0,0], ['ctk','Khách chưa có TK 105',0,0]];
var TO_COT_PGD = [['ten','Xã / Điểm GD',1,1], ['soTo','Số tổ',1,1], ['tv','Tổ viên',1,1], ['co','Có dư nợ',1,1], ['moi','Mới vào',1,0], ['ra','Đề xuất cho ra',1,0],
  ['dn','Dư nợ',1,1,1], ['qh','Quá hạn',1,1,1], ['kn','Khoanh',1,1,1], ['tn','Thu nợ tháng',1,0,1], ['tl','Thu lãi tháng',1,0,1], ['t105','Số dư 105',1,1,1], ['d105','105 tăng/giảm',1,0,1],
  ['mon','Số món vay',0,0], ['tlqh','Tỷ lệ QH (%)',0,0], ['lt','Nợ lãi',0,0,1], ['dhs','Món ĐH tháng sau',0,0], ['cch','Khách CCCD hết / sắp hết hạn',0,0], ['ctk','Khách chưa có TK 105',0,0]];
/* 3.163 (anh chốt): mỗi cột 3 chế độ — Tự động (hiện khi bảng còn chỗ, theo thứ tự ưu tiên) · Luôn hiện · Ẩn; app nhớ (bảng tổ: D.cauHinh.toCot, danh sách khách: toCotKH).
   Dữ liệu cũ (true / false của 3.161) đọc thành Luôn hiện / Ẩn. */
function toCotChe(c, kho){ var x = (D.cauHinh[kho || 'toCot'] || {})[c[0]]; return x===true || x==='hien' ? 'hien' : x===false || x==='an' ? 'an' : x==='tu' ? 'tu' : (c[2] ? 'hien' : 'tu'); }
function toCotBat(c, kho){ return toCotChe(c, kho)!=='an'; }
var TO_TU_HIEN = {}, TO_DS_COT = null;
function toCotVua(){   /* sau khi vẽ: bật dần cột Tự động theo thứ tự ưu tiên, dừng khi bảng sắp tràn ngang khung */
  Array.prototype.forEach.call(document.querySelectorAll('#to-the table[data-tu]'), function(tb){
    var khung = tb.parentNode, ds = tb.getAttribute('data-tu').split(',').filter(Boolean), hien = [], i, j, o;
    if(!khung || !khung.clientWidth) return;
    Array.prototype.forEach.call(tb.querySelectorAll('.tu-hien'), function(x){ x.classList.remove('tu-hien'); });
    var th = tb.tHead, h0 = th ? th.offsetHeight : 0;   /* thêm cột mà làm tiêu đề cột khác xuống thêm dòng (cột bị ép) cũng coi là hết chỗ */
    for(i=0;i<ds.length;i++){ o = tb.querySelectorAll('.tc-'+ds[i]); for(j=0;j<o.length;j++) o[j].classList.add('tu-hien');
      if(tb.scrollWidth > khung.clientWidth+1 || (th && th.offsetHeight > h0+2)){ for(j=0;j<o.length;j++) o[j].classList.remove('tu-hien'); break; } hien.push(ds[i]); }
    TO_TU_HIEN[tb.getAttribute('data-khoa')||''] = hien; });
  slVua();
}
var TO_VUA_HEN = null;
window.addEventListener('resize', function(){ clearTimeout(TO_VUA_HEN); TO_VUA_HEN = setTimeout(toCotVua, 250); });
function toCotDat(kho, ma, v){ var o = D.cauHinh[kho] = D.cauHinh[kho] || {}; o[ma] = v; luu(); }
function toCotHop(kho){
  kho = kho || 'toCot'; var ds = kho==='toCotKH' ? TO_DS_COT : TO_BANG_XUAT && TO_BANG_XUAT.dsCot; if(!ds) return;
  var hien = TO_TU_HIEN[kho==='toCotKH' ? 'ds' : 'bang'] || [];
  moHop('<div class="hop-tit">⚙ Cột của bảng</div><div class="hop-phu"><b>Tự động</b> = hiện khi bảng còn chỗ (theo thứ tự trong danh sách, không để bảng tràn ngang) · <b>Luôn hiện</b> · <b>Ẩn</b>. App nhớ. '+
    (kho==='toCotKH' ? 'In = cột chính A4 ngang; "In đầy đủ" = các cột đang hiện, tự co chữ; Excel đủ cột.' : 'In = cột chính A4 dọc; "In đầy đủ" = các cột đang hiện, A4 ngang; Excel đủ cột.')+'</div>'+
    '<div class="to-cot-ds">'+ds.filter(function(c){ return !c[5] && ['stt','ma','ten','kh'].indexOf(c[0])<0; }).map(function(c){ var m = toCotChe(c, kho), dk = '\''+kho+'\',\''+c[0]+'\'';
      return '<label class="to-cot-dong"><span>'+coChuHTML(c[1])+(m==='tu' ? ' <small>'+(hien.indexOf(c[0])>=0 ? '· đang hiện' : '· đang ẩn (hết chỗ)')+'</small>' : '')+'</span><select onchange="toCotDat('+dk+',this.value)">'+
        [['tu','Tự động'], ['hien','Luôn hiện'], ['an','Ẩn']].map(function(x){ return '<option value="'+x[0]+'"'+(x[0]===m ? ' selected' : '')+'>'+x[1]+'</option>'; }).join('')+'</select></label>'; }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="delete D.cauHinh.'+kho+';luu();dongHop();toVeThe()">↺ Mặc định</button><button class="nho chinh" onclick="dongHop();toVeThe()">Xong</button></div>', true);
}
function toBangDau(tieu, nut){ return '<div class="to-bang-dau"><div class="to-bang-tieu">'+tieu+'</div><div class="to-bang-nut">'+nut+'</div></div>'; }
function toNutXuat(ds){ return (ds!==undefined ? '<button class="nho" onclick="toInDS'+ds+'()" title="A4 ngang — các cột chính">🖨 In danh sách</button><button class="nho" onclick="toInDuDS('+(ds ? 1 : 0)+')" title="A4 ngang — mọi cột đang hiện, tự co chữ">🖨 In đầy đủ</button><button class="nho" onclick="toExcelDS'+ds+'()">📊 Excel</button><button class="nho" onclick="toCotHop(\'toCotKH\')" title="Chọn cột: Tự động / Luôn hiện / Ẩn">⚙ Cột</button>'
  : '<button class="nho" onclick="toBangXuat(\'in\')" title="A4 dọc — các cột chính">🖨 In</button><button class="nho" onclick="toBangXuat(\'inDu\')" title="A4 ngang — mọi cột đang xem">🖨 In đầy đủ</button><button class="nho" onclick="toBangXuat(\'excel\')">📊 Excel</button><button class="nho" onclick="toCotHop()" title="Chọn cột: Tự động / Luôn hiện / Ẩn">⚙ Cột</button>'); }
function toGiaTri(k, S){   /* giá trị số 1 ô (đồng / số) */
  return k==='tlqh' ? (S.dn ? Math.round(S.qh/S.dn*1000)/10 : 0) : k==='bq' ? (S.co ? Math.round(S.dn/S.co) : 0) : S[k];
}
function toOCot(c, v){   /* hiển thị 1 ô theo cột */
  if(v===null || v===undefined || v==='') return '';
  if(typeof v!=='number') return coChuHTML(String(v));
  if(c[0]==='stt') return String(v);
  if(c[0]==='d105') return v ? soTrDau(v) : '';
  if(c[4]) return soTr(v);
  if(c[0]==='tlqh') return v ? v.toLocaleString('vi-VN') : '';
  return v ? String(v) : '';
}
function toBangHTML(X, lopBang){   /* bảng xem: cột đang bật, kẻ ô, tiêu đề + dòng Cộng dính */
  var cot = X.dsCot.filter(function(c){ return X.an.indexOf(c[0])<0 && toCotBat(c); }), tu = cot.filter(function(c){ return toCotChe(c)==='tu'; }).map(function(c){ return c[0]; });
  var lt = function(c){ return tu.indexOf(c[0])>=0 ? ' tu tc-'+c[0] : ''; };   /* 3.163: cột Tự động — ẩn sẵn, toCotVua bật dần khi còn chỗ */
  var dong = function(r, lop, bam){ return '<tr'+(lop ? ' class="'+lop+'"' : '')+(bam ? ' onclick="'+bam+'" title="Bấm để mở"' : '')+'>'+cot.map(function(c){ var v = r.v[c[0]];
    return '<td class="'+(typeof v==='number' || c[0]==='stt' ? 's' : '')+(c[0]==='ten' ? ' to-ten' : '')+lt(c)+'">'+(c[0]==='ten' && r.dau ? r.dau : '')+(r.html && r.html[c[0]]!==undefined ? r.html[c[0]] : toOCot(c, v))+'</td>'; }).join('')+'</tr>'; };
  setTimeout(toCotVua, 0);
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang chon luoi'+(lopBang ? ' '+lopBang : '')+'" data-khoa="bang" data-tu="'+tu.join(',')+'"><thead><tr>'+cot.map(function(c){ return '<th class="'+lt(c).trim()+'">'+coChuHTML(c[0]==='d105' && X.ngaySo ? '105 tăng/giảm từ '+X.ngaySo : c[1])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    X.dong.map(function(r){ return dong(r, r.lop, r.bam); }).join('')+(X.tong ? dong(X.tong, 'tong') : '')+'</tbody></table></div>';
}
function toBangToHTML(C){
  var K = TO_K, T = K.to, N = toNguong(), P = TO_TRUOC && TO_TRUOC.ky===kyLui(K.thang, -1) ? TO_TRUOC : null;
  var ds = Object.keys(T).map(function(m){ return T[m]; }).filter(function(t){ return pvLoc(C, t); })
    .sort(function(a, b){ return ((a.tenDiemDu||'')+'|'+(toLaTT(a)?'0':'1')+(a.ten||'')).localeCompare((b.tenDiemDu||'')+'|'+(toLaTT(b)?'0':'1')+(b.ten||''), 'vi'); });   /* 3.132: vay trực tiếp đầu nhóm điểm GD, STT 0 */
  if(!ds.length) return '<div class="rong">Không có tổ trong phạm vi.</div>';
  var tong = toSoMoi(), coMoi = P && P.co, soTo = 0, ttKh = 0, aoa = [], dong = [];
  ds.forEach(function(t){
    var S = toSoTo(t, P), stt = toLaTT(t) ? 0 : ++soTo; if(!stt) ttKh += S.tv;
    toCongSo(tong, S);
    var lech = !toLaTT(t) && ((N.min && S.tv<N.min) || (N.max && S.tv>N.max)), hoi = String(t.dv)==='99' ? 'Trực tiếp' : (tdnHoi(t.dv)||'');
    var v = {stt:stt, ma:toLaTT(t) ? '—' : t.ma, ten:toLaTT(t) ? 'Vay trực tiếp' : (t.ten||''), diem:t.tenDiemDu||'', ap:t.tenThon||'', hoi:hoi, tv:S.tv, co:S.co, moi:coMoi ? S.moi : '', ra:S.ra, con:N.max && !toLaTT(t) ? Math.max(0, N.max-S.tv) : '', mon:S.mon,
      dn:S.dn, qh:S.qh, kn:S.kn, tlqh:toGiaTri('tlqh', S), bq:toGiaTri('bq', S), tn:S.tn, tl:S.tl, t105:S.t105, d105:S.d105===null ? '' : S.d105, lt:S.lt, dhs:S.dhs, cch:S.cch, ctk:S.ctk};
    aoa.push([stt, toLaTT(t) ? '' : t.ma, v.ten, v.diem, v.ap, hoi, S.tv, S.co, coMoi ? S.moi : '', S.ra, S.dn, S.qh, S.kn, S.tn, S.tl, S.t105, S.d105===null ? '' : S.d105]);
    dong.push({v:v, bam:'toChonTo(\''+t.ma+'\')', html:{ten:'<b>'+coChuHTML(v.ten)+'</b>', tv:lech ? '<span class="to-cc het" title="ngoài ngưỡng '+(N.min||'')+'–'+(N.max||'')+'">'+S.tv+'</span>' : String(S.tv), ra:S.ra ? '<b class="do">'+S.ra+'</b>' : ''}});
  });
  var vt = {stt:'', ma:'', ten:'Cộng '+soTo+' tổ'+(ttKh ? ' + vay trực tiếp' : ''), diem:'', ap:'', hoi:'', tv:tong.tv, co:tong.co, moi:coMoi ? tong.moi : '', ra:tong.ra, con:'', mon:tong.mon, dn:tong.dn, qh:tong.qh, kn:tong.kn, tlqh:toGiaTri('tlqh', tong), bq:toGiaTri('bq', tong), tn:tong.tn, tl:tong.tl, t105:tong.t105, d105:coMoi ? tong.d105 : '', lt:tong.lt, dhs:tong.dhs, cch:tong.cch, ctk:tong.ctk};
  var an = [C.hoi ? 'hoi' : '', C.diem ? 'diem' : '', N.max ? '' : 'con', coMoi ? '' : 'moi', coMoi ? '' : 'd105'].filter(Boolean), ngaySo = coMoi ? toNgayDu(P.ky) : '';
  TO_BANG_XUAT = {tieuDe:'BẢNG CÁC TỔ TK&VV', cot:['STT','Mã tổ','Tổ trưởng','Điểm GD','Ấp','Hội','Tổ viên','Có dư nợ','Mới vào','Đề xuất cho ra','Dư nợ','Quá hạn','Khoanh','Thu nợ tháng','Thu lãi tháng','Số dư 105','105 tăng/giảm'], aoa:aoa,
    tong:['', '', vt.ten, '', '', '', tong.tv, tong.co, coMoi ? tong.moi : '', tong.ra, tong.dn, tong.qh, tong.kn, tong.tn, tong.tl, tong.t105, coMoi ? tong.d105 : ''],
    dsCot:TO_COT, dong:dong, an:an, ngaySo:ngaySo, tongV:{v:vt, html:{ten:'<b>'+coChuHTML(vt.ten)+'</b>'+(ttKh ? '<br><small>+ vay trực tiếp '+ttKh+' khách</small>' : '')}}};
  var X = Object.assign({}, TO_BANG_XUAT, {tong:TO_BANG_XUAT.tongV});
  return toBangDau('<b>'+soTo+'</b> tổ'+(ttKh ? ' <small>(+ vay trực tiếp, STT 0 — không tính là tổ)</small>' : '')+' · '+coChuHTML(pvChu(C, K))+' <small class="to-dv">· triệu đồng</small>'+
      '<div class="to-the-so">'+toKyKQ(K)+' · bấm 1 dòng để mở tổ'+(coMoi ? ' · mới vào / 105 tăng giảm so với '+ngaySo : ' · chưa có Mẫu 31 tháng trước nên chưa tính mới vào / 105 tăng giảm')+'</div>',
      toNutXuat()+'<button class="nho" onclick="toDatNguong()" title="Ngưỡng số tổ viên">⚙ Ngưỡng'+(N.min || N.max ? ' ('+(N.min||'')+'–'+(N.max||'')+')' : '')+'</button>')+
    toBangHTML(X)+
    '<p class="ghi" title="Vay trực tiếp không phải tổ: STT 0, không tính vào số tổ; khách và số tiền vẫn cộng. Tổ viên = khách trong tổ theo Mẫu 31 (kể cả khách chỉ gửi 105). Có dư nợ = còn món chưa tất toán (còn gốc hoặc còn lãi). Đề xuất cho ra = không còn món vay và 105 = 0. Mới vào = khách có trong tổ kỳ này mà kỳ so sánh chưa ở tổ này.">ⓘ Rê chuột để xem cách tính các cột.</p>';
}
