/* ===== 3.223 M3 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9): NỀN Ô MẪU — "OM" =====
   Mỗi chỗ chấm trên mẫu = 1 Ô có mã, nhãn, PHẦN (kh người vay · to tổ / Hội · ub UBND · nh NH phê duyệt · nhs NH in sẵn) và 3 cách:
     ✍ chấm (ghi tay) · 🤖 tự động (sổ hộ vay, Mẫu 31, khai báo đơn vị, phương án) · ✎ khai 1 lần (app nhớ, có thể theo chương trình) · ⌨ gõ trong lần làm (ngày, số).
   Ba kiểu in (chỉ cho lần làm, không lưu): 📄 Trắng (mọi ô chấm; phần NH in sẵn có công tắc) · 🖨 Thật (theo từng ô) · 📝 Mẫu (điền theo mức: hết / chừa NH / chừa UBND + NH / tùy chọn phần).
   ĐÚNG FORM GỐC: ô trống in ĐÚNG chuỗi chấm của file gốc; ô có chữ = khung cố định bằng đúng bề rộng chuỗi chấm đó (đo bằng phông in) → không xô dòng, không đổi số trang.
     Chữ dài hơn khung: tự thu nhỏ (tối thiểu OM_NHO × cỡ chữ), quá nữa → ⚠ báo trước khi in (OM_DAI).
   CẮM – RÚT: mẫu là 1 mô-đun js/mau/<mã>.js gọi omDangKy({...}) và gán lại hàm hsoLapXX → bỏ file mô-đun = app chạy lại bản cũ trong js/25.
   Khai báo lưu chung chỗ cũ: hsoLuu().cham[mẫu][ô] (cách) · chamGT[mẫu][ô] (khai 1 lần) · chuMau[mẫu][ô] (chữ mẫu cho 📝) · nhanh[mẫu] (Chọn nhanh) · omMuc[mẫu] (mức điền) · omNHS (in sẵn phần NH ở bản trắng). */
var OM_MAU = {}, OM_KIEU = 'that', OM_DAI = [], OM_NHO = 0.72, OM_CV = null;
var OM_PHAN = {kh:'Người vay / khách hàng', to:'Tổ / Hội', hoi:'Hội đoàn thể', ub:'UBND xã', nh:'Ngân hàng phê duyệt', nhs:'Ngân hàng in sẵn (đầu trang, tên PGD)', ky:'Ngày, chữ ký'};
var OM_CACH = {cham:['✍', 'Để chấm — ghi tay'], tu:['🤖', 'Tự động — app lấy số liệu'], kb:['✎', 'Khai 1 lần — app nhớ'], go:['⌨', 'Gõ trong lần làm']};
var OM_LOAI = {tu:['cham', 'tu'], kb:['cham', 'kb'], go:['cham', 'go'], tukb:['cham', 'tu', 'kb']};
/* m = {k, ma, phan:[mã phần…], o:[{k, n nhãn, p phần, l loại, md mặc định, ct theo chương trình?, ng nguồn, nhanh?, cmau chữ mẫu gợi ý}], lap:function(G, t, B){ return html }} */
function omDangKy(m){ m.oK = {}; m.o.forEach(function(x){ m.oK[x.k] = x; }); OM_MAU[m.k] = m; return m; }
function omCo(mk){ return !!OM_MAU[mk]; }
function omL(ten){ var L = hsoLuu(); L[ten] = L[ten] || {}; return L[ten]; }
function omRong(s, pt, dam){   /* bề rộng chữ (mm) theo phông in — canvas */
  if(!OM_CV){ try { OM_CV = document.createElement('canvas').getContext('2d'); } catch(e){ OM_CV = null; } }
  if(!OM_CV) return String(s).length*pt*0.5*0.3528;
  OM_CV.font = (dam ? 'bold ' : '')+pt+'pt "Times New Roman", Times, serif'; return OM_CV.measureText(String(s)).width*25.4/96; }
