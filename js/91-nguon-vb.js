/* ===== 3.438 (anh 01/11 "đồng ý em code") — NGUỒN VĂN BẢN THEO SỐ HIỆU: tự gắn tag 3 nhóm + nhận đúng loại văn bản Trung ương =====
   🏛 VB Trung ương  — Quốc hội, Chính phủ, Thủ tướng, Bộ, NHNN: số hiệu dạng số/NĂM/ký hiệu (54/2026/NĐ-CP, 05/2024/TT-NHNN, …/QH15) hoặc ký hiệu -CP, -TTg, -BTC, -NHNN…
   🏦 NHCSXH Trung ương — Hội sở chính, HĐQT: HĐQT, NHCS-TDNN, NHCS-TDSV, NHCS-KHNV, HD-NHCS
   📍 Chỉ đạo của Tỉnh — NHCS-KHTD (anh 01/11: "của ngân hàng tỉnh thường có dạng NHCS-KHTD"); ký hiệu khác chưa có trong danh sách → không gắn (không đoán).
   Khai / sửa văn bản: gõ số hiệu → tự thêm chip tag (anh gỡ được). Văn bản cũ: nút 🏷 ở đầu tab Văn bản, anh bấm mới gắn (không tự sửa dữ liệu cũ).
   Danh mục loại: thêm Nghị định, Thông tư, Nghị quyết, Chỉ thị, Luật (giữ nguyên danh mục cũ). Lọc: dùng bộ lọc tag sẵn có của tab. Cắm rút: bỏ dòng <script> là mất. ES5. */
