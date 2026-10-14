/* ==========================================================
   3.201 (anh chốt 14/10/2026): 2 nguồn dữ liệu mới của hệ thống TƯ
   ① Mẫu 01/TV — Danh sách thành viên tổ (theo tháng): mỗi tổ 1 khối "Mã tổ: … / Tên tổ trưởng / Tên tổ phó / Địa chỉ"
      + bảng STT · Họ tên · Mã KH · CMND/CCCD · Điện thoại · Dư nợ · Số dư tiền gửi. Đây là danh sách thành viên CHÍNH XÁC theo TƯ
      (chỉ có theo tháng) → đối chiếu với thành viên app suy từ Mẫu 31, ra danh sách CẦN CHO RA KHỎI TỔ.
      Quy tắc (anh chốt): cột Dư nợ của 01/TV là gốc, KHÔNG tính lãi tồn — khách còn lãi tồn (Mẫu 31) coi như CHƯA tất nợ.
   ② "9. Sao kê tài khoản theo mã sản phẩm (DLNgày)" — sản phẩm 104 (TK tổ trưởng) / 105 (TK tiết kiệm khách), theo ngày.
      TK 104 tổ trưởng ghép theo Mã CIF TT (Mẫu 31 / Mẫu 18); TK 105 bổ sung cho khách đã tất nợ (Mẫu 18 không ghi số sổ).
   Đọc riêng theo khuôn (không qua bộ nhận cột chung); lưu như các bảng số liệu khác (SLM.bang, kỳ tháng / ngày).
   ========================================================== */
function tkNgayVN(s){   /* "13/10/2026" / "ngày 30 tháng 09 năm 2026" → ISO */
  var t = String(s==null ? '' : s), x = t.match(/(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})/) || slChuan(t).match(/ngay (\d{1,2}) thang (\d{1,2}) nam (\d{4})/);
  if(!x) return ''; var d = +x[1], m = +x[2], y = +x[3]; return (y>2000 && y<2100 && m>=1 && m<=12 && d>=1 && d<=31) ? y+'-'+hai(m)+'-'+hai(d) : '';
}
function tkO(r, i){ return i>=0 && r ? String(r[i]==null ? '' : r[i]).trim() : ''; }
/* ① Mẫu 01/TV */
function tv01Doc(sheets){
  for(var s = 0; s < (sheets||[]).length; s++){
    var a = sheets[s].rows || [], dau = a.slice(0, 12).map(function(r){ return slChuan((r||[]).join(' ')); }).join(' | ');
    var hi = a.findIndex(function(r){ var c = (r||[]).map(slChuan); return c.indexOf('stt')>=0 && c.some(function(x){ return x.indexOf('ma khach hang')===0; }) && c.some(function(x){ return x.indexOf('so du tien gui')===0; }); });
    if(hi<0 || !(/mau 01 tv/.test(dau) || a.slice(0, hi).some(function(r){ return /^ma to/.test(slChuan((r||[]).join(' '))); }))) continue;
    var h = a[hi].map(slChuan), ci = function(k){ return h.findIndex(function(x){ return x.indexOf(k)===0; }); };
    var C = {stt:ci('stt'), ten:ci('ho va ten'), kh:ci('ma khach hang'), cccd:ci('cmnd'), sdt:ci('dien thoai'), dn:ci('du no'), tg:ci('so du tien gui')};
    var ngay = '', cur = null, rows = [], hang = hi+1;
    a.slice(0, 12).some(function(r){ return !!(ngay = tkNgayVN((r||[]).join(' '))); });
    a.forEach(function(r){
      var v = (r||[]).filter(function(x){ return String(x==null ? '' : x).trim()!==''; }), s0 = v.length ? String(v[0]).trim() : '', c0 = slChuan(s0);
      var sau = function(){ return s0.slice(s0.indexOf(':')+1).trim(); };
      if(/^ma to\b/.test(c0) && s0.indexOf(':')>0){ cur = {to:sau().replace(/\s/g, ''), tt:'', pho:'', dc:''}; return; }
      if(!cur) return;
      if(/^ten to truong/.test(c0)){ cur.tt = sau(); return; } if(/^ten to pho/.test(c0)){ cur.pho = sau(); return; } if(/^dia chi/.test(c0)){ cur.dc = sau(); return; }
      var stt = r[C.stt]; if(!(typeof stt==='number' || /^\d+$/.test(String(stt==null ? '' : stt).trim()))) return;
      var kh = tkO(r, C.kh).replace(/\s/g, ''); if(!kh) return;
      rows.push({to:cur.to, kh:kh, ten:tkO(r, C.ten), cccd:tkO(r, C.cccd).replace(/\s/g, ''), sdt:tkO(r, C.sdt), dn:slSo(r[C.dn]), t105:slSo(r[C.tg]), toTen:cur.tt, phoTen:cur.pho, dc:cur.dc});
    });
    return {k:'tv01', rows:rows, ngay:ngay, sheet:sheets[s].ten, hang:hang};
  }
  return null;
}
/* ② Sao kê TK 104 / 105 */
function tkSKDoc(sheets){
  for(var s = 0; s < (sheets||[]).length; s++){
    var a = sheets[s].rows || [];
    var hi = a.findIndex(function(r){ var c = (r||[]).map(slChuan); return c.indexOf('ma khach hang')>=0 && c.indexOf('tai khoan')>=0 && c.indexOf('san pham')>=0; });
    if(hi<0) continue;
    var h = a[hi].map(slChuan), ci = function(k){ return h.indexOf(k); };
    var C = {xa:ci('ma xa'), thon:ci('ma thon'), kh:ci('ma khach hang'), ten:ci('ten khach hang'), tk:ci('tai khoan'), du:h.findIndex(function(x){ return x.indexOf('so du ngay bao cao')===0; }),
             duT:h.findIndex(function(x){ return x.indexOf('so du thang truoc')===0; }), sp:ci('san pham'), ndk:ci('ngay dang ky'), nbc:ci('ngay bc')};
    var sp = {}, ng = {}, rows = [];
    a.slice(hi+1).forEach(function(r){ var kh = tkO(r, C.kh).replace(/\s/g, ''), tk = tkO(r, C.tk).replace(/\s/g, ''); if(!kh || !tk) return;
      var p = tkO(r, C.sp); sp[p] = (sp[p]||0)+1; var n = tkNgayVN(tkO(r, C.nbc)); if(n) ng[n] = (ng[n]||0)+1;
      rows.push({kh:kh, ten:tkO(r, C.ten), stk:tk, t105:slSo(r[C.du]), t105d:slSo(r[C.duT]), xa:tkO(r, C.xa), thon:tkO(r, C.thon), ndk:tkNgayVN(tkO(r, C.ndk)), sp:p}); });
    var top = function(o){ return Object.keys(o).sort(function(x, y){ return o[y]-o[x]; })[0] || ''; }, p0 = top(sp);
    if(p0!=='104' && p0!=='105') return null;
    return {k:'tk'+p0, rows:rows.filter(function(o){ return o.sp===p0; }), ngay:top(ng), sheet:sheets[s].ten, hang:hi+1, khac:rows.filter(function(o){ return o.sp!==p0; }).length};
  }
  return null;
}
/* ③ 3.202 (anh gửi 14/10): "Danh sách tổ" hệ thống (baocao_…: NGAYBC, MATO, MATT, TENTT, CMT, NGAYCAP, MOBILE, NGAYSINHTT, TK104, MADGD, TENDGD, MATP, TENTP…)
   → đọc thành loại DSTO (đúng các trường DSTO đang dùng: điểm GD, tổ trưởng, SĐT, tổ phó, Hội) + CCCD · ngày cấp · ngày sinh · TK 104 tổ trưởng. File thật 13/10: 369 / 369 tổ, TK 104 + CCCD khớp Sao kê / 01/TV. */
