/* ===== 3.452 (anh 02/11 "làm tiếp 10B, 10C theo đúng quy chuẩn 10A") — PHẦN CHUNG mẫu Hồ sơ Tổ làm lại theo QUY_CHUAN_KIEN_TRUC.md mục 9.8 =====
   Dùng cho 10B, 10C (10A còn bản riêng trong js/mau/10a.js — chuyển sang dùng chung ở lần sửa 10A tới). Cắm rút: bỏ file → 10B / 10C mới không chạy, app dùng hsoLap10b / 10c cũ.
   - HST.ds(t): tổ viên (KHO) + tổ trưởng / tổ phó theo File Tổ trưởng (MATT / MATP) dù không vay, sắp Mã KH, kèm ấp.
   - HST.bo(MK, V, G, P): bộ hàm in — o (có chữ → liền, in thường; trống → chấm), g (ô 1 giá trị: ⌨ / 📝 đè số liệu), ong ("Ông (Bà): tên" / chấm), dvA (ấp / khu phố / thôn, xã / phường),
     tab / tabP (họ tên ⇥ "Chức vụ"), tieuDe (BIÊN BẢN HỌP + Về việc vừa dòng + kẻ dài bằng chữ tiêu đề), hoa.
   - HST.bang(t, ds, cot, op): bảng hộ vay của tổ ở cột trái — cột tích theo mẫu (In / Kết nạp / Cho ra), Mã KH, họ tên (TT / TP), dư nợ, ghi chú, sắp, lọc ấp, tìm. ES5. */
