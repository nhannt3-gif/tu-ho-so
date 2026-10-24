/* ===== 3.147 (đợt F, anh duyệt 10/10/2026): THANH BÊN ĐIỀU HƯỚNG — máy tính màn ≥ 1100 px =====
   - Chỉ đổi cách đi giữa các màn: mỗi mục gọi đúng lối cũ (doiNgan / moNapSL / slDoiTab / ccMo / moRac / moCaiDat…); nội dung từng màn giữ nguyên.
   - Thanh tab ngang + thanh tab con Số liệu chỉ ẩn bằng CSS khi có thanh bên → màn < 1100 px (điện thoại, máy bảng) vẫn dùng như cũ.
   - Thu gọn 60 px (chỉ biểu tượng): nút « / » — nhớ riêng từng máy (localStorage 'tb_gon': '1' thu / '0' mở); chưa chọn thì màn < 1280 px tự thu.
   - Tô mục đang mở: toNutSL() (gọi mỗi lần đổi tab / tab con) gọi dhTo(). */
var DH_MUC = [   /* sổ lối vào (3.328 P1): mỗi mục {k, bt, ten, mo, dem} — thứ tự = Alt+1…9; nhóm hiển thị ở DH_NHOM */
  {k:'0',   bt:'🏠', ten:'Hôm nay',    mo:function(){ doiNgan(0); }},
  {k:'1',   bt:'📄', ten:'Văn bản',    mo:function(){ doiNgan(1); }, dem:function(){ return (D.cho||[]).filter(function(c){ return c.nhom!=='duLieu'; }).length; }, demTit:'file chờ duyệt'},
  {k:'nap', bt:'📥', ten:'Nạp & KT',   mo:function(){ moNapSL(); }, dem:dhThieuNap, do:true, demTit:'file bắt buộc còn thiếu (tháng mới nhất)'},
  {k:'th',  bt:'📊', ten:'Tổng hợp',   mo:function(){ dhSL('th'); }},
  {k:'sk',  bt:'📑', ten:'Sao kê',     mo:function(){ dhSL('sk'); }},
  {k:'to',  bt:'👥', ten:'Tổ TK&VV',   mo:function(){ dhSL('to'); }},
  {k:'kt',  bt:'🛡', ten:'KTGS Hội',   mo:function(){ dhSL('kt'); }},
  {k:'tra', bt:'👤', ten:'Tra cứu KH', mo:function(){ dhSL('tra'); }},
  {k:'pb',  bt:'🎯', ten:'Phân bổ KH', mo:function(){ dhSL('pb'); }},   /* 3.288 P2 — KE_HOACH_PHAN_BO_KH */
  {k:'hst', bt:'📝', ten:'Hồ sơ Tổ',   mo:function(){ dhSL('hst'); }},   /* 3.170 */
  {k:'hsv', bt:'📄', ten:'Hồ sơ vay',  mo:function(){ dhSL('hsv'); }},
  {k:'gdx', bt:'🏢', ten:'Giao dịch xã', mo:function(){ dhSL('gdx'); }},   /* 3.172 */
  {k:'5',   bt:'📋', ten:'Biểu mẫu',   mo:function(){ doiNgan(5); }},
  {k:'4',   bt:'🪪', ten:'Scan',       mo:function(){ doiNgan(4); }},
  {k:'3',   bt:'🖼', ten:'Thư viện',   mo:function(){ doiNgan(3); }}
];
/* 3.328 (anh chốt 23/10, demo/thanh-ben-2-cap.html): THANH BÊN 2 CẤP — cấp 1: Hôm nay · Giao dịch xã ▸ · Nạp & KT · Số liệu ▸ · Hồ sơ ▸ · Tủ tài liệu ▸ · Công cụ ▸;
   Giao dịch xã = bàn thao tác (chỉ gọi chức năng có sẵn — 👤 Tra cứu KH trước); KTGS là mục con của Số liệu. Nhóm mở / đóng nhớ theo máy (localStorage 'tb_mo'); nhóm có mục đang mở tự mở. */
