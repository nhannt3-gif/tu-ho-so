/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 3486–4545 của bản 3.234), không đổi logic — 👤 Tra cứu KH gọn + đổi tab con Số liệu (slDoiTab, slTabConHTML) */
var SL_TRA_Q = '';
function slDoiTab(t){ if(t==='nap' && D.cauHinh.slTab!=='nap'){ SL_KY = ''; SL_DAI = 0; }   /* 3.163: mở tab Nạp & KT → ⦿ Gần nhất */
  D.cauHinh.slTab = t; if(t!=='nap') D.cauHinh.slTabBC = t; luu(); veSoLieu(); if(t==='tra') setTimeout(function(){ var o = document.getElementById('sl-tim'); if(o) o.focus(); }, 30); }
function slTabConHTML(){
  var t = ['tra','to','sk','th','kt','hst','hsv','gdx','pb'].indexOf(D.cauHinh.slTab)>=0 ? D.cauHinh.slTab : 'nap';
  if(typeof toNutSL==='function') toNutSL();
  /* 3.144 (Q15): 📥 Nạp & Kiểm tra là tab riêng trên thanh tab (chỗ tab Tháng cũ) — không còn là tab con của Số liệu */
  if(t==='nap') return '';   /* 3.150: tab Nạp & KT tự vẽ 1 hàng công cụ (slNapThanhHTML) — giải thích chuyển vào ❓ */
  setTimeout(function(){ var c = document.querySelector('#tr7 .sl-con'), b = c && c.querySelector('.bat'); if(b) c.scrollLeft = Math.max(0, b.offsetLeft - c.offsetLeft - 12); }, 0);   /* 3.89: điện thoại — tab con đang mở luôn thấy được */
  return '<div class="sl-con"><button class="'+(t==='th'?'bat':'')+'" onclick="slDoiTab(\'th\')">📊 Tổng hợp</button>'+   /* 3.90 */
    '<button class="'+(t==='sk'?'bat':'')+'" onclick="slDoiTab(\'sk\')">📑 Sao kê</button>'+
    '<button class="'+(t==='to'?'bat':'')+'" onclick="slDoiTab(\'to\')">👥 Tổ TK&amp;VV</button>'+
    '<button class="'+(t==='kt'?'bat':'')+'" onclick="slDoiTab(\'kt\')">🛡 KTGS Hội</button>'+   /* 3.93 */
    '<button class="'+(t==='tra'?'bat':'')+'" onclick="slDoiTab(\'tra\')">👤 Tra cứu KH</button>'+
    '<button class="'+(t==='hst'?'bat':'')+'" onclick="slDoiTab(\'hst\')">📝 Hồ sơ Tổ</button>'+   /* 3.170 (anh chốt 11/10) */
    '<button class="'+(t==='hsv'?'bat':'')+'" onclick="slDoiTab(\'hsv\')">📄 Hồ sơ vay</button>'+
    '<button class="'+(t==='gdx'?'bat':'')+'" onclick="slDoiTab(\'gdx\')">🏢 Giao dịch xã</button>'+
    '<button class="'+(t==='pb'?'bat':'')+'" onclick="slDoiTab(\'pb\')">🎯 Phân bổ KH</button></div>';   /* 3.288 P2 Phân bổ kế hoạch (js/48-phan-bo-gd.js) */   /* 3.172 */   /* 3.89 */   /* 3.88: tab con báo cáo theo tổ (anh chốt: cạnh Tra cứu KH) */
}
/* 3.86: tab con Tra cứu KH — ô tìm RIÊNG, độc lập với ô tìm chung của app */
/* ===================== 3.94: 👤 TRA CỨU KH GỌN (anh chốt) =====================
   - trái: ô tìm + 🔍 kiểm trùng 2 ô (CCCD/CMND + họ tên) + danh sách 2 dòng/khách (điện thoại 50 dòng, "Xem thêm")
   - phải: thẻ chia nhóm (đầu thẻ + nhãn cảnh báo · số tóm tắt · nhân thân · liên hệ & địa bàn · tiết kiệm · món vay có mục đích + HSSV đầy đủ)
   - bấm vào giá trị là chép (bỏ 12 nút 📋) · bỏ nút Hồ sơ hộ ở thẻ này
   - kiểm trùng: CCCD người vay · CCCD HSSV (chắc chắn) · TÊN VỢ/CHỒNG của người đang vay = người thừa kế (theo tên, cần đối chiếu) · trùng tên người vay khác */
var TC_KT = {so:'', ten:''}, TC_SL = 50;   /* 3.346: món theo khách khai báo ở 22-so-lieu, đọc qua KHO.monKH */
function tcChep(el){ var v = el.getAttribute('data-chep') || el.textContent; chepChu(v, 'Đã chép '+(el.getAttribute('data-ten') || '')+': '+v); }
function tcC(v, ten, hien){ return v ? '<span class="tc-chep" data-chep="'+coChuHTML(String(v))+'" data-ten="'+coChuHTML(ten||'')+'" onclick="tcChep(this)" title="Bấm để chép '+coChuHTML(ten||'')+'">'+coChuHTML(hien!==undefined ? hien : String(v))+'</span>' : '<span class="tc-thieu">—</span>'; }
function tcDiaChi(s){ return String(s||'').split(/\s*-\s*/).map(function(x){ return x.trim(); }).filter(function(x){ return x && x!=='.' && x!=='-'; }).join(', '); }
function tcSdtDat(s){ return /^0\d{9}$/.test(String(s||'').replace(/[\s.\-]/g, '')); }
function tcHan(c){   /* hạn CCCD + mức: het / sap (< 6 tháng) / ok / ? */
  if(!c.cccd) return {kq:'?', chu:'chưa có số CCCD'};
  var h = toCCCDHan(c.cccd, c.ns, c.ncap), m = String(h.chu).match(/đến (\d{2})\/(\d{2})\/(\d{4})/);
  if(h.kq==='ok' && m){ var den = new Date(+m[3], +m[2]-1, +m[1]), con = (den - nay())/864e5; if(con < 183) return {kq:'sap', chu:'sắp hết hạn — '+h.chu}; }
  return h;
}
function tcNoiGon(c){ var t = KHO.toDanhBa(c.to)||{}; return [c.tenXa ? String(c.tenXa).replace(/^(Xã|Phường|Thị trấn)\s+/i, '') : '', c.tenThon||t.tenThon ? 'ấp '+String(c.tenThon||t.tenThon).replace(/^(ấp|ap)\s+/i, '') : '', c.toTen||t.ten ? 'tổ '+(c.toTen||t.ten) : ''].filter(Boolean).join(' · '); }

