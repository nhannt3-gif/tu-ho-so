/* Tủ hồ sơ — bộ chọn phạm vi / cây địa bàn dùng chung mọi tab (tách nguyên văn khỏi 22g-to.js ở 3.346 — K5). Đọc kỳ qua KHO. ES5. */
/* ---------- 3.89: BỘ CHỌN PHẠM VI DÙNG CHUNG (anh chốt: mọi tra cứu / in đều chọn xã → điểm GD → hội → tổ) ----------
   - mỗi nơi dùng 1 tiền tố p (to = tab Tổ, tc = Tra cứu KH, sk = Sao kê) + 1 đối tượng trạng thái {xa, diem, hoi, to}
   - dừng ở cấp nào thì lấy phạm vi cấp đó; Hội là bộ lọc (bỏ trống = mọi hội); tab Tổ bắt buộc chọn đến tổ
   - ô chọn theo phím chung (sgPhim nhận .pv-cay), đủ chỗ thì có chip; cấp chỉ 1 lựa chọn tự chọn; dữ liệu cây = PV_DUNG[p].K() */
var PV_CAP = [['xa','Xã / phường'],['diem','Điểm GD'],['hoi','Hội'],['ap','Ấp / KP'],['to','Tổ']];   /* 3.383 (anh 26/10): + Ấp / KP — lọc như Hội (không bắt buộc, đa chiều) */
function pvApChu(t){ var a = pvApNgan(t.tenThon || t.thon); return /^(ấp|thôn|kp) /i.test(a) ? a.replace(/^./, function(c){ return c.toUpperCase(); }) : 'Ấp '+a; }   /* "Ấp Cây Trắc" · "KP 2" · "Thôn 03" */
function pvApKhoa(t){ var a = t && (t.thon || t.tenThon); return a ? String(t.xa||'')+'|'+String(a) : ''; }   /* ấp theo xã (tên ấp trùng giữa 2 xã không lẫn) */
var PV_DUNG = {};
function pvLuaChon(T, S, cap, dc){   /* dc = chọn đa chiều (3.133, tab Tổ): Hội lọc độc lập — cả xã (chưa chọn điểm) hoặc toàn PGD */
  var ra = {};
  Object.keys(T||{}).forEach(function(m){
    var t = T[m];
    if(dc && (cap==='hoi' || cap==='ap')){ if(S.xa && t.xa!==S.xa) return; if(S.diem && t.khoaDiem!==S.diem) return;   /* 3.383: Hội ↔ Ấp thu danh sách theo nhau */
      if(cap==='hoi' && S.ap && pvApKhoa(t)!==S.ap) return; if(cap==='ap' && S.hoi && String(t.dv||'')!==S.hoi) return; }
    else if(dc && cap==='diem'){ if(t.xa!==S.xa) return; if(S.hoi && String(t.dv||'')!==S.hoi) return; if(S.ap && pvApKhoa(t)!==S.ap) return; }   /* 3.383: điểm GD có tổ của Hội / ấp đang chọn */
    else if(dc && cap==='to'){ if(t.xa!==S.xa) return; if(S.diem && t.khoaDiem!==S.diem) return; if(S.ap && pvApKhoa(t)!==S.ap) return; }   /* 3.160: ③ Tổ theo Điểm GD hoặc Hội (chọn cái nào trước cũng được) · 3.383 + ấp */
    else {
    if(cap!=='xa' && t.xa!==S.xa) return;
    if((cap==='hoi' || cap==='to') && t.khoaDiem!==S.diem) return; }
    if(cap==='to' && S.hoi && String(t.dv||'')!==S.hoi) return;
    if(cap==='ap' && !pvApKhoa(t)) return;
    var k = cap==='xa' ? t.xa : cap==='diem' ? t.khoaDiem : cap==='hoi' ? String(t.dv||'') : cap==='ap' ? pvApKhoa(t) : t.ma;
    var chu = cap==='ap' ? pvApChu(t)+(S.xa ? '' : ' · '+(t.tenXa||t.xa)) : cap==='xa' ? (t.tenXa||t.xa) : cap==='diem' ? t.tenDiemDu : cap==='hoi' ? (String(t.dv)==='99' ? 'Trực tiếp' : (tdnHoi(t.dv)||'(chưa rõ hội)')) : (t.ten||'Tổ '+t.ma)+(t.canDong ? ' · ⚠ Dư nợ 0 — cần đóng tổ' : '')+(t.trucTiep ? ' · '+t.soMon+' món' : (t.tenThon ? ' · '+t.tenThon : ''));
    if(k===undefined || k===null) return;
    if(!ra[k]) ra[k] = {k:k, chu:String(chu), n:0, ap:cap==='to' ? String(t.tenThon||'') : ''}; if(!t.trucTiep) ra[k].n++;   /* 3.132: số tổ không tính vay trực tiếp */
  });
  return Object.keys(ra).map(function(k){ return ra[k]; }).sort(function(a, b){   /* 3.120 (anh chốt): tổ xếp theo ấp (số / tên ấp), cùng ấp theo tên tổ trưởng; không có ấp (trực tiếp) xuống cuối */
    if(cap==='to' && a.ap!==b.ap){ if(!a.ap) return 1; if(!b.ap) return -1; return ktApTen(a.ap).localeCompare(ktApTen(b.ap), 'vi', {numeric:true}); }
    return a.chu.localeCompare(b.chu, 'vi'); });
}
/* 3.163 (anh chốt): tên ấp ngắn cho chip tổ — ấp tên chữ bỏ "Ấp" / "KP" (Thuận An); ấp / KP tên là số giữ chữ (ấp 1, KP 2) */
function pvApNgan(ap){ var s = String(ap||'').trim(), m = s.match(/^(ấp|ap|thôn|khu phố|kp)\.?\s+(.+)$/i);
  if(m) return /^\d+[a-z]?$/i.test(m[2]) ? (/^(khu phố|kp)$/i.test(m[1]) ? 'KP ' : /^thôn$/i.test(m[1]) ? 'thôn ' : 'ấp ')+m[2] : m[2];
  return /^\d+[a-z]?$/i.test(s) ? 'ấp '+s : s; }
