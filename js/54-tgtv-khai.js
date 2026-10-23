/* ===== 3.315 (anh 22/10 "làm hoàn chỉnh 01TGTV in bằng 2 cách: lấy từ Mẫu 31 hoặc in nhanh tự khai, khai nhanh tại mẫu luôn") =====
   01/TGTV có 3 nguồn (cột trái): 📊 Mẫu 31 (tổ viên của tổ, tích in hàng loạt) · 📒 người vay đang lập hồ sơ · ✍ In nhanh tự khai.
   ✍ Tự khai: bấm thẳng vào chỗ chấm / ô ☐ trên bản xem → hộp nhỏ gõ đúng mục đó (Enter = lưu, sang mục kế). Lưu ở hsoLuu().tgTay (1 người, nhớ đến khi bấm Khai người mới).
   Ô đã gõ luôn in (kể cả ô mặc định ✍ chấm); ô chưa gõ in như nguồn tự động (vd Quốc tịch Việt Nam, Dân tộc Kinh khi có họ tên) — gõ trống để giữ chấm. */
var TG_O = {   /* mã ô trên mẫu → các trường gõ: [khóa, nhãn, kiểu (chu · so · ngay · chon · nhieu · dau), lựa chọn / gợi ý] */
  ngan:[['ngan', 'Chi nhánh / PGD (sau chữ NHCSXH)', 'chu']],
  cif:[['cif', 'Số CIF (mã khách hàng)', 'so']],
  ten:[['ten', 'Họ, chữ đệm, tên khai sinh', 'chu']],
  ns:[['ns', 'Ngày, tháng, năm sinh', 'ngay']],
  gt:[['gt', 'Giới tính', 'chon', ['Nam', 'Nữ']]],
  quocTich:[['quocTich', 'Quốc tịch', 'chu', 'Việt Nam']],
  danToc:[['danToc', 'Dân tộc', 'chu', 'Kinh']],
  cuTru:[['cuTru', 'Có cư trú', 'dau']],
  cccd:[['cccd', 'Số CCCD (12 số)', 'so']],
  ncap:[['ncap', 'Ngày cấp', 'ngay']],
  hanCCCD:[['hanCCCD', 'Ngày hết hạn (trống = tự tính theo ngày sinh, ngày cấp)', 'ngay']],
  noiCap:[['noiCap', 'Nơi cấp (trống = theo ngày cấp)', 'chu']],
  mst:[['mst', 'Mã số thuế cá nhân', 'so']],
  ngheNghiep:[['ngheNghiep', 'Nghề nghiệp hiện tại', 'chon', HM_NGHE], ['ngheKhac', 'Ghi rõ (khi Khác)', 'chu']],
  chucVu:[['chucVu', 'Chức vụ', 'chu']],
  thuongTru:[['ap', 'Tổ dân phố / Thôn (ấp)', 'chu'], ['xa', 'Phường / Xã / Đặc khu', 'chu'], ['tinh', 'Tỉnh / Thành phố (trống = theo khai báo đơn vị)', 'chu']],
  soNha:[['soNha', 'Số nhà', 'chu'], ['duong', 'Đường', 'chu']],
  noiO:[['noiO', 'Nơi ở hiện tại khác (nếu có)', 'chu']],
  noiLam:[['noiLam', 'Nơi làm việc', 'chu'], ['dtNoiLam', 'Điện thoại nơi làm việc', 'so'], ['dcNoiLam', 'Địa chỉ nơi làm việc', 'chu']],
  sdt:[['sdt', 'Điện thoại liên hệ', 'so']],
  email:[['email', 'Thư điện tử (Email)', 'chu']],
  thuNhap:[['thuNhap', 'Thu nhập bình quân / tháng (triệu)', 'chon', ['Dưới 10', 'Từ 10-50', 'Trên 50', 'Khác']], ['thuNhapKhac', 'Ghi rõ (khi Khác)', 'chu']],
  nguonThu:[['nguonThu', 'Nguồn gốc thu nhập', 'nhieu', ['Thừa kế tài sản', 'Cho thuê tài sản', 'Lương', 'Trợ cấp', 'Lợi nhuận đầu tư, lãi tiền gửi', 'Lợi nhuận sản xuất, kinh doanh', 'Khác']], ['nguonKhac', 'Ghi rõ (khi Khác)', 'chu']],
  honNhan:[['honNhan', 'Tình trạng hôn nhân', 'chon', ['Độc thân', 'Đã kết hôn', 'Khác']], ['honNhanKhac', 'Ghi rõ (khi Khác)', 'chu']],
  dvDeNghi:[['dvDeNghi', 'Đề nghị cung cấp dịch vụ tài khoản Tổ viên', 'dau']],
  sms:[['sms', 'Đăng ký SMS chủ động', 'chon', ['Có', 'Không']]],
  dongY:[['dongY', 'Đồng ý 2 điều khoản, điều kiện chung', 'dau']],
  diaDanh:[['diaDanh', 'Địa danh "…, ngày" (trống = theo xã)', 'chu']],
  ngayKy:[['ngayKy', 'Ngày khách hàng ký', 'ngay']],
  tiepNhan:[['tiepNhan', 'D: Tiếp nhận ngày', 'ngay']],
  nhNgay:[['nhNgay', 'D: Ngày Giám đốc ký', 'ngay']],
  soTK:[['soTK', 'D: Số tài khoản Tổ viên', 'so']],
  hieuLuc:[['hieuLuc', 'D: Hiệu lực từ ngày', 'ngay']]
};
var TG_TAY = {k:''};   /* ô đang gõ trong hộp */
function tgNguon(B){ return HSO.vay.tgNguon || (B ? 'bo' : 'to'); }
function tgTay(){ var L = hsoLuu(); if(!L.tgTay || typeof L.tgTay!=='object') L.tgTay = {}; return L.tgTay; }
function tgTayP(){   /* người tự khai → P cho mẫu (giữ khóa đã gõ để đè số liệu tự động) */
  var T = tgTay(), P = {_tay:1}; Object.keys(T).forEach(function(k){ P[k] = T[k]; });
  if(T.xa != null) P.tenXa = T.xa;
  if(!T.noiCap && T.ncap) P.noiCap = hsoNoiCapGY(T.ncap);
  return P; }
