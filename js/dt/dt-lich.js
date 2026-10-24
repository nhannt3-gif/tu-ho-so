/* ===== 3.354 BẢN ĐIỆN THOẠI — LỊCH (tab 📅 Hôm nay) — lớp nghiệp vụ, không đụng giao diện =====
   Cùng dữ liệu với Lịch máy tính (js/04b-hom-nay.js): {viec:[…], daXoa:[{id,luc}], note:[…], noteXoa:[…], nhatKy:{}} — đồng bộ Drive <thư mục>/_Hệ thống/lich.json.
   viec: {id, ten, ngay 'YYYY-MM-DD', lap 'mot|tuan|thang|nam', luuY, xong (việc 1 lần), xongNgay {iso:true} (việc lặp), bo [iso], taoLuc, suaLuc}
   note kieu 'dong' = dòng ghi chú của ngày (tick xong) như sổ gạch dòng máy tính.
   Âm lịch: chép nguyên văn thuật toán Hồ Ngọc Đức ở js/04b-hom-nay.js (bản điện thoại không nạp file máy tính) — xem PHOI_HOP mục 5 (đề nghị tách file chung). */
var DTL = (function(){
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
  function iso(d){ return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); }
  function ngay(s){ var p = s.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
  function cong(s, n){ var d = ngay(s); d.setDate(d.getDate()+n); return iso(d); }
  function am(s){ var p = s.split('-').map(Number); return amLich(p[2], p[1], p[0]); }
  function idMoi(){ return Date.now().toString(36)+Math.random().toString(36).slice(2, 7); }
  function rong(){ return {viec:[], daXoa:[], note:[], noteXoa:[], nhatKy:{}}; }
  function chuan(L){ L = L && typeof L==='object' ? L : rong(); ['viec', 'daXoa', 'note', 'noteXoa'].forEach(function(k){ if(!Array.isArray(L[k])) L[k] = []; }); if(!L.nhatKy || typeof L.nhatKy!=='object') L.nhatKy = {}; return L; }
  function co(v, s){   /* việc v có rơi vào ngày s không (như lcCo) */
    if((v.bo || []).indexOf(s)>=0) return false;
    if(v.lap==='mot' || !v.lap) return v.ngay===s;
    if(s < v.ngay) return false;
    var a = ngay(v.ngay), b = ngay(s);
    if(v.lap==='tuan') return a.getDay()===b.getDay();
    if(v.lap==='thang') return a.getDate()===b.getDate();
    if(v.lap==='nam') return a.getDate()===b.getDate() && a.getMonth()===b.getMonth();
    return false; }
  function xong(v, s){ return (v.lap==='mot' || !v.lap) ? !!v.xong : !!(v.xongNgay || {})[s]; }
  function doiXong(v, s){ if(v.lap==='mot' || !v.lap) v.xong = !v.xong; else { v.xongNgay = v.xongNgay || {}; if(v.xongNgay[s]) delete v.xongNgay[s]; else v.xongNgay[s] = true; } v.suaLuc = new Date().toISOString(); }
  function viecNgay(L, s){ return L.viec.filter(function(v){ return co(v, s); }).sort(function(a, b){ return (b.luuY ? 1 : 0)-(a.luuY ? 1 : 0) || (a.taoLuc || '').localeCompare(b.taoLuc || ''); }); }
  function dongNgay(L, s){ return L.note.filter(function(x){ return x.ngay===s && x.kieu==='dong'; }).sort(function(a, b){ return ((a.thuTu===undefined ? 9999 : a.thuTu)-(b.thuTu===undefined ? 9999 : b.thuTu)) || (a.taoLuc || '').localeCompare(b.taoLuc || ''); }); }
  function mauNgay(L, s){ return L.note.filter(function(x){ return x.ngay===s && x.kieu!=='dong' && String(x.nd || '').trim(); }); }   /* mẩu ghi chú màu (máy tính) — điện thoại chỉ xem */
  function xoaViec(L, id){ L.viec = L.viec.filter(function(v){ return v.id!==id; }); L.daXoa.push({id:id, luc:new Date().toISOString()}); }
  function xoaNote(L, id){ L.note = L.note.filter(function(m){ return m.id!==id; }); L.noteXoa.push({id:id, luc:new Date().toISOString()}); }
  function gop(L, r){   /* như gopLich máy tính: bản sửa sau thắng; đã xóa sau lần sửa cuối thì bỏ */
    var doi = 0, xoa = {}, theoId = {};
    L.daXoa.concat(r.daXoa || []).forEach(function(x){ if(!xoa[x.id] || x.luc>xoa[x.id]) xoa[x.id] = x.luc; });
    L.viec.forEach(function(v){ theoId[v.id] = v; });
    (r.viec || []).forEach(function(v){ var c = theoId[v.id]; if(!c || (v.suaLuc || '')>(c.suaLuc || '')){ theoId[v.id] = v; doi++; } });
    L.viec = Object.keys(theoId).map(function(k){ return theoId[k]; }).filter(function(v){ return !(xoa[v.id] && xoa[v.id]>=(v.suaLuc || '')); });
    L.daXoa = Object.keys(xoa).map(function(k){ return {id:k, luc:xoa[k]}; });
    var xoaN = {}, theoN = {};
    L.noteXoa.concat(r.noteXoa || []).forEach(function(x){ if(!xoaN[x.id] || x.luc>xoaN[x.id]) xoaN[x.id] = x.luc; });
    L.noteXoa = Object.keys(xoaN).map(function(k){ return {id:k, luc:xoaN[k]}; });
    L.note.forEach(function(m){ theoN[m.id] = m; });
    (r.note || []).forEach(function(m){ var c = theoN[m.id]; if(!c || (m.suaLuc || '')>(c.suaLuc || '')){ theoN[m.id] = m; doi++; } });
    L.note = Object.keys(theoN).map(function(k){ return theoN[k]; }).filter(function(m){ return !(xoaN[m.id] && xoaN[m.id]>=(m.suaLuc || '')); });
    Object.keys(r.nhatKy || {}).forEach(function(n){ var a = L.nhatKy[n], b = r.nhatKy[n]; if(!a || (b.suaLuc || '')>(a.suaLuc || '')){ L.nhatKy[n] = b; doi++; } });
    return doi; }
  function goiDay(L){ var han = Date.now()-60*864e5;   /* bản đẩy Drive — cắt sổ xóa như dayLichLenDrive */
    L.daXoa = L.daXoa.filter(function(x){ return new Date(x.luc).getTime()>han; });
    L.noteXoa = L.noteXoa.filter(function(x){ return Date.now()-new Date(x.luc).getTime() < 366*864e5; });
    return {xuatLuc:new Date().toISOString(), may:'dienthoai', viec:L.viec, daXoa:L.daXoa, nhatKy:L.nhatKy, note:L.note, noteXoa:L.noteXoa}; }
  return {amLich:amLich, am:am, iso:iso, ngay:ngay, cong:cong, idMoi:idMoi, rong:rong, chuan:chuan, co:co, xong:xong, doiXong:doiXong, viecNgay:viecNgay, dongNgay:dongNgay, mauNgay:mauNgay,
    xoaViec:xoaViec, xoaNote:xoaNote, gop:gop, goiDay:goiDay,
    THU:['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'], LAP:{mot:'Một lần', tuan:'Hằng tuần', thang:'Hằng tháng', nam:'Hằng năm'}};
})();
