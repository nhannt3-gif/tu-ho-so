/* ===== 3.424 (docs/TEO_GIAO_BAN_KY_NANG.md — TK 1 bàn giao 31/10; anh 31/10 "em chờ TK 1 bàn giao skill rồi đọc và làm luôn") =====
   📐 BỘ SỐ CHUẨN — app dựng song song với giao ban để ANH ĐỐI CHIẾU độ tin cậy (văn bản chính thức vẫn do giao ban phát hành — mục 8 bàn giao).
   - Chỉ tiêu đúng từ điển `so_lieu_tong_hop.json` (bàn giao mục 2): theo điểm × Hội (HND · HPN · HCCB · DTN) + trực tiếp; tiền triệu đồng.
   - Kỳ so sánh = Mẫu 31 cuối tháng trước; số kỳ trước xếp theo vị trí hiện nay của khế ước (QT-C-21 — toKyTruoc, js/22g).
   - Kiểm tầng A (bàn giao mục 6): Σ Hội + trực tiếp = điểm · Σ điểm = toàn PGD · đầu kỳ + cho vay − thu nợ = cuối kỳ · danh sách = tổng · khế ước lặp dòng.
   - 📥 CSV dạng dài `ky, diem, hoi, chi_tieu, gia_tri` (cùng dạng tools/teo_dap_an.py) · 📂 So với file đáp án → bảng lệch (sai số 0,05 triệu).
   Cắm rút: bỏ dòng <script> là mất nút 📐, phần khác như cũ. Chỉ đọc số (KHO / toNap), không ghi gì. ES5. */