function tgTayDe(V, P){   /* đè giá trị tự động bằng chữ đã gõ (gõ trống = để chấm) */
  var T = tgTay();
  Object.keys(T).forEach(function(k){ if(k in V && !/^(P|noiCap)$/.test(k)) V[k] = k==='ten' ? String(T[k]||'').toUpperCase() : k==='nguonThu' ? (Array.isArray(T[k]) ? T[k] : []) : T[k]; });
  if(T.noiCap != null || T.ncap) V.noiCap = T.noiCap || hsoNoiCapGY(T.ncap);
  if(T.xa && T.diaDanh == null) V.diaDanh = T.xa;
  if(T.hanCCCD === '' ) V.hanCCCD = (P.cccd && typeof toCCCDHan==='function' ? (toCCCDHan(P.cccd, P.ns, P.ncap) || {}).den : '') || '';
  return V; }
(function(){
  var m = OM_MAU['01tgtv']; if(!m) return;
  var V0 = m.V; m.V = function(t, P){ var V = V0.call(this, t, P); return P && P._tay ? tgTayDe(V, P) : V; };
  var L0 = hsoLap01tgtv; hsoLap01tgtv = function(t, P){
    if(!(P && P._tay)) return L0(t, P);
    OM_TAY = {mk:'01tgtv', co:tgTay()}; try { return L0(t, P); } finally { OM_TAY = null; } };
})();
function tgTayCo(){ var T = tgTay(); return Object.keys(T).filter(function(k){ var v = T[k]; if(/Ma$/.test(k)) return false; return Array.isArray(v) ? v.length : v!=null && v!==''; }).length; }