function omNHS(){ return hsoLuu().omNHS!==false; }
function omMuc(mk){ var M = omL('omMuc')[mk] || {}; return {kieu:M.kieu || 'het', phan:M.phan || {}}; }
function omPhanDien(mk, p){   /* 📝 bản mẫu: phần p có điền không */
  if(p==='nhs') return true; var M = omMuc(mk);
  if(M.kieu==='het') return true; if(M.kieu==='chuaNH') return p!=='nh'; if(M.kieu==='chuaUBNH') return p!=='nh' && p!=='ub';
  return M.phan[p]!==0 && M.phan[p]!==false; }
function omCachLuu(mk, k){   /* cách anh chọn cho ô (bản thật) — đọc cả giá trị cũ 'in' (3.206–3.222) */
  var x = (OM_MAU[mk] || {}).oK[k] || {}, ds = OM_LOAI[x.l] || ['cham'], c = ((hsoLuu().cham||{})[mk]||{})[k];
  if(c==='in') c = ds[1] || 'cham'; return ds.indexOf(c)>=0 ? c : (x.md || 'cham'); }
function omCach(mk, k){   /* cách hiệu lực theo kiểu in đang chọn */
  var x = (OM_MAU[mk] || {}).oK[k] || {};
  if(OM_KIEU==='trang') return x.p==='nhs' && omNHS() ? omCachLuu(mk, k) : 'cham';
  if(OM_KIEU==='mau') return omPhanDien(mk, x.p) ? 'mau' : 'cham';
  return omCachLuu(mk, k); }
function omKBKhoa(mk, k){ var x = (OM_MAU[mk] || {}).oK[k] || {}; return x.ct ? k+'|'+(((hsoBo()||{}).ct) || HSO.vay.ct || '') : k; }
function omKB(mk, k){ var v = ((hsoLuu().chamGT||{})[mk]||{})[omKBKhoa(mk, k)]; return v==null ? '' : String(v); }
function omChuMau(mk, k){ var v = ((hsoLuu().chuMau||{})[mk]||{})[k]; return v==null ? '' : String(v); }
/* ngữ cảnh dựng 1 mẫu: G.o(mã ô, chuỗi chấm gốc, {pt, canh, dong, cat}) → HTML ô · G.v(mã) giá trị tự động / gõ · G.ngay(mã, [chấm d, m, y]) → [3 ô] */
function omG(mk, V, pt){
  var m = OM_MAU[mk], G = {mk:mk, V:V || {}, pt:pt || 13};
  G.gt = function(k){   /* giá trị sẽ in ('' = chấm) */
    var x = m.oK[k], c = omCach(mk, k), v = '';
    if(!x) return G.V[k]==null ? '' : String(G.V[k]);
    if(c==='tu' || c==='go') v = G.V[k];
    else if(c==='kb') v = omKB(mk, k);
    else if(c==='mau'){ var cl = omCachLuu(mk, k); v = cl==='kb' ? omKB(mk, k) : G.V[k]; if(v==null || v==='') v = omKB(mk, k) || G.V[k]; if(v==null || v==='') v = omChuMau(mk, k) || ''; }
    return v==null ? '' : String(v); };
  G.o = function(k, cham, o){ o = o || {}; var v = o.gt!==undefined ? o.gt : G.gt(k), c = omCach(mk, k), pt = o.pt || G.pt;
    if(o.lay && v) v = o.lay(v);
    var lop = 'om om-'+(v ? (c==='mau' ? 'mau' : c) : 'cham');
    if(!v) return '<span class="'+lop+'" data-o="'+k+'">'+cham+'</span>';
    var W = o.rong || omRong(cham, pt), tw = omRong(v, pt), fs = pt;
    if(tw > W*0.98){ fs = Math.max(pt*OM_NHO, Math.floor(pt*W*0.98/tw*10)/10); if(omRong(v, fs) > W*1.02) OM_DAI.push({mk:mk, k:k, n:(m.oK[k]||{}).n || k, v:v}); }
    return '<span class="'+lop+'" data-o="'+k+'" style="display:inline-block;width:'+W.toFixed(2)+'mm;white-space:nowrap;vertical-align:baseline;text-indent:0;text-align:'+(o.canh==='c' ? 'center' : 'left')+(fs<pt ? ';font-size:'+fs+'pt' : '')+'">'+coChuHTML(v)+'</span>'; };
  G.ngay = function(k, ds, o){ var g = hsoNg(G.gt(k)), p = g ? [g.d, g.m, g.y] : ['', '', ''];
    return ds.map(function(ch, i){ return G.o(k, ch, Object.assign({}, o || {}, {gt:p[i], canh:'c'})); }); };
  G.khoi = function(k, dong, o){   /* ô nhiều dòng (ý kiến, xác nhận…): dong = [chuỗi chấm từng dòng] — có chữ: khung cao đúng số dòng, chữ xuống dòng trong khung */
    o = o || {}; var v = G.gt(k), c = omCach(mk, k);
    if(!v) return dong.map(function(ch){ return '<p class="om-dong"><span class="om om-cham" data-o="'+k+'">'+ch+'</span></p>'; }).join('');
    return '<div class="om-khoi" style="position:relative">'+dong.map(function(ch){ return '<p class="om-dong"><span style="visibility:hidden">'+ch+'</span></p>'; }).join('')+   /* giữ đúng các dòng chấm (không xô form), chữ phủ lên trên */
      '<div class="om om-'+(c==='mau' ? 'mau' : c)+'" data-o="'+k+'" style="position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;text-align:'+(o.canh || 'justify')+'">'+coChuHTML(v)+'</div></div>'; };
  return G;
}
function omLap(mk, t, B){ var m = OM_MAU[mk]; OM_DAI = OM_DAI.filter(function(x){ return x.mk!==mk; }); var x = m.lap(t, B); x.ma = x.ma || m.ma; return x; }
function omTen(){ return OM_KIEU==='trang' ? ' - Trang' : OM_KIEU==='mau' ? ' - Mau' : ''; }

