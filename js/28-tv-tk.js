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
function slDocRieng(sheets){ return tv01Doc(sheets) || tkSKDoc(sheets); }
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
function tkNapMoi(K){   /* gắn K.tk = {tk104:{ky, rows}, tk105:{…}} — file mới nhất (TK là thông tin hiện tại, không theo kỳ đang xem) */
  K.tk = {};
  return Promise.all(['tk104', 'tk105'].map(function(loai){ var e = tkMoiNhat(loai); if(!e) return null;
    return slDocBang(loai, e.ky).then(function(b){ if(b) K.tk[loai] = {ky:e.ky, rows:slMoBang(b)}; }).catch(function(){}); }));
}
function tkBang(loai){ var t = TO_K && TO_K.tk; return t && t[loai] ? t[loai] : null; }
function tkCua(loai, kh){ var b = tkBang(loai); if(!b || !kh) return null; var ds = b.rows.filter(function(o){ return o.kh===kh; }); return ds.length ? {ds:ds, ky:b.ky} : null; }
function tv01Cua(kh){ var B = TO_K && TO_K.B; return B && B.co && B.co.tv01 ? B.co.tv01.find(function(o){ return o.kh===kh; }) || null : null; }
/* TK 104 cần đóng: chủ TK không còn là tổ trưởng (Mã CIF TT) của tổ nào · TK 105 cần đóng: khách không còn là thành viên tổ nào (Mẫu 01/TV, thiếu thì theo app) */
function tkCanDong(){
  var r = {k104:null, k105:null}, B = TO_K && TO_K.B; if(!B) return r;
  var tt = {}; Object.keys(TO_K.to||{}).forEach(function(m){ var t = TO_K.to[m]; if(t.trucTiep) return; var k = t.cif || (typeof hsoTTKH==='function' ? hsoTTKH(t).kh : ''); if(k) tt[k] = m; });
  var b4 = tkBang('tk104'); if(b4) r.k104 = {ky:b4.ky, ds:b4.rows.filter(function(o){ return !tt[o.kh]; })};
  var b5 = tkBang('tk105');
  if(b5){ var tv = {}; if(B.co.tv01) B.co.tv01.forEach(function(o){ tv[o.kh] = 1; }); else Object.keys(TO_K.kh||{}).forEach(function(m){ (TO_K.kh[m]||[]).forEach(function(o){ tv[o.kh] = 1; }); });
    r.k105 = {ky:b5.ky, theo:B.co.tv01 ? 'Mẫu 01/TV '+slKyChu(B.nguon.tv01) : 'thành viên app (Mẫu 31) — chưa có Mẫu 01/TV', ds:b5.rows.filter(function(o){ return !tv[o.kh]; })}; }
  return r;
}
function tkCanDongHop(loai){
  var r = tkCanDong()[loai==='tk104' ? 'k104' : 'k105'];
  if(!r){ bao('Chưa có file Sao kê '+(loai==='tk104' ? 'TK 104' : 'TK 105')+' — nạp ở 📥 Nạp & KT.'); return; }
  var ds = r.ds.slice().sort(function(a, b){ return (a.t105||0)-(b.t105||0); });
  var tit = loai==='tk104' ? '🏦 TK 104 cần đóng — chủ TK không còn là tổ trưởng' : '🏦 TK 105 cần đóng — khách không còn là thành viên tổ';
  moHop('<div class="hop-tit">'+tit+' ('+ds.length+')</div><div class="hop-phu">Sao kê '+(loai==='tk104' ? 'TK 104' : 'TK 105')+' '+slKyChu(r.ky)+(r.theo ? ' · so với '+r.theo : ' · so với Mã CIF TT (Mẫu 31 / Mẫu 18)')+'</div>'+
    
    '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>STT</th><th>Mã KH</th><th>Họ tên</th><th>Số TK</th><th>Số dư</th><th>Ngày đăng ký</th></tr></thead><tbody>'+
    ds.slice(0, 2000).map(function(o, i){ return '<tr><td class="c">'+(i+1)+'</td><td>'+o.kh+'</td><td>'+coChuHTML(o.ten)+'</td><td>'+o.stk+'</td><td class="s">'+tdnTien(o.t105||0)+'</td><td>'+(o.ndk ? ngayVNsl(o.ndk) : '')+'</td></tr>'; }).join('')+
    '</tbody></table></div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button>'+(ds.length ? '<button class="nho chinh" onclick="tkCanDongXuat(\''+loai+'\')">📊 Xuất Excel</button>' : '')+'</div>', true);
}
function tkCanDongXuat(loai){
  var r = tkCanDong()[loai==='tk104' ? 'k104' : 'k105']; if(!r) return; if(!window.XLSX) return baoLoi('Chưa tải được bộ Excel.');
  var ws = XLSX.utils.aoa_to_sheet([['STT', 'Mã KH', 'Họ tên', 'Số TK', 'Số dư', 'Ngày đăng ký']].concat(r.ds.map(function(o, i){ return [i+1, o.kh, o.ten, o.stk, o.t105||0, o.ndk ? ngayVNsl(o.ndk) : '']; })));
  var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, loai==='tk104' ? 'TK104 can dong' : 'TK105 can dong');
  XLSX.writeFile(wb, (loai==='tk104' ? 'TK104_can_dong_' : 'TK105_can_dong_')+String(r.ky).replace(/-/g, '')+'.xlsx');
}