/* ---------- 3.316 (anh 23/10 "form cứng, chuẩn: họ tên, ngày sinh, CCCD, ngày cấp, SĐT, chọn xã, ấp — còn lại tự tính: giới tính, ngày hết hạn, dân tộc Kinh, tích sẵn có cư trú") ---------- */
function tgApTen(a){ var n = String(a.tenThon || a.thon || '').trim(); return !n ? '' : /^(ấp|khu phố|kp|thôn|tổ)/i.test(n) ? n : 'Ấp '+n; }
function tgTayDat(k, v){
  var T = tgTay(); v = String(v==null ? '' : v).trim();
  if(k==='ns' || k==='ncap') v = v ? (hsoNgayTu(v) || v) : '';
  if(k==='cccd') v = v.replace(/\D/g, '');
  if(k==='xaMa'){ var X = hmDiaBan()[v]; T.xaMa = v; T.xa = X ? hsoXaTen(X.tenXa) : ''; T.ap = ''; T.apMa = ''; }
  else if(k==='apMa'){ var X2 = hmDiaBan()[T.xaMa] || {ap:{}}, A = (X2.ap || {})[v]; T.apMa = v; T.ap = A ? tgApTen(A) : ''; }
  else T[k] = v;
  luu(); hsoVeGiuO(); }