/* ---------- giao diện cột trái: kiểu in · khai báo riêng (tóm tắt + Chọn nhanh) ---------- */
function omKieuDat(k){ OM_KIEU = k; hsoVe(); }
function omKieuHTML(mk){
  var m = OM_MAU[mk], M = omMuc(mk), ph = (m.phan || []).filter(function(p){ return p!=='nhs'; });
  return '<div class="om-kieu'+(OM_KIEU!=='that' ? ' om-kieu-'+OM_KIEU : '')+'">'+gdxChip('📄 Bản trắng', OM_KIEU==='trang', 'omKieuDat(\'trang\')', 'hso-ct', 'Mọi ô để chấm — in phát cho khách viết tay')+
    gdxChip('🖨 Bản thật', OM_KIEU==='that', 'omKieuDat(\'that\')', 'hso-ct', 'In theo cách từng ô anh đã khai (✍ / 🤖 / ✎)')+
    gdxChip('📝 Bản mẫu', OM_KIEU==='mau', 'omKieuDat(\'mau\')', 'hso-ct', 'Điền sẵn để khách chép lại — chọn mức điền')+
    (OM_KIEU==='trang' ? '<label class="hso-o2"><input type="checkbox"'+(omNHS() ? ' checked' : '')+' onchange="hsoLuu().omNHS=this.checked;luu();hsoVe()"> In sẵn phần Ngân hàng (đầu trang, tên PGD, kính gửi)</label>' : '')+
    (OM_KIEU==='mau' ? '<div class="om-muc">Điền: '+[['het', 'Điền hết'], ['chuaNH', 'Chừa phê duyệt NH'], ['chuaUBNH', 'Chừa UBND + NH'], ['tuy', 'Tùy chọn']].map(function(x){ return gdxChip(x[1], M.kieu===x[0], 'omMucDat(\''+mk+'\',\''+x[0]+'\')', 'hso-ct', ''); }).join('')+
      (M.kieu==='tuy' ? '<div class="om-muc-ph">'+ph.map(function(p){ return '<label class="hso-o2"><input type="checkbox"'+(omPhanDien(mk, p) ? ' checked' : '')+' onchange="omMucPhan(\''+mk+'\',\''+p+'\',this.checked)"> '+coChuHTML(OM_PHAN[p] || p)+'</label>'; }).join('')+'</div>' : '')+
      '<div class="sl-phu">Phần được điền: ô có số liệu in số liệu thật; ô không có số liệu in <b>chữ mẫu</b> anh khai (⚙ khai báo trực quan). Phần không điền vẫn chấm.</div></div>' : '')+
    (OM_KIEU==='trang' ? '<div class="sl-phu">📄 Bản trắng: mọi ô chấm như giấy gốc — chỉ cho lần in này.</div>' : '')+'</div>';
}
function omMucDat(mk, k){ var L = omL('omMuc'), M = L[mk] = L[mk] || {}; M.kieu = k; if(k==='tuy' && !M.phan) M.phan = {}; luu(); hsoVe(); }
function omMucPhan(mk, p, v){ var L = omL('omMuc'), M = L[mk] = L[mk] || {kieu:'tuy'}; M.phan = M.phan || {}; M.phan[p] = v ? 1 : 0; luu(); hsoVe(); }
function omNhanh(mk){ var L = omL('nhanh'); if(!Array.isArray(L[mk])) L[mk] = (OM_MAU[mk].o || []).filter(function(x){ return x.nhanh; }).map(function(x){ return x.k; }); return L[mk]; }
function omDatCach(mk, k, c){ var L = hsoLuu(); L.cham = L.cham || {}; (L.cham[mk] = L.cham[mk] || {})[k] = c; luu(); hsoVe(); if(document.getElementById('om-kbt')) omKBVe(); }
function omDatKB(mk, k, v){ var L = hsoLuu(); L.chamGT = L.chamGT || {}; (L.chamGT[mk] = L.chamGT[mk] || {})[omKBKhoa(mk, k)] = String(v||'').trim(); luu(); hsoHen(); if(document.getElementById('om-kbt')) omKBVeTrang(); }
function omDatChuMau(mk, k, v){ var L = hsoLuu(); L.chuMau = L.chuMau || {}; (L.chuMau[mk] = L.chuMau[mk] || {})[k] = String(v||'').trim(); luu(); hsoHen(); if(document.getElementById('om-kbt')) omKBVeTrang(); }
function omNguon(mk, x){ var c = omCachLuu(mk, x.k); if(c==='kb') return x.ct ? 'khai 1 lần — theo chương trình '+((((hsoBo()||{}).ct) || HSO.vay.ct) || '(chưa chọn)') : 'khai 1 lần, app nhớ';
  if(c==='go') return 'gõ trong lần làm (không lưu)'; if(c==='tu') return (x.ng || 'app tự lấy').replace(/M31/g, 'Mẫu 31'+(KHO.coKy() ? ' kỳ '+slKyChu(KHO.ky().ky) : '')); return 'để chấm, ghi tay'; }
