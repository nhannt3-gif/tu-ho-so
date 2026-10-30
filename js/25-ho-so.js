/* ==========================================================
   3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY
   Hai tab con của Số liệu, cùng quy tắc các tab: khối LỌC ĐỊA BÀN → chọn mẫu ở cột trái → tùy chọn → xem A4 ngay khung phải
   → 🖨 In · 📄 PDF · 📝 Word (.docx đúng khổ) · 📤 Gửi.
   - Nguyên tắc (anh chốt): căn cứ số liệu điền tự động hết mức có thể; không có thì để chấm ghi tay.
   - Ô điền 3 màu (chỉ trên màn hình, in ra chữ đen): xanh lá = số liệu · vàng = khai báo 1 lần · chấm = ghi tay.
   - ⚙ Khai báo 1 lần (lưu cùng cài đặt, đồng bộ Drive): PGD · trưởng ấp · tổ phó thực tế · mục đích vay. Người của Hội cấp xã lấy ở 🏛 Khai báo Hội đoàn thể.
   - Quy tắc từng mẫu vay (thời hạn, kỳ hạn, mức vay) CHƯA đặt — anh bàn riêng từng mẫu; các ô đó để chấm.
   - Lời văn mẫu: mẫu công khai của ngành (QĐ 70/QĐ-HĐQT ngày 27/8/2026, QĐ 54); không có dữ liệu thật.
   ========================================================== */
var HSO_MAU = {
  hst: [
    {k:'10c',  ma:'10C/TD mới', ten:'Biên bản họp kết nạp, cho ra khỏi Tổ — mẫu mới QĐ 70 (từ 01/10/2026)', mg:[10, 20, 10, 30]},   /* 3.223 (anh 16/10): 10C cũ / 10C mới là 2 mẫu độc lập, anh tự chọn */
    {k:'10ccu', ma:'10C/TD cũ', ten:'Biên bản họp kết nạp bổ sung, cho ra khỏi Tổ — mẫu cũ (vào tổ đến 30/09/2026)', mg:[10, 20, 10, 30]},
    {k:'10a',  ma:'10A/TD', ten:'Biên bản họp thành lập Tổ', mg:[20, 20, 20, 30]},
    {k:'10b',  ma:'10B/TD', ten:'Biên bản họp kết nạp, thay đổi Ban quản lý Tổ', mg:[20, 20, 20, 30]},
    {k:'10d',  ma:'10D/TD', ten:'Biên bản họp giải thể Tổ', mg:[20, 20, 20, 30]},   /* 3.223 (anh 16/10, phương án a) */
    {k:'11',   ma:'11/TD mới',  ten:'Hợp đồng ủy nhiệm — mẫu mới QĐ 70 (từ 01/10/2026)', mg:[20, 20, 20, 30]},   /* 3.223 (anh 16/10): 11 cũ / 11 mới là 2 mẫu độc lập */
    {k:'11cu', ma:'11/TD cũ',  ten:'Hợp đồng ủy nhiệm — mẫu cũ (trước 01/10/2026)', mg:[20, 20, 17, 30]},
    {k:'01bg', ma:'01/BG',  ten:'Biên bản bàn giao hồ sơ Tổ', mg:[20, 20, 20, 30]},
    {k:'02bg', ma:'02/BG',  ten:'Bàn giao kiêm đối chiếu số dư tiền vay, tiền gửi', ngang:true, mg:[15, 10, 15, 12], so:'xy'}
  ],
  hsv: [   /* 3.171: lề / khổ đo theo PDF anh gửi */
    {k:'sohv', ma:'📒 Sổ hộ vay', ten:'Sổ hộ vay — hộ mới / lấy từ Mẫu 31, lọc địa bàn · ngày nhập, nhóm theo tháng, sửa thẳng từng ô, lập 03/TD, in sổ', ngang:true, mg:[12, 10, 12, 12]},   /* 3.227 (anh 17/10): gộp tab 👪 Hộ vay vào đây */   /* 3.214 (anh 15/10) */   /* 3.207 → 3.209 (anh 14/10): sổ hộ vay lâu dài thay Hộ mới + Bộ HS */
    {k:'01uq', ma:'01/UQ',  ten:'Giấy ủy quyền', mg:[18, 18, 18, 30]},
    {k:'01td', ma:'01/TD',  ten:'Giấy đề nghị vay vốn kiêm phương án sử dụng vốn vay', mg:[12, 18, 10, 22]},
    {k:'03td', ma:'03/TD',  ten:'Danh sách tổ viên đề nghị vay vốn', ngang:true, mg:[10, 12, 10, 9]},
    {k:'06td', ma:'06/TD',  ten:'Phiếu kiểm tra sử dụng vốn vay — dùng Mẫu 06 KTGS (khóa mẫu), nhiều hộ / phiếu', ngang:true, mg:[10, 10, 10, 10]},   /* 3.253 (anh chốt 17–18/10, ý 12–14) */
    {k:'01gqvl', ma:'01/GQVL', ten:'Phương án sử dụng vốn vay GQVL (người lao động) — mẫu từ 01/10/2026 (VB 4039)', mg:[15, 20, 15, 25]},   /* 3.211 */
    {k:'07b',  ma:'07b/GQVL', ten:'Hợp đồng tín dụng GQVL (người lao động) — mẫu từ 01/10/2026 (VB 4039)', mg:[15, 20, 15, 25]},   /* 3.211 */
    {k:'pdnh', ma:'Phê duyệt NH', ten:'Trang Phê duyệt của Ngân hàng (trang cuối mẫu 01.NL) — in riêng, hoặc in kèm 01/GQVL', mg:[20, 20, 20, 30]},   /* 3.310 (anh 21/10) */
    {k:'01tgtv', ma:'01/TGTV', ten:'Giấy đăng ký mở tài khoản tổ viên', mg:[10, 12.5, 16, 7.1], chan:'Ngân hàng Chính sách xã hội|Website: www.vbsp.org.vn Hotline: 1900 638583'},
    {k:'09a',  ma:'09A/TD', ten:'Giấy đề nghị gia hạn nợ', mg:[10, 18, 10, 25]},
    {k:'01tdck', ma:'01/TĐCK', ten:'Giấy đề nghị thay đổi mẫu chữ ký giao dịch', mg:[12, 18, 12, 25]}   /* 3.206 (anh gửi mẫu 14/10, VB 2407 28/3/2025) — in kèm khi gia hạn */
  ]
};
var HSO = {khoa:'', kn:{}, ra:{}, tv:{}, vay:{}, o:{}};   /* lựa chọn trong lần làm việc (đổi tổ / mẫu → làm lại) */
var HSO_TR = {};   /* tổ trưởng / tổ phó kỳ trước theo mã tổ (gợi ý bàn giao, bầu thay) */
var HSO_HEN = null;
function hsoCH(){ var C = D.cauHinh.hsoTK = D.cauHinh.hsoTK || {ky:'', hst:'10c', hsv:'sohv', v209:1}; if(!C.v209){ if(C.hsv==='bo') C.hsv = 'sohv'; C.v209 = 1; } if(C.hsv==='homoi') C.hsv = 'sohv'; return pvGan(C); }   /* 3.211: mở tab Hồ sơ vay vào 👪 Hộ vay (Bộ HS đã ẩn ở 3.209) */
function hsoTab(){ return D.cauHinh.slTab==='hsv' ? 'hsv' : 'hst'; }
function hsoMau(p){ p = p || hsoTab(); var k = hsoCH()[p], ds = HSO_MAU[p]; return ds.find(function(m){ return m.k===k; }) || ds[0]; }
function hsoLuu(){ D.cauHinh.hsoO = D.cauHinh.hsoO || {}; return D.cauHinh.hsoO; }   /* lựa chọn nhớ cho lần sau (mức tiết kiệm, vai trò Hội…) */
PV_DUNG.hst = {S:function(){ return hsoCH(); }, K:function(){ return KHO.kyDung(); }, sau:function(){ hsoVe(); }, toBatBuoc:true, daChieu:true};
PV_DUNG.hsv = {S:function(){ return hsoCH(); }, K:function(){ return KHO.kyDung(); }, sau:function(){ hsoVe(); }, toBatBuoc:true, daChieu:true};

/* ---------- ⚙ khai báo 1 lần ---------- */
var HSO_PGD_O = [['ten','Tên trong câu','Phòng giao dịch NHCSXH Gò Dầu'], ['ngan','Chi nhánh / PGD NHCSXH (điền sau chữ "NHCSXH")','Gò Dầu'], ['kinhGui','Kính gửi (đơn vay)','Ngân hàng Chính sách xã hội Gò Dầu'],
  ['dau1','Đầu trang dòng 1','NHCSXH TỈNH TÂY NINH'], ['dau2','Đầu trang dòng 2','PGD GÒ DẦU'], ['noi','Nơi lập ("…, ngày")','Gò Dầu'], ['tinh','Tỉnh','Tây Ninh'],
  ['daiDien','Người đại diện (ký hợp đồng ủy nhiệm)',''], ['chucVu','Chức vụ người đại diện','Giám đốc'], ['diaChi','Địa chỉ PGD',''], ['dt','Số điện thoại PGD',''], ['cbtd','Cán bộ tín dụng (người lập)','']];
function hsoKB(){
  var k = D.cauHinh.hsoKB = D.cauHinh.hsoKB || {}; k.pgd = k.pgd || {}; k.ap = k.ap || {}; k.pho = k.pho || {}; if(typeof k.md!=='string') k.md = '';
  return k;
}
function hsoPGD(f){ var v = hsoKB().pgd[f], o = HSO_PGD_O.find(function(x){ return x[0]===f; }); return v!==undefined && v!=='' ? v : (o ? o[2] : ''); }
var HSO_KBT = {tab:'pgd', xa:null, diem:'', mo:-1};   /* 3.208: cửa sổ ⚙ Khai báo chung — tab con đang mở, xã / điểm đang lọc trong cửa sổ, thẻ CT đang mở */
function hsoKBTab(k){ HSO_KBT.tab = k; Array.prototype.forEach.call(document.querySelectorAll('.hso-kbp'), function(e){ e.style.display = e.getAttribute('data-kb')===k ? '' : 'none'; });
  Array.prototype.forEach.call(document.querySelectorAll('.hso-kbt'), function(e){ e.classList.toggle('bat', e.getAttribute('data-kb')===k); }); }