function pvCha(S, cap, dc){ return cap==='xa' ? true : cap==='diem' ? !!S.xa : ((cap==='hoi' || cap==='ap') && dc) ? true : (cap==='to' && dc) ? !!(S.xa && (S.diem || S.hoi || S.ap)) : !!S.diem; }   /* 3.383: + ấp */   /* hội và tổ cần điểm GD · 3.133: tab Tổ chọn Hội không cần điểm */
function pvVeCay(p){
  var d = PV_DUNG[p], o = document.getElementById(p+'-cay'); if(!d || !o) return;
  var K = d.K(); if(!K) return;
  var S = d.S(), T = d.boTT ? pvBoTT(K.to) : K.to, dang = document.activeElement && document.activeElement.id, h = '', rong = window.innerWidth >= 700, bb = !!d.toBatBuoc;
  PV_CAP.forEach(function(c){   /* cấp chỉ có 1 lựa chọn → tự chọn (trừ hội, tổ); lựa chọn cũ không còn → bỏ */
    var ds = pvLuaChon(T, S, c[0], d.daChieu!==false);
    if(pvCha(S, c[0], d.daChieu!==false) && !S[c[0]] && ds.length===1 && (c[0]==='xa' || c[0]==='diem') && (bb || c[0]==='diem')) S[c[0]] = String(ds[0].k);
    if(S[c[0]] && !ds.some(function(x){ return String(x.k)===S[c[0]]; })) S[c[0]] = '';
  });
  /* 3.149 (anh chốt ý 6c): cây chọn 2 hàng — hàng 1: các cấp (ô chọn gọn, nối bằng ›); hàng 2: chip của cấp cần chọn tiếp (chọn tới tổ thì hết chip) */
  var trong = {xa:'— Tất cả xã (toàn PGD) —', diem:'— Tất cả điểm GD —', hoi:'— Tất cả Hội —', ap:'— Tất cả ấp / KP —', to:'— Tất cả tổ —'}, h1 = '', tiep = null, dsTiep = null;   /* 3.383 (anh): dòng đầu mỗi ô = Tất cả */
  PV_CAP.forEach(function(c){
    var ds = pvLuaChon(T, S, c[0], d.daChieu!==false), cha = pvCha(S, c[0], d.daChieu!==false), chon = S[c[0]];
    if(!cha && c[0]!=='hoi') return;
    if(c[0]==='ap' && !ds.length && !chon) return;   /* số liệu không có ấp → không hiện ô */
    if(!tiep && cha && !chon && c[0]!=='hoi' && c[0]!=='ap' && ds.length>1){ tiep = c[0]; dsTiep = ds; }
    h1 += (h1 && c[0]!=='hoi' && c[0]!=='ap' ? '<span class="pv-sep">›</span>' : '')+'<select id="'+p+'-'+c[0]+'" class="pv-o pv-'+c[0]+(chon ? ' co' : '')+'" title="'+c[1]+(c[0]==='hoi' ? ' (lọc)' : '')+'" onchange="pvChon(\''+p+'\',\''+c[0]+'\',this.value)"'+(cha ? '' : ' disabled')+'>'+
      '<option value="">'+trong[c[0]]+'</option>'+ds.map(function(x){ return '<option value="'+coChuHTML(String(x.k))+'"'+(String(x.k)===chon ? ' selected' : '')+
        ' title="'+coChuHTML(x.chu)+'">'+coChuHTML(c[0]==='xa' ? String(x.chu).replace(/^(Xã|Phường|Thị trấn)\s+/i, '') : x.chu)+(c[0]!=='to' ? (x.n ? ' ('+x.n+' tổ)' : ' (vay trực tiếp)') : '')+'</option>'; }).join('')+'</select>'+
      '<button type="button" class="pv-x" onclick="pvChon(\''+p+'\',\''+c[0]+'\',\'\')"'+(chon ? '' : ' disabled')+' title="'+coChuHTML(trong[c[0]].replace(/^— | —$/g, ''))+' (bấm nhanh)" aria-label="'+coChuHTML(c[1])+
        ': tất cả">↺</button>'+pvNutGhimO(p, c[0], chon, ds);   /* 3.383 (anh): nút nhỏ ↺ cạnh ô = về Tất cả (anh: dấu X không hợp → ↺ "trả về tất cả") */   /* 3.334 (RA_SOAT_BO_CUC #2): ô Xã bỏ chữ "Xã / Phường" đầu tên → ô hẹp vẫn đọc được */
  });
  /* 3.162 (anh chốt — tinh chỉnh 3.160): hàng 1 = Xã (luôn hiện, PGD / xã đang chọn tô xanh — bấm để quay lại / đổi) + 📍 đường dẫn chỉ báo (chip) + 🔎;
     hàng 2 = Điểm GD │ Hội (cùng 1 dòng, luôn hiện); hàng 3 = Tổ (khi có Điểm GD hoặc Hội): chip + ô sổ xuống đủ danh sách. Điện thoại: ô thả xuống như cũ. */
  var dc = d.daChieu!==false, chip = function(cap, k, nhan, n, tit, phu){ var v = String(k).replace(/'/g, "\\'"), bat = String(S[cap]||'')===String(k);
    return '<button class="to-chip'+(bat ? ' bat' : '')+'" onclick="pvChon(\''+p+'\',\''+cap+'\',\''+v+'\''+(k==='' ? '' : ',1')+')"'+(tit ? ' title="'+coChuHTML(tit)+'"' : '')+'>'+coChuHTML(nhan)+(n ? ' <small>'+n+'</small>' : '')+(phu ? ' <small class="pv-ap">'+coChuHTML(phu)+'</small>' : '')+'</button>'; };
  var toTit = function(x){ var t = T[x.k] || {}, kh = K.kh && K.kh[x.k], n = 0, da = {}; (kh||[]).forEach(function(o){ if(o.kh && !da[o.kh]){ da[o.kh] = 1; n++; } });   /* 3.163: rê chuột chip tổ */
      return x.chu.split(' · ')[0]+(x.ap ? ' · '+(/^(ấp|thôn|kp) /i.test(pvApNgan(x.ap)) ? pvApNgan(x.ap).replace(/^./, function(c){ return c.toUpperCase(); }) : 'Ấp '+pvApNgan(x.ap)) : '')+' · mã '+x.k+(kh ? ' · '+n+' tổ viên' : '')+(t.canDong ? ' · ⚠ dư nợ 0 — cần đóng tổ' : ''); };
  var chuTo = function(x){ return x.chu.split(' · ')[0]+(x.ap ? ' · '+pvApNgan(x.ap) : '')+((T[x.k]||{}).canDong ? ' · ⚠ cần đóng tổ' : ''); };
  var nhan = function(t){ return '<span class="pv-nhan">'+t+'</span>'; }, hh = '';
  var dsX = pvLuaChon(T, S, 'xa', dc), dsD = S.xa ? pvLuaChon(T, S, 'diem', dc) : [], dsH = pvLuaChon(T, S, 'hoi', dc).filter(function(x){ return !(d.boTT && x.k==='99'); }),
    dsT = pvCha(S, 'to', dc) ? pvLuaChon(T, S, 'to', dc) : [];
  var hXa = dsX.length>1 ? '<span class="pv-nhom cap-xa">'+nhan('Xã')+chip('xa', '', 'PGD', 0, 'Toàn PGD (mọi xã)')+dsX.map(function(x){ return chip('xa', x.k, x.chu, x.n); }).join('')+'</span>' : '';
  var hD = S.xa && dsD.length>1 ? '<span class="pv-nhom cap-diem">'+nhan('Điểm GD')+chip('diem', '', 'Cả xã')+dsD.map(function(x){ return chip('diem', x.k, x.chu, x.n); }).join('')+'</span>' : '';
  var hH = dsH.length>1 || S.hoi ? '<span class="pv-nhom cap-hoi">'+nhan('Hội')+chip('hoi', '', 'Tất cả')+dsH.map(function(x){ return chip('hoi', x.k, x.chu, x.n); }).join('')+'</span>' : '';
  var dsA = S.xa ? pvLuaChon(T, S, 'ap', dc) : [], hA = dsA.length>1 || S.ap ? '<span class="pv-nhom cap-ap">'+nhan('Ấp / KP')+chip('ap', '', 'Tất cả')+dsA.map(function(x){ return chip('ap', x.k, x.chu, x.n); }).join('')+'</span>' : '';   /* 3.383 */
  /* 3.180 (anh chốt, tab Giao dịch xã — d.gonDiem): đã chọn Điểm GD → thu gọn hàng chip Xã / Điểm cho rộng; nút ▾ Đổi xã / điểm mở lại (chọn xong tự gọn) */
  /* 3.181: thu gọn cả khối (ẩn Xã · Điểm · Hội · Tổ, chỉ còn 📍 đường dẫn + 🔎) bằng lớp .gon — bấm ▾ Đổi để sổ ra; bấm vào vùng nhập thì gọn lại */
  /* 3.206 (anh chốt 14/10): mọi tab — đã chọn địa bàn thì có nút ▾ Mở rộng / ▴ Thu gọn (nhớ theo tab: D.cauHinh.pvGon[p]); gọn = 1 dòng 🏠 PGD › Xã › Điểm › Tổ (bấm từng mắt để về cấp đó) */
  /* 3.227 (anh 17/10): 📌 Ghim — ghim: khối lọc luôn mở; bỏ ghim: chọn xong tổ tự thu gọn còn 1 dòng; ⬆ Lên 1 cấp (Backspace) */
  /* 3.328 (anh chốt 23/10): 2 kiểu — ☰ Gọn (mặc định mọi nơi: 1 dòng ô sổ xuống Xã › Điểm › Hội › Tổ, ⬆ lên 1 cấp) · ▦ Chip (chip + ô sổ đủ danh sách như cũ); 📌 Ghim giữ địa bàn + kiểu khi mở lại app */
  var coChon = !!(S.xa || S.diem || S.hoi || S.ap || S.to), ghim = pvGhimCua(p), gon = pvGonCua(p),
    nutGon = '<button class="nho pv-gon" onclick="pvGonDoi(\''+p+'\')" title="'+(gon ? 'Đổi sang kiểu chip (chọn bằng chip, đủ danh sách)' : 'Đổi sang kiểu gọn 1 dòng (ô sổ xuống từng cấp)')+'">'+(gon ? '▦ Chip' : '☰ Gọn')+'</button>'+
      (coChon ? '<button class="nho pv-len" onclick="pvLen(\''+p+'\')" title="Về 1 cấp (phím Backspace)">⬆<span class="pv-chu"> Lên 1 cấp</span></button>' : '')+
      pvNutVeGhim(p, S, ghim);
  if(hD || hH || hA) hh += '<div class="pv-hang2 to-chips" data-cap="diem-hoi">'+hD+hH+hA+'</div>';   /* 3.167 (anh chốt): Điểm GD và Hội 2 thanh riêng (bỏ vạch │) */
  if(dsT.length) hh += '<div class="pv-hang2 to-chips cap-to" data-cap="to">'+nhan('Tổ')+dsT.slice(0, 30).map(function(x){ return chip('to', x.k, x.chu.split(' · ')[0], 0, toTit(x), x.ap ? pvApNgan(x.ap) : ''); }).join('')+
    '<select class="pv-to-ds'+(S.to ? ' co' : '')+'" onchange="pvChon(\''+p+'\',\'to\',this.value)" title="Đủ danh sách tổ ('+dsT.length+')"><option value="">'+(dsT.length>30 ? 'Còn '+(dsT.length-30)+' tổ — chọn ▾' : 'Chọn tổ ▾')+'</option>'+
      dsT.map(function(x){ return '<option value="'+coChuHTML(String(x.k))+'"'+(String(x.k)===S.to ? ' selected' : '')+' title="'+coChuHTML(toTit(x))+'">'+coChuHTML(chuTo(x))+'</option>'; }).join('')+'</select></div>';
  /* 📍 đường dẫn — chỉ báo (không bấm) */
  var tenCua = function(cap, ds){ var x = ds.find(function(z){ return String(z.k)===String(S[cap]); }); return x ? x.chu.split(' · ')[0] : S[cap]; };
  var o1 = function(chu, ve){ return ve ? '<button class="pv-dan-o pv-ve" onclick="'+ve+'" title="Về '+coChuHTML(chu)+'">'+coChuHTML(chu)+'</button>' : '<span class="pv-dan-o">'+coChuHTML(chu)+'</span>'; };   /* 3.206: mắt đường dẫn bấm được → về cấp đó */
  var ve = function(cap){ return 'pvVe(\''+p+'\',\''+cap+'\')'; };
  var dsHall = pvLuaChon(T, S, 'hoi', dc), dsAall = S.ap ? pvLuaChon(T, S, 'ap', dc) : [], dsTall = S.to ? pvLuaChon(T, S, 'to', dc) : [];
  var giua = [S.diem ? o1('Điểm '+tenCua('diem', dsD), S.to ? ve('to') : '') : '', S.hoi ? o1(tenCua('hoi', dsHall), S.to ? ve('to') : '') : '', S.ap ? o1(tenCua('ap', dsAall), S.to ? ve('to') : '') : ''].filter(Boolean).join('<span class="pv-sep">·</span>');
  var nTo = Object.keys(T||{}).filter(function(m){ var t = T[m]; return !t.trucTiep && !toLaTT(t) && pvLoc(S, t); }).length;
  var dan = (p==='tc' ? '' : '<span class="pv-chip-o">'+slChipHTML()+'</span>')+'<span class="pv-dan">'+(S.xa ? o1('🏠 PGD', ve('xa'))+'<span class="pv-sep">›</span>'+o1(tenCua('xa', dsX), S.diem || S.hoi || S.ap || S.to ? ve('diem') : '') : o1('🏠 Toàn PGD'))+(giua ? '<span class="pv-sep">›</span>'+giua : '')+(S.to ? '<span class="pv-sep">›</span>'+o1('Tổ '+tenCua('to', dsTall)) : '')+
    '<small class="pv-dem">'+nTo+' tổ'+(d.ghi ? ' · '+d.ghi() : '')+'</small></span>';
  var timMo = p!=='tc' && (!!pvTimQ(p) || !!PV_TIM_MO[p]);
  var tim = p==='tc' ? '' : (function(){ var q = pvTimQ(p), ham = p==='to' ? 'TO_Q=this.value;toTim()' : p==='kt' ? 'KT_Q=this.value;ktTim()' : 'PV_Q[\''+p+'\']=this.value;pvTim(\''+p+'\')';
    return '<span class="pv-tim to-tim"><span>🔎</span><input id="'+p+'-tim" autocomplete="off" value="'+coChuHTML(q||'')+'" placeholder="Tìm tổ / tổ trưởng / ấp…" oninput="'+ham+'" onkeydown="if(event.key===\'Escape\'){pvTimMo(\''+p+'\',0);}else if(event.key===\'Enter\'){var b=document.querySelector(\'#'+p+'-gy button\');if(b){event.preventDefault();b.click();}}"><div id="'+p+'-gy" class="pv-gy"></div></span>'; })();
  /* 3.390 (BAN_GIAO_TK3_2710 mục 3.1, anh duyệt hướng 27/10): ô 🔎 tìm tổ ẩn trong hàng lọc — nút 🔎 trên dải tiêu đề bấm mới mở ô gõ (đang có chữ thì luôn mở) */
  if(tim) nutGon = '<button class="nho pv-tim-nut'+(timMo ? ' bat' : '')+'" onclick="pvTimMo(\''+p+'\')" title="Tìm tổ / tổ trưởng / ấp (bấm mở ô gõ, Esc đóng)">🔎<span class="pv-chu"> Tìm tổ</span></button>'+nutGon;
  /* 3.383.7 (anh 27/10 "các dòng chip em cho cùng dòng với chữ LỌC ĐỊA BÀN nhìn hay hơn"): dòng số liệu + ▦ Chip · ⬆ · 📌 lên dải tiêu đề → hàng lọc chỉ còn ô chọn */
  h = '<div class="loc-khoi co-dau'+(gon ? ' gon' : '')+(timMo ? ' tim-mo' : '')+'"><div class="pv-dau"><span class="pv-dau-nhan">LỌC ĐỊA BÀN</span>'+dan+'<span class="pv-dau-nut">'+nutGon+'</span></div>'+
    '<div class="pv-hang1'+(hXa ? ' cap-xa' : '')+'">'+hXa+'<span class="pv-sel"><span class="pv-ghim">📍</span>'+h1+'</span>'+tim+'</div>'+hh+'</div>';   /* 3.167 (anh chốt 11/10): khối LỌC ĐỊA BÀN, mỗi cấp 1 màu, đồng bộ mọi tab */
  o.innerHTML = h;
  if(dang){ var f = document.getElementById(dang); if(f) f.focus(); }
  setTimeout(slVua, 0);
  if(d.sau) d.sau();
}
/* 3.157: 🔎 tìm nhanh tổ cho tab không có ô tìm riêng (Sao kê, Tổng hợp) — chọn → tự điền Xã › Điểm › Hội › Tổ */
var PV_Q = {};
var PV_TIM_MO = {};   /* 3.390: ô 🔎 tìm tổ đang mở (theo tab, trong phiên) */
function pvTimQ(p){ return (p==='to' ? TO_Q : p==='kt' ? KT_Q : PV_Q[p])||''; }
function pvTimMo(p, mo){   /* bấm 🔎: mở ô gõ + đặt con trỏ; bấm lại / Esc: đóng, xóa chữ đang gõ */
  var o = document.getElementById(p+'-cay'), k = o && o.querySelector('.loc-khoi'); if(!k) return;
  mo = mo===undefined ? !k.classList.contains('tim-mo') : !!mo; PV_TIM_MO[p] = mo;
  k.classList.toggle('tim-mo', mo); var n = k.querySelector('.pv-tim-nut'); if(n) n.classList.toggle('bat', mo);
  var i = document.getElementById(p+'-tim'), g = document.getElementById(p+'-gy');
  if(mo){ if(i) i.focus(); return; }
  if(p==='to') TO_Q = ''; else if(p==='kt') KT_Q = ''; else PV_Q[p] = '';
  if(i) i.value = ''; if(g) g.innerHTML = '';
}
function pvTim(p){
  var d = PV_DUNG[p], g = document.getElementById(p+'-gy'); if(!d || !g) return; var K = d.K(); if(!K) return;
  var q = slChuan(PV_Q[p]||''); if(q.length<2){ g.innerHTML = ''; return; }
  var tu = q.split(' '), ds = Object.keys(K.to).map(function(k){ return K.to[k]; }).filter(function(t){
    if(toLaTT(t)) return false; var chu = ' '+slChuan([t.ma, t.ten, t.tenThon, t.tenXa, t.tenDiem].join(' ')); return tu.every(function(w){ return chu.indexOf(w)>=0; }); }).slice(0, 8);
  g.innerHTML = ds.length ? ds.map(function(t){ return '<button onclick="pvChonTo(\''+p+'\',\''+t.ma+'\')"><b>'+coChuHTML(t.ten||('Tổ '+t.ma))+'</b> <small>'+coChuHTML([t.ma, t.tenThon, t.tenXa, tdnHoi(t.dv)].filter(Boolean).join(' · '))+'</small></button>'; }).join('')
    : '<div class="rong">Không thấy tổ khớp “'+coChuHTML(PV_Q[p])+'”.</div>';
}
var PV_MO = {};   /* 3.160: cấp đang mở lại để đổi (bấm tên trên dòng 📍) */
/* 3.383.7: kiểu gọn / chip luôn nhớ cho lần mở sau (D.cauHinh.pvKieu) — trước 3.328 chỉ nhớ khi ghim */
function pvKieuBang(){ return (D.cauHinh.pvKieu = D.cauHinh.pvKieu || {}); }
function pvVe(p, cap){ pvChon(p, cap, ''); }   /* 3.328: bấm mắt đường dẫn / ⬆ = về cấp đó (kiểu giữ nguyên) */
function pvLen(p){ var d = PV_DUNG[p]; if(!d) return false; var S = d.S(), cap = S.to ? 'to' : S.ap ? 'ap' : S.hoi ? 'hoi' : S.diem ? 'diem' : S.xa ? 'xa' : ''; if(!cap) return false; pvVe(p, cap); return true; }
document.addEventListener('keydown', function(e){   /* 3.227: Backspace (không ở ô nhập, không mở hộp) = ⬆ Lên 1 cấp ở khối lọc đang hiện */
  if(e.key!=='Backspace' || e.ctrlKey || e.altKey || e.metaKey || e.defaultPrevented) return;
  var a = e.target; if(a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) return;
  var hop = document.getElementById('hop'); if(hop && hop.classList.contains('hien')) return;
  var p = Object.keys(PV_DUNG).find(function(k){ var o = document.getElementById(k+'-cay'); return o && o.offsetParent; });
  if(p && pvLen(p)) e.preventDefault();
});
function pvGonCua(p){ return pvKieuBang()[p]!=='chip'; }   /* 3.328 (anh chốt 23/10): mặc định kiểu gọn mọi nơi */
function pvGonDoi(p){ pvKieuBang()[p] = pvGonCua(p) ? 'chip' : 'gon'; PV_MO[p] = ''; luu(); pvVeCay(p); }
function pvChonTo(p, ma){
  var d = PV_DUNG[p], K = d && d.K(), t = K && K.to[ma]; if(!t) return;
  var S = d.S(); S.xa = t.xa||''; S.diem = t.khoaDiem; S.hoi = String(t.dv||''); S.ap = ''; S.to = ma; PV_Q[p] = ''; PV_MO[p] = ''; PV_TIM_MO[p] = 0;
  luu(); pvVeCay(p);
}
function pvBoTT(T){ var r = {}; Object.keys(T||{}).forEach(function(m){ if(!toLaTT(T[m])) r[m] = T[m]; }); return r; }   /* 3.107: tab KTGS Hội kiểm tra theo tổ → cây bỏ mục vay trực tiếp */
function pvChon(p, cap, v, chip){
  var d = PV_DUNG[p]; if(!d) return;
  var S = d.S(), i = PV_CAP.map(function(c){ return c[0]; }).indexOf(cap);
  v = String(v||''); if(chip && S[cap]===v) v = '';   /* bấm lại chip đang chọn = bỏ chọn */
  PV_MO[p] = '';
  pvDatCap(S, cap, v, d.daChieu!==false);
  luu(); pvVeCay(p);
}
/* 3.383.7 (anh 27/10 "khi chọn ở 1 cấp cao hơn sẽ về theo cấp đó và mặc định tất cả của cấp thấp hơn"): đổi Xã → Điểm GD · Hội · Ấp · Tổ về Tất cả;
   đổi Điểm GD / Hội / Ấp (ngang cấp, lọc đa chiều — giữ nhau) → Tổ về Tất cả. Ô cấp dưới đang 📌 ghim giữ nguyên (không còn hợp thì cây tự bỏ). */
function pvDatCap(S, cap, v, dc){
  var i = PV_CAP.map(function(c){ return c[0]; }).indexOf(cap), g = pvGhimO();
  S[cap] = v;
  for(var j=i+1;j<PV_CAP.length;j++){ var cj = PV_CAP[j][0];
    if(dc && cap!=='xa' && (cj==='hoi' || cj==='ap')) continue;
    if(g[cj] && S[cj]===g[cj]) continue;
    S[cj] = ''; }
}
/* ---------- 3.383.7 (anh 27/10): 📌 GHIM TỪNG Ô LỌC — D.cauHinh.pvGhimO {cap: giá trị}; mở app ô ghim luôn về giá trị ghim (ưu tiên cao nhất) ---------- */
function pvGhimO(){ var c = D.cauHinh || {}; return c.pvGhimO || {}; }
function pvGhimCua(){ return Object.keys(pvGhimO()).length>0; }
function pvApGhim(S, chiGhim){   /* chiGhim: chỉ đặt ô ghim (đầu phiên, ô chưa ghim giữ phiên trước) · không: ô chưa ghim về Tất cả (nút 📌 Về địa bàn ghim) */
  var g = pvGhimO();
  if(!chiGhim) PV_CAP.forEach(function(c){ if(!g[c[0]]) S[c[0]] = ''; });
  PV_CAP.forEach(function(c){ var v = g[c[0]]; if(v && S[c[0]]!==v) pvDatCap(S, c[0], v, true); });
}
function pvGhimODoi(p, cap){ var d = PV_DUNG[p]; if(!d) return; var S = d.S(), c = D.cauHinh, g = c.pvGhimO = c.pvGhimO || {}, ten = pvTenGiaTri(p, cap, S[cap]);
  if(g[cap] && g[cap]===S[cap]){ delete g[cap]; bao('Bỏ ghim ô '+pvTenCap(cap)+'.'); }
  else if(S[cap]){ g[cap] = S[cap]; bao('📌 Đã ghim '+pvTenCap(cap)+': '+ten+' — mở app luôn về đây.'); }
  else return bao('Chọn 1 giá trị ở ô '+pvTenCap(cap)+' rồi bấm 📌 để ghim.', 3);
  if(!Object.keys(g).length) delete c.pvGhimO;
  luu(); pvVeCay(p); }
function pvNutGhimO(p, cap, chon, ds){   /* 📌 nhỏ cạnh ↺: ghim / bỏ ghim giá trị đang chọn của ô */
  var g = pvGhimO()[cap], bat = !!g && g===chon, ten = function(v){ var x = (ds||[]).find(function(z){ return String(z.k)===String(v); }); return x ? x.chu.split(' · ')[0] : v; };
  var tit = bat ? 'Đang ghim '+ten(g)+' — mở app luôn về đây (ưu tiên cao nhất). Bấm để bỏ ghim' : g ? 'Đang ghim '+ten(g)+' (đang xem chỗ khác) — bấm để ghim '+(chon ? ten(chon) : '…') : chon ? 'Ghim '+ten(chon)+': mở app luôn về đây' : 'Chọn 1 giá trị rồi bấm để ghim ô này';
  return '<button type="button" class="pv-gh'+(bat ? ' bat' : g ? ' khac' : '')+'" onclick="pvGhimODoi(\''+p+'\',\''+cap+'\')"'+(chon || g ? '' : ' disabled')+' title="'+coChuHTML(tit)+'" aria-label="Ghim ô '+coChuHTML(pvTenCap(cap))+'">📌</button>'; }
function pvNutVeGhim(p, S, ghim){   /* 📌 chung: về địa bàn ghim (ô ghim → giá trị ghim, ô khác → Tất cả) */
  var g = pvGhimO(), dung = ghim && PV_CAP.every(function(c){ return (g[c[0]]||'')===(S[c[0]]||''); });
  var tit = ghim ? (dung ? 'Đang ở đúng địa bàn ghim' : 'Về địa bàn ghim')+': '+PV_CAP.filter(function(c){ return g[c[0]]; }).map(function(c){ return pvTenCap(c[0])+' '+pvTenGiaTri(p, c[0], g[c[0]]); }).join(' · ') : 'Chưa ghim ô nào — bấm 📌 nhỏ cạnh ô lọc để ghim (mở app luôn về đó)';
  return '<button class="nho pv-ghim-nut'+(dung ? ' bat' : '')+'" onclick="pvVeGhim(\''+p+'\')"'+(ghim ? '' : ' disabled')+' title="'+coChuHTML(tit)+'">📌<span class="pv-chu"> Về ghim</span></button>'; }
function pvVeGhim(p){ var d = PV_DUNG[p]; if(!d) return; if(!pvGhimCua()) return bao('Chưa ghim ô nào — bấm 📌 nhỏ cạnh ô lọc để ghim.', 4);
  pvApGhim(d.S(), false); PV_MO[p] = ''; luu(); pvVeCay(p); }
function pvTenCap(cap){ var x = PV_CAP.find(function(c){ return c[0]===cap; }); return x ? x[1] : cap; }
function pvTenGiaTri(p, cap, v){ var d = PV_DUNG[p], K = d && d.K(); if(!K || !v) return v||''; var x = pvLuaChon(d.boTT ? pvBoTT(K.to) : K.to, d.S(), cap, d.daChieu!==false).find(function(z){ return String(z.k)===String(v); }); return x ? x.chu.split(' · ')[0] : v; }
/* dòng / tổ có nằm trong phạm vi không (t = thông tin tổ; dòng không có tổ chỉ thuộc phạm vi Toàn PGD) */
function pvLoc(S, t){
  if(!S.xa) return (!S.hoi || (!!t && String(t.dv||'')===S.hoi)) && (!S.ap || (!!t && pvApKhoa(t)===S.ap)); if(!t) return false;   /* 3.133: Hội toàn PGD (chỉ tab Tổ chọn được Hội khi chưa chọn xã) */
  if(t.xa!==S.xa) return false; if(S.diem && t.khoaDiem!==S.diem) return false;
  if(S.hoi && String(t.dv||'')!==S.hoi) return false; if(S.ap && pvApKhoa(t)!==S.ap) return false; if(S.to && t.ma!==S.to) return false;
  return true;
}
function pvChu(S, K){
  var hoiTen = function(h){ return String(h)==='99' ? 'Vay trực tiếp' : (tdnHoi(h)||'Hội '+h); };
  var T = (K && K.to) || {}, apTen = function(){ var k = Object.keys(T).find(function(m){ return pvApKhoa(T[m])===S.ap; }), t = k ? T[k] : null; return t ? pvApChu(t) : S.ap; };   /* 3.383 */
  if(!S.xa) return 'Toàn PGD'+(S.hoi ? ' · '+hoiTen(S.hoi) : '')+(S.ap ? ' · '+apTen() : '');
  var mot = function(f, v){ var k = Object.keys(T).find(function(m){ return String(T[m][f]||'')===v; }); return k ? T[k] : {}; };
  var r = [mot('xa', S.xa).tenXa || S.xa];
  if(S.diem){ var td = mot('khoaDiem', S.diem); r.push('Điểm '+(td.tenDiemDu||S.diem)); }
  if(S.hoi) r.push(hoiTen(S.hoi)+(S.diem || S.ap ? '' : ' (cả xã)'));
  if(S.ap) r.push(apTen());
  if(S.to){ var tt = T[S.to] || {}; r.push('Tổ '+(tt.ten||S.to)); }
  return r.join(' · ');
}
SG_CAY['to-xa'] = 'Xã / phường'; SG_CAY['to-diem'] = 'Điểm giao dịch';
PV_DUNG.to = {S:function(){ return toCH(); }, K:function(){ return KHO.kyDung(); }, sau:function(){ toVeThe(); }, toBatBuoc:true, daChieu:true};   /* 3.133: chọn đa chiều chỉ ở tab Tổ (anh chốt) */
PV_DUNG.kt = {S:function(){ return ktCH(); }, K:function(){ return KT_K; }, sau:function(){ ktVeThe(); }, toBatBuoc:true, boTT:true};   /* 3.93: tab KTGS Hội */
