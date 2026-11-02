/* ===== 3.223 M3 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9): NỀN Ô MẪU — "OM" =====
   Mỗi chỗ chấm trên mẫu = 1 Ô có mã, nhãn, PHẦN (kh người vay · to tổ / Hội · ub UBND · nh NH phê duyệt · nhs NH in sẵn) và 3 cách:
     ✍ chấm (ghi tay) · 🤖 tự động (sổ hộ vay, Mẫu 31, khai báo đơn vị, phương án) · ✎ khai 1 lần (app nhớ, có thể theo chương trình) · ⌨ gõ trong lần làm (ngày, số).
   Ba kiểu in (chỉ cho lần làm, không lưu): 📄 Trắng (mọi ô chấm; phần NH in sẵn có công tắc) · 🖨 Thật (theo từng ô) · 📝 Mẫu (điền theo mức: hết / chừa NH / chừa UBND + NH / tùy chọn phần).
   ĐÚNG FORM GỐC: ô trống in ĐÚNG chuỗi chấm của file gốc; ô có chữ = khung cố định bằng đúng bề rộng chuỗi chấm đó (đo bằng phông in) → không xô dòng, không đổi số trang.
     Chữ dài hơn khung: tự thu nhỏ (tối thiểu OM_NHO × cỡ chữ), quá nữa → ⚠ báo trước khi in (OM_DAI).
     3.319 (anh 23/10 "không tự thu nhỏ chữ, điều chỉnh khoảng cách nhãn, khi cần viết ngắn lại"): mẫu đăng ký giuCo:1 → không thu nhỏ: viết tắt (omTat) → vẫn dài thì ô giãn, nhãn sau dịch phải → ⚠ báo xem rớt dòng. Chuyển dần từng mẫu khi anh duyệt chuẩn khóa (đang bật: 01/TGTV).
   CẮM – RÚT: mẫu là 1 mô-đun js/mau/<mã>.js gọi omDangKy({...}) và gán lại hàm hsoLapXX → bỏ file mô-đun = app chạy lại bản cũ trong js/25.
   Khai báo lưu chung chỗ cũ: hsoLuu().cham[mẫu][ô] (cách) · chamGT[mẫu][ô] (khai 1 lần) · chuMau[mẫu][ô] (chữ mẫu cho 📝) · nhanh[mẫu] (Chọn nhanh) · omMuc[mẫu] (mức điền) · omNHS (in sẵn phần NH ở bản trắng). */
var OM_MAU = {}, OM_KIEU = 'that', OM_DAI = [], OM_NHO = 0.72, OM_CV = null, OM_TAY = null;   /* OM_TAY = {mk, co} khi dựng bản tự khai (3.315, 01/TGTV) */
var OM_PHAN = {kh:'Người vay / khách hàng', to:'Tổ / Hội', hoi:'Hội đoàn thể', ub:'UBND xã', nh:'Ngân hàng phê duyệt', nhs:'Ngân hàng in sẵn (đầu trang, tên PGD)', ky:'Ngày, chữ ký'};
var OM_CACH = {cham:['✍', 'Ghi tay — để chấm'], tu:['🤖', 'Tự động — app lấy số liệu'], kb:['⌨', 'Tự gõ — nhớ riêng mẫu này'], go:['✏', 'Gõ trong lần làm (không nhớ)']};
var OM_LOAI = {tu:['cham', 'tu', 'kb'], kb:['cham', 'kb'], go:['cham', 'go'], tukb:['cham', 'tu', 'kb'], chon:['cham', 'kb']};   /* 3.229: mọi ô tự động đều cho ⌨ Tự gõ riêng mẫu (cùng nội dung nhưng mỗi mẫu khác vài chữ) */
/* 3.229 (anh chốt 17/10): mỗi ô 4 nguồn — ✍ Ghi tay · 📊 Mẫu 31 · ⚙ Khai báo chung · ⌨ Tự gõ (riêng mẫu). Ô "tự động" ghi rõ nguồn theo x.ng.
   KHAI BÁO RIÊNG TRƯỚC: ô đã gõ riêng (chamGT) mà anh chưa chọn cách → dùng giá trị riêng; ⌨ chọn mà chưa gõ → in như nguồn tự động (không mất chữ). */
function omNguonLoai(x){ var g = String((x && x.ng) || ''); return /⚙|Khai báo đơn vị/.test(g) ? 'chung' : /Mẫu 31|M31|tổ trưởng|^tổ\b|sổ hộ vay|danh bạ/i.test(g) ? 'm31' : 'tu'; }
function omCachChu(x, c){   /* [icon, tên] của cách c cho ô x — 🤖 tách theo nguồn */
  if(c==='tu'){ var l = omNguonLoai(x); return l==='chung' ? ['⚙', 'Khai báo chung — lấy ở ⚙ Khai báo đơn vị'] : l==='m31' ? ['📊', 'Mẫu 31 — app lấy số liệu'] : OM_CACH.tu; }
  return OM_CACH[c] || OM_CACH.cham; }
/* m = {k, ma, phan:[mã phần…], o:[{k, n nhãn, p phần, l loại, md mặc định, ct theo chương trình?, ng nguồn, nhanh?, cmau chữ mẫu gợi ý}], lap:function(G, t, B){ return html }} */
function omMg(a){ return [a[0], Math.round((a[1]-0.4)*10)/10, a[2], Math.round((a[3]-0.4)*10)/10]; }   /* lề theo Word − 0,4 mm hai bên: khung chia trang có đệm 1,5 px mỗi bên → bề rộng chữ đúng bằng Word (dòng vừa khít Word không bị xuống dòng) */
function omDangKy(m){ m.oK = {}; m.o.forEach(function(x){ if(x.md==='tu' && (x.l==='tukb' || x.l==='tu' && omNguonLoai(x)==='chung')) x.md = 'kb'; m.oK[x.k] = x; }); OM_MAU[m.k] = m; return m; }   /* 3.229 (anh 17/10 "mẫu nào khai theo mẫu đó"): ô lấy khai báo chung mặc định ⌨ riêng mẫu — chưa gõ thì in như chung */
function omCo(mk){ return !!OM_MAU[mk]; }
function omL(ten){ var L = hsoLuu(); L[ten] = L[ten] || {}; return L[ten]; }
function omRong(s, pt, dam){   /* bề rộng chữ (mm) theo phông in — canvas */
  if(!OM_CV){ try { OM_CV = document.createElement('canvas').getContext('2d'); } catch(e){ OM_CV = null; } }
  if(!OM_CV) return String(s).length*pt*0.5*0.3528;
  OM_CV.font = (dam ? 'bold ' : '')+pt+'pt "Times New Roman", Times, serif'; return OM_CV.measureText(String(s)).width*25.4/96; }
function omNHS(){ return hsoLuu().omNHS!==false; }
function omMuc(mk){ var M = omL('omMuc')[mk] || {}, m = OM_MAU[mk] || {}, k = M.kieu || 'het'; if(m.dien && !m.dien.some(function(x){ return x[0]===k; })) k = 'het'; return {kieu:k, phan:M.phan || {}}; }   /* 3.448: mẫu tự khai nút Điền (m.dien) — kiểu cũ không có trong danh sách → Điền hết */
function omPhanDien(mk, p){   /* 📝 bản mẫu: phần p có điền không */
  if(p==='nhs') return true; var M = omMuc(mk);
  if(M.kieu==='het') return true; if(M.kieu==='chuaUB') return p!=='ub'; if(M.kieu==='chuaNH') return p!=='nh'; if(M.kieu==='chuaUBNH') return p!=='nh' && p!=='ub';
  return M.phan[p]!==0 && M.phan[p]!==false; }
function omCachLuu(mk, k){   /* cách anh chọn cho ô (bản thật) — đọc cả giá trị cũ 'in' (3.206–3.222) */
  var x = (OM_MAU[mk] || {}).oK[k] || {}, ds = OM_LOAI[x.l] || ['cham'], c = ((hsoLuu().cham||{})[mk]||{})[k];
  if(c==='in') c = ds[1] || 'cham'; if(ds.indexOf(c)>=0) return c;
  if(ds.indexOf('kb')>=0 && x.md && x.md!=='cham' && omKB(mk, k)) return 'kb';   /* 3.229: khai báo riêng trước (ô mặc định ✍ chấm giữ chấm — ↺ Về mặc định vẫn đúng) */
  return x.md || 'cham'; }
