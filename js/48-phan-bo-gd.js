/* ===== P2 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 5): 🎯 PHÂN BỔ KH — GIAO DIỆN tab con trong 📈 Số liệu (tiền tố pb) =====
   - Chỉ VẼ + nhận lệnh (GD.dangKy('pb', …), data-lenh="pb.…"); mọi phép tính ở js/47-phan-bo.js; số liệu chung qua KHO (dsTo, duNoAp); lưu qua KHO1 ('pb').
   - Cột trái: danh sách QĐ (nhóm theo QĐ = số + ngày + ký hiệu, mỗi dòng 1 xã) · ＋ QĐ mới · 📥 Nhập file sao lưu QĐ của bản WPF.
   - Hộp QĐ (QT-17): tích nhiều xã (nhập trước vài xã, mở lại tích thêm) · thêm CT cho các xã đã tích · Đã giao gợi ý theo QĐ trước / dư nợ 31/12 · Đến 31/12 tự tính · Kiểm tra ✗ / ⚠.
   - Cột phải: chọn xã của QĐ · cách chia · kỳ dư nợ (chính xác) · ⚙ Phân bổ → đối chiếu từng CT (QT-16) + bảng ấp, SỬA TAY tăng/giảm (QT-15.6) → 👁 Biểu 07 xã đang xem · 📦 mọi xã của QĐ (3.289 P3, mẫu js/mau/07pb.js).
   - Lưu: KHO1.doc('pb') = {qd:[QĐ…], ch:{buocTD, buocCX, soApToiDa}} — mỗi xã 1 bản ghi QĐ (schema ở đầu js/47). */
