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
var TC_KT = {so:'', ten:''}, TC_SL = 50, SL_KHMON = {};   /* SL_KHMON[mã KH] = món theo Mẫu 31 mới nhất (dùng cho thẻ kiểm trùng) */
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
function tcNoiGon(c){ var t = (SL_DB.to||{})[c.to]||{}; return [c.tenXa ? String(c.tenXa).replace(/^(Xã|Phường|Thị trấn)\s+/i, '') : '', c.tenThon||t.tenThon ? 'ấp '+String(c.tenThon||t.tenThon).replace(/^(ấp|ap)\s+/i, '') : '', c.toTen||t.ten ? 'tổ '+(c.toTen||t.ten) : ''].filter(Boolean).join(' · '); }

/* ---------- cột trái ---------- */
function slTraHTML(){
  var n = SL_TIM.length, ky = slHSMoi();
  tcDangKy();
  return '<div class="tc-dau">'+   /* 3.335 (anh 24/10): ô tìm + LỌC ĐỊA BÀN thành dải ngang toàn trang (trước nằm trong cột trái hẹp) */
    '<div class="tc-tim"><div class="tc-hang"><div class="sl-tra-o"><span>🔎</span><input id="sl-tim" autocomplete="off" value="'+coChuHTML(SL_TRA_Q)+'" placeholder="'+tcTheoPH()+'" '+
    'oninput="SL_TRA_Q=this.value;TC_SL=50;slTraTim()" onkeydown="tcPhim(event)">'+
    (SL_TRA_Q ? '<button class="sap-ico" onclick="SL_TRA_Q=\'\';veSoLieu();slDoiTab(\'tra\')" title="Xóa">✕</button>' : '')+'</div>'+
    (typeof DH_CUOI!=='undefined' && DH_CUOI==='gd' ? '<button class="nho tc-ve-gdx" onclick="dhBam(\'gd\',\'gdx\')" title="Về bàn thao tác Giao dịch xã (địa bàn giữ nguyên)">← 🏢 Giao dịch xã</button>' : '')+   /* 3.328: vào từ Giao dịch xã */
    '</div>'+tcTheoHTML()+'</div><div id="tc-cay" class="to-cay pv-cay"></div></div>'+   /* 3.160: bỏ khung gập "📍 Toàn PGD" — cây lọc chung như các tab */
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
    hien:function(el){ tcToHien(el); },   /* 3.342: thẻ tổ — bấm CT → mã món vay, bấm TGTK → số TK 105 (dòng nhỏ dưới khách, bấm lại = ẩn) */
    moTo:function(el){ tcMoTo(el.getAttribute('data-to')); }, bangDiem:function(el){ tcBangDiem(el.getAttribute('data-diem'), el.getAttribute('data-to')); },
    ketNap:function(el){ TC_BANG = {diem:'', chon:el.getAttribute('data-to'), ket:null}; tcKetNap(); }, dong:function(){ dongHop(); }}); }