function omCach(mk, k){   /* cách hiệu lực theo kiểu in đang chọn */
  var x = (OM_MAU[mk] || {}).oK[k] || {};
  if(OM_KIEU==='trang') return x.p==='nhs' && omNHS() ? omCachLuu(mk, k) : 'cham';
  if(OM_KIEU==='mau') return omPhanDien(mk, x.p) ? 'mau' : 'cham';
  if(OM_TAY && OM_TAY.mk===mk) return !(k in OM_TAY.co) && omCachLuu(mk, k)==='kb' && omKB(mk, k) ? 'kb' : 'tu';   /* 3.315: tự khai trên mẫu — ô đã gõ luôn in; ô chưa gõ in như nguồn tự động */
  return omCachLuu(mk, k); }
function omKBKhoa(mk, k){ var x = (OM_MAU[mk] || {}).oK[k] || {}; return x.ct ? k+'|'+(((hsoBo()||{}).ct) || HSO.vay.ct || '') : k; }
function omKB(mk, k){ var v = ((hsoLuu().chamGT||{})[mk]||{})[omKBKhoa(mk, k)]; return v==null ? '' : String(v); }
function omChuMau(mk, k){ var v = ((hsoLuu().chuMau||{})[mk]||{})[k]; return v==null ? '' : String(v); }
/* ngữ cảnh dựng 1 mẫu: G.o(mã ô, chuỗi chấm gốc, {pt, canh, dong, cat}) → HTML ô · G.v(mã) giá trị tự động / gõ · G.ngay(mã, [chấm d, m, y]) → [3 ô] */
/* 3.254 (anh 18/10 "các mẫu cho khai báo font 13 – 13,5 – 14 để tùy biến"): cỡ chữ thân mẫu theo khai báo riêng; chưa chọn → mặc định mẫu (01/TD 14 — anh 17/10; mẫu khác giữ như cũ) */
var OM_CO = [13, 13.5, 14], OM_CO_MD = {'01td':14};
function omCoChu(mk){ var v = +((hsoLuu().coChu||{})[mk]); return OM_CO.indexOf(v)>=0 ? v : (OM_CO_MD[mk] || 0); }
function omCoDat(mk, v){ var L = hsoLuu(); L.coChu = L.coChu || {}; if(+v===(OM_CO_MD[mk] || 0) || !v) delete L.coChu[mk]; else L.coChu[mk] = +v; luu(); hsoVe(); if(document.getElementById('om-kbt')) omKBVe(); }
function omCoHTML(mk){ var c = omCoChu(mk) || 13; return '<span class="om-co-chon">Cỡ chữ: '+OM_CO.map(function(v){ return gdxChip(String(v).replace('.', ','), c===v, 'omCoDat(\''+mk+'\','+v+')', 'hso-ct', 'Cỡ chữ thân mẫu '+String(v).replace('.', ',')+' pt'); }).join('')+'</span>'; }
function omG(mk, V, pt){
  pt = omCoChu(mk) || pt; var m = OM_MAU[mk], G = {mk:mk, V:V || {}, pt:pt || 13};
  m.o.forEach(function(x){ var c = omCach(mk, x.k); if((c==='kb' || c==='mau' && omCachLuu(mk, x.k)==='kb') && (G.V[x.k]==null || typeof G.V[x.k]!=='object')){ var r = omKB(mk, x.k); if(r) G.V[x.k] = r; } });   /* số liệu dạng bảng / danh sách giữ nguyên */   /* 3.229: ⌨ tự gõ riêng đè số liệu tự động (cả mẫu đọc thẳng V) */
  G.gt = function(k){   /* giá trị sẽ in ('' = chấm) */
    var x = m.oK[k], c = omCach(mk, k), v = '';
    if(!x) return G.V[k]==null ? '' : String(G.V[k]);
    if(c==='tu' || c==='go') v = G.V[k];
    else if(c==='kb'){ v = omKB(mk, k); if(!v && (OM_LOAI[x.l]||[]).indexOf('tu')>=0) v = G.V[k];
      if(!v && x.chon && x.chonMD && !x.nhieu) v = omChonDs(mk, x)[0]; if(x.nhieu){ if(!v && x.chonTu) v = (x.chonTu(G.V) || []).join('|'); if(v==='∅') v = ''; } }   /* 3.452: ô chọn NHIỀU — giá trị 'a|b' theo thứ tự chọn; chưa chọn → theo việc đã làm (chonTu); '∅' = bỏ hết (chấm) */   /* 3.446: ô chọn — chưa chọn → lựa chọn đầu (khi mẫu khai chonMD) */   /* 3.229: chưa gõ riêng → in như nguồn tự động */
    else if(c==='mau'){ var cl = omCachLuu(mk, k); v = cl==='kb' ? omKB(mk, k) : G.V[k]; if(v==null || v==='') v = omKB(mk, k) || G.V[k]; if(v==null || v==='') v = omChuMau(mk, k) || ''; }
    return v==null ? '' : String(v); };
  G.o = function(k, cham, o){ o = o || {}; var v = o.gt!==undefined ? o.gt : G.gt(k), c = omCach(mk, k), pt = o.pt || G.pt;
    if(o.lay && v) v = o.lay(v);
    if(c==='kb' && !omKB(mk, k)) c = 'tu';   /* 3.229: ⌨ chưa gõ → đang in nguồn tự động */
    var lop = 'om om-'+(v ? (c==='mau' ? 'mau' : c) : 'cham');
    var st0 = (pt!==G.pt ? 'font-size:'+pt+'pt;line-height:1;' : '')+(o.ls ? 'letter-spacing:'+o.ls+'pt;' : '');   /* ô cỡ chữ riêng (vd 11 trong đoạn 14) */
    if(!v) return '<span class="'+lop+'" data-o="'+k+'"'+(st0 ? ' style="'+st0+'"' : '')+'>'+cham+'</span>';
    if(o.lien){ if(m.giuCo && cham){ var Wl = omRong(String(cham).replace(/<[^>]*>|&nbsp;/g, ''), pt); if(omRong(v, pt) > Wl){ v = omTat(v); if(omRong(v, pt) > Wl) OM_DAI.push({mk:mk, k:k, n:(m.oK[k]||{}).n || k, v:v, gian:1}); } }   /* 3.319: chữ liền dài hơn chấm gốc → viết tắt, còn dài ⚠ */
      return '<span class="'+lop+'" data-o="'+k+'"'+(st0 ? ' style="'+st0+'"' : '')+'>'+coChuHTML(v)+'</span>'; }   /* 3.247 (anh 18/10): có số liệu → chữ liền như đánh máy (không khung rộng bằng dòng chấm); trống → giữ chấm */
    var ls = o.ls || 0, W = o.rong || omRong(cham, pt)+cham.length*ls*0.3528, tw = omRong(v, pt)+String(v).length*ls*0.3528, fs = pt;   /* o.ls: nén / giãn ký tự (pt) như Word */
    if(m.giuCo && tw > W*0.98){ var Wc = o.hai ? 2*W*0.9 : W*0.98; v = omTat(v); tw = omRong(v, pt)+String(v).length*ls*0.3528;   /* 3.319: giữ cỡ chữ */
      if(tw > Wc){ OM_DAI.push({mk:mk, k:k, n:(m.oK[k]||{}).n || k, v:v, gian:1}); if(!o.hai) W = tw/0.98; }
      if(o.hai) return '<span class="'+lop+'" data-o="'+k+'" style="display:inline-block;width:'+W.toFixed(2)+'mm;'+(tw > Wc ? '' : 'max-height:'+o.hai+'mm;overflow:hidden;')+'white-space:normal;vertical-align:middle;line-height:1;text-indent:0;text-align:'+(o.canh==='c' ? 'center' : o.canh==='r' ? 'right' : 'left')+'">'+coChuHTML(v)+'</span>'; }
    if(o.hai && tw > W*0.98){   /* ô trong bảng: cho xuống 2 dòng trong khung cao o.hai mm (không làm cao dòng bảng) */
      var f2 = Math.min(pt, Math.floor(o.hai/0.3528/2*10)/10, Math.floor(pt*2*W*0.9/tw*10)/10);
      if(f2 >= pt*0.6){ if(f2*2*W*0.9/pt < tw*0.999 && omRong(v, f2) > 2*W*0.9) OM_DAI.push({mk:mk, k:k, n:(m.oK[k]||{}).n || k, v:v});
        return '<span class="'+lop+'" data-o="'+k+'" style="display:inline-block;width:'+W.toFixed(2)+'mm;max-height:'+o.hai+'mm;overflow:hidden;white-space:normal;vertical-align:middle;line-height:1;text-indent:0;text-align:'+(o.canh==='c' ? 'center' : o.canh==='r' ? 'right' : 'left')+';font-size:'+f2+'pt">'+coChuHTML(v)+'</span>'; } }
    if(tw > W*0.98){ fs = Math.max(pt*OM_NHO, Math.floor(pt*W*0.98/tw*10)/10); if(omRong(v, fs) > W*1.02) OM_DAI.push({mk:mk, k:k, n:(m.oK[k]||{}).n || k, v:v}); }
    return '<span class="'+lop+'" data-o="'+k+'" style="display:inline-block;width:'+W.toFixed(2)+'mm;white-space:nowrap;vertical-align:baseline;line-height:1;text-indent:0;text-align:'+(o.canh==='c' ? 'center' : o.canh==='r' ? 'right' : 'left')+(fs!==G.pt ? ';font-size:'+fs+'pt' : '')+(ls ? ';letter-spacing:'+ls+'pt' : '')+'">'+coChuHTML(v)+'</span>'; };
  G.ngay = function(k, ds, o){ var g = hsoNg(G.gt(k)), p = g ? [g.d, g.m, g.y] : ['', '', ''];
    return ds.map(function(ch, i){ return G.o(k, ch, Object.assign({}, o || {}, {gt:p[i], canh:'c'})); }); };
  G.khoi = function(k, dong, o){   /* ô nhiều dòng (ý kiến, xác nhận…): dong = [chuỗi chấm từng dòng] — có chữ: khung cao đúng số dòng, chữ xuống dòng trong khung */
    o = o || {}; var v = G.gt(k), c = omCach(mk, k); if(c==='kb' && !omKB(mk, k)) c = 'tu';
    if(!v) return dong.map(function(ch){ return '<p class="om-dong"><span class="om om-cham" data-o="'+k+'">'+ch+'</span></p>'; }).join('');
    return '<div class="om-khoi" style="position:relative">'+dong.map(function(ch){ return '<p class="om-dong"><span style="visibility:hidden">'+ch+'</span></p>'; }).join('')+   /* giữ đúng các dòng chấm (không xô form), chữ phủ lên trên */
      '<div class="om om-'+(c==='mau' ? 'mau' : c)+'" data-o="'+k+'" style="position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;text-align:'+(o.canh || 'justify')+'">'+coChuHTML(v)+'</div></div>'; };
  return G;
}
function omLap(mk, t, B, a, b){ var m = OM_MAU[mk]; OM_DAI = OM_DAI.filter(function(x){ return x.mk!==mk; }); var x = m.lap(t, B, a, b); x.ma = x.ma || m.ma; var c = omCoChu(mk); if(c) x.h = '<div class="om-co" style="font-size:'+c+'pt">'+x.h+'</div>'; return x; }
/* 3.248 (anh 18/10 "chấm mảnh như các mẫu đã chốt, áp cho các loại"): dòng chấm (≥ 4 dấu) nhỏ mịn như Mẫu 06 / 16 KTGS — cỡ 65 %, thêm dấu cho giữ nguyên bề dài (form không xô); line-height:0 → không đổi cao dòng (trang in có DOCTYPE nên dòng chỉ có chấm vẫn giữ cao chuẩn) */
function omChamMin(h){ var tl = typeof KT_CHAM_TL!=='undefined' ? KT_CHAM_TL : 0.65;
  /* a, b: tham số riêng của mẫu (vd 03/TD: danh sách hộ, chương trình) */
  return String(h).replace(/>([^<>]*)</g, function(m0, s){ return /[.…]{2,}/.test(s) ? '>'+s.replace(/[.…]{2,}/g, function(c){ if(c.replace(/…/g, '....').length<4) return c; return '<span class="om-min" style="font-size:'+Math.round(tl*100)+'%;letter-spacing:0;line-height:0">'+(typeof ktChamDai==='function' ? ktChamDai(c, 1/tl) : c)+'</span>'; })+'<' : m0; }); }
