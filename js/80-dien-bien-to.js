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
  var cap = !S.xa ? 'xa' : !S.diem ? 'diem' : 'hoi';
  var ten = function(t){ return cap==='xa' ? (t.tenXa||t.xa||'') : cap==='diem' ? (t.tenDiemDu||'(chưa rõ điểm GD)') : (String(t.dv)==='99' ? 'Vay trực tiếp' : (tdnHoi(t.dv)||('Hội '+(t.dv||'?')))); };
  var khoa = function(t){ return cap==='xa' ? String(t.xa||'') : cap==='diem' ? String(t.khoaDiem||'') : String(t.dv||''); };
  var trong = function(t){ return !S.xa || pvLoc({xa:S.xa, diem:S.diem, hoi:S.hoi, ap:S.ap}, t); };
  var T0 = {}, T1 = {};
  KHO.dsToKy(K0).forEach(function(t){ if(!dbtTT(t)) T0[t.ma] = t; });
  KHO.dsToKy(K1).forEach(function(t){ if(!dbtTT(t)) T1[t.ma] = t; });
  var nhom = {}, thu = [], g = function(t){ var k = khoa(t); if(!nhom[k]){ nhom[k] = {ten:ten(t), dau:0, moi:0, dong:0, nay:0, chua:0, duoi:0, ko:0, lech:0}; thu.push(k); } return nhom[k]; };
  var ds = {dong:[], moi:[], doi:[], chua:[]};
  Object.keys(T0).forEach(function(m){ var t = T0[m]; if(!trong(t)) return; g(t).dau++;
    if(!T1[m]){ var s = dbtSo(t, K0), kh = dbtKhoang(m, moc, K0.ngay, K1.ngay); g(t).dong++; ds.dong.push({t:t, tv:s.tv, dn:s.dn, tu:kh.tu, den:kh.den}); } });
  Object.keys(T1).forEach(function(m){ var t = T1[m]; if(!trong(t)) return; var x = g(t); x.nay++;
    var s = dbtSo(t, K1), ly = [];
    if(!T0[m]){ x.moi++; ds.moi.push({t:t, tv:s.tv, dn:s.dn}); }
    else { var a = T0[m], d = []; if(String(a.khoaDiem||'')!==String(t.khoaDiem||'')) d.push('Điểm GD: '+(a.tenDiemDu||'?')+' → '+(t.tenDiemDu||'?')); if(String(a.dv||'')!==String(t.dv||'')) d.push('Hội: '+(tdnHoi(a.dv)||a.dv||'?')+' → '+(tdnHoi(t.dv)||t.dv||'?'));
      if(d.length) ds.doi.push({t:t, chu:d.join(' · ')}); }
    if(s.tv<N.min){ ly.push('dưới '+N.min+' TV ('+s.tv+')'); x.duoi++; }
    if(!(s.dn>0)){ ly.push('không có dư nợ'); x.ko++; }
    if(t.ngoaiDS){ ly.push('còn dư nợ nhưng không có trên Danh sách tổ — kiểm mã tổ'); x.lech++; }   /* anh 29/10 "ra tổ rác tất cả" */
    if(ly.length){ x.chua++; ds.chua.push({t:t, tv:s.tv, dn:s.dn, ly:ly.join(' · ')}); } });
  var xep = function(a, b){ var x = [a.t.tenXa, a.t.tenDiemDu, a.t.ten].join('|'), y = [b.t.tenXa, b.t.tenDiemDu, b.t.ten].join('|'); return x<y ? -1 : x>y ? 1 : 0; };
  ['dong', 'moi', 'doi', 'chua'].forEach(function(k){ ds[k].sort(xep); });
  return {K0:K0, K1:K1, moc:moc, cap:cap, N:N, nhom:thu.map(function(k){ return nhom[k]; }), ds:ds, pham:typeof pvChu==='function' ? pvChu(S, K1) : 'Toàn PGD'};
}
var DBT_CAP = {xa:'Xã', diem:'Điểm GD', hoi:'Hội'};
function dbtVe(){
  var R = DBT; if(!R) return; dbtDK();
  var c = function(v){ return '<td class="so">'+(v ? v : '')+'</td>'; }, tong = {dau:0, moi:0, dong:0, nay:0, chua:0, duoi:0, ko:0, lech:0};
  R.nhom.forEach(function(x){ Object.keys(tong).forEach(function(f){ tong[f] += x[f]; }); });
  var dong = function(x, b){ var tg = x.nay-x.dau; return '<tr'+(b ? ' class="cong"' : '')+'><td>'+coChuHTML(x.ten)+'</td>'+c(x.dau)+c(x.moi)+c(x.dong)+c(x.nay)+'<td class="so">'+(tg>0 ? '+'+tg : tg<0 ? tg : '')+'</td>'+c(x.chua)+c(x.duoi)+c(x.ko)+c(x.lech)+'</tr>'; };
  var nutTo = function(t){ return '<a href="#" data-lenh="dbt.to" data-to="'+coChuHTML(t.ma)+'">'+coChuHTML(t.ten||('Tổ '+t.ma))+'</a>'; };
  var noi = function(t){ return coChuHTML([t.tenXa, t.tenDiemDu, String(t.dv)==='99' ? 'Trực tiếp' : tdnHoi(t.dv)].filter(Boolean).join(' · ')); };
  var bang = function(tit, cot, ls, f){ return '<details class="dbt-ds"'+(ls.length ? ' open' : '')+'><summary><b>'+tit+'</b> — '+ls.length+' tổ</summary>'+(ls.length ? '<div class="sl-xt-cuon"><table class="sl-xt dbt-bang"><thead><tr>'+cot.map(function(x){ return '<th>'+x+'</th>'; }).join('')+'</tr></thead><tbody>'+ls.map(f).join('')+'</tbody></table></div>' : '<div class="rong">Không có.</div>')+'</details>'; };
  var tr = function(v){ return typeof soTr==='function' ? soTr(v) : tdnTien(v); };
  var mocChu = R.moc.length ? R.moc.map(function(m){ return ngayVNsl(m.ngay); }).join(' · ') : 'chưa có bản nào trong khoảng';
  moHop('<div class="hop-tit">📉 Diễn biến tổ · '+coChuHTML(R.pham)+'</div>'+
    '<div class="hop-phu">Đầu tháng: Mẫu 31 <b>'+ngayVNsl(R.K0.ngay)+'</b> → hiện tại: <b>'+ngayVNsl(R.K1.ngay)+'</b>. Bản Danh sách tổ dùng dò ngày đóng: '+mocChu+'. '+
    'Tổ rác (cần dọn): dưới '+R.N.min+' thành viên (QT-18) · không có dư nợ · còn dư nợ nhưng không có trên Danh sách tổ.</div>'+
    '<div class="sl-xt-cuon"><table class="sl-xt dbt-bang"><thead><tr><th>'+DBT_CAP[R.cap]+'</th><th>Tổ đầu tháng</th><th>Tổ mới</th><th>Đã đóng</th><th>Tổ hiện tại</th><th>Tăng / giảm</th><th>Tổ rác chưa đóng</th><th>· dưới '+R.N.min+' TV</th><th>· không dư nợ</th><th>· không có trên DS tổ</th></tr></thead><tbody>'+
      R.nhom.map(function(x){ return dong(x); }).join('')+dong({ten:'Cộng', dau:tong.dau, moi:tong.moi, dong:tong.dong, nay:tong.nay, chua:tong.chua, duoi:tong.duoi, ko:tong.ko, lech:tong.lech}, true)+'</tbody></table></div>'+
    bang('🔒 Tổ đã đóng', ['Tổ trưởng', 'Mã tổ', 'Xã · Điểm GD · Hội', 'TV lần cuối', 'Dư nợ lần cuối (tr.đ)', 'Đóng trong khoảng'], R.ds.dong, function(x){
      return '<tr><td>'+coChuHTML(x.t.ten||'')+'</td><td>'+coChuHTML(x.t.ma)+'</td><td>'+noi(x.t)+'</td><td class="so">'+x.tv+'</td><td class="so">'+tr(x.dn)+'</td><td>sau '+ngayVNsl(x.tu)+' – đến '+ngayVNsl(x.den)+'</td></tr>'; })+
    bang('⚠ Tổ rác — chưa đủ điều kiện / lệch danh sách, chưa đóng', ['Tổ trưởng', 'Mã tổ', 'Xã · Điểm GD · Hội', 'Thành viên', 'Dư nợ (tr.đ)', 'Lý do'], R.ds.chua, function(x){
      return '<tr><td>'+nutTo(x.t)+'</td><td>'+coChuHTML(x.t.ma)+'</td><td>'+noi(x.t)+'</td><td class="so">'+x.tv+'</td><td class="so">'+tr(x.dn)+'</td><td>'+coChuHTML(x.ly)+'</td></tr>'; })+
    bang('🆕 Tổ mới trong tháng', ['Tổ trưởng', 'Mã tổ', 'Xã · Điểm GD · Hội', 'Thành viên', 'Dư nợ (tr.đ)'], R.ds.moi, function(x){
      return '<tr><td>'+nutTo(x.t)+'</td><td>'+coChuHTML(x.t.ma)+'</td><td>'+noi(x.t)+'</td><td class="so">'+x.tv+'</td><td class="so">'+tr(x.dn)+'</td></tr>'; })+
    bang('🔀 Tổ đổi điểm GD / Hội', ['Tổ trưởng', 'Mã tổ', 'Xã', 'Thay đổi'], R.ds.doi, function(x){
      return '<tr><td>'+nutTo(x.t)+'</td><td>'+coChuHTML(x.t.ma)+'</td><td>'+coChuHTML(x.t.tenXa||'')+'</td><td>'+coChuHTML(x.chu)+'</td></tr>'; })+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button><button class="nho chinh" data-lenh="dbt.xls">📊 Excel</button></div>', true);
}
function dbtExcel(){
  var R = DBT; if(!R || typeof XLSX==='undefined') return;
  var hoi = function(t){ return String(t.dv)==='99' ? 'Trực tiếp' : (tdnHoi(t.dv)||t.dv||''); }, wb = XLSX.utils.book_new();
  var them = function(ten, aoa){ XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), ten); };
  them('Tong hop', [['DIỄN BIẾN TỔ TK&VV — '+R.pham], ['Đầu tháng '+ngayVNsl(R.K0.ngay)+' → hiện tại '+ngayVNsl(R.K1.ngay)], [DBT_CAP[R.cap], 'Tổ đầu tháng', 'Tổ mới', 'Đã đóng', 'Tổ hiện tại', 'Tăng / giảm', 'Tổ rác chưa đóng', 'Dưới '+R.N.min+' TV', 'Không dư nợ', 'Không có trên DS tổ']]
    .concat(R.nhom.map(function(x){ return [x.ten, x.dau, x.moi, x.dong, x.nay, x.nay-x.dau, x.chua, x.duoi, x.ko, x.lech]; })));
  them('Da dong', [['Tổ trưởng', 'Mã tổ', 'Xã', 'Điểm GD', 'Hội', 'TV lần cuối', 'Dư nợ lần cuối (đồng)', 'Còn đến ngày', 'Không còn từ ngày']].concat(R.ds.dong.map(function(x){ return [x.t.ten||'', x.t.ma, x.t.tenXa||'', x.t.tenDiemDu||'', hoi(x.t), x.tv, x.dn, ngayVNsl(x.tu), ngayVNsl(x.den)]; })));
  them('To rac', [['Tổ trưởng', 'Mã tổ', 'Xã', 'Điểm GD', 'Hội', 'Thành viên', 'Dư nợ (đồng)', 'Lý do']].concat(R.ds.chua.map(function(x){ return [x.t.ten||'', x.t.ma, x.t.tenXa||'', x.t.tenDiemDu||'', hoi(x.t), x.tv, x.dn, x.ly]; })));
  them('To moi', [['Tổ trưởng', 'Mã tổ', 'Xã', 'Điểm GD', 'Hội', 'Thành viên', 'Dư nợ (đồng)']].concat(R.ds.moi.map(function(x){ return [x.t.ten||'', x.t.ma, x.t.tenXa||'', x.t.tenDiemDu||'', hoi(x.t), x.tv, x.dn]; })));
  them('Doi diem Hoi', [['Tổ trưởng', 'Mã tổ', 'Xã', 'Thay đổi']].concat(R.ds.doi.map(function(x){ return [x.t.ten||'', x.t.ma, x.t.tenXa||'', x.chu]; })));
  XLSX.writeFile(wb, 'Dien_bien_to_'+String(R.K1.ngay).replace(/-/g, '')+'.xlsx');
}
