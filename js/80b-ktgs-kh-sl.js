/* ===== js/80b-ktgs-kh-sl.js — 3.516 (anh 11/11/2026): KẾ HOẠCH NĂM CHẠY THEO MẪU 31 HÀNG THÁNG + 🔎 KẾ HOẠCH ĐÃ LƯU =====
   Anh: "kế hoạch anh đã ghi chốt lưu sao giờ lại không lưu" · "hiện tại theo Mẫu 31 mới đã sắp xếp lại các tổ, nhưng kế hoạch phải lưu và chạy theo Mẫu 31 hàng tháng" → duyệt A + B + C.
   B. 3.517 (anh "KH năm lấy theo Mẫu 31 đầu năm khi lập, còn in số liệu thì lấy đúng tháng KH"): màn 🗓 Kế hoạch năm LẬP theo Mẫu 31 ĐẦU NĂM = chốt 31/12 năm trước
      (chưa nạp → tháng chốt gần nhất trước đó; không có → bản sớm nhất, ghi ⚠) — ktKHDsTo đọc KTKH.Kdung(). (3.516: Mẫu 31 mới nhất)
      In theo tháng giữ như cũ: Mẫu 31 cuối tháng liền trước tháng kiểm tra (ktKHVoiSL mượn số liệu tháng đó → ktKHDsTo đọc KT_K đang mượn).
   A. Kế hoạch / bản chốt giữ nguyên khi Mẫu 31 sắp lại tổ: so danh sách đầu năm với Mẫu 31 MỚI NHẤT → tổ đã gộp / đi khỏi CHỈ CẢNH BÁO; tổ mới → 🆕 khi in
      tự theo tháng của ấp (3.140) hoặc ⚠ ấp chưa có tháng. Không tự sửa kế hoạch / bản chốt. Không đổi chỗ lưu (D.cauHinh.ktKH[năm|xã|hội]).
   C. 🔎 Kế hoạch đã lưu (chỉ xem): mọi kế hoạch trong máy + bản đã xóa trong 🗑 Thùng rác — năm · xã · Hội · số tổ · nháp · chốt; bấm Mở → đúng năm / xã / Hội.
   Gói 1 không gian tên KTKH (QUY_CHUAN mục 13) · cắm rút: bỏ dòng <script> → màn Kế hoạch về như 3.515 (theo Kỳ đầu trang). ===== */