var BC_HOI = {'11':'HND', '12':'HPN', '13':'HCCB', '14':'DTN'}, BC_HOI_DS = ['HND', 'HPN', 'HCCB', 'DTN'];
var BC_CT = ['so_to', 'so_kh_du_no', 'so_kh_tat_no_con_tg', 'so_ho', 'du_no', 'du_no_truoc', 'du_no_tang', 'nqh', 'khoanh', 'cho_vay', 'thu_no', 'tien_gui', 'tien_gui_tang', 'lai_ton', 'lai_ton_tang', 'khd_mon', 'khd_du', 'ndh', 'ndh_ho'];
var BC_CT_TT = ['du_no', 'nqh', 'khoanh', 'cho_vay', 'thu_no', 'lai_ton', 'so_ho', 'du_no_tang'];   /* trực tiếp: các khóa giao ban có (bàn giao 2.2) */
var BC = {B:null, diem:''};
function bcKhoaDiem(ten){ var s = boDau(String(ten||'').replace(/\s*[·(-]?\s*ngày\s*\d+.*$/i, '').replace(/^\s*(điểm( gd| giao dịch)?)\s+/i, '')).replace(/[^a-z0-9 ]/gi, ' ').trim();   /* "Điểm Gia Lộc 2" → GiaLoc2 */
  return s.split(/\s+/).map(function(w){ return w ? w.charAt(0).toUpperCase()+w.slice(1) : ''; }).join('') || '(chưa rõ)'; }
function bcTinh(K, Kp){
  var T = K.to || {}, tenD = {}, sau = kyLui(K.thang, 1), tu = sau+'-01', den = tdnCuoiKy(sau), khd = {}, ra = {ky:ngayVNsl(K.ngay), kyTruoc:Kp ? ngayVNsl(Kp.ngay) : '', diem:{}, pgd:{dn:0, qh:0, kn:0, t105:0}, kiem:[]};
  Object.keys(T).forEach(function(m){ var t = T[m]; if(t && t.diem && !tenD[t.diem]) tenD[t.diem] = String(t.tenDiem || t.tenDiemDu || t.diem).trim(); });
  slKHD(K.B).forEach(function(o){ if(o.ku) khd[o.ku] = 1; });
  var R6 = function(v){ return Math.round((v||0)/1000)/1000; };   /* đồng → triệu, giữ 3 số lẻ */
  var viTri = function(o){ var t = o.to && T[o.to]; if(t && !t.trucTiep && !toLaTT(t)) return {d:t.diem||'', h:BC_HOI[String(t.dv)] || 'TT', to:o.to};
    var g = o._tt && T[o._tt]; return {d:(g && g.diem) || '', h:'TT', to:''}; };
  var nhom = function(d, h){ var D = ra.diem[d] = ra.diem[d] || {ten:tenD[d] || d, khoa:bcKhoaDiem(tenD[d] || d), hoi:{}, ds:{nqh_list:{n:0, t:0}, khoanh_list:{n:0, t:0}, khd_list:{n:0, t:0}, gn_list:{n:0, t:0}, ndh_list:{n:0, t:0}}, tong:{dn:0, qh:0, kn:0, t105:0}};
    return D.hoi[h] = D.hoi[h] || {dn:0, qh:0, kn:0, cv:0, tn:0, lt:0, t105:0, khd:0, khdDu:0, ndh:0, kh:{}, khNo:{}, khSo:{}, ndhKh:{}, to:{}}; };
  var soKU = {}, dongM31 = 0;
  (K.hs||[]).forEach(function(o){ if(!o.ku) return; dongM31++; if(soKU[o.ku]) return; soKU[o.ku] = 1;
    var v = viTri(o), g = nhom(v.d, v.h), D = ra.diem[v.d], dn = o.dn||0, cv = (o.gnT||0)-(o.dkT||0), dh = dn>0 && !(o.qh>0) && (function(){ var hl = skHL(o); return hl>=tu && hl<=den; })();
    g.dn += dn; g.qh += o.qh||0; g.kn += o.kn||0; g.cv += cv; g.tn += (o.tnTH||0)+(o.tnQH||0)+(o.tnK||0); g.lt += laiTon(o);
    g.kh[o.kh] = 1; if(dn>0){ g.khNo[o.kh] = 1; if(v.to) g.to[v.to] = 1; } if(khd[o.ku]){ g.khd++; g.khdDu += dn; } if(dh){ g.ndh += dn; g.ndhKh[o.kh] = 1; }
    D.tong.dn += dn; D.tong.qh += o.qh||0; D.tong.kn += o.kn||0; ra.pgd.dn += dn; ra.pgd.qh += o.qh||0; ra.pgd.kn += o.kn||0;
    if((o.qh||0)>0){ D.ds.nqh_list.n++; D.ds.nqh_list.t += o.qh; } if((o.kn||0)>0){ D.ds.khoanh_list.n++; D.ds.khoanh_list.t += o.kn; }
    if(khd[o.ku]){ D.ds.khd_list.n++; D.ds.khd_list.t += dn; } if((o.gnT||0)>0){ D.ds.gn_list.n++; D.ds.gn_list.t += cv; } if(dh){ D.ds.ndh_list.n++; D.ds.ndh_list.t += dn; } });
  var so = {}; (K.hs||[]).concat(K.lap||[]).forEach(function(o){ var s = slStk(o.stk)[0], v = +o.t105 || 0; if(!s) return; if(!so[s] || v>so[s].v) so[s] = {v:v, o:o}; });   /* mỗi sổ 1 lần, sổ gắn tổ */
  Object.keys(so).forEach(function(s){ var x = so[s], vt = viTri(x.o); if(!vt.to || !x.v) return; var g = nhom(vt.d, vt.h); g.t105 += x.v; g.khSo[x.o.kh] = 1; g.to[vt.to] = 1;
    ra.diem[vt.d].tong.t105 += x.v; ra.pgd.t105 += x.v; });
  var P = null, toTruoc = {}, apD = {};
  if(Kp){ var P0 = toKyTruoc(K, Kp); P = {hoi:{}};   /* khóa toKyTruoc 'điểm|mã ĐVUT' → 'điểm|HND…' */
    Object.keys(P0.hoi).forEach(function(k){ var i = k.lastIndexOf('|'), h = k.slice(i+1), kk = k.slice(0, i)+'|'+(h==='TT' ? 'TT' : BC_HOI[h] || 'TT'), x = P.hoi[kk] = P.hoi[kk] || {dn:0, t105:0, lt:0};
      x.dn += P0.hoi[k].dn||0; x.t105 += P0.hoi[k].t105||0; x.lt += P0.hoi[k].lt||0; });
    Object.keys(T).forEach(function(m){ var t = T[m]; if(t && t.thon && t.diem && !apD[t.thon]) apD[t.thon] = t.diem; });
    Object.keys(Kp.to||{}).forEach(function(m){ var t = Kp.to[m]; if(!t || t.trucTiep || toLaTT(t)) return;   /* số tổ thật kỳ trước, xếp theo điểm hiện nay (tổ còn → điểm của tổ; tổ đóng → theo ấp) */
      var d = (T[m] && T[m].diem) || apD[t.thon] || t.diem || '', k = d+'|'+(BC_HOI[String(t.dv)] || 'TT'); toTruoc[k] = (toTruoc[k]||0)+1; }); }
  Object.keys(ra.diem).forEach(function(d){ var D = ra.diem[d]; D.so = {};
    Object.keys(D.hoi).forEach(function(h){ var g = D.hoi[h], p = P ? P.hoi[d+'|'+h] || {dn:0, t105:0, lt:0} : null, k = Object.keys, tat = k(g.khSo).filter(function(x){ return !g.khNo[x]; }).length;
      var x = {so_to:k(g.to).length, so_kh_du_no:k(g.khNo).length, so_kh_tat_no_con_tg:tat, so_ho:k(g.khNo).length+tat, du_no:R6(g.dn), nqh:R6(g.qh), khoanh:R6(g.kn), cho_vay:R6(g.cv), thu_no:R6(g.tn),
        tien_gui:R6(g.t105), lai_ton:R6(g.lt), khd_mon:g.khd, khd_du:R6(g.khdDu), ndh:R6(g.ndh), ndh_ho:k(g.ndhKh).length};
      if(p){ x.du_no_truoc = R6(p.dn); x.du_no_tang = R6(g.dn-p.dn); x.tien_gui_tang = R6(g.t105-p.t105); x.lai_ton_tang = R6(g.lt-p.lt); x.so_to_truoc = toTruoc[d+'|'+h] || 0; }
      if(h==='TT') x.so_ho = k(g.kh).length;   /* trực tiếp: số hộ = số khách có món (bàn giao 2.2) */
      D.so[h] = x; }); });
  bcKiemA(ra, dongM31, Object.keys(soKU).length);
  return ra;
}
function bcKiemA(ra, dong, nKU){   /* tầng A — bàn giao mục 6; sai số 0,001 triệu */
  var k = ra.kiem, sai = function(a, b){ return Math.abs((a||0)-(b||0))>0.0015; }, R6 = function(v){ return Math.round((v||0)/1000)/1000; };
  var cong = {dn:0, qh:0, kn:0, t105:0};
  Object.keys(ra.diem).forEach(function(d){ var D = ra.diem[d], s = {du_no:0, nqh:0, khoanh:0, tien_gui:0};
    Object.keys(D.so).forEach(function(h){ ['du_no', 'nqh', 'khoanh', 'tien_gui'].forEach(function(f){ s[f] += D.so[h][f]||0; }); });
    var l = ['du_no', 'nqh', 'khoanh', 'tien_gui'].filter(function(f){ return sai(s[f], R6(D.tong[{du_no:'dn', nqh:'qh', khoanh:'kn', tien_gui:'t105'}[f]])); });
    k.push([D.khoa, 'Σ Hội + trực tiếp = tổng điểm (dư nợ, NQH, khoanh, tiền gửi)', l.length ? 'Lệch' : 'Đạt', l.join(', ')]);
    ['dn', 'qh', 'kn', 't105'].forEach(function(f){ cong[f] += D.tong[f]; });
    Object.keys(D.so).forEach(function(h){ var x = D.so[h]; if(x.du_no_truoc===undefined) return; var lech = Math.round((x.du_no_truoc + x.cho_vay - x.thu_no - x.du_no)*1000)/1000;
      if(Math.abs(lech)>0.0015) k.push([D.khoa, h+': đầu kỳ + cho vay − thu nợ = cuối kỳ', 'Lệch', 'chênh '+lech+' triệu (xóa nợ / điều chỉnh / chuyển tổ ngoài QT-C-21 → xem từng món)']); });
    var ds = D.ds, tg = function(f){ return Object.keys(D.so).reduce(function(a, h){ return a+(D.so[h][f]||0); }, 0); };
    [['nqh_list', 'nqh'], ['khoanh_list', 'khoanh'], ['khd_list', 'khd_du'], ['gn_list', 'cho_vay'], ['ndh_list', 'ndh']].forEach(function(c){ var a = R6(ds[c[0]].t), b = tg(c[1]);
      if(sai(a, b)) k.push([D.khoa, 'Σ '+c[0]+' = '+c[1], 'Lệch', a+' / '+b]); }); });
  var l2 = ['dn', 'qh', 'kn', 't105'].filter(function(f){ return sai(R6(cong[f]), R6(ra.pgd[f])); });
  k.push(['PGD', 'Σ điểm = toàn PGD (dư nợ, NQH, khoanh, tiền gửi)', l2.length ? 'Lệch' : 'Đạt', l2.join(', ')]);
  k.push(['PGD', 'Số dòng Mẫu 31 / số khế ước', dong===nKU ? 'Đạt' : 'Có lặp', dong+' dòng / '+nKU+' khế ước'+(dong===nKU ? '' : ' (dòng lặp chỉ tính 1 lần — QT-C-01)')]);
}
function bcCsvDong(ra){   /* dạng dài như tools/teo_dap_an.py */
  var r = [];
  Object.keys(ra.diem).forEach(function(d){ var D = ra.diem[d];
    BC_CT.forEach(function(f){ var c = 0, du = true;
      BC_HOI_DS.forEach(function(h){ var v = D.so[h] ? D.so[h][f] : 0; if(typeof v!=='number') du = false; r.push([ra.ky, D.khoa, h, f, v===undefined ? '' : v]); c += v||0; });
      var tt = BC_CT_TT.indexOf(f)>=0 && D.so.TT ? D.so.TT[f] : ''; r.push([ra.ky, D.khoa, 'TT', f, tt===undefined ? '' : tt]);
      r.push([ra.ky, D.khoa, 'CONG', f, du ? Math.round((c+(tt||0))*1000)/1000 : '']); });
    Object.keys(D.ds).forEach(function(k){ r.push([ra.ky, D.khoa, '', k+'.so_dong', D.ds[k].n]); r.push([ra.ky, D.khoa, '', k+'.tong', Math.round(D.ds[k].t/1000)/1000]); }); });
  return r;
}
function bcCsv(ra){ return '﻿'+[['ky', 'diem', 'hoi', 'chi_tieu', 'gia_tri']].concat(bcCsvDong(ra)).map(function(h){ return h.map(slCsvO).join(','); }).join('\r\n')+'\r\n'; }
function bcSo(ra, chu){   /* so với CSV đáp án (teo_dap_an.py) — chỉ so khóa có ở cả hai bên, cùng kỳ */
  var dong = String(chu||'').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean).map(function(l){ return l.split(','); }), dau = dong.shift() || [];
  var i = {}; dau.forEach(function(c, j){ i[c.trim()] = j; }); if(i.chi_tieu===undefined) return {loi:'File không đúng dạng ky, diem, hoi, chi_tieu, gia_tri'};
  var app = {}; bcCsvDong(ra).forEach(function(x){ app[x[0]+'|'+x[1]+'|'+x[2]+'|'+x[3]] = x[4]; });
  var kq = {so:0, dat:0, lech:[], thieu:0, ky:{}};
  dong.forEach(function(x){ var ky = x[i.ky], k = ky+'|'+x[i.diem]+'|'+x[i.hoi]+'|'+x[i.chi_tieu], b = x[i.gia_tri]; kq.ky[ky] = 1;
    if(b==='' || b==='None' || b==null) return; if(!(k in app)){ kq.thieu++; return; } var a = app[k]; if(a==='' || a==null) return;
    kq.so++; var d = Math.abs((+a)-(+b)); if(d<=0.05+1e-9) kq.dat++; else kq.lech.push([x[i.diem], x[i.hoi], x[i.chi_tieu], +a, +b]); });
  return kq;
}
function bcMo(ky){
  if(!ky || !KHO.coBang('hstd', ky)) return bao('Kỳ '+kyVN(ky)+' chưa có Mẫu 31.', 4);
  batChay(true, 'Đang dựng bộ số chuẩn '+kyVN(ky)+'…');
  KHO.nap(ky).then(function(K){ var kt = kyLui(K.thang, 1), coT = KHO.coBang('hstd', kt);
    return (coT ? KHO.nap(kt) : Promise.resolve(null)).then(function(Kp){ return KHO.nap(ky).then(function(K2){ BC.B = bcTinh(K2, Kp); BC.K = K2; return Kp; }); }); })
    .then(function(Kp){ tatChay(); if(!BC.diem || !BC.B.diem[BC.diem]) BC.diem = Object.keys(BC.B.diem)[0] || ''; BC.coTruoc = !!Kp; bcVe(); }, function(e){ tatChay(); baoLoi('Chưa dựng được bộ số chuẩn: '+(e && e.message || e)); });
}
function bcVe(){
  var B = BC.B; if(!B) return; var D = B.diem[BC.diem], e = coChuHTML, so = function(v){ return typeof v==='number' ? (Math.round(v*1000)/1000).toLocaleString('vi-VN') : '—'; };
  var chip = Object.keys(B.diem).map(function(d){ return GD.chip(e(B.diem[d].khoa), d===BC.diem, 'bc.diem', {d:d}); });
  var h = '';
  if(D){ var cot = BC_HOI_DS.concat(['TT']);
    h = '<table class="to-bang luoi bc-bang"><thead><tr><th>Chỉ tiêu (khóa giao ban)</th>'+cot.map(function(c){ return '<th>'+(c==='TT' ? 'Trực tiếp' : c)+'</th>'; }).join('')+'</tr></thead><tbody>'+
      BC_CT.map(function(f){ return '<tr><td><code>'+f+'</code></td>'+cot.map(function(c){ var x = D.so[c], v = x ? x[f] : undefined; if(c==='TT' && BC_CT_TT.indexOf(f)<0) v = undefined; return '<td class="s">'+so(v)+'</td>'; }).join('')+'</tr>'; }).join('')+
      '</tbody></table><div class="hop-phu">Danh sách: '+Object.keys(D.ds).map(function(k){ return '<code>'+k+'</code> '+D.ds[k].n+' món / '+so(Math.round(D.ds[k].t/1000)/1000); }).join(' · ')+'</div>'; }
  var kiem = '<table class="to-bang luoi"><thead><tr><th>Phạm vi</th><th>Kiểm tầng A</th><th>Kết quả</th><th>Ghi chú</th></tr></thead><tbody>'+
    B.kiem.map(function(r){ return '<tr'+(r[2]==='Đạt' ? '' : ' class="nb"')+'><td>'+e(r[0])+'</td><td>'+e(r[1])+'</td><td>'+(r[2]==='Đạt' ? '<b class="xanh">Đạt</b>' : '<b class="do">'+e(r[2])+'</b>')+'</td><td>'+e(r[3])+'</td></tr>'; }).join('')+'</tbody></table>';
  moHop('<div class="hop-tit">📐 Bộ số chuẩn — số liệu '+e(B.ky)+(B.kyTruoc ? ' · so với '+e(B.kyTruoc) : '')+'</div>'+
    '<div class="hop-phu">Dựng song song với giao ban để anh <b>đối chiếu độ tin cậy</b> (văn bản chính thức vẫn do giao ban làm). '+
    'Chỉ tiêu theo <code>so_lieu_tong_hop.json</code>, triệu đồng; kỳ trước xếp theo vị trí hiện nay của khế ước (QT-C-21).'+
    (BC.coTruoc ? '' : ' <b class="do">Chưa có Mẫu 31 cuối tháng trước → không có số kỳ trước / tăng giảm.</b>')+'</div>'+
    GD.hang(chip)+'<div class="to-bang-cuon to-cuon-khung">'+h+'<h4>Kiểm tầng A — cân đối nội bộ</h4>'+kiem+'<div id="bc-so"></div></div>'+
    GD.hang([GD.nut({chu:'Đóng', lenh:'bc.dong'}), GD.nut({chu:'📥 CSV bộ số (so bằng máy)', lenh:'bc.csv'}), GD.nut({chu:'📂 So với file đáp án…', lenh:'bc.so', chinh:1, tit:'Chọn DAP_AN_<Điểm>.csv dựng bằng tools/teo_dap_an.py từ json giao ban'})], true), true);
}
function bcSoFile(){
  var i = document.createElement('input'); i.type = 'file'; i.accept = '.csv,text/csv';
  i.onchange = function(){ var f = i.files && i.files[0]; if(!f) return; var r = new FileReader(); r.onload = function(){ var kq = bcSo(BC.B, r.result), e = document.getElementById('bc-so'), x = coChuHTML; if(!e) return;
    if(kq.loi) return void (e.innerHTML = '<div class="sl-bao do">'+x(kq.loi)+'</div>');
    var kyKhac = Object.keys(kq.ky).filter(function(k){ return k!==BC.B.ky; });
    e.innerHTML = '<h4>So với đáp án: '+x(f.name)+'</h4><div class="sl-bao '+(kq.lech.length ? 'vang' : 'xanh')+'">So '+kq.so+' số · <b>khớp '+kq.dat+'</b> (sai số 0,05 triệu) · lệch '+kq.lech.length+(kq.thieu ? ' · '+kq.thieu+' số đáp án app chưa có (khác kỳ / chỉ tiêu chưa làm)' : '')+
      (kyKhac.length ? ' · file có kỳ khác ('+x(kyKhac.join(', '))+') — chỉ so kỳ '+x(BC.B.ky) : '')+'</div>'+
      (kq.lech.length ? '<table class="to-bang luoi"><thead><tr><th>Điểm</th><th>Hội</th><th>Chỉ tiêu</th><th>App</th><th>Đáp án</th><th>Chênh</th></tr></thead><tbody>'+
        kq.lech.map(function(l){ return '<tr class="nb"><td>'+x(l[0])+'</td><td>'+x(l[1])+'</td><td><code>'+x(l[2])+'</code></td><td class="s">'+l[3]+'</td><td class="s">'+l[4]+'</td><td class="s">'+(Math.round((l[3]-l[4])*1000)/1000)+'</td></tr>'; }).join('')+'</tbody></table>' : '')+
      '<div class="hop-phu">Lệch → báo anh và TK 1, không tự chọn nguồn (QT-C-08). Phân loại: A lỗi code · B luật chưa chốt (K1, K4, K5, K9) · C khác phạm vi / thời điểm · D làm tròn.</div>'; }; r.readAsText(f, 'utf-8'); };
  i.click();
}
(function(){
  function dk(){ if(dk.xong || typeof GD==='undefined') return; dk.xong = 1;
    GD.dangKy('bc', {mo:function(el){ dongHop(); bcMo(el.getAttribute('data-ky')); }, diem:function(el){ BC.diem = el.getAttribute('data-d'); bcVe(); }, dong:function(){ dongHop(); },
      csv:function(){ if(BC.B) taiXuongBlob(new Blob([bcCsv(BC.B)], {type:'text/csv'}), 'BO_SO_CHUAN_APP_'+BC.K.ngay+'.csv'); }, so:function(){ bcSoFile(); }}); }
  if(typeof slDCNut!=='function') return; var cu = slDCNut;   /* nút 📐 cạnh 📤 File đối chiếu Tèo (⋯ Nạp & KT) */
  slDCNut = function(ky){ dk(); return cu.apply(this, arguments)+'<button class="nho" data-lenh="bc.mo" data-ky="'+coChuHTML(ky)+'" title="Bộ số chuẩn theo chỉ tiêu giao ban + kiểm tầng A + so với file đáp án">📐 Bộ số chuẩn (đối chiếu giao ban)</button>'; };
})();