/* 3.319 (anh 23/10 "khi cần có thể viết kiểu ngắn lại"): viết tắt chuẩn khi chữ dài hơn ô (mẫu giuCo) — chữ vừa ô thì giữ nguyên */
var OM_TAT = [[/Cục Cảnh sát quản lý hành chính về trật tự xã hội/gi, 'Cục CS QLHC về TTXH'], [/Cục Cảnh sát/gi, 'Cục CS'], [/\b[Tt]hành phố\s+/g, 'TP. '], [/\bThị trấn\s+/g, 'TT. '], [/\bPhường\s+/g, 'P. '], [/\bKhu phố\s+/g, 'KP. '], [/\bHuyện\s+/g, 'H. '], [/\bTỉnh\s+/g, 'T. '], [/Ngân hàng Chính sách xã hội/gi, 'NHCSXH'], [/Ủy ban nhân dân/gi, 'UBND']];
function omTat(v){ var r = String(v||''); OM_TAT.forEach(function(x){ r = r.replace(x[0], x[1]); }); return r; }
function omTen(){ return OM_KIEU==='trang' ? ' - Trang' : OM_KIEU==='mau' ? ' - Mau' : ''; }

/* ---------- giao diện cột trái: kiểu in · khai báo riêng (tóm tắt + Chọn nhanh) ---------- */
function omKieuDat(k){ OM_KIEU = k; hsoVe(); }
/* 3.448 (anh 02/11 "phần này thiết kế cho đơn vay, các mẫu khác chưa hợp lý — mỗi mẫu thiết kế riêng"): mẫu khai m.dien = [[mã, nhãn]…] (nút Điền) và m.phanTen = {phần: tên} — không khai → như cũ */
function omKieuHTML(mk){
  var m = OM_MAU[mk], M = omMuc(mk), ph = (m.phan || []).filter(function(p){ return p!=='nhs'; });
  return '<div class="om-kieu'+(OM_KIEU!=='that' ? ' om-kieu-'+OM_KIEU : '')+'">'+gdxChip('📄 Bản trắng', OM_KIEU==='trang', 'omKieuDat(\'trang\')', 'hso-ct', 'Mọi ô để chấm — in phát cho khách viết tay')+
    gdxChip('🖨 Bản thật', OM_KIEU==='that', 'omKieuDat(\'that\')', 'hso-ct', 'In theo cách từng ô anh đã khai (✍ / 🤖 / ✎)')+
    gdxChip('📝 Bản mẫu', OM_KIEU==='mau', 'omKieuDat(\'mau\')', 'hso-ct', 'Điền sẵn để khách chép lại — chọn mức điền')+
    (OM_KIEU==='trang' && (!m.dien || (m.phan || []).indexOf('nhs')>=0) ? '<label class="hso-o2"><input type="checkbox"'+(omNHS() ? ' checked' : '')+' onchange="hsoLuu().omNHS=this.checked;luu();hsoVe()"> In sẵn phần Ngân hàng (đầu trang, tên PGD, kính gửi)</label>' : '')+
    (OM_KIEU==='mau' ? '<div class="om-muc">Điền: '+(m.dien || [['het', 'Điền hết'], ['chuaNH', 'Chừa phê duyệt NH'], ['chuaUBNH', 'Chừa UBND + NH'], ['tuy', 'Tùy chọn']]).map(function(x){ return gdxChip(x[1], M.kieu===x[0], 'omMucDat(\''+mk+'\',\''+x[0]+'\')', 'hso-ct', ''); }).join('')+
      (M.kieu==='tuy' ? '<div class="om-muc-ph">'+ph.map(function(p){ return '<label class="hso-o2"><input type="checkbox"'+(omPhanDien(mk, p) ? ' checked' : '')+' onchange="omMucPhan(\''+mk+'\',\''+p+'\',this.checked)"> '+coChuHTML((m.phanTen || {})[p] || OM_PHAN[p] || p)+'</label>'; }).join('')+'</div>' : '')+
      '<div class="sl-phu">Phần được điền: ô có số liệu in số liệu thật; ô không có số liệu in <b>chữ mẫu</b> anh khai (⚙ khai báo trực quan). Phần không điền vẫn chấm.</div></div>' : '')+
    (OM_KIEU==='trang' ? '<div class="sl-phu">📄 Bản trắng: mọi ô chấm như giấy gốc — chỉ cho lần in này.</div>' : '')+'</div>';
}
function omMucDat(mk, k){ var L = omL('omMuc'), M = L[mk] = L[mk] || {}; M.kieu = k; if(k==='tuy' && !M.phan) M.phan = {}; luu(); hsoVe(); }
function omMucPhan(mk, p, v){ var L = omL('omMuc'), M = L[mk] = L[mk] || {kieu:'tuy'}; M.phan = M.phan || {}; M.phan[p] = v ? 1 : 0; luu(); hsoVe(); }
function omNhanh(mk){ var L = omL('nhanh'); if(!Array.isArray(L[mk])) L[mk] = (OM_MAU[mk].o || []).filter(function(x){ return x.nhanh; }).map(function(x){ return x.k; }); return L[mk]; }
function omDatCach(mk, k, c){ var L = hsoLuu(); L.cham = L.cham || {}; (L.cham[mk] = L.cham[mk] || {})[k] = c; luu(); hsoVe(); if(document.getElementById('om-kbt')) omKBVe(); if(typeof omKBDsVe==='function') omKBDsVe(mk); }
function omDatKB(mk, k, v){ var L = hsoLuu(); L.chamGT = L.chamGT || {}; (L.chamGT[mk] = L.chamGT[mk] || {})[omKBKhoa(mk, k)] = String(v||'').trim();
  if(String(v||'').trim() && omCachLuu(mk, k)!=='kb'){ L.cham = L.cham || {}; (L.cham[mk] = L.cham[mk] || {})[k] = 'kb'; if(document.getElementById('om-kbt')) omKBVePhai(); }   /* 3.229: gõ riêng = dùng riêng */
  luu(); hsoHen(); if(document.getElementById('om-kbt')) omKBVeTrang(); }
