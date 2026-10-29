/* ==========================================================
   3.402 (anh Nhân 29/10/2026 — đang củng cố, đóng tổ không hoạt động): 📉 DIỄN BIẾN TỔ ở Tra cứu KH (cắm rút — bỏ dòng nạp file này là nút biến mất)
   - So tổ ĐẦU THÁNG (kỳ Mẫu 31 chốt tháng trước) với số liệu HIỆN TẠI (kỳ Tra cứu đang dùng = mới nhất), theo dải LỌC ĐỊA BÀN của Tra cứu
     (toàn PGD → theo xã · chọn xã → theo điểm GD · chọn điểm → theo Hội).
   - Tổ đóng = có ở đầu tháng, không còn ở hiện tại (hệ thống chỉ xuất tổ còn mở — QUY_CHUAN mục 16). Không file nào ghi ngày đóng tổ →
     app ghi KHOẢNG NGÀY: bản Danh sách tổ cuối cùng còn tổ → bản đầu tiên không còn (anh nạp File Tổ trưởng càng dày, khoảng càng hẹp).
   - Tổ rác chưa đóng (anh chốt 29/10: "tổ dưới 20 thành viên, tổ không có dư nợ" · "ra tổ rác tất cả"): dưới 20 thành viên (QT-18, ngưỡng QĐ 70 — ô ⚙ Ngưỡng tab Tổ)
     · không có dư nợ · còn dư nợ nhưng không có trên Danh sách tổ (t.ngoaiDS — sai mã tổ).
   - Chỉ đọc qua KHO; không sửa số liệu. ES5.
   ========================================================== */
var DBT = null;   /* {K0, K1, ds:{dong, moi, doi, chua}, nhom, tieu} — kết quả lần mở gần nhất (để xuất Excel) */
function dbtNut(){ dbtDK(); return '<button class="nho tc-dbt-nut" data-lenh="dbt.mo" title="So tổ đầu tháng với số liệu hiện tại theo địa bàn đang lọc: tổ đã đóng (khoảng ngày), tổ mới, đổi điểm / Hội, tổ chưa đủ điều kiện chưa đóng">📉 Diễn biến tổ</button>'; }
function dbtDK(){ if(dbtDK.xong || typeof GD==='undefined') return; dbtDK.xong = 1;
  GD.dangKy('dbt', {mo:function(){ dbtMo(); }, xls:function(){ dbtExcel(); }, to:function(el){ dongHop(); if(typeof tcTheTo==='function') tcTheTo(el.getAttribute('data-to')); }}); }