function hsoKBHop(tab){   /* 3.208 (anh chốt 14/10): ⚙ Khai báo chung — cửa sổ riêng, tab con: PGD · Trưởng ấp · Tổ phó (chọn xã / điểm) · Chương trình vay (thẻ từng CT) */
  if(typeof tab==='string') HSO_KBT.tab = tab;
  var T = HSO_KBT, kb = hsoKB(), S = hsoCH(), X = hmDiaBan(), ap = {}, to = [];
  if(T.xa===null) T.xa = S.xa || ''; if(T.xa && !X[T.xa]){ T.xa = ''; T.diem = ''; } if(T.diem && !(X[T.xa] && X[T.xa].diem[T.diem])) T.diem = '';
  KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(toLaTT(t) || !t.tenThon) return;
    if(T.xa && t.xa!==T.xa) return; if(T.diem && t.khoaDiem!==T.diem) return; var k = hsoApKhoa(t); if(!ap[k]) ap[k] = {k:k, xa:t.tenXa||'', ap:hsoApTen(t)}; to.push(t); });
  var dsAp = Object.keys(ap).map(function(k){ return ap[k]; }).sort(function(a, b){ return (a.xa+a.ap).localeCompare(b.xa+b.ap, 'vi', {numeric:true}); });
  to.sort(function(a, b){ return (a.tenThon+a.ten).localeCompare(b.tenThon+b.ten, 'vi', {numeric:true}); });
  var o = function(id, nhan, gt, ph, js){ return '<label class="kt-kb"><span>'+nhan+'</span><input'+(id ? ' id="'+id+'"' : '')+' value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph||'')+'" oninput="'+js+'"></label>'; };
  var dsXa = Object.keys(X).map(function(k){ return X[k]; }).sort(function(a, b){ return a.tenXa.localeCompare(b.tenXa, 'vi'); });
  var loc = dsXa.length ? '<div class="hang-nut hso-kb-loc">'+CAY.dong([CAY.o('xa', T.xa, '— tất cả xã ('+dsXa.length+') —', CAY.dsXa(), 'onchange="HSO_KBT.xa=this.value;HSO_KBT.diem=\'\';hsoKBHop()"'),   /* 3.328: cây nhúng dùng chung (js/57) */
    T.xa && Object.keys(X[T.xa].diem).length ? CAY.o('diem', T.diem, '— mọi điểm GD —', CAY.dsDiem(T.xa), 'onchange="HSO_KBT.diem=this.value;hsoKBHop()"') : ''])+'</div>' : '';
  var tabs = [['pgd','🏦 PGD · logo · tên đơn vị'], ['cb','👤 Cán bộ'], ['hoi','🤝 Hội'], ['ap','🏘 Trưởng ấp'], ['pho','👥 Tổ phó'], ['ct','📋 Chương trình vay'], ['tk','🏦 TK 104 / 105'], ['kiem','🔎 Kiểm tra hộ vay'], ['sl','💾 Sao lưu']];   /* 3.223 M1: + 💾 tự lưu / khôi phục / xuất – nạp file */   /* 3.222 (anh 16/10, PA B): 1 cửa sổ khai báo đơn vị cho mọi tab */
  var pane = function(k, h){ return '<div class="hso-kbp" data-kb="'+k+'"'+(T.tab===k ? '' : ' style="display:none"')+'>'+h+'</div>'; };
  moHop('<div class="hop-tit" id="gdx-kbc">⚙ Khai báo đơn vị — dùng chung mọi tab</div><div class="hop-phu">Khai 1 lần, mọi mẫu (Hồ sơ Tổ, Hồ sơ vay, Giao dịch xã) cùng dùng. Lưu cùng cài đặt (đồng bộ Drive). Khai báo riêng từng mẫu (ô ✍ / 🖨, lý do gia hạn…) ở cuối cột trái mỗi mẫu. Người của Hội cấp xã lấy ở '+
      '<a href="#" onclick="event.preventDefault();dongHop();ktCH().che=\'hdt\';ktCH().hdtTab=\'hoi\';slDoiTab(\'kt\')">🏛 Khai báo Hội đoàn thể</a>.</div>'+
    '<div class="hang-nut hso-kb-tab">'+tabs.map(function(x){ return '<button class="nho hso-kbt'+(T.tab===x[0] ? ' bat' : '')+'" data-kb="'+x[0]+'" onclick="hsoKBTab(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>'+
    pane('pgd', '<div class="hso-kb-nhom"><b>🏦 Phòng giao dịch</b><div class="hso-kb-luoi">'+HSO_PGD_O.map(function(x){ return o('hso-kb-'+x[0], x[1], kb.pgd[x[0]], x[2] || 'chưa khai → chấm', 'hsoKB().pgd[\''+x[0]+'\']=this.value.trim();luu()'); }).join('')+'</div></div>'+kbTenGDXHTML()+
      '<div class="hso-kb-nhom"><b>🖼 Logo (in ở mẫu được tích) — '+(kb.logo ? 'logo đã nạp' : 'logo NHCSXH có sẵn')+'</b><div class="hang-nut"><img src="'+hsoLogoSrc()+'" alt="logo" style="height:48px;border:1px solid var(--vien);background:#fff">'+
      '<button class="nho" onclick="hsoLogoTai()" title="Lưu file PNG nền trong suốt">⬇ Tải logo</button>'+
      '<label class="nut-tep nho">📂 Nạp logo khác<input type="file" accept="image/*" style="display:none" onchange="hsoLogoNap(this)"></label>'+(kb.logo ? '<button class="nho" onclick="hsoKB().logo=\'\';luu();hsoKBHop()">↺ Về logo NHCSXH</button>' : '')+'</div>'+
      '<div class="hso-kb-luoi">'+HSO_MAU.hst.concat(HSO_MAU.hsv).filter(function(m){ return m.k!=='bo'; }).map(function(m){ var lm = kb.logoMau || HSO_LOGO_MD;
        return '<label class="hso-o2"><input type="checkbox"'+(lm[m.k] ? ' checked' : '')+' onchange="var k=hsoKB();k.logoMau=k.logoMau||Object.assign({},HSO_LOGO_MD);k.logoMau[\''+m.k+'\']=this.checked;luu()"> '+m.ma+' '+coChuHTML(m.ten)+'</label>'; }).join('')+'</div></div>')+
    pane('ap', '<div class="hso-kb-nhom"><b>🏘 Trưởng ấp / khu phố — '+dsAp.length+' ấp</b>'+loc+
      (dsAp.length ? '<div class="hso-kb-luoi">'+dsAp.map(function(a){ return o('', a.ap+(T.xa ? '' : ' · '+a.xa), kb.ap[a.k], 'họ tên trưởng ấp', 'hsoKB().ap[\''+a.k.replace(/'/g, "\\'")+'\']=this.value.trim();luu()'); }).join('')+'</div>'
        : '<div class="sl-phu">Chưa có số liệu tổ — nạp Mẫu 31 ở 📥 Nạp &amp; KT.</div>')+'</div>')+
    pane('pho', '<div class="hso-kb-nhom"><b>👥 Tổ phó thực tế (tổ trên máy chưa khớp) — '+to.length+' tổ</b>'+loc+
      (to.length ? '<div class="hso-kb-luoi">'+to.slice(0, 200).map(function(t){ return o('', 'Tổ '+(t.ten||t.ma)+' · '+pvApNgan(t.tenThon)+' — máy: '+(t.pho||'chưa có'), kb.pho[t.ma], 'trống = theo máy', 'hsoKB().pho[\''+t.ma+'\']=this.value.trim();luu()'); }).join('')+'</div>'+(to.length>200 ? '<div class="sl-phu">Hiện 200 tổ đầu — chọn xã / điểm để rút gọn.</div>' : '') : '<div class="sl-phu">Chưa có số liệu tổ.</div>')+'</div>')+
    pane('ct', hsoCTVHTML())+
    pane('cb', typeof gdxCanBoHTML==='function' ? gdxCanBoHTML()+'<div class="sl-phu">Dùng ở ô chọn cán bộ của các mẫu Giao dịch xã (12/GDX, 04/TD…). Cán bộ tín dụng lập hồ sơ vay: tab 🏦 PGD (ô \"Cán bộ tín dụng\").</div>' : '')+
    pane('hoi', kbHoiHTML())+pane('tk', typeof tkKhoiHTML==='function' ? tkKhoiHTML() : '')+pane('kiem', typeof khKBHTML==='function' ? khKBHTML() : '')+pane('sl', (typeof kbSaoLuuHTML==='function' ? kbSaoLuuHTML() : '')+(typeof gxKBHTML==='function' ? gxKBHTML() : ''))+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop();hsoVe();if(typeof gdxVeTrai===\'function\'&&document.getElementById(\'gdx-trai\'))gdxVeTrai()">Xong</button></div>', true);
}
/* ---------- 3.208 (anh chốt 14/10): CHƯƠNG TRÌNH VAY — mỗi CT 1 thẻ (D.cauHinh.hsoKB.ctv): tên tắt, tên in 01/03, đối tượng thụ hưởng, mục đích, mức vay, thời hạn / kỳ hạn ghi sẵn hay chấm ----------
   kieu: 'hssv' (tên SV, số tháng + số tiền gõ tay) · 'congtrinh' (xây mới / sửa chữa, mỗi công trình 1 dòng, mức vay 1 công trình) · 'chung' (1 mục đích + số tiền) */
var HSO_CTV_MD = [
  {ma:'HSSV', ten:'Học sinh sinh viên', kieu:'hssv', loai:false, ctr:[], md:['Chi phí học tập, sinh hoạt'], dtth:['Hộ gia đình gặp khó khăn về kinh tế, tài chính do bệnh tật'], dtthMd:'Hộ gia đình gặp khó khăn về kinh tế, tài chính do bệnh tật', dtthPh:'Hộ gia đình gặp khó khăn về kinh tế, tài chính do bệnh tật', th:'', thIn:'cham', ky:'12', kyIn:'in', ubnd:true, nhcsxh:true, bat:true},
  {ma:'NSVSMT', ten:'Cấp nước sạch và vệ sinh môi trường nông thôn', kieu:'congtrinh', loai:true, ctr:[{ten:'Công trình cấp nước', tien:'25000000'}, {ten:'Công trình vệ sinh', tien:'25000000'}], md:[],
    dtth:['Hộ gia đình cư trú tại vùng nông thôn', 'Hộ gia đình ở khu vực thành thị'], dtthMd:'Hộ gia đình cư trú tại vùng nông thôn', dtthPh:'Hộ gia đình ở khu vực thành thị', th:'60', thIn:'in', ky:'12', kyIn:'in', ubnd:false, nhcsxh:false, bat:true, tuCo:'5000000'},
  {ma:'GQVL', ten:'Hỗ trợ tạo việc làm, duy trì và mở rộng việc làm', kieu:'gqvl', loai:false, ctr:[], md:['Chăn nuôi bò sinh sản', 'Chăn nuôi heo', 'Trồng cây ăn trái', 'Kinh doanh, dịch vụ'], dtth:['Người lao động'], dtthMd:'Người lao động', dtthPh:'Người lao động',
    th:'60', thIn:'in', ky:'24', kyIn:'in', ubnd:false, nhcsxh:false, bat:true, ls:'7,9248', lsUT:'6,24', qh:'130', lamTron:'100000', kyLai:'hằng tháng', chipTien:['30000000', '50000000', '100000000', '200000000']}   /* 3.211 (anh chốt 14/10): mẫu riêng 01/GQVL + 07b */
];
var HSO_CTV_TRONG = {ma:'', ten:'', kieu:'chung', loai:false, loaiDs:['Xây mới', 'Sửa chữa'], tuCo:'', ctr:[], md:[], dtth:[], dtthMd:'', dtthPh:'', th:'', thIn:'cham', ky:'', kyIn:'cham', ubnd:false, nhcsxh:false, bat:true, ls:'', lsUT:'', qh:'130', lamTron:'100000', kyLai:'hằng tháng', chipTien:[]};
function hsoCTVDs(){
  var kb = hsoKB();
  if(!Array.isArray(kb.ctv)){ kb.ctv = HSO_CTV_MD.map(function(c){ return JSON.parse(JSON.stringify(c)); });
    [['md','md'], ['dtth','dtth']].forEach(function(f){ String(kb[f[0]]||'').split(/\n/).forEach(function(d){ d = d.trim(); if(!d) return; var m = d.match(/^([A-Za-z]{2,10})\s*:\s*(.+)$/);   /* chuyển khai báo cũ "MÃ: …" (không mã = mọi CT) vào thẻ */
      kb.ctv.forEach(function(c){ if(m && m[1].toUpperCase()!==c.ma) return; var v = m ? m[2].trim() : d; if(c[f[1]].indexOf(v)<0) c[f[1]].push(v); }); }); }); }
  kb.ctv.forEach(function(c, i){ if(c.ma==='GQVL' && c.rieng){ var m = JSON.parse(JSON.stringify(HSO_CTV_MD[2])); ['md','dtth'].forEach(function(f){ if(c[f] && c[f].length) m[f] = c[f]; }); kb.ctv[i] = c = m; } });   /* 3.211: thẻ GQVL tạm (3.208) → dạng GQVL */
  kb.ctv.forEach(function(c){ Object.keys(HSO_CTV_TRONG).forEach(function(f){ if(c[f]===undefined) c[f] = JSON.parse(JSON.stringify(HSO_CTV_TRONG[f])); }); });
  if(!kb.v251){ kb.v251 = 1; kb.ctv.forEach(function(c){ if(c.ma==='HSSV' && !(c.dtth||[]).length && !c.dtthMd && !c.dtthPh){ var md = HSO_CTV_MD[0]; c.dtth = md.dtth.slice(); c.dtthMd = md.dtthMd; c.dtthPh = md.dtthPh; } }); }   /* 3.251 (anh 18/10): HSSV có 1 ĐTTH mặc định — thẻ đã lưu còn trống thì điền 1 lần */
  return kb.ctv;
}
function hsoCTV(ma){ if(!ma) return null; var u = String(ma).toUpperCase(); return hsoCTVDs().find(function(c){ return c.ma===u; }) || Object.assign(JSON.parse(JSON.stringify(HSO_CTV_TRONG)), {ma:u, ten:HSO_CT[u] || ma}); }
function hsoCTTenIn(ma){ var c = hsoCTV(ma); return c ? (c.ten || HSO_CT[c.ma] || c.ma) : ''; }
function hsoCTDat(i, f, v, kieu, ve){
  var ds = hsoCTVDs(), c = ds[i]; if(!c) return;
  if(kieu==='ds') v = String(v||'').split(/\n/).map(function(x){ return x.trim(); }).filter(Boolean);
  if(kieu==='so') v = String(v||'').replace(/[^\d]/g, '');
  if(f==='ma'){ v = String(v||'').trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');
    if(!v || ds.some(function(x, k){ return k!==i && x.ma===v; })){ bao(v ? 'Tên tắt '+v+' đã có.' : 'Tên tắt không được trống (chữ không dấu, số).'); HSO_KBT.mo = i; hsoKBHop(); return; }
    hsoBoDs().forEach(function(b){ if(b.ct===c.ma) b.ct = v; }); }
  c[f] = v; luu(); if(ve){ HSO_KBT.mo = i; hsoKBHop(); }
}
function hsoCTCtr(i, j, f, v){ var c = hsoCTVDs()[i]; if(!c || !c.ctr[j]) return; c.ctr[j][f] = f==='tien' ? String(v||'').replace(/[^\d]/g, '') : String(v||'').trim(); luu(); }
function hsoCTCtrThem(i){ var c = hsoCTVDs()[i]; if(!c) return; c.ctr.push({ten:'', tien:''}); luu(); HSO_KBT.mo = i; hsoKBHop(); }
function hsoCTCtrBo(i, j){ var c = hsoCTVDs()[i]; if(!c) return; c.ctr.splice(j, 1); luu(); HSO_KBT.mo = i; hsoKBHop(); }
function hsoCTThem(){ var ds = hsoCTVDs(), n = ds.length+1; while(ds.some(function(c){ return c.ma==='CT'+n; })) n++;
  ds.push(Object.assign(JSON.parse(JSON.stringify(HSO_CTV_TRONG)), {ma:'CT'+n})); luu(); HSO_KBT.mo = ds.length-1; hsoKBHop(); }
function hsoCTXoa(i){ var ds = hsoCTVDs(), c = ds[i]; if(!c) return; var dung = hsoBoDs().filter(function(b){ return b.ct===c.ma; }).length;
  hoi('Xóa thẻ chương trình '+c.ma+'?', dung ? dung+' bộ hồ sơ đang dùng mã này — vẫn giữ, in theo tên tắt.' : 'Chưa bộ hồ sơ nào dùng.', 'Xóa', function(){ ds.splice(i, 1); luu(); HSO_KBT.mo = -1; hsoKBHop('ct'); }); }
function hsoCTSw(i, f, gt){ var c = hsoCTVDs()[i], v = c[f]==='in' ? 'in' : 'cham';
  return '<span class="hso-sw"><button class="'+(v==='cham' ? 'bat' : '')+'" onclick="hsoCTDat('+i+',\''+f+'\',\'cham\',0,1)" title="Để chấm — ghi tay">✍ Chấm</button><button class="'+(v==='in' ? 'bat' : '')+'" onclick="hsoCTDat('+i+',\''+f+'\',\'in\',0,1)" title="Ghi sẵn số đã khai">🖨 Ghi sẵn</button></span>'; }
function hsoCTVHTML(){   /* tab 📋 Chương trình vay trong ⚙ Khai báo chung */
  var ds = hsoCTVDs(), o = function(i, nhan, f, gt, ph, kieu){ return '<label class="kt-kb"><span>'+nhan+'</span><input value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoCTDat('+i+',\''+f+'\',this.value'+(kieu ? ',\''+kieu+'\'' : '')+')"></label>'; };
  var lop = function(i, nhan, f, gt, ghi){ return '<label class="kt-kb"><span>'+nhan+'</span><textarea rows="3" onchange="hsoCTDat('+i+',\''+f+'\',this.value,\'ds\',1)">'+coChuHTML((gt||[]).join('\n'))+'</textarea></label>'+(ghi ? '<div class="sl-phu">'+ghi+'</div>' : ''); };
  var chon = function(i, nhan, f, gt, ops){ return '<label class="kt-kb"><span>'+nhan+'</span><select onchange="hsoCTDat('+i+',\''+f+'\',this.value,0,1)">'+ops.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(String(x[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select></label>'; };
  var tick = function(i, nhan, f, gt){ return '<label class="hso-o2"><input type="checkbox"'+(gt ? ' checked' : '')+' onchange="hsoCTDat('+i+',\''+f+'\',this.checked,0,1)"> '+nhan+'</label>'; };
  return '<div class="sl-phu">Mỗi chương trình 1 thẻ. Chọn chương trình ở <b>Bộ HS</b> → 01/TD, 03/TD tự điền tên chương trình, mục đích, đối tượng thụ hưởng, thời hạn, kỳ hạn. Ô <b>✍ Chấm</b> để trống ghi tay; <b>🖨 Ghi sẵn</b> in số đã khai (bộ hồ sơ gõ số khác thì in số đã gõ).</div>'+
    ds.map(function(c, i){ var ddt = [['', '— không —']].concat(c.dtth.map(function(x){ return [x, x]; }));
      return '<details class="hso-kb-nhom hso-ctv"'+(HSO_KBT.mo===i ? ' open' : '')+'><summary><b>'+coChuHTML(c.ma)+'</b> · '+coChuHTML(c.ten || '(chưa có tên in)')+(c.bat===false ? ' <small>(tắt)</small>' : '')+'</summary>'+
        (c.rieng ? '<div class="sl-bao vang">'+coChuHTML(c.rieng)+'</div>' : '')+'<div class="hso-kb-luoi">'+o(i, 'Tên tắt (gọi nhanh)', 'ma', c.ma, 'HSSV, GQVL…')+o(i, 'Tên ghi trên 01/TD, 03/TD', 'ten', c.ten, 'Chương trình cho vay: …')+
        chon(i, 'Dạng phương án', 'kieu', c.kieu, [['hssv','Học sinh sinh viên — tên SV, số tháng, số tiền gõ tay'], ['congtrinh','Theo công trình — mỗi công trình 1 dòng'], ['chung','1 mục đích + số tiền'], ['gqvl','GQVL — 01/GQVL + 07b, lịch trả gốc tự chia']])+'</div>'+
        (c.kieu==='congtrinh' ? '<div class="nhan-nhom">Công trình · mức vay 1 công trình</div>'+tick(i, 'Có chọn <b>Xây mới / Sửa chữa</b>', 'loai', c.loai)+(c.loai ? '<div class="hso-kb-luoi">'+lop(i, 'Lựa chọn phương án', 'loaiDs', c.loaiDs, 'Mỗi dòng 1 lựa chọn (vd Xây mới · Sửa chữa · Cải tạo) — 01/TD chọn 1, ghép với công trình đã tích.')+'</div>' : '')+
          c.ctr.map(function(x, j){ return '<div class="hso-ho"><input style="width:52%" value="'+coChuHTML(x.ten||'')+'" placeholder="Công trình …" onchange="hsoCTCtr('+i+','+j+',\'ten\',this.value)"> <input style="width:30%" value="'+coChuHTML(x.tien ? tdnTien(+x.tien) : '')+'" placeholder="mức vay (đ)" onchange="hsoCTCtr('+i+','+j+',\'tien\',this.value)"> <button class="nho" title="Bỏ" onclick="hsoCTCtrBo('+i+','+j+')">✕</button></div>'; }).join('')+
          '<button class="nho" onclick="hsoCTCtrThem('+i+')">+ Công trình</button>' : '')+
        (c.kieu==='gqvl' ? '<div class="nhan-nhom">GQVL — lãi suất, lịch trả gốc (07b)</div><div class="hso-kb-luoi">'+o(i, 'Lãi suất cho vay %/năm', 'ls', c.ls, '7,9248')+o(i, 'Lãi suất ưu tiên %/năm', 'lsUT', c.lsUT, '6,24')+o(i, 'Lãi quá hạn (% lãi cho vay)', 'qh', c.qh, '130')+
          o(i, 'Làm tròn kỳ trả gốc (đ)', 'lamTron', c.lamTron, '100000', 'so')+o(i, 'Kỳ hạn trả lãi', 'kyLai', c.kyLai, 'hằng tháng')+lop(i, 'Chip số tiền (đ)', 'chipTien', c.chipTien, 'Mỗi dòng 1 số — nút chọn nhanh ở 01/GQVL.')+'</div>' : '')+
        '<div class="hso-kb-luoi">'+lop(i, 'Mục đích vay', 'md', c.md, c.kieu==='congtrinh' ? 'Trống = tự ghép "Xây mới / Sửa chữa + công trình …". Ghi dòng nào thì Bộ HS chọn được dòng đó (ghi sao in vậy).' : 'Mỗi dòng 1 mục — Bộ HS chọn.')+
        lop(i, 'Đối tượng thụ hưởng', 'dtth', c.dtth, 'Mỗi dòng 1 mục — cột 3 mẫu 03/TD, Bộ HS chọn theo từng hộ.')+'</div>'+
        (c.dtth.length ? '<div class="hso-kb-luoi">'+chon(i, 'Mặc định (xã)', 'dtthMd', c.dtthMd, ddt)+chon(i, 'Mặc định (phường)', 'dtthPh', c.dtthPh, ddt)+'</div>' : '')+
        '<div class="hso-kb-luoi">'+o(i, 'Vốn tự có mặc định (đ)', 'tuCo', c.tuCo, 'trống = để chấm / gõ khi lập', 'so')+'</div>'+
        '<div class="hso-cham-o"><span class="hso-cham-nhan">Thời hạn vay</span>'+hsoCTSw(i, 'thIn')+' <input class="hso-so" value="'+coChuHTML(c.th||'')+'" placeholder="số tháng" onchange="hsoCTDat('+i+',\'th\',this.value,\'so\')"> tháng</div>'+
        '<div class="hso-cham-o"><span class="hso-cham-nhan">Kỳ hạn trả nợ (phân kỳ)</span>'+hsoCTSw(i, 'kyIn')+' <input class="hso-so" value="'+coChuHTML(c.ky||'')+'" placeholder="số tháng" onchange="hsoCTDat('+i+',\'ky\',this.value,\'so\')"> tháng/lần</div>'+
        '<div class="hang-nut">'+tick(i, 'Đơn 01/TD có khối <b>Xác nhận của UBND xã</b>', 'ubnd', c.ubnd)+tick(i, 'Hiện ở Bộ HS', 'bat', c.bat!==false)+'</div>'+
        '<div class="hang-nut"><button class="nho" onclick="hsoCTXoa('+i+')">🗑 Xóa thẻ</button></div></details>'; }).join('')+
    '<div class="hang-nut"><button class="nho chinh" onclick="hsoCTThem()">＋ Chương trình</button></div>';
}
function hsoApTen(t){ return String((t && t.tenThon) || '').replace(/^(ấp|ap|thôn|khu phố|kp)\.?\s+/i, '').trim(); }
function hsoApKhoa(t){ return (t.xa||'')+'|'+(t.thon || hsoApTen(t)); }
function hsoXaTen(tenXa){ return String(tenXa||'').trim().replace(/^(xã|phường|thị trấn|đặc khu)\s+/i, ''); }

/* ---------- thông tin tổ / khách dùng cho mẫu ---------- */
function hsoTo(t){
  var kb = hsoKB(), r = {tinh:hsoPGD('tinh')};
  if(!t) return r;
  r.ma = t.ma; r.tt = t.ten || ''; r.phoMay = t.pho || ''; r.pho = kb.pho[t.ma] || t.pho || ''; r.phoKB = !!kb.pho[t.ma];
  r.ap = hsoApTen(t); r.xa = hsoXaTen(t.tenXa); r.xaDu = ktXaChu(t.tenXa); r.capAp = ktCapAp(t.tenXa); r.truongAp = kb.ap[hsoApKhoa(t)] || '';
  var co = String(t.dv||'') && String(t.dv)!=='99';
  r.hoiNgan = co ? (ktChuan(t).ten || tdnHoi(t.dv)) : ''; r.hoi = co ? (ktHoiKB(ktHoiKhoa(t)).ten || ktHoiTenTD(t)) : '';
  r.diem = String(t.tenDiem||'').trim(); r.ngayGD = t.ngayGD || '';
  return r;
}
function hsoBoHoi(s){ return String(s||'').replace(/^(Hội|Đoàn)\s+/i, ''); }
function hsoHoiO(T, n){ var h = T.hoi || ''; return /^Hội\s/i.test(h) || !h ? 'Hội '+hsoO(hsoBoHoi(h), 'sl', n) : hsoO(h, 'sl', n); }   /* mẫu ghi "Hội ……": Hội → "Hội " + tên; Đoàn TN → tên đầy đủ (không thành "Hội Đoàn…") */
function hsoNguoiHoi(t){ var vt = hsoLuu().hoiVT; if(vt===undefined) vt = 'pct'; return t && vt ? ktNguoi(t, vt) : {cb:'', cv:''}; }
function hsoTVTo(t){ return t ? KHO.toVien(t) : []; }   /* 3.216: qua cửa KHO */
function hsoTruoc(t){   /* tổ trưởng, tổ phó kỳ trước (Mẫu 31 tháng trước) — gợi ý Bên giao / Bên nhận, bầu thay */
  if(!t || !KHO.coKy()) return null; var tr = kyLui(KHO.ky().thang, -1), k = tr+'|'+t.ma;
  if(HSO_TR[k]!==undefined) return HSO_TR[k];
  if(!KHO.coBang('hstd', tr)){ HSO_TR[k] = null; return null; }
  HSO_TR[k] = null; var cu = KHO.kyDung();   /* đọc kỳ trước rồi trả lại kỳ đang dựng (ngoại lệ: đổi kỳ là việc của tab) */
  KHO.nap(tr).then(function(K2){ KHO.datKy(cu); slDung(cu.ky); var x = K2.to[t.ma]; HSO_TR[k] = x ? {ten:x.ten||'', pho:x.pho||''} : null; if(HSO_TR[k] && document.getElementById('hso-ds')) hsoVe(); }).catch(function(){ KHO.datKy(cu); });
  return null;
}

/* ---------- ô điền ---------- */
function hsoCham(n){ return Array((n||14)+1).join('.'); }
function hsoO(v, loai, n){ v = v==null ? '' : String(v).trim(); return v ? '<span class="o-'+(loai||'sl')+'">'+coChuHTML(v)+'</span>' : '<span class="o-tay">'+hsoCham(n)+'</span>'; }
function hsoNg(iso){ var m = String(iso||'').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? {d:m[3], m:m[2], y:m[1]} : null; }
function hsoNgayO(iso, loai){ var n = hsoNg(iso); return n ? hsoO(n.d+'/'+n.m+'/'+n.y, loai||'kb') : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8); }
function hsoNTN(iso, loai){ var n = hsoNg(iso); return n ? 'ngày '+hsoO(n.d, loai||'kb')+' tháng '+hsoO(n.m, loai||'kb')+' năm '+hsoO(n.y, loai||'kb') : 'ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(7); }
function hsoDoc3(n, du){
  var cs = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'], tr = Math.floor(n/100), ch = Math.floor(n%100/10), dv = n%10, r = [];
  if(tr || du) r.push(cs[tr]+' trăm');
  if(ch===0){ if(dv && (tr || du)) r.push('linh'); }
  else r.push(ch===1 ? 'mười' : cs[ch]+' mươi');
  if(dv) r.push(dv===1 && ch>1 ? 'mốt' : dv===5 && ch>0 ? 'lăm' : cs[dv]);
  return r.join(' ');
}
function hsoChuSo(n){   /* 80000000 → "Tám mươi triệu đồng" */
  n = Math.round(Math.abs(+n||0)); if(!n) return 'Không đồng';
  var nhom = [], ten = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ'], r = [];
  while(n>0){ nhom.push(n%1000); n = Math.floor(n/1000); }
  for(var i=nhom.length-1;i>=0;i--) if(nhom[i]) r.push(hsoDoc3(nhom[i], i<nhom.length-1)+(ten[i]||''));
  var s = r.join(' ')+' đồng';
  return s.charAt(0).toUpperCase()+s.slice(1);
}
function hsoSo(v){ return +String(v||'').replace(/[^\d]/g, '') || 0; }
function hsoCTTen(ma){ return ma ? (CT_VT_TEN[ma] || ma) : ''; }
function hsoCTMon(m){ var v = ctNgan(m.ct, m); return CT_VT_TEN[v] || v; }

/* ---------- khối dựng chung ---------- */
function hsoQH(gach, co){   /* quốc hiệu + tiêu ngữ + kẻ mảnh dài bằng dòng tiêu ngữ (gach: "-" hoặc "–" theo PDF từng mẫu) */
  gach = gach || '-'; co = co || 13; var l = 'c b'+(co!==13 ? ' s'+co : '')+'" style="font-size:'+co+'pt';   /* 3.254: cỡ quốc hiệu cố định theo mẫu (không theo cỡ chữ thân khai báo riêng) → gạch tiêu ngữ luôn vừa chữ */
  var tn = 'Độc lập '+gach+' Tự do '+gach+' Hạnh phúc', dai = typeof omRong==='function' ? Math.round(omRong(tn, co, true)*10)/10 : Math.round(co*4.65);   /* 3.249 (anh 18/10): gạch dài vừa đúng dòng tiêu ngữ, không dài hơn */
  return '<p class="'+l+'">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="'+l+'">'+tn+'</p>'+hsoKe(dai);
}
function hsoMauSo(ma, lap){ return '<p class="r b s11">Mẫu số: '+ma+'</p>'+(lap||[]).map(function(x){ return '<p class="r i s11">'+x+'</p>'; }).join(''); }
function hsoBang(lop, w, rows){ return '<table class="'+lop+'" data-w="'+w.join(',')+'"><colgroup>'+w.map(function(x){ var t = w.reduce(function(a, b){ return a+b; }, 0); return '<col style="width:'+(x/t*100).toFixed(2)+'%">'; }).join('')+'</colgroup>'+rows+'</table>'; }
function hsoKy(ds){   /* [[tiêu đề, dòng phụ, tên, loại]] */
  return hsoBang('khung0 hso-ky', ds.map(function(){ return 1; }), '<tr>'+ds.map(function(k){
    return '<td class="c"><p class="c b">'+k[0]+'</p><p class="c i s12">'+(k[1]===undefined ? '(Ký, ghi rõ họ tên)' : k[1])+'</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c b">'+(k[2] ? hsoO(k[2], k[3]||'sl') : '&nbsp;')+'</p></td>'; }).join('')+'</tr>');
}
function hsoTrang(M, than, ten){   /* 1 mẫu, hoặc nhiều mẫu (M = [{M, h}]) — mỗi mẫu 1 bản .kt-to có khổ / lề / số trang riêng */
  var ds = Array.isArray(M) ? M : [{M:M, h:than}], M0 = ds[0].M, mg0 = M0.mg || [20, 20, 20, 30];
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+coChuHTML(ten||M0.ma)+'</title><style>@page{size:A4 '+(M0.ngang ? 'landscape' : 'portrait')+';margin:'+mg0.map(function(x){ return x+'mm'; }).join(' ')+'}'+
    'body{font-family:"Times New Roman",Times,serif;font-size:13pt;color:#000;line-height:1.22;margin:0}p{margin:0 0 1.5pt}'+
    '.c{text-align:center}.r{text-align:right}.j{text-align:justify}.b{font-weight:bold}.i{font-style:italic}.u{text-decoration:underline}.thut{text-indent:10mm}.tr{margin-top:6pt}.tr2{margin-top:2.5pt}.sau{margin-bottom:6pt}.l1{margin-left:8mm}.l2{margin-left:14mm}.l4{margin-left:22mm}'+
    '.s9{font-size:9pt}.s10{font-size:10pt}.s11{font-size:11pt}.s12{font-size:12pt}.s13{font-size:13pt}.s14{font-size:14pt}.s15{font-size:15pt}'+
    'p.ke{height:1px;margin:-1pt auto 4pt;padding:0;border:0;background:#000;transform:scaleY(.55);-webkit-print-color-adjust:exact;print-color-adjust:exact}td>p.ke{margin-left:auto;margin-right:auto}'+
    'table{border-collapse:collapse;width:100%;table-layout:fixed}table.luoi td{border:.5pt solid #000;padding:1pt 3pt;vertical-align:middle}table.luoi.s11 td,table.luoi.s10 td{padding:0 2pt}'+
    'table.luoi.cham tbody tr+tr td{border-top:.5pt dotted #777}table.luoi.cham tbody tr td{border-bottom:.5pt dotted #777}table.luoi.cham tr.het td{border-bottom:.5pt solid #000}table.luoi.cham thead td{border-bottom:.5pt solid #000}'+
    'table.ngoai{border:.5pt solid #000}table.ngoai>tbody>tr>td,table.ngoai>tr>td{padding:1pt 4pt;vertical-align:top}table.ngoai td.tieu{border-top:.5pt solid #000;border-bottom:.5pt solid #000}table.khung0 td{vertical-align:top;padding:0 2pt}table.luoi td p{margin:0}.hso-ky{margin-top:6pt}td.nen{background:#538135;color:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}td.tg-ck{vertical-align:top}.tg-ckk{border:.75pt dashed #000;height:27mm;margin:2pt 4pt 4pt}img.hso-logo{display:block}.o-hop{display:inline-block;min-width:4mm;border:.5pt solid #000;text-align:center}'+
    '.om-goc p{margin:0}.om-goc p.ke,.om-goc .t3 p.ke{margin:.5pt auto 2.5pt}.om-goc table.luoi td{padding-top:0;padding-bottom:0}.om-goc .t3 p{margin-top:3pt}.om-goc .t1 p{margin-top:1pt}.om-goc .t6 p{margin-top:6pt}.om-goc .t11 p{margin:1pt 0}.tgtv p{line-height:1.15}.kt-ho{break-inside:avoid}.o-sl{background:#d9f0d3}.o-kb{background:#fff0b3}@media print{.o-sl,.o-kb{background:none}}</style></head><body>'+
    ds.map(function(x){ var mg = x.M.mg || [20, 20, 20, 30];
      return '<div class="kt-to" data-tr-ngang="'+(x.M.ngang ? 1 : 0)+'" data-tr-mg="'+mg.join(' ')+'" data-tr-so="'+(x.M.so || 'khong')+'"'+(x.M.chan ? ' data-tr-chan="'+coChuHTML(x.M.chan)+'"' : '')+'>'+x.h+'</div>'; }).join('')+'</body></html>';
}

/* ---------- 10C/TD ---------- */
function hso10cMoi(ngay){ var c = hsoLuu().mau10c || 'tu'; return c==='moi' ? true : c==='cu' ? false : (ngay || ngayISO(nay())) >= '2026-10-01'; }
function hsoKNRa(t, tv){   /* danh sách kết nạp / cho ra theo tích chọn + số tổ viên trước / sau họp */
  var kn = tv.filter(function(k){ return HSO.kn[k.kh]; }).map(function(k){ return {kh:k.kh, ten:k.ten}; });
  Object.keys(HSO.kn).forEach(function(kh){ if(HSO.kn[kh] && !kn.some(function(x){ return x.kh===kh; })){ var c = hsoKhach(kh, t); kn.push({kh:kh, ten:c.ten||kh}); } });
  var ra = [], co = {};
  (TO_BD && TO_BD.to===t.ma && TO_BD.co ? TO_BD.ra : []).forEach(function(r){ if(HSO.ra[r.kh]){ ra.push({kh:r.kh, ten:r.ten}); co[r.kh] = 1; } });
  tv.forEach(function(k){ if(HSO.ra[k.kh] && !co[k.kh]){ ra.push({kh:k.kh, ten:k.ten}); co[k.kh] = 1; } });
  var tap = {}; tv.forEach(function(k){ tap[k.kh] = 1; });
  kn.forEach(function(x){ delete tap[x.kh]; }); ra.forEach(function(x){ tap[x.kh] = 1; });
  var truoc = Object.keys(tap).length; kn.forEach(function(x){ tap[x.kh] = 1; }); ra.forEach(function(x){ delete tap[x.kh]; });
  return {kn:kn, ra:ra, truoc:truoc, sau:Object.keys(tap).length};
}
function hsoBangTen2(ds, nhan, toiThieu){   /* STT · Họ tên │ STT · Họ tên — chia đôi danh sách */
  var n = Math.max(toiThieu||5, Math.ceil(ds.length/2)), h = '<thead><tr><td class="c b">STT</td><td class="c b">'+nhan+'</td><td class="c b">STT</td><td class="c b">'+nhan+'</td></tr></thead>';
  for(var i=0;i<n;i++){ var a = ds[i], b = ds[i+n];
    h += '<tr><td class="c">'+(a ? i+1 : '')+'</td><td>'+(a ? hsoO(a.ten) : '')+'</td><td class="c">'+(b ? i+n+1 : '')+'</td><td>'+(b ? hsoO(b.ten) : '')+'</td></tr>'; }
  return hsoBang('luoi', [8, 42, 8, 42], h);
}
function hsoLap10c(t, X){
  var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, ng = HSO.o.ngay || '', moi = X && X.moi ? true : X && X.cu ? false : X && X.moiChon ? true : hso10cMoi(ng), N = hsoNguoiHoi(t), tk = hsoLuu().tkMin || '';
  if(X && X.kn){ var moiVao = X.kn.filter(function(x){ return !tv.some(function(k){ return k.kh && k.kh===x.kh; }); }).length; L = {kn:X.kn, ra:[], truoc:tv.length, sau:tv.length+moiVao}; }   /* 3.171: biên bản trong bộ hồ sơ vay (hộ mới → kết nạp; mục 2 = người đề nghị vay) */
  var gioNgay = 'Thời gian bắt đầu: '+hsoCham(6)+' giờ '+hsoCham(6)+', '+(ng ? 'ngày '+hsoNgayO(ng) : 'ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8));
  var h;
  if(!moi){
    h = hsoMauSo('10C/TD')+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c b">Về việc kết nạp bổ sung tổ viên, cho tổ viên ra khỏi Tổ TK&amp;VV</p>'+
      '<p class="tr">'+gioNgay+'</p><p>- Địa điểm: Ấp (kp) '+hsoO(T.ap)+', xã (phường) '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p><p>- Thành phần tham dự:</p>'+
      '<p>+ Có '+hsoCham(6)+'/'+hsoO(t ? String(L.truoc) : '', 'sl', 6)+' tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) '+hsoO(T.tt)+' thuộc '+hsoHoiO(T)+'</p>'+
      '<p>+ Ông (bà) '+hsoO(T.truongAp, 'kb', 25)+' là Trưởng ấp chứng kiến cuộc họp.</p>'+
      '<p>+ Ông (bà) '+hsoO(N.cb, 'kb', 25)+', chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+', chứng kiến cuộc họp.</p>'+
      '<p>Chủ trì: Ông (bà) '+hsoO(T.tt, 'sl', 25)+', chức vụ: Tổ trưởng Tổ TK&amp;VV.</p><p>Thư ký: Ông (bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 25)+', chức vụ: Tổ phó Tổ TK&amp;VV.</p>'+
      '<p class="c b tr">NỘI DUNG</p><p class="j">1. Kết nạp bổ sung tổ viên vào Tổ TK&amp;VV: Tổng số '+hsoCham(6)+'/'+hsoCham(6)+' tổ viên dự họp tán thành kết nạp bổ sung các tổ viên sau:</p>'+hsoBangTen2(L.kn, 'Họ và tên', 3)+
      '<p class="j tr">2. Đối với việc cho tổ viên ra khỏi Tổ TK&amp;VV: Số tổ viên dự họp '+hsoCham(6)+'/'+hsoCham(6)+' tán thành cho ra khỏi tổ đối với các tổ viên sau:</p>'+hsoBangTen2(L.ra, 'Họ và tên', 3)+
      '<p class="j tr">3. Tổng số tổ viên của Tổ sau kỳ họp này là: '+hsoO(t ? String(L.sau) : '', 'sl', 8)+'. Các tổ viên mới được kết nạp cam kết thực hiện tốt quy ước hoạt động của Tổ. Cam kết thực hiện gửi tiền tiết kiệm hàng tháng với mức tối thiểu là '+hsoO(tk ? tdnTien(hsoSo(tk)) : '', 'kb', 12)+' đồng, kể từ tháng '+hsoCham(5)+'/'+hsoCham(8)+'.</p>'+
      '<p>4. Nội dung khác (nếu có): '+hsoCham(70)+'</p><p>'+hsoCham(110)+'</p>'+
      '<p class="j">Nội dung Biên bản được thông qua và các thành phần dự họp đều tán thành.</p><p>Cuộc họp kết thúc vào '+hsoCham(5)+' giờ '+hsoCham(5)+', ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'</p>'+
      hsoKy([['THƯ KÝ', '', T.pho, T.phoKB ? 'kb' : 'sl'], ['HỘI, ĐOÀN THỂ CẤP XÃ (PHƯỜNG)', '(Ký tên, đóng dấu)', N.cb, 'kb']])+hsoKy([['CHỦ TRÌ', '', T.tt], ['TRƯỞNG ẤP (KP)', '', T.truongAp, 'kb']]);
    return {ma:'10C/TD (mẫu cũ)', h:h};
  }
  var vv = L.kn.length || L.ra.length ? 'kết nạp, cho tổ viên ra khỏi Tổ' : '';
  var hang = '', n = Math.max(5, L.kn.length, L.ra.length);
  for(var i=0;i<n;i++) hang += '<tr><td class="c">'+(i+1)+'</td><td>'+(L.kn[i] ? hsoO(L.kn[i].ten) : '')+'</td><td class="c">'+(i+1)+'</td><td>'+(L.ra[i] ? hsoO(L.ra[i].ten) : '')+'</td></tr>';
  var vay = '<thead><tr><td class="c b">Stt</td><td class="c b">Họ và tên</td><td class="c b">Chương trình vay</td><td class="c b">Số tiền đề nghị cho vay</td><td class="c b">Mục đích sử dụng vốn vay</td><td class="c b">Thời hạn đề nghị cho vay (tháng)</td></tr></thead>';
  var dv = (X && X.vay) || [];
  for(var j=0;j<Math.max(8, dv.length);j++){ var v = dv[j]; vay += '<tr><td class="c">'+(j+1)+'</td><td>'+(v ? hsoO(v.ten) : '')+'</td><td>'+(v ? hsoO(v.ct, 'kb') : '')+'</td><td class="r">'+(v && v.tien ? hsoO((v.tien/1e6).toLocaleString('vi-VN', {maximumFractionDigits:3})) : '')+'</td><td>'+(v ? hsoO(v.md, 'kb') : '')+'</td><td class="c">'+(v && v.th ? hsoO(v.th, 'kb') : '')+'</td></tr>'; }
  h = hsoMauSo('10C/TD', ['(đóng thành quyển)'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c">Về việc '+hsoO(vv, 'sl', 40)+'</p>'+
    '<p class="tr">'+gioNgay+'</p><p>Địa điểm: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p>'+
    '<p>Hình thức họp: ☐ Trực tiếp &nbsp; ☐ Trực tuyến &nbsp; ☐ Trực tiếp kết hợp trực tuyến.</p><p class="thut">Thông qua ứng dụng: '+hsoCham(50)+'</p>'+
    '<p>Thành phần tham dự:</p><p>- Chủ trì: Ông (bà) '+hsoO(T.tt, 'sl', 25)+'. Chức vụ: Tổ trưởng.</p><p>- Thư ký: Ông (bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 25)+'. Chức vụ: Tổ phó.</p>'+
    '<p>- '+hsoCham(6)+'/'+hsoO(t ? String(L.truoc) : '', 'sl', 6)+' tổ viên thuộc Tổ TK&amp;VV.</p><p>- Ông (bà) '+hsoO(T.truongAp, 'kb', 25)+' là Trưởng thôn chứng kiến cuộc họp.</p>'+
    '<p>- Ông (bà) '+hsoO(N.cb, 'kb', 22)+'. Chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+' chứng kiến cuộc họp.</p>'+
    '<p class="b tr">Nội dung cuộc họp:</p><p>1. Thống nhất danh sách tổ viên được kết nạp, tổ viên cho ra khỏi Tổ</p>'+
    hsoBang('luoi', [8, 42, 8, 42], '<thead><tr><td class="c b">I</td><td class="c b">Tổ viên được kết nạp</td><td class="c b">II</td><td class="c b">Tổ viên cho ra khỏi Tổ</td></tr></thead>'+hang)+
    '<p class="tr">Tổng số tổ viên sau khi kết nạp, cho ra khỏi Tổ: '+hsoO(t ? String(L.sau) : '', 'sl', 12)+' tổ viên.</p>'+
    '<p class="tr">2. Thống nhất danh sách tổ viên đề nghị vay vốn NHCSXH</p><p class="r i s12">Đơn vị tính: triệu đồng</p>'+hsoBang('luoi s12', [6, 26, 16, 14, 24, 14], vay)+
    '<p class="tr">3. Nội dung khác (nếu có)</p><p>'+hsoCham(110)+'</p><p>'+hsoCham(110)+'</p>'+
    '<p>4. Kết quả biểu quyết</p><p class="j">'+hsoCham(6)+'/'+hsoCham(6)+' tổ viên của Tổ tham dự họp biểu quyết tán thành thông qua các nội dung nêu trên.</p>'+
    '<p class="j">Nội dung biên bản được các tổ viên và thành phần tham dự cuộc họp hoàn toàn nhất trí thông qua.</p><p>Cuộc họp kết thúc vào '+hsoCham(5)+' giờ '+hsoCham(5)+' ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+'</p>'+
    hsoKy([['THƯ KÝ', '', T.pho, T.phoKB ? 'kb' : 'sl'], ['TỔ CHỨC CT-XH CẤP XÃ', '', N.cb, 'kb']])+hsoKy([['CHỦ TRÌ', '', T.tt], ['TRƯỞNG THÔN', '', T.truongAp, 'kb']]);
  return {ma:'10C/TD (mẫu mới QĐ 70)', h:h};
}

function hsoLap10cCu(t){ return hsoLap10c(t, {cu:1}); }
function hsoLap10d(t){ return {ma:'10D/TD', h:'<p class="c">Mẫu 10D/TD dựng trên nền ô (js/mau/10d.js) — chưa nạp được mô-đun.</p>'}; }   /* 3.223: chip 10D (mô-đun riêng) */
function hsoLap11Cu(t){ return {ma:'11/TD cũ', h:'<p class="c">Mẫu 11/TD cũ dựng trên nền ô (js/mau/11cu.js) — chưa nạp được mô-đun.</p>'}; }   /* 3.223: chip 11 cũ (mô-đun riêng) */   /* 3.223: chip 10C cũ */
/* ---------- 10A/TD ---------- */
function hsoLap10a(t){
  var T = hsoTo(t), tv = hsoTVTo(t).filter(function(k){ return HSO.tv[k.kh]!==false; }), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', L = hsoLuu(), n = Math.max(20, Math.ceil(tv.length/2)), ds = '';
  for(var i=0;i<n;i++){ var a = tv[i], b = tv[i+n]; ds += '<tr><td>'+(i+1)+'. '+(a ? hsoO(a.ten) : hsoCham(45))+'</td><td>'+(i+n+1)+'. '+(b ? hsoO(b.ten) : hsoCham(45))+'</td></tr>'; }
  var qu = [
    '1. Tổ TK&amp;VV là tập hợp hộ nghèo và các đối tượng chính sách khác theo quy định của pháp luật, có nhu cầu vay vốn, thực hành tiết kiệm và tham gia hoạt động khác do NHCSXH cung cấp.',
    '2. Tổ TK&amp;VV hoạt động theo nguyên tắc tập thể, biểu quyết theo đa số dưới sự điều hành của Ban quản lý Tổ. Tổ họp định kỳ hằng tháng (quý) vào ngày '+hsoO(L.ngayDK, 'kb', 10)+' hoặc đột xuất để giải quyết công việc phát sinh (nếu có). Nội dung họp Tổ do Tổ trưởng chuẩn bị và thống nhất trong Ban quản lý Tổ.',
    '3. Cuộc họp Tổ khi có các nội dung biểu quyết thì phải có sự tham gia chứng kiến của đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã và Trưởng thôn/Tổ trưởng Tổ dân phố, đồng thời phải có trên 1/2 số tổ viên của Tổ tham gia họp và có trên 2/3 số tổ viên tham gia họp biểu quyết tán thành mới có giá trị thực hiện.',
    'Các nội dung họp Tổ phải biểu quyết bao gồm: Thành lập Tổ; bầu, thay đổi Tổ trưởng hoặc Tổ phó; sửa đổi Quy ước hoạt động của Tổ; kết nạp tổ viên; bình xét cho vay; bắt buộc tổ viên ra khỏi Tổ khi không thực hiện đúng Quy ước hoạt động của Tổ. Nội dung cuộc họp Tổ được lập thành biên bản và được thông qua trước khi kết thúc cuộc họp.',
    '4. Điều hành hoạt động của Tổ là Ban quản lý Tổ do các tổ viên trong Tổ bầu chọn. Ban quản lý Tổ gồm Tổ trưởng và Tổ phó, đáp ứng các tiêu chuẩn quy định tại khoản 2 Điều 8 Quyết định số 70/QĐ-HĐQT.',
    'Ban quản lý Tổ phối hợp, giám sát lẫn nhau để điều hành hoạt động của Tổ thực hiện nhiệm vụ quy định tại Quy chế hoạt động Tổ và Quy ước hoạt động được Tổ thông qua, thực hiện các nội dung công việc theo hợp đồng ủy nhiệm ký với NHCSXH. Trong đó, nhiệm vụ cụ thể như sau:',
    'a) Tổ trưởng chịu trách nhiệm điều hành hoạt động của Tổ theo Quy ước hoạt động của Tổ và thực hiện nhiệm vụ, trách nhiệm của Ban quản lý Tổ; triệu tập và chủ trì các cuộc họp; ký hợp đồng ủy nhiệm với NHCSXH; giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch; có trách nhiệm thanh toán số tiền hoa hồng được NHCSXH chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.',
    'b) Tổ phó ghi chép biên bản các cuộc họp; giúp việc cho Tổ trưởng, điều hành và giải quyết các công việc của Tổ khi được Tổ trưởng phân công; thay mặt Tổ trưởng giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch khi Tổ trưởng vắng mặt.',
    '5. Các tổ viên trong Tổ cam kết thực hiện tốt các nội dung sau:',
    'a) Tham gia đầy đủ và biểu quyết tại các cuộc họp Tổ; tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm,... để nâng cao trình độ sản xuất kinh doanh.',
    'b) Sử dụng vốn vay đúng mục đích đề nghị vay, có hiệu quả. Có nghĩa vụ trả nợ (gốc, lãi) đầy đủ, đúng kỳ hạn đã thoả thuận với NHCSXH.',
    'c) Thực hành tiết kiệm và gửi vào NHCSXH theo định kỳ hằng tháng với mức tối thiểu là '+hsoO(L.tkMin ? tdnTien(hsoSo(L.tkMin)) : '', 'kb', 18)+' đồng/tổ viên kể từ tháng '+hsoCham(5)+'/'+hsoCham(8)+' hoặc khi Tổ họp thống nhất thay đổi. Trường hợp tổ viên gặp khó khăn không thực hiện được theo mức tối thiểu thì thực hiện theo nhu cầu và khả năng thực tế.',
    'd) Mỗi tổ viên cam kết tương trợ giúp đỡ nhau, trao đổi kinh nghiệm trong sản xuất, kinh doanh và đời sống; có trách nhiệm giám sát lẫn nhau trong việc vay vốn, sử dụng vốn vay, trả nợ (gốc, lãi) NHCSXH và thực hiện nghiêm túc Quy ước hoạt động của Tổ.',
    'đ) Trường hợp Ban quản lý Tổ được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên trong Tổ hoàn toàn nhất trí để Ban quản lý Tổ thu tiền để nộp cho NHCSXH. Riêng việc trả nợ gốc, tổ viên phải thực hiện trả nợ gốc trực tiếp cho Ngân hàng tại điểm giao dịch hoặc trụ sở NHCSXH nơi cho vay; hoặc trả nợ gốc bằng chuyển khoản vào tài khoản thanh toán của tổ viên mở tại NHCSXH để Ngân hàng thu nợ theo quy định.',
    'Mỗi lần nộp tiền cho Tổ trưởng, tổ viên ký vào Bảng kê thu tiền ngay khi nộp tiền cho Tổ trưởng; đồng thời, nhận lại Biên lai thu tiền, tiến hành kiểm tra, đối chiếu về số tiền gốc, số tiền lãi còn nợ, số dư tài khoản Tổ viên đã được in trên Biên lai và thông báo cho NHCSXH nếu có chênh lệch.',
    'e) Trường hợp Ban quản lý Tổ không được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên có trách nhiệm chuyển khoản, nộp tiền vào tài khoản thanh toán của tổ viên mở tại NHCSXH nơi cho vay, bảo đảm số dư trước ngày đến hạn để Ngân hàng thu nợ theo quy định và đối chiếu kết quả giao dịch, thông báo nợ đến hạn kỳ tiếp theo do NHCSXH gửi đến.',
    'g) Tổ viên phải lưu giữ đầy đủ các loại sổ sách, giấy tờ sau:', '- Sổ vay vốn/Hợp đồng tín dụng.',
    '- Biên lai thu tiền có chữ ký của Tổ trưởng (người thu tiền) để làm cơ sở chứng minh cho số tiền đã nộp (trường hợp nộp tiền cho Ban quản lý Tổ).',
    '- Cài đặt ứng dụng do NHCSXH cung cấp để theo dõi biến động số dư tiền gửi, tiền vay, kết quả giao dịch trong kỳ và nợ đến hạn kỳ tiếp theo được Ngân hàng gửi đến.'];
  var h = hsoMauSo('10A/TD', ['Lập 02 liên:', '- 01 liên lưu NH', '- 01 liên lưu Tổ'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c b">Về việc thành lập Tổ Tiết kiệm và vay vốn</p>'+
    '<p class="tr">Thời gian bắt đầu: '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+(ng ? hsoNgayO(ng) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+'</p>'+
    '<p>Địa điểm: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'</p><p>Thành phần tham dự:</p>'+
    '<p class="j">- '+hsoCham(8)+' người là đại diện hộ gia đình cùng cư trú tại địa bàn thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'</p>'+
    '<p>- Ông (Bà) '+hsoO(T.truongAp, 'kb', 30)+' là Trưởng thôn, chứng kiến cuộc họp</p>'+
    '<p>Chủ trì: Ông (Bà) '+hsoO(N.cb, 'kb', 22)+' Chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+'</p><p>Thư ký: Ông (Bà) '+hsoCham(40)+' là đại diện hộ gia đình.</p>'+
    '<p class="b tr">Nội dung cuộc họp:</p><p class="j thut">Các đại diện hộ gia đình và cá nhân trực tiếp thuộc đối tượng vay vốn tự nguyện họp để thành lập Tổ Tiết kiệm và vay vốn (TK&amp;VV) theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị Ngân hàng Chính sách xã hội (NHCSXH) về Quy chế hoạt động Tổ TK&amp;VV. Sau khi thảo luận, các thành viên dự họp thống nhất các nội dung sau:</p>'+
    '<p class="b tr">I. DANH SÁCH TỔ VIÊN</p>'+hsoBang('khung0', [1, 1], ds)+'<p class="tr">Tổng số: '+hsoO(tv.length ? String(tv.length) : '', 'sl', 10)+' tổ viên</p>'+
    '<p class="b tr">II. QUY ƯỚC HOẠT ĐỘNG CỦA TỔ TK&amp;VV</p>'+qu.map(function(x){ return '<p class="j thut">'+x+'</p>'; }).join('')+
    '<p class="b tr">III. BẦU BAN QUẢN LÝ CỦA TỔ TK&amp;VV</p><p class="j thut">1. Các tổ viên dự họp thống nhất bầu Ban quản lý Tổ gồm các Ông (Bà) có tên dưới đây:</p>'+
    '<p class="thut">a) Ông (Bà) '+hsoO(T.tt, 'sl', 40)+' Chức vụ: Tổ trưởng;</p><p class="thut">b) Ông (Bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 40)+' Chức vụ: Tổ phó.</p>'+
    '<p class="j thut">2. Ban quản lý Tổ thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT và các quy định liên quan của NHCSXH.</p>'+
    '<p class="b tr">IV. KẾT QUẢ BIỂU QUYẾT</p><p class="j thut">'+hsoCham(6)+'/'+hsoCham(6)+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung: Danh sách tổ viên, Quy ước hoạt động của Tổ TK&amp;VV và Bầu Ban quản lý Tổ TK&amp;VV.</p>'+
    '<p class="j thut">Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận hoạt động của Tổ TK&amp;VV tại địa phương.</p>'+
    '<p class="thut">Cuộc họp kết thúc vào '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'./.</p>'+
    hsoKy([['THƯ KÝ'], ['TRƯỞNG THÔN', '', T.truongAp, 'kb'], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', N.cb, 'kb']])+
    '<p class="c b tr">PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ</p><p class="j thut">Chấp thuận cho Tổ TK&amp;VV tại thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+' do Ông (Bà) '+hsoO(T.tt, 'sl', 30)+' làm Tổ trưởng và Ông (Bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 30)+' làm Tổ phó được thành lập, hoạt động theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td></td><td class="c"><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(6)+'</p><p class="c b">UBND CẤP XÃ</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'10A/TD', h:h};
}

/* ---------- 10B/TD ---------- */
function hsoBau(t){   /* gợi ý bầu thay: tổ trưởng / tổ phó kỳ trước khác kỳ này */
  var tr = hsoTruoc(t), T = hsoTo(t), o = HSO.o, r = {tt:o.ttMoi, ttCu:o.ttCu, pho:o.phoMoi, phoCu:o.phoCu};
  if(tr){ if(r.tt===undefined && tr.ten && slChuan(tr.ten)!==slChuan(T.tt)){ r.tt = T.tt; r.ttCu = tr.ten; }
    if(r.pho===undefined && tr.pho && T.pho && slChuan(tr.pho)!==slChuan(T.pho)){ r.pho = T.pho; r.phoCu = tr.pho; } }
  ['tt','ttCu','pho','phoCu'].forEach(function(k){ r[k] = r[k] || ''; });
  return r;
}
function hsoLap10b(t){
  var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', B = hsoBau(t);
  var vv = [L.kn.length ? 'kết nạp tổ viên' : '', B.tt || B.pho ? 'bầu thay đổi thành viên Ban quản lý Tổ' : ''].filter(Boolean).join(', ');
  var kn = (L.kn.length ? L.kn : [null, null]).map(function(x){ return '<p class="thut">- Ông (Bà): '+(x ? hsoO(x.ten) : hsoCham(70))+'</p>'; }).join('');
  var bau = function(moi, cv, cu){ return '<p class="thut">- Ông (Bà) '+hsoO(moi, 'kb', 25)+' Chức vụ: '+(moi ? hsoO(cv, 'kb') : hsoCham(25))+'</p><p class="thut">thay Ông (Bà): '+hsoO(cu, 'kb', 50)+'</p>'; };
  var h = hsoMauSo('10B/TD', ['Lập 02 liên:', '- 01 liên lưu NH', '- 01 liên lưu Tổ'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c">Về việc '+hsoO(vv, 'sl', 50)+'</p>'+
    '<p class="tr">Thời gian bắt đầu: '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+(ng ? hsoNgayO(ng) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+'</p>'+
    '<p>Địa điểm: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p><p>Thành phần tham dự:</p>'+
    '<p class="j">- '+hsoCham(6)+'/'+hsoO(t ? String(L.truoc) : '', 'sl', 6)+' tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) tại thôn '+hsoO(T.ap)+' thuộc '+hsoHoiO(T, 30)+'</p>'+
    '<p>- Ông (bà) '+hsoO(T.truongAp, 'kb', 30)+' là Trưởng thôn, chứng kiến cuộc họp.</p>'+
    '<p>Chủ trì: Ông (bà) '+hsoO(N.cb, 'kb', 22)+' chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+'</p><p>Thư ký: Ông (bà) '+hsoCham(60)+'</p>'+
    '<p class="b tr">Nội dung cuộc họp:</p><p>1. Chủ trì cuộc họp tuyên bố lý do tổ chức cuộc họp</p><p>'+hsoCham(110)+'</p><p>'+hsoCham(110)+'</p>'+
    '<p>2. Sau khi thảo luận, các tổ viên trong Tổ TK&amp;VV thống nhất:</p><p class="thut">a) Kết nạp các Ông (Bà) có tên sau là tổ viên của Tổ TK&amp;VV:</p>'+kn+
    '<p class="thut">- Tổng số tổ viên của tổ sau kỳ họp là: '+hsoO(t ? String(L.sau) : '', 'sl', 10)+' tổ viên.</p>'+
    '<p class="thut">b) Bầu thành viên mới tham gia Ban quản lý Tổ</p>'+bau(B.tt, 'Tổ trưởng', B.ttCu)+bau(B.pho, 'Tổ phó', B.phoCu)+
    '<p class="j">3. Kết quả biểu quyết: '+hsoCham(6)+'/'+hsoCham(6)+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung kết nạp tổ viên; bầu tham gia Ban quản lý Tổ và giữ chức vụ Tổ trưởng đối với Ông (Bà) '+hsoO(B.tt, 'kb', 25)+', giữ chức vụ Tổ phó đối với Ông (Bà) '+hsoO(B.pho, 'kb', 25)+'</p>'+
    '<p class="j thut">Ban quản lý Tổ TK&amp;VV thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về Quy chế hoạt động của Tổ TK&amp;VV và các quy định liên quan của NHCSXH.</p>'+
    '<p class="j thut">Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận cho Ban quản lý Tổ TK&amp;VV được tiếp tục quản lý hoạt động của Tổ.</p>'+
    '<p class="thut">Cuộc họp kết thúc vào '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'./.</p>'+
    hsoKy([['THƯ KÝ'], ['TRƯỞNG THÔN', '', T.truongAp, 'kb'], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', N.cb, 'kb']])+
    '<p class="c b tr">PHÊ DUYỆT CỦA UỶ BAN NHÂN DÂN CẤP XÃ</p><p class="j thut">Chấp thuận kết quả cuộc họp bầu thay đổi thành viên Ban Quản lý Tổ của Tổ TK&amp;VV tại thôn '+hsoO(T.ap)+', do '+hsoHoiO(T)+' quản lý, bầu Ông (Bà) '+hsoO(B.tt, 'kb', 25)+' giữ chức vụ '+(B.tt ? hsoO('Tổ trưởng', 'kb') : hsoCham(15))+' và Ông (Bà) '+hsoO(B.pho, 'kb', 25)+' chức vụ '+(B.pho ? hsoO('Tổ phó', 'kb') : hsoCham(15))+' theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV./.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td></td><td class="c"><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(6)+'</p><p class="c b">UBND CẤP XÃ</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'10B/TD', h:h};
}

/* ---------- 11/TD ---------- */
function hsoLap11(t){
  var T = hsoTo(t), K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {}, ng = HSO.o.ngay || '';
  var dieu = [
    ['b', 'Điều 1. Bên A ủy nhiệm cho Bên B thực hiện các công việc sau'],
    ['', '1. Quản lý toàn bộ hoạt động của Tổ TK&amp;VV (sau đây viết tắt là Tổ) theo Quy chế hoạt động của Tổ được Hội đồng quản trị NHCSXH ban hành và triển khai thực hiện Quy ước hoạt động của Tổ.'],
    ['', '2. Thực hiện tiếp nhận đề nghị vay vốn của tổ viên, tổ chức họp Tổ để bình xét cho vay, hoàn thiện và chuyển hồ sơ đề nghị vay vốn cho Bên A; phối hợp với Bên A thông báo kết quả phê duyệt cho vay và phối hợp giải ngân cho vay đến tổ viên vay vốn.'],
    ['', '3. Giám sát, đôn đốc tổ viên sử dụng vốn vay đúng mục đích; trả nợ đầy đủ, đúng hạn theo thoả thuận; tham gia, chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay đến các tổ viên của cơ quan, tổ chức có thẩm quyền khi được yêu cầu.'],
    ['', '4. Bên A uỷ nhiệm cho Bên B thu tiền lãi, tiền gửi của các tổ viên trong Tổ theo quy định của NHCSXH. Bên B phải nộp số tiền đã thu của các tổ viên trong tháng cho NHCSXH vào ngày giao dịch tại xã.'],
    ['i', '(Bên A không uỷ nhiệm cho Bên B thu tiền lãi, tiền gửi của tổ viên trong Tổ. Bên B có trách nhiệm đôn đốc các tổ viên trả nợ gốc, nợ lãi đầy đủ, đúng hạn cho NHCSXH theo thỏa thuận.)'],
    ['', '5. Phối hợp quản lý và xử lý các vấn đề phát sinh trong hoạt động của Tổ, bao gồm: đôn đốc, xử lý các trường hợp gia hạn nợ, điều chỉnh kỳ hạn trả nợ, nợ quá hạn, nợ bị rủi ro; người vay sử dụng vốn vay sai mục đích, chết, mất tích, đi khỏi nơi cư trú và các trường hợp khác ảnh hưởng đến hoạt động của Tổ.'],
    ['', '6. Quản lý, cung cấp, lưu trữ hồ sơ liên quan đến hoạt động của Tổ theo quy định của NHCSXH; lưu giữ, bảo mật thông tin, dữ liệu của tổ viên theo quy định của pháp luật về bảo vệ dữ liệu cá nhân.'],
    ['', '7. Phối hợp với Bên A thực hiện các công việc khác liên quan đến hoạt động tín dụng chính sách xã hội theo nội dung được hai bên thống nhất.'],
    ['b', 'Điều 2. Trách nhiệm và quyền hạn của Bên A'],
    ['', '1. Phối hợp với UBND và tổ chức chính trị - xã hội nhận ủy thác cấp xã để tổ chức tập huấn nghiệp vụ có liên quan đến hoạt động của Tổ, thủ tục, quy trình cho vay cho Bên B.'],
    ['', '2. Thanh toán tiền hoa hồng đầy đủ cho Bên B theo quy định của NHCSXH, cụ thể:'],
    ['', 'a) Chi trả hoa hồng theo dư nợ có thu được lãi khi phát sinh lãi thực thu của các tổ viên thuộc Tổ.'],
    ['c', 'Tiền hoa hồng = Mức hoa hồng được hưởng × Dư nợ có thu được lãi'],
    ['', 'Trong đó:'], ['', '- Mức hoa hồng theo thông báo của NHCSXH từng thời kỳ'],
    ['i', '(Hiện nay, tại địa bàn cấp xã thuộc vùng có điều kiện khó khăn mức hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu tiền là 0,085%, đối với Tổ TK&amp;VV không được ủy nhiệm thu tiền là 0,075%; tại địa bàn cấp xã không thuộc vùng có điều kiện khó khăn mức hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu tiền là 0,071%, đối với Tổ TK&amp;VV không được ủy nhiệm thu tiền là 0,062%).'],
    ['', '- Dư nợ có thu được lãi xác định bằng công thức:'], ['c', 'Dư nợ có thu được lãi = Số tiền lãi thực thu / Lãi suất cho vay'],
    ['', '+ Số tiền lãi thực thu là số tiền lãi NHCSXH nhận được trong tháng của các tổ viên thuộc Tổ TK&amp;VV.'],
    ['', '+ Lãi suất cho vay là lãi suất theo thông báo của NHCSXH trong từng thời kỳ và theo từng chương trình tín dụng.'],
    ['', 'b) Chi trả hoa hồng theo dư nợ bình quân vào ngày cuối cùng của tháng.'], ['c', 'Tiền hoa hồng = Dư nợ trong hạn bình quân tháng × Mức hoa hồng'],
    ['', 'Trong đó:'], ['c', '- Dư nợ trong hạn bình quân tháng = (Dư nợ trong hạn đầu ngày 01 của tháng + Dư nợ trong hạn cuối ngày cuối cùng của tháng) / 2'],
    ['', '- Mức hoa hồng: Theo thông báo của NHCSXH theo từng thời kỳ.'],
    ['i', '(Hiện nay, mức hoa hồng trả theo dư nợ trong hạn bình quân là 0,05%/tháng/dư nợ trong hạn bình quân tháng. Riêng chương trình cho vay nhà ở xã hội, mức hoa hồng chi trả cho Ban quản lý Tổ là 0,005%/tháng/dư nợ trong hạn bình quân tháng).'],
    ['', 'c) Chi trả tiền hoa hồng vào tài khoản thanh toán của Tổ trưởng Tổ TK&amp;VV mở tại NHCSXH '+hsoO(hsoPGD('ngan'), 'kb', 25)+', số tài khoản: '+hsoCham(30)],
    ['', '3. Theo dõi, giám sát, đôn đốc Bên B trong việc thực hiện Hợp đồng ủy nhiệm. Thực hiện kiểm tra định kỳ hoặc đột xuất về các nội dung công việc mà Bên B được ủy nhiệm. Trường hợp, phát hiện Bên B vi phạm các điều khoản đã thỏa thuận thì Bên A có quyền đơn phương chấm dứt Hợp đồng và đề nghị xử lý theo quy định của pháp luật.'],
    ['b', 'Điều 3. Nhiệm vụ, quyền hạn và quyền lợi của Bên B'], ['', '1. Nhiệm vụ, quyền hạn'],
    ['', 'a) Triển khai thực hiện Quy ước hoạt động của Tổ; tuyên truyền, hướng dẫn tổ viên về chủ trương, chính sách của Đảng, Nhà nước về tín dụng chính sách xã hội, các chương trình tín dụng và thủ tục vay vốn tại NHCSXH. Tuyên truyền, vận động tổ viên thực hành tiết kiệm, nâng cao ý thức trong việc vay vốn và trả nợ ngân hàng.'],
    ['', 'b) Tiếp nhận đề nghị vay vốn của tổ viên và tổ chức họp Tổ để bình xét cho vay bảo đảm công khai, minh bạch, dân chủ với sự giám sát, chứng kiến của Trưởng thôn, Tổ trưởng tổ dân phố và đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã; đồng thời, quán triệt cho tổ viên về ý thức vay vốn, sử dụng vốn vay đúng mục đích, trả nợ gốc, lãi đầy đủ, đúng hạn.'],
    ['', 'Nội dung bình xét cho vay công khai bao gồm: (i) Tổ viên thuộc đối tượng, đáp ứng điều kiện vay vốn theo quy định của cấp có thẩm quyền; (ii) Thảo luận, thống nhất đề nghị mức vay phù hợp với nhu cầu sử dụng vốn để thực hiện phương án vay vốn của tổ viên và không vượt quá mức cho vay tối đa; (iii) Thảo luận, thống nhất đề nghị thời hạn vay phù hợp với khả năng trả nợ của tổ viên và không vượt quá thời hạn cho vay tối đa theo quy định của từng chương trình tín dụng.'],
    ['', 'Sau khi Tổ họp thống nhất và biểu quyết thông qua danh sách Tổ viên đề nghị vay vốn với mức vay, thời hạn vay cụ thể, hướng dẫn tổ viên hoàn thiện hồ sơ vay vốn theo quy định của từng chương trình tín dụng gửi Bên A xem xét, quyết định mức cho vay, thời hạn cho vay.'],
    ['', 'c) Nhận kết quả phê duyệt cho vay của Bên A, thông báo cho tổ viên biết lịch giải ngân và chứng kiến việc Bên A giải ngân trực tiếp đến người vay.'],
    ['', 'd) Đôn đốc, giám sát tổ viên trong Tổ thực hiện Quy ước hoạt động của Tổ; sử dụng vốn vay đúng mục đích; trả nợ gốc, lãi đầy đủ, đúng hạn. Tham gia và chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay của tổ viên của các tổ chức, cơ quan có thẩm quyền khi được yêu cầu.'],
    ['', 'đ) Trường hợp được ủy nhiệm thu tiền, hằng tháng, Bên B thực hiện thu tiền lãi, tiền gửi của tổ viên và nộp đầy đủ cho NHCSXH theo quy định.'],
    ['', 'e) Hướng dẫn tổ viên đối chiếu kết quả giao dịch, nợ đến hạn kỳ tiếp theo với thông báo do NHCSXH gửi đến thông qua Ban quản lý Tổ hoặc thông qua ứng dụng do NHCSXH cung cấp.'],
    ['', 'g) Không được thu phí, thu nợ gốc của tổ viên.'],
    ['', 'h) Thông báo kịp thời và phối hợp với tổ chức chính trị - xã hội nhận ủy thác, chính quyền địa phương, NHCSXH để xử lý nợ đối với các trường hợp sử dụng vốn vay sai mục đích, nợ bị rủi ro và các trường hợp khác ảnh hưởng đến hoạt động của Tổ và chất lượng tín dụng. Phối hợp với Trưởng thôn, Tổ trưởng tổ dân phố, tổ chức CT-XH nhận ủy thác thực hiện kiểm tra, xác minh và có ý kiến về việc tổ viên đề nghị gia hạn nợ, điều chỉnh kỳ hạn nợ, xử lý nợ bị rủi ro để trình cấp có thẩm quyền xem xét, quyết định; thu thập thông tin của tổ viên đi khỏi nơi cư trú.'],
    ['', 'i) Chịu sự kiểm tra, giám sát của Trưởng thôn, Tổ trưởng tổ dân phố, tổ chức chính trị - xã hội nhận uỷ thác, UBND cấp xã và Bên A.'],
    ['', 'k) Lưu giữ đầy đủ hồ sơ của Tổ và các giấy tờ khác liên quan đến hoạt động của Tổ do Bên A quy định. Tham gia đầy đủ các phiên giao dịch, các buổi họp giao ban với Bên A, các lớp tập huấn nghiệp vụ, lĩnh hội và phổ biến đầy đủ các thông tin đến tổ viên. Sử dụng các ứng dụng của NHCSXH để nâng cao hiệu quả thực hiện các nội dung công việc được ủy nhiệm.'],
    ['', 'l) Vận động tổ viên tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm… để nâng cao trình độ sản xuất, kinh doanh, sử dụng vốn vay đúng mục đích, có hiệu quả.'],
    ['', 'm) Đề xuất, kiến nghị và khiếu nại với chính quyền địa phương, NHCSXH và các cơ quan liên quan về việc triển khai thực hiện tín dụng chính sách xã hội trên địa bàn.'],
    ['', 'n) Tổ trưởng Tổ TK&amp;VV có trách nhiệm thanh toán số tiền hoa hồng được Bên A chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.'],
    ['', 'o) Sử dụng đúng mục đích, bảo mật thông tin, dữ liệu do Bên A cung cấp hoặc do Ban quản lý Tổ thu thập, tiếp nhận, lưu giữ trong quá trình hoạt động; không cung cấp cho bên thứ ba trái quy định và thực hiện bàn giao đầy đủ khi chấm dứt hoặc thay thế Hợp đồng.'],
    ['', '2. Quyền lợi'], ['', 'a) Được NHCSXH đào tạo, tập huấn nghiệp vụ quản lý, điều hành hoạt động của Tổ.'],
    ['', 'b) Được Bên A chi trả hoa hồng cho việc thực hiện các công việc được ủy nhiệm trên cơ sở quy định của cấp có thẩm quyền từng thời kỳ.'], ['', 'c) Được NHCSXH xem xét khen thưởng theo định kỳ hoặc đột xuất.'],
    ['b', 'Điều 4. Điều khoản thi hành'],
    ['', '1. Các bên có trách nhiệm thực hiện đúng nội dung đã thỏa thuận trong Hợp đồng này. Mọi sửa đổi, bổ sung nội dung của Hợp đồng phải được sự thỏa thuận của hai bên bằng văn bản.'],
    ['', '2. Khi thay đổi Tổ trưởng, Tổ trưởng cũ có trách nhiệm bàn giao hồ sơ của Tổ và việc quản lý điều hành hoạt động của Tổ cho Tổ trưởng mới. Tổ trưởng mới có trách nhiệm tiếp tục chỉ đạo thực hiện hoạt động của Tổ theo Quy chế hoạt động của Tổ và các quy định hiện hành của NHCSXH.'],
    ['', '3. Trong quá trình thực hiện, nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không hoà giải được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện ra tòa án.'],
    ['', '4. Hợp đồng này hết hiệu lực kể từ ngày Bên A ký Hợp đồng uỷ nhiệm với đại diện Ban quản lý Tổ là Tổ trưởng mới được Tổ bầu ra.'],
    ['', 'Hợp đồng này có hiệu lực kể từ ngày ký, thay thế các Hợp đồng, Phụ lục Hợp đồng đã ký trước đây (nếu có); được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản để tổ chức thực hiện./.']];
  var h = hsoMauSo('11/TD', ['Lập 02 liên:', '- 01 liên lưu NH;', '- 01 liên lưu Tổ TK&amp;VV.'])+hsoQH()+'<p class="c b s14 tr">HỢP ĐỒNG ỦY NHIỆM</p><p class="c b">Về việc thực hiện một số nội dung công việc trong quy trình cho vay của Ngân hàng Chính sách xã hội</p>'+
    '<p class="j thut i tr">Căn cứ Nghị định số 06/2026/NĐ-CP ngày 10/01/2026 của Chính phủ quy định về tổ chức và hoạt động của Ngân hàng Chính sách xã hội (NHCSXH);</p>'+
    '<p class="j thut i">Căn cứ Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về quy chế hoạt động của Tổ Tiết kiệm và vay vốn (TK&amp;VV);</p>'+
    '<p class="j thut i">Căn cứ Biên bản họp Tổ TK&amp;VV ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+' về việc thành lập Tổ TK&amp;VV đã được UBND xã '+hsoO(T.xa)+' chấp thuận cho phép hoạt động;</p>'+
    '<p class="j thut i">Căn cứ Biên bản họp Tổ TK&amp;VV ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+' về việc thay đổi Ban quản lý Tổ TK&amp;VV đã được UBND xã '+hsoO(T.xa)+' chấp thuận (nếu có).</p>'+
    '<p class="thut">Hôm nay, ngày '+(ng ? hsoNgayO(ng) : hsoCham(4)+'/'+hsoCham(5)+'/'+hsoCham(6))+', tại '+hsoCham(45)+'</p><p class="thut">Chúng tôi gồm có:</p>'+
    '<p class="b">I. BÊN ỦY NHIỆM (Bên A)</p><p class="thut">- Chi nhánh/Phòng giao dịch Ngân hàng Chính sách xã hội '+hsoO(hsoPGD('ngan'), 'kb')+'</p>'+
    '<p class="thut">- Đại diện Ông (Bà): '+hsoO(hsoPGD('daiDien'), 'kb', 25)+' Chức vụ: '+hsoO(hsoPGD('daiDien') ? hsoPGD('chucVu') : '', 'kb', 18)+'</p>'+
    '<p class="thut">- Địa chỉ: '+hsoO(hsoPGD('diaChi'), 'kb', 60)+'</p><p class="thut">- Số điện thoại: '+hsoO(hsoPGD('dt'), 'kb', 50)+'</p>'+
    '<p class="b">II. BÊN NHẬN ỦY NHIỆM (Bên B)</p><p class="thut">- Ban quản lý Tổ TK&amp;VV: '+hsoO(T.tt, 'sl', 30)+' thuộc Hội: '+hsoO(T.hoi)+'</p>'+
    '<p class="thut">- Đại diện Ông (Bà): '+hsoO(T.tt, 'sl', 30)+' Chức vụ: Tổ trưởng</p>'+
    '<p class="thut">- Số Thẻ căn cước: '+hsoO(c.cccd, 'sl', 16)+'; Ngày cấp '+(c.ncap ? hsoO(ngayVNsl(c.ncap)) : hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(5))+'; Nơi cấp: '+hsoO(c.noiCap, 'sl', 12)+'</p>'+
    '<p class="thut">- Địa chỉ: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p><p class="thut">Hai bên nhất trí thỏa thuận các nội dung sau:</p>'+
    dieu.map(function(d){ return '<p class="j thut'+(d[0]==='b' ? ' b tr' : d[0]==='i' ? ' i' : d[0]==='c' ? ' c i' : '')+'">'+d[1]+'</p>'; }).join('')+
    hsoKy([['ĐẠI DIỆN BÊN B', '', T.tt], ['ĐẠI DIỆN BÊN A', '(Ký tên, đóng dấu)', hsoPGD('daiDien'), 'kb']]);
  return {ma:'11/TD', h:h, cc:K.cc};
}

/* ---------- 01/BG · 02/BG ---------- */
function hsoGiaoNhan(t){   /* Bên giao / Bên nhận: anh sửa ở tùy chọn; chưa sửa → so tổ trưởng kỳ trước */
  var T = hsoTo(t), tr = hsoTruoc(t), o = HSO.o, g = o.giao, n = o.nhan;
  if(g===undefined && n===undefined){ if(tr && tr.ten && slChuan(tr.ten)!==slChuan(T.tt)){ g = tr.ten; n = T.tt; } else { g = T.tt; n = ''; } }
  return {giao:g||'', nhan:n||''};
}
function hsoLap01bg(t){
  var T = hsoTo(t), G = hsoGiaoNhan(t), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', n = hsoNg(ng);
  var h = hsoMauSo('01/BG', ['Lập 02 bản.'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN</p><p class="c b">Về việc bàn giao hồ sơ Tổ và các nội dung liên quan đến hoạt động của Tổ TK&amp;VV</p>'+
    '<p class="j thut i tr">Căn cứ Biên bản họp Tổ Tiết kiệm và vay vốn (TK&amp;VV) ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+' về việc thay đổi thành viên Ban quản lý Tổ đã được UBND xã '+hsoO(T.xa)+' chấp thuận,</p>'+
    '<p class="thut">Hôm nay, vào hồi '+hsoCham(5)+' h '+hsoCham(5)+', '+hsoNTN(ng)+'</p>'+
    '<p class="thut">Tại thôn: '+hsoO(T.ap)+' xã: '+hsoO(T.xa)+' tỉnh/thành phố: '+coChuHTML(T.tinh)+'.</p><p class="thut">Chúng tôi gồm có:</p>'+
    '<p class="b">I. BÊN BÀN GIAO</p><p class="j thut">Ông/Bà: '+hsoO(G.giao, 'sl', 30)+', nguyên Tổ trưởng của Tổ TK&amp;VV tại thôn: '+hsoO(T.ap)+' thuộc tổ chức CT-XH '+hsoO(T.hoi, 'sl', 30)+' quản lý.</p>'+
    '<p class="b">II. BÊN NHẬN BÀN GIAO</p><p class="j thut">Ông/Bà: '+hsoO(G.nhan, 'kb', 30)+' Chức vụ: Tổ trưởng Tổ TK&amp;VV tại thôn: '+hsoO(T.ap)+' thuộc tổ chức CT-XH '+hsoO(T.hoi, 'sl', 30)+' quản lý.</p>'+
    '<p class="b">III. THÀNH PHẦN CHỨNG KIẾN (nếu có)</p><p class="thut">1. Ông/Bà: '+hsoO(N.cb, 'kb', 25)+' Chức vụ: '+hsoO(N.cv, 'kb', 15)+' đại diện '+hsoO(N.cb ? T.hoi : '', 'kb', 35)+'</p>'+
    '<p class="thut">2. Ông/Bà: '+hsoCham(30)+' Chức vụ: '+hsoCham(18)+' đại diện '+hsoCham(40)+'</p>'+
    '<p class="j thut tr">Thực hiện bàn giao hồ sơ, giấy tờ và các nội dung công việc liên quan đến hoạt động của Tổ TK&amp;VV, cụ thể như sau:</p>'+
    '<p class="b thut">1. Hồ sơ của Tổ TK&amp;VV</p><p class="thut">a) Biên bản họp Tổ mẫu số 10A/TD: '+hsoCham(6)+' bản</p><p class="thut">b) Biên bản họp Tổ mẫu số 10B/TD: '+hsoCham(6)+' bản</p>'+
    '<p class="thut">c) Biên bản họp Tổ mẫu số 10C/TD: '+hsoCham(6)+' quyển (từ tháng '+hsoCham(3)+' năm '+hsoCham(4)+' đến tháng '+hsoCham(3)+' năm '+hsoCham(4)+').</p>'+
    '<p class="thut">d) Danh sách Tổ viên đề nghị vay vốn mẫu số 03/TD: '+hsoCham(6)+' bản</p><p class="thut">đ) Các hồ sơ khác</p><p class="thut">- '+hsoCham(10)+'</p><p class="thut">- '+hsoCham(10)+'</p>'+
    '<p class="b thut">2. Các công việc đang thực hiện</p><p class="thut">a) Số hồ sơ vay vốn đã nhận, chưa gửi cho ngân hàng: '+hsoCham(6)+' bộ.</p><p class="thut">b) Số hồ sơ đã được phê duyệt, chưa giải ngân: '+hsoCham(6)+' bộ.</p><p class="thut">c) '+hsoCham(10)+'</p>'+
    '<p class="b thut">3. Ý kiến của Bên bàn giao, Bên nhận bàn giao</p><p class="thut">a) Bên bàn giao</p><p>'+hsoCham(110)+'</p><p class="thut">b) Bên nhận bàn giao</p><p>'+hsoCham(110)+'</p>'+
    '<p class="j thut tr">Biên bản được lập 02 bản mỗi bên giữ 01 bản.</p><p class="j thut">Biên bản được đọc cho các bên cùng nghe, thống nhất thông qua và cùng nhất trí ký tên dưới đây./.</p>'+
    hsoKy([['BÊN GIAO', '', G.giao], ['BÊN NHẬN', '', G.nhan, 'kb'], ['THÀNH PHẦN CHỨNG KIẾN', '', N.cb, 'kb']]);
  return {ma:'01/BG', h:h};
}
function hsoLap02bg(t){
  var T = hsoTo(t), G = hsoGiaoNhan(t), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', ngSL = KHO.coKy() && t ? KHO.ky().ngay : '', ca = !!hsoLuu().bgCa;
  var tv = hsoTVTo(t).filter(function(k){ return ca || k.conNo || k.lt>0 || k.t105>0; });
  var th = function(x, cs, rs){ return '<td class="c b"'+(cs ? ' colspan="'+cs+'"' : '')+(rs ? ' rowspan="'+rs+'"' : '')+'>'+x+'</td>'; };
  var r = '<thead><tr>'+th('Stt', 0, 2)+th('Họ tên khách hàng/ Chương trình', 0, 2)+th('Mã khoản vay', 0, 2)+th('Số liệu tại NHCSXH', 3)+th('Số liệu đối chiếu với khách hàng', 3)+th('Chênh lệch (+,-)', 3)+th('Nguyên nhân chênh lệch', 0, 2)+th('Chữ ký của khách hàng', 0, 2)+'</tr>'+
    '<tr>'+[1, 2, 3].map(function(){ return th('Nợ gốc')+th('Nợ lãi')+th('Số dư tiền gửi'); }).join('')+'</tr>'+
    '<tr>'+['1','2','3','4','5','6','7','8','9','10=4-7','11=5-8','12=6-9','13','14'].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr></thead>';   /* 3.171: như Mẫu 06 dài — tiêu đề lặp mỗi trang */
  var o = function(v, l){ return '<td class="r'+(l ? ' '+l : '')+'">'+(v ? hsoO(tdnTien(v)) : '')+'</td>'; }, rong = '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
  var tong = {dn:0, lt:0, t105:0}, qh = {n:0, s:0}, kn = {n:0, s:0};
  tv.forEach(function(k, i){ tong.dn += k.dn||0; tong.lt += k.lt||0; tong.t105 += k.t105||0;
    r += '<tbody class="kt-ho"><tr><td class="c b">'+(i+1)+'</td><td class="b">'+hsoO(k.ten)+'</td><td class="c b">x</td>'+o(k.dn, 'b')+o(k.lt, 'b')+o(k.t105, 'b')+rong+'</tr>';
    k.mon.forEach(function(m){ if((m.qh||0)>0){ qh.n++; qh.s += m.qh; } if((m.kn||0)>0){ kn.n++; kn.s += m.kn; }
      r += '<tr><td></td><td class="i">'+hsoO(hsoCTMon(m))+'</td><td class="c">'+hsoO(m.ku)+'</td>'+o(m.dn)+o(laiTon(m))+'<td></td>'+rong+'</tr>'; }); r += '</tbody>'; });
  r += '<tbody>'; if(!tv.length) for(var i=0;i<6;i++) r += '<tr><td class="c">'+(i ? '' : '1')+'</td><td></td><td></td><td></td><td></td><td></td>'+rong+'</tr>';
  r += '<tr><td></td><td class="c b">Tổng cộng</td><td></td>'+o(tong.dn, 'b')+o(tong.lt, 'b')+o(tong.t105, 'b')+rong+'</tr></tbody>';
  var dong = function(ten, ten2, cv){ return '<p>- Ông (bà): '+hsoO(ten, 'kb', 35)+' '+cv+': '+hsoO(ten2, 'kb', 35)+'</p>'; };
  var h = hsoBang('khung0', [1, 1], '<tr><td><p class="b">XÃ: '+hsoO(T.xa ? T.xa.toUpperCase() : '', 'sl', 40)+'</p></td><td class="r"><p class="r b s11">Mẫu số 02/BG</p><p class="r i s11">- Lập 01 liên lưu NH</p><p class="r i s11">- Tổ trưởng Tổ TKVV bên nhận lưu 01 bản photo</p></td></tr>')+
    '<p class="c b s14 tr">BIÊN BẢN BÀN GIAO KIÊM ĐỐI CHIẾU SỐ DƯ TIỀN VAY, TIỀN GỬI</p><p class="c b">Đến ngày '+(ngSL ? hsoO(ngayVNsl(ngSL)) : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8))+'</p>'+
    '<p class="thut tr">Hôm nay, '+hsoNTN(ng)+', tại '+hsoCham(60)+', chúng tôi gồm có:</p>'+
    dong(N.cb, N.cb ? T.hoi : '', 'Hội')+dong('', '', 'Hội')+
    '<p>- Ông (bà): '+hsoO(G.giao, 'sl', 35)+' Tổ trưởng bên giao thuộc Hội: '+hsoO(T.hoi, 'sl', 30)+'</p>'+
    '<p>- Ông (bà): '+hsoO(G.nhan, 'kb', 35)+' Tổ trưởng bên nhận thuộc Hội: '+hsoO(G.nhan ? T.hoi : '', 'kb', 30)+'</p><p>- '+hsoCham(110)+'</p>'+
    '<p class="j thut">Đã tiến hành đối chiếu thực tế và bàn giao Danh sách tổ viên, dư nợ, số dư tiền gửi tổ viên đến ngày '+(ngSL ? hsoO(ngayVNsl(ngSL)) : hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6))+' của các tổ viên như sau:</p>'+
    '<p class="r i s11">Đơn vị tính: đồng</p>'+hsoBang('luoi s10', [4, 17, 10, 8.5, 6.5, 7, 6, 5, 6, 6, 5, 6, 7, 6.5], r)+
    '<p class="tr">- Số tổ viên chưa đối chiếu được: '+hsoCham(10)+' người; số thứ tự: '+hsoCham(25)+'; số tiền: '+hsoCham(25)+' đồng</p>'+
    '<p>- Nợ quá hạn: '+hsoO(t ? String(qh.n) : '', 'sl', 10)+' món; số tiền: '+hsoO(t ? tdnTien(qh.s) : '', 'sl', 20)+' đồng;</p>'+
    '<p>- Nợ khoanh: '+hsoO(t ? String(kn.n) : '', 'sl', 10)+' món; số tiền: '+hsoO(t ? tdnTien(kn.s) : '', 'sl', 20)+' đồng;</p>'+
    hsoBang('khung0 hso-ky', [1, 1, 1, 1], '<tr><td colspan="2" class="c b">BÊN GIAO</td><td colspan="2" class="c b">BÊN NHẬN</td></tr><tr>'+
      [['Hội/Đoàn thể', N.cb, 'kb'], ['Tổ trưởng Tổ TK&amp;VV', G.giao, 'sl'], ['Tổ trưởng Tổ TK&amp;VV', G.nhan, 'kb'], ['Hội/Đoàn thể', '', 'kb']].map(function(x){
        return '<td class="c"><p class="c b">'+x[0]+'</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c b">'+(x[1] ? hsoO(x[1], x[2]) : '&nbsp;')+'</p></td>'; }).join('')+'</tr>');
  return {ma:'02/BG', h:h};
}