function omDatChuMau(mk, k, v){ var L = hsoLuu(); L.chuMau = L.chuMau || {}; (L.chuMau[mk] = L.chuMau[mk] || {})[k] = String(v||'').trim(); luu(); hsoHen(); if(document.getElementById('om-kbt')) omKBVeTrang(); }
function omNguon(mk, x){ var c = omCachLuu(mk, x.k); if(c==='kb') return (x.ct ? 'tự gõ riêng mẫu — theo chương trình '+((((hsoBo()||{}).ct) || HSO.vay.ct) || '(chưa chọn)') : 'tự gõ riêng mẫu này, app nhớ')+((OM_LOAI[x.l]||[]).indexOf('tu')>=0 && !omKB(mk, x.k) ? ' — chưa gõ → in như '+omCachChu(x, 'tu')[1].split(' — ')[0] : '');
  if(c==='go') return 'gõ trong lần làm (không lưu)'; if(c==='tu') return (x.ng || 'app tự lấy').replace(/M31/g, 'Mẫu 31'+(KHO.coKy() ? ' kỳ '+slKyChu(KHO.ky().ky) : '')); return 'để chấm, ghi tay'; }
function omCachNut(mk, x, nho){ var ds = OM_LOAI[x.l] || ['cham'], c = omCachLuu(mk, x.k);
  return '<span class="hso-sw">'+ds.map(function(k){ var cc = omCachChu(x, k); return '<button class="'+(c===k ? 'bat' : '')+'" onclick="omDatCach(\''+mk+'\',\''+x.k+'\',\''+k+'\')" title="'+cc[1]+'">'+cc[0]+(nho ? '' : ' '+cc[1].split(' — ')[0])+'</button>'; }).join('')+'</span>'; }
function omO1Phan(mk, x, V){   /* 3.455: tách phần 1 dòng ô — tên + nguồn, nút ✍ / 🤖 / ⌨, ô giá trị (dùng chung Chọn nhanh · ⚙ Khai báo riêng · 🖼 trực quan) */
  var c = omCachLuu(mk, x.k), inp = '';
  if(c==='kb' && x.chon) inp = omChonHTML(mk, x);
  else if(c==='kb') inp = hsoIn('omDatKB(\''+mk+'\',\''+x.k+'\',this.value)', omKB(mk, x.k), V && V[x.k] && !omKB(mk, x.k) ? String(V[x.k]) : (x.ct ? 'gõ theo chương trình đang chọn' : 'tự gõ, app nhớ riêng mẫu'));
  else if(c==='go') inp = x.ui ? x.ui() : hsoIn('HSO.vay[\''+x.k+'\']=this.value;hsoHen()', HSO.vay[x.k] || '', x.ng || '', x.ngay ? 'date' : '');
  else if(c==='tu') inp = '<small class="hso-cham-tu">'+(V && Array.isArray(V[x.k]) ? 'tự lấy: '+V[x.k].length+' mục' : V && V[x.k] ? 'tự lấy: '+coChuHTML(V[x.k]) : 'tự lấy khi có số liệu')+'</small>';   /* 3.455: ô danh sách (tổ viên) → số mục */
  else inp = '<i class="hso-cham-tay">…… chấm, ghi tay</i>';
  return {c:c, ten:coChuHTML(x.n), ng:c!=='cham' ? coChuHTML(omNguon(mk, x)) : '', nut:omCachNut(mk, x, 1), inp:inp}; }
function omO1HTML(mk, x, V){   /* 1 dòng ô (Chọn nhanh ở cột trái) */
  var q = omO1Phan(mk, x, V);
  return '<div class="hso-cham-o om-ds-'+q.c+'" data-mk="'+mk+'" data-ok="'+x.k+'"><span class="hso-cham-nhan">'+q.ten+(q.ng ? ' <small class="hso-cham-ng">📎 '+q.ng+'</small>' : '')+'</span>'+q.nut+'<span class="hso-cham-gt">'+q.inp+'</span></div>'; }
/* 3.455 (anh 02/11 "khai báo trực quan rất hay, bố trí cho mọi mẫu, ký hiệu tương đồng; khai báo thường bị dồn chữ"): 1 dòng của danh sách khai báo —
   vạch màu trái = nguồn (cùng màu nền ô trên mẫu: xanh lá tự động · vàng tự gõ · xanh dương gõ khi làm · tím chữ mẫu · xám chấm); bấm tên → chỉ chỗ đó trên mẫu */
function omDsDong(mk, x, V, nh, op){ op = op || {}; var q = omO1Phan(mk, x, V);
  return '<div class="om-ds-dong om-ds-'+q.c+(op.chon ? ' chon' : '')+'" data-mk="'+mk+'" data-ok="'+x.k+'"><div class="om-ds-ten" data-lenh="omkb.o" data-mk="'+mk+'" data-k="'+x.k+'" title="Bấm để chỉ chỗ này trên mẫu">'+q.ten+(q.ng ? ' <small>📎 '+q.ng+'</small>' : '')+'</div>'+
    '<div class="om-ds-nut">'+q.nut+'</div><div class="om-ds-gt">'+(op.chon ? '' : q.inp)+'</div>'+
    '<label class="om-ds-nhanh"><input type="checkbox" data-lenh="omkb.nhanh" data-su="change" data-mk="'+mk+'" data-k="'+x.k+'"'+(nh.indexOf(x.k)>=0 ? ' checked' : '')+'> Chọn nhanh</label>'+(op.chiTiet ? '<div class="om-ds-ct">'+op.chiTiet+'</div>' : '')+'</div>'; }
