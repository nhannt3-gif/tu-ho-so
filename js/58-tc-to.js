/* ==========================================================
   3.332 (anh chốt 23–24/10): TRA CỨU KH — KHỐI TỔ + BẢNG TỔ CỦA ĐIỂM GD (kết nạp)
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
  var t0 = (SL_DB.to||{})[c.to]||{}, t = tcTo(c.to) || {}, tt = tcTT(tcTo(c.to)), r = c.to ? KHO.tvChuan(c.to, TC_K) : null;
  var tenTo = c.toTen || t.ten || t0.ten || '', sdt = t.sdt || t0.sdt || '', diem = t.tenDiemDu || t.tenDiem || t0.diem || '', ngay = t.ngayGD || t0.ngayGD || '';
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
    var giu = TO_K; TO_K = TC_K; try { toTV(t).forEach(function(k){ dn += k.dn||0; qh += k.qh||0; }); } finally { TO_K = giu; }
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