/* ---------- ⑤ Giấy lĩnh: tổ trưởng (Mã CIF TT) → TK 104 · CCCD anh gõ tay nhớ theo mã KH (D.cauHinh.ccNho, đồng bộ Drive như cài đặt) ---------- */
function tkTT(t){
  var kh = t && typeof hsoTTKH==='function' ? hsoTTKH(t).kh || '' : '', b = tkBang('tk104');
  if(!kh) return {kh:'', tk:'', tu:'', ly:'chưa có Mã CIF TT của tổ (nạp Mẫu 31 / Mẫu 18)'};
  if(!b) return {kh:kh, tk:'', tu:'', ly:'chưa nạp Sao kê TK 104 (📥 Nạp & KT)'};
  var x = tkCua('tk104', kh); if(!x) return {kh:kh, tk:'', tu:'', ly:'tổ trưởng (mã KH '+kh+') không có trong Sao kê TK 104 '+slKyChu(b.ky)};
  return {kh:kh, tk:x.ds[0].stk, tu:'Sao kê TK 104 '+slKyChu(x.ky)+(x.ds.length>1 ? ' · '+x.ds.length+' TK, lấy TK đầu' : '')};
}
function ccNho(kh){ var m = D.cauHinh.ccNho; return m && m[kh] ? m[kh] : null; }
function ccNhoGhi(k, v){
  if(k!=='cccd' && k!=='ncap') return; var g = gdxGLDuLieu(); if(!g.kh) return;
  var m = D.cauHinh.ccNho = D.cauHinh.ccNho || {}, x = m[g.kh] = m[g.kh] || {};
  if(k==='cccd') x.cccd = String(v||'').replace(/\D/g, ''); else x.ncap = gdxDocNgay(v) || '';
  if(!x.cccd && !x.ncap) delete m[g.kh]; luu();
}
function tkKhoiHTML(){   /* ⚙ Khai báo chung (Giao dịch xã) · 📥 Nạp & KT: nguồn TK 104 / 105 + nút TK cần đóng */
  var e4 = tkMoiNhat('tk104'), e5 = tkMoiNhat('tk105'), e1 = tkMoiNhat('tv01');
  return '<div class="gdx-khoi"><div class="gdx-nh">🏦 Tài khoản tổ trưởng (104) · tiết kiệm khách (105) <small>(3.201 — Sao kê theo ngày, nạp ở 📥 Nạp &amp; KT)</small></div>'+
    '<div>Sao kê TK 104: '+(e4 ? '<b>'+slKyChu(e4.ky)+'</b> · '+e4.soDong+' TK' : 'chưa nạp')+' · Sao kê TK 105: '+(e5 ? '<b>'+slKyChu(e5.ky)+'</b> · '+e5.soDong+' TK' : 'chưa nạp')+
    ' · Mẫu 01/TV: '+(e1 ? '<b>'+slKyChu(e1.ky)+'</b>' : 'chưa nạp')+'</div>'+
    '<small class="gdx-ghi">TK 104 tổ trưởng ghép theo Mã CIF TT (Mẫu 31 / Mẫu 18). TK 105 khách: số sổ Mẫu 18, thiếu thì Sao kê TK 105. CCCD anh gõ tay được nhớ theo mã KH.</small>'+
    '<div class="hang-nut"><button class="nho" onclick="tkCanDongHop(\'tk104\')">📋 TK 104 cần đóng</button><button class="nho" onclick="tkCanDongHop(\'tk105\')">📋 TK 105 cần đóng</button></div></div>';
}