var HST = (function(){
  var X = {};
  X.hoi = function(h){ return String(h||'').replace(/\s+(xã|phường|thị trấn|đặc khu)\s+.*$/i, '').trim(); };   /* Hội: bỏ xã / phường (anh 02/11) */
  X.capAp = function(t, T){ var m = /^(ấp|ap|khu phố|kp|thôn|tổ dân phố)\.?\s/i.exec(String((t && t.tenThon) || ''));
    return m ? (/^(kp|khu)/i.test(m[1]) ? 'khu phố' : /^ap$/i.test(m[1]) ? 'ấp' : m[1].toLowerCase()) : ((T && T.capAp) || 'thôn'); };
  X.capXa = function(T){ return T && T.xaDu && T.xa ? T.xaDu.slice(0, T.xaDu.length-T.xa.length).trim() || 'xã' : 'xã'; };
  X.ds = function(t){ if(!t) return []; var sx = function(s){ return typeof sxChuan==='function' ? sxChuan(s||'') : String(s||'').toLowerCase(); };
    var ds = hsoTVTo(t).map(function(k){ return {kh:String(k.kh||''), ten:k.ten, dn:k.dn||0, vay:true, k:k, vao:k.vao, chuaGN:k.chuaGN, ap:k.ap || ''}; }), co = {}, T = hsoTo(t), d = t.ds || {}, b = KHO.bangTo(t.ma) || {};
    ds.forEach(function(x){ if(x.kh) co[x.kh] = x; });
    var them = function(kh, ten, vai){ kh = String(kh||'').trim(); var x = kh ? co[kh] : null;
      if(!x && ten) x = ds.find(function(z){ return z.vay && sx(z.ten)===sx(ten); }) || null;
      if(x){ x.vai = vai; return; } if(!kh && !ten) return; var y = {kh:kh, khoa:kh ? '' : vai, ten:ten, dn:0, vay:false, vai:vai, ap:t.tenThon || ''}; ds.push(y); if(kh) co[kh] = y; };
    them(d.ttKH || b.kh, d.toTen || T.tt, 'TT'); them(d.phoKH, T.phoKB ? T.pho : (d.phoTen || T.pho), 'TP');
    return ds.sort(function(a, c){ if(!a.kh !== !c.kh) return a.kh ? -1 : 1; return String(a.kh).localeCompare(String(c.kh), 'vi', {numeric:true}); }); };
  X.khoa = function(x){ return x.kh || x.khoa; };
  /* tách ô gộp (1 lần / mẫu): cách đã chọn ở ô cũ → ô con; Chọn nhanh ô cũ → ô con */
  X.tach = function(MK, map){ var L = hsoLuu(), f = 'tach'+MK+'_3452'; if(L[f]) return; L[f] = 1; var c = (L.cham||{})[MK] || {}, nh = (L.nhanh||{})[MK], oK = (OM_MAU[MK] || {}).oK || {};
    Object.keys(map).forEach(function(k){ map[k].forEach(function(z){ if(c[k] && !c[z]) c[z] = c[k]; if(Array.isArray(nh) && nh.indexOf(k)>=0 && nh.indexOf(z)<0) nh.push(z); });
      if(Array.isArray(nh) && !oK[k]){ var i = nh.indexOf(k); if(i>=0) nh.splice(i, 1); } }); };
  /* bộ hàm in của 1 lần lập mẫu */
  X.bo = function(MK, V, G, P, op){ op = op || {}; var J = 'text-align:justify;', F = 'text-indent:12.7mm;', DON = op.don || {};
    var b = {};
    b.C = function(k){ return omCach(MK, k)!=='cham'; };
    b.o = function(k, ch, o2){ var r = G.o(k, ch, Object.assign({lien:1}, o2 || {})); return /om-cham/.test(r) ? r : r.replace('<span ', '<span style="font-weight:normal" '); };
    b.g = function(k, v){ var c = omCach(MK, k); if(c==='cham') return ''; if(DON[k] && (c==='kb' || c==='mau')){ var x = G.gt(k); if(x) return x; } return v!=null ? String(v) : ''; };
    b.hoa = function(x){ x = String(x||''); return x.charAt(0).toUpperCase()+x.slice(1); };
    b.apL = V.ap ? V.capAp : 'thôn';
    b.ong = function(k, ch, v, nho){ var gt = b.g(k, v), O = nho ? 'Ông (bà)' : 'Ông (Bà)'; return gt ? O+': '+b.o(k, ch, {gt:gt}) : O+' '+b.o(k, ch, {gt:''}); };
    b.coTen = function(k, v){ return !!b.g(k, v); };
    b.dvA = function(k, chA, chX, dau){ var ap = b.g(k, V.ap), xa = b.g(k, V.xa);
      return (ap ? (dau ? b.hoa(V.capAp) : V.capAp)+' '+b.o(k, chA, {gt:ap}) : (dau ? 'Thôn' : 'thôn')+' '+b.o(k, chA, {gt:''}))+', '+(xa ? V.capXa+' '+b.o(k, chX, {gt:xa}) : 'xã '+b.o(k, chX, {gt:''})); };
    var rong = function(h){ return omRong(String(h).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'), 14); };
    b.TAB = 95;
    b.tabVi = function(truoc, sau){ var w1 = 12.7+rong(truoc), w2 = rong(sau); if(Math.max(w1+4, b.TAB)+w2<=159) return Math.max(w1+4, b.TAB); return w1+4+w2<=159 ? Math.ceil(w1+4) : b.TAB; };
    b.tab = function(truoc, sau, v){ v = v || b.tabVi(truoc, sau); return '<span style="display:inline-block;text-indent:0;min-width:'+(v-12.7).toFixed(1)+'mm">'+truoc+'</span><span class="tab" style="display:inline-block;width:3mm"></span>'+sau; };
    b.tabP = function(truoc, sau, st, v0){ var v = v0 || b.tabVi(truoc, sau), dai = Math.max(v, 12.7+rong(truoc)+4)+rong(sau) > 159;
      return P(b.tab(truoc, sau, v), F+(st||'')+(dai ? 'text-align:left;' : J)).replace('<p ', '<p data-tab="'+Math.round(v)+'" '); };
    /* BIÊN BẢN HỌP (15) + "Về việc …" (vừa 1 dòng: 14 → 13 → 2 dòng cân) + kẻ dài bằng chữ BIÊN BẢN HỌP; vv = '' → giữ chấm */
    b.tieuDe = function(vv, cham, sau){ var keW = omRong('BIÊN BẢN HỌP', 15, true).toFixed(1), ke = '<p class="ke" data-ke="'+keW+'" style="width:'+keW+'mm;margin:4pt auto 0"></p>', h = P('<b>BIÊN BẢN HỌP</b>', 'text-align:center;font-size:15pt').replace('<p ', '<p class="s15" ');
      if(!vv) return h+P('<b>Về việc '+b.o('vv', cham, {gt:''})+'</b>'+(sau || ''), 'text-align:center')+ke;
      var tx = 'Về việc '+vv, co = omRong(tx, 14, true) <= 158 ? 14 : omRong(tx, 13, true) <= 158 ? 13 : 0, x = coChuHTML(tx);
      if(!co){ var w = tx.split(' '), cat = tx.indexOf(' theo '), tu = cat>0 ? tx.slice(0, cat).split(' ').length : Math.ceil(w.length/2); x = coChuHTML(w.slice(0, tu).join(' '))+'<br>'+coChuHTML(w.slice(tu).join(' ')); }
      return h+P('<b><span class="om om-kb" data-o="vv">'+x+'</span></b>'+(sau || ''), 'text-align:center'+(co===13 ? ';font-size:13pt' : '')).replace('<p ', co===13 ? '<p class="s13" ' : '<p ')+ke; };
    return b; };
  /* nối các nội dung "Về việc" đã chọn: "a, b và c" */
  X.noi = function(a){ a = (a||[]).filter(Boolean); return a.length<2 ? (a[0] || '') : a.slice(0, -1).join(', ')+' và '+a[a.length-1]; };
  /* bảng hộ vay của tổ (cột trái) — cot = [{ma, ten, bang (HSO.x), khoa?(x) → không cho tích (lý do)}]; op = {tieu, ghiChu} */
  var LOC = {ap:'', q:''};
  X.bang = function(t, ds, cot, op){ op = op || {}; if(!X.bang.dk && typeof GD!=='undefined'){ X.bang.dk = 1;
      GD.dangKy('hst', {tich:function(el){ var c = el.getAttribute('data-c'), k = el.getAttribute('data-k'), cs = (X.bang.cot || []).find(function(z){ return z.ma===c; }); if(!cs) return;
          cs.bang[k] = el.checked; if(el.checked) (X.bang.cot || []).forEach(function(z){ if(z.ma!==c && z.loai) z.bang[k] = false; }); hsoVe(); },   /* kết nạp ↔ cho ra loại trừ nhau */
        sap:function(el){ HSO.tvSap = el.getAttribute('data-s'); hsoVe(); }, ap:function(el){ LOC.ap = el.value; hsoVe(); },
        tim:function(el){ LOC.q = el.value; clearTimeout(X.bang.hen); X.bang.hen = setTimeout(hsoVe, 400); },
        het:function(el){ var c = el.getAttribute('data-c'), v = el.getAttribute('data-v')==='1', cs = (X.bang.cot || []).find(function(z){ return z.ma===c; }); if(!cs) return;
          (X.bang.dang || []).forEach(function(x){ var k = X.khoa(x); if(cs.khoa && cs.khoa(x)) return; cs.bang[k] = v; if(v) (X.bang.cot || []).forEach(function(z){ if(z.ma!==c && z.loai) z.bang[k] = false; }); }); hsoVe(); },
        bo0:function(el){ var c = el.getAttribute('data-c'), cs = (X.bang.cot || []).find(function(z){ return z.ma===c; }); if(!cs) return; (X.bang.ds || []).forEach(function(x){ if(!(x.dn>0) && !x.vai) cs.bang[X.khoa(x)] = false; }); hsoVe(); }}); }
    X.bang.cot = cot; X.bang.ds = ds;
    var e = coChuHTML, ky = KHO.coKy() ? slKyChu(KHO.ky().ky) : '', sapK = HSO.tvSap || 'kh';
    var aps = []; ds.forEach(function(x){ if(x.ap && aps.indexOf(x.ap)<0) aps.push(x.ap); });
    var q = typeof sxChuan==='function' ? sxChuan(LOC.q||'') : String(LOC.q||'').toLowerCase();
    var dang = ds.filter(function(x){ return (!LOC.ap || x.ap===LOC.ap) && (!q || (typeof sxChuan==='function' ? sxChuan((x.ten||'')+' '+x.kh) : (x.ten+' '+x.kh).toLowerCase()).indexOf(q)>=0); });
    X.bang.dang = dang;
    var sap = sapK==='dn' ? dang.slice().sort(function(a, b){ return (a.dn||0)-(b.dn||0) || String(a.kh).localeCompare(String(b.kh), 'vi', {numeric:true}); }) : dang;
    var ghi = function(x){ var r = op.ghiChu ? op.ghiChu(x) : ''; if(r) return r; return !x.vay ? (x.vai ? 'không có món vay' : '') : !(x.dn>0) ? (x.chuaGN ? 'chưa giải ngân' : 'dư nợ = 0') : (x.vao ? 'mới vào tổ' : ''); };
    var th = function(s, chu){ return '<th><button class="nho'+(sapK===s ? ' bat' : '')+'" data-lenh="hst.sap" data-s="'+s+'">'+chu+(sapK===s ? ' ▲' : '')+'</button></th>'; };
    var dsTT = ds.filter(function(x){ return x.vai; }).map(function(x){ return x.vai; });
    var nut = cot.map(function(c){ var n = dang.filter(function(x){ return c.bang[X.khoa(x)] && !(c.khoa && c.khoa(x)); }).length;
      return '<span class="th-cap">'+e(c.ten)+': <b>'+n+'</b></span><button class="nho" data-lenh="hst.het" data-c="'+c.ma+'" data-v="1">Tích hết'+(dang.length<ds.length ? ' (đang lọc)' : '')+'</button><button class="nho" data-lenh="hst.het" data-c="'+c.ma+'" data-v="0">Bỏ hết</button>'+
        (c.bo0 ? '<button class="nho" data-lenh="hst.bo0" data-c="'+c.ma+'" title="Giữ tổ trưởng, tổ phó">Bỏ tích hộ dư nợ = 0</button>' : ''); }).join(' · ');
    return '<div class="nhan-nhom">👥 '+e(op.tieu || 'Hộ vay của tổ')+' — '+(ky ? 'số liệu '+e(ky) : 'chưa có số liệu')+' <small>(in theo thứ tự Mã KH)</small></div>'+
      (dsTT.indexOf('TT')<0 ? '<div class="sl-phu hso-canh">⚠ Chưa rõ tổ trưởng (File Tổ trưởng / Mẫu 31).</div>' : '')+(dsTT.indexOf('TP')<0 ? '<div class="sl-phu hso-canh">⚠ Chưa rõ tổ phó (File Tổ trưởng chưa có / chưa nạp).</div>' : '')+
      (op.dau || '')+'<div class="hang-nut">'+(aps.length>1 ? '<select data-lenh="hst.ap" data-su="change"><option value="">Mọi ấp</option>'+aps.map(function(a){ return '<option'+(a===LOC.ap ? ' selected' : '')+'>'+e(a)+'</option>'; }).join('')+'</select>' : '')+
        '<input data-lenh="hst.tim" data-su="input" placeholder="🔎 tên / mã KH" value="'+e(LOC.q||'')+'"></div><div class="hang-nut">'+nut+'</div>'+
      '<div class="bang-cuon"><table class="bang hso-tv10a"><thead><tr>'+cot.map(function(c){ return '<th>'+e(c.ten)+'</th>'; }).join('')+'<th>#</th>'+th('kh', 'Mã KH')+'<th>Họ tên</th>'+th('dn', 'Dư nợ')+'<th>Ghi chú</th></tr></thead><tbody>'+
      sap.map(function(x, i){ var k = X.khoa(x);
        return '<tr class="'+(!(x.dn>0) && x.vay ? 'vang' : '')+'">'+cot.map(function(c){ var kh = c.khoa && c.khoa(x); return '<td>'+(kh ? '<span title="'+e(kh)+'">⚠</span>' : '<input type="checkbox" data-lenh="hst.tich" data-su="change" data-c="'+c.ma+'" data-k="'+e(k)+'"'+(c.bang[k] ? ' checked' : '')+'>')+'</td>'; }).join('')+
          '<td>'+(i+1)+'</td><td>'+e(x.kh || '—')+'</td><td>'+e(tenHoaDau(x.ten||''))+(x.vai ? ' <span class="tc-vt'+(x.vai==='TP' ? ' tp' : '')+'">'+x.vai+'</span>' : '')+'</td><td class="s">'+(x.vay ? tdnTien(x.dn||0) : '—')+'</td><td><small>'+e(ghi(x))+'</small></td></tr>'; }).join('')+
      '</tbody></table></div>'+(op.cuoi || ''); };
  /* 3.456 / 3.457 (anh 02/11 "số tv tham dự tối thiểu 50%, tỷ lệ chỉnh được > 50% <= 100%, để sẵn 100%, tăng giảm được"; 10B / 10C "làm luôn"):
     số tham dự = số tổ viên × tỷ lệ (làm tròn lên, luôn > 1/2); tán thành = số tham dự × tỷ lệ (luôn > 2/3, QĐ 70). Tỷ lệ nhớ riêng từng mẫu: hsoLuu().tlHop[mẫu][du | bq]. */
  X.TL = {du:[51, 'tham dự', 1/2], bq:[67, 'tán thành', 2/3]};
  X.tl = function(mk, k){ var v = +(((hsoLuu().tlHop || {})[mk] || {})[k]); return v>=X.TL[k][0] && v<=100 ? v : 100; };
  X.so = function(n, r, phan){ n = +n || 0; if(!n) return 0; var lo = Math.floor(n*phan)+1; return Math.min(n, Math.max(lo, Math.ceil(n*r/100-1e-9))); };
  X.thamDu = function(mk, n){ n = +n || 0; return n ? X.so(n, X.tl(mk, 'du'), 1/2)+'/'+n : ''; };   /* "tham dự/tổng" */
  X.bq = function(mk, kDu, duTu){ var c = omCach(mk, kDu), v = c==='cham' ? '' : c==='kb' && omKB(mk, kDu) ? omKB(mk, kDu) : duTu, y = parseInt(String(v || ''), 10);   /* theo số tham dự in ở trên */
    return y>0 ? X.so(y, X.tl(mk, 'bq'), 2/3)+'/'+y : ''; };
  X.tlHTML = function(mk, k){ if(!X.tlHTML.dk && typeof GD!=='undefined'){ X.tlHTML.dk = 1;
      GD.dangKy('hstl', {cong:function(el){ var m = el.getAttribute('data-mk'), q = el.getAttribute('data-k'); X.tlDat(m, q, X.tl(m, q)+(+el.getAttribute('data-d'))); }, go:function(el){ X.tlDat(el.getAttribute('data-mk'), el.getAttribute('data-k'), +el.value); }}); }
    var v = X.tl(mk, k), lo = X.TL[k][0], a = ' data-mk="'+mk+'" data-k="'+k+'"';
    return '<span class="hso-sw om-tl" title="Tỷ lệ '+X.TL[k][1]+' ('+lo+'–100%)"><button data-lenh="hstl.cong"'+a+' data-d="-5"'+(v<=lo ? ' disabled' : '')+'>−</button>'+
      '<input type="number" min="'+lo+'" max="100" value="'+v+'" data-lenh="hstl.go" data-su="change"'+a+'><b>%</b><button data-lenh="hstl.cong"'+a+' data-d="5"'+(v>=100 ? ' disabled' : '')+'>+</button></span>'; };
  X.tlDat = function(mk, k, v){ var lo = X.TL[k][0]; v = Math.round(+v || 0);
    if(v<lo){ bao('Tỷ lệ '+X.TL[k][1]+' phải '+(k==='du' ? 'trên 50%' : 'trên 2/3')+' — đặt '+lo+'%.', 4); v = lo; } if(v>100) v = 100;
    var L = hsoLuu(); L.tlHop = L.tlHop || {}; (L.tlHop[mk] = L.tlHop[mk] || {})[k] = v; luu(); hsoVe(); if(typeof omKBDsVe==='function') omKBDsVe(mk); if(document.getElementById('om-kbt')) omKBVe(); };
  X.nhanhThem = function(mk, co, ds){ var L = hsoLuu(); if(L[co]) return; var nh = omNhanh(mk); ds.forEach(function(k){ if(nh.indexOf(k)<0) nh.push(k); }); L[co] = 1; };   /* ô mới vào Chọn nhanh 1 lần */
  /* ===== 3.463 (anh 04/11 "làm Mẫu 11 mới theo chuẩn 10A", "làm luôn mẫu 11 cũ song song", "nhớ chuyển qua mẫu chung") ===== */
  /* đoạn văn chung của mẫu Hồ sơ Tổ (trước mỗi file mẫu 1 bản P giống hệt): dòng nowrap quá rộng → nén khoảng trắng / ký tự; justify → co khoảng trắng nen mm (mặc định −0,25; 11 cũ 0) */
  X.P = function(noi, s, nen){ s = s || ''; if(s && !/;$/.test(s)) s += ';'; nen = nen==null ? -0.25 : nen;
    var mm = function(k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; };
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm('text-indent') - mm('margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:'+nen+'mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; };
  /* chữ liền đứng sau chữ in sẵn không có khoảng trắng (mẫu gốc: chấm dính chữ) → có số liệu thì thêm khoảng trắng; trống giữ chấm y gốc */
  X.sp = function(r, sau){ return /om-cham/.test(r) ? r : ' '+r+(sau ? ' ' : ''); };
  /* TỔ TRƯỞNG KÝ HỢP ĐỒNG — anh 04/11: "tổ trưởng lấy theo danh sách tổ mới nhất"; "khi cần in bổ sung lại tổ cũ thì chọn dữ liệu cũ" (QT-C-18 / QT-C-22).
     Nguồn chọn ở cột trái, nhớ theo tổ: hsoLuu().ttNguon[mã tổ] = 'moi' (mặc định — Danh sách tổ mới nhất có tổ) | kỳ 1 bản Danh sách tổ | 'm31' (Mẫu 31 kỳ đang chọn). */
  var TTDS = null, TTKY = '', TTDANG = 0;
  X.ttDs = function(){ var ky = typeof KHO!=='undefined' ? KHO.dsBang('dsto').map(function(e){ return e.ky+'|'+(e.luc||''); }).sort().join(',') : '';   /* đổi khi nạp thêm / xóa bản Danh sách tổ → đọc lại */
    if(TTDS && TTKY===ky) return TTDS; if(!ky){ TTDS = []; TTKY = ky; return TTDS; }
    if(!TTDANG && typeof dsTTDs==='function'){ TTDANG = 1; dsTTDs().then(function(b){ TTDS = b || []; TTKY = ky; TTDANG = 0; if(typeof hsoVe==='function') hsoVe(); }, function(){ TTDS = []; TTKY = ky; TTDANG = 0; }); }
    return null; };
  X.ttChon = function(t){ return (t && (hsoLuu().ttNguon || {})[t.ma]) || 'moi'; };
  X.tt = function(t){ if(!t) return {}; var chon = X.ttChon(t), ds = X.ttDs() || [], r = null, b = null, bao = '';
    var tim = function(x){ return (x.rows || []).find(function(o){ return o.to===t.ma; }) || null; };
    if(chon!=='m31'){
      if(chon!=='moi'){ b = ds.find(function(x){ return x.ky===chon; }) || null; r = b ? tim(b) : null; if(!r){ bao = 'Danh sách tổ '+(b ? slKyChu(b.ky) : 'đã chọn')+' không có tổ này → lấy bản gần nhất có tổ.'; b = null; } }
      if(!r) for(var i = 0; i < ds.length; i++){ r = tim(ds[i]); if(r){ b = ds[i]; break; } } }
    if(r && (r.toTen || r.ttKH)){ var kh = String(r.ttKH || ''), c = kh && typeof KHO!=='undefined' ? (KHO.khach(kh, t) || {}) : {};
      return {ten:r.toTen || t.ten || '', kh:kh, cccd:r.cccd || '', ncap:r.ncap || '', noiCap:(c.cccd && String(c.cccd)===String(r.cccd || '') ? c.noiCap || '' : ''), nguon:'Danh sách tổ '+slKyChu(b.ky), chon:chon, bao:bao}; }
    var K = hsoTTKH(t), c2 = K.kh ? hsoKhach(K.kh, t) : {};
    if(chon!=='m31' && !bao && X.ttDs()) bao = ds.length ? 'Danh sách tổ đã nạp không có tổ này → lấy theo Mẫu 31.' : 'Chưa nạp Danh sách tổ → lấy theo Mẫu 31.';
    return {ten:t.ten || '', kh:K.kh || '', cccd:c2.cccd || '', ncap:c2.ncap || '', noiCap:c2.noiCap || '', nguon:'Mẫu 31'+(KHO.coKy() ? ' '+slKyChu(KHO.ky().ky) : ''), chon:chon, bao:bao}; };
  X.ttHTML = function(t){ if(!t) return ''; if(!X.ttHTML.dk && typeof GD!=='undefined'){ X.ttHTML.dk = 1;
      GD.dangKy('hstt', {chon:function(el){ var L = hsoLuu(), m = el.getAttribute('data-to'); L.ttNguon = L.ttNguon || {}; if(el.value==='moi') delete L.ttNguon[m]; else L.ttNguon[m] = el.value; luu(); hsoVe(); },
        ve:function(el){ var L = hsoLuu(); if(L.ttNguon) delete L.ttNguon[el.getAttribute('data-to')]; luu(); hsoVe(); }}); }
    var e = coChuHTML, ds = X.ttDs(), x = X.tt(t), chon = x.chon, a = ' data-to="'+e(t.ma)+'"';
    var op = [['moi', 'Danh sách tổ mới nhất'+(ds && ds.length ? ' ('+slKyChu(ds[0].ky)+')' : '')]].concat((ds || []).map(function(b){ var co = (b.rows || []).some(function(o){ return o.to===t.ma; });
        return [b.ky, 'Danh sách tổ '+slKyChu(b.ky)+(co ? '' : ' — không có tổ này')]; })).concat([['m31', 'Mẫu 31 kỳ đang chọn']]);
    return '<div class="nhan-nhom">👑 Tổ trưởng ký hợp đồng</div>'+
      hsoTuyO('Lấy theo', '<select data-lenh="hstt.chon" data-su="change"'+a+'>'+op.map(function(z){ return '<option value="'+e(z[0])+'"'+(z[0]===chon ? ' selected' : '')+'>'+e(z[1])+'</option>'; }).join('')+'</select>')+
      (chon!=='moi' ? '<button class="nho" data-lenh="hstt.ve"'+a+' title="In bổ sung tổ cũ xong → về Danh sách tổ mới nhất">↺ Về mới nhất</button>' : '')+
      '<div class="sl-phu">'+(x.ten ? '<b>'+e(tenHoaDau(x.ten))+'</b>' : '⚠ chưa có tên tổ trưởng')+(x.kh ? ' · '+e(x.kh) : '')+' · CCCD '+(x.cccd ? e(x.cccd) : 'chưa có (để chấm)')+' — theo '+e(x.nguon)+'</div>'+
      (x.bao ? '<div class="sl-phu hso-canh">⚠ '+e(x.bao)+'</div>' : '')+(ds===null ? '<div class="sl-phu">Đang đọc Danh sách tổ…</div>' : ''); };
  /* cột trái chung Hợp đồng ủy nhiệm (11 mới, 11 cũ) */
  X.hdTrai = function(t, mk){ return hsoNgayTuy('Ngày ký', 'Trống = chấm.')+'<div class="sl-phu">Bên A (PGD) lấy ở <a href="#" onclick="event.preventDefault();hsoKBHop(\'pgd\')">⚙ Khai báo chung</a>'+(hsoPGD('daiDien') ? '' : ' — <b>chưa khai người đại diện</b>')+'.</div>'+
    X.ttHTML(t)+(typeof omCo==='function' && omCo(mk) && typeof omNhanhHTML==='function' ? omNhanhHTML(mk) : ''); };
  return X;
})();
