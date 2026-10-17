/* ===== 3.228 (anh 17/10/2026): 🔎 KIỂM TRA HỘ VAY — luật logic khi nhập hộ, KHAI BÁO ĐƯỢC (bật / tắt · mức · ngưỡng: ⚙ Khai báo đơn vị › 🔎 Kiểm tra hộ vay)
   Luật lưu trong hsoKB().khLuat (đồng bộ cùng khai báo đơn vị). Lớp Nghiệp vụ dùng chung: khKiem(hộ) → [{ma, muc, chu, k}] — form nhập hộ (cập nhật khi rời ô, 🔴 chặn lưu), lưới 📒 Sổ hộ vay (cột Cần bổ sung, chip lọc).
   Số liệu: sổ hộ vay (hmDs) · danh bạ Mẫu 31 các kỳ (KHO.danhBa) · món Mẫu 31 mới nhất (KHO.monKH / KHO.hssvPhu — slKhMonNap). Kiểm trùng ở tab Tra cứu (tcKiemTrung2) giữ riêng: nhập CCCD / tên rời, không có hộ.
   Mức: chan 🔴 chặn lưu · do 🔴 · cam 🟠 · vang 🟡 · tt ℹ. 🟠 / 🟡 có nút "Đã kiểm tra" (ghi o.daKiem[k] = {luc, chu}; nội dung đổi → nhắc lại). */