/* 3.383 (anh 26/10 "bỏ phần này chưa cần"): thẻ khách / thẻ tổ ẩn 📜 Đã lập / In + 📅 Dòng thời gian — bật lại: TC_KHOI_PHU = true (nhật ký in vẫn ghi) */
var TC_KHOI_PHU = false;
/* ---------- cột trái ---------- */
function slTraHTML(){
  var n = KHO.chiMuc().length, ky = slHSMoi();
  tcDangKy();
  return '<div class="tc-dau">'+   /* 3.335 (anh 24/10): ô tìm + LỌC ĐỊA BÀN thành dải ngang toàn trang (trước nằm trong cột trái hẹp) */
    '<div id="tc-cay" class="to-cay pv-cay"></div>'+   /* 3.383 (anh 26/10 "tối ưu 2–3 dòng: dòng địa bàn đầu tiên, đến ô tìm, các nút tìm theo 1 dòng chip nhỏ bên dưới, bên phải ô hiện chip báo nếu có, dưới nữa là kiểm trùng") */
    '<div class="tc-tim"><div class="tc-hang"><div class="sl-tra-o"><span>🔎</span><input id="sl-tim" autocomplete="off" value="'+coChuHTML(SL_TRA_Q)+'" placeholder="'+tcTheoPH()+'" '+
    'oninput="SL_TRA_Q=this.value;TC_SL=50;slTraTim();this.nextElementSibling.hidden=!this.value" onkeydown="tcPhim(event)">'+
    '<button class="sap-ico tc-xoa-tim" onclick="tcXoaTim()" title="Xóa chữ đã gõ, tìm lại từ đầu"'+(SL_TRA_Q ? '' : ' hidden')+'>✕</button></div>'+   /* 3.383.5 (anh 26/10 "có nút xóa chọn"): nút luôn có sẵn, hiện khi ô có chữ */
    (typeof DH_CUOI!=='undefined' && DH_CUOI==='gd' ? '<button class="nho tc-ve-gdx" onclick="dhBam(\'gd\',\'gdx\')" title="Về bàn thao tác Giao dịch xã (địa bàn giữ nguyên)">← 🏢 Giao dịch xã</button>' : '')+   /* 3.328: vào từ Giao dịch xã */
    tcTheoHTML()+'<span class="pv-chip-o tc-bao">'+slChipHTML()+'</span></div></div></div>'+   /* 3.383 (anh): ô tìm vừa phải + Tìm theo cùng hàng, nổi hơn */   /* 3.160: bỏ khung gập "📍 Toàn PGD" — cây lọc chung như các tab */
    '<div class="tc-2cot tc394"><div class="tc-trai"><div class="sl-tra">'+
    '<details class="tc-kt"'+(TC_KT.so || TC_KT.ten ? ' open' : '')+'><summary>🔍 Kiểm trùng trước khi nhập máy</summary>'+
      '<div class="tc-kt-o"><input id="tc-kt-so" inputmode="numeric" autocomplete="off" placeholder="Số CCCD / CMND" value="'+coChuHTML(TC_KT.so)+'" oninput="TC_KT.so=this.value;tcKTVe()">'+
      '<input id="tc-kt-ten" autocomplete="off" placeholder="Họ tên (so cả tên vợ/chồng = người thừa kế)" value="'+coChuHTML(TC_KT.ten)+'" oninput="TC_KT.ten=this.value;tcKTVe()"></div><div id="tc-kt-kq"></div></details>'+
    (n ? '' : '<div class="ghi">Chưa có danh bạ — nạp Mẫu 31 hoặc Mẫu 10 ở tab con 📥 Nạp & Kiểm tra.</div>')+   /* 3.160: số khách lên dòng 📍 */
    '<div id="sl-kq"></div></div></div>'+
    '<div class="tc-phai" id="tc-ct"><div class="rong">Chọn 1 khách ở danh sách bên trái để xem chi tiết.</div></div></div>';
}
function tcPhim(e){   /* ↑ ↓ chọn dòng, Enter mở */
  var ds = Array.prototype.slice.call(document.querySelectorAll('#sl-kq .sl-kq-dong')); if(!ds.length) return;
  var i = ds.findIndex(function(x){ return x.classList.contains('chon'); });
  if(e.key==='ArrowDown' || e.key==='ArrowUp'){ e.preventDefault(); i = e.key==='ArrowDown' ? Math.min(ds.length-1, i+1) : Math.max(0, i-1); tcChonDong(ds[i]); ds[i].scrollIntoView({block:'nearest'}); if(tcHaiCot()) ds[i].click(); }
  else if(e.key==='Enter'){ e.preventDefault(); (ds[i] || ds[0]).click(); }
}
function tcDongHTML(c, ma, i){
  var tt = c.mon ? '<span class="tc-nh xanh">đang vay '+c.mon+' món</span>' : ((c.ku||[]).length ? '<span class="tc-nh">tất nợ</span>' : '<span class="tc-nh">chỉ gửi TK</span>');
  return '<div class="sl-kq-dong'+(c.mon ? '' : ' tat')+'" onclick="tcChonDong(this);slTheKH(KH_GY['+i+'].m)"><div class="tc-d1"><b class="tc-ten">'+coChuHTML(c.ten||'')+'</b><b class="tc-ma">'+coChuHTML(ma)+'</b>'+tt+'</div>'+   /* 3.103: tên + mã KH nổi bật */
    '<small>'+coChuHTML([c.cccd ? 'CCCD '+c.cccd : '', tcNoiGon(c)].filter(Boolean).join(' · '))+'</small></div>';
}
/* 3.335 (anh 24/10 — tham khảo app "Truy vấn thông tin"): chip "Tìm theo" (Tự nhận = cách cũ) + danh sách kiểu bảng / thẻ + tìm theo số TK 105 (Sao kê gắn kỳ) */
var TC_THEO_DS = [['', 'Tự nhận', 'Tên khách / vợ-chồng / HSSV, CCCD, mã KH, SĐT, khế ước…'], ['ten', 'Tên KH', 'Tên khách hàng (người vay)'], ['tt', 'Tổ trưởng', 'Tên tổ trưởng, mã tổ, SĐT hoặc mã KH tổ trưởng — hiện thông tin tổ'], ['vc', 'Vợ/chồng', 'Tên vợ / chồng (người thừa kế)'],
  ['hs', 'HSSV', 'Tên hoặc CCCD học sinh sinh viên'], ['cccd', 'CCCD', 'Số CCCD / CMND người vay (gõ một phần)'], ['ma', 'Mã KH', 'Mã khách hàng'], ['ku', 'Mã món vay', 'Số khế ước (cả món đã tất toán)'],
  ['sdt', 'SĐT', 'Số điện thoại'], ['tk', 'Số TK 105', 'Số tài khoản tiết kiệm TK 105 (Sao kê TK 105)']];
function tcTim(){ return D.cauHinh.tcTim = D.cauHinh.tcTim || {theo:'', kieu:''}; }
function tcTheo(){ var t = tcTim().theo || ''; return TC_THEO_DS.some(function(x){ return x[0]===t; }) ? t : ''; }
function tcTheoPH(){ var t = tcTheo(); return TC_THEO_DS.filter(function(x){ return x[0]===t; })[0][2]; }
function tcKieuBang(){ var k = tcTim().kieu; return k ? k==='bang' : window.innerWidth>=900; }   /* máy tính mặc định bảng, điện thoại thẻ */
function tcTheoHTML(){ var t = tcTheo();   /* 3.336: thêm "Tổ trưởng" (js/58 tcToTim) */
  return '<div class="tc-theo"><span class="tc-theo-nhan">Tìm theo</span>'+TC_THEO_DS.map(function(x){ return GD.chip(x[1], t===x[0], 'tc.theo', {k:x[0]}, x[2]); }).join('')+'</div>'; }
