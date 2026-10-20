/* ===== P2 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 5): 🎯 PHÂN BỔ KH — GIAO DIỆN tab con trong 📈 Số liệu (tiền tố pb) =====
   - Chỉ VẼ + nhận lệnh (GD.dangKy('pb', …), data-lenh="pb.…"); mọi phép tính ở js/47-phan-bo.js; số liệu chung qua KHO (dsTo, duNoAp); lưu qua KHO1 ('pb').
   - Cột trái: danh sách QĐ (nhóm theo QĐ = số + ngày + ký hiệu, mỗi dòng 1 xã) · ＋ QĐ mới · 📥 Nhập file sao lưu QĐ của bản WPF.
   - Hộp QĐ (QT-17): tích nhiều xã (nhập trước vài xã, mở lại tích thêm) · thêm CT cho các xã đã tích · Đã giao gợi ý theo QĐ trước / dư nợ 31/12 · Đến 31/12 tự tính · Kiểm tra ✗ / ⚠.
   - Cột phải: chọn xã của QĐ · cách chia · kỳ dư nợ (chính xác) · ⚙ Phân bổ → đối chiếu từng CT (QT-16) + bảng ấp, SỬA TAY tăng/giảm (QT-15.6) → 👁 Biểu 07 xã đang xem · 📦 mọi xã của QĐ (3.289 P3, mẫu js/mau/07pb.js).
   - Lưu: KHO1.doc('pb') = {qd:[QĐ…], ch:{buocTD, buocCX, soApToiDa}} — mỗi xã 1 bản ghi QĐ (schema ở đầu js/47). */
var PB = {C:{ky:''}, K:null, xa:{}, dsXa:[], chon:{khoa:'', xa:''}, cheDo:'', kyCX:'', kq:null, kqLuc:'', dn:{}, F:null};
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
    GD.hang([GD.nut({chu:'＋ QĐ mới', lenh:'pb.moi', chinh:1, tit:'Nhập 1 QĐ cho 1 hoặc nhiều xã'}),
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
  return '<div class="sl-phu">'+coChuHTML(PB.kqMoTa || '')+'</div>'+
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
var PB07 = {dl:[], bo:[], canh:[], ngay:'tu', ngayGo:'', x:null};
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
    PB07.dl = r.dl; PB07.bo = r.bo; PB07.canh = r.canh; PB07.ngayGo = '';
    var d0 = r.dl[0];
    moHop('<div class="hop-tit">📄 Biểu 07 — QĐ '+coChuHTML(d0.so)+' · '+pbNgay(d0.ngayQD)+' · '+(d0.nguon===2 ? 'ĐP' : 'TW')+' · '+r.dl.length+' xã</div><div id="pb07-dau"></div>'+
      '<iframe id="pb07-khung" class="to-khung" title="Xem trước Biểu 07"></iframe><div id="pb07-nut"></div>', true);
    pb07Ve();
  }, function(er){ tatChay(); baoLoi(er && er.message || String(er)); });
}
function pb07TuyChon(){ var d0 = PB07.dl[0] || {};
  return {ngayTB:PB07.ngay==='cham' ? '' : PB07.ngay==='go' ? PB07.ngayGo : pbNgayTB(d0.ngayQD, pbDL().ch), noi:hsoPGD('noi'), tinh:hsoPGD('tinh')}; }
function pb07Ve(){
  var dau = document.getElementById('pb07-dau'); if(!dau || !PB07.dl.length) return;
  var o = pb07TuyChon(), tu = pbNgayTB(PB07.dl[0].ngayQD, pbDL().ch), ten = pb07Ten(PB07.dl);
  dau.innerHTML = GD.hang([GD.kv('Ngày thông báo', ''), GD.chip('Tự tính '+pbNgay(tu), PB07.ngay==='tu', 'pb.b07Cach', {v:'tu'}, 'Ngày QĐ + 1, né thứ 7 / CN (như bản WPF)'),
      GD.chip('Để chấm (ghi tay)', PB07.ngay==='cham', 'pb.b07Cach', {v:'cham'}), GD.chip('Gõ ngày', PB07.ngay==='go', 'pb.b07Cach', {v:'go'})]
      .concat(PB07.ngay==='go' ? [GD.o({loai:'ngay', gt:PB07.ngayGo ? pbNgay(PB07.ngayGo) : '', ph:'gõ liền số', lenh:'pb.b07Ngay', su:'change'})] : []))+
    '<div class="sl-phu">'+PB07.dl.map(function(d){ return coChuHTML(d.dv.thuong)+' ('+d.ap.length+' '+d.dv.apKp+')'; }).join(' · ')+' · nơi lập, tỉnh lấy ở ⚙ Khai báo đơn vị › PGD: '+coChuHTML(o.noi+' / '+o.tinh)+'</div>'+
    (PB07.bo.length ? '<div class="sl-bao do">✗ Bỏ qua (chưa khớp QĐ):<br>'+PB07.bo.map(coChuHTML).join('<br>')+'</div>' : '')+
    (PB07.canh.length ? '<div class="sl-bao vang">⚠ '+PB07.canh.map(coChuHTML).join('<br>⚠ ')+'</div>' : '');
  PB07.x = pb07Trang(PB07.dl, o, ten); PB07.x.ten = ten;
  var n = document.getElementById('pb07-nut'); if(n) n.innerHTML = xuatHang({ten:ten, html:function(){ return PB07.x.trang; }, word:'pb07Word()'});
  xemChuan(document.getElementById('pb07-khung'), PB07.x.trang);
}
function pb07Word(){ var x = PB07.x; if(!x) return;
  hsoDocx({ds:x.ds}).then(function(bl){ giaoFile(bl, x.ten+'.docx'); bao('Đã tạo '+x.ten+'.docx', 5); }).catch(function(er){ baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }

/* ---------- lệnh ---------- */
GD.dangKy('pb', {
  moi:function(){ pbMoQD(''); },
  sua:function(el){ pbMoQD(el.getAttribute('data-k')); },
  chon:function(el){ PB.chon = {khoa:el.getAttribute('data-k'), xa:el.getAttribute('data-xa')}; PB.kq = null; pbVeTrai(); pbVePhai(); },
  cheDo:function(el){ PB.cheDo = el.getAttribute('data-v'); PB.kq = null; pbVePhai(); },
  ky:function(el){ PB.kyCX = el.value; PB.kq = null; pbVePhai(); },
  chay:function(){ pbChay(); },
  suaTay:function(el){ var k = (PB.kq || [])[+el.getAttribute('data-ct')], v = pbDocSo(el.value); if(!k) return;
    if(v==null && String(el.value).trim()) return baoLoi('"'+el.value+'" không phải số — gõ ví dụ 300 hoặc -200 (triệu đồng).');
    pbSuaTay(k, +el.getAttribute('data-i'), v || 0); pbGiuO(function(){ var o = document.getElementById('pb-kq'), q = pbQDChon(); if(o && q) o.innerHTML = pbKQHTML(q, pbCheDo()); }); },
  nhapWPF:function(el){ pbNhapWPF(el); },
  b07:function(){ pb07Mo(false); },
  b07Het:function(){ pb07Mo(true); },
  b07Cach:function(el){ PB07.ngay = el.getAttribute('data-v'); pb07Ve(); },
  b07Ngay:function(el){ var n = typeof gdxDocNgay==='function' ? gdxDocNgay(el.value) : el.value; if(String(el.value).trim() && !n) return baoLoi('"'+el.value+'" không phải ngày — gõ liền số, vd 2192026 = 21/09/2026.'); PB07.ngayGo = n || ''; pb07Ve(); },
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