function omCachNut(mk, x, nho){ var ds = OM_LOAI[x.l] || ['cham'], c = omCachLuu(mk, x.k);
  return '<span class="hso-sw">'+ds.map(function(k){ return '<button class="'+(c===k ? 'bat' : '')+'" onclick="omDatCach(\''+mk+'\',\''+x.k+'\',\''+k+'\')" title="'+OM_CACH[k][1]+'">'+OM_CACH[k][0]+(nho ? '' : ' '+OM_CACH[k][1].split(' — ')[0])+'</button>'; }).join('')+'</span>'; }
function omO1HTML(mk, x, V){   /* 1 dòng ô (Chọn nhanh ở cột trái) */
  var c = omCachLuu(mk, x.k), inp = '';
  if(c==='kb') inp = hsoIn('omDatKB(\''+mk+'\',\''+x.k+'\',this.value)', omKB(mk, x.k), x.ct ? 'khai theo chương trình đang chọn' : 'khai 1 lần, app nhớ');
  else if(c==='go') inp = hsoIn('HSO.vay[\''+x.k+'\']=this.value;hsoHen()', HSO.vay[x.k] || '', '', x.ngay ? 'date' : '');
  else if(c==='tu') inp = '<small class="hso-cham-tu">'+(V && V[x.k] ? 'tự lấy: '+coChuHTML(V[x.k]) : 'tự lấy khi có số liệu')+'</small>';
  else inp = '<i class="hso-cham-tay">…… chấm, ghi tay</i>';
  return '<div class="hso-cham-o"><span class="hso-cham-nhan">'+coChuHTML(x.n)+(c!=='cham' ? ' <small class="hso-cham-ng">📎 '+coChuHTML(omNguon(mk, x))+'</small>' : '')+'</span>'+omCachNut(mk, x, 1)+'<span class="hso-cham-gt">'+inp+'</span></div>'; }