var KTKH = {
  c: {}, dang: {}, muon: 0,   /* c: số liệu đã mở theo kỳ · muon > 0: đang trong ktKHVoiSL (In theo tháng) → dùng số liệu tháng kiểm tra */
  kyMoi: function(){ var tot = '', ng0 = '';   /* Mẫu 31 MỚI NHẤT đã nạp — chốt tháng hoặc theo ngày; cùng ngày ưu tiên chốt tháng (để so tổ đã gộp) */
    toDsKy().forEach(function(e){ var k = String(e.ky), ng = k.length>7 ? k : tdnCuoiKy(k); if(ng>ng0 || (ng===ng0 && k.length===7)){ tot = k; ng0 = ng; } }); return tot; },
  dau: function(nam){ nam = +nam || ktKHNam(); var can = (nam-1)+'-12', ds = toDsKy().map(function(e){ return String(e.ky); }).filter(function(k){ return k.length===7; }).sort();
    var truoc = ds.filter(function(k){ return k<=can; }), ky = truoc.length ? truoc[truoc.length-1] : (ds[0] || ''); return {ky:ky, can:can, lech:!!ky && ky!==can}; },   /* Mẫu 31 đầu năm = chốt 31/12 năm trước */
  lay: function(ky){ if(!ky) return null; if(KT_K && KT_K.ky===ky) return KTKH.c[ky] = KT_K; return KTKH.c[ky] || null; },
  nap: function(ky){ if(!ky || KTKH.lay(ky)) return Promise.resolve(KTKH.lay(ky)); if(KTKH.dang[ky]) return KTKH.dang[ky];
    return KTKH.dang[ky] = KHO.nap(ky).then(function(K){ KTKH.c[ky] = K; delete KTKH.dang[ky]; return K; }, function(){ delete KTKH.dang[ky]; return null; }); },
  /* số liệu màn Kế hoạch: Mẫu 31 đầu năm — trừ lúc In theo tháng đang mượn số liệu tháng kiểm tra (ktKHVoiSL) */
  Kdung: function(){ if(KTKH.muon) return KT_K; return KTKH.lay(KTKH.dau().ky) || KT_K; },
  slHTML: function(){ var d = KTKH.dau(), moi = KTKH.kyMoi();
    return '<div class="to-the-so kt-sl">📌 Số liệu: Kế hoạch lập theo Mẫu 31 <b>'+coChuHTML(d.ky ? slKyChu(d.ky) : '(chưa có Mẫu 31)')+'</b> (đầu năm'+(d.lech ? ' — <span class="vang">⚠ chưa nạp '+kyVN(d.can)+', dùng bản gần nhất</span>' : '')+')'+
      ' · in theo tháng lấy Mẫu 31 cuối tháng liền trước tháng kiểm tra'+(moi && moi!==d.ky ? ' · tổ đã gộp / đổi so với Mẫu 31 mới nhất ('+coChuHTML(slKyChu(moi))+') chỉ cảnh báo' : '')+'</div>'; },
  /* A: so danh sách đầu năm với Mẫu 31 mới nhất — chỉ cảnh báo, không sửa kế hoạch / bản chốt */
  baoHTML: function(){ var d = KTKH.dau(), kyM = KTKH.kyMoi(), Km = KTKH.lay(kyM); if(!Km || !d.ky || kyM===d.ky) return '';
    var C = ktCH(), hoi = ktKHHoi(), L = ktKHLich(), S = ktKHLuu() || {}, coM = {}, coL = {};
    var moi = Object.keys(Km.to).map(function(m){ return Km.to[m]; }).filter(function(t){ return !toLaTT(t) && t.xa===C.xa && String(t.dv || '')===hoi; });
    moi.forEach(function(t){ coM[t.ma] = 1; }); L.ds.forEach(function(t){ coL[t.ma] = 1; });
    var di = L.ds.filter(function(t){ return !coM[t.ma]; }), den = moi.filter(function(t){ return !coL[t.ma] && !(S.to || {})[t.ma]; }), h = '', mc = coChuHTML(slKyChu(kyM));
    if(di.length) h += '<div class="sl-bao vang">⚠ '+di.length+' tổ trong kế hoạch đã gộp / đi khỏi theo Mẫu 31 '+mc+': '+di.map(function(t){ return coChuHTML((t.ten || t.ma)+(L.gan[t.ma] ? ' · T'+L.gan[t.ma] : '')); }).join(', ')+' — <b>chỉ cảnh báo</b>, kế hoạch giữ nguyên; tháng in mà tổ không còn trong số liệu thì không in tổ đó.</div>';
    if(den.length) h += '<div class="to-the-so">🆕 '+den.length+' tổ mới theo Mẫu 31 '+mc+': '+den.map(function(t){ var ap = ktKHAp(t), x = L.ds.find(function(y){ return ktKHAp(y)===ap && L.gan[y.ma]; });
      return coChuHTML(t.ten || t.ma)+(x ? ' · in theo T'+L.gan[x.ma]+' của ấp' : ' · <span class="vang">ấp chưa có tháng</span>'); }).join(', ')+' — kế hoạch không đổi.</div>';
    return h; },
  /* C: 🔎 Kế hoạch đã lưu */
  ten: function(xa, dv){ var K = KTKH.lay(KTKH.kyMoi()) || KT_K, t = K && Object.keys(K.to).map(function(m){ return K.to[m]; }).find(function(x){ return String(x.xa)===String(xa) && String(x.dv||'')===String(dv); });
    return {xa:t ? String(t.tenXa || xa).trim() : 'xã mã '+xa, hoi:t ? ktHoiTenTD(t) : (tdnHoi(dv) || 'Hội '+dv), co:!!t}; },
  ds: function(){ var S = D.cauHinh.ktKH || {}, ra = [];
    Object.keys(S).forEach(function(k){ var o = S[k], p = k.split('|'); if(!o || o.xoa || p.length<3) return;
      var b = ktKHChotCuoi(o), n = Object.keys(o.to || {}).length, x = KTKH.ten(p[1], p[2]);
      ra.push({k:k, nam:+p[0], xa:p[1], dv:p[2], tenXa:x.xa, tenHoi:x.hoi, co:x.co, n:n, luc:o.luc || '', chot:o.chot ? o.chot.length : 0, chotLuc:b ? b.luc : '', khoa:o.khoa, rac:false}); });
    (D.rac || []).forEach(function(m){ if(m.loaiNho!=='ktKH' || !m.data) return; var o = m.data, p = String(m.khoa || '').split('|'), b = ktKHChotCuoi(o), x = KTKH.ten(p[1], p[2]);
      ra.push({k:m.khoa || '', nam:+p[0], xa:p[1], dv:p[2], tenXa:x.xa, tenHoi:x.hoi, co:x.co, n:Object.keys(o.to || {}).length, luc:o.luc || '', chot:o.chot ? o.chot.length : 0, chotLuc:b ? b.luc : '', khoa:o.khoa, rac:true, xoaLuc:m.xoaLuc || ''}); });
    return ra.sort(function(a, b){ return b.nam-a.nam || a.tenXa.localeCompare(b.tenXa, 'vi') || a.tenHoi.localeCompare(b.tenHoi, 'vi') || (a.rac ? 1 : 0)-(b.rac ? 1 : 0); }); },
  hop: function(){ var ds = KTKH.ds(), dang = typeof ktKHKhoa==='function' ? ktKHKhoa() : '';
    var tt = function(x){ return x.rac ? '<span class="vang">🗑 đã xóa '+ktKHNgay(x.xoaLuc)+' — khôi phục ở 🗑 Thùng rác › Mục nhỏ</span>' : x.khoa ? '<b class="xanh">✅ đã chốt</b>' : x.chot ? '✏ đang sửa sau chốt' : '💾 nháp, chưa chốt'; };
    moHop('<div class="hop-tit">🔎 Kế hoạch đã lưu trong máy — '+ds.length+' bản</div>'+
      '<div class="hop-phu">Mỗi kế hoạch lưu theo <b>Năm · mã xã · mã Hội</b>. Dòng <span class="vang">mã xã / Hội không còn trong số liệu</span> = Mẫu 31 mới đã đổi mã — mở để xem, báo em nếu cần nhận về mã mới. Chỉ xem, không sửa gì.</div>'+
      (ds.length ? '<div class="to-bang-cuon" style="max-height:60vh"><table class="to-bang kt-kh-ds"><thead><tr><th>Năm</th><th>Xã</th><th>Hội</th><th>Số tổ</th><th>Lưu nháp</th><th>Chốt</th><th>Trạng thái</th><th></th></tr></thead><tbody>'+
        ds.map(function(x){ return '<tr class="'+(x.k===dang && !x.rac ? 'kt-co' : '')+'"><td class="c">'+x.nam+'</td><td>'+coChuHTML(x.tenXa)+'</td><td>'+coChuHTML(x.tenHoi)+(x.co ? '' : ' <small class="vang">(mã xã / Hội không còn trong số liệu)</small>')+'</td>'+
          '<td class="s">'+x.n+'</td><td>'+(x.luc ? ktKHNgay(x.luc) : '')+'</td><td>'+(x.chot ? x.chot+' lần · '+ktKHNgay(x.chotLuc) : '—')+'</td><td>'+tt(x)+'</td>'+
          '<td>'+(x.rac ? '' : !x.co ? GD.nut({chu:'↪ Nhận về xã / Hội hiện tại', lenh:'ktkh.nhan', du:{k:x.k}, chinh:1, tit:'Chép lịch + lịch sử chốt sang mã xã / Hội theo Mẫu 31 hiện tại (bản cũ giữ nguyên)'}) : GD.nut({chu:x.k===dang ? 'Đang mở' : 'Mở', lenh:'ktkh.mo', du:{k:x.k}, tat:x.k===dang}))+'</td></tr>'; }).join('')+'</tbody></table></div>' : '<div class="rong">Chưa có kế hoạch nào được lưu trong máy này.</div>')+
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button></div>', true);
    var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong'); },
  /* 3.518 (anh 12/11 "bản cũ anh đã chốt nhưng chuyển qua bản mới làm lại báo chưa chốt" → "code và gộp"): kế hoạch mang mã xã / Hội cũ (Mẫu 31 mới đổi mã
     sau sáp nhập) → NHẬN VỀ mã hiện tại: tìm xã / Hội theo mã tổ trong kế hoạch (Mẫu 31 mới nhất — nhiều tổ khớp nhất); chép lịch + lịch sử chốt (giữ đã chốt);
     bản cũ giữ nguyên; đích đã có bản nháp → hỏi trước, nháp cũ vào 🗑 Thùng rác; đích đã chốt → không ghi đè. */
  dich: function(k){ var o = (D.cauHinh.ktKH || {})[k], p = String(k).split('|'), K = KTKH.lay(KTKH.kyMoi()) || KT_K; if(!o || !K) return null;
    var dem = {}, ma = Object.keys(o.to || {}); ma.forEach(function(m){ var t = K.to[m]; if(!t || toLaTT(t)) return; var c = t.xa+'|'+String(t.dv || ''); dem[c] = (dem[c] || 0)+1; });
    var tot = Object.keys(dem).sort(function(a, b){ return dem[b]-dem[a]; })[0]; if(!tot) return {k:'', khop:0, n:ma.length};
    var q = tot.split('|'), x = KTKH.ten(q[0], q[1]); return {k:p[0]+'|'+tot, xa:q[0], dv:q[1], tenXa:x.xa, tenHoi:x.hoi, khop:dem[tot], n:ma.length}; },
  nhan: function(k, ok){ var S = D.cauHinh.ktKH = D.cauHinh.ktKH || {}, o = S[k], d = KTKH.dich(k), p = String(k).split('|'); if(!o) return;
    var b = ktKHChotCuoi(o), cu = KTKH.ten(p[1], p[2]);
    if(!d || !d.k) return bao('Không tìm thấy tổ nào của kế hoạch này trong Mẫu 31 hiện tại — chưa nhận về được.', 6);
    var dg = S[d.k] && !S[d.k].xoa ? S[d.k] : null;
    if(dg && dg.chot && dg.chot.length) return bao('Kế hoạch '+p[0]+' · '+d.tenHoi+' đã có bản chốt ngày '+ktKHNgay(ktKHChotCuoi(dg).luc)+' — không ghi đè.', 6);
    if(!ok) return moHop('<div class="hop-tit">↪ Nhận kế hoạch cũ về xã / Hội hiện tại</div>'+
      '<div class="hop-phu">Bản cũ: năm <b>'+p[0]+'</b> · '+coChuHTML(cu.xa)+' · '+coChuHTML(cu.hoi)+' — '+d.n+' tổ'+(b ? ' · <b>đã chốt '+o.chot.length+' lần, lần cuối '+ktKHNgay(b.luc)+'</b>' : ' · chưa chốt')+'<br>'+
        '→ Sang: <b>'+coChuHTML(d.tenXa)+' · '+coChuHTML(d.tenHoi)+'</b> (theo Mẫu 31 '+coChuHTML(slKyChu(KTKH.kyMoi()))+': khớp <b>'+d.khop+'</b>/'+d.n+' tổ; tổ không khớp chỉ cảnh báo).<br>'+
        'Chép lịch + lịch sử chốt'+(b && o.khoa ? ', giữ <b>đã chốt</b>' : '')+'. Bản cũ giữ nguyên.'+(dg ? '<br><b class="vang">Đích đang có bản nháp ngày '+ktKHNgay(dg.luc)+' — sẽ thay, bản nháp chuyển vào 🗑 Thùng rác (khôi phục được).</b>' : '')+'</div>'+
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+GD.nut({chu:'↪ Nhận về', lenh:'ktkh.nhanOk', du:{k:k}, chinh:1})+'</div>', true);
    if(dg) racMucNho('ktKH', 'Kế hoạch KTGS năm '+p[0]+' · '+d.tenHoi+' (nháp, thay khi nhận bản cũ)', 'KTGS Hội › Kế hoạch năm '+p[0], dg, {khoa:d.k});
    var moi = JSON.parse(JSON.stringify(o)); moi.luc = new Date().toISOString(); moi.nhan = {tu:k, luc:moi.luc}; delete moi.xoa; S[d.k] = moi; luu();
    bao('↪ Đã nhận kế hoạch '+p[0]+' về '+d.tenXa+' · '+d.tenHoi+(b && o.khoa ? ' — giữ đã chốt ngày '+ktKHNgay(b.luc) : '')+'.', 6);
    KTKH.mo(d.k); },
  mo: function(k){ var p = String(k).split('|'), C = ktCH(); if(p.length<3) return; C.khNam = +p[0]; C.xa = p[1]; C.diem = ''; C.ap = ''; C.to = ''; C.hoi = p[2]; C.khHoi = p[2]; C.che = 'kh'; luu(); dongHop(); if(typeof pvVeCay==='function') pvVeCay('kt'); else ktVeThe(); }
};
GD.dangKy('ktkh', {ds:function(){ KTKH.hop(); }, mo:function(el){ KTKH.mo(el.getAttribute('data-k')); },
  nhan:function(el){ KTKH.nhan(el.getAttribute('data-k')); }, nhanOk:function(el){ dongHop(); KTKH.nhan(el.getAttribute('data-k'), 1); }});
(function(){ if(typeof ktKHVoiSL!=='function') return; var cu = ktKHVoiSL; ktKHVoiSL = function(fn){ KTKH.muon++; try { return cu(fn); } finally { KTKH.muon--; } }; })();
(function(){   /* bọc màn Kế hoạch năm: nạp Mẫu 31 đầu năm (+ mới nhất để so) → vẽ; thay dòng 📌; thêm 🔎 + dòng báo A */
  if(typeof ktKHVe!=='function') return; var cu = ktKHVe;
  ktKHVe = function(o){
    var d = KTKH.dau(), kyM = KTKH.kyMoi(), thieu = [d.ky, kyM].filter(function(k){ return k && !KTKH.lay(k); });
    if(thieu.length){ o.innerHTML = ktCheDoHTML()+KTKH.slHTML()+'<div class="rong">Đang mở Mẫu 31 '+thieu.map(function(k){ return coChuHTML(slKyChu(k)); }).join(', ')+'…</div>';
      Promise.all(thieu.map(KTKH.nap)).then(function(r){ if(r.every(Boolean) && document.getElementById('kt-the') && ktCheDo()==='kh') ktVeThe(); }); return; }
    var r = cu(o), sl = o.querySelector(':scope > .kt-sl'); if(sl) sl.outerHTML = KTKH.slHTML();
    var dau = o.querySelector(':scope > .kt-gn-dau'); if(dau){ var n = document.createElement('span'); n.innerHTML = GD.nut({chu:'🔎 Kế hoạch đã lưu', lenh:'ktkh.ds', tit:'Mọi kế hoạch trong máy (cả bản đã xóa trong Thùng rác) — năm · xã · Hội · chốt ngày nào'}); dau.appendChild(n.firstChild); }
    var tt = o.querySelector('.kt-kh-tt'), bao = KTKH.baoHTML(); if(tt && bao) tt.insertAdjacentHTML('afterend', bao);
    return r; };
})();