function dsHTDoc(sheets){
  for(var s = 0; s < (sheets||[]).length; s++){
    var a = sheets[s].rows || [], hi = a.slice(0, 10).findIndex(function(r){ var c = (r||[]).map(slChuan); return c.indexOf('mato')>=0 && c.indexOf('matt')>=0 && c.indexOf('cmt')>=0; });
    if(hi<0) continue;
    var h = a[hi].map(slChuan), ci = function(k){ return h.indexOf(k); }, C = {};
    ['ngaybc','madgd','tendgd','madp','tenxa','tenthon','dvut','tendvut','mato','matt','tentt','cmt','ngaycap','mobile','ngaysinhtt','sotv','duno','tk104','matp','tentp','mobiletp'].forEach(function(k){ C[k] = ci(k); });
    var v = function(r, k){ return tkO(r, C[k]); }, ng = {}, rows = [];
    a.slice(hi+1).forEach(function(r){ var to = v(r, 'mato').replace(/\s/g, ''); if(!/^\d{3,9}$/.test(to)) return;
      var n = tdnNgay(r[C.ngaybc]); if(n) ng[n] = (ng[n]||0)+1;
      rows.push({to:slMa(to, 7), ttKH:v(r, 'matt').replace(/\s/g, ''), toTen:v(r, 'tentt'), cccd:v(r, 'cmt').replace(/\D/g, ''), ncap:tdnNgay(r[C.ngaycap]) || '', ns:tdnNgay(r[C.ngaysinhtt]) || '',
        sdt:v(r, 'mobile'), diem:v(r, 'madgd'), tenDiem:v(r, 'tendgd'), thon:v(r, 'madp'), tenXa:v(r, 'tenxa'), tenThon:v(r, 'tenthon'), dv:v(r, 'dvut'), dvTen:v(r, 'tendvut'),
        tk104:v(r, 'tk104').replace(/\s/g, ''), phoKH:v(r, 'matp').replace(/\s/g, ''), phoTen:v(r, 'tentp'), sdtPho:v(r, 'mobiletp'), stv:slSo(r[C.sotv]), dn:slSo(r[C.duno])}); });
    var top = Object.keys(ng).sort(function(x, y){ return ng[y]-ng[x]; })[0] || '';
    return {k:'dsto', rows:rows, ngay:top, sheet:sheets[s].ten, hang:hi+1};
  }
  return null;
}
function slDocRieng(sheets){ return tv01Doc(sheets) || tkSKDoc(sheets) || dsHTDoc(sheets); }
function slPhanTichRieng(kq, x){
  var L = slLoai(x.k);
  kq.loai = x.k; kq.rows = x.rows; kq.lap = []; kq.bo = {}; kq.mauSai = []; kq.them = {}; kq.sheet = x.sheet; kq.hang = x.hang; kq.mau31 = false;
  var tr = {}; x.rows.forEach(function(o){ Object.keys(o).forEach(function(f){ tr[f] = 1; }); }); kq.truong = Object.keys(tr);
  if(!x.rows.length){ kq.loi = 'File đúng mẫu “'+L.ten+'” nhưng không có dòng số liệu nào — anh xuất lại file.'; return kq; }
  var tuTen = slNgayTrongChu(kq.ten);
  kq.ngay = x.ngay || ''; kq.nguonKy = x.ngay ? (x.k==='tv01' ? 'tiêu đề trong file' : 'cột ngày trong file') : ''; kq.trongFile = x.ngay || ''; kq.ngayXuat = '';
  if(x.khac) kq.canhBao.push(x.khac+' dòng sản phẩm khác '+x.k.slice(2)+' — không lấy.');
  kq.ky = slKyTu(L, kq.ngay);
  slCanKhai(kq, tuTen);
  var t = {n:x.rows.length, rieng:1};
  if(x.k==='tv01'){ var to = {}, kh = {}; x.rows.forEach(function(o){ to[o.to] = 1; kh[o.kh] = 1; }); t.to = Object.keys(to).length; t.kh = Object.keys(kh).length;
    t.treo = x.rows.filter(function(o){ return !(o.dn>0) && !(o.t105>0); }).length; }
  else t.du = x.rows.reduce(function(s, o){ return s+(o.t105||0); }, 0);
  kq.tong = t;
  return kq;
}
function slTomRieng(loai, t){
  if(loai==='dsto') return t.n+' tổ';
  if(loai==='tv01') return (t.to||0)+' tổ · '+t.n+' thành viên'+(t.treo ? ' · '+t.treo+' dư nợ 0, tiền gửi 0' : '');
  return t.n+' tài khoản · số dư '+tdnTr(t.du||0);
}