var DH_NHOM = [
  {k:'0'},
  {g:'gd', bt:'🏢', ten:'Giao dịch xã', con:['gdx', 'tra']},
  {k:'nap'},
  {g:'sl', bt:'📊', ten:'Số liệu', con:['th', 'sk', 'to', 'tra', 'kt', 'pb']},
  {g:'hs', bt:'📁', ten:'Hồ sơ', con:['hsv', 'hst']},
  {g:'tu', bt:'🗄', ten:'Tủ tài liệu', con:['1', '5', '4', '3']},
  {g:'cc', bt:'🛠', ten:'Công cụ', cc:true}
];
var DH_CUOI = '';   /* nhóm vừa bấm (mục có ở 2 nhóm — 👤 Tra cứu KH — tô theo nhóm này) */
function dhMuc(k){ return DH_MUC.find(function(m){ return m.k===k; }); }
function dhMoDs(){ var v = null; try{ v = JSON.parse(localStorage.getItem('tb_mo') || 'null'); }catch(e){} return v && typeof v==='object' ? v : {}; }
function dhNhomDoi(g){ var m = dhMoDs(), dang = dhNhomMo(g); m[g] = !dang; try{ localStorage.setItem('tb_mo', JSON.stringify(m)); }catch(e){} dhVe(); }
function dhNhomCua(k){ var co = DH_NHOM.filter(function(n){ return n.con && n.con.indexOf(k)>=0; }); if(!co.length) return '';
  return (co.find(function(n){ return n.g===DH_CUOI; }) || co[co.length>1 && k==='tra' ? 1 : 0]).g; }   /* Tra cứu KH: mặc định tô ở Số liệu, bấm từ Giao dịch xã thì tô ở đó */
