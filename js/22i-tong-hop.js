/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 6228–6963 của bản 3.234), không đổi logic — 📊 7 file tổng hợp chuẩn TW · tab con Tổng hợp */
/* ==========================================================
   3.90 — 7 FILE TỔNG HỢP CHUẨN TW (anh chốt: số chính thức của TW, chuẩn nhất)
   BCDHTD 01.1 (theo xã) · 01.2 (theo chương trình) · LEN_31   (B32 bỏ từ 3.145 — nguồn vốn tính từ Mẫu 31)
   XAPUONG / DONVIUT / CHTRINH / TO_TRUONG
   - file dạng biểu: đọc theo hàng mốc cột (1) (2) (3)… — mốc lặp ở đầu mỗi trang thì đọc lại vị trí cột
   - BCDHTD đơn vị triệu đồng → đổi ra đồng khi lưu; LEN_31 đơn vị đồng
   - thứ bậc tin cậy: BCDHTD > LEN_31 > Mẫu 31 — lệch thì báo, không sửa nguồn
   ========================================================== */
var TW_HOI = [['hoi nong dan','11'],['hoi lien hiep phu','12'],['hoi phu nu','12'],['hoi cuu chien binh','13'],['doan thanh nien','14'],['vay truc tiep','99'],['truc tiep','99']];
function twHoi(ten){ var t = slChuan(ten); for(var i=0;i<TW_HOI.length;i++) if(t.indexOf(TW_HOI[i][0])===0) return TW_HOI[i][1]; return ''; }
function twTenHoi(dv){ return dv==='99' ? 'Vay trực tiếp' : (tdnHoi(dv) || 'Hội '+dv); }
function twMoc(row){
  var m = {}, n = 0;
  (row||[]).forEach(function(v, j){ var x = String(v==null ? '' : v).trim().match(/^\(?(\d{1,3})\)$/); if(x && m[+x[1]]===undefined){ m[+x[1]] = j; n++; } });
  return (n>=3 && m[1]!==undefined && m[2]!==undefined) ? m : null;
}
function twNgay(t){ var x = slChuan(t).match(/ngay (\d{1,2}) thang (\d{1,2}) nam (\d{4})/); if(!x) return ''; var y = +x[3], m = +x[2], d = +x[1]; return (y>2000 && m>=1 && m<=12 && d>=1 && d<=31) ? y+'-'+hai(m)+'-'+hai(d) : ''; }
var TW_COT = {
  bc:{3:'cvT',4:'cvN',5:'tnT',6:'tnN',7:'xoaT',8:'xoaN',9:'dn',10:'th',11:'qh',12:'kn',13:'ngan',14:'trung',15:'dai',16:'khDn',17:'sluot'},
  len:{3:'soTo',4:'ho',5:'dn',6:'th',7:'qh',8:'kn',9:'tg',10:'cv',11:'tn',12:'tl',13:'ttk',14:'ctk'}
};
var TW_DEM = {khDn:1, sluot:1, soTo:1, ho:1};   /* cột đếm (khách, lượt, tổ, hộ) — không đổi đơn vị */
/* đọc 1 file biểu TW → {k, rows, ngay, ngayLap, sheet, hang, donVi} hoặc null (không phải biểu TW) */
function slDocTW(sheets, tenFile){
  var sh = null, iMoc = -1;
  (sheets||[]).some(function(s){ var rows = s.rows||[]; for(var i=0;i<Math.min(rows.length, 60);i++) if(twMoc(rows[i])){ sh = s; iMoc = i; return true; } return false; });
  if(!sh) return null;
  var rows = sh.rows, dau = rows.slice(0, iMoc).map(function(r){ return (r||[]).join(' '); }).join(' '), dc = slChuan(dau), tf = slChuan(tenFile);
  var k = '';
  if(/01 1 bctd/.test(dc) || (/ket qua cho vay/.test(dc) && /huyen xa/.test(dc))) k = 'bx';
  else if(/01 2 bctd/.test(dc) || (/ket qua cho vay/.test(dc) && /chuong trinh vay/.test(dc))) k = 'bc';
  else if(/(^| )13 bc\b/.test(dc) || /ket qua hoat dong tin dung/.test(dc)) k = 'b32';
  else if(/tong hop so lieu tin dung/.test(dc)) k = /xapuong/.test(tf) ? 'lx' : /donviut/.test(tf) ? 'lh' : /chtrinh/.test(tf) ? 'lc' : /to truong/.test(tf) ? 'lt' : 'len';
  if(!k) return null;
  if(k==='b32') return {k:k, rows:[]};   /* 3.145: B32 đã bỏ — chỉ nhận dạng để báo */
  var trieu = /trieu dong/.test(dc), ra = {k:k, sheet:sh.ten, hang:iMoc+1, ngay:twNgay(dau), ngayLap:'', rows:[], donVi:trieu ? 'triệu đồng' : 'đồng'};
  var tien = function(v, f){ var n = slSo(v); return (trieu && !TW_DEM[f]) ? Math.round(n*1e6) : n; };
  var chuO = function(v){ return String(v==null ? '' : v).replace(/\s+/g, ' ').trim(); };
  var m = twMoc(rows[iMoc]), tho = [];
  for(var i=iMoc+1;i<rows.length;i++){
    var r = rows[i]||[], mm = twMoc(r); if(mm){ m = mm; continue; }
    var chu = r.filter(function(v){ return v!=='' && v!=null; }).join(' '); if(!chu) continue;
    var stt = chuO(r[m[1]]), ten = chuO(r[m[2]]), s = slChuan(stt);
    var tong = /^tong cong/.test(s) || /^tong cong/.test(slChuan(ten));
    if(!tong && !(stt || ten)){ var nl = twNgay(chu); if(nl) ra.ngayLap = nl; continue; }   /* dòng ký / ngày lập */
    if(k==='bx' || k==='bc'){
      if(!tong && !(/^\d+$/.test(stt) && ten)) continue;
      var o = {cap:tong ? 'tong' : (k==='bx' ? 'xa' : 'ct'), stt:tong ? '' : stt, ten:tong ? 'Tổng cộng' : ten};
      Object.keys(TW_COT.bc).forEach(function(n){ if(m[n]!==undefined) o[TW_COT.bc[n]] = tien(r[m[n]], TW_COT.bc[n]); });
      ra.rows.push(o); continue;
    }
    /* LEN_31: STT chữ cái = xã · số = hội / tổ / chương trình · trống = xã hoặc hội (biểu CHTRINH) */
    var loai = tong ? 'tong' : /^[A-Z]$/.test(stt) ? 'chu' : /^\d+$/.test(stt) ? 'so' : (!stt && ten ? 'trong' : '');
    if(!loai) continue;
    var o2 = {loai:loai, stt:stt, ten:tong ? 'Tổng cộng' : ten};
    Object.keys(TW_COT.len).forEach(function(n){ if(m[n]!==undefined) o2[TW_COT.len[n]] = tien(r[m[n]], TW_COT.len[n]); });
    tho.push(o2);
  }
  if(/^l/.test(k)){
    if(k==='len'){
      var coTrong = tho.some(function(o){ return o.loai==='trong'; }), coChu = tho.some(function(o){ return o.loai==='chu'; });
      k = ra.k = coTrong ? 'lc' : !coChu ? 'lx' : (tho.filter(function(o){ return o.loai==='so'; }).every(function(o){ return twHoi(o.ten); }) ? 'lh' : 'lt');
    }
    var xa = '', dv = '';
    tho.forEach(function(o){
      var cap = '';
      if(o.loai==='tong') cap = 'tong';
      else if(k==='lx'){ if(o.loai==='so' || o.loai==='chu'){ cap = 'xa'; xa = o.ten; } }
      else if(k==='lc'){
        if(o.loai==='trong' || o.loai==='chu'){ if(/^(xa|phuong|thi tran) /.test(slChuan(o.ten)+' ') && !twHoi(o.ten)){ cap = 'xa'; xa = o.ten; dv = ''; } else { cap = 'hoi'; dv = twHoi(o.ten); } }
        else { cap = 'ct'; }
      }
      else if(o.loai==='chu'){ cap = 'xa'; xa = o.ten; }
      else if(o.loai==='so') cap = k==='lh' ? 'hoi' : 'to';
      if(!cap) return;
      o.cap = cap; delete o.loai;
      if(cap!=='tong' && cap!=='xa') o.xa = xa;
      if(cap==='hoi') o.dv = twHoi(o.ten);
      if(cap==='ct') o.dv = dv;
      if(cap==='to') o.dv = twHoi(o.ten)==='99' ? '99' : '';
      ra.rows.push(o);
    });
  }
  return ra;
}
function slTongTW(k, rows){
  var t = {n:rows.length, tw:1}, tong = rows.find(function(o){ return o.cap==='tong'; }) || {};
  if(k==='bx' || k==='bc'){ ['cvT','cvN','tnT','tnN','dn','th','qh','kn','khDn'].forEach(function(f){ t[f] = tong[f]||0; }); t.dong = rows.filter(function(o){ return o.cap!=='tong'; }).length; }
  else { ['ho','dn','qh','kn','tg','cv','tn'].forEach(function(f){ t[f] = tong[f]||0; }); t.dong = rows.filter(function(o){ return o.cap===(k==='lx' ? 'xa' : k==='lh' ? 'hoi' : k==='lc' ? 'ct' : 'to'); }).length; }
  return t;
}
function slTomTatTW(k, t){
  var don = {bx:' xã', bc:' CT', lx:' xã', lh:' hội', lc:' dòng CT', lt:' tổ'}[k] || ' dòng';
  return (t.dong!==undefined ? t.dong : t.n)+don+' · dư nợ '+tdnTr(t.dn);
}
/* phân tích file biểu TW (gọi từ slPhanTich) */
function slPhanTichTW(kq, tw){
  var L = slLoai(tw.k);
  kq.loai = tw.k; kq.rows = tw.rows; kq.lap = []; kq.bo = {}; kq.mauSai = []; kq.them = {}; kq.sheet = tw.sheet; kq.hang = tw.hang; kq.mau31 = false;
  var tr = {}; tw.rows.forEach(function(o){ Object.keys(o).forEach(function(f){ tr[f] = 1; }); }); kq.truong = Object.keys(tr);
  if(!tw.rows.length){ kq.loi = 'File đúng mẫu “'+L.ten+'” nhưng không đọc được dòng số liệu nào — anh xuất lại file.'; return kq; }
  var tuTen = slNgayTrongChu(kq.ten);
  kq.ngay = tw.ngay || tuTen; kq.nguonKy = tw.ngay ? 'tiêu đề trong file' : (tuTen ? 'tên file' : ''); kq.trongFile = tw.ngay || '';
  kq.ngayLap = tw.ngayLap || ''; kq.donVi = tw.donVi; kq.ngayXuat = '';
  if(tw.ngay && tuTen && tw.ngay!==tuTen) kq.canhBao.push('Tên file ghi '+ngayVNsl(tuTen)+' nhưng trong file ghi '+ngayVNsl(tw.ngay)+' — lấy theo trong file.');
  kq.ky = slKyTu(L, kq.ngay);
  kq.tong = slTongTW(tw.k, tw.rows);
  return kq;
}

