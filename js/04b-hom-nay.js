/* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 117–2633 của bản 3.338), không đổi logic — Hôm nay: âm lịch, lịch, 🧰 công cụ (chương trình vay, Hạn trả HSSV, cây địa bàn), số liệu giao ban, chuẩn bị GDX, nhật ký, sổ, tính ngày, đồng bộ lich.json, cấp & phạm vi */
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
    nut:'<button class="nho chinh" onclick="hsChep()" title="Chép câu chốt để dán vào hồ sơ">📋 Chép</button><button class="nho" onclick="hsGhiTodo()" title="Ghi câu chốt vào to-do hôm nay">📝</button><button class="nho" onclick="hsNoi()" title="Nổi — cửa sổ luôn nằm trên trình duyệt / chương trình khác (Chrome, Edge)">📌</button>'},
    /* 3.276 (anh: "nút nổi lên và Esc bố trí gọn tiết kiệm 1 dòng"): 📌 Nổi, ✕ Đóng chỉ biểu tượng — tiêu đề công cụ 1 dòng */
  {id:'diaban', ico:'🗺', ten:'Địa bàn',      tit:'Cây địa bàn — mã xã, điểm GD, ấp/KP', ve:function(){ return ccDiaBanHTML(); }},
  {id:'ctvay',  ico:'📋', ten:'CT vay', tit:'Chương trình vay — tóm tắt đang cho vay · danh mục mã', ve:function(){ return ccCTVHTML(); },
    dau:function(){ return ctvChonHTML(); }},
  /* 3.399: bỏ 📊 Giao ban + 📅 Buổi GD (lấy số từ ⚠ Theo dõi nợ — đã gỡ) */
  {id:'cc6',    ico:'🧰', ten:'Công cụ 6'}
];
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
  var c0 = ccTim(id); if(!c0 || c0.an){ CC.mo = ''; veCC(); return bao('Công cụ '+(c0 ? '“'+c0.ten+'” ' : '')+'đã bỏ — sẽ làm lại sau.', 5); }   /* 3.144 · 3.399: Giao ban / Buổi GD gỡ hẳn (lệnh cũ không vỡ) */
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
    (c.nut||'')+'<button class="nho cc-dong" onclick="ccDong()" title="Đóng (Esc)">✕</button></div>'+
    '<div class="cc-than" id="cc-than">'+(c.ve ? c.ve() : '<div class="huong-dan">Công cụ này <b>đang chuẩn bị</b> — anh gửi nghiệp vụ là em làm tiếp.</div>')+'</div></div>';
}
function veCC(){
  var o = document.getElementById('cc-o'); if(!o) return;
  var c = ccTim(CC.mo);
  ccGonLich(c && !c.an);
  if(!c || c.an){ o.innerHTML = ''; return; }   /* 3.144 */
  if(c.hop || (window.matchMedia && !window.matchMedia('(min-width:900px)').matches)){
    /* điện thoại: mở thành hộp, không giữ trạng thái "đang mở" trên nút (đóng hộp kiểu nào cũng được)
       3.83: công cụ có bảng rộng (Giao ban, Buổi GD) mở hộp rộng cả trên máy tính */
    o.innerHTML = ''; CC.hop = c.id; CC.mo = ''; ccGonLich(false);
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
  var day = document.querySelector('.day'), r = day && day.offsetParent ? day.getBoundingClientRect() : null, dayTop = r && r.height ? r.top : window.innerHeight;   /* 3.276 (anh: "mở rộng khung HSSV đến cuối trang"): dải dưới ẩn trên máy tính (3.148) → tới đáy cửa sổ (trước rơi về 200 px) */
  o.style.maxHeight = Math.max(200, Math.round(dayTop - o.getBoundingClientRect().top - 8))+'px';
}
window.addEventListener('resize', function(){ if(CC.mo){ ccGonLich(true); ccVuaMan(); } });
/* 3.311 (anh: "thẻ tính HSSV mở trên màn nhỏ 17 inch và laptop 125% vẫn chưa hiện hết thông tin cơ bản trong 1 khung"):
   màn thấp (cao < 960 px) đang mở công cụ → lịch tháng thu còn 1 hàng nút công cụ, nhường chỗ cho công cụ; đóng công cụ (✕) lịch hiện lại */
function ccGonLich(mo){ var b = document.querySelector('.blv-lich'); if(b) b.classList.toggle('cc-gon', !!mo && window.innerHeight < 960); }
/* vẽ lại riêng phần thân (giữ ô đang gõ) */
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