function tcDangKy(){ if(tcDangKy.xong || typeof GD==='undefined') return; tcDangKy.xong = 1;
  GD.dangKy('tc', {theo:function(el){ tcTim().theo = el.getAttribute('data-k') || ''; luu(); [].forEach.call(document.querySelectorAll('.tc-theo .gd-chip'), function(b){ b.classList.toggle('bat', b.getAttribute('data-k')===tcTim().theo); });
      var i = document.getElementById('sl-tim'); if(i){ i.placeholder = tcTheoPH(); i.focus(); } TC_SL = 50; slTraTim(); },
    kieu:function(){ tcTim().kieu = tcKieuBang() ? 'the' : 'bang'; luu(); slTraTim(); },
    to:function(el){ tcChonDong(el); tcTheTo(el.getAttribute('data-to')); }, kh:function(el){ slTheKH(el.getAttribute('data-kh')); },
    hien:function(el){ tcToHien(el); }, moMon:function(el){ tcToMoMon(el); }, tvKieu:function(el){ tcTim().tvKieu = el.getAttribute('data-k')==='gon' ? 'gon' : ''; luu(); tcTheTo(el.getAttribute('data-to')); },   /* 3.342: thẻ tổ — bấm CT → mã món vay, bấm TGTK → số TK 105 (dòng nhỏ dưới khách, bấm lại = ẩn) */
    moTo:function(el){ tcMoTo(el.getAttribute('data-to')); }, b105:function(el){ tcB105(el.getAttribute('data-to')); }, bangDiem:function(el){ tcBangDiem(el.getAttribute('data-diem'), el.getAttribute('data-to')); },
    ketNap:function(el){ TC_BANG = {diem:'', chon:el.getAttribute('data-to'), ket:null}; tcKetNap(); }, dong:function(){ dongHop(); }}); }
