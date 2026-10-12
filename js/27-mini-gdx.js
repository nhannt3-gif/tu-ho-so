/* ===== 3.177 (anh chốt 13/10/2026): 📦 MINI APP Giao dịch xã — 1 file HTML gửi đồng nghiệp, có thời hạn =====
   - Nút "📦 Mini app" ở tab 🏢 Giao dịch xã → chọn hạn 30 / 60 / 90 ngày → tải về GiaoDichXa_mini_han-ddmmyyyy.html (chạy offline, không CDN, không mật khẩu).
   - Mini in 04/TD, 12/GDX theo điểm GD; Giấy lĩnh: gõ tay (TK 105), TK 104 chọn tổ trưởng → điền tên, TK 104, địa chỉ.
   - Số liệu gói kèm (CHỈ lúc xuất, trên máy anh — mã nguồn repo KHÔNG có số liệu): điểm GD (tên, mã, xã, ngày GD), tổ (tên tổ trưởng, ấp, TK 104),
     danh sách cán bộ, khai báo mẫu. KHÔNG gói số liệu khách TK 105 (anh chốt).
   - Số liệu xáo mã theo khóa riêng từng bản (mở bằng Notepad không đọc được). Không có mật khẩu nên đây là che, không phải mã hóa tuyệt đối.
   - Hết hạn → khóa hết (không giải mã số liệu, không in). Lùi giờ máy về trước ngày đã mở → khóa. Còn < 7 ngày → nhắc.
   - Mẫu in CHÉP từ chính hàm của app lúc xuất (Function.toString) → sửa mẫu ở app thì bản mini xuất sau tự theo, không có 2 bản mẫu. */

/* xáo / giải số liệu: dòng khóa xorshift128 sinh từ khóa (mỗi bản 1 khóa ngẫu nhiên + hạn + mã bản) */
function gdxMiniDong(khoa, n){
  var h = [0x811c9dc5, 0x5bd1e995, 0x9e3779b9, 0x85ebca6b], i, j;
  for(i = 0; i < khoa.length; i++){ var c = khoa.charCodeAt(i);
    for(j = 0; j < 4; j++){ h[j] = Math.imul(h[j] ^ c, 16777619 + j*2) >>> 0; h[j] = (h[j] ^ (h[j] >>> 13)) >>> 0; } }
  var x = h[0] || 1, y = h[1] || 2, z = h[2] || 3, w = h[3] || 4, out = new Uint8Array(n);
  for(i = 0; i < 64 + n; i++){ var t = (x ^ (x << 11)) >>> 0; x = y; y = z; z = w; w = (w ^ (w >>> 19) ^ (t ^ (t >>> 8))) >>> 0; if(i >= 64) out[i-64] = w & 255; }
  return out;
}
function gdxMiniMa(s, khoa){ var b = new TextEncoder().encode(s), k = gdxMiniDong(khoa, b.length), r = '';
  for(var i = 0; i < b.length; i++) r += String.fromCharCode(b[i] ^ k[i]); return btoa(r); }
function gdxMiniGiai(s, khoa){ var r = atob(s), k = gdxMiniDong(khoa, r.length), b = new Uint8Array(r.length);
  for(var i = 0; i < r.length; i++) b[i] = r.charCodeAt(i) ^ k[i]; return new TextDecoder().decode(b); }

