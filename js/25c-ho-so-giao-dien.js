/* ===== 3.411 (A2 — tách file lớn): HỒ SƠ — giao diện tab · 🏠 hộ vay mới · 📒 Sổ hộ vay · 03/TD nhiều hộ · GQVL · cột trái / cột tùy chọn từng mẫu.
   Chép nguyên từ js/25-ho-so.js (không đổi tên hàm); nạp sau js/25b. ===== */
/* ---------- giao diện tab ---------- */
function veHoSo(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veHoSo); return; }
  var C = hsoCH(), dsKy = toDsKy(), p = hsoTab();
  if(!dsKy.length){ KHO.datKy(KHO.kyDung() || null); hsoKhung(null); return; }   /* chưa có số liệu → vẫn in được mẫu trắng */
  toKyMacDinh(C, dsKy, 'hs');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'…</div>';
  KHO.nap(C.ky).then(function(K){ KHO.datKy(K); if(nganHienTai===7 && hsoTab()===p && (D.cauHinh.slTab==='hst' || D.cauHinh.slTab==='hsv')) hsoKhung(K); })
    .catch(function(er){ var o = document.getElementById('tr7'); if(o) o.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+' — vẫn in được mẫu trắng.</div>'; hsoKhung(null, 1); });
}
function hsoKhung(K, giu){
  var e = document.getElementById('tr7'), p = hsoTab(); if(!e) return;
  var dau = giu ? e.innerHTML : slTabConHTML()+(K ? kyGhiHTML(K) : '');
  e.innerHTML = dau+'<div id="hso-tabm"></div>'+(K ? '<div id="'+p+'-cay" class="to-cay pv-cay"></div>' : '<div class="sl-bao vang">Chưa có số liệu món vay (Mẫu 31) — mẫu in ra để trống, ghi tay. Nạp ở <b>📥 Nạp &amp; KT</b> để app điền sẵn.</div>')+
    '<div class="th-bo th-bo2 hso-bo"><div class="th-cot hso-trai"><div class="to-bc th-bc-gon" id="hso-ds"></div><div id="hso-tuy" class="hso-tuy"></div></div>'+
    '<div class="th-cot th-xem"><div id="hso-xem-nut"></div><iframe id="hso-xem-khung" class="to-khung th-khung" title="Xem trước"></iframe></div></div>';
  if(K) pvVeCay(p); else hsoVe();
}
function hsoDsHTML(){   /* 3.206 (anh chốt): mẫu chọn ở thanh tab con (hsoTabMauHTML) — cột trái chỉ còn tên mẫu đang làm + chú thích màu */
  var p = hsoTab(), M = hsoMau(p), maChu = String(M.ma).replace(/^[^0-9A-Za-zÀ-ỹ]+/, ''),
    lap = maChu && String(M.ten).toLowerCase().indexOf(maChu.toLowerCase())===0,   /* 3.334 (RA_SOAT_BO_CUC #5): tên mẫu bắt đầu bằng mã (📒 Sổ hộ vay) → không lặp chữ */
    tieu = lap ? coChuHTML(M.ma.slice(0, M.ma.length-maChu.length))+coChuHTML(M.ten) : '<b>'+M.ma+'</b> '+coChuHTML(M.ten);
  return '<div class="th-nhom-ten hso-dau-ds"><span class="hso-tieu" title="'+coChuHTML(M.ma+' — '+M.ten)+'">'+tieu+(M.ngang ? ' <span class="th-cap">[A4 ngang]</span>' : '')+'</span>'+
    '<span class="hso-chu"><span class="hso-chu-sl">số liệu</span><span class="hso-chu-kb">khai báo</span><span class="hso-chu-tay">…… ghi tay</span></span>'+   /* 3.317 (anh): chú thích màu cùng dòng tên mẫu */
    '<span class="hso-ky" title="Số liệu lấy theo kỳ / ngày đang chọn ở dải lịch">📅 <b>'+(KHO.coKy() ? slKyChu(KHO.ky().ky) : 'chưa có số liệu')+'</b></span>'+   /* 3.334: dời từ dải chip mẫu xuống dòng tên mẫu → dải chip không bị đè */
    '<button class="nho" onclick="hsoKBHop()" title="PGD, logo, trưởng ấp, tổ phó thực tế, chương trình vay — dùng chung mọi mẫu">⚙ Khai báo đơn vị</button></div>'+(M.ghi ? '<div class="sl-phu">'+coChuHTML(M.ghi)+'</div>' : '');
}
function hsoTabMauHTML(){   /* 3.206 (anh chốt 14/10): mỗi biểu mẫu = 1 tab con, bố trí như tab Giao dịch xã · số liệu theo kỳ / ngày đã chọn */
  var p = hsoTab(), M = hsoMau(p);
  return '<div class="gdx2-dau hso-dau">'+cnHang(HSO_MAU[p].filter(function(m){ return !m.an || m.k===M.k; }).map(function(m){
      if(p==='hsv' && m.k==='01td'){ var ctB = (hsoBo()||{}).ct || HSO.vay.ct01 || '';   /* 3.258 (anh 18/10): 01/TD tách chip theo chương trình — 01/TD HSSV · 01/TD NSVSMT · … (không GQVL — mẫu riêng) */
        return hsoCT01Ds().map(function(c){ return gdxChip('<b>01/TD '+coChuHTML(c.ma)+'</b>', M.k==='01td' && ctB===c.ma, 'hsoChon01CT(\''+c.ma+'\')', 'hso-tm', m.ten+' — chương trình '+(c.ten || c.ma)); }).join(''); }
      return gdxChip('<b>'+m.ma+'</b>', m.k===M.k, 'hsoChonMau(\''+m.k+'\')', 'hso-tm', m.ten+(m.ngang ? ' [A4 ngang]' : '')+(m.ghi ? ' — '+m.ghi : '')); }).join(''))+'</div>';   /* 3.334: 📅 Số liệu + ⚙ Khai báo đơn vị dời xuống dòng tên mẫu (hsoDsHTML) */
}
function hsoChonMau(k){ hsoCH()[hsoTab()] = k; luu(); hsoVe(); }
function hsoKhoa(){ var S = hsoCH(); return [hsoTab(), hsoMau().k, S.to||'', KHO.coKy() ? KHO.ky().ky : ''].join('|'); }
function hsoVe(){
  var ds = document.getElementById('hso-ds'); if(!ds) return;
  var S = hsoCH(), t = KHO.to(S.to), M = hsoMau(), k = hsoKhoa();
  if(t && toLaTT(t)) t = null;
  if(HSO.khoa!==k){   /* đổi tổ / mẫu / kỳ → tích mặc định */
    var giuNgay = HSO.o.ngay, cu = String(HSO.khoa||'').split('|'), mo = k.split('|'), cungTo = cu[2] && cu[2]===mo[2] && cu[3]===mo[3], V0 = HSO.vay || {};
    HSO = {khoa:k, kn:{}, ra:{}, tv:{}, vay:{ct:V0.ct || '', md:V0.md || '', chon:{}}, o:{ngay:giuNgay}};
    if(cungTo && V0.kh){ HSO.vay.kh = V0.kh; HSO.vay.ku = V0.ku || ''; }   /* 3.206: đổi mẫu cùng tổ → giữ người vay đang chọn (09A ↔ 01/TĐCK) */
    if(t){ var tv = hsoTVTo(t);
      tv.forEach(function(x){ if(x.vao) HSO.kn[x.kh] = true; if(!x.conNo && !x.chuaGN && !(x.t105>0)) HSO.ra[x.kh] = true; });
      if(TO_BD && TO_BD.to===t.ma && TO_BD.co) TO_BD.ra.forEach(function(r){ HSO.ra[r.kh] = true; }); }
  }
  if(HSO_DEN){ HSO.vay.kh = HSO_DEN.kh; HSO.vay.ku = HSO_DEN.ku; HSO_DEN = null; }   /* 3.430: mở từ chỗ khác (KTGS Mẫu 06 → 06A) */
  if(t && (M.k==='10c' || M.k==='10ccu' || M.k==='10b') && !(TO_BD && TO_BD.to===t.ma && TO_BD.ky===KHO.ky().ky)){ TO_BD = null; toBDNap(t).then(function(){ HSO.khoa = ''; if(document.getElementById('hso-ds')) hsoVe(); }); }
  ds.innerHTML = hsoDsHTML();
  var tm = document.getElementById('hso-tabm'); if(tm){ tm.innerHTML = hsoTabMauHTML(); cnSoatHet(); }
  var tu = document.getElementById('hso-tuy'); if(tu) tu.innerHTML = hsoTuyHTML(M, t);
  var bo = document.querySelector('#tr7 .hso-bo'); if(bo) bo.classList.toggle('hso-rong', M.k==='sohv');   /* 3.214: 📒 Sổ hộ vay dùng hết bề ngang (xem bản in: ⤢ Phóng to / 🖨 In) */
  hsoXem();
}
function hsoXem(){
  clearTimeout(HSO_HEN);
  var f = document.getElementById('hso-xem-khung'), n = document.getElementById('hso-xem-nut'); if(!f) return;
  var x; try { x = hsoLap(); } catch(er){ f.srcdoc = '<p style="font-family:sans-serif;color:#b00">Lập mẫu lỗi: '+coChuHTML(er && er.message || er)+'</p>'; return; }
  HSO.x = x;
  var kem = hsoMau().k==='09a' && hsoLuu().kem06, kem6 = hsoKem06();   /* 3.206: 09A in kèm Mẫu 06/TD · 3.253: 01/TD in kèm 06/TD */
  var khV = hsoTab()==='hsv' && HSO.vay.kh && HSO.vay.kh!=='moi' ? [HSO.vay.kh] : [], Kd = KHO.kyDung();   /* 3.348: 📜 nhật ký đã lập / in */
  if(n) n.innerHTML = xuatHang({ten:x.ten, nk:{mau:(hsoMau().ten || x.ten), to:[hsoCH().to], kh:khV, ky:Kd ? Kd.ky : ''}, html:function(){ return HSO.x.trang; }, word:'hsoWord()', dong:'thXemRong(\'hso-xem-khung\')', dongChu:'⤢ Phóng to',
    'in':kem ? 'hsoIn09Kem()' : kem6 ? 'xuatIn();setTimeout(hsoIn06HS,1500)' : '', truoc:kem ? '<button class="nho" onclick="hsoIn06()" title="In riêng Mẫu 06/TD (phiếu kiểm tra) của món đang gia hạn">🖨 06/TD</button>' : kem6 ? '<button class="nho" onclick="hsoIn06HS()" title="In riêng Mẫu 06/TD (khổ ngang) của hộ này / danh sách 03/TD">🖨 06/TD</button>' : ''});
  if(typeof tgTayGan==='function') tgTayGan(f); else f.onload = null;   /* 3.315: 01/TGTV tự khai — bấm ô trên bản xem */
  xemChuan(f, x.trang); thVuaKhung();
}
function hsoHen(){ clearTimeout(HSO_HEN); HSO_HEN = setTimeout(hsoXem, 250); }
function hsoDatLuu(k, v){ hsoLuu()[k] = v; luu(); hsoHen(); }
function hsoTick(nhom, kh, v){ var T = nhom==='vay' ? HSO.vay.chon : HSO[nhom]; T[kh] = v; hsoHen(); var o = document.getElementById('hso-dem-'+nhom); if(o) o.textContent = Object.keys(T).filter(function(k){ return T[k]; }).length; }
function hsoDocO(){ ['ttMoi','ttCu','phoMoi','phoCu','giao','nhan'].forEach(function(k){ var e = document.getElementById('hso-o-'+k); if(e) HSO.o[k] = e.value; }); hsoHen(); }   /* ô Bên giao / nhận, bầu thay: sửa 1 ô → giữ cả nhóm */

/* ---------- 3.207 (anh yêu cầu 14/10): 🏠 HỘ VAY MỚI — khai báo 1 lần (form nhập nhanh), lưu danh sách (D.cauHinh.hoMoi, đồng bộ Drive cùng cài đặt), gọi ra làm hồ sơ (Bộ HS → 01/TD · 01/UQ · 03/TD) ----------
   hộ = {id, tao, sua, xa, tenXa, diem, tenDiem, thon, tenThon, tv:[{ten, ns, cccd, ncap, noiCap, qh}], dung (người đứng tên vay), hssv (-1 = không)} */
function hmDs(){ var c = D.cauHinh; if(!Array.isArray(c.hoMoi)) c.hoMoi = []; return c.hoMoi; }
var HM = null, HM_CHON = {};
function hmNguoi(){ return {ten:'', ns:'', cccd:'', ncap:'', noiCap:'', qh:'', sdt:''}; }
function hmDiaBan(){   /* xã · điểm GD · ấp lấy từ cây tổ đang có */
  var X = {}; KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(!t || !t.xa || toLaTT(t)) return;
    var x = X[t.xa] = X[t.xa] || {xa:t.xa, tenXa:t.tenXa||t.xa, diem:{}, ap:{}};
    if(t.khoaDiem) x.diem[t.khoaDiem] = t.tenDiem || t.khoaDiem;
    var ak = t.thon || t.tenThon; if(ak){ var a = x.ap[ak] = x.ap[ak] || {thon:t.thon||'', tenThon:t.tenThon||'', diem:{}}; if(t.khoaDiem) a.diem[t.khoaDiem] = 1; } });
  return X;
}
function hmTen(o){ var n = o.tv[o.dung||0] || {}; return n.ten || '(chưa tên)'; }
function hmDiaChiChu(o){ return [o.tenThon ? (/^(ấp|khu phố|kp|thôn)/i.test(o.tenThon) ? o.tenThon : 'Ấp '+o.tenThon) : '', o.tenXa].filter(Boolean).join(', '); }
function hmM31(cccd){ return KHO.timCCCD(cccd); }   /* 3.216: qua cửa KHO */
function hmSuyHTML(n, laDung){   /* giới tính · năm sinh theo CCCD · nơi cấp · hạn CCCD */
  var d = hsoCCCDDoc(n.cccd), so = String(n.cccd||'').replace(/\D/g, ''), r = [];
  if(so && so.length!==12) r.push('<b class="hso-canh">⚠ CCCD '+so.length+' số (cần 12)</b>');
  if(d) r.push(d.gt+', năm sinh theo CCCD '+d.nam+(n.ns ? (+String(n.ns).slice(0, 4)===d.nam ? ' ✓ khớp' : ' — <b class="hso-canh">⚠ khác năm sinh đã nhập ('+String(n.ns).slice(0, 4)+')</b>') : ''));
  if(laDung && n.ncap) r.push('nơi cấp: '+coChuHTML(n.noiCap || hsoNoiCapGY(n.ncap)));
  if(n.ns && so.length===12 && n.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(so, n.ns, n.ncap); r.push(hn.kq==='het' ? '<b class="hso-canh">⚠ CCCD '+coChuHTML(hn.chu)+'</b>' : hn.kq==='sap' ? '<b class="hso-canh">⚠ '+coChuHTML(hn.chu)+'</b>' : (hn.den ? 'hạn CCCD: '+ngayVNsl(hn.den) : coChuHTML(hn.chu||''))); }
  var m = hmM31(so); if(m) r.push('<b>✓ đã có trên Mẫu 31 (mã KH '+coChuHTML(m)+')</b>');
  return r.join(' · ');
}
/* ---------- 3.209 (anh 14/10): SỔ HỘ VAY — hộ mới / lấy từ Mẫu 31; khai tổ khi tạo; chỉ bắt buộc người đứng tên, thành viên / thừa kế, nhiều HSSV bổ sung khi cần;
   hộ cũ có mã KH (nhân thân, SĐT đọc Mẫu 31 mới nhất); hộ mới khớp CCCD trên Mẫu 31 → tự gắn mã KH; in: chọn hộ → chọn chương trình → in (không lưu lịch sử đề nghị vay)
   hộ = {id, kh, to, xa, tenXa, diem, tenDiem, thon, tenThon, tv:[{ten, ns, cccd, ncap, noiCap, qh, sdt}], dung, sv:[chỉ số người HSSV]} (hssv cũ 3.207 = 1 người) */
function hmSV(o){ return Array.isArray(o.sv) ? o.sv : (o.hssv>=0 ? [o.hssv] : []); }
function hmTim(id){ return hmDs().find(function(x){ return x.id===id; }) || null; }
function hmToTen(o){ var t = o.to && KHO.to(o.to); return t ? 'Tổ '+(t.ten||t.ma) : ''; }
function hmGanMa(){   /* hộ mới đã lên Mẫu 31 (khớp CCCD người đứng tên) → gắn mã KH, tổ */
  var doi = 0; hmDs().forEach(function(o){ if(o.kh) return; var n = o.tv[o.dung||0] || {}, m = hmM31(n.cccd); if(!m) return; var c = KHO.danhBa(m) || {}; o.kh = m; if(c.to && !o.to) o.to = c.to; doi++; });
  if(doi) luu(); return doi;
}
function hmChuyenCu(){   /* phiếu hồ sơ chưa gắn sổ (Bộ HS cũ 3.171–3.208, phiếu lập thẳng từ Mẫu 31 / mẫu) → gắn vào hộ trùng CCCD / tên trong sổ, không có thì thêm hộ; phiếu gốc giữ nguyên
     3.240 (anh 17/10 "tab hộ vay cũ và sổ hộ vay chưa link nhau"): chạy MỖI lần (trước chỉ 1 lần → phiếu lập sau đó không lên sổ) */
  var C = D.cauHinh; if(!hsoBoDs().some(function(B){ return !B.hoId && String((B.nv||{}).ten||'').trim(); })) return; C.hoVayChuyen = 1;
  hsoBoDs().forEach(function(B){ var N = B.nv || {}; if(B.hoId || !String(N.ten||'').trim()) return;
    var so = String(N.cccd||'').replace(/\D/g, ''), o = hmDs().find(function(x){ var n = x.tv[x.dung||0] || {}; return so ? String(n.cccd||'').replace(/\D/g, '')===so : slChuan(n.ten)===slChuan(N.ten); });
    if(!o){ o = {id:'hm'+Date.now().toString(36)+Math.random().toString(36).slice(2, 5), tao:B.tao || new Date().toISOString(), kh:B.kh||'', to:B.to||'', xa:'', tenXa:N.tenXa||'', diem:'', tenDiem:'', thon:'', tenThon:N.ap||'',
        tv:[{ten:N.ten, ns:N.ns||'', cccd:N.cccd||'', ncap:N.ncap||'', noiCap:N.noiCap||'', qh:'', sdt:N.sdt||''}].concat((B.ho||[]).filter(function(x){ return x.ten; }).map(function(x){ return {ten:x.ten, ns:x.ns||'', cccd:x.cccd||'', ncap:'', noiCap:'', qh:x.qh||'', sdt:''}; })), dung:0, sv:[]};
      if(B.pa && B.pa.sv){ o.tv.push({ten:B.pa.sv, ns:'', cccd:'', ncap:'', noiCap:'', qh:'Con', sdt:''}); o.sv = [o.tv.length-1]; }
      hmDs().push(o); }
    B.hoId = o.id; });
  luu();
}
function hmTuM31(kh){   /* ＋ Lấy từ Mẫu 31: 1 khách → 1 hộ (trùng mã KH / CCCD → mở hộ đã có) */
  var c = KHO.danhBa(kh); if(!c) return null;
  var co = hmDs().find(function(o){ return o.kh===kh; }); if(co) return co;
  var t = c.to ? KHO.to(c.to) : null, k = KHO.khach(kh, t);
  var o = {id:'hm'+Date.now().toString(36)+Math.random().toString(36).slice(2, 5), tao:new Date().toISOString(), kh:kh, to:c.to||'', xa:c.xa||(t && t.xa)||'', tenXa:k.tenXa||c.tenXa||'', diem:(t && t.khoaDiem)||'', tenDiem:(t && t.tenDiem)||'', thon:c.thon||'', tenThon:c.tenThon||(t && t.tenThon)||'',
    tv:[{ten:k.ten||c.ten||'', ns:k.ns||'', cccd:k.cccd||'', ncap:k.ncap||'', noiCap:k.noiCap||'', qh:'', sdt:c.sdt||''}], dung:0, sv:[]};
  if(c.voChong) o.tv.push({ten:c.voChong, ns:'', cccd:'', ncap:'', noiCap:'', qh:'Vợ / chồng', sdt:''});   /* Mẫu 31 có tên vợ / chồng — gợi ý người thừa kế (ngày sinh, CCCD bổ sung khi in giấy UQ) */
  hmDs().unshift(o); luu(); return o;
}
function hmLayM31(kh){ var o = hmTuM31(kh); if(!o) return bao('Không thấy khách trên Mẫu 31.'); dongHop(); bao('Đã đưa '+hmTen(o)+' vào sổ hộ vay.'); hsoVe(); }
function hmLayTo(){   /* tích tổ viên của tổ đang chọn → đưa nhiều hộ vào sổ 1 lần */
  var ds = Array.prototype.filter.call(document.querySelectorAll('#hop-in .hm-m31-tick:checked'), function(e){ return true; }).map(function(e){ return e.value; });
  if(!ds.length) return bao('Tích tổ viên cần đưa vào sổ.'); ds.forEach(hmTuM31); dongHop(); bao('Đã đưa '+ds.length+' hộ vào sổ hộ vay.'); hsoVe(); }