function tcCoKH(ma){ return !!KHO.danhBa(ma); }
function tcTk105Ds(){ var b = KHO.saoKeKy(TC_K, 'tk105'); return b && b.rows ? b.rows : []; }
function tcTimTheo(theo, q){   /* → {ds:[mục KHO.chiMuc()], phu:[mục KHO.phu()], ghi} — chỉ tìm đúng 1 loại */
  var tu = slChuan(q).split(' ').filter(Boolean), so = String(q).replace(/\D/g, ''), ds = [], phu = [], ghi = '';
  var dau = function(t){ return tu.every(function(w){ return t.indexOf(' '+w)>=0; }); };
  if(theo==='ten') ds = KHO.chiMuc().filter(function(r){ return dau(' '+slChuan(r.ten)); });
  else if(theo==='vc') phu = KHO.phu().filter(function(p){ return p.loai==='vc' && dau(p.t); });
  else if(theo==='hs') phu = KHO.phu().filter(function(p){ return p.loai==='hs' && (so.length>=4 && p.so ? p.so.indexOf(so)>=0 : dau(p.t)); });
  else if(so.length<3) ghi = 'Gõ ít nhất 3 chữ số.';
  else if(theo==='cccd') ds = KHO.chiMuc().filter(function(r){ return r.c.indexOf(so)>=0; });
  else if(theo==='ma') ds = KHO.chiMuc().filter(function(r){ return r.m.indexOf(so)>=0; });
  else if(theo==='ku') ds = KHO.chiMuc().filter(function(r){ return r.k.indexOf(so)>=0; });
  else if(theo==='sdt'){ var s0 = so.replace(/^84/, '0'); ds = KHO.chiMuc().filter(function(r){ return r.s && r.s.indexOf(s0)>=0; }); }
  else if(theo==='tk'){ var rows = tcTk105Ds(), co = {};
    if(!rows.length) ghi = 'Chưa có Sao kê TK 105 gắn kỳ số liệu — nạp ở 📥 Nạp & KT.';
    rows.forEach(function(o){ if(o.kh && String(o.stk||'').replace(/\D/g, '').indexOf(so)>=0) co[o.kh] = 1; });
    ds = KHO.chiMuc().filter(function(r){ return co[r.m]; }); }
  ds = ds.filter(function(r){ return tcTrongPV(r.m); }).sort(function(a, b){ return String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); });
  phu = phu.filter(function(p){ return tcTrongPV(p.kh); });
  return {ds:ds, phu:phu, ghi:ghi};
}
function tcTkCua(ma){ var r = tcTk105Ds().filter(function(o){ return o.kh===ma; }); return r.length ? r.map(function(o){ return o.stk; }).join(', ') : ''; }
function tcBangHTML(ds, phu){   /* kiểu bảng: Tên KH (+ tình trạng chữ nhỏ ngay sau — 3.337 anh) · Mã KH · Xã · Ấp · Tổ trưởng (bấm dòng = mở khách như thẻ) */
  var to = KHO.dsToDanhBa(), xa = function(c){ return String(c.tenXa||'').replace(/^(Xã|Phường|Thị trấn)\s+/i, ''); }, tk = tcTheo()==='tk';
  var o = function(c, ma){ var t = to[c.to] || tcTo(c.to) || {}; return '<td>'+coChuHTML(xa(c))+'</td><td>'+coChuHTML(pvApNgan(c.tenThon||t.tenThon||''))+'</td><td>'+coChuHTML(c.toTen||t.ten||'')+'</td>'; };
  return '<div class="tc-kq-cuon"><table class="tc-kq-bang"><thead><tr><th>Tên khách hàng</th><th>Mã KH</th>'+(tk ? '<th>Số TK 105</th>' : '')+'<th>Xã</th><th>Ấp</th><th>Tổ trưởng</th></tr></thead><tbody>'+
    ds.map(function(r, i){ var c = KHO.danhBa(r.m)||{};
      return '<tr class="sl-kq-dong'+(c.mon ? '' : ' tat')+'" onclick="tcChonDong(this);slTheKH(KH_GY['+i+'].m)">'+
        '<td class="tc-kq-ten"><b>'+coChuHTML(c.ten||'')+'</b> <small class="tc-tt-nho'+(c.mon ? ' xanh' : '')+'">'+(c.mon ? 'vay '+c.mon+' món' : (c.ku||[]).length ? 'tất nợ' : 'chỉ gửi TK')+'</small></td><td>'+coChuHTML(r.m)+'</td>'+(tk ? '<td>'+coChuHTML(tcTkCua(r.m))+'</td>' : '')+o(c, r.m)+'</tr>'; }).join('')+
    phu.map(function(p){ var c = KHO.danhBa(p.kh)||{};
      return '<tr class="sl-kq-dong phu" onclick="tcChonDong(this);slTheKH(\''+p.kh+'\')">'+
        '<td class="tc-kq-ten"><b>'+(p.loai==='vc' ? '👫 ' : '🎓 ')+coChuHTML(p.ten)+'</b> <small class="tc-tt-nho">'+(p.loai==='vc' ? 'vợ/chồng' : 'HSSV')+' của '+coChuHTML(c.ten||p.kh)+'</small></td><td>'+coChuHTML(p.kh)+'</td>'+(tk ? '<td></td>' : '')+o(c, p.kh)+'</tr>'; }).join('')+'</tbody></table></div>';
}
function slTraTim(){
  var e = document.getElementById('sl-kq'); if(!e) return;
  var pc = document.getElementById('tc-pv-chu'); if(pc) pc.textContent = pvChu(tcCH(), TC_K);
  var q = SL_TRA_Q.trim(), so = q.replace(/[\s.\-]/g, ''), laSo = /^\d{9,12}$/.test(so);
  var theo = tcTheo(), ghiTheo = '';
  if(theo==='tt'){ var cot0 = e.closest('.tc-2cot'); if(cot0) cot0.classList.add('tc-bang'); tcToTim(q, e); return; }   /* 3.336 (anh 24/10): tìm tổ trưởng → bảng tổ + thẻ tổ */
  if(laSo && (!theo || theo==='cccd')){ var doi = TC_KT.so!==so, ks = document.getElementById('tc-kt-so'); TC_KT.so = so; if(ks && ks.value!==so){ ks.value = so; doi = true; } if(ks) ks.closest('details').open = true; if(doi) tcKTVe(); }   /* gõ CCCD ở ô tìm → kiểm trùng luôn */
  var qq = slChuan(q), tu = qq.split(' '), laTen = !/^\d+$/.test(qq.replace(/ /g, '')), ds, phu = [];
  if(!q){   /* 3.334 (RA_SOAT_BO_CUC #2): chưa gõ → hiện sẵn khách trong phạm vi lọc (theo tổ rồi tên; bộ quá lớn thì giữ thứ tự danh bạ) */
    if(!KHO.chiMuc().length){ e.innerHTML = ''; return; }
    ds = KHO.chiMuc().filter(function(r){ return tcTrongPV(r.m); });
    if(ds.length<=6000){ var toCua = function(r){ return String((KHO.danhBa(r.m)||{}).to||''); }; ds.sort(function(a, b){ var ta = toCua(a), tb = toCua(b); return (!ta)-(!tb) || ta.localeCompare(tb) || String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); }); }
  } else if(theo){ var RT = tcTimTheo(theo, q); ds = RT.ds; phu = RT.phu; ghiTheo = RT.ghi;
  } else {
  ds = KHO.tim(q, laSo ? 60 : 100000).filter(function(r){ return tcTrongPV(r.m) && (!laTen || tu.every(function(w){ return (' '+slChuan(r.ten)).indexOf(' '+w)>=0; })); });
  phu = (!laSo && qq.length>=2 && laTen) ? KHO.phu().filter(function(p){ return tu.every(function(w){ return p.t.indexOf(' '+w)>=0; }) && tcTrongPV(p.kh); }) : [];
  if(/^\d{4,}$/.test(so) && !laSo) phu = KHO.phu().filter(function(p){ return p.so && p.so.indexOf(so)>=0 && tcTrongPV(p.kh); });
  }
  var gioi = tcHaiCot() ? 300 : TC_SL, tong = ds.length, tongPhu = phu.length;
  ds = ds.slice(0, gioi); KH_GY = ds; phu = phu.slice(0, gioi);
  var h = (tong+tongPhu>1 ? '<div class="ghi">'+tong+' khách'+(tongPhu ? ' · '+tongPhu+' vợ/chồng, HSSV' : '')+(tong>gioi || tongPhu>gioi ? ' — đang hiện '+gioi+' dòng đầu, gõ thêm hoặc chọn 📍 phạm vi để thu hẹp' : '')+'</div>' : '');
  var bang = tcKieuBang(), cot = e.closest('.tc-2cot'); if(cot) cot.classList.toggle('tc-bang', bang);   /* bảng: cột danh sách rộng hơn */
  h = '<div class="tc-kq-dau">'+(h || '<span></span>')+(q && !theo ? tcToGoiY(q) : '')+GD.nut({chu:bang ? '▦ Thẻ' : '☰ Bảng', lenh:'tc.kieu', tit:bang ? 'Đổi sang kiểu thẻ 2 dòng' : 'Đổi sang kiểu bảng (Tên · Mã · Xã · Ấp · Tổ trưởng · Tình trạng)'})+'</div>';
  if(bang) h += tcBangHTML(ds, phu); else {
  h += ds.map(function(r, i){ return tcDongHTML(KHO.danhBa(r.m)||{}, r.m, i); }).join('');
  h += phu.map(function(p){ var c = KHO.danhBa(p.kh)||{};
    return '<div class="sl-kq-dong phu" onclick="tcChonDong(this);slTheKH(\''+p.kh+'\')"><div class="tc-d1"><b>'+(p.loai==='vc' ? '👫 ' : '🎓 ')+coChuHTML(p.ten)+'</b><span class="tc-nh">'+(p.loai==='vc' ? 'vợ/chồng' : 'HSSV')+' của '+coChuHTML(c.ten||p.kh)+'</span></div>'+
      '<small>'+coChuHTML([p.loai==='hs' && p.so ? 'CCCD '+p.so : '', tcNoiGon(c), p.loai==='hs' ? (p.xong ? 'đã tất toán' : 'dư nợ '+tdnTien(p.dn)) : tcTinhTrang(c), 'mã '+p.kh].filter(Boolean).join(' · '))+'</small></div>'; }).join('');
  }
  if(!tcHaiCot() && (tong>gioi || tongPhu>gioi)) h += '<div class="hang-nut"><button class="nho" onclick="TC_SL+=50;slTraTim()">Xem thêm 50</button></div>';
  var pvGhi = tcCH().xa ? ' trong phạm vi '+coChuHTML(pvChu(tcCH(), TC_K)) : '', theoTen = theo ? TC_THEO_DS.filter(function(x){ return x[0]===theo; })[0][1] : '';
  if(!ds.length && !phu.length) h = ghiTheo ? '<div class="rong">'+coChuHTML(ghiTheo)+'</div>' :
    theo && q ? '<div class="rong">Không thấy khách có '+coChuHTML(theoTen)+' khớp “'+coChuHTML(q)+'”'+pvGhi+'.</div>' : !q ? '<div class="rong">Không có khách trong phạm vi '+coChuHTML(pvChu(tcCH(), TC_K))+'.</div>' : '<div class="rong">Không thấy khách hàng khớp “'+coChuHTML(q)+'”'+(tcCH().xa ? ' trong phạm vi '+coChuHTML(pvChu(tcCH(), TC_K)) : '')+'.</div>';
  if(!ds.length && !phu.length && q && !theo){ var gy = tcToGoiY(q); if(gy) h = '<div class="tc-kq-dau"><span></span>'+gy+'</div>'+h; }   /* 3.336: không khớp khách nhưng khớp tổ trưởng / mã tổ */
  if(!SL_PHU_KY && !laSo && q) h += '<div class="ghi">Chưa có Mẫu 31 nên chưa tìm được theo tên vợ/chồng, HSSV.</div>';
  e.innerHTML = h;
  if(tcHaiCot() && q && ds.length===1 && !phu.length){ var d1 = e.querySelector('.sl-kq-dong'); tcChonDong(d1); slTheKH(ds[0].m); }
}

