/* ===== js/80-ktgs-to.js — 3.514 (anh 11/11/2026): 🎯 KIỂM TRA TỔ — 1 hay nhiều tổ (gộp Kiểm tra định kỳ 06 + 16 và Mẫu 04 vào đây) =====
   Anh: "định kỳ coi như nằm trong kiểm tra tổ, kiểm tra tổ cho chọn nhiều tổ" · "phần kiểm tra theo kế hoạch năm để riêng, không link qua" ·
   "như chức năng kiểm tra định kỳ cũ, cho các kiểu chọn hộ: toàn hộ tốt, toàn hộ cần quan tâm, chia đều hoặc chọn hết tổ" · "theo đúng luật, nên có nút chọn 2 kiểu" ·
   "chia 30% cần quan tâm gọi là trung hòa" · "1 ô ngày chung cho 1 đợt" · "cấu trúc trung hòa và số hộ cho khai báo" · "nút Esc để lùi về 1 cấp".
   - Số liệu: Kỳ đầu trang (KT_K); BC0437 đúng tháng (ktBC37Dung — thiếu → để trống điểm). Không ngày kiểm tra → phiếu ghi tháng kiểm tra
     (kỳ là tháng → tháng sau; kỳ là ngày → chính tháng đó) như Kiểm tra định kỳ cũ. ✅ Hết tổ + 📜 Đúng luật + kỳ cuối tháng = bản in Định kỳ cũ.
   - Món xét: 📜 Đúng luật = món giải ngân trước 01/01 năm kiểm tra (món mới đã có kiểm tra sau 30 ngày) · Mọi món còn dư nợ.
   - Chọn hộ: ktGoiY (js/22b) cho từng tổ — kiểu tot · xau · trung (% cần quan tâm theo khai báo) · het; số hộ ktSoGoiY (khai báo) ± chỉnh của đợt.
   - Tổ đã tích = KT_DK_CHON (chung ktDKDs — giữ khi đổi cây lọc). Hộ từng tổ: KTTO.ho (phiên), ▾ mở sửa.
   - In: không đổi hàm dựng mẫu (ktGiaTri06 / 16, ktBC04, kt15DL, ktttVo) — QUY_CHUAN 1b, t179.
   - Khai báo: D.cauHinh.ktChonHo {ng1, ng2, s1, s2, s3, pt, kieu, mon} (⚙ Khai báo › 🎯 Chọn hộ kiểm tra; theo 🔒 khóa khai báo Hội + 📜 nhật ký).
   Gói 1 không gian tên KTTO (QUY_CHUAN mục 13). ===== */