/* ---------- ghép tổ LEN_31 TO_TRUONG (chỉ có tên tổ trưởng, có khi bị cắt; 2 tổ trùng tên trong 1 xã gộp 1 dòng) với mã tổ ----------
   T = {mã tổ: {ten, tenXa, dn}} (từ Mẫu 31 / Mẫu 10). Cùng xã: lượt 1 tên đủ trùng, lượt 2 tên LEN là phần đầu tên tổ;
   nhiều tổ khớp tên → lấy tổ có cùng dư nợ, không có thì cả nhóm nếu tổng dư nợ bằng. Trả [{o, ma:[…], tt}] */
function twGhepTo(dongLT, T){
  var theoXa = {}, dung = {}, ra = [];
  Object.keys(T||{}).forEach(function(ma){ var x = slChuan(T[ma].tenXa); (theoXa[x] = theoXa[x]||[]).push(ma); });
  (dongLT||[]).forEach(function(o){ if(o.cap==='to') ra.push({o:o, ma:[], tt:o.dv==='99'}); });
  var chon = function(g, c){
    if(!c.length) return null; if(c.length===1) return c;
    var b = c.filter(function(m){ return Math.abs((T[m].dn||0)-(g.o.dn||0))<1; }); if(b.length===1) return b;
    var s = c.reduce(function(a, m){ return a+(T[m].dn||0); }, 0); return Math.abs(s-(g.o.dn||0))<1 ? c : null;
  };
  [0, 1].forEach(function(luot){
    ra.forEach(function(g){
      if(g.tt || g.ma.length) return;
      var n = slChuan(g.o.ten), ds = (theoXa[slChuan(g.o.xa)]||[]).filter(function(m){ return !dung[m]; });
      var kq = chon(g, ds.filter(function(m){ var t = slChuan(T[m].ten); return luot ? (t!==n && t.indexOf(n)===0) : t===n; }));
      if(kq){ kq.forEach(function(m){ dung[m] = 1; }); g.ma = kq; }
    });
  });
  return ra;
}
/* tổ của bảng món vay → {mã tổ: {ten, tenXa, dn}} để ghép */
function twToTu(hs, toInfo){
  var T = {};
  (hs||[]).forEach(function(o){ if(!o.to) return; var t = T[o.to] = T[o.to] || {ten:'', tenXa:'', dn:0}; if(!t.ten) t.ten = (toInfo && toInfo[o.to] && toInfo[o.to].ten) || o.toTen || ''; if(!t.tenXa) t.tenXa = o.tenXa||''; if(o.ku) t.dn += o.dn||0; });
  return T;
}
/* số liệu Mẫu 31 gom theo nhóm (khoa(o) → tên nhóm) theo cách tính của BCDHTD: cho vay = giải ngân − đảo khoản; thu nợ = TH + QH + khoanh;
   số KH dư nợ = khách có dư nợ > 0; tiền gửi = số dư 105 lấy 1 lần mỗi khách (kể cả dòng lặp) */
function twTinh31(rows, lap, khoa){
  var R = {}, lay = function(k){ return R[k] = R[k] || {dn:0, th:0, qh:0, kn:0, gnT:0, cvT:0, cvN:0, tnT:0, tnN:0, xoaT:0, xoaN:0, lt:0, khDn:0, tg:0, mon:0, _kh:{}, _tg:{}}; };
  var tg = function(o){ var k = khoa(o); if(k===null || k===undefined || !o.kh) return; var x = lay(k), g = o.t105||0; if(g > (x._tg[o.kh]||0)) x._tg[o.kh] = g; };
  (rows||[]).forEach(function(o){
    var k = khoa(o); if(k===null || k===undefined) return;
    tg(o); if(!o.ku) return;
    var x = lay(k); x.mon++;
    x.dn += o.dn||0; x.th += o.th||0; x.qh += o.qh||0; x.kn += o.kn||0; x.lt += laiTon(o); x.gnT += o.gnT||0;
    x.cvT += (o.gnT||0)-(o.dkT||0); x.cvN += slSo(o.c_giai_ngan_nam)-slSo(o.c_dao_khoan_gn_nam);   /* cột c_… có thể lưu dạng chữ → đổi số */
    x.tnT += (o.tnTH||0)+(o.tnQH||0)+(o.tnK||0); x.tnN += slSo(o.c_thu_no_th_nam)+slSo(o.c_thu_no_qh_nam)+slSo(o.c_thu_no_khoanh_nam);
    x.xoaT += o.xoaT||0; x.xoaN += slSo(o.c_xoa_trong_nam);
    if((o.dn||0)>0) x._kh[o.kh] = 1;
  });
  (lap||[]).forEach(tg);
  Object.keys(R).forEach(function(k){ var x = R[k]; x.khDn = Object.keys(x._kh).length; x.tg = Object.keys(x._tg).reduce(function(a, m){ return a+x._tg[m]; }, 0); delete x._kh; delete x._tg; });
  return R;
}