/* ---------- ③ ĐỐI CHIẾU THÀNH VIÊN TỔ: app (Mẫu 31) ↔ Mẫu 01/TV (TƯ) ----------
   B = slBo(kỳ) có co.hstd + co.tv01. Kết quả lưu B._tv (tính 1 lần):
   khop · thieu (TƯ có, Mẫu 31 không thể hiện) · du (app có, TƯ không) · ra (CẦN CHO RA KHỎI TỔ) · haiTo (khách ở ≥ 2 tổ) · laiTon (TƯ dư nợ 0 nhưng còn lãi tồn) */
function tvDoiChieu(B){
  if(!B || !B.co || !B.co.tv01 || !B.co.hstd) return null;
  if(B._tv) return B._tv;
  var app = {}, no = {}, ly = {}, tk = {};
  B.co.hstd.forEach(function(o){ if(!o.kh || !o.to) return; var k = o.kh+'|'+o.to;
    if(o.raTo){ ly[k] = o.raTo; return; } if(o.to===TO_GIA) return; app[k] = 1;
    if(o.ku && ((o.dn||0)>0 || laiTon(o)>0)) no[k] = 1; if(slCoTK(o.stk) || slStk(o.stk).length || (o.t105||0)>0) tk[k] = 1; });
  (B.lap||[]).forEach(function(o){ if(o.kh && o.to) tk[o.kh+'|'+o.to] = 1; });
  var tv = {}, theoKH = {};
  B.co.tv01.forEach(function(o){ var k = o.kh+'|'+o.to; tv[k] = o; (theoKH[o.kh] = theoKH[o.kh]||[]).push(o); });
  var r = {ky:B.nguon.tv01 || B.ky, khop:0, thieu:[], du:[], ra:[], haiTo:[], laiTon:[]};
  Object.keys(tv).forEach(function(k){ var o = tv[k];
    if(app[k]) r.khop++; else r.thieu.push(o);
    if(o.dn>0 || o.t105>0) return;
    if(no[k]){ r.laiTon.push(o); return; }   /* anh chốt: còn lãi tồn = chưa tất nợ */
    var vi = !app[k] ? (ly[k] ? 'app đã cho ra: '+ly[k] : 'Mẫu 31 không còn món vay ở tổ này') : (tk[k] ? 'tất nợ, TK 105 số dư 0' : 'tất nợ, không có TK 105');
    if(theoKH[o.kh].length>1) vi = 'ở '+theoKH[o.kh].length+' tổ — tổ này không còn dư nợ, tiền gửi · '+vi;
    r.ra.push(Object.assign({ly:vi}, o)); });
  Object.keys(theoKH).forEach(function(kh){ if(theoKH[kh].length>1) r.haiTo.push({kh:kh, ten:theoKH[kh][0].ten, to:theoKH[kh].map(function(o){ return o.to+(o.dn>0 || o.t105>0 ? ' (còn dư nợ / tiền gửi)' : ''); }).join(' · ')}); });
  Object.keys(app).forEach(function(k){ if(!tv[k]){ var p = k.split('|'); r.du.push({kh:p[0], to:p[1]}); } });
  return B._tv = r;
}
function tvKiem(B, them){   /* ② Kiểm tra số liệu — nhóm 6 (danh sách tổ) */
  var r = tvDoiChieu(B); if(!r) return;
  var tong = r.khop+r.thieu.length, ky = slKyChu(r.ky);
  them(6, 'Thành viên tổ: app (Mẫu 31) ↔ Mẫu 01/TV TƯ '+ky, !r.du.length, r.khop+'/'+tong+' khớp'+(r.thieu.length ? ' · '+r.thieu.length+' TƯ có, Mẫu 31 không thể hiện (không còn món vay)' : '')+(r.du.length ? ' · '+r.du.length+' app có, TƯ không' : ''),
    r.du.length ? 'App có mà TƯ không có — cần xem lại' : '', ['Mã KH', 'Tổ (app)'], r.du.map(function(x){ return [x.kh, x.to]; }));
  them(6, 'Cần cho ra khỏi tổ — TƯ còn giữ, dư nợ 0 + tiền gửi 0, không còn lãi tồn ('+ky+')', !r.ra.length, r.ra.length ? r.ra.length+' khách' : 'không có', 'Theo Mẫu 01/TV; khách còn lãi tồn coi như chưa tất nợ (không đưa vào)',
    ['Mã tổ', 'Tổ trưởng', 'Mã KH', 'Họ tên', 'Lý do'], r.ra.map(function(o){ return [o.to, o.toTen, o.kh, o.ten, o.ly]; }), r.ra.length ? 'canh' : '');
  if(r.haiTo.length) them(6, 'Khách đứng tên ở 2 tổ trở lên (Mẫu 01/TV)', false, r.haiTo.length+' khách', 'Cho ra ở tổ không còn dư nợ / tiền gửi', ['Mã KH', 'Họ tên', 'Các tổ'], r.haiTo.map(function(o){ return [o.kh, o.ten, o.to]; }));
  if(r.laiTon.length) them(6, 'TƯ ghi dư nợ 0 nhưng còn lãi tồn (Mẫu 31) — chưa tất nợ', true, r.laiTon.length+' khách — chưa cho ra', '', ['Mã tổ', 'Mã KH', 'Họ tên'], r.laiTon.map(function(o){ return [o.to, o.kh, o.ten]; }));
}
/* tab 👥 Tổ — chip "Cần ra khỏi tổ (TƯ)" của 1 tổ */
function tvRaCuaTo(ma){ var r = TO_K && TO_K.B ? tvDoiChieu(TO_K.B) : null; return r ? r.ra.filter(function(o){ return o.to===ma; }) : null; }
function tvRaHTML(ma){
  var ds = tvRaCuaTo(ma);
  if(!ds) return '<div class="rong">Chưa có Mẫu 01/TV tháng này (danh sách thành viên tổ của TƯ) — nạp ở 📥 Nạp & KT để biết ai cần cho ra khỏi tổ.</div>';
  return '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>CCCD</th><th>Lý do</th></tr></thead><tbody>'+
    (ds.map(function(o, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+o.kh+'</td><td class="to-ten">'+coChuHTML(o.ten)+'</td><td>'+coChuHTML(o.cccd)+'</td><td>'+coChuHTML(o.ly)+'</td></tr>'; }).join('')
      || '<tr><td colspan="5" class="rong">Tổ không có thành viên cần cho ra (theo Mẫu 01/TV '+slKyChu(TO_K.B.nguon.tv01 || '')+').</td></tr>')+'</tbody></table></div>';
}

