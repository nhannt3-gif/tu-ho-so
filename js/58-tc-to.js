/* ==========================================================
   3.333 (anh chốt 23–24/10): TRA CỨU KH — KHỐI TỔ + BẢNG TỔ CỦA ĐIỂM GD (kết nạp)
   - Khi duyệt hồ sơ: tra khách → đã vay xem món; chưa vay → chọn tổ kết nạp → cần số TV, mã tổ để nhập máy.
   - Khối "Tổ & địa bàn" ở khung khách: mã tổ · tổ trưởng + mã KH tổ trưởng · ☎ (bấm để chép) · Tổng TV · có / không dư nợ · Hội · Điểm GD.
   - Bảng tổ của 1 điểm GD, gom theo Hội (như KQGD): mỗi tổ 1 dòng, cộng Hội, cộng điểm; ngưỡng QĐ 70: 20–100 thành viên.
   - Số thành viên: 1 chỗ tính KHO.tvChuan (QT-18, js/28) — kỳ của Tra cứu (TC_K). ES5.
   ========================================================== */
function tcNguong(){ var n = (D.cauHinh && D.cauHinh.toNguong) || {}; return {min:+n.min || 20, max:+n.max || 100}; }   /* QĐ 70: tổ 20–100 thành viên; ô ⚙ Ngưỡng của tab Tổ khai thì theo ô đó */
function tcNguongChip(tong){ var N = tcNguong();
  if(tong>=N.max) return '<span class="nh nh-do" title="Đủ '+N.max+' thành viên (QĐ 70) — không kết nạp thêm">đủ '+N.max+' TV</span>';
  if(tong>=N.max-5) return '<span class="nh nh-vang" title="Sắp đủ '+N.max+' thành viên">còn '+(N.max-tong)+' chỗ</span>';
  if(tong<N.min) return '<span class="nh nh-vang" title="Dưới '+N.min+' thành viên (QĐ 70)">dưới '+N.min+' TV</span>';
  return ''; }
function tcTo(ma){ return TC_K && TC_K.to ? TC_K.to[ma] || null : null; }
function tcTT(t){ var r = typeof hsoTTKH==='function' && t ? hsoTTKH(t) : {kh:'', cc:''}; return r || {kh:'', cc:''}; }   /* mã KH tổ trưởng — cùng cách Giấy lĩnh / Mẫu 06 */
function tcTVChu(r){ if(!r) return '<span class="nh nh-xam">chưa có số liệu</span>';
  return '<b>'+r.tong+'</b> TV · <span class="nh nh-lam">'+r.coNo+' có dư nợ</span> · <span class="nh nh-xam">'+r.khongNo+' không dư nợ</span>'+
    (r.laiTon ? ' <span class="nh nh-cam" title="Gốc đã hết, còn lãi tồn — chưa tất nợ">'+r.laiTon+' còn lãi tồn</span>' : '')+
    (r.choRa ? ' <span class="nh nh-vang" title="TƯ còn giữ, dư nợ 0 + tiền gửi 0 (QT-14)">'+r.choRa+' cần cho ra</span>' : '')+' '+tcNguongChip(r.tong); }
function tcTVGhi(r){ if(!r) return ''; var k = String(r.ky||'');
  return 'Số liệu '+(k.length>7 ? 'ngày '+ngayVNsl(k) : slKyChu(k))+(r.kyTW ? ' · bù '+r.bs+' người TƯ còn giữ theo Mẫu 01/TV '+slKyChu(r.kyTW) : ' · chưa có Mẫu 01/TV — chỉ đếm theo Mẫu 31'); }
