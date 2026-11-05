/* ===== P2 (anh Nhân 20/10/2026 — docs/KE_HOACH_PHAN_BO_KH.md mục 5): 🎯 PHÂN BỔ KH — GIAO DIỆN tab con trong 📈 Số liệu (tiền tố pb) =====
   - Chỉ VẼ + nhận lệnh (GD.dangKy('pb', …), data-lenh="pb.…"); mọi phép tính ở js/47-phan-bo.js; số liệu chung qua KHO (dsTo, duNoAp); lưu qua KHO1 ('pb').
   - Cột trái: danh sách QĐ (nhóm theo QĐ = số + ngày + ký hiệu, mỗi dòng 1 xã) · ＋ QĐ mới · 📥 Nạp QĐ (Excel mẫu) · ⬇ Tải mẫu (3.439 — bỏ nhập file sao lưu WPF).
   - Hộp QĐ (QT-17): tích nhiều xã (nhập trước vài xã, mở lại tích thêm) · thêm CT cho các xã đã tích · Đã giao gợi ý theo QĐ trước / dư nợ 31/12 · Đến 31/12 tự tính · Kiểm tra ✗ / ⚠.
   - Cột phải: chọn xã của QĐ · cách chia · kỳ dư nợ (chính xác) · ⚙ Phân bổ → đối chiếu từng CT (QT-16) + bảng ấp, SỬA TAY tăng/giảm (QT-15.6) → 👁 Biểu 07 xã đang xem · 📦 mọi xã của QĐ (3.289 P3, mẫu js/mau/07pb.js).
   - Lưu: KHO1.doc('pb') = {qd:[QĐ…], ch:{buocTD, buocCX, soApToiDa}} — mỗi xã 1 bản ghi QĐ (schema ở đầu js/47). */
var PB = {C:{ky:''}, K:null, xa:{}, dsXa:[], chon:{khoa:'', xa:''}, cheDo:'', kyCX:'', kq:null, kqLuc:'', dn:{}, F:null, che:'', dc:{nam:'', chiLech:false, daDoc:{}}, db:{nam:'', xaDs:[], nguon:0, ctDs:[], ky:'', xep:'ct', them:false, tachQD:false, gap:{}, moXa:''}};   /* 3.301: che = '' phân bổ · 'dc' 🔎 đối chiếu chéo · 'db' 📈 diễn biến (cột phải) */
function pbDL(){ var d = KHO1.doc('pb'); if(!d || typeof d!=='object') d = {}; d.qd = Array.isArray(d.qd) ? d.qd : []; d.qdKhong = Array.isArray(d.qdKhong) ? d.qdKhong : []; d.ch = d.ch || {};   /* 3.467: qdKhong = QĐ không giao cho PGD (chỉ số QĐ, lưu riêng — phân bổ / Biểu 07 / đối chiếu không đụng) */ return d; }
function pbGhi(d){ d.sua = new Date().toISOString(); KHO1.ghi('pb', d); }
function pbKhoa(q){ return String(q.so || '').trim()+'|'+String(q.ngay || '').slice(0, 10)+'|'+String(q.kyHieu || '').trim(); }   /* 1 QĐ giao nhiều xã = cùng khóa */
function pbNhom(){ var g = {}, thu = []; pbDL().qd.forEach(function(q){ var k = pbKhoa(q); if(!g[k]){ g[k] = []; thu.push(k); } g[k].push(q); });
  return thu.map(function(k){ return {k:k, ds:g[k].sort(function(a, b){ return String(a.tenXa).localeCompare(String(b.tenXa), 'vi'); })}; })
    .sort(function(a, b){ var x = a.ds[0], y = b.ds[0]; return x.ngay < y.ngay ? 1 : x.ngay > y.ngay ? -1 : String(x.so).localeCompare(String(y.so)); }); }
/* 3.305 (anh 21/10 "các chip tăng giảm, khớp thêm màu sắc cho trực quan"): chip màu — tang / khop xanh lục · giam / lech đỏ · canh vàng · mo xanh nhạt */
function pbChip(chu, loai){ return '<span class="pb-c '+(loai || 'mo')+'">'+chu+'</span>'; }
function pbChipTG(v){ v = +v || 0; return pbChip(v ? pbSoDau(v) : '0', v>0 ? 'tang' : v<0 ? 'giam' : 'mo'); }   /* 3.308 (anh 21/10 "có dấu cộng trừ và màu rồi nên bỏ mũi tên"): +300 xanh · −150 đỏ */
function pbNgay(iso){ return iso ? String(iso).slice(8, 10)+'/'+String(iso).slice(5, 7)+'/'+String(iso).slice(0, 4) : ''; }
function pbVT(ma){ return typeof ctNgan==='function' ? ctNgan(ma) : ma; }
function pbTenCT(ma){ var c = typeof TDN_CT!=='undefined' ? TDN_CT[ma] : null; return c ? c[1] : 'Chương trình '+ma; }
function pbNguonChu(n){ return +n===2 ? 'ĐP' : 'TW'; }

/* ---------- dựng: kỳ chung → cây địa bàn (xã → ấp) ---------- */
function pbVe(){
  var e = document.getElementById('tr7'); if(!e) return;
  PB.dn = {}; PB.dc.daDoc = {};   /* 3.308 L2: mở lại tab → đọc lại dư nợ (Mẫu 31 vừa nạp lại cùng kỳ không bị số cũ) */
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
  if(!PB.daMoMuc){ PB.daMoMuc = 1; PB.che = D.cauHinh.pbMuc!=null ? String(D.cauHinh.pbMuc) : 'qd'; }   /* 3.308: nhớ mục đang mở */
  e.innerHTML = slTabConHTML()+(PB.K ? kyGhiHTML(PB.K) : '')+
    (loi ? '<div class="sl-bao do">'+coChuHTML(loi)+'</div>' : !PB.K ? '<div class="sl-bao vang">Chưa có Mẫu 31 — vẫn nhập QĐ được; muốn phân bổ xuống ấp cần nạp Mẫu 31 ở <b>📥 Nạp &amp; KT</b> (danh sách ấp, dư nợ).</div>' : '')+
    pbThanhHTML()+'<div class="th-bo th-bo2 pb-bo muc-'+(PB.che || 'pb')+'"><div class="th-cot hso-trai" id="pb-trai"></div><div class="th-cot th-xem pb-phai" id="pb-phai"></div></div>';
  pbVeTrai(); pbVePhai();
}

/* ---------- 3.308 (anh 21/10 "tab phân bổ còn hiện chung các chức năng hơi rối … thanh tab ngang"): THANH TAB NGANG 4 MỤC — 📋 Quyết định · ⚙ Phân bổ · Biểu 07 · 📈 Diễn biến · 🔎 Đối chiếu
   mỗi mục 1 màn dùng hết vùng làm việc (CSS .pb-bo.muc-…); nhớ mục (D.cauHinh.pbMuc); phím 1 – 4; số đỏ trên Đối chiếu = số nhóm lệch (tính nhanh theo cách chia tương đối) */
var PB_MUC = [['qd', '📋 Quyết định'], ['', '⚙ Phân bổ · Biểu 07'], ['db', '📈 Diễn biến'], ['dc', '🔎 Đối chiếu']];
function pbDCLechNhanh(){ try { var nam = pbDCNam()[0], ch = pbDL().ch; if(!nam) return 0;
    return pbDoiChieu(pbDL().qd, nam, function(q){ var xaO = PB.xa[q.xa]; return xaO && xaO.ap.length ? pbPhanBo(q, {cheDo:'td', ap:xaO.ap, ch:ch}) : null; }, null, ch.nguongLech).tong.loi; } catch(e){ return 0; } }
function pbThanhHTML(){ var soQD = pbNhom().length, lech = pbDCLechNhanh();
  return '<div class="pb-thanh" role="tablist">'+PB_MUC.map(function(m, i){ var bat = (PB.che || '')===m[0];
    return '<button type="button" role="tab" aria-selected="'+bat+'" class="pb-thanh-nut'+(bat ? ' bat' : '')+'" data-lenh="'+(m[0]==='db' || m[0]==='dc' ? 'pb.'+m[0] : 'pb.muc')+'" data-v="'+m[0]+'" title="Phím '+(i+1)+'">'+m[1]+
      (m[0]==='qd' ? ' <small>'+soQD+'</small>' : m[0]==='dc' && lech ? ' <span class="pb-thanh-so" title="Số nhóm xã · CT · nguồn đang lệch">'+lech+'</span>' : '')+'</button>'; }).join('')+'</div>'; }
function pbDoiMuc(v){ PB.che = v || ''; D.cauHinh.pbMuc = PB.che; if(typeof luu==='function') luu(); pbKhung(); }
document.addEventListener('keydown', function(ev){   /* phím 1 – 4 chuyển mục (không khi đang gõ / mở hộp) */
  if(typeof nganHienTai==='undefined' || nganHienTai!==7 || D.cauHinh.slTab!=='pb' || ev.ctrlKey || ev.altKey || ev.metaKey || !/^[1-4]$/.test(ev.key)) return;
  var a = document.activeElement, hop = document.getElementById('hop'); if(a && /^(INPUT|SELECT|TEXTAREA)$/.test(a.tagName) || hop && hop.classList.contains('hien')) return;
  if(!document.querySelector('.pb-thanh')) return; ev.preventDefault(); pbDoiMuc(PB_MUC[+ev.key-1][0]); });

/* ---------- 📋 Quyết định: danh sách QĐ (thẻ) ---------- */
function pbVeTrai(){
  var o = document.getElementById('pb-trai'); if(!o) return;
  var nh = pbNhom();
  var gon = !!D.cauHinh.pbGonQD;   /* 3.467 (anh 04/11 "có nút chuyển xem gọn, 1 QĐ 1 dòng, nhấp vào hiện bảng bên phải") */
  o.innerHTML = '<div class="th-nhom-ten"><b>📋 Quyết định</b> <small>'+nh.length+' QĐ · '+pbDL().qd.length+' lượt xã</small> '+
    GD.nut({chu:gon ? '▤ Xem chi tiết' : '☰ Xem gọn', lenh:'pb.gon', lop:'pb-nho', tit:gon ? 'Mỗi QĐ hiện đủ các xã' : 'Mỗi QĐ 1 dòng — bấm để xem bảng bên phải'})+'</div>'+
    GD.hang([GD.nut({chu:'＋ QĐ mới', lenh:'pb.moi', chinh:1, tit:'Nhập tay theo chương trình như trên QĐ'}),
      '<label class="nut-tep nho" title="File PDF QĐ có chữ (bản điện tử) — app đọc bảng danh mục chương trình → PGD → xã, lấy PGD mình, xem trước rồi lưu">📄 Đọc QĐ (PDF)'+
        '<input type="file" accept=".pdf,application/pdf" style="display:none" data-lenh="pb.nhapPdf" data-su="change"></label>',
      '<label class="nut-tep nho" title="File Excel theo mẫu chuẩn (Gemini điền từ QĐ scan / chụp) — xem trước, soát rồi mới lưu">📥 Nạp QĐ (Excel mẫu)<input type="file" accept=".xlsx,.xls" style="display:none" data-lenh="pb.nhapXls" data-su="change"></label>',
      GD.nut({chu:'⬇ Tải mẫu Excel', lenh:'pb.xlsMau', tit:'Mẫu trống + hướng dẫn + lời nhắc cho Gemini'})])+
    GD.hang([GD.nut({chu:'⬇ Xuất số liệu đã lưu', lenh:'pb.xuatTat', tit:'Excel toàn bộ QĐ đã nhập — danh sách, từng QĐ như danh mục trên giấy, chi tiết xã × chương trình — để đối chiếu với QĐ'}),
      GD.nut({chu:'📅 Dòng thời gian QĐ', lenh:'pb.dtg', chinh:PB.xem==='__dtg', tit:'Thống kê QĐ theo ngày, STT, soát đợt bỏ sót'})])+   /* 3.467 · 3.469: QĐ không giao cho PGD nhập ở ＋ QĐ mới (0 xã) */
    (gon ? pbGonHTML(nh) : '<div class="pb-ds">'+pbVaKhong(nh).map(function(g){ if(g.khong) return pbKhongTheHTML(g.khong, false);
      var q0 = g.ds[0], giao = /giao mới/i.test(q0.loai), dangChon = PB.chon.khoa===g.k;
      if(PB.che==='qd') dangChon = (PB.xem || (nh[0] || {}).k)===g.k;   /* 3.465: mục 📋 Quyết định — QĐ đang xem ở cột phải */
      return '<div class="pb-nhom'+(dangChon ? ' bat' : '')+'"><div class="pb-nhom-dau '+(giao ? 'pb-gm' : 'pb-dc')+'" data-lenh="pb.xem" data-k="'+coChuHTML(g.k)+'" title="Xem QĐ (theo chương trình / theo xã)">'+
        '<b>QĐ '+coChuHTML(q0.so)+'</b> · '+pbNgay(q0.ngay)+' · '+pbNguonChu(q0.nguon)+(q0.dot ? ' · đợt '+coChuHTML(q0.dot) : '')+' · '+(giao ? 'GIAO MỚI' : 'ĐIỀU CHỈNH')+(g.ds.length>1 ? ' · '+g.ds.length+' xã' : '')+
        ' '+GD.nut({chu:'✎', lenh:'pb.sua', du:{k:g.k}, tit:'Sửa QĐ / tích thêm xã', lop:'pb-nho'})+'</div>'+
        g.ds.map(function(q){ var loi = (q.ct || []).some(function(c){ return pbKiemNhapQD(c); });
          return '<div class="pb-dong'+(dangChon && PB.chon.xa===q.xa ? ' bat' : '')+(loi ? ' pb-loi' : '')+'" data-lenh="pb.chon" data-k="'+coChuHTML(g.k)+'" data-xa="'+coChuHTML(q.xa)+'" title="Bấm để phân bổ xã này">'+
            '<b>'+coChuHTML(q.tenXa || q.xa)+'</b>'+(q.xa ? '' : ' <span class="vang" title="Chưa ghép được xã trong cây địa bàn">⚠ chưa ghép xã</span>')+' — '+
            (loi ? pbChip('✗ lệch số', 'lech')+' ' : '')+(q.ct || []).map(function(c){ var tg = pbSo(c.tangGiam);
              return '<span class="pb-c-ct">'+coChuHTML(pbVT(c.ma))+' '+(tg!=null && tg!==0 ? pbChipTG(tg) : pbChip(pbSoVN(pbSo(c.den3112) || 0), 'mo'))+'</span>'; }).join(' ')+'</div>'; }).join('')+'</div>'; }).join('')+'</div>'
      )+pbDutTatHTML()+(nh.length || pbDL().qdKhong.length ? '' : '<div class="sl-phu">Chưa có QĐ. Bấm <b>📄 Đọc QĐ (PDF)</b> (file QĐ điện tử), <b>＋ QĐ mới</b> (nhập tay theo chương trình) hoặc <b>📥 Nạp QĐ (Excel mẫu)</b> — <b>⬇ Tải mẫu Excel</b> cho Gemini chép bảng QĐ scan.</div>');
}