/* ---------- gói số liệu (chỉ chạy trên máy anh lúc xuất) ---------- */
function gdxMiniGoi(){
  var C = gdxC(), c = {}, nTK = 0, nTo = 0, nCC = 0;
  Object.keys(C).forEach(function(k){ if(['nhanh', 'xem', 'form'].indexOf(k)<0) c[k] = JSON.parse(JSON.stringify(C[k]===undefined ? null : C[k])); });
  var diem = gdxDsDiem().map(function(d){
    return {k:d.k, ma:d.maDiem || '', ten:d.tenDiem || '', xa:d.tenXa || '', xaChu:gdxXaPhuong(d.tenXa), ngay:d.ngayGD || '',
      to:(d.to||[]).map(function(t){ var tc = dmtToCua(t.maTo) || {}, kt = typeof TO_K!=='undefined' && TO_K && TO_K.to ? TO_K.to[t.maTo] : null, kh = tc.ttKH || '';
        if(!kh && kt && typeof hsoTTKH==='function'){ try { kh = hsoTTKH(kt).kh || ''; } catch(e){} }
        var tk = tc.tk104 || gdxTK104Cua(kh) || '', dc = '';
        try { dc = ktDiaBan({tenThon:t.tenAp, tenXa:d.tenXa}); } catch(e){ dc = ''; }
        var nt = {}; if(kh && kt && typeof hsoKhach==='function'){ try { nt = hsoKhach(kh, kt) || {}; } catch(e){ nt = {}; } }   /* 3.178 (anh chốt): gói luôn CCCD · ngày cấp · nơi cấp tổ trưởng */
        nTo++; if(tk) nTK++; if(nt.cccd) nCC++;
        return {ma:t.maTo || '', ten:t.tenTo || tc.tt || '', ap:t.tenAp || '', tk:tk, dc:dc, cccd:nt.cccd || '', ncap:nt.ncap || '', noiCap:nt.noiCap || ''}; })};
  });
  return {C:c, diem:diem, nTo:nTo, nTK:nTK, nCC:nCC};
}
function gdxMiniHop(han){
  han = han || 30; var G = gdxMiniGoi(), het = new Date(nay()); het.setDate(het.getDate() + han);
  moHop('<div class="hop-tit">📦 Xuất mini app Giao dịch xã</div>'+
    '<div class="hop-phu">Tạo 1 file HTML gọn gửi đồng nghiệp: in <b>04/TD</b>, <b>12/GDX</b> theo điểm GD và <b>Giấy lĩnh</b> (TK 105 gõ tay, TK 104 chọn tổ trưởng). Chạy offline, không cần mật khẩu.</div>'+
    '<div class="gdx-mini-tom">Gói kèm: <b>'+G.diem.length+'</b> điểm GD · <b>'+G.nTo+'</b> tổ (tên tổ trưởng) · <b>'+G.nTK+'</b> TK 104 · <b>'+G.nCC+'</b> CCCD tổ trưởng (số, ngày cấp, nơi cấp) · <b>'+(G.C.danhSachCanBo||[]).length+'</b> cán bộ · khai báo mẫu. <b>Không</b> gói số liệu khách TK 105.</div>'+
    (G.diem.length ? '' : '<div class="sl-bao vang">Chưa có điểm GD — mở số liệu Mẫu 31 (hoặc Cài đặt › Địa bàn) trước khi xuất.</div>')+
    (G.nTo && !G.nTK ? '<div class="sl-bao vang">Chưa có TK 104 tổ trưởng — nạp danh mục ở 📥 Nạp &amp; KT nếu cần.</div>' : '')+
    '<div class="gdx-l1"><b>Thời hạn dùng:</b> '+[30, 60, 90].map(function(n){ return gdxChip(n+' ngày', n===han, 'gdxMiniHop('+n+')'); }).join('')+
    ' → dùng tới hết ngày <b>'+gdxDMY(ngayISO(het))+'</b></div>'+
    '<div class="sl-phu">Hết hạn file tự khóa hết (không mở được số liệu, không in). Lùi giờ máy cũng khóa. Số liệu trong file được xáo mã, mở bằng Notepad không đọc được '+
    '(không có mật khẩu nên chỉ là che — chỉ gửi người trong đơn vị).</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="gdxMiniXuat('+han+')"'+(G.diem.length ? '' : ' disabled')+'>📦 Xuất file</button></div>', true);
}
/* dựng file mini: hàm mẫu chép từ app (toString) + số liệu đã xáo + khung giao diện gdxMiniApp */
function gdxMiniHTML(han, G){
  G = G || gdxMiniGoi();
  var hom = nay(), het = new Date(hom.getFullYear(), hom.getMonth(), hom.getDate() + (han || 30)), hanISO = ngayISO(het);
  var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8), khoa = '';
  for(var i = 0; i < 24; i++) khoa += 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'.charAt(Math.floor(Math.random() * 56));
  var goi = gdxMiniMa(JSON.stringify({han:hanISO, id:id, xuat:ngayISO(hom), ban:APP_BAN, C:G.C, diem:G.diem}), khoa+'|'+hanISO+'|'+id);
  var bien = function(ten, v){ return 'var '+ten+' = '+JSON.stringify(v).replace(/<\//g, '<\\/')+';\n'; };
  var ham = [hai, ngayISO, ngayVN, nay, coChuHTML, boDau, gdxE, gdxDocTien, gdxTien, gdxSoNguoi, gdxNgay, gdxChipTien, gdxNgayToi, gdxNgayChu, gdxHom, gdxMai, gdxDMY,
    gdxNgayKy04, gdxHTML04, gdxHTML12, gdxTrang, gdxGLO, gdxGLNgayO, gdxGLTrang, gdxHTMLGL, gdxDocNgay, gdxMiniDong, gdxMiniGiai, gdxMiniApp];
  var js = bien('MINI_ID', id)+bien('MINI_HAN', hanISO)+bien('MINI_K', khoa)+bien('MINI_GOI', goi)+bien('MINI_BAN', APP_BAN)+
    bien('GDX_MD', GDX_MD)+bien('GDX_CSS', GDX_CSS)+bien('GL_CSS', GL_CSS)+bien('GL_CSS_A5', GL_CSS_A5)+bien('GL_CSS_A4', GL_CSS_A4)+bien('GL_JS', GL_JS)+
    ham.map(function(f){ return f.toString(); }).join('\n').replace(/<\/script/gi, '<\\/script')+'\ngdxMiniApp();\n';
  return {html:'<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<title>Giao dịch xã — bản mini</title><style>'+GDX_MINI_CSS+'</style></head><body><div id="mn-app"><div class="mn-mo">Đang mở…</div></div><script>\n'+js+'<\/script></body></html>',
    han:hanISO, id:id};
}
function gdxMiniXuat(han){
  var G = gdxMiniGoi(); if(!G.diem.length) return bao('Chưa có điểm GD để gói.');
  var M = gdxMiniHTML(han, G), ten = 'GiaoDichXa_mini_han-'+M.han.split('-').reverse().join('')+'.html';
  taiXuongBlob(new Blob([M.html], {type:'text/html;charset=utf-8'}), ten);
  dongHop(); bao('Đã xuất '+ten+' — dùng tới hết ngày '+gdxDMY(M.han)+'.', 6000);
}

/* ==========================================================
   KHUNG MINI APP — chỉ chạy TRONG file mini (gdxMiniApp được chép nguyên vào file lúc xuất). Không chạy trong app chính.
   Lưu lựa chọn trên máy người dùng (localStorage), không gửi đi đâu.
   ========================================================== */
function gdxMiniApp(){
  var LS_C = 'gdxmini_c', LS_T = 'gdxmini_t_'+MINI_ID, LS_MAX = 'gdxmini_max';
  var app = document.getElementById('mn-app'), hom = ngayISO(new Date());
  var doc = function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } };
  var ghi = function(k, v){ try { localStorage.setItem(k, v); } catch(e){} };
  function khoa(ly){
    app.innerHTML = '<div class="mn-khoa"><div class="mn-khoa-ic">🔒</div><h2>Bản mini đã khóa</h2><p>'+ly+'</p></div>';
    document.title = 'Giao dịch xã — đã khóa';
  }
  var hanVN = gdxDMY(MINI_HAN), hetHan = 'Bản này hết hạn ngày '+hanVN+', liên hệ anh Nhân để lấy bản mới.';
  /* 1. hạn + chống lùi giờ — kiểm TRƯỚC khi giải số liệu */
  if(doc(LS_T)==='het') return khoa(hetHan);
  if(hom > MINI_HAN){ ghi(LS_T, 'het'); return khoa(hetHan); }
  var max = doc(LS_MAX) || '';
  if(max && hom < max) return khoa('Ngày giờ trên máy ('+gdxDMY(hom)+') sớm hơn lần mở trước ('+gdxDMY(max)+'). Chỉnh lại ngày giờ máy cho đúng rồi mở lại. '+
    'Nếu đã hết hạn: '+hetHan);
  ghi(LS_MAX, hom);
  var P = null;
  try { P = JSON.parse(gdxMiniGiai(MINI_GOI, MINI_K+'|'+MINI_HAN+'|'+MINI_ID)); } catch(e){ P = null; }
  if(!P || P.han!==MINI_HAN || P.id!==MINI_ID) return khoa('File bị sửa hoặc hỏng — liên hệ anh Nhân để lấy bản mới.');
  var conNgay = Math.round((new Date(MINI_HAN+'T00:00:00') - new Date(hom+'T00:00:00')) / 864e5) + 1;

  /* 2. khai báo: mặc định từ app lúc xuất + lựa chọn đã lưu trên máy này */
  var C = JSON.parse(JSON.stringify(GDX_MD));
  Object.keys(P.C||{}).forEach(function(k){ C[k] = P.C[k]; });
  var luuC = {}; try { luuC = JSON.parse(doc(LS_C) || '{}') || {}; } catch(e){ luuC = {}; }
  var GIU = ['mau', 'diem', 'soNguoi', 'soTien', 'isGQVL', 'noiGN', 'gioPhatTien', 'kyPGD', 'nguoiLap', 'soBan', 'm12GDV', 'm12KSV', 'm12ToTruong', 'm12NumRows', 'm12TenToOption',
    'm12GioHuy', 'm12NgayHuy', 'm12SoLuongTieuHuy', 'glLoai', 'timPham', 'glChim', 'glKho', 'glNgayCach', 'glND', 'glTKNo', 'glMaNH', 'glPGD', 'glTaiNH'];
  GIU.forEach(function(k){ if(luuC[k]!==undefined) C[k] = luuC[k]; });
  var S = {ngayKy:'', ngayPhat:'', ngay12:'', glNgayTay:'', g:{}, q:'', qi:0, daIn:false};   /* lần mở này (không lưu) */
  function luu(){ var o = {}; GIU.forEach(function(k){ o[k] = C[k]; }); ghi(LS_C, JSON.stringify(o)); }
  var DS = P.diem || [];
  function diem(k){ for(var i = 0; i < DS.length; i++) if(DS[i].k===k) return DS[i]; return null; }
  function ganNhat(){ var b = null; DS.forEach(function(d){ var n = gdxNgayToi(d.ngay, 1)[0]; if(n && (!b || n < b.n)) b = {d:d, n:n}; }); return b ? b.d : DS[0]; }
  if(!diem(C.diem)){ var g0 = ganNhat(); C.diem = g0 ? g0.k : ''; }
  if(['m04', 'm12', 'gl'].indexOf(C.mau)<0) C.mau = 'm04';
  var E = gdxE, J = function(v){ return JSON.stringify(v).replace(/"/g, '&quot;'); };
  function chip(chu, bat, js, tit){ return '<button class="mn-c'+(bat ? ' bat' : '')+'" onclick="'+js+'"'+(tit ? ' title="'+E(tit)+'"' : '')+'>'+chu+'</button>'; }
  function dat(k, v, ve){ C[k] = v; luu(); if(ve) veTrai(); xem(); }
  function ngayO(js, gt){   /* ô ngày gõ nhanh (1410 · 141026) + 📅 lịch */
    return '<span class="mn-ngay"><input class="mn-i mn-ng" inputmode="numeric" placeholder="gõ 1410 · 141026" value="'+E(gt ? gdxDMY(gt) : '')+'" onkeydown="if(event.key===\'Enter\'){event.preventDefault();this.blur();}" '+
      'onchange="var v=gdxDocNgay(this.value);if(this.value.trim()&&!v){alert(\'Không hiểu ngày — gõ vd 1410 hoặc 141026\');return;}'+js+'(v)">'+
      '<input type="date" class="mn-lich" value="'+E(gt||'')+'" onchange="'+js+'(this.value)" title="📅 chọn trên lịch"></span>';
  }
  function cb(k, trong, bo){ var v = C[k] || '';
    return '<select class="mn-i" onchange="mn.dat(\''+k+'\', this.value, 1)"><option value="">— '+trong+' —</option>'+
      (C.danhSachCanBo||[]).filter(function(n){ return n===v || (bo||[]).indexOf(n)<0; }).map(function(n){ return '<option'+(n===v ? ' selected' : '')+'>'+E(n)+'</option>'; }).join('')+'</select>'; }
  function hang(nhan, gt){ return '<div class="mn-hang"><div class="mn-nh">'+nhan+'</div><div class="mn-gt">'+gt+'</div></div>'; }
  function buoc(fn, b){ return '<span class="mn-buoc"><button onclick="'+fn+'('+b+')">▲</button><button onclick="'+fn+'(-'+b+')">▼</button></span>'; }
  function tron(v, b){ var bb = Math.abs(b); v = v % bb ? (b > 0 ? Math.ceil(v/bb)*bb : Math.floor(v/bb)*bb) : v + b; return Math.max(0, v); }

  /* 3. dựng mẫu (cùng cách app chính chụp lựa chọn) */
  function ngayPhat(){ var d = diem(C.diem); if(S.ngayPhat) return S.ngayPhat; if(C.noiGN==='pgd') return gdxMai(); return d ? (gdxNgayToi(d.ngay, 1)[0] || '') : ''; }
  function ngay12(){ var d = diem(C.diem); return S.ngay12 || (d ? (gdxNgayToi(d.ngay, 1)[0] || '') : ''); }
  function glNgay(){ var c = C.glNgayCach || 'gd', d = diem(C.diem);
    if(c==='hom') return gdxHom(); if(c==='cham') return ''; if(c==='tay') return S.glNgayTay || ''; return d ? (gdxNgayToi(d.ngay, 1)[0] || '') : ''; }
  function dung(mau, trang){
    var c = JSON.parse(JSON.stringify(C)), d = diem(C.diem);
    if(mau==='m12'){ c.m12NgayGD = ngay12(); var d0 = d ? {tenDiem:d.ten, maDiem:d.ma, tenXa:d.xa, to:d.to.map(function(t){ return {tenTo:t.ten}; })} : {tenDiem:'', maDiem:'', tenXa:'', to:[]};
      return {than:gdxHTML12(c, d0), css:GDX_CSS}; }
    if(mau==='gl'){ if(trang){ c.glKho = trang===2 ? 'a4x2' : 'a4'; c.glTrang = true; return {than:gdxHTMLGL({}, c), css:GL_CSS+GL_CSS_A4}; }
      var g = {}; Object.keys(S.g).forEach(function(k){ g[k] = S.g[k]; }); g.ngay = glNgay(); g.ncap = gdxDocNgay(S.g.ncap) || ''; g.tien = String(S.g.tien||'').replace(/\D/g, '');
      return {than:gdxHTMLGL(g, c), css:GL_CSS+(c.glKho==='a4' ? GL_CSS_A4 : GL_CSS_A5)}; }
    var xa = d ? d.xaChu : '';
    if(xa){ c.kinhGui = 'Ủy ban nhân dân '+xa; c.tenUBNDVietTat = 'Ủy ban nhân dân '+xa; }
    c.diaDiemPhatTien = C.noiGN==='pgd' ? (C.diaDiemPGD || GDX_MD.diaDiemPGD) : (d ? 'Điểm giao dịch '+d.ten+' ('+xa+')' : '');
    c.ngayThongBao = S.ngayKy || gdxHom(); c.ky04Hom = false;
    var np = ngayPhat(); c.ngayPhatTien = np ? gdxNgayChu(np) : 'ngày …… tháng …… năm ………';
    var m = '<div class="sheet-a4">'+gdxHTML04({soNguoi:C.soNguoi || 1, soTien:C.soTien || ''}, c)+'</div>';
    return {than:+C.soBan===1 ? m : m+m, css:GDX_CSS};
  }
  function xem(){
    var f = document.getElementById('mn-khung'); if(!f) return;
    var B = dung(C.mau), d = f.contentDocument; d.open(); d.write(gdxTrang(B.than, B.css)); d.close();
    var w = f.clientWidth || 800, z = Math.min(1, Math.max(0.3, (w - 52) / 800));
    var st = d.createElement('style'); st.textContent = '@media screen{.sheet-a4,.sheet-gl{zoom:'+z+'}.preview-stage{padding:12px}}'; d.head.appendChild(st);
  }
  function inBan(B){
    var f = document.getElementById('mn-in'); if(f) f.parentNode.removeChild(f);
    f = document.createElement('iframe'); f.id = 'mn-in'; f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(f); var d = f.contentDocument; d.open(); d.write(gdxTrang(B.than, B.css)); d.close();
    setTimeout(function(){ try { f.contentWindow.focus(); f.contentWindow.print(); } catch(e){ alert('Không in được: '+e.message); } }, 250);
  }

  /* 4. giao diện */
  function chonDiemHTML(){
    var xa = {}, thu = [];
    DS.forEach(function(d){ if(!xa[d.xa]){ xa[d.xa] = []; thu.push(d.xa); } xa[d.xa].push(d); });
    var d = diem(C.diem);
    return '<div class="mn-diem"><select class="mn-i" onchange="mn.chonDiem(this.value)">'+thu.map(function(x){ return '<optgroup label="'+E(x)+'">'+xa[x].map(function(o){
        var n = gdxNgayToi(o.ngay, 1)[0]; return '<option value="'+E(o.k)+'"'+(o.k===C.diem ? ' selected' : '')+'>'+E(o.ten)+(o.ngay ? ' · GD ngày '+E(o.ngay)+(n===hom ? ' (hôm nay)' : '') : '')+'</option>'; }).join('')+'</optgroup>'; }).join('')+'</select>'+
      chip('⏱ Gần nhất', false, 'mn.ganNhat()', 'Điểm có ngày GD gần nhất (hôm nay trước)')+'</div>'+
      (d ? '<div class="mn-dong">📍 <b>'+E(d.ten)+'</b>'+(d.ma ? ' · mã '+E(d.ma) : '')+' · '+E(d.xa)+(d.ngay ? ' · GD ngày '+E(d.ngay)+' hằng tháng' : ' · <span class="mn-vang">chưa có ngày GD</span>')+'</div>' : '');
  }
  function m04HTML(){
    var tien = +String(C.soTien||'').replace(/\D/g, '') || 0, np = ngayPhat();
    return hang('Số hộ', '<input id="mn-ho04" class="mn-i mn-so" inputmode="numeric" value="'+E(C.soNguoi)+'" oninput="mn.dat(\'soNguoi\', this.value.replace(/\\D/g, \'\'))" onkeydown="mn.phim(event, \'soNguoi\', 1)">'+buoc('mn.buoc04ho', 1)+
        '<label class="mn-cb"><input type="checkbox"'+(C.isGQVL ? ' checked' : '')+' onchange="mn.dat(\'isGQVL\', this.checked)"> GQVL (người lao động)</label>')+
      hang('Số tiền', '<input id="mn-tien04" class="mn-i mn-tien" inputmode="numeric" value="'+E(gdxTien(C.soTien))+'" oninput="this.value=gdxTien(this.value);mn.dat(\'soTien\', this.value);mn.chu04()" onkeydown="mn.phim(event, \'soTien\', 5000000)">'+buoc('mn.buoc04tien', 5000000)+
        '<div class="mn-chips">'+(C.quickAmounts||[]).map(function(a){ return chip(gdxChipTien(a), tien===+a, 'mn.dat(\'soTien\', \''+gdxTien(a)+'\', 1)'); }).join('')+'</div>'+
        '<div class="mn-chu" id="mn-chu04">'+E(tien ? gdxDocTien(tien) : '—')+'</div>')+
      ((C.mauHay||[]).length ? hang('⭐ Mẫu hay in', '<div class="mn-chips">'+C.mauHay.map(function(m, i){ return chip(E(m.h+' hộ · '+gdxChipTien(m.t)), false, 'mn.mauHay('+i+')'); }).join('')+'</div>') : '')+
      hang('Nơi phát', chip('Tại điểm GD', C.noiGN!=='pgd', 'mn.dat(\'noiGN\', \'diem\', 1)')+chip('Tại PGD', C.noiGN==='pgd', 'mn.dat(\'noiGN\', \'pgd\', 1)'))+
      hang('Ngày phát', '<b class="mn-hien">'+(np ? gdxDMY(np) : 'để chấm')+'</b> '+(S.ngayPhat ? chip('↺ Mặc định', false, 'mn.datS(\'ngayPhat\', \'\')') : '<small>(mặc định '+(C.noiGN==='pgd' ? 'ngày mai' : 'ngày GD gần nhất')+')</small>')+ngayO('mn.ngayPhat', S.ngayPhat))+
      hang('Giờ phát', '<input class="mn-i" value="'+E(C.gioPhatTien)+'" oninput="mn.dat(\'gioPhatTien\', this.value)">')+
      hang('Ngày ký', chip('Hôm nay', !S.ngayKy, 'mn.datS(\'ngayKy\', \'\')')+ngayO('mn.ngayKy', S.ngayKy))+
      hang('Người lập', cb('nguoiLap', 'để trắng'))+
      hang('Ký duyệt', chip('Giám đốc', !C.kyPGD, 'mn.dat(\'kyPGD\', false, 1)')+chip('Phó Giám đốc (KT.)', !!C.kyPGD, 'mn.dat(\'kyPGD\', true, 1)'))+
      hang('Số bản', chip('2 bản', +C.soBan!==1, 'mn.dat(\'soBan\', 2, 1)')+chip('1 bản', +C.soBan===1, 'mn.dat(\'soBan\', 1, 1)'));
  }
  function m12HTML(){
    var d = diem(C.diem), n = ngay12();
    return hang('Ngày GD', '<b class="mn-hien">'+(n ? gdxDMY(n) : 'để chấm')+'</b> '+(S.ngay12 ? chip('↺ Ngày GD gần nhất', false, 'mn.datS(\'ngay12\', \'\')') : '')+ngayO('mn.ngay12', S.ngay12))+
      hang('Giao dịch viên', cb('m12GDV', 'để chấm', [C.m12KSV, C.m12ToTruong]))+
      hang('KSV / GDV', cb('m12KSV', 'để trắng', [C.m12GDV, C.m12ToTruong]))+
      hang('Tổ trưởng tổ GD', cb('m12ToTruong', 'để trắng', [C.m12GDV, C.m12KSV]))+
      hang('Số dòng', '<input class="mn-i mn-so" type="number" min="5" max="45" value="'+E(C.m12NumRows)+'" onchange="mn.dat(\'m12NumRows\', +this.value||12, 1)">'+
        (d && d.to.length ? chip('= số tổ ('+d.to.length+')', +C.m12NumRows===d.to.length, 'mn.dat(\'m12NumRows\', '+Math.max(5, d.to.length)+', 1)') : ''))+
      hang('Tên tổ trưởng', chip('Để trắng', C.m12TenToOption!=='fill', 'mn.dat(\'m12TenToOption\', \'blank\', 1)')+chip('In sẵn', C.m12TenToOption==='fill', 'mn.dat(\'m12TenToOption\', \'fill\', 1)'))+
      hang('Giờ tiêu hủy', chip('Để chấm', C.m12GioHuy!=='san', 'mn.dat(\'m12GioHuy\', \'cham\', 1)')+chip(E(C.m12PrefillGio || '11 giờ 30 phút'), C.m12GioHuy==='san', 'mn.dat(\'m12GioHuy\', \'san\', 1)'))+
      hang('Ngày tiêu hủy', chip('Để chấm', C.m12NgayHuy!=='gd', 'mn.dat(\'m12NgayHuy\', \'cham\', 1)')+chip('= Ngày GD', C.m12NgayHuy==='gd', 'mn.dat(\'m12NgayHuy\', \'gd\', 1)'))+
      hang('Số BL tiêu hủy', '<input class="mn-i" value="'+E(C.m12SoLuongTieuHuy)+'" placeholder="trống = chấm" oninput="mn.dat(\'m12SoLuongTieuHuy\', this.value)">');
  }
  var GLO = [['ten', 'Họ, tên khách hàng', 4], ['cccd', 'CMT / CCCD số', 2], ['diaChi', 'Địa chỉ', 6], ['ncap', 'Ngày cấp', 2], ['noiCap', 'Nơi cấp', 2], ['tk', 'Tài khoản số', 2]];
  function glHTML(){
    var d = diem(C.diem), n = glNgay(), c = C.glNgayCach || 'gd', tien = String(S.g.tien||'').replace(/\D/g, '');
    var h = hang('Loại', chip('TK 105 khách (gõ tay)', C.glLoai!=='104', 'mn.glLoai(\'105\')')+chip('TK 104 tổ trưởng', C.glLoai==='104', 'mn.glLoai(\'104\')'));
    if(C.glLoai==='104') h += hang('Tổ trưởng', '<div class="mn-tim"><input id="mn-q" class="mn-i" autocomplete="off" placeholder="🔎 Gõ tên tổ trưởng (không dấu) · ↑↓ Enter" value="'+E(S.q)+'" oninput="mn.tim(this.value)" onkeydown="mn.phimTim(event)"><div id="mn-gy" class="mn-gy"></div></div>'+
      '<span class="mn-pham">Tìm trong: '+[['diem', 'Điểm này'], ['xa', 'Cả xã'], ['tat', 'Cả PGD']].map(function(o){ return chip(o[1], phamTim().p===o[0], 'mn.pham(\''+o[0]+'\')'); }).join('')+'</span>'+
      (d ? '<select class="mn-i" onchange="if(this.value)mn.chonTT(this.value)"><option value="">— Tổ của điểm '+E(d.ten)+' ('+d.to.length+') —</option>'+d.to.map(function(t){ return '<option value="'+E(d.k+'|'+t.ma)+'">'+E((t.ten || t.ma)+(t.ap ? ' · '+t.ap : '')+(t.tk ? '' : ' · chưa có TK 104'))+'</option>'; }).join('')+'</select>' : ''));
    h += '<div class="mn-form">'+GLO.map(function(o){ return '<label class="mn-c'+o[2]+'"><span>'+o[1]+'</span><input class="mn-i" data-k="'+o[0]+'" value="'+E(S.g[o[0]]||'')+'" placeholder="'+(o[0]==='ncap' ? 'gõ 230421' : 'trống = chấm')+'" oninput="mn.glSua(this)"></label>'; }).join('')+'</div>';
    h += hang('Số tiền', '<input id="mn-tiengl" class="mn-i mn-tien" inputmode="numeric" value="'+E(gdxTien(tien))+'" placeholder="trống = chấm" oninput="this.value=gdxTien(this.value);mn.glTien(this.value)" onkeydown="if(event.key===\'ArrowUp\'||event.key===\'ArrowDown\'){event.preventDefault();mn.glBuoc(event.key===\'ArrowUp\'?100000:-100000);}">'+buoc('mn.glBuoc', 100000)+
      '<div class="mn-chips">'+(C.glMuc||[]).map(function(a){ return chip(gdxChipTien(a), String(a)===tien, 'mn.glTien(\''+a+'\', 1)'); }).join('')+'</div><div class="mn-chu" id="mn-chugl">'+E(tien ? gdxDocTien(tien) : '—')+'</div>');
    h += hang('Ngày lĩnh', chip('Ngày GD điểm ★', c==='gd', 'mn.dat(\'glNgayCach\', \'gd\', 1)')+chip('Hôm nay', c==='hom', 'mn.dat(\'glNgayCach\', \'hom\', 1)')+ngayO('mn.glNgayTay', c==='tay' ? S.glNgayTay : '')+
      chip('Để chấm', c==='cham', 'mn.dat(\'glNgayCach\', \'cham\', 1)')+' <b class="mn-hien">→ '+(n ? gdxDMY(n) : 'để chấm')+'</b>');
    h += hang('Nội dung', '<input class="mn-i" value="'+E(C.glND)+'" oninput="mn.dat(\'glND\', this.value)">');
    h += hang('Chữ chìm VBSP', [['tat', 'Tắt'], ['nhat', 'Nhạt'], ['vua', 'Vừa'], ['dam', 'Đậm']].map(function(o){ return chip(o[1], (C.glChim || 'nhat')===o[0], 'mn.dat(\'glChim\', \''+o[0]+'\', 1)'); }).join('')+'<small> phiếu trắng in mức Vừa</small>');
    h += hang('Khổ giấy', chip('A5 ngang', C.glKho!=='a4', 'mn.dat(\'glKho\', \'a5\', 1)')+chip('A4 dọc · nửa trên', C.glKho==='a4', 'mn.dat(\'glKho\', \'a4\', 1)'));
    h += hang('Mẫu trắng', chip('🖨 1 mẫu / A4', false, 'mn.inTrang(1)')+chip('🖨 2 mẫu / A4 (cắt đôi)', false, 'mn.inTrang(2)'));
    return h;
  }
  function veTrai(){
    var t = document.getElementById('mn-trai'); if(!t) return;
    var y = t.scrollTop, M = {m04:m04HTML, m12:m12HTML, gl:glHTML}[C.mau];
    t.innerHTML = '<div class="mn-mau">'+chip('📢 04/TD', C.mau==='m04', 'mn.mau(\'m04\')', 'Thông báo kết quả phê duyệt cho vay')+chip('📋 12/GDX', C.mau==='m12', 'mn.mau(\'m12\')', 'Bảng kê giao, nhận, tiêu hủy biên lai')+
      chip('💵 Giấy lĩnh', C.mau==='gl', 'mn.mau(\'gl\')', 'Giấy lĩnh tiền mặt')+'</div>'+chonDiemHTML()+'<div class="mn-ruot">'+M()+'</div>'+
      '<div class="mn-in">'+(C.mau==='gl' ? '<button class="mn-nut'+(S.daIn ? ' moi' : '')+'" onclick="mn.lamTrong()">✕ Làm trống'+(S.daIn ? ' — in người khác' : '')+'</button>' : '')+'<button class="mn-nut chinh" onclick="mn.inNgay()">🖨 IN'+(C.mau==='m04' && +C.soBan!==1 ? ' 2 bản' : '')+'</button></div>';
    t.scrollTop = y;
  }
  function ve(){
    app.innerHTML = '<div class="mn-dau"><b>🏢 Giao dịch xã</b> <span class="mn-phu">bản mini · '+E((C.donViDuoi || '')+'')+'</span>'+
      '<span class="mn-han'+(conNgay <= 7 ? ' gan' : '')+'">Dùng tới ngày '+hanVN+(conNgay <= 7 ? ' — còn '+conNgay+' ngày, liên hệ anh Nhân để lấy bản mới' : '')+'</span></div>'+
      '<div class="mn-bo"><div class="mn-trai" id="mn-trai"></div><div class="mn-xem"><iframe id="mn-khung" title="Xem trước"></iframe></div></div>';
    veTrai(); xem();
  }
  /* 5. thao tác (gọi từ nút) */
  function chuTien(id, v){ var e = document.getElementById(id); if(e) e.textContent = v ? gdxDocTien(v) : '—'; }
  function phamTim(){ var d = diem(C.diem), p = C.timPham || 'diem';   /* 3.178 (anh chốt): tìm gọn trong điểm / xã đang chọn */
    return !d || p==='tat' ? {p:'tat', chu:'cả PGD'} : p==='xa' ? {p:'xa', xa:d.xa, chu:d.xa} : {p:'diem', k:d.k, chu:'điểm '+d.ten}; }
  function timKQ(q){
    q = boDau(q).replace(/[^a-z0-9]+/g, ' ').trim(); if(q.length < 2) return [];
    var tu = q.split(' '), kq = [], P = phamTim();
    DS.forEach(function(d){ if((P.p==='diem' && d.k!==P.k) || (P.p==='xa' && d.xa!==P.xa)) return; d.to.forEach(function(t){ var s = ' '+boDau([t.ten, t.ma, t.ap].join(' ')).replace(/[^a-z0-9]+/g, ' ');
      if(tu.every(function(w){ return s.indexOf(w)>=0; })) kq.push({k:d.k+'|'+t.ma, ten:t.ten || t.ma, phu:[t.ap, d.ten, d.xa].filter(Boolean).join(' · ')+(t.tk ? '' : ' · chưa có TK 104')}); }); });
    return kq.slice(0, 10);
  }
  window.mn = {
    dat:dat,
    datS:function(k, v){ S[k] = v; veTrai(); xem(); },
    mau:function(m){ C.mau = m; luu(); veTrai(); xem(); },
    chonDiem:function(k){ C.diem = k; S.ngay12 = ''; S.ngayPhat = ''; luu(); veTrai(); xem(); },
    ganNhat:function(){ var g = ganNhat(); if(g) window.mn.chonDiem(g.k); },
    ngayPhat:function(v){ S.ngayPhat = v || ''; veTrai(); xem(); },
    ngayKy:function(v){ S.ngayKy = v || ''; veTrai(); xem(); },
    ngay12:function(v){ S.ngay12 = v || ''; veTrai(); xem(); },
    glNgayTay:function(v){ S.glNgayTay = v || ''; C.glNgayCach = v ? 'tay' : 'gd'; luu(); veTrai(); xem(); },
    buoc04ho:function(b){ C.soNguoi = String(Math.max(1, (+C.soNguoi || 0) + b)); luu(); veTrai(); xem(); },
    buoc04tien:function(b){ C.soTien = gdxTien(tron(+String(C.soTien||'').replace(/\D/g, '') || 0, b)); luu(); veTrai(); xem(); },
    phim:function(ev, k, b){ if(ev.key!=='ArrowUp' && ev.key!=='ArrowDown') return; ev.preventDefault(); var s = ev.key==='ArrowUp' ? b : -b;
      if(k==='soNguoi') window.mn.buoc04ho(s); else window.mn.buoc04tien(s); var e = document.getElementById(k==='soNguoi' ? 'mn-ho04' : 'mn-tien04'); if(e) e.focus(); },
    chu04:function(){ chuTien('mn-chu04', String(C.soTien||'').replace(/\D/g, '')); },
    mauHay:function(i){ var m = C.mauHay[i]; if(!m) return; C.soNguoi = String(m.h); C.soTien = gdxTien(m.t); luu(); veTrai(); xem(); },
    glLoai:function(l){ C.glLoai = l; S.q = ''; luu(); veTrai(); xem(); },
    glSua:function(o){ S.g[o.getAttribute('data-k')] = o.value; xem(); },
    glTien:function(v, ve){ S.g.tien = String(v||'').replace(/\D/g, ''); if(ve) veTrai(); else chuTien('mn-chugl', S.g.tien); xem(); },
    glBuoc:function(b){ S.g.tien = String(tron(+String(S.g.tien||'').replace(/\D/g, '') || 0, b) || ''); if(S.g.tien==='0') S.g.tien = '';
      var e = document.getElementById('mn-tiengl'); if(e) e.value = gdxTien(S.g.tien); chuTien('mn-chugl', S.g.tien); xem(); },
    tim:function(q){ S.q = q; var g = document.getElementById('mn-gy'), kq = timKQ(q); S.qi = 0; if(!g) return;
      g.innerHTML = kq.length ? kq.map(function(x, i){ return '<button'+(i===0 ? ' class="bat"' : '')+' onclick="mn.chonTT('+J(x.k)+')"><b>'+E(x.ten)+'</b> <small>'+E(x.phu)+'</small></button>'; }).join('')
        : (q.trim().length>=2 ? '<div class="mn-rong">Không thấy “'+E(q)+'” trong '+E(phamTim().chu)+(phamTim().p!=='tat' ? ' — <a href="#" onclick="mn.pham(\'tat\');return false">tìm cả PGD</a>' : '')+'.</div>' : ''); },
    pham:function(p){ C.timPham = p; luu(); veTrai(); var q = document.getElementById('mn-q'); if(q){ q.focus(); if(S.q) window.mn.tim(S.q); } },
    phimTim:function(ev){ var ds = document.querySelectorAll('#mn-gy button'); if(!ds.length) return; var i = S.qi || 0;
      if(ev.key==='ArrowDown' || ev.key==='ArrowUp'){ ev.preventDefault(); i = (i + (ev.key==='ArrowDown' ? 1 : -1) + ds.length) % ds.length; S.qi = i;
        Array.prototype.forEach.call(ds, function(b, k){ b.classList.toggle('bat', k===i); }); }
      else if(ev.key==='Enter'){ ev.preventDefault(); (ds[i] || ds[0]).click(); }
      else if(ev.key==='Escape'){ window.mn.tim(''); ev.target.value = ''; } },
    chonTT:function(k){ var p = String(k).split('|'), d = diem(p[0]), t = null; if(!d) return;
      d.to.forEach(function(o){ if(o.ma===p.slice(1).join('|')) t = o; }); if(!t) return;
      C.diem = d.k; luu(); S.q = ''; var nc = String(t.ncap || ''); if(/^\d{4}-\d{2}-\d{2}/.test(nc)) nc = gdxDMY(nc.slice(0, 10));
      S.g = {ten:t.ten || '', tk:t.tk || '', diaChi:t.dc || '', cccd:t.cccd || '', ncap:nc, noiCap:t.noiCap || '', tien:''};
      veTrai(); xem(); var e = document.getElementById('mn-tiengl'); if(e) e.focus(); },
    lamTrong:function(){ S.g = {}; S.q = ''; S.daIn = false; veTrai(); xem(); var e = document.getElementById('mn-q') || document.querySelector('.mn-form input'); if(e) e.focus(); },
    inNgay:function(){ inBan(dung(C.mau)); if(C.mau==='gl'){ S.daIn = true; veTrai(); } },
    inTrang:function(n){ inBan(dung('gl', n)); }
  };
  window.addEventListener('resize', function(){ clearTimeout(window.__mnVua); window.__mnVua = setTimeout(xem, 150); });
  ve();
}

/* giao diện file mini (không dùng CSS của app) */
var GDX_MINI_CSS = '*{box-sizing:border-box}body{margin:0;font-family:-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:14px;color:#263238;background:#eceff1}'+
  '.mn-mo{padding:40px;text-align:center;color:#607d8b}'+
  '.mn-dau{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:8px 14px;background:#1565c0;color:#fff}.mn-dau b{font-size:16px}.mn-phu{opacity:.85}'+
  '.mn-han{margin-left:auto;background:rgba(255,255,255,.18);border-radius:12px;padding:2px 10px;font-size:13px}.mn-han.gan{background:#ffca28;color:#4e342e;font-weight:bold}'+
  '.mn-bo{display:grid;grid-template-columns:minmax(340px,46%) 1fr;gap:10px;padding:10px;height:calc(100vh - 44px)}'+
  '.mn-trai{background:#fff;border-radius:8px;padding:10px 12px;overflow:auto;display:flex;flex-direction:column;gap:6px}'+
  '.mn-xem{background:#455a64;border-radius:8px;overflow:hidden}.mn-xem iframe{width:100%;height:100%;border:0;display:block}'+
  '.mn-mau,.mn-diem,.mn-chips{display:flex;flex-wrap:wrap;gap:5px;align-items:center}.mn-diem select{flex:1;min-width:180px}'+
  '.mn-dong{font-size:13px;color:#37474f;background:#e3f2fd;border-radius:6px;padding:4px 8px}'+
  '.mn-c{border:1px solid #b0bec5;background:#fff;border-radius:14px;padding:3px 10px;font-size:13px;cursor:pointer;color:#263238}.mn-c.bat{background:#1565c0;border-color:#1565c0;color:#fff}'+
  '.mn-mau .mn-c{font-size:14px;padding:5px 12px}'+
  '.mn-ruot{display:flex;flex-direction:column;gap:2px}'+
  '.mn-hang{display:grid;grid-template-columns:118px 1fr;gap:8px;align-items:start;padding:5px 0;border-bottom:1px dashed #eceff1}'+
  '.mn-nh{font-weight:600;font-size:13px;padding-top:5px;color:#455a64}.mn-gt{display:flex;flex-wrap:wrap;gap:5px;align-items:center}'+
  '.mn-i{border:1px solid #b0bec5;border-radius:6px;padding:5px 8px;font-size:14px;font-family:inherit;max-width:100%;background:#fff}'+
  '.mn-so{width:70px}.mn-tien{width:150px;font-weight:bold;text-align:right}.mn-chu{flex-basis:100%;font-style:italic;color:#37474f;font-size:13px}'+
  '.mn-buoc{display:inline-flex;flex-direction:column}.mn-buoc button{border:1px solid #b0bec5;background:#f5f7f8;font-size:9px;line-height:1;padding:2px 6px;cursor:pointer}'+
  '.mn-cb{font-size:13px}.mn-hien{color:#1565c0}.mn-vang{color:#e65100;font-weight:bold}'+
  '.mn-ngay{display:inline-flex;align-items:center;gap:2px}.mn-ng{width:120px}.mn-lich{width:34px;border:1px solid #b0bec5;border-radius:6px;padding:4px 2px}'+
  '.mn-tim{position:relative;flex-basis:100%}.mn-tim input{width:100%}.mn-gy{display:flex;flex-direction:column;max-height:220px;overflow:auto}'+
  '.mn-gy button{text-align:left;border:0;border-bottom:1px solid #eceff1;background:#fff;padding:5px 8px;cursor:pointer;font-family:inherit}.mn-gy button.bat{background:#e3f2fd}.mn-gy small{color:#607d8b}.mn-rong{color:#90a4ae;padding:4px}'+
  '.mn-gt>select{max-width:100%}.mn-pham{display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:12px;color:#546e7a}'+
  '.mn-form{display:grid;grid-template-columns:repeat(6,1fr);gap:4px 6px;padding:6px;background:#f5f7f8;border-radius:6px}.mn-form label{display:flex;flex-direction:column;font-size:12px;color:#546e7a}.mn-form input{width:100%}'+
  '.mn-c2{grid-column:span 2}.mn-c4{grid-column:span 4}.mn-c6{grid-column:span 6}'+
  '.mn-in{position:sticky;bottom:-10px;background:#fff;padding:8px 0;margin-top:auto;display:flex;gap:6px;justify-content:flex-end;border-top:1px solid #eceff1}'+
  '.mn-nut{border:1px solid #90a4ae;background:#fff;border-radius:6px;padding:7px 14px;font-size:14px;cursor:pointer}.mn-nut.moi{background:#fff8e1;border-color:#ffb300;font-weight:bold}.mn-nut.chinh{background:#1565c0;border-color:#1565c0;color:#fff;font-weight:bold}'+
  '.mn-khoa{max-width:520px;margin:12vh auto;background:#fff;border-radius:10px;padding:30px;text-align:center;box-shadow:0 4px 18px rgba(0,0,0,.15)}.mn-khoa-ic{font-size:54px}.mn-khoa h2{margin:8px 0;color:#c62828}.mn-khoa p{font-size:16px;line-height:1.5}'+
  '@media (max-width:820px){.mn-bo{grid-template-columns:1fr;height:auto}.mn-xem{height:70vh}.mn-hang{grid-template-columns:1fr}.mn-nh{padding-top:0}.mn-form{grid-template-columns:repeat(2,1fr)}.mn-c4,.mn-c6{grid-column:span 2}.mn-c2{grid-column:span 1}}';