function omKBRieng(mk, V){   /* cuối cột trái: ⚙ Khai báo riêng — tóm tắt + Chọn nhanh + mở khai báo trực quan */
  var m = OM_MAU[mk], dem = {cham:0, tu:0, kb:0, go:0}, dong = !!((hsoLuu().kbrDong||{})[mk]), doi = Object.keys(((hsoLuu().cham||{})[mk])||{}).length, nh = omNhanh(mk);
  m.o.forEach(function(x){ dem[omCachLuu(mk, x.k)]++; });
  return '<details class="hso-kbr-d"'+(dong ? '' : ' open')+' ontoggle="hsoKBRMo(\''+mk+'\',this.open)"><summary class="nhan-nhom hso-kbr-o">⚙ Khai báo riêng — Mẫu '+coChuHTML(m.ma)+' <small>('+m.o.length+' ô: '+dem.tu+' 🤖 · '+dem.kb+' ✎ · '+dem.go+' ⌨ · '+dem.cham+' ✍)</small></summary>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="omKBHop(\''+mk+'\')" title="Hiện mẫu như giấy thật — bấm vào chỗ chấm để khai">🖼 Khai báo trực quan</button>'+
      (doi ? '<button class="nho" onclick="hsoChamVeMD(\''+mk+'\')" title="Đưa mọi ô về mặc định — giá trị đã khai vẫn giữ">↺ Về mặc định ('+doi+' ô đã đổi)</button>' : '')+'</div>'+
    (nh.length ? '<div class="hso-cham-dau">Chọn nhanh <small>(tích ở khai báo trực quan để đưa ô ra đây)</small></div>'+nh.map(function(k){ return m.oK[k] ? omO1HTML(mk, m.oK[k], V) : ''; }).join('') : '<div class="sl-phu">Chưa có ô Chọn nhanh — mở 🖼 Khai báo trực quan, tích "Chọn nhanh" ở ô hay đổi.</div>')+'</details>'; }

/* ---------- 🖼 KHAI BÁO TRỰC QUAN: mẫu như giấy thật (trái) · ô đang chọn (phải) ---------- */
var OM_KBT = {mk:'', k:'', xem:'that'};
function omKBHop(mk, k){ OM_KBT = {mk:mk, k:k || OM_KBT.k || '', xem:'that'}; var m = OM_MAU[mk];
  moHop('<div class="hop-tit" id="om-kbt">🖼 Khai báo trực quan — Mẫu '+coChuHTML(m.ma)+'</div><div class="hop-phu">Bấm vào chỗ chấm trên mẫu để khai. Màu: <span class="om-chu om-tu">🤖 tự động</span> <span class="om-chu om-kb">✎ khai 1 lần</span> <span class="om-chu om-go">⌨ gõ khi làm</span> <span class="om-chu om-cham">✍ chấm</span>. Tự lưu.</div>'+
    '<div class="om-kbt"><div class="om-kbt-trai"><div class="hang-nut om-kbt-thanh" id="om-kbt-thanh"></div><iframe id="om-kbt-khung" class="to-khung" title="Mẫu"></iframe></div><div class="om-kbt-phai" id="om-kbt-phai"></div></div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop();hsoVe()">Xong</button></div>', true);
  document.getElementById('hop-in').classList.add('xem-rong'); omKBVe(); }