function tgFormHTML(T){   /* form chuẩn 7 ô — phần còn lại app tự tính */
  var DB = hmDiaBan(), xs = CAY.dsXa();
  var X = DB[T.xaMa], as = X ? CAY.dsAp(T.xaMa).map(function(a){ return [a[0], tgApTen(a[2])]; }) : [];
  var o = function(nhan, k, gt, ph, them){ return hsoTuyO(nhan, '<input class="tg-f" data-k="'+k+'" value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph)+'"'+(them||'')+' onchange="tgTayDat(\''+k+'\', this.value)">'); };
  var xaO = xs.length ? CAY.o('xa', T.xaMa || '', '— chọn xã ('+xs.length+') —', xs, 'onchange="tgTayDat(\'xaMa\', this.value)"') :   /* 3.326: ô chọn cây nhúng dùng chung (js/57) */ '<input class="tg-f" value="'+coChuHTML(T.xa||'')+'" placeholder="tên xã (chưa có địa bàn Mẫu 31)" onchange="tgTayDat(\'xa\', this.value)">';
  var apO = xs.length ? CAY.o('ap', T.apMa || '', X ? '— chọn ấp ('+as.length+') —' : '— chọn xã trước —', as, 'onchange="tgTayDat(\'apMa\', this.value)"') : '<input class="tg-f" value="'+coChuHTML(T.ap||'')+'" placeholder="vd Ấp Cầu Sắt" onchange="tgTayDat(\'ap\', this.value)">';
  var so = String(T.cccd||''), gt = T.gt || hmGT({cccd:so}), han = so.length===12 && T.ns && T.ncap && typeof toCCCDHan==='function' ? toCCCDHan(so, T.ns, T.ncap) : null;
  var tu = [gt ? 'Giới tính <b>'+coChuHTML(gt)+'</b> (theo CCCD)' : '', han ? (han.den ? 'hết hạn <b>'+ngayVNsl(han.den)+'</b>' : coChuHTML(han.chu || '')) : '', T.ncap ? 'nơi cấp <b>'+coChuHTML(T.noiCap || hsoNoiCapGY(T.ncap))+'</b>' : '',
    'dân tộc <b>'+coChuHTML(T.danToc==null ? 'Kinh' : T.danToc || '(chấm)')+'</b>', '☒ Có cư trú', 'quốc tịch Việt Nam'].filter(Boolean);
  return '<div class="tg-form"><div class="nhan-nhom">✍ Khai nhanh</div>'+
    o('Họ và tên', 'ten', T.ten, 'vd Nguyễn Văn A')+o('Ngày sinh', 'ns', hsoNgayVN(T.ns), 'dd/mm/yyyy')+
    o('Số CCCD', 'cccd', so, '12 số', ' inputmode="numeric" maxlength="14"')+(so && so.length!==12 ? '<div class="sl-phu"><b class="hso-canh">⚠ CCCD '+so.length+' số (cần 12)</b></div>' : '')+
    o('Ngày cấp', 'ncap', hsoNgayVN(T.ncap), 'dd/mm/yyyy')+o('Số điện thoại', 'sdt', T.sdt, 'vd 0912345678', ' inputmode="tel"')+
    hsoTuyO('Xã', xaO)+hsoTuyO('Ấp', apO)+
    '<div class="sl-phu tg-tu">🤖 Tự tính: '+tu.join(' · ')+'</div></div>'; }

/* ---------- bấm trên bản xem ---------- */
function tgTayGan(f){
  if(f) f.onload = null;
  if(!f || hsoMau().k!=='01tgtv' || tgNguon(hsoBo())!=='tay' || OM_KIEU!=='that') return;
  var y = 0; try { var d0 = f.contentDocument; y = d0 && d0.scrollingElement ? d0.scrollingElement.scrollTop : 0; } catch(e){}   /* giữ chỗ đang xem khi vẽ lại sau mỗi lần gõ */
  f.onload = function(){ var d = f.contentDocument; if(!d) return;
    if(y) [0, 120, 400].forEach(function(ms){ setTimeout(function(){ try { if(d.scrollingElement) d.scrollingElement.scrollTop = y; } catch(e){} }, ms); });
    var s = d.createElement('style'); s.textContent = '[data-o]{cursor:pointer;border-radius:2px}[data-o]:hover{outline:1.5px solid #1a5fb4;background:rgba(26,95,180,.08)}@media print{[data-o]:hover{outline:0;background:none}}'; (d.head || d.documentElement).appendChild(s);
    d.addEventListener('click', function(e){ var x = e.target.closest && e.target.closest('[data-o]'); if(!x) return; e.preventDefault(); tgTayHop(x.getAttribute('data-o')); }); };
}
function tgTayDs(){ return (OM_MAU['01tgtv'].o || []).map(function(x){ return x.k; }).filter(function(k){ return TG_O[k]; }); }
function tgTayHop(k){
  var ds = TG_O[k], m = OM_MAU['01tgtv'], x = m.oK[k] || {}, T = tgTay(); TG_TAY.k = k;
  if(!ds) return bao('Mục này app tự ghi theo mẫu.');
  var i = tgTayDs().indexOf(k), h = ds.map(function(f, j){ var id = 'tg-o-'+j, v = T[f[0]], ph = f[3] && typeof f[3]==='string' ? f[3] : '';
    if(f[2]==='chon') return '<div class="tg-o"><span class="tg-n">'+coChuHTML(f[1])+'</span><span class="gdx-ra">'+['(để chấm)'].concat(f[3]).map(function(o){ var gt = o==='(để chấm)' ? '' : o; return '<label><input type="radio" name="'+id+'" value="'+coChuHTML(gt)+'"'+((v||'')===gt ? ' checked' : '')+'> '+coChuHTML(o)+'</label>'; }).join('')+'</span></div>';
    if(f[2]==='nhieu') return '<div class="tg-o"><span class="tg-n">'+coChuHTML(f[1])+'</span><span class="gdx-ra">'+f[3].map(function(o){ return '<label><input type="checkbox" name="'+id+'" value="'+coChuHTML(o)+'"'+((v||[]).indexOf(o)>=0 ? ' checked' : '')+'> '+coChuHTML(o)+'</label>'; }).join('')+'</span></div>';
    if(f[2]==='dau') return '<div class="tg-o"><label><input type="checkbox" id="'+id+'"'+(v==null ? (T.ten ? ' checked' : '') : v ? ' checked' : '')+'> '+coChuHTML(f[1])+'</label></div>';
    var gt = f[2]==='ngay' ? hsoNgayVN(v) : (v==null ? '' : String(v));
    return '<label class="tg-o"><span class="tg-n">'+coChuHTML(f[1])+'</span><input class="gdx-i" id="'+id+'" value="'+coChuHTML(gt)+'" placeholder="'+coChuHTML(f[2]==='ngay' ? 'dd/mm/yyyy — trống = chấm' : ph ? 'trống = chấm (gợi ý: '+ph+')' : 'trống = chấm')+'"'+(f[2]==='so' ? ' inputmode="numeric"' : '')+'></label>'; }).join('');
  moHop('<div class="hop-tit" id="tg-hop">✍ '+coChuHTML(x.n || k)+'</div><div class="hop-phu">01/TGTV — tự khai trên mẫu ('+(i+1)+'/'+tgTayDs().length+'). Enter = lưu và sang mục kế. Để trống = in chấm.</div>'+
    '<div class="tg-hop">'+h+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="tgTayLuu(0, -1)" title="Lưu, về mục trước">◀</button><button class="nho chinh" onclick="tgTayLuu(1)">Lưu</button><button class="nho" onclick="tgTayLuu(0, 1)" title="Lưu, sang mục kế (Enter)">Lưu, mục kế ▶</button><button class="nho" onclick="dongHop()">Thôi</button></div>');
  var e = document.getElementById('hop-in'); if(e){ var o = e.querySelector('input.gdx-i, input'); if(o){ o.focus(); if(o.select) o.select(); }
    e.onkeydown = function(ev){ if(ev.key==='Enter' && !ev.shiftKey){ ev.preventDefault(); tgTayLuu(0, 1); } }; }
}
function tgTayLuu(dong, buoc){
  var k = TG_TAY.k, ds = TG_O[k], T = tgTay(), e = document.getElementById('hop-in'); if(!ds || !e) return;
  ds.forEach(function(f, j){ var id = 'tg-o-'+j, v;
    if(f[2]==='chon'){ var r = e.querySelector('input[name="'+id+'"]:checked'); v = r ? r.value : ''; }
    else if(f[2]==='nhieu') v = Array.prototype.map.call(e.querySelectorAll('input[name="'+id+'"]:checked'), function(r){ return r.value; });
    else if(f[2]==='dau'){ var c = document.getElementById(id); v = c && c.checked ? 'x' : ''; }
    else { var o = document.getElementById(id); v = o ? String(o.value||'').trim() : ''; if(f[2]==='ngay' && v) v = hsoNgayTu(v) || v; if(f[2]==='so') v = v.replace(/\s+/g, f[0]==='cccd' ? '' : ' '); }
    if(f[0]==='cccd' && v && !T.gt && typeof hsoCCCDDoc==='function'){ var d = hsoCCCDDoc(v); if(d) T.gt = d.gt; }   /* giới tính suy theo CCCD (sửa được) */
    if(T[f[0]]===undefined && (v==='' || Array.isArray(v) && !v.length)) return;   /* 3.316: mục chưa khai mà để trống → giữ tự tính (Kinh, giới tính theo CCCD…) */
    T[f[0]] = v; });
  luu(); dongHop(); hsoVe();
  if(buoc){ var a = tgTayDs(), i = a.indexOf(k) + buoc; if(i>=0 && i<a.length) setTimeout(function(){ tgTayHop(a[i]); }, 60); }
}
function tgTayMoi(){ hsoLuu().tgTay = {}; luu(); hsoVe(); bao('Đã xóa — khai người mới.'); }
function tgTayChep(kh){   /* lấy 1 tổ viên trên Mẫu 31 vào ô tự khai để sửa tiếp */
  if(!kh) return; var S = hsoCH(), t = KHO.to(S.to), x = hsoKhach(kh, t), c = KHO.danhBa(kh) || {};
  var T = {cif:kh, ten:x.ten, ns:x.ns, gt:c.gt, cccd:String(x.cccd||'').replace(/\D/g, ''), ncap:x.ncap, noiCap:x.noiCap, sdt:c.sdt || '', danToc:c.danToc, ap:x.ap, xa:x.tenXa ? hsoXaTen(x.tenXa) : ''};
  Object.keys(T).forEach(function(k){ if(T[k]==null || T[k]==='') delete T[k]; });   /* trống → để app tự tính (Kinh, giới tính theo CCCD) */
  hsoLuu().tgTay = T;
  luu(); hsoVe(); bao('Đã chép '+(x.ten || kh)+' từ Mẫu 31 — bấm vào mẫu để sửa / bổ sung.'); }
function tgCotHTML(t, B){   /* cột trái 01/TGTV */
  var V = HSO.vay, ng = tgNguon(B), tv = hsoTVTo(t), h = '';
  var r = function(v, nhan, ghi){ return gdxChip(nhan, ng===v, 'HSO.vay.tgNguon=\''+v+'\';hsoVe()', 'hso-ct tg-ng', ghi); };   /* 3.317 (anh): 3 nguồn = 3 chip 1 dòng */
  h += '<div class="om-kieu tg-nguon">'+r('to', '📊 Mẫu 31', 'Tổ viên của tổ đang chọn — tích, in hàng loạt')+r('bo', '📒 Sổ hộ vay', 'Người vay đang lập hồ sơ (📒 Sổ hộ vay → 📄 Lập HS)')+r('tay', '✍ In nhanh', 'Tự khai: form chuẩn + bấm thẳng chỗ chấm trên mẫu')+'</div>';
  if(ng==='bo') h += B ? '<div class="sl-phu">'+coChuHTML((B.nv.ten || '(chưa có tên)')+(B.hoId && hmTim(B.hoId) && hmToTen(hmTim(B.hoId)) ? ' · '+hmToTen(hmTim(B.hoId)) : ''))+'</div>' : '<div class="sl-phu">Chưa chọn hộ (📒 Sổ hộ vay → 📄 Lập HS) → mẫu trắng.</div>';
  else if(ng==='to'){ if(!V.tg) V.tg = {};
    if(!t) h += '<div class="sl-phu">Chọn tổ ở khối lọc.</div>';
    else { var chua = tv.filter(function(k){ return !k.stk.length && !k.coTK; }), co = tv.filter(function(k){ return k.stk.length || k.coTK; }), dem = hsoTGTVDs(t, B).length;
      var dong = function(k, md){ var on = V.tg[k.kh]===undefined ? md : V.tg[k.kh]; return '<label><input type="checkbox"'+(on ? ' checked' : '')+' onchange="HSO.vay.tg[\''+k.kh+'\']=this.checked;hsoVe()"> '+coChuHTML(k.ten)+(md ? '' : ' <small class="sl-phu">(đã có TK 105)</small>')+'</label>'; };
      h += '<details class="hso-tick" open><summary>Tích để in — <b>'+dem+'</b> người · chưa có TK 105: '+chua.length+'</summary><div class="hso-tick-ds">'+chua.map(function(k){ return dong(k, true); }).join('')+
        (co.length ? '<div class="sl-phu">Đã có TK 105 (in lại khi cần):</div>'+co.map(function(k){ return dong(k, false); }).join('') : '')+'</div></details>'; } }
  else { var n = tgTayCo(), T = tgTay();
    h += tgFormHTML(T)+
      '<div class="sl-phu tg-goi">👉 Mục khác: <b>bấm vào chỗ chấm / ô ☐ trên mẫu bên phải</b> để gõ — Enter lưu và sang mục kế. Đã khai <b>'+n+'</b> mục.</div>'+
      '<div class="hang-nut"><button class="nho chinh" onclick="tgTayHop(\'ten\')">⌨ Khai lần lượt</button><button class="nho" onclick="tgTayMoi()"'+(n ? '' : ' disabled')+'>🧹 Khai người mới</button></div>'+
      (t && tv.length ? hsoTuyO('Lấy từ Mẫu 31 rồi sửa', hsoChon('tgTayChep(this.value)', '', [['', '— chọn tổ viên ('+tv.length+') —']].concat(tv.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; })))) : '')+
      (OM_KIEU!=='that' ? '<div class="sl-phu"><b>⚠ Đang xem '+(OM_KIEU==='trang' ? '📄 Bản trắng' : '📝 Bản mẫu')+'</b> — chọn 🖨 Bản thật để in chữ đã khai.</div>' : ''); }
  return h;
}