/* ---------- kiểm trùng 2 ô ---------- */
function tcMonGon(ma){ return KHO.monKH(ma).filter(function(m){ return !m.xong; }); }
function tcTheTrung(c, ma, dauChu){
  var mon = tcMonGon(ma), dn = mon.reduce(function(a, m){ return a+m.dn; }, 0);
  return '<div class="tc-tr-the"><div class="tc-d1"><b>'+coChuHTML(c.ten||'')+'</b> <small>'+dauChu+'</small></div>'+
    '<div class="tc-tr-ct">mã '+tcC(ma, 'mã KH')+(c.ns ? ' · sinh '+ngayVNsl(c.ns) : '')+(c.cccd ? ' · CCCD '+tcC(c.cccd, 'CCCD')+(c.ncap ? ' cấp '+ngayVNsl(c.ncap) : '') : '')+' · '+coChuHTML(tcNoiGon(c))+'</div>'+
    '<div class="tc-tr-ct">'+(mon.length ? '<b class="do">Đang vay '+mon.length+' món · dư nợ '+tdnTien(dn)+'</b>: '+mon.map(function(m){ return coChuHTML(m.ct)+' '+tcC(m.ku, 'khế ước', m.ku.slice(0,2)+'-'+m.ku.slice(-4))+' '+tdnTien(m.dn)+(m.nv ? ' (vay '+ngayVNsl(m.nv)+')' : '')+(m.md ? ' — '+coChuHTML(m.md) : ''); }).join(' · ')
      : coChuHTML(tcTinhTrang(c)))+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="tcMoKH(\''+ma+'\')">Mở khách này</button></div></div>';
}
function tcXoaTim(){ SL_TRA_Q = ''; TC_SL = 50; var i = document.getElementById('sl-tim'); if(i){ i.value = ''; i.focus(); if(i.nextElementSibling) i.nextElementSibling.hidden = true; } slTraTim(); }
function tcMoKH(ma){ SL_TRA_Q = ma; var i = document.getElementById('sl-tim'); if(i) i.value = ma; slTraTim(); if(!tcHaiCot()) slTheKH(ma); }
function tcUuXa(a, b){ var S = tcCH(), ca = KHO.danhBa(a)||{}, cb = KHO.danhBa(b)||{}; return (cb.xa===S.xa)-(ca.xa===S.xa); }   /* khớp cùng xã đang chọn xếp trên */
function tcKiemTrung2(so, ten){
  so = String(so||'').replace(/\D/g, ''); var qt = slChuan(ten||'');
  if(so.length<9 && qt.split(' ').length<2) return so || qt ? '<div class="ghi">Nhập đủ số CCCD (9–12 số) hoặc họ tên đầy đủ (ít nhất 2 chữ).</div>' : '';
  var g1 = [], g2 = [], g3 = [], g4 = [], daCo = {};
  if(so.length>=9){
    KHO.chiMuc().filter(function(r){ return r.c.replace(/\D/g, '')===so; }).forEach(function(r){ daCo[r.m] = 1; g1.push(r.m); });
    KHO.phu().filter(function(p){ return p.loai==='hs' && p.so===so; }).forEach(function(p){ g2.push(p); });
  }
  if(qt.split(' ').length>=2){
    KHO.phu().filter(function(p){ return p.loai==='vc' && slChuan(p.ten)===qt; }).forEach(function(p){ g3.push(p); });
    KHO.chiMuc().filter(function(r){ return !daCo[r.m] && slChuan(r.ten)===qt; }).forEach(function(r){ g4.push(r.m); });
    KHO.phu().filter(function(p){ return p.loai==='hs' && slChuan(p.ten)===qt && g2.indexOf(p)<0; }).forEach(function(p){ g4.push(p); });
  }
  g3.sort(function(a, b){ return tcUuXa(a.kh, b.kh); }); g4.sort(function(a, b){ return tcUuXa(a.kh||a, b.kh||b); });
  var dangVay = function(ma){ return tcMonGon(ma).length>0 || (KHO.danhBa(ma)||{}).mon>0; };
  var nhom = function(lop, tit, ds){ return ds.length ? '<div class="tc-tr-nhom '+lop+'"><div class="tc-tr-tit">'+tit+' ('+ds.length+')</div>'+ds.slice(0, 30).join('')+(ds.length>30 ? '<div class="ghi">… còn '+(ds.length-30)+' — chọn 📍 phạm vi xã để thu hẹp.</div>' : '')+'</div>' : ''; };
  var h1 = g1.map(function(ma){ return tcTheTrung(KHO.danhBa(ma)||{}, ma, 'trùng <b>CCCD người vay</b> (chủ hộ)'); });
  var h2 = g2.map(function(p){ var c = KHO.danhBa(p.kh)||{}, m = KHO.monKH(p.kh).find(function(x){ return x.ku===p.ku; }) || {};
    return '<div class="tc-tr-the"><div class="tc-d1"><b>🎓 '+coChuHTML(p.ten)+'</b> <small>trùng <b>CCCD HSSV</b> trong món HSSV của người vay <b>'+coChuHTML(c.ten||p.kh)+'</b></small></div>'+
      '<div class="tc-tr-ct">mã KH '+tcC(p.kh, 'mã KH')+' · khế ước '+tcC(p.ku, 'khế ước')+' · '+(p.xong ? 'đã tất toán' : '<b class="do">dư nợ '+tdnTien(p.dn)+'</b>')+(m.truong ? ' · '+coChuHTML(m.truong) : '')+(m.raTruong ? ' · ra trường '+ngayVNsl(m.raTruong) : '')+' · '+coChuHTML(tcNoiGon(c))+'</div>'+
      '<div class="hang-nut"><button class="nho" onclick="tcMoKH(\''+p.kh+'\')">Mở khách này</button></div></div>'; });
  var h3 = g3.map(function(p){ return tcTheTrung(KHO.danhBa(p.kh)||{}, p.kh, '👫 <b>'+coChuHTML(p.ten)+'</b> là <b>vợ/chồng (người thừa kế)</b> của người vay này'); });
  var h4 = g4.map(function(x){ if(typeof x==='string') return tcTheTrung(KHO.danhBa(x)||{}, x, 'cùng họ tên, khác CCCD — kiểm tra có phải 1 người');
    var c = KHO.danhBa(x.kh)||{}; return '<div class="tc-tr-the"><div class="tc-d1"><b>🎓 '+coChuHTML(x.ten)+'</b> <small>cùng tên HSSV trong món của <b>'+coChuHTML(c.ten||x.kh)+'</b>'+(x.so ? ' · CCCD HSSV '+tcC(x.so, 'CCCD HSSV') : '')+'</small></div><div class="tc-tr-ct">'+coChuHTML(tcNoiGon(c))+' · '+(x.xong ? 'đã tất toán' : 'dư nợ '+tdnTien(x.dn))+'</div></div>'; });
  var dang = g1.some(dangVay) || g2.some(function(p){ return !p.xong; }), thuaKe = g3.some(function(p){ return dangVay(p.kh); });
  var kl = dang ? '<div class="sl-bao do">🔴 <b>Trùng — đang vay vốn.</b> Không nhập máy mới.</div>'
    : thuaKe ? '<div class="sl-bao vang">🟠 <b>Có thể trùng người thừa kế</b> (tên trùng vợ/chồng của người đang vay) — kiểm tra lại trước khi nhập máy.</div>'
    : (g1.length || g2.length) ? '<div class="sl-bao vang">ⓘ <b>Có trong số liệu nhưng đã tất nợ / chỉ gửi tiết kiệm</b> — không tính đang vay.</div>'
    : g4.length ? '<div class="sl-bao vang">🟡 <b>Không trùng CCCD</b>, nhưng có người cùng họ tên — xem dưới để chắc không phải 1 người.</div>'
    : '<div class="sl-bao xanh">🟢 <b>Không trùng — chưa vay vốn, có thể nhập máy.</b>'+(typeof tcKetNapNut==='function' ? ' '+tcKetNapNut() : '')+'</div>';   /* 3.333: chọn tổ kết nạp (bảng tổ của điểm GD) */
  var ky = slHSMoi();
  return kl+nhom('do', '🔴 Trùng CCCD người vay', h1)+nhom('do', '🔴 Trùng CCCD HSSV', h2)+nhom('cam', '🟠 Trùng tên vợ/chồng của người vay = người thừa kế (theo tên, cần đối chiếu)', h3)+nhom('vang', '🟡 Trùng họ tên người vay / HSSV khác', h4)+
    '<div class="ghi">Theo số liệu '+(ky ? slKyChu(ky) : '—')+(SL_PHU_KY ? '' : ' · chưa có Mẫu 31 nên chưa rà được CMND HSSV, tên vợ/chồng')+'. Vợ/chồng chỉ có tên trong Mẫu 31 (không có CCCD, ngày sinh) → so theo tên. Rà trên toàn PGD; khớp cùng xã đang chọn xếp trên. Món giải ngân sau ngày số liệu app chưa biết.</div>';
}
function tcKTVe(){   /* màn rộng: trái chỉ dòng kết luận, chi tiết sang cột phải (rộng, lưới thẻ) */
  var o = document.getElementById('tc-kt-kq'); if(!o) return;
  var h = tcKiemTrung2(TC_KT.so, TC_KT.ten);
  if(tcHaiCot() && /tc-tr-nhom/.test(h)){ var i = h.indexOf('</div>')+6; o.innerHTML = h.slice(0, i)+'<div class="ghi">Chi tiết ở khung bên phải →</div>';
    document.getElementById('tc-ct').innerHTML = '<div class="tc-the"><div class="tc-ct-tit">🔍 Kiểm trùng'+(TC_KT.so ? ' · CCCD '+coChuHTML(TC_KT.so) : '')+(TC_KT.ten ? ' · '+coChuHTML(TC_KT.ten) : '')+'</div>'+h+'</div>'; }
  else o.innerHTML = h;
}

