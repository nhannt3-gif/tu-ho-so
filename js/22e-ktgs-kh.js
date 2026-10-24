/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2946–3477 của bản 3.234), không đổi logic — 🛡 KTGS — Kế hoạch KTGS năm 01/KH, kiểm tra định kỳ theo lịch (Mẫu 06 + 16) */
/* ===================== 3.96: 🗓 KẾ HOẠCH KTGS NĂM CỦA HỘI CẤP XÃ (01/KH) — anh chốt =====================
   Khuôn = dự thảo HĐT cấp xã anh gửi (tools/khuon_docx.py m01): căn cứ 727/HD-NHCS 11/02/2026, chỉ ghi 90%, bỏ khung "MẪU THAM KHẢO HĐT CẤP XÃ",
   ngày lập để trống, không ghi số hộ cụ thể, A4. Chọn năm + Hội + xã (cây: xã → hội) → app lấy 100% tổ của Hội tại xã, gom theo ấp,
   MẶC ĐỊNH xếp sẵn vào các tháng (từ tháng 02 → 10, chia đều theo thứ tự ấp; ấp nhiều tổ tự tràn sang tháng kế bên), anh đổi tháng cho cả ấp hoặc từng tổ;
   lịch lưu D.cauHinh.ktKH['năm|xã|hội'] = {tu, den, to:{mã tổ: tháng}}; tổ mới chưa xếp → nhắc (727: 100% tổ / năm).
   Số HĐUT, KH Hội tỉnh, Đoàn kiểm tra, người ký lấy từ ⚙ Khai báo Hội; trống = dòng chấm. Bảng lịch: tháng · ấp: tổ… · "Tối thiểu 90% món vay". */
var KT_KH_XEM = null, KT_KH_M04 = {};   /* 3.98: tháng chọn để lập Mẫu 04 theo kế hoạch (trong phiên) */
function ktKH04(){   /* 3.98 ②: Mẫu 04 theo bảng kế hoạch — mỗi tháng đã chọn 1 báo cáo (tổ có lịch tháng đó), ngày "…../mm/yyyy" */
  var L = ktKHLich(), nam = ktKHNam(), ra = [];
  Object.keys(KT_KH_M04).filter(function(m){ return KT_KH_M04[m]; }).map(Number).sort(function(a, b){ return a-b; }).forEach(function(m){
    var ds = L.ds.filter(function(t){ return L.gan[t.ma]===m; }).map(function(t){ return {t:t, ngay:''}; }); if(!ds.length) return;
    ktBC04(ds, nam+'-'+hai(m)).forEach(function(g){ g.nhan = 'tháng '+hai(m)+'/'+nam; ra.push(g); }); });
  return ra;
}
function ktKH04Xem(ok){
  if(!ok) return ktInHop(['m04'], ktInNutXem('ktKH04Xem(1)'), ktHoiCuaTo(ktKHLich().ds));   /* 3.114 */
  var gts = ktKH04(); if(!gts.length) return bao('Chọn tháng có lịch để lập Mẫu 04.', 3);
  var L0 = ktKHLich(); if(!L0.luu){ ktKHGhi(L0); ktVeThe(); }   /* 3.123 */
  KT_BC_XEM = {tu:'kh', gts:gts, tenFile:'Mau 04 theo ke hoach '+ktKHNam()+' - '+boDauTen(gts[0].ten).slice(0, 50)+' - '+gts.length+' thang'};
  ktBCHop('theo kế hoạch năm '+ktKHNam());
}
function ktKHInCa(ok){   /* 3.98: in Kế hoạch + Mẫu 04 các tháng đã chọn trong 1 lần in (mỗi bản sang trang mới); Word vẫn là 2 file riêng (2 khuôn khác nhau) */
  if(ktKhuonTruoc(function(){ ktKHInCa(ok); })) return;   /* 3.236: khuôn chưa tải */
  if(!ok) return ktInHop(['kh','m04'], '<button class="nho chinh" onclick="dongHop();ktKHInCa(1)">🖨 In Kế hoạch + Mẫu 04</button>', ktHoiCuaTo(ktKHLich().ds));   /* 3.114 */
  var g = ktKHGiaTri(ktInV('kh')), gts = ktKH04(); if(!gts.length) return bao('Chọn tháng có lịch để lập Mẫu 04.', 3);
  var L0 = ktKHLich(); if(!L0.luu) ktKHGhi(L0);
  inBlob(new Blob([ktGhepTo([ktHTML01(g)].concat(gts.map(function(x){ return ktHTML04(x); })), 210, ['Kế hoạch KTGS năm '+g.nam].concat(gts.map(function(x){ return 'Mẫu 04 · '+x.nhan; })))], {type:'text/html'}), 'Ke hoach va Mau 04 '+g.nam+'.html');
}
function ktKHNam(){ var C = ktCH(); return +C.khNam || nay().getFullYear(); }
/* ---------- 3.140 (anh chốt): IN THEO THÁNG KIỂM TRA (chip 🗓 Kế hoạch) — bấm tháng → các tổ của tháng (theo ấp):
   Mẫu 06 in TỪNG TỔ, 1 mặt (1 tổ nhiều trang), hiện tỷ lệ món (727: tối thiểu 90%) + ✎ chọn hộ; Mẫu 16 cả tháng, 2 mặt; Mẫu 04 tháng, 2 mặt.
   Hộ chọn sẵn như kiểm tra định kỳ (món giải ngân trước 01/01 năm kiểm tra, 100%); số liệu nên là cuối tháng trước tháng kiểm tra. ---------- */
var KT_KH_TH = 0, KT_KH_DA = {};
function ktKHThang7(m){ return ktKHNam()+'-'+hai(m); }
function ktKHToThang(m){ var L = ktKHLich(); return L.ds.filter(function(t){ return L.gan[t.ma]===m; }); }
/* 3.141 (anh chốt): IN THEO THÁNG tự lấy số liệu cuối tháng liền trước tháng kiểm tra (Mẫu 31 + BC0437 / BC0438 đã nạp) — chỉ phần này;
   kỳ anh chọn ở ô Số liệu giữ nguyên (mượn số liệu lúc vẽ bảng / in rồi trả lại). Chưa nạp tháng đó → tháng gần nhất trước đó, ghi rõ ⚠ */
var KT_KH_SL = null;
function ktKHKySL(th){ var can = kyLui(th, -1), ds = toDsKy().map(function(e){ return e.ky; }).filter(function(k){ return k.length===7 && k<=can; }).sort(); return {can:can, ky:ds.pop() || ''}; }
function ktKHNapSL(th){
  var S = KT_KH_SL; if(S && S.th===th && S.goc===KT_K) return Promise.resolve(S);
  var x = ktKHKySL(th), goc = KT_K;
  var xong = function(o){ o.th = th; o.can = x.can; o.goc = goc; KT_KH_SL = o; return o; };
  if(!x.ky || !KT_K || x.ky===KT_K.ky) return Promise.resolve(xong({ky:KT_K ? KT_K.ky : '', K:KT_K, BC:KT_BC, TR:KT_TRUOC, khong:!x.ky}));
  var tr0 = KT_TRUOC, K;
  return KHO.nap(x.ky).then(function(k){ K = k; return Promise.all([ktNapBC(x.ky), ktTruocNap(k)]); })
    .then(function(r){ var tr = r[1]; KT_TRUOC = tr0; return xong({ky:x.ky, K:K, BC:r[0], TR:tr}); }, function(){ KT_TRUOC = tr0; return xong({ky:KT_K.ky, K:KT_K, BC:KT_BC, TR:KT_TRUOC, loi:1}); });
}
function ktKHVoiSL(fn){   /* chạy fn với số liệu của tháng kiểm tra đang chọn (KT_KH_SL), xong trả lại số liệu đang xem */
  var S = KT_KH_SL; if(!S || !S.K || S.K===KT_K || S.goc!==KT_K) return fn();
  var a = KT_K, b = KT_BC, c = KT_TRUOC, d = KHO.kyDung(); KT_K = S.K; KHO.datKy(S.K); KT_BC = S.BC; KT_TRUOC = S.TR;
  try { return fn(); } finally { KT_K = a; KHO.datKy(d); KT_BC = b; KT_TRUOC = c; }
}
function ktKHSLChu(S, m){   /* dòng ghi đúng file số liệu đang dùng cho tháng kiểm tra */
  var bc = S.BC && S.BC.k37 ? S.BC.k37.e.ky : '', bcDung = bc && slThang(bc)===slThang(S.ky);
  var chu = 'Số liệu in T'+m+': <b>'+coChuHTML(slKyChu(S.ky))+'</b> (Mẫu 31 ✓ · BC0437 '+(bc ? coChuHTML(slKyChu(bc))+(bcDung ? ' ✓' : ' ⚠ khác tháng') : 'chưa nạp')+')';
  if(S.khong) return '<div class="sl-bao vang">⚠ Chưa nạp Mẫu 31 cuối '+kyVN(S.can)+' hoặc trước đó — đang dùng kỳ đang chọn. '+chu+'</div>';
  if(S.loi) return '<div class="sl-bao vang">⚠ Không mở được số liệu '+kyVN(S.can)+' — đang dùng kỳ đang chọn. '+chu+'</div>';
  return '<div class="'+(S.ky===S.can ? 'to-the-so' : 'sl-bao vang')+'">'+(S.ky===S.can ? '📌 ' : '⚠ Chưa nạp Mẫu 31 cuối '+kyVN(S.can)+' — ')+chu+' · tự lấy, không đổi kỳ anh đang chọn.</div>';
}
function ktKHInThangHTML(L, dem){
  var thCo0 = Object.keys(dem).map(Number); if(KT_KH_TH && thCo0.indexOf(KT_KH_TH)>=0){ var th0 = ktKHThang7(KT_KH_TH), S0 = KT_KH_SL;
    if(!S0 || S0.th!==th0 || S0.goc!==KT_K){ ktKHNapSL(th0).then(function(){ if(KT_K) ktVeThe(); }); return ktKHInThangHTML0(L, dem, '<div class="rong">Đang mở số liệu cuối '+kyVN(kyLui(th0, -1))+'…</div>'); }
    return ktKHVoiSL(function(){ return ktKHInThangHTML0(ktKHLich(), dem, ktKHSLChu(S0, KT_KH_TH)); }); }
  return ktKHInThangHTML0(L, dem);
}
function ktKHInThangHTML0(L, dem, slChu){
  var thCo = Object.keys(dem).map(Number).sort(function(a, b){ return a-b; }); if(!thCo.length) return '';
  if(KT_KH_TH && thCo.indexOf(KT_KH_TH)<0) KT_KH_TH = 0;
  var h = '<div class="kt-che kt-kh-in"><span class="sl-phu">🖨 In theo tháng kiểm tra:</span>'+thCo.map(function(m){ return '<button class="to-loc'+(KT_KH_TH===m ? ' bat' : '')+'" onclick="KT_KH_TH=KT_KH_TH==='+m+'?0:'+m+';ktVeThe()">T'+m+' <small>('+dem[m]+' tổ)</small></button>'; }).join('')+'</div>';
  if(!KT_KH_TH) return h;
  if(slChu && /^<div class="rong">/.test(slChu)) return h+slChu;
  var m = KT_KH_TH, th = ktKHThang7(m), ds = L.ds.filter(function(t){ return L.gan[t.ma]===m; }), dat = 0;
  h += slChu || '';   /* 3.141: thay lời nhắc đổi kỳ bằng dòng số liệu tự lấy */
  KT_DK_TH = th;
  try {
    h += '<div class="to-bang-cuon"><table class="to-bang kt-kh-thang"><thead><tr><th>Ấp</th><th>Tổ (mã)</th><th>Mẫu 06 — hộ / món kiểm tra (≥ 90%)</th><th></th></tr></thead><tbody>';
    ds.forEach(function(t){ var x = ktDKTyLe(t), d = x.ptMon>=90 || !x.monD; if(d) dat++;
      h += '<tr><td>'+coChuHTML(ktKHAp(t))+'</td><td class="to-ten"><b>'+coChuHTML(t.ten||'Tổ '+t.ma)+'</b> ('+t.ma+')'+(KT_KH_DA[th+'|'+t.ma] ? ' <span class="xanh" title="Đã in Mẫu 06 trong phiên này">✓ đã in</span>' : '')+'</td>'+
        '<td><b class="'+(d ? 'xanh' : 'do')+'">'+x.monC+'/'+x.monD+' món = '+ktPT(x.ptMon)+'%</b> <small>· '+x.nChon+'/'+x.nDung+' hộ'+(x.nTong>x.nChon ? ' + '+(x.nTong-x.nChon)+' QH/khoanh' : '')+'</small></td>'+
        '<td><button class="nho" onclick="ktDKMo(\''+t.ma+'\')">'+(KT_DK_MO===t.ma ? '▴ Thu gọn' : '✎ Chọn hộ')+'</button><button class="nho" onclick="ktKHIn06(\''+t.ma+'\',\'in\')" title="Mở bản In — in thẳng hoặc chọn Lưu dưới dạng PDF">🖨 In / PDF 06</button><button class="nho" onclick="ktKHIn06(\''+t.ma+'\',\'word\')">📄 Word 06</button><button class="nho" onclick="ktKHIn06(\''+t.ma+'\',\'pdf\')" title="Lưu file PDF gửi Hội — tên file điền sẵn">📤 PDF 06</button>'+
        '<button class="nho" onclick="ktKHIn16(\'in\',0,\''+t.ma+'\')" title="Biên bản Mẫu 16 của riêng tổ này (in 2 mặt)">🖨 In / PDF 16</button><button class="nho" onclick="ktKHIn16(\'word\',0,\''+t.ma+'\')">📄 Word 16</button><button class="nho" onclick="ktKHIn16(\'pdf\',0,\''+t.ma+'\')" title="Lưu file PDF gửi Hội — tên file điền sẵn">📤 PDF 16</button></td></tr>';   /* 3.140.2: 📤 PDF gửi Hội */   /* 3.140.1 (anh chốt): Mẫu 16 từng tổ cạnh Mẫu 06; nhãn In / PDF cho rõ */
      if(KT_DK_MO===t.ma) h += '<tr><td colspan="4">'+ktDKHoHTML(t, x)+'</td></tr>'; });
  } finally { KT_DK_TH = ''; }
  h += '</tbody></table></div><div class="to-the-so">T'+m+': '+ds.length+' tổ · Mẫu 06 đạt ≥ 90% món: <b class="'+(dat===ds.length ? 'xanh' : 'do')+'">'+dat+'/'+ds.length+' tổ</b></div>'+
    '<div class="hang-nut kt-in"><button class="nho chinh" onclick="ktKHIn16(\'in\')">🖨 Mẫu 16 cả tháng ('+ds.length+' biên bản · in 2 mặt)</button><button class="nho" onclick="ktKHIn16(\'word\')">📄 Word 16</button><button class="nho" onclick="ktKHIn16(\'pdf\')">📤 PDF 16</button>'+
    '<button class="nho chinh" onclick="ktKHIn04T(\'in\')">🖨 Mẫu 04 T'+m+' (in 2 mặt)</button><button class="nho" onclick="ktKHIn04T(\'word\')">📄 Word 04</button><button class="nho" onclick="ktKHIn04T(\'pdf\')">📤 PDF 04</button></div>'+
    '<p class="ghi">Mẫu 06 in từng tổ, 1 mặt (mỗi tổ nhiều trang, "Trang x/y"); Mẫu 16, 04 in 2 mặt — mỗi bản bắt đầu tờ mới (chọn in 2 mặt ở máy in). Hộ chọn sẵn 100% món giải ngân trước 01/01/'+ktKHNam()+'; hộ QH / khoanh tích tay khi cần.</p>';
  return h;
}
/* 3.140.2 (anh chốt): TÊN FILE theo cây địa bàn, Hội ngay sau xã, không dấu: Xã_Hội_Ấp_Tổ_Mẫu_Tháng_SL
   vd TruongMit_HND_Ap06_VoVanTao_M06_T10-26_SL30-09-26 · TruongMit_HND_M04_T10-26_SL30-09-26 · TruongMit_HND_KH2026 (cả Word lẫn PDF) */