/* ---------- ④ TK 104 / TK 105 theo Sao kê ngày ---------- */
function tkMoiNhat(loai){ var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai===loai; }).sort(function(a, b){ return a.ky<b.ky ? 1 : -1; }); return ds[0] || null; }
/* 3.202 (anh chốt 14/10): TK 104 / 105 = số 10 số theo Sao kê; kỳ nào chưa có Sao kê mới → dùng bản GẦN NHẤT (ngày ≤ ngày kỳ, không có thì bản sớm nhất sau đó) */
function tkChonBan(loai, ngay){
  var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai===loai; }).sort(function(a, b){ return a.ky<b.ky ? -1 : 1; });
  if(!ds.length) return null; var truoc = ds.filter(function(e){ return !ngay || e.ky<=ngay; });
  return truoc.length ? truoc[truoc.length-1] : ds[0];
}
function dsChonKy(ky){   /* 3.202 (anh chốt 14/10: giữ 1 danh sách tổ): bản Danh sách tổ hệ thống MỚI NHẤT (đủ cột nhất) cho mọi kỳ — không có thì '' (dùng DSTO cũ theo kỳ) */
  var ds = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ return e.loai==='dsto' && e.tong && e.tong.rieng; }).sort(function(a, b){ return a.ky<b.ky ? -1 : 1; });
  return ds.length ? ds[ds.length-1].ky : '';
}
function tkNapMoi(K){   /* gắn K.tk = {tk104:{ky, rows, theo}, tk105:{…}} — 1 lần khi dựng kỳ (nối Sao kê vào Mẫu 31 theo mã KH) */
  K.tk = {}; K.bangTo = null;
  return Promise.all(['tk104', 'tk105'].map(function(loai){ var e = tkChonBan(loai, K.ngay); if(!e) return null;
    return slDocBang(loai, e.ky).then(function(b){ if(b) K.tk[loai] = {ky:e.ky, rows:slMoBang(b)}; }).catch(function(){}); }));
}
function tkBang(loai){ var t = TO_K && TO_K.tk; return t && t[loai] ? t[loai] : null; }
function tkCua(loai, kh){   /* {ds:[{stk, t105, ndk…}] (TK anh chọn đứng đầu, rồi TK mở gần nhất), ky, trung} */
  var b = tkBang(loai); if(!b || !kh) return null;
  if(!b.theo){ b.theo = {}; b.rows.forEach(function(o){ (b.theo[o.kh] = b.theo[o.kh] || []).push(o); }); }
  var ds = (b.theo[kh] || []).slice(); if(!ds.length) return null;
  var chon = (D.cauHinh.tkChon || {})[loai+'|'+kh];
  ds.sort(function(a, c){ return (c.stk===chon) - (a.stk===chon) || String(c.ndk||'').localeCompare(String(a.ndk||'')); });
  return {ds:ds, ky:b.ky, trung:ds.length>1, daChon:!!chon && ds[0].stk===chon};
}
function tkChonDat(loai, kh, stk){ var m = D.cauHinh.tkChon = D.cauHinh.tkChon || {}; if(stk) m[loai+'|'+kh] = stk; else delete m[loai+'|'+kh]; if(TO_K) TO_K.bangTo = null; luu(); if(typeof gdxVe==='function') gdxVe(); }
/* CCCD dùng chung (tổ trưởng + khách) — QT-13 (anh giao 14/10): Mẫu 31 mọi dòng / các kỳ (danh bạ) → Mẫu 01/TV → [tổ trưởng: Thông tin tổ trưởng, DSTO] → số anh gõ (nhớ theo mã KH) */
function cccdCua(kh, t, laTT){
  var r = {cccd:'', ncap:'', noiCap:'', ns:'', tu:'', ly:''};
  if(!kh && !laTT){ r.ly = 'chưa chọn khách'; return r; }
  var so = function(v){ return String(v||'').replace(/\D/g, ''); };
  var dsT = laTT && t && t.ds && so(t.ds.cccd).length>=9 && (!kh || !t.ds.ttKH || t.ds.ttKH===kh) ? t.ds : null;   /* 3.202 (anh chốt 14/10): tổ trưởng — Danh sách tổ (hệ thống) là nguồn thống nhất, ghép Mẫu 31 theo mã KH */
  if(dsT){ r.cccd = so(dsT.cccd); r.ncap = dsT.ncap || ''; r.ns = dsT.ns || ''; r.tu = 'Danh sách tổ'; }
  if(kh && typeof hsoKhach==='function'){ var k = hsoKhach(kh, t) || {}; r.ns = r.ns || k.ns || ''; if(!r.cccd && so(k.cccd).length>=9){ r.cccd = so(k.cccd); r.ncap = k.ncap || ''; r.noiCap = k.noiCap || ''; r.tu = 'Mẫu 31'; } else if(r.cccd && !r.ncap && so(k.cccd)===r.cccd) r.ncap = k.ncap || ''; }
  if(!r.cccd && kh){ var v = tv01Cua(kh); if(v && so(v.cccd).length>=9){ r.cccd = so(v.cccd); r.tu = 'Mẫu 01/TV'; } }
  if(laTT && t) [[t.tt, 'Thông tin tổ trưởng'], [t.ds, 'Danh sách tổ']].some(function(x){ var o = x[0]; if(!o || so(o.cccd).length<9) return false;
    if(!r.cccd){ r.cccd = so(o.cccd); r.ncap = r.ncap || o.ncap || ''; r.tu = x[1]; return true; } if(!r.ncap && o.ncap && so(o.cccd)===r.cccd){ r.ncap = o.ncap; return true; } return false; });   /* CCCD từ 01/TV (không có ngày cấp) → bù ngày cấp từ file về tổ nếu cùng số */
  var nh = kh ? ccNho(kh) : null;
  if(nh){ if(!r.cccd && nh.cccd){ r.cccd = nh.cccd; r.tu = 'anh gõ'; } if(!r.ncap && nh.ncap && (!nh.cccd || nh.cccd===r.cccd)) r.ncap = nh.ncap; }
  if(!r.cccd) r.ly = !kh ? 'chưa có mã KH tổ trưởng (Mã CIF TT trên Mẫu 31), file về tổ cũng không có CCCD' : 'không có CCCD ở Mẫu 31 / Mẫu 01/TV'+(laTT ? ' / Danh sách tổ / Thông tin tổ trưởng' : '')+' — gõ 1 lần, app nhớ';
  r.han = r.cccd && typeof toCCCDHan==='function' ? toCCCDHan(r.cccd, r.ns, r.ncap) : null;
  return r;
}
/* BẢNG TỔ DỰNG SẴN (anh chốt 14/10): mỗi tổ — tổ trưởng (Mã CIF TT), CCCD, ngày cấp, TK 104, điểm GD + nguồn; thiếu thì ghi lý do để bổ sung 1 lần.
   Dựng 1 lần cho kỳ đang dùng (TO_K), dựng lại khi nạp file / anh bổ sung. Giấy lĩnh, mini app đọc từ đây. */