/* ---------- ② KIỂM TRA: số chuẩn TW khớp nhau (nhóm 7) · Mẫu 31 ↔ số chuẩn TW (nhóm 8) · KHĐ, tổ trưởng (nhóm 3) ---------- */
function slKTTW(ky, B, them){
  var co = B.co, hs = B.hsTen==='Mẫu 31' ? co.hstd : null, tenXa = {};
  var theoXa = function(rows, cap){ var r = {}; (rows||[]).forEach(function(o){ if(o.cap===(cap||'xa')){ var x = slChuan(o.ten); r[x] = o; tenXa[x] = tenXa[x] || o.ten; } }); return r; };
  var hop = function(a, b){ var k = {}; Object.keys(a).concat(Object.keys(b)).forEach(function(x){ k[x] = 1; }); return Object.keys(k); };
  /* so 2 bảng theo xã: cs = [[trường A, trường B, tên chỉ tiêu]] → dòng lệch [xã, chỉ tiêu, A, B, chênh] */
  var so = function(a, b, cs, tol){
    var ds = [];
    hop(a, b).forEach(function(x){ cs.forEach(function(c){
      var va = a[x] ? (typeof c[0]==='function' ? c[0](a[x]) : (a[x][c[0]]||0)) : null, vb = b[x] ? (typeof c[1]==='function' ? c[1](b[x]) : (b[x][c[1]]||0)) : null;
      if(va===null || vb===null){ if((va||vb)) ds.push([tenXa[x]||x, c[2], va===null ? '(không có)' : va, vb===null ? '(không có)' : vb, '']); return; }
      if(Math.abs(va-vb)>(tol||1)) ds.push([tenXa[x]||x, c[2], va, vb, va-vb]);
    }); });
    return ds;
  };
  var cotSo = function(a, b){ return ['Xã / phường', 'Chỉ tiêu', a, b, 'Chênh ('+a+' − '+b+')']; };
  var TIEN4 = [['dn','dn','Dư nợ'],['th','th','Trong hạn'],['qh','qh','Quá hạn'],['kn','kn','Khoanh']];
  var bx = theoXa(co.bx), lx = theoXa(co.lx);
  var DK = hs ? twTinh31(hs, null, function(o){ return o.tenXa ? slChuan(o.tenXa) : null; }) : null;   /* đảo khoản tháng từng xã = giải ngân − cho vay (Mẫu 31) */
  /* 7a. BCDHTD 01.1 ↔ 01.2 (tổng) */
  if(co.bx && co.bc){
    var tx = (co.bx.find(function(o){ return o.cap==='tong'; })||{}), tc = (co.bc.find(function(o){ return o.cap==='tong'; })||{}), ds7 = [];
    [['cvT','Cho vay tháng'],['cvN','Cho vay lũy kế'],['tnT','Thu nợ tháng'],['tnN','Thu nợ lũy kế'],['xoaT','Xóa nợ tháng'],['xoaN','Xóa nợ lũy kế'],['dn','Dư nợ'],['th','Trong hạn'],['qh','Quá hạn'],['kn','Khoanh'],['ngan','Ngắn hạn'],['trung','Trung hạn'],['dai','Dài hạn']].forEach(function(c){
      if(Math.abs((tx[c[0]]||0)-(tc[c[0]]||0))>1) ds7.push(['Tổng PGD', c[1], tx[c[0]]||0, tc[c[0]]||0, (tx[c[0]]||0)-(tc[c[0]]||0)]); });
    them(7, 'BCDHTD 01.1 (theo xã) = 01.2 (theo chương trình) — dòng tổng', !ds7.length, ds7.length ? ds7.length+' chỉ tiêu lệch' : 'khớp 13 chỉ tiêu (cho vay, thu nợ, xóa nợ, dư nợ, tính chất, thời hạn)', '', cotSo('01.1', '01.2'), ds7);
  }
  /* 7b. BCDHTD 01.1 ↔ LEN_31 XAPUONG từng xã */
  if(co.bx && co.lx){
    var d1 = so(bx, lx, TIEN4);
    them(7, 'BCDHTD 01.1 ↔ LEN_31 XAPUONG từng xã: dư nợ, trong hạn, quá hạn, khoanh', !d1.length, d1.length ? d1.length+' dòng lệch' : 'khớp '+Object.keys(bx).length+' xã', '', cotSo('BCDHTD', 'LEN_31'), d1);
    var dk = DK, d2 = [];
    hop(bx, lx).forEach(function(x){ var a = bx[x], b = lx[x]; if(!a || !b) return; var c = (b.cv||0)-(a.cvT||0), dd = dk && dk[x] ? (dk[x].gnT - dk[x].cvT) : null;
      if(Math.abs(c)>1 && (dd===null || Math.abs(c-dd)>1)) d2.push([tenXa[x]||x, 'Cho vay tháng', a.cvT||0, b.cv||0, -c]); });
    var tongDK = dk ? Object.keys(dk).reduce(function(s, x){ return s + dk[x].gnT - dk[x].cvT; }, 0) : 0;
    them(7, 'Cho vay tháng: LEN_31 = BCDHTD + đảo khoản', !d2.length, d2.length ? d2.length+' xã lệch' : (dk ? 'khớp (đảo khoản tháng theo Mẫu 31: '+tdnTien(tongDK)+')' : 'khớp'),
      'LEN_31 cộng cả giải ngân đảo khoản; BCDHTD đã trừ đảo khoản.'+(dk ? '' : ' Chưa có Mẫu 31 nên chưa tách được đảo khoản từng xã.'), cotSo('BCDHTD', 'LEN_31'), d2, d2.length && !dk ? 'canh' : '');
    var d3 = so(bx, lx, [['tnT','tn','Thu nợ tháng']]);
    them(7, 'Thu nợ tháng: BCDHTD ↔ LEN_31', !d3.length, d3.length ? d3.length+' xã lệch · tổng chênh '+tdnTien(d3.reduce(function(s, r){ return s+(r[4]||0); }, 0)) : 'khớp',
      d3.length ? 'Số chuẩn là BCDHTD. Chênh LEN_31 chưa rõ nguyên nhân — xem thêm phần so từng tổ ở mục 8.' : '', cotSo('BCDHTD', 'LEN_31'), d3, d3.length ? 'canh' : '');
  }
  /* 7c. 4 biểu LEN_31 khớp nhau: xã của DONVIUT / CHTRINH / TO_TRUONG = XAPUONG; dòng con cộng lại = dòng xã */
  if(co.lx){
    var TIENL = [['dn','dn','Dư nợ'],['qh','qh','Quá hạn'],['kn','kn','Khoanh'],['tg','tg','Tiền gửi'],['cv','cv','Cho vay'],['tn','tn','Thu nợ'],['tl','tl','Thu lãi']];
    [['lh','DONVIUT','hoi'],['lc','CHTRINH','hoi'],['lt','TO_TRUONG','to']].forEach(function(b){
      if(!co[b[0]]) return;
      var dsX = so(lx, theoXa(co[b[0]]), TIENL);
      var con = {}; co[b[0]].forEach(function(o){ if(o.cap!==b[2]) return; var x = slChuan(o.xa), c = con[x] = con[x] || {}; TIENL.forEach(function(f){ c[f[0]] = (c[f[0]]||0)+(o[f[0]]||0); }); });
      var dsC = so(theoXa(co[b[0]]), con, TIENL).map(function(r){ r[1] = r[1]+' (cộng dòng '+(b[2]==='to' ? 'tổ' : 'hội')+')'; return r; });
      var ds = dsX.concat(dsC);
      them(7, 'LEN_31 '+b[1]+' khớp XAPUONG từng xã'+(b[0]==='lc' ? '' : ', dòng '+(b[2]==='to' ? 'tổ' : 'hội')+' cộng = xã'), !ds.length, ds.length ? ds.length+' dòng lệch' : 'khớp', '', cotSo('A', 'B'), ds);
    });
  }
  /* 8. Mẫu 31 ↔ số chuẩn TW */
  if(hs){
    var M = twTinh31(hs, kcLap(B), function(o){ return o.tenXa ? slChuan(o.tenXa) : null; });
    Object.keys(M).forEach(function(x){ if(!M[x].mon) delete M[x]; });
    hs.forEach(function(o){ var x = slChuan(o.tenXa); if(M[x]) tenXa[x] = tenXa[x] || o.tenXa; });
    if(co.bx){
      var d5 = so(bx, M, [['dn','dn','Dư nợ'],['th','th','Trong hạn'],['qh','qh','Quá hạn'],['kn','kn','Khoanh'],['cvT','cvT','Cho vay tháng (GN − đảo khoản)'],['cvN','cvN','Cho vay lũy kế năm'],['tnT','tnT','Thu nợ tháng'],['tnN','tnN','Thu nợ lũy kế năm'],['xoaN','xoaN','Xóa nợ lũy kế'],['khDn','khDn','Số KH dư nợ']]);
      them(8, 'Mẫu 31 ↔ BCDHTD 01.1 từng xã (10 chỉ tiêu)', !d5.length, d5.length ? d5.length+' dòng lệch' : 'khớp tuyệt đối '+Object.keys(bx).length+' xã', d5.length ? 'Số chuẩn là BCDHTD; lệch thì báo để kiểm, không sửa số.' : '', cotSo('BCDHTD', 'Mẫu 31'), d5);
    }
    if(co.lx){
      var d7 = so(lx, M, [['tg','tg','Tiền gửi (105)']]);
      them(8, 'Tiền gửi: LEN_31 ↔ số dư 105 Mẫu 31 từng xã', !d7.length, d7.length ? d7.length+' xã lệch · tổng chênh '+tdnTien(d7.reduce(function(s, r){ return s+(r[4]||0); }, 0)) : 'khớp',
        d7.length ? 'Số chuẩn là LEN_31. Mẫu 31 chỉ có số dư 105 của khách trong file (lấy 1 lần mỗi khách).' : '', cotSo('LEN_31', 'Mẫu 31'), d7, d7.length ? 'canh' : '');
    }
    if(co.lt){
      var T = twToTu(hs), G = twGhepTo(co.lt, T), T31 = twTinh31(hs, kcLap(B), function(o){ return o.to||null; }), dsT = [], dsTN = [], chua = [];
      G.forEach(function(g){
        if(g.tt) return;
        if(!g.ma.length){ if((g.o.dn||0) || (g.o.ho||0)) chua.push([g.o.xa||'', g.o.ten||'', g.o.ho||0, g.o.dn||0]); return; }
        var s = {dn:0, th:0, qh:0, kn:0, gnT:0, tnT:0, tg:0}; g.ma.forEach(function(m){ var x = T31[m]||{}; Object.keys(s).forEach(function(f){ s[f] += x[f]||0; }); });
        var nh = g.o.ten+' ('+g.ma.join(', ')+')';
        [['dn','Dư nợ'],['th','Trong hạn'],['qh','Quá hạn'],['kn','Khoanh'],['cv','gnT','Cho vay (gồm đảo khoản)']].forEach(function(c){ var f2 = c.length>2 ? c[1] : c[0], a = g.o[c[0]]||0, b = s[f2]||0; if(Math.abs(a-b)>1) dsT.push([g.o.xa||'', nh, c[c.length-1], a, b, a-b]); });
        if(Math.abs((g.o.tn||0)-s.tnT)>1) dsTN.push([g.o.xa||'', nh, 'Thu nợ', g.o.tn||0, s.tnT, (g.o.tn||0)-s.tnT]);
      });
      var nGhep = G.filter(function(g){ return g.ma.length; }).length, gop = G.filter(function(g){ return g.ma.length>1; }).length;
      them(8, 'LEN_31 TO_TRUONG ↔ Mẫu 31 từng tổ: dư nợ, trong hạn, quá hạn, khoanh, cho vay', !dsT.length, dsT.length ? dsT.length+' dòng lệch' : 'khớp '+nGhep+' dòng tổ'+(gop ? ' ('+gop+' dòng LEN gộp 2 tổ trùng tên tổ trưởng)' : ''),
        'Ghép tổ theo tên tổ trưởng trong cùng xã (LEN_31 không có mã tổ, tên có thể bị cắt); trùng tên thì phân theo dư nợ.', ['Xã', 'Tổ trưởng (mã tổ)', 'Chỉ tiêu', 'LEN_31', 'Mẫu 31', 'Chênh'], dsT);
      them(8, 'Thu nợ tháng từng tổ: LEN_31 ↔ Mẫu 31', !dsTN.length, dsTN.length ? dsTN.length+' tổ lệch · tổng chênh '+tdnTien(dsTN.reduce(function(s, r){ return s+r[5]; }, 0)) : 'khớp',
        dsTN.length ? 'Số chuẩn thu nợ là BCDHTD (= Mẫu 31). Đây là các tổ LEN_31 ghi thu nợ khác — chưa rõ nguyên nhân, anh kiểm trên hệ thống.' : '', ['Xã', 'Tổ trưởng (mã tổ)', 'Chỉ tiêu', 'LEN_31', 'Mẫu 31', 'Chênh'], dsTN, dsTN.length ? 'canh' : '');
      if(chua.length) them(8, 'Dòng tổ LEN_31 chưa ghép được mã tổ', false, chua.length+' dòng', 'Tên tổ trưởng ở LEN_31 không khớp tên tổ ở Mẫu 31 (hoặc trùng tên mà dư nợ không phân được).', ['Xã', 'Tổ trưởng', 'Số hộ', 'Dư nợ'], chua, 'canh');
      if(co.dsto){   /* 3.205 (anh hỏi 14/10): số tổ LEN_31 TO_TRUONG ≠ Danh sách tổ → liệt kê từng dòng chênh + lý do */
        var DS = {}; co.dsto.forEach(function(o){ DS[o.to] = o; }); var coLEN = {}, lc = [];
        G.forEach(function(g){ var o = g.o;
          if(g.tt){ lc.push(['', o.ten||'', o.xa||'', 'chỉ LEN_31', 'dòng vay trực tiếp (không phải tổ)', o.dn||0]); return; }
          if(!g.ma.length){ lc.push(['', o.ten||'', o.xa||'', 'chỉ LEN_31', 'chưa ghép được mã tổ (tên tổ trưởng LEN_31 khác Mẫu 31)', o.dn||0]); return; }
          g.ma.forEach(function(m){ coLEN[m] = 1; if(!DS[m]) lc.push([m, o.ten||'', o.xa||'', 'chỉ LEN_31', 'tổ không có trên Danh sách tổ', o.dn||0]); });
          if(g.ma.length>1) lc.push([g.ma.join(', '), o.ten||'', o.xa||'', 'LEN_31 gộp', '1 dòng LEN_31 gộp '+g.ma.length+' tổ trùng tên tổ trưởng', o.dn||0]); });
        co.dsto.forEach(function(o){ if(!coLEN[o.to]) lc.push([o.to, String(o.toTen||''), String(o.tenXa||''), 'chỉ Danh sách tổ', (o.dn>0 ? 'có dư nợ nhưng không có dòng LEN_31' : 'không còn dư nợ (LEN_31 không có dòng)'), o.dn||0]); });
        them(6, 'Số tổ: LEN_31 TO_TRUONG ('+G.length+' dòng) ↔ Danh sách tổ ('+co.dsto.length+' tổ)', !lc.length, lc.length ? lc.length+' dòng chênh — xem lý do từng dòng' : 'khớp',
          'LEN_31 đếm dòng tổ trưởng (gồm dòng vay trực tiếp); Danh sách tổ đếm mã tổ. Chỉ ghi nhận để biết, không sửa số.', ['Mã tổ', 'Tổ trưởng', 'Xã', 'Có ở', 'Lý do', 'Dư nợ'], lc, lc.length ? 'canh' : '');
      }
      /* 3. Thông tin tổ trưởng ↔ LEN_31 */
      if(co.tt){
        var daGhep = {}; G.forEach(function(g){ g.ma.forEach(function(m){ daGhep[m] = 1; }); });
        var ttMa = {}; co.tt.forEach(function(o){ ttMa[o.to] = o; });
        var thieuTT = Object.keys(daGhep).filter(function(m){ return !ttMa[m]; }).map(function(m){ return [m, (T[m]||{}).ten||'', (T[m]||{}).tenXa||'', (T[m]||{}).dn||0]; });
        var khongLEN = co.tt.filter(function(o){ return !daGhep[o.to] && (!o.ttTo || o.ttTo==='A') && (T[o.to] && T[o.to].dn>0); }).map(function(o){ return [o.to, o.toTen||'', o.tenXa||'', (T[o.to]||{}).dn||0]; });
        them(3, 'Tổ có dư nợ (LEN_31) có trong Thông tin tổ trưởng', !thieuTT.length, thieuTT.length ? thieuTT.length+' tổ chưa có' : 'đủ '+Object.keys(daGhep).length+' tổ', '', ['Mã tổ', 'Tổ', 'Xã', 'Dư nợ'], thieuTT);
        if(khongLEN.length) them(3, 'Tổ đang hoạt động có dư nợ (Mẫu 31) nhưng không có dòng LEN_31', false, khongLEN.length+' tổ', '', ['Mã tổ', 'Tổ', 'Xã', 'Dư nợ Mẫu 31'], khongLEN, 'canh');
      }
    }
  }
  /* 3. KHĐ (mẫu 14) ↔ Mẫu 31: cùng món phải cùng số; món đủ điều kiện mà file không có thì lưu ý (hệ thống bỏ món khoanh, HSSV — anh kiểm) */
  if(co.khd && hs){
    var mon = {}; hs.forEach(function(o){ if(o.ku) mon[o.ku] = o; });
    var sai = [];
    co.khd.forEach(function(o){ var m = mon[o.ku]; if(!m) return;
      [['dn','Dư nợ'],['qh','Quá hạn']].forEach(function(f){ if(Math.abs((o[f[0]]||0)-(m[f[0]]||0))>0.5) sai.push([o.ku, o.ten||'', f[1], o[f[0]]||0, m[f[0]]||0]); });
      if(typeof o.lt==='number' && Math.abs(o.lt-laiTon(m))>1) sai.push([o.ku, o.ten||'', 'Lãi tồn', o.lt, laiTon(m)]);
      if(o.ngdg && m.ngdg && o.ngdg!==m.ngdg) sai.push([o.ku, o.ten||'', 'Ngày GD gần nhất', ngayVNsl(o.ngdg), ngayVNsl(m.ngdg)]); });
    them(3, 'Món vay 3 tháng KHĐ ↔ Mẫu 31 cùng món (dư nợ, quá hạn, lãi tồn, ngày GD gần nhất)', !sai.length, sai.length ? sai.length+' dòng lệch' : 'khớp '+co.khd.length+' món', '', ['Số KU', 'Họ tên', 'Chỉ tiêu', 'File KHĐ', 'Mẫu 31'], sai);
    var coKHD = {}; co.khd.forEach(function(o){ coKHD[o.ku] = 1; });   /* 3.173: so theo luật hệ thống (slKHDLy) */
    var tinh = slKHDTinh(hs, ky), coTinh = {}; tinh.forEach(function(o){ coTinh[o.ku] = 1; });
    var khop = co.khd.filter(function(o){ return coTinh[o.ku]; }).length;
    var lech = co.khd.filter(function(o){ return !coTinh[o.ku]; }).map(function(o){ var m = mon[o.ku] || {}, ly = m.ku ? slKHDLy(m, ky) : '';
        return [o.ku, o.ten||'', ctNgan(m.ct, m), ngayVNsl(m.ngn), ngayVNsl(o.ngdg || m.ngdg), o.dn||0, 'chỉ có trong file'+(ly ? ' — app: '+SL_KHD_LY[ly] : (m.ku ? '' : ' — không có trên Mẫu 31'))]; })
      .concat(tinh.filter(function(o){ return !coKHD[o.ku]; }).map(function(o){ var m = mon[o.ku] || {}; return [o.ku, o.ten||'', ctNgan(m.ct, m), ngayVNsl(m.ngn), ngayVNsl(o.ngdg), o.dn||0, 'app tính ra, file không có']; }));
    them(3, 'KHĐ app tự tính (luật hệ thống) ↔ file KHĐ (mẫu 14)', !lech.length, 'tính '+tinh.length+' · file '+co.khd.length+' · khớp '+khop+' món',
      lech.length ? 'Món lệch giữa số app tự tính và file KHĐ — anh kiểm (ghi nhận, không sửa).' : '', ['Số KU', 'Họ tên', 'Chương trình', 'Ngày GN đầu', 'Ngày GD gần nhất', 'Dư nợ', 'Lệch'], lech, lech.length ? 'canh' : '');
    var dem = {}, loai = [];
    hs.forEach(function(o){ if(!o.ku || dem['_'+o.ku]) return; dem['_'+o.ku] = 1; var ly = slKHDLy(o, ky);
      if(['khoanh','hssv','anhan','ls0'].indexOf(ly)<0) return; dem[ly] = (dem[ly]||0)+1; loai.push([o.ku, o.ten||'', ctNgan(o.ct, o), ngayVNsl(o.ngn), ngayVNsl(o.ngdg), o.dn||0, SL_KHD_LY[ly]]); });
    them(3, 'Món quá 3 tháng không giao dịch nhưng được loại theo luật hệ thống', true,
      loai.length ? ['anhan','hssv','khoanh','ls0'].filter(function(k){ return dem[k]; }).map(function(k){ return dem[k]+' món '+SL_KHD_LY[k]; }).join(' · ') : 'không có',
      '', ['Số KU', 'Họ tên', 'Chương trình', 'Ngày GN đầu', 'Ngày GD gần nhất', 'Dư nợ', 'Lý do loại'], loai, '');
  }
}