var PB = {C:{ky:''}, K:null, xa:{}, dsXa:[], chon:{khoa:'', xa:''}, cheDo:'', kyCX:'', kq:null, kqLuc:'', dn:{}, F:null, che:'', dc:{nam:'', chiLech:false, daDoc:{}}, db:{nam:'', xa:'', nguon:0, ct:'', moXa:''}};   /* 3.301: che = '' phân bổ · 'dc' 🔎 đối chiếu chéo · 'db' 📈 diễn biến (cột phải) */
function pbDL(){ var d = KHO1.doc('pb'); if(!d || typeof d!=='object') d = {}; d.qd = Array.isArray(d.qd) ? d.qd : []; d.ch = d.ch || {}; return d; }
function pbGhi(d){ d.sua = new Date().toISOString(); KHO1.ghi('pb', d); }
function pbKhoa(q){ return String(q.so || '').trim()+'|'+String(q.ngay || '').slice(0, 10)+'|'+String(q.kyHieu || '').trim(); }   /* 1 QĐ giao nhiều xã = cùng khóa */
function pbNhom(){ var g = {}, thu = []; pbDL().qd.forEach(function(q){ var k = pbKhoa(q); if(!g[k]){ g[k] = []; thu.push(k); } g[k].push(q); });
  return thu.map(function(k){ return {k:k, ds:g[k].sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi'); })}; })
    .sort(function(a, b){ var x = a.ds[0], y = b.ds[0]; return x.ngay < y.ngay ? 1 : x.ngay > y.ngay ? -1 : String(x.so).localeCompare(String(y.so)); }); }
function pbNgay(iso){ return iso ? String(iso).slice(8, 10)+'/'+String(iso).slice(5, 7)+'/'+String(iso).slice(0, 4) : ''; }
function pbVT(ma){ return typeof ctNgan==='function' ? ctNgan(ma) : ma; }
function pbTenCT(ma){ var c = typeof TDN_CT!=='undefined' ? TDN_CT[ma] : null; return c ? c[1] : 'Chương trình '+ma; }
function pbNguonChu(n){ return +n===2 ? 'ĐP' : 'TW'; }

/* ---------- dựng: kỳ chung → cây địa bàn (xã → ấp) ---------- */
function pbVe(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(pbVe); return; }
  var dsKy = toDsKy();
  if(!dsKy.length){ PB.K = null; PB.xa = {}; PB.dsXa = []; pbKhung(); return; }   /* chưa có Mẫu 31 → vẫn nhập QĐ được; phân bổ báo thiếu ấp */
  toKyMacDinh(PB.C, dsKy, 'pb');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(PB.C.ky)+'…</div>';
  KHO.nap(PB.C.ky).then(function(K){ PB.K = K; pbDungXa(K);   /* đọc cây qua KHO.voiKy(K, …) — không gán biến kho chung */ if(nganHienTai===7 && D.cauHinh.slTab==='pb') pbKhung(); })
    .catch(function(er){ PB.K = null; PB.xa = {}; PB.dsXa = []; if(nganHienTai===7 && D.cauHinh.slTab==='pb') pbKhung('Chưa mở được số liệu: '+(er && er.message || er)); });
}
function pbDungXa(K){
  var x = {};
  KHO.voiKy(K, function(){ return KHO.dsTo(); }).forEach(function(t){
    if(!t || !t.xa) return; var o = x[t.xa] = x[t.xa] || {ma:t.xa, ten:t.tenXa || t.xa, ap:[], co:{}};
    if(t.thon && !o.co[t.thon]){ o.co[t.thon] = 1; o.ap.push({k:t.thon, ten:pbTenAp(o.ten, t.tenThon)}); } });
  PB.dsXa = Object.keys(x).map(function(m){ var o = x[m]; o.ap.sort(function(a, b){ return a.ten.localeCompare(b.ten, 'vi'); }); delete o.co; return o; })
    .sort(function(a, b){ return a.ten.localeCompare(b.ten, 'vi'); });
  PB.xa = {}; PB.dsXa.forEach(function(o){ PB.xa[o.ma] = o; });
}
function pbDsKyCX(){ return toDsKy().map(function(x){ return x.ky; }).filter(function(k){ return KHO.coBang('hstd', k); }); }
function pbKhung(loi){
  var e = document.getElementById('tr7'); if(!e) return;
  e.innerHTML = slTabConHTML()+(PB.K ? kyGhiHTML(PB.K) : '')+
    (loi ? '<div class="sl-bao do">'+coChuHTML(loi)+'</div>' : !PB.K ? '<div class="sl-bao vang">Chưa có Mẫu 31 — vẫn nhập QĐ được; muốn phân bổ xuống ấp cần nạp Mẫu 31 ở <b>📥 Nạp &amp; KT</b> (danh sách ấp, dư nợ).</div>' : '')+
    '<div class="th-bo th-bo2 pb-bo"><div class="th-cot hso-trai" id="pb-trai"></div><div class="th-cot th-xem pb-phai" id="pb-phai"></div></div>';
  pbVeTrai(); pbVePhai();
}

/* ---------- cột trái: danh sách QĐ ---------- */
function pbVeTrai(){
  var o = document.getElementById('pb-trai'); if(!o) return;
  var nh = pbNhom();
  o.innerHTML = '<div class="th-nhom-ten"><b>📋 Quyết định</b> <small>'+nh.length+' QĐ · '+pbDL().qd.length+' lượt xã</small></div>'+
    GD.hang([GD.nut({chu:'＋ QĐ mới', lenh:'pb.moi', chinh:1, tit:'Nhập 1 QĐ cho 1 hoặc nhiều xã'}), GD.nut({chu:'📈 Diễn biến', lenh:'pb.db', lop:PB.che==='db' ? 'bat' : '', tit:'Diễn biến phân vốn theo KH: đầu năm → từng QĐ → KH cuối năm ↔ dư nợ thực tế từng tháng'}),
      GD.nut({chu:'🔎 Đối chiếu chéo', lenh:'pb.dc', lop:PB.che==='dc' ? 'bat' : '', tit:'Mỗi QĐ: Biểu 07 khớp số giao + Đến 31/12; chuỗi QĐ trong năm; đầu năm ↔ dư nợ 31/12 năm trước'}),
      '<label class="nut-tep nho" title="File SaoLuu_QD_….json xuất từ app Phân bổ kế hoạch (bản máy tính)">📥 Nhập từ bản WPF<input type="file" accept=".json,application/json" style="display:none" data-lenh="pb.nhapWPF" data-su="change"></label>'])+
    (nh.length ? '<div class="pb-ds">'+nh.map(function(g){
      var q0 = g.ds[0], giao = /giao mới/i.test(q0.loai), dangChon = PB.chon.khoa===g.k;
      return '<div class="pb-nhom'+(dangChon ? ' bat' : '')+'"><div class="pb-nhom-dau '+(giao ? 'pb-gm' : 'pb-dc')+'">'+
        '<b>QĐ '+coChuHTML(q0.so)+'</b> · '+pbNgay(q0.ngay)+' · '+pbNguonChu(q0.nguon)+(q0.dot ? ' · đợt '+coChuHTML(q0.dot) : '')+' · '+(giao ? 'GIAO MỚI' : 'ĐIỀU CHỈNH')+(g.ds.length>1 ? ' · '+g.ds.length+' xã' : '')+
        ' '+GD.nut({chu:'✎', lenh:'pb.sua', du:{k:g.k}, tit:'Sửa QĐ / tích thêm xã', lop:'pb-nho'})+'</div>'+
        g.ds.map(function(q){ var loi = (q.ct || []).some(function(c){ return pbKiemNhapQD(c); });
          return '<div class="pb-dong'+(dangChon && PB.chon.xa===q.xa ? ' bat' : '')+(loi ? ' pb-loi' : '')+'" data-lenh="pb.chon" data-k="'+coChuHTML(g.k)+'" data-xa="'+coChuHTML(q.xa)+'" title="Bấm để phân bổ xã này">'+
            '<b>'+coChuHTML(q.tenXa || q.xa)+'</b>'+(q.xa ? '' : ' <span class="vang" title="Chưa ghép được xã trong cây địa bàn">⚠ chưa ghép xã</span>')+' — '+
            (loi ? '<span class="do">✗ lệch số · </span>' : '')+(q.ct || []).map(function(c){ var tg = pbSo(c.tangGiam);
              return coChuHTML(pbVT(c.ma))+' '+(tg!=null && tg!==0 ? pbSoDau(tg) : pbSoVN(pbSo(c.den3112) || 0)); }).join(' · ')+'</div>'; }).join('')+'</div>'; }).join('')+'</div>'
      : '<div class="sl-phu">Chưa có QĐ. Bấm <b>＋ QĐ mới</b> hoặc <b>📥 Nhập từ bản WPF</b> (file sao lưu QĐ của app máy tính).</div>');
}

/* ---------- cột phải: phân bổ 1 xã của QĐ ---------- */
function pbQDChon(){ var c = PB.chon; if(!c.khoa) return null; return pbDL().qd.filter(function(q){ return pbKhoa(q)===c.khoa && q.xa===c.xa; })[0] || null; }
function pbCheDo(){ return PB.cheDo || (pbDL().ch.cheDo==='cx' ? 'cx' : 'td'); }
function pbVePhai(){
  if(PB.che==='dc') return pbDCVe();
  if(PB.che==='db') return pbDBVe();
  var o = document.getElementById('pb-phai'); if(!o) return;
  var q = pbQDChon();
  if(!q){ o.innerHTML = '<div class="sl-phu pb-goi">Chọn 1 dòng xã của QĐ ở cột trái để phân bổ xuống ấp.<br><small>Quy tắc: số giao chẵn (tương đối 100 tr · chính xác 50 tr), chỉ 1 ấp lẻ; Biểu 07 phải khớp Đã giao → Tăng/giảm → Đến 31/12 của QĐ.</small></div>'; return; }
  var cd = pbCheDo(), g = pbNhom().filter(function(x){ return x.k===PB.chon.khoa; })[0], dsKy = pbDsKyCX(), ky = pbChonKy(dsKy, q.ngay, PB.kyCX);
  var xaO = PB.xa[q.xa], soAp = xaO ? xaO.ap.length : 0;
  o.innerHTML = '<div class="th-nhom-ten"><b>⚙ Phân bổ QĐ '+coChuHTML(q.so)+' · '+pbNgay(q.ngay)+' · '+pbNguonChu(q.nguon)+'</b></div>'+
    (g && g.ds.length>1 ? GD.hang(g.ds.map(function(x){ return GD.chip(coChuHTML(x.tenXa || x.xa), x.xa===q.xa, 'pb.chon', {k:g.k, xa:x.xa}); })) : '')+
    GD.hang([GD.chip('Tương đối (chia đều)', cd==='td', 'pb.cheDo', {v:'td'}, 'Chia đều chẵn 100 — không cần dư nợ'),
      GD.chip('Chính xác (theo dư nợ)', cd==='cx', 'pb.cheDo', {v:'cx'}, 'Theo tỷ lệ dư nợ Mẫu 31 cuối tháng trước QĐ — chẵn 50')].concat(cd==='cx' ? [
      GD.kv('Kỳ dư nợ', '<select data-lenh="pb.ky" data-su="change"><option value="">Tự động'+(ky && !PB.kyCX ? ' ('+coChuHTML(slKyChu(ky.ky))+')' : '')+'</option>'+dsKy.map(function(k){ return '<option value="'+k+'"'+(k===PB.kyCX ? ' selected' : '')+'>'+coChuHTML(slKyChu(k))+'</option>'; }).join('')+'</select>')] : [])
      .concat([GD.nut({chu:'⚙ Phân bổ', lenh:'pb.chay', chinh:1})]))+
    '<div class="sl-phu">'+coChuHTML(q.tenXa || q.xa)+': '+(soAp ? soAp+' ấp / khu phố theo cây địa bàn kỳ '+coChuHTML(slKyChu(PB.C.ky)) : '<span class="vang">⚠ chưa có danh sách ấp (nạp Mẫu 31 / kiểm tra tên xã)</span>')+
      ' · '+(q.ct || []).filter(function(c){ return pbSoCanPhanBo(q, c); }).length+'/'+(q.ct || []).length+' chương trình cần phân bổ</div>'+
    '<div id="pb-kq">'+(PB.kq && PB.kqLuc===pbKhoaKQ(q, cd) ? pbKQHTML(q, cd) : '<div class="sl-phu">Bấm <b>⚙ Phân bổ</b>.</div>')+'</div>';
}
function pbKhoaKQ(q, cd){ return q.id+'|'+cd+'|'+(cd==='cx' ? PB.kyCX : ''); }
function pbChay(){
  var q = pbQDChon(); if(!q) return; var cd = pbCheDo(), xaO = PB.xa[q.xa], ap = xaO ? xaO.ap : [], ch = pbDL().ch;
  var xong = function(duNo, moTa){ PB.kq = pbPhanBo(q, {cheDo:cd, ap:ap, duNo:duNo, ch:ch}); PB.kqMoTa = moTa; PB.kqLuc = pbKhoaKQ(q, cd); pbVePhai(); };
  if(cd!=='cx') return xong(null, 'TƯƠNG ĐỐI — chia đều chẵn '+pbSoVN(pbCH(ch).buocTD)+', chỉ tiêu trước = Đã giao chia đều các ấp');
  var dsKy = pbDsKyCX(), ky = pbChonKy(dsKy, q.ngay, PB.kyCX);
  if(!ky) return baoLoi('Chế độ Chính xác cần Mẫu 31 — nạp ở 📥 Nạp & KT, hoặc dùng Tương đối.');
  batChay(false, 'Đang đọc dư nợ Mẫu 31 '+slKyChu(ky.ky)+'…');
  pbDuNo(ky.ky).then(function(Dn){ tatChay(); if(!Dn) return baoLoi('Chưa đọc được Mẫu 31 kỳ '+slKyChu(ky.ky)+'.');
    xong(pbDuNoXa(Dn, q.xa), 'CHÍNH XÁC theo dư nợ '+slKyChu(ky.ky)+' ('+ky.moTa+'); chỉ tiêu trước = dư nợ thật từng ấp, chênh dồn ấp dư nợ lớn nhất'); },
    function(er){ tatChay(); baoLoi('Lỗi đọc dư nợ: '+(er && er.message || er)); });
}
function pbDuNo(ky){ if(PB.dn[ky]) return Promise.resolve(PB.dn[ky]); return KHO.duNoAp(ky).then(function(Dn){ if(Dn) PB.dn[ky] = Dn; return Dn; }); }
function pbKQHTML(q, cd){
  var kq = PB.kq || []; if(!kq.length) return '<div class="sl-bao vang">QĐ này không có chương trình nào cần phân bổ (chỉ có số dư, không có tăng/giảm).</div>';
  var loi = [], nang = false, chan = false, dongDC = kq.map(function(k){ var r = pbKiem(k), vt = pbVT(k.ma);
      r.lyDo.forEach(function(l){ loi.push('✗ '+vt+': '+l); }); if(r.coAm) loi.push('⚠ '+vt+': có ấp chỉ tiêu năm âm'); if(k.canhBao) loi.push('⚠ '+vt+': '+k.canhBao);
      if(!r.xuatDuoc || r.coAm) nang = true; if(!r.xuatDuoc) chan = true;
      return '<tr class="'+(!r.xuatDuoc || r.coAm ? 'pb-loi' : '')+'"><td>'+coChuHTML(vt)+' ('+k.ma+')</td><td class="so">'+pbSoVN(k.daGiaoXa)+' '+pbSoDau(k.so)+' → '+pbSoVN(k.den3112Xa)+'</td>'+
        '<td class="so">'+pbSoVN(r.tongTruoc)+' '+pbSoDau(r.tongDc)+' → '+pbSoVN(r.tongNam)+'</td><td>'+(!r.xuatDuoc ? '<span class="do">✗ LỆCH</span>' : r.coAm ? '<span class="vang">⚠ Có ấp âm</span>' : k.canhBao ? '<span class="vang">⚠ Khớp, có cảnh báo</span>' : '<span class="xanh">✓ Khớp'+(k.suaTay ? ' (chỉnh tay)' : '')+'</span>')+'</td></tr>'; }).join('');
  var muc = nang ? 'do' : loi.length ? 'vang' : 'xanh';
  var apNhan = {}, soKhop = 0; kq.forEach(function(k){ if(pbKiem(k).xuatDuoc) soKhop++; k.ap.forEach(function(a){ if(a.dc) apNhan[a.k] = 1; }); });   /* thẻ số tổng (giao diện thẻ như 📈 Diễn biến) */
  return '<div class="pb-kpi">'+pbDBThe('Số giao QĐ', pbSoDau(pbSum(kq, function(k){ return k.so; })), kq.length+' chương trình')+pbDBThe('Đến 31/12 (xã)', pbSoVN(pbSum(kq, function(k){ return k.den3112Xa; })), 'Đã giao '+pbSoVN(pbSum(kq, function(k){ return k.daGiaoXa; })))+
      pbDBThe('Ấp nhận tăng / giảm', String(Object.keys(apNhan).length), (cd==='cx' ? 'chính xác' : 'tương đối')+' · chẵn '+pbSoVN(cd==='cx' ? pbCH(pbDL().ch).buocCX : pbCH(pbDL().ch).buocTD))+pbDBThe('Khớp QĐ', soKhop+' / '+kq.length, soKhop===kq.length ? 'xuất được Biểu 07' : 'còn chương trình lệch', Math.round(soKhop/kq.length*1000)/10)+'</div>'+
    '<div class="sl-phu">'+coChuHTML(PB.kqMoTa || '')+'</div>'+
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-dc"><thead><tr><th>Chương trình</th><th>QĐ: Đã giao ± → Đến 31/12</th><th>Tổng các ấp: Trước ± → Năm</th><th>Đối chiếu</th></tr></thead><tbody>'+dongDC+'</tbody></table></div>'+
    kq.map(function(k, ik){ var coDn = k.ap.some(function(a){ return a.dnThat!=null; }), r = pbKiem(k);
      return '<div class="pb-ct"><div class="th-nhom-ten"><b>► '+coChuHTML(pbVT(k.ma))+'</b> <small>'+coChuHTML(k.ten || pbTenCT(k.ma))+'</small></div>'+
        '<div class="to-bang-cuon"><table class="to-bang luoi pb-ap"><thead><tr><th>Ấp / khu phố</th>'+(coDn ? '<th>Dư nợ thật</th>' : '')+'<th>Chỉ tiêu trước</th><th>Tăng/giảm ✎</th><th>Chỉ tiêu năm</th><th>Ghi chú</th></tr></thead><tbody>'+
        k.ap.map(function(a, i){ var chenh = a.dnThat!=null ? pbR(a.truoc - a.dnThat) : 0;
          var ghi = (a.nam<0 ? '⚠ Âm — giảm quá chỉ tiêu' : a.suaTay ? '✎ sửa tay' : '')+(chenh ? (a.nam<0 || a.suaTay ? ' · ' : '')+'trước = dư nợ thật '+pbSoDau(chenh) : '');
          return '<tr class="'+(a.nam<0 ? 'pb-loi' : '')+(a.dc ? '' : ' pb-mo')+'"><td>'+coChuHTML(a.ten)+'</td>'+(coDn ? '<td class="so">'+(a.dnThat!=null ? pbSoVN(a.dnThat) : '')+'</td>' : '')+
            '<td class="so">'+pbSoVN(a.truoc)+'</td><td class="so">'+GD.o({loai:'so', gt:a.dc ? pbSoDau(a.dc) : '', ph:'0', lenh:'pb.suaTay', du:{ct:ik, i:i}})+'</td><td class="so">'+pbSoVN(a.nam)+'</td><td><small>'+coChuHTML(ghi)+'</small></td></tr>'; }).join('')+
        '<tr class="tong"><td>Cộng</td>'+(coDn ? '<td class="so">'+pbSoVN(pbSum(k.ap, function(a){ return a.dnThat || 0; }))+'</td>' : '')+'<td class="so">'+pbSoVN(r.tongTruoc)+'</td><td class="so">'+pbSoDau(r.tongDc)+'</td><td class="so">'+pbSoVN(r.tongNam)+'</td><td></td></tr>'+
        '</tbody></table></div></div>'; }).join('')+
    '<div class="sl-bao '+muc+' pb-tt">'+(nang ? 'Chưa xuất được Biểu 07 — sửa các dòng đỏ cho khớp QĐ (Đã giao → Tăng/giảm → Đến 31/12).' : loi.length ? 'Khớp QĐ, nhưng có cảnh báo — xem lại trước khi xuất.' : 'Tất cả chương trình KHỚP QĐ, không ấp nào âm.')+
      (loi.length ? '<br>'+loi.map(coChuHTML).join('<br>') : '')+'</div>'+pb07NutHTML(q, chan);
}

/* ---------- hộp nhập / sửa QĐ (QT-17) ---------- */
function pbMoQD(khoa){
  var dl = pbDL(), ds = khoa ? dl.qd.filter(function(q){ return pbKhoa(q)===khoa; }) : [], q0 = ds[0] || {};
  PB.F = {ids:ds.map(function(q){ return q.id; }), so:q0.so || '', kyHieu:q0.kyHieu || '/QĐ-BĐDHĐQT', ngay:q0.ngay || '', nguon:q0.nguon || 0, loai:q0.loai || '', dot:q0.dot || '',
    xa:{}, dong:[], doi:false, ctChon:''};
  ds.forEach(function(q){ PB.F.xa[q.xa || ('?'+q.tenXa)] = q.tenXa || q.xa; (q.ct || []).forEach(function(c){ PB.F.dong.push({xa:q.xa || ('?'+q.tenXa), ma:c.ma, ten:c.ten, daGiao:pbSo(c.daGiao), tangGiam:pbSo(c.tangGiam), den3112:pbSo(c.den3112), dgTu:false, denTu:false}); }); });
  pbDuNoNamTruoc();
  moHop('<div class="hop-tit">📋 '+(khoa ? 'Sửa QĐ '+coChuHTML(q0.so)+' · '+ds.length+' xã' : 'QĐ mới')+'</div>'+
    '<div class="hop-phu">Đơn vị: triệu đồng. Tích các xã của QĐ (nhập trước vài xã, lần sau mở lại tích thêm). Đã giao tự gợi ý theo Đến 31/12 của QĐ trước — sửa được; Đến 31/12 tự tính. Ngày gõ liền số (1592026 = 15/09/2026). Ctrl+Enter = Lưu.</div>'+
    '<div id="pb-f"></div>', true);
  pbFVe();
}
function pbFVe(){
  var o = document.getElementById('pb-f'), F = PB.F; if(!o || !F) return;
  var dsXa = PB.dsXa.slice(); Object.keys(F.xa).forEach(function(k){ if(!PB.xa[k]) dsXa.push({ma:k, ten:F.xa[k] + ' (chưa có trong cây)'}); });
  var ctDs = Object.keys(typeof TDN_CT!=='undefined' ? TDN_CT : {}).sort();
  var nhan = function(chu, noi){ return GD.kv(chu, noi); }, sel = function(f, gt, ds){ return '<select data-lenh="pb.fo" data-su="change" data-f="'+f+'">'+ds.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(String(x[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'; };
  var xaTich = dsXa.filter(function(x){ return F.xa[x.ma]; });
  o.innerHTML = GD.hang([nhan('Số QĐ', GD.o({loai:'ten', gt:F.so, lenh:'pb.fo', du:{f:'so'}})), nhan('Ký hiệu', GD.o({loai:'ten', gt:F.kyHieu, lenh:'pb.fo', du:{f:'kyHieu'}})),
      nhan('Ngày QĐ', GD.o({loai:'ngay', gt:F.ngay ? pbNgay(F.ngay) : '', ph:'gõ liền số', lenh:'pb.fo', du:{f:'ngay'}})),
      nhan('Nguồn', sel('nguon', F.nguon, [[0, '— chọn —'], [1, 'TW'], [2, 'ĐP']])), nhan('Loại', sel('loai', F.loai, [['', '— chọn —'], ['Giao mới', 'Giao mới'], ['Điều chỉnh', 'Điều chỉnh']])),
      nhan('Đợt', GD.o({loai:'so', gt:F.dot, lenh:'pb.fo', du:{f:'dot'}}))])+
    '<div class="pb-f-xa"><b>Xã / phường:</b> '+(dsXa.length ? dsXa.map(function(x){ return '<label class="hso-o2"><input type="checkbox" data-lenh="pb.fXa" data-su="change" data-ma="'+coChuHTML(x.ma)+'"'+(F.xa[x.ma] ? ' checked' : '')+'> '+coChuHTML(x.ten)+'</label>'; }).join(' ')
      : '<span class="vang">Chưa có cây địa bàn (nạp Mẫu 31)</span>')+'</div>'+
    GD.hang([nhan('Chương trình', '<select data-lenh="pb.fo" data-su="change" data-f="ctChon"><option value="">— chọn —</option>'+ctDs.map(function(m){ var daCo = F.dong.some(function(d){ return d.ma===m; });
        return '<option value="'+m+'"'+(m===F.ctChon ? ' selected' : '')+'>'+(daCo ? '✓ ' : '')+m+' - '+coChuHTML(pbVT(m))+' - '+coChuHTML(pbTenCT(m))+'</option>'; }).join('')+'</select>'),
      GD.nut({chu:'＋ Thêm cho '+(xaTich.length || 0)+' xã đã tích', lenh:'pb.fThemCT', tat:!xaTich.length})])+
    '<div id="pb-f-bang">'+pbFBangHTML()+'</div>'+
    GD.hang([GD.nut({chu:'💾 Lưu QĐ', lenh:'pb.fLuu', chinh:1, tit:'Ctrl+Enter'}), GD.nut({chu:'Bỏ', lenh:'pb.fBo'})].concat(F.ids.length ? [GD.nut({chu:'🗑 Xóa cả QĐ', lenh:'pb.fXoa', lop:'do'})] : []), 1);
}
function pbFGoiY(d){
  var F = PB.F, ng = F.ngay, nv = +F.nguon; if(!ng || !nv || String(d.xa).charAt(0)==='?') return {v:null, moTa:'', tuQD:false};
  return pbGoiYDaGiao(pbDL().qd, d.xa, d.ma, nv, ng, F.ids, pbDuNoNT(d.xa, d.ma, nv));
}
function pbDuNoNT(xa, ma, nv){   /* dư nợ 31/12 năm trước (triệu) — chỉ khi đã đọc Mẫu 31 kỳ 12 năm trước */
  var F = PB.F, ky = F && F.ngay ? (+F.ngay.slice(0, 4)-1)+'-12' : '', Dn = PB.dn[ky]; if(!Dn) return null;
  var s = 0, co = false; Dn.ds.forEach(function(r){ if(r.xa===xa && r.ct===ma && r.nguon===nv){ s += r.dn; co = true; } }); return co ? s/1e6 : 0; }
function pbDuNoNamTruoc(){ var F = PB.F; if(!F || !F.ngay) return; var ky = (+F.ngay.slice(0, 4)-1)+'-12';
  if(PB.dn[ky] || !KHO.coBang('hstd', ky)) return; pbDuNo(ky).then(function(){ if(PB.F===F) pbFBangVe(); }); }
function pbFTinhDong(d){   /* gợi ý Đã giao (khi đang tự động) + Đến 31/12 tự tính */
  var g = pbFGoiY(d); d.goiY = g;
  if(d.dgTu){ d.daGiao = g.v; }
  if(d.denTu && (d.daGiao!=null || d.tangGiam!=null)) d.den3112 = pbR((d.daGiao || 0) + (d.tangGiam || 0));
}
function pbFKiem(d){   /* → [mức 0 ổn · 1 nhắc · 2 lỗi, chữ] */
  if(d.daGiao!=null && d.tangGiam!=null && d.den3112!=null && pbR(d.daGiao + d.tangGiam)!==pbR(d.den3112))
    return [2, '✗ '+pbSoVN(d.daGiao)+' '+pbSoDau(d.tangGiam)+' = '+pbSoVN(pbR(d.daGiao + d.tangGiam))+' ≠ '+pbSoVN(d.den3112)+' (Biểu 07 sẽ bị chặn)'];
  if(d.tangGiam==null && d.den3112==null) return [1, 'Chưa nhập số'];
  var g = d.goiY || {};
  if(g.tuQD && g.v!=null && d.daGiao!=null && pbR(d.daGiao)!==pbR(g.v)) return [1, '⚠ Đã giao khác '+g.moTa+': '+pbSoVN(g.v)+' (lệch '+pbSoDau(d.daGiao - g.v)+')'];
  return [0, '✓ '+(g.v!=null ? 'gợi ý '+pbSoVN(g.v)+' theo '+g.moTa : 'chưa có QĐ trước / dư nợ để gợi ý')];
}
function pbFBangHTML(){
  var F = PB.F; if(!F.dong.length) return '<div class="sl-phu">Chưa có dòng — tích xã, chọn chương trình rồi bấm ＋ Thêm.</div>';
  var thu = F.dong.map(function(d, i){ return i; }).sort(function(a, b){ var x = F.dong[a], y = F.dong[b], tx = F.xa[x.xa] || '', ty = F.xa[y.xa] || '';
    return tx===ty ? (x.ma < y.ma ? -1 : 1) : String(tx).localeCompare(String(ty), 'vi'); }), xaTruoc = null, loi = 0, nhac = 0;
  var h = thu.map(function(i){ var d = F.dong[i]; pbFTinhDong(d); var k = pbFKiem(d); if(k[0]===2) loi++; else if(k[0]===1) nhac++;
    var dau = d.xa!==xaTruoc ? '<tr class="pb-f-xa-dong"><td colspan="6">📍 '+coChuHTML(F.xa[d.xa] || d.xa)+'</td></tr>' : ''; xaTruoc = d.xa;
    var oS = function(f, gt, dau_){ return GD.o({loai:'so', gt:gt==null ? '' : (dau_ ? pbSoDau(gt) : pbSoVN(gt)), lenh:'pb.fSo', du:{i:i, f:f}}); };
    return dau+'<tr class="'+(k[0]===2 ? 'pb-loi' : k[0]===1 ? 'pb-nhac' : '')+'"><td>'+d.ma+' '+coChuHTML(pbVT(d.ma))+'</td><td class="so">'+oS('daGiao', d.daGiao)+'</td><td class="so">'+oS('tangGiam', d.tangGiam, 1)+'</td><td class="so">'+oS('den3112', d.den3112)+'</td>'+
      '<td><small>'+coChuHTML(k[1])+'</small></td><td>'+GD.nut({chu:'✕', lenh:'pb.fBoDong', du:{i:i}, tit:'Bỏ dòng này'})+'</td></tr>'; }).join('');
  return '<div class="to-bang-cuon"><table class="to-bang luoi pb-f-bang"><thead><tr><th>Chương trình</th><th>Đã giao ✎</th><th>Tăng/giảm ✎</th><th>Đến 31/12 ✎</th><th>Kiểm tra</th><th></th></tr></thead><tbody>'+h+'</tbody></table></div>'+
    '<div class="sl-phu '+(loi ? 'do' : nhac ? 'vang' : 'xanh')+'">'+(loi ? '✗ '+loi+' dòng Đã giao + Tăng/giảm ≠ Đến 31/12' : nhac ? '⚠ '+nhac+' dòng cần xem lại' : '✓ '+F.dong.length+' dòng khớp')+'</div>';
}
function pbFBangVe(){ var o = document.getElementById('pb-f-bang'); if(o) o.innerHTML = pbFBangHTML(); }
function pbFThemCT(){
  var F = PB.F, m = F.ctChon; if(!m) return baoLoi('Chọn chương trình trước.');
  var n = 0; Object.keys(F.xa).forEach(function(x){ if(F.dong.some(function(d){ return d.xa===x && d.ma===m; })) return;
    F.dong.push({xa:x, ma:m, ten:pbTenCT(m), daGiao:null, tangGiam:null, den3112:null, dgTu:true, denTu:true}); n++; });
  if(!n) bao(pbVT(m)+' đã có ở mọi xã đã tích.', 3); F.doi = true; pbFVe();
}
function pbFLuu(){
  var F = PB.F, thieu = []; if(!F) return;
  if(!String(F.so).trim()) thieu.push('Số QĐ'); if(!F.ngay) thieu.push('Ngày QĐ'); if(!+F.nguon) thieu.push('Nguồn'); if(!F.loai) thieu.push('Loại');
  if(!F.dong.length) thieu.push('ít nhất 1 xã + 1 chương trình');
  var trong = F.dong.filter(function(d){ return d.tangGiam==null && d.den3112==null; }); if(trong.length) thieu.push('số liệu '+trong.length+' dòng (nhập Tăng/giảm hoặc bỏ dòng)');
  if(thieu.length) return baoLoi('Chưa đủ: '+thieu.join(', ')+'.');
  F.dong.forEach(pbFTinhDong);
  var lech = F.dong.filter(function(d){ return pbFKiem(d)[0]===2; }), dut = F.dong.filter(function(d){ var k = pbFKiem(d); return k[0]===1 && /khác QĐ/.test(k[1]); });
  if((lech.length || dut.length) && !confirm((lech.length ? lech.length+' dòng SỐ LỆCH (Đã giao + Tăng/giảm ≠ Đến 31/12) — Biểu 07 của các dòng này sẽ bị chặn.\n' : '')+
    (dut.length ? dut.length+' dòng Đã giao khác Đến 31/12 của QĐ trước (đứt chuỗi).\n' : '')+'Vẫn lưu?')) return;
  var dl = pbDL(), cu = dl.qd.filter(function(q){ return F.ids.indexOf(q.id)>=0; }), xaMoi = Object.keys(F.xa).filter(function(x){ return F.dong.some(function(d){ return d.xa===x; }); });
  var bo = cu.filter(function(q){ return xaMoi.indexOf(q.xa || ('?'+q.tenXa))<0; });
  if(bo.length && !confirm('Xóa khỏi QĐ các xã đã bỏ tích: '+bo.map(function(q){ return q.tenXa; }).join(', ')+'?')) return;
  var khoaMoi = pbKhoa({so:F.so, ngay:F.ngay, kyHieu:F.kyHieu}), trung = dl.qd.filter(function(q){ return F.ids.indexOf(q.id)<0 && String(q.so).trim()===String(F.so).trim() && xaMoi.indexOf(q.xa)>=0; });
  if(trung.length && !confirm('Đã có QĐ số '+F.so+' khác cho: '+trung.map(function(q){ return q.tenXa+' ('+pbNgay(q.ngay)+')'; }).join(', ')+'. Vẫn lưu?')) return;
  dl.qd = dl.qd.filter(function(q){ return bo.indexOf(q)<0; });
  var luc = new Date().toISOString();
  xaMoi.forEach(function(x){
    var q = cu.filter(function(c){ return (c.xa || ('?'+c.tenXa))===x; })[0];
    if(!q){ q = {id:'pb'+Date.now().toString(36)+Math.random().toString(36).slice(2, 7), luc:luc}; dl.qd.push(q); }
    var maXa = x.charAt(0)==='?' ? '' : x;
    q.so = String(F.so).trim(); q.kyHieu = String(F.kyHieu || '').trim(); q.ngay = F.ngay; q.nguon = +F.nguon; q.loai = F.loai; q.dot = String(F.dot || '').trim();
    q.xa = maXa; q.tenXa = F.xa[x] || (PB.xa[maXa] || {}).ten || ''; q.suaLuc = luc;
    q.ct = F.dong.filter(function(d){ return d.xa===x; }).sort(function(a, b){ return a.ma < b.ma ? -1 : 1; })
      .map(function(d){ return {ma:d.ma, ten:d.ten || pbTenCT(d.ma), daGiao:d.daGiao, tangGiam:d.tangGiam, den3112:d.den3112}; });
  });
  pbGhi(dl); PB.chon = {khoa:khoaMoi, xa:xaMoi[0].charAt(0)==='?' ? '' : xaMoi[0]}; PB.kq = null; PB.F = null;
  dongHop(); bao('Đã lưu QĐ '+F.so+' — '+xaMoi.length+' xã.', 3); pbVeTrai(); pbVePhai();
}
function pbFXoa(){
  var F = PB.F; if(!F || !F.ids.length) return;
  if(!confirm('Xóa QĐ '+F.so+' ngày '+pbNgay(F.ngay)+' — '+F.ids.length+' xã? (app tự chụp khai báo mỗi ngày — khôi phục ở ⚙ Khai báo đơn vị › 💾 Sao lưu)')) return;
  var dl = pbDL(); dl.qd = dl.qd.filter(function(q){ return F.ids.indexOf(q.id)<0; }); pbGhi(dl);
  PB.F = null; PB.chon = {khoa:'', xa:''}; PB.kq = null; dongHop(); bao('Đã xóa QĐ '+F.so+'.', 3); pbVeTrai(); pbVePhai();
}

/* ---------- 📥 nhập file sao lưu QĐ của bản WPF ---------- */
function pbNhapWPF(el){
  var f = el.files && el.files[0]; if(!f) return; el.value = '';
  f.text().then(function(s){ var j = JSON.parse(s.replace(/^﻿/, '')), moi = pbTuWPF(j), dl = pbDL(), them = 0, giong = 0, khac = [], chuaXa = {};
    moi.forEach(function(q){
      q.xa = pbKhopXa(q.tenXa, PB.dsXa); if(!q.xa) chuaXa[q.tenXa] = 1;
      var t = dl.qd.filter(function(c){ return String(c.so).trim()===q.so && (c.xa ? c.xa===q.xa : pbBoDau(c.tenXa)===pbBoDau(q.tenXa)) && c.ngay===q.ngay && +c.nguon===+q.nguon; })[0];
      if(t){ if(JSON.stringify(t.ct)===JSON.stringify(q.ct)) giong++; else khac.push('QĐ '+q.so+' · '+q.tenXa); return; }
      if(dl.qd.some(function(c){ return c.id===q.id; })) q.id = 'pb'+Date.now().toString(36)+Math.random().toString(36).slice(2, 7);
      dl.qd.push(q); them++; });
    if(them) pbGhi(dl);
    var cx = Object.keys(chuaXa);
    moHop('<div class="hop-tit">📥 Nhập QĐ từ bản WPF</div><div class="sl-bao '+(khac.length || cx.length ? 'vang' : 'xanh')+'">Đã thêm <b>'+them+'</b> lượt xã · trùng giống hệt (bỏ qua) '+giong+
      (khac.length ? '<br>⚠ Trùng số nhưng KHÁC số liệu — CHƯA nhập (kiểm tra tay): '+khac.map(coChuHTML).join('; ') : '')+
      (cx.length ? '<br>⚠ Chưa ghép được xã trong cây địa bàn kỳ đang mở (vẫn nhập, sửa QĐ để chọn xã): '+cx.map(coChuHTML).join(', ') : '')+'</div>'+
      GD.hang([GD.nut({chu:'Đóng', lenh:'pb.fBo', chinh:1})], 1));
    pbVeTrai();
  }).catch(function(er){ baoLoi('Không đọc được file: '+(er && er.message || er)); });
}

/* vẽ lại bảng sau khi đổi 1 ô mà KHÔNG mất chỗ con trỏ: Tab / Enter đã sang ô kế → vẽ xong đặt lại đúng ô đó (QUY_CHUAN mục 11) */
function pbGiuO(ve){
  setTimeout(function(){
    var a = document.activeElement, khoa = a && a.getAttribute ? ['data-lenh', 'data-ct', 'data-i', 'data-f'].map(function(t){ return a.getAttribute(t) || ''; }).join('|') : '';
    ve();
    if(!khoa || khoa==='|||') return;
    var ds = document.querySelectorAll('[data-lenh]');
    for(var i=0;i<ds.length;i++){ var e = ds[i]; if(['data-lenh', 'data-ct', 'data-i', 'data-f'].map(function(t){ return e.getAttribute(t) || ''; }).join('|')===khoa){ e.focus(); if(e.select) e.select(); break; } }
  }, 0);
}

/* ---------- 3.289 P3: BIỂU 07 (QT-16 — chỉ xuất khi khớp QĐ) · xem trước / In / PDF / Word · 1 xã hoặc mọi xã của QĐ ---------- */
var PB07 = {dl:[], bo:[], canh:[], K:null, kbMo:false, x:null};
function pb07NutHTML(q, chan){
  var g = pbNhom().filter(function(x){ return x.k===PB.chon.khoa; })[0], n = g ? g.ds.length : 1;
  return GD.hang([GD.nut({chu:'👁 Biểu 07 — '+coChuHTML(q.tenXa || q.xa), lenh:'pb.b07', chinh:1, tat:chan, tit:chan ? 'Chưa khớp QĐ — sửa các dòng đỏ trước' : 'Xem trước, In / PDF / Word Biểu 07 của xã này'})]
    .concat(n>1 ? [GD.nut({chu:'📦 Biểu 07 mọi xã của QĐ ('+n+')', lenh:'pb.b07Het', tit:'1 bản in / 1 file Word cho mọi xã của QĐ (cùng cách chia) — xã chưa khớp QĐ bỏ qua + báo'})] : []));
}
/* kết quả phân bổ từng xã: xã đang xem dùng bảng trên màn hình (giữ sửa tay); xã khác chia lại theo cách chia đang chọn */
function pb07Gom(tatCa){
  var q0 = pbQDChon(); if(!q0) return Promise.reject(new Error('Chọn 1 xã của QĐ ở cột trái trước.'));
  var cd = pbCheDo(), ch = pbDL().ch, g = pbNhom().filter(function(x){ return x.k===PB.chon.khoa; })[0], ds = tatCa && g ? g.ds : [q0];
  var kyO = cd==='cx' ? pbChonKy(pbDsKyCX(), q0.ngay, PB.kyCX) : null;
  if(cd==='cx' && !kyO) return Promise.reject(new Error('Chế độ Chính xác cần Mẫu 31 — nạp ở 📥 Nạp & KT, hoặc dùng Tương đối.'));
  return (kyO ? pbDuNo(kyO.ky) : Promise.resolve(null)).then(function(Dn){
    if(kyO && !Dn) throw new Error('Chưa đọc được Mẫu 31 kỳ '+slKyChu(kyO.ky)+'.');
    var r = {dl:[], bo:[], canh:[]};
    ds.forEach(function(q){ var ten = q.tenXa || q.xa, xaO = PB.xa[q.xa];
      if(!q.xa || !xaO || !xaO.ap.length){ r.bo.push(ten+': chưa có danh sách ấp (nạp Mẫu 31 / ghép tên xã)'); return; }
      var kq = q.id===q0.id && PB.kq && PB.kqLuc===pbKhoaKQ(q0, cd) ? PB.kq : pbPhanBo(q, {cheDo:cd, ap:xaO.ap, duNo:Dn ? pbDuNoXa(Dn, q.xa) : null, ch:ch});
      var d = pbBieu07DL(q, kq, pbTenCT);
      if(d.loi.length){ r.bo.push(ten+': '+d.loi.join('; ')); return; }
      kq.forEach(function(k){ if(k.canhBao) r.canh.push(ten+' · '+pbVT(k.ma)+': '+k.canhBao); });
      r.dl.push(d); });
    return r; });
}
function pb07Mo(tatCa){
  batChay(false, 'Đang dựng Biểu 07…');
  pb07Gom(tatCa).then(function(r){ tatChay();
    if(!r.dl.length) return baoLoi('Chưa xuất được Biểu 07 — chưa khớp QĐ (QT-16):\n'+r.bo.join('\n'));
    var am = r.dl.filter(function(d){ return d.coAm.length; });
    if(am.length && !confirm('Có ấp chỉ tiêu năm ÂM ('+am.map(function(d){ return d.dv.thuong+' — CT '+d.coAm.join(', '); }).join('; ')+'). Vẫn xuất Biểu 07?')) return;
    PB07.dl = r.dl; PB07.bo = r.bo; PB07.canh = r.canh; PB07.K = pb07KBMoi(); PB07.kbMo = false;   /* khai báo riêng: bản nháp từ bản đã lưu — đóng hộp mà chưa 💾 Lưu = bỏ */
    var d0 = r.dl[0];
    moHop('<div class="hop-tit">📄 Biểu 07 — QĐ '+coChuHTML(d0.so)+' · '+pbNgay(d0.ngayQD)+' · '+(d0.nguon===2 ? 'ĐP' : 'TW')+' · '+r.dl.length+' xã</div><div id="pb07-dau"></div>'+
      '<iframe id="pb07-khung" class="to-khung" title="Xem trước Biểu 07"></iframe><div id="pb07-nut"></div>', true);
    pb07Ve();
  }, function(er){ tatChay(); baoLoi(er && er.message || String(er)); });
}
/* ---------- 3.301: ⚙ KHAI BÁO RIÊNG Biểu 07 (ô kiểu nền ô — js/mau/07pb.js PB07_O) · lưu KHO1 'pb' → ch.b07 = {cach, gt, co}; ✏ gõ trong lần làm (K.go) không lưu ---------- */
function pb07KBLuu0(){ var b = pbDL().ch.b07 || {}; return {cach:Object.assign({}, b.cach || {}), gt:Object.assign({}, b.gt || {}), co:pb07CoChu(b)}; }
function pb07KBMoi(){ var K = pb07KBLuu0(); K.go = {}; return K; }
function pb07KBChuan(K){ var t = function(o){ o = o || {}; return Object.keys(o).sort().filter(function(k){ return o[k]!=='' && o[k]!=null; }).map(function(k){ return k+'='+o[k]; }).join('|'); }; return t(K.cach)+'#'+t(K.gt)+'#'+pb07CoChu(K); }
function pb07KBDoi(){ return !!PB07.K && pb07KBChuan(PB07.K)!==pb07KBChuan(pb07KBLuu0()); }
function pb07KBLuu(){ var d = pbDL(), K = PB07.K; if(!K) return; d.ch.b07 = {cach:Object.assign({}, K.cach), gt:Object.assign({}, K.gt), co:pb07CoChu(K)}; pbGhi(d); bao('Đã lưu khai báo riêng Biểu 07.', 3); pb07Ve(); }
function pb07KBHuy(){ var go = (PB07.K || {}).go || {}; PB07.K = pb07KBLuu0(); PB07.K.go = go; pb07Ve(); }
function pb07ORow(x){   /* 1 dòng ô: tên · các cách · ô gõ (⌨ / ✏) · đang in · ↺ */
  var K = PB07.K, d0 = PB07.dl[0], c = pb07Cach(K, x.k), v = pb07GT(K, x.k, d0), o = '';
  if(c==='kb'){ var thay = pb07GT({cach:{}, gt:{}}, x.k, d0) || x.mau || '', gt = (K.gt || {})[x.k] || '';
    o = x.nhieu ? '<textarea class="gd-o gd-o-chu pb07-o" rows="2" data-lenh="pb.b07KG" data-su="change" data-k="'+x.k+'" placeholder="'+coChuHTML(thay)+'">'+coChuHTML(gt)+'</textarea>'
      : GD.o({loai:'chu', gt:gt, ph:thay || 'gõ chữ in', lenh:'pb.b07KG', du:{k:x.k}}); }
  else if(c==='go') o = GD.o({loai:x.ngay ? 'ngay' : 'chu', gt:x.ngay ? pbNgay((K.go || {})[x.k]) : (K.go || {})[x.k] || '', ph:x.ngay ? 'gõ liền số' : 'gõ trong lần làm', lenh:'pb.b07KG', du:{k:x.k}});
  var inRa = x.ngay ? pbNgay(v) : String(v).replace(/\n/g, ' / ');
  return '<div class="pb07-dong"><span class="pb07-ten">'+coChuHTML(x.n)+'</span>'+x.ds.map(function(cc){ var t = PB07_CACH[cc];
      return GD.chip(t[0]+' '+t[1].split(/ — | \(/)[0], c===cc, 'pb.b07KC', {k:x.k, v:cc}, t[1]+(cc==='tu' && x.tu ? ': '+x.tu : '')); }).join('')+o+
    '<small class="pb07-in">→ '+(inRa ? coChuHTML(inRa) : '<i>'+(x.k==='nguoiKy' ? 'để trống ký tay' : 'chấm ghi tay')+'</i>')+'</small>'+
    GD.nut({chu:'↺', lenh:'pb.b07KM', du:{k:x.k}, tit:'Ô này về mặc định ('+PB07_CACH[x.md][1]+')', lop:'pb-nho'})+'</div>';
}
function pb07KBHTML(){ var K = PB07.K, doi = pb07KBDoi();
  return '<div class="pb07-kb"><div class="th-nhom-ten"><b>⚙ Khai báo riêng — Biểu 07</b> <small>chỉ mẫu này dùng; ⚙ chung = ⚙ Khai báo đơn vị › PGD</small></div>'+
    PB07_O.map(pb07ORow).join('')+
    '<div class="pb07-dong"><span class="pb07-ten">Cỡ chữ thân</span>'+PB07_CO.map(function(v){ return GD.chip(String(v).replace('.', ','), pb07CoChu(K)===v, 'pb.b07Co', {v:v}); }).join('')+'</div>'+
    GD.hang([GD.nut({chu:'💾 Lưu', lenh:'pb.b07KLuu', chinh:1, tat:!doi, tit:'Lưu khai báo riêng (đồng bộ Drive)'}), GD.nut({chu:'✕ Hủy', lenh:'pb.b07KHuy', tat:!doi, tit:'Trả lại như lần lưu trước'}),
      doi ? '<span class="vang">● chưa lưu — đóng hộp là bỏ</span>' : '<span class="sl-phu">đã lưu</span>'])+'</div>'; }
function pb07Ve(){
  var dau = document.getElementById('pb07-dau'); if(!dau || !PB07.dl.length) return;
  var K = PB07.K || (PB07.K = pb07KBMoi()), ten = pb07Ten(PB07.dl);
  dau.innerHTML = GD.hang([GD.nut({chu:'⚙ Khai báo riêng'+(pb07KBDoi() ? ' ●' : ''), lenh:'pb.b07KB', lop:PB07.kbMo ? 'bat' : '', tit:'Nơi lập, tỉnh, số / ngày thông báo, chức danh ký, người ký, nơi nhận, cỡ chữ — riêng Biểu 07'})])+
    (PB07.kbMo ? pb07KBHTML() : '<div class="pb07-kb pb07-gon">'+pb07ORow(pb07OK('ngayTB'))+'</div>')+
    '<div class="sl-phu">'+PB07.dl.map(function(d){ return coChuHTML(d.dv.thuong)+' ('+d.ap.length+' '+d.dv.apKp+')'; }).join(' · ')+'</div>'+
    (PB07.bo.length ? '<div class="sl-bao do">✗ Bỏ qua (chưa khớp QĐ):<br>'+PB07.bo.map(coChuHTML).join('<br>')+'</div>' : '')+
    (PB07.canh.length ? '<div class="sl-bao vang">⚠ '+PB07.canh.map(coChuHTML).join('<br>⚠ ')+'</div>' : '');
  PB07.x = pb07Trang(PB07.dl, K, ten); PB07.x.ten = ten;
  var n = document.getElementById('pb07-nut'); if(n) n.innerHTML = xuatHang({ten:ten, html:function(){ return PB07.x.trang; }, word:'pb07Word()'});
  xemChuan(document.getElementById('pb07-khung'), PB07.x.trang);
}
function pb07Word(){ var x = PB07.x; if(!x) return;
  hsoDocx({ds:x.ds}).then(function(bl){ giaoFile(bl, x.ten+'.docx'); bao('Đã tạo '+x.ten+'.docx', 5); }).catch(function(er){ baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }

/* ---------- 3.301: 🔎 ĐỐI CHIẾU CHÉO (pbDoiChieu ở js/47) — cột phải; cấp xã (cấp ấp chờ cách chia 3) ----------
   Biểu 07 không lưu → tính lại theo cách chia đang chọn (xã đang xem giữ bảng sửa tay). Dư nợ THỰC TẾ (Mẫu 31 kỳ mới nhất trong năm) chỉ hiện chênh so Đến 31/12 — không tính là lỗi (anh 21/10). */
function pbDCNam(){ var n = {}; pbDL().qd.forEach(function(q){ var y = String(q.ngay || '').slice(0, 4); if(y) n[y] = 1; }); return Object.keys(n).sort().reverse(); }
function pbDCTong(Dn, xa, ma, nv){ if(!Dn) return null; var s = 0; Dn.ds.forEach(function(r){ if(r.xa===xa && r.ct===ma && +r.nguon===+nv) s += r.dn; }); return s/1e6; }
function pbDCTinh(nam){
  var cd = pbCheDo(), ch = pbDL().ch, dsKy = pbDsKyCX(), q0 = pbQDChon(), kyDau = (+nam-1)+'-12';
  var kyTT = dsKy.filter(function(k){ return String(k).slice(0, 4)===String(nam); }).sort().pop() || '';
  var r = pbDoiChieu(pbDL().qd, nam, function(q){
      var xaO = PB.xa[q.xa]; if(!q.xa || !xaO || !xaO.ap.length) return null;
      if(q0 && q.id===q0.id && PB.kq && PB.kqLuc===pbKhoaKQ(q0, cd)) return PB.kq;
      var ky = cd==='cx' ? pbChonKy(dsKy, q.ngay, '') : null, Dn = ky ? PB.dn[ky.ky] : null;
      return pbPhanBo(q, {cheDo:cd, ap:xaO.ap, duNo:Dn ? pbDuNoXa(Dn, q.xa) : null, ch:ch}); },
    function(xa, ma, nv){ return pbDCTong(PB.dn[kyDau], xa, ma, nv); }, ch.nguongLech);
  r.kyDau = PB.dn[kyDau] ? kyDau : ''; r.kyTT = PB.dn[kyTT] ? kyTT : '';
  r.dong.forEach(function(g){ g.thucTe = r.kyTT ? pbDCTong(PB.dn[r.kyTT], g.xa, g.ma, g.nguon) : null; });
  return r;
}
function pbDCBang(r, inRa){   /* inRa: bản in (không bấm dòng) */
  var dsG = PB.dc.chiLech && !inRa ? r.dong.filter(function(g){ return !g.ok; }) : r.dong;
  if(!dsG.length) return '<div class="sl-phu">'+(r.dong.length ? 'Không có nhóm nào lệch.' : 'Năm '+r.nam+' chưa có QĐ.')+'</div>';
  return dsG.map(function(g){
    var tr = function(noi, lop, du){ return '<tr class="'+(lop || '')+'"'+(du && !inRa ? ' data-lenh="pb.dcMo" data-k="'+coChuHTML(du.k)+'" data-xa="'+coChuHTML(du.xa)+'" title="Mở QĐ này để phân bổ / xem Biểu 07"' : '')+'>'+noi+'</tr>'; };
    var kl = function(ok, chu){ return '<td>'+(ok ? '<span class="xanh">✓ '+(chu || 'Khớp')+'</span>' : '<span class="do">✗ '+coChuHTML(chu || 'Lệch')+'</span>')+'</td>'; };
    var h = '';
    if(g.dau.duNo!=null) h += tr('<td><i>Dư nợ 31/12/'+(+r.nam-1)+'</i></td><td class="so">'+pbSoVN(g.dau.duNo)+'</td><td></td><td></td><td><small>Đã giao QĐ đầu năm '+pbSoVN(g.dau.daGiao)+'</small></td>'+
      kl(g.dau.ok, g.dau.ok ? (g.dau.lech ? 'Khớp (lệch '+pbSoDau(g.dau.lech)+' ≤ ngưỡng)' : 'Khớp') : 'Đầu năm: Đã giao lệch dư nợ '+pbSoDau(g.dau.lech)), g.dau.ok ? 'pb-mo' : 'pb-loi');
    g.ds.forEach(function(x){ var b = x.b07;
      h += tr('<td>QĐ <b>'+coChuHTML(x.q.so)+'</b> · '+pbNgay(x.q.ngay)+(pbLaGiaoMoi(x.q) ? ' · giao mới' : '')+'</td><td class="so">'+(x.daGiao!=null ? pbSoVN(x.daGiao) : '')+'</td><td class="so">'+pbSoDau(x.tangGiam)+'</td><td class="so">'+(x.den!=null ? pbSoVN(x.den) : '')+'</td>'+
        '<td class="so">'+(!b ? '<small>không phân bổ</small>' : b.chua ? '<small class="vang">chưa có ấp</small>' : pbSoVN(b.truoc)+' '+pbSoDau(b.dc)+' → '+pbSoVN(b.nam))+'</td>'+kl(x.ok, x.ok ? '' : x.lyDo.join(' · ')),
        x.ok ? '' : 'pb-loi', {k:pbKhoa(x.q), xa:x.q.xa}); });
    h += tr('<td><i>Cả năm</i></td><td class="so">'+pbSoVN(pbR(g.cuoi.tinh-g.cuoi.tongTG))+'</td><td class="so">'+pbSoDau(g.cuoi.tongTG)+'</td><td class="so">'+pbSoVN(g.cuoi.den)+'</td><td><small>Đã giao đầu + Σ tăng/giảm = '+pbSoVN(g.cuoi.tinh)+'</small></td>'+
      kl(g.cuoi.ok, g.cuoi.ok ? 'Khớp Đến 31/12 QĐ cuối' : 'Chuỗi '+pbSoVN(g.cuoi.tinh)+' ≠ Đến 31/12 QĐ cuối '+pbSoVN(g.cuoi.den)), g.cuoi.ok ? 'tong' : 'tong pb-loi');
    if(g.thucTe!=null){ var tt = Math.round(g.thucTe), chl = pbR(tt - g.cuoi.den);
      h += tr('<td><i>Thực tế '+coChuHTML(slKyChu(r.kyTT))+'</i></td><td></td><td></td><td class="so">'+pbSoVN(tt)+'</td><td><small>so Đến 31/12: '+pbSoDau(chl)+(g.cuoi.den ? ' · đạt '+Math.round(tt/g.cuoi.den*1000)/10+' %' : '')+'</small></td><td><small>tham khảo</small></td>', 'pb-mo pb-tt2'); }
    return '<div class="pb-dc-nhom'+(g.ok ? '' : ' pb-loi')+'"><div class="th-nhom-ten"><b>'+coChuHTML(g.tenXa)+' · '+coChuHTML(pbVT(g.ma))+' ('+g.ma+') · '+pbNguonChu(g.nguon)+'</b> '+(g.ok ? '<span class="xanh">✓</span>' : '<span class="do">✗ lệch</span>')+'</div>'+
      '<div class="to-bang-cuon"><table class="to-bang luoi pb-dc2"><thead><tr><th>QĐ</th><th>Đã giao</th><th>Tăng/giảm</th><th>Đến 31/12</th><th>Biểu 07: Trước ± → Năm</th><th>Đối chiếu</th></tr></thead><tbody>'+h+'</tbody></table></div></div>'; }).join('');
}
function pbDCVe(){
  var o = document.getElementById('pb-phai'); if(!o) return;
  var dsN = pbDCNam(), dau = '<div class="th-nhom-ten"><b>🔎 Đối chiếu chéo</b></div>';
  if(!dsN.length){ o.innerHTML = dau+'<div class="sl-phu">Chưa có QĐ để đối chiếu.</div>'; return; }
  var nam = dsN.indexOf(PB.dc.nam)>=0 ? PB.dc.nam : dsN[0], cd = pbCheDo(), dsKy = pbDsKyCX(), can = {}; PB.dc.nam = nam;
  if(cd==='cx') pbDL().qd.forEach(function(q){ if(String(q.ngay).slice(0, 4)!==nam) return; var k = pbChonKy(dsKy, q.ngay, ''); if(k) can[k.ky] = 1; });
  var kyDau = (+nam-1)+'-12'; if(dsKy.indexOf(kyDau)>=0) can[kyDau] = 1;
  var kyTT = dsKy.filter(function(k){ return String(k).slice(0, 4)===nam; }).sort().pop(); if(kyTT) can[kyTT] = 1;
  var thieu = Object.keys(can).filter(function(k){ return !PB.dn[k] && !PB.dc.daDoc[k]; });
  if(thieu.length){ o.innerHTML = dau+'<div class="sl-phu">Đang đọc dư nợ Mẫu 31 ('+thieu.map(slKyChu).join(', ')+')…</div>';
    thieu.forEach(function(k){ PB.dc.daDoc[k] = 1; });
    Promise.all(thieu.map(function(k){ return pbDuNo(k).catch(function(){ return null; }); })).then(function(){ if(PB.che==='dc') pbDCVe(); }); return; }
  var r = pbDCTinh(nam), t = r.tong, ng = pbDL().ch.nguongLech; PB.dc.r = r;
  o.innerHTML = dau+GD.hang([GD.kv('Năm', '<select data-lenh="pb.dcNam" data-su="change">'+dsN.map(function(n){ return '<option'+(n===nam ? ' selected' : '')+'>'+n+'</option>'; }).join('')+'</select>'),
      GD.chip('Tương đối', cd==='td', 'pb.cheDo', {v:'td'}, 'Biểu 07 tính lại theo cách chia đều'), GD.chip('Chính xác', cd==='cx', 'pb.cheDo', {v:'cx'}, 'Biểu 07 tính lại theo dư nợ Mẫu 31 cuối tháng trước từng QĐ'),
      GD.chip('Chỉ nhóm lệch', PB.dc.chiLech, 'pb.dcLech', {}, 'Ẩn các nhóm xã · CT · nguồn đã khớp')])+
    '<div class="pb-kpi">'+pbDBThe('Nhóm xã · CT · nguồn', String(t.nhom), t.dong+' lượt QĐ năm '+nam)+pbDBThe('Khớp', String(t.nhom-t.loi), 'đủ 4 điều kiện', t.nhom ? Math.round((t.nhom-t.loi)/t.nhom*1000)/10 : null)+
      pbDBThe('Lệch', String(t.loi), t.loi ? 'xem dòng đỏ bên dưới' : 'không có')+pbDBThe('Đầu năm so dư nợ', r.kyDau ? slKyChu(r.kyDau) : '—', r.kyDau ? 'Mẫu 31 kỳ 12 năm trước' : 'chưa nạp Mẫu 31 kỳ 12/'+(+nam-1))+'</div>'+
    '<div class="sl-bao '+(t.loi ? 'do' : 'xanh')+' pb-dc-tom">'+(t.loi ? '✗ '+t.loi+' / '+t.nhom+' nhóm (xã · CT · nguồn) có lệch' : '✓ Cả '+t.nhom+' nhóm (xã · CT · nguồn) khớp')+' · '+t.dong+' lượt QĐ năm '+nam+
      '<br><small>Mỗi QĐ: Đã giao + Tăng/giảm = Đến 31/12 · Biểu 07: Σ tăng/giảm = số giao, Σ chỉ tiêu năm = Đến 31/12, Σ chỉ tiêu trước = Đã giao · chuỗi: Đã giao = Đến 31/12 QĐ trước'+
      (r.kyDau ? ' · đầu năm so dư nợ '+slKyChu(r.kyDau) : ' · <i>chưa có Mẫu 31 kỳ 12/'+(+nam-1)+' để so đầu năm</i>')+(r.kyTT ? ' · thực tế '+slKyChu(r.kyTT)+' chỉ để tham khảo' : '')+'. Ngưỡng chuỗi ±'+pbSoVN(ng!=null && ng!=='' ? +ng : 1)+' tr.</small></div>'+
    xuatHang({ten:xuatTen('Doi chieu phan bo KH', 'Nam '+nam, ''), html:pbDCIn, dong:'pbDCDong()', dongChu:'‹ Về phân bổ'})+
    '<div id="pb-dc">'+pbDCBang(r)+'</div>';
}
var PB_DC_CSS = '<style>@page{size:A4 landscape;margin:12mm}body{font-family:"Times New Roman",serif;font-size:11pt}table{border-collapse:collapse;width:100%;margin-bottom:6pt}td,th{border:.5pt solid #000;padding:1pt 3pt}.so{text-align:right}'+
  'tr.pb-loi td{background:#fde2e2;-webkit-print-color-adjust:exact;print-color-adjust:exact}.xanh{color:#060}.do{color:#b00}.th-nhom-ten{font-weight:bold;margin-top:6pt}.pb-dc-nhom{break-inside:avoid}</style>';
function pbDCIn(){ var r = PB.dc.r; if(!r) return '';
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Doi chieu phan bo KH nam '+r.nam+'</title>'+PB_DC_CSS+'</head><body>'+
    '<h3 style="text-align:center;margin:0 0 6pt">ĐỐI CHIẾU CHÉO PHÂN BỔ KẾ HOẠCH NĂM '+r.nam+'</h3><p>'+(r.tong.loi ? r.tong.loi+' / '+r.tong.nhom+' nhóm có lệch' : 'Cả '+r.tong.nhom+' nhóm khớp')+' · '+r.tong.dong+' lượt QĐ · đơn vị: triệu đồng</p>'+pbDCBang(r, true)+'</body></html>'; }
function pbDCDong(){ PB.che = ''; pbVeTrai(); pbVePhai(); }

/* ---------- 3.301: 📈 DIỄN BIẾN PHÂN VỐN THEO KH (pbDienBien ở js/47) — thẻ số · biểu đồ SVG (KH hiệu lực bậc thang ↔ dư nợ Mẫu 31) · dòng thời gian QĐ · bảng xã (bấm → chi tiết CT · nguồn · từng QĐ)
   Chỉ đọc QĐ + Mẫu 31 chung; dư nợ thực tế để theo dõi, không bắt khớp. Cấp xã · CT · nguồn (cấp ấp chờ cách chia 3). */
function pbDBKyNam(nam){ return pbDsKyCX().filter(function(k){ return String(k).slice(0, 4)===String(nam); }).sort(); }
function pbDBTinh(){
  var D = PB.db, kyDau = (+D.nam-1)+'-12', f = function(Dn){ return function(xa, ma, nv){ return pbDCTong(Dn, xa, ma, nv); }; };
  return pbDienBien(pbDL().qd, D.nam, {xa:D.xa, nguon:+D.nguon, ct:D.ct}, {dau:PB.dn[kyDau] ? f(PB.dn[kyDau]) : null, kyDau:PB.dn[kyDau] ? kyDau : '',
    thang:pbDBKyNam(D.nam).filter(function(k){ return PB.dn[k]; }).map(function(k){ return {ky:k, f:f(PB.dn[k])}; })});
}
function pbDBSo(v){ return v==null ? '—' : pbSoVN(Math.round(v)); }
function pbDBMuc(p){ return p==null ? '' : p>=98 ? 'tot' : p>=92 ? '' : 'cham'; }   /* thanh tiến độ: ≥ 98 % xanh lục · < 92 % vàng (xã chậm) */
function pbDBThanh(p){ return p==null ? '<small class="sl-phu">chưa có Mẫu 31</small>' : '<div class="pb-tien '+pbDBMuc(p)+'"><i style="width:'+Math.max(0, Math.min(100, p))+'%"></i></div><small>'+String(p).replace('.', ',')+' %</small>'; }
function pbDBThe(nhan, so, phu, p){ return '<div class="pb-the"><span>'+nhan+'</span><b>'+so+'</b>'+(p!==undefined ? pbDBThanh(p) : '')+'<small>'+phu+'</small></div>'; }
function pbDBSVG(th){
  var ds = th.filter(function(t){ return t.kh!=null || t.dn!=null; }); if(!ds.length) return '<div class="sl-phu">Chưa có Mẫu 31 kỳ nào trong năm để vẽ tiến độ — nạp ở 📥 Nạp &amp; KT.</div>';
  var W = 640, H = 220, L = 62, R = 14, T = 12, B = 28, vs = [];
  ds.forEach(function(t){ if(t.kh!=null) vs.push(t.kh); if(t.dn!=null) vs.push(t.dn); });
  var mn = Math.min.apply(null, vs), mx = Math.max.apply(null, vs), pad = (mx-mn)*0.15 || Math.max(1, Math.abs(mx)*0.05); mn -= pad; mx += pad;
  var n = ds.length, x = function(i){ return n===1 ? (L+W-R)/2 : L+i*(W-L-R)/(n-1); }, y = function(v){ return T+(mx-v)/(mx-mn)*(H-T-B); }, f1 = function(v){ return v.toFixed(1); };
  var s = '<svg class="pb-db-svg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="KH hiệu lực và dư nợ thực tế từng tháng">';
  for(var i=0;i<=4;i++){ var v = mn+(mx-mn)*i/4, yy = f1(y(v)); s += '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yy+'" y2="'+yy+'" class="pb-db-luoi"/><text x="'+(L-6)+'" y="'+f1(y(v)+4)+'" text-anchor="end" class="pb-db-truc">'+pbSoVN(Math.round(v))+'</text>'; }
  ds.forEach(function(t, i){ s += '<text x="'+f1(x(i))+'" y="'+(H-8)+'" text-anchor="middle" class="pb-db-truc">'+(t.dau ? '31/12' : 'T'+(+String(t.ky).slice(5, 7)))+'</text>'; });
  var P = []; ds.forEach(function(t, i){ if(t.dn!=null) P.push([x(i), y(t.dn)]); });
  if(P.length){ var ln = P.map(function(p, i){ return (i ? 'L' : 'M')+f1(p[0])+' '+f1(p[1]); }).join(' ');
    s += '<path d="'+ln+' L'+f1(P[P.length-1][0])+' '+(H-B)+' L'+f1(P[0][0])+' '+(H-B)+' Z" class="pb-db-vung"/><path d="'+ln+'" class="pb-db-dn"/>'; }
  var kp = ''; ds.forEach(function(t, i){ if(t.kh==null) return; kp += kp ? ' H'+f1(x(i))+' V'+f1(y(t.kh)) : 'M'+f1(x(i))+' '+f1(y(t.kh)); });
  if(kp) s += '<path d="'+kp+'" class="pb-db-kh"/>';
  ds.forEach(function(t, i){ var nh = t.dau ? '31/12/'+String(t.ky).slice(0, 4) : slKyChu(t.ky), tt = nh+(t.kh!=null ? ' · KH '+pbSoVN(t.kh) : '')+(t.dn!=null ? ' · dư nợ '+pbSoVN(t.dn) : '')+(t.dn!=null && t.kh ? ' · đạt '+String(Math.round(t.dn/t.kh*1000)/10).replace('.', ',')+' %' : '');
    if(t.dn!=null) s += '<circle cx="'+f1(x(i))+'" cy="'+f1(y(t.dn))+'" r="4.5" class="pb-db-diem"><title>'+coChuHTML(tt)+'</title></circle>';
    if(t.kh!=null) s += '<circle cx="'+f1(x(i))+'" cy="'+f1(y(t.kh))+'" r="3" class="pb-db-diem-kh"><title>'+coChuHTML(tt)+'</title></circle>'; });
  return s+'</svg>';
}
function pbDBMoc(r){
  var nut = function(ten, phu, so, tg, lop){ return '<div class="pb-db-nut '+(lop || '')+'"><div class="pb-db-chip '+(tg>0 ? 'tang' : tg<0 ? 'giam' : 'rong')+'">'+(tg ? (tg>0 ? '▲ +' : '▼ −')+pbSoVN(Math.abs(tg)) : '&nbsp;')+'</div><i></i><b>'+pbDBSo(so)+'</b><span>'+coChuHTML(ten)+'</span><small>'+coChuHTML(phu)+'</small></div>'; };
  if(!r.moc.length) return '';
  return '<div class="pb-db-moc">'+nut('Đầu năm', 'Đã giao QĐ đầu', r.tong.dgDau, 0, 'mo-dau')+r.moc.map(function(m, i){
    return '<span class="pb-db-noi"></span>'+nut('QĐ '+m.so, pbNgay(m.ngay).slice(0, 5)+(m.soXa>1 ? ' · '+m.soXa+' xã' : ''), m.kh, m.tg, i===r.moc.length-1 ? 'cuoi' : ''); }).join('')+'</div>';
}
function pbDBChiTiet(t, inRa){   /* 1 xã: CT · nguồn × (dư nợ đầu năm · từng QĐ · KH cuối · hiện tại · còn TH · %) */
  var qd = [], co = {}; t.nhom.forEach(function(n){ n.ds.forEach(function(x){ var k = pbKhoaQDChung(x.q); if(!co[k]){ co[k] = 1; qd.push(x.q); } }); });
  qd.sort(function(a, b){ return a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : 0; });
  return '<div class="to-bang-cuon"><table class="to-bang luoi pb-db-ct"><thead><tr><th>Chương trình · nguồn</th><th>Dư nợ 31/12</th><th>Đã giao đầu</th>'+qd.map(function(q){ return '<th>QĐ '+coChuHTML(q.so)+'<br><small>'+pbNgay(q.ngay).slice(0, 5)+'</small></th>'; }).join('')+
    '<th>KH cuối năm</th><th>Hiện tại</th><th>Còn phải TH</th><th>Tiến độ</th></tr></thead><tbody>'+t.nhom.map(function(n){
      return '<tr><td>'+coChuHTML(pbVT(n.ma))+' ('+n.ma+') · '+pbNguonChu(n.nguon)+'</td><td class="so">'+pbDBSo(n.dauNam)+'</td><td class="so">'+pbDBSo(n.dgDau)+'</td>'+qd.map(function(q){
          var x = n.ds.filter(function(y){ return pbKhoaQDChung(y.q)===pbKhoaQDChung(q); })[0]; return '<td class="so">'+(x ? '<span class="'+(x.tangGiam>0 ? 'xanh' : x.tangGiam<0 ? 'do' : '')+'">'+pbSoDau(x.tangGiam)+'</span> → '+pbDBSo(x.denT) : '')+'</td>'; }).join('')+
        '<td class="so"><b>'+pbDBSo(n.khCuoi)+'</b></td><td class="so">'+pbDBSo(n.hienTai)+'</td><td class="so">'+pbDBSo(n.conTH)+'</td><td class="pb-db-td">'+(inRa ? (n.pct==null ? '' : String(n.pct).replace('.', ',')+' %') : pbDBThanh(n.pct))+'</td></tr>'; }).join('')+'</tbody></table></div>';
}
function pbDBXa(r, inRa){
  var t = r.tong;
  return '<div class="to-bang-cuon"><table class="to-bang luoi pb-db-xa"><thead><tr><th>Xã / phường</th><th>Đã giao đầu</th><th>± trong năm</th><th>KH cuối năm</th><th>Hiện tại</th><th>Còn phải TH</th><th class="pb-db-td">Tiến độ</th></tr></thead><tbody>'+
    r.theoXa.map(function(x){ var mo = inRa || PB.db.moXa===x.xa;
      return '<tr class="'+(pbDBMuc(x.pct)==='cham' ? 'pb-cham ' : '')+(mo ? 'mo' : '')+'"'+(inRa ? '' : ' data-lenh="pb.dbXa" data-xa="'+coChuHTML(x.xa)+'" title="Bấm xem chi tiết từng chương trình, từng QĐ"')+'><td><b>'+(inRa ? '' : (mo ? '▾ ' : '▸ '))+coChuHTML(x.tenXa)+'</b> <small>'+x.nhom.length+' CT · nguồn</small></td>'+
        '<td class="so">'+pbDBSo(x.dgDau)+'</td><td class="so">'+(x.tongTG ? pbSoDau(x.tongTG) : '0')+'</td><td class="so"><b>'+pbDBSo(x.khCuoi)+'</b></td><td class="so">'+pbDBSo(x.hienTai)+'</td><td class="so">'+pbDBSo(x.conTH)+'</td><td class="pb-db-td">'+(inRa ? (x.pct==null ? '' : String(x.pct).replace('.', ',')+' %') : pbDBThanh(x.pct))+'</td></tr>'+
        (mo ? '<tr class="pb-db-mo"><td colspan="7">'+pbDBChiTiet(x, inRa)+'</td></tr>' : ''); }).join('')+
    '<tr class="tong"><td>Cộng '+r.theoXa.length+' xã</td><td class="so">'+pbDBSo(t.dgDau)+'</td><td class="so">'+(t.tongTG ? pbSoDau(t.tongTG) : '0')+'</td><td class="so">'+pbDBSo(t.khCuoi)+'</td>'+
      '<td class="so">'+pbDBSo(t.hienTai)+'</td><td class="so">'+pbDBSo(t.conTH)+'</td><td class="pb-db-td">'+(inRa ? (t.pct==null ? '' : String(t.pct).replace('.', ',')+' %') : pbDBThanh(t.pct))+'</td></tr></tbody></table></div>';
}
function pbDBNoi(r){   /* phần thân dùng chung màn hình / bản in */
  var t = r.tong, kyTT = r.thang.length ? r.thang[r.thang.length-1] : null;
  return '<div class="pb-kpi">'+pbDBThe('Dư nợ đầu năm', pbDBSo(t.dauNam), t.dauNam==null ? 'chưa có Mẫu 31 kỳ 12/'+(+r.nam-1) : '31/12/'+(+r.nam-1))+
      pbDBThe('KH cuối năm', pbDBSo(t.khCuoi), (t.tongTG>=0 ? '+' : '')+pbSoVN(t.tongTG || 0)+' qua '+t.soQD+' QĐ · đã giao đầu '+pbDBSo(t.dgDau))+
      pbDBThe('Dư nợ hiện tại', pbDBSo(t.hienTai), kyTT && !kyTT.dau ? 'Mẫu 31 '+slKyChu(kyTT.ky) : 'chưa có Mẫu 31 trong năm')+
      pbDBThe('Còn phải thực hiện', pbDBSo(t.conTH), 'KH cuối năm − dư nợ hiện tại', t.pct)+'</div>'+
    '<div class="pb-db-chu"><span><i class="pb-db-l kh"></i>KH hiệu lực (Đến 31/12 theo QĐ)</span><span><i class="pb-db-l dn"></i>Dư nợ thực tế (Mẫu 31)</span><small>triệu đồng · rê chuột vào điểm để xem số</small></div>'+
    '<div class="pb-db-bd">'+pbDBSVG(r.thang)+'</div>'+pbDBMoc(r);
}
function pbDBVe(){
  var o = document.getElementById('pb-phai'); if(!o) return;
  var dsN = pbDCNam(), D = PB.db, dau = '<div class="th-nhom-ten"><b>📈 Diễn biến phân vốn theo KH</b></div>';
  if(!dsN.length){ o.innerHTML = dau+'<div class="sl-phu">Chưa có QĐ — nhập QĐ hoặc 📥 nhập từ bản WPF.</div>'; return; }
  D.nam = dsN.indexOf(D.nam)>=0 ? D.nam : dsN[0];
  var can = {}, kyDau = (+D.nam-1)+'-12'; if(pbDsKyCX().indexOf(kyDau)>=0) can[kyDau] = 1; pbDBKyNam(D.nam).forEach(function(k){ can[k] = 1; });
  var thieu = Object.keys(can).filter(function(k){ return !PB.dn[k] && !PB.dc.daDoc[k]; });
  if(thieu.length){ o.innerHTML = dau+'<div class="sl-phu">Đang đọc dư nợ Mẫu 31 ('+thieu.map(slKyChu).join(', ')+')…</div>'; thieu.forEach(function(k){ PB.dc.daDoc[k] = 1; });
    Promise.all(thieu.map(function(k){ return pbDuNo(k).catch(function(){ return null; }); })).then(function(){ if(PB.che==='db') pbDBVe(); }); return; }
  var qN = pbDL().qd.filter(function(q){ return String(q.ngay).slice(0, 4)===D.nam; }), xaL = {}, ctL = {};
  qN.forEach(function(q){ xaL[q.xa] = q.tenXa || q.xa; (q.ct || []).forEach(function(c){ ctL[c.ma] = 1; }); });
  var r = pbDBTinh(); PB.db.r = r;
  var sel = function(f, ds, v){ return '<select data-lenh="pb.dbLoc" data-su="change" data-f="'+f+'">'+ds.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(String(x[0])===String(v) ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'; };
  o.innerHTML = dau+'<div class="gd-hang pb-db-loc">'+sel('nam', dsN.map(function(n){ return [n, 'Năm '+n]; }), D.nam)+
      sel('xa', [['', 'Tất cả xã']].concat(Object.keys(xaL).sort(function(a, b){ return String(xaL[a]).localeCompare(String(xaL[b]), 'vi'); }).map(function(k){ return [k, xaL[k]]; })), D.xa)+
      sel('nguon', [[0, 'Cả 2 nguồn'], [1, 'Nguồn TW'], [2, 'Nguồn ĐP']], D.nguon)+
      sel('ct', [['', 'Tất cả chương trình']].concat(Object.keys(ctL).sort().map(function(m){ return [m, pbVT(m)+' ('+m+')']; })), D.ct)+'</div>'+
    (r.nhom.length ? pbDBNoi(r)+xuatHang({ten:xuatTen('Dien bien phan von KH', 'Nam '+D.nam+(D.xa ? ' '+xaL[D.xa] : ''), ''), html:pbDBIn, excel:'pbDBExcel()', dong:'pbDCDong()', dongChu:'‹ Về phân bổ'})+'<div id="pb-db-xa">'+pbDBXa(r)+'</div>'
      : '<div class="sl-phu">Không có QĐ khớp bộ lọc.</div>');
}
var PB_DB_CSS = '.pb-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:6px 0}.pb-the{border:1px solid #ccc;border-radius:8px;padding:6px 8px}.pb-the span,.pb-the small{display:block;color:#555;font-size:9pt}.pb-the b{font-size:15pt}'+
  '.pb-tien{height:5px;background:#e3e3e3;border-radius:3px}.pb-tien i{display:block;height:5px;background:#2a78d6;border-radius:3px}.pb-db-svg{width:100%;height:auto;max-height:70mm}.pb-db-luoi{stroke:#ddd}.pb-db-truc{fill:#555;font-size:10px}'+
  '.pb-db-vung{fill:rgba(42,120,214,.12)}.pb-db-dn{fill:none;stroke:#2a78d6;stroke-width:2}.pb-db-kh{fill:none;stroke:#eb6834;stroke-width:2;stroke-dasharray:6 4}.pb-db-diem{fill:#2a78d6}.pb-db-diem-kh{fill:#eb6834}'+
  '.pb-db-chu span{margin-right:14px;font-size:9pt}.pb-db-chu small{display:none}.pb-db-l{display:inline-block;width:14px;height:0;border-top:2px solid #2a78d6;margin-right:4px;vertical-align:middle}.pb-db-l.kh{border-top:2px dashed #eb6834}'+
  '.pb-db-moc{display:flex;flex-wrap:wrap;align-items:flex-start;margin:6px 0}.pb-db-nut{text-align:center;min-width:70px;font-size:9pt}.pb-db-nut b,.pb-db-nut span,.pb-db-nut small{display:block}.pb-db-nut i{display:none}.pb-db-noi{width:10px}.pb-db-chip.tang{color:#1a6e3f}.pb-db-chip.giam{color:#b42318}';
function pbDBIn(){ var r = PB.db.r; if(!r) return '';
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Dien bien phan von KH nam '+r.nam+'</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:"Times New Roman",serif;font-size:11pt}table{border-collapse:collapse;width:100%;margin-bottom:6pt}td,th{border:.5pt solid #000;padding:1pt 3pt}'+
    '.so{text-align:right}tr.tong td{font-weight:bold}.xanh{color:#1a6e3f}.do{color:#b42318}.to-bang-cuon{break-inside:avoid}'+PB_DB_CSS+'</style></head><body>'+
    '<h3 style="text-align:center;margin:0 0 6pt">DIỄN BIẾN PHÂN VỐN THEO KẾ HOẠCH NĂM '+r.nam+'</h3><p style="margin:0 0 4pt">Đơn vị: triệu đồng · '+r.tong.soNhom+' nhóm xã · chương trình · nguồn · '+r.tong.soQD+' QĐ</p>'+pbDBNoi(r)+pbDBXa(r, true)+'</body></html>'; }
function pbDBExcel(){
  var r = PB.db.r; if(!r) return;
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    if(!window.XLSX) throw new Error('Chưa tải được bộ Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new(), so = function(v){ return v==null ? '' : v; };
    var a1 = [['Xã / phường', 'Đã giao đầu', '± trong năm', 'KH cuối năm', 'Dư nợ hiện tại', 'Còn phải TH', '% đạt']].concat(r.theoXa.map(function(x){ return [x.tenXa, so(x.dgDau), so(x.tongTG), so(x.khCuoi), so(x.hienTai), so(x.conTH), so(x.pct)]; }))
      .concat([['Cộng', so(r.tong.dgDau), so(r.tong.tongTG), so(r.tong.khCuoi), so(r.tong.hienTai), so(r.tong.conTH), so(r.tong.pct)]]);
    var a2 = [['Xã / phường', 'Mã CT', 'Chương trình', 'Nguồn', 'Dư nợ 31/12 năm trước', 'Đã giao đầu', 'Diễn biến QĐ', 'KH cuối năm', 'Dư nợ hiện tại', 'Còn phải TH', '% đạt']].concat(r.nhom.map(function(n){
      return [n.tenXa, n.ma, pbTenCT(n.ma), pbNguonChu(n.nguon), so(n.dauNam), so(n.dgDau), n.ds.map(function(x){ return 'QĐ '+x.q.so+' '+pbNgay(x.q.ngay)+': '+pbSoDau(x.tangGiam)+' → '+pbSoVN(x.denT); }).join('; '), so(n.khCuoi), so(n.hienTai), so(n.conTH), so(n.pct)]; }));
    var a3 = [['Kỳ', 'KH hiệu lực', 'Dư nợ thực tế', 'Chênh (dư nợ − KH)', '% đạt']].concat(r.thang.map(function(t){
      return [t.dau ? '31/12/'+String(t.ky).slice(0, 4) : slKyChu(t.ky), so(t.kh), so(t.dn), t.kh!=null && t.dn!=null ? pbR(t.dn - t.kh) : '', t.kh && t.dn!=null ? Math.round(t.dn/t.kh*1000)/10 : '']; }));
    var a4 = [['QĐ', 'Ngày', 'Loại', 'Số xã', '± (triệu)', 'KH sau QĐ']].concat(r.moc.map(function(m){ return [m.so, pbNgay(m.ngay), m.loai, m.soXa, m.tg, so(m.kh)]; }));
    [['Theo xa', a1, [22, 12, 12, 13, 13, 12, 8]], ['Chi tiet', a2, [20, 7, 34, 7, 14, 12, 60, 12, 13, 12, 8]], ['Theo thang', a3, [14, 13, 13, 16, 8]], ['QD', a4, [10, 11, 12, 7, 11, 12]]].forEach(function(s){
      var ws = XLSX.utils.aoa_to_sheet(s[1]); ws['!cols'] = s[2].map(function(w){ return {wch:w}; }); XLSX.utils.book_append_sheet(wb, ws, s[0]); });
    var ten = xuatTen('Dien bien phan von KH', 'Nam '+r.nam, '')+'.xlsx', u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    giaoFile(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), ten); bao('Đã xuất '+ten, 5);
  }).catch(function(e){ baoLoi(e.message || String(e)); });
}

/* ---------- lệnh ---------- */
GD.dangKy('pb', {
  moi:function(){ pbMoQD(''); },
  sua:function(el){ pbMoQD(el.getAttribute('data-k')); },
  chon:function(el){ PB.chon = {khoa:el.getAttribute('data-k'), xa:el.getAttribute('data-xa')}; PB.kq = null; PB.che = ''; pbVeTrai(); pbVePhai(); },
  cheDo:function(el){ PB.cheDo = el.getAttribute('data-v'); PB.kq = null; pbVePhai(); },
  ky:function(el){ PB.kyCX = el.value; PB.kq = null; pbVePhai(); },
  chay:function(){ pbChay(); },
  suaTay:function(el){ var k = (PB.kq || [])[+el.getAttribute('data-ct')], v = pbDocSo(el.value); if(!k) return;
    if(v==null && String(el.value).trim()) return baoLoi('"'+el.value+'" không phải số — gõ ví dụ 300 hoặc -200 (triệu đồng).');
    pbSuaTay(k, +el.getAttribute('data-i'), v || 0); pbGiuO(function(){ var o = document.getElementById('pb-kq'), q = pbQDChon(); if(o && q) o.innerHTML = pbKQHTML(q, pbCheDo()); }); },
  nhapWPF:function(el){ pbNhapWPF(el); },
  dc:function(){ PB.che = PB.che==='dc' ? '' : 'dc'; pbVeTrai(); pbVePhai(); },
  db:function(){ PB.che = PB.che==='db' ? '' : 'db'; pbVeTrai(); pbVePhai(); },
  dbLoc:function(el){ var f = el.getAttribute('data-f'); PB.db[f] = f==='nguon' ? +el.value : el.value; if(f==='nam' || f==='xa') PB.db.moXa = PB.db.xa || ''; pbDBVe(); },
  dbXa:function(el){ var x = el.getAttribute('data-xa'); PB.db.moXa = PB.db.moXa===x ? '' : x; var o = document.getElementById('pb-db-xa'); if(o && PB.db.r) o.innerHTML = pbDBXa(PB.db.r); },
  dcDong:function(){ pbDCDong(); },
  dcNam:function(el){ PB.dc.nam = el.value; pbDCVe(); },
  dcLech:function(){ PB.dc.chiLech = !PB.dc.chiLech; pbDCVe(); },
  dcMo:function(el){ PB.chon = {khoa:el.getAttribute('data-k'), xa:el.getAttribute('data-xa')}; PB.kq = null; PB.che = ''; pbVeTrai(); pbVePhai(); pbChay(); },
  b07:function(){ pb07Mo(false); },
  b07Het:function(){ pb07Mo(true); },
  b07KB:function(){ PB07.kbMo = !PB07.kbMo; pb07Ve(); },
  b07KC:function(el){ var K = PB07.K, k = el.getAttribute('data-k'); if(!K) return; K.cach[k] = el.getAttribute('data-v'); pb07Ve(); },
  b07KG:function(el){ var K = PB07.K, k = el.getAttribute('data-k'), x = pb07OK(k); if(!K || !x) return;
    if(pb07Cach(K, k)==='go'){ var v = el.value;
      if(x.ngay){ v = typeof gdxDocNgay==='function' ? gdxDocNgay(el.value) : el.value; if(String(el.value).trim() && !v) return baoLoi('"'+el.value+'" không phải ngày — gõ liền số, vd 2192026 = 21/09/2026.'); }
      K.go[k] = v ? String(v).trim() : ''; }
    else K.gt[k] = String(el.value || '').replace(/\r/g, '').trim();
    pb07Ve(); },
  b07KM:function(el){ var K = PB07.K, k = el.getAttribute('data-k'); if(!K) return; delete K.cach[k]; delete K.gt[k]; delete K.go[k]; pb07Ve(); },
  b07Co:function(el){ if(!PB07.K) return; PB07.K.co = +el.getAttribute('data-v'); pb07Ve(); },
  b07KLuu:function(){ pb07KBLuu(); },
  b07KHuy:function(){ pb07KBHuy(); },
  fo:function(el){ var F = PB.F, f = el.getAttribute('data-f'); if(!F) return;
    if(f==='ngay'){ var n = typeof gdxDocNgay==='function' ? gdxDocNgay(el.value) : el.value; F.ngay = n || ''; el.value = n ? pbNgay(n) : ''; pbDuNoNamTruoc(); }
    else F[f] = f==='nguon' ? +el.value : el.value;
    F.doi = true; if(f==='ctChon') return; if(f==='ngay' || f==='nguon') pbGiuO(pbFBangVe); },
  fXa:function(el){ var F = PB.F, m = el.getAttribute('data-ma'); if(!F) return;
    if(el.checked){ F.xa[m] = (PB.xa[m] || {}).ten || F.xa[m] || m; Object.keys(F.dong.reduce(function(o, d){ o[d.ma] = 1; return o; }, {})).forEach(function(ma){
        if(!F.dong.some(function(d){ return d.xa===m && d.ma===ma; })) F.dong.push({xa:m, ma:ma, ten:pbTenCT(ma), daGiao:null, tangGiam:null, den3112:null, dgTu:true, denTu:true}); }); }
    else { var co = F.dong.filter(function(d){ return d.xa===m && (d.tangGiam!=null || d.den3112!=null); });
      if(co.length && !confirm('Bỏ '+(F.xa[m] || m)+' khỏi QĐ? '+co.length+' dòng đã nhập sẽ bị xóa.')){ el.checked = true; return; }
      delete F.xa[m]; F.dong = F.dong.filter(function(d){ return d.xa!==m; }); }
    F.doi = true; pbFVe(); },
  fThemCT:function(){ pbFThemCT(); },
  fSo:function(el){ var F = PB.F, d = F && F.dong[+el.getAttribute('data-i')], f = el.getAttribute('data-f'); if(!d) return;
    var v = pbDocSo(el.value); if(v==null && String(el.value).trim()) return baoLoi('"'+el.value+'" không phải số.');
    d[f] = v; if(f==='daGiao') d.dgTu = v==null; if(f==='den3112') d.denTu = v==null;   /* ô anh gõ tay → giữ; xóa trắng → trở lại tự động */
    F.doi = true; pbGiuO(pbFBangVe); },
  fBoDong:function(el){ var F = PB.F; if(!F) return; F.dong.splice(+el.getAttribute('data-i'), 1); F.doi = true; pbFVe(); },
  fLuu:function(){ pbFLuu(); },
  fBo:function(){ if(PB.F && PB.F.doi && !confirm('Bỏ các thay đổi chưa lưu?')) return; PB.F = null; dongHop(); },
  fXoa:function(){ pbFXoa(); }
});
/* Ctrl+Enter trong hộp QĐ = Lưu (QUY_CHUAN mục 11) */
document.addEventListener('keydown', function(ev){ if(ev.key==='Enter' && (ev.ctrlKey || ev.metaKey) && PB.F && document.getElementById('pb-f')){ ev.preventDefault(); var a = document.activeElement; if(a && a.blur) a.blur(); setTimeout(pbFLuu, 0); } });