var KH_MUC = {chan:['🔴', 'Đỏ — chặn lưu'], do:['🔴', 'Đỏ'], cam:['🟠', 'Cam'], vang:['🟡', 'Vàng'], tt:['ℹ', 'Thông tin']}, KH_THU = {chan:0, do:1, cam:2, vang:3, tt:4};
var KH_LUAT = [   /* ng: ngưỡng mặc định (tam = số tạm, chờ anh chốt) */
  ['Tuổi', [
    {ma:'tuoi65', ten:'Người vay trên … tuổi', muc:'cam', ng:65, dv:'tuổi'},
    {ma:'tuoiDH', ten:'Tuổi lúc đáo hạn (hôm nay + thời hạn vay của phiếu hồ sơ) trên …', muc:'vang', ng:65, dv:'tuổi'},
    {ma:'tuoi18', ten:'Người vay dưới … tuổi', muc:'chan', ng:18, dv:'tuổi'},
    {ma:'tkTuoi', ten:'Vợ / chồng / người thừa kế dưới … tuổi', muc:'cam', ng:18, dv:'tuổi'}]],
  ['CCCD', [
    {ma:'cccd12', ten:'CCCD không đủ 12 số / mã tỉnh không có / số thứ 4 sai', muc:'cam'},
    {ma:'cccdNS', ten:'CCCD lệch năm sinh / giới tính đã khai', muc:'cam'},
    {ma:'cccdCap', ten:'Ngày cấp ở tương lai / trước 14 tuổi', muc:'cam'},
    {ma:'cccdHet', ten:'CCCD hết hạn', muc:'cam'},
    {ma:'cccdSap', ten:'CCCD sắp hết hạn', muc:'vang'}]],
  ['Trùng', [
    {ma:'trungCCCD', ten:'Người đứng tên trùng CCCD người đứng tên hộ khác trong sổ', muc:'chan'},
    {ma:'hoTrung', ten:'Trong hộ 2 người cùng CCCD', muc:'chan'},
    {ma:'tkVay', ten:'Thành viên / thừa kế đang vay (Mẫu 31), là vợ / chồng người đang vay, hoặc có trong hộ khác của sổ', muc:'cam'},
    {ma:'trungSDT', ten:'Trùng số điện thoại khách / hộ khác', muc:'vang'},
    {ma:'trungTen', ten:'Họ tên gần đúng (lệch ≤ … chữ cái, đảo tên đệm) + cùng năm sinh / cùng xã', muc:'vang', ng:2, dv:'chữ'}]],
  ['Trong hộ · liên lạc', [
    {ma:'qhGT', ten:'Quan hệ vợ / chồng không khớp giới tính theo CCCD', muc:'vang'},
    {ma:'thieuTK', ten:'Chưa có thành viên / người thừa kế', muc:'vang'},
    {ma:'sdtSai', ten:'Số điện thoại không đủ 10 số (0xxxxxxxxx)', muc:'vang'}]],
  ['Hộ đang vay (Mẫu 31)', [
    {ma:'monVay', ten:'Tóm tắt các món đang vay (chương trình · ngày vay · số tiền · dư nợ · hạn)', muc:'tt'},
    {ma:'quaHan', ten:'Có món quá hạn / khoanh', muc:'do'},
    {ma:'cungCT', ten:'Còn dư nợ cùng chương trình định vay (phiếu hồ sơ)', muc:'cam'},
    {ma:'sapDH', ten:'Món đến hạn trong … ngày', muc:'tt', ng:90, dv:'ngày', tam:1}]],
  ['Tổ', [
    {ma:'doiTo', ten:'Đổi tổ so với Mẫu 31 — ghi tổ cũ, ấp', muc:'tt'},
    {ma:'doiToNo', ten:'Đổi tổ mà còn món đang vay ở tổ cũ', muc:'cam'},
    {ma:'apTo', ten:'Ấp của hộ khác ấp của tổ', muc:'vang'},
    {ma:'toDay', ten:'Tổ đã có trên … tổ viên còn nợ', muc:'vang', ng:60, dv:'người', tam:1}]],
  ['Theo chương trình (phiếu hồ sơ)', [
    {ma:'hssvThieu', ten:'Vay HSSV mà chưa đánh dấu HSSV trong hộ', muc:'cam'},
    {ma:'hssvTrung', ten:'CCCD HSSV trùng món HSSV còn dư nợ', muc:'cam'},
    {ma:'ctCanh', ten:'Phương án vượt mức (NSVSMT / công trình, GQVL tối đa), hiệu quả âm…', muc:'cam'},
    {ma:'gqSL', ten:'GQVL: dòng mục đích thiếu số lượng / đơn vị', muc:'vang'}]]
];
var KH_TINH = ['001','002','004','006','008','010','011','012','014','015','017','019','020','022','024','025','026','027','030','031','033','034','035','036','037','038','040','042','044','045','046','048','049','051','052','054','056','058','060','062','064','066','067','068','070','072','074','075','077','079','080','082','083','084','086','087','089','091','092','093','094','095','096'];   /* mã nơi đăng ký khai sinh trên CCCD */
function khDsLuat(){ return [].concat.apply([], KH_LUAT.map(function(g){ return g[1]; })); }
function khLuat(ma){   /* luật đã khai (hsoKB().khLuat) đè mặc định → {tat, muc, ng} */
  var d = khDsLuat().find(function(x){ return x.ma===ma; }) || {}, k = ((hsoKB().khLuat)||{})[ma] || {};
  return {tat:!!k.tat, muc:k.muc || d.muc || 'vang', ng:k.ng!=null && k.ng!=='' ? +k.ng : d.ng};
}
function khLuatDat(ma, f, v){ var kb = hsoKB(), L = kb.khLuat = kb.khLuat || {}, x = L[ma] = L[ma] || {}; if(f==='tat') x.tat = v ? 1 : 0; else if(f==='ng') x.ng = String(v).replace(/[^\d]/g, ''); else x[f] = v; luu(); if(typeof hsoVe==='function') hsoVe(); }
function khLuatMD(){ hsoKB().khLuat = {}; luu(); hsoKBHop('kiem'); }
function khKBHTML(){   /* ⚙ Khai báo đơn vị › 🔎 Kiểm tra hộ vay */
  return '<div class="hso-kb-nhom"><b>🔎 Kiểm tra hộ vay — luật app tự rà khi nhập hộ, xem ở 📒 Sổ hộ vay</b><div class="sl-phu">Bỏ tích = tắt luật. Mức: 🔴 chặn lưu (không cho lưu hộ) · 🔴 · 🟠 · 🟡 (có nút "Đã kiểm tra") · ℹ thông tin. Số có chữ "(tạm)" em đặt tạm — anh sửa theo quy định.</div>'+
    KH_LUAT.map(function(g){ return '<div class="nhan-nhom">'+coChuHTML(g[0])+'</div>'+g[1].map(function(d){ var L = khLuat(d.ma);
      return '<div class="kh-kb-dong'+(L.tat ? ' tat' : '')+'"><label class="hso-o2"><input type="checkbox"'+(L.tat ? '' : ' checked')+' onchange="khLuatDat(\''+d.ma+'\',\'tat\',!this.checked);hsoKBHop(\'kiem\')"> '+coChuHTML(d.ten)+'</label>'+
        (d.ng!=null ? '<input class="kh-ng" value="'+coChuHTML(String(L.ng))+'" onchange="khLuatDat(\''+d.ma+'\',\'ng\',this.value)"> '+coChuHTML(d.dv||'')+(d.tam ? ' <small>(tạm)</small>' : '') : '')+
        '<select onchange="khLuatDat(\''+d.ma+'\',\'muc\',this.value)">'+Object.keys(KH_MUC).map(function(m){ return '<option value="'+m+'"'+(L.muc===m ? ' selected' : '')+'>'+KH_MUC[m][0]+' '+KH_MUC[m][1]+'</option>'; }).join('')+'</select></div>'; }).join(''); }).join('')+
    '<div class="hang-nut"><button class="nho" onclick="khLuatMD()">↺ Về mặc định</button></div></div>';
}
/* ---------- dữ liệu phụ ---------- */
var KH_CM = {db:null};
function khChiMuc(){   /* danh bạ Mẫu 31 theo tên (chữ cuối), SĐT, tên vợ/chồng — dựng lại khi danh bạ đổi */
  if(!KHO.coDanhBa()) return {ten:{}, sdt:{}, vc:{}};
  var ph = KHO.phienDanhBa(); if(KH_CM.db===ph) return KH_CM;
  var C = {db:ph, ten:{}, sdt:{}, vc:{}};
  KHO.dsDanhBa().forEach(function(kh){ var c = KHO.danhBa(kh) || {}, t = slChuan(c.ten||''), s = khSo(c.sdt), v = slChuan(c.voChong||'');
    if(t) (C.ten[t.split(' ').pop()] = C.ten[t.split(' ').pop()] || []).push(kh); if(s.length>=9) (C.sdt[s] = C.sdt[s] || []).push(kh); if(v) (C.vc[v] = C.vc[v] || []).push(kh); });
  KH_CM = C; return C;
}
function khSo(v){ return String(v||'').replace(/\D/g, ''); }
function khDangVay(kh){ return !!kh && (KHO.monKH(kh).some(function(m){ return !m.xong; }) || ((KHO.danhBa(kh)||{}).mon>0)); }
function khTuoi(ns, luc){ if(!ns) return null; var a = String(ns), b = luc || ngayISO(nay()); var t = +b.slice(0, 4) - +a.slice(0, 4); if(a.length>=10 && b.slice(5, 10)<a.slice(5, 10)) t--; return t; }
function khGan(a, b, max){   /* họ tên gần đúng: đảo tên đệm (cùng các chữ) hoặc lệch ≤ max chữ cái (Levenshtein, dừng sớm) */
  if(!a || !b) return false; if(a===b) return true;
  if(a.split(' ').sort().join(' ')===b.split(' ').sort().join(' ')) return true;
  if(Math.abs(a.length-b.length)>max) return false;
  var p = [], i, j; for(j=0;j<=b.length;j++) p[j] = j;
  for(i=1;i<=a.length;i++){ var q = [i], nho = i; for(j=1;j<=b.length;j++){ q[j] = Math.min(p[j]+1, q[j-1]+1, p[j-1]+(a[i-1]===b[j-1] ? 0 : 1)); if(q[j]<nho) nho = q[j]; } if(nho>max) return false; p = q; }
  return p[b.length]<=max;
}
function khTien(v){ return typeof tdnTien==='function' ? tdnTien(v) : String(v); }
function khLaVC(qh){ return /^(vợ|chồng|vo|chong)(\s|$)/i.test(String(qh||'').trim()); }
function khLaTK(qh){ return khLaVC(qh) || /thừa kế|thua ke/i.test(String(qh||'')); }
/* ---------- bộ kiểm ---------- */
function khKiem(o){
  if(!o || !Array.isArray(o.tv)) return [];
  var r = [], hn = ngayISO(nay()), dung = o.dung||0, nd = typeof hmNguoiDung==='function' && o.kh ? hmNguoiDung(o).n : (o.tv[dung]||{});
  var ten = function(i){ return (i===dung ? nd : o.tv[i]||{}).ten || ('người '+(i+1)); };
  var them = function(ma, chu, i){ var L = khLuat(ma); if(L.tat) return; r.push({ma:ma, muc:L.muc, chu:chu, k:ma+':'+(i==null ? '' : i)}); };
  var nguoi = o.tv.map(function(n, i){ return i===dung ? Object.assign({}, n, nd) : n; });
  var B = typeof hsoBoDs==='function' && o.id ? hsoBoDs().find(function(b){ return b.hoId===o.id; }) : null;
  var A = B && typeof hsoPA==='function' ? hsoPA(B) : null, C = A && A.C;
  var kh = o.kh || (typeof hmM31==='function' ? hmM31(nd.cccd) : '');
  /* 1. tuổi */
  var tuoi = khTuoi(nd.ns) != null ? khTuoi(nd.ns) : (hsoCCCDDoc(nd.cccd) ? +hn.slice(0, 4)-hsoCCCDDoc(nd.cccd).nam : null);
  if(tuoi!=null){
    if(tuoi>khLuat('tuoi65').ng) them('tuoi65', ten(dung)+' '+tuoi+' tuổi (trên '+khLuat('tuoi65').ng+')', dung);
    if(tuoi<khLuat('tuoi18').ng) them('tuoi18', ten(dung)+' mới '+tuoi+' tuổi — chưa đủ tuổi đứng tên vay', dung);
    var th = A && +A.th; if(th && nd.ns){ var d = new Date(nay()); d.setMonth(d.getMonth()+th); var tDH = khTuoi(nd.ns, ngayISO(d)); if(tDH>khLuat('tuoiDH').ng) them('tuoiDH', 'Đáo hạn sau '+th+' tháng: '+ten(dung)+' '+tDH+' tuổi (trên '+khLuat('tuoiDH').ng+')', dung); }
  }
  nguoi.forEach(function(n, i){ if(i===dung || !khLaTK(n.qh)) return; var t = khTuoi(n.ns); if(t!=null && t<khLuat('tkTuoi').ng) them('tkTuoi', ten(i)+' ('+n.qh+') mới '+t+' tuổi', i); });
  /* 2. CCCD từng người */
  var soHo = {};
  nguoi.forEach(function(n, i){ var so = khSo(n.cccd); if(!so) return;
    if(soHo[so]!=null) them('hoTrung', ten(i)+' trùng CCCD '+so+' với '+ten(soHo[so])+' trong cùng hộ', i); else soHo[so] = i;
    var cd = hsoCCCDDoc(so);
    if(so.length!==12 && so.length!==9) them('cccd12', ten(i)+': CCCD '+so.length+' số (cần 12)', i);
    else if(so.length===12 && KH_TINH.indexOf(so.slice(0, 3))<0) them('cccd12', ten(i)+': mã tỉnh '+so.slice(0, 3)+' trên CCCD không có', i);
    else if(so.length===12 && !cd) them('cccd12', ten(i)+': số thứ 4 CCCD ('+so[3]+') không hợp lệ', i);
    if(cd && n.ns && +String(n.ns).slice(0, 4)!==cd.nam) them('cccdNS', ten(i)+': năm sinh '+String(n.ns).slice(0, 4)+' khác CCCD ('+cd.nam+')', i);
    if(cd && n.gt && n.gt!==cd.gt) them('cccdNS', ten(i)+': khai '+n.gt+', CCCD là '+cd.gt, i);
    if(n.ncap && n.ncap>hn) them('cccdCap', ten(i)+': ngày cấp '+ngayVNsl(n.ncap)+' ở tương lai', i);
    else if(n.ncap && n.ns && khTuoi(n.ns, n.ncap)<14) them('cccdCap', ten(i)+': cấp CCCD lúc '+khTuoi(n.ns, n.ncap)+' tuổi (dưới 14)', i);
    if(n.ns && n.ncap && typeof toCCCDHan==='function'){ var h = toCCCDHan(so, n.ns, n.ncap); if(h.kq==='het') them('cccdHet', ten(i)+': '+h.chu, i); else if(h.kq==='sap') them('cccdSap', ten(i)+': '+h.chu, i); }
  });
  /* 3. trùng — sổ + Mẫu 31 */
  var khac = hmDs().filter(function(x){ return x.id!==o.id; }), M = khChiMuc(), ngTen = khLuat('trungTen').ng;
  nguoi.forEach(function(n, i){ var so = khSo(n.cccd), s = khSo(n.sdt), t = slChuan(n.ten||'');
    if(so.length>=9){
      khac.forEach(function(x){ x.tv.forEach(function(m, j){ if(khSo(m.cccd)!==so) return;
        if(i===dung && j===(x.dung||0)) them('trungCCCD', ten(i)+' trùng CCCD người đứng tên hộ '+hmTen(x)+' trong sổ', i);
        else them('tkVay', ten(i)+' có trong hộ '+hmTen(x)+' ('+(j===(x.dung||0) ? 'đứng tên vay' : m.qh || 'thành viên')+')', i); }); });
      var m31 = KHO.timCCCD(so); if(i!==dung && m31 && m31!==kh && khDangVay(m31)) them('tkVay', ten(i)+' đang vay ở Mẫu 31 (mã KH '+m31+')', i);
    }
    if(i!==dung && t && M.vc[t]) M.vc[t].filter(function(k){ return k!==kh && khDangVay(k); }).slice(0, 2).forEach(function(k){ them('tkVay', ten(i)+' trùng tên vợ/chồng của người đang vay '+((KHO.danhBa(k)||{}).ten||k)+' (mã KH '+k+')', i); });
    if(s.length>=9){
      var ds = (M.sdt[s]||[]).filter(function(k){ return k!==kh && khSo((KHO.danhBa(k)||{}).cccd)!==so; });
      khac.forEach(function(x){ if(x.tv.some(function(m){ return khSo(m.sdt)===s; })) ds.push(hmTen(x)+' (sổ)'); });
      if(ds.length) them('trungSDT', ten(i)+': SĐT '+n.sdt+' trùng '+ds.slice(0, 3).map(function(k){ return /\(sổ\)$/.test(k) ? k : ((KHO.danhBa(k)||{}).ten||k)+' (mã KH '+k+')'; }).join(', ')+(ds.length>3 ? '…' : ''), i);
      if(i!==dung && s===khSo(nd.sdt)) them('trungSDT', ten(i)+' dùng chung SĐT với người đứng tên', i);
    }
    if(t.split(' ').length>=2){ var nam = n.ns ? String(n.ns).slice(0, 4) : (hsoCCCDDoc(so)||{}).nam, gan = [];
      (M.ten[t.split(' ').pop()]||[]).forEach(function(k){ var c = KHO.danhBa(k) || {}; if(k===kh || (so && khSo(c.cccd)===so)) return;
        var cung = nam ? String(c.ns||'').slice(0, 4)===String(nam) : (o.xa && c.xa===o.xa); if(cung && khGan(t, slChuan(c.ten||''), ngTen)) gan.push(c.ten+' (mã KH '+k+(c.ns ? ', sinh '+String(c.ns).slice(0, 4) : '')+')'); });
      khac.forEach(function(x){ x.tv.forEach(function(m){ if(so && khSo(m.cccd)===so) return; var nm = m.ns ? String(m.ns).slice(0, 4) : (hsoCCCDDoc(m.cccd)||{}).nam;
        if((nam && nm ? String(nam)===String(nm) : x.xa===o.xa) && khGan(t, slChuan(m.ten||''), ngTen)) gan.push(m.ten+' (hộ '+hmTen(x)+' trong sổ)'); }); });
      if(gan.length) them('trungTen', ten(i)+' gần trùng '+gan.slice(0, 3).join(', ')+(gan.length>3 ? '…' : '')+' — kiểm tra có phải 1 người', i); }
  });
  /* 4. trong hộ · liên lạc */
  nguoi.forEach(function(n, i){ var cd = hsoCCCDDoc(n.cccd), gt = n.gt || (cd && cd.gt);
    if(i!==dung && gt && (/^(vợ|vo)(\s|$)/i.test(String(n.qh||'').trim()) && gt==='Nam' || /^(chồng|chong)(\s|$)/i.test(String(n.qh||'').trim()) && gt==='Nữ')) them('qhGT', ten(i)+': quan hệ "'+n.qh+'" nhưng giới tính '+gt, i);
    var s = khSo(n.sdt); if(s && !/^0\d{9}$/.test(s)) them('sdtSai', ten(i)+': SĐT '+n.sdt+' ('+s.length+' số)', i); });
  if(!nguoi.some(function(n, i){ return i!==dung && String(n.ten||'').trim(); })) them('thieuTK', 'Chưa có thành viên / người thừa kế (giấy ủy quyền, 03/TD cần)');
  /* 5. hộ đang vay */
  var mon = kh ? KHO.monKH(kh).filter(function(m){ return !m.xong; }) : [];
  if(mon.length){ var dn = mon.reduce(function(a, m){ return a+(m.dn||0); }, 0);
    them('monVay', 'Đang vay '+mon.length+' món · dư nợ '+khTien(dn)+': '+mon.map(function(m){ return m.ct+(m.nv ? ' vay '+ngayVNsl(m.nv) : '')+(m.gn ? ' '+khTien(m.gn) : '')+' · còn '+khTien(m.dn)+(m.dh ? ' · hạn '+ngayVNsl(m.dh) : ''); }).join(' | '));
    var qh = mon.filter(function(m){ return m.qh>0 || m.kn>0; }); if(qh.length) them('quaHan', 'Có '+qh.length+' món quá hạn / khoanh: '+qh.map(function(m){ return m.ct+' '+(m.qh>0 ? 'quá hạn '+khTien(m.qh) : 'khoanh '+khTien(m.kn)); }).join(', '));
    if(B && B.ct){ var cung = mon.filter(function(m){ return m.ct===B.ct || (B.ct==='HSSV' && /^HSSV/.test(m.ct)); }); if(cung.length) them('cungCT', 'Còn dư nợ '+B.ct+' '+khTien(cung.reduce(function(a, m){ return a+m.dn; }, 0))+' — đang lập hồ sơ cùng chương trình'); }
    var hanD = new Date(nay()); hanD.setDate(hanD.getDate()+(khLuat('sapDH').ng||0)); var han = ngayISO(hanD);
    mon.filter(function(m){ return m.dh && m.dh>=hn && m.dh<=han; }).forEach(function(m){ them('sapDH', 'Món '+m.ct+' đến hạn '+ngayVNsl(m.dh)+' (còn '+khTien(m.dn)+')'); });
  } else if(kh && KHO.coMonMoi() && KHO.danhBa(kh)) them('monVay', 'Khách cũ (mã KH '+kh+') — không còn món đang vay theo Mẫu 31');
  /* 6. tổ */
  var c31 = kh ? KHO.danhBa(kh) : null;
  if(c31 && c31.to && o.to && c31.to!==o.to){ var tc = KHO.to(c31.to);
    them('doiTo', 'Đổi tổ — tổ cũ (Mẫu 31): '+(tc ? 'Tổ '+(tc.ten||tc.ma)+(tc.tenThon ? ' — '+tc.tenThon : '')+(tc.tenXa ? ', '+tc.tenXa : '') : c31.to));
    if(mon.some(function(m){ return !m.to || m.to===c31.to; })) them('doiToNo', 'Còn '+mon.length+' món ở tổ cũ — chuyển tổ trên hệ thống trước khi lập hồ sơ tổ mới'); }
  var t = o.to ? KHO.to(o.to) : null;
  if(t && t.tenThon && o.tenThon && slChuan(pvApNgan(t.tenThon))!==slChuan(pvApNgan(o.tenThon))) them('apTo', 'Hộ ở '+o.tenThon+' nhưng tổ '+(t.ten||t.ma)+' ở '+t.tenThon);
  if(t && !(c31 && c31.to===o.to)){ var nTV = KHO.toVien(t).filter(function(x){ return x.conNo || x.chuaGN; }).length; if(nTV>khLuat('toDay').ng) them('toDay', 'Tổ '+(t.ten||t.ma)+' đã có '+nTV+' tổ viên còn nợ (trên '+khLuat('toDay').ng+')'); }
  /* 7. theo chương trình của phiếu hồ sơ */
  if(B && C){
    var sv = typeof hmSV==='function' ? hmSV(o) : [];
    if(C.kieu==='hssv' && !sv.length) them('hssvThieu', 'Phiếu hồ sơ vay HSSV nhưng hộ chưa đánh dấu ai là HSSV');
    sv.forEach(function(i){ var so = khSo((o.tv[i]||{}).cccd); if(so) KHO.hssvPhu().filter(function(p){ return p.so===so && !p.xong && p.kh!==kh; }).forEach(function(p){ them('hssvTrung', ten(i)+' (HSSV) đang có món HSSV còn dư nợ '+khTien(p.dn)+' ở mã KH '+p.kh, i); }); });
    (A.canh||[]).concat(C.kieu==='gqvl' && typeof hsoGQ==='function' ? hsoGQ(B).canh : []).forEach(function(x){ them('ctCanh', B.ct+': '+x); });
    if(C.kieu==='gqvl') ((B.pa||{}).dong||[]).forEach(function(x, j){ if(!x.md) return; var tt = hsoGQTach(x); if(!tt.sl || !tt.dv) them('gqSL', 'GQVL dòng '+(j+1)+' "'+x.md+'": thiếu '+(!tt.sl ? 'số lượng' : 'đơn vị')); });
  }
  return r.sort(function(a, b){ return KH_THU[a.muc]-KH_THU[b.muc]; });
}
/* ---------- hiển thị ---------- */
function khDa(o, x){ var d = (o.daKiem||{})[x.k]; return !!(d && d.chu===x.chu); }   /* đã kiểm tra & nội dung chưa đổi */
function khCon(o, ds){ return (ds || khKiem(o)).filter(function(x){ return x.muc!=='tt' && !khDa(o, x); }); }   /* cảnh báo còn phải xem */
function khDongHTML(o, x, nut){
  var da = khDa(o, x), m = KH_MUC[x.muc] || KH_MUC.vang;
  return '<div class="kh-dong kh-'+x.muc+(da ? ' da' : '')+'">'+m[0]+' '+coChuHTML(x.chu)+(da ? ' <small>✓ đã kiểm tra '+ngayVNsl(o.daKiem[x.k].luc)+'</small>'
    : (nut && (x.muc==='cam' || x.muc==='vang') ? ' <button class="nho" onclick="'+nut+'(\''+x.k.replace(/'/g, "\\'")+'\')" title="Đã xem, đúng như vậy — không nhắc lại (nội dung đổi sẽ nhắc lại)">✓ Đã kiểm tra</button>' : ''))+'</div>';
}
function khFormHTML(){   /* khung 🔎 trong form nhập hộ (HM) */
  khDangKy(); if(!HM) return ''; var ds = khKiem(HM);
  if(!ds.length) return '<div class="kh-dong kh-ok">🟢 Chưa thấy điều gì cần lưu ý.</div>';
  return ds.map(function(x){ return khDongHTML(HM, x, 'khDaKiemForm'); }).join('')+(ds.some(function(x){ return x.muc==='chan'; }) ? '<div class="sl-phu hso-canh">🔴 Còn mục chặn lưu — sửa xong mới lưu được.</div>' : '');
}
function khVeForm(){ var e = document.getElementById('hm-kiem'); if(e) e.innerHTML = khFormHTML(); }
function khDaKiemForm(k){ var x = khKiem(HM).find(function(y){ return y.k===k; }); if(!x) return; (HM.daKiem = HM.daKiem || {})[k] = {luc:ngayISO(nay()), chu:x.chu}; khVeForm(); }
function khSoHTML(o, ds){   /* ô lưới sổ: đếm theo mức + chi tiết khi rê chuột */
  var con = khCon(o, ds); if(!con.length) return '';
  var dem = {}; con.forEach(function(x){ var m = KH_MUC[x.muc][0]; dem[m] = (dem[m]||0)+1; });
  return '<div class="kh-so" title="'+coChuHTML(con.map(function(x){ return KH_MUC[x.muc][0]+' '+x.chu; }).join('\n'))+'" onclick="hmMo(\''+o.id+'\')">🔎 '+Object.keys(dem).map(function(m){ return m+dem[m]; }).join(' ')+'</div>';
}
var KH_NAP = null;
function khNap(sau){ if(KHO.coMonMoi()) return; if(KH_NAP) return; KH_NAP = slKhMonNap().then(function(){ KH_NAP = null; if(sau) sau(); }, function(){ KH_NAP = null; }); }   /* nạp món Mẫu 31 mới nhất 1 lần rồi vẽ lại */
function khDangKy(){ if(khDangKy.xong || typeof GD==='undefined') return; khDangKy.xong = 1; GD.dangKy('kh', {luat:function(){ GD.moCon(function(){ hsoKBHop('kiem'); }); }}); }   /* 3.234: form hộ → ⚙ luật kiểm tra (hộp con) */