function toBangDung(K){
  var T = {}, L = Object.keys(K.to||{}), cu = TO_K; TO_K = K;
  L.forEach(function(m){ var t = K.to[m]; if(!t || t.trucTiep || !t.ten) return;
    var kh = typeof hsoTTKH==='function' ? hsoTTKH(t).kh || '' : '', c = cccdCua(kh, t, true), x = tkCua('tk104', kh), tay = (D.cauHinh.tk104Tay||{})[kh] || '', b = tkBang('tk104');
    var ds4 = t.ds && t.ds.tk104 && (!t.ds.ttKH || t.ds.ttKH===kh) ? t.ds.tk104 : '';   /* 3.202 (anh chốt 14/10): TK 104 = Danh sách tổ (thống nhất); Sao kê TK 104 chỉ tham khảo (TK chưa đóng) */
    var dsLech = t.ds && t.ds.ttKH && kh && t.ds.ttKH!==kh;
    var o = {ma:m, ten:t.ten, kh:kh, khTu:t.cif ? 'Mã CIF TT' : (kh ? 'DSTO / trùng tên' : ''), cccd:c.cccd, ncap:c.ncap, ns:c.ns, ccTu:c.tu, ccLy:c.ly, han:c.han,
      tk:ds4 || tay || (x ? x.ds[0].stk : ''), tkTu:ds4 ? 'Danh sách tổ' : tay ? 'anh gõ' : x ? 'Sao kê TK 104 '+slKyChu(x.ky)+' (chưa có Danh sách tổ)' : '',
      tkDs:x ? x.ds.map(function(y){ return y.stk; }) : [], tkTrung:!ds4 && !tay && !!(x && x.trung), tkDaChon:!!(x && x.daChon),
      tkThua:x ? x.ds.map(function(y){ return y.stk; }).filter(function(y){ return (ds4 || tay) && y!==(ds4 || tay); }) : [],   /* TK 104 của tổ trưởng trong Sao kê khác TK đang dùng → chưa đóng */
      dsLech:dsLech ? 'tổ trưởng trên Danh sách tổ (mã KH '+t.ds.ttKH+') khác Mẫu 31 (Mã CIF TT '+kh+') — kiểm lại' : '',
      tkLy:ds4 || tay || x ? '' : !kh ? 'chưa có mã KH tổ trưởng' : !t.ds && !b ? 'chưa nạp Danh sách tổ / Sao kê TK 104' : 'tổ trưởng (mã KH '+kh+') không có TK 104 ở Danh sách tổ'+(b ? ' / Sao kê '+slKyChu(b.ky) : ''),
      diem:t.diem || '', tenDiem:t.tenDiem || '', ap:t.tenThon || '', xa:t.tenXa || ''};
    o.thieu = [!o.kh && 'mã KH tổ trưởng', !o.cccd && 'CCCD', o.cccd && !o.ncap && 'ngày cấp', !o.tk && 'TK 104', o.tkTrung && !o.tkDaChon && 'TK 104 trùng', o.dsLech && 'tổ trưởng lệch Danh sách tổ'].filter(Boolean);
    o.ngung = !(K.kh[m]||[]).length && (!!(t.ds && t.ds.stv===0 && !(t.ds.dn>0)) || !(K.B && K.B.co && K.B.co.tv01 && K.B.co.tv01.some(function(v){ return v.to===m; })));   /* 3.202: Danh sách tổ ghi 0 thành viên, 0 dư nợ → tổ ngừng */   /* tổ không còn thành viên (mọi món đã tất nợ, không có trong 01/TV) → không tính thiếu */
    if(o.ngung) o.thieu = [];
    T[m] = o; });
  TO_K = cu; K.bangTo = T; return T;
}
function tkBangTo(){ return TO_K ? (TO_K.bangTo || toBangDung(TO_K)) : null; }
function tkBangTom(){ var T = tkBangTo(); if(!T) return null; var all = Object.keys(T).map(function(m){ return T[m]; }), ds = all.filter(function(o){ return !o.ngung; }); return {n:ds.length, ngung:all.length-ds.length, du:ds.filter(function(o){ return !o.thieu.length; }).length, thieu:ds.filter(function(o){ return o.thieu.length; })}; }
function tv01Cua(kh){ var B = TO_K && TO_K.B; return B && B.co && B.co.tv01 ? B.co.tv01.find(function(o){ return o.kh===kh; }) || null : null; }
/* TK 104 cần đóng: chủ TK không còn là tổ trưởng (Mã CIF TT) của tổ nào · TK 105 cần đóng: khách không còn là thành viên tổ nào (Mẫu 01/TV, thiếu thì theo app) */
function tkCanDong(){
  var r = {k104:null, k105:null}, B = TO_K && TO_K.B; if(!B) return r;
  var tt = {}; Object.keys(TO_K.to||{}).forEach(function(m){ var t = TO_K.to[m]; if(t.trucTiep) return; var k = t.cif || (typeof hsoTTKH==='function' ? hsoTTKH(t).kh : ''); if(k) tt[k] = m; });
  var b4 = tkBang('tk104'), dung = {}; Object.keys(tkBangTo()||{}).forEach(function(m){ var o = TO_K.bangTo[m]; if(o.tk) dung[o.tk] = 1; });
  if(b4) r.k104 = {ky:b4.ky, ds:b4.rows.filter(function(o){ return !tt[o.kh] || (Object.keys(dung).length && !dung[o.stk]); }).map(function(o){ return Object.assign({ly:!tt[o.kh] ? 'không còn là tổ trưởng' : 'tổ trưởng đang dùng TK khác (Danh sách tổ)'}, o); })};   /* 3.202: TK 104 chưa đóng — Sao kê chỉ để tham khảo */
  var b5 = tkBang('tk105');
  if(b5){ var tv = {}; if(B.co.tv01) B.co.tv01.forEach(function(o){ tv[o.kh] = 1; }); else Object.keys(TO_K.kh||{}).forEach(function(m){ (TO_K.kh[m]||[]).forEach(function(o){ tv[o.kh] = 1; }); });
    r.k105 = {ky:b5.ky, theo:B.co.tv01 ? 'Mẫu 01/TV '+slKyChu(B.nguon.tv01) : 'thành viên app (Mẫu 31) — chưa có Mẫu 01/TV', ds:b5.rows.filter(function(o){ return !tv[o.kh]; })}; }
  return r;
}
function tkCanDongHop(loai){
  var r = tkCanDong()[loai==='tk104' ? 'k104' : 'k105'];
  if(!r){ bao('Chưa có file Sao kê '+(loai==='tk104' ? 'TK 104' : 'TK 105')+' — nạp ở 📥 Nạp & KT.'); return; }
  var ds = r.ds.slice().sort(function(a, b){ return (a.t105||0)-(b.t105||0); });
  var tit = loai==='tk104' ? '🏦 TK 104 chưa đóng — không còn là tổ trưởng / TK thừa (Sao kê để tham khảo)' : '🏦 TK 105 cần đóng — khách không còn là thành viên tổ';
  moHop('<div class="hop-tit">'+tit+' ('+ds.length+')</div><div class="hop-phu">Sao kê '+(loai==='tk104' ? 'TK 104' : 'TK 105')+' '+slKyChu(r.ky)+(r.theo ? ' · so với '+r.theo : ' · so với Mã CIF TT (Mẫu 31 / Mẫu 18)')+'</div>'+
    
    '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Số TK</th><th>Số dư</th><th>Ngày đăng ký</th>'+(loai==='tk104' ? '<th>Lý do</th>' : '')+'</tr></thead><tbody>'+
    ds.slice(0, 2000).map(function(o, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+o.kh+'</td><td>'+coChuHTML(o.ten)+'</td><td>'+o.stk+'</td><td class="s">'+tdnTien(o.t105||0)+'</td><td>'+(o.ndk ? ngayVNsl(o.ndk) : '')+'</td>'+(loai==='tk104' ? '<td>'+(o.ly||'')+'</td>' : '')+'</tr>'; }).join('')+
    '</tbody></table></div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button>'+(ds.length ? '<button class="nho chinh" onclick="tkCanDongXuat(\''+loai+'\')">📊 Xuất Excel</button>' : '')+'</div>', true);
}
function tkCanDongXuat(loai){
  var r = tkCanDong()[loai==='tk104' ? 'k104' : 'k105']; if(!r) return; if(!window.XLSX) return baoLoi('Chưa tải được bộ Excel.');
  var ws = XLSX.utils.aoa_to_sheet([['STT', 'Mã KH', 'Họ tên', 'Số TK', 'Số dư', 'Ngày đăng ký'].concat(loai==='tk104' ? ['Lý do'] : [])].concat(r.ds.map(function(o, i){ return [i+1, o.kh, o.ten, o.stk, o.t105||0, o.ndk ? ngayVNsl(o.ndk) : ''].concat(loai==='tk104' ? [o.ly||''] : []); })));
  var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, loai==='tk104' ? 'TK104 can dong' : 'TK105 can dong');
  XLSX.writeFile(wb, (loai==='tk104' ? 'TK104_can_dong_' : 'TK105_can_dong_')+String(r.ky).replace(/-/g, '')+'.xlsx');
}

