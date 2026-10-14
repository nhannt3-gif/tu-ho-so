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
    {k:'10c',  ma:'10C/TD', ten:'Biên bản họp kết nạp, cho ra khỏi Tổ', ghi:'mẫu cũ (vào tổ đến 30/09/2026) · mẫu mới QĐ 70 (từ 01/10/2026) — tự chọn theo ngày họp', mg:[10, 20, 10, 30]},
    {k:'10a',  ma:'10A/TD', ten:'Biên bản họp thành lập Tổ', mg:[20, 20, 20, 30]},
    {k:'10b',  ma:'10B/TD', ten:'Biên bản họp kết nạp, thay đổi Ban quản lý Tổ', mg:[20, 20, 20, 30]},
    {k:'11',   ma:'11/TD',  ten:'Hợp đồng ủy nhiệm', mg:[20, 20, 20, 30]},
    {k:'01bg', ma:'01/BG',  ten:'Biên bản bàn giao hồ sơ Tổ', mg:[20, 20, 20, 30]},
    {k:'02bg', ma:'02/BG',  ten:'Bàn giao kiêm đối chiếu số dư tiền vay, tiền gửi', ngang:true, mg:[15, 10, 15, 12], so:'xy'}
  ],
  hsv: [   /* 3.171: lề / khổ đo theo PDF anh gửi */
    {k:'homoi', ma:'👪 Hộ vay', ten:'Sổ hộ vay — hộ mới / lấy từ Mẫu 31, khai 1 lần, gọi ra in hồ sơ', mg:[15, 15, 15, 20]},   /* 3.207 → 3.209 (anh 14/10): sổ hộ vay lâu dài thay Hộ mới + Bộ HS */
    {k:'bo',   ma:'Bộ HS', ten:'Bộ hồ sơ vay (lập / lưu tạm / in gửi tổ)', mg:[12, 18, 10, 22], an:1},   /* 3.209: ẩn khỏi thanh tab (in theo hộ ở 01/TD); giữ mã cũ */
    {k:'01uq', ma:'01/UQ',  ten:'Giấy ủy quyền', mg:[18, 18, 18, 30]},
    {k:'01td', ma:'01/TD',  ten:'Giấy đề nghị vay vốn kiêm phương án sử dụng vốn vay', mg:[12, 18, 10, 22]},
    {k:'03td', ma:'03/TD',  ten:'Danh sách tổ viên đề nghị vay vốn', ngang:true, mg:[10, 12, 10, 9]},
    {k:'01tgtv', ma:'01/TGTV', ten:'Giấy đăng ký mở tài khoản tổ viên', mg:[12, 10, 22, 12], chan:'Ngân hàng Chính sách xã hội|Website: www.vbsp.org.vn Hotline: 1900 638583'},
    {k:'09a',  ma:'09A/TD', ten:'Giấy đề nghị gia hạn nợ', mg:[10, 18, 10, 25]},
    {k:'01tdck', ma:'01/TĐCK', ten:'Giấy đề nghị thay đổi mẫu chữ ký giao dịch', mg:[12, 18, 12, 25]}   /* 3.206 (anh gửi mẫu 14/10, VB 2407 28/3/2025) — in kèm khi gia hạn */
  ]
};
var HSO = {khoa:'', kn:{}, ra:{}, tv:{}, vay:{}, o:{}};   /* lựa chọn trong lần làm việc (đổi tổ / mẫu → làm lại) */
var HSO_TR = {};   /* tổ trưởng / tổ phó kỳ trước theo mã tổ (gợi ý bàn giao, bầu thay) */
var HSO_HEN = null;
function hsoCH(){ var C = D.cauHinh.hsoTK = D.cauHinh.hsoTK || {ky:'', hst:'10c', hsv:'bo'}; return pvGan(C); }
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
  if(TO_K) Object.keys(TO_K.to).forEach(function(m){ var t = TO_K.to[m]; if(toLaTT(t) || !t.tenThon) return;
    if(T.xa && t.xa!==T.xa) return; if(T.diem && t.khoaDiem!==T.diem) return; var k = hsoApKhoa(t); if(!ap[k]) ap[k] = {k:k, xa:t.tenXa||'', ap:hsoApTen(t)}; to.push(t); });
  var dsAp = Object.keys(ap).map(function(k){ return ap[k]; }).sort(function(a, b){ return (a.xa+a.ap).localeCompare(b.xa+b.ap, 'vi', {numeric:true}); });
  to.sort(function(a, b){ return (a.tenThon+a.ten).localeCompare(b.tenThon+b.ten, 'vi', {numeric:true}); });
  var o = function(id, nhan, gt, ph, js){ return '<label class="kt-kb"><span>'+nhan+'</span><input'+(id ? ' id="'+id+'"' : '')+' value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph||'')+'" oninput="'+js+'"></label>'; };
  var dsXa = Object.keys(X).map(function(k){ return X[k]; }).sort(function(a, b){ return a.tenXa.localeCompare(b.tenXa, 'vi'); });
  var loc = dsXa.length ? '<div class="hang-nut hso-kb-loc"><select onchange="HSO_KBT.xa=this.value;HSO_KBT.diem=\'\';hsoKBHop()">'+[['', '— tất cả xã ('+dsXa.length+') —']].concat(dsXa.map(function(x){ return [x.xa, x.tenXa]; })).map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(x[0]===T.xa ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'+
    (T.xa && Object.keys(X[T.xa].diem).length ? '<select onchange="HSO_KBT.diem=this.value;hsoKBHop()">'+[['', '— mọi điểm GD —']].concat(Object.keys(X[T.xa].diem).map(function(k){ return [k, X[T.xa].diem[k]]; })).map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(x[0]===T.diem ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>' : '')+'</div>' : '';
  var tabs = [['pgd','🏦 Phòng giao dịch · logo'], ['ap','🏘 Trưởng ấp'], ['pho','👥 Tổ phó'], ['ct','📋 Chương trình vay']];
  var pane = function(k, h){ return '<div class="hso-kbp" data-kb="'+k+'"'+(T.tab===k ? '' : ' style="display:none"')+'>'+h+'</div>'; };
  moHop('<div class="hop-tit">⚙ Khai báo chung — hồ sơ Tổ, hồ sơ vay</div><div class="hop-phu">Lưu cùng cài đặt (đồng bộ Drive). Ô có khai báo in nền vàng ở khung xem. Khai báo riêng từng mẫu (ô chấm / in sẵn, lý do gia hạn…) ở cột trái mỗi mẫu. Người của Hội cấp xã lấy ở '+
      '<a href="#" onclick="event.preventDefault();dongHop();ktCH().che=\'hdt\';ktCH().hdtTab=\'hoi\';slDoiTab(\'kt\')">🏛 Khai báo Hội đoàn thể</a>.</div>'+
    '<div class="hang-nut hso-kb-tab">'+tabs.map(function(x){ return '<button class="nho hso-kbt'+(T.tab===x[0] ? ' bat' : '')+'" data-kb="'+x[0]+'" onclick="hsoKBTab(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>'+
    pane('pgd', '<div class="hso-kb-nhom"><b>🏦 Phòng giao dịch</b><div class="hso-kb-luoi">'+HSO_PGD_O.map(function(x){ return o('hso-kb-'+x[0], x[1], kb.pgd[x[0]], x[2] || 'chưa khai → chấm', 'hsoKB().pgd[\''+x[0]+'\']=this.value.trim();luu()'); }).join('')+'</div></div>'+
      '<div class="hso-kb-nhom"><b>🖼 Logo (in ở mẫu được tích) — '+(kb.logo ? 'logo đã nạp' : 'logo NHCSXH có sẵn')+'</b><div class="hang-nut"><img src="'+hsoLogoSrc()+'" alt="logo" style="height:48px;border:1px solid var(--vien);background:#fff">'+
      '<button class="nho" onclick="hsoLogoTai()" title="Lưu file PNG nền trong suốt">⬇ Tải logo</button>'+
      '<label class="nut-tep nho">📂 Nạp logo khác<input type="file" accept="image/*" style="display:none" onchange="hsoLogoNap(this)"></label>'+(kb.logo ? '<button class="nho" onclick="hsoKB().logo=\'\';luu();hsoKBHop()">↺ Về logo NHCSXH</button>' : '')+'</div>'+
      '<div class="hso-kb-luoi">'+HSO_MAU.hst.concat(HSO_MAU.hsv).filter(function(m){ return m.k!=='bo' && m.k!=='homoi'; }).map(function(m){ var lm = kb.logoMau || HSO_LOGO_MD;
        return '<label class="hso-o2"><input type="checkbox"'+(lm[m.k] ? ' checked' : '')+' onchange="var k=hsoKB();k.logoMau=k.logoMau||Object.assign({},HSO_LOGO_MD);k.logoMau[\''+m.k+'\']=this.checked;luu()"> '+m.ma+' '+coChuHTML(m.ten)+'</label>'; }).join('')+'</div></div>')+
    pane('ap', '<div class="hso-kb-nhom"><b>🏘 Trưởng ấp / khu phố — '+dsAp.length+' ấp</b>'+loc+
      (dsAp.length ? '<div class="hso-kb-luoi">'+dsAp.map(function(a){ return o('', a.ap+(T.xa ? '' : ' · '+a.xa), kb.ap[a.k], 'họ tên trưởng ấp', 'hsoKB().ap[\''+a.k.replace(/'/g, "\\'")+'\']=this.value.trim();luu()'); }).join('')+'</div>'
        : '<div class="sl-phu">Chưa có số liệu tổ — nạp Mẫu 31 ở 📥 Nạp &amp; KT.</div>')+'</div>')+
    pane('pho', '<div class="hso-kb-nhom"><b>👥 Tổ phó thực tế (tổ trên máy chưa khớp) — '+to.length+' tổ</b>'+loc+
      (to.length ? '<div class="hso-kb-luoi">'+to.slice(0, 200).map(function(t){ return o('', 'Tổ '+(t.ten||t.ma)+' · '+pvApNgan(t.tenThon)+' — máy: '+(t.pho||'chưa có'), kb.pho[t.ma], 'trống = theo máy', 'hsoKB().pho[\''+t.ma+'\']=this.value.trim();luu()'); }).join('')+'</div>'+(to.length>200 ? '<div class="sl-phu">Hiện 200 tổ đầu — chọn xã / điểm để rút gọn.</div>' : '') : '<div class="sl-phu">Chưa có số liệu tổ.</div>')+'</div>')+
    pane('ct', hsoCTVHTML())+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop();hsoVe()">Xong</button></div>', true);
}
/* ---------- 3.208 (anh chốt 14/10): CHƯƠNG TRÌNH VAY — mỗi CT 1 thẻ (D.cauHinh.hsoKB.ctv): tên tắt, tên in 01/03, đối tượng thụ hưởng, mục đích, mức vay, thời hạn / kỳ hạn ghi sẵn hay chấm ----------
   kieu: 'hssv' (tên SV, số tháng + số tiền gõ tay) · 'congtrinh' (xây mới / sửa chữa, mỗi công trình 1 dòng, mức vay 1 công trình) · 'chung' (1 mục đích + số tiền) */
var HSO_CTV_MD = [
  {ma:'HSSV', ten:'Học sinh sinh viên', kieu:'hssv', loai:false, ctr:[], md:['Chi phí học tập, sinh hoạt'], dtth:[], dtthMd:'', dtthPh:'', th:'', thIn:'cham', ky:'12', kyIn:'in', ubnd:true, nhcsxh:true, bat:true},
  {ma:'NSVSMT', ten:'Cấp nước sạch và vệ sinh môi trường nông thôn', kieu:'congtrinh', loai:true, ctr:[{ten:'Công trình cấp nước', tien:'25000000'}, {ten:'Công trình vệ sinh', tien:'25000000'}], md:[],
    dtth:['Hộ gia đình cư trú tại vùng nông thôn', 'Hộ gia đình ở khu vực thành thị'], dtthMd:'Hộ gia đình cư trú tại vùng nông thôn', dtthPh:'Hộ gia đình ở khu vực thành thị', th:'60', thIn:'in', ky:'12', kyIn:'in', ubnd:false, nhcsxh:false, bat:true},
  {ma:'GQVL', ten:'Hỗ trợ tạo việc làm, duy trì và mở rộng việc làm', kieu:'chung', loai:false, ctr:[], md:[], dtth:[], dtthMd:'', dtthPh:'', th:'', thIn:'cham', ky:'', kyIn:'cham', ubnd:false, nhcsxh:false, bat:false, rieng:'GQVL có mẫu đơn riêng (không dùng 01/TD) — chờ anh gửi mẫu'}   /* anh 14/10: "GQVL có mẫu riêng" → tắt ở Bộ HS đến khi làm mẫu riêng */
];
var HSO_CTV_TRONG = {ma:'', ten:'', kieu:'chung', loai:false, ctr:[], md:[], dtth:[], dtthMd:'', dtthPh:'', th:'', thIn:'cham', ky:'', kyIn:'cham', ubnd:false, nhcsxh:false, bat:true};
function hsoCTVDs(){
  var kb = hsoKB();
  if(!Array.isArray(kb.ctv)){ kb.ctv = HSO_CTV_MD.map(function(c){ return JSON.parse(JSON.stringify(c)); });
    [['md','md'], ['dtth','dtth']].forEach(function(f){ String(kb[f[0]]||'').split(/\n/).forEach(function(d){ d = d.trim(); if(!d) return; var m = d.match(/^([A-Za-z]{2,10})\s*:\s*(.+)$/);   /* chuyển khai báo cũ "MÃ: …" (không mã = mọi CT) vào thẻ */
      kb.ctv.forEach(function(c){ if(m && m[1].toUpperCase()!==c.ma) return; var v = m ? m[2].trim() : d; if(c[f[1]].indexOf(v)<0) c[f[1]].push(v); }); }); }); }
  kb.ctv.forEach(function(c){ Object.keys(HSO_CTV_TRONG).forEach(function(f){ if(c[f]===undefined) c[f] = JSON.parse(JSON.stringify(HSO_CTV_TRONG[f])); }); });
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
        chon(i, 'Dạng phương án', 'kieu', c.kieu, [['hssv','Học sinh sinh viên — tên SV, số tháng, số tiền gõ tay'], ['congtrinh','Theo công trình — mỗi công trình 1 dòng'], ['chung','1 mục đích + số tiền']])+'</div>'+
        (c.kieu==='congtrinh' ? '<div class="nhan-nhom">Công trình · mức vay 1 công trình</div>'+tick(i, 'Có chọn <b>Xây mới / Sửa chữa</b>', 'loai', c.loai)+
          c.ctr.map(function(x, j){ return '<div class="hso-ho"><input style="width:52%" value="'+coChuHTML(x.ten||'')+'" placeholder="Công trình …" onchange="hsoCTCtr('+i+','+j+',\'ten\',this.value)"> <input style="width:30%" value="'+coChuHTML(x.tien ? tdnTien(+x.tien) : '')+'" placeholder="mức vay (đ)" onchange="hsoCTCtr('+i+','+j+',\'tien\',this.value)"> <button class="nho" title="Bỏ" onclick="hsoCTCtrBo('+i+','+j+')">✕</button></div>'; }).join('')+
          '<button class="nho" onclick="hsoCTCtrThem('+i+')">+ Công trình</button>' : '')+
        '<div class="hso-kb-luoi">'+lop(i, 'Mục đích vay', 'md', c.md, c.kieu==='congtrinh' ? 'Trống = tự ghép "Xây mới / Sửa chữa + công trình …". Ghi dòng nào thì Bộ HS chọn được dòng đó (ghi sao in vậy).' : 'Mỗi dòng 1 mục — Bộ HS chọn.')+
        lop(i, 'Đối tượng thụ hưởng', 'dtth', c.dtth, 'Mỗi dòng 1 mục — cột 3 mẫu 03/TD, Bộ HS chọn theo từng hộ.')+'</div>'+
        (c.dtth.length ? '<div class="hso-kb-luoi">'+chon(i, 'Mặc định (xã)', 'dtthMd', c.dtthMd, ddt)+chon(i, 'Mặc định (phường)', 'dtthPh', c.dtthPh, ddt)+'</div>' : '')+
        '<div class="hso-cham-o"><span class="hso-cham-nhan">Thời hạn vay</span>'+hsoCTSw(i, 'thIn')+' <input class="hso-so" value="'+coChuHTML(c.th||'')+'" placeholder="số tháng" onchange="hsoCTDat('+i+',\'th\',this.value,\'so\')"> tháng</div>'+
        '<div class="hso-cham-o"><span class="hso-cham-nhan">Kỳ hạn trả nợ (phân kỳ)</span>'+hsoCTSw(i, 'kyIn')+' <input class="hso-so" value="'+coChuHTML(c.ky||'')+'" placeholder="số tháng" onchange="hsoCTDat('+i+',\'ky\',this.value,\'so\')"> tháng/lần</div>'+
        '<div class="hang-nut">'+tick(i, 'Đơn 01/TD có khối <b>Xác nhận của UBND xã</b>', 'ubnd', c.ubnd)+tick(i, 'Câu "Đề nghị <b>NHCSXH</b> cho vay"', 'nhcsxh', c.nhcsxh)+tick(i, 'Hiện ở Bộ HS', 'bat', c.bat!==false)+'</div>'+
        '<div class="hang-nut"><button class="nho" onclick="hsoCTXoa('+i+')">🗑 Xóa thẻ</button></div></details>'; }).join('')+
    '<div class="hang-nut"><button class="nho chinh" onclick="hsoCTThem()">＋ Chương trình</button></div>';
}
function hsoApTen(t){ return String((t && t.tenThon) || '').replace(/^(ấp|ap|thôn|khu phố|kp)\.?\s+/i, '').trim(); }
function hsoApKhoa(t){ return (t.xa||'')+'|'+(t.thon || hsoApTen(t)); }
function hsoXaTen(tenXa){ return String(tenXa||'').trim().replace(/^(xã|phường|thị trấn|đặc khu)\s+/i, ''); }
function hsoMucDich(ct){ var c = hsoCTV(ct); return c ? c.md.slice() : []; }   /* 3.208: danh mục mục đích theo thẻ chương trình */

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
function hsoKhach(kh, t){   /* nhân thân khách: danh bạ (Mẫu 31 các kỳ) + dòng Mẫu 31 kỳ đang xem */
  var c = (SL_DB && SL_DB.kh && SL_DB.kh[kh]) || {}, r0 = ((TO_K && t && TO_K.kh[t.ma]) || []).find(function(o){ return o.kh===kh && o.cccd; }) || {};
  var g = function(f){ return c[f] || r0[f] || ''; };
  return {kh:kh, ten:g('ten'), ns:g('ns'), cccd:g('cccd'), ncap:g('ncap'), noiCap:g('noiCap'), ap:hsoApTen({tenThon:g('tenThon')}) || (t ? hsoApTen(t) : ''), tenXa:g('tenXa') || (t ? t.tenXa : '')};
}
function hsoTTKH(t){   /* mã KH của tổ trưởng: DSTO / Thông tin tổ trưởng; không có → tổ viên trùng tên (chỉ 1 người) */
  if(t.cif) return {kh:t.cif, cc:'Mã CIF TT (Mẫu 31 / Mẫu 18)'};   /* 3.201: hệ thống ghi sẵn mã KH tổ trưởng trên từng dòng */
  var m = (t.ds && t.ds.ttKH) || (t.tt && t.tt.ttKH) || ''; if(m) return {kh:m, cc:'mã KH tổ trưởng trên Danh sách tổ'};
  var ds = {}; ((TO_K && TO_K.kh[t.ma]) || []).forEach(function(o){ if(o.kh && slChuan(o.ten)===slChuan(t.ten)) ds[o.kh] = 1; });
  var k = Object.keys(ds); return k.length===1 ? {kh:k[0], cc:'tổ viên trùng tên tổ trưởng'} : {kh:'', cc:''};
}
function hsoTVTo(t){ if(!t || !TO_K) return []; try { return toTV(t); } catch(e){ return []; } }
function hsoTruoc(t){   /* tổ trưởng, tổ phó kỳ trước (Mẫu 31 tháng trước) — gợi ý Bên giao / Bên nhận, bầu thay */
  if(!t || !TO_K) return null; var tr = kyLui(TO_K.thang, -1), k = tr+'|'+t.ma;
  if(HSO_TR[k]!==undefined) return HSO_TR[k];
  if(!SLM.bang[slKhoa('hstd', tr)]){ HSO_TR[k] = null; return null; }
  HSO_TR[k] = null; var cu = TO_K;
  toNap(tr).then(function(K2){ TO_K = cu; slDung(cu.ky); var x = K2.to[t.ma]; HSO_TR[k] = x ? {ten:x.ten||'', pho:x.pho||''} : null; if(HSO_TR[k] && document.getElementById('hso-ds')) hsoVe(); }).catch(function(){ TO_K = cu; });
  return null;
}

/* ---------- ô điền ---------- */
function hsoCham(n){ return Array((n||14)+1).join('.'); }
function hsoO(v, loai, n){ v = v==null ? '' : String(v).trim(); return v ? '<span class="o-'+(loai||'sl')+'">'+coChuHTML(v)+'</span>' : '<span class="o-tay">'+hsoCham(n)+'</span>'; }
function hsoNg(iso){ var m = String(iso||'').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? {d:m[3], m:m[2], y:m[1]} : null; }
function hsoNgayO(iso, loai){ var n = hsoNg(iso); return n ? hsoO(n.d+'/'+n.m+'/'+n.y, loai||'kb') : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8); }
function hsoNTN(iso, loai){ var n = hsoNg(iso); return n ? 'ngày '+hsoO(n.d, loai||'kb')+' tháng '+hsoO(n.m, loai||'kb')+' năm '+hsoO(n.y, loai||'kb') : 'ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(7); }
function hsoTien(n){ return n ? tdnTien(n) : ''; }
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
  gach = gach || '-'; co = co || 13; var l = 'c b'+(co!==13 ? ' s'+co : '');
  return '<p class="'+l+'">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="'+l+'">Độc lập '+gach+' Tự do '+gach+' Hạnh phúc</p>'+hsoKe(Math.round(co*4.65));
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
    'p.ke{height:0;margin:1pt auto 4pt;padding:0;border-top:.5pt solid #000}td>p.ke{margin-left:auto;margin-right:auto}'+
    'table{border-collapse:collapse;width:100%;table-layout:fixed}table.luoi td{border:.5pt solid #000;padding:1pt 3pt;vertical-align:middle}table.luoi.s11 td,table.luoi.s10 td{padding:0 2pt}'+
    'table.luoi.cham tbody tr+tr td{border-top:.5pt dotted #777}table.luoi.cham tbody tr td{border-bottom:.5pt dotted #777}table.luoi.cham tr.het td{border-bottom:.5pt solid #000}table.luoi.cham thead td{border-bottom:.5pt solid #000}'+
    'table.ngoai{border:.5pt solid #000}table.ngoai>tbody>tr>td,table.ngoai>tr>td{padding:1pt 4pt;vertical-align:top}table.ngoai td.tieu{border-top:.5pt solid #000;border-bottom:.5pt solid #000}table.khung0 td{vertical-align:top;padding:0 2pt}table.luoi td p{margin:0}.hso-ky{margin-top:6pt}td.nen{background:#548235;color:#fff}img.hso-logo{display:block}.o-hop{display:inline-block;min-width:4mm;border:.5pt solid #000;text-align:center}'+
    '.kt-ho{break-inside:avoid}.o-sl{background:#d9f0d3}.o-kb{background:#fff0b3}@media print{.o-sl,.o-kb{background:none}}</style></head><body>'+
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
  var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, ng = HSO.o.ngay || '', moi = X && X.moi ? true : hso10cMoi(ng), N = hsoNguoiHoi(t), tk = hsoLuu().tkMin || '';
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
  var T = hsoTo(t), G = hsoGiaoNhan(t), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', ngSL = TO_K && t ? TO_K.ngay : '', ca = !!hsoLuu().bgCa;
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
  B = B || hsoBo(); var N = hsoBoNV(B), T = hsoBoT(B), A = hsoPA(B), C = A.C || {ubnd:true, nhcsxh:true, kieu:'hssv'}, hssv = C.nhcsxh, tuCo = B ? hsoSo(B.tuCo) : 0, sp = '        ';
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '';
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
    '<p class="l2">+ Vốn tự có tham gia: '+(B && B.tuCo!=='' && B.tuCo!=null ? hsoO(tdnTien(tuCo), 'kb') : hsoCham(25))+' đồng.</p>'+
    '<p class="l2">+ Vốn vay NHCSXH: '+(A.tien ? hsoO(tdnTien(A.tien), 'kb') : hsoCham(25))+' đồng để dùng vào việc:</p>'+hsoBang('khung0', [40, 24, 36], bang)+
    '<p class="l1 tr">- Thời hạn xin vay: '+hsoO(A.th, 'kb', 8)+' tháng; Kỳ hạn trả nợ: '+hsoO(B ? A.ky : '', 'kb', 6)+' tháng/lần.</p>'+
    '<p class="l1">- Hạn trả nợ cuối cùng: Ngày'+(B && B.hanCuoi ? ' '+hsoO(hsoNgayVN(B.hanCuoi), 'kb') : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(10))+'</p>'+
    '<p class="j thut">Chúng tôi cam kết: sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai trái, tôi hoàn toàn chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [52, 48], '<tr><td></td><td class="c"><p class="c i">Ngày'+hsoCham(6)+' tháng '+hsoCham(6)+' năm '+hsoCham(6)+'</p></td></tr><tr><td class="c">'+
      (C.ubnd ? '<p class="c b">Xác nhận của UBND xã</p><p>Ông/bà '+hsoCham(40)+'</p><p>'+hsoCham(52)+'</p><p>'+hsoCham(52)+'</p><p class="c b">Chủ tịch</p><p class="c">(ký tên, đóng dấu)</p>' : '')+
      '</td><td class="c"><p class="c b">Người vay</p><p class="c i s11">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p class="c b tr">PHÊ DUYỆT CỦA NGÂN HÀNG</p>'+
    '<p>1. Số tiền cho vay: '+hsoCham(20)+'đồng (Bằng chữ:'+hsoCham(45)+')</p><p>2. Lãi suất: '+hsoCham(6)+'%/năm. Lãi suất nợ quá hạn: '+hsoCham(10)+'% lãi suất khi cho vay.</p>'+
    '<p>3. Thời hạn cho vay: '+hsoCham(12)+' tháng; Kỳ hạn trả nợ: '+hsoCham(12)+'tháng/lần.</p><p>4. Số tiền trả nợ: '+hsoCham(22)+' đồng/lần. Hạn trả nợ cuối cùng: Ngày'+hsoCham(6)+'/'+hsoCham(5)+'/'+hsoCham(6)+'</p>'+
    '<p>5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày '+hsoCham(40)+'</p>'+
    hsoBang('khung0 hso-ky', [1, 1, 1], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Cán bộ tín dụng</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p>&nbsp;</p><p class="c b">Trưởng phòng<br>(Tổ trưởng) TD</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c i">Ngày'+hsoCham(5)+'tháng'+hsoCham(5)+'năm'+hsoCham(5)+'</p><p class="c b">Giám đốc</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'01/TD', h:h};
}
function hsoLap03td(t, B, ds, ctMa){   /* ctMa (3.209): 03/TD nhiều hộ — tên chương trình theo thẻ */
  B = B || hsoBo(); var T = B ? hsoBoT(B) : hsoTo(t), xaCap = /^phường/i.test(String((B && B.nv.tenXa) || (t && t.tenXa) || '')) ? 'phường' : 'xã', ng = HSO.o.ngay || '';
  var A3 = hsoPA(B), hang = ds || (B ? [{ten:hsoBoNV(B).ten, dt:B.dtth || hsoDTTHMd(B, xaCap==='phường'), tien:A3.tien, md:A3.mdDs, th:A3.th ? A3.th+' tháng' : ''}] : []);   /* 3.208: thời hạn gõ ở 01/TD → cột 6; ĐTTH trống → mặc định thẻ CT theo xã / phường */
  var tong = 0, r = '<thead><tr><td class="c b" rowspan="2">STT</td><td class="c b" rowspan="2">Họ và tên</td><td class="c b" rowspan="2">Đối tượng<br>thụ hưởng</td><td class="c b" colspan="3">Đề nghị của Tổ TK&amp;VV</td><td class="c b" colspan="2">Phê duyệt của Ngân hàng</td></tr>'+
    '<tr><td class="c b">Số tiền</td><td class="c b">Mục đích sử dụng vốn</td><td class="c b">Thời hạn</td><td class="c b">Số tiền</td><td class="c b">Thời hạn</td></tr><tr>'+[1,2,3,4,5,6,7,8].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr></thead><tbody>';
  hang.forEach(function(x, i){ tong += x.tien||0; r += '<tr><td class="c">'+(i+1)+'</td><td>'+hsoO(x.ten)+'</td><td class="j">'+(x.dt ? hsoO(x.dt, 'kb') : '')+'</td><td>'+(x.tien ? hsoO(tdnTien(x.tien), 'kb') : '')+'</td><td class="j">'+(x.md ? hsoO(x.md, 'kb') : '')+'</td><td class="c">'+(x.th ? hsoO(x.th, 'kb') : '')+'</td><td></td><td></td></tr>'; });
  for(var i=0;i<2 || (!hang.length && i<5);i++) r += '<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  r += '<tr class="het"><td></td><td class="c b">Cộng:</td><td></td><td class="b">'+(tong ? hsoO(tdnTien(tong), 'kb') : '')+'</td><td></td><td></td><td></td><td></td></tr></tbody>';
  var h = hsoBang('khung0', [27, 48, 25], '<tr><td><p>Tên tổ TK&amp;VV: '+hsoO(T.tt, 'sl', 25)+'</p><p>'+(T.capAp==='khu phố' ? 'Khu phố' : 'Ấp')+': '+hsoO(T.ap, 'sl', 20)+'</p><p>'+(xaCap==='phường' ? 'Phường' : 'Xã')+': '+hsoO(T.xa, 'sl', 20)+'</p></td>'+
      '<td class="c"><p class="c b">DANH SÁCH TỔ VIÊN</p><p class="c b">ĐỀ NGHỊ VAY VỐN NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p class="c b s12">Chương trình cho vay: '+hsoO(B ? hsoCTTenIn(B.ct) : ctMa ? hsoCTTenIn(ctMa) : (HSO.vay.ct ? hsoCTTen(HSO.vay.ct) : ''), 'kb', 30)+'</p></td>'+
      '<td class="r"><p class="r b">Mẫu số: 03/TD</p><p class="r s10">Lập 02 liên chính</p><p class="r s10">(01 liên lưu hồ sơ Tổ tại NH,</p><p class="r s10">01 liên lưu tại Tổ)</p><p class="r s10">02 liên phôtô: 01 liên đóng C.từ tại NH; 01 liên lưu Hội đoàn thể</p></td></tr>')+
    '<p class="j thut tr">Tại cuộc họp Tổ Tiết kiệm và vay vốn ngày '+(ng ? hsoNgayO(ng) : hsoCham(7)+' / '+hsoCham(6)+' / '+hsoCham(11))+' đã bình xét các tổ viên đề nghị vay vốn Ngân hàng Chính sách xã hội. Toàn tổ nhất trí đề xuất những tổ viên có tên dưới đây đang cư trú tại địa phương, đủ điều kiện và thuộc đối tượng vay vốn đợt này:</p>'+
    '<p class="r i">Đơn vị: đồng</p>'+hsoBang('luoi cham s12', [5, 18, 17, 11, 18, 10, 11, 10], r)+
    hsoBang('khung0 hso-ky', [22, 36, 42], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Tổ trưởng</p><p class="c s11">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(10)+'</p><p class="c b">Phần xác nhận của UBND '+xaCap+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p>'+hsoCham(60)+'</p><p class="c b">UBND '+xaCap+'</p><p class="c s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(9)+'</p><p class="c b">Phê duyệt của Ngân hàng</p><p class="c">Số người được vay vốn đợt này: '+hsoCham(30)+' người.</p><p class="c">Tổng số tiền cho vay: '+hsoCham(45)+' đồng.</p>'+
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
function hsoChamKieu(mk, k){ var c = ((hsoLuu().cham||{})[mk])||{}, d = (HSO_CHAM[mk]||[]).find(function(x){ return x[0]===k; }); return c[k] || (d ? d[3] : 'cham'); }
function hsoChamDat(mk, k, v){ var L = hsoLuu(); L.cham = L.cham || {}; (L.cham[mk] = L.cham[mk] || {})[k] = v; luu(); hsoVe(); }
function hsoLyDoDs(){ var L = hsoLuu(); if(!Array.isArray(L.lyDoDs) || !L.lyDoDs.length) L.lyDoDs = ['Đang gặp khó khăn về kinh tế, tài chính']; return L.lyDoDs; }
function hsoLyDoThem(){ var v = String(HSO.vay.lyDo||'').trim(); if(!v) return bao('Gõ lý do vào ô trước rồi bấm ＋.'); var ds = hsoLyDoDs(); if(ds.indexOf(v)<0){ ds.push(v); luu(); } hsoVe(); bao('Đã thêm vào danh sách lý do.'); }
function hsoLyDoBo(i){ var ds = hsoLyDoDs(); if(ds.length<=1) return bao('Danh sách cần ít nhất 1 lý do.'); ds.splice(i, 1); luu(); hsoVe(); }
function hsoChamGT(mk, k, md){ if(hsoChamKieu(mk, k)!=='in') return ''; var v = HSO.vay[k]; if(v===undefined || v==='') v = md; return v==null ? '' : String(v); }   /* '' = in chấm */
function hsoChamTien(mk, k, md){ var v = hsoSo(hsoChamGT(mk, k, md)); return v ? tdnTien(v) : ''; }
function hsoChamNgay(mk, k, n){ var v = hsoChamGT(mk, k, ngayISO(nay())), g = hsoNg(v); n = n || [5, 4, 10];   /* ', ngày … tháng … năm …' */
  return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày'+hsoCham(n[0])+'tháng'+hsoCham(n[1])+'năm '+hsoCham(n[2]); }
function hsoChamTuy(mk, md){   /* md = {khóa: giá trị mặc định khi In sẵn} */
  return '<div class="hso-cham"><div class="hso-cham-dau">Ô chấm: <b>✍ viết tay</b> hay <b>🖨 in sẵn</b> <small>(app nhớ theo mẫu)</small></div>'+(HSO_CHAM[mk]||[]).map(function(x){
    var k = x[0], kieu = hsoChamKieu(mk, k), inS = kieu==='in', v = HSO.vay[k]!==undefined ? HSO.vay[k] : (md && md[k]!==undefined ? md[k] : ''), o = '';
    var sw = '<span class="hso-sw"><button class="'+(inS ? '' : 'bat')+'" onclick="hsoChamDat(\''+mk+'\',\''+k+'\',\'cham\')" title="Để chấm — ghi tay">✍</button><button class="'+(inS ? 'bat' : '')+'" onclick="hsoChamDat(\''+mk+'\',\''+k+'\',\'in\')" title="In sẵn">🖨</button></span>';
    if(inS){
      if(x[2]==='lyDo'){ var ds = hsoLyDoDs(); if(HSO.vay.lyDo===undefined) HSO.vay.lyDo = ds[0];
        o = '<select onchange="if(this.value){HSO.vay.lyDo=this.value;hsoVe();}"><option value="">— chọn lý do có sẵn —</option>'+ds.map(function(l, i){ return '<option value="'+coChuHTML(l)+'"'+(l===HSO.vay.lyDo ? ' selected' : '')+'>'+coChuHTML(l)+'</option>'; }).join('')+'</select>'+
          '<span class="hso-cham-ly">'+hsoIn('HSO.vay.lyDo=this.value;hsoHen()', HSO.vay.lyDo, 'gõ lý do khác')+'<button class="nho" onclick="hsoLyDoThem()" title="Thêm lý do đang gõ vào danh sách">＋</button>'+
          (ds.indexOf(HSO.vay.lyDo)>=0 && ds.length>1 ? '<button class="nho" onclick="hsoLyDoBo('+ds.indexOf(HSO.vay.lyDo)+')" title="Bỏ lý do này khỏi danh sách">✕</button>' : '')+'</span>'; }
      else o = hsoIn('HSO.vay[\''+k+'\']=this.value;hsoHen()', v, x[2]==='tien' ? 'số tiền' : x[2]==='so' ? 'số' : '', x[2]==='ngay' ? 'date' : (x[2]==='so' ? 'number' : ''));
    }
    return '<div class="hso-cham-o"><span class="hso-cham-nhan">'+coChuHTML(x[1])+'</span>'+sw+'<span class="hso-cham-gt">'+(inS ? o : '<i class="hso-cham-tay">…… chấm, ghi tay</i>')+'</span></div>'; }).join('')+'</div>';
}
/* 3.206 (anh gửi mẫu 14/10): 01/TĐCK — Giấy đề nghị thay đổi mẫu chữ ký giao dịch với NHCSXH (VB 2407 ngày 28/3/2025). Người đề nghị = người vay đang chọn
   (dùng chung lựa chọn với 09A); nhân thân theo danh bạ (Mẫu 31); ngày ký = ô chấm tùy biến; phần chấp thuận NH luôn chấm. In kèm 09A (cùng khổ dọc → 1 lần in / 1 file Word). */
HSO_CHAM['01tdck'] = [['ngayKy','Ngày tháng (khách hàng ký)','ngay','cham']];
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
      '<p class="j">Ngân hàng Chính sách xã hội '+coChuHTML(hsoPGD('ngan'))+' chấp thuận cho ông/bà:'+hsoCham(30)+' có tên trên thay đổi mẫu chữ ký giao dịch với NHCSXH theo mẫu chữ ký đã đăng ký kể từ ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'</p>'+
      '<p class="c b tr">GIÁM ĐỐC</p><p class="c i s11">(Ký tên, đóng dấu)</p></td>'+
      '<td class="c"><p class="c i">'+hsoO(T.xa, 'sl', 14)+hsoChamNgay('01tdck', 'ngayKy')+'</p><p class="c b">KHÁCH HÀNG</p><p class="c i s11">(Ký, ghi rõ họ và tên)</p></td></tr>');
  return {ma:'01/TĐCK', h:h};
}
/* 3.206 (anh chốt 14/10): 09A in kèm MẪU 06/TD (bên KTGS gọi "Mẫu 06 KTGS") — KHÔNG chép / sửa mẫu KTGS (khóa): gọi đúng hàm KTGS
   (ktGiaTri06 → ktHTML06 / ktDocx 'm06') cho 1 hộ = món đang gia hạn; Hội quản lý theo khai báo KTGS; cán bộ kiểm tra để trống (chấm); mục đích: in ngành (Mẫu 31) hoặc để trống */
function hso06Gt(){
  var S = hsoCH(), t = TO_K && S.to ? TO_K.to[S.to] : null, V = HSO.vay; if(!t || !V.kh || typeof ktGiaTri06!=='function') return null;
  var mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0]; if(!m) return null;
  var c = hsoKhachChon(t) || {}, mm = Object.assign({}, m); ktMaKV([mm]);
  return ktGiaTri06(t, [{kh:V.kh, ten:c.ten || m.ten || '', mon:[mm]}], {ngay:'', ng1:'', cb2:'', cv2:'', dv:'', md:hsoLuu().md06==='in' ? 'nganh' : ''});
}
function hso06Ten(){ var c = hsoKhachChon(TO_K && TO_K.to[hsoCH().to]) || {}; return 'Mau 06-TD Phieu KT su dung von - '+boDauTen(c.ten || 'ho vay'); }
function hsoIn06(){ var g = hso06Gt(); if(!g) return bao('Chọn tổ, người vay, món vay trước.'); inBlob(new Blob([ktHTML06(g)], {type:'text/html'}), hso06Ten()+'.html'); }
function hsoIn09Kem(){ xuatIn(); setTimeout(hsoIn06, 1500); }   /* in 09A rồi in tiếp Mẫu 06/TD (2 khổ giấy khác nhau → 2 lần in); nút 🖨 06/TD để in lại riêng */
function hsoWord06(){ var g = hso06Gt(); if(!g) return; ktDocx('m06', g).then(function(bl){ giaoFile(bl, hso06Ten()+'.docx'); }).catch(function(er){ baoLoi('Tạo Word Mẫu 06/TD lỗi: '+(er && er.message || er)); }); }
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
function hsoBoT(B){ var t = B && B.to && TO_K && TO_K.to[B.to]; return t ? hsoTo(t) : ((B && B.toi) || {tinh:hsoPGD('tinh')}); }
function hsoBoChonKH(kh){   /* hộ cũ: chụp nhân thân + tổ vào bộ (in lại vẫn đúng khi số liệu đổi) */
  var B = hsoBo(); if(!B) return; var c = (SL_DB && SL_DB.kh && SL_DB.kh[kh]) || {}, t = c.to && TO_K && TO_K.to[c.to];
  B.moi = false; B.kh = kh; B.to = c.to || B.to; var k = hsoKhach(kh, t);
  B.nv = {ten:k.ten || c.ten || '', ns:k.ns || '', gt:c.gt || '', cccd:k.cccd || '', ncap:k.ncap || '', noiCap:k.noiCap || '', sdt:c.sdt || '', danToc:c.danToc || 'Kinh', ap:k.ap, tenXa:k.tenXa || c.tenXa || ''};
  if(t) B.toi = hsoTo(t);
  if(!B.ho.length && c.voChong) B.ho = [{ten:c.voChong, ns:'', cccd:'', qh:'Vợ / chồng'}];
  B.chon.tgtv = 0; hsoBoLuu(); hsoVe();
}
function hsoBoTim(q){   /* gõ CCCD / tên → khách trong danh bạ */
  var o = document.getElementById('hso-tim-kq'); if(!o) return; q = String(q||'').trim(); if(q.length<2){ o.innerHTML = ''; return; }
  var ds = []; try { ds = slTimKH(q, 12); } catch(e){}
  o.innerHTML = ds.length ? ds.map(function(r){ var c = (SL_DB.kh||{})[r.m] || {}; return '<button class="nho" onclick="hsoBoChonKH(\''+r.m+'\')">'+coChuHTML(r.ten||c.ten||r.m)+' <small>'+coChuHTML([c.cccd, c.tenThon, c.toTen ? 'tổ '+c.toTen : ''].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="sl-phu">Không thấy trong danh bạ — chọn <b>Hộ mới</b> để nhập.</div>';
}
function hsoBoTrenM31(B){   /* hộ mới đã lên Mẫu 31 (khớp CCCD) → mã KH */
  if(!B || !B.moi || !B.nv.cccd || !SL_DB || !SL_DB.kh) return ''; var so = String(B.nv.cccd).replace(/\D/g, ''), r = '';
  Object.keys(SL_DB.kh).some(function(m){ if(String(SL_DB.kh[m].cccd||'').replace(/\D/g, '')===so){ r = m; return true; } return false; }); return r;
}
/* phương án theo thẻ chương trình (3.208, anh chốt 14/10): HSSV số tháng + số tiền gõ tay (không tự tính); công trình: mỗi công trình 1 dòng, mức vay theo thẻ;
   thời hạn / kỳ hạn: bộ gõ thì in số gõ, không gõ → thẻ "🖨 Ghi sẵn" in số thẻ, "✍ Chấm" để chấm */
function hsoPaK(i){ return i===0 ? ['nuoc', 'tienN'] : i===1 ? ['vs', 'tienV'] : ['c'+i, 't'+i]; }   /* khóa lưu công trình thứ i (giữ khóa cũ nuoc / vs của bộ đã lập) */
function hsoGT(v, md){ return v!=null && String(v).trim()!=='' ? String(v).trim() : (md || ''); }
function hsoPA(B){
  var r = {dong:[], tien:0, md:'', mdDs:'', th:'', ky:'', canh:[], C:null};
  if(!B) return r;
  var C = r.C = hsoCTV(B.ct) || hsoCTV('HSSV'), P = B.pa || {};
  r.th = hsoGT(B.th, C.thIn==='in' ? C.th : ''); r.ky = hsoGT(B.ky, C.kyIn==='in' ? C.ky : '');
  if(C.kieu==='hssv'){ r.tien = hsoSo(B.tien); r.md = P.md || C.md[0] || 'Chi phí học tập, sinh hoạt';
    r.mdDs = r.md+' cho sinh viên'+(P.sv ? ' '+P.sv : '');
    r.dong = [[r.md+' cho sinh viên'+(P.sv ? ': '+P.sv : ''), hsoGT(P.soThang) ? hsoGT(P.soThang)+' tháng' : '', r.tien]]; }
  else if(C.kieu==='congtrinh'){ var ct = [];
    C.ctr.forEach(function(c, i){ var k = hsoPaK(i); if(!P[k[0]]) return; var tien = hsoSo(P[k[1]]); ct.push([c.ten, tien]); if(hsoSo(c.tien) && tien>hsoSo(c.tien)) r.canh.push(c.ten+' vượt '+tdnTien(hsoSo(c.tien))+' / công trình'); });
    ct.forEach(function(x){ r.tien += x[1]; r.dong.push([x[0], '01 công trình', x[1]]); });
    var ghep = (C.loai ? (P.loai==='sua' ? 'Sửa chữa ' : 'Xây mới ') : '')+ct.map(function(x){ return x[0].toLowerCase(); }).join(', ');
    r.md = P.md || ghep.charAt(0).toUpperCase()+ghep.slice(1); r.mdDs = r.md; }
  else { r.tien = hsoSo(B.tien); r.md = P.md || C.md[0] || ''; r.mdDs = r.md; r.dong = [[hsoGT(P.dt, r.md), hsoGT(P.sl), r.tien]]; }
  return r;
}
function hsoDongTien(v){ return v ? tdnTien(v)+' đồng' : ''; }
/* ---------- 01/TD Giấy đề nghị vay vốn — đúng PDF (HSSV có xác nhận UBND xã; NSVSMT không) ---------- */
function hsoBoHoiTen(T){ return T.hoi || ''; }
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
  var sn = B && B.soNguoi ? String(B.soNguoi) : '';
  var h = '<p class="r i s12">Mẫu số 01/UQ</p><p class="r i s12">Lập 02 bản:</p><p class="r i s12">01 bản lưu NH</p><p class="r i s12">01 bản lưu hộ gia đình</p>'+hsoQH('-', 14)+
    '<p class="c b s14 tr sau">GIẤY ỦY QUYỀN</p>'+
    '<p class="j thut tr">Căn cứ Bộ Luật dân sự số 91/2015/QH13 và các văn bản pháp lý có liên quan,</p>'+
    '<p class="j thut"><b>I.</b> Ngày … tháng … năm ……., hộ gia đình chúng tôi gồm '+hsoO(sn, 'kb', 6)+' người'+sup(1)+', trong đó các thành viên từ đủ 18 tuổi trở lên, có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật gồm:</p>'+
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
    '<p>&nbsp;</p>'+hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">CHỨNG KIẾN CỦA</p><p class="c b">TRƯỞNG THÔN</p><p class="c i s11">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">XÁC NHẬN CỦA</p><p class="c b">UBND CẤP XÃ</p><p class="c i s11">(Ký tên, đóng dấu)</p></td></tr>')+
    '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'+'<p class="ke trai" data-ke="55" style="width:55mm;margin-left:0"></p>'+
    '<p class="i s9"><sup>(1)</sup> Điền tổng số thành viên trong hộ gia đình, gồm cả người chưa thành niên và thành niên.</p><p class="i s9"><sup>(2)</sup> Số thứ tự của người được ủy quyền đã được ghi tại mục I của Giấy ủy quyền.</p>'+
    '<p class="i s9"><sup>(3)</sup> Là các thành viên ghi tại mục I, trừ thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p><p class="i s9"><sup>(4)</sup> Là thành viên được cử làm đại diện theo ủy quyền ghi tại mục II của Giấy ủy quyền.</p>';
  return {ma:'01/UQ', h:h};
}
/* ---------- 01/TGTV Giấy đăng ký mở tài khoản tổ viên (mẫu 03/2026) — đúng PDF, có logo + chân trang ---------- */
function hsoLap01tgtv(t, P){   /* P = {ten, ns, gt, cccd, ncap, noiCap, sdt, danToc, ap, tenXa, kh} hoặc null (mẫu trắng) */
  P = P || {}; var o = function(x){ return x ? '☒' : '☐'; }, so = String(P.cccd||'').replace(/\D/g, ''), han = P.cccd ? toCCCDHan(P.cccd, P.ns, P.ncap) : null, hh = han && han.den ? han.den : '';
  var nd = hsoNg(P.ns), cap = hsoNg(P.ncap), hn = hsoNg(hh), ngay = function(n, a, b, c){ return n ? hsoO(n.d+'/'+n.m+'/'+n.y, 'sl') : hsoCham(a)+' /'+hsoCham(b)+'/'+hsoCham(c); };
  var oSo = '<table class="luoi" data-w="'+Array(13).join('1,').slice(0, -1)+'" style="width:96mm"><tr>'+Array.apply(null, Array(12)).map(function(_, i){ return '<td class="c">'+(so[i] ? hsoO(so[i]) : '&nbsp;')+'</td>'; }).join('')+'</tr></table>';
  var dong = function(h){ return '<p class="tr2">'+h+'</p>'; };
  var A = '<p class="i">Quý khách điền đầy đủ nội dung tại các trường thông tin có dấu (*)</p>'+
    hsoBang('khung0', [36, 64], '<tr><td><p class="b">Họ, chữ đệm, tên khai sinh*:</p></td><td><table class="luoi" data-w="1"><tr><td>'+(P.ten ? hsoO(P.ten.toUpperCase()) : '&nbsp;')+'</td></tr></table></td></tr>')+
    dong('<b>Ngày, tháng, năm sinh*:</b> '+ngay(nd, 10, 10, 10)+'          <b>Giới tính*:</b> '+o(P.gt==='Nam')+'Nam  '+o(P.gt==='Nữ')+'Nữ')+
    dong('<b>Quốc tịch*:</b> '+o(!!P.ten)+' Việt Nam   ☐ Khác (ghi rõ)'+hsoCham(18)+'   <b>Dân tộc*:</b> '+hsoO(P.danToc, 'sl', 35))+
    dong('<b>Tình trạng cư trú*:</b> ☐ Có cư trú   ☐ Không cư trú')+
    dong('<b>Thông tin giấy tờ tùy thân*:</b> '+o(so.length===12)+'Thẻ CC công dân/Thẻ CC     ☐CC điện tử')+
    hsoBang('khung0', [8, 92], '<tr><td><p>Số:</p></td><td>'+oSo+'</td></tr>')+
    dong('Ngày cấp: '+ngay(cap, 9, 9, 9)+'   Ngày hết hạn: '+ngay(hn, 9, 9, 9)+'   Nơi cấp: '+hsoO(P.noiCap, 'sl', 30))+
    dong('<b>Mã số thuế cá nhân (nếu có):</b> '+hsoCham(60))+dong('<b>Nghề nghiệp hiện tại</b>*:')+
    hsoBang('khung0 s12', [26, 24, 18, 32], '<tr><td>☐ Nhân viên văn phòng<br>☐ Lực lượng vũ trang<br>☐ Nông dân</td><td>☐ Công chức, viên chức<br>☐ Đã nghỉ hưu<br>☐ Công nhân</td><td>☐ Nội trợ<br>☐ Tự kinh doanh<br>☐ Lao động tự do</td><td>☐ Học sinh, sinh viên<br>☐ Giáo viên, giảng viên<br>☐ Khác (ghi rõ): '+hsoCham(18)+'</td></tr>')+
    '<p><b>Chức vụ*:</b> '+hsoCham(120)+'</p>'+
    dong('<b>Nơi thường trú :</b>')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoO(P.ap, 'sl', 22)+' ')+dong('Phường/Xã/Đặc khu: '+hsoO(P.tenXa ? hsoXaTen(P.tenXa) : '', 'sl', 25)+' Tỉnh/Thành phố: '+hsoO(P.ten ? hsoPGD('tinh') : '', 'sl', 35))+
    dong('<b>Nơi ở hiện tại khác (nếu có):</b>')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoCham(22))+dong('Phường/Xã/Đặc khu: '+hsoCham(25)+'Tỉnh/Thành phố: '+hsoCham(35))+
    dong('<b>Nơi làm việc</b>: '+hsoCham(55)+'Điện thoại nơi làm việc: '+hsoCham(40))+dong('<b>Địa chỉ nơi làm việc</b>:')+dong('Số nhà: '+hsoCham(28)+'Đường: '+hsoCham(50)+'Tổ dân phố/Thôn: '+hsoCham(22))+dong('Phường/Xã/Đặc khu: '+hsoCham(25)+'Tỉnh/Thành phố: '+hsoCham(35))+
    dong('<b>Điện thoại liên hệ*:</b> '+hsoO(P.sdt, 'sl', 28)+'<b>Thư điện tử (Email):</b> '+hsoCham(45))+
    '<p class="i j tr">Điện thoại và Email liên hệ là số điện thoại và thư điện tử chính chủ của khách hàng. Đây là một trong số các phương thức liên hệ để NHCSXH thông báo cho Quý khách thông tin cần thiết trong quá trình đăng ký và sử dụng dịch vụ. Quý khách lưu ý thông báo ngay cho NHCSXH khi có bất kỳ sự thay đổi nào về số điện thoại, email liên hệ. NHCSXH cung cấp dịch vụ ngân hàng và thông báo các thông tin cần thiết trong quá trình sử dụng dịch vụ qua số điện thoại và email liên hệ cập nhật của Quý khách chỉ khi nhận được thông báo của Quý khách về việc thay đổi thông tin nêu trên.</p>'+
    '<p class="i j">Quý khách sử dụng thông tin điện thoại và email liên hệ là số điện thoại và email đăng ký tài khoản định danh điện tử của Quý khách trên ứng dụng VNeID, trang thông tin điện tử “dinhdanhdientu.gov.vn” và “vneid.gov.vn”.</p>'+
    dong('<b>Thu nhập bình quân hàng tháng trong 06 tháng gần nhất (đơn vị: triệu VND)</b>')+
    hsoBang('khung0', [1, 1, 1, 1.6], '<tr><td>☐ Dưới 10</td><td>☐ Từ 10-50</td><td>☐ Trên 50</td><td>☐ Khác (ghi rõ): '+hsoCham(22)+'</td></tr>')+
    dong('<b>Nguồn gốc thu nhập trong 06 tháng gần nhất/tiền gửi của Quý khách tại NHCSXH</b>')+
    hsoBang('khung0', [1, 0.8, 1.4, 1.6], '<tr><td>☐ Thừa kế tài sản<br>☐ Cho thuê tài sản</td><td>☐ Lương<br>☐ Trợ cấp</td><td>☐ Lợi nhuận đầu tư, lãi tiền gửi<br>☐ Khác( ghi rõ): '+hsoCham(10)+'</td><td>☐ Lợi nhuận sản xuất, kinh doanh<br>'+hsoCham(30)+'</td></tr>')+
    dong('<b>Tình trạng hôn nhân:</b> ☐ Độc thân      ☐ Đã kết hôn      ☐ Khác( ghi rõ): '+hsoCham(35))+
    hsoBang('luoi', [1, 1], '<tr><td class="c b" colspan="2">ĐĂNG KÝ CHỮ KÝ MẪU</td></tr><tr><td class="c"><p class="c b">Chữ ký mẫu</p><p class="c i s10">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></td><td class="c"><p class="c b">Xác nhận chữ ký mẫu</p><p class="c i s10">(Ký và ghi rõ họ tên)</p></td></tr>'+
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
    '<p class="c i">'+hsoCham(8)+', ngày'+hsoCham(10)+' tháng'+hsoCham(9)+'năm'+hsoCham(9)+'</p><p class="c b">Khách hàng</p><p class="c i s10">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p>';
  var Dd = hsoBang('luoi', [26, 22, 22, 30], '<tr><td class="i">Tiếp nhận ngày '+hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+'</td><td colspan="3" class="c i">'+coChuHTML(hsoPGD('noi'))+', ngày '+hsoCham(8)+' tháng '+hsoCham(8)+' năm '+hsoCham(10)+'</td></tr>'+
      '<tr><td class="c"><p class="c b">Cán bộ tiếp nhận</p><p class="c i">(Ký, ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></td><td class="c"><p class="c b">Giao dịch viên</p><p class="c i">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Kiểm soát viên</p><p class="c i">(Ký, ghi rõ họ tên)</p></td><td class="c"><p class="c b">Giám đốc</p><p class="c i">(Ký, đóng dấu)</p></td></tr>')+
    '<p class="tr"><b>Số CIF:</b> '+hsoO(P.kh, 'sl', 45)+' <b>Số Tài khoản Tổ viên:</b> '+hsoCham(70)+'</p><p>Hiệu lực từ ngày:'+hsoCham(10)+' /'+hsoCham(10)+'/'+hsoCham(10)+'</p>';
  var h = hsoBang('khung0', [17, 63, 20], '<tr><td>'+hsoLogo('01tgtv', 16)+'</td><td class="c"><p class="c b s13">&nbsp;</p><p class="c b s13">GIẤY ĐĂNG KÝ MỞ TÀI KHOẢN TỔ VIÊN</p></td><td class="r"><table class="luoi s12" data-w="1"><tr><td class="c">Mẫu 01/TGTV</td></tr></table></td></tr>')+
    '<p class="i j tr">Tôi đề nghị Ngân hàng Chính sách xã hội (NHCSXH) chi nhánh/PGD <b>'+coChuHTML(hsoPGD('ngan'))+'</b> mở hồ sơ thông tin cá nhân và đăng ký tài khoản Tổ viên với các thông tin sau.</p>'+
    hsoBang('luoi giua s11', [1], '<tr><td><p>Ngày:'+hsoCham(75)+'</p><p>Số Hồ sơ thông tin KH (Số CIF) '+(P.kh ? hsoO(P.kh) : hsoCham(50))+'</p></td></tr>').replace('<table ', '<table style="width:120mm;margin:4pt auto" ')+
    hsoKhungNgoai([['nen', 'A- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ THÔNG TIN CÁ NHÂN'], A, ['nen', 'B- PHẦN DÀNH CHO KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ'], Bd, ['nen', 'C- CAM KẾT CỦA KHÁCH HÀNG'], C, ['tieu', 'D - PHẦN DÀNH CHO NGÂN HÀNG'], Dd])+
    '<p class="i s9 tr"><sup>1</sup> Trong thời gian NHCSXH nơi khách hàng mở tài khoản tổ chức phiên giao dịch tại điểm giao dịch nơi khách hàng đăng ký địa chỉ thường trú/tạm trú để giao dịch với NHCSXH, khách hàng được thực hiện các giao dịch trên tài khoản tại điểm giao dịch của NHCSXH, đồng thời khách hàng không được thực hiện các giao dịch rút tiền mặt, chuyển khoản từ tài khoản Tổ viên của mình tại trụ sở NHCSXH.</p>';
  return {ma:'01/TGTV', h:h};
}
function hsoMauK(k){ var r = null; ['hst','hsv'].forEach(function(p){ HSO_MAU[p].forEach(function(m){ if(m.k===k) r = m; }); }); return r; }
function hsoDTTH(ct){ var c = hsoCTV(ct); return c ? c.dtth.slice() : []; }   /* 3.208: đối tượng thụ hưởng theo thẻ chương trình */
function hsoDTTHMd(B, phuong){ var c = B && hsoCTV(B.ct); return c ? (phuong ? c.dtthPh : c.dtthMd) || '' : ''; }
function hsoLapBo(B, t){   /* cả bộ: 01/UQ · 01/TD · biên bản họp kết nạp và bình xét (10C mới) · 03/TD · 01/TGTV (hộ mới) — mỗi mẫu 1 bản, khổ riêng */
  var ds = [], c = (B && B.chon) || {uq:1, td:1, bb:1, ds:1}, N = hsoBoNV(B), A = hsoPA(B), tB = B && B.to && TO_K && TO_K.to[B.to] ? TO_K.to[B.to] : t;
  var vay = B && N.ten ? [{ten:N.ten, ct:B.ct==='NSVSMT' ? 'Nước sạch VSMT' : hsoCTTenIn(B.ct), tien:A.tien, md:A.mdDs, th:A.th}] : [];
  if(c.uq) ds.push({M:hsoMauK('01uq'), h:hsoLap01uq(t, B).h});
  if(c.td) ds.push({M:hsoMauK('01td'), h:hsoLap01td(t, B).h});
  if(c.bb) ds.push({M:hsoMauK('10c'), h:hsoLap10c(tB, {moi:true, kn:B && B.moi && N.ten ? [{kh:'', ten:N.ten}] : [], vay:vay}).h});
  if(c.ds) ds.push({M:hsoMauK('03td'), h:hsoLap03td(tB, B).h});
  if(c.tgtv) ds.push({M:hsoMauK('01tgtv'), h:hsoLap01tgtv(t, B ? Object.assign({kh:B.kh}, N) : null).h});
  if(!ds.length) ds.push({M:hsoMauK('01td'), h:hsoLap01td(t, B).h});
  return {ma:'Bộ hồ sơ vay', ds:ds};
}
function hsoTGTVDs(t, B){   /* 01/TGTV: người vay trong bộ (hộ mới) hoặc tổ viên chưa có TK 105 của tổ (tích, in hàng loạt) */
  var V = HSO.vay; if((V.tgNguon || (B ? 'bo' : 'to'))==='bo') return B && hsoBoNV(B).ten ? [Object.assign({kh:B.kh}, hsoBoNV(B))] : [];
  return hsoTVTo(t).filter(function(k){ return !k.stk.length && !k.coTK && (V.tg||{})[k.kh]!==false; }).map(function(k){
    var c = (SL_DB && SL_DB.kh && SL_DB.kh[k.kh]) || {}, x = hsoKhach(k.kh, t); return {kh:k.kh, ten:x.ten, ns:x.ns, gt:c.gt||'', cccd:x.cccd, ncap:x.ncap, noiCap:x.noiCap, sdt:c.sdt||k.sdt||'', danToc:c.danToc||'', ap:x.ap, tenXa:x.tenXa}; });
}
function hsoBoDat(duong, v, ve){
  var B = hsoBo(); if(!B) return; var k = duong.split('.'), o = B;
  for(var i=0;i<k.length-1;i++){ if(o[k[i]]==null) o[k[i]] = /^\d+$/.test(k[i+1]) ? [] : {}; o = o[k[i]]; }
  if(/^nv\.(ns|ncap)$/.test(duong) || /^ho\.\d+\.ns$/.test(duong) || duong==='hanCuoi'){ var iso = hsoNgayTu(v); v = iso || v; }
  o[k[k.length-1]] = v;
  if(duong==='nv.cccd' && B.moi){ var d = hsoCCCDDoc(v); if(d) B.nv.gt = d.gt; }
  if(duong==='nv.ncap' && B.moi && !B.nv.noiCapTay) B.nv.noiCap = hsoNoiCapGY(B.nv.ncap);
  if(duong==='nv.noiCap') B.nv.noiCapTay = !!v;
  if(duong==='moi'){ B.chon.tgtv = v ? 1 : 0; if(v){ B.kh = ''; } }
  if(duong==='ho') B.ho = v;
  hsoBoLuu(); if(ve) hsoVe(); else hsoHen();
}
function hsoBoXoa(){ var B = hsoBo(); if(!B) return; hoi('Xóa bộ hồ sơ của '+(B.nv.ten || 'chưa có tên')+'?', function(){ var ds = hsoBoDs(), i = ds.indexOf(B); if(i>=0) ds.splice(i, 1); hsoCH().boId = (ds[0]||{}).id || ''; luu(); hsoVe(); }); }
function hsoBoTen(b){ var tt = HSO_TT.find(function(x){ return x[0]===b.tt; }); return (b.nv.ten || '(chưa có tên)')+' · '+(b.ct || '')+' · '+(tt ? tt[1] : '')+' · '+ngayVNsl(String(b.sua||b.tao).slice(0, 10)); }
function hsoTuyBo(t, tv){
  var B = hsoBo(), ds = hsoBoDs(), S = hsoCH(), h = '<div class="nhan-nhom">📂 Hồ sơ đang làm ('+ds.length+')</div>';
  h += '<div class="hang-nut">'+(ds.length ? hsoChon('hsoCH().boId=this.value;luu();hsoVe()', B ? B.id : '', ds.map(function(b){ return [b.id, hsoBoTen(b)]; })) : '')+
    '<button class="nho chinh" onclick="hsoBoMoi();hsoVe()">+ Bộ mới</button>'+(B ? '<button class="nho" onclick="hsoBoXoa()">🗑 Xóa</button>' : '')+'</div>';
  if(!B) return h+'<div class="sl-phu">Bấm <b>+ Bộ mới</b> để lập bộ hồ sơ vay (Giấy ủy quyền · Đơn vay · Biên bản họp · 03/TD · 01/TGTV). Lưu tạm trên máy + Drive, in gửi tổ đi ký. Khung phải đang là bộ mẫu trắng.</div>';
  var N = B.nv, A = hsoPA(B);
  var boNhap = function(nhan, duong, gt, ph, ve, kieu){ return hsoTuyO(nhan, '<input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoBoDat(\''+duong+'\',this.value'+(ve ? ',1' : '')+')">'); };
  var m31 = hsoBoTrenM31(B);
  h += hsoTuyO('Trạng thái', hsoChon('hsoBoDat(\'tt\',this.value,1)', B.tt, HSO_TT));
  if(m31) h += '<div class="sl-bao vang hso-nhac">✓ Đã có trên Mẫu 31 (mã KH '+coChuHTML(m31)+') — <a href="#" onclick="event.preventDefault();hsoBoChonKH(\''+m31+'\');hsoBoDat(\'tt\',\'gn\',1)">dùng dữ liệu Mẫu 31, đóng bộ</a></div>';
  h += '<div class="nhan-nhom">① Chương trình vay <a href="#" class="hso-nho" onclick="event.preventDefault();hsoKBHop(\'ct\')">⚙ khai báo chương trình</a></div><div class="hang-nut">'+hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===B.ct; }).map(function(c){ return '<label class="hso-o2" title="'+coChuHTML(c.ten)+'"><input type="radio" name="hso-ct"'+(B.ct===c.ma ? ' checked' : '')+' onchange="hsoBoDat(\'ct\',\''+c.ma+'\',1)"> <b>'+coChuHTML(c.ma)+'</b> '+coChuHTML(c.ten)+'</label>'; }).join('')+'</div>';
  h += '<div class="nhan-nhom">② Người vay</div><div class="hang-nut"><label class="hso-o2"><input type="radio" name="hso-moi"'+(!B.moi ? ' checked' : '')+' onchange="hsoBoDat(\'moi\',false,1)"> Hộ cũ (có trên số liệu)</label><label class="hso-o2"><input type="radio" name="hso-moi"'+(B.moi ? ' checked' : '')+' onchange="hsoBoDat(\'moi\',true,1)"> Hộ mới (nhập)</label></div>';
  if(!B.moi){
    h += (tv.length ? hsoTuyO('Tổ viên tổ đang chọn', hsoChon('if(this.value)hsoBoChonKH(this.value)', B.kh, [['', '— chọn ('+tv.length+') —']].concat(tv.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; })))) : '<div class="sl-phu">Chọn tổ ở khối LỌC ĐỊA BÀN để chọn tổ viên, hoặc tìm:</div>')+
      hsoTuyO('Tìm CCCD / tên', '<input placeholder="gõ số CCCD hoặc họ tên" oninput="hsoBoTim(this.value)">')+'<div id="hso-tim-kq" class="hso-tim-kq"></div>'+
      (N.ten ? '<div class="sl-phu">Đang chọn: <b>'+coChuHTML(N.ten)+'</b>'+(B.kh ? ' · mã '+coChuHTML(B.kh) : '')+(N.cccd ? ' · CCCD '+coChuHTML(N.cccd) : '')+'</div>' : '');
  } else {
    var d = hsoCCCDDoc(N.cccd), lech = d && N.ns && +String(N.ns).slice(0, 4)!==d.nam;
    if(hmDs().length) h += hsoTuyO('Hộ vay mới đã khai', hsoChon('if(this.value)hmGanBo(this.value)', B.hoMoiId||'', [['', '— chọn từ danh sách 🏠 Hộ mới ('+hmDs().length+') —']].concat(hmDs().map(function(o){ var n = o.tv[o.dung||0] || {}; return [o.id, (n.ten||'(chưa tên)')+(n.cccd ? ' · '+n.cccd : '')]; }))), 'Chọn → điền người vay, thành viên hộ, HSSV, địa chỉ; vẫn sửa tay được bên dưới.');   /* 3.207 */
    h += boNhap('Họ tên', 'nv.ten', N.ten, 'Nguyễn Văn A')+boNhap('Ngày sinh', 'nv.ns', hsoNgayVN(N.ns), 'dd/mm/yyyy', 1)+boNhap('Số CCCD', 'nv.cccd', N.cccd, '12 số', 1)+
      (d ? '<div class="sl-phu">Theo số CCCD: '+d.gt+', sinh năm '+d.nam+(lech ? ' — <b class="hso-canh">⚠ khác ngày sinh đã nhập</b>' : ' ✓')+'</div>' : '')+
      boNhap('Ngày cấp', 'nv.ncap', hsoNgayVN(N.ncap), 'dd/mm/yyyy', 1)+boNhap('Nơi cấp', 'nv.noiCap', N.noiCap, hsoNoiCapGY(N.ncap) || 'Cục CS QLHC / Bộ Công an')+
      boNhap('Điện thoại', 'nv.sdt', N.sdt, '')+boNhap('Dân tộc', 'nv.danToc', N.danToc, 'Kinh')+
      '<div class="sl-phu">Tổ / ấp / xã: '+(B.to && TO_K && TO_K.to[B.to] ? '<b>'+coChuHTML('Tổ '+(TO_K.to[B.to].ten||B.to)+' · '+(TO_K.to[B.to].tenThon||'')+' · '+(TO_K.to[B.to].tenXa||''))+'</b>' : (B.toi && B.toi.tt ? coChuHTML('Tổ '+B.toi.tt) : 'chưa gắn'))+
        (S.to && S.to!==B.to ? ' — <a href="#" onclick="event.preventDefault();hsoBoGanTo()">gắn tổ đang chọn ở khối lọc</a>' : '')+'</div>';
  }
  /* thành viên hộ — Giấy ủy quyền (người thừa kế chỉ có ở mẫu này) */
  var ho = B.ho || [];
  h += '<details class="hso-tick"'+(B.moi || ho.length ? ' open' : '')+'><summary>👪 Thành viên hộ (Giấy ủy quyền, người thừa kế) — '+ho.length+'</summary>'+
    hsoTuyO('Số người trong hộ', '<input value="'+coChuHTML(B.soNguoi||'')+'" placeholder="gồm cả người chưa thành niên" onchange="hsoBoDat(\'soNguoi\',this.value)">')+
    ho.map(function(x, i){ var o = function(f, ph, w){ return '<input style="width:'+w+'" value="'+coChuHTML(f==='ns' ? hsoNgayVN(x.ns) : (x[f]||''))+'" placeholder="'+ph+'" onchange="hsoBoDat(\'ho.'+i+'.'+f+'\',this.value)">'; };
      return '<div class="hso-ho">'+(i+2)+'. '+o('ten', 'Họ tên', '34%')+o('ns', 'dd/mm/yyyy', '22%')+o('cccd', 'CCCD', '24%')+o('qh', 'Quan hệ', '14%')+' <button class="nho" title="Bỏ" onclick="hsoBoBoHo('+i+')">✕</button></div>'; }).join('')+
    (ho.length<4 ? '<button class="nho" onclick="hsoBoThemHo()">+ Thêm thành viên</button>' : '')+'</details>';
  h += hsoTuyPA(B);
  h += '<div class="nhan-nhom">④ Mẫu in trong bộ</div>'+[['uq','Giấy ủy quyền 01/UQ'], ['td','Đơn vay 01/TD'], ['bb','Biên bản họp kết nạp, bình xét (10C mới)'], ['ds','Danh sách 03/TD'], ['tgtv','Đăng ký TK tổ viên 01/TGTV'+(B.moi ? ' (hộ mới)' : '')]].map(function(x){
      return '<label class="hso-o2"><input type="checkbox"'+(B.chon[x[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'chon.'+x[0]+'\',this.checked?1:0,1)"> '+x[1]+'</label>'; }).join('')+
    hsoNgayTuy('Ngày họp tổ', 'Ngày họp bình xét (biên bản, 03/TD) — trống = chấm.');
  return h;
}
function hsoBoGanTo(){ var B = hsoBo(), S = hsoCH(), t = TO_K && TO_K.to[S.to]; if(!B || !t) return; B.to = t.ma; B.toi = hsoTo(t); if(B.moi){ B.nv.ap = hsoApTen(t); B.nv.tenXa = t.tenXa || ''; } hsoBoLuu(); hsoVe(); }
function hsoBoThemHo(){ var B = hsoBo(); if(!B) return; B.ho = B.ho || []; B.ho.push({ten:'', ns:'', cccd:'', qh:''}); hsoBoLuu(); hsoVe(); }
function hsoBoBoHo(i){ var B = hsoBo(); if(!B) return; B.ho.splice(i, 1); hsoBoLuu(); hsoVe(); }
function hsoKhungNgoai(ds){   /* khung viền ngoài chia được trang: mỗi đoạn con 1 dòng bảng (mẫu 01/TGTV) */
  var dong = [];
  ds.forEach(function(x){ if(Array.isArray(x)){ dong.push('<tr><td class="c b'+(x[0]==='nen' ? ' nen' : ' tieu')+'">'+x[1]+'</td></tr>'); return; }
    var d = new DOMParser().parseFromString('<div>'+x+'</div>', 'text/html').body.firstChild;
    Array.prototype.forEach.call(d.children, function(c){ dong.push('<tr><td>'+c.outerHTML+'</td></tr>'); }); });
  return '<table class="ngoai s12" data-w="1"><colgroup><col style="width:100%"></colgroup>'+dong.join('')+'</table>';
}
/* @CHEN */
/* ---------- lập mẫu đang chọn ---------- */
function hsoLap(){
  var p = hsoTab(), M = hsoMau(p), S = hsoCH(), t = TO_K && S.to ? TO_K.to[S.to] : null; if(t && toLaTT(t)) t = null;
  var B = p==='hsv' ? hsoBo() : null, x, ai = '';
  if(M.k==='homoi'){ x = {ma:'Hộ vay', h:hmLapHTML()}; }
  else if(M.k==='bo'){ x = hsoLapBo(B, t); ai = hsoBoNV(B).ten || ''; }
  else if(M.k==='01td' && B && B.hoId && hsoKemCo(B)){ x = hsoLapBo(Object.assign({}, B, {chon:Object.assign({td:1}, B.kem)}), t); ai = hsoBoNV(B).ten || ''; }   /* 3.209: 01/TD in kèm 03/TD · 10C · 01/UQ · 01/TGTV */
  else if(M.k==='01tgtv'){ var P = hsoTGTVDs(t, B); x = {ma:'01/TGTV', ds:(P.length ? P : [null]).map(function(y){ return {M:M, h:hsoLap01tgtv(t, y).h}; })}; ai = P.length===1 ? P[0].ten : ''; }
  else if(M.k==='03td' && (hsoD03().ds.length || (B && B.hoId)) && (!B || B.hoId)){ var D3 = hsoD03(), t3 = hsoD03To(D3); x = hsoLap03td(t3, null, hsoD03Hang(D3), D3.ct); }   /* 3.209: 03/TD nhiều hộ cùng chương trình */
  else if(M.k==='03td' && !B && t){ var ch = HSO.vay.chon || {}; x = hsoLap03td(t, null, hsoTVTo(t).filter(function(k){ return ch[k.kh]; }).map(function(k){ return {ten:k.ten}; })); }
  else { var f = {'10c':hsoLap10c, '10a':hsoLap10a, '10b':hsoLap10b, '11':hsoLap11, '01bg':hsoLap01bg, '02bg':hsoLap02bg, '01uq':hsoLap01uq, '01td':hsoLap01td, '03td':hsoLap03td, '09a':hsoLap09a, '01tdck':hsoLap01tdck}[M.k];
    x = f(t, p==='hsv' && /^(01uq|01td|03td)$/.test(M.k) ? B : undefined);
    ai = /^(01uq|01td)$/.test(M.k) ? hsoBoNV(B).ten || '' : /^(09a|01tdck)$/.test(M.k) ? ((hsoKhachChon(t)||{}).ten || '') : ''; }
  if(!x.ds) x.ds = [{M:M, h:x.h}];
  if(M.k==='09a' && hsoLuu().kemTDCK) x.ds.push({M:hsoMauK('01tdck'), h:hsoLap01tdck(t).h});   /* 3.206: 09A in kèm 01/TĐCK (cùng khổ dọc → 1 lần in, 1 file Word) */
  x.ds.forEach(function(u){ if(u.M && !/^(01td|01tgtv)$/.test(u.M.k) && hsoLogoCo(u.M.k)) u.h = '<p>'+hsoLogo(u.M.k, 16)+'</p>'+u.h; });   /* 3.171: logo ở mẫu anh tích (mẫu gốc có logo đã đặt sẵn đúng chỗ) */
  x.M = M; x.t = t; x.h = x.ds[0].h;
  var pv = ai || (t ? 'To '+t.ten : '') || 'Trang';
  x.ten = xuatTen((M.k==='bo' ? 'Bo ho so vay' : 'Mau '+M.ma.replace(/\//g, ' ')), pv, HSO.o.ngay || ngayISO(nay()));
  x.trang = hsoTrang(x.ds, null, x.ten);
  return x;
}
/* sửa 1 trường của bộ đang chọn: đường dẫn "nv.ten", "pa.sv", "ho.0.ten" … */

/* ---------- WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang) ---------- */
function hsoDocx(x){   /* HTML các mẫu → .docx: đoạn, bảng (gộp ô, lặp tiêu đề, kẻ chấm), kẻ mảnh, logo, nhiều khổ (mỗi mẫu 1 section) */
  var ds = x.ds || [{M:x.M, h:x.h}], anh = [], soAnh = 0, tw = function(mm){ return Math.round(mm*56.7); };
  var co = function(el, f){ var m = (' '+(el.className||'')+' ').match(/ s(\d+) /); return m ? +m[1]*2 : f; };
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
function hsoWord(){ var x = hsoLap(); hsoDocx(x).then(function(bl){ giaoFile(bl, x.ten+'.docx'); if(hsoMau().k==='09a' && hsoLuu().kem06) setTimeout(hsoWord06, 600); bao('Đã tạo '+x.ten+'.docx — ô app điền sẵn là chữ thường, sửa thoải mái trong Word.', 6); }).catch(function(er){ baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }

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
  return '<div class="th-nhom-ten hso-dau-ds"><span><b>'+M.ma+'</b> '+coChuHTML(M.ten)+(M.ngang ? ' <span class="th-cap">[A4 ngang]</span>' : '')+'</span></div>'+(M.ghi ? '<div class="sl-phu">'+coChuHTML(M.ghi)+'</div>' : '')+
    '<div class="hso-chu"><span class="hso-chu-sl">số liệu</span><span class="hso-chu-kb">khai báo</span><span class="hso-chu-tay">…… ghi tay</span></div>';
}
function hsoTabMauHTML(){   /* 3.206 (anh chốt 14/10): mỗi biểu mẫu = 1 tab con, bố trí như tab Giao dịch xã · số liệu theo kỳ / ngày đã chọn */
  var p = hsoTab(), M = hsoMau(p);
  return '<div class="gdx2-dau hso-dau"><div class="gdx2-mau">'+HSO_MAU[p].filter(function(m){ return !m.an || m.k===M.k; }).map(function(m){ return gdxChip('<b>'+m.ma+'</b>', m.k===M.k, 'hsoChonMau(\''+m.k+'\')', 'hso-tm', m.ten+(m.ngang ? ' [A4 ngang]' : '')+(m.ghi ? ' — '+m.ghi : '')); }).join('')+'</div>'+
    '<div class="gdx2-nut"><span class="hso-ky" title="Số liệu lấy theo kỳ / ngày đang chọn ở dải lịch">📅 Số liệu: <b>'+(TO_K ? slKyChu(TO_K.ky) : 'chưa có')+'</b></span><button class="nho" onclick="hsoKBHop()" title="PGD, logo, trưởng ấp, tổ phó thực tế, chương trình vay — dùng chung mọi mẫu">⚙ Khai báo chung</button></div></div>';
}
function hsoChonMau(k){ hsoCH()[hsoTab()] = k; luu(); hsoVe(); }
function hsoKhoa(){ var S = hsoCH(); return [hsoTab(), hsoMau().k, S.to||'', TO_K ? TO_K.ky : ''].join('|'); }
function hsoVe(){
  var ds = document.getElementById('hso-ds'); if(!ds) return;
  var S = hsoCH(), t = TO_K && S.to ? TO_K.to[S.to] : null, M = hsoMau(), k = hsoKhoa();
  if(t && toLaTT(t)) t = null;
  if(HSO.khoa!==k){   /* đổi tổ / mẫu / kỳ → tích mặc định */
    var giuNgay = HSO.o.ngay, cu = String(HSO.khoa||'').split('|'), mo = k.split('|'), cungTo = cu[2] && cu[2]===mo[2] && cu[3]===mo[3], V0 = HSO.vay || {};
    HSO = {khoa:k, kn:{}, ra:{}, tv:{}, vay:{ct:V0.ct || '', md:V0.md || '', chon:{}}, o:{ngay:giuNgay}};
    if(cungTo && V0.kh){ HSO.vay.kh = V0.kh; HSO.vay.ku = V0.ku || ''; }   /* 3.206: đổi mẫu cùng tổ → giữ người vay đang chọn (09A ↔ 01/TĐCK) */
    if(t){ var tv = hsoTVTo(t);
      tv.forEach(function(x){ if(x.vao) HSO.kn[x.kh] = true; if(!x.conNo && !x.chuaGN && !(x.t105>0)) HSO.ra[x.kh] = true; });
      if(TO_BD && TO_BD.to===t.ma && TO_BD.co) TO_BD.ra.forEach(function(r){ HSO.ra[r.kh] = true; }); }
  }
  if(t && (M.k==='10c' || M.k==='10b') && !(TO_BD && TO_BD.to===t.ma && TO_BD.ky===TO_K.ky)){ TO_BD = null; toBDNap(t).then(function(){ HSO.khoa = ''; if(document.getElementById('hso-ds')) hsoVe(); }); }
  ds.innerHTML = hsoDsHTML();
  var tm = document.getElementById('hso-tabm'); if(tm) tm.innerHTML = hsoTabMauHTML();
  var tu = document.getElementById('hso-tuy'); if(tu) tu.innerHTML = hsoTuyHTML(M, t);
  hsoXem();
}
function hsoXem(){
  clearTimeout(HSO_HEN);
  var f = document.getElementById('hso-xem-khung'), n = document.getElementById('hso-xem-nut'); if(!f) return;
  var x; try { x = hsoLap(); } catch(er){ f.srcdoc = '<p style="font-family:sans-serif;color:#b00">Lập mẫu lỗi: '+coChuHTML(er && er.message || er)+'</p>'; return; }
  HSO.x = x;
  var kem = hsoMau().k==='09a' && hsoLuu().kem06;   /* 3.206: 09A in kèm Mẫu 06/TD */
  if(n) n.innerHTML = xuatHang({ten:x.ten, html:function(){ return HSO.x.trang; }, word:'hsoWord()', dong:'thXemRong(\'hso-xem-khung\')', dongChu:'⤢ Phóng to',
    'in':kem ? 'hsoIn09Kem()' : '', truoc:kem ? '<button class="nho" onclick="hsoIn06()" title="In riêng Mẫu 06/TD (phiếu kiểm tra) của món đang gia hạn">🖨 06/TD</button>' : ''});
  xemChuan(f, x.trang); thVuaKhung();
}
function hsoHen(){ clearTimeout(HSO_HEN); HSO_HEN = setTimeout(hsoXem, 250); }
function hsoDat(nhom, k, v, ve){ HSO[nhom][k] = v; if(ve) hsoVe(); else hsoHen(); }
function hsoDatLuu(k, v){ hsoLuu()[k] = v; luu(); hsoHen(); }
function hsoTick(nhom, kh, v){ var T = nhom==='vay' ? HSO.vay.chon : HSO[nhom]; T[kh] = v; hsoHen(); var o = document.getElementById('hso-dem-'+nhom); if(o) o.textContent = Object.keys(T).filter(function(k){ return T[k]; }).length; }
function hsoDocO(){ ['ttMoi','ttCu','phoMoi','phoCu','giao','nhan'].forEach(function(k){ var e = document.getElementById('hso-o-'+k); if(e) HSO.o[k] = e.value; }); hsoHen(); }   /* ô Bên giao / nhận, bầu thay: sửa 1 ô → giữ cả nhóm */

/* ---------- 3.207 (anh yêu cầu 14/10): 🏠 HỘ VAY MỚI — khai báo 1 lần (form nhập nhanh), lưu danh sách (D.cauHinh.hoMoi, đồng bộ Drive cùng cài đặt), gọi ra làm hồ sơ (Bộ HS → 01/TD · 01/UQ · 03/TD) ----------
   hộ = {id, tao, sua, xa, tenXa, diem, tenDiem, thon, tenThon, tv:[{ten, ns, cccd, ncap, noiCap, qh}], dung (người đứng tên vay), hssv (-1 = không)} */
function hmDs(){ var c = D.cauHinh; if(!Array.isArray(c.hoMoi)) c.hoMoi = []; return c.hoMoi; }
var HM = null, HM_Q = '', HM_CHON = {};
function hmNguoi(){ return {ten:'', ns:'', cccd:'', ncap:'', noiCap:'', qh:'', sdt:''}; }
function hmDiaBan(){   /* xã · điểm GD · ấp lấy từ cây tổ đang có */
  var X = {}; Object.keys((TO_K && TO_K.to) || {}).forEach(function(m){ var t = TO_K.to[m]; if(!t || !t.xa || toLaTT(t)) return;
    var x = X[t.xa] = X[t.xa] || {xa:t.xa, tenXa:t.tenXa||t.xa, diem:{}, ap:{}};
    if(t.khoaDiem) x.diem[t.khoaDiem] = t.tenDiem || t.khoaDiem;
    var ak = t.thon || t.tenThon; if(ak){ var a = x.ap[ak] = x.ap[ak] || {thon:t.thon||'', tenThon:t.tenThon||'', diem:{}}; if(t.khoaDiem) a.diem[t.khoaDiem] = 1; } });
  return X;
}
function hmTen(o){ var n = o.tv[o.dung||0] || {}; return n.ten || '(chưa tên)'; }
function hmDiaChiChu(o){ return [o.tenThon ? (/^(ấp|khu phố|kp|thôn)/i.test(o.tenThon) ? o.tenThon : 'Ấp '+o.tenThon) : '', o.tenXa].filter(Boolean).join(', '); }
function hmM31(cccd){ cccd = String(cccd||'').replace(/\D/g, ''); if(cccd.length<9 || !SL_DB || !SL_DB.kh) return '';
  if(HM_M31.db!==SL_DB){ HM_M31 = {db:SL_DB, m:{}}; Object.keys(SL_DB.kh).forEach(function(k){ var c = String(SL_DB.kh[k].cccd||'').replace(/\D/g, ''); if(c) HM_M31.m[c] = k; }); }
  return HM_M31.m[cccd] || ''; }
var HM_M31 = {};
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
function hmToTen(o){ var t = o.to && TO_K && TO_K.to[o.to]; return t ? 'Tổ '+(t.ten||t.ma) : ''; }
function hmGanMa(){   /* hộ mới đã lên Mẫu 31 (khớp CCCD người đứng tên) → gắn mã KH, tổ */
  var doi = 0; hmDs().forEach(function(o){ if(o.kh) return; var n = o.tv[o.dung||0] || {}, m = hmM31(n.cccd); if(!m) return; var c = SL_DB.kh[m] || {}; o.kh = m; if(c.to && !o.to) o.to = c.to; doi++; });
  if(doi) luu(); return doi;
}
function hmChuyenCu(){   /* 1 lần: Bộ HS cũ (3.171–3.208) → sổ hộ vay; bản gốc hsoBo giữ nguyên */
  var C = D.cauHinh; if(C.hoVayChuyen) return; C.hoVayChuyen = 1;
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
  var c = (SL_DB && SL_DB.kh && SL_DB.kh[kh]) || null; if(!c) return null;
  var co = hmDs().find(function(o){ return o.kh===kh; }); if(co) return co;
  var t = c.to && TO_K && TO_K.to[c.to], k = hsoKhach(kh, t);
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
  var S = hsoCH(), t = TO_K && S.to && TO_K.to[S.to], tv = t && !toLaTT(t) ? hsoTVTo(t) : [], co = {}; hmDs().forEach(function(o){ if(o.kh) co[o.kh] = 1; });
  moHop('<div class="hop-tit">＋ Lấy hộ từ Mẫu 31</div><div class="hop-phu">Hộ cũ có mã KH; nhân thân, SĐT luôn đọc Mẫu 31 mới nhất. Tên vợ / chồng trên Mẫu 31 đưa vào làm người thừa kế (ngày sinh, CCCD bổ sung khi cần in giấy UQ).</div>'+
    hsoTuyO('Tìm tên / CCCD', '<input placeholder="gõ số CCCD hoặc họ tên" oninput="hmM31Tim(this.value)">')+'<div id="hm-m31-kq" class="hso-tim-kq"></div>'+
    (tv.length ? '<div class="nhan-nhom">Tổ viên tổ đang chọn ('+coChuHTML('Tổ '+(t.ten||t.ma))+')</div><div class="hso-tick-ds">'+tv.map(function(k){ return '<label><input type="checkbox" class="hm-m31-tick" value="'+coChuHTML(k.kh)+'"'+(co[k.kh] ? ' disabled' : '')+'> '+coChuHTML(k.ten)+(co[k.kh] ? ' <small>(đã có trong sổ)</small>' : '')+'</label>'; }).join('')+'</div>'+
      '<div class="hang-nut"><button class="nho chinh" onclick="hmLayTo()">＋ Đưa các hộ đã tích vào sổ</button></div>' : '<div class="sl-phu">Chọn 1 tổ ở khối LỌC ĐỊA BÀN để tích nhiều tổ viên 1 lần.</div>')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button></div>', true);
}
function hmM31Tim(q){ var o = document.getElementById('hm-m31-kq'); if(!o) return; q = String(q||'').trim(); if(q.length<2){ o.innerHTML = ''; return; }
  var ds = []; try { ds = slTimKH(q, 12); } catch(e){}
  o.innerHTML = ds.length ? ds.map(function(r){ var c = (SL_DB.kh||{})[r.m] || {}; return '<button class="nho" onclick="hmLayM31(\''+r.m+'\')">'+coChuHTML(r.ten||c.ten||r.m)+' <small>'+coChuHTML([c.cccd, c.tenThon, c.toTen ? 'tổ '+c.toTen : ''].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="sl-phu">Không thấy trên Mẫu 31 — dùng <b>＋ Hộ mới</b>.</div>'; }
function hmDongBo(o, B){   /* hộ → phiếu làm hồ sơ của hộ (1 phiếu / hộ, ghi đè — không lưu lịch sử): người vay, thành viên, tổ; hộ cũ đọc Mẫu 31 mới nhất */
  var n = o.tv[o.dung||0] || {}, c = o.kh && SL_DB && SL_DB.kh && SL_DB.kh[o.kh], t = o.to && TO_K && TO_K.to[o.to], d = hsoCCCDDoc(n.cccd);
  if(c){ var k = hsoKhach(o.kh, t); n = Object.assign({}, n, {ten:k.ten||n.ten, ns:k.ns||n.ns, cccd:k.cccd||n.cccd, ncap:k.ncap||n.ncap, noiCap:k.noiCap||n.noiCap, sdt:c.sdt||n.sdt}); d = hsoCCCDDoc(n.cccd); }
  B.hoId = o.id; B.moi = !o.kh; B.kh = o.kh || ''; B.to = o.to || B.to || ''; if(t) B.toi = hsoTo(t);
  B.nv = Object.assign({}, B.nv||{}, {ten:n.ten||'', ns:n.ns||'', cccd:n.cccd||'', ncap:n.ncap||'', noiCap:n.noiCap || hsoNoiCapGY(n.ncap), sdt:n.sdt||'', gt:(c && c.gt) || (d ? d.gt : (B.nv||{}).gt), danToc:(c && c.danToc) || (B.nv||{}).danToc || 'Kinh',
    ap:hsoApTen({tenThon:o.tenThon || (t && t.tenThon)}) || '', tenXa:o.tenXa || (t && t.tenXa) || ''});
  B.ho = o.tv.filter(function(x, i){ return i!==(o.dung||0) && x.ten; }).map(function(x){ return {ten:x.ten, ns:x.ns||'', cccd:x.cccd||'', qh:x.qh||''}; });
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
function hmTuyHTML(){
  hmChuyenCu(); hmGanMa();
  var q = slChuan(HM_Q), ds = hmDs().filter(function(o){ return !q || o.kh && slChuan(o.kh).indexOf(q)>=0 || o.tv.some(function(n){ return slChuan(n.ten+' '+n.cccd).indexOf(q)>=0; }); });
  var nChon = hmDs().filter(function(o){ return HM_CHON[o.id]; }).length;
  return '<div class="nhan-nhom">👪 Sổ hộ vay ('+hmDs().length+')</div><div class="hang-nut"><button class="nho chinh" onclick="hmMo()">＋ Hộ mới</button><button class="nho" onclick="hmM31Hop()">＋ Lấy từ Mẫu 31</button>'+
    (nChon ? '<button class="nho chinh" onclick="hsoD03TuChon()" title="Cùng 1 chương trình in chung 1 mẫu 03/TD">📋 Lập 03/TD ('+nChon+' hộ)</button>' : '')+
    '<input class="hm-tim" placeholder="Tìm tên / CCCD / mã KH" value="'+coChuHTML(HM_Q)+'" oninput="HM_Q=this.value;hsoVe()"></div>'+
    (ds.length ? '<div class="hm-ds">'+ds.map(function(o){ var n = o.tv[o.dung||0] || {}, sv = hmSV(o).map(function(i){ return (o.tv[i]||{}).ten; }).filter(Boolean);
      return '<div class="hm-dong"><input type="checkbox" class="hm-chon" title="Tích để lập 03/TD nhiều hộ"'+(HM_CHON[o.id] ? ' checked' : '')+' onchange="HM_CHON[\''+o.id+'\']=this.checked;hsoVe()"><div class="hm-giua"><b>'+coChuHTML(hmTen(o))+'</b>'+(n.cccd ? ' · '+coChuHTML(n.cccd) : '')+(o.kh ? ' <span class="hm-m31">mã KH '+coChuHTML(o.kh)+'</span>' : ' <span class="hm-moi">hộ mới</span>')+
        '<div class="sl-phu">'+coChuHTML([hmToTen(o), hmDiaChiChu(o) || 'chưa có địa chỉ'].filter(Boolean).join(' · '))+' · '+o.tv.length+' người'+(sv.length ? ' · HSSV: '+coChuHTML(sv.join(', ')) : '')+'</div></div>'+
        '<span class="hm-nut"><button class="nho" onclick="hmMo(\''+o.id+'\')" title="Sửa / bổ sung thành viên, HSSV">✎</button><button class="nho chinh" onclick="hmLamHS(\''+o.id+'\')" title="Chọn chương trình, in 01/TD (in kèm 03/TD, 10C, 01/UQ…)">📄 In hồ sơ</button><button class="nho" onclick="hmXoa(\''+o.id+'\')" title="Xóa khỏi sổ">🗑</button></span></div>'; }).join('')+'</div>'
      : '<div class="sl-phu">'+(hmDs().length ? 'Không thấy hộ khớp.' : 'Sổ trống — <b>＋ Hộ mới</b> (khai 1 lần) hoặc <b>＋ Lấy từ Mẫu 31</b> (hộ cũ có mã KH).')+'</div>');
}
function hmLapHTML(){   /* khung phải: bảng sổ hộ vay (in được) */
  var ds = hmDs();
  return '<p class="c b s14">SỔ HỘ VAY</p><p class="c i s11">(khai báo trên máy — '+ngayVNsl(ngayISO(nay()))+')</p><p>&nbsp;</p>'+
    hsoBang('luoi s11', [5, 21, 10, 13, 10, 23, 6, 12], '<tr><td class="c b">STT</td><td class="c b">Người đứng tên vay</td><td class="c b">Ngày sinh</td><td class="c b">Số CCCD</td><td class="c b">Mã KH</td><td class="c b">Tổ · địa chỉ</td><td class="c b">Số người</td><td class="c b">HSSV</td></tr>'+
      (ds.length ? ds.map(function(o, i){ var n = o.tv[o.dung||0] || {}, sv = hmSV(o).map(function(k){ return (o.tv[k]||{}).ten; }).filter(Boolean);
        return '<tr><td class="c">'+(i+1)+'</td><td>'+coChuHTML(n.ten||'')+'</td><td class="c">'+(n.ns ? ngayVNsl(n.ns) : '')+'</td><td class="c">'+coChuHTML(n.cccd||'')+'</td><td class="c">'+coChuHTML(o.kh||'')+'</td><td>'+coChuHTML([hmToTen(o), hmDiaChiChu(o)].filter(Boolean).join(' · '))+'</td><td class="c">'+o.tv.length+'</td><td>'+coChuHTML(sv.join(', '))+'</td></tr>'; }).join('')
        : '<tr><td colspan="8" class="c i">Chưa có hộ</td></tr>'));
}
function hmMo(id){
  var o = id ? hmTim(id) : null;
  HM = o ? JSON.parse(JSON.stringify(o)) : {id:'', kh:'', to:'', xa:'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'', tv:[hmNguoi()], dung:0, sv:[]};
  HM.sv = hmSV(HM).slice(); delete HM.hssv;
  if(!o){ var S = hsoCH(), t = TO_K && S.to && TO_K.to[S.to]; if(t && !toLaTT(t)){ HM.xa = t.xa||''; HM.tenXa = t.tenXa||''; HM.diem = t.khoaDiem||''; HM.tenDiem = t.tenDiem||''; HM.thon = t.thon||''; HM.tenThon = t.tenThon||''; HM.to = t.ma; } else if(S.xa && TO_K){ var X = hmDiaBan()[S.xa]; if(X){ HM.xa = X.xa; HM.tenXa = X.tenXa; } } }   /* gợi ý địa bàn, tổ theo khối lọc */
  hmVe();
}
function hmDsTo(){ if(!TO_K || !HM.xa) return []; return Object.keys(TO_K.to).map(function(m){ return TO_K.to[m]; }).filter(function(t){ return t && !toLaTT(t) && t.xa===HM.xa && (!HM.diem || t.khoaDiem===HM.diem) && (!(HM.thon||HM.tenThon) || t.thon===HM.thon || t.tenThon===HM.tenThon); })
  .sort(function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi'); }); }
function hmVe(){
  var X = hmDiaBan(), x = X[HM.xa], coDB = Object.keys(X).length;
  var dsAp = x ? Object.keys(x.ap).map(function(k){ return x.ap[k]; }).filter(function(a){ return !HM.diem || a.diem[HM.diem]; }).sort(function(a, b){ return String(a.tenThon).localeCompare(String(b.tenThon), 'vi', {numeric:true}); }) : [];
  var sel = function(js, gt, ops){ return '<select onchange="'+js+'">'+ops.map(function(o){ return '<option value="'+coChuHTML(o[0])+'"'+(String(o[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(o[1])+'</option>'; }).join('')+'</select>'; };
  var dsTo = hmDsTo();
  var dc = coDB ? '<div class="hm-dc">'+
      sel('hmDatXa(this.value)', HM.xa, [['', '— Xã / phường —']].concat(Object.keys(X).map(function(k){ return [k, X[k].tenXa]; })))+
      (x ? sel('hmDatDiem(this.value)', HM.diem, [['', '— Điểm GD (lọc ấp, không bắt buộc) —']].concat(Object.keys(x.diem).map(function(k){ return [k, 'Điểm '+x.diem[k]]; }))) : '')+
      (x ? sel('hmDatAp(this.value)', HM.thon || HM.tenThon, [['', '— Ấp / khu phố —']].concat(dsAp.map(function(a){ return [a.thon || a.tenThon, a.tenThon || a.thon]; }))) : '')+
      (x ? sel('HM.to=this.value;hmVe()', HM.to, [['', '— Tổ TK&VV ('+dsTo.length+') —']].concat(dsTo.map(function(t){ return [t.ma, 'Tổ '+(t.ten||t.ma)+(t.tenThon ? ' · '+pvApNgan(t.tenThon) : '')]; }))) : '')+'</div>'
    : '<div class="hm-dc"><input placeholder="Xã / phường" value="'+coChuHTML(HM.tenXa)+'" onchange="HM.tenXa=this.value"><input placeholder="Ấp / khu phố" value="'+coChuHTML(HM.tenThon)+'" onchange="HM.tenThon=this.value"></div>';
  var nguoi = HM.tv.map(function(n, i){ var o = function(f, ph, w, ngay){ return '<input style="width:'+w+'" value="'+coChuHTML(ngay ? (n[f] ? ngayVNsl(n[f]) : '') : (n[f]||''))+'" placeholder="'+ph+'" onchange="hmDat('+i+',\''+f+'\',this.value)">'; };
    return '<div class="hm-nguoi'+(i===HM.dung ? ' dung' : '')+'"><div class="hm-hang"><b>'+(i+1)+'.</b>'+o('ten', 'Họ tên', '34%')+o('ns', 'ngày sinh — gõ 150378', '22%', 1)+o('cccd', 'Số CCCD 12 số', '24%')+
      (i ? o('qh', 'Quan hệ', '13%') : '<span class="hm-qh">Chủ hộ</span>')+(i ? '<button class="nho" title="Bỏ người này" onclick="hmBoNguoi('+i+')">✕</button>' : '')+'</div>'+
      '<div class="hm-hang">'+o('ncap', 'ngày cấp CCCD — gõ 9112021', '34%', 1)+o('sdt', 'Số điện thoại', '22%')+
      '<label><input type="radio" name="hm-dung"'+(i===HM.dung ? ' checked' : '')+' onchange="HM.dung='+i+';hmVe()"> Đứng tên vay</label>'+
      '<label><input type="checkbox"'+(HM.sv.indexOf(i)>=0 ? ' checked' : '')+' onchange="hmDatSV('+i+',this.checked)"> HSSV</label></div>'+
      '<div class="sl-phu" id="hm-suy-'+i+'">'+hmSuyHTML(n, i===HM.dung)+'</div></div>'; }).join('');
  moHop('<div class="hop-tit">👪 '+(HM.id ? 'Sửa hộ vay' : 'Khai báo hộ vay mới')+(HM.kh ? ' <small>· mã KH '+coChuHTML(HM.kh)+' (Mẫu 31)</small>' : '')+'</div><div class="hop-phu">Chỉ bắt buộc <b>người đứng tên vay</b>; thành viên / thừa kế, HSSV bổ sung khi cần (giấy UQ mới cần đủ thừa kế). Ngày gõ liền số (150378 = 15/03/1978).'+(HM.kh ? ' Hộ cũ: nhân thân in theo Mẫu 31 mới nhất.' : '')+'</div>'+
    '<div class="nhan-nhom">📍 Địa chỉ · tổ</div>'+dc+'<div class="nhan-nhom">👪 Người trong hộ</div>'+nguoi+
    '<div class="hang-nut"><button class="nho" onclick="HM.tv.push(hmNguoi());hmVe()">＋ Thành viên / thừa kế / HSSV</button></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="hmLuu()">💾 Lưu hộ</button></div>', true);
}
function hmDatSV(i, v){ var k = HM.sv.indexOf(i); if(v && k<0) HM.sv.push(i); if(!v && k>=0) HM.sv.splice(k, 1); hmVe(); }
function hmDat(i, f, v){
  var n = HM.tv[i]; if(!n) return; v = String(v||'').trim();
  if(f==='ns' || f==='ncap'){ var iso = typeof gdxDocNgay==='function' ? gdxDocNgay(v) : hsoNgayTu(v); n[f] = iso || ''; if(v && !iso) bao('Ngày chưa đọc được: '+v+' — gõ dd/mm/yyyy hoặc liền số (150378).'); }
  else if(f==='cccd') n.cccd = v.replace(/\D/g, '');
  else if(f==='sdt') n.sdt = v.replace(/[^\d+ ]/g, '').trim();
  else if(f==='ten') n.ten = tenHoaDau(v.replace(/\s+/g, ' '));
  else n[f] = v;
  if(f==='ncap') n.noiCap = hsoNoiCapGY(n.ncap);
  hmVe();
}
function hmBoNguoi(i){ HM.tv.splice(i, 1); if(HM.dung>=HM.tv.length || HM.dung===i) HM.dung = 0; else if(HM.dung>i) HM.dung--; HM.sv = HM.sv.filter(function(k){ return k!==i; }).map(function(k){ return k>i ? k-1 : k; }); hmVe(); }
function hmDatXa(v){ var x = hmDiaBan()[v]; HM.xa = v; HM.tenXa = x ? x.tenXa : ''; HM.diem = ''; HM.tenDiem = ''; HM.thon = ''; HM.tenThon = ''; HM.to = ''; hmVe(); }
function hmDatDiem(v){ var x = hmDiaBan()[HM.xa]; HM.diem = v; HM.tenDiem = x && v ? x.diem[v] : ''; HM.to = ''; hmVe(); }
function hmDatAp(v){ var x = hmDiaBan()[HM.xa], a = x && x.ap[v]; HM.thon = a ? a.thon : ''; HM.tenThon = a ? a.tenThon : ''; var ds = hmDsTo(); if(!ds.some(function(t){ return t.ma===HM.to; })) HM.to = ds.length===1 ? ds[0].ma : ''; hmVe(); }
function hmLuu(){
  var n = HM.tv[HM.dung||0] || {}; if(!String(n.ten||'').trim()) return bao('Nhập họ tên người đứng tên vay.');
  var so = String(n.cccd||'').replace(/\D/g, ''), trung = so && hmDs().find(function(x){ var m = x.tv[x.dung||0] || {}; return x.id!==HM.id && String(m.cccd||'').replace(/\D/g, '')===so; });
  if(trung){ bao('CCCD '+so+' đã có trong sổ ('+hmTen(trung)+') — mở hộ đã có.', 5); hmMo(trung.id); return; }
  var giu = HM.tv.map(function(x, i){ return i===HM.dung || HM.sv.indexOf(i)>=0 || String(x.ten||'').trim() ? i : -1; }).filter(function(i){ return i>=0; });
  var dung = giu.indexOf(HM.dung); HM.sv = HM.sv.map(function(i){ return giu.indexOf(i); }).filter(function(i){ return i>=0; }); HM.tv = giu.map(function(i){ return HM.tv[i]; }); HM.dung = dung<0 ? 0 : dung;
  if(!HM.kh){ var m = hmM31(HM.tv[HM.dung].cccd); if(m){ HM.kh = m; if(!HM.to) HM.to = (SL_DB.kh[m]||{}).to || ''; } }
  var ds = hmDs(); HM.sua = new Date().toISOString();
  if(!HM.id){ HM.id = 'hm'+Date.now().toString(36); HM.tao = HM.sua; ds.unshift(HM); } else { var i = ds.findIndex(function(x){ return x.id===HM.id; }); if(i>=0) ds[i] = HM; else ds.unshift(HM); }
  var B = hsoBoDs().find(function(b){ return b.hoId===HM.id; }); if(B) hmDongBo(HM, B);
  luu(); dongHop(); bao('Đã lưu hộ '+hmTen(HM)+' vào sổ hộ vay.'); HM = null; hsoVe();
}
function hmXoa(id){ var o = hmTim(id); if(!o) return; hoi('Xóa hộ '+hmTen(o)+' khỏi sổ hộ vay?', 'Không ảnh hưởng số liệu Mẫu 31.', 'Xóa', function(){ var ds = hmDs(), i = ds.indexOf(o); if(i>=0) ds.splice(i, 1); hsoBoDs().forEach(function(b){ if(b.hoId===id) delete b.hoId; }); luu(); hsoVe(); }); }
function hmGanBo(id, B){ var o = hmTim(id); B = B || hsoBo(); if(!o || !B) return; hmDongBo(o, B); if(hmSV(o).length) B.ct = 'HSSV'; hsoBoLuu(); hsoVe(); }   /* 3.207 (giữ cho Bộ HS cũ) */
function hmLapHS(id){ var B = hsoBoMoi(); hmGanBo(id, B); hsoChonMau('bo'); }   /* 3.207 (giữ) — luồng mới: hmLamHS */
function hsoTuyPA(B){   /* ③ phương án theo thẻ chương trình (3.208) — dùng ở Bộ HS cũ và 01/TD theo hộ (3.209) */
  var h = '', N = B.nv, A = hsoPA(B);
  var boNhap = function(nhan, duong, gt, ph, ve, kieu){ return hsoTuyO(nhan, '<input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoBoDat(\''+duong+'\',this.value'+(ve ? ',1' : '')+')">'); };
  var C = A.C, P = B.pa || {}, dt = C.dtth;
  var mdOps = function(tu){ return [['', tu]].concat(C.md.map(function(x){ return [x, x]; })); };
  h += '<div class="nhan-nhom">③ Phương án — '+coChuHTML(C.ma)+'</div>';
  if(C.kieu==='hssv'){
    h += boNhap('Tên sinh viên', 'pa.sv', P.sv, 'họ tên sinh viên')+(C.md.length>1 ? hsoTuyO('Mục đích', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— '+C.md[0]+' —').slice(1))) : '')+
      boNhap('Số tháng (bảng 01/TD)', 'pa.soThang', P.soThang, 'gõ số tháng — trống = chấm', 1)+boNhap('Số tiền vay (đ)', 'tien', B.tien, 'gõ số tiền', 1)+
      '<div class="sl-phu">Số tháng, số tiền gõ tay (anh chốt — app không tự tính).</div>';
  } else if(C.kieu==='congtrinh'){
    h += (C.loai ? '<div class="hang-nut"><label class="hso-o2"><input type="radio" name="hso-loai"'+(P.loai!=='sua' ? ' checked' : '')+' onchange="hsoBoDat(\'pa.loai\',\'moi\',1)"> Xây mới</label><label class="hso-o2"><input type="radio" name="hso-loai"'+(P.loai==='sua' ? ' checked' : '')+' onchange="hsoBoDat(\'pa.loai\',\'sua\',1)"> Sửa chữa</label></div>' : '')+
      C.ctr.map(function(c, i){ var k = hsoPaK(i); return '<div class="hso-ho"><label><input type="checkbox"'+(P[k[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'pa.'+k[0]+'\',this.checked,1)"> '+coChuHTML(c.ten)+'</label> <input style="width:38%" value="'+coChuHTML(P[k[1]]||'')+'" placeholder="'+(hsoSo(c.tien) ? '≤ '+tdnTien(hsoSo(c.tien)) : 'số tiền')+'" onchange="hsoBoDat(\'pa.'+k[1]+'\',this.value,1)"></div>'; }).join('')+
      (C.md.length ? hsoTuyO('Mục đích in', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— tự ghép theo công trình —'))) : '')+
      '<div class="sl-phu">Tổng vay: <b>'+tdnTien(A.tien)+'</b> đ'+(A.md ? ' · '+coChuHTML(A.md) : '')+(A.canh.length ? ' — <b class="hso-canh">⚠ '+coChuHTML(A.canh.join('; '))+'</b>' : '')+'</div>';
  } else {
    h += (C.md.length ? hsoTuyO('Mục đích', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— '+C.md[0]+' —').slice(1))) : boNhap('Mục đích', 'pa.md', P.md, 'gõ mục đích vay', 1))+
      boNhap('Đối tượng (bảng 01/TD)', 'pa.dt', P.dt, A.md || 'trống = theo mục đích', 1)+boNhap('Số lượng', 'pa.sl', P.sl, 'vd 01 con, 02 sào…', 1)+boNhap('Số tiền vay (đ)', 'tien', B.tien, 'gõ số tiền', 1);
  }
  var dMd = hsoDTTHMd(B, /^phường/i.test(String(N.tenXa || ''))), phThIn = C.thIn==='in' && C.th ? 'trống = ghi sẵn '+C.th+' (thẻ CT)' : 'trống = chấm', phKy = C.kyIn==='in' && C.ky ? 'trống = ghi sẵn '+C.ky+' (thẻ CT)' : 'trống = chấm';
  h += boNhap('Vốn tự có (đ)', 'tuCo', B.tuCo, '0')+
    boNhap('Thời hạn xin vay (tháng)', 'th', B.th, phThIn, 1)+boNhap('Kỳ hạn trả nợ (tháng/lần)', 'ky', B.ky, phKy, 1)+boNhap('Hạn trả nợ cuối cùng', 'hanCuoi', hsoNgayVN(B.hanCuoi), 'dd/mm/yyyy — trống = chấm', 1)+
    hsoTuyO('Đối tượng thụ hưởng', dt.length ? hsoChon('hsoBoDat(\'dtth\',this.value,1)', B.dtth, [['', dMd ? '— mặc định: '+dMd+' —' : '— chọn —']].concat(dt.map(function(x){ return [x, x]; }))) : '<span class="sl-phu">chưa khai — <a href="#" onclick="event.preventDefault();hsoKBHop(\'ct\')">⚙ khai ở thẻ chương trình</a></span>')+
    '<div class="sl-phu">Thời hạn gõ ở đây (hoặc tab 01/TD) tự sang cột Thời hạn của 03/TD.</div>';
  return h;
}
/* ---------- 3.209 (anh 14/10): 03/TD NHIỀU HỘ — cùng 1 chương trình in chung 1 tờ; tích hộ ở sổ → 📋 Lập 03/TD, hoặc mở 03/TD → ＋ Thêm hộ; sửa từng dòng (không lưu lịch sử — tờ đang lập giữ đến khi làm tờ mới) ---------- */
function hsoD03(){ var S = hsoCH(); if(!S.d03 || !Array.isArray(S.d03.ds)) S.d03 = {ct:'', ds:[]}; if(!S.d03.ct) S.d03.ct = (hsoCTVDs().find(function(c){ return c.bat!==false; }) || {}).ma || 'HSSV'; return S.d03; }
function hsoD03To(D3){ var o = null; D3.ds.some(function(r){ o = hmTim(r.hoId); return o && o.to; }); return o && o.to && TO_K && TO_K.to[o.to] || null; }
function hsoD03Moi(o, ct){   /* dòng mới: lấy phiếu làm hồ sơ của hộ nếu cùng chương trình, không thì mặc định thẻ CT */
  var B = hsoBoDs().find(function(b){ return b.hoId===o.id; }), C = hsoCTV(ct) || {}, t = o.to && TO_K && TO_K.to[o.to], ph = /^phường/i.test(String(o.tenXa || (t && t.tenXa) || ''));
  if(B && B.ct===ct){ hmDongBo(o, B); var A = hsoPA(B); return {hoId:o.id, tien:A.tien ? String(A.tien) : '', md:A.mdDs||'', th:A.th||'', dt:B.dtth || hsoDTTHMd(B, ph)}; }
  return {hoId:o.id, tien:'', md:C.kieu==='congtrinh' ? '' : (C.md||[])[0] || '', th:C.thIn==='in' ? C.th||'' : '', dt:hsoDTTHMd({ct:ct}, ph)};
}
function hsoD03Them(id){ if(!id) return; var D3 = hsoD03(), o = hmTim(id); if(!o) return; if(D3.ds.some(function(r){ return r.hoId===id; })) return bao('Hộ đã có trong danh sách.'); D3.ds.push(hsoD03Moi(o, D3.ct)); luu(); hsoVe(); }
function hsoD03Bo(i){ var D3 = hsoD03(); D3.ds.splice(i, 1); luu(); hsoVe(); }
function hsoD03Dat(i, f, v){ var r = hsoD03().ds[i]; if(!r) return; r[f] = f==='tien' ? String(v||'').replace(/[^\d]/g, '') : f==='th' ? String(v||'').replace(/[^\d]/g, '') : String(v||'').trim(); luu(); hsoVe(); }
function hsoD03CT(ma){ var D3 = hsoD03(); if(D3.ct===ma) return; D3.ct = ma; D3.ds = D3.ds.map(function(r){ var o = hmTim(r.hoId); return o ? hsoD03Moi(o, ma) : r; }); luu(); hsoVe(); }
function hsoD03TuChon(){ var ids = hmDs().filter(function(o){ return HM_CHON[o.id]; }).map(function(o){ return o.id; }); if(!ids.length) return;
  var D3 = hsoD03(), B = hsoBoDs().find(function(b){ return b.hoId===ids[0]; }); if(B && B.ct) D3.ct = B.ct;
  D3.ds = ids.map(function(id){ return hsoD03Moi(hmTim(id), D3.ct); }); HM_CHON = {}; hsoCH().boId = ''; luu(); hsoChonMau('03td'); }
function hsoD03Hang(D3){ return D3.ds.map(function(r){ var o = hmTim(r.hoId); return {ten:o ? hmTen(o) : '(hộ đã xóa)', dt:r.dt, tien:hsoSo(r.tien), md:r.md, th:r.th ? r.th+' tháng' : ''}; }); }
function hsoTuy03(t){
  var D3 = hsoD03(), C = hsoCTV(D3.ct) || {}, co = {}; D3.ds.forEach(function(r){ co[r.hoId] = 1; });
  var h = '<div class="nhan-nhom">Chương trình (cùng 1 chương trình / 1 tờ)</div><div class="hang-nut">'+hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===D3.ct; }).map(function(c){ return gdxChip('<b>'+coChuHTML(c.ma)+'</b>', D3.ct===c.ma, 'hsoD03CT(\''+c.ma+'\')', 'hso-ct', c.ten); }).join('')+'</div>';
  h += hsoTuyO('＋ Thêm hộ', hsoChon('hsoD03Them(this.value)', '', [['', '— chọn hộ trong sổ —']].concat(hmDs().filter(function(o){ return !co[o.id]; }).map(function(o){ var n = o.tv[o.dung||0] || {}; return [o.id, (n.ten||'(chưa tên)')+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; }))))+
    '<div class="sl-phu">Hoặc tích nhiều hộ ở tab <a href="#" onclick="event.preventDefault();hsoChonMau(\'homoi\')">👪 Hộ vay</a> → 📋 Lập 03/TD.</div>';
  var dtOps = [['', '—']].concat((C.dtth||[]).map(function(x){ return [x, x]; }));
  h += D3.ds.length ? '<div class="hso-d03">'+D3.ds.map(function(r, i){ var o = hmTim(r.hoId);
      return '<div class="hso-d03-dong"><div class="hm-hang"><b>'+(i+1)+'. '+coChuHTML(o ? hmTen(o) : '(hộ đã xóa)')+'</b> <button class="nho" title="Bỏ khỏi danh sách" onclick="hsoD03Bo('+i+')">✕</button></div>'+
        '<div class="hm-hang"><input style="width:30%" value="'+coChuHTML(r.tien ? tdnTien(+r.tien) : '')+'" placeholder="số tiền" onchange="hsoD03Dat('+i+',\'tien\',this.value)"><input style="width:16%" value="'+coChuHTML(r.th||'')+'" placeholder="tháng" onchange="hsoD03Dat('+i+',\'th\',this.value)">'+
        (C.dtth && C.dtth.length ? '<select style="width:48%" onchange="hsoD03Dat('+i+',\'dt\',this.value)">'+dtOps.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(x[0]===r.dt ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>' : '<input style="width:48%" value="'+coChuHTML(r.dt||'')+'" placeholder="đối tượng thụ hưởng" onchange="hsoD03Dat('+i+',\'dt\',this.value)">')+'</div>'+
        '<div class="hm-hang"><input style="width:96%" value="'+coChuHTML(r.md||'')+'" placeholder="mục đích sử dụng vốn" onchange="hsoD03Dat('+i+',\'md\',this.value)"></div></div>'; }).join('')+'</div>'+
    '<div class="sl-phu">Cộng: <b>'+tdnTien(D3.ds.reduce(function(a, r){ return a+hsoSo(r.tien); }, 0))+'</b> đ · '+D3.ds.length+' hộ'+(D3.ds.length ? ' · <a href="#" onclick="event.preventDefault();hsoCH().d03={ct:\''+D3.ct+'\',ds:[]};luu();hsoVe()">làm tờ mới</a>' : '')+'</div>'
    : '<div class="sl-phu">Chưa có hộ — khung phải là mẫu trắng.</div>';
  return h+hsoNgayTuy('Ngày họp bình xét');
}
/* ---------- 3.209: cột trái 01/TD · 01/UQ · 03/TD · 01/TGTV theo hộ — chọn hộ → chọn chương trình → phương án → in (+ in kèm) ---------- */
function hsoKemCo(B){ var k = (B && B.kem) || {}; return !!(k.ds || k.bb || k.uq || k.tgtv); }
function hsoUQThieu(B){   /* thành viên ≥ 18 tuổi thiếu ngày sinh / CCCD (giấy UQ) */
  var r = []; (B.ho || []).forEach(function(x){ if(!x.ns || !x.cccd) r.push(x.ten); }); return r; }
function hsoTuyHo(M, t){
  var B = hsoBo(), o = B && B.hoId ? hmTim(B.hoId) : null, h = '';
  if(B && !o) B = null;
  if(o) hmDongBo(o, B);
  h += hsoTuyO('👪 Hộ vay', hsoChon('hmChonHo(this.value)', o ? o.id : '', [['', hmDs().length ? '— chọn hộ trong sổ ('+hmDs().length+') —' : '— sổ trống —']].concat(hmDs().map(function(x){ var n = x.tv[x.dung||0] || {}; return [x.id, (n.ten||'(chưa tên)')+(x.kh ? ' · '+x.kh : ' · hộ mới')+(hmToTen(x) ? ' · '+hmToTen(x) : '')]; }))))+
    '<div class="hang-nut"><button class="nho" onclick="hmMo()">＋ Hộ mới</button><button class="nho" onclick="hmM31Hop()">＋ Lấy từ Mẫu 31</button>'+(o ? '<button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Sửa / bổ sung hộ</button>' : '')+'</div>';
  if(!o) return h+'<div class="sl-phu">Chưa chọn hộ → khung phải là mẫu trắng (in được ngay).</div>';
  var N = B.nv, C = hsoCTV(B.ct) || {};
  h += '<div class="sl-phu"><b>'+coChuHTML(N.ten)+'</b>'+(N.cccd ? ' · CCCD '+coChuHTML(N.cccd) : '')+(o.kh ? ' · mã KH '+coChuHTML(o.kh) : ' · hộ mới (chưa mã KH)')+(hmToTen(o) ? ' · '+coChuHTML(hmToTen(o)) : ' · <b class="hso-canh">chưa gắn tổ</b>')+'</div>';
  if(M.k==='01uq'){ var th = hsoUQThieu(B); if(!B.ho.length || th.length) h += '<div class="sl-bao vang hso-nhac">⚠ Giấy UQ cần đủ thành viên ≥ 18 tuổi (ngày sinh, CCCD)'+(th.length ? ' — thiếu: '+coChuHTML(th.join(', ')) : ' — hộ chưa có thành viên')+' <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung</button></div>'; return h; }
  if(M.k==='01tgtv') return h;
  h += '<div class="nhan-nhom">① Chương trình vay <a href="#" class="hso-nho" onclick="event.preventDefault();hsoKBHop(\'ct\')">⚙ khai báo chương trình</a></div><div class="hang-nut">'+
    hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===B.ct; }).map(function(c){ return gdxChip('<b>'+coChuHTML(c.ma)+'</b>', B.ct===c.ma, 'hsoBoDat(\'ct\',\''+c.ma+'\',1)', 'hso-ct', c.ten); }).join('')+'</div>';
  if(C.kieu==='hssv'){ var sv = hmSV(o).map(function(i){ return (o.tv[i]||{}).ten; }).filter(Boolean);
    h += sv.length>1 ? '<div class="nhan-nhom">Sinh viên (mỗi SV 1 đơn)</div><div class="hang-nut">'+sv.map(function(x){ return gdxChip(coChuHTML(x), (B.pa||{}).sv===x, 'hsoBoDat(\'pa.sv\',\''+String(x).replace(/'/g, "\\'")+'\',1)', 'hso-ct', ''); }).join('')+'</div>' : sv.length ? '' : '<div class="sl-phu hso-canh">Hộ chưa đánh dấu HSSV — gõ tên SV ở ô dưới hoặc <a href="#" onclick="event.preventDefault();hmMo(\''+o.id+'\')">✎ bổ sung</a>.</div>'; }
  h += hsoTuyPA(B);
  if(M.k==='01td') h += '<div class="nhan-nhom">In kèm (1 lần in / 1 file Word)</div>'+[['ds','03/TD danh sách'], ['bb','10C biên bản họp'], ['uq','01/UQ giấy ủy quyền'], ['tgtv','01/TGTV mở TK tổ viên'+(o.kh ? '' : ' (hộ mới)')]].map(function(x){
      return '<label class="hso-o2"><input type="checkbox"'+(B.kem[x[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'kem.'+x[0]+'\',this.checked?1:0,1)"> '+x[1]+'</label>'; }).join('')+
    (B.kem.uq && (hsoUQThieu(B).length || !B.ho.length) ? '<div class="sl-bao vang hso-nhac">⚠ 01/UQ thiếu thành viên / ngày sinh, CCCD — <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung</button></div>' : '')+
    (B.kem.bb || B.kem.ds ? hsoNgayTuy('Ngày họp tổ', 'Biên bản, 03/TD — trống = chấm.') : '');
  return h;
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
  var S = hsoCH(), T = hsoTo(t), L = hsoLuu(), h = '<div class="nhan-nhom hso-kbr">'+(M.k==='bo' || M.k==='homoi' ? '✎ Nhập liệu · '+M.ma : '⚙ Khai báo riêng — Mẫu '+M.ma)+'</div>', can = !t && ['bo','01uq','01td','03td','01tgtv','homoi'].indexOf(M.k)<0;
  if(can) h += '<div class="sl-bao vang hso-nhac">Chọn <b>1 tổ</b> ở khối LỌC ĐỊA BÀN để app điền sẵn — chưa chọn thì khung phải là mẫu trắng (in được ngay).</div>';
  if(t && T.phoKB && T.phoMay && slChuan(T.phoMay)!==slChuan(T.pho)) h += '<div class="sl-phu hso-canh">⚠ Tổ phó theo khai báo: <b>'+coChuHTML(T.pho)+'</b> (trên máy: '+coChuHTML(T.phoMay)+')</div>';
  else if(t && !T.pho) h += '<div class="sl-phu hso-canh">Tổ chưa có tổ phó trên máy — <a href="#" onclick="event.preventDefault();hsoKBHop(\'pho\')">⚙ khai tổ phó thực tế</a>.</div>';
  if(t && !T.truongAp && ['10c','10a','10b'].indexOf(M.k)>=0) h += '<div class="sl-phu hso-canh">Chưa khai trưởng ấp '+coChuHTML(T.ap)+' — <a href="#" onclick="event.preventDefault();hsoKBHop(\'ap\')">⚙ khai báo</a>.</div>';
  var tv = hsoTVTo(t);
  if(M.k==='10c'){
    var raBD = TO_BD && t && TO_BD.to===t.ma && TO_BD.co ? TO_BD.ra : [];
    h += hsoNgayTuy('Ngày họp', 'Chọn mẫu theo ngày họp: đến 30/09/2026 mẫu cũ, từ 01/10/2026 mẫu mới (QĐ 70). Trống = chấm, mẫu theo hôm nay.')+
      hsoTuyO('Mẫu', hsoChon('hsoDatLuu(\'mau10c\',this.value)', L.mau10c || 'tu', [['tu','Tự theo ngày họp'], ['cu','Mẫu cũ (vào tổ đến 30/09/2026)'], ['moi','Mẫu mới QĐ 70 (từ 01/10/2026)']]))+hsoHoiTuy(t)+
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
  else if(M.k==='11'){
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
      (TO_K ? '<div class="sl-phu">Số liệu đến ngày '+ngayVNsl(TO_K.ngay)+' ('+coChuHTML(TO_K.hsoTen||'')+'). Đổi kỳ ở 📅 đầu trang.</div>' : '');
  }
  else h += hsoTuyVay(M, t, tv);
  return h;
}
function hsoTuyVay(M, t, tv){
  var V = HSO.vay, B = hsoBo(), h = '';
  if(M.k==='homoi') return hmTuyHTML();
  if(M.k==='bo') return hsoTuyBo(t, tv);
  if(/^(01uq|01td)$/.test(M.k) && (!B || B.hoId)) return hsoTuyHo(M, t);   /* 3.209: in theo hộ (bộ cũ chưa gắn hộ → cách cũ) */
  if(M.k==='03td'){ var D3 = hsoD03(), oB = B && B.hoId && hmTim(B.hoId);   /* 3.209: 03/TD nhiều hộ; đi từ hộ đang làm → tự thêm hộ đó */
    if(oB && !D3.ds.length){ D3.ct = B.ct || D3.ct; D3.ds.push(hsoD03Moi(oB, D3.ct)); luu(); }
    if(D3.ds.length || oB) return hsoTuy03(t);
    h += hsoTuyO('＋ Thêm hộ từ sổ', hsoChon('hsoD03Them(this.value)', '', [['', '— 03/TD nhiều hộ: chọn hộ trong 👪 sổ hộ vay —']].concat(hmDs().map(function(o){ return [o.id, hmTen(o)+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; })))); }
  if(/^(01uq|01td|03td)$/.test(M.k)){
    h += B ? '<div class="sl-phu">Theo bộ hồ sơ: <b>'+coChuHTML(hsoBoTen(B))+'</b> — <a href="#" onclick="event.preventDefault();hsoChonMau(\'bo\')">sửa ở 📁 Bộ hồ sơ vay</a></div>'
      : '<div class="sl-phu">Chưa chọn bộ hồ sơ → mẫu trắng. <a href="#" onclick="event.preventDefault();hsoChonMau(\'bo\')">📁 Lập bộ hồ sơ vay</a></div>';
    if(B && (M.k==='01td' || M.k==='03td')){ var C1 = hsoCTV(B.ct) || {}, o1 = function(nhan, f, gt, ph){ return hsoTuyO(nhan, '<input value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="hsoBoDat(\''+f+'\',this.value,1)">'); };   /* 3.208: gõ thì in, trống thì chấm; 01/TD ↔ 03/TD cùng 1 số */
      h += o1('Thời hạn xin vay (tháng)', 'th', B.th, C1.thIn==='in' && C1.th ? 'trống = ghi sẵn '+C1.th : 'trống = chấm')+(M.k==='01td' ? o1('Hạn trả nợ cuối cùng', 'hanCuoi', hsoNgayVN(B.hanCuoi), 'dd/mm/yyyy — trống = chấm') : ''); }
    if(M.k==='03td'){ h += hsoNgayTuy('Ngày họp bình xét');
      if(!B && t){ if(!V.chon) V.chon = {}; h += '<details class="hso-tick" open><summary>👥 Tổ viên đề nghị vay — <b id="hso-dem-vay">'+Object.keys(V.chon).filter(function(k){ return V.chon[k]; }).length+'</b>/'+tv.length+'</summary><div class="hso-tick-ds">'+
        tv.map(function(k){ return '<label><input type="checkbox"'+(V.chon[k.kh] ? ' checked' : '')+' onchange="hsoTick(\'vay\',\''+k.kh+'\',this.checked)"> '+coChuHTML(k.ten)+'</label>'; }).join('')+'</div></details>'; } }
    return h;
  }
  if(M.k==='01tgtv'){
    var ng = V.tgNguon || (B ? 'bo' : 'to'), ds = hsoTVTo(t).filter(function(k){ return !k.stk.length && !k.coTK; });
    h += '<div class="hang-nut"><label class="hso-o2"><input type="radio" name="hso-tg"'+(ng==='bo' ? ' checked' : '')+' onchange="HSO.vay.tgNguon=\'bo\';hsoVe()"> Người vay trong bộ đang chọn</label>'+
      '<label class="hso-o2"><input type="radio" name="hso-tg"'+(ng==='to' ? ' checked' : '')+' onchange="HSO.vay.tgNguon=\'to\';hsoVe()"> Tổ viên chưa có TK 105 (in hàng loạt)</label></div>';
    if(ng==='bo') h += B ? '<div class="sl-phu">'+coChuHTML(hsoBoTen(B))+'</div>' : '<div class="sl-phu">Chưa chọn bộ hồ sơ → mẫu trắng.</div>';
    else { if(!V.tg) V.tg = {}; h += t ? '<details class="hso-tick" open><summary>Chưa có TK 105 — tích để in ('+ds.length+')</summary><div class="hso-tick-ds">'+
        ds.map(function(k){ return '<label><input type="checkbox"'+(V.tg[k.kh]!==false ? ' checked' : '')+' onchange="HSO.vay.tg[\''+k.kh+'\']=this.checked;hsoHen()"> '+coChuHTML(k.ten)+'</label>'; }).join('')+'</div></details>' : '<div class="sl-phu">Chọn tổ ở khối lọc.</div>'; }
    return h;
  }
  if(M.k==='01tdck'){   /* 3.206: người đề nghị = tổ viên đang chọn (chung lựa chọn với 09A) */
    h += hsoTuyO('Người đề nghị', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';hsoVe()', HSO.vay.kh||'', [['', t ? '— chọn tổ viên ('+tv.length+') —' : '— chọn tổ trước —']].concat(tv.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      hsoChamTuy('01tdck', {ngayKy:ngayISO(nay())});
  }
  if(M.k==='09a'){
    var mon = hsoMonGH(t), ds9 = tv.filter(function(k){ return k.mon.some(function(m){ return (m.dn||0)>0; }); });
    h += hsoTuyO('Người vay', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';delete HSO.vay.tienGH;hsoVe()', V.kh||'', [['', t ? '— chọn tổ viên ('+ds9.length+') —' : '— chọn tổ trước —']].concat(ds9.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      (mon.length ? hsoTuyO('Món vay', hsoChon('HSO.vay.ku=this.value;delete HSO.vay.tienGH;hsoVe()', V.ku || mon[0].ku, mon.map(function(m){ return [m.ku, m.ku+' · '+ctNgan(m.ct, m)+' · '+tdnTien(m.dn)+' đ · ĐH '+ngayVNsl(skHL(m))]; })))+
        '' : '')+
      '<div class="hso-cham"><label class="hso-o2"><input type="checkbox"'+(hsoLuu().kemTDCK ? ' checked' : '')+' onchange="hsoLuu().kemTDCK=this.checked;luu();hsoVe()"> <b>In kèm 01/TĐCK</b> (giấy đề nghị thay đổi mẫu chữ ký giao dịch) — cùng trang in / file Word</label>'+
        (hsoLuu().kemTDCK ? hsoChamTuy('01tdck', {ngayKy:ngayISO(nay())}) : '')+'</div>'+
      '<div class="hso-cham"><label class="hso-o2"><input type="checkbox"'+(hsoLuu().kem06 ? ' checked' : '')+' onchange="hsoLuu().kem06=this.checked;luu();hsoVe()"> <b>In kèm Mẫu 06/TD</b> (phiếu kiểm tra sử dụng vốn) — điền sẵn hộ vay, Hội quản lý; cán bộ kiểm tra để trống</label>'+
        (hsoLuu().kem06 ? '<div class="hso-cham-o"><span class="hso-cham-nhan">Mẫu 06/TD — cột Mục đích</span><span class="hso-sw"><button class="'+(hsoLuu().md06==='in' ? '' : 'bat')+'" onclick="hsoLuu().md06=\'cham\';luu();hsoVe()" title="Để trống — ghi tay">✍</button><button class="'+(hsoLuu().md06==='in' ? 'bat' : '')+'" onclick="hsoLuu().md06=\'in\';luu();hsoVe()" title="In sẵn ngành kinh tế theo Mẫu 31">🖨</button></span></div>' : '')+'</div>'+
      hsoChamTuy('09a', {tienGH:mon.length ? (mon.find(function(m){ return m.ku===V.ku; }) || mon[0]).dn : '', ngayKy:ngayISO(nay())});   /* 3.206: ô chấm tùy biến */
  }
  return h;
}