/* ==========================================================
   3.90 — 📊 TAB CON TỔNG HỢP (Số liệu): tiêu chí + bộ lọc → tích → Xem → In (A4 ngang) / Excel
   - cấp PGD / xã: số chuẩn TW lấy thẳng; điểm GD / hội / tổ: cộng từ các dòng tổ LEN_31 (chuẩn TW)
   - lọc sâu hơn (chương trình, nguồn vốn, tổ…) ngoài biểu TW: tính từ Mẫu 31, ghi "tham khảo", tự đối chiếu với số chuẩn của xã
   ========================================================== */
var TH_BC = [   /* 3.164 (anh chốt): 3 nhóm · nhãn cấp · sau = phạm vi / lọc mà biểu KHÔNG chia được (đang chọn → báo cáo mờ + dòng vàng đầu bảng) */
  {k:'xa',  nhom:'tw', cap:'PGD · Xã', ten:'Kết quả cho vay theo xã — BCDHTD 01.1', can:['bx'], sau:['diem','hoi','to','ct','nguon'], toi:'xã'},
  {k:'ct',  nhom:'tw', cap:'PGD', ten:'Kết quả cho vay theo chương trình — BCDHTD 01.2', can:['bc'], sau:['xa','diem','hoi','to','ct','nguon'], toi:'toàn PGD'},
  {k:'dv',  nhom:'len', cap:'PGD · Xã · Điểm', ten:'Theo đơn vị hành chính: PGD → xã → điểm GD — LEN_31', can:['lx'], sau:['hoi','to','ct','nguon'], toi:'điểm GD'},
  {k:'hoi', nhom:'len', cap:'→ Tổ', ten:'Theo hội đoàn thể — LEN_31 ĐVUT', can:['lh'], sau:['ct','nguon']},
  {k:'ctx', nhom:'len', cap:'Xã · Hội', ten:'Theo chương trình của từng xã · hội — LEN_31 CHTRINH', can:['lc'], sau:['diem','to','nguon'], toi:'hội của xã'},
  {k:'to',  nhom:'len', cap:'→ Tổ', ten:'Theo tổ trưởng — LEN_31 TO_TRUONG', can:['lt'], sau:['ct','nguon']},
  {k:'tg',  nhom:'len', cap:'→ Tổ', ten:'Tiền gửi tổ viên — LEN_31', can:['lh','lt'], sau:['ct','nguon']},
  {k:'nv',  nhom:'m31', cap:'→ Tổ', ten:'Theo nguồn vốn Trung ương / Địa phương — tính từ Mẫu 31', can:['hstd'], sau:['ct']},   /* 3.145: bỏ B32 (anh chốt) · 3.164: lọc tới tổ */
  {k:'tk',  nhom:'m31', cap:'→ Tổ · CT · Nguồn', ten:'Lọc sâu theo phạm vi, chương trình, nguồn — tính từ Mẫu 31 (tham khảo, có đối chiếu số chuẩn)', can:['hstd'], sau:[]}
];
var TH_NHOM = [['tw', 'Chuẩn TW'], ['len', 'LEN_31'], ['m31', 'Tính từ Mẫu 31']];
function thSau(b, S){ return (b.sau||[]).filter(function(f){ return S[f]; }); }   /* các lựa chọn đang chọn mà biểu không chia */
function thChon(){ var C = thCH(); if(C.bcChon && TH_BC.some(function(b){ return b.k===C.bcChon; })) return C.bcChon;   /* 3.164: mỗi lần 1 báo cáo; dữ liệu cũ tích nhiều → giữ cái đầu */
  var cu = TH_BC.find(function(b){ return C.bc[b.k]; }), B = TH_K && TH_K.B, du = B ? TH_BC.find(function(b){ return b.can.some(function(L){ return kcBang(B, L); }); }) : null;
  return (cu || du || TH_BC[0]).k; }