var OM_MAU_NGUON = '<span class="om-ds-chu"><span class="om-ds-tu">tự động</span><span class="om-ds-kb">tự gõ riêng</span><span class="om-ds-go">gõ khi làm</span><span class="om-ds-cham">chấm, ghi tay</span></span>';
function omKBRieng(mk, V){   /* cột trái mẫu nền ô — 3.455 (anh 02/11 "bố trí cho mọi mẫu"): như 10A: cột trái chỉ Chọn nhanh; đủ dòng ở nút ⚙ Khai báo riêng (cạnh ⚙ Khai báo đơn vị); mẫu in kèm có nút riêng ở đây */
  return omNhanhHTML(mk, mk!==(typeof hsoMau==='function' ? hsoMau().k : mk)); }
/* ---------- 🖼 KHAI BÁO TRỰC QUAN: mẫu như giấy thật (trái) · ô đang chọn (phải) ---------- */
var OM_KBT = {mk:'', k:'', xem:'that'};
function omKBHop(mk, k){ OM_KBT = {mk:mk, k:k || OM_KBT.k || '', xem:'that'}; var m = OM_MAU[mk];
  moHop('<div class="hop-tit" id="om-kbt">🖼 Khai báo trực quan — Mẫu '+coChuHTML(m.ma)+'</div><div class="hop-phu">Bấm vào chỗ chấm trên mẫu để khai. Mỗi ô chọn nguồn: ✍ Ghi tay · 📊 Mẫu 31 · ⚙ Khai báo chung · ⌨ Tự gõ (nhớ riêng mẫu này — mẫu lấy khai báo riêng trước). Màu: <span class="om-chu om-tu">📊 / ⚙ tự động</span> <span class="om-chu om-kb">⌨ tự gõ riêng</span> <span class="om-chu om-go">✏ gõ khi làm</span> <span class="om-chu om-cham">✍ chấm</span>. Tự lưu.</div>'+
    '<div class="om-kbt"><div class="om-kbt-trai"><div class="hang-nut om-kbt-thanh" id="om-kbt-thanh"></div><iframe id="om-kbt-khung" class="to-khung" title="Mẫu"></iframe></div><div class="om-kbt-phai" id="om-kbt-phai"></div></div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="omKBLuu()" title="Lưu khai báo riêng của mẫu và đóng khung">💾 Lưu</button><button class="nho" data-lenh="hop.dong" title="Bỏ mọi thay đổi từ lúc mở khung">✕ Hủy</button></div>', true);
  document.getElementById('hop-in').classList.add('xem-rong'); OM_KBT.goc = omKBChup(mk); HOP_KHI_DONG = function(){ omKBTraLai(mk); }; omKBVe(); }
/* 3.252 (anh 17–18/10, ý 15 — áp mọi mẫu nền ô): khai báo riêng có 💾 Lưu (đóng khung) · ✕ Hủy / đóng mà chưa lưu → trả lại như lúc mở · ↺ mặc định từng ô
   · lúc Lưu: ô "gõ trong lần làm" và ô "tự gõ" chưa có giá trị → tự ra Chọn nhanh (cột trái) để gõ. Chỉ các chỗ chấm — câu chữ của mẫu không sửa. */
var OM_KB_NHOM = ['cham', 'chamGT', 'chuMau', 'nhanh', 'coChu'];
function omKBChup(mk){ var L = hsoLuu(), r = {}; OM_KB_NHOM.forEach(function(n){ var v = (L[n]||{})[mk]; r[n] = v===undefined ? undefined : JSON.parse(JSON.stringify(v)); }); return r; }
function omKBTraLai(mk){ var g = OM_KBT.goc; OM_KBT.goc = null; if(!g || JSON.stringify(g)===JSON.stringify(omKBChup(mk))) return;
  var L = hsoLuu(); OM_KB_NHOM.forEach(function(n){ if(g[n]===undefined){ if(L[n]) delete L[n][mk]; } else { L[n] = L[n] || {}; L[n][mk] = g[n]; } }); luu(); hsoVe(); bao('Đã hủy — khai báo riêng mẫu '+OM_MAU[mk].ma+' giữ như trước.'); }
function omKBLuu(dong){ var mk = OM_KBT.mk, m = OM_MAU[mk]; if(!m) return; var a = omNhanh(mk), Vt = omVTam(mk), them = [];
  m.o.forEach(function(x){ var c = omCachLuu(mk, x.k); if((c==='go' || c==='kb' && !omKB(mk, x.k) && !((OM_LOAI[x.l]||[]).indexOf('tu')>=0 && Vt[x.k])) && a.indexOf(x.k)<0){ a.push(x.k); them.push(x.n); } });
  OM_KBT.goc = null; HOP_KHI_DONG = null; luu(); if(dong!==false){ dongHop(); hsoVe(); }
  bao('Đã lưu khai báo riêng — Mẫu '+m.ma+(them.length ? ' · đưa ra cột trái để gõ: '+them.join(', ') : '')+'.'); }
function omKBMD1(mk, k){ var L = hsoLuu(), x = OM_MAU[mk].oK[k]; if(!x) return;   /* ↺ một ô về mặc định: cách, giá trị tự gõ (mọi chương trình), chữ mẫu, Chọn nhanh */
  if(L.cham && L.cham[mk]) delete L.cham[mk][k];
  if(L.chamGT && L.chamGT[mk]) Object.keys(L.chamGT[mk]).forEach(function(z){ if(z===k || z.indexOf(k+'|')===0) delete L.chamGT[mk][z]; });
  if(L.chuMau && L.chuMau[mk]) delete L.chuMau[mk][k];
  var a = omNhanh(mk), i = a.indexOf(k); if(x.nhanh && i<0) a.push(k); if(!x.nhanh && i>=0) a.splice(i, 1);
  luu(); hsoHen(); omKBVe(); }
function omKBCT(mk){ omKBLuu(false); dongHop(); hsoKBHop('ct'); }   /* ô theo chương trình: lưu khai báo riêng rồi mở thẻ chương trình */
function omKBVe(){ omKBVeThanh(); omKBVeTrang(); omKBVePhai(); }
function omKBVeThanh(){ var e = document.getElementById('om-kbt-thanh'); if(!e) return; var mk = OM_KBT.mk, m = OM_MAU[mk];
  e.innerHTML = 'Xem thử: '+[['trang', '📄 Trắng'], ['that', '🖨 Thật'], ['mau', '📝 Mẫu']].map(function(x){ return gdxChip(x[1], OM_KBT.xem===x[0], 'OM_KBT.xem=\''+x[0]+'\';omKBVe()', 'hso-ct', ''); }).join('')+
    ' · Ô: <select onchange="if(this.value){OM_KBT.k=this.value;omKBVe();omKBDanh(1);}"><option value="">— chọn ô ('+m.o.length+') —</option>'+m.o.map(function(x){ return '<option value="'+x.k+'"'+(x.k===OM_KBT.k ? ' selected' : '')+'>'+coChuHTML((OM_PHAN[x.p] ? OM_PHAN[x.p].split(' ')[0]+' · ' : '')+x.n)+'</option>'; }).join('')+'</select>'+
    '<button class="nho" onclick="hsoChamVeMD(\''+mk+'\')">↺ Về mặc định</button> '+omCoHTML(mk); }
