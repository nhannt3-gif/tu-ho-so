/* ===== js/80b-ktgs-kh-sl.js — 3.516 (anh 11/11/2026): KẾ HOẠCH NĂM CHẠY THEO MẪU 31 HÀNG THÁNG + 🔎 KẾ HOẠCH ĐÃ LƯU =====
   Anh: "kế hoạch anh đã ghi chốt lưu sao giờ lại không lưu" · "hiện tại theo Mẫu 31 mới đã sắp xếp lại các tổ, nhưng kế hoạch phải lưu và chạy theo Mẫu 31 hàng tháng" → duyệt A + B + C.
   B. Màn 🗓 Kế hoạch năm lập / xem lịch theo Mẫu 31 MỚI NHẤT đã nạp (chốt tháng hoặc theo ngày — tổ hiện tại, đã gộp) (không theo ô Kỳ đầu trang) — ktKHDsTo đọc KTKH.K.
      In theo tháng giữ như cũ: Mẫu 31 cuối tháng liền trước tháng kiểm tra (ktKHVoiSL mượn số liệu tháng đó → ktKHDsTo đọc KT_K đang mượn).
   A. Kế hoạch đã chốt giữ nguyên khi Mẫu 31 sắp lại tổ: tổ mới của ấp đã có tháng → theo tháng ấp (như 3.140); tổ mới ở ấp chưa có tháng → báo "cần xếp",
      bản chốt vẫn dùng để in; tổ đã gộp / đi khỏi → CHỈ CẢNH BÁO (dòng ⚠ sẵn có), không tự sửa kế hoạch / bản chốt. Không đổi chỗ lưu (D.cauHinh.ktKH[năm|xã|hội]).
   C. 🔎 Kế hoạch đã lưu (chỉ xem): mọi kế hoạch trong máy + bản đã xóa trong 🗑 Thùng rác — năm · xã · Hội · số tổ · nháp · chốt; bấm Mở → đúng năm / xã / Hội.
   Gói 1 không gian tên KTKH (QUY_CHUAN mục 13) · cắm rút: bỏ dòng <script> → màn Kế hoạch về như 3.515 (theo Kỳ đầu trang). ===== */
