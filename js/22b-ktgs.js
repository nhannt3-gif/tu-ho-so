/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 1102–1816 của bản 3.234), không đổi logic — 🛡 KTGS hội đoàn thể — đọc BC0437/0438, chọn tổ / hộ, Mẫu 06 đột xuất, khai báo khi in, bảng ngành */
/* ===================== 3.93: 🛡 KTGS HỘI ĐOÀN THỂ (tab con Số liệu) =====================
   Anh Nhân chốt:
   - nạp BC0437 (thông tin tổ TK&VV do HĐT quản lý) + BC0438 (thông tin ủy thác theo xã × hội) ngay trong tab; xếp loại tổ = công thức
     của file =IF(điểm<50;"Yếu";IF(<70;"Trung bình";IF(<85;"Khá";"Tốt"))) khi cột Xếp loại bằng 0 (Excel xuất ra mất kết quả công thức);
   - chọn tổ bằng menu chuẩn Xã → Điểm GD → Hội → Tổ; Mẫu 06 kiểm tra đột xuất: gợi ý 6–8 hộ theo số tổ viên (≤20 → 6, 21–40 → 7, >40 → 8),
     3 kiểu: Hộ tốt (vay mới 12 tháng, 105 tăng, không lãi tồn) · Hộ cần quan tâm (KHĐ ≥ 3 tháng, lãi tồn, không gửi TK) ·
     Trung hòa (6 tốt + 2 hộ có món KHĐ ≥ 3 tháng); bỏ qua hộ có quá hạn / khoanh (kiểm tra riêng); có HSSV thì ≥ 1 món HSSV;
     món giải ngân dưới 30 ngày tự vào gợi ý (727: kiểm tra 100%);
   - Word đúng 100% khuôn mẫu gốc (KT_KHUON) — chỉ điền thông tin có sẵn, thiếu thì để nguyên dòng chấm; ngày + đoàn kiểm tra khai khi in,
     mặc định trống; không ghi tổ phó. Biên bản / phiếu có dữ liệu thật → chỉ lưu trên máy / Drive của anh. */

/* ---------- đọc file BC0437 / BC0438 ---------- */
var KT_COT37 = {'ma xa':'xa', 'ten xa':'tenXa', 'ma dvut':'dv', 'ma to':'to', 'ten to truong':'toTen', 'so to vien':'stv', 'so to vien con du no':'stvDn',
  'so to vien co gui tiet kiem':'stvTK', 'so to vien co nop lai trong 3 thang gan nhat':'stvNL', 'so to vien khong nop lai day du trong 3 thang gan nhat':'stvKNL',
  'so to vien co tham gia gui tiet kiem trong 3 thang gan nhat':'stvGT', 'so to vien khong tham gia gui tiet kiem day du trong 3 thang gan nhat':'stvKGT',
  'tong du no trieu dong':'dn', 'du no qua han trieu dong':'qh', 'ty le nqh':'tlQH', 'du no khoanh trieu dong':'kn', 'ty le no khoanh':'tlKN',
  'lai ton trieu dong':'lt', 'lai ton an han trieu dong':'ltAH', 'so du tiet kiem trieu dong':'tg', 'muc tien gui binh quan to vien trieu dong':'tgbq',
  'muc tien gui binh quan to vien thang ngan dong':'tgbqT', 'so to vien co lai ton':'stvLT', 'so to vien co lai ton an han':'stvLTAH',
  'ket qua cham diem to thang gan nhat':'diemTo', 'xep loai':'xepLoai'};
var KT_TRIEU = {dn:1, qh:1, kn:1, lt:1, ltAH:1, tg:1, tgbq:1};   /* cột triệu đồng → lưu đồng như các loại khác */
function ktXepLoai(d){   /* công thức của BC0437 (anh gửi) */
  if(d==='' || d===null || d===undefined || isNaN(+d)) return '';
  d = +d; return d<50 ? 'Yếu' : d<70 ? 'Trung bình' : d<85 ? 'Khá' : 'Tốt';
}
function ktNgayDau(rows){ var t = (rows[0]||[]).join(' '), m = t.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/); return m ? m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]) : ''; }
function ktDocBC(sheets){
  var sh = (sheets||[])[0]; if(!sh) return null;
  var rows = sh.rows||[], dau = slChuan((rows[0]||[]).join(' '));
  if(/thong tin to tk vv do .* quan ly/.test(dau) || /thong tin to tk vv/.test(dau)){
    var h = -1; for(var i=0;i<Math.min(10, rows.length);i++){ var c = (rows[i]||[]).map(slChuan); if(c.indexOf('ma to')>=0 && c.indexOf('ten to truong')>=0){ h = i; break; } }
    if(h<0) return null;
    var cot = (rows[h]||[]).map(function(x){ return KT_COT37[slChuan(x)] || ''; }), ra = [], gap = {}, trung = 0, tinh = 0;
    for(var r=h+1;r<rows.length;r++){
      var R = rows[r]||[], o = {};
      cot.forEach(function(f, j){ if(!f) return; var v = R[j]; o[f] = (f==='xa' || f==='dv' || f==='to' || f==='tenXa' || f==='toTen' || f==='xepLoai') ? String(v==null ? '' : v).trim() : (v==='' || v==null ? '' : slSo(v)); });
      if(!/^\d{5,9}$/.test(o.to||'')) continue;
      if(gap[o.to]){ trung++; continue; } gap[o.to] = 1;
      Object.keys(KT_TRIEU).forEach(function(f){ if(typeof o[f]==='number') o[f] = Math.round(o[f]*1e6); });
      if(typeof o.tgbqT==='number') o.tgbqT = Math.round(o.tgbqT*1e3);
      if(!o.xepLoai || o.xepLoai==='0'){ o.xepLoai = ktXepLoai(o.diemTo); if(o.xepLoai) tinh++; }
      ra.push(o);
    }
    return {k:'k37', sheet:sh.ten, hang:h+1, ngay:ktNgayDau(rows), rows:ra, trung:trung, tinh:tinh};
  }
  if(/thong tin uy thac/.test(dau)){
    var phan = '', vt = {}, ra2 = [];
    for(var i2=1;i2<rows.length;i2++){
      var R2 = rows[i2]||[], c2 = R2.map(slChuan);
      if(c2.indexOf('ma xa')>=0){
        vt = {}; c2.forEach(function(x, j){ if(x && vt[x]===undefined) vt[x] = j; });
        phan = vt['so ap co du no do hdt quan ly']!==undefined ? 'ut' : vt['ten chuong trinh vay']!==undefined ? 'ct' : vt['tot']!==undefined ? 'cd' : '';
        continue;
      }
      if(!phan || !/^\d{6}$/.test(String(R2[1]||'').trim())) continue;
      var g = function(k, n){ var j = vt[k]; return j===undefined ? 0 : slSo(R2[j+(n||0)]); };
      var o2 = {phan:phan, xa:String(R2[1]).trim(), tenXa:String(R2[2]||'').trim(), dv:String(R2[3]||'').trim()};
      if(phan==='ut'){ o2.apCo = g('so ap co du no do hdt quan ly'); o2.apTong = g('so ap tren dia ban'); o2.soTo = g('tong so to do hdt quan ly'); o2.soKH = g('tong so khach hang vay von do hdt quan ly'); o2.dn = g('tong du no do hdt quan ly'); o2.tg = g('so du tiet kiem do hdt quan ly'); }
      else if(phan==='cd'){ o2.tot = g('tot'); o2.kha = g('kha'); o2.tb = g('trung binh'); o2.yeu = g('yeu'); o2.tong = g('tong so') || (o2.tot+o2.kha+o2.tb+o2.yeu); }
      else { o2.ctTen = String(R2[vt['ten chuong trinh vay']]||'').trim(); o2.soKH = g('so khach hang'); o2.dn = g('tong du no'); o2.qh = g('no qua han'); o2.tlQH = g('no qua han', 1); o2.kn = g('no khoanh'); o2.tlKN = g('no khoanh', 1); o2.lt = g('lai ton'); o2.khd = g('so mon vay 3 thang khong hoat dong'); }
      ra2.push(o2);
    }
    if(!ra2.length) return null;
    return {k:'k38', sheet:sh.ten, hang:1, ngay:ktNgayDau(rows), rows:ra2, trung:0, tinh:0};
  }
  return null;
}
function ktPhanTich(kq, kt){
  var L = slLoai(kt.k);
  kq.loai = kt.k; kq.rows = kt.rows; kq.lap = []; kq.bo = {}; kq.mauSai = []; kq.them = {}; kq.sheet = kt.sheet; kq.hang = kt.hang; kq.mau31 = false;
  var tr = {}; kt.rows.forEach(function(o){ Object.keys(o).forEach(function(f){ tr[f] = 1; }); }); kq.truong = Object.keys(tr);
  if(!kt.rows.length){ kq.loi = 'File đúng mẫu “'+L.ten+'” nhưng không có dòng số liệu nào — anh xuất lại file.'; return kq; }
  var tuTen = slNgayTrongChu(kq.ten);
  kq.ngay = kt.ngay || tuTen; kq.nguonKy = kt.ngay ? 'tiêu đề trong file' : (tuTen ? 'tên file' : ''); kq.trongFile = kt.ngay || ''; kq.ngayXuat = '';
  if(kt.trung) kq.canhBao.push(kt.trung+' dòng tổ lặp y hệt trong file — chỉ lấy 1 lần.');
  if(kt.tinh) kq.canhBao.push('Cột Xếp loại trong file bằng 0 (Excel mất kết quả công thức) — app tính lại từ cột điểm theo đúng công thức của file cho '+kt.tinh+' tổ.');
  kq.ky = slKyTu(L, kq.ngay);
  slCanKhai(kq, tuTen);   /* 3.143 (Q14) */
  var t = {n:kt.rows.length, kt:1, dn:0};
  if(kt.k==='k37'){ t.xl = {}; kt.rows.forEach(function(o){ t.dn += o.dn||0; if(o.xepLoai) t.xl[o.xepLoai] = (t.xl[o.xepLoai]||0)+1; }); }
  else { t.ut = 0; t.xa = {}; kt.rows.forEach(function(o){ t.xa[o.xa] = 1; if(o.phan==='ut'){ t.ut++; t.dn += o.dn||0; } }); t.soXa = Object.keys(t.xa).length; delete t.xa; }
  kq.tong = t;
  return kq;
}
function ktTomTat(loai, t){
  if(loai==='k37') return t.n+' tổ · dư nợ '+tdnTr(t.dn)+(t.xl ? ' · '+['Tốt','Khá','Trung bình','Yếu'].map(function(x){ return x+' '+(t.xl[x]||0); }).join(' · ') : '');
  return (t.soXa||0)+' xã · '+(t.ut||0)+' dòng hội · dư nợ '+tdnTr(t.dn);
}