function dhNhomMo(g){ var m = dhMoDs(); if(m[g]!==undefined) return !!m[g]; return dhNhomCua(dhDang())===g; }
function dhBam(g, k){ DH_CUOI = g || ''; var m = dhMuc(k); if(m) m.mo(); }
var DH_CC = [['hssv','🎓','HSSV','Hạn trả HSSV'], ['diaban','🗺','Địa bàn','Cây địa bàn — mã xã, điểm GD, ấp'], ['ctvay','📚','CT vay','Chương trình vay']];
function dhDay(){   /* 3.148: máy tính chỉ hiện thanh đáy khi cần nút của nó (khay chờ duyệt, mở lại khung xem) */
  var pv = document.getElementById('btn-mo-preview');
  document.body.classList.toggle('day-can', nganHienTai===6 || (!!(pv && pv.style.display!=='none') && [1,3,4,5].indexOf(nganHienTai)>=0));   /* nút Xem trước chỉ ở tab có khung xem */
}
function dhSL(t){ slDoiTab(t); if(nganHienTai!==7) doiNgan(7); }
function dhCC(id){ if(nganHienTai!==0) doiNgan(0); var c = ccTim(id); if(c && CC.mo===id && !c.hop) return; ccMo(id); }   /* công cụ mở ở cột Công cụ của Hôm nay (như cũ) */
function dhThieuNap(){
  if(typeof KHO==='undefined' || !KHO.soBang() || typeof slKyMoi!=='function') return 0;   /* js/23 nạp trước js/29 */
  var ky = slKyMoi(); if(!ky) return 0;
  return SL_BAT_BUOC.filter(function(k){ return !KHO.coBang(k, ky); }).length;   /* 3.341 K1: qua KHO */
}
function dhDang(){ return nganHienTai===7 ? (D.cauHinh && D.cauHinh.slTab) || 'nap' : String(nganHienTai); }
function dhGon(){ var v = null; try{ v = localStorage.getItem('tb_gon'); }catch(e){} return v==='1' || (v!=='0' && window.innerWidth < 1280); }
function dhDoiGon(){ var g = !dhGon(); try{ localStorage.setItem('tb_gon', g ? '1' : '0'); }catch(e){} dhVe(); }
function dhVe(){
  var n = document.getElementById('thanh-ben'); if(!n) return;
  var gon = dhGon(), dang = dhDang(), h = '';
  document.body.classList.toggle('tb-gon', gon);
  h += '<div class="tb-dau"><div class="tb-logo" onclick="doiNgan(0)" title="Hôm nay">TH</div><div class="tb-ten">Tủ hồ sơ <span class="tb-ban" onclick="moCaiDat(\'hd\')" title="Số bản · hướng dẫn">v'+APP_BAN+'</span><small>'+coChuHTML((document.getElementById('donvi')||{}).textContent||'')+'</small><small class="tb-tg" title="Tác giả">NhanNT</small></div>'+
    '<button class="tb-gon-nut" onclick="dhDoiGon()" title="'+(gon ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên')+'">'+(gon ? '»' : '«')+'</button></div><div class="tb-ds">';
  var dg = dhNhomCua(dang);
  var la = function(m, g){ var d = m.dem ? m.dem() : 0, bat = m.k===dang && (!g || g===dg);
    return '<a class="tb-muc'+(g ? ' tb-con-muc' : '')+(bat ? ' bat' : '')+'" data-m="'+m.k+'"'+(g ? ' data-g="'+g+'"' : '')+' onclick="dhBam(\''+(g||'')+'\',\''+m.k+'\')" title="'+coChuHTML(m.ten)+(d ? ' · '+d+' '+m.demTit : '')+'"><span class="bt">'+m.bt+'</span><span class="chu">'+coChuHTML(m.ten)+'</span>'+
      (d ? '<span class="so'+(m.do ? ' do' : '')+'">'+(m.do ? '⚠ ' : '')+d+'</span>' : '')+'</a>'; };
  DH_NHOM.forEach(function(n){
    if(n.k){ var m = dhMuc(n.k); if(m) h += la(m); return; }
    var mo = dhNhomMo(n.g), con = n.cc ? [] : n.con.map(dhMuc).filter(Boolean), tong = 0, doo = false;
    con.forEach(function(m){ var d = m.dem ? m.dem() : 0; if(d){ tong += d; if(m.do) doo = true; } });
    h += '<a class="tb-muc tb-cha'+(mo ? ' mo' : '')+(dg===n.g ? ' co-bat' : '')+'" data-g="'+n.g+'" onclick="dhNhomDoi(\''+n.g+'\')" title="'+coChuHTML(n.ten)+(mo ? ' — bấm để gập' : ' — bấm để mở')+'"><span class="bt">'+n.bt+'</span><span class="chu">'+coChuHTML(n.ten)+'</span>'+
      (tong && !mo ? '<span class="so'+(doo ? ' do' : '')+'">'+tong+'</span>' : '')+'<span class="mui">'+(mo ? '▾' : '▸')+'</span></a>';
    h += '<div class="tb-con'+(n.cc ? ' tb-cc' : '')+'" data-g="'+n.g+'"'+(mo ? '' : ' hidden')+'>'+(n.cc ? DH_CC.map(function(c){ return '<a class="tb-con-muc" onclick="dhCC(\''+c[0]+'\')" title="'+coChuHTML(c[3])+'"><span class="bt">'+c[1]+'</span><span class="chu">'+c[2]+'</span></a>'; }).join('') : con.map(function(m){ return la(m, n.g); }).join(''))+'</div>';
  });
  h += '</div>';
  var rac = (D.rac||[]).length;
  h += '<div id="tb-tt"></div><div class="tb-chan"><a onclick="moRac()" title="Thùng rác'+(rac ? ' · '+rac+' mục' : '')+'"><span class="bt">🗑</span>'+(rac ? '<span class="so">'+rac+'</span>' : '')+'</a>'+
    '<a class="tb-gd" onclick="dhDoiGD()" title="'+dhGDTen()+' — bấm đổi (Theo máy → Sáng → Tối)"><span class="bt">'+({light:'☀', dark:'☾'}[D.cauHinh.giaoDien] || '◐')+'</span></a>'+
    '<a onclick="moDonKho()" title="Dọn kho: thùng rác, lập chỉ mục, quét rác"><span class="bt">🧰</span></a><a onclick="moHuongDan()" title="Hướng dẫn"><span class="bt">❓</span></a><a onclick="moCaiDat()" title="Cài đặt"><span class="bt">⚙</span></a></div>';
  var giu = document.getElementById('tt-khoi'), giuSL = document.getElementById('so-lieu'), oCu = document.getElementById('tb-tt');
  if(oCu && giu && giu.parentNode===oCu) oCu.removeChild(giu);
  if(oCu && giuSL && giuSL.parentNode===oCu) oCu.removeChild(giuSL);
  n.innerHTML = h;
  if(typeof ttDung==='function') ttDung();
}
/* 3.159 (anh chốt): nút ☾ chế độ tối ở chân thanh bên — Theo máy → Sáng → Tối (cùng ô Giao diện trong Cài đặt; bản in / khung xem file luôn nền trắng) */
function dhGDTen(){ return 'Giao diện: '+({light:'Sáng', dark:'Tối'}[D.cauHinh.giaoDien] || 'Theo máy'); }
function dhDoiGD(){
  var ds = ['auto','light','dark'], v = ds[(ds.indexOf(D.cauHinh.giaoDien||'auto')+1) % 3];
  D.cauHinh.giaoDien = v; apGiaoDien(); luu(); dhVe(); bao(dhGDTen()+'.', 2);
}
function dhTo(){   /* tô mục đang mở + làm mới số đếm (rẻ: chỉ đếm mảng nhỏ / meta) */
  var d = dhDang(); if(DH_CUOI && (!dhNhomCua(d) || DH_NHOM.every(function(n){ return n.g!==DH_CUOI || !n.con || n.con.indexOf(d)<0; }))) DH_CUOI = '';   /* rời nhóm vừa bấm → bỏ dấu */
  dtVe();
  if(!document.getElementById('thanh-ben')) return;
  dhDay();
  dhVe();
}
/* 3.328 (anh chốt 23/10, demo D5): ĐIỆN THOẠI — thanh dưới 5 nút Hôm nay · GD xã · Số liệu · Hồ sơ · ☰ Thêm (màn < 1100 px, thay hàng tab ngang trên);
   ☰ Thêm = hộp liệt kê đủ mục còn lại theo nhóm (cùng sổ lối vào DH_MUC / DH_NHOM / DH_CC). Hàng tab cũ #hangngan vẫn trong trang (ẩn) — lối cũ không đổi. */
var DT_NUT = [['0', '🏠', 'Hôm nay', function(){ doiNgan(0); }], ['gd', '🏢', 'GD xã', function(){ dhBam('gd', 'gdx'); }],
  ['sl', '📊', 'Số liệu', function(){ var t = (D.cauHinh && D.cauHinh.slTab) || ''; dhBam('sl', ['th', 'sk', 'to', 'tra', 'kt', 'pb'].indexOf(t)>=0 ? t : 'th'); }],
  ['hs', '📁', 'Hồ sơ', function(){ var t = (D.cauHinh && D.cauHinh.slTab) || ''; dhBam('hs', t==='hst' ? 'hst' : 'hsv'); }], ['them', '☰', 'Thêm', function(){ dtThem(); }]];
function dtDang(){ var d = dhDang(); if(d==='0') return '0'; var g = dhNhomCua(d); return g==='gd' || g==='sl' || g==='hs' ? g : 'them'; }
function dtVe(){
  var o = document.getElementById('thanh-duoi'); if(!o){ o = document.createElement('nav'); o.id = 'thanh-duoi'; document.body.appendChild(o); document.body.classList.add('co-td'); }
  var dang = dtDang();
  o.innerHTML = DT_NUT.map(function(x, i){ return '<a class="'+(x[0]===dang ? 'bat' : '')+'" data-d="'+x[0]+'" onclick="DT_NUT['+i+'][3]()"><span class="bt">'+x[1]+'</span><span class="chu">'+x[2]+'</span></a>'; }).join('');
}
function dtThem(){
  var nhom = DH_NHOM.map(function(n){
    if(n.k){ var m = dhMuc(n.k); return m && n.k!=='0' ? '<div class="dt-them-nhom"><div><button class="nho dt-them-muc" onclick="dongHop();dhBam(\'\',\''+m.k+'\')">'+m.bt+' '+coChuHTML(m.ten)+'</button></div></div>' : ''; }
    var ds = n.cc ? DH_CC.map(function(c){ return '<button class="nho dt-them-muc" onclick="dongHop();dhCC(\''+c[0]+'\')">'+c[1]+' '+coChuHTML(c[2])+'</button>'; })
      : n.con.map(dhMuc).filter(Boolean).map(function(m){ return '<button class="nho dt-them-muc" onclick="dongHop();dhBam(\''+n.g+'\',\''+m.k+'\')">'+m.bt+' '+coChuHTML(m.ten)+'</button>'; });
    return '<div class="dt-them-nhom"><b>'+n.bt+' '+coChuHTML(n.ten)+'</b><div>'+ds.join('')+'</div></div>'; }).join('');
  moHop('<div class="hop-tit">☰ Mọi mục</div><div class="dt-them">'+nhom+'<div class="dt-them-nhom"><b>⚙ Khác</b><div><button class="nho dt-them-muc" onclick="dongHop();moRac()">🗑 Thùng rác</button><button class="nho dt-them-muc" onclick="dongHop();moDonKho()">🧰 Dọn kho</button>'+
    '<button class="nho dt-them-muc" onclick="dongHop();moHuongDan()">❓ Hướng dẫn</button><button class="nho dt-them-muc" onclick="dongHop();moCaiDat()">⚙ Cài đặt</button></div></div></div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>');
}
/* Alt+1…9: mở mục theo thứ tự trên thanh bên (bỏ qua tiêu đề nhóm) */
document.addEventListener('keydown', function(e){
  if(!e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || !document.body.classList.contains('co-tb')) return;
  var so = +e.key; if(!(so>=1 && so<=9)) return;
  var ds = DH_MUC.filter(function(m){ return !m.nhom; }); if(!ds[so-1]) return;
  e.preventDefault(); ds[so-1].mo();
});
window.addEventListener('resize', function(){ var v = null; try{ v = localStorage.getItem('tb_gon'); }catch(e){} if(v===null && document.body.classList.contains('tb-gon')!==dhGon()) dhVe(); });

/* ===== 3.148 (anh chốt ý 10): 1 NƠI TRẠNG THÁI — đèn màu + thanh chạy màu + 1 dòng chữ; không còn chữ / chip nổi đè lên nút =====
   - Máy tính có thanh bên: khối #tt-khoi ở chân thanh bên (dời cả chip Drive / bộ nhớ #so-lieu vào); điện thoại: trong thanh đáy.
   - bao() khi KHÔNG mở hộp thoại → ghi vào đây (khi mở hộp thoại vẫn nổi để thấy trên hộp). Bấm dòng chữ → 🔔 20 tin gần nhất.
   - Đèn: 🟢 ổn / Drive đã nối · 🟡 đang chạy · 🔴 lỗi gần đây / mất mạng · ⚪ chưa nối Drive. Thanh màu: % việc đang chạy. */
var TTB = {chu:'', luc:0, loi:0, pt:-1, chay:'', ds:[]};
function ttTin(t, loi){
  t = String(t||'').replace(/\s+/g, ' ').trim(); if(!t) return;
  TTB.chu = t; TTB.luc = Date.now(); if(loi) TTB.loi = Date.now();
  TTB.ds.unshift({t:t, luc:new Date(), loi:!!loi}); if(TTB.ds.length>20) TTB.ds.length = 20;
  ttVe(); clearTimeout(TTB.hen); TTB.hen = setTimeout(ttVe, loi ? 12000 : 8000);
}
function ttDen(){
  if(typeof DR!=='undefined' && DR.online===false) return 'do';
  if(TTB.chay || TTB.pt>=0) return 'vang';   /* đang chạy ưu tiên hơn lỗi cũ */
  if(TTB.loi && Date.now()-TTB.loi < 12000) return 'do';
  if(typeof DR!=='undefined' && DR.sanSang) return 'xanh';
  return 'xam';
}
function ttNghi(){   /* chữ lúc rảnh: trạng thái Drive + kỳ đang giữ sẵn (3.159: chip Drive đã có ngay dưới → dòng này không lặp lại Drive) */
  var d = document.getElementById('chip-drive') ? '' : typeof DR==='undefined' ? '' : DR.online===false ? 'Mất mạng · lưu tạm trong máy' : DR.sanSang ? 'Drive đã nối'+(DR.dongBoLuc ? ' · '+DR.dongBoLuc : '') : (typeof coTheNoiDrive==='function' && coTheNoiDrive()) ? 'Drive chưa nối — bấm đèn để nối' : 'Chưa cài Drive';
  var k = (typeof TO_KS!=='undefined') ? Object.keys(TO_KS).sort().reverse() : [];
  var sd = k.length && typeof slKyNgan==='function' ? '⚡ Số liệu sẵn dùng '+k.slice(0, 4).map(slKyNgan).join(', ') : '';
  return [d, sd].filter(Boolean).join(' · ') || 'Sẵn sàng';
}
function ttVe(){
  var o = TTB.o; if(!o) return;
  var moi = TTB.chu && (Date.now()-TTB.luc < (TTB.loi===TTB.luc ? 12000 : 8000));
  var chu = TTB.chay || (moi ? TTB.chu : ttNghi()), den = ttDen();
  o.querySelector('.tt-den').className = 'tt-den '+den;
  o.querySelector('.tt-den').title = {xanh:'Ổn — Drive đã nối', vang:'Đang chạy', do:'Lỗi / mất mạng — bấm xem', xam:'Chưa nối Drive'}[den];
  var c = o.querySelector('.tt-chu'); c.textContent = chu; c.title = chu+' — bấm xem 20 tin gần nhất';
  var th = o.querySelector('.tt-thanh'), pt = TTB.pt;
  th.classList.toggle('chay', pt>=0); th.classList.toggle('lap', pt===101);
  th.querySelector('i').style.width = (pt>=0 && pt<=100 ? Math.max(4, pt) : 100)+'%';
}
function ttDs(){
  moHop('<div class="hop-tit">🔔 Tin gần đây</div>'+(TTB.ds.length ? '<div class="tt-ds">'+TTB.ds.map(function(x){ return '<div class="'+(x.loi ? 'do' : '')+'"><small>'+hai(x.luc.getHours())+':'+hai(x.luc.getMinutes())+':'+hai(x.luc.getSeconds())+'</small> '+coChuHTML(x.t)+'</div>'; }).join('')+'</div>' : '<div class="rong">Chưa có tin nào trong lần mở app này.</div>')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>');
}
function ttDenBam(){ if(typeof bamChip==='function') bamChip(); }
/* dựng khối + dời vào đúng chỗ theo bề rộng màn (thanh bên ≥ 1100 px, không thì thanh đáy) */
function ttDung(){
  var o = TTB.o || document.getElementById('tt-khoi');
  if(!o){
    o = document.createElement('div'); o.id = 'tt-khoi';
    o.innerHTML = '<div class="tt-dong"><i class="tt-den xam" onclick="ttDenBam()"></i><span class="tt-chu" onclick="ttDs()"></span></div><div class="tt-thanh"><i></i></div>';
  }
  var ben = window.matchMedia && window.matchMedia('(min-width:1100px)').matches && document.body.classList.contains('co-tb');
  var noi = ben ? document.getElementById('tb-tt') : document.querySelector('.day');
  if(noi && o.parentNode!==noi){ if(ben) noi.insertBefore(o, noi.firstChild); else noi.insertBefore(o, noi.firstChild); }
  TTB.o = o; var sl = TTB.sl = TTB.sl || document.getElementById('so-lieu');   /* chip Drive / chưa lên / lỗi / bộ nhớ đi theo (giữ tham chiếu: lúc vẽ lại thanh bên nút tạm rời DOM) */
  if(sl){ var dich = ben ? document.getElementById('tb-tt') : document.querySelector('.day'); if(dich && sl.parentNode!==dich){ if(ben) dich.appendChild(sl); else dich.insertBefore(sl, o.nextSibling); } }
  ttVe();
}
window.addEventListener('resize', function(){ clearTimeout(TTB.rz); TTB.rz = setTimeout(ttDung, 150); });
/* khởi động (cuối file: mọi biến đã khai) */
document.body.classList.add('co-tb');
dhVe(); dtVe();
setTimeout(function(){ if(typeof slNap==='function' && typeof SL_SAN!=='undefined'){ if(SL_SAN) kyChungVe(); else slNap(); } }, 2500);   /* 3.149: ô Kỳ chung có ngay ở đầu trang */