var KTKH = {
  K: null, ky: '', dang: '', muon: 0,   /* muon > 0: đang trong ktKHVoiSL (In theo tháng) → dùng số liệu tháng kiểm tra */
  kyMoi: function(){ var tot = '', ng0 = '';   /* Mẫu 31 MỚI NHẤT đã nạp (anh: "KH vẫn hiện đúng dữ liệu hiện tại, tổ đã gộp") — chốt tháng hoặc theo ngày; cùng ngày ưu tiên chốt tháng */
    toDsKy().forEach(function(e){ var k = String(e.ky), ng = k.length>7 ? k : tdnCuoiKy(k); if(ng>ng0 || (ng===ng0 && k.length===7)){ tot = k; ng0 = ng; } }); return tot; },
  /* số liệu cho màn Kế hoạch: KTKH.K (tháng mới nhất) — trừ lúc In theo tháng đang mượn số liệu tháng kiểm tra (ktKHVoiSL) */
  Kdung: function(){ if(KTKH.muon) return KT_K; return KTKH.K && KTKH.ky===KTKH.kyMoi() ? KTKH.K : KT_K; },
  nap: function(){ var ky = KTKH.kyMoi(); if(!ky) return Promise.resolve(null);
    if(KTKH.K && KTKH.ky===ky) return Promise.resolve(KTKH.K);
    if(KT_K && KT_K.ky===ky){ KTKH.K = KT_K; KTKH.ky = ky; return Promise.resolve(KT_K); }
    if(KTKH.dang===ky) return Promise.resolve(null); KTKH.dang = ky;
    return KHO.nap(ky).then(function(K){ KTKH.K = K; KTKH.ky = ky; KTKH.dang = ''; return K; }, function(){ KTKH.dang = ''; return null; }); },
  slHTML: function(){ var ky = KTKH.ky || KTKH.kyMoi();
    return '<div class="to-the-so kt-sl">📌 Số liệu: Kế hoạch lập theo Mẫu 31 <b>'+coChuHTML(ky ? slKyChu(ky) : '(chưa có Mẫu 31)')+'</b> (mới nhất đã nạp — tổ hiện tại) — in theo tháng lấy Mẫu 31 cuối tháng liền trước tháng kiểm tra · không theo ô Kỳ đầu trang</div>'; },
  /* A: kế hoạch đã chốt mà số liệu tháng mới có tổ mới / tổ đi khỏi → dòng báo (bản chốt vẫn dùng) */
  baoHTML: function(){ var o = typeof ktKHLuu==='function' ? ktKHLuu() : null; if(!o || !o.chot || !o.chot.length) return '';
    var L = ktKHLich(), b = ktKHChotCuoi(o), moiAp = L.ds.filter(function(t){ return !(b.to || {})[t.ma] && L.gan[t.ma]; });
    var h = '';
    if(moiAp.length) h += '<div class="to-the-so">🆕 '+moiAp.length+' tổ mới theo Mẫu 31 '+coChuHTML(slKyChu(KTKH.ky))+' tự theo tháng của ấp: '+moiAp.map(function(t){ return coChuHTML((t.ten || t.ma)+' · T'+L.gan[t.ma]); }).join(', ')+' — không cần chốt lại.</div>';
    if(L.thieu.length) h += '<div class="sl-bao vang">⚠ '+L.thieu.length+' tổ mới ở ấp chưa có tháng ('+L.thieu.map(function(t){ return coChuHTML(t.ten || t.ma); }).join(', ')+') — <b>cần xếp</b>: bản chốt ngày '+ktKHNgay(b.luc)+' vẫn dùng để in; bấm ✏ Sửa kế hoạch, xếp tháng rồi 📌 Chốt lại.</div>';
    /* tổ đã gộp / đi khỏi: chỉ cảnh báo (anh 11/11 "nếu hiện tại tổ đã gộp thì chỉ cảnh báo") — dòng ⚠ sẵn có của màn (L.mat), không đổi kế hoạch / bản chốt */
    return h; },
  /* C: 🔎 Kế hoạch đã lưu */
  ten: function(xa, dv){ var K = KTKH.K || KT_K, t = K && Object.keys(K.to).map(function(m){ return K.to[m]; }).find(function(x){ return String(x.xa)===String(xa) && String(x.dv||'')===String(dv); });
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
          '<td>'+(x.rac || !x.co ? '' : GD.nut({chu:x.k===dang ? 'Đang mở' : 'Mở', lenh:'ktkh.mo', du:{k:x.k}, tat:x.k===dang}))+'</td></tr>'; }).join('')+'</tbody></table></div>' : '<div class="rong">Chưa có kế hoạch nào được lưu trong máy này.</div>')+
      '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button></div>', true);
    var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong'); },
  mo: function(k){ var p = String(k).split('|'), C = ktCH(); if(p.length<3) return; C.khNam = +p[0]; C.xa = p[1]; C.diem = ''; C.ap = ''; C.to = ''; C.hoi = p[2]; C.khHoi = p[2]; C.che = 'kh'; luu(); dongHop(); if(typeof pvVeCay==='function') pvVeCay('kt'); else ktVeThe(); }
};
GD.dangKy('ktkh', {ds:function(){ KTKH.hop(); }, mo:function(el){ KTKH.mo(el.getAttribute('data-k')); }});
(function(){ if(typeof ktKHVoiSL!=='function') return; var cu = ktKHVoiSL; ktKHVoiSL = function(fn){ KTKH.muon++; try { return cu(fn); } finally { KTKH.muon--; } }; })();
(function(){   /* bọc màn Kế hoạch năm: nạp Mẫu 31 tháng mới nhất → vẽ; thay dòng 📌; thêm 🔎 + dòng báo A */
  if(typeof ktKHVe!=='function') return; var cu = ktKHVe;
  ktKHVe = function(o){
    var ky = KTKH.kyMoi();
    if(ky && !(KTKH.K && KTKH.ky===ky) && !(KT_K && KT_K.ky===ky)){ o.innerHTML = ktCheDoHTML()+KTKH.slHTML()+'<div class="rong">Đang mở Mẫu 31 '+coChuHTML(slKyChu(ky))+'…</div>';
      KTKH.nap().then(function(K){ if(K && document.getElementById('kt-the') && ktCheDo()==='kh') ktVeThe(); }); return; }
    if(ky && !KTKH.K) KTKH.nap();
    var r = cu(o), sl = o.querySelector(':scope > .kt-sl'); if(sl) sl.outerHTML = KTKH.slHTML();
    var dau = o.querySelector(':scope > .kt-gn-dau'); if(dau){ var n = document.createElement('span'); n.innerHTML = GD.nut({chu:'🔎 Kế hoạch đã lưu', lenh:'ktkh.ds', tit:'Mọi kế hoạch trong máy (cả bản đã xóa trong Thùng rác) — năm · xã · Hội · chốt ngày nào'}); dau.appendChild(n.firstChild); }
    var tt = o.querySelector('.kt-kh-tt'), bao = KTKH.baoHTML(); if(tt && bao) tt.insertAdjacentHTML('afterend', bao);
    return r; };
})();