function omKBVe(){ omKBVeThanh(); omKBVeTrang(); omKBVePhai(); }
function omKBVeThanh(){ var e = document.getElementById('om-kbt-thanh'); if(!e) return; var mk = OM_KBT.mk, m = OM_MAU[mk];
  e.innerHTML = 'Xem thử: '+[['trang', '📄 Trắng'], ['that', '🖨 Thật'], ['mau', '📝 Mẫu']].map(function(x){ return gdxChip(x[1], OM_KBT.xem===x[0], 'OM_KBT.xem=\''+x[0]+'\';omKBVe()', 'hso-ct', ''); }).join('')+
    ' · Ô: <select onchange="if(this.value){OM_KBT.k=this.value;omKBVe();}"><option value="">— chọn ô ('+m.o.length+') —</option>'+m.o.map(function(x){ return '<option value="'+x.k+'"'+(x.k===OM_KBT.k ? ' selected' : '')+'>'+coChuHTML((OM_PHAN[x.p] ? OM_PHAN[x.p].split(' ')[0]+' · ' : '')+x.n)+'</option>'; }).join('')+'</select>'+
    '<button class="nho" onclick="hsoChamVeMD(\''+mk+'\')">↺ Về mặc định</button>'; }
function omKBVeTrang(){ var f = document.getElementById('om-kbt-khung'); if(!f) return; var mk = OM_KBT.mk, cu = OM_KIEU, y = f.contentWindow ? f.contentWindow.scrollY : 0;
  OM_KIEU = OM_KBT.xem; var x; try { var S = hsoCH(), t = KHO.to(S.to); if(t && toLaTT(t)) t = null; x = omLap(mk, t, hsoBo()); } finally { OM_KIEU = cu; }
  var M = hsoMauK(mk) || {k:mk, ma:OM_MAU[mk].ma}, mg = M.mg || [20, 20, 20, 30];
  var css = '<style>body{background:#e9edf2;padding:10px}.om-giay{background:#fff;width:'+((M.ngang ? 297 : 210)-mg[1]-mg[3])+'mm;padding:'+mg[0]+'mm '+mg[1]+'mm '+mg[2]+'mm '+mg[3]+'mm;margin:0 auto;box-shadow:0 1px 4px rgba(0,0,0,.3)}'+
    '.om{cursor:pointer;border-radius:2px}.om:hover{outline:1.5px solid #1a5fb4}.om-tu{background:#d9f0d3}.om-kb{background:#fff0b3}.om-go{background:#dbeafe}.om-mau{background:#f3e8ff}.om-cham{background:#eef0f3}.om-chon{outline:2px solid #e01b24!important}</style>';
  var h = hsoTrang([{M:M, h:x.h}], null, '').replace('</head>', css+'</head>').replace(/<body>([\s\S]*)<\/body>/, function(a, b){ return '<body><div class="om-giay">'+b+'</div></body>'; });
  var d = f.contentDocument; d.open(); d.write(h); d.close();
  if(OM_KBT.k) Array.prototype.forEach.call(d.querySelectorAll('[data-o="'+OM_KBT.k+'"]'), function(e){ e.classList.add('om-chon'); });
  d.addEventListener('click', function(e){ var s = e.target.closest && e.target.closest('[data-o]'); if(!s) return; OM_KBT.k = s.getAttribute('data-o'); omKBVeThanh(); omKBVePhai();
    Array.prototype.forEach.call(d.querySelectorAll('.om-chon'), function(z){ z.classList.remove('om-chon'); }); Array.prototype.forEach.call(d.querySelectorAll('[data-o="'+OM_KBT.k+'"]'), function(z){ z.classList.add('om-chon'); }); });
  try { f.contentWindow.scrollTo(0, y); } catch(e){} }