function omKBVeTrang(){ var f = document.getElementById('om-kbt-khung'); if(!f) return; var mk = OM_KBT.mk, cu = OM_KIEU, y = f.contentWindow ? f.contentWindow.scrollY : 0;
  OM_KIEU = OM_KBT.xem; var x; try { var S = hsoCH(), t = KHO.to(S.to); if(t && toLaTT(t)) t = null; x = omLap(mk, t, hsoBo()); } finally { OM_KIEU = cu; }
  var M = hsoMauK(mk) || {k:mk, ma:OM_MAU[mk].ma}, mg = M.mg || [20, 20, 20, 30];
  var css = '<style>body{background:#e9edf2;padding:10px}.om-giay{background:#fff;width:'+((M.ngang ? 297 : 210)-mg[1]-mg[3])+'mm;padding:'+mg[0]+'mm '+mg[1]+'mm '+mg[2]+'mm '+mg[3]+'mm;margin:0 auto;box-shadow:0 1px 4px rgba(0,0,0,.3)}'+
    '.om{cursor:pointer;border-radius:2px}.om:hover{outline:1.5px solid #1a5fb4}.om-tu{background:#d9f0d3}.om-kb{background:#fff0b3}.om-go{background:#dbeafe}.om-mau{background:#f3e8ff}.om-cham{background:#eef0f3}.om-chon{outline:2px solid #e01b24!important}</style>';
  var h = hsoTrang([{M:M, h:x.h}], null, '').replace('</head>', css+'</head>').replace(/<body>([\s\S]*)<\/body>/, function(a, b){ return '<body><div class="om-giay">'+b+'</div></body>'; });
  var d = f.contentDocument; d.open(); d.write(h); d.close();
  if(OM_KBT.k) Array.prototype.forEach.call(d.querySelectorAll('[data-o="'+OM_KBT.k+'"]'), function(e){ e.classList.add('om-chon'); });
  d.addEventListener('click', function(e){ var s = e.target.closest && e.target.closest('[data-o]'); if(!s) return; OM_KBT.k = s.getAttribute('data-o'); omKBVeThanh(); omKBVePhai(); omKBDanh(0); });
  try { f.contentWindow.scrollTo(0, y); } catch(e){} }
function omKBVePhai(){ var e = document.getElementById('om-kbt-phai'); if(!e) return; var mk = OM_KBT.mk, m = OM_MAU[mk], nh = omNhanh(mk), V = omVTam(mk), ph = '';   /* 3.455: bên phải = cả danh sách dòng (như ⚙ Khai báo riêng), dòng đang chọn mở rộng chi tiết */
  var ae = document.activeElement, fo = null; if(ae && e.contains(ae) && ae.closest){ var r0 = ae.closest('[data-ok]'); if(r0){ var ds0 = [].slice.call(r0.querySelectorAll('input,select,textarea')); fo = {k:r0.getAttribute('data-ok'), i:ds0.indexOf(ae), p:ae.selectionStart}; } }
  e.innerHTML = '<div class="sl-phu">Bấm chỗ chấm trên mẫu hoặc tên dòng dưới đây — dòng đang chọn mở rộng, viền đỏ trên mẫu. '+OM_MAU_NGUON+'</div>'+
    m.o.map(function(x){ var tp = (m.phanTen || {})[x.p] || OM_PHAN[x.p] || '', dau = tp!==ph ? '<div class="gdx-kbr-nhom">'+coChuHTML(ph = tp)+'</div>' : '';
      return dau+omDsDong(mk, x, V, nh, x.k===OM_KBT.k ? {chon:1, chiTiet:omKBChiTiet(mk, x)} : null); }).join('')+(OM_KBT.k ? '' : omKBPhanHTML(mk));
  if(fo){ var r1 = e.querySelector('[data-ok="'+fo.k+'"]'), ds1 = r1 ? r1.querySelectorAll('input,select,textarea') : [], f1 = ds1[fo.i]; if(f1){ f1.focus(); try { if(fo.p!=null) f1.setSelectionRange(fo.p, fo.p); } catch(er){} } }
  if(OM_KBT.k && OM_KBT.daCuon!==OM_KBT.k){ OM_KBT.daCuon = OM_KBT.k; var r = e.querySelector('.om-ds-dong.chon'); if(r) e.scrollTop = Math.max(0, r.offsetTop-e.offsetTop-60); } }
function omKBChiTiet(mk, x){ var c = omCachLuu(mk, x.k), ds = OM_LOAI[x.l] || ['cham'];   /* chi tiết 1 dòng (trước là cả khung phải): nguồn, tự gõ, chữ mẫu, mặc định ô, cả phần */
  return '<div class="nhan-nhom">Nguồn chữ (bản thật)</div>'+ds.map(function(k){ var cc = omCachChu(x, k); return '<label class="hso-o2"><input type="radio" name="om-cach"'+(c===k ? ' checked' : '')+' onchange="omDatCach(\''+mk+'\',\''+x.k+'\',\''+k+'\')"> '+cc[0]+' '+cc[1]+'</label>'; }).join('')+
    (c!=='cham' ? '<div class="sl-phu">📎 '+coChuHTML(omNguon(mk, x))+'</div>' : '')+
    (ds.indexOf('go')>=0 ? '<div class="kt-kb"><span>⌨ Gõ cho lần làm này'+(x.ngay ? ' (ngày)' : '')+'</span>'+(x.ui ? x.ui() : hsoIn('HSO.vay[\''+x.k+'\']=this.value;hsoHen();omKBVeTrang()', HSO.vay[x.k] || '', x.ng || '', x.ngay ? 'date' : ''))+'</div>' : '')+
    (ds.indexOf('kb')>=0 && x.chon ? '<div class="kt-kb"><span>☑ Chọn</span>'+omChonHTML(mk, x, 1)+'</div>' : ds.indexOf('kb')>=0 ? (function(){ var Vt = omVTam(mk), tu = Vt[x.k]!=null ? String(Vt[x.k]) : '';
      return '<label class="kt-kb"><span>⌨ Tự gõ riêng mẫu này'+(x.ct ? ' (theo chương trình đang chọn)' : '')+'</span><input id="om-kb-o" value="'+coChuHTML(omKB(mk, x.k))+'" placeholder="'+coChuHTML(tu || 'gõ chữ in ở ô này')+'" oninput="omDatKB(\''+mk+'\',\''+x.k+'\',this.value)"></label>'+
        (ds.indexOf('tu')>=0 && tu ? '<div class="hang-nut"><button class="nho" onclick="omChepTu(\''+mk+'\',\''+x.k+'\')" title="Chép chữ đang lấy tự động vào ô tự gõ để sửa vài chữ">⧉ Chép từ '+omCachChu(x, 'tu')[1].split(' — ')[0]+' để sửa</button></div>' : ''); })() : '')+
    '<label class="kt-kb"><span>📝 Chữ mẫu (in ở Bản mẫu khi ô không có số liệu)</span><input value="'+coChuHTML(omChuMau(mk, x.k))+'" placeholder="'+coChuHTML(x.cmau || 'vd: '+x.n)+'" oninput="omDatChuMau(\''+mk+'\',\''+x.k+'\',this.value)"></label>'+
    '<div class="hang-nut"><button class="nho" onclick="omKBMD1(\''+mk+'\',\''+x.k+'\')" title="Ô này về như lúc mới: cách mặc định, bỏ giá trị tự gõ (mọi chương trình), chữ mẫu">↺ Mặc định ô này</button>'+
      (x.ct || /chương trình|Phương án/i.test(x.ng || '') ? '<button class="nho" onclick="omKBCT(\''+mk+'\')" title="Giá trị mặc định theo chương trình (mục đích, vốn tự có, thời hạn, kỳ hạn, ĐTTH…) khai ở thẻ chương trình — lưu khai báo này rồi mở thẻ">⚙ Thẻ chương trình</button>' : '')+'</div>'+omKBPhanHTML(mk, x.p); }
function omKBDanh(cuon){ var f = document.getElementById('om-kbt-khung'), d = f && f.contentDocument; if(!d) return;   /* 3.455: viền đỏ chỗ đang chọn trên mẫu; cuon → cuộn tới */
  [].forEach.call(d.querySelectorAll('.om-chon'), function(z){ z.classList.remove('om-chon'); }); if(!OM_KBT.k) return;
  var ds = d.querySelectorAll('[data-o="'+OM_KBT.k+'"]'); [].forEach.call(ds, function(z){ z.classList.add('om-chon'); }); if(cuon && ds[0] && ds[0].scrollIntoView) ds[0].scrollIntoView({block:'center'}); }
/* 3.455 (anh 02/11 "chọn bên trong mẫu thì chỗ khai bên ngoài nổi bật lên"): BẤM CHỮ TRÊN BẢN XEM TRƯỚC — chữ do app điền (data-o) rê chuột có viền cùng màu nguồn;
   bấm → dòng Chọn nhanh ở cột trái sáng lên + con trỏ vào sẵn; dòng không có ở Chọn nhanh → mở 🖼 trực quan đúng dòng đó. Viền chỉ trên màn hình, bản in / Word không đổi. */