function tcCoKH(ma){ return !!(ma && SL_DB && SL_DB.kh[ma]); }
function tcTk105Ds(){ var b = (TC_K && TC_K.tk && TC_K.tk.tk105) || (typeof tkBang==='function' ? tkBang('tk105') : null); return b && b.rows ? b.rows : []; }
function tcTimTheo(theo, q){   /* → {ds:[mục SL_TIM], phu:[mục SL_PHU], ghi} — chỉ tìm đúng 1 loại */
  var tu = slChuan(q).split(' ').filter(Boolean), so = String(q).replace(/\D/g, ''), ds = [], phu = [], ghi = '';
  var dau = function(t){ return tu.every(function(w){ return t.indexOf(' '+w)>=0; }); };
  if(theo==='ten') ds = SL_TIM.filter(function(r){ return dau(' '+slChuan(r.ten)); });
  else if(theo==='vc') phu = SL_PHU.filter(function(p){ return p.loai==='vc' && dau(p.t); });
  else if(theo==='hs') phu = SL_PHU.filter(function(p){ return p.loai==='hs' && (so.length>=4 && p.so ? p.so.indexOf(so)>=0 : dau(p.t)); });
  else if(so.length<3) ghi = 'Gõ ít nhất 3 chữ số.';
  else if(theo==='cccd') ds = SL_TIM.filter(function(r){ return r.c.indexOf(so)>=0; });
  else if(theo==='ma') ds = SL_TIM.filter(function(r){ return r.m.indexOf(so)>=0; });
  else if(theo==='ku') ds = SL_TIM.filter(function(r){ return r.k.indexOf(so)>=0; });
  else if(theo==='sdt'){ var s0 = so.replace(/^84/, '0'); ds = SL_TIM.filter(function(r){ return r.s && r.s.indexOf(s0)>=0; }); }
  else if(theo==='tk'){ var rows = tcTk105Ds(), co = {};
    if(!rows.length) ghi = 'Chưa có Sao kê TK 105 gắn kỳ số liệu — nạp ở 📥 Nạp & KT.';
    rows.forEach(function(o){ if(o.kh && String(o.stk||'').replace(/\D/g, '').indexOf(so)>=0) co[o.kh] = 1; });
    ds = SL_TIM.filter(function(r){ return co[r.m]; }); }
  ds = ds.filter(function(r){ return tcTrongPV(r.m); }).sort(function(a, b){ return String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); });
  phu = phu.filter(function(p){ return tcTrongPV(p.kh); });
  return {ds:ds, phu:phu, ghi:ghi};
}
function tcTkCua(ma){ var r = tcTk105Ds().filter(function(o){ return o.kh===ma; }); return r.length ? r.map(function(o){ return o.stk; }).join(', ') : ''; }
function tcBangHTML(ds, phu){   /* kiểu bảng: Tên KH (+ tình trạng chữ nhỏ ngay sau — 3.337 anh) · Mã KH · Xã · Ấp · Tổ trưởng (bấm dòng = mở khách như thẻ) */
  var to = (SL_DB && SL_DB.to) || {}, xa = function(c){ return String(c.tenXa||'').replace(/^(Xã|Phường|Thị trấn)\s+/i, ''); }, tk = tcTheo()==='tk';
  var o = function(c, ma){ var t = to[c.to] || tcTo(c.to) || {}; return '<td>'+coChuHTML(xa(c))+'</td><td>'+coChuHTML(pvApNgan(c.tenThon||t.tenThon||''))+'</td><td>'+coChuHTML(c.toTen||t.ten||'')+'</td>'; };
  return '<div class="tc-kq-cuon"><table class="tc-kq-bang"><thead><tr><th>Tên khách hàng</th><th>Mã KH</th>'+(tk ? '<th>Số TK 105</th>' : '')+'<th>Xã</th><th>Ấp</th><th>Tổ trưởng</th></tr></thead><tbody>'+
    ds.map(function(r, i){ var c = SL_DB.kh[r.m]||{};
      return '<tr class="sl-kq-dong'+(c.mon ? '' : ' tat')+'" onclick="tcChonDong(this);slTheKH(KH_GY['+i+'].m)">'+
        '<td class="tc-kq-ten"><b>'+coChuHTML(c.ten||'')+'</b> <small class="tc-tt-nho'+(c.mon ? ' xanh' : '')+'">'+(c.mon ? 'vay '+c.mon+' món' : (c.ku||[]).length ? 'tất nợ' : 'chỉ gửi TK')+'</small></td><td>'+coChuHTML(r.m)+'</td>'+(tk ? '<td>'+coChuHTML(tcTkCua(r.m))+'</td>' : '')+o(c, r.m)+'</tr>'; }).join('')+
    phu.map(function(p){ var c = SL_DB.kh[p.kh]||{};
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
    if(!SL_TIM.length){ e.innerHTML = ''; return; }
    ds = SL_TIM.filter(function(r){ return tcTrongPV(r.m); });
    if(ds.length<=6000){ var toCua = function(r){ return String((SL_DB.kh[r.m]||{}).to||''); }; ds.sort(function(a, b){ var ta = toCua(a), tb = toCua(b); return (!ta)-(!tb) || ta.localeCompare(tb) || String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); }); }
  } else if(theo){ var RT = tcTimTheo(theo, q); ds = RT.ds; phu = RT.phu; ghiTheo = RT.ghi;
  } else {
  ds = slTimKH(q, laSo ? 60 : 100000).filter(function(r){ return tcTrongPV(r.m) && (!laTen || tu.every(function(w){ return (' '+slChuan(r.ten)).indexOf(' '+w)>=0; })); });
  phu = (!laSo && qq.length>=2 && laTen) ? SL_PHU.filter(function(p){ return tu.every(function(w){ return p.t.indexOf(' '+w)>=0; }) && tcTrongPV(p.kh); }) : [];
  if(/^\d{4,}$/.test(so) && !laSo) phu = SL_PHU.filter(function(p){ return p.so && p.so.indexOf(so)>=0 && tcTrongPV(p.kh); });
  }
  var gioi = tcHaiCot() ? 300 : TC_SL, tong = ds.length, tongPhu = phu.length;
  ds = ds.slice(0, gioi); KH_GY = ds; phu = phu.slice(0, gioi);
  var h = (tong+tongPhu>1 ? '<div class="ghi">'+tong+' khách'+(tongPhu ? ' · '+tongPhu+' vợ/chồng, HSSV' : '')+(tong>gioi || tongPhu>gioi ? ' — đang hiện '+gioi+' dòng đầu, gõ thêm hoặc chọn 📍 phạm vi để thu hẹp' : '')+'</div>' : '');
  var bang = tcKieuBang(), cot = e.closest('.tc-2cot'); if(cot) cot.classList.toggle('tc-bang', bang);   /* bảng: cột danh sách rộng hơn */
  h = '<div class="tc-kq-dau">'+(h || '<span></span>')+(q && !theo ? tcToGoiY(q) : '')+GD.nut({chu:bang ? '▦ Thẻ' : '☰ Bảng', lenh:'tc.kieu', tit:bang ? 'Đổi sang kiểu thẻ 2 dòng' : 'Đổi sang kiểu bảng (Tên · Mã · Xã · Ấp · Tổ trưởng · Tình trạng)'})+'</div>';
  if(bang) h += tcBangHTML(ds, phu); else {
  h += ds.map(function(r, i){ return tcDongHTML(SL_DB.kh[r.m]||{}, r.m, i); }).join('');
  h += phu.map(function(p){ var c = SL_DB.kh[p.kh]||{};
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
function tcMonGon(ma){ return (SL_KHMON[ma]||[]).filter(function(m){ return !m.xong; }); }
function tcTheTrung(c, ma, dauChu){
  var mon = tcMonGon(ma), dn = mon.reduce(function(a, m){ return a+m.dn; }, 0);
  return '<div class="tc-tr-the"><div class="tc-d1"><b>'+coChuHTML(c.ten||'')+'</b> <small>'+dauChu+'</small></div>'+
    '<div class="tc-tr-ct">mã '+tcC(ma, 'mã KH')+(c.ns ? ' · sinh '+ngayVNsl(c.ns) : '')+(c.cccd ? ' · CCCD '+tcC(c.cccd, 'CCCD')+(c.ncap ? ' cấp '+ngayVNsl(c.ncap) : '') : '')+' · '+coChuHTML(tcNoiGon(c))+'</div>'+
    '<div class="tc-tr-ct">'+(mon.length ? '<b class="do">Đang vay '+mon.length+' món · dư nợ '+tdnTien(dn)+'</b>: '+mon.map(function(m){ return coChuHTML(m.ct)+' '+tcC(m.ku, 'khế ước', m.ku.slice(0,2)+'-'+m.ku.slice(-4))+' '+tdnTien(m.dn)+(m.nv ? ' (vay '+ngayVNsl(m.nv)+')' : '')+(m.md ? ' — '+coChuHTML(m.md) : ''); }).join(' · ')
      : coChuHTML(tcTinhTrang(c)))+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="tcMoKH(\''+ma+'\')">Mở khách này</button></div></div>';
}
function tcMoKH(ma){ SL_TRA_Q = ma; var i = document.getElementById('sl-tim'); if(i) i.value = ma; slTraTim(); if(!tcHaiCot()) slTheKH(ma); }
function tcUuXa(a, b){ var S = tcCH(), ca = SL_DB.kh[a]||{}, cb = SL_DB.kh[b]||{}; return (cb.xa===S.xa)-(ca.xa===S.xa); }   /* khớp cùng xã đang chọn xếp trên */
function tcKiemTrung2(so, ten){
  so = String(so||'').replace(/\D/g, ''); var qt = slChuan(ten||'');
  if(so.length<9 && qt.split(' ').length<2) return so || qt ? '<div class="ghi">Nhập đủ số CCCD (9–12 số) hoặc họ tên đầy đủ (ít nhất 2 chữ).</div>' : '';
  var g1 = [], g2 = [], g3 = [], g4 = [], daCo = {};
  if(so.length>=9){
    SL_TIM.filter(function(r){ return r.c.replace(/\D/g, '')===so; }).forEach(function(r){ daCo[r.m] = 1; g1.push(r.m); });
    SL_PHU.filter(function(p){ return p.loai==='hs' && p.so===so; }).forEach(function(p){ g2.push(p); });
  }
  if(qt.split(' ').length>=2){
    SL_PHU.filter(function(p){ return p.loai==='vc' && slChuan(p.ten)===qt; }).forEach(function(p){ g3.push(p); });
    SL_TIM.filter(function(r){ return !daCo[r.m] && slChuan(r.ten)===qt; }).forEach(function(r){ g4.push(r.m); });
    SL_PHU.filter(function(p){ return p.loai==='hs' && slChuan(p.ten)===qt && g2.indexOf(p)<0; }).forEach(function(p){ g4.push(p); });
  }
  g3.sort(function(a, b){ return tcUuXa(a.kh, b.kh); }); g4.sort(function(a, b){ return tcUuXa(a.kh||a, b.kh||b); });
  var dangVay = function(ma){ return tcMonGon(ma).length>0 || (SL_DB.kh[ma]||{}).mon>0; };
  var nhom = function(lop, tit, ds){ return ds.length ? '<div class="tc-tr-nhom '+lop+'"><div class="tc-tr-tit">'+tit+' ('+ds.length+')</div>'+ds.slice(0, 30).join('')+(ds.length>30 ? '<div class="ghi">… còn '+(ds.length-30)+' — chọn 📍 phạm vi xã để thu hẹp.</div>' : '')+'</div>' : ''; };
  var h1 = g1.map(function(ma){ return tcTheTrung(SL_DB.kh[ma]||{}, ma, 'trùng <b>CCCD người vay</b> (chủ hộ)'); });
  var h2 = g2.map(function(p){ var c = SL_DB.kh[p.kh]||{}, m = (SL_KHMON[p.kh]||[]).find(function(x){ return x.ku===p.ku; }) || {};
    return '<div class="tc-tr-the"><div class="tc-d1"><b>🎓 '+coChuHTML(p.ten)+'</b> <small>trùng <b>CCCD HSSV</b> trong món HSSV của người vay <b>'+coChuHTML(c.ten||p.kh)+'</b></small></div>'+
      '<div class="tc-tr-ct">mã KH '+tcC(p.kh, 'mã KH')+' · khế ước '+tcC(p.ku, 'khế ước')+' · '+(p.xong ? 'đã tất toán' : '<b class="do">dư nợ '+tdnTien(p.dn)+'</b>')+(m.truong ? ' · '+coChuHTML(m.truong) : '')+(m.raTruong ? ' · ra trường '+ngayVNsl(m.raTruong) : '')+' · '+coChuHTML(tcNoiGon(c))+'</div>'+
      '<div class="hang-nut"><button class="nho" onclick="tcMoKH(\''+p.kh+'\')">Mở khách này</button></div></div>'; });
  var h3 = g3.map(function(p){ return tcTheTrung(SL_DB.kh[p.kh]||{}, p.kh, '👫 <b>'+coChuHTML(p.ten)+'</b> là <b>vợ/chồng (người thừa kế)</b> của người vay này'); });
  var h4 = g4.map(function(x){ if(typeof x==='string') return tcTheTrung(SL_DB.kh[x]||{}, x, 'cùng họ tên, khác CCCD — kiểm tra có phải 1 người');
    var c = SL_DB.kh[x.kh]||{}; return '<div class="tc-tr-the"><div class="tc-d1"><b>🎓 '+coChuHTML(x.ten)+'</b> <small>cùng tên HSSV trong món của <b>'+coChuHTML(c.ten||x.kh)+'</b>'+(x.so ? ' · CCCD HSSV '+tcC(x.so, 'CCCD HSSV') : '')+'</small></div><div class="tc-tr-ct">'+coChuHTML(tcNoiGon(c))+' · '+(x.xong ? 'đã tất toán' : 'dư nợ '+tdnTien(x.dn))+'</div></div>'; });
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
  var c = SL_DB && SL_DB.kh[ma]; if(!c) return bao('Không thấy khách hàng này trong số liệu.', 3);
  var t = (SL_DB.to||{})[c.to]||{}, han = tcHan(c), hai = D.cauHinh.slTab==='tra' && nganHienTai===7 && tcHaiCot();
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
    '<div class="hang-nut tc-nut"><button class="nho" onclick="slChepKH(\''+ma+'\')">📋 Chép cả khối</button>'+(c.to ? '<button class="nho" onclick="tcMoTo(\''+c.to+'\')">👥 Mở tổ</button>' : '')+
    (hai ? '' : '<button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button>')+'</div>';
  if(hai) document.getElementById('tc-ct').innerHTML = '<div class="tc-the tc-khung">'+h+'</div>';   /* 3.333: khung cố định (CSS .tc-khung) */
  else moHop('<div class="tc-the tc-khung">'+h+'</div>', true);
  slBo(c.ky).then(function(B){
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
function tcMoTo(to){ dongHop(); var C = toCH(), t = TO_K && TO_K.to[to]; C.to = to; if(t){ C.xa = t.xa||''; C.diem = t.khoaDiem; C.hoi = String(t.dv||''); } else { var k = TC_K && TC_K.to[to]; if(k){ C.xa = k.xa||''; C.diem = k.khoaDiem; C.hoi = String(k.dv||''); } } luu(); slDoiTab('to'); }
function slChepKH(ma){
  var c = SL_DB.kh[ma]; if(!c) return; var t = (SL_DB.to||{})[c.to]||{};
  chepChu(['Họ tên: '+(c.ten||''), 'Mã KH: '+ma, 'Ngày sinh: '+ngayVNsl(c.ns), 'CCCD: '+(c.cccd||'')+(c.ncap ? ' — cấp '+ngayVNsl(c.ncap) : '')+(c.noiCap ? ' — '+c.noiCap : ''),
    'Địa chỉ: '+tcDiaChi(c.dc)].concat(c.sdt ? ['SĐT: '+c.sdt] : [], c.voChong ? ['Vợ/chồng: '+c.voChong] : [], slStk(c.stk).length ? ['TK 105: '+slStk(c.stk).join(', ')+(c.t105 ? ' — số dư '+tdnTien(c.t105) : '')] : [],
    (c.toTen||t.ten) ? ['Tổ: '+(c.toTen||t.ten)+(c.dv||t.dv ? ' — '+tdnHoi(c.dv||t.dv) : '')] : []).join('\n'), 'Đã chép thông tin khách hàng.');
}
function tcHaiCot(){ return window.innerWidth>=900 && !!document.getElementById('tc-ct'); }
function tcChonDong(el){ var c = el && el.parentNode; if(c) Array.prototype.forEach.call(c.querySelectorAll('.sl-kq-dong.chon'), function(x){ x.classList.remove('chon'); }); if(el) el.classList.add('chon'); }
/* 3.88: luồng nạp theo THÁNG — chọn tháng → ① file của tháng (trạng thái từng loại) → ② Kiểm tra (kết quả lưu, không chạy lại) → ③ Chốt (sau)
   bảng nhiều tháng giữ nguyên, thu gọn được (D.cauHinh.slTQ) để lấy chỗ cho kết quả kiểm tra */
function slBBE(k, ky){   /* 3.202: file bắt buộc của tháng — Danh sách tổ hệ thống tính bản gần nhất (danh sách, không chốt cuối tháng) */
  var e = SLM.bang[slKhoa(k, ky)]; if(e || k!=='dsto' || typeof dsChonKy!=='function') return e || null;
  var kd = dsChonKy(ky), g = kd && SLM.bang[slKhoa('dsto', kd)]; return g ? Object.assign({}, g, {ngay:'', ngayXuat:'', ganNhat:kd}) : null;
}
var SL_BAT_BUOC = ['hstd','dnct','dsto','bx','bc','lx','lh','lc','lt'];   /* 3.145 (Q16): 9 file cần cho ✓ Đạt */   /* 3.90: Ⓐ 7 file chuẩn TW + Ⓑ Mẫu 31, Thông tin tổ trưởng, KHĐ mẫu 14 (anh chốt) */
function slChonThang(d, v){
  var cu = SL_KY || slKyMoi() || ngayISO(nay()).slice(0,7);
  setTimeout(function(){ if(typeof kyChungDs==='function' && kyChungDs().some(function(x){ return x.ky===SL_KY; }) && D.cauHinh.kyChung!==SL_KY){ D.cauHinh.kyChung = SL_KY; KY_PHIEN.chung = SL_KY; [toCH(), skCH(), ktCH(), thCH()].forEach(function(C){ C.ky = SL_KY; }); luu(); kyChungVe(); } }, 0);   /* 3.150: tháng ma trận = kỳ chung (khi tháng có số liệu) */
  SL_KY = v ? v : kyLui(cu, d); if(!/^\d{4}-\d{2}$/.test(SL_KY)) SL_KY = cu;
  KT_KY_KT = SL_KY;   /* 3.156: kiểm tra KTGS theo tháng đang chọn */
  veSoLieu();
}
/* 3.91: hộp chọn tháng bằng chữ Việt (ô tháng của trình duyệt hiện tiếng Anh) — ✓ có file */
function slChonThangHop(nam){
  var cur = SL_KY || slKyMoi() || ngayISO(nay()).slice(0,7); nam = nam || +cur.slice(0,4);
  var h = '<div class="hop-tit">Chọn tháng số liệu</div><div class="sl-nam"><button class="nho" onclick="slChonThangHop('+(nam-1)+')" title="Năm trước">‹</button><b>Năm '+nam+'</b><button class="nho" onclick="slChonThangHop('+(nam+1)+')" title="Năm sau">›</button></div><div class="sl-luoi-thang">';
  for(var m=1;m<=12;m++){ var k = nam+'-'+hai(m), co = Object.keys(SLM.bang).some(function(x){ return slThang(SLM.bang[x].ky)===k; });
    h += '<button class="'+(k===cur ? 'bat' : (co ? 'co' : ''))+'" onclick="dongHop();slChonThang(0,\''+k+'\')">Tháng '+m+(co ? ' ✓' : '')+'</button>'; }
  moHop(h+'</div><div class="hang-nut"><button class="nho chinh" onclick="dongHop()">Đóng</button></div>');
}
function slMoNhom(n){ var mo = D.cauHinh.slMo = D.cauHinh.slMo || {}; mo[n] = !slNhomMo(n); luu(); veSoLieu(); }
function slNhomMo(n){ var mo = D.cauHinh.slMo || {}; return mo[n]!==undefined ? !!mo[n] : n==='B'; }   /* Ⓚ KTGS mặc định gập */   /* mặc định: Ⓑ sổ ra, nhóm khác thu gọn */
/* chip tóm tắt của 1 nhóm trong 1 tháng (dòng nhóm thu gọn) */
function slChipNhom(N, dsL, k){
  var coThang = Object.keys(SLM.bang).some(function(x){ return slThang(SLM.bang[x].ky)===k; });
  if(N==='C'){ var nd = 0; dsL.forEach(function(L){ nd += slCacNgay(L.k, k).length; }); return nd ? '<span class="sl-chipn du">'+nd+' ngày</span>' : '<span class="sl-chipn">—</span>'; }
  var bb = dsL.filter(function(L){ return N==='A' || N==='B' ? SL_BAT_BUOC.indexOf(L.k)>=0 : true; }), co = bb.filter(function(L){ return slBBE(L.k, k) || (L.ngay && slCacNgay(L.k, k).length); }), n = bb.length;   /* 3.91: loại phụ theo ngày (phân kỳ) */
  if(!co.length && !coThang) return '<span class="sl-chipn">—</span>';
  if(N==='A' || N==='B'){ var thieu = bb.filter(function(L){ return !SLM.bang[slKhoa(L.k, k)]; }).map(function(L){ return L.ten.split(' · ')[0]; });
    return '<span class="sl-chipn '+(thieu.length ? 'thieu' : 'du')+'" title="'+coChuHTML(thieu.length ? 'thiếu: '+thieu.join(', ') : 'đủ')+'">'+co.length+'/'+n+(thieu.length ? '' : ' ✓')+'</span>'; }
  return co.length ? '<span class="sl-chipn co">'+co.length+'/'+n+'</span>' : '<span class="sl-chipn">—</span>';
}
function veSoLieu(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(D.cauHinh.slTab==='gdx') return veGDX();   /* 3.172: 🏢 Giao dịch xã — in nhanh, không cần số liệu (js/26-giao-dich-xa.js) */
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veSoLieu); return; }
  if(!slNapSan.da){ slNapSan.da = 1; setTimeout(slNapSan, 2500); }   /* 3.125: lần đầu vào tab Số liệu → nạp ngầm các tháng */
  slChuyenTruoc();   /* 3.153: bản trước lần thay (3.145) → Thùng rác */
  if(D.cauHinh.slTab==='tra'){ e.innerHTML = slTabConHTML()+slTraHTML(); slTraTim(); tcNap(); return; }   /* 3.89: nạp cây phạm vi + chỉ mục vợ/chồng, HSSV */
  if(D.cauHinh.slTab==='to') return veToTK();   /* 3.88 */
  if(D.cauHinh.slTab==='sk') return veSaoKe();   /* 3.89 */
  if(D.cauHinh.slTab==='th') return veTongHop();   /* 3.90 */
  if(D.cauHinh.slTab==='kt') return veKTGS();   /* 3.93 */
  if(D.cauHinh.slTab==='hst' || D.cauHinh.slTab==='hsv') return veHoSo();   /* 3.170: 📝 Hồ sơ Tổ · 📄 Hồ sơ vay (js/25-ho-so.js) */
  if(D.cauHinh.slTab==='pb' && typeof pbVe==='function') return pbVe();   /* 3.288 P2: 🎯 Phân bổ KH (js/48-phan-bo-gd.js) */
  var ky = slDsKy(), kyXem = SL_KY || slKyMoi() || ngayISO(nay()).slice(0,7), soBang = Object.keys(SLM.bang).length;
  SL_KY = kyXem;
  /* 3.156 (anh chốt): 1 hàng công cụ (1 nút Nạp file cho mọi file kể cả BC0437 / 0438, chuyển tháng 1 chỗ, 🔍 Kiểm tra lại, kiểu ma trận) · 1 dòng trạng thái ·
     ma trận kẻ ô rõ, cột tháng chọn sáng, mặc định tháng chọn + tháng trước + Theo ngày, ⇔ Tổng quan 12 tháng, ▾ thu gọn 1 dòng; ô ✓ khớp / ⚠ chênh sau kiểm tra (tự kiểm ngầm) ·
     kết quả kiểm tra (cả KTGS) 1 dòng bấm mở */
  KT_KY_KT = kyXem;
  var h = slNapThanhHTML(kyXem), mt = slMtKieu(), cots = slCotNap(kyXem, mt);   /* 3.163: bỏ dòng trạng thái vàng — trạng thái ở dấu dải lịch + rê chuột */
  SL_KT_O = {}; cots.forEach(function(c){ if(c.chot) SL_KT_O[c.ky] = slKTO(c.ky); });
  if(mt==='thu') h += slMtThuHTML(kyXem);
  else {
    var lop = function(c){ return (c.chot ? 'sl-cot-chot' : 'sl-cot-ngay')+(c.ky===kyXem || (!c.chot && slThang(c.ky)===kyXem && mt!=='tq') ? ' sl-cot' : ''); };
    var oCot = function(c, html){ return html.replace('<td class="', '<td class="'+lop(c)+' '); };
    h += '<div class="bdc-cuon sl-mt-cuon'+(mt==='tq' ? ' tq' : '')+'"><table class="bdc-bang sl-bang sl-luoi"><thead><tr><th class="bdc-goc">Loại file</th>'+
      cots.map(function(c){
        if(!c.chot) return '<th class="'+lop(c)+'" title="Số liệu ngày '+ngayVNsl(c.ky)+'">'+ngayVNsl(c.ky)+'</th>';
        var g = slDanhGia(c.ky);
        return '<th class="'+lop(c)+(c.ky===kyXem ? ' sl-chon' : '')+(g.dat ? ' dat' : '')+'" onclick="slChonThang(0,\''+c.ky+'\')" title="Chốt tháng '+kyVN(c.ky)+' — bấm để chọn tháng"><b>'+ngayVNsl(tdnCuoiKy(c.ky))+'</b><small>T'+(+c.ky.slice(5))+(c.ky.slice(0, 4)!==String(nay().getFullYear()) ? '/'+c.ky.slice(2, 4) : '')+' · chốt'+(SLM.kt[c.ky] ? (slKTCu(c.ky) ? ' ⟳' : (g.dat ? ' ✓' : '')) : '')+'</small></th>'; }).join('')+'</tr></thead><tbody>';
    SL_NHOM.forEach(function(N){   /* 3.91: mỗi nhóm 1 dòng đầu bấm sổ / gọn; thu gọn thì ô là chip tóm tắt; loại đã bỏ chỉ hiện khi còn dữ liệu */
      var dsL = SL_LOAI.filter(function(L){ return L.nhom===N.k && !L.an && (!L.bo || slCoDL(L.k)); }), mo = slNhomMo(N.k);   /* 3.202: ma trận chỉ còn 1 dòng về tổ (Danh sách tổ) */ if(!dsL.length) return;
      h += '<tr class="sl-nh-dong'+(mo ? ' mo' : '')+'" onclick="slMoNhom(\''+N.k+'\')" title="Bấm để '+(mo ? 'thu gọn' : 'sổ ra')+'"><td class="bdc-ten"><span class="sl-nh '+N.k+'">'+(N.k==='X' ? '×' : N.k)+'</span>'+coChuHTML(N.ten.split(' · ')[0].replace(/^[ⒶⒷⒸⒹⓀ] /, ''))+'</td>'+
        cots.map(function(c){ return oCot(c, '<td class="sl-nh-o">'+(mo ? '' : c.chot ? slChipNhom(N.k, dsL, c.ky) : slChipNgayO(dsL, c.ky))+'</td>'); }).join('')+'</tr>';
      if(mo) dsL.forEach(function(L){ var ten = slTenNgan(L);
        h += '<tr><td class="bdc-ten sl-con-ten'+(ten.length>22 ? ' dai' : '')+'" title="'+coChuHTML(L.ten+' — '+N.ten)+'">'+coChuHTML(ten)+'</td>'+cots.map(function(c){ return oCot(c, c.chot ? slOMT(L, c.ky) : slONgayO(L, c.ky)); }).join('')+'</tr>'; });
    });
    h += '</tbody></table></div>';
  }
  var kt = slCoFileChinh(kyXem) ? SLM.kt[kyXem] : null, kg = SLM.ktg && SLM.ktg[kyXem], coKT = !!(SLM.bang[slKhoa('k37', kyXem)] || SLM.bang[slKhoa('k38', kyXem)]);
  var tom = !slCoFileChinh(kyXem) ? 'chưa có file để kiểm' : !kt ? 'đang chờ kiểm…' : slKTCu(kyXem) ? '⟳ đang kiểm lại…' :
    (slDanhGia(kyXem).dat ? '✅ Đạt' : 'chưa Đạt')+' · '+kt.dem.ok+' khớp'+(kt.dem.lech ? ' · '+kt.dem.lech+' chênh lệch' : '')+(kt.dem.canh ? ' · '+kt.dem.canh+' lưu ý' : '');
  if(coKT) tom += ' · KTGS: '+(!kg ? 'đang chờ kiểm…' : ktKTCu(kyXem) ? '⟳ đang kiểm lại…' : (kg.dem.k ? kg.dem.k+' mục lệch' : '✓ khớp'));
  h += '<details class="sl-kq" id="sl-kq"'+(D.cauHinh.slKqMo ? ' open' : '')+' ontoggle="D.cauHinh.slKqMo=this.open;luu()"><summary>🔍 Kết quả kiểm tra '+kyVN(kyXem)+': <small>'+tom+'</small></summary><div id="sl-kt">'+slKTHTML(kyXem)+'</div>'+
    (coKT ? '<div class="nhan-nhom">Ⓚ KTGS · BC0437 / BC0438</div><div class="kt-kt">'+ktKTHTML(kyXem)+'</div>' : '')+'</details>';
  if(typeof tkKhoiHTML==='function') h += tkKhoiHTML();   /* 3.201: bỏ 📚 danh mục tổ — nguồn TK 104 / 105 + nút TK cần đóng */
  if(!soBang) h += '<div class="rong">Chưa có số liệu. Bấm <b>📥 Nạp file</b> (chọn nhiều file Excel cùng lúc, kể cả BC0437 / BC0438) hoặc bấm ô trống trên ma trận · xem <b>📋 File cần xuất</b>.</div>';
  e.innerHTML = h;
  slHenKiem(kyXem);
  var cuon = e.querySelector('.bdc-cuon'); if(cuon) cuon.scrollLeft = cuon.scrollWidth;   /* điện thoại: thấy ngay kỳ mới nhất */
}

/* ---------- 3.150: tab Nạp & KT gọn ---------- */
function slNapThanhHTML(kyXem){   /* 3.156: ‹ T7 · T8/2026 ▾ · T9 › · 📥 Nạp file · 🔍 Kiểm tra lại · 📋 File cần xuất · [▾ Thu gọn][2 tháng][⇔ Tổng quan] · ☁ · ⋯ · ❓ */
  var cho = Object.keys(SLM.bang).filter(function(k){ return SLM.bang[k].choDay; }).length, tr = kyLui(kyXem, -1), sau = kyLui(kyXem, 1), mt = slMtKieu();
  var ngan = function(k){ return 'T'+(+k.slice(5, 7)); }, kieu = function(v, chu, tit){ return '<button class="sl-mt-k'+(mt===v ? ' bat' : '')+'" onclick="slDatMt(\''+v+'\')" title="'+tit+'">'+chu+'</button>'; };
  return '<div class="sl-con-nap sl-thanh-nap">'+
    slDaiLich(kyXem)+
    '<button class="nho chinh" onclick="slNapBo()" title="Chọn nhiều file Excel một lần (Mẫu 31, Danh sách tổ, file TW, KHĐ… và BC0437 / BC0438 của KTGS; 1 hay nhiều tháng) — app tự nhận loại và kỳ, xem trước rồi mới ghi nhận">📥 Nạp file</button>'+
    (slCoFileChinh(kyXem) ? '<button class="nho sl-kt-nut" onclick="slKiemTra(\''+kyXem+'\')" title="App tự kiểm sau mỗi lần nạp / xóa / thay file — bấm để kiểm lại cho chắc">🔍 Kiểm tra lại</button>' : '')+
    '<button class="nho" onclick="slFileXuat(\''+kyXem+'\')" title="Danh sách file cần xuất hằng tháng, mẫu cần chọn khi xuất, ✓ file tháng đang xem đã có">📋 File cần xuất</button>'+
    '<span class="sl-mt-nhom"><button class="sl-mt-k'+(mt==='tq' ? ' bat' : '')+'" onclick="slTongQuan()" title="'+(mt==='tq' ? 'Bấm để về kiểu xem theo ngày' : 'Chỉ cột chốt tháng của mọi tháng có số liệu')+'">⇔ Tổng quan</button>'+
      '<button class="sl-mt-k'+(mt==='thu' ? ' bat' : '')+'" onclick="slThuGon()" title="'+(mt==='thu' ? 'Mở lại ma trận' : 'Thu ma trận còn 1 dòng tóm tắt')+'">'+(mt==='thu' ? '▴ Bung ra' : '▾ Thu gọn')+'</button></span>'+
    '<span class="sl-gian"></span>'+(cho ? '<span class="sl-db" title="Ô số liệu chưa lên Drive">☁ '+cho+' chờ</span>' : '')+
    '<button class="nho" onclick="slNapThem(\''+kyXem+'\')" title="Tải file gốc cả tháng · Xóa cả bộ tháng · Xóa ngày cũ · Làm sạch & nạp lại · Giữ sẵn · Tóm tắt file · Tìm rác">⋯</button>'+
    '<button class="nho" onclick="slNapHoi()" title="Giải thích tab Nạp & KT">❓</button></div>';
}
/* ma trận thu gọn: 1 dòng tóm tắt tháng đang chọn — bấm để mở */
function slMtThuHTML(k){
  var dsN = SL_NHOM.filter(function(N){ return N.k!=='X'; }).map(function(N){ var dsL = SL_LOAI.filter(function(L){ return L.nhom===N.k && !L.bo && !L.an; }); return dsL.length ? '<span class="sl-nh '+N.k+'">'+N.k+'</span>'+slChipNhom(N.k, dsL, k) : ''; }).filter(Boolean);
  return '<div class="sl-mt-thu" onclick="slThuGon()" title="Bấm để mở ma trận"><b>'+kyVN(k)+'</b> '+dsN.join(' ')+' <span class="sl-phu">▸ mở ma trận</span></div>';
}
/* 3.156: dấu trên ô sau kiểm tra — mỗi mục kiểm tra gắn với file có tên trong mục; mọi mục liên quan khớp → ✓, có chênh → ⚠ */
var SL_KT_O = {};
var SL_KT_KHOP = {hstd:['mau 31'], dnct:['du no chi tiet'], dsto:['dsto', 'danh sach to'], bx:['01 1'], bc:['01 2'], lx:['xapuong'], lh:['donviut'], lc:['chtrinh'], lt:['len 31 to truong'],
  tt:['thong tin to truong'], khd:['khd', 'khong hoat dong', 'mau 14'], nqh:['qua han'], nk:['khoanh'], tdn:['tong du no'], pk:['phan ky']};
function slKTO(ky){
  var k = SLM.kt[ky], r = {}; if(!k || slKTCu(ky)) return r;
  (k.kq||[]).forEach(function(x){ if(x.nhom===1 || x.nhom===2 || x.kq==='bo' || x.kq==='canh') return; var t = ' '+slChuan(x.ten+' '+(x.chu||''))+' ';
    Object.keys(SL_KT_KHOP).forEach(function(l){ if(!SL_KT_KHOP[l].some(function(w){ return t.indexOf(' '+w+' ')>=0; })) return;
      var o = r[l] = r[l] || {ok:0, lech:[]}; if(x.kq==='lech') o.lech.push(x.ten+(x.chu ? ': '+x.chu : '')); else o.ok++; }); });
  var g = SLM.ktg && SLM.ktg[ky];
  if(g && !ktKTCu(ky)) ['k37', 'k38'].forEach(function(l){ var o = r[l] = {ok:0, lech:[]}; (g.muc||[]).forEach(function(m){ if(m.tt==='k') o.lech.push(m.ten+(m.ghi ? ': '+m.ghi : '')); else if(m.tt==='c') o.ok++; }); });
  return r;
}
function slDauO(l, ky){
  var o = (SL_KT_O[ky]||{})[l]; if(!o || (!o.ok && !o.lech.length)) return '';
  return o.lech.length ? '<i class="sl-dau lech" onclick="event.stopPropagation();slKTToi(\''+l+'\')" title="'+coChuHTML('⚠ Chênh lệch (chỉ ghi nhận):\n'+o.lech.slice(0, 6).join('\n')+'\n— bấm để xem ở Kết quả kiểm tra')+'">⚠</i>' : '<i class="sl-dau ok" title="✓ Khớp với các file khác ('+o.ok+' mục)">✓</i>';   /* 3.165: bấm ⚠ → nhảy tới dòng file */
}
/* 3.156 (anh chốt): tự kiểm ngầm — tháng vừa đổi số liệu (nạp / xóa / thay / khôi phục / kéo từ Drive) + tháng đang xem chưa kiểm hoặc đã đổi */
var SL_KT_CHO = {}, SL_KT_HEN = null, SL_KT_DANG = false;
function slHenKiem(ky){
  if(ky) SL_KT_CHO[slThang(ky)] = 1;
  clearTimeout(SL_KT_HEN); SL_KT_HEN = setTimeout(slTuKiem, 1500);
}
function slTuKiem(){
  if(SL_KT_DANG || window.SL_KHONG_TU_KIEM) return;
  var ds = Object.keys(SL_KT_CHO).sort(); SL_KT_CHO = {};
  var can = ds.filter(function(k){ return (slCoFileChinh(k) && (!SLM.kt[k] || slKTCu(k))) || ((SLM.bang[slKhoa('k37', k)] || SLM.bang[slKhoa('k38', k)]) && (!(SLM.ktg && SLM.ktg[k]) || ktKTCu(k))); });
  if(!can.length) return;
  SL_KT_DANG = true;
  can.reduce(function(p, k){ return p.then(function(){
    if(slCoFileChinh(k) && (!SLM.kt[k] || slKTCu(k))) return slKiemTra(k, true);
    return ktKiemTra(k, true); }); }, Promise.resolve())
    .catch(function(){}).then(function(){ SL_KT_DANG = false; if(Object.keys(SL_KT_CHO).length) slHenKiem(); });
}
function slKqMo(){ var d = document.getElementById('sl-kq'); if(d){ d.open = true; d.scrollIntoView({behavior:'smooth', block:'start'}); } }
function slNapThem(ky){   /* ⋯ việc phụ của tab Nạp & KT */
  var coFile = Object.keys(SLM.bang).some(function(k){ return slThang(SLM.bang[k].ky)===ky; }), soBang = Object.keys(SLM.bang).length;
  moHop('<div class="hop-tit">⋯ Nạp &amp; KT · '+kyVN(ky)+'</div><div class="sl-them-ds">'+
    (coFile ? '<button class="nho" onclick="dongHop();slTaiGocThang(\''+ky+'\')">⬇ Tải file gốc cả tháng</button><button class="nho" onclick="dongHop();slXoaThang(\''+ky+'\')">🗑 Xóa cả bộ tháng '+kyVN(ky)+'</button>' : '')+
    (slDsNgay().length>1 ? '<button class="nho" onclick="dongHop();slXoaNgayCu()">🗑 Xóa bản theo ngày cũ (giữ ngày mới nhất)</button>' : '')+
    (soBang ? '<button class="nho" onclick="dongHop();slTomTatXem(\''+ky+'\')">📄 Tóm tắt chi tiết các file '+kyVN(ky)+'</button>' : '')+
    '<button class="nho" onclick="dongHop();slNapLai()">🧹 Làm sạch &amp; nạp lại (dựng lại từ file đã lưu)</button>'+
    (laDT() ? '' : '<label class="sl-giu">⚡ Giữ sẵn <select onchange="D.cauHinh.slGiu=this.value;luu();slNapSan()"><option value="12"'+(D.cauHinh.slGiu==='all' ? '' : ' selected')+'>12 tháng</option><option value="all"'+(D.cauHinh.slGiu==='all' ? ' selected' : '')+'>tất cả</option></select> <small id="sl-giu-ds">'+coChuHTML(slGiuChu())+'</small></label>')+
    '<button class="nho" onclick="dongHop();slTimRac()">🧹 Tìm file rác của Số liệu</button>'+
    (soBang ? '<button class="nho xau" onclick="dongHop();slLamMoi()">♻ Làm mới toàn bộ số liệu</button>' : '')+
    '</div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>');
}
function slTomTatXem(ky){ batChay(true, 'Đang mở tóm tắt '+kyVN(ky)+'…'); slBo(ky).then(function(B){ tatChay(); moHop('<div class="hop-tit">📄 Tóm tắt các file '+kyVN(ky)+'</div><div class="sl-ky">'+slKyHTML(B)+'</div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>', true); }).catch(function(er){ tatChay(); baoLoi('Chưa mở được: '+(er && er.message || er)); }); }
function slNapHoi(){
  moHop('<div class="hop-tit">❓ Nạp &amp; Kiểm tra dữ liệu</div><div class="hd-chu">'+
    '<p>Nơi duy nhất nạp file Excel hệ thống (Mẫu 31, Dư nợ chi tiết, Danh sách tổ, file TW, KHĐ, quá hạn, khoanh… và BC0437 / BC0438 của KTGS) — các tab khác chỉ đọc. Excel chỉ đọc 1 lần lúc nạp.</p>'+
    '<p><b>Ma trận:</b> mỗi ô = số chính + mũi tên so tháng trước (dư nợ tăng ▲ xanh; quá hạn / khoanh / KHĐ tăng ▲ đỏ; tổ chỉ số tổ). Bấm ô trống: nạp đúng ô; ô có file: hỏi thay (file cũ vào 🗑 Thùng rác, khôi phục được). Ⓑ bắt buộc · Ⓐ chuẩn TW · Ⓓ phụ. Cột 📅 Theo ngày: bản số liệu giữa tháng.</p>'+
    '<p><b>Kiểm tra kỳ:</b> ✓ Đạt khi đủ '+SL_BAT_BUOC.length+' file (Ⓑ 3 + Ⓐ 6), đúng kỳ, đúng cấu trúc. Chênh lệch giữa các file chỉ ghi nhận để biết — không ảnh hưởng Đạt, không sửa số. Rê chuột lên dòng trạng thái: báo cáo nào dùng được, thiếu file gì.</p>'+
    '<p><b>3.156:</b> app <b>tự kiểm tra ngầm</b> sau mỗi lần nạp / xóa / thay / khôi phục file (cả BC0437 / BC0438); muốn chắc thì bấm <b>🔍 Kiểm tra lại</b>. Ô có dấu <b style="color:#1b7f3b">✓</b> = khớp với các file khác, <b style="color:var(--vang)">⚠</b> = có chênh lệch (rê chuột xem). Kết quả chi tiết: dòng 🔍 dưới ma trận, bấm mở.</p>'+
    '<p><b>Kiểu ma trận:</b> ▾ Thu gọn (1 dòng) · 2 tháng (tháng chọn + tháng trước + Theo ngày) · ⇔ Tổng quan (12 tháng). Chuyển tháng: ‹ T7 · T8/2026 ▾ · T9 › trên hàng nút hoặc bấm tên cột tháng — cột đang chọn sáng lên. Ⓚ KTGS: BC0437 / BC0438, nạp chung nút 📥 Nạp file.</p>'+
    '<p>Báo cáo ở tab <b>Số liệu</b>: Tổng hợp, Sao kê, Tổ TK&amp;VV, KTGS Hội, Tra cứu KH.</p></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button></div>');
}
/* 3.136 (anh chốt): cột 📅 Theo ngày — mọi bản theo ngày (loại tùy kỳ), xóa ngày cũ cho nhẹ máy */
function slDsNgay(loai){ return Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).filter(function(e){ var L = slLoai(e.loai); return L && L.tuy && !L.ngay && String(e.ky).length>7 && (!loai || e.loai===loai); })
  .sort(function(a, b){ return a.ky<b.ky ? -1 : a.ky>b.ky ? 1 : 0; }); }
function slNgayMoi(){ var ds = slDsNgay(); return ds.length ? ds[ds.length-1].ky : ''; }
function slXoaNgayCu(giu){
  var moi = giu || slNgayMoi(), ds = slDsNgay().filter(function(e){ return e.ky!==moi ; });
  if(!ds.length) return bao('Không còn bản theo ngày cũ.', 3);
  hoi('Xóa '+ds.length+' bản theo ngày cũ, giữ ngày '+ngayVNsl(moi)+'?', ds.map(function(e){ return slLoai(e.loai).ten.split(' · ')[0]+' '+ngayVNsl(e.ky); }).join(' · ')+'. Bản cuối tháng không bị đụng. Các bản xóa vào 🗑 Thùng rác (ngăn Số liệu) — khôi phục được trong 30 ngày.', 'Xóa', function(){
    batChay(true, 'Đang xóa '+ds.length+' bản theo ngày cũ…'); var ids = [];
    slXoaVaoRac(ds.map(function(e){ return slKhoa(e.loai, e.ky); }), 'Xóa bản theo ngày cũ').then(function(r){ ids = r; return slDungDanhBa(); }).then(slLuuMeta).then(function(){
      tatChay(); if(coTheNoiDrive() && DR.sanSang) ids.forEach(function(id){ xoaFileDrive(id).catch(function(){}); });
      bao('Đã xóa '+ds.length+' bản theo ngày cũ — còn ngày '+ngayVNsl(moi)+'.', 4); if(nganHienTai===7) veSoLieu();
    }).catch(function(er){ tatChay(); baoLoi('Xóa lỗi: '+(er && er.message || er)); });
  });
}
function slSauNap(ds){   /* sau khi ghi nhận: nạp ngày mới mà còn ngày cũ → hỏi xóa; dựng sẵn bộ số liệu mới nhất */
  var moiNgay = ds.filter(function(kq){ return String(kq.ky).length>7 && slTuy(kq.loai) && !slLoai(kq.loai).ngay; }).map(function(kq){ return kq.ky; }).sort().pop();
  if(moiNgay && moiNgay===slNgayMoi() && slDsNgay().some(function(e){ return e.ky<moiNgay; })) setTimeout(function(){ slXoaNgayCu(moiNgay); }, 300);
  setTimeout(function(){ slNapSan(true); }, 600);
}
/* 3.163: ô / chip của cột ngày */
function slONgayO(L, d){
  var x = SLM.bang[slKhoa(L.k, d)];
  if(!x) return L.bo ? '<td class="bdc-o sl-o"></td>' : '<td class="bdc-o sl-o sl-o-nt" onclick="slNapMot(\''+L.k+'\',\''+d+'\')" title="Nạp '+coChuHTML(L.ten)+' ngày '+ngayVNsl(d)+'">+</td>';
  if(L.ngay) return '<td class="bdc-o sl-o du" onclick="slMoO(\''+L.k+'\',\''+d+'\')" title="'+coChuHTML(L.ten+' · ngày '+ngayVNsl(d)+' · '+(x.tenFile||''))+'">✓</td>';
  return slOMT(L, d);
}
function slChipNgayO(dsL, d){ var co = dsL.filter(function(L){ return SLM.bang[slKhoa(L.k, d)]; }).length; return co ? '<span class="sl-chipn du">'+co+' file</span>' : '<span class="sl-chipn">—</span>'; }
/* 3.90: 1 ô của ma trận nhiều tháng */
function slOMT(L, k){
  if(L.ngay){   /* 3.87: loại theo ngày — ô tháng gom các ngày đã nạp */
    var ngs = slCacNgay(L.k, k), m = ngs[ngs.length-1];
    if(m) return '<td class="bdc-o sl-o du'+(ngs.some(function(e){ return e.choDay; })?' cho':'')+'" onclick="slMoNgay(\''+L.k+'\',\''+k+'\')" title="'+ngs.length+' ngày đã nạp · mới nhất '+ngayVNsl(m.ky)+'">'+(ngs.some(function(e){ return e.kiemNgay; }) ? '⚠' : '✓')+
      '<small>'+ngs.length+' ngày · '+m.ky.slice(8)+'/'+m.ky.slice(5,7)+'</small></td>';
  } else {
    var x = SLM.bang[slKhoa(L.k, k)], nd = [], them = '';   /* 3.136: bản theo ngày → cột 📅 Theo ngày */
    if(x){ var c = slChinh(L, x.tong), mt = slMuiTen(L, k, c);   /* 3.145 (anh chốt): ô = số chính + mũi tên so kỳ trước; bấm ô = nạp / hỏi thay */
      return '<td class="bdc-o sl-o du'+(x.choDay?' cho':'')+'" onclick="slOBam(\''+L.k+'\',\''+k+'\')" title="'+coChuHTML(slTomTat(L.k, x.tong)+(mt.chu ? ' · '+mt.chu : '')+' · '+(x.tenFile||'')+' · kỳ theo '+(x.nguonKy||'')+(x.choDay?' · chờ lên Drive':'')+' — bấm để thay file / xem')+'">'+
        slDauO(L.k, k)+(k.length===7 && x.ngay && x.ngay!==tdnCuoiKy(k) ? '<i class="sl-dau lech" title="Ngày số liệu trong file '+ngayVNsl(x.ngay)+' — không phải cuối tháng">⚠</i>' : '')+'<span class="sl-o-so">'+coChuHTML(c.chu)+'</span>'+(mt.html ? '<small>'+mt.html+'</small>' : '')+'</td>'; }
    if(nd.length) return '<td class="bdc-o sl-o du" onclick="slMoNgay(\''+L.k+'\',\''+k+'\')" title="Chưa có bản cuối tháng · '+nd.length+' bản theo ngày">◐<small>'+nd.length+' ngày</small></td>';
  }
  if(L.bo) return '<td class="bdc-o sl-o"></td>';
  var cu = slMucCu(L.k, k);
  return cu ? '<td class="bdc-o sl-o cu" onclick="slDocMucCu(\''+cu.id+'\',\''+L.k+'\',\''+k+'\')" title="Có file nạp ở tab Tháng trước đây — bấm để đọc vào Số liệu">📄<small>đọc file cũ</small></td>'
            : '<td class="bdc-o sl-o" onclick="slNapMot(\''+L.k+'\',\''+k+'\')" title="Nạp '+coChuHTML(L.ten)+' '+kyVN(k)+'">+</td>';
}
function slKyHTML(B){
  var ky = B.ky, h = '<div class="nhan-nhom">Tóm tắt các file tháng '+kyVN(ky)+'</div><div class="sl-tom">';
  SL_LOAI.forEach(function(L){
    var e = !L.ngay && SLM.bang[slKhoa(L.k, ky)]; if(e) h += slTomDong(L, e);
    if(L.ngay || L.tuy) slCacNgay(L.k, ky).forEach(function(x){ h += slTomDong(L, x); });   /* 3.87 / 3.90: bản theo ngày — mỗi ngày một dòng */
  });
  h += '</div>';
  h += slDanhMucHTML(B);   /* 3.88: đối chiếu chuyển vào ② Kiểm tra (bấm nút, kết quả lưu) */
  return h;
}
var SL_BO_CHU = {trong:'trống', tieuDe:'tiêu đề lặp', tong:'dòng tổng', ky:'phần ký', sai:'sai mã', trung:'dòng lặp khế ước (nhiều sổ 105, giữ riêng)'};
function slTomDong(L, e){
    var t = e.tong||{}, ct = [];
    if(L.k==='dsto' || L.k==='tt') ct.push((e.soDong||0)+' tổ');   /* 3.122: danh sách tổ báo số tổ */
    if(t.dn!==undefined) ct.push('dư nợ '+tdnTien(t.dn));
    if(t.qh) ct.push('quá hạn '+tdnTien(t.qh));
    if(t.kn) ct.push('khoanh '+tdnTien(t.kn));
    if(t.kh) ct.push(t.kh+' KH');
    if(t.skh) ct.push('Số KH (cộng theo CT) '+tdnTien(t.skh));
    if(t.moi) ct.push(t.moi+' món mới chuyển QH ('+tdnTien(t.cqh)+')');
    if(t.stv) ct.push(t.stv+' tổ viên');
    if(t.t105) ct.push('TK 105 '+tdnTien(t.t105));
    if(t.khNhieuSo) ct.push(t.khNhieuSo+' KH có từ 2 sổ 105');
    if(t.tw){   /* 3.90: file chuẩn TW */
      if(t.cvT!==undefined) ct.push('cho vay tháng '+tdnTien(t.cvT)+' · thu nợ tháng '+tdnTien(t.tnT)+' · '+tdnTien(t.khDn)+' KH dư nợ');
      else if(t.cv!==undefined) ct.push('cho vay '+tdnTien(t.cv)+' · thu nợ '+tdnTien(t.tn)+(t.ho ? ' · '+tdnTien(t.ho)+' hộ' : '')+(t.tg ? ' · tiền gửi '+tdnTien(t.tg) : ''));
    }
    if(L.bo) ct.unshift('⛔ loại đã bỏ — chỉ còn để xem / xóa');
    if(slLaHS(L.k) && e.bo && e.bo.trung && !e.ban) ct.push('⚠ nạp ở bản cũ: dòng lặp đã bị gộp, số dư 105 của các khách nhiều sổ có thể cộng thừa — nạp lại file để tính đúng');
    if(t.mon!==undefined && (slLaHS(L.k) || L.k==='dnct')) ct.unshift((t.mon-(t.tatToan||0))+' món đang vay'+(t.tatToan ? ' · '+t.tatToan+' món đã tất toán' : '')+(t.chiTK ? ' · '+t.chiTK+' KH chỉ gửi tiết kiệm' : ''));
    if(t.gnT!==undefined) ct.push('giải ngân tháng '+tdnTien(t.gnT)+' ('+(t.monGN||0)+' món) · thu nợ tháng '+tdnTien((t.tnTH||0)+(t.tnQH||0)+(t.tnK||0)));
    var bo = e.bo||{}, boChu = ['trong','tieuDe','tong','ky','sai'].filter(function(k){ return bo[k]; }).map(function(k){ return bo[k]+' '+SL_BO_CHU[k]; }).join(', ');
    var lapChu = bo.trung ? bo.trung+' '+(e.ban ? SL_BO_CHU.trung : 'dòng lặp khế ước (bản cũ đã gộp)') : '';
    return '<div class="sl-tom-dong"><b>'+coChuHTML(L.ten)+'</b> <span>'+e.soDong+' dòng'+(boChu ? ' · bỏ '+boChu : '')+(lapChu ? ' · '+lapChu : '')+'</span><small>'+ct.join(' · ')+' · '+(L.ngay || String(e.ky).length>7 ? '<b>số liệu ngày '+ngayVNsl(e.ngay)+'</b>' : 'ngày '+ngayVNsl(e.ngay))+' (theo '+coChuHTML(e.nguonKy||'')+')'+
      (e.ngayXuat ? ' · xuất '+ngayVNsl(e.ngayXuat)+' (sau ngày số liệu)' : '')+(e.ngayLap ? ' · lập biểu '+ngayVNsl(e.ngayLap) : '')+(e.donVi==='triệu đồng' ? ' · biểu tính triệu đồng (app lưu ra đồng)' : '')+(e.kiemNgay ? ' · ⚠ ngày cần anh kiểm' : '')+'</small></div>';
}
/* ---------- 3.88: ① FILE THÁNG · ② KIỂM TRA (kết quả lưu theo tháng, dữ liệu đổi thì báo kiểm lại) ---------- */
/* 3.90.1: ① tình trạng tháng gọn 1 dòng — Ⓐ x/7 · Ⓑ y/3 · tên file thiếu (bấm để nạp) · tình trạng kiểm tra · tải file gốc / xóa cả tháng */
/* 3.145 (anh yêu cầu ghi nhớ): file cần xuất hằng tháng — như docs/FILE_XUAT_HANG_THANG.md */
var SL_FILE_XUAT = [
  ['B', 'hstd', 'Mẫu 31', '31 – Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu (175 cột)', 'Ho_so_tin_dung_chi_tiet_…'],
  ['B', 'dnct', 'Dư nợ chi tiết', 'Dư nợ chi tiết (169 cột, có cột Ngày số liệu)', '004820_DU_NO__CHI_tiet_DEN_dd-mm-yyyy_'],
  ['B', 'dsto', 'Danh sách tổ', 'Danh sách tổ TK&VV (hệ thống) — có Ngày báo cáo, tổ trưởng, CCCD, ngày cấp, TK 104, điểm GD · thay DSTO cũ và Thông tin tổ trưởng', 'baocao_yyyymmdd_hhmmss'],
  ['A', 'bx', 'BCDHTD 01.1', '01.1/BCTD — theo xã', '4820_BCDHTD_01.1_ddmmyyyy_…'],
  ['A', 'bc', 'BCDHTD 01.2', '01.2/BCTD — theo chương trình', '4820_BCDHTD_01.2_ddmmyyyy_…'],
  ['A', 'lx', 'LEN_31 XAPUONG', 'Tổng hợp số liệu tín dụng — theo xã', '4820_LEN_31_XAPUONG_…'],
  ['A', 'lh', 'LEN_31 DONVIUT', '— theo Hội', '4820_LEN_31_DONVIUT_…'],
  ['A', 'lc', 'LEN_31 CHTRINH', '— theo chương trình', '4820_LEN_31_CHTRINH_…'],
  ['A', 'lt', 'LEN_31 TO_TRUONG', '— theo tổ trưởng', '4820_LEN_31_TO_TRUONG_…'],
  ['D', 'khd', 'Món vay 3 tháng KHĐ', 'MẪU 14 – Sao kê món vay N tháng không hoạt động (DL Tháng) · không dùng mẫu 08/KTNB', 'app tự tính từ Mẫu 31; file để đối chiếu'],
  ['D', 'nqh', 'Nợ quá hạn', 'sao kê theo PGD', ''],
  ['D', 'nk', 'Nợ khoanh', 'sao kê theo PGD (có ngày hết hạn khoanh)', ''],
  ['D', 'tdn', 'Tổng dư nợ theo CT', '', ''],
  ['D', 'tt', 'Thông tin tổ trưởng', '12. Thông tin tổ trưởng', 'không cần xuất nữa (Danh sách tổ hệ thống thay) — giữ để tra soát tháng cũ'],
  ['K', 'k37', 'BC0437', 'Thông tin tổ TK&VV do HĐT quản lý', 'chỉ khi làm KTGS'],
  ['K', 'k38', 'BC0438', 'Thông tin ủy thác theo xã · hội', 'chỉ khi làm KTGS']];
function slFileXuat(ky){
  var ten = {B:'Ⓑ Bắt buộc — nguồn dữ liệu', A:'Ⓐ Đối chiếu chuẩn TW', D:'Ⓓ Phụ — có thì đối chiếu thêm', K:'Riêng KTGS'}, nhom = '', h = '';
  SL_FILE_XUAT.forEach(function(r){
    if(r[0]!==nhom){ nhom = r[0]; h += '<tr class="sl-fx-nhom"><td colspan="4">'+ten[nhom]+'</td></tr>'; }
    var co = !!SLM.bang[slKhoa(r[1], ky)] || (slLoai(r[1]) && slLoai(r[1]).ngay && slCacNgay(r[1], ky).length);
    h += '<tr><td class="c">'+(co ? '<b class="xanh">✓</b>' : '<span class="sl-phu">—</span>')+'</td><td><b>'+coChuHTML(r[2])+'</b></td><td>'+coChuHTML(r[3])+'</td><td class="sl-phu">'+coChuHTML(r[4])+'</td></tr>';
  });
  var du = SL_BAT_BUOC.filter(function(k){ return slBBE(k, ky); }).length;
  moHop('<div class="hop-tit">📋 File cần xuất hằng tháng</div><div class="hop-phu">Xuất <b>ngày cuối tháng</b>. ✓ = tháng '+kyVN(ky)+' đã có · đủ <b>'+du+'/'+SL_BAT_BUOC.length+'</b> file Ⓑ + Ⓐ (đủ 9 file thì Kiểm tra kỳ báo Đạt). Không cần xuất nữa: B32 · Mẫu 10 · Mẫu 7 · Sao kê khách hàng · KHĐ mẫu 08/KTNB.</div>'+
    '<div class="bdc-cuon"><table class="sl-fx"><thead><tr><th></th><th>File</th><th>Chọn mẫu khi xuất</th><th>Ghi chú / tên file thường gặp</th></tr></thead><tbody>'+h+'</tbody></table></div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button></div>', true);
}
/* 3.145: số chính của ô ma trận — nguoc: tăng là xấu (quá hạn, khoanh, KHĐ); khongMui: số tổ không cần mũi tên */
function slChinh(L, t){ t = t||{}; var k = L.k;
  if(k==='lt' || k==='tt' || k==='dsto') return {chu:slNgan(L, t), khongMui:true};
  if(k==='khd') return {chu:(t.n||0)+' món', so:t.n||0, nguoc:true, mon:true};
  if(k==='nqh') return {chu:(t.n||0)+' món · '+tdnTr(t.qh||0), so:t.qh||0, nguoc:true};
  if(k==='nk') return {chu:(t.n||0)+' món · '+tdnTr(t.kn||0), so:t.kn||0, nguoc:true};
  if(t.dn!==undefined) return {chu:tdnTr(t.dn), so:t.dn};
  return {chu:slNgan(L, t), khongMui:true};
}
function slMuiTen(L, k, c){   /* 3.163: so với bản liền trước cùng loại (ngày hoặc chốt tháng) — ghi rõ "so với dd/mm/yyyy" */
  if(c.khongMui || c.so===undefined) return {};
  var tr = null, mk = slThuTu(k); Object.keys(SLM.bang).forEach(function(x){ var e = SLM.bang[x]; if(e.loai!==L.k || !e.tong || slThuTu(e.ky)>=mk) return; if(!tr || slThuTu(e.ky)>slThuTu(tr.ky)) tr = e; });
  if(!tr || (String(k).length===7 && slThang(tr.ky)<kyLui(k, -1))) return {};   /* tháng: chỉ so trong tháng này hoặc tháng liền trước */
  var p = slChinh(L, tr.tong); if(p.so===undefined) return {};
  var ngTr = ngayVNsl(tr.ngay || (String(tr.ky).length>7 ? tr.ky : tdnCuoiKy(tr.ky)));
  var d = c.so-p.so, ma = c.mon ? Math.abs(d)+' món' : tdnTr(Math.abs(d)), tot = (d>0)!==!!c.nguoc;
  if(Math.abs(d)<0.5) return {html:'<span class="sl-mt bang">= '+ngTr.slice(0, 5)+'</span>', chu:'bằng số so với '+ngTr};
  return {html:'<span class="sl-mt '+(tot ? 'xanh' : 'do')+'">'+(d>0 ? '▲' : '▼')+' '+ma+'</span>', chu:(d>0 ? 'tăng ' : 'giảm ')+ma+' so với '+ngTr};
}
/* 3.145 (anh chốt): bấm ô đã có file → hỏi thay trước; nút nhỏ xem / tải / xóa / hoàn tác */
function slOBam(loai, ky){
  var e = SLM.bang[slKhoa(loai, ky)]; if(!e) return slNapMot(loai, ky);
  var L = slLoai(loai); if(L.bo) return slMoO(loai, ky);
  var a = '\''+loai+'\',\''+ky+'\'';
  moHop('<div class="hop-tit">'+coChuHTML(L.ten)+' · '+slKyChu(ky)+'</div>'+
    '<div class="hop-phu">Ô này đã có file <b>'+coChuHTML(e.tenFile||'')+'</b> · '+coChuHTML(slTomTat(loai, e.tong))+' · nạp '+ngayVNsl(String(e.luc||'').slice(0, 10))+(e.khoiPhuc ? ' (khôi phục từ Thùng rác)' : '')+'</div>'+
    '<div class="sl-bao vang"><b>Thay bằng file mới?</b> File cũ vào 🗑 Thùng rác (ngăn Số liệu) — cần thì khôi phục ở đó.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="dongHop();slThayO('+a+')">🔁 Thay bằng file mới</button></div>'+
    '<div class="hang-nut sl-o-phu"><button class="nho" onclick="dongHop();slMoO('+a+')">👁 Xem chi tiết</button><button class="nho" onclick="slTaiGoc('+a+')">⬇ Tải file gốc</button><button class="nho" onclick="dongHop();slXoa('+a+')">🗑 Xóa</button></div>', true);
}
function slNgan(L, t){ t = t||{}; if(L.k==='lt' || L.k==='tt' || L.k==='dsto') return (t.dong!==undefined ? t.dong : t.n||0)+' tổ'; if(t.dn!==undefined) return tdnTr(t.dn); if(t.qh!==undefined) return tdnTr(t.qh); if(t.kn!==undefined) return tdnTr(t.kn); return (t.n||0)+' dòng'; }
/* dấu vân tay dữ liệu dùng để kiểm 1 tháng: đổi file (nạp / thay / xóa) → khác dấu → kết quả cũ cần kiểm lại */
function slDauKy(ky){
  var ds = SL_LOAI.filter(function(L){ return !L.ngay && !L.kt; }).map(function(L){ var e = SLM.bang[slKhoa(L.k, ky)]; return L.k+':'+(e ? e.luc||'' : ''); });   /* 3.93: BC0437/0438 có kiểm tra riêng ở tab KTGS */
  var t = SLM.bang[slKhoa('hstd', kyLui(ky, -1))];
  ds.push('truoc:'+(t ? t.luc||'' : ''));
  return ds.join('|');
}
function slKTCu(ky){ var k = SLM.kt[ky]; return !!k && k.dau!==slDauKy(ky); }
function slCoFileChinh(ky){ return SL_LOAI.some(function(L){ return (L.nhom==='A' || L.nhom==='B') && SLM.bang[slKhoa(L.k, ky)]; }); }   /* 3.91: tháng có ít nhất 1 file nhóm Ⓐ / Ⓑ mới kiểm (chỉ file phụ / theo ngày thì chưa) */
var SL_KT_NHOM = ['', 'Đủ file', 'Toàn vẹn từng file', 'Khớp giữa các file chi tiết cùng tháng', 'Khớp với tháng trước', 'Mẫu 31 ↔ Dư nợ chi tiết', 'Bất thường dữ liệu',
  'Số chuẩn TW khớp nhau (BCDHTD · LEN_31)', 'Mẫu 31 ↔ số chuẩn TW'];   /* 3.90: thêm nhóm 7, 8 (giữ số nhóm cũ để kết quả đã lưu vẫn đọc đúng) */
var SL_KT_THU = [1, 2, 7, 8, 3, 4, 5, 6];   /* thứ tự hiện */
var SL_KT_TOI_DA = 200;   /* mỗi mục giữ tối đa 200 dòng chi tiết (đủ để xem, chỉ mục không nặng) */
function slKTHTML(ky){
  var k = SLM.kt[ky];
  if(!slCoFileChinh(ky)) return '<div class="sl-kt-dau"><span class="sl-phu">Tháng '+kyVN(ky)+' chưa có file Ⓐ chuẩn TW / Ⓑ chi tiết nào — chưa kiểm. Nạp file rồi bấm Kiểm tra.</span></div>'+
    (k ? '<div class="sl-bao vang">Kết quả kiểm cũ ('+ngayVNsl(k.luc.slice(0,10))+' '+k.luc.slice(11,16)+') không còn file tương ứng — đã ẩn.</div>' : '');   /* 3.91: không hiện kết quả cũ của tháng trống */
  if(!k) return '<div class="sl-kt-dau"><button class="nho chinh" onclick="slKiemTra(\''+ky+'\')">🔍 Kiểm tra kỳ '+kyVN(ky)+'</button><span class="sl-phu">Chưa kiểm. App đánh giá Đạt (đủ file · đúng kỳ · đúng cấu trúc) và ghi nhận chênh lệch: so các file chuẩn TW với nhau, Mẫu 31 với số chuẩn TW (từng xã, nguồn vốn, từng tổ), KHĐ, tổ trưởng, DSTO, tháng trước — chỉ báo, không sửa số.</span></div>';
  var cu = slKTCu(ky), h = '<div class="sl-kt-dau"><span>Đã kiểm '+ngayVNsl(k.luc.slice(0,10))+' '+k.luc.slice(11,16)+' · ✅ '+k.dem.ok+' khớp · ⚠ '+k.dem.lech+' chênh lệch (ghi nhận) · ⓘ '+k.dem.canh+' lưu ý</span>'+
    '<button class="nho'+(cu ? ' chinh' : '')+'" onclick="slKiemTra(\''+ky+'\')">🔍 Kiểm lại</button></div>';
  if(cu) h += '<div class="sl-bao vang">⟳ Dữ liệu tháng đã đổi sau lần kiểm (nạp / thay / xóa file) — kết quả dưới là của lần kiểm trước, bấm <b>Kiểm lại</b>.</div>';
  h += slDCHTML(ky);   /* 3.90.1: bảng đối chiếu chéo */
  /* 3.165 (anh chốt, BAN_GIAO_3161.md §2.4): kết quả gom theo từng file — cùng thứ tự dòng với ma trận (Ⓑ Ⓐ Ⓓ); mỗi file 1 dòng "✓ n · ⚠ n · ⓘ n", bấm mở các mục;
     mục so 2 file hiện ở file đứng trước, file kia ghi "↗ xem ở …"; chip lọc (mặc định ⚠ + ⓘ), ⊞ Mở hết / ⊟ Gập hết, 🔎 tìm mục */
  var kq = k.kq.filter(function(x){ return x.kq!=='bo'; }), dem = {ok:0, lech:0, canh:0}; kq.forEach(function(x){ if(dem[x.kq]!==undefined) dem[x.kq]++; });
  var loc = slKTLoc(dem), hop = function(x){ return loc==='all' || (loc==='lc' ? x.kq==='lech' || x.kq==='canh' : x.kq===loc); };
  var chip = function(v, chu, n){ return '<button class="to-chip'+(loc===v ? ' bat' : '')+'" onclick="D.cauHinh.slKtLoc=\''+v+'\';luu();slKTVe(\''+ky+'\')">'+chu+(n!==undefined ? ' <small>'+n+'</small>' : '')+'</button>'; };
  h += '<div class="sl-kt-loc">'+chip('lc', '⚠ + ⓘ', dem.lech+dem.canh)+chip('all', 'Tất cả', kq.length)+chip('ok', '✓ Khớp', dem.ok)+chip('lech', '⚠ Chênh lệch', dem.lech)+chip('canh', 'ⓘ Lưu ý', dem.canh)+
    '<button class="nho" onclick="slKTMo(1)" title="Mở hết các file">⊞ Mở hết</button><button class="nho" onclick="slKTMo(0)" title="Gập hết">⊟ Gập hết</button>'+
    '<span class="sl-kt-tim">🔎 <input id="sl-kt-tim" placeholder="Tìm mục kiểm tra…" oninput="slKTTim(this.value)"></span></div>';
  if(dem.lech || dem.canh) h += '<div class="sl-kt-ghi">Ghi nhận chênh lệch — chỉ để biết, không ảnh hưởng Đạt, không sửa số</div>';   /* 3.146 */
  var nhom = {}, thu = ['_'], tenF = function(l){ var L = l==='_' ? null : slLoai(l); return l==='_' ? 'Chung — đủ file, toàn vẹn từng file' : L ? slTenNgan(L) : l; };
  var thuL = []; SL_NHOM.forEach(function(n){ SL_LOAI.forEach(function(L){ if(L.nhom===n.k) thuL.push(L.k); }); });   /* thứ tự dòng ma trận: nhóm Ⓑ Ⓐ Ⓓ Ⓚ */
  kq.forEach(function(x){ var f = slKTFile(x).sort(function(a, b){ return thuL.indexOf(a)-thuL.indexOf(b); }); if(!f.length) f = ['_'];
    f.forEach(function(l, i){ if(!nhom[l]){ nhom[l] = []; if(thu.indexOf(l)<0) thu.push(l); } nhom[l].push({x:x, o:i ? f[0] : ''}); }); });
  thu.sort(function(a, b){ return a==='_' ? -1 : b==='_' ? 1 : thuL.indexOf(a)-thuL.indexOf(b); });
  var coDong = 0;
  thu.forEach(function(l){ var ds = nhom[l]; if(!ds) return; var d = {ok:0, lech:0, canh:0}; ds.forEach(function(r){ if(!r.o && d[r.x.kq]!==undefined) d[r.x.kq]++; });
    var hien = ds.filter(function(r){ return hop(r.x); }); if(!hien.length) return; coDong++;
    h += '<details class="sl-kt-file" id="sl-kt-f-'+l+'"'+(d.lech && loc!=='ok' ? ' open' : '')+'><summary><b>'+coChuHTML(tenF(l))+'</b> <span class="sl-kt-dem">'+(d.ok ? '<span class="ok">✓ '+d.ok+'</span>' : '')+(d.lech ? '<span class="lech">⚠ '+d.lech+'</span>' : '')+(d.canh ? '<span class="canh">ⓘ '+d.canh+'</span>' : '')+'</span></summary>'+
      hien.map(function(r){ return r.o ? '<div class="sl-kt-muc '+r.x.kq+' sl-kt-ref"><span class="ic">↗</span>'+coChuHTML(r.x.ten)+' — <a href="#" onclick="slKTToi(\''+r.o+'\');return false">xem ở '+coChuHTML(tenF(r.o))+'</a></div>' : slKTMuc(r.x); }).join('')+'</details>'; });
  if(!coDong) h += '<div class="rong">Không có mục nào trong bộ lọc này'+(loc==='lc' ? ' — các file khớp nhau ✓' : '')+'.</div>';
  return h;
}
/* ---------- 3.146 (anh chốt 10/10): KIỂM TRA KỲ — không chốt / khóa tháng; Đạt = đủ 9 file · đúng kỳ · đúng cấu trúc (đã bấm kiểm, sau lần đổi file cuối)
   chênh lệch giữa các file chỉ GHI NHẬN để biết — không ảnh hưởng Đạt, không sửa số ---------- */
var SL_BC_CAN = [['Tổ TK&VV · Sao kê · Tra cứu KH', ['hstd','dnct','dsto']], ['Tổng hợp tổng quan (PGD · xã · Hội · CT)', ['hstd','bx','bc','lx','lh','lc','lt']], ['KTGS Hội', ['hstd','dsto','k37','k38']]];
function slDanhGia(ky){
  var cuoi = tdnCuoiKy(ky), r = {thieu:[], ky:[], ct:[], luuY:[]}, ten = function(k){ return slLoai(k).ten.split(' · ')[0]; };
  SL_BAT_BUOC.forEach(function(k){ var e = slBBE(k, ky);
    if(!e){ r.thieu.push(ten(k)); return; }
    if(e.ngay && e.ngay!==cuoi) r.ky.push(ten(k)+' (ngày số liệu '+ngayVNsl(e.ngay)+')');
    if(!e.soDong) r.ct.push(ten(k)+': 0 dòng dữ liệu');
    if(e.bo && e.bo.sai) r.luuY.push(ten(k)+': '+e.bo.sai+' dòng sai mã khóa (bỏ qua)');
    if(e.nguonKy==='anh chọn') r.luuY.push(ten(k)+': ngày số liệu do anh khai');
  });
  r.daKiem = !!SLM.kt[ky] && !slKTCu(ky);
  r.dat = r.daKiem && !r.thieu.length && !r.ky.length && !r.ct.length;
  r.bc = SL_BC_CAN.map(function(b){ return {ten:b[0], thieu:b[1].filter(function(k){ return !SLM.bang[slKhoa(k, ky)]; }).map(ten)}; });
  return r;
}
function slKTDauHTML(ky){
  var g = slDanhGia(ky), kt = slCoFileChinh(ky) ? SLM.kt[ky] : null;
  var buoc = [['Đủ file', !g.thieu.length], ['Đúng kỳ', !g.thieu.length && !g.ky.length], ['Đúng cấu trúc', !g.thieu.length && !g.ct.length], ['Đã kiểm', g.daKiem]];
  var h = '<div class="sl-kt-thang"><span>Kiểm tra kỳ:</span><b>'+kyVN(ky)+'</b><span class="sl-kt-thang-nut"><button class="nho" onclick="slChonThang(-1)" title="Tháng trước">‹</button><button class="nho" onclick="slChonThangHop()">Chọn tháng</button><button class="nho" onclick="slChonThang(1)" title="Tháng sau">›</button></span></div>'+
    '<div class="sl-4buoc">'+buoc.map(function(b, i){ return '<span class="'+(b[1] ? 'xong' : '')+'">'+(b[1] ? '✓ ' : (i+1)+'. ')+b[0]+'</span>'; }).join('')+'</div>';
  if(g.dat) h += '<div class="sl-bao xanh sl-dat">✅ <b>Đạt</b> — đủ '+SL_BAT_BUOC.length+' file, đúng kỳ, đúng cấu trúc. '+(kt.dem.lech || kt.dem.canh ? 'Chênh lệch giữa các file: '+kt.dem.lech+' mục · lưu ý '+kt.dem.canh+' — <b>chỉ ghi nhận để biết</b>, không ảnh hưởng Đạt, không sửa số.' : 'Các file khớp nhau.')+'</div>';
  else {
    var ly = [];
    if(g.thieu.length) ly.push('<b>Thiếu file:</b> '+g.thieu.join(', '));
    if(g.ky.length) ly.push('<b>Sai kỳ:</b> '+g.ky.join(', '));
    if(g.ct.length) ly.push('<b>Sai cấu trúc:</b> '+g.ct.join(', '));
    if(!g.daKiem && !ly.length) ly.push('Đủ file — bấm <b>🔍 '+(SLM.kt[ky] ? 'Kiểm lại' : 'Kiểm tra kỳ')+'</b> bên dưới.');
    else if(!g.daKiem) ly.push(SLM.kt[ky] ? 'Dữ liệu đã đổi sau lần kiểm — bấm Kiểm lại.' : 'Chưa bấm kiểm.');
    h += '<div class="sl-bao vang">Chưa Đạt — '+ly.join(' · ')+'</div>';
  }
  if(g.luuY.length) h += '<div class="sl-phu sl-luu-y">ⓘ '+coChuHTML(g.luuY.join(' · '))+'</div>';
  h += '<div class="sl-bc-can">'+g.bc.map(function(b){ return '<span class="sl-pill '+(b.thieu.length ? 'vang' : 'xanh')+'" title="'+(b.thieu.length ? 'Thiếu: '+coChuHTML(b.thieu.join(', ')) : 'Đủ file')+'">'+(b.thieu.length ? '○ ' : '✓ ')+coChuHTML(b.ten)+(b.thieu.length ? ' — thiếu '+b.thieu.length : '')+'</span>'; }).join('')+'</div>';
  return h;
}
/* điện thoại: 2 khung vuốt ngang */
/* 1 mục kiểm tra (có bảng chi tiết thì bấm mở); loc = chỉ lấy dòng có chữ này ở cột đầu (lọc theo xã) */
function slKTFile(x){ var t = ' '+slChuan(x.ten+' '+(x.chu||''))+' '; return Object.keys(SL_KT_KHOP).filter(function(l){ return SL_KT_KHOP[l].some(function(w){ return t.indexOf(' '+w+' ')>=0; }); }); }   /* 3.165: mục kiểm tra → các file liên quan */
function slKTLoc(dem){ var v = D.cauHinh.slKtLoc; return v && ['lc','all','ok','lech','canh'].indexOf(v)>=0 ? v : (dem.lech || dem.canh ? 'lc' : 'all'); }
function slKTVe(ky){ var e = document.getElementById('sl-kt'); if(e) e.innerHTML = slKTHTML(ky); }
function slKTMo(mo){ Array.prototype.forEach.call(document.querySelectorAll('#sl-kt details.sl-kt-file'), function(d){ d.open = !!mo; }); }
function slKTTim(q){ q = slChuan(q||'');
  Array.prototype.forEach.call(document.querySelectorAll('#sl-kt details.sl-kt-file'), function(d){ var n = 0;
    Array.prototype.forEach.call(d.querySelectorAll('.sl-kt-muc'), function(m){ var ok = !q || slChuan(m.textContent).indexOf(q)>=0; m.style.display = ok ? '' : 'none'; if(ok) n++; });
    d.style.display = n || (!q) ? '' : 'none'; if(q && n) d.open = true; }); }
function slKTToi(l){   /* 3.165: bấm ⚠ trên ô ma trận / "↗ xem ở" → mở đúng dòng file trong Kết quả kiểm tra */
  var kq = document.getElementById('sl-kq'); if(kq) kq.open = true;
  var d = document.getElementById('sl-kt-f-'+l); if(!d && D.cauHinh.slKtLoc!=='all'){ D.cauHinh.slKtLoc = 'all'; slKTVe(SL_KY || slKyMoi()); d = document.getElementById('sl-kt-f-'+l); }
  if(d){ d.open = true; d.classList.add('sl-kt-nhay'); setTimeout(function(){ d.classList.remove('sl-kt-nhay'); }, 1600); d.scrollIntoView({behavior:'smooth', block:'center'}); }
}
function slKTMuc(x, loc, mo){
  var ic = {ok:'✅', lech:'⚠', canh:'ⓘ', bo:'—'}[x.kq]||'', dau = '<span class="ic">'+ic+'</span><b>'+coChuHTML(x.ten)+'</b> — '+coChuHTML(x.chu);
  var ds = (x.ds||[]).filter(function(r){ return !loc || slChuan(String(r[0])).indexOf(loc)>=0; });
  var than = (x.chi ? '<div class="sl-kt-chi">'+coChuHTML(x.chi)+'</div>' : '')+
    (ds.length ? '<div class="sl-kt-bang"><table><thead><tr>'+x.cot.map(function(c){ return '<th>'+coChuHTML(c)+'</th>'; }).join('')+'</tr></thead><tbody>'+
      ds.map(function(r){ return '<tr>'+r.map(function(v){ return '<td'+(typeof v==='number' ? ' class="so"' : '')+'>'+coChuHTML(typeof v==='number' ? tdnTien(v) : String(v==null ? '' : v))+'</td>'; }).join('')+'</tr>'; }).join('')+
      '</tbody></table>'+(x.n > ds.length && !loc ? '<div class="sl-phu">… hiện '+ds.length+'/'+x.n+' dòng</div>' : '')+'</div>' : '');
  return than ? '<details class="sl-kt-muc '+x.kq+'"'+(mo ? ' open' : '')+'><summary>'+dau+'</summary>'+than+'</details>' : '<div class="sl-kt-muc '+x.kq+'">'+dau+'</div>';
}
/* ---------- 3.90.1: BẢNG ĐỐI CHIẾU CHÉO — chỉ tiêu × nguồn (BCDHTD chuẩn · LEN_31 · Mẫu 31 · Dư nợ chi tiết), toàn PGD và từng xã ----------
   ô: c = số chuẩn · k = khớp · l = lệch · v = lưu ý đã biết · không có = — ; bấm ô lệch / lưu ý → mục kiểm tra tương ứng (lọc theo xã) */
var DC_CT = [['dn','Dư nợ'],['qh','Quá hạn'],['kn','Khoanh'],['cvT','Cho vay tháng'],['tnT','Thu nợ tháng'],['tg','Tiền gửi'],['khDn','Số KH dư nợ']];
var DC_NG = [['bx','BCDHTD','số chuẩn'],['lx','LEN_31',''],['m31','Mẫu 31',''],['dnct','Dư nợ CT','đối chiếu']];   /* 3.145: bỏ cột B32 */   /* 3.120: bỏ cột Mẫu 10 · 3.121: + Dư nợ chi tiết */
var SL_DC_PV = '';
function slDCTinh(B){
  var co = B.co, hs = B.hsTen==='Mẫu 31' ? co.hstd : null, V = {}, nhan = {'':'Toàn PGD'}, thu = [''];
  var dat = function(pv, f, ng, v){ if(pv===null || pv===undefined) return; if(!V[pv]){ V[pv] = {}; if(thu.indexOf(pv)<0) thu.push(pv); } var x = V[pv][f] = V[pv][f] || {}; x[ng] = (x[ng]||0)+(v||0); };
  var pvTW = function(o, capXa){ return o.cap==='tong' || o.cap==='pgd' ? '' : (o.cap===capXa ? slChuan(o.ten) : null); };
  (co.bx||[]).forEach(function(o){ var pv = pvTW(o, 'xa'); if(pv) nhan[pv] = o.ten; ['dn','qh','kn','cvT','tnT','khDn'].forEach(function(f){ dat(pv, f, 'bx', o[f]); }); });
  (co.lx||[]).forEach(function(o){ var pv = pvTW(o, 'xa'); if(pv) nhan[pv] = nhan[pv]||o.ten; [['dn','dn'],['qh','qh'],['kn','kn'],['cvT','cv'],['tnT','tn'],['tg','tg']].forEach(function(f){ dat(pv, f[0], 'lx', o[f[1]]); }); });
  var DK = {};
  [[hs, 'm31', B.lap], [co.dnct && co.dnct.length && co.dnct[0].dn!==undefined ? co.dnct : null, 'dnct', B.lapDn]].forEach(function(n){   /* 3.121: Dư nợ chi tiết (bản nạp ở 3.120 chưa có số tiền → bỏ qua) */
    if(!n[0]) return;
    var tinh = function(khoa){ return twTinh31(n[0], n[2], khoa); }, X = tinh(function(o){ return o.tenXa ? slChuan(o.tenXa) : null; }), T = tinh(function(){ return ''; });
    Object.keys(X).forEach(function(x){ if(X[x].mon) T[x] = X[x]; });
    Object.keys(T).forEach(function(pv){ var r = T[pv]; if(pv) nhan[pv] = nhan[pv]||pv;
      ['dn','qh','kn','cvT','tnT','tg','khDn'].forEach(function(f){ dat(pv, f, n[1], r[f]); });
      if(n[1]==='m31') DK[pv] = (r.gnT||0)-(r.cvT||0); });
  });
  /* trạng thái từng ô so với số chuẩn: BCDHTD (tiền gửi: LEN_31) */
  var tt = {};
  Object.keys(V).forEach(function(pv){ tt[pv] = {}; Object.keys(V[pv]).forEach(function(f){
    var x = V[pv][f], chuan = f==='tg' ? 'lx' : 'bx', c = x[chuan], r = tt[pv][f] = {};
    Object.keys(x).forEach(function(ng){
      if(ng===chuan){ r[ng] = ['c', '']; return; }
      if(c===undefined){ r[ng] = ['', '']; return; }
      var muc = c, tol = 1, ghi = '';
      if(f==='cvT' && ng==='lx' && DK[pv]){ muc = c + DK[pv]; ghi = 'gồm '+tdnTr(DK[pv])+' đảo khoản'; }
      var ch = x[ng] - muc;
      if(Math.abs(ch)<=tol){ r[ng] = ['k', ghi]; return; }
      var biet = (f==='tnT' && ng==='lx') || (f==='tg' && (ng==='m31' || ng==='dnct')) || (f==='cvT' && ng==='lx' && !hs);
      r[ng] = [biet ? 'v' : 'l', (ch>0 ? '+' : '−')+tdnTr(Math.abs(ch))];
    });
  }); });
  return {thu:thu, nhan:nhan, v:V, tt:tt};
}
/* ô lệch / lưu ý → mục kiểm tra chứa chi tiết */
var DC_MUC = {'lx':/01\.1 ↔ LEN_31 XAPUONG/, 'lx|cvT':/Cho vay tháng: LEN_31/, 'lx|tnT':/Thu nợ tháng: BCDHTD ↔ LEN_31/, 'm31':/Mẫu 31 ↔ BCDHTD/, 'm31|tg':/Tiền gửi: LEN_31/, 'dnct':/Mẫu 31 ↔ Dư nợ chi tiết/};
function slDCHTML(ky){
  var k = SLM.kt[ky], d = k && k.dc; if(!d || !d.thu.length) return '';
  if(d.thu.indexOf(SL_DC_PV)<0) SL_DC_PV = '';
  var pv = SL_DC_PV, V = d.v[pv] || {}, T = d.tt[pv] || {};
  var ng = DC_NG.filter(function(n){ return DC_CT.some(function(c){ return V[c[0]] && V[c[0]][n[0]]!==undefined; }); });
  var h = '<div class="sl-dc"><div class="sl-dc-pv">'+d.thu.map(function(x){ return '<button class="to-chip'+(x===pv ? ' bat' : '')+'" onclick="SL_DC_PV=\''+x.replace(/'/g, "\\'")+'\';var o=document.getElementById(\'sl-kt\');if(o)o.innerHTML=slKTHTML(\''+ky+'\')">'+coChuHTML(d.nhan[x]||x)+'</button>'; }).join('')+'</div>';
  h += '<div class="bdc-cuon"><table class="sl-dc-bang"><thead><tr><th>Chỉ tiêu</th>'+ng.map(function(n){ return '<th>'+n[1]+(n[2] ? '<small>'+n[2]+'</small>' : '')+'</th>'; }).join('')+'</tr></thead><tbody>';
  DC_CT.forEach(function(c){
    var x = V[c[0]]; if(!x) return;
    h += '<tr><td class="ct">'+c[1]+'</td>'+ng.map(function(n){
      var v = x[n[0]]; if(v===undefined) return '<td class="x">—</td>';
      var t = (T[c[0]]||{})[n[0]] || ['', ''], so = c[0]==='khDn' ? tdnTien(v) : thTr(v, 3);
      var bam = t[0]==='l' || t[0]==='v' ? ' tabindex="0" onclick="slDCChi(\''+ky+'\',\''+c[0]+'\',\''+n[0]+'\')" onkeydown="if(event.key===\'Enter\')this.click()" title="Bấm xem chi tiết"' : '';
      return '<td class="o '+t[0]+'"'+bam+'>'+so+'<em>'+(t[0]==='k' ? '✓'+(t[1] ? ' '+coChuHTML(t[1]) : '') : t[0]==='c' ? 'chuẩn' : coChuHTML(t[1]))+'</em></td>'; }).join('')+'</tr>';
  });
  h += '</tbody></table></div><div class="sl-dc-chu"><span class="k">khớp số chuẩn</span><span class="l">lệch — bấm xem</span><span class="v">lưu ý đã biết — bấm xem</span><span>Đơn vị: triệu đồng (số KH: khách). Chuẩn: BCDHTD; tiền gửi: LEN_31.</span></div><div id="sl-dc-chi"></div></div>';
  return h;
}
function slDCChi(ky, f, ng){
  var k = SLM.kt[ky], o = document.getElementById('sl-dc-chi'); if(!k || !o) return;
  var re = DC_MUC[ng+'|'+f] || DC_MUC[ng], x = re && k.kq.find(function(m){ return re.test(m.ten); });
  o.innerHTML = x ? slKTMuc(x, ng==='dnct' ? '' : SL_DC_PV, true) : '<div class="sl-bao vang">Chưa có mục kiểm tra chi tiết cho ô này — bấm 🔍 Kiểm lại.</div>';
  o.scrollIntoView({block:'nearest'});
}
/* chạy kiểm tra 1 tháng — chỉ đọc, không sửa dữ liệu; lưu kết quả vào SLM.kt[ky] (lên Drive cùng chỉ mục) */
function slKTDsTo(B, them){   /* 3.108 (anh chốt): nạp cả 2 danh sách tổ để rà soát lẫn nhau — chỉ báo, không sửa nguồn. Không so dư nợ / số tổ viên (DSTO không cùng thời điểm với Mẫu 31: số thật T9 lệch 139 tổ) */
  var co = B.co, ds = co.dsto, tt = co.tt, hs = B.hsTen || 'Mẫu 31'; if(!ds) return;
  var mon = {}, dvMon = {}, D = {}, TT = {}, tenKH = {}, thanh = {};
  (co.hstd||[]).forEach(function(o){ if(o.kh && o.ten && !tenKH[o.kh]) tenKH[o.kh] = o.ten; if(!o.to || o.to===TO_GIA) return;
    if((o.dn||0)>0) mon[o.to] = (mon[o.to]||0)+1; if(o.dv && !dvMon[o.to]) dvMon[o.to] = String(o.dv); (thanh[o.to] = thanh[o.to] || []).push(o.ten||''); });
  ds.forEach(function(o){ D[o.to] = o; }); (tt||[]).forEach(function(o){ TT[o.to] = o; });
  var tenTo = function(m){ return tenHoaDau(String((D[m] && D[m].toTen) || (TT[m] && TT[m].toTen) || '').replace(/^(ông|bà|ong|ba)\.?\s+/i, '')); };
  var bo = function(x){ return slChuan(String(x||'').replace(/^(ông|bà|ong|ba)\.?\s+/i, '')); };
  var dk = function(L){ return L.length ? 'canh' : ''; };
  if(tt){ var a = []; Object.keys(mon).forEach(function(m){ if(!TT[m]) a.push([m, tenTo(m), D[m] ? String(D[m].tenDiem||'').trim() : '', mon[m]]); });
    them(6, 'Tổ có món ('+hs+') có trong Thông tin tổ trưởng', !a.length, a.length ? a.length+' tổ thiếu — app lấy điểm GD theo Danh sách tổ' : 'đủ', a.length ? 'File hệ thống xuất thiếu; tổ vẫn lên đúng điểm GD theo Danh sách tổ.' : '', ['Mã tổ', 'Tổ trưởng', 'Điểm GD (Danh sách tổ)', 'Món còn dư nợ'], a, dk(a)); }
  var b = []; Object.keys(mon).forEach(function(m){ if(!D[m]) b.push([m, tenTo(m), TT[m] ? String(TT[m].tenDiem||'').trim() : '', mon[m]]); });
  if(ds.some(function(o){ return o.cccd!==undefined; })){   /* 3.202: Danh sách tổ hệ thống — nguồn thống nhất CCCD, TK 104 tổ trưởng → so với Mã CIF TT (Mẫu 31) */
    var cif = {}; (co.hstd||[]).forEach(function(o){ if(o.to && o.ttKH && !cif[o.to]) cif[o.to] = o.ttKH; });
    var l = [], f = []; Object.keys(mon).forEach(function(m){ var x = D[m]; if(!x) return;
      if(cif[m] && x.ttKH && cif[m]!==x.ttKH) l.push([m, tenTo(m), x.ttKH, cif[m]]);
      var k = [String(x.cccd||'').length<9 && 'CCCD', !x.ncap && 'ngày cấp', !/^\d{10}$/.test(x.tk104||'') && 'TK 104'].filter(Boolean); if(k.length) f.push([m, tenTo(m), x.ttKH||'', k.join(', ')]); });
    them(6, 'Tổ trưởng trên Danh sách tổ khớp Mã CIF TT ('+hs+')', !l.length, l.length ? l.length+' tổ lệch' : 'khớp', l.length ? 'App lấy CCCD, TK 104 theo Mẫu 31 cho tổ lệch — kiểm lại tổ trưởng trên hệ thống.' : '', ['Mã tổ', 'Tổ trưởng', 'Mã KH (Danh sách tổ)', 'Mã CIF TT ('+hs+')'], l, dk(l));
    them(6, 'Danh sách tổ đủ CCCD · ngày cấp · TK 104 tổ trưởng', !f.length, f.length ? f.length+' tổ chưa đủ' : 'đủ', '', ['Mã tổ', 'Tổ trưởng', 'Mã KH', 'Còn thiếu'], f, dk(f)); }
  them(6, 'Tổ có món ('+hs+') có trong Danh sách tổ', !b.length, b.length ? b.length+' tổ thiếu' : 'đủ', '', ['Mã tổ', 'Tổ trưởng', 'Điểm GD (Thông tin tổ trưởng)', 'Món còn dư nợ'], b, dk(b));
  var c = []; Object.keys(D).forEach(function(m){ if(!mon[m]) c.push([m, tenTo(m), 'Danh sách tổ']); }); Object.keys(TT).forEach(function(m){ if(!mon[m]) c.push([m, tenTo(m), 'Thông tin tổ trưởng']); });
  them(6, 'Tổ trong danh sách còn món dư nợ ('+hs+')', !c.length, c.length ? c.length+' tổ không còn món dư nợ' : 'khớp', c.length ? 'Thường là tổ đã giải thể / sáp nhập, hoặc tổ chỉ còn tiết kiệm.' : '', ['Mã tổ', 'Tổ trưởng', 'Có trong'], c, dk(c));
  if(tt){
    var d = [], e = [];
    Object.keys(D).forEach(function(m){ var x = D[m], y = TT[m]; if(!y) return;
      if(x.diem && y.diem && x.diem!==y.diem) d.push([m, tenTo(m), String(y.tenDiem||y.diem).trim(), String(x.tenDiem||x.diem).trim()]);
      var lt = bo(x.toTen)!==bo(y.toTen), ls = String(x.sdt||'').replace(/\D/g, '')!==String(y.sdt||'').replace(/\D/g, '') && x.sdt && y.sdt;
      if(lt || ls) e.push([m, tenHoaDau(y.toTen), tenHoaDau(x.toTen), y.sdt||'', x.sdt||'']); });
    them(6, 'Điểm GD: Thông tin tổ trưởng = Danh sách tổ', !d.length, d.length ? d.length+' tổ lệch' : 'khớp', '', ['Mã tổ', 'Tổ trưởng', 'Thông tin tổ trưởng', 'Danh sách tổ'], d);
    them(6, 'Tổ trưởng / SĐT: Thông tin tổ trưởng = Danh sách tổ', !e.length, e.length ? e.length+' tổ lệch' : 'khớp (so không phân biệt hoa thường, bỏ "Ông / Bà")', '', ['Mã tổ', 'Tên (TT tổ trưởng)', 'Tên (Danh sách tổ)', 'SĐT (TT)', 'SĐT (Danh sách tổ)'], e);
  }
  var f = [];
  Object.keys(D).forEach(function(m){ var h = dvMon[m]; if(!h) return; var a1 = toDvTuTen(D[m].dvTen), a2 = TT[m] ? String(TT[m].dv||'') : '';
    if((a1 && a1!==h) || (a2 && a2!==h)) f.push([m, tenTo(m), tdnHoi(h), a1 ? tdnHoi(a1) : '', a2 ? tdnHoi(a2) : '']); });
  them(6, 'Hội của tổ: '+hs+' (ĐVUT món) = Danh sách tổ'+(tt ? ' = Thông tin tổ trưởng' : ''), !f.length, f.length ? f.length+' tổ lệch — app theo '+hs : 'khớp', '', ['Mã tổ', 'Tổ trưởng', hs, 'Danh sách tổ', 'Thông tin tổ trưởng'], f);
  var g = [];
  Object.keys(D).forEach(function(m){ var x = String(D[m].toTen||'').replace(/^(ông|bà|ong|ba)\.?\s+/i, ''); if(!x || /[^\x00-\x7f]/.test(x)) return;
    var k = D[m].ttKH && tenKH[D[m].ttKH] && slChuan(tenKH[D[m].ttKH])===slChuan(x);
    if(!k && !(thanh[m]||[]).some(function(n){ return /[^\x00-\x7f]/.test(n) && slChuan(n)===slChuan(x); })) g.push([m, tenHoaDau(x), D[m].ttKH||'']); });
  them(6, 'Tên tổ trưởng không dấu tìm được tên có dấu ('+hs+')', !g.length, g.length ? g.length+' tổ chưa tìm được — app giữ tên không dấu, viết hoa đầu từ' : 'đủ', '', ['Mã tổ', 'Tên (không dấu)', 'Mã KH tổ trưởng'], g, dk(g));
}
function slKiemTra(ky, im){   /* im = tự kiểm ngầm (3.156): không khung chờ, lỗi không bật hộp */
  if(!slCoFileChinh(ky)) return im ? Promise.resolve() : bao('Tháng '+kyVN(ky)+' chưa có file Ⓐ chuẩn TW / Ⓑ chi tiết nào — nạp file trước rồi kiểm.', 5);   /* 3.90.1 · 3.91: file phụ / theo ngày chưa đủ để kiểm */
  batChay(!im, (im ? 'Đang tự kiểm tra ' : 'Đang kiểm tra tháng ')+kyVN(ky)+'…');
  if(!im) slBoXoa(ky);   /* 3.156: tự kiểm ngầm dùng bộ đã dựng (dữ liệu đổi thì bộ đã bị bỏ sẵn) — không xóa phần dựng sẵn */
  var kq = [], them = function(nhom, ten, ok, chu, chi, cot, ds, muc){
    var d = ds||[]; kq.push({nhom:nhom, ten:ten, kq:muc || (ok ? 'ok' : 'lech'), chu:chu||'', chi:chi||'', cot:cot||[], ds:d.slice(0, SL_KT_TOI_DA), n:d.length});
  };
  var truoc = kyLui(ky, -1), cuoi = tdnCuoiKy(ky), B, Bt = null;
  return slBo(ky).then(function(b){ B = b;
    return SLM.bang[slKhoa('hstd', truoc)] ? slBo(truoc).then(function(x){ Bt = x; }) : null;
  }).then(function(){
    var co = B.co, hs = B.hsTen;
    /* 1. đủ file */
    var thieu = SL_BAT_BUOC.filter(function(k){ return !slBBE(k, ky); });
    them(1, 'Đủ file bộ tháng ('+SL_BAT_BUOC.length+' loại: Mẫu 31, Dư nợ chi tiết, Danh sách tổ + BCDHTD 01.1, 01.2 + 4 LEN_31)', !thieu.length, thieu.length ? 'thiếu '+thieu.length+': '+thieu.map(function(k){ return slLoai(k).ten; }).join(', ') : 'đủ',
      (thieu.indexOf('hstd')>=0 && co.hstd) ? 'Chưa có Mẫu 31 — các phép so dùng tạm '+hs+'.' : '');
    /* 2. toàn vẹn từng file */
    var vd = [];
    SL_LOAI.forEach(function(L){
      if(L.ngay) return; var e = SLM.bang[slKhoa(L.k, ky)]; if(!e) return;
      if(e.bo && e.bo.sai) vd.push([L.ten, e.bo.sai+' dòng sai mã khóa — không lấy']);
      if(!e.soDong) vd.push([L.ten, 'file đúng mẫu nhưng 0 dòng']);
      if(e.ngay && e.ngay!==cuoi) vd.push([L.ten, 'ngày số liệu '+ngayVNsl(e.ngay)+' không phải cuối tháng']);
      if(e.ngayXuat) vd.push([L.ten, 'xuất ngày '+ngayVNsl(e.ngayXuat)+', sau ngày số liệu — có thể lẫn phát sinh sau chốt']);
      if(e.nguonKy==='anh chọn') vd.push([L.ten, 'kỳ do anh chọn (trong file và tên file không có ngày)']);
      if(slLaHS(L.k) && e.bo && e.bo.trung && !e.ban) vd.push([L.ten, 'nạp ở bản cũ (dòng lặp đã gộp) — nạp lại file']);
    });
    them(2, 'Toàn vẹn các file', !vd.length, vd.length ? vd.length+' lưu ý' : 'không có dòng sai mã, đủ dòng, ngày số liệu đúng cuối tháng', '', ['File', 'Lưu ý'], vd, vd.length ? 'canh' : '');
    /* 3, 4, 6: các phép đối chiếu sẵn có */
    slDoiChieu(B).forEach(function(x){
      var nhom = /tháng trước/.test(x.ten) ? 4 : /Mã thôn|danh sách tổ trưởng|thiếu tên/.test(x.ten) ? 6 : 3;
      them(nhom, x.ten, x.ok, x.chu, x.chi);
    });
    /* 3.90: Mẫu 7 bỏ khỏi tham chiếu (anh chốt). Số chuẩn TW khớp nhau (7) · Mẫu 31 ↔ số chuẩn TW (8) · KHĐ, tổ trưởng (3) */
    slKTTW(ky, B, them);
    slKTDsTo(B, them);   /* 3.108: Thông tin tổ trưởng ↔ Danh sách tổ (DSTO) ↔ Mẫu 31 */
    tvKiem(B, them);   /* 3.201: thành viên tổ ↔ Mẫu 01/TV (TƯ) — cần cho ra khỏi tổ */
    /* 4b. món đang vay tháng trước nhưng tháng này không còn dòng nào (Mẫu 31 giữ cả món tất toán trong năm) */
    if(Bt && Bt.hsTen==='Mẫu 31' && hs==='Mẫu 31'){
      var mat = [];
      Bt.co.hstd.forEach(function(o){ if(o.ku && (o.dn||0)>0 && !B.mon[o.ku]) mat.push([o.ku, o.kh||'', o.ten||'', o.dn||0]); });
      them(4, 'Món đang vay '+kyVN(truoc)+' còn có ở '+kyVN(ky), !mat.length, mat.length ? mat.length+' món không còn dòng nào (không có dòng tất toán)' : 'đủ', mat.length ? 'Mẫu 31 giữ cả món tất toán trong năm — món biến mất cần kiểm trên hệ thống (sang năm mới thì bình thường).' : '',
        ['Số KU', 'Mã KH', 'Họ tên', 'Dư nợ '+kyVN(truoc)], mat, mat.length ? 'canh' : '');
    } else if(SLM.bang[slKhoa('hstd', ky)]) them(4, 'So với tháng trước', true, 'chưa có Mẫu 31 '+kyVN(truoc)+' — bỏ qua', '', null, null, 'bo');
    /* 5. 3.121: Mẫu 31 ↔ Dư nợ chi tiết cùng kỳ — số món, khách, dư nợ, số dư 105; danh sách món lệch (chỉ báo, không sửa) */
    if(co.dnct && co.hstd && hs==='Mẫu 31'){
      var DN = co.dnct;
      if(!DN.length || DN[0].dn===undefined) them(5, 'Mẫu 31 ↔ Dư nợ chi tiết', true, 'file Dư nợ chi tiết nạp ở bản 3.120 chưa lưu số tiền — nạp lại file để đối chiếu', '', null, null, 'bo');
      else {
        var coMon = function(rows, lap){ var kh = {}; rows.forEach(function(o){ if(o.ku && o.kh) kh[o.kh] = 1; }); var r = rows.filter(function(o){ return kh[o.kh]; }), l = (lap||[]).filter(function(o){ return kh[o.kh]; }); return [r, l]; };   /* chỉ khách có món vay — Dư nợ chi tiết không có khách chỉ gửi tiết kiệm */
        var xA = coMon(co.hstd, B.lap), xB = coMon(DN, B.lapDn), tA = slTong('hstd', xA[0], xA[1]), tB = slTong('dnct', xB[0], xB[1]), mA = {}, mB = {}, ds6 = [];
        co.hstd.forEach(function(o){ if(o.ku) mA[o.ku] = o; }); DN.forEach(function(o){ if(o.ku) mB[o.ku] = o; });
        Object.keys(mA).forEach(function(k){ var a = mA[k], x = mB[k]; if(!x){ if((a.dn||0)>0) ds6.push([k, a.kh||'', a.ten||'', a.dn||0, '(không có)', a.dn||0]); return; }
          if(Math.abs((a.dn||0)-(x.dn||0))>0.5) ds6.push([k, a.kh||'', a.ten||'', a.dn||0, x.dn||0, (a.dn||0)-(x.dn||0)]); });
        Object.keys(mB).forEach(function(k){ var x = mB[k]; if(!mA[k] && (x.dn||0)>0) ds6.push([k, x.kh||'', x.ten||'', '(không có)', x.dn||0, -(x.dn||0)]); });
        var cs = [['món', tA.mon, tB.mon], ['khách có món', tA.kh, tB.kh], ['dư nợ', tA.dn, tB.dn], ['số dư 105 (khách có món)', tA.t105, tB.t105]], lch = cs.filter(function(c){ return Math.abs((c[1]||0)-(c[2]||0))>0.5; });
        them(5, 'Mẫu 31 ↔ Dư nợ chi tiết '+kyVN(ky), !lch.length && !ds6.length,
          cs.map(function(c){ var f = c[0]==='món' || c[0]==='khách có món' ? function(v){ return String(v||0); } : tdnTien; return c[0]+' '+f(c[1])+(Math.abs((c[1]||0)-(c[2]||0))>0.5 ? ' ≠ '+f(c[2]) : ' ✓'); }).join(' · ')+(ds6.length ? ' · '+ds6.length+' món lệch' : ''),
          ds6.length || lch.length ? 'Số liệu chính là Mẫu 31; Dư nợ chi tiết chỉ tham chiếu số TK 105 + điểm GD — lệch thì xem lại 2 file có cùng ngày số liệu không.' : '', ['Số KU', 'Mã KH', 'Họ tên', 'Mẫu 31', 'Dư nợ CT', 'Chênh'], ds6);
      }
    }
    var dem = {ok:0, lech:0, canh:0};
    kq.forEach(function(x){ if(dem[x.kq]!==undefined) dem[x.kq]++; });
    SLM.kt[ky] = {luc:new Date().toISOString(), ban:APP_BAN, dau:slDauKy(ky), kq:kq, dem:dem, dc:slDCTinh(B)};   /* 3.90.1: bảng đối chiếu chéo */
    return slLuuMeta();
  }).then(function(){ tatChay(); var g = slDanhGia(ky); if(!im) bao('Kiểm tra kỳ '+kyVN(ky)+': '+(g.dat ? '✅ Đạt' : 'chưa Đạt')+'.', 3); if(nganHienTai===7 && (!im || D.cauHinh.slTab==='nap')) veSoLieu();   /* tự kiểm ngầm: chỉ vẽ lại khi đang ở tab Nạp & KT (không làm mất thẻ đang xem ở tab khác) */
    if(SLM.bang[slKhoa('k37', ky)] || SLM.bang[slKhoa('k38', ky)]) return ktKiemTra(ky, im);   /* 3.146: 1 nút kiểm cả file KTGS cùng kỳ */ })
    .catch(function(er){ tatChay(); if(im){ console.warn('Tự kiểm lỗi', ky, er); bao('Chưa tự kiểm được '+kyVN(ky)+' — bấm 🔍 Kiểm tra lại.', 4); } else baoLoi('Kiểm tra lỗi: '+(er && er.message || er)); });
}

/* danh mục mã rút từ bộ kỳ: địa bàn, ĐVUT, chương trình, nguồn vốn → Mã NĐT (anh đặt tên NĐT) */
function slDanhMucHTML(B){
  var co = B.co, nguon = {}, ct = {}, dv = {}, diem = {};
  (co.tdn||co.hstd||[]).forEach(function(o){
    var n = SL_NGUON[o.nguon] || (o.nguon ? 'Nguồn '+o.nguon : '?'), d = o.ndt||'';
    nguon[n] = nguon[n]||{}; nguon[n][d] = (nguon[n][d]||0)+(o.dn||0);
    if(o.ct){ ct[o.ct] = ct[o.ct] || {ten:o.ctVT||o.ctTen||'', dn:0}; ct[o.ct].dn += (o.dn||0); }
  });
  (co.tt||[]).forEach(function(o){ dv[o.dv] = (dv[o.dv]||0)+1; var k = (o.tenDiem||'')+(o.ngayGD ? ' (ngày '+o.ngayGD+')' : ''); diem[k] = (diem[k]||0)+1; });
  var h = '<details class="sl-dm"><summary>Danh mục mã của kỳ (nguồn vốn, chương trình, hội, điểm giao dịch)</summary>';
  h += '<div class="sl-dm-khoi"><b>Nguồn vốn → Mã NĐT</b>'+Object.keys(nguon).map(function(n){
    return '<div>'+coChuHTML(n)+': '+Object.keys(nguon[n]).map(function(d){
      return (d ? '<span class="sl-ndt">'+coChuHTML(d)+' <input value="'+coChuHTML(SLM.ndt[d]||'')+'" placeholder="tên gọi…" onchange="SLM.ndt[\''+d+'\']=this.value.trim();slLuuMeta()"></span>' : 'không mã')+' '+tdnTr(nguon[n][d]); }).join(' · ')+'</div>'; }).join('')+'</div>';
  h += '<div class="sl-dm-khoi"><b>Chương trình</b>'+Object.keys(ct).sort().map(function(k){ return '<span class="sl-chip">'+k+' '+coChuHTML(ct[k].ten.trim())+' · '+tdnTr(ct[k].dn)+'</span>'; }).join('')+'</div>';
  if(Object.keys(dv).length) h += '<div class="sl-dm-khoi"><b>Tổ theo hội</b>'+Object.keys(dv).sort().map(function(k){ return '<span class="sl-chip">'+coChuHTML(tdnHoi(k))+' '+dv[k]+' tổ</span>'; }).join('')+'</div>';
  if(Object.keys(diem).length) h += '<div class="sl-dm-khoi"><b>Điểm giao dịch</b>'+Object.keys(diem).sort().map(function(k){ return '<span class="sl-chip">'+coChuHTML(k)+' · '+diem[k]+' tổ</span>'; }).join('')+'</div>';
  return h+'</details>';
}
function slMoO(loai, ky){
  var e = SLM.bang[slKhoa(loai, ky)]; if(!e) return;
  var L = slLoai(loai), t = e.tong||{};
  moHop('<div class="hop-tit">'+coChuHTML(L.ten)+' · '+slKyChu(ky)+'</div>'+
    '<div class="hop-phu">File: <b>'+coChuHTML(e.tenFile||'')+'</b> · ngày số liệu '+ngayVNsl(e.ngay)+' (theo '+coChuHTML(e.nguonKy||'')+')'+(e.ngayXuat ? ' · xuất ngày '+ngayVNsl(e.ngayXuat) : '')+' · sheet '+coChuHTML(e.sheet||'')+', tên cột ở dòng '+(e.hang||'')+
    ' · nạp '+(e.luc ? ngayVNsl(e.luc.slice(0,10)) : '')+(e.choDay ? ' · ☁ chờ lên Drive' : ' · ☁ đã lên Drive')+'</div>'+
    (L.bo ? '<div class="sl-bao vang">⛔ '+coChuHTML(L.bo)+'</div>' : '')+
    (e.kiemNgay ? '<div class="sl-bao vang">⚠ Bản này chuyển từ bản cũ, ngày số liệu tạm lấy cuối tháng — anh kiểm, sai thì bấm 📅 Đổi ngày.</div>' : '')+
    '<div class="sl-tom">'+slTomDong(L, e)+'</div>'+
    (function(){ if(!L.tuy || String(ky).length!==7) return ''; var nd = slCacNgay(loai, ky); if(!nd.length) return '';   /* 3.135: ô tháng còn bản theo ngày → mở / xóa từng bản riêng, không đụng bản cuối tháng */
      return '<div class="nhan-nhom">Bản theo ngày trong tháng ('+nd.length+') — bấm để xem / xóa riêng</div><div class="sl-tom">'+nd.map(function(x){ return '<div class="sl-ngay-dong" onclick="dongHop();slMoO(\''+loai+'\',\''+x.ky+'\')">'+slTomDong(L, x)+'</div>'; }).join('')+'</div>'; })()+
    '<div class="hang-nut">'+(e.goc ? '<button class="nho" onclick="slMoGoc(\''+e.goc+'\')">☁ Mở file gốc trên Drive</button>' : '')+
    '<button class="nho" onclick="slTaiGoc(\''+loai+'\',\''+ky+'\')" title="Tải về máy bản sao file Excel gốc (để dùng việc khác)">⬇ Tải file gốc</button>'+   /* 3.90.1 */
    (L.ngay ? '<button class="nho" onclick="dongHop();slDoiNgay(\''+loai+'\',\''+ky+'\')">📅 Đổi ngày</button>' : '')+
    (L.bo ? '' : '<button class="nho" onclick="dongHop();slThayO(\''+loai+'\',\''+ky+'\')" title="Chọn file mới — phải đúng loại, đúng kỳ của ô này">🔁 Thay file</button>')+   /* 3.90 · 3.91: tháng chốt thì ẩn */
    '<button class="nho" onclick="dongHop();slXoa(\''+loai+'\',\''+ky+'\')">🗑 Xóa '+(String(ky).length>7 ? 'bản ngày '+ngayVNsl(ky) : 'ô này')+'</button>'+
    '<button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button></div>', true);
}
function slMoGoc(id){ window.open('https://drive.google.com/file/d/'+id+'/view', '_blank'); }
/* 3.87: ô tháng của loại theo ngày → danh sách các ngày đã nạp */
function slMoNgay(loai, thang){
  var L = slLoai(loai), ds = slCacNgay(loai, thang).reverse();
  moHop('<div class="hop-tit">'+coChuHTML(L.ten)+' · '+kyVN(thang)+'</div>'+
    '<div class="hop-phu">Mỗi ngày nạp là một bản riêng, giữ nguyên như file. Muốn biết số hiện tại thì xem ngày mới nhất; số chốt tháng xem Mẫu 31.</div>'+
    '<div class="sl-tom">'+ds.map(function(e){ return '<div class="sl-ngay-dong" onclick="dongHop();slMoO(\''+loai+'\',\''+e.ky+'\')">'+slTomDong(L, e)+'</div>'; }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop();slNapMot(\''+loai+'\',\''+thang+'\')">+ Nạp ngày khác</button><button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button></div>', true);
}
function slDoiNgay(loai, ky){
  var e = SLM.bang[slKhoa(loai, ky)]; if(!e) return;
  moHop('<div class="hop-tit">📅 Đổi ngày số liệu</div><div class="hop-phu">'+coChuHTML(slLoai(loai).ten)+' · file '+coChuHTML(e.tenFile||'')+'. Chỉ đổi ngày ghi nhận, dữ liệu giữ nguyên.</div>'+
    '<div class="o"><label>Ngày số liệu</label><input id="sl-dn" type="date" value="'+ky+'"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="slDoiNgayGhi(\''+loai+'\',\''+ky+'\')">✓ Ghi</button></div>');
}
function slDoiNgayGhi(loai, ky){
  var moi = (document.getElementById('sl-dn')||{}).value || '', e = SLM.bang[slKhoa(loai, ky)];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(moi)) return bao('Anh chọn ngày.', 3);
  if(!e) return dongHop();
  if(moi===ky){ delete e.kiemNgay; e.nguonKy = 'anh chọn'; e.luc = new Date().toISOString(); dongHop(); slLuuMeta(); bao('Đã xác nhận ngày '+ngayVNsl(moi)+'.', 3); return veSoLieu(); }
  if(SLM.bang[slKhoa(loai, moi)]) return bao('Ngày '+ngayVNsl(moi)+' đã có bản khác — xóa bản đó trước.', 5);
  dongHop(); batChay(true, 'Đang đổi ngày…');
  slDoiKhoa(loai, ky, loai, moi, {nguonKy:'anh chọn', kiemNgay:false}).then(function(){ tatChay(); var m = SLM.bang[slKhoa(loai, moi)]; if(m) delete m.kiemNgay; slLuuMeta(); bao('Đã đổi sang ngày '+ngayVNsl(moi)+'.', 4); veSoLieu(); })
    .catch(function(er){ tatChay(); baoLoi('Đổi ngày lỗi: '+(er && er.message || er)); });
}

/* ---------- 12. NẠP: cả bộ / từng file ---------- */
var SL_NAP = [];
function slChonFile(ham){
  var i = document.createElement('input'); i.type = 'file'; i.accept = '.xlsx,.xls,.xlsm,.csv'; i.multiple = !!ham.nhieu;
  i.onchange = function(){ var f = Array.prototype.slice.call(i.files||[]); if(f.length) ham(f); };
  i.click();
}
function slNapBo(){
  var ham = function(files){ slDocNhieu(files); };
  ham.nhieu = true; slChonFile(ham);
}
function slDocNhieu(files){
  (function(){
    SL_NAP = []; batChay(true, 'Đang đọc '+files.length+' file Excel…');
    moHop('<div class="hop-tit">📥 Nạp cả bộ — đang đọc</div><div class="hop-phu" id="sl-tien">0/'+files.length+' file…</div>', true);
    files.reduce(function(p, f, i){   /* 3.201: bỏ nhận file danh mục tổ — Sao kê TK 104 / 105, Mẫu 01/TV đọc như các file số liệu khác */
      return p.then(function(){ return slDocFile(f).then(function(kq){ SL_NAP.push(kq); var e = document.getElementById('sl-tien'); if(e) e.textContent = (i+1)+'/'+files.length+' file — vừa đọc '+f.name; }); });
    }, Promise.resolve()).then(function(){ tatChay();
      if(SL_NAP.length) slXemTruoc(); else dongHop(); });
  })();
}
/* trạng thái 1 file trong bảng xem trước */
function slTrangThai(kq){
  if(kq.loi) return {lop:'loi', chu:kq.loi, ghi:false};
  if(!kq.ky) return {lop:'vang', chu:kq.canKhai ? '⚠ Cần khai ngày: trong file không ghi ngày số liệu — anh chọn '+(slChonNgay(kq.loai) ? 'ngày' : 'kỳ')+' ở ô Kỳ'+(kq.goiYTen ? ' (tên file gợi ý '+ngayVNsl(kq.goiYTen)+')' : '')+'.'
    : 'Không thấy ngày trong file — anh chọn '+(slLaNgay(kq.loai) ? 'ngày' : 'kỳ')+'.', ghi:false};   /* 3.143 */
  var cu = SLM.bang[slKhoa(kq.loai, kq.ky)];
  var trung = Object.keys(SLM.bang).map(function(k){ return SLM.bang[k]; }).find(function(e){ return e.hash && e.hash===kq.hash; });
  if(trung) return {lop:'vang', chu:trung.ky!==kq.ky && trung.loai===kq.loai ? 'File này đã nạp trước đây vào ô KHÁC: '+slKyChu(trung.ky)+' (có thể vào nhầm do đọc sai ngày). Lần này đọc là '+slKyChu(kq.ky)+' — tích để nạp vào ô đúng, rồi xóa bản ở '+slKyChu(trung.ky)+'.'
    : 'File này đã nạp ('+slLoai(trung.loai).ten+' '+slKyChu(trung.ky)+') — tích nếu vẫn muốn nạp lại.', ghi:false};   /* 3.135 */
  if(cu) return {lop:'vang', chu:'Ô '+slKyChu(kq.ky)+' đã có (nạp '+ngayVNsl((cu.luc||'').slice(0,10))+', '+cu.soDong+' dòng) — tích để THAY, bản cũ vào thùng rác Drive.', ghi:false};
  var cb = kq.canhBao.concat(kq.canKhai ? ['Ngày số liệu do anh khai (trong file không ghi).'] : []);   /* 3.143 */
  return {lop:'ok', chu:cb.length ? cb.join(' ') : 'Đọc đúng.', ghi:true};
}
function slXemTruoc(){
  var dong = SL_NAP.map(function(kq, i){
    var tt = slTrangThai(kq), coDL = !kq.loi && !!kq.rows;
    var bo = kq.bo ? ['trong','tieuDe','tong','ky','sai'].filter(function(k){ return kq.bo[k]; }).map(function(k){ return kq.bo[k]+' '+SL_BO_CHU[k]; }).join(', ') : '';
    var lap = kq.bo && kq.bo.trung ? '+ '+kq.bo.trung+' dòng lặp giữ riêng' : '';
    return '<tr class="sl-xt-'+tt.lop+'"><td><input type="checkbox" class="sl-tich" data-i="'+i+'"'+(tt.ghi?' checked':'')+(coDL && kq.ky ? '' : ' disabled')+'></td>'+
      '<td class="sl-xt-ten" title="'+coChuHTML(kq.ten)+'">'+coChuHTML(kq.ten)+'<small>'+(kq.kich ? kichCo(kq.kich) : '')+(kq.sheet ? ' · sheet '+coChuHTML(kq.sheet)+', cột ở dòng '+kq.hang : '')+'</small></td>'+
      '<td><select onchange="slDoiLoai('+i+',this.value)"><option value="">— chọn —</option>'+SL_LOAI.filter(function(L){ return !L.bo && !L.an; }).map(function(L){ return '<option value="'+L.k+'"'+(kq.loai===L.k?' selected':'')+'>'+coChuHTML(L.ten)+'</option>'; }).join('')+'</select></td>'+
      '<td><input type="'+(slChonNgay(kq.loai) ? 'date' : 'month')+'" value="'+((slTuy(kq.loai) ? kq.ngay : kq.ky)||'')+'" onchange="slDoiKy('+i+',this.value)"><small>'+(kq.nguonKy ? 'theo '+coChuHTML(kq.nguonKy==='anh chọn' && kq.canKhai ? 'anh khai' : kq.nguonKy) : '')+'</small>'+
        (kq.canKhai && !kq.ky && kq.goiYTen ? '<button class="sl-goi-y" onclick="slDoiKy('+i+',\''+slGoiYKy(kq)+'\')" title="Ngày trên tên file (thường là ngày xuất) — chỉ dùng khi anh chắc đúng là ngày số liệu">Tên file: '+ngayVNsl(kq.goiYTen)+' — dùng</button>' : '')+'</td>'+
      '<td>'+(coDL ? kq.rows.length+' dòng'+(bo ? '<small>bỏ '+bo+'</small>' : '')+(lap ? '<small>'+lap+'</small>' : '') : '')+'</td>'+
      '<td>'+(coDL ? coChuHTML(slTomTat(kq.loai, kq.tong)) : '')+'</td>'+
      '<td class="sl-xt-tt">'+coChuHTML(tt.chu)+'</td></tr>';
  }).join('');
  moHop('<div class="hop-tit">📥 Nạp cả bộ — xem trước</div>'+
    '<div class="hop-phu">App đọc từng file: nhận loại theo nội dung (biểu TW theo tiêu đề + hàng mốc cột, file khác theo các cột), kỳ theo ngày <b>trong file</b>; file không ghi ngày → anh khai ở ô Kỳ (tên file chỉ gợi ý). Ngày cuối tháng vào ô tháng; Mẫu 31 / file TW xuất giữa tháng vào ô theo ngày; Mẫu 10 luôn theo ngày. Nạp 1 bộ của 1 tháng hay 1 loại nhiều tháng đều được. Anh sửa loại / kỳ nếu cần, tích file muốn ghi nhận.</div>'+
    '<div class="sl-xt-cuon"><table class="sl-xt"><thead><tr><th></th><th>File</th><th>Loại</th><th>Kỳ</th><th>Dòng lấy</th><th>Tổng</th><th>Kiểm tra</th></tr></thead><tbody>'+dong+'</tbody></table></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="slGhiDaTich()">✓ Ghi nhận các file đã tích</button></div>', true);
}
function slDoiLoai(i, k){ var kq = SL_NAP[i]; if(!kq || !kq.sheets) return; slPhanTich(kq, k||''); slXemTruoc(); }
function slDoiKy(i, v){
  var kq = SL_NAP[i]; if(!kq) return;
  if(slTuy(kq.loai)){ if(!/^\d{4}-\d{2}-\d{2}$/.test(v||'')) return; if(kq.ngay!==v){ kq.ngay = v; kq.nguonKy = 'anh chọn'; } kq.ky = slKyTu(slLoai(kq.loai), v); return slXemTruoc(); }   /* 3.90 */
  if(slLaNgay(kq.loai)){ if(!/^\d{4}-\d{2}-\d{2}$/.test(v||'')) return; kq.ky = v; if(kq.ngay!==v){ kq.ngay = v; kq.nguonKy = 'anh chọn'; } return slXemTruoc(); }   /* 3.87 */
  if(!/^\d{4}-\d{2}$/.test(v||'')) return;
  kq.ky = v; if(!kq.ngay || kq.ngay.slice(0,7)!==v){ kq.ngay = tdnCuoiKy(v); kq.nguonKy = 'anh chọn'; }
  slXemTruoc();
}
function slGhiDaTich(){
  var ds = Array.prototype.map.call(document.querySelectorAll('.sl-tich:checked'), function(c){ return SL_NAP[+c.getAttribute('data-i')]; })
    .filter(function(kq){ return kq && !kq.loi && kq.ky && kq.rows; });
  if(!ds.length) return bao('Chưa tích file nào đọc được.', 3);
  /* một ô chỉ một file */
  var ga = {}; for(var i=0;i<ds.length;i++){ var k = slKhoa(ds[i].loai, ds[i].ky); if(ga[k]) return bao('Có 2 file cùng ô '+slLoai(ds[i].loai).ten+' '+slKyChu(ds[i].ky)+' — bỏ tích một file.', 5); ga[k] = 1; }
  dongHop(); batChay(true, 'Đang ghi nhận '+ds.length+' file…');
  var xong = [];
  ds.reduce(function(p, kq, i){ return p.then(function(){ dangLam('Đang ghi nhận '+(i+1)+'/'+ds.length+': '+slLoai(kq.loai).ten.split(' · ')[0]+' '+slKyChu(kq.ky)+' (lưu máy → chờ lên Drive)…'); return slGhi(kq).then(function(t){ xong.push(t); }); }); }, Promise.resolve())   /* 3.136: tiến độ từng file */
  .then(function(){
    tatChay(); SL_NAP = []; SL_KY = ds.map(function(x){ return slThang(x.ky); }).sort().pop(); SL_LECH = 0;   /* 3.86: mở kỳ mới nhất vừa nạp */
    bao('Đã ghi nhận '+xong.length+' file: '+xong.join(' · ')+'.', 6);
    if(nganHienTai!==7) doiNgan(7); else veSoLieu(); slSauNap(ds);
  }).catch(function(e){ tatChay(); baoLoi('Ghi nhận lỗi: '+(e && e.message || e)); });
}
/* nạp từng file: anh chọn loại + kỳ trước, app đọc nội dung kiểm lần cuối */
function slNapMot(loai, ky){
  if(loai && slLoai(loai).bo) loai = '';
  var kyMd = ky || SL_KY || slKyMoi() || ngayISO(nay()).slice(0,7), laNgay = slChonNgay(loai || SL_LOAI[0].k);
  kyMd = laNgay ? (slTuy(loai || SL_LOAI[0].k) && kyMd.length===7 ? tdnCuoiKy(kyMd) : slNgayMacDinh(kyMd)) : slThang(kyMd);   /* 3.90: file TW / Mẫu 31 mặc định ngày cuối tháng */
  moHop('<div class="hop-tit">📄 Nạp từng file</div>'+
    '<div class="hop-phu">Anh chọn loại và ngày số liệu (file TW / Mẫu 31: ngày cuối tháng = số chốt tháng; Mẫu 10: ngày nạp), rồi chọn file. App vẫn đọc nội dung để kiểm: sai loại thì chặn, ngày trong file khác thì báo.</div>'+
    '<div class="o"><label>Loại file</label><select id="sl-m-loai" onchange="slNapMotLoai(this.value)">'+SL_LOAI.filter(function(L){ return !L.bo && !L.an; }).map(function(L){ return '<option value="'+L.k+'"'+(L.k===loai?' selected':'')+'>'+coChuHTML(L.ten)+'</option>'; }).join('')+'</select></div>'+
    '<div class="o"><label id="sl-m-ky-nhan">'+(laNgay ? 'Ngày số liệu' : 'Kỳ')+'</label><input id="sl-m-ky" type="'+(laNgay ? 'date' : 'month')+'" value="'+kyMd+'"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="slNapMotChon()">Chọn file…</button></div>');
}
function slNapMotLoai(loai){   /* 3.87: đổi loại → ô kỳ đổi tháng ↔ ngày */
  var i = document.getElementById('sl-m-ky'), n = document.getElementById('sl-m-ky-nhan'); if(!i) return;
  var v = i.value, ngay = slChonNgay(loai);
  if(ngay && i.type!=='date'){ i.type = 'date'; i.value = slTuy(loai) ? tdnCuoiKy(slThang(v)) : slNgayMacDinh(v); }
  else if(!ngay && i.type==='date'){ i.type = 'month'; i.value = slThang(v); }
  if(n) n.textContent = ngay ? 'Ngày số liệu' : 'Kỳ';
}
function slNapMotChon(){
  var loai = document.getElementById('sl-m-loai').value, ky = document.getElementById('sl-m-ky').value;
  if(!slKyHopLe(loai, ky)) return bao(slChonNgay(loai) ? 'Anh chọn ngày số liệu.' : 'Anh chọn kỳ (tháng/năm).', 3);
  slChonFile(function(files){ slNapMotDoc(files[0], loai, ky); });
}
function slNapMotDoc(file, loai, ky){
  dongHop(); batChay(true, 'Đang đọc '+file.name+'…');
  slDocFile(file, loai).then(function(kq){ tatChay(); slKiemMot(kq, loai, ky); });
}
function slKiemMot(kq, loai, ky){
  SL_NAP = [kq];
  if(slChonNgay(loai) && String(ky||'').length===7) ky = kq.ngay || (slTuy(loai) ? tdnCuoiKy(ky) : slNgayMacDinh(ky));   /* 3.87: từ nút "đổi loại" (kỳ tháng) sang loại theo ngày */
  var L = slLoai(loai), h = '<div class="hop-tit">📄 '+coChuHTML(L.ten)+' · '+slKyChu(ky)+' — kiểm lần cuối</div><div class="hop-phu">'+coChuHTML(kq.ten)+'</div>';
  if(kq.loi){
    h += '<div class="sl-bao do">✕ '+coChuHTML(kq.loi)+'</div>'+
      '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button>'+(kq.goiY ? '<button class="nho" onclick="slPhanTich(SL_NAP[0],\''+kq.goiY+'\');slKiemMot(SL_NAP[0],\''+kq.goiY+'\',\''+ky+'\')">Đổi sang “'+coChuHTML(slLoai(kq.goiY).ten)+'”</button>' : '')+'</div>';
    return moHop(h, true);
  }
  var trongFile = kq.trongFile ? kq.trongFile.slice(0,7) : '';
  if(slChonNgay(loai)){   /* 3.87: loại theo ngày — so NGÀY theo file (trong file / tên file) với ngày anh chọn · 3.90: cả file TW / Mẫu 31 */
    trongFile = kq.ngay || '';
    if(trongFile && trongFile!==ky){
      h += '<div class="sl-bao vang">⚠ Theo file ('+coChuHTML(kq.nguonKy||'')+') là ngày <b>'+ngayVNsl(trongFile)+'</b>, anh đang chọn <b>'+ngayVNsl(ky)+'</b>.</div>'+
        '<label class="nk-tich"><input type="radio" name="sl-ky-chon" value="'+trongFile+'" checked> Theo file: '+ngayVNsl(trongFile)+'</label>'+
        '<label class="nk-tich"><input type="radio" name="sl-ky-chon" value="'+ky+'"> Giữ ngày anh chọn: '+ngayVNsl(ky)+'</label>';
    } else { kq.ky = ky; if(kq.ngay!==ky){ kq.ngay = ky; kq.nguonKy = 'anh chọn'; } }
  } else if(trongFile && trongFile!==ky){
    h += '<div class="sl-bao vang">⚠ Trong file ghi ngày <b>'+ngayVNsl(kq.trongFile)+'</b> (kỳ '+kyVN(trongFile)+'), anh đang chọn kỳ <b>'+kyVN(ky)+'</b>.</div>'+
      '<label class="nk-tich"><input type="radio" name="sl-ky-chon" value="'+trongFile+'" checked> Theo file: '+kyVN(trongFile)+'</label>'+
      '<label class="nk-tich"><input type="radio" name="sl-ky-chon" value="'+ky+'"> Giữ kỳ anh chọn: '+kyVN(ky)+'</label>';
  } else {
    kq.ky = ky;
    if(!trongFile){ kq.ngay = (kq.ngay && kq.ngay.slice(0,7)===ky) ? kq.ngay : tdnCuoiKy(ky); kq.nguonKy = kq.nguonKy==='tên file' && kq.ngay.slice(0,7)===ky ? 'tên file' : 'anh chọn'; }
  }
  var cu = SLM.bang[slKhoa(loai, slTuy(loai) ? slKyTu(L, trongFile || ky) : (trongFile || ky))];
  h += '<div class="sl-tom"><div class="sl-tom-dong"><b>'+kq.rows.length+' dòng dữ liệu</b><small>'+coChuHTML(slTomTat(loai, kq.tong))+
    (kq.sheet ? ' · sheet '+coChuHTML(kq.sheet)+', tên cột ở dòng '+kq.hang : '')+'</small></div></div>'+
    (kq.canhBao.length ? '<div class="sl-bao vang">'+coChuHTML(kq.canhBao.join(' '))+'</div>' : '')+
    (cu ? '<div class="sl-bao vang">Ô này đã có (nạp '+ngayVNsl((cu.luc||'').slice(0,10))+', '+cu.soDong+' dòng) — ghi nhận sẽ THAY, bản cũ vào thùng rác Drive.</div>' : '')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="slGhiMot()">✓ Ghi nhận</button></div>';
  moHop(h, true);
}
function slGhiMot(){
  var kq = SL_NAP[0]; if(!kq || kq.loi) return;
  var r = document.querySelector('input[name="sl-ky-chon"]:checked');
  if(r){ kq.ky = r.value;
    if(slChonNgay(kq.loai)){ if(kq.ngay!==kq.ky){ kq.ngay = kq.ky; kq.nguonKy = 'anh chọn'; } }
    else if(!kq.ngay || kq.ngay.slice(0,7)!==kq.ky){ kq.ngay = tdnCuoiKy(kq.ky); kq.nguonKy = 'anh chọn'; } }
  dongHop(); batChay(true, 'Đang ghi nhận…');
  slGhi(kq).then(function(t){ tatChay(); SL_NAP = []; SL_KY = slThang(kq.ky); bao('Đã ghi nhận '+t+'.', 4); if(nganHienTai!==7) doiNgan(7); else veSoLieu(); slSauNap([kq]); })
    .catch(function(e){ tatChay(); baoLoi('Ghi nhận lỗi: '+(e && e.message || e)); });
}
/* file sao kê đã nạp ở tab Tháng trước đây → đọc vào Số liệu (file cũ giữ nguyên) */
function slDocMucCu(id, loai, ky){
  var m = (D.duLieu||[]).find(function(x){ return x.id===id; }); if(!m) return;
  batChay(true, 'Đang lấy file '+(m.tenMoi||'')+'…');
  layNoiDung(m).then(function(b){
    if(!b){ tatChay(); return baoLoi('Không lấy được file (chưa nối Drive?).'); }
    var f = new File([b], m.tenMoi||m.tenCu||'file.xlsx', {type:b.type||''});
    tatChay(); slNapMotDoc(f, loai, ky);
  });
}

/* ---------- 13. TRA KHÁCH HÀNG (ô tìm) + thẻ khách hàng ---------- */
function slTimKH(q, toiDa){
  if(!SL_TIM.length) return [];
  var qq = slChuan(q); if(qq.length<2) return [];
  var so = qq.replace(/ /g,''), laSo = /^\d+$/.test(so), ra = [];
  var nsQ = '', x = String(q).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/); if(x) nsQ = x[3]+'-'+hai(+x[2])+'-'+hai(+x[1]);
  var tu = qq.split(' ');
  for(var i=0;i<SL_TIM.length;i++){
    var r = SL_TIM[i], d = 0;
    if(nsQ){ if(r.ns===nsQ) d = 80; }
    else if(laSo){
      if(so.length>=4 && r.c.indexOf(so)>=0) d = r.c===so ? 100 : (r.c.slice(-so.length)===so ? 90 : 60);
      else if(so.length>=4 && r.m.indexOf(so)===0) d = r.m===so ? 100 : 70;
      else if(so.length>=8 && r.k.indexOf(so)>=0) d = r.k.indexOf(' '+so)>=0 ? 95 : 55;   /* 3.86: số khế ước (cả món đã tất toán) */
      else if(so.length>=6 && r.s && r.s.indexOf(so.replace(/^84/,'0'))>=0) d = 85;   /* 3.86: số điện thoại */
      else if(so.length===4 && r.ns.slice(0,4)===so) d = 30;
    } else if(tu.every(function(w){ return r.t.indexOf(w)>=0; })){
      d = 40 + tu.filter(function(w){ return r.t.indexOf(' '+w)>=0; }).length*10;
    }
    if(d) ra.push({r:r, d:d});
  }
  return ra.sort(function(a,b){ return b.d-a.d || (a.r.ten<b.r.ten ? -1 : 1); }).slice(0, toiDa||8).map(function(x){ return x.r; });
}
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