function hmM31Hop(){
  var S = hsoCH(), t = KHO.to(S.to), tv = t && !toLaTT(t) ? hsoTVTo(t) : [], co = {}; hmDs().forEach(function(o){ if(o.kh) co[o.kh] = 1; });
  moHop('<div class="hop-tit">＋ Lấy hộ từ Mẫu 31</div><div class="hop-phu">Hộ cũ có mã KH; nhân thân, SĐT luôn đọc Mẫu 31 mới nhất. Tên vợ / chồng trên Mẫu 31 đưa vào làm người thừa kế (ngày sinh, CCCD bổ sung khi cần in giấy UQ).</div>'+
    hsoTuyO('Tìm tên / CCCD', '<input placeholder="gõ số CCCD hoặc họ tên" oninput="hmM31Tim(this.value)">')+'<div id="hm-m31-kq" class="hso-tim-kq"></div>'+
    (tv.length ? '<div class="nhan-nhom">Tổ viên tổ đang chọn ('+coChuHTML('Tổ '+(t.ten||t.ma))+')</div><div class="hso-tick-ds">'+tv.map(function(k){ return '<label><input type="checkbox" class="hm-m31-tick" value="'+coChuHTML(k.kh)+'"'+(co[k.kh] ? ' disabled' : '')+'> '+coChuHTML(k.ten)+(co[k.kh] ? ' <small>(đã có trong sổ)</small>' : '')+'</label>'; }).join('')+'</div>'+
      '<div class="hang-nut"><button class="nho chinh" onclick="hmLayTo()">＋ Đưa các hộ đã tích vào sổ</button></div>' : '<div class="sl-phu">Chọn 1 tổ ở khối LỌC ĐỊA BÀN để tích nhiều tổ viên 1 lần.</div>')+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button></div>', true);
}
function hmM31Tim(q){ var o = document.getElementById('hm-m31-kq'); if(!o) return; q = String(q||'').trim(); if(q.length<2){ o.innerHTML = ''; return; }
  var ds = KHO.tim(q, 12);
  o.innerHTML = ds.length ? ds.map(function(r){ var c = KHO.danhBa(r.m) || {}; return '<button class="nho" onclick="hmLayM31(\''+r.m+'\')">'+coChuHTML(r.ten||c.ten||r.m)+' <small>'+coChuHTML([c.ns ? 'sinh '+String(c.ns).slice(0, 4) : '', c.cccd, c.tenThon, c.toTen ? 'tổ '+c.toTen : ''].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="sl-phu">Không thấy trên Mẫu 31 — dùng <b>＋ Hộ mới</b>.</div>'; }
function hmDongBo(o, B){   /* hộ → phiếu làm hồ sơ của hộ (1 phiếu / hộ, ghi đè — không lưu lịch sử): người vay, thành viên, tổ; hộ cũ đọc Mẫu 31 mới nhất */
  var n = o.tv[o.dung||0] || {}, c = o.kh ? KHO.danhBa(o.kh) : null, t = o.to ? KHO.to(o.to) : null, d = hsoCCCDDoc(n.cccd);
  if(c){ var k = KHO.khach(o.kh, t); n = Object.assign({}, n, {ten:k.ten||n.ten, ns:k.ns||n.ns, cccd:k.cccd||n.cccd, ncap:k.ncap||n.ncap, noiCap:k.noiCap||n.noiCap, sdt:c.sdt||n.sdt}); d = hsoCCCDDoc(n.cccd); }
  B.hoId = o.id; B.moi = !o.kh; B.kh = o.kh || ''; B.to = o.to || B.to || ''; if(t) B.toi = hsoTo(t);
  B.nv = Object.assign({}, B.nv||{}, {ten:n.ten||'', ns:n.ns||'', cccd:n.cccd||'', ncap:n.ncap||'', noiCap:n.noiCap || hsoNoiCapGY(n.ncap), sdt:n.sdt||'', gt:(c && c.gt) || (d ? d.gt : (B.nv||{}).gt), danToc:(c && c.danToc) || (B.nv||{}).danToc || 'Kinh',
    ap:hsoApTen({tenThon:o.tenThon || (t && t.tenThon)}) || '', tenXa:o.tenXa || (t && t.tenXa) || ''});
  if(typeof HM_THEM_KHOA!=='undefined'){ var n0 = o.tv[o.dung||0] || {}; HM_THEM_KHOA.forEach(function(k){ if(n0[k]!=null && n0[k]!=='') B.nv[k] = n0[k]; else if(k!=='gt' && k!=='danToc') delete B.nv[k]; }); }   /* 3.223 M2: trường thêm của người đứng tên (anh khai ưu tiên giới tính) */
  B.ho = o.tv.filter(function(x, i){ return i!==(o.dung||0) && x.ten; }).map(function(x){ var h = {ten:x.ten, ns:x.ns||'', cccd:x.cccd||'', qh:x.qh||''}; if(x.ncap) h.ncap = x.ncap; if(x.noiCu) h.noiCu = x.noiCu; return h; });   /* 3.223 M2: + ngày cấp, nơi cư trú (giấy UQ) */
  B.soNguoi = B.soNguoi || String(o.tv.length); B.chon = B.chon || {}; B.chon.tgtv = o.kh ? 0 : 1; B.kem = B.kem || {};
  var sv = hmSV(o).map(function(i){ return (o.tv[i]||{}).ten; }).filter(Boolean);
  if(sv.length){ B.pa = B.pa || {}; if(sv.indexOf(B.pa.sv)<0) B.pa.sv = sv[0]; }
}
function hmBo(o){   /* phiếu làm hồ sơ của hộ (tạo nếu chưa có) → đặt làm bộ đang chọn */
  var B = hsoBoDs().find(function(b){ return b.hoId===o.id; });
  if(!B){ B = hsoBoMoi(); if(hmSV(o).length) B.ct = 'HSSV'; }
  hmDongBo(o, B); hsoCH().boId = B.id; hsoBoLuu(); return B;
}
function hmLamHS(id, mau){ var o = hmTim(id); if(!o) return; hmBo(o); hsoChonMau(mau || '01td'); }
function hmChonHo(id){ if(!id){ hsoCH().boId = ''; luu(); hsoVe(); return; } hmLamHS(id, hsoMau().k); }
function hmLapHTML(ds, loc, nhom){   /* khung phải: bảng sổ hộ vay (in được) — 3.214: A4 ngang đủ cột; hộ cũ theo Mẫu 31 mới nhất (như khi in hồ sơ) */
  ds = ds || hmDs();
  var nw = ' style="white-space:nowrap"';
  return '<p class="c b s14">SỔ HỘ VAY</p><p class="c i s11">(khai báo trên máy — '+ngayVNsl(ngayISO(nay()))+(loc ? ' · '+coChuHTML(loc) : '')+')</p><p>&nbsp;</p>'+
    hsoBang('luoi s11', [4, 17, 8, 11, 8, 8, 9, 9, 9, 12, 4, 10], '<tr><td class="c b">STT</td><td class="c b">Người đứng tên vay</td><td class="c b">Ngày sinh</td><td class="c b">Số CCCD</td><td class="c b">Ngày cấp</td><td class="c b">Hạn CCCD</td><td class="c b">Số điện thoại</td><td class="c b">Mã KH</td><td class="c b">Tổ</td><td class="c b">Ấp · xã</td><td class="c b">Số người</td><td class="c b">HSSV</td></tr>'+
      (ds.length ? ds.map(function(o, i){ var n = hmNguoiDung(o).n, sv = hmSV(o).map(function(k){ return (o.tv[k]||{}).ten; }).filter(Boolean), m = hmSoThang(o);
        var dau = nhom && (!i || hmSoThang(ds[i-1])!==m) ? '<tr><td colspan="12" class="b">'+hmSoThangChu(m)+' ('+ds.filter(function(x){ return hmSoThang(x)===m; }).length+' hộ)</td></tr>' : '';   /* 3.227: nhóm theo tháng nhập */
        return dau+'<tr><td class="c">'+(i+1)+'</td><td>'+coChuHTML(n.ten||'')+'</td><td class="c"'+nw+'>'+(n.ns ? ngayVNsl(n.ns) : '')+'</td><td class="c"'+nw+'>'+coChuHTML(n.cccd||'')+'</td><td class="c"'+nw+'>'+(n.ncap ? ngayVNsl(n.ncap) : '')+'</td><td class="c">'+coChuHTML(hmHan(n))+'</td><td class="c"'+nw+'>'+coChuHTML(n.sdt||'')+'</td><td class="c"'+nw+'>'+coChuHTML(o.kh||'')+'</td><td>'+coChuHTML(hmToTen(o))+'</td><td>'+coChuHTML(hmDiaChiChu(o))+'</td><td class="c">'+o.tv.length+'</td><td>'+coChuHTML(sv.join(', '))+'</td></tr>'; }).join('')
        : '<tr><td colspan="12" class="c i">Chưa có hộ</td></tr>'));
}
var HM_O = '';   /* 3.214: ô cần đặt con trỏ sau khi vẽ lại form (data-hm) */
function hmMo(id, db){   /* db: địa bàn giữ lại khi "Lưu & thêm hộ tiếp" */
  var o = id ? hmTim(id) : null;
  HM = o ? JSON.parse(JSON.stringify(o)) : {id:'', kh:'', to:'', xa:'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'', tv:[hmNguoi()], dung:0, sv:[]};
  HM.sv = hmSV(HM).slice(); delete HM.hssv; if(typeof HM_THEM_MO!=='undefined') HM_THEM_MO = {};
  if(!o && db) Object.assign(HM, db);
  else if(!o){ var S = hsoCH(), t = KHO.to(S.to); if(t && !toLaTT(t)){ HM.xa = t.xa||''; HM.tenXa = t.tenXa||''; HM.diem = t.khoaDiem||''; HM.tenDiem = t.tenDiem||''; HM.thon = t.thon||''; HM.tenThon = t.tenThon||''; HM.to = t.ma; } else if(S.xa && KHO.coKy()){ var X = hmDiaBan()[S.xa]; if(X){ HM.xa = X.xa; HM.tenXa = X.tenXa; } } }   /* gợi ý địa bàn, tổ theo khối lọc */
  var dau = ['ten', 'ns', 'cccd', 'ncap'], n0 = HM.tv[HM.dung||0] || {}, f0 = dau.find(function(f){ return !n0[f]; });   /* 3.214: con trỏ ở ô đầu còn trống của người đứng tên */
  HM_O = (HM.dung||0)+':'+(f0 || 'ten');
  hmVe(); if(typeof khNap==='function') khNap(khVeForm);
}
function hmDsTo(){ if(!KHO.coKy() || !HM.xa) return []; return KHO.maTo().map(function(m){ return KHO.to(m); }).filter(function(t){ return t && !toLaTT(t) && t.xa===HM.xa && (!HM.diem || t.khoaDiem===HM.diem) && (!(HM.thon||HM.tenThon) || t.thon===HM.thon || t.tenThon===HM.tenThon); })
  .sort(function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi'); }); }
function hmVe(){
  var X = hmDiaBan(), x = X[HM.xa], coDB = Object.keys(X).length;
  var a = document.activeElement, giu = HM_O || (a && a.closest && a.closest('#hop-in') && a.getAttribute('data-hm')) || ''; HM_O = '';   /* 3.214: vẽ lại không mất con trỏ */
  var dsTo = hmDsTo();
  var dc = coDB ? '<div class="hm-dc">'+
      CAY.dong([CAY.o('xa', HM.xa, '— Xã / phường —', CAY.dsXa(), 'data-hm="xa" onchange="hmDatXa(this.value)"'),   /* 3.328: cây địa bàn nhúng dùng chung (js/57) */
        x ? CAY.o('diem', HM.diem, '— Điểm GD (lọc ấp, không bắt buộc) —', CAY.dsDiem(HM.xa).map(function(d){ return [d[0], 'Điểm '+d[1]]; }), 'data-hm="diem" onchange="hmDatDiem(this.value)"') : '',
        x ? CAY.o('ap', HM.thon || HM.tenThon, '— Ấp / khu phố —', CAY.dsAp(HM.xa, HM.diem), 'data-hm="ap" onchange="hmDatAp(this.value)"') : '',
        x ? CAY.o('to', HM.to, '— Tổ TK&VV ('+dsTo.length+') —', dsTo.map(function(t){ return [t.ma, CAY.chuTo(t)]; }), 'data-hm="to" onchange="HM.to=this.value;hmVe()"') : ''])+'</div>'
    : '<div class="hm-dc"><input data-hm="tenXa" placeholder="Xã / phường" value="'+coChuHTML(HM.tenXa)+'" onchange="HM.tenXa=this.value"><input data-hm="tenThon" placeholder="Ấp / khu phố" value="'+coChuHTML(HM.tenThon)+'" onchange="HM.tenThon=this.value"></div>';
  /* 3.214 (anh 15/10): mỗi người 1 dòng lưới có tiêu đề cột — Enter / Tab sang ô kế (phím chung), gõ xong không vẽ lại cả hộp */
  var nguoi = HM.tv.map(function(n, i){ var o = function(f, ph){ return '<input data-hm="'+i+':'+f+'" value="'+coChuHTML(hmGiaTri(n, f))+'" placeholder="'+ph+'" onchange="hmDat('+i+',\''+f+'\',this.value,this)">'; };
    return '<div class="hm-nguoi'+(i===HM.dung ? ' dung' : '')+'"><div class="hm-luoi"><b>'+(i+1)+'</b>'+'<span class="qc-o">'+o('ten', 'Họ tên')+(typeof qcNut==='function' ? qcNut('hm', i) : '')+'</span>'+o('ns', 'gõ 150378')+o('cccd', '12 số')+o('ncap', 'gõ 9112021')+o('sdt', 'Số điện thoại')+
      (i ? o('qh', 'Quan hệ') : '<span class="hm-qh">Chủ hộ</span>')+
      '<label class="hm-o-c" title="Người đứng tên vay"><input type="radio" name="hm-dung"'+(i===HM.dung ? ' checked' : '')+' onchange="HM.dung='+i+';hmVe()"></label>'+
      '<label class="hm-o-c" title="Học sinh, sinh viên vay HSSV"><input type="checkbox"'+(HM.sv.indexOf(i)>=0 ? ' checked' : '')+' onchange="hmDatSV('+i+',this.checked)"></label>'+
      (i ? '<button class="nho" title="Bỏ người này" onclick="hmBoNguoi('+i+')">✕</button>' : '<span></span>')+'</div>'+
      '<div class="sl-phu hm-suy" id="hm-suy-'+i+'">'+hmSuyHTML(n, i===HM.dung)+'</div>'+(typeof hmThemHTML==='function' ? hmThemHTML(i, n) : '')+'</div>'; }).join('');   /* 3.223 M2: ➕ thông tin thêm */
  var dau = '<div class="hm-luoi hm-luoi-dau"><span>#</span><span>Họ và tên</span><span>Ngày sinh</span><span>Số CCCD</span><span>Ngày cấp CCCD</span><span>Số điện thoại</span><span>Quan hệ</span><span>Đứng tên</span><span>HSSV</span><span></span></div>';
  moHop('<div class="hop-tit">👪 '+(HM.id ? 'Sửa hộ vay' : 'Khai báo hộ vay mới')+(HM.kh ? ' <small>· mã KH '+coChuHTML(HM.kh)+' (Mẫu 31)</small>' : '')+'</div><div class="hop-phu">Chỉ bắt buộc <b>người đứng tên vay</b>; thành viên / thừa kế, HSSV bổ sung khi cần (giấy UQ mới cần đủ thừa kế). Ngày gõ liền số (150378 = 15/03/1978).'+(HM.kh ? ' Hộ cũ: nhân thân in theo Mẫu 31 mới nhất.' : '')+'</div>'+
    '<div class="nhan-nhom">📍 Địa chỉ · tổ</div>'+dc+'<div class="nhan-nhom">👪 Người trong hộ</div>'+dau+nguoi+
    '<div class="hang-nut"><button class="nho" onclick="hmThemNguoi()">＋ Thành viên / thừa kế / HSSV</button></div>'+
    (typeof khFormHTML==='function' ? '<div class="nhan-nhom">🔎 Kiểm tra <small>(<a href="#" data-lenh="kh.luat">⚙ khai báo luật</a> — mở chồng, đóng là về form hộ)</small></div><div id="hm-kiem" class="hm-kiem">'+khFormHTML()+'</div>' : '')+
    '<div class="sl-phu hm-phim">⌨ Enter / Tab sang ô kế · Shift+Enter lùi · ↑ ↓ đổi lựa chọn ô chọn · <b>Ctrl+Enter lưu</b></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho" onclick="hmLuu(1)" title="Lưu rồi mở form trống cùng địa bàn, tổ — nhập liên tục nhiều hộ">💾 Lưu &amp; thêm hộ tiếp</button><button class="nho chinh" onclick="hmLuu()">💾 Lưu hộ</button></div>', true);
  document.getElementById('hop-in').classList.add('phim-chung');
  if(giu){ var e = document.querySelector('#hop-in [data-hm="'+giu+'"]'); if(e){ e.focus(); if(e.select && e.tagName==='INPUT' && !e.value) e.select(); } }
}
function hmThemNguoi(){ HM.tv.push(hmNguoi()); HM_O = (HM.tv.length-1)+':ten'; hmVe(); }
function hmGiaTri(n, f){ return (f==='ns' || f==='ncap') ? (n[f] ? ngayVNsl(n[f]) : '') : (n[f]||''); }
function hmDocNgay(v){ return typeof gdxDocNgay==='function' ? gdxDocNgay(v) : hsoNgayTu(v); }   /* gõ dd/mm/yyyy hoặc liền số → yyyy-mm-dd */
function hmChuan(n, f, v){   /* 3.214: chuẩn hóa 1 ô người — dùng chung form hộ + bảng 📒 Sổ hộ vay */
  v = String(v||'').trim();
  if(f==='ns' || f==='ncap'){ var iso = hmDocNgay(v); n[f] = iso || ''; if(v && !iso) bao('Ngày chưa đọc được: '+v+' — gõ dd/mm/yyyy hoặc liền số (150378).'); }
  else if(f==='cccd') n.cccd = v.replace(/\D/g, '');
  else if(f==='sdt') n.sdt = v.replace(/[^\d+ ]/g, '').trim();
  else if(f==='ten') n.ten = tenHoaDau(v.replace(/\s+/g, ' '));
  else n[f] = v;
  if(f==='ncap') n.noiCap = hsoNoiCapGY(n.ncap);
}
function hmDatSV(i, v){ var k = HM.sv.indexOf(i); if(v && k<0) HM.sv.push(i); if(!v && k>=0) HM.sv.splice(k, 1); hmVe(); }
function hmDat(i, f, v, el){   /* 3.214: không vẽ lại cả hộp — chỉ sửa ô + dòng gợi ý (giữ con trỏ khi Enter / Tab) */
  var n = HM.tv[i]; if(!n) return;
  hmChuan(n, f, v);
  el = el || document.querySelector('#hop-in [data-hm="'+i+':'+f+'"]'); if(el && el.value!==hmGiaTri(n, f)) el.value = hmGiaTri(n, f);
  var g = document.getElementById('hm-suy-'+i); if(g) g.innerHTML = hmSuyHTML(n, i===HM.dung);
  if(typeof khVeForm==='function') khVeForm();   /* 3.228: 🔎 kiểm tra lại khi rời ô */
}
function hmBoNguoi(i){ HM.tv.splice(i, 1); if(HM.dung>=HM.tv.length || HM.dung===i) HM.dung = 0; else if(HM.dung>i) HM.dung--; HM.sv = HM.sv.filter(function(k){ return k!==i; }).map(function(k){ return k>i ? k-1 : k; }); hmVe(); }
function hmDatXa(v){ var x = hmDiaBan()[v]; HM.xa = v; HM.tenXa = x ? x.tenXa : ''; HM.diem = ''; HM.tenDiem = ''; HM.thon = ''; HM.tenThon = ''; HM.to = ''; hmVe(); }
function hmDatDiem(v){ var x = hmDiaBan()[HM.xa]; HM.diem = v; HM.tenDiem = x && v ? x.diem[v] : ''; HM.to = ''; hmVe(); }
function hmDatAp(v){ var x = hmDiaBan()[HM.xa], a = x && x.ap[v]; HM.thon = a ? a.thon : ''; HM.tenThon = a ? a.tenThon : ''; var ds = hmDsTo(); if(!ds.some(function(t){ return t.ma===HM.to; })) HM.to = ds.length===1 ? ds[0].ma : ''; hmVe(); }
function hmLuu(tiep){
  var n = HM.tv[HM.dung||0] || {}; if(!String(n.ten||'').trim()) return bao('Nhập họ tên người đứng tên vay.');
  var so = String(n.cccd||'').replace(/\D/g, ''), trung = so && hmDs().find(function(x){ var m = x.tv[x.dung||0] || {}; return x.id!==HM.id && String(m.cccd||'').replace(/\D/g, '')===so; });
  if(trung){ bao('CCCD '+so+' đã có trong sổ ('+hmTen(trung)+') — mở hộ đã có.', 5); hmMo(trung.id); return; }
  var chan = typeof khKiem==='function' ? khKiem(HM).filter(function(x){ return x.muc==='chan'; }) : [];   /* 3.228: luật 🔴 chặn lưu */
  if(chan.length){ khVeForm(); return bao('🔴 Chưa lưu được: '+chan.map(function(x){ return x.chu; }).join('; '), 8); }
  var giu = HM.tv.map(function(x, i){ return i===HM.dung || HM.sv.indexOf(i)>=0 || String(x.ten||'').trim() ? i : -1; }).filter(function(i){ return i>=0; });
  var dung = giu.indexOf(HM.dung); HM.sv = HM.sv.map(function(i){ return giu.indexOf(i); }).filter(function(i){ return i>=0; }); HM.tv = giu.map(function(i){ return HM.tv[i]; }); HM.dung = dung<0 ? 0 : dung;
  if(!HM.kh){ var m = hmM31(HM.tv[HM.dung].cccd); if(m){ HM.kh = m; if(!HM.to) HM.to = (KHO.danhBa(m)||{}).to || ''; } }
  var ds = hmDs(); HM.sua = new Date().toISOString();
  if(!HM.id){ HM.id = 'hm'+Date.now().toString(36); HM.tao = HM.sua; ds.unshift(HM); } else { var i = ds.findIndex(function(x){ return x.id===HM.id; }); if(i>=0) ds[i] = HM; else ds.unshift(HM); }
  var B = hsoBoDs().find(function(b){ return b.hoId===HM.id; }); if(B) hmDongBo(HM, B);
  var db = {xa:HM.xa, tenXa:HM.tenXa, diem:HM.diem, tenDiem:HM.tenDiem, thon:HM.thon, tenThon:HM.tenThon, to:HM.to};
  luu(); dongHop(); bao('Đã lưu hộ '+hmTen(HM)+' vào sổ hộ vay.'); HM = null; hsoVe();
  if(tiep) hmMo(null, db);   /* 3.214: nhập liên tục — giữ xã, điểm, ấp, tổ */
}
function hmXoa(id){ var o = hmTim(id); if(!o) return; hoi('Xóa hộ '+hmTen(o)+' khỏi sổ hộ vay?', 'Không ảnh hưởng số liệu Mẫu 31.', 'Xóa', function(){ var ds = hmDs(), i = ds.indexOf(o); if(i>=0) ds.splice(i, 1); hsoBoDs().forEach(function(b){ if(b.hoId===id) delete b.hoId; }); luu(); hsoVe(); }); }
/* ---------- 3.214 (anh 15/10): 📒 SỔ HỘ VAY — tab xem lại: lọc, sắp xếp, sửa thẳng từng ô (hộ mới), in đúng danh sách đang lọc ---------- */
var HM_SO = {q:'', loai:'', mau:'', tu:'', den:'', nhom:1, gon:{}};   /* 3.227 (anh 17/10): + địa bàn theo khối LỌC ĐỊA BÀN, ngày nhập từ / đến, nhóm theo tháng (gon: tháng đang gập) */
function hmNgayNhap(o){ var d = o.tao ? new Date(o.tao) : null; return d && !isNaN(d) ? ngayISO(d) : ''; }   /* ngày đưa hộ vào sổ (giờ máy, không lệch múi giờ) */
function hmSoThang(o){ return hmNgayNhap(o).slice(0, 7); }
function hmSoThangChu(m){ return m ? 'Tháng '+m.slice(5, 7)+'/'+m.slice(0, 4) : 'Chưa rõ ngày nhập'; }
function hmTrongDB(o, S){   /* 3.227: hộ thuộc địa bàn đang chọn — có tổ: theo tổ (Xã › Điểm · Hội › Tổ); chưa có tổ: theo xã / điểm đã khai */
  if(!KHO.coKy() || !(S.xa || S.hoi)) return true;
  var t = o.to ? KHO.to(o.to) : null; if(t) return pvLoc(S, t);
  if(!o.to && !o.xa) return true;   /* 3.234: hộ nhập trước 3.227 / chưa khai địa bàn → luôn hiện (không "mất" hộ), cột Cần bổ sung nhắc khai tổ */
  if(S.hoi || S.to) return false;
  return o.xa===S.xa && (!S.diem || o.diem===S.diem);
}
function hmSoKhoangTinh(k){   /* nút nhanh ngày nhập → [từ, đến] */
  var n = nay(), y = n.getFullYear(), m = n.getMonth(), q = m-m%3;
  var r = k==='thang' ? [new Date(y, m, 1), new Date(y, m+1, 0)] : k==='truoc' ? [new Date(y, m-1, 1), new Date(y, m, 0)] : k==='quy' ? [new Date(y, q, 1), new Date(y, q+3, 0)] : k==='nam' ? [new Date(y, 0, 1), new Date(y, 11, 31)] : null;
  return r ? r.map(ngayISO) : ['', ''];
}
function hmSoKhoang(k){ var r = hmSoKhoangTinh(k); HM_SO.tu = r[0]; HM_SO.den = r[1]; hsoVe(); }
function hmSoNgay(f, v){ v = String(v||'').trim(); var iso = v ? hmDocNgay(v) : ''; if(v && !iso) return bao('Ngày chưa đọc được: '+v+' — gõ dd/mm/yyyy hoặc liền số (1102026).'); HM_SO[f] = iso; hsoVe(); }
function hmSoGon(m){ HM_SO.gon[m] = !HM_SO.gon[m]; hmSoVeBang(); }
function hmSoTick(id, v){ if(v) HM_CHON[id] = true; else delete HM_CHON[id]; hmSoVeNut(); }
function hmSoTickThang(m, v){ hmSoDs().forEach(function(r){ if(hmSoThang(r.o)===m){ if(v) HM_CHON[r.o.id] = true; else delete HM_CHON[r.o.id]; } }); hmSoVeBang(); }
function hmSoNutChonHTML(){ var n = hmDs().filter(function(o){ return HM_CHON[o.id]; }).length;
  return n ? '<button class="nho chinh" onclick="hsoD03TuChon()" title="Cùng 1 chương trình in chung 1 mẫu 03/TD">📋 Lập 03/TD ('+n+' hộ)</button><button class="nho" onclick="HM_CHON={};hmSoVeBang()" title="Bỏ tích tất cả">✕ Bỏ chọn</button>'
    : '<span class="sl-phu">☐ tích hộ → 📋 Lập 03/TD</span>'; }
function hmSoVeNut(){ var e = document.getElementById('hm-so-chon'); if(e) e.innerHTML = hmSoNutChonHTML(); }
function hmSoSX(){ var L = hsoLuu(); return L.soSX || {k:'tao', xuoi:0}; }
function hmNguoiDung(o){   /* người đứng tên: hộ cũ đọc Mẫu 31 mới nhất (như khi in hồ sơ), hộ mới theo sổ */
  var n = o.tv[o.dung||0] || {}, c = o.kh ? KHO.danhBa(o.kh) : null;   /* 3.216: qua cửa KHO */
  if(!c) return {n:n, m31:false};
  var t = o.to ? KHO.to(o.to) : null, k = KHO.khach(o.kh, t);
  return {n:{ten:k.ten||n.ten, ns:k.ns||n.ns, cccd:k.cccd||n.cccd, ncap:k.ncap||n.ncap, noiCap:k.noiCap||n.noiCap, sdt:c.sdt||n.sdt}, m31:true};
}
function hmHan(n){ var so = String(n.cccd||'').replace(/\D/g, ''); if(so.length!==12 || !n.ns || !n.ncap || typeof toCCCDHan!=='function') return ''; var h = toCCCDHan(so, n.ns, n.ncap); return h.den ? ngayVNsl(h.den) : (h.chu||''); }
function hmThieu(o, n){   /* còn thiếu / cần sửa trước khi in hồ sơ */
  var r = [], so = String(n.cccd||'').replace(/\D/g, '');
  if(!so) r.push('CCCD'); else if(so.length!==12) r.push('CCCD '+so.length+' số');
  if(!n.ns) r.push('ngày sinh'); if(!n.ncap) r.push('ngày cấp');
  if(!o.to && !o.tenThon) r.push('địa chỉ / tổ');
  if(so.length===12 && n.ns && n.ncap && typeof toCCCDHan==='function'){ var h = toCCCDHan(so, n.ns, n.ncap); if(h.kq==='het') r.push('CCCD hết hạn'); else if(h.kq==='sap') r.push('CCCD sắp hết hạn'); }
  return r;
}
function hmSoDs(){
  hmChuyenCu(); hmGanMa();
  var q = slChuan(HM_SO.q), S = hmSoSX(), d = S.xuoi ? 1 : -1, P = hsoCH();
  var ds = hmDs().map(function(o, i){ var x = hmNguoiDung(o); return {o:o, n:x.n, m31:x.m31, thieu:hmThieu(o, x.n), thu:i, kiem:typeof khKiem==='function' ? khKiem(o) : []}; }).filter(function(r){ var o = r.o, ng = hmNgayNhap(o);
    if(HM_SO.loai==='cu' && !o.kh || HM_SO.loai==='moi' && o.kh || HM_SO.loai==='sv' && !hmSV(o).length || HM_SO.loai==='thieu' && !r.thieu.length || HM_SO.loai==='chuaTo' && o.to || HM_SO.loai==='canh' && !khCon(o, r.kiem).length) return false;
    if(!hmTrongDB(o, P)) return false;
    if(HM_SO.tu && (!ng || ng<HM_SO.tu) || HM_SO.den && (!ng || ng>HM_SO.den)) return false;
    if(HM_SO.mau && typeof hmThieuMau==='function' && !hmThieuMau(o, r.n)[HM_SO.mau]) return false;   /* 3.223 M2: lọc thiếu cho mẫu */
    return !q || slChuan([o.kh, hmToTen(o), hmDiaChiChu(o), r.n.ten, r.n.cccd].concat(o.tv.map(function(n){ return n.ten+' '+n.cccd; })).join(' ')).indexOf(q)>=0; });
  var key = function(r){ var o = r.o, ten = slChuan(r.n.ten||'');
    if(S.k==='ten') return ten.split(' ').pop()+' '+ten;   /* xếp theo tên (chữ cuối) như sổ sách */
    if(S.k==='ns') return r.n.ns || '';
    if(S.k==='to') return slChuan(hmToTen(o)+' '+hmDiaChiChu(o))+' '+ten;
    if(S.k==='sua') return o.sua || o.tao || '';
    return r.o.tao || ''; };   /* 'tao': ngày nhập vào sổ (cùng lúc → thứ tự trong sổ) */
  var dT = S.k==='tao' ? d : -1;   /* nhóm tháng: tháng mới trước (trừ khi đang xếp ngày nhập tăng dần) */
  return ds.sort(function(a, b){ if(HM_SO.nhom){ var ta = hmSoThang(a.o), tb = hmSoThang(b.o); if(ta!==tb) return !ta ? 1 : !tb ? -1 : ta<tb ? -dT : dT; }
    var x = key(a), y = key(b); return x<y ? -d : x>y ? d : a.thu-b.thu; });
}
function hmSoLocChu(){ var r = [], L = {cu:'hộ cũ', moi:'hộ mới', sv:'có HSSV', thieu:'thiếu / cần sửa', chuaTo:'chưa có tổ', canh:'có cảnh báo kiểm tra'}, P = hsoCH();
  if(KHO.coKy() && (P.xa || P.hoi)) r.push(pvChu(P, PV_DUNG.hsv.K()));
  if(HM_SO.loai) r.push(L[HM_SO.loai]);
  if(HM_SO.tu || HM_SO.den) r.push('ngày nhập'+(HM_SO.tu ? ' từ '+ngayVNsl(HM_SO.tu) : '')+(HM_SO.den ? ' đến '+ngayVNsl(HM_SO.den) : ''));
  if(HM_SO.q) r.push('tìm "'+HM_SO.q+'"');
  return r.length ? 'lọc: '+r.join(', ') : ''; }
function hmSoSapXep(k){ var S = hmSoSX(); if(S.k===k) S.xuoi = S.xuoi ? 0 : 1; else { S.k = k; S.xuoi = (k==='tao' || k==='sua') ? 0 : 1; } hsoLuu().soSX = S; luu(); hsoVe(); }
function hmSoBangHTML(ds){
  var S = hmSoSX(), COT = 15, dem = {}, h = '', stt = 0, thang = null;
  var th = function(k, chu){ var on = k && S.k===k; return '<th'+(k ? ' class="hm-so-sx'+(on ? ' on' : '')+'" onclick="hmSoSapXep(\''+k+'\')" title="Bấm để sắp xếp (bấm lại: đảo chiều)"' : '')+'>'+chu+(on ? (S.xuoi ? ' ▲' : ' ▼') : '')+'</th>'; };
  var o5 = function(r, f, ph){ var v = coChuHTML(hmGiaTri(r.n, f));
    return r.m31 ? '<td class="hm-so-m31" title="Hộ cũ — theo Mẫu 31 mới nhất (sửa ở hệ thống, nạp lại Mẫu 31)">'+(v || '—')+'</td>'
      : '<td><input data-so="'+f+'" value="'+v+'" placeholder="'+ph+'" onchange="hmSoSua(\''+r.o.id+'\',\''+f+'\',this)" onkeydown="hmSoPhim(event)"></td>'; };
  if(HM_SO.nhom) ds.forEach(function(r){ var m = hmSoThang(r.o); (dem[m] = dem[m] || []).push(r.o.id); });
  ds.forEach(function(r){ var o = r.o, m = hmSoThang(o), sv = hmSV(o).map(function(k){ return (o.tv[k]||{}).ten; }).filter(Boolean);
    if(HM_SO.nhom && m!==thang){ thang = m; var gon = HM_SO.gon[m], du = dem[m].every(function(id){ return HM_CHON[id]; });   /* 3.227: dòng tiêu đề tháng — bấm để gập / mở, ô tích cả tháng */
      h += '<tr class="hm-so-thang"><td class="c"><input type="checkbox" title="Tích / bỏ cả tháng (lập 03/TD)"'+(du ? ' checked' : '')+' onchange="hmSoTickThang(\''+m+'\',this.checked)"></td>'+
        '<td colspan="'+(COT-1)+'" onclick="hmSoGon(\''+m+'\')" title="Bấm để '+(gon ? 'mở' : 'gập')+' tháng này">'+(gon ? '▸' : '▾')+' <b>'+hmSoThangChu(m)+'</b> · '+dem[m].length+' hộ</td></tr>'; }
    if(HM_SO.nhom && HM_SO.gon[m]) return;
    h += '<tr data-id="'+o.id+'"'+(r.thieu.length ? ' class="hm-so-thieu"' : '')+'><td class="c"><input type="checkbox" class="hm-chon" title="Tích để lập 03/TD nhiều hộ"'+(HM_CHON[o.id] ? ' checked' : '')+' onchange="hmSoTick(\''+o.id+'\',this.checked)"></td>'+
      '<td class="c">'+(++stt)+'</td><td class="c hm-so-han">'+(hmNgayNhap(o) ? ngayVNsl(hmNgayNhap(o)) : '—')+'</td>'+
      '<td class="hm-nut"><button class="nho" onclick="hmMo(\''+o.id+'\')" title="Sửa đầy đủ: địa chỉ, tổ, thành viên / thừa kế, HSSV">✎</button><button class="nho chinh" onclick="hmLamHS(\''+o.id+'\')" title="In hồ sơ (01/TD, in kèm…)">📄</button><button class="nho" onclick="hmXoa(\''+o.id+'\')" title="Xóa khỏi sổ">🗑</button></td>'+o5(r, 'ten', 'Họ tên')+o5(r, 'ns', '150378')+o5(r, 'cccd', '12 số')+o5(r, 'ncap', '9112021')+
      '<td class="hm-so-han">'+coChuHTML(hmHan(r.n))+'</td>'+o5(r, 'sdt', '')+
      '<td>'+(o.kh ? '<span class="hm-m31">'+coChuHTML(o.kh)+'</span>' : '<span class="hm-moi">hộ mới</span>')+'</td>'+
      '<td>'+coChuHTML([hmToTen(o), hmDiaChiChu(o)].filter(Boolean).join(' · ') || '—')+'</td><td class="c">'+o.tv.length+'</td><td>'+coChuHTML(sv.join(', '))+'</td>'+
      '<td class="hm-so-lt">'+hmSoLtHTML(r)+'</td></tr>'; });
  return '<table class="hm-so"><colgroup><col style="width:30px"><col style="width:36px"><col style="width:84px"><col style="width:132px"><col style="width:165px"><col style="width:90px"><col style="width:112px"><col style="width:90px"><col style="width:104px"><col style="width:100px"><col style="width:94px"><col style="width:165px"><col style="width:44px"><col style="width:100px"><col style="width:130px"></colgroup>'+
    '<thead><tr>'+th('', '')+th('', 'STT')+th('tao', 'Ngày nhập')+th('', '')+th('ten', 'Người đứng tên vay')+th('ns', 'Ngày sinh')+th('', 'Số CCCD')+th('', 'Ngày cấp')+th('', 'Hạn CCCD')+th('', 'Số điện thoại')+th('', 'Mã KH')+th('to', 'Tổ · địa chỉ')+th('', 'Người')+th('', 'HSSV')+th('', 'Cần bổ sung')+'</tr></thead><tbody>'+
    (ds.length ? h : '<tr><td colspan="'+COT+'" class="c sl-phu hm-so-trong">'+(hmDs().length ? 'Không có hộ khớp bộ lọc ('+hmDs().length+' hộ trong sổ'+(hmSoLocChu() ? ' · '+coChuHTML(hmSoLocChu()) : '')+').'+
      GD.nut({chu:'✕ Bỏ lọc', lenh:'so.boLoc', tit:'Bỏ lọc loại hộ, ngày nhập, ô tìm, thiếu cho mẫu (địa bàn chọn lại ở khối LỌC ĐỊA BÀN)'}) : 'Sổ trống — ＋ Hộ mới hoặc ＋ Lấy từ Mẫu 31.')+'</td></tr>')+'</tbody></table>';
}
function hmSoLtHTML(r){ var o = r.o;   /* ô Cần bổ sung: thiếu thông tin · thiếu cho mẫu · 🔎 cảnh báo kiểm tra (3.228) */
  return (r.thieu.length ? '⚠ '+coChuHTML(r.thieu.join(', ')) : '✓')+(typeof hmThieuMauChu==='function' && hmThieuMauChu(o, r.n, HM_SO.mau) ? '<div class="hm-so-mau">'+coChuHTML(hmThieuMauChu(o, r.n, HM_SO.mau))+'</div>' : '')+(typeof khSoHTML==='function' ? khSoHTML(o, r.kiem) : ''); }
function hmSoDemChu(ds){ var n = hmDs().length; return ds.length+(ds.length!==n ? ' / '+n : '')+' hộ'; }
function hsoXemHop(){ var x = HSO.x; if(!x) return;   /* 3.238: ⤢ Phóng to khi khung xem đang ẩn (Sổ hộ vay) → xem bản in trong hộp rộng */
  moHop('<div class="hop-tit">👁 '+coChuHTML(x.ten || 'Xem bản in')+'</div><iframe id="hso-khung2" class="to-khung" title="Xem"></iframe>'+
    GD.hang([GD.nut({chu:'Đóng (Esc)', lenh:'hso.dong'}), GD.nut({chu:'🖨 In', lenh:'hso.in', chinh:1})]), true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong'); xemChuan(document.getElementById('hso-khung2'), x.trang); }
function hmSoDangKy(){ if(hmSoDangKy.xong || typeof GD==='undefined') return; hmSoDangKy.xong = 1;   /* 3.234 (R2): lệnh của thanh lọc sổ — data-lenh="so.…" */
  GD.dangKy('hso', {dong:function(){ dongHop(); }, in:function(){ dongHop(); xuatIn(); }});
  GD.dangKy('so', {boLoc:function(){ HM_SO.loai = ''; HM_SO.q = ''; HM_SO.mau = ''; HM_SO.tu = ''; HM_SO.den = ''; hsoVe(); }, moi:function(){ hmMo(); }, m31:function(){ hmM31Hop(); }, loai:function(el){ HM_SO.loai = el.getAttribute('data-k'); hsoVe(); },
    khoang:function(el){ hmSoKhoang(el.getAttribute('data-k')); }, ngay:function(el){ hmSoNgay(el.getAttribute('data-f'), el.value); },
    tim:function(el){ HM_SO.q = el.value; hmSoVeBang(); }, mau:function(el){ HM_SO.mau = el.value; hsoVe(); }, sx:function(el){ hmSoSapXep(el.value || el.getAttribute('data-k')); },
    nhom:function(el){ HM_SO.nhom = el.checked ? 1 : 0; hmSoVeBang(); }});
}
function hmSoHTML(){
  hmSoDangKy();
  var ds = hmSoDs(), nThieu = 0, nChuaTo = 0, nCanh = 0, S = hmSoSX();
  hmDs().forEach(function(o){ if(!o.to) nChuaTo++; if(hmThieu(o, hmNguoiDung(o).n).length) nThieu++; if(typeof khCon==='function' && khCon(o).length) nCanh++; });
  if(typeof khNap==='function') khNap(hmSoVeBang);   /* món Mẫu 31 mới nhất cho 🔎 kiểm tra (nạp 1 lần) */
  var chip = function(k, chu){ return GD.chip(chu, HM_SO.loai===k, 'so.loai', {k:k}).replace('gd-chip', 'gd-chip hm-so-chip'); };
  var kh = function(k, chu){ var r = hmSoKhoangTinh(k); return GD.chip(chu, HM_SO.tu===r[0] && HM_SO.den===r[1], 'so.khoang', {k:k}).replace('gd-chip', 'gd-chip hm-so-chip'); };
  var ngay = function(f, ph){ return GD.o({loai:'ngay', gt:HM_SO[f] ? ngayVNsl(HM_SO[f]) : '', ph:ph, lenh:'so.ngay', du:{f:f}}).replace('gd-o ', 'gd-o hm-so-ngay '); };
  var chon = function(lenh, tit, ops, gt){ return '<select data-lenh="'+lenh+'" data-su="change" title="'+tit+'">'+ops.map(function(x){ return '<option value="'+x[0]+'"'+(gt===x[0] ? ' selected' : '')+'>'+x[1]+'</option>'; }).join('')+'</select>'; };
  return '<div class="nhan-nhom">📒 Sổ hộ vay — <span id="hm-so-dem">'+hmSoDemChu(ds)+'</span></div>'+
    '<div class="hang-nut hm-so-loc">'+GD.nut({chu:'＋ Hộ mới', lenh:'so.moi', chinh:1})+GD.nut({chu:'📥 Lấy từ Mẫu 31', lenh:'so.m31'})+'<span id="hm-so-chon" class="hm-so-chon">'+hmSoNutChonHTML()+'</span>'+
      GD.o({loai:'tim', id:'hm-so-tim', gt:HM_SO.q, ph:'Tìm tên / CCCD / mã KH / ấp', lenh:'so.tim', su:'input'}).replace('gd-o ', 'gd-o hm-tim ')+
      (typeof HM_MAU_TEN!=='undefined' ? chon('so.mau', 'Chỉ hiện hộ còn thiếu thông tin cho mẫu', [['', 'Thiếu cho mẫu: —']].concat(Object.keys(HM_MAU_TEN).map(function(m){ return [m, 'Thiếu cho '+HM_MAU_TEN[m]]; })), HM_SO.mau) : '')+   /* 3.223 M2 */
      chon('so.sx', 'Sắp xếp', [['tao', '↕ Ngày nhập'], ['ten', '↕ Tên A → Z'], ['ns', '↕ Ngày sinh'], ['to', '↕ Tổ · ấp'], ['sua', '↕ Mới sửa trước']], S.k)+
      GD.nut({chu:S.xuoi ? '▲ Tăng' : '▼ Giảm', lenh:'so.sx', du:{k:S.k}, tit:'Đảo chiều sắp xếp'})+'</div>'+
    '<div class="hang-nut hm-so-loc"><span class="pv-nhan">Ngày nhập</span>'+kh('', 'Tất cả')+kh('thang', 'Tháng này')+kh('truoc', 'Tháng trước')+kh('quy', 'Quý này')+kh('nam', 'Năm nay')+
      ngay('tu', 'từ ngày')+ngay('den', 'đến ngày')+
      '<label class="hso-o2" title="Nhóm các hộ theo tháng nhập vào sổ — bấm dòng tháng để gập / mở"><input type="checkbox" data-lenh="so.nhom" data-su="change"'+(HM_SO.nhom ? ' checked' : '')+'> Nhóm theo tháng</label></div>'+
    '<div class="hang-nut">'+chip('', 'Tất cả')+chip('cu', 'Hộ cũ (mã KH)')+chip('moi', 'Hộ mới')+chip('sv', 'Có HSSV')+chip('thieu', '⚠ Cần bổ sung ('+nThieu+')')+chip('chuaTo', 'Chưa có tổ ('+nChuaTo+')')+chip('canh', '🔎 Có cảnh báo ('+nCanh+')')+'</div>'+
    '<div class="sl-phu">Lọc <b>Xã · Điểm GD · Hội · Tổ</b> ở khối LỌC ĐỊA BÀN phía trên. Hộ mới: sửa thẳng trong bảng — <b>Enter / Tab</b> sang ô kế, <b>↑ ↓</b> lên / xuống dòng, tự lưu. Hộ cũ: nhân thân theo Mẫu 31 mới nhất (chữ xám). <b>✎</b> sửa đầy đủ; bấm dòng tháng để gập / mở; ☐ tích hộ → 📋 Lập 03/TD. 🖨 In = đúng danh sách đang lọc.</div>'+
    '<div class="hm-so-khung" id="hm-so-bang">'+hmSoBangHTML(ds)+'</div>';
}
function hmSoVeBang(){ var k = document.getElementById('hm-so-bang'); if(!k) return hsoVe(); var ds = hmSoDs(); k.innerHTML = hmSoBangHTML(ds); var d = document.getElementById('hm-so-dem'); if(d) d.textContent = hmSoDemChu(ds); hmSoVeNut(); hsoHen(); }
function hmSoSua(id, f, el){   /* sửa 1 ô người đứng tên (hộ mới) — tự lưu, không vẽ lại bảng (giữ con trỏ) */
  var o = hmTim(id), n = o && o.tv[o.dung||0]; if(!n) return;
  var tam = Object.assign({}, n); hmChuan(tam, f, el.value);
  if(f==='ten' && !tam.ten){ bao('Họ tên người đứng tên vay không được để trống.'); el.value = hmGiaTri(n, f); return; }
  if(f==='cccd' && tam.cccd){ var tr = hmDs().find(function(x){ var m = x.tv[x.dung||0] || {}; return x.id!==id && String(m.cccd||'').replace(/\D/g, '')===tam.cccd; });
    if(tr){ bao('CCCD '+tam.cccd+' đã có trong sổ ('+hmTen(tr)+') — không đổi.', 5); el.value = hmGiaTri(n, f); return; } }
  Object.assign(n, tam); o.sua = new Date().toISOString();
  var B = hsoBoDs().find(function(b){ return b.hoId===id; }); if(B) hmDongBo(o, B);
  luu(); el.value = hmGiaTri(n, f);
  var dong = el.closest('tr'); if(dong){ var th = hmThieu(o, n), c = dong.querySelector('.hm-so-lt'), h = dong.querySelector('td.hm-so-han:not(.c)');
    if(c) c.innerHTML = hmSoLtHTML({o:o, n:n, thieu:th, kiem:khKiem(o)}); if(h) h.textContent = hmHan(n); dong.classList.toggle('hm-so-thieu', th.length>0); }
  if(f==='cccd' && !o.kh && hmM31(n.cccd)) bao('CCCD này đã có trên Mẫu 31 — app gắn mã KH, nhân thân sẽ theo Mẫu 31.', 5);
  hsoHen();
}
function hmSoPhim(e){   /* bảng sổ: Enter / Tab sang ô kế (Shift lùi), ↑ ↓ cùng cột dòng trên / dưới */
  var t = e.target, tr = t.closest && t.closest('tr'); if(!tr) return;
  if(e.key==='Enter' || e.key==='Tab'){ e.preventDefault(); e.stopPropagation();
    var ds = Array.prototype.slice.call(t.closest('table').querySelectorAll('input[data-so]')), x = ds[ds.indexOf(t) + (e.shiftKey ? -1 : 1)];
    if(x){ x.focus(); x.select(); } else t.blur(); return; }
  if(e.key==='ArrowDown' || e.key==='ArrowUp'){ var f = t.getAttribute('data-so'), r = tr, y = null;
    while(!y && (r = e.key==='ArrowDown' ? r.nextElementSibling : r.previousElementSibling)) y = r.querySelector('input[data-so="'+f+'"]');
    if(y){ e.preventDefault(); y.focus(); y.select(); } }
}
function hsoTuyPA(B){   /* ③ phương án theo thẻ chương trình (3.208) — dùng ở Bộ HS cũ và 01/TD theo hộ (3.209) */
  var h = '', N = B.nv, A = hsoPA(B);
  if((A.C||{}).kieu==='gqvl') return hsoTuyGQ(B);   /* 3.211 */
  var boNhap = function(nhan, duong, gt, ph, ve, kieu){ return hsoTuyO(nhan, '<input'+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoBoDat(\''+duong+'\',this.value'+(ve ? ',1' : '')+')">'); };
  var C = A.C, P = B.pa || {}, dt = C.dtth;
  var mdOps = function(tu){ return [['', tu]].concat(C.md.map(function(x){ return [x, x]; })); };
  h += '<div class="nhan-nhom">③ Phương án — '+coChuHTML(C.ma)+'</div>';
  if(C.kieu==='hssv'){
    h += boNhap('Tên sinh viên', 'pa.sv', P.sv, 'họ tên sinh viên')+(C.md.length>1 ? hsoTuyO('Mục đích', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— '+C.md[0]+' —').slice(1))) : '')+
      boNhap('Số tháng (bảng 01/TD)', 'pa.soThang', P.soThang, 'gõ số tháng — trống = chấm', 1)+boNhap('Số tiền vay (đ)', 'tien', B.tien, 'gõ số tiền', 1)+
      '<div class="sl-phu">Số tháng, số tiền gõ tay (anh chốt — app không tự tính).</div>';
  } else if(C.kieu==='congtrinh'){
    h += (C.loai ? '<div class="hang-nut">'+(C.loaiDs && C.loaiDs.length ? C.loaiDs : ['Xây mới', 'Sửa chữa']).map(function(x){ return '<label class="hso-o2"><input type="radio" name="hso-loai"'+(hsoLoaiChu(C, P.loai)===x ? ' checked' : '')+' onchange="hsoBoDat(\'pa.loai\',\''+coChuHTML(x.replace(/['"\\]/g, ''))+'\',1)"> '+coChuHTML(x)+'</label>'; }).join('')+'</div>' : '')+
      C.ctr.map(function(c, i){ var k = hsoPaK(i); return '<div class="hso-ho"><label><input type="checkbox"'+(P[k[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'pa.'+k[0]+'\',this.checked,1)"> '+coChuHTML(c.ten)+'</label> <input style="width:38%" value="'+coChuHTML(P[k[1]]||'')+'" placeholder="'+(hsoSo(c.tien) ? '≤ '+tdnTien(hsoSo(c.tien)) : 'số tiền')+'" onchange="hsoBoDat(\'pa.'+k[1]+'\',this.value,1)"></div>'; }).join('')+
      (C.md.length ? hsoTuyO('Mục đích in', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— tự ghép theo công trình —'))) : '')+
      '<div class="sl-phu">Tổng vay: <b>'+tdnTien(A.tien)+'</b> đ'+(A.md ? ' · '+coChuHTML(A.md) : '')+(A.canh.length ? ' — <b class="hso-canh">⚠ '+coChuHTML(A.canh.join('; '))+'</b>' : '')+'</div>';
  } else {
    h += (C.md.length ? hsoTuyO('Mục đích', hsoChon('hsoBoDat(\'pa.md\',this.value,1)', P.md||'', mdOps('— '+C.md[0]+' —').slice(1))) : boNhap('Mục đích', 'pa.md', P.md, 'gõ mục đích vay', 1))+
      boNhap('Đối tượng (bảng 01/TD)', 'pa.dt', P.dt, A.md || 'trống = theo mục đích', 1)+boNhap('Số lượng', 'pa.sl', P.sl, 'vd 01 con, 02 sào…', 1)+boNhap('Số tiền vay (đ)', 'tien', B.tien, 'gõ số tiền', 1);
  }
  var dMd = hsoDTTHMd(B, /^phường/i.test(String(N.tenXa || ''))), phThIn = C.thIn==='in' && C.th ? 'trống = ghi sẵn '+C.th+' (thẻ CT)' : 'trống = chấm', phKy = C.kyIn==='in' && C.ky ? 'trống = ghi sẵn '+C.ky+' (thẻ CT)' : 'trống = chấm';
  h += boNhap('Vốn tự có (đ)', 'tuCo', B.tuCo, C.tuCo ? tdnTien(hsoSo(C.tuCo))+' (mặc định)' : '0')+
    boNhap('Thời hạn xin vay (tháng)', 'th', B.th, phThIn, 1)+boNhap('Kỳ hạn trả nợ (tháng/lần)', 'ky', B.ky, phKy, 1)+boNhap('Hạn trả nợ cuối cùng', 'hanCuoi', hsoNgayVN(B.hanCuoi), 'dd/mm/yyyy — trống = chấm', 1)+
    hsoTuyO('Đối tượng thụ hưởng', dt.length ? hsoChon('hsoBoDat(\'dtth\',this.value,1)', B.dtth, [['', dMd ? '— mặc định: '+dMd+' —' : '— chọn —']].concat(dt.map(function(x){ return [x, x]; }))) : '<span class="sl-phu">chưa khai — khai ở thẻ chương trình (① ⚙ khai báo chương trình)</span>')+
    '<div class="sl-phu">Thời hạn gõ ở đây (hoặc tab 01/TD) tự sang cột Thời hạn của 03/TD.</div>';
  return h;
}
/* ---------- 3.209 (anh 14/10): 03/TD NHIỀU HỘ — cùng 1 chương trình in chung 1 tờ; tích hộ ở sổ → 📋 Lập 03/TD, hoặc mở 03/TD → ＋ Thêm hộ; sửa từng dòng (không lưu lịch sử — tờ đang lập giữ đến khi làm tờ mới) ---------- */
function hsoD03(){ var S = hsoCH(); if(!S.d03 || !Array.isArray(S.d03.ds)) S.d03 = {ct:'', ds:[]}; if(!S.d03.ct) S.d03.ct = (hsoCTVDs().find(function(c){ return c.bat!==false; }) || {}).ma || 'HSSV'; return S.d03; }
function hsoD03To(D3){ var o = null; D3.ds.some(function(r){ o = hmTim(r.hoId); return o && o.to; }); return o && o.to && KHO.to(o.to) || null; }
function hsoD03Moi(o, ct){   /* dòng mới: lấy phiếu làm hồ sơ của hộ nếu cùng chương trình, không thì mặc định thẻ CT */
  var B = hsoBoDs().find(function(b){ return b.hoId===o.id; }), C = hsoCTV(ct) || {}, t = o.to && KHO.to(o.to), ph = /^phường/i.test(String(o.tenXa || (t && t.tenXa) || ''));
  if(B && B.ct===ct){ hmDongBo(o, B); var A = hsoPA(B); return {hoId:o.id, tien:A.tien ? String(A.tien) : '', md:A.mdDs||'', th:A.th||'', dt:B.dtth || hsoDTTHMd(B, ph)}; }
  return {hoId:o.id, tien:'', md:C.kieu==='congtrinh' ? '' : (C.md||[])[0] || '', th:C.thIn==='in' ? C.th||'' : '', dt:hsoDTTHMd({ct:ct}, ph)};
}
function hsoD03TuBo(D3){   /* 3.240 (anh 17/10 "mẫu 01 qua mẫu 03 đủ thông tin"): dòng của hộ có 01/TD cùng chương trình → số tiền, mục đích, thời hạn, ĐTTH theo 01/TD (ô anh đã gõ tay ở 03/TD giữ nguyên) */
  var doi = false;
  D3.ds.forEach(function(r){ var B = hsoBoDs().find(function(b){ return b.hoId===r.hoId; }), o = hmTim(r.hoId); if(!B || !o || B.ct!==D3.ct) return;
    var m = hsoD03Moi(o, D3.ct), tay = r.tay || {}; ['tien', 'md', 'th', 'dt'].forEach(function(f){ if(!tay[f] && m[f] && r[f]!==m[f]){ r[f] = m[f]; doi = true; } }); });
  if(doi) luu(); }
function hsoD03Them(id){ if(!id) return; var D3 = hsoD03(), o = hmTim(id); if(!o) return; if(D3.ds.some(function(r){ return r.hoId===id; })) return bao('Hộ đã có trong danh sách.'); D3.ds.push(hsoD03Moi(o, D3.ct)); luu(); hsoVe(); }
function hsoD03Bo(i){ var D3 = hsoD03(); D3.ds.splice(i, 1); luu(); hsoVe(); }
function hsoD03Dat(i, f, v){ var r = hsoD03().ds[i]; if(!r) return; (r.tay = r.tay || {})[f] = 1; r[f] = f==='tien' ? String(v||'').replace(/[^\d]/g, '') : f==='th' ? String(v||'').replace(/[^\d]/g, '') : String(v||'').trim(); luu(); hsoVe(); }
function hsoD03CT(ma){ var D3 = hsoD03(); if(D3.ct===ma) return; D3.ct = ma; D3.ds = D3.ds.map(function(r){ var o = hmTim(r.hoId); return o ? hsoD03Moi(o, ma) : r; }); luu(); hsoVe(); }
function hsoD03TuChon(){ var ids = hmDs().filter(function(o){ return HM_CHON[o.id]; }).map(function(o){ return o.id; }); if(!ids.length) return;
  var D3 = hsoD03(), B = hsoBoDs().find(function(b){ return b.hoId===ids[0]; }); if(B && B.ct) D3.ct = B.ct;
  D3.ds = ids.map(function(id){ return hsoD03Moi(hmTim(id), D3.ct); }); HM_CHON = {}; hsoCH().boId = ''; luu(); hsoChonMau('03td'); }
function hsoD03Hang(D3){ return D3.ds.map(function(r){ var o = hmTim(r.hoId); return {ten:o ? hmTen(o) : '(hộ đã xóa)', xa:o ? o.tenXa || '' : '', dt:r.dt, tien:hsoSo(r.tien), md:r.md, th:r.th ? r.th+' tháng' : ''}; }); }
function hsoTuy06(){   /* 3.253: cột trái 06/TD — hộ chung với 03/TD, thêm từ sổ; phần ghi theo hồ sơ điền sẵn, phần kiểm tra thực tế ghi tay */
  var ds = hso06Ho(), D3 = hsoD03(), h = '<div class="nhan-nhom hso-kbr">✎ Nhập liệu — Mẫu 06/TD <small>(dùng Mẫu 06 KTGS)</small></div>';
  h += '<div class="sl-phu">Hộ trên phiếu = danh sách <b>03/TD</b> (in 1 lần cả bộ 01 + 03 + 06). Phần <b>ghi theo hồ sơ cho vay</b> điền sẵn: họ tên, chương trình, giải ngân, dư nợ (= số tiền vay 01/TD), mục đích. Phần <b>kiểm tra thực tế</b> để trống ghi tay. Hộ ở nhiều tổ → mỗi tổ 1 phiếu.</div>';
  h += ds.length ? '<div class="hso-tick-ds">'+ds.map(function(x){ return '<div>• '+coChuHTML(hmTen(x.o))+(hmToTen(x.o) ? ' <small>· '+coChuHTML(hmToTen(x.o))+'</small>' : '')+(x.r.tien ? ' <small>· '+tdnTien(hsoSo(x.r.tien))+' đ</small>' : '')+'</div>'; }).join('')+'</div>'
    : '<div class="sl-phu">Chưa có hộ.</div>';
  h += hsoTuyO('＋ Thêm hộ từ sổ', hsoChon('hsoD03Them(this.value)', '', [['', '— chọn hộ trong 📒 sổ hộ vay —']].concat(hmDs().filter(function(o){ return !D3.ds.some(function(r){ return r.hoId===o.id; }); }).map(function(o){ return [o.id, hmTen(o)+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; }))));
  h += '<div class="sl-phu">Bớt hộ / sửa số tiền: ở tab <a href="#" onclick="event.preventDefault();hsoChonMau(\'03td\')">03/TD</a>.</div>';
  return h+hso06KBHTML(); }
function hsoTuy03(t){
  var D3 = hsoD03(), C = hsoCTV(D3.ct) || {}, co = {}; D3.ds.forEach(function(r){ co[r.hoId] = 1; });
  var h = '<div class="nhan-nhom">Chương trình (cùng 1 chương trình / 1 tờ)</div><div class="hang-nut">'+hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===D3.ct; }).map(function(c){ return gdxChip('<b>'+coChuHTML(c.ma)+'</b>', D3.ct===c.ma, 'hsoD03CT(\''+c.ma+'\')', 'hso-ct', c.ten); }).join('')+'</div>';
  h += hsoTuyO('＋ Thêm hộ', hsoChon('hsoD03Them(this.value)', '', [['', '— chọn hộ trong sổ —']].concat(hmDs().filter(function(o){ return !co[o.id]; }).map(function(o){ var n = o.tv[o.dung||0] || {}; return [o.id, (n.ten||'(chưa tên)')+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; }))))+
    '<div class="sl-phu">Hoặc tích nhiều hộ ở tab <a href="#" onclick="event.preventDefault();hsoChonMau(\'sohv\')">📒 Sổ hộ vay</a> → 📋 Lập 03/TD.</div>';
  var dtOps = [['', '—']].concat((C.dtth||[]).map(function(x){ return [x, x]; }));
  h += D3.ds.length ? '<div class="hso-d03">'+D3.ds.map(function(r, i){ var o = hmTim(r.hoId);
      return '<div class="hso-d03-dong"><div class="hm-hang"><b>'+(i+1)+'. '+coChuHTML(o ? hmTen(o) : '(hộ đã xóa)')+'</b> <button class="nho" title="Bỏ khỏi danh sách" onclick="hsoD03Bo('+i+')">✕</button></div>'+
        '<div class="hm-hang"><input style="width:30%" value="'+coChuHTML(r.tien ? tdnTien(+r.tien) : '')+'" placeholder="số tiền" onchange="hsoD03Dat('+i+',\'tien\',this.value)"><input style="width:16%" value="'+coChuHTML(r.th||'')+'" placeholder="tháng" onchange="hsoD03Dat('+i+',\'th\',this.value)">'+
        (C.dtth && C.dtth.length ? '<select style="width:48%" onchange="hsoD03Dat('+i+',\'dt\',this.value)">'+dtOps.map(function(x){ return '<option value="'+coChuHTML(x[0])+'"'+(x[0]===r.dt ? ' selected' : '')+'>'+coChuHTML(x[1])+'</option>'; }).join('')+'</select>' : '<input style="width:48%" value="'+coChuHTML(r.dt||'')+'" placeholder="đối tượng thụ hưởng" onchange="hsoD03Dat('+i+',\'dt\',this.value)">')+'</div>'+
        '<div class="hm-hang"><input style="width:96%" value="'+coChuHTML(r.md||'')+'" placeholder="mục đích sử dụng vốn" onchange="hsoD03Dat('+i+',\'md\',this.value)"></div></div>'; }).join('')+'</div>'+
    '<div class="sl-phu">Cộng: <b>'+tdnTien(D3.ds.reduce(function(a, r){ return a+hsoSo(r.tien); }, 0))+'</b> đ · '+D3.ds.length+' hộ'+(D3.ds.length ? ' · <a href="#" onclick="event.preventDefault();hsoCH().d03={ct:\''+D3.ct+'\',ds:[]};luu();hsoVe()">làm tờ mới</a>' : '')+'</div>'
    : '<div class="sl-phu">Chưa có hộ — khung phải là mẫu trắng.</div>';
  return h+hsoNgayTuy('Ngày họp bình xét')+hsoKBRieng('03td');   /* 3.215 */
}
/* ---------- 3.211 (anh chốt 14/10): GQVL — người lao động vay qua Tổ: 01/GQVL (mẫu mới VB 4039, từ 01/10/2026) · 03/TD · 07b/GQVL Hợp đồng tín dụng ----------
   VB 11055: mức tối đa 200 triệu · thời hạn tối đa 120 tháng · kỳ hạn trả gốc ≤ 12 tháng trả 1 lần, > 12–60 tối đa 24 tháng/kỳ, > 60 tối đa 36 · lãi trả hằng tháng.
   Anh chốt: phân kỳ mặc định 24 tháng/lần, chia đều làm tròn xuống trăm nghìn, kỳ cuối nhiều nhất, không ân hạn; lãi 7,9248 % (ưu tiên 6,24 %), quá hạn 130 %. */
var HSO_UT = ['Người dân tộc thiểu số thuộc hộ nghèo.', 'Người dân tộc Kinh thuộc hộ nghèo đang sinh sống tại địa bàn có điều kiện kinh tế - xã hội đặc biệt khó khăn.', 'Người khuyết tật.',
  'Người lao động trong hộ gia đình đang trực tiếp nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng.', 'Người lao động nhận nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng.', 'Khác (nếu có)'];
function hsoSoVN(x){ return String(Math.round(x*1e6)/1e6).replace('.', ','); }   /* 10.30224 → "10,30224" */
function hsoSoDoc(v){ return +String(v||'').replace(/\s/g, '').replace(',', '.') || 0; }
function hsoCongThang(iso, m){ var n = hsoNg(iso); if(!n) return ''; var y = +n.y, mo = +n.m - 1 + m, d = +n.d; y += Math.floor(mo/12); mo = ((mo%12)+12)%12;
  var cuoi = new Date(y, mo+1, 0).getDate(); return y+'-'+('0'+(mo+1)).slice(-2)+'-'+('0'+Math.min(d, cuoi)).slice(-2); }
function hsoLich(tien, th, ky, ngay0, R){   /* lịch trả gốc: chia đều theo số kỳ, làm tròn xuống bội R, phần dư dồn kỳ cuối; th ≤ 12 → 1 lần */
  tien = +tien || 0; th = +th || 0; ky = +ky || 0; R = +R || 100000; if(!tien || !th) return [];
  var n = th<=12 || !ky ? 1 : Math.ceil(th/ky), moi = n>1 ? Math.floor(tien/n/R)*R : tien, r = [];
  for(var i=1;i<=n;i++){ var thang = i===n ? th : i*ky, so = i===n ? tien - moi*(n-1) : moi; r.push({thang:thang, tien:so, ngay:ngay0 ? hsoCongThang(ngay0, thang) : ''}); }
  return r;
}
function hsoLaiDK(lich, tien, th, ls){   /* lãi vay dự kiến cả thời hạn: dư nợ từng tháng × lãi suất ÷ 12 */
  var du = +tien || 0, lai = 0; for(var m=1;m<=th;m++){ lai += du*ls/100/12; lich.forEach(function(k){ if(k.thang===m) du -= k.tien; }); } return Math.round(lai); }
function hsoLaGQ(B){ return !!B && (hsoCTV(B.ct)||{}).kieu==='gqvl'; }   /* 3.257: 01/GQVL, 07b chỉ lấy phương án khi hộ đang chọn chương trình GQVL (không lọt HSSV / NSVSMT) */
function hsoGQ(B){   /* số liệu GQVL của phiếu: lãi suất theo ưu tiên, lịch, lãi dự kiến, hiệu quả, cảnh báo */
  var A = hsoPA(B), C = A.C || {}, P = (B && B.pa) || {}, ut = (P.ut||[]).some(function(i){ return i<5; });
  var ls = hsoSoDoc(ut ? C.lsUT : C.ls), qh = ls*(hsoSoDoc(C.qh)||130)/100, th = +A.th || 0, ky = +(B && B.ky) || (th>12 ? (th<=60 ? 24 : 36) : 0);   /* 3.310 (anh): phiếu không gõ kỳ hạn → phân kỳ theo thời hạn (≤ 12: 1 lần · ≤ 60: 24 tháng · > 60: 36 tháng), không theo số ghi sẵn của thẻ */
  A.ky = ky ? String(ky) : '';
  var lich = hsoLich(A.tien, th, ky, B && (B.ngayGN || B.ngayHD), hsoSo(C.lamTron) || 100000), dt = hsoSo(P.dt), cp = hsoSo(P.cp), cl = dt || cp ? dt-cp : null, canh = [];   /* 3.310: gốc lịch = ngày giải ngân (trống → ngày ký HĐ) */
  if(A.tien>200e6) canh.push('vượt mức tối đa 200 triệu');
  if(th>120) canh.push('thời hạn vượt 120 tháng');
  if(th>12 && ky && ky>(th<=60 ? 24 : 36)) canh.push('kỳ hạn trả gốc vượt '+(th<=60 ? 24 : 36)+' tháng/kỳ');
  var lai = th && ls ? hsoLaiDK(lich, A.tien, th, ls) : 0, tuGo = B && B.tuCo!=='' && B.tuCo!=null, tuCo = hsoSo(B && B.tuCo), tu = {};
  /* 3.310 (anh 21/10: "phương án em tự tính và điền, có hệ số k ngẫu nhiên thay đổi khi cần") — theo cách anh tính trên Excel GQVL:
     vốn tự có = 20 tr × k · tổng chi phí = vay + 40 tr × k (không dưới vốn + lãi vay + 5 %, chú thích 7) · lợi nhuận = vốn − 10 tr × k (≥ 10 % vay) · doanh thu = chi phí + lợi nhuận.
     Ô anh gõ tay giữ nguyên; k ngẫu nhiên 0,85–1,25 mỗi phiếu (🎲 Đổi số ở ③ phương án). */
  var k = B && A.tien ? hsoGQK(B) : 0, tr = function(v, len){ return (len ? Math.ceil(v/1e6) : Math.round(v/1e6))*1e6; };
  if(k && !tuGo){ tuCo = tr(20e6*k); tu.tuCo = 1; }
  var von = A.tien + tuCo;
  if(k && !cp){ cp = tr(Math.max(A.tien + 40e6*k, (von + lai)*1.05), 1); tu.cp = 1; }
  if(k && !dt){ dt = cp + tr(Math.max(von - 10e6*k, A.tien*0.1)); tu.dt = 1; }
  cl = dt || cp ? dt-cp : null;
  if(cp && cp < von + lai) canh.push('tổng chi phí thấp hơn vốn + lãi vay dự kiến ('+tdnTien(von+lai)+' đ) — xem lại phương án (chú thích 7)');
  return {A:A, C:C, ls:ls, qh:qh, ut:ut, lich:lich, lai:lai, dt:dt, cp:cp, cl:cl, bq:cl!=null && th ? Math.round(cl/th) : null, canh:canh, von:von, tuCo:tuCo, tu:tu, k:k, ky:ky};
}
/* hệ số k của phiếu (ngẫu nhiên 0,85–1,25, giữ trong phiếu — 🎲 đổi khi cần) */
function hsoGQKMoi(){ return Math.round((0.85 + Math.random()*0.4)*100)/100; }
function hsoGQK(B){ var P = B.pa = B.pa || {}; if(!(+P.k > 0)){ P.k = hsoGQKMoi(); try{ luu(); }catch(e){} } return +P.k; }
function hsoGQDoiK(){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var cu = +B.pa.k; do { B.pa.k = hsoGQKMoi(); } while(B.pa.k===cu); hsoBoLuu(); hsoVe();
  bao('🎲 Hệ số phương án k = '+hsoSoVN(B.pa.k)+' — vốn tự có, chi phí, doanh thu tính lại (ô anh gõ tay giữ nguyên).', 5);
}
function hsoO2(v, n){ return hsoO(v, 'kb', n); }
/* 3.310 (anh 21/10): TRANG "PHÊ DUYỆT CỦA NGÂN HÀNG" — trang cuối mẫu 01.NL (file anh gửi), lề 20 / 20 / 20 / 30 mm, chữ đậm như gốc.
   Số tự điền từ phương án GQVL (số tiền, lãi suất, thời hạn, phân kỳ, lịch trả gốc); ngày trả lãi hằng tháng để chấm (theo lịch giao dịch xã). */
function hsoLapPdnh(t, B){
  B = B || hsoBo(); var G = hsoLaGQ(B) ? hsoGQ(B) : {A:{tien:0, th:''}, lich:[], ls:0, qh:0, ky:0}, A = G.A, l = G.lich || [], k1 = l[0], kc = l.length>1 ? l[l.length-1] : null, cuoi = l.length ? hsoNg(l[l.length-1].ngay) : null;
  var o = function(v, n){ return hsoO(v, 'kb', n); }, b = function(x){ return '<b>'+x+'</b>'; };
  var h = '<p class="c b s14" style="margin-bottom:6pt">PHÊ DUYỆT CỦA NGÂN HÀNG</p>'+
    '<p class="j">'+b('1. Số tiền cho vay: ')+o(A.tien ? tdnTien(A.tien) : '', 12)+b(' đồng (Bằng chữ: ')+o(A.tien ? hsoChuSo(A.tien) : '', 25)+b(')')+'</p>'+
    '<p class="j">'+b('2. Lãi suất: ')+o(G.ls ? hsoSoVN(G.ls) : '', 14)+b(' %/năm. Lãi suất nợ quá hạn: ')+o(G.qh ? hsoSoVN(Math.round(G.qh*1e5)/1e5) : '', 22)+b(' %/năm.')+'</p>'+
    '<p class="j">'+b('3. Thời hạn cho vay: ')+o(A.th, 12)+b(' tháng; Kỳ hạn trả nợ: ')+o(l.length>1 && G.ky ? G.ky : (l.length===1 ? A.th : ''), 13)+b(' tháng/lần.')+'</p>'+
    '<p class="j">'+b('4. Số tiền trả nợ: ')+o(k1 ? tdnTien(k1.tien) : '', 22)+b(' đồng/lần. Số tiền trả nợ kỳ cuối ')+o(kc ? tdnTien(kc.tien) : (k1 ? tdnTien(k1.tien) : ''), 22)+b(' đồng.')+'</p>'+
    '<p class="j">&nbsp;&nbsp;&nbsp;&nbsp;Hạn trả nợ cuối cùng: Ngày'+(cuoi ? o(cuoi.d)+'/'+o(cuoi.m)+'/'+o(cuoi.y) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+'</p>'+
    '<p class="j">'+b('5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày ')+hsoCham(40)+'</p><p>&nbsp;</p>'+
    hsoBang('khung0', [41.4, 57.3, 63.7], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Cán bộ tín dụng</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p>&nbsp;</p><p class="c b">Trưởng phòng</p><p class="c b">KH Nghiệp vụ Tín dụng/ Tổ trưởng Tổ KH-NV</p><p class="c i s12">(Ký, ghi rõ họ tên)</p></td>'+
      '<td class="c"><p class="c">Ngày'+hsoCham(5)+'tháng'+hsoCham(6)+'năm'+hsoCham(6)+'</p><p class="c b">Giám đốc</p><p class="c i s12">(Ký, ghi rõ họ tên, đóng dấu)</p></td></tr>');
  return {ma:'Phê duyệt NH', h:h};
}
function hsoLap01gqvl(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), G = hsoLaGQ(B) ? hsoGQ(B) : {A:{dong:[], tien:0}, C:{}, lich:[]}, A = G.A, P = (B && B.pa) || {}, L = P.ld || {};
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '', han = '', d = hsoCCCDDoc(N.cccd);
  if(N.cccd && N.ns && N.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(String(N.cccd).replace(/\D/g, ''), N.ns, N.ncap); if(hn && hn.den) han = ngayVNsl(hn.den); }
  var o = function(f, n){ return hsoO2(L[f], n||5); };
  var bang = '<tr><td class="c b">STT</td><td class="c b">MỤC ĐÍCH SỬ DỤNG<br>VỐN VAY</td><td class="c b">SỐ LƯỢNG</td><td class="c b">THÀNH TIỀN (đồng)</td></tr>'+
    (A.dong.length ? A.dong : [['', '', 0], ['', '', 0]]).map(function(x, i){ return '<tr><td class="c">'+(x[0] ? i+1 : '')+'</td><td>'+hsoO2(x[0], 30)+'</td><td class="c">'+hsoO2(x[1], 12)+'</td><td class="r">'+hsoO2(x[2] ? tdnTien(x[2]) : '', 15)+'</td></tr>'; }).join('')+
    '<tr><td></td><td class="c b">Cộng</td><td></td><td class="r b">'+(A.tien ? hsoO2(tdnTien(A.tien)) : '')+'</td></tr>';
  var h = '<p class="r b">Mẫu số 01/GQVL</p>'+hsoQH('-', 13)+
    '<p class="c b s14 tr">PHƯƠNG ÁN SỬ DỤNG VỐN VAY</p><p class="c b">HỖ TRỢ TẠO VIỆC LÀM, DUY TRÌ, MỞ RỘNG VIỆC LÀM</p><p class="c i">(Đối với người lao động)</p>'+
    '<p class="c tr">Kính gửi: Ngân hàng Chính sách xã hội '+hsoO2(hsoPGD('ngan'), 20)+'</p>'+
    '<p class="b tr">I. Thông tin chung về khách hàng</p>'+
    '<p>Họ và tên khách hàng vay vốn: '+hsoO(N.ten, 'sl', 40)+'</p>'+
    '<p>Ngày sinh: '+hsoO(hsoNgayVN(N.ns), 'sl', 12)+'        Dân tộc: '+hsoO(N.danToc, 'sl', 8)+'        Giới tính: '+hsoO(N.gt || (d ? d.gt : ''), 'sl', 6)+'</p>'+
    '<p>Thẻ căn cước công dân/Thẻ căn cước số: '+hsoO(N.cccd, 'sl', 25)+'</p>'+
    '<p>Ngày cấp: '+hsoO(hsoNgayVN(N.ncap), 'sl', 12)+'   Nơi cấp: '+hsoO(N.noiCap, 'sl', 14)+'   Có thời hạn đến: '+hsoO(han, 'sl', 12)+'</p>'+
    '<p>Nơi ở hiện tại (thường trú/tạm trú<sup>(1)</sup>): '+hsoO(dc, 'sl', 45)+'</p>'+
    '<p>Điện thoại: '+hsoO(N.sdt, 'sl', 50)+'</p>'+
    '<p>Giấy chứng nhận đăng ký hộ kinh doanh số<sup>(2)</sup> (nếu có): '+hsoO2(P.gpkd, 20)+'</p>'+
    '<p>Đăng ký lần đầu ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p><p>Đăng ký thay đổi lần thứ: '+hsoCham(8)+' ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p>'+
    '<p class="j">Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh (nếu có): '+hsoCham(25)+' thời hạn còn hiệu lực '+hsoCham(20)+'</p>'+
    '<p>Mã số thuế kinh doanh đã đăng ký (nếu có): '+hsoO2(P.mst, 25)+'</p>'+
    '<p>Thuộc đối tượng ưu tiên (nếu có):</p>'+HSO_UT.map(function(x, i){ var co = (P.ut||[]).indexOf(i)>=0; return '<p class="l1 j">'+(co ? '☒' : '☐')+' '+(i+1)+'. '+x+(i===5 ? ' '+hsoO2(P.utKhac, 40) : '')+'</p>'; }).join('')+
    '<p class="thut">Thông tin, giấy tờ xác nhận đối tượng ưu tiên, gồm<sup>(3)</sup>:</p>'+(P.utGT ? '<p>'+hsoO2(P.utGT)+'</p>' : '<p>'+hsoCham(90)+'</p><p>'+hsoCham(90)+'</p>')+
    '<p class="thut">Thuộc đối tượng vay vốn khác (nếu có)<sup>(5)</sup>: '+hsoO2(P.dtKhac, 40)+'</p>'+
    '<p class="b tr">II. Phương án sử dụng vốn vay</p><p class="b">1. Tên phương án và địa điểm thực hiện</p>'+
    '<p class="thut">Tôi có nhu cầu vay vốn để thực hiện phương án '+hsoO2(P.ten || A.md, 60)+'</p>'+
    '<p>Địa điểm thực hiện phương án: '+hsoO2(P.dd || dc, 60)+'</p>'+
    '<p class="i">(Đối với trường hợp vay vốn trồng rừng thì kê khai giấy tờ, tài liệu chứng minh được sử dụng đất rừng<sup>(4)</sup>)</p><p>'+hsoCham(90)+'</p>'+
    '<p class="b">2. Tổng số người lao động được tạo việc làm, duy trì, mở rộng việc làm<sup>(6)</sup>: '+o('tong')+' người, trong đó:</p>'+
    '<p class="l1">* Tạo việc làm: '+o('tao')+' người;   Duy trì việc làm: '+o('duy')+' người;   Mở rộng việc làm: '+o('mo')+' người;</p>'+
    '<p class="l1">Là lao động nữ (nếu có): '+o('nu')+' người;</p>'+
    '<p class="l1">* Tổng số lao động thuộc hộ gia đình: '+o('ho')+' người</p><p class="l1">Tổng số lao động không thuộc hộ gia đình (nếu có): '+o('ngoai')+' người</p>'+
    '<p class="b">3. Vốn thực hiện phương án: '+(A.tien ? hsoO2(tdnTien(G.von)) : hsoCham(25))+' đồng, trong đó:</p>'+
    '<p class="l1">- Vốn tự có: '+(B && B.tuCo!=='' && B.tuCo!=null ? hsoO2(tdnTien(hsoSo(B.tuCo))) : hsoCham(25))+' đồng</p>'+
    '<p class="l1">- Đề nghị Ngân hàng cho vay số tiền: '+(A.tien ? hsoO2(tdnTien(A.tien)) : hsoCham(25))+' đồng</p>'+
    '<p class="l1">(Bằng chữ: '+(A.tien ? hsoO2(hsoChuSo(A.tien)) : hsoCham(60))+')</p><p>với mục đích sử dụng vốn vay cụ thể như sau:</p>'+hsoBang('luoi', [8, 52, 18, 22], bang)+
    '<p class="tr">Thời hạn xin vay: '+hsoO2(A.th, 6)+' tháng</p><p>Kỳ hạn trả gốc: '+hsoO2(A.ky ? (+A.th<=12 ? 'trả 1 lần khi đến hạn' : A.ky+' tháng/lần') : '', 15)+'   Kỳ hạn trả lãi: '+hsoO2(B ? (G.C.kyLai || 'hằng tháng') : '', 12)+'</p>'+
    '<p class="b tr">4. Phương án sử dụng vốn vay và hiệu quả dự kiến về thu nhập<sup>(7)</sup>:</p><p class="i">(Được tính trên toàn bộ thời gian thực hiện phương án)</p>'+
    '<p class="l1">- Tổng doanh thu của phương án: '+(G.dt ? hsoO2(tdnTien(G.dt)) : hsoCham(30))+' đồng</p><p class="l1">- Tổng chi phí của phương án: '+(G.cp ? hsoO2(tdnTien(G.cp)) : hsoCham(30))+' đồng</p>'+
    '<p class="l1">- Chênh lệch thu - chi của phương án: '+(G.cl!=null ? hsoO2(tdnTien(G.cl)) : hsoCham(30))+' đồng</p><p class="l1">- Thu nhập bình quân tăng thêm/1 tháng của khách hàng: '+(G.bq!=null ? hsoO2(tdnTien(G.bq)) : hsoCham(25))+' đồng</p>'+
    '<p class="b tr">III. Cam kết</p><p class="j thut">Tôi cam kết sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đúng thời hạn, nếu sai tôi xin chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [45, 55], '<tr><td></td><td class="c"><p class="c i">'+coChuHTML(hsoPGD('noi'))+(function(){ var g = hsoChamIn('01gqvl', 'ngayKy') ? hsoNg(hsoChamGT('01gqvl', 'ngayKy', '')) : null; return g ? ', ngày '+hsoO(g.d, 'kb')+' tháng '+hsoO(g.m, 'kb')+' năm '+hsoO(g.y, 'kb') : ', ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(6); })()+'</p><p class="c b">NGƯỜI ĐỀ NGHỊ VAY VỐN</p><p class="c i s12">(Ký và ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+hsoO(N.ten, 'sl', 25)+'</p></td></tr>')+
    '<p class="b i s11 tr">Ghi chú:</p>'+[
    '(1) Trường hợp đề nghị vay vốn tại nơi thường trú thì ghi thông tin nơi thường trú; trường hợp đề nghị vay vốn tại nơi tạm trú thì ghi thông tin nơi tạm trú.',
    '(2) Nếu khách hàng là chủ hộ kinh doanh (hoặc người đại diện ủy quyền) vay với tư cách Cá nhân người lao động để phục vụ công việc kinh doanh/tạo việc làm, duy trì, mở rộng việc làm cho chính bản thân khách hàng thì kê khai Giấy chứng nhận đăng ký kinh doanh. Đối với ngành nghề kinh doanh có điều kiện thì kê khai cả nội dung Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh.',
    '(3) Thông tin, giấy tờ xác nhận đối tượng ưu tiên dành cho đối tượng ưu tiên, cụ thể:',
    '- Đối với người lao động là người dân tộc thiểu số thuộc hộ nghèo: Giấy tờ chứng minh về dân tộc, Giấy chứng nhận hộ gia đình nghèo theo quy định.',
    '- Đối với người lao động là người dân tộc Kinh thuộc hộ nghèo đang sinh sống tại địa bàn có điều kiện kinh tế – xã hội đặc biệt khó khăn (người có nơi ở hiện tại thuộc thôn, xã đặc biệt khó khăn vùng đồng bào dân tộc thiểu số và miền núi hoặc các địa bàn khác theo quyết định của cơ quan nhà nước có thẩm quyền): Giấy tờ chứng minh về nơi ở hiện tại, Giấy chứng nhận hộ gia đình nghèo theo quy định.',
    '- Đối với người lao động là Người khuyết tật, đề nghị kê khai: Giấy xác nhận khuyết tật số …... do Ủy ban nhân dân xã/phường/đặc khu ……...…. cấp ngày ..........',
    '- Đối với Người lao động trong hộ gia đình đang trực tiếp nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng, đề nghị kê khai: + Họ và tên Người khuyết tật/người khuyết tật đặc biệt nặng:............ + Giấy xác nhận khuyết tật số ……do Ủy ban nhân dân xã/ phường/đặc khu …… cấp ngày .......... + Hoặc Quyết định hỗ trợ kinh phí chăm sóc, nuôi dưỡng hàng tháng số ................cấp ngày.............',
    '- Đối với Người lao động nhận nuôi dưỡng, chăm sóc người khuyết tật đặc biệt nặng, đề nghị kê khai: + Họ và tên Người khuyết tật/Người khuyết tật đặc biệt nặng:............. + Giấy xác nhận khuyết tật số …… do Ủy ban nhân dân xã/phường/đặc khu ….....cấp ngày ............. + Quyết định hỗ trợ kinh phí chăm sóc, nuôi dưỡng hằng tháng số:.............cấp ngày............ + Hoặc Quyết định nhận chăm sóc, nuôi dưỡng số:………....cấp ngày….......................……',
    '(4) Khách hàng vay vốn phục vụ phương án trồng rừng có trách nhiệm kê khai các loại giấy tờ chứng minh việc được sử dụng đất rừng và đang không tranh chấp (ví dụ như Giấy chứng nhận quyền sử dụng đất, dữ liệu điện tử về đất đai (theo Luật Đất đai), Hợp đồng thuê đất/giao đất/cho mượn đất và giấy tờ pháp lý của bên cho thuê/cho mượn,…).',
    '(5) Thuộc đối tượng khác theo quy định của cấp có thẩm quyền được vay vốn hỗ trợ tạo việc làm, duy trì, mở rộng việc làm: - Người cao tuổi theo văn bản hướng dẫn số 5911/NHCS-TDSV ngày 12/8/2019; - Người lao động trong gia đình người tâm thần, trẻ em tự kỷ và người rối nhiễu tâm trí theo văn bản hướng dẫn số 6216/NHCS-TDSV ngày 09/7/2021; - Người có đất thu hồi theo văn bản hướng dẫn số 4545/HD-NHCS ngày 01/8/2024; - Các đối tượng khác theo văn bản hướng dẫn của cấp có thẩm quyền.',
    '(6) Người lao động là công dân Việt Nam từ đủ 15 tuổi trở lên, có khả năng lao động và có nhu cầu làm việc. - Tạo việc làm là tạo việc làm cho người thất nghiệp; - Duy trì việc làm là duy trì việc làm hiện có của người lao động; - Mở rộng việc làm là việc thu hút thêm lao động hoặc tạo thêm việc làm khác cho người lao động. - Khách hàng vay vốn được tính là 01 trong tổng số lao động thuộc hộ gia đình.',
    '(7) - Tổng chi phí của phương án (đã bao gồm chi phí trả lãi tiền vay ngân hàng.) + Nếu tổng chi phí ≥ vốn thực hiện phương án + lãi vay: đây là kết quả hợp lý. + Nếu tổng chi phí &lt; vốn thực hiện phương án + lãi vay: cần xem xét lại phương án. - Chênh lệch thu – chi &gt; 0: phương án có lãi. - Chênh lệch thu – chi ≤ 0: phương án không có lãi. Từ chênh lệch thu – chi mới tính được thu nhập bình quân tăng thêm/tháng của khách hàng và đánh giá hiệu quả của phương án.'
    ].map(function(x){ return '<p class="j s11">'+x+'</p>'; }).join('');
  return {ma:'01/GQVL', h:h};
}
function hsoLap07b(t, B){
  B = B || hsoBo(); var N = hsoBoNV(B), G = hsoLaGQ(B) ? hsoGQ(B) : {A:{dong:[], tien:0, th:''}, C:{}, lich:[], ls:0, qh:0}, A = G.A, P = (B && B.pa) || {}, L = P.ld || {};
  var dc = B ? hsoDiaChi({ap:N.ap, tenXa:N.tenXa}, null) : '', han = '';
  if(N.cccd && N.ns && N.ncap && typeof toCCCDHan==='function'){ var hn = toCCCDHan(String(N.cccd).replace(/\D/g, ''), N.ns, N.ncap); if(hn && hn.den) han = ngayVNsl(hn.den); }
  var cuoi = G.lich.length ? G.lich[G.lich.length-1].ngay : '', nl = +L.tong || ((+L.tao||0)+(+L.duy||0)+(+L.mo||0)) || '';
  var lich = G.lich.length ? G.lich.map(function(k){ return '<p class="l2">- Ngày '+(k.ngay ? hsoO2(ngayVNsl(k.ngay)) : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+' <span class="i s11">(tháng thứ '+k.thang+')</span>')+', số tiền: '+hsoO2(tdnTien(k.tien))+' đồng.</p>'; }).join('')
    : [1,2,3].map(function(){ return '<p class="l2">- Ngày '+hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8)+', số tiền: '+hsoCham(18)+' đồng.</p>'; }).join('')+'<p class="l2">……</p>';
  var o = function(v, n){ return hsoO2(v, n); }, s = function(v, n){ return hsoO(v, 'sl', n); };
  var h = hsoBang('khung0', [62, 38], '<tr><td class="c">'+hsoQH('-', 13)+'</td><td class="r"><p class="r b">Mẫu số 07b/GQVL</p><p class="r i s11">Lập 02 liên</p><p class="r i s11">01 liên lưu NH</p><p class="r i s11">01 liên lưu KH</p></td></tr>')+
    '<p class="c b s14 tr">HỢP ĐỒNG TÍN DỤNG</p><p class="c">Số: '+hsoCham(6)+'/20'+hsoCham(3)+'/HĐ-TD</p><p class="c i">(Áp dụng cho vay đối với người lao động)</p>'+
    ['Căn cứ bộ Luật dân sự và các quy định pháp luật khác có liên quan;', 'Căn cứ Luật Việc làm số 74/2025/QH15 ngày 16/06/2025 của Quốc Hội;', 'Căn cứ Nghị định số 338/2025/NĐ-CP ngày 25/12/2025 của Chính phủ quy định chi tiết một số điều của Luật Việc làm về chính sách hỗ trợ tạo việc làm;',
     'Căn cứ văn bản số 11055/HD-NHCS ngày 30/12/2025 của Tổng Giám đốc Ngân hàng Chính sách xã hội hướng dẫn nghiệp vụ cho vay hỗ trợ tạo việc làm, duy trì, mở rộng việc làm và các văn bản hướng dẫn có liên quan của Tổng Giám đốc NHCSXH;'].map(function(x){ return '<p class="j thut i">'+x+'</p>'; }).join('')+
    '<p class="j thut">Hôm nay, '+hsoNTN(B && B.ngayHD)+' tại '+(hsoChamGT('07b', 'noiKy', '') ? hsoO(hsoChamGT('07b', 'noiKy', ''), 'kb') : hsoCham(35))+' chúng tôi gồm:</p>'+
    '<p class="b">Bên cho vay</p><p>- Tên Ngân hàng Chính sách xã hội: '+o(hsoPGD('ten'), 40)+'</p><p>- Địa chỉ: '+o(hsoPGD('diaChi'), 50)+'</p><p>- Điện thoại: '+o(hsoPGD('dt'), 50)+'</p>'+
    '<p>- Họ và tên người đại diện: '+o(hsoPGD('daiDien'), 25)+' Chức vụ: '+o(hsoPGD('daiDien') ? hsoPGD('chucVu') : '', 20)+'</p><p>- Giấy uỷ quyền (nếu có): '+o(hsoPGD('uyQuyen'), 40)+'</p>'+
    '<p class="b">Bên vay</p><p>- Họ và tên người vay: '+s(N.ten, 45)+'</p><p>- Ngày, tháng, năm sinh: '+s(hsoNgayVN(N.ns), 40)+'</p><p>- Thẻ căn cước công dân/Thẻ căn cước số: '+s(N.cccd, 30)+'</p>'+
    '<p class="l1">Ngày cấp '+s(hsoNgayVN(N.ncap), 20)+' nơi cấp '+s(N.noiCap, 25)+'</p><p class="l1">Có thời hạn đến '+s(han, 40)+'</p>'+
    '<p>- Nơi ở hiện tại (thường trú/tạm trú): '+s(dc, 40)+'</p><p>- Điện thoại liên hệ: '+s(N.sdt, 40)+'</p>'+
    '<p>Giấy chứng nhận đăng ký hộ kinh doanh số (nếu có): '+o(P.gpkd, 20)+'</p><p>Đăng ký lần đầu ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p><p>Đăng ký thay đổi lần thứ: '+hsoCham(8)+' ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p>'+
    '<p class="j">Giấy phép kinh doanh có điều kiện/Giấy chứng nhận đủ điều kiện kinh doanh (nếu có): '+hsoCham(25)+' thời hạn còn hiệu lực '+hsoCham(20)+'</p><p>Mã số thuế kinh doanh đã đăng ký (nếu có): '+o(P.mst, 25)+'</p>'+
    '<p class="j thut">Hai Bên cùng thống nhất ký kết Hợp đồng này theo các nội dung thỏa thuận sau đây:</p>'+
    '<p class="b">Điều 1. Nội dung cho vay</p><p>1. Tổng số tiền cho vay (bằng số): '+(A.tien ? o(tdnTien(A.tien)) : hsoCham(30))+' đồng.</p><p class="l1">Bằng chữ: '+(A.tien ? o(hsoChuSo(A.tien)) : hsoCham(60))+'</p>'+
    '<p>2. Mục tiêu hỗ trợ tạo việc làm, duy trì, mở rộng việc làm cho: '+o(nl, 8)+' người.</p>'+
    '<p>3. Thời hạn cho vay: '+o(A.th, 6)+' tháng; hạn trả nợ cuối cùng ngày '+(cuoi ? o(ngayVNsl(cuoi)) : (B && B.hanCuoi ? o(hsoNgayVN(B.hanCuoi)) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(6)))+'</p>'+
    '<p>4. Lãi suất tiền vay:</p><p class="l1">- Lãi suất cho vay: '+(G.ls ? o(hsoSoVN(G.ls)) : hsoCham(6))+' %/ năm.</p><p class="l1">- Lãi suất quá hạn: '+(G.qh ? o(hsoSoVN(G.qh)) : hsoCham(6))+' %/ năm.</p>'+
    '<p class="j thut">Lãi tiền vay được tính kể từ ngày Bên vay nhận khoản vay đầu tiên đến ngày trả hết nợ gốc. Tiền lãi được Bên cho vay thu hàng tháng kể từ sau tháng nhận khoản vay đầu tiên, tiền lãi được tính trên số dư nợ thực tế;</p><p class="j thut">Tiền lãi tháng nếu chưa thu được thì chuyển sang thu vào tháng kế tiếp sau đó.</p>'+
    '<p>5. Kỳ hạn trả nợ gốc</p>'+lich+
    '<p>6. Thu nợ gốc, lãi</p><p class="j">- Bên cho vay thực hiện thu nợ gốc, lãi theo quy định của Bên cho vay.</p><p class="j">- Bên vay có thể trả nợ gốc trước hạn bằng tiền mặt hoặc trả vào tài khoản tổ viên của Bên vay. Trường hợp Bên vay trả vào tài khoản tổ viên:</p>'+
    '<p class="j">+ Bên vay nộp tiền vào tài khoản tổ viên, nội dung nộp tiền ghi rõ: “Nộp tiền trả nợ gốc và lãi tiền vay trước hạn cho Hợp đồng tín dụng số …” trên Giấy nộp tiền và thông tin cho Bên cho vay để làm cơ sở thực hiện thu nợ.</p>'+
    '<p class="j">+ Bên vay chuyển khoản vào tài khoản tổ viên, nội dung chuyển khoản ghi rõ: “Nộp tiền trả nợ gốc và lãi tiền vay trước hạn cho Hợp đồng tín dụng số …” và thông tin cho Bên cho vay để làm cơ sở thực hiện thu nợ.</p><p class="j">- Thứ tự thu nợ gốc, lãi của khoản vay thực hiện theo quy định của Bên cho vay.</p>'+
    '<p class="b">Điều 2. Giải ngân</p><p>Hình thức giải ngân: '+(P.gn==='tm' ? '☒' : '☐')+' Tiền mặt     '+(P.gn==='ck' ? '☒' : '☐')+' Chuyển khoản</p><p>Tên người thụ hưởng '+o(P.gn==='ck' ? (P.thuHuong || N.ten) : '', 50)+'</p><p>Số tài khoản '+o(P.stk, 20)+' tại '+o(P.nh, 30)+'</p>'+
    '<p class="b">Điều 3. Mục đích sử dụng tiền vay</p><p>'+o(A.dong.length ? A.dong.map(function(x){ return x[0]+(x[1] ? ' ('+x[1]+')' : ''); }).join('; ') : '', 90)+'</p><p>Nơi thực hiện phương án:</p><p>'+o(P.dd || dc, 90)+'</p>'+
    '<p class="b">Điều 4. Điều chỉnh kỳ hạn trả nợ, gia hạn nợ, chuyển nợ quá hạn</p>'+[
    '1. Điều chỉnh kỳ hạn trả nợ', 'Nếu Bên vay chưa trả được nợ gốc theo đúng kỳ hạn trả nợ đã thỏa thuận trong Hợp đồng tín dụng thì trước ít nhất 05 ngày đến hạn trả nợ, Bên vay phải có đề nghị điều chỉnh kỳ hạn trả nợ. Thời hạn điều chỉnh cho 01 kỳ hạn trả nợ gốc có thể một hoặc nhiều lần, nhưng tối đa không vượt quá thời hạn của kỳ hạn trả nợ tiếp theo.',
    '2. Gia hạn nợ', 'Trước ngày đến hạn trả nợ cuối cùng, tối đa 03 tháng và tối thiểu 05 ngày làm việc, Bên vay không có khả năng trả được nợ và có nhu cầu gia hạn nợ, Bên vay phải lập Giấy đề nghị gia hạn nợ gửi Bên cho vay để xem xét cho gia hạn nợ theo quy định của Bên cho vay.',
    '3. Chuyển nợ quá hạn', 'Đến kỳ hạn trả nợ kể cả nợ của kỳ hạn trước đó đã được điều chỉnh mà Bên vay chưa trả được nợ, không được Bên cho vay xem xét cho điều chỉnh kỳ hạn trả nợ thì Bên cho vay chuyển số dư nợ đó sang nợ quá hạn.',
    'Đến hạn cuối cùng của thời hạn cho vay đã thỏa thuận trong Hợp đồng tín dụng, nếu Bên vay chưa trả được nợ, không được Bên cho vay xem xét cho gia hạn nợ, thì Bên cho vay chuyển toàn bộ số dư nợ còn lại sang quá hạn.'].map(function(x){ return '<p class="j'+(/^\d\./.test(x) ? '' : ' thut')+'">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 5. Xử lý các vi phạm</p>'+[
    '1. Tạm dừng cho vay: Bên vay vi phạm các cam kết trong Hợp đồng tín dụng và đang trong thời gian khắc phục sửa chữa.',
    '2. Chấm dứt cho vay: Bên vay vi phạm các cam kết trong Hợp đồng tín dụng nhưng không khắc phục, sửa chữa. Trong thời gian tối đa 03 tháng kể từ thời điểm thông báo cho Bên vay về việc chấm dứt cho vay, Bên cho vay thực hiện thu hồi nợ trước hạn, nếu Bên vay không trả hết số nợ vi phạm thì chuyển số nợ vi phạm còn lại sang quá hạn.',
    '3. Chuyển nợ quá hạn', '- Đối với trường hợp Bên vay sử dụng vốn vay sai mục đích đã ghi trong Hợp đồng tín dụng và được ghi nhận trong Biên bản kiểm tra, sau thời gian tối đa 30 ngày kể từ ngày phát hiện sai phạm được ghi trong Biên bản kiểm tra, Bên cho vay đã phối hợp với các cơ quan liên quan và chính quyền địa phương áp dụng các biện pháp để đôn đốc, yêu cầu Bên vay thực hiện nghĩa vụ trả nợ, nếu Bên vay không trả hết số nợ sử dụng sai mục đích thì chuyển số nợ sử dụng sai mục đích còn lại sang quá hạn;',
    '4. Thu hồi nợ trước hạn', 'Bên cho vay có quyền ra thu hồi nợ trước hạn trong các trường hợp sau:', '- Bên vay bị khó khăn trong nhận thức và làm chủ hành vi.', '- Bên vay cung cấp sai sự thật, vi phạm quy định trong Hợp đồng này, không phối hợp với Bên cho vay trong quá trình kiểm tra, giám sát sau cho vay.',
    '- Bên vay không thực hiện hoặc thực hiện không đúng, không đầy đủ các yêu cầu, chỉ dẫn của Bên cho vay liên quan đến các công việc nhằm ký kết, thực hiện, duy trì Hợp đồng này.', '- Bên vay vi phạm pháp luật, chính sách của Nhà nước; căn cứ kết luận của cơ quan Nhà nước có thẩm quyền về việc Bên cho vay phải thu hồi nợ trước hạn; hoặc Bên cho vay phải thu hồi nợ trước hạn để bảo đảm thu hồi nợ vay.',
    '5. Khởi kiện trước pháp luật: Bên cho vay có quyền khởi kiện trong các trường hợp sau:', '- Bên vay vi phạm Hợp đồng tín dụng đã được Bên cho vay thông báo bằng văn bản nhưng không khắc phục;', '- Bên vay có nợ quá hạn do nguyên nhân chủ quan nhưng không có biện pháp khả thi để trả Bên cho vay; Bên vay có năng lực tài chính để trả nợ nhưng cố tình trốn tránh trả nợ theo thỏa thuận;', '- Bên vay có hành vi lừa đảo, gian lận;', '- Các vi phạm khác theo quy định của pháp luật.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 6. Quyền và Nghĩa vụ của Bên cho vay</p>'+['1. Thực hiện đúng những nội dung đã thoản thuận;', '2. Yêu cầu Bên vay thực hiện đúng các điều khoản thỏa thuận;', '3. Yêu cầu Bên vay cung cấp, xuất trình các tài liệu, thông tin cần thiết liên quan đến món vay;', '4. Kiểm tra, giám sát tình hình sử dụng vốn vay, khả năng trả nợ của Bên vay;', '5. Từ chối các yêu cầu của Bên vay không đúng với quy định của pháp luật và thỏa thuận trong Hợp đồng này.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 7. Quyền và Nghĩa vụ của Bên vay</p>'+['1. Thực hiện đúng những nội dung đã thoản thuận;', '2. Được quyền yêu cầu Bên cho vay thực hiện đúng các điều khoản thỏa thuận;', '3. Lưu giữ và cung cấp, xuất trình đầy đủ, kịp thời, trung thực các thông tin, tài liệu liên quan đến vay vốn và chịu trách nhiệm trước pháp luật về tính chính xác của các thông tin, tài liệu đã cung cấp;', '4. Sử dụng vốn vay đúng mục đích; báo cáo việc sử dụng vốn vay và xuất trình tài liệu chứng minh việc sử dụng vốn vay theo Hợp đồng này;', '5. Chịu sự kiểm tra, giám sát của Bên cho vay trong sử dụng vốn vay và trả nợ;', '6. Phải thông báo kịp thời cho Bên cho vay những thay đổi về nơi cư trú, địa chỉ liên lạc, số điện thoại và những thay đổi khác ảnh hưởng đến khả năng trả nợ của Bên vay.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 8. Cam kết chung</p>'+['1. Hai bên cam kết thực hiện đúng các điều khoản của Hợp đồng tín dụng này. Mọi sửa đổi, bổ sung nội dung của các điều, khoản phải được sự thỏa thuận của hai bên bằng văn bản.', '2. Trong quá trình thực hiện, nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không thương lượng được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện theo pháp luật.', '3. Hợp đồng này và các văn bản bổ sung hợp đồng (nếu có) là một bộ phận thống nhất không thể tách rời nhau, các Bên phải có nghĩa vụ chấp hành.', '4. Khi Bên vay trả hết nợ gốc, lãi và các chi phí phát sinh khác (nếu có) theo Hợp đồng này, thì Hợp đồng này mặc nhiên được thanh lý.'].map(function(x){ return '<p class="j">'+x+'</p>'; }).join('')+
    '<p class="b">Điều 9. Một số thỏa thuận khác</p><p>'+o(P.khac, 90)+'</p>'+
    '<p class="j"><b>Điều 10.</b> Hợp đồng tín dụng có hiệu lực kể từ ngày ký cho tới khi Bên vay hoàn thành nghĩa vụ trả nợ bao gồm cả tiền gốc, lãi và các chi phí phát sinh khác (nếu có).</p><p class="j thut">Hợp đồng này được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản./.</p>'+
    hsoBang('khung0 hso-ky', [1, 1], '<tr><td class="c"><p class="c b">ĐẠI DIỆN BÊN VAY</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+s(N.ten, 20)+'</p></td><td class="c"><p class="c b">ĐẠI DIỆN BÊN CHO VAY</p><p class="c i s12">(Ký, ghi rõ họ tên và đóng dấu)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+o(hsoPGD('daiDien'), 20)+'</p></td></tr>')+
    '<p>&nbsp;</p><p class="c b s13 tr">PHỤ LỤC HỢP ĐỒNG TÍN DỤNG</p><p class="c i">(kèm theo Hợp đồng tín dụng số: '+hsoCham(6)+'/20'+hsoCham(3)+'/HĐ-TD ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+')</p>'+
    hsoPLBang('Phần theo dõi cho vay', ['Ngày tháng năm', 'Số tiền giải ngân', 'Lãi suất %/ năm', 'Hạn trả nợ cuối cùng', 'Dư nợ trong hạn', 'Chữ ký Bên vay', 'Chữ ký Kế toán'])+
    hsoPLBang('Phần theo dõi điều chỉnh kỳ hạn trả nợ, gia hạn nợ', ['Ngày, tháng, năm', 'Điều chỉnh kỳ hạn: Số tiền', 'Điều chỉnh kỳ hạn: Đến ngày, tháng, năm', 'Gia hạn nợ: Số tiền', 'Gia hạn nợ: Đến ngày, tháng, năm', 'Chữ ký Bên vay', 'Chữ ký Kế toán'])+
    hsoPLBang('Phần theo dõi nợ quá hạn, nợ bị rủi ro', ['Ngày tháng năm', 'Diễn giải', 'Số tiền chuyển nợ quá hạn/khoanh nợ/xoá nợ', 'Dư nợ quá hạn/khoanh nợ/xoá nợ', 'Chữ ký Bên vay', 'Chữ ký Kế toán']);
  return {ma:'07b/GQVL', h:h};
}
function hsoPLBang(tieu, cot){ return '<p class="b tr">'+tieu+'</p><p class="r i s11">Đơn vị: đồng</p>'+hsoBang('luoi s11', cot.map(function(){ return 1; }), '<tr>'+cot.map(function(x){ return '<td class="c b">'+x+'</td>'; }).join('')+'</tr><tr>'+cot.map(function(x, i){ return '<td class="c i">'+(i+1)+'</td>'; }).join('')+'</tr>'+
  [1,2,3,4,5].map(function(){ return '<tr>'+cot.map(function(){ return '<td>&nbsp;</td>'; }).join('')+'</tr>'; }).join('')); }
function hsoTuyGQ(B){   /* ③ phương án GQVL: chọn nhanh như GDX + ưu tiên, lao động, hiệu quả, hợp đồng */
  var G = hsoGQ(B), C = G.C, P = B.pa || {}, L = P.ld || {}, A = G.A, h = '';
  var o = function(nhan, duong, gt, ph){ return hsoTuyO(nhan, '<input value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" onchange="hsoBoDat(\''+duong+'\',this.value,1)">'); };
  var chip = function(ds, ham, chon){ return '<div class="hang-nut hso-chon">'+ds.map(function(x){ return gdxChip(coChuHTML(x[1]), String(x[0])===String(chon), ham(x[0]), 'hso-ct', ''); }).join('')+'</div>'; };
  var dong = P.dong || [];
  h += '<div class="nhan-nhom">③ Phương án GQVL — mục đích (bấm chọn nhanh)</div>'+(C.md.length ? chip(C.md.map(function(x){ return [x, x]; }), function(v){ return 'hsoGQThemMD(\''+String(v).replace(/'/g, "\\'")+'\')'; }, '') : '<div class="sl-phu">Chưa khai mục đích — khai ở thẻ GQVL (① ⚙ khai báo chương trình).</div>')+
    hsoGQDvDs()+dong.map(function(x, i){ var t = hsoGQTach(x); return '<div class="hso-ho"><input style="width:42%" value="'+coChuHTML(x.md||'')+'" placeholder="mục đích (vd Chăn nuôi bò sinh sản)" onchange="hsoGQDong('+i+',\'md\',this.value)"><input style="width:10%" value="'+coChuHTML(t.sl)+'" placeholder="số lượng" title="Số lượng (số)" onchange="hsoGQDong('+i+',\'sl\',this.value)"><input style="width:12%" list="hso-dv-ds" value="'+coChuHTML(t.dv)+'" placeholder="đơn vị" title="Đơn vị: con, m², ha, công, cây… — app nhớ theo mục đích" onchange="hsoGQDong('+i+',\'dv\',this.value)"><input style="width:22%" value="'+coChuHTML(x.tien ? tdnTien(hsoSo(x.tien)) : '')+'" placeholder="thành tiền" onchange="hsoGQDong('+i+',\'tien\',this.value)"> <button class="nho" onclick="hsoGQDong('+i+',\'xoa\')">✕</button></div>'; }).join('')+
    '<button class="nho" onclick="hsoGQThemMD(\'\')">＋ Dòng mục đích</button>';
  if(dong.length<=1) h += '<div class="nhan-nhom">Số tiền vay</div>'+chip((C.chipTien||[]).map(function(x){ return [x, tdnTien(+x)]; }), function(v){ return 'hsoGQTien(\''+v+'\')'; }, String(A.tien));
  h += '<div class="nhan-nhom">Thời hạn · kỳ hạn trả gốc</div>'+chip([12, 36, 60].map(function(x){ return [x, x+' tháng']; }), function(v){ return 'hsoBoDat(\'th\',\''+v+'\',1)'; }, A.th)+
    chip([24, 12].map(function(x){ return [x, x+' tháng/lần']; }), function(v){ return 'hsoBoDat(\'ky\',\''+v+'\',1)'; }, A.ky)+
    o('Vốn tự có (đ)', 'tuCo', B.tuCo, G.tu.tuCo ? 'tự tính: '+tdnTien(G.tuCo) : '0')+o('Tên phương án', 'pa.ten', P.ten, A.md || 'trống = theo mục đích')+o('Địa điểm thực hiện', 'pa.dd', P.dd, 'trống = nơi ở')+
    '<div class="nhan-nhom">Đối tượng ưu tiên (tích 1–5 → lãi suất ưu tiên)</div>'+HSO_UT.map(function(x, i){ return '<label class="hso-o2"><input type="checkbox"'+((P.ut||[]).indexOf(i)>=0 ? ' checked' : '')+' onchange="hsoGQUT('+i+',this.checked)"> '+(i+1)+'. '+coChuHTML(x)+'</label>'; }).join('')+
    ((P.ut||[]).indexOf(5)>=0 ? o('Khác (ghi rõ)', 'pa.utKhac', P.utKhac, '') : '')+((P.ut||[]).length ? o('Giấy tờ xác nhận', 'pa.utGT', P.utGT, 'trống = chấm') : '')+
    '<div class="nhan-nhom">Lao động (trống = chấm)</div><div class="hso-ho">'+[['tong','Tổng'], ['tao','Tạo'], ['duy','Duy trì'], ['mo','Mở rộng'], ['nu','Nữ'], ['ho','Thuộc hộ'], ['ngoai','Ngoài hộ']].map(function(x){ return '<label class="hso-ld">'+x[1]+' <input class="hso-so" value="'+coChuHTML(L[x[0]]||'')+'" onchange="hsoBoDat(\'pa.ld.'+x[0]+'\',this.value,1)"></label>'; }).join('')+'</div>'+
    '<div class="nhan-nhom">Hiệu quả (cả thời gian phương án)</div>'+o('Tổng doanh thu (đ)', 'pa.dt', P.dt, G.tu.dt ? 'tự tính: '+tdnTien(G.dt) : 'trống = chấm')+o('Tổng chi phí (đ, gồm lãi vay)', 'pa.cp', P.cp, G.tu.cp ? 'tự tính: '+tdnTien(G.cp) : 'trống = chấm')+
    (G.k ? '<div class="sl-phu">Ô trống tự tính theo hệ số <b>k = '+hsoSoVN(G.k)+'</b> (vốn tự có 20 tr × k · chi phí = vay + 40 tr × k · lợi nhuận = vốn − 10 tr × k) <button class="nho" onclick="hsoGQDoiK()" title="Đổi hệ số ngẫu nhiên — số liệu phương án khác đi">🎲 Đổi số</button></div>' : '')+
    '<div class="sl-phu">Lãi suất <b>'+hsoSoVN(G.ls)+' %</b>'+(G.ut ? ' (ưu tiên)' : '')+' · quá hạn '+hsoSoVN(G.qh)+' % · lãi vay dự kiến <b>'+tdnTien(G.lai)+'</b> đ'+(G.cl!=null ? ' · chênh lệch '+tdnTien(G.cl)+' đ · BQ '+tdnTien(G.bq)+' đ/tháng' : '')+'</div>'+
    (G.lich.length ? '<div class="sl-phu">Lịch trả gốc'+(+B.ky ? '' : ' (tự phân kỳ '+(G.ky ? G.ky+' tháng/lần' : '1 lần')+')')+': '+G.lich.map(function(k){ return (k.ngay ? ngayVNsl(k.ngay) : 'tháng '+k.thang)+': '+tdnTien(k.tien); }).join(' · ')+'</div>' : '')+
    (G.canh.length ? '<div class="sl-phu hso-canh">⚠ '+coChuHTML(G.canh.join('; '))+'</div>' : '')+
    '<div class="nhan-nhom">Hợp đồng 07b</div>'+o('Ngày ký HĐ', 'ngayHD', hsoNgayVN(B.ngayHD), 'dd/mm/yyyy — trống = ngày chấm')+o('Ngày giải ngân (gốc lịch trả nợ)', 'ngayGN', hsoNgayVN(B.ngayGN), 'trống = theo ngày ký HĐ')+
    '<div class="hang-nut"><label class="hso-o2"><input type="radio" name="hso-gn"'+(P.gn==='tm' ? ' checked' : '')+' onchange="hsoBoDat(\'pa.gn\',\'tm\',1)"> Tiền mặt</label><label class="hso-o2"><input type="radio" name="hso-gn"'+(P.gn==='ck' ? ' checked' : '')+' onchange="hsoBoDat(\'pa.gn\',\'ck\',1)"> Chuyển khoản</label><label class="hso-o2"><input type="radio" name="hso-gn"'+(!P.gn ? ' checked' : '')+' onchange="hsoBoDat(\'pa.gn\',\'\',1)"> Để trống</label></div>'+
    (P.gn==='ck' ? o('Số tài khoản', 'pa.stk', P.stk, '')+o('Tại ngân hàng', 'pa.nh', P.nh, '') : '');
  return h;
}
function hsoGQThemMD(md){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var ds = B.pa.dong = B.pa.dong || []; var C = hsoCTV(B.ct) || {};
  if(md && ds.length===1 && !ds[0].md){ ds[0].md = md; if(!ds[0].dv) ds[0].dv = hsoGQDvGoi(md); } else ds.push({md:md, sl:'', dv:hsoGQDvGoi(md), tien:ds.length ? '' : (C.chipTien||[])[1] || ''}); hsoBoLuu(); hsoVe(); }
function hsoGQDong(i, f, v){ var B = hsoBo(); if(!B) return; var ds = (B.pa||{}).dong || [], x = ds[i];
  if(f==='xoa'){ ds.splice(i, 1); hsoBoLuu(); hsoVe(); return; } if(!x) return;
  v = f==='tien' ? String(v||'').replace(/[^\d]/g, '') : String(v||'').trim();
  if(f==='sl' || f==='dv'){ var t = hsoGQTach(x); x.sl = t.sl; x.dv = t.dv; }   /* dữ liệu cũ "4 con" → tách số + đơn vị */
  if(f==='sl' && v && !/^[\d.,]+$/.test(v)){ var m = v.match(/^([\d.,]+)\s*(.+)$/); if(m){ v = m[1]; x.dv = m[2].trim(); } else bao('Số lượng nên là số (vd 4, 25, 0,5) — đơn vị ghi ở ô bên cạnh.'); }
  x[f] = v;
  var MD = hsoKB().mdDv = hsoKB().mdDv || {}, k = slChuan(x.md||'');
  if(f==='md' && k && !x.dv) x.dv = hsoGQDvGoi(v);   /* 3.228: nhớ đơn vị theo mục đích */
  if(f==='dv' && k && v) MD[k] = v;
  if(f==='md' && v){ var C = hsoCTV(B.ct); if(C && C.kieu==='gqvl' && !C.md.some(function(m){ return slChuan(m)===k; })){ C.md.push(v); luu(); } }   /* mục đích gõ mới → gợi ý lần sau */
  hsoBoLuu(); hsoVe(); }
var HSO_DV = ['con', 'm²', 'ha', 'công', 'cây', 'cái', 'chiếc', 'tấn', 'kg', 'gốc', 'ô', 'm³', 'bộ', 'lồng', 'máy'];   /* 3.228: gợi ý đơn vị số lượng GQVL */
function hsoGQDvGoi(md){ var k = slChuan(md||''); if(!k) return ''; var MD = hsoKB().mdDv || {}; if(MD[k]) return MD[k];   /* đơn vị gợi ý: đã nhớ → theo từ khóa */
  return /chan nuoi|nuoi\s(bo|heo|lon|ga|vit|de|ca|tom|be)/.test(k) ? 'con' : /cai tao|xay|sua chua|mo rong quan|nha xuong/.test(k) ? 'm²' : /trong\s(lua|mia|mi|cao su|rau)/.test(k) ? 'ha' : /trong cay/.test(k) ? 'cây' : ''; }
function hsoGQDvDs(){ var MD = hsoKB().mdDv || {}, co = {}; return '<datalist id="hso-dv-ds">'+HSO_DV.concat(Object.keys(MD).map(function(k){ return MD[k]; })).filter(function(d){ if(co[d]) return false; co[d] = 1; return true; }).map(function(d){ return '<option value="'+coChuHTML(d)+'">'; }).join('')+'</datalist>'; }
function hsoGQTach(x){ var sl = String(x.sl||'').trim(), dv = String(x.dv||'').trim(), m;   /* {sl, dv} — dữ liệu cũ ghi chung "4 con" */
  if(!dv && (m = sl.match(/^([\d.,]+)\s*(\D.*)$/))){ sl = m[1]; dv = m[2].trim(); } return {sl:sl, dv:dv}; }
function hsoGQSL(x){ var t = hsoGQTach(x); return t.sl+(t.sl && t.dv ? ' '+t.dv : t.dv); }   /* chữ in: "4 con", "25 m²" */
function hsoGQTien(v){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var ds = B.pa.dong = B.pa.dong || []; if(!ds.length) ds.push({md:'', sl:'', tien:v}); else ds[0].tien = v; hsoBoLuu(); hsoVe(); }
function hsoGQUT(i, v){ var B = hsoBo(); if(!B) return; B.pa = B.pa || {}; var u = B.pa.ut = B.pa.ut || [], k = u.indexOf(i); if(v && k<0) u.push(i); if(!v && k>=0) u.splice(k, 1); hsoBoLuu(); hsoVe(); }
/* ---------- 3.209: cột trái 01/TD · 01/UQ · 03/TD · 01/TGTV theo hộ — chọn hộ → chọn chương trình → phương án → in (+ in kèm) ---------- */
function hsoKemCo(B){ var k = (B && B.kem) || {}; return !!(k.ds || k.bb || k.uq || k.tgtv || k.hd || k.pd); }
function hsoUQThieu(B){   /* thành viên ≥ 18 tuổi thiếu ngày sinh / CCCD (giấy UQ) — 3.256: bỏ người dưới 18 tuổi */
  var r = []; (B.ho || []).forEach(function(x){ var tu = hsoTuoi(x.ns, HSO.vay.ngayLap); if(tu>=0 && tu<18) return; if(!x.ns || !x.cccd) r.push(x.ten); }); return r; }
/* 3.256 (anh chốt 17/10, ý 10.3 — "code tiếp" 18/10): GIẤY ỦY QUYỀN 01/UQ chọn hộ từ 📒 Sổ hộ vay — thành viên / người thừa kế khai sẵn ở sổ.
   Form đi đúng thứ tự giấy: hộ → I. ngày lập, số người, thành viên ≥ 18 tuổi → II. người được ủy quyền (= người đứng tên vay trong sổ, chung 01/TD) → bên ủy quyền → trưởng thôn chứng kiến. */
function hsoTuoi(ns, ngay){ var d = hsoNg(ns), n = ngay ? hsoNg(ngay) : null, h = n ? new Date(+n.y, +n.m-1, +n.d) : new Date(); if(!d) return -1;
  var t = h.getFullYear()-(+d.y); if(h.getMonth()+1<+d.m || h.getMonth()+1===+d.m && h.getDate()<+d.d) t--; return t; }
function hmDatDung(id, i){ var o = hmTim(id); if(!o || !o.tv[i]) return; o.dung = +i; luu(); var B = hsoBo(); if(B && B.hoId===id) hmDongBo(o, B); hsoBoLuu(); hsoVe(); }
function hsoTuyUQ(M, t){
  var B = hsoBo(), o = B && B.hoId ? hmTim(B.hoId) : null, h = '<div class="nhan-nhom hso-kbr">✎ Nhập liệu — Mẫu 01/UQ <small>(theo thứ tự trên giấy)</small></div>';
  if(B && !o) B = null; if(o) hmDongBo(o, B);
  h += hsoTuyO('👪 Hộ (📒 Sổ hộ vay)', hsoChon('hmChonHo(this.value)', o ? o.id : '', [['', hmDs().length ? '— chọn hộ trong sổ ('+hmDs().length+') —' : '— sổ trống —']].concat(hmDs().map(function(x){ var n = x.tv[x.dung||0] || {}; return [x.id, (n.ten||'(chưa tên)')+(x.kh ? ' · '+x.kh : ' · hộ mới')+(hmToTen(x) ? ' · '+hmToTen(x) : '')]; }))))+
    '<div class="hang-nut"><button class="nho" onclick="hmMo()">＋ Hộ mới</button><button class="nho" onclick="hmM31Hop()">＋ Lấy từ Mẫu 31</button>'+(o ? '<button class="nho chinh" onclick="hmMo(\''+o.id+'\')" title="Thêm / sửa thành viên, người thừa kế, ngày sinh, CCCD ở sổ">✎ Sửa thành viên ở sổ</button>' : '')+'</div>';
  if(!o) return h+'<div class="sl-phu">Chưa chọn hộ → khung phải là mẫu trắng (in được ngay). Thành viên / người thừa kế khai ở 📒 Sổ hộ vay (＋ Hộ mới / ✎ Sửa).</div>'+hsoKBRieng(M.k, null);
  var V = HSO.vay, tv = o.tv.map(function(x, i){ return {x:x, i:i, tuoi:hsoTuoi(x.ns, V.ngayLap)}; }).filter(function(r){ return r.x.ten; }), dung = o.dung || 0;
  h += '<div class="nhan-nhom">I. Hộ gia đình</div>'+hsoTuyO('Ngày lập giấy', '<input type="date" value="'+coChuHTML(V.ngayLap||'')+'" onchange="HSO.vay.ngayLap=this.value;hsoVe()">')+'<div class="sl-phu">Trống = chấm ghi tay.</div>'+
    hsoTuyO('Hộ gồm (người)', '<input inputmode="numeric" value="'+coChuHTML(B.soNguoi||'')+'" placeholder="'+tv.length+' (theo sổ) — trống = chấm" onchange="hsoBoDat(\'soNguoi\',this.value.replace(/\\D/g,\'\'),1)">');
  h += '<div class="hso-tick-ds">'+tv.map(function(r, k){ var x = r.x, thieu = [!x.ns && 'ngày sinh', !x.cccd && 'CCCD'].filter(Boolean), nho = r.tuoi>=0 && r.tuoi<18;
    return '<div>'+(r.i===dung ? '⭐ ' : '• ')+'<b>'+coChuHTML(x.ten)+'</b>'+(x.qh ? ' <small>· '+coChuHTML(x.qh)+'</small>' : '')+(x.ns ? ' <small>· '+hsoNgayVN(x.ns)+(r.tuoi>=0 ? ' ('+r.tuoi+' t)' : '')+'</small>' : '')+(x.cccd ? ' <small>· '+coChuHTML(x.cccd)+'</small>' : '')+
      (nho ? ' <b class="hso-canh">dưới 18 tuổi — không vào giấy</b>' : thieu.length ? ' <b class="hso-canh">thiếu '+thieu.join(', ')+'</b>' : '')+'</div>'; }).join('')+'</div>';
  var thieuAi = hsoUQThieu(B); if(!B.ho.length || thieuAi.length) h += '<div class="sl-bao vang hso-nhac">⚠ Giấy UQ cần đủ thành viên ≥ 18 tuổi (ngày sinh, CCCD)'+(thieuAi.length ? ' — thiếu: '+coChuHTML(thieuAi.join(', ')) : ' — hộ chưa có thành viên khác')+' <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung ở sổ</button></div>';
  h += '<div class="nhan-nhom">II. Người được ủy quyền</div>'+hsoTuyO('Cử ông (bà)', hsoChon('hmDatDung(\''+o.id+'\',this.value)', String(dung), tv.filter(function(r){ return !(r.tuoi>=0 && r.tuoi<18); }).map(function(r){ return [String(r.i), r.x.ten+(r.x.qh ? ' · '+r.x.qh : '')]; })))+
    '<div class="sl-phu">= người đứng tên vay trong sổ (01/TD dùng chung). Thành viên còn lại là <b>Bên ủy quyền</b>.</div>';
  var tt = hsoBoT(B).truongAp || ''; h += hsoTuyO('Trưởng thôn chứng kiến', '<span class="l01-tu">'+(tt ? coChuHTML(tt) : '— chưa khai (⚙ Khai báo đơn vị › Trưởng ấp) —')+'</span>');
  return h+hsoKBRieng(M.k, {ubOng:B.nv.ten}); }
function hsoTuyHo(M, t){
  var B = hsoBo(), o = B && B.hoId ? hmTim(B.hoId) : null, h = '';
  if(B && !o) B = null;
  if(o) hmDongBo(o, B);
  h += hsoTuyO('👪 Hộ vay', hsoChon('hmChonHo(this.value)', o ? o.id : '', [['', hmDs().length ? '— chọn hộ trong sổ ('+hmDs().length+') —' : '— sổ trống —']].concat(hmDs().map(function(x){ var n = x.tv[x.dung||0] || {}; return [x.id, (n.ten||'(chưa tên)')+(x.kh ? ' · '+x.kh : ' · hộ mới')+(hmToTen(x) ? ' · '+hmToTen(x) : '')]; }))))+
    '<div class="hang-nut"><button class="nho" onclick="hmMo()">＋ Hộ mới</button><button class="nho" onclick="hmM31Hop()">＋ Lấy từ Mẫu 31</button>'+(o ? '<button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Sửa / bổ sung hộ</button>' : '')+'</div>';
  var kbr = /^(01td|01uq|01gqvl|07b)$/.test(M.k) ? function(){ return hsoKBRieng(M.k, o ? {ubOng:B.nv.ten} : null); } : function(){ return ''; };   /* 3.215: ⚙ Khai báo riêng */
  if(!o) return h+'<div class="sl-phu">Chưa chọn hộ → khung phải là mẫu trắng (in được ngay).</div>'+kbr();
  var N = B.nv, C = hsoCTV(B.ct) || {};
  h += '<div class="sl-phu"><b>'+coChuHTML(N.ten)+'</b>'+(N.cccd ? ' · CCCD '+coChuHTML(N.cccd) : '')+(o.kh ? ' · mã KH '+coChuHTML(o.kh) : ' · hộ mới (chưa mã KH)')+(hmToTen(o) ? ' · '+coChuHTML(hmToTen(o)) : ' · <b class="hso-canh">chưa gắn tổ</b>')+'</div>';
  if(M.k==='01uq'){ var th = hsoUQThieu(B); if(!B.ho.length || th.length) h += '<div class="sl-bao vang hso-nhac">⚠ Giấy UQ cần đủ thành viên ≥ 18 tuổi (ngày sinh, CCCD)'+(th.length ? ' — thiếu: '+coChuHTML(th.join(', ')) : ' — hộ chưa có thành viên')+' <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung</button></div>'; return h; }
  if(M.k==='01tgtv') return h;
  if(M.k==='01gqvl' || M.k==='07b' || M.k==='pdnh'){   /* 3.257 (anh 18/10 "rà soát form mẫu nào không lọt mẫu khác"): mẫu riêng GQVL — không chip chương trình khác, không phương án / In kèm của HSSV, NSVSMT */
    if(C.kieu!=='gqvl'){ var gqC = hsoCTVDs().find(function(c){ return c.kieu==='gqvl'; });
      return h+'<div class="sl-bao vang hso-nhac">Mẫu '+coChuHTML(M.ma)+' chỉ dùng cho chương trình <b>GQVL</b> — hộ đang chọn <b>'+coChuHTML(B.ct||'')+'</b>. '+(gqC ? '<button class="nho chinh" onclick="hsoBoDat(\'ct\',\''+gqC.ma+'\',1)">Chuyển hộ sang chương trình GQVL</button>' : '')+' Chưa chuyển thì khung phải in theo hộ, phần phương án để chấm.</div>'+kbr(); }
    h += '<div class="sl-phu">Chương trình: <b>'+coChuHTML(C.ten || C.ma)+'</b></div>'+hsoTuyPA(B)+(M.k==='01gqvl' ? hsoTuyKem(B, o, true) : '');
    return h+kbr(); }
  h += '<div class="nhan-nhom">① Chương trình vay <a href="#" class="hso-nho" onclick="event.preventDefault();hsoKBHop(\'ct\')">⚙ khai báo chương trình</a></div><div class="hang-nut">'+
    hsoCTVDs().filter(function(c){ return c.bat!==false || c.ma===B.ct; }).map(function(c){ return gdxChip('<b>'+coChuHTML(c.ma)+'</b>', B.ct===c.ma, 'hsoBoDat(\'ct\',\''+c.ma+'\',1)', 'hso-ct', c.ten); }).join('')+'</div>';
  if(C.kieu==='hssv') h += hsoTuySV(B, o);
  var gq = C.kieu==='gqvl';
  if(M.k==='01td' && gq) h += '<div class="sl-bao vang hso-nhac">GQVL dùng mẫu riêng <b>01/GQVL</b> (đơn) + <b>07b/GQVL</b> (hợp đồng) — <button class="nho chinh" onclick="hsoChonMau(\'01gqvl\')">Mở 01/GQVL</button></div>';
  if(M.k==='01gqvl' && !gq) h += '<div class="sl-bao vang hso-nhac">Mẫu 01/GQVL dành cho chương trình <b>GQVL</b> — chọn chip GQVL ở trên.</div>';
  h += hsoTuyPA(B);
  if(M.k==='01td' || M.k==='01gqvl') h += hsoTuyKem(B, o, gq);
  return h+kbr();
}
/* 3.243b: chip chọn sinh viên (hộ nhiều SV) và khối "In kèm" — dùng chung cột cũ và form lập 01/TD (L01) */
function hsoTuySV(B, o){ var sv = hmSV(o).map(function(i){ return (o.tv[i]||{}).ten; }).filter(Boolean);
  return sv.length>1 ? '<div class="nhan-nhom">Sinh viên (mỗi SV 1 đơn)</div><div class="hang-nut">'+sv.map(function(x){ return gdxChip(coChuHTML(x), (B.pa||{}).sv===x, 'hsoBoDat(\'pa.sv\',\''+
      String(x).replace(/'/g, "\\'")+'\',1)', 'hso-ct', ''); }).join('')+'</div>' : sv.length ? '' : '<div class="sl-phu hso-canh">Hộ chưa đánh dấu HSSV — gõ tên SV ở ô dưới hoặc <a href="#" onclick="event.preventDefault();hmMo(\''+o.id+'\')">✎ bổ sung</a>.</div>'; }
function hsoTuyKem(B, o, gq){
  return '<div class="nhan-nhom">In kèm (1 lần in / 1 file Word)</div>'+(gq ? [['ds','03/TD danh sách'], ['bb','10C biên bản họp'], ['pd','Trang Phê duyệt của Ngân hàng (sau 01/GQVL)'], ['hd','07b/GQVL hợp đồng tín dụng'], ['tgtv','01/TGTV mở TK tổ viên'+
      (o.kh ? '' : ' (hộ mới)')]] : [['ds','03/TD danh sách'], ['bb','10C biên bản họp'], ['uq','01/UQ giấy ủy quyền'], ['tgtv','01/TGTV mở TK tổ viên'+(o.kh ? '' : ' (hộ mới)')], ['k06','06/TD phiếu kiểm tra (in tiếp sau, khổ ngang)']]).map(function(x){
      return '<label class="hso-o2"><input type="checkbox"'+(B.kem[x[0]] ? ' checked' : '')+' onchange="hsoBoDat(\'kem.'+x[0]+'\',this.checked?1:0,1)"> '+x[1]+'</label>'; }).join('')+
    (B.kem.uq && (hsoUQThieu(B).length || !B.ho.length) ? '<div class="sl-bao vang hso-nhac">⚠ 01/UQ thiếu thành viên / ngày sinh, CCCD — <button class="nho" onclick="hmMo(\''+o.id+'\')">✎ Bổ sung</button></div>' : '')+
    (B.kem.bb || B.kem.ds ? hsoNgayTuy('Ngày họp tổ', 'Biên bản, 03/TD — trống = chấm.') : '');
}
/* ---------- cột tùy chọn của từng mẫu ---------- */
function hsoTuyO(nhan, html, ghi){ return '<label class="kt-kb hso-o"><span>'+nhan+'</span>'+html+'</label>'+(ghi ? '<div class="sl-phu">'+ghi+'</div>' : ''); }
function hsoIn(js, gt, ph, kieu, id){ return '<input'+(id ? ' id="'+id+'"' : '')+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" oninput="'+js+'">'; }
function hsoChon(js, gt, ops){ return '<select onchange="'+js+'">'+ops.map(function(o){ return '<option value="'+coChuHTML(o[0])+'"'+(String(o[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(o[1])+'</option>'; }).join('')+'</select>'; }
function hsoDsTick(nhom, ds, tieu, rong){
  var n = ds.filter(function(x){ return HSO[nhom][x.kh]; }).length;
  return '<details class="hso-tick"'+(ds.length && ds.length<=15 ? ' open' : '')+'><summary>'+tieu+' — <b id="hso-dem-'+nhom+'">'+n+'</b>/'+ds.length+'</summary>'+
    (ds.length ? '<div class="hso-tick-ds">'+ds.map(function(x){ return '<label><input type="checkbox"'+(HSO[nhom][x.kh] ? ' checked' : '')+' onchange="hsoTick(\''+nhom+'\',\''+x.kh+'\',this.checked)"> '+coChuHTML(x.ten)+(x.ghi ? ' <small>'+coChuHTML(x.ghi)+'</small>' : '')+'</label>'; }).join('')+'</div>' : '<div class="sl-phu">'+(rong||'Không có ai.')+'</div>')+'</details>';
}
function hsoNgayTuy(nhan, ghi){ return hsoTuyO(nhan || 'Ngày họp', hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay||'', '', 'date'), ghi || 'Để trống = chấm, ghi tay.'); }
function hsoHoiTuy(t){ var vt = hsoLuu().hoiVT; if(vt===undefined) vt = 'pct';
  return hsoTuyO('Đại diện Hội', hsoChon('hsoDatLuu(\'hoiVT\',this.value)', vt, ktInVTTen(KT_IN_VT, t ? [{t:t}] : [], vt))); }
function hsoTuyHTML(M, t){
  var S = hsoCH(), T = hsoTo(t), L = hsoLuu(), h = '<div class="nhan-nhom hso-kbr">✎ Nhập liệu — '+(M.k==='sohv' ? '' : 'Mẫu ')+coChuHTML(M.ma)+'</div>'+(typeof omCo==='function' && omCo(M.k) ? omKieuHTML(M.k) : '')+hsoThieuHTML(M, t), can = !t && ['bo','01uq','01td','03td','01tgtv','sohv','01gqvl','07b'].indexOf(M.k)<0;
  if(can) h += '<div class="sl-bao vang hso-nhac">Chọn <b>1 tổ</b> ở khối LỌC ĐỊA BÀN để app điền sẵn — chưa chọn thì khung phải là mẫu trắng (in được ngay).</div>';
  if(t && T.phoKB && T.phoMay && slChuan(T.phoMay)!==slChuan(T.pho)) h += '<div class="sl-phu hso-canh">⚠ Tổ phó theo khai báo: <b>'+coChuHTML(T.pho)+'</b> (trên máy: '+coChuHTML(T.phoMay)+')</div>';
  else if(t && !T.pho) h += '<div class="sl-phu hso-canh">Tổ chưa có tổ phó trên máy — <a href="#" onclick="event.preventDefault();hsoKBHop(\'pho\')">⚙ khai tổ phó thực tế</a>.</div>';
  if(t && !T.truongAp && ['10c','10ccu','10a','10b','10d'].indexOf(M.k)>=0) h += '<div class="sl-phu hso-canh">Chưa khai trưởng ấp '+coChuHTML(T.ap)+' — <a href="#" onclick="event.preventDefault();hsoKBHop(\'ap\')">⚙ khai báo</a>.</div>';
  var tv = hsoTVTo(t);
  if(M.k==='10c' || M.k==='10ccu'){   /* 3.223 (anh 16/10): 10C cũ / mới là 2 chip — bỏ chọn mẫu theo ngày */
    var raBD = TO_BD && t && TO_BD.to===t.ma && TO_BD.co ? TO_BD.ra : [];
    h += hsoNgayTuy('Ngày họp', 'Trống = chấm (Hồ sơ Tổ mặc định để trống ngày).')+hsoHoiTuy(t)+
      hsoTuyO('Tiết kiệm tối thiểu (đ)', hsoIn('hsoDatLuu(\'tkMin\',this.value)', L.tkMin||'', 'trống = chấm'))+
      (t ? hsoDsTick('kn', tv.filter(function(k){ return k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.vao.tu}; }).concat(tv.filter(function(k){ return !k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:'tổ viên hiện có'}; })), '➕ Kết nạp (mới vào tích sẵn)')+
        hsoDsTick('ra', raBD.map(function(r){ return {kh:r.kh, ten:r.ten, ghi:'đã ra khỏi tổ — '+r.di}; }).concat(tv.filter(function(k){ return !k.conNo && !k.chuaGN; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.t105>0 ? 'tất nợ, còn 105' : 'tất nợ, 105 = 0'}; })), '➖ Cho ra (ra khỏi tổ + tất nợ 105 = 0 tích sẵn)', TO_BD ? 'Không có.' : 'Đang so Mẫu 31 tháng trước…') : '');
  }
  else if(M.k==='10a'){
    h += hsoNgayTuy()+hsoHoiTuy(t)+hsoTuyO('Ngày họp định kỳ', hsoIn('hsoDatLuu(\'ngayDK\',this.value)', L.ngayDK||'', 'vd 15 hằng tháng'))+hsoTuyO('Tiết kiệm tối thiểu (đ)', hsoIn('hsoDatLuu(\'tkMin\',this.value)', L.tkMin||'', 'trống = chấm'));
    if(t){ tv.forEach(function(k){ if(HSO.tv[k.kh]===undefined) HSO.tv[k.kh] = true; }); h += hsoDsTick('tv', tv.map(function(k){ return {kh:k.kh, ten:k.ten}; }), '👥 Danh sách tổ viên in vào biên bản'); }
  }
  else if(M.k==='10b'){
    var B = t ? hsoBau(t) : {tt:'', ttCu:'', pho:'', phoCu:''};
    h += hsoNgayTuy()+hsoHoiTuy(t)+
      (t ? hsoDsTick('kn', tv.filter(function(k){ return k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.vao.tu}; }).concat(tv.filter(function(k){ return !k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten}; })), '➕ Kết nạp (mới vào tích sẵn)') : '')+
      '<div class="nhan-nhom">Bầu thay Ban quản lý'+(t && hsoTruoc(t) ? ' <small>(gợi ý so Mẫu 31 tháng trước)</small>' : '')+'</div>'+
      hsoTuyO('Tổ trưởng mới', hsoIn('hsoDocO()', B.tt, 'trống = chấm', '', 'hso-o-ttMoi'))+hsoTuyO('thay Ông (Bà)', hsoIn('hsoDocO()', B.ttCu, '', '', 'hso-o-ttCu'))+
      hsoTuyO('Tổ phó mới', hsoIn('hsoDocO()', B.pho, 'trống = chấm', '', 'hso-o-phoMoi'))+hsoTuyO('thay Ông (Bà)', hsoIn('hsoDocO()', B.phoCu, '', '', 'hso-o-phoCu'));
  }
  else if(M.k==='10d') h += hsoNgayTuy()+hsoHoiTuy(t);
  else if(M.k==='11' || M.k==='11cu'){
    var K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {};
    h += hsoNgayTuy('Ngày ký', 'Trống = chấm.')+'<div class="sl-phu">Bên A (PGD) lấy ở <a href="#" onclick="event.preventDefault();hsoKBHop(\'pgd\')">⚙ Khai báo chung</a>'+(hsoPGD('daiDien') ? '' : ' — <b>chưa khai người đại diện</b>')+'.</div>'+
      (t ? '<div class="sl-phu">'+(c.cccd ? 'CCCD tổ trưởng: '+coChuHTML(c.cccd)+' — căn cứ: '+coChuHTML(K.cc) : '⚠ Chưa khớp được tổ trưởng với khách trong Mẫu 31 → số căn cước để chấm.')+'</div>' : '');
  }
  else if(M.k==='01bg' || M.k==='02bg'){
    var G = t ? hsoGiaoNhan(t) : {giao:'', nhan:''};
    h += hsoNgayTuy('Ngày lập')+hsoHoiTuy(t)+hsoTuyO('Bên giao (tổ trưởng cũ)', hsoIn('hsoDocO()', G.giao, 'trống = chấm', '', 'hso-o-giao'))+
      hsoTuyO('Bên nhận (tổ trưởng mới)', hsoIn('hsoDocO()', G.nhan, 'trống = chấm', '', 'hso-o-nhan'),
        t && hsoTruoc(t) && slChuan(hsoTruoc(t).ten)!==slChuan(T.tt) ? 'Tổ trưởng đổi so với tháng trước ('+coChuHTML(hsoTruoc(t).ten)+' → '+coChuHTML(T.tt)+') — đã điền sẵn.' : '');
    if(M.k==='02bg') h += '<label class="hso-o2"><input type="checkbox"'+(L.bgCa ? ' checked' : '')+' onchange="hsoDatLuu(\'bgCa\',this.checked)"> Gồm cả tổ viên không còn số dư (tất nợ, 105 = 0)</label>'+
      (KHO.coKy() ? '<div class="sl-phu">Số liệu đến ngày '+ngayVNsl(KHO.ky().ngay)+' ('+coChuHTML(KHO.ky().hsoTen||'')+'). Đổi kỳ ở 📅 đầu trang.</div>' : '');
  }
  else h += hsoTuyVay(M, t, tv);
  return h;
}
function hsoTuyVay(M, t, tv){
  hmChuyenCu();   /* 3.240 (anh 17/10): phiếu chưa gắn sổ → gắn trước, mọi mẫu đi theo Sổ hộ vay (trước rơi về giao diện Hộ vay cũ) */
  var V = HSO.vay, B = hsoBo(), h = '';
  if(M.k==='sohv') return hmSoHTML();   /* 3.214 */
  if(M.k==='01td' && typeof L01!=='undefined') return L01.form(M, t);   /* 3.242: form lập 01/TD theo thứ tự tờ giấy (js/40-lap-01td.js) */
  if(M.k==='01uq') return hsoTuyUQ(M, t);   /* 3.256: form Giấy ủy quyền theo thứ tự tờ giấy */
  if(/^(01uq|01td|01gqvl|07b|pdnh)$/.test(M.k) && (!B || B.hoId)) return hsoTuyHo(M, t);   /* 3.209: in theo hộ (bộ cũ chưa gắn hộ → cách cũ) */
  if(M.k==='06td') return hsoTuy06();   /* 3.253 */
  if(M.k==='03td'){ var D3 = hsoD03(), oB = B && B.hoId && hmTim(B.hoId);   /* 3.209: 03/TD nhiều hộ; đi từ hộ đang làm → tự thêm hộ đó */
    if(oB && !D3.ds.length){ D3.ct = B.ct || D3.ct; D3.ds.push(hsoD03Moi(oB, D3.ct)); luu(); }
    else if(oB && D3.ds.length===1 && D3.ds[0].hoId===oB.id && B.ct && D3.ct!==B.ct){ D3.ct = B.ct; D3.ds = [hsoD03Moi(oB, B.ct)]; luu(); }   /* 3.240: 03/TD 1 hộ đi theo 01/TD của hộ — đổi chương trình bên 01/TD thì 03/TD đổi theo */
    hsoD03TuBo(D3);
    if(D3.ds.length || oB) return hsoTuy03(t);
    h += hsoTuyO('＋ Thêm hộ từ sổ', hsoChon('hsoD03Them(this.value)', '', [['', '— 03/TD nhiều hộ: chọn hộ trong 👪 sổ hộ vay —']].concat(hmDs().map(function(o){ return [o.id, hmTen(o)+(hmToTen(o) ? ' · '+hmToTen(o) : '')]; })))); }
  if(/^(01uq|01td|03td)$/.test(M.k)){
    h += '<div class="sl-phu">Chưa có hộ trong 03/TD → chọn hộ ở <a href="#" onclick="event.preventDefault();hsoChonMau(\'sohv\')">📒 Sổ hộ vay</a> (📄 Lập HS) hoặc tích tổ viên dưới đây; trống = mẫu trắng.</div>';   /* 3.246: bỏ lối "📁 Bộ hồ sơ vay" cũ */
    if(B && (M.k==='01td' || M.k==='03td')){ var C1 = hsoCTV(B.ct) || {}, o1 = function(nhan, f, gt, ph){ return hsoTuyO(nhan, '<input value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph)+'" onchange="hsoBoDat(\''+f+'\',this.value,1)">'); };   /* 3.208: gõ thì in, trống thì chấm; 01/TD ↔ 03/TD cùng 1 số */
      h += o1('Thời hạn xin vay (tháng)', 'th', B.th, C1.thIn==='in' && C1.th ? 'trống = ghi sẵn '+C1.th : 'trống = chấm')+(M.k==='01td' ? o1('Hạn trả nợ cuối cùng', 'hanCuoi', hsoNgayVN(B.hanCuoi), 'dd/mm/yyyy — trống = chấm') : ''); }
    if(M.k==='03td'){ h += hsoNgayTuy('Ngày họp bình xét');
      if(!B && t){ if(!V.chon) V.chon = {}; h += '<details class="hso-tick" open><summary>👥 Tổ viên đề nghị vay — <b id="hso-dem-vay">'+Object.keys(V.chon).filter(function(k){ return V.chon[k]; }).length+'</b>/'+tv.length+'</summary><div class="hso-tick-ds">'+
        tv.map(function(k){ return '<label><input type="checkbox"'+(V.chon[k.kh] ? ' checked' : '')+' onchange="hsoTick(\'vay\',\''+k.kh+'\',this.checked)"> '+coChuHTML(k.ten)+'</label>'; }).join('')+'</div></details>'; }
      h += hsoKBRieng('03td'); }   /* 3.222: cuối cột trái */
    return h;
  }
  if(M.k==='01tgtv'){
    h += tgCotHTML(t, B);   /* 3.315: 3 nguồn — Mẫu 31 · Sổ hộ vay · ✍ tự khai trên mẫu (js/54) */
    return h+hsoKBRieng('01tgtv');   /* 3.219 · 3.222: cuối cột trái */
  }
  if(M.k==='01tdck'){   /* 3.206: người đề nghị = tổ viên đang chọn (chung lựa chọn với 09A) */
    h += hsoTuyO('Người đề nghị', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';hsoVe()', HSO.vay.kh||'', [['', t ? '— chọn tổ viên ('+tv.length+') —' : '— chọn tổ trước —']].concat(tv.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      hsoKBRieng('01tdck', {});   /* 3.222: cùng khung với các mẫu */
  }
  if(M.k==='06a'){   /* 3.430: mỗi món 1 phiếu — chọn người vay + món (như 09A) */
    var mon6 = hsoMonGH(t), ds6 = tv.filter(function(k){ return k.mon.some(function(m){ return (m.dn||0)>0; }); });
    h += hsoTuyO('Người vay', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';hsoVe()', V.kh||'', [['', t ? '— chọn tổ viên ('+ds6.length+') —' : '— chọn tổ trước —']].concat(ds6.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      (mon6.length ? hsoTuyO('Món vay', hsoChon('HSO.vay.ku=this.value;hsoVe()', V.ku || mon6[0].ku, mon6.map(function(m){ return [m.ku, m.ku+' · '+ctNgan(m.ct, m)+' · '+tdnTien(m.dn)+' đ']; }))) : '')+
      '<div class="hso-cham"><small>Mỗi món 1 phiếu (anh chốt 01/11). Số tiền nợ lãi = lãi tồn tất cả (Lãi tồn TH + QH). Phần thực tế, sử dụng vốn, ý kiến ghi tay tại nhà khách.</small></div>';
  }
  if(M.k==='09a'){
    var mon = hsoMonGH(t), ds9 = tv.filter(function(k){ return k.mon.some(function(m){ return (m.dn||0)>0; }); });
    h += hsoTuyO('Người vay', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';delete HSO.vay.tienGH;hsoVe()', V.kh||'', [['', t ? '— chọn tổ viên ('+ds9.length+') —' : '— chọn tổ trước —']].concat(ds9.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; }))))+
      (mon.length ? hsoTuyO('Món vay', hsoChon('HSO.vay.ku=this.value;delete HSO.vay.tienGH;hsoVe()', V.ku || mon[0].ku, mon.map(function(m){ return [m.ku, m.ku+' · '+ctNgan(m.ct, m)+' · '+tdnTien(m.dn)+' đ · ĐH '+ngayVNsl(skHL(m))]; })))+
        '' : '')+
      '<div class="hso-cham"><label class="hso-o2"><input type="checkbox"'+(hsoLuu().kemTDCK ? ' checked' : '')+' onchange="hsoLuu().kemTDCK=this.checked;luu();hsoVe()"> <b>In kèm 01/TĐCK</b> (giấy đề nghị thay đổi mẫu chữ ký giao dịch) — cùng trang in / file Word</label>'+
        (hsoLuu().kemTDCK ? hsoKBRieng('01tdck', {}) : '')+'</div>'+
      '<div class="hso-cham"><label class="hso-o2"><input type="checkbox"'+(hsoLuu().kem06 ? ' checked' : '')+' onchange="hsoLuu().kem06=this.checked;luu();hsoVe()"> <b>In kèm Mẫu 06/TD</b> (phiếu kiểm tra sử dụng vốn) — điền sẵn hộ vay, Hội quản lý; cán bộ kiểm tra để trống</label>'+
        (hsoLuu().kem06 ? '<div class="hso-cham-o"><span class="hso-cham-nhan">Mẫu 06/TD — cột Mục đích</span><span class="hso-sw"><button class="'+(hsoLuu().md06==='in' ? '' : 'bat')+'" onclick="hsoLuu().md06=\'cham\';luu();hsoVe()" title="Để trống — ghi tay">✍</button><button class="'+(hsoLuu().md06==='in' ? 'bat' : '')+'" onclick="hsoLuu().md06=\'in\';luu();hsoVe()" title="In sẵn ngành kinh tế theo Mẫu 31">🖨</button></span></div>' : '')+'</div>'+
      hsoKBRieng('09a', {tienGH:mon.length ? (mon.find(function(m){ return m.ku===V.ku; }) || mon[0]).dn : ''});   /* 3.206: ô chấm tùy biến · 3.215: ngày không tự lấy hôm nay */
  }
  return h;
}