/* ---------- cột phải: phân bổ 1 xã của QĐ ---------- */
function pbQDChon(){ var c = PB.chon; if(!c.khoa) return null; return pbDL().qd.filter(function(q){ return pbKhoa(q)===c.khoa && q.xa===c.xa; })[0] || null; }
function pbCheDo(){ return PB.cheDo || (pbDL().ch.cheDo==='cx' ? 'cx' : 'td'); }
function pbVePhai(){
  if(PB.che==='dc') return pbDCVe();
  if(PB.che==='db') return pbDBVe();
  var o = document.getElementById('pb-phai'); if(!o) return;
  if(PB.che==='qd') return pbQDXem();   /* 3.465: xem QĐ 2 kiểu */
  var q = pbQDChon(), chonQD = '<div class="gd-hang pb-chon-qd"><label class="gd-kv"><span>QĐ · xã</span><select data-lenh="pb.chonSel" data-su="change"><option value="">— chọn —</option>'+pbNhom().map(function(g){ return g.ds.map(function(x){
      return '<option value="'+coChuHTML(g.k+'||'+x.xa)+'"'+(q && g.k===PB.chon.khoa && x.xa===q.xa ? ' selected' : '')+'>QĐ '+coChuHTML(x.so)+' · '+pbNgay(x.ngay).slice(0, 5)+' · '+pbNguonChu(x.nguon)+' — '+coChuHTML(x.tenXa || x.xa)+'</option>'; }).join(''); }).join('')+'</select></label></div>';   /* 3.308: chọn nhanh, khỏi quay lại mục Quyết định */
  if(!q){ o.innerHTML = chonQD+'<div class="sl-phu pb-goi">Chọn QĐ · xã ở ô trên (hoặc bấm 1 dòng xã ở mục 📋 Quyết định) để phân bổ xuống ấp.<br><small>Quy tắc: số giao chẵn (tương đối 100 tr · chính xác 50 tr), chỉ 1 ấp lẻ; Biểu 07 phải khớp Đã giao → Tăng/giảm → Đến 31/12 của QĐ.</small></div>'; return; }
  var cd = pbCheDo(), g = pbNhom().filter(function(x){ return x.k===PB.chon.khoa; })[0], dsKy = pbDsKyCX(), ky = pbChonKy(dsKy, q.ngay, PB.kyCX);
  var xaO = PB.xa[q.xa], soAp = xaO ? xaO.ap.length : 0, khKQ = pbKhoaKQ(q, cd), nho = (PB.kqNho || {})[khKQ];
  if(!(PB.kq && PB.kqLuc===khKQ) && nho){ PB.kq = nho.kq; PB.kqMoTa = nho.moTa; PB.kqLuc = khKQ; }   /* 3.308 L6: sửa tay giữ theo QĐ · xã · cách chia trong phiên */
  var daXuat = pb07DaXuat(q);
  o.innerHTML = chonQD+'<div class="th-nhom-ten"><b>⚙ Phân bổ QĐ '+coChuHTML(q.so)+' · '+pbNgay(q.ngay)+' · '+pbNguonChu(q.nguon)+'</b></div>'+
    (g && g.ds.length>1 ? GD.hang(g.ds.map(function(x){ return GD.chip(coChuHTML(x.tenXa || x.xa), x.xa===q.xa, 'pb.chon', {k:g.k, xa:x.xa}); })) : '')+
    GD.hang([GD.chip('Tương đối (chia đều)', cd==='td', 'pb.cheDo', {v:'td'}, 'Chia đều chẵn 100 — không cần dư nợ'),
      GD.chip('Chính xác (theo dư nợ)', cd==='cx', 'pb.cheDo', {v:'cx'}, 'Theo tỷ lệ dư nợ Mẫu 31 cuối tháng trước QĐ — chẵn 50')].concat(cd==='cx' ? [
      GD.kv('Kỳ dư nợ', '<select data-lenh="pb.ky" data-su="change"><option value="">Tự động'+(ky && !PB.kyCX ? ' ('+coChuHTML(slKyChu(ky.ky))+')' : '')+'</option>'+dsKy.map(function(k){ return '<option value="'+k+'"'+(k===PB.kyCX ? ' selected' : '')+'>'+coChuHTML(slKyChu(k))+'</option>'; }).join('')+'</select>')] : [])
      .concat([GD.nut({chu:'⚙ Phân bổ', lenh:'pb.chay', chinh:1})]))+
    '<div class="sl-phu">'+coChuHTML(q.tenXa || q.xa)+': '+(soAp ? soAp+' ấp / khu phố theo cây địa bàn kỳ '+coChuHTML(slKyChu(PB.C.ky)) : '<span class="vang">⚠ chưa có danh sách ấp (nạp Mẫu 31 / kiểm tra tên xã)</span>')+
      ' · '+(q.ct || []).filter(function(c){ return pbSoCanPhanBo(q, c); }).length+'/'+(q.ct || []).length+' chương trình cần phân bổ</div>'+
    (daXuat ? '<div class="sl-phu">'+pbChip('📜 Biểu 07 đã xuất '+daXuat, 'mo')+'</div>' : '')+'<div id="pb-kq">'+(PB.kq && PB.kqLuc===pbKhoaKQ(q, cd) ? pbKQHTML(q, cd) : '<div class="sl-phu">Bấm <b>⚙ Phân bổ</b>.</div>')+'</div>';
}
function pbKhoaKQ(q, cd){ return q.id+'|'+cd+'|'+(cd==='cx' ? PB.kyCX : ''); }
function pbChay(){
  var q = pbQDChon(); if(!q) return; var cd = pbCheDo(), xaO = PB.xa[q.xa], ap = xaO ? xaO.ap : [], ch = pbDL().ch;
  if(PB.kqNho) delete PB.kqNho[pbKhoaKQ(q, cd)];   /* ⚙ Phân bổ lại = bỏ số sửa tay đang giữ */
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
        '<td class="so">'+pbSoVN(r.tongTruoc)+' '+pbSoDau(r.tongDc)+' → '+pbSoVN(r.tongNam)+'</td><td>'+(!r.xuatDuoc ? pbChip('✗ LỆCH', 'lech') : r.coAm ? pbChip('⚠ Có ấp âm', 'canh') : k.canhBao ? pbChip('⚠ Khớp, có cảnh báo', 'canh') : pbChip('✓ Khớp'+(k.suaTay ? ' (chỉnh tay)' : ''), 'khop'))+'</td></tr>'; }).join('');
  var muc = nang ? 'do' : loi.length ? 'vang' : 'xanh';
  var apNhan = {}, soKhop = 0; kq.forEach(function(k){ if(pbKiem(k).xuatDuoc) soKhop++; k.ap.forEach(function(a){ if(a.dc) apNhan[a.k] = 1; }); });   /* thẻ số tổng (giao diện thẻ như 📈 Diễn biến) */
  return (kq.some(function(k){ return k.suaTay; }) ? '<div class="gd-hang">'+pbChip('✎ Có ấp sửa tay — giữ khi đổi xã / cách chia trong phiên', 'canh')+GD.nut({chu:'↺ Chia lại', lenh:'pb.chiaLai', tit:'Bỏ số sửa tay, chia lại theo cách chia đang chọn'})+'</div>' : '')+
    '<div class="pb-kpi">'+pbDBThe('Số giao QĐ', pbSoDau(pbSum(kq, function(k){ return k.so; })), kq.length+' chương trình')+pbDBThe('Đến 31/12 (xã)', pbSoVN(pbSum(kq, function(k){ return k.den3112Xa; })), 'Đã giao '+pbSoVN(pbSum(kq, function(k){ return k.daGiaoXa; })))+
      pbDBThe('Ấp nhận tăng / giảm', String(Object.keys(apNhan).length), (cd==='cx' ? 'chính xác' : 'tương đối')+' · chẵn '+pbSoVN(cd==='cx' ? pbCH(pbDL().ch).buocCX : pbCH(pbDL().ch).buocTD))+pbDBThe('Khớp QĐ', soKhop+' / '+kq.length, soKhop===kq.length ? 'xuất được Biểu 07' : 'còn chương trình lệch', Math.round(soKhop/kq.length*1000)/10)+'</div>'+
    '<div class="sl-phu">'+coChuHTML(PB.kqMoTa || '')+'</div>'+
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-dc"><thead><tr><th>Chương trình</th><th>QĐ: Đã giao ± → Đến 31/12</th><th>Tổng các ấp: Trước ± → Năm</th><th>Đối chiếu</th></tr></thead><tbody>'+dongDC+'</tbody></table></div>'+
    kq.map(function(k, ik){ var coDn = k.ap.some(function(a){ return a.dnThat!=null; }), r = pbKiem(k);
      return '<div class="pb-ct"><div class="th-nhom-ten"><b>► '+coChuHTML(pbVT(k.ma))+'</b> <small>'+coChuHTML(k.ten || pbTenCT(k.ma))+'</small></div>'+
        '<div class="to-bang-cuon"><table class="to-bang luoi pb-ap"><thead><tr><th>Ấp / khu phố</th>'+(coDn ? '<th>Dư nợ thật</th>' : '')+'<th>Chỉ tiêu trước</th><th>Tăng/giảm ✎</th><th>Chỉ tiêu năm</th><th>Ghi chú</th></tr></thead><tbody>'+
        k.ap.map(function(a, i){ var chenh = a.dnThat!=null ? pbR(a.truoc - a.dnThat) : 0;
          var ghi = (a.nam<0 ? '⚠ Âm — giảm quá chỉ tiêu' : a.suaTay ? '✎ sửa tay' : '')+(chenh ? (a.nam<0 || a.suaTay ? ' · ' : '')+'trước = dư nợ thật '+pbSoDau(chenh) : '');
          return '<tr class="'+(a.nam<0 ? 'pb-loi' : '')+(a.dc ? '' : ' pb-mo')+'"><td>'+coChuHTML(a.ten)+'</td>'+(coDn ? '<td class="so">'+(a.dnThat!=null ? pbSoVN(a.dnThat) : '')+'</td>' : '')+
            '<td class="so">'+pbSoVN(a.truoc)+'</td><td class="so pb-tg'+(a.dc>0 ? ' tang' : a.dc<0 ? ' giam' : '')+'">'+GD.o({loai:'so', gt:a.dc ? pbSoDau(a.dc) : '', ph:'0', lenh:'pb.suaTay', du:{ct:ik, i:i}})+'</td><td class="so">'+pbSoVN(a.nam)+'</td><td><small>'+coChuHTML(ghi)+'</small></td></tr>'; }).join('')+
        '<tr class="tong"><td>Cộng</td>'+(coDn ? '<td class="so">'+pbSoVN(pbSum(k.ap, function(a){ return a.dnThat || 0; }))+'</td>' : '')+'<td class="so">'+pbSoVN(r.tongTruoc)+'</td><td class="so">'+pbSoDau(r.tongDc)+'</td><td class="so">'+pbSoVN(r.tongNam)+'</td><td></td></tr>'+
        '</tbody></table></div></div>'; }).join('')+
    '<div class="sl-bao '+muc+' pb-tt">'+(nang ? 'Chưa xuất được Biểu 07 — sửa các dòng đỏ cho khớp QĐ (Đã giao → Tăng/giảm → Đến 31/12).' : loi.length ? 'Khớp QĐ, nhưng có cảnh báo — xem lại trước khi xuất.' : 'Tất cả chương trình KHỚP QĐ, không ấp nào âm.')+
      (loi.length ? '<br>'+loi.map(coChuHTML).join('<br>') : '')+'</div>'+pb07NutHTML(q, chan);
}

/* ---------- hộp nhập / sửa QĐ (QT-17) ---------- */
/* 3.466 (anh 04/11 "khi sửa các QĐ, sao cho linh động được" — làm hết 6 ý): op.noi = 'phai' → sửa nhanh NGAY TẠI BẢNG XEM (cột phải mục 📋 Quyết định), không mở hộp;
   op.tu = khóa QĐ nguồn → ⧉ QĐ KẾ TIẾP: chép xã + chương trình, Đã giao = Đến 31/12 của QĐ này, đợt + 1 — anh gõ số, ngày, cột điều chỉnh. */