/* khối "Tổ & địa bàn" trong khung khách (thay dòng Tổ / Điểm GD cũ) */
function tcToKhoiHTML(c){
  var dong = function(nhan, gt){ return '<div class="tc-dl"><span>'+nhan+'</span><div>'+gt+'</div></div>'; };
  var t = tcTo(c.to) || {}, tt = tcTT(tcTo(c.to)), r = c.to ? KHO.tvChuan(c.to, TC_K) : null;
  var tenTo = c.toTen || t.ten || '', sdt = t.sdt || '', diem = t.tenDiemDu || t.tenDiem || '', ngay = t.ngayGD || '';
  return '<div class="tc-nhom tc-to-khoi"><div class="tc-nhom-tit">Tổ &amp; địa bàn</div><div class="tc-luoi">'+
    dong('Mã tổ', c.to ? tcC(c.to, 'mã tổ') : '—')+
    dong('Tổ trưởng', tenTo ? tcC(tenTo, 'tên tổ trưởng')+(tt.kh ? ' · mã KH '+tcC(tt.kh, 'mã KH tổ trưởng') : ' · <small>chưa rõ mã KH</small>')+(sdt ? ' · ☎ '+tcC(sdt, 'SĐT tổ trưởng') : '') : '—')+
    dong('Thành viên', c.to ? tcTVChu(r) : '—')+
    dong('Hội · Điểm GD', coChuHTML([c.dv||t.dv ? tdnHoi(c.dv||t.dv) : '', diem ? 'Điểm '+diem : '', ngay && !/ngày/i.test(diem) ? 'ngày '+ngay : ''].filter(Boolean).join(' · ') || '—')+
      (t.khoaDiem ? ' <button class="nho tc-bang-nut" onclick="tcBangDiem(\''+String(t.khoaDiem).replace(/'/g, "\\'")+'\',\''+c.to+'\')" title="Xem toàn bộ tổ của điểm GD, theo Hội">🏘 Tổ của điểm GD</button>' : ''))+
    '</div>'+(r ? '<div class="tc-ghi">'+coChuHTML(tcTVGhi(r))+'</div>' : '')+'</div>';
}
/* ---------- bảng tổ của 1 điểm GD, gom theo Hội ---------- */
var TC_BANG = {diem:'', chon:'', ket:null};
function tcDiemCua(){ var S = tcCH(); return S.diem || ''; }
function tcBangDiem(diem, chon, ket){
  if(!TC_K) return bao('Chưa có số liệu Mẫu 31 — nạp ở Nạp & KT.', 4);
  diem = diem || tcDiemCua(); if(!diem) return bao('Chọn Điểm GD ở khối LỌC ĐỊA BÀN (hoặc mở 1 khách) để xem tổ của điểm.', 4);
  TC_BANG = {diem:diem, chon:chon || '', ket:ket || null};
  var ds = Object.keys(TC_K.to).map(function(m){ return TC_K.to[m]; }).filter(function(t){ return t.khoaDiem===diem && !t.trucTiep && !toLaTT(t); });
  if(!ds.length) return bao('Điểm GD này chưa có tổ trong số liệu.', 3);
  var t0 = ds[0], hoi = {}, tong = {to:0, tv:0, no:0, kno:0, dn:0, qh:0}, r0 = null;
  ds.forEach(function(t){ var r = KHO.tvChuan(t, TC_K) || {tong:0, coNo:0, khongNo:0, ds:[]}; if(!r0) r0 = r; var dn = 0, qh = 0;
    r.ds.forEach(function(k){ dn += k.dn||0; qh += k.qh||0; });
    var g = hoi[t.dv||''] = hoi[t.dv||''] || {dv:t.dv||'', ds:[], tv:0, no:0, kno:0, dn:0, qh:0};
    var x = {t:t, r:r, dn:dn, qh:qh, tt:tcTT(t)}; g.ds.push(x); g.tv += r.tong; g.no += r.coNo; g.kno += r.khongNo; g.dn += dn; g.qh += qh;
    tong.to++; tong.tv += r.tong; tong.no += r.coNo; tong.kno += r.khongNo; tong.dn += dn; tong.qh += qh; });
  var e = coChuHTML, ma = function(v, ten){ return v ? '<span class="tc-chep" data-chep="'+e(String(v))+'" data-ten="'+e(ten)+'" onclick="event.stopPropagation();tcChep(this)" title="Bấm để chép">'+e(String(v))+'</span>' : ''; };
  var cong = function(nhan, g, lop){ return '<tr class="'+lop+'"><td colspan="5">'+nhan+'</td><td class="so">'+g.tv+'</td><td class="so">'+g.no+'</td><td class="so">'+g.kno+'</td><td class="so">'+tdnTien(g.dn)+'</td><td class="so">'+(g.qh ? tdnTien(g.qh) : '')+'</td><td></td></tr>'; };
  var nhom = Object.keys(hoi).sort(function(a, b){ return ttHoiThu(a)-ttHoiThu(b); }).map(function(k){ var g = hoi[k];
    g.ds.sort(function(a, b){ return String(a.t.ma).localeCompare(String(b.t.ma), 'vi', {numeric:true}); });
    return '<tr class="hoi"><td colspan="11">'+e(tdnHoi(k) || '(chưa rõ hội)')+' — '+g.ds.length+' tổ</td></tr>'+g.ds.map(function(x){ var t = x.t;
      return '<tr class="tc-bt-dong'+(t.ma===TC_BANG.chon ? ' chon' : '')+'" data-to="'+e(t.ma)+'" onclick="tcBangChon(this)"><td>'+ma(t.ma, 'mã tổ')+'</td><td>'+ma(t.ten, 'tên tổ trưởng')+'</td><td>'+ma(x.tt.kh, 'mã KH tổ trưởng')+'</td><td>'+ma(t.sdt, 'SĐT tổ trưởng')+'</td><td>'+e(t.tenThon ? pvApNgan(t.tenThon) : '')+'</td>'+
        '<td class="so"><b>'+x.r.tong+'</b></td><td class="so">'+x.r.coNo+'</td><td class="so">'+x.r.khongNo+'</td><td class="so">'+tdnTien(x.dn)+'</td><td class="so">'+(x.qh ? '<span class="nh nh-do">'+tdnTien(x.qh)+'</span>' : '')+'</td><td>'+tcNguongChip(x.r.tong)+'</td></tr>'; }).join('')+
      cong('Cộng '+e(tdnHoi(k) || '(chưa rõ hội)'), g, 'cong'); }).join('');
  var ket = TC_BANG.ket, h = '<div class="hop-tit">🏘 Tổ của Điểm '+e(t0.tenDiemDu || t0.tenDiem || diem)+(t0.ngayGD && !/ngày/i.test(t0.tenDiemDu || t0.tenDiem || '') ? ' · ngày GD '+e(t0.ngayGD) : '')+' · '+e(t0.tenXa||'')+'</div>'+
    '<div class="hop-phu">'+tong.to+' tổ · <b>'+tong.tv+'</b> thành viên · '+tong.no+' có dư nợ · '+tong.kno+' không dư nợ — '+e(tcTVGhi(r0))+'. Bấm mã / tên / số để chép; bấm dòng để chọn tổ.'+(ket ? ' <b>Kết nạp: '+e(ket.ten || '')+(ket.cccd ? ' · CCCD '+e(ket.cccd) : '')+'</b>' : '')+'</div>'+
    '<div class="tc-bt-cuon"><table class="tc-bt"><thead><tr><th>Mã tổ</th><th>Tổ trưởng</th><th>Mã KH TT</th><th>☎</th><th>Ấp</th><th>Tổng TV</th><th>Có dư nợ</th><th>Không dư nợ</th><th>Tổng dư nợ</th><th>Quá hạn</th><th></th></tr></thead><tbody>'+nhom+
    cong('Cộng điểm GD ('+tong.to+' tổ)', tong, 'tong')+'</tbody></table></div>'+
    '<div class="hang-nut"><span id="tc-bt-chon" class="tc-bt-chon">'+(TC_BANG.chon ? 'Đã chọn tổ '+e(TC_BANG.chon) : 'Chưa chọn tổ')+'</span><button class="nho" id="tc-bt-mo" onclick="if(TC_BANG.chon) tcMoTo(TC_BANG.chon)"'+(TC_BANG.chon ? '' : ' disabled')+'>👥 Mở tổ</button>'+
    '<button class="nho chinh" id="tc-bt-ket" onclick="tcKetNap()"'+(TC_BANG.chon ? '' : ' disabled')+' title="Mở form 👪 Hộ vay có sẵn, điền sẵn Xã › Ấp › Tổ'+(ket ? ' và tên / CCCD vừa tra' : '')+'">👪 Lập hồ sơ hộ mới vào tổ này</button><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>';
  moHop('<div class="tc-bt-khung">'+h+'</div>', true);
}
function tcBangChon(tr){ var ma = tr.getAttribute('data-to'); TC_BANG.chon = ma;
  Array.prototype.forEach.call(document.querySelectorAll('.tc-bt-dong.chon'), function(x){ x.classList.remove('chon'); }); tr.classList.add('chon');
  var c = document.getElementById('tc-bt-chon'); if(c) c.textContent = 'Đã chọn tổ '+ma+' · '+((tcTo(ma)||{}).ten || '');
  ['tc-bt-mo', 'tc-bt-ket'].forEach(function(id){ var b = document.getElementById(id); if(b) b.disabled = false; }); }
/* 👪 kết nạp: gọi form Hộ vay có sẵn (hmMo), điền sẵn địa bàn + người vừa tra */
function tcKetNap(){ var t = tcTo(TC_BANG.chon); if(!t) return bao('Chọn 1 tổ trong bảng trước.', 3);
  var k = TC_BANG.ket || {}, n = typeof hmNguoi==='function' ? hmNguoi() : {}; if(k.ten) n.ten = k.ten; if(k.cccd) n.cccd = k.cccd;
  dongHop(); hmMo(null, {xa:t.xa||'', tenXa:t.tenXa||'', diem:t.khoaDiem||'', tenDiem:t.tenDiem||'', thon:t.thon||'', tenThon:t.tenThon||'', to:t.ma, tv:[n], dung:0}); }
/* nút ở kết quả kiểm trùng "chưa vay": mở bảng tổ của điểm GD đang chọn ở cây */
function tcKetNapNut(){ return '<button class="nho chinh tc-ket-nut" onclick="tcBangDiem(tcDiemCua(), \'\', {ten:TC_KT.ten||\'\', cccd:TC_KT.so||\'\'})" title="Chọn tổ của điểm GD (khối LỌC ĐỊA BÀN) để kết nạp — xem số thành viên, mã tổ">🏘 Chọn tổ kết nạp</button>'; }
/* ---------- 3.336 (anh 24/10): "cho tìm tổ trưởng và hiện thông tin cơ bản của tổ" — chip Tìm theo › Tổ trưởng ---------- */
function tcToLoc(q){   /* tổ khớp q (chữ → tên tổ trưởng đầu từ; số ≥ 3 → mã tổ / SĐT / mã KH tổ trưởng; trống → mọi tổ) trong phạm vi lọc · null = gõ chưa đủ số */
  if(!TC_K) return []; q = String(q||'').trim(); var S = tcCH(), so = q.replace(/\D/g, ''), chu = /[^\d\s.\-]/.test(q), tu = slChuan(q).split(' ').filter(Boolean);
  if(q && !chu && so.length<3) return null;
  var ds = Object.keys(TC_K.to).map(function(m){ return TC_K.to[m]; }).filter(function(t){
    if(!t || t.trucTiep || toLaTT(t) || (S.xa && !pvLoc(S, t))) return false; if(!q) return true;
    if(chu){ var ten = ' '+slChuan(t.ten||''); return tu.every(function(w){ return ten.indexOf(' '+w)>=0; }); }
    return String(t.ma).indexOf(so)>=0 || String(t.sdt||'').replace(/\D/g, '').indexOf(so)>=0 || String(tcTT(t).kh||'').indexOf(so)>=0; });
  ds.sort(function(a, b){ return String(a.tenXa||'').localeCompare(String(b.tenXa||''), 'vi') || String(a.tenThon||'').localeCompare(String(b.tenThon||''), 'vi', {numeric:true}) || String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); });
  return ds;
}
function tcToTim(q, e){   /* q: chữ → tên tổ trưởng (đầu từ); số (≥ 3) → mã tổ / SĐT / mã KH tổ trưởng; trống → mọi tổ trong phạm vi lọc */
  if(!TC_K) { e.innerHTML = '<div class="rong">Chưa có số liệu Mẫu 31 — nạp ở 📥 Nạp &amp; KT.</div>'; return; }
  q = String(q||'').trim(); var S = tcCH(), ds = tcToLoc(q);
  if(!ds){ e.innerHTML = '<div class="rong">Gõ ít nhất 3 chữ số.</div>'; return; }
  var tong = ds.length; ds = ds.slice(0, 300);
  if(!tong){ e.innerHTML = '<div class="rong">'+(q ? 'Không thấy tổ có tổ trưởng / mã khớp “'+coChuHTML(q)+'”' : 'Không có tổ')+(S.xa ? ' trong phạm vi '+coChuHTML(pvChu(S, TC_K)) : '')+'.</div>'; return; }
  var xa = function(t){ return String(t.tenXa||'').replace(/^(Xã|Phường|Thị trấn)\s+/i, ''); };
  e.innerHTML = '<div class="tc-kq-dau"><div class="ghi">'+tong+' tổ'+(tong>300 ? ' — đang hiện 300 tổ đầu, gõ thêm hoặc chọn 📍 phạm vi' : '')+'</div></div>'+
    '<div class="tc-kq-cuon"><table class="tc-kq-bang"><thead><tr><th>Tổ trưởng</th><th>Mã tổ</th><th>Xã</th><th>Ấp</th><th>Hội</th><th>Thành viên</th><th>Có dư nợ</th></tr></thead><tbody>'+
    ds.map(function(t){ var r = KHO.tvChuan(t, TC_K) || {tong:0, coNo:0};
      return '<tr class="sl-kq-dong" data-lenh="tc.to" data-to="'+coChuHTML(t.ma)+'"><td><b>'+coChuHTML(t.ten||'')+'</b></td><td>'+coChuHTML(t.ma)+'</td><td>'+coChuHTML(xa(t))+'</td><td>'+coChuHTML(pvApNgan(t.tenThon||''))+'</td>'+
        '<td>'+coChuHTML(tdnHoi(t.dv)||'')+'</td><td class="so"><b>'+r.tong+'</b> '+tcNguongChip(r.tong)+'</td><td class="so">'+r.coNo+'</td></tr>'; }).join('')+'</tbody></table></div>';
  if(q && tong===1 && tcHaiCot()){ var d1 = e.querySelector('.sl-kq-dong'); tcChonDong(d1); tcTheTo(ds[0].ma); }
}
function tcTheTo(ma){   /* 3.342 (anh chốt): đầu thẻ 3 hàng (Tổ · Địa bàn · Số liệu) có tên cột + kẻ dọc; bảng thành viên STT · mã KH (sắp theo mã) · dư nợ · ngày vay · hạn · lãi tồn · TK 105 */
  var t = tcTo(ma); if(!t) return bao('Không thấy tổ này trong số liệu.', 3);
  var r = KHO.tvChuan(t, TC_K) || {tong:0, coNo:0, khongNo:0, laiTon:0, choRa:0, ds:[]}, tt = tcTT(t), e = coChuHTML;
  var B = (TC_K && TC_K.B) || {theoKH:{}, khd:{}}, tong = {dn:0, qh:0, lt:0, t105:0, khd:0};
  var monCon = function(kh){ var gap = {}; return ((B.theoKH||{})[kh]||[]).filter(function(m){ if(!m.ku || gap[m.ku]) return false; gap[m.ku] = 1; return ((m.ttMon!=='CLOSE' && (m.dn||0)>0) || laiTon(m)>0); }); };
  var stk = {}; tcTk105Ds().forEach(function(o){ if(o.kh && o.stk) (stk[o.kh] = stk[o.kh] || []).push(o.stk); });
  var tv = r.ds.slice().sort(function(a, b){ return String(a.kh||'').localeCompare(String(b.kh||'')); });
  tv.forEach(function(k){ tong.dn += k.dn||0; tong.qh += k.qh||0; tong.lt += k.lt||0; tong.t105 += k.t105||0; monCon(k.kh).forEach(function(m){ if((B.khd||{})[m.ku]) tong.khd++; }); });
  var coKH = tt.kh && tcCoKH(tt.kh), diem = t.tenDiemDu || t.tenDiem || '';
  var hang = function(cot){ return '<table class="tc-to-hang"><tr>'+cot.map(function(c){ return '<th>'+c[0]+'</th>'; }).join('')+'</tr><tr>'+cot.map(function(c){ return '<td'+(c[2] ? ' class="'+c[2]+'"' : '')+'>'+c[1]+'</td>'; }).join('')+'</tr></table>'; };
  var tien = function(v, lop){ return v ? '<b'+(lop ? ' class="'+lop+'"' : '')+'>'+tdnTien(v)+'</b>' : '0'; };
  var luuY = (r.laiTon ? '<span class="nh nh-cam">'+r.laiTon+' còn lãi tồn</span> ' : '')+(r.choRa ? '<span class="nh nh-vang">'+r.choRa+' cần cho ra</span> ' : '');
  var nam2 = function(x){ return String(x).replace(/(>|^)(\d\d\/\d\d\/)(\d\d)(\d\d)/g, '$1$2<span class="nam4">$3</span>$4'); };   /* khung hẹp: năm 2 số (CSS container) */
  var ttKH = function(k){   /* 3.344 (anh): khách không còn món — vẫn trong tổ hay cần cho ra (QT-14 / QT-18, cùng tvChuan) */
    var x = k.loai==='lai' ? '<span class="nh nh-cam">Hết gốc · còn lãi tồn</span> — vẫn trong tổ' : k.loai==='105' ? '<span class="nh nh-xam">Tất nợ · còn TGTK</span> — vẫn trong tổ'
      : k.loai==='ra' ? '<span class="nh nh-vang">Tất nợ · TG 0</span> — cần cho ra khỏi tổ' : '<span class="nh nh-xam">Dư nợ 0</span>';
    return x+(k.nguon==='tv01' ? ' <small>(TƯ còn giữ — Mẫu 01/TV)</small>' : ''); };
  var gon = tcTim().tvKieu==='gon';   /* 3.342 (anh): Đủ = mỗi món 1 dòng · Gọn = mỗi khách 1 dòng, bấm ▸ hiện dòng nhỏ từng món */
  var dongTV = function(k, i){   /* họ tên / mã KH / TGTK gộp ô; bấm CT → mã món vay, bấm TGTK → số TK 105 (dòng nhỏ dưới khách) */
    var mon = monCon(k.kh).sort(function(a, b){ return String(a.dhgh||a.dhg||'9').localeCompare(String(b.dhgh||b.dhg||'9')); }), s = stk[k.kh] || [], n = gon ? 1 : Math.max(1, mon.length);
    var kh = tcCoKH(k.kh) ? ' data-lenh="tc.kh" data-kh="'+e(k.kh)+'" title="Mở khách này"' : '', gop = n>1 ? ' rowspan="'+n+'"' : '';
    var moc = function(m, them){ return m ? '<td class="ct" data-lenh="tc.hien" data-v="'+e(m.ku)+'" data-ten="mã món vay" title="Bấm để xem mã món vay">'+e(ctNgan(m.ct, m))+'</td>'+
        '<td class="so"><b>'+tdnTien(them ? k.dn : m.dn||0)+'</b></td><td>'+nam2(m.nv ? ngayVNsl(m.nv) : '')+'</td><td>'+nam2(tcHanMon(m, false, true))+'</td><td class="so">'+((them ? k.lt : laiTon(m))>0 ? '<b class="cam">'+tdnTien(them ? k.lt : laiTon(m))+'</b>' : '—')+'</td>'
      : '<td colspan="4" class="tc-to-tt">'+ttKH(k)+'</td><td class="so">'+(k.lt>0 ? '<b class="cam">'+tdnTien(k.lt)+'</b>' : '—')+'</td>'; };
    var tg = '<td class="so"'+gop+(s.length ? ' data-lenh="tc.hien" data-v="'+e(s.join(', '))+'" data-ten="số TK 105" title="Bấm để xem số TK 105"' : '')+'>'+(k.t105>0 ? tdnTien(k.t105) : s.length ? '0' : '—')+'</td>';
    var mo = gon && mon.length>1 ? ' <span class="tc-to-mo" data-lenh="tc.moMon" title="Bấm để xem '+mon.length+' món">▸'+mon.length+' món</span>' : '';
    var h0 = '<tr class="tc-to-tv-dong'+(k.dn>0 ? '' : ' tat')+'"'+kh+'><td class="so"'+gop+'>'+(i+1)+'</td><td class="ten"'+gop+'>'+e(k.ten||'')+mo+'</td><td'+gop+'>'+e(k.kh||'')+'</td>'+moc(mon[0], gon && mon.length>1)+tg+'</tr>';
    if(!gon) for(var x = 1; x<mon.length; x++) h0 += '<tr class="tc-to-tv-mon"'+kh+'>'+moc(mon[x])+'</tr>';
    else if(mon.length>1) h0 += '<tr class="tc-to-ct-mo tc-to-mon-gon" hidden><td colspan="9">'+mon.map(function(m){ return '<div><b>'+e(ctNgan(m.ct, m))+'</b> '+tcC(m.ku, 'mã món vay')+' · dư nợ <b>'+tdnTien(m.dn||0)+'</b>'+(m.nv ? ' · vay '+ngayVNsl(m.nv) : '')+' · hạn '+tcHanMon(m, false, true)+(laiTon(m)>0 ? ' · lãi tồn <b class="cam">'+tdnTien(laiTon(m))+'</b>' : '')+'</div>'; }).join('')+'</td></tr>';
    return h0; };
  var h = hang([['Tổ (tổ trưởng)', '🏘 <b class="tc-ten to">'+tcC(t.ten, 'tên tổ trưởng')+'</b> '+tcNguongChip(r.tong), 'rong'], ['Mã tổ', tcC(t.ma, 'mã tổ')], ['Mã KH tổ trưởng', tt.kh ? tcC(tt.kh, 'mã KH tổ trưởng') : '<small>chưa rõ</small>'],
      ['☎ SĐT', t.sdt ? tcC(t.sdt, 'SĐT tổ trưởng') : '—'], ['CCCD', tt.cc ? tcC(tt.cc, 'CCCD tổ trưởng') : '—']])+
    hang([['Ấp · Xã', e([pvApNgan(t.tenThon||''), String(t.tenXa||'')].filter(Boolean).join(', ') || '—'), 'rong'], ['Điểm GD', e(diem ? 'Điểm '+diem.replace(/\s*·?\s*ngày\s*\d+.*$/i, '') : '—')],
      ['Ngày GD', e(t.ngayGD || (diem.match(/ngày\s*(\d+)/i)||[])[1] || '—')], ['Hội quản lý', e(tdnHoi(t.dv) || '—')]])+
    hang([['Thành viên', '<b>'+r.tong+'</b>'], ['Có dư nợ', r.coNo], ['Không dư nợ', r.khongNo], ['Tổng dư nợ', tien(tong.dn)], ['Quá hạn', tien(tong.qh, 'do'), tong.qh ? 'do' : ''],
      ['Lãi tồn', tien(tong.lt, 'cam')], ['3 tháng KHĐ', tong.khd ? '<b class="vang">'+tong.khd+' món</b>' : '0'], ['Số dư TK 105', tien(tong.t105)]])+
    '<div class="tc-ghi">'+luuY+e(tcTVGhi(r))+'</div>'+
    '<div class="tc-nhom tc-to-tv"><div class="tc-to-tv-kieu">Thành viên ('+r.tong+') '+GD.chip('Đủ', !gon, 'tc.tvKieu', {k:'du', to:t.ma}, 'Mỗi món 1 dòng')+GD.chip('Gọn', gon, 'tc.tvKieu', {k:'gon', to:t.ma}, 'Mỗi khách 1 dòng — bấm ▸ xem từng món')+'</div><div class="tc-to-tv-ds"><table class="tc-to-tvb"><thead><tr><th>#</th><th>Họ tên</th><th>Mã KH</th><th>CT</th><th>Dư nợ</th><th>Ngày vay</th><th>Hạn trả</th><th>Lãi tồn</th><th>TGTK</th></tr></thead><tbody>'+
      tv.map(dongTV).join('')+'</tbody></table></div></div>'+
    '<div class="hang-nut tc-nut">'+(coKH ? GD.nut({chu:'👤 Xem tổ trưởng', lenh:'tc.kh', du:{kh:tt.kh}}) : '')+
      (t.khoaDiem ? GD.nut({chu:'🏘 Tổ của điểm GD', lenh:'tc.bangDiem', du:{diem:t.khoaDiem, to:t.ma}}) : '')+
      GD.nut({chu:'👥 Mở tổ', lenh:'tc.moTo', du:{to:t.ma}})+GD.nut({chu:'👪 Lập hồ sơ hộ mới vào tổ', lenh:'tc.ketNap', du:{to:t.ma}, chinh:1, tit:'Mở form 👪 Hộ vay, điền sẵn Xã › Ấp › Tổ'})+'</div>';
  var ct = document.getElementById('tc-ct');
  if(ct && tcHaiCot()) ct.innerHTML = '<div class="tc-the tc-the-to">'+h+'</div>'; else moHop('<div class="tc-the tc-the-to">'+h+GD.hang([GD.nut({chu:'Đóng (Esc)', lenh:'tc.dong'})])+'</div>', true);
}
function tcToMoMon(el){ var tr = el.closest('tr'), d = tr.nextElementSibling; if(d && d.classList.contains('tc-to-mon-gon')){ d.hidden = !d.hidden; el.textContent = (d.hidden ? '▸' : '▾')+el.textContent.slice(1); } }
function tcToHien(el){   /* dòng chi tiết dưới nhóm dòng của 1 khách (không làm rộng cột); bấm lại cùng ô = ẩn */
  var tr = el.closest('tr'), v = el.getAttribute('data-v'), ten = el.getAttribute('data-ten'), cuoi = tr;
  while(cuoi.nextElementSibling && !cuoi.nextElementSibling.classList.contains('tc-to-tv-dong')) cuoi = cuoi.nextElementSibling;
  for(var x = tr.nextElementSibling; x && !x.classList.contains('tc-to-tv-dong'); x = x.nextElementSibling) if(x.classList.contains('tc-to-ct-mo') && x.getAttribute('data-v')===v) return x.remove();
  var d = document.createElement('tr'); d.className = 'tc-to-ct-mo'; d.setAttribute('data-v', v);
  d.innerHTML = '<td colspan="'+tr.closest('table').querySelector('thead tr').children.length+'">'+coChuHTML(ten.charAt(0).toUpperCase()+ten.slice(1))+(el.textContent && ten==='mã món vay' ? ' ('+coChuHTML(el.textContent)+')' : '')+': '+tcC(v, ten)+' <small>— bấm số để chép</small></td>';
  cuoi.parentNode.insertBefore(d, cuoi.nextSibling);
}
/* Tự nhận: chữ gõ khớp tổ trưởng / mã tổ → nút chuyển sang tìm tổ */
function tcToGoiY(q){ var ds = String(q||'').trim().length>=2 ? tcToLoc(q) : null; return ds && ds.length ? GD.nut({chu:'🏘 '+ds.length+' tổ khớp — xem tổ', lenh:'tc.theo', du:{k:'tt'}, lop:'tc-to-goiy', tit:'Tổ có tổ trưởng / mã tổ / SĐT khớp chữ đang gõ'}) : ''; }