/* ---------- trạng thái + nạp dữ liệu cho tab ---------- */
var KT_K = null, KT_BC = null, KT_TRUOC = null, KT_Q = '', KT_CHON = null, KT_KB = {}, KT_LOC = 'goi';
function ktCH(){ return pvGan(D.cauHinh.ktgs = D.cauHinh.ktgs || {ky:'', xa:'', diem:'', hoi:'', to:'', kieu:'trung'}); }
function ktDsBC(loai){ return KHO.dsBang(loai).sort(function(a, b){ return slThuTu(a.ky)<slThuTu(b.ky) ? 1 : -1; }); }
function ktChonBC(loai, ky){   /* cùng tháng với số liệu món vay thì lấy, không thì bản mới nhất */
  var ds = ktDsBC(loai); return ds.find(function(e){ return e.ky===ky; }) || ds.find(function(e){ return slThang(e.ky)===slThang(ky); }) || ds[0] || null;
}
function ktNapBC(ky){ return Promise.all([KHO.bc37(ky), KHO.bc38(ky)]).then(function(r){ return {k37:r[0], k38:r[1]}; }); }   /* 3.333: qua cửa KHO (cùng luật ktChonBC: cùng kỳ → cùng tháng → mới nhất) */
/* số dư 105 từng khách tháng trước (để biết 105 tăng = gửi tiết kiệm đều) */
function ktTruocNap(K){   /* 3.333: qua cửa KHO.t105Truoc — giữ bộ nhớ đệm KT_TRUOC */
  var tr = kyLui(K.thang, -1);
  if(KT_TRUOC && KT_TRUOC.ky===tr) return Promise.resolve(KT_TRUOC);
  return KHO.t105Truoc(K).then(function(r){ return KT_TRUOC = r; });
}
function ktKhuon(){   /* 3.236 (R3 phần 2): khuôn Word KTGS (490 KB, js/khuon/kt-khuon.js) chỉ tải khi cần — mở 🛡 KTGS, tạo Word / xem Kế hoạch năm */
  if(window.KT_KHUON) return Promise.resolve(window.KT_KHUON);
  if(!ktKhuon.p) ktKhuon.p = new Promise(function(ok, loi){ var s = document.createElement('script');
    s.src = 'js/khuon/kt-khuon.js?v='+APP_BAN; s.onload = function(){ window.KT_KHUON ? ok(window.KT_KHUON) : loi(new Error('khuôn rỗng')); };
    s.onerror = function(){ ktKhuon.p = null; s.remove(); loi(new Error('Không tải được khuôn Word KTGS (mất mạng?) — thử lại khi có mạng.')); }; document.head.appendChild(s); });
  return ktKhuon.p;
}
function ktKhuonTruoc(f){ if(window.KT_KHUON) return false; ktKhuon().then(f, function(er){ baoLoi(er && er.message || er); }); return true; }   /* chưa có khuôn → tải rồi chạy lại f */
function veKTGS(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veKTGS); return; }
  var C = ktCH(), dsKy = toDsKy(); KT_GN = null;   /* 3.93.1: số liệu có thể vừa đổi → đọc lại danh sách giải ngân */
  if(!dsKy.length){ e.innerHTML = slTabConHTML()+ktDauHTML(null, [])+'<div class="rong">Chưa có số liệu món vay. Nạp Mẫu 31 (và BC0437 / BC0438) ở tab <b>📥 Nạp &amp; KT</b> trước.</div>'; return; }
  toKyMacDinh(C, dsKy, 'kt');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'…</div>';
  KHO.nap(C.ky).then(function(K){ KT_K = K; KHO.datKy(K); ktKhuon().catch(function(){}); return Promise.all([ktNapBC(C.ky), ktTruocNap(K)]); })
    .then(function(r){ KT_BC = r[0]; if(nganHienTai===7 && D.cauHinh.slTab==='kt') ktVe(dsKy); })
    .catch(function(er){ var o = document.getElementById('tr7'); if(o && D.cauHinh.slTab==='kt') o.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+'</div><div class="hang-nut"><button class="nho chinh" onclick="toThuLai()">⟳ Thử lại</button></div>'; });
}
var KT_CHIP = '';
function ktDauHTML(C, dsKy){
  kyGhiHTML(KT_K);   /* 3.163 (anh chốt): BC0437 ✓ / BC0438 ✓ thành chip cuối hàng Xã; thiếu / lệch kỳ → ⚠ cam, bấm → Nạp & KT */
  var bc = function(k, ten){ var x = KT_BC && KT_BC[k], lech = x && KT_K && slThang(x.e.ky)!==slThang(KT_K.ky);
    return '<button class="sl-chip'+(x && !lech ? ' xanh' : ' cam')+'" onclick="moNapSL()" title="'+coChuHTML(ten+(x ? ' kỳ '+slKyChu(x.e.ky)+(lech ? ' — khác kỳ đang xem '+slKyChu(KT_K.ky) : '') : ' chưa nạp')+' · bấm để mở 📥 Nạp & KT')+'">'+(x && !lech ? '' : '⚠ ')+ten+(x ? (lech ? ' '+kyVN(slThang(x.e.ky)) : ' ✓') : '')+'</button>'; };
  if(!C) return '<div class="sl-chip-hang kt-dau">'+bc('k37', 'BC0437')+bc('k38', 'BC0438')+'</div>';   /* chưa có số liệu (không có cây địa bàn) → chip ngay đầu tab */
  KT_CHIP = bc('k37', 'BC0437')+bc('k38', 'BC0438')+(KT_K && KT_K.ky===C.ky ? slNguonHTML(KT_K.B, true) : '');   /* 3.334 (RA_SOAT_BO_CUC #3): chip dời từ hàng lọc sang cuối thanh 3 khối (ktKhoiHTML) → ô chọn lọc không bị bóp */
  return '';
}
/* ---------- nạp + kiểm tra theo chuẩn tab Nạp & Kiểm tra (anh chốt): ma trận loại × tháng · 📥 nạp nhiều file (xem trước, xác nhận) · 🔍 kiểm tra lưu kết quả ---------- */
var KT_KY_KT = '';   /* tháng đang xem kiểm tra */
/* dấu dữ liệu dùng để kiểm: đổi file nào thì kết quả cũ thành "kiểm lại" */
function ktDauKy(ky){ return ['k37','k38','hstd','khd'].map(function(L){ var e = KHO.bang(L, ky); return L+':'+(e ? e.luc||'' : ''); }).join('|'); }
function ktKTCu(ky){ var k = SLM.ktg && SLM.ktg[ky]; return !!k && k.dau!==ktDauKy(ky); }
function ktKTHTML(ky){
  var co37 = !!KHO.bang('k37', ky), co38 = !!KHO.bang('k38', ky), k = SLM.ktg && SLM.ktg[ky];
  var nut = (co37 || co38) ? '<button class="nho chinh" onclick="ktKiemTra(\''+ky+'\')">🔍 '+(k ? 'Kiểm tra lại' : 'Kiểm tra')+' tháng '+kyVN(ky)+'</button>' : '';
  if(!co37 && !co38) return '<div class="rong">Tháng '+kyVN(ky)+' chưa có BC0437 / BC0438.</div>';
  var h = '<div class="hang-nut">'+nut+(k ? '<span class="sl-phu">Đã kiểm '+ngayVNsl(k.luc.slice(0,10))+' '+k.luc.slice(11,16)+(ktKTCu(ky) ? ' · <b class="vang">dữ liệu đã đổi sau lần kiểm — bấm kiểm lại</b>' : '')+'</span>' : '')+'</div>';
  if(!k) return h+'<p class="ghi">Kiểm tra: BC0437 ↔ BC0438 (số tổ, dư nợ, tiết kiệm, chấm điểm theo xã × hội) · BC0437 ↔ Mẫu 31 từng tổ · BC0438 ↔ Mẫu 31 + KHĐ mẫu 14 theo chương trình. Chỉ báo, không sửa số.</p>';
  var dau = {c:'✓', k:'✗', v:'⚠', l:'·'};
  return h+'<div class="kt-kt-ds">'+k.muc.map(function(m){
    return '<details class="kt-muc '+m.tt+'"'+(m.tt==='k' ? ' open' : '')+'><summary><b>'+dau[m.tt]+'</b> '+coChuHTML(m.ten)+' <small>'+coChuHTML(m.ghi||'')+'</small></summary>'+
      (m.ds && m.ds.length ? '<div class="to-bang-cuon"><table class="to-bang"><thead><tr>'+m.cot.map(function(c){ return '<th>'+coChuHTML(c)+'</th>'; }).join('')+'</tr></thead><tbody>'+
        m.ds.map(function(r){ return '<tr>'+r.map(function(v, i){ return '<td'+(i && typeof v==='number' ? ' class="s"' : '')+'>'+(typeof v==='number' ? tdnTien(v) : coChuHTML(v))+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>' : '')+'</details>';
  }).join('')+'</div><p class="ghi">✓ khớp · ✗ lệch · ⚠ lưu ý (định nghĩa có thể khác giữa 2 báo cáo) · · không đủ file để so. BC0437 tính triệu đồng đã làm tròn: lệch dưới 1 triệu mỗi tổ coi là khớp (cộng theo hội: dưới 0,5 triệu × số tổ). Chỉ báo, không sửa số.</p>';
}
function ktKiemTra(ky, im){
  batChay(!im, 'Đang kiểm tra BC0437 / BC0438 tháng '+kyVN(ky)+'…');
  return KHO.bo(ky).then(function(B){
    var r37 = B.co.k37 || null, r38 = B.co.k38 || null, hs = B.co.hstd || null, lap = B.lap || [], muc = [];
    var tr = function(v){ return Math.round((v||0)/1e4)/100; }, M = 1e6;
    var tenX = function(xa){ var o = (r37||[]).find(function(x){ return x.xa===xa; }) || (r38||[]).find(function(x){ return x.xa===xa; }); return o ? o.tenXa : xa; };
    var hoi = function(dv){ return tdnHoi(dv).replace(/^Hội /, ''); };
    var them = function(ten, tt, ghi, cot, ds){ muc.push({ten:ten, tt:tt, ghi:ghi, cot:cot||[], ds:(ds||[]).slice(0, 300)}); };
    /* 1. BC0437 ↔ BC0438 theo xã × hội */
    if(r37 && r38){
      var g = {}; r37.forEach(function(b){ var k = b.xa+'|'+b.dv, a = g[k] = g[k] || {to:0, dn:0, tg:0, xl:{}}; a.to++; a.dn += b.dn||0; a.tg += b.tg||0; a.xl[b.xepLoai] = (a.xl[b.xepLoai]||0)+1; });
      var l1 = [], l2 = [], n1 = 0, n2 = 0;
      r38.filter(function(x){ return x.phan==='ut'; }).forEach(function(x){ var a = g[x.xa+'|'+x.dv] || {to:0, dn:0, tg:0}; n1++; var tol = 0.5*M*Math.max(1, a.to);
        if(a.to!==x.soTo || Math.abs(a.dn-x.dn)>tol || Math.abs(a.tg-x.tg)>tol) l1.push([tenX(x.xa), hoi(x.dv), x.soTo, a.to, tr(x.dn), tr(a.dn), tr(x.tg), tr(a.tg)]); });
      them('BC0437 ↔ BC0438 ① số tổ, dư nợ, tiết kiệm theo xã × hội', l1.length ? 'k' : 'c', l1.length ? l1.length+'/'+n1+' dòng lệch' : n1+' dòng khớp', ['Xã','Hội','Số tổ 0438','Số tổ 0437','Dư nợ 0438 (tr)','Cộng 0437 (tr)','TK 0438 (tr)','Cộng 0437 (tr)'], l1);
      r38.filter(function(x){ return x.phan==='cd'; }).forEach(function(x){ var a = (g[x.xa+'|'+x.dv] || {}).xl || {}; n2++;
        if(x.tot!==(a['Tốt']||0) || x.kha!==(a['Khá']||0) || x.tb!==(a['Trung bình']||0) || x.yeu!==(a['Yếu']||0)) l2.push([tenX(x.xa), hoi(x.dv), x.tot+' / '+x.kha+' / '+x.tb+' / '+x.yeu, (a['Tốt']||0)+' / '+(a['Khá']||0)+' / '+(a['Trung bình']||0)+' / '+(a['Yếu']||0)]); });
      them('BC0437 ↔ BC0438 ② chấm điểm tổ (Tốt / Khá / TB / Yếu)', l2.length ? 'k' : 'c', l2.length ? l2.length+'/'+n2+' dòng lệch' : n2+' dòng khớp', ['Xã','Hội','BC0438','Xếp loại BC0437'], l2);
    } else them('BC0437 ↔ BC0438', 'l', 'thiếu '+(r37 ? 'BC0438' : 'BC0437')+' tháng này');
    /* 2. BC0437 ↔ Mẫu 31 từng tổ */
    if(r37 && hs){
      var T = {}, sk = {};
      hs.forEach(function(x){ var t = x.to; if(!t || t===TO_GIA) return; var a = T[t] = T[t] || {dn:0, qh:0, kn:0, lt:0, khDn:{}, t105:{}};
        if((x.t105||0) > (a.t105[x.kh]||0)) a.t105[x.kh] = x.t105;
        if(!x.ku || sk[x.ku]) return; sk[x.ku] = 1; a.dn += x.dn||0; a.qh += x.qh||0; a.kn += x.kn||0; a.lt += laiTon(x); if((x.dn||0)>0) a.khDn[x.kh] = 1; });
      lap.forEach(function(x){ var a = T[x.to]; if(a && (x.t105||0) > (a.t105[x.kh]||0)) a.t105[x.kh] = x.t105; });
      var lD = [], lL = [], thieu = [];
      r37.forEach(function(b){ var a = T[b.to]; if(!a){ thieu.push([b.to, b.toTen, tenX(b.xa), hoi(b.dv), 'chỉ có ở BC0437']); return; }
        var tg = Object.keys(a.t105).reduce(function(s, k){ return s+a.t105[k]; }, 0), nd = Object.keys(a.khDn).length;
        if(Math.abs((b.dn||0)-a.dn)>=M || Math.abs((b.qh||0)-a.qh)>=M || Math.abs((b.kn||0)-a.kn)>=M || Math.abs((b.tg||0)-tg)>=M || (b.stvDn!=='' && b.stvDn!==undefined && b.stvDn!==nd))
          lD.push([b.to, b.toTen, tenX(b.xa), b.stvDn+' / '+nd, tr(b.dn)+' / '+tr(a.dn), tr(b.qh)+' / '+tr(a.qh), tr(b.kn)+' / '+tr(a.kn), tr(b.tg)+' / '+tr(tg)]);
        else if(Math.abs((b.lt||0)-a.lt)>=M) lL.push([b.to, b.toTen, tenX(b.xa), tr(b.lt), tr(a.lt)]); });
      var co37 = {}; r37.forEach(function(b){ co37[b.to] = 1; });
      Object.keys(T).forEach(function(t){ if(!co37[t] && T[t].dn>0){ var o = hs.find(function(x){ return x.to===t; }) || {}; thieu.push([t, o.toTen||'', tenX(o.xa), hoi(o.dv), 'chỉ có ở Mẫu 31 · dư nợ '+tr(T[t].dn)+' tr']); } });
      them('BC0437 ↔ Mẫu 31 từng tổ: tổ viên còn dư nợ, dư nợ, QH, khoanh, tiết kiệm', lD.length ? 'k' : 'c', lD.length ? lD.length+'/'+r37.length+' tổ lệch (BC0437 / Mẫu 31, triệu đồng)' : r37.length+' tổ khớp', ['Mã tổ','Tổ trưởng','Xã','TV dư nợ','Dư nợ','QH','Khoanh','Tiết kiệm'], lD);
      them('BC0437 ↔ Mẫu 31 lãi tồn từng tổ', lL.length ? 'v' : 'c', lL.length ? lL.length+' tổ lệch ≥ 1 triệu (cách tính lãi tồn 2 báo cáo có thể khác)' : 'khớp', ['Mã tổ','Tổ trưởng','Xã','BC0437 (tr)','Mẫu 31 (tr)'], lL);
      them('Tổ có ở 1 bên', thieu.length ? 'v' : 'c', thieu.length ? thieu.length+' tổ' : 'không có', ['Mã tổ','Tổ trưởng','Xã','Hội','Ghi chú'], thieu);
    } else if(r37) them('BC0437 ↔ Mẫu 31', 'l', 'tháng này chưa có Mẫu 31');
    /* 3. BC0438 ③ ↔ Mẫu 31 + KHĐ theo chương trình (ghép theo tên quyết định) */
    var ct38 = r38 ? r38.filter(function(x){ return x.phan==='ct'; }) : [];
    if(ct38.length && hs){
      var khd = {}, coKHD = !!slKHD(B).length; slKHD(B).forEach(function(x){ khd[x.ku] = 1; });
      var C = {}, sk2 = {};
      hs.forEach(function(x){ if(!x.ku || sk2[x.ku] || !x.to || x.to===TO_GIA) return; sk2[x.ku] = 1; var k = x.xa+'|'+x.dv+'|'+slChuan(x.c_ten_quyet_dinh), a = C[k] = C[k] || {kh:{}, dn:0, qh:0, kn:0, lt:0, khd:0};
        if((x.dn||0)>0 || laiTon(x)>0) a.kh[x.kh] = 1; a.dn += x.dn||0; a.qh += x.qh||0; a.kn += x.kn||0; a.lt += laiTon(x); if(khd[x.ku]) a.khd++; });
      var lC = [], lV = [], co38 = {}, ghep = 0;
      ct38.forEach(function(x){ var k = x.xa+'|'+x.dv+'|'+slChuan(x.ctTen), a = C[k]; co38[k] = 1;
        if(!a){ if(x.dn || x.soKH) lV.push([tenX(x.xa), hoi(x.dv), x.ctTen, 'chỉ có ở BC0438']); return; }
        var nk = Object.keys(a.kh).length; ghep++;
        if(Math.abs(x.dn-a.dn)>1 || Math.abs(x.qh-a.qh)>1 || Math.abs(x.kn-a.kn)>1 || (coKHD && x.khd!==a.khd)) lC.push([tenX(x.xa), hoi(x.dv), x.ctTen, tr(x.dn)+' / '+tr(a.dn), tr(x.qh)+' / '+tr(a.qh), tr(x.kn)+' / '+tr(a.kn), coKHD ? x.khd+' / '+a.khd : x.khd+' / —']);
        else if(x.soKH!==nk || Math.abs(x.lt-a.lt)>1) lV.push([tenX(x.xa), hoi(x.dv), x.ctTen, 'khách '+x.soKH+' / '+nk+' · lãi tồn '+tdnTien(x.lt)+' / '+tdnTien(a.lt)]); });
      Object.keys(C).forEach(function(k){ if(!co38[k] && C[k].dn>0){ var p = k.split('|'); lV.push([tenX(p[0]), hoi(p[1]), p[2], 'chỉ có ở Mẫu 31 · dư nợ '+tr(C[k].dn)+' tr']); } });
      them('BC0438 ③ ↔ Mẫu 31'+(coKHD ? ' + KHĐ mẫu 14' : '')+' theo chương trình: dư nợ, QH, khoanh'+(coKHD ? ', số món KHĐ' : ''), lC.length ? 'k' : (ghep ? 'c' : 'l'), lC.length ? lC.length+'/'+ghep+' dòng lệch (BC0438 / Mẫu 31)' : (ghep ? ghep+'/'+ct38.length+' dòng khớp' : 'không ghép được tên chương trình nào với Mẫu 31 (cột Tên quyết định)')+(coKHD ? '' : ' (chưa có KHĐ mẫu 14 tháng này — chưa so số món KHĐ)'), ['Xã','Hội','Chương trình','Dư nợ (tr)','QH (tr)','Khoanh (tr)','Món KHĐ'], lC);
      them('BC0438 ③ ↔ Mẫu 31: số khách, lãi tồn, chương trình có ở 1 bên', lV.length ? 'v' : 'c', lV.length ? lV.length+' dòng (cách đếm khách / tính lãi tồn có thể khác)' : 'khớp', ['Xã','Hội','Chương trình','BC0438 / Mẫu 31'], lV);
    } else if(ct38.length) them('BC0438 ↔ Mẫu 31', 'l', 'tháng này chưa có Mẫu 31');
    var dem = {k:0, v:0}; muc.forEach(function(m){ if(m.tt==='k') dem.k++; if(m.tt==='v') dem.v++; });
    SLM.ktg = SLM.ktg || {}; SLM.ktg[ky] = {luc:new Date().toISOString(), dau:ktDauKy(ky), dem:dem, muc:muc};
    return slLuuMeta();
  }).then(function(){ tatChay(); if(!im) KT_KY_KT = ky; if(nganHienTai===7 && (!im || D.cauHinh.slTab==='nap')) veSoLieu(); var k = SLM.ktg[ky]; if(!im) bao('Kiểm tra KTGS '+kyVN(ky)+': '+(k.dem.k ? k.dem.k+' mục lệch' : 'khớp')+(k.dem.v ? ', '+k.dem.v+' lưu ý' : '')+'.', 5); })
    .catch(function(er){ tatChay(); if(im) console.warn('Tự kiểm KTGS lỗi', ky, er); else baoLoi('Kiểm tra lỗi: '+(er && er.message || er)); });
}
function ktVe(dsKy){
  var e = document.getElementById('tr7'); if(!e) return;
  var C = ktCH(), K = KT_K;
  e.innerHTML = slTabConHTML()+ktDauHTML(C, dsKy)+
    /* 3.157: ô 🔎 tìm tổ dời vào cuối hàng cây địa bàn (pvVeCay) */
    (K.thieuBang ? '<div class="sl-bao vang">⚠ Bảng số liệu '+coChuHTML(slKyChu(C.ky))+' <b>chưa có trên máy này</b> — chọn hộ cần bảng món vay.<div class="hang-nut"><button class="nho chinh" onclick="toNoiDrive()">☁ Nối Drive và tải</button><button class="nho" onclick="toThuLai()">⟳ Thử lại</button></div></div>' : '')+
    ktSuyHTML(K)+'<div id="kt-cay" class="to-cay pv-cay"></div><div id="kt-the"></div>';
  pvVeCay('kt'); if(KT_Q) ktTim();
}
function ktSuyHTML(K){   /* 3.149 (anh chốt 11/10): DSTO là nguồn chính (3.145) — bỏ cảnh báo "Thông tin tổ trưởng thiếu tổ"; chỉ còn báo tổ CHƯA RÕ điểm GD (thật sự thiếu) */
  var T = K.to, chua = [];
  Object.keys(T).forEach(function(m){ var t = T[m]; if(!toLaTT(t) && !t.diem) chua.push(t); });
  if(!chua.length) return '';
  var mon = function(t){ return (K.kh[t.ma]||[]).filter(function(o){ return (o.dn||0)>0; }).length; };
  var dong = function(t){ return '<tr><td>'+coChuHTML((t.ten||'')+' ('+t.ma+')')+'</td><td>'+coChuHTML(t.tenXa||t.xa||'')+'</td><td>'+coChuHTML(t.tenThon||t.thon||'')+'</td><td>'+coChuHTML(tdnHoi(t.dv)||'')+'</td><td class="s">'+mon(t)+'</td></tr>'; };
  return '<details class="sl-bao vang"><summary>⚠ <b>'+chua.length+' tổ chưa rõ điểm GD</b> (không có trên Danh sách tổ / Dư nợ chi tiết kỳ này)</summary>'+
    '<div class="kt-suy"><table><thead><tr><th>Tổ (mã)</th><th>Xã / phường</th><th>Ấp</th><th>Hội</th><th>Món còn dư nợ</th></tr></thead><tbody>'+chua.map(dong).join('')+'</tbody></table></div>'+
    '<div><small>Nạp Danh sách tổ cùng kỳ để có điểm GD của tổ.</small></div></details>';
}
function ktTim(){
  var g = document.getElementById('kt-gy'); if(!g || !KT_K) return;
  var q = slChuan(KT_Q); if(q.length<2){ g.innerHTML = ''; return; }
  var tu = q.split(' '), ds = Object.keys(KT_K.to).map(function(k){ return KT_K.to[k]; }).filter(function(t){
    if(toLaTT(t)) return false; var chu = ' '+slChuan([t.ma, t.ten, t.tenThon, t.tenXa, t.tenDiem].join(' ')); return tu.every(function(w){ return chu.indexOf(w)>=0; }); }).slice(0, 12);
  g.innerHTML = ds.length ? ds.map(function(t){ return '<button onclick="ktChonTo(\''+t.ma+'\')"><b>'+coChuHTML(t.ten||('Tổ '+t.ma))+'</b> <small>'+coChuHTML([t.ma, t.tenThon, t.tenXa, tdnHoi(t.dv)].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="rong">Không thấy tổ khớp “'+coChuHTML(KT_Q)+'”.</div>';
}
function ktChonTo(ma){
  var t = KT_K && KT_K.to[ma]; if(!t) return;
  var C = ktCH(); C.xa = t.xa||''; C.diem = t.khoaDiem; C.hoi = String(t.dv||''); C.ap = ''; C.to = ma;
  KT_Q = ''; var i = document.getElementById('kt-tim'); if(i) i.value = '';
  var g = document.getElementById('kt-gy'); if(g) g.innerHTML = '';
  luu(); pvVeCay('kt');
}
SG_CAY['kt-xa'] = 'Xã / phường'; SG_CAY['kt-diem'] = 'Điểm giao dịch';

/* ---------- số liệu tổ từ BC0437 (thiếu thì tính từ Mẫu 31, ghi rõ nguồn) ---------- */
function ktSoTo(t){
  var b = KT_BC && KT_BC.k37 && (!KT_SO_CUNG || slThang(KT_BC.k37.e.ky)===KT_K.thang) && KT_BC.k37.theoTo[t.ma];   /* 3.97: định kỳ chỉ dùng BC0437 cùng tháng số liệu */
  /* 3.325 (anh 23/10 "số liệu tổ lấy theo ngày chọn, còn chấm điểm tổ thì theo tháng"): dư nợ, tổ viên, QH, khoanh, lãi tồn, tiết kiệm = Mẫu 31 của ngày / kỳ đang chọn;
     điểm + xếp loại = BC0437 (chấm điểm theo tháng) — ghi rõ tháng chấm */
  var ks = toKhach(t), dn = 0, qh = 0, kn = 0, lt = 0, tg = 0;
  ks.forEach(function(k){ dn += k.dn; qh += k.qh; kn += k.kn; lt += k.lt; tg += k.t105; });
  var ngXL = b ? KT_BC.k37.e.ngay || tdnCuoiKy(slThang(KT_BC.k37.e.ky)) : '';
  if(!ks.length && b) return {nguon:'BC0437', ngay:ngXL, stv:b.stv, dn:b.dn||0, qh:b.qh||0, kn:b.kn||0, lt:b.lt||0, tg:b.tg||0, tlQH:b.tlQH, tlKN:b.tlKN, diem:b.diemTo, xl:b.xepLoai, ngayXL:ngXL, b:b};   /* Mẫu 31 không có dòng của tổ → như cũ */
  return {nguon:KT_K.hsTen, ngay:KT_K.ngay, stv:ks.length, dn:dn, qh:qh, kn:kn, lt:lt, tg:tg, tlQH:dn ? qh/dn*100 : 0, tlKN:dn ? kn/dn*100 : 0,
    diem:b ? b.diemTo : '', xl:b ? b.xepLoai : '', ngayXL:ngXL, b:b || null};
}
function ktTr(n, le){ n = (n||0)/1e6; var s = n.toFixed(le===undefined ? 2 : le); if(s.indexOf('.')>=0) s = s.replace(/0+$/, '').replace(/\.$/, ''); var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return p.join(','); }   /* triệu đồng, dấu phẩy thập phân */
function ktPT(n){ return (Math.round((+n||0)*100)/100).toString().replace('.', ','); }
var KT_XL_LOP = {'Tốt':'xanh', 'Khá':'', 'Trung bình':'vang', 'Yếu':'do'};

/* ---------- màn: chưa chọn tổ → bảng các tổ (BC0437) · chọn tổ → thẻ + chọn hộ ---------- */
function ktVeThe(){
  var o = document.getElementById('kt-the'); if(!o) return;
  var C = ktCH(), t = KT_K && KT_K.to[C.to];
  if(t && toLaTT(t)) t = null;
  ktHdtChuyen();   /* 3.113: chuyển khai báo cũ (cán bộ / người ký) sang lãnh đạo Hội — 1 lần */
  if(ktCheDo()==='hdt') return ktHDTVe(o);   /* 3.113: 🏛 Khai báo Hội đoàn thể */
  if(ktCheDo()==='gn') return ktGNVe(o);   /* 3.93.1: Mẫu 06 sau giải ngân */
  if(ktCheDo()==='bc') return ktBCVe(o);   /* 3.95: Mẫu 04/BC-TH */
  if(ktCheDo()==='kh') return ktKHVe(o);   /* 3.96: Kế hoạch 01/KH */
  if(ktCheDo()==='dk') return ktDKVe(o);   /* 3.97: kiểm tra định kỳ theo lịch */
  if(!t){ o.innerHTML = ktCheDoHTML()+(C.xa ? ktBangToHTML(C) : '<div class="rong">Chọn xã / điểm GD / hội để xem bảng các tổ (điểm chấm, xếp loại), hoặc chọn 1 tổ để chọn hộ kiểm tra.</div>'+ktToanPGDHTML()); return; }
  if(!KT_CHON || KT_CHON.to!==t.ma) KT_CHON = ktGoiY(t, C.kieu||'trung', 0);
  o.innerHTML = ktCheDoHTML()+ktTheHTML(t)+ktChonHTML(t);
}
function ktToanPGDHTML(){
  var x = KT_BC && KT_BC.k37; if(!x) return '<p class="ghi">Chưa nạp BC0437 — bảng tổ vẫn xem được (số liệu Mẫu 31) nhưng không có điểm chấm, xếp loại.</p>';
  var dem = {}; x.rows.forEach(function(o){ dem[o.xepLoai||'—'] = (dem[o.xepLoai||'—']||0)+1; });
  return '<p class="ghi">BC0437 '+coChuHTML(slKyChu(x.e.ky))+': <b>'+x.rows.length+'</b> tổ · '+['Tốt','Khá','Trung bình','Yếu'].map(function(k){ return k+' <b>'+(dem[k]||0)+'</b>'; }).join(' · ')+'</p>';
}
function ktHoi38(xa, dv){
  var x = KT_BC && KT_BC.k38; if(!x) return null;
  var ut = x.rows.find(function(o){ return o.phan==='ut' && o.xa===xa && o.dv===dv; }), cd = x.rows.find(function(o){ return o.phan==='cd' && o.xa===xa && o.dv===dv; });
  return ut || cd ? {ut:ut, cd:cd, ngay:x.e.ky} : null;
}
function ktBangToHTML(C){
  var K = KT_K, T = K.to;
  var ds = Object.keys(T).map(function(m){ return T[m]; }).filter(function(t){ return !toLaTT(t) && pvLoc(C, t); })
    .sort(function(a, b){ return ((a.tenDiemDu||'')+'|'+String(a.dv||'')+'|'+(a.ten||'')).localeCompare((b.tenDiemDu||'')+'|'+String(b.dv||'')+'|'+(b.ten||''), 'vi'); });
  if(!ds.length) return '<div class="rong">Không có tổ trong phạm vi.</div>';
  var dem = {}, coBC = !!(KT_BC && KT_BC.k37);
  var h = ds.map(function(t, i){
    var s = ktSoTo(t); if(s.xl) dem[s.xl] = (dem[s.xl]||0)+1;
    return '<tr onclick="ktChonTo(\''+t.ma+'\')" title="Bấm để chọn hộ kiểm tra"><td class="c">'+(i+1)+'</td><td>'+t.ma+'</td><td class="to-ten"><b>'+coChuHTML(t.ten||'')+'</b></td><td>'+coChuHTML(t.tenThon||'')+'</td><td>'+coChuHTML(tdnHoi(t.dv))+'</td>'+
      '<td class="s">'+(s.stv||'')+'</td><td class="s">'+ktTr(s.dn)+'</td><td class="s">'+(s.qh ? ktTr(s.qh) : '')+'</td><td class="s">'+(s.lt ? ktTr(s.lt) : '')+'</td><td class="s">'+ktTr(s.tg)+'</td>'+
      '<td class="s">'+(s.diem!=='' && s.diem!==undefined ? String(s.diem).replace('.', ',') : '')+'</td><td class="'+(KT_XL_LOP[s.xl]||'')+'">'+coChuHTML(s.xl||'')+'</td></tr>';
  }).join('');
  var hoi = '';
  var dvs = {}; ds.forEach(function(t){ dvs[String(t.dv||'')] = 1; });
  var xaMa = ds[0].xa;
  Object.keys(dvs).sort().forEach(function(dv){ var r = ktHoi38(xaMa, dv); if(!r) return; var u = r.ut || {}, c = r.cd || {};
    hoi += '<div>'+coChuHTML(tdnHoi(dv))+': '+(u.soTo!==undefined ? '<b>'+u.soTo+'</b> tổ tại <b>'+u.apCo+'</b>/'+u.apTong+' ấp · <b>'+tdnTien(u.soKH)+'</b> khách · dư nợ <b>'+tdnTr(u.dn)+'</b> · tiết kiệm '+tdnTr(u.tg) : '')+
      (c.tong!==undefined ? ' │ chấm điểm: Tốt '+c.tot+' · Khá '+c.kha+' · TB '+c.tb+' · Yếu '+c.yeu : '')+'</div>'; });
  return '<div class="to-the"><div class="to-the-ten"><b>'+ds.length+'</b> tổ · '+coChuHTML(pvChu(C, K))+'</div>'+
    '<div class="to-the-so">'+(coBC ? 'Số liệu tổ theo BC0437 '+coChuHTML(slKyChu(KT_BC.k37.e.ky))+' · ' : 'Chưa nạp BC0437 — số liệu tổ tính từ '+coChuHTML(K.hsTen)+' · ')+
      ['Tốt','Khá','Trung bình','Yếu'].map(function(k){ return k+' <b>'+(dem[k]||0)+'</b>'; }).join(' · ')+' · bấm 1 dòng để chọn hộ kiểm tra</div>'+
    (hoi ? '<div class="kt-hoi"><span class="nhan-nhom">BC0438 — ủy thác theo hội</span>'+hoi+'</div>' : '')+'</div>'+
    '<div class="to-bang-cuon"><table class="to-bang chon"><thead><tr><th>STT</th><th>Mã tổ</th><th>Tổ trưởng</th><th>Ấp</th><th>Hội</th><th>Tổ viên</th><th>Dư nợ (tr)</th><th>Quá hạn</th><th>Lãi tồn</th><th>Tiết kiệm</th><th>Điểm</th><th>Xếp loại</th></tr></thead><tbody>'+h+'</tbody></table></div>';
}
function ktTheHTML(t){
  var s = ktSoTo(t);
  return '<div class="to-the"><div class="to-the-ten">Tổ <b>'+coChuHTML(t.ten||'')+'</b> (mã '+t.ma+') <span class="to-the-phu">· '+coChuHTML([t.tenThon ? 'Ấp '+String(t.tenThon).replace(/^(ấp|ap)\s+/i, '') : '', t.tenXa, tdnHoi(t.dv)].filter(Boolean).join(' · '))+'</span></div>'+
    '<div class="to-the-so">'+coChuHTML(s.nguon)+' '+ngayVNsl(s.ngay)+': <b>'+(s.stv||0)+'</b> tổ viên · dư nợ <b>'+ktTr(s.dn)+'</b> tr · QH '+ktTr(s.qh)+' ('+ktPT(s.tlQH)+'%) · khoanh '+ktTr(s.kn)+' ('+ktPT(s.tlKN)+'%) · lãi tồn '+ktTr(s.lt)+' · tiết kiệm '+ktTr(s.tg)+' tr'+
      (s.xl ? ' │ chấm điểm '+(s.ngayXL ? 'tháng '+slThang(s.ngayXL).slice(5, 7)+'/'+slThang(s.ngayXL).slice(0, 4)+' ' : '')+'<b>'+String(s.diem).replace('.', ',')+'</b> · <b class="'+(KT_XL_LOP[s.xl]||'')+'">'+coChuHTML(s.xl)+'</b>' : '')+'</div></div>';
}

/* ---------- phân loại hộ + gợi ý (Mẫu 06 kiểm tra đột xuất) ---------- */
function ktNgayLui(iso, thang){ var p = iso.split('-'), d = new Date(+p[0], +p[1]-1-thang, +p[2]); return ngayISO(d); }
function ktNgayTru(iso, ngay){ var p = iso.split('-'), d = new Date(+p[0], +p[1]-1, +p[2]-ngay); return ngayISO(d); }
function ktMaKV(ds){   /* mã khoản vay: 2 số đầu - 4 số cuối (như mẫu); 4 số cuối trùng trong cùng phiếu → 6 số */
  var dem = {}; ds.forEach(function(m){ var s = String(m.ku||''); dem[s.slice(-4)] = (dem[s.slice(-4)]||0)+1; });
  ds.forEach(function(m){ var s = String(m.ku||''); m._ma = s ? s.slice(0, 2)+'-'+s.slice(dem[s.slice(-4)]>1 ? -6 : -4) : ''; });
}
function ktHo(t){
  var K = KT_K, ns = K.ngay, moi12 = ktNgayLui(ns, 12), moi30 = ktNgayTru(ns, 30), khd3 = ktNgayLui(ns, 3);
  var khd = {}, coKHD = !!slKHD(K.B).length; slKHD(K.B).forEach(function(o){ khd[o.ku] = o; });
  var P = KT_TRUOC && KT_TRUOC.ky===kyLui(K.thang, -1) && KT_TRUOC.co ? KT_TRUOC : null;
  var ra = [];
  toKhach(t).forEach(function(k){
    var mon = k.mon.filter(function(m){ return (m.dn||0)>0; }).sort(function(a, b){ return String(a.ngn||a.nv||'')<String(b.ngn||b.nv||'') ? -1 : 1; });
    if(!mon.length) return;
    var h = {kh:k.kh, ten:k.ten, mon:mon, dn:k.dn, qh:k.qh, kn:k.kn, lt:k.lt, t105:k.t105, ly:[]};
    h.loai = k.qh>0 || k.kn>0;
    h.ngMoi = mon.reduce(function(a, m){ var d = m.ngn || m.nv || ''; return d>a ? d : a; }, '');
    h.moi30 = mon.filter(function(m){ var d = m.ngn || m.nv || ''; return d && d>=moi30 && d<=ns; });
    h.moi12 = !!(h.ngMoi && h.ngMoi>=moi12);
    h.khd = mon.filter(function(m){ return coKHD ? !!khd[m.ku] : (m.ngdg && m.ngdg<=khd3); });
    h.hssv = mon.some(function(m){ return String(m.ct)==='02'; });
    if(P){ var tr = P.t105[k.kh]; h.tkTruoc = tr; h.tkOK = tr===undefined ? k.t105>0 : k.t105>tr; h.tkChu = tr===undefined ? (k.t105>0 ? 'có 105' : 'không có 105') : (k.t105>tr ? '105 tăng' : (k.t105<tr ? '105 giảm' : '105 không tăng')); }
    else { h.tkOK = k.t105>0; h.tkChu = k.t105>0 ? 'có 105 (chưa có tháng trước để so)' : 'không có 105'; }
    h.tot = !h.loai && h.moi12 && h.tkOK && !(h.lt>0) && !h.khd.length;
    h.xau = !h.loai && (h.khd.length>0 || h.lt>0 || !h.tkOK);
    h.uu = h.khd.length ? 1 : h.lt>0 ? 2 : !h.tkOK ? 3 : 9;   /* thứ tự ưu tiên hộ cần quan tâm */
    ra.push(h);
  });
  ktMaKV(ra.reduce(function(a, h){ return a.concat(h.mon); }, []));
  return ra;
}
function ktSoGoiY(n){ return n<=20 ? 6 : n<=40 ? 7 : 8; }
function ktLyDoTot(h){ return 'Hộ tốt: vay mới '+ngayVNsl(h.ngMoi)+', '+h.tkChu+', không lãi tồn'; }
function ktLyDoXau(h){
  if(h.khd.length) return 'KHĐ ≥ 3 tháng: món '+h.khd.map(function(m){ return m._ma; }).join(', ')+(h.khd[0].ngdg ? ' (GD gần nhất '+ngayVNsl(h.khd[0].ngdg)+')' : '');
  if(h.lt>0) return 'Lãi tồn '+tdnTien(h.lt)+' đ';
  return 'Không gửi tiết kiệm đều ('+h.tkChu+')';
}
function ktGoiY(t, kieu, so, tranh){   /* 3.97: tranh = {mã KH: 1} hộ đã gợi ý lượt trước → xếp sau (Gợi ý lại ra lượt hộ khác) · 3.98: bỏ "lần kiểm tra trước" (không theo dõi) */
  var ds = ktHo(t), s = ktSoTo(t), n = so || ktSoGoiY(s.stv || toKhach(t).length);
  tranh = tranh || {};
  var sau = function(h){ return tranh[h.kh] ? 1 : 0; }, xep = function(a){ return a.map(function(h, i){ return [h, i]; }).sort(function(x, y){ return sau(x[0])-sau(y[0]) || x[1]-y[1]; }).map(function(x){ return x[0]; }); };
  var chon = {}, thu = [], them = function(h, ly, bb){ if(chon[h.kh]) return; chon[h.kh] = {ly:ly, bb:!!bb}; thu.push(h); };
  var dung = ds.filter(function(h){ return !h.loai; });
  var tot = dung.filter(function(h){ return h.tot; }).sort(function(a, b){ return a.ngMoi<b.ngMoi ? 1 : -1; });
  var xau = dung.filter(function(h){ return h.xau; }).sort(function(a, b){ return a.uu-b.uu || b.dn-a.dn; });
  var giua = dung.filter(function(h){ return !h.tot && !h.xau; }).sort(function(a, b){ return a.ngMoi<b.ngMoi ? 1 : -1; });
  tot = xep(tot); xau = xep(xau); giua = xep(giua);
  dung.filter(function(h){ return h.moi30.length; }).forEach(function(h){ them(h, 'Giải ngân dưới 30 ngày ('+ngayVNsl(h.moi30[0].ngn||h.moi30[0].nv)+') — 727: kiểm tra 100%', true); });
  var doDu = function(nhom, ly){ nhom.forEach(function(h){ if(thu.length<n) them(h, ly(h)); }); };
  var boSung = function(h){ return 'Bổ sung cho đủ số hộ'+(h.xau ? ' — '+ktLyDoXau(h) : ''); };
  if(kieu==='tot'){ doDu(tot, ktLyDoTot); doDu(giua, boSung); doDu(xau, boSung); }
  else if(kieu==='xau'){ doDu(xau, ktLyDoXau); doDu(giua, boSung); doDu(tot, boSung); }
  else {   /* trung hòa: 2 hộ có món KHĐ ≥ 3 tháng (thiếu thì lãi tồn, không gửi TK) + còn lại hộ tốt */
    var can = Math.min(2, n), co = 0;
    xau.forEach(function(h){ if(co<can && !chon[h.kh]){ them(h, ktLyDoXau(h)); co++; } });
    doDu(tot, ktLyDoTot); doDu(giua, boSung); doDu(xau, boSung);
  }
  if(dung.some(function(h){ return h.hssv; }) && !thu.some(function(h){ return h.hssv; })){   /* có HSSV mà chưa chọn → thay hộ chọn sau cùng (không bắt buộc) */
    var hs = (kieu==='xau' ? xau.concat(giua, tot) : tot.concat(giua, xau)).filter(function(h){ return h.hssv; })[0];
    if(hs){
      for(var i=thu.length-1;i>=0 && thu.length>=n;i--){ var x = thu[i]; if(chon[x.kh].bb || (kieu==='trung' && x.xau && !x.tot && i<2)) continue; delete chon[x.kh]; thu.splice(i, 1); break; }
      them(hs, 'Có món HSSV (≥ 1 món HSSV)'+(hs.tot ? ' — '+ktLyDoTot(hs) : hs.xau ? ' — '+ktLyDoXau(hs) : ''));
    }
  }
  return {to:t.ma, kieu:kieu, so:n, goiY:ktSoGoiY(s.stv || toKhach(t).length), chon:chon, ds:ds, daGoi:{}};
}
function ktDoiKieu(k){ var C = ktCH(); C.kieu = k; luu(); var t = KT_K.to[C.to]; KT_CHON = ktGoiY(t, k, KT_CHON ? KT_CHON.so : 0); ktVeThe(); }
function ktDoiSo(d){ var C = ktCH(), t = KT_K.to[C.to]; var n = Math.max(1, Math.min(30, (KT_CHON ? KT_CHON.so : 6)+d)); KT_CHON = ktGoiY(t, C.kieu||'trung', n); ktVeThe(); }
function ktGoiYLai(){   /* 3.97: mỗi lần bấm ra lượt hộ khác — tránh các hộ đã gợi ý ở các lượt trước (giữ hộ bắt buộc); hết hộ mới thì quay vòng */
  var C = ktCH(), t = KT_K.to[C.to], X = KT_CHON, so = X ? X.so : 0, da = X && X.to===t.ma ? Object.assign({}, X.daGoi || {}) : {};
  if(X && X.to===t.ma) Object.keys(X.chon).forEach(function(k){ if(!X.chon[k].bb) da[k] = 1; });
  var moi = ktGoiY(t, C.kieu||'trung', so, da), conMoi = moi.ds.filter(function(h){ return !h.loai && !da[h.kh]; }).length;
  if(!conMoi){ da = {}; moi = ktGoiY(t, C.kieu||'trung', so, X ? (function(){ var o = {}; Object.keys(X.chon).forEach(function(k){ if(!X.chon[k].bb) o[k] = 1; }); return o; })() : {}); bao('Đã gợi ý hết các hộ của tổ — quay vòng lại từ đầu.', 4); }
  moi.daGoi = da; KT_CHON = moi; ktVeThe();
}
function ktTich(kh, v){ if(!KT_CHON) return; if(v) KT_CHON.chon[kh] = KT_CHON.chon[kh] || {ly:'Anh chọn thêm', bb:false}; else delete KT_CHON.chon[kh]; ktVeThe(); }
function ktDaChon(){ if(!KT_CHON) return []; var c = KT_CHON.chon; return KT_CHON.ds.filter(function(h){ return c[h.kh]; }).sort(ktTheoKH); }
var KT_KIEU = [['tot','👍 Hộ tốt'], ['xau','⚠ Hộ cần quan tâm'], ['trung','⚖ Trung hòa (6 tốt + 2 KHĐ)']];
function ktChonHTML(t){
  var X = KT_CHON, C = ktCH(), dc = ktDaChon(), soMon = 0, dn = 0, coHS = X.ds.some(function(h){ return !h.loai && h.hssv; });
  dc.forEach(function(h){ soMon += h.mon.length; h.mon.forEach(function(m){ dn += m.dn||0; }); });
  var ds = (KT_LOC==='goi' ? X.ds.filter(function(h){ return X.chon[h.kh]; }) : X.ds.slice()).sort(ktTheoKH);   /* 3.98: theo mã KH */
  var h = ds.map(function(x, i){ var c = X.chon[x.kh];
    return ktHoDongHTML({stt:i+1, h:x, lop:c ? 'kt-co' : '', chon:'<input type="checkbox"'+(c ? ' checked' : '')+' onchange="ktTich(\''+x.kh+'\',this.checked)" aria-label="Chọn hộ">',
      mon:x.mon.map(function(m){ return ktMonDong(m); }).join(''), ghi:ktGhiHo(x, c ? c.ly : (x.loai ? '' : x.tot ? ktLyDoTot(x) : x.xau ? ktLyDoXau(x) : ''))}); }).join('');
  var nBB = Object.keys(X.chon).filter(function(k){ return X.chon[k].bb; }).length;
  var nTot = X.ds.filter(function(h){ return h.tot; }).length, nXau = X.ds.filter(function(h){ return h.xau; }).length, nLoai = X.ds.filter(function(h){ return h.loai; }).length, nKhac = X.ds.length-nTot-nXau-nLoai;
  var kk = C.kieu||'trung', thieu = kk==='tot' && nTot<X.so ? 'chỉ có '+nTot+' hộ tốt — bổ sung hộ khác cho đủ số' : kk==='xau' && nXau<X.so ? 'chỉ có '+nXau+' hộ cần quan tâm — bổ sung hộ khác cho đủ số' : kk==='trung' && nTot<X.so-2 ? 'chỉ có '+nTot+' hộ tốt — Trung hòa bổ sung bằng hộ cần quan tâm / hộ khác (nên kết quả có thể giống kiểu khác)' : '';
  return '<div class="kt-chon"><div class="nhan-nhom">Chọn hộ kiểm tra — Mẫu 06 kiểm tra đột xuất</div>'+
    '<div class="kt-kieu">'+KT_KIEU.map(function(k){ return '<button type="button" class="to-loc'+((C.kieu||'trung')===k[0] ? ' bat' : '')+'" data-lenh="ktk.kieu" data-k="'+k[0]+'">'+k[1]+'</button>'; }).join('')+
    '<span class="kt-so">Số hộ <button type="button" class="nho" data-lenh="ktk.so" data-d="-1" aria-label="Bớt 1 hộ">−</button><b>'+X.so+'</b><button type="button" class="nho" data-lenh="ktk.so" data-d="1" aria-label="Thêm 1 hộ">+</button> <small>(gợi ý '+X.goiY+')</small></span>'+
    '<button type="button" class="nho" data-lenh="ktk.goiYLai">↺ Gợi ý lại</button></div>'+
    '<div class="kt-nhom-so"><small>Tổ có <b>'+nTot+'</b> hộ tốt · <b>'+nXau+'</b> hộ cần quan tâm · <b>'+nKhac+'</b> hộ khác · <b>'+nLoai+'</b> hộ quá hạn / khoanh'+(thieu ? ' — <span class="vang">'+thieu+'</span>' : '')+(Object.keys(X.daGoi||{}).length ? ' · ↺ lượt mới (tránh '+Object.keys(X.daGoi).length+' hộ đã gợi ý)' : '')+'</small></div>'+
    '<div class="to-the-so">Đã chọn <b>'+dc.length+'</b> hộ · <b>'+soMon+'</b> món · dư nợ '+ktTr(dn)+' tr'+(nBB ? ' · '+nBB+' hộ giải ngân dưới 30 ngày (bắt buộc)' : '')+
      (coHS && !dc.some(function(x){ return x.hssv; }) ? ' · <b class="do">tổ có HSSV nhưng chưa chọn món HSSV</b>' : '')+(dc.length>X.so ? ' · <span class="vang">nhiều hơn số gợi ý do món mới dưới 30 ngày / anh chọn thêm</span>' : '')+'</div>'+
    '<div class="kt-loc"><button type="button" class="to-loc'+(KT_LOC==='goi' ? ' bat' : '')+'" data-lenh="ktk.loc" data-l="goi">Đã chọn <b>'+dc.length+'</b></button><button type="button" class="to-loc'+(KT_LOC==='tat' ? ' bat' : '')+'" data-lenh="ktk.loc" data-l="tat">Tất cả hộ còn dư nợ <b>'+X.ds.length+'</b></button></div>'+
    '<div class="to-bang-cuon"><table class="to-bang kt-bang">'+KT_HO_TH+'<tbody>'+(h || '<tr><td colspan="8" class="rong">Chưa chọn hộ nào — bấm “Tất cả hộ còn dư nợ” để tích.</td></tr>')+'</tbody></table></div>'+
    ktKBKhung('dx', ktHoiDsXa((function(){ var x = {}; x[t.xa] = 1; return x; })()))+ktDXTom(t)+
    '<div class="hang-nut kt-in"><label class="kt-ngay-in"><span>Ngày kiểm tra</span><input id="kb-ngay" type="date" value="'+coChuHTML(KT_KB.ngay||'')+'" onchange="ktDocKB()" aria-label="Ngày kiểm tra"></label>'+   /* 3.114: ngày kiểm tra cạnh nút In (trống = ghi tay) */
    '<span class="sl-phu">📄 Mẫu 06 · Phiếu KT sử dụng vốn:</span>'+ktXuatNut('m06')+'<span class="sl-phu">📄 Mẫu 16 · Biên bản KT tổ:</span>'+ktXuatNut('m16')+GD.nut({chu:'📋 Mẫu 04', lenh:'ktk.dx04', tit:'Báo cáo tổng hợp Mẫu 04 cho tổ này (kiểm tra đột xuất)'})+(typeof ktttIn==='function' ? GD.nut({chu:'📋 Tóm tắt tổ', lenh:'kttt.in', tit:'Tóm tắt tình hình tổ 1 mặt A4 mang đi kiểm tra (js/71)'}) : '')+'</div>'+   /* 3.329 (anh chốt ý 4): đột xuất có Mẫu 04 */
    '<p class="ghi">Hộ tốt = có món giải ngân trong 12 tháng, số dư 105 tăng so với tháng trước (chưa nạp tháng trước thì xét có 105), không lãi tồn, không món KHĐ. Cần quan tâm = món không giao dịch ≥ 3 tháng (file mẫu 14; chưa nạp thì xét ngày GD gần nhất), lãi tồn, không gửi TK đều. '+
      'Hộ có quá hạn / khoanh không gợi ý (kiểm tra riêng) — vẫn tích tay được. 105 tăng / giảm là suy ra từ số dư 2 tháng, không phải lịch sử nộp từng kỳ.</p></div>';
}

/* ---------- khai báo khi in (mặc định trống) → Word đúng khuôn / In PDF ---------- */
function ktKhaiBao(mau){ ktInHop([mau==='m16' ? 'm16' : (mau==='m04' ? 'm04' : 'm06')], '', ktHoiDs()); }   /* 3.114: mở hộp chọn khi in để đặt trước lựa chọn */
function ktXuatNut(mau){ var n = mau==='m06' ? 'Mẫu 06' : 'Mẫu 16'; return GD.nut({chu:'🖨 In '+n, lenh:'ktk.xuat', du:{m:mau, c:'in'}})+GD.nut({chu:'📄 Word '+n, lenh:'ktk.xuat', du:{m:mau, c:'word'}, chinh:1}); }   /* 3.329: data-lenh */
/* ---------- 3.98 (anh chốt): khai báo nằm ngay trong tab của mẫu (khung ✎ thu gọn được), lưu lâu dài trừ ngày; cán bộ kiểm tra lấy theo bảng Hội – xã ---------- */
var KT_KB_LUU = ['dv','cbtu','cb2','cv2'];
function ktCanBo(t, v){   /* 3.114: có v.ng1 (chọn khi in) → theo vai trò */
  if(v && v.ng1==='go') return {cb:String(v.cb1t||'').trim(), cv:String(v.cv1t||'').trim()};   /* 3.323: khai tên cán bộ kiểm tra (đoàn ngân hàng / đoàn khác) */
  if(v && v.ng1!==undefined) return ktNguoi(t, v.ng1);   /* cán bộ 1 Mẫu 06 / 16 = cán bộ của Hội – xã phụ trách tổ (bảng khai báo); "Để trống" → dòng chấm điền tay */
  var tu = v.cbtu!==undefined ? v.cbtu : ((D.cauHinh.ktKBLuu || {}).cbtu || ''); if(tu==='trong' || !t || !t.xa) return {cb:'', cv:''};
  var kb = ktHoiKB(ktHoiKhoa(t)); if(kb.pct) return {cb:kb.pct, cv:ktChuan(t).pho};   /* 3.113: mặc định Phó Chủ tịch (anh chốt) */
  return {cb:kb.cb || '', cv:kb.cbcv || ''};   /* khai trước 3.113 (cán bộ không phải Phó CT) */
}
function ktKBKhung(loai, dsHoi){   /* 3.114: lựa chọn in chuyển vào hộp chọn khi bấm In / Xem (ktInHop); trong tab chỉ còn dòng nhắc khai báo Hội */
  return ktHdtNhac(dsHoi, ['pct']);
}
/* ---------- 3.114 (anh chốt): HỘP CHỌN KHI IN — mỗi mẫu 1 phần, nhớ lựa chọn lần trước (D.cauHinh.ktIn[mẫu], đồng bộ Drive);
   người kiểm tra / người ký chọn theo VAI TRÒ, tên lấy theo 🏛 Khai báo Hội đoàn thể của Hội phụ trách từng tổ ---------- */
var KT_IN_MD = {m06:{md:'', ng1:'pct', dvc:'', dvt:'', cb1t:'', cv1t:''}, m16:{nx:'so', nxud:'so', nxtt:'so', nxkn:'so', b2:'', b2o:null, ng1:'pct', ng2:'', dvc:'', dvt:'', cb1t:'', cv1t:'', cb2t:'', cv2t:''},   /* 3.323: dvc đơn vị (''=Hội · cham · go + dvt) · ng1 / ng2 'go' = khai tên (cb1t, cv1t · cb2t, cv2t) */ m04:{nx:'so', nxto:'so', nxkn:'so', ng1:'pct', ng2:''}, kh:{ky:'ct'}};
var KT_IN_TEN = {m06:'Mẫu 06/TD · Phiếu kiểm tra sử dụng vốn', m16:'Mẫu 16/TD · Biên bản kiểm tra Tổ', m04:'Mẫu 04/BC-TH · Báo cáo tổng hợp', kh:'Kế hoạch KTGS 01/KH'};
var KT_IN_VT = [['pct','Phó Chủ tịch'], ['ct','Chủ tịch'], ['uv1','Ủy viên BTV 1'], ['uv2','Ủy viên BTV 2'], ['uv3','Ủy viên BTV 3'], ['','Để trống (ghi tay)']];   /* 3.154 (anh chốt): 1 Hội = 1 CT, 1 PCT, 3 BTV */
var KT_IN_X = null;
var KT_NX_OP = [['so','Ghi theo số liệu (sửa trong Word)'], ['','Để chấm (ghi tay)']];   /* 3.378 */
function ktNxCo(v, p){ var x = v && v['nx'+p]; return (x!==undefined ? x : ktNxMacDinh(v || {}))==='so'; }   /* 3.378: phần p (ud · tt · kn · to) ghi theo số liệu? — v cũ chỉ có nx thì theo nx */   /* hộp đang mở: {ds:[mẫu], nut, hoi:[Hội – xã]} */
/* 3.323 (anh 23/10 "kiểm tra đột xuất: đơn vị kiểm tra chấm ghi tay hoặc khai báo tên đoàn trên cả Mẫu 06 và 16, tên cán bộ cũng vậy; số liệu ghi sẵn, nội dung kiểm tra để trống / chấm / ghi đầy đủ — chọn như khai báo riêng"):
   🎯 Kiểm tra đột xuất có BỘ LỰA CHỌN RIÊNG (D.cauHinh.ktIn['dx_'+mẫu]) — lần đầu chép từ lựa chọn chung; các chế độ khác giữ như cũ */
function ktInKhoa(mau){ return typeof ktBoKhoa==='function' ? ktBoKhoa(mau) : mau; }   /* 3.327: theo bộ khai báo đang dùng (js/56-ktgs-bo.js) */
function ktInLay(mau){ var S = D.cauHinh.ktIn || {}, k = ktInKhoa(mau), L = S[k] || (k!==mau ? S[mau] : null) || {}, M = KT_IN_MD[mau], r = {};
  Object.keys(M).forEach(function(k){ r[k] = L[k]!==undefined ? L[k] : (/^nx./.test(k) && L.nx!==undefined ? L.nx : M[k]); });   /* 3.378: từng phần nhận xét — chưa chọn riêng thì theo lựa chọn chung cũ */
  if(r.b2==='cham') r.b2 = '';   /* 3.378 (anh): Bảng II không còn chấm trong ô — lựa chọn cũ "chấm" thành để trống */
  if(r.b2o){ var b2o = {}; Object.keys(r.b2o).forEach(function(i){ var x = r.b2o[i]; b2o[i] = x && x.c==='cham' ? {c:'trong'} : x; }); r.b2o = b2o; }
  if(mau==='m06' && L.md===undefined && D.cauHinh.ktMucDich==='nganh') r.md = 'nganh';   /* lựa chọn cột mục đích trước 3.114 */
  if(L.dvc===undefined && 'dvc' in M){ var cu = String((D.cauHinh.ktKBLuu || {}).dv || '').trim(); if(cu==='-') r.dvc = 'cham'; else if(cu){ r.dvc = 'go'; r.dvt = cu; } }   /* ô "Đơn vị kiểm tra" gõ ở Tùy chọn khác trước 3.323 */
  return r; }
function ktInV(mau){ var L = D.cauHinh.ktKBLuu || {}, v = Object.assign({ngay:KT_KB.ngay||'', dv:L.dv||'', cb2:L.cb2||'', cv2:L.cv2||''}, ktInLay(mau));
  if(v.dvc==='cham') v.dv = '-'; else if(v.dvc==='go') v.dv = String(v.dvt||'').trim() || '-'; else if(v.dvc!==undefined) v.dv = '';   /* 3.323: '-' = dòng chấm ghi tay (ktDonVi) */
  if(v.ng2==='go'){ v.cb2 = v.cb2t || ''; v.cv2 = v.cv2t || ''; }
  return v; }
function ktNguoi(t, vt){   /* vai trò → {cb, cv}: pct · ct · uv1…uv5 · '' (để trống); chưa khai tên → in chức vụ, tên dòng chấm */
  if(!vt || vt==='go' || !t || !t.xa) return {cb:'', cv:''};
  var kb = ktHoiKB(ktHoiKhoa(t)), c = ktChuan(t);
  if(vt==='pct') return kb.pct ? {cb:kb.pct, cv:c.pho} : (kb.cb ? {cb:kb.cb, cv:kb.cbcv||''} : {cb:'', cv:c.pho});   /* kb.cb = khai trước 3.113 */
  if(vt==='ct') return {cb:kb.ct || kb.ky || '', cv:c.ky};
  if(/^uv\d$/.test(vt)) return {cb:kb[vt] || '', cv:c.uv};
  return {cb:'', cv:''};
}
function ktKyKH(kb, v){ var k = v && v.ky!==undefined ? v.ky : 'ct'; return k==='ct' ? (kb.ct || kb.ky || '') : (k==='pct' ? (kb.pct || '') : ''); }   /* 3.114: người ký KH — chức danh luôn CHỦ TỊCH */
function ktInVTTen(ops, hoi, gt){   /* 3.127 (anh yêu cầu): ô chọn vai trò kèm tên đã khai — 1 Hội: "Phó Chủ tịch — Trần Thị B"; nhiều Hội khác tên: "… — theo từng Hội (n người)";
     chưa khai: "… — chưa khai tên"; ô Phó 2–3 / Ủy viên không Hội nào khai thì ẩn (trừ ô đang chọn) */
  hoi = hoi || [];
  return ops.map(function(o){ if(!o[0] || o[0]==='go') return o; var ten = [], cv = '';
    hoi.forEach(function(h){ var n = ktNguoi(h.t, o[0]); if(!cv && n.cv) cv = n.cv; if(n.cb && ten.indexOf(n.cb)<0) ten.push(n.cb); });
    if(!ten.length && o[0]!=='ct' && o[0]!=='pct' && o[0]!==gt) return null;
    var nhan = cv && o[0]==='ct' ? cv : cv && /^pct/.test(o[0]) ? cv+(o[0].length>3 ? ' '+o[0].slice(3) : '') : o[1];   /* chức danh theo Hội (Đoàn: Bí thư / Phó Bí thư) */
    return [o[0], nhan+' — '+(ten.length===1 ? ten[0] : ten.length ? 'theo từng Hội ('+ten.length+' người)' : 'chưa khai tên')]; }).filter(Boolean);
}
function ktInChon(id, nhan, gt, ops){ return '<label class="kt-kb"><span>'+nhan+'</span><select id="'+id+'" onchange="ktInDoc()">'+ops.map(function(o){ return '<option value="'+o[0]+'"'+(o[0]===gt ? ' selected' : '')+'>'+coChuHTML(o[1])+'</option>'; }).join('')+'</select></label>'; }
function ktInThieu(vt, hoi){   /* Hội chưa khai tên cho vai trò đã chọn → nhắc cam */
  if(!vt || vt==='go') return ''; var x = (hoi||[]).filter(function(h){ return !ktNguoi(h.t, vt).cb; }).map(function(h){ return ktHoiKB(h.k).ten || ktHoiTenTD(h.t); });
  return x.length ? '<div class="sl-phu kt-in-cam">⚠ Chưa khai tên: '+coChuHTML(x.slice(0, 3).join('; ')+(x.length>3 ? ' và '+(x.length-3)+' Hội – xã khác' : ''))+' — in chức vụ, tên để dòng chấm. <a href="#" onclick="event.preventDefault();ktHoiKBHop()">🏛 Khai báo</a></div>' : '';
}
function ktInPhan(mau, hoi){
  var o = ktInLay(mau), id = function(k){ return 'ki-'+mau+'-'+k; }, h = '<div class="kt-in-phan"><div class="nhan-nhom">'+KT_IN_TEN[mau]+(mau==='m06' || mau==='m16' ? ' <span class="kt-nh'+(ktInKhoa(mau)!==mau ? ' vang' : '')+'">'+KT_BO[ktBoDang()].ten+'</span>' : '')+'</div>';
  if(mau==='m06') h += ktInChon(id('md'), 'Cột Mục đích', o.md, [['','Để trống (ghi tay theo hồ sơ)'], ['nganh','In sẵn mục đích (theo hệ thống, rút gọn)']])+'<div class="sl-phu">Tên ngành rút gọn: <a href="#" onclick="event.preventDefault();ktNganhHop()">⚙ Bảng ngành kinh tế</a></div>';
  if(mau==='m16') h += ktInChon(id('nxud'), 'III.1 Ưu điểm', o.nxud, KT_NX_OP)+ktInChon(id('nxtt'), 'III.2 Tồn tại', o.nxtt, KT_NX_OP)+ktInChon(id('nxkn'), 'III.3 Kiến nghị', o.nxkn, KT_NX_OP)+   /* 3.378 (anh): 3 phần chọn riêng */
    ktInChon(id('b2'), 'Bảng II (kết quả kiểm tra)', o.b2, [['','Để trống (ghi tay)'], ['dien','Điền đầy đủ theo 727 (kèm 2 dòng có số)']])+ktB2TungOHTML(mau, o);
  if(mau==='m04') h += ktInChon(id('nxto'), 'IV.1 Nhận xét (đối với Tổ)', o.nxto, KT_NX_OP)+ktInChon(id('nxkn'), 'IV.2 Kiến nghị (a, b, c)', o.nxkn, KT_NX_OP);
  if(mau==='kh') return h+ktInChon(id('ky'), 'Người ký (luôn ghi CHỦ TỊCH)', o.ky, ktInVTTen([['ct','Chủ tịch'], ['pct','Phó Chủ tịch'], ['','Để trống (ký tay)']], hoi, o.ky))+ktInThieu(o.ky, hoi)+'</div>';
  var go = function(k, nhan, ph){ return '<label class="kt-kb kt-in-go"><span>'+nhan+'</span><input id="'+id(k)+'" value="'+coChuHTML(o[k]||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="ktInDoc()"></label>'; };
  var VTG = mau==='m04' ? KT_IN_VT : KT_IN_VT.concat([['go','Khai báo tên (gõ)']]);   /* 3.323 */
  if(mau==='m06' || mau==='m16') h += ktInChon(id('dvc'), 'Đơn vị kiểm tra'+(mau==='m16' ? ' / Đoàn kiểm tra' : ''), o.dvc || '', [['','Theo Hội phụ trách tổ'], ['cham','Để chấm (ghi tay)'], ['go','Khai báo tên đoàn kiểm tra']])+
    (o.dvc==='go' ? go('dvt', 'Tên đơn vị / đoàn', 'vd Đoàn kiểm tra NHCSXH PGD …') : '');
  h += ktInChon(id('ng1'), mau==='m06' ? 'Người kiểm tra' : 'Người kiểm tra 1'+(mau==='m04' ? ' (Trưởng đoàn)' : ''), o.ng1, ktInVTTen(VTG, hoi, o.ng1))+ktInThieu(o.ng1, hoi)+
    (o.ng1==='go' && mau!=='m04' ? go('cb1t', 'Họ tên', 'trống = dòng chấm')+go('cv1t', 'Chức vụ', 'trống = dòng chấm') : '');
  if(mau!=='m06') h += ktInChon(id('ng2'), 'Người kiểm tra 2', o.ng2, ktInVTTen(VTG, hoi, o.ng2))+ktInThieu(o.ng2, hoi)+
    (o.ng2==='go' && mau!=='m04' ? go('cb2t', 'Họ tên 2', 'trống = dòng chấm')+go('cv2t', 'Chức vụ 2', 'trống = dòng chấm') : '');
  return h+'</div>';
}
/* 3.324 (anh 23/10 "lên 3.323 vẫn chưa thấy thay đổi"): lựa chọn đột xuất hiện ngay trong tab — dòng tóm tắt + nút mở khai báo (không cần bấm In mới thấy) */
function ktDXTom(t){
  if(!ktDXTom.dk && typeof GD!=='undefined'){ ktDXTom.dk = 1; GD.dangKy('ktdx', {khai:function(){ ktDXKhai(); }}); }
  if(typeof ktCheDo==='function' && ktCheDo()!=='dx') return '';
  var a = ktInLay('m06'), b = ktInLay('m16'), VT = {}; KT_IN_VT.forEach(function(x){ VT[x[0]] = x[1]; });
  var dv = function(x){ return x.dvc==='go' ? '<b>'+coChuHTML(x.dvt || '(chưa gõ tên)')+'</b>' : x.dvc==='cham' ? 'để chấm ghi tay' : 'theo Hội'; };
  var ng = function(x, k, ten){ var v = x[k]; return v==='go' ? '<b>'+coChuHTML(x[ten] || '(chưa gõ tên)')+'</b>' : v ? coChuHTML(VT[v] || v) : 'để trống'; };
  var b2 = {'':'để trống', dien:'điền đầy đủ'}[b.b2 || ''] || 'để trống', nxp = function(p){ return ktNxCo(b, p) ? 'số liệu' : 'chấm'; };
  return '<div class="kt-dx-kb"><span class="kt-nh vang">🎯 Khai báo đột xuất</span> <small>Đơn vị kiểm tra: '+dv(a)+(a.dvc!==b.dvc || a.dvt!==b.dvt ? ' (Mẫu 16: '+dv(b)+')' : '')+
    ' · Người kiểm tra: '+ng(a, 'ng1', 'cb1t')+(b.ng2 ? ' · Người 2 (Mẫu 16): '+ng(b, 'ng2', 'cb2t') : '')+' · Bảng II Mẫu 16: '+b2+' · Nhận xét: Ưu điểm '+nxp('ud')+', Tồn tại '+nxp('tt')+', Kiến nghị '+nxp('kn')+'</small> '+
    '<button type="button" class="nho" data-lenh="ktdx.khai">✎ Chọn / khai tên</button></div>';
}
/* 3.326: nút theo data-lenh — đăng ký khi vẽ dòng (GD nạp sau file này) */
function ktDXKhai(){ var C = ktCH(), t = KT_K && KT_K.to[C.to]; ktInHop(['m06', 'm16'], '', ktHoiCuaTo(t ? [t] : []), 1); }
function ktInNut(inJs, wordJs){ return '<button class="nho" onclick="'+inJs+'">🖨 In / PDF</button><button class="nho chinh" onclick="'+wordJs+'">📄 Word</button>'; }
function ktInNutXem(js){ return '<button class="nho chinh" onclick="'+js+'">👁 Xem trước</button>'; }
function ktInHop(ds, nut, hoi, veThe, ve){   /* ve = vẽ lại hộp đang mở (giữ bộ đang chọn); mở mới → bộ mặc định của khối */
  if(!ve) KT_BO_IN = null;
  KT_IN_X = {ds:ds, nut:nut, hoi:hoi || ktHoiDs(), veThe:veThe || (KT_IN_X && KT_IN_X.veThe && KT_IN_X.ds===ds ? 1 : 0), mo:ve && KT_IN_X ? KT_IN_X.mo : 0, b2mo:ve && KT_IN_X ? KT_IN_X.b2mo : 0};
  KT_IN_X.cu = {}; ds.forEach(function(m){ KT_IN_X.cu[ktInKhoa(m)] = JSON.parse(JSON.stringify(ktInLay(m))); });   /* giá trị trước khi sửa — biết ô nào vừa đổi */
  var L = D.cauHinh.ktKBLuu || {}, co0616 = ds.indexOf('m06')>=0 || ds.indexOf('m16')>=0, mo = KT_IN_X.mo ? ' open' : '';
  var o = function(k, nhan, ph){ return '<label class="kt-kb"><span>'+nhan+'</span><input id="ki-'+k+'" value="'+coChuHTML(L[k]||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="ktInDoc()"></label>'; };
  moHop('<div class="hop-tit">🖨 Chọn khi in</div><div class="hop-phu">Tên người kiểm tra / người ký lấy theo 🏛 Khai báo Hội đoàn thể của Hội phụ trách từng tổ. App nhớ lựa chọn cho lần sau.</div>'+
    (co0616 ? ktBoChonHTML() : '')+'<div class="kt-in-luoi">'+ds.map(function(m){ return ktInPhan(m, KT_IN_X.hoi); }).join('')+'</div>'+(ds.indexOf('m04')>=0 ? ktKN04HTML() : '')+
    (co0616 && ds.indexOf('m06')>=0 ? '<details class="kt-in-khac"'+mo+' ontoggle="if(KT_IN_X)KT_IN_X.mo=this.open"><summary>Tùy chọn khác</summary>'+o('cb2', 'Mẫu 06 — Ông (bà) 2, gõ tay', 'thường để trống')+o('cv2', 'Chức vụ 2', 'trống = dòng chấm')+'</details>' : '')+
    '<label class="kt-hai-mat"><input type="checkbox"'+(ktHaiMat() ? ' checked' : '')+' onchange="D.cauHinh.ktHaiMat=this.checked?1:0;luu()"> In 2 mặt — xuất nhiều tổ / nhiều bản: mỗi bản bắt đầu tờ mới (bản lẻ trang tự thêm 1 trang trắng; Word chắc chắn, In từ trình duyệt là ước lượng)</label>'+   /* 3.124 */
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button>'+(ds.some(function(m){ return m!=='kh'; }) ? '<button class="nho" onclick="ktInDayDu()" title="In sẵn mục đích, gợi ý nhận xét, Bảng II theo 727">✚ Điền đầy đủ</button>' : '')+(nut||'')+'</div>', true);
  if(KT_IN_X.veThe) HOP_KHI_DONG = function(){ if(typeof ktVeThe==='function' && KT_K) ktVeThe(); };   /* 3.324: mở từ dòng Khai báo đột xuất → đóng hộp thì vẽ lại tóm tắt */
}
function ktInDoc(){   /* đọc hộp chọn → lưu (đồng bộ Drive theo cài đặt) → vẽ lại dòng nhắc */
  if(!KT_IN_X) return; var S = D.cauHinh.ktIn = D.cauHinh.ktIn || {};
  KT_IN_X.ds.forEach(function(m){ var km = ktInKhoa(m), X = S[km] = S[km] || (km!==m ? JSON.parse(JSON.stringify(ktInLay(m))) : {});   /* 3.323: đột xuất lưu riêng (lần đầu chép từ chung) */
    Object.keys(KT_IN_MD[m]).forEach(function(k){ var e = document.getElementById('ki-'+m+'-'+k); if(e) X[k] = e.tagName==='INPUT' ? String(e.value||'').replace(/\s+/g, ' ').trim() : e.value; }); if(m==='m16') ktB2Doc(X, m); });
  var CHUNG = ['dvc', 'dvt', 'ng1', 'cb1t', 'cv1t'], a6 = ktInKhoa('m06'), a16 = ktInKhoa('m16'), cu = KT_IN_X.cu || {};   /* 3.324: đơn vị + cán bộ 1 khai ở mẫu nào thì mẫu kia nhận theo */
  if(KT_IN_X.ds.indexOf('m06')>=0 && KT_IN_X.ds.indexOf('m16')>=0) CHUNG.forEach(function(k){ var x = (S[a6]||{})[k], y = (S[a16]||{})[k];
    if(x===y) return; if(x!==(cu[a6]||{})[k]) (S[a16] = S[a16] || {})[k] = x; else if(y!==(cu[a16]||{})[k]) (S[a6] = S[a6] || {})[k] = y; });
  var L = D.cauHinh.ktKBLuu = D.cauHinh.ktKBLuu || {};
  ['cb2','cv2'].forEach(function(k){ var e = document.getElementById('ki-'+k); if(e){ var v = String(e.value||'').replace(/\s+/g, ' ').trim(); if(v) L[k] = v; else delete L[k]; KT_KB[k] = v; } });
  luu(); if(KT_IN_X.tab) ktVeThe(); else ktInHop(KT_IN_X.ds, KT_IN_X.nut, KT_IN_X.hoi, 0, 1);   /* 3.329: màn 🧩 Bộ khai báo trong tab */
}
function ktInDayDu(){ if(!KT_IN_X) return; var S = D.cauHinh.ktIn = D.cauHinh.ktIn || {};
  KT_IN_X.ds.forEach(function(m){ var km = ktInKhoa(m), x = S[km] = S[km] || (km!==m ? JSON.parse(JSON.stringify(ktInLay(m))) : {}); if(m==='m06') x.md = 'nganh'; if(m==='m16'){ x.nx = x.nxud = x.nxtt = x.nxkn = 'so'; x.b2 = 'dien'; } if(m==='m04') x.nx = x.nxto = x.nxkn = 'so'; });
  luu(); if(KT_IN_X.tab) ktVeThe(); else ktInHop(KT_IN_X.ds, KT_IN_X.nut, KT_IN_X.hoi, 0, 1); bao('Đã chọn điền đầy đủ.', 2); }
function ktHoiCuaTo(ds){ var g = {}; ds.forEach(function(t){ if(!t || toLaTT(t) || !t.xa || !t.dv || String(t.dv)==='99') return; var k = ktHoiKhoa(t); if(!g[k]) g[k] = {k:k, t:t, n:0}; g[k].n++; }); return Object.keys(g).map(function(k){ return g[k]; }); }
function ktDocKB(){ ['ngay','dv','cbtu','cb2','cv2','md','nx','b2'].forEach(function(k){ var e = document.getElementById('kb-'+k); if(e) KT_KB[k] = String(e.value||'').trim(); });
  var L = D.cauHinh.ktKBLuu = D.cauHinh.ktKBLuu || {}; KT_KB_LUU.forEach(function(k){ if(document.getElementById('kb-'+k)){ if(KT_KB[k]) L[k] = KT_KB[k]; else delete L[k]; } });
  if(document.getElementById('kb-nx')){ D.cauHinh.ktNhanXet = KT_KB.nx; luu(); }   /* 3.98: nhớ lựa chọn gợi ý nhận xét Mẫu 16 */
  if(document.getElementById('kb-md')){ D.cauHinh.ktMucDich = KT_KB.md; luu(); }
  if(document.getElementById('kb-b2')){ D.cauHinh.ktBang16 = KT_KB.b2; luu(); }   /* 3.111: nhớ lựa chọn Bảng II Mẫu 16 */   /* nhớ lựa chọn cột mục đích lần sau */
  return KT_KB; }
function ktXuat(mau, cach, ok){   /* 3.114: hỏi lựa chọn in trước (ok = đã chọn) */
  var C = ktCH(), t = KT_K && KT_K.to[C.to]; if(!t) return;
  if(mau==='m06' && !ktDaChon().length) return bao('Chưa chọn hộ nào.', 3);
  ktDocKB(); if(!ok) return ktInHop([mau], ktInNut("ktXuat('"+mau+"','in',1)", "ktXuat('"+mau+"','word',1)"), ktHoiCuaTo([t]));
  var v = ktInV(mau), dc = ktDaChon(), ten = (mau==='m06' ? 'Mau 06 Phieu KT su dung von' : 'Mau 16 Bien ban KT to')+' - To '+boDauTen(t.ten||t.ma)+(v.ngay ? ' - '+ngayVNsl(v.ngay).replace(/\//g, '-') : '');
  var gt = mau==='m06' ? ktGiaTri06(t, dc, v) : ktGiaTri16(t, dc, v);
  dongHop();
  if(cach==='word') return ktDocx(mau, gt).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx — khuôn đúng mẫu gốc, chỉ lưu trên máy / Drive của anh.', 7); })
    .catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  inBlob(new Blob([mau==='m06' ? ktHTML06(gt) : ktHTML16(gt)], {type:'text/html'}), ten+'.html');
}
function ktNguoi2(t, v){ return v && v.ng2 && v.ng2!=='go' ? ktNguoi(t, v.ng2) : {cb:(v && v.cb2)||'', cv:(v && v.cv2)||''}; }   /* 3.114: người kiểm tra 2 (16 / 04) — để trống thì dùng ô gõ tay */
function ktNgayP(iso){ var p = String(iso||'').split('-'); return iso ? {d:p[2], m:p[1], y:p[0], y2:p[0].slice(2)} : {d:'', m:'', y:'', y2:''}; }
/* 3.98: chuẩn địa danh dùng chung các mẫu (anh chốt) — xã → "ấp", phường → "khu phố"; trong câu viết thường; luôn kèm "tỉnh Tây Ninh".
   Tên gõ sẵn "Ấp …", "KP …", "Khu phố …", "Thôn …" được bỏ tiền tố rồi ghép lại theo quy tắc (không lặp chữ) */
var KT_TINH = 'Tây Ninh';
function ktLaPhuong(tenXa){ return /^phường\s/i.test(String(tenXa||'').trim()); }
function ktXaTen(tenXa){ return String(tenXa||'').replace(/\s+/g, ' ').trim().replace(/^(xã|phường|thị trấn|đặc khu)\s+/i, ''); }
function ktApTen(th){ return String(th||'').replace(/\s+/g, ' ').trim().replace(/^(ấp|ap|thôn|khu phố|tổ dân phố|khóm|xóm)\s+/i, '').replace(/^(kp|k\.p)(\.|\s)\s*/i, ''); }
function ktCapAp(tenXa){ return ktLaPhuong(tenXa) ? 'khu phố' : 'ấp'; }
function ktApChu(th, tenXa, hoa){ var a = ktApTen(th), c = ktCapAp(tenXa); if(!a) return ''; return (hoa ? c.charAt(0).toUpperCase()+c.slice(1) : c)+' '+a; }   /* hoa = đầu dòng / nhãn */
function ktDiaBan(t){ return [ktApChu(t.tenThon, t.tenXa), ktXaChu(t.tenXa), 'tỉnh '+KT_TINH].filter(Boolean).join(', '); }   /* trong câu: "khu phố …, phường …, tỉnh Tây Ninh" */
function ktTheoKH(a, b){ return String(a.kh||'').localeCompare(String(b.kh||''), 'vi', {numeric:true}) || String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); }   /* 3.98: hộ xếp theo mã KH */
/* 3.93: cột "Mục đích" Mẫu 06 — anh chọn khi in: để trống (ghi tay theo hồ sơ) hoặc in NGÀNH KINH TẾ (Tên PNKT51 của Mẫu 31, rút gọn).
   Mẫu 31 / Mẫu 10 không có cột mục đích vay; PNKT51 là ngành kinh tế của món. Đề xuất rút gọn theo mã (176 ngành có trong số liệu 30/09/2026) — anh chốt:
   chỉ dùng từ chuẩn có trong tên gốc, rút theo hướng chung; anh sửa trong ⚙ Bảng ngành kinh tế (lưu D.cauHinh.ktPnkt, ưu tiên hơn đề xuất);
   ngành mới chưa có trong bảng → tự rút gọn (bỏ phần trong ngoặc, "chưa được phân vào đâu", "còn lại"…). */
var KT_PNKT = {"36000":"Khai thác, cung cấp nước","01412":"Chăn nuôi trâu, bò","85410":"Đào tạo đại học","01213":"Trồng cam, quýt","01215":"Trồng nhãn, vải, chôm chôm","01250":"Trồng cây cao su","39000":"Xử lý ô nhiễm, chất thải","85330":"Đào tạo cao đẳng","56302":"Quán cà phê, giải khát","46900":"Bán buôn tổng hợp","01110":"Trồng lúa","56290":"Dịch vụ ăn uống khác","46326":"Bán buôn đường, sữa, bánh kẹo","01212":"Trồng cây ăn quả nhiệt đới","01219":"Trồng cây ăn quả khác","56101":"Nhà hàng, quán ăn","01411":"Sản xuất giống trâu, bò","96310":"Cắt tóc, làm đầu, gội đầu","46203":"Bán buôn động vật sống","01299":"Trồng cây lâu năm khác","46413":"Bán buôn hàng may mặc","46310":"Bán buôn gạo, ngũ cốc","46202":"Bán buôn hoa và cây","46329":"Bán buôn thực phẩm khác","01490":"Chăn nuôi khác","45420":"Sửa chữa mô tô, xe máy","96390":"Dịch vụ phục vụ cá nhân","41010":"Xây dựng nhà để ở","25920":"Gia công cơ khí","01452":"Chăn nuôi lợn","45200":"Sửa chữa ô tô","85320":"Đào tạo trung cấp","01442":"Chăn nuôi dê, cừu","46324":"Bán buôn cà phê","47822":"Bán lẻ hàng may mặc tại chợ","46332":"Bán buôn đồ uống không cồn","43900":"Xây dựng chuyên dụng khác","47817":"Bán lẻ rau quả tại chợ","46204":"Bán buôn thức ăn gia súc, gia cầm","47224":"Bán lẻ đường, sữa, bánh kẹo","46209":"Bán buôn nông, lâm sản","01214":"Trồng táo, mận","01320":"Nhân, chăm sóc cây giống lâu năm","46201":"Bán buôn thóc, ngô","56309":"Dịch vụ phục vụ đồ uống","46697":"Bán buôn phế liệu, phế thải","14100":"May trang phục","10710":"Sản xuất bánh từ bột","46323":"Bán buôn rau, quả","47990":"Bán lẻ hình thức khác","01220":"Trồng cây lấy quả chứa dầu","97000":"Làm thuê công việc gia đình","96330":"Dịch vụ phục vụ hôn lễ","01462":"Chăn nuôi gà","01291":"Trồng cây cảnh lâu năm","47815":"Bán lẻ thịt tại chợ","03221":"Nuôi cá","46499":"Bán buôn đồ dùng gia đình","92001":"Hoạt động xổ số","01130":"Trồng cây lấy củ có chất bột","47818":"Bán lẻ thực phẩm chín tại chợ","25910":"Rèn, dập, ép, cán kim loại","31001":"Sản xuất giường, tủ, bàn, ghế","10790":"Sản xuất thực phẩm khác","45301":"Bán buôn phụ tùng ô tô","46495":"Bán buôn đồ điện gia dụng","56109":"Dịch vụ ăn uống lưu động","01181":"Trồng rau","49333":"Vận tải hàng hóa","46631":"Bán buôn tre, nứa, gỗ","47591":"Bán lẻ đồ điện gia dụng","01630":"Dịch vụ sau thu hoạch","46694":"Bán buôn cao su","03223":"Nuôi thủy sản khác","46497":"Bán buôn sách, văn phòng phẩm","01282":"Trồng cây dược liệu, hương liệu","01120":"Trồng ngô, cây lương thực","68101":"Mua, bán nhà ở, đất ở","01281":"Trồng cây gia vị lâu năm","98100":"Sản xuất tự tiêu dùng","18110":"In ấn","46321":"Bán buôn thịt","47221":"Bán lẻ thịt","49313":"Vận tải hành khách mô tô, xe máy","02400":"Dịch vụ lâm nghiệp","46591":"Bán buôn máy móc xây dựng","47229":"Bán lẻ thực phẩm khác","46331":"Bán buôn đồ uống có cồn","01199":"Trồng cây hàng năm khác","45431":"Bán buôn phụ tùng mô tô, xe máy","43300":"Hoàn thiện công trình xây dựng","10620":"Sản xuất tinh bột","95220":"Sửa chữa đồ dùng gia đình","38110":"Thu gom rác thải","47411":"Bán lẻ máy vi tính","46622":"Bán buôn sắt, thép","25930":"Sản xuất dao kéo, đồ kim loại","98200":"Dịch vụ tự tiêu dùng","46639":"Bán buôn vật liệu xây dựng","46496":"Bán buôn giường, tủ, bàn ghế","01500":"Trồng trọt, chăn nuôi hỗn hợp","47230":"Bán lẻ đồ uống","46520":"Bán buôn thiết bị điện tử","93290":"Hoạt động vui chơi giải trí","01451":"Sản xuất giống lợn","77210":"Cho thuê thiết bị giải trí","01469":"Chăn nuôi gia cầm khác","96100":"Dịch vụ tắm hơi, massage","01441":"Sản xuất giống dê, cừu","46492":"Bán buôn dược phẩm, dụng cụ y tế","46414":"Bán buôn giày dép","45432":"Bán lẻ phụ tùng mô tô, xe máy","47592":"Bán lẻ giường, tủ, bàn ghế","33120":"Sửa chữa máy móc, thiết bị","01610":"Dịch vụ trồng trọt","47898":"Bán lẻ hàng đã qua sử dụng","01230":"Trồng cây điều","95290":"Sửa chữa đồ dùng cá nhân","46493":"Bán buôn mỹ phẩm","56210":"Dịch vụ ăn uống theo hợp đồng","46613":"Bán buôn xăng dầu","95240":"Sửa chữa đồ nội thất","43290":"Lắp đặt hệ thống xây dựng","47899":"Bán lẻ hàng hóa khác tại chợ","01191":"Trồng cây gia vị hàng năm","46592":"Bán buôn thiết bị điện","03213":"Nuôi thủy sản khác","47412":"Bán lẻ thiết bị viễn thông","46699":"Bán buôn chuyên doanh khác","11041":"Sản xuất nước đóng chai","47891":"Bán lẻ mỹ phẩm tại chợ","01463":"Chăn nuôi vịt, ngan, ngỗng","35201":"Sản xuất khí đốt","38301":"Tái chế phế liệu kim loại","47843":"Bán lẻ đồ dùng gia đình tại chợ","47819":"Bán lẻ thực phẩm khác","47722":"Bán lẻ nước hoa, mỹ phẩm","41020":"Xây dựng nhà không để ở","95110":"Sửa chữa máy vi tính","17021":"Sản xuất bao bì giấy, bìa","47191":"Bán lẻ trong siêu thị","25999":"Sản xuất sản phẩm kim loại","13930":"Sản xuất thảm, chăn, đệm","55104":"Nhà trọ, phòng trọ","63990":"Dịch vụ thông tin khác","56301":"Quán rượu, bia","47119":"Bán lẻ lương thực, thực phẩm","90000":"Sáng tác, nghệ thuật, giải trí","46530":"Bán buôn máy nông nghiệp","49319":"Vận tải hành khách đường bộ","01140":"Trồng cây mía","47711":"Bán lẻ hàng may mặc","46325":"Bán buôn chè","61909":"Hoạt động viễn thông khác","24310":"Đúc sắt thép","46634":"Bán buôn kính xây dựng","49312":"Vận tải hành khách bằng taxi","82191":"Photo, chuẩn bị tài liệu","46637":"Bán buôn đồ ngũ kim","01310":"Nhân, chăm sóc cây giống hàng năm","47199":"Bán lẻ tổng hợp khác","47894":"Bán lẻ vàng, bạc, trang sức","32900":"Sản xuất khác","46322":"Bán buôn thủy sản","47812":"Bán lẻ thực phẩm khô tại chợ","87909":"Chăm sóc tập trung khác","45411":"Bán buôn mô tô, xe máy","42990":"Xây dựng công trình dân dụng","02102":"Trồng rừng họ tre","47821":"Bán lẻ hàng dệt tại chợ","47511":"Bán lẻ vải","03211":"Nuôi cá","33150":"Sửa chữa phương tiện vận tải","01182":"Trồng đậu","46691":"Bán buôn phân bón, thuốc trừ sâu","28291":"Sản xuất máy vật liệu xây dựng"};
function ktNganh(m){   /* 3.98: món có 2 mục đích (Mã PNKT52 khác PNKT51, vd nước sạch 36000 + vệ sinh 39000) → in cả 2 */
  var ma1 = String(m.c_ma_pnkt51||'').trim(), ma2 = ktMa52(m), a = ktNganh1(ma1, m.c_ten_pnkt51);
  if(!ma2 || ma2===ma1) return a;
  var b = ktNganh1(ma2, ''); return a && b ? a+'; '+b : a || b;
}
function ktMa52(m){ var x = String(m.c_ma_pnkt52||'').trim(); return /^0*$/.test(x) ? '' : x; }
function ktCoNganh(m){ return !!(m.c_ma_pnkt51 || m.c_ten_pnkt51 || ktMa52(m)); }
function ktNganh1(ma, ten){ var sua = D.cauHinh.ktPnkt || {}; ma = String(ma||'').trim(); if(sua[ma]) return sua[ma]; return ktNganhDeXuat(ma, String(ten||'').trim()); }
function ktNganhDeXuat(ma, ten){
  if(KT_PNKT[ma]) return KT_PNKT[ma];
  return String(ten||'').replace(/\s*\([^)]*\)/g, '').replace(/ chưa được phân vào đâu| còn lại| trong các cửa hàng chuyên doanh/g, '').replace(/ lưu động hoặc tại chợ/g, ' tại chợ').replace(/^Hoạt động /, '').trim();
}
/* ⚙ Bảng ngành kinh tế: mỗi ngành 1 dòng (mã · tên gốc · tên rút gọn sửa được · số món đang vay theo số liệu đang mở) */
var KT_NG_Q = '', KT_NG_LOC = '', KT_NG_HET = false, KT_NG_NGUONG = 10;   /* 3.93.1: mặc định ẩn ngành dưới 10 món đang vay (trừ ngành anh đã sửa / đang tìm) */
function ktNganhDs(){
  var ra = {}, sua = D.cauHinh.ktPnkt || {};
  Object.keys(KT_PNKT).forEach(function(ma){ ra[ma] = {ma:ma, ten:'', n:0}; });
  ((KT_K && KT_K.hs) || []).forEach(function(o){ if(!o.ku || !((o.dn||0)>0)) return;
    var ma = String(o.c_ma_pnkt51||'').trim(), m2 = ktMa52(o);
    if(ma){ var x = ra[ma] = ra[ma] || {ma:ma, ten:'', n:0}; x.n++; if(!x.ten) x.ten = String(o.c_ten_pnkt51||'').trim(); }
    if(m2 && m2!==ma){ var y = ra[m2] = ra[m2] || {ma:m2, ten:'', n:0}; y.n++; } });   /* 3.98: + mục đích thứ 2 (PNKT52) */
  Object.keys(sua).forEach(function(ma){ if(!ra[ma]) ra[ma] = {ma:ma, ten:'', n:0}; });
  return Object.keys(ra).map(function(ma){ var x = ra[ma]; x.deXuat = ktNganhDeXuat(ma, x.ten); x.sua = sua[ma] || ''; return x; })
    .sort(function(a, b){ return b.n-a.n || (a.ma<b.ma ? -1 : 1); });
}
function ktNganhHop(){
  moHop('<div class="hop-tit">⚙ Bảng ngành kinh tế — cột “Mục đích” Mẫu 06</div>'+
    '<div class="hop-phu">Tên gốc lấy từ Mẫu 31 (Tên PNKT51 — chính là cột “Mục đích vay vốn” của danh sách giải ngân hệ thống). Ngành nhiều món đang vay xếp trên. Anh sửa ô <b>Tên in trên phiếu</b> (để trống = dùng đề xuất); lưu ngay trong Cài đặt (máy + Drive). Tên dài vẫn in được — ô tự xuống dòng.</div>'+
    '<div class="to-dau"><div class="to-tim"><span>🔎</span><input id="kt-ng-tim" value="'+coChuHTML(KT_NG_Q)+'" placeholder="Tìm mã, tên ngành…" oninput="KT_NG_Q=this.value;ktNganhVe()"></div>'+
    '<button class="to-loc'+(KT_NG_LOC==='sua' ? ' bat' : '')+'" onclick="KT_NG_LOC=KT_NG_LOC===\'sua\'?\'\':\'sua\';ktNganhHop()">Đã sửa</button></div>'+
    '<div id="kt-ng" class="to-bang-cuon kt-ng"></div><div class="hang-nut"><button class="nho chinh" onclick="dongHop();if(KT_K)ktVeThe()">Xong</button></div>', true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  ktNganhVe();
}
function ktNganhVe(){
  var o = document.getElementById('kt-ng'); if(!o) return;
  var q = slChuan(KT_NG_Q), tat = ktNganhDs().filter(function(x){ return (KT_NG_LOC!=='sua' || x.sua) && (!q || slChuan(x.ma+' '+x.ten+' '+x.deXuat+' '+x.sua).indexOf(q)>=0); });
  var an = (q || KT_NG_LOC==='sua' || KT_NG_HET) ? [] : tat.filter(function(x){ return x.n<KT_NG_NGUONG && !x.sua; }), ds = tat.filter(function(x){ return an.indexOf(x)<0; });
  o.innerHTML = '<table class="to-bang"><thead><tr><th>Mã</th><th>Tên gốc (hệ thống)</th><th>Đề xuất</th><th>Tên in trên phiếu</th><th>Món đang vay</th><th></th></tr></thead><tbody>'+
    ds.map(function(x){ return '<tr><td>'+x.ma+'</td><td class="kt-ng-goc">'+coChuHTML(x.ten || '—')+'</td><td>'+coChuHTML(x.deXuat)+'</td>'+
      '<td><input value="'+coChuHTML(x.sua)+'" placeholder="'+coChuHTML(x.deXuat)+'" onchange="ktNganhSua(\''+x.ma+'\',this.value)" aria-label="Tên in trên phiếu"></td><td class="s">'+(x.n ? tdnTien(x.n) : '')+'</td>'+
      '<td>'+(x.sua ? '<button class="nho" onclick="ktNganhSua(\''+x.ma+'\',\'\');ktNganhVe()" title="Trả về đề xuất">↺</button>' : '')+'</td></tr>'; }).join('')+'</tbody></table>'+
    (ds.length ? '' : '<div class="rong">Không có ngành khớp.</div>')+
    (an.length ? '<div class="hang-nut"><button class="nho" onclick="KT_NG_HET=true;ktNganhVe()">▾ Hiện thêm '+an.length+' ngành ít / không có món (dưới '+KT_NG_NGUONG+' món)</button></div>'
      : (KT_NG_HET && !q && KT_NG_LOC!=='sua' ? '<div class="hang-nut"><button class="nho" onclick="KT_NG_HET=false;ktNganhVe()">▴ Thu gọn — chỉ ngành từ '+KT_NG_NGUONG+' món</button></div>' : ''));
}
function ktNganhSua(ma, v){ var s = D.cauHinh.ktPnkt = D.cauHinh.ktPnkt || {}; v = String(v||'').replace(/\s+/g, ' ').trim(); if(v) s[ma] = v; else delete s[ma]; luu(); }
function ktGiaTri06(t, dc, v){   /* 3.98: hộ theo mã KH; 1 khách nhiều khế ước → Stt, họ tên, ô ký gộp (gop: dau / tiep, n = số dòng của hộ) */
  var n = ktNgayP(v.ngay), rows = [], tgn = 0, tdn = 0, tnl = 0, stt = 0;
  dc.slice().sort(ktTheoKH).forEach(function(h){ stt++; h.mon.forEach(function(m, i){ tgn += m.gn||0; tdn += m.dn||0; var lt = laiTon(m); tnl += lt>0 ? lt : 0;
    rows.push({R1:i ? '' : String(stt), R2:i ? '' : tenHoaDau(h.ten), R3:m._ma, R4:ctHT(m.ct, m), R5:ktTr(m.gn, 2), R6:ktTr(m.dn, 2), R7:v.md==='nganh' ? ktNganh(m) : '',   /* mục đích: anh chọn để trống / in ngành kinh tế · 3.111: tên hoa đầu từ */
      R8:lt>0 ? ktTr06Lai(lt) : '',   /* 3.111 (anh chốt): Nợ lãi = lãi tồn (trong hạn + quá hạn, không ân hạn), triệu đồng */
      gop:h.mon.length>1 ? (i ? 'tiep' : 'dau') : '', n:i ? 0 : h.mon.length}); }); });
  var cb = ktCanBo(t, v);
  var r = {f:{DV:ktTachDV('Đơn vị kiểm tra: ', ktDonVi(t, v, 44), 4000), CB1:cb.cb, CV1:cb.cv, CB2:v.cb2, CV2:v.cv2, TD:v.ngay ? ngayVNsl(v.ngay) : '', DB:ktDiaBan(t), TO:t.ten||'',
    ND:n.d, NM:n.m, NY:n.y, TGN:rows.length ? ktTr(tgn, 2) : '', TDN:rows.length ? ktTr(tdn, 2) : '', TNL:tnl>0 ? ktTr06Lai(tnl) : ''}, rows:rows};   /* 3.140.1 (anh chốt): 2 số lẻ; dòng Cộng tính từ số gốc rồi làm tròn */
  ['TGN', 'TDN', 'TNL'].forEach(function(k){ r.f['SZ'+k] = String(ktCoTien06(r.f[k], KT06_O_TIEN[k], true)); });   /* 3.118: số dòng Cộng dài → thu cỡ chữ cho vừa 1 dòng · 3.140.1: đo đúng bề rộng ô (1,3 cm), lề ô hẹp */
  return r;
}
function ktGiaTri16(t, dc, v){
  var n = ktNgayP(v.ngay); if(!v.ngay && !(typeof ktCheDo==='function' && ktCheDo()==='dx')){ var tk = ktThangKT();   /* 3.325 (anh): đột xuất chưa khai ngày → để chấm cả ngày / tháng / năm, không tự ghi tháng như định kỳ */ if(tk) n = {d:'', m:tk.slice(5, 7), y:tk.slice(0, 4), y2:tk.slice(2, 4)}; }   /* 3.109: chưa khai ngày → tháng / năm theo tháng kiểm tra, ngày ghi tay */
  var s = ktSoTo(t), sd = ktNgayP(s.ngay), bc = s.nguon==='BC0437', le = bc ? 0 : 2;   /* 3.325: số liệu theo ngày chọn (Mẫu 31), xếp loại theo tháng BC0437 */
  var thangCD = s.ngayXL ? ktNgayP(s.ngayXL) : null;
  var thon = ktApTen(t.tenThon), xa = ktXaTen(t.tenXa);   /* 3.98: chữ in sẵn "thôn/tổ dân phố", "xã/phường/đặc khu", "tỉnh/thành phố" → đúng chữ (ấp / khu phố, xã / phường, tỉnh); tên Hội đầy đủ theo Bảng chuẩn hóa */
  var dv16 = ktDonVi16(t, v);
  return {f:{DV0:dv16.DVA, DVA:dv16.DVA ? dv16.DVB || ' ' : '', DVB:'', ND:n.d, NM:n.m, NY:n.y2, THON:thon, CAPA:thon ? ktCapAp(t.tenXa) : '', XA:xa, CAPX:xa ? ktChuan(t).xa : '', TINH:KT_TINH, CAPT:'tỉnh',
    DOAN:String(v.dv||'').trim()==='-' ? '' : String(v.dv||'').trim() || (t.dv && String(t.dv)!=='99' ? ktHoiTenTD(t) : ''),   /* 3.323: Đoàn kiểm tra theo lựa chọn đơn vị (chấm / khai tên / Hội) */ CB1:ktCanBo(t, v).cb, CV1:ktCVGon(ktCanBo(t, v).cv, 3259, 27), CB2:ktNguoi2(t, v).cb, CV2:ktCVGon(ktNguoi2(t, v).cv, 3259, 27), HOI:t.dv ? ktHoiTen(t) : '', TT:t.ten||'',
    LCB1:ktCanBo(t, v).cb ? 'none' : '', LCV1:ktCanBo(t, v).cv ? 'none' : '', LCB2:ktNguoi2(t, v).cb ? 'none' : '', LCV2:ktNguoi2(t, v).cv ? 'none' : '', LTT:t.ten ? 'none' : '',
    SD:sd.d, SM:sd.m, SY:sd.y2, DN:ktTr(s.dn, le), STV:s.stv ? String(s.stv) : '', QH:ktTr(s.qh, le), TLQH:ktPT(s.tlQH), KN:ktTr(s.kn, le), TLKN:ktPT(s.tlKN),
    LT:ktTr(s.lt, le), TG:ktTr(s.tg, le), XM:thangCD && s.xl ? thangCD.m : '', XY:thangCD && s.xl ? thangCD.y2 : '', XL:s.xl ? String(s.diem).replace('.', ',')+' điểm, xếp loại '+s.xl : '',
    SKH:dc.length ? (dc.length<10 ? '0' : '')+dc.length : '', SPH:dc.length ? '01' : ''}, nx:ktNhanXet16(t, s, v), b2:ktB16Mang(t, v)};   /* 3.327: cả bảng + ▸ từng ô */
}
var KT_B16 = ['Theo cụm dân cư liền kề', '02 người (Tổ trưởng, Tổ phó), có phân công cụ thể', 'Không', 'Không', 'Không', 'Tại văn phòng {ấp}, định kỳ theo quý', 'Có thực hiện', 'Đảm bảo đúng thành phần', 'Có tham gia', 'Không', 'Có thực hiện', 'Có tham gia', 'Có phối hợp', 'Có lưu giữ'];   /* 3.115 · 3.116 (anh chốt): như mẫu tham khảo, bỏ chữ "đầy đủ"; điều cấm ghi rõ "Không" */
function ktB16Mac(v){ var x = (v && v.b2!==undefined) ? v.b2 : (D.cauHinh.ktBang16!==undefined ? D.cauHinh.ktBang16 : 'dien'); return x==='cham' ? '' : x; }   /* 3.378: bỏ "chấm" Bảng II */
var KT_NX_CHON = '<option value="so">Gợi ý theo số liệu (anh sửa trong Word)</option><option value="">Để trống (ghi tay)</option>';
function ktNxMacDinh(v){ return v.nx!==undefined ? v.nx : (D.cauHinh.ktNhanXet!==undefined ? D.cauHinh.ktNhanXet : 'so'); }
function ktNhanXet16(t, s, v){   /* 3.98: Mẫu 16 — gợi ý theo số liệu (khoản 3 Phụ lục I văn bản 727): ô kết quả 2 dòng có số + III. ưu điểm / tồn tại / kiến nghị.
     Chỉ là gợi ý có số kèm theo, anh sửa trong Word; dòng định tính (sinh hoạt, bình xét, giữ sổ…) để trống ghi tay */
  var r = {kq1:'', kq2:'', ud:[], tt:[], kn:[]}, cKQ = ktB16Mac(v)==='dien';   /* 3.378 (anh): 2 dòng có số Bảng II theo ô Bảng II; III từng phần theo ô riêng */
  if(!cKQ && !['ud', 'tt', 'kn'].some(function(p){ return ktNxCo(v, p); })) return r;
  var ks = toKhach(t).filter(function(k){ return k.mon.some(function(m){ return (m.dn||0)>0; }); }), nLT = 0, nQH = 0, nTK = 0;
  ks.forEach(function(k){ if(k.lt>0) nLT++; if(k.qh>0) nQH++; if(k.t105>0) nTK++; });
  var stv = s.stv || ks.length, tr = function(x){ return ktTr(x, 2)+' triệu đồng'; }, khd = 0;
  try { ktHo(t).forEach(function(h){ khd += h.khd.length; }); } catch(e){}
  var du = stv>=5 && stv<=60, ptTK = stv ? Math.round(nTK/stv*100) : 0, xlTot = s.xl==='Tốt' || s.xl==='Khá', xlKem = s.xl==='Trung bình' || s.xl==='Yếu';
  r.kq1 = stv ? stv+' tổ viên — '+(du ? 'đảm bảo' : 'không đảm bảo')+' (05–60)' : '';
  r.kq2 = (nLT || nQH) ? [nLT ? nLT+' tổ viên lãi tồn '+tdnTien(s.lt)+' đ' : '', nQH ? nQH+' tổ viên nợ quá hạn '+tr(s.qh) : ''].filter(Boolean).join('; ') : 'Không có tổ viên lãi tồn, nợ quá hạn';
  if(!s.qh && !s.kn) r.ud.push('Tổ không có nợ quá hạn, nợ khoanh.');
  if(!s.lt) r.ud.push('Không có tổ viên còn lãi tồn; tổ viên trả lãi đầy đủ.');
  if(stv && ptTK>=80) r.ud.push(nTK+'/'+stv+' tổ viên ('+ptTK+'%) có gửi tiết kiệm, số dư '+tr(s.tg)+'.');
  if(du && stv) r.ud.push('Số lượng tổ viên đảm bảo quy định ('+stv+' tổ viên).');
  if(xlTot) r.ud.push('Kết quả chấm điểm: '+String(s.diem).replace('.', ',')+' điểm, xếp loại '+s.xl+'.');
  var d = ktDsDon(t), hoi = ktHoiTen(t);   /* 3.114 (anh chốt): liệt kê hộ nợ quá hạn, nợ khoanh; đề xuất nhẹ nhàng, đủ ý */
  if(s.qh){ r.tt.push('Nợ quá hạn '+tr(s.qh)+' (tỷ lệ '+ktPT(s.tlQH)+'%)'+(nQH ? ' của '+nQH+' tổ viên' : '')+(d.qh.length ? ': '+ktDsQH(d.qh) : '')+'.');
    r.kn.push('Phối hợp '+hoi+', Trưởng '+ktCapAp(t.tenXa)+' đôn đốc '+(d.qh.length ? 'các hộ '+ktDsTen(d.qh) : 'các hộ có nợ quá hạn')+' xây dựng kế hoạch trả nợ, trả dần nợ quá hạn; hộ khó khăn thì xác minh nguyên nhân, đề xuất xử lý theo quy định.'); }
  if(s.kn){ r.tt.push('Nợ khoanh '+tr(s.kn)+' (tỷ lệ '+ktPT(s.tlKN)+'%)'+(d.kn.length ? ': '+ktDsKN(d.kn) : '')+'.');
    r.kn.push('Theo dõi, động viên '+(d.kn.length ? 'các hộ '+ktDsTen(d.kn) : 'các hộ có nợ khoanh')+' trả nợ khi có điều kiện; phối hợp rà soát hồ sơ, đề nghị xử lý theo quy định.'); }   /* 3.109 (anh chốt): liệt kê hộ — món không giao dịch từ 3 tháng, lãi tồn trên 6 tháng lãi; kiến nghị nhẹ nhàng */
  var gop = ktDsGop(d);   /* 3.134 */
  if(s.lt){ r.tt.push((nLT ? nLT+' tổ viên' : 'Tổ viên')+' còn lãi tồn, số tiền '+tdnTien(s.lt)+' đồng.');
    if(!gop.length) r.kn.push('Đôn đốc thu lãi tồn, tổ viên nộp lãi đúng kỳ.'); }
  if(khd || gop.length){ r.tt.push(gop.length ? 'Món vay không có giao dịch từ 3 tháng trở lên, lãi tồn cao, gồm các hộ: '+ktDsGopChu(gop)+'.' : khd+' món vay không có giao dịch từ 3 tháng trở lên.');   /* 3.134: nhóm chung */
    r.kn.push('Đề nghị Ban quản lý Tổ phối hợp đôn đốc '+(gop.length ? 'các hộ '+ktDsTen(gop) : 'các hộ có món vay không giao dịch')+' trả lãi đúng kỳ, nộp lãi tồn, gửi tiết kiệm đều đặn hằng tháng; kiểm tra việc sử dụng vốn vay.'); }   /* 3.114 */
  if(stv && !du){ r.tt.push('Số lượng tổ viên ('+stv+') không đảm bảo quy định 05–60 tổ viên.'); r.kn.push('Kiện toàn, sắp xếp lại tổ theo quy định (05–60 tổ viên).'); }
  if(stv && ptTK<50){ r.tt.push('Chỉ '+nTK+'/'+stv+' tổ viên ('+ptTK+'%) có gửi tiết kiệm.'); r.kn.push('Vận động tổ viên thực hành tiết kiệm, gửi tiền đều hằng tháng.'); }
  if(xlKem){ r.tt.push('Kết quả chấm điểm: '+String(s.diem).replace('.', ',')+' điểm, xếp loại '+s.xl+'.'); r.kn.push('Củng cố hoạt động của Tổ và Ban quản lý Tổ để nâng xếp loại.'); }
  if(!cKQ){ r.kq1 = ''; r.kq2 = ''; } ['ud', 'tt', 'kn'].forEach(function(p){ if(!ktNxCo(v, p)) r[p] = []; });
  return r;
}
function ktNxDoan(K, khoa, nhan, ds){   /* đoạn III gốc (dòng chấm) hoặc nhãn + từng ý gợi ý (mỗi ý 1 đoạn, thụt đầu dòng như mẫu) */
  var goc = K[khoa]; if(!ds || !ds.length) return goc;
  var pPr = (goc.match(/<w:pPr>[\s\S]*?<\/w:pPr>/) || [''])[0], r = function(x, b){ return '<w:r><w:rPr>'+(b ? '<w:b/>' : '')+'<w:sz w:val="27"/><w:szCs w:val="27"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(x)+'</w:t></w:r>'; };
  return '<w:p>'+pPr+r(nhan, 1)+r(':')+'</w:p>'+ds.map(function(x){ return '<w:p>'+pPr+r('- '+x)+'</w:p>'; }).join('');
}
function ktDien(x, v){   /* {{KHOA|chấm}} → giá trị (trống thì giữ chấm) · {{KHOA~|chấm}} = phần chấm ở run sau: có giá trị thì bỏ · R3 mã khoản vay: gạch nối không ngắt dòng */
  return x.replace(/\{\{([A-Z0-9]+)(~?)\|([^}]*)\}\}/g, function(m, k, ng, cham){ var s = v[k], co = !(s===undefined || s===null || s==='');
    if(ng) return co ? '' : cham; if(!co) return cham; return k==='R3' ? xmlEsc(s).replace(/-/g, '</w:t><w:noBreakHyphen/><w:t xml:space="preserve">') : xmlEsc(s).replace(/\n/g, '</w:t><w:br/><w:t xml:space="preserve">'); });   /* 3.96: \n → xuống dòng trong ô */
}
/* 3.98: mọi dòng bảng cao ≥ 1,5 cm (ghi được 3 dòng ở cột Mục đích) — bù cho đủ 2 dòng (1 món → 1 dòng trống; phiếu trống → 2 dòng trống) để phiếu ít món vẫn vừa 1 trang */
function ktDongBu(rows){ var R = rows.slice(); if(!R.length) return [{}, {}]; if(R.length<2) R.push({}); return R; }
function ktGopO(x, kieu){   /* 3.98: gộp dọc ô Stt, Họ tên (cột 1, 2) và Ký xác nhận (cột 15) cho khách nhiều khế ước */
  var i = -1; return x.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ i++; if(i!==0 && i!==1 && i!==14) return tc;
    return tc.replace(/(<w:tcW [^>]*\/>(?:<w:gridSpan [^>]*\/>)?)/, '$1<w:vMerge'+(kieu==='dau' ? ' w:val="restart"' : '')+'/>'); });
}
function ktCB06(f){   /* 3.98: 4 dòng đầu Mẫu 06 dựng bằng điểm dừng tab (chữ "Chức vụ" 2 dòng thẳng cột; trống = chấm, có chữ = khoảng trắng) */
  var r = function(x, i){ var pr = '<w:rPr>'+(i ? '<w:i/><w:iCs/>' : '')+'<w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr>';
    return x==='\t' ? '<w:r>'+pr+'<w:tab/></w:r>' : x ? '<w:r>'+pr+'<w:t xml:space="preserve">'+xmlEsc(x)+'</w:t></w:r>' : ''; };
  var p = function(tabs, runs, ind){ return '<w:p><w:pPr><w:tabs>'+tabs.map(function(t){ return '<w:tab w:val="'+(t[2]||'left')+'"'+(t[1] ? ' w:leader="dot"' : '')+' w:pos="'+t[0]+'"/>'; }).join('')+'</w:tabs>'+
    '<w:spacing w:line="320" w:lineRule="exact"/>'+(ind||'')+'<w:rPr><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:pPr>'+runs.join('')+'</w:p>'; };
  var cb = function(so, ten, cv){ return p([[ktTab0()], [KT_TAB06[1], !ten], [KT_TAB06[3], !cv]], [so==='1' ? r('Họ và tên cán bộ kiểm tra: ') : '', r('\t'), r(so+'. Ông (bà): '+(ten||'')), r('\t'), r((ten ? '' : ' ')+'Chức vụ: '+ktCVGon(cv, KT_TAB06[3]-KT_TAB06[1], 26)), cv ? '' : r('\t')]); };
  var d3 = ktDong3_06(f), l3 = [r('Thời điểm kiểm tra: '+(f.TD||'')), r('\t'), r((f.TD ? '' : ' ')+'Địa bàn kiểm tra: '+(d3.db||'')), f.DB ? '' : r('\t')], to = [r('\t'), r((d3.mot && !f.DB ? ' ' : '')+'Tổ TK&VV: '+(f.TO||'')), f.TO ? '' : r('\t')];   /* 3.118: chữ sau dòng chấm cách 1 khoảng */
  return cb('1', f.CB1, f.CV1)+cb('2', f.CB2, f.CV2)+   /* 3.111 (anh chốt, theo mẫu gốc): Thời điểm · Địa bàn · Tổ TK&VV cùng 1 dòng (dài thì Tổ xuống dòng); Đơn vị tính dòng riêng */
    (d3.mot ? p([[d3.a, !f.TD], [d3.b, !f.DB], [KT_TAB06[3], !f.TO]], l3.slice(0, 3).concat(to))
      : p([[d3.a, !f.TD]].concat(f.DB ? [] : [[KT_TAB06[3], true]]), l3)+p([[KT_TAB06[2]], [KT_TAB06[3], !f.TO]], to))+
    p([[15593, false, 'right']], [r('\t'), r('Đơn vị tính: triệu đồng', 1)], '<w:ind w:right="-60"/>');   /* 3.128: theo lề mới */
}
function ktCVGon(cv, rong, sz){   /* 3.118 (anh chốt): chức vụ không vừa chỗ → viết tắt Ban Thường vụ → BTV, Ban Chấp hành → BCH (vừa thì giữ đủ chữ) */
  cv = String(cv||''); if(!cv || ktDoRong('Chức vụ: '+cv, sz||26, true) <= (rong||0)*0.97) return cv;
  return cv.replace(/Ban Thường vụ/gi, 'BTV').replace(/Ban Chấp hành/gi, 'BCH');
}
function ktTachDV(nhan, dv, rong, sz){   /* 3.118 (anh chốt): "Đơn vị kiểm tra: <tên>" không vừa 1 dòng → xuống dòng trước "xã / phường …" */
  dv = String(dv||''); if(!dv || /\n/.test(dv) || ktDoRong(nhan, sz||26) + ktDoRong(dv, sz||26, true) <= rong*0.97) return dv;
  var m = dv.match(/^(.*?)\s+((?:xã|phường|thị trấn|đặc khu)\s.*)$/i); return m ? m[1]+'\n'+m[2] : dv;
}
function ktNoiNhanNH(){ var nh = String(D.cauHinh.donvi || MAC_DINH.donvi || '').replace(/^(PGD\s+)?NHCSXH\s*/i, '').trim(); return nh ? 'PGD NHCSXH '+nh : ''; }   /* 3.118: nơi nhận Mẫu 04 = PGD NHCSXH <đơn vị trong Cài đặt> */
function ktDV04(n){   /* 3.118 (anh chốt, như Mẫu 16): có tên đơn vị → bỏ dòng "ĐƠN VỊ KIỂM TRA", tên lên dòng đầu; dài thì xuống dòng trước "XÃ / PHƯỜNG …" */
  n = String(n||'').trim(); if(!n) return {DV0:'', DV:''}; if(ktDoRong(n, 26) <= 3100) return {DV0:n, DV:' '};
  var m = n.match(/^(.*?)\s+((?:XÃ|PHƯỜNG|THỊ TRẤN|ĐẶC KHU)\s.*)$/); return m ? {DV0:m[1], DV:m[2]} : {DV0:n, DV:' '};
}
var KT06_O_TIEN = {TGN:737, TDN:737, TNL:794, R5:737, R6:737, R8:794}, KT06_LE_TIEN = 30;   /* 3.140.1: bề rộng ô số tiền Mẫu 06 (twip) · lề trong ô số tiền mỗi bên */
function ktTr06Lai(n){ return n>0 && n<5000 ? ktTr(n, 3) : ktTr(n, 2); }   /* 3.140.1 (anh chốt): nợ lãi dưới 5.000 đ giữ 3 số lẻ (2 số lẻ thành 0 → mất dấu hộ còn nợ lãi) */
function ktCoTien06(v, o, dam){ var c = [22, 20, 18, 16]; if(!v) return 22; for(var i=0;i<c.length;i++) if(ktDoRong(String(v), c[i], !dam) <= (o-2*KT06_LE_TIEN-20)*0.95) return c[i]; return 16; }   /* 3.140.1: cỡ chữ lớn nhất để số tiền vừa 1 dòng trong ô rộng o twip (lề KT06_LE_TIEN) */
function ktOTien06(x, ix){ var k = -1; return x.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ k++; if(ix.indexOf(k)<0) return tc;   /* 3.140.1 (anh chốt): ô số tiền canh phải, lề trong ô hẹp */
  tc = tc.replace(/<w:tcMar>[\s\S]*?<\/w:tcMar>/, '').replace(/(<w:vAlign [^>]*\/>|<w:hideMark\/>|<\/w:tcPr>)/, '<w:tcMar><w:left w:w="'+KT06_LE_TIEN+'" w:type="dxa"/><w:right w:w="'+KT06_LE_TIEN+'" w:type="dxa"/></w:tcMar>$1');
  return tc.replace(/<w:jc w:val="\w+"\/>/g, '<w:jc w:val="right"/>'); }); }
function ktCong06(x){ var i = x.indexOf('{{TGN'); if(i<0) return x; var a = Math.max(x.lastIndexOf('<w:tr ', i), x.lastIndexOf('<w:tr>', i)), e = x.indexOf('</w:tr>', i); return a<0 || e<0 ? x : x.slice(0, a)+ktOTien06(x.slice(a, e), [4, 5, 13])+x.slice(e); }   /* 3.140.1: dòng Cộng — 3 ô số tiền */
function ktDbGon(db, muc){   /* 3.115: địa bàn gọn khi thiếu chỗ — 1: bỏ tỉnh; 2: + viết tắt khu phố → KP, phường → P., xã → X., thị trấn → TT. */
  var x = String(db||''); if(muc>=1) x = x.replace(/,\s*tỉnh [^,]*$/i, '');
  if(muc>=2) x = x.replace(/(^|, )khu phố\s+/gi, '$1KP ').replace(/(^|, )phường\s+/gi, '$1P. ').replace(/(^|, )xã\s+/gi, '$1X. ').replace(/(^|, )thị trấn\s+/gi, '$1TT. ');
  return x;
}
function ktDong3_06(f){   /* 3.111 · 3.115 (anh chốt): dòng "Thời điểm · Địa bàn · Tổ TK&VV" (twip, chữ thường cỡ 13) — thử lần lượt cho vừa 1 dòng:
     Tổ thẳng cột Chức vụ → thu khoảng cách → bỏ tỉnh → viết tắt KP / P. / X.; vẫn không vừa mới cho Tổ xuống dòng. Trả {a, b, mot, db = địa bàn sẽ in} */
  var w = function(x){ return ktDoRong(x, 26, true); }, het = KT_TAB06[3]*0.98, g = 340;
  var td = w('Thời điểm kiểm tra: '+(f.TD || '…………………')), to = w('Tổ TK&VV: '+(f.TO || '…………………………'));
  var thu = function(db, gon){ var a = gon ? Math.round(td+g) : Math.max(Math.round(td+g), 4253), dw = w('Địa bàn kiểm tra: '+(db || '……………………………………………'));
    var b = gon ? Math.round(a+dw+g) : Math.max(Math.round(a+dw+g), KT_TAB06[2]); return {a:a, b:b, db:db, mot:b+to<=het}; };
  var cs = [thu(f.DB, 0), thu(f.DB, 1)]; if(f.DB) cs.push(thu(ktDbGon(f.DB, 1), 1), thu(ktDbGon(f.DB, 2), 1));
  for(var i=0;i<cs.length;i++) if(cs[i].mot) return cs[i];
  return {a:cs[0].a, b:cs[0].b, db:f.DB, mot:false};
}
var KT_TAB06 = [3600, 9700, 11100, 15500, 6237];   /* 3.128: lề trái 12 mm, phải 10 mm → kéo dài dòng (Chức vụ · Tổ · hết dòng); [0] thay bằng ktTab0() */   /* điểm dừng tab (twip từ lề trái): Ông (bà) · Chức vụ · Tổ TK&VV · hết dòng · hết chấm thời điểm */
function ktOSz(x, ix, sz){ var k = -1; return x.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ k++; return ix.indexOf(k)<0 ? tc : tc.replace(/<w:sz w:val="\d+"\/><w:szCs w:val="\d+"\/>/g, '<w:sz w:val="'+sz+'"/><w:szCs w:val="'+sz+'"/>'); }); }   /* 3.111: đổi cỡ chữ các ô thứ ix của 1 dòng bảng */
var KT_06_O = {ten:1712, md:1428};   /* 3.128 (anh chốt theo mẫu chuẩn): cột Họ tên rộng ra, Mục đích hẹp lại */
function ktCo06Ten(x){ if(!x) return 0; var w = KT_06_O.ten*0.98; return ktDoRong(String(x), 22, true)<=w ? 0 : ktDoRong(String(x), 20, true)<=w ? 20 : 0; }   /* 3.128: tên ưu tiên 1 dòng (thu xuống 10 pt nếu vừa), dài quá thì 2 dòng cỡ thường */
function ktCo06Md(x){ return x ? 16 : 0; }   /* 3.134 (anh chốt): mục đích sử dụng vốn mọi dòng cùng cỡ nhỏ 8 pt cho thống nhất (3.128: to nhỏ theo độ dài) */
function ktCo06CT(x){ if(!x) return 0; var w = (1134-216)*0.97; return ktDoRong(String(x), 20, true)<=w ? 0 : ktDoRong(String(x), 18, true)<=w ? 18 : 16; }   /* 3.128: tên viết tắt chương trình 1 dòng (HONGHEO, HCN_QD15…) */
function ktTab0(){ return Math.round(ktDoRong('Họ và tên cán bộ kiểm tra: ', 26, true)+70); }   /* 3.128 (anh chốt): "1. Ông (bà)" sát nhãn như mẫu chuẩn */
function ktOSz2(x, m){ var k = -1; return x.replace(/<w:tc>[\s\S]*?<\/w:tc>/g, function(tc){ k++; var sz = m[k]; return !sz ? tc : tc.replace(/<w:sz w:val="\d+"\/><w:szCs w:val="\d+"\/>/g, '<w:sz w:val="'+sz+'"/><w:szCs w:val="'+sz+'"/>'); }); }   /* 3.111: bề rộng chữ (twip) ô Họ tên / Mục đích Mẫu 06 (ô trừ lề 216) */