/* ---------- ⑤ Giấy lĩnh: tổ trưởng (Mã CIF TT) → TK 104 · CCCD anh gõ tay nhớ theo mã KH (D.cauHinh.ccNho, đồng bộ Drive như cài đặt) ---------- */
function tkTT(t){   /* tổ trưởng → TK 104 (đọc bảng tổ dựng sẵn) */
  var o = t && tkBangTo() ? tkBangTo()[t.ma] : null; if(!o && t && TO_K){ TO_K.bangTo = null; o = (tkBangTo()||{})[t.ma]; }
  if(!o) return {kh:'', tk:'', tu:'', ly:'chưa có Mã CIF TT của tổ (nạp Mẫu 31)'};
  return {kh:o.kh, tk:o.tk, tu:o.tkTu+(o.tkTrung ? ' · '+o.tkDs.length+' TK'+(o.tkDaChon ? ', anh đã chọn' : ', TK mở gần nhất — chọn TK đang dùng') : ''), ly:o.tkLy, ds:o.tkDs, trung:o.tkTrung};
}
function ccNho(kh){ var m = D.cauHinh.ccNho; return m && m[kh] ? m[kh] : null; }
function ccNhoGhi(k, v){
  if(k!=='cccd' && k!=='ncap') return; var g = gdxGLDuLieu(); if(!g.kh) return;
  var m = D.cauHinh.ccNho = D.cauHinh.ccNho || {}, x = m[g.kh] = m[g.kh] || {};
  if(k==='cccd') x.cccd = String(v||'').replace(/\D/g, ''); else x.ncap = gdxDocNgay(v) || '';
  if(!x.cccd && !x.ncap) delete m[g.kh]; if(TO_K) TO_K.bangTo = null; luu();
}
function tkKhoiHTML(){   /* ⚙ Khai báo chung (Giao dịch xã) · 📥 Nạp & KT: nguồn TK 104 / 105 + nút TK cần đóng */
  var e4 = tkMoiNhat('tk104'), e5 = tkMoiNhat('tk105'), e1 = tkMoiNhat('tv01');
  return '<div class="gdx-khoi"><div class="gdx-nh">🏦 Tài khoản tổ trưởng (104) · tiết kiệm khách (105) <small>(3.201 — Sao kê theo ngày, nạp ở 📥 Nạp &amp; KT)</small></div>'+
    '<div>Sao kê TK 104: '+(e4 ? '<b>'+slKyChu(e4.ky)+'</b> · '+e4.soDong+' TK' : 'chưa nạp')+' · Sao kê TK 105: '+(e5 ? '<b>'+slKyChu(e5.ky)+'</b> · '+e5.soDong+' TK' : 'chưa nạp')+
    ' · Mẫu 01/TV: '+(e1 ? '<b>'+slKyChu(e1.ky)+'</b>' : 'chưa nạp')+'</div>'+
    '<small class="gdx-ghi">TK 104 tổ trưởng ghép theo Mã CIF TT (Mẫu 31 / Mẫu 18). TK 105 khách: số sổ Mẫu 18, thiếu thì Sao kê TK 105. CCCD anh gõ tay được nhớ theo mã KH.</small>'+
    (function(){ var x = tkBangTom(); return x ? '<div>📒 <b>Bảng tổ dựng sẵn</b> ('+slKyChu(TO_K.ky)+'): <b>'+x.n+'</b> tổ · đủ <b>'+x.du+'</b>'+(x.thieu.length ? ' · <span class="gdx-vang">chưa đủ <b>'+x.thieu.length+'</b></span>' : ' ✓')+(x.ngung ? ' · <small>'+x.ngung+' tổ không còn thành viên (bỏ qua)</small>' : '')+'</div>' : '<div><small class="gdx-ghi">Bảng tổ dựng khi mở tab có số liệu (Mẫu 31).</small></div>'; })()+
    '<div class="hang-nut"><button class="nho chinh" onclick="tkThieuHop()">📒 Tổ chưa đủ dữ liệu · bổ sung</button><button class="nho" onclick="tkTrungHop()">⚠ TK trùng</button>'+
    '<button class="nho" onclick="tkCanDongHop(\'tk104\')">📋 TK 104 cần đóng</button><button class="nho" onclick="tkCanDongHop(\'tk105\')">📋 TK 105 cần đóng</button></div></div>';
}

