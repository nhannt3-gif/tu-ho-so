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
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
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
  (function(){   /* 3.153: không hỏi — mẩu vào 🗑 Thùng rác (ngăn Hôm nay), khôi phục được */
    var L = ntData();
    L.note = L.note.filter(function(x){ return x.id!==id; });
    L.noteXoa.push({id:id, luc:new Date().toISOString()});
    nkVaoRac([m]);
    luu(); henDongBoLich(); veNhatKy(); veLich(); bao('Đã chuyển mẩu ghi chú vào 🗑 Thùng rác — cần thì khôi phục ở đó.', 4);
  })();
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
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button></div>');
}
function moGanFileNK(id){
  GAN = {bo:'', nk:id, tim:''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào dòng</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó. Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
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
    '<div class="hang-nut"><button class="nho" onclick="nkTaiVe()">⬇ Tải về</button><button class="nho chinh" data-lenh="hop.dong">Đóng (Esc)</button></div>', true);
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
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="lcSuaXong()">Lưu</button></div>');
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
        '<button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>';
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
    '<div class="hang-nut"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>');
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
    '<div class="hang-nut"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>', true);
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
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
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
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
      '<button class="nho" onclick="lcXoaMotLan()">Chỉ lần ngày '+lcDM(LICH.chon)+'</button>'+
      '<button class="nho xau" onclick="lcXoaHan()">Xóa cả chuỗi</button></div>');
  } else lcXoaHan();   /* 3.153: không hỏi — vào Thùng rác */
}
function lcXoaMotLan(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  v.bo = v.bo||[]; if(v.bo.indexOf(LICH.chon)<0) v.bo.push(LICH.chon);
  v.suaLuc = new Date().toISOString(); LICH.viecChon = ''; dongHop(); lcDoiLich();
}
function lcXoaHan(){
  var L = lcData(), id = LICH.viecChon, v = lcTim(id);
  if(v) racMucNho('lich', v.ten || '(việc)', 'Hôm nay › Lịch › '+(v.ngay ? lcDMY(v.ngay) : ''), v);   /* 3.153 */
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
  h += '<div class="hang-nut" style="margin-top:10px"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>';
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
    '<div class="hang-nut" style="margin-top:10px"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>');
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