var KTTO = {
  MD: {ng1:20, ng2:40, s1:6, s2:7, s3:8, pt:30, kieu:'trung', mon:'luat'},
  KIEU: [['tot', '👍 Toàn hộ tốt'], ['xau', '⚠ Toàn hộ cần quan tâm'], ['trung', '⚖ Trung hòa'], ['het', '✅ Chọn hết tổ']],
  MON: [['luat', '📜 Đúng luật', 'Món giải ngân trước 01/01 năm kiểm tra — món mới đã có kiểm tra sau 30 ngày'], ['tat', 'Mọi món còn dư nợ', 'Mọi món còn dư nợ, kể cả món giải ngân trong năm (hộ GN dưới 30 ngày tự tích)']],
  ho: {}, khoaHo: '', mo: '', d: 0, kieu: '', mon: '', toCu: '', chonGan: null,
  /* ---------- khai báo ---------- */
  kb: function(){ var k = D.cauHinh.ktChonHo || {}, r = {};
    Object.keys(KTTO.MD).forEach(function(x){ var v = k[x], so = typeof KTTO.MD[x]==='number'; r[x] = v===undefined || v==='' || (so && !isFinite(+v)) ? KTTO.MD[x] : so ? +v : v; });
    r.pt = Math.max(0, Math.min(100, r.pt)); return r; },
  kieuDung: function(){ return KTTO.kieu || KTTO.kb().kieu; },
  monDung: function(){ return KTTO.mon || KTTO.kb().mon; },
  thKT: function(){ var k = String(KT_K && KT_K.ky || ''); return k.length===7 ? kyLui(k, 1) : slThang(k); },   /* tháng kiểm tra in trên phiếu khi không khai ngày */
  /* ---------- NGHIỆP VỤ: hộ / món ---------- */
  loc: function(){ if(KTTO.monDung()!=='luat') return null; var dau = KTTO.thKT().slice(0, 4)+'-01-01';
    return function(ds){ var ra = []; ds.forEach(function(h){ var mon = h.mon.filter(function(m){ var d = m.ngn || m.nv || ''; return d && d<dau; });
      if(mon.length) ra.push(Object.assign({}, h, {mon:mon, moi30:[]})); }); return ra; }; },   /* như ktDKHo (Định kỳ cũ) */
  khoa: function(){ return [KT_K && KT_K.ky, KTTO.kieuDung(), KTTO.monDung(), KTTO.d, JSON.stringify(KTTO.kb())].join('|'); },
  goi: function(t){   /* gợi ý hộ của tổ (giữ phần anh đã tích / bỏ trong đợt) */
    var k = KTTO.khoa(); if(k!==KTTO.khoaHo){ KTTO.ho = {}; KTTO.khoaHo = k; }
    if(KTTO.ho[t.ma]) return KTTO.ho[t.ma];
    var s = ktSoTo(t), n0 = ktSoGoiY(s.stv || toKhach(t).length), kieu = KTTO.kieuDung();
    var X = ktGoiY(t, kieu, kieu!=='het' && KTTO.d ? Math.max(1, Math.min(30, n0+KTTO.d)) : 0, null, KTTO.loc());
    return KTTO.ho[t.ma] = X; },
  daChon: function(t){ var X = KTTO.goi(t); return X.ds.filter(function(h){ return X.chon[h.kh]; }).sort(ktTheoKH); },
  dsBang: function(){ return typeof ktDKDs==='function' ? ktDKDs() : []; },
  dsTo: function(){ return KTTO.dsBang().filter(function(r){ return r.chon; }).map(function(r){ return r.t; }); },
  /* giá trị Mẫu 06 / 16 cho các tổ đã tích — như ktDKGiaTri (Định kỳ cũ), hộ = hộ đã chọn, ngày = ô chung */
  giaTri: function(v, v16){ v16 = v16 || v;
    var th = KTTO.thKT(), mm = th.slice(5), yy = th.slice(0, 4), ng = (KT_KB && KT_KB.ngay) || '', g06 = [], g16 = [];
    KT_SO_CUNG = true;
    try { KTTO.dsTo().forEach(function(t){
      var dc = KTTO.daChon(t).map(function(h){ return {kh:h.kh, ten:h.ten, mon:h.mon}; });
      ktMaKV(dc.reduce(function(a, h){ return a.concat(h.mon); }, []));
      var a = ktGiaTri06(t, dc, Object.assign({}, v, {ngay:ng})); if(!ng){ a.f.TD = '…../'+mm+'/'+yy; a.f.ND = ''; a.f.NM = mm; a.f.NY = yy; } a.t = t; a.dc = dc; g06.push(a);
      var b = ktGiaTri16(t, dc, Object.assign({}, v16, {ngay:ng})); if(!ng){ b.f.ND = ''; b.f.NM = mm; b.f.NY = yy.slice(2); } b.t = t; g16.push(b); });
    } finally { KT_SO_CUNG = false; }
    return {th:th, ng:ng, g06:g06, g16:g16}; },
  /* ---------- màn ---------- */
  ve: function(o){
    var C = ktCH(), K = KT_K; if(!K){ o.innerHTML = ktCheDoHTML()+'<div class="rong">Chưa có số liệu Mẫu 31.</div>'; return; }
    if(C.to && C.to!==KTTO.toCu && K.to[C.to] && !toLaTT(K.to[C.to])){ KT_DK_CHON[C.to] = true; KTTO.mo = C.to; }   /* chọn 1 tổ ở cây → tích + mở sẵn */
    KTTO.toCu = C.to || '';
    var t1 = C.to && K.to[C.to] && KT_DK_CHON[C.to] ? K.to[C.to] : null;   /* tương thích hàm 1 tổ cũ (ktDaChon, ktXuat, ktDoiKieu…): KT_CHON = hộ của tổ đang chọn ở cây */
    if(t1){ KTTO.khoaHo = KTTO.khoa()===KTTO.khoaHo ? KTTO.khoaHo : (KTTO.ho = {}, KTTO.khoa());
      if(KT_CHON && KT_CHON.to===t1.ma && KT_CHON!==KTTO.chonGan) KTTO.ho[t1.ma] = KT_CHON;   /* hàm cũ vừa gợi ý lại → nhận */
      KT_CHON = KTTO.chonGan = KTTO.goi(t1); }
    var ds = KTTO.dsBang(), chon = ds.filter(function(r){ return r.chon; }), kieu = KTTO.kieuDung(), mon = KTTO.monDung(), kb = KTTO.kb(), soHo = 0;
    var h = ktCheDoHTML()+ktSLDong()+'<div class="kt-to-cong">'+
      '<span class="kt-to-nhom"><span class="sl-phu">Món xét:</span>'+KTTO.MON.map(function(x){ return GD.chip(x[1], mon===x[0], 'ktto.mon', {k:x[0]}, x[2]); }).join('')+'</span>'+
      '<span class="kt-to-nhom"><span class="sl-phu">Kiểu chọn hộ:</span>'+KTTO.KIEU.map(function(x){ return GD.chip(x[1]+(x[0]==='trung' ? ' <small>'+kb.pt+'% cần QT</small>' : ''), kieu===x[0], 'ktto.kieu', {k:x[0]}); }).join('')+'</span>'+
      (kieu==='het' ? '' : '<span class="kt-to-nhom kt-so"><span class="sl-phu">Số hộ mỗi tổ:</span>'+GD.nut({chu:'−', lenh:'ktto.so', du:{d:-1}, tit:'Bớt 1 hộ mỗi tổ'})+'<b>'+(KTTO.d ? (KTTO.d>0 ? '+' : '')+KTTO.d : 'theo khai báo')+'</b>'+GD.nut({chu:'+', lenh:'ktto.so', du:{d:1}, tit:'Thêm 1 hộ mỗi tổ'})+
        ' <small>('+kb.s1+' / '+kb.s2+' / '+kb.s3+' hộ theo số tổ viên ≤ '+kb.ng1+' / ≤ '+kb.ng2+' / lớn hơn)</small></span>')+
      GD.nut({chu:'↺ Gợi ý lại', lenh:'ktto.lai', tit:'Gợi ý lại hộ mọi tổ đã tích (bỏ phần đã sửa tay)'})+'</div>';
    if(!ds.length){ o.innerHTML = h+'<div class="rong">'+(C.xa ? 'Không có tổ trong phạm vi.' : 'Chọn <b>xã</b> (điểm GD / hội / tổ) ở cây phía trên để chọn tổ kiểm tra.')+'</div>'+KTTO.ghi(); return; }
    var rows = ds.map(function(r, i){ var t = r.t, s = ktSoTo(t), X = r.chon ? KTTO.goi(t) : null, n = X ? Object.keys(X.chon).length : 0; soHo += n;
      var mo = r.chon && KTTO.mo===t.ma;
      return '<tr class="'+(r.chon ? 'kt-co' : '')+'"><td class="c"><input type="checkbox"'+(r.chon ? ' checked' : '')+' data-lenh="ktto.to" data-su="change" data-m="'+t.ma+'" aria-label="Chọn tổ"></td><td class="c">'+(i+1)+'</td>'+
        '<td class="to-ten"><b>'+coChuHTML(t.ten || '')+'</b> <small>('+t.ma+')</small></td><td>'+coChuHTML(t.tenThon || '')+'</td><td>'+coChuHTML(tdnHoi(t.dv))+'</td>'+
        '<td class="s">'+(s.stv || '')+'</td><td class="s">'+ktTr(s.dn)+'</td><td class="s">'+(s.qh ? ktTr(s.qh) : '')+'</td>'+
        '<td class="'+(KT_XL_LOP[s.xl] || '')+'">'+(s.diem!=='' && s.diem!==undefined ? String(s.diem).replace('.', ',')+' · ' : '')+coChuHTML(s.xl || '')+'</td>'+
        '<td class="c">'+(X ? '<b>'+n+'</b>/'+X.ds.filter(function(x){ return !x.loai; }).length : '')+'</td>'+
        '<td>'+(r.chon ? '<button type="button" class="nho" data-lenh="ktto.mo" data-m="'+t.ma+'">'+(mo ? '▴ Thu gọn' : '▾ Hộ')+'</button>' : '')+'</td></tr>'+
        (mo ? '<tr class="kt-to-mo"><td colspan="11">'+KTTO.hoHTML(t, X)+'</td></tr>' : ''); }).join('');
    var tatCa = chon.length===ds.length, co = chon.length>0, n = function(chu, m, tit){ return GD.nut({chu:chu, lenh:'ktto.xem', du:{m:m}, tit:tit, tat:!co}); };
    h += '<div class="hang-nut kt-in kt-to-in"><span class="to-the-so kt-to-dem">Đã chọn <b>'+chon.length+'</b>/'+ds.length+' tổ · <b>'+soHo+'</b> hộ</span>'+   /* hàng in ngay trên bảng — nhiều tổ không phải cuộn xuống */
      '<label class="kt-ngay-in"><span>📅 Ngày kiểm tra</span><input id="kb-ngay" type="date" value="'+coChuHTML(KT_KB.ngay || '')+'" data-lenh="f22b.ktDocKB" data-su="change" aria-label="Ngày kiểm tra (chung cả đợt)"></label>'+
      n('📋 Tóm tắt', 'tt', 'Tóm tắt tình hình tổ 1 mặt A4 — mỗi tổ 1 trang')+n('📄 06/TD', 'm06', 'Phiếu kiểm tra sử dụng vốn — mỗi tổ 1 phiếu')+
      GD.nut({chu:'📄 15/TD', lenh:'kt7.m15', du:{c:'to'}, tit:'Danh sách đối chiếu số dư tiền vay và tiền gửi (VB 727) — mỗi tổ 1 danh sách', tat:!co})+
      n('📄 16/TD', 'm16', 'Biên bản kiểm tra Tổ — mỗi tổ 1 biên bản')+n('📄 04', 'm04', 'Báo cáo tổng hợp kết quả kiểm tra — mỗi Hội – xã 1 báo cáo')+'</div>'+
      '<div class="to-bang-cuon"><table class="to-bang kt-to-bang"><thead><tr><th><input type="checkbox"'+(tatCa ? ' checked' : '')+' data-lenh="ktto.tat" data-su="change" aria-label="Tích hết / bỏ hết"></th><th>STT</th><th>Tổ</th><th>Ấp</th><th>Hội</th><th>TV</th><th>Dư nợ</th><th>QH</th><th>Điểm · XL</th><th>Hộ chọn</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>';
    h += ktKBKhung('dx', ktHoiCuaTo(KTTO.dsTo()))+(typeof ktDXTom==='function' ? ktDXTom() : '')+KTTO.ghi();   /* dòng 🧾 khai báo in của bộ đang chọn + ✎ */
    o.innerHTML = h;
  },
  hoHTML: function(t, X){
    var ds = X.ds.slice().sort(ktTheoKH), nTot = ds.filter(function(h){ return h.tot; }).length, nXau = ds.filter(function(h){ return h.xau; }).length, nL = ds.filter(function(h){ return h.loai; }).length;
    var thieu = X.kieu==='tot' && nTot<X.so ? 'chỉ có '+nTot+' hộ tốt — đã bù hộ khác' : X.kieu==='xau' && nXau<X.so ? 'chỉ có '+nXau+' hộ cần quan tâm — đã bù hộ khác' : '';
    return '<div class="kt-nhom-so"><small>'+coChuHTML(t.ten || t.ma)+': <b>'+nTot+'</b> hộ tốt · <b>'+nXau+'</b> hộ cần quan tâm · <b>'+nL+'</b> quá hạn / khoanh (không tự tích)'+(thieu ? ' — <span class="vang">'+thieu+'</span>' : '')+'</small></div>'+
      '<table class="to-bang kt-bang">'+KT_HO_TH+'<tbody>'+(ds.map(function(x, i){ var c = X.chon[x.kh];
        return ktHoDongHTML({stt:i+1, h:x, lop:c ? 'kt-co' : '', chon:'<input type="checkbox"'+(c ? ' checked' : '')+' data-lenh="ktto.ho" data-su="change" data-m="'+t.ma+'" data-kh="'+coChuHTML(x.kh)+'" aria-label="Chọn hộ">',
          mon:x.mon.map(function(m){ return ktMonDong(m); }).join(''), ghi:ktGhiHo(x, c ? c.ly : '')}); }).join('') || '<tr><td colspan="8" class="rong">Tổ không có hộ thuộc món xét.</td></tr>')+'</tbody></table>';
  },
  ghi: function(){ return '<p class="ghi">Tích 1 hay nhiều tổ → app gợi ý hộ từng tổ theo kiểu chọn (▾ Hộ để sửa). Hộ quá hạn / khoanh không tự tích (kiểm tra riêng) — tích tay khi cần. '+
    'Ngày kiểm tra để trống → phiếu ghi tháng kiểm tra '+coChuHTML(kyVN(KTTO.thKT()))+', ngày ghi tay. Số hộ, tỷ lệ Trung hòa, mặc định: ⚙ Khai báo › 🎯 Chọn hộ kiểm tra. Esc / ‹ Lùi = lùi 1 cấp.</p>'; },
  /* ---------- xem / in ---------- */
  xem: function(m, ok){
    var ds = KTTO.dsTo(); if(!ds.length) return bao('Chưa tích tổ nào.', 3);
    if(typeof ktDocKB==='function') ktDocKB();
    if(m==='tt') return ktttInDs(ds);
    if(!ok) return ktInHop([m], ktInNutXem("KTTO.xem('"+m+"',1)"), ktHoiCuaTo(ds));
    var ng = KT_KB.ngay || '', ten = function(ma){ return ma+' '+(ds.length>1 ? ds.length+' to' : 'To '+boDauTen(ds[0].ten || ds[0].ma))+' - '+(ng ? ngayVNsl(ng).replace(/\//g, '-') : kyVN(KTTO.thKT()).replace(/\//g, '-')); };
    if(m==='m04'){ var g4 = ktBC04(ds.map(function(t){ return {t:t, ngay:ng}; })); if(!g4.length) return bao('Chưa tích tổ nào.', 3);
      KT_BC_XEM = {tu:'to', gts:g4, tenFile:ten('Mau 04 Bao cao tong hop KT -')}; return ktBCHop(''); }
    if(m==='m06' && !ds.some(function(t){ return KTTO.daChon(t).length; })) return bao('Các tổ đã tích chưa chọn hộ nào.', 3);
    var X = KTTO.giaTri(ktInV('m06'), ktInV('m16')), gts = m==='m06' ? X.g06 : X.g16, f = m==='m06' ? ktHTML06 : ktHTML16;
    KTTO.X = {m:m, gts:gts, ten:ten(m==='m06' ? 'Mau 06 Phieu KT su dung von -' : 'Mau 16 Bien ban KT to -')};
    moHop('<div class="hop-tit">👁 '+(m==='m06' ? 'Mẫu 06/TD · Phiếu kiểm tra sử dụng vốn' : 'Mẫu 16/TD · Biên bản kiểm tra Tổ')+' — '+gts.length+' tổ</div>'+
      '<div class="hop-phu">'+(ng ? 'Ngày kiểm tra '+ngayVNsl(ng) : 'Chưa khai ngày — tháng kiểm tra '+kyVN(X.th)+', ngày ghi tay')+' · mỗi tổ bắt đầu trang mới.</div>'+
      '<iframe id="kt-to-khung" class="to-khung" title="Xem trước"></iframe>'+
      xuatHang({truoc:'<button class="nho" data-lenh="ktto.doi">‹ Đổi lựa chọn in</button>', html:function(){ return f(gts); }, in:"KTTO.in('in')", pdf:"KTTO.in('pdf')", word:"KTTO.in('word')"}), true);
    var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
    xemChuan(document.getElementById('kt-to-khung'), f(gts));
  },
  in: function(cach){ var X = KTTO.X; if(!X) return; var html = (X.m==='m06' ? ktHTML06 : ktHTML16)(X.gts); dongHop();
    if(cach==='word') return ktDocx(X.m, X.gts).then(function(bl){ giaoFile(bl, X.ten+'.docx'); bao('Đã tạo '+X.ten+'.docx (mỗi tổ 1 trang mới) — chỉ lưu trên máy / Drive của anh.', 7); })
      .catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
    if(cach==='pdf') return inPDF(html, X.ten);
    inBlob(new Blob([html], {type:'text/html'}), X.ten+'.html'); },
  /* ---------- Esc / ‹ Lùi: lùi 1 cấp ---------- */
  lui: function(){
    if(ktCheDo()==='dx' && KTTO.mo){ KTTO.mo = ''; return ktVeThe(); }
    if(ktCheDo()==='hdt' && ktCH().hdtTab && ktCH().hdtTab!=='hoi'){ ktCH().hdtTab = 'hoi'; luu(); return ktVeThe(); }
    if(typeof pvLen==='function' && pvLen('kt')) return;
    bao('Đang ở cấp cao nhất (toàn PGD).', 2); },
  esc: function(e){   /* gọi cuối phimChung (js/10) — chỉ khi Esc chưa dùng cho hộp / menu… */
    if(typeof nganHienTai==='undefined' || nganHienTai!==7 || D.cauHinh.slTab!=='kt' || !document.getElementById('kt-the')) return false;
    var t = e.target || {}, tag = (t.tagName || '').toUpperCase(); if(tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT' || t.isContentEditable) return false;
    e.preventDefault(); KTTO.lui(); return true; },
  /* ---------- ⚙ Khai báo › 🎯 Chọn hộ kiểm tra ---------- */
  kbHTML: function(){ var k = KTTO.kb(), khoa = typeof ktKBKhoaCo==='function' && ktKBKhoaCo(), dis = khoa ? ' disabled' : '';
    var so = function(o, min, max){ return '<input type="number" min="'+min+'" max="'+max+'" value="'+k[o]+'" data-lenh="ktto.kb" data-su="change" data-o="'+o+'" class="gd-o gd-o-so"'+dis+'>'; };
    var sel = function(o, ds){ return '<select data-lenh="ktto.kb" data-su="change" data-o="'+o+'"'+dis+'>'+ds.map(function(x){ return '<option value="'+x[0]+'"'+(k[o]===x[0] ? ' selected' : '')+'>'+x[1]+'</option>'; }).join('')+'</select>'; };
    return '<div class="kt-to-kb"><p class="sl-phu">Dùng ở 🎯 Kiểm tra tổ (và màn 1 tổ). Ở màn Kiểm tra tổ đổi kiểu / số hộ chỉ cho đợt đang làm, không ghi đè khai báo này.'+(khoa ? ' <b>🔒 Khai báo đang khóa</b> — mở ở 🏛 Hội – xã.' : '')+'</p>'+
      '<table class="to-bang kt-to-kb-bang"><tbody>'+
      '<tr><td><b>Số hộ mỗi tổ</b> theo số tổ viên</td><td>≤ '+so('ng1', 1, 200)+' TV → '+so('s1', 1, 30)+' hộ · ≤ '+so('ng2', 1, 400)+' TV → '+so('s2', 1, 30)+' hộ · lớn hơn → '+so('s3', 1, 30)+' hộ</td></tr>'+
      '<tr><td><b>⚖ Trung hòa</b>: tỷ lệ hộ cần quan tâm</td><td>'+so('pt', 0, 100)+' % <small>(làm tròn thường — 8 hộ × 30% = 2 hộ; còn lại hộ tốt)</small></td></tr>'+
      '<tr><td>Kiểu chọn hộ mặc định</td><td>'+sel('kieu', KTTO.KIEU)+'</td></tr>'+
      '<tr><td>Món xét mặc định</td><td>'+sel('mon', KTTO.MON)+'</td></tr></tbody></table>'+
      GD.hang([GD.nut({chu:'↺ Về mặc định', lenh:'ktto.kbMD', tat:khoa, tit:'6 / 7 / 8 hộ (≤ 20 / ≤ 40 TV), Trung hòa 30%, Đúng luật'})])+'</div>'; },
  kbSua: function(o, v){
    if(typeof ktKBKhoaCo==='function' && ktKBKhoaCo()) return typeof ktKBChan==='function' ? ktKBChan() : bao('🔒 Khai báo đang khóa.', 4);
    var S = D.cauHinh.ktChonHo = D.cauHinh.ktChonHo || {}, cu = String(KTTO.kb()[o]);
    if(v===null){ D.cauHinh.ktChonHo = {}; } else S[o] = typeof KTTO.MD[o]==='number' ? Math.max(0, +v || 0) : v;
    if(typeof ktKBGhiNK==='function') ktKBGhiNK('chonho', 'ktChonHo', v===null ? '(cả bảng)' : o, cu, v===null ? 'mặc định' : String(KTTO.kb()[o]));
    KTTO.ho = {}; luu(); ktVeThe(); }
};
GD.dangKy('ktto', {
  to:function(el){ var m = el.getAttribute('data-m'); KT_DK_CHON[m] = el.checked; if(el.checked) KTTO.mo = KTTO.mo || ''; else if(KTTO.mo===m) KTTO.mo = ''; ktVeThe(); },
  tat:function(el){ KTTO.dsBang().forEach(function(r){ KT_DK_CHON[r.t.ma] = el.checked; }); if(!el.checked) KTTO.mo = ''; ktVeThe(); },
  mo:function(el){ var m = el.getAttribute('data-m'); KTTO.mo = KTTO.mo===m ? '' : m; ktVeThe(); },
  ho:function(el){ var m = el.getAttribute('data-m'), kh = el.getAttribute('data-kh'), t = KT_K && KT_K.to[m]; if(!t) return; var X = KTTO.goi(t);
    if(el.checked) X.chon[kh] = X.chon[kh] || {ly:'Anh chọn thêm', bb:false}; else delete X.chon[kh]; ktVeThe(); },
  kieu:function(el){ KTTO.kieu = el.getAttribute('data-k'); ktVeThe(); },
  mon:function(el){ KTTO.mon = el.getAttribute('data-k'); ktVeThe(); },
  so:function(el){ KTTO.d = Math.max(-20, Math.min(20, KTTO.d+(+el.getAttribute('data-d')||0))); ktVeThe(); },
  lai:function(){ KTTO.ho = {}; ktVeThe(); },
  xem:function(el){ KTTO.xem(el.getAttribute('data-m')); },
  doi:function(){ var m = KTTO.X && KTTO.X.m; dongHop(); if(m) KTTO.xem(m); },
  kb:function(el){ KTTO.kbSua(el.getAttribute('data-o'), el.value); },
  kbMD:function(){ KTTO.kbSua('', null); }
});