function pbMoQD(khoa, op){ op = op || {};
  var dl = pbDL(), ds = khoa ? dl.qd.filter(function(q){ return pbKhoa(q)===khoa; }) : [], src = op.tu ? dl.qd.filter(function(q){ return pbKhoa(q)===op.tu; }) : [];
  var k0 = op.khong ? dl.qdKhong.filter(function(x){ return x.id===op.khong; })[0] : null, q0 = ds[0] || src[0] || k0 || op.mac || {};   /* 3.469: QĐ 0 xã (không giao cho PGD) mở cùng hộp; op.mac = đầu QĐ điền sẵn */
  if(op.tu) ds = pbNhom().filter(function(g){ return g.k===op.tu; }).map(function(g){ return g.ds; })[0] || src;
  var ke = !!op.tu, F = PB.F = {ids:ke ? [] : ds.map(function(q){ return q.id; }), so:ke ? '' : q0.so || '', kyHieu:q0.kyHieu || '/QĐ-BĐDHĐQT', ngay:ke ? '' : q0.ngay || '', nguon:q0.nguon || 0,
    loai:ke ? 'Điều chỉnh' : q0.loai || '', dot:ke ? (q0.dot && /^\d+$/.test(q0.dot) ? String(+q0.dot+1) : '') : q0.dot || '',
    xa:{}, dong:[], doi:ke, ctChon:'', tong:ke ? {} : JSON.parse(JSON.stringify(q0.tong || {})), pgd:q0.pgd || '',   /* 3.465: tong[mã] = [đã giao, điều chỉnh, đến 31/12] dòng PGD trên QĐ */
    xaThu:[], kieu:D.cauHinh.pbKieuQD==='xa' ? 'xa' : 'ct', noi:op.noi || '', khoa:khoa || '', tu:op.tu || '', ghep:{}, khongId:k0 ? k0.id : '', ghi:k0 ? k0.ghi || '' : (ds[0] || {}).ghi || ''};   /* xaThu: thứ tự xã như QĐ (khóa số của object tự xếp lên trước) */
  ds.forEach(function(q){ var k = q.xa || ('?'+q.tenXa); F.xaThu.push(k); F.xa[k] = q.tenXa || q.xa;
    (q.ct || []).forEach(function(c){ F.dong.push(ke ? {xa:k, ma:c.ma, ten:c.ten, daGiao:pbSo(c.den3112), tangGiam:null, den3112:null, dgTu:false, denTu:true}
      : {xa:k, ma:c.ma, ten:c.ten, daGiao:pbSo(c.daGiao), tangGiam:pbSo(c.tangGiam), den3112:pbSo(c.den3112), dgTu:false,
         denTu:pbSo(c.den3112)==null || Math.abs(pbR((pbSo(c.daGiao) || 0)+(pbSo(c.tangGiam) || 0))-pbSo(c.den3112))<0.0005}); }); });   /* 3.466: dòng đang khớp 3 + 4 = 5 → sửa cột 4 thì cột 5 tự tính lại; dòng gõ tay lệch giữ nguyên */
  pbDuNoNamTruoc();
  if(F.noi==='phai'){ PB.xem = khoa; return pbVePhai(); }
  moHop('<div class="hop-tit">📋 '+(ke ? '⧉ QĐ kế tiếp từ QĐ '+coChuHTML(q0.so)+' · '+ds.length+' xã' : khoa ? 'Sửa QĐ '+coChuHTML(q0.so)+' · '+ds.length+' xã' : k0 ? 'Sửa QĐ '+coChuHTML(k0.so)+' · 0 xã (không giao cho PGD)' : 'QĐ mới')+'</div>'+
    '<div class="hop-phu">Đơn vị: triệu đồng. '+(ke ? 'Đã chép xã + chương trình, <b>Đã giao = Đến 31/12 của QĐ '+coChuHTML(q0.so)+'</b> — gõ số QĐ, ngày, cột điều chỉnh. ' : 'Tích các xã của QĐ (nhập trước vài xã, lần sau mở lại tích thêm). Đã giao tự gợi ý theo Đến 31/12 của QĐ trước — sửa được; ')+
    'Đến 31/12 tự tính. Ngày gõ liền số (1592026 = 15/09/2026). Ctrl+Enter = Lưu. <b>Tỉnh không giao cho PGD đợt này → không tích xã, chỉ nhập thông tin QĐ rồi Lưu (QĐ 0 xã).</b></div>'+
    '<div id="pb-f"></div>', true);
  pbFVe();
}
/* xã trên QĐ → mã xã cây địa bàn: tên anh đã ghép tay (ch.xaQD) trước, rồi ghép theo tên */
function pbXaKhop(ten){ var m = (pbDL().ch.xaQD || {})[pbBoDau(ten)]; return m && PB.xa[m] ? m : pbKhopXa(ten, PB.dsXa); }
function pbFVe(){
  var o = document.getElementById('pb-f'), F = PB.F; if(!o || !F) return;
  var dsXa = PB.dsXa.slice(); Object.keys(F.xa).forEach(function(k){ if(!PB.xa[k]) dsXa.push({ma:k, ten:F.xa[k] + ' (chưa có trong cây)'}); });
  var ctDs = Object.keys(typeof TDN_CT!=='undefined' ? TDN_CT : {}).sort();
  var nhan = function(chu, noi){ return GD.kv(chu, noi); }, sel = function(f, gt, ds){ return '<select data-lenh="pb.fo" data-su="change" data-f="'+f+'">'+ds.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(String(x[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>'; };
  var xaTich = dsXa.filter(function(x){ return F.xa[x.ma]; });
  o.innerHTML = GD.hang([nhan('Số QĐ', GD.o({loai:'ten', gt:F.so, lenh:'pb.fo', du:{f:'so'}})), nhan('Ký hiệu', GD.o({loai:'ten', gt:F.kyHieu, lenh:'pb.fo', du:{f:'kyHieu'}})),
      nhan('Ngày QĐ', GD.o({loai:'ngay', gt:F.ngay ? pbNgay(F.ngay) : '', ph:'gõ liền số', lenh:'pb.fo', du:{f:'ngay'}})),
      nhan('Nguồn', sel('nguon', F.nguon, [[0, '— chọn —'], [1, 'TW'], [2, 'ĐP']])), nhan('Loại', sel('loai', F.loai, [['', '— chọn —'], ['Giao mới', 'Giao mới'], ['Điều chỉnh', 'Điều chỉnh']])),
      nhan('Đợt', GD.o({loai:'so', gt:F.dot, lenh:'pb.fo', du:{f:'dot'}})), nhan('Ghi chú', GD.o({loai:'ten', gt:F.ghi || '', lenh:'pb.fo', du:{f:'ghi'}}))])+
    '<div class="pb-f-xa"><b>Xã / phường:</b> '+(dsXa.length ? dsXa.map(function(x){ return '<label class="hso-o2"><input type="checkbox" data-lenh="pb.fXa" data-su="change" data-ma="'+coChuHTML(x.ma)+'"'+(F.xa[x.ma] ? ' checked' : '')+'> '+coChuHTML(x.ten)+'</label>'; }).join(' ')
      : '<span class="vang">Chưa có cây địa bàn (nạp Mẫu 31)</span>')+'</div>'+
    GD.hang([GD.chip('Xếp theo chương trình', F.kieu!=='xa', 'pb.fKieu', {v:'ct'}, 'Như danh mục QĐ: chương trình → Tổng PGD → các xã'), GD.chip('Xếp theo xã', F.kieu==='xa', 'pb.fKieu', {v:'xa'}, 'Mỗi xã: các chương trình của xã')])+   /* 3.466 */
    GD.hang([nhan('Chương trình', '<select data-lenh="pb.fo" data-su="change" data-f="ctChon"><option value="">— chọn —</option>'+ctDs.map(function(m){ var daCo = F.dong.some(function(d){ return d.ma===m; });
        return '<option value="'+m+'"'+(m===F.ctChon ? ' selected' : '')+'>'+(daCo ? '✓ ' : '')+m+' - '+coChuHTML(pbVT(m))+' - '+coChuHTML(pbTenCT(m))+'</option>'; }).join('')+'</select>'),
      GD.nut({chu:'＋ Thêm cho '+(xaTich.length || 0)+' xã đã tích', lenh:'pb.fThemCT', tat:!xaTich.length})])+
    '<div id="pb-f-bang">'+pbFBangHTML()+'</div>'+
    GD.hang([GD.nut({chu:'💾 Lưu QĐ', lenh:'pb.fLuu', chinh:1, tit:'Ctrl+Enter'}), GD.nut({chu:'Bỏ', lenh:'pb.fBo'})].concat(F.ids.length || F.khongId ? [GD.nut({chu:'🗑 Xóa cả QĐ', lenh:'pb.fXoa', lop:'do'})] : []), 1)+
    (Object.keys(F.xa).some(function(x){ return x.charAt(0)==='?'; }) ? '<div class="sl-phu vang">⚠ Có xã chưa ghép với cây địa bàn — chọn xã đúng ở ô "ghép xã" trong bảng (app nhớ tên này cho các QĐ sau).</div>' : '');
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
/* 3.465 (anh 04/11 "QĐ của tỉnh có cấu trúc theo từng chương trình vay, khi nhập liệu em cũng cho nhập như vậy"): bảng nhập THEO CHƯƠNG TRÌNH như danh mục QĐ —
   I. chương trình → dòng Tổng PGD trên QĐ (gõ để đối chiếu, không bắt buộc) → các xã; 3 cột như QĐ; Enter = xuống dòng dưới CÙNG CỘT (như dò giấy) */
var PB_LA = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
function pbSo3(j, v){ return v==null ? '' : j===1 ? (v===0 ? '-' : pbSoDau(v)) : pbSoVN(v); }   /* cột điều chỉnh: + / − / "-" như QĐ */
function pbFBangHTML(){
  var F = PB.F, e = coChuHTML; if(!F.dong.length) return '<div class="sl-phu">Chưa có dòng — tích xã, chọn chương trình rồi bấm ＋ Thêm.</div>';
  var xaThu = (F.xaThu || []).filter(function(x){ return F.xa[x]; }), maThu = [], loi = 0, nhac = 0, h = '', K = ['daGiao', 'tangGiam', 'den3112'];
  var ctDs = Object.keys(typeof TDN_CT!=='undefined' ? TDN_CT : {}).sort();
  Object.keys(F.xa).forEach(function(x){ if(xaThu.indexOf(x)<0) xaThu.push(x); });
  F.dong.forEach(function(d){ if(maThu.indexOf(d.ma)<0) maThu.push(d.ma); });   /* chương trình theo thứ tự trên QĐ (I, II, III…) */
  F.dong.forEach(pbFTinhDong);
  /* 3.466: ô ghép xã chưa khớp cây địa bàn */
  var ghep = function(x){ return x.charAt(0)!=='?' ? '' : ' <select data-lenh="pb.fGhepXa" data-su="change" data-k="'+e(x)+'" class="pb-chua" title="Tên xã trên QĐ chưa khớp cây địa bàn — chọn xã đúng"><option value="">⚠ ghép xã…</option>'+
    PB.dsXa.filter(function(z){ return !F.xa[z.ma]; }).map(function(z){ return '<option value="'+e(z.ma)+'">'+e(z.ten)+'</option>'; }).join('')+'</select>'; };
  var dongXa = function(i, ten){ var d = F.dong[i], k = pbFKiem(d); if(k[0]===2) loi++; else if(k[0]===1) nhac++;
    var oS = function(f, gt, dau_){ return GD.o({loai:'so', gt:gt==null ? '' : (dau_ ? pbSoDau(gt) : pbSoVN(gt)), lenh:'pb.fSo', du:{i:i, f:f}}); };
    return '<tr class="'+(k[0]===2 ? 'pb-loi' : k[0]===1 ? 'pb-nhac' : '')+'"><td>&nbsp;&nbsp;'+ten+'</td><td class="so">'+oS('daGiao', d.daGiao)+'</td><td class="so">'+oS('tangGiam', d.tangGiam, 1)+'</td><td class="so">'+oS('den3112', d.den3112)+'</td>'+
      '<td><small>'+e(k[1])+'</small></td><td>'+GD.nut({chu:'✕', lenh:'pb.fBoDong', du:{i:i}, tit:'Bỏ dòng này'})+'</td></tr>'; };
  if(F.kieu==='xa') xaThu.forEach(function(x){   /* 3.466: xếp theo xã — mỗi xã: ＋ chương trình, 🗑 bỏ xã, ghép xã */
    var ds = F.dong.map(function(d, i){ return i; }).filter(function(i){ return F.dong[i].xa===x; }).sort(function(a, b){ return maThu.indexOf(F.dong[a].ma)-maThu.indexOf(F.dong[b].ma); });
    var co = ds.map(function(i){ return F.dong[i].ma; });
    h += '<tr class="pb-f-ct"><td colspan="6"><b>📍 '+e(F.xa[x] || x)+'</b>'+ghep(x)+' <select data-lenh="pb.fThemCTXa" data-su="change" data-xa="'+e(x)+'"><option value="">＋ chương trình…</option>'+
      ctDs.filter(function(m){ return co.indexOf(m)<0; }).map(function(m){ return '<option value="'+m+'">'+m+' '+e(pbVT(m))+' — '+e(pbTenCT(m))+'</option>'; }).join('')+'</select> '+
      GD.nut({chu:'🗑 bỏ xã', lenh:'pb.fBoXa', du:{xa:x}, tit:'Bỏ xã này khỏi QĐ (mọi chương trình)', lop:'pb-nho'})+'</td></tr>';
    ds.forEach(function(i){ var m = F.dong[i].ma; h += dongXa(i, e(m+' '+pbVT(m)+' — '+pbTenCT(m))); }); });
  else maThu.forEach(function(ma, ci){
    var ds = F.dong.map(function(d, i){ return i; }).filter(function(i){ return F.dong[i].ma===ma; }).sort(function(a, b){ return xaThu.indexOf(F.dong[a].xa)-xaThu.indexOf(F.dong[b].xa); });
    var co = ds.map(function(i){ return F.dong[i].xa; });
    var cong = K.map(function(f){ return pbSum(ds, function(i){ return F.dong[i][f] || 0; }); }), t = (F.tong || {})[ma] || [null, null, null];
    var lechT = t[1]!=null && Math.abs(t[1]-cong[1])>0.0005; if(lechT) loi++;   /* 3.468 (anh 04/11): QĐ chỉ đối chiếu được TỔNG ĐIỀU CHỈNH đợt này — cột đã giao / đến 31/12 của dòng PGD còn gồm xã có tên mà không giao */
    /* 3.466: đầu khối chương trình — đổi mã · ＋ xã · 🗑 bỏ chương trình */
    h += '<tr class="pb-f-ct"><td colspan="6"><b>'+(PB_LA[ci] || ci+1)+'.</b> <select data-lenh="pb.fDoiMa" data-su="change" data-ma="'+ma+'" title="Đổi mã chương trình (ghép nhầm lúc đọc QĐ)">'+
      ctDs.map(function(m){ return '<option value="'+m+'"'+(m===ma ? ' selected' : '')+(m!==ma && maThu.indexOf(m)>=0 ? ' disabled' : '')+'>'+m+' '+e(pbVT(m))+' — '+e(pbTenCT(m))+'</option>'; }).join('')+'</select> '+
      '<select data-lenh="pb.fThemXaCT" data-su="change" data-ma="'+ma+'"><option value="">＋ xã…</option>'+xaThu.filter(function(x){ return co.indexOf(x)<0; }).map(function(x){ return '<option value="'+e(x)+'">'+e(F.xa[x] || x)+'</option>'; }).join('')+
      PB.dsXa.filter(function(z){ return !F.xa[z.ma]; }).map(function(z){ return '<option value="'+e(z.ma)+'">'+e(z.ten)+' (chưa có trong QĐ)</option>'; }).join('')+'</select> '+
      GD.nut({chu:'🗑 bỏ chương trình', lenh:'pb.fBoCT', du:{ma:ma}, tit:'Bỏ cả khối chương trình này', lop:'pb-nho'})+'</td></tr>'+
      '<tr class="pb-f-pgd"><td>Tổng điều chỉnh PGD trên QĐ <small>(gõ để đối chiếu)</small></td>'+[0, 1, 2].map(function(j){ return '<td class="so">'+(j===1 ? GD.o({loai:'so', gt:pbSo3(j, t[j]), lenh:'pb.fTong', du:{ma:ma, j:j}})+'<br>' : '')+'<small>Σ xã '+pbSo3(j, cong[j])+'</small></td>'; }).join('')+
      '<td><small class="'+(lechT ? 'do' : 'xanh')+'">'+(lechT ? '✗ Σ điều chỉnh các xã ≠ dòng PGD ('+pbSoDau(t[1])+')' : t[1]!=null ? '✓ khớp điều chỉnh PGD' : '')+'</small></td><td></td></tr>';
    ds.forEach(function(i){ var x = F.dong[i].xa; h += dongXa(i, e(F.xa[x] || x)+ghep(x)); }); });
  return '<div class="to-bang-cuon"><table class="to-bang luoi pb-f-bang"><thead><tr><th>'+(F.kieu==='xa' ? 'Xã / chương trình' : 'Chương trình / xã')+'</th><th>Chỉ tiêu KH đã giao (3)</th><th>Điều chỉnh đợt này (4)</th><th>Đến 31/12 (5 = 3 + 4)</th><th>Kiểm tra</th><th></th></tr></thead><tbody>'+h+'</tbody></table></div>'+
    '<div class="sl-phu '+(loi ? 'do' : nhac ? 'vang' : 'xanh')+'">'+(loi ? '✗ '+loi+' chỗ lệch (dòng 3 + 4 ≠ 5 hoặc Σ điều chỉnh các xã ≠ dòng PGD)' : nhac ? '⚠ '+nhac+' dòng cần xem lại' : '✓ '+F.dong.length+' dòng khớp')+' · <small>Enter = xuống dòng dưới cùng cột · Ctrl+Enter = Lưu</small></div>';
}
function pbFBangVe(){ var o = document.getElementById('pb-f-bang'); if(o && PB.F) o.innerHTML = pbFBangHTML(); }
function pbFThemCT(){
  var F = PB.F, m = F.ctChon; if(!m) return baoLoi('Chọn chương trình trước.');
  var n = 0; Object.keys(F.xa).forEach(function(x){ if(F.dong.some(function(d){ return d.xa===x && d.ma===m; })) return;
    F.dong.push({xa:x, ma:m, ten:pbTenCT(m), daGiao:null, tangGiam:null, den3112:null, dgTu:true, denTu:true}); n++; });
  if(!n) bao(pbVT(m)+' đã có ở mọi xã đã tích.', 3); F.doi = true; pbFVe();
}
function pbFLuu(){
  var F = PB.F, thieu = []; if(!F) return;
  if(!String(F.so).trim()) thieu.push('Số QĐ'); if(!F.ngay) thieu.push('Ngày QĐ'); if(!+F.nguon) thieu.push('Nguồn'); if(!F.loai) thieu.push('Loại');
  if(!F.dong.length){   /* 3.469 (anh 04/11): không tích xã nào → QĐ 0 xã (không giao cho PGD) — chỉ thông tin QĐ */
    var t0 = []; if(!String(F.so).trim()) t0.push('Số QĐ'); if(!F.ngay) t0.push('Ngày QĐ'); if(!+F.nguon) t0.push('Nguồn'); if(t0.length) return baoLoi('Chưa đủ: '+t0.join(', ')+'.');
    if(!confirm('QĐ '+F.so+' không có xã nào — lưu là QĐ 0 xã (tỉnh không giao cho PGD đợt này)?')) return;
    var dk = pbDL(), K = {id:F.khongId || 'pk'+Date.now().toString(36)+Math.random().toString(36).slice(2, 6), so:String(F.so).trim(), kyHieu:F.kyHieu, ngay:F.ngay, nguon:+F.nguon, loai:F.loai || 'Điều chỉnh', dot:F.dot || '', ghi:F.ghi || '', luc:new Date().toISOString()};
    if(dk.qd.some(function(q){ return F.ids.indexOf(q.id)<0 && String(q.so).trim()===K.so && q.ngay===K.ngay; })) return baoLoi('QĐ '+K.so+' ngày '+pbNgay(K.ngay)+' đã có số liệu giao cho PGD.');
    if(F.ids.length) dk.qd = dk.qd.filter(function(q){ return F.ids.indexOf(q.id)<0; });   /* QĐ có xã bỏ hết xã → thành QĐ 0 xã */
    dk.qdKhong = dk.qdKhong.filter(function(x){ return x.id!==K.id; }).concat([K]);
    var noi0 = F.noi; pbGhi(dk); PB.F = null; PB.xem = 'k:'+K.id; if(!noi0) dongHop(); bao('Đã lưu QĐ '+K.so+' — 0 xã (không giao cho PGD).', 3); pbKhung(); return; }
  var trong = F.dong.filter(function(d){ return d.tangGiam==null && d.den3112==null; }); if(trong.length) thieu.push('số liệu '+trong.length+' dòng (nhập Tăng/giảm hoặc bỏ dòng)');
  if(thieu.length) return baoLoi('Chưa đủ: '+thieu.join(', ')+'.');
  F.dong.forEach(pbFTinhDong);
  var lech = F.dong.filter(function(d){ return pbFKiem(d)[0]===2; }), dut = F.dong.filter(function(d){ var k = pbFKiem(d); return k[0]===1 && /khác QĐ/.test(k[1]); });
  if((lech.length || dut.length) && !confirm((lech.length ? lech.length+' dòng SỐ LỆCH (Đã giao + Tăng/giảm ≠ Đến 31/12) — Biểu 07 của các dòng này sẽ bị chặn.\n' : '')+
    (dut.length ? dut.length+' dòng ĐỨT CHUỖI — Đã giao khác Đến 31/12 của QĐ trước (KH vẫn theo QĐ mới nhất):\n'+dut.slice(0, 8).map(function(d){ return '  · CT '+d.ma+' · '+(F.xa[d.xa] || d.xa)+': '+pbFKiem(d)[1].replace(/^⚠ /, ''); }).join('\n')+
      (dut.length>8 ? '\n  … và '+(dut.length-8)+' dòng nữa' : '')+'\n' : '')+'Vẫn lưu?')) return;   /* 3.478: nêu cụ thể chương trình · xã · chênh */
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
    q.ct = F.dong.filter(function(d){ return d.xa===x; })   /* 3.465: giữ thứ tự chương trình như QĐ */
      .map(function(d){ return {ma:d.ma, ten:d.ten || pbTenCT(d.ma), daGiao:d.daGiao, tangGiam:d.tangGiam, den3112:d.den3112}; });
    q.tong = JSON.parse(JSON.stringify(F.tong || {})); if(F.pgd) q.pgd = F.pgd;   /* 3.465 */
  });
  if(F.ghep && Object.keys(F.ghep).length) dl.ch.xaQD = Object.assign(dl.ch.xaQD || {}, F.ghep);   /* 3.466: nhớ tên xã trên QĐ → mã xã cây */
  if(F.khongId) dl.qdKhong = dl.qdKhong.filter(function(x){ return x.id!==F.khongId; });   /* 3.469: QĐ 0 xã nay có xã → chuyển sang QĐ có số liệu */
  dl.qd.forEach(function(q){ if(pbKhoa(q)===khoaMoi) q.ghi = F.ghi || ''; });   /* ghi chú QĐ (chung các xã) */
  pbGhi(dl); PB.chon = {khoa:khoaMoi, xa:xaMoi[0].charAt(0)==='?' ? '' : xaMoi[0]}; PB.kq = null; PB.F = null; PB.xem = khoaMoi;
  dongHop(); bao('Đã lưu QĐ '+F.so+' — '+xaMoi.length+' xã.', 3); pbKhung();   /* 3.308: vẽ lại cả khung (số QĐ, số lệch trên thanh tab) */
}
function pbFXoa(){
  var F = PB.F; if(F && F.khongId && !F.ids.length){ if(!confirm('Xóa QĐ '+F.so+' (0 xã)?')) return; var dk = pbDL(); dk.qdKhong = dk.qdKhong.filter(function(x){ return x.id!==F.khongId; }); pbGhi(dk); PB.F = null; PB.xem = ''; dongHop(); bao('Đã xóa QĐ '+F.so+'.', 3); return pbKhung(); }   /* 3.469 */
  if(!F || !F.ids.length) return;
  if(!confirm('Xóa QĐ '+F.so+' ngày '+pbNgay(F.ngay)+' — '+F.ids.length+' xã? (app tự chụp khai báo mỗi ngày — khôi phục ở ⚙ Khai báo đơn vị › 💾 Sao lưu)')) return;
  var dl = pbDL(); dl.qd = dl.qd.filter(function(q){ return F.ids.indexOf(q.id)<0; }); pbGhi(dl);
  PB.F = null; PB.chon = {khoa:'', xa:''}; PB.kq = null; dongHop(); bao('Đã xóa QĐ '+F.so+'.', 3); pbKhung();
}

/* ---------- 3.439 (anh 01/11 "bỏ app cũ, nạp QĐ mới" + mẫu Excel chuẩn cho Gemini điền): 📥 Nạp QĐ (Excel mẫu) · ⬇ Tải mẫu ----------
   Đọc (pbTuXls, js/47) → XEM TRƯỚC: lỗi (đỏ, không cho lưu) · cảnh báo vàng (đến 31/12 ≠ đã giao + tăng/giảm, tổng các xã ≠ dòng tổng QĐ, Gemini ghi KHÔNG CHẮC,
   đã giao ≠ đến 31/12 của QĐ trước, chưa ghép được xã) · QĐ trùng (số + ngày + nguồn + xã) → anh chọn ghi đè / bỏ qua. Bấm Lưu mới ghi (KHO1 'pb'). Thay nút nhập file sao lưu WPF. */
var PB_X = null;
function pbNhapXls(el){
  var f = el.files && el.files[0]; if(!f) return; el.value = '';
  if(typeof XLSX==='undefined') return baoLoi('Chưa tải được thư viện đọc Excel — kiểm tra mạng rồi thử lại.');
  f.arrayBuffer().then(function(b){
    var wb = XLSX.read(b, {type:'array'}), sh = {}; ['QD', 'CHI_TIET', 'TONG', 'DANH_MUC'].forEach(function(t){ var w = wb.Sheets[t]; sh[t] = w ? XLSX.utils.sheet_to_json(w, {header:1, raw:true, defval:''}) : null; });
    if(sh.DANH_MUC && sh.DANH_MUC.length>1) return pbXlsDMVao(f.name, sh);   /* 3.465: mẫu mới — chép nguyên bảng danh mục QĐ */
    var r = pbTuXls(sh, Object.keys(typeof TDN_CT!=='undefined' ? TDN_CT : {})), dl = pbDL();   /* mẫu cũ CHI_TIET (dạng dài) vẫn đọc được */
    r.qd.forEach(function(q){ q.xa = pbXaKhop(q.tenXa); if(!q.xa) r.canh.push({so:q.so, xa:q.tenXa, ma:'', ly:'chưa ghép được xã trong cây địa bàn kỳ đang mở (vẫn nhập, sửa QĐ để chọn xã)'});
      q.ct.forEach(function(c){ if(c.daGiao==null) return; var g = pbGoiYDaGiao(dl.qd, q.xa, c.ma, q.nguon, q.ngay, [], null);
        if(g && g.tuQD && g.v!=null && Math.abs(g.v-c.daGiao)>0.0005) r.canh.push({so:q.so, xa:q.tenXa, ma:c.ma, ly:'đã giao '+c.daGiao+' ≠ đến 31/12 của '+g.moTa+' ('+g.v+')'}); }); });
    r.trung = r.qd.filter(function(q){ return dl.qd.some(function(c){ return pbTrungQD(c, q); }); });
    PB_X = {ten:f.name, r:r}; pbXlsVe();
  }).catch(function(er){ baoLoi('Không đọc được file Excel: '+(er && er.message || er)); });
}
function pbTrungQD(c, q){ return String(c.so).trim()===q.so && c.ngay===q.ngay && +c.nguon===+q.nguon && (c.xa && q.xa ? c.xa===q.xa : pbBoDau(c.tenXa)===pbBoDau(q.tenXa)); }
function pbXlsVe(){
  var X = PB_X; if(!X) return; var r = X.r, e = coChuHTML, so = function(v){ return v==null ? '' : pbSoVN(v); };
  var canhK = {}; r.canh.forEach(function(c){ var k = c.so+'|'+pbBoDau(c.xa)+'|'+c.ma; (canhK[k] = canhK[k] || []).push(c.ly); });
  var bang = r.qd.length ? '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi"><thead><tr><th>QĐ</th><th>Ngày</th><th>Nguồn</th><th>Xã</th><th>CT</th><th>Đã giao</th><th>Tăng / giảm</th><th>Đến 31/12</th><th>Cần soát</th></tr></thead><tbody>'+
    r.qd.map(function(q){ return q.ct.map(function(c, i){ var cc = (canhK[q.so+'|'+pbBoDau(q.tenXa)+'|'+c.ma] || []).concat(i ? [] : canhK[q.so+'|'+pbBoDau(q.tenXa)+'|'] || []);
      return '<tr'+(cc.length ? ' class="nb"' : '')+'><td>'+e(q.so+(q.kyHieu || ''))+'</td><td>'+e(pbNgay(q.ngay))+'</td><td class="c">'+pbNguonChu(q.nguon)+'</td><td>'+e(q.tenXa)+(q.xa ? '' : ' <b class="vang">?</b>')+'</td><td class="c" title="'+e(c.ten)+'">'+e(c.ma)+'</td>'+
        '<td class="s">'+so(c.daGiao)+'</td><td class="s">'+so(c.tangGiam)+'</td><td class="s"><b>'+so(c.den3112)+'</b></td><td>'+cc.map(e).join('<br>')+'</td></tr>'; }).join(''); }).join('')+'</tbody></table></div>' : '';
  var tong = r.canh.filter(function(c){ return c.xa==='(tổng)' || (!c.xa && !c.ma); });
  var nut = r.loi.length ? [GD.nut({chu:'Đóng', lenh:'pb.xlsDong', chinh:1})] : r.trung.length ?
    [GD.nut({chu:'Đóng', lenh:'pb.xlsDong'}), GD.nut({chu:'💾 Lưu — bỏ qua '+r.trung.length+' QĐ trùng', lenh:'pb.xlsLuu', du:{k:'bo'}}), GD.nut({chu:'💾 Lưu — ghi đè '+r.trung.length+' QĐ trùng', lenh:'pb.xlsLuu', du:{k:'de'}, chinh:1})] :
    [GD.nut({chu:'Đóng', lenh:'pb.xlsDong'}), GD.nut({chu:'💾 Lưu '+r.qd.length+' lượt xã', lenh:'pb.xlsLuu', du:{k:'moi'}, chinh:1})];
  moHop('<div class="hop-tit">📥 Nạp QĐ từ Excel mẫu — '+e(X.ten)+'</div>'+
    '<div class="hop-phu">'+r.dem.qd+' QĐ · '+r.dem.xa+' lượt xã · '+r.dem.dong+' dòng chi tiết · đơn vị triệu đồng. Soát dòng tô vàng rồi bấm Lưu — chưa lưu thì chưa ghi gì.</div>'+
    (r.loi.length ? '<div class="sl-bao do">✗ File chưa đúng mẫu — sửa rồi nạp lại:<br>'+r.loi.slice(0, 30).map(e).join('<br>')+(r.loi.length>30 ? '<br>… còn '+(r.loi.length-30)+' lỗi' : '')+'</div>' : '')+
    (r.canh.length ? '<div class="sl-bao vang">⚠ '+r.canh.length+' chỗ cần soát (tô vàng)'+(tong.length ? ':<br>'+tong.map(function(c){ return e('QĐ '+c.so+(c.ma ? ' · CT '+c.ma : '')+': '+c.ly); }).join('<br>') : '')+'</div>' : (r.loi.length ? '' : '<div class="sl-bao xanh">✓ Khớp phép tính, khớp dòng tổng.</div>'))+
    (r.trung.length ? '<div class="sl-bao vang">QĐ đã có trong app (cùng số, ngày, nguồn, xã): '+r.trung.map(function(q){ return e('QĐ '+q.so+' · '+q.tenXa); }).join('; ')+'</div>' : '')+
    bang+GD.hang(nut, 1), true);
}
function pbXlsLuu(k){
  var X = PB_X; if(!X || X.r.loi.length) return; var dl = pbDL(), them = 0, de = 0, bo = 0, luc = new Date().toISOString();
  X.r.qd.forEach(function(q){ var cu = dl.qd.filter(function(c){ return pbTrungQD(c, q); });
    if(cu.length && k==='bo'){ bo++; return; }
    if(cu.length){ dl.qd = dl.qd.filter(function(c){ return cu.indexOf(c)<0; }); de++; }
    var x = JSON.parse(JSON.stringify(q)); x.id = 'pb'+Date.now().toString(36)+Math.random().toString(36).slice(2, 7); x.luc = luc; dl.qd.push(x); them++; });
  pbGhi(dl); PB_X = null; dongHop(); bao('Đã lưu '+them+' lượt xã'+(de ? ' (ghi đè '+de+')' : '')+(bo ? ' · bỏ qua '+bo+' trùng' : '')+'.', 4); pbKhung();
}
function pbXlsMau(){   /* ⬇ mẫu Excel trống — 3.465 (anh 04/11): sheet DANH_MUC chép NGUYÊN bảng danh mục QĐ (chương trình → PGD → xã, 3 cột) — mẫu cũ CHI_TIET vẫn nạp được */
  if(typeof XLSX==='undefined') return baoLoi('Chưa tải được thư viện Excel — kiểm tra mạng rồi thử lại.');
  var wb = XLSX.utils.book_new(), ct = typeof TDN_CT!=='undefined' ? TDN_CT : {};
  var hd = [['MẪU NHẬP QUYẾT ĐỊNH GIAO / ĐIỀU CHỈNH KẾ HOẠCH TÍN DỤNG — Tủ hồ sơ (tab 🎯 Phân bổ KH)'], ['Không đổi tên sheet, tên cột; không gộp ô. 1 file = 1 QĐ.'],
    ['QD: 1 dòng — so_qd (chỉ phần số) · ky_hieu (vd /QĐ-BĐDHĐQT) · ngay_qd dd/mm/yyyy · nguon TW hoặc ĐP · loai Giao mới hoặc Điều chỉnh · dot · co_quan · trich_yeu.'],
    ['DANH_MUC: chép NGUYÊN bảng danh mục kèm QĐ, mỗi dòng của QĐ 1 dòng, đúng thứ tự: dòng "KẾ HOẠCH DƯ NỢ" (stt để trống), dòng chương trình (stt I, II, III…), dòng phòng giao dịch (stt 1, 2…), dòng xã / phường (stt 1.1, 1.2…).'],
    ['Cột da_giao · dieu_chinh · den_31_12 đơn vị TRIỆU ĐỒNG, chép đúng số trên QĐ: điều chỉnh ghi +137 / -56, ô "-" ghi 0; không thêm dòng cộng tự tính.'],
    ['App lấy các xã của phòng giao dịch anh chọn, tự kiểm 5 = 3 + 4, tổng các xã = dòng phòng giao dịch, tổng các phòng = dòng chương trình.'], [''],
    ['Lời nhắc cho Gemini: "Đọc quyết định giao / điều chỉnh kế hoạch tín dụng đính kèm. Điền file Excel mẫu: sheet QD (số, ký hiệu, ngày, nguồn TW/ĐP, loại, đợt); '+
      'sheet DANH_MUC chép NGUYÊN bảng danh mục kèm theo QĐ — mỗi dòng của bảng 1 dòng, đúng thứ tự, giữ cột STT (I, 1, 1.1) và tên đơn vị / chương trình như trên QĐ; '+
      'cột da_giao, dieu_chinh, den_31_12 là số triệu đồng chép đúng (điều chỉnh ghi dấu + / -, ô gạch ngang ghi 0); không gộp ô, không tự cộng, không suy đoán số không có trên QĐ."']];
  [['HUONG_DAN', hd], ['QD', [PB_XLS_COT.QD]], ['DANH_MUC', [['stt', 'don_vi_chi_tieu', 'da_giao', 'dieu_chinh', 'den_31_12'], ['', 'KẾ HOẠCH DƯ NỢ', '', '', ''], ['I', 'Chương trình …', '', '', ''], ['1', 'Phòng giao dịch NHCSXH …', '', '', ''], ['1.1', 'Xã / Phường …', '', '', '']]],
    ['DM_CT', [['ma_ct', 'ten_ct', 'viet_tat']].concat(Object.keys(ct).sort().map(function(m){ return [m, ct[m][1], ct[m][0]]; }))]]
    .forEach(function(x){ var w = XLSX.utils.aoa_to_sheet(x[1]); if(x[0]==='DM_CT' || x[0]==='DANH_MUC') Object.keys(w).forEach(function(c){ if(/^A\d+$/.test(c) && c!=='A1') w[c].t = 's'; }); XLSX.utils.book_append_sheet(wb, w, x[0]); });
  giaoFile(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'MAU_NHAP_QD_PHAN_BO_KH.xlsx');
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
      var nho = (PB.kqNho || {})[pbKhoaKQ(q, cd)], kq = q.id===q0.id && PB.kq && PB.kqLuc===pbKhoaKQ(q0, cd) ? PB.kq : nho ? nho.kq : pbPhanBo(q, {cheDo:cd, ap:xaO.ap, duNo:Dn ? pbDuNoXa(Dn, q.xa) : null, ch:ch});
      if(kq.some(function(k){ return k.suaTay; })) r.canh.push(ten+': có ấp SỬA TAY (giữ trong phiên) — kiểm lại trước khi in');
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
  var n = document.getElementById('pb07-nut'); if(n) n.innerHTML = xuatHang({ten:ten, html:function(){ return PB07.x.trang; }, 'in':'pb07Xuat(\'in\')', pdf:'pb07Xuat(\'pdf\')', word:'pb07Word()'});
  xemChuan(document.getElementById('pb07-khung'), PB07.x.trang);
}
/* 3.308 (phản biện 1, anh "theo em"): lưu BẢN CHỤP NHẸ Biểu 07 đã xuất (số từng ấp, lúc xuất, cách) — tra lại khi cần; KHO1 'pb'.b07, tối đa 300 bản */
function pb07Luu(kieu){ var d = pbDL(); d.b07 = Array.isArray(d.b07) ? d.b07 : [];
  PB07.dl.forEach(function(x){ d.b07.unshift({luc:new Date().toISOString(), kieu:kieu, so:x.so, kyHieu:x.kyHieu, ngayQD:x.ngayQD, nguon:x.nguon, xa:x.dv.thuong, ap:x.ap.map(function(a){ return {ten:a.ten, ds:a.ds.map(function(c){ return [c.ma, c.dc, c.nam]; })}; })}); });
  d.b07 = d.b07.slice(0, 300); pbGhi(d); }
function pb07DaXuat(q){ var tx = pbDonVi(q.tenXa || q.xa).thuong, b = (pbDL().b07 || []).filter(function(x){ return x.so===String(q.so || '').trim() && x.ngayQD===String(q.ngay).slice(0, 10) && x.xa===tx; })[0];
  return b ? pbNgay(b.luc.slice(0, 10)).slice(0, 5)+' '+b.luc.slice(11, 16)+' ('+({word:'Word', 'in':'In', pdf:'PDF'}[b.kieu] || b.kieu)+')' : ''; }
function pb07Xuat(kieu){ if(!PB07.x) return; pb07Luu(kieu); if(kieu==='pdf') xuatPDF(); else xuatIn(); }
function pb07Word(){ var x = PB07.x; if(!x) return; pb07Luu('word');
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
    var kl = function(ok, chu){ return '<td>'+(ok ? pbChip('✓ '+(chu || 'Khớp'), 'khop') : pbChip('✗ '+coChuHTML(chu || 'Lệch'), 'lech pb-c-dai'))+'</td>'; };
    var h = '';
    if(g.dau.duNo!=null) h += tr('<td><i>Dư nợ 31/12/'+(+r.nam-1)+'</i></td><td class="so">'+pbSoVN(g.dau.duNo)+'</td><td></td><td></td><td><small>Đã giao QĐ đầu năm '+pbSoVN(g.dau.daGiao)+'</small></td>'+
      kl(g.dau.ok, g.dau.ok ? (g.dau.lech ? 'Khớp (lệch '+pbSoDau(g.dau.lech)+' ≤ ngưỡng)' : 'Khớp') : 'Đầu năm: Đã giao lệch dư nợ '+pbSoDau(g.dau.lech)), g.dau.ok ? 'pb-mo' : 'pb-loi');
    g.ds.forEach(function(x){ var b = x.b07;
      h += tr('<td>QĐ <b>'+coChuHTML(x.q.so)+'</b> · '+pbNgay(x.q.ngay)+(pbLaGiaoMoi(x.q) ? ' · giao mới' : '')+'</td><td class="so">'+(x.daGiao!=null ? pbSoVN(x.daGiao) : '')+'</td><td class="so">'+pbChipTG(x.tangGiam)+'</td><td class="so">'+(x.den!=null ? pbSoVN(x.den) : '')+'</td>'+
        '<td class="so">'+(!b ? '<small>không phân bổ</small>' : b.chua ? '<small class="vang">chưa có ấp</small>' : pbSoVN(b.truoc)+' '+pbSoDau(b.dc)+' → '+pbSoVN(b.nam))+'</td>'+kl(x.ok, x.ok ? '' : x.lyDo.join(' · ')),
        x.ok ? '' : 'pb-loi', {k:pbKhoa(x.q), xa:x.q.xa}); });
    h += tr('<td><i>Cả năm</i></td><td class="so">'+pbSoVN(pbR(g.cuoi.tinh-g.cuoi.tongTG))+'</td><td class="so">'+pbSoDau(g.cuoi.tongTG)+'</td><td class="so">'+pbSoVN(g.cuoi.den)+'</td><td><small>Đã giao đầu + Σ tăng/giảm = '+pbSoVN(g.cuoi.tinh)+'</small></td>'+
      kl(g.cuoi.ok, g.cuoi.ok ? 'Khớp Đến 31/12 QĐ cuối' : 'Chuỗi '+pbSoVN(g.cuoi.tinh)+' ≠ Đến 31/12 QĐ cuối '+pbSoVN(g.cuoi.den)), g.cuoi.ok ? 'tong' : 'tong pb-loi');
    if(g.thucTe!=null){ var tt = Math.round(g.thucTe), chl = pbR(tt - g.cuoi.den);
      h += tr('<td><i>Thực tế '+coChuHTML(slKyChu(r.kyTT))+'</i></td><td></td><td></td><td class="so">'+pbSoVN(tt)+'</td><td><small>so Đến 31/12: '+pbSoDau(chl)+(g.cuoi.den ? ' · đạt '+Math.round(tt/g.cuoi.den*1000)/10+' %' : '')+'</small></td><td><small>tham khảo</small></td>', 'pb-mo pb-tt2'); }
    return '<div class="pb-dc-nhom'+(g.ok ? '' : ' pb-loi')+'"><div class="th-nhom-ten"><b>'+coChuHTML(g.tenXa)+' · '+coChuHTML(pbVT(g.ma))+' ('+g.ma+') · '+pbNguonChu(g.nguon)+'</b> '+(g.ok ? pbChip('✓ khớp', 'khop') : pbChip('✗ lệch', 'lech'))+'</div>'+
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
  var ghi = pbDCGhiNhan(r);   /* 3.308: QĐ chưa ghép xã · tổng lệch Đã giao ↔ dư nợ đầu năm · CT phát sinh dư nợ chưa có QĐ giao */
  o.innerHTML = dau+GD.hang([GD.kv('Năm', '<select data-lenh="pb.dcNam" data-su="change">'+dsN.map(function(n){ return '<option'+(n===nam ? ' selected' : '')+'>'+n+'</option>'; }).join('')+'</select>'),
      GD.chip('Tương đối', cd==='td', 'pb.cheDo', {v:'td'}, 'Biểu 07 tính lại theo cách chia đều'), GD.chip('Chính xác', cd==='cx', 'pb.cheDo', {v:'cx'}, 'Biểu 07 tính lại theo dư nợ Mẫu 31 cuối tháng trước từng QĐ'),
      GD.chip('Chỉ nhóm lệch', PB.dc.chiLech, 'pb.dcLech', {}, 'Ẩn các nhóm xã · CT · nguồn đã khớp')])+
    ghi+'<div class="pb-kpi">'+pbDBThe('Nhóm xã · CT · nguồn', String(t.nhom), t.dong+' lượt QĐ năm '+nam)+pbDBThe('Khớp', String(t.nhom-t.loi), 'đủ 4 điều kiện', t.nhom ? Math.round((t.nhom-t.loi)/t.nhom*1000)/10 : null)+
      pbDBThe('Lệch', String(t.loi), t.loi ? 'xem dòng đỏ bên dưới' : 'không có')+pbDBThe('Đầu năm so dư nợ', r.kyDau ? slKyChu(r.kyDau) : '—', r.kyDau ? 'Mẫu 31 kỳ 12 năm trước' : 'chưa nạp Mẫu 31 kỳ 12/'+(+nam-1))+'</div>'+
    '<div class="sl-bao '+(t.loi ? 'do' : 'xanh')+' pb-dc-tom">'+(t.loi ? '✗ '+t.loi+' / '+t.nhom+' nhóm (xã · CT · nguồn) có lệch' : '✓ Cả '+t.nhom+' nhóm (xã · CT · nguồn) khớp')+' · '+t.dong+' lượt QĐ năm '+nam+
      '<br><small>Mỗi QĐ: Đã giao + Tăng/giảm = Đến 31/12 · Biểu 07: Σ tăng/giảm = số giao, Σ chỉ tiêu năm = Đến 31/12, Σ chỉ tiêu trước = Đã giao · chuỗi: Đã giao = Đến 31/12 QĐ trước'+
      (r.kyDau ? ' · đầu năm so dư nợ '+slKyChu(r.kyDau) : ' · <i>chưa có Mẫu 31 kỳ 12/'+(+nam-1)+' để so đầu năm</i>')+(r.kyTT ? ' · thực tế '+slKyChu(r.kyTT)+' chỉ để tham khảo' : '')+'. Ngưỡng chuỗi ±'+pbSoVN(ng!=null && ng!=='' ? +ng : 1)+' tr.</small></div>'+
    xuatHang({ten:xuatTen('Doi chieu phan bo KH', 'Nam '+nam, ''), html:pbDCIn, dong:'pbDCDong()', dongChu:'‹ Về phân bổ'})+
    '<div id="pb-dc">'+pbDCBang(r)+'</div>';
}
var PB_DC_CSS = '<style>.pb-c{font-weight:bold}.pb-c.khop,.pb-c.tang{color:#1a6e3f}.pb-c.lech,.pb-c.giam{color:#b42318}.pb-c.canh{color:#8a6100}@page{size:A4 landscape;margin:12mm}body{font-family:"Times New Roman",serif;font-size:11pt}table{border-collapse:collapse;width:100%;margin-bottom:6pt}td,th{border:.5pt solid #000;padding:1pt 3pt}.so{text-align:right}'+
  'tr.pb-loi td{background:#fde2e2;-webkit-print-color-adjust:exact;print-color-adjust:exact}.xanh{color:#060}.do{color:#b00}.th-nhom-ten{font-weight:bold;margin-top:6pt}.pb-dc-nhom{break-inside:avoid}</style>';
function pbDCGhiNhan(r){
  var h = '', t = r.tong;
  if(t.chuaGhep) h += '<div class="sl-bao vang">⚠ '+t.chuaGhep+' lượt QĐ năm '+r.nam+' <b>chưa ghép được xã</b> — không đối chiếu; anh mở ✎ QĐ đó, tích đúng xã.</div>';
  var lD = r.dong.filter(function(g){ return g.dau.duNo!=null && g.dau.lech; });   /* phản biện 3 (anh: chỉ ghi nhận, không sửa) */
  if(lD.length) h += '<div class="sl-bao vang">📝 Ghi nhận: <b>'+lD.length+'</b> nhóm xã · CT · nguồn có <b>Đã giao trên QĐ đầu năm khác dư nợ 31/12/'+(+r.nam-1)+'</b> — tổng lệch '+pbSoDau(pbSum(lD, function(g){ return g.dau.lech; }))+' tr (chỉ ghi nhận, không sửa).</div>';
  var Dn = r.kyTT && PB.dn[r.kyTT], Dd = r.kyDau && PB.dn[r.kyDau];
  if(Dn && Dd){ var coQD = {}, gom = {}, thu = []; r.dong.forEach(function(g){ coQD[g.xa+'|'+g.ma+'|'+g.nguon] = 1; });
    Dn.ds.forEach(function(x){ var k = x.xa+'|'+x.ct+'|'+(+x.nguon); if(coQD[k] || !x.xa) return; if(!gom[k]){ gom[k] = {tenXa:x.tenXa || x.xa, xa:x.xa, ct:x.ct, nguon:+x.nguon, dn:0}; thu.push(k); } gom[k].dn += x.dn; });
    var moi = thu.map(function(k){ return gom[k]; }).filter(function(x){ return x.dn>0 && !pbDCTong(Dd, x.xa, x.ct, x.nguon); });   /* đầu năm chưa có dư nợ → CT mới phát sinh */
    if(moi.length) h += '<div class="sl-bao do">✗ <b>'+moi.length+'</b> chương trình <b>phát sinh dư nợ trong năm nhưng chưa có QĐ giao</b> (KH = dư nợ đầu năm = 0 → vượt KH): '+
      moi.slice(0, 12).map(function(x){ return coChuHTML(x.tenXa)+' · '+coChuHTML(pbVT(x.ct))+' '+pbNguonChu(x.nguon)+' '+pbSoVN(Math.round(x.dn/1e6)); }).join(' · ')+(moi.length>12 ? ' …' : '')+'</div>'; }
  return h;
}
function pbDCIn(){ var r = PB.dc.r; if(!r) return '';
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Doi chieu phan bo KH nam '+r.nam+'</title>'+PB_DC_CSS+'</head><body>'+
    '<h3 style="text-align:center;margin:0 0 6pt">ĐỐI CHIẾU CHÉO PHÂN BỔ KẾ HOẠCH NĂM '+r.nam+'</h3><p>'+(r.tong.loi ? r.tong.loi+' / '+r.tong.nhom+' nhóm có lệch' : 'Cả '+r.tong.nhom+' nhóm khớp')+' · '+r.tong.dong+' lượt QĐ · đơn vị: triệu đồng</p>'+pbDCBang(r, true)+'</body></html>'; }
function pbDCDong(){ pbDoiMuc(''); }

/* ---------- lệnh ---------- */
/* ---------- 3.465 (anh 04/11, QĐ mẫu 13821 đợt 7): 📄 ĐỌC QĐ (PDF có chữ) · Excel sheet DANH_MUC — cùng 1 đường: đầu QĐ + danh mục (pbDauQD / pbChuDM / pbXlsDM / pbDanhMuc, js/47)
   → XEM TRƯỚC theo chương trình (dòng chương trình toàn tỉnh · dòng PGD · các xã), chọn PGD (mặc định PGD khai báo), bỏ tích xã, chọn mã CT chưa ghép → Lưu (dùng chung pbXlsLuu). ---------- */
var PB_P = null;
function pbNhapPdf(el){
  var f = el.files && el.files[0]; if(!f) return; el.value = '';
  if(typeof docChuPDF!=='function') return baoLoi('Chưa có bộ đọc PDF.');
  batChay(false, 'Đang đọc QĐ '+f.name+'…');
  docChuPDF(f, 60).then(function(r){ tatChay(); var chu = r && r.chu || '';
    if(!chu.replace(/\s/g, '')) return baoLoi('PDF không có lớp chữ (bản scan / ảnh chụp) — dùng ＋ QĐ mới (nhập tay theo chương trình) hoặc ⬇ mẫu Excel cho Gemini chép bảng.');
    pbPMo(f.name, pbDauQD(chu), pbChuDM(chu), 'pdf'); }, function(er){ tatChay(); baoLoi('Không đọc được PDF: '+(er && er.message || er)); });
}
function pbPMo(ten, dau, rows, nguonNhap){
  var dm = pbDanhMuc(rows, {nho:pbDL().ch.ctQD || {}});
  if(!dm.ct.length) return baoLoi('Không thấy bảng danh mục (chương trình I, II… → phòng giao dịch → xã) trong '+ten+'.');
  var ds = pbPgdDs(dm), k = typeof hsoPGD==='function' ? pbPgdTen(hsoPGD('ngan') || '') : '';
  if(!ds.some(function(x){ return x.k===k; })){ var tot = 0; k = '';   /* PGD có nhiều xã khớp cây địa bàn nhất */
    ds.forEach(function(x){ var p = null; dm.ct.forEach(function(c){ c.pgd.forEach(function(y){ if(!p && pbPgdTen(y.ten)===x.k) p = y; }); });
      var n = p ? p.xa.filter(function(z){ return pbKhopXa(z.ten, PB.dsXa); }).length : 0; if(n>tot){ tot = n; k = x.k; } });
    if(!k && ds[0]) k = ds[0].k; }
  var kb = typeof hsoPGD==='function' ? pbPgdTen(hsoPGD('ngan') || '') : '';
  PB_P = {ten:ten, dau:dau, dm:dm, pgd:k, xa:{}, ma:{}, nguonNhap:nguonNhap, khongPgd:!!kb && !ds.some(function(x){ return x.k===kb; }), kbTen:typeof hsoPGD==='function' ? hsoPGD('ngan') : ''}; pbPVe();   /* 3.467: QĐ không có khối PGD mình */
}
function pbPKetQua(){ var P = PB_P, r = pbQDTuDM(P.dau, P.dm, {pgd:P.pgd, xa:P.xa, ma:P.ma, nguonNhap:P.nguonNhap}), dl = pbDL();
  r.qd.forEach(function(q){ q.xa = pbXaKhop(q.tenXa); });
  r.trung = r.qd.filter(function(q){ return dl.qd.some(function(c){ return pbTrungQD(c, q); }); }); return r; }
/* 3.466: đọc lại QĐ đã có → so sánh cũ ↔ mới từng xã · chương trình (chỉ dòng đổi) */
function pbPSoSanh(r){ var dl = pbDL(), doi = [], giu = 0, e = coChuHTML, ba = function(c){ return c ? [pbSo(c.daGiao), pbSo(c.tangGiam), pbSo(c.den3112)] : [null, null, null]; };
  r.trung.forEach(function(q){ var cu = dl.qd.filter(function(c){ return pbTrungQD(c, q); })[0] || {}, ma = [];
    (cu.ct || []).concat(q.ct || []).forEach(function(c){ if(ma.indexOf(c.ma)<0) ma.push(c.ma); });
    ma.forEach(function(m){ var a = ba((cu.ct || []).filter(function(c){ return c.ma===m; })[0]), b = ba((q.ct || []).filter(function(c){ return c.ma===m; })[0]);
      if(a.join('|')===b.join('|')) giu++; else doi.push([q.tenXa, m, a, b]); }); });
  if(!r.trung.length) return '';
  var o3 = function(x){ return x.every(function(v){ return v==null; }) ? '<i>không có</i>' : pbSo3(0, x[0])+' · '+pbSo3(1, x[1])+' · <b>'+pbSo3(2, x[2])+'</b>'; };
  return '<div class="sl-bao vang">So với QĐ đã lưu: <b>'+doi.length+'</b> dòng thay đổi · '+giu+' dòng giữ nguyên'+(doi.length ? ' — Lưu ghi đè để cập nhật.' : ' — số giống hệt, không cần ghi đè.')+'</div>'+
    (doi.length ? '<div class="to-bang-cuon"><table class="to-bang luoi pb-x-bang"><thead><tr><th>Xã</th><th>Chương trình</th><th>Đã lưu (3 · 4 · 5)</th><th>Đọc mới (3 · 4 · 5)</th></tr></thead><tbody>'+
      doi.map(function(x){ return '<tr class="nb"><td>'+e(x[0])+'</td><td>'+e(x[1]+' '+pbVT(x[1]))+'</td><td class="s">'+o3(x[2])+'</td><td class="s">'+o3(x[3])+'</td></tr>'; }).join('')+'</tbody></table></div>' : ''); }
function pbPVe(){
  var P = PB_P; if(!P) return; var e = coChuHTML, d = P.dau, r = pbPKetQua(), dsP = pbPgdDs(P.dm), ctDs = Object.keys(typeof TDN_CT!=='undefined' ? TDN_CT : {}).sort();
  var sel = function(f, gt, ds){ return '<select data-lenh="pb.pDau" data-su="change" data-f="'+f+'">'+ds.map(function(x){ return '<option value="'+e(x[0])+'"'+(String(x[0])===String(gt) ? ' selected' : '')+'>'+e(x[1])+'</option>'; }).join('')+'</select>'; };
  var pXa = null; P.dm.ct.forEach(function(c){ c.pgd.forEach(function(p){ if(!pXa && pbPgdTen(p.ten)===P.pgd) pXa = p; }); });
  var thieu = []; if(!d.so) thieu.push('số QĐ'); if(!d.ngay) thieu.push('ngày QĐ'); if(!+d.nguon) thieu.push('nguồn'); if(!d.loai) thieu.push('loại');
  var bang = P.dm.ct.map(function(c, ci){ var ma = P.ma[pbCTTen(c.ten)] || c.ma, p = null; c.pgd.forEach(function(y){ if(!p && pbPgdTen(y.ten)===P.pgd) p = y; });
    var h = '<tr class="pb-p-ct"><td>'+e(c.stt)+'</td><td><b>'+e(c.ten)+'</b> → <select data-lenh="pb.pMa" data-su="change" data-t="'+e(pbCTTen(c.ten))+'"'+(ma ? '' : ' class="pb-chua"')+'><option value="">— chọn mã CT —</option>'+
      ctDs.map(function(m){ return '<option value="'+m+'"'+(m===ma ? ' selected' : '')+'>'+m+' '+e(pbVT(m))+'</option>'; }).join('')+'</select> <small>toàn tỉnh</small></td>'+[0, 1, 2].map(function(j){ return '<td class="s">'+pbSo3(j, c.so[j])+'</td>'; }).join('')+'</tr>';
    if(!p) return h+'<tr><td></td><td colspan="4"><small class="vang">PGD đã chọn không có trong chương trình này</small></td></tr>';
    h += '<tr class="pb-p-pgd"><td>'+e(p.stt)+'</td><td><b>'+e(p.ten)+'</b></td>'+[0, 1, 2].map(function(j){ return '<td class="s"><b>'+pbSo3(j, p.so[j])+'</b></td>'; }).join('')+'</tr>';
    return h+p.xa.map(function(x){ var bo = P.xa[pbBoDau(x.ten)]===false, lech = x.so[0]!=null && x.so[1]!=null && x.so[2]!=null && Math.abs(pbR(x.so[0]+x.so[1])-x.so[2])>0.0005;
      return '<tr class="'+(bo ? 'pb-p-bo' : lech ? 'nb' : '')+'"><td>'+e(x.stt)+'</td><td>'+e(x.ten)+(pbXaKhop(x.ten) ? '' : ' <b class="vang" title="Chưa ghép được xã trong cây địa bàn — lưu xong ✎ Sửa nhanh › ghép xã">?</b>')+(lech ? ' <small class="do">3 + 4 ≠ 5</small>' : '')+'</td>'+
        [0, 1, 2].map(function(j){ return '<td class="s">'+pbSo3(j, x.so[j])+'</td>'; }).join('')+'</tr>'; }).join(''); }).join('');
  var canh = P.dm.canh.filter(function(c){ return !c.pgd || pbPgdTen(c.pgd)===P.pgd; }).concat(r.canh), canhKhac = P.dm.canh.length-P.dm.canh.filter(function(c){ return !c.pgd || pbPgdTen(c.pgd)===P.pgd; }).length;
  var coLuu = !thieu.length && r.qd.length;
  var nut = !coLuu ? [GD.nut({chu:'Đóng', lenh:'pb.pDong', chinh:1})] : r.trung.length ?
    [GD.nut({chu:'Đóng', lenh:'pb.pDong'}), GD.nut({chu:'💾 Lưu — bỏ qua '+r.trung.length+' xã trùng', lenh:'pb.pLuu', du:{k:'bo'}}), GD.nut({chu:'💾 Lưu — ghi đè '+r.trung.length+' xã trùng', lenh:'pb.pLuu', du:{k:'de'}, chinh:1})] :
    [GD.nut({chu:'Đóng', lenh:'pb.pDong'}), GD.nut({chu:'💾 Lưu '+r.qd.length+' xã', lenh:'pb.pLuu', du:{k:'moi'}, chinh:1})];
  moHop('<div class="hop-tit">'+(P.nguonNhap==='pdf' ? '📄 Đọc QĐ (PDF)' : '📥 Nạp QĐ (Excel — bảng danh mục)')+' — '+e(P.ten)+'</div>'+
    '<div class="hop-phu">Đọc được '+P.dm.ct.length+' chương trình · '+dsP.length+' phòng giao dịch · đơn vị triệu đồng. Soát phần đầu, PGD, xã, mã chương trình rồi bấm Lưu — chưa lưu thì chưa ghi gì.</div>'+
    '<div id="pb-p">'+GD.hang([GD.kv('Số QĐ', GD.o({loai:'ten', gt:d.so, lenh:'pb.pDau', du:{f:'so'}})), GD.kv('Ký hiệu', GD.o({loai:'ten', gt:d.kyHieu, lenh:'pb.pDau', du:{f:'kyHieu'}})),
      GD.kv('Ngày QĐ', GD.o({loai:'ngay', gt:d.ngay ? pbNgay(d.ngay) : '', ph:'gõ liền số', lenh:'pb.pDau', du:{f:'ngay'}})), GD.kv('Nguồn', sel('nguon', d.nguon, [[0, '— chọn —'], [1, 'TW'], [2, 'ĐP']])),
      GD.kv('Loại', sel('loai', d.loai, [['', '— chọn —'], ['Giao mới', 'Giao mới'], ['Điều chỉnh', 'Điều chỉnh']])), GD.kv('Đợt', GD.o({loai:'so', gt:d.dot, lenh:'pb.pDau', du:{f:'dot'}}))])+
    GD.hang([GD.kv('Phòng giao dịch', '<select data-lenh="pb.pPgd" data-su="change">'+dsP.map(function(x){ return '<option value="'+e(x.k)+'"'+(x.k===P.pgd ? ' selected' : '')+'>'+e(x.ten)+' · '+x.soXa+' xã</option>'; }).join('')+'</select>')])+
    (pXa ? '<div class="pb-f-xa"><b>Xã / phường lấy:</b> '+pXa.xa.map(function(x){ var k = pbBoDau(x.ten); return '<label class="hso-o2"><input type="checkbox" data-lenh="pb.pXa" data-su="change" data-k="'+e(k)+'"'+(P.xa[k]===false ? '' : ' checked')+'> '+e(x.ten)+'</label>'; }).join(' ')+'</div>' : '')+
    (thieu.length ? '<div class="sl-bao do">Chưa đọc được: '+thieu.join(', ')+' — gõ / chọn ở trên.</div>' : '')+
    (P.khongPgd ? '<div class="sl-bao vang">QĐ này <b>không có khối của PGD '+e(P.kbTen)+'</b> — tỉnh không giao cho PGD đợt này. '+GD.nut({chu:'📄 Lưu số QĐ (không giao cho PGD)', lenh:'pb.pKhong', chinh:1})+'</div>' : '')+
    (canh.length ? '<div class="sl-bao vang">⚠ '+canh.length+' chỗ cần soát:<br>'+canh.slice(0, 20).map(function(c){ return e((c.ct ? c.ct+(c.pgd ? ' · '+c.pgd : '')+(c.xa ? ' · '+c.xa : '')+': ' : '')+c.ly); }).join('<br>')+'</div>'
      : '<div class="sl-bao xanh">✓ Khớp: từng dòng 3 + 4 = 5, tổng các xã = dòng PGD, tổng các PGD = dòng chương trình'+(canhKhac ? ' (PGD khác có '+canhKhac+' chỗ lệch — không ảnh hưởng)' : '')+'.</div>')+
    (P.dm.boMuc ? '<div class="sl-phu">Bỏ qua '+P.dm.boMuc+' dòng ngoài mục KẾ HOẠCH DƯ NỢ.</div>' : '')+
    (r.trung.length ? '<div class="sl-bao vang">Đã có trong app (cùng số, ngày, nguồn, xã): '+r.trung.map(function(q){ return e(q.tenXa); }).join(', ')+'</div>'+pbPSoSanh(r) : '')+
    '<div class="to-bang-cuon to-cuon-khung"><table class="to-bang luoi pb-p-bang"><thead><tr><th>STT</th><th>Đơn vị / chỉ tiêu</th><th>Chỉ tiêu KH đã giao</th><th>Điều chỉnh đợt này</th><th>Đến 31/12</th></tr></thead><tbody>'+bang+'</tbody></table></div>'+
    GD.hang(nut, 1)+'</div>', true);
}
function pbPLuu(k){ var P = PB_P; if(!P) return; var r = pbPKetQua(), dl = pbDL();
  dl.ch.ctQD = dl.ch.ctQD || {}; P.dm.ct.forEach(function(c){ var t = pbCTTen(c.ten), ma = P.ma[t] || c.ma; if(ma) dl.ch.ctQD[t] = ma; }); pbGhi(dl);   /* nhớ tên CT trên QĐ → mã cho lần sau */
  PB_X = {ten:P.ten, r:{qd:r.qd, loi:[], canh:[], trung:r.trung, dem:{}}}; PB_P = null; pbXlsLuu(k); }
/* Excel mẫu mới: sheet QD (dòng đầu) + DANH_MUC (chép nguyên bảng QĐ) → cùng màn xem trước */
function pbXlsDMVao(ten, sh){ var loi = [], Q = pbXlsBang(sh.QD, 'QD', loi)[0] || {}, rows = pbXlsDM(sh.DANH_MUC);
  if(rows===null) return baoLoi('Sheet DANH_MUC thiếu cột — cần: stt, don_vi_chi_tieu, da_giao, dieu_chinh, den_31_12 (tải lại mẫu).');
  var loai = String(Q.loai || '').trim();
  pbPMo(ten, {so:String(Q.so_qd==null ? '' : Q.so_qd).trim(), kyHieu:String(Q.ky_hieu || '').trim(), ngay:pbXlsNgay(Q.ngay_qd), nguon:pbNguon(Q.nguon),
    loai:/^điều chỉnh$/i.test(loai) ? 'Điều chỉnh' : /^giao mới$/i.test(loai) ? 'Giao mới' : '', dot:String(Q.dot==null ? '' : Q.dot).trim()}, rows, 'xls'); }

/* ---------- 3.465 (anh 04/11 "khi hiện thì cho chọn qua lại cả 2 kiểu: theo xã (các chương trình của xã) hoặc theo chương trình (các xã có giao), hiện đủ 3 cột như trên QĐ để đối chiếu") ---------- */
function pbQDXem(){
  var o = document.getElementById('pb-phai'); if(!o) return; if(PB.xem==='__dtg') return pbDTGVe(o);   /* 3.467 */
  if(/^k:/.test(PB.xem || '') && pbKhongXem(o)) return;   /* 3.469: QĐ 0 xã */
  var nh = pbNhom(); if(!nh.length){ o.innerHTML = pbDL().qdKhong.length ? '<div class="sl-phu">Bấm <b>📅 Dòng thời gian QĐ</b> để xem các QĐ đã ghi.</div>' : ''; return; }
  var g = nh.filter(function(x){ return x.k===PB.xem; })[0] || nh[0], q0 = g.ds[0], kieu = D.cauHinh.pbKieuQD==='xa' ? 'xa' : 'ct', e = coChuHTML, h = '';
  if(PB.F && PB.F.noi==='phai'){   /* 3.466: ✎ Sửa nhanh ngay tại bảng — cùng bộ sửa với hộp QĐ */
    o.innerHTML = '<div class="th-nhom-ten"><b>✎ Sửa nhanh QĐ '+e(q0.so+(q0.kyHieu || ''))+' · '+pbNgay(q0.ngay)+'</b> <small>triệu đồng · Lưu / Bỏ ở cuối bảng</small></div><div id="pb-f" class="pb-f-phai"></div>'; pbFVe(); return; }
  var cs = function(c){ return [pbSo(c.daGiao), pbSo(c.tangGiam), pbSo(c.den3112)]; }, cong = function(ds){ return [0, 1, 2].map(function(j){ return pbSum(ds, function(x){ return x[j] || 0; }); }); };
  var kiem = function(x){ return x[0]!=null && x[1]!=null && x[2]!=null && Math.abs(pbR(x[0]+x[1])-x[2])>0.0005 ? pbChip('✗ 3 + 4 ≠ 5', 'lech') : ''; };
  var rows = [];   /* 3.467: dòng cho Excel bảng đang xem */
  var dong = function(ten, x, lop, ghi){ var dam = lop==='pb-x-ct'; rows.push([String(ten).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'), x[0], x[1], x[2], String(ghi || '').replace(/<[^>]+>/g, '')]);   /* 3.467 (anh 04/11): dòng tổng in đậm cả 3 cột, dòng con in thường */
    return '<tr class="'+lop+'"><td>'+ten+'</td>'+[0, 1, 2].map(function(j){ var v = pbSo3(j, x[j]); return '<td class="s">'+(dam ? '<b>'+v+'</b>' : v)+'</td>'; }).join('')+'<td>'+(ghi || '')+'</td></tr>'; };
  var maThu = []; g.ds.forEach(function(q){ (q.ct || []).forEach(function(c){ if(maThu.indexOf(c.ma)<0) maThu.push(c.ma); }); });   /* thứ tự như QĐ */
  if(kieu==='ct') maThu.forEach(function(ma, i){ var xs = g.ds.map(function(q){ return {q:q, c:(q.ct || []).filter(function(c){ return c.ma===ma; })[0]}; }).filter(function(x){ return x.c; });
      var sum = cong(xs.map(function(x){ return cs(x.c); })), t = ((q0.tong || {})[ma] || [])[1], lech = t!=null && Math.abs(t-sum[1])>0.0005;   /* 3.468: chỉ so cột điều chỉnh */
      h += dong('<b>'+(PB_LA[i] || i+1)+'. '+ma+' '+e(pbVT(ma))+' — '+e(pbTenCT(ma))+'</b>', sum, 'pb-x-ct', (t!=null ? (lech ? pbChip('✗ Σ điều chỉnh '+xs.length+' xã ≠ PGD '+pbSoDau(t), 'lech') : pbChip('✓ khớp điều chỉnh PGD', 'khop'))+' ' : '')+'<small>Σ '+xs.length+' xã</small>');
      xs.forEach(function(x){ h += dong('&nbsp;&nbsp;&nbsp;'+e(x.q.tenXa || x.q.xa), cs(x.c), '', kiem(cs(x.c))); }); });
  else g.ds.forEach(function(q){ var cc = (q.ct || []).slice().sort(function(a, b){ return maThu.indexOf(a.ma)-maThu.indexOf(b.ma); });
      h += dong('<b>📍 '+e(q.tenXa || q.xa)+'</b>', cong(cc.map(cs)), 'pb-x-ct', '<small>'+cc.length+' chương trình</small>');
      cc.forEach(function(c){ h += dong('&nbsp;&nbsp;&nbsp;'+e(c.ma+' '+pbVT(c.ma)+' — '+pbTenCT(c.ma)), cs(c), '', kiem(cs(c))); }); });
  var nam = String(q0.ngay || '').slice(0, 4);
  o.innerHTML = '<div class="th-nhom-ten"><b>📋 QĐ '+e(q0.so+(q0.kyHieu || ''))+' · '+pbNgay(q0.ngay)+'</b> <small>nguồn '+pbNguonChu(q0.nguon)+' · '+e(q0.loai || '')+(q0.dot ? ' · đợt '+e(q0.dot) : '')+(q0.pgd ? ' · '+e(q0.pgd) : '')+' · '+g.ds.length+' xã · triệu đồng</small></div>'+
    GD.hang([GD.chip('Theo chương trình', kieu==='ct', 'pb.kieuQD', {v:'ct'}, 'Mỗi chương trình: dòng PGD trên QĐ + các xã có giao (như danh mục QĐ)'), GD.chip('Theo xã', kieu==='xa', 'pb.kieuQD', {v:'xa'}, 'Mỗi xã: các chương trình của xã'),
      GD.nut({chu:'✎ Sửa nhanh', lenh:'pb.suaNhanh', du:{k:g.k}, chinh:1, tit:'Sửa số ngay tại bảng này'}), GD.nut({chu:'✎ Sửa (hộp)', lenh:'pb.sua', du:{k:g.k}, tit:'Mở hộp sửa QĐ'}),
      GD.nut({chu:'⧉ QĐ kế tiếp', lenh:'pb.ke', du:{k:g.k}, tit:'QĐ đợt sau: chép xã + chương trình, Đã giao = Đến 31/12 của QĐ này'})])+
    '<div class="to-bang-cuon"><table class="to-bang luoi pb-x-bang"><thead><tr><th>Đơn vị / chỉ tiêu</th><th>Chỉ tiêu KH đã giao</th><th>Điều chỉnh đợt này</th><th>Đến 31/12'+(nam ? '/'+nam : '')+'</th><th>Kiểm tra</th></tr></thead><tbody>'+h+'</tbody></table></div>'+
    xuatHang({ten:xuatTen('QD '+q0.so+' phan bo KH', kieu==='xa' ? 'Theo xa' : 'Theo chuong trinh', ''), html:pbQDIn, excel:'pbQDExcel()'});
  var tieu = 'QĐ '+q0.so+(q0.kyHieu || '')+' ngày '+pbNgay(q0.ngay)+' · nguồn '+pbNguonChu(q0.nguon)+' · '+(q0.loai || '')+(q0.dot ? ' · đợt '+q0.dot : '')+(q0.pgd ? ' · '+q0.pgd : '')+' · đơn vị: triệu đồng';
  PB.qdIn = {tieu:tieu, bang:'<table class="to-bang luoi pb-x-bang">'+o.querySelector('.pb-x-bang').innerHTML+'</table>', rows:rows, nam:nam, so:q0.so};   /* 3.467 (anh 04/11 "xuất số liệu đã lưu để kiểm tra đối chiếu") */
}
/* Enter trong bảng nhập QĐ = xuống ô dòng dưới CÙNG CỘT (bỏ qua dòng không có ô) — bắt trước bộ chuyển ô chung (js/06) */
window.addEventListener('keydown', function(ev){ if(ev.key!=='Enter' || ev.shiftKey || ev.ctrlKey || ev.metaKey || ev.altKey) return; var t = ev.target;
  if(!t || t.tagName!=='INPUT' || !t.closest || !t.closest('#pb-f-bang')) return;
  var td = t.closest('td'), ci = td ? td.cellIndex : -1, r = td && td.parentNode.nextElementSibling;
  while(r){ var c = r.cells[ci], o = c && c.querySelector('input'); if(o && (r.cells.length>ci+1)){ ev.preventDefault(); ev.stopImmediatePropagation(); o.focus(); if(o.select) o.select(); return; } r = r.nextElementSibling; } }, true);
/* 3.467: danh sách QĐ gọn — 1 QĐ 1 dòng: số · ngày · nguồn · đợt · loại · số xã · Σ điều chỉnh PGD; bấm → bảng bên phải */
function pbGonHTML(nh){ var e = coChuHTML, xem = PB.xem || (nh[0] || {}).k;
  return '<div class="pb-gon">'+pbVaKhong(nh).map(function(g){ if(g.khong) return pbKhongTheHTML(g.khong, true); var q0 = g.ds[0], giao = /giao mới/i.test(q0.loai), tg = 0, loi = false;
      g.ds.forEach(function(q){ (q.ct || []).forEach(function(c){ tg = pbR(tg + (pbSo(c.tangGiam) || 0)); if(pbKiemNhapQD(c)) loi = true; }); });
      return '<div class="pb-gon-dong '+(giao ? 'pb-gm' : 'pb-dc')+(PB.che==='qd' && xem===g.k ? ' bat' : '')+'" data-lenh="pb.xem" data-k="'+e(g.k)+'" title="Bấm để xem bảng bên phải">'+
        '<b>QĐ '+e(q0.so)+'</b><span>'+pbNgay(q0.ngay)+'</span><span>'+pbNguonChu(q0.nguon)+'</span>'+(q0.dot ? '<span title="đợt '+e(q0.dot)+'">đ'+e(q0.dot)+'</span>' : '')+
        '<span title="'+(giao ? 'Giao mới' : 'Điều chỉnh')+'">'+(giao ? 'GM' : 'ĐC')+'</span><span>'+g.ds.length+' xã</span>'+pbChipTG(tg)+(loi ? pbChip('✗', 'lech') : '')+GD.nut({chu:'✎', lenh:'pb.sua', du:{k:g.k}, tit:'Sửa QĐ', lop:'pb-nho'})+'</div>'; }).join('')+'</div>'; }
/* 3.467 (anh 04/11 "em cũng nên xuất số liệu đã lưu để kiểm tra đối chiếu xem số liệu đã nhập có đúng không"): xuất bảng QĐ đang xem + xuất toàn bộ QĐ đã lưu */
function pbQDIn(){ var x = PB.qdIn; if(!x) return ''; return PB_DC_CSS+'<style>.pb-x-ct td{font-weight:bold;background:#eef4fa}td.s{text-align:right}</style><h3 style="text-align:center;margin:0 0 4px">SỐ LIỆU QĐ ĐÃ NHẬP — ĐỐI CHIẾU</h3><p style="text-align:center;margin:0 0 8px">'+coChuHTML(x.tieu)+'</p>'+x.bang; }
function pbXlsXong(ten, sheets){ Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    if(!window.XLSX) throw new Error('Chưa tải được bộ Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new(); sheets.forEach(function(sh){ XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sh[1]), sh[0]); });
    giaoFile(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), ten+'.xlsx');
  }).catch(function(er){ baoLoi(er && er.message || String(er)); }); }
function pbQDExcel(){ var x = PB.qdIn; if(!x) return;
  pbXlsXong(xuatTen('QD '+x.so+' phan bo KH', '', ''), [['QD', [[x.tieu], [], ['Đơn vị / chỉ tiêu', 'Chỉ tiêu KH đã giao', 'Điều chỉnh đợt này', 'Đến 31/12/'+x.nam, 'Kiểm tra']].concat(x.rows)]]); }
function pbXuatTat(){
  var dl = pbDL(), nh = pbNhom(), so = function(v){ return v==null ? '' : v; }, ba = function(c){ return [pbSo(c.daGiao), pbSo(c.tangGiam), pbSo(c.den3112)]; };
  if(!nh.length && !dl.qdKhong.length) return baoLoi('Chưa có QĐ nào để xuất.');
  var ds = [['STT', 'Năm', 'Nguồn', 'Số QĐ', 'Ngày', 'Loại', 'Đợt', 'Giao cho PGD', 'Σ điều chỉnh PGD (triệu)', 'Ghi chú']];
  pbDongThoiGian(nh, dl.qdKhong).forEach(function(b){ b.ds.forEach(function(x){ if(x.thieu!=null) ds.push(['', b.nam, pbNguonChu(b.nguon), '', '', '', x.thieu, '', '', 'THIẾU ĐỢT '+x.thieu+' — chưa nhập']);
    else ds.push([x.stt, b.nam, pbNguonChu(b.nguon), x.so+(x.kyHieu || ''), pbNgay(x.ngay), x.loai || '', x.dot || '', x.khong ? 'không giao cho PGD' : x.soXa+' xã', x.khong ? '' : x.tg, x.ghi || '']); }); });
  var qd = [['Đơn vị / chỉ tiêu', 'Chỉ tiêu KH đã giao', 'Điều chỉnh đợt này', 'Đến 31/12', 'Kiểm tra']], ct = [['Số QĐ', 'Ngày', 'Nguồn', 'Loại', 'Đợt', 'Xã', 'Mã CT', 'Chương trình', 'Đã giao', 'Điều chỉnh', 'Đến 31/12', 'Kiểm 3 + 4 = 5']];
  nh.slice().reverse().forEach(function(g){ var q0 = g.ds[0], ma = [];
    g.ds.forEach(function(q){ (q.ct || []).forEach(function(c){ if(ma.indexOf(c.ma)<0) ma.push(c.ma); }); });
    qd.push([]); qd.push(['QĐ '+q0.so+(q0.kyHieu || '')+' ngày '+pbNgay(q0.ngay)+' · '+pbNguonChu(q0.nguon)+' · '+(q0.loai || '')+(q0.dot ? ' · đợt '+q0.dot : '')+' · '+g.ds.length+' xã']);
    ma.forEach(function(m, i){ var xs = g.ds.map(function(q){ return {q:q, c:(q.ct || []).filter(function(c){ return c.ma===m; })[0]}; }).filter(function(x){ return x.c; });
      var sum = [0, 1, 2].map(function(j){ return pbSum(xs, function(x){ return ba(x.c)[j] || 0; }); }), t = (q0.tong || {})[m];
      var t1 = t ? t[1] : null, lech = t1!=null && Math.abs(t1-sum[1])>0.0005;   /* 3.468: chỉ so cột điều chỉnh */
      qd.push([(PB_LA[i] || i+1)+'. '+m+' '+pbVT(m)+' — '+pbTenCT(m)+' (Σ các xã)'].concat(sum.map(so)).concat([t1!=null ? (lech ? 'Σ điều chỉnh xã ≠ dòng PGD ('+t1+')' : 'khớp điều chỉnh PGD') : '']));
      xs.forEach(function(x){ var v = ba(x.c), l = v[0]!=null && v[1]!=null && v[2]!=null && Math.abs(pbR(v[0]+v[1])-v[2])>0.0005;
        qd.push(['   '+(x.q.tenXa || x.q.xa)].concat(v.map(so)).concat([l ? '3 + 4 ≠ 5' : '']));
        ct.push([q0.so+(q0.kyHieu || ''), pbNgay(q0.ngay), pbNguonChu(q0.nguon), q0.loai || '', q0.dot || '', x.q.tenXa || x.q.xa, m, pbTenCT(m)].concat(v.map(so)).concat([l ? 'LỆCH' : 'khớp'])); }); }); });
  /* anh 04/11 "xuất ra 1 file đầy đủ như file đã nhập để cho các AI khác rà soát lại": sheet QD + mỗi QĐ 1 sheet DM_<số> đúng cột DANH_MUC của mẫu nhập + lời nhắc rà soát */
  var qdM = [PB_XLS_COT.QD.concat(['so_xa', 'ghi_chu'])], dm = [];
  nh.slice().reverse().forEach(function(g){ var q0 = g.ds[0], ma = [], a = [['stt', 'don_vi_chi_tieu', 'da_giao', 'dieu_chinh', 'den_31_12', 'ghi_chu'], ['', 'KẾ HOẠCH DƯ NỢ', '', '', '', '']];
    qdM.push([q0.so, q0.kyHieu || '', pbNgay(q0.ngay), pbNguonChu(q0.nguon), q0.loai || '', q0.dot || '', '', '', g.ds.length, '']);
    g.ds.forEach(function(q){ (q.ct || []).forEach(function(c){ if(ma.indexOf(c.ma)<0) ma.push(c.ma); }); });
    ma.forEach(function(m, i){ var xs = g.ds.map(function(q){ return {q:q, c:(q.ct || []).filter(function(c){ return c.ma===m; })[0]}; }).filter(function(x){ return x.c; }), t = (q0.tong || {})[m];
      var sum = [0, 1, 2].map(function(j){ return pbSum(xs, function(x){ return ba(x.c)[j] || 0; }); }), ten = ((xs[0] || {}).c || {}).ten || pbTenCT(m);
      a.push([PB_LA[i] || String(i+1), ten, '', '', '', 'mã '+m+' — dòng toàn tỉnh: app không lưu (chỉ lưu PGD mình)']);
      var tP = [0, 1, 2].map(function(j){ return t && t[j]!=null ? t[j] : sum[j]; });   /* dòng PGD: số trên QĐ (đọc PDF / Excel đủ 3 cột; nhập tay chỉ điều chỉnh) — thiếu thì Σ các xã */
      a.push(['1', q0.pgd || 'Phòng giao dịch (PGD đang dùng app)'].concat(tP.map(so)).concat([t && t[0]!=null ? 'dòng PGD trên QĐ' : t && t[1]!=null ? 'điều chỉnh: dòng PGD trên QĐ · đã giao, đến 31/12: Σ các xã' : 'Σ các xã']));
      xs.forEach(function(x, k){ a.push(['1.'+(k+1), x.q.tenXa || x.q.xa].concat(ba(x.c).map(so)).concat([''])); }); });
    dm.push(['DM_'+String(q0.so).replace(/[^\w]/g, '').slice(0, 25), a]); });
  dl.qdKhong.forEach(function(q){ qdM.push([q.so, q.kyHieu || '', pbNgay(q.ngay), pbNguonChu(q.nguon), q.loai || '', q.dot || '', '', '', 0, 'KHÔNG GIAO CHO PGD'+(q.ghi ? ' — '+q.ghi : '')]); });
  var hd = [['SỐ LIỆU QĐ GIAO / ĐIỀU CHỈNH KẾ HOẠCH ĐÃ NHẬP VÀO TỦ HỒ SƠ — để rà soát với QĐ gốc'], ['Đơn vị: triệu đồng. Chỉ có số của phòng giao dịch đang dùng app (các xã của PGD) — dòng chương trình toàn tỉnh để trống.'],
    ['QD: danh sách QĐ (cột như mẫu nhập + số xã). DM_<số QĐ>: mỗi QĐ 1 sheet, đúng cột DANH_MUC của mẫu nhập (stt, don_vi_chi_tieu, da_giao, dieu_chinh, den_31_12).'],
    ['DANH_SACH: dòng thời gian (STT theo ngày, đợt sót). THEO_QD: từng QĐ như danh mục. CHI_TIET: xã × chương trình, kiểm 3 + 4 = 5.'], [''],
    ['Lời nhắc cho AI rà soát: "Đính kèm file PDF / ảnh các quyết định giao / điều chỉnh kế hoạch tín dụng và file Excel này. Với từng QĐ ở sheet QD: kiểm số, ký hiệu, ngày, nguồn (TW / ĐP), loại, đợt; '+
      'mở sheet DM_<số QĐ> tương ứng, so từng dòng phòng giao dịch và từng xã với bảng danh mục trên QĐ gốc (3 cột: chỉ tiêu đã giao, điều chỉnh đợt này, đến 31/12). '+
      'Liệt kê MỌI chỗ khác nhau theo dạng: số QĐ · chương trình · xã · cột · số trong Excel · số trên QĐ. Báo thêm QĐ có trên giấy mà thiếu trong Excel, xã / chương trình bị thiếu hoặc thừa. Không tự sửa file."']];
  pbXlsXong(xuatTen('So lieu QD da luu phan bo KH', '', ''), [['DANH_SACH', ds], ['THEO_QD', qd], ['CHI_TIET', ct], ['QD', qdM]].concat(dm).concat([['HUONG_DAN_AI', hd]]));
}
/* ---------- 3.467 (anh 04/11): 📅 DÒNG THỜI GIAN QĐ (STT từ QĐ đầu tiên, soát đợt sót) · QĐ KHÔNG GIAO CHO PGD (chỉ số QĐ) ---------- */
function pbVaKhong(nh){   /* 3.469: danh sách QĐ chung — nhóm QĐ có số liệu + QĐ 0 xã (không giao cho PGD), xếp ngày giảm dần */
  var ds = nh.map(function(g){ return {ngay:(g.ds[0] || {}).ngay || '', g:g}; }).concat(pbDL().qdKhong.map(function(q){ return {ngay:q.ngay || '', g:{khong:q}}; }));
  return ds.sort(function(a, b){ return a.ngay < b.ngay ? 1 : a.ngay > b.ngay ? -1 : 0; }).map(function(x){ return x.g; }); }
function pbKhongTheHTML(q, gon){ var e = coChuHTML, bat = PB.xem==='k:'+q.id ? ' bat' : '';
  var dau = '<b>QĐ '+e(q.so+(q.kyHieu || ''))+'</b> · '+pbNgay(q.ngay)+' · '+pbNguonChu(q.nguon)+(q.dot ? ' · đợt '+e(q.dot) : '')+(q.loai ? ' · '+e(q.loai) : '');
  var nut = GD.nut({chu:'✎', lenh:'pb.khongSua', du:{id:q.id}, lop:'pb-nho', tit:'Sửa QĐ (tích thêm xã nếu nhìn nhầm)'});
  if(gon) return '<div class="pb-gon-dong pb-khong'+bat+'" data-lenh="pb.xem" data-k="k:'+e(q.id)+'" title="Bấm để xem">'+dau+' — <b>0 xã</b> <i>không giao cho PGD</i> '+nut+'</div>';
  return '<div class="pb-nhom pb-khong"><div class="pb-nhom-dau'+bat+'" data-lenh="pb.xem" data-k="k:'+e(q.id)+'" title="Bấm để xem">📄 '+dau+' — <b>0 xã</b> <i>(tỉnh không giao cho PGD)</i> '+nut+'</div>'+
    (q.ghi ? '<div class="sl-phu">'+e(q.ghi)+'</div>' : '')+'</div>'; }
function pbKhongXem(o){ var id = PB.xem.slice(2), q = pbDL().qdKhong.filter(function(x){ return x.id===id; })[0], e = coChuHTML; if(!q){ PB.xem = null; return false; }
  o.innerHTML = '<div class="th-nhom-ten"><b>QĐ '+e(q.so+(q.kyHieu || ''))+' · '+pbNgay(q.ngay)+'</b> · '+pbNguonChu(q.nguon)+(q.dot ? ' · đợt '+e(q.dot) : '')+(q.loai ? ' · '+e(q.loai) : '')+'</div>'+
    '<div class="sl-bao vang"><b>0 xã</b> — tỉnh không giao cho PGD đợt này (chỉ ghi số QĐ để theo dõi đợt).</div>'+(q.ghi ? '<div class="sl-phu">Ghi chú: '+e(q.ghi)+'</div>' : '')+
    GD.hang([GD.nut({chu:'✎ Sửa QĐ', lenh:'pb.khongSua', du:{id:q.id}, chinh:1, tit:'Nhìn nhầm thì tích thêm xã → thành QĐ có số liệu'})]); return true; }
/* bảng dòng thời gian (màn hình + in) */
function pbDTG(){ return pbDongThoiGian(pbNhom(), pbDL().qdKhong); }
function pbDTGBang(b, inRa){ var e = coChuHTML;
  return '<table class="to-bang luoi pb-x-bang pb-dtg"><thead><tr><th>STT</th><th>Đợt</th><th>Số QĐ</th><th>Ngày</th><th>Loại</th><th>Giao cho PGD</th><th>Σ điều chỉnh PGD</th><th>Ghi chú</th></tr></thead><tbody>'+
    b.ds.map(function(x){ if(x.thieu!=null) return '<tr class="pb-dtg-thieu"><td></td><td class="c"><b>'+x.thieu+'</b></td><td colspan="5"><b>⚠ Thiếu đợt '+x.thieu+' — chưa nhập</b>'+
        (inRa ? '' : ' '+GD.nut({chu:'＋ ghi số QĐ', lenh:'pb.khongMoi', du:{dot:x.thieu, nguon:b.nguon}, lop:'pb-nho'}))+'</td><td></td></tr>';
      var canh = (x.trung ? 'trùng đợt ' : '')+(x.nguoc ? 'đợt nhỏ hơn QĐ trước (theo ngày) ' : '');
      return '<tr class="'+(canh ? 'nb' : '')+'"'+(inRa ? '' : ' data-lenh="pb.xem" data-k="'+e(x.khong ? 'k:'+x.id : x.k)+'"')+(inRa ? '' : ' title="Bấm để xem / sửa"')+'><td class="c">'+x.stt+'</td><td class="c">'+e(x.dot || '')+'</td>'+
        '<td>'+e(x.so+(x.kyHieu || ''))+'</td><td>'+pbNgay(x.ngay)+'</td><td>'+e(x.loai || '')+'</td><td>'+(x.khong ? '<b>0 xã</b> <i>— không giao cho PGD</i>' : x.soXa+' xã')+'</td>'+
        '<td class="s">'+(x.khong ? '' : pbSo3(1, x.tg))+'</td><td>'+(canh ? '<b class="vang">⚠ '+canh+'</b> ' : '')+e(x.ghi || '')+'</td></tr>'; }).join('')+'</tbody></table>'; }
function pbDTGTieu(b){ var n = b.ds.filter(function(x){ return x.thieu==null; }).length, t = b.ds.filter(function(x){ return x.thieu!=null; }).length;
  return 'Năm '+b.nam+' · nguồn '+pbNguonChu(b.nguon)+' · '+n+' QĐ'+(t ? ' · ⚠ thiếu '+t+' đợt' : ''); }
function pbDTGVe(o){ var r = pbDTG(), e = coChuHTML;
  o.innerHTML = '<div class="th-nhom-ten"><b>📅 Dòng thời gian QĐ</b> <small>STT theo ngày từ QĐ đầu tiên · mỗi năm × nguồn 1 bảng · soát đợt (QĐ có ghi đợt) · bấm dòng để xem / sửa</small></div>'+
    (r.length ? r.map(function(b){ return '<div class="nhan-nhom">'+e(pbDTGTieu(b))+'</div><div class="to-bang-cuon">'+pbDTGBang(b)+'</div>'; }).join('')+
      xuatHang({ten:xuatTen('Dong thoi gian QD phan bo KH', '', ''), html:pbDTGIn, excel:'pbDTGExcel()'}) : '<div class="sl-phu">Chưa có QĐ.</div>'); }
function pbDTGIn(){ var r = pbDTG(); return PB_DC_CSS+'<h3 style="text-align:center;margin:0 0 6px">DÒNG THỜI GIAN QUYẾT ĐỊNH GIAO / ĐIỀU CHỈNH KẾ HOẠCH</h3>'+
  r.map(function(b){ return '<p style="margin:8px 0 4px"><b>'+coChuHTML(pbDTGTieu(b))+'</b></p>'+pbDTGBang(b, 1); }).join(''); }
function pbDTGExcel(){
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    if(!window.XLSX) throw new Error('Chưa tải được bộ Excel — có mạng một lần rồi thử lại.');
    var wb = XLSX.utils.book_new(), a = [['Năm', 'Nguồn', 'STT', 'Đợt', 'Số QĐ', 'Ngày', 'Loại', 'Giao cho PGD', 'Σ điều chỉnh PGD (triệu)', 'Ghi chú']];
    pbDTG().forEach(function(b){ b.ds.forEach(function(x){ a.push(x.thieu!=null ? [b.nam, pbNguonChu(b.nguon), '', x.thieu, '', '', '', '', '', 'THIẾU ĐỢT '+x.thieu+' — chưa nhập']
      : [b.nam, pbNguonChu(b.nguon), x.stt, x.dot || '', x.so+(x.kyHieu || ''), pbNgay(x.ngay), x.loai || '', x.khong ? 'không giao cho PGD' : x.soXa+' xã', x.khong ? '' : x.tg, (x.trung ? 'trùng đợt; ' : '')+(x.nguoc ? 'đợt nhỏ hơn QĐ trước; ' : '')+(x.ghi || '')]); }); });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a), 'DONG_THOI_GIAN');
    giaoFile(new Blob([XLSX.write(wb, {type:'array', bookType:'xlsx'})], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), xuatTen('Dong thoi gian QD phan bo KH', '', '')+'.xlsx');
  }).catch(function(er){ baoLoi(er && er.message || String(er)); });
}
GD.dangKy('pb', {
  moi:function(){ pbMoQD(''); },
  sua:function(el){ pbMoQD(el.getAttribute('data-k')); },
  suaNhanh:function(el){ if(PB.F && PB.F.doi && !confirm('Đang sửa dở QĐ khác — bỏ thay đổi?')) return; pbMoQD(el.getAttribute('data-k'), {noi:'phai'}); },   /* 3.466 */
  ke:function(el){ pbMoQD('', {tu:el.getAttribute('data-k')}); },
  fKieu:function(el){ if(!PB.F) return; PB.F.kieu = el.getAttribute('data-v'); pbFVe(); },
  fDoiMa:function(el){ var F = PB.F, cu = el.getAttribute('data-ma'), m = el.value; if(!F || !m || m===cu) return;
    if(F.dong.some(function(d){ return d.ma===m; })){ el.value = cu; return baoLoi('Mã '+m+' đã có trong QĐ — bỏ khối đó trước hoặc chọn mã khác.'); }
    F.dong.forEach(function(d){ if(d.ma===cu){ d.ma = m; d.ten = pbTenCT(m); d.dgTu = d.dgTu && false; } }); if(F.tong && F.tong[cu]){ F.tong[m] = F.tong[cu]; delete F.tong[cu]; } F.doi = true; pbFVe(); },
  fThemXaCT:function(el){ var F = PB.F, ma = el.getAttribute('data-ma'), x = el.value; if(!F || !x) return;
    if(!F.xa[x]){ F.xa[x] = (PB.xa[x] || {}).ten || x; F.xaThu.push(x); }
    F.dong.push({xa:x, ma:ma, ten:pbTenCT(ma), daGiao:null, tangGiam:null, den3112:null, dgTu:true, denTu:true}); F.doi = true; pbFVe(); },
  fBoCT:function(el){ var F = PB.F, ma = el.getAttribute('data-ma'); if(!F) return; var n = F.dong.filter(function(d){ return d.ma===ma && (d.tangGiam!=null || d.den3112!=null); }).length;
    if(n && !confirm('Bỏ cả khối chương trình '+ma+' '+pbVT(ma)+'? '+n+' dòng đã có số.')) return; F.dong = F.dong.filter(function(d){ return d.ma!==ma; }); if(F.tong) delete F.tong[ma]; F.doi = true; pbFVe(); },
  fThemCTXa:function(el){ var F = PB.F, x = el.getAttribute('data-xa'), m = el.value; if(!F || !m) return;
    F.dong.push({xa:x, ma:m, ten:pbTenCT(m), daGiao:null, tangGiam:null, den3112:null, dgTu:true, denTu:true}); F.doi = true; pbFVe(); },
  fBoXa:function(el){ var F = PB.F, x = el.getAttribute('data-xa'); if(!F) return; var n = F.dong.filter(function(d){ return d.xa===x && (d.tangGiam!=null || d.den3112!=null); }).length;
    if(n && !confirm('Bỏ '+(F.xa[x] || x)+' khỏi QĐ? '+n+' dòng đã có số.')) return; delete F.xa[x]; F.dong = F.dong.filter(function(d){ return d.xa!==x; }); F.doi = true; pbFVe(); },
  fGhepXa:function(el){ var F = PB.F, k = el.getAttribute('data-k'), m = el.value; if(!F || !m) return; if(F.xa[m]) return baoLoi('Xã này đã có trong QĐ.');
    var ten = F.xa[k] || k.slice(1); F.ghep[pbBoDau(ten)] = m; F.xa[m] = (PB.xa[m] || {}).ten || ten; delete F.xa[k];
    F.xaThu = F.xaThu.map(function(x){ return x===k ? m : x; }); F.dong.forEach(function(d){ if(d.xa===k) d.xa = m; }); F.doi = true; pbFVe(); },
  chon:function(el){ PB.chon = {khoa:el.getAttribute('data-k'), xa:el.getAttribute('data-xa')}; PB.kq = null; pbDoiMuc(''); },
  chonSel:function(el){ var v = String(el.value || '').split('||'); if(!v[0]) return; PB.chon = {khoa:v[0], xa:v[1] || ''}; PB.kq = null; pbDoiMuc(''); },
  muc:function(el){ pbDoiMuc(el.getAttribute('data-v')); },
  cheDo:function(el){ PB.cheDo = el.getAttribute('data-v'); PB.kq = null; pbVePhai(); },
  ky:function(el){ PB.kyCX = el.value; PB.kq = null; pbVePhai(); },
  chay:function(){ pbChay(); },
  suaTay:function(el){ var k = (PB.kq || [])[+el.getAttribute('data-ct')], v = pbDocSo(el.value); if(!k) return;
    if(v==null && String(el.value).trim()) return baoLoi('"'+el.value+'" không phải số — gõ ví dụ 300 hoặc -200 (triệu đồng).');
    pbSuaTay(k, +el.getAttribute('data-i'), v || 0); (PB.kqNho = PB.kqNho || {})[PB.kqLuc] = {kq:PB.kq, moTa:PB.kqMoTa}; pbGiuO(function(){ var o = document.getElementById('pb-kq'), q = pbQDChon(); if(o && q) o.innerHTML = pbKQHTML(q, pbCheDo()); }); },
  nhapXls:function(el){ pbNhapXls(el); }, nhapPdf:function(el){ pbNhapPdf(el); },
  xuatTat:function(){ pbXuatTat(); },
  gon:function(){ D.cauHinh.pbGonQD = !D.cauHinh.pbGonQD; if(typeof luu==='function') luu(); pbVeTrai(); },
  dutMo:function(el){ pbMoQD(el.getAttribute('data-k')); },   /* 3.478: bảng ⚠ Đứt chuỗi → ✎ sửa QĐ */
  dtg:function(){ PB.xem = '__dtg'; if(PB.che!=='qd') return pbDoiMuc('qd'); pbVeTrai(); pbVePhai(); },   /* 3.467 */
  khongMoi:function(el){ pbMoQD('', {mac:{dot:el.getAttribute('data-dot') || '', nguon:+el.getAttribute('data-nguon') || 1, loai:'Điều chỉnh'}}); },   /* 3.469: ＋ QĐ mới, không tích xã = QĐ 0 xã */
  khongSua:function(el){ pbMoQD('', {khong:el.getAttribute('data-id')}); },
  pKhong:function(){ var P = PB_P; if(!P) return; var d = P.dau; PB_P = null; pbMoQD('', {mac:{so:d.so, kyHieu:d.kyHieu, ngay:d.ngay, nguon:d.nguon || 1, loai:d.loai || 'Điều chỉnh', dot:d.dot}}); },
  xem:function(el){ PB.xem = el.getAttribute('data-k'); if(PB.che!=='qd') return pbDoiMuc('qd'); pbVeTrai(); pbVePhai(); },
  kieuQD:function(el){ D.cauHinh.pbKieuQD = el.getAttribute('data-v'); if(typeof luu==='function') luu(); pbVePhai(); },
  pDau:function(el){ var P = PB_P, f = el.getAttribute('data-f'); if(!P) return; var v = el.value;
    if(f==='ngay'){ v = typeof gdxDocNgay==='function' ? gdxDocNgay(el.value) : el.value; if(String(el.value).trim() && !v) return baoLoi('"'+el.value+'" không phải ngày — gõ liền số, vd 3072026.'); }
    P.dau[f] = f==='nguon' ? +v : String(v || '').trim(); pbPVe(); },
  pPgd:function(el){ if(!PB_P) return; PB_P.pgd = el.value; PB_P.xa = {}; pbPVe(); },
  pXa:function(el){ if(!PB_P) return; PB_P.xa[el.getAttribute('data-k')] = el.checked ? true : false; pbPVe(); },
  pMa:function(el){ if(!PB_P) return; PB_P.ma[el.getAttribute('data-t')] = el.value; pbPVe(); },
  pLuu:function(el){ pbPLuu(el.getAttribute('data-k')); }, pDong:function(){ PB_P = null; dongHop(); },
  fTong:function(el){ var F = PB.F, ma = el.getAttribute('data-ma'), j = +el.getAttribute('data-j'); if(!F) return; var v = String(el.value).trim()==='-' ? 0 : pbDocSo(el.value);
    if(v==null && String(el.value).trim()) return baoLoi('"'+el.value+'" không phải số.');
    F.tong = F.tong || {}; var t = F.tong[ma] = F.tong[ma] || [null, null, null]; t[j] = v; if(t.every(function(x){ return x==null; })) delete F.tong[ma]; F.doi = true; pbGiuO(pbFBangVe); }, xlsLuu:function(el){ pbXlsLuu(el.getAttribute('data-k')); }, xlsDong:function(){ PB_X = null; dongHop(); }, xlsMau:function(){ pbXlsMau(); },
  chiaLai:function(){ if(!confirm('Bỏ số sửa tay và chia lại?')) return; pbChay(); },
  dc:function(){ pbDoiMuc('dc'); },
  db:function(){ pbDoiMuc('db'); },
  dbLoc:function(el){ var f = el.getAttribute('data-f'); PB.db[f] = f==='nguon' ? +el.value : el.value; if(f==='nam'){ PB.db.ky = ''; PB.db.moXa = ''; } pbDBVe(); },
  dbChon:function(el){ var D = PB.db, f = el.getAttribute('data-f'), v = el.getAttribute('data-v'), a = D[f];   /* 3.471: chọn nhiều xã / chương trình — "Tất cả" bỏ chọn */
    D[f] = !v ? [] : a.indexOf(v)>=0 ? a.filter(function(x){ return x!==v; }) : a.concat([v]); D.moXa = D.xaDs.length===1 ? D.xaDs[0] : ''; pbDBVe(); },
  dbXep:function(el){ PB.db.xep = el.getAttribute('data-v'); PB.db.gap = {}; pbDBVe(); },
  dbTachQD:function(){ PB.db.tachQD = !PB.db.tachQD; pbDBVe(); },
  dbThem:function(){ PB.db.them = !PB.db.them; pbDBVe(); },
  dbGap:function(el){ var g = PB.db.gap, k = el.getAttribute('data-k'); if(g[k]) delete g[k]; else g[k] = 1; pbGiuO(pbDBVe); },
  dbMoc:function(el){ var k = el.getAttribute('data-ky'); PB.db.moMoc = PB.db.moMoc===k ? '' : k; PB.db.moMocXa = ''; pbGiuO(pbDBVe); },
  dbMocXa:function(el){ var x = el.getAttribute('data-xa'); PB.db.moMocXa = PB.db.moMocXa===x ? '' : x; pbGiuO(pbDBVe); },
  dbMT:function(el){ PB.db[el.getAttribute('data-f')] = el.getAttribute('data-v')==='1'; var o = document.getElementById('pb-db-xa'); if(o && PB.db.r) o.innerHTML = pbDBXa(PB.db.r); },
  dbMTKy:function(el){ PB.db.mocMT = el.value; var o = document.getElementById('pb-db-xa'); if(o && PB.db.r) o.innerHTML = pbDBXa(PB.db.r); },
  dbXa:function(el){ var x = el.getAttribute('data-xa'); PB.db.moXa = PB.db.moXa===x ? '' : x; var o = document.getElementById('pb-db-xa'); if(o && PB.db.r) o.innerHTML = pbDBXa(PB.db.r); },
  dcDong:function(){ pbDCDong(); },
  dcNam:function(el){ PB.dc.nam = el.value; pbDCVe(); },
  dcLech:function(){ PB.dc.chiLech = !PB.dc.chiLech; pbDCVe(); },
  dcMo:function(el){ PB.chon = {khoa:el.getAttribute('data-k'), xa:el.getAttribute('data-xa')}; PB.kq = null; pbDoiMuc(''); pbChay(); },
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
    if(el.checked){ F.xa[m] = (PB.xa[m] || {}).ten || F.xa[m] || m; if(F.xaThu && F.xaThu.indexOf(m)<0) F.xaThu.push(m); Object.keys(F.dong.reduce(function(o, d){ o[d.ma] = 1; return o; }, {})).forEach(function(ma){
        if(!F.dong.some(function(d){ return d.xa===m && d.ma===ma; })) F.dong.push({xa:m, ma:ma, ten:pbTenCT(ma), daGiao:null, tangGiam:null, den3112:null, dgTu:true, denTu:true}); }); }
    else { var co = F.dong.filter(function(d){ return d.xa===m && (d.tangGiam!=null || d.den3112!=null); });
      if(co.length && !confirm('Bỏ '+(F.xa[m] || m)+' khỏi QĐ? '+co.length+' dòng đã nhập sẽ bị xóa.')){ el.checked = true; return; }
      delete F.xa[m]; F.dong = F.dong.filter(function(d){ return d.xa!==m; }); }
    F.doi = true; pbFVe(); },
  fThemCT:function(){ pbFThemCT(); },
  fSo:function(el){ var F = PB.F, d = F && F.dong[+el.getAttribute('data-i')], f = el.getAttribute('data-f'); if(!d) return;
    var v = String(el.value).trim()==='-' ? 0 : pbDocSo(el.value); if(v==null && String(el.value).trim()) return baoLoi('"'+el.value+'" không phải số.');   /* 3.465: "-" = 0 như trên QĐ */
    d[f] = v; if(f==='daGiao') d.dgTu = v==null; if(f==='den3112') d.denTu = v==null;   /* ô anh gõ tay → giữ; xóa trắng → trở lại tự động */
    F.doi = true; pbGiuO(pbFBangVe); },
  fBoDong:function(el){ var F = PB.F; if(!F) return; F.dong.splice(+el.getAttribute('data-i'), 1); F.doi = true; pbFVe(); },
  fLuu:function(){ pbFLuu(); },
  fBo:function(){ if(PB.F && PB.F.doi && !confirm('Bỏ các thay đổi chưa lưu?')) return; var noi = PB.F && PB.F.noi; PB.F = null; if(noi) pbVePhai(); else dongHop(); },
  fXoa:function(){ pbFXoa(); }
});
/* Ctrl+Enter trong hộp QĐ = Lưu (QUY_CHUAN mục 11) */
document.addEventListener('keydown', function(ev){ if(ev.key==='Enter' && (ev.ctrlKey || ev.metaKey) && PB.F && document.getElementById('pb-f')){ ev.preventDefault(); var a = document.activeElement; if(a && a.blur) a.blur(); setTimeout(pbFLuu, 0); } });