var VBN = {
  tw:'VB Trung ương', nhcs:'NHCSXH Trung ương', tinh:'Chỉ đạo của Tỉnh',
  kyTW:/-(CP|TTG|QH\d*|UBTVQH\d*|BTC|NHNN|BLĐTBXH|BNNPTNT|BKHĐT|BTP|BNV|BXD|BGDĐT|BYT|BCT|BTNMT|BQP|BCA|TTCP|VPCP|BTTTT|BVHTTDL|BKHCN|BNG|UBDT)\b/,
  kyNHCS:/HĐQT|NHCS-(TDNN|TDSV|KHNV)\b|\bHD-NHCS\b/,
  kyTinh:/NHCS-KHTD\b/,
  loaiMoi:['Nghị định', 'Thông tư', 'Nghị quyết', 'Chỉ thị', 'Luật']
};
function vbnNhom(so){   /* → tên tag hoặc '' */
  var s = String(so||'').toUpperCase().replace(/\s+/g, ''); if(s.indexOf('/')<0) return '';
  if(VBN.kyTinh.test(s)) return VBN.tinh;
  if(VBN.kyNHCS.test(s)) return VBN.nhcs;
  if(/NHCS/.test(s)) return '';
  if(/^\d+\/\d{4}\/[A-ZĐ0-9&-]+$/.test(s) || VBN.kyTW.test(s) || /\/QH\d+$/.test(s)) return VBN.tw;
  return '';
}
function vbnLoai(so){   /* loại văn bản Trung ương theo ký hiệu (doanLoai gọi trước luật cũ) */
  var s = String(so||'').toUpperCase(); if(!vbnNhom(so) || vbnNhom(so)!==VBN.tw) return '';
  if(/\bNĐ-|\/NĐ\b/.test(s)) return 'Nghị định';
  if(/\bTT-|\/TT\b/.test(s)) return 'Thông tư';
  if(/\bNQ-|\/NQ\b/.test(s)) return 'Nghị quyết';
  if(/\bCT-|\/CT\b/.test(s)) return 'Chỉ thị';
  if(/\/QH\d+$/.test(s)) return 'Luật';
  if(/\bQĐ-|\bQD-/.test(s)) return 'Quyết định';
  return '';
}
function vbnDanhMuc(){   /* thêm loại mới vào danh mục (1 lần, giữ thứ tự cũ) */
  var L = D.cauHinh.loaiVB = D.cauHinh.loaiVB || []; var them = VBN.loaiMoi.filter(function(x){ return L.indexOf(x)<0; });
  if(them.length && !D.cauHinh.loaiVB3438){ them.forEach(function(x){ L.push(x); }); D.cauHinh.loaiVB3438 = 1; luu(); }
}
function vbnTuGan(){   /* hộp khai / sửa: số hiệu → chip tag nhóm (chưa có thì thêm); ô Loại có đủ loại mới */
  vbnDanhMuc(); var sl = document.getElementById('s-loai');
  if(sl) VBN.loaiMoi.filter(function(x){ return (D.cauHinh.loaiVB||[]).indexOf(x)>=0; }).forEach(function(x){ if(![].some.call(sl.options, function(op){ return op.value===x || op.text===x; })){ var op = document.createElement('option'); op.text = x; sl.add(op); } });
  var e = document.getElementById('s-so'), go = document.getElementById('s-tag-go'); if(!e || !go) return;
  var t = vbnNhom(e.value); if(!t) return;
  if(layGon('s-nv').indexOf(t)>=0) return;
  go.insertAdjacentHTML('beforebegin', tgChipHTML(t)); if(typeof tgHd==='function') tgHd();
}
function vbnCanGan(){ return (D.vanBan||[]).filter(function(v){ var t = vbnNhom(v.soHieu); return t && (v.the||[]).indexOf(t)<0; }); }
function vbnGanCu(){
  var ds = vbnCanGan(); if(!ds.length) return bao('Văn bản cũ đã đủ tag nguồn (Trung ương / NHCSXH Trung ương / Tỉnh).', 3);
  var dem = {}; ds.forEach(function(v){ var t = vbnNhom(v.soHieu); dem[t] = (dem[t]||0)+1; });
  hoi('🏷 Gắn tag nguồn cho '+ds.length+' văn bản cũ?', Object.keys(dem).map(function(k){ return k+': '+dem[k]; }).join(' · ')+' — theo số hiệu; chỉ thêm tag, không đổi gì khác.', 'Gắn tag', function(){
    ds.forEach(function(v){ var t = vbnNhom(v.soHieu); v.the = v.the || []; if(v.the.indexOf(t)<0) v.the.push(t); v.suaLuc = new Date().toISOString(); });
    luu(); bao('Đã gắn tag nguồn cho '+ds.length+' văn bản.', 3); if(typeof ve==='function') ve(); });
}
function vbnNut(){
  vbnDanhMuc();
  if(!vbnNut.dk && typeof GD!=='undefined'){ vbnNut.dk = 1; GD.dangKy('vbn', {gan:function(){ vbnGanCu(); }}); }
  var n = vbnCanGan().length;
  return n ? '<button data-lenh="vbn.gan" title="Gắn tag 🏛 VB Trung ương / 🏦 NHCSXH Trung ương / 📍 Chỉ đạo của Tỉnh cho văn bản cũ theo số hiệu">🏷 Gắn tag nguồn ('+n+')</button>' : '';
}
(function(){
  if(typeof doanLoai==='function'){ var cu = doanLoai; doanLoai = function(chu, soHieu){ var l = soHieu ? vbnLoai(soHieu) || vbnLoai('1/'+soHieu) : ''; return l || cu.apply(this, arguments); }; }
  if(typeof suaCho==='function'){ var cu3 = suaCho; suaCho = function(){ var r = cu3.apply(this, arguments); try{ vbnTuGan(); var e = document.getElementById('s-so'), sl = document.getElementById('s-loai'), l = e ? vbnLoai(e.value) : '';
      if(l && sl && sl.value==='Công văn'){ sl.value = l; if(typeof xemTenTruoc==='function') xemTenTruoc(); } }catch(er){} return r; }; }   /* mở hộp khai: số hiệu Trung ương có sẵn → tự gắn tag; loại đang "Công văn" (đoán cũ) → đúng loại */
  if(typeof goiYLoaiTuSo==='function'){ var cu2 = goiYLoaiTuSo; goiYLoaiTuSo = function(){ try{ vbnTuGan(); }catch(e){} return cu2.apply(this, arguments); }; }
})();