/* ---------- thẻ chi tiết (phải / hộp trên điện thoại) ---------- */
/* 3.337 (anh 24/10): ngày đến hạn món vay tô màu — hạn hiệu lực = hạn gia hạn (có) / hạn hợp đồng; so hôm nay: quá hạn đỏ · ≤ 30 ngày cam · ≤ 90 ngày vàng */
function tcHanMon(m, xong, gon){   /* gon: bỏ dòng "còn N ngày" (đưa vào title) — bảng thành viên tổ 3.342 */
  var d = m.dhgh || m.dhg; if(!d) return '';
  var x = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/); if(!x) return coChuHTML(ngayVNsl(d));
  var hn = nay(), con = Math.round((new Date(+x[1], +x[2]-1, +x[3]) - new Date(hn.getFullYear(), hn.getMonth(), hn.getDate()))/864e5);
  var muc = xong ? '' : con<0 ? 'do' : con<=30 ? 'cam' : con<=90 ? 'vang' : '';
  var conChu = con<0 ? 'quá '+(-con)+' ngày' : con===0 ? 'hôm nay' : 'còn '+con+' ngày';
  return '<span class="tc-han'+(muc ? ' tc-han-'+muc : '')+'" title="'+(m.dhgh ? 'Hạn gia hạn (hạn hợp đồng '+ngayVNsl(m.dhg)+')' : 'Hạn theo hợp đồng')+(gon && !xong ? ' · '+conChu : '')+'">'+ngayVNsl(d)+(m.dhgh ? ' <small>GH</small>' : '')+'</span>'+
    (xong || gon ? '' : '<small class="tc-han-con">'+(con<0 ? 'quá '+(-con)+' ngày' : con===0 ? 'hôm nay' : 'còn '+con+' ngày')+'</small>');
}
function slTheKH(ma){
  var c = KHO.danhBa(ma); if(!c) return bao('Không thấy khách hàng này trong số liệu.', 3);
  var t = KHO.toDanhBa(c.to)||{}, han = tcHan(c), hai = D.cauHinh.slTab==='tra' && nganHienTai===7 && tcHaiCot();
  var nh = []; if(han.kq==='het') nh.push('<span class="tc-nh do">CCCD hết hạn</span>'); if(han.kq==='sap') nh.push('<span class="tc-nh vang">CCCD sắp hết hạn</span>'); if(!tcSdtDat(c.sdt)) nh.push('<span class="tc-nh vang">'+(c.sdt ? 'SĐT không đạt' : 'thiếu SĐT')+'</span>');
  var dong = function(nhan, gt){ return '<div class="tc-dl"><span>'+nhan+'</span><div>'+gt+'</div></div>'; };
  var stk = slStk(c.stk);   /* 3.120: chỉ số sổ 10 chữ số */
  var h = '<div class="'+(hai ? 'tc-ct-tit' : 'hop-tit')+'">👤 <span class="tc-ten to">'+tcC(c.ten, 'họ tên')+'</span> <span class="tc-ma to" title="Mã khách hàng">mã '+tcC(ma, 'mã KH')+'</span><span id="tc-nhan">'+nh.join('')+'</span></div>'+
    '<div class="tc-so" id="tc-so"></div>'+
    '<div class="tc-3cot">'+   /* 3.337 (anh 24/10): 3 cột Nhân thân │ Liên hệ · TK 105 │ Tổ — gọn trong 1 khung */
    '<div class="tc-nhom"><div class="tc-nhom-tit">Nhân thân</div><div class="tc-luoi">'+
      dong('CCCD', tcC(c.cccd, 'CCCD')+(c.ncap ? ' · cấp '+ngayVNsl(c.ncap) : '')+(c.noiCap ? ' · '+coChuHTML(c.noiCap) : ''))+
      (typeof sxCmndCua==='function' && sxCmndCua(ma) ? dong('CMND cũ', tcC(sxCmndCua(ma), 'CMND cũ')+' <small>(9 số, đọc từ thẻ đã scan)</small>') : '')+   /* 3.271 */
      dong('Hạn CCCD', '<b class="'+(han.kq==='het' ? 'do' : han.kq==='sap' ? 'vang' : han.kq==='ok' ? 'xanh' : '')+'">'+(han.kq==='het' ? '⚠ ' : '')+coChuHTML(han.chu)+'</b>')+
      dong('Sinh · giới · DT', [c.ns ? tcC(ngayVNsl(c.ns), 'ngày sinh') : '', coChuHTML([{'01':'Nam','02':'Nữ'}[c.gt]||c.gt||'', c.danToc||''].filter(Boolean).join(' · '))].filter(Boolean).join(' · ') || '—')+
      dong('Vợ/chồng', c.voChong ? tcC(c.voChong, 'tên vợ/chồng')+' <small>(người thừa kế)</small>' : '—')+'</div></div>'+
    '<div class="tc-nhom"><div class="tc-nhom-tit">Liên hệ · TK 105</div><div class="tc-luoi">'+   /* 3.337: gộp Liên hệ + Tiết kiệm 105 */
      dong('SĐT', c.sdt ? tcC(c.sdt, 'SĐT')+(tcSdtDat(c.sdt) ? '' : ' <b class="vang">không đạt</b>') : '<b class="vang">thiếu</b>')+
      dong('Địa chỉ', tcC(tcDiaChi(c.dc), 'địa chỉ'))+
      dong('Ấp · xã', coChuHTML([c.tenThon||t.tenThon, c.tenXa].filter(Boolean).join(', ') || '—'))+
      dong(stk.length>1 ? 'TK 105 ('+stk.length+')' : 'TK 105', stk.length ? stk.map(function(s){ return tcC(s, 'số TK 105'); }).join(' · ') : '—')+dong('Số dư 105', c.t105 ? '<b>'+tdnTien(c.t105)+'</b>' : '0')+'</div></div>'+
    tcToKhoiHTML(c)+'</div>'+   /* 3.333 (anh chốt): khối Tổ & địa bàn — mã tổ, tổ trưởng + mã KH (chép), số TV chuẩn QT-18, bảng tổ của điểm GD */
    '<div class="tc-nhom tc-nhom-mon"><div class="tc-nhom-tit">Món vay — '+slKyChu(c.ky)+'</div><div id="kh-mon"><div class="rong">Đang mở…</div></div></div>'+
    (TC_KHOI_PHU && typeof nkKhoiHTML==='function' ? nkKhoiHTML('kh', ma, 6) : '')+   /* 3.348: 📜 đã lập / in */
    (TC_KHOI_PHU && typeof dtgKhoiHTML==='function' ? dtgKhoiHTML('kh', ma) : '')+   /* 3.359: 📅 dòng thời gian */
    '<div class="hang-nut tc-nut"><button class="nho" onclick="slChepKH(\''+ma+'\')">📋 Chép cả khối</button>'+(c.to ? '<button class="nho" onclick="tcMoTo(\''+c.to+'\')">👥 Mở tổ</button>' : '')+
    (hai ? '' : '<button class="nho chinh" data-lenh="hop.dong">Đóng (Esc)</button>')+'</div>';
  if(hai) document.getElementById('tc-ct').innerHTML = '<div class="tc-the tc-khung">'+h+'</div>';   /* 3.333: khung cố định (CSS .tc-khung) */
  else moHop('<div class="tc-the tc-khung">'+h+'</div>', true);
  KHO.bo(c.ky).then(function(B){
    var e = document.getElementById('kh-mon'); if(!e) return;
    var ds = (B.theoKH[ma]||[]).filter(function(m){ return m.ku; }), gap = {};
    ds = ds.filter(function(m){ if(gap[m.ku]) return false; gap[m.ku] = 1; return true; });
    var daTT = function(m){ return (m.ttMon==='CLOSE' || !((m.dn||0)>0)) && !(laiTon(m)>0); };
    var con = ds.filter(function(m){ return !daTT(m); }), xong = ds.filter(daTT);
    var tong = {dn:0, qh:0, kn:0, lt:0}; con.forEach(function(m){ tong.dn += m.dn||0; tong.qh += m.qh||0; tong.kn += m.kn||0; tong.lt += laiTon(m); });
    var so = document.getElementById('tc-so');
    if(so) so.innerHTML = [['Tổng dư nợ', tong.dn, ''], ['Quá hạn', tong.qh, tong.qh ? 'do' : ''], ['Khoanh', tong.kn, tong.kn ? 'vang' : ''], ['Lãi tồn', tong.lt, tong.lt ? 'vang' : ''], ['Số dư 105', c.t105||0, '']]
      .map(function(x){ return '<div class="tc-o '+x[2]+'"><span>'+x[0]+'</span><b>'+tdnTien(x[1])+'</b></div>'; }).join('');
    var nhan = document.getElementById('tc-nhan');
    if(nhan){ var them = ''; if(tong.qh) them += '<span class="tc-nh do">quá hạn</span>'; if(tong.kn) them += '<span class="tc-nh vang">khoanh</span>'; if(con.some(function(m){ return B.khd[m.ku]; })) them += '<span class="tc-nh vang">KHĐ</span>'; nhan.innerHTML = them+nhan.innerHTML; }
    if(!ds.length){ e.innerHTML = '<div class="rong">Khách chỉ gửi tiết kiệm, không có món vay kỳ này.</div>'; return; }
    var dongMon = function(m){   /* 3.337: cột Đến hạn riêng, tô màu (quá hạn đỏ · ≤ 30 ngày cam · ≤ 90 ngày vàng) */
      var tt = [];
      if(daTT(m)) tt.push('<b class="vang">đã tất toán</b>');
      if(m.qh>0) tt.push('<b class="do">QH '+tdnTien(m.qh)+'</b>');
      if(m.kn>0) tt.push('<b class="vang">khoanh '+tdnTien(m.kn)+(B.nk[m.ku] && B.nk[m.ku].nhh ? ' đến '+ngayVNsl(B.nk[m.ku].nhh) : '')+'</b>');
      if(B.khd[m.ku]) tt.push('KHĐ (GD cuối '+ngayVNsl(B.khd[m.ku].ngdg)+')');
      if(m.ghT>0) tt.push('gia hạn '+tdnTien(m.ghT));
      if(m.c_ten_ldxk) tt.push('XKLĐ: '+coChuHTML([m.c_ten_ldxk, m.c_ten_quoc_gia||m.c_quoc_gia_xuat_khau].filter(Boolean).join(' · ')));
      if(!tt.length) tt.push('trong hạn');
      var hs = '';
      if(m.c_ten_hssv || String(m.ct)==='02'){
        var nh = m.nhapHoc || ngayISOTuVN(m.c_ngay_nhap_hoc||''), rt = m.raTruong || ngayISOTuVN(m.c_ngay_ra_truong||'');
        hs = '<tr class="tc-hs"><td colspan="7">🎓 '+[m.c_ten_hssv ? tcC(m.c_ten_hssv, 'tên HSSV') : '', m.c_cmnd_hssv ? 'CCCD '+tcC(m.c_cmnd_hssv, 'CCCD HSSV') : '', m.c_ten_truong ? '<b class="hs-truong">'+coChuHTML(m.c_ten_truong)+'</b>' : '',
          m.c_ten_he_dt ? coChuHTML(m.c_ten_he_dt) : '', m.c_ten_nganh_dt ? 'ngành '+coChuHTML(m.c_ten_nganh_dt) : '',
          (nh || rt) ? '<b class="hs-khoa">khóa '+(nh ? nh.slice(0,4) : '?')+'–'+(rt ? rt.slice(0,4) : '?')+' · nhập học '+(nh ? ngayVNsl(nh) : '?')+' → ra trường '+(rt ? ngayVNsl(rt) : '?')+'</b>' : '',   /* 3.103: tô màu để đối chiếu khi cho vay năm mới */
          m.c_ten_dt_hoc_phi ? coChuHTML(m.c_ten_dt_hoc_phi) : ''].filter(Boolean).join(' · ')+'</td></tr>';
      }
      return '<tr class="'+(daTT(m) ? 'tc-xong' : '')+'"><td title="'+coChuHTML((m.ctTen||tdnCT({ct:m.ct})||'').trim())+'"><b>'+coChuHTML(ctNgan(m.ct, m))+'</b></td><td>'+tcC(m.ku, 'khế ước')+'<small class="tc-md">vay '+ngayVNsl(m.nv||m.ngn)+(ktCoNganh(m) ? ' · '+coChuHTML(ktNganh(m)) : '')+'</small></td>'+   /* 3.337: ngày vay + mục đích dòng nhỏ dưới khế ước */
        '<td>'+tcHanMon(m, daTT(m))+'</td><td class="so">'+tdnTien(m.gn)+'</td><td class="so"><b>'+tdnTien(m.dn)+'</b></td>'+
        '<td class="so">'+(laiTon(m) ? tdnTien(laiTon(m)) : '')+'</td><td>'+tt.join(' · ')+'</td></tr>'+hs;
    };
    e.innerHTML = '<div class="tc-mon-cuon"><table class="kh-mon tc-mon"><thead><tr><th>CT</th><th>Khế ước · ngày vay · mục đích</th><th>Đến hạn</th><th>Giải ngân</th><th>Dư nợ</th><th>Lãi tồn</th><th>Tình trạng</th></tr></thead><tbody>'+
      con.map(dongMon).join('')+(con.length>1 ? '<tr class="tc-cong"><td colspan="4">Cộng '+con.length+' món</td><td class="so"><b>'+tdnTien(tong.dn)+'</b></td><td class="so">'+(tong.lt ? tdnTien(tong.lt) : '')+'</td><td></td></tr>' : '')+
      '</tbody><tbody id="tc-xong" hidden>'+xong.map(dongMon).join('')+'</tbody></table></div>'+
      (xong.length ? '<div class="hang-nut"><button class="nho" onclick="var b=document.getElementById(\'tc-xong\');b.hidden=!b.hidden;this.textContent=b.hidden?\'▾ Hiện '+xong.length+' món đã tất toán\':\'▴ Ẩn món đã tất toán\'">▾ Hiện '+xong.length+' món đã tất toán</button></div>' : '');
  });
}
function tcMoTo(to){ dongHop(); var C = toCH(), t = KHO.to(to); C.to = to; if(t){ C.xa = t.xa||''; C.diem = t.khoaDiem; C.hoi = String(t.dv||''); C.ap = ''; } else { var k = KHO.toKy(TC_K, to); if(k){ C.xa = k.xa||''; C.diem = k.khoaDiem; C.hoi = String(k.dv||''); } } luu(); slDoiTab('to'); }
/* 3.383.7 (anh 27/10 "gắn nút mở sao kê biến động 105 ở chỗ tra cứu khi chọn tổ mở nhanh"): Sao kê › chọn sẵn tổ + báo cáo b105 → Xem */
function tcB105(to){ dongHop(); var t = KHO.toKy(TC_K, to) || KHO.to(to); if(!t) return bao('Không thấy tổ '+to+'.', 3);
  var S = skCH(); S.xa = t.xa||''; S.diem = t.khoaDiem; S.hoi = String(t.dv||''); S.ap = ''; S.to = to; S.bc = {b105:true}; luu();
  D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk');
  var n = 0, cho = function(){ if(typeof SK_K!=='undefined' && SK_K) return skXem(); if(++n<120) setTimeout(cho, 250); }; setTimeout(cho, 50); }