function thChonBC(k){ thCH().bcChon = k; luu(); veTongHop(); }
var TH_K = null, TH_KS = {}, TH_XEM = [], BC_KY = 'PGD NHCSXH GÒ DẦU', BC_DV = 'PGD NHCSXH GÒ DẦU';   /* 3.139 (anh chốt): góc trên trái mọi báo cáo app lập — in đậm */
function thCH(){ var C = D.cauHinh.thTK = D.cauHinh.thTK || {ky:'', xa:'', diem:'', hoi:'', to:'', bc:{xa:true}, ct:'', nguon:''}; C.bc = C.bc || {}; return pvGan(C); }
PV_DUNG.th = {S:function(){ return thCH(); }, K:function(){ return TH_K && TH_K.K; }, sau:function(){ clearTimeout(TH_PV_HEN); TH_PV_HEN = setTimeout(thXemNgay, 0); }};   /* 3.164: đổi phạm vi → xem lại ngay */
function thDsKy(){
  var ky = {};
  KHO.dsBang().forEach(function(e){ var L = slLoai(e.loai); if(L && (L.nhom==='A' || e.loai==='hstd')) ky[e.ky] = 1; });
  return Object.keys(ky).sort(function(a, b){ return slThuTu(a)<slThuTu(b) ? 1 : -1; }).map(function(k){
    var n = SL_LOAI.filter(function(L){ return L.nhom==='A' && KHO.bang(L.k, k); }).length;
    return {ky:k, chu:slKyChu(k)+' · '+n+'/7 file TW'+(KHO.bang('hstd', k) ? ' · Mẫu 31' : '')}; });
}
function thNap(ky){
  if(TH_K && TH_K.ky===ky) return Promise.resolve(TH_K);
  if(TH_KS[ky]){ slDung(ky); return Promise.resolve(TH_K = TH_KS[ky]); }   /* 3.125: giữ phần tổng hợp đã tính theo kỳ */
  return KHO.bo(ky).then(function(B){
    return KHO.nap(ky).then(function(K){
      var hs = (kcGoc(B) && B.hsTen==='Mẫu 31') ? kcGoc(B) : null;   /* 3.382: qua kho chuẩn */
      var G = kcBang(B, 'lt') ? twGhepTo(kcBang(B, 'lt'), twToTu(K.hs, K.to)) : [];
      TH_K = TH_KS[ky] = {ky:ky, B:B, K:K, hs:hs, G:G}; slBot(TH_KS); return TH_K;
    });
  });
}
function veTongHop(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veTongHop); return; }
  var C = thCH(), ds = thDsKy();
  if(!ds.length){ e.innerHTML = slTabConHTML()+'<div class="rong">Chưa có file tổng hợp TW (BCDHTD, LEN_31) hay Mẫu 31. Nạp ở tab con <b>📥 Nạp &amp; Kiểm tra</b>.</div>'; return; }
  var kc = kyChungLay(); if(kc) C.ky = kc;   /* 3.149: kỳ chung */
  if(!ds.some(function(x){ return x.ky===C.ky; })){ var kt = ds.find(function(x){ return x.ky.length===7 && (!kc || x.ky<=kc); }) || ds[0]; C.ky = kt.ky; }
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'… (bảng chưa có trong máy thì tải từ Drive)</div>';
  thNap(C.ky).then(function(TK){
    if(!(nganHienTai===7 && D.cauHinh.slTab==='th')) return;
    var B = TK.B, ct = {};
    (TK.K.hs||[]).forEach(function(o){ if(o.ku && o.ct) ct[o.ct] = 1; });
    e.innerHTML = slTabConHTML()+kyGhiHTML({ky:C.ky})+
      (TK.K.thieuBang ? '<div class="sl-bao vang">⚠ Bảng số liệu chưa có trên máy này (lưu trên Drive, chưa tải về).<div class="hang-nut"><button class="nho chinh" onclick="toNoiDrive()">☁ Nối Drive và tải</button><button class="nho" onclick="toThuLai()">⟳ Thử lại</button></div></div>' : '')+
      /* 3.157 (anh chốt — kiểu lọc SỐ LIỆU): ① Nguồn vốn (chip, lọc lớn nhất) → ② địa bàn (cây chung, hàng chip Điểm GD · Hội · Tổ) → ③ Chương trình; danh sách báo cáo 1 dòng / báo cáo */
      '<div class="th-loc-hang"><div class="th-loc-1"><div class="th-loc th-nguon"><span class="pv-nhan">Nguồn vốn</span>'+[['', 'Tất cả'], ['1', 'Trung ương'], ['2', 'Địa phương']].map(function(x){ return '<button class="to-chip'+((C.nguon||'')===x[0] ? ' bat' : '')+'" onclick="thCH().nguon=\''+x[0]+'\';luu();veTongHop()">'+x[1]+'</button>'; }).join('')+'</div>'+
      '<div class="th-loc th-ct"><span class="pv-nhan">Chương trình</span><select onchange="thCH().ct=this.value;luu();veTongHop()"><option value="">Tất cả chương trình</option>'+Object.keys(ct).sort().map(function(k){ return '<option value="'+k+'"'+(C.ct===k ? ' selected' : '')+'>'+coChuHTML(ctNgan(k))+'</option>'; }).join('')+'</select>'+
        (C.ct ? '<button class="to-chip bat" onclick="thCH().ct=\'\';luu();veTongHop()" title="Bỏ lọc chương trình">'+coChuHTML(ctNgan(C.ct))+' ✕</button>' : '')+'</div></div>'+   /* 3.168 (anh 11/10): Nguồn vốn + Chương trình 1 dòng, cây lọc dưới */
      '<div id="th-cay" class="to-cay pv-cay"></div></div>'+

      /* 3.164 (anh chốt): danh sách 3 nhóm (Chuẩn TW / LEN_31 / Tính từ Mẫu 31), nhãn cấp, chọn 1 báo cáo (◉) → xem ngay ở khung phải; bỏ nút Xem + hộp xem, bỏ in nhiều báo cáo 1 lần */
      '<div class="th-bo th-bo2"><div class="th-cot"><div class="to-bc th-bc-gon" id="th-ds">'+thDsHTML(B, C)+'</div>'+(typeof btNutHTML==='function' ? '<div class="to-bc th-bc-gon bt-khoi">'+btNutHTML()+'</div>' : '')+'</div>'+
      '<div class="th-cot th-xem"><div id="th-xem-nut"></div><iframe id="th-xem-khung" class="to-khung th-khung" title="Xem trước"></iframe></div></div>';
    pvVeCay('th');
  }).catch(function(er){ e.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+'</div><div class="hang-nut"><button class="nho chinh" onclick="toThuLai()">⟳ Thử lại</button></div>'; });
}
function thDsHTML(B, C){
  var chon = thChon();
  return TH_NHOM.map(function(n){ return '<div class="th-nhom-ten">'+n[1]+'</div>'+TH_BC.filter(function(b){ return b.nhom===n[0]; }).map(function(b){
    var co = b.can.some(function(L){ return kcBang(B, L); }), sau = thSau(b, C);
    var tit = [b.ten, co ? '' : 'Chưa nạp '+b.can.map(function(L){ return slLoai(L).ten; }).join(' / '), !sau.length ? '' : b.toi && sau.some(function(v){ return ['xa','diem','hoi','to'].indexOf(v)>=0; }) ? 'Biểu này chỉ chia tới '+b.toi+' — phạm vi đang chọn sâu hơn' : 'Biểu này không lọc được chương trình / nguồn vốn'].filter(Boolean).join('\n');
    return '<label class="to-bc-dong'+(co ? '' : ' th-mo')+(sau.length ? ' th-mo2' : '')+(b.k===chon ? ' bat' : '')+'"'+(tit ? ' title="'+coChuHTML(tit)+'"' : '')+'>'+
      '<input type="radio" name="th-bc"'+(b.k===chon ? ' checked' : '')+' onchange="thChonBC(\''+b.k+'\')"> '+coChuHTML(b.ten.split(' — ')[0])+' <span class="th-cap">['+b.cap+']</span>'+(co ? '' : ' <span class="th-thieu">⚠</span>')+'</label>'; }).join(''); }).join('');
}
var TH_PV_HEN = null;
function thXemNgay(){   /* 3.164: xem ngay báo cáo đang chọn ở khung phải (đổi phạm vi / lọc → vẽ lại) */
  var f = document.getElementById('th-xem-khung'), n = document.getElementById('th-xem-nut'), C = thCH(); if(!f || !TH_K) return;
  var ds = document.getElementById('th-ds'); if(ds) ds.innerHTML = thDsHTML(TH_K.B, C);
  var b = TH_BC.find(function(x){ return x.k===thChon(); }), sau = thSau(b, C);
  var pv = pvChu(C, TH_K.K)+(C.ct ? ' · CT '+ctNgan(C.ct) : '')+(C.nguon ? ' · nguồn '+(SL_NGUON[C.nguon]||C.nguon) : '');
  try{ CT_DUNG = {}; var x = thBaoCao(b.k); x.pv = pv; x.ctChu = ctChuThich(); CT_DUNG = null; }
  catch(er){ CT_DUNG = null; f.srcdoc = '<p style="font-family:sans-serif;color:#b00">Lập báo cáo lỗi: '+coChuHTML(er && er.message || er)+'</p>'; return; }
  var sauPV = sau.filter(function(v){ return ['xa','diem','hoi','to'].indexOf(v)>=0; }), sauLoc = sau.filter(function(v){ return v==='ct' || v==='nguon'; });
  if(sau.length) x.html = '<div class="bc-canh">⚠ '+(sauPV.length ? 'Biểu này chỉ chia tới '+b.toi+' — đang hiện số '+(b.k==='ct' ? 'toàn PGD' : b.toi==='điểm GD' ? 'cả điểm GD' : 'cả xã') : 'Biểu này')+
    (sauLoc.length ? (sauPV.length ? '; ' : ' ')+'không lọc được '+sauLoc.map(function(v){ return v==='ct' ? 'chương trình' : 'nguồn vốn'; }).join(', ') : '')+'. Xem “Lọc sâu” để có số đúng phạm vi.</div>'+x.html;
  TH_XEM = [x];
  if(n) n.innerHTML = xuatHang({ten:xuatTen(x.ten, pv, TH_K.ky), html:function(){ return thHTMLIn(TH_XEM); }, excel:'thExcel()', dong:'thXemRong()', dongChu:'⤢ Phóng to'});
  xemChuan(f, thHTMLIn(TH_XEM)); thVuaKhung();
}
/* 3.168 (anh 11/10): tab Số liệu gọn 1 cửa sổ — đo chiều cao header + khối lọc (CSS dùng cho lọc cố định + bảng cuộn vừa phần còn lại) */
function slVua(){ if(nganHienTai!==7) return; var r = document.documentElement.style, d = document.querySelector('.dau'), c = document.querySelector('#tr7 .pv-cay');
  r.setProperty('--dau-cao', (d ? d.offsetHeight : 52)+'px'); r.setProperty('--loc-cao', (c ? c.offsetHeight : 0)+'px'); thVuaKhung();
  if(window.innerWidth>=900) Array.prototype.forEach.call(document.querySelectorAll('#tr7 .to-cuon-khung'), function(k){   /* bảng cuộn trong khung, vừa phần còn lại của cửa sổ */
    var top = k.getBoundingClientRect().top + (window.pageYOffset||0); k.style.maxHeight = Math.max(220, window.innerHeight - top - 26)+'px';
    var du = document.documentElement.scrollHeight - window.innerHeight;   /* 3.169: còn phần dưới bảng (vd. hàng "Báo cáo của tổ") → bớt chiều cao bảng cho hiện đủ */
    if(du>0) k.style.maxHeight = Math.max(220, parseFloat(k.style.maxHeight) - du - 4)+'px'; }); }
window.addEventListener('resize', function(){ clearTimeout(window.__slVua); window.__slVua = setTimeout(slVua, 150); });
/* 3.168 (anh 11/10): khung xem cao vừa cửa sổ, bảng cuộn bên trong khung (trang không phải cuộn dài) */
function thVuaKhung(){ var f = document.getElementById('th-xem-khung') || document.getElementById('hso-xem-khung'); if(!f || !f.offsetParent) return;   /* 3.170: + khung xem tab Hồ sơ */
  var h = window.innerHeight - f.getBoundingClientRect().top - 22; f.style.height = Math.max(320, h)+'px'; }
window.addEventListener('resize', function(){ clearTimeout(window.__thVua); window.__thVua = setTimeout(thVuaKhung, 150); });
function thXemRong(id){ var f = document.getElementById(id || 'th-xem-khung');
  if(f && !f.offsetParent && id==='hso-xem-khung' && typeof hsoXemHop==='function') return hsoXemHop();   /* 3.238 (anh báo): khung xem đang ẩn (📒 Sổ hộ vay) → bung toàn màn hình khung ẩn = màn trống che hộp ＋ Hộ mới; nay xem trong hộp */
  if(f && f.requestFullscreen) f.requestFullscreen(); else if(!id) thXem1(); }
