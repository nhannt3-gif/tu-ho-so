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
PV_DUNG.hst = {S:function(){ return hsoCH(); }, K:function(){ return TO_K; }, sau:function(){ hsoVe(); }, toBatBuoc:true, daChieu:true};
PV_DUNG.hsv = {S:function(){ return hsoCH(); }, K:function(){ return TO_K; }, sau:function(){ hsoVe(); }, toBatBuoc:true, daChieu:true};

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
  var loc = dsXa.length ? '<div class="hang-nut hso-kb-loc">'+CAY.dong([CAY.o('xa', T.xa, '— tất cả xã ('+dsXa.length+') —', CAY.dsXa(), 'onchange="HSO_KBT.xa=this.value;HSO_KBT.diem=\'\';hsoKBHop()"'),   /* 3.326: cây nhúng dùng chung (js/57) */
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
  HSO_TR[k] = null; var cu = TO_K;   /* đọc kỳ trước rồi trả lại kỳ đang dựng (ngoại lệ: đổi kỳ là việc của tab) */
  KHO.nap(tr).then(function(K2){ TO_K = cu; slDung(cu.ky); var x = K2.to[t.ma]; HSO_TR[k] = x ? {ten:x.ten||'', pho:x.pho||''} : null; if(HSO_TR[k] && document.getElementById('hso-ds')) hsoVe(); }).catch(function(){ TO_K = cu; });
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

/* ---------- HỒ SƠ VAY: 01/TD · 03/TD · 04/TD · 09A/TD ---------- */
function hsoKhachChon(t){ var kh = HSO.vay.kh; if(!kh || kh==='moi' || !t) return null; var c = hsoKhach(kh, t); return c.ten ? c : null; }
function hsoDiaChi(c, t){ var tenXa = (c && c.tenXa) || (t && t.tenXa) || '', ap = (c && c.ap) || (t ? hsoApTen(t) : '');
  return [ap ? ktCapAp(tenXa)+' '+ap : '', tenXa ? ktXaChu(tenXa) : '', 'tỉnh '+hsoPGD('tinh')].filter(Boolean).join(', '); }
function hsoLap01td(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), T = hsoBoT(B), A = hsoPA(B), C = A.C || {ubnd:true, nhcsxh:true, kieu:'hssv'}, hssv = C.nhcsxh, tuCo = hsoTuCo(B), sp = '        ';
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '';
  var Q = function(k, co, html, cham){ return hsoChamIn('01td', k) && co ? html : cham; }, lai = hsoChamGT('01td', 'nhLai', ''), qh = hsoChamGT('01td', 'nhQH', ''), nl = hsoChamGT('01td', 'nhNgayLai', '');   /* 3.215 khai báo riêng */
  var bang = '<tr><td class="c b">Đối tượng</td><td class="c b">Số lượng</td><td class="c b">Thành tiền</td></tr>'+
    (A.dong.length ? A.dong : [['', '', 0]]).map(function(x){ return '<tr><td class="c">'+hsoO(x[0], 'kb', 30)+'</td><td class="c">'+hsoO(x[1], 'kb', 15)+'</td><td class="c">'+hsoO(hsoDongTien(x[2]), 'kb', 20)+'</td></tr>'; }).join('')+
    (A.dong.length===1 && C.kieu==='congtrinh' ? '<tr><td class="c">'+hsoCham(30)+'</td><td class="c">'+hsoCham(18)+'</td><td class="c">'+hsoCham(22)+'</td></tr>' : '');
  var h = hsoBang('khung0', [22, 58, 20], '<tr><td>'+hsoLogo('01td', 19)+'</td><td class="c">'+hsoQH('-', 13)+'</td><td class="r"><p class="r b s12">Mẫu số 01/TD</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ VAY VỐN KIÊM PHƯƠNG ÁN SỬ DỤNG VỐN VAY</p>'+
    '<p class="c"><b>Chương trình cho vay</b>: '+hsoO(B ? hsoCTTenIn(B.ct) : '', 'kb', 40)+'</p>'+
    '<p class="l2 tr"><b>Kính gửi:</b> '+coChuHTML(hsoPGD('kinhGui'))+'.</p>'+
    '<p><b>1.</b> Họ tên người vay: '+hsoO(N.ten, 'sl', 35)+sp+'Năm sinh: '+hsoO(hsoNgayVN(N.ns), 'sl', 14)+'</p>'+
    '<p class="l1">- Số CC\\CCCD: '+hsoO(N.cccd, 'sl', 16)+' ngày cấp: '+hsoO(hsoNgayVN(N.ncap), 'sl', 12)+', nơi cấp: '+hsoO(N.noiCap, 'sl', 15)+'</p>'+
    '<p class="l1">- Địa chỉ cư trú: '+hsoO(dc, 'sl', 60)+'.</p>'+
    '<p class="l1">- Là thành viên Tổ TK&amp;VV do ông (bà): '+hsoO(T.tt, 'sl', 30)+' làm tổ trưởng.</p><p class="l1">- Thuộc tổ chức '+hsoO(T.hoi ? hsoBoHoiTen(T) : '', 'sl', 30)+' quản lý.</p>'+
    '<p><b>2.</b> Đề nghị '+(hssv ? 'NHCSXH ' : '')+'cho vay số tiền: '+(A.tien ? hsoO(tdnTien(A.tien), 'kb') : hsoCham(25))+' đồng'+(hssv ? '' : '.')+'</p>'+
    '<p class="l1">(Bằng chữ: '+(A.tien ? hsoO(hsoChuSo(A.tien), 'kb') : hsoCham(60))+')</p>'+
    '<p class="l1">Để thực hiện phương án: '+hsoO(A.md ? A.md+'.' : '', 'kb', 60)+'</p>'+
    '<p class="l1">Tổng nhu cầu vốn: '+(A.tien ? hsoO(tdnTien(A.tien+tuCo), 'kb') : hsoCham(25))+' đồng'+(hssv ? '' : '.')+' Trong đó:</p>'+
    '<p class="l2">+ Vốn tự có tham gia: '+(B && tuCo ? hsoO(tdnTien(tuCo), 'kb') : hsoCham(25))+' đồng.</p>'+
    '<p class="l2">+ Vốn vay NHCSXH: '+(A.tien ? hsoO(tdnTien(A.tien), 'kb') : hsoCham(25))+' đồng để dùng vào việc:</p>'+hsoBang('khung0', [40, 24, 36], bang)+
    '<p class="l1 tr">- Thời hạn xin vay: '+hsoO(A.th, 'kb', 8)+' tháng; Kỳ hạn trả nợ: '+hsoO(B ? A.ky : '', 'kb', 6)+' tháng/lần.</p>'+
    '<p class="l1">- Hạn trả nợ cuối cùng: Ngày'+(B && B.hanCuoi ? ' '+hsoO(hsoNgayVN(B.hanCuoi), 'kb') : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(10))+'</p>'+
    '<p class="j thut">Chúng tôi cam kết: sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai trái, tôi hoàn toàn chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [52, 48], '<tr><td></td><td class="c"><p class="c i">'+hsoChamNgayTT('01td', 'ngayKy', 'Ngày'+hsoCham(6)+' tháng '+hsoCham(6)+' năm '+hsoCham(6))+'</p></td></tr><tr><td class="c">'+
      (C.ubnd ? '<p class="c b">Xác nhận của UBND xã</p><p>Ông/bà '+Q('ubOng', N.ten, hsoO(N.ten, 'kb', 40), hsoCham(40))+'</p><p>'+hsoCham(52)+'</p><p>'+hsoCham(52)+'</p><p class="c b">Chủ tịch</p><p class="c">(ký tên, đóng dấu)</p>' : '')+
      '</td><td class="c"><p class="c b">Người vay</p><p class="c i s11">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p class="c b tr">PHÊ DUYỆT CỦA NGÂN HÀNG</p>'+
    '<p>1. Số tiền cho vay: '+Q('nhTien', A.tien, hsoO(tdnTien(A.tien), 'kb')+' ', hsoCham(20))+'đồng (Bằng chữ:'+Q('nhTien', A.tien, ' '+hsoO(hsoChuSo(A.tien), 'kb'), hsoCham(45))+')</p><p>2. Lãi suất: '+(lai ? hsoO(lai, 'kb') : hsoCham(6))+'%/năm. Lãi suất nợ quá hạn: '+(qh ? hsoO(qh, 'kb') : hsoCham(10))+'% lãi suất khi cho vay.</p>'+
    '<p>3. Thời hạn cho vay: '+Q('nhTH', A.th, hsoO(A.th, 'kb'), hsoCham(12))+' tháng; Kỳ hạn trả nợ: '+Q('nhTH', B && A.ky, hsoO(B ? A.ky : '', 'kb')+' ', hsoCham(12))+'tháng/lần.</p><p>4. Số tiền trả nợ: '+hsoCham(22)+' đồng/lần. Hạn trả nợ cuối cùng: Ngày'+Q('nhHan', B && B.hanCuoi, ' '+hsoO(hsoNgayVN(B && B.hanCuoi), 'kb'), hsoCham(6)+'/'+hsoCham(5)+'/'+hsoCham(6))+'</p>'+
    '<p>5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày '+(nl ? hsoO(nl, 'kb') : hsoCham(40))+'</p>'+
    hsoBang('khung0 hso-ky', [1, 1, 1], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Cán bộ tín dụng</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p>&nbsp;</p><p class="c b">Trưởng phòng<br>(Tổ trưởng) TD</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c i">'+hsoChamNgayTT('01td', 'nhNgay', 'Ngày'+hsoCham(5)+'tháng'+hsoCham(5)+'năm'+hsoCham(5))+'</p><p class="c b">Giám đốc</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'01/TD', h:h};
}
function hsoLap03td(t, B, ds, ctMa){   /* ctMa (3.209): 03/TD nhiều hộ — tên chương trình theo thẻ */
  B = B || hsoBo(); var T = B ? hsoBoT(B) : hsoTo(t), xaCap = /^phường/i.test(String((B && B.nv.tenXa) || (t && t.tenXa) || '')) ? 'phường' : 'xã', ng = HSO.o.ngay || '';
  var A3 = hsoPA(B), hang = ds || (B ? [{ten:hsoBoNV(B).ten, dt:B.dtth || hsoDTTHMd(B, xaCap==='phường'), tien:A3.tien, md:A3.mdDs, th:A3.th ? A3.th+' tháng' : ''}] : []);   /* 3.208: thời hạn gõ ở 01/TD → cột 6; ĐTTH trống → mặc định thẻ CT theo xã / phường */
  var tong = 0, r = '<thead><tr><td class="c b" rowspan="2">STT</td><td class="c b" rowspan="2">Họ và tên</td><td class="c b" rowspan="2">Đối tượng<br>thụ hưởng</td><td class="c b" colspan="3">Đề nghị của Tổ TK&amp;VV</td><td class="c b" colspan="2">Phê duyệt của Ngân hàng</td></tr>'+
    '<tr><td class="c b">Số tiền</td><td class="c b">Mục đích sử dụng vốn</td><td class="c b">Thời hạn</td><td class="c b">Số tiền</td><td class="c b">Thời hạn</td></tr><tr>'+[1,2,3,4,5,6,7,8].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr></thead><tbody>';
  var nhCot = hsoChamIn('03td', 'nhCot'), nhSo = hsoChamIn('03td', 'nhSo') && hang.length;   /* 3.215 khai báo riêng: cột phê duyệt NH = đề nghị; số người / tổng tiền tự tính */
  hang.forEach(function(x, i){ tong += x.tien||0; r += '<tr><td class="c">'+(i+1)+'</td><td>'+hsoO(x.ten)+'</td><td class="j">'+(x.dt ? hsoO(x.dt, 'kb') : '')+'</td><td>'+(x.tien ? hsoO(tdnTien(x.tien), 'kb') : '')+'</td><td class="j">'+(x.md ? hsoO(x.md, 'kb') : '')+'</td><td class="c">'+(x.th ? hsoO(x.th, 'kb') : '')+'</td><td>'+(nhCot && x.tien ? hsoO(tdnTien(x.tien), 'kb') : '')+'</td><td>'+(nhCot && x.th ? hsoO(x.th, 'kb') : '')+'</td></tr>'; });
  for(var i=0;i<2 || (!hang.length && i<5);i++) r += '<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  r += '<tr class="het"><td></td><td class="c b">Cộng:</td><td></td><td class="b">'+(tong ? hsoO(tdnTien(tong), 'kb') : '')+'</td><td></td><td></td><td>'+(nhCot && tong ? '<b>'+hsoO(tdnTien(tong), 'kb')+'</b>' : '')+'</td><td></td></tr></tbody>';
  var h = hsoBang('khung0', [27, 48, 25], '<tr><td><p>Tên tổ TK&amp;VV: '+hsoO(T.tt, 'sl', 25)+'</p><p>'+(T.capAp==='khu phố' ? 'Khu phố' : 'Ấp')+': '+hsoO(T.ap, 'sl', 20)+'</p><p>'+(xaCap==='phường' ? 'Phường' : 'Xã')+': '+hsoO(T.xa, 'sl', 20)+'</p></td>'+
      '<td class="c"><p class="c b">DANH SÁCH TỔ VIÊN</p><p class="c b">ĐỀ NGHỊ VAY VỐN NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p class="c b s12">Chương trình cho vay: '+hsoO(B ? hsoCTTenIn(B.ct) : ctMa ? hsoCTTenIn(ctMa) : (HSO.vay.ct ? hsoCTTen(HSO.vay.ct) : ''), 'kb', 30)+'</p></td>'+
      '<td class="r"><p class="r b">Mẫu số: 03/TD</p><p class="r s10">Lập 02 liên chính</p><p class="r s10">(01 liên lưu hồ sơ Tổ tại NH,</p><p class="r s10">01 liên lưu tại Tổ)</p><p class="r s10">02 liên phôtô: 01 liên đóng C.từ tại NH; 01 liên lưu Hội đoàn thể</p></td></tr>')+
    '<p class="j thut tr">Tại cuộc họp Tổ Tiết kiệm và vay vốn ngày '+(ng ? hsoNgayO(ng) : hsoCham(7)+' / '+hsoCham(6)+' / '+hsoCham(11))+' đã bình xét các tổ viên đề nghị vay vốn Ngân hàng Chính sách xã hội. Toàn tổ nhất trí đề xuất những tổ viên có tên dưới đây đang cư trú tại địa phương, đủ điều kiện và thuộc đối tượng vay vốn đợt này:</p>'+
    '<p class="r i">Đơn vị: đồng</p>'+hsoBang('luoi cham s12', [5, 18, 17, 11, 18, 10, 11, 10], r)+
    hsoBang('khung0 hso-ky', [22, 36, 42], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Tổ trưởng</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c">'+hsoChamNgayTT('03td', 'ngayKy', 'Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(10))+'</p><p class="c b">Phần xác nhận của UBND '+xaCap+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p class="c b">UBND '+xaCap+'</p><p class="c s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c">'+hsoChamNgayTT('03td', 'nhNgay', 'Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(9))+'</p><p class="c b">Phê duyệt của Ngân hàng</p><p class="c">Số người được vay vốn đợt này: '+(nhSo ? hsoO(String(hang.length), 'kb') : hsoCham(30))+' người.</p><p class="c">Tổng số tiền cho vay: '+(nhSo && tong ? hsoO(tdnTien(tong), 'kb') : hsoCham(45))+' đồng.</p>'+
      '<p class="c">Số người chưa được vay đợt này: '+hsoCham(10)+' người, có số thứ tự trong danh sách là: '+hsoCham(45)+'</p>'+
      hsoBang('khung0', [1, 1, 1], '<tr><td class="c"><p class="c b">Cán bộ tín dụng</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Trưởng phòng</p><p class="c s11">(Tổ trưởng) TD</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Giám đốc</p><p class="c s11">(Ký tên, đóng dấu)</p></td></tr>')+'</td></tr>');
  return {ma:'03/TD', h:h};
}
function hsoMonGH(t){   /* món còn dư nợ của khách đang chọn (09A) */
  var kh = HSO.vay.kh; if(!t || !kh || kh==='moi') return [];
  var k = hsoTVTo(t).find(function(x){ return x.kh===kh; }); return k ? k.mon.filter(function(m){ return (m.dn||0)>0; }) : [];
}
/* 3.206 (anh chốt 14/10): Ô CHẤM TÙY BIẾN — cách chung cho mọi mẫu. Số liệu cố định (tên, nhân thân, món vay, tổ, Hội) không tùy biến;
   mỗi ô chấm có công tắc [✍ Chấm viết tay | 🖨 In sẵn], nhớ theo mẫu (hsoLuu().cham[mẫu][ô], đồng bộ Drive); giá trị gõ chỉ giữ trong lần làm (HSO.vay).
   Thêm ô cho mẫu khác = thêm 1 dòng vào HSO_CHAM[mẫu]: [khóa, nhãn, loại (lyDo · tien · so · ngay · chu), mặc định 'in' | 'cham'] */
var HSO_CHAM = {'09a':[['lyDo','Lý do chưa trả','lyDo','cham'], ['tienGH','Số tiền đề nghị gia hạn (đ)','tien','in'], ['thang','Thời gian đề nghị (tháng)','so','cham'],
  ['kyTra','Kế hoạch trả nợ (tháng/kỳ)','so','cham'], ['tienKy','Số tiền mỗi kỳ (đ)','tien','cham'], ['tienCuoi','Số tiền trả nợ kỳ cuối (đ)','tien','cham'], ['ngayKy','Ngày tháng (người vay ký)','ngay','cham']]};
/* 3.215 (anh 15/10): KHAI BÁO RIÊNG từng mẫu — mở rộng ô chấm tùy biến: loại 'kb' = khai 1 lần, app nhớ (hsoLuu().chamGT[mẫu][ô], cột 5 = 'ct' → nhớ theo chương trình vay);
   loại 'tu' = app tự lấy (theo hộ / danh sách / khai báo chung) — chỉ có công tắc. Mặc định mọi ô mới = ✍ chấm → bản in không đổi khi anh chưa bật. */
function hsoChamDef(mk, k){ return (HSO_CHAM[mk]||[]).find(function(x){ return x[0]===k; }) || null; }
function hsoChamKBKhoa(mk, k){ var d = hsoChamDef(mk, k); return d && d[4]==='ct' ? k+'|'+(((hsoBo()||{}).ct) || HSO.vay.ct || '') : k; }
function hsoChamKBLay(mk, k){ var L = hsoLuu(), g = ((L.chamGT||{})[mk])||{}; return g[hsoChamKBKhoa(mk, k)]; }
function hsoChamKBDat(mk, k, v){ var L = hsoLuu(); L.chamGT = L.chamGT || {}; (L.chamGT[mk] = L.chamGT[mk] || {})[hsoChamKBKhoa(mk, k)] = String(v||'').trim(); luu(); hsoHen(); }
function hsoChamIn(mk, k){ return hsoChamKieu(mk, k)==='in'; }
function hsoChamNgayTT(mk, k, cham){   /* 'Ngày dd tháng mm năm yyyy' khi 🖨 + đã gõ ngày; ✍ hoặc trống → giữ nguyên chuỗi chấm cũ của mẫu.
     Anh (15/10): ngày mặc định chấm ghi tay; 🖨 KHÔNG tự lấy hôm nay — logic ngày anh chốt sau */
  var g = hsoChamIn(mk, k) ? hsoNg(hsoChamGT(mk, k, '')) : null;
  return g ? 'Ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : cham; }
/* 3.221 (anh 16/10): 📝 BẢN GHI MẪU — in số liệu thật vào mọi ô khách / tổ phải viết để khách chép lại vào mẫu thật. Chỉ giữ trong lần làm (không lưu — tránh quên tắt);
   ✍ / 🖨 của bản thật không đổi. Phần UBND / Hội / Ngân hàng / người chứng kiến ghi (HSO_GM_KHAC) vẫn chấm. Ngày: vẫn chỉ in ngày đã gõ. */
var HSO_GM = false, HSO_GM_KHAC = {'01td':['ubOng','nhTien','nhLai','nhQH','nhTH','nhHan','nhNgayLai','nhNgay'], '03td':['ngayKy','nhCot','nhNgay','nhSo'], '01uq':['truongThon'], '01tdck':['nhTen','nhNgay']};
function hsoGhiMauO(mk, k){ return (HSO_GM_KHAC[mk]||[]).indexOf(k)<0; }
function hsoGhiMauDat(v){ HSO_GM = !!v; hsoVe(); }
function hsoChamKieu(mk, k){ if(HSO_GM && hsoGhiMauO(mk, k) && hsoChamDef(mk, k)) return 'in'; var c = ((hsoLuu().cham||{})[mk])||{}, d = (HSO_CHAM[mk]||[]).find(function(x){ return x[0]===k; }); return c[k] || (d ? d[3] : 'cham'); }
function hsoChamDat(mk, k, v){ var L = hsoLuu(); L.cham = L.cham || {}; (L.cham[mk] = L.cham[mk] || {})[k] = v; luu(); hsoVe(); }
function hsoLyDoDs(){ var L = hsoLuu(); if(!Array.isArray(L.lyDoDs) || !L.lyDoDs.length) L.lyDoDs = ['Đang gặp khó khăn về kinh tế, tài chính']; return L.lyDoDs; }
function hsoLyDoThem(){ var v = String(HSO.vay.lyDo||'').trim(); if(!v) return bao('Gõ lý do vào ô trước rồi bấm ＋.'); var ds = hsoLyDoDs(); if(ds.indexOf(v)<0){ ds.push(v); luu(); } hsoVe(); bao('Đã thêm vào danh sách lý do.'); }
function hsoLyDoBo(i){ var ds = hsoLyDoDs(); if(ds.length<=1) return bao('Danh sách cần ít nhất 1 lý do.'); ds.splice(i, 1); luu(); hsoVe(); }
function hsoChamGT(mk, k, md){ if(hsoChamKieu(mk, k)!=='in') return ''; var d = hsoChamDef(mk, k), v = d && d[2]==='kb' ? hsoChamKBLay(mk, k) : HSO.vay[k]; if(v===undefined || v==='') v = md; return v==null ? '' : String(v); }   /* '' = in chấm */
function hsoChamTien(mk, k, md){ var v = hsoSo(hsoChamGT(mk, k, md)); return v ? tdnTien(v) : ''; }
function hsoChamNgay(mk, k, n){ var v = hsoChamGT(mk, k, ''), g = hsoNg(v);   /* 3.215 (anh 15/10): mọi mẫu — không tự ghi ngày khi anh không gõ */
  n = n || [5, 4, 10];   /* ', ngày … tháng … năm …' */
  return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày'+hsoCham(n[0])+'tháng'+hsoCham(n[1])+'năm '+hsoCham(n[2]); }
function hsoKBRieng(mk, md){   /* 3.215: khối ⚙ Khai báo riêng ở cột trái — liệt kê ô từ trên xuống theo mẫu · 3.222 (anh 16/10, bố cục A): cuối cột trái, thu gọn được, ↺ về mặc định */
  if(typeof omCo==='function' && omCo(mk)){ var S0 = hsoCH(), t0 = KHO.to(S0.to); if(t0 && toLaTT(t0)) t0 = null; return omKBRieng(mk, OM_MAU[mk].V(t0, hsoBo())); }   /* 3.223: mẫu đã lên nền ô */
  var M = (HSO_MAU.hsv.concat(HSO_MAU.hst)).find(function(m){ return m.k===mk; }) || {ma:mk}, dong = !hsoKBRDangMo(mk), doi = Object.keys(((hsoLuu().cham||{})[mk])||{}).length;
  return '<details class="hso-kbr-d"'+(dong ? '' : ' open')+' ontoggle="hsoKBRMo(\''+mk+'\',this.open)"><summary class="nhan-nhom hso-kbr-o">⚙ Khai báo riêng — Mẫu '+coChuHTML(M.ma)+' <small>(ô ✍ / 🖨 từ trên xuống)</small></summary>'+
    (doi ? '<div class="hang-nut"><button class="nho" onclick="hsoChamVeMD(\''+mk+'\')" title="Đưa mọi ô của mẫu về mặc định (✍ chấm) — giá trị đã khai vẫn giữ">↺ Về mặc định ('+doi+' ô đã đổi)</button></div>' : '')+hsoChamTuy(mk, md)+'</details>'; }
function hsoKBRDangMo(mk){ return !!((hsoLuu().kbrMo||{})[mk]); }   /* 3.240 (anh 17/10): khai báo riêng có nút mở / tắt, mặc định TẮT — tránh nhầm với form lập mẫu */
function hsoKBRMo(mk, mo){ var L = hsoLuu(); L.kbrMo = L.kbrMo || {}; if(hsoKBRDangMo(mk)===!!mo) return; if(mo) L.kbrMo[mk] = 1; else delete L.kbrMo[mk]; delete (L.kbrDong||{})[mk]; luu(); }
function hsoChamVeMD(mk, khongHoi){   /* 3.222 (bổ sung 2): bỏ ✍ / 🖨 anh đã đổi của mẫu → về mặc định; giá trị khai 1 lần (chamGT) giữ nguyên để bật lại không phải gõ */
  var ghi = function(){ var L = hsoLuu(); if(L.cham) delete L.cham[mk]; luu(); hsoVe(); bao('Đã đưa ô tùy biến về mặc định.'); };
  if(khongHoi) return ghi();
  hoi('Đưa ô tùy biến của mẫu về mặc định?', 'Mọi ô về ✍ chấm ghi tay như lúc mới (ô nào mẫu mặc định in sẵn thì in sẵn). Giá trị anh đã khai vẫn giữ.', 'Về mặc định', ghi); }
/* 3.222 (bổ sung 1): NGUỒN số liệu của ô 🖨 — ô 'tu' ghi rõ app lấy ở đâu (theo nguyên tắc cửa kho trả kèm nguồn) */
var HSO_NGUON = {ubOng:'người vay — sổ hộ vay', nhTien:'số đề nghị — ③ Phương án', nhTH:'thời hạn, kỳ hạn đề nghị — ③ Phương án', nhHan:'hạn trả nợ cuối — ③ Phương án', nhCot:'cột 5–6 của danh sách', nhSo:'tự tính theo danh sách',
  cif:'M31', danToc:'M31', sdt:'M31 / sổ hộ vay', quocTich:'ghi sẵn theo mẫu', cuTru:'ghi sẵn theo mẫu', hanCCCD:'tính từ ngày sinh + ngày cấp CCCD', thuongTru:'sổ hộ vay (tổ dân phố / thôn, xã, tỉnh)',
  truongThon:'⚙ Khai báo đơn vị › Trưởng ấp', nhTen:'người đề nghị đang chọn', '09a.tienGH':'trống = dư nợ món vay (M31)'};
function hsoChamNguon(mk, x){
  var m31 = 'Mẫu 31'+(KHO.coKy() ? ' kỳ '+slKyChu(KHO.ky().ky) : ' (chưa nạp)'), n = HSO_NGUON[mk+'.'+x[0]] || (x[2]==='tu' ? HSO_NGUON[x[0]] || 'app tự lấy' : '');
  if(!n) n = x[2]==='kb' ? (x[4]==='ct' ? 'khai 1 lần, app nhớ theo chương trình '+((((hsoBo()||{}).ct) || HSO.vay.ct) || '(chưa chọn)') : 'khai 1 lần, app nhớ') : x[2]==='lyDo' ? 'danh sách lý do app nhớ' : 'gõ trong lần làm (không lưu)';
  return n.replace(/M31/g, m31); }
/* 3.222 (bổ sung 3): ⚠ NHẮC THIẾU trước khi in — gom 1 dòng đầu cột trái: nhân thân người vay, ô đã bật 🖨 mà chưa có số liệu (sẽ in chấm) */
function hsoThieu(M, t){
  var r = [], B = hsoBo(), V = HSO.vay, mk = M.k, nv = null;
  if(mk==='01tgtv' && typeof tgNguon==='function' && tgNguon(B)!=='bo'){   /* 3.317: 01/TGTV nhắc theo nguồn đang chọn (Mẫu 31 / tự khai), không theo Sổ hộ vay */
    if(tgNguon(B)==='tay' && tgTayCo()) nv = tgTay(); }
  else if(/^(01td|01uq|01gqvl|07b|pdnh|01tgtv)$/.test(mk) && B && B.hoId && hmTim(B.hoId)) nv = B.nv;
  else if(/^(09a|01tdck)$/.test(mk) && V.kh) nv = KHO.khach(V.kh, t);
  if(nv){ var th = [['cccd','số CCCD'], ['ncap','ngày cấp CCCD'], ['ns','ngày sinh']].filter(function(x){ return !nv[x[0]]; }).map(function(x){ return x[1]; });
    if(th.length) r.push('Người vay '+(nv.ten ? '<b>'+coChuHTML(nv.ten)+'</b> ' : '')+'thiếu '+th.join(', ')+' → in chấm'); }
  if(typeof omCo==='function' && omCo(mk)){   /* 3.223: mẫu trên nền ô — ô dài quá khung (đã thu nhỏ hết mức), ô bật in mà chưa có số liệu */
    try { if(mk==='01tgtv' && typeof tgNguon==='function' && tgNguon(B)==='tay') hsoLap01tgtv(t, tgTayP()); else omLap(mk, t, B || hsoBo()); } catch(e){}   /* 3.319: In nhanh dựng thử theo người đang khai */   /* dựng thử để biết ô dài (cột trái vẽ trước khung xem) */
    OM_DAI.filter(function(x){ return x.mk===mk; }).forEach(function(x){ r.push('Ô <b>'+coChuHTML(x.n)+'</b> '+(x.gian ? 'dài hơn ô (đã viết tắt, nhãn sau dịch phải — xem có rớt dòng không, cần thì gõ ngắn lại)' : 'dài quá khung (đã thu nhỏ chữ hết mức)')+': "'+coChuHTML(x.v.slice(0, 60))+'"'); });
    if(OM_KIEU==='that'){ var Vo = OM_MAU[mk].V(t, B); OM_MAU[mk].o.forEach(function(x){ var c = omCachLuu(mk, x.k); if(c==='kb' && !omKB(mk, x.k) && !((OM_LOAI[x.l]||[]).indexOf('tu')>=0 && (Vo[x.k]||'')) || c==='go' && !(Vo[x.k]||'')) r.push('Ô '+OM_CACH[c][0]+' <b>'+coChuHTML(x.n)+'</b> chưa có số liệu → in chấm'); }); }
    return r; }
  if(!HSO_GM) (mk==='09a' && hsoLuu().kemTDCK ? ['09a', '01tdck'] : [mk]).forEach(function(m){ (HSO_CHAM[m]||[]).forEach(function(x){
    if(x[2]==='nhom' || hsoChamKieu(m, x[0])!=='in') return;
    var trong = x[2]==='kb' ? !hsoChamKBLay(m, x[0]) : x[2]==='ngay' ? !hsoNg(V[x[0]]) : (x[2]==='tien' || x[2]==='so') ? (V[x[0]]===undefined || V[x[0]]==='') && !(m==='09a' && x[0]==='tienGH') : x[0]==='truongThon' ? !!t && !hsoTo(t).truongAp : false;
    if(trong) r.push('Ô 🖨 <b>'+coChuHTML(x[1])+'</b> chưa có số liệu → in chấm'); }); });
  return r; }
function hsoThieuHTML(M, t){ var r = hsoThieu(M, t); return r.length ? '<div class="sl-bao vang hso-nhac hso-thieu">⚠ <b>Trước khi in</b>:<ul>'+r.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul></div>' : ''; }
function hsoChamTuy(mk, md){   /* md = {khóa: giá trị mặc định khi In sẵn} */
  return '<div class="hso-cham'+(HSO_GM ? ' hso-gm' : '')+'"><div class="hso-cham-che">'+gdxChip('🖨 Bản thật', !HSO_GM, 'hsoGhiMauDat(0)', 'hso-ct', 'In theo ✍ / 🖨 từng ô bên dưới')+gdxChip('📝 Bản ghi mẫu', HSO_GM, 'hsoGhiMauDat(1)', 'hso-ct', 'In số liệu thật vào mọi ô khách phải viết — khách chép lại vào mẫu thật')+'</div>'+
    (HSO_GM ? '<div class="sl-bao vang hso-nhac">📝 <b>Bản ghi mẫu</b>: mọi ô của khách in sẵn số liệu thật (có số liệu mới in; ngày in khi đã gõ). Phần UBND / Hội / Ngân hàng vẫn chấm. Chỉ cho lần in này — bấm <b>🖨 Bản thật</b> để về.</div>' : '')+
    '<div class="hso-cham-dau">Ô chấm: <b>✍ viết tay</b> hay <b>🖨 in sẵn</b> <small>(app nhớ theo mẫu)</small></div>'+(HSO_CHAM[mk]||[]).map(function(x){
    if(x[2]==='nhom') return '<div class="hso-cham-nhom">'+coChuHTML(x[1])+'</div>';
    var k = x[0], kieu = hsoChamKieu(mk, k), inS = kieu==='in', v = HSO.vay[k]!==undefined ? HSO.vay[k] : (md && md[k]!==undefined ? md[k] : ''), o = '';
    var sw = '<span class="hso-sw"><button class="'+(inS ? '' : 'bat')+'" onclick="hsoChamDat(\''+mk+'\',\''+k+'\',\'cham\')" title="Để chấm — ghi tay">✍</button><button class="'+(inS ? 'bat' : '')+'" onclick="hsoChamDat(\''+mk+'\',\''+k+'\',\'in\')" title="In sẵn">🖨</button></span>';
    if(inS){
      if(x[2]==='lyDo'){ var ds = hsoLyDoDs(); if(HSO.vay.lyDo===undefined) HSO.vay.lyDo = ds[0];
        o = '<select onchange="if(this.value){HSO.vay.lyDo=this.value;hsoVe();}"><option value="">— chọn lý do có sẵn —</option>'+ds.map(function(l, i){ return '<option value="'+coChuHTML(l)+'"'+(l===HSO.vay.lyDo ? ' selected' : '')+'>'+coChuHTML(l)+'</option>'; }).join('')+'</select>'+
          '<span class="hso-cham-ly">'+hsoIn('HSO.vay.lyDo=this.value;hsoHen()', HSO.vay.lyDo, 'gõ lý do khác')+'<button class="nho" onclick="hsoLyDoThem()" title="Thêm lý do đang gõ vào danh sách">＋</button>'+
          (ds.indexOf(HSO.vay.lyDo)>=0 && ds.length>1 ? '<button class="nho" onclick="hsoLyDoBo('+ds.indexOf(HSO.vay.lyDo)+')" title="Bỏ lý do này khỏi danh sách">✕</button>' : '')+'</span>'; }
      else if(x[2]==='kb'){ var kv = hsoChamKBLay(mk, k); o = hsoIn('hsoChamKBDat(\''+mk+'\',\''+k+'\',this.value)', kv==null ? '' : kv, (md && md[k] ? 'trống = '+md[k] : 'khai 1 lần, app nhớ')+(x[4]==='ct' ? ' (theo chương trình đang chọn)' : '')); }
      else if(x[2]==='tu') o = '<small class="hso-cham-tu">'+(md && md[k] ? 'tự lấy: '+coChuHTML(md[k]) : 'tự lấy khi có số liệu')+'</small>';
      else o = (x[2]==='ngay' ? '<small class="hso-cham-tu">'+'gõ ngày — trống vẫn chấm'+'</small>' : '')+hsoIn('HSO.vay[\''+k+'\']=this.value;hsoHen()', v, x[2]==='tien' ? 'số tiền' : x[2]==='so' ? 'số' : x[2]==='ngay' ? '' : '', x[2]==='ngay' ? 'date' : (x[2]==='so' ? 'number' : ''));
    }
    return '<div class="hso-cham-o"><span class="hso-cham-nhan">'+coChuHTML(x[1])+(HSO_GM && !hsoGhiMauO(mk, k) ? ' <small class="hso-cham-tu">(UBND / Hội / NH — vẫn chấm)</small>' : '')+(inS ? ' <small class="hso-cham-ng" title="Nguồn số liệu">📎 '+coChuHTML(hsoChamNguon(mk, x))+'</small>' : '')+'</span>'+sw+'<span class="hso-cham-gt">'+(inS ? o : '<i class="hso-cham-tay">…… chấm, ghi tay</i>')+'</span></div>'; }).join('')+'</div>';
}
/* 3.206 (anh gửi mẫu 14/10): 01/TĐCK — Giấy đề nghị thay đổi mẫu chữ ký giao dịch với NHCSXH (VB 2407 ngày 28/3/2025). Người đề nghị = người vay đang chọn
   (dùng chung lựa chọn với 09A); nhân thân theo danh bạ (Mẫu 31); ngày ký = ô chấm tùy biến; phần chấp thuận NH luôn chấm. In kèm 09A (cùng khổ dọc → 1 lần in / 1 file Word). */
HSO_CHAM['01tdck'] = [['_1','Khách hàng','nhom'], ['ngayKy','Ngày tháng (khách hàng ký)','ngay','cham'], ['_2','Chấp thuận của NHCSXH','nhom'], ['nhTen','"chấp thuận cho ông/bà …" = tên khách hàng','tu','cham'], ['nhNgay','"kể từ ngày …/…/…" (hiệu lực mẫu chữ ký mới)','ngay','cham']];   /* 3.220 (anh 15/10): thêm phần chấp thuận NH — mặc định ✍ chấm */
/* 3.215 (anh 15/10): ô tùy biến từng mẫu, liệt kê từ trên xuống. Nhân thân, món vay, tổ, Hội, chương trình, số tiền / phương án (đã gõ ở phiếu hộ) KHÔNG ở đây.
   Phần NH phê duyệt / UBND / trưởng thôn: mặc định ✍ chấm như cũ — anh bật 🖨 khi muốn in sẵn. */
HSO_CHAM['01td'] = [['_1','Người vay','nhom'], ['ngayKy','Ngày tháng (người vay ký)','ngay','cham'],
  ['_2','Xác nhận của UBND xã','nhom'], ['ubOng','"Ông/bà …" = họ tên người vay','tu','cham'],
  ['_3','Phê duyệt của Ngân hàng','nhom'], ['nhTien','1. Số tiền cho vay + bằng chữ (= số đề nghị)','tu','cham'], ['nhLai','2. Lãi suất (%/năm)','kb','cham','ct'], ['nhQH','2. Lãi suất nợ quá hạn (% lãi suất khi cho vay)','kb','cham'],
  ['nhTH','3. Thời hạn cho vay, kỳ hạn trả nợ (= đề nghị)','tu','cham'], ['nhHan','4. Hạn trả nợ cuối cùng (= đề nghị)','tu','cham'], ['nhNgayLai','5. Lãi trả hàng tháng vào ngày','kb','cham'], ['nhNgay','Ngày tháng (Giám đốc ký)','ngay','cham']];
HSO_CHAM['03td'] = [['_1','Tổ trưởng · UBND','nhom'], ['ngayKy','Ngày tháng (cột xác nhận UBND)','ngay','cham'],
  ['_2','Phê duyệt của Ngân hàng','nhom'], ['nhCot','Cột 7–8: số tiền, thời hạn (= đề nghị của tổ)','tu','cham'], ['nhNgay','Ngày tháng (phần phê duyệt)','ngay','cham'], ['nhSo','Số người được vay, tổng số tiền (tự tính theo danh sách)','tu','cham']];
HSO_CHAM['01tgtv'] = [['_1','A — thông tin khách hàng','nhom'], ['cif','Ô đầu trang + phần D: Số CIF (mã KH Mẫu 31)','tu','cham'], ['quocTich','Quốc tịch ☒ Việt Nam','tu','cham'], ['danToc','Dân tộc (Mẫu 31)','tu','cham'],
  ['cuTru','Tình trạng cư trú ☒ Có cư trú','tu','cham'], ['hanCCCD','Ngày hết hạn CCCD (tự tính theo ngày sinh, ngày cấp)','tu','cham'], ['thuongTru','Nơi thường trú: Tổ dân phố/Thôn · Phường/Xã · Tỉnh (sổ hộ vay)','tu','cham'],
  ['sdt','Điện thoại liên hệ (Mẫu 31 / sổ hộ vay)','tu','cham'], ['_2','C — cam kết','nhom'], ['ngayKy','Ngày tháng (khách hàng ký)','ngay','cham']];   /* 3.219 (anh 15/10): mặc định ✍ chấm ghi tay */
HSO_CHAM['01gqvl'] = [['_1','Người vay ký','nhom'], ['ngayKy','"…, ngày … tháng … năm …" (người vay ký phương án)','ngay','cham']];   /* 3.220 */
HSO_CHAM['07b'] = [['_1','Mở đầu hợp đồng','nhom'], ['noiKy','"Hôm nay, ngày … tại …" — nơi ký hợp đồng','kb','cham']];   /* 3.220 · ngày ký HĐ: ô "Ngày ký HĐ" ở trên (gõ thì in, trống chấm) */
HSO_CHAM['01uq'] = [['_1','Mục I','nhom'], ['ngayLap','"Ngày … tháng … năm …" lập giấy','ngay','cham'],
  ['_2','Chữ ký','nhom'], ['truongThon','Chứng kiến của Trưởng thôn — họ tên (⚙ Khai báo chung › Trưởng ấp)','tu','cham']];
function hsoLap01tdck(t){
  var T = t ? hsoTo(t) : {}, c = hsoKhachChon(t) || {}, ns = String(c.ns||''), noiCap = c.noiCap || hsoNoiCapGY(c.ncap);
  var nsChu = ns.length>=10 ? hsoO(ngayVNsl(ns)) : ns.length===4 ? hsoCham(3)+'/'+hsoCham(4)+'/'+hsoO(ns) : hsoCham(4)+'/'+hsoCham(6)+'/'+hsoCham(6);
  var kyO = '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>Họ và tên:'+hsoCham(40)+'</p>';
  var h = hsoBang('khung0', [74, 26], '<tr><td class="c">'+hsoQH('–', 13)+'</td><td><p class="b i s12">Mẫu số 01/TĐCK</p><p class="i s12">Lập 01 bản lưu NH</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ</p><p class="c b">Về việc thay đổi mẫu ký giao dịch với NHCSXH</p>'+
    '<p class="c tr"><b>Kính gửi:</b> '+coChuHTML(hsoPGD('kinhGui'))+'</p>'+
    '<p class="tr">Tên tôi là:'+hsoO(c.ten, 'sl', 36)+'; ngày, tháng, năm sinh: '+nsChu+'</p>'+
    '<p>Số thẻ căn cước/căn cước công dân:'+hsoO(c.cccd, 'sl', 40)+'; ngày cấp: '+hsoNgayO(c.ncap, 'sl')+'; nơi cấp:'+hsoO(c.cccd ? noiCap : '', 'sl', 46)+'</p>'+
    '<p>Nơi cư trú:'+hsoO(c.ten ? hsoDiaChi(c, t) : '', 'sl', 90)+'</p>'+
    '<p class="j">Là đại diện theo ủy quyền của hộ gia đình đứng tên vay vốn và thực hiện các giao dịch với NHCSXH, thuộc Tổ Tiết kiệm và vay vốn do ông (bà):'+hsoO(T.tt, 'sl', 40)+' làm Tổ trưởng.</p>'+
    '<p class="j">Đề nghị NHCSXH '+hsoO(hsoPGD('ngan'), 'sl', 34)+' thay đổi mẫu chữ ký giao dịch với Ngân hàng như sau:</p>'+
    hsoBang('luoi', [1, 1], '<tr><td class="c"><p class="c b">Chữ ký thứ nhất</p></td><td class="c"><p class="c b">Chữ ký thứ hai</p></td></tr><tr><td>'+kyO+'</td><td>'+kyO+'</td></tr>')+
    '<p>&nbsp;</p>'+
    hsoBang('khung0', [1.15, 1], '<tr><td class="c"><p class="c b">CHẤP THUẬN CỦA</p><p class="c b">NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p>'+
      '<p class="j">Ngân hàng Chính sách xã hội '+coChuHTML(hsoPGD('ngan'))+' chấp thuận cho ông/bà:'+(hsoChamIn('01tdck', 'nhTen') && c.ten ? ' '+hsoO(c.ten, 'sl')+' ' : hsoCham(30))+' có tên trên thay đổi mẫu chữ ký giao dịch với NHCSXH theo mẫu chữ ký đã đăng ký kể từ ngày '+(function(){ var g = hsoChamIn('01tdck', 'nhNgay') ? hsoNg(hsoChamGT('01tdck', 'nhNgay', '')) : null; return g ? hsoO(g.d+'/'+g.m+'/'+g.y, 'kb') : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8); })()+'</p>'+
      '<p class="c b tr">GIÁM ĐỐC</p><p class="c i s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c i">'+hsoO(T.xa, 'sl', 14)+hsoChamNgay('01tdck', 'ngayKy')+'</p><p class="c b">KHÁCH HÀNG</p><p class="c i s11">(Ký, ghi rõ họ và tên)</p></td></tr>');
  return {ma:'01/TĐCK', h:h};
}
/* 3.206 (anh chốt 14/10): 09A in kèm MẪU 06/TD (bên KTGS gọi "Mẫu 06 KTGS") — KHÔNG chép / sửa mẫu KTGS (khóa): gọi đúng hàm KTGS
   (ktGiaTri06 → ktHTML06 / ktDocx 'm06') cho 1 hộ = món đang gia hạn; Hội quản lý theo khai báo KTGS; cán bộ kiểm tra để trống (chấm); mục đích: in ngành (Mẫu 31) hoặc để trống */
function hso06Gt(){
  var S = hsoCH(), t = KHO.to(S.to), V = HSO.vay; if(!t || !V.kh || typeof ktGiaTri06!=='function') return null;
  var mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0]; if(!m) return null;
  var c = hsoKhachChon(t) || {}, mm = Object.assign({}, m); ktMaKV([mm]);
  return ktGiaTri06(t, [{kh:V.kh, ten:c.ten || m.ten || '', mon:[mm]}], {ngay:'', ng1:'', cb2:'', cv2:'', dv:'', md:hsoLuu().md06==='in' ? 'nganh' : ''});
}
function hso06Ten(){ var c = hsoKhachChon(KHO.to(hsoCH().to)) || {}; return 'Mau 06-TD Phieu KT su dung von - '+boDauTen(c.ten || 'ho vay'); }
function hsoIn06(){ var g = hso06Gt(); if(!g) return bao('Chọn tổ, người vay, món vay trước.'); inBlob(new Blob([ktHTML06(g)], {type:'text/html'}), hso06Ten()+'.html'); }
function hsoIn09Kem(){ xuatIn(); setTimeout(hsoIn06, 1500); }   /* in 09A rồi in tiếp Mẫu 06/TD (2 khổ giấy khác nhau → 2 lần in); nút 🖨 06/TD để in lại riêng */
function hsoWord06(){ var g = hso06Gt(); if(!g) return; ktDocx('m06', g).then(function(bl){ giaoFile(bl, hso06Ten()+'.docx'); }).catch(function(er){ baoLoi('Tạo Word Mẫu 06/TD lỗi: '+(er && er.message || er)); }); }
/* 3.253 (anh chốt 17–18/10, ý 12–14): MẪU 06/TD trong Hồ sơ vay — gọi đúng hàm Mẫu 06 KTGS (ktGiaTri06 → ktHTML06 / ktDocx 'm06'), không chép / sửa mẫu KTGS.
   Hộ = danh sách 03/TD (chung bộ 01 + 03 + 06; trống → hộ đang lập 01/TD). Phần ghi theo hồ sơ điền sẵn đủ (anh 18/10): họ tên, chương trình, giải ngân = dư nợ = số tiền vay 01/TD, mục đích;
   phần kiểm tra thực tế để trống ghi tay. Nhiều hộ / phiếu (≈ 3 hộ / mặt theo khuôn KTGS); hộ ở nhiều tổ → mỗi tổ 1 phiếu. */
function hso06Ho(){ var D3 = hsoD03(), B = hsoBo(), ds = D3.ds.slice();
  if(!ds.length && B && B.hoId && hmTim(B.hoId)) ds = [hsoD03Moi(hmTim(B.hoId), B.ct)];
  return ds.map(function(r){ var o = hmTim(r.hoId); return o ? {o:o, r:r, ct:(r.ct || D3.ct || (B && B.ct) || '')} : null; }).filter(Boolean); }
function hso06GtHS(){ if(typeof ktGiaTri06!=='function') return [];
  var nhom = {}, thu = [];
  hso06Ho().forEach(function(h){ var o = h.o, k = o.to || ('_'+(o.tenXa||'')+'|'+(o.tenThon||'')); if(!nhom[k]){ nhom[k] = []; thu.push(k); } nhom[k].push(h); });
  return thu.map(function(k){ var ds = nhom[k], o0 = ds[0].o, t = (o0.to && KHO.to(o0.to)) || {ten:'', tenXa:o0.tenXa || '', tenThon:o0.tenThon || '', ma:''}, phu = {};
    var dc = ds.map(function(h){ var tien = hsoSo(h.r.tien), ten = hmTen(h.o); phu[tenHoaDau(ten)] = {ct:h.ct==='NSVSMT' ? 'Nước sạch VSMT' : hsoCTTenIn(h.ct), md:h.r.md || ''};
      return {kh:h.o.kh || ('z'+h.o.id), ten:ten, mon:[{_ma:'', ct:'', gn:tien, dn:tien}]}; });
    var v = hso06V(), g; try { g = ktGiaTri06(t, dc, v); } catch(e){ g = ktGiaTri06({ten:t.ten || '', tenXa:t.tenXa || '', tenThon:t.tenThon || ''}, dc, v); }
    var mdHS = hso06L().md!=='trong'; g.rows.forEach(function(r){ var x = phu[r.R2]; if(x){ r.R4 = x.ct; r.R7 = mdHS ? x.md : ''; } });   /* chương trình, mục đích theo hồ sơ (KTGS lấy từ Mẫu 31) */
    return g; }); }
/* 3.255 (anh 18/10 "Mẫu 06 liên kết cho chọn và khai báo trong khai báo riêng của mẫu"): ⚙ Khai báo riêng 06/TD — đơn vị kiểm tra · cán bộ 1 (vai trò theo 🏛 Khai báo Hội) · cán bộ 2 + chức vụ · thời điểm · mục đích */
function hso06L(){ var L = hsoLuu(); L.k06 = L.k06 || {}; return L.k06; }
function hso06V(){ var L = hso06L(); return {ngay:L.ngay || '', ng1:L.ng1!==undefined ? L.ng1 : 'pct', cb2:L.cb2 || '', cv2:L.cv2 || '', dv:L.dvc==='cham' ? '-' : L.dvc==='go' ? (String(L.dv||'').trim() || '-') : '', md:''}; }
function hso06Dat(k, v){ var L = hso06L(); if(v==null || v==='') delete L[k]; else L[k] = v; luu(); hsoVe(); }
function hso06MD(){ hsoLuu().k06 = {}; luu(); hsoVe(); bao('Khai báo riêng 06/TD về mặc định.'); }
function hso06KBHTML(){ var L = hso06L(), mo = hsoKBRDangMo('06td'), dvc = L.dvc || 'tu', ng1 = L.ng1!==undefined ? L.ng1 : 'pct';
  var sel = function(k, gt, ds){ return '<select onchange="hso06Dat(\''+k+'\',this.value)">'+ds.map(function(x){ return '<option value="'+x[0]+'"'+(x[0]===gt ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'; };
  var inp = function(k, ph, kieu){ return '<input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(L[k]||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="hso06Dat(\''+k+'\',this.value.trim())">'; };
  return '<details class="hso-kbr-d"'+(mo ? ' open' : '')+' ontoggle="hsoKBRMo(\'06td\',this.open)"><summary class="nhan-nhom hso-kbr-o">⚙ Khai báo riêng — Mẫu 06/TD</summary>'+
    hsoTuyO('Đơn vị kiểm tra', sel('dvc', dvc, [['tu', 'Tự lấy — Hội của tổ (🏛 Khai báo Hội)'], ['cham', 'Để chấm (ghi tay)'], ['go', 'Gõ riêng']])+(dvc==='go' ? inp('dv', 'vd: Hội Nông dân xã …') : ''))+
    hsoTuyO('Cán bộ kiểm tra 1', sel('ng1', ng1, (typeof KT_IN_VT!=='undefined' ? KT_IN_VT : [['', 'Để trống (ghi tay)']]).map(function(x){ return [x[0], x[1]+(x[0] ? ' — tên theo 🏛 Khai báo Hội' : '')]; })))+
    hsoTuyO('Cán bộ kiểm tra 2', inp('cb2', 'họ tên — trống = chấm'))+hsoTuyO('Chức vụ cán bộ 2', inp('cv2', 'trống = chấm'))+
    hsoTuyO('Thời điểm kiểm tra', inp('ngay', '', 'date'))+'<div class="sl-phu">Trống = chấm; ngày ký cuối phiếu theo ngày này.</div>'+
    hsoTuyO('Mục đích sử dụng vốn', sel('md', L.md || 'hs', [['hs', 'Theo hồ sơ (01/TD)'], ['trong', 'Để trống (ghi tay)']]))+
    '<div class="hang-nut"><button class="nho" onclick="hso06MD()">↺ Về mặc định</button></div>'+
    '<div class="sl-phu">Khuôn phiếu theo Mẫu 06 KTGS (khóa) — chỉ các chỗ chấm khai được.</div></details>'; }
function hso06TenHS(){ var ds = hso06Ho(); return 'Mau 06-TD Phieu KT su dung von - '+(ds.length===1 ? boDauTen(hmTen(ds[0].o)) : ds.length+' ho'); }
function hsoLap06td(){ var g = hso06GtHS(); return {ma:'06/TD', k06:g, trang:g.length ? ktHTML06(g.length===1 ? g[0] : g) : '<p style="font-family:sans-serif;padding:20px">Chưa có hộ — chọn hộ ở 📒 Sổ hộ vay (📄 Lập HS) hoặc ＋ Thêm hộ.</p>'}; }
function hsoIn06HS(){ var g = hso06GtHS(); if(!g.length) return bao('Chưa có hộ cho Mẫu 06/TD.'); inBlob(new Blob([ktHTML06(g.length===1 ? g[0] : g)], {type:'text/html'}), hso06TenHS()+'.html'); }
function hsoWord06HS(){ var g = hso06GtHS(); if(!g.length) return bao('Chưa có hộ cho Mẫu 06/TD.'); ktDocx('m06', g.length===1 ? g[0] : g).then(function(bl){ giaoFile(bl, hso06TenHS()+'.docx'); }).catch(function(er){ baoLoi('Tạo Word Mẫu 06/TD lỗi: '+(er && er.message || er)); }); }
function hsoKem06(){ var B = hsoBo(), M = hsoMau(); return M.k==='01td' && !!(B && B.kem && B.kem.k06); }
function hsoLap09a(t){
  var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0] || null, han = m ? skHL(m) : '', tien = hsoSo(hsoChamGT('09a', 'tienGH', m ? m.dn : 0));
  var h = hsoBang('khung0', [74, 26], '<tr><td class="c">'+hsoQH('–', 13)+'</td><td><p class="b i s12">Mẫu số: 09A/TD</p><p class="i s12">Lập 01 liên lưu NH</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ GIA HẠN NỢ</p><p class="c tr"><b>Kính gửi:</b> '+coChuHTML(hsoPGD('kinhGui'))+'</p>'+
    '<p class="tr">Họ và tên khách hàng:'+hsoO(c && c.ten, 'sl', 50)+' Năm sinh:'+hsoO(c && c.ns ? c.ns.slice(0, 4) : '', 'sl', 22)+'</p>'+
    '<p>Nơi cư trú:'+hsoO(c || t ? hsoDiaChi(c, t) : '', 'sl', 95)+'</p>'+
    '<p class="j">Là tổ viên Tổ tiết kiệm và vay vốn do ông (bà):'+hsoO(T.tt, 'sl', 45)+' làm Tổ trưởng, thuộc tổ chức Hội, đoàn thể:'+hsoO(T.hoi, 'sl', 32)+' quản lý.</p>'+
    '<p>Hiện nay, tôi đang vay vốn Ngân hàng Chính sách xã hội, cụ thể như sau:</p>'+
    '<p>- Mã khoản vay'+hsoO(m && m.ku, 'sl', 40)+'thuộc chương trình cho vay'+hsoO(m ? hsoCTMon(m) : '', 'sl', 22)+'</p>'+
    '<p>- Số tiền: gốc:'+hsoO(m ? tdnTien(m.dn) : '', 'sl', 40)+'đồng; số tiền nợ lãi:'+hsoO(m && laiTon(m)>0 ? tdnTien(laiTon(m)) : '', 'sl', 26)+'đồng.</p>'+
    '<p class="j">Theo thỏa thuận đã ký với Ngân hàng, tôi phải trả số tiền trên vào ngày'+(han ? hsoO(ngayVNsl(han)) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+' nhưng chưa trả được vì lý do:'+hsoO(hsoChamGT('09a', 'lyDo', hsoLyDoDs()[0]), 'kb', 60)+'</p><p>'+hsoCham(120)+'</p>'+
    '<p class="j">Đề nghị Ngân hàng xem xét cho gia hạn khoản nợ gốc'+(tien ? hsoO(tdnTien(tien), 'kb') : hsoCham(36))+'đồng;</p>'+
    '<p class="j">Thời gian đề nghị:'+hsoO(hsoChamGT('09a', 'thang'), 'kb', 8)+'tháng; kế hoạch trả nợ'+hsoO(hsoChamGT('09a', 'kyTra'), 'kb', 10)+'tháng/kỳ với số tiền'+hsoO(hsoChamTien('09a', 'tienKy'), 'kb', 36)+'đồng/kỳ, số tiền trả nợ kỳ cuối'+hsoO(hsoChamTien('09a', 'tienCuoi'), 'kb', 32)+'đồng.</p>'+
    '<p class="j">Tôi xin cam kết sử dụng vốn vay đúng mục đích; trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai tôi xin chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">Tổ TK&amp;VV</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c i">'+hsoO(T.xa, 'sl', 18)+hsoChamNgay('09a', 'ngayKy')+'</p><p class="c b">Người vay</p><p class="c i s11">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'+
    hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">Ý kiến của tổ chức chính trị - xã hội nhận ủy thác cấp xã (phường)</p><p>'+hsoCham(60)+'</p><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(6)+' năm '+hsoCham(11)+'</p><p class="c b">Chủ tịch/Bí thư</p><p class="c i s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c b">Xác nhận của UBND cấp xã (phường)</p><p>'+hsoCham(60)+'</p><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(6)+' năm '+hsoCham(10)+'</p><p class="c b">Chủ tịch</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p class="c b">PHÊ DUYỆT CỦA NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p>- Số tiền được gia hạn nợ là '+hsoCham(36)+'đồng.</p><p>- Thời gian gia hạn nợ : Từ ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(9)+' đến ngày'+hsoCham(6)+'/'+hsoCham(5)+'/'+hsoCham(12)+'</p>'+
    hsoBang('khung0 hso-ky', [1, 1.2, 1], '<tr><td class="c"><p class="c b">CÁN BỘ TÍN DỤNG</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b s12">TRƯỞNG PHÒNG KH-NVTD</p><p class="c b">(TỔ TRƯỞNG KH-NV)</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c i">Ngày'+hsoCham(6)+'tháng'+hsoCham(5)+'năm '+hsoCham(10)+'</p><p class="c b">GIÁM ĐỐC</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'09A/TD', h:h};
}

function hsoKe(mm){ return '<p class="ke" data-ke="'+mm+'" style="width:'+mm+'mm"></p>'; }   /* 3.171 (anh chốt): đường kẻ ngang mảnh 0,5 pt dưới tiêu ngữ / tên cơ quan — không gạch chân chữ */
var HSO_LOGO_MD = {'01td':1, '01tgtv':1};   /* mẫu gốc có logo (PDF anh gửi) — anh đổi ở ⚙ Khai báo 1 lần */
/* 3.194 (anh gửi 14/10, đồng ý đưa vào repo — biểu trưng công khai của NHCSXH, không phải dữ liệu khách): logo cánh sen có sẵn trong app = logo mặc định;
   anh nạp logo khác ở ⚙ Khai báo 1 lần thì ưu tiên logo nạp. Dùng: logo góc các mẫu Hồ sơ vay · logo chìm 🧾 Bảng kê. */
var LOGO_NHCSXH = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAAFiCAMAAABBIaooAAAAYFBMVEXdEnvdEnvdEnvdEnvdEnvdEnvdEnvdEnsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACewFtZAAAAIHRSTlMA/NIsUa+ObwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALkIE7wAABHhSURBVHja7Z3ZsuOsDoVjEOj937h3OpMnbCQtMCRwcar+U7vt+EMzAm63Xob3tzGAOGMYQIEjTpMbQJE4B1AwzgEUNXh6jmFDoTgHUMQgNw2ghXD+AR1EbIHnEuc0xcEEiXMANeEM0zSAlsU5gKrHPs5p4oHGkBZth+MRNgFxDgk1pkUDaGmc00QDkSgtmqYBtFiWueuUBlAkzgEUjHMANSTtCaAjDEXiHEDBOAdQdQ0kNUbBHopzAAXjHCsgYJxDQpUlpQG0Es6h8gll1+IcKyBQ6RxA95P2aRpAr/btAygo0RwrIANoRdv5CCFpAMXgdBMCqBtAb2+Kj5icbUBHwf4jlA8HzZMN6Eg93zoezVH9kNCFyWQE0B8X0EWMxIC4/reBLkNON4BiI/iH+RtAYSn7g4UxUfrV+vKeHA6g4IISJPP8RaApK/kEOg2goHLngwUbgf4az7QPd4jM88fqy8drb4jM86eAni1l8gCKxPkCaovrf6e+fG4an3WiARSDE5V58sC5AmqL63+hHJobB0Eyz+8Hmh9WOkTm+e3FJhazMGae3w1Utn45UvmTIVXegMg8vxeo3BbGARSJc6TyYJyvNU/jIvI3AtVGkog1zy/MPPWBOSKV/7rM05DnQDLPLzvOwURjpPJQnCOV3+A0epOnOxmpPAjnC8UAisH5TnEGUAxOFNAvyDwxON8NCj9fbALhfCfhv10bMSbeu0Ad4imdDiDOdxJu3AISB04sUB44VygiZFr6Wyya0OOVMxqB0sC5ish/cNdXCZxvoL+3BYSmMuMVQAbIU758sUiAwiihYeB8R+QeUVPtKgz1BXG+UfwO0LI4UUC7CUN9KIvzHdfTT5zmUBwnCujkB86VbBkl1A+cKxS26l37YaiP01QX6HfH9bVwolL5xqMmnuqNV6JkA8oD51pZvxYou6o8X0sXNhfYbhhKdXHOZOsrgdbH+Y7rjRI6cK6XLmypfBg418pqA9pe1OSvwYnKPHngXMf19EU+qVLSXhJoU4lnnK4cAZHKtwTUun3NmgdAgLZTGrGelOS9NTiIiImNX4HzkTQ2AbQNJ4/pGLa2PyASpSacPKij3RuNxjvzdH37JNxJnUanBkmUwvfghAGljoEa6zqrEMUKFBHXX+uTYGfFe3sZE7PmealPYoiC/pcpyEnpiLj+Qp+Ew/knUpBjGBArSpflScjuIXaYUwMQcX3o0bWv7BS/Su0goCZBjx26dtqajsf/Z808AXH9FT7JaOlozxRDzqvrFCi4h4BnvpUxJ69YBL26T0K3ZPD8O6ypPNnD0NhTpBTTD8QABcT13E+kFI8mCHKiIqL1jnqJlOKxwAdEKg/Y9FUxTwqIT00akP+8rW25wR6FhC58UcJz8lqAzZmn3TJxB74oFYjw1iIYgUYz0DpRKBVZUODt2oW/Hqhv3BelZ5x3FoM8JvPklk1oqfVD3vtL0BGVsWETGgHfl2OUIbWR1/yFZk0oA/Qv78GYyxHIaqPKmlDT57FsopCXIxiAhlZ9UZQKfkAUm+zdJ9ymLwpyQ4K559AbDVU5E1pyTYbT/whzln90rWk82aVE6uiAQA3KFZsznudekg8+xV8MtIjG+7KlLz5igbkcQR+clAiaCpdm+ZCFFSgZfRJe49ksHtrnQxpxrEC5IePJxvlC1Eas13mCNd4iHtEs/7jbJnwjQZPBeAa7PYHURoLxygqkCaXy6S+fa5sRqNWEUgvGM9vucMZjbKm8tRiKM6HR6gbs8QMglSfr4ixK42mqoCM8lQbKZm2jq7WdgfFtMFY1Pj9GbYcxPr5OHYEzn6YHyvbcBBHV61UsgF/zOJY2ArQ1FncHBUIlWQsl58q7OrWYs7hM432tDI2z9U37kwjhE/gybacSL7Kk8oSIWYxBKLlapjuPp6VvhCAxdfSXaHsspAiGsgZhPo2v0HZ5O3/uq/S1EcaE1QaNV1ttxTtZ9myyCxbVUj1zJK8J01g4WWzUd4MJpdrazr7oy5RACeUdlHuT1NoeS09eUCVKBPtCnUuKU83pE4mbqs2BYBqockmVI17RpzmNhBJOZmLF0JOqGGtF3wjhbFrJ+AUUTbDmPaJJJ2ACGGo5I3UBhlVOQQKUkF6C6jgjffIg1wdpKk9Iu+aqiKeh3srKl+X/UoKWfGQxU6hrPJX2WpbKE9RTiDSRKhtP5VfJaiOEFZ5YPFYy1VpZ/8ZMoAQ2br50rGRarLJoHRt/HpcVUOV82donTKkf23gq+8mpgqhUL13nZ56ElqBQUjytS9PqXq9soASfzbxP1gn/dQupucWmo6/XaXwoJ57m858MnV6ZqTzhv5pKKZ69EcV89tQpUMLPZyglnvZGKdMGjqzaCBV4P5XRO0QjHwCos3y7Ko8PRcQT0wltPw/xGAmV8MNUQjxBm50KA6USrw8lnolq1KeiQE9tnaoK5AtVea4HelYbOf+ZGgse4U9Ebm20A2UDT412HvoOclc5I0BYf7YFhMq8ncEuDrzz1g406nmCBVTzOPjhGrEUUCo0m9C6aoGjICxAH93DQV8NCkiJCmj3pgtDTUDTqVYWTwIqPF3tjBCZZxponiYBZSpe7oyK1kbyeOKESuGNSp16bzqLIdXmQMXMN6FmpthJZCVSeSr26giamIJHDxZI5cstR+4rvGtHPIuk8lRONxii7mUPF7aclre7pybbdzKERGxKPG+IO+BYx1MhoB7wkOJnXzO22JQ//RHgkeT2qvxh96bayCbVooLRRbDPSY3bLewHuEbV/Ee7h3cIn9ZWbWSVPwp4ejMNsTetcyEYojbiFPbJrK3cpHhCU3kJT7E3WSt8MBuMdoE6hQQEm3cWG4x619V5BwIq4kk2fZWqu+vkcrXHeSMP7ZVZKGcyoKFJb4StjchEgC0GUCwCdS+dxwClslpBFmtR+fZUQJuDk5qoYBCxaDIWnQAtcsDWPpPQtLqD+kaorBucGVByBttbacTqlzsHtQHl1tUdUxsprBLckbpjaiNlFT6oY1e6hOctVAYalFbQSx3mNTgBqXxZhSdl9BlvHQJ1cqBeOWXchfnEtDnUMKCh/WgJAZSKG1CrH+sLKBU3oN5kJq4ZVPF2A+m7yDAL/QFVRHlOI2mxH/NpSuUVPIMm8AmdREtWoFT8TUEj1HQ5z1usxZMUqiv0mJeruxqogqc0mvBy9x5a4KkCqlGsIH8F9WY+tZknlZ83lttcvvUKlMq7vnhDnOrcCVDNL/eleTbhjuwLuoVeEsTz7G63XoGqNEtMRz4DvQJV8YyFecaGeApTeRVPoUPy0nCJb90CVfGkwjypKZ5esgWkBk/qm6dIH1U/3UvxiA1EYyM2xZOFPF1zPPN3LOhUy/0Yz3yggyc286zDM3bPMxdoizxDizwzgdbgGaU8b02OrCRv8MQCHfqOBTr8ETaVHzyxmXYNnvQ9PE8j6ZG/Y4E2yZNu3QId9U9ssakST6kD6xZonfWOntePZMWmCutxU9frm8JUvsn1YnfrFmidfgZpC5lvHqgD8lQ0yylayPoEWqkfTHPxepdAK/R/slykg28fKKF4alqkpLs36dYBUHcJT6fo9+5B4feNWPn9HU5RkWo+An0IFkN4Bg0aaaOv7wHoTthCxc1n1KRUfSj8zmeV3w/Lmpi16ZrykbIW36/9fEPjh63BgMrPE5g07khx9mcnPFepPNlNcJ6nFm82o16AOsuvVp+JKt6vG249AqXC4vk536bNs73RQAufXzfz02Kevbj4hawUPl9xprWI+xXaB1r4PNUZE/lVLo77AarjabkeRnEIj6NugLKGpzfZQMX2/P6ASn6wt5nAi6/VrpPKS+7vUAAhk3T3ZUOjkKfmolyj9e0LaBDpk+Yiq7jvBGVAY09As3mqTiAz3t/R0ercszaSLZ+qa9bWGY72EDPXD1AqZjt3Ehw/aYFyJ0R91u/0qMPc9EfpdqPzZdKiBAPD9aEd+flzK6tDwKerA7Lpoa/AqT5adM+LWO63/Yuc+ld6w91/MRGi/TJRwxU2+0EOT9PvEvWW+1ZiMoewEu3UjnrLVcnJzIsm+wjcoZCSTZLCQZJrH643pGz87HQiyxNm/CGl39D049VzHybYcCGS963DRHzwgegYLCjtOEjnQohMTXL1FINDCE4skL7+nyV/YNZ38lt+j+e1F/QHnj7DP8ZJjSPxF7Onv8fzuczxj6SD6eGhZdNfN/K42DYVxW0j3s9fPqvSd0PmJvf438k9Bfy/2TiQr/u/+LPWXmC43IQcsUT1b2aVaVeLdnjmt/XulATX4ff6T7DMLPXfYH7wbqph4bk1FztOeal3R37SOSDt09Ia5PoWiqdWJkh4roDG08Ws9Ef8F2TPEcM0o/bLEENy2mwt47l4ejivH7hTgfIQojlhtlLj3eGsWHnOHhAz/sZlKKiPZpxZ67tajfdHgQJbeb416yAEyenAZOtKpnwxkhGmOYB5voUv5shLHk/Ttd2CjpMIsM2s5hn+4u3HWHjiuBVP9/+P9gTmQIZjZI8Bmt3Noczj6UDhN+92KZ4LJZqVK9x6nsIziqe4fY3LXe/i4tquT5OOPLyA5yoNckv7HBaBz3rNPGyf7u6p5iPf5HfK/okF1BURUX8h2XtOGCGfcztAi3+3WFyJ65/gUuW0t+q9rJNW44WL5Gz2SP64SJgpn7Pn0Pa/tvpEJzxnQG2pqbQVLpg9UsDwvO3yXElxWE1pmueHPVssqLgpRuWTKCniBp5u/nDaLwhwPs/33z6nhAr7IgvQmHRqzs7TL76etvb+Xt3L4Old0jYU8UUWoMmyRVKL8+2nX/zXSkJouQpwxPNtHKKWp7KPWBE1xZRHSlI65ckLLj7PgrkjxxGXpOU7Y7T7VxVAKeWRvJLn2n24ozJzHs/lDMk9r75BUw40pDySkufb6Lz0O2Yt9R/qO9vk09LvKo92U9tw8nn6z5itR/H+L3L7y0sSnqG4a7dIaEh4JMrlefLYrZfcQ3rIM1p4WruxfbAIKIrnTCjopDSfz1Pj3+37L3yACKiJp/Pnq0c+m2dIxv5lAs/N2qw+i/cuUQAlCU9HGSZo4e6PeL4s8POpvjLOm+lK3ojguSrmpGz6/npcSIlnEPcYwXayyGoGcU+vTTxX6pwyQcFnxJ+8krVYH6c0buK08VfyXIlZqsswnvN8/cuXyOcHMNB9ViKvNNf410xYea6AJpbPaUff/Z4veFuQbNVD7w6QLK6GrYDm8wzvseyM4YzmzZ36/GPV7vm8zQJStnjit1KT7m7b5y8OuTzfwu39zdMM2jb022nny4mB3Gc5LlftimwBFOj8/Nt5jwaL60v7vVdrKXWnPHlW18sNBQvtohY0m4fNNJCS58wQJBqNF7/Kn/GM8si63Maq/Ng+rg1F0PJ8m7iklMznmc54zhorw3W6LndLvJYwSqUIJzzXK8bHtp1P7WeUKVvpc3wUv+MhCI4SKc4ZT16ucN5b4CnJPJ7yfJxqntuuWGETZeZ2spl6+pXiLM3GGU/6yB4/Y6jtIls+zylwzPWslbb25xGdRdL8LqjfR9zrbcqQT/YxaUrdwmkt4s/PCLItMvXO8shT+phXUjnut1ksrsekUUvy/JvV+6YafxNXk+qekpCztyxmxa5nPGf+iFPpik/yjLd0F1AbwimQ0ZgTnOTGS/fb2VIRNiXtp47nNZv5z2U0ZqxE5cbzi9vuYuKP+KS/rmGaD8/kzEAP9X0WCoT0Agql4/mQ7Etpj2ayzrObeaZUfsXzvnPz3j3z2GvplhkC7cbZn3Deeat8Xn/IhKfD4Dj4k2x1Va977uBMJAhuK0bzx4abzX42ctzZIdKw15ktric//4wXkWVY7xU+66f1mYW8ppHOVHOviJrJ02cUgMNNz7O902T8ny11J8WRncQ5j2fWbQ6k5OmaPZrH058PcUe55yYkYNl6XMwIJkQ873vsb02P+zrF6gyEeRBCe631Mbu4Es4NdS7P9HkF7TG9Rzz8dBduZew/ttbtNSJal98P4k83F0umLo80e8WS81jkbhfug87VeGPb9uOuxP73Nc97TNDoGTHg3HVnxLgvQ9uC4bLi5Eou9H7lmB/3s3Uoz9X7e8WTB6tsK/LfZPC+7uacN4Qf/wBgi/+xIbIEJgAAAABJRU5ErkJggg==', LOGO_NHCSXH_TY = 1.0567;
function hsoLogoSrc(){ return hsoKB().logo || LOGO_NHCSXH; }
function hsoLogoTai(){ var a = document.createElement('a'); a.href = hsoLogoSrc(); a.download = hsoKB().logo ? 'Logo.png' : 'Logo_NHCSXH.png'; document.body.appendChild(a); a.click(); a.remove(); }
function hsoLogoCo(k){ var kb = hsoKB(), m = kb.logoMau || HSO_LOGO_MD; return !!m[k]; }
function hsoLogo(k, mm){ var kb = hsoKB(); if(!hsoLogoCo(k)) return ''; mm = mm || 20;
  return '<img class="hso-logo" src="'+hsoLogoSrc()+'" data-mm="'+mm+'" data-ty="'+(kb.logo ? (kb.logoTy||1) : LOGO_NHCSXH_TY)+'" style="width:'+mm+'mm" alt="">'; }
function hsoLogoNap(inp){   /* nạp logo 1 lần: thu nhỏ ≤ 360 px, lưu cùng cài đặt (đồng bộ Drive) — không đưa vào repo */
  var f = inp.files && inp.files[0]; if(!f) return;
  var r = new FileReader();
  r.onload = function(){ var im = new Image(); im.onload = function(){ var k = Math.min(1, 360/Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width*k); c.height = Math.round(im.height*k); var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      var kb = hsoKB(); kb.logo = c.toDataURL('image/png'); kb.logoTy = +(c.height/c.width).toFixed(4); if(!kb.logoMau) kb.logoMau = Object.assign({}, HSO_LOGO_MD); luu();
      bao('Đã nạp logo — in ở các mẫu đã tích.', 4); hsoKBHop(); };
    im.src = r.result; };
  r.readAsDataURL(f);
}
/* ---------- 3.171 (anh chốt 11/10): BỘ HỒ SƠ VAY — lưu tạm (D.cauHinh.hsoBo, đồng bộ Drive), in thành bộ gửi tổ đi ký ---------- */
var HSO_CT = {HSSV:'Học sinh sinh viên', NSVSMT:'Cấp nước sạch và vệ sinh môi trường nông thôn'};   /* chữ in trên đơn — đúng PDF */
var HSO_TT = [['soan','Đang soạn'], ['gui','Đã in, gửi tổ'], ['nop','Tổ đã nộp lại'], ['gn','Đã giải ngân']];
function hsoBoDs(){ var c = D.cauHinh; if(!Array.isArray(c.hsoBo)) c.hsoBo = []; return c.hsoBo; }
function hsoBo(){ var id = hsoCH().boId; return hsoBoDs().find(function(b){ return b.id===id; }) || null; }
function hsoBoMoi(){
  var b = {id:'bo'+Date.now().toString(36), ct:'HSSV', tt:'soan', tao:new Date().toISOString(), moi:false, kh:'', to:'', toi:{}, nv:{danToc:'Kinh'}, ho:[], soNguoi:'', pa:{loai:'moi', nuoc:true, vs:false, tienN:'25000000', tienV:'25000000'}, tien:'', tuCo:'', dtth:'', chon:{uq:1, td:1, bb:1, ds:1, tgtv:0}};
  hsoBoDs().unshift(b); hsoCH().boId = b.id; luu(); return b;
}
function hsoBoLuu(){ var b = hsoBo(); if(b){ b.sua = new Date().toISOString(); luu(); } }
function hsoCCCDDoc(so){   /* số CCCD 12 số → giới tính + năm sinh (chữ số 4: 0/1 thế kỷ 20, 2/3 thế kỷ 21; chẵn nam, lẻ nữ; 2 số tiếp = năm) */
  so = String(so||'').replace(/\D/g, ''); if(so.length!==12) return null;
  var g = +so[3]; if(g>3) return null; return {gt:g%2 ? 'Nữ' : 'Nam', nam:(g<2 ? 1900 : 2000)+(+so.slice(4, 6))};
}
function hsoNoiCapGY(ncap){ return !ncap ? '' : ncap>='2024-07-01' ? 'Bộ Công an' : 'Cục CS QLHC'; }   /* gợi ý theo ngày cấp — anh sửa được */
function hsoNgayVN(iso){ return iso ? ngayVNsl(iso) : ''; }
function hsoNgayTu(v){ var d = hsDoc(v); return d ? ngayISO(d) : ''; }
function hsoBoNV(B){ return (B && B.nv) || {}; }
function hsoBoT(B){ var t = B && B.to && KHO.to(B.to); return t ? hsoTo(t) : ((B && B.toi) || {tinh:hsoPGD('tinh')}); }
/* phương án theo thẻ chương trình (3.208, anh chốt 14/10): HSSV số tháng + số tiền gõ tay (không tự tính); công trình: mỗi công trình 1 dòng, mức vay theo thẻ;
   thời hạn / kỳ hạn: bộ gõ thì in số gõ, không gõ → thẻ "🖨 Ghi sẵn" in số thẻ, "✍ Chấm" để chấm */
function hsoPaK(i){ return i===0 ? ['nuoc', 'tienN'] : i===1 ? ['vs', 'tienV'] : ['c'+i, 't'+i]; }   /* khóa lưu công trình thứ i (giữ khóa cũ nuoc / vs của bộ đã lập) */
function hsoGT(v, md){ return v!=null && String(v).trim()!=='' ? String(v).trim() : (md || ''); }
function hsoLoaiChu(C, v){ var ds = (C && C.loaiDs && C.loaiDs.length) ? C.loaiDs : ['Xây mới', 'Sửa chữa']; return v==='sua' ? 'Sửa chữa' : v==='moi' || !v ? ds[0] : String(v); }   /* 3.242: lựa chọn khai ở thẻ (Xây mới · Sửa chữa · Cải tạo…); mã cũ moi / sua vẫn đọc */
function hsoTuCo(B){ var C = B && hsoCTV(B.ct); return B ? hsoSo(hsoGT(B.tuCo, C && C.tuCo)) : 0; }   /* 3.242: trống → mặc định thẻ (NSVSMT 5 triệu) */
function hsoPA(B){
  var r = {dong:[], tien:0, md:'', mdDs:'', th:'', ky:'', canh:[], C:null};
  if(!B) return r;
  var C = r.C = hsoCTV(B.ct) || hsoCTV('HSSV'), P = B.pa || {};
  r.th = hsoGT(B.th, C.thIn==='in' ? C.th : ''); r.ky = hsoGT(B.ky, C.kyIn==='in' ? C.ky : '');
  if(C.kieu==='hssv'){ r.tien = hsoSo(B.tien); r.md = P.md || C.md[0] || 'Chi phí học tập, sinh hoạt';
    r.mdDs = r.md+' cho sinh viên'+(P.sv ? ' '+P.sv : '');
    r.dong = [[r.md+' cho sinh viên'+(P.sv ? ': '+P.sv : ''), hsoGT(P.soThang) ? hsoGT(P.soThang)+' tháng' : '', r.tien]]; }
  else if(C.kieu==='congtrinh'){ var ct = [];
    C.ctr.forEach(function(c, i){ var k = hsoPaK(i); if(!P[k[0]]) return; var tien = hsoSo(P[k[1]]) || hsoSo(c.tien); ct.push([c.ten, tien]);   /* 3.242 (anh 17/10): chưa gõ → mức mặc định công trình theo thẻ chương trình (25 triệu) */ if(hsoSo(c.tien) && tien>hsoSo(c.tien)) r.canh.push(c.ten+' vượt '+tdnTien(hsoSo(c.tien))+' / công trình'); });
    ct.forEach(function(x){ r.tien += x[1]; r.dong.push([x[0], '01 công trình', x[1]]); });
    var ghep = (C.loai ? hsoLoaiChu(C, P.loai)+' ' : '')+ct.map(function(x){ return x[0].toLowerCase(); }).join(', ');
    r.md = P.md || ghep.charAt(0).toUpperCase()+ghep.slice(1); r.mdDs = r.md; }
  else if(C.kieu==='gqvl'){ var dg = (P.dong||[]).filter(function(x){ return x.md || hsoSo(x.tien); });   /* 3.211: bảng mục đích nhiều dòng */
    r.dong = dg.map(function(x){ return [x.md||'', hsoGQSL(x), hsoSo(x.tien)]; }); r.tien = r.dong.reduce(function(a, x){ return a+x[2]; }, 0) || hsoSo(B.tien);
    r.md = P.ten || (dg[0]||{}).md || ''; r.mdDs = dg.map(function(x){ return x.md; }).filter(Boolean).join(', ') || r.md; }
  else { r.tien = hsoSo(B.tien); r.md = P.md || C.md[0] || ''; r.mdDs = r.md; r.dong = [[hsoGT(P.dt, r.md), hsoGT(P.sl), r.tien]]; }
  return r;
}
function hsoDongTien(v){ return v ? tdnTien(v)+' đồng' : ''; }
/* ---------- 01/TD Giấy đề nghị vay vốn — đúng PDF (HSSV có xác nhận UBND xã; NSVSMT không) ---------- */
function hsoBoHoiTen(T){ return T.hoi || ''; }
function hsoHoiNgan(h){   /* 3.247 (anh 18/10): tên tổ chức in trên đơn — "Hội Nông dân" · "Hội Cựu chiến binh" · "Hội Liên hiệp phụ nữ" · "Đoàn thanh niên" (không ghi xã / phường) */
  var s = String(h||'').trim(); if(!s) return '';
  if(/nông\s*dân/i.test(s)) return 'Hội Nông dân'; if(/cựu\s*chiến\s*binh/i.test(s)) return 'Hội Cựu chiến binh'; if(/phụ\s*nữ/i.test(s)) return 'Hội Liên hiệp phụ nữ'; if(/đoàn|thanh\s*niên/i.test(s)) return 'Đoàn thanh niên';
  return s.replace(/\s+(xã|phường|thị trấn)\s.*$/i, ''); }
/* ---------- 03/TD Danh sách tổ viên đề nghị vay vốn — đúng PDF (A4 ngang, số dòng = số người + 2 dòng trống, kẻ chấm) ---------- */
/* ---------- 04/TD Thông báo kết quả phê duyệt — đúng PDF; in từng thông báo (chọn điểm GD, nhập số hộ + số tiền) ---------- */
/* ---------- 09A/TD Giấy đề nghị gia hạn nợ — đúng PDF ---------- */
/* ---------- 01/UQ Giấy ủy quyền — đúng PDF (thành viên hộ + người thừa kế chỉ ở mẫu này) ---------- */
function hsoLap01uq(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), ho = (B && B.ho) || [], dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null).replace(/, tỉnh .*$/, '') : '';
  var tv = B ? [{ten:N.ten, ns:N.ns, cccd:N.cccd, noi:dc}].concat(ho.map(function(x){ return {ten:x.ten, ns:x.ns, cccd:x.cccd, noi:x.noi || dc, qh:x.qh}; })) : [];
  var sup = function(n){ return '<sup>('+n+')</sup>'; }, n = Math.max(5, tv.length), r = '<thead><tr><td class="c b">TT</td><td class="c b">Họ và tên</td><td class="c b">Ngày, tháng, năm sinh</td><td class="c b">Số Thẻ căn cước/CCCD</td><td class="c b">Nơi cư trú</td></tr></thead><tbody>';
  for(var i=0;i<n;i++){ var x = tv[i]; r += '<tr><td class="c">'+(i+1)+'</td><td>'+(x ? hsoO(x.ten, i ? 'kb' : 'sl') : '')+'</td><td class="c">'+(x && x.ns ? hsoO(hsoNgayVN(x.ns), i ? 'kb' : 'sl') : '')+'</td><td class="c">'+(x && x.cccd ? hsoO(x.cccd, i ? 'kb' : 'sl') : '')+'</td><td>'+(x && x.noi ? hsoO(x.noi, 'sl') : '')+'</td></tr>'; }
  r += '</tbody>';
  var uq = '<tr><td class="c b">TT</td><td class="c b">Họ và tên</td><td class="c b">Quan hệ với Bên được ủy quyền</td><td class="c b">Ký tên</td></tr>';
  for(var j=0;j<Math.max(5, ho.length);j++){ var y = ho[j]; uq += '<tr><td class="c">'+(j+1)+'</td><td>'+(y ? hsoO(y.ten, 'kb') : hsoCham(26))+'</td><td>'+(y ? hsoO(y.qh, 'kb', 14) : hsoCham(14))+'</td><td>'+hsoCham(16)+'</td></tr>'; }
  uq += '<tr><td class="c">…</td><td>'+hsoCham(26)+'</td><td>'+hsoCham(14)+'</td><td>'+hsoCham(16)+'</td></tr>';
  var sn = B && B.soNguoi ? String(B.soNguoi) : '', tThon = hsoChamIn('01uq', 'truongThon') && B ? hsoBoT(B).truongAp || '' : '';   /* 3.215: tên trưởng thôn theo ⚙ Khai báo chung */
  var h = '<p class="r i s12">Mẫu số 01/UQ</p><p class="r i s12">Lập 02 bản:</p><p class="r i s12">01 bản lưu NH</p><p class="r i s12">01 bản lưu hộ gia đình</p>'+hsoQH('-', 14)+
    '<p class="c b s14 tr sau">GIẤY ỦY QUYỀN</p>'+
    '<p class="j thut tr">Căn cứ Bộ Luật dân sự số 91/2015/QH13 và các văn bản pháp lý có liên quan,</p>'+
    '<p class="j thut"><b>I.</b> '+(function(){ var g = hsoChamIn('01uq', 'ngayLap') ? hsoNg(hsoChamGT('01uq', 'ngayLap', '')) : null; return g ? 'Ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : 'Ngày … tháng … năm …….'; })()+', hộ gia đình chúng tôi gồm '+hsoO(sn, 'kb', 6)+' người'+sup(1)+', trong đó các thành viên từ đủ 18 tuổi trở lên, có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật gồm:</p>'+
    hsoBang('luoi', [6, 26, 16, 19, 33], r)+
    '<p class="j thut tr"><b>II.</b> Các thành viên trong hộ gia đình có tên tại mục I của Giấy ủy quyền này (gọi là Bên ủy quyền) thỏa thuận cử ông (bà): '+hsoO(N.ten, 'sl', 25)+' STT'+sup(2)+': '+(N.ten ? hsoO('01', 'sl') : hsoCham(4))+', sinh ngày: '+hsoO(hsoNgayVN(N.ns), 'sl', 12)+
      ', số Thẻ căn cước/CCCD: '+hsoO(N.cccd, 'sl', 14)+', ngày cấp: '+hsoO(hsoNgayVN(N.ncap), 'sl', 12)+', nơi cấp: '+hsoO(N.noiCap, 'sl', 14)+' (gọi là Bên được ủy quyền) đại diện theo ủy quyền cho chúng tôi thực hiện đứng tên người vay và thực hiện các giao dịch với Ngân hàng Chính sách xã hội theo quy định trước sự chứng kiến của Trưởng thôn.</p>'+
    '<p class="thut b">III. Cam kết</p>'+
    '<p class="j thut">1. Các thành viên trong hộ gia đình có tên tại mục I cam kết chịu trách nhiệm đối với toàn bộ các khoản vay tại Ngân hàng Chính sách xã hội.</p>'+
    '<p class="j thut">2. Giấy ủy quyền này có hiệu lực kể từ ngày ký và hết hiệu lực khi quyền và nghĩa vụ giữa chúng tôi với Ngân hàng Chính sách xã hội kết thúc theo quy định.</p>'+
    '<p class="j thut">3. Khi thay đổi người đại diện theo ủy quyền thì phải làm Giấy sửa đổi ủy quyền và được sự chấp thuận của Ngân hàng Chính sách xã hội nơi cho vay.</p>'+
    '<p class="j thut">4. Chúng tôi công nhận đã hiểu rõ mọi quyền, nghĩa vụ và lợi ích hợp pháp của mình; hậu quả pháp lý của việc ủy quyền. Chúng tôi chịu trách nhiệm trước pháp luật về mọi cam kết do bên được ủy quyền nhân danh chúng tôi thực hiện trong phạm vi ủy quyền nêu trên.</p>'+
    '<p class="j thut"><b>IV.</b> Giấy ủy quyền này được lập 02 bản có giá trị pháp lý như nhau: 01 bản gửi NHCSXH nơi cho vay, 01 bản lưu hộ gia đình./.</p>'+
    hsoBang('khung0 hso-ky', [64, 36], '<tr><td class="c"><p class="c b">BÊN ỦY QUYỀN'+sup(3)+'</p>'+hsoBang('khung0', [8, 40, 26, 26], uq)+'</td>'+
      '<td class="c"><p class="c b">BÊN ĐƯỢC ỦY QUYỀN'+sup(4)+'</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td></tr>')+
    '<p>&nbsp;</p>'+hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">CHỨNG KIẾN CỦA</p><p class="c b">TRƯỞNG THÔN</p><p class="c i s11">(Ký, ghi rõ họ tên)</p>'+(tThon ? '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+hsoO(tThon, 'kb')+'</p>' : '')+'</td><td class="c"><p class="c b">XÁC NHẬN CỦA</p><p class="c b">UBND CẤP XÃ</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>')+
    (tThon ? '<p>&nbsp;</p>' : '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>')+'<p class="ke trai" data-ke="55" style="width:55mm;margin-left:0"></p>'+
    '<p class="i s9"><sup>(1)</sup> Điền tổng số thành viên trong hộ gia đình, gồm cả người chưa thành niên và thành niên.</p><p class="i s9"><sup>(2)</sup> Số thứ tự của người được ủy quyền đã được ghi tại mục I của Giấy ủy quyền.</p>'+
    '<p class="i s9"><sup>(3)</sup> Là các thành viên ghi tại mục I, trừ thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p><p class="i s9"><sup>(4)</sup> Là thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p>';
  return {ma:'01/UQ', h:h};
}
/* ---------- 01/TGTV Giấy đăng ký mở tài khoản tổ viên (mẫu 03/2026) — đúng PDF, có logo + chân trang ---------- */
function hsoLap01tgtv(t, P){   /* P = {ten, ns, gt, cccd, ncap, noiCap, sdt, danToc, ap, tenXa, kh} hoặc null (mẫu trắng) */
  P = P || {}; var Q = function(k){ return hsoChamIn('01tgtv', k) && !!P.ten; }, o = function(x){ return x ? '☒' : '☐'; }, so = String(P.cccd||'').replace(/\D/g, ''), han = P.cccd ? toCCCDHan(P.cccd, P.ns, P.ncap) : null, hh = han && han.den ? han.den : '';
  var nd = hsoNg(P.ns), cap = hsoNg(P.ncap), hn = hsoNg(hh), ngay = function(n, a, b, c){ return n ? hsoO(n.d+'/'+n.m+'/'+n.y, 'sl') : hsoCham(a)+' /'+hsoCham(b)+'/'+hsoCham(c); };
  var oSo = '<table class="luoi" data-w="'+Array(13).join('1,').slice(0, -1)+'" style="width:96mm"><tr>'+Array.apply(null, Array(12)).map(function(_, i){ return '<td class="c">'+(so[i] ? hsoO(so[i]) : '&nbsp;')+'</td>'; }).join('')+'</tr></table>';
  var dong = function(h){ return '<p class="tr2">'+h+'</p>'; };
  var A = '<p class="i">Quý khách điền đầy đủ nội dung tại các trường thông tin có dấu (*)</p>'+
    hsoBang('khung0', [36, 64], '<tr><td><p class="b">Họ, chữ đệm, tên khai sinh*:</p></td><td><table class="luoi" data-w="1"><tr><td>'+(P.ten ? hsoO(P.ten.toUpperCase()) : '&nbsp;')+'</td></tr></table></td></tr>')+
    dong('<b>Ngày, tháng, năm sinh*:</b> '+ngay(nd, 10, 10, 10)+'          <b>Giới tính*:</b> '+o(P.gt==='Nam')+'Nam  '+o(P.gt==='Nữ')+'Nữ')+
    dong('<b>Quốc tịch*:</b> '+o(Q('quocTich'))+' Việt Nam   ☐ Khác (ghi rõ)'+hsoCham(18)+'   <b>Dân tộc*:</b> '+hsoO(Q('danToc') ? P.danToc : '', 'sl', 35))+
    dong('<b>Tình trạng cư trú*:</b> '+o(Q('cuTru'))+' Có cư trú   ☐ Không cư trú')+
    dong('<b>Thông tin giấy tờ tùy thân*:</b> '+o(so.length===12)+'Thẻ CC công dân/Thẻ CC     ☐CC điện tử')+
    hsoBang('khung0', [8, 92], '<tr><td><p>Số:</p></td><td>'+oSo+'</td></tr>')+
    dong('Ngày cấp: '+ngay(cap, 9, 9, 9)+'   Ngày hết hạn: '+ngay(Q('hanCCCD') ? hn : null, 9, 9, 9)+'   Nơi cấp: '+hsoO(P.noiCap, 'sl', 30))+
    dong('<b>Mã số thuế cá nhân (nếu có):</b> '+hsoCham(60))+dong('<b>Nghề nghiệp hiện tại</b>*:')+
    hsoBang('khung0 s12', [26, 24, 18, 32], '<tr><td>☐ Nhân viên văn phòng<br>☐ Lực lượng vũ trang<br>☐ Nông dân</td><td>☐ Công chức, viên chức<br>☐ Đã nghỉ hưu<br>☐ Công nhân</td><td>☐ Nội trợ<br>☐ Tự kinh doanh<br>☐ Lao động tự do</td><td>☐ Học sinh, sinh viên<br>☐ Giáo viên, giảng viên<br>☐ Khác (ghi rõ): '+hsoCham(18)+'</td></tr>')+
    '<p><b>Chức vụ*:</b> '+hsoCham(120)+'</p>'+
    dong('<b>Nơi thường trú :</b>')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoO(Q('thuongTru') ? P.ap : '', 'sl', 22)+' ')+dong('Phường/Xã/Đặc khu: '+hsoO(Q('thuongTru') && P.tenXa ? hsoXaTen(P.tenXa) : '', 'sl', 25)+'   Tỉnh/Thành phố: '+hsoO(Q('thuongTru') ? hsoPGD('tinh') : '', 'sl', 35))+
    dong('<b>Nơi ở hiện tại khác (nếu có):</b>')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoCham(22))+dong('Phường/Xã/Đặc khu: '+hsoCham(25)+'Tỉnh/Thành phố: '+hsoCham(35))+
    dong('<b>Nơi làm việc</b>: '+hsoCham(55)+'Điện thoại nơi làm việc: '+hsoCham(40))+dong('<b>Địa chỉ nơi làm việc</b>:')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoCham(22))+dong('Phường/Xã/Đặc khu: '+hsoCham(25)+'Tỉnh/Thành phố: '+hsoCham(35))+
    dong('<b>Điện thoại liên hệ*:</b> '+hsoO(Q('sdt') ? P.sdt : '', 'sl', 28)+'   <b>Thư điện tử (Email):</b> '+hsoCham(45))+
    '<p class="i j tr">Điện thoại và Email liên hệ là số điện thoại và thư điện tử chính chủ của khách hàng. Đây là một trong số các phương thức liên hệ để NHCSXH thông báo cho Quý khách thông tin cần thiết trong quá trình đăng ký và sử dụng dịch vụ. Quý khách lưu ý thông báo ngay cho NHCSXH khi có bất kỳ sự thay đổi nào về số điện thoại, email liên hệ. NHCSXH cung cấp dịch vụ ngân hàng và thông báo các thông tin cần thiết trong quá trình sử dụng dịch vụ qua số điện thoại và email liên hệ cập nhật của Quý khách chỉ khi nhận được thông báo của Quý khách về việc thay đổi thông tin nêu trên.</p>'+
    '<p class="i j">Quý khách sử dụng thông tin điện thoại và email liên hệ là số điện thoại và email đăng ký tài khoản định danh điện tử của Quý khách trên ứng dụng VNeID, trang thông tin điện tử “dinhdanhdientu.gov.vn” và “vneid.gov.vn”.</p>'+
    dong('<b>Thu nhập bình quân hàng tháng trong 06 tháng gần nhất (đơn vị: triệu VND)</b>')+
    hsoBang('khung0', [1, 1, 1, 1.6], '<tr><td>☐ Dưới 10</td><td>☐ Từ 10-50</td><td>☐ Trên 50</td><td>☐ Khác (ghi rõ): '+hsoCham(22)+'</td></tr>')+
    dong('<b>Nguồn gốc thu nhập trong 06 tháng gần nhất/tiền gửi của Quý khách tại NHCSXH</b>')+
    hsoBang('khung0', [1, 0.8, 1.4, 1.6], '<tr><td>☐ Thừa kế tài sản<br>☐ Cho thuê tài sản</td><td>☐ Lương<br>☐ Trợ cấp</td><td>☐ Lợi nhuận đầu tư, lãi tiền gửi<br>☐ Khác( ghi rõ): '+hsoCham(10)+'</td><td>☐ Lợi nhuận sản xuất, kinh doanh<br>'+hsoCham(30)+'</td></tr>')+
    dong('<b>Tình trạng hôn nhân:</b> ☐ Độc thân      ☐ Đã kết hôn      ☐ Khác( ghi rõ): '+hsoCham(35))+
    hsoBang('luoi', [1, 1], '<tr><td class="c b" colspan="2">ĐĂNG KÝ CHỮ KÝ MẪU</td></tr><tr>'+['Chữ ký mẫu', 'Xác nhận chữ ký mẫu'].map(function(x){ return '<td class="c tg-ck"><p class="c b">'+x+'</p><div class="tg-ckk"><p class="c i s10">(Ký và ghi rõ họ tên)</p></div></td>'; }).join('')+'</tr>'+
      '<tr><td colspan="2"><p class="i j s12"><b>Đăng ký chữ ký mẫu:</b> Chữ ký mẫu đăng ký tại mục này áp dụng cho tất cả các giao dịch qua tài khoản Tổ viên, trên chứng từ giao dịch giấy tại NHCSXH theo quy định pháp luật. Quý khách lưu ý viết đầy đủ họ tên; không viết họ tên và ký bằng chữ in hoa; 02 chữ ký mẫu phải giống nhau và giống chữ ký tại mục Cam kết của khách hàng. Trường hợp khách hàng thay đổi mẫu chữ ký, yêu cầu khách hàng thực hiện thay đổi thông tin mẫu chữ ký theo quy định. Trường hợp Quý khách đã đăng ký mẫu chữ ký tại NHCSXH cho các giao dịch trước thời điểm Giấy đề nghị này có hiệu lực, tiếp tục sử dụng chữ ký đó cho các thỏa thuận đăng ký trước.</p></td></tr>');
  var Bd = '<p class="j">☐ Tôi đề nghị NHCSXH cung cấp dịch vụ tài khoản Tổ viên theo các thông tin đã đăng ký tại mục “A-Phần dành cho Khách hàng đăng ký thông tin cá nhân” nêu trên để thực hiện các nghiệp vụ tại trụ sở NHCSXH nơi mở tài khoản hoặc tại điểm giao dịch của NHCSXH<sup>1</sup> như sau:</p>'+
    ['1. Nộp tiền mặt vào tài khoản Tổ viên;', '2. Nộp tiền mặt vào tài khoản Tổ viên thông qua Ban quản lý Tổ Tiết kiệm và vay vốn;', '3. Nhận chuyển khoản đến tài khoản Tổ viên;', '4. Đề nghị NHCSXH trích Nợ từ tài khoản để thu nợ vay tại NHCSXH;',
      '5. NHCSXH được chủ động trích Nợ từ tài khoản Tổ viên để thu: tiền lãi, nợ gốc đến hạn, nợ gốc quá hạn của khoản vay; tiền lãi, nợ gốc của khoản vay trước khi xử lý rủi ro; chi phí phát sinh trong quá trình quản lý tài khoản Tổ viên;', '6. Rút tiền mặt hoặc chuyển khoản từ tài khoản Tổ viên sau khi đã trả hết nợ NHCSXH.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="tr">☐ Đăng ký SMS chủ động (nhận thông báo biến động số dư qua SMS có tính phí)      ☐ Có      ☐ Không</p>';
  var C = '<p class="j">1. Với mọi trách nhiệm thuộc về mình, Tôi cam đoan mọi thông tin đưa ra tại Giấy đề nghị này đều đầy đủ và trung thực. Tôi hiểu và đồng ý rằng NHCSXH có thể yêu cầu thêm thông tin để xác thực các thông tin mà tôi xác nhận ở trên, thay mặt tôi cung cấp thông tin cho các cơ quan nhà nước có thẩm quyền theo quy định của pháp luật. Đề nghị NHCSXH cung cấp tài khoản Tổ viên mà Tôi đã đăng ký ở trên.</p>'+
    '<p class="j">2. Tôi xác nhận và đồng ý rằng:</p>'+
    '<p class="j">(a) Đã được NHCSXH cung cấp đầy đủ thông tin về Thoả thuận/Hợp đồng/Giấy đề nghị theo mẫu. Đã đọc, hiểu rõ, tự nguyện đồng ý và cam kết thực hiện “<i>Điều khoản, điều kiện giao dịch chung về mở và sử dụng tài khoản dành cho khách hàng cá nhân</i>” và “<i>Điều khoản, điều kiện chung về bảo vệ và xử lý dữ liệu cá nhân tại NHCSXH</i>”, sau đây được gọi là ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG và nội dung tại mục B Giấy đề nghị này;</p>'+
    '<p class="j">(b) NHCSXH được xác thực thông tin trên giấy tờ tùy thân định danh của tôi theo quy định của pháp luật từ bất kỳ giải pháp nào mà NHCSXH có được để phục vụ mục đích tuân thủ quy định pháp luật về nhận biết khách hàng; cung cấp cho bên thứ ba (bao gồm nhưng không giới hạn các đối tác…) hợp tác với NHCSXH để phát triển và cung cấp các sản phẩm, dịch vụ của NHCSXH; hoặc sử dụng thông tin với mục đích nghiên cứu đánh giá để hiểu về nhu cầu sử dụng sản phẩm dịch vụ ngân hàng của tôi để phục vụ các nghiệp vụ ngân hàng;</p>'+
    '<p class="j">(c) NHCSXH được cung cấp thông tin tài khoản Tổ viên của Tôi cho Ban quản lý Tổ Tiết kiệm và vay vốn để theo dõi, đôn đốc việc thực hiện nghĩa vụ của Tôi với Ngân hàng;</p>'+
    '<p class="j">(d) Chịu trách nhiệm cập nhật, kiểm tra số dư tài khoản Tổ viên theo thông báo do Ngân hàng phát hành, gửi đến tôi thông qua Ban quản lý Tổ Tiết kiệm và vay vốn và/hoặc thông qua các ứng dụng do NHCSXH cung cấp, kịp thời thông báo đến NHCSXH khi có sai sót, chênh lệch cần kiểm tra, đối chiếu;</p>'+
    '<p class="j">(đ) Đồng ý rằng khi đại diện hợp pháp của NHCSXH ký vào "Phần dành cho Ngân hàng" tại văn bản này thì văn bản này và các ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG dưới đây được coi là Hợp đồng và có giá trị ràng buộc các bên.</p>'+
    hsoBang('khung0', [90, 10], '<tr><td></td><td class="c i">Đồng ý</td></tr><tr><td><p class="i j">- Điều khoản, điều kiện giao dịch chung về mở và sử dụng tài khoản dành cho khách hàng cá nhân tại NHCSXH.</p></td><td class="c">☐</td></tr><tr><td><p class="i j">- Điều khoản, điều kiện chung về bảo vệ và xử lý dữ liệu cá nhân tại NHCSXH.</p></td><td class="c">☐</td></tr>')+
    '<p class="j">Tôi chịu trách nhiệm cập nhật và tự nguyện chấp thuận không kèm theo bất kỳ điều kiện nào đối với các ĐIỀU KHOẢN, ĐIỀU KIỆN CHUNG nêu trên được sửa đổi và đăng tải trên website chính thức của NHCSXH trong từng thời kỳ, hiện là <u>www.vbsp.org.vn</u> hoặc thông báo đến Tôi thông qua các kênh cung cấp dịch vụ của NHCSXH.</p>'+
    '<p class="j">3. Tôi cam kết chịu trách nhiệm quản lý, sử dụng tài khoản theo quy định của pháp luật và của NHCSXH. Đồng ý chi trả các khoản phí liên quan đến việc quản lý và sử dụng tài khoản theo quy định của NHCSXH theo từng thời kỳ, mức phí công khai trên website chính thức của NHCSXH.</p>'+
    '<p class="j">4. Trường hợp số điện thoại liên hệ của Tôi không phải số điện thoại di động chính chủ, NHCSXH được miễn trách nhiệm trong việc gửi thông tin cho Tôi qua số điện thoại liên hệ đã khai báo ở trên.</p>'+
    '<p class="j">Giấy đề nghị này được lập thành 02 bản gốc, có giá trị pháp lý ngang nhau, khách hàng và NHCSXH mỗi bên giữ một bản.</p><p class="i">Quý khách vui lòng kiểm tra thông tin tại Hợp đồng này trước khi ký xác nhận.</p>'+
    '<p class="c i">'+hsoCham(8)+(function(){ var g = Q('ngayKy') ? hsoNg(hsoChamGT('01tgtv', 'ngayKy', '')) : null; return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày'+hsoCham(10)+' tháng'+hsoCham(9)+'năm'+hsoCham(9); })()+'</p><p class="c b">Khách hàng</p><p class="c i s10">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';   /* 3.219 (anh): chỗ khách hàng ký rộng xuống thêm */
  var kyD = [['Cán bộ tiếp nhận', 'Ký, ghi rõ họ tên'], ['Giao dịch viên', 'Ký, ghi rõ họ tên'], ['Kiểm soát viên', 'Ký, ghi rõ họ tên'], ['Giám đốc', 'Ký, đóng dấu']];
  /* 3.219 (anh 15/10 "phần dành cho Ngân hàng chưa khớp"): đo theo file Word mẫu — cột 2689 · 2409 · 2410 · 2874 twip, dòng 1 ≥ 6,3 mm, dòng chức danh ≥ 10 mm + dòng ký 27 mm (không kẻ giữa), bảng thụt vào trong khung */
  var Dd = hsoBang('luoi', [2689, 2409, 2410, 2874], '<tr style="height:6.3mm"><td class="c i">Tiếp nhận ngày '+hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+'</td><td colspan="3" class="c i">'+coChuHTML(hsoPGD('noi'))+', ngày '+hsoCham(8)+' tháng '+hsoCham(8)+' năm '+hsoCham(10)+'</td></tr>'+
      '<tr style="height:10mm">'+kyD.map(function(x){ return '<td class="c" style="vertical-align:top;border-bottom:0"><p class="c b">'+x[0]+'</p><p class="c i">('+x[1]+')</p></td>'; }).join('')+'</tr>'+
      '<tr style="height:27mm">'+kyD.map(function(){ return '<td style="border-top:0">&nbsp;</td>'; }).join('')+'</tr>').replace('<table ', '<table style="width:97%;margin:3pt auto 4pt" ')+
    '<p class="tr"><b>Số CIF:</b> '+hsoO(Q('cif') ? P.kh : '', 'sl', 45)+' <b>Số Tài khoản Tổ viên:</b> '+hsoCham(70)+'</p><p>Hiệu lực từ ngày:'+hsoCham(10)+' /'+hsoCham(10)+'/'+hsoCham(10)+'</p>';
  var h = hsoBang('khung0', [17, 63, 20], '<tr><td>'+hsoLogo('01tgtv', 16)+'</td><td class="c"><p class="c b s13">&nbsp;</p><p class="c b s13">GIẤY ĐĂNG KÝ MỞ TÀI KHOẢN TỔ VIÊN</p></td><td class="r"><table class="luoi s12" data-w="1"><tr><td class="c">Mẫu 01/TGTV</td></tr></table></td></tr>')+
    '<p class="i j tr">Tôi đề nghị Ngân hàng Chính sách xã hội (NHCSXH) chi nhánh/PGD <b>'+coChuHTML(hsoPGD('ngan'))+'</b> mở hồ sơ thông tin cá nhân và đăng ký tài khoản Tổ viên với các thông tin sau.</p>'+
    hsoBang('luoi giua s11', [1], '<tr><td><p>Ngày:'+hsoCham(75)+'</p><p>Số Hồ sơ thông tin KH (Số CIF) '+(Q('cif') && P.kh ? hsoO(P.kh) : hsoCham(50))+'</p></td></tr>').replace('<table ', '<table style="width:120mm;margin:4pt auto" ')+
    hsoKhungNgoai([['nen', 'A- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ THÔNG TIN CÁ NHÂN'], A, ['nen', 'B- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ'], Bd+'<p class="i s9 tr"><sup>1</sup> Trong thời gian NHCSXH nơi khách hàng mở tài khoản tổ chức phiên giao dịch tại điểm giao dịch nơi khách hàng đăng ký địa chỉ thường trú/tạm trú để giao dịch với NHCSXH, khách hàng được thực hiện các giao dịch trên tài khoản tại điểm giao dịch của NHCSXH, đồng thời khách hàng không được thực hiện các giao dịch rút tiền mặt, chuyển khoản từ tài khoản Tổ viên của mình tại trụ sở NHCSXH.</p>', ['nen', 'C- CAM KẾT CỦA KHÁCH HÀNG'], C, ['tieu', 'D - PHẦN DÀNH CHO NGÂN HÀNG'], Dd])+
    '';
  return {ma:'01/TGTV', h:'<div class="tgtv">'+h+'</div>'};   /* 3.218 (anh 15/10, theo file Word mẫu 03/2026): giãn dòng đơn 1,15 như Word, lề 10 · 12,5 · 16 · 7,1 mm, phần D trọn trang 3 → 3 trang nội dung; trang trắng thứ 4 chỉ khi in 2 mặt nhiều bản (đã có sẵn) */
}
function hsoCT01Ds(){ return hsoCTVDs().filter(function(c){ return c.bat!==false && c.kieu!=='gqvl'; }); }   /* 3.258: chương trình lập bằng 01/TD (chip trên thanh mẫu) */
function hsoChon01CT(ma){ HSO.vay.ct01 = ma; hsoChonMau('01td'); var B = hsoBo(); if(B && B.ct!==ma){ B.ct = ma; hsoBoLuu(); } hsoVe(); }   /* chọn chip "01/TD <chương trình>" → phiếu đang mở đổi chương trình; chưa có phiếu → hộ mới lập theo chương trình này */
function hsoMauK(k){ var r = null; ['hst','hsv'].forEach(function(p){ HSO_MAU[p].forEach(function(m){ if(m.k===k) r = m; }); }); return r; }
function hsoDTTHMd(B, phuong){ var c = B && hsoCTV(B.ct); return c ? (phuong ? c.dtthPh : c.dtthMd) || '' : ''; }
function hsoLapBo(B, t){   /* cả bộ: 01/UQ · 01/TD · biên bản họp kết nạp và bình xét (10C mới) · 03/TD · 01/TGTV (hộ mới) — mỗi mẫu 1 bản, khổ riêng */
  var ds = [], c = (B && B.chon) || {uq:1, td:1, bb:1, ds:1}, N = hsoBoNV(B), A = hsoPA(B), tB = B && B.to && KHO.to(B.to) ? KHO.to(B.to) : t;
  var vay = B && N.ten ? [{ten:N.ten, ct:B.ct==='NSVSMT' ? 'Nước sạch VSMT' : hsoCTTenIn(B.ct), tien:A.tien, md:A.mdDs, th:A.th}] : [];
  var gq = B && (hsoCTV(B.ct)||{}).kieu==='gqvl';   /* 3.211: GQVL — đơn 01/GQVL, hợp đồng 07b; không 01/UQ */
  if(c.uq && !gq) ds.push({M:hsoMauK('01uq'), h:hsoLap01uq(t, B).h});
  if(c.td) ds.push(gq ? {M:hsoMauK('01gqvl'), h:hsoLap01gqvl(t, B).h} : {M:hsoMauK('01td'), h:hsoLap01td(t, B).h});
  if(c.td && c.pd && gq) ds.push({M:hsoMauK('pdnh'), h:hsoLapPdnh(t, B).h});   /* 3.310: trang Phê duyệt NH in chung ngay sau 01/GQVL */
  if(c.bb) ds.push({M:hsoMauK('10c'), h:hsoLap10c(tB, {moi:true, kn:B && B.moi && N.ten ? [{kh:'', ten:N.ten}] : [], vay:vay}).h});
  if(c.ds) ds.push({M:hsoMauK('03td'), h:hsoLap03td(tB, B).h});
  if(c.hd && gq) ds.push({M:hsoMauK('07b'), h:hsoLap07b(t, B).h});
  if(c.tgtv) ds.push({M:hsoMauK('01tgtv'), h:hsoLap01tgtv(t, B ? Object.assign({kh:B.kh}, N) : null).h});
  if(!ds.length) ds.push({M:hsoMauK('01td'), h:hsoLap01td(t, B).h});
  return {ma:'Bộ hồ sơ vay', ds:ds};
}
function hsoTGTVDs(t, B){   /* 01/TGTV: người vay trong bộ (hộ mới) hoặc tổ viên chưa có TK 105 của tổ (tích, in hàng loạt) */
  var V = HSO.vay, ng = V.tgNguon || (B ? 'bo' : 'to'); if(ng==='bo') return B && hsoBoNV(B).ten ? [Object.assign({kh:B.kh}, hsoBoNV(B))] : [];
  if(ng==='tay') return tgTayCo() ? [tgTayP()] : [];   /* 3.315: ✍ in nhanh tự khai (js/54) */
  return hsoTVTo(t).filter(function(k){ var c = (V.tg||{})[k.kh]; return c===undefined ? !k.stk.length && !k.coTK : !!c; })   /* 3.315: tích được cả người đã có TK 105 (in lại) */.map(function(k){
    var c = KHO.danhBa(k.kh) || {}, x = hsoKhach(k.kh, t); return {kh:k.kh, ten:x.ten, ns:x.ns, gt:c.gt||'', cccd:x.cccd, ncap:x.ncap, noiCap:x.noiCap, sdt:c.sdt||k.sdt||'', danToc:c.danToc||'', ap:x.ap, tenXa:x.tenXa}; });
}
function hsoVeGiuO(){   /* 3.242: vẽ lại cột trái mà con trỏ ở yên (ô kế khi vừa Tab / Enter) — theo thứ tự ô trong #hso-tuy */
  setTimeout(function(){ var q = '#hso-tuy input:not([type=checkbox]):not([type=radio]), #hso-tuy select', a = document.activeElement, ds = Array.prototype.slice.call(document.querySelectorAll(q)), i = ds.indexOf(a), gt = i>=0 && a.tagName==='INPUT' ? a.value : null;
    hsoVe(); if(i<0) return; var x = document.querySelectorAll(q)[i]; if(!x) return; if(gt!=null && x.value!==gt) x.value = gt; x.focus(); if(x.select && x.tagName==='INPUT') x.select(); }, 0); }
function hsoBoDat(duong, v, ve){
  var B = hsoBo(); if(!B) return; var k = duong.split('.'), o = B;
  for(var i=0;i<k.length-1;i++){ if(o[k[i]]==null) o[k[i]] = /^\d+$/.test(k[i+1]) ? [] : {}; o = o[k[i]]; }
  if(/^nv\.(ns|ncap)$/.test(duong) || /^ho\.\d+\.ns$/.test(duong) || duong==='hanCuoi' || duong==='ngayHD' || duong==='ngayGN'){ var iso = hsoNgayTu(v); v = iso || v; }
  o[k[k.length-1]] = v;
  if(duong==='nv.cccd' && B.moi){ var d = hsoCCCDDoc(v); if(d) B.nv.gt = d.gt; }
  if(duong==='nv.ncap' && B.moi && !B.nv.noiCapTay) B.nv.noiCap = hsoNoiCapGY(B.nv.ncap);
  if(duong==='nv.noiCap') B.nv.noiCapTay = !!v;
  if(duong==='moi'){ B.chon.tgtv = v ? 1 : 0; if(v){ B.kh = ''; } }
  if(duong==='ho') B.ho = v;
  hsoBoLuu(); if(ve) hsoVeGiuO(); else hsoHen();
}
function hsoKhungNgoai(ds){   /* khung viền ngoài chia được trang: mỗi đoạn con 1 dòng bảng (mẫu 01/TGTV) */
  var dong = [];
  ds.forEach(function(x){ if(Array.isArray(x)){ dong.push('<tr class="tr-td"><td class="c b'+(x[0]==='nen' ? ' nen' : ' tieu')+'">'+x[1]+'</td></tr>'); return; }   /* 3.218: tiêu đề mục (tr-td) không đứng trơ cuối trang — kéo theo dòng sau */
    var d = new DOMParser().parseFromString('<div>'+x+'</div>', 'text/html').body.firstChild;
    Array.prototype.forEach.call(d.children, function(c){ dong.push('<tr><td>'+c.outerHTML+'</td></tr>'); }); });
  return '<table class="ngoai s12" data-w="1"><colgroup><col style="width:100%"></colgroup>'+dong.join('')+'</table>';
}
/* @CHEN */
/* ---------- lập mẫu đang chọn ---------- */
function hsoLap(){
  var p = hsoTab(), M = hsoMau(p), S = hsoCH(), t = KHO.to(S.to); if(t && toLaTT(t)) t = null;
  var B = p==='hsv' ? hsoBo() : null, x, ai = '';
  if(M.k==='06td'){ x = hsoLap06td(); x.M = M; x.t = t; x.ds = []; x.h = ''; x.ten = hso06TenHS(); return x; }   /* 3.253: mẫu KTGS — trang in riêng (khổ ngang, CSS KTGS) */
  if(M.k==='sohv'){ x = {ma:'Sổ hộ vay', h:hmLapHTML(hmSoDs().map(function(r){ return r.o; }), hmSoLocChu(), HM_SO.nhom)}; }   /* 3.214: in đúng danh sách đang lọc */
  else if((M.k==='01td' || M.k==='01gqvl') && B && B.hoId && hsoKemCo(B)){ x = hsoLapBo(Object.assign({}, B, {chon:Object.assign({td:1}, B.kem)}), t); ai = hsoBoNV(B).ten || ''; }   /* 3.209: 01/TD in kèm 03/TD · 10C · 01/UQ · 01/TGTV */
  else if(M.k==='01tgtv'){ var P = hsoTGTVDs(t, B); x = {ma:'01/TGTV', ds:(P.length ? P : [null]).map(function(y){ return {M:M, h:hsoLap01tgtv(t, y).h}; })}; ai = P.length===1 ? P[0].ten : ''; }
  else if(M.k==='03td' && (hsoD03().ds.length || (B && B.hoId)) && (!B || B.hoId)){ var D3 = hsoD03(), t3 = hsoD03To(D3); hsoD03TuBo(D3); x = hsoLap03td(t3, null, hsoD03Hang(D3), D3.ct); }   /* 3.209: 03/TD nhiều hộ cùng chương trình */
  else if(M.k==='03td' && !B && t){ var ch = HSO.vay.chon || {}; x = hsoLap03td(t, null, hsoTVTo(t).filter(function(k){ return ch[k.kh]; }).map(function(k){ return {ten:k.ten}; })); }
  else { var f = {'10c':function(t){ return hsoLap10c(t, {moiChon:1}); }, '10ccu':hsoLap10cCu, '10a':hsoLap10a, '10b':hsoLap10b, '10d':function(t){ return hsoLap10d(t); }, '11':hsoLap11, '11cu':hsoLap11Cu, '01bg':hsoLap01bg, '02bg':hsoLap02bg, '01uq':hsoLap01uq, '01td':hsoLap01td, '03td':hsoLap03td, '09a':hsoLap09a, '01tdck':hsoLap01tdck, '01gqvl':hsoLap01gqvl, '07b':hsoLap07b, 'pdnh':hsoLapPdnh}[M.k];
    x = f(t, p==='hsv' && /^(01uq|01td|03td|01gqvl|07b|pdnh)$/.test(M.k) ? B : undefined);
    ai = /^(01uq|01td|01gqvl|07b|pdnh)$/.test(M.k) ? hsoBoNV(B).ten || '' : /^(09a|01tdck)$/.test(M.k) ? ((hsoKhachChon(t)||{}).ten || '') : ''; }
  if(!x.ds) x.ds = [{M:M, h:x.h}];
  if(M.k==='09a' && hsoLuu().kemTDCK) x.ds.push({M:hsoMauK('01tdck'), h:hsoLap01tdck(t).h});   /* 3.206: 09A in kèm 01/TĐCK (cùng khổ dọc → 1 lần in, 1 file Word) */
  x.ds.forEach(function(u){ if(u.M && !/^(01td|01tgtv)$/.test(u.M.k) && hsoLogoCo(u.M.k)) u.h = '<p>'+hsoLogo(u.M.k, 16)+'</p>'+u.h; });   /* 3.171: logo ở mẫu anh tích (mẫu gốc có logo đã đặt sẵn đúng chỗ) */
  x.M = M; x.t = t; x.h = x.ds[0].h;
  var pv = ai || (t ? 'To '+t.ten : '') || 'Trang';
  x.ten = xuatTen('Mau '+M.ma.replace(/\//g, ' ')+(HSO_GM ? ' - Ghi mau' : '')+(typeof omCo==='function' && omCo(M.k) ? omTen() : ''), pv, HSO.o.ngay || ngayISO(nay()));   /* 3.221: bản ghi mẫu ghi rõ trong tên file */
  if(typeof omChamMin==='function') x.ds.forEach(function(u){ if(OM_MAU[u.M.k]) u.h = omChamMin(u.h); });   /* 3.248: chấm mảnh lúc dựng bản in / xem / Word (HTML mẫu giữ chuỗi chấm gốc) */
  x.trang = hsoTrang(x.ds, null, x.ten);
  return x;
}
/* sửa 1 trường của bộ đang chọn: đường dẫn "nv.ten", "pa.sv", "ho.0.ten" … */

/* ---------- WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang) ---------- */
function hsoDocx(x){   /* HTML các mẫu → .docx: đoạn, bảng (gộp ô, lặp tiêu đề, kẻ chấm), kẻ mảnh, logo, nhiều khổ (mỗi mẫu 1 section) */
  var ds = x.ds || [{M:x.M, h:x.h}], anh = [], soAnh = 0, tw = function(mm){ return Math.round(mm*56.7); };
  var co = function(el, f){ var m = (' '+(el.className||'')+' ').match(/ s(\d+) /); if(m) return +m[1]*2; var fs = el.style && el.style.fontSize; return fs && /%$/.test(fs) ? Math.max(14, Math.round(f*parseFloat(fs)/100)) : fs && /pt$/.test(fs) && / om-co /.test(' '+(el.className||'')+' ') ? Math.round(parseFloat(fs)*2) : f; };   /* 3.254: cỡ chữ mẫu theo khai báo riêng */   /* 3.248: chấm mảnh (font-size %) → Word cỡ nhỏ theo tỉ lệ */
  var lop = function(el, k){ return (' '+(el.className||'')+' ').indexOf(' '+k+' ')>=0; };
  var chay = function(t, f){ return '<w:r><w:rPr>'+(f.b ? '<w:b/>' : '')+(f.i ? '<w:i/>' : '')+(f.mau ? '<w:color w:val="'+f.mau+'"/>' : '')+'<w:sz w:val="'+f.sz+'"/><w:szCs w:val="'+f.sz+'"/>'+(f.u ? '<w:u w:val="single"/>' : '')+(f.sup ? '<w:vertAlign w:val="superscript"/>' : '')+'</w:rPr><w:t xml:space="preserve">'+xmlEsc(t)+'</w:t></w:r>'; };
  var hinh = function(img){ var src = img.getAttribute('src')||'', m = src.match(/^data:image\/(png|jpe?g);base64,(.+)$/); if(!m) return '';
    var mm = +img.getAttribute('data-mm') || 20, ty = +img.getAttribute('data-ty') || 1, cx = Math.round(mm*36000), cy = Math.round(mm*ty*36000), id = 'rIdAnh'+(++soAnh);
    anh.push({id:id, ten:'anh'+soAnh+'.'+(m[1]==='png' ? 'png' : 'jpeg'), b64:m[2]});
    return '<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="'+cx+'" cy="'+cy+'"/><wp:docPr id="'+soAnh+'" name="logo'+soAnh+'"/>'+
      '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'+
      '<pic:nvPicPr><pic:cNvPr id="0" name="logo'+soAnh+'"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="'+id+'"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'+
      '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="'+cx+'" cy="'+cy+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>'; };
  var chu = function(node, f){ var r = [];
    Array.prototype.forEach.call(node.childNodes, function(n){
      if(n.nodeType===3){ var t = n.nodeValue.replace(/[ \t\r\n]+/g, ' '); if(t) r.push(chay(t, f)); return; }
      if(n.nodeType!==1 || /^(COLGROUP|COL|TABLE|P)$/.test(n.tagName)) return;
      if(n.tagName==='BR'){ r.push('<w:r><w:br/></w:r>'); return; }
      if(n.tagName==='IMG'){ r.push(hinh(n)); return; }
      var g = Object.assign({}, f); if(/^(B|STRONG)$/.test(n.tagName) || lop(n, 'b')) g.b = 1; if(/^(I|EM)$/.test(n.tagName) || lop(n, 'i')) g.i = 1; if(n.tagName==='U' || lop(n, 'u')) g.u = 1; if(n.tagName==='SUP') g.sup = 1; g.sz = co(n, g.sz);
      r = r.concat(chu(n, g)); });
    return r; };
  var doan = function(el, f){
    if(lop(el, 'ke')){ var dai = Math.min(f.w, tw(+el.getAttribute('data-ke') || 60)), le = Math.max(0, Math.round((f.w-dai)/2)), ph = le; if(lop(el, 'trai')){ le = 0; ph = f.w-dai; }   /* kẻ mảnh: đoạn trống viền trên, thụt 2 bên = độ dài */
      return '<w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="1" w:color="000000"/></w:pBdr><w:spacing w:before="0" w:after="60" w:line="120" w:lineRule="exact"/><w:ind w:left="'+le+'" w:right="'+ph+'"/><w:rPr><w:sz w:val="8"/></w:rPr></w:pPr></w:p>'; }
    var jc = lop(el, 'c') ? 'center' : lop(el, 'r') ? 'right' : lop(el, 'j') ? 'both' : 'left', g = Object.assign({}, f);
    if(lop(el, 'b')) g.b = 1; if(lop(el, 'i')) g.i = 1; if(lop(el, 'u')) g.u = 1; g.sz = co(el, g.sz);
    var trai = lop(el, 'l1') ? 454 : lop(el, 'l2') ? 794 : lop(el, 'l4') ? 1247 : 0;
    return '<w:p><w:pPr><w:spacing w:before="'+(lop(el, 'tr') ? 120 : lop(el, 'tr2') ? 50 : 0)+'" w:after="'+(lop(el, 'sau') ? 120 : 20)+'" w:line="'+(f.bang ? 240 : 276)+'" w:lineRule="auto"/>'+(lop(el, 'thut') || trai ? '<w:ind'+(trai ? ' w:left="'+trai+'"' : '')+(lop(el, 'thut') ? ' w:firstLine="567"' : '')+'/>' : '')+'<w:jc w:val="'+jc+'"/></w:pPr>'+chu(el, g).join('')+'</w:p>';
  };
  var vien = function(v, cham){ return '<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(function(b){ return '<w:'+b+' w:val="'+(!v ? 'nil' : (cham && b==='insideH') ? 'dotted' : 'single')+'" w:sz="4" w:space="0" w:color="'+(cham && b==='insideH' ? '777777' : '000000')+'"/>'; }).join('')+'</w:tblBorders>'; };
  var bang = function(tb, f){
    var W = f.w, w = String(tb.getAttribute('data-w')||'1').split(',').map(Number), tong = w.reduce(function(a, b){ return a+b; }, 0) || 1, cw = w.map(function(v){ return Math.round(W*v/tong); });
    var rong = function(i, n){ var s = 0; for(var j=i;j<i+n && j<cw.length;j++) s += cw[j]; return s; }, g = Object.assign({}, f, {sz:co(tb, f.sz), bang:1}), luoi = lop(tb, 'luoi'), keo = [];
    var x = '<w:tbl><w:tblPr><w:tblW w:w="'+W+'" w:type="dxa"/>'+(lop(tb, 'giua') ? '<w:jc w:val="center"/>' : '')+(lop(tb, 'ngoai') ? '<w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders>' : vien(luoi, lop(tb, 'cham')))+'<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="57" w:type="dxa"/><w:right w:w="57" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+cw.map(function(v){ return '<w:gridCol w:w="'+v+'"/>'; }).join('')+'</w:tblGrid>';
    Array.prototype.forEach.call(tb.rows, function(row){
      var cot = 0, dau = row.parentNode.tagName==='THEAD', h = '<w:tr><w:trPr><w:cantSplit/>'+(dau ? '<w:tblHeader/>' : '')+'</w:trPr>';
      var noi = function(){ while(keo[cot] && keo[cot].n>0){ var k = keo[cot]; k.n--; h += '<w:tc><w:tcPr><w:tcW w:w="'+rong(cot, k.s)+'" w:type="dxa"/>'+(k.s>1 ? '<w:gridSpan w:val="'+k.s+'"/>' : '')+'<w:vMerge/></w:tcPr><w:p/></w:tc>'; cot += k.s; } };
      noi();
      Array.prototype.forEach.call(row.cells, function(c){
        var cs = c.colSpan || 1, rs = c.rowSpan || 1, wc = rong(cot, cs), gc = Object.assign({}, g, {w:Math.max(200, wc-114)});
        if(lop(c, 'nen')){ gc.mau = 'FFFFFF'; gc.b = 1; }
        var nd = c.querySelector('p,table') ? khoi(c, gc) : [doan(c, gc)];
        h += '<w:tc><w:tcPr><w:tcW w:w="'+wc+'" w:type="dxa"/>'+(cs>1 ? '<w:gridSpan w:val="'+cs+'"/>' : '')+(rs>1 ? '<w:vMerge w:val="restart"/>' : '')+(lop(c, 'nen') ? '<w:shd w:val="clear" w:color="auto" w:fill="548235"/>' : '')+'<w:vAlign w:val="'+(luoi ? 'center' : 'top')+'"/></w:tcPr>'+(nd.join('') || '<w:p/>')+'</w:tc>';
        if(rs>1) keo[cot] = {n:rs-1, s:cs};
        cot += cs; noi();
      });
      x += h+'</w:tr>';
    });
    return x+'</w:tbl>';
  };
  var khoi = function(el, f){ var r = [], truoc = '';
    Array.prototype.forEach.call(el.children, function(n){
      if(n.tagName==='P'){ r.push(doan(n, f)); truoc = 'p'; }
      else if(n.tagName==='TABLE'){ if(truoc==='t') r.push('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>'); r.push(bang(n, f)); truoc = 't'; }
      else if(n.tagName==='IMG'){ r.push('<w:p>'+hinh(n)+'</w:p>'); truoc = 'p'; }
      else if(n.tagName==='DIV'){ r = r.concat(khoi(n, f)); } });
    if(truoc==='t') r.push('<w:p><w:pPr><w:spacing w:after="0" w:line="120" w:lineRule="exact"/></w:pPr></w:p>');
    return r; };
  var chan = [], sect = function(M, i){ var mg = M.mg || [20, 20, 20, 30], ft = '';
    if(M.chan){ chan.push({id:'rIdChan'+i, ten:'footer'+i+'.xml', chu:M.chan}); ft = '<w:footerReference w:type="default" r:id="rIdChan'+i+'"/>'; }
    return '<w:sectPr>'+ft+'<w:pgSz w:w="'+(M.ngang ? 16838 : 11906)+'" w:h="'+(M.ngang ? 11906 : 16838)+'"'+(M.ngang ? ' w:orient="landscape"' : '')+'/><w:pgMar w:top="'+tw(mg[0])+'" w:right="'+tw(mg[1])+'" w:bottom="'+tw(mg[2])+'" w:left="'+tw(mg[3])+'" w:header="510" w:footer="340" w:gutter="0"/><w:pgNumType w:start="1"/></w:sectPr>'; };
  var than = ds.map(function(u, i){
    var M = u.M, mg = M.mg || [20, 20, 20, 30], TW = tw((M.ngang ? 297 : 210) - mg[1] - mg[3]);
    var d = new DOMParser().parseFromString('<div id="hso-goc">'+u.h+'</div>', 'text/html'), b = khoi(d.getElementById('hso-goc'), {sz:26, w:TW}).join('');
    return i<ds.length-1 ? b+'<w:p><w:pPr>'+sect(M, i)+'</w:pPr></w:p>' : b+sect(M, i);
  }).join('');
  var enc = function(t){ return new Blob([t], {type:'application/xml'}); };
  var NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
  var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document '+NS+'><w:body>'+than+'</w:body></w:document>';
  var kieu = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman" w:eastAsia="Times New Roman"/><w:sz w:val="26"/><w:szCs w:val="26"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>';
  var ftXml = function(c){ var p = c.chu.split('|');   /* chân trang: trái · phải, dòng dưới "Trang x / y" */
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr '+NS+'><w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="9638"/></w:tabs><w:spacing w:after="0"/></w:pPr>'+
      '<w:r><w:rPr><w:b/><w:i/><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(p[0]||'')+'</w:t></w:r><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:tab/><w:t xml:space="preserve">'+xmlEsc(p[1]||'')+'</w:t></w:r></w:p>'+
      '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="0"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve">Trang </w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r>'+
      '<w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t xml:space="preserve"> / </w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:instrText xml:space="preserve"> SECTIONPAGES </w:instrText></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>'; };
  var nhi = function(b64){ var s = atob(b64), u = new Uint8Array(s.length); for(var i=0;i<s.length;i++) u[i] = s.charCodeAt(i); return new Blob([u]); };
  return taoZip([
    {ten:'[Content_Types].xml', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/>'+
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'+
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'+
      chan.map(function(c){ return '<Override PartName="/word/'+c.ten+'" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>'; }).join('')+'</Types>')},
    {ten:'_rels/.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')},
    {ten:'word/_rels/document.xml.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
      anh.map(function(a){ return '<Relationship Id="'+a.id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/'+a.ten+'"/>'; }).join('')+
      chan.map(function(c){ return '<Relationship Id="'+c.id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="'+c.ten+'"/>'; }).join('')+'</Relationships>')},
    {ten:'word/document.xml', b:enc(doc)},
    {ten:'word/styles.xml', b:enc(kieu)}
  ].concat(anh.map(function(a){ return {ten:'word/media/'+a.ten, b:nhi(a.b64)}; })).concat(chan.map(function(c){ return {ten:'word/'+c.ten, b:enc(ftXml(c))}; })))
    .then(function(z){ return new Blob([z], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); });
}
function hsoWord(){ if(hsoMau().k==='06td') return hsoWord06HS(); var x = hsoLap(); hsoDocx(x).then(function(bl){ giaoFile(bl, x.ten+'.docx'); if(hsoMau().k==='09a' && hsoLuu().kem06) setTimeout(hsoWord06, 600); if(hsoKem06()) setTimeout(hsoWord06HS, 600); bao('Đã tạo '+x.ten+'.docx — ô app điền sẵn là chữ thường, sửa thoải mái trong Word.', 6); }).catch(function(er){ baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }

/* ---------- giao diện tab ---------- */
function veHoSo(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veHoSo); return; }
  var C = hsoCH(), dsKy = toDsKy(), p = hsoTab();
  if(!dsKy.length){ TO_K = TO_K || null; hsoKhung(null); return; }   /* chưa có số liệu → vẫn in được mẫu trắng */
  toKyMacDinh(C, dsKy, 'hs');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'…</div>';
  toNap(C.ky).then(function(K){ TO_K = K; if(nganHienTai===7 && hsoTab()===p && (D.cauHinh.slTab==='hst' || D.cauHinh.slTab==='hsv')) hsoKhung(K); })
    .catch(function(er){ var o = document.getElementById('tr7'); if(o) o.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+' — vẫn in được mẫu trắng.</div>'; hsoKhung(null, 1); });
}
function hsoKhung(K, giu){
  var e = document.getElementById('tr7'), p = hsoTab(); if(!e) return;
  var dau = giu ? e.innerHTML : slTabConHTML()+(K ? kyGhiHTML(K) : '');
  e.innerHTML = dau+'<div id="hso-tabm"></div>'+(K ? '<div id="'+p+'-cay" class="to-cay pv-cay"></div>' : '<div class="sl-bao vang">Chưa có số liệu món vay (Mẫu 31) — mẫu in ra để trống, ghi tay. Nạp ở <b>📥 Nạp &amp; KT</b> để app điền sẵn.</div>')+
    '<div class="th-bo th-bo2 hso-bo"><div class="th-cot hso-trai"><div class="to-bc th-bc-gon" id="hso-ds"></div><div id="hso-tuy" class="hso-tuy"></div></div>'+
    '<div class="th-cot th-xem"><div id="hso-xem-nut"></div><iframe id="hso-xem-khung" class="to-khung th-khung" title="Xem trước"></iframe></div></div>';
  if(K) pvVeCay(p); else hsoVe();
}
function hsoDsHTML(){   /* 3.206 (anh chốt): mẫu chọn ở thanh tab con (hsoTabMauHTML) — cột trái chỉ còn tên mẫu đang làm + chú thích màu */
  var p = hsoTab(), M = hsoMau(p);
  return '<div class="th-nhom-ten hso-dau-ds"><span><b>'+M.ma+'</b> '+coChuHTML(M.ten)+(M.ngang ? ' <span class="th-cap">[A4 ngang]</span>' : '')+'</span>'+
    '<span class="hso-chu"><span class="hso-chu-sl">số liệu</span><span class="hso-chu-kb">khai báo</span><span class="hso-chu-tay">…… ghi tay</span></span></div>'+(M.ghi ? '<div class="sl-phu">'+coChuHTML(M.ghi)+'</div>' : '');   /* 3.317 (anh): chú thích màu cùng dòng tên mẫu */
}
function hsoTabMauHTML(){   /* 3.206 (anh chốt 14/10): mỗi biểu mẫu = 1 tab con, bố trí như tab Giao dịch xã · số liệu theo kỳ / ngày đã chọn */
  var p = hsoTab(), M = hsoMau(p);
  return '<div class="gdx2-dau hso-dau"><div class="gdx2-mau">'+HSO_MAU[p].filter(function(m){ return !m.an || m.k===M.k; }).map(function(m){
      if(p==='hsv' && m.k==='01td'){ var ctB = (hsoBo()||{}).ct || HSO.vay.ct01 || '';   /* 3.258 (anh 18/10): 01/TD tách chip theo chương trình — 01/TD HSSV · 01/TD NSVSMT · … (không GQVL — mẫu riêng) */
        return hsoCT01Ds().map(function(c){ return gdxChip('<b>01/TD '+coChuHTML(c.ma)+'</b>', M.k==='01td' && ctB===c.ma, 'hsoChon01CT(\''+c.ma+'\')', 'hso-tm', m.ten+' — chương trình '+(c.ten || c.ma)); }).join(''); }
      return gdxChip('<b>'+m.ma+'</b>', m.k===M.k, 'hsoChonMau(\''+m.k+'\')', 'hso-tm', m.ten+(m.ngang ? ' [A4 ngang]' : '')+(m.ghi ? ' — '+m.ghi : '')); }).join('')+'</div>'+
    '<div class="gdx2-nut"><span class="hso-ky" title="Số liệu lấy theo kỳ / ngày đang chọn ở dải lịch">📅 Số liệu: <b>'+(KHO.coKy() ? slKyChu(KHO.ky().ky) : 'chưa có')+'</b></span><button class="nho" onclick="hsoKBHop()" title="PGD, logo, trưởng ấp, tổ phó thực tế, chương trình vay — dùng chung mọi mẫu">⚙ Khai báo đơn vị</button></div></div>';
}
function hsoChonMau(k){ hsoCH()[hsoTab()] = k; luu(); hsoVe(); }
function hsoKhoa(){ var S = hsoCH(); return [hsoTab(), hsoMau().k, S.to||'', KHO.coKy() ? KHO.ky().ky : ''].join('|'); }
function hsoVe(){
  var ds = document.getElementById('hso-ds'); if(!ds) return;
  var S = hsoCH(), t = KHO.to(S.to), M = hsoMau(), k = hsoKhoa();
  if(t && toLaTT(t)) t = null;
  if(HSO.khoa!==k){   /* đổi tổ / mẫu / kỳ → tích mặc định */
    var giuNgay = HSO.o.ngay, cu = String(HSO.khoa||'').split('|'), mo = k.split('|'), cungTo = cu[2] && cu[2]===mo[2] && cu[3]===mo[3], V0 = HSO.vay || {};
    HSO = {khoa:k, kn:{}, ra:{}, tv:{}, vay:{ct:V0.ct || '', md:V0.md || '', chon:{}}, o:{ngay:giuNgay}};
    if(cungTo && V0.kh){ HSO.vay.kh = V0.kh; HSO.vay.ku = V0.ku || ''; }   /* 3.206: đổi mẫu cùng tổ → giữ người vay đang chọn (09A ↔ 01/TĐCK) */
    if(t){ var tv = hsoTVTo(t);
      tv.forEach(function(x){ if(x.vao) HSO.kn[x.kh] = true; if(!x.conNo && !x.chuaGN && !(x.t105>0)) HSO.ra[x.kh] = true; });
      if(TO_BD && TO_BD.to===t.ma && TO_BD.co) TO_BD.ra.forEach(function(r){ HSO.ra[r.kh] = true; }); }
  }
  if(t && (M.k==='10c' || M.k==='10ccu' || M.k==='10b') && !(TO_BD && TO_BD.to===t.ma && TO_BD.ky===KHO.ky().ky)){ TO_BD = null; toBDNap(t).then(function(){ HSO.khoa = ''; if(document.getElementById('hso-ds')) hsoVe(); }); }
  ds.innerHTML = hsoDsHTML();
  var tm = document.getElementById('hso-tabm'); if(tm) tm.innerHTML = hsoTabMauHTML();
  var tu = document.getElementById('hso-tuy'); if(tu) tu.innerHTML = hsoTuyHTML(M, t);
  var bo = document.querySelector('#tr7 .hso-bo'); if(bo) bo.classList.toggle('hso-rong', M.k==='sohv');   /* 3.214: 📒 Sổ hộ vay dùng hết bề ngang (xem bản in: ⤢ Phóng to / 🖨 In) */
  hsoXem();
}
function hsoXem(){
  clearTimeout(HSO_HEN);
  var f = document.getElementById('hso-xem-khung'), n = document.getElementById('hso-xem-nut'); if(!f) return;
  var x; try { x = hsoLap(); } catch(er){ f.srcdoc = '<p style="font-family:sans-serif;color:#b00">Lập mẫu lỗi: '+coChuHTML(er && er.message || er)+'</p>'; return; }
  HSO.x = x;
  var kem = hsoMau().k==='09a' && hsoLuu().kem06, kem6 = hsoKem06();   /* 3.206: 09A in kèm Mẫu 06/TD · 3.253: 01/TD in kèm 06/TD */
  if(n) n.innerHTML = xuatHang({ten:x.ten, html:function(){ return HSO.x.trang; }, word:'hsoWord()', dong:'thXemRong(\'hso-xem-khung\')', dongChu:'⤢ Phóng to',
    'in':kem ? 'hsoIn09Kem()' : kem6 ? 'xuatIn();setTimeout(hsoIn06HS,1500)' : '', truoc:kem ? '<button class="nho" onclick="hsoIn06()" title="In riêng Mẫu 06/TD (phiếu kiểm tra) của món đang gia hạn">🖨 06/TD</button>' : kem6 ? '<button class="nho" onclick="hsoIn06HS()" title="In riêng Mẫu 06/TD (khổ ngang) của hộ này / danh sách 03/TD">🖨 06/TD</button>' : ''});
  if(typeof tgTayGan==='function') tgTayGan(f); else f.onload = null;   /* 3.315: 01/TGTV tự khai — bấm ô trên bản xem */
  xemChuan(f, x.trang); thVuaKhung();
}
function hsoHen(){ clearTimeout(HSO_HEN); HSO_HEN = setTimeout(hsoXem, 250); }
function hsoDatLuu(k, v){ hsoLuu()[k] = v; luu(); hsoHen(); }
function hsoTick(nhom, kh, v){ var T = nhom==='vay' ? HSO.vay.chon : HSO[nhom]; T[kh] = v; hsoHen(); var o = document.getElementById('hso-dem-'+nhom); if(o) o.textContent = Object.keys(T).filter(function(k){ return T[k]; }).length; }
function hsoDocO(){ ['ttMoi','ttCu','phoMoi','phoCu','giao','nhan'].forEach(function(k){ var e = document.getElementById('hso-o-'+k); if(e) HSO.o[k] = e.value; }); hsoHen(); }   /* ô Bên giao / nhận, bầu thay: sửa 1 ô → giữ cả nhóm */

/* ---------- 3.207 (anh yêu cầu 14/10): 🏠 HỘ VAY MỚI — khai báo 1 lần (form nhập nhanh), lưu danh sách (D.cauHinh.hoMoi, đồng bộ Drive cùng cài đặt), gọi ra làm hồ sơ (Bộ HS → 01/TD · 01/UQ · 03/TD) ----------
   hộ = {id, tao, sua, xa, tenXa, diem, tenDiem, thon, tenThon, tv:[{ten, ns, cccd, ncap, noiCap, qh}], dung (người đứng tên vay), hssv (-1 = không)} */
function hmDs(){ var c = D.cauHinh; if(!Array.isArray(c.hoMoi)) c.hoMoi = []; return c.hoMoi; }
var HM = null, HM_CHON = {};
function hmNguoi(){ return {ten:'', ns:'', cccd:'', ncap:'', noiCap:'', qh:'', sdt:''}; }
function hmDiaBan(){   /* xã · điểm GD · ấp lấy từ cây tổ đang có */
  var X = {}; KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(!t || !t.xa || toLaTT(t)) return;
    var x = X[t.xa] = X[t.xa] || {xa:t.xa, tenXa:t.tenXa||t.xa, diem:{}, ap:{}};
    if(t.khoaDiem) x.diem[t.khoaDiem] = t.tenDiem || t.khoaDiem;
    var ak = t.thon || t.tenThon; if(ak){ var a = x.ap[ak] = x.ap[ak] || {thon:t.thon||'', tenThon:t.tenThon||'', diem:{}}; if(t.khoaDiem) a.diem[t.khoaDiem] = 1; } });
  return X;
}
function hmTen(o){ var n = o.tv[o.dung||0] || {}; return n.ten || '(chưa tên)'; }
function hmDiaChiChu(o){ return [o.tenThon ? (/^(ấp|khu phố|kp|thôn)/i.test(o.tenThon) ? o.tenThon : 'Ấp '+o.tenThon) : '', o.tenXa].filter(Boolean).join(', '); }
function hmM31(cccd){ return KHO.timCCCD(cccd); }   /* 3.216: qua cửa KHO */
function hmSuyHTML(n, laDung){   /* giới tính · năm sinh theo CCCD · nơi cấp · hạn CCCD */
  var d = hsoCCCDDoc(n.cccd), so = String(n.cccd||'').replace(/\D/g, ''), r = [];
  if(so && so.length!==12) r.push('<b class="hso-canh">⚠ CCCD '+so.length+' số (cần 12)</b>');
  if(d) r.push(d.gt+', năm sinh theo CCCD '+d.nam+(n.ns ? (+String(n.ns).slice(0, 4)===d.nam ? ' ✓ khớp' : ' — <b class="hso-canh">⚠ khác năm sinh đã nhập ('+String(n.ns).slice(0, 4)+')</b>') : ''));
  if(laDung && n.ncap) r.push('nơi cấp: '+coChuHTML(n.noiCap || hsoNoiCapGY(n.ncap)));
  if(n.ns && so.length===12 && n.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(so, n.ns, n.ncap); r.push(hn.kq==='het' ? '<b class="hso-canh">⚠ CCCD '+coChuHTML(hn.chu)+'</b>' : hn.kq==='sap' ? '<b class="hso-canh">⚠ '+coChuHTML(hn.chu)+'</b>' : (hn.den ? 'hạn CCCD: '+ngayVNsl(hn.den) : coChuHTML(hn.chu||''))); }
  var m = hmM31(so); if(m) r.push('<b>✓ đã có trên Mẫu 31 (mã KH '+coChuHTML(m)+')</b>');
  return r.join(' · ');
}
/* ---------- 3.209 (anh 14/10): SỔ HỘ VAY — hộ mới / lấy từ Mẫu 31; khai tổ khi tạo; chỉ bắt buộc người đứng tên, thành viên / thừa kế, nhiều HSSV bổ sung khi cần;
   hộ cũ có mã KH (nhân thân, SĐT đọc Mẫu 31 mới nhất); hộ mới khớp CCCD trên Mẫu 31 → tự gắn mã KH; in: chọn hộ → chọn chương trình → in (không lưu lịch sử đề nghị vay)
   hộ = {id, kh, to, xa, tenXa, diem, tenDiem, thon, tenThon, tv:[{ten, ns, cccd, ncap, noiCap, qh, sdt}], dung, sv:[chỉ số người HSSV]} (hssv cũ 3.207 = 1 người) */
function hmSV(o){ return Array.isArray(o.sv) ? o.sv : (o.hssv>=0 ? [o.hssv] : []); }
function hmTim(id){ return hmDs().find(function(x){ return x.id===id; }) || null; }
function hmToTen(o){ var t = o.to && KHO.to(o.to); return t ? 'Tổ '+(t.ten||t.ma) : ''; }
function hmGanMa(){   /* hộ mới đã lên Mẫu 31 (khớp CCCD người đứng tên) → gắn mã KH, tổ */
  var doi = 0; hmDs().forEach(function(o){ if(o.kh) return; var n = o.tv[o.dung||0] || {}, m = hmM31(n.cccd); if(!m) return; var c = KHO.danhBa(m) || {}; o.kh = m; if(c.to && !o.to) o.to = c.to; doi++; });
  if(doi) luu(); return doi;
}
function hmChuyenCu(){   /* phiếu hồ sơ chưa gắn sổ (Bộ HS cũ 3.171–3.208, phiếu lập thẳng từ Mẫu 31 / mẫu) → gắn vào hộ trùng CCCD / tên trong sổ, không có thì thêm hộ; phiếu gốc giữ nguyên
     3.240 (anh 17/10 "tab hộ vay cũ và sổ hộ vay chưa link nhau"): chạy MỖI lần (trước chỉ 1 lần → phiếu lập sau đó không lên sổ) */
  var C = D.cauHinh; if(!hsoBoDs().some(function(B){ return !B.hoId && String((B.nv||{}).ten||'').trim(); })) return; C.hoVayChuyen = 1;
  hsoBoDs().forEach(function(B){ var N = B.nv || {}; if(B.hoId || !String(N.ten||'').trim()) return;
    var so = String(N.cccd||'').replace(/\D/g, ''), o = hmDs().find(function(x){ var n = x.tv[x.dung||0] || {}; return so ? String(n.cccd||'').replace(/\D/g, '')===so : slChuan(n.ten)===slChuan(N.ten); });
    if(!o){ o = {id:'hm'+Date.now().toString(36)+Math.random().toString(36).slice(2, 5), tao:B.tao || new Date().toISOString(), kh:B.kh||'', to:B.to||'', xa:'', tenXa:N.tenXa||'', diem:'', tenDiem:'', thon:'', tenThon:N.ap||'',
        tv:[{ten:N.ten, ns:N.ns||'', cccd:N.cccd||'', ncap:N.ncap||'', noiCap:N.noiCap||'', qh:'', sdt:N.sdt||''}].concat((B.ho||[]).filter(function(x){ return x.ten; }).map(function(x){ return {ten:x.ten, ns:x.ns||'', cccd:x.cccd||'', ncap:'', noiCap:'', qh:x.qh||'', sdt:''}; })), dung:0, sv:[]};
      if(B.pa && B.pa.sv){ o.tv.push({ten:B.pa.sv, ns:'', cccd:'', ncap:'', noiCap:'', qh:'Con', sdt:''}); o.sv = [o.tv.length-1]; }
      hmDs().push(o); }
    B.hoId = o.id; });
  luu();
}
function hmTuM31(kh){   /* ＋ Lấy từ Mẫu 31: 1 khách → 1 hộ (trùng mã KH / CCCD → mở hộ đã có) */
  var c = KHO.danhBa(kh); if(!c) return null;
  var co = hmDs().find(function(o){ return o.kh===kh; }); if(co) return co;
  var t = c.to ? KHO.to(c.to) : null, k = KHO.khach(kh, t);
  var o = {id:'hm'+Date.now().toString(36)+Math.random().toString(36).slice(2, 5), tao:new Date().toISOString(), kh:kh, to:c.to||'', xa:c.xa||(t && t.xa)||'', tenXa:k.tenXa||c.tenXa||'', diem:(t && t.khoaDiem)||'', tenDiem:(t && t.tenDiem)||'', thon:c.thon||'', tenThon:c.tenThon||(t && t.tenThon)||'',
    tv:[{ten:k.ten||c.ten||'', ns:k.ns||'', cccd:k.cccd||'', ncap:k.ncap||'', noiCap:k.noiCap||'', qh:'', sdt:c.sdt||''}], dung:0, sv:[]};
  if(c.voChong) o.tv.push({ten:c.voChong, ns:'', cccd:'', ncap:'', noiCap:'', qh:'Vợ / chồng', sdt:''});   /* Mẫu 31 có tên vợ / chồng — gợi ý người thừa kế (ngày sinh, CCCD bổ sung khi in giấy UQ) */
  hmDs().unshift(o); luu(); return o;
}
function hmLayM31(kh){ var o = hmTuM31(kh); if(!o) return bao('Không thấy khách trên Mẫu 31.'); dongHop(); bao('Đã đưa '+hmTen(o)+' vào sổ hộ vay.'); hsoVe(); }
function hmLayTo(){   /* tích tổ viên của tổ đang chọn → đưa nhiều hộ vào sổ 1 lần */
  var ds = Array.prototype.filter.call(document.querySelectorAll('#hop-in .hm-m31-tick:checked'), function(e){ return true; }).map(function(e){ return e.value; });
  if(!ds.length) return bao('Tích tổ viên cần đưa vào sổ.'); ds.forEach(hmTuM31); dongHop(); bao('Đã đưa '+ds.length+' hộ vào sổ hộ vay.'); hsoVe(); }
function hmM31Hop(){
  var S = hsoCH(), t = KHO.to(S.to), tv = t && !toLaTT(t) ? hsoTVTo(t) : [], co = {}; hmDs().forEach(function(o){ if(o.kh) co[o.kh] = 1; });
  moHop('<div class="hop-tit">＋ Lấy hộ từ Mẫu 31</div><div class="hop-phu">Hộ cũ có mã KH; nhân thân, SĐT luôn đọc Mẫu 31 mới nhất. Tên vợ / chồng trên Mẫu 31 đưa vào làm người thừa kế (ngày sinh, CCCD bổ sung khi cần in giấy UQ).</div>'+
    hsoTuyO('Tìm tên / CCCD', '<input placeholder="gõ số CCCD hoặc họ tên" oninput="hmM31Tim(this.value)">')+'<div id="hm-m31-kq" class="hso-tim-kq"></div>'+
    (tv.length ? '<div class="nhan-nhom">Tổ viên tổ đang chọn ('+coChuHTML('Tổ '+(t.ten||t.ma))+')</div><div class="hso-tick-ds">'+tv.map(function(k){ return '<label><input type="checkbox" class="hm-m31-tick" value="'+coChuHTML(k.kh)+'"'+(co[k.kh] ? ' disabled' : '')+'> '+coChuHTML(k.ten)+(co[k.kh] ? ' <small>(đã có trong sổ)</small>' : '')+'</label>'; }).join('')+'</div>'+
      '<div class="hang-nut"><button class="nho chinh" onclick="hmLayTo()">＋ Đưa các hộ đã tích vào sổ</button></div>' : '<div class="sl-phu">Chọn 1 tổ ở khối LỌC ĐỊA BÀN để tích nhiều tổ viên 1 lần.</div>')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button></div>', true);
}
function hmM31Tim(q){ var o = document.getElementById('hm-m31-kq'); if(!o) return; q = String(q||'').trim(); if(q.length<2){ o.innerHTML = ''; return; }
  var ds = KHO.tim(q, 12);
  o.innerHTML = ds.length ? ds.map(function(r){ var c = KHO.danhBa(r.m) || {}; return '<button class="nho" onclick="hmLayM31(\''+r.m+'\')">'+coChuHTML(r.ten||c.ten||r.m)+' <small>'+coChuHTML([c.ns ? 'sinh '+String(c.ns).slice(0, 4) : '', c.cccd, c.tenThon, c.toTen ? 'tổ '+c.toTen : ''].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="sl-phu">Không thấy trên Mẫu 31 — dùng <b>＋ Hộ mới</b>.</div>'; }
function hmDongBo(o, B){   /* hộ → phiếu làm hồ sơ của hộ (1 phiếu / hộ, ghi đè — không lưu lịch sử): người vay, thành viên, tổ; hộ cũ đọc Mẫu 31 mới nhất */
  var n = o.tv[o.dung||0] || {}, c = o.kh ? KHO.danhBa(o.kh) : null, t = o.to ? KHO.to(o.to) : null, d = hsoCCCDDoc(n.cccd);
  if(c){ var k = KHO.khach(o.kh, t); n = Object.assign({}, n, {ten:k.ten||n.ten, ns:k.ns||n.ns, cccd:k.cccd||n.cccd, ncap:k.ncap||n.ncap, noiCap:k.noiCap||n.noiCap, sdt:c.sdt||n.sdt}); d = hsoCCCDDoc(n.cccd); }
  B.hoId = o.id; B.moi = !o.kh; B.kh = o.kh || ''; B.to = o.to || B.to || ''; if(t) B.toi = hsoTo(t);
  B.nv = Object.assign({}, B.nv||{}, {ten:n.ten||'', ns:n.ns||'', cccd:n.cccd||'', ncap:n.ncap||'', noiCap:n.noiCap || hsoNoiCapGY(n.ncap), sdt:n.sdt||'', gt:(c && c.gt) || (d ? d.gt : (B.nv||{}).gt), danToc:(c && c.danToc) || (B.nv||{}).danToc || 'Kinh',
    ap:hsoApTen({tenThon:o.tenThon || (t && t.tenThon)}) || '', tenXa:o.tenXa || (t && t.tenXa) || ''});
  if(typeof HM_THEM_KHOA!=='undefined'){ var n0 = o.tv[o.dung||0] || {}; HM_THEM_KHOA.forEach(function(k){ if(n0[k]!=null && n0[k]!=='') B.nv[k] = n0[k]; else if(k!=='gt' && k!=='danToc') delete B.nv[k]; }); }   /* 3.223 M2: trường thêm của người đứng tên (anh khai ưu tiên giới tính) */
  B.ho = o.tv.filter(function(x, i){ return i!==(o.dung||0) && x.ten; }).map(function(x){ var h = {ten:x.ten, ns:x.ns||'', cccd:x.cccd||'', qh:x.qh||''}; if(x.ncap) h.ncap = x.ncap; if(x.noiCu) h.noiCu = x.noiCu; return h; });   /* 3.223 M2: + ngày cấp, nơi cư trú (giấy UQ) */
  B.soNguoi = B.soNguoi || String(o.tv.length); B.chon = B.chon || {}; B.chon.tgtv = o.kh ? 0 : 1; B.kem = B.kem || {};
  var sv = hmSV(o).map(function(i){ return (o.tv[i]||{}).ten; }).filter(Boolean);
  if(sv.length){ B.pa = B.pa || {}; if(sv.indexOf(B.pa.sv)<0) B.pa.sv = sv[0]; }
}
function hmBo(o){   /* phiếu làm hồ sơ của hộ (tạo nếu chưa có) → đặt làm bộ đang chọn */
  var B = hsoBoDs().find(function(b){ return b.hoId===o.id; });
  if(!B){ B = hsoBoMoi(); if(hmSV(o).length) B.ct = 'HSSV'; }
  hmDongBo(o, B); hsoCH().boId = B.id; hsoBoLuu(); return B;
}
function hmLamHS(id, mau){ var o = hmTim(id); if(!o) return; hmBo(o); hsoChonMau(mau || '01td'); }
function hmChonHo(id){ if(!id){ hsoCH().boId = ''; luu(); hsoVe(); return; } hmLamHS(id, hsoMau().k); }
function hmLapHTML(ds, loc, nhom){   /* khung phải: bảng sổ hộ vay (in được) — 3.214: A4 ngang đủ cột; hộ cũ theo Mẫu 31 mới nhất (như khi in hồ sơ) */
  ds = ds || hmDs();
  var nw = ' style="white-space:nowrap"';
  return '<p class="c b s14">SỔ HỘ VAY</p><p class="c i s11">(khai báo trên máy — '+ngayVNsl(ngayISO(nay()))+(loc ? ' · '+coChuHTML(loc) : '')+')</p><p>&nbsp;</p>'+
    hsoBang('luoi s11', [4, 17, 8, 11, 8, 8, 9, 9, 9, 12, 4, 10], '<tr><td class="c b">STT</td><td class="c b">Người đứng tên vay</td><td class="c b">Ngày sinh</td><td class="c b">Số CCCD</td><td class="c b">Ngày cấp</td><td class="c b">Hạn CCCD</td><td class="c b">Số điện thoại</td><td class="c b">Mã KH</td><td class="c b">Tổ</td><td class="c b">Ấp · xã</td><td class="c b">Số người</td><td class="c b">HSSV</td></tr>'+
      (ds.length ? ds.map(function(o, i){ var n = hmNguoiDung(o).n, sv = hmSV(o).map(function(k){ return (o.tv[k]||{}).ten; }).filter(Boolean), m = hmSoThang(o);
        var dau = nhom && (!i || hmSoThang(ds[i-1])!==m) ? '<tr><td colspan="12" class="b">'+hmSoThangChu(m)+' ('+ds.filter(function(x){ return hmSoThang(x)===m; }).length+' hộ)</td></tr>' : '';   /* 3.227: nhóm theo tháng nhập */
        return dau+'<tr><td class="c">'+(i+1)+'</td><td>'+coChuHTML(n.ten||'')+'</td><td class="c"'+nw+'>'+(n.ns ? ngayVNsl(n.ns) : '')+'</td><td class="c"'+nw+'>'+coChuHTML(n.cccd||'')+'</td><td class="c"'+nw+'>'+(n.ncap ? ngayVNsl(n.ncap) : '')+'</td><td class="c">'+coChuHTML(hmHan(n))+'</td><td class="c"'+nw+'>'+coChuHTML(n.sdt||'')+'</td><td class="c"'+nw+'>'+coChuHTML(o.kh||'')+'</td><td>'+coChuHTML(hmToTen(o))+'</td><td>'+coChuHTML(hmDiaChiChu(o))+'</td><td class="c">'+o.tv.length+'</td><td>'+coChuHTML(sv.join(', '))+'</td></tr>'; }).join('')
        : '<tr><td colspan="12" class="c i">Chưa có hộ</td></tr>'));
}
var HM_O = '';   /* 3.214: ô cần đặt con trỏ sau khi vẽ lại form (data-hm) */
function hmMo(id, db){   /* db: địa bàn giữ lại khi "Lưu & thêm hộ tiếp" */
  var o = id ? hmTim(id) : null;
  HM = o ? JSON.parse(JSON.stringify(o)) : {id:'', kh:'', to:'', xa:'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'', tv:[hmNguoi()], dung:0, sv:[]};
  HM.sv = hmSV(HM).slice(); delete HM.hssv; if(typeof HM_THEM_MO!=='undefined') HM_THEM_MO = {};
  if(!o && db) Object.assign(HM, db);
  else if(!o){ var S = hsoCH(), t = KHO.to(S.to); if(t && !toLaTT(t)){ HM.xa = t.xa||''; HM.tenXa = t.tenXa||''; HM.diem = t.khoaDiem||''; HM.tenDiem = t.tenDiem||''; HM.thon = t.thon||''; HM.tenThon = t.tenThon||''; HM.to = t.ma; } else if(S.xa && KHO.coKy()){ var X = hmDiaBan()[S.xa]; if(X){ HM.xa = X.xa; HM.tenXa = X.tenXa; } } }   /* gợi ý địa bàn, tổ theo khối lọc */
  var dau = ['ten', 'ns', 'cccd', 'ncap'], n0 = HM.tv[HM.dung||0] || {}, f0 = dau.find(function(f){ return !n0[f]; });   /* 3.214: con trỏ ở ô đầu còn trống của người đứng tên */
  HM_O = (HM.dung||0)+':'+(f0 || 'ten');
  hmVe(); if(typeof khNap==='function') khNap(khVeForm);
}
function hmDsTo(){ if(!KHO.coKy() || !HM.xa) return []; return KHO.maTo().map(function(m){ return KHO.to(m); }).filter(function(t){ return t && !toLaTT(t) && t.xa===HM.xa && (!HM.diem || t.khoaDiem===HM.diem) && (!(HM.thon||HM.tenThon) || t.thon===HM.thon || t.tenThon===HM.tenThon); })
  .sort(function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi'); }); }
function hmVe(){
  var X = hmDiaBan(), x = X[HM.xa], coDB = Object.keys(X).length;
  var a = document.activeElement, giu = HM_O || (a && a.closest && a.closest('#hop-in') && a.getAttribute('data-hm')) || ''; HM_O = '';   /* 3.214: vẽ lại không mất con trỏ */
  var dsTo = hmDsTo();
  var dc = coDB ? '<div class="hm-dc">'+
      CAY.dong([CAY.o('xa', HM.xa, '— Xã / phường —', CAY.dsXa(), 'data-hm="xa" onchange="hmDatXa(this.value)"'),   /* 3.326: cây địa bàn nhúng dùng chung (js/57) */
        x ? CAY.o('diem', HM.diem, '— Điểm GD (lọc ấp, không bắt buộc) —', CAY.dsDiem(HM.xa).map(function(d){ return [d[0], 'Điểm '+d[1]]; }), 'data-hm="diem" onchange="hmDatDiem(this.value)"') : '',
        x ? CAY.o('ap', HM.thon || HM.tenThon, '— Ấp / khu phố —', CAY.dsAp(HM.xa, HM.diem), 'data-hm="ap" onchange="hmDatAp(this.value)"') : '',
        x ? CAY.o('to', HM.to, '— Tổ TK&VV ('+dsTo.length+') —', dsTo.map(function(t){ return [t.ma, CAY.chuTo(t)]; }), 'data-hm="to" onchange="HM.to=this.value;hmVe()"') : ''])+'</div>'
    : '<div class="hm-dc"><input data-hm="tenXa" placeholder="Xã / phường" value="'+coChuHTML(HM.tenXa)+'" onchange="HM.tenXa=this.value"><input data-hm="tenThon" placeholder="Ấp / khu phố" value="'+coChuHTML(HM.tenThon)+'" onchange="HM.tenThon=this.value"></div>';
  /* 3.214 (anh 15/10): mỗi người 1 dòng lưới có tiêu đề cột — Enter / Tab sang ô kế (phím chung), gõ xong không vẽ lại cả hộp */
  var nguoi = HM.tv.map(function(n, i){ var o = function(f, ph){ return '<input data-hm="'+i+':'+f+'" value="'+coChuHTML(hmGiaTri(n, f))+'" placeholder="'+ph+'" onchange="hmDat('+i+',\''+f+'\',this.value,this)">'; };
    return '<div class="hm-nguoi'+(i===HM.dung ? ' dung' : '')+'"><div class="hm-luoi"><b>'+(i+1)+'</b>'+'<span class="qc-o">'+o('ten', 'Họ tên')+(typeof qcNut==='function' ? qcNut('hm', i) : '')+'</span>'+o('ns', 'gõ 150378')+o('cccd', '12 số')+o('ncap', 'gõ 9112021')+o('sdt', 'Số điện thoại')+
      (i ? o('qh', 'Quan hệ') : '<span class="hm-qh">Chủ hộ</span>')+
      '<label class="hm-o-c" title="Người đứng tên vay"><input type="radio" name="hm-dung"'+(i===HM.dung ? ' checked' : '')+' onchange="HM.dung='+i+';hmVe()"></label>'+
      '<label class="hm-o-c" title="Học sinh, sinh viên vay HSSV"><input type="checkbox"'+(HM.sv.indexOf(i)>=0 ? ' checked' : '')+' onchange="hmDatSV('+i+',this.checked)"></label>'+
      (i ? '<button class="nho" title="Bỏ người này" onclick="hmBoNguoi('+i+')">✕</button>' : '<span></span>')+'</div>'+
      '<div class="sl-phu hm-suy" id="hm-suy-'+i+'">'+hmSuyHTML(n, i===HM.dung)+'</div>'+(typeof hmThemHTML==='function' ? hmThemHTML(i, n) : '')+'</div>'; }).join('');   /* 3.223 M2: ➕ thông tin thêm */
  var dau = '<div class="hm-luoi hm-luoi-dau"><span>#</span><span>Họ và tên</span><span>Ngày sinh</span><span>Số CCCD</span><span>Ngày cấp CCCD</span><span>Số điện thoại</span><span>Quan hệ</span><span>Đứng tên</span><span>HSSV</span><span></span></div>';
  moHop('<div class="hop-tit">👪 '+(HM.id ? 'Sửa hộ vay' : 'Khai báo hộ vay mới')+(HM.kh ? ' <small>· mã KH '+coChuHTML(HM.kh)+' (Mẫu 31)</small>' : '')+'</div><div class="hop-phu">Chỉ bắt buộc <b>người đứng tên vay</b>; thành viên / thừa kế, HSSV bổ sung khi cần (giấy UQ mới cần đủ thừa kế). Ngày gõ liền số (150378 = 15/03/1978).'+(HM.kh ? ' Hộ cũ: nhân thân in theo Mẫu 31 mới nhất.' : '')+'</div>'+
    '<div class="nhan-nhom">📍 Địa chỉ · tổ</div>'+dc+'<div class="nhan-nhom">👪 Người trong hộ</div>'+dau+nguoi+
    '<div class="hang-nut"><button class="nho" onclick="hmThemNguoi()">＋ Thành viên / thừa kế / HSSV</button></div>'+
    (typeof khFormHTML==='function' ? '<div class="nhan-nhom">🔎 Kiểm tra <small>(<a href="#" data-lenh="kh.luat">⚙ khai báo luật</a> — mở chồng, đóng là về form hộ)</small></div><div id="hm-kiem" class="hm-kiem">'+khFormHTML()+'</div>' : '')+
    '<div class="sl-phu hm-phim">⌨ Enter / Tab sang ô kế · Shift+Enter lùi · ↑ ↓ đổi lựa chọn ô chọn · <b>Ctrl+Enter lưu</b></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho" onclick="hmLuu(1)" title="Lưu rồi mở form trống cùng địa bàn, tổ — nhập liên tục nhiều hộ">💾 Lưu &amp; thêm hộ tiếp</button><button class="nho chinh" onclick="hmLuu()">💾 Lưu hộ</button></div>', true);
  document.getElementById('hop-in').classList.add('phim-chung');
  if(giu){ var e = document.querySelector('#hop-in [data-hm="'+giu+'"]'); if(e){ e.focus(); if(e.select && e.tagName==='INPUT' && !e.value) e.select(); } }
}
function hmThemNguoi(){ HM.tv.push(hmNguoi()); HM_O = (HM.tv.length-1)+':ten'; hmVe(); }
function hmGiaTri(n, f){ return (f==='ns' || f==='ncap') ? (n[f] ? ngayVNsl(n[f]) : '') : (n[f]||''); }
function hmDocNgay(v){ return typeof gdxDocNgay==='function' ? gdxDocNgay(v) : hsoNgayTu(v); }   /* gõ dd/mm/yyyy hoặc liền số → yyyy-mm-dd */
function hmChuan(n, f, v){   /* 3.214: chuẩn hóa 1 ô người — dùng chung form hộ + bảng 📒 Sổ hộ vay */
  v = String(v||'').trim();
  if(f==='ns' || f==='ncap'){ var iso = hmDocNgay(v); n[f] = iso || ''; if(v && !iso) bao('Ngày chưa đọc được: '+v+' — gõ dd/mm/yyyy hoặc liền số (150378).'); }
  else if(f==='cccd') n.cccd = v.replace(/\D/g, '');
  else if(f==='sdt') n.sdt = v.replace(/[^\d+ ]/g, '').trim();
  else if(f==='ten') n.ten = tenHoaDau(v.replace(/\s+/g, ' '));
  else n[f] = v;
  if(f==='ncap') n.noiCap = hsoNoiCapGY(n.ncap);
}
function hmDatSV(i, v){ var k = HM.sv.indexOf(i); if(v && k<0) HM.sv.push(i); if(!v && k>=0) HM.sv.splice(k, 1); hmVe(); }
function hmDat(i, f, v, el){   /* 3.214: không vẽ lại cả hộp — chỉ sửa ô + dòng gợi ý (giữ con trỏ khi Enter / Tab) */
  var n = HM.tv[i]; if(!n) return;
  hmChuan(n, f, v);
  el = el || document.querySelector('#hop-in [data-hm="'+i+':'+f+'"]'); if(el && el.value!==hmGiaTri(n, f)) el.value = hmGiaTri(n, f);
  var g = document.getElementById('hm-suy-'+i); if(g) g.innerHTML = hmSuyHTML(n, i===HM.dung);
  if(typeof khVeForm==='function') khVeForm();   /* 3.228: 🔎 kiểm tra lại khi rời ô */
}
function hmBoNguoi(i){ HM.tv.splice(i, 1); if(HM.dung>=HM.tv.length || HM.dung===i) HM.dung = 0; else if(HM.dung>i) HM.dung--; HM.sv = HM.sv.filter(function(k){ return k!==i; }).map(function(k){ return k>i ? k-1 : k; }); hmVe(); }
function hmDatXa(v){ var x = hmDiaBan()[v]; HM.xa = v; HM.tenXa = x ? x.tenXa : ''; HM.diem = ''; HM.tenDiem = ''; HM.thon = ''; HM.tenThon = ''; HM.to = ''; hmVe(); }
function hmDatDiem(v){ var x = hmDiaBan()[HM.xa]; HM.diem = v; HM.tenDiem = x && v ? x.diem[v] : ''; HM.to = ''; hmVe(); }
function hmDatAp(v){ var x = hmDiaBan()[HM.xa], a = x && x.ap[v]; HM.thon = a ? a.thon : ''; HM.tenThon = a ? a.tenThon : ''; var ds = hmDsTo(); if(!ds.some(function(t){ return t.ma===HM.to; })) HM.to = ds.length===1 ? ds[0].ma : ''; hmVe(); }
function hmLuu(tiep){
  var n = HM.tv[HM.dung||0] || {}; if(!String(n.ten||'').trim()) return bao('Nhập họ tên người đứng tên vay.');
  var so = String(n.cccd||'').replace(/\D/g, ''), trung = so && hmDs().find(function(x){ var m = x.tv[x.dung||0] || {}; return x.id!==HM.id && String(m.cccd||'').replace(/\D/g, '')===so; });
  if(trung){ bao('CCCD '+so+' đã có trong sổ ('+hmTen(trung)+') — mở hộ đã có.', 5); hmMo(trung.id); return; }
  var chan = typeof khKiem==='function' ? khKiem(HM).filter(function(x){ return x.muc==='chan'; }) : [];   /* 3.228: luật 🔴 chặn lưu */
  if(chan.length){ khVeForm(); return bao('🔴 Chưa lưu được: '+chan.map(function(x){ return x.chu; }).join('; '), 8); }
  var giu = HM.tv.map(function(x, i){ return i===HM.dung || HM.sv.indexOf(i)>=0 || String(x.ten||'').trim() ? i : -1; }).filter(function(i){ return i>=0; });
  var dung = giu.indexOf(HM.dung); HM.sv = HM.sv.map(function(i){ return giu.indexOf(i); }).filter(function(i){ return i>=0; }); HM.tv = giu.map(function(i){ return HM.tv[i]; }); HM.dung = dung<0 ? 0 : dung;
  if(!HM.kh){ var m = hmM31(HM.tv[HM.dung].cccd); if(m){ HM.kh = m; if(!HM.to) HM.to = (KHO.danhBa(m)||{}).to || ''; } }
  var ds = hmDs(); HM.sua = new Date().toISOString();
  if(!HM.id){ HM.id = 'hm'+Date.now().toString(36); HM.tao = HM.sua; ds.unshift(HM); } else { var i = ds.findIndex(function(x){ return x.id===HM.id; }); if(i>=0) ds[i] = HM; else ds.unshift(HM); }
  var B = hsoBoDs().find(function(b){ return b.hoId===HM.id; }); if(B) hmDongBo(HM, B);
  var db = {xa:HM.xa, tenXa:HM.tenXa, diem:HM.diem, tenDiem:HM.tenDiem, thon:HM.thon, tenThon:HM.tenThon, to:HM.to};
  luu(); dongHop(); bao('Đã lưu hộ '+hmTen(HM)+' vào sổ hộ vay.'); HM = null; hsoVe();
  if(tiep) hmMo(null, db);   /* 3.214: nhập liên tục — giữ xã, điểm, ấp, tổ */
}
function hmXoa(id){ var o = hmTim(id); if(!o) return; hoi('Xóa hộ '+hmTen(o)+' khỏi sổ hộ vay?', 'Không ảnh hưởng số liệu Mẫu 31.', 'Xóa', function(){ var ds = hmDs(), i = ds.indexOf(o); if(i>=0) ds.splice(i, 1); hsoBoDs().forEach(function(b){ if(b.hoId===id) delete b.hoId; }); luu(); hsoVe(); }); }
/* ---------- 3.214 (anh 15/10): 📒 SỔ HỘ VAY — tab xem lại: lọc, sắp xếp, sửa thẳng từng ô (hộ mới), in đúng danh sách đang lọc ---------- */
var HM_SO = {q:'', loai:'', mau:'', tu:'', den:'', nhom:1, gon:{}};   /* 3.227 (anh 17/10): + địa bàn theo khối LỌC ĐỊA BÀN, ngày nhập từ / đến, nhóm theo tháng (gon: tháng đang gập) */
function hmNgayNhap(o){ var d = o.tao ? new Date(o.tao) : null; return d && !isNaN(d) ? ngayISO(d) : ''; }   /* ngày đưa hộ vào sổ (giờ máy, không lệch múi giờ) */
function hmSoThang(o){ return hmNgayNhap(o).slice(0, 7); }
function hmSoThangChu(m){ return m ? 'Tháng '+m.slice(5, 7)+'/'+m.slice(0, 4) : 'Chưa rõ ngày nhập'; }
function hmTrongDB(o, S){   /* 3.227: hộ thuộc địa bàn đang chọn — có tổ: theo tổ (Xã › Điểm · Hội › Tổ); chưa có tổ: theo xã / điểm đã khai */
  if(!KHO.coKy() || !(S.xa || S.hoi)) return true;
  var t = o.to ? KHO.to(o.to) : null; if(t) return pvLoc(S, t);
  if(!o.to && !o.xa) return true;   /* 3.234: hộ nhập trước 3.227 / chưa khai địa bàn → luôn hiện (không "mất" hộ), cột Cần bổ sung nhắc khai tổ */
  if(S.hoi || S.to) return false;
  return o.xa===S.xa && (!S.diem || o.diem===S.diem);
}
function hmSoKhoangTinh(k){   /* nút nhanh ngày nhập → [từ, đến] */
  var n = nay(), y = n.getFullYear(), m = n.getMonth(), q = m-m%3;
  var r = k==='thang' ? [new Date(y, m, 1), new Date(y, m+1, 0)] : k==='truoc' ? [new Date(y, m-1, 1), new Date(y, m, 0)] : k==='quy' ? [new Date(y, q, 1), new Date(y, q+3, 0)] : k==='nam' ? [new Date(y, 0, 1), new Date(y, 11, 31)] : null;
  return r ? r.map(ngayISO) : ['', ''];
}
function hmSoKhoang(k){ var r = hmSoKhoangTinh(k); HM_SO.tu = r[0]; HM_SO.den = r[1]; hsoVe(); }
function hmSoNgay(f, v){ v = String(v||'').trim(); var iso = v ? hmDocNgay(v) : ''; if(v && !iso) return bao('Ngày chưa đọc được: '+v+' — gõ dd/mm/yyyy hoặc liền số (1102026).'); HM_SO[f] = iso; hsoVe(); }
function hmSoGon(m){ HM_SO.gon[m] = !HM_SO.gon[m]; hmSoVeBang(); }
function hmSoTick(id, v){ if(v) HM_CHON[id] = true; else delete HM_CHON[id]; hmSoVeNut(); }
function hmSoTickThang(m, v){ hmSoDs().forEach(function(r){ if(hmSoThang(r.o)===m){ if(v) HM_CHON[r.o.id] = true; else delete HM_CHON[r.o.id]; } }); hmSoVeBang(); }
function hmSoNutChonHTML(){ var n = hmDs().filter(function(o){ return HM_CHON[o.id]; }).length;
  return n ? '<button class="nho chinh" onclick="hsoD03TuChon()" title="Cùng 1 chương trình in chung 1 mẫu 03/TD">📋 Lập 03/TD ('+n+' hộ)</button><button class="nho" onclick="HM_CHON={};hmSoVeBang()" title="Bỏ tích tất cả">✕ Bỏ chọn</button>'
    : '<span class="sl-phu">☐ tích hộ → 📋 Lập 03/TD</span>'; }
function hmSoVeNut(){ var e = document.getElementById('hm-so-chon'); if(e) e.innerHTML = hmSoNutChonHTML(); }
function hmSoSX(){ var L = hsoLuu(); return L.soSX || {k:'tao', xuoi:0}; }
function hmNguoiDung(o){   /* người đứng tên: hộ cũ đọc Mẫu 31 mới nhất (như khi in hồ sơ), hộ mới theo sổ */
  var n = o.tv[o.dung||0] || {}, c = o.kh ? KHO.danhBa(o.kh) : null;   /* 3.216: qua cửa KHO */
  if(!c) return {n:n, m31:false};
  var t = o.to ? KHO.to(o.to) : null, k = KHO.khach(o.kh, t);
  return {n:{ten:k.ten||n.ten, ns:k.ns||n.ns, cccd:k.cccd||n.cccd, ncap:k.ncap||n.ncap, noiCap:k.noiCap||n.noiCap, sdt:c.sdt||n.sdt}, m31:true};
}
function hmHan(n){ var so = String(n.cccd||'').replace(/\D/g, ''); if(so.length!==12 || !n.ns || !n.ncap || typeof toCCCDHan!=='function') return ''; var h = toCCCDHan(so, n.ns, n.ncap); return h.den ? ngayVNsl(h.den) : (h.chu||''); }
function hmThieu(o, n){   /* còn thiếu / cần sửa trước khi in hồ sơ */
  var r = [], so = String(n.cccd||'').replace(/\D/g, '');
  if(!so) r.push('CCCD'); else if(so.length!==12) r.push('CCCD '+so.length+' số');
  if(!n.ns) r.push('ngày sinh'); if(!n.ncap) r.push('ngày cấp');
  if(!o.to && !o.tenThon) r.push('địa chỉ / tổ');
  if(so.length===12 && n.ns && n.ncap && typeof toCCCDHan==='function'){ var h = toCCCDHan(so, n.ns, n.ncap); if(h.kq==='het') r.push('CCCD hết hạn'); else if(h.kq==='sap') r.push('CCCD sắp hết hạn'); }
  return r;
}
function hmSoDs(){
  hmChuyenCu(); hmGanMa();
  var q = slChuan(HM_SO.q), S = hmSoSX(), d = S.xuoi ? 1 : -1, P = hsoCH();
  var ds = hmDs().map(function(o, i){ var x = hmNguoiDung(o); return {o:o, n:x.n, m31:x.m31, thieu:hmThieu(o, x.n), thu:i, kiem:typeof khKiem==='function' ? khKiem(o) : []}; }).filter(function(r){ var o = r.o, ng = hmNgayNhap(o);
    if(HM_SO.loai==='cu' && !o.kh || HM_SO.loai==='moi' && o.kh || HM_SO.loai==='sv' && !hmSV(o).length || HM_SO.loai==='thieu' && !r.thieu.length || HM_SO.loai==='chuaTo' && o.to || HM_SO.loai==='canh' && !khCon(o, r.kiem).length) return false;
    if(!hmTrongDB(o, P)) return false;
    if(HM_SO.tu && (!ng || ng<HM_SO.tu) || HM_SO.den && (!ng || ng>HM_SO.den)) return false;
    if(HM_SO.mau && typeof hmThieuMau==='function' && !hmThieuMau(o, r.n)[HM_SO.mau]) return false;   /* 3.223 M2: lọc thiếu cho mẫu */
    return !q || slChuan([o.kh, hmToTen(o), hmDiaChiChu(o), r.n.ten, r.n.cccd].concat(o.tv.map(function(n){ return n.ten+' '+n.cccd; })).join(' ')).indexOf(q)>=0; });
  var key = function(r){ var o = r.o, ten = slChuan(r.n.ten||'');
    if(S.k==='ten') return ten.split(' ').pop()+' '+ten;   /* xếp theo tên (chữ cuối) như sổ sách */
    if(S.k==='ns') return r.n.ns || '';
    if(S.k==='to') return slChuan(hmToTen(o)+' '+hmDiaChiChu(o))+' '+ten;
    if(S.k==='sua') return o.sua || o.tao || '';
    return r.o.tao || ''; };   /* 'tao': ngày nhập vào sổ (cùng lúc → thứ tự trong sổ) */
  var dT = S.k==='tao' ? d : -1;   /* nhóm tháng: tháng mới trước (trừ khi đang xếp ngày nhập tăng dần) */
  return ds.sort(function(a, b){ if(HM_SO.nhom){ var ta = hmSoThang(a.o), tb = hmSoThang(b.o); if(ta!==tb) return !ta ? 1 : !tb ? -1 : ta<tb ? -dT : dT; }
    var x = key(a), y = key(b); return x<y ? -d : x>y ? d : a.thu-b.thu; });
}
function hmSoLocChu(){ var r = [], L = {cu:'hộ cũ', moi:'hộ mới', sv:'có HSSV', thieu:'thiếu / cần sửa', chuaTo:'chưa có tổ', canh:'có cảnh báo kiểm tra'}, P = hsoCH();
  if(KHO.coKy() && (P.xa || P.hoi)) r.push(pvChu(P, PV_DUNG.hsv.K()));
  if(HM_SO.loai) r.push(L[HM_SO.loai]);
  if(HM_SO.tu || HM_SO.den) r.push('ngày nhập'+(HM_SO.tu ? ' từ '+ngayVNsl(HM_SO.tu) : '')+(HM_SO.den ? ' đến '+ngayVNsl(HM_SO.den) : ''));
  if(HM_SO.q) r.push('tìm "'+HM_SO.q+'"');
  return r.length ? 'lọc: '+r.join(', ') : ''; }
function hmSoSapXep(k){ var S = hmSoSX(); if(S.k===k) S.xuoi = S.xuoi ? 0 : 1; else { S.k = k; S.xuoi = (k==='tao' || k==='sua') ? 0 : 1; } hsoLuu().soSX = S; luu(); hsoVe(); }
function hmSoBangHTML(ds){
  var S = hmSoSX(), COT = 15, dem = {}, h = '', stt = 0, thang = null;
  var th = function(k, chu){ var on = k && S.k===k; return '<th'+(k ? ' class="hm-so-sx'+(on ? ' on' : '')+'" onclick="hmSoSapXep(\''+k+'\')" title="Bấm để sắp xếp (bấm lại: đảo chiều)"' : '')+'>'+chu+(on ? (S.xuoi ? ' ▲' : ' ▼') : '')+'</th>'; };
  var o5 = function(r, f, ph){ var v = coChuHTML(hmGiaTri(r.n, f));
    return r.m31 ? '<td class="hm-so-m31" title="Hộ cũ — theo Mẫu 31 mới nhất (sửa ở hệ thống, nạp lại Mẫu 31)">'+(v || '—')+'</td>'
      : '<td><input data-so="'+f+'" value="'+v+'" placeholder="'+ph+'" onchange="hmSoSua(\''+r.o.id+'\',\''+f+'\',this)" onkeydown="hmSoPhim(event)"></td>'; };
  if(HM_SO.nhom) ds.forEach(function(r){ var m = hmSoThang(r.o); (dem[m] = dem[m] || []).push(r.o.id); });
  ds.forEach(function(r){ var o = r.o, m = hmSoThang(o), sv = hmSV(o).map(function(k){ return (o.tv[k]||{}).ten; }).filter(Boolean);
    if(HM_SO.nhom && m!==thang){ thang = m; var gon = HM_SO.gon[m], du = dem[m].every(function(id){ return HM_CHON[id]; });   /* 3.227: dòng tiêu đề tháng — bấm để gập / mở, ô tích cả tháng */
      h += '<tr class="hm-so-thang"><td class="c"><input type="checkbox" title="Tích / bỏ cả tháng (lập 03/TD)"'+(du ? ' checked' : '')+' onchange="hmSoTickThang(\''+m+'\',this.checked)"></td>'+
        '<td colspan="'+(COT-1)+'" onclick="hmSoGon(\''+m+'\')" title="Bấm để '+(gon ? 'mở' : 'gập')+' tháng này">'+(gon ? '▸' : '▾')+' <b>'+hmSoThangChu(m)+'</b> · '+dem[m].length+' hộ</td></tr>'; }
    if(HM_SO.nhom && HM_SO.gon[m]) return;
    h += '<tr data-id="'+o.id+'"'+(r.thieu.length ? ' class="hm-so-thieu"' : '')+'><td class="c"><input type="checkbox" class="hm-chon" title="Tích để lập 03/TD nhiều hộ"'+(HM_CHON[o.id] ? ' checked' : '')+' onchange="hmSoTick(\''+o.id+'\',this.checked)"></td>'+
      '<td class="c">'+(++stt)+'</td><td class="c hm-so-han">'+(hmNgayNhap(o) ? ngayVNsl(hmNgayNhap(o)) : '—')+'</td>'+
      '<td class="hm-nut"><button class="nho" onclick="hmMo(\''+o.id+'\')" title="Sửa đầy đủ: địa chỉ, tổ, thành viên / thừa kế, HSSV">✎</button><button class="nho chinh" onclick="hmLamHS(\''+o.id+'\')" title="In hồ sơ (01/TD, in kèm…)">📄</button><button class="nho" onclick="hmXoa(\''+o.id+'\')" title="Xóa khỏi sổ">🗑</button></td>'+o5(r, 'ten', 'Họ tên')+o5(r, 'ns', '150378')+o5(r, 'cccd', '12 số')+o5(r, 'ncap', '9112021')+
      '<td class="hm-so-han">'+coChuHTML(hmHan(r.n))+'</td>'+o5(r, 'sdt', '')+
      '<td>'+(o.kh ? '<span class="hm-m31">'+coChuHTML(o.kh)+'</span>' : '<span class="hm-moi">hộ mới</span>')+'</td>'+
      '<td>'+coChuHTML([hmToTen(o), hmDiaChiChu(o)].filter(Boolean).join(' · ') || '—')+'</td><td class="c">'+o.tv.length+'</td><td>'+coChuHTML(sv.join(', '))+'</td>'+
      '<td class="hm-so-lt">'+hmSoLtHTML(r)+'</td></tr>'; });
  return '<table class="hm-so"><colgroup><col style="width:30px"><col style="width:36px"><col style="width:84px"><col style="width:132px"><col style="width:165px"><col style="width:90px"><col style="width:112px"><col style="width:90px"><col style="width:104px"><col style="width:100px"><col style="width:94px"><col style="width:165px"><col style="width:44px"><col style="width:100px"><col style="width:130px"></colgroup>'+
    '<thead><tr>'+th('', '')+th('', 'STT')+th('tao', 'Ngày nhập')+th('', '')+th('ten', 'Người đứng tên vay')+th('ns', 'Ngày sinh')+th('', 'Số CCCD')+th('', 'Ngày cấp')+th('', 'Hạn CCCD')+th('', 'Số điện thoại')+th('', 'Mã KH')+th('to', 'Tổ · địa chỉ')+th('', 'Người')+th('', 'HSSV')+th('', 'Cần bổ sung')+'</tr></thead><tbody>'+
    (ds.length ? h : '<tr><td colspan="'+COT+'" class="c sl-phu hm-so-trong">'+(hmDs().length ? 'Không có hộ khớp bộ lọc ('+hmDs().length+' hộ trong sổ'+(hmSoLocChu() ? ' · '+coChuHTML(hmSoLocChu()) : '')+').'+
      GD.nut({chu:'✕ Bỏ lọc', lenh:'so.boLoc', tit:'Bỏ lọc loại hộ, ngày nhập, ô tìm, thiếu cho mẫu (địa bàn chọn lại ở khối LỌC ĐỊA BÀN)'}) : 'Sổ trống — ＋ Hộ mới hoặc ＋ Lấy từ Mẫu 31.')+'</td></tr>')+'</tbody></table>';
}
function hmSoLtHTML(r){ var o = r.o;   /* ô Cần bổ sung: thiếu thông tin · thiếu cho mẫu · 🔎 cảnh báo kiểm tra (3.228) */
  return (r.thieu.length ? '⚠ '+coChuHTML(r.thieu.join(', ')) : '✓')+(typeof hmThieuMauChu==='function' && hmThieuMauChu(o, r.n, HM_SO.mau) ? '<div class="hm-so-mau">'+coChuHTML(hmThieuMauChu(o, r.n, HM_SO.mau))+'</div>' : '')+(typeof khSoHTML==='function' ? khSoHTML(o, r.kiem) : ''); }
function hmSoDemChu(ds){ var n = hmDs().length; return ds.length+(ds.length!==n ? ' / '+n : '')+' hộ'; }
function hsoXemHop(){ var x = HSO.x; if(!x) return;   /* 3.238: ⤢ Phóng to khi khung xem đang ẩn (Sổ hộ vay) → xem bản in trong hộp rộng */
  moHop('<div class="hop-tit">👁 '+coChuHTML(x.ten || 'Xem bản in')+'</div><iframe id="hso-khung2" class="to-khung" title="Xem"></iframe>'+
    GD.hang([GD.nut({chu:'Đóng (Esc)', lenh:'hso.dong'}), GD.nut({chu:'🖨 In', lenh:'hso.in', chinh:1})]), true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong'); xemChuan(document.getElementById('hso-khung2'), x.trang); }
function hmSoDangKy(){ if(hmSoDangKy.xong || typeof GD==='undefined') return; hmSoDangKy.xong = 1;   /* 3.234 (R2): lệnh của thanh lọc sổ — data-lenh="so.…" */
  GD.dangKy('hso', {dong:function(){ dongHop(); }, in:function(){ dongHop(); xuatIn(); }});
  GD.dangKy('so', {boLoc:function(){ HM_SO.loai = ''; HM_SO.q = ''; HM_SO.mau = ''; HM_SO.tu = ''; HM_SO.den = ''; hsoVe(); }, moi:function(){ hmMo(); }, m31:function(){ hmM31Hop(); }, loai:function(el){ HM_SO.loai = el.getAttribute('data-k'); hsoVe(); },
    khoang:function(el){ hmSoKhoang(el.getAttribute('data-k')); }, ngay:function(el){ hmSoNgay(el.getAttribute('data-f'), el.value); },
    tim:function(el){ HM_SO.q = el.value; hmSoVeBang(); }, mau:function(el){ HM_SO.mau = el.value; hsoVe(); }, sx:function(el){ hmSoSapXep(el.value || el.getAttribute('data-k')); },
    nhom:function(el){ HM_SO.nhom = el.checked ? 1 : 0; hmSoVeBang(); }});
}
function hmSoHTML(){
  hmSoDangKy();
  var ds = hmSoDs(), nThieu = 0, nChuaTo = 0, nCanh = 0, S = hmSoSX();
  hmDs().forEach(function(o){ if(!o.to) nChuaTo++; if(hmThieu(o, hmNguoiDung(o).n).length) nThieu++; if(typeof khCon==='function' && khCon(o).length) nCanh++; });
  if(typeof khNap==='function') khNap(hmSoVeBang);   /* món Mẫu 31 mới nhất cho 🔎 kiểm tra (nạp 1 lần) */
  var chip = function(k, chu){ return GD.chip(chu, HM_SO.loai===k, 'so.loai', {k:k}).replace('gd-chip', 'gd-chip hm-so-chip'); };
  var kh = function(k, chu){ var r = hmSoKhoangTinh(k); return GD.chip(chu, HM_SO.tu===r[0] && HM_SO.den===r[1], 'so.khoang', {k:k}).replace('gd-chip', 'gd-chip hm-so-chip'); };
  var ngay = function(f, ph){ return GD.o({loai:'ngay', gt:HM_SO[f] ? ngayVNsl(HM_SO[f]) : '', ph:ph, lenh:'so.ngay', du:{f:f}}).replace('gd-o ', 'gd-o hm-so-ngay '); };
  var chon = function(lenh, tit, ops, gt){ return '<select data-lenh="'+lenh+'" data-su="change" title="'+tit+'">'+ops.map(function(x){ return '<option value="'+x[0]+'"'+(gt===x[0] ? ' selected' : '')+'>'+x[1]+'</option>'; }).join('')+'</select>'; };
  return '<div class="nhan-nhom">📒 Sổ hộ vay — <span id="hm-so-dem">'+hmSoDemChu(ds)+'</span></div>'+
    '<div class="hang-nut hm-so-loc">'+GD.nut({chu:'＋ Hộ mới', lenh:'so.moi', chinh:1})+GD.nut({chu:'📥 Lấy từ Mẫu 31', lenh:'so.m31'})+'<span id="hm-so-chon" class="hm-so-chon">'+hmSoNutChonHTML()+'</span>'+
      GD.o({loai:'tim', id:'hm-so-tim', gt:HM_SO.q, ph:'Tìm tên / CCCD / mã KH / ấp', lenh:'so.tim', su:'input'}).replace('gd-o ', 'gd-o hm-tim ')+
      (typeof HM_MAU_TEN!=='undefined' ? chon('so.mau', 'Chỉ hiện hộ còn thiếu thông tin cho mẫu', [['', 'Thiếu cho mẫu: —']].concat(Object.keys(HM_MAU_TEN).map(function(m){ return [m, 'Thiếu cho '+HM_MAU_TEN[m]]; })), HM_SO.mau) : '')+   /* 3.223 M2 */
      chon('so.sx', 'Sắp xếp', [['tao', '↕ Ngày nhập'], ['ten', '↕ Tên A → Z'], ['ns', '↕ Ngày sinh'], ['to', '↕ Tổ · ấp'], ['sua', '↕ Mới sửa trước']], S.k)+
      GD.nut({chu:S.xuoi ? '▲ Tăng' : '▼ Giảm', lenh:'so.sx', du:{k:S.k}, tit:'Đảo chiều sắp xếp'})+'</div>'+
    '<div class="hang-nut hm-so-loc"><span class="pv-nhan">Ngày nhập</span>'+kh('', 'Tất cả')+kh('thang', 'Tháng này')+kh('truoc', 'Tháng trước')+kh('quy', 'Quý này')+kh('nam', 'Năm nay')+
      ngay('tu', 'từ ngày')+ngay('den', 'đến ngày')+
      '<label class="hso-o2" title="Nhóm các hộ theo tháng nhập vào sổ — bấm dòng tháng để gập / mở"><input type="checkbox" data-lenh="so.nhom" data-su="change"'+(HM_SO.nhom ? ' checked' : '')+'> Nhóm theo tháng</label></div>'+
    '<div class="hang-nut">'+chip('', 'Tất cả')+chip('cu', 'Hộ cũ (mã KH)')+chip('moi', 'Hộ mới')+chip('sv', 'Có HSSV')+chip('thieu', '⚠ Cần bổ sung ('+nThieu+')')+chip('chuaTo', 'Chưa có tổ ('+nChuaTo+')')+chip('canh', '🔎 Có cảnh báo ('+nCanh+')')+'</div>'+
    '<div class="sl-phu">Lọc <b>Xã · Điểm GD · Hội · Tổ</b> ở khối LỌC ĐỊA BÀN phía trên. Hộ mới: sửa thẳng trong bảng — <b>Enter / Tab</b> sang ô kế, <b>↑ ↓</b> lên / xuống dòng, tự lưu. Hộ cũ: nhân thân theo Mẫu 31 mới nhất (chữ xám). <b>✎</b> sửa đầy đủ; bấm dòng tháng để gập / mở; ☐ tích hộ → 📋 Lập 03/TD. 🖨 In = đúng danh sách đang lọc.</div>'+
    '<div class="hm-so-khung" id="hm-so-bang">'+hmSoBangHTML(ds)+'</div>';
}
function hmSoVeBang(){ var k = document.getElementById('hm-so-bang'); if(!k) return hsoVe(); var ds = hmSoDs(); k.innerHTML = hmSoBangHTML(ds); var d = document.getElementById('hm-so-dem'); if(d) d.textContent = hmSoDemChu(ds); hmSoVeNut(); hsoHen(); }
function hmSoSua(id, f, el){   /* sửa 1 ô người đứng tên (hộ mới) — tự lưu, không vẽ lại bảng (giữ con trỏ) */
  var o = hmTim(id), n = o && o.tv[o.dung||0]; if(!n) return;
  var tam = Object.assign({}, n); hmChuan(tam, f, el.value);
  if(f==='ten' && !tam.ten){ bao('Họ tên người đứng tên vay không được để trống.'); el.value = hmGiaTri(n, f); return; }
  if(f==='cccd' && tam.cccd){ var tr = hmDs().find(function(x){ var m = x.tv[x.dung||0] || {}; return x.id!==id && String(m.cccd||'').replace(/\D/g, '')===tam.cccd; });
    if(tr){ bao('CCCD '+tam.cccd+' đã có trong sổ ('+hmTen(tr)+') — không đổi.', 5); el.value = hmGiaTri(n, f); return; } }
  Object.assign(n, tam); o.sua = new Date().toISOString();
  var B = hsoBoDs().find(function(b){ return b.hoId===id; }); if(B) hmDongBo(o, B);
  luu(); el.value = hmGiaTri(n, f);
  var dong = el.closest('tr'); if(dong){ var th = hmThieu(o, n), c = dong.querySelector('.hm-so-lt'), h = dong.querySelector('td.hm-so-han:not(.c)');
    if(c) c.innerHTML = hmSoLtHTML({o:o, n:n, thieu:th, kiem:khKiem(o)}); if(h) h.textContent = hmHan(n); dong.classList.toggle('hm-so-thieu', th.length>0); }
  if(f==='cccd' && !o.kh && hmM31(n.cccd)) bao('CCCD này đã có trên Mẫu 31 — app gắn mã KH, nhân thân sẽ theo Mẫu 31.', 5);
  hsoHen();
}
function hmSoPhim(e){   /* bảng sổ: Enter / Tab sang ô kế (Shift lùi), ↑ ↓ cùng cột dòng trên / dưới */
  var t = e.target, tr = t.closest && t.closest('tr'); if(!tr) return;
  if(e.key==='Enter' || e.key==='Tab'){ e.preventDefault(); e.stopPropagation();
    var ds = Array.prototype.slice.call(t.closest('table').querySelectorAll('input[data-so]')), x = ds[ds.indexOf(t) + (e.shiftKey ? -1 : 1)];
    if(x){ x.focus(); x.select(); } else t.blur(); return; }
  if(e.key==='ArrowDown' || e.key==='ArrowUp'){ var f = t.getAttribute('data-so'), r = tr, y = null;
    while(!y && (r = e.key==='ArrowDown' ? r.nextElementSibling : r.previousElementSibling)) y = r.querySelector('input[data-so="'+f+'"]');
    if(y){ e.preventDefault(); y.focus(); y.select(); } }
}
function hsoTuyPA(B){   /* ③ phương án theo thẻ chương trình (3.208) — dùng ở Bộ HS cũ và 01/TD theo hộ (3.209) */
  var h = '', N = B.nv, A = hsoPA(B);
  if((A.C||{}).kieu==='gqvl') return hsoTuyGQ(B);   /* 3.211 */
  var boNhap = function(nhan, duong, gt, ph, ve, kieu){ return hsoTuyO(nhan, '<input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoBoDat(\''+duong+'\',this.value'+(ve ? ',1' : '')+')">'); };
  var C = A.C, P = B.pa || {}, dt = C.dtth;
  var mdOps = function(tu){ return [['', tu]].concat(C.md.map(function(x){ return [x, x]; })); };
  h += '<div class="nhan-nhom">③ Phương án — '+coChuHTML(C.ma)+'</div>';
  if(C.kieu==='hssv'){
    h += boNhap('Tên sinh viên', 'pa.sv', P.sv, 'họ tên sinh viên')+(C.md.length>1 ? hsoTuyO('Mục đích', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— '+C.md[0]+' —').slice(1))) : '')+
      boNhap('Số tháng (bảng 01/TD)', 'pa.soThang', P.soThang, 'gõ số tháng — trống = chấm', 1)+boNhap('Số tiền vay (đ)', 'tien', B.tien, 'gõ số tiền', 1)+
      '<div class="sl-phu">Số tháng, số tiền gõ tay (anh chốt — app không tự tính).</div>';
  } else if(C.kieu==='congtrinh'){
    h += (C.loai ? '<div class="hang-nut">'+(C.loaiDs && C.loaiDs.length ? C.loaiDs : ['Xây mới', 'Sửa chữa']).map(function(x){ return '<label class="hso-o2"><input type="radio" name="hso-loai"'+(hsoLoaiChu(C, P.loai)===x ? ' checked' : '')+' onchange="hsoBoDat(\'pa.loai\',\''+coChuHTML(x.replace(/['"\\]/g, ''))+'\',1)"> '+coChuHTML(x)+'</label>'; }).join('')+'</div>' : '')+
      C.ctr.map(function(c, i){ var k = hsoPaK(i); return '<div class="hso-ho"><label><input type="checkbox"'+(P[k[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'pa.'+k[0]+'\',this.checked,1)"> '+coChuHTML(c.ten)+'</label> <input style="width:38%" value="'+coChuHTML(P[k[1]]||'')+'" placeholder="'+(hsoSo(c.tien) ? '≤ '+tdnTien(hsoSo(c.tien)) : 'số tiền')+'" onchange="hsoBoDat(\'pa.'+k[1]+'\',this.value,1)"></div>'; }).join('')+
      (C.md.length ? hsoTuyO('Mục đích in', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— tự ghép theo công trình —'))) : '')+
      '<div class="sl-phu">Tổng vay: <b>'+tdnTien(A.tien)+'</b> đ'+(A.md ? ' · '+coChuHTML(A.md) : '')+(A.canh.length ? ' — <b class="hso-canh">⚠ '+coChuHTML(A.canh.join('; '))+'</b>' : '')+'</div>';
  } else {
    h += (C.md.length ? hsoTuyO('Mục đích', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— '+C.md[0]+' —').slice(1))) : boNhap('Mục đích', 'pa.md', P.md, 'gõ mục đích vay', 1))+
      boNhap('Đối tượng (bảng 01/TD)', 'pa.dt', P.dt, A.md || 'trống = theo mục đích', 1)+boNhap('Số lượng', 'pa.sl', P.sl, 'vd 01 con, 02 sào…', 1)+boNhap('Số tiền vay (đ)', 'tien', B.tien, 'gõ số tiền', 1);
  }
  var dMd = hsoDTTHMd(B, /^phường/i.test(String(N.tenXa || ''))), phThIn = C.thIn==='in' && C.th ? 'trống = ghi sẵn '+C.th+' (thẻ CT)' : 'trống = chấm', phKy = C.kyIn==='in' && C.ky ? 'trống = ghi sẵn '+C.ky+' (thẻ CT)' : 'trống = chấm';
  h += boNhap('Vốn tự có (đ)', 'tuCo', B.tuCo, C.tuCo ? tdnTien(hsoSo(C.tuCo))+' (mặc định)' : '0')+
    boNhap('Thời hạn xin vay (tháng)', 'th', B.th, phThIn, 1)+boNhap('Kỳ hạn trả nợ (tháng/lần)', 'ky', B.ky, phKy, 1)+boNhap('Hạn trả nợ cuối cùng', 'hanCuoi', hsoNgayVN(B.hanCuoi), 'dd/mm/yyyy — trống = chấm', 1)+
    hsoTuyO('Đối tượng thụ hưởng', dt.length ? hsoChon('hsoBoDat(\'dtth\',this.value,1)', B.dtth, [['', dMd ? '— mặc định: '+dMd+' —' : '— chọn —']].concat(dt.map(function(x){ return [x, x]; }))) : '<span class="sl-phu">chưa khai — khai ở thẻ chương trình (① ⚙ khai báo chương trình)</span>')+
    '<div class="sl-phu">Thời hạn gõ ở đây (hoặc tab 01/TD) tự sang cột Thời hạn của 03/TD.</div>';
  return h;
}
/* ---------- 3.209 (anh 14/10): 03/TD NHIỀU HỘ — cùng 1 chương trình in chung 1 tờ; tích hộ ở sổ → 📋 Lập 03/TD, hoặc mở 03/TD → ＋ Thêm hộ; sửa từng dòng (không lưu lịch sử — tờ đang lập giữ đến khi làm tờ mới) ---------- */
function hsoD03(){ var S = hsoCH(); if(!S.d03 || !Array.isArray(S.d03.ds)) S.d03 = {ct:'', ds:[]}; if(!S.d03.ct) S.d03.ct = (hsoCTVDs().find(function(c){ return c.bat!==false; }) || {}).ma || 'HSSV'; return S.d03; }
function hsoD03To(D3){ var o = null; D3.ds.some(function(r){ o = hmTim(r.hoId); return o && o.to; }); return o && o.to && KHO.to(o.to) || null; }
function hsoD03Moi(o, ct){   /* dòng mới: lấy phiếu làm hồ sơ của hộ nếu cùng chương trình, không thì mặc định thẻ CT */
  var B = hsoBoDs().find(function(b){ return b.hoId===o.id; }), C = hsoCTV(ct) || {}, t = o.to && KHO.to(o.to), ph = /^phường/i.test(String(o.tenXa || (t && t.tenXa) || ''));
  if(B && B.ct===ct){ hmDongBo(o, B); var A = hsoPA(B); return {hoId:o.id, tien:A.tien ? String(A.tien) : '', md:A.mdDs||'', th:A.th||'', dt:B.dtth || hsoDTTHMd(B, ph)}; }
  return {hoId:o.id, tien:'', md:C.kieu==='congtrinh' ? '' : (C.md||[])[0] || '', th:C.thIn==='in' ? C.th||'' : '', dt:hsoDTTHMd({ct:ct}, ph)};
}
function hsoD03TuBo(D3){   /* 3.240 (anh 17/10 "mẫu 01 qua mẫu 03 đủ thông tin"): dòng của hộ có 01/TD cùng chương trình → số tiền, mục đích, thời hạn, ĐTTH theo 01/TD (ô anh đã gõ tay ở 03/TD giữ nguyên) */
  var doi = false;
  D3.ds.forEach(function(r){ var B = hsoBoDs().find(function(b){ return b.hoId===r.hoId; }), o = hmTim(r.hoId); if(!B || !o || B.ct!==D3.ct) return;
    var m = hsoD03Moi(o, D3.ct), tay = r.tay || {}; ['tien', 'md', 'th', 'dt'].forEach(function(f){ if(!tay[f] && m[f] && r[f]!==m[f]){ r[f] = m[f]; doi = true; } }); });
  if(doi) luu(); }
function hsoD03Them(id){ if(!id) return; var D3 = hsoD03(), o = hmTim(id); if(!o) return; if(D3.ds.some(function(r){ return r.hoId===id; })) return bao('Hộ đã có trong danh sách.'); D3.ds.push(hsoD03Moi(o, D3.ct)); luu(); hsoVe(); }
function hsoD03Bo(i){ var D3 = hsoD03(); D3.ds.splice(i, 1); luu(); hsoVe(); }
function hsoD03Dat(i, f, v){ var r = hsoD03().ds[i]; if(!r) return; (r.tay = r.tay || {})[f] = 1; r[f] = f==='tien' ? String(v||'').replace(/[^\d]/g, '') : f==='th' ? String(v||'').replace(/[^\d]/g, '') : String(v||'').trim(); luu(); hsoVe(); }
function hsoD03CT(ma){ var D3 = hsoD03(); if(D3.ct===ma) return; D3.ct = ma; D3.ds = D3.ds.map(function(r){ var o = hmTim(r.hoId); return o ? hsoD03Moi(o, ma) : r; }); luu(); hsoVe(); }
function hsoD03TuChon(){ var ids = hmDs().filter(function(o){ return HM_CHON[o.id]; }).map(function(o){ return o.id; }); if(!ids.length) return;
  var D3 = hsoD03(), B = hsoBoDs().find(function(b){ return b.hoId===ids[0]; }); if(B && B.ct) D3.ct = B.ct;
  D3.ds = ids.map(function(id){ return hsoD03Moi(hmTim(id), D3.ct); }); HM_CHON = {}; hsoCH().boId = ''; luu(); hsoChonMau('03td'); }
function hsoD03Hang(D3){ return D3.ds.map(function(r){ var o = hmTim(r.hoId); return {ten:o ? hmTen(o) : '(hộ đã xóa)', xa:o ? o.tenXa || '' : '', dt:r.dt, tien:hsoSo(r.tien), md:r.md, th:r.th ? r.th+' tháng' : ''}; }); }
function hsoTuy06(){   /* 3.253: cột trái 06/TD — hộ chung với 03/TD, thêm từ sổ; phần ghi theo hồ sơ điền sẵn, phần kiểm tra thực tế ghi tay */
  var ds = hso06Ho(), D3 = hsoD03(), h = '<div class="nhan-nhom hso-kbr">✎ Nhập liệu — Mẫu 06/TD <small>(dùng Mẫu 06 KTGS)</small></div>';
  h += '<div class="sl-phu">Hộ trên phiếu = danh sách <b>03/TD</b> (in 1 lần cả bộ 01 + 03 + 06). Phần <b>ghi theo hồ sơ cho vay</b> điền sẵn: họ tên, chương trình, giải ngân, dư nợ (= số tiền vay 01/TD), mục đích. Phần <b>kiểm tra thực tế</b> để trống ghi tay. Hộ ở nhiều tổ → mỗi tổ 1 phiếu.</div>';
  h += ds.length ? '<div class="hso-tick-ds">'+ds.map(function(x){ return '<div>• '+coChuHTML(hmTen(x.o))+(hmToTen(x.o) ? ' <small>· '+coChuHTML(hmToTen(x.o))+'</small>' : '')+(x.r.tien ? ' <small>· '+tdnTien(hsoSo(x.r.tien))+' đ</small>' : '')+'</div>'; }).join('')+'</div>'
    : '<div class="sl-phu">Chưa có hộ.</div>';
  h += hsoTuyO('＋ Thêm hộ từ sổ', hsoChon('hsoD03Them(this.value)', '', [['', '— chọn hộ trong 📒 sổ hộ vay —']].concat(hmDs().filter(function(o){ return !D3.ds.some(function(r){ return r.hoId===o.id; }); }).map(function(o){ return [o.id, hmTen(o)+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; }))));
  h += '<div class="sl-phu">Bớt hộ / sửa số tiền: ở tab <a href="#" onclick="event.preventDefault();hsoChonMau(\'03td\')">03/TD</a>.</div>';
  return h+hso06KBHTML(); }
function hsoTuy03(t){
  var D3 = hsoD03(), C = hsoCTV(D3.ct) || {}, co = {}; D3.ds.forEach(function(r){ co[r.hoId] = 1; });
  var h = '<div class="nhan-nhom">Chương trình (cùng 1 chương trình / 1 tờ)</div><div class="hang-nut">'+hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===D3.ct; }).map(function(c){ return gdxChip('<b>'+coChuHTML(c.ma)+'</b>', D3.ct===c.ma, 'hsoD03CT(\''+c.ma+'\')', 'hso-ct', c.ten); }).join('')+'</div>';
  h += hsoTuyO('＋ Thêm hộ', hsoChon('hsoD03Them(this.value)', '', [['', '— chọn hộ trong sổ —']].concat(hmDs().filter(function(o){ return !co[o.id]; }).map(function(o){ var n = o.tv[o.dung||0] || {}; return [o.id, (n.ten||'(chưa tên)')+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; }))))+
    '<div class="sl-phu">Hoặc tích nhiều hộ ở tab <a href="#" onclick="event.preventDefault();hsoChonMau(\'sohv\')">📒 Sổ hộ vay</a> → 📋 Lập 03/TD.</div>';
  var dtOps = [['', '—']].concat((C.dtth||[]).map(function(x){ return [x, x]; }));
  h += D3.ds.length ? '<div class="hso-d03">'+D3.ds.map(function(r, i){ var o = hmTim(r.hoId);
      return '<div class="hso-d03-dong"><div class="hm-hang"><b>'+(i+1)+'. '+coChuHTML(o ? hmTen(o) : '(hộ đã xóa)')+'</b> <button class="nho" title="Bỏ khỏi danh sách" onclick="hsoD03Bo('+i+')">✕</button></div>'+
        '<div class="hm-hang"><input style="width:30%" value="'+coChuHTML(r.tien ? tdnTien(+r.tien) : '')+'" placeholder="số tiền" onchange="hsoD03Dat('+i+',\'tien\',this.value)"><input style="width:16%" value="'+coChuHTML(r.th||'')+'" placeholder="tháng" onchange="hsoD03Dat('+i+',\'th\',this.value)">'+
        (C.dtth && C.dtth.length ? '<select style="width:48%" onchange="hsoD03Dat('+i+',\'dt\',this.value)">'+dtOps.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(x[0]===r.dt ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>' : '<input style="width:48%" value="'+coChuHTML(r.dt||'')+'" placeholder="đối tượng thụ hưởng" onchange="hsoD03Dat('+i+',\'dt\',this.value)">')+'</div>'+
        '<div class="hm-hang"><input style="width:96%" value="'+coChuHTML(r.md||'')+'" placeholder="mục đích sử dụng vốn" onchange="hsoD03Dat('+i+',\'md\',this.value)"></div></div>'; }).join('')+'</div>'+
    '<div class="sl-phu">Cộng: <b>'+tdnTien(D3.ds.reduce(function(a, r){ return a+hsoSo(r.tien); }, 0))+'</b> đ · '+D3.ds.length+' hộ'+(D3.ds.length ? ' · <a href="#" onclick="event.preventDefault();hsoCH().d03={ct:\''+D3.ct+'\',ds:[]};luu();hsoVe()">làm tờ mới</a>' : '')+'</div>'
    : '<div class="sl-phu">Chưa có hộ — khung phải là mẫu trắng.</div>';
  return h+hsoNgayTuy('Ngày họp bình xét')+hsoKBRieng('03td');   /* 3.215 */
}
/* ---------- 3.211 (anh chốt 14/10): GQVL — người lao động vay qua Tổ: 01/GQVL (mẫu mới VB 4039, từ 01/10/2026) · 03/TD · 07b/GQVL Hợp đồng tín dụng ----------
   VB 11055: mức tối đa 200 triệu · thời hạn tối đa 120 tháng · kỳ hạn trả gốc ≤ 12 tháng trả 1 lần, > 12–60 tối đa 24 tháng/kỳ, > 60 tối đa 36 · lãi trả hằng tháng.
   Anh chốt: phân kỳ mặc định 24 tháng/lần, chia đều làm tròn xuống trăm nghìn, kỳ cuối nhiều nhất, không ân hạn; lãi 7,9248 % (ưu tiên 6,24 %), quá hạn 130 %. */
var HSO_UT = ['Người dân tộc thiểu số thuộc hộ nghèo.', 'Người dân tộc Kinh thuộc hộ nghèo đang sinh sống tại địa bàn có điều kiện kinh tế - xã hội đặc biệt khó khăn.', 'Người khuyết tật.',
  'Người lao động trong hộ gia đình đang trực tiếp nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng.', 'Người lao động nhận nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng.', 'Khác (nếu có)'];
function hsoSoVN(x){ return String(Math.round(x*1e6)/1e6).replace('.', ','); }   /* 10.30224 → "10,30224" */
function hsoSoDoc(v){ return +String(v||'').replace(/\s/g, '').replace(',', '.') || 0; }
function hsoCongThang(iso, m){ var n = hsoNg(iso); if(!n) return ''; var y = +n.y, mo = +n.m - 1 + m, d = +n.d; y += Math.floor(mo/12); mo = ((mo%12)+12)%12;
  var cuoi = new Date(y, mo+1, 0).getDate(); return y+'-'+('0'+(mo+1)).slice(-2)+'-'+('0'+Math.min(d, cuoi)).slice(-2); }
function hsoLich(tien, th, ky, ngay0, R){   /* lịch trả gốc: chia đều theo số kỳ, làm tròn xuống bội R, phần dư dồn kỳ cuối; th ≤ 12 → 1 lần */
  tien = +tien || 0; th = +th || 0; ky = +ky || 0; R = +R || 100000; if(!tien || !th) return [];
  var n = th<=12 || !ky ? 1 : Math.ceil(th/ky), moi = n>1 ? Math.floor(tien/n/R)*R : tien, r = [];
  for(var i=1;i<=n;i++){ var thang = i===n ? th : i*ky, so = i===n ? tien - moi*(n-1) : moi; r.push({thang:thang, tien:so, ngay:ngay0 ? hsoCongThang(ngay0, thang) : ''}); }
  return r;
}
function hsoLaiDK(lich, tien, th, ls){   /* lãi vay dự kiến cả thời hạn: dư nợ từng tháng × lãi suất ÷ 12 */
  var du = +tien || 0, lai = 0; for(var m=1;m<=th;m++){ lai += du*ls/100/12; lich.forEach(function(k){ if(k.thang===m) du -= k.tien; }); } return Math.round(lai); }
function hsoLaGQ(B){ return !!B && (hsoCTV(B.ct)||{}).kieu==='gqvl'; }   /* 3.257: 01/GQVL, 07b chỉ lấy phương án khi hộ đang chọn chương trình GQVL (không lọt HSSV / NSVSMT) */
function hsoGQ(B){   /* số liệu GQVL của phiếu: lãi suất theo ưu tiên, lịch, lãi dự kiến, hiệu quả, cảnh báo */
  var A = hsoPA(B), C = A.C || {}, P = (B && B.pa) || {}, ut = (P.ut||[]).some(function(i){ return i<5; });
  var ls = hsoSoDoc(ut ? C.lsUT : C.ls), qh = ls*(hsoSoDoc(C.qh)||130)/100, th = +A.th || 0, ky = +(B && B.ky) || (th>12 ? (th<=60 ? 24 : 36) : 0);   /* 3.310 (anh): phiếu không gõ kỳ hạn → phân kỳ theo thời hạn (≤ 12: 1 lần · ≤ 60: 24 tháng · > 60: 36 tháng), không theo số ghi sẵn của thẻ */
  A.ky = ky ? String(ky) : '';
  var lich = hsoLich(A.tien, th, ky, B && (B.ngayGN || B.ngayHD), hsoSo(C.lamTron) || 100000), dt = hsoSo(P.dt), cp = hsoSo(P.cp), cl = dt || cp ? dt-cp : null, canh = [];   /* 3.310: gốc lịch = ngày giải ngân (trống → ngày ký HĐ) */
  if(A.tien>200e6) canh.push('vượt mức tối đa 200 triệu');
  if(th>120) canh.push('thời hạn vượt 120 tháng');
  if(th>12 && ky && ky>(th<=60 ? 24 : 36)) canh.push('kỳ hạn trả gốc vượt '+(th<=60 ? 24 : 36)+' tháng/kỳ');
  var lai = th && ls ? hsoLaiDK(lich, A.tien, th, ls) : 0, tuGo = B && B.tuCo!=='' && B.tuCo!=null, tuCo = hsoSo(B && B.tuCo), tu = {};
  /* 3.310 (anh 21/10: "phương án em tự tính và điền, có hệ số k ngẫu nhiên thay đổi khi cần") — theo cách anh tính trên Excel GQVL:
     vốn tự có = 20 tr × k · tổng chi phí = vay + 40 tr × k (không dưới vốn + lãi vay + 5 %, chú thích 7) · lợi nhuận = vốn − 10 tr × k (≥ 10 % vay) · doanh thu = chi phí + lợi nhuận.
     Ô anh gõ tay giữ nguyên; k ngẫu nhiên 0,85–1,25 mỗi phiếu (🎲 Đổi số ở ③ phương án). */
  var k = B && A.tien ? hsoGQK(B) : 0, tr = function(v, len){ return (len ? Math.ceil(v/1e6) : Math.round(v/1e6))*1e6; };
  if(k && !tuGo){ tuCo = tr(20e6*k); tu.tuCo = 1; }
  var von = A.tien + tuCo;
  if(k && !cp){ cp = tr(Math.max(A.tien + 40e6*k, (von + lai)*1.05), 1); tu.cp = 1; }
  if(k && !dt){ dt = cp + tr(Math.max(von - 10e6*k, A.tien*0.1)); tu.dt = 1; }
  cl = dt || cp ? dt-cp : null;
  if(cp && cp < von + lai) canh.push('tổng chi phí thấp hơn vốn + lãi vay dự kiến ('+tdnTien(von+lai)+' đ) — xem lại phương án (chú thích 7)');
  return {A:A, C:C, ls:ls, qh:qh, ut:ut, lich:lich, lai:lai, dt:dt, cp:cp, cl:cl, bq:cl!=null && th ? Math.round(cl/th) : null, canh:canh, von:von, tuCo:tuCo, tu:tu, k:k, ky:ky};
}
/* hệ số k của phiếu (ngẫu nhiên 0,85–1,25, giữ trong phiếu — 🎲 đổi khi cần) */
function hsoGQKMoi(){ return Math.round((0.85 + Math.random()*0.4)*100)/100; }
function hsoGQK(B){ var P = B.pa = B.pa || {}; if(!(+P.k > 0)){ P.k = hsoGQKMoi(); try{ luu(); }catch(e){} } return +P.k; }
function hsoGQDoiK(){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var cu = +B.pa.k; do { B.pa.k = hsoGQKMoi(); } while(B.pa.k===cu); hsoBoLuu(); hsoVe();
  bao('🎲 Hệ số phương án k = '+hsoSoVN(B.pa.k)+' — vốn tự có, chi phí, doanh thu tính lại (ô anh gõ tay giữ nguyên).', 5);
}
function hsoO2(v, n){ return hsoO(v, 'kb', n); }
/* 3.310 (anh 21/10): TRANG "PHÊ DUYỆT CỦA NGÂN HÀNG" — trang cuối mẫu 01.NL (file anh gửi), lề 20 / 20 / 20 / 30 mm, chữ đậm như gốc.
   Số tự điền từ phương án GQVL (số tiền, lãi suất, thời hạn, phân kỳ, lịch trả gốc); ngày trả lãi hằng tháng để chấm (theo lịch giao dịch xã). */
function hsoLapPdnh(t, B){
  B = B || hsoBo(); var G = hsoLaGQ(B) ? hsoGQ(B) : {A:{tien:0, th:''}, lich:[], ls:0, qh:0, ky:0}, A = G.A, l = G.lich || [], k1 = l[0], kc = l.length>1 ? l[l.length-1] : null, cuoi = l.length ? hsoNg(l[l.length-1].ngay) : null;
  var o = function(v, n){ return hsoO(v, 'kb', n); }, b = function(x){ return '<b>'+x+'</b>'; };
  var h = '<p class="c b s14" style="margin-bottom:6pt">PHÊ DUYỆT CỦA NGÂN HÀNG</p>'+
    '<p class="j">'+b('1. Số tiền cho vay: ')+o(A.tien ? tdnTien(A.tien) : '', 12)+b(' đồng (Bằng chữ: ')+o(A.tien ? hsoChuSo(A.tien) : '', 25)+b(')')+'</p>'+
    '<p class="j">'+b('2. Lãi suất: ')+o(G.ls ? hsoSoVN(G.ls) : '', 14)+b(' %/năm. Lãi suất nợ quá hạn: ')+o(G.qh ? hsoSoVN(Math.round(G.qh*1e5)/1e5) : '', 22)+b(' %/năm.')+'</p>'+
    '<p class="j">'+b('3. Thời hạn cho vay: ')+o(A.th, 12)+b(' tháng; Kỳ hạn trả nợ: ')+o(l.length>1 && G.ky ? G.ky : (l.length===1 ? A.th : ''), 13)+b(' tháng/lần.')+'</p>'+
    '<p class="j">'+b('4. Số tiền trả nợ: ')+o(k1 ? tdnTien(k1.tien) : '', 22)+b(' đồng/lần. Số tiền trả nợ kỳ cuối ')+o(kc ? tdnTien(kc.tien) : (k1 ? tdnTien(k1.tien) : ''), 22)+b(' đồng.')+'</p>'+
    '<p class="j">&nbsp;&nbsp;&nbsp;&nbsp;Hạn trả nợ cuối cùng: Ngày'+(cuoi ? o(cuoi.d)+'/'+o(cuoi.m)+'/'+o(cuoi.y) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+'</p>'+
    '<p class="j">'+b('5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày ')+hsoCham(40)+'</p><p>&nbsp;</p>'+
    hsoBang('khung0', [41.4, 57.3, 63.7], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Cán bộ tín dụng</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p>&nbsp;</p><p class="c b">Trưởng phòng</p><p class="c b">KH Nghiệp vụ Tín dụng/ Tổ trưởng Tổ KH-NV</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c">Ngày'+hsoCham(5)+'tháng'+hsoCham(6)+'năm'+hsoCham(6)+'</p><p class="c b">Giám đốc</p><p class="c i s12">(Ký, ghi rõ họ tên, đóng dấu)</p></td></tr>');
  return {ma:'Phê duyệt NH', h:h};
}
function hsoLap01gqvl(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), G = hsoLaGQ(B) ? hsoGQ(B) : {A:{dong:[], tien:0}, C:{}, lich:[]}, A = G.A, P = (B && B.pa) || {}, L = P.ld || {};
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '', han = '', d = hsoCCCDDoc(N.cccd);
  if(N.cccd && N.ns && N.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(String(N.cccd).replace(/\D/g, ''), N.ns, N.ncap); if(hn && hn.den) han = ngayVNsl(hn.den); }
  var o = function(f, n){ return hsoO2(L[f], n||5); };
  var bang = '<tr><td class="c b">STT</td><td class="c b">MỤC ĐÍCH SỬ DỤNG<br>VỐN VAY</td><td class="c b">SỐ LƯỢNG</td><td class="c b">THÀNH TIỀN (đồng)</td></tr>'+
    (A.dong.length ? A.dong : [['', '', 0], ['', '', 0]]).map(function(x, i){ return '<tr><td class="c">'+(x[0] ? i+1 : '')+'</td><td>'+hsoO2(x[0], 30)+'</td><td class="c">'+hsoO2(x[1], 12)+'</td><td class="r">'+hsoO2(x[2] ? tdnTien(x[2]) : '', 15)+'</td></tr>'; }).join('')+
    '<tr><td></td><td class="c b">Cộng</td><td></td><td class="r b">'+(A.tien ? hsoO2(tdnTien(A.tien)) : '')+'</td></tr>';
  var h = '<p class="r b">Mẫu số 01/GQVL</p>'+hsoQH('-', 13)+
    '<p class="c b s14 tr">PHƯƠNG ÁN SỬ DỤNG VỐN VAY</p><p class="c b">HỖ TRỢ TẠO VIỆC LÀM, DUY TRÌ, MỞ RỘNG VIỆC LÀM</p><p class="c i">(Đối với người lao động)</p>'+
    '<p class="c tr">Kính gửi: Ngân hàng Chính sách xã hội '+hsoO2(hsoPGD('ngan'), 20)+'</p>'+
    '<p class="b tr">I. Thông tin chung về khách hàng</p>'+
    '<p>Họ và tên khách hàng vay vốn: '+hsoO(N.ten, 'sl', 40)+'</p>'+
    '<p>Ngày sinh: '+hsoO(hsoNgayVN(N.ns), 'sl', 12)+'        Dân tộc: '+hsoO(N.danToc, 'sl', 8)+'        Giới tính: '+hsoO(N.gt || (d ? d.gt : ''), 'sl', 6)+'</p>'+
    '<p>Thẻ căn cước công dân/Thẻ căn cước số: '+hsoO(N.cccd, 'sl', 25)+'</p>'+
    '<p>Ngày cấp: '+hsoO(hsoNgayVN(N.ncap), 'sl', 12)+'   Nơi cấp: '+hsoO(N.noiCap, 'sl', 14)+'   Có thời hạn đến: '+hsoO(han, 'sl', 12)+'</p>'+
    '<p>Nơi ở hiện tại (thường trú/tạm trú<sup>(1)</sup>): '+hsoO(dc, 'sl', 45)+'</p>'+
    '<p>Điện thoại: '+hsoO(N.sdt, 'sl', 50)+'</p>'+
    '<p>Giấy chứng nhận đăng ký hộ kinh doanh số<sup>(2)</sup> (nếu có): '+hsoO2(P.gpkd, 20)+'</p>'+
    '<p>Đăng ký lần đầu ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p><p>Đăng ký thay đổi lần thứ: '+hsoCham(8)+' ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p>'+
    '<p class="j">Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh (nếu có): '+hsoCham(25)+' thời hạn còn hiệu lực '+hsoCham(20)+'</p>'+
    '<p>Mã số thuế kinh doanh đã đăng ký (nếu có): '+hsoO2(P.mst, 25)+'</p>'+
    '<p>Thuộc đối tượng ưu tiên (nếu có):</p>'+HSO_UT.map(function(x, i){ var co = (P.ut||[]).indexOf(i)>=0; return '<p class="l1 j">'+(co ? '☒' : '☐')+' '+(i+1)+'. '+x+(i===5 ? ' '+hsoO2(P.utKhac, 40) : '')+'</p>'; }).join('')+
    '<p class="thut">Thông tin, giấy tờ xác nhận đối tượng ưu tiên, gồm<sup>(3)</sup>:</p>'+(P.utGT ? '<p>'+hsoO2(P.utGT)+'</p>' : '<p>'+hsoCham(90)+'</p><p>'+hsoCham(90)+'</p>')+
    '<p class="thut">Thuộc đối tượng vay vốn khác (nếu có)<sup>(5)</sup>: '+hsoO2(P.dtKhac, 40)+'</p>'+
    '<p class="b tr">II. Phương án sử dụng vốn vay</p><p class="b">1. Tên phương án và địa điểm thực hiện</p>'+
    '<p class="thut">Tôi có nhu cầu vay vốn để thực hiện phương án '+hsoO2(P.ten || A.md, 60)+'</p>'+
    '<p>Địa điểm thực hiện phương án: '+hsoO2(P.dd || dc, 60)+'</p>'+
    '<p class="i">(Đối với trường hợp vay vốn trồng rừng thì kê khai giấy tờ, tài liệu chứng minh được sử dụng đất rừng<sup>(4)</sup>)</p><p>'+hsoCham(90)+'</p>'+
    '<p class="b">2. Tổng số người lao động được tạo việc làm, duy trì, mở rộng việc làm<sup>(6)</sup>: '+o('tong')+' người, trong đó:</p>'+
    '<p class="l1">* Tạo việc làm: '+o('tao')+' người;   Duy trì việc làm: '+o('duy')+' người;   Mở rộng việc làm: '+o('mo')+' người;</p>'+
    '<p class="l1">Là lao động nữ (nếu có): '+o('nu')+' người;</p>'+
    '<p class="l1">* Tổng số lao động thuộc hộ gia đình: '+o('ho')+' người</p><p class="l1">Tổng số lao động không thuộc hộ gia đình (nếu có): '+o('ngoai')+' người</p>'+
    '<p class="b">3. Vốn thực hiện phương án: '+(A.tien ? hsoO2(tdnTien(G.von)) : hsoCham(25))+' đồng, trong đó:</p>'+
    '<p class="l1">- Vốn tự có: '+(B && B.tuCo!=='' && B.tuCo!=null ? hsoO2(tdnTien(hsoSo(B.tuCo))) : hsoCham(25))+' đồng</p>'+
    '<p class="l1">- Đề nghị Ngân hàng cho vay số tiền: '+(A.tien ? hsoO2(tdnTien(A.tien)) : hsoCham(25))+' đồng</p>'+
    '<p class="l1">(Bằng chữ: '+(A.tien ? hsoO2(hsoChuSo(A.tien)) : hsoCham(60))+')</p><p>với mục đích sử dụng vốn vay cụ thể như sau:</p>'+hsoBang('luoi', [8, 52, 18, 22], bang)+
    '<p class="tr">Thời hạn xin vay: '+hsoO2(A.th, 6)+' tháng</p><p>Kỳ hạn trả gốc: '+hsoO2(A.ky ? (+A.th<=12 ? 'trả 1 lần khi đến hạn' : A.ky+' tháng/lần') : '', 15)+'   Kỳ hạn trả lãi: '+hsoO2(B ? (G.C.kyLai || 'hằng tháng') : '', 12)+'</p>'+
    '<p class="b tr">4. Phương án sử dụng vốn vay và hiệu quả dự kiến về thu nhập<sup>(7)</sup>:</p><p class="i">(Được tính trên toàn bộ thời gian thực hiện phương án)</p>'+
    '<p class="l1">- Tổng doanh thu của phương án: '+(G.dt ? hsoO2(tdnTien(G.dt)) : hsoCham(30))+' đồng</p><p class="l1">- Tổng chi phí của phương án: '+(G.cp ? hsoO2(tdnTien(G.cp)) : hsoCham(30))+' đồng</p>'+
    '<p class="l1">- Chênh lệch thu - chi của phương án: '+(G.cl!=null ? hsoO2(tdnTien(G.cl)) : hsoCham(30))+' đồng</p><p class="l1">- Thu nhập bình quân tăng thêm/1 tháng của khách hàng: '+(G.bq!=null ? hsoO2(tdnTien(G.bq)) : hsoCham(25))+' đồng</p>'+
    '<p class="b tr">III. Cam kết</p><p class="j thut">Tôi cam kết sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đúng thời hạn, nếu sai tôi xin chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [45, 55], '<tr><td></td><td class="c"><p class="c i">'+coChuHTML(hsoPGD('noi'))+(function(){ var g = hsoChamIn('01gqvl', 'ngayKy') ? hsoNg(hsoChamGT('01gqvl', 'ngayKy', '')) : null; return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(6); })()+'</p><p class="c b">NGƯỜI ĐỀ NGHỊ VAY VỐN</p><p class="c i s12">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+hsoO(N.ten, 'sl', 25)+'</p></td></tr>')+
    '<p class="b i s11 tr">Ghi chú:</p>'+[
    '(1) Trường hợp đề nghị vay vốn tại nơi thường trú thì ghi thông tin nơi thường trú; trường hợp đề nghị vay vốn tại nơi tạm trú thì ghi thông tin nơi tạm trú.',
    '(2) Nếu khách hàng là chủ hộ kinh doanh (hoặc người đại diện ủy quyền) vay với tư cách Cá nhân người lao động để phục vụ công việc kinh doanh/tạo việc làm, duy trì, mở rộng việc làm cho chính bản thân khách hàng thì kê khai Giấy chứng nhận đăng ký kinh doanh. Đối với ngành nghề kinh doanh có điều kiện thì kê khai cả nội dung Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh.',
    '(3) Thông tin, giấy tờ xác nhận đối tượng ưu tiên dành cho đối tượng ưu tiên, cụ thể:',
    '- Đối với người lao động là người dân tộc thiểu số thuộc hộ nghèo: Giấy tờ chứng minh về dân tộc, Giấy chứng nhận hộ gia đình nghèo theo quy định.',
    '- Đối với người lao động là người dân tộc Kinh thuộc hộ nghèo đang sinh sống tại địa bàn có điều kiện kinh tế – xã hội đặc biệt khó khăn (người có nơi ở hiện tại thuộc thôn, xã đặc biệt khó khăn vùng đồng bào dân tộc thiểu số và miền núi hoặc các địa bàn khác theo quyết định của cơ quan nhà nước có thẩm quyền): Giấy tờ chứng minh về nơi ở hiện tại, Giấy chứng nhận hộ gia đình nghèo theo quy định.',
    '- Đối với người lao động là Người khuyết tật, đề nghị kê khai: Giấy xác nhận khuyết tật số …... do Ủy ban nhân dân xã/phường/đặc khu ……...…. cấp ngày ..........',
    '- Đối với Người lao động trong hộ gia đình đang trực tiếp nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng, đề nghị kê khai: + Họ và tên Người khuyết tật/người khuyết tật đặc biệt nặng:............ + Giấy xác nhận khuyết tật số ……do Ủy ban nhân dân xã/ phường/đặc khu …… cấp ngày .......... + Hoặc Quyết định hỗ trợ kinh phí chăm sóc, nuôi dưỡng hàng tháng số ................cấp ngày.............',
    '- Đối với Người lao động nhận nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng, đề nghị kê khai: + Họ và tên Người khuyết tật/Người khuyết tật đặc biệt nặng:............. + Giấy xác nhận khuyết tật số …… do Ủy ban nhân dân xã/phường/đặc khu ….....cấp ngày ............. + Quyết định hỗ trợ kinh phí chăm sóc, nuôi dưỡng hằng tháng số:.............cấp ngày............ + Hoặc Quyết định nhận chăm sóc, nuôi dưỡng số:………....cấp ngày….......................……',
    '(4) Khách hàng vay vốn phục vụ phương án trồng rừng có trách nhiệm kê khai các loại giấy tờ chứng minh việc được sử dụng đất rừng và đang không tranh chấp (ví dụ như Giấy chứng nhận quyền sử dụng đất, dữ liệu điện tử về đất đai (theo Luật Đất đai), Hợp đồng thuê đất/giao đất/cho mượn đất và giấy tờ pháp lý của bên cho thuê/cho mượn,…).',
    '(5) Thuộc đối tượng khác theo quy định của cấp có thẩm quyền được vay vốn hỗ trợ tạo việc làm, duy trì, mở rộng việc làm: - Người cao tuổi theo văn bản hướng dẫn số 5911/NHCS-TDSV ngày 12/8/2019; - Người lao động trong gia đình người tâm thần, trẻ em tự kỷ và người rối nhiễu tâm trí theo văn bản hướng dẫn số 6216/NHCS-TDSV ngày 09/7/2021; - Người có đất thu hồi theo văn bản hướng dẫn số 4545/HD-NHCS ngày 01/8/2024; - Các đối tượng khác theo văn bản hướng dẫn của cấp có thẩm quyền.',
    '(6) Người lao động là công dân Việt Nam từ đủ 15 tuổi trở lên, có khả năng lao động và có nhu cầu làm việc. - Tạo việc làm là tạo việc làm cho người thất nghiệp; - Duy trì việc làm là duy trì việc làm hiện có của người lao động; - Mở rộng việc làm là việc thu hút thêm lao động hoặc tạo thêm việc làm khác cho người lao động. - Khách hàng vay vốn được tính là 01 trong tổng số lao động thuộc hộ gia đình.',
    '(7) - Tổng chi phí của phương án (đã bao gồm chi phí trả lãi tiền vay ngân hàng.) + Nếu tổng chi phí ≥ vốn thực hiện phương án + lãi vay: đây là kết quả hợp lý. + Nếu tổng chi phí &lt; vốn thực hiện phương án + lãi vay: cần xem xét lại phương án. - Chênh lệch thu – chi &gt; 0: phương án có lãi. - Chênh lệch thu – chi ≤ 0: phương án không có lãi. Từ chênh lệch thu – chi mới tính được thu nhập bình quân tăng thêm/tháng của khách hàng và đánh giá hiệu quả của phương án.'
    ].map(function(x){ return '<p class="j s11">'+x+'</p>'; }).join('');
  return {ma:'01/GQVL', h:h};
}
function hsoLap07b(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), G = hsoLaGQ(B) ? hsoGQ(B) : {A:{dong:[], tien:0, th:''}, C:{}, lich:[], ls:0, qh:0}, A = G.A, P = (B && B.pa) || {}, L = P.ld || {};
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '', han = '';
  if(N.cccd && N.ns && N.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(String(N.cccd).replace(/\D/g, ''), N.ns, N.ncap); if(hn && hn.den) han = ngayVNsl(hn.den); }
  var cuoi = G.lich.length ? G.lich[G.lich.length-1].ngay : '', nl = +L.tong || ((+L.tao||0)+(+L.duy||0)+(+L.mo||0)) || '';
  var lich = G.lich.length ? G.lich.map(function(k){ return '<p class="l2">- Ngày '+(k.ngay ? hsoO2(ngayVNsl(k.ngay)) : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+' <span class="i s11">(tháng thứ '+k.thang+')</span>')+', số tiền: '+hsoO2(tdnTien(k.tien))+' đồng.</p>'; }).join('')
    : [1,2,3].map(function(){ return '<p class="l2">- Ngày '+hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+', số tiền: '+hsoCham(18)+' đồng.</p>'; }).join('')+'<p class="l2">……</p>';
  var o = function(v, n){ return hsoO2(v, n); }, s = function(v, n){ return hsoO(v, 'sl', n); };
  var h = hsoBang('khung0', [62, 38], '<tr><td class="c">'+hsoQH('-', 13)+'</td><td class="r"><p class="r b">Mẫu số 07b/GQVL</p><p class="r i s11">Lập 02 liên</p><p class="r i s11">01 liên lưu NH</p><p class="r i s11">01 liên lưu KH</p></td></tr>')+
    '<p class="c b s14 tr">HỢP ĐỒNG TÍN DỤNG</p><p class="c">Số: '+hsoCham(6)+'/20'+hsoCham(3)+'/HĐ-TD</p><p class="c i">(Áp dụng cho vay đối với người lao động)</p>'+
    ['Căn cứ bộ Luật dân sự và các quy định pháp luật khác có liên quan;', 'Căn cứ Luật Việc làm số 74/2025/QH15 ngày 16/06/2025 của Quốc Hội;', 'Căn cứ Nghị định số 338/2025/NĐ-CP ngày 25/12/2025 của Chính phủ quy định chi tiết một số điều của Luật Việc làm về chính sách hỗ trợ tạo việc làm;',
     'Căn cứ văn bản số 11055/HD-NHCS ngày 30/12/2025 của Tổng Giám đốc Ngân hàng Chính sách xã hội hướng dẫn nghiệp vụ cho vay hỗ trợ tạo việc làm, duy trì, mở rộng việc làm và các văn bản hướng dẫn có liên quan của Tổng Giám đốc NHCSXH;'].map(function(x){ return '<p class="j thut i">'+x+'</p>'; }).join('')+
    '<p class="j thut">Hôm nay, '+hsoNTN(B && B.ngayHD)+' tại '+(hsoChamGT('07b', 'noiKy', '') ? hsoO(hsoChamGT('07b', 'noiKy', ''), 'kb') : hsoCham(35))+' chúng tôi gồm:</p>'+
    '<p class="b">Bên cho vay</p><p>- Tên Ngân hàng Chính sách xã hội: '+o(hsoPGD('ten'), 40)+'</p><p>- Địa chỉ: '+o(hsoPGD('diaChi'), 50)+'</p><p>- Điện thoại: '+o(hsoPGD('dt'), 50)+'</p>'+
    '<p>- Họ và tên người đại diện: '+o(hsoPGD('daiDien'), 25)+' Chức vụ: '+o(hsoPGD('daiDien') ? hsoPGD('chucVu') : '', 20)+'</p><p>- Giấy uỷ quyền (nếu có): '+o(hsoPGD('uyQuyen'), 40)+'</p>'+
    '<p class="b">Bên vay</p><p>- Họ và tên người vay: '+s(N.ten, 45)+'</p><p>- Ngày, tháng, năm sinh: '+s(hsoNgayVN(N.ns), 40)+'</p><p>- Thẻ căn cước công dân/Thẻ căn cước số: '+s(N.cccd, 30)+'</p>'+
    '<p class="l1">Ngày cấp '+s(hsoNgayVN(N.ncap), 20)+' nơi cấp '+s(N.noiCap, 25)+'</p><p class="l1">Có thời hạn đến '+s(han, 40)+'</p>'+
    '<p>- Nơi ở hiện tại (thường trú/tạm trú): '+s(dc, 40)+'</p><p>- Điện thoại liên hệ: '+s(N.sdt, 40)+'</p>'+
    '<p>Giấy chứng nhận đăng ký hộ kinh doanh số (nếu có): '+o(P.gpkd, 20)+'</p><p>Đăng ký lần đầu ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p><p>Đăng ký thay đổi lần thứ: '+hsoCham(8)+' ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p>'+
    '<p class="j">Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh (nếu có): '+hsoCham(25)+' thời hạn còn hiệu lực '+hsoCham(20)+'</p><p>Mã số thuế kinh doanh đã đăng ký (nếu có): '+o(P.mst, 25)+'</p>'+
    '<p class="j thut">Hai Bên cùng thống nhất ký kết Hợp đồng này theo các nội dung thỏa thuận sau đây:</p>'+
    '<p class="b">Điều 1. Nội dung cho vay</p><p>1. Tổng số tiền cho vay (bằng số): '+(A.tien ? o(tdnTien(A.tien)) : hsoCham(30))+' đồng.</p><p class="l1">Bằng chữ: '+(A.tien ? o(hsoChuSo(A.tien)) : hsoCham(60))+'</p>'+
    '<p>2. Mục tiêu hỗ trợ tạo việc làm, duy trì, mở rộng việc làm cho: '+o(nl, 8)+' người.</p>'+
    '<p>3. Thời hạn cho vay: '+o(A.th, 6)+' tháng; hạn trả nợ cuối cùng ngày '+(cuoi ? o(ngayVNsl(cuoi)) : (B && B.hanCuoi ? o(hsoNgayVN(B.hanCuoi)) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(6)))+'</p>'+
    '<p>4. Lãi suất tiền vay:</p><p class="l1">- Lãi suất cho vay: '+(G.ls ? o(hsoSoVN(G.ls)) : hsoCham(6))+' %/ năm.</p><p class="l1">- Lãi suất quá hạn: '+(G.qh ? o(hsoSoVN(G.qh)) : hsoCham(6))+' %/ năm.</p>'+
    '<p class="j thut">Lãi tiền vay được tính kể từ ngày Bên vay nhận khoản vay đầu tiên đến ngày trả hết nợ gốc. Tiền lãi được Bên cho vay thu hàng tháng kể từ sau tháng nhận khoản vay đầu tiên, tiền lãi được tính trên số dư nợ thực tế;</p><p class="j thut">Tiền lãi tháng nếu chưa thu được thì chuyển sang thu vào tháng kế tiếp sau đó.</p>'+
    '<p>5. Kỳ hạn trả nợ gốc</p>'+lich+
    '<p>6. Thu nợ gốc, lãi</p><p class="j">- Bên cho vay thực hiện thu nợ gốc, lãi theo quy định của Bên cho vay.</p><p class="j">- Bên vay có thể trả nợ gốc trước hạn bằng tiền mặt hoặc trả vào tài khoản tổ viên của Bên vay. Trường hợp Bên vay trả vào tài khoản tổ viên:</p>'+
    '<p class="j">+ Bên vay nộp tiền vào tài khoản tổ viên, nội dung nộp tiền ghi rõ: “Nộp tiền trả nợ gốc và lãi tiền vay trước hạn cho Hợp đồng tín dụng số …” trên Giấy nộp tiền và thông tin cho Bên cho vay để làm cơ sở thực hiện thu nợ.</p>'+
    '<p class="j">+ Bên vay chuyển khoản vào tài khoản tổ viên, nội dung chuyển khoản ghi rõ: “Nộp tiền trả nợ gốc và lãi tiền vay trước hạn cho Hợp đồng tín dụng số …” và thông tin cho Bên cho vay để làm cơ sở thực hiện thu nợ.</p><p class="j">- Thứ tự thu nợ gốc, lãi của khoản vay thực hiện theo quy định của Bên cho vay.</p>'+
    '<p class="b">Điều 2. Giải ngân</p><p>Hình thức giải ngân: '+(P.gn==='tm' ? '☒' : '☐')+' Tiền mặt     '+(P.gn==='ck' ? '☒' : '☐')+' Chuyển khoản</p><p>Tên người thụ hưởng '+o(P.gn==='ck' ? (P.thuHuong || N.ten) : '', 50)+'</p><p>Số tài khoản '+o(P.stk, 20)+' tại '+o(P.nh, 30)+'</p>'+
    '<p class="b">Điều 3. Mục đích sử dụng tiền vay</p><p>'+o(A.dong.length ? A.dong.map(function(x){ return x[0]+(x[1] ? ' ('+x[1]+')' : ''); }).join('; ') : '', 90)+'</p><p>Nơi thực hiện phương án:</p><p>'+o(P.dd || dc, 90)+'</p>'+
    '<p class="b">Điều 4. Điều chỉnh kỳ hạn trả nợ, gia hạn nợ, chuyển nợ quá hạn</p>'+[
    '1. Điều chỉnh kỳ hạn trả nợ', 'Nếu Bên vay chưa trả được nợ gốc theo đúng kỳ hạn trả nợ đã thỏa thuận trong Hợp đồng tín dụng thì trước ít nhất 05 ngày đến hạn trả nợ, Bên vay phải có đề nghị điều chỉnh kỳ hạn trả nợ. Thời hạn điều chỉnh cho 01 kỳ hạn trả nợ gốc có thể một hoặc nhiều lần, nhưng tối đa không vượt quá thời hạn của kỳ hạn trả nợ tiếp theo.',
    '2. Gia hạn nợ', 'Trước ngày đến hạn trả nợ cuối cùng, tối đa 03 tháng và tối thiểu 05 ngày làm việc, Bên vay không có khả năng trả được nợ và có nhu cầu gia hạn nợ, Bên vay phải lập Giấy đề nghị gia hạn nợ gửi Bên cho vay để xem xét cho gia hạn nợ theo quy định của Bên cho vay.',
    '3. Chuyển nợ quá hạn', 'Đến kỳ hạn trả nợ kể cả nợ của kỳ hạn trước đó đã được điều chỉnh mà Bên vay chưa trả được nợ, không được Bên cho vay xem xét cho điều chỉnh kỳ hạn trả nợ thì Bên cho vay chuyển số dư nợ đó sang nợ quá hạn.',
    'Đến hạn cuối cùng của thời hạn cho vay đã thỏa thuận trong Hợp đồng tín dụng, nếu Bên vay chưa trả được nợ, không được Bên cho vay xem xét cho gia hạn nợ, thì Bên cho vay chuyển toàn bộ số dư nợ còn lại sang quá hạn.'].map(function(x){ return '<p class="j'+(/^\d\./.test(x) ? '' : ' thut')+'">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 5. Xử lý các vi phạm</p>'+[
    '1. Tạm dừng cho vay: Bên vay vi phạm các cam kết trong Hợp đồng tín dụng và đang trong thời gian khắc phục sửa chữa.',
    '2. Chấm dứt cho vay: Bên vay vi phạm các cam kết trong Hợp đồng tín dụng nhưng không khắc phục, sửa chữa. Trong thời gian tối đa 03 tháng kể từ thời điểm thông báo cho Bên vay về việc chấm dứt cho vay, Bên cho vay thực hiện thu hồi nợ trước hạn, nếu Bên vay không trả hết số nợ vi phạm thì chuyển số nợ vi phạm còn lại sang quá hạn.',
    '3. Chuyển nợ quá hạn', '- Đối với trường hợp Bên vay sử dụng vốn vay sai mục đích đã ghi trong Hợp đồng tín dụng và được ghi nhận trong Biên bản kiểm tra, sau thời gian tối đa 30 ngày kể từ ngày phát hiện sai phạm được ghi trong Biên bản kiểm tra, Bên cho vay đã phối hợp với các cơ quan liên quan và chính quyền địa phương áp dụng các biện pháp để đôn đốc, yêu cầu Bên vay thực hiện nghĩa vụ trả nợ, nếu Bên vay không trả hết số nợ sử dụng sai mục đích thì chuyển số nợ sử dụng sai mục đích còn lại sang quá hạn;',
    '4. Thu hồi nợ trước hạn', 'Bên cho vay có quyền ra thu hồi nợ trước hạn trong các trường hợp sau:', '- Bên vay bị khó khăn trong nhận thức và làm chủ hành vi.', '- Bên vay cung cấp sai sự thật, vi phạm quy định trong Hợp đồng này, không phối hợp với Bên cho vay trong quá trình kiểm tra, giám sát sau cho vay.',
    '- Bên vay không thực hiện hoặc thực hiện không đúng, không đầy đủ các yêu cầu, chỉ dẫn của Bên cho vay liên quan đến các công việc nhằm ký kết, thực hiện, duy trì Hợp đồng này.', '- Bên vay vi phạm pháp luật, chính sách của Nhà nước; căn cứ kết luận của cơ quan Nhà nước có thẩm quyền về việc Bên cho vay phải thu hồi nợ trước hạn; hoặc Bên cho vay phải thu hồi nợ trước hạn để bảo đảm thu hồi nợ vay.',
    '5. Khởi kiện trước pháp luật: Bên cho vay có quyền khởi kiện trong các trường hợp sau:', '- Bên vay vi phạm Hợp đồng tín dụng đã được Bên cho vay thông báo bằng văn bản nhưng không khắc phục;', '- Bên vay có nợ quá hạn do nguyên nhân chủ quan nhưng không có biện pháp khả thi để trả Bên cho vay; Bên vay có năng lực tài chính để trả nợ nhưng cố tình trốn tránh trả nợ theo thỏa thuận;', '- Bên vay có hành vi lừa đảo, gian lận;', '- Các vi phạm khác theo quy định của pháp luật.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 6. Quyền và Nghĩa vụ của Bên cho vay</p>'+['1. Thực hiện đúng những nội dung đã thoản thuận;', '2. Yêu cầu Bên vay thực hiện đúng các điều khoản thỏa thuận;', '3. Yêu cầu Bên vay cung cấp, xuất trình các tài liệu, thông tin cần thiết liên quan đến món vay;', '4. Kiểm tra, giám sát tình hình sử dụng vốn vay, khả năng trả nợ của Bên vay;', '5. Từ chối các yêu cầu của Bên vay không đúng với quy định của pháp luật và thỏa thuận trong Hợp đồng này.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 7. Quyền và Nghĩa vụ của Bên vay</p>'+['1. Thực hiện đúng những nội dung đã thoản thuận;', '2. Được quyền yêu cầu Bên cho vay thực hiện đúng các điều khoản thỏa thuận;', '3. Lưu giữ và cung cấp, xuất trình đầy đủ, kịp thời, trung thực các thông tin, tài liệu liên quan đến vay vốn và chịu trách nhiệm trước pháp luật về tính chính xác của các thông tin, tài liệu đã cung cấp;', '4. Sử dụng vốn vay đúng mục đích; báo cáo việc sử dụng vốn vay và xuất trình tài liệu chứng minh việc sử dụng vốn vay theo Hợp đồng này;', '5. Chịu sự kiểm tra, giám sát của Bên cho vay trong sử dụng vốn vay và trả nợ;', '6. Phải thông báo kịp thời cho Bên cho vay những thay đổi về nơi cư trú, địa chỉ liên lạc, số điện thoại và những thay đổi khác ảnh hưởng đến khả năng trả nợ của Bên vay.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 8. Cam kết chung</p>'+['1. Hai bên cam kết thực hiện đúng các điều khoản của Hợp đồng tín dụng này. Mọi sửa đổi, bổ sung nội dung của các điều, khoản phải được sự thỏa thuận của hai bên bằng văn bản.', '2. Trong quá trình thực hiện, nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không thương lượng được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện theo pháp luật.', '3. Hợp đồng này và các văn bản bổ sung hợp đồng (nếu có) là một bộ phận thống nhất không thể tách rời nhau, các Bên phải có nghĩa vụ chấp hành.', '4. Khi Bên vay trả hết nợ gốc, lãi và các chi phí phát sinh khác (nếu có) theo Hợp đồng này, thì Hợp đồng này mặc nhiên được thanh lý.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 9. Một số thỏa thuận khác</p><p>'+o(P.khac, 90)+'</p>'+
    '<p class="j"><b>Điều 10.</b> Hợp đồng tín dụng có hiệu lực kể từ ngày ký cho tới khi Bên vay hoàn thành nghĩa vụ trả nợ bao gồm cả tiền gốc, lãi và các chi phí phát sinh khác (nếu có).</p><p class="j thut">Hợp đồng này được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản./.</p>'+
    hsoBang('khung0 hso-ky', [1, 1], '<tr><td class="c"><p class="c b">ĐẠI DIỆN BÊN VAY</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+s(N.ten, 20)+'</p></td><td class="c"><p class="c b">ĐẠI DIỆN BÊN CHO VAY</p><p class="c i s12">(Ký, ghi rõ họ tên và đóng dấu)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+o(hsoPGD('daiDien'), 20)+'</p></td></tr>')+
    '<p>&nbsp;</p><p class="c b s13 tr">PHỤ LỤC HỢP ĐỒNG TÍN DỤNG</p><p class="c i">(kèm theo Hợp đồng tín dụng số: '+hsoCham(6)+'/20'+hsoCham(3)+'/HĐ-TD ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+')</p>'+
    hsoPLBang('Phần theo dõi cho vay', ['Ngày tháng năm', 'Số tiền giải ngân', 'Lãi suất %/ năm', 'Hạn trả nợ cuối cùng', 'Dư nợ trong hạn', 'Chữ ký Bên vay', 'Chữ ký Kế toán'])+
    hsoPLBang('Phần theo dõi điều chỉnh kỳ hạn trả nợ, gia hạn nợ', ['Ngày, tháng, năm', 'Điều chỉnh kỳ hạn: Số tiền', 'Điều chỉnh kỳ hạn: Đến ngày, tháng, năm', 'Gia hạn nợ: Số tiền', 'Gia hạn nợ: Đến ngày, tháng, năm', 'Chữ ký Bên vay', 'Chữ ký Kế toán'])+
    hsoPLBang('Phần theo dõi nợ quá hạn, nợ bị rủi ro', ['Ngày tháng năm', 'Diễn giải', 'Số tiền chuyển nợ quá hạn/khoanh nợ/xoá nợ', 'Dư nợ quá hạn/khoanh nợ/xoá nợ', 'Chữ ký Bên vay', 'Chữ ký Kế toán']);
  return {ma:'07b/GQVL', h:h};
}
function hsoPLBang(tieu, cot){ return '<p class="b tr">'+tieu+'</p><p class="r i s11">Đơn vị: đồng</p>'+hsoBang('luoi s11', cot.map(function(){ return 1; }), '<tr>'+cot.map(function(x){ return '<td class="c b">'+x+'</td>'; }).join('')+'</tr><tr>'+cot.map(function(x, i){ return '<td class="c i">'+(i+1)+'</td>'; }).join('')+'</tr>'+
  [1,2,3,4,5].map(function(){ return '<tr>'+cot.map(function(){ return '<td>&nbsp;</td>'; }).join('')+'</tr>'; }).join('')); }
function hsoTuyGQ(B){   /* ③ phương án GQVL: chọn nhanh như GDX + ưu tiên, lao động, hiệu quả, hợp đồng */
  var G = hsoGQ(B), C = G.C, P = B.pa || {}, L = P.ld || {}, A = G.A, h = '';
  var o = function(nhan, duong, gt, ph){ return hsoTuyO(nhan, '<input value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoBoDat(\''+duong+'\',this.value,1)">'); };
  var chip = function(ds, ham, chon){ return '<div class="hang-nut hso-chon">'+ds.map(function(x){ return gdxChip(coChuHTML(x[1]), String(x[0])===String(chon), ham(x[0]), 'hso-ct', ''); }).join('')+'</div>'; };
  var dong = P.dong || [];
  h += '<div class="nhan-nhom">③ Phương án GQVL — mục đích (bấm chọn nhanh)</div>'+(C.md.length ? chip(C.md.map(function(x){ return [x, x]; }), function(v){ return 'hsoGQThemMD(\''+String(v).replace(/'/g, "\\'")+'\')'; }, '') : '<div class="sl-phu">Chưa khai mục đích — khai ở thẻ GQVL (① ⚙ khai báo chương trình).</div>')+
    hsoGQDvDs()+dong.map(function(x, i){ var t = hsoGQTach(x); return '<div class="hso-ho"><input style="width:42%" value="'+coChuHTML(x.md||'')+'" placeholder="mục đích (vd Chăn nuôi bò sinh sản)" onchange="hsoGQDong('+i+',\'md\',this.value)"><input style="width:10%" value="'+coChuHTML(t.sl)+'" placeholder="số lượng" title="Số lượng (số)" onchange="hsoGQDong('+i+',\'sl\',this.value)"><input style="width:12%" list="hso-dv-ds" value="'+coChuHTML(t.dv)+'" placeholder="đơn vị" title="Đơn vị: con, m², ha, công, cây… — app nhớ theo mục đích" onchange="hsoGQDong('+i+',\'dv\',this.value)"><input style="width:22%" value="'+coChuHTML(x.tien ? tdnTien(hsoSo(x.tien)) : '')+'" placeholder="thành tiền" onchange="hsoGQDong('+i+',\'tien\',this.value)"> <button class="nho" onclick="hsoGQDong('+i+',\'xoa\')">✕</button></div>'; }).join('')+
    '<button class="nho" onclick="hsoGQThemMD(\'\')">＋ Dòng mục đích</button>';
  if(dong.length<=1) h += '<div class="nhan-nhom">Số tiền vay</div>'+chip((C.chipTien||[]).map(function(x){ return [x, tdnTien(+x)]; }), function(v){ return 'hsoGQTien(\''+v+'\')'; }, String(A.tien));
  h += '<div class="nhan-nhom">Thời hạn · kỳ hạn trả gốc</div>'+chip([12, 36, 60].map(function(x){ return [x, x+' tháng']; }), function(v){ return 'hsoBoDat(\'th\',\''+v+'\',1)'; }, A.th)+
    chip([24, 12].map(function(x){ return [x, x+' tháng/lần']; }), function(v){ return 'hsoBoDat(\'ky\',\''+v+'\',1)'; }, A.ky)+
    o('Vốn tự có (đ)', 'tuCo', B.tuCo, G.tu.tuCo ? 'tự tính: '+tdnTien(G.tuCo) : '0')+o('Tên phương án', 'pa.ten', P.ten, A.md || 'trống = theo mục đích')+o('Địa điểm thực hiện', 'pa.dd', P.dd, 'trống = nơi ở')+
    '<div class="nhan-nhom">Đối tượng ưu tiên (tích 1–5 → lãi suất ưu tiên)</div>'+HSO_UT.map(function(x, i){ return '<label class="hso-o2"><input type="checkbox"'+((P.ut||[]).indexOf(i)>=0 ? ' checked' : '')+' onchange="hsoGQUT('+i+',this.checked)"> '+(i+1)+'. '+coChuHTML(x)+'</label>'; }).join('')+
    ((P.ut||[]).indexOf(5)>=0 ? o('Khác (ghi rõ)', 'pa.utKhac', P.utKhac, '') : '')+((P.ut||[]).length ? o('Giấy tờ xác nhận', 'pa.utGT', P.utGT, 'trống = chấm') : '')+
    '<div class="nhan-nhom">Lao động (trống = chấm)</div><div class="hso-ho">'+[['tong','Tổng'], ['tao','Tạo'], ['duy','Duy trì'], ['mo','Mở rộng'], ['nu','Nữ'], ['ho','Thuộc hộ'], ['ngoai','Ngoài hộ']].map(function(x){ return '<label class="hso-ld">'+x[1]+' <input class="hso-so" value="'+coChuHTML(L[x[0]]||'')+'" onchange="hsoBoDat(\'pa.ld.'+x[0]+'\',this.value,1)"></label>'; }).join('')+'</div>'+
    '<div class="nhan-nhom">Hiệu quả (cả thời gian phương án)</div>'+o('Tổng doanh thu (đ)', 'pa.dt', P.dt, G.tu.dt ? 'tự tính: '+tdnTien(G.dt) : 'trống = chấm')+o('Tổng chi phí (đ, gồm lãi vay)', 'pa.cp', P.cp, G.tu.cp ? 'tự tính: '+tdnTien(G.cp) : 'trống = chấm')+
    (G.k ? '<div class="sl-phu">Ô trống tự tính theo hệ số <b>k = '+hsoSoVN(G.k)+'</b> (vốn tự có 20 tr × k · chi phí = vay + 40 tr × k · lợi nhuận = vốn − 10 tr × k) <button class="nho" onclick="hsoGQDoiK()" title="Đổi hệ số ngẫu nhiên — số liệu phương án khác đi">🎲 Đổi số</button></div>' : '')+
    '<div class="sl-phu">Lãi suất <b>'+hsoSoVN(G.ls)+' %</b>'+(G.ut ? ' (ưu tiên)' : '')+' · quá hạn '+hsoSoVN(G.qh)+' % · lãi vay dự kiến <b>'+tdnTien(G.lai)+'</b> đ'+(G.cl!=null ? ' · chênh lệch '+tdnTien(G.cl)+' đ · BQ '+tdnTien(G.bq)+' đ/tháng' : '')+'</div>'+
    (G.lich.length ? '<div class="sl-phu">Lịch trả gốc'+(+B.ky ? '' : ' (tự phân kỳ '+(G.ky ? G.ky+' tháng/lần' : '1 lần')+')')+': '+G.lich.map(function(k){ return (k.ngay ? ngayVNsl(k.ngay) : 'tháng '+k.thang)+': '+tdnTien(k.tien); }).join(' · ')+'</div>' : '')+
    (G.canh.length ? '<div class="sl-phu hso-canh">⚠ '+coChuHTML(G.canh.join('; '))+'</div>' : '')+
    '<div class="nhan-nhom">Hợp đồng 07b</div>'+o('Ngày ký HĐ', 'ngayHD', hsoNgayVN(B.ngayHD), 'dd/mm/yyyy — trống = ngày chấm')+o('Ngày giải ngân (gốc lịch trả nợ)', 'ngayGN', hsoNgayVN(B.ngayGN), 'trống = theo ngày ký HĐ')+
    '<div class="hang-nut"><label class="hso-o2"><input type="radio" name="hso-gn"'+(P.gn==='tm' ? ' checked' : '')+' onchange="hsoBoDat(\'pa.gn\',\'tm\',1)"> Tiền mặt</label><label class="hso-o2"><input type="radio" name="hso-gn"'+(P.gn==='ck' ? ' checked' : '')+' onchange="hsoBoDat(\'pa.gn\',\'ck\',1)"> Chuyển khoản</label><label class="hso-o2"><input type="radio" name="hso-gn"'+(!P.gn ? ' checked' : '')+' onchange="hsoBoDat(\'pa.gn\',\'\',1)"> Để trống</label></div>'+
    (P.gn==='ck' ? o('Số tài khoản', 'pa.stk', P.stk, '')+o('Tại ngân hàng', 'pa.nh', P.nh, '') : '');
  return h;
}
function hsoGQThemMD(md){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var ds = B.pa.dong = B.pa.dong || []; var C = hsoCTV(B.ct) || {};
  if(md && ds.length===1 && !ds[0].md){ ds[0].md = md; if(!ds[0].dv) ds[0].dv = hsoGQDvGoi(md); } else ds.push({md:md, sl:'', dv:hsoGQDvGoi(md), tien:ds.length ? '' : (C.chipTien||[])[1] || ''}); hsoBoLuu(); hsoVe(); }
function hsoGQDong(i, f, v){ var B = hsoBo(); if(!B) return; var ds = (B.pa||{}).dong || [], x = ds[i];
  if(f==='xoa'){ ds.splice(i, 1); hsoBoLuu(); hsoVe(); return; } if(!x) return;
  v = f==='tien' ? String(v||'').replace(/[^\d]/g, '') : String(v||'').trim();
  if(f==='sl' || f==='dv'){ var t = hsoGQTach(x); x.sl = t.sl; x.dv = t.dv; }   /* dữ liệu cũ "4 con" → tách số + đơn vị */
  if(f==='sl' && v && !/^[\d.,]+$/.test(v)){ var m = v.match(/^([\d.,]+)\s*(.+)$/); if(m){ v = m[1]; x.dv = m[2].trim(); } else bao('Số lượng nên là số (vd 4, 25, 0,5) — đơn vị ghi ở ô bên cạnh.'); }
  x[f] = v;
  var MD = hsoKB().mdDv = hsoKB().mdDv || {}, k = slChuan(x.md||'');
  if(f==='md' && k && !x.dv) x.dv = hsoGQDvGoi(v);   /* 3.228: nhớ đơn vị theo mục đích */
  if(f==='dv' && k && v) MD[k] = v;
  if(f==='md' && v){ var C = hsoCTV(B.ct); if(C && C.kieu==='gqvl' && !C.md.some(function(m){ return slChuan(m)===k; })){ C.md.push(v); luu(); } }   /* mục đích gõ mới → gợi ý lần sau */
  hsoBoLuu(); hsoVe(); }
var HSO_DV = ['con', 'm²', 'ha', 'công', 'cây', 'cái', 'chiếc', 'tấn', 'kg', 'gốc', 'ô', 'm³', 'bộ', 'lồng', 'máy'];   /* 3.228: gợi ý đơn vị số lượng GQVL */
function hsoGQDvGoi(md){ var k = slChuan(md||''); if(!k) return ''; var MD = hsoKB().mdDv || {}; if(MD[k]) return MD[k];   /* đơn vị gợi ý: đã nhớ → theo từ khóa */
  return /chan nuoi|nuoi\s(bo|heo|lon|ga|vit|de|ca|tom|be)/.test(k) ? 'con' : /cai tao|xay|sua chua|mo rong quan|nha xuong/.test(k) ? 'm²' : /trong\s(lua|mia|mi|cao su|rau)/.test(k) ? 'ha' : /trong cay/.test(k) ? 'cây' : ''; }
function hsoGQDvDs(){ var MD = hsoKB().mdDv || {}, co = {}; return '<datalist id="hso-dv-ds">'+HSO_DV.concat(Object.keys(MD).map(function(k){ return MD[k]; })).filter(function(d){ if(co[d]) return false; co[d] = 1; return true; }).map(function(d){ return '<option value="'+coChuHTML(d)+'">'; }).join('')+'</datalist>'; }
function hsoGQTach(x){ var sl = String(x.sl||'').trim(), dv = String(x.dv||'').trim(), m;   /* {sl, dv} — dữ liệu cũ ghi chung "4 con" */
  if(!dv && (m = sl.match(/^([\d.,]+)\s*(\D.*)$/))){ sl = m[1]; dv = m[2].trim(); } return {sl:sl, dv:dv}; }
function hsoGQSL(x){ var t = hsoGQTach(x); return t.sl+(t.sl && t.dv ? ' '+t.dv : t.dv); }   /* chữ in: "4 con", "25 m²" */
function hsoGQTien(v){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var ds = B.pa.dong = B.pa.dong || []; if(!ds.length) ds.push({md:'', sl:'', tien:v}); else ds[0].tien = v; hsoBoLuu(); hsoVe(); }
function hsoGQUT(i, v){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var u = B.pa.ut = B.pa.ut || [], k = u.indexOf(i); if(v && k<0) u.push(i); if(!v && k>=0) u.splice(k, 1); hsoBoLuu(); hsoVe(); }
/* ---------- 3.209: cột trái 01/TD · 01/UQ · 03/TD · 01/TGTV theo hộ — chọn hộ → chọn chương trình → phương án → in (+ in kèm) ---------- */
function hsoKemCo(B){ var k = (B && B.kem) || {}; return !!(k.ds || k.bb || k.uq || k.tgtv || k.hd || k.pd); }
function hsoUQThieu(B){   /* thành viên ≥ 18 tuổi thiếu ngày sinh / CCCD (giấy UQ) — 3.256: bỏ người dưới 18 tuổi */
  var r = []; (B.ho || []).forEach(function(x){ var tu = hsoTuoi(x.ns, HSO.vay.ngayLap); if(tu>=0 && tu<18) return; if(!x.ns || !x.cccd) r.push(x.ten); }); return r; }
/* 3.256 (anh chốt 17/10, ý 10.3 — "code tiếp" 18/10): GIẤY ỦY QUYỀN 01/UQ chọn hộ từ 📒 Sổ hộ vay — thành viên / người thừa kế khai sẵn ở sổ.
   Form đi đúng thứ tự giấy: hộ → I. ngày lập, số người, thành viên ≥ 18 tuổi → II. người được ủy quyền (= người đứng tên vay trong sổ, chung 01/TD) → bên ủy quyền → trưởng thôn chứng kiến. */
function hsoTuoi(ns, ngay){ var d = hsoNg(ns), n = ngay ? hsoNg(ngay) : null, h = n ? new Date(+n.y, +n.m-1, +n.d) : new Date(); if(!d) return -1;
  var t = h.getFullYear()-(+d.y); if(h.getMonth()+1<+d.m || h.getMonth()+1===+d.m && h.getDate()<+d.d) t--; return t; }
function hmDatDung(id, i){ var o = hmTim(id); if(!o || !o.tv[i]) return; o.dung = +i; luu(); var B = hsoBo(); if(B && B.hoId===id) hmDongBo(o, B); hsoBoLuu(); hsoVe(); }
function hsoTuyUQ(M, t){
  var B = hsoBo(), o = B && B.hoId ? hmTim(B.hoId) : null, h = '<div class="nhan-nhom hso-kbr">✎ Nhập liệu — Mẫu 01/UQ <small>(theo thứ tự trên giấy)</small></div>';
  if(B && !o) B = null; if(o) hmDongBo(o, B);
  h += hsoTuyO('👪 Hộ (📒 Sổ hộ vay)', hsoChon('hmChonHo(this.value)', o ? o.id : '', [['', hmDs().length ? '— chọn hộ trong sổ ('+hmDs().length+') —' : '— sổ trống —']].concat(hmDs().map(function(x){ var n = x.tv[x.dung||0] || {}; return [x.id, (n.ten||'(chưa tên)')+(x.kh ? ' · '+x.kh : ' · hộ mới')+(hmToTen(x) ? ' · '+hmToTen(x) : '')]; }))))+
    '<div class="hang-nut"><button class="nho" onclick="hmMo()">＋ Hộ mới</button><button class="nho" onclick="hmM31Hop()">＋ Lấy từ Mẫu 31</button>'+(o ? '<button class="nho chinh" onclick="hmMo(\''+o.id+'\')" title="Thêm / sửa thành viên, người thừa kế, ngày sinh, CCCD ở sổ">✎ Sửa thành viên ở sổ</button>' : '')+'</div>';
  if(!o) return h+'<div class="sl-phu">Chưa chọn hộ → khung phải là mẫu trắng (in được ngay). Thành viên / người thừa kế khai ở 📒 Sổ hộ vay (＋ Hộ mới / ✎ Sửa).</div>'+hsoKBRieng(M.k, null);
  var V = HSO.vay, tv = o.tv.map(function(x, i){ return {x:x, i:i, tuoi:hsoTuoi(x.ns, V.ngayLap)}; }).filter(function(r){ return r.x.ten; }), dung = o.dung || 0;
  h += '<div class="nhan-nhom">I. Hộ gia đình</div>'+hsoTuyO('Ngày lập giấy', '<input type="date" value="'+coChuHTML(V.ngayLap||'')+'" onchange="HSO.vay.ngayLap=this.value;hsoVe()">')+'<div class="sl-phu">Trống = chấm ghi tay.</div>'+
    hsoTuyO('Hộ gồm (người)', '<input inputmode="numeric" value="'+coChuHTML(B.soNguoi||'')+'" placeholder="'+tv.length+' (theo sổ) — trống = chấm" onchange="hsoBoDat(\'soNguoi\',this.value.replace(/\\D/g,\'\'),1)">');
  h += '<div class="hso-tick-ds">'+tv.map(function(r, k){ var x = r.x, thieu = [!x.ns && 'ngày sinh', !x.cccd && 'CCCD'].filter(Boolean), nho = r.tuoi>=0 && r.tuoi<18;
    return '<div>'+(r.i===dung ? '⭐ ' : '• ')+'<b>'+coChuHTML(x.ten)+'</b>'+(x.qh ? ' <small>· '+coChuHTML(x.qh)+'</small>' : '')+(x.ns ? ' <small>· '+hsoNgayVN(x.ns)+(r.tuoi>=0 ? ' ('+r.tuoi+' t)' : '')+'</small>' : '')+(x.cccd ? ' <small>· '+coChuHTML(x.cccd)+'</small>' : '')+
      (nho ? ' <b class="hso-canh">dưới 18 tuổi — không vào giấy</b>' : thieu.length ? ' <b class="hso-canh">thiếu '+thieu.join(', ')+'</b>' : '')+'</div>'; }).join('')+'</div>';
  var thieuAi = hsoUQThieu(B); if(!B.ho.length || thieuAi.length) h += '<div class="sl-bao vang hso-nhac">⚠ Giấy UQ cần đủ thành viên ≥ 18 tuổi (ngày sinh, CCCD)'+(thieuAi.length ? ' — thiếu: '+coChuHTML(thieuAi.join(', ')) : ' — hộ chưa có thành viên khác')+' <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung ở sổ</button></div>';
  h += '<div class="nhan-nhom">II. Người được ủy quyền</div>'+hsoTuyO('Cử ông (bà)', hsoChon('hmDatDung(\''+o.id+'\',this.value)', String(dung), tv.filter(function(r){ return !(r.tuoi>=0 && r.tuoi<18); }).map(function(r){ return [String(r.i), r.x.ten+(r.x.qh ? ' · '+r.x.qh : '')]; })))+
    '<div class="sl-phu">= người đứng tên vay trong sổ (01/TD dùng chung). Thành viên còn lại là <b>Bên ủy quyền</b>.</div>';
  var tt = hsoBoT(B).truongAp || ''; h += hsoTuyO('Trưởng thôn chứng kiến', '<span class="l01-tu">'+(tt ? coChuHTML(tt) : '— chưa khai (⚙ Khai báo đơn vị › Trưởng ấp) —')+'</span>');
  return h+hsoKBRieng(M.k, {ubOng:B.nv.ten}); }
function hsoTuyHo(M, t){
  var B = hsoBo(), o = B && B.hoId ? hmTim(B.hoId) : null, h = '';
  if(B && !o) B = null;
  if(o) hmDongBo(o, B);
  h += hsoTuyO('👪 Hộ vay', hsoChon('hmChonHo(this.value)', o ? o.id : '', [['', hmDs().length ? '— chọn hộ trong sổ ('+hmDs().length+') —' : '— sổ trống —']].concat(hmDs().map(function(x){ var n = x.tv[x.dung||0] || {}; return [x.id, (n.ten||'(chưa tên)')+(x.kh ? ' · '+x.kh : ' · hộ mới')+(hmToTen(x) ? ' · '+hmToTen(x) : '')]; }))))+
    '<div class="hang-nut"><button class="nho" onclick="hmMo()">＋ Hộ mới</button><button class="nho" onclick="hmM31Hop()">＋ Lấy từ Mẫu 31</button>'+(o ? '<button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Sửa / bổ sung hộ</button>' : '')+'</div>';
  var kbr = /^(01td|01uq|01gqvl|07b)$/.test(M.k) ? function(){ return hsoKBRieng(M.k, o ? {ubOng:B.nv.ten} : null); } : function(){ return ''; };   /* 3.215: ⚙ Khai báo riêng */
  if(!o) return h+'<div class="sl-phu">Chưa chọn hộ → khung phải là mẫu trắng (in được ngay).</div>'+kbr();
  var N = B.nv, C = hsoCTV(B.ct) || {};
  h += '<div class="sl-phu"><b>'+coChuHTML(N.ten)+'</b>'+(N.cccd ? ' · CCCD '+coChuHTML(N.cccd) : '')+(o.kh ? ' · mã KH '+coChuHTML(o.kh) : ' · hộ mới (chưa mã KH)')+(hmToTen(o) ? ' · '+coChuHTML(hmToTen(o)) : ' · <b class="hso-canh">chưa gắn tổ</b>')+'</div>';
  if(M.k==='01uq'){ var th = hsoUQThieu(B); if(!B.ho.length || th.length) h += '<div class="sl-bao vang hso-nhac">⚠ Giấy UQ cần đủ thành viên ≥ 18 tuổi (ngày sinh, CCCD)'+(th.length ? ' — thiếu: '+coChuHTML(th.join(', ')) : ' — hộ chưa có thành viên')+' <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung</button></div>'; return h; }
  if(M.k==='01tgtv') return h;
  if(M.k==='01gqvl' || M.k==='07b' || M.k==='pdnh'){   /* 3.257 (anh 18/10 "rà soát form mẫu nào không lọt mẫu khác"): mẫu riêng GQVL — không chip chương trình khác, không phương án / In kèm của HSSV, NSVSMT */
    if(C.kieu!=='gqvl'){ var gqC = hsoCTVDs().find(function(c){ return c.kieu==='gqvl'; });
      return h+'<div class="sl-bao vang hso-nhac">Mẫu '+coChuHTML(M.ma)+' chỉ dùng cho chương trình <b>GQVL</b> — hộ đang chọn <b>'+coChuHTML(B.ct||'')+'</b>. '+(gqC ? '<button class="nho chinh" onclick="hsoBoDat(\'ct\',\''+gqC.ma+'\',1)">Chuyển hộ sang chương trình GQVL</button>' : '')+' Chưa chuyển thì khung phải in theo hộ, phần phương án để chấm.</div>'+kbr(); }
    h += '<div class="sl-phu">Chương trình: <b>'+coChuHTML(C.ten || C.ma)+'</b></div>'+hsoTuyPA(B)+(M.k==='01gqvl' ? hsoTuyKem(B, o, true) : '');
    return h+kbr(); }
  h += '<div class="nhan-nhom">① Chương trình vay <a href="#" class="hso-nho" onclick="event.preventDefault();hsoKBHop(\'ct\')">⚙ khai báo chương trình</a></div><div class="hang-nut">'+
    hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===B.ct; }).map(function(c){ return gdxChip('<b>'+coChuHTML(c.ma)+'</b>', B.ct===c.ma, 'hsoBoDat(\'ct\',\''+c.ma+'\',1)', 'hso-ct', c.ten); }).join('')+'</div>';
  if(C.kieu==='hssv') h += hsoTuySV(B, o);
  var gq = C.kieu==='gqvl';
  if(M.k==='01td' && gq) h += '<div class="sl-bao vang hso-nhac">GQVL dùng mẫu riêng <b>01/GQVL</b> (đơn) + <b>07b/GQVL</b> (hợp đồng) — <button class="nho chinh" onclick="hsoChonMau(\'01gqvl\')">Mở 01/GQVL</button></div>';
  if(M.k==='01gqvl' && !gq) h += '<div class="sl-bao vang hso-nhac">Mẫu 01/GQVL dành cho chương trình <b>GQVL</b> — chọn chip GQVL ở trên.</div>';
  h += hsoTuyPA(B);
  if(M.k==='01td' || M.k==='01gqvl') h += hsoTuyKem(B, o, gq);
  return h+kbr();
}
/* 3.243b: chip chọn sinh viên (hộ nhiều SV) và khối "In kèm" — dùng chung cột cũ và form lập 01/TD (L01) */
function hsoTuySV(B, o){ var sv = hmSV(o).map(function(i){ return (o.tv[i]||{}).ten; }).filter(Boolean);
  return sv.length>1 ? '<div class="nhan-nhom">Sinh viên (mỗi SV 1 đơn)</div><div class="hang-nut">'+sv.map(function(x){ return gdxChip(coChuHTML(x), (B.pa||{}).sv===x, 'hsoBoDat(\'pa.sv\',\''+
      String(x).replace(/'/g, "\\'")+'\',1)', 'hso-ct', ''); }).join('')+'</div>' : sv.length ? '' : '<div class="sl-phu hso-canh">Hộ chưa đánh dấu HSSV — gõ tên SV ở ô dưới hoặc <a href="#" onclick="event.preventDefault();hmMo(\''+o.id+'\')">✎ bổ sung</a>.</div>'; }
function hsoTuyKem(B, o, gq){
  return '<div class="nhan-nhom">In kèm (1 lần in / 1 file Word)</div>'+(gq ? [['ds','03/TD danh sách'], ['bb','10C biên bản họp'], ['pd','Trang Phê duyệt của Ngân hàng (sau 01/GQVL)'], ['hd','07b/GQVL hợp đồng tín dụng'], ['tgtv','01/TGTV mở TK tổ viên'+
      (o.kh ? '' : ' (hộ mới)')]] : [['ds','03/TD danh sách'], ['bb','10C biên bản họp'], ['uq','01/UQ giấy ủy quyền'], ['tgtv','01/TGTV mở TK tổ viên'+(o.kh ? '' : ' (hộ mới)')], ['k06','06/TD phiếu kiểm tra (in tiếp sau, khổ ngang)']]).map(function(x){
      return '<label class="hso-o2"><input type="checkbox"'+(B.kem[x[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'kem.'+x[0]+'\',this.checked?1:0,1)"> '+x[1]+'</label>'; }).join('')+
    (B.kem.uq && (hsoUQThieu(B).length || !B.ho.length) ? '<div class="sl-bao vang hso-nhac">⚠ 01/UQ thiếu thành viên / ngày sinh, CCCD — <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung</button></div>' : '')+
    (B.kem.bb || B.kem.ds ? hsoNgayTuy('Ngày họp tổ', 'Biên bản, 03/TD — trống = chấm.') : '');
}
/* ---------- cột tùy chọn của từng mẫu ---------- */
function hsoTuyO(nhan, html, ghi){ return '<label class="kt-kb hso-o"><span>'+nhan+'</span>'+html+'</label>'+(ghi ? '<div class="sl-phu">'+ghi+'</div>' : ''); }
function hsoIn(js, gt, ph, kieu, id){ return '<input'+(id ? ' id="'+id+'"' : '')+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" oninput="'+js+'">'; }
function hsoChon(js, gt, ops){ return '<select onchange="'+js+'">'+ops.map(function(o){ return '<option value="'+coChuHTML(o[0])+'"'+(String(o[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(o[1])+'</option>'; }).join('')+'</select>'; }
function hsoDsTick(nhom, ds, tieu, rong){
  var n = ds.filter(function(x){ return HSO[nhom][x.kh]; }).length;
  return '<details class="hso-tick"'+(ds.length && ds.length<=15 ? ' open' : '')+'><summary>'+tieu+' — <b id="hso-dem-'+nhom+'">'+n+'</b>/'+ds.length+'</summary>'+
    (ds.length ? '<div class="hso-tick-ds">'+ds.map(function(x){ return '<label><input type="checkbox"'+(HSO[nhom][x.kh] ? ' checked' : '')+' onchange="hsoTick(\''+nhom+'\',\''+x.kh+'\',this.checked)"> '+coChuHTML(x.ten)+(x.ghi ? ' <small>'+coChuHTML(x.ghi)+'</small>' : '')+'</label>'; }).join('')+'</div>' : '<div class="sl-phu">'+(rong||'Không có ai.')+'</div>')+'</details>';
}
function hsoNgayTuy(nhan, ghi){ return hsoTuyO(nhan || 'Ngày họp', hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay||'', '', 'date'), ghi || 'Để trống = chấm, ghi tay.'); }
function hsoHoiTuy(t){ var vt = hsoLuu().hoiVT; if(vt===undefined) vt = 'pct';
  return hsoTuyO('Đại diện Hội', hsoChon('hsoDatLuu(\'hoiVT\',this.value)', vt, ktInVTTen(KT_IN_VT, t ? [{t:t}] : [], vt))); }
function hsoTuyHTML(M, t){
  var S = hsoCH(), T = hsoTo(t), L = hsoLuu(), h = '<div class="nhan-nhom hso-kbr">✎ Nhập liệu — '+(M.k==='sohv' ? '' : 'Mẫu ')+coChuHTML(M.ma)+'</div>'+(typeof omCo==='function' && omCo(M.k) ? omKieuHTML(M.k) : '')+hsoThieuHTML(M, t), can = !t && ['bo','01uq','01td','03td','01tgtv','sohv','01gqvl','07b'].indexOf(M.k)<0;
  if(can) h += '<div class="sl-bao vang hso-nhac">Chọn <b>1 tổ</b> ở khối LỌC ĐỊA BÀN để app điền sẵn — chưa chọn thì khung phải là mẫu trắng (in được ngay).</div>';
  if(t && T.phoKB && T.phoMay && slChuan(T.phoMay)!==slChuan(T.pho)) h += '<div class="sl-phu hso-canh">⚠ Tổ phó theo khai báo: <b>'+coChuHTML(T.pho)+'</b> (trên máy: '+coChuHTML(T.phoMay)+')</div>';
  else if(t && !T.pho) h += '<div class="sl-phu hso-canh">Tổ chưa có tổ phó trên máy — <a href="#" onclick="event.preventDefault();hsoKBHop(\'pho\')">⚙ khai tổ phó thực tế</a>.</div>';
  if(t && !T.truongAp && ['10c','10ccu','10a','10b','10d'].indexOf(M.k)>=0) h += '<div class="sl-phu hso-canh">Chưa khai trưởng ấp '+coChuHTML(T.ap)+' — <a href="#" onclick="event.preventDefault();hsoKBHop(\'ap\')">⚙ khai báo</a>.</div>';
  var tv = hsoTVTo(t);
  if(M.k==='10c' || M.k==='10ccu'){   /* 3.223 (anh 16/10): 10C cũ / mới là 2 chip — bỏ chọn mẫu theo ngày */
    var raBD = TO_BD && t && TO_BD.to===t.ma && TO_BD.co ? TO_BD.ra : [];
    h += hsoNgayTuy('Ngày họp', 'Trống = chấm (Hồ sơ Tổ mặc định để trống ngày).')+hsoHoiTuy(t)+
      hsoTuyO('Tiết kiệm tối thiểu (đ)', hsoIn('hsoDatLuu(\'tkMin\',this.value)', L.tkMin||'', 'trống = chấm'))+
      (t ? hsoDsTick('kn', tv.filter(function(k){ return k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.vao.tu}; }).concat(tv.filter(function(k){ return !k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:'tổ viên hiện có'}; })), '➕ Kết nạp (mới vào tích sẵn)')+
        hsoDsTick('ra', raBD.map(function(r){ return {kh:r.kh, ten:r.ten, ghi:'đã ra khỏi tổ — '+r.di}; }).concat(tv.filter(function(k){ return !k.conNo && !k.chuaGN; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.t105>0 ? 'tất nợ, còn 105' : 'tất nợ, 105 = 0'}; })), '➖ Cho ra (ra khỏi tổ + tất nợ 105 = 0 tích sẵn)', TO_BD ? 'Không có.' : 'Đang so Mẫu 31 tháng trước…') : '');
  }
  else if(M.k==='10a'){
    h += hsoNgayTuy()+hsoHoiTuy(t)+hsoTuyO('Ngày họp định kỳ', hsoIn('hsoDatLuu(\'ngayDK\',this.value)', L.ngayDK||'', 'vd 15 hằng tháng'))+hsoTuyO('Tiết kiệm tối thiểu (đ)', hsoIn('hsoDatLuu(\'tkMin\',this.value)', L.tkMin||'', 'trống = chấm'));
    if(t){ tv.forEach(function(k){ if(HSO.tv[k.kh]===undefined) HSO.tv[k.kh] = true; }); h += hsoDsTick('tv', tv.map(function(k){ return {kh:k.kh, ten:k.ten}; }), '👥 Danh sách tổ viên in vào biên bản'); }
  }
  else if(M.k==='10b'){
    var B = t ? hsoBau(t) : {tt:'', ttCu:'', pho:'', phoCu:''};
    h += hsoNgayTuy()+hsoHoiTuy(t)+
      (t ? hsoDsTick('kn', tv.filter(function(k){ return k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.vao.tu}; }).concat(tv.filter(function(k){ return !k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten}; })), '➕ Kết nạp (mới vào tích sẵn)') : '')+
      '<div class="nhan-nhom">Bầu thay Ban quản lý'+(t && hsoTruoc(t) ? ' <small>(gợi ý so Mẫu 31 tháng trước)</small>' : '')+'</div>'+
      hsoTuyO('Tổ trưởng mới', hsoIn('hsoDocO()', B.tt, 'trống = chấm', '', 'hso-o-ttMoi'))+hsoTuyO('thay Ông (Bà)', hsoIn('hsoDocO()', B.ttCu, '', '', 'hso-o-ttCu'))+
      hsoTuyO('Tổ phó mới', hsoIn('hsoDocO()', B.pho, 'trống = chấm', '', 'hso-o-phoMoi'))+hsoTuyO('thay Ông (Bà)', hsoIn('hsoDocO()', B.phoCu, '', '', 'hso-o-phoCu'));
  }
  else if(M.k==='10d') h += hsoNgayTuy()+hsoHoiTuy(t);
  else if(M.k==='11' || M.k==='11cu'){
    var K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {};
    h += hsoNgayTuy('Ngày ký', 'Trống = chấm.')+'<div class="sl-phu">Bên A (PGD) lấy ở <a href="#" onclick="event.preventDefault();hsoKBHop(\'pgd\')">⚙ Khai báo chung</a>'+(hsoPGD('daiDien') ? '' : ' — <b>chưa khai người đại diện</b>')+'.</div>'+
      (t ? '<div class="sl-phu">'+(c.cccd ? 'CCCD tổ trưởng: '+coChuHTML(c.cccd)+' — căn cứ: '+coChuHTML(K.cc) : '⚠ Chưa khớp được tổ trưởng với khách trong Mẫu 31 → số căn cước để chấm.')+'</div>' : '');
  }
  else if(M.k==='01bg' || M.k==='02bg'){
    var G = t ? hsoGiaoNhan(t) : {giao:'', nhan:''};
    h += hsoNgayTuy('Ngày lập')+hsoHoiTuy(t)+hsoTuyO('Bên giao (tổ trưởng cũ)', hsoIn('hsoDocO()', G.giao, 'trống = chấm', '', 'hso-o-giao'))+
      hsoTuyO('Bên nhận (tổ trưởng mới)', hsoIn('hsoDocO()', G.nhan, 'trống = chấm', '', 'hso-o-nhan'),
        t && hsoTruoc(t) && slChuan(hsoTruoc(t).ten)!==slChuan(T.tt) ? 'Tổ trưởng đổi so với tháng trước ('+coChuHTML(hsoTruoc(t).ten)+' → '+coChuHTML(T.tt)+') — đã điền sẵn.' : '');
    if(M.k==='02bg') h += '<label class="hso-o2"><input type="checkbox"'+(L.bgCa ? ' checked' : '')+' onchange="hsoDatLuu(\'bgCa\',this.checked)"> Gồm cả tổ viên không còn số dư (tất nợ, 105 = 0)</label>'+
      (KHO.coKy() ? '<div class="sl-phu">Số liệu đến ngày '+ngayVNsl(KHO.ky().ngay)+' ('+coChuHTML(KHO.ky().hsoTen||'')+'). Đổi kỳ ở 📅 đầu trang.</div>' : '');
  }
  else h += hsoTuyVay(M, t, tv);
  return h;
}
function hsoTuyVay(M, t, tv){
  hmChuyenCu();   /* 3.240 (anh 17/10): phiếu chưa gắn sổ → gắn trước, mọi mẫu đi theo Sổ hộ vay (trước rơi về giao diện Hộ vay cũ) */
  var V = HSO.vay, B = hsoBo(), h = '';
  if(M.k==='sohv') return hmSoHTML();   /* 3.214 */
  if(M.k==='01td' && typeof L01!=='undefined') return L01.form(M, t);   /* 3.242: form lập 01/TD theo thứ tự tờ giấy (js/40-lap-01td.js) */
  if(M.k==='01uq') return hsoTuyUQ(M, t);   /* 3.256: form Giấy ủy quyền theo thứ tự tờ giấy */
  if(/^(01uq|01td|01gqvl|07b|pdnh)$/.test(M.k) && (!B || B.hoId)) return hsoTuyHo(M, t);   /* 3.209: in theo hộ (bộ cũ chưa gắn hộ → cách cũ) */
  if(M.k==='06td') return hsoTuy06();   /* 3.253 */
  if(M.k==='03td'){ var D3 = hsoD03(), oB = B && B.hoId && hmTim(B.hoId);   /* 3.209: 03/TD nhiều hộ; đi từ hộ đang làm → tự thêm hộ đó */
    if(oB && !D3.ds.length){ D3.ct = B.ct || D3.ct; D3.ds.push(hsoD03Moi(oB, D3.ct)); luu(); }
    else if(oB && D3.ds.length===1 && D3.ds[0].hoId===oB.id && B.ct && D3.ct!==B.ct){ D3.ct = B.ct; D3.ds = [hsoD03Moi(oB, B.ct)]; luu(); }   /* 3.240: 03/TD 1 hộ đi theo 01/TD của hộ — đổi chương trình bên 01/TD thì 03/TD đổi theo */
    hsoD03TuBo(D3);
    if(D3.ds.length || oB) return hsoTuy03(t);
    h += hsoTuyO('＋ Thêm hộ từ sổ', hsoChon('hsoD03Them(this.value)', '', [['', '— 03/TD nhiều hộ: chọn hộ trong 👪 sổ hộ vay —']].concat(hmDs().map(function(o){ return [o.id, hmTen(o)+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; })))); }
  if(/^(01uq|01td|03td)$/.test(M.k)){
    h += '<div class="sl-phu">Chưa có hộ trong 03/TD → chọn hộ ở <a href="#" onclick="event.preventDefault();hsoChonMau(\'sohv\')">📒 Sổ hộ vay</a> (📄 Lập HS) hoặc tích tổ viên dưới đây; trống = mẫu trắng.</div>';   /* 3.246: bỏ lối "📁 Bộ hồ sơ vay" cũ */
    if(B && (M.k==='01td' || M.k==='03td')){ var C1 = hsoCTV(B.ct) || {}, o1 = function(nhan, f, gt, ph){ return hsoTuyO(nhan, '<input value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="hsoBoDat(\''+f+'\',this.value,1)">'); };   /* 3.208: gõ thì in, trống thì chấm; 01/TD ↔ 03/TD cùng 1 số */
      h += o1('Thời hạn xin vay (tháng)', 'th', B.th, C1.thIn==='in' && C1.th ? 'trống = ghi sẵn '+C1.th : 'trống = chấm')+(M.k==='01td' ? o1('Hạn trả nợ cuối cùng', 'hanCuoi', hsoNgayVN(B.hanCuoi), 'dd/mm/yyyy — trống = chấm') : ''); }
    if(M.k==='03td'){ h += hsoNgayTuy('Ngày họp bình xét');
      if(!B && t){ if(!V.chon) V.chon = {}; h += '<details class="hso-tick" open><summary>👥 Tổ viên đề nghị vay — <b id="hso-dem-vay">'+Object.keys(V.chon).filter(function(k){ return V.chon[k]; }).length+'</b>/'+tv.length+'</summary><div class="hso-tick-ds">'+
        tv.map(function(k){ return '<label><input type="checkbox"'+(V.chon[k.kh] ? ' checked' : '')+' onchange="hsoTick(\'vay\',\''+k.kh+'\',this.checked)"> '+coChuHTML(k.ten)+'</label>'; }).join('')+'</div></details>'; }
      h += hsoKBRieng('03td'); }   /* 3.222: cuối cột trái */
    return h;
  }
  if(M.k==='01tgtv'){
    h += tgCotHTML(t, B);   /* 3.315: 3 nguồn — Mẫu 31 · Sổ hộ vay · ✍ tự khai trên mẫu (js/54) */
    return h+hsoKBRieng('01tgtv');   /* 3.219 · 3.222: cuối cột trái */
  }
  if(M.k==='01tdck'){   /* 3.206: người đề nghị = tổ viên đang chọn (chung lựa chọn với 09A) */
    h += hsoTuyO('Người đề nghị', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';hsoVe()', HSO.vay.kh||'', [['', t ? '— chọn tổ viên ('+tv.length+') —' : '— chọn tổ trước —']].concat(tv.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      hsoKBRieng('01tdck', {});   /* 3.222: cùng khung với các mẫu */
  }
  if(M.k==='09a'){
    var mon = hsoMonGH(t), ds9 = tv.filter(function(k){ return k.mon.some(function(m){ return (m.dn||0)>0; }); });
    h += hsoTuyO('Người vay', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';delete HSO.vay.tienGH;hsoVe()', V.kh||'', [['', t ? '— chọn tổ viên ('+ds9.length+') —' : '— chọn tổ trước —']].concat(ds9.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      (mon.length ? hsoTuyO('Món vay', hsoChon('HSO.vay.ku=this.value;delete HSO.vay.tienGH;hsoVe()', V.ku || mon[0].ku, mon.map(function(m){ return [m.ku, m.ku+' · '+ctNgan(m.ct, m)+' · '+tdnTien(m.dn)+' đ · ĐH '+ngayVNsl(skHL(m))]; })))+
        '' : '')+
      '<div class="hso-cham"><label class="hso-o2"><input type="checkbox"'+(hsoLuu().kemTDCK ? ' checked' : '')+' onchange="hsoLuu().kemTDCK=this.checked;luu();hsoVe()"> <b>In kèm 01/TĐCK</b> (giấy đề nghị thay đổi mẫu chữ ký giao dịch) — cùng trang in / file Word</label>'+
        (hsoLuu().kemTDCK ? hsoKBRieng('01tdck', {}) : '')+'</div>'+
      '<div class="hso-cham"><label class="hso-o2"><input type="checkbox"'+(hsoLuu().kem06 ? ' checked' : '')+' onchange="hsoLuu().kem06=this.checked;luu();hsoVe()"> <b>In kèm Mẫu 06/TD</b> (phiếu kiểm tra sử dụng vốn) — điền sẵn hộ vay, Hội quản lý; cán bộ kiểm tra để trống</label>'+
        (hsoLuu().kem06 ? '<div class="hso-cham-o"><span class="hso-cham-nhan">Mẫu 06/TD — cột Mục đích</span><span class="hso-sw"><button class="'+(hsoLuu().md06==='in' ? '' : 'bat')+'" onclick="hsoLuu().md06=\'cham\';luu();hsoVe()" title="Để trống — ghi tay">✍</button><button class="'+(hsoLuu().md06==='in' ? 'bat' : '')+'" onclick="hsoLuu().md06=\'in\';luu();hsoVe()" title="In sẵn ngành kinh tế theo Mẫu 31">🖨</button></span></div>' : '')+'</div>'+
      hsoKBRieng('09a', {tienGH:mon.length ? (mon.find(function(m){ return m.ku===V.ku; }) || mon[0]).dn : ''});   /* 3.206: ô chấm tùy biến · 3.215: ngày không tự lấy hôm nay */
  }
  return h;
}