function omKBVePhai(){ var e = document.getElementById('om-kbt-phai'); if(!e) return; var mk = OM_KBT.mk, m = OM_MAU[mk], x = m.oK[OM_KBT.k];
  if(!x){ e.innerHTML = '<div class="sl-phu">Bấm vào 1 chỗ chấm trên mẫu (hoặc chọn ở danh sách "Ô") để khai.</div>'+omKBPhanHTML(mk); return; }
  var c = omCachLuu(mk, x.k), nh = omNhanh(mk), ds = OM_LOAI[x.l] || ['cham'];
  e.innerHTML = '<div class="om-o-ten"><b>'+coChuHTML(x.n)+'</b><div class="sl-phu">Phần: '+coChuHTML(OM_PHAN[x.p] || x.p)+'</div></div>'+
    '<div class="nhan-nhom">Cách in (bản thật)</div>'+ds.map(function(k){ return '<label class="hso-o2"><input type="radio" name="om-cach"'+(c===k ? ' checked' : '')+' onchange="omDatCach(\''+mk+'\',\''+x.k+'\',\''+k+'\')"> '+OM_CACH[k][0]+' '+OM_CACH[k][1]+'</label>'; }).join('')+
    (c!=='cham' ? '<div class="sl-phu">📎 '+coChuHTML(omNguon(mk, x))+'</div>' : '')+
    (ds.indexOf('kb')>=0 ? '<label class="kt-kb"><span>✎ Giá trị khai 1 lần'+(x.ct ? ' (theo chương trình đang chọn)' : '')+'</span><input value="'+coChuHTML(omKB(mk, x.k))+'" oninput="omDatKB(\''+mk+'\',\''+x.k+'\',this.value)"></label>' : '')+
    '<label class="kt-kb"><span>📝 Chữ mẫu (in ở Bản mẫu khi ô không có số liệu)</span><input value="'+coChuHTML(omChuMau(mk, x.k))+'" placeholder="'+coChuHTML(x.cmau || 'vd: '+x.n)+'" oninput="omDatChuMau(\''+mk+'\',\''+x.k+'\',this.value)"></label>'+
    '<label class="hso-o2"><input type="checkbox"'+(nh.indexOf(x.k)>=0 ? ' checked' : '')+' onchange="omDatNhanh(\''+mk+'\',\''+x.k+'\',this.checked)"> Chọn nhanh — đưa ô này ra cột trái để đổi nhanh khi in</label>'+omKBPhanHTML(mk, x.p); }
function omKBPhanHTML(mk, p){ var m = OM_MAU[mk];
  return '<div class="nhan-nhom">Cả phần một lần</div>'+(m.phan || []).filter(function(q){ return !p || q===p; }).map(function(q){ var ds = m.o.filter(function(x){ return x.p===q; }); if(!ds.length) return '';
    return '<div class="om-phan"><span>'+coChuHTML(OM_PHAN[q] || q)+' ('+ds.length+' ô)</span><button class="nho" onclick="omDatPhan(\''+mk+'\',\''+q+'\',\'cham\')">✍ cả phần</button><button class="nho" onclick="omDatPhan(\''+mk+'\',\''+q+'\',\'in\')" title="Ô tự động → 🤖, ô khai báo → ✎, ô gõ → ⌨">🖨 cả phần</button></div>'; }).join(''); }
function omDatPhan(mk, p, c){ var L = hsoLuu(); L.cham = L.cham || {}; var T = L.cham[mk] = L.cham[mk] || {}; OM_MAU[mk].o.forEach(function(x){ if(x.p!==p) return; var ds = OM_LOAI[x.l] || ['cham']; T[x.k] = c==='cham' ? 'cham' : ds[1] || 'cham'; }); luu(); hsoVe(); omKBVe(); }
function omDatNhanh(mk, k, v){ var a = omNhanh(mk), i = a.indexOf(k); if(v && i<0) a.push(k); if(!v && i>=0) a.splice(i, 1); luu(); hsoVe(); }