function omXemGan(f){ if(!f) return; var mk = typeof hsoMau==='function' ? hsoMau().k : ''; if(!omCo(mk)) return;
  var y = 0; try { var d0 = f.contentDocument; y = d0 && d0.scrollingElement ? d0.scrollingElement.scrollTop : 0; } catch(e){}
  f.onload = function(){ var d = f.contentDocument; if(!d) return;
    if(y) [0, 120, 400].forEach(function(ms){ setTimeout(function(){ try { if(d.scrollingElement) d.scrollingElement.scrollTop = y; } catch(e){} }, ms); });
    var st = d.createElement('style'); st.textContent = '@media screen{[data-o]{cursor:pointer;border-radius:2px}[data-o]:hover{outline:1.5px solid #1a5fb4}'+
      '.om-tu[data-o]:hover{outline-color:#3d8b37;background:rgba(61,139,55,.10)}.om-kb[data-o]:hover{outline-color:#c99a00;background:rgba(255,214,0,.16)}'+
      '.om-go[data-o]:hover{outline-color:#2563eb;background:rgba(37,99,235,.10)}.om-mau[data-o]:hover{outline-color:#8e44ad}.om-cham[data-o]:hover{outline-color:#7a8088;background:rgba(122,128,136,.10)}}';
    (d.head || d.documentElement).appendChild(st);
    d.addEventListener('click', function(e){ var x = e.target.closest && e.target.closest('[data-o]'); if(!x) return; e.preventDefault(); omXemBam(x.getAttribute('data-o')); }); }; }
function omXemBam(k){ var mk0 = hsoMau().k, ds = [mk0].concat(Object.keys(OM_MAU).filter(function(z){ return z!==mk0; })), r = null, mk = '';
  ds.some(function(z){ var e = document.querySelector('.hso-cham-o[data-mk="'+z+'"][data-ok="'+k+'"]'); if(e && e.offsetParent){ r = e; mk = z; return true; } return false; });
  if(r){ r.scrollIntoView({block:'center'}); r.classList.add('nhay'); setTimeout(function(){ r.classList.remove('nhay'); }, 2500); var i = r.querySelector('input:not([type=checkbox]):not([type=radio]),select'); if(i) i.focus(); return; }
  mk = OM_MAU[mk0] && OM_MAU[mk0].oK[k] ? mk0 : (ds.find(function(z){ return OM_MAU[z] && OM_MAU[z].oK[k]; }) || ''); if(!mk) return;
  omKBHop(mk, k); OM_KBT.daCuon = ''; omKBVePhai(); setTimeout(function(){ omKBDanh(1); }, 400); }
function omVTam(mk){ try { var S = hsoCH(), t = KHO.to(S.to); if(t && toLaTT(t)) t = null; return OM_MAU[mk].V(t, hsoBo()) || {}; } catch(e){ return {}; } }   /* số liệu tự động của mẫu (để chép sang ⌨) */
function omChepTu(mk, k){ var v = omVTam(mk)[k]; if(v==null || v==='') return bao('Ô này chưa có chữ tự động để chép.'); omDatKB(mk, k, String(v)); omDatCach(mk, k, 'kb'); var e = document.getElementById('om-kb-o'); if(e){ e.focus(); e.select(); } }
function omKBPhanHTML(mk, p){ var m = OM_MAU[mk];
  return '<div class="nhan-nhom">Cả phần một lần</div>'+(m.phan || []).filter(function(q){ return !p || q===p; }).map(function(q){ var ds = m.o.filter(function(x){ return x.p===q; }); if(!ds.length) return '';
    return '<div class="om-phan"><span>'+coChuHTML(OM_PHAN[q] || q)+' ('+ds.length+' ô)</span><button class="nho" onclick="omDatPhan(\''+mk+'\',\''+q+'\',\'cham\')">✍ cả phần</button><button class="nho" onclick="omDatPhan(\''+mk+'\',\''+q+'\',\'in\')" title="Ô tự động → 📊 / ⚙, ô khai báo → ⌨, ô gõ → ✏">🖨 cả phần</button></div>'; }).join(''); }
function omDatPhan(mk, p, c){ var L = hsoLuu(); L.cham = L.cham || {}; var T = L.cham[mk] = L.cham[mk] || {}; OM_MAU[mk].o.forEach(function(x){ if(x.p!==p) return; var ds = OM_LOAI[x.l] || ['cham']; T[x.k] = c==='cham' ? 'cham' : ds[1] || 'cham'; }); luu(); hsoVe(); omKBVe(); }
function omDatNhanh(mk, k, v){ var a = omNhanh(mk), i = a.indexOf(k); if(v && i<0) a.push(k); if(!v && i>=0) a.splice(i, 1); luu(); hsoVe(); }

/* 3.446 (anh 02/11 "các nút chọn có thể cho chọn 1 hoặc 2 hoặc dạng danh sách sổ xuống, có thể thêm trong khai báo riêng"): Ô CHỌN — o {l:'chon', chon:[lựa chọn…], chonMD:1 (chưa chọn → lựa chọn đầu; không có → để chấm)}.
   ≤ 3 lựa chọn → nút bấm; nhiều hơn → danh sách sổ xuống. Thêm lựa chọn riêng: hsoLuu().omChon[mẫu][ô] (nhớ cho lần sau). Giá trị chọn lưu như ⌨ tự gõ (chamGT) → in đúng chữ lựa chọn. */
function omChonDs(mk, x){ var r = (x.chon||[]).slice(), them = ((hsoLuu().omChon||{})[mk]||{})[x.k] || []; them.forEach(function(v){ if(r.indexOf(v)<0) r.push(v); }); return r; }
function omChonNhieu(mk, x){ var v = omKB(mk, x.k); if(v==='∅') return []; if(!v && x.chonTu){ try { v = (x.chonTu(omVTam(mk)) || []).join('|'); } catch(e){ v = ''; } } return v ? v.split('|') : []; }
function omChonHTML(mk, x, rong){ if(!omChonHTML.dk && typeof GD!=='undefined'){ omChonHTML.dk = 1; GD.dangKy('omc', OMC_LENH); }
  if(x.nhieu){ var dsN = omChonDs(mk, x), coN = omChonNhieu(mk, x), aN = ' data-mk="'+mk+'" data-k="'+x.k+'"';   /* 3.452: ô chọn nhiều — mỗi lựa chọn 1 nút bật / tắt */
    return '<span class="hso-sw om-nhieu">'+dsN.map(function(z, i){ var j = coN.indexOf(z); return '<button class="'+(j>=0 ? 'bat' : '')+'" data-lenh="omc.bat"'+aN+' data-i="'+i+'" title="'+coChuHTML(z)+'">'+(j>=0 ? (j+1)+'. ' : '')+coChuHTML(x.chonNgan ? x.chonNgan(z) : z)+'</button>'; }).join('')+'</span>'+
      (rong ? '<div class="hang-nut"><input id="omc-moi-'+x.k+'" placeholder="thêm nội dung khác…"><button class="nho" data-lenh="omc.them"'+aN+'>➕ Thêm</button></div>' : ''); }
  var ds = omChonDs(mk, x), v = omKB(mk, x.k) || (x.chonMD ? ds[0] : ''), a = ' data-mk="'+mk+'" data-k="'+x.k+'"';
  var chon = ds.length<=3 ? '<span class="hso-sw">'+ds.map(function(z, i){ return '<button class="'+(z===v ? 'bat' : '')+'" data-lenh="omc.chon"'+a+' data-i="'+i+'" title="'+coChuHTML(z)+'">'+coChuHTML(x.chonNgan ? x.chonNgan(z) : z)+'</button>'; }).join('')+'</span>'
    : '<select data-lenh="omc.chonDs" data-su="change"'+a+'>'+(x.chonMD ? '' : '<option value="">— để chấm —</option>')+ds.map(function(z, i){ return '<option value="'+i+'"'+(z===v ? ' selected' : '')+'>'+coChuHTML(z)+'</option>'; }).join('')+'</select>';
  return chon+(rong ? '<div class="hang-nut"><input id="omc-moi-'+x.k+'" placeholder="thêm lựa chọn khác…"><button class="nho" data-lenh="omc.them"'+a+'>➕ Thêm</button></div>' : ''); }
