/* ---------- 6. VẼ GIAO DIỆN ---------- */
var nganHienTai = 0, tuKhoa = '', locNV = '', locGC = '', locNam = '', locCT = '', locThang = '';

function doiNgan(i, el){
  if(i===2){ i = 7; D.cauHinh.slTab = 'nap'; }   /* 3.144: bỏ tab Tháng (anh chốt Q5, Q12) — lối cũ sang tab 📥 Nạp & KT */
  if(!window.__giuCK) CHO_KHAI = false;
  if(BOT.tab){ BOT = {tab:'', chon:{}}; document.body.classList.remove('dang-bot'); }   /* 3.49: đổi tab là thôi chọn xóa */
  if(!window.__giuDK && typeof DK!=='undefined') DK.mo = false;   /* 3.50: đổi tab là rời Dọn kho */
  Array.prototype.forEach.call(document.querySelectorAll('.thanh-bot'), function(e){ e.remove(); });   /* 3.49b: bỏ thanh chọn còn sót ở tab cũ */
  THEM_TU = null;   /* 3.40: đổi tab là bỏ cờ "vừa bấm Thêm file ở tab…" (bấm Thêm rồi bỏ không chọn file) */
  nganHienTai = i;
  /* lớp ẩn cột phải ở tab Hôm nay do apAnPV() quyết định (còn phụ thuộc anh đã bật ▣ chưa) */
  for(var k=0;k<8;k++){
    var t = document.getElementById('tr'+k);
    if(t) t.classList.toggle('hien', k===i);
  }
  var b = document.getElementById('hangngan').children;
  /* 3.31: thứ tự nút tab (Hôm nay·Văn bản·Tháng·Biểu mẫu·Scan·Ghi chú) khác số tab — so theo lệnh của nút,
     trước đây mở Biểu mẫu lại tô sáng nút Ghi chú */
  for(var k=0;k<b.length;k++) b[k].classList.toggle('chon', (b[k].getAttribute('onclick')||'').indexOf('doiNgan('+i+',')===0);
  toNutSL();   /* 3.144 */
  var ph = ['Gõ số văn bản, từ khóa, tháng…','Gõ số văn bản, trích yếu, ghi chú…',
            'Tìm báo cáo…','Tìm trong ghi chú…','Tìm tên khách, ấp, tổ…',
            'Tìm biểu mẫu, chương trình…','Tìm file chờ duyệt…','Tìm văn bản, scan, biểu mẫu… ở các tab khác (tra khách hàng: tab con 👤 Tra cứu KH)'];
  document.getElementById('otim').placeholder = ph[i];
  var tct = (D.cauHinh.tabCD||{})[tenTab()];
  if(tct){
    if(tct.kieu && tenTab()==='vanBan') kieuXem = tct.kieu;   /* 3.39: kiểu xem chỉ tab Văn bản dùng */
    if(tct.sap) SAP.cot = tct.sap;
  }
  /* 3.31: tab Biểu mẫu mặc định sắp theo số lần dùng (như trước); 2 cột riêng của biểu mẫu không mang sang tab khác */
  if(!(tct && tct.sap)){
    if(i===5){ SAP.cot = 'dung'; SAP.xuoi = false; }
    else if(SAP.cot==='dung' || SAP.cot==='namvb'){ SAP.cot = 'ngay'; SAP.xuoi = false; }
  }
  THE_LOC = []; dongGoiY();
  xoaPreview();
  apAnPV();          /* 3.12: mỗi tab nhớ riêng bật/tắt khung xem nhanh */
  ve();
  window.scrollTo(0,0);
}

function xoaTim(){ document.getElementById('otim').value=''; tuKhoa=''; dongGoiY(); ve(); }

/* tìm kiếm: bỏ dấu, khớp khúc giữa, có chấm điểm */
function diem(m, q){
  if(!q) return 1;
  var d = 0;
  var so = boDau(m.soHieu||''), ti = boDau(m.trichYeu||m.moTa||''),
      to = boDau(m.tomTat||''), gh = boDau(m.ghiChu||''),
      te = boDau(m.tenMoi||''), ky = (m.ky||'')+' '+(m.ngay||'');
  if(so.indexOf(q)>=0) d += 100;
  if(ti.indexOf(q)>=0) d += 50;
  if(te.indexOf(q)>=0) d += 30;
  if(to.indexOf(q)>=0) d += 20;
  if(gh.indexOf(q)>=0) d += 20;
  if(ky.indexOf(q)>=0) d += 15;
  if(d<50){ var mr = moVietTat([m.tenVB||m.trichYeu||'', m.tomTat||''].join(' ')); if(mr && boDau(mr).indexOf(q)>=0) d += 45; }   /* 3.69 */
  var nhanTim = boDau((m.the||[]).concat(m.tag||[], m.mang?[m.mang]:[],
    (m.ctrinh||[]).map(function(c){ return c+' '+ctTenDay(c); })).join(' '));
  if(nhanTim.indexOf(q)>=0) d += 25;
  return d;
}
function loc(ds, q){
  if(!q) return ds.slice();
  return ds.map(function(m){ return {m:m, d:diem(m,q)}; })
           .filter(function(x){ return x.d>0; })
           .sort(function(a,b){ return b.d-a.d; })
           .map(function(x){ return x.m; });
}
function toSang(s, q){
  var h = coChuHTML(s||'');
  if(!q) return h;
  var b = boDau(h), i = b.indexOf(q);
  if(i<0) return h;
  return h.slice(0,i)+'<mark>'+h.slice(i,i+q.length)+'</mark>'+h.slice(i+q.length);
}

function khoTab(){
  return [D.vanBan, D.vanBan, D.duLieu, D.ghiChu, (D.scan||[]), (D.bieuMau||[]), D.cho, []][nganHienTai] || [];
}
/* 3.144 (anh chốt Q15): tab 📥 Nạp & KT tách khỏi Số liệu, đặt vào chỗ tab Tháng — nơi duy nhất nạp + kiểm tra dữ liệu.
   Bên trong vẫn dùng khung tab 7 (D.cauHinh.slTab = 'nap'); nút Số liệu mở tab con báo cáo gần nhất (slTabBC). */
function moNapSL(){ D.cauHinh.slTab = 'nap'; luu(); doiNgan(7); }
function moBCSL(){ if(!D.cauHinh.slTab || D.cauHinh.slTab==='nap') D.cauHinh.slTab = D.cauHinh.slTabBC || 'th'; luu(); doiNgan(7); }
function toNutSL(){
  var nap = nganHienTai===7 && (D.cauHinh.slTab||'nap')==='nap';
  Array.prototype.forEach.call(document.querySelectorAll('#hangngan [data-sl]'), function(b){
    b.classList.toggle('chon', nganHienTai===7 && (b.getAttribute('data-sl')==='nap')===nap); });
  if(typeof dhTo==='function') dhTo();   /* 3.147: tô mục thanh bên */
}
function tenTab(){
  return ['vanBan','vanBan','duLieu','ghiChu','scan','bieuMau','vanBan','duLieu'][nganHienTai];
}
function ve(){
  tuKhoa = boDau(document.getElementById('otim').value.trim());
  var th = document.getElementById('the-loc-hang');
  if(th) th.innerHTML = veTheLoc();
  setTimeout(ganVuot, 0);
  if(nganHienTai===0) veHomNay();
  if(nganHienTai===1) veVanBan();
  if(nganHienTai===2) veThang();
  if(nganHienTai===3) veGhiChu();
  if(nganHienTai===4) veScan();
  if(nganHienTai===5) veBieuMau();
  if(nganHienTai===6) veThem();
  if(nganHienTai===7) veSoLieu();   /* 3.85 */
  if(typeof capNhatDau==='function') capNhatDau();   /* 3.39: số mục trên đầu luôn khớp (trước chỉ cập nhật lúc mở app) */
  veDay();
}

/* ----- ngăn 0: HÔM NAY ----- */
/* ===== ÂM LỊCH — thuật toán Hồ Ngọc Đức, múi giờ +7 ===== */
var AL_TZ = 7;
function alInt(d){ return Math.floor(d); }
function jdTuNgay(dd, mm, yy){
  var a = alInt((14-mm)/12), y = yy+4800-a, m = mm+12*a-3;
  var jd = dd+alInt((153*m+2)/5)+365*y+alInt(y/4)-alInt(y/100)+alInt(y/400)-32045;
  if(jd < 2299161) jd = dd+alInt((153*m+2)/5)+365*y+alInt(y/4)-32083;
  return jd;
}
function alSocMoi(k){
  var T = k/1236.85, T2 = T*T, T3 = T2*T, dr = Math.PI/180;
  var Jd1 = 2415020.75933+29.53058868*k+0.0001178*T2-0.000000155*T3;
  Jd1 += 0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*dr);
  var M = 359.2242+29.10535608*k-0.0000333*T2-0.00000347*T3;
  var Mpr = 306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3;
  var F = 21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3;
  var C1 = (0.1734-0.000393*T)*Math.sin(M*dr)+0.0021*Math.sin(2*dr*M);
  C1 = C1-0.4068*Math.sin(Mpr*dr)+0.0161*Math.sin(dr*2*Mpr);
  C1 = C1-0.0004*Math.sin(dr*3*Mpr);
  C1 = C1+0.0104*Math.sin(dr*2*F)-0.0051*Math.sin(dr*(M+Mpr));
  C1 = C1-0.0074*Math.sin(dr*(M-Mpr))+0.0004*Math.sin(dr*(2*F+M));
  C1 = C1-0.0004*Math.sin(dr*(2*F-M))-0.0006*Math.sin(dr*(2*F+Mpr));
  C1 = C1+0.0010*Math.sin(dr*(2*F-Mpr))+0.0005*Math.sin(dr*(2*Mpr+M));
  var dt = T<-11 ? 0.001+0.000839*T+0.0002261*T2-0.00000845*T3-0.000000081*T*T3
                 : -0.000278+0.000265*T+0.000262*T2;
  return Jd1+C1-dt;
}
function alNgaySoc(k){ return alInt(alSocMoi(k)+0.5+AL_TZ/24); }
function alKinhDoMT(jdn){
  var T = (jdn-2451545.5-AL_TZ/24)/36525, T2 = T*T, dr = Math.PI/180;
  var M = 357.52910+35999.05030*T-0.0001559*T2-0.00000048*T*T2;
  var L0 = 280.46645+36000.76983*T+0.0003032*T2;
  var DL = (1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M);
  DL = DL+(0.019993-0.000101*T)*Math.sin(dr*2*M)+0.000290*Math.sin(dr*3*M);
  var L = (L0+DL)*dr;
  L = L-Math.PI*2*alInt(L/(Math.PI*2));
  return alInt(L/Math.PI*6);
}
function alThang11(yy){
  var off = jdTuNgay(31,12,yy)-2415021, k = alInt(off/29.530588853), nm = alNgaySoc(k);
  if(alKinhDoMT(nm) >= 9) nm = alNgaySoc(k-1);
  return nm;
}
function alLechNhuan(a11){
  var k = alInt((a11-2415021.076998695)/29.530588853+0.5), last = 0, i = 1;
  var arc = alKinhDoMT(alNgaySoc(k+i));
  do { last = arc; i++; arc = alKinhDoMT(alNgaySoc(k+i)); } while(arc!=last && i<14);
  return i-1;
}
/* trả {ngay, thang, nam, nhuan} */
function amLich(dd, mm, yy){
  var dayNumber = jdTuNgay(dd,mm,yy), k = alInt((dayNumber-2415021.076998695)/29.530588853);
  var monthStart = alNgaySoc(k+1);
  if(monthStart > dayNumber) monthStart = alNgaySoc(k);
  var a11 = alThang11(yy), b11 = a11, lunarYear;
  if(a11 >= monthStart){ lunarYear = yy; a11 = alThang11(yy-1); }
  else { lunarYear = yy+1; b11 = alThang11(yy+1); }
  var lunarDay = dayNumber-monthStart+1, diff = alInt((monthStart-a11)/29);
  var lunarLeap = 0, lunarMonth = diff+11;
  if(b11-a11 > 365){
    var leapMonthDiff = alLechNhuan(a11);
    if(diff >= leapMonthDiff){ lunarMonth = diff+10; if(diff==leapMonthDiff) lunarLeap = 1; }
  }
  if(lunarMonth > 12) lunarMonth = lunarMonth-12;
  if(lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return {ngay:lunarDay, thang:lunarMonth, nam:lunarYear, nhuan:lunarLeap};
}

/* ==========================================================
   LỊCH (tab Hôm nay) — bản 3.9, theo tab Lịch của CBTD AI
   Dữ liệu D.lich = {viec:[…], daXoa:[{id,luc}]}; đồng bộ _Hệ thống/lich.json
   viec: {id, ten, ngay 'YYYY-MM-DD', lap 'mot|tuan|thang|nam', luuY, xong (việc 1 lần),
          xongNgay {iso:true} (việc lặp), bo [iso] (ngày bỏ của việc lặp), taoLuc, suaLuc}
   ========================================================== */
var LICH = {nam:0, thang:0, chon:'', viecChon:''};
var LC_THU = ['Chủ nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
var LC_LAP = {mot:'Một lần', tuan:'Hằng tuần', thang:'Hằng tháng', nam:'Hằng năm'};
function lcISO(d){ return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); }
function lcNgay(iso){ var p = iso.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
function lcDM(iso){ var p = iso.split('-'); return p[2]+'/'+p[1]; }
function lcDMY(iso){ var p = iso.split('-'); return p[2]+'/'+p[1]+'/'+p[0]; }
function lcCong(iso, n){ var d = lcNgay(iso); d.setDate(d.getDate()+n); return lcISO(d); }
function lcTuan(iso){   /* số tuần ISO: tuần bắt đầu Thứ Hai */
  var d = lcNgay(iso), t = (d.getDay()+6)%7;
  d.setDate(d.getDate()-t+3);
  var dau = new Date(d.getFullYear(),0,4);
  return 1+Math.round(((d-dau)/864e5-3+((dau.getDay()+6)%7))/7);
}
/* ==========================================================
   NGÀY CHAY · MÙNG 1 · RẰM · LỄ ÂM (3.12)
   Theo đạo Cao Đài (Cao Đài Tự Điển, Tòa Thánh Tây Ninh):
     Lục trai  (6 ngày): 1, 8, 14, 15, 23, 30 — tháng thiếu ăn 29 thay 30
     Thập trai (10 ngày): 1, 8, 14, 15, 18, 23, 24, 28, 29, 30 — tháng thiếu ăn 27 thay 30
   (Phật giáo tính khác: lục trai 8,14,15,23,29,30 — app dùng bản Cao Đài)
   ========================================================== */
var LE_AM = {'1-1':'Tết Nguyên đán','2-1':'Mùng 2 Tết','3-1':'Mùng 3 Tết','15-1':'Rằm tháng Giêng',
  '10-3':'Giỗ Tổ Hùng Vương','15-4':'Lễ Phật đản','5-5':'Tết Đoan ngọ','15-7':'Lễ Vu lan',
  '15-8':'Tết Trung thu','9-9':'Tết Trùng cửu','23-12':'Đưa Ông Táo','30-12':'Giao thừa'};   /* 3.31: 29 tháng Chạp chỉ là giao thừa khi tháng thiếu — xem leAmNgay() */
/* tên lễ âm của một ngày; 29 tháng Chạp là Giao thừa khi tháng Chạp năm đó thiếu (chỉ 29 ngày) */
function leAmNgay(iso, a){
  a = a || lcAm(iso);
  var le = LE_AM[a.ngay+'-'+a.thang];
  if(!le && a.ngay===29 && a.thang===12 && !a.nhuan && lcSoNgayThangAm(iso)===29) le = 'Giao thừa';
  return le || '';
}
/* tháng âm của ngày này có 29 hay 30 ngày */
function lcSoNgayThangAm(iso){
  var a = lcAm(iso), d = lcNgay(iso);
  d.setDate(d.getDate() + (30 - a.ngay));        /* thử tới ngày 30 âm */
  return lcAm(lcISO(d)).ngay===30 ? 30 : 29;
}
function dsNgayChay(iso){
  var che = D.cauHinh.cheChay || 'thap';
  if(che==='khong') return [];
  if(che==='socvong') return [1,15];
  var thieu = lcSoNgayThangAm(iso)===29;
  if(che==='luc') return [1,8,14,15,23, thieu?29:30];
  return [1,8,14,15,18,23,24,28,29, thieu?27:30];
}
function laNgayChay(iso){
  var a = lcAm(iso);
  return dsNgayChay(iso).indexOf(a.ngay)>=0;
}
function tenCheChay(){
  return {thap:'thập trai', luc:'lục trai', socvong:'mùng 1 & rằm'}[D.cauHinh.cheChay||'thap'] || '';
}
/* chữ ghi thêm cho một ngày: sóc/vọng · ngày chay · lễ âm */
function nhanNgayAm(iso){
  var a = lcAm(iso), t = [];
  if(a.ngay===1) t.push('mùng 1 (sóc)');
  else if(a.ngay===15) t.push('rằm (vọng)');
  if(laNgayChay(iso)) t.push('ngày chay');
  var le = leAmNgay(iso, a);
  if(le && !a.nhuan) t.push(le);
  return t;
}
function lcAm(iso){ var p = iso.split('-').map(Number); return amLich(p[2], p[1], p[0]); }
function lcAmChu(iso){ var a = lcAm(iso); return a.ngay+'/'+a.thang+(a.nhuan?' nhuận':''); }
function lcData(){ D.lich = D.lich || {viec:[], daXoa:[]}; D.lich.viec = D.lich.viec||[]; D.lich.daXoa = D.lich.daXoa||[]; return D.lich; }
/* việc v có rơi vào ngày iso không */
function lcCo(v, iso){
  if((v.bo||[]).indexOf(iso)>=0) return false;
  if(v.lap==='mot' || !v.lap) return v.ngay===iso;
  if(iso < v.ngay) return false;
  var a = lcNgay(v.ngay), b = lcNgay(iso);
  if(v.lap==='tuan') return a.getDay()===b.getDay();
  if(v.lap==='thang') return a.getDate()===b.getDate();
  if(v.lap==='nam') return a.getDate()===b.getDate() && a.getMonth()===b.getMonth();
  return false;
}
function lcXongNgay(v, iso){ return (v.lap==='mot'||!v.lap) ? !!v.xong : !!(v.xongNgay||{})[iso]; }
function lcViecNgay(iso){
  return lcData().viec.filter(function(v){ return lcCo(v, iso); })
    .sort(function(a,b){ return (b.luuY?1:0)-(a.luuY?1:0) || (a.taoLuc||'').localeCompare(b.taoLuc||''); });
}
function lcDoiLich(){ luu(); henDongBoLich(); veLich(); }
function lcDau(){
  if(LICH.chon) return;
  var h = nay(); LICH.nam = h.getFullYear(); LICH.thang = h.getMonth(); LICH.chon = lcISO(h);
}

/* ---------- vẽ ---------- */
function veLich(){
  var e = document.getElementById('lich'); if(!e) return;
  lcDau();
  var homNay = lcISO(nay()), dau = new Date(LICH.nam, LICH.thang, 1);
  var bd = new Date(dau); bd.setDate(1-((dau.getDay()+6)%7));
  var h = '<div class="lc-dau">'+
    '<button class="lc-mui" onclick="lcThang(-1)" title="Tháng trước">‹</button>'+
    '<b class="lc-ten">Tháng '+(LICH.thang+1)+', '+LICH.nam+'</b>'+
    '<button class="lc-mui" onclick="lcThang(1)" title="Tháng sau">›</button>'+
    '<span class="lc-gian"></span>'+
    (function(){ var d = nay(), dangHN = (!LICH.chon || LICH.chon===homNay) && LICH.nam===d.getFullYear() && LICH.thang===d.getMonth();   /* 3.68 (AG) */
      return '<button class="lc-nut'+(dangHN?'':' hn-noi')+'" onclick="lcHomNay()"'+(dangHN?' disabled title="Đang xem hôm nay"':' title="Quay về hôm nay"')+'>Hôm nay</button>'; })()+
    '<button class="lc-nut" onclick="lcDanhSach()">Danh sách</button>'+
    '<button class="lc-nut chinh" onclick="lcTinhNgay()">Tính ngày</button></div>';
  h += '<div class="lc-ben"><div class="lc-luoi"><div class="lc-th tuan">Tuần</div>'+
    ['T2','T3','T4','T5','T6','T7','CN'].map(function(t,i){ return '<div class="lc-th'+(i>4?' cuoi':'')+'">'+t+'</div>'; }).join('');
  for(var w=0; w<6; w++){
    var isoDau = lcCong(lcISO(bd), w*7);
    h += '<div class="lc-tuan">'+lcTuan(isoDau)+'</div>';
    for(var i=0;i<7;i++){
      var iso = lcCong(isoDau, i), d = lcNgay(iso), am = lcAm(iso);
      var vs = lcViecNgay(iso), cham = vs.length ? (vs.some(function(v){ return v.luuY; })?'cam':'xanh') : '';
      var chay = laNgayChay(iso), leAm = leAmNgay(iso, am) && !am.nhuan;
      if(!cham && ntData().note.some(function(x){ return x.ngay===iso && (x.nd||'').trim(); })) cham = 'nau';
      var lop = 'lc-o'+(d.getMonth()!==LICH.thang?' ngoai':'')+(i>4?' cuoi':'')+
        (iso===homNay?' hom':'')+(iso===LICH.chon?' chon':'');
      h += '<button class="'+lop+(chay?' chay':'')+(leAm?' le':'')+'" data-iso="'+iso+'" onclick="lcChonNgay(\''+iso+'\')" title="'+
        coChuHTML(LC_THU[d.getDay()]+' '+lcDMY(iso)+' · âm '+lcAmChu(iso)+
          (nhanNgayAm(iso).length?' · '+nhanNgayAm(iso).join(' · '):''))+'">'+
        '<span class="dl">'+d.getDate()+'</span>'+
        '<span class="al">'+(am.ngay===1 ? am.ngay+'/'+am.thang : am.ngay)+'</span>'+
        (cham?'<i class="lc-cham '+cham+'"></i>':'')+'</button>';
    }
  }
  h += '</div>'+ccCotHTML()+'</div>';   /* 3.62 (việc W): lịch 70% + cột 🧰 Công cụ bên phải */
  h += '<div class="lc-sap"><span class="lc-nhan-sap">Sắp tới</span>'+lcSapToi()+'</div>';
  e.innerHTML = h;
  veNhatKy();
}
/* ==========================================================
   3.62 — VIỆC W: CỘT 🧰 CÔNG CỤ cạnh lịch (anh chốt 02/10/2026)
   Mỗi công cụ là một mục đăng ký {id, ico, ten, tit, ve} → thêm công cụ sau này không phải sửa bố cục.
   Máy tính: ô công cụ mở ngay dưới lịch (#cc-o); điện thoại: mở thành hộp.
   ========================================================== */
var CC = {mo:'', hop:'', hs:null, db:{tim:''}};
var CONG_CU = [
  {id:'hssv',   ico:'🎓', ten:'Hạn trả HSSV', tit:'Hạn trả HSSV', ve:function(){ return ccHSSVHTML(); },
    dau:function(){ return hsChonLoaiHTML(); },
    nut:'<button class="nho chinh" onclick="hsChep()" title="Chép câu chốt để dán vào hồ sơ">📋 Chép</button><button class="nho" onclick="hsGhiTodo()" title="Ghi câu chốt vào to-do hôm nay">📝</button><button class="nho" onclick="hsNoi()" title="Cửa sổ nổi luôn nằm trên trình duyệt / chương trình khác (Chrome, Edge)">📌 Nổi</button>'},
  {id:'diaban', ico:'🗺', ten:'Địa bàn',      tit:'Cây địa bàn — mã xã, điểm GD, ấp/KP', ve:function(){ return ccDiaBanHTML(); }},
  {id:'ctvay',  ico:'📋', ten:'CT vay', tit:'Chương trình vay — tóm tắt đang cho vay · danh mục mã', ve:function(){ return ccCTVHTML(); },
    dau:function(){ return ctvChonHTML(); }},
  {id:'giaoban', an:true, ico:'📊', ten:'Giao ban', hop:true, tit:'Số liệu giao ban — Theo dõi nợ, so với kỳ trước', ve:function(){ return ccGBHTML(); },
    nut:'<button class="nho chinh" onclick="gbIn()" title="In / lưu PDF bảng số liệu">🖨 In</button><button class="nho" onclick="gbChep()" title="Chép nhận định để dán vào báo cáo / Zalo">📋 Chép nhận định</button>'},
  {id:'buoigd', an:true, ico:'📅', ten:'Buổi GD', hop:true, tit:'Chuẩn bị buổi giao dịch xã', ve:function(){ return ccBGDHTML(); },
    dau:function(){ return bgdChonHTML(); },
    nut:'<button class="nho chinh" onclick="bgdIn()">🖨 In</button><button class="nho" onclick="bgdChep()" title="Chép danh sách gửi tổ trưởng qua Zalo">📋 Chép</button>'},
  {id:'cc6',    ico:'🧰', ten:'Công cụ 6'}
];
/* ==========================================================
   3.83 — 📊 SỐ LIỆU GIAO BAN (từ Theo dõi nợ): mỗi danh sách (3 tháng KHD · quá hạn · khoanh) kỳ mới nhất SO VỚI kỳ trước
   theo xã › điểm GD; tổ tăng / giảm nhiều nhất; món mới vào / đã ra khỏi danh sách; nhận định gợi ý (chỉ từ số liệu, anh sửa câu chữ)
   ========================================================== */
function gbKyTruoc(L){
  var moi = tdnKyMoi(L), co = {};
  Object.keys(NO.mon||{}).forEach(function(k){ tdnCacKy(NO.mon[k], L).forEach(function(x){ co[x] = 1; }); });
  var ds = Object.keys(co).filter(function(x){ return x < moi; }).sort();
  return ds.length ? ds[ds.length-1] : '';
}
function gbTinh(L){
  var k1 = tdnKyMoi(L), k0 = gbKyTruoc(L), xa = {}, to = {}, vao = [], ra = [], T = {n1:0, t1:0, n0:0, t0:0};
  if(!k1) return null;
  var cong = function(o, s1, s0){ if(s1){ o.n1++; o.t1 += tdnSoChinh(L, s1); } if(s0){ o.n0++; o.t0 += tdnSoChinh(L, s0); } };
  Object.keys(NO.mon||{}).forEach(function(k){
    var m = NO.mon[k], s1 = tdnSL(m, L, k1), s0 = k0 ? tdnSL(m, L, k0) : null; if(!s1 && !s0) return;
    var db = tdnDB(m);
    var X = xa[db.xa] = xa[db.xa] || {ten:db.xa, n1:0, t1:0, n0:0, t0:0, dm:{}}, Dm = X.dm[db.diem] = X.dm[db.diem] || {ten:db.diem, n1:0, t1:0, n0:0, t0:0};
    var kt = (m.maTo||m.toTen||'?'), Tt = to[kt] = to[kt] || {ten:(m.toTen ? 'Tổ '+m.toTen : 'Tổ '+(m.maTo||'?')), noi:db.xa+' › '+db.diem, n1:0, t1:0, n0:0, t0:0};
    [X, Dm, Tt, T].forEach(function(o){ cong(o, s1, s0); });
    if(k0 && s1 && !s0) vao.push(m); if(k0 && s0 && !s1) ra.push(m);
  });
  var so = function(a, b){ return a.localeCompare(b, 'vi'); };
  var dsXa = Object.keys(xa).sort(so).map(function(k){ var X = xa[k]; X.diem = Object.keys(X.dm).sort(so).map(function(d){ return X.dm[d]; }); return X; });
  var dsTo = Object.keys(to).map(function(k){ return to[k]; });
  return {L:L, k1:k1, k0:k0, T:T, xa:dsXa,
    toTang:dsTo.filter(function(t){ return t.t1 > t.t0; }).sort(function(a, b){ return (b.t1-b.t0)-(a.t1-a.t0); }).slice(0, 5),
    toGiam:dsTo.filter(function(t){ return t.t1 < t.t0; }).sort(function(a, b){ return (a.t1-a.t0)-(b.t1-b.t0); }).slice(0, 3),
    vao:vao, ra:ra};
}
function gbLech(a, b, tien){ var d = a-b; if(!d) return '<span class="gb-0">=</span>'; return '<span class="'+(d>0?'gb-tang':'gb-giam')+'">'+(d>0?'+':'−')+(tien ? tdnTr(Math.abs(d)) : Math.abs(d))+'</span>'; }
function gbNhanDinh(R){
  if(!R) return '';
  var T = R.T, ten = TDN_LOAI[R.L].ten, c = [];
  c.push(ten+' kỳ '+tdnKyVN(R.k1)+': '+T.n1+' món, '+tdnTr(T.t1)+' đồng'+
    (R.k0 ? '; so với kỳ '+tdnKyVN(R.k0)+' '+(T.t1===T.t0 ? 'không đổi' : (T.t1>T.t0?'tăng ':'giảm ')+tdnTr(Math.abs(T.t1-T.t0))+(T.t0 ? ' ('+Math.round(Math.abs(T.t1-T.t0)/T.t0*100)+'%)' : ''))+
      (T.n1!==T.n0 ? ', '+(T.n1>T.n0?'tăng ':'giảm ')+Math.abs(T.n1-T.n0)+' món' : '') : ' (chưa có kỳ trước để so)')+'.');
  if(R.k0){
    var xt = R.xa.slice().sort(function(a, b){ return (b.t1-b.t0)-(a.t1-a.t0); })[0];
    if(xt && xt.t1 > xt.t0) c.push('Tăng nhiều nhất: '+xt.ten+' (+'+tdnTr(xt.t1-xt.t0)+').');
    if(R.toTang.length) c.push('Tổ tăng: '+R.toTang.slice(0, 3).map(function(t){ return t.ten+' ('+t.noi.split(' › ')[0]+', +'+tdnTr(t.t1-t.t0)+')'; }).join('; ')+'.');
    if(R.vao.length) c.push(R.vao.length+' món mới vào danh sách.');
    if(R.ra.length) c.push(R.ra.length+' món đã ra khỏi danh sách (đã thu / hết điều kiện).');
  }
  return c.join(' ');
}
function gbBangHTML(R){
  var dong = function(o, lop){ return '<tr class="'+lop+'"><td>'+coChuHTML(o.ten)+'</td><td class="s">'+o.n1+'</td><td class="s">'+tdnTien(o.t1)+'</td>'+
    (R.k0 ? '<td class="s">'+o.n0+'</td><td class="s">'+tdnTien(o.t0)+'</td><td class="s">'+gbLech(o.n1, o.n0)+'</td><td class="s">'+gbLech(o.t1, o.t0, true)+'</td>' : '')+'</tr>'; };
  return '<table class="gb-bang"><thead><tr><th>Xã, phường / Điểm GD</th><th>Món</th><th>'+TDN_TIEN[R.L]+' '+tdnKyVN(R.k1)+'</th>'+
      (R.k0 ? '<th>Món</th><th>Kỳ '+tdnKyVN(R.k0)+'</th><th>± Món</th><th>± Số tiền</th>' : '')+'</tr></thead><tbody>'+
    R.xa.map(function(X){ return dong(X, 'x')+X.diem.map(function(d){ return dong(d, 'd'); }).join(''); }).join('')+
    dong({ten:'Cộng toàn PGD', n1:R.T.n1, t1:R.T.t1, n0:R.T.n0, t0:R.T.t0}, 'tong')+'</tbody></table>';
}
function gbTatCa(){ return ['nqh','khd','nk'].map(gbTinh).filter(Boolean); }
function ccGBHTML(){
  if(typeof NO_SAN!=='undefined' && !NO_SAN) return '<div class="huong-dan">Đang nạp dữ liệu Theo dõi nợ…</div>';
  var RR = gbTatCa();
  if(!RR.length) return '<div class="huong-dan">Chưa có dữ liệu Theo dõi nợ. Vào <b>Thư viện › ⚠ Theo dõi nợ</b> nạp sao kê tháng (3 tháng KHD · quá hạn · khoanh) — nạp 2 kỳ liên tiếp là có số so sánh.</div>';
  return RR.map(function(R){
    return '<div class="gb-khoi"><div class="nhan-nhom">'+TDN_LOAI[R.L].ico+' '+TDN_LOAI[R.L].ten+' · kỳ '+tdnKyVN(R.k1)+(R.k0 ? ' so với '+tdnKyVN(R.k0) : '')+'</div>'+
      '<div class="gb-nd">💡 <i>Nhận định gợi ý (tính từ số liệu, anh sửa câu chữ):</i> '+coChuHTML(gbNhanDinh(R))+'</div>'+
      gbBangHTML(R)+
      (R.toTang.length ? '<div class="gb-to"><b>Tổ tăng nhiều nhất:</b> '+R.toTang.map(function(t){ return coChuHTML(t.ten)+' <small>('+coChuHTML(t.noi)+')</small> '+gbLech(t.t1, t.t0, true); }).join(' · ')+'</div>' : '')+
      (R.toGiam.length ? '<div class="gb-to"><b>Tổ giảm nhiều nhất:</b> '+R.toGiam.map(function(t){ return coChuHTML(t.ten)+' '+gbLech(t.t1, t.t0, true); }).join(' · ')+'</div>' : '')+
      (R.vao.length ? '<div class="gb-to"><b>Mới vào ('+R.vao.length+'):</b> '+R.vao.slice(0, 12).map(function(m){ return '<a class="lk" onclick="moHoSoHo(\''+m.maKH+'\')">'+coChuHTML(m.ten)+'</a>'; }).join(', ')+(R.vao.length>12?' …':'')+'</div>' : '')+
      (R.ra.length ? '<div class="gb-to"><b>Đã ra khỏi DS ('+R.ra.length+'):</b> '+R.ra.slice(0, 12).map(function(m){ return coChuHTML(m.ten); }).join(', ')+(R.ra.length>12?' …':'')+'</div>' : '')+
      '</div>';
  }).join('');
}
function gbChep(){
  var t = gbTatCa().map(gbNhanDinh).join('\n');
  if(!t) return bao('Chưa có số liệu Theo dõi nợ.', 3);
  chepHoacHien(t, 'Đã chép nhận định số liệu giao ban.', 'Nhận định số liệu giao ban');
}
function gbIn(){
  var RR = gbTatCa(); if(!RR.length) return bao('Chưa có số liệu Theo dõi nợ.', 3);
  var h = '<!doctype html><html><head><meta charset="utf-8"><title>So lieu giao ban</title><style>'+TDN_IN_CSS+'.gb-tang{color:#b00}.gb-giam{color:#070}.nd{margin:4px 0 8px;font-style:italic}h2{font-size:12pt;margin:12px 0 4px}</style></head><body>'+
    '<h1>SỐ LIỆU GIAO BAN — THEO DÕI NỢ</h1><div class="phu">'+coChuHTML(D.cauHinh.donvi||'')+' · lập ngày '+ngayVN(ngayISO(nay()))+'</div>'+
    RR.map(function(R){ return '<h2>'+TDN_LOAI[R.L].ten+' · kỳ '+tdnKyVN(R.k1)+(R.k0?' so với '+tdnKyVN(R.k0):'')+'</h2><div class="nd">'+coChuHTML(gbNhanDinh(R))+'</div>'+gbBangHTML(R).replace(/<span class="gb-0">=<\/span>/g,'='); }).join('')+'</body></html>';
  inBlob(new Blob([h], {type:'text/html'}), 'So lieu giao ban.html');
}

/* ==========================================================
   3.83 — 📅 CHUẨN BỊ BUỔI GIAO DỊCH XÃ: chọn điểm GD (mặc định điểm có ngày GD gần nhất)
   → món đang theo dõi ở điểm đó (theo ấp, tổ) · cam kết đến hạn trước / đúng buổi · hồ sơ scan còn thiếu ở điểm · In / Chép gửi tổ trưởng
   ========================================================== */
var BGD = {k:''};
function bgdDsDiem(){
  var hn = nay(), ds = [];
  (D.cauHinh.diaBan||[]).forEach(function(x){ (x.diem||[]).forEach(function(d){
    var n = parseInt(d.ngay, 10), ng = '';
    if(n >= 1 && n <= 31){
      var t = new Date(hn.getFullYear(), hn.getMonth(), n);
      if(t < new Date(hn.getFullYear(), hn.getMonth(), hn.getDate())) t = new Date(hn.getFullYear(), hn.getMonth()+1, n);
      ng = ngayISO(t);
    }
    ds.push({k:x.xa+'\u0001'+d.ten, xa:x.xa, diem:d.ten, ngay:ng});
  }); });
  return ds.sort(function(a, b){ return (a.ngay||'9999').localeCompare(b.ngay||'9999') || a.diem.localeCompare(b.diem, 'vi'); });
}
function bgdChon(){ var ds = bgdDsDiem(); return ds.find(function(x){ return x.k===BGD.k; }) || ds[0] || null; }
function bgdChonHTML(){
  var ds = bgdDsDiem(), c = bgdChon(); if(!ds.length) return '';
  return '<select class="cc-chon" onchange="BGD.k=this.value;ccVeLai(\'buoigd\')">'+ds.map(function(x){
    return '<option value="'+coChuHTML(x.k)+'"'+(c && c.k===x.k?' selected':'')+'>'+coChuHTML(x.diem)+(x.ngay?' · '+ngayVN(x.ngay):'')+'</option>'; }).join('')+'</select>';
}
function bgdTinh(){
  var c = bgdChon(); if(!c) return null;
  var mon = [], ck = [], hs = [], han = c.ngay || ngayISO(nay());
  Object.keys(NO.mon||{}).forEach(function(k){
    var m = NO.mon[k], db = tdnDB(m); if(db.xa!==c.xa || db.diem!==c.diem) return;
    var L = ['nqh','khd','nk'].filter(function(x){ return tdnDangCo(m, x); })[0]; if(!L) return;
    var l = tdnLanCua(m.kuoc, L)[0];
    mon.push({m:m, L:L, ap:db.ap, to:m.toTen||m.maTo||'', tien:tdnSoChinh(L, tdnSL(m, L)), tt:tdnTrangThai(m.kuoc, L), l:l});
    if(l && l.camKetHan && !l.ketQua && l.camKetHan <= han) ck.push({m:m, l:l});
  });
  (D.scan||[]).forEach(function(k){ if(k.xa===c.xa && k.diem===c.diem && !ttScan(k).dat) hs.push(k); });
  var so = function(a, b){ return a.localeCompare(b, 'vi'); };
  mon.sort(function(a, b){ return so(a.ap||'', b.ap||'') || so(a.to||'', b.to||'') || so(a.m.ten||'', b.m.ten||''); });
  return {c:c, mon:mon, ck:ck, hs:hs};
}
function ccBGDHTML(){
  if(!(D.cauHinh.diaBan||[]).length) return '<div class="huong-dan">Chưa có danh mục địa bàn (Cài đặt › Địa bàn).</div>';
  var R = bgdTinh(); if(!R) return '';
  var h = '<div class="hop-phu">'+coChuHTML(R.c.xa)+' › <b>'+coChuHTML(R.c.diem)+'</b>'+(R.c.ngay ? ' · buổi giao dịch <b>'+ngayVN(R.c.ngay)+'</b>' : ' · chưa khai ngày giao dịch')+'</div>';
  h += '<div class="nhan-nhom">⏰ Cam kết đến hạn trước / đúng buổi ('+R.ck.length+')</div>'+(R.ck.length ? R.ck.map(function(x){
    return '<div class="bgd-dong"><a class="lk" onclick="moHoSoHo(\''+x.m.maKH+'\')">'+coChuHTML(x.m.ten)+'</a> · '+coChuHTML(x.l.camKet||'')+(x.l.camKetTien?' · '+tdnTien(x.l.camKetTien)+' đ':'')+' · hạn '+ngayVN(x.l.camKetHan)+'</div>'; }).join('') : '<div class="huong-dan">Không có.</div>');
  h += '<div class="nhan-nhom">⚠ Món đang theo dõi ở điểm ('+R.mon.length+')</div>'+(R.mon.length ? '<table class="gb-bang"><thead><tr><th>Ấp · Tổ</th><th>Khách hàng</th><th>DS</th><th>Số tiền</th><th>Trạng thái</th></tr></thead><tbody>'+R.mon.map(function(x){
    return '<tr><td>'+coChuHTML(x.ap)+' · '+coChuHTML(x.to)+'</td><td><a class="lk" onclick="moHoSoHo(\''+x.m.maKH+'\')">'+coChuHTML(x.m.ten)+'</a></td><td>'+TDN_LOAI[x.L].ico+' '+coChuHTML(TDN_LOAI[x.L].ten)+'</td><td class="s">'+tdnTien(x.tien)+'</td><td>'+coChuHTML(x.tt)+'</td></tr>'; }).join('')+'</tbody></table>' : '<div class="huong-dan">Không có món nào trong 3 danh sách ở điểm này.</div>');
  h += '<div class="nhan-nhom">📑 Hồ sơ scan còn thiếu ở điểm ('+R.hs.length+')</div>'+(R.hs.length ? R.hs.map(function(k){
    return '<div class="bgd-dong"><a class="lk" onclick="xemScanCP(\''+k.id+'\')">'+coChuHTML(k.ten||'(bản quét)')+'</a> · '+coChuHTML(ttScan(k).thieu.join(' · '))+'</div>'; }).join('') : '<div class="huong-dan">Không có.</div>');
  return h;
}
function bgdChuTho(){
  var R = bgdTinh(); if(!R) return '';
  var d = ['BUỔI GIAO DỊCH '+R.c.diem.toUpperCase()+(R.c.ngay?' — '+ngayVN(R.c.ngay):'')];
  if(R.ck.length){ d.push('', 'Cam kết đến hạn:'); R.ck.forEach(function(x, i){ d.push((i+1)+'. '+x.m.ten+' — '+(x.l.camKet||'')+(x.l.camKetTien?' '+tdnTien(x.l.camKetTien)+' đ':'')+' (hạn '+ngayVN(x.l.camKetHan)+')'); }); }
  if(R.mon.length){ d.push('', 'Món cần đôn đốc:'); R.mon.forEach(function(x, i){ d.push((i+1)+'. '+x.m.ten+' — '+x.ap+', tổ '+x.to+' — '+TDN_LOAI[x.L].ten+' '+tdnTien(x.tien)+' đ'); }); }
  if(R.hs.length){ d.push('', 'Hồ sơ cần bổ sung:'); R.hs.forEach(function(k, i){ d.push((i+1)+'. '+(k.ten||'')+' — '+ttScan(k).thieu.join(', ')); }); }
  return d.join('\n');
}
function bgdChep(){ var t = bgdChuTho(); if(!t) return; chepHoacHien(t, 'Đã chép danh sách buổi giao dịch — dán vào Zalo gửi tổ trưởng.', 'Danh sách buổi giao dịch'); }
function bgdIn(){
  var t = ccBGDHTML(); if(!t) return;
  inBlob(new Blob(['<!doctype html><html><head><meta charset="utf-8"><title>Buoi giao dich</title><style>'+TDN_IN_CSS+'a{color:#000;text-decoration:none}.nhan-nhom{font-weight:bold;margin:10px 0 4px}.huong-dan{font-style:italic}</style></head><body><h1>CHUẨN BỊ BUỔI GIAO DỊCH</h1>'+t+'</body></html>'], {type:'text/html'}), 'Buoi giao dich.html');
}
/* ==========================================================
   3.71 — 🧰 CÔNG CỤ: 📋 CHƯƠNG TRÌNH VAY
   (1) Đang cho vay: tóm tắt 9 chương trình tại PGD — đối tượng, thời hạn, lãi suất, kỳ hạn trả nợ (VB 2174), mức cho vay
       Nguồn: "Tóm tắt các chương trình tín dụng chính sách tại PGD Gò Dầu" (2025) anh gửi — chép nguyên nội dung, không tự sửa số
   (2) Danh mục mã: mã CT · tên viết tắt hệ thống · viết tắt dùng trong app · tên chương trình (file Danh mục chương trình vay)
   ========================================================== */
var CTV_PK = '12 tháng: phân kỳ 12 tháng/lần · trên 12–60 tháng: 24 tháng/lần · trên 60 tháng: 36 tháng/lần';
var CTV_DS = [
  {ten:'Hộ nghèo', vt:'HN', dt:['Hộ nghèo theo chuẩn quốc gia'], th:'10 năm', ls:'6,6', ky:CTV_PK, muc:'100 triệu đồng/hộ'},
  {ten:'Hộ cận nghèo', vt:'HCN', dt:['Hộ cận nghèo theo chuẩn nghèo quốc gia'], th:'10 năm', ls:'7,92', ky:CTV_PK, muc:'100 triệu đồng/hộ'},
  {ten:'Hộ mới thoát nghèo', vt:'HMTN', dt:['Hộ mới thoát nghèo từng là hộ nghèo, hộ cận nghèo đã ra khỏi danh sách tối đa 03 năm'], th:'5 năm', ls:'8,25',
    ky:'12 tháng: phân kỳ 12 tháng/lần · trên 12–60 tháng: 24 tháng/lần', muc:'100 triệu đồng/hộ'},
  {ten:'Học sinh, sinh viên có hoàn cảnh khó khăn', vt:'HSSV', dt:['Học sinh, sinh viên mồ côi; hộ nghèo, hộ cận nghèo; hộ có mức sống trung bình; hộ gặp khó khăn về tài chính; lao động nông thôn học nghề và bộ đội xuất ngũ học nghề; người lao động bị thu hồi đất; sinh viên y khoa sau khi đã tốt nghiệp có hoàn cảnh khó khăn đang trong thời gian thực hành tại cơ sở khám chữa bệnh'],
    th:'Thời hạn phát tiền vay + 12 tháng + thời gian trả nợ', thGon:'theo khóa học', ls:'6,6', ky:'12 tháng/lần', muc:'4 triệu đồng/tháng/SV (40 triệu đồng/năm)'},
  {ten:'Hỗ trợ tạo việc làm, duy trì và mở rộng việc làm', vt:'GQVL', th:'10 năm', ky:CTV_PK, nhom:[
    {dt:'Người khuyết tật, dân tộc thiểu số', ls:'3,96', muc:'100 triệu đồng/lao động'},
    {dt:'Người lao động', ls:'7,92', muc:'100 triệu đồng/lao động'},
    {dt:'Cơ sở SXKD: hộ kinh doanh, tổ hợp tác, hợp tác xã, doanh nghiệp nhỏ và vừa', ls:'7,92', muc:'02 tỷ đồng/dự án, không quá 100 triệu/lao động được tạo việc làm, duy trì và mở rộng việc làm; từ 100 triệu đồng trở lên phải có tài sản bảo đảm'},
    {dt:'Cơ sở SXKD sử dụng từ 30% trở lên lao động là người khuyết tật, dân tộc thiểu số', ls:'3,96', muc:'02 tỷ đồng/dự án, không quá 100 triệu/lao động; từ 100 triệu đồng trở lên phải có tài sản bảo đảm'}]},
  {ten:'Người lao động đi làm việc ở nước ngoài theo hợp đồng', vt:'XKLĐ', th:'Không vượt quá thời hạn làm việc ở nước ngoài của người lao động', thGon:'theo hợp đồng', ky:'Tối đa 12 tháng/lần', nhom:[
    {dt:'Nguồn vốn trung ương: người lao động thuộc hộ nghèo, hộ cận nghèo theo chuẩn quốc gia; người dân tộc thiểu số; thân nhân người có công với cách mạng; thuộc hộ gia đình, cá nhân bị thu hồi đất; người thường trú tại huyện nghèo', ls:'6,6', muc:'100% chi phí; từ 100 triệu đồng trở lên phải có tài sản bảo đảm'},
    {dt:'Nguồn vốn địa phương — Nhóm 1: người lao động thuộc hộ nghèo, hộ cận nghèo theo chuẩn quốc gia; người dân tộc thiểu số; thân nhân người có công với cách mạng; thuộc hộ gia đình, cá nhân bị thu hồi đất', ls:'6,6', muc:'100% chi phí; không vượt quá 50 triệu đồng/người, không bảo đảm tiền vay'},
    {dt:'Nguồn vốn địa phương — Nhóm 2: người lao động là bộ đội, công an phục viên, xuất ngũ; người lao động thuộc hộ khó khăn về kinh tế được UBND xã bình xét và xác nhận', ls:'8,58', muc:'100% chi phí; không vượt quá 150 triệu đồng/người, không bảo đảm tiền vay'}]},
  {ten:'Cấp nước sạch và vệ sinh môi trường nông thôn', vt:'NS&VSMT', dt:['Hộ gia đình cư trú tại vùng nông thôn chưa có công trình nước sạch và vệ sinh môi trường hoặc đã có nhưng chưa đạt tiêu chuẩn quốc gia về nước sạch và chưa đảm bảo vệ sinh môi trường'],
    th:'5 năm', ls:'9', ky:'12 tháng/lần', muc:'25 triệu đồng/công trình'},
  {ten:'Mua, thuê mua nhà ở xã hội; xây dựng, cải tạo, sửa chữa nhà để ở', vt:'NOXH', dt:['Người có công với cách mạng, thân nhân liệt sĩ thuộc trường hợp được hỗ trợ cải thiện nhà ở theo Pháp lệnh Ưu đãi người có công với cách mạng',
      'Hộ gia đình nghèo, cận nghèo tại khu vực nông thôn','Hộ gia đình nghèo, cận nghèo tại khu vực nông thôn thuộc vùng thường xuyên bị ảnh hưởng bởi thiên tai, biến đổi khí hậu',
      'Hộ gia đình nghèo, cận nghèo tại khu vực đô thị','Người thu nhập thấp tại khu vực đô thị','Công nhân, người lao động đang làm việc tại doanh nghiệp, hợp tác xã, liên hiệp hợp tác xã trong và ngoài khu công nghiệp',
      'Sĩ quan, quân nhân chuyên nghiệp, hạ sĩ quan thuộc lực lượng vũ trang nhân dân, công nhân công an, công chức, công nhân và viên chức quốc phòng đang phục vụ tại ngũ; người làm công tác cơ yếu, người làm công tác khác trong tổ chức cơ yếu hưởng lương từ ngân sách nhà nước đang công tác',
      'Cán bộ, công chức, viên chức theo quy định của pháp luật về cán bộ, công chức, viên chức'],
    th:'25 năm', ls:'6,6', ky:'…… tháng/lần (tài liệu gốc để trống số tháng)', muc:'Mua, thuê mua NOXH: tối đa 80% giá trị hợp đồng. Xây dựng, cải tạo, sửa chữa: tối đa 70% giá trị dự toán / phương án, không quá 01 tỷ đồng và không vượt 70% giá trị tài sản bảo đảm. Mức cụ thể do NHCSXH nơi cho vay xem xét theo nguồn vốn, khả năng trả nợ, phương án sử dụng vốn'},
  {ten:'Người chấp hành xong án phạt tù (QĐ 22/2023/QĐ-TTg)', vt:'NCHXAPT', dt:['Người chấp hành xong án phạt tù (NCHXAPT): đã được cấp giấy chứng nhận chấp hành xong án phạt tù (Luật Thi hành án hình sự) hoặc giấy chứng nhận đặc xá (Luật Đặc xá)',
      'Cơ sở SXKD: doanh nghiệp nhỏ và vừa, hợp tác xã, tổ hợp tác, hộ kinh doanh có sử dụng lao động là NCHXAPT'],
    th:'10 năm', ls:'6,6', ky:CTV_PK, muc:'Đào tạo nghề: tối đa 04 triệu đồng/tháng/NCHXAPT. SXKD, tạo việc làm: NCHXAPT tối đa 100 triệu đồng; cơ sở SXKD tối đa 02 tỷ đồng/dự án và không quá 100 triệu đồng/người lao động'}
];
var CTV = {xem:'dang', tim:'', mo:-1};
function ctvChonHTML(){
  return '<span class="tdn-seg ctv-seg">'+[['dang','Đang cho vay ('+CTV_DS.length+')'],['ma','Danh mục mã ('+Object.keys(TDN_CT).length+')']].map(function(x){
    return '<button class="'+(CTV.xem===x[0]?'bat':'')+'" onclick="CTV.xem=\''+x[0]+'\';veCC()">'+x[1]+'</button>'; }).join('')+'</span>';
}
function ctvLS(c){ return c.nhom ? c.nhom.map(function(n){ return n.ls; }).filter(function(x, i, a){ return a.indexOf(x)===i; }).join(' · ') : c.ls; }
function ctvMucGon(c){ return c.nhom ? (c.nhom.length+' nhóm đối tượng') : c.muc.split('. ')[0]; }
function ccCTVHTML(){
  var q = boDau(CTV.tim||'').trim(), e = coChuHTML;
  var h = '<div class="ctv"><input class="ctv-tim" placeholder="Gõ để tìm: tên, viết tắt, mã, đối tượng…" value="'+e(CTV.tim)+'" oninput="CTV.tim=this.value;ctvVeDS()">'+
    '<div id="ctv-ds">'+ctvDSHTML(q)+'</div>'+
    '<div class="ctv-nguon">Nguồn: '+(CTV.xem==='dang' ? 'Tóm tắt các chương trình tín dụng chính sách tại PGD Gò Dầu (2025); kỳ hạn trả nợ theo VB 2174. Lãi suất, mức cho vay thay đổi theo văn bản mới — đối chiếu văn bản gốc khi tư vấn.' : 'Danh mục chương trình vay của hệ thống (MACT · TENVT · TENCT). Cột "App" là viết tắt dùng để phân loại văn bản, biểu mẫu trong app.')+'</div></div>';
  return h;
}
function ctvVeDS(){ var e = document.getElementById('ctv-ds'); if(e) e.innerHTML = ctvDSHTML(boDau(CTV.tim||'').trim()); }
function ctvDSHTML(q){
  var e = coChuHTML;
  if(CTV.xem==='ma'){
    var ds = Object.keys(TDN_CT).sort().map(function(ma){ var vt = ctVTAppCua(ma); return {ma:ma, ht:TDN_CT[ma][0], ten:TDN_CT[ma][1], app:vt, dang:CTV_DS.some(function(c){ return c.vt===vt; })}; })
      .filter(function(x){ return !q || boDau([x.ma, x.ht, x.ten, x.app].join(' ')).indexOf(q)>=0; });
    return '<table class="ctv-bang"><tr><th>Mã</th><th>Viết tắt hệ thống</th><th>App</th><th>Tên chương trình</th></tr>'+ds.map(function(x){
      return '<tr class="'+(x.dang?'dang':'')+'"><td><span class="ctv-ma" title="Bấm để chép mã" onclick="ctvChep(\''+x.ma+'\')">'+x.ma+'</span></td><td>'+e(x.ht)+'</td><td>'+e(x.app)+'</td><td>'+e(x.ten)+(x.dang?' <span class="ctv-nhan">đang cho vay</span>':'')+'</td></tr>'; }).join('')+
      (ds.length?'':'<tr><td colspan="4">Không có mã nào khớp.</td></tr>')+'</table>';
  }
  var ds2 = CTV_DS.map(function(c, i){ return {c:c, i:i}; }).filter(function(x){ var c = x.c;
    return !q || boDau([c.ten, c.vt, ctMaCua(c.vt), c.ls||'', c.th, (c.dt||[]).join(' '), (c.nhom||[]).map(function(n){ return n.dt+' '+n.ls+' '+n.muc; }).join(' '), c.muc||''].join(' ')).indexOf(q)>=0; });
  if(!ds2.length) return '<div class="rong">Không có chương trình nào khớp.</div>';
  return ds2.map(function(x){
    var c = x.c, mo = CTV.mo===x.i || !!q, ma = ctMaCua(c.vt);
    var h = '<div class="ctv-the'+(mo?' mo':'')+'"><div class="ctv-dau" onclick="CTV.mo=(CTV.mo==='+x.i+'?-1:'+x.i+');ctvVeDS()">'+
      '<b>'+(x.i+1)+'. '+e(c.ten)+'</b><span class="ctv-vt">'+e(c.vt)+(ma?' · mã '+ma:'')+'</span>'+
      '<span class="ctv-so"><span title="Lãi suất %/năm">'+e(ctvLS(c))+'%</span><span title="Thời hạn tối đa">'+e(c.thGon||c.th)+'</span><span title="Mức cho vay tối đa">'+e(ctvMucGon(c))+'</span></span></div>';
    if(mo){
      h += '<table class="ctv-ct">'+(c.nhom ? '<tr><td>Đối tượng · lãi suất · mức cho vay</td><td>'+c.nhom.map(function(n){ return '<div class="ctv-nhom"><b>'+e(n.ls)+'%/năm</b> — '+e(n.dt)+'<br><i>Mức: '+e(n.muc)+'</i></div>'; }).join('')+'</td></tr>'
          : '<tr><td>Đối tượng</td><td>'+(c.dt.length>1 ? '<ol>'+c.dt.map(function(d){ return '<li>'+e(d)+'</li>'; }).join('')+'</ol>' : e(c.dt[0]))+'</td></tr><tr><td>Lãi suất</td><td><b>'+e(c.ls)+'%/năm</b></td></tr><tr><td>Mức cho vay tối đa</td><td>'+e(c.muc)+'</td></tr>')+
        '<tr><td>Thời hạn tối đa</td><td>'+e(c.th)+'</td></tr><tr><td>Kỳ hạn trả nợ (VB 2174)</td><td>'+e(c.ky)+'</td></tr></table>'+
        '<div class="hang-nut"><button class="nho" onclick="ctvChepCT('+x.i+')">📋 Chép tóm tắt</button></div>';
    }
    return h+'</div>';
  }).join('');
}
function ctvChuCT(c){
  var d = c.nhom ? c.nhom.map(function(n){ return '- '+n.dt+': lãi suất '+n.ls+'%/năm; mức cho vay: '+n.muc; }).join('\n')
    : 'Đối tượng: '+c.dt.join('; ')+'\nLãi suất: '+c.ls+'%/năm\nMức cho vay tối đa: '+c.muc;
  return 'Chương trình cho vay '+c.ten+' ('+c.vt+(ctMaCua(c.vt)?', mã '+ctMaCua(c.vt):'')+')\n'+d+'\nThời hạn tối đa: '+c.th+'\nKỳ hạn trả nợ: '+c.ky;
}
function ctvChepCT(i){ chepChu(ctvChuCT(CTV_DS[i]), 'Đã chép tóm tắt chương trình.'); }
function ctvChep(ma){ chepChu(ma, 'Đã chép mã '+ma+'.'); }
function ccCotHTML(){
  return '<div class="cc-cot" title="🧰 Công cụ">'+CONG_CU.filter(function(c){ return !c.an; }).map(function(c){   /* 3.144: an = đã bỏ (Giao ban, Buổi GD) */
    return '<button class="cc-nut'+(CC.mo===c.id?' bat':'')+(c.ve?'':' cho')+'" onclick="ccMo(\''+c.id+'\')" title="'+coChuHTML(c.tit||c.ten)+'">'+
      '<i>'+c.ico+'</i><span>'+coChuHTML(c.ten)+'</span></button>';
  }).join('')+'</div>';
}
function ccTim(id){ return CONG_CU.find(function(c){ return c.id===id; }); }
function ccMo(id){
  var c0 = ccTim(id); if(c0 && c0.an){ CC.mo = ''; veCC(); return bao('Công cụ “'+c0.ten+'” đã bỏ (anh chốt 10/10/2026) — sẽ làm lại sau.', 5); }   /* 3.144 */
  CC.mo = CC.mo===id ? '' : id;
  if(CC.mo==='hssv' && CC.hs) CC.hs.loai = 'tren';   /* 3.63 (việc X): mỗi lần mở là Trên 12 tháng */
  Array.prototype.forEach.call(document.querySelectorAll('.cc-nut'), function(b){
    b.classList.toggle('bat', b.getAttribute('onclick')==='ccMo(\''+CC.mo+'\')' && !!CC.mo); });
  veCC();
}
function ccVeLai(id){ var c = ccTim(id); if(!c) return; if(document.querySelector('#hop-in .cc-hop[data-cc="'+id+'"]')) moHop(ccHopHTML(c), !!c.hop); else veCC(); }   /* 3.83 */
function ccDong(){ CC.mo = ''; Array.prototype.forEach.call(document.querySelectorAll('.cc-nut.bat'), function(b){ b.classList.remove('bat'); }); veCC(); if(document.getElementById('hop').classList.contains('hien') && document.querySelector('#hop-in .cc-hop')) dongHop(); }
function ccHopHTML(c){
  return '<div class="cc-hop" data-cc="'+c.id+'"><div class="cc-dau"><b>'+c.ico+' '+coChuHTML(c.tit||c.ten)+'</b>'+
    (c.dau ? c.dau() : '')+'<span class="cc-gian"></span>'+
    (c.nut||'')+'<button class="nho" onclick="ccDong()">Đóng (Esc)</button></div>'+
    '<div class="cc-than" id="cc-than">'+(c.ve ? c.ve() : '<div class="huong-dan">Công cụ này <b>đang chuẩn bị</b> — anh gửi nghiệp vụ là em làm tiếp.</div>')+'</div></div>';
}
function veCC(){
  var o = document.getElementById('cc-o'); if(!o) return;
  var c = ccTim(CC.mo);
  if(!c || c.an){ o.innerHTML = ''; return; }   /* 3.144 */
  if(c.hop || (window.matchMedia && !window.matchMedia('(min-width:900px)').matches)){
    /* điện thoại: mở thành hộp, không giữ trạng thái "đang mở" trên nút (đóng hộp kiểu nào cũng được)
       3.83: công cụ có bảng rộng (Giao ban, Buổi GD) mở hộp rộng cả trên máy tính */
    o.innerHTML = ''; CC.hop = c.id; CC.mo = '';
    Array.prototype.forEach.call(document.querySelectorAll('.cc-nut.bat'), function(b){ b.classList.remove('bat'); });
    moHop(ccHopHTML(c), !!c.hop);
    return;
  }
  o.innerHTML = ccHopHTML(c);
  ccVuaMan();
}
/* ô công cụ gói trong màn hình: cao tới sát dải trạng thái dưới cùng, dài hơn thì cuộn bên trong */
function ccVuaMan(){
  var o = document.getElementById('cc-o'); if(!o || !o.firstChild) return;
  var day = document.querySelector('.day'), dayTop = day ? day.getBoundingClientRect().top : window.innerHeight;
  o.style.maxHeight = Math.max(200, Math.round(dayTop - o.getBoundingClientRect().top - 8))+'px';
}
window.addEventListener('resize', function(){ if(CC.mo) ccVuaMan(); });
/* vẽ lại riêng phần thân (giữ ô đang gõ) */
function ccVeThan(){
  var c = ccTim(CC.mo || CC.hop), t = document.getElementById('cc-than');
  if(c && c.ve && t) t.innerHTML = c.ve();
}
function ccChep(t, bx){
  if(HS_PIP && HS_PIP.navigator.clipboard){   /* 3.102: đang gõ trong cửa sổ nổi → chép bằng clipboard của cửa sổ đó (cửa sổ chính không có tiêu điểm) */
    var m = bx||('📋 Đã chép: '+t);
    HS_PIP.navigator.clipboard.writeText(t).then(function(){ hsNoiBao(m); }).catch(function(){ hsNoiBao('⚠ Không chép được — bôi đen rồi Ctrl+C'); });
    return;
  }
  chepChu(t, bx||('📋 Đã chép: '+t));
}

/* ---------- W① HẠN TRẢ NỢ HSSV — đúng công thức file Excel Sheet2 anh đang dùng ---------- */
function hsDoc(v){   /* dd/mm/yyyy · dd/mm/yy · ddmmyyyy → Date (giữa trưa, tránh lệch múi giờ) */
  var m = String(v||'').trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2}|\d{4})$/);
  if(!m){ var so = String(v||'').replace(/\D/g,''); if(so.length===8) m = [0, so.slice(0,2), so.slice(2,4), so.slice(4)]; else if(so.length===6) m = [0, so.slice(0,2), so.slice(2,4), so.slice(4)]; }
  if(!m) return null;
  var y = +m[3]; if(y<100) y += 2000;
  var d = new Date(y, +m[2]-1, +m[1], 12);
  return (d.getDate()===+m[1] && d.getMonth()===+m[2]-1) ? d : null;
}
function hsNgay(d){ return d ? hai(d.getDate())+'/'+hai(d.getMonth()+1)+'/'+d.getFullYear() : ''; }
function hsCuoiThang(y, th){ return new Date(y, th+1, 0, 12).getDate(); }
/* EDATE của Excel: cộng n tháng, ngày lớn hơn cuối tháng thì lấy ngày cuối tháng */
function hsEdate(d, n){ var y = d.getFullYear(), th = d.getMonth()+n; var yy = y + Math.floor(th/12), mm = ((th%12)+12)%12;
  return new Date(yy, mm, Math.min(d.getDate(), hsCuoiThang(yy, mm)), 12); }
/* DATEDIF(…,"M"): số tháng tròn, bỏ ngày lẻ */
function hsThang(a, b){ var m = (b.getFullYear()-a.getFullYear())*12 + b.getMonth()-a.getMonth(); if(b.getDate()<a.getDate()) m--; return m; }
function hsCongNgay(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate()+n); x.setHours(12); return x; }
function hsSoNgay(a, b){ return Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate()) - Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/864e5); }
/* ngày GDX tháng (y, th); tháng không có ngày đó thì lấy ngày cuối tháng (Excel nhảy sang tháng sau → có thể vượt hạn) */
function hsNgayGD(y, th, g){ var yy = y + Math.floor(th/12), mm = ((th%12)+12)%12; return new Date(yy, mm, Math.min(g, hsCuoiThang(yy, mm)), 12); }
/* cột I Excel: hạn ≤ ngày GDX cùng tháng → ngày GDX tháng trước; ngược lại ngày GDX tháng đó (anh chốt: trùng ngày thì lùi 1 tháng) */
function hsVeGD(h, g){ var cur = hsNgayGD(h.getFullYear(), h.getMonth(), g);
  return hsSoNgay(cur, h) <= 0 ? hsNgayGD(h.getFullYear(), h.getMonth()-1, g) : cur; }
function hsTien(so){ return Math.round(so).toLocaleString('vi-VN').replace(/,/g,'.'); }
function hsVayGoiY(g){   /* 3.100 (anh chốt): ngày giải ngân gợi ý = ngày giao dịch (GDX) gần nhất kể từ hôm nay (hôm nay đúng GDX thì lấy hôm nay) */
  g = +g; if(!(g>=1 && g<=31)) return '';
  var t = nay(), h = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12), c = hsNgayGD(h.getFullYear(), h.getMonth(), g);
  if(hsSoNgay(h, c)<0) c = hsNgayGD(h.getFullYear(), h.getMonth()+1, g);
  return hsNgay(c);
}
function hsGoiY(v){   /* 3.99 (anh chốt): tiền vay gợi ý — 1 năm học = 10 tháng vay = 40 triệu; nửa năm = 5 tháng = 20 triệu.
   3.101 (anh chốt): tính theo NĂM HỌC (bắt đầu tháng 9) thay cho đếm tháng.
   Năm cuối theo tháng ra trường: 6–8 tròn năm · 2–5 nửa năm · 9–12 và tháng 1 tính vào năm học trước (0) — tháng 1 thường chưa đủ 6 tháng từ lúc nhận tiền.
   Năm đầu theo tháng vay: 9–12 tròn năm · 1–5 nửa năm · 6–8 (nghỉ hè) bắt đầu từ năm học sau. Tối thiểu nửa năm. */
  var a = hsDoc(v.vay), b = hsDoc(v.rt); if(!a || !b || hsSoNgay(a, b)<=0) return null;
  var nh = function(d){ return d.getMonth()>=8 ? d.getFullYear() : d.getFullYear()-1; };   /* năm học chứa ngày d (tính theo năm bắt đầu) */
  var ma = a.getMonth()+1, mb = b.getMonth()+1;
  var fa = ma>=9 ? 1 : (ma<=5 ? 0.5 : 0), fb = (mb>=6 && mb<=8) ? 1 : (mb>=2 && mb<=5 ? 0.5 : 0);
  var na = nh(a), nb = nh(b), ds = [], tong;
  if(na===nb){ tong = fa+fb-1; ds.push([na, Math.max(0, tong)]); }
  else { tong = fa+(nb-na-1)+fb; ds.push([na, fa]); for(var y=na+1; y<nb; y++) ds.push([y, 1]); ds.push([nb, fb]); }
  var nua = Math.max(1, Math.round(tong*2)), nam = Math.floor(nua/2);
  return {nua:nua, thang:nua*5, trieu:nua*20, nam:(nam ? nam+' năm' : '')+(nua%2 ? (nam ? ' rưỡi' : 'nửa năm') : ''),
    ds:ds.map(function(x){ return x[0]+'-'+(x[0]+1)+' ('+(x[1]===1 ? 'tròn năm' : x[1]===0.5 ? 'nửa năm' : 'không tính')+')'; })};
}
function hsTinh(v){
  var kq = {loi:[]};
  var vay = hsDoc(v.vay), rt = hsDoc(v.rt), g = +v.gdx;
  if(!vay) kq.loi.push('Ngày vay chưa đúng (dd/mm/yyyy)');
  if(!rt) kq.loi.push('Ngày ra trường chưa đúng (dd/mm/yyyy)');
  if(!(g>=1 && g<=31)) kq.loi.push('Ngày GDX phải từ 1 đến 31');
  if(vay && rt && hsSoNgay(vay, rt)<=0) kq.loi.push('Ngày ra trường phải sau ngày vay');
  if(kq.loi.length) return kq;
  var tp = hsThang(vay, rt), soNgay = hsSoNgay(vay, rt);
  var loai = v.loai==='duoi' ? 'duoi' : 'tren';   /* 3.63 (việc X): bỏ "Tự chọn" — phân loại theo khóa học, anh chọn; mặc định Trên 12 tháng */
  kq.tp = tp; kq.soNgay = soNgay; kq.loai = loai; kq.vay = vay; kq.rt = rt; kq.g = g;
  if(loai==='tren'){
    kq.moc = hsCongNgay(rt, soNgay);                 /* ra trường + số ngày phát tiền vay */
    kq.hc = hsEdate(kq.moc, 12);                    /* + 12 tháng ân hạn (Excel dòng 2) */
    kq.ttn = tp; kq.thoiHan = tp*2 + 12;
  } else {
    kq.hc = hsEdate(rt, tp*2 + 12);                 /* Excel dòng 5 */
    kq.ttn = tp*2; kq.thoiHan = tp*3 + 12;
  }
  kq.hcGD = hsVeGD(kq.hc, g);
  /* kỳ trả gốc 12 tháng/lần từ ra trường + 12 tháng; kỳ cuối = hạn cuối theo GDX */
  kq.ky = [];
  for(var k=1; k<60; k++){
    var r = hsEdate(rt, 12*k); if(hsSoNgay(r, kq.hc)<=0) break;
    var gd = hsVeGD(r, g); if(hsSoNgay(gd, kq.hcGD)<=0) break;
    kq.ky.push({goc:r, ngay:gd});
  }
  kq.ky.push({goc:kq.hc, ngay:kq.hcGD, cuoi:true});
  kq.goiY = hsGoiY(v);
  var tien = parseFloat(String(v.tien||'').replace(',', '.'));
  if(tien>0){
    var T = Math.round(tien*1e6), n = kq.ky.length, moi = Math.floor(T/n/1e5)*1e5;
    if(moi<=0) moi = Math.floor(T/n);
    kq.T = T; kq.ky.forEach(function(x, i){ x.tien = i<n-1 ? moi : T - moi*(n-1); });
    kq.moi = moi; kq.cuoiTien = T - moi*(n-1);
  }
  /* tự kiểm: ngày vay + thời hạn cho vay không vượt hạn cuối; mọi kỳ không vượt hạn cuối */
  kq.kiem = hsSoNgay(hsEdate(vay, kq.thoiHan), kq.hc) >= 0;
  var cau = (kq.T ? 'Số tiền vay '+hsTien(kq.T)+' đồng, ' : '')+'thời hạn '+kq.thoiHan+' tháng, hạn cuối '+hsNgay(kq.hcGD)+
    (kq.T ? ', trả '+hsTien(kq.moi)+' đồng/lần' : '')+', lần 1: '+hsNgay(kq.ky[0].ngay)+
    (kq.T && kq.cuoiTien!==kq.moi ? ', lần cuối '+hsTien(kq.cuoiTien)+' đồng' : '');
  kq.cau = cau.charAt(0).toUpperCase()+cau.slice(1);
  return kq;
}
function hsGT(){
  if(!CC.hs){ var g = ''; try{ g = localStorage.getItem('tuhoso_gdx')||''; }catch(e){}
    CC.hs = {vay:'', rt:'', gdx:g, tien:'', loai:'tren'}; }
  if(CC.hs.vay==='' && !CC.hs.vayTay) CC.hs.vay = hsVayGoiY(CC.hs.gdx);
  if(CC.hs.tien==='' && !CC.hs.tienTay){ var gy = hsGoiY(CC.hs); if(gy) CC.hs.tien = String(gy.trieu); }
  return CC.hs;
}
var HS_PIP = null;   /* 3.102: cửa sổ nổi (Document Picture-in-Picture) — khi mở, các ô HSSV nằm trong cửa sổ đó */
function hsEl(id){ return (HS_PIP ? HS_PIP.document : document).getElementById(id); }
function hsDat(k, el){
  var v = hsGT();
  if(k==='vay' || k==='rt') goNgay(el);
  v[k] = el.value;
  if(k==='gdx'){ try{ localStorage.setItem('tuhoso_gdx', el.value); }catch(e){} }
  if(k==='tien') v.tienTay = true;
  if(k==='vay') v.vayTay = el.value!=='';
  if(k==='gdx' && !v.vayTay){   /* 3.100: đổi GDX (xã khác) → ngày vay gợi ý lại, trừ khi anh đã gõ tay */
    v.vay = hsVayGoiY(v.gdx); var ov = hsEl('hs-vay'); if(ov) ov.value = v.vay;
  }
  var nv = hsEl('hs-vgy'); if(nv) nv.innerHTML = hsVayNhan();
  if(k==='vay' || k==='rt' || (k==='gdx' && !v.vayTay)){   /* 3.99: đổi ngày → món mới, tự điền lại tiền vay gợi ý (anh gõ đè được) */
    var gy = hsGoiY(v); v.tienTay = false; v.tien = gy ? String(gy.trieu) : '';
    var o = hsEl('hs-tien'); if(o) o.value = v.tien;
  }
  var nh = hsEl('hs-goiy'); if(nh) nh.innerHTML = hsGoiYNhan();
  var kq = hsEl('hs-kq'); if(kq) kq.innerHTML = hsKetQuaHTML();
  if(HS_PIP) hsNoiVe();
}
function hsLoai(l){
  hsGT().loai = l==='duoi' ? 'duoi' : 'tren';
  var e = hsEl('hs-loai'); if(e){ e.value = hsGT().loai; e.classList.toggle('cam', hsGT().loai==='duoi'); }
  var n = hsEl('hs-luuy'); if(n) n.innerHTML = hsLuuYHTML();
  var kq = hsEl('hs-kq'); if(kq) kq.innerHTML = hsKetQuaHTML();
  if(HS_PIP) hsNoiVe();
}
/* 3.63 (việc X, anh chốt): ô chọn nhỏ trên dòng tiêu đề; chọn "Đến 12 tháng · Y khoa" thì ô đổi màu cam + dòng lưu ý — không bật hộp */
function hsChonLoaiHTML(){
  if(HS_PIP && !HS_VE_NOI) return '';   /* 3.98 (anh chốt): dòng trên = các ô giữ nguyên trong 1 đợt nhập (loại khóa học, ngày GDX, ngày vay) */
  var d = hsGT().loai==='duoi';
  return '<span class="hs-dau"><select id="hs-loai" class="hs-loai'+(d?' cam':'')+'" onchange="hsLoai(this.value)" title="Phân loại theo thời gian khóa đào tạo">'+
    '<option value="tren"'+(d?'':' selected')+'>Trên 12 tháng</option><option value="duoi"'+(d?' selected':'')+' title="Đến 12 tháng · SV Y khoa">Đến 12 th · Y khoa</option></select>'+
    hsO('gdx', 'GDX', '1–31', 1)+'</span>';
}
var HS_THU = ['gdx', 'vay', 'rt', 'tien'];
function hsO(k, nhan, goiY, gon){   /* ô nhập: bấm vào là bôi đen số cũ (gõ là thay), Enter / → sang ô sau, Shift+Enter / ← về ô trước */
  var v = hsGT();
  return (gon ? '<label class="hs-o-gon">'+nhan+' ' : '<div class="hs-o"><label>'+nhan+'</label>')+
    '<input id="hs-'+k+'" value="'+coChuHTML(v[k]||'')+'" inputmode="numeric" placeholder="'+goiY+'" oninput="hsDat(\''+k+'\',this)" onfocus="this.select()" onmouseup="event.preventDefault()" onkeydown="hsPhim(event,\''+k+'\',this)">'+(gon ? '</label>' : '</div>');
}
function hsPhim(e, k, el){
  var i = HS_THU.indexOf(k), di = 0, het = el.selectionStart===el.value.length && el.selectionEnd===el.value.length, dau = el.selectionStart===0 && el.selectionEnd===0;
  if(e.key==='Enter') di = e.shiftKey ? -1 : 1; else if(e.key==='ArrowRight' && het) di = 1; else if(e.key==='ArrowLeft' && dau) di = -1;
  if(!di) return;
  e.preventDefault();
  var j = k==='tien' && di>0 ? HS_THU.indexOf('rt') : Math.max(0, Math.min(HS_THU.length-1, i+di));   /* Enter ở Tiền vay → về Ngày ra trường để nhập món kế tiếp */
  var n = hsEl('hs-'+HS_THU[j]); if(n){ n.focus(); n.select(); }
}
function hsVayNhan(){ var v = hsGT(); return !v.vayTay && v.vay && v.vay===hsVayGoiY(v.gdx) ? ' · GDX gần nhất' : ''; }
function hsGoiYNhan(){ var gy = hsGoiY(hsGT()); return gy ? ' · gợi ý '+gy.thang+' th = '+gy.trieu : ''; }
function hsMiniHTML(){   /* 3.103: mức thu nhỏ của cửa sổ nổi — 1 dòng kết quả */
  var v = hsGT(); if(!v.vay && !v.rt) return 'Gõ ngày ra trường';
  var kq = hsTinh(v); if(kq.loi.length) return '⚠ '+coChuHTML(kq.loi[0]);
  return kq.thoiHan+' th · hạn '+hsNgay(kq.hcGD)+(kq.moi ? ' · '+hsTien(kq.moi)+' × '+kq.ky.length+' kỳ' : '')+' · lần đầu '+hsNgay(kq.ky[0].ngay);
}
function hsLuuYHTML(){
  return hsGT().loai==='duoi' ? '⚠ Đang tính theo khóa học <b>đến 12 tháng / SV Y khoa</b>: trả nợ tối đa = 2 × phát tiền vay.' : '';
}
function ccHSSVHTML(){
  var v = hsGT();
  if(HS_PIP && !HS_VE_NOI) return '<div class="huong-dan">📌 Đang mở ở <b>cửa sổ nổi</b> (luôn nằm trên các cửa sổ khác). <button class="nho" onclick="hsNoiDong()">Đưa về đây</button></div>';
  return '<div class="hs-luuy" id="hs-luuy">'+hsLuuYHTML()+'</div><div class="hs-nhap hs-nhap2">'+hsO('vay','Ngày vay<span id="hs-vgy">'+hsVayNhan()+'</span>','dd/mm/yyyy')+hsO('rt','Ngày ra trường','dd/mm/yyyy')+hsO('tien','Tiền vay (triệu)<span id="hs-goiy">'+hsGoiYNhan()+'</span>','vd 40')+
    '</div>'+
    '<div id="hs-kq">'+hsKetQuaHTML()+'</div>';
}
function hsKetQuaHTML(){
  var v = hsGT();
  if(!v.vay && !v.rt) return '<div class="huong-dan">Dòng trên (giữ cả đợt nhập): loại khóa học · ngày GDX. Ngày vay nằm đầu dòng nhập — tự gợi ý ngày GDX gần nhất kể từ hôm nay (gõ đè nếu khác), giữ cho các món sau. Mỗi món: bấm ô ngày ra trường, gõ → Enter → tiền vay (đã điền sẵn số gợi ý, gõ đè nếu cần) → Enter (về ô ngày ra trường cho món kế tiếp). Bấm vào ô là bôi đen số cũ, gõ là thay.</div>';
  var kq = hsTinh(v);
  if(kq.loi.length) return '<div class="hs-loi">⚠ '+kq.loi.join(' · ')+'</div>';
  var mo = window.innerHeight>=950 ? ' open' : '';
  var khoi = function(nhan, so, phu, chep, lop){ return '<div class="hs-k'+(lop ? ' '+lop : '')+'" onclick="ccChep(\''+chep+'\')" title="Bấm để chép"><small>'+nhan+'</small><b>'+so+'</b>'+(phu ? '<i>'+phu+'</i>' : '')+'</div>'; };
  var gy = kq.goiY, gyChu = gy ? gy.thang+' tháng vay ('+gy.nam+') × 4 tr' : '';
  var tienPhu = !kq.T ? (gy ? 'Gợi ý: '+gy.thang+' tháng = '+gy.trieu+' tr' : 'gõ tiền vay') : (gy && kq.T!==gy.trieu*1e6 ? 'Gợi ý: '+gy.thang+' tháng = '+gy.trieu+' tr' : '<b>'+gyChu+'</b>');
  /* 3.99 (anh chốt): hàng 1 — 3 khối lớn (tiền vay, thời hạn, hạn cuối); hàng 2 — 2 khối phụ nhỏ (trả mỗi lần, lần đầu) */
  var h = '<div class="hs-khoi">'+khoi('Số tiền vay', kq.T ? hsTien(kq.T) : '—', tienPhu, kq.T ? hsTien(kq.T) : '')+
    khoi('Thời hạn cho vay', kq.thoiHan+' tháng', 'phát tiền vay '+kq.tp+' th', kq.thoiHan+' tháng')+
    khoi('Hạn cuối (theo GDX)', hsNgay(kq.hcGD), '', hsNgay(kq.hcGD))+
    khoi('Trả mỗi lần', kq.moi ? hsTien(kq.moi) : '—', kq.moi ? kq.ky.length+' kỳ'+(kq.cuoiTien!==kq.moi ? ' · lần cuối '+hsTien(kq.cuoiTien) : '') : '', kq.moi ? hsTien(kq.moi) : '', 'phu')+
    khoi('Lần đầu', hsNgay(kq.ky[0].ngay), '', hsNgay(kq.ky[0].ngay), 'phu')+'</div>'+
    '<table class="hs-bang"><tr><th>Phát tiền vay</th><th>Ân hạn</th><th>Trả nợ tối đa</th><th>Thời hạn cho vay</th><th>Hạn cuối</th><th>Hạn cuối theo GDX</th></tr>'+
    '<tr><td>'+kq.tp+' tháng<small>'+kq.soNgay+' ngày</small></td><td>12 tháng</td><td>'+kq.ttn+' tháng</td><td><b>'+kq.thoiHan+' tháng</b></td><td>'+hsNgay(kq.hc)+'</td>'+
    '<td class="dam" onclick="ccChep(\''+hsNgay(kq.hcGD)+'\')" title="Bấm để chép">'+hsNgay(kq.hcGD)+'</td></tr></table>';
  if(kq.loai==='tren' && kq.tp<=12) h += '<div class="hs-luuy">⚠ Phát tiền vay chỉ '+kq.tp+' tháng — nếu <b>khóa học</b> dài trên 1 năm (vay năm cuối) thì giữ nguyên; khóa học đến 1 năm / Y khoa thì đổi ô chọn trên tiêu đề.</div>';
  h += '<div class="hs-cau" onclick="ccChep(this.textContent,\'📋 Đã chép câu chốt — dán vào hồ sơ.\')" title="Bấm để chép">'+coChuHTML(kq.cau)+'</div>';
  h += '<details class="hs-ct"'+mo+'><summary>Các kỳ trả ('+kq.ky.length+' kỳ · 12 tháng/lần)</summary><table class="hs-ky"><tr><th>Kỳ</th><th>Ngày trả (theo GDX)</th><th>Gốc phải trả</th></tr>'+
    kq.ky.map(function(x, i){ return '<tr'+(i===0?' class="dau"':'')+'><td>'+(i+1)+(i===0?' · đầu tiên':(x.cuoi?' · cuối':''))+'</td><td>'+hsNgay(x.ngay)+'</td><td>'+(x.tien!==undefined?hsTien(x.tien):'—')+'</td></tr>'; }).join('')+
    '</table></details>';
  var tren = kq.loai==='tren';
  h += '<details class="hs-ct"'+mo+'><summary>Cách tính (để kiểm chứng)</summary><ol class="hs-buoc">'+
    '<li>Phát tiền vay = DATEDIF('+hsNgay(kq.vay)+' → '+hsNgay(kq.rt)+', tháng) = <b>'+kq.tp+' tháng</b> ('+kq.soNgay+' ngày) → '+(tren?'trên':'đến')+' 12 tháng (ô chọn trên tiêu đề)</li>'+
    (tren
      ? '<li>Hạn cuối = ra trường '+hsNgay(kq.rt)+' + '+kq.soNgay+' ngày = '+hsNgay(kq.moc)+' → + 12 tháng ân hạn = <b>'+hsNgay(kq.hc)+'</b></li>'
      : '<li>Hạn cuối = ra trường '+hsNgay(kq.rt)+' + ('+kq.tp+' × 2 + 12) = '+(kq.tp*2+12)+' tháng = <b>'+hsNgay(kq.hc)+'</b></li>')+
    '<li>Theo ngày GDX '+kq.g+': '+hsNgay(kq.hc)+(hsSoNgay(hsNgayGD(kq.hc.getFullYear(),kq.hc.getMonth(),kq.g),kq.hc)<=0?' ≤ ':' > ')+hsNgay(hsNgayGD(kq.hc.getFullYear(),kq.hc.getMonth(),kq.g))+' → <b>'+hsNgay(kq.hcGD)+'</b></li>'+
    '<li>Thời hạn cho vay = '+kq.tp+' × '+(tren?2:3)+' + 12 = <b>'+kq.thoiHan+' tháng</b> (kiểm: '+hsNgay(kq.vay)+' + '+kq.thoiHan+' tháng = '+hsNgay(hsEdate(kq.vay,kq.thoiHan))+' '+(kq.kiem?'✓ không vượt hạn cuối':'⚠ vượt hạn cuối — kiểm lại')+')</li>'+
    '<li>Kỳ đầu = ra trường + 12 tháng = '+hsNgay(kq.ky[0].goc)+' → GDX <b>'+hsNgay(kq.ky[0].ngay)+'</b>; các kỳ sau cách 12 tháng; kỳ cuối = hạn cuối theo GDX</li>'+
    (kq.goiY ? '<li>Tiền vay gợi ý theo năm học (từ tháng 9): '+kq.goiY.ds.join(' · ')+' = <b>'+kq.goiY.thang+' tháng vay × 4 tr = '+kq.goiY.trieu+' triệu</b></li>' : '')+
    (kq.T ? '<li>Mỗi kỳ = '+hsTien(kq.T)+' ÷ '+kq.ky.length+' kỳ, làm tròn xuống trăm nghìn = <b>'+hsTien(kq.moi)+'</b>; kỳ cuối nhận phần dư = <b>'+hsTien(kq.cuoiTien)+'</b></li>' : '<li>Gõ số tiền vay (triệu) để chia tiền các kỳ.</li>')+
    '</ol></details>';
  return h;
}
function hsChep(){
  var kq = hsTinh(hsGT()); if(kq.loi.length) return bao('Chưa đủ số liệu: '+kq.loi.join(' · '), 4);
  ccChep(kq.cau, '📋 Đã chép câu chốt — dán vào hồ sơ.');
}
function hsGhiTodo(){
  var kq = hsTinh(hsGT()); if(kq.loi.length) return HS_PIP ? hsNoiBao('Chưa đủ số liệu: '+kq.loi.join(' · ')) : bao('Chưa đủ số liệu: '+kq.loi.join(' · '), 4);
  dongThem(lcISO(nay()), '🎓 HSSV: '+kq.cau);
  veNhatKy(); if(HS_PIP) hsNoiBao('📝 Đã ghi vào to-do hôm nay.'); else bao('📝 Đã ghi vào to-do hôm nay.', 3);
}
/* 3.102 (anh chốt): 📌 cửa sổ nổi — Chrome / Edge 116+ (Document Picture-in-Picture), luôn nằm trên mọi cửa sổ; dùng chung số liệu + công thức với app */
var HS_VE_NOI = false, HS_NOI_MUC = 'gon', HS_NOI_HAM = ['hsDat', 'hsPhim', 'hsLoai', 'hsChep', 'hsGhiTodo', 'ccChep', 'hsNoiDong', 'hsNoiMau', 'hsNoiMuc', 'hsNoiChi'];
function hsNoiHTML(){
  HS_VE_NOI = true;
  try{
    return '<div class="cc-hop hs-noi"><div class="cc-dau"><b>🎓 HSSV</b>'+hsChonLoaiHTML()+'<span class="cc-gian"></span>'+
      '<button class="nho chinh" onclick="hsChep()" title="Chép câu chốt">📋 Chép</button><button class="nho hs-noi-todo" onclick="hsGhiTodo()" title="Ghi vào to-do hôm nay">📝</button>'+
      '<button class="nho" id="hs-noi-mau" onclick="hsNoiMau()" title="Đổi nền sáng / tối (riêng cửa sổ nổi)"></button>'+
      '<button class="nho" id="hs-noi-nho" onclick="hsNoiMuc()" title="Thu nhỏ còn 1 dải / mở ra"></button>'+
      '<button class="nho" onclick="hsNoiDong()" title="Đưa về ô trong app">↩</button></div>'+
      '<div class="cc-than">'+ccHSSVHTML()+'</div>'+
      '<div id="hs-mini" class="hs-mini" onclick="hsChep()" title="Bấm để chép câu chốt">'+hsMiniHTML()+'</div>'+
      '<button class="nho hs-chi-nut" id="hs-chi-nut" onclick="hsNoiChi()"></button>'+
      '<div class="tac-gia hs-tac-gia">NhanNT</div><div id="hs-noi-bao" class="hs-noi-bao"></div></div>';
  } finally { HS_VE_NOI = false; }
}
function hsNoiBao(t){ var e = hsEl('hs-noi-bao'); if(!e) return; e.textContent = t; e.classList.add('hien'); clearTimeout(hsNoiBao.t); hsNoiBao.t = setTimeout(function(){ e.classList.remove('hien'); }, 3000); }
function hsNoi(){
  if(HS_PIP){ try{ HS_PIP.focus(); }catch(e){} return; }
  if(!window.documentPictureInPicture || !documentPictureInPicture.requestWindow) return bao('📌 Cửa sổ nổi cần Chrome hoặc Edge bản mới (từ 116) — trình duyệt này chưa hỗ trợ. Có thể dùng công cụ HanTraHSSV.exe (thư mục tools/hssv).', 7);
  HS_NOI_MUC = 'gon';   /* 3.103: mỗi lần mở bắt đầu ở mức thu gọn */
  documentPictureInPicture.requestWindow({width:460, height:380}).then(function(w){
    var d = w.document, goc = document.documentElement;
    Array.prototype.forEach.call(goc.attributes, function(a){ if(a.name!=='class' || a.value) d.documentElement.setAttribute(a.name, a.value); });
    Array.prototype.forEach.call(document.querySelectorAll('style, link[rel=stylesheet]'), function(st){
      if(st.tagName!=='LINK') return d.head.appendChild(st.cloneNode(true));
      /* 3.142: CSS nằm ở file riêng (css/app.css) → chép luật sang; không đọc được (mở bằng file://) thì gắn link đường dẫn đầy đủ */
      var t = ''; try{ t = Array.prototype.map.call(st.sheet.cssRules, function(r){ return r.cssText; }).join('\n'); }catch(e){}
      if(t){ var s2 = d.createElement('style'); s2.textContent = t; d.head.appendChild(s2); }
      else { var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = st.href; d.head.appendChild(l); }
    });
    var them = d.createElement('style');
    them.textContent = 'body{margin:0;padding:8px;background:var(--nen,#fff);overflow:auto}.hs-noi{border:0;box-shadow:none;margin:0}.hs-noi .cc-dau{flex-wrap:wrap}'+
      '.hs-noi-bao{position:fixed;left:8px;right:8px;bottom:8px;background:#1e6a33;color:#fff;border-radius:8px;padding:6px 10px;font-size:13px;opacity:0;transition:opacity .2s;pointer-events:none}.hs-noi-bao.hien{opacity:1}'+
      /* 3.103: 3 mức — nho (1 dải) · gon (5 khối + câu chốt) · chi (thêm bảng, kỳ trả, cách tính) */
      '.hs-tac-gia{margin-top:6px}.hs-m-nho .hs-tac-gia{display:none}.hs-mini{display:none}.hs-chi-nut{display:block;width:100%;margin:6px 0 0}'+
      '.hs-m-gon .hs-bang,.hs-m-gon .hs-ct{display:none}'+
      '.hs-m-nho #hs-kq,.hs-m-nho .hs-luuy,.hs-m-nho .hs-loai,.hs-m-nho .hs-o-gon,.hs-m-nho .hs-nhap .hs-o:first-child,.hs-m-nho .hs-chi-nut,.hs-m-nho #hs-noi-mau,.hs-m-nho .hs-noi-todo{display:none}'+
      '.hs-m-nho .hs-nhap.hs-nhap2{grid-template-columns:1fr .8fr}'+
      '.hs-m-nho .hs-mini{display:block;margin-top:6px;padding:7px 10px;border-radius:8px;background:#1e6a33;color:#fff;font-weight:700;font-size:13px;cursor:pointer;line-height:1.35}';
    d.head.appendChild(them);
    d.title = '🎓 Hạn trả HSSV';
    d.body.className = document.body.className;
    HS_NOI_HAM.forEach(function(n){ w[n] = function(){ return window[n].apply(window, arguments); }; });
    HS_PIP = w;
    d.body.innerHTML = hsNoiHTML();
    var mau = ''; try{ mau = localStorage.getItem('tuhoso_hs_noi_mau')||''; }catch(e){}
    if(mau) d.documentElement.setAttribute('data-theme', mau);
    hsNoiVe();
    w.addEventListener('pagehide', function(){ HS_PIP = null; if(ccTim('hssv') && (CC.mo==='hssv' || CC.hop==='hssv')) ccVeLai('hssv'); });
    if(CC.mo==='hssv' || CC.hop==='hssv') ccVeLai('hssv');
    var o = hsEl('hs-rt'); if(o){ o.focus(); o.select(); }
  }).catch(function(e){ bao('📌 Không mở được cửa sổ nổi: '+(e && e.message || e), 6); });
}
function hsNoiToi(){ var d = HS_PIP.document, t = d.documentElement.getAttribute('data-theme');
  return t ? t==='dark' : !!(HS_PIP.matchMedia && HS_PIP.matchMedia('(prefers-color-scheme: dark)').matches); }
/* vẽ lại phần riêng của cửa sổ nổi theo mức + nền, rồi co giãn chiều cao cho vừa */
function hsNoiVe(){
  if(!HS_PIP) return;
  var d = HS_PIP.document;
  d.body.className = String(d.body.className||'').replace(/\s*hs-m-\w+/g, '')+' hs-m-'+HS_NOI_MUC;
  var mi = hsEl('hs-mini'); if(mi) mi.innerHTML = hsMiniHTML();
  var bn = hsEl('hs-noi-nho'); if(bn) bn.textContent = HS_NOI_MUC==='nho' ? '▢' : '▁';
  var bc = hsEl('hs-chi-nut'); if(bc) bc.textContent = HS_NOI_MUC==='chi' ? '▴ Thu gọn' : '▾ Chi tiết';
  var bm = hsEl('hs-noi-mau'); if(bm) bm.textContent = hsNoiToi() ? '☀' : '🌙';
  hsNoiCoVua();
}
function hsNoiCoVua(){
  var w = HS_PIP; if(!w) return;
  try{
    var hop = w.document.querySelector('.hs-noi'); if(!hop) return;
    var can = Math.ceil(hop.getBoundingClientRect().height + 16 + (w.outerHeight - w.innerHeight));
    can = Math.min(can, (w.screen && w.screen.availHeight || 900) - 40);
    if(Math.abs(can - w.outerHeight) > 8) w.resizeTo(w.outerWidth, can);   /* cần thao tác người dùng (bấm / gõ) — không được thì bỏ qua */
  }catch(e){}
}
function hsNoiMuc(){ HS_NOI_MUC = HS_NOI_MUC==='nho' ? 'gon' : 'nho'; hsNoiVe(); var o = hsEl('hs-rt'); if(o) o.focus(); }
function hsNoiChi(){ HS_NOI_MUC = HS_NOI_MUC==='chi' ? 'gon' : 'chi'; hsNoiVe(); }
function hsNoiMau(){
  if(!HS_PIP) return;
  var m = hsNoiToi() ? 'light' : 'dark';
  HS_PIP.document.documentElement.setAttribute('data-theme', m);
  try{ localStorage.setItem('tuhoso_hs_noi_mau', m); }catch(e){}
  hsNoiVe();
}
function hsNoiDong(){ var w = HS_PIP; if(!w) return; HS_PIP = null; try{ w.close(); }catch(e){} if(CC.mo==='hssv' || CC.hop==='hssv') ccVeLai('hssv'); }

/* ---------- W② CÂY ĐỊA BÀN — mã xã · mã điểm GD · mã ấp/KP, xếp theo mã ---------- */
function dbSoMa(a, b){ var x = String(a.ma||''), y = String(b.ma||'');
  if(!x && !y) return String(a.xa||a.ten||'').localeCompare(String(b.xa||b.ten||''), 'vi');
  if(!x) return 1; if(!y) return -1; return x.localeCompare(y, 'vi', {numeric:true}); }
function dbMa(ma){ return ma ? '<code class="db-ma" onclick="event.stopPropagation();event.preventDefault();ccChep(\''+coChuHTML(ma)+'\')" title="Bấm để chép mã">'+coChuHTML(ma)+'</code>' : '<code class="db-ma trong">chưa có mã</code>'; }
function dbTim(el){ CC.db.tim = el.value; var t = document.getElementById('db-cay'); if(t) t.innerHTML = dbCayHTML(); }
function dbCayHTML(){
  var q = boDau(String(CC.db.tim||'')).toLowerCase().trim();
  var khop = function(){ if(!q) return true; for(var i=0;i<arguments.length;i++){ if(boDau(String(arguments[i]||'')).toLowerCase().indexOf(q)>=0) return true; } return false; };
  var ds = (D.cauHinh.diaBan||[]).slice().sort(dbSoMa), h = '', n = 0;
  ds.forEach(function(x){
    var diem = (x.diem||[]).slice().sort(dbSoMa), hx = '', coX = khop(x.xa, x.ma);
    diem.forEach(function(d){
      var ap = (d.ap||[]).slice().sort(dbSoMa), coD = coX || khop(d.ten, d.ma), ha = '';
      ap.forEach(function(a){
        if(!(coD || khop(a.ten, a.ma))) return;
        n++;
        ha += '<div class="db-ap">'+dbMa(a.ma)+' '+coChuHTML(a.ten)+((a.to||[]).length?' <small>· '+a.to.length+' tổ</small>':'')+'</div>';
      });
      if(!ha && !coD) return;
      hx += '<details class="db-d"'+(q?' open':'')+'><summary>'+dbMa(d.ma)+' <b>'+coChuHTML(d.ten)+'</b>'+(d.ngay?' <span class="db-gd">GD ngày '+coChuHTML(d.ngay)+'</span>':'')+' <small>· '+ap.length+' ấp/KP</small></summary>'+ha+'</details>';
    });
    if(!hx && !coX) return;
    h += '<details class="db-x" open><summary>'+dbMa(x.ma)+' <b>'+coChuHTML(x.xa)+'</b> <small>· '+(x.diem||[]).length+' điểm GD</small></summary>'+hx+'</details>';
  });
  if(!ds.length) return '<div class="huong-dan">Chưa có danh mục địa bàn — khai ở ⚙ Cài đặt › Địa bàn.</div>';
  if(!h) return '<div class="huong-dan">Không thấy "'+coChuHTML(CC.db.tim)+'" trong danh mục.</div>';
  return h + (q ? '<div class="huong-dan">'+n+' ấp/KP khớp.</div>' : '');
}
function ccDiaBanHTML(){
  return '<div class="db-tren"><input id="db-tim" value="'+coChuHTML(CC.db.tim||'')+'" placeholder="Tìm tên / mã ấp, KP, điểm, xã (không dấu cũng được)" oninput="dbTim(this)">'+
    '<button class="nho" onclick="dbChepBang()" title="Chép cả danh mục dạng bảng — dán vào Excel">📋 Chép bảng</button>'+
    '<button class="nho" onclick="ccDong();moCaiDat(\'diaban\')" title="Ấp/KP gộp, tách: sửa ở Cài đặt, cây tự cập nhật">✎ Sửa danh mục</button></div>'+
    '<div class="db-cay" id="db-cay">'+dbCayHTML()+'</div>';
}
function dbChepBang(){
  var dong = [['Mã xã','Xã/phường','Mã điểm GD','Điểm GD','Ngày GD','Mã ấp/KP','Ấp/KP','Số tổ'].join('\t')];
  (D.cauHinh.diaBan||[]).slice().sort(dbSoMa).forEach(function(x){
    (x.diem||[]).slice().sort(dbSoMa).forEach(function(d){
      var ap = (d.ap||[]).slice().sort(dbSoMa);
      if(!ap.length) dong.push([x.ma||'', x.xa, d.ma||'', d.ten, d.ngay||'', '', '', ''].join('\t'));
      ap.forEach(function(a){ dong.push([x.ma||'', x.xa, d.ma||'', d.ten, d.ngay||'', a.ma||'', a.ten, (a.to||[]).length].join('\t')); });
    });
  });
  chepChu(dong.join('\n'), '📋 Đã chép bảng địa bàn ('+(dong.length-1)+' dòng) — dán vào Excel.');
}
/* ---------- trang NHẬT KÝ CÔNG VIỆC (giấy vàng) của ngày đang chọn ---------- */
/* ==========================================================
   GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
     Đơn giản: một ô chữ trên giấy vàng (giữ y như bản 3.11) = mẩu "Ghi chép chung" của ngày
     Note:     lưới mẩu giấy màu, ghim, sửa tại chỗ
   Mẩu: {id, ngay, nd, mau:'vang|do|cam|xanh|trang', ghim, taoLuc, suaLuc}
   ========================================================== */
var NT_MAU = {vang:'Giấy vàng', do:'Việc gấp', cam:'Quan trọng', xanh:'Lưu ý', trang:'Ghi chép chung'};
function ntData(){
  var L = lcData(); L.note = L.note || []; L.noteXoa = L.noteXoa || [];
  /* chuyển ghi chép cũ (nhatKy) thành mẩu Ghi chép chung, chỉ làm một lần cho mỗi ngày */
  var nk = L.nhatKy || {};
  Object.keys(nk).forEach(function(ng){
    var t = (nk[ng]||{}).text || '';
    if(!t.trim()) return;
    if(L.note.some(function(x){ return x.ngay===ng && x.chung; })) return;
    L.note.push({id:'nk_'+ng, ngay:ng, nd:t, mau:'trang', chung:true, ghim:false,
      taoLuc:nk[ng].suaLuc||new Date().toISOString(), suaLuc:nk[ng].suaLuc||new Date().toISOString()});
  });
  return L;
}
/* ==========================================================
   SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
   mỗi dòng một mục, Enter xuống dòng mới, tick xong, đổi màu, xóa, đưa lên SCHEDULE
   Dùng chung kho với Note màu: mẩu có kieu:'dong'
   ========================================================== */
function dsDong(iso){
  return ntData().note.filter(function(x){ return x.ngay===iso && x.kieu==='dong'; })
    .sort(function(a,b){
      return ((a.thuTu===undefined?9999:a.thuTu) - (b.thuTu===undefined?9999:b.thuTu)) ||
             (a.taoLuc||'').localeCompare(b.taoLuc||'');
    });
}
/* ghi chép cũ (một khối chữ dài) → tách theo dòng xuống hàng thành các mục, không mất chữ */
function tachChungThanhDong(iso){
  var m = ntChung(iso); if(!m || !(m.nd||'').trim()) return 0;
  var L = ntData(), t = new Date().toISOString(), n = 0, i = 0;
  (m.nd||'').split('\n').forEach(function(d){
    if(!d.trim()) return;
    L.note.push({id:idMoi(), ngay:iso, nd:d.trim(), mau:'trang', kieu:'dong', xong:'',
      thuTu:i++, taoLuc:t, suaLuc:t});
    n++;
  });
  L.note = L.note.filter(function(x){ return x.id!==m.id; });
  L.noteXoa.push({id:m.id, luc:t});
  /* xóa chữ ở kho cũ để lần vẽ sau không dựng lại mẩu chung rồi tách thêm lần nữa */
  L.nhatKy = L.nhatKy || {};
  if(L.nhatKy[iso]) L.nhatKy[iso] = {text:'', suaLuc:t};
  if(n) luu();
  return n;
}
function dongThem(iso, chu, mau, choRong){
  if(!choRong && !(chu||'').trim()) return null;   /* 3.31: choRong — Enter giữa danh sách tạo dòng trống để gõ tiếp */
  var t = new Date().toISOString(), ds = dsDong(iso);
  var m = {id:idMoi(), ngay:iso, nd:chu.trim(), mau:mau||'trang', kieu:'dong', xong:'',
    thuTu:(ds.length?(ds[ds.length-1].thuTu||ds.length-1)+1:0), taoLuc:t, suaLuc:t};
  ntData().note.push(m); luu(); henDongBoLich();
  return m;
}
function dongGoThem(el, iso, ev){
  ev = ev || window.event;   /* 3.31: nút Thêm truyền {key:'Enter'} — trước đây bị bỏ qua nên bấm nút không có tác dụng */
  if(!ev || ev.key!=='Enter') return;
  if(ev.preventDefault) ev.preventDefault();
  var m = dongThem(iso, el.value); if(!m) return;
  el.value = '';
  veNhatKy();
  var o = document.getElementById('nk-dong-moi'); if(o) o.focus();
}
/* ==========================================================
   HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
   tick xong, đổi màu, đưa lên SCHEDULE. Ctrl+Z hoặc nút ↶ ở đáy sổ.
   Dòng đã xóa vẫn nằm trong thùng rác của Lịch 30 ngày (lớp an toàn thứ hai).
   ========================================================== */
var HOAN_TAC = [];
function ghiHoanTac(ten, ham){
  HOAN_TAC.push({ten:ten, ham:ham, luc:Date.now()});
  if(HOAN_TAC.length > 20) HOAN_TAC.shift();
}
function hoanTac(){
  var b = HOAN_TAC.pop();
  if(!b) return bao('Không còn bước nào để hoàn tác.', 3);
  try{ b.ham(); }catch(e){ console.warn(e); return baoLoi('Không hoàn tác được bước này.'); }
  luu(); henDongBoLich(); veLich();
  bao('Đã hoàn tác: '+b.ten+(HOAN_TAC.length?' · còn '+HOAN_TAC.length+' bước':''), 4);
}
function soHoanTac(){ return HOAN_TAC.length; }
function dongXong(id){
  var m = ntTim(id); if(!m) return;
  var cu = m.xong;
  m.xong = m.xong ? '' : new Date().toISOString();
  m.suaLuc = new Date().toISOString();
  ghiHoanTac(m.xong?'đánh dấu xong':'bỏ đánh dấu xong', function(){
    var x = ntTim(id); if(x) x.xong = cu;
  });
  luu(); henDongBoLich(); veNhatKy();
}
function menuDong(id, ev){
  ev && ev.stopPropagation();
  var m = ntTim(id); if(!m) return;
  moHop('<div class="hop-tit">Dòng ghi chép</div>'+
    '<div class="hop-phu">'+coChuHTML((m.nd||'').slice(0,90))+'</div>'+
    '<div class="o"><label>Màu dòng</label><div class="chip-gon mo" style="gap:7px">'+
      Object.keys(NT_MAU).map(function(k){
        return '<span class="the-loc nt-'+k+(m.mau===k?' bat':'')+'" onclick="dongDoiMau(\''+id+'\',\''+k+'\')">'+NT_MAU[k]+'</span>';
      }).join('')+'</div></div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="dongLenLich(\''+id+'\')">🕘 Đưa lên SCHEDULE</button>'+
      '<button class="nho" onclick="dongChuyen(\''+id+'\',-1)">↑ Lên trên</button>'+
      '<button class="nho" onclick="dongChuyen(\''+id+'\',1)">↓ Xuống dưới</button></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho xau" onclick="dongXoa(\''+id+'\')">Xóa dòng</button></div>');
}
function dongDoiMau(id, mau){
  (function(){ var m0 = ntTim(id); if(m0) ghiHoanTac('đổi màu dòng', (function(cu){ return function(){ var x = ntTim(id); if(x) x.mau = cu; }; })(m0.mau)); })();
  var m = ntTim(id); if(!m) return;
  m.mau = mau; m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); dongHop(); veNhatKy();
}
/* xóa NGAY, không hỏi — có hoàn tác (anh chốt: ghi chú xóa thường xuyên, hỏi hoài rất rối) */
function dongXoa(ids){
  var L = ntData(), ds = (typeof ids==='string') ? [ids] : (ids||[]);
  var giu = L.note.filter(function(x){ return ds.indexOf(x.id)>=0; });
  if(!giu.length) return;
  L.note = L.note.filter(function(x){ return ds.indexOf(x.id)<0; });
  var luc = new Date().toISOString();
  giu.forEach(function(m){ L.noteXoa.push({id:m.id, luc:luc}); });
  var vaoRac = nkVaoRac(giu);   /* 3.52: dòng có ảnh / file riêng → thùng rác ngăn Hôm nay */
  ghiHoanTac('xóa '+giu.length+' dòng', function(){
    var K = ntData();
    if(vaoRac.length){ D.rac = (D.rac||[]).filter(function(x){ return vaoRac.indexOf(x.id)<0; }); capNhatDemRac(); }
    giu.forEach(function(m){ if(!K.note.some(function(x){ return x.id===m.id; })) K.note.push(m); });
    K.noteXoa = K.noteXoa.filter(function(x){ return ds.indexOf(x.id)<0; });
  });
  DONG_CHON = DONG_CHON.filter(function(x){ return ds.indexOf(x)<0; });
  luu(); henDongBoLich(); dongHop(); veNhatKy(); veLich();
  bao('Đã xóa '+giu.length+' dòng · bấm ↶ hoặc Ctrl+Z để lấy lại', 6);
}
/* chọn nhiều dòng bằng ô tick sẵn ở mỗi dòng */
var DONG_CHON = [];
function dongChon(id){
  var i = DONG_CHON.indexOf(id);
  if(i>=0) DONG_CHON.splice(i,1); else DONG_CHON.push(id);
  veNhatKy();
}
function dongChonHet(iso){
  var ds = dsDong(iso).map(function(m){ return m.id; });
  DONG_CHON = (DONG_CHON.length===ds.length) ? [] : ds;
  veNhatKy();
}
function dongBoChon(){ DONG_CHON = []; veNhatKy(); }
function dongMauNhieu(mau){
  var luc = new Date().toISOString(), cu = [];
  DONG_CHON.forEach(function(id){ var m = ntTim(id); if(m){ cu.push({id:id, mau:m.mau}); m.mau = mau; m.suaLuc = luc; } });
  ghiHoanTac('đổi màu '+cu.length+' dòng', function(){
    cu.forEach(function(x){ var m = ntTim(x.id); if(m) m.mau = x.mau; });
  });
  luu(); henDongBoLich(); veNhatKy();
}
function dongChuyen(id, huong){
  var m = ntTim(id); if(!m) return;
  var ds = dsDong(m.ngay), i = ds.findIndex(function(x){ return x.id===id; }), j = i+huong;
  if(i<0 || j<0 || j>=ds.length) return;
  ds.forEach(function(x,k){ x.thuTu = k; });
  var tmp = ds[i].thuTu; ds[i].thuTu = ds[j].thuTu; ds[j].thuTu = tmp;
  ds[i].suaLuc = ds[j].suaLuc = new Date().toISOString();
  luu(); henDongBoLich(); dongHop(); veNhatKy();
}
/* đưa một dòng lên SCHEDULE (việc theo lịch) */
function dongLenLich(id){
  var m = ntTim(id); if(!m) return;
  dongHop();
  moHop('<div class="hop-tit">Đưa lên SCHEDULE</div>'+
    '<div class="hop-phu">'+coChuHTML(m.nd||'')+'</div>'+
    '<div class="hai"><div class="o"><label>Ngày</label><input id="dl-ngay" inputmode="numeric" '+
      'value="'+ngayVN(m.ngay)+'" oninput="gonNgay(this)"></div>'+
    '<div class="o"><label>Lặp lại</label><select id="dl-lap">'+
      Object.keys(LC_LAP).map(function(k){ return '<option value="'+k+'">'+LC_LAP[k]+'</option>'; }).join('')+
      '</select></div></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" onclick="dongLenLichOK(\''+id+'\')">Đưa lên</button></div>');
}
function dongLenLichOK(id){
  var m = ntTim(id); if(!m) return;
  var iso = ngayISOo(gt('dl-ngay'));
  if(!iso) return baoLoi('Ngày chưa đúng, gõ dạng dd/mm/yyyy.');
  var t = new Date().toISOString();
  lcData().viec.push({id:idMoi(), ten:m.nd, ngay:iso, lap:gt('dl-lap')||'mot', luuY:false,
    xong:false, xongNgay:{}, bo:[], taoLuc:t, suaLuc:t});
  var L = ntData();
  L.note = L.note.filter(function(x){ return x.id!==id; });
  L.noteXoa.push({id:id, luc:t});
  luu(); henDongBoLich(); dongHop(); veLich(); veNhatKy();
  bao('Đã đưa lên SCHEDULE ngày '+lcDMY(iso)+'.', 5);
}
/* việc hôm qua chưa xong → chuyển sang hôm nay */
function dongChuaXongHomQua(iso){
  return dsDong(lcCong(iso,-1)).filter(function(x){ return !x.xong; });
}
function dongChuyenHomQua(iso){
  var ds = dongChuaXongHomQua(iso), t = new Date().toISOString();
  ds.forEach(function(m){ m.ngay = iso; m.suaLuc = t; });
  luu(); henDongBoLich(); veNhatKy(); veLich();
  bao('Đã chuyển '+ds.length+' việc chưa xong sang hôm nay.', 4);
}
function ntCheDo(){ return D.cauHinh.nkChe==='note' ? 'note' : 'don'; }
/* Enter ở giữa danh sách = thêm dòng mới ngay dưới; ô rỗng + Backspace = xóa dòng */
function dongPhim(ev, id, iso){
  if(ev.key==='Enter'){
    ev.preventDefault();
    var m = ntTim(id), ds = dsDong(iso);
    ds.forEach(function(x,k){ if(x.thuTu===undefined) x.thuTu = k; });
    var moi = dongThem(iso, '', null, true);
    if(moi && m){ moi.thuTu = (m.thuTu||0)+0.5; moi.nd=''; luu(); }
    veNhatKy();
    var o = document.querySelectorAll('.dong-o .dong-chu');
    for(var i=0;i<o.length;i++) if(!o[i].value.trim()){ o[i].focus(); break; }
  }else if(ev.key==='Backspace' && !ev.target.value){
    ev.preventDefault(); dongXoa(id);
  }
}
function dongCaoTuDong(el){ el.style.height='auto'; el.style.height=(el.scrollHeight)+'px'; }
function ntDatChe(che){
  if(ntCheDo()===che) return;
  D.cauHinh.nkChe = che; luu(); veNhatKy();
  bao(che==='note' ? 'Chế độ Note: mẩu giấy màu, ghim được. Chữ cũ vẫn còn nguyên.'
                   : 'Chế độ Đơn giản: một ô ghi chép như trước.', 4);
}
function ntDoiChe(){
  D.cauHinh.nkChe = ntCheDo()==='note' ? 'don' : 'note'; luu(); veNhatKy();
  bao(ntCheDo()==='note' ? 'Chế độ Note: mẩu giấy màu, ghim được. Chữ cũ vẫn còn nguyên.'
                         : 'Chế độ Đơn giản: một ô ghi chép như trước.', 5);
}
function ntNgay(iso){
  /* xếp ổn định: ghim trước, rồi theo thứ tự anh sắp (thuTu), rồi theo lúc tạo — KHÔNG theo lúc sửa
     (nếu theo lúc sửa thì mẩu nhảy chỗ ngay khi đang gõ) */
  return ntData().note.filter(function(x){ return x.ngay===iso; })
    .sort(function(a,b){
      return (b.ghim?1:0)-(a.ghim?1:0) ||
             ((a.thuTu===undefined?9999:a.thuTu) - (b.thuTu===undefined?9999:b.thuTu)) ||
             (a.taoLuc||'').localeCompare(b.taoLuc||'');
    });
}
function ntGhim(){ return ntData().note.filter(function(x){ return x.ghim; })
  .sort(function(a,b){ return (b.suaLuc||'').localeCompare(a.suaLuc||''); }); }
/* mẩu "Ghi chép chung" của ngày — CHỈ tạo khi thật sự có chữ, để không đẻ mẩu rỗng */
function ntChung(iso, tao){
  var L = ntData(), m = L.note.find(function(x){ return x.ngay===iso && x.chung; });
  if(!m && tao){ var t = new Date().toISOString();
    m = {id:idMoi(), ngay:iso, nd:'', mau:'trang', chung:true, ghim:false, taoLuc:t, suaLuc:t};
    L.note.push(m); }
  return m || null;
}
/* gõ ở chế độ Đơn giản: tạo mẩu chung ngay lần gõ đầu */
function ntGoChung(iso, el){
  var m = ntChung(iso, true);
  clearTimeout(NT_HEN[m.id]);
  NT_HEN[m.id] = setTimeout(function(){ ntLuuO(m.id, el.value); }, 600);
}
function ntTim(id){ return ntData().note.find(function(x){ return x.id===id; }); }
/* 3.18: lưu KHÔNG vẽ lại gì — trước đây vẽ lại lịch + sổ nên ô đang gõ bị thay,
   mất chỗ nhập, phải bấm lại mỗi chữ */
function ntLuuO(id, giaTri){
  var m = ntTim(id); if(!m) return;
  m.nd = giaTri; m.suaLuc = new Date().toISOString();
  luu();
  var t = document.getElementById('nt-luu-'+id) || document.getElementById('nk-luu');
  if(t) t.textContent = 'đã lưu '+m.suaLuc.slice(11,16);
  capNhatChamNgay(m.ngay);     /* chỉ sửa đúng 1 ô ngày trên lịch */
}
/* đổi chấm của một ngày trên lịch mà không vẽ lại cả lịch */
function capNhatChamNgay(iso){
  var o = document.querySelector('.lc-o[data-iso="'+iso+'"]'); if(!o) return;
  var vs = lcViecNgay(iso), co = vs.length || ntData().note.some(function(x){ return x.ngay===iso && (x.nd||'').trim(); });
  var mau = vs.some(function(v){ return v.luuY; }) ? 'cam' : (vs.length ? 'xanh' : 'nau');
  var i = o.querySelector('.lc-cham');
  if(!co){ if(i) i.remove(); return; }
  if(!i){ i = document.createElement('i'); o.appendChild(i); }
  i.className = 'lc-cham '+mau;
}
/* rời ô mới đẩy lên Drive — gõ tới đâu đồng bộ tới đó là thừa */
function ntRoiO(id){ henDongBoLich(); }
var NT_HEN = {};
function ntGo(id, el){
  var t = document.getElementById('nt-luu-'+id) || document.getElementById('nk-luu');
  if(t) t.textContent = 'đang gõ…';
  clearTimeout(NT_HEN[id]);
  NT_HEN[id] = setTimeout(function(){ ntLuuO(id, el.value); }, 400);
}
function ntThem(mau){
  var t = new Date().toISOString();
  ntData().note.push({id:idMoi(), ngay:LICH.chon, nd:'', mau:mau||'vang', ghim:false, taoLuc:t, suaLuc:t});
  luu(); henDongBoLich(); veNhatKy();
  setTimeout(function(){
    var o = document.querySelector('#nt-luoi .nt-o textarea'); if(o) o.focus();
  }, 30);
}
function ntDoiMau(id, mau){
  var m = ntTim(id); if(!m) return;
  m.mau = mau; m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veNhatKy();
}
function ntDoiGhim(id){
  var m = ntTim(id); if(!m) return;
  m.ghim = !m.ghim; m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veNhatKy();
  bao(m.ghim ? 'Đã ghim — mẩu này luôn hiện dù đổi ngày.' : 'Đã bỏ ghim.', 3);
}
function ntXoa(id){
  var m = ntTim(id); if(!m) return;
  hoi('Xóa mẩu ghi chú này?', ((m.nd||'').slice(0,80)||'(mẩu trống)')+((m.dinh||[]).some(function(f){ return f.k==='rieng'; }) ? ' — ảnh / file của mẩu vào thùng rác, khôi phục được' : ''), 'Xóa', function(){
    var L = ntData();
    L.note = L.note.filter(function(x){ return x.id!==id; });
    L.noteXoa.push({id:id, luc:new Date().toISOString()});
    nkVaoRac([m]);
    luu(); henDongBoLich(); veNhatKy(); veLich();
  });
}
/* đổi chỗ (điện thoại dùng nút, máy bàn kéo thả) */
function ntChuyen(id, huong){
  var ds = ntNgay(LICH.chon), i = ds.findIndex(function(x){ return x.id===id; });
  var j = i + huong; if(i<0 || j<0 || j>=ds.length) return;
  ds.forEach(function(x,k){ x.thuTu = k; });
  var a = ds[i], b = ds[j]; var tmp = a.thuTu; a.thuTu = b.thuTu; b.thuTu = tmp;
  a.suaLuc = b.suaLuc = new Date().toISOString();
  luu(); henDongBoLich(); veNhatKy();
}
var NT_KEO = null;
function ntKeoBatDau(id){ NT_KEO = id; }
function ntKeoTha(id){
  if(!NT_KEO || NT_KEO===id) return;
  var ds = ntNgay(LICH.chon);
  ds.forEach(function(x,k){ if(x.thuTu===undefined) x.thuTu = k; });
  var a = ntTim(NT_KEO), b = ntTim(id);
  if(a && b){ var t = a.thuTu; a.thuTu = b.thuTu; b.thuTu = t;
    a.suaLuc = b.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veNhatKy(); }
  NT_KEO = null;
}
/* ==========================================================
   ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
   m.dinh = [{k:'rieng'|'muc'|'scan'|'ka', id, ten, co, loai, anh, driveId, driveCha, may, themLuc}]
   Ảnh chụp thu về cạnh dài 1600 px (JPEG ~300 KB) + ảnh nhỏ 240 px (id+'_nho') để danh sách nhẹ.
   File riêng: IndexedDB 'nf…', lên Drive: Tủ hồ sơ / Nhật ký / YYYY-MM. lich.json chỉ giữ tên + mã file.
   Xóa dòng có file riêng → thùng rác ngăn 📅 Hôm nay (khoCu:'homNay'), khôi phục về đúng ngày.
   ========================================================== */
var NK_CANH = 1600, NK_NHO = 240, NK_TRAN = 15*1024*1024, NK_URL = {}, NK_DANG = {};
/* thu nhỏ ảnh: cạnh dài tối đa `canh`, nền trắng, JPEG chất lượng cl */
function nkAnhRa(file, canh, cl){
  return new Promise(function(ok, loi){
    var u = URL.createObjectURL(file), im = new Image();
    im.onload = function(){
      var w = im.naturalWidth, h = im.naturalHeight, r = Math.min(1, canh/Math.max(w, h));
      var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w*r)); c.height = Math.max(1, Math.round(h*r));
      var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(u);
      c.toBlob(function(b){ if(b) ok(b); else loi(new Error('Không nén được ảnh')); }, 'image/jpeg', cl);
    };
    im.onerror = function(){ URL.revokeObjectURL(u); loi(new Error('Không đọc được ảnh')); };
    im.src = u;
  });
}
function nkGioChu(d){ return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }
function tenAnhNK(){
  var d = new Date();
  return lcDMY(lcISO(d)).replace(/\//g, '-')+' '+('0'+d.getHours()).slice(-2)+'h'+('0'+d.getMinutes()).slice(-2)+'m'+('0'+d.getSeconds()).slice(-2)+'.jpg';
}
/* lưu một file vào mục m (ảnh thì nén + làm ảnh nhỏ) */
function nkLuuFile(m, file, chup){
  var id = 'nf'+idMoi(), anh = /^image\//.test(file.type||'');
  var buoc = anh ? nkAnhRa(file, NK_CANH, 0.72).then(function(b){
      return (b.size >= file.size && /jpe?g/i.test(file.type)) ? file : b;   /* ảnh vốn đã nhẹ thì giữ bản gốc */
    }).catch(function(){ return file; }) : Promise.resolve(file);
  return buoc.then(function(b){
    var viec = [luuFile(id, b)];
    if(anh) viec.push(nkAnhRa(b, NK_NHO, 0.6).then(function(n){ return luuFile(id+'_nho', n); }).catch(function(){}));
    return Promise.all(viec).then(function(){
      var ten = chup ? tenAnhNK() : (file.name || tenAnhNK());
      if(anh && b!==file) ten = /\.[a-z0-9]{2,5}$/i.test(ten) ? ten.replace(/\.[a-z0-9]{2,5}$/i, '.jpg') : ten+'.jpg';
      m.dinh = m.dinh || [];
      m.dinh.push({k:'rieng', id:id, ten:ten, co:b.size, loai:b.type||file.type||'', anh:anh, may:maMayCua(), themLuc:new Date().toISOString()});
      return b.size;
    });
  });
}
/* mở camera (chup) hoặc hộp chọn file — phải gọi ngay trong lần bấm */
function nkChonFile(chup, cb){
  var i = document.createElement('input'); i.type = 'file';
  if(chup){ i.accept = 'image/*'; i.capture = 'environment'; } else i.multiple = true;
  i.onchange = function(){ var ds = Array.prototype.slice.call(i.files||[]); if(ds.length) cb(ds); };
  i.click();
}
function nkThemVao(id, ds, chup){
  var m = ntTim(id); if(!m) return Promise.resolve();
  var nang = ds.filter(function(f){ return f.size > NK_TRAN && !/^image\//.test(f.type||''); });
  var lam = function(){
    bao(chup ? 'Đang lưu ảnh…' : 'Đang lưu '+ds.length+' file…', 2);
    return ds.reduce(function(p, f){ return p.then(function(){ return nkLuuFile(m, f, chup); }); }, Promise.resolve()).then(function(){
      m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veLich();
      var co = (m.dinh||[]).slice(-ds.length).reduce(function(a, f){ return a+(+f.co||0); }, 0);
      bao((chup ? 'Đã lưu ảnh' : 'Đã gắn '+ds.length+' file')+' ('+kichCo(co)+')'+(coTheNoiDrive() ? ' · đang đưa lên Drive…' : '')+'.', 3);
      dayFileNKCho();
    }).catch(function(e){ baoLoi('Không lưu được: '+(e && e.message || e)); });
  };
  if(nang.length){
    hoi('File nặng', nang.map(function(f){ return f.name+' ('+kichCo(f.size)+')'; }).join(', ')+
      ' — trên 15 MB, lưu vào máy và đưa lên Drive sẽ lâu. Vẫn gắn?', 'Vẫn gắn', lam);
    return Promise.resolve();
  }
  return lam();
}
/* 📷 một chạm: chụp xong tự tạo dòng "📷 Ảnh 14:32" (chế độ Note màu: một mẩu) của ngày đang chọn */
function nkChupNhanh(){
  nkChonFile(true, function(ds){ nkTaoDongAnh(ds, true); });
}
function nkTaoDongAnh(ds, chup){
  lcDau();
  var iso = LICH.chon || lcISO(nay()), nd = (chup ? '📷 Ảnh ' : '📎 File ')+nkGioChu(new Date()), m;
  if(ntCheDo()==='note'){
    var t = new Date().toISOString();
    m = {id:idMoi(), ngay:iso, nd:nd, mau:'vang', ghim:false, taoLuc:t, suaLuc:t};
    ntData().note.push(m);
  } else m = dongThem(iso, nd);
  return nkThemVao(m.id, ds, chup);
}
/* 📎 trên một dòng / mẩu: chụp thêm · chọn file trong máy · file có sẵn trong tủ */
function nkMenuDinh(id){
  var m = ntTim(id); if(!m) return;
  moHop('<div class="hop-tit">📎 Gắn vào dòng này</div>'+
    '<div class="hop-phu">'+coChuHTML((m.nd||'(dòng trống)').slice(0,90))+'</div>'+
    '<div class="nk-chon3">'+
      '<button class="nho chinh" onclick="dongHop();nkChonFile(true,function(d){nkThemVao(\''+id+'\',d,true)})">📷 Chụp ảnh</button>'+
      '<button class="nho" onclick="dongHop();nkChonFile(false,function(d){nkThemVao(\''+id+'\',d,false)})">📁 Chọn file trong máy</button>'+
      '<button class="nho" onclick="moGanFileNK(\''+id+'\')">🔗 File có sẵn trong tủ</button></div>'+
    '<div class="hop-phu">Ảnh tự thu nhỏ (cạnh dài 1600 px, khoảng 200–400 KB) — vẫn đọc rõ giấy tờ. PDF, Word giữ nguyên. '+
      'Có nối Drive thì file lên <i>'+coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ')+' / Nhật ký / tháng</i>.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button></div>');
}
function moGanFileNK(id){
  GAN = {bo:'', nk:id, tim:''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào dòng</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó. Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
  veGanDS();
  setTimeout(function(){ var o = document.getElementById('gan-tim'); if(o) o.focus(); }, 30);
}
function tenFileNK(f){
  if(f.k==='rieng') return f.ten||'';
  var m = fileBoMuc(f);
  return m ? (m.tenMoi||m.ten||m.tenCu||f.ten||'') : (f.ten||'(file)')+' — không còn';
}
function nkDinhHTML(m){
  var ds = m.dinh||[]; if(!ds.length) return '';
  return '<div class="nk-dinh">'+ds.map(function(f, i){
    var go = '<button class="nk-go" title="'+(f.k==='rieng'?'Bỏ file này (vào thùng rác)':'Gỡ liên kết — file gốc giữ nguyên')+'" '+
      'onclick="event.stopPropagation();nkGo(\''+m.id+'\','+i+')">✕</button>';
    if(f.k==='rieng' && f.anh) return '<span class="nk-anh" onclick="nkXem(\''+m.id+'\','+i+')" title="'+coChuHTML(f.ten+(f.co?' · '+kichCo(f.co):''))+'">'+
      '<img data-nk="'+f.id+'" alt="">'+go+'</span>';
    var ic = f.k==='scan' ? '🪪' : f.k==='ka' ? '✍' : f.k==='rieng' ? '📎' : '📄';
    return '<span class="nk-tep" onclick="nkXem(\''+m.id+'\','+i+')" title="Bấm để xem">'+ic+' <span>'+coChuHTML(tenFileNK(f))+'</span>'+
      (f.co ? '<small>'+kichCo(f.co)+'</small>' : '')+go+'</span>';
  }).join('')+'</div>';
}
function nkTimFile(fid){
  var ra = null;
  ntData().note.some(function(m){ return (m.dinh||[]).some(function(f){ if(f.id===fid){ ra = f; return true; } }); });
  return ra;
}
/* ảnh nhỏ: có sẵn trong máy thì dùng; máy kia chưa có thì tải bản lớn từ Drive một lần rồi làm ảnh nhỏ */
function nkLayAnhNho(fid){
  if(NK_DANG[fid]) return NK_DANG[fid];
  NK_DANG[fid] = docFile(fid+'_nho').then(function(b){
    if(b) return b;
    var f = nkTimFile(fid); if(!f) return null;
    return layNoiDung({id:f.id, driveId:f.driveId, co:f.co}).then(function(to){
      if(!to) return null;
      return nkAnhRa(to, NK_NHO, 0.6).then(function(n){ luuFile(fid+'_nho', n); return n; }).catch(function(){ return to; });
    });
  }).then(function(b){
    delete NK_DANG[fid];
    if(b && !NK_URL[fid]) NK_URL[fid] = URL.createObjectURL(b);
    return NK_URL[fid] || null;
  }, function(){ delete NK_DANG[fid]; return null; });
  return NK_DANG[fid];
}
function nkNapAnhNho(){
  Array.prototype.forEach.call(document.querySelectorAll('img[data-nk]'), function(im){
    var fid = im.getAttribute('data-nk');
    if(NK_URL[fid]){ im.src = NK_URL[fid]; return; }
    nkLayAnhNho(fid).then(function(u){
      Array.prototype.forEach.call(document.querySelectorAll('img[data-nk="'+fid+'"]'), function(e){
        if(u) e.src = u; else if(e.parentNode) e.parentNode.classList.add('mat');
      });
    });
  });
}
/* xem: ảnh → khung xem lớn, vuốt / ‹ › qua lại; file khác → khung xem như các tab */
var NK_XEM = {nid:'', ds:[], i:0, x0:null};
function nkXem(nid, i){
  var m = ntTim(nid), f = m && (m.dinh||[])[i]; if(!f) return;
  if(f.k!=='rieng') return xemThu(f.k==='scan' ? 'scan' : f.k==='ka' ? 'ka' : 'muc', f.id);
  if(!f.anh){
    var t = {id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), driveId:f.driveId, co:f.co, khoCu:'homNay'};
    moXem(null, t);
    document.getElementById('x-phu').innerHTML = coChuHTML(nkDuong(m, f)+(f.co?' · '+kichCo(f.co):''));
    return;
  }
  var ds = []; (m.dinh||[]).forEach(function(x){ if(x.k==='rieng' && x.anh) ds.push(x); });
  NK_XEM = {nid:nid, ds:ds, i:Math.max(0, ds.indexOf(f)), x0:null};
  moHop('<div class="nk-lb" ontouchstart="NK_XEM.x0=event.touches[0].clientX" ontouchend="nkVuot(event)">'+
      '<button class="nk-lb-nut trai" onclick="nkLat(-1)">‹</button><img id="nk-lb-anh" alt="">'+
      '<button class="nk-lb-nut phai" onclick="nkLat(1)">›</button></div>'+
    '<div class="hop-phu" id="nk-lb-ten"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="nkTaiVe()">⬇ Tải về</button><button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button></div>', true);
  nkVeLB();
}
function nkDuong(m, f){
  return f.driveId ? '☁ '+(D.cauHinh.thumuc||'Tủ hồ sơ')+' / Nhật ký / '+(m.ngay||'').slice(0,7) : '💻 Chỉ trong máy này (chưa lên Drive)';
}
function nkVeLB(){
  var f = NK_XEM.ds[NK_XEM.i], im = document.getElementById('nk-lb-anh'); if(!f || !im) return;
  var m = ntTim(NK_XEM.nid) || {};
  document.getElementById('nk-lb-ten').innerHTML = (NK_XEM.ds.length>1 ? '<b>'+(NK_XEM.i+1)+'/'+NK_XEM.ds.length+'</b> · ' : '')+
    coChuHTML(f.ten+(f.co?' · '+kichCo(f.co):'')+' · '+nkDuong(m, f));
  im.removeAttribute('src'); if(NK_URL[f.id]) im.src = NK_URL[f.id];   /* hiện ảnh nhỏ trước, bản lớn thay vào sau */
  layNoiDung({id:f.id, driveId:f.driveId, co:f.co}).then(function(b){
    if(!b || NK_XEM.ds[NK_XEM.i]!==f) return;
    var u = URL.createObjectURL(b), e = document.getElementById('nk-lb-anh');
    if(e){ e.onload = function(){ setTimeout(function(){ URL.revokeObjectURL(u); }, 1000); }; e.src = u; }
  });
  Array.prototype.forEach.call(document.querySelectorAll('.nk-lb-nut'), function(b){ b.style.visibility = NK_XEM.ds.length>1 ? '' : 'hidden'; });
}
function nkLat(n){
  if(NK_XEM.ds.length<2) return;
  NK_XEM.i = (NK_XEM.i + n + NK_XEM.ds.length) % NK_XEM.ds.length; nkVeLB();
}
function nkVuot(ev){
  if(NK_XEM.x0===null) return;
  var dx = ev.changedTouches[0].clientX - NK_XEM.x0; NK_XEM.x0 = null;
  if(Math.abs(dx) > 40) nkLat(dx < 0 ? 1 : -1);
}
function nkTaiVe(){
  var f = NK_XEM.ds[NK_XEM.i]; if(!f) return;
  layNoiDung({id:f.id, driveId:f.driveId, co:f.co}).then(function(b){
    if(!b) return baoLoi('Chưa lấy được ảnh.');
    var a = document.createElement('a'), u = URL.createObjectURL(b);
    a.href = u; a.download = f.ten; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(u); }, 3000);
  });
}
/* ✕ trên một file: liên kết → chỉ gỡ (Hoàn tác); file riêng → thùng rác ngăn 📅 Hôm nay */
function nkGo(nid, i){
  var m = ntTim(nid), f = m && (m.dinh||[])[i]; if(!f) return;
  var now = new Date().toISOString();
  m.dinh.splice(i, 1); m.suaLuc = now;
  var tra = function(){ var x = ntTim(nid); if(x){ x.dinh = x.dinh||[]; x.dinh.splice(Math.min(i, x.dinh.length), 0, f); x.suaLuc = new Date().toISOString(); } };
  if(f.k!=='rieng'){
    luu(); henDongBoLich(); veLich();
    return baoHoanTac('Đã gỡ liên kết — file gốc vẫn ở chỗ cũ.', function(){ tra(); luu(); henDongBoLich(); veLich(); });
  }
  D.rac = D.rac||[];
  D.rac.push(nkBanRac({id:f.id, ngay:m.ngay, nd:m.nd, nkNote:nid, nkFile:f, tenMoi:f.ten, co:f.co}, now));
  luu(); henDongBoLich(); veLich(); capNhatDemRac();
  baoHoanTac('Đã chuyển file vào thùng rác.', function(){
    D.rac = D.rac.filter(function(x){ return x.id!==f.id; }); tra(); luu(); henDongBoLich(); veLich(); capNhatDemRac();
  });
}
function nkBanRac(r, now){
  r.khoCu = 'homNay'; r.nhom = 'homNay'; r.tenCu = r.tenCu || r.tenMoi; r.duoi = duoiFile(r.tenMoi||'');
  r.xoaLuc = now; r.suaLuc = now; r.lyDoXoa = 'Xóa ở tab Hôm nay';
  return r;
}
/* dòng / mẩu có file riêng bị xóa → một mục trong thùng rác giữ nguyên dòng + file để khôi phục */
function nkVaoRac(ds){
  var now = new Date().toISOString(), ids = [];
  ds.forEach(function(m){
    var co = (m.dinh||[]).filter(function(f){ return f.k==='rieng'; });
    if(!co.length) return;
    D.rac = D.rac||[];
    D.rac.push(nkBanRac({id:m.id, ngay:m.ngay, nd:m.nd, note:JSON.parse(JSON.stringify(m)),
      tenMoi:(m.nd||'Dòng ghi chép').slice(0,60)+' ('+co.length+' file)', co:co.reduce(function(a, f){ return a+(+f.co||0); }, 0)}, now));
    ids.push(m.id);
  });
  if(ids.length) capNhatDemRac();
  return ids;
}
function nkKhoiPhuc(r){
  var L = ntData(), now = new Date().toISOString();
  if(r.note){
    var m = r.note; m.suaLuc = now;
    if(!L.note.some(function(x){ return x.id===m.id; })) L.note.push(m);
    L.noteXoa = L.noteXoa.filter(function(x){ return x.id!==m.id; });
  } else if(r.nkFile){
    var dich = ntTim(r.nkNote);
    if(!dich){ dich = {id:idMoi(), ngay:r.ngay||lcISO(nay()), nd:'📎 '+(r.nkFile.ten||'File'), mau:'trang', kieu:'dong', xong:'', taoLuc:now}; L.note.push(dich); }
    dich.dinh = dich.dinh||[]; dich.dinh.push(r.nkFile); dich.suaLuc = now;
  }
  henDongBoLich();
}
function nkFileCuaRac(r){ return r.note ? (r.note.dinh||[]) : (r.nkFile ? [r.nkFile] : []); }
/* driveId các file riêng ở Hôm nay (kể cả đang ở thùng rác) — Lập chỉ mục / Quét rác coi là file của app */
function nkDriveIds(){
  var ra = [];
  ntData().note.forEach(function(m){ (m.dinh||[]).forEach(function(f){ if(f.driveId) ra.push(f.driveId); }); });
  (D.rac||[]).forEach(function(r){ if(r.khoCu==='homNay') nkFileCuaRac(r).forEach(function(f){ if(f.driveId) ra.push(f.driveId); }); });
  return ra;
}
/* đưa file riêng lên Drive: Tủ hồ sơ / Nhật ký / YYYY-MM (chỉ máy đã tạo file mới đẩy) */
function dayFileNKCho(){
  if(!coTheNoiDrive() || !(DR.sanSang && DR.online) || dayFileNKCho.dang) return Promise.resolve();
  var viec = [];
  ntData().note.forEach(function(m){ (m.dinh||[]).forEach(function(f){
    if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) viec.push([m, f]); }); });
  if(!viec.length) return Promise.resolve();
  dayFileNKCho.dang = true;
  return viec.reduce(function(p, x){
    return p.then(function(){
      var m = x[0], f = x[1], duong = D.cauHinh.thumuc+' / Nhật ký / '+(m.ngay||lcISO(nay())).slice(0,7);
      return Promise.all([docFile(f.id), baoDamDuong(duong)]).then(function(r){
        if(!r[0]) return;
        return dayBlobLenDrive(f.ten, f.loai, r[0], r[1]).then(function(r2){
          if(!r2 || !r2.id) return;
          f.driveId = r2.id; f.driveCha = r[1]; m.suaLuc = new Date().toISOString();
        });
      }).catch(function(e){ console.warn('Chưa đưa file Hôm nay lên Drive', f.ten, e); });
    });
  }, Promise.resolve()).then(function(){ dayFileNKCho.dang = false; luu(); henDongBoLich(); if(nganHienTai===0) veLich(); });
}
/* tải một blob lên thư mục Drive (multipart) — dùng chung cho file riêng của Bộ hồ sơ và Hôm nay */
function dayBlobLenDrive(ten, loai, bl, idTM){
  var bien = '----tuhoso'+Date.now();
  var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify({name:ten, parents:[idTM]})+
    '\r\n--'+bien+'\r\nContent-Type: '+(loai||bl.type||'application/octet-stream')+'\r\n\r\n';
  return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,parents',
    {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:new Blob([dau, bl, '\r\n--'+bien+'--'])});
}
/* ✎ Sửa việc SCHEDULE: tên, ngày, lặp lại, lưu ý */
function lcSua(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  if(nhapMo('lc:'+v.id)) return;
  moHop('<div class="hop-tit">✎ Sửa việc</div>'+
    '<div class="o"><label>Việc</label><textarea id="lc-s-ten" rows="2">'+coChuHTML(v.ten||'')+'</textarea></div>'+
    '<div class="o"><label>Ngày'+(v.lap && v.lap!=='mot' ? ' bắt đầu' : '')+'</label><input id="lc-s-ngay" inputmode="numeric" placeholder="dd/mm/yyyy" value="'+lcDMY(v.ngay)+'" oninput="gonNgay(this)"></div>'+
    '<div class="o"><label>Lặp lại</label><select id="lc-s-lap">'+Object.keys(LC_LAP).map(function(k){
      return '<option value="'+k+'"'+((v.lap||'mot')===k ? ' selected' : '')+'>'+LC_LAP[k]+'</option>'; }).join('')+'</select></div>'+
    '<label class="nk-tich"><input type="checkbox" id="lc-s-luuy"'+(v.luuY ? ' checked' : '')+'> ⚑ Lưu ý (đưa lên đầu, tô đậm)</label>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="lcSuaXong()">Lưu</button></div>');
  nhapDat('lc:'+v.id);  document.getElementById('hop-in').classList.add('phim-chung');   /* 3.84: phím chung Enter / Tab / Shift / ↑ ↓ */
  setTimeout(function(){ var o = document.getElementById('lc-s-ten'); if(o){ o.focus(); o.selectionStart = o.value.length; } }, 30);
}
function lcSuaXong(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  var ten = gt('lc-s-ten'), iso = ngayISOo(gt('lc-s-ngay'));
  if(!ten) return baoLoi('Tên việc đang trống.');
  if(!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return baoLoi('Ngày chưa đúng, gõ dạng dd/mm/yyyy.');
  var cu = JSON.parse(JSON.stringify(v));
  v.ten = ten; v.ngay = iso; v.lap = gt('lc-s-lap') || 'mot';
  v.luuY = !!(document.getElementById('lc-s-luuy')||{}).checked; v.suaLuc = new Date().toISOString();
  ghiHoanTac('sửa việc', function(){ var x = lcTim(cu.id); if(x) Object.keys(cu).forEach(function(k){ x[k] = cu[k]; }); });
  nhapXong(); dongHop();
  if(!lcCo(v, LICH.chon)){ var d = lcNgay(iso); LICH.chon = iso; LICH.nam = d.getFullYear(); LICH.thang = d.getMonth(); }
  lcDoiLich(); bao('Đã sửa việc.', 3);
}
/* ==========================================================
   💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
   Bấm → chi tiết theo loại, số file chưa lên Drive (sẽ mất thật nếu máy tự dọn), Dọn kho, xin giữ dữ liệu lâu dài.
   ========================================================== */
var BN = {luc:0, dung:0, toi:0, giu:null};
function nkChuaLen(){
  var n = 0;
  ntData().note.forEach(function(m){ (m.dinh||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) n++; }); });
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) n++; }); });
  return n;
}
function kichCoNgan(b){
  if(b >= 1073741824) return (b/1073741824).toFixed(b>=10737418240?0:1).replace('.', ',')+' GB';
  if(b >= 1048576) return Math.round(b/1048576)+' MB';
  return Math.max(1, Math.round(b/1024))+' KB';
}
function capNhatBoNho(ep){
  var e = document.getElementById('chip-bn'); if(!e) return;
  var ve = function(){
    if(!BN.toi){ e.textContent = '💾 '+(BN.dung ? kichCoNgan(BN.dung) : '—'); e.className = 'chip'; return; }
    var pt = Math.round(BN.dung/BN.toi*100);
    e.textContent = '💾 '+kichCoNgan(BN.dung)+' / '+kichCoNgan(BN.toi);
    e.className = 'chip '+(pt>80 ? 'do' : pt>=60 ? 'vang' : 'luc');
    e.title = 'Bộ nhớ trình duyệt app đang dùng: '+pt+'%'+(BN.giu===true ? ' · đã được giữ lâu dài' : '');
  };
  ve();
  if(!ep && Date.now()-BN.luc < 15000) return;   /* hỏi trình duyệt tối đa 15 giây một lần */
  BN.luc = Date.now();
  if(!(navigator.storage && navigator.storage.estimate)) return;
  navigator.storage.estimate().then(function(u){ BN.dung = u.usage||0; BN.toi = u.quota||0; ve(); }).catch(function(){});
  if(navigator.storage.persisted) navigator.storage.persisted().then(function(g){ BN.giu = g; }).catch(function(){});
}
/* dung lượng file trong máy chia theo loại — đọc kích thước từng file trong IndexedDB (không đọc nội dung) */
function demKhoTheoLoai(){
  var rac = {}; (D.rac||[]).forEach(function(m){ rac[m.id] = 1; nkFileCuaRac(m).forEach(function(f){ rac[f.id] = 1; }); });
  var nhom = {tu:0, scan:0, ka:0, homNay:0, bo:0, rac:0, khac:0};
  return moKho().then(function(db){
    return new Promise(function(ok){
      try{
        var r = db.transaction('f','readonly').objectStore('f').openCursor();
        r.onsuccess = function(ev){
          var c = ev.target.result; if(!c){ ok(nhom); return; }
          var k = String(c.key), v = c.value, co = (v && (v.size || v.byteLength || (v.length||0))) || 0;
          var goc = k.replace(/^hs_/, '').replace(/[_](nho|matTruoc|matSau|t\d+.*)$/, '');
          if(rac[goc] || rac[k]) nhom.rac += co;
          else if(/^nf/.test(k)) nhom.homNay += co;
          else if(/^bf/.test(k)) nhom.bo += co;
          else if(/^hs_ka/.test(k)) nhom.ka += co;
          else if(/^hs_/.test(k)) nhom.scan += co;
          else if(timMuc(k)) nhom.tu += co;
          else nhom.khac += co;
          c.continue();
        };
        r.onerror = function(){ ok(nhom); };
      }catch(e){ ok(nhom); }
    });
  }).catch(function(){ return nhom; });
}
function moBoNho(){
  capNhatBoNho(true);
  var chuaLen = ((typeof demChoDB==='function') ? demChoDB().length : 0) + scanCanDay().length + kaCanDay().length + nkChuaLen();
  moHop('<div class="hop-tit">💾 Bộ nhớ máy</div><div id="bn-than"><div class="rong">Đang tính…</div></div>', true);
  Promise.all([demKhoTheoLoai(), navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().catch(function(){ return {}; }) : Promise.resolve({})])
  .then(function(r){
    var nhom = r[0], u = r[1] || {}; BN.dung = u.usage||BN.dung; BN.toi = u.quota||BN.toi;
    var pt = BN.toi ? Math.round(BN.dung/BN.toi*100) : 0;
    var hang = [['📄 Văn bản · Tháng · Biểu mẫu · Thư viện', nhom.tu], ['🪪 Bản scan', nhom.scan], ['✍ Chữ ký · CCCD', nhom.ka],
      ['📅 Ảnh, file ở Hôm nay', nhom.homNay], ['📁 File riêng Bộ hồ sơ', nhom.bo], ['🗑 Thùng rác', nhom.rac], ['Khác (bộ nhớ tạm)', nhom.khac]];
    var iOS = /iPhone|iPad|iPod/.test(navigator.userAgent), cai = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    var e = document.getElementById('bn-than'); if(!e) return;
    e.innerHTML =
      '<div class="bn-thanh"><i style="width:'+Math.min(100, pt)+'%" class="'+(pt>80?'do':pt>=60?'vang':'luc')+'"></i></div>'+
      '<div class="hop-phu">App đang dùng <b>'+kichCoNgan(BN.dung)+'</b>'+(BN.toi ? ' trong khoảng <b>'+kichCoNgan(BN.toi)+'</b> trình duyệt cho phép ('+pt+'%)' : '')+'.'+
        (iOS ? ' Trên iPhone con số tối đa chỉ gần đúng.' : '')+'</div>'+
      '<table class="bn-bang">'+hang.filter(function(x){ return x[1]>0; }).map(function(x){
        return '<tr><td>'+x[0]+'</td><td>'+kichCoNgan(x[1])+'</td></tr>'; }).join('')+'</table>'+
      (chuaLen ? '<div class="bn-canh">⚠ <b>'+chuaLen+' file chưa lên Drive</b> — nếu máy tự dọn bộ nhớ thì các file này mất thật. '+
          '<button class="nho chinh" onclick="dongHop();dongBoNgay()">☁ Đồng bộ ngay</button></div>'
        : '<div class="hop-phu">✓ Mọi file đã có trên Drive — máy có tự dọn thì app tải lại được.</div>')+
      '<div class="hop-phu">'+(BN.giu===true ? '🔒 Máy này <b>đã được giữ dữ liệu lâu dài</b> — trình duyệt không tự xóa khi thiếu chỗ.'
        : '🔓 Chưa được giữ lâu dài — khi máy thiếu chỗ hoặc lâu không mở app, trình duyệt có thể tự xóa bản trong máy.'+
          (iOS && !cai ? ' iPhone: bấm Chia sẻ › <b>Thêm vào MH chính</b>, mở app từ biểu tượng đó rồi bấm nút dưới.' : ''))+'</div>'+
      '<div class="hang-nut">'+(BN.giu===true ? '' : '<button class="nho" onclick="xinGiuDuLieu()">🔒 Xin giữ dữ liệu lâu dài</button>')+
        (nhom.rac ? '<button class="nho" onclick="dongHop();moDonKho(\'rac\')">🗑 Thùng rác ('+kichCoNgan(nhom.rac)+')</button>' : '')+
        '<button class="nho" onclick="dongHop();moDonKho()">🧰 Dọn kho</button>'+
        '<button class="nho chinh" onclick="dongHop()">Đóng</button></div>';
  });
}
function xinGiuDuLieu(){
  if(!(navigator.storage && navigator.storage.persist)) return baoLoi('Trình duyệt này không hỗ trợ giữ dữ liệu lâu dài.');
  navigator.storage.persist().then(function(ok){
    BN.giu = ok;
    if(ok) bao('🔒 Đã được giữ dữ liệu lâu dài trên máy này.', 5);
    else bao('Trình duyệt chưa đồng ý. iPhone: thêm app vào Màn hình chính rồi mở từ biểu tượng; Chrome: dùng app thường xuyên sẽ được cho phép.', 9);
    moBoNho();
  });
}
function capNhatChamLich(){ veLich(); }   /* chỉ dùng khi thêm/xóa mẩu, KHÔNG dùng lúc gõ */
function ntOHTML(m, ghimRieng){
  var mau = Object.keys(NT_MAU).map(function(k){
    return '<span class="nt-cham nt-'+k+(m.mau===k?' chon':'')+'" title="'+NT_MAU[k]+'" onclick="ntDoiMau(\''+m.id+'\',\''+k+'\')"></span>';
  }).join('');
  return '<div class="nt-o nt-'+(m.mau||'vang')+(m.ghim?' ghim':'')+'" draggable="true" '+
    'ondragstart="ntKeoBatDau(\''+m.id+'\')" ondragover="event.preventDefault()" ondrop="ntKeoTha(\''+m.id+'\')">'+
    '<div class="nt-dau">'+
      (ghimRieng?'<span class="nt-ngay">'+lcDM(m.ngay)+'</span>':'')+
      '<span class="nt-mau">'+mau+'</span>'+
      '<span class="nt-luu" id="nt-luu-'+m.id+'"></span>'+
      '<button class="nt-nut'+(m.ghim?' bat':'')+'" onclick="ntDoiGhim(\''+m.id+'\')" title="Ghim — luôn hiện dù đổi ngày">📌</button>'+
      (ghimRieng?'':'<button class="nt-nut chi-may" onclick="ntChuyen(\''+m.id+'\',-1)" title="Lên trước">↑</button>'+
      '<button class="nt-nut chi-may" onclick="ntChuyen(\''+m.id+'\',1)" title="Xuống sau">↓</button>')+
      '<button class="nt-nut" onclick="nkMenuDinh(\''+m.id+'\')" title="Gắn ảnh / file">📎</button>'+
      '<button class="nt-nut xau" onclick="ntXoa(\''+m.id+'\')" title="Xóa mẩu">✕</button>'+
    '</div>'+
    '<textarea placeholder="Ghi ở đây…" oninput="ntGo(\''+m.id+'\',this)" onblur="ntRoiO(\''+m.id+'\')">'+coChuHTML(m.nd||'')+'</textarea>'+nkDinhHTML(m)+'</div>';
}
/* ==========================================================
   CÂU CHỮ & NGÀY NÀY NĂM XƯA (3.17) — gói sẵn trong app, không cần mạng
   Anh bổ sung thêm bằng file Drive: Tủ hồ sơ/_Hệ thống/nguon-cau.json
   Nhóm câu chữ: cadao (ca dao · tục ngữ · thành ngữ) · danhngon (có tác giả) · kienthuc
   ========================================================== */
var CAU_GOI = [
  /* --- ca dao, tục ngữ, thành ngữ --- */
  {c:'Có công mài sắt, có ngày nên kim.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Muốn biết phải hỏi, muốn giỏi phải học.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Ăn cỗ đi trước, lội nước theo sau.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Đi một ngày đàng, học một sàng khôn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nói lời phải giữ lấy lời, đừng như con bướm đậu rồi lại bay.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Tốt gỗ hơn tốt nước sơn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chớ thấy sóng cả mà ngã tay chèo.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Kiến tha lâu cũng đầy tổ.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Giấy rách phải giữ lấy lề.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Của bền tại người.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Việc hôm nay chớ để ngày mai.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Thua keo này ta bày keo khác.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Ăn quả nhớ kẻ trồng cây.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một giàn.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Lá lành đùm lá rách.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một miếng khi đói bằng một gói khi no.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nhất nước, nhì phân, tam cần, tứ giống.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tháng bảy kiến bò, chỉ lo lại lụt.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Đói cho sạch, rách cho thơm.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Học ăn, học nói, học gói, học mở.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Gần mực thì đen, gần đèn thì rạng.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Có chí thì nên.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Thất bại là mẹ thành công.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Trăm hay không bằng tay quen.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một lời nói dối, sám hối bảy ngày.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tiền vào nhà khó như gió vào nhà trống.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Khéo ăn thì no, khéo co thì ấm.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Buôn tàu bán bè không bằng ăn dè hà tiện.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Làm khi lành để dành khi đau.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Của làm ra để trên gác, của cờ bạc để ngoài sân.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Ăn kỹ no lâu, cày sâu tốt lúa.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Được mùa chớ phụ ngô khoai.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nước chảy đá mòn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Dục tốc bất đạt.', t:'Thành ngữ Hán Việt', n:'cadao'},
  {c:'Cẩn tắc vô ưu.', t:'Thành ngữ Hán Việt', n:'cadao'},
  {c:'Có thực mới vực được đạo.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Một sự nhịn, chín sự lành.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nói phải củ cải cũng nghe.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chim khôn kêu tiếng rảnh rang, người khôn nói tiếng dịu dàng dễ nghe.', t:'Ca dao Việt Nam', n:'cadao'},
  {c:'Ở hiền gặp lành.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Uống nước nhớ nguồn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Thuận vợ thuận chồng, tát biển Đông cũng cạn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Anh em như thể tay chân.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Bán anh em xa, mua láng giềng gần.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tay làm hàm nhai, tay quai miệng trễ.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Cái khó ló cái khôn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Đất lành chim đậu.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Giấy trắng mực đen.', t:'Thành ngữ Việt Nam', n:'cadao'},
  {c:'Nói có sách, mách có chứng.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Sai một li đi một dặm.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Chậm mà chắc.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Tích tiểu thành đại.', t:'Thành ngữ Hán Việt', n:'cadao'},
  {c:'Đồng tiền đi trước là đồng tiền khôn.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Trăm nghe không bằng một thấy.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Đầu xuôi đuôi lọt.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Cần cù bù thông minh.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Việc nhà thì nhác, việc chú bác thì siêng.', t:'Tục ngữ Việt Nam', n:'cadao'},
  {c:'Nhất nghệ tinh, nhất thân vinh.', t:'Thành ngữ Hán Việt', n:'cadao'},

  /* --- danh ngôn có tác giả --- */
  {c:'Không có việc gì khó, chỉ sợ lòng không bền. Đào núi và lấp biển, quyết chí ắt làm nên.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Học để làm việc, làm người, làm cán bộ.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Cần, kiệm, liêm, chính, chí công vô tư.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Một dân tộc dốt là một dân tộc yếu.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.', t:'Hồ Chí Minh', n:'danhngon'},
  {c:'Hiền tài là nguyên khí của quốc gia.', t:'Thân Nhân Trung', n:'danhngon'},
  {c:'Việc nhân nghĩa cốt ở yên dân.', t:'Nguyễn Trãi — Bình Ngô đại cáo', n:'danhngon'},
  {c:'Đem đại nghĩa để thắng hung tàn, lấy chí nhân để thay cường bạo.', t:'Nguyễn Trãi', n:'danhngon'},
  {c:'Sông núi nước Nam vua Nam ở.', t:'Nam quốc sơn hà', n:'danhngon'},
  {c:'Ta thà làm quỷ nước Nam, chứ không thèm làm vương đất Bắc.', t:'Trần Bình Trọng', n:'danhngon'},
  {c:'Đầu thần chưa rơi xuống đất, xin bệ hạ đừng lo.', t:'Trần Thủ Độ', n:'danhngon'},
  {c:'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ.', t:'Bà Triệu', n:'danhngon'},
  {c:'Thà một phút huy hoàng rồi chợt tối, còn hơn buồn le lói suốt trăm năm.', t:'Xuân Diệu', n:'danhngon'},
  {c:'Nơi hầm tối là nơi sáng nhất.', t:'Dương Hương Ly', n:'danhngon'},
  {c:'Sống là cho, đâu chỉ nhận riêng mình.', t:'Tố Hữu', n:'danhngon'},
  {c:'Thiên tài là một phần trăm cảm hứng và chín mươi chín phần trăm mồ hôi.', t:'Thomas Edison', n:'danhngon'},
  {c:'Điều quan trọng không phải là đi nhanh, mà là không dừng lại.', t:'Khổng Tử', n:'danhngon'},
  {c:'Học mà không suy nghĩ thì phí công, suy nghĩ mà không học thì nguy hiểm.', t:'Khổng Tử', n:'danhngon'},
  {c:'Người quân tử cầu ở mình, kẻ tiểu nhân cầu ở người.', t:'Khổng Tử', n:'danhngon'},
  {c:'Biết thì nói là biết, không biết thì nói là không biết, ấy là biết vậy.', t:'Khổng Tử', n:'danhngon'},
  {c:'Hành trình vạn dặm bắt đầu từ một bước chân.', t:'Lão Tử', n:'danhngon'},
  {c:'Kẻ thù lớn nhất của đời người là chính mình.', t:'Phật giáo', n:'danhngon'},
  {c:'Đừng đếm những gì bạn đã mất, hãy quý những gì bạn đang có.', t:'Ngạn ngữ', n:'danhngon'},
  {c:'Thành công là đi từ thất bại này đến thất bại khác mà không mất đi nhiệt huyết.', t:'Winston Churchill', n:'danhngon'},
  {c:'Cách tốt nhất để dự đoán tương lai là tạo ra nó.', t:'Peter Drucker', n:'danhngon'},
  {c:'Cái gì không đo được thì không quản được.', t:'Peter Drucker', n:'danhngon'},
  {c:'Kỷ luật là cầu nối giữa mục tiêu và thành quả.', t:'Jim Rohn', n:'danhngon'},

  /* --- kiến thức lịch sử, địa lý, đời sống --- */
  {c:'Từ ngày 01/7/2025, Việt Nam có 34 tỉnh, thành phố trực thuộc trung ương; tỉnh Tây Ninh mới được hợp nhất từ Tây Ninh và Long An.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Sông Vàm Cỏ Đông chảy qua Tây Ninh, là nguồn nước chính cho sản xuất nông nghiệp của tỉnh.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Núi Bà Đen cao 986 m, là ngọn núi cao nhất Nam Bộ.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Hồ Dầu Tiếng là một trong những hồ nhân tạo lớn nhất Việt Nam, tưới cho Tây Ninh và các tỉnh lân cận.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Việt Nam có đường bờ biển dài khoảng 3.260 km, không kể các đảo.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Đỉnh Fansipan cao 3.147 m, cao nhất Đông Dương.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Đồng bằng sông Cửu Long là vựa lúa lớn nhất nước, chiếm hơn một nửa sản lượng lúa cả nước.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Âm lịch Việt Nam tính theo múi giờ +7, nên đôi khi lệch một ngày so với lịch Trung Quốc.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Tháng âm lịch có 29 hoặc 30 ngày; năm nhuận âm lịch có 13 tháng.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Tiết Thanh minh thường rơi vào khoảng 4–5 tháng 4 dương lịch.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Một năm có 52 tuần lẻ 1 ngày; năm nhuận lẻ 2 ngày, nên ngày trong tuần lùi dần mỗi năm.', t:'Kiến thức lịch', n:'kienthuc'},
  {c:'Mười hai con giáp bắt đầu từ Tý và kết thúc ở Hợi, lặp lại theo chu kỳ 12 năm.', t:'Văn hóa Việt Nam', n:'kienthuc'},
  {c:'Can Chi ghép 10 thiên can với 12 địa chi, tạo thành chu kỳ 60 năm gọi là một hoa giáp.', t:'Văn hóa Việt Nam', n:'kienthuc'},
  {c:'Trống đồng Đông Sơn là hiện vật tiêu biểu của nền văn minh Việt cổ, cách nay khoảng 2.500 năm.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Văn Miếu – Quốc Tử Giám được coi là trường đại học đầu tiên của Việt Nam.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Chữ Quốc ngữ hình thành từ thế kỷ 17, gắn với công lao của nhiều giáo sĩ và người Việt cộng tác.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Kinh thành Huế được xây dựng dưới triều Nguyễn, nay là Di sản văn hóa thế giới.', t:'Lịch sử Việt Nam', n:'kienthuc'},
  {c:'Vịnh Hạ Long được UNESCO công nhận là Di sản thiên nhiên thế giới năm 1994.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Phong Nha – Kẻ Bàng có hệ thống hang động lớn bậc nhất thế giới, trong đó có hang Sơn Đoòng.', t:'Địa lý Việt Nam', n:'kienthuc'},
  {c:'Cà phê Việt Nam xuất khẩu đứng nhóm đầu thế giới, chủ yếu là cà phê vối (robusta).', t:'Kinh tế Việt Nam', n:'kienthuc'}
];

/* Ngày này năm xưa — chỉ giữ những mốc phổ biến, dễ kiểm chứng.
   Ngày nào không có dữ liệu thì app chỉ hiện câu chữ. */
var NGAY_XUA = {
  '01-01':[{y:1959,c:'Cuba: cách mạng thành công, chính quyền Batista sụp đổ',v:0}],
  '03-02':[{y:1930,c:'Thành lập Đảng Cộng sản Việt Nam',v:1}],
  '27-02':[{y:1955,c:'Ngày Thầy thuốc Việt Nam (Bác Hồ gửi thư cho ngành y tế)',v:1}],
  '08-03':[{y:1910,c:'Ngày Quốc tế Phụ nữ được đề xướng',v:0}],
  '26-03':[{y:1931,c:'Thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh',v:1}],
  '30-04':[{y:1975,c:'Giải phóng miền Nam, thống nhất đất nước',v:1}],
  '01-05':[{y:1886,c:'Ngày Quốc tế Lao động bắt nguồn từ cuộc đấu tranh ở Chicago',v:0}],
  '07-05':[{y:1954,c:'Chiến thắng Điện Biên Phủ',v:1}],
  '15-05':[{y:1941,c:'Thành lập Đội Thiếu niên Tiền phong Hồ Chí Minh',v:1}],
  '19-05':[{y:1890,c:'Ngày sinh Chủ tịch Hồ Chí Minh',v:1}],
  '05-06':[{y:1911,c:'Nguyễn Tất Thành ra đi tìm đường cứu nước từ bến Nhà Rồng',v:1}],
  '21-06':[{y:1925,c:'Ngày Báo chí Cách mạng Việt Nam (báo Thanh Niên ra số đầu)',v:1}],
  '20-07':[{y:1969,c:'Con người lần đầu đặt chân lên Mặt Trăng (Apollo 11)',v:0}],
  '27-07':[{y:1947,c:'Ngày Thương binh – Liệt sĩ',v:1}],
  '06-08':[{y:1945,c:'Bom nguyên tử ném xuống Hiroshima',v:0}],
  '19-08':[{y:1945,c:'Cách mạng Tháng Tám thành công ở Hà Nội',v:1}],
  '02-09':[{y:1945,c:'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',v:1}],
  '23-09':[{y:1945,c:'Ngày Nam Bộ kháng chiến',v:1},{y:1846,c:'Phát hiện Hải Vương tinh',v:0}],
  '10-10':[{y:1954,c:'Giải phóng Thủ đô Hà Nội',v:1}],
  '20-10':[{y:1930,c:'Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam',v:1}],
  '04-10':[{y:2002,c:'Thành lập Ngân hàng Chính sách xã hội theo Nghị định 78/2002/NĐ-CP',v:1}],
  '09-11':[{y:1989,c:'Bức tường Berlin sụp đổ',v:0}],
  '20-11':[{y:1982,c:'Ngày Nhà giáo Việt Nam lần đầu được tổ chức',v:1}],
  '23-11':[{y:1940,c:'Khởi nghĩa Nam Kỳ',v:1}],
  '22-12':[{y:1944,c:'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân',v:1}],
  '19-12':[{y:1946,c:'Toàn quốc kháng chiến',v:1}],
  '25-12':[{y:1642,c:'Ngày sinh Isaac Newton (theo lịch Julius)',v:0}],
  '12-04':[{y:1961,c:'Yuri Gagarin bay vào vũ trụ — người đầu tiên',v:0}],
  '18-05':[{y:1980,c:'Núi lửa St. Helens phun trào',v:0}],
  '14-07':[{y:1789,c:'Phá ngục Bastille, mở đầu Cách mạng Pháp',v:0}],
  '24-04':[{y:1990,c:'Kính viễn vọng Hubble được phóng lên quỹ đạo',v:0}],
  '31-10':[{y:1517,c:'Martin Luther công bố 95 luận đề',v:0}],
  '29-11':[{y:1947,c:'Liên Hợp Quốc thông qua kế hoạch phân chia Palestine',v:0}],
  '17-12':[{y:1903,c:'Anh em nhà Wright thực hiện chuyến bay đầu tiên',v:0}],
  '11-02':[{y:1847,c:'Ngày sinh Thomas Edison',v:0}],
  '14-03':[{y:1879,c:'Ngày sinh Albert Einstein',v:0}]
};

/* ==========================================================
   CAN CHI · NGÀY HOÀNG ĐẠO · GIỜ HOÀNG ĐẠO (3.18)
   Cách tính phổ thông, giống các quyển lịch Việt:
   - Can chi ngày tính từ số ngày Julius
   - Ngày hoàng đạo: 12 trực thần khởi theo tháng âm, 6 sao tốt là hoàng đạo
   - Giờ hoàng đạo: tra theo chi của ngày, 6 giờ tốt trong 12 canh giờ
   Chỉ để tham khảo — mỗi sách có thể chép khác nhau đôi chút.
   ========================================================== */
var CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
var GIO_CHI = ['23–1','1–3','3–5','5–7','7–9','9–11','11–13','13–15','15–17','17–19','19–21','21–23'];
/* 12 trực thần theo thứ tự; sao hoàng đạo (tốt) đánh dấu 1 */
var SAO_12 = [
  {t:'Thanh Long', tot:1}, {t:'Minh Đường', tot:1}, {t:'Thiên Hình', tot:0}, {t:'Chu Tước', tot:0},
  {t:'Kim Quỹ', tot:1},    {t:'Bảo Quang', tot:1},  {t:'Bạch Hổ', tot:0},   {t:'Ngọc Đường', tot:1},
  {t:'Thiên Lao', tot:0},  {t:'Nguyên Vũ', tot:0},  {t:'Tư Mệnh', tot:1},   {t:'Câu Trận', tot:0}
];
/* tháng âm 1&7 khởi Thanh Long tại Tý; 2&8 tại Dần; 3&9 Thìn; 4&10 Ngọ; 5&11 Thân; 6&12 Tuất */
var KHOI_SAO = {1:0, 7:0, 2:2, 8:2, 3:4, 9:4, 4:6, 10:6, 5:8, 11:8, 6:10, 12:10};
/* giờ hoàng đạo theo chi NGÀY — chỉ số chi của các giờ tốt */
var GIO_TOT = {
  0:[0,1,3,6,8,9],  6:[0,1,3,6,8,9],      /* ngày Tý, Ngọ */
  1:[2,3,5,8,10,11], 7:[2,3,5,8,10,11],   /* Sửu, Mùi */
  2:[0,1,4,5,7,10],  8:[0,1,4,5,7,10],    /* Dần, Thân */
  3:[0,2,3,6,7,9],   9:[0,2,3,6,7,9],     /* Mão, Dậu */
  4:[2,4,5,8,9,11], 10:[2,4,5,8,9,11],    /* Thìn, Tuất */
  5:[1,4,6,7,10,11],11:[1,4,6,7,10,11]    /* Tỵ, Hợi */
};
function canChiNgay(iso){
  var p = iso.split('-').map(Number), jd = jdTuNgay(p[2], p[1], p[0]);
  var ic = (jd+9) % 10, ich = (jd+1) % 12;
  return {can:CAN[ic], chi:CHI[ich], iChi:ich, ten:CAN[ic]+' '+CHI[ich]};
}
function canChiThangNam(iso){
  var a = lcAm(iso);
  var namC = (a.nam+6) % 10, namCh = (a.nam+8) % 12;
  var thC = ((a.nam*12 + a.thang + 3) % 10 + 10) % 10;
  return {thang:CAN[thC]+' '+CHI[(a.thang+1)%12], nam:CAN[namC]+' '+CHI[namCh]};
}
/* sao trực của ngày + hoàng đạo hay hắc đạo */
function saoNgay(iso){
  var a = lcAm(iso), cc = canChiNgay(iso);
  var khoi = KHOI_SAO[a.thang] === undefined ? 0 : KHOI_SAO[a.thang];
  var i = ((cc.iChi - khoi) % 12 + 12) % 12;
  var s = SAO_12[i];
  return {ten:s.t, hoangDao:!!s.tot};
}
function gioHoangDao(iso){
  var cc = canChiNgay(iso), ds = GIO_TOT[cc.iChi] || [];
  return ds.map(function(i){ return {chi:CHI[i], gio:GIO_CHI[i]}; });
}
/* dòng tóm tắt hiện trong sổ */
function moNgayTot(iso){
  var cc = canChiNgay(iso), s = saoNgay(iso), tn = canChiThangNam(iso), a = lcAm(iso);
  moHop('<div class="hop-tit">'+LC_THU[lcNgay(iso).getDay()]+' '+lcDMY(iso)+'</div>'+
    '<div class="hop-phu">Âm lịch '+lcAmChu(iso)+' · ngày <b>'+cc.ten+'</b> · tháng '+tn.thang+' · năm '+tn.nam+'</div>'+
    '<div class="nhan-nhom">Ngày '+(s.hoangDao?'hoàng đạo':'hắc đạo')+'</div>'+
    '<div class="tot-o'+(s.hoangDao?' hd':'')+'">Trực thần: <b>'+s.ten+'</b> — '+
      (s.hoangDao?'ngày tốt, hợp việc lớn như khai trương, ký kết, khởi công.'
                 :'ngày thường, nên tránh việc trọng đại; việc thường vẫn làm bình thường.')+'</div>'+
    '<div class="nhan-nhom">Giờ hoàng đạo</div><div class="tot-gio">'+
      gioHoangDao(iso).map(function(x){ return '<span><b>'+x.chi+'</b>'+x.gio+'</span>'; }).join('')+'</div>'+
    (nhanNgayAm(iso).length?'<div class="nhan-nhom">Ngày âm</div><div class="tot-o">'+coChuHTML(nhanNgayAm(iso).join(' · '))+'</div>':'')+
    '<div class="huong-dan">Tính theo cách phổ thông của lịch Việt (12 trực thần khởi theo tháng âm, giờ tốt tra theo chi ngày). '+
    'Mỗi sách có thể chép khác đôi chút — chỉ để tham khảo.</div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>');
}
function tomTatNgayTot(iso){
  var cc = canChiNgay(iso), s = saoNgay(iso);
  return 'Ngày '+cc.ten+' · '+(s.hoangDao?'hoàng đạo':'hắc đạo')+' ('+s.ten+')';
}

/* ---- nguồn thêm của anh trên Drive: Tủ hồ sơ/_Hệ thống/nguon-cau.json ---- */
function nguonCau(){ D.nguonCau = D.nguonCau || {cauChu:[], ngayXua:{}}; return D.nguonCau; }
function dsCauChu(){
  var nhom = D.cauHinh.nhomCau || {cadao:true, danhngon:true, kienthuc:true};
  var tuAnh = (nguonCau().cauChu||[]).map(function(x){
    return (typeof x==='string') ? {c:x, t:'', n:'cadao'} : {c:x.c||x.chu||'', t:x.t||x.tacGia||'', n:x.n||x.nhom||'cadao'};
  });
  return CAU_GOI.concat(tuAnh).filter(function(x){ return x.c && nhom[x.n]!==false; });
}
function dsNgayXua(iso){
  var k = iso.slice(8,10)+'-'+iso.slice(5,7);
  return (NGAY_XUA[k]||[]).concat((nguonCau().ngayXua||{})[k]||[]);
}
/* số thứ tự cố định theo ngày — 2 máy cùng ngày ra cùng câu */
function soTuNgay(iso){
  var n = 0; for(var i=0;i<iso.length;i++) n = (n*31 + iso.charCodeAt(i)) % 100000;
  return n;
}
var CAU_LECH = 0;   /* bấm ⟳ thì cộng thêm */
function cheCau(){ return D.cauHinh.cheCau || 'ngay'; }   /* ngay | moi | bam | tat */
function cauHomNay(iso){
  var ds = dsCauChu(); if(!ds.length) return null;
  var i;
  if(cheCau()==='moi') i = (soTuNgay(iso)+MO_APP_LAN+CAU_LECH) % ds.length;
  else i = (soTuNgay(iso)+CAU_LECH) % ds.length;
  return ds[i];
}
function doiCau(){ CAU_LECH++; veNhatKy(); }
function khoiCauHTML(iso){
  if(cheCau()==='tat') return '';
  var xua = dsNgayXua(iso), cau = cauHomNay(iso);
  if(!xua.length && !cau) return '';
  var h = '<div class="oq">';
  if(xua.length) h += '<div class="oq-d1"><b>Ngày này năm xưa</b> · '+
    xua.slice(0,2).map(function(x){ return x.y+' — '+coChuHTML(x.c); }).join(' <span class="oq-tg">·</span> ')+'</div>';
  if(cau) h += '<div class="oq-d2">“'+coChuHTML(cau.c)+'”'+(cau.t?' <span class="oq-tg">— '+coChuHTML(cau.t)+'</span>':'')+
    ' <span class="oq-nut" onclick="doiCau()" title="Đổi câu khác">⟳</span></div>';
  return h+'</div>';
}
/* tải nguồn của anh từ Drive */
function taiNguonCauTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){ return timFileTrong('nguon-cau.json', idTM); })
  .then(function(f){
    if(!f) return 0;
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media').then(function(r){
      if(!r) return 0;
      D.nguonCau = {cauChu:r.cauChu||r.cau||[], ngayXua:r.ngayXua||r.ngay||{}};
      luu(); veNhatKy();
      return (D.nguonCau.cauChu||[]).length;
    });
  }).catch(function(e){ console.warn('Không tải được nguồn câu', e); return 0; });
}
/* ---- phông chữ cuốn sổ ---- */
var PHONG_SO = {
  constantia:{ten:'Constantia', mota:'Nét thanh, dấu chuẩn — đọc lâu không mỏi',
    css:"Constantia,'Hoefler Text','Palatino Linotype',serif"},
  cambria:{ten:'Cambria', mota:'Kiểu sách, chữ chắc, rõ trên màn nhỏ',
    css:"Cambria,Charter,'Bitstream Charter',serif"},
  times:{ten:'Times New Roman', mota:'Quen thuộc như văn bản hành chính',
    css:"'Times New Roman',Times,serif"},
  georgia:{ten:'Georgia', mota:'Chữ số dáng cổ rất đẹp; chữ có dấu đôi khi bị rời',
    css:"Georgia,'Times New Roman',serif"},
  segoe:{ten:'Segoe UI', mota:'Hiện đại, gọn gàng, không chân',
    css:"'Segoe UI','SF Pro Text',system-ui,sans-serif"},
  candara:{ten:'Candara', mota:'Mềm mại, hơi ngả viết tay, vẫn dễ đọc',
    css:"Candara,Optima,'Gill Sans',sans-serif"},
  viettay:{ten:'Segoe Print', mota:'Viết tay, hợp ghi chú nhanh',
    css:"'Segoe Print','Bradley Hand',Noteworthy,cursive"},
  maychu:{ten:'Consolas', mota:'Máy chữ, đều nét — số liệu tự thẳng cột',
    css:"Consolas,Menlo,'Courier New',monospace"}
};
function phongHienTai(){ return PHONG_SO[D.cauHinh.phongSo] ? D.cauHinh.phongSo : 'constantia'; }
/* 3 kiểu hay dùng nhất, kiểu mới chọn đẩy kiểu ít dùng ra */
function phongNhanh(){
  var ds = (D.cauHinh.phongGanDay||[]).filter(function(k){ return PHONG_SO[k]; });
  ['constantia','georgia','maychu'].forEach(function(k){ if(ds.indexOf(k)<0 && ds.length<3) ds.push(k); });
  var ht = phongHienTai();
  if(ds.indexOf(ht)<0){ ds.unshift(ht); ds = ds.slice(0,3); }
  return ds.slice(0,3);
}
function moDsPhong(){
  var ht = phongHienTai();
  moHop('<div class="hop-tit">Kiểu chữ cuốn sổ</div>'+
    '<div class="hop-phu">Mỗi dòng hiện bằng chính kiểu chữ đó. Kiểu vừa chọn sẽ vào nhóm 3 nút nhanh trên sổ.</div>'+
    '<div class="ds-phong">'+Object.keys(PHONG_SO).map(function(k){
      var p = PHONG_SO[k];
      return '<div class="mot-phong'+(k===ht?' bat':'')+'" onclick="datPhongSo(\''+k+'\');dongHop()" '+
        'style="font-family:'+p.css+'">'+
        '<div class="mp-ten">'+coChuHTML(p.ten)+(k===ht?' <span class="mp-dang">đang dùng</span>':'')+'</div>'+
        '<div class="mp-mota">'+coChuHTML(p.mota)+'</div>'+
        '<div class="mp-thu">25/09/2026 · Gọi tổ trưởng Nguyễn Văn A — 2.237 tổ viên</div></div>';
    }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>', true);
}
function apPhongSo(){
  document.documentElement.style.setProperty('--font-so', PHONG_SO[phongHienTai()].css);
}
function datPhongSo(k){
  if(!PHONG_SO[k]) return;
  D.cauHinh.phongSo = k;
  var ds = (D.cauHinh.phongGanDay||[]).filter(function(x){ return x!==k && PHONG_SO[x]; });
  ds.unshift(k); D.cauHinh.phongGanDay = ds.slice(0,3);
  luu(); apPhongSo(); veNhatKy();
}
/* 3 nút thao tác thu nhỏ, nằm cuối dòng "Việc trong ngày" — chỉ hiện khi đã chọn một việc */
function thaoTacViecHTML(c, vsC){
  var co = !!(LICH.viecChon && vsC.some(function(v){ return v.id===LICH.viecChon; }));
  if(!co) return '<span class="nk-goi">bấm một việc để sửa, dời ngày, lưu ý, xóa</span>';
  var v = lcTim(LICH.viecChon);
  return '<span class="thao-tac">'+
    '<button onclick="lcSua()">✎ Sửa</button>'+
    '<button onclick="lcDoi()">Dời ngày</button>'+
    '<button onclick="lcLuuY()">'+(v&&v.luuY?'Bỏ lưu ý':'Lưu ý')+'</button>'+
    '<button class="xau" onclick="lcXoa()">Xóa</button></span>';
}
function veNhatKy(){
  var e = document.getElementById('nhat-ky'); if(!e) return;
  var c = LICH.chon, dc = lcNgay(c), vsC = lcViecNgay(c), L = lcData();
  var nk = (L.nhatKy||{})[c] || {};
  var hn = lcISO(nay());
  var h = '<div class="nk-trang"><div class="nk-dau"><div class="nk-dau-trai">'+
      '<div class="nk-thu">'+LC_THU[dc.getDay()]+(c===hn?' <span class="nk-hn">hôm nay</span>':'')+'</div>'+
      '<div class="nk-ngay">'+lcDMY(c)+'</div>'+
      '<div class="nk-am">Âm lịch '+lcAmChu(c)+' · tuần '+lcTuan(c)+
        (nhanNgayAm(c).length?' · <b class="nk-chay">'+coChuHTML(nhanNgayAm(c).join(' · '))+'</b>':'')+'</div>'+
      '<div class="nk-tot'+(saoNgay(c).hoangDao?' hd':'')+'" onclick="moNgayTot(\''+c+'\')" title="Bấm xem giờ hoàng đạo">'+
        coChuHTML(tomTatNgayTot(c))+' · <span class="nk-gio">giờ tốt: '+
        gioHoangDao(c).slice(0,3).map(function(x){ return x.chi; }).join(', ')+'…</span></div></div>'+
    khoiCauHTML(c)+'</div>'+'<div class="nk-than">'+
    '<div class="nk-muc">SCHEDULE<span class="nk-viet">Việc theo lịch</span>'+thaoTacViecHTML(c, vsC)+'</div>'+
    '<div class="lc-ds nk-ds">'+(vsC.length ? vsC.map(function(v){
      var xg = lcXongNgay(v, c);
      return '<div class="lc-viec'+(v.id===LICH.viecChon?' chon':'')+(xg?' xong':'')+(v.luuY?' luuy':'')+
        '" onclick="lcChonViec(\''+v.id+'\')" ondblclick="LICH.viecChon=\''+v.id+'\';lcSua()">'+
        '<span class="lc-tick" onclick="event.stopPropagation();lcXong(\''+v.id+'\')" title="Đánh dấu xong">'+(xg?'✓':'')+'</span>'+
        '<span class="lc-vten">'+(v.luuY?'⚑ ':'')+coChuHTML(v.ten)+'</span>'+
        (v.lap&&v.lap!=='mot'?'<small>'+LC_LAP[v.lap]+'</small>':'')+'</div>';
    }).join('') : '<div class="sch-gon">Chưa có việc theo lịch — gõ ở ô dưới cùng, cần nhắc lại thì bấm 🕘 đưa lên đây</div>')+'</div>'+
    '';   /* 3.19: bỏ ô nhập của SCHEDULE — gõ ở ô đáy sổ, cần nhắc lại thì bấm 🕘 đưa lên */
  var che = ntCheDo(), chung = ntChung(c), ghim = ntGhim();   /* chung có thể là null khi chưa ghi gì */
  /* 3.55 (anh chốt): nút ↶ Hoàn tác kiểu Word + số việc xong đưa lên cùng dòng tiêu đề — bớt một dòng dưới danh sách */
  var dd0 = che==='don' ? dsDong(c) : [], xong0 = dd0.filter(function(x){ return x.xong; }).length, nHT = soHoanTac();
  var nutHT = '<button class="nk-ht"'+(nHT?'':' disabled')+' onclick="hoanTac()" title="'+(nHT ? 'Hoàn tác (Ctrl+Z) — còn '+nHT+' bước' : 'Chưa có gì để hoàn tác')+'">↶'+(nHT?'<sup>'+nHT+'</sup>':'')+'</button>';
  h += '<div class="nk-muc">'+(che==='don'?'TO-DO LIST<span class="nk-viet">'+(dd0.length ? xong0+'/'+dd0.length+' xong' : 'Ghi chép trong ngày')+'</span>':'GHI CHÉP<span class="nk-viet">Mẩu giấy màu</span>')+nutHT+
    '<span class="nt-doi">'+
      '<button class="nt-che'+(che==='don'?' bat':'')+'" onclick="ntDatChe(\'don\')" title="Danh sách gạch dòng, tick xong">▤ Dòng</button>'+
      '<button class="nt-che'+(che==='note'?' bat':'')+'" onclick="ntDatChe(\'note\')" title="Lưới mẩu giấy màu, ghim được">⬚ Note màu</button>'+
    '</span>'+
    '<span class="nt-doi nt-phong">'+phongNhanh().map(function(k){
      return '<button class="nt-che'+(phongHienTai()===k?' bat':'')+'" onclick="datPhongSo(\''+k+'\')" '+
        'title="'+coChuHTML(PHONG_SO[k].ten+' — '+PHONG_SO[k].mota)+'" style="font-family:'+PHONG_SO[k].css+'">A</button>';
    }).join('')+'<button class="nt-che mui" onclick="moDsPhong()" title="Xem đủ 8 kiểu chữ">▾</button></span>'+
    (che==='don'?'<span class="nk-luu" id="nk-luu">'+(chung&&chung.suaLuc?'đã lưu '+chung.suaLuc.slice(11,16):'')+'</span>':'')+'</div>';
  if(ghim.length) h += '<div class="nt-ghim-hang"><div class="nt-ghim-nhan">📌 Ghim</div><div class="nt-luoi">'+
    ghim.map(function(m){ return ntOHTML(m, true); }).join('')+'</div></div>';
  if(che==='don'){
    if(chung && (chung.nd||'').trim()) tachChungThanhDong(c);   /* ghi chép cũ → tách thành dòng */
    var dd = dsDong(c), xong = dd.filter(function(x){ return x.xong; }).length;
    var hq = dongChuaXongHomQua(c);
    if(hq.length) h += '<div class="nk-nhac"><span>↪ Hôm qua còn <b>'+hq.length+'</b> việc chưa xong</span>'+
      '<button class="nho" onclick="dongChuyenHomQua(\''+c+'\')" title="Chuyển các việc chưa xong hôm qua sang hôm nay">→ Hôm nay</button></div>';
    h += '<div class="dong-ds">'+(dd.length ? dd.map(function(m){
        var chon = DONG_CHON.indexOf(m.id)>=0;
        return '<div class="dong-o nt-'+(m.mau||'trang')+(m.xong?' xong':'')+(chon?' dang-chon':'')+'">'+
          '<span class="dong-tick" onclick="dongXong(\''+m.id+'\')" title="'+(m.xong?'Bỏ đánh dấu xong':'Đánh dấu xong')+'">'+(m.xong?'✓':'')+'</span>'+
          '<textarea rows="1" class="dong-chu" oninput="ntGo(\''+m.id+'\',this);dongCaoTuDong(this)" onfocus="dongCaoTuDong(this)" '+
            'onblur="ntRoiO(\''+m.id+'\');this.style.height=\'\'" onkeydown="dongPhim(event,\''+m.id+'\',\''+c+'\')">'+coChuHTML(m.nd||'')+'</textarea>'+
          '<span class="dong-gio">'+(m.xong ? 'xong '+m.xong.slice(11,16) : (m.taoLuc||'').slice(11,16))+'</span>'+
          '<span class="dong-thaotac">'+
            '<button title="Gắn ảnh / file" onclick="nkMenuDinh(\''+m.id+'\')">📎</button>'+
            '<button title="Đưa lên SCHEDULE" onclick="dongLenLich(\''+m.id+'\')">🕘</button>'+
            '<button title="Lên trên" onclick="dongChuyen(\''+m.id+'\',-1)">↑</button>'+
            '<button title="Xuống dưới" onclick="dongChuyen(\''+m.id+'\',1)">↓</button>'+
            '<button class="xau" title="Xóa dòng (lấy lại được bằng ↶)" onclick="dongXoa(\''+m.id+'\')">✕</button>'+
          '</span>'+
          '<span class="dong-chon'+(chon?' bat':'')+'" onclick="dongChon(\''+m.id+'\')" title="Chọn để xóa nhiều dòng">'+(chon?'✓':'')+'</span>'+
          '<span class="nt-luu" id="nt-luu-'+m.id+'"></span>'+
          /* 3.53: chấm màu chỉ hiện khi chạm / rê vào dòng — các nút khác hiện sẵn */
          '<span class="dong-mau">'+Object.keys(NT_MAU).map(function(k){
              return '<i class="dcham nt-'+k+(m.mau===k?' bat':'')+'" title="'+NT_MAU[k]+'" onmousedown="event.preventDefault()" onclick="dongDoiMau(\''+m.id+'\',\''+k+'\')"></i>';
            }).join('')+'<small>màu dòng</small></span></div>'+nkDinhHTML(m);
      }).join('') : '<div class="lc-rong">Chưa có việc nào — gõ vào ô dưới cùng rồi bấm Enter</div>')+'</div>';
    if(DONG_CHON.length) h += '<div class="dong-nhom">Đã chọn <b>'+DONG_CHON.length+'</b> dòng'+
      '<span class="dn-mau">'+Object.keys(NT_MAU).map(function(k){
        return '<i class="dcham nt-'+k+'" title="Đổi màu '+NT_MAU[k]+'" onclick="dongMauNhieu(\''+k+'\')"></i>'; }).join('')+'</span>'+
      '<button class="nho" onclick="dongChonHet(\''+c+'\')">Chọn hết</button>'+
      '<button class="nho" onclick="dongBoChon()">Bỏ chọn</button>'+
      '<button class="nho xau" onclick="dongXoa(DONG_CHON.slice())">Xóa '+DONG_CHON.length+' dòng</button></div>';
  }else{
    var ds = ntNgay(c).filter(function(x){ return !x.ghim && (!x.chung || (x.nd||'').trim()); });
    h += '<div class="nt-them-hang">'+Object.keys(NT_MAU).map(function(k){
        return '<button class="nt-them nt-'+k+'" onclick="ntThem(\''+k+'\')" title="Thêm mẩu '+NT_MAU[k]+'">+</button>';
      }).join('')+'<button class="nt-them nk-cam-nho" onclick="nkChupNhanh()" title="Chụp ảnh — tự lưu thành một mẩu">📷</button>'+
      '<span class="nt-goi">Thêm mẩu: bấm màu tương ứng — đỏ việc gấp, cam quan trọng, xanh lưu ý</span></div>';
    h += '<div class="nt-luoi" id="nt-luoi">'+(ds.length ? ds.map(function(m){ return ntOHTML(m, false); }).join('')
      : '<div class="lc-rong">Chưa có mẩu nào cho ngày này — bấm một màu ở trên để thêm</div>')+'</div>';
  }
  h += '</div>';   /* đóng .nk-than */
  if(che==='don') h += '<div class="o-go"><button class="og-cam" onclick="nkChupNhanh()" title="Chụp ảnh — tự lưu thành một dòng của ngày này">📷</button>'+
    '<input id="nk-dong-moi" placeholder="Gõ việc rồi bấm Enter…" onkeydown="dongGoThem(this,\''+c+'\',event)">'+
    '<button class="og-them" onclick="dongGoThem(document.getElementById(\'nk-dong-moi\'),\''+c+'\',{key:\'Enter\'})">Thêm</button></div>';
  h += '</div>';   /* đóng .nk-trang */
  e.innerHTML = h;
  nkNapAnhNho();
  canCaoSo();
}
/* 3.53b: máy tính — sổ ghi chú (và cột lịch) kéo dài sát thanh đáy mới (thấp hơn), không chừa khoảng trống */
function canCaoSo(){
  var r = document.documentElement;
  if(window.innerWidth < 900){ r.style.removeProperty('--cao-so'); return; }
  var e = document.querySelector('.blv-nk .nk-trang') || document.querySelector('.blv-trai'); if(!e || !e.offsetParent) return;
  var day = document.querySelector('.day'), cd = day ? day.getBoundingClientRect().height : 30;
  var top = e.getBoundingClientRect().top + (window.scrollY||0);
  r.style.setProperty('--cao-so', Math.max(420, Math.floor(window.innerHeight - top - cd - 10))+'px');
}
window.addEventListener('resize', function(){ clearTimeout(canCaoSo.t); canCaoSo.t = setTimeout(canCaoSo, 150); });
window.addEventListener('load', function(){ setTimeout(canCaoSo, 400); });
var NK_HEN = null;
function chayGanNhat(){
  if((D.cauHinh.cheChay||'thap')==='khong') return '';
  var hn = lcISO(nay());
  for(var i=0;i<=40;i++){
    var iso = lcCong(hn, i);
    if(laNgayChay(iso)) return (i===0?'hôm nay':(i===1?'mai':lcDM(iso)))+' ('+lcAmChu(iso)+' â.l)';
  }
  return '';
}
function lcSapToi(){
  if(!lcData().viec.length) return '<span>chưa có việc nào được ghi</span>';
  var ra = [], hn = lcISO(nay());
  for(var i=1; i<=14 && ra.length<3; i++){
    var iso = lcCong(hn, i);
    lcViecNgay(iso).forEach(function(v){ if(ra.length<3 && !lcXongNgay(v, iso)) ra.push({iso:iso, v:v}); });
  }
  var chay = chayGanNhat();
  var phu = chay ? '<span class="lc-chay-nho">☸ Ngày chay: '+coChuHTML(chay)+'</span>' : '';
  return (ra.length ? ra.map(function(x){
      return '<a onclick="lcChonNgay(\''+x.iso+'\')">'+lcDM(x.iso)+' '+coChuHTML(x.v.ten)+'</a>';
    }).join(' · ') : '<span>14 ngày tới chưa có việc</span>') + phu;
}

/* ---------- thao tác ---------- */
function lcThang(n){
  var d = new Date(LICH.nam, LICH.thang+n, 1); LICH.nam = d.getFullYear(); LICH.thang = d.getMonth(); veLich();
}
function lcHomNay(){ LICH.chon = ''; LICH.viecChon = ''; lcDau(); veLich(); }
function lcChonNgay(iso){
  var d = lcNgay(iso); LICH.chon = iso; LICH.viecChon = '';
  LICH.nam = d.getFullYear(); LICH.thang = d.getMonth(); veLich();
}
function lcChonViec(id){ LICH.viecChon = (LICH.viecChon===id) ? '' : id; veLich(); }
/* thêm việc theo lịch không cần ô nhập (ô nhập của SCHEDULE đã bỏ ở 3.19) */
function lcThemNhanh(ten, lap, iso){
  ten = (ten||'').trim(); if(!ten) return null;
  var t = new Date().toISOString();
  var v = {id:idMoi(), ten:ten, ngay:iso||LICH.chon, lap:lap||'mot', luuY:false,
           xong:false, xongNgay:{}, bo:[], taoLuc:t, suaLuc:t};
  lcData().viec.push(v); lcDoiLich();
  return v;
}
function lcThem(){
  var e = document.getElementById('lc-o'), ten = (e && e.value || '').trim();
  if(!ten){ if(e) e.focus(); return bao('Gõ việc cần làm vào ô rồi bấm Thêm.', 3); }
  var t = new Date().toISOString();
  lcData().viec.push({id:idMoi(), ten:ten, ngay:LICH.chon, lap:gt('lc-lap')||'mot', luuY:false,
    xong:false, xongNgay:{}, bo:[], taoLuc:t, suaLuc:t});
  lcDoiLich();
  var o = document.getElementById('lc-o'); if(o) o.focus();
}
function lcTim(id){ return lcData().viec.find(function(v){ return v.id===id; }); }
function lcXong(id){
  var v = lcTim(id); if(!v) return;
  if(v.lap==='mot' || !v.lap) v.xong = !v.xong;
  else { v.xongNgay = v.xongNgay||{}; if(v.xongNgay[LICH.chon]) delete v.xongNgay[LICH.chon]; else v.xongNgay[LICH.chon] = true; }
  v.suaLuc = new Date().toISOString(); lcDoiLich();
}
function lcLuuY(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  v.luuY = !v.luuY; v.suaLuc = new Date().toISOString(); lcDoiLich();
}
function lcDoi(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  var tu = LICH.chon, t2 = lcCong(tu, (8-lcNgay(tu).getDay())%7 || 7);
  moHop('<div class="hop-tit">Dời ngày</div>'+
    '<div class="hop-phu">'+coChuHTML(v.ten)+' — đang ở '+LC_THU[lcNgay(tu).getDay()]+' '+lcDMY(tu)+
      (v.lap&&v.lap!=='mot'?'<br>Việc lặp '+LC_LAP[v.lap].toLowerCase()+': chỉ dời <b>lần ngày này</b>, các lần khác giữ nguyên.':'')+'</div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="lcDoiDen(\''+lcCong(tu,1)+'\')">+1 ngày</button>'+
      '<button class="nho" onclick="lcDoiDen(\''+t2+'\')">Thứ Hai tới</button>'+
      '<button class="nho" onclick="lcDoiDen(\''+lcCong(tu,7)+'\')">+1 tuần</button></div>'+
    '<div class="o"><label>Hoặc chọn ngày</label><input id="lc-doi" inputmode="numeric" placeholder="dd/mm/yyyy" '+
      'value="'+lcDMY(lcCong(tu,1))+'" oninput="gonNgay(this)"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" onclick="lcDoiDen(ngayISOo(gt(\'lc-doi\')))">Dời</button></div>');
}
function lcDoiDen(iso){
  var v = lcTim(LICH.viecChon); if(!v) return;
  if(!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return baoLoi('Ngày chưa đúng, gõ dạng dd/mm/yyyy.');
  var t = new Date().toISOString(), tu = LICH.chon;
  if(v.lap==='mot' || !v.lap){ v.ngay = iso; v.suaLuc = t; LICH.viecChon = v.id; }
  else {
    v.bo = v.bo||[]; if(v.bo.indexOf(tu)<0) v.bo.push(tu); v.suaLuc = t;
    var moi = {id:idMoi(), ten:v.ten, ngay:iso, lap:'mot', luuY:v.luuY, xong:false, xongNgay:{}, bo:[], taoLuc:t, suaLuc:t};
    lcData().viec.push(moi); LICH.viecChon = moi.id;
  }
  dongHop(); var d = lcNgay(iso); LICH.chon = iso; LICH.nam = d.getFullYear(); LICH.thang = d.getMonth();
  lcDoiLich(); bao('Đã dời sang '+LC_THU[d.getDay()]+' '+lcDMY(iso)+'.', 4);
}
function lcXoa(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  if(v.lap && v.lap!=='mot'){
    moHop('<div class="hop-tit">Xóa việc lặp</div>'+
      '<div class="hop-phu">'+coChuHTML(v.ten)+' — lặp '+LC_LAP[v.lap].toLowerCase()+'.</div>'+
      '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho" onclick="lcXoaMotLan()">Chỉ lần ngày '+lcDM(LICH.chon)+'</button>'+
      '<button class="nho xau" onclick="lcXoaHan()">Xóa cả chuỗi</button></div>');
  } else hoi('Xóa việc này?', coChuHTML(v.ten)+' — ngày '+lcDMY(v.ngay), 'Xóa', lcXoaHan);
}
function lcXoaMotLan(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  v.bo = v.bo||[]; if(v.bo.indexOf(LICH.chon)<0) v.bo.push(LICH.chon);
  v.suaLuc = new Date().toISOString(); LICH.viecChon = ''; dongHop(); lcDoiLich();
}
function lcXoaHan(){
  var L = lcData(), id = LICH.viecChon;
  L.viec = L.viec.filter(function(v){ return v.id!==id; });
  L.daXoa.push({id:id, luc:new Date().toISOString()});
  LICH.viecChon = ''; dongHop(); lcDoiLich();
}

/* ---------- Danh sách: quá hạn + 60 ngày tới ---------- */
function lcDanhSach(){
  var hn = lcISO(nay()), dong = [];
  for(var i=-30; i<=60; i++){
    var iso = lcCong(hn, i);
    lcViecNgay(iso).forEach(function(v){
      var xg = lcXongNgay(v, iso);
      if(i<0 && xg) return;                 /* quá khứ chỉ hiện việc chưa xong */
      dong.push({iso:iso, v:v, xg:xg, qua:i<0});
    });
  }
  var nhom = {}, thuTu = [];
  dong.forEach(function(x){ if(!nhom[x.iso]){ nhom[x.iso] = []; thuTu.push(x.iso); } nhom[x.iso].push(x); });
  var h = '<div class="hop-tit">Danh sách việc</div>'+
    '<div class="hop-phu">Việc quá hạn chưa xong (30 ngày qua) và việc 60 ngày tới. Bấm một dòng để mở ngày đó.</div>';
  h += thuTu.length ? thuTu.map(function(iso){
    var d = lcNgay(iso);
    return '<div class="lc-dsn'+(iso<hn?' qua':'')+(iso===hn?' nay':'')+'"><div class="lc-dsn-dau">'+
      LC_THU[d.getDay()]+' '+lcDMY(iso)+' · âm '+lcAmChu(iso)+(iso<hn?' · <b>quá hạn</b>':iso===hn?' · <b>hôm nay</b>':'')+'</div>'+
      nhom[iso].map(function(x){
        return '<div class="lc-dsn-v'+(x.xg?' xong':'')+'" onclick="dongHop();lcChonNgay(\''+iso+'\')">'+
          (x.v.luuY?'⚑ ':'')+coChuHTML(x.v.ten)+(x.v.lap&&x.v.lap!=='mot'?' <small>'+LC_LAP[x.v.lap]+'</small>':'')+'</div>';
      }).join('')+'</div>';
  }).join('') : '<div class="lc-rong">Không có việc nào trong khoảng này.</div>';
  h += '<div class="hang-nut" style="margin-top:10px"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>';
  moHop(h);
}

/* ---------- Tính ngày ---------- */
function lcTinhNgay(){
  var c = lcDMY(LICH.chon||lcISO(nay()));
  moHop('<div class="hop-tit">Tính ngày</div>'+
    '<div class="nhan-nhom">Cộng / trừ ngày</div>'+
    '<div class="lc-tn"><input id="tn-tu" inputmode="numeric" value="'+c+'" oninput="gonNgay(this);lcTinh()">'+
      '<select id="tn-dau" onchange="lcTinh()"><option value="1">cộng</option><option value="-1">trừ</option></select>'+
      '<input id="tn-n" type="number" min="0" value="15" oninput="lcTinh()" style="width:80px">'+
      '<select id="tn-kieu" onchange="lcTinh()"><option value="n">ngày</option><option value="lv">ngày làm việc</option></select></div>'+
    '<div class="lc-kq" id="tn-kq1"></div>'+
    '<div class="nhan-nhom">Khoảng cách giữa 2 ngày</div>'+
    '<div class="lc-tn"><input id="tn-a" inputmode="numeric" value="'+c+'" oninput="gonNgay(this);lcTinh()">'+
      '<span>đến</span><input id="tn-b" inputmode="numeric" value="'+lcDMY(lcCong(ngayISOo(c)||lcISO(nay()),30))+'" oninput="gonNgay(this);lcTinh()"></div>'+
    '<div class="lc-kq" id="tn-kq2"></div>'+
    '<div class="huong-dan">Ngày làm việc = trừ Thứ Bảy, Chủ nhật (chưa trừ ngày lễ).</div>'+
    '<div class="hang-nut" style="margin-top:10px"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>');
  lcTinh();
}
function lcLamViec(iso){ var t = lcNgay(iso).getDay(); return t!==0 && t!==6; }
function lcCongLV(iso, n, dau){
  var d = iso, dem = 0;
  while(dem < n){ d = lcCong(d, dau); if(lcLamViec(d)) dem++; }
  return d;
}
function lcTinh(){
  var tu = ngayISOo(gt('tn-tu')), n = Math.max(0, parseInt(gt('tn-n'),10)||0), dau = +gt('tn-dau')||1;
  var e1 = document.getElementById('tn-kq1'), e2 = document.getElementById('tn-kq2');
  if(e1){
    if(!tu) e1.textContent = 'Gõ ngày dạng dd/mm/yyyy';
    else {
      var kq = gt('tn-kieu')==='lv' ? lcCongLV(tu, n, dau) : lcCong(tu, dau*n);
      e1.innerHTML = '→ <b>'+LC_THU[lcNgay(kq).getDay()]+' '+lcDMY(kq)+'</b> · âm '+lcAmChu(kq)+' · tuần '+lcTuan(kq);
    }
  }
  var a = ngayISOo(gt('tn-a')), b = ngayISOo(gt('tn-b'));
  if(e2){
    if(!a || !b) e2.textContent = 'Gõ đủ 2 ngày dạng dd/mm/yyyy';
    else {
      var x = a<b?a:b, y = a<b?b:a, so = Math.round((lcNgay(y)-lcNgay(x))/864e5), lv = 0;
      for(var d = x; d < y; d = lcCong(d,1)) if(lcLamViec(lcCong(d,1))) lv++;
      e2.innerHTML = '→ <b>'+so+' ngày</b> ('+lv+' ngày làm việc)';
    }
  }
}

/* ---------- đồng bộ _Hệ thống/lich.json ---------- */
var LICH_HEN = null;
function henDongBoLich(){
  if(!coTheNoiDrive() || !DR.sanSang) return;
  clearTimeout(LICH_HEN); LICH_HEN = setTimeout(dayLichLenDrive, 5000);
}
function dayLichLenDrive(){
  var L = lcData(), duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){
    return timFileTrong('lich.json', idTM).then(function(cu){
      var han = Date.now()-60*864e5;
      L.daXoa = L.daXoa.filter(function(x){ return new Date(x.luc).getTime()>han; });
      L.noteXoa = (L.noteXoa||[]).filter(function(x){ return Date.now()-new Date(x.luc).getTime() < 366*864e5; });
      return ghiJSONLenDrive('lich.json', idTM, {xuatLuc:new Date().toISOString(), may:maMayCua(), viec:L.viec,
        daXoa:L.daXoa, nhatKy:L.nhatKy||{}, note:L.note||[], noteXoa:L.noteXoa}, cu);
    });
  }).catch(function(e){ console.warn('Không đẩy được lịch', e); });
}
/* gộp: mỗi việc lấy bản sửa sau (suaLuc); việc đã xóa (daXoa) thì bỏ nếu xóa sau lần sửa cuối */
function gopLich(r){
  var L = lcData(), doi = 0, xoa = {};
  L.daXoa.concat(r.daXoa||[]).forEach(function(x){ if(!xoa[x.id] || x.luc>xoa[x.id]) xoa[x.id] = x.luc; });
  var theoId = {}; L.viec.forEach(function(v){ theoId[v.id] = v; });
  (r.viec||[]).forEach(function(v){
    var co = theoId[v.id];
    if(!co){ theoId[v.id] = v; doi++; }
    else if((v.suaLuc||'') > (co.suaLuc||'')){ theoId[v.id] = v; doi++; }
  });
  var ds = Object.keys(theoId).map(function(k){ return theoId[k]; }).filter(function(v){
    if(xoa[v.id] && xoa[v.id] >= (v.suaLuc||'')){ if(L.viec.some(function(x){ return x.id===v.id; })) doi++; return false; }
    return true;
  });
  L.viec = ds;
  L.daXoa = Object.keys(xoa).map(function(k){ return {id:k, luc:xoa[k]}; });
  /* mẩu ghi chú: bản sửa sau thắng; mẩu đã xóa thì bỏ ở mọi máy */
  L.note = L.note || []; L.noteXoa = L.noteXoa || [];
  var xoaN = {};
  L.noteXoa.concat(r.noteXoa||[]).forEach(function(x){ if(!xoaN[x.id] || x.luc>xoaN[x.id]) xoaN[x.id] = x.luc; });
  L.noteXoa = Object.keys(xoaN).map(function(k){ return {id:k, luc:xoaN[k]}; });
  var theoN = {}; L.note.forEach(function(m){ theoN[m.id] = m; });
  (r.note||[]).forEach(function(m){
    var co = theoN[m.id];
    if(!co || (m.suaLuc||'') > (co.suaLuc||'')){ theoN[m.id] = m; doi++; }
  });
  L.note = Object.keys(theoN).map(function(k){ return theoN[k]; })
    .filter(function(m){ return !(xoaN[m.id] && xoaN[m.id] >= (m.suaLuc||'')); });
  L.nhatKy = L.nhatKy || {};
  Object.keys(r.nhatKy||{}).forEach(function(ng){
    var a = L.nhatKy[ng], b = r.nhatKy[ng];
    if(!a || (b.suaLuc||'') > (a.suaLuc||'')){ L.nhatKy[ng] = b; doi++; }
  });
  return doi;
}
function taiLichTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){ return timFileTrong('lich.json', idTM); })
  .then(function(f){
    if(!f){ if(lcData().viec.length) henDongBoLich(); return null; }
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media');
  }).then(function(r){
    if(!r) return 0;
    var n = gopLich(r); luu(); veLich();
    henDongBoLich();     /* đẩy lại bản đã gộp (có thể có việc chỉ máy này có) */
    return n;
  }).catch(function(e){ console.warn('Không tải được lịch', e); return 0; });
}

/* tìm trong mẩu ghi chú và việc trong lịch (3.13) — hiện ở tab Hôm nay */
function timGhiChu(q){
  if(!q || q.length<2) return [];
  var qq = boDau(q), ra = [];
  ntData().note.forEach(function(m){
    if(boDau(m.nd||'').indexOf(qq)>=0 && (m.nd||'').trim())
      ra.push({loai:'Ghi chú', ngay:m.ngay, chu:m.nd, mau:m.mau||'vang'});
  });
  lcData().viec.forEach(function(v){
    if(boDau(v.ten||'').indexOf(qq)>=0) ra.push({loai:'Việc', ngay:v.ngay, chu:v.ten, mau:'trang'});
  });
  return ra.sort(function(a,b){ return (b.ngay||'').localeCompare(a.ngay||''); }).slice(0,10);
}
function veTimGhiChu(){
  var e = document.getElementById('tim-ghichu'); if(!e) return;
  var o = document.getElementById('otim');
  var ds = timGhiChu(o ? o.value.trim() : '');
  if(!ds.length){ e.innerHTML = ''; return; }
  e.innerHTML = '<div class="nhan-nhom">Tìm thấy trong ghi chú &amp; lịch ('+ds.length+')</div>'+
    ds.map(function(x){
      return '<div class="tgc-dong nt-'+x.mau+'" onclick="lcChonNgay(\''+x.ngay+'\')">'+
        '<span class="tgc-ngay">'+lcDM(x.ngay)+'</span>'+
        '<span class="tgc-chu">'+coChuHTML((x.chu||'').slice(0,110))+'</span>'+
        '<small>'+x.loai+'</small></div>';
    }).join('');
}
function datGon(k){ D.cauHinh[k] = !D.cauHinh[k]; luu(); veHomNay(); }
function veHomNay(){
  /* 3.29: tab Hôm nay là BÀN LÀM VIỆC — bỏ hẳn hàng nút thêm file, nhường chỗ cho sổ.
     Thêm file: sang tab Văn bản · Thùng rác: nút 🗑 trên thanh trên cùng · Chờ khai: thẻ trong Cần xử lý */
  var dth = document.getElementById('dau-homnay');
  if(dth) dth.innerHTML = '';
  veTimGhiChu();
  var v = [];
  var nCK = demChoKhai();
  if(nCK){
    var gCK = dsChoKhai();
    v.push({so:nCK, tit:'File chờ khai thông tin', ngan:'📥 '+nCK+' chờ khai',
      p:Object.keys(gCK).filter(function(k){ return gCK[k].length; }).map(function(k){ return CK_TEN[k].split(' — ')[0]+' '+gCK[k].length; }).join(' · '),
      gap:true, fn:'moChoKhai()'});
  }
  var thieu = [];   /* 3.144: bỏ tab Tháng → không nhắc "thiếu báo cáo tháng" nữa (kyThieu() giữ mã cho đợt dọn) */
  var gbCon = ngayToiGiaoBan();
  if(thieu.length && gbCon>=0){
    v.push({so:gbCon, tit:(gbCon===0?'Hôm nay giao ban':'Còn '+gbCon+' ngày tới giao ban')+', thiếu '+thieu.length+' báo cáo',
      ngan:'📊 Thiếu '+thieu.length+' BC · '+(gbCon===0?'giao ban hôm nay':'còn '+gbCon+' ngày GB'),
      p:chuoiThieu(thieuTheoKy(kyGanNhat())), gap:true, fn:'datKyBang(\''+kyGanNhat()+'\');doiNgan(2)'});
  }else if(thieu.length){
    var kg = kyGanNhat();
    v.push({so:thieu.length, tit:kyVN(kg)+' còn thiếu báo cáo', ngan:'📊 '+kyVN(kg)+' thiếu '+thieu.length+' BC',
      p:chuoiThieu(thieuTheoKy(kg)), gap:true, fn:'datKyBang(\''+kg+'\');doiNgan(2)'});
  }
  var tdv = tdnViecCan();   /* 3.64: cam kết trả nợ đến hạn, nợ khoanh sắp hết hạn */
  if(tdv.n) v.push({so:tdv.n, tit:'Theo dõi nợ: '+tdv.n+' việc', ngan:'⚠ Theo dõi nợ: '+tdv.p, p:tdv.p, gap:true, fn:"doiNgan(3);D.cauHinh.tvPhan='no';TDN.mo='';veGhiChu()"});
  var canXL = D.ghiChu.filter(function(g){ return (g.the||[]).indexOf('Cần xử lý')>=0; });
  if(canXL.length){
    v.push({so:canXL.length, tit:'Ghi chú đánh dấu cần xử lý', ngan:'🖼 '+canXL.length+' ghi chú cần xử lý',
      p:'Cũ nhất từ '+ngayVN(canXL[canXL.length-1].ngay), gap:false, di:3});
  }
  var h = '';
  if(v.length){
    /* 3.53 (anh chốt): gom thành MỘT dòng — bấm chip đi thẳng tới việc, bấm ▾ mở thẻ đầy đủ, ▴ thu lại */
    var moCXL = !!D.cauHinh.moCXL;
    h += '<div class="gon-dong'+(moCXL?' mo':'')+'" onclick="datGon(\'moCXL\')"><b>⚠ Cần xử lý</b><span class="gon-ds">'+
      v.map(function(x){ return '<span class="gon-chip'+(x.gap?' gap':'')+'" onclick="event.stopPropagation();'+(x.fn||('doiNgan('+x.di+')'))+'">'+coChuHTML(x.ngan||x.tit)+'</span>'; }).join('')+
      '</span><span class="gon-mui">'+(moCXL?'▴':'▾')+'</span></div>';
    if(moCXL) v.forEach(function(x){
      h += '<div class="viec'+(x.gap?' gap':'')+'" onclick="'+(x.fn||('doiNgan('+x.di+')'))+'">'+
           '<div class="so">'+x.so+'</div><div class="nd"><div class="tit">'+x.tit+
           '</div><div class="p">'+coChuHTML(x.p)+'</div></div><div class="mui">›</div></div>';
    });
  }else{
    /* 3.18: trống thì chỉ một dòng mảnh, nhường chỗ cho "Vừa xem gần đây" */
    h += '<div class="cxl-gon">✓ Không có việc nào đang chờ</div>';
  }
  document.getElementById('ds-viec').innerHTML = h;

  var g = D.ganDay.map(timMuc).filter(Boolean).slice(0,5);
  /* 3.53 (anh chốt): thu gọn 1 dòng, bấm để mở */
  var moGD = !!D.cauHinh.moGanDay && g.length;
  var gd = document.getElementById('gan-dau');
  if(gd) gd.innerHTML = '<div class="gon-dong'+(moGD?' mo':'')+(g.length?'':' tat')+'"'+(g.length?' onclick="datGon(\'moGanDay\')"':'')+'>'+
    '<b>🕘 Vừa xem gần đây</b><span class="gon-ds">'+(g.length ? '<span class="gon-phu">'+g.length+' mục</span>' : '<span class="gon-phu">chưa xem mục nào</span>')+'</span>'+
    (g.length ? '<span class="gon-mui">'+(moGD?'▴':'▾')+'</span>' : '')+'</div>';
  document.getElementById('ds-ganday').innerHTML = moGD ? g.map(function(m){ return dongHTML(m,''); }).join('') : '';
  veLich();
}

/* ==========================================================
   TAB THÁNG 3.20 — chỉ lưu BẢN CUỐI THÁNG (anh chốt 24/09)
   Ngày số liệu đọc trong NỘI DUNG (không phải ngày trong tên file):
     = ngày cuối tháng  → bản cuối tháng → lưu
     < ngày cuối tháng  → dữ liệu phụ    → không lưu (vẫn có nút "Vẫn lưu")
     đọc không ra       → KHÔNG đoán, đưa vào nhóm cần xem
   ========================================================== */
function ngayCuoiThang(nam, thang){ return new Date(nam, thang, 0).getDate(); }  /* tháng 2 tự đúng năm nhuận */
/* đọc ngày số liệu trong chữ của file — bắt nhiều cách viết */
function docNgaySoLieu(chu){
  if(!chu) return null;
  var t = ' '+chu.replace(/\s+/g,' ')+' ';
  var mau = [
    /(?:đến|den|tính đến|tinh den|tới|toi)\s*(?:hết\s*)?(?:ngày|ngay)?\s*(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/i,
    /(?:đến|den|tính đến|tinh den)\s*(?:ngày|ngay)\s*(\d{1,2})\s*tháng\s*(\d{1,2})\s*năm\s*(\d{4})/i,
    /(?:số liệu|so lieu|thời điểm|thoi diem)[^0-9]{0,20}(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/i,
    /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})\b/
  ];
  for(var i=0;i<mau.length;i++){
    var m = t.match(mau[i]);
    if(m){
      var d = +m[1], th = +m[2], y = +m[3];
      if(d>=1 && d<=31 && th>=1 && th<=12 && y>=2000 && y<=2100)
        return {ngay:d, thang:th, nam:y, iso:y+'-'+('0'+th).slice(-2)+'-'+('0'+d).slice(-2)};
    }
  }
  return null;
}
/* xếp loại một file dữ liệu tháng: cuoi | phu | chuaro */
/* đọc phạm vi: tên xã/phường hoặc tên điểm giao dịch có trong chữ hoặc tên file */
function docPhamVi(chu, tenFile){
  var t = boDau((chu||'')+' '+(tenFile||''));
  var diem = dsDonVi('diem'), xa = dsDonVi('xa');
  var tim = function(ds){
    var ra = null;
    ds.forEach(function(x){ if(!ra && boDau(x) && t.indexOf(boDau(x))>=0) ra = x; });
    return ra;
  };
  return tim(diem) || tim(xa) || (/toan pgd|toan don vi|toan huyen/.test(t) ? 'Toàn PGD' : '');
}
function loaiBanThang(nsl, ma){
  /* 3.27: loại theo ngày giao dịch (KQGD) — mỗi phiên là bản chính thức, không có "giữa tháng" */
  if(ma && mauTheoNgay(ma) && nsl)
    return {loai:'cuoi', ky:nsl.nam+'-'+('0'+nsl.thang).slice(-2), ngay:nsl, theoNgay:true};
  if(!nsl) return {loai:'chuaro'};
  var cuoi = ngayCuoiThang(nsl.nam, nsl.thang);
  var ky = nsl.nam+'-'+('0'+nsl.thang).slice(-2);
  return (nsl.ngay===cuoi)
    ? {loai:'cuoi', ky:ky, ngay:nsl, cuoi:cuoi}
    : {loai:'phu',  ky:ky, ngay:nsl, cuoi:cuoi};
}
function chuBanThang(m){
  if(m.banPhu) return 'giữa tháng '+(m.nsl||'').slice(8,10)+'-'+(m.nsl||'').slice(5,7);
  return '';
}
/* ---- cấp và phạm vi ---- */
function dsCap(){ return [['pgd','Toàn PGD'],['xa','Xã, phường'],['diem','Điểm giao dịch']]; }
function dsDonVi(cap){
  var db = D.cauHinh.diaBan||[];
  if(cap==='pgd') return ['Toàn PGD'];
  if(cap==='xa')  return db.map(function(x){ return x.xa; });
  var ra = [];
  db.forEach(function(x){ (x.diem||[]).forEach(function(d){ if(ra.indexOf(d.ten)<0) ra.push(d.ten); }); });
  return ra;
}
function capCuaPhamVi(pv){
  if(!pv || /toàn pgd|toan pgd/i.test(pv)) return 'pgd';
  return (dsDonVi('xa').indexOf(pv)>=0) ? 'xa' : (dsDonVi('diem').indexOf(pv)>=0 ? 'diem' : 'pgd');
}
/* loại báo cáo áp dụng cho cấp nào — khai trong Cài đặt, để trống = mọi cấp */
/* 3.27: chu kỳ báo cáo — thang (mặc định) · quy · sau · nam · ngay */
function chuKy(m){ return m.chuKy || (m.theoNgay ? 'ngay' : 'thang'); }
function toiKy(m, ky){
  var t = +String(ky).slice(5,7), ck = chuKy(m);
  if(ck==='quy') return [3,6,9,12].indexOf(t)>=0;
  if(ck==='sau') return [6,12].indexOf(t)>=0;
  if(ck==='nam') return t===12;
  return true;
}
function laThuanXLS(m){ return !!m.thuanXLS; }
function khoiMo(k){ var x = D.cauHinh.khoiMo || {}; return x[k]!==false; }
function batKhoi(k){
  D.cauHinh.khoiMo = D.cauHinh.khoiMo || {};
  D.cauHinh.khoiMo[k] = !khoiMo(k); luu(); veThang();
}
function mauApCap(m, cap){
  var c = m.cap;
  if(!c || !c.length) return m.thuanXLS ? cap==='pgd' : true;   /* 3.43: sao kê thuần Excel chưa khai cấp → chỉ tính Toàn PGD */
  return c.indexOf(cap)>=0;
}
/* ---- bảng đối chiếu: trạng thái từng ô ---- */
/* 3.24: cột XÃ cộng dồn các điểm giao dịch bên trong —
   file lưu ở cấp điểm (KQGD của Gia Lộc 2) thì cột xã hiện "1/2", không còn báo thiếu oan */
function demDiemCua(ky, maLoai, xa){
  var dm = diemCuaXa(xa), co = 0;
  dm.forEach(function(d){ if(oDoiChieu(ky, maLoai, d, true).tt!=='thieu') co++; });
  return {co:co, tong:dm.length};
}
function oDoiChieuXa(ky, maLoai, xa){
  var dm = diemCuaXa(xa);
  if(!dm.length) return null;
  var co = 0, coPhu = 0, ds = [];
  dm.forEach(function(d){
    var o = oDoiChieu(ky, maLoai, d, true);
    if(o.tt==='du'){ co++; ds = ds.concat(o.ds); }
    else if(o.tt==='phu'){ coPhu++; ds = ds.concat(o.ds); }
  });
  if(!co && !coPhu) return null;
  if(co===dm.length) return {tt:'du', ds:ds, chu:'✓'};
  return {tt:'mot-phan', ds:ds, chu:co+'/'+dm.length, so:co, tong:dm.length};
}
function laExcel(m){ return /\.(xlsx|xls|csv)$/i.test(m.tenMoi||m.tenCu||''); }
function oDoiChieu(ky, maLoai, donVi, khongGop, chiExcel){
  var ds = D.duLieu.filter(function(x){
    if(chiExcel===true && !laExcel(x)) return false;
    if(chiExcel===false && laExcel(x)) return false;
    return x.ky===ky && (x.maLoai||'KHAC')===maLoai &&
      ((donVi==='Toàn PGD') ? capCuaPhamVi(x.phamVi)==='pgd' : x.phamVi===donVi);
  });
  var cuoi = ds.filter(function(x){ return !x.banPhu; });
  if(cuoi.length) return {tt:'du', ds:cuoi};
  if(ds.length)   return {tt:'phu', ds:ds};
  /* chưa có file gắn thẳng cho đơn vị này — nếu là XÃ thì cộng dồn các điểm bên trong */
  if(!khongGop && dsDonVi('xa').indexOf(donVi)>=0){
    var gop = oDoiChieuXa(ky, maLoai, donVi);
    if(gop) return gop;
  }
  return {tt:'thieu', ds:[]};
}
/* kỳ gần nhất có dữ liệu còn thiếu gì — 3.31: dùng chung quy tắc với ma trận (cấp áp dụng, chu kỳ, xã quản lý) */
function kyGanNhat(){
  var ky = D.duLieu.map(function(x){ return x.ky; }).filter(Boolean).sort();
  return ky[ky.length-1] || '';
}
function kyThieu(){
  var mau = D.cauHinh.mauBaoCao||[];
  if(!mau.length || !D.duLieu.length) return [];
  return thieuTheoKy(kyGanNhat()).map(function(x){ return x.dv+': '+x.bc+(x.ghi?' ('+x.ghi+')':''); });
}

/* ----- ngăn 1: VĂN BẢN ----- */
function veVanBan(){
  tinhTrungSH();   /* 3.77 */
  document.getElementById('nam-vb').innerHTML =
    veDauTab('vanBan', {kho:D.vanBan, 
      themPhu:'<button class="phu" onclick="lapChiMuc()" title="Lập chỉ mục: đi hết thư mục Tủ hồ sơ, file nào chưa có trong app thì xếp vào đúng tab">🗂 Lập chỉ mục</button>',
                        hamThem:"TAB_TRUOC=1;doiNgan(6);THEM_TU=1;document.getElementById('chon-file').click()"});   /* 3.40: nhớ đúng tab Văn bản — trước sang khay chờ trước nên giữ tab cũ (vd Tháng) → file vào Dữ liệu tháng */
  document.getElementById('loc-vb').innerHTML = '';

  if(kieuXem==='cay') kieuXem = 'ds';   /* kiểu xem cây đã bỏ (3.7) */
  if(false){
    document.getElementById('dem-vb').textContent = 'Theo thư mục lưu trữ';
    document.getElementById('ds-vb').innerHTML = veThanhSap('vanBan');
    veCay(true);
    return;
  }

  if(typeof DK!=='undefined' && DK.mo){
    document.getElementById('nam-vb').innerHTML = '';
    document.getElementById('dem-vb').innerHTML = '';
    document.getElementById('ds-vb').innerHTML = veDonKho();
    return;
  }
  if(CHO_KHAI){
    document.getElementById('nam-vb').innerHTML = '';
    document.getElementById('dem-vb').innerHTML = '';
    document.getElementById('ds-vb').innerHTML = veChoKhai();
    return;
  }
  var ds = locTheoThe('vanBan', locChuan('vanBan', loc(D.vanBan, tuKhoa)));
  ds = sapXep(ds, 'vanBan');
  if(locCua('vanBan').trung) ds = ds.slice().sort(function(a, b){ return khoaTrungVB(a).localeCompare(khoaTrungVB(b)); });   /* 3.77: các bản trùng đứng cạnh nhau */
  BOT_DS.vanBan = ds;
  if(kieuXem==='ds') ds = xepChaCon(ds); else CON_ID = {};
  /* đếm VB hết hiệu lực đang bị ẩn (cùng điều kiện lọc, tạm bật "hiện cả hết hiệu lực") */
  var L0 = locCua('vanBan'), anHet = 0;
  if(!L0.hl){
    L0.hl = '1';
    anHet = locTheoThe('vanBan', locChuan('vanBan',
      loc(D.vanBan.filter(function(x){ return x.hetHieuLuc; }), tuKhoa))).length;
    L0.hl = '';
  }

  var demVB = (ds.length ? '<b>'+ds.length+'</b> kết quả' : 'Không có kết quả')+
    (anHet ? ' · <span class="xoa-loc" style="color:var(--chu-phu)" onclick="datLocGiu(\'vanBan\',\'hl\',\'1\');dongHop()" title="Bấm để hiện cả văn bản hết hiệu lực">ẩn '+anHet+' hết HL</span>' : '')+
    chuDemLoc('vanBan');
  document.getElementById('dem-vb').innerHTML = '';

  document.getElementById('ds-vb').innerHTML = veThanhSap('vanBan', null, null, null, demVB) + (ds.length
    ? (kieuXem==='thang' ? nhomTheoThang(ds,'ngay')
       : ds.map(function(m){ return dongHTML(m, tuKhoa); }).join(''))
    : '<div class="rong">'+(D.vanBan.length
        ? 'Không tìm thấy văn bản nào khớp.<br>Thử bỏ bớt điều kiện lọc.'
        : 'Chưa có văn bản nào.<br>Bấm <b>+ Thêm file</b> ở góc trên bên trái, hoặc kéo thả file vào.')+'</div>');
}
function datLocNV(t){ locNV = (locNV===t)?'':t; ve(); }
var CON_ID = {};
function xepChaCon(ds){ CON_ID = {}; return ds; }   /* 3.68 (AF): bỏ VB chính / VB treo dưới — giữ tên hàm cho chỗ gọi cũ */
function datNam(n){ locNam = n; locThang = ''; ve(); }
var kieuXem = 'ds', moThuMuc = {};
function datKieu(k, el){
  kieuXem = k;
  ve();
}
function moTM(id){
  moThuMuc[id] = !moThuMuc[id];
  var e = document.getElementById('tm-'+id);
  if(e) e.classList.toggle('mo', moThuMuc[id]);
}

/* Duyệt nhanh theo đúng cây thư mục lưu trữ trên Drive */
function veCay(them){
  var tat = D.vanBan.concat(D.duLieu, D.ghiChu);
  if(tuKhoa) tat = loc(tat, tuKhoa);
  if(!tat.length){
    document.getElementById('ds-vb').innerHTML =
      '<div class="rong">Chưa có mục nào để xếp vào thư mục.</div>';
    return;
  }
  var nhom = {};
  tat.forEach(function(m){
    var d = thuMucCua(m);
    (nhom[d] = nhom[d] || []).push(m);
  });
  var khoa = Object.keys(nhom).sort();
  var h = '';
  khoa.forEach(function(d, k){
    var id = 'tm'+k;
    var ds = nhom[d].slice().sort(function(a,b){
      return (b.tenMoi||'').localeCompare(a.tenMoi||''); });
    var mo = moThuMuc[id] || !!tuKhoa;
    h += '<div class="tm'+(mo?' mo':'')+'" id="tm-'+id+'">'+
      '<div class="tm-dau" onclick="moTM(\''+id+'\')">'+
        '<span class="mui">›</span>'+
        '<span class="ten">'+coChuHTML(d)+'</span>'+
        '<span class="dem">'+ds.length+'</span>'+
      '</div><div class="tm-than">'+
      ds.map(function(m){
        return '<div class="tm-file" onclick="moXem(\''+m.id+'\')">'+
          '<span class="ico">'+(m.nhom==='ghiChu'?'🖼':'📄')+'</span>'+
          '<span>'+toSang(m.tenMoi||m.tenCu||'', tuKhoa)+'</span></div>';
      }).join('')+'</div></div>';
  });
  document.getElementById('ds-vb').innerHTML =
    (them ? veThanhSap('vanBan') : '') + h;
}

function theHTML(m, q){
  if(m.nhom==='ghiChu') return anhHTML(m, q);
  return '<div class="vuot-bao" data-id="'+m.id+'"'+botAt(m.id)+'>'+
    '<div class="vuot-nut">'+
      '<button class="b-sua" onclick="event.stopPropagation();suaCho(\''+m.id+'\')">Sửa</button>'+
      '<button class="b-gui" onclick="event.stopPropagation();guiNhanh(\''+m.id+'\')">Gửi</button>'+
    '</div>'+ theTrong(m, q) +'</div>';
}
function guiNhanh(id){ var m = timMuc(id); if(m){ mucDangXem = m; taiFile(); } }

function theTrong(m, q){
  var lqT = lqCua(m);
  var h = '<article class="the-vb'+(m.hetHieuLuc?' mo':'')+
          '" onclick="moXem(\''+m.id+'\')">';
  if(m.nhom==='duLieu'){
    h += '<div><span class="so-vb">'+coChuHTML(m.tenLoai||'Khác')+'</span>'+
         '<span class="ngay-vb">'+kyVN(m.ky)+'</span></div>';
    h += '<div class="tom">'+coChuHTML(m.tenMoi||'')+'</div>';
  }else{
    h += '<div><span class="so-vb">'+toSang(m.soHieu||'(chưa có số)', q)+'</span>'+
         '<span class="ngay-vb">'+ngayVN(m.ngay)+'</span></div>';
    h += '<div class="tieu">'+toSang(m.trichYeu||m.tenMoi||'', q)+'</div>';
    if(m.nhom==='khac') h += '<div class="goi-y"><span class="mini phu">Chưa phân loại</span></div>';
    if(m.tomTat) h += '<div class="tom">'+toSang(m.tomTat, q)+'</div>';
    var the = (m.the||[]).map(function(t){
      return '<span class="mini">'+coChuHTML(t)+'</span>'; }).join(' ');
    var ct = (m.ctrinh||[]).map(function(t){
      return '<span class="mini ct">'+coChuHTML(hienCT(t))+'</span>'; }).join(' ');
    if(the||ct) h += '<div class="goi-y">'+the+' '+ct+'</div>';
    var d = [];
    if(lqT.length) d.push('🔗 '+lqT.length+' văn bản liên quan');
    var anhGan = D.ghiChu.filter(function(x){ return x.gocVB===m.id; }).length;
    if(anhGan) d.push(anhGan+' ảnh ghi chú');
    if(m.hetHieuLuc) d.push('<b>đã hết hiệu lực</b>');
    d.push('📁 '+coChuHTML(thuMucCua(m)));
    if(d.length) h += '<div class="noi">'+d.join(' · ')+'</div>';
    if(m.ghiChu) h += '<div class="ghi-rieng">Ghi chú riêng: '+toSang(m.ghiChu,q)+'</div>';
  }
  h += '</article>';
  return h;
}

/* ----- ngăn 2: THÁNG ----- */
var kieuTh = 'ky';   /* 3.20: ky | donvi | cay | bang */
function datKieuTh(k){ kieuTh = k; ve(); }
/* ---------- BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào ---------- */
function capDang(){ return D.cauHinh.capThang || 'xa'; }
function datCap(c){ D.cauHinh.capThang = c; luu(); veThang(); }
function soKyBang(){ return D.cauHinh.soKyBang || 6; }
function datSoKy(n){ D.cauHinh.soKyBang = n; luu(); veThang(); }
function gonBang(){ D.cauHinh.anBangDC = !D.cauHinh.anBangDC; luu(); veThang(); }
function dsKyGanDay(n){
  var ky = {}, hn = ngayISO(nay()).slice(0,7);
  D.duLieu.forEach(function(x){ if(x.ky) ky[x.ky]=1; });
  ky[hn]=1;
  return Object.keys(ky).sort().slice(-n);
}
function mauApDung(cap){
  return (D.cauHinh.mauBaoCao||[]).filter(function(m){ return mauApCap(m, cap) && !laMaSoLieu(m); });
}
/* ---------- MA TRẬN THÁNG (3.21) — màn chính của tab Tháng ----------
   Cột: Báo cáo | PGD | 5 xã (bấm xã → bung các điểm giao dịch của xã đó)
   Nối thêm kỳ cuối năm trước để đối chiếu đầu năm.
   Danh mục báo cáo thêm, bớt, đổi thứ tự ngay trên bảng.
   ------------------------------------------------------------------ */
function kyBang(){
  if(D.cauHinh.kyBang) return D.cauHinh.kyBang;
  var ky = D.duLieu.map(function(x){ return x.ky; }).filter(Boolean).sort();
  return ky.length ? ky[ky.length-1] : ngayISO(nay()).slice(0,7);
}
function datKyBang(k){ D.cauHinh.kyBang = k; luu(); veThang(); }
function doiKyBang(n){
  var p = kyBang().split('-'), d = new Date(+p[0], +p[1]-1+n, 1);
  datKyBang(d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2));
}
/* 3.22: kỳ cuối năm trước coi như một kỳ bình thường — bấm ‹ lùi tới là thấy */
/* 3.31: xã hiện trên ma trận — anh bật/tắt ở nút 👁 thì theo anh; chưa chỉnh thì mặc định chỉ hiện xã quản lý */
function xaHien(xa){
  var m = D.cauHinh.xaHien||{};
  if(m[xa]!==undefined) return m[xa]!==false;
  var q = dsXaQuanLy();
  return q.length ? q.indexOf(xa)>=0 : true;
}
function dsXaQuanLy(){
  var tat = dsDonVi('xa');
  return (D.cauHinh.xaQuanLy||[]).filter(function(x){ return tat.indexOf(x)>=0; });
}
function laXaQuanLy(xa){ var q = dsXaQuanLy(); return !q.length || q.indexOf(xa)>=0; }
function datXaQuanLy(xa, bat){
  var q = (D.cauHinh.xaQuanLy||[]).filter(function(x){ return x!==xa; });
  if(bat) q.push(xa);
  D.cauHinh.xaQuanLy = dsDonVi('xa').filter(function(x){ return q.indexOf(x)>=0; });   /* giữ thứ tự như cây địa bàn */
  delete D.cauHinh.xaHien;   /* ma trận hiện lại theo địa bàn quản lý mới */
  luu();
  bao(D.cauHinh.xaQuanLy.length ? 'Địa bàn quản lý: '+D.cauHinh.xaQuanLy.map(vietTatDV).join(', ')+'. Ma trận chỉ báo thiếu cho các xã này.'
                                : 'Chưa chọn xã nào — ma trận báo thiếu cho tất cả xã.', 6);
}
/* cấp của một cột ma trận */
function capCot(c){ return c.lop==='pgd' ? 'pgd' : (c.lop.indexOf('xa')===0 ? 'xa' : 'diem'); }
/* ô có được tính đủ/thiếu không: cấp áp dụng của báo cáo + cột thuộc PGD hoặc xã quản lý */
function oTinhThieu(m, c){ return mauApCap(m, capCot(c)) && (c.lop==='pgd' || laXaQuanLy(c.xa)); }
/* danh sách thiếu của một kỳ, theo đúng quy tắc của ma trận: PGD + xã quản lý (xã áp dụng cấp điểm thì xét từng điểm) */
function thieuTheoKy(ky){
  var ra = [];
  (D.cauHinh.mauBaoCao||[]).forEach(function(m){
    if(m.an || laMaSoLieu(m) || !toiKy(m, ky)) return;
    var xet = function(dv, ten){
      var o = oDoiChieu(ky, m.ma, dv);
      if(o.tt!=='du' && o.tt!=='phu') ra.push({dv:ten, bc:m.ten, ghi:o.tt==='mot-phan'?o.chu+' điểm':''});
    };
    if(mauApCap(m,'pgd')) xet('Toàn PGD', 'PGD');
    if(laThuanXLS(m)) return;
    dsXaQuanLy().forEach(function(xa){
      if(mauApCap(m,'xa')) xet(xa, vietTatDV(xa));
      else if(mauApCap(m,'diem')) diemCuaXa(xa).forEach(function(d){ xet(d, vietTatDV(d)); });
    });
  });
  return ra;
}
/* "Gia Lộc: Nợ quá hạn, Chấm điểm tổ · Truông Mít: Nợ đến hạn" */
function chuoiThieu(ds){
  var nhom = {}, thuTu = [];
  ds.forEach(function(x){ if(!nhom[x.dv]){ nhom[x.dv] = []; thuTu.push(x.dv); } nhom[x.dv].push(x.bc+(x.ghi?' ('+x.ghi+')':'')); });
  thuTu.sort(function(a,b){ return (b==='PGD')-(a==='PGD'); });   /* PGD đứng đầu, xã giữ thứ tự */
  return thuTu.map(function(k){ return k+': '+nhom[k].join(', '); }).join(' · ');
}
function moThieuChiTiet(ky){
  var ds = thieuTheoKy(ky), nhom = {}, thuTu = [];
  ds.forEach(function(x){ if(!nhom[x.dv]){ nhom[x.dv] = []; thuTu.push(x.dv); } nhom[x.dv].push(x); });
  moHop('<div class="hop-tit">'+kyVN(ky)+' · còn thiếu '+ds.length+' báo cáo</div>'+
    '<div class="hop-phu">Chỉ tính cấp PGD và địa bàn quản lý: '+coChuHTML(dsXaQuanLy().map(vietTatDV).join(', ')||'tất cả xã')+'.</div>'+
    thuTu.map(function(k){
      return '<div class="nhan-nhom">'+coChuHTML(k)+' ('+nhom[k].length+')</div><div class="huong-dan">'+
        nhom[k].map(function(x){ return coChuHTML(x.bc+(x.ghi?' ('+x.ghi+')':'')); }).join('<br>')+'</div>';
    }).join('')+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>');
}
function batXa(xa, hien){
  D.cauHinh.xaHien = D.cauHinh.xaHien || {};
  D.cauHinh.xaHien[xa] = !!hien; luu(); veThang();
}
function moChonXa(){
  var xas = dsDonVi('xa');
  moHop('<div class="hop-tit">Hiện xã, phường nào trên bảng</div>'+
    '<div class="hop-phu">Bỏ tick xã anh không quản lý cho bảng gọn. Bấm tên xã trên bảng vẫn sổ ra điểm giao dịch như thường.</div>'+
    '<div class="chon-xa">'+xas.map(function(x){
      return '<label class="dt-dong"><input type="checkbox" class="cx-o" value="'+coChuHTML(x)+'"'+(xaHien(x)?' checked':'')+
        ' onchange="batXa(this.value, this.checked)"> '+coChuHTML(x)+
        '<small>'+diemCuaXa(x).length+' điểm giao dịch</small></label>';
    }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="hetXa(true)">Hiện hết</button>'+
    '<button class="nho" onclick="hetXa(false)">Ẩn hết</button>'+
    '<button class="nho chinh" onclick="dongHop()">Xong</button></div>');
}
function hetXa(hien){
  D.cauHinh.xaHien = {};
  dsDonVi('xa').forEach(function(x){ D.cauHinh.xaHien[x] = !!hien; });
  luu(); veThang(); moChonXa();
}
function diemCuaXa(xa){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  return x ? (x.diem||[]).map(function(d){ return d.ten; }) : [];
}
function xaDangMo(xa){ return !!(D.cauHinh.xaMo||{})[xa]; }
function moXa(xa){
  D.cauHinh.xaMo = D.cauHinh.xaMo || {};
  D.cauHinh.xaMo[xa] = !D.cauHinh.xaMo[xa]; luu(); veThang();
}
function suaDanhMuc(){ D.cauHinh.suaDM = !D.cauHinh.suaDM; luu(); veThang(); }
/* thêm, bớt, đổi thứ tự báo cáo ngay trên bảng */
function themBaoCao(){
  var e = document.getElementById('bdc-them'), ten = (e && e.value || '').trim();
  if(!ten) return bao('Gõ tên báo cáo rồi bấm Thêm.', 3);
  var mau = D.cauHinh.mauBaoCao = D.cauHinh.mauBaoCao || [];
  var ma = slug(ten, 4).toUpperCase().replace(/_/g,'-');
  if(mau.some(function(m){ return m.ma===ma; })) ma += '-' + (mau.length+1);
  mau.push({ten:ten, ma:ma, tuKhoa:[boDau(ten)], cap:[]});
  boMaDaBo([ma]);
  luu(); veThang();
  moThietLapBC(ma);   /* 3.34: thêm xong mở luôn hộp thiết lập (từ khóa, cấp, dạng, chu kỳ) */
}
/* 3.28: KHÔNG bao giờ bỏ dòng báo cáo — chỉ ẩn cho gọn, bật lại lúc nào cũng được */
function anBaoCao(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  m.an = !m.an; luu(); veThang();
  bao(m.an ? 'Đã ẩn “'+m.ten+'” cho gọn — bấm “Hiện lại báo cáo đã ẩn” để lấy lại.' : 'Đã hiện lại “'+m.ten+'”.', 5);
}
function soAn(){ return (D.cauHinh.mauBaoCao||[]).filter(function(x){ return x.an; }).length; }
function hienHetAn(){
  (D.cauHinh.mauBaoCao||[]).forEach(function(x){ delete x.an; });
  luu(); veThang(); bao('Đã hiện lại tất cả báo cáo.', 4);
}
/* 3.34: THIẾT LẬP TỪNG BÁO CÁO NGAY TRÊN GIAO DIỆN — cấp tính thiếu, dạng hiển thị, chu kỳ, dòng Excel.
   Ma trận, tính thiếu, đặt tên file đều đọc các cờ này (cap, thuanXLS, chuKy, theoNgay, coExcel) nên không phải sửa code.
   Mã giữ nguyên: file đã lưu gắn với mã, đổi mã sẽ làm file cũ rời khỏi dòng báo cáo. */
function moThietLapBC(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  var cap = m.cap || [], ck = chuKy(m);
  var hop = function(v, nhan){
    return '<label class="tl-chon"><input type="checkbox" class="tl-cap" value="'+v+'"'+(cap.indexOf(v)>=0?' checked':'')+'> '+nhan+'</label>';
  };
  var nut = function(id, ds, dang){
    return '<div class="co-chu" id="'+id+'">'+ds.map(function(x){
      return '<button'+(dang===x[0]?' class="bat"':'')+' data-v="'+x[0]+'" onclick="chonMotNut(this)">'+x[1]+'</button>';
    }).join('')+'</div>';
  };
  var so = D.duLieu.filter(function(x){ return (x.maLoai||'')===ma; }).length;
  moHop('<div class="hop-tit">⚙ Thiết lập báo cáo</div>'+
    '<div class="hop-phu">Mã <b>'+coChuHTML(m.ma)+'</b> · '+so+' file đã lưu. Đổi ở đây là ma trận và phần báo thiếu theo ngay, không cần sửa code.</div>'+
    '<div class="o"><label>Tên báo cáo</label><input id="tl-ten" value="'+coChuHTML(m.ten)+'"></div>'+
    '<div class="o"><label>Từ khóa nhận dạng — mỗi dòng một từ</label>'+
      '<textarea id="tl-tk" rows="3">'+coChuHTML((m.tuKhoa||[]).join('\n'))+'</textarea></div>'+
    '<div class="o"><label>Nhóm trên ma trận</label>'+
      nut('tl-dang', [['bang','Báo cáo chuẩn'],['mot','Sao kê thuần Excel']], laThuanXLS(m)?'mot':'bang')+
      '<div class="huong-dan">Từ 3.43 mọi báo cáo đều hiện đủ các cột. Sao kê thuần Excel không tích cấp nào thì chỉ tính thiếu ở Toàn PGD.</div></div>'+
    '<div class="o"><label>Tính thiếu ở cấp</label>'+
      '<div class="tl-hang">'+hop('pgd','Toàn PGD')+hop('xa','Xã, phường')+hop('diem','Điểm giao dịch')+'</div>'+
      '<div class="huong-dan">Không tích ô nào = tính ở mọi cấp. Ví dụ số liệu họp giao ban chia theo điểm: chỉ tích Điểm giao dịch.</div></div>'+
    '<div class="o"><label>Chu kỳ</label>'+
      nut('tl-ky', [['thang','Hằng tháng'],['ngay','Theo ngày giao dịch'],['quy','Quý'],['sau','6 tháng'],['nam','Năm']], ck)+'</div>'+
    '<label class="tl-chon"><input type="checkbox" id="tl-xls"'+(m.coExcel?' checked':'')+'> Có thêm dòng bản Excel cấp PGD</label>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop();veLaiCDNeuCan()">Thôi</button>'+
    '<button class="nho chinh" onclick="luuThietLapBC(\''+ma+'\')">Lưu</button></div>', true);
}
function luuThietLapBC(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  var ten = gt('tl-ten') || m.ten;
  if(ten!==m.ten){ m.ten = ten; D.duLieu.forEach(function(x){ if((x.maLoai||'')===ma) x.tenLoai = ten; }); }
  m.tuKhoa = gt('tl-tk').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  m.thuanXLS = layNutChon('tl-dang')==='mot';
  m.cap = Array.prototype.slice.call(document.querySelectorAll('.tl-cap:checked')).map(function(c){ return c.value; });
  var ck = layNutChon('tl-ky') || 'thang';
  m.chuKy = ck; m.theoNgay = (ck==='ngay');
  var e = document.getElementById('tl-xls'); m.coExcel = !!(e && e.checked);
  luu(); dongHop(); veThang(); veLaiCDNeuCan();
  if(DR.sanSang) dayCauHinh(true);
  bao('Đã lưu thiết lập “'+m.ten+'”: tính thiếu ở '+capChu(m)+
    ' · '+{thang:'hằng tháng',ngay:'theo ngày',quy:'quý',sau:'6 tháng',nam:'năm'}[ck], 6);
}
function boBaoCao(ma){
  var mau = D.cauHinh.mauBaoCao || [], m = mau.find(function(x){ return x.ma===ma; });
  if(!m) return;
  var so = D.duLieu.filter(function(x){ return (x.maLoai||'')===ma; }).length;
  hoi('Bỏ báo cáo "'+m.ten+'" khỏi danh mục?',
    so ? (so+' file đã lưu vẫn còn nguyên, chỉ không tính vào bộ đủ thiếu nữa.')
       : 'Chưa có file nào thuộc loại này.', 'Bỏ khỏi danh mục', function(){
    D.cauHinh.mauBaoCao = mau.filter(function(x){ return x.ma!==ma; });
    ghiMaDaBo([ma]);
    luu(); veThang();
  });
}
/* ==========================================================
   QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
   Bảng tên cũ → tên mới, tick từng dòng + Chọn tất cả, có hoàn tác.
   ========================================================== */
function dsDoiTen(ma){
  return D.duLieu.filter(function(x){ return !ma || (x.maLoai||'')===ma; })
    .map(function(m){ return {m:m, cu:m.tenMoi||m.tenCu||'', moi:tenDuLieu(m, m.duoi||'.pdf')}; })
    .filter(function(x){ return x.cu !== x.moi; });
}
function moQuetDoiTen(ma){
  var ds = dsDoiTen(ma);
  if(!ds.length) return bao('Tên file đang khớp chuẩn, không có gì phải đổi.', 5);
  moHop('<div class="hop-tit">Quét đổi tên file</div>'+
    '<div class="hop-phu">'+ds.length+' file có tên khác chuẩn hiện tại. Tích file muốn đổi. '+
    'Đổi cả tên thật trên Drive, xong vẫn hoàn tác được.</div>'+
    '<div class="qdt-nut"><button class="nho" onclick="tickDoiTen(true)">Chọn tất cả</button>'+
    '<button class="nho" onclick="tickDoiTen(false)">Bỏ chọn</button>'+
    '<span id="qdt-dem" class="bdc-chu"></span></div>'+
    '<div class="qdt-ds" id="qdt-ds">'+ds.map(function(x,i){
      return '<label class="rac-dong"><input type="checkbox" class="qdt-o" value="'+x.m.id+'" onchange="demDoiTen()">'+
        '<span class="rac-ten"><s>'+coChuHTML(x.cu)+'</s><small>→ <b>'+coChuHTML(x.moi)+'</b></small></span></label>';
    }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    '<button class="nho chinh" onclick="chayDoiTen()">Đổi tên file đã tích</button></div>', true);
  demDoiTen();
}
function tickDoiTen(b){
  Array.prototype.forEach.call(document.querySelectorAll('.qdt-o'), function(c){ c.checked = b; });
  demDoiTen();
}
function demDoiTen(){
  var n = document.querySelectorAll('.qdt-o:checked').length, e = document.getElementById('qdt-dem');
  if(e) e.textContent = n ? 'đã tích '+n+' file' : 'chưa tích file nào';
}
function chayDoiTen(){
  var ids = Array.prototype.slice.call(document.querySelectorAll('.qdt-o:checked')).map(function(c){ return c.value; });
  if(!ids.length) return bao('Chưa tích file nào.', 3);
  var cu = [];
  ids.forEach(function(id){
    var m = D.duLieu.find(function(x){ return x.id===id; }); if(!m) return;
    cu.push({id:id, ten:m.tenMoi});
    m.tenMoi = tenDuLieu(m, m.duoi||'.pdf');
    m.suaLuc = new Date().toISOString();
    if(m.driveId) m.choDB = true;   /* đổi luôn tên thật trên Drive qua hàng chờ */
  });
  ghiHoanTac('đổi tên '+cu.length+' file', function(){
    cu.forEach(function(x){
      var m = D.duLieu.find(function(y){ return y.id===x.id; });
      if(m){ m.tenMoi = x.ten; if(m.driveId) m.choDB = true; }
    });
  });
  luu(); dongHop(); ve();
  if(DR.sanSang && DR.online) chayDongBoCho();
  bao('Đã đổi tên '+cu.length+' file · bấm ↶ ở sổ hoặc Ctrl+Z để trả lại tên cũ', 7);
}
function doiTenBaoCao(ma, ten){
  ten = (ten||'').trim(); if(!ten) return veThang();
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; });
  if(!m || m.ten===ten) return;
  var cu = m.ten; m.ten = ten;
  /* mã giữ nguyên nên file cũ không ảnh hưởng — chỉ cập nhật tên hiển thị đã lưu trong file */
  D.duLieu.forEach(function(x){ if((x.maLoai||'')===ma) x.tenLoai = ten; });
  luu(); veThang();
  var so = dsDoiTen(ma).length;
  bao('Đã đổi tên báo cáo: “'+cu+'” → “'+ten+'”. Mã giữ nguyên nên file cũ không ảnh hưởng.'+
    (so?' · '+so+' file có tên khác chuẩn — bấm ✎ Danh mục → Quét đổi tên nếu muốn đổi theo.':''), 8);
}
function batExcel(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  m.coExcel = !m.coExcel; luu(); veThang();
  bao(m.coExcel ? 'Đã thêm dòng Excel cấp PGD cho “'+m.ten+'”.' : 'Đã bỏ dòng Excel.', 4);
}
function chuyenBaoCao(ma, huong){
  var mau = D.cauHinh.mauBaoCao || [], i = mau.findIndex(function(x){ return x.ma===ma; });
  var j = i + huong;
  if(i<0 || j<0 || j>=mau.length) return;
  var t = mau[i]; mau[i] = mau[j]; mau[j] = t;
  luu(); veThang();
}
function bangDoiChieuHTML(){
  if(D.cauHinh.anBangDC)
    return '<div class="bdc-gon"><b>📊 Bảng đối chiếu</b> đang thu gọn '+
      '<button class="nho" onclick="gonBang()">Mở ra</button></div>';
  var mau = D.cauHinh.mauBaoCao || [];
  if(!mau.length) return '<div class="bdc-gon">Chưa khai danh mục báo cáo — bấm '+
    '<button class="nho" onclick="suaDanhMuc()">Sửa danh mục</button> để thêm.</div>';
  var ky = kyBang(), xas = dsDonVi('xa').filter(xaHien), tatXa = dsDonVi('xa'), sua = !!D.cauHinh.suaDM;

  /* ---- cột ---- 3.31: nút cấp Toàn PGD / Xã, phường / Điểm giao dịch */
  var capMT = capDang();
  var cot = [{ma:'Toàn PGD', ten:'PGD', lop:'pgd'}];
  if(capMT!=='pgd') xas.forEach(function(xa){
    var mo = capMT==='diem' || xaDangMo(xa), dm = diemCuaXa(xa);
    cot.push({ma:xa, ten:vietTatDV(xa), lop:'xa'+(mo?' mo':''), xa:xa, co:dm.length});
    if(mo) dm.forEach(function(d){ cot.push({ma:d, ten:vietTatDV(d), lop:'diem', xa:xa}); });
  });

  var du=0, phu=0, thieu=0, dsThieu=[];
  /* 3.34: thanh nút chia 2 dòng, nút gọn 28px — trước dồn một hàng nên bị che, phải cuộn ngang */
  var h = '<div class="bdc"><div class="bdc-dau"><div class="bdc-hang">'+
    '<b>📊 Bộ dữ liệu</b>'+
    '<span class="bdc-ky-chon">'+
      '<button class="nho" onclick="doiKyBang(-1)" title="Kỳ trước">‹</button>'+
      '<b class="bdc-ky-ten">'+kyVN(ky)+'</b>'+
      '<button class="nho" onclick="doiKyBang(1)" title="Kỳ sau">›</button>'+
    '</span>'+
    /* 3.31 (mục 11a, 11b) */
    '<button class="nho'+(laKyChot(ky)?' bat':'')+'" onclick="batChotKy(\''+ky+'\')" title="'+
      (laKyChot(ky)?'Kỳ đã chốt — bấm để mở chốt':'Chốt kỳ khi đã đủ bộ — thêm file sau đó phải xác nhận')+'">'+
      (laKyChot(ky)?'🔒 Đã chốt':'Chốt kỳ '+kyVN(ky))+'</button>'+
    '<button class="nho" onclick="moSoSanhKy(\''+ky+'\')" title="Chép 2 kỳ sang AI để so sánh">⇄ So 2 kỳ</button>'+
    '<button class="nho bdc-gon-nut" onclick="gonBang()" title="Thu gọn bảng">▴</button></div><div class="bdc-hang">'+
    '<button class="nho" onclick="moChonXa()" title="Chọn xã, phường hiện trên bảng">👁 Xã ('+xas.length+'/'+tatXa.length+')</button>'+
    /* 3.31: bỏ 3 nút Theo kỳ/Theo đơn vị/Dạng cây (trùng thanh kiểu xem bên dưới) → 3 nút chọn cấp */
    '<span class="bdc-kieu bdc-cap">'+dsCap().map(function(x){
      return '<button class="nho'+(capMT===x[0]?' bat':'')+'" onclick="datCap(\''+x[0]+'\')">'+x[1]+'</button>';
    }).join('')+'</span>'+
    '<button class="nho'+(sua?' bat':'')+'" onclick="suaDanhMuc()" title="Thêm, bớt, đổi thứ tự, sửa tên báo cáo">✎ Danh mục</button>'+
    (sua?'<button class="nho" onclick="moQuetDoiTen()" title="Đổi tên các file đã lưu cho khớp chuẩn hiện tại">🔤 Quét đổi tên</button>':'')+
    '</div></div>';

  h += '<div class="bdc-cuon"><table class="bdc-bang"><thead><tr>'+
    '<th class="bdc-goc">Báo cáo</th>'+
    cot.map(function(c){
      if(c.lop.indexOf('xa')===0)
        return '<th class="'+c.lop+(laXaQuanLy(c.xa)?'':' ngoai-db')+'" onclick="moXa(\''+c.xa+'\')" title="'+coChuHTML(c.xa)+
          (laXaQuanLy(c.xa)?'':' — ngoài địa bàn quản lý, không tính thiếu')+' — bấm để '+
          (c.lop.indexOf(' mo')>0?'gộp lại':'tách '+c.co+' điểm giao dịch')+'">'+
          (c.lop.indexOf(' mo')>0?'▾ ':'▸ ')+coChuHTML(c.ten)+'</th>';
      return '<th class="'+c.lop+'" title="'+coChuHTML(c.ma)+'">'+coChuHTML(c.ten)+'</th>';
    }).join('')+
    (sua?'<th class="bdc-sua">Sửa</th>':'')+'</tr></thead><tbody>';

  var hangExcel = function(m){
    var hh = '<tr class="bdc-xls"><td class="bdc-ten bdc-ten-xls" title="Bản Excel cấp PGD — bấm 📋 để chép sang AI">'+
      '<span class="xls-nhan">XLS</span> '+coChuHTML(m.ten)+'</td>';
    cot.forEach(function(c){
      var o = oDoiChieu(ky, m.ma, c.ma, false, true);
      hh += (o.tt==='du')
        ? '<td class="bdc-o xls du" title="'+coChuHTML(o.ds[0].tenMoi||'')+'">'+
            '<span onclick="moXem(\''+o.ds[0].id+'\')">✓</span>'+
            '<i class="xls-ai" title="Chép sang AI" onclick="event.stopPropagation();moChepAI(\''+o.ds[0].id+'\')">📋</i></td>'
        : '<td class="bdc-o xls trong" title="Chưa có bản Excel — không bắt buộc, không tính thiếu" onclick="themChoO(\''+ky+'\',\''+m.ma+'\',\''+String(c.ma).replace(/'/g,'')+'\')">+</td>';
    });
    if(sua) hh += '<td class="bdc-sua"></td>';
    return hh+'</tr>';
  };
  var veHang = function(m, i, mangMau){
    var h = '<tr><td class="bdc-ten" title="'+coChuHTML(m.ma)+'">'+
      (sua ? '<input class="bdc-ten-o" value="'+coChuHTML(m.ten)+'" onchange="doiTenBaoCao(\''+m.ma+'\',this.value)" '+
             'onkeydown="if(event.key===\'Enter\')this.blur()" title="Sửa tên rồi bấm Enter">'
           : coChuHTML(m.ten))+(toiKy(m, ky)?'':' <small class="bdc-chuaky">chưa tới kỳ</small>')+'</td>';
    /* 3.43: mọi báo cáo hiện ĐỦ các cột, cùng một kiểu ô (anh Nhân chốt) — bỏ ô gộp ngang của sao kê và của "chưa tới kỳ".
       Ô không tính thiếu (khác cấp áp dụng, ngoài địa bàn, chưa tới kỳ) vẫn là dấu + để thêm file, chỉ nhạt màu */
    var denKy = toiKy(m, ky);
    cot.forEach(function(c){
      var o = oDoiChieu(ky, m.ma, c.ma);
      /* 3.31: chỉ đếm ô thuộc PGD/xã quản lý và đúng cấp áp dụng của báo cáo; ô khác có file vẫn hiện, không có thì không tính thiếu */
      if(!denKy || !oTinhThieu(m, c)){
        h += oHTML(o, ky, m, c.ma, c.lop, !denKy ? 'Báo cáo '+({quy:'theo quý',sau:'6 tháng',nam:'theo năm'}[chuKy(m)]||'')+' — kỳ này chưa tới hạn'
          : (mauApCap(m, capCot(c)) ? 'Ngoài địa bàn quản lý' : 'Báo cáo này chỉ tính ở cấp '+capChu(m)));
        return;
      }
      if(o.tt==='du') du++; else if(o.tt==='phu') phu++;
      else { thieu++; dsThieu.push({dv:c.ten, bc:m.ten, ghi:o.tt==='mot-phan'?o.chu+' điểm':''}); }
      h += oHTML(o, ky, m, c.ma, c.lop);
    });
    if(sua) h += '<td class="bdc-sua">'+
      '<button onclick="moThietLapBC(\''+m.ma+'\')" title="Thiết lập: cấp tính thiếu, dạng hiển thị, chu kỳ, từ khóa">⚙</button>'+
      '<button onclick="chuyenBaoCao(\''+m.ma+'\',-1)" title="Lên trên"'+(i===0?' disabled':'')+'>↑</button>'+
      '<button onclick="chuyenBaoCao(\''+m.ma+'\',1)" title="Xuống dưới"'+(i===mau.length-1?' disabled':'')+'>↓</button>'+
      '<button class="'+(m.coExcel?'bat':'')+'" onclick="batExcel(\''+m.ma+'\')" title="Có thêm bản Excel cấp PGD (dòng riêng)">XLS</button>'+
      '<button onclick="moQuetDoiTen(\''+m.ma+'\')" title="Chuẩn lại tên các file đã lưu của dòng này">🔤</button>'+
      '<button onclick="anBaoCao(\''+m.ma+'\')" title="Ẩn dòng này cho gọn — không xóa, bật lại lúc nào cũng được">'+
        (m.an?'👁':'🙈')+'</button></td>';
    h += '</tr>';
    if(m.coExcel) h += hangExcel(m);
    return h;
  };
  /* 3.27: chia 2 khối gập được — Báo cáo chuẩn · Sao kê thuần Excel */
  var hien = mau.filter(function(m){ return (!m.an || sua) && !laMaSoLieu(m); });   /* 3.85: 7 dòng sao kê thuần Excel → tab Số liệu */
  var chuan = hien.filter(function(m){ return !laThuanXLS(m); });
  var xls   = hien.filter(laThuanXLS);
  var hangKhoi = function(k, ten, so){
    return '<tr class="bdc-khoi"><td colspan="'+(cot.length+2)+'" onclick="batKhoi(\''+k+'\')">'+
      (khoiMo(k)?'▾ ':'▸ ')+ten+' <small>'+so+' báo cáo</small></td></tr>';
  };
  h += hangKhoi('chuan','Báo cáo chuẩn', chuan.length);
  if(khoiMo('chuan')) chuan.forEach(function(m,i){ h += veHang(m, i, chuan); });
  if(xls.length){
    h += hangKhoi('xls','Sao kê thuần Excel · toàn PGD', xls.length);
    if(khoiMo('xls')) xls.forEach(function(m,i){ h += veHang(m, i, xls); });
  }
  if(sua) h += '<tr class="bdc-them-hang"><td colspan="'+(cot.length+2)+'">'+
    '<input id="bdc-them" placeholder="Tên báo cáo mới…" onkeydown="if(event.key===\'Enter\')themBaoCao()">'+
    '<button class="nho chinh" onclick="themBaoCao()">+ Thêm báo cáo</button>'+
    '<span class="bdc-chu">Bấm ⚙ ở cột Sửa để chọn cấp tính thiếu, dạng hiển thị, chu kỳ, từ khóa</span></td></tr>';
  h += '</tbody></table></div>';

  h += '<div class="bdc-chan">'+kyVN(ky)+' · <b class="bdc-du">'+du+' đủ</b>'+
    (soAn()?' · <a class="bdc-an" onclick="hienHetAn()">Hiện lại '+soAn()+' báo cáo đã ẩn</a>':'')+
    (phu?' · <b class="bdc-phu">'+phu+' mới có dữ liệu phụ</b>':'')+
    (thieu?' · <b class="bdc-thieu">'+thieu+' thiếu</b>':' · <b class="bdc-du">không thiếu gì</b>')+
    (thieu ? (function(){
      /* 3.31: ghi rõ đơn vị nào thiếu gì — dài quá thì rút gọn, bấm xem đủ */
      var ct = chuoiThieu(dsThieu), gon = ct.length>150 ? ct.slice(0,150).replace(/[,·]?\s*\S*$/,'')+'…' : ct;
      return ' <span class="bdc-thieu-ct">— '+coChuHTML(gon)+
        (gon!==ct?' <a class="bdc-an" onclick="moThieuChiTiet(\''+ky+'\')">xem đủ</a>':'')+'</span>';
    })() : '')+
    '<span class="bdc-chu">Bấm ô thiếu để thêm file · ô xanh để mở file · bấm tên xã để tách điểm giao dịch'+
      (dsXaQuanLy().length?' · chỉ tính thiếu cho PGD và '+coChuHTML(dsXaQuanLy().map(vietTatDV).join(', ')):'')+'</span></div></div>';
  return h;
}
/* ==========================================================
   3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
   ========================================================== */
function laKyChot(ky){ return !!ky && (D.cauHinh.kyChot||[]).indexOf(ky)>=0; }
function batChotKy(ky){
  if(laKyChot(ky))
    return hoi('Mở chốt '+kyVN(ky)+'?', 'Mở chốt thì thêm file vào kỳ này không cần xác nhận nữa.', 'Mở chốt', function(){
      D.cauHinh.kyChot = (D.cauHinh.kyChot||[]).filter(function(x){ return x!==ky; }); luu(); veThang();
    });
  var thieu = thieuTheoKy(ky);
  var lam = function(){
    D.cauHinh.kyChot = (D.cauHinh.kyChot||[]).concat([ky]); luu(); veThang();
    bao('Đã chốt '+kyVN(ky)+'. Thêm file vào kỳ này sẽ phải xác nhận.', 5);
  };
  if(thieu.length) return hoi('Kỳ '+kyVN(ky)+' còn thiếu '+thieu.length+' báo cáo',
    chuoiThieu(thieu).slice(0,300)+(chuoiThieu(thieu).length>300?'…':'')+' — vẫn chốt?', 'Vẫn chốt', lam);
  lam();
}
/* kỳ lùi n tháng: '2026-08', -1 → '2026-07' */
function kyLui(ky, n){ var p = String(ky).split('-'), d = new Date(+p[0], +p[1]-1+n, 1); return d.getFullYear()+'-'+hai(d.getMonth()+1); }
function moSoSanhKy(ky){
  var kys = {}; D.duLieu.forEach(function(x){ if(x.ky) kys[x.ky] = 1; }); kys[ky] = 1;
  var dsKy = Object.keys(kys).sort().reverse();
  var t = +ky.slice(5,7), dauQuy = kyLui(ky, -(((t-1)%3)+1)), dauNam = (+ky.slice(0,4)-1)+'-12';
  var mauX = (D.cauHinh.mauBaoCao||[]).filter(function(m){
    return D.duLieu.some(function(x){ return x.maLoai===m.ma && laExcel(x); }); });
  var chonKy = function(id, gt0){ return '<select id="'+id+'">'+dsKy.concat(dsKy.indexOf(gt0)<0?[gt0]:[]).map(function(k){
    return '<option value="'+k+'"'+(k===gt0?' selected':'')+'>'+kyVN(k)+'</option>'; }).join('')+'</select>'; };
  moHop('<div class="hop-tit">So sánh 2 kỳ</div>'+
    '<div class="hop-phu">Chép bảng Excel của hai kỳ sang AI dạng Markdown, kèm câu hỏi sẵn. Số liệu giữ nguyên, không sửa.</div>'+
    '<div class="hai"><div class="o"><label>Kỳ gốc</label>'+chonKy('ss-ky1', ky)+'</div>'+
    '<div class="o"><label>Kỳ so</label>'+chonKy('ss-ky2', kyLui(ky,-1))+'</div></div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="datSSKy(\''+kyLui(ky,-1)+'\')">So tháng trước</button>'+
      '<button class="nho" onclick="datSSKy(\''+dauQuy+'\')">So đầu quý ('+kyVN(dauQuy)+')</button>'+
      '<button class="nho" onclick="datSSKy(\''+dauNam+'\')">So đầu năm ('+kyVN(dauNam)+')</button></div>'+
    '<div class="o"><label>Báo cáo (bản Excel)</label><select id="ss-mau">'+
      (mauX.length ? mauX.map(function(m){ return '<option value="'+m.ma+'">'+coChuHTML(m.ten)+'</option>'; }).join('')
                   : '<option value="">— chưa có báo cáo nào lưu bản Excel —</option>')+'</select></div>'+
    '<div class="o"><label>Phạm vi</label><select id="ss-pham">'+dsPhamVi().map(function(x){
      return '<option>'+coChuHTML(x)+'</option>'; }).join('')+'</select></div>'+
    '<div class="huong-dan">Báo cáo sao kê có tên, số CCCD khách hàng — cân nhắc trước khi dán sang AI bên ngoài.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" onclick="chepSoSanh()">Chép sang AI</button></div>');
}
function datSSKy(k){
  var e = document.getElementById('ss-ky2'); if(!e) return;
  if(![].some.call(e.options, function(o){ return o.value===k; })){ var o = document.createElement('option'); o.value = k; o.textContent = kyVN(k); e.appendChild(o); }
  e.value = k;
}
function chepSoSanh(){
  var k1 = gt('ss-ky1'), k2 = gt('ss-ky2'), ma = gt('ss-mau'), pv = gt('ss-pham');
  if(!ma) return baoLoi('Chưa có báo cáo nào lưu bản Excel để so.');
  if(k1===k2) return baoLoi('Hai kỳ đang giống nhau.');
  var tim = function(k){ var o = oDoiChieu(k, ma, pv, false, true); return (o.ds||[]).filter(laExcel)[0]; };
  var f1 = tim(k1), f2 = tim(k2);
  if(!f1 || !f2) return baoLoi('Thiếu bản Excel của '+(!f1?kyVN(k1):kyVN(k2))+' · '+pv+'.');
  dangLam('Đang đọc 2 bảng…');
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    var XL = window.XLSX; if(!XL) throw new Error('Chưa tải được bộ đọc Excel — cần có mạng một lần');
    var doc = function(m){ return layNoiDung(m).then(function(b){
      if(!b) throw new Error('Chưa có nội dung file '+(m.tenMoi||''));
      return b.arrayBuffer(); }).then(function(ab){
        var wb = XL.read(new Uint8Array(ab), {type:'array'}); return bangTuSheet(wb.Sheets[wb.SheetNames[0]], XL); }); };
    return Promise.all([doc(f1), doc(f2)]);
  }).then(function(bs){
    hetLam();
    var t = 'So sánh hai kỳ, chỉ ra thay đổi lớn (tăng, giảm, chỉ tiêu bất thường) và nguyên nhân có thể.\n\n'+
      '## Kỳ gốc — '+boiCanh(f1)+'\n\n'+sangMarkdown(bs[0])+'\n\n## Kỳ so — '+boiCanh(f2)+'\n\n'+sangMarkdown(bs[1]);
    chepChu(t, 'Đã chép 2 bảng ('+kyVN(k1)+' và '+kyVN(k2)+') · ước '+uocToken(t)+' token. Dán thẳng vào cửa sổ AI.');
    dongHop();
  }).catch(function(e){ hetLam(); baoLoi('Không so được: '+(e&&e.message||e)); });
}
/* 11c: lần giao ban tới (việc lặp trong Lịch có chữ "giao ban") trong 7 ngày → số ngày còn lại, -1 nếu không có */
function ngayToiGiaoBan(){
  var hn = lcISO(nay());
  /* 3.40: chữ nhận ra việc giao ban và số ngày báo trước sửa được ở Cài đặt › Dữ liệu tháng */
  var tu = String(D.cauHinh.gbTuKhoa||'giao ban').split(',').map(function(x){ return boDau(x.trim()); }).filter(Boolean);
  var soNgay = Math.max(1, Math.min(30, parseInt(D.cauHinh.gbSoNgay,10) || 7));
  var gb = lcData().viec.filter(function(v){ var t = boDau(v.ten||''); return tu.some(function(x){ return t.indexOf(x)>=0; }); });
  for(var i=0;i<=soNgay;i++){
    var iso = lcCong(hn, i);
    if(gb.some(function(v){ return lcCo(v, iso) && !lcXongNgay(v, iso); })) return i;
  }
  return -1;
}
/* gom theo đơn vị (phạm vi) */
function nhomTheoDonVi(ds){
  var nhom = {}, thuTu = [];
  ds.forEach(function(m){
    var k = m.phamVi || '(chưa rõ đơn vị)';
    if(!nhom[k]){ nhom[k] = []; thuTu.push(k); }
    nhom[k].push(m);
  });
  thuTu.sort();
  return thuTu.map(function(k){
    return '<div class="nhan-nhom">'+coChuHTML(k)+' · '+nhom[k].length+' file</div>'+
      nhom[k].sort(function(a,b){ return (b.ky||'').localeCompare(a.ky||''); })
             .map(function(m){ return dongHTML(m, tuKhoa); }).join('');
  }).join('');
}
/* dạng cây: Năm → Tháng → Đơn vị → file */
function moGap(k, macDinh){
  D.cauHinh.cayMo = D.cauHinh.cayMo || {};
  D.cauHinh.cayMo[k] = !dangMo(k, macDinh===undefined ? true : macDinh);
  luu(); veThang();
}
function dangMo(k, macDinh){
  var c = (D.cauHinh.cayMo||{})[k];
  return (c===undefined) ? !!macDinh : !!c;
}
function cayDuLieu(ds){
  var cay = {};
  ds.forEach(function(m){
    var nam = (m.ky||'????').slice(0,4), thang = m.ky||'?', dv = m.phamVi || '(chưa rõ đơn vị)';
    cay[nam] = cay[nam] || {};
    cay[nam][thang] = cay[nam][thang] || {};
    (cay[nam][thang][dv] = cay[nam][thang][dv] || []).push(m);
  });
  var h = '<div class="cay">';
  Object.keys(cay).sort().reverse().forEach(function(nam){
    var kN = 'n'+nam, moN = dangMo(kN, true), soN = 0;
    Object.keys(cay[nam]).forEach(function(t){ Object.keys(cay[nam][t]).forEach(function(d){ soN += cay[nam][t][d].length; }); });
    h += '<div class="cay-nhanh"><div class="cay-dau" onclick="moGap(\''+kN+'\')">'+
      '<span class="cay-mui">'+(moN?'▾':'▸')+'</span>📅 Năm '+nam+'<small>'+soN+' file</small></div>';
    if(moN) Object.keys(cay[nam]).sort().reverse().forEach(function(thang){
      var kT = 't'+thang, moT = dangMo(kT, true), soT = 0;
      Object.keys(cay[nam][thang]).forEach(function(d){ soT += cay[nam][thang][d].length; });
      h += '<div class="cay-nhanh c2"><div class="cay-dau" onclick="moGap(\''+kT+'\')">'+
        '<span class="cay-mui">'+(moT?'▾':'▸')+'</span>'+kyVN(thang)+'<small>'+soT+' file</small></div>';
      if(moT) Object.keys(cay[nam][thang]).sort().forEach(function(dv){
        var kD = 'd'+thang+dv, moD = dangMo(kD, true), ml = cay[nam][thang][dv];
        h += '<div class="cay-nhanh c3"><div class="cay-dau" onclick="moGap(\''+kD.replace(/'/g,'')+'\')">'+
          '<span class="cay-mui">'+(moD?'▾':'▸')+'</span>'+coChuHTML(dv)+'<small>'+ml.length+' file</small></div>'+
          (moD ? '<div class="cay-la">'+ml.map(function(m){ return dongHTML(m, tuKhoa); }).join('')+'</div>' : '')+
        '</div>';
      });
      h += '</div>';
    });
    h += '</div>';
  });
  return h+'</div>';
}
function vietTatDV(x){
  return x.replace(/^(Phường|Xã|Thị trấn)\s+/i,'').replace(/Điểm giao dịch\s*/i,'');
}
/* 3.43: MỘT QUY TẮC CHO MỌI Ô (anh Nhân chốt) — có file ✓ · chưa có + (bấm thêm) · ô xã của báo cáo tính theo điểm: n/n.
   nhat = lý do ô này KHÔNG tính thiếu → cùng dấu + nhưng nhạt màu, để phần báo thiếu vẫn đúng */
function capChu(m){
  var c = (m.cap && m.cap.length) ? m.cap : (m.thuanXLS ? ['pgd'] : ['pgd','xa','diem']);
  return c.map(function(x){ return {pgd:'Toàn PGD', xa:'xã', diem:'điểm giao dịch'}[x]; }).join(', ');
}
function oHTML(o, ky, mau, dv, lop, nhat){
  var l = 'bdc-o '+(lop||'');
  var them = 'onclick="themChoO(\''+ky+'\',\''+mau.ma+'\',\''+dv.replace(/'/g,"")+'\')"';
  var oCong = function(ghiThem){
    return nhat
      ? '<td class="'+l+' khong-ap" title="'+coChuHTML(nhat)+' — không tính thiếu. Bấm nếu vẫn muốn thêm file" '+them+'>+'+(ghiThem||'')+'</td>'
      : '<td class="'+l+' thieu" title="Chưa có — bấm để thêm file" '+them+'>+'+(ghiThem||'')+'</td>';
  };
  /* ô XÃ: dấu chính là file riêng của xã; báo cáo có tính ở cấp điểm thì kèm n/n điểm (bấm để tách cột) */
  var laXa = dsDonVi('xa').indexOf(dv)>=0;
  if(laXa){
    var dm = demDiemCua(ky, mau.ma, dv);
    var coXa = (o.tt==='du' || o.tt==='phu') && o.ds.length && (o.ds[0].phamVi===dv);
    if(dm.tong && mauApCap(mau, 'diem')){
      var loaiN = dm.co===dm.tong ? ' du' : (dm.co ? ' mot' : '');
      if(!mauApCap(mau, 'xa') && !coXa)   /* báo cáo chỉ tính theo điểm → ô xã chính là n/n, như cũ */
        return '<td class="'+l+(dm.co===dm.tong?' du':(dm.co?' mot-phan':(nhat?' khong-ap':' thieu')))+'" title="'+dm.co+'/'+dm.tong+
          ' điểm giao dịch đã có file — bấm để tách cột điểm" onclick="moXa(\''+dv.replace(/'/g,"")+'\')">'+dm.co+'/'+dm.tong+'</td>';
      var pDiem = '<i class="o-diem'+loaiN+'" title="'+dm.co+'/'+dm.tong+
        ' điểm giao dịch đã có file — bấm để tách cột điểm" onclick="event.stopPropagation();moXa(\''+dv.replace(/'/g,"")+'\')">'+
        dm.co+'/'+dm.tong+'</i>';
      if(coXa) return '<td class="'+l+' du co-diem" title="File riêng của xã: '+coChuHTML(o.ds[0].tenMoi||'')+
        '" onclick="moXem(\''+o.ds[0].id+'\')">✓'+pDiem+'</td>';
      if(o.tt==='du') return '<td class="'+l+' du co-diem" title="Đủ file của các điểm giao dịch" onclick="moXa(\''+dv.replace(/'/g,"")+'\')">✓'+pDiem+'</td>';
      return oCong(pDiem).replace('class="'+l, 'class="'+l+' co-diem');
    }
  }
  if(o.tt==='mot-phan')
    return '<td class="'+l+' mot-phan" title="Đã có '+o.so+'/'+o.tong+' điểm giao dịch của '+coChuHTML(dv)+
      ' — bấm tên xã để xem từng điểm" onclick="moXa(\''+dv.replace(/'/g,"")+'\')">'+o.chu+'</td>';
  if(o.tt==='du'){
    var nhieuPhien = mau && mauTheoNgay(mau.ma) && o.ds.length>1;
    return '<td class="'+l+' du'+(nhieuPhien?' phien':'')+'" title="'+
      (nhieuPhien ? o.ds.length+' phiên giao dịch trong kỳ' : coChuHTML(o.ds[0].tenMoi||''))+
      '" onclick="moXem(\''+o.ds[0].id+'\')">'+(nhieuPhien ? o.ds.length+' phiên' : '✓')+
      (!nhieuPhien && o.ds.length>1?'<i>'+o.ds.length+'</i>':'')+'</td>';
  }
  if(o.tt==='phu')
    return '<td class="'+l+' phu" title="Mới có dữ liệu phụ, chưa có bản cuối tháng" '+them+'>⚠</td>';
  return oCong();
}
/* bấm ô thiếu → mở màn thêm file, nhớ sẵn kỳ + loại + phạm vi để điền cho file vừa thêm */
var CHO_O = null;
function themChoO(ky, ma, dv, daXacNhan){
  if(laKyChot(ky) && !daXacNhan)
    return hoi('Kỳ '+kyVN(ky)+' đã chốt', 'Kỳ này anh đã chốt đủ bộ. Vẫn thêm file vào ô này?', 'Vẫn thêm',
      function(){ themChoO(ky, ma, dv, true); });
  TAB_TRUOC = 2;
  var mau = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; });
  CHO_O = {ky:ky, ma:ma, ten:(mau?mau.ten:ma), pham:(dv==='Toàn PGD'?'Toàn PGD':dv), luc:Date.now()};
  bao('Thêm file cho: '+kyVN(ky)+' · '+(mau?mau.ten:ma)+' · '+dv+' — app điền sẵn 3 mục này.', 6);
  doiNgan(6);   /* 3.25: sang màn duyệt, trước đây ở lại tab Tháng nên bấm xong không thấy gì */
  var o = document.getElementById('chon-file'); if(o) o.click();
}
/* áp thông tin của ô ma trận cho mục vừa thêm — chạy cả khi app KHÔNG nhận ra loại báo cáo */
/* 3.28: cảnh báo khi file có vẻ không khớp ô anh chọn (khác đơn vị / khác loại) */
function canhBaoLech(d, chu){
  if(!CHO_O) return '';
  var t = boDau((chu||'')+' '+(d.tenCu||'')), ra = [];
  var dv = (dsDonVi('diem').concat(dsDonVi('xa'))).filter(function(x){
    return boDau(x) && t.indexOf(boDau(x))>=0 && x!==CHO_O.pham; });
  if(dv.length && CHO_O.pham!=='Toàn PGD' && t.indexOf(boDau(CHO_O.pham))<0)
    ra.push('file có vẻ của <b>'+coChuHTML(dv[0])+'</b> nhưng anh chọn ô <b>'+coChuHTML(CHO_O.pham)+'</b>');
  var mo = (D.cauHinh.mauBaoCao||[]).find(function(x){
    return x.ma!==CHO_O.ma && (x.tuKhoa||[]).some(function(k){ return k && t.indexOf(boDau(k))>=0; }); });
  if(mo) ra.push('nội dung giống <b>'+coChuHTML(mo.ten)+'</b> nhưng anh chọn ô <b>'+coChuHTML(CHO_O.ten)+'</b>');
  return ra.length ? ('⚠ Kiểm lại: '+ra.join(' · ')) : '';
}
function apChoO(d, chu){
  if(CHO_O && Date.now()-CHO_O.luc > 180000) CHO_O = null;   /* quá 3 phút thì bỏ, tránh dính sang file sau */
  if(!CHO_O) return d;
  d.nhom = 'duLieu';
  d.ky = CHO_O.ky;
  d.maLoai = CHO_O.ma;
  d.tenLoai = CHO_O.ten;
  if(!d.phamVi) d.phamVi = CHO_O.pham;
  d.chac = true;
  var cb = canhBaoLech(d, chu);
  d.canCu = 'Anh chọn từ ô ma trận: '+kyVN(CHO_O.ky)+' · '+CHO_O.ten+' · '+CHO_O.pham;
  if(cb){ d.canhBao = cb; d.chac = false; }
  d.tenMoi = tenDuLieu(d, d.duoi);
  CHO_O = null;   /* dùng xong bỏ ngay, file kế tiếp khai bình thường */
  return d;
}
/* ==========================================================
   CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
   Markdown là dạng AI đọc chuẩn nhất; kèm nút Nguyên bản để chắc chắn tuyệt đối.
   GIỮ NGUYÊN SỐ, không làm gọn — chỉ bỏ dòng/cột trống. Có kiểm đếm ô và cộng thử dòng tổng.
   ========================================================== */
function bangTuSheet(ws, XL){
  var a = XL.utils.sheet_to_json(ws, {header:1, raw:false, defval:''});
  /* bỏ dòng trống và cột trống, giữ nguyên mọi ô có chữ */
  a = a.filter(function(r){ return r.some(function(c){ return String(c).trim()!==''; }); });
  var soCot = Math.max.apply(null, a.map(function(r){ return r.length; }).concat([0]));
  var giu = [];
  for(var c=0;c<soCot;c++) if(a.some(function(r){ return String(r[c]===undefined?'':r[c]).trim()!==''; })) giu.push(c);
  return a.map(function(r){ return giu.map(function(c){ return String(r[c]===undefined?'':r[c]).trim(); }); });
}
function demO(b){ var n=0; b.forEach(function(r){ r.forEach(function(c){ if(c!=='') n++; }); }); return n; }
/* 3.74 (việc I): đọc được cả số kiểu Việt (1.234.567,5) và kiểu Anh (1,234,567.5 — bộ đọc Excel hay trả về kiểu này).
   Có cả chấm và phẩy → dấu đứng sau cùng là thập phân; chỉ một loại dấu mà lặp nhiều lần → ngăn nghìn;
   một dấu (chấm hoặc phẩy) + đúng 3 chữ số sau → ngăn nghìn (3,000 · 1.234); còn lại → thập phân (12,5 · 12.5) */
function soTu(x){
  var t = String(x||'').replace(/[^\d,.\-]/g,'');
  if(!t || !/\d/.test(t)) return null;
  var c = t.lastIndexOf(','), d = t.lastIndexOf('.');
  if(c>=0 && d>=0){
    if(c>d) t = t.replace(/\./g,'').replace(',', '.');
    else t = t.replace(/,/g,'');
  } else if(c>=0){
    t = (t.split(',').length>2 || /^-?\d{1,3},\d{3}$/.test(t)) ? t.replace(/,/g,'') : t.replace(',', '.');
  } else if(d>=0){
    if(t.split('.').length>2 || /^-?\d{1,3}\.\d{3}$/.test(t)) t = t.replace(/\./g,'');
  }
  var v = parseFloat(t); return isFinite(v) ? v : null;
}
/* cộng thử: dòng có chữ "tổng cộng" phải bằng tổng các dòng con của cùng cột */
function congThu(b){
  var iT = -1;
  b.forEach(function(r,i){ if(iT<0 && /tổng cộng|tong cong|cộng chung/i.test(r.join(' '))) iT = i; });
  if(iT<1) return {co:false};
  var lech = [], soCot = b[iT].length;
  for(var c=1;c<soCot;c++){
    var dich = soTu(b[iT][c]); if(dich===null) continue;
    var tong = 0, dem = 0;
    for(var r=1;r<iT;r++){ var v = soTu(b[r][c]); if(v!==null){ tong += v; dem++; } }
    if(!dem) continue;
    if(Math.abs(tong-dich) > Math.max(1, Math.abs(dich)*0.005)) lech.push('cột '+(c+1));
  }
  return {co:true, khop:!lech.length, lech:lech};
}
function sangMarkdown(b){
  if(!b.length) return '';
  var h = '| '+b[0].join(' | ')+' |\n|'+b[0].map(function(){ return '---'; }).join('|')+'|\n';
  return h + b.slice(1).map(function(r){ return '| '+r.join(' | ')+' |'; }).join('\n');
}
function sangNguyenBan(b){ return b.map(function(r){ return r.join('\t'); }).join('\n'); }
function uocToken(t){ return Math.round(t.length/3.2); }
function moChepAI(id){
  var m = timMuc(id) || (D.duLieu||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  if(!/\.(xlsx|xls|csv)$/i.test(m.tenMoi||m.tenCu||'')) return baoLoi('Chỉ chép được từ file Excel hoặc CSV.');
  dangLam('Đang đọc bảng…');
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; })))
  .then(function(){
    var XL = window.XLSX;
    if(!XL) throw new Error('Chưa tải được bộ đọc Excel — cần có mạng một lần');
    return docFile(m.id).then(function(bl){
      if(!bl) throw new Error('Chưa có bản sao file trong máy — mở file một lần rồi thử lại.');
      return bl.arrayBuffer();
    }).then(function(ab){
      var wb = XL.read(new Uint8Array(ab), {type:'array'});
      var ten = wb.SheetNames[0], b = bangTuSheet(wb.Sheets[ten], XL);
      hetLam(); veChepAI(m, b, wb.SheetNames.length);
    });
  }).catch(function(e){ hetLam(); baoLoi('Không đọc được bảng: '+(e&&e.message||e)); });
}
/* 3.74 (việc H — R4): dò dữ liệu khách trong bảng trước khi chép sang AI
   (cột họ tên / CCCD / điện thoại / địa chỉ, hoặc ô có số CCCD 12 số, CMND 9 số bắt đầu 0, số điện thoại 10 số) */
var KHACH_COT = [
  ['ten', /họ\s*(và)?\s*tên|tên\s*(khách|hộ|người)|chủ\s*hộ|người\s*vay|khách\s*hàng|ho\s*(va)?\s*ten|chu\s*ho|nguoi\s*vay/i],
  ['so', /cccd|cmnd|căn\s*cước|can\s*cuoc|chứng\s*minh|số\s*định\s*danh|định\s*danh|điện\s*thoại|dien\s*thoai|\bsđt\b|\bsdt\b|số\s*đt/i],
  ['dc', /địa\s*chỉ|dia\s*chi|nơi\s*ở|thường\s*trú/i]
];
var SO_KHACH = /(^|[^\d])0\d{9}(\d{2})?(?!\d)/;
function doKhach(b){
  var cot = {}, soO = 0, dauBang = -1;
  b.slice(0, 8).forEach(function(r, i){
    r.forEach(function(c, j){ KHACH_COT.forEach(function(k){ if(String(c).length<40 && k[1].test(c)){ cot[j] = k[0]; if(dauBang<0 || i<dauBang) dauBang = i; } }); });
  });
  b.forEach(function(r){ r.forEach(function(c){ if(SO_KHACH.test(String(c).replace(/[\s.]/g,''))) soO++; }); });
  var loai = {}; Object.keys(cot).forEach(function(j){ loai[cot[j]] = 1; });
  return {cot:cot, dau:dauBang, soO:soO, co: !!(Object.keys(cot).length || soO),
    ten: [loai.ten?'họ tên':'', loai.so||soO?'CCCD / số điện thoại':'', loai.dc?'địa chỉ':''].filter(Boolean).join(', ')};
}
/* che: họ tên → KH1, KH2…; CCCD / điện thoại → ***; địa chỉ → (đã che) — giữ nguyên mọi số liệu tiền */
function cheKhach(b, k){
  var stt = {}, n = 0;
  return b.map(function(r, i){ return r.map(function(c, j){
    if(c==='' || i<=k.dau) return c;
    var l = k.cot[j];
    if(/^(tổng|cộng|tong|cong)\b/i.test(String(c).trim())) return c;   /* dòng Tổng cộng */
    if((k.cot[j]==='ten' || k.cot[j]==='dc') && !/[A-Za-zÀ-ỹĐđ]/.test(c)) return c;   /* ô số trong cột tên / địa chỉ */
    if(l==='ten'){ var kh = boDau(c); if(!stt[kh]) stt[kh] = 'KH'+(++n); return stt[kh]; }
    if(l==='so') return '***';
    if(l==='dc') return '(đã che)';
    return String(c).replace(/0\d{9}(\d{2})?(?!\d)/g, '***');
  }); });
}
function veChepAI(m, b, soSheet){
  CHEP = {m:m, b:b, khach:doKhach(b)};
  var kh = CHEP.khach, kiem = congThu(b), md = boiCanh(m)+'\n\n'+sangMarkdown(kh.co ? cheKhach(b, kh) : b);
  moHop('<div class="hop-tit">Chép sang AI</div>'+
    '<div class="hop-phu">'+coChuHTML(m.tenMoi||m.tenCu||'')+' · '+b.length+' dòng · '+
      (b[0]||[]).length+' cột · '+demO(b)+' ô có số liệu'+(soSheet>1?' · lấy sheet đầu':'')+'</div>'+
    '<div class="ca-kiem '+(kiem.co ? (kiem.khop?'dat':'canh') : 'thuong')+'">'+
      (kiem.co ? (kiem.khop ? '✓ Đã cộng thử: các cột khớp dòng Tổng cộng'
                            : '⚠ Cộng thử lệch ở '+kiem.lech.join(', ')+' — kiểm lại file gốc trước khi dùng')
               : 'Không thấy dòng Tổng cộng để cộng thử — số liệu chép nguyên, không sửa gì')+'</div>'+
    (kh.co ? '<div class="ca-kiem canh ca-khach">⚠ Bảng có <b>dữ liệu khách</b> ('+kh.ten+(kh.soO?' · '+kh.soO+' ô có số CCCD / điện thoại':'')+'). '+
      'Chỉ dán vào công cụ AI được phép dùng dữ liệu khách hàng. '+
      '<label class="ca-che"><input type="checkbox" id="ca-che" checked onchange="xemChepAI()"> Che dữ liệu khách khi chép (họ tên → KH1, KH2…; CCCD, điện thoại → ***; số liệu tiền giữ nguyên)</label></div>' : '')+
    '<div class="o"><label>Xem trước (Markdown) · ước '+uocToken(md)+' token</label>'+
      '<textarea id="ca-xem" rows="9" readonly>'+coChuHTML(md)+'</textarea></div>'+
    '<div class="huong-dan">Số giữ nguyên như trong file, chỉ bỏ dòng và cột trống. Hai dòng đầu ghi bối cảnh để AI hiểu đang đọc gì.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    '<button class="nho" onclick="chepAI(\'thuong\')">Chép nguyên bản</button>'+
    '<button class="nho chinh" onclick="chepAI(\'md\')">Chép Markdown</button></div>', true);
}
var CHEP = null;
function boiCanh(m){
  var mau = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===m.maLoai; });
  return (mau?mau.ten:(m.tenLoai||'Số liệu'))+' · '+(m.phamVi||'Toàn PGD')+' · '+(D.cauHinh.donvi||'PGD')+
    (m.ky?'\nSố liệu kỳ '+kyVN(m.ky):'')+(m.nsl?' (đến '+ngayVN(m.nsl)+')':'');
}
function bangChepAI(){
  var o = document.getElementById('ca-che');
  return (CHEP.khach && CHEP.khach.co && (!o || o.checked)) ? cheKhach(CHEP.b, CHEP.khach) : CHEP.b;
}
function xemChepAI(){
  var e = document.getElementById('ca-xem'); if(e && CHEP) e.value = boiCanh(CHEP.m)+'\n\n'+sangMarkdown(bangChepAI());
}
function chepAI(kieu){
  if(!CHEP) return;
  var b = bangChepAI(), che = b!==CHEP.b;
  var t = boiCanh(CHEP.m)+'\n\n'+(kieu==='md' ? sangMarkdown(b) : sangNguyenBan(b));
  chepChu(t, 'Đã chép '+(kieu==='md'?'dạng Markdown':'nguyên bản')+(che?' (đã che dữ liệu khách)':'')+' · '+b.length+' dòng · ước '+uocToken(t)+' token. Dán thẳng vào cửa sổ AI.');
  dongHop();
}
function veThang(){
  var kt = document.getElementById('kieu-th');
  var dt = document.getElementById('dau-th');
  if(dt) dt.innerHTML = veDauTab('duLieu', {kho:D.duLieu, 
    hamThem:"CHO_O=null;nutChinh()",   /* 3.34: qua nutChinh để nhớ TAB_TRUOC=2 → Excel vào Dữ liệu tháng */
    themPhu: D.duLieu.length?'<button class="phu" onclick="ghepKy()">Ghép để xem</button>':''});
  var ds = locTheoThe('duLieu', locChuan('duLieu', loc(D.duLieu, tuKhoa))); BOT_DS.duLieu = ds;
  /* 3.27: hàng 2 của tab Tháng gộp đủ như các tab khác — kiểu xem + sắp xếp + khung xem + ổ G */
  var thanhXem = veThanhSap('duLieu', [['ky','Theo kỳ'],['donvi','Theo đơn vị'],['cay','Dạng cây']], kieuTh, 'datKieuTh', '<b>'+ds.length+'</b> file'+chuDemLoc('duLieu'));
  if(!ds.length){
    document.getElementById('tit-thang').textContent = 'Chưa có dữ liệu';
    document.getElementById('bang-thang').innerHTML = bangDoiChieuHTML()+
      '<div class="rong">Chưa có bộ dữ liệu nào.<br>Bấm ô <b>+</b> trong ma trận, hoặc <b>+ Thêm file</b> ở góc trên bên trái.</div>';
    return;
  }
  if(kieuTh!=='bang'){
    document.getElementById('tit-thang').textContent = '';   /* 3.74: số file nằm đầu hàng Sắp xếp */
    var than = (kieuTh==='donvi') ? nhomTheoDonVi(ds) : (kieuTh==='cay' ? cayDuLieu(ds) : nhomTheoThang(ds,'ky'));
    document.getElementById('bang-thang').innerHTML = bangDoiChieuHTML() + thanhXem + than;
    return;
  }
  var kys = {};
  ds.forEach(function(x){ if(x.ky) kys[x.ky]=1; });
  var dsKy = Object.keys(kys).sort();
  var hienKy = dsKy.slice(-6);

  var loai = [];
  (D.cauHinh.mauBaoCao||[]).forEach(function(m){ loai.push({ma:m.ma, ten:m.ten}); });
  var coKhac = ds.some(function(x){ return x.maLoai==='KHAC'; });
  if(coKhac) loai.push({ma:'KHAC', ten:'Khác — chưa phân loại'});

  var h = '<div class="cuon"><table><thead><tr><th>Báo cáo</th>'+
    hienKy.map(function(k){ return '<th>'+kyVN(k)+'</th>'; }).join('')+'</tr></thead><tbody>';
  loai.forEach(function(l){
    h += '<tr><td>'+coChuHTML(l.ten)+'</td>';
    hienKy.forEach(function(k){
      var c = ds.filter(function(x){ return x.ky===k && x.maLoai===l.ma; });
      if(c.length===0) h += '<td class="trong">—</td>';
      else if(c.length===1) h += '<td class="co" onclick="moXem(\''+c[0].id+'\')">✓</td>';
      else h += '<td class="co" onclick="moXem(\''+c[0].id+'\')">'+c.length+'</td>';
    });
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  var kMoi = dsKy[dsKy.length-1];
  var thieu = kyThieu();
  h += '<div class="nhan-nhom">'+kyVN(kMoi)+' · '+
       ds.filter(function(x){return x.ky===kMoi;}).length+' file'+
       (thieu.length?' · thiếu '+thieu.join(', '):' · đủ bộ')+'</div>';
  document.getElementById('tit-thang').textContent =
    'Năm '+(kMoi||'').slice(0,4)+' · kéo ngang xem kỳ cũ';
  document.getElementById('bang-thang').innerHTML = bangDoiChieuHTML() + thanhXem + h;
  nhacKhac();
}
function nhacKhac(){
  var k = D.duLieu.filter(function(x){ return x.maLoai==='KHAC'; });
  if(k.length>=5 && !D.cauHinh.taNhacKhac){
    bao('Mục Khác đã có '+k.length+' file. Vào Cài đặt để khai thành loại chính thức.', 5);
    D.cauHinh.taNhacKhac = true; luu();
  }
}

/* ----- ngăn 3: GHI CHÚ ----- */
/* 3.43 (anh duyệt phương án a): tab Ghi chú đổi thành THƯ VIỆN — 2 phần Ghi chú · Bảo trì kho.
   Kho là thư viện dữ liệu, bảo trì chuẩn hóa làm thường xuyên nên để ngoài, không giấu trong Cài đặt (Cài đặt vẫn còn lối vào). */
/* 3.51 (anh chốt): Thư viện = 📁 Bộ hồ sơ (ghi chú tự do + gom file liên quan theo từng vụ việc) · 🖼 Ghi chú ảnh.
   Bảo trì kho đã gộp vào 🧰 Dọn kho (nút trên thanh trên cùng). */
function tvPhan(){ return D.cauHinh.tvPhan==='gc' ? 'gc' : (D.cauHinh.tvPhan==='no' ? 'no' : 'bo'); }
function datTvPhan(k){ D.cauHinh.tvPhan = k; BO.mo = ''; luu(); veGhiChu(); }
function thanhTV(){
  var p = tvPhan();
  return '<div class="tv-chon">'+
    '<button class="'+(p==='bo'?'bat':'')+'" onclick="datTvPhan(\'bo\')">📁 Bộ hồ sơ <small>'+(D.boHS||[]).length+'</small></button>'+
    '<button class="'+(p==='gc'?'bat':'')+'" onclick="datTvPhan(\'gc\')">🖼 Ghi chú ảnh <small>'+D.ghiChu.length+'</small></button>'+
    '<button class="'+(p==='no'?'bat':'')+'" onclick="TDN.mo=\'\';datTvPhan(\'no\')">⚠ Theo dõi nợ <small>'+(NO_SAN?Object.keys(NO.mon).length:'')+'</small></button>'+
    '<button class="nho nut-hd" onclick="moHuongDan(\'ghiChu\')" title="Hướng dẫn">❓</button></div>';
}
/* ==========================================================
   3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
   (biên bản, giấy chứng tử, bản scan HĐ…). Gắn file CÓ SẴN ở mọi tab (chỉ liên kết, không chép) hoặc thêm file MỚI riêng của bộ
   (lưu Drive: Tủ hồ sơ / Bộ hồ sơ / <tên bộ>). Mỗi bộ gắn địa bàn theo cây Xã → Điểm GD → Ấp/KP → Tổ (tổ thuộc Hội).
   Đồng bộ 2 máy qua chỉ mục; xóa bộ → thùng rác (ngăn Bộ hồ sơ).
   ========================================================== */
var BO = {mo:'', loc:{}, tim:''};
var LOAI_BO_MD = ['Rủi ro','Hồ sơ vay','Gia hạn · điều chỉnh','Thu hồi nợ','Khác'];
function dsLoaiBo(){ return (D.cauHinh.loaiBoHS && D.cauHinh.loaiBoHS.length) ? D.cauHinh.loaiBoHS : LOAI_BO_MD; }
function timBo(id){ return (D.boHS||[]).find(function(b){ return b.id===id; }); }
function nhanTo(t){ return typeof t==='string' ? t : ((t.ma?t.ma+' — ':'')+(t.ten||'')); }
/* hội của tổ (cột "ut" trong danh mục địa bàn) */
function hoiCuaTo(xa, diem, ap, to){
  var kq = '';
  (D.cauHinh.diaBan||[]).forEach(function(x){ if(x.xa!==xa) return;
    (x.diem||[]).forEach(function(z){ if(diem && z.ten!==diem) return;
      (z.ap||[]).forEach(function(a){ if(ap && a.ten!==ap) return;
        (a.to||[]).forEach(function(t){ if(nhanTo(t)===to && typeof t!=='string') kq = t.ut||''; }); }); }); });
  return kq;
}
function duongBo(b){ return [b.xa, b.diem, b.ap, b.to ? 'Tổ '+b.to : ''].filter(Boolean).join(' › '); }
function taoBoHS(){
  moHop('<div class="hop-tit">📁 Tạo bộ hồ sơ</div>'+
    '<div class="hop-phu">Ví dụ: loại <b>Rủi ro</b>, khách <b>Võ Văn Cường</b>. Tạo xong gắn địa bàn, ghi chú và thêm file.</div>'+
    '<div class="o"><label>Loại</label><select id="bhs-loai">'+dsLoaiBo().map(function(x){ return '<option>'+coChuHTML(x)+'</option>'; }).join('')+'</select></div>'+
    '<div class="o"><label>Tên khách / vụ việc</label><input id="bhs-khach" placeholder="Võ Văn Cường" onkeydown="if(event.key===\'Enter\')xongTaoBo()"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="xongTaoBo()">Tạo</button></div>');
  setTimeout(function(){ var e = document.getElementById('bhs-khach'); if(e) e.focus(); }, 50);
}
function xongTaoBo(){
  var loai = gt('bhs-loai'), khach = gt('bhs-khach');
  if(!khach) return baoLoi('Nhập tên khách hoặc tên vụ việc.');
  var now = new Date().toISOString(), L = BO.loc||{};
  var b = {id:'bo'+idMoi(), loai:loai, khach:khach, ten:loai+' · '+khach, ghiChu:'', xa:L.xa||'', diem:L.diem||'', ap:L.ap||'', to:L.to||'', hoi:'',
    file:[], trangThai:'dang', taoLuc:now, suaLuc:now, may:maMayCua()};
  if(b.to) b.hoi = hoiCuaTo(b.xa, b.diem, b.ap, b.to);
  D.boHS = D.boHS||[]; D.boHS.unshift(b); luu();
  dongHop(); if(nganHienTai!==3) doiNgan(3); D.cauHinh.tvPhan = 'bo'; BO.mo = b.id; veGhiChu();
}
function suaBoHS(id, k, v){
  var b = timBo(id); if(!b) return;
  b[k] = v; b.suaLuc = new Date().toISOString();
  if(k==='loai' || k==='khach') b.ten = (b.loai||'')+' · '+(b.khach||'');
  if(k==='xa'){ b.diem = ''; b.ap = ''; b.to = ''; b.hoi = ''; }
  if(k==='diem'){ b.ap = ''; b.to = ''; b.hoi = ''; }
  if(k==='ap'){ b.to = ''; b.hoi = ''; }
  if(k==='to') b.hoi = hoiCuaTo(b.xa, b.diem, b.ap, v) || b.hoi;
  clearTimeout(suaBoHS.hen); suaBoHS.hen = setTimeout(luu, 600);
  if(k!=='ghiChu') veGhiChu();
}
/* ---- danh sách + cây địa bàn ---- */
function veBoHS(){
  if(BO.mo && timBo(BO.mo)) return veMotBo(timBo(BO.mo));
  BO.mo = '';
  var ds = (D.boHS||[]).slice(), L = BO.loc||{};
  var dem = function(xa, diem, ap, to){ return ds.filter(function(b){ return b.xa===xa && (diem==null || b.diem===diem) && (ap==null || b.ap===ap) && (to==null || b.to===to); }).length; };
  var loc = ds.filter(function(b){
    if(L.chua) return !b.xa;
    if(L.xa && b.xa!==L.xa) return false; if(L.diem && b.diem!==L.diem) return false;
    if(L.ap && b.ap!==L.ap) return false; if(L.to && b.to!==L.to) return false;
    if(L.hoi && b.hoi!==L.hoi) return false;
    if(tuKhoa && boDau([b.ten, b.khach, b.ghiChu, duongBo(b), b.hoi].join(' ')).indexOf(tuKhoa)<0) return false;
    return true;
  }).sort(function(a,c){ return (c.suaLuc||'').localeCompare(a.suaLuc||''); });
  var nut = function(nhan, loc2, so, lop){
    var bat = JSON.stringify(loc2)===JSON.stringify(L);
    return '<span class="bhs-nut'+(bat?' bat':'')+(so?' co':'')+(lop?' '+lop:'')+'" onclick=\'BO.loc='+JSON.stringify(loc2).replace(/'/g,"&#39;")+';veGhiChu()\'>'+coChuHTML(nhan)+(so?' <b>'+so+'</b>':'')+'</span>';
  };
  var cay = '<div class="bhs-cay"><div class="bhs-cay-dau">Địa bàn</div>'+nut('Tất cả', {}, ds.length)+
    (ds.some(function(b){ return !b.xa; }) ? nut('Chưa gắn địa bàn', {chua:1}, ds.filter(function(b){ return !b.xa; }).length) : '');
  (D.cauHinh.diaBan||[]).forEach(function(x){
    var nx = dem(x.xa);
    cay += '<details'+(L.xa===x.xa?' open':'')+'><summary>'+nut(x.xa, {xa:x.xa}, nx, 'xa')+'</summary><div class="bhs-con">';
    (x.diem||[]).forEach(function(z){
      cay += '<details'+(L.diem===z.ten && L.xa===x.xa?' open':'')+'><summary>'+nut('📍 '+z.ten, {xa:x.xa, diem:z.ten}, dem(x.xa, z.ten))+'</summary><div class="bhs-con">';
      (z.ap||[]).forEach(function(a){
        cay += '<details'+(L.ap===a.ten && L.diem===z.ten?' open':'')+'><summary>'+nut('🏘 '+a.ten, {xa:x.xa, diem:z.ten, ap:a.ten}, dem(x.xa, z.ten, a.ten))+'</summary><div class="bhs-con">'+
          (a.to||[]).map(function(t){ var tn = nhanTo(t), hoi = typeof t==='string' ? '' : (t.ut||'');
            return nut('👥 Tổ '+tn+(hoi?' · '+hoi:''), {xa:x.xa, diem:z.ten, ap:a.ten, to:tn}, dem(x.xa, z.ten, a.ten, tn)); }).join('')+'</div></details>';
      });
      cay += '</div></details>';
    });
    cay += '</div></details>';
  });
  if(!(D.cauHinh.diaBan||[]).length) cay += '<div class="huong-dan">Chưa có danh mục địa bàn — khai ở ⚙ Cài đặt › Địa bàn.</div>';
  var hoi = dsHoiDoanThe();
  cay += '<div class="bhs-cay-dau" style="margin-top:8px">Hội</div>'+hoi.map(function(h){ return nut(h, {hoi:h}, ds.filter(function(b){ return b.hoi===h; }).length); }).join('')+'</div>';
  var h = '<div class="dau-tab"><button class="nut-them" onclick="taoBoHS()"><span class="cong">+</span> Tạo bộ hồ sơ</button></div>'+
    '<div class="bhs-khung">'+cay+'<div class="bhs-ds">'+
    '<div class="nhan-nhom">'+loc.length+' bộ'+(L.xa||L.hoi||L.chua?' · '+coChuHTML(L.chua?'chưa gắn địa bàn':[L.xa,L.diem,L.ap,L.to?'Tổ '+L.to:'',L.hoi].filter(Boolean).join(' › '))+' <span class="xoa-loc" onclick="BO.loc={};veGhiChu()">bỏ lọc</span>':'')+'</div>'+
    (loc.length ? loc.map(function(b){
      return '<div class="bhs-the" onclick="BO.mo=\''+b.id+'\';veGhiChu()">'+
        '<div class="bhs-the-dau"><span class="tg '+(b.loai==='Rủi ro'?'phu':'')+'">'+coChuHTML(b.loai||'')+'</span><b>'+coChuHTML(b.khach||b.ten)+'</b>'+
        (b.trangThai==='xong'?'<span class="tg xam">✓ Xong</span>':'')+'</div>'+
        '<small>'+coChuHTML(duongBo(b)||'chưa gắn địa bàn')+(b.hoi?' · '+coChuHTML(b.hoi):'')+' · '+(b.file||[]).length+' file · sửa '+ngayVN((b.suaLuc||'').slice(0,10))+'</small>'+
        (b.ghiChu ? '<div class="bhs-trich">'+coChuHTML(b.ghiChu.slice(0,140))+(b.ghiChu.length>140?'…':'')+'</div>' : '')+'</div>';
    }).join('') : '<div class="rong">'+((D.boHS||[]).length ? 'Không có bộ nào khớp.' : 'Chưa có bộ hồ sơ nào.<br>Bấm <b>+ Tạo bộ hồ sơ</b> — ví dụ "Rủi ro · Võ Văn Cường" rồi gom biên bản, giấy chứng tử, bản scan HĐ vào một chỗ.')+'</div>')+
    '</div></div>';
  return h;
}
/* ---- một bộ ---- */
function tenFileBo(f){
  var m = fileBoMuc(f);
  return m ? (m.tenMoi||m.ten||m.tenCu||'') : (f.ten||'(file không còn)');
}
function fileBoMuc(f){
  if(f.k==='scan') return timScan(f.id);
  if(f.k==='ka') return (D.kyAnh||[]).find(function(x){ return x.id===f.id; });
  if(f.k==='rieng') return null;
  return timMuc(f.id);
}
function veMotBo(b){
  var chon = function(id, ds, gtri, k){
    return '<select onchange="suaBoHS(\''+b.id+'\',\''+k+'\',this.value)"><option value="">— chọn —</option>'+
      ds.map(function(x){ return '<option'+(x===gtri?' selected':'')+'>'+coChuHTML(x)+'</option>'; }).join('')+'</select>';
  };
  var h = '<div class="dk-dau"><button class="nho" onclick="BO.mo=\'\';veGhiChu()">‹ Danh sách bộ</button><b>📁 '+coChuHTML(b.ten)+'</b>'+
      '<button class="nho" onclick="moHuongDan(\'ghiChu\')">❓</button></div>'+
    '<div class="bhs-o">'+
      '<label>Loại '+chon('', dsLoaiBo(), b.loai, 'loai')+'</label>'+
      '<label>Khách / vụ việc <input value="'+coChuHTML(b.khach||'')+'" onchange="suaBoHS(\''+b.id+'\',\'khach\',this.value.trim())"></label>'+
      '<label>Trạng thái <select onchange="suaBoHS(\''+b.id+'\',\'trangThai\',this.value)"><option value="dang"'+(b.trangThai!=='xong'?' selected':'')+'>Đang xử lý</option><option value="xong"'+(b.trangThai==='xong'?' selected':'')+'>Xong</option></select></label></div>'+
    '<div class="bhs-o"><label>Xã '+chon('', dsXa(), b.xa, 'xa')+'</label>'+
      '<label>Điểm GD '+chon('', b.xa?dsDiem(b.xa):[], b.diem, 'diem')+'</label>'+
      '<label>Ấp / KP '+chon('', b.xa?dsAp(b.xa, b.diem):[], b.ap, 'ap')+'</label>'+
      '<label>Tổ '+chon('', b.xa?dsTo(b.xa, b.diem, b.ap):[], b.to, 'to')+'</label>'+
      '<label>Hội '+chon('', dsHoiDoanThe(), b.hoi, 'hoi')+'</label></div>'+
    '<div class="bhs-duong">📍 '+coChuHTML(duongBo(b)||'Chưa gắn địa bàn')+(b.hoi?' · Hội '+coChuHTML(b.hoi):'')+'</div>'+
    '<div class="o"><label>Ghi chú tự do (tự lưu)</label><textarea class="bhs-ghi" rows="7" placeholder="Diễn biến, việc cần làm, số liệu, người liên hệ…" oninput="suaBoHS(\''+b.id+'\',\'ghiChu\',this.value)">'+coChuHTML(b.ghiChu||'')+'</textarea></div>'+
    '<div class="nhan-nhom">File trong bộ ('+(b.file||[]).length+') — bấm tên để xem thử</div>'+
    '<div class="hang-nut" style="margin:0 0 8px"><button class="nho chinh" onclick="moGanFileBo(\''+b.id+'\')">🔗 Gắn file có sẵn</button>'+
      '<button class="nho" onclick="themFileBo(\''+b.id+'\')">📎 Thêm file mới</button></div>'+
    ((b.file||[]).length ? (b.file||[]).map(function(f, i){
      var m = fileBoMuc(f), con = f.k==='rieng' || !!m;
      var ic = f.k==='scan' ? '🪪' : f.k==='ka' ? '✍' : f.k==='rieng' ? '📎' : '📄';
      var duong = f.k==='rieng' ? (f.driveId ? '☁ '+D.cauHinh.thumuc+' / Bộ hồ sơ / '+sachTen(b.ten) : '💻 Chỉ trong máy này (chưa lên Drive) · file riêng của bộ')
        : m ? duongThat(m, f.k==='ka'?'ka':'')+' · '+(f.k==='scan'?'tab Scan':f.k==='ka'?'Chữ ký·CCCD':'tab '+coChuHTML(TEN_PHAN[khoCuaMuc(m)]||'')) : 'File gốc đã bị xóa / đang ở thùng rác';
      return '<div class="dk-dong"><span>'+ic+'</span><div class="dk-ten" onclick="xemFileBo(\''+b.id+'\','+i+')"><b>'+coChuHTML(tenFileBo(f))+'</b><small>'+coChuHTML(duong)+'</small></div>'+
        '<button class="nho" onclick="goFileBo(\''+b.id+'\','+i+')" title="'+(f.k==='rieng'?'Bỏ file riêng này (vào thùng rác)':'Gỡ khỏi bộ — file gốc giữ nguyên')+'">✕</button></div>';
    }).join('') : '<div class="huong-dan">Chưa có file. Gắn file có sẵn (biên bản, bản scan HĐ lưu…) hoặc thêm file mới.</div>')+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho xau" onclick="xoaBoHS(\''+b.id+'\')">🗑 Xóa bộ</button></div>';
  return h;
}
function xemFileBo(bid, i){
  var b = timBo(bid), f = b && b.file[i]; if(!f) return;
  if(f.k==='rieng'){
    var m = {id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), driveId:f.driveId, co:f.co};
    var cp = document.getElementById('cotphai');
    if(cp && cp.offsetParent && !anPV){ mucDangXem = m; cp.classList.remove('pv-trong'); document.getElementById('cp-ten').textContent = f.ten;
      document.getElementById('cp-phu').textContent = f.driveId ? '☁ '+D.cauHinh.thumuc+' / Bộ hồ sơ / '+sachTen(b.ten) : '💻 Chỉ trong máy này'; veNutCN(null); veNoiDung(m, 'phai'); }
    else moXem(null, m);
    return;
  }
  xemThu(f.k==='scan'?'scan':f.k==='ka'?'ka':'muc', f.id);
}
function goFileBo(bid, i){
  var b = timBo(bid), f = b && b.file[i]; if(!f) return;
  var bo = function(){ b.file.splice(i, 1); b.suaLuc = new Date().toISOString(); luu(); veGhiChu(); };
  if(f.k!=='rieng'){ bo(); return baoHoanTac('Đã gỡ khỏi bộ — file gốc vẫn ở chỗ cũ.', function(){ b.file.splice(i, 0, f); luu(); veGhiChu(); }); }
  /* file riêng của bộ: theo quy tắc chung → vào thùng rác (ngăn Khác), khôi phục về tab Văn bản */
  var now = new Date().toISOString();
  D.rac = D.rac||[]; D.rac.push({id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), co:f.co||0, driveId:f.driveId||'', driveCha:f.driveCha||'',
    nhom:'khac', khoCu:'vanBan', xoaLuc:now, suaLuc:now, lyDoXoa:'Bỏ khỏi bộ '+b.ten, choDB:!!f.driveId, ngay:now.slice(0,10), trichYeu:f.ten});
  bo(); capNhatDemRac(); if(DR.sanSang && DR.online) chayDongBoCho();
  baoHoanTac('Đã chuyển file vào thùng rác.', function(){ D.rac = D.rac.filter(function(x){ return x.id!==f.id; }); b.file.splice(i, 0, f); luu(); capNhatDemRac(); veGhiChu(); });
}
function xoaBoHS(id){
  xoaNhieuVaoRac([id], function(){ BO.mo = ''; veGhiChu(); });
}
/* ---- gắn file có sẵn ở mọi tab ---- */
var GAN = {bo:'', nk:'', tim:''};
/* 3.52: danh sách file đích của hộp Gắn file — một bộ hồ sơ hoặc một dòng ở Hôm nay */
function ganDich(){
  if(GAN.nk){ var m = ntTim(GAN.nk); if(!m) return null; m.dinh = m.dinh||[]; return m.dinh; }
  if(GAN.tdn){ var ho = NO.ho[GAN.tdn]; if(!ho) return null; ho.file = ho.file||[]; return ho.file; }   /* 3.64: hồ sơ hộ vay */
  var b = timBo(GAN.bo); return b ? b.file : null;
}
function moGanFileBo(bid){
  var b = timBo(bid); if(!b) return;
  GAN = {bo:bid, nk:'', tim:b.khach||''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào bộ</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó, không chép, không dời. Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" value="'+coChuHTML(GAN.tim)+'" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
  veGanDS();
}
function dsGanDuoc(){
  var ra = [];
  D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]).forEach(function(m){ ra.push({k:'muc', id:m.id, ten:m.tenMoi||m.ten||m.tenCu||'', phu:TEN_PHAN[khoCuaMuc(m)]||'', tim:[m.tenMoi,m.tenCu,m.ten,m.soHieu,m.trichYeu,m.moTa].join(' ')}); });
  (D.scan||[]).forEach(function(k){ ra.push({k:'scan', id:k.id, ten:k.ten||'(bản quét)', phu:'Scan'+(k.xa?' · '+k.xa:''), tim:[k.ten,k.xa,k.ap,k.to].join(' ')}); });
  (D.kyAnh||[]).forEach(function(k){ ra.push({k:'ka', id:k.id, ten:k.ten, phu:'Chữ ký·CCCD', tim:[k.ten,k.khach].join(' ')}); });
  return ra;
}
function veGanDS(){
  var e = document.getElementById('gan-ds'); if(!e) return;
  var co = {}; (ganDich()||[]).forEach(function(f){ co[f.k+':'+f.id] = 1; });
  var q = boDau(GAN.tim||'').trim(), tu = q ? q.split(/\s+/) : [];
  var ds = dsGanDuoc().filter(function(x){ var t = boDau(x.tim); return tu.every(function(w){ return t.indexOf(w)>=0; }); }).slice(0, 80);
  e.innerHTML = ds.length ? ds.map(function(x){
    var da = co[x.k+':'+x.id];
    return '<label class="rac-dong"><input type="checkbox" class="gan-o" value="'+x.k+':'+x.id+'"'+(da?' checked disabled':'')+'>'+
      '<span class="rac-ten">'+coChuHTML(x.ten)+'<small>'+coChuHTML(x.phu)+(da?(GAN.nk?' · đã gắn':' · đã có trong bộ'):'')+'</small></span></label>';
  }).join('') : '<div class="huong-dan">Không thấy file nào khớp.</div>';
}
function xongGanFile(){
  if(GAN.tdn){   /* 3.64: gắn vào hồ sơ hộ vay (Theo dõi nợ) */
    var dsF = ganDich(), hoG = NO.ho[GAN.tdn], tenG = {}, kG = 0; if(!dsF || !hoG) return;
    dsGanDuoc().forEach(function(x){ tenG[x.k+':'+x.id] = x.ten; });
    Array.prototype.forEach.call(document.querySelectorAll('.gan-o:checked:not(:disabled)'), function(c){
      var p = c.value.split(':'); dsF.push({k:p[0], id:p.slice(1).join(':'), ten:tenG[c.value]||'', nhom:p[0]==='scan'?'goc':'khac', themLuc:new Date().toISOString()}); kG++;
    });
    hoG.suaLuc = new Date().toISOString(); luuNo(); dongHop(); veGhiChu();
    return bao(kG ? 'Đã gắn '+kG+' file vào hồ sơ hộ.' : 'Chưa tích file nào.', 3);
  }
  if(GAN.nk){   /* 3.52: gắn vào dòng ở Hôm nay — giữ kèm tên để máy kia / file đã xóa vẫn biết là file gì */
    var dich = ganDich(), m = ntTim(GAN.nk), ten = {}, k = 0; if(!dich || !m) return;
    dsGanDuoc().forEach(function(x){ ten[x.k+':'+x.id] = x.ten; });
    Array.prototype.forEach.call(document.querySelectorAll('.gan-o:checked:not(:disabled)'), function(c){
      var p = c.value.split(':'); dich.push({k:p[0], id:p.slice(1).join(':'), ten:ten[c.value]||''}); k++;
    });
    m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); dongHop(); veLich();
    return bao(k ? 'Đã gắn '+k+' file vào dòng.' : 'Chưa tích file nào.', 3);
  }
  var b = timBo(GAN.bo); if(!b) return;
  var n = 0;
  Array.prototype.forEach.call(document.querySelectorAll('.gan-o:checked:not(:disabled)'), function(c){
    var p = c.value.split(':'); b.file.push({k:p[0], id:p.slice(1).join(':')}); n++;
  });
  b.suaLuc = new Date().toISOString(); luu(); dongHop(); veGhiChu();
  bao(n ? 'Đã gắn '+n+' file vào bộ.' : 'Chưa tích file nào.', 3);
}
/* ---- thêm file mới riêng của bộ: lưu trong máy + đưa lên Drive: Tủ hồ sơ / Bộ hồ sơ / <tên bộ> ---- */
function themFileBo(bid){
  var i = document.createElement('input'); i.type = 'file'; i.multiple = true;
  i.onchange = function(){
    var b = timBo(bid); if(!b || !i.files.length) return;
    var ds = Array.prototype.slice.call(i.files);
    Promise.all(ds.map(function(f){
      var id = 'bf'+idMoi();
      return luuFile(id, f).then(function(){ b.file.push({k:'rieng', id:id, ten:f.name, co:f.size, loai:f.type||'', themLuc:new Date().toISOString()}); });
    })).then(function(){
      b.suaLuc = new Date().toISOString(); luu(); veGhiChu();
      bao('Đã thêm '+ds.length+' file vào bộ.'+(coTheNoiDrive()?' Đang đưa lên Drive…':''), 4);
      dayFileBoCho();
    });
  };
  i.click();
}
function dayFileBoCho(){
  if(!coTheNoiDrive() || !(DR.sanSang && DR.online) || dayFileBoCho.dang) return Promise.resolve();
  var viec = [];
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) viec.push([b, f]); }); });
  if(!viec.length) return Promise.resolve();
  dayFileBoCho.dang = true;
  return viec.reduce(function(p, x){
    return p.then(function(){
      var b = x[0], f = x[1], duong = D.cauHinh.thumuc+' / Bộ hồ sơ / '+sachTen(b.ten);
      return Promise.all([docFile(f.id), baoDamDuong(duong)]).then(function(r){
        var bl = r[0], idTM = r[1]; if(!bl) return;
        return dayBlobLenDrive(f.ten, f.loai, bl, idTM)
          .then(function(r2){ f.driveId = r2 && r2.id; f.driveCha = idTM; b.suaLuc = new Date().toISOString(); });
      }).catch(function(e){ console.warn('Chưa đưa file bộ lên Drive', f.ten, e); });
    });
  }, Promise.resolve()).then(function(){ dayFileBoCho.dang = false; luu(); if(nganHienTai===3) veGhiChu(); });
}
/* file nào đang nằm trong bộ nào — hiện ở khung xem */
function boCuaFileHTML(id){
  var ds = (D.boHS||[]).filter(function(b){ return (b.file||[]).some(function(f){ return f.id===id; }); });
  if(!ds.length) return '';
  return '<div class="lien-quan">📁 Thuộc bộ: '+ds.map(function(b){ return '<a class="lk" onclick="doiNgan(3);D.cauHinh.tvPhan=\'bo\';BO.mo=\''+b.id+'\';veGhiChu()">'+coChuHTML(b.ten)+'</a>'; }).join(', ')+'</div>';
}
/* ==========================================================
   3.64 — ⚠ THEO DÕI NỢ (Thư viện): 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh (anh chốt 03/10/2026)
   Dữ liệu 3 lớp, KHÔNG BAO GIỜ XÓA khi cập nhật tháng:
     NO.ho[mãKH]   hồ sơ hộ vay (anh bổ sung: người vay & hộ, thừa kế, thực trạng, tài sản, sử dụng vốn, nguyên nhân, phương án)
                   + tài liệu (hồ sơ gốc, biên bản đã ký, ảnh) + vị trí nhà — dùng chung cho cả 3 danh sách
     NO.mon[sốKƯ]  món vay: số liệu TỪNG THÁNG của từng danh sách (mon.loai[khd|nqh|nk].ky['YYYY-MM'])
     NO.lan[]      lần làm việc (gắn hộ + món + loại) → biên bản Word theo mẫu, cam kết lên lịch Hôm nay
   Lưu IndexedDB (khóa 'tdn_du_lieu', không chiếm localStorage) · đồng bộ Drive _Hệ thống/theodoino.json (bản sửa sau thắng)
   Dữ liệu khách chỉ nằm trong máy + Drive của anh.
   ========================================================== */
var NO = {ho:{}, mon:{}, lan:[], lanXoa:[], nhap:{}, toAp:{}, suaLuc:''};
var NO_SAN = false;
var TDN = {loai:'nqh', xem:'ds', loc:'dang', tim:'', cay:null, mo:''};
var TDN_LOAI = {
  khd:{ten:'3 tháng KHD', ico:'⏳', dai:'Món vay 3 tháng trở lên không hoạt động'},
  nqh:{ten:'Nợ quá hạn',  ico:'🔴', dai:'Nợ quá hạn'},
  nk: {ten:'Nợ khoanh',   ico:'🔒', dai:'Nợ khoanh'}
};
var TDN_DVUT = {'11':'Hội Nông dân','12':'Hội Phụ nữ','13':'Hội Cựu chiến binh','14':'Đoàn Thanh niên'};
/* 3.71: đủ danh mục mã chương trình theo hệ thống (MACT · TENVT · TENCT) — nguồn: Danh mục chương trình vay (xls) anh gửi */
var TDN_CT = {'01':['HONGHEO','Cho vay ưu đãi hộ nghèo'],'02':['HSSV','Cho vay học sinh, sinh viên có hoàn cảnh khó khăn'],
  '03':['GQVL','Cho vay giải quyết việc làm'],'04':['XKLD','Cho vay ĐTCS đi lao động có thời hạn ở nước ngoài'],
  '05':['NVLSCL','Cho vay trả chậm nhà ở cho hộ dân ĐB sông Cửu Long và Tây Nguyên'],'06':['NSVSMT','Cho vay nước sạch và vệ sinh môi trường nông thôn'],
  '07':['HN_QD167','Cho vay hộ nghèo về nhà ở'],'08':['KFW','Cho vay doanh nghiệp vừa và nhỏ (KFW)'],'09':['MOI_TNGHEO','Cho vay hộ mới thoát nghèo theo QĐ 28'],
  '10':['HSXVKK','Cho vay hộ gia đình SXKD tại vùng khó khăn'],'11':['DTTS_DBKK','Cho vay hộ dân tộc thiểu số đặc biệt khó khăn theo QĐ 32, QĐ 54'],
  '12':['CVNHA100','Cho vay nhà ở xã hội theo Nghị định số 100'],'13':['SDLDCN','Cho vay hộ, cơ sở SX sử dụng lao động sau cai nghiện ma túy'],
  '14':['DTTSNSCL','Cho vay hộ dân tộc thiểu số nghèo ĐB sông Cửu Long theo QĐ 74, QĐ 29'],'15':['T.NHAN_VKK','Cho vay thương nhân vùng khó khăn'],
  '16':['XKLD_QD71','Cho vay người lao động thuộc huyện nghèo đi XKLĐ'],'17':['DTTSQD1592','Cho vay hộ đồng bào DTTS nghèo, đời sống khó khăn theo QĐ 755'],
  '18':['HNXDCHOI','Cho vay hộ nghèo xây dựng chòi tránh lũ, lụt theo QĐ 716, QĐ 48'],'19':['HCN_QD15','Cho vay hộ cận nghèo theo QĐ 15'],
  '20':['CVPTTRCN','Cho vay trồng rừng sản xuất, phát triển chăn nuôi theo Nghị định số 75'],'21':['DTTS_2085','Cho vay hộ Dân tộc thiểu số QĐ 2085/2016'],
  '22':['CV_TNXP','Cho vay đối với thanh niên xung phong'],'23':['NSDLDTLNVNLD','Cho vay người sử dụng lao động để trả lương ngừng việc đối với người lao động do Covid-19'],
  '24':['CVCSGDMNTHNCL','Cho vay cơ sở giáo dục mầm non, tiểu học ngoài công lập'],'25':['CVDTTSMN','Cho vay vùng dân tộc thiểu số và miền núi'],
  '26':['NCHXAPT','Cho vay người chấp hành xong án phạt tù'],'91':['DAPTLNWB','Cho vay theo chương trình dự án phát triển Lâm nghiệp (WB)'],
  '92':['IFAD','Cho vay theo dự án IFAD'],'93':['RIDP','Cho vay theo dự án RIDP'],'94':['CWPD','Cho vay theo dự án CWDP'],
  '96':['NIPPON','Cho vay theo dự án NIPPON'],'99':['KHAC','Cho vay khác']};
/* viết tắt dùng trong app (phân loại văn bản, biểu mẫu) ↔ mã chương trình hệ thống — giữ viết tắt cũ để không đổi dữ liệu đã lưu */
var CT_APP_MA = {'HN':'01','HCN':'19','HMTN':'09','NS&VSMT':'06','GQVL':'03','HSSV':'02','NO-HN':'07','NOXH':'12','SXKD-VKK':'10','XKLĐ':'04','NCHXAPT':'26'};
function ctMaCua(vt){ return CT_APP_MA[vt] || ''; }
function ctVTAppCua(ma){ for(var k in CT_APP_MA) if(CT_APP_MA[k]===ma) return k; return ''; }
/* 8 mục hồ sơ hộ vay (3.66 thêm Khả năng thu hồi) — mỗi mục: chọn nhanh (chip) + các ô + ghi thêm; lưu ngày cập nhật + lịch sử */
var TDN_MUC = [
  {k:'nguoiVay', ten:'👤 Người vay & hộ', chon:['Bình thường','Ốm đau / tai nạn','Đã chết','Mất tích','Bỏ khỏi địa phương','Đi làm ăn xa','Đang chấp hành án'],
    o:[['sdt','SĐT liên hệ'],['thanhVien','Thành viên hộ / số lao động']]},
  {k:'thuaKe', ten:'👪 Thừa kế / người trả nợ thay', chon:['Đồng ý trả thay','Chưa đồng ý','Chưa xác định được người thừa kế'],
    o:[['hoTen','Họ tên'],['quanHe','Quan hệ với người vay'],['sdt','SĐT'],['noiO','Nơi ở'],['giayTo','Giấy tờ kèm (chứng tử, xác nhận UBND xã…)']]},
  {k:'thucTrang', ten:'🏠 Thực trạng kinh tế', chon:['Có khả năng trả nợ','Khó khăn tạm thời','Không có khả năng trả nợ','Hộ nghèo','Hộ cận nghèo','Ốm đau dài ngày'],
    o:[['nghe','Nghề / nguồn thu nhập chính'],['thuNhap','Thu nhập ước tính / tháng']]},
  {k:'taiSan', ten:'💰 Tài sản', chon:['Đất ở','Đất sản xuất','Nhà','Vật nuôi','Phương tiện','Không có tài sản đáng kể'],
    o:[['giaTri','Tổng giá trị ước tính']]},
  {k:'suDungVon', ten:'🐄 Tình hình sử dụng vốn', chon:['Đúng mục đích','Sai mục đích một phần','Sai mục đích toàn bộ','Vốn còn','Đã bán','Chết / mất','Hư hỏng'],
    o:[['mucDich','Mục đích vay (đối tượng đầu tư)'],['conLai','Giá trị còn lại']]},
  {k:'nguyenNhan', ten:'❓ Nguyên nhân không trả được nợ', chon:['Thiên tai','Dịch bệnh vật nuôi / cây trồng','Ốm đau, tai nạn','Người vay chết / mất tích','Giá cả, thị trường','Sử dụng vốn sai mục đích','Làm ăn thua lỗ','Chây ỳ','Bỏ khỏi địa phương'],
    o:[]},
  {k:'khaNang', ten:'⚖ Khả năng thu hồi', mot:true, chon:['Có khả năng thu hồi','Khó thu hồi','Không còn khả năng thu hồi'], o:[]},   /* 3.66 (AI): chọn 1 — bỏ chọn = chưa đánh giá */
  {k:'phuongAn', ten:'🧭 Phương án đề xuất', chon:['Đôn đốc thu hồi','Người thừa kế trả thay','Gia hạn / điều chỉnh kỳ hạn','Đề nghị khoanh','Đề nghị xử lý rủi ro','Phối hợp chính quyền, Hội đoàn thể'],
    o:[['han','Hạn thực hiện']]}
];
var TDN_HINH_THUC = ['Đến nhà khách hàng','Mời lên điểm giao dịch / UBND xã','Họp Tổ TK&VV','Điện thoại / Zalo','Cùng Hội đoàn thể'];
var TDN_TRANG_THAI = ['Chưa làm việc','Đang làm việc','KH cam kết trả','Đã thu một phần','Đã thu hồi hết','Đề nghị gia hạn / điều chỉnh kỳ hạn','Đề nghị khoanh','Đề nghị xử lý rủi ro','KH vắng mặt / bỏ địa phương'];

/* ---------- lưu / nạp ---------- */
function napNo(){
  return docFile('tdn_du_lieu').then(function(s){
    if(s){ try{ var j = typeof s==='string' ? JSON.parse(s) : null; if(j) NO = tdnChuan(j); }catch(e){ console.warn('Không đọc được dữ liệu Theo dõi nợ', e); } }
    NO_SAN = true;
    if(typeof nganHienTai!=='undefined' && nganHienTai===3 && tvPhan()==='no') veGhiChu();
    if(typeof nganHienTai!=='undefined' && nganHienTai===0 && tdnViecCan().n) veHomNay();
  }).catch(function(){ NO_SAN = true; });
}
function tdnChuan(j){
  return {ho:j.ho||{}, mon:j.mon||{}, lan:j.lan||[], lanXoa:j.lanXoa||[], nhap:j.nhap||{}, toAp:j.toAp||{}, suaLuc:j.suaLuc||''};
}
var NO_HEN = null;
function luuNo(){
  /* 3.81: chưa nạp xong dữ liệu nợ trong máy thì không ghi (tránh ghi đè bằng dữ liệu trống) — đợi nạp xong rồi lưu */
  if(typeof NO_SAN!=='undefined' && !NO_SAN){ setTimeout(luuNo, 600); return Promise.resolve(false); }
  NO.suaLuc = new Date().toISOString();
  var p = luuFile('tdn_du_lieu', JSON.stringify(NO));
  if(coTheNoiDrive() && DR.sanSang){ clearTimeout(NO_HEN); NO_HEN = setTimeout(dayNoLenDrive, 5000); }
  return p;
}
function dayNoLenDrive(){
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){
    return timFileTrong('theodoino.json', idTM).then(function(cu){
      if(cu && !Object.keys(NO.mon||{}).length && !Object.keys(NO.ho||{}).length){ console.warn('Chặn ghi Theo dõi nợ trống lên Drive'); return null; }   /* 3.81 */
      return ghiJSONLenDrive('theodoino.json', idTM, {xuatLuc:new Date().toISOString(), may:maMayCua(), no:NO}, cu);
    });
  }).then(function(){ dayFileNoCho(); }).catch(function(e){ console.warn('Không đẩy được Theo dõi nợ', e); });
}
/* gộp dữ liệu máy khác: hộ / món / lần làm việc — bản sửa sau thắng; lần đã xóa thì bỏ */
function gopNo(r){
  var doi = 0;
  ['ho','mon'].forEach(function(k){
    Object.keys(r[k]||{}).forEach(function(id){
      var a = NO[k][id], b = r[k][id];
      if(!a || (b.suaLuc||'') > (a.suaLuc||'')){
        if(k==='mon' && a){   /* số liệu tháng: gộp cả hai, không mất tháng nào */
          Object.keys(a.loai||{}).forEach(function(L){ b.loai = b.loai||{}; b.loai[L] = b.loai[L]||{ky:{}}; Object.keys(a.loai[L].ky||{}).forEach(function(ky){ if(!b.loai[L].ky[ky]) b.loai[L].ky[ky] = a.loai[L].ky[ky]; }); });
        }
        NO[k][id] = b; doi++;
      }
    });
  });
  var xoa = {}; NO.lanXoa.concat(r.lanXoa||[]).forEach(function(x){ if(!xoa[x.id] || x.luc>xoa[x.id]) xoa[x.id] = x.luc; });
  NO.lanXoa = Object.keys(xoa).map(function(k){ return {id:k, luc:xoa[k]}; });
  var theo = {}; NO.lan.forEach(function(l){ theo[l.id] = l; });
  (r.lan||[]).forEach(function(l){ var c = theo[l.id]; if(!c || (l.suaLuc||'') > (c.suaLuc||'')){ theo[l.id] = l; doi++; } });
  NO.lan = Object.keys(theo).map(function(k){ return theo[k]; }).filter(function(l){ return !(xoa[l.id] && xoa[l.id] >= (l.suaLuc||'')); });
  Object.keys(r.nhap||{}).forEach(function(L){ var a = NO.nhap[L], b = r.nhap[L]; if(!a || (b.ky||'') > (a.ky||'') || ((b.ky===a.ky) && (b.luc||'') > (a.luc||''))){ NO.nhap[L] = b; doi++; } });
  Object.keys(r.toAp||{}).forEach(function(t){ if(!NO.toAp[t]) NO.toAp[t] = r.toAp[t]; });
  return doi;
}
function taiNoTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){ return timFileTrong('theodoino.json', idTM); })
  .then(function(f){
    if(!f){ if(Object.keys(NO.mon).length) dayNoLenDrive(); return null; }
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media');
  }).then(function(r){
    if(!r || !r.no) return 0;
    var n = gopNo(tdnChuan(r.no));
    if(n){ luuFile('tdn_du_lieu', JSON.stringify(NO)); if(nganHienTai===3 && tvPhan()==='no') veGhiChu(); }
    dayNoLenDrive();
    return n;
  }).catch(function(e){ console.warn('Không tải được Theo dõi nợ', e); return 0; });
}

/* ---------- tiện ích ---------- */
function tdnSo(v){ var n = typeof v==='number' ? v : parseFloat(String(v||'').replace(/[^\d.\-]/g,'')); return isFinite(n) ? n : 0; }
var TDN_MD = false;   /* 3.135: file đang đọc ghi ngày chữ kiểu tháng/ngày/năm (Mỹ) — slDocFile tự nhận rồi bật trong lúc đọc */
function tdnNgay(v){   /* ô ngày Excel: dd/mm/yyyy (hoặc mm/dd/yyyy khi TDN_MD) hoặc số serial → yyyy-mm-dd */
  if(v===''||v==null) return '';
  if(typeof v==='number' && v>20000 && v<80000){ var d = new Date(Math.round((v-25569)*864e5)); return d.getUTCFullYear()+'-'+hai(d.getUTCMonth()+1)+'-'+hai(d.getUTCDate()); }
  var m = String(v).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/); if(m) return TDN_MD ? m[3]+'-'+hai(+m[1])+'-'+hai(+m[2]) : m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  m = String(v).trim().match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[0] : '';
}
function tdnTien(n){ return Math.round(n||0).toLocaleString('vi-VN').replace(/,/g,'.'); }
function tdnTr(n){ n = n||0; return n>=1e9 ? (n/1e9).toFixed(2).replace('.',',')+' tỷ' : (n>=1e6 ? (Math.round(n/1e5)/10).toString().replace('.',',')+' tr' : tdnTien(n)); }
function tdnKyVN(ky){ return ky ? ky.slice(5,7)+'/'+ky.slice(0,4) : ''; }
function tdnCuoiKy(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7); return ky+'-'+hai(new Date(y, m, 0).getDate()); }
function tdnSoNgay(a, b){ if(!a||!b) return 0; return Math.round((Date.UTC(+b.slice(0,4),+b.slice(5,7)-1,+b.slice(8,10)) - Date.UTC(+a.slice(0,4),+a.slice(5,7)-1,+a.slice(8,10)))/864e5); }
function tdnHoi(dvut){ return TDN_DVUT[String(dvut||'').trim()] || (dvut ? 'ĐVUT '+dvut : ''); }
function tdnCT(m){ var c = TDN_CT[String(m.ct||'')]; return m.ctTen || (c ? c[0] : (m.ct||'')); }
function tdnCTDai(m){ var c = TDN_CT[String(m.ct||'')]; return m.ctDai || (c ? c[1] : tdnCT(m)); }
/* địa bàn theo mã (danh mục Cài đặt › Địa bàn) */
function tdnDiaBan(maXa, maDiem, maAp){
  var ra = {xa:'', diem:'', ap:''};
  (D.cauHinh.diaBan||[]).forEach(function(x){
    if(maXa && String(x.ma)===String(maXa)) ra.xa = x.xa;
    (x.diem||[]).forEach(function(z){
      if(maDiem && String(z.ma)===String(maDiem)){ ra.diem = z.ten; if(!ra.xa) ra.xa = x.xa; }
      (z.ap||[]).forEach(function(a){ if(maAp && String(a.ma)===String(maAp)){ ra.ap = a.ten; if(!ra.diem) ra.diem = z.ten; if(!ra.xa) ra.xa = x.xa; } });
    });
  });
  return ra;
}
function tdnDB(m){
  var h = NO.ho[m.maKH]||{}, maAp = m.maAp || NO.toAp[m.maTo] || h.maAp || '';
  var db = tdnDiaBan(m.maXa || (maAp ? String(maAp).slice(0,6) : ''), m.maDiem, maAp);
  return {xa:db.xa || m.tenXa || '(chưa rõ xã)', diem:db.diem || m.tenDiem || '(chưa rõ điểm)', ap:db.ap || (maAp ? 'Ấp '+maAp : 'Chưa rõ ấp'), maAp:maAp,
    to:m.toTen ? m.toTen : (m.maTo||''), maTo:m.maTo||''};
}
function tdnApCau(ap){ ap = String(ap||''); return /^(ấp|khu phố|kp|thôn|tổ)\b/i.test(ap) ? ap.charAt(0).toLowerCase()+ap.slice(1) : 'ấp '+ap; }
function tdnXaCau(xa){ return String(xa||'').replace(/^Phường /,'phường ').replace(/^Xã /,'xã '); }
function tdnKyMoi(L){ return (NO.nhap[L]||{}).ky || ''; }
function tdnSL(m, L, ky){ var x = m.loai && m.loai[L]; return x && x.ky ? x.ky[ky || tdnKyMoi(L)] : null; }
function tdnCacKy(m, L){ var x = m.loai && m.loai[L]; return x && x.ky ? Object.keys(x.ky).sort() : []; }
function tdnDangCo(m, L){ return !!tdnSL(m, L); }
function tdnSoChinh(L, s){ return !s ? 0 : L==='khd' ? s.dn : L==='nqh' ? s.qh : s.kh; }
/* phát sinh lại: số lần món quay lại danh sách sau khi đã ra khỏi */
function tdnPhatSinhLai(m, L){
  var ds = tdnCacKy(m, L), n = 0;
  for(var i=1;i<ds.length;i++){ if(tdnThangSau(ds[i-1])!==ds[i]) n++; }
  return n;
}
function tdnThangSau(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7)+1; if(m>12){ m = 1; y++; } return y+'-'+hai(m); }
function tdnThangTruoc(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7)-1; if(m<1){ m = 12; y--; } return y+'-'+hai(m); }
function tdnLanCua(kuoc, L){ return NO.lan.filter(function(l){ return l.kuoc===kuoc && (!L || l.loai===L); }).sort(function(a,b){ return (b.ngay||'').localeCompare(a.ngay||'') || (b.taoLuc||'').localeCompare(a.taoLuc||''); }); }
function tdnTrangThai(kuoc, L){ var l = tdnLanCua(kuoc, L)[0]; return l ? (l.trangThai||'Đang làm việc') : 'Chưa làm việc'; }

/* ---------- ĐỌC FILE SAO KÊ THÁNG ---------- */
var TDN_COT = {   /* tên cột trong file hệ thống → trường */
  maKH:['Mã khách hàng'], ten:['Tên khách hàng'], kuoc:['Số khế ước'], maTo:['Mã tổ'], toTen:['Tên tổ trưởng'],
  maAp:['Mã thôn/ấp','Thôn'], maDiem:['Mã điểm GDX','Mã điểm GD','Điểm GDXA'], tenDiem:['Tên điểm GDX','Tên điểm GD','Tên điểm GDXA'],
  maXa:['Mã xã'], tenXa:['Tên xã'], dvut:['ĐVUT'], ct:['Chương trình'], ctTen:['Chương trình VT'], ctDai:['Tên chương trình','Tên Chương trình'],
  ngayBC:['Ngày báo cáo'], ngayGDX:['Ngày GDXA'],
  /* 3T KHD */ dn:['Tổng dư nợ'], th:['Dư nợ trong hạn'], qhK:['Dư nợ quá hạn'], khK:['Dư nợ khoanh'], ngd:['Ngày giao dịch gần nhất'], lt:['Lãi tồn'], ldt:['Lãi đã thu'],
  nv:['Ngày giải ngân đầu tiên'], dk:['Ngày đăng ký khoản vay'], dh:['Ngày đến hạn gốc'], dhgh:['Ngày đến hạn GH'], dhgd:['Ngày đến hạn GDXA'], sp:['Mã sản phẩm'],
  /* quá hạn */ cqh:['Chuyển QH trong tháng'], ncq:['Ngày chuyển quá hạn'], tk105:['Số dư 105'],
  /* khoanh */ nhl:['Ngày hiệu lực'], nhh:['Ngày hết hạn khoanh'], nn:['Nguyên nhân']
};
function tdnDocFile(bl, tenFile){
  if(!window.XLSX) return Promise.reject(new Error('Chưa tải được bộ đọc Excel — có mạng một lần rồi thử lại.'));
  return bl.arrayBuffer().then(function(ab){
    var wb = XLSX.read(new Uint8Array(ab), {type:'array'});
    var ten = wb.SheetNames.slice().sort(function(a,b){ return (b==='BCQUERY')-(a==='BCQUERY'); });
    for(var s=0;s<ten.length;s++){
      var a = XLSX.utils.sheet_to_json(wb.Sheets[ten[s]], {header:1, defval:'', raw:true});
      for(var r=0;r<Math.min(25, a.length);r++){
        var dong = a[r].map(function(x){ return String(x).trim(); });
        if(dong.indexOf('Số khế ước')>=0 && (dong.indexOf('Mã khách hàng')>=0 || dong.indexOf('Tên khách hàng')>=0)) return tdnPhanTich(a, r, tenFile, a.slice(0, r).map(function(x){ return x.join(' '); }).join(' '));
      }
    }
    throw new Error('Không thấy bảng có cột "Số khế ước" — file này không phải sao kê 3 tháng KHD / nợ quá hạn / nợ khoanh.');
  });
}
function tdnPhanTich(a, r, tenFile, tieuDe){
  var dau = a[r].map(function(x){ return String(x).trim(); }), cot = {};
  Object.keys(TDN_COT).forEach(function(k){ for(var i=0;i<TDN_COT[k].length;i++){ var j = dau.indexOf(TDN_COT[k][i]); if(j>=0){ cot[k] = j; break; } } });
  var co = function(t){ return dau.indexOf(t)>=0; };
  var loai = (co('Dư nợ khoanh') && co('Ngày hết hạn khoanh')) ? 'nk'
    : (co('Ngày chuyển quá hạn') || co('Chuyển QH trong tháng')) ? 'nqh'
    : (co('Ngày giao dịch gần nhất') && co('Tổng dư nợ')) ? 'khd' : '';
  if(!loai) throw new Error('Không nhận ra loại danh sách (cần cột của sao kê 3 tháng KHD, nợ quá hạn hoặc nợ khoanh).');
  if(loai==='khd'){ cot.qh = cot.qhK; cot.kh = cot.khK; }
  if(loai==='nqh'){ cot.qh = dau.indexOf('Dư nợ quá hạn'); }
  if(loai==='nk'){ cot.kh = dau.indexOf('Dư nợ khoanh'); }
  var g = function(row, k){ return cot[k]===undefined || cot[k]<0 ? '' : row[cot[k]]; };
  var ds = [], ky = '';
  a.slice(r+1).forEach(function(row){
    var kuoc = String(g(row,'kuoc')||'').trim(); if(!/^\d{6,}$/.test(kuoc)) return;
    var x = {kuoc:kuoc, maKH:String(g(row,'maKH')||'').trim(), ten:String(g(row,'ten')||'').trim(), maTo:String(g(row,'maTo')||'').trim(), toTen:String(g(row,'toTen')||'').trim(),
      maAp:String(g(row,'maAp')||'').trim(), maDiem:String(g(row,'maDiem')||'').trim(), tenDiem:String(g(row,'tenDiem')||'').trim(),
      maXa:String(g(row,'maXa')||'').trim(), tenXa:String(g(row,'tenXa')||'').trim(), dvut:String(g(row,'dvut')||'').trim(),
      ct:String(g(row,'ct')||'').trim(), ctTen:String(g(row,'ctTen')||'').trim(), ctDai:String(g(row,'ctDai')||'').trim()};
    var s = {};
    if(loai==='khd'){ s.dn = tdnSo(g(row,'dn')); s.th = tdnSo(g(row,'th')); s.qh = tdnSo(g(row,'qh')); s.kh = tdnSo(g(row,'kh')); s.ngd = tdnNgay(g(row,'ngd')); s.lt = tdnSo(g(row,'lt')); s.ldt = tdnSo(g(row,'ldt'));
      s.nv = tdnNgay(g(row,'nv')); s.dk = tdnNgay(g(row,'dk')); s.dh = tdnNgay(g(row,'dh')); s.dhgh = tdnNgay(g(row,'dhgh')); s.dhgd = tdnNgay(g(row,'dhgd')); s.sp = String(g(row,'sp')||''); }
    if(loai==='nqh'){ s.qh = tdnSo(g(row,'qh')); s.cqh = tdnSo(g(row,'cqh')); s.ncq = tdnNgay(g(row,'ncq')); s.tk105 = tdnSo(g(row,'tk105')); var nb = tdnNgay(g(row,'ngayBC')); if(nb && nb.slice(0,7) > ky) ky = nb.slice(0,7); }
    if(loai==='nk'){ s.kh = tdnSo(g(row,'kh')); s.nhl = tdnNgay(g(row,'nhl')); s.nhh = tdnNgay(g(row,'nhh')); s.nn = String(g(row,'nn')||'').trim(); }
    x.s = s; ds.push(x);
  });
  if(!ky) ky = tdnKyTuChu(tenFile) || tdnKyTuChu(tieuDe);
  return {loai:loai, ky:ky, ds:ds, tenFile:tenFile||''};
}
/* kỳ từ tên file / tiêu đề: 2026-08-31 · 31-08-2026 · 31_08_2026 · "ĐẾN NGÀY 31/08/2026" */
function tdnKyTuChu(t){
  t = String(t||'');
  var m = t.match(/(20\d\d)[\-_.](\d{2})[\-_.](\d{2})/); if(m) return m[1]+'-'+m[2];
  m = t.match(/(\d{1,2})[\-_.\/](\d{1,2})[\-_.\/](20\d\d)/); if(m) return m[3]+'-'+hai(+m[2]);
  return '';
}
/* so với dữ liệu đang có → xem trước */
function tdnSoSanh(kq){
  var L = kq.loai, ky = kq.ky, truoc = tdnThangTruoc(ky), co = {}, ra = {moi:[], lai:[], tang:[], giam:[], giu:[], ra:[], tong:0};
  kq.ds.forEach(function(x){
    co[x.kuoc] = 1; ra.tong += tdnSoChinh(L, x.s);
    var m = NO.mon[x.kuoc], cacKy = m ? tdnCacKy(m, L) : [];
    if(!cacKy.length) return ra.moi.push(x);
    var truocDo = cacKy.filter(function(k){ return k<ky; });
    if(truocDo.length && truocDo[truocDo.length-1]!==truoc && !(m.loai[L].ky[ky])) return ra.lai.push(x);
    var cu = truocDo.length ? m.loai[L].ky[truocDo[truocDo.length-1]] : null, a = tdnSoChinh(L, cu), b = tdnSoChinh(L, x.s);
    if(!cu) ra.giu.push(x); else if(b>a) ra.tang.push(x); else if(b<a) ra.giam.push(x); else ra.giu.push(x);
  });
  /* món có ở tháng liền trước (hoặc đang có ở kỳ mới nhất) mà file này không có → ra khỏi DS */
  Object.keys(NO.mon).forEach(function(k){
    var m = NO.mon[k]; if(co[k]) return;
    if(tdnSL(m, L, truoc) || (ky===tdnKyMoi(L) && tdnSL(m, L, ky))) ra.ra.push(m);
  });
  return ra;
}
function tdnChonFile(){
  var tu = (D.duLieu||[]).filter(function(m){ return ['NQH','NK','3TKHD','SK_NQH','SK_NK'].indexOf(m.maLoai)>=0 && /\.(xlsx|xls|xlsm)$/i.test(m.tenMoi||m.tenCu||''); })
    .sort(function(a,b){ return (b.ky||'').localeCompare(a.ky||''); }).slice(0, 12);
  moHop('<div class="hop-tit">📥 Cập nhật danh sách tháng</div>'+
    '<div class="hop-phu">Chọn file sao kê xuất từ hệ thống (3 tháng KHD, nợ quá hạn hoặc nợ khoanh). App tự nhận loại và kỳ, cho anh <b>xem trước</b> rồi mới ghi. Món không còn trong danh sách <b>không bị xóa</b> — thông tin đã bổ sung giữ nguyên.</div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="tdnChonTuMay()">📂 Chọn file trên máy…</button></div>'+
    (tu.length ? '<div class="nhan-nhom" style="margin-top:10px">Hoặc file đã lưu ở tab Tháng</div>'+tu.map(function(m){
      return '<div class="dk-dong" style="cursor:pointer" onclick="tdnDocTuMuc(\''+m.id+'\')"><span>📊</span><div class="dk-ten"><b>'+coChuHTML(m.tenMoi||m.tenCu)+'</b><small>'+coChuHTML(kyVN(m.ky)||'')+' · '+coChuHTML(m.tenLoai||m.maLoai)+'</small></div></div>'; }).join('') : '')+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>', true);
}
function tdnChonTuMay(){
  var i = document.createElement('input'); i.type = 'file'; i.accept = '.xlsx,.xls,.xlsm'; i.multiple = true;
  i.onchange = function(){ var fs = Array.prototype.slice.call(i.files); if(fs.length) tdnDocNhieu(fs.map(function(f){ return {b:f, ten:f.name}; })); };
  i.click();
}
function tdnDocTuMuc(id){
  var m = timMuc(id); if(!m) return;
  layNoiDung(m).then(function(b){ if(!b) return baoLoi('File này chưa có trong máy — nối Drive để tải về rồi thử lại.'); tdnDocNhieu([{b:b, ten:m.tenCu||m.tenMoi}]); });
}
var TDN_CHO = [];
function tdnDocNhieu(ds){
  bao('Đang đọc '+ds.length+' file…', 3);
  Promise.all(ds.map(function(x){ return tdnDocFile(x.b, x.ten).then(function(k){ return k; }, function(e){ return {loi:e.message||String(e), tenFile:x.ten}; }); }))
  .then(function(kq){ TDN_CHO = kq; tdnXemTruoc(); });
}
function tdnXemTruoc(){
  var loi = TDN_CHO.filter(function(k){ return k.loi; }), ok = TDN_CHO.filter(function(k){ return !k.loi; });
  var h = '<div class="hop-tit">📥 Xem trước khi cập nhật</div>';
  loi.forEach(function(k){ h += '<div class="hs-loi">⚠ '+coChuHTML(k.tenFile)+': '+coChuHTML(k.loi)+'</div>'; });
  ok.forEach(function(k, i){
    var T = TDN_LOAI[k.loai], ss = k.ky ? tdnSoSanh(k) : null, moi = tdnKyMoi(k.loai);
    h += '<div class="tdn-xt"><div class="tdn-xt-dau">'+T.ico+' <b>'+T.dai+'</b> · '+coChuHTML(k.tenFile)+'</div>'+
      '<div class="o" style="display:flex;gap:8px;align-items:center;margin:4px 0"><label style="margin:0">Kỳ (tháng)</label><input id="tdn-ky-'+i+'" value="'+(k.ky?tdnKyVN(k.ky):'')+'" placeholder="mm/yyyy" style="width:110px" onchange="tdnDoiKy('+i+',this.value)"></div>'+
      (!k.ky ? '<div class="hs-loi">⚠ Không đọc được kỳ trong file — gõ tháng (vd 08/2026).</div>' :
        (moi && k.ky<moi ? '<div class="hs-loi">⚠ File kỳ '+tdnKyVN(k.ky)+' cũ hơn kỳ đã nhập ('+tdnKyVN(moi)+') — chỉ bổ sung lịch sử, không đổi danh sách đang theo dõi.</div>' : '')+
        (moi && k.ky===moi ? '<div class="huong-dan">Kỳ '+tdnKyVN(k.ky)+' đã nhập trước đây — lần này <b>thay số liệu</b> của kỳ đó (không nhân đôi).</div>' : '')+
        '<div class="tdn-xt-so">'+k.ds.length+' món · '+tdnTr(ss.tong)+'</div>'+
        '<div class="tdn-xt-ds"><span class="tg ct">+ '+ss.moi.length+' món mới</span><span class="tg phu">↻ '+ss.lai.length+' phát sinh lại</span>'+
        '<span class="tg">↑ '+ss.tang.length+' tăng</span><span class="tg">↓ '+ss.giam.length+' giảm</span><span class="tg xam">= '+ss.giu.length+' giữ nguyên</span>'+
        '<span class="tg xam">⇥ '+ss.ra.length+' ra khỏi DS</span></div>')+'</div>';
  });
  h += '<div class="hang-nut" style="margin-top:12px"><button class="nho" onclick="dongHop()">Thôi (Esc)</button>'+
    (ok.length ? '<button class="nho chinh" onclick="tdnGhi()">✓ Cập nhật '+ok.length+' danh sách</button>' : '')+'</div>';
  moHop(h, true);
}
function tdnDoiKy(i, v){
  var m = String(v||'').match(/(\d{1,2})\s*[\/\-.]\s*(\d{4})/); var k = TDN_CHO.filter(function(x){ return !x.loi; })[i];
  if(!k) return; k.ky = m ? m[2]+'-'+hai(+m[1]) : ''; tdnXemTruoc();
}
function tdnGhi(){
  var ok = TDN_CHO.filter(function(k){ return !k.loi; });
  if(ok.some(function(k){ return !k.ky; })) return baoLoi('Còn file chưa có kỳ — gõ tháng rồi bấm lại.');
  var now = new Date().toISOString(), tong = 0;
  ok.forEach(function(k){
    var L = k.loai, co = {};
    k.ds.forEach(function(x){
      co[x.kuoc] = 1; tong++;
      var m = NO.mon[x.kuoc] || (NO.mon[x.kuoc] = {kuoc:x.kuoc, loai:{}, taoLuc:now});
      ['maKH','ten','maTo','toTen','maAp','maDiem','tenDiem','maXa','tenXa','dvut','ct','ctTen','ctDai'].forEach(function(f){ if(x[f]) m[f] = x[f]; });
      m.loai[L] = m.loai[L] || {ky:{}};
      m.loai[L].ky[k.ky] = x.s; m.suaLuc = now;
      if(x.maTo && x.maAp) NO.toAp[x.maTo] = x.maAp;
      var h = NO.ho[x.maKH] || (NO.ho[x.maKH] = {ma:x.maKH, tt:{}, ls:[], file:[], taoLuc:now});
      h.ten = x.ten || h.ten; if(x.maAp) h.maAp = x.maAp; h.suaLuc = h.suaLuc || now;
    });
    /* nhập lại cùng kỳ: món không còn trong file thì bỏ số liệu kỳ đó (file thay thế), thông tin khác giữ nguyên */
    Object.keys(NO.mon).forEach(function(kk){ var m = NO.mon[kk]; if(!co[kk] && m.loai[L] && m.loai[L].ky[k.ky]){ delete m.loai[L].ky[k.ky]; m.suaLuc = now; } });
    if(!NO.nhap[L] || k.ky >= NO.nhap[L].ky) NO.nhap[L] = {ky:k.ky, luc:now, ten:k.tenFile, so:k.ds.length};
    TDN.loai = L;
  });
  luuNo().then(function(){ dongHop(); TDN.mo = ''; veGhiChu(); bao('Đã cập nhật '+ok.length+' danh sách ('+tong+' món). Thông tin bổ sung, nhật ký giữ nguyên.', 6); });
}

/* ---------- GIAO DIỆN: danh sách + cây ---------- */
function tdnDSLoai(L){
  var ky = tdnKyMoi(L), q = boDau(TDN.tim||'').trim(), tu = q ? q.split(/\s+/) : [];
  return Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).filter(function(m){
    if(!(m.loai && m.loai[L] && Object.keys(m.loai[L].ky||{}).length)) return false;
    var dang = !!(ky && m.loai[L].ky[ky]);
    if(TDN.loc==='dang' && !dang) return false;
    if(TDN.loc==='ra' && dang) return false;
    if(tu.length){ var t = boDau([m.ten, m.maKH, m.kuoc, m.toTen, tdnDB(m).ap].join(' ')); if(!tu.every(function(w){ return t.indexOf(w)>=0; })) return false; }
    if(TDN.cay){ var db = tdnDB(m), C = TDN.cay;
      if(C.xa && db.xa!==C.xa) return false; if(C.diem && db.diem!==C.diem) return false; if(C.ap && db.ap!==C.ap) return false; if(C.to && db.maTo!==C.to) return false; }
    return true;
  });
}
function tdnNhom(L, ds){   /* nhóm + xếp theo nghiệp vụ từng loại */
  var ky = tdnKyMoi(L), cuoi = ky ? tdnCuoiKy(ky) : ngayISO(nay()), g = {};
  var them = function(k, m, khoa){ (g[k] = g[k]||[]).push([m, khoa]); };
  ds.forEach(function(m){
    var s = tdnSL(m, L);
    if(!s){ var cc = tdnCacKy(m, L); them('⇥ Đã ra khỏi danh sách', m, '-'+cc[cc.length-1]); return; }
    if(L==='khd'){ var th = s.ngd ? Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44) : 99;
      them(th>12 ? 'Không giao dịch trên 12 tháng' : th>6 ? 'Không giao dịch 6–12 tháng' : 'Không giao dịch 3–6 tháng', m, -th); }
    else if(L==='nqh'){ var nqh = s.ncq ? tdnSoNgay(s.ncq, cuoi) : 9999;
      them(s.cqh>0 ? '🆕 Mới phát sinh tháng này' : nqh>180 ? 'Quá hạn trên 6 tháng' : 'Quá hạn đến 6 tháng', m, -nqh); }
    else { var con = s.nhh ? tdnSoNgay(cuoi, s.nhh) : 9999;
      them(con<0 ? 'Đã quá thời hạn khoanh' : con<=183 ? '⏰ Sắp hết hạn khoanh (≤ 6 tháng)' : 'Còn thời hạn khoanh', m, con); }
  });
  var thu = L==='khd' ? ['Không giao dịch trên 12 tháng','Không giao dịch 6–12 tháng','Không giao dịch 3–6 tháng']
    : L==='nqh' ? ['🆕 Mới phát sinh tháng này','Quá hạn trên 6 tháng','Quá hạn đến 6 tháng'] : ['Đã quá thời hạn khoanh','⏰ Sắp hết hạn khoanh (≤ 6 tháng)','Còn thời hạn khoanh'];
  thu.push('⇥ Đã ra khỏi danh sách');
  return thu.filter(function(k){ return g[k]; }).map(function(k){ return {ten:k, ds:g[k].sort(function(a,b){ return a[1]<b[1]?-1:a[1]>b[1]?1:0; }).map(function(x){ return x[0]; })}; });
}
function tdnDongHTML(m, L){
  var s = tdnSL(m, L), db = tdnDB(m), ky = tdnKyMoi(L), cuoi = ky ? tdnCuoiKy(ky) : '', chip = [];
  var cc = tdnCacKy(m, L), sCuoi = s || m.loai[L].ky[cc[cc.length-1]];
  if(L==='khd' && s){ var th = s.ngd ? Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44) : 0; chip.push(['do', (s.ngd?th+' tháng không GD':'chưa có ngày GD')]);
    if(s.lt) chip.push(['', 'lãi tồn '+tdnTr(s.lt)]); var dh = s.dhgd||s.dh; if(dh && tdnSoNgay(cuoi, dh)<=92) chip.push(['vg', (tdnSoNgay(cuoi, dh)<0?'đã đến hạn ':'sắp đến hạn ')+ngayVN(dh)]); }
  if(L==='nqh' && s){ chip.push(['do', (s.cqh>0?'🆕 ':'')+'QH '+(s.ncq? tdnSoNgay(s.ncq, cuoi)+' ngày':'')]); if(s.tk105) chip.push(['', 'TK105 '+tdnTr(s.tk105)]); }
  if(L==='nk' && s){ var con = s.nhh ? tdnSoNgay(cuoi, s.nhh) : null; chip.push([con!=null && con<=183 ? 'vg' : '', 'hết hạn khoanh '+ngayVN(s.nhh)]); }
  if(!s) chip.push(['xam', 'ra khỏi DS từ '+tdnKyVN(tdnThangSau(cc[cc.length-1]))]);
  chip.push(['', tdnCT(m)]); if(m.dvut) chip.push(['', tdnHoi(m.dvut)]);
  var psl = tdnPhatSinhLai(m, L); if(psl) chip.push(['vg', '↻ phát sinh lại '+(psl>1?'lần '+(psl+1):'')]);
  if(s && cc.length>1){ var i = cc.indexOf(ky), tr = i>0 ? m.loai[L].ky[cc[i-1]] : null; if(tr && cc[i-1]===tdnThangTruoc(ky)){ var d = tdnSoChinh(L, s)-tdnSoChinh(L, tr); if(d) chip.push(['', (d>0?'↑ tăng ':'↓ giảm ')+tdnTr(Math.abs(d))]); } }
  var khac = ['khd','nqh','nk'].filter(function(x){ return x!==L && tdnDangCo(m, x); }); if(khac.length) chip.push(['', '↔ cũng trong DS '+khac.map(function(x){ return TDN_LOAI[x].ten; }).join(', ')]);
  var tt = tdnTrangThai(m.kuoc, L), l0 = tdnLanCua(m.kuoc, L)[0];
  var cho = l0 ? tdnSoNgay(l0.ngay, ngayISO(nay())) : null;
  chip.push([tt==='Chưa làm việc' ? 'vg' : 'xa', tt+(l0?' · '+ngayVN(l0.ngay):'')]);
  if(s && l0 && cho>30) chip.push(['vg', '⚠ '+cho+' ngày chưa làm việc']);
  return '<div class="d2 tdn-d'+(TDN.mo===m.kuoc?' chon':'')+'" onclick="tdnMo(\''+m.kuoc+'\')">'+
    '<div class="h1"><span class="ten">'+coChuHTML(m.ten||m.maKH)+'</span><span class="ty">'+coChuHTML(db.ap+' · Tổ '+(m.toTen||m.maTo))+'</span>'+
    '<span class="sc-ngay tdn-tien">'+tdnTien(tdnSoChinh(L, sCuoi))+'</span></div>'+
    '<div class="h2 sc-tt">'+chip.map(function(c){ return '<span class="tg '+(c[0]==='do'?'phu tdn-do':c[0]==='vg'?'phu':c[0]==='xa'?'ct':c[0])+'">'+coChuHTML(c[1])+'</span>'; }).join('')+'</div></div>';
}
function tdnCayHTML(L, ds){
  var cay = {}, C = TDN.cay||{};
  ds.forEach(function(m){ var db = tdnDB(m), v = tdnSoChinh(L, tdnSL(m, L));
    var x = cay[db.xa] = cay[db.xa]||{n:0,t:0,con:{}}; x.n++; x.t+=v;
    var d = x.con[db.diem] = x.con[db.diem]||{n:0,t:0,con:{}}; d.n++; d.t+=v;
    var a = d.con[db.ap] = d.con[db.ap]||{n:0,t:0,con:{}}; a.n++; a.t+=v;
    var t = a.con[db.maTo] = a.con[db.maTo]||{n:0,t:0,ten:m.toTen}; t.n++; t.t+=v; });
  var nut = function(nhan, loc, o, bat){ return '<span class="cay-nut'+(bat?' bat':'')+'" onclick="event.preventDefault();event.stopPropagation();TDN.cay='+coChuHTML(JSON.stringify(loc)).replace(/"/g,'&quot;')+';veGhiChu()">'+coChuHTML(nhan)+' <small>'+o.n+' · '+tdnTr(o.t)+'</small></span>'; };
  var h = '<div class="sc-cay">'+(TDN.cay ? '<div class="sc-loc-cay">Đang lọc: '+coChuHTML([C.xa,C.diem,C.ap,C.to?'Tổ '+C.to:''].filter(Boolean).join(' › '))+' <span class="xoa-loc" onclick="TDN.cay=null;veGhiChu()">bỏ lọc</span></div>' : '');
  Object.keys(cay).sort().forEach(function(xa){ var X = cay[xa];
    h += '<details'+(C.xa===xa?' open':'')+'><summary>'+nut('🏘 '+xa, {xa:xa}, X, C.xa===xa && !C.diem)+'</summary><div class="c2">';
    Object.keys(X.con).sort().forEach(function(dm){ var Dm = X.con[dm];
      h += '<details'+(C.diem===dm?' open':'')+'><summary>'+nut('📍 '+dm, {xa:xa, diem:dm}, Dm, C.diem===dm && !C.ap)+'</summary><div class="c3">';
      Object.keys(Dm.con).sort().forEach(function(ap){ var A = Dm.con[ap];
        h += '<details'+(C.ap===ap?' open':'')+'><summary>'+nut('🏠 '+ap, {xa:xa, diem:dm, ap:ap}, A, C.ap===ap && !C.to)+'</summary><div class="c4">'+
          Object.keys(A.con).sort().map(function(t){ return nut('👥 '+(A.con[t].ten||t), {xa:xa, diem:dm, ap:ap, to:t}, A.con[t], C.to===t); }).join('')+'</div></details>';
      });
      h += '</div></details>';
    });
    h += '</div></details>';
  });
  return h+'</div>';
}
function veTheoDoiNo(){
  if(!NO_SAN) return '<div class="rong">Đang mở dữ liệu Theo dõi nợ…</div>';
  if(TDN.mo && NO.mon[TDN.mo]) return tdnTheHTML(NO.mon[TDN.mo], TDN.loai);
  TDN.mo = '';
  var L = TDN.loai;
  var o = function(k){ var T = TDN_LOAI[k], ky = tdnKyMoi(k), dang = Object.keys(NO.mon).map(function(x){ return NO.mon[x]; }).filter(function(m){ return tdnDangCo(m, k); });
    var t = dang.reduce(function(a, m){ return a+tdnSoChinh(k, tdnSL(m, k)); }, 0), phu = '';
    if(k==='nqh') phu = dang.filter(function(m){ return tdnSL(m, k).cqh>0; }).length+' mới';
    if(k==='nk') phu = dang.filter(function(m){ var s = tdnSL(m, k); return s.nhh && tdnSoNgay(tdnCuoiKy(ky), s.nhh)<=183; }).length+' sắp hết hạn';
    if(k==='khd') phu = dang.filter(function(m){ var s = tdnSL(m, k); return !s.ngd || Math.floor(tdnSoNgay(s.ngd, tdnCuoiKy(ky))/30.44)>12; }).length+' trên 12 tháng';
    return '<button class="tdn-o'+(L===k?' bat':'')+' tdn-'+k+'" onclick="TDN.loai=\''+k+'\';TDN.cay=null;veGhiChu()"><b>'+T.ico+' '+T.ten+'</b>'+
      '<small>'+(ky ? dang.length+' món · '+tdnTr(t)+' · '+phu+' · kỳ '+tdnKyVN(ky) : 'chưa nhập danh sách')+'</small></button>'; };
  var ds = tdnDSLoai(L), h = '<div class="tdn-3">'+o('khd')+o('nqh')+o('nk')+'</div>';
  h += '<div class="tdn-thanh"><button class="nho chinh" onclick="tdnChonFile()">📥 Cập nhật tháng</button>'+
    '<span class="tdn-seg">'+[['dang','Đang có'],['ra','Đã ra khỏi DS'],['tat','Tất cả']].map(function(x){ return '<button class="'+(TDN.loc===x[0]?'bat':'')+'" onclick="TDN.loc=\''+x[0]+'\';veGhiChu()">'+x[1]+'</button>'; }).join('')+'</span>'+
    '<span class="tdn-seg">'+[['ds','☰ Danh sách'],['cay','🌳 Cây địa bàn']].map(function(x){ return '<button class="'+(TDN.xem===x[0]?'bat':'')+'" onclick="TDN.xem=\''+x[0]+'\';veGhiChu()">'+x[1]+'</button>'; }).join('')+'</span>'+
    (Object.keys(NO.nhap).length ? '<button class="nho" onclick="tdnInDS()" title="Danh sách chi tiết theo lọc đang xem · Tổng hợp theo xã, điểm GD — in hoặc xuất Excel">🖨 Danh sách</button>' : '')+
    (tdnKyMoi(L) && ds.length ? '<button class="nho" onclick="tdnPhieuNhanh()" title="In phiếu thông tin cho các món đang hiện (theo lọc, nhánh cây, ô tìm)">🧾 In phiếu ('+ds.length+')</button>' : '')+
    '<input class="tdn-tim" id="tdn-tim" value="'+coChuHTML(TDN.tim||'')+'" placeholder="Tìm tên, mã KH, số khế ước…" oninput="TDN.tim=this.value;tdnVeDS()"></div>';
  h += '<div id="tdn-ds">'+tdnDSHTML(L, ds)+'</div>';
  return h;
}
function tdnDSHTML(L, ds){
  if(!tdnKyMoi(L)) return '<div class="rong">Chưa có danh sách '+TDN_LOAI[L].dai.toLowerCase()+'.<br>Bấm <b>📥 Cập nhật tháng</b> để đọc file sao kê xuất từ hệ thống.</div>';
  var h = TDN.xem==='cay' ? tdnCayHTML(L, ds) : '';
  if(!ds.length) return h+'<div class="rong">Không có món nào khớp.</div>';
  tdnNhom(L, ds).forEach(function(g){
    var t = g.ds.reduce(function(a, m){ return a+tdnSoChinh(L, tdnSL(m, L)); }, 0);
    h += '<div class="nhan-nhom">'+coChuHTML(g.ten)+' · '+g.ds.length+' món'+(t?' · '+tdnTr(t):'')+'</div>'+g.ds.map(function(m){ return tdnDongHTML(m, L); }).join('');
  });
  return h;
}
function tdnVeDS(){ var e = document.getElementById('tdn-ds'); if(e) e.innerHTML = tdnDSHTML(TDN.loai, tdnDSLoai(TDN.loai)); }
function tdnMo(kuoc){ TDN.mo = kuoc; veGhiChu(); var t = document.getElementById('ds-gc'); if(t && t.scrollIntoView) window.scrollTo(0, 0); }

/* ==========================================================
   3.82 — 🏠 HỒ SƠ HỘ MỘT TRANG: gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab
   CCCD + hồ sơ scan (tab Scan) · Chữ ký·CCCD · Bộ hồ sơ · món vay + lần làm việc + hồ sơ hộ (Theo dõi nợ)
   Ghép theo TÊN (không dấu) + MÃ TỔ (nếu cả 2 bên có) — chỉ ĐỌC, không sửa / không gắn gì vào dữ liệu.
   ========================================================== */
function tenChuanHo(t){ return boDau(String(t||'')).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }
/* tên hộ có nằm trọn trong tên kia không (tên file scan hay kèm đuôi: "Vo Van Cuong Hdtd") */
function khopTenHo(tenHo, tenKhac){
  var a = tenChuanHo(tenHo), b = tenChuanHo(tenKhac);
  if(!a || !b) return false;
  if(a===b) return true;
  return a.split(' ').length>=2 && (' '+b+' ').indexOf(' '+a+' ')>=0;
}
function maToTu(s){ var m = String(s||'').match(/\d{5,}/); return m ? m[0] : ''; }
function thuThapHo(q){
  var mons = [], ten = q.ten||'', maTo = q.maTo||'', maKH = q.maKH||'';
  if(maKH) mons = Object.keys(NO.mon||{}).map(function(k){ return NO.mon[k]; }).filter(function(m){ return m.maKH===maKH; });
  else if(ten) mons = Object.keys(NO.mon||{}).map(function(k){ return NO.mon[k]; }).filter(function(m){
    return tenChuanHo(m.ten)===tenChuanHo(ten) && (!maTo || !m.maTo || m.maTo===maTo); });
  if(mons.length){ maKH = maKH || mons[0].maKH; ten = ten || mons[0].ten; maTo = maTo || mons[0].maTo || ''; }
  var hopTo = function(s){ var t = maToTu(s); return !maTo || !t || t===maTo; };
  var scan = (D.scan||[]).filter(function(k){ return khopTenHo(ten, k.ten) && hopTo(k.to); });
  var ka = (D.kyAnh||[]).filter(function(k){ return khopTenHo(ten, k.khach || k.ten); });
  var bo = (D.boHS||[]).filter(function(b){ return khopTenHo(ten, b.khach) && hopTo(b.to); });
  var ho = maKH ? (NO.ho||{})[maKH] : null;
  var lan = (NO.lan||[]).filter(function(l){ var m = NO.mon[l.kuoc]; return m && mons.indexOf(m)>=0; }).sort(function(a, b){ return String(b.ngay||'').localeCompare(String(a.ngay||'')); });
  var sc0 = scan.filter(function(k){ return k.xa || k.ap; })[0];
  var db = mons.length ? tdnDB(mons[0]) : (sc0 ? {xa:sc0.xa, diem:sc0.diem, ap:sc0.ap, to:sc0.to} : {});
  if(sc0 && /^\(chưa rõ|^Chưa rõ/.test(db.xa||'')) db = {xa:sc0.xa||db.xa, diem:sc0.diem||db.diem, ap:sc0.ap||db.ap, to:db.to||sc0.to};   /* sao kê chưa rõ địa bàn → lấy theo bản quét */
  return {ten:ten, maKH:maKH, maTo:maTo, mons:mons, scan:scan, ka:ka, bo:bo, ho:ho, lan:lan, db:db};
}
var HO1 = null;
function moHoSoHo(q){
  if(typeof q==='string') q = {maKH:q};
  var H = thuThapHo(q); HO1 = H;
  if(!H.ten) return bao('Không tìm thấy hộ này.', 3);
  var dong = function(ic, ten, phu, bam){ return '<div class="h1-dong"'+(bam?' onclick="'+bam+'"':'')+'><span>'+ic+'</span><div><b>'+ten+'</b>'+(phu?'<small>'+phu+'</small>':'')+'</div></div>'; };
  var dbChu = [H.db.xa, H.db.diem, H.db.ap, H.db.to ? 'Tổ '+H.db.to : ''].filter(Boolean).map(coChuHTML).join(' › ');
  var sdt = H.ho && H.ho.tt && H.ho.tt.nguoiVay && H.ho.tt.nguoiVay.sdt;
  var the = H.scan.filter(function(k){ return k.che!=='tailieu'; }), tl = H.scan.filter(function(k){ return k.che==='tailieu'; });
  var h = '<div class="hop-tit">🏠 Hồ sơ hộ · '+coChuHTML(H.ten)+'</div>'+
    '<div class="hop-phu">'+(dbChu || 'chưa rõ địa bàn')+(H.maKH ? ' · KH '+coChuHTML(H.maKH) : '')+(sdt ? ' · ☎ '+coChuHTML(sdt) : '')+'</div>'+
    '<div class="h1-luoi">';
  /* cột trái: giấy tờ */
  h += '<div class="h1-cot"><div class="nhan-nhom">🪪 CCCD ('+the.length+')</div>'+
    (the.length ? '<div class="h1-the">'+the.map(function(k){ return '<figure onclick="dongHop();xemScanCP(\''+k.id+'\')" title="Xem bản quét"><img id="h1a-'+k.id+'" alt=""><figcaption>'+coChuHTML(k.ten||'')+' · '+ngayVN(mocScan(k).slice(0,10))+'</figcaption></figure>'; }).join('')+'</div>'
      : '<div class="huong-dan">Chưa thấy bản quét CCCD trùng tên.</div>')+
    '<div class="nhan-nhom">📑 Hồ sơ đã quét ('+tl.length+')</div>'+
    (tl.length ? tl.map(function(k){ return dong('📑', coChuHTML(k.ten||'(bản quét)'), ((k.trang||[]).length ? (k.trang||[]).length+' trang' : (k.driveId?'☁ PDF trên Drive':''))+' · '+ngayVN(mocScan(k).slice(0,10)), 'dongHop();xemScanCP(\''+k.id+'\')'); }).join('') : '<div class="huong-dan">Chưa có.</div>')+
    (H.ka.length ? '<div class="nhan-nhom">✍ Chữ ký · CCCD ('+H.ka.length+')</div>'+H.ka.map(function(k){ return dong(k.loai==='ky'?'✍':'🪪', coChuHTML(k.ten||''), ngayVN(k.ngay||''), 'dongHop();xemThu(\'ka\',\''+k.id+'\')'); }).join('') : '')+
    (H.bo.length ? '<div class="nhan-nhom">📁 Bộ hồ sơ ('+H.bo.length+')</div>'+H.bo.map(function(b){ return dong('📁', coChuHTML(b.ten||''), (b.file||[]).length+' file', 'dongHop();doiNgan(3);D.cauHinh.tvPhan=\'bo\';BO.mo=\''+b.id+'\';veGhiChu()'); }).join('') : '')+
    '</div>';
  /* cột phải: món vay, làm việc, hồ sơ hộ */
  h += '<div class="h1-cot"><div class="nhan-nhom">💰 Món vay đang theo dõi ('+H.mons.length+')</div>'+
    (H.mons.length ? H.mons.map(function(m){
      var L = ['nqh','khd','nk'].filter(function(x){ return m.loai && m.loai[x]; })[0] || 'nqh', s = tdnSL(m, L);
      return dong(TDN_LOAI[L].ico, coChuHTML(tdnCT(m))+' · '+TDN_LOAI[L].ten, (s ? tdnTien(tdnSoChinh(L, s))+(tdnDangCo(m, L)?'':' (đã ra khỏi DS)') : 'đã ra khỏi danh sách')+' · KƯ '+coChuHTML(m.kuoc)+' · '+coChuHTML(tdnTrangThai(m.kuoc, L)),
        'dongHop();doiNgan(3);D.cauHinh.tvPhan=\'no\';TDN.loai=\''+L+'\';tdnMo(\''+m.kuoc+'\')'); }).join('')
      : '<div class="huong-dan">Hộ không có trong danh sách Theo dõi nợ (3 tháng KHD · quá hạn · khoanh).</div>')+
    (H.lan.length ? '<div class="nhan-nhom">📈 Làm việc gần đây ('+H.lan.length+')</div>'+H.lan.slice(0, 3).map(function(l){
      return dong('📝', ngayVN(l.ngay||'')+' · '+coChuHTML(l.trangThai||'Đang làm việc'), coChuHTML([l.camKet ? 'cam kết: '+l.camKet : '', l.camKetHan ? 'hạn '+ngayVN(l.camKetHan) : '', l.ketQua==='giu' ? '✓ giữ đúng' : l.ketQua==='that' ? '✗ thất hứa' : ''].filter(Boolean).join(' · ')), ''); }).join('') : '')+
    (H.ho ? '<div class="nhan-nhom">🗂 Hồ sơ hộ (tóm tắt)</div>'+TDN_MUC.map(function(M){ var v = (H.ho.tt||{})[M.k]; var t = v ? tdnTomMuc(M, v) : '';
      return t ? '<div class="h1-muc"><b>'+M.ten+'</b> '+coChuHTML(t)+'</div>' : ''; }).join('') +
      ((H.ho.file||[]).length ? '<div class="h1-muc"><b>📎 Tài liệu của hộ</b> '+H.ho.file.length+' file</div>' : '') : '')+
    '</div></div>'+
    '<div class="day-form">'+
      (H.scan.length ? '<button class="nho" onclick="var ids=HO1.scan.map(function(k){return k.id;});dongHop();moXemPDF(ids)" title="Ghép CCCD + hồ sơ quét thành 1 file để in / gửi">🖨 In / gửi bộ giấy tờ ('+H.scan.length+')</button>' : '')+
      (H.mons.length ? '<button class="nho" onclick="dongHop();tdnPhieu(\''+H.mons[0].kuoc+'\')" title="Phiếu thông tin món vay">🧾 Phiếu món vay</button>' : '')+
      '<button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button></div>';
  moHop(h, true);
  the.forEach(function(k){ docAnhHS(k.id+'_matTruoc').then(function(b){ var i = document.getElementById('h1a-'+k.id); if(i && b) i.src = URL.createObjectURL(b); else if(i) i.replaceWith(Object.assign(document.createElement('div'), {className:'h1-khong', textContent:k.driveId ? '☁ ảnh trên Drive' : 'chưa có ảnh'})); }).catch(function(){}); });
}
/* 3.84: bản scan tên KHÔNG dấu (vd lấy từ tên file khi Lập chỉ mục) → đề xuất tên có dấu theo danh sách khách Theo dõi nợ.
   Khớp: tên không dấu bắt đầu bằng tên khách (đuôi như "Hdtd" giữ nguyên) + cùng mã tổ nếu cả 2 có. Anh tích rồi mới đổi. */
function coDauViet(t){ return /[À-ỹĐđ]/.test(String(t||'').normalize('NFC').replace(/[A-Za-z0-9\s\-_.,()]/g, '')); }
function goiYTenCoDau(){
  var khach = {}; Object.keys(NO.mon||{}).forEach(function(k){ var m = NO.mon[k]; if(coDauViet(m.ten)) (khach[tenChuanHo(m.ten)] = khach[tenChuanHo(m.ten)] || []).push(m); });
  var ra = [];
  (D.scan||[]).forEach(function(k){
    if(!k.ten || coDauViet(k.ten)) return;
    var tu = String(k.ten).trim().split(/\s+/), a = tenChuanHo(k.ten).split(' ');
    for(var n = Math.min(a.length, 6); n >= 2; n--){
      var ds = (khach[a.slice(0, n).join(' ')] || []).filter(function(m){ var t = maToTu(k.to); return !t || !m.maTo || m.maTo===t; });
      var ten = ds.map(function(m){ return m.ten; }).filter(function(x, i, b){ return b.indexOf(x)===i; });
      if(ten.length===1){ ra.push({k:k, moi:[ten[0]].concat(tu.slice(n)).join(' ')}); return; }
      if(ten.length > 1) return;   /* nhiều người cùng tên → không đoán */
    }
  });
  return ra;
}
var TDAU = [];
function moTenCoDau(){
  TDAU = goiYTenCoDau();
  if(!TDAU.length) return bao('Không có bản scan nào cần đổi tên có dấu.', 3);
  moHop('<div class="hop-tit">✍ Đổi tên có dấu cho bản scan</div>'+
    '<div class="hop-phu">Tên lấy theo danh sách khách hàng trong Theo dõi nợ (khớp tên không dấu, cùng tổ nếu có). Anh tích bản muốn đổi — bản đã lên Drive sẽ đổi tên file trên Drive theo.</div>'+
    '<div class="ten-dau-ds">'+TDAU.map(function(x, i){ return '<label><input type="checkbox" class="tdau" value="'+i+'" checked> <s>'+coChuHTML(x.k.ten)+'</s> → <b>'+coChuHTML(x.moi)+'</b> <small>'+coChuHTML([x.k.ap, x.k.to?'Tổ '+x.k.to:''].filter(Boolean).join(' · '))+'</small></label>'; }).join('')+'</div>'+
    '<div class="day-form"><button class="nho" onclick="dongHop()">Đóng (Esc)</button><button class="nho chinh" onclick="apTenCoDau()">Đổi tên các bản đã tích</button></div>', true);
}
function apTenCoDau(){
  var bay = new Date().toISOString(), n = 0;
  Array.prototype.forEach.call(document.querySelectorAll('.tdau:checked'), function(c){
    var x = TDAU[+c.value]; if(!x) return;
    x.k.ten = x.moi; x.k.suaLuc = bay; if(x.k.driveId) x.k.canDay = true; n++;
  });
  HS.ds = D.scan; luu(); dongHop(); veScan();
  if(n && typeof henDongBoScan==='function') henDongBoScan();
  bao('Đã đổi tên có dấu cho '+n+' bản scan.', 5);
}
function moHoSoTuScan(id){ var k = (D.scan||[]).find(function(x){ return x.id===id; }); if(k) moHoSoHo({ten:k.ten, maTo:maToTu(k.to)}); }
/* các hộ khớp với chữ đang gõ — dùng cho ô tìm (gợi ý) */
function timHo(q){
  q = tenChuanHo(q); if(q.length < 3) return [];
  var ra = [], co = {};
  Object.keys(NO.mon||{}).forEach(function(k){ var m = NO.mon[k]; if(co['kh'+m.maKH] || tenChuanHo(m.ten).indexOf(q)<0) return; co['kh'+m.maKH] = 1; co['t'+tenChuanHo(m.ten)] = 1; ra.push({maKH:m.maKH, ten:m.ten, phu:'Tổ '+(m.toTen||m.maTo||'')}); });
  (D.scan||[]).forEach(function(k){ if(k.che==='tailieu' || !k.ten || tenChuanHo(k.ten).indexOf(q)<0 || co['t'+tenChuanHo(k.ten)]) return; co['t'+tenChuanHo(k.ten)] = 1; ra.push({ten:k.ten, maTo:maToTu(k.to), phu:[k.ap, k.to?'Tổ '+k.to:''].filter(Boolean).join(' · ')}); });
  return ra.slice(0, 6);
}

/* ---------- THẺ MÓN: số liệu · hồ sơ hộ · nhật ký · tài liệu · vị trí ---------- */
function tdnTheHTML(m, L){
  if(!m.loai[L]){ L = ['nqh','khd','nk'].filter(function(x){ return m.loai[x]; })[0]; TDN.loai = L; }
  var h0 = NO.ho[m.maKH] || (NO.ho[m.maKH] = {ma:m.maKH, ten:m.ten, tt:{}, ls:[], file:[]});
  var db = tdnDB(m), s = tdnSL(m, L), cc = tdnCacKy(m, L), T = TDN_LOAI[L];
  var h = '<div class="dk-dau"><button class="nho" onclick="TDN.mo=\'\';veGhiChu()">‹ Danh sách</button><b>'+coChuHTML(m.ten)+' — '+T.ico+' '+T.ten+'</b></div>'+
    '<div class="tdn-duong">📍 '+coChuHTML([db.xa, db.diem, db.ap, 'Tổ '+(m.toTen||m.maTo)].join(' › '))+' · KH '+coChuHTML(m.maKH)+' · KƯ '+coChuHTML(m.kuoc)+'</div>'+
    '<div class="hang-nut tdn-nut"><button class="nho chinh" onclick="tdnLanMoi(\''+m.kuoc+'\')">➕ Ghi lần làm việc</button>'+
      '<button class="nho" onclick="tdnThemFile(\''+m.maKH+'\')">📎 Thêm tài liệu</button>'+
      '<button class="nho" onclick="tdnGanFile(\''+m.maKH+'\')">🔗 Gắn file có sẵn</button>'+
      '<button class="nho" onclick="tdnViTri(\''+m.maKH+'\')">📍 Vị trí nhà</button>'+
      '<button class="nho" onclick="tdnPhieu(\''+m.kuoc+'\')" title="Phiếu thông tin món vay — in hoặc ra Word">🧾 In phiếu</button>'+
      '<button class="nho" onclick="moHoSoHo(\''+m.maKH+'\')" title="Hồ sơ hộ 1 trang: CCCD, hồ sơ quét, mọi món vay, lần làm việc">🏠 Hồ sơ 1 trang</button></div>';
  /* số liệu */
  var r = function(a, b){ return b==='' || b==null ? '' : '<tr><td>'+a+'</td><td>'+b+'</td></tr>'; };
  var sx = s || m.loai[L].ky[cc[cc.length-1]] || {};
  h += '<div class="nhan-nhom">Món vay · sao kê '+(s ? tdnKyVN(tdnKyMoi(L)) : 'tháng '+tdnKyVN(cc[cc.length-1])+' (đã ra khỏi DS)')+'</div><table class="tdn-bang">'+
    r('Chương trình', coChuHTML(tdnCTDai(m)))+r('Hội đoàn thể', coChuHTML(tdnHoi(m.dvut)))+r('Tổ trưởng', coChuHTML(m.toTen||m.maTo))+
    (L==='khd' ? r('Tổng dư nợ', '<b>'+tdnTien(sx.dn)+'</b> (trong hạn '+tdnTien(sx.th)+(sx.qh?' · quá hạn '+tdnTien(sx.qh):'')+(sx.kh?' · khoanh '+tdnTien(sx.kh):'')+')')+
      r('Ngày giao dịch gần nhất', ngayVN(sx.ngd))+r('Lãi tồn / đã thu', tdnTien(sx.lt)+' / '+tdnTien(sx.ldt))+r('Ngày giải ngân', ngayVN(sx.nv))+r('Ngày đến hạn', ngayVN(sx.dh)+(sx.dhgd && sx.dhgd!==sx.dh?' · hạn GDX '+ngayVN(sx.dhgd):'')) : '')+
    (L==='nqh' ? r('Dư nợ quá hạn', '<b>'+tdnTien(sx.qh)+'</b>'+(sx.cqh?' · chuyển QH trong tháng '+tdnTien(sx.cqh):''))+r('Ngày chuyển quá hạn', ngayVN(sx.ncq))+r('Số dư TK105', tdnTien(sx.tk105)) : '')+
    (L==='nk' ? r('Dư nợ khoanh', '<b>'+tdnTien(sx.kh)+'</b>')+r('Hiệu lực khoanh', ngayVN(sx.nhl)+' → '+ngayVN(sx.nhh))+r('Nguyên nhân (sao kê)', coChuHTML(sx.nn)) : '')+
    '</table>';
  h += '<div class="tdn-ls">Lịch sử: '+cc.map(function(k){ return '<span>'+tdnKyVN(k)+' <b>'+tdnTr(tdnSoChinh(L, m.loai[L].ky[k]))+'</b></span>'; }).join(' · ')+
    (tdnPhatSinhLai(m, L) ? ' · <b class="tt-thieu">↻ phát sinh lại '+tdnPhatSinhLai(m, L)+' lần</b>' : '')+'</div>';
  var khac = ['khd','nqh','nk'].filter(function(x){ return x!==L && m.loai[x] && tdnCacKy(m, x).length; });
  var monKhac = Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).filter(function(x){ return x.maKH===m.maKH && x.kuoc!==m.kuoc; });
  if(khac.length || monKhac.length) h += '<div class="tdn-ls">'+khac.map(function(x){ return '<a class="lk" onclick="TDN.loai=\''+x+'\';veGhiChu()">'+TDN_LOAI[x].ico+' Món này trong DS '+TDN_LOAI[x].ten+(tdnDangCo(m, x)?'':' (đã ra)')+'</a>'; }).join(' · ')+
    (monKhac.length ? (khac.length?' · ':'')+'Hộ còn '+monKhac.length+' món khác: '+monKhac.map(function(x){ var l = ['nqh','khd','nk'].filter(function(y){ return x.loai[y]; })[0];
      return '<a class="lk" onclick="TDN.loai=\''+l+'\';tdnMo(\''+x.kuoc+'\')">'+coChuHTML(tdnCT(x))+' · '+TDN_LOAI[l].ten+'</a>'; }).join(', ') : '')+'</div>';
  /* nhật ký */
  var lan = tdnLanCua(m.kuoc, L), lanKhac = NO.lan.filter(function(l){ return NO.mon[l.kuoc] && NO.mon[l.kuoc].maKH===m.maKH && !(l.kuoc===m.kuoc && l.loai===L); });
  h += '<div class="nhan-nhom">📈 Nhật ký làm việc ('+lan.length+') · trạng thái: <b>'+coChuHTML(tdnTrangThai(m.kuoc, L))+'</b>'+(function(hc){ return hc ? ' · <b class="'+(tdnHua(m.kuoc).that?'tt-thieu':'')+'">'+coChuHTML(hc)+'</b>' : ''; })(tdnHuaChu(tdnHua(m.kuoc)))+'</div>';
  h += lan.length ? lan.map(function(l){ return tdnLanHTML(l); }).join('') : '<div class="huong-dan">Chưa có lần làm việc nào. Bấm <b>➕ Ghi lần làm việc</b> — ghi xong bấm <b>📝 Biên bản</b> để ra file Word điền sẵn.</div>';
  if(lanKhac.length) h += '<details class="hs-ct"><summary>Lần làm việc ở danh sách / món khác của hộ ('+lanKhac.length+')</summary>'+lanKhac.map(function(l){ return tdnLanHTML(l); }).join('')+'</details>';
  /* hồ sơ hộ */
  h += '<div class="nhan-nhom">🗂 Hồ sơ hộ vay — dùng chung cho cả 3 danh sách</div>';
  TDN_MUC.forEach(function(M){ h += tdnMucHTML(h0, M, m, L); });
  /* vị trí + tài liệu */
  var vt = h0.viTri;
  h += '<div class="nhan-nhom">📍 Vị trí nhà</div>'+(vt ? '<div class="tdn-ls">'+(vt.lat ? vt.lat.toFixed(6)+', '+vt.lng.toFixed(6)+' ' : '')+(vt.ghi?coChuHTML(vt.ghi)+' ':'')+'· cập nhật '+ngayVN((vt.luc||'').slice(0,10))+
      ' · <a class="lk" onclick="tdnChiDuong(\''+m.maKH+'\')">🧭 Chỉ đường</a> · <a class="lk" onclick="tdnViTri(\''+m.maKH+'\')">sửa</a></div>' : '<div class="huong-dan">Chưa có — bấm 📍 Vị trí nhà (đứng ở nhà khách bấm "Lấy vị trí tại đây", hoặc dán link Google Maps).</div>');
  h += '<div class="nhan-nhom">📎 Tài liệu của hộ ('+(h0.file||[]).length+') — hồ sơ gốc, biên bản đã ký, ảnh, giấy tờ</div>'+
    ((h0.file||[]).length ? h0.file.map(function(f, i){
      var mm = f.k && f.k!=='rieng' ? fileBoMuc(f) : null;
      var duong = f.k && f.k!=='rieng' ? (mm ? 'file ở '+(f.k==='scan'?'tab Scan':f.k==='ka'?'Chữ ký·CCCD':'tab '+coChuHTML(TEN_PHAN[khoCuaMuc(mm)]||'')) : 'file gốc đã bị xóa')
        : (f.driveId ? '☁ '+D.cauHinh.thumuc+' / Theo dõi nợ / '+coChuHTML(tdnThuMuc(h0).split(' / ').slice(1).join(' / ')) : '💻 Chỉ trong máy này (chưa lên Drive)');
      return '<div class="dk-dong"><span>'+(f.nhom==='bb'?'📝':f.nhom==='anh'?'🖼':'📄')+'</span><div class="dk-ten" onclick="tdnXemFile(\''+m.maKH+'\','+i+')"><b>'+coChuHTML(f.k && f.k!=='rieng' ? tenFileBo(f) : f.ten)+'</b><small>'+(f.nhom?coChuHTML(TDN_NHOM_FILE[f.nhom]||'')+' · ':'')+duong+'</small></div>'+
        '<button class="nho" onclick="tdnBoFile(\''+m.maKH+'\','+i+')" title="Gỡ khỏi hồ sơ hộ">✕</button></div>';
    }).join('') : '<div class="huong-dan">Chưa có tài liệu. 📎 Thêm tài liệu (chụp / chọn file) hoặc 🔗 Gắn file có sẵn (bản scan hồ sơ gốc ở tab Scan…).</div>');
  return h;
}
var TDN_NHOM_FILE = {goc:'Hồ sơ gốc', bb:'Biên bản đã ký', anh:'Ảnh hiện trạng', giay:'Giấy tờ thừa kế / xác nhận', khac:'Khác'};
function tdnMucHTML(ho, M, m, L){
  var v = ho.tt[M.k] || {}, co = (v.chon||[]).length || v.ghi || M.o.some(function(o){ return v[o[0]]; });
  var tom = co ? [(v.chon||[]).join(', ')].concat(M.o.filter(function(o){ return v[o[0]]; }).map(function(o){ return o[1]+': '+v[o[0]]; })).concat(v.ghi?[v.ghi]:[]).filter(Boolean).join(' · ') : '';
  var ls = (ho.ls||[]).filter(function(x){ return x.muc===M.k; });
  var goiY = (M.k==='nguyenNhan' && L==='nk') ? ((tdnSL(m,'nk')||{}).nn || '') : '';
  return '<div class="tdn-muc'+(co?'':' chua-co')+'"><div class="tdn-muc-dau"><b>'+M.ten+'</b>'+(v.luc?'<small>cập nhật '+ngayVN(v.luc.slice(0,10))+(v.nguon?' · '+coChuHTML(v.nguon):'')+'</small>':'')+
    '<button class="nho" onclick="tdnSuaMuc(\''+ho.ma+'\',\''+M.k+'\')">✎ '+(co?'Sửa':'Bổ sung')+'</button></div>'+
    (co ? '<div class="tdn-muc-nd">'+coChuHTML(tom)+'</div>' : '<div class="tdn-muc-nd huong-dan">Chưa có thông tin.'+(goiY?' Sao kê ghi: "'+coChuHTML(goiY)+'"':'')+'</div>')+
    (ls.length ? '<details class="tdn-lsm"><summary>🕘 '+ls.length+' lần thay đổi trước</summary>'+ls.slice().reverse().map(function(x){ return '<div>'+ngayVN((x.luc||'').slice(0,10))+': '+coChuHTML(x.tom||'(trống)')+'</div>'; }).join('')+'</details>' : '')+'</div>';
}
function tdnTomMuc(M, v){ return [(v.chon||[]).join(', ')].concat(M.o.filter(function(o){ return v[o[0]]; }).map(function(o){ return o[1]+': '+v[o[0]]; })).concat(v.ghi?[v.ghi]:[]).filter(Boolean).join(' · '); }
function tdnSuaMuc(maKH, k){
  var ho = NO.ho[maKH], M = TDN_MUC.find(function(x){ return x.k===k; }); if(!ho || !M) return;
  if(nhapMo('muc:'+maKH+':'+k)) return;
  var v = ho.tt[k] || {};
  moHop('<div class="hop-tit">'+M.ten+' — '+coChuHTML(ho.ten||maKH)+'</div>'+
    '<div class="hop-phu">'+(M.mot?'Chọn một mức (bấm lại để bỏ = chưa đánh giá)':'Bấm chọn nhanh (chọn được nhiều)')+', gõ thêm nếu cần. Bản cũ được giữ trong lịch sử.</div>'+
    '<div class="tdn-chip" id="tdn-chip">'+M.chon.map(function(c){ return '<span class="'+((v.chon||[]).indexOf(c)>=0?'bat':'')+'" onclick="'+(M.mot?'var b=!this.classList.contains(\'bat\');Array.prototype.forEach.call(this.parentNode.children,function(x){x.classList.remove(\'bat\')});if(b)':'')+'this.classList.toggle(\'bat\')">'+coChuHTML(c)+'</span>'; }).join('')+'</div>'+
    M.o.map(function(o){ return '<div class="o"><label>'+o[1]+'</label><input id="tdn-o-'+o[0]+'" value="'+coChuHTML(v[o[0]]||'')+'"></div>'; }).join('')+
    '<div class="o"><label>Ghi thêm</label><textarea id="tdn-o-ghi" rows="4">'+coChuHTML(v.ghi||'')+'</textarea></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi (Esc)</button><button class="nho chinh" onclick="tdnLuuMuc(\''+maKH+'\',\''+k+'\')">✓ Lưu</button></div>', true);
  nhapDat('muc:'+maKH+':'+k);  document.getElementById('hop-in').classList.add('phim-chung');   /* 3.84: phím chung Enter / Tab / Shift / ↑ ↓ */
}
function tdnLuuMuc(maKH, k, nguon){
  var ho = NO.ho[maKH], M = TDN_MUC.find(function(x){ return x.k===k; }); if(!ho || !M) return;
  var cu = ho.tt[k] || {}, moi = {chon:Array.prototype.map.call(document.querySelectorAll('#tdn-chip span.bat'), function(e){ return e.textContent; })};
  M.o.forEach(function(o){ moi[o[0]] = gt('tdn-o-'+o[0]); }); moi.ghi = (document.getElementById('tdn-o-ghi')||{}).value || '';
  nhapXong();
  if(tdnTomMuc(M, cu)===tdnTomMuc(M, moi)) return dongHop();
  if(cu.luc) (ho.ls = ho.ls||[]).push({muc:k, luc:cu.luc, tom:tdnTomMuc(M, cu), v:cu});
  if(ho.ls.length>200) ho.ls = ho.ls.slice(-200);
  moi.luc = new Date().toISOString(); moi.nguon = nguon || 'anh bổ sung'; ho.tt[k] = moi; ho.suaLuc = moi.luc;
  luuNo(); dongHop(); veGhiChu();
}
/* ---------- lần làm việc ---------- */
function tdnLanHTML(l){
  var m = NO.mon[l.kuoc], T = TDN_LOAI[l.loai]||{};
  return '<div class="tdn-lan"><div class="tdn-lan-dau"><b>'+ngayVN(l.ngay)+' · '+coChuHTML(l.hinhThuc||'')+'</b>'+
    (m && TDN.mo!==l.kuoc ? '<small>'+coChuHTML(tdnCT(m))+' · '+(T.ten||'')+'</small>' : '')+'<span class="tg '+(/thu hồi hết/.test(l.trangThai||'')?'ct':'')+'">'+coChuHTML(l.trangThai||'')+'</span>'+
    '<span class="cc-gian"></span><button class="nho chinh" onclick="tdnBienBan(\''+l.id+'\')" title="Tạo biên bản Word điền sẵn">📝 Biên bản</button>'+
    '<button class="nho" onclick="tdnLanMoi(\''+l.kuoc+'\',\''+l.id+'\')">✎</button><button class="nho" onclick="tdnXoaLan(\''+l.id+'\')" title="Xóa lần này">🗑</button></div>'+
    '<div class="tdn-lan-nd">'+[['Địa điểm',l.diaDiem],['Nguyên nhân',l.nguyenNhan],['Thực trạng',l.thucTrang],['Cam kết',l.camKet+(l.camKetTien?' · '+tdnTien(l.camKetTien)+' đ':'')+(l.camKetHan?' · hạn '+ngayVN(l.camKetHan):'')],['Kiến nghị',l.kienNghi],['Đã thu',l.thu?tdnTien(l.thu)+' đ':'']]
      .filter(function(x){ return x[1] && String(x[1]).replace(/[·\s]/g,''); }).map(function(x){ return '<div><i>'+x[0]+':</i> '+coChuHTML(x[1])+'</div>'; }).join('')+'</div>'+
    (tdnCoCamKet(l) ? '<div class="tdn-kq"><i>Kết quả cam kết:</i> <button class="nho'+(l.ketQua==='giu'?' bat giu':'')+'" onclick="tdnDatKQ(\''+l.id+'\',\'giu\')">✓ Giữ đúng</button>'+
      '<button class="nho'+(l.ketQua==='that'?' bat that':'')+'" onclick="tdnDatKQ(\''+l.id+'\',\'that\')">✗ Thất hứa</button>'+(l.ketQua?'':'<small>đang chờ — bấm lại nút đã chọn để bỏ</small>')+'</div>' : '')+'</div>';
}
function tdnLanMoi(kuoc, id){
  var m = NO.mon[kuoc]; if(!m) return;
  if(nhapMo('lan:'+kuoc+':'+(id||''))) return;
  var ho = NO.ho[m.maKH]||{tt:{}}, db = tdnDB(m), l = id ? NO.lan.find(function(x){ return x.id===id; }) : null;
  var tt = function(k){ var M = TDN_MUC.find(function(x){ return x.k===k; }); return ho.tt[k] ? tdnTomMuc(M, ho.tt[k]) : ''; };
  var L = l ? l.loai : TDN.loai;
  var v = l || {ngay:ngayISO(nay()), diaDiem:tdnApCau(db.ap)+', '+tdnXaCau(db.xa), hinhThuc:TDN_HINH_THUC[0], thanhPhan:'',
    nguyenNhan:tt('nguyenNhan') || (L==='nk' ? ((tdnSL(m,'nk')||{}).nn||'') : ''), thucTrang:[tt('nguoiVay'), tt('thucTrang'), tt('suDungVon')].filter(Boolean).join('; '),
    camKet:'', camKetTien:'', camKetHan:'', kienNghi:tt('phuongAn'), thu:'', trangThai:'Đang làm việc'};
  var o = function(k, nhan, goiY){ return '<div class="o"><label>'+nhan+'</label><input id="tl-'+k+'" value="'+coChuHTML(v[k]||'')+'" placeholder="'+(goiY||'')+'"></div>'; };
  var t = function(k, nhan){ return '<div class="o"><label>'+nhan+'</label><textarea id="tl-'+k+'" rows="3">'+coChuHTML(v[k]||'')+'</textarea></div>'; };
  moHop('<div class="hop-tit">'+(l?'✎ Sửa':'➕ Ghi')+' lần làm việc — '+coChuHTML(m.ten)+' · '+TDN_LOAI[L].ten+'</div>'+
    '<div class="hop-phu">Các mục 2–5 đúng theo biên bản làm việc; app điền sẵn từ hồ sơ hộ, anh sửa câu chữ. Có hạn cam kết → tự lên lịch Hôm nay để nhắc.</div>'+
    '<div class="cot2">'+'<div class="o"><label>Ngày làm việc</label><input id="tl-ngay" inputmode="numeric" value="'+ngayVN(v.ngay)+'" oninput="goNgay(this)" placeholder="dd/mm/yyyy"></div>'+
      o('diaDiem','Địa điểm (tại…)','ấp …, xã …')+'</div>'+
    '<div class="o"><label>Hình thức</label><select id="tl-hinhThuc">'+TDN_HINH_THUC.map(function(x){ return '<option'+(x===v.hinhThuc?' selected':'')+'>'+x+'</option>'; }).join('')+'</select></div>'+
    t('thanhPhan','Thành phần (để trống thì biên bản để chấm cho ghi tay)')+
    t('nguyenNhan','2. Nguyên nhân không trả được nợ')+t('thucTrang','3. Thực trạng kinh tế và khả năng trả nợ')+
    t('camKet','4. Cam kết của khách hàng (hoặc người trả nợ thay)')+
    '<div class="cot2">'+o('camKetTien','Số tiền cam kết (đồng)','vd 5000000')+'<div class="o"><label>Hạn cam kết</label><input id="tl-camKetHan" inputmode="numeric" value="'+ngayVN(v.camKetHan)+'" oninput="goNgay(this)" placeholder="dd/mm/yyyy"></div></div>'+
    t('kienNghi','5. Kiến nghị biện pháp xử lý nợ')+
    '<div class="cot2">'+o('thu','Số tiền đã thu lần này (đồng)','')+'<div class="o"><label>Trạng thái sau lần này</label><select id="tl-trangThai">'+TDN_TRANG_THAI.map(function(x){ return '<option'+(x===v.trangThai?' selected':'')+'>'+x+'</option>'; }).join('')+'</select></div></div>'+
    '<label class="tl-chon"><input type="checkbox" id="tl-capNhat" checked> Cập nhật "Nguyên nhân", "Phương án" vào hồ sơ hộ nếu hồ sơ còn trống</label>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi (Esc)</button><button class="nho chinh" onclick="tdnLuuLan(\''+kuoc+'\',\''+(id||'')+'\')">✓ Lưu</button>'+
    '<button class="nho" onclick="tdnLuuLan(\''+kuoc+'\',\''+(id||'')+'\',true)">✓ Lưu &amp; 📝 Biên bản</button></div>', true);
  nhapDat('lan:'+kuoc+':'+(id||''));  document.getElementById('hop-in').classList.add('phim-chung');   /* 3.84: phím chung Enter / Tab / Shift / ↑ ↓ */
}
function tdnLuuLan(kuoc, id, bb){
  var m = NO.mon[kuoc]; if(!m) return;
  var now = new Date().toISOString(), l = id ? NO.lan.find(function(x){ return x.id===id; }) : null;
  var ngay = ngayISOtu(gt('tl-ngay')); if(!ngay) return baoLoi('Ngày làm việc chưa đúng (dd/mm/yyyy).');
  var han = gt('tl-camKetHan') ? ngayISOtu(gt('tl-camKetHan')) : ''; if(gt('tl-camKetHan') && !han) return baoLoi('Hạn cam kết chưa đúng (dd/mm/yyyy).');
  if(!l){ l = {id:'tl'+idMoi(), kuoc:kuoc, maKH:m.maKH, loai:TDN.loai, taoLuc:now}; NO.lan.push(l); }
  ['diaDiem','hinhThuc','thanhPhan','nguyenNhan','thucTrang','camKet','kienNghi','trangThai'].forEach(function(k){ var e = document.getElementById('tl-'+k); l[k] = e ? e.value.trim() : ''; });
  l.ngay = ngay; l.camKetHan = han; l.camKetTien = tdnSo(gt('tl-camKetTien')) || ''; l.thu = tdnSo(gt('tl-thu')) || ''; l.suaLuc = now;
  /* hạn cam kết → một việc trong lịch Hôm nay (sửa lần làm việc thì sửa theo) */
  var Lc = lcData(), v = l.viecId ? Lc.viec.find(function(x){ return x.id===l.viecId; }) : null;
  if(han){
    var ten = '💰 Cam kết trả nợ: '+m.ten+(l.camKetTien?' '+tdnTien(l.camKetTien)+' đ':'')+' ('+TDN_LOAI[l.loai].ten+')';
    if(!v){ v = {id:idMoi(), ten:ten, ngay:han, lap:'mot', luuY:true, xong:false, xongNgay:{}, bo:[], taoLuc:now, suaLuc:now, tdn:l.id}; Lc.viec.push(v); l.viecId = v.id; }
    else { v.ten = ten; v.ngay = han; v.suaLuc = now; }
    lcDoiLich();
  } else if(v){ Lc.viec = Lc.viec.filter(function(x){ return x.id!==v.id; }); Lc.daXoa.push({id:v.id, luc:now}); l.viecId = ''; lcDoiLich(); }
  var ho = NO.ho[m.maKH];
  if(ho && (document.getElementById('tl-capNhat')||{}).checked){
    if(l.nguyenNhan && !ho.tt.nguyenNhan) ho.tt.nguyenNhan = {chon:[], ghi:l.nguyenNhan, luc:now, nguon:'lần làm việc '+ngayVN(ngay)};
    if(l.kienNghi && !ho.tt.phuongAn) ho.tt.phuongAn = {chon:[], ghi:l.kienNghi, luc:now, nguon:'lần làm việc '+ngayVN(ngay)};
    ho.suaLuc = now;
  }
  luuNo(); nhapXong(); dongHop(); veGhiChu();
  if(bb) tdnBienBan(l.id); else bao('Đã lưu lần làm việc'+(han?' — hạn cam kết '+ngayVN(han)+' đã lên lịch Hôm nay':'')+'.', 4);
}
function tdnXoaLan(id){
  var l = NO.lan.find(function(x){ return x.id===id; }); if(!l) return;
  hoi('Xóa lần làm việc '+ngayVN(l.ngay)+'?', 'Xóa khỏi nhật ký (việc cam kết trong lịch cũng bỏ). Tài liệu của hộ giữ nguyên.', 'Xóa', function(){
    var now = new Date().toISOString();
    NO.lan = NO.lan.filter(function(x){ return x.id!==id; }); NO.lanXoa.push({id:id, luc:now});
    if(l.viecId){ var Lc = lcData(); Lc.viec = Lc.viec.filter(function(x){ return x.id!==l.viecId; }); Lc.daXoa.push({id:l.viecId, luc:now}); lcDoiLich(); }
    luuNo(); veGhiChu();
  });
}

/* ---------- vị trí nhà ---------- */
function tdnViTri(maKH){
  var ho = NO.ho[maKH]; if(!ho) return; var vt = ho.viTri || {};
  moHop('<div class="hop-tit">📍 Vị trí nhà — '+coChuHTML(ho.ten||maKH)+'</div>'+
    '<div class="hop-phu">Đứng ở nhà khách bấm <b>Lấy vị trí tại đây</b> (điện thoại bật định vị), hoặc dán link Google Maps / tọa độ.</div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="tdnLayGPS(\''+maKH+'\')">📡 Lấy vị trí tại đây</button></div>'+
    '<div class="o"><label>Link Google Maps hoặc tọa độ (vĩ độ, kinh độ)</label><input id="tdn-vt" value="'+coChuHTML(vt.lat?vt.lat+', '+vt.lng:(vt.link||''))+'" placeholder="10.98, 106.26 hoặc https://maps.app.goo.gl/…"></div>'+
    '<div class="o"><label>Ghi chú đường đi</label><input id="tdn-vt-ghi" value="'+coChuHTML(vt.ghi||'')+'" placeholder="vd: hẻm cạnh chợ, nhà mái tôn xanh"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi (Esc)</button><button class="nho chinh" onclick="tdnLuuViTri(\''+maKH+'\')">✓ Lưu</button></div>', true);
}
function tdnLayGPS(maKH){
  if(!navigator.geolocation) return baoLoi('Máy này không hỗ trợ định vị.');
  bao('Đang lấy vị trí…', 3);
  navigator.geolocation.getCurrentPosition(function(p){
    var e = document.getElementById('tdn-vt'); if(e) e.value = p.coords.latitude.toFixed(6)+', '+p.coords.longitude.toFixed(6);
    bao('Đã lấy vị trí (sai số khoảng '+Math.round(p.coords.accuracy)+' m) — bấm Lưu.', 5);
  }, function(er){ baoLoi('Không lấy được vị trí: '+(er && er.message || 'chưa cho phép định vị')); }, {enableHighAccuracy:true, timeout:20000});
}
function tdnLuuViTri(maKH){
  var ho = NO.ho[maKH]; if(!ho) return;
  var t = gt('tdn-vt'), m = t.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{2,3}\.\d+)/) || t.match(/@(-?\d{1,2}\.\d+),(-?\d{2,3}\.\d+)/);
  var vt = {ghi:gt('tdn-vt-ghi'), luc:new Date().toISOString()};
  if(m){ vt.lat = +m[1]; vt.lng = +m[2]; } else if(/^https?:\/\//.test(t)) vt.link = t; else if(t) return baoLoi('Chưa nhận ra tọa độ hoặc link.');
  ho.viTri = (vt.lat || vt.link || vt.ghi) ? vt : null; ho.suaLuc = vt.luc; luuNo(); dongHop(); veGhiChu();
}
function tdnChiDuong(maKH){
  var vt = (NO.ho[maKH]||{}).viTri; if(!vt) return;
  window.open(vt.lat ? 'https://www.google.com/maps/dir/?api=1&destination='+vt.lat+','+vt.lng : vt.link, '_blank');
}
/* ---------- tài liệu của hộ ---------- */
function tdnThuMuc(ho){
  var m = Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).find(function(x){ return x.maKH===ho.ma; });
  var db = m ? tdnDB(m) : {xa:'Chưa rõ xã'};
  return D.cauHinh.thumuc+' / Theo dõi nợ / '+sachTen(db.xa)+' / '+sachTen((ho.ten||'')+' - '+ho.ma);
}
function tdnThemFile(maKH){
  var ho = NO.ho[maKH]; if(!ho) return;
  moHop('<div class="hop-tit">📎 Thêm tài liệu — '+coChuHTML(ho.ten||maKH)+'</div>'+
    '<div class="o"><label>Loại tài liệu</label><select id="tdn-nf">'+Object.keys(TDN_NHOM_FILE).map(function(k){ return '<option value="'+k+'">'+TDN_NHOM_FILE[k]+'</option>'; }).join('')+'</select></div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="tdnChonFileHo(\''+maKH+'\',true)">📷 Chụp ảnh</button><button class="nho" onclick="tdnChonFileHo(\''+maKH+'\')">📂 Chọn file (ảnh / PDF / Word)</button>'+
    '<button class="nho" onclick="dongHop()">Thôi (Esc)</button></div>'+
    '<div class="huong-dan">Hồ sơ gốc nhiều trang: quét ở tab <b>Scan</b> (chế độ Tài liệu) cho ra PDF đẹp, rồi quay lại bấm <b>🔗 Gắn file có sẵn</b>.</div>', true);
}
function tdnChonFileHo(maKH, chup){
  var nhom = gt('tdn-nf') || 'khac', i = document.createElement('input'); i.type = 'file'; i.multiple = !chup;
  i.accept = chup ? 'image/*' : 'image/*,.pdf,.doc,.docx,.xls,.xlsx'; if(chup) i.setAttribute('capture', 'environment');
  i.onchange = function(){
    var ho = NO.ho[maKH]; if(!ho || !i.files.length) return;
    var ds = Array.prototype.slice.call(i.files);
    Promise.all(ds.map(function(f){ var id = 'nf'+idMoi(); return luuFile(id, f).then(function(){ (ho.file = ho.file||[]).push({k:'rieng', id:id, ten:f.name, co:f.size, loai:f.type||'', nhom:nhom, themLuc:new Date().toISOString(), may:maMayCua()}); }); }))
    .then(function(){ ho.suaLuc = new Date().toISOString(); luuNo(); dongHop(); veGhiChu(); bao('Đã thêm '+ds.length+' tài liệu.'+(coTheNoiDrive()?' Đang đưa lên Drive…':''), 4); dayFileNoCho(); });
  };
  i.click();
}
function dayFileNoCho(){
  if(!coTheNoiDrive() || !(DR.sanSang && DR.online) || dayFileNoCho.dang) return Promise.resolve();
  var viec = [];
  Object.keys(NO.ho).forEach(function(k){ var ho = NO.ho[k]; (ho.file||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) viec.push([ho, f]); }); });
  if(!viec.length) return Promise.resolve();
  dayFileNoCho.dang = true;
  return viec.reduce(function(p, x){
    return p.then(function(){
      var ho = x[0], f = x[1];
      return Promise.all([docFile(f.id), baoDamDuong(tdnThuMuc(ho))]).then(function(r){
        if(!r[0]) return;
        return dayBlobLenDrive(f.ten, f.loai, r[0], r[1]).then(function(r2){ f.driveId = r2 && r2.id; f.driveCha = r[1]; ho.suaLuc = new Date().toISOString(); });
      }).catch(function(e){ console.warn('Chưa đưa tài liệu lên Drive', f.ten, e); });
    });
  }, Promise.resolve()).then(function(){ dayFileNoCho.dang = false; luuNo(); if(nganHienTai===3 && tvPhan()==='no') veGhiChu(); });
}
function tdnXemFile(maKH, i){
  var ho = NO.ho[maKH], f = ho && ho.file[i]; if(!f) return;
  if(f.k && f.k!=='rieng') return xemThu(f.k==='scan'?'scan':f.k==='ka'?'ka':'muc', f.id);
  var m = {id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), driveId:f.driveId, co:f.co};
  var cp = document.getElementById('cotphai');
  if(cp && cp.offsetParent && !anPV){ mucDangXem = m; cp.classList.remove('pv-trong'); document.getElementById('cp-ten').textContent = f.ten;
    document.getElementById('cp-phu').textContent = (TDN_NHOM_FILE[f.nhom]||'')+' · '+(ho.ten||''); veNutCN(null); veNoiDung(m, 'phai'); }
  else moXem(null, m);
}
function tdnBoFile(maKH, i){
  var ho = NO.ho[maKH], f = ho && ho.file[i]; if(!f) return;
  hoi('Gỡ "'+(f.ten||'file')+'" khỏi hồ sơ hộ?', f.k && f.k!=='rieng' ? 'Chỉ gỡ liên kết — file gốc vẫn ở chỗ cũ.' : 'File riêng của hộ: gỡ khỏi danh sách (file trên Drive giữ nguyên để anh tự xử lý).', 'Gỡ', function(){
    ho.file.splice(i, 1); ho.suaLuc = new Date().toISOString(); luuNo(); veGhiChu();
  });
}
function tdnGanFile(maKH){
  var ho = NO.ho[maKH]; if(!ho) return;
  GAN = {bo:'', nk:'', tdn:maKH, tim:ho.ten||''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào hồ sơ hộ</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó (vd bản scan hồ sơ gốc ở tab Scan). Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" value="'+coChuHTML(GAN.tim)+'" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi (Esc)</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
  veGanDS();
}

/* ---------- 📝 BIÊN BẢN — danh mục mẫu (thêm mẫu sau không sửa phần khác) ---------- */
var MAU_BB = [
  {id:'xacMinhNo', ten:'Biên bản làm việc — xác minh khoản nợ', ve:function(c){ return bbXacMinhNo(c); }}
];
function tdnBienBan(lanId, mauId){
  var l = NO.lan.find(function(x){ return x.id===lanId; }), m = l && NO.mon[l.kuoc]; if(!m) return;
  var mau = MAU_BB.find(function(x){ return x.id===(mauId||'xacMinhNo'); }) || MAU_BB[0];
  var ten = 'BB lam viec - '+boDauTen(m.ten)+' - '+ngayVN(l.ngay).replace(/\//g,'-')+'.docx';
  taoDocx(mau.ve(tdnNguCanh(l, m))).then(function(bl){
    giaoFile(bl, ten);
    bao('Đã tạo '+ten+' — mở bằng Word để sửa, in, ký. Bản ký xong chụp lại: 📎 Thêm tài liệu › Biên bản đã ký.', 9);
  });
}
function boDauTen(t){ return boDau(t||'').replace(/[^a-z0-9 ]/gi,'').replace(/\s+/g,' ').trim().replace(/\b\w/g, function(c){ return c.toUpperCase(); }); }
function tdnNguCanh(l, m){
  var db = tdnDB(m), L = l.loai, s = tdnSL(m, L) || {}, ky = tdnKyMoi(L), sk = tdnSL(m, 'khd', ky) || {};
  var hoTT = (NO.ho[m.maKH]||{tt:{}}).tt;
  var goc = L==='khd' ? s.dn : (sk.dn || (L==='nqh' ? s.qh : s.kh));
  return {ngay:l.ngay, diaDiem:l.diaDiem, thanhPhan:l.thanhPhan, ten:m.ten, diaChi:tdnApCau(db.ap)+', '+tdnXaCau(db.xa)+', tỉnh Tây Ninh',
    ct:tdnCTDai(m), soTien:'', mucDich:(hoTT.suDungVon||{}).mucDich||'', ngayVay:L==='khd'?s.nv:(sk.nv||''), ngayDenHan:L==='khd'?s.dh:(sk.dh||''),
    denNgay:ky ? tdnCuoiKy(ky) : '', noGoc:goc||'', noLai:L==='khd'?s.lt:(sk.lt||''),
    nguyenNhan:l.nguyenNhan, thucTrang:l.thucTrang, camKet:[l.camKet, l.camKetTien?'số tiền '+tdnTien(l.camKetTien)+' đồng':'', l.camKetHan?'trước ngày '+ngayVN(l.camKetHan):''].filter(Boolean).join(', '), kienNghi:l.kienNghi,
    hoi:tdnHoi(m.dvut)};
}
/* ---- dựng file Word (.docx) — dùng lại bộ nén ZIP có sẵn ---- */
function xmlEsc(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function wR(t, o){ o = o||{}; return '<w:r><w:rPr>'+(o.b?'<w:b/>':'')+(o.i?'<w:i/>':'')+(o.sz?'<w:sz w:val="'+o.sz+'"/>':'')+'</w:rPr><w:t xml:space="preserve">'+xmlEsc(t)+'</w:t></w:r>'; }
function wP(runs, o){ o = o||{}; return '<w:p><w:pPr>'+(o.jc?'<w:jc w:val="'+o.jc+'"/>':'')+'<w:spacing w:before="'+(o.tr||0)+'" w:after="'+(o.sau!=null?o.sau:60)+'" w:line="'+(o.line||300)+'" w:lineRule="auto"/>'+(o.thut?'<w:ind w:firstLine="'+o.thut+'"/>':'')+'</w:pPr>'+(typeof runs==='string'?wR(runs, o):runs.join(''))+'</w:p>'; }
function wBangKy(cot){
  var w = Math.floor(9600/cot.length);
  return '<w:tbl><w:tblPr><w:tblW w:w="9600" w:type="dxa"/><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders></w:tblPr><w:tblGrid>'+
    cot.map(function(){ return '<w:gridCol w:w="'+w+'"/>'; }).join('')+'</w:tblGrid><w:tr>'+cot.map(function(c){ return '<w:tc><w:tcPr><w:tcW w:w="'+w+'" w:type="dxa"/></w:tcPr>'+wP([wR(c,{b:1})],{jc:'center'})+'</w:tc>'; }).join('')+'</w:tr></w:tbl>';
}
function bbCham(v, n){ return v ? String(v) : Array(n||20).join('.'); }
function bbXacMinhNo(c){
  var d = c.ngay ? c.ngay.split('-') : ['','',''], tp = String(c.thanhPhan||'').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  var dong = [
    ['Đại diện: ……………………………'],['Đại diện: ……………………………'],['Đại diện: Tổ TK&VV'],['Đại diện: Khách hàng vay vốn']];
  var P = [];
  P.push(wP([wR('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',{b:1})],{jc:'center',sau:0}));
  P.push(wP([wR('Độc lập – Tự do – Hạnh phúc',{b:1})],{jc:'center',sau:0}));
  P.push(wP([wR('--------------------------------')],{jc:'center',sau:120}));
  P.push(wP([wR('BIÊN BẢN LÀM VIỆC',{b:1,sz:30})],{jc:'center',tr:120,sau:120}));
  P.push(wP([wR('Hôm nay, ngày '+(d[2]||'……')+'/'+(d[1]||'……')+'/'+(d[0]||'……')+', tại '+bbCham(c.diaDiem, 30)+', tỉnh Tây Ninh.')],{thut:567}));
  P.push(wP([wR('Chúng tôi gồm:')],{thut:567}));
  for(var i=0;i<4;i++) P.push(wP([wR((i+1)+'. '+(tp[i] ? tp[i] : 'Ông (bà) ............................................... '+dong[i][0]))],{thut:567}));
  P.push(wP([wR('Đã tiến hành xác minh và đánh giá khoản nợ của ông (bà): '),wR(c.ten,{b:1})],{thut:567}));
  P.push(wP([wR('Địa chỉ: '+bbCham(c.diaChi, 60))],{thut:567}));
  P.push(wP([wR('1. Thông tin về món vay',{b:1})],{thut:567}));
  P.push(wP([wR('- Tên chương trình vay: '+bbCham(c.ct, 30)+'; - Số tiền vay: '+(c.soTien?tdnTien(c.soTien):'……………')+' đồng;')],{thut:567}));
  P.push(wP([wR('- Mục đích sử dụng vốn vay: '+bbCham(c.mucDich, 60))],{thut:567}));
  P.push(wP([wR('- Ngày vay: '+(c.ngayVay?ngayVN(c.ngayVay):'……/……/………')+'          - Ngày đến hạn: '+(c.ngayDenHan?ngayVN(c.ngayDenHan):'……/……/………'))],{thut:567}));
  P.push(wP([wR('Tổng số nợ phải trả ngân hàng đến ngày '+(c.denNgay?ngayVN(c.denNgay):'……/……/………'))],{thut:567}));
  P.push(wP([wR('- Nợ gốc: '+(c.noGoc?tdnTien(c.noGoc):'………………')+' đồng;          - Nợ lãi: '+(c.noLai?tdnTien(c.noLai):'………………')+' đồng;')],{thut:567}));
  var muc = function(so, tit, nd){ P.push(wP([wR(so+'. '+tit+': ',{b:1}), wR(nd || '')],{thut:567})); if(!nd){ P.push(wP([wR(Array(130).join('.'))])); P.push(wP([wR(Array(130).join('.'))])); } };
  muc(2, 'Nguyên nhân không trả được nợ', c.nguyenNhan);
  muc(3, 'Thực trạng tình hình kinh tế và khả năng trả nợ của khách hàng', c.thucTrang);
  muc(4, 'Cam kết của khách hàng (hoặc người trả nợ thay)', c.camKet);
  muc(5, 'Kiến nghị biện pháp xử lý nợ', c.kienNghi);
  P.push(wP([wR('Buổi làm việc kết thúc cùng ngày, đã được đọc lại cho những người có tên nghe, thống nhất với các nội dung trong Biên bản và cùng ký tên dưới đây.')],{thut:567,sau:240}));
  P.push(wBangKy(['KH vay vốn','Tổ TK&VV','Đại diện '+(c.hoi||'………'),'Đại diện ………']));
  return P.join('');
}
function taoDocx(than){
  var enc = function(t){ return new Blob([t], {type:'application/xml'}); };
  var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+than+
    '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1701" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>';
  var kieu = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'+
    '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman" w:eastAsia="Times New Roman"/><w:sz w:val="26"/><w:szCs w:val="26"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault>'+
    '<w:pPrDefault><w:pPr><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>';
  return taoZip([
    {ten:'[Content_Types].xml', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'+
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>')},
    {ten:'_rels/.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')},
    {ten:'word/_rels/document.xml.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>')},
    {ten:'word/document.xml', b:enc(doc)},
    {ten:'word/styles.xml', b:enc(kieu)}
  ]).then(function(z){ return new Blob([z], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); });
}
/* ---------- 🧾 PHIẾU THÔNG TIN MÓN VAY (3.66 · việc AI) — "sơ yếu lý lịch" món nợ xấu ----------
   Trang đầu tóm tắt đọc 30 giây (số chính · nhãn tình trạng · khả năng thu · hướng xử lý · việc tiếp theo · dòng thời gian),
   sau đó I–VI chi tiết. Chỉ dựng từ dữ liệu đã có — mục nào trống in "chưa có". In thẳng hoặc ra Word (.docx). */
var TDN_KQ = {giu:'✓ giữ đúng', that:'✗ thất hứa'};
function tdnCoCamKet(l){ return !!(l.camKet || l.camKetTien || l.camKetHan); }
function tdnHua(kuoc){
  var ds = NO.lan.filter(function(l){ return l.kuoc===kuoc && tdnCoCamKet(l); });
  var giu = ds.filter(function(l){ return l.ketQua==='giu'; }).length, that = ds.filter(function(l){ return l.ketQua==='that'; }).length;
  return {tong:ds.length, giu:giu, that:that, cho:ds.length-giu-that};
}
function tdnHuaChu(h){ return !h.tong ? '' : (h.giu+h.that ? 'Thất hứa '+h.that+'/'+(h.giu+h.that)+' lần' : '')+(h.cho ? (h.giu+h.that?' · ':'')+h.cho+' cam kết đang chờ' : ''); }
function tdnDatKQ(id, v){
  var l = NO.lan.find(function(x){ return x.id===id; }); if(!l) return;
  l.ketQua = l.ketQua===v ? '' : v; l.suaLuc = new Date().toISOString();
  luuNo(); veGhiChu();
}
/* bản số liệu mới nhất của món trong 1 danh sách (kể cả đã ra khỏi DS) */
function tdnSLCuoi(m, L){ var cc = tdnCacKy(m, L); if(!cc.length) return null; var k = cc[cc.length-1]; return {ky:k, s:m.loai[L].ky[k], dang:tdnDangCo(m, L)}; }
function tdnViecTiep(m){
  var hn = ngayISO(nay());
  var ck = NO.lan.filter(function(l){ return l.kuoc===m.kuoc && l.camKetHan && !l.ketQua; }).sort(function(a,b){ return a.camKetHan<b.camKetHan?-1:1; })[0];
  if(ck) return (ck.camKetHan<hn ? 'Đã quá hạn cam kết — ' : '')+'Thu theo cam kết'+(ck.camKetTien?' '+tdnTien(ck.camKetTien)+' đ':'')+', hạn '+ngayVN(ck.camKetHan);
  var pa = ((NO.ho[m.maKH]||{}).tt||{}).phuongAn;
  if(pa && pa.han) return 'Thực hiện phương án'+((pa.chon||[]).length?' ('+pa.chon.join(', ')+')':'')+', hạn '+pa.han;
  var l0 = tdnLanCua(m.kuoc)[0];
  if(!l0) return 'Chưa làm việc lần nào — cần lên lịch làm việc với hộ';
  return 'Chưa có hẹn mới — lần làm việc gần nhất '+ngayVN(l0.ngay)+' ('+tdnSoNgay(l0.ngay, hn)+' ngày trước)';
}
function tdnBoIco(t){ return String(t||'').replace(/^[^\wÀ-ỹĐđ]+\s*/, ''); }
function tdnNgayDL(d){ return !d ? '' : d.length===7 ? tdnKyVN(d) : ngayVN(d); }

/* dữ liệu phiếu — dùng chung cho bản in (HTML) và bản Word */
function tdnPhieuDL(m){
  var hn = ngayISO(nay()), ho = NO.ho[m.maKH] || {tt:{}, file:[]}, tt = ho.tt || {}, db = tdnDB(m), C = {};
  ['khd','nqh','nk'].forEach(function(k){ var c = tdnSLCuoi(m, k); if(c) C[k] = c; });
  var sk = C.khd ? C.khd.s : {}, KC = '(chưa có)';
  var tom = function(k){ var M = TDN_MUC.find(function(x){ return x.k===k; }); return tt[k] ? tdnTomMuc(M, tt[k]) : ''; };
  /* số chính: giá trị + kỳ số liệu */
  var soDS = function(L, f, fKhd){
    if(C[L]) return C[L].dang ? [tdnTien(C[L].s[f])+' đ', tdnKyVN(C[L].ky)] : ['0 đ', 'đã ra DS từ '+tdnKyVN(tdnThangSau(C[L].ky))];
    if(C.khd && fKhd) return [tdnTien(sk[fKhd])+' đ', tdnKyVN(C.khd.ky)];
    return [KC, ''];
  };
  var so = [['Dư nợ'].concat(C.khd ? [tdnTien(sk.dn)+' đ', tdnKyVN(C.khd.ky)] : [KC, 'chỉ có ở DS 3 tháng KHD']),
    ['Nợ quá hạn'].concat(soDS('nqh', 'qh', 'qh')), ['Nợ khoanh'].concat(soDS('nk', 'kh', 'kh')),
    ['Lãi tồn'].concat(C.khd ? [tdnTien(sk.lt)+' đ', tdnKyVN(C.khd.ky)] : [KC, ''])];
  /* nhãn tình trạng */
  var nhan = [];
  if(C.nqh && C.nqh.dang){ var q = C.nqh.s; var nq = q.ncq ? Math.max(0, tdnSoNgay(q.ncq, tdnCuoiKy(C.nqh.ky))) : -1;
    nhan.push(['do', 'QUÁ HẠN'+(nq<0 ? '' : nq<60 ? ' '+nq+' ngày' : ' '+Math.floor(nq/30.44)+' tháng')]); }
  if(C.nk && C.nk.dang) nhan.push(['do', 'NỢ KHOANH'+(C.nk.s.nhh ? ' đến '+ngayVN(C.nk.s.nhh) : '')]);
  if(C.khd && C.khd.dang) nhan.push(['vg', sk.ngd ? Math.floor(tdnSoNgay(sk.ngd, tdnCuoiKy(C.khd.ky))/30.44)+' THÁNG KHÔNG GIAO DỊCH' : 'KHÔNG GIAO DỊCH']);
  ['khd','nqh','nk'].forEach(function(k){ if(C[k] && !C[k].dang) nhan.push(['xam', 'Đã ra DS '+TDN_LOAI[k].ten+' từ '+tdnKyVN(tdnThangSau(C[k].ky))]);
    var p = tdnPhatSinhLai(m, k); if(p) nhan.push(['vg', '↻ Phát sinh lại DS '+TDN_LOAI[k].ten+' '+p+' lần']); });
  var hua = tdnHua(m.kuoc), hc = tdnHuaChu(hua); if(hc) nhan.push([hua.that ? 'do' : 'xa', hc]);
  /* dòng thời gian */
  var ev = [], da = {};
  var ad = function(d, t, k){ if(d && !da[d+t]){ da[d+t] = 1; ev.push({d:d, t:t, k:k||''}); } };
  if(sk.nv) ad(sk.nv, 'Giải ngân món vay '+tdnCT(m));
  if(sk.dh) ad(sk.dh, sk.dh<=hn ? 'Đến hạn trả nợ gốc' : 'Hạn trả nợ gốc (sắp tới)', sk.dh>hn ? 'toi' : '');
  if(sk.ngd) ad(sk.ngd, 'Giao dịch gần nhất (theo sao kê)');
  ['khd','nqh','nk'].forEach(function(L){
    var cc = tdnCacKy(m, L), ten = TDN_LOAI[L].ten; if(!cc.length) return;
    cc.forEach(function(k, i){
      var s = m.loai[L].ky[k];
      if(L==='nqh' && s.ncq) ad(s.ncq, 'Chuyển nợ quá hạn', 'do');
      if(L==='nk'){ if(s.nhl) ad(s.nhl, 'Khoanh nợ có hiệu lực'+(s.nn?' — '+s.nn:''), 'do'); if(s.nhh) ad(s.nhh, s.nhh>hn ? 'Hết hạn khoanh (sắp tới)' : 'Hết hạn khoanh', s.nhh>hn ? 'toi' : ''); }
      if(i===0) ad(k, 'Vào DS '+ten, 'do');
      else if(tdnThangSau(cc[i-1])!==k) ad(k, '↻ Phát sinh lại DS '+ten, 'do');
      if(i<cc.length-1 && tdnThangSau(k)!==cc[i+1]) ad(tdnThangSau(k), 'Ra khỏi DS '+ten, 'xanh');
    });
    if(!C[L].dang) ad(tdnThangSau(cc[cc.length-1]), 'Ra khỏi DS '+ten, 'xanh');
  });
  var lan = tdnLanCua(m.kuoc).slice().reverse(), tongThu = 0;
  lan.forEach(function(l){
    tongThu += +l.thu || 0;
    ad(l.ngay, 'Làm việc ('+(l.hinhThuc||'')+')'+(l.thu ? ' · thu '+tdnTien(l.thu)+' đ' : '')+(l.trangThai ? ' · '+l.trangThai : ''), l.thu ? 'xanh' : '');
    if(tdnCoCamKet(l)) ad(l.camKetHan || l.ngay, 'Hạn cam kết'+(l.camKetTien?' '+tdnTien(l.camKetTien)+' đ':'')+' — '+(l.ketQua ? TDN_KQ[l.ketQua] : (l.camKetHan && l.camKetHan>hn ? 'sắp tới' : 'chưa đánh giá')),
      l.ketQua==='that' ? 'do' : l.ketQua==='giu' ? 'xanh' : 'toi');
  });
  ev.sort(function(a, b){ return a.d<b.d ? -1 : a.d>b.d ? 1 : 0; });
  /* II. tình trạng ở 3 danh sách */
  var dsTT = ['khd','nqh','nk'].map(function(L){
    var cc = tdnCacKy(m, L), T = TDN_LOAI[L];
    if(!cc.length) return [T.ten, 'Không có trong danh sách'];
    var c = C[L], s = c.s, cuoi = tdnCuoiKy(c.ky), them = [];
    if(L==='khd' && s.ngd) them.push(Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44)+' tháng không GD');
    if(L==='nqh' && s.ncq) them.push('quá hạn '+tdnSoNgay(s.ncq, cuoi)+' ngày', 'TK105 '+tdnTien(s.tk105)+' đ');
    if(L==='nk') them.push('hiệu lực '+ngayVN(s.nhl)+' → '+ngayVN(s.nhh), s.nn ? 'nguyên nhân: '+s.nn : '');
    var p = tdnPhatSinhLai(m, L);
    return [T.ten, (c.dang ? 'Đang có (kỳ '+tdnKyVN(c.ky)+')' : 'Đã ra từ '+tdnKyVN(tdnThangSau(c.ky)))+' · có mặt từ '+tdnKyVN(cc[0])+(p ? ' · phát sinh lại '+p+' lần' : '')+
      (them.filter(Boolean).length ? ' · '+them.filter(Boolean).join(' · ') : '')];
  });
  /* bảng số dư qua các tháng — 12 kỳ gần nhất */
  var ky = {}; ['khd','nqh','nk'].forEach(function(L){ tdnCacKy(m, L).forEach(function(k){ ky[k] = 1; }); });
  var dsKy = Object.keys(ky).sort(), bot = dsKy.length>12 ? dsKy.length-12 : 0;
  var o = function(L, k, f){ var s = m.loai[L] && m.loai[L].ky && m.loai[L].ky[k]; return s ? tdnTien(s[f]) : '—'; };
  var bangKy = dsKy.slice(bot).map(function(k){ return [tdnKyVN(k), o('khd', k, 'dn'), o('nqh', k, 'qh'), o('nk', k, 'kh')]; });
  /* VI. món khác cùng hộ */
  var monKhac = Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).filter(function(x){ return x.maKH===m.maKH && x.kuoc!==m.kuoc; }).map(function(x){
    return [x.kuoc, tdnCT(x), ['khd','nqh','nk'].filter(function(L){ return x.loai && x.loai[L]; }).map(function(L){ return TDN_LOAI[L].ten+(tdnDangCo(x, L)?'':' (đã ra)'); }).join(', ')]; });
  var vt = ho.viTri, nv = tt.nguoiVay || {}, kn = (tt.khaNang||{}).chon || [];
  return {
    ten:m.ten||m.maKH, ngayLap:ngayVN(hn), kuoc:m.kuoc,
    so:so, nhan:nhan, khaNang:kn[0] || 'Chưa đánh giá', huong:tom('phuongAn') || 'Chưa có', viecTiep:tdnViecTiep(m), ev:ev,
    kh:[['Họ tên', m.ten||KC], ['Mã khách hàng', m.maKH||KC], ['Địa chỉ', [db.ap, db.xa].join(', ')], ['Điểm giao dịch', db.diem],
      ['Tổ TK&VV', (m.toTen ? 'Tổ trưởng '+m.toTen : '')+(m.maTo ? ' (mã '+m.maTo+')' : '') || KC], ['Hội đoàn thể', tdnHoi(m.dvut) || KC], ['SĐT liên hệ', nv.sdt || KC],
      ['Vị trí nhà', vt ? [vt.lat ? vt.lat.toFixed(6)+', '+vt.lng.toFixed(6) : (vt.link||''), vt.ghi||''].filter(Boolean).join(' · ') : KC]],
    mon:[['Số khế ước', m.kuoc], ['Chương trình', tdnCTDai(m)], ['Ngày giải ngân', sk.nv ? ngayVN(sk.nv) : KC],
      ['Ngày đến hạn', sk.dh ? ngayVN(sk.dh)+(sk.dhgd && sk.dhgd!==sk.dh ? ' · hạn GDX '+ngayVN(sk.dhgd) : '') : KC],
      ['Dư nợ / quá hạn / khoanh', so.slice(0,3).map(function(x){ return x[1]; }).join(' / ')], ['Lãi tồn / đã thu', C.khd ? tdnTien(sk.lt)+' / '+tdnTien(sk.ldt)+' đ' : KC],
      ['Ngày giao dịch gần nhất', sk.ngd ? ngayVN(sk.ngd) : KC]],
    dsTT:dsTT, bangKy:bangKy, bangKyBot:bot,
    muc:TDN_MUC.map(function(M){ var v = tt[M.k]; return [tdnBoIco(M.ten), v ? tdnTomMuc(M, v) : '', v && v.luc ? ngayVN(v.luc.slice(0,10)) : '']; }),
    lan:lan.map(function(l){ return [ngayVN(l.ngay), l.hinhThuc||'', [l.thucTrang, l.kienNghi ? 'Kiến nghị: '+l.kienNghi : ''].filter(Boolean).join('. '),
      tdnCoCamKet(l) ? [l.camKet, l.camKetTien ? tdnTien(l.camKetTien)+' đ' : '', l.camKetHan ? 'hạn '+ngayVN(l.camKetHan) : ''].filter(Boolean).join(', ')+' — '+(l.ketQua ? TDN_KQ[l.ketQua] : 'chờ') : '',
      l.thu ? tdnTien(l.thu) : '', l.trangThai||'']; }),
    tongThu:tongThu,
    file:(ho.file||[]).map(function(f){ return [TDN_NHOM_FILE[f.nhom] || 'Khác', f.k && f.k!=='rieng' ? tenFileBo(f) : f.ten]; }),
    monKhac:monKhac, nhanXet:tom('phuongAn')
  };
}

/* ---- bản in (HTML A4) ---- */
var PHIEU_CSS = '@page{size:A4;margin:14mm 14mm 14mm 18mm}body{font-family:"Times New Roman",serif;font-size:12.5pt;color:#000;margin:0}'+
  '.phieu+.phieu{page-break-before:always}h1{font-size:15pt;text-align:center;margin:0 0 2px}.phu{text-align:center;font-size:11pt;margin-bottom:8px}'+
  '.tom{border:1.5px solid #000;padding:6px 9px;margin-bottom:8px}.tom-ten{font-size:13.5pt;font-weight:bold}.tom-dc{font-size:11pt;margin-bottom:4px}'+
  '.so{display:flex;border:1px solid #777;margin:4px 0}.so div{flex:1;padding:3px 5px;border-left:1px solid #777}.so div:first-child{border-left:0}'+
  '.so small{display:block;font-size:9.5pt;color:#444}.so b{font-size:12.5pt}.nhan{margin:5px 0}.nhan span{display:inline-block;border:1px solid #000;border-radius:3px;padding:0 5px;margin:0 4px 3px 0;font-size:10.5pt;font-weight:bold}'+
  '.nhan .do{background:#fde2df}.nhan .vg{background:#fff1c2}.nhan .xa{background:#e6f0fb}.nhan .xam{background:#eee;font-weight:normal}'+
  '.dong{margin:2px 0}.tiep{border-top:1px dashed #777;margin-top:4px;padding-top:3px;font-weight:bold}'+
  'h2{font-size:12.5pt;margin:10px 0 3px;text-transform:uppercase}table{width:100%;border-collapse:collapse;font-size:11pt}'+
  'td,th{border:1px solid #777;padding:2px 5px;vertical-align:top;text-align:left}th{background:#eee}.kv td:first-child{width:30%;color:#333}'+
  '.tg td:first-child{width:17%;white-space:nowrap}.tg .do td{color:#b3261e}.tg .xanh td{color:#1b6e2a}.tg .toi td{font-style:italic;color:#555}'+
  '.so-p{text-align:right;white-space:nowrap}.chua{color:#666;font-style:italic}.ky{display:flex;justify-content:flex-end;margin-top:14px}.ky div{text-align:center;width:45%}'+
  '.cham{border-bottom:1px dotted #000;height:18px}';
function tdnPhieuHTML(d){
  var e = coChuHTML, kc = function(v){ return v ? e(v) : '<span class="chua">chưa có</span>'; };
  var kv = function(ds){ return '<table class="kv">'+ds.map(function(r){ return '<tr><td>'+e(r[0])+'</td><td>'+(/^\(chưa có\)$/.test(r[1]) ? kc('') : e(r[1]))+'</td></tr>'; }).join('')+'</table>'; };
  var bang = function(dau, ds, soCot){ return '<table><tr>'+dau.map(function(x){ return '<th>'+e(x)+'</th>'; }).join('')+'</tr>'+ds.map(function(r){
    return '<tr>'+r.map(function(c, i){ return '<td'+((soCot||[]).indexOf(i)>=0?' class="so-p"':'')+'>'+e(c)+'</td>'; }).join('')+'</tr>'; }).join('')+'</table>'; };
  var h = '<div class="phieu"><h1>PHIẾU THÔNG TIN MÓN VAY</h1><div class="phu">Khế ước số '+e(d.kuoc)+' · lập ngày '+e(d.ngayLap)+'</div>';
  h += '<div class="tom"><div class="tom-ten">'+e(d.ten)+'</div><div class="tom-dc">'+e(d.kh[1][1]+' · '+d.kh[2][1]+' · '+d.kh[4][1])+'</div>'+
    '<div class="so">'+d.so.map(function(x){ return '<div><small>'+e(x[0])+(x[2]?' · '+e(x[2]):'')+'</small><b>'+e(x[1])+'</b></div>'; }).join('')+'</div>'+
    (d.nhan.length ? '<div class="nhan">'+d.nhan.map(function(x){ return '<span class="'+x[0]+'">'+e(x[1])+'</span>'; }).join('')+'</div>' : '')+
    '<div class="dong"><b>Khả năng thu hồi:</b> '+e(d.khaNang)+'</div><div class="dong"><b>Hướng xử lý:</b> '+e(d.huong)+'</div>'+
    '<div class="tiep">▶ Việc tiếp theo: '+e(d.viecTiep)+'</div></div>';
  h += '<h2>Dòng thời gian</h2>'+(d.ev.length ? '<table class="tg">'+d.ev.map(function(x){ return '<tr class="'+x.k+'"><td>'+e(tdnNgayDL(x.d))+'</td><td>'+e(x.t)+'</td></tr>'; }).join('')+'</table>' : '<div class="chua">chưa có</div>');
  h += '<h2>I. Khách hàng</h2>'+kv(d.kh);
  h += '<h2>II. Món vay</h2>'+kv(d.mon)+'<div style="height:4px"></div>'+bang(['Danh sách','Tình trạng'], d.dsTT)+
    (d.bangKy.length ? '<div style="height:4px"></div>'+bang(['Kỳ','Dư nợ (3T KHD)','Quá hạn','Khoanh'], d.bangKy, [1,2,3])+(d.bangKyBot?'<div class="chua">(chỉ in 12 kỳ gần nhất)</div>':'') : '');
  h += '<h2>III. Hồ sơ hộ vay</h2>'+'<table class="kv">'+d.muc.map(function(r){ return '<tr><td>'+e(r[0])+(r[2]?'<br><small>cập nhật '+e(r[2])+'</small>':'')+'</td><td>'+kc(r[1])+'</td></tr>'; }).join('')+'</table>';
  h += '<h2>IV. Quá trình làm việc</h2>'+(d.lan.length ? bang(['Ngày','Hình thức','Nội dung chính','Cam kết','Đã thu','Trạng thái'], d.lan, [4])+
    '<div class="dong" style="text-align:right"><b>Tổng đã thu: '+tdnTien(d.tongThu)+' đ</b></div>' : '<div class="chua">chưa có lần làm việc nào</div>');
  h += '<h2>V. Tài liệu đã có</h2>'+(d.file.length ? bang(['Loại','Tên tài liệu'], d.file) : '<div class="chua">chưa có</div>');
  h += '<h2>VI. Món khác cùng hộ</h2>'+(d.monKhac.length ? bang(['Số khế ước','Chương trình','Danh sách'], d.monKhac) : '<div>Không có</div>');
  h += '<h2>Nhận xét, đề xuất</h2>'+(d.nhanXet ? '<div>'+e(d.nhanXet)+'</div>' : '')+'<div class="cham"></div><div class="cham"></div><div class="cham"></div>'+
    '<div class="ky"><div><i>Ngày …… tháng …… năm ……</i><br><b>NGƯỜI LẬP</b><br><br><br><br></div></div></div>';
  return h;
}
function tdnPhieuTrang(than, tieuDe){
  return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>'+coChuHTML(tieuDe)+'</title><style>'+PHIEU_CSS+'</style></head><body>'+than+'</body></html>';
}

/* ---- bản Word ---- */
function wBang(dau, ds, rong, o){
  o = o||{}; var tong = o.tong||9071, w = rong.map(function(x){ return Math.round(tong*x); });
  var vien = '<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(function(k){ return '<w:'+k+' w:val="single" w:sz="4" w:space="0" w:color="777777"/>'; }).join('')+'</w:tblBorders>';
  var o1 = function(t, j, dam, nen){ return '<w:tc><w:tcPr><w:tcW w:w="'+w[j]+'" w:type="dxa"/>'+(nen?'<w:shd w:val="clear" w:color="auto" w:fill="'+nen+'"/>':'')+'</w:tcPr>'+
    String(t==null?'':t).split('\n').map(function(x){ return wP([wR(x, {b:dam, sz:o.sz||22})], {sau:0, line:260, jc:(o.phai||[]).indexOf(j)>=0 ? 'right' : 'left'}); }).join('')+'</w:tc>'; };
  return '<w:tbl><w:tblPr><w:tblW w:w="'+tong+'" w:type="dxa"/>'+vien+'<w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+
    w.map(function(x){ return '<w:gridCol w:w="'+x+'"/>'; }).join('')+'</w:tblGrid>'+
    (dau ? '<w:tr>'+dau.map(function(t, j){ return o1(t, j, 1, 'EEEEEE'); }).join('')+'</w:tr>' : '')+
    ds.map(function(r){ return '<w:tr>'+r.map(function(t, j){ return o1(t, j, o.dam0 && j===0); }).join('')+'</w:tr>'; }).join('')+'</w:tbl>';
}
function tdnPhieuDocx(d){
  var P = [], h2 = function(t){ P.push(wP([wR(t.toUpperCase(), {b:1})], {tr:160, sau:60})); };
  var chua = function(v){ return v || 'chưa có'; };
  P.push(wP([wR('PHIẾU THÔNG TIN MÓN VAY', {b:1, sz:30})], {jc:'center', sau:0}));
  P.push(wP([wR('Khế ước số '+d.kuoc+' · lập ngày '+d.ngayLap, {i:1, sz:22})], {jc:'center', sau:120}));
  /* khung tóm tắt: bảng 1 ô */
  var tom = [wP([wR(d.ten, {b:1, sz:28})], {sau:0}), wP([wR(d.kh[1][1]+' · '+d.kh[2][1]+' · '+d.kh[4][1], {sz:22})], {sau:60})].join('')+
    wBang(null, [d.so.map(function(x){ return x[0]+(x[2]?' · '+x[2]:'')+'\n'+x[1]; })], [.25,.25,.25,.25], {sz:22, tong:8780})+
    (d.nhan.length ? wP([wR('Tình trạng: ', {b:1}), wR(d.nhan.map(function(x){ return '['+x[1]+']'; }).join('  '))], {tr:60, sau:0}) : '')+
    wP([wR('Khả năng thu hồi: ', {b:1}), wR(d.khaNang)], {sau:0})+wP([wR('Hướng xử lý: ', {b:1}), wR(d.huong)], {sau:0})+
    wP([wR('▶ Việc tiếp theo: '+d.viecTiep, {b:1})], {tr:60, sau:0});
  P.push('<w:tbl><w:tblPr><w:tblW w:w="9071" w:type="dxa"/><w:tblBorders>'+['top','left','bottom','right'].map(function(k){ return '<w:'+k+' w:val="single" w:sz="12" w:space="0" w:color="000000"/>'; }).join('')+
    '</w:tblBorders><w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>'+
    '<w:tblGrid><w:gridCol w:w="9071"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="9071" w:type="dxa"/></w:tcPr>'+tom+'<w:p/></w:tc></w:tr></w:tbl>');
  h2('Dòng thời gian');
  P.push(d.ev.length ? wBang(null, d.ev.map(function(x){ return [tdnNgayDL(x.d), x.t]; }), [.17,.83]) : wP('chưa có'));
  h2('I. Khách hàng'); P.push(wBang(null, d.kh.map(function(r){ return [r[0], r[1]==='(chưa có)' ? 'chưa có' : r[1]]; }), [.3,.7]));
  h2('II. Món vay'); P.push(wBang(null, d.mon.map(function(r){ return [r[0], r[1]==='(chưa có)' ? 'chưa có' : r[1]]; }), [.3,.7]));
  P.push(wP('', {sau:0})); P.push(wBang(['Danh sách','Tình trạng'], d.dsTT, [.22,.78]));
  if(d.bangKy.length){ P.push(wP('', {sau:0})); P.push(wBang(['Kỳ','Dư nợ (3T KHD)','Quá hạn','Khoanh'], d.bangKy, [.16,.28,.28,.28], {phai:[1,2,3]})); if(d.bangKyBot) P.push(wP([wR('(chỉ in 12 kỳ gần nhất)', {i:1, sz:22})])); }
  h2('III. Hồ sơ hộ vay'); P.push(wBang(null, d.muc.map(function(r){ return [r[0]+(r[2]?'\ncập nhật '+r[2]:''), chua(r[1])]; }), [.3,.7]));
  h2('IV. Quá trình làm việc');
  if(d.lan.length){ P.push(wBang(['Ngày','Hình thức','Nội dung chính','Cam kết','Đã thu','Trạng thái'], d.lan, [.11,.14,.32,.2,.1,.13], {phai:[4], sz:20}));
    P.push(wP([wR('Tổng đã thu: '+tdnTien(d.tongThu)+' đ', {b:1})], {jc:'right'})); }
  else P.push(wP([wR('chưa có lần làm việc nào', {i:1})]));
  h2('V. Tài liệu đã có'); P.push(d.file.length ? wBang(['Loại','Tên tài liệu'], d.file, [.28,.72]) : wP([wR('chưa có', {i:1})]));
  h2('VI. Món khác cùng hộ'); P.push(d.monKhac.length ? wBang(['Số khế ước','Chương trình','Danh sách'], d.monKhac, [.2,.3,.5]) : wP('Không có'));
  h2('Nhận xét, đề xuất'); if(d.nhanXet) P.push(wP(d.nhanXet));
  for(var i=0;i<3;i++) P.push(wP([wR(Array(130).join('.'))]));
  P.push(wBangKy(['', 'NGƯỜI LẬP']));
  return P.join('');
}
var W_NGAT_TRANG = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
function giaoFile(bl, ten){
  var f = new File([bl], ten, {type:bl.type});
  if(!laMayBan() && navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
  var a = document.createElement('a'), u = URL.createObjectURL(bl); a.href = u; a.download = ten; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(u); }, 5000);
}

/* ---- mở phiếu: 1 món (xem trước trong hộp) hoặc cả nhánh đang lọc ---- */
var PHIEU = {ds:[], ten:''};
function tdnPhieu(kuoc){
  var m = NO.mon[kuoc]; if(!m) return;
  PHIEU = {ds:[kuoc], ten:'Phieu TT mon vay - '+boDauTen(m.ten)+' - '+kuoc};
  var trang = tdnPhieuTrang(tdnPhieuHTML(tdnPhieuDL(m)), 'Phiếu thông tin món vay — '+m.ten);
  moHop('<div class="hop-tit">🧾 Phiếu thông tin món vay — '+coChuHTML(m.ten)+'</div>'+
    '<iframe class="phieu-xem" id="phieu-xem"></iframe>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button><button class="nho" onclick="tdnPhieuWord()">📄 Ra Word</button><button class="nho chinh" onclick="tdnPhieuIn()">🖨 In</button></div>', true);
  var f = document.getElementById('phieu-xem'); xemChuan(f, trang);
}
function tdnPhieuNhanh(){
  var L = TDN.loai, ds = tdnDSLoai(L); if(!ds.length) return bao('Không có món nào đang hiện để in.', 4);
  var C = TDN.cay, nhanh = C ? [C.xa, C.diem, C.ap, C.to ? 'Tổ '+C.to : ''].filter(Boolean).join(' › ') : 'toàn bộ danh sách';
  ds.sort(function(a, b){ var x = tdnDB(a), y = tdnDB(b); return (x.xa+x.diem+x.ap+x.maTo+(a.ten||'')).localeCompare(y.xa+y.diem+y.ap+y.maTo+(b.ten||''), 'vi'); });
  PHIEU = {ds:ds.map(function(m){ return m.kuoc; }), ten:'Phieu TT mon vay - '+boDauTen(TDN_LOAI[L].ten+' '+(C ? nhanh : ''))+' - '+ds.length+' mon'};
  moHop('<div class="hop-tit">🧾 In phiếu thông tin — '+ds.length+' món</div>'+
    '<div class="hop-phu">'+coChuHTML(TDN_LOAI[L].ten)+' · '+coChuHTML(nhanh)+' · '+(TDN.loc==='dang'?'đang có':TDN.loc==='ra'?'đã ra khỏi DS':'tất cả')+(TDN.tim?' · tìm "'+coChuHTML(TDN.tim)+'"':'')+
      '. Mỗi món 1 phiếu (sang trang mới), xếp theo Xã › Điểm › Ấp › Tổ. Muốn in ít hơn: chọn một nhánh ở 🌳 Cây địa bàn hoặc gõ tìm trước.</div>'+
    (ds.length>40 ? '<div class="huong-dan">⚠ '+ds.length+' phiếu — khá nhiều giấy, nên chọn một nhánh nhỏ hơn.</div>' : '')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi (Esc)</button><button class="nho" onclick="tdnPhieuWord()">📄 Ra Word</button><button class="nho chinh" onclick="tdnPhieuIn()">🖨 In '+ds.length+' phiếu</button></div>', true);
}
function tdnPhieuMon(){ return PHIEU.ds.map(function(k){ return NO.mon[k]; }).filter(Boolean); }
function tdnPhieuIn(){
  var ds = tdnPhieuMon(); if(!ds.length) return;
  var html = tdnPhieuTrang(ds.map(function(m){ return tdnPhieuHTML(tdnPhieuDL(m)); }).join(''), 'Phiếu thông tin món vay');
  inBlob(new Blob([html], {type:'text/html'}), PHIEU.ten+'.html');
}
function tdnPhieuWord(){
  var ds = tdnPhieuMon(); if(!ds.length) return;
  var ten = PHIEU.ten+'.docx';
  taoDocx(ds.map(function(m){ return tdnPhieuDocx(tdnPhieuDL(m)); }).join(W_NGAT_TRANG)).then(function(bl){
    giaoFile(bl, ten);
    bao('Đã tạo '+ten+' — mở bằng Word để sửa, in.', 7);
  });
}
/* ---------- 🖨 DANH SÁCH CHI TIẾT + TỔNG HỢP THEO XÃ, ĐIỂM GD (3.67 · việc AH) ----------
   Chi tiết: đúng lọc đang xem (loại, Đang có / Đã ra / Tất cả, nhánh cây, ô tìm), gom Xã › Điểm GD › Ấp, xếp theo tổ; dòng cộng từng nhóm + tổng cộng.
   Tổng hợp: 3 danh sách cạnh nhau (món đang có ở kỳ mới nhất), theo Xã › Điểm GD + tổng PGD. In A4 ngang hoặc Xuất Excel. */
var TDN_IN = {kieu:'ct'};
var TDN_TIEN = {khd:'Dư nợ', nqh:'Dư nợ quá hạn', nk:'Dư nợ khoanh'};
var TDN_MOC = {khd:'Ngày GD gần nhất', nqh:'Ngày chuyển QH', nk:'Ngày hết hạn khoanh'};
function tdnMocMon(m, L, s){
  if(!s) return '';
  var cuoi = tdnCuoiKy(tdnKyMoi(L) || tdnCacKy(m, L).slice(-1)[0]);
  if(L==='khd') return s.ngd ? ngayVN(s.ngd)+' ('+Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44)+' th)' : '';
  if(L==='nqh') return s.ncq ? ngayVN(s.ncq)+' ('+tdnSoNgay(s.ncq, cuoi)+' ngày)' : '';
  return s.nhh ? ngayVN(s.nhh) : '';
}
/* dữ liệu chi tiết: [{xa, diem, ap, ds:[dòng]}] đã xếp */
function tdnInCT(){
  var L = TDN.loai, ds = tdnDSLoai(L), nhom = {};
  ds.forEach(function(m){
    var db = tdnDB(m), cc = tdnCacKy(m, L), s = tdnSL(m, L), sx = s || m.loai[L].ky[cc[cc.length-1]];
    var k = db.xa+'\u0001'+db.diem+'\u0001'+db.ap;
    (nhom[k] = nhom[k] || {xa:db.xa, diem:db.diem, ap:db.ap, ds:[]}).ds.push({m:m, to:m.toTen||m.maTo||'', maTo:db.maTo, tien:tdnSoChinh(L, sx),
      moc:tdnMocMon(m, L, sx), tt:tdnTrangThai(m.kuoc, L)+(s ? '' : ' · đã ra DS từ '+tdnKyVN(tdnThangSau(cc[cc.length-1])))});
  });
  var so = function(a, b){ return a.localeCompare(b, 'vi'); };
  return Object.keys(nhom).map(function(k){ return nhom[k]; }).sort(function(a, b){ return so(a.xa, b.xa) || so(a.diem, b.diem) || so(a.ap, b.ap); })
    .map(function(g){ g.ds.sort(function(a, b){ return so(a.maTo, b.maTo) || so(a.m.ten||'', b.m.ten||''); }); return g; });
}
function tdnInMoTa(){
  var C = TDN.cay;
  return [TDN.loc==='dang' ? 'đang có trong DS' : TDN.loc==='ra' ? 'đã ra khỏi DS' : 'tất cả (đang có + đã ra)',
    C ? [C.xa, C.diem, C.ap, C.to ? 'Tổ '+C.to : ''].filter(Boolean).join(' › ') : '', TDN.tim ? 'tìm "'+TDN.tim+'"' : ''].filter(Boolean).join(' · ');
}
/* dữ liệu tổng hợp: [{xa, t:{L:{n,t,c}}, diem:[{ten, t}]}] + tổng */
function tdnInTH(){
  var xa = {}, tong = {};
  var cong = function(o, L, v, chua){ var x = o[L] = o[L] || {n:0, t:0, c:0}; x.n++; x.t += v; if(chua) x.c++; };
  ['khd','nqh','nk'].forEach(function(L){
    if(!tdnKyMoi(L)) return;
    Object.keys(NO.mon).forEach(function(k){
      var m = NO.mon[k], s = tdnSL(m, L); if(!s) return;
      var db = tdnDB(m), v = tdnSoChinh(L, s), chua = tdnTrangThai(m.kuoc, L)==='Chưa làm việc';
      var X = xa[db.xa] = xa[db.xa] || {xa:db.xa, t:{}, dm:{}}, Dm = X.dm[db.diem] = X.dm[db.diem] || {ten:db.diem, t:{}};
      cong(X.t, L, v, chua); cong(Dm.t, L, v, chua); cong(tong, L, v, chua);
    });
  });
  var so = function(a, b){ return a.localeCompare(b, 'vi'); };
  return {tong:tong, xa:Object.keys(xa).sort(so).map(function(k){ var X = xa[k]; X.diem = Object.keys(X.dm).sort(so).map(function(d){ return X.dm[d]; }); return X; })};
}
function tdnInKyChu(){ return ['khd','nqh','nk'].map(function(L){ return tdnKyMoi(L) ? TDN_LOAI[L].ten+' kỳ '+tdnKyVN(tdnKyMoi(L)) : ''; }).filter(Boolean).join(' · '); }

/* ---- bản in ---- */
var TDN_IN_CSS = '@page{size:A4 landscape;margin:10mm 10mm 12mm 12mm}body{font-family:"Times New Roman",serif;font-size:11pt;color:#000;margin:0}'+
  'h1{font-size:14pt;text-align:center;margin:0}.phu{text-align:center;font-size:10.5pt;margin:2px 0 8px}'+
  'table{width:100%;border-collapse:collapse}th,td{border:1px solid #666;padding:2px 4px;vertical-align:top}th{background:#eee;font-size:10pt}'+
  'td.s{text-align:right;white-space:nowrap}td.c{text-align:center}tr.x td{background:#dfe8f3;font-weight:bold}tr.d td{background:#eef3f9;font-weight:bold}tr.a td{background:#f6f6f6;font-style:italic}'+
  'tr.tc td{background:#ddd;font-weight:bold}tr.dm td:first-child{padding-left:16px}thead{display:table-header-group}tr{page-break-inside:avoid}'+
  '.ky{display:flex;justify-content:space-between;margin-top:14px}.ky div{text-align:center;width:40%}';
function tdnInHTML(kieu){
  var e = coChuHTML, t = tdnTien, h = '';
  if(kieu==='ct'){
    var L = TDN.loai, G = tdnInCT(), ky = tdnKyMoi(L), n = 0, tong = 0;
    h += '<h1>DANH SÁCH '+e(TDN_LOAI[L].dai.toUpperCase())+(ky ? ' ĐẾN NGÀY '+ngayVN(tdnCuoiKy(ky)) : '')+'</h1><div class="phu">'+e(tdnInMoTa())+'</div>';
    h += '<table><thead><tr><th>STT</th><th>Họ tên khách hàng</th><th>Mã KH</th><th>Số khế ước</th><th>Tổ trưởng</th><th>Chương trình</th><th>'+TDN_TIEN[L]+'</th><th>'+TDN_MOC[L]+'</th><th>Trạng thái</th><th style="width:15%">Ghi chú</th></tr></thead><tbody>';
    var cXa = '', cDm = '', sum = function(f){ return G.filter(f).reduce(function(a, g){ return [a[0]+g.ds.length, a[1]+g.ds.reduce(function(b, r){ return b+r.tien; }, 0)]; }, [0, 0]); };
    G.forEach(function(g){
      if(g.xa!==cXa){ cXa = g.xa; cDm = ''; var sx = sum(function(z){ return z.xa===g.xa; }); h += '<tr class="x"><td colspan="6">'+e(g.xa)+' — '+sx[0]+' món</td><td class="s">'+t(sx[1])+'</td><td colspan="3"></td></tr>'; }
      if(g.diem!==cDm){ cDm = g.diem; var sd = sum(function(z){ return z.xa===g.xa && z.diem===g.diem; }); h += '<tr class="d"><td colspan="6">Điểm GD '+e(g.diem)+' — '+sd[0]+' món</td><td class="s">'+t(sd[1])+'</td><td colspan="3"></td></tr>'; }
      var sa = g.ds.reduce(function(b, r){ return b+r.tien; }, 0);
      h += '<tr class="a"><td colspan="6">'+e(g.ap)+' — '+g.ds.length+' món</td><td class="s">'+t(sa)+'</td><td colspan="3"></td></tr>';
      g.ds.forEach(function(r){ n++; tong += r.tien;
        h += '<tr><td class="c">'+n+'</td><td>'+e(r.m.ten||'')+'</td><td>'+e(r.m.maKH||'')+'</td><td>'+e(r.m.kuoc)+'</td><td>'+e(r.to)+'</td><td>'+e(tdnCT(r.m))+'</td><td class="s">'+t(r.tien)+'</td><td>'+e(r.moc)+'</td><td>'+e(r.tt)+'</td><td></td></tr>'; });
    });
    h += '<tr class="tc"><td colspan="6">TỔNG CỘNG — '+n+' món</td><td class="s">'+t(tong)+'</td><td colspan="3"></td></tr></tbody></table>';
  } else {
    var T = tdnInTH(), LS = ['khd','nqh','nk'].filter(function(L){ return tdnKyMoi(L); });
    var o3 = function(x){ return LS.map(function(L){ var v = x[L] || {n:0, t:0, c:0}; if(!v.n) return '<td class="s">—</td><td></td><td></td>'; return '<td class="s">'+v.n+'</td><td class="s">'+t(v.t)+'</td><td class="s">'+(v.c||'')+'</td>'; }).join(''); };
    h += '<h1>TỔNG HỢP MÓN VAY CẦN THEO DÕI THEO XÃ, ĐIỂM GIAO DỊCH</h1><div class="phu">'+e(tdnInKyChu())+' · món đang có trong danh sách</div>';
    h += '<table><thead><tr><th rowspan="2">Xã, phường / Điểm giao dịch</th>'+LS.map(function(L){ return '<th colspan="3">'+e(TDN_LOAI[L].ten)+' ('+tdnKyVN(tdnKyMoi(L))+')</th>'; }).join('')+'</tr>'+
      '<tr>'+LS.map(function(){ return '<th>Món</th><th>Số tiền</th><th>Chưa LV</th>'; }).join('')+'</tr></thead><tbody>';
    T.xa.forEach(function(X){
      h += '<tr class="x"><td>'+e(X.xa)+'</td>'+o3(X.t)+'</tr>';
      X.diem.forEach(function(Dm){ h += '<tr class="dm"><td>'+e(Dm.ten)+'</td>'+o3(Dm.t)+'</tr>'; });
    });
    h += '<tr class="tc"><td>TỔNG CỘNG PGD</td>'+o3(T.tong)+'</tr></tbody></table><div class="phu" style="text-align:left">Số tiền: '+
      LS.map(function(L){ return TDN_LOAI[L].ten+' = '+TDN_TIEN[L].toLowerCase(); }).join('; ')+'. "Chưa LV": số món chưa ghi lần làm việc nào. Một món có thể nằm ở nhiều danh sách.</div>';
  }
  h += '<div class="ky"><div></div><div><i>Ngày …… tháng …… năm ……</i><br><b>NGƯỜI LẬP</b></div></div>';
  return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Danh sách</title><style>'+TDN_IN_CSS+'</style></head><body>'+h+'</body></html>';
}
/* ---- Excel ---- */
function tdnInAOA(kieu){
  var a = [];
  if(kieu==='ct'){
    var L = TDN.loai, G = tdnInCT(), ky = tdnKyMoi(L), n = 0, tong = 0, cXa = '', cDm = '';
    a.push(['DANH SÁCH '+TDN_LOAI[L].dai.toUpperCase()+(ky ? ' ĐẾN NGÀY '+ngayVN(tdnCuoiKy(ky)) : '')], [tdnInMoTa()], []);
    a.push(['STT','Xã, phường','Điểm GD','Ấp','Họ tên khách hàng','Mã KH','Số khế ước','Tổ trưởng','Mã tổ','Chương trình',TDN_TIEN[L],TDN_MOC[L],'Trạng thái','Ghi chú']);
    var sum = function(f){ return G.filter(f).reduce(function(x, g){ return [x[0]+g.ds.length, x[1]+g.ds.reduce(function(b, r){ return b+r.tien; }, 0)]; }, [0, 0]); };
    G.forEach(function(g){
      if(g.xa!==cXa){ cXa = g.xa; cDm = ''; var sx = sum(function(z){ return z.xa===g.xa; }); a.push(['', g.xa, '', '', 'Cộng xã: '+sx[0]+' món', '', '', '', '', '', sx[1]]); }
      if(g.diem!==cDm){ cDm = g.diem; var sd = sum(function(z){ return z.xa===g.xa && z.diem===g.diem; }); a.push(['', g.xa, g.diem, '', 'Cộng điểm: '+sd[0]+' món', '', '', '', '', '', sd[1]]); }
      a.push(['', g.xa, g.diem, g.ap, 'Cộng ấp: '+g.ds.length+' món', '', '', '', '', '', g.ds.reduce(function(b, r){ return b+r.tien; }, 0)]);
      g.ds.forEach(function(r){ n++; tong += r.tien; a.push([n, g.xa, g.diem, g.ap, r.m.ten||'', r.m.maKH||'', r.m.kuoc, r.to, r.maTo, tdnCT(r.m), r.tien, r.moc, r.tt, '']); });
    });
    a.push(['', '', '', '', 'TỔNG CỘNG: '+n+' món', '', '', '', '', '', tong]);
  } else {
    var T = tdnInTH(), LS = ['khd','nqh','nk'].filter(function(L){ return tdnKyMoi(L); });
    var o3 = function(x){ var r = []; LS.forEach(function(L){ var v = x[L] || {n:0, t:0, c:0}; r.push(v.n, v.t, v.c); }); return r; };
    a.push(['TỔNG HỢP MÓN VAY CẦN THEO DÕI THEO XÃ, ĐIỂM GIAO DỊCH'], [tdnInKyChu()], []);
    var d1 = ['Xã, phường', 'Điểm giao dịch']; LS.forEach(function(L){ d1.push(TDN_LOAI[L].ten+' — món', TDN_LOAI[L].ten+' — số tiền', TDN_LOAI[L].ten+' — chưa LV'); }); a.push(d1);
    T.xa.forEach(function(X){ a.push([X.xa, 'Cộng xã'].concat(o3(X.t))); X.diem.forEach(function(Dm){ a.push([X.xa, Dm.ten].concat(o3(Dm.t))); }); });
    a.push(['TỔNG CỘNG PGD', ''].concat(o3(T.tong)));
  }
  return a;
}
function tdnInExcel(){
  var kieu = TDN_IN.kieu;
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    if(!window.XLSX) throw new Error('Chưa tải được bộ Excel — có mạng một lần rồi thử lại.');
    var ws = XLSX.utils.aoa_to_sheet(tdnInAOA(kieu)), wb = XLSX.utils.book_new();
    ws['!cols'] = kieu==='ct' ? [5,16,16,16,24,11,15,20,8,12,14,18,22,18].map(function(w){ return {wch:w}; }) : [18,20,8,14,8,8,14,8,8,14,8].map(function(w){ return {wch:w}; });
    XLSX.utils.book_append_sheet(wb, ws, kieu==='ct' ? 'Chi tiet' : 'Tong hop');
    var ten = (kieu==='ct' ? 'DS '+{khd:'3T KHD', nqh:'No qua han', nk:'No khoanh'}[TDN.loai]+' - '+tdnKyVN(tdnKyMoi(TDN.loai)).replace('/', '-') : 'Tong hop theo xa diem GD - '+ngayVN(ngayISO(nay())).replace(/\//g, '-'))+'.xlsx';
    var u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    giaoFile(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), ten);
    bao('Đã xuất '+ten, 5);
  }).catch(function(e){ baoLoi(e.message || String(e)); });
}
function tdnInDS(kieu){
  if(kieu) TDN_IN.kieu = kieu;
  var k = TDN_IN.kieu, n = k==='ct' ? tdnDSLoai(TDN.loai).length : 0;
  moHop('<div class="hop-tit">🖨 Danh sách — Theo dõi nợ</div>'+
    '<div class="hang-nut tdn-in-chon"><span class="tdn-seg">'+[['ct','☰ Chi tiết · '+TDN_LOAI[TDN.loai].ten],['th','Σ Tổng hợp theo xã, điểm GD']].map(function(x){
      return '<button class="'+(k===x[0]?'bat':'')+'" onclick="tdnInDS(\''+x[0]+'\')">'+coChuHTML(x[1])+'</button>'; }).join('')+'</span></div>'+
    '<div class="hop-phu">'+(k==='ct' ? n+' món · '+coChuHTML(tdnInMoTa())+'. Theo đúng lọc đang xem — muốn khác thì đóng hộp, đổi lọc / chọn nhánh 🌳 rồi mở lại.'
      : 'Cả 3 danh sách, món đang có ở kỳ mới nhất (không theo lọc). '+coChuHTML(tdnInKyChu()))+'</div>'+
    '<iframe class="phieu-xem" id="tdn-in-xem"></iframe>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button><button class="nho" onclick="tdnInExcel()">📊 Xuất Excel</button><button class="nho chinh" onclick="tdnInIn()">🖨 In</button></div>', true);
  var f = document.getElementById('tdn-in-xem'); xemChuan(f, tdnInHTML(k));
}
function tdnInIn(){ inBlob(new Blob([tdnInHTML(TDN_IN.kieu)], {type:'text/html'}), 'Danh sach.html'); }
/* ---------- nhắc ở Hôm nay ---------- */
function tdnViecCan(){
  if(!NO_SAN) return {n:0, p:''};
  var hn = ngayISO(nay()), ck = 0, kh = 0;
  NO.lan.forEach(function(l){ if(l.camKetHan && l.camKetHan<=hn && !l.ketQua && !/thu hồi hết/.test(l.trangThai||'') && tdnLanCua(l.kuoc, l.loai)[0]===l) ck++; });
  var ky = tdnKyMoi('nk');
  if(ky) Object.keys(NO.mon).forEach(function(k){ var s = tdnSL(NO.mon[k], 'nk'); if(s && s.nhh && tdnSoNgay(hn, s.nhh)<=183 && tdnSoNgay(hn, s.nhh)>=0) kh++; });
  return {n:ck+kh, p:[ck?ck+' cam kết đến hạn':'', kh?kh+' sắp hết hạn khoanh':''].filter(Boolean).join(' · ')};
}
function veBaoTriTV(){ return ''; }
function veGhiChu(){
  if(tvPhan()==='no'){   /* 3.64: ⚠ Theo dõi nợ */
    document.getElementById('loc-gc').innerHTML = thanhTV();
    document.getElementById('ds-gc').innerHTML = veTheoDoiNo();
    return;
  }
  if(tvPhan()==='bo'){
    document.getElementById('loc-gc').innerHTML = thanhTV();
    document.getElementById('ds-gc').innerHTML = veBoHS();
    return;
  }
  document.getElementById('loc-gc').innerHTML = thanhTV() +
    veDauTab('ghiChu', {kho:D.ghiChu, nhanThem:'Chụp / thêm ghi chú',
                        hamThem:'chonAnh()'});
  var ds = locTheoThe('ghiChu', locChuan('ghiChu', loc(D.ghiChu, tuKhoa))); BOT_DS.ghiChu = ds;
  ds.sort(function(a,b){ return (b.ngay+b.id).localeCompare(a.ngay+a.id); });
  document.getElementById('loc-gc').innerHTML += veThanhSap('ghiChu', null, null, null, '<b>'+ds.length+'</b> ghi chú'+chuDemLoc('ghiChu'));   /* 3.27: hàng 2 như các tab khác · 3.74: kèm số */

  if(!ds.length){
    document.getElementById('ds-gc').innerHTML =
      '<div class="rong">'+(D.ghiChu.length?'Không có ghi chú nào khớp.'
       :'Chưa có ghi chú nào.<br>Bấm <b>+ Thêm file</b> ở góc trên bên trái để chụp hoặc chọn ảnh.')+'</div>';
    return;
  }
  var h = '', ngayTruoc = '';
  ds.forEach(function(m){
    if(m.ngay!==ngayTruoc){
      if(ngayTruoc) h += '</div>';
      var dem = ds.filter(function(x){ return x.ngay===m.ngay; }).length;
      var nhan = m.ngay===ngayISO(nay()) ? 'Hôm nay' : ngayVN(m.ngay);
      h += '<div class="moc"><span class="cham"></span><span class="ngay">'+nhan+
           '</span><span class="p">'+dem+' ảnh</span></div><div class="doc">';
      ngayTruoc = m.ngay;
    }
    h += anhHTML(m, tuKhoa);
  });
  h += '</div>';
  document.getElementById('ds-gc').innerHTML = h;
  ds.forEach(function(m){ napAnh(m.id); });
}
function datLocGC(t){ locGC = (locGC===t)?'':t; ve(); }

function anhHTML(m, q){
  var gan = '';
  if(m.gocVB){
    var g = timMuc(m.gocVB);
    if(g) gan = ' <span class="mini ct">gắn vào '+coChuHTML(g.soHieu||'văn bản')+'</span>';
  }
  return '<div class="anh"'+botAt(m.id)+' onclick="moXem(\''+m.id+'\')">'+
    '<img id="anh-'+m.id+'" alt="">'+
    '<div class="duoi"><div class="mo-ta">'+toSang(m.moTa||'(chưa ghi chú)', q)+'</div>'+
    (m.the||[]).map(function(t){ return '<span class="mini">'+coChuHTML(t)+'</span>'; }).join(' ')+
    gan+'</div></div>';
}
function napAnh(id){
  var e = document.getElementById('anh-'+id);
  if(!e || e.dataset.xong) return;
  docFile(id).then(function(b){
    if(b && e){ e.src = URL.createObjectURL(b); e.dataset.xong='1'; }
  }).catch(function(){});
}

/* vuốt trái hiện Gửi, vuốt phải hiện Sửa */
function ganVuot(){
  var ds = document.querySelectorAll('.vuot-bao');
  for(var i=0;i<ds.length;i++){
    (function(bao){
      if(bao.dataset.gan) return; bao.dataset.gan='1';
      var the = bao.querySelector('.the-vb');
      var x0=0, dx=0, keo=false;
      bao.addEventListener('touchstart', function(e){
        x0 = e.touches[0].clientX; dx = 0; keo = true;
      }, {passive:true});
      bao.addEventListener('touchmove', function(e){
        if(!keo) return;
        dx = e.touches[0].clientX - x0;
        if(Math.abs(dx)>10) the.style.transform = 'translateX('+Math.max(-96,Math.min(96,dx))+'px)';
      }, {passive:true});
      bao.addEventListener('touchend', function(){
        keo = false;
        if(dx < -50) the.style.transform = 'translateX(-96px)';
        else if(dx > 50) the.style.transform = 'translateX(96px)';
        else the.style.transform = '';
      });
      the.addEventListener('click', function(e){
        if(the.style.transform){ e.stopPropagation(); the.style.transform=''; }
      }, true);
    })(ds[i]);
  }
}

function timMuc(id){
  var a = D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]);
  for(var i=0;i<a.length;i++) if(a[i].id===id) return a[i];
  return null;
}

/* ----- dải đáy ----- */
var CUON_TRUOC = 0;
function anDayKhiCuon(){
  var d = document.querySelector('.day'); if(!d) return;
  var y = window.scrollY || document.documentElement.scrollTop || 0;
  d.classList.toggle('an-di', y > CUON_TRUOC + 8 && y > 80);
  CUON_TRUOC = y;
}
function veDay(){
  capNhatDemRac();
  /* 3.39: khung xem cố định; chưa chọn mục thì 3 nút Gửi · In · Sửa mờ đi, không bấm nhầm */
  var cpx = document.getElementById('cotphai'); if(cpx) cpx.classList.toggle('pv-trong', !mucDangXem);
  var s = document.getElementById('so-lieu');
  /* 3.53 (anh chốt): thanh đáy chỉ còn thông báo HỆ THỐNG, một dòng: Drive · chưa lên Drive · lỗi đẩy · bộ nhớ máy */
  var chip = '<span class="chip" id="chip-drive" onclick="bamChip()">● Trong máy</span>'+
    '<span class="chip vang an" id="chip-chua" onclick="bamChipChua()"></span>'+
    '<span class="chip do an" id="chip-loi" onclick="moHangDoiDrive()"></span>'+
    '<span class="chip" id="chip-bn" onclick="moBoNho()">💾 …</span>';
  var btnPV = document.getElementById('btn-mo-preview');
  if(btnPV) btnPV.style.display = (anPV && nganHienTai!==0) ? '' : 'none';
  var t = ['<b>'+(D.cho.length||0)+'</b> việc chờ'+chip,
           '<b>'+D.vanBan.length+'</b> văn bản<br>'+chip,
           '<b>'+D.duLieu.length+'</b> file dữ liệu<br>'+chip,
           '<b>'+D.ghiChu.length+'</b> ghi chú<br>'+chip,
           ('<b>'+(D.scan||[]).length+'</b> bản quét<br>'+chip),
           ('<b>'+(D.bieuMau||[]).length+'</b> biểu mẫu<br>'+chip),
           '<b>'+D.cho.length+'</b> file chờ duyệt<br>'+chip];
  /* số đếm từng tab chuyển lên dòng nút "+ Thêm file" của tab đó (capNhatDemTab); khay chờ duyệt (6) giữ số ở đây */
  s.innerHTML = nganHienTai===6 ? t[6].replace('<br>', ' ') : chip;
  capNhatDemTab();
  if(nganHienTai===0) setTimeout(canCaoSo, 0);

  setTimeout(capNhatChip, 0);
  /* 3.23: mỗi tab có nút "+ Thêm file" ở góc trên trái (kiêm vùng kéo thả) → bỏ nút dải đáy */
  var nc = document.getElementById('nut-chinh');
  nc.textContent = (nganHienTai===6) ? 'Chọn file' : 'Thêm file';
  nc.style.display = (nganHienTai===6) ? '' : 'none';
  var ph = document.getElementById('nut-phu-cho');
  if(nganHienTai===6 && D.cho.length)
    ph.innerHTML = '<button class="nut-phu" onclick="moDanAI()">Dán từ AI</button>'+
                   '<button class="nut-phu" onclick="duyetTatCa()">Duyệt tất cả</button>'+
                   '<button class="nut-phu" onclick="dongKhai()" title="Về tab trước (phím Esc)">✕ Đóng</button>';
  else if(nganHienTai===6 && coTheNoiDrive())
    ph.innerHTML = '<button class="nut-phu" onclick="napKhayCho()">Nạp khay chờ</button>';
  else ph.innerHTML = '';
}
/* ghép toàn bộ PDF của một kỳ thành 1 bản tạm để đọc liền mạch */
function ghepKy(){
  var kys = {};
  D.duLieu.forEach(function(x){ if(x.ky) kys[x.ky]=1; });
  var ds = Object.keys(kys).sort().reverse();
  if(!ds.length) return bao('Chưa có dữ liệu kỳ nào.', 3);
  moHop('<div class="hop-tit">Ghép cả bộ để xem</div>'+
    '<div class="hop-phu">App tạo một bản PDF tạm gộp các báo cáo trong kỳ để anh đọc liền mạch. '+
    'File gốc trên Drive giữ nguyên, không bị đụng tới.</div>'+
    '<div class="o"><label>Chọn kỳ</label><select id="gk-ky">'+
      ds.map(function(k){
        var n = D.duLieu.filter(function(x){ return x.ky===k; }).length;
        return '<option value="'+k+'">'+kyVN(k)+' — '+n+' file</option>';
      }).join('')+'</select></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    '<button class="nho chinh" onclick="lamGhep()">Ghép</button></div>');
}
function lamGhep(){
  var ky = gt('gk-ky'); dongHop();
  if(!window.PDFLib) return baoLoi('Chưa tải được bộ ghép PDF. Kiểm tra mạng rồi thử lại.');
  var ds = D.duLieu.filter(function(x){ return x.ky===ky && /\.pdf$/i.test(x.tenCu||''); });
  if(!ds.length) return bao('Kỳ này không có file PDF nào để ghép.', 4);
  ds.sort(function(a,b){ return (a.tenLoai||'').localeCompare(b.tenLoai||''); });
  bao('Đang ghép '+ds.length+' file…', 4);
  PDFLib.PDFDocument.create().then(function(moi){
    return ds.reduce(function(p, m){
      return p.then(function(){
        return layNoiDung(m).then(function(b){
          if(!b) return;
          return b.arrayBuffer().then(function(buf){
            return PDFLib.PDFDocument.load(buf).then(function(g){
              return moi.copyPages(g, g.getPageIndices()).then(function(tr){
                tr.forEach(function(t){ moi.addPage(t); });
              });
            });
          });
        }).catch(function(e){ console.warn('bỏ qua', m.tenCu, e); });
      });
    }, Promise.resolve()).then(function(){
      if(moi.getPageCount()===0) throw new Error('rong');
      return moi.save();
    });
  }).then(function(bytes){
    var ten = 'TuHoSo_'+ky+'_ca-bo.pdf';
    var bl = new Blob([bytes], {type:'application/pdf'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(bl); a.download = ten; a.click();
    bao('Đã ghép xong bản tạm '+kyVN(ky)+'. Xem xong có thể xóa.', 5);
  }).catch(function(e){
    console.warn(e); baoLoi('Không ghép được — có thể vài file không phải PDF chữ.');
  });
}

/* 3.53: số đếm của tab — cùng dòng nút "+ Thêm file"; đang lọc thì "đang hiện / tổng" */
function capNhatDemTab(){
  var TEN = {vanBan:['văn bản', D.vanBan], duLieu:['file dữ liệu', D.duLieu], ghiChu:['ghi chú', D.ghiChu],
             scan:['bản quét', D.scan||[]], bieuMau:['biểu mẫu', D.bieuMau||[]]};
  Array.prototype.forEach.call(document.querySelectorAll('.dem-tab'), function(e){
    var tab = e.getAttribute('data-tab'), x = TEN[tab]; if(!x) return;
    var tong = x[1].length, hien = BOT_DS[tab] ? BOT_DS[tab].length : tong;
    e.innerHTML = (hien!==tong ? '<b>'+hien+'</b> / '+tong : '<b>'+tong+'</b>')+' '+x[0];
  });
}
function bamChipChua(){
  if(!coTheNoiDrive()) return moCaiDat('drive');
  if(DR.sanSang) return moHangDoiDrive();
  dongBoNgay();
}
function bamChip(){
  if(!DR.online) return bao('Đang mất mạng. Việc đang chờ sẽ tự gửi khi có mạng lại.', 4);
  if(!coTheNoiDrive()) return moCaiDat();
  if(DR.sanSang) return (scanCanDay().length + kaCanDay().length) ? moHangDoiDrive() : dongBoNgay();
  noiDrive();
}

function nutChinh(){
  if(nganHienTai===0) return doiNgan(1);   /* 3.28: tab Hôm nay là bàn làm việc — khai file ở tab Văn bản */
  if(nganHienTai!==6) TAB_TRUOC = nganHienTai;
  if(nganHienTai===3) return chonAnh();
  if(nganHienTai===4){ if(!HS.mo) return moHoSo(); return batDauScan(); }
  if(nganHienTai===5) return themBieuMau();
  var tu = TAB_KHO[nganHienTai] ? nganHienTai : null;
  doiNgan(6);
  THEM_TU = tu;   /* 3.40: nhớ tab vừa bấm Thêm file (sau doiNgan vì doiNgan xóa cờ) */
  document.getElementById('chon-file').click();
}