function slChepKH(ma){
  var c = KHO.danhBa(ma); if(!c) return; var t = KHO.toDanhBa(c.to)||{};
  chepChu(['Họ tên: '+(c.ten||''), 'Mã KH: '+ma, 'Ngày sinh: '+ngayVNsl(c.ns), 'CCCD: '+(c.cccd||'')+(c.ncap ? ' — cấp '+ngayVNsl(c.ncap) : '')+(c.noiCap ? ' — '+c.noiCap : ''),
    'Địa chỉ: '+tcDiaChi(c.dc)].concat(c.sdt ? ['SĐT: '+c.sdt] : [], c.voChong ? ['Vợ/chồng: '+c.voChong] : [], slStk(c.stk).length ? ['TK 105: '+slStk(c.stk).join(', ')+(c.t105 ? ' — số dư '+tdnTien(c.t105) : '')] : [],
    (c.toTen||t.ten) ? ['Tổ: '+(c.toTen||t.ten)+(c.dv||t.dv ? ' — '+tdnHoi(c.dv||t.dv) : '')] : []).join('\n'), 'Đã chép thông tin khách hàng.');
}
function tcHaiCot(){ return window.innerWidth>=900 && !!document.getElementById('tc-ct'); }
function tcChonDong(el){ var c = el && el.parentNode; if(c) Array.prototype.forEach.call(c.querySelectorAll('.sl-kq-dong.chon'), function(x){ x.classList.remove('chon'); }); if(el) el.classList.add('chon'); }
/* 3.88: luồng nạp theo THÁNG — chọn tháng → ① file của tháng (trạng thái từng loại) → ② Kiểm tra (kết quả lưu, không chạy lại) → ③ Chốt (sau)
   bảng nhiều tháng giữ nguyên, thu gọn được (D.cauHinh.slTQ) để lấy chỗ cho kết quả kiểm tra */