var KT_HOI_VT = {'11':'HND', '12':'HPN', '13':'CCB', '14':'DTN'};
function ktFChu(s){ return boDau(String(s||'')).replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-z0-9 ]/gi, ' ').trim().split(/\s+/).filter(Boolean).map(function(w){ return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase(); }).join(''); }
function ktFSL(){ var k = String((KT_K && KT_K.ky) || ktCH().ky || ''); if(!/^\d{4}-\d{2}/.test(k)) return ''; var d = k.length>7 ? k : k.slice(0, 7)+'-'+hai(ngayCuoiThang(+k.slice(0, 4), +k.slice(5, 7))); return 'SL'+d.slice(8, 10)+'-'+d.slice(5, 7)+'-'+d.slice(2, 4); }   /* số liệu đến ngày (kỳ tháng = ngày cuối tháng) */
function ktFTen(t, o){   /* o = {to:1 (thêm ấp + tổ), mau:'M06', th:'2026-10', n:số tổ, kh:năm} */
  var hoi = KT_HOI_VT[String(t && t.dv || '')] || ktFChu(tdnHoi(t && t.dv) || ''), p = [ktFChu(ktXaTen(t && t.tenXa)) || 'Xa', hoi || 'Hoi'];
  if(o.to){ var ap = ktApTen(t.tenThon); if(ap) p.push((ktCapAp(t.tenXa)==='khu phố' ? 'Kp' : 'Ap')+ktFChu(ap)); p.push(ktFChu(t.ten) || 'To'+t.ma); }
  if(o.kh) p.push('KH'+o.kh);
  else { p.push(o.mau); if(o.th) p.push('T'+o.th.slice(5, 7)+'-'+o.th.slice(2, 4)); if(o.n) p.push(o.n+'to'); var sl = ktFSL(); if(sl) p.push(sl); }
  return p.join('_');
}
var KT_PDF_TIT = null;
function inPDF(h, ten){   /* in → "Lưu dưới dạng PDF" với tên file điền sẵn (tiêu đề trang; Chrome / Edge máy tính lấy làm tên file) + chép tên vào bộ nhớ tạm */
  var x = inChuan(String(h)); x = /<title>/.test(x) ? x.replace(/<title>[\s\S]*?<\/title>/, '<title>'+xmlEsc(ten)+'</title>') : x.replace('<head>', '<head><title>'+xmlEsc(ten)+'</title>');   /* đổi tiêu đề SAU bộ in chuẩn (bộ in nhận Mẫu 06 theo tiêu đề cũ) */
  var b = new Blob([x], {type:'text/html'}); b.trChuan = 1;
  if(KT_PDF_TIT===null) KT_PDF_TIT = document.title; document.title = ten;
  setTimeout(function(){ if(KT_PDF_TIT!==null){ document.title = KT_PDF_TIT; KT_PDF_TIT = null; } }, 30000);
  try { if(navigator.clipboard) navigator.clipboard.writeText(ten+'.pdf').catch(function(){}); } catch(e){}
  inBlob(b, ten+'.html', 'Hộp in: chọn Máy in = “Lưu dưới dạng PDF” → Lưu. Tên file: '+ten+'.pdf (đã chép — máy hỏi tên thì dán vào).');
}
function ktKHIn06(ma, cach, ok){ var th = ktKHThang7(KT_KH_TH), S = KT_KH_SL;   /* 3.141: in bằng số liệu tháng kiểm tra */
  if(KT_KH_TH && (!S || S.th!==th || S.goc!==KT_K)) return ktKHNapSL(th).then(function(){ return ktKHIn06(ma, cach, ok); });
  return ktKHVoiSL(function(){ return ktKHIn06G(ma, cach, ok); });
}
function ktKHIn06G(ma, cach, ok){
  var t = KT_K && KT_K.to[ma]; if(!t) return; var th = ktKHThang7(KT_KH_TH);
  if(!ok) return ktInHop(['m06'], '<button class="nho chinh" onclick="dongHop();ktKHIn06(\''+ma+'\',\''+cach+'\',1)">'+(cach==='word' ? '📄 Xuất Word' : cach==='pdf' ? '📤 PDF' : '🖨 In')+' Mẫu 06</button>', ktHoiCuaTo([t]));
  KT_DK_TH = th; var x, X;
  try { x = ktDKTyLe(t);
    if(ok!==2 && x.monD && x.ptMon<90){ KT_DK_TH = ''; return moHop('<div class="hop-tit">⚠ Tổ chưa đủ 90% món</div><div class="hop-phu">Tổ <b>'+coChuHTML(t.ten||ma)+'</b> mới kiểm tra <b class="do">'+ktPT(x.ptMon)+'%</b> số món ('+x.monC+'/'+x.monD+') — 727: tối thiểu 90%.</div>'+
      '<div class="hang-nut"><button class="nho" onclick="dongHop();KT_DK_MO=\''+ma+'\';ktVeThe()">✎ Chọn thêm hộ</button><button class="nho chinh" onclick="dongHop();ktKHIn06(\''+ma+'\',\''+cach+'\',2)">Vẫn in</button></div>', true); }
    X = ktDKGiaTri(ktInV('m06'), ktInV('m16'), [t]);
  } finally { KT_DK_TH = ''; }
  var g = X.g06[0], ten = ktFTen(t, {to:1, mau:'M06', th:th});   /* 3.140.2: tên theo cây địa bàn */
  KT_KH_DA[th+'|'+ma] = 1;
  if(cach==='word') return ktDocx('m06', g).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx.', 5); setTimeout(ktVeThe, 0); }).catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  if(cach==='pdf'){ inPDF(ktMat(ktHTML06(g), 0), ten); return setTimeout(ktVeThe, 0); }
  inBlob(new Blob([ktMat(ktHTML06(g), 0)], {type:'text/html'}), ten+'.html'); setTimeout(ktVeThe, 0);
}
function ktKHIn16(cach, ok, ma){ var th = ktKHThang7(KT_KH_TH), S = KT_KH_SL;   /* 3.141: in bằng số liệu tháng kiểm tra */
  if(KT_KH_TH && (!S || S.th!==th || S.goc!==KT_K)) return ktKHNapSL(th).then(function(){ return ktKHIn16(cach, ok, ma); });
  return ktKHVoiSL(function(){ return ktKHIn16G(cach, ok, ma); });
}
function ktKHIn16G(cach, ok, ma){   /* ma: 3.140.1 — chỉ 1 tổ (nút trên dòng tổ); không có = cả tháng */
  var ds = ma ? (KT_K && KT_K.to[ma] ? [KT_K.to[ma]] : []) : ktKHToThang(KT_KH_TH), th = ktKHThang7(KT_KH_TH); if(!ds.length) return;
  if(!ok) return ktInHop(['m16'], '<button class="nho chinh" onclick="dongHop();ktKHIn16(\''+cach+'\',1'+(ma ? ',\''+ma+'\'' : '')+')">'+(cach==='word' ? '📄 Xuất Word' : cach==='pdf' ? '📤 PDF' : '🖨 In')+' Mẫu 16 ('+(ma ? 'tổ '+coChuHTML(ds[0].ten||ma) : ds.length+' tổ')+')</button>', ktHoiCuaTo(ds));
  KT_DK_TH = th; var X; try { X = ktDKGiaTri(ktInV('m06'), ktInV('m16'), ds); } finally { KT_DK_TH = ''; }
  var ten = ma ? ktFTen(ds[0], {to:1, mau:'M16', th:th}) : ktFTen(ds[0], {mau:'M16', th:th, n:ds.length});   /* 3.140.2 */
  if(cach==='word'){ KT_HAI_EP = true; var p; try { p = ktDocx('m16', X.g16); } finally { KT_HAI_EP = null; } return p.then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx (mỗi tổ bắt đầu tờ mới — in 2 mặt).', 6); }).catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); }); }
  if(cach==='pdf') return inPDF(ktMat(ktHTML16(X.g16), 1), ten);
  inBlob(new Blob([ktMat(ktHTML16(X.g16), 1)], {type:'text/html'}), ten+'.html');
}
function ktKHIn04T(cach, ok){ var th = ktKHThang7(KT_KH_TH), S = KT_KH_SL;   /* 3.141: in bằng số liệu tháng kiểm tra */
  if(KT_KH_TH && (!S || S.th!==th || S.goc!==KT_K)) return ktKHNapSL(th).then(function(){ return ktKHIn04T(cach, ok); });
  return ktKHVoiSL(function(){ return ktKHIn04TG(cach, ok); });
}
function ktKHIn04TG(cach, ok){
  var ds = ktKHToThang(KT_KH_TH), th = ktKHThang7(KT_KH_TH); if(!ds.length) return;
  if(!ok) return ktInHop(['m04'], '<button class="nho chinh" onclick="dongHop();ktKHIn04T(\''+cach+'\',1)">'+(cach==='word' ? '📄 Xuất Word' : cach==='pdf' ? '📤 PDF' : '🖨 In')+' Mẫu 04 T'+KT_KH_TH+'</button>', ktHoiCuaTo(ds));
  var gts = ktBC04(ds.map(function(t){ return {t:t, ngay:''}; }), th); if(!gts.length) return;
  var ten = ktFTen(ds[0], {mau:'M04', th:th});   /* 3.140.2 */
  if(cach==='word'){ KT_HAI_EP = true; var p; try { p = ktDocx('m04', gts.length>1 ? gts : gts[0]); } finally { KT_HAI_EP = null; } return p.then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx.', 5); }).catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); }); }
  if(cach==='pdf') return inPDF(ktMat(ktHTML04(gts.length>1 ? gts : gts[0]), 1), ten);
  inBlob(new Blob([ktMat(ktHTML04(gts.length>1 ? gts : gts[0]), 1)], {type:'text/html'}), ten+'.html');
}
function ktKHHoi(){ var C = ktCH(); return C.hoi || C.khHoi || ''; }   /* hội: theo cây, hoặc chip hội của xã (cây cần chọn điểm GD mới chọn được hội) */
function ktKHDsTo(){   /* 100% tổ của Hội tại xã đang chọn (mọi điểm GD) — theo thứ tự ấp (3.140) rồi tên tổ trưởng */
  var C = ktCH(), hoi = ktKHHoi(); if(!KT_K || !C.xa || !hoi) return [];
  var ds = Object.keys(KT_K.to).map(function(m){ return KT_K.to[m]; }).filter(function(t){ return !toLaTT(t) && t.xa===C.xa && String(t.dv||'')===hoi; }), thu = ktKHApThu(ds);
  return ds.sort(function(a, b){ return (thu.indexOf(ktKHAp(a))-thu.indexOf(ktKHAp(b))) || String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); });
}
/* 3.140 (anh chốt): thứ tự ấp — mặc định theo điểm GD (mã điểm) → mã thôn → tên ấp; anh sắp lại được (▲ ▼, nhớ theo xã), ↺ về mặc định */
function ktKHApMacDinh(ds){
  var g = {}, thu = [];
  ds.forEach(function(t){ var a = ktKHAp(t), d = String(t.diem || t.khoaDiem || '~'), th = String(t.thon || '~'), x = g[a];
    if(!x){ x = g[a] = {a:a, d:d, th:th}; thu.push(x); } else { if(d<x.d) x.d = d; if(th<x.th) x.th = th; } });
  return thu.sort(function(x, y){ return x.d.localeCompare(y.d, 'vi', {numeric:true}) || x.th.localeCompare(y.th, 'vi', {numeric:true}) || x.a.localeCompare(y.a, 'vi', {numeric:true}); }).map(function(x){ return x.a; });
}
function ktKHApThu(ds){
  var mac = ktKHApMacDinh(ds), tu = (D.cauHinh.ktApThu || {})[ktCH().xa]; if(!tu || !tu.length) return mac;
  var r = tu.filter(function(a){ return mac.indexOf(a)>=0; }); mac.forEach(function(a){ if(r.indexOf(a)<0) r.push(a); }); return r;
}
var KT_KH_SAP = false;   /* đang sắp lại thứ tự ấp */
function ktKHApDoi(ap, d){
  var C = ktCH(), thu = ktKHApThu(ktKHDsTo()), i = thu.indexOf(ap), j = i+d; if(i<0 || j<0 || j>=thu.length) return;
  thu.splice(i, 1); thu.splice(j, 0, ap); var S = D.cauHinh.ktApThu = D.cauHinh.ktApThu || {}; S[C.xa] = thu; luu(); ktVeThe();
}
function ktKHApMacDinhVe(){ var S = D.cauHinh.ktApThu || {}; delete S[ktCH().xa]; luu(); ktVeThe(); bao('Thứ tự ấp về mặc định (điểm GD → mã thôn → tên). Bấm ↺ Xếp lại tự động nếu muốn chia tháng lại theo thứ tự này.', 5); }
function ktKHAp(t){ return ktApChu(t.tenThon, t.tenXa, 1) || '(chưa rõ ấp)'; }
function ktKHKhoa(){ var C = ktCH(); return ktKHNam()+'|'+C.xa+'|'+ktKHHoi(); }
function ktKHMacDinh(ds, th){   /* 3.140 (anh chốt): mỗi tháng TRỌN ẤP — chia các ấp (theo thứ tự) vào các tháng, số tổ mỗi tháng gần bằng nhau, không tách ấp */
  var g = {}, M = th.length; if(!M || !ds.length) return g;
  var nh = []; ds.forEach(function(t){ var a = ktKHAp(t), l = nh[nh.length-1]; if(!l || l.a!==a) nh.push(l = {a:a, ds:[]}); l.ds.push(t); });
  var n = nh.length, P = Math.min(M, n), s = [0], f = [], cat = [], i, j, k;
  nh.forEach(function(x){ s.push(s[s.length-1]+x.ds.length); });
  for(k=0;k<=P;k++){ f.push([]); cat.push([]); for(i=0;i<=n;i++) f[k].push(k===0 && i===0 ? 0 : 1e9); }
  for(k=1;k<=P;k++) for(i=k;i<=n;i++) for(j=k-1;j<i;j++){ var v = Math.max(f[k-1][j], s[i]-s[j]); if(v<f[k][i]){ f[k][i] = v; cat[k][i] = j; } }   /* cực tiểu tháng đông nhất */
  var bien = [], e = n; for(k=P;k>=1;k--){ bien.unshift(cat[k][e]); e = cat[k][e]; }
  for(k=0;k<P;k++){ var m = th[P===M ? k : Math.floor(k*M/P)], den = k+1<P ? bien[k+1] : n; for(i=bien[k];i<den;i++) nh[i].ds.forEach(function(t){ g[t.ma] = m; }); }
  return g;
}
function ktKHKhoangTh(tu, den){ var r = []; for(var m = tu; m<=den; m++) r.push(m); return r; }
function ktKHThang(S){   /* 3.123: tháng kiểm tra — cách "chip" = các tháng đã tích; cách "khoảng" (mặc định, như cũ) = từ tháng → đến tháng */
  if(S && S.cach==='chip') return (S.thang || []).map(Number).filter(function(m){ return m>=1 && m<=12; }).sort(function(a, b){ return a-b; });
  return ktKHKhoangTh(S ? +S.tu || 2 : 2, S ? +S.den || 10 : 10);
}
function ktKHLuu(){ var S = (D.cauHinh.ktKH || {})[ktKHKhoa()]; return S && !S.xoa ? S : null; }   /* 3.123: {xoa:1} = đã xóa (giữ dấu để đồng bộ Drive không kéo lại) */
function ktKHLich(){   /* {tu, den, thang:[…], cach, gan:{mã: tháng}, thieu:[tổ chưa xếp], mat:[tổ trong kế hoạch không còn trong số liệu], ds, luu, luc, tay} */
  var ds = ktKHDsTo(), S = ktKHLuu(), th = ktKHThang(S), gan = {}, thieu = [], mat = [], co = {};
  if(!S || !S.to) gan = ktKHMacDinh(ds, th);
  else { ds.forEach(function(t){ var m = +S.to[t.ma]; if(th.indexOf(m)>=0) gan[t.ma] = m; else thieu.push(t); });
    thieu = thieu.filter(function(t){ var a = ktKHAp(t), cung = ds.find(function(x){ return x!==t && gan[x.ma] && ktKHAp(x)===a; }); if(cung){ gan[t.ma] = gan[cung.ma]; return false; } return true; }); }   /* 3.140: tổ mới của ấp đã có tháng → theo tháng của ấp */
  ds.forEach(function(t){ co[t.ma] = 1; });
  if(S && S.to) Object.keys(S.to).forEach(function(ma){ if(!co[ma]){ var sn = (S.snap || {})[ma] || {}; mat.push({ma:ma, ten:sn.ten || '', ap:sn.ap || '', thang:+S.to[ma]}); } });
  return {tu:th.length ? th[0] : (S ? +S.tu || 2 : 2), den:th.length ? th[th.length-1] : (S ? +S.den || 10 : 10), thang:th, cach:S && S.cach==='chip' ? 'chip' : 'khoang', gan:gan, thieu:thieu, mat:mat, ds:ds,
    luu:!!S, luc:S ? S.luc : '', tay:!!(S && S.to && (S.tay || !S.v))};   /* kế hoạch lưu ở bản cũ: coi như đã chỉnh tay (hỏi trước khi chia lại) */
}
function ktKHGhi(L){   /* 3.123: lưu cả cách chọn tháng, tên tổ / ấp lúc lập (snap) và giữ tổ không còn trong số liệu */
  var S = D.cauHinh.ktKH = D.cauHinh.ktKH || {}, cu = ktKHLuu() || {}, to = {}, snap = {};
  L.mat.forEach(function(r){ to[r.ma] = r.thang; snap[r.ma] = (cu.snap || {})[r.ma] || {ten:r.ten, ap:r.ap}; });
  L.ds.forEach(function(t){ if(L.gan[t.ma]){ to[t.ma] = L.gan[t.ma]; snap[t.ma] = {ten:t.ten || '', ap:ktKHAp(t)}; } });
  var o = {v:2, tu:L.tu, den:L.den, to:to, snap:snap, luc:new Date().toISOString()};
  if(L.cach==='chip'){ o.cach = 'chip'; o.thang = L.thang.slice(); }
  if(L.tay) o.tay = 1;
  S[ktKHKhoa()] = o; luu();
}
function ktKHDoiThang(ma, v, ap){   /* đổi tháng 1 tổ, hoặc cả ấp (ap = tên ấp) */
  var L = ktKHLich(); v = +v;
  L.ds.forEach(function(t){ if(ap ? ktKHAp(t)===ap : t.ma===ma){ if(v) L.gan[t.ma] = v; else delete L.gan[t.ma]; } });
  L.tay = true; ktKHGhi(L); ktVeThe();
}
function ktKHDatThang(cach, th, ok){   /* 3.123: đổi cách / các tháng → chia đều lại; đã chỉnh tháng tay → hỏi trước */
  var L = ktKHLich(); th = th.map(Number).filter(function(m, i, a){ return m>=1 && m<=12 && a.indexOf(m)===i; }).sort(function(a, b){ return a-b; });
  var cung = th.join(',')===L.thang.join(',');
  if(!cung && L.tay && !ok){ ktVeThe(); return hoi('Chia lại các tổ vào tháng mới?', 'Kế hoạch đã có tổ anh chỉnh tháng bằng tay. Đổi tháng kiểm tra sẽ chia đều lại toàn bộ tổ theo thứ tự ấp vào '+(th.length ? 'T'+th.join(', T') : '(chưa chọn tháng)')+'.', 'Chia lại', function(){ ktKHDatThang(cach, th, 1); }); }
  L.cach = cach; L.thang = th; L.tu = th.length ? th[0] : L.tu; L.den = th.length ? th[th.length-1] : L.den;
  if(!cung){ L.gan = ktKHMacDinh(L.ds, th); L.tay = false; }
  ktKHGhi(L); ktVeThe();
}
function ktKHDoiKhoang(tu, den, ok){ tu = +tu; den = +den; if(den<tu){ var x = tu; tu = den; den = x; } ktKHDatThang('khoang', ktKHKhoangTh(tu, den), ok); }
function ktKHDoiCach(cach){ var L = ktKHLich(); if(cach===L.cach) return;
  ktKHDatThang(cach, cach==='chip' ? L.thang : (L.thang.length ? ktKHKhoangTh(L.thang[0], L.thang[L.thang.length-1]) : ktKHKhoangTh(2, 10))); }
function ktKHTichThang(m){ var L = ktKHLich(), th = L.thang.slice(), i = th.indexOf(m); if(i>=0) th.splice(i, 1); else th.push(m); ktKHDatThang('chip', th); }
function ktKHNhanh(k){ ktKHDatThang('chip', k==='quy' ? [3, 6, 9, 12] : k==='le' ? [1, 3, 5, 7, 9, 11] : k==='chan' ? [2, 4, 6, 8, 10, 12] : []); }
function ktKHXepLai(ok){ var L = ktKHLich();
  if(L.luu && !ok) return hoi('Xếp lại tự động?', 'Kế hoạch đã lưu sẽ chia lại từ đầu: các ấp (trọn ấp, theo thứ tự ấp) chia vào các tháng đang chọn, số tổ mỗi tháng gần bằng nhau; tháng anh đã chỉnh tay sẽ mất.', '↺ Xếp lại', function(){ ktKHXepLai(1); });
  L.gan = ktKHMacDinh(L.ds, L.thang); L.tay = false; ktKHGhi(L); ktVeThe(); }
function ktKHXoa(){   /* 3.123: xóa kế hoạch đã lưu của Hội – xã → về xếp tự động · 3.153: không hỏi, kế hoạch cũ vào 🗑 Thùng rác (khôi phục được) */
  var L = ktKHLich(); if(!L.luu) return;
  var S = D.cauHinh.ktKH = D.cauHinh.ktKH || {}, k = ktKHKhoa(), ten = ktHoiTenTD(L.ds[0] || {dv:ktKHHoi(), tenXa:''});
  racMucNho('ktKH', 'Kế hoạch KTGS năm '+ktKHNam()+' · '+ten, 'KTGS Hội › Kế hoạch năm '+ktKHNam(), S[k], {khoa:k});
  S[k] = {xoa:1, luc:new Date().toISOString()}; luu(); ktVeThe();
}
function ktKHNgay(iso){ var d = iso ? new Date(iso) : null; return d && !isNaN(d) ? hai(d.getDate())+'/'+hai(d.getMonth()+1)+'/'+d.getFullYear() : ''; }
function ktKHVe(o){
  var C = ktCH(), nam = ktKHNam(), y = nay().getFullYear();
  var h = ktCheDoHTML()+'<div class="kt-gn-dau"><label>Năm: <select onchange="ktCH().khNam=+this.value;luu();ktVeThe()">'+[y-1, y, y+1].map(function(n){ return '<option'+(n===nam ? ' selected' : '')+'>'+n+'</option>'; }).join('')+'</select></label>';
  var hs = ktHoiDs(), hoi = ktKHHoi();
  /* 3.157 (anh chốt): bỏ hàng chip Hội riêng — Kế hoạch dùng hàng chip Hội chung của cây địa bàn (chọn được ở cấp xã) */
  if(!C.xa || !hoi){ o.innerHTML = h+'</div><div class="rong">Chọn <b>xã</b> ở cây phía trên rồi chọn <b>Hội</b> ở hàng chip Hội — mỗi Hội cấp xã 1 kế hoạch (lấy 100% tổ của Hội tại xã, mọi điểm GD).</div>'; return; }
  if(!C.hoi) h += '<span class="sl-phu">Hội: <b>'+coChuHTML(tdnHoi(hoi)||hoi)+'</b></span>';
  var L = ktKHLich(), opt = function(v, rong){ var s = rong ? '<option value="">—</option>' : '', ds = rong ? L.thang : ktKHKhoangTh(1, 12); ds.forEach(function(m){ s += '<option value="'+m+'"'+(m===v ? ' selected' : '')+'>'+(rong ? 'T'+m : 'tháng '+hai(m))+'</option>'; }); return s; };
  h += '<span class="kt-kh-cach"><button class="to-loc'+(L.cach==='khoang' ? ' bat' : '')+'" onclick="ktKHDoiCach(\'khoang\')">Từ tháng → đến tháng</button><button class="to-loc'+(L.cach==='chip' ? ' bat' : '')+'" onclick="ktKHDoiCach(\'chip\')">Chọn tháng</button></span>';   /* 3.123 */
  if(L.cach==='khoang') h += '<label>Kiểm tra từ <select onchange="ktKHDoiKhoang(this.value,'+L.den+')">'+opt(L.tu)+'</select></label><label>đến <select onchange="ktKHDoiKhoang('+L.tu+',this.value)">'+opt(L.den)+'</select></label>';
  h += '<span class="sl-phu"><b>'+coChuHTML(ktHoiTenTD(L.ds[0] || {dv:hoi, tenXa:''}))+'</b> · '+L.ds.length+' tổ</span></div>';
  if(!L.ds.length && !L.mat.length){ o.innerHTML = h+'<div class="rong">Hội này không có tổ tại xã đã chọn.</div>'; return; }
  var dem = {}; Object.keys(L.gan).forEach(function(m){ dem[L.gan[m]] = (dem[L.gan[m]]||0)+1; });
  if(L.cach==='chip') h += '<div class="kt-kh-chip">'+ktKHKhoangTh(1, 12).map(function(m){ var co = L.thang.indexOf(m)>=0;   /* 3.123: chip T1–T12, dưới chip số tổ đã xếp */
      return '<button class="kt-kh-th'+(co ? ' bat' : '')+'" onclick="ktKHTichThang('+m+')" aria-pressed="'+co+'"><b>T'+m+'</b><small>'+(co ? (dem[m]||0)+' tổ' : '&nbsp;')+'</small></button>'; }).join('')+
    '<span class="kt-kh-nhanh"><small>Chọn nhanh:</small><button class="to-loc" onclick="ktKHNhanh(\'quy\')">Cuối quý</button><button class="to-loc" onclick="ktKHNhanh(\'le\')">Tháng lẻ</button><button class="to-loc" onclick="ktKHNhanh(\'chan\')">Tháng chẵn</button><button class="to-loc" onclick="ktKHNhanh(\'bo\')">Bỏ hết</button></span></div>';
  h += '<div class="to-the-so">'+(L.cach==='khoang' ? 'Lịch: '+Object.keys(dem).sort(function(a, b){ return a-b; }).map(function(m){ return 'T'+m+' <b>'+dem[m]+'</b> tổ'; }).join(' · ')+' · ' : '')+
    (L.luu ? '💾 Đã lưu kế hoạch năm '+nam+(L.luc ? ' · ngày '+ktKHNgay(L.luc) : '')+' — sửa là tự lưu' : '<i>app xếp sẵn — đổi tháng / Xem / In là lưu kế hoạch</i>')+'</div>';
  if(L.cach==='chip' && !L.thang.length) h += '<div class="sl-bao vang">Chưa chọn tháng nào — bấm chip tháng hoặc Chọn nhanh.</div>';
  if(L.thieu.length) h += '<div class="sl-bao vang">⚠ '+L.thieu.length+' tổ chưa xếp tháng ('+L.thieu.map(function(t){ return coChuHTML(t.ten||t.ma); }).join(', ')+') — 727: kiểm tra 100% tổ / năm. Chọn tháng cho tổ hoặc ↺ Xếp lại tự động.</div>';
  if(L.mat.length) h += '<div class="sl-bao vang">⚠ '+L.mat.length+' tổ trong kế hoạch không còn trong số liệu ('+L.mat.map(function(r){ return coChuHTML((r.ten || r.ma)+(r.ap ? ' – '+r.ap : '')+' · T'+r.thang); }).join(', ')+') — vẫn giữ trong kế hoạch; khi in Mẫu 04 theo kế hoạch không tự tích tổ này.</div>';
  var mauK = ktKHMau();
  h += '<div class="kt-che"><span class="sl-phu">Khuôn kế hoạch:</span><button class="to-loc'+(mauK==='m01' ? ' bat' : '')+'" onclick="ktKHDoiMau(\'1\')">① Dự thảo HĐT cấp xã</button><button class="to-loc'+(mauK==='m01b' ? ' bat' : '')+'" onclick="ktKHDoiMau(\'2\')">② Mẫu gọn (bản Hội xã)</button></div>';
  var ccK = ktKHCC();
  h += '<div class="kt-che"><span class="sl-phu">Căn cứ:</span><button class="to-loc'+(ccK==='727' ? ' bat' : '')+'" onclick="ktKHDoiCC(\'727\')" title="Văn bản 727/HD-NHCS ngày 11/02/2026">727 (từ 11/02/2026)</button><button class="to-loc'+(ccK==='10566' ? ' bat' : '')+'" onclick="ktKHDoiCC(\'10566\')" title="Hướng dẫn 10566/HD-NHCS ngày 29/12/2022 — kế hoạch lập trước khi có 727">10566 (trước 727)</button></div>';
  var tach = []; (function(){ var gm = {}; L.ds.forEach(function(t){ if(!L.gan[t.ma]) return; var a = ktKHAp(t); (gm[a] = gm[a] || {})[L.gan[t.ma]] = 1; }); Object.keys(gm).forEach(function(a){ if(Object.keys(gm[a]).length>1) tach.push(a+' (T'+Object.keys(gm[a]).sort(function(x, y){ return x-y; }).join(', T')+')'); }); })();
  if(tach.length) h += '<div class="sl-bao vang">⚠ '+tach.length+' ấp đang chia ở nhiều tháng: '+coChuHTML(tach.join('; '))+' — quy định mới: mỗi tháng trọn ấp. <button class="nho chinh" onclick="ktKHXepLai()">↺ Xếp lại theo ấp</button> hoặc chọn tháng cho cả ấp ở bảng dưới.</div>';   /* 3.140 */
  var thTrong = L.thang.filter(function(m){ return !dem[m]; }); if(L.ds.length && thTrong.length) h += '<div class="sl-bao vang">Tháng chưa có ấp nào: T'+thTrong.join(', T')+' — số tháng nhiều hơn số ấp, bỏ bớt tháng nếu không cần.</div>';
  h += '<div class="kt-che"><span class="sl-phu">Thứ tự ấp:</span><button class="to-loc'+(KT_KH_SAP ? ' bat' : '')+'" onclick="KT_KH_SAP=!KT_KH_SAP;ktVeThe()">⇅ Sắp lại ấp</button><button class="to-loc" onclick="ktKHApMacDinhVe()" title="Điểm GD → mã thôn → tên ấp">↺ Về mặc định</button>'+((D.cauHinh.ktApThu || {})[C.xa] ? '<small> (đang dùng thứ tự anh sắp)</small>' : '<small> (mặc định: điểm GD → mã thôn)</small>')+'</div>';
  h += '<div class="to-bang-cuon"><table class="to-bang kt-kh-bang"><thead><tr><th>Ấp / Tổ (mã)</th><th>Tháng kiểm tra</th></tr></thead><tbody>';
  var apTruoc = '';
  L.ds.forEach(function(t){ var ap = ktKHAp(t);
    if(ap!==apTruoc){ apTruoc = ap; var cua = L.ds.filter(function(x){ return ktKHAp(x)===ap; }), th = cua.map(function(x){ return L.gan[x.ma]||0; }), mot = th.every(function(v){ return v===th[0]; }) ? th[0] : 0, apJ = ap.replace(/'/g, "\\'");
      h += '<tr class="kt-kh-ap"><td><b>'+coChuHTML(ap)+'</b> <small>('+cua.length+' tổ'+(cua[0].tenDiem ? ' · điểm '+coChuHTML(String(cua[0].tenDiem).trim()) : '')+')</small>'+(KT_KH_SAP ? ' <button class="nho" onclick="ktKHApDoi(\''+apJ+'\',-1)" title="Đưa ấp lên">▲</button><button class="nho" onclick="ktKHApDoi(\''+apJ+'\',1)" title="Đưa ấp xuống">▼</button>' : '')+'</td>'+
        '<td><select onchange="ktKHDoiThang(\'\',this.value,\''+apJ+'\')" aria-label="Tháng cả ấp">'+opt(mot, 1)+'</select> <small>'+(mot ? 'cả ấp' : '<b class="do">ấp đang chia nhiều tháng</b>')+'</small></td></tr>'; }
    h += '<tr class="'+(L.gan[t.ma] ? '' : 'kt-loai')+'"><td class="to-ten">&nbsp;&nbsp;'+coChuHTML(t.ten||'Tổ '+t.ma)+' ('+t.ma+')</td><td><small>'+(L.gan[t.ma] ? 'T'+L.gan[t.ma] : '—')+'</small></td></tr>'; });   /* 3.140 (anh chốt): đổi tháng theo cả ấp, không đổi từng tổ */
  var thCo = Object.keys(dem).map(Number).sort(function(a, b){ return a-b; }), n04 = thCo.filter(function(m){ return KT_KH_M04[m]; }).length;
  h += '</tbody></table></div>'+ktKHInThangHTML(L, dem)+'<div class="kt-che kt-kh-04"><span class="sl-phu">📋 Mẫu 04 theo kế hoạch:</span>'+thCo.map(function(m){ return '<button class="to-loc'+(KT_KH_M04[m] ? ' bat' : '')+'" onclick="KT_KH_M04['+m+']=!KT_KH_M04['+m+'];ktVeThe()">T'+m+' <small>('+dem[m]+' tổ)</small></button>'; }).join('')+
    '<button class="nho" onclick="ktKH04Xem()"'+(n04 ? '' : ' disabled')+'>👁 Xem Mẫu 04'+(n04 ? ' ('+n04+' tháng)' : '')+'</button><button class="nho" onclick="ktKHInCa()"'+(n04 ? '' : ' disabled')+'>🖨 In Kế hoạch + Mẫu 04</button></div>'+
    ktHdtNhac(ktHoiDs().filter(function(x){ return String(x.t.dv)===String(hoi); }), ['ct','hd','hdNgay','kh','khNgay'])+   /* 3.113 */
    '<div class="hang-nut kt-in"><button class="nho chinh" onclick="ktKHXem()">👁 Xem Kế hoạch '+nam+'</button><button class="nho" onclick="ktKHXepLai()">↺ Xếp lại tự động</button>'+(L.luu ? '<button class="nho" onclick="ktKHXoa()" title="Xóa lịch kế hoạch đã lưu của Hội – xã này (cả trên Drive) để làm lại">🗑 Xóa kế hoạch</button>' : '')+'</div>'+
    '<p class="ghi">Khuôn theo dự thảo của Hội cấp tỉnh (HĐT cấp xã), căn cứ văn bản '+(ccK==='10566' ? '10566/HD-NHCS 29/12/2022 (trước 727)' : '727/HD-NHCS 11/02/2026')+', tỷ lệ tối thiểu 90% món vay các năm trước; không ghi số hộ cụ thể. Số hợp đồng ủy thác, kế hoạch Hội tỉnh, người ký (Chủ tịch) khai ở 🏛 Khai báo Hội đoàn thể — trống thì để dòng chấm. Xuất Word để sửa.</p>';
  o.innerHTML = h;
}
function ktKHMau(){ var C = ktCH(), k = C.xa+'|'+ktKHHoi(), kb = ktHoiKB(k); return kb.mauKH==='2' ? 'm01b' : 'm01'; }   /* 3.97: ① dự thảo HĐT cấp xã · ② mẫu gọn (bản kế hoạch mẫu Hội cấp xã) — nhớ theo Hội */
function ktKHDoiMau(v){ var C = ktCH(); ktHoiKBSua(C.xa+'|'+ktKHHoi(), 'mauKH', v==='2' ? '2' : ''); ktVeThe(); }
/* 3.112 (anh chốt): căn cứ kế hoạch — 727 (từ 11/02/2026, mặc định) hoặc hướng dẫn cũ 10566 (kế hoạch lập trước 727); áp cả khuôn ① ②, chỉ thay dòng căn cứ đầu, nhớ theo Hội */
var KT_CC727 = '- Căn cứ văn bản số 727/HD-NHCS ngày 11/02/2026 của Tổng Giám đốc NHCSXH hướng dẫn phương pháp, quy trình kiểm tra, giám sát hoạt động ủy thác;';
var KT_CC10566 = '- Căn cứ hướng dẫn 10566/HD-NHCS ngày 29/12/2022 của Tổng Giám đốc NHCSXH về việc hướng dẫn quy trình, phương pháp kiểm tra, giám sát hoạt động ủy thác cho vay;';
function ktKHCC(){ var C = ktCH(); return ktHoiKB(C.xa+'|'+ktKHHoi()).ccKH==='10566' ? '10566' : '727'; }
function ktKHDoiCC(v){ var C = ktCH(); ktHoiKBSua(C.xa+'|'+ktKHHoi(), 'ccKH', v==='10566' ? '10566' : ''); ktVeThe(); }
var KT_DO_CHU = null;
function ktDoRong(x, sz, thuong){   /* 3.108: bề rộng chữ Times New Roman (twip) ở cỡ sz (nửa điểm), mặc định in đậm (3.111: thuong = chữ thường) — canvas; không đo được thì ước theo số ký tự */
  try { if(!KT_DO_CHU) KT_DO_CHU = document.createElement('canvas').getContext('2d'); KT_DO_CHU.font = (thuong ? '' : 'bold ')+'260px "Times New Roman", "Liberation Serif", Tinos, serif';
    return KT_DO_CHU.measureText(x).width*sz/26; } catch(e){ return String(x).length*156*sz/26; }
}
function ktHXCo(hx, rong){   /* 3.108 (anh chốt): tên cơ quan đầu trang Kế hoạch — vừa 1 dòng cỡ 13 thì giữ; không thì cỡ 12; vẫn dài thì ngắt 2 dòng trước "XÃ / PHƯỜNG / THỊ TRẤN" (cỡ 12) */
  var vua = function(x, sz){ return ktDoRong(x, sz) <= rong*0.985; };   /* chừa ~1,5% (≈ 1 mm) */
  hx = String(hx||'').replace(/\s+/g, ' ').trim(); if(!hx || vua(hx, 26)) return {HX:hx, HXZ:'26'};
  if(vua(hx, 24)) return {HX:hx, HXZ:'24'};
  var m = hx.match(/^(.+?) ((?:XÃ|PHƯỜNG|THỊ TRẤN|ĐẶC KHU) .+)$/);
  if(!m){ var w = hx.split(' '), tot = null; for(var i=1;i<w.length;i++){ var a = w.slice(0, i).join(' '), b = w.slice(i).join(' '), d = Math.max(ktDoRong(a, 24), ktDoRong(b, 24)); if(!tot || d<tot.d) tot = {a:a, b:b, d:d}; } if(tot) m = [hx, tot.a, tot.b]; }
  return m ? {HX:m[1]+'\n'+m[2], HXZ:'24'} : {HX:hx, HXZ:'24'};
}
function ktKHGiaTri(v){   /* 3.114: v.ky = người ký (ct / pct / trống) */
  var C = ktCH(), nam = ktKHNam(), L = ktKHLich(), t0 = L.ds[0] || {xa:C.xa, dv:ktKHHoi(), tenXa:''}, kb = ktHoiKB(ktHoiKhoa(t0));
  var c = ktChuan(t0), loai = c.ten, ten = kb.ten || ktHoiTenTD(t0), xaTen = ktXaTen(t0.tenXa), hx = kb.ten ? kb.ten.toUpperCase() : ktChuanDauXa(t0);   /* 3.98: Bảng chuẩn hóa */
  var capTinh = c.doan ? 'Tỉnh Đoàn '+KT_TINH : loai+' tỉnh '+KT_TINH;   /* 3.98: tên đơn vị cấp tỉnh trong câu căn cứ */
  var CH = {CXA:c.xa, HLN:c.ngan==='Hội' ? 'hội' : c.ngan, HLH:c.ngan, LDC:c.ky+', '+c.pho.charAt(0).toLowerCase()+c.pho.slice(1)+', ', PCT:c.pho, CTN:c.ky, CAP:c.cap, CAPA:c.ap, LDB:c.ld, HLT:c.nnTinh, TMB:c.tm.replace('{xa}', c.xa).toUpperCase(), BTVV:c.btv ? 'BTV' : 'BCH', BTVT:c.btv ? 'TV' : 'CH'};
  var hd = kb.hd ? (/HĐUT/i.test(kb.hd) ? kb.hd : kb.hd+'/HĐUT') : '', nh = String(D.cauHinh.donvi || MAC_DINH.donvi || '').replace(/^(PGD\s+)?NHCSXH\s*/i, '');
  var rows = [], mau = ktKHMau();
  L.thang.forEach(function(m){ var cua = L.ds.filter(function(t){ return L.gan[t.ma]===m; }); if(!cua.length) return;   /* 3.123: theo các tháng đã chọn */
    var ap = {}, thu = []; cua.forEach(function(t){ var a = ktKHAp(t); if(!ap[a]){ ap[a] = []; thu.push(a); } ap[a].push(t.ten||t.ma); });
    rows.push(mau==='m01b' ? {L1:String(rows.length+1), L2:'Tháng '+m, L3:thu.map(function(a){ return ap[a].join(', ')+' ('+a+')'; }).join('\n'), L4:''}
      : {L1:hai(m), L2:thu.map(function(a){ return a+': '+ap[a].join(', '); }).join('\n'), L3:'Tối thiểu 90% món vay'}); });
  var soXep = Object.keys(L.gan).length, cong = soXep+' tổ'+(soXep===L.ds.length ? ' (100% tổ do '+c.ngan+' quản lý)' : ' / '+L.ds.length+' tổ');
  rows.push(mau==='m01b' ? {L1:'', L2:'Cộng', L3:cong, L4:''} : {L1:'Cộng', L2:cong, L3:''});
  if(mau==='m01b') return {mau:mau, cc:ktKHCC(), nam:nam, ten:ten, doan:[], rows:rows,
    f:Object.assign({KHT:kb.kh ? '- Căn cứ Kế hoạch kiểm tra, giám sát hoạt động nhận ủy thác số '+kb.kh+(kb.khNgay ? ', ngày '+kb.khNgay : '')+' của '+capTinh+';' : '',
      HDS:hd ? ' số '+hd+(kb.hdNgay ? ' ngày '+kb.hdNgay : '') : '', KH:kb.kh, KHN:kb.khNgay, HOIT:capTinh, HD:hd, HDN:kb.hdNgay, HT:c.tinh.toUpperCase(),   /* 3.106: căn cứ đầy đủ như ① */ HX:ktHXCo(hx, 4344).HX, HXZ:ktHXCo(hx, 4344).HXZ, VT:c.vt, NOI:xaTen, NAM:String(nam), NT:String(nam-1), TU:String(L.tu), DEN:String(L.den), NH:nh, HXT:ten, HL:loai, CT:c.ky.toUpperCase(), KY:ktKyKH(kb, v)}, CH)};
  /* 3.106 (anh chốt): thành phần ghi chung theo Bảng chuẩn hóa — không liệt kê từng người */
  var tp = ten+' thành lập đoàn kiểm tra gồm: Các đồng chí '+c.ky+', '+c.pho+', Ủy viên '+c.ld+' '+ten+'.';
  return {mau:mau, cc:ktKHCC(), nam:nam, ten:ten, doan:[tp], rows:rows,
    f:Object.assign({HT:c.tinh.toUpperCase(), HX:ktHXCo(hx, 4164).HX, HXZ:ktHXCo(hx, 4164).HXZ, NOI:xaTen, NAM:String(nam), NT:String(nam-1), TU:hai(L.tu)+'/'+nam, DEN:hai(L.den)+'/'+nam,
      KH:kb.kh, KHN:kb.khNgay, HOIT:capTinh, HD:hd, HDN:kb.hdNgay, NH:nh, HXT:ten, HOI1:ten, CT:c.ky.toUpperCase(), KY:ktKyKH(kb, v)}, CH)};
}
/* 3.138 (anh chốt, NĐ 30/2020): gạch dưới tên cơ quan dài 1/3–1/2 dòng chữ, đặt cân giữa, sát dưới chữ — tính theo độ dài tên thật (không còn hình vẽ cố định);
   gạch dưới Tiêu ngữ dài bằng dòng chữ. Dùng viền dưới của 1 đoạn rất thấp → Word / LibreOffice / bản In cùng chỗ */
function ktDoChu(t, sz, dam){ try{ var c = ktDoChu.c || (ktDoChu.c = document.createElement('canvas').getContext('2d')); c.font = (dam ? 'bold ' : '')+(sz/2)+'pt "Times New Roman", Times, serif'; return Math.round(c.measureText(String(t)).width*15); }catch(e){ return Math.round(String(t).length*sz*5.6); } }   /* bề rộng chữ (twip) */
function ktGachP(L, oRong){ var m = Math.max(0, Math.round((oRong-L)/2)); return '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="auto"/></w:pBdr><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/><w:ind w:left="'+m+'" w:right="'+m+'" w:firstLine="0"/><w:jc w:val="center"/><w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr></w:pPr></w:p>'; }
function ktDauP(x, i){ return Math.max(x.lastIndexOf('<w:p>', i), x.lastIndexOf('<w:p ', i)); }
function ktGachSau(x, chu, tl, oRong, sau){   /* gạch sau đoạn chứa `chu` (hoặc đoạn liền trước đoạn chứa `sau`) */
  var i = sau ? x.indexOf(sau) : x.indexOf(chu); if(i<0) return x; var a = ktDauP(x, i); if(a<0) return x;
  if(sau){ a = ktDauP(x, a-1); if(a<0) return x; }
  var e = x.indexOf('</w:p>', a)+6, p = x.slice(a, e), t = (p.match(/<w:t(?: [^>]*)?>[^<]*<\/w:t>/g) || []).map(function(z){ return z.replace(/<[^>]+>/g, ''); }).join('').trim(); if(!t) return x;
  var r = p.replace(/<w:pPr>[\s\S]*?<\/w:pPr>/, ''), sz = +((r.match(/<w:sz w:val="(\d+)"/) || p.match(/<w:sz w:val="(\d+)"/) || [0, 26])[1]), dam = /<w:b\/>|<w:b w:val="(?:true|1|on)"\/>/.test(r || p);
  return x.slice(0, e)+ktGachP(Math.min(ktDoChu(t, sz, dam), oRong)*tl, oRong)+x.slice(e);
}
function ktGachDau01(x){   /* Kế hoạch ① ②: bỏ 2 đường vẽ cố định ở đầu văn bản, thay bằng gạch theo chữ */
  var e = x.indexOf('</w:tbl>'); if(e<0 || x.indexOf('Độc lập')>e) return x;
  var d = x.slice(0, e).replace(/<w:r>(?:<w:rPr>(?:(?!<\/w:rPr>)[\s\S])*<\/w:rPr>)?<w:drawing>(?:(?!<\/w:drawing>)[\s\S])*?prst="line"[\s\S]*?<\/w:drawing><\/w:r>|<w:r>(?:<w:rPr>(?:(?!<\/w:rPr>)[\s\S])*<\/w:rPr>)?<w:drawing>(?:(?!<\/w:drawing>)[\s\S])*?(?:Connector|kết nối)[\s\S]*?<\/w:drawing><\/w:r>/g, '');
  var o = (d.match(/<w:gridCol w:w="(\d+)"\/><w:gridCol w:w="(\d+)"\/>/) || [0, 4400, 5600]);
  d = ktGachSau(d, '', 0.4, +o[1]-216, 'Số:');   /* tên cơ quan (đoạn liền trước "Số:") */
  d = ktGachSau(d, 'Độc lập', 1, +o[2]-216);
  ['Số:', 'ngày '].forEach(function(c){ var i = d.indexOf(c), q = i>=0 ? ktDauP(d, i) : -1; if(q<0) return; var k = d.indexOf('</w:pPr>', q); if(k<0 || k>i) return;   /* cách gạch 1 chút */
    var pp = d.slice(q, k).replace(/ w:before="\d+"/, ''); pp = /<w:spacing[ ]/.test(pp) ? pp.replace(/<w:spacing[ ]/, '<w:spacing w:before="100" ') : pp.replace(/(<w:pPr>(?:<w:pStyle [^>]*\/>)?)/, '$1<w:spacing w:before="100"/>'); d = d.slice(0, q)+pp+d.slice(k); });
  return d+x.slice(e);
}
function ktBung01(K, g){ return ktGachDau01(ktBung01Goc(K, g)); }
function ktBung01Goc(K, g){
  if(g.cc==='10566') K = Object.assign({}, K, {than:K.than.replace(KT_CC727, KT_CC10566)});   /* 3.112: chỉ thay dòng căn cứ đầu */
  if(!K.chu) return ktDien(K.than.replace('{{@LICH}}', g.rows.map(function(r){ return ktDien(K.dong, r); }).join('')), g.f)   /* 3.97: khuôn ② không có thành phần đoàn */
    .replace('{{@KHT}}', function(){ return g.f.KHT ? '<w:p>'+(K.khtPPr||'')+'<w:r><w:t xml:space="preserve">'+xmlEsc(g.f.KHT)+'</w:t></w:r></w:p>' : ''; });   /* 3.98: đã khai KH Hội tỉnh → thêm dòng căn cứ */
  var doan = g.doan.map(function(s){ return ktDien(K.chu, {X:s}); }).join('');   /* 3.106: 1 câu thành phần chung, bỏ dòng chấm */
  return ktDien(K.than.replace('{{@DOAN}}', doan).replace('{{@LICH}}', g.rows.map(function(r){ return ktDien(K.dong, r); }).join('')), g.f);
}
function ktKHXem(ok){
  if(ktKhuonTruoc(function(){ ktKHXem(ok); })) return;   /* 3.236: khuôn chưa tải */
  if(!ok) return ktInHop(['kh'], ktInNutXem('ktKHXem(1)'), ktHoiCuaTo(ktKHLich().ds));   /* 3.114: chọn người ký */
  var L0 = ktKHLich(); if(!L0.luu){ ktKHGhi(L0); ktVeThe(); }   /* 3.123 (anh chốt): xem / in = lưu kế hoạch để quay lại in báo cáo tổ */
  var g = ktKHGiaTri(ktInV('kh')); KT_KH_XEM = g;
  moHop('<div class="hop-tit">👁 Kế hoạch KTGS năm '+g.nam+' — '+coChuHTML(g.ten)+'</div>'+
    '<div class="hop-phu">'+(g.mau==='m01b' ? 'Khuôn ② mẫu gọn (bản kế hoạch mẫu Hội cấp xã)' : 'Khuôn ① dự thảo HĐT cấp xã · 90%')+' · căn cứ '+(g.cc==='10566' ? '10566 (trước 727)' : '727')+' · '+(g.rows.length-1)+' tháng có lịch. Số HĐUT, KH Hội tỉnh, người ký theo 🏛 Khai báo Hội đoàn thể; trống = dòng chấm.</div>'+
    '<iframe id="kt-kh-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({truoc:'<button class="nho" onclick="dongHop();ktKHXem()">‹ Đổi lựa chọn in</button>', html:function(){ return ktHTML01(KT_KH_XEM); }, in:'ktKHIn(\'in\')', pdf:'ktKHIn(\'pdf\')', word:'ktKHIn(\'word\')'}), true);   /* 3.152 */
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  var f = document.getElementById('kt-kh-khung'); xemChuan(f, ktHTML01(g));
}
function ktKHIn(cach){
  if(ktKhuonTruoc(function(){ ktKHIn(cach); })) return;   /* 3.236: khuôn chưa tải */
  var g = KT_KH_XEM; if(!g) return;
  var L0 = ktKHLich(); if(!L0.luu) ktKHGhi(L0);   /* 3.97: lập kế hoạch = lưu lịch → kiểm tra định kỳ gợi ý tổ theo lịch */
  var t0 = ktKHDsTo()[0], ten = t0 ? ktFTen(t0, {kh:g.nam}) : 'Ke hoach KTGS '+g.nam+' - '+boDauTen(g.ten).slice(0, 60);   /* 3.140.2: Xã_Hội_KH năm */
  dongHop();
  if(cach==='pdf') return inPDF(ktHTML01(g), ten);
  if(cach==='word') return ktDocx(g.mau||'m01', g).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx — khuôn dự thảo HĐT cấp xã, chỉ lưu trên máy / Drive của anh.', 7); })
    .catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  inBlob(new Blob([ktHTML01(g)], {type:'text/html'}), ten+'.html');
}
function ktHTML01(g){   /* bản In: đọc lại chính tài liệu Word đã điền → HTML (đoạn, đậm / nghiêng, canh lề, thụt đầu dòng, bảng) */
  var K = KT_KHUON[g.mau||'m01'], xml = K.mo+ktChamMin(ktBung01(K, g))+K.sect+'</w:body></w:document>';   /* 3.124: dòng chấm mịn như Word */
  return '<!doctype html><html><head><meta charset="utf-8"><title>Ke hoach KTGS</title><style>@page{size:A4;margin:20mm 15mm 20mm 30mm}'+KT_IN_CSS+
    'body{font-size:14pt}p{margin:0}table{border-collapse:collapse}td{vertical-align:top;padding:1pt 4pt}tr{break-inside:avoid}thead{display:table-header-group}.kt-vien td{border:.5pt solid #000}</style></head><body>'+ktXmlHTML(xml)+'</body></html>';
}
function ktXmlHTML(xml){
  var doc = new window.DOMParser().parseFromString(xml, 'application/xml'), W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  var con = function(e, ten){ for(var c = e.firstChild; c; c = c.nextSibling) if(c.namespaceURI===W && c.localName===ten) return c; return null; };
  var gt = function(e, ten){ var x = e && con(e, ten); return x ? (x.getAttributeNS(W, 'val') || 'on') : ''; };
  var bat = function(v){ return v && v!=='false' && v!=='0'; };
  var doan = function(p, lien){   /* lien (3.138.2): đoạn ngắn trong bảng không kẻ (đầu trang, khối ký) không xuống dòng — như Word */
    var pp = con(p, 'pPr'), jc = gt(pp, 'jc'), ind = pp && con(pp, 'ind'), st = [];
    if(lien && (p.textContent||'').length<=60) st.push('white-space:nowrap');
    var bd = pp && con(pp, 'pBdr');   /* 3.138: đoạn gạch (viền dưới) dưới tên cơ quan / Tiêu ngữ */
    if(bd && con(bd, 'bottom')){ var lt = ind ? +(ind.getAttributeNS(W, 'left')||0)/20 : 0, rt = ind ? +(ind.getAttributeNS(W, 'right')||0)/20 : 0; return '<div style="border-top:.6pt solid #000;margin:1.5pt '+rt+'pt 0 '+lt+'pt;height:0"></div>'; }
    if(jc) st.push('text-align:'+({both:'justify', end:'right', right:'right', center:'center'}[jc] || 'left'));
    if(ind){ var fl = ind.getAttributeNS(W, 'firstLine'); if(fl) st.push('text-indent:'+(+fl/20)+'pt'); }
    var sp = pp && con(pp, 'spacing'); if(sp){ var bf = sp.getAttributeNS(W, 'before'), af = sp.getAttributeNS(W, 'after'); if(bf) st.push('margin-top:'+(+bf/20)+'pt'); if(af) st.push('margin-bottom:'+(+af/20)+'pt'); }
    var tabs = pp && con(pp, 'tabs'), chamTab = !!(tabs && /leader="dot"/.test(new window.XMLSerializer().serializeToString(tabs)));
    var h = '';
    Array.prototype.forEach.call(p.getElementsByTagNameNS(W, 'r'), function(r){
      if(r.parentNode && r.parentNode.localName==='txbxContent') return;
      var rp = con(r, 'rPr'), b = rp && bat(gt(rp, 'b')), i = rp && bat(gt(rp, 'i')), sz = gt(rp, 'sz'), s = '';
      for(var c = r.firstChild; c; c = c.nextSibling){ if(c.localName==='t') s += coChuHTML(c.textContent); else if(c.localName==='br') s += '<br>'; else if(c.localName==='tab') s += chamTab ? '<span class="kt-tab"></span>' : ' '; }
      if(!s) return; var css = sz && +sz!==28 ? ' style="font-size:'+(+sz/2)+'pt"' : '';
      h += (b || i || css) ? '<span'+css+'>'+(b ? '<b>' : '')+(i ? '<i>' : '')+s+(i ? '</i>' : '')+(b ? '</b>' : '')+'</span>' : s; });
    if(chamTab) h = h.replace('<span class="kt-tab"></span>', '<span style="display:inline-block;width:88%;border-bottom:.5pt dotted #555"></span>');
    return '<p style="'+st.join(';')+'">'+(h || '&nbsp;')+'</p>';
  };
  var bang = function(tb){
    var xs = new window.XMLSerializer(), tp = con(tb, 'tblPr'), vien = /<w:tblBorders>(?:(?!<\/w:tblBorders>)[\s\S])*w:val="single"/.test(tp ? xs.serializeToString(tp) : '') || [].some.call(tb.getElementsByTagNameNS(W, 'tcBorders'), function(b){ return /w:val="single"/.test(xs.serializeToString(b)); }),   /* 3.138.2: chỉ viền bảng / ô (không tính viền đoạn — gạch dưới tên cơ quan) */ h = '<table class="'+(vien ? 'kt-vien' : '')+'" style="width:100%;margin:4pt 0">', dau = true;
    Array.prototype.forEach.call(tb.childNodes, function(tr){ if(tr.localName!=='tr') return;
      var la = /tblHeader/.test(new window.XMLSerializer().serializeToString(con(tr, 'trPr') || tr.ownerDocument.createElement('x')));
      h += (la ? '<thead>' : '')+'<tr>'+Array.prototype.map.call(tr.childNodes, function(tc){ if(tc.localName!=='tc') return ''; var w = con(con(tc, 'tcPr') || tc, 'tcW');
        return '<td'+(w ? ' style="width:'+(+w.getAttributeNS(W, 'w')/20)+'pt"' : '')+'>'+Array.prototype.map.call(tc.childNodes, function(x){ return x.localName==='p' ? doan(x, !vien) : x.localName==='tbl' ? bang(x) : ''; }).join('')+'</td>'; }).join('')+'</tr>'+(la ? '</thead>' : ''); dau = false; });
    return h+'</table>';
  };
  var body = doc.getElementsByTagNameNS(W, 'body')[0]; if(!body) return '';
  return Array.prototype.map.call(body.childNodes, function(x){ return x.localName==='p' ? doan(x) : x.localName==='tbl' ? bang(x) : ''; }).join('');
}

/* ===================== 3.97: 🗓 KIỂM TRA ĐỊNH KỲ THEO LỊCH — Mẫu 06 + Mẫu 16 (anh chốt) =====================
   - anh chọn SỐ LIỆU cuối tháng (ô Số liệu phía trên, vd Mẫu 31 chốt 30/09/2026) → THÁNG KIỂM TRA = tháng sau (10/2026);
     trên mẫu ghi "ngày …… tháng 10 năm 2026" (ngày để trống), Mẫu 06 "Thời điểm kiểm tra: …../10/2026"; Mẫu 16 mục I "đến thời điểm 30/09/2026"
     (BC0437 chỉ dùng khi CÙNG tháng số liệu, không thì tính từ Mẫu 31)
   - tổ: gợi ý tổ có lịch tháng đó trong Kế hoạch 01/KH (tích sẵn); chọn xã / hội ở cây → hiện thêm tổ khác trong phạm vi để tích (kế hoạch có thể đổi — chọn độc lập)
   - Mẫu 06 mỗi tổ: hộ còn dư nợ có món giải ngân từ CÁC NĂM TRƯỚC (trước 01/01 năm kiểm tra), chỉ in các món đó; tích sẵn 100%, anh bỏ tích;
     tỷ lệ theo hộ (anh chốt) ≥ 90% (kèm tỷ lệ món — 727 ghi "khoản vay"); hộ quá hạn / khoanh KHÔNG tích (kiểm tra riêng), anh tích tay khi cần
   - Mẫu 16 mỗi tổ đi kèm; xuất 2 file Word (06 nhiều phiếu, 16 nhiều biên bản — mỗi tổ trang mới) + In (3.98: không ghi nhật ký) */
var KT_DK_CHON = {}, KT_DK_BO = {}, KT_DK_THEM = {}, KT_DK_MO = '', KT_DK_XEM = null, KT_DK_CACHE = {};
var KT_DK_TH = '';   /* 3.140: tháng kiểm tra ép (in theo tháng kế hoạch) */
function ktDKThang(){ return KT_DK_TH || ktNguonThangKT(); }   /* 3.328: tháng kiểm tra = ô Tháng kiểm tra khối Bắt buộc (mặc định tháng sau kỳ số liệu như cũ) */
function ktDKLich(th){   /* tổ có lịch tháng th trong các Kế hoạch 01/KH đã lưu → {mã tổ: 'năm|xã|hội'} */
  var S = D.cauHinh.ktKH || {}, nam = th.slice(0, 4), m = +th.slice(5, 7), ra = {};
  Object.keys(S).forEach(function(k){ if(k.split('|')[0]!==nam) return; var to = (S[k]||{}).to || {}; Object.keys(to).forEach(function(ma){ if(+to[ma]===m) ra[ma] = k; }); });
  return ra;
}
function ktDKHo(t){   /* hộ của tổ cho kiểm tra định kỳ: có món còn dư nợ giải ngân trước 01/01 năm kiểm tra */
  var th = ktDKThang(), k = KT_K.ky+'|'+th+'|'+t.ma; if(KT_DK_CACHE[k]) return KT_DK_CACHE[k];
  var dau = th.slice(0, 4)+'-01-01', ho = [];
  ktHo(t).forEach(function(h){ var mon = h.mon.filter(function(m){ var d = m.ngn || m.nv || ''; return d && d<dau; }); if(mon.length) ho.push({h:h, mon:mon}); });
  ho.sort(function(a, b){ return ktTheoKH(a.h, b.h); });   /* 3.98: theo mã KH */
  return KT_DK_CACHE[k] = ho;
}
function ktDKCo(ma, x){ var k = ma+'|'+x.h.kh; return x.h.loai ? !!KT_DK_THEM[k] : !KT_DK_BO[k]; }
function ktDKTyLe(t){
  var ho = ktDKHo(t), dung = ho.filter(function(x){ return !x.h.loai; }), chon = ho.filter(function(x){ return ktDKCo(t.ma, x); });
  var monD = dung.reduce(function(a, x){ return a+x.mon.length; }, 0), monC = dung.filter(function(x){ return ktDKCo(t.ma, x); }).reduce(function(a, x){ return a+x.mon.length; }, 0);
  var nC = dung.filter(function(x){ return ktDKCo(t.ma, x); }).length;
  return {ho:ho, nDung:dung.length, nChon:nC, nTong:chon.length, monD:monD, monC:monC, pt:dung.length ? nC/dung.length*100 : 0, ptMon:monD ? monC/monD*100 : 0};
}
function ktDKDs(){   /* 3.140 (anh chốt): chọn TỰ DO — tổ trong phạm vi + tổ anh đã tích, không tích sẵn theo Kế hoạch (in theo kế hoạch ở chip 🗓 Kế hoạch) */
  var C = ktCH(), ds = [];
  Object.keys(KT_K.to).forEach(function(m){ var t = KT_K.to[m]; if(toLaTT(t) || !(KT_DK_CHON[m] || (C.xa && pvLoc(C, t)))) return; ds.push({t:t, lich:false, chon:!!KT_DK_CHON[m]}); });
  return ds.sort(function(a, b){ return ((a.t.tenXa||'')+'|'+String(a.t.dv||'')+'|'+ktKHAp(a.t)+'|'+(a.t.ten||'')).localeCompare((b.t.tenXa||'')+'|'+String(b.t.dv||'')+'|'+ktKHAp(b.t)+'|'+(b.t.ten||''), 'vi', {numeric:true}); });
}
function ktDKVe(o){ var th = ktDKThang(); return ktNguonVe(o, th, function(){ ktDKVeG(o, th); }); }   /* 3.328: số liệu cuối tháng liền trước tháng kiểm tra */
function ktDKVeG(o, th){
  var C = ktCH(), K = KT_K;
  var h = ktCheDoHTML()+ktAThangHTML(th);
  if(!th){ o.innerHTML = h+'<div class="sl-bao vang">Kiểm tra định kỳ cần <b>số liệu cuối tháng</b> (Mẫu 31 chốt tháng) — chọn ở ô <b>Số liệu</b> phía trên. Số liệu theo ngày không dùng cho kiểm tra định kỳ.</div>'; return; }
  var lich = ktDKLich(th), nLich = Object.keys(lich).filter(function(m){ return K.to[m]; }).length;   /* 3.329: gộp lối Kế hoạch — tích tổ có lịch tháng kiểm tra */
  h += '<div class="kt-gn-dau"><span class="sl-phu">Phạm vi: <b>'+coChuHTML(pvChu(C, KT_K))+'</b> — chọn xã / hội ở cây để thêm tổ ngoài lịch</span>'+(nLich ? GD.nut({chu:'📅 Tích '+nLich+' tổ có lịch T'+(+th.slice(5)), lenh:'ktk.dkLich', tit:'Theo Kế hoạch 01/KH đã lưu (thẻ 🗓 Lịch năm)'}) : '')+'</div>';
  var ds = ktDKDs();
  if(!ds.length){ o.innerHTML = h+'<div class="rong">Chọn xã (hoặc hội, điểm GD) ở cây phía trên để chọn tổ kiểm tra — chọn tự do, không theo Kế hoạch. Theo kế hoạch: nút 📅 Tích tổ có lịch, hoặc thẻ 🗓 Lịch năm → bấm tháng.</div>'; return; }
  var chon = ds.filter(function(r){ return r.chon; });
  h += '<div class="to-the-so">Chọn tự do (không theo Kế hoạch) · đã chọn <b>'+chon.length+'</b> tổ → '+chon.length+' phiếu Mẫu 06 + '+chon.length+' biên bản Mẫu 16</div>';
  h += '<div class="to-bang-cuon"><table class="to-bang kt-bc-bang kt-dk-bang"><thead><tr><th>Chọn</th><th>Tổ (mã)</th><th>Ấp · xã</th><th>Hội</th><th>Lịch</th><th>Hộ kiểm tra (≥ 90%)</th><th>Món</th><th></th></tr></thead><tbody>';
  var truoc = '';
  ds.forEach(function(r){ var t = r.t, m = t.ma;
    var x = r.chon || KT_DK_MO===m ? ktDKTyLe(t) : null;
    h += '<tr class="'+(r.chon ? 'kt-co' : 'kt-loai')+'"><td class="c"><input type="checkbox"'+(r.chon ? ' checked' : '')+' data-lenh="ktk.dkTich" data-su="change" data-m="'+m+'" aria-label="Chọn tổ"></td>'+
      '<td class="to-ten"><b>'+coChuHTML(t.ten||'Tổ '+m)+'</b> ('+m+')</td><td>'+coChuHTML([t.tenThon, t.tenXa].filter(Boolean).join(' · '))+'</td><td>'+coChuHTML(tdnHoi(t.dv))+'</td><td></td>'+
      '<td>'+(x ? '<b class="'+(x.pt>=90 ? 'xanh' : 'do')+'">'+x.nChon+'/'+x.nDung+' hộ = '+ktPT(x.pt)+'%</b>'+(x.nTong>x.nChon ? ' <small>+ '+(x.nTong-x.nChon)+' QH/khoanh</small>' : '') : '')+'</td>'+
      '<td>'+(x ? x.monC+'/'+x.monD+' món ('+ktPT(x.ptMon)+'%)' : '')+'</td><td><button type="button" class="nho" data-lenh="ktk.dkMo" data-m="'+m+'">'+(KT_DK_MO===m ? '▴ Thu gọn' : '▾ Chọn hộ')+'</button></td></tr>';
    if(KT_DK_MO===m) h += '<tr><td colspan="8">'+ktDKHoHTML(t, x)+'</td></tr>'; });
  h += '</tbody></table></div>';
  var xaDK = {}; chon.forEach(function(r){ if(r.t.xa) xaDK[r.t.xa] = 1; });
  h += ktKBKhung('dk', ktHoiDsXa(xaDK))+'<div class="hang-nut kt-in"><button class="nho chinh" onclick="ktDocKB();ktDKXem()"'+(chon.length ? '' : ' disabled')+'>👁 Xem '+chon.length+' tổ · Mẫu 06 + 16</button></div>'+
    '<p class="ghi">Mẫu 06: hộ còn dư nợ có món giải ngân từ các năm trước (trước 01/01/'+th.slice(0, 4)+'), chỉ in các món đó; tích sẵn 100%, bỏ tích hộ không kiểm — 727: tối thiểu 90% (tính theo hộ, kèm tỷ lệ món). '+
      'Hộ quá hạn / khoanh không tích (kiểm tra riêng) — tích tay khi cần. Mẫu 16 lấy số liệu đến '+ngayVNsl(tdnCuoiKy(K.ky))+' (BC0437 cùng tháng nếu đã nạp, không thì tính từ Mẫu 31). Ngày kiểm tra để trống, ghi tháng '+th.slice(5)+'/'+th.slice(0, 4)+'.</p>';
  o.innerHTML = h;
}
function ktDKHoHTML(t, x){   /* 3.98: cột chung (mã KH, món, lãi tồn, 105, ghi chú) — theo mã KH; chỉ in các món giải ngân năm trước */
  return '<div class="to-bang-cuon"><table class="to-bang kt-bang">'+KT_HO_TH+'<tbody>'+
    x.ho.map(function(y, i){ var c = ktDKCo(t.ma, y), k = y.h.kh;
      return ktHoDongHTML({stt:i+1, h:y.h, lop:c ? 'kt-co' : '', chon:'<input type="checkbox"'+(c ? ' checked' : '')+' onchange="ktDKHoTich(\''+t.ma+'\',\''+k+'\','+(y.h.loai ? 1 : 0)+',this.checked)" aria-label="Chọn hộ">',
        mon:y.mon.map(function(m){ return ktMonDong(m); }).join('')+(y.mon.length<y.h.mon.length ? '<small class="kt-ku">+ '+(y.h.mon.length-y.mon.length)+' món GN năm nay (không in)</small>' : ''), ghi:ktGhiHo(y.h)}); }).join('')+'</tbody></table></div>';
}
function ktDKTich(m, v){ KT_DK_CHON[m] = !!v; ktVeThe(); }
function ktDKMo(m){ KT_DK_MO = KT_DK_MO===m ? '' : m; ktVeThe(); }
function ktDKHoTich(ma, kh, loai, v){ var k = ma+'|'+kh; if(loai){ if(v) KT_DK_THEM[k] = 1; else delete KT_DK_THEM[k]; } else { if(v) delete KT_DK_BO[k]; else KT_DK_BO[k] = 1; } ktVeThe(); }
var KT_SO_CUNG = false;   /* 3.97: định kỳ — BC0437 chỉ dùng khi cùng tháng số liệu */
function ktDKGiaTri(v, v16, dsTo){ v16 = v16 || v;   /* 3.114: lựa chọn in riêng Mẫu 06 / Mẫu 16 · 3.140: dsTo = danh sách tổ (in theo tháng kế hoạch) */
  var th = ktDKThang(), mm = th.slice(5), yy = th.slice(0, 4), g06 = [], g16 = [];
  KT_SO_CUNG = true;
  try {
    (dsTo ? dsTo.map(function(t){ return {t:t}; }) : ktDKDs().filter(function(r){ return r.chon; })).forEach(function(r){
      var t = r.t, x = ktDKTyLe(t), dc = x.ho.filter(function(y){ return ktDKCo(t.ma, y); }).map(function(y){ return {kh:y.h.kh, ten:y.h.ten, mon:y.mon}; });
      ktMaKV(dc.reduce(function(a, h){ return a.concat(h.mon); }, []));
      var vv = Object.assign({}, v, {ngay:''});
      var a = ktGiaTri06(t, dc, vv); a.f.TD = '…../'+mm+'/'+yy; a.f.ND = ''; a.f.NM = mm; a.f.NY = yy; a.t = t; a.x = x; a.dc = dc; g06.push(a);
      var b = ktGiaTri16(t, dc, Object.assign({}, v16, {ngay:''})); b.f.ND = ''; b.f.NM = mm; b.f.NY = yy.slice(2); b.t = t; g16.push(b);
    });
  } finally { KT_SO_CUNG = false; }
  return {th:th, g06:g06, g16:g16};
}
function ktDKXem(che, ok){ return ktNguonVoi(ktDKThang(), function(){ return ktDKXemG(che, ok); }); }   /* 3.328 */
function ktDKXemG(che, ok){
  if(!che){ if(!ok) return ktInHop(['m06','m16'], ktInNutXem("ktDKXem('',1)"), ktHoiCuaTo(ktDKDs().filter(function(r){ return r.chon; }).map(function(r){ return r.t; })));
    KT_DK_XEM = ktDKGiaTri(ktInV('m06'), ktInV('m16')); che = '06'; }
  var X = KT_DK_XEM; if(!X || !X.g06.length) return bao('Chưa chọn tổ nào.', 3);
  var tit = 'Kiểm tra định kỳ tháng '+X.th.slice(5)+'/'+X.th.slice(0, 4)+' — '+X.g06.length+' tổ';
  moHop('<div class="hop-tit">👁 '+tit+'</div>'+
    '<div class="kt-che"><button class="to-loc'+(che==='06' ? ' bat' : '')+'" onclick="ktDKXem(\'06\')">Mẫu 06 · '+X.g06.length+' phiếu</button><button class="to-loc'+(che==='16' ? ' bat' : '')+'" onclick="ktDKXem(\'16\')">Mẫu 16 · '+X.g16.length+' biên bản</button></div>'+
    '<iframe id="kt-dk-khung" class="to-khung" title="Xem trước"></iframe>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop();ktDKXem()">‹ Đổi lựa chọn in</button><button class="nho" data-lenh="hop.dong">Đóng</button>'+
    '<button class="nho" onclick="ktDKIn(\'in\',\'06\')">🖨 In 06</button><button class="nho" onclick="ktDKIn(\'in\',\'16\')">🖨 In 16</button>'+
    '<button class="nho chinh" onclick="ktDKIn(\'word\',\'06\')">📄 Word 06</button><button class="nho chinh" onclick="ktDKIn(\'word\',\'16\')">📄 Word 16</button></div>', true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  var f = document.getElementById('kt-dk-khung'); xemChuan(f, che==='16' ? ktHTML16(X.g16) : ktHTML06(X.g06));
}
function ktDKIn(cach, mau){
  var X = KT_DK_XEM; if(!X) return;
  var ten = (mau==='06' ? 'Mau 06 dinh ky ' : 'Mau 16 dinh ky ')+kyVN(X.th).replace(/\//g, '-')+' - '+boDauTen(pvChu(ktCH(), KT_K)).slice(0, 50)+' - '+X.g06.length+' to';
  dongHop();
  var gt = mau==='06' ? X.g06 : X.g16;
  if(cach==='word') return ktDocx(mau==='06' ? 'm06' : 'm16', gt).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx (mỗi tổ 1 trang mới) — chỉ lưu trên máy / Drive của anh.', 7); if(D.cauHinh.slTab==='kt') ktVeThe(); })
    .catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  inBlob(new Blob([mau==='06' ? ktHTML06(gt) : ktHTML16(gt)], {type:'text/html'}), ten+'.html');
  if(D.cauHinh.slTab==='kt') ktVeThe();
}