function omChonDat(mk, k, v){ omDatKB(mk, k, v); hsoVe(); if(document.getElementById('om-kbt')) omKBVe(); if(typeof omKBDsVe==='function') omKBDsVe(mk); }
var OMC_LENH = {bat:function(el){ var mk = el.getAttribute('data-mk'), k = el.getAttribute('data-k'), x = OM_MAU[mk].oK[k], z = omChonDs(mk, x)[+el.getAttribute('data-i')], a = omChonNhieu(mk, x), i = a.indexOf(z);
    if(i>=0) a.splice(i, 1); else a.push(z); omChonDat(mk, k, a.length ? a.join('|') : '∅'); },
  chon:function(el){ var mk = el.getAttribute('data-mk'), k = el.getAttribute('data-k'), x = OM_MAU[mk].oK[k], ds = omChonDs(mk, x), z = ds[+el.getAttribute('data-i')];
    omChonDat(mk, k, !x.chonMD && omKB(mk, k)===z ? '' : z); },   /* bấm lại lựa chọn đang chọn → bỏ chọn (về chấm) khi ô không có mặc định */
  chonDs:function(el){ var mk = el.getAttribute('data-mk'), k = el.getAttribute('data-k'), x = OM_MAU[mk].oK[k]; omChonDat(mk, k, el.value==='' ? '' : omChonDs(mk, x)[+el.value]); },
  them:function(el){ var mk = el.getAttribute('data-mk'), k = el.getAttribute('data-k'), e = document.getElementById('omc-moi-'+k), v = e ? String(e.value||'').trim() : ''; if(!v) return bao('Gõ lựa chọn mới trước.', 3);
    var L = hsoLuu(); L.omChon = L.omChon || {}; var m = L.omChon[mk] = L.omChon[mk] || {}, a = m[k] = m[k] || []; if(a.indexOf(v)<0) a.push(v); if(x0nhieu(mk, k)){ var cur = omChonNhieu(mk, OM_MAU[mk].oK[k]); if(cur.indexOf(v)<0) cur.push(v); omChonDat(mk, k, cur.join('|')); } else omChonDat(mk, k, v); bao('Đã thêm lựa chọn "'+v+'".', 3); }};
function x0nhieu(mk, k){ var x = (OM_MAU[mk] || {oK:{}}).oK[k]; return !!(x && x.nhieu); }   /* GD (js/39) nạp sau → đăng ký lần đầu vẽ ô chọn */

/* 3.448 (anh 02/11 "khai báo riêng em làm 1 nút riêng như bên các mẫu Giao dịch xã"): ⚙ KHAI BÁO RIÊNG dạng danh sách — mọi ô theo thứ tự trên mẫu
   (nguồn ✍ / 🤖 / ⌨ · giá trị / nút chọn · Chọn nhanh); cột trái chỉ còn các ô Chọn nhanh (omNhanhHTML). Có nút sang 🖼 Khai báo trực quan. */
function omKBDk(){ if(omKBDk.dk || typeof GD==='undefined') return; omKBDk.dk = 1; GD.dangKy('omkb', {ds:function(el){ omKBDsHop(el.getAttribute('data-mk')); },
    nhanh:function(el){ omDatNhanh(el.getAttribute('data-mk'), el.getAttribute('data-k'), el.checked); omKBDsVe(el.getAttribute('data-mk')); if(document.getElementById('om-kbt')) omKBVePhai(); },
    o:function(el){ var mk = el.getAttribute('data-mk'), k = el.getAttribute('data-k'); if(document.getElementById('om-kbt')){ OM_KBT.k = OM_KBT.k===k ? '' : k; omKBVeThanh(); omKBVePhai(); omKBDanh(1); } else { dongHop(); omKBHop(mk, k); setTimeout(function(){ omKBDanh(1); }, 300); } },
    truc:function(el){ var mk = el.getAttribute('data-mk'); dongHop(); omKBHop(mk); }, xong:function(){ dongHop(); hsoVe(); },
    md:function(el){ hsoChamVeMD(el.getAttribute('data-mk')); omKBDsVe(el.getAttribute('data-mk')); }}); }
function omNhanhHTML(mk, kem){ omKBDk(); var m = OM_MAU[mk], nh = omNhanh(mk), V = omVTam(mk);   /* kem: mẫu in kèm (vd 01/TĐCK theo 09A) — nút ⚙ ngay ở đây */
  return '<div class="hso-cham-dau">Chọn nhanh'+
    (kem ? ' — Mẫu '+coChuHTML(m.ma)+' <button class="nho" data-lenh="omkb.ds" data-mk="'+mk+'">⚙ Khai báo riêng</button>' : ' <small>(thêm / bớt ở ⚙ Khai báo riêng — nút cạnh "⚙ Khai báo đơn vị")</small>')+'</div>'+(nh.length ? nh.map(function(k){ return m.oK[k] ? omO1HTML(mk, m.oK[k], V) : ''; }).join('') : '<div class="sl-phu">Chưa có dòng Chọn nhanh.</div>'); }
function omDemNguon(mk){ var m = OM_MAU[mk], dem = {cham:0, tu:0, kb:0, go:0, mau:0}, nl = {m31:0, chung:0, tu:0};   /* tóm tắt số ô theo nguồn (trước ở đầu khối cột trái, 3.229) */
  m.o.forEach(function(x){ var c = omCachLuu(mk, x.k); dem[c] = (dem[c]||0)+1; if(c==='tu') nl[omNguonLoai(x)]++; });
  return m.o.length+' ô: '+[[nl.m31, '📊'], [nl.chung, '⚙'], [nl.tu, '🤖'], [dem.kb, '⌨'], [dem.go, '✏'], [dem.cham, '✍']].filter(function(z){ return z[0]; }).map(function(z){ return z[0]+' '+z[1]; }).join(' · '); }
function omKBDsHop(mk){ omKBDk();
  var m = OM_MAU[mk]; moHop('<div class="hop-tit" id="om-kbds">⚙ Khai báo riêng — Mẫu '+coChuHTML(m.ma)+' <small id="om-kbds-dem">('+omDemNguon(mk)+')</small></div>'+
    '<div class="hop-phu">Các dòng xếp theo thứ tự trên mẫu (trên → dưới). Mỗi dòng chọn nguồn ✍ Ghi tay (để chấm) · 🤖 Tự động · ⌨ Tự gõ. Tích <b>Chọn nhanh</b> để đưa dòng ra cột trái. Bấm tên dòng → mở 🖼 trực quan đúng chỗ đó. Tự lưu.'+
    '<br>Vạch màu = nguồn (cùng màu trên mẫu): '+OM_MAU_NGUON+'</div>'+
    '<div class="hang-nut">'+omCoHTML(mk)+'</div>'+
    '<div id="om-kbds-ds" class="gdx-kbr"></div><div class="hang-nut"><button class="nho" data-lenh="omkb.truc" data-mk="'+mk+'">🖼 Khai báo trực quan</button><button class="nho" data-lenh="omkb.md" data-mk="'+mk+'">↺ Về mặc định</button><button class="nho chinh" data-lenh="omkb.xong">Xong</button></div>', true);
  omKBDsVe(mk); }
function omKBDsVe(mk){ var e = document.getElementById('om-kbds-ds'); if(!e) return; var dm = document.getElementById('om-kbds-dem'); if(dm) dm.textContent = '('+omDemNguon(mk)+')'; var m = OM_MAU[mk], nh = omNhanh(mk), V = omVTam(mk), ph = '';
  e.innerHTML = m.o.map(function(x){ var tp = (m.phanTen || {})[x.p] || OM_PHAN[x.p] || '', dau = tp!==ph ? '<div class="gdx-kbr-nhom">'+coChuHTML(ph = tp)+'</div>' : '';
    return dau+omDsDong(mk, x, V, nh); }).join(''); }