function dbtNgayBang(e){ var k = String(e.ky||''); return k.length>7 ? k : (e.ngay && e.ngay.slice(0, 7)===k ? e.ngay : tdnCuoiKy(k)); }
function dbtTT(t){ return !t || t.trucTiep || (typeof toLaTT==='function' && toLaTT(t)); }
function dbtSo(t, K){ var r = KHO.tvChuan(t, K); return r ? {tv:r.tong, dn:r.ds.reduce(function(a, x){ return a+(x.dn||0); }, 0)} : {tv:0, dn:0}; }
/* các bản Danh sách tổ từ đầu tháng tới hiện tại → [{ngay, co:{maTo:1}}] cũ → mới */
function dbtMocDS(tu, den){
  var ds = KHO.dsBang('dsto').map(function(e){ return {e:e, ngay:dbtNgayBang(e)}; }).filter(function(x){ return x.ngay>=tu && x.ngay<=den; })
    .sort(function(a, b){ return a.ngay<b.ngay ? -1 : a.ngay>b.ngay ? 1 : 0; });
  return ds.reduce(function(p, x){ return p.then(function(r){
    return Promise.resolve(KHO.docBang('dsto', x.e.ky)).then(function(b){ var co = {}; if(b) slMoBang(b).forEach(function(o){ if(o.to) co[o.to] = 1; }); r.push({ngay:x.ngay, co:co, n:Object.keys(co).length}); return r; }); }); }, Promise.resolve([]));
}
function dbtKhoang(ma, moc, tu, den){   /* ngày cuối còn thấy tổ → ngày đầu không còn */
  var con = tu, mat = den;
  for(var i = 0; i<moc.length; i++){ if(!moc[i].n) continue; if(moc[i].co[ma]) con = moc[i].ngay; else if(moc[i].ngay>con){ mat = moc[i].ngay; break; } }
  return {tu:con, den:mat};
}
function dbtMo(){
  var K1 = typeof TC_K!=='undefined' ? TC_K : null;
  if(!K1) return bao('Chưa có số liệu Tra cứu — nạp Mẫu 31 ở tab 📥 Nạp & KT.', 4);
  var th0 = kyLui(K1.thang, -1);   /* đầu tháng = Mẫu 31 chốt cuối tháng trước */
  if(!KHO.coBang('hstd', th0)) return bao('Chưa có Mẫu 31 chốt tháng '+kyVN(th0)+' (đầu tháng '+kyVN(K1.thang)+') — nạp file cuối tháng trước để so.', 5);
  batChay(true, 'Đang so tổ đầu tháng với hiện tại…');
  var K0;
  KHO.nap(th0).then(function(k){ K0 = k; return dbtMocDS(K0.ngay, K1.ngay); }).then(function(moc){
    tatChay(); DBT = dbtTinh(K0, K1, moc); dbtVe();
  }).catch(function(er){ tatChay(); baoLoi('Chưa so được diễn biến tổ: '+(er && er.message || er)); });
}
function dbtTinh(K0, K1, moc){
  var S = typeof tcCH==='function' ? tcCH() : {}, N = typeof tcNguong==='function' ? tcNguong() : {min:20};
  var cap = 'diemHoi';   /* 3.403.3 (anh 29/10 "tổ phân theo Điểm GD, theo Hội"): luôn Điểm GD → Hội (dải lọc chỉ giới hạn phạm vi) */
  var ten = function(t){ return String(t.dv)==='99' ? 'Vay trực tiếp' : (tdnHoi(t.dv)||('Hội '+(t.dv||'?'))); };
  var khoa = function(t){ return String(t.khoaDiem||'')+'|'+String(t.dv||''); };
  var trong = function(t){ return !S.xa || pvLoc({xa:S.xa, diem:S.diem, hoi:S.hoi, ap:S.ap}, t); };
  var T0 = {}, T1 = {};
  KHO.dsToKy(K0).forEach(function(t){ if(!dbtTT(t)) T0[t.ma] = t; });
  KHO.dsToKy(K1).forEach(function(t){ if(!dbtTT(t)) T1[t.ma] = t; });
  var nhom = {}, thu = [], g = function(t){ var k = khoa(t); if(!nhom[k]){ nhom[k] = {k:k, ten:ten(t), dv:String(t.dv||''), diem:String(t.khoaDiem||''), tenDiem:t.tenDiemDu||'(chưa rõ điểm GD)', tenXa:t.tenXa||t.xa||'', dau:0, moi:0, dong:0, nay:0, chua:0, duoi:0, ko:0, lech:0, doi:0}; thu.push(k); } return nhom[k]; };
  var ds = {dong:[], moi:[], doi:[], chua:[]};
  Object.keys(T0).forEach(function(m){ var t = T0[m]; if(!trong(t)) return; g(t).dau++;
    if(!T1[m]){ var s = dbtSo(t, K0), kh = dbtKhoang(m, moc, K0.ngay, K1.ngay); g(t).dong++; ds.dong.push({t:t, tv:s.tv, dn:s.dn, tu:kh.tu, den:kh.den}); } });
  Object.keys(T1).forEach(function(m){ var t = T1[m]; if(!trong(t)) return; var x = g(t); x.nay++;
    var s = dbtSo(t, K1), ly = [];
    if(!T0[m]){ x.moi++; ds.moi.push({t:t, tv:s.tv, dn:s.dn}); }
    else { var a = T0[m], d = []; if(String(a.khoaDiem||'')!==String(t.khoaDiem||'')) d.push('Điểm GD: '+(a.tenDiemDu||'?')+' → '+(t.tenDiemDu||'?')); if(String(a.dv||'')!==String(t.dv||'')) d.push('Hội: '+(tdnHoi(a.dv)||a.dv||'?')+' → '+(tdnHoi(t.dv)||t.dv||'?'));
      if(d.length){ ds.doi.push({t:t, chu:d.join(' · ')}); x.doi++; } }
    if(s.tv<N.min){ ly.push('dưới '+N.min+' TV ('+s.tv+')'); x.duoi++; }
    if(!(s.dn>0)){ ly.push('không có dư nợ'); x.ko++; }
    if(t.ngoaiDS){ ly.push('còn dư nợ nhưng không có trên Danh sách tổ — kiểm mã tổ'); x.lech++; }   /* anh 29/10 "ra tổ rác tất cả" */
    if(ly.length){ x.chua++; ds.chua.push({t:t, tv:s.tv, dn:s.dn, ly:ly.join(' · ')}); } });
  var hoiThu = function(dv){ return typeof ttHoiThu==='function' ? ttHoiThu(dv) : (+dv||99); };
  var xep = function(a, b){ var x = [a.t.tenXa||'', a.t.tenDiemDu||'', hoiThu(a.t.dv), a.t.ten||''], y = [b.t.tenXa||'', b.t.tenDiemDu||'', hoiThu(b.t.dv), b.t.ten||''];
    for(var i=0;i<4;i++){ if(x[i]===y[i]) continue; return typeof x[i]==='number' ? x[i]-y[i] : String(x[i]).localeCompare(String(y[i]), 'vi'); } return 0; };
  ['dong', 'moi', 'doi', 'chua'].forEach(function(k){ ds[k].sort(xep); });
  var dsN = thu.map(function(k){ return nhom[k]; }), diem = {}, thuD = [];
  dsN.forEach(function(x){ var d = diem[x.diem]; if(!d){ d = diem[x.diem] = {k:x.diem, ten:x.tenDiem, tenXa:x.tenXa, hoi:[]}; thuD.push(x.diem); } d.hoi.push(x); });
  thuD.sort(function(a, b){ var x = diem[a], y = diem[b]; return (x.tenXa+'|'+x.ten).localeCompare(y.tenXa+'|'+y.ten, 'vi'); });
  thuD.forEach(function(k){ diem[k].hoi.sort(function(a, b){ return hoiThu(a.dv)-hoiThu(b.dv); }); });
  return {K0:K0, K1:K1, moc:moc, cap:cap, N:N, nhom:dsN, diem:thuD.map(function(k){ return diem[k]; }), ds:ds, pham:typeof pvChu==='function' ? pvChu(S, K1) : 'Toàn PGD'};
}
var DBT_CAP = {diemHoi:'Điểm GD / Hội', xa:'Xã', diem:'Điểm GD', hoi:'Hội'};
/* 3.403.2 (anh 29/10 "kẻ khung như 1 báo cáo tổng"): khuôn in chung (skHTMLIn — logo, đơn vị, ngày, tiêu đề, phạm vi; bảng kẻ khung)
   trang 1 = BẢNG TỔNG (tiêu đề 2 tầng, dòng TỔNG CỘNG) · trang sau = PHỤ LỤC (chỉ phụ lục có tổ), dòng nhóm theo xã, STT, cộng */