/* 3.202: hộp "Tổ thiếu dữ liệu" — gõ bổ sung 1 lần (nhớ theo mã KH tổ trưởng; nạp file mới không đè) */
function tkThieuHop(){
  var x = tkBangTom(); if(!x){ bao('Chưa có số liệu Mẫu 31 — mở tab Giao dịch xã / Tổ sau khi nạp.'); return; }
  var o = function(t, k, v, ph, w){ return '<input class="gdx-i" style="width:'+w+'" value="'+gdxE(v||'')+'" placeholder="'+ph+'" onchange="tkBoSung(\''+t.ma+'\', \''+k+'\', this.value)">'; };
  moHop('<div class="hop-tit">📒 Bảng tổ — chưa đủ dữ liệu ('+x.thieu.length+' / '+x.n+' tổ)</div><div class="hop-phu">Kỳ '+slKyChu(TO_K.ky)+' · tổ trưởng = Mã CIF TT (Mẫu 31) · CCCD: Mẫu 31 → Mẫu 01/TV → Thông tin tổ trưởng / DSTO → anh gõ · TK 104: Sao kê TK 104. Gõ 1 lần, app nhớ theo mã KH tổ trưởng.</div>'+
    (x.thieu.length ? '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>Mã tổ</th><th>Tổ trưởng</th><th>Mã KH</th><th>Thiếu</th><th>CCCD</th><th>Ngày cấp</th><th>TK 104</th></tr></thead><tbody>'+
      x.thieu.map(function(t){ var ly = [t.ccLy, t.tkLy].filter(Boolean).join(' · ');
        return '<tr><td>'+t.ma+'</td><td>'+coChuHTML(t.ten)+'</td><td>'+(t.kh || '<span class="gdx-vang">?</span>')+'</td><td title="'+gdxE(ly)+'">'+coChuHTML(t.thieu.join(', '))+(ly ? '<br><small>'+coChuHTML(ly)+'</small>' : '')+'</td>'+
          '<td>'+(t.kh ? (t.cccd && t.ccTu!=='anh gõ' ? t.cccd : o(t, 'cccd', t.cccd, '12 số', '9.5em')) : '')+'</td><td>'+(t.kh ? (t.ncap && t.ccTu==='Mẫu 31' ? ngayVNsl(t.ncap) : o(t, 'ncap', t.ncap ? ngayVNsl(t.ncap) : '', 'dd/mm/yyyy', '7.5em')) : '')+'</td>'+
          '<td>'+(t.kh ? (t.tkTrung ? gdxGLChonTK('tk104', {kh:t.kh, tk:t.tk, tkDs:t.tkDs}) : t.tk && t.tkTu!=='anh gõ' ? t.tk : o(t, 'tk104', t.tk, '10 số', '8em')) : '')+'</td></tr>'; }).join('')+'</tbody></table></div>'
      : '<div class="sl-bao xanh">✓ Mọi tổ đủ: mã KH tổ trưởng, CCCD, ngày cấp, TK 104.</div>')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button></div>', true);
}
function tkBoSung(ma, k, v){
  var t = (tkBangTo()||{})[ma]; if(!t || !t.kh) return; v = String(v||'').trim();
  if(k==='tk104'){ var m = D.cauHinh.tk104Tay = D.cauHinh.tk104Tay || {}; v = v.replace(/\D/g, ''); if(v) m[t.kh] = v; else delete m[t.kh]; }
  else { var n = D.cauHinh.ccNho = D.cauHinh.ccNho || {}, x = n[t.kh] = n[t.kh] || {}; if(k==='cccd') x.cccd = v.replace(/\D/g, ''); else x.ncap = gdxDocNgay(v) || ''; if(!x.cccd && !x.ncap) delete n[t.kh]; }
  TO_K.bangTo = null; luu();
}
/* TK trùng: tổ trưởng ≥ 2 TK 104 (bảng tổ) · khách ≥ 2 TK 105 (Sao kê) → xác định TK đang dùng, đóng TK thừa */
function tkTrungDs(){
  var r = [], T = tkBangTo() || {};
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t.tkTrung) r.push({loai:'TK 104', kh:t.kh, ten:t.ten, to:m, ds:t.tkDs.join(' · '), chon:t.tkDaChon ? t.tk : ''}); });
  var b = tkBang('tk105'); if(b){ var g = {}; b.rows.forEach(function(o){ (g[o.kh] = g[o.kh] || []).push(o); });
    Object.keys(g).forEach(function(kh){ if(g[kh].length>1){ var c = (D.cauHinh.tkChon||{})['tk105|'+kh]; r.push({loai:'TK 105', kh:kh, ten:g[kh][0].ten, to:'', ds:g[kh].map(function(o){ return o.stk+' ('+tdnTien(o.t105||0)+')'; }).join(' · '), chon:c || ''}); } }); }
  return r;
}
function tkTrungHop(){
  var ds = tkTrungDs();
  moHop('<div class="hop-tit">⚠ TK trùng — xác định TK đang dùng, đóng TK thừa ('+ds.length+')</div><div class="hop-phu">TK 104: tổ trưởng có ≥ 2 TK trong Sao kê TK 104 · TK 105: khách có ≥ 2 TK trong Sao kê TK 105. Chọn TK đang dùng ở Giấy lĩnh / bảng tổ thiếu — app nhớ.</div>'+
    '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>Loại</th><th>Mã KH</th><th>Họ tên</th><th>Tổ</th><th>Các TK (số dư)</th><th>Đang dùng</th></tr></thead><tbody>'+
    (ds.map(function(o){ return '<tr><td>'+o.loai+'</td><td>'+o.kh+'</td><td>'+coChuHTML(o.ten)+'</td><td>'+o.to+'</td><td>'+coChuHTML(o.ds)+'</td><td>'+(o.chon || '<span class="gdx-vang">chưa chọn</span>')+'</td></tr>'; }).join('') || '<tr><td colspan="6" class="rong">Không có TK trùng.</td></tr>')+
    '</tbody></table></div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button>'+(ds.length ? '<button class="nho chinh" onclick="tkTrungXuat()">📊 Xuất Excel</button>' : '')+'</div>', true);
}
function tkTrungXuat(){ var ds = tkTrungDs(); if(!window.XLSX) return baoLoi('Chưa tải được bộ Excel.');
  var ws = XLSX.utils.aoa_to_sheet([['Loại', 'Mã KH', 'Họ tên', 'Tổ', 'Các TK (số dư)', 'Đang dùng']].concat(ds.map(function(o){ return [o.loai, o.kh, o.ten, o.to, o.ds, o.chon]; })));
  var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'TK trung'); XLSX.writeFile(wb, 'TK_trung_'+gdxHom()+'.xlsx'); }