function thXem1(){ if(!TH_XEM.length) return; moHop('<div class="hop-tit">👁 '+coChuHTML(TH_XEM[0].tieuDe)+'</div><iframe id="th-khung2" class="to-khung" title="Xem"></iframe><div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button></div>', true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong'); xemChuan(document.getElementById('th-khung2'), thHTMLIn(TH_XEM)); }
/* số triệu đồng (biểu BCDHTD): d chữ số thập phân */
function thTr(n, d){ return (n/1e6).toLocaleString('vi-VN', {minimumFractionDigits:d===undefined ? 3 : d, maximumFractionDigits:d===undefined ? 3 : d}); }
function thTenXa(S, K){ if(!S.xa) return ''; var T = (K && K.to) || {}, m = Object.keys(T).find(function(x){ return T[x].xa===S.xa; }); return m ? (T[m].tenXa||'') : ''; }
/* tổ LEN trong phạm vi: dòng ghép có tổ nằm trong phạm vi (trực tiếp / chưa ghép chỉ thuộc phạm vi xã trở lên) */
function thToTrongPV(TK, S){
  var T = TK.K.to||{}, xa = slChuan(thTenXa(S, TK.K));
  return TK.G.filter(function(g){
    if(!S.xa) return true;
    if(slChuan(g.o.xa)!==xa) return false;
    if(!g.ma.length) return !S.diem && !S.hoi && !S.ap && !S.to;
    return g.ma.some(function(m){ return pvLoc(S, T[m]); });
  });
}
function thDiemCua(TK, g){ var t = g.ma.length ? (TK.K.to||{})[g.ma[0]] : null; return g.tt ? 'Vay trực tiếp' : (t ? t.tenDiemDu : '(chưa ghép được tổ)'); }
var TH_COT_BC = ['TT','Tên','Doanh số cho vay|Trong tháng','Doanh số cho vay|Lũy kế năm','Doanh số thu nợ|Trong tháng','Doanh số thu nợ|Lũy kế năm','Doanh số xóa nợ|Trong tháng','Doanh số xóa nợ|Lũy kế năm','Tổng dư nợ','Phân theo tính chất nợ|Trong hạn','Phân theo tính chất nợ|Quá hạn','Phân theo tính chất nợ|Khoanh','Phân theo thời hạn|Ngắn hạn','Phân theo thời hạn|Trung hạn','Phân theo thời hạn|Dài hạn','Số KH dư nợ','Số lượt KH vay'];   /* 3.92: "Nhóm|Cột" = tiêu đề 2 tầng như 01.1 */
function thDongBC(o, lop){ return {lop:lop||'', o:[o.stt||'', o.ten, o.cvT||0, o.cvN||0, o.tnT||0, o.tnN||0, o.xoaT||0, o.xoaN||0, o.dn||0, o.th||0, o.qh||0, o.kn||0, o.ngan||0, o.trung||0, o.dai||0, {dem:o.khDn||0}, {dem:o.sluot||0}]}; }
var TH_COT_LEN = ['Số tổ','Số hộ','Dư nợ|Tổng','Dư nợ|Trong hạn','Dư nợ|Quá hạn','Dư nợ|Khoanh','Dư tiền gửi','Trong tháng|Cho vay','Trong tháng|Thu nợ','Trong tháng|Thu lãi','Trong tháng|Thu TK','Trong tháng|Chi TK'];
function thSoLEN(o){ return [{dem:o.soTo||0}, {dem:o.ho||0}, o.dn||0, o.th||0, o.qh||0, o.kn||0, o.tg||0, o.cv||0, o.tn||0, o.tl||0, o.ttk||0, o.ctk||0]; }
function thCongLEN(ds){ var c = {soTo:0, ho:0, dn:0, th:0, qh:0, kn:0, tg:0, cv:0, tn:0, tl:0, ttk:0, ctk:0}; ds.forEach(function(o){ Object.keys(c).forEach(function(f){ c[f] += o[f]||0; }); }); return c; }
/* ô {dem:n} = số đếm (không đổi đơn vị) */
function thO(v, dv){ return (v && typeof v==='object' && v.dem!==undefined) ? tdnTien(v.dem) : dv(v); }
/* 3.92 (khuôn 01.1): tiêu đề 2 tầng (cột "Nhóm|Cột" gộp nhóm liền nhau), hàng đánh số cột (1) (2) …, mỗi dòng 1 hàng (không xuống dòng khi in) */
function thBang2(cot, dong, dv){
  var o = function(v, j){ var so = typeof v==='number' || (v && typeof v==='object'); return '<td class="'+(so ? 's' : (j===0 ? 'c' : ''))+'">'+(so ? thO(v, dv) : coChuHTML(String(v==null ? '' : v)))+'</td>'; };
  var hai = cot.some(function(c){ return c.indexOf('|')>=0; }), h1 = '', h2 = '';
  for(var j=0;j<cot.length;j++){
    var p = cot[j].split('|');
    if(p.length<2){ h1 += '<th'+(hai ? ' rowspan="2"' : '')+'>'+p[0]+'</th>'; continue; }
    var n = 1; while(j+n<cot.length && cot[j+n].split('|')[0]===p[0] && cot[j+n].indexOf('|')>=0) n++;
    h1 += '<th colspan="'+n+'">'+p[0]+'</th>'; for(var q=0;q<n;q++) h2 += '<th>'+cot[j+q].split('|')[1]+'</th>'; j += n-1;
  }
  var so = '<tr class="th-so">'+cot.map(function(c, j){ return '<td>('+(j+1)+')</td>'; }).join('')+'</tr>';
  return '<table class="bc-bang th-bang"><thead><tr>'+h1+'</tr>'+(hai ? '<tr>'+h2+'</tr>' : '')+so+'</thead><tbody>'+
    dong.map(function(r){ return '<tr'+(r.lop ? ' class="'+r.lop+'"' : '')+'>'+r.o.map(o).join('')+'</tr>'; }).join('')+'</tbody></table>';
}
function thAoa2(cot, dong, chia){ return [cot.map(function(c){ return c.replace('|', ' — '); })].concat(dong.map(function(r){ return r.o.map(function(v){ return (v && typeof v==='object') ? v.dem : (typeof v==='number' && chia ? v/chia : v); }); })); }
function thBaoCao(k){
  var TK = TH_K, B = TK.B, K = TK.K, S = thCH(), xa = slChuan(thTenXa(S, K)), sau = !!(S.diem || S.hoi || S.ap || S.to), loc = !!(S.ct || S.nguon);
  var e = function(L){ return KHO.bang(L, TK.ky); }, ngayCua = function(L){ var x = e(L); return x ? 'Số liệu ngày '+ngayVNsl(x.ngay)+' · nguồn '+slLoai(L).ten : ''; };
  var thieu = function(ten, L){ return {ten:ten.slice(0, 31), tieuDe:ten.toUpperCase(), ngay:slKyChu(TK.ky), html:'<div class="bc-rong">Chưa nạp '+coChuHTML(L.map(function(x){ return slLoai(x).ten; }).join(' / '))+' của '+coChuHTML(slKyChu(TK.ky))+'.</div>', aoa:[['Chưa nạp file']]}; };
  var ghiSau = function(){ return (sau || loc) ? '<div class="bc-ghi">Biểu TW này chỉ chia đến cấp '+(k==='ct' ? 'PGD' : 'xã')+'; phạm vi / chương trình / nguồn chi tiết hơn xem báo cáo “Lọc sâu … (tham khảo)”.</div>' : ''; };
  var tr = function(v){ return thTr(v, 2); }, dong = tr;   /* 3.92 (anh chốt, khuôn 01.1): mọi bảng tổng hợp in triệu đồng 2 số lẻ */
  if(k==='xa' || k==='ct'){
    var L = k==='xa' ? 'bx' : 'bc', rows = kcBang(B, L); if(!rows) return thieu(k==='xa' ? 'Ket qua cho vay theo xa' : 'Ket qua cho vay theo CT', [L]);
    var ds = rows.filter(function(o){ return o.cap!=='tong' && (k==='ct' || !xa || slChuan(o.ten)===xa); }).map(function(o){ return thDongBC(o); });
    var tong = rows.find(function(o){ return o.cap==='tong'; });
    if(tong && !(k==='xa' && xa)) ds.push(thDongBC(tong, 'tong'));
    var cot = TH_COT_BC.slice(); cot[1] = k==='xa' ? 'Xã / phường' : 'Chương trình vay';
    return {ten:k==='xa' ? 'BCDHTD 01.1' : 'BCDHTD 01.2', tieuDe:'BÁO CÁO KẾT QUẢ CHO VAY HỘ NGHÈO VÀ CÁC ĐỐI TƯỢNG CHÍNH SÁCH — '+(k==='xa' ? 'THEO XÃ' : 'THEO CHƯƠNG TRÌNH'), ngay:ngayCua(L), dv:'Đơn vị: triệu đồng, khách hàng',
      html:thBang2(cot, ds, tr)+(k==='ct' && xa ? '<div class="bc-ghi">Biểu 01.2 không chia theo xã — đang hiện số toàn PGD.</div>' : '')+ghiSau(), aoa:thAoa2(cot, ds, 1e6)};
  }
  if(k==='dv'){
    if(!kcBang(B, 'lx')) return thieu('Don vi hanh chinh', ['lx']);
    var dsx = kcBang(B, 'lx').filter(function(o){ return o.cap==='xa' && (!xa || slChuan(o.ten)===xa); }), dsD = [], cotD = ['Đơn vị'].concat(TH_COT_LEN);
    if(!xa){ var tg0 = kcBang(B, 'lx').find(function(o){ return o.cap==='tong'; }); if(tg0) dsD.push({lop:'tong', o:['Toàn PGD'].concat(thSoLEN(tg0))}); }
    dsx.forEach(function(x){
      dsD.push({lop:'nhom', o:[x.ten].concat(thSoLEN(x))});
      if(!kcBang(B, 'lt')) return;
      var theo = {}, thu = [];
      thToTrongPV(TK, S).filter(function(g){ return slChuan(g.o.xa)===slChuan(x.ten); }).forEach(function(g){ var d = thDiemCua(TK, g); if(!theo[d]){ theo[d] = []; thu.push(d); } theo[d].push(g.o); });
      thu.sort(function(a, b){ return a.localeCompare(b, 'vi'); }).forEach(function(d){ var c = thCongLEN(theo[d]); c.soTo = theo[d].filter(function(o){ return o.dv!=='99'; }).length; dsD.push({o:['   Điểm GD '+d].concat(thSoLEN(c))}); });
    });
    return {ten:'Don vi hanh chinh', tieuDe:'TỔNG HỢP SỐ LIỆU TÍN DỤNG THEO ĐƠN VỊ HÀNH CHÍNH', ngay:ngayCua('lx'), dv:'Đơn vị: triệu đồng, hộ',
      html:thBang2(cotD, dsD, dong)+'<div class="bc-ghi">Dòng xã: LEN_31 XAPUONG. Dòng điểm GD: cộng các dòng tổ của LEN_31 TO_TRUONG (ghép tổ → điểm GD theo Thông tin tổ trưởng)'+(sau ? '; đang lọc theo phạm vi nên dòng xã là số cả xã' : '')+'.</div>', aoa:thAoa2(cotD, dsD, 1e6)};
  }
  if(k==='hoi' || k==='tg'){
    var tgOnly = k==='tg', cotH = tgOnly ? ['Đơn vị','Số hộ','Dư tiền gửi','Thu TK trong tháng','Chi TK trong tháng','Tăng (giảm) trong tháng','Bình quân / hộ'] : ['Đơn vị'].concat(TH_COT_LEN);
    var soH = function(o){ return tgOnly ? [{dem:o.ho||0}, o.tg||0, o.ttk||0, o.ctk||0, (o.ttk||0)-(o.ctk||0), o.ho ? Math.round((o.tg||0)/o.ho) : 0] : thSoLEN(o); };
    var dsH = [];
    if(sau && kcBang(B, 'lt')){   /* điểm GD / hội / tổ: cộng dòng tổ LEN_31 theo hội */
      var theoH = {}, thuH = [];
      thToTrongPV(TK, S).forEach(function(g){ var t = g.ma.length ? (K.to||{})[g.ma[0]] : null, h = g.tt ? '99' : String(t && t.dv || ''); if(!theoH[h]){ theoH[h] = []; thuH.push(h); } theoH[h].push(g.o); });
      thuH.sort().forEach(function(h){ var c = thCongLEN(theoH[h]); dsH.push({lop:'nhom', o:[twTenHoi(h)].concat(soH(c))});
        if(S.hoi || S.to || tgOnly) theoH[h].forEach(function(o){ dsH.push({o:['   Tổ '+o.ten].concat(soH(o))}); }); });
      var cA = thCongLEN([].concat.apply([], thuH.map(function(h){ return theoH[h]; }))); dsH.push({lop:'tong', o:['Cộng '+pvChu(S, K).replace(/^Toàn PGD · /, '')].concat(soH(cA))});   /* 3.164 */
    } else {
      if(!kcBang(B, 'lh')) return thieu(tgOnly ? 'Tien gui' : 'Theo hoi', ['lh']);
      kcBang(B, 'lh').forEach(function(o){
        if(o.cap==='tong'){ if(!xa) dsH.push({lop:'tong', o:['Toàn PGD'].concat(soH(o))}); return; }
        if(xa && slChuan(o.cap==='xa' ? o.ten : o.xa)!==xa) return;
        dsH.push(o.cap==='xa' ? {lop:'nhom', o:[o.ten].concat(soH(o))} : {o:['   '+twTenHoi(o.dv)].concat(soH(o))});
      });
    }
    return {ten:tgOnly ? 'Tien gui to vien' : 'Theo hoi', tieuDe:tgOnly ? 'TỔNG HỢP TIỀN GỬI CỦA TỔ VIÊN TỔ TK&VV' : 'TỔNG HỢP SỐ LIỆU TÍN DỤNG THEO HỘI ĐOÀN THỂ NHẬN ỦY THÁC', ngay:ngayCua(sau ? 'lt' : 'lh'), dv:'Đơn vị: triệu đồng, hộ',
      html:thBang2(cotH, dsH, dong)+(sau ? '<div class="bc-ghi">Phạm vi dưới cấp xã: cộng các dòng tổ của LEN_31 TO_TRUONG.</div>' : ''), aoa:thAoa2(cotH, dsH, 1e6)};
  }
  if(k==='ctx'){
    if(!kcBang(B, 'lc')) return thieu('Theo chuong trinh', ['lc']);
    var ten2ma = {}; (TK.hs||[]).forEach(function(o){ if(o.ct && o.ctTen) ten2ma[slChuan(o.ctTen)] = o.ct; });
    var dsC = [], cotC = ['Đơn vị / chương trình'].concat(TH_COT_LEN), dvC = '';
    kcBang(B, 'lc').forEach(function(o){
      if(o.cap==='tong'){ if(!xa && !S.hoi && !S.ct) dsC.push({lop:'tong', o:['Toàn PGD'].concat(thSoLEN(o))}); return; }
      if(xa && slChuan(o.cap==='xa' ? o.ten : o.xa)!==xa) return;
      if(o.cap==='xa'){ dsC.push({lop:'nhom', o:[o.ten].concat(thSoLEN(o))}); return; }
      if(o.cap==='hoi'){ dvC = o.dv; if(S.hoi && o.dv!==S.hoi) return; dsC.push({lop:'cong', o:['  '+twTenHoi(o.dv)].concat(thSoLEN(o))}); return; }
      if(S.hoi && o.dv!==S.hoi) return;
      if(S.ct && ten2ma[slChuan(o.ten)]!==S.ct) return;
      dsC.push({o:['     '+o.ten].concat(thSoLEN(o))});
    });
    return {ten:'Theo chuong trinh', tieuDe:'TỔNG HỢP SỐ LIỆU TÍN DỤNG THEO CHƯƠNG TRÌNH — TỪNG XÃ, HỘI', ngay:ngayCua('lc'), dv:'Đơn vị: triệu đồng, hộ',
      html:thBang2(cotC, dsC, dong)+(S.ct && !Object.keys(ten2ma).length ? '<div class="bc-ghi">Chưa có Mẫu 31 cùng kỳ để nhận mã chương trình — chưa lọc theo chương trình.</div>' : '')+(S.diem || S.to ? '<div class="bc-ghi">Biểu CHTRINH chia đến hội của xã; điểm GD / tổ xem “Lọc sâu … (tham khảo)”.</div>' : ''), aoa:thAoa2(cotC, dsC, 1e6)};
  }
  if(k==='to'){
    if(!kcBang(B, 'lt')) return thieu('Theo to truong', ['lt']);
    var T = K.to||{}, theoD = {}, thuD = [];
    thToTrongPV(TK, S).forEach(function(g){ var d = (g.o.xa||'')+' · '+thDiemCua(TK, g); if(!theoD[d]){ theoD[d] = []; thuD.push(d); } theoD[d].push(g); });
    var dsT = [], cotT = ['STT','Tổ trưởng','Mã tổ','Ấp','Hội','Số hộ','Dư nợ','Quá hạn','Khoanh','Dư tiền gửi','Cho vay','Thu nợ','Thu lãi'], stt = 0, tAll = [];
    thuD.sort(function(a, b){ return a.localeCompare(b, 'vi'); }).forEach(function(d){
      dsT.push({lop:'nhom', o:[d, '', '', '', '', '', '', '', '', '', '', '', '']});
      theoD[d].sort(function(a, b){ return String(a.o.ten).localeCompare(String(b.o.ten), 'vi'); }).forEach(function(g){
        var t = g.ma.length ? T[g.ma[0]]||{} : {}; tAll.push(g.o);
        dsT.push({o:[++stt, g.o.ten, g.ma.join(', ') || (g.tt ? '' : '?'), t.tenThon||'', g.tt ? 'Trực tiếp' : tdnHoi(t.dv), {dem:g.o.ho||0}, g.o.dn||0, g.o.qh||0, g.o.kn||0, g.o.tg||0, g.o.cv||0, g.o.tn||0, g.o.tl||0]});
      });
    });
    var cT = thCongLEN(tAll); dsT.push({lop:'tong', o:['', 'Cộng '+stt+' dòng', '', '', '', {dem:cT.ho}, cT.dn, cT.qh, cT.kn, cT.tg, cT.cv, cT.tn, cT.tl]});
    return {ten:'Theo to truong', tieuDe:'TỔNG HỢP SỐ LIỆU TÍN DỤNG THEO TỔ TRƯỞNG', ngay:ngayCua('lt'), dv:'Đơn vị: triệu đồng, hộ',
      html:thBang2(cotT, dsT, dong)+'<div class="bc-ghi">LEN_31 không có mã tổ: app ghép theo tên tổ trưởng trong xã (mã tổ có 2 số = 2 tổ trùng tên tổ trưởng, LEN_31 gộp 1 dòng; “?” = chưa ghép được).</div>', aoa:thAoa2(cotT, dsT, 1e6)};
  }
  if(k==='nv'){   /* 3.145 (anh chốt Q16): bỏ B32 — doanh số + dư nợ theo nguồn vốn tính thẳng từ Mẫu 31 (cột Nguồn vốn: 1 = TW, 2 = ĐP) */
    var hsN = TK.hs || (kcGoc(B) || null);
    if(!hsN) return thieu('Theo nguon von', ['hstd']);
    var Tn = K.to||{}, trongN = function(o){ if(xa && slChuan(o.tenXa)!==xa) return false; if(sau){ var t = Tn[toMaCua(o)]; if(!t || !pvLoc(S, t)) return false; } return true; };   /* 3.164: sửa lỗi — trước chỉ lọc tới xã (chọn Điểm GD / Hội / Tổ vẫn ra số cả xã) */
    var nguonN = S.nguon || '', R = twTinh31(hsN, kcLap(B), function(o){ var n = String(o.nguon||''); if(!SL_NGUON[n] || (nguonN && n!==nguonN)) return null; if(!trongN(o)) return null; return n+'|'+(o.tenXa||''); });
    var cotN = ['Nguồn vốn · xã','Cho vay tháng|Không gồm đảo khoản','Cho vay tháng|Gồm đảo khoản','Thu nợ tháng','Cho vay lũy kế năm','Thu nợ lũy kế năm','Dư nợ|Tổng','Dư nợ|Quá hạn','Dư nợ|Khoanh','Số KH dư nợ'];
    var dongN2 = function(ten, x, lop){ return {lop:lop||'', o:[ten, x.cvT||0, x.gnT||0, x.tnT||0, x.cvN||0, x.tnN||0, x.dn||0, x.qh||0, x.kn||0, {dem:x.khDn||0}]}; };
    var dsN = [];
    ['1','2'].forEach(function(n){
      var ks = Object.keys(R).filter(function(kk){ return kk.split('|')[0]===n; }).sort(function(a, b){ return a.localeCompare(b, 'vi'); });
      if(!ks.length) return;
      var T = twTinh31(hsN, kcLap(B), function(o){ return String(o.nguon||'')===n && trongN(o) ? 't' : null; }).t || {};
      dsN.push(dongN2('Nguồn '+(n==='1' ? 'trung ương (TW)' : 'địa phương (ĐP)'), T, 'nhom'));
      ks.forEach(function(kk){ dsN.push(dongN2('   '+kk.split('|')[1], R[kk])); });
    });
    var Tc = twTinh31(hsN, kcLap(B), function(o){ return SL_NGUON[String(o.nguon||'')] && (!nguonN || String(o.nguon)===nguonN) && trongN(o) ? 't' : null; }).t;
    if(Tc && !nguonN) dsN.push(dongN2(xa || S.hoi ? 'Cộng '+pvChu(S, K).replace(/^Toàn PGD · /, '') : 'Toàn PGD', Tc, 'tong'));   /* 3.164: dòng cộng ghi đúng phạm vi */
    return {ten:'Theo nguon von', tieuDe:'KẾT QUẢ CHO VAY THEO NGUỒN VỐN TRUNG ƯƠNG / ĐỊA PHƯƠNG', ngay:ngayCua('hstd'), dv:'Đơn vị: triệu đồng, khách hàng',
      html:thBang2(cotN, dsN, tr)+'<div class="bc-ghi">Tính từ Mẫu 31 (cột Nguồn vốn: 1 = TW, 2 = ĐP). Cho vay không gồm đảo khoản = cách tính BCDHTD 01.1; gồm đảo khoản = cách tính LEN_31. Thu nợ = thu nợ trong hạn + quá hạn + khoanh.</div>', aoa:thAoa2(cotN, dsN, 1e6)};
  }
  if(k==='tk'){
    var hs = TK.hs || (kcGoc(B) || null);
    if(!hs) return thieu('Loc sau (tham khao)', ['hstd']);
    var cap = !S.xa ? 'xa' : !S.diem ? 'diem' : !S.hoi && !S.to ? 'hoi' : !S.to ? 'to' : 'ct', Tt = K.to||{};
    var trong = function(o){ if(!pvLoc(S, Tt[toMaCua(o)])) return false; if(S.ct && String(o.ct)!==S.ct) return false; if(S.nguon && String(o.nguon)!==S.nguon) return false; return true; };
    var nhan = {xa:'Xã / phường', diem:'Điểm GD', hoi:'Hội', to:'Tổ', ct:'Chương trình'}[cap];
    var khoa = function(o){ if(!trong(o)) return null; var t = Tt[toMaCua(o)]||{};
      return cap==='xa' ? (o.tenXa||'?') : cap==='diem' ? (t.tenDiemDu||'(chưa rõ điểm)') : cap==='hoi' ? (tdnHoi(o.dv||t.dv)||'Không hội / trực tiếp') : cap==='to' ? ((t.ten||o.toTen||'')+' ('+(o.to||'—')+')') : ctNgan(o.ct, o); };
    var R = twTinh31(hs, kcLap(B), khoa), cotK = [nhan,'Cho vay tháng','Cho vay lũy kế năm','Thu nợ tháng','Thu nợ lũy kế năm','Tổng dư nợ','Nợ trong hạn','Nợ quá hạn','Nợ khoanh','Số KH dư nợ','Tiền gửi 105','Lãi tồn'];
    var soK = function(x){ return [x.cvT, x.cvN, x.tnT, x.tnN, x.dn, x.th, x.qh, x.kn, {dem:x.khDn}, x.tg, x.lt]; }, dsK = [], cg = {cvT:0, cvN:0, tnT:0, tnN:0, dn:0, th:0, qh:0, kn:0, khDn:0, tg:0, lt:0};
    Object.keys(R).sort(function(a, b){ return a.localeCompare(b, 'vi'); }).forEach(function(n){ var x = R[n]; if(!x.mon && !x.tg) return; dsK.push({o:[n].concat(soK(x))}); Object.keys(cg).forEach(function(f){ cg[f] += x[f]||0; }); });
    dsK.push({lop:'tong', o:['Cộng '+pvChu(S, K).replace(/^Toàn PGD · /, '')].concat(soK(cg))});   /* 3.164 */
    /* đối chiếu: số cả xã tính từ Mẫu 31 (không lọc) ↔ BCDHTD 01.1 */
    var dc = '';
    if(kcBang(B, 'bx')){
      var Mx = twTinh31(hs, kcLap(B), function(o){ return o.tenXa ? slChuan(o.tenXa) : null; }), bxx = {}; kcBang(B, 'bx').forEach(function(o){ if(o.cap==='xa') bxx[slChuan(o.ten)] = o; });
      var xs = xa ? [xa] : Object.keys(bxx), lech = [];
      xs.forEach(function(x){ var a = bxx[x], b = Mx[x]; if(!a){ return; } b = b || {};
        [['dn','dư nợ'],['qh','quá hạn'],['kn','khoanh'],['cvT','cho vay tháng'],['tnT','thu nợ tháng'],['khDn','số KH dư nợ']].forEach(function(f){ if(Math.abs((a[f[0]]||0)-(b[f[0]]||0))>1) lech.push(a.ten+' — '+f[1]+': BCDHTD '+tdnTien(a[f[0]]||0)+' / Mẫu 31 '+tdnTien(b[f[0]]||0)); }); });
      dc = lech.length ? '<div class="bc-canh">⚠ Đối chiếu số chuẩn: Mẫu 31 lệch BCDHTD 01.1 — '+coChuHTML(lech.join('; '))+'. Số tham khảo dưới đây có thể chưa chuẩn.</div>'
        : '<div class="bc-dat">✅ Đối chiếu số chuẩn: Mẫu 31 khớp BCDHTD 01.1 '+(xa ? 'của xã' : 'từng xã')+' (dư nợ, quá hạn, khoanh, cho vay, thu nợ, số KH).</div>';
    } else dc = '<div class="bc-ghi">Chưa có BCDHTD 01.1 cùng kỳ để đối chiếu.</div>';
    var locChu = [S.ct ? 'chương trình '+ctNgan(S.ct) : '', S.nguon ? 'nguồn '+(SL_NGUON[S.nguon]||S.nguon) : ''].filter(Boolean).join(' · ');
    var e31 = KHO.bang('hstd', TK.ky);
    return {ten:'Loc sau tham khao', tieuDe:'SỐ LIỆU TÍN DỤNG THEO '+nhan.toUpperCase()+' (THAM KHẢO — TÍNH TỪ MẪU 31)', ngay:e31 ? 'Số liệu ngày '+ngayVNsl(e31.ngay)+' · Mẫu 31' : TK.K.hsTen, dv:'Đơn vị: triệu đồng, khách hàng',
      html:(locChu ? '<div class="bc-tom">Lọc: '+coChuHTML(locChu)+'</div>' : '')+dc+thBang2(cotK, dsK, tr)+'<div class="bc-ghi">Tham khảo: cho vay = giải ngân − đảo khoản; thu nợ = trong hạn + quá hạn + khoanh; số KH dư nợ = khách có dư nợ &gt; 0; tiền gửi = số dư 105 (1 lần mỗi khách). Số chính thức là biểu TW.</div>', aoa:thAoa2(cotK, dsK, 1e6)};
  }
}
/* 3.164: giao diện không còn nút Xem / in nhiều báo cáo 1 lần (anh chốt) — hàm giữ lại để phép thử đối chiếu cả 9 báo cáo 1 lượt */
function thXem(){
  var C = thCH(); if(!TH_K) return;
  var ds = TH_BC.filter(function(b){ return C.bc[b.k]; }); if(!ds.length) return bao('Tích ít nhất 1 báo cáo.', 3);
  var pv = pvChu(C, TH_K.K)+(C.ct ? ' · CT '+ctNgan(C.ct) : '')+(C.nguon ? ' · nguồn '+(SL_NGUON[C.nguon]||C.nguon) : '');
  try{ TH_XEM = ds.map(function(b){ CT_DUNG = {}; var x = thBaoCao(b.k); x.pv = pv; x.ctChu = ctChuThich(); CT_DUNG = null; return x; }); }
  catch(er){ CT_DUNG = null; return baoLoi('Lập báo cáo lỗi: '+(er && er.message || er)); }
  moHop('<div class="hop-tit">👁 Xem tổng hợp — '+coChuHTML(pv)+'</div><iframe id="th-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({ten:xuatTen(TH_XEM.length>1 ? 'Tong hop' : TH_XEM[0].ten, pv, TH_K.ky), html:function(){ return thHTMLIn(TH_XEM); }, excel:'thExcel()'}), true);   /* 3.152 */
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  var f = document.getElementById('th-khung'); xemChuan(f, thHTMLIn(TH_XEM));
}
function thHTMLIn(R){   /* 3.92: khuôn 01.1 — A4 ngang, lề 7 mm, chữ 9,5 pt, "Đơn vị" canh phải, mỗi dòng 1 hàng; tràn thì tự co */
  return '<!doctype html><html><head><meta charset="utf-8"><title>Tong hop</title><style>'+bcCSS(true)+'body{font-size:9.5pt}.th-bang th{vertical-align:middle;text-align:center}tr.th-so td{text-align:center;font-style:italic;font-size:.85em;background:#f7f9fb}.th-dv{text-align:right;font-style:italic;font-size:9pt;margin:-2px 0 2px}</style></head><body>'+R.map(function(x){
    return '<div class="trang ngang"><div class="bc-dau"><div>'+'<b>'+coChuHTML(BC_DV)+'</b>'+'</div><div class="bc-ngay">'+coChuHTML(x.ngay)+'</div></div>'+
      '<h1>'+coChuHTML(x.tieuDe)+'</h1><div class="bc-to">Phạm vi: <b>'+coChuHTML(x.pv)+'</b></div>'+(x.dv ? '<div class="th-dv">'+coChuHTML(x.dv)+'</div>' : '')+x.html+bcCT(x)+bcKy()+'</div>'; }).join('')+SK_IN_NGANG+skInTu('7mm')+'</body></html>';
}
function thIn(){ if(TH_XEM.length) inBlob(new Blob([thHTMLIn(TH_XEM)], {type:'text/html'}), 'Tong hop.html'); }
function thExcel(){
  if(!TH_XEM.length) return;
  xongTV.then(function(){
    if(!window.XLSX) return baoLoi('Chưa tải được bộ ghi Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new(), dung = {};
    TH_XEM.forEach(function(x){ var t = x.ten.slice(0, 28), n = t, i = 2; while(dung[n]) n = t+' '+(i++); dung[n] = 1;
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([[x.tieuDe], ['Phạm vi: '+x.pv], [x.ngay+(x.dv ? ' · '+x.dv : '')], []].concat(x.aoa).concat([[], x.ctChu ? [x.ctChu] : [], [BC_KY]])), n); });
    var u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    taiXuongBlob(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Tong hop '+TH_K.ky+'.xlsx');
  });
}
/* ---------- 3.90: CHUẨN IN mọi báo cáo (anh chốt): A4, lề trên 2 · dưới 2 · trái 3 · phải 2 cm; Times New Roman; đầu bảng lặp mỗi trang; số trang;
   tổng hợp A4 ngang, danh sách A4 dọc; cuối báo cáo ghi "PGD NHCSXH GÒ DẦU", không ký; xuất PDF = In → Lưu PDF ---------- */
function bcCSS(ngang){ return TO_IN_CSS.replace('A4 portrait', ngang ? 'A4 landscape' : 'A4 portrait')+(ngang ? 'body{font-size:8.5pt}.th-bang th,.th-bang td{padding:1px 2px}' : ''); }
function bcKy(){ return ''; }   /* 3.140.3 (anh chốt): bỏ dòng "PGD NHCSXH GÒ DẦU" cuối báo cáo in (đã có góc trên trái, 3.139); Excel vẫn giữ dòng cuối (Excel không có đầu trang) */