var DBT_PL = [['dong', 'PHỤ LỤC 1 — DANH SÁCH TỔ ĐÃ ĐÓNG TRONG KỲ'], ['chua', 'PHỤ LỤC 2 — TỔ CHƯA ĐỦ ĐIỀU KIỆN HOẠT ĐỘNG, CHƯA ĐÓNG'], ['moi', 'PHỤ LỤC 3 — TỔ THÀNH LẬP MỚI TRONG KỲ'], ['doi', 'PHỤ LỤC 4 — TỔ ĐỔI ĐIỂM GIAO DỊCH / HỘI QUẢN LÝ']];
function dbtHoi(t){ return String(t.dv)==='99' ? 'Trực tiếp' : (tdnHoi(t.dv)||t.dv||''); }
function dbtCong(ls){ var t = {dau:0, moi:0, dong:0, nay:0, chua:0, duoi:0, ko:0, lech:0, doi:0}; ls.forEach(function(x){ Object.keys(t).forEach(function(f){ t[f] += x[f]||0; }); }); return t; }
function dbtTong(R){ var t = {dau:0, moi:0, dong:0, nay:0, chua:0, duoi:0, ko:0, lech:0, doi:0}; R.nhom.forEach(function(x){ Object.keys(t).forEach(function(f){ t[f] += x[f]||0; }); }); return t; }
function dbtTrang(R){
  var e = coChuHTML, so = function(v){ return '<td class="s">'+(v ? v : '')+'</td>'; }, tg = function(v){ return '<td class="s">'+(v>0 ? '+'+v : v<0 ? '−'+(-v) : '')+'</td>'; };
  var T = dbtTong(R), ngay = 'Từ ngày '+ngayVNsl(R.K0.ngay)+' đến ngày '+ngayVNsl(R.K1.ngay);
  var LA = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
  var dong = function(x, stt, ten, lop){ return '<tr'+(lop ? ' class="'+lop+'"' : '')+'><td class="c">'+stt+'</td><td>'+ten+'</td>'+so(x.dau)+so(x.moi)+so(x.dong)+so(x.nay)+tg(x.nay-x.dau)+so(x.chua)+so(x.duoi)+so(x.ko)+so(x.lech)+so(x.doi)+'</tr>'; };
  var than = R.diem.map(function(d, i){ return dong(dbtCong(d.hoi), LA[i] || (i+1), '<b>Điểm '+e(String(d.ten).replace(/^Điểm\s+/i, ''))+'</b>'+(d.tenXa ? ' <small>· '+e(d.tenXa)+'</small>' : ''), 'nhom')+
    d.hoi.map(function(x, j){ return dong(x, j+1, '&nbsp;&nbsp;'+e(x.ten)); }).join(''); }).join('');
  var tong = '<table class="bc-bang"><thead><tr><th rowspan="2">STT</th><th rowspan="2">'+DBT_CAP[R.cap]+'</th><th rowspan="2">Số tổ<br>đầu kỳ</th><th colspan="2">Biến động trong kỳ</th><th rowspan="2">Số tổ<br>cuối kỳ</th><th rowspan="2">Tăng (+)<br>giảm (−)</th>'+
    '<th colspan="4">Tổ chưa đủ điều kiện, chưa đóng</th><th rowspan="2">Đổi điểm GD<br>/ Hội</th></tr>'+
    '<tr><th>Thành lập mới</th><th>Đã đóng</th><th>Tổng số</th><th>Dưới '+R.N.min+' TV</th><th>Không dư nợ</th><th>Không có trên DS tổ</th></tr>'+
    '<tr>'+['A', 'B', '1', '2', '3', '4 = 1+2−3', '5 = 4−1', '6', '7', '8', '9', '10'].map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+
    than+dong(T, '', '<b>TỔNG CỘNG</b>', 'tong')+'</tbody></table>'+
    '<div class="bc-ghi">Đầu kỳ: Mẫu 31 chốt ngày '+ngayVNsl(R.K0.ngay)+'; cuối kỳ: số liệu ngày '+ngayVNsl(R.K1.ngay)+'. Tổ đã đóng = có ở đầu kỳ, không còn trên Danh sách tổ hệ thống (ngày đóng ghi theo khoảng giữa 2 lần nạp File Tổ trưởng: '+
      (R.moc.length ? R.moc.map(function(m){ return ngayVNsl(m.ngay); }).join(', ') : 'chưa có bản nào trong kỳ')+'). Cột 6: một tổ có thể thuộc nhiều lý do (cột 7–9). Thành viên tính theo QT-18.</div>';
  var ra = [{ten:'Dien bien to', tieuDe:'BÁO CÁO DIỄN BIẾN TỔ TIẾT KIỆM VÀ VAY VỐN', ngay:ngay, html:tong, ngang:true, motTrang:1, pv:R.pham}];
  var noi = function(t){ return dbtHoi(t); }, tr = function(v){ return '<td class="s">'+(v ? tdnTien(v) : '')+'</td>'; };
  var COT = {dong:['STT', 'Tổ trưởng', 'Mã tổ', 'Hội', 'TV lần cuối', 'Dư nợ lần cuối', 'Ngày đóng (khoảng)'], chua:['STT', 'Tổ trưởng', 'Mã tổ', 'Hội', 'Thành viên', 'Dư nợ', 'Lý do'],
    moi:['STT', 'Tổ trưởng', 'Mã tổ', 'Hội', 'Thành viên', 'Dư nợ'], doi:['STT', 'Tổ trưởng', 'Mã tổ', 'Hội hiện tại', 'Thay đổi']};
  var DONG = {dong:function(x){ return ['<td>'+e(x.t.ten||'')+'</td>', '<td>'+e(x.t.ma)+'</td>', '<td>'+e(noi(x.t))+'</td>', so(x.tv), tr(x.dn), '<td>sau '+ngayVNsl(x.tu)+' – đến '+ngayVNsl(x.den)+'</td>']; },
    chua:function(x){ return ['<td>'+e(x.t.ten||'')+'</td>', '<td>'+e(x.t.ma)+'</td>', '<td>'+e(noi(x.t))+'</td>', so(x.tv), tr(x.dn), '<td>'+e(x.ly)+'</td>']; },
    moi:function(x){ return ['<td>'+e(x.t.ten||'')+'</td>', '<td>'+e(x.t.ma)+'</td>', '<td>'+e(noi(x.t))+'</td>', so(x.tv), tr(x.dn)]; },
    doi:function(x){ return ['<td>'+e(x.t.ten||'')+'</td>', '<td>'+e(x.t.ma)+'</td>', '<td>'+e(noi(x.t))+'</td>', '<td>'+e(x.chu)+'</td>']; }};
  DBT_PL.forEach(function(pl){ var ls = R.ds[pl[0]]; if(!ls.length) return; var c = COT[pl[0]], h = '', xa = null, stt = 0, nx = 0, dnx = 0, dnT = 0;
    var cong = function(nhan, n, dn, lop){ return '<tr class="'+lop+'"><td></td><td colspan="2"><b>'+nhan+'</b></td><td class="c">'+n+' tổ</td>'+c.slice(4).map(function(x){ return /^Dư nợ/.test(x) ? tr(dn) : '<td></td>'; }).join('')+'</tr>'; };
    ls.forEach(function(x){ var tx = 'Điểm '+String(x.t.tenDiemDu||'(chưa rõ điểm GD)').replace(/^Điểm\s+/i, '')+(x.t.tenXa ? ' · '+x.t.tenXa : '');
      if(tx!==xa){ if(xa!==null) h += cong('Cộng '+xa, nx, dnx, 'cong'); xa = tx; nx = 0; dnx = 0; h += '<tr class="nhom"><td colspan="'+c.length+'">'+e(tx)+'</td></tr>'; }
      nx++; dnx += x.dn||0; dnT += x.dn||0; h += '<tr><td class="c">'+(++stt)+'</td>'+DONG[pl[0]](x).join('')+'</tr>'; });
    if(xa!==null) h += cong('Cộng '+xa, nx, dnx, 'cong'); h += cong('TỔNG CỘNG', stt, dnT, 'tong');
    ra.push({ten:'PL '+pl[0], tieuDe:pl[1], ngay:ngay+' · Đơn vị: đồng', html:'<table class="bc-bang"><thead><tr>'+c.map(function(x){ return '<th>'+x+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>', ngang:false, pv:R.pham}); });
  return ra;
}
function dbtVe(){
  var R = DBT; if(!R) return; dbtDK();
  var ds = dbtTrang(R), ten = typeof xuatTen==='function' ? xuatTen('Dien bien to', R.pham, String(R.K1.ky)) : 'Dien bien to';
  moHop('<div class="hop-tit">📉 Diễn biến tổ · '+coChuHTML(R.pham)+'</div><iframe id="dbt-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({ten:ten, html:function(){ return skHTMLIn(ds); }, excel:'dbtExcel()'}), true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  xemChuan(document.getElementById('dbt-khung'), skHTMLIn(ds));
}
function dbtExcel(){
  var R = DBT; if(!R || typeof XLSX==='undefined') return;
  var wb = XLSX.utils.book_new(), T = dbtTong(R), dau = [['BÁO CÁO DIỄN BIẾN TỔ TIẾT KIỆM VÀ VAY VỐN'], ['Phạm vi: '+R.pham], ['Từ ngày '+ngayVNsl(R.K0.ngay)+' đến ngày '+ngayVNsl(R.K1.ngay)], []];
  var them = function(ten, aoa){ XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dau.concat(aoa)), ten); };
  var dx = function(st, ten, x){ return [st, ten, x.dau, x.moi, x.dong, x.nay, x.nay-x.dau, x.chua, x.duoi, x.ko, x.lech, x.doi||0]; };
  them('Tong hop', [['STT', 'Điểm GD / Hội', 'Số tổ đầu kỳ', 'Thành lập mới', 'Đã đóng', 'Số tổ cuối kỳ', 'Tăng / giảm', 'Chưa đủ ĐK chưa đóng', 'Dưới '+R.N.min+' TV', 'Không dư nợ', 'Không có trên DS tổ', 'Đổi điểm GD / Hội']]
    .concat([].concat.apply([], R.diem.map(function(d, i){ return [dx(i+1, 'Điểm '+String(d.ten).replace(/^Điểm\s+/i, '')+(d.tenXa ? ' · '+d.tenXa : ''), dbtCong(d.hoi))].concat(d.hoi.map(function(x, j){ return dx((i+1)+'.'+(j+1), x.ten, x); })); })))
    .concat([['', 'TỔNG CỘNG', T.dau, T.moi, T.dong, T.nay, T.nay-T.dau, T.chua, T.duoi, T.ko, T.lech, T.doi]]));
  var hang = function(x, them2){ return [x.t.tenXa||'', x.t.ten||'', x.t.ma, x.t.tenDiemDu||'', dbtHoi(x.t)].concat(them2); };
  them('PL1 Da dong', [['STT', 'Xã', 'Tổ trưởng', 'Mã tổ', 'Điểm GD', 'Hội', 'TV lần cuối', 'Dư nợ lần cuối (đồng)', 'Còn đến ngày', 'Không còn từ ngày']].concat(R.ds.dong.map(function(x, i){ return [i+1].concat(hang(x, [x.tv, x.dn, ngayVNsl(x.tu), ngayVNsl(x.den)])); })));
  them('PL2 Chua du DK', [['STT', 'Xã', 'Tổ trưởng', 'Mã tổ', 'Điểm GD', 'Hội', 'Thành viên', 'Dư nợ (đồng)', 'Lý do']].concat(R.ds.chua.map(function(x, i){ return [i+1].concat(hang(x, [x.tv, x.dn, x.ly])); })));
  them('PL3 To moi', [['STT', 'Xã', 'Tổ trưởng', 'Mã tổ', 'Điểm GD', 'Hội', 'Thành viên', 'Dư nợ (đồng)']].concat(R.ds.moi.map(function(x, i){ return [i+1].concat(hang(x, [x.tv, x.dn])); })));
  them('PL4 Doi diem Hoi', [['STT', 'Xã', 'Tổ trưởng', 'Mã tổ', 'Điểm GD', 'Hội', 'Thay đổi']].concat(R.ds.doi.map(function(x, i){ return [i+1].concat(hang(x, [x.chu])); })));
  XLSX.writeFile(wb, 'Dien_bien_to_'+String(R.K1.ngay).replace(/-/g, '')+'.xlsx');
}