/* ---------- 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng ---------- */
var KH_GY = [];
/* 3.86: đang ở tab Số liệu mà gõ ô tìm chung → đếm kết quả ở các tab khác, bấm là nhảy sang tab đó (giữ chữ đang tìm) */
var SL_NHAY = [];
function slNhayTabHTML(q){
  var k = boDau(String(q||'').trim()); if(k.length<2) return '';
  var dem = function(ds){ return loc(ds||[], k).length; };
  SL_NHAY = [[1,'📄 Văn bản', dem(D.vanBan)], [3,'📝 Thư viện', dem(D.ghiChu)],   /* 3.144: bỏ tab Tháng */
    [4,'🗂 Scan', (D.scan||[]).filter(function(m){ return boDau(m.ten+' '+(m.xa||'')+' '+(m.ap||'')+' '+(m.to||'')+' '+(m.ghi||'')).indexOf(k)>=0; }).length],
    [5,'📋 Biểu mẫu', dem(D.bieuMau)]].filter(function(x){ return x[2]; }).sort(function(a,b){ return b[2]-a[2]; });
  if(!SL_NHAY.length) return '<div class="gy-dau">Không thấy “'+coChuHTML(q)+'” ở các tab khác</div>';
  return '<div class="gy-dau">Tìm ở tab khác (bấm để sang)</div>'+SL_NHAY.map(function(x){
    return '<button onclick="dongGoiY();doiNgan('+x[0]+')">'+x[1]+' <small>'+x[2]+' kết quả</small></button>'; }).join('');
}

