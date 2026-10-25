/* ===== 3.231 BẢN ĐIỆN THOẠI — GIAO DIỆN (Framework7, kiểu iOS) =====
   Màn khóa PIN (tự viết) → app Framework7: 🔎 Tra cứu khách · 🗺 Địa bàn theo cấp (PGD → Xã → Điểm GD → Hội → Tổ → Khách) · 🏢 Giao dịch xã (3.233) · 📄 Tài liệu = Văn bản | Scan (3.232) · ⚙ Cài đặt.
   ⬅ Lùi: nút trên thanh, vuốt từ mép trái, nút ◀ điện thoại / trình duyệt (lịch sử trình duyệt). Chữ từ gói số liệu luôn qua dtE() (không chèn HTML lạ). */
var DTG = (function(){
  var app = null, el = function(id){ return document.getElementById(id); };
  function e(s){ return String(s==null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]; }); }
  function tr(v){ return ((v||0)/1e6).toLocaleString('vi-VN', {maximumFractionDigits:1})+' tr'; }
  function dg(v){ return (v||0).toLocaleString('vi-VN')+' đ'; }
  function ng(s){ s = String(s||''); return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(8, 10)+'/'+s.slice(5, 7)+'/'+s.slice(0, 4) : s; }
  function pt(a, b){ return b ? (a*100/b).toLocaleString('vi-VN', {maximumFractionDigits:2})+'%' : '0%'; }
  function sv(d, lop){ return '<svg class="dt-svg'+(lop ? ' '+lop : '')+'" viewBox="0 0 24 24" aria-hidden="true">'+d+'</svg>'; }   /* 3.354: biểu tượng vẽ (như máy tính), thay emoji */
  var IC = {may:sv('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'), ghim:sv('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    dongbo:sv('<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>'), khach:sv('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>', 'dt-svg-lon')};
  /* ---------- màn khóa / đặt PIN ---------- */
  var PIN = {nhap:'', buoc:'mo', dau:''};
  function veKhoa(chu, loi){
    var o = el('khoa'); o.style.display = 'flex';
    var tieu = PIN.buoc==='dat1' ? 'Đặt mã PIN (4–8 số)' : PIN.buoc==='dat2' ? 'Nhập lại mã PIN' : 'Nhập mã PIN';
    o.innerHTML = '<div class="khoa-dau"><div class="khoa-logo">TH</div><div class="khoa-ten">Tủ hồ sơ</div><div class="khoa-tieu">'+e(chu || tieu)+'</div>'+
      '<div class="khoa-cham">'+[0, 1, 2, 3, 4, 5, 6, 7].slice(0, Math.max(4, PIN.nhap.length)).map(function(i){ return '<i class="'+(i<PIN.nhap.length ? 'co' : '')+'"></i>'; }).join('')+'</div>'+
      '<div class="khoa-loi">'+e(loi || '')+'</div></div><div class="khoa-phim">'+
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'xoa', '0', 'ok'].map(function(k){ return '<button data-k="'+k+'">'+(k==='xoa' ? '⌫' : k==='ok' ? '✓' : k)+'</button>'; }).join('')+'</div>'+
      (PIN.buoc==='mo' ? '<button class="khoa-quen" data-k="quen">Quên PIN?</button>' : '');
    Array.prototype.forEach.call(o.querySelectorAll('[data-k]'), function(b){ b.onclick = function(){ phim(b.getAttribute('data-k')); }; });
  }
  function phim(k){
    if(k==='quen') return quen();
    if(k==='xoa'){ PIN.nhap = PIN.nhap.slice(0, -1); return veKhoa(); }
    if(k!=='ok'){ if(PIN.nhap.length<8) PIN.nhap += k; if(PIN.buoc!=='mo' || PIN.nhap.length<4) return veKhoa(); if(PIN.nhap.length<(DT.ch.dai || 4)) return veKhoa(); }
    var p = PIN.nhap; if(p.length<4) return veKhoa('', 'PIN ít nhất 4 số');
    if(PIN.buoc==='dat1'){ PIN.dau = p; PIN.nhap = ''; PIN.buoc = 'dat2'; return veKhoa(); }
    if(PIN.buoc==='dat2'){ if(p!==PIN.dau){ PIN.buoc = 'dat1'; PIN.nhap = ''; return veKhoa('', 'Hai lần không khớp — đặt lại'); }
      return DT.datPIN(p).then(function(){ DT.ch.dai = p.length; DT.chLuu(); PIN.nhap = ''; moApp(); }, function(er){ PIN.nhap = ''; veKhoa('', er.message); }); }
    veKhoa('Đang mở…');
    DT.moKhoa(p).then(function(){ DT.ch.dai = p.length; DT.chLuu(); PIN.nhap = ''; moApp(); }, function(er){ PIN.nhap = ''; veKhoa('', er.message); });
  }
  function quen(){ if(!confirm('Xóa dữ liệu trên điện thoại này và đặt PIN mới? (Số liệu tải lại từ Drive được.)')) return; DT.xoaMay().then(function(){ PIN = {nhap:'', buoc:'dat1', dau:''}; veKhoa(); }); }
  function batDau(){ DT.khiNap = function(){ if(app) try { app.views.main.router.refreshPage(); } catch(e){} };   /* 3.342: có số liệu mới → vẽ lại trang đang mở */
    if(!DT.pinBat()){ DT.moTuDong().then(moApp, function(){ moApp(); }); return; }   /* 3.342 (anh 24/10): tạm bỏ PIN — mở thẳng */
    DT.khiKhoa = function(){ PIN = {nhap:'', buoc:'mo', dau:''}; el('app').style.visibility = 'hidden'; veKhoa('Đã khóa — nhập mã PIN'); };
    DT.coPIN().then(function(co){ PIN.buoc = co ? 'mo' : 'dat1'; veKhoa(co ? '' : 'Lần đầu: đặt mã PIN để bảo vệ số liệu khách hàng'); }); }
  /* ---------- app ---------- */
  function moApp(){
    el('khoa').style.display = 'none'; el('app').style.visibility = '';
    if(!app){ app = new Framework7({el:'#app', theme:'ios', name:'Tủ hồ sơ', colors:{primary:'#1a5fb4'}, routes:TUYEN, darkMode:'auto',
        view:{browserHistory:location.protocol!=='file:', browserHistorySeparator:'#!', iosSwipeBack:true}});
      app.on('pageBeforeIn', danhTab); app.on('pageInit', danhTab);
      app.views.create('.view-main', {url:'/'}); }
    else app.views.main.router.navigate('/', {reloadAll:true, ignoreCache:true});
    DT.lichNap().then(function(){ var o = el('dt-hom'); if(o) o.innerHTML = veHom(); });
    DT.donGhimCu();   /* 3.374: dọn file 📌 ghim cũ (bỏ xem không mạng) */   /* 3.354: không tự gọi đăng nhập Google lúc mở (iPhone chặn cửa sổ không do bấm) — nút "Tải số liệu" */
  }
  var TAB = {hom:'hom', viec:'hom', tra:'tra', kh:'tra', to:'tra', db:'tra', vanban:'vb', scan:'sc', scmoi:'sc', cd:'cd', gdx:'cd'};
  function danhTab(page){ var t = TAB[page.name], x = page.name==='xem' && page.el && page.el.querySelector('#dt-xem'); if(x) t = x.getAttribute('data-l')==='scan' ? 'sc' : 'vb';
    [].forEach.call(document.querySelectorAll('.dt-tab .tab-link'), function(a){ a.classList.toggle('tab-link-active', a.getAttribute('data-tab')===t); }); }
  function dongBo(){
    if(!app) return;
    var t = app.toast.create({destroyOnClose:true, text:'Đang lấy số liệu từ Drive…', position:'center'}); t.open();
    return DT.taiGoi().then(function(kq){ t.close(); app.toast.create({destroyOnClose:true, text:kq.moi ? 'Đã cập nhật số liệu '+kyChu() : 'Số liệu đã mới nhất', closeTimeout:2000}).open(); app.views.main.router.refreshPage(); },
      function(er){ t.close(); app.dialog.alert(e(er.message), 'Chưa lấy được số liệu'); });
  }
  function kyChu(){ var g = DT.goi(); return g ? 'Mẫu 31 '+ng(g.ngay || g.ky) : 'chưa có số liệu'; }
  function trang(ten, noi, lui){ return '<div class="page" data-name="'+ten+'"><div class="navbar"><div class="navbar-bg"></div><div class="navbar-inner sliding">'+
    (lui ? '<div class="left"><a href="#" class="link back"><i class="icon icon-back"></i><span class="if-not-md">Lùi</span></a></div>' : '')+
    '<div class="title">'+noi.tieu+'</div><div class="right">'+(noi.phai || '')+'<a href="#" class="link dt-may" title="Mở bản web (máy tính)">'+IC.may+'</a></div>'+'</div></div><div class="page-content">'+noi.than+'</div></div>'; }
  function the(s, ds){ var g = DT.goi(); return '<div class="dt-the"><div class="dt-dn">'+tr(s.dn)+'</div><div class="dt-so">'+
    [[s.ho, 'hộ'], [s.to, 'tổ'], [s.mon, 'món']].map(function(x){ return '<span><b>'+x[0].toLocaleString('vi-VN')+'</b> '+x[1]+'</span>'; }).join('')+'</div>'+
    '<div class="dt-qh"><span class="'+(s.qh ? 'do' : '')+'">Quá hạn <b>'+tr(s.qh)+'</b> ('+pt(s.qh, s.dn)+')</span><span>Khoanh <b>'+tr(s.kn)+'</b></span></div>'+
    '<div class="dt-ghi">'+e(kyChu())+(g && g.pgd ? ' · '+e(g.pgd) : '')+'</div></div>'; }
  function dong(href, ten, phu, so, lop){ return '<li><a href="'+href+'" class="item-link item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title'+(lop ? ' '+lop : '')+'">'+ten+'</div><div class="item-after">'+so+'</div></div>'+(phu ? '<div class="item-subtitle">'+phu+'</div>' : '')+'</div></a></li>'; }
  function trong(chu){ return '<div class="block block-strong inset dt-trong">'+chu+'</div>'; }
  /* 🔎 Khách — 3.343 (TK 3, Đ1; anh 24/10 "tra cứu KH của TK 2 đang làm rất ổn, em dựa vào đó làm bản cho điện thoại"):
     Tìm theo (như js/22f tcTimTheo): Tự nhận · Tên · Vợ/chồng · CCCD · Mã KH · SĐT · Khế ước · Tổ trưởng; danh sách tên + tình trạng chữ nhỏ;
     thẻ khách gọn (5 ô số · nhân thân · liên hệ · tổ & địa bàn · món vay, đến hạn tô màu như tcHanMon); thẻ tổ (như tcTheTo). Bấm số / mã để chép. */
  var TIM_THEO = [['tu', 'Tự nhận'], ['ten', 'Tên KH'], ['vc', 'Vợ/chồng'], ['cccd', 'CCCD'], ['ma', 'Mã KH'], ['sdt', 'SĐT'], ['ku', 'Khế ước'], ['tt', 'Tổ trưởng']];
  var VUA_XEM = [];   /* khách vừa xem trong lần mở app (chỉ trong bộ nhớ) */
  function theo(){ var t = DT.ch.timTheo; return TIM_THEO.some(function(x){ return x[0]===t; }) ? t : 'tu'; }
  function trTra(){ var g = DT.goi(), t = theo();
    return trang('tra', {tieu:'Khách', phai:'<a href="/db/-/-/-/-/" class="link" title="Lọc theo địa bàn">'+IC.ghim+'</a><a href="#" class="link dt-dongbo" title="Lấy số liệu mới từ Drive">'+IC.dongbo+'</a>', than:
      '<div class="dt-tim"><input type="search" id="dt-tim" placeholder="'+e(t==='tt' ? 'Tên tổ trưởng, mã tổ, SĐT' : t==='tu' ? 'Tên (không dấu được), CCCD, mã KH, SĐT, khế ước' : 'Gõ '+TIM_THEO.filter(function(x){ return x[0]===t; })[0][1])+'" autocomplete="off"></div>'+
      '<div class="dt-theo">'+TIM_THEO.map(function(x){ return '<a href="#" class="dt-chip'+(x[0]===t ? ' bat' : '')+'" data-t="'+x[0]+'">'+x[1]+'</a>'; }).join('')+'</div>'+
      '<div class="dt-ghi dt-ky">'+e(kyChu())+(g ? ' · '+g.kh.length.toLocaleString('vi-VN')+' khách · '+Object.keys(g.to).length+' tổ' : '')+'</div><div id="dt-kq">'+(g ? vuaXemHTML()+tongQuan() : rongSL())+'</div>'}); }
  function tongQuan(){ return '<div class="block-title">Tổng quan PGD</div>'+the(DT.tong(DT.dsTo({})))+'<div class="block"><a href="/db/-/-/-/-/" class="button button-outline">'+IC.ghim+' Xem theo địa bàn (Xã › Điểm › Hội › Tổ)</a></div>'; }   /* 3.354 */
  function rongSL(){ return '<div class="dt-rong">'+IC.khach+'<b>Chưa có số liệu khách hàng</b><p>Máy tính bật ⚙ Khai báo đơn vị › 💾 Sao lưu › 📱 Bản điện thoại để đẩy Mẫu 31 lên Drive. Điện thoại bấm nút dưới — lần đầu đăng nhập Google <b>đúng tài khoản của máy tính</b>.</p>'+
    '<a href="#" class="button button-fill button-large dt-dongbo">Tải số liệu từ Drive</a></div>'; }
  function tinhTrang(k){ var mon = k[10], con = mon.filter(function(m){ return (m[4]||0)>0; }), qh = mon.some(function(m){ return (m[5]||0)>0 || (m[6]||0)>0; });
    return qh ? '<small class="do">quá hạn / khoanh</small>' : con.length ? '<small>vay '+con.length+' món</small>' : '<small class="dt-xam">'+(mon.length ? 'tất nợ' : 'chỉ gửi TK')+'</small>'; }
  function dongKH(k){ var g = DT.goi(), t = g.to[k[7]] || {}, dn = k[10].reduce(function(a, m){ return a+(m[4]||0); }, 0);
    return dong('/kh/'+encodeURIComponent(k[0])+'/', e(k[1])+' '+tinhTrang(k), e([k[2] ? 'sinh '+String(k[2]).slice(0, 4) : '', k[6], t.ten].filter(Boolean).join(' · ')), dn ? tr(dn) : ''); }
  function vuaXemHTML(){ var ds = VUA_XEM.map(function(ma){ return DT.kh(ma); }).filter(Boolean); if(!ds.length) return '';
    return '<div class="block-title">Vừa xem</div><div class="list media-list inset"><ul>'+ds.map(dongKH).join('')+'</ul></div>'; }
  function so(s){ return String(s||'').replace(/\D/g, ''); }
  function timTheo(q, t){ var g = DT.goi(); if(!g) return {ds:[], du:0}; var Q = DT.boDau(q), d = so(q);
    if(t==='tu'){ var r = DT.timKH(q, 80); if(r.ds.length || d.length<3) return r; t = 'ku'; }   /* tự nhận: tìm như cũ, số không khớp tên → khế ước */
    var khop = function(k){ if(t==='ten') return (' '+DT.boDau(k[1])).indexOf(' '+Q)>=0; if(t==='vc') return !!k[8] && (' '+DT.boDau(k[8])).indexOf(' '+Q)>=0;
      if(t==='cccd') return d.length>=3 && so(k[3]).indexOf(d)>=0; if(t==='ma') return d.length>=3 && so(k[0]).indexOf(d)>=0; if(t==='sdt') return d.length>=3 && so(k[5]).indexOf(d)>=0;
      if(t==='ku') return d.length>=3 && k[10].some(function(m){ return so(m[1]).indexOf(d)>=0; }); return false; };
    var ra = g.kh.filter(khop); return {ds:ra.slice(0, 80), du:ra.length}; }
  function toTim(q){ var g = DT.goi(), Q = DT.boDau(q), d = so(q); return Object.keys(g.to).map(function(m){ var t = g.to[m]; t.ma = m; return t; }).filter(function(t){
      if(t.tt1) return false; if(!Q) return true; if(d.length>=3) return m3(t.ma, d) || m3(t.sdt, d) || m3(t.ttKH, d); return (' '+DT.boDau(t.tt || t.ten)).indexOf(' '+Q)>=0; })
    .sort(function(a, b){ return String(a.tt || a.ten).localeCompare(String(b.tt || b.ten), 'vi'); }); }
  function m3(v, d){ return so(v).indexOf(d)>=0; }
  function dongTo(t){ return dong('/to/'+encodeURIComponent(t.ma)+'/', e(t.tt || t.ten || t.ma)+' <small>'+e(t.ma)+'</small>', e([t.ap, t.tenXa, t.tenHoi].filter(Boolean).join(' · ')), DT.khTo(t.ma).length+' TV'); }
  function veKQ(q){ var o = el('dt-kq'); if(!o || !DT.goi()) return; var t = theo(), v = String(q||'').trim();
    if(t==='tt'){ var ds = toTim(v), it = ds.slice(0, 100);
      o.innerHTML = ds.length ? '<div class="list media-list inset"><ul>'+it.map(dongTo).join('')+'</ul></div>'+(ds.length>it.length ? '<div class="dt-ghi">… còn '+(ds.length-it.length)+' tổ</div>' : '') : trong('Không thấy tổ khớp "'+e(v)+'".'); return; }
    if(v.length<2){ o.innerHTML = vuaXemHTML()+tongQuan(); return; }
    var r = timTheo(v, t), toKhop = t==='tu' ? toTim(v).length : 0;
    o.innerHTML = (toKhop && toKhop<=20 ? '<div class="block"><a href="#" class="button button-small dt-sang-to">🏘 '+toKhop+' tổ khớp — xem tổ</a></div>' : '')+
      (r.ds.length ? '<div class="list media-list inset"><ul>'+r.ds.map(dongKH).join('')+'</ul></div>'+(r.du>r.ds.length ? '<div class="dt-ghi">… còn '+(r.du-r.ds.length)+' khách — gõ thêm để thu hẹp</div>' : '')
        : trong('Không thấy khách khớp "'+e(v)+'".')); }
  function hanMon(m){   /* như tcHanMon (js/22f): quá hạn đỏ · ≤ 30 ngày cam · ≤ 90 ngày vàng; GH = hạn gia hạn */
    var d = m[7], x = String(d||'').match(/^(\d{4})-(\d{2})-(\d{2})/); if(!x) return d ? '<span>Hạn '+ng(d)+'</span>' : '';
    var h = new Date(), con = Math.round((new Date(+x[1], +x[2]-1, +x[3]) - new Date(h.getFullYear(), h.getMonth(), h.getDate()))/864e5), xong = !((m[4]||0)>0);
    var muc = xong ? '' : con<0 ? 'do' : con<=30 ? 'cam' : con<=90 ? 'vang' : '';
    return '<span class="dt-han'+(muc ? ' dt-han-'+muc : '')+'">Hạn '+ng(d)+(m[10] ? ' <small>GH</small>' : '')+(xong ? '' : ' · '+(con<0 ? 'quá '+(-con)+' ngày' : con===0 ? 'hôm nay' : 'còn '+con+' ngày'))+'</span>'; }
  function oSo(ds){ return '<div class="dt-oso">'+ds.map(function(x){ return '<div class="'+(x[2] ? x[2] : '')+'"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>'; }).join('')+'</div>'; }
  function kv(nhan, gt, chep){ return gt ? '<li><div class="item-content"><div class="item-inner"><div class="item-title">'+nhan+'</div><div class="item-after'+(chep ? ' dt-chep" data-chep="'+e(chep) : '')+'">'+gt+'</div></div></div></li>' : ''; }
  function goi(sdt){ var d = String(sdt||'').replace(/[^\d+]/g, ''); return d ? '<a class="link external" href="tel:'+e(d)+'">☎ '+e(sdt)+'</a> · <a class="link external" href="https://zalo.me/'+e(d.replace(/^\+?84/, '0'))+'">Zalo</a>' : ''; }
  function trKH(ma){ var k = DT.kh(ma), g = DT.goi(); if(!k) return trang('kh', {tieu:'Khách', than:trong('Không thấy khách.')}, 1);
    VUA_XEM = [ma].concat(VUA_XEM.filter(function(x){ return x!==ma; })).slice(0, 10);
    var t = g.to[k[7]] || {}, mon = k[10], sum = function(i){ return mon.reduce(function(a, m){ return a+(m[i]||0); }, 0); }, dn = sum(4), con = mon.filter(function(m){ return (m[4]||0)>0; }).length;
    return trang('kh', {tieu:e(k[1]), than:
      oSo([['Dư nợ', tr(dn)], ['Món còn nợ', con+'/'+mon.length], ['Quá hạn', tr(sum(5)), sum(5) ? 'do' : ''], ['Khoanh', tr(sum(6)), sum(6) ? 'do' : ''], ['Lãi tồn', dg(sum(9)), sum(9) ? 'cam' : '']])+
      '<div class="block-title">Nhân thân · liên hệ</div><div class="list inset dt-kv"><ul>'+kv('Mã KH', e(k[0]), k[0])+kv('Ngày sinh', ng(k[2]))+kv('CCCD', e(k[3]), k[3])+kv('Ngày cấp', ng(k[4]))+
        kv('Vợ / chồng', e(k[8]))+kv('Điện thoại', goi(k[5]))+kv('Ấp', e(k[6]))+kv('TK 105', k[9] ? dg(k[9]) : '')+'</ul></div>'+
      '<div class="block-title">Tổ &amp; địa bàn</div><div class="list inset dt-kv"><ul>'+(t.ten ? '<li><a href="/to/'+encodeURIComponent(k[7])+'/" class="item-link item-content"><div class="item-inner"><div class="item-title">Tổ</div><div class="item-after">'+e(t.ten)+' ›</div></div></a></li>' : '')+
        kv('Tổ trưởng', e(t.tt))+kv('ĐT tổ trưởng', goi(t.sdt))+kv('Hội', e(t.tenHoi))+kv('Điểm GD', e(t.tenDiem))+kv('Xã', e(t.tenXa))+'</ul></div>'+
      '<div class="block-title">Món vay ('+mon.length+')</div>'+mon.map(function(m){
        return '<div class="dt-the dt-mon'+((m[5]||0)>0 || (m[6]||0)>0 ? ' canh' : '')+'"><div class="dt-mon-dau"><b>'+e((g.ct||{})[m[0]] || m[0])+'</b><span class="dt-chep" data-chep="'+e(m[1])+'">'+e(m[1])+'</span></div>'+
          '<div class="dt-mon-ct">'+hanMon(m)+'<span>Vay '+ng(m[2])+'</span><span>GN '+dg(m[3])+'</span><span>Dư nợ <b>'+dg(m[4])+'</b></span>'+(m[9] ? '<span class="cam">Lãi tồn '+dg(m[9])+'</span>' : '')+
          (m[5] ? '<span class="do">Quá hạn '+dg(m[5])+'</span>' : '')+(m[6] ? '<span class="do">Khoanh '+dg(m[6])+'</span>' : '')+'</div></div>'; }).join('')}, 1); }
  function trTo(ma){ var g = DT.goi(), t = g && g.to[ma]; if(!t) return trang('to', {tieu:'Tổ', than:trong('Không thấy tổ.')}, 1);
    var kh = DT.khTo(ma), co = kh.filter(function(k){ return k[10].some(function(m){ return (m[4]||0)>0; }); }).length;
    return trang('to', {tieu:e(t.tt || t.ten), than:
      oSo([['Thành viên', kh.length], ['Có dư nợ', co], ['Không dư nợ', kh.length-co], ['Tổng dư nợ', tr(t.dn)], ['Quá hạn', tr(t.qh), t.qh ? 'do' : '']])+
      '<div class="block-title">Tổ trưởng · địa bàn</div><div class="list inset dt-kv"><ul>'+kv('Mã tổ', e(ma), ma)+kv('Tổ trưởng', e(t.tt))+kv('Mã KH TT', e(t.ttKH), t.ttKH)+kv('Điện thoại', goi(t.sdt))+
        kv('Ấp', e(t.ap))+kv('Hội', e(t.tenHoi))+kv('Điểm GD', e(t.tenDiem))+kv('Xã', e(t.tenXa))+'</ul></div>'+
      '<div class="block-title">Thành viên ('+kh.length+')</div><div class="list media-list inset"><ul>'+kh.map(dongKH).join('')+'</ul></div>'}, 1); }
  /* 📅 Hôm nay — 3.354 (anh 24/10: "tối ưu tab hôm nay bao gồm lịch và ghi chú trước"; "giao diện tương tự máy tính nhưng lược bỏ các chức năng phức tạp"):
     lịch tháng như máy tính (âm lịch, T7 / CN đỏ, chấm có việc) · việc của ngày chọn (tick xong, thêm / sửa / xóa) · ghi chú dòng của ngày (thêm, tick, xóa) · sắp tới 7 ngày.
     Cùng dữ liệu Lịch máy tính (DTL, DT.lich*): sửa ở đâu cũng cất máy ngay, nút ⟳ đồng bộ 2 chiều qua Drive. Bỏ: mẩu màu / ảnh / hoàn tác / kéo thả (chỉ máy tính). */
  var H = {nam:0, thang:0, chon:''}, THU_NGAN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  function homDau(){ if(H.chon) return; var d = new Date(); H.nam = d.getFullYear(); H.thang = d.getMonth(); H.chon = DTL.iso(d); }
  function chonNgay(s){ H.chon = s; var d = DTL.ngay(s); H.nam = d.getFullYear(); H.thang = d.getMonth(); }
  function lichDL(){ return DT.lich() || DTL.rong(); }
  function gio(s){ var d = new Date(s); return isNaN(d) ? '' : ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)+' '+('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2); }
  function trHom(){ homDau(); return trang('hom', {tieu:'Hôm nay', phai:'<a href="#" class="link dt-lichdb" title="Đồng bộ lịch với máy tính">'+IC.dongbo+'</a>', than:'<div id="dt-hom">'+veHom()+'</div>'}); }
  function veThang(Ld){ var nay = DTL.iso(new Date()), dau = new Date(H.nam, H.thang, 1), lui = (dau.getDay()+6)%7, bd = DTL.cong(DTL.iso(dau), -lui);
    var hang = Math.ceil((lui+new Date(H.nam, H.thang+1, 0).getDate())/7), o = [];
    for(var i=0;i<hang*7;i++) o.push(oNgay(Ld, DTL.cong(bd, i), nay));
    return '<div class="dt-lich"><div class="dt-lich-dau"><a href="#" class="dt-thang" data-d="-1" title="Tháng trước">‹</a><b>Tháng '+(H.thang+1)+', '+H.nam+'</b><a href="#" class="dt-thang" data-d="1" title="Tháng sau">›</a>'+
      '<a href="#" class="dt-chip dt-vehomnay">Hôm nay</a></div><div class="dt-lich-thu">'+['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(function(x){ return '<span>'+x+'</span>'; }).join('')+'</div>'+
      '<div class="dt-lich-o">'+o.join('')+'</div></div>'; }
  function oNgay(Ld, s, nay){ var d = DTL.ngay(s), a = DTL.am(s), vs = DTL.viecNgay(Ld, s), con = vs.filter(function(v){ return !DTL.xong(v, s); }), cl = ['dt-ng'];
    if(d.getMonth()!==H.thang) cl.push('ngoai'); if(s===nay) cl.push('nay'); if(s===H.chon) cl.push('chon'); if(d.getDay()===0) cl.push('cn'); if(d.getDay()===6) cl.push('t7');
    var cham = !vs.length && !DTL.dongNgay(Ld, s).length ? '' : '<s class="'+(con.some(function(v){ return v.luuY; }) ? 'luuy' : vs.length && !con.length ? 'xong' : '')+'"></s>';
    return '<a href="#" class="'+cl.join(' ')+'" data-iso="'+s+'"><b>'+d.getDate()+'</b><i>'+(a.ngay===1 ? '1/'+a.thang : a.ngay)+'</i>'+cham+'</a>'; }
  function veHom(){ var Ld = lichDL(), nay = DTL.iso(new Date()), c = H.chon, d = DTL.ngay(c), a = DTL.am(c), g = DT.goi(), vn = DTL.viecNgay(Ld, c), dn = DTL.dongNgay(Ld, c), sap = [];
    var dau = '<div class="dt-homdau"><div><div class="dt-homthu">'+(c===nay ? 'Hôm nay · ' : '')+DTL.THU[d.getDay()]+'</div><div class="dt-homngay">'+ng(c)+'</div><div class="dt-homam">Âm lịch '+a.ngay+'/'+a.thang+(a.nhuan ? ' (nhuận)' : '')+'</div></div>'+
      '<a href="/tra/" class="dt-homsl" data-reload-all="true">'+(g ? '<b>'+g.kh.length.toLocaleString('vi-VN')+'</b>khách<small>'+e(kyChu())+'</small>' : '<b>—</b>khách<small>chưa có số liệu</small>')+'</a></div>';
    var viec = '<div class="dt-bt"><span>Việc · '+ng(c).slice(0, 5)+'</span><a href="/viec/moi/" class="dt-them">＋ Thêm việc</a></div>'+(vn.length ? '<div class="list inset dt-viec"><ul>'+vn.map(function(v){ var x = DTL.xong(v, c);
      return '<li class="'+(x ? 'xong' : '')+'"><div class="item-content"><a href="#" class="dt-tick" data-id="'+e(v.id)+'" title="Xong / chưa xong">'+(x ? '✓' : '')+'</a><a href="/viec/'+encodeURIComponent(v.id)+'/" class="item-inner">'+
        '<div class="item-title">'+(v.luuY ? '<span class="dt-luuy">★</span> ' : '')+e(v.ten)+'</div><div class="item-after">'+(v.lap && v.lap!=='mot' ? e(DTL.LAP[v.lap]) : '')+'</div></a></div></li>'; }).join('')+'</ul></div>'
      : '<div class="dt-trongnho">Chưa có việc — bấm ＋ Thêm việc.</div>');
    var gc = '<div class="dt-bt"><span>Ghi chú · '+ng(c).slice(0, 5)+'</span></div><div class="list inset dt-viec dt-dong"><ul>'+dn.map(function(m){ var x = !!m.xong;
      return '<li class="'+(x ? 'xong' : '')+'"><div class="item-content"><a href="#" class="dt-tickd" data-id="'+e(m.id)+'" title="Xong / chưa xong">'+(x ? '✓' : '')+'</a><div class="item-inner"><div class="item-title dt-nd">'+e(m.nd)+'</div>'+
        '<div class="item-after"><a href="#" class="dt-xoad" data-id="'+e(m.id)+'" title="Xóa dòng">✕</a></div></div></div></li>'; }).join('')+
      '<li><div class="item-content dt-dongmoi"><input type="text" id="dt-dongmoi" placeholder="Thêm dòng ghi chú…" enterkeyhint="done" autocomplete="off"><a href="#" class="button button-small button-fill dt-themdong">Thêm</a></div></li></ul></div>'+
      DTL.mauNgay(Ld, c).map(function(m){ return '<div class="dt-mau dt-mau-'+e(m.mau || 'trang')+'">'+e(m.nd)+'</div>'; }).join('');
    for(var i=1;i<=7;i++) sapToi(Ld, DTL.cong(nay, i), sap);
    var st = '<div class="dt-bt"><span>Sắp tới · 7 ngày</span></div>'+(sap.length ? '<div class="list inset dt-kv"><ul>'+sap.slice(0, 20).map(function(x){ return '<li><a href="#" class="item-link item-content dt-sangngay" data-iso="'+x[0]+'"><div class="item-inner">'+
      '<div class="item-title">'+(x[1].luuY ? '<span class="dt-luuy">★</span> ' : '')+e(x[1].ten)+'</div><div class="item-after">'+THU_NGAN[DTL.ngay(x[0]).getDay()]+' '+ng(x[0]).slice(0, 5)+'</div></div></a></li>'; }).join('')+'</ul></div>'
      : '<div class="dt-trongnho">Không có việc nào trong 7 ngày tới.</div>');
    return dau+veThang(Ld)+viec+gc+st+'<div class="dt-ghi dt-homdb">'+(DT.ch.lichLuc ? 'Đã đồng bộ với máy tính lúc '+gio(DT.ch.lichLuc) : 'Chưa đồng bộ với máy tính — bấm ⟳ trên cùng')+(DT.ch.lichCho ? ' · <b class="cam">có thay đổi chưa đẩy lên Drive</b>' : '')+'</div>'; }
  function sapToi(Ld, s, ra){ DTL.viecNgay(Ld, s).forEach(function(v){ if(!DTL.xong(v, s)) ra.push([s, v]); }); }
  function themDong(o){ var i = o.querySelector('#dt-dongmoi'), nd = String(i && i.value || '').trim(); if(!nd) return false;
    var Ld = lichDL(), t = new Date().toISOString(), ds = DTL.dongNgay(Ld, H.chon), cuoi = ds[ds.length-1];
    Ld.note.push({id:DTL.idMoi(), ngay:H.chon, nd:nd, mau:'trang', kieu:'dong', xong:'', thuTu:cuoi ? (cuoi.thuTu===undefined ? ds.length-1 : cuoi.thuTu)+1 : 0, taoLuc:t, suaLuc:t}); DT.lichDoi(); return true; }
  function trViec(id){ var Ld = lichDL(), v = id==='moi' ? null : Ld.viec.filter(function(x){ return x.id===id; })[0];
    if(id!=='moi' && !v) return trang('viec', {tieu:'Việc', than:trong('Không thấy việc (có thể đã xóa ở máy khác).')}, 1);
    v = v || {ten:'', ngay:H.chon, lap:'mot', luuY:false};
    var o = function(nhan, gt){ return '<li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">'+nhan+'</div><div class="item-input-wrap">'+gt+'</div></div></li>'; };
    return trang('viec', {tieu:id==='moi' ? 'Thêm việc' : 'Sửa việc', than:'<div class="list inset dt-form"><ul>'+
      o('Việc', '<textarea id="dt-vten" placeholder="Vd: Giao ban tổ 042, nộp báo cáo tháng…">'+e(v.ten)+'</textarea>')+o('Ngày', '<input type="date" id="dt-vngay" value="'+e(v.ngay)+'">')+
      o('Lặp lại', '<select id="dt-vlap">'+Object.keys(DTL.LAP).map(function(k){ return '<option value="'+k+'"'+((v.lap || 'mot')===k ? ' selected' : '')+'>'+DTL.LAP[k]+'</option>'; }).join('')+'</select>')+
      '<li><label class="item-checkbox item-content"><input type="checkbox" id="dt-vluuy"'+(v.luuY ? ' checked' : '')+'><i class="icon icon-checkbox"></i><div class="item-inner"><div class="item-title">★ Lưu ý (chấm đỏ trên lịch)</div></div></label></li></ul></div>'+
      '<div class="block"><a href="#" class="button button-fill button-large dt-vluu" data-id="'+e(id)+'">Lưu</a></div>'+
      (id!=='moi' ? '<div class="block"><a href="#" class="button button-large button-outline color-red dt-vxoa" data-id="'+e(id)+'">Xóa việc</a></div>' : '')}, 1); }
  function ganHom(page, $, tat){ var veLai = function(){ var o = $('#dt-hom'); if(o) o.innerHTML = veHom(); };
    if(!DT.lich()) DT.lichNap().then(veLai);
    var bao = function(t){ app.toast.create({destroyOnClose:true, text:t, closeTimeout:1800}).open(); }, tim = function(ds, id){ return ds.filter(function(x){ return x.id===id; })[0]; };
    page.el.addEventListener('click', function(ev){ var t = ev.target, a; if(!t.closest) return;
      if((a = t.closest('.dt-ng')) || (a = t.closest('.dt-sangngay'))){ ev.preventDefault(); chonNgay(a.getAttribute('data-iso')); return veLai(); }
      if((a = t.closest('.dt-thang'))){ ev.preventDefault(); var m = new Date(H.nam, H.thang+(+a.getAttribute('data-d')), 1); H.nam = m.getFullYear(); H.thang = m.getMonth(); return veLai(); }
      if((a = t.closest('.dt-vehomnay'))){ ev.preventDefault(); chonNgay(DTL.iso(new Date())); return veLai(); }
      if((a = t.closest('.dt-tick'))){ ev.preventDefault(); var v = tim(lichDL().viec, a.getAttribute('data-id')); if(v){ DTL.doiXong(v, H.chon); DT.lichDoi(); veLai(); } return; }
      if((a = t.closest('.dt-tickd'))){ ev.preventDefault(); var n = tim(lichDL().note, a.getAttribute('data-id')); if(n){ n.xong = n.xong ? '' : new Date().toISOString(); n.suaLuc = new Date().toISOString(); DT.lichDoi(); veLai(); } return; }
      if((a = t.closest('.dt-xoad'))){ ev.preventDefault(); DTL.xoaNote(lichDL(), a.getAttribute('data-id')); DT.lichDoi(); veLai(); return bao('Đã xóa dòng'); }
      if((a = t.closest('.dt-themdong'))){ ev.preventDefault(); if(themDong(page.el)){ veLai(); var i = $('#dt-dongmoi'); if(i) i.focus(); } } });
    page.el.addEventListener('keydown', function(ev){ if(ev.target.id!=='dt-dongmoi' || ev.key!=='Enter') return; ev.preventDefault(); if(themDong(page.el)){ veLai(); var i = $('#dt-dongmoi'); if(i) i.focus(); } });
    tat('.dt-lichdb').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); var t = app.toast.create({destroyOnClose:true, text:'Đang đồng bộ lịch với máy tính…', position:'center'}); t.open();
      DT.lichDongBo().then(function(n){ t.close(); bao(n ? 'Đã nhận '+n+' thay đổi từ máy tính' : 'Lịch đã khớp với máy tính'); veLai(); }, function(er){ t.close(); veLai(); app.dialog.alert(e(er.message), 'Chưa đồng bộ được lịch'); }); }; }); }
  function ganViec(page, $){ var ve = function(){ app.views.main.router.back('/', {force:true, ignoreCache:true}); };
    var nut = $('.dt-vluu'); if(nut) nut.onclick = function(ev){ ev.preventDefault(); var ten = $('#dt-vten').value.trim(), ngay = $('#dt-vngay').value || H.chon, id = nut.getAttribute('data-id'), Ld = lichDL(), t = new Date().toISOString();
      if(!ten) return app.dialog.alert('Gõ nội dung việc.'); if(!/^\d{4}-\d{2}-\d{2}$/.test(ngay)) ngay = H.chon;
      var v = id==='moi' ? null : Ld.viec.filter(function(x){ return x.id===id; })[0];
      if(!v){ v = {id:DTL.idMoi(), taoLuc:t}; Ld.viec.push(v); }
      v.ten = ten; v.ngay = ngay; v.lap = $('#dt-vlap').value; v.luuY = !!$('#dt-vluuy').checked; v.suaLuc = t; chonNgay(ngay); DT.lichDoi(); ve(); };
    var xoa = $('.dt-vxoa'); if(xoa) xoa.onclick = function(ev){ ev.preventDefault(); var id = xoa.getAttribute('data-id'), Ld = lichDL(), v = Ld.viec.filter(function(x){ return x.id===id; })[0]; if(!v) return ve();
      var het = function(){ DTL.xoaViec(Ld, id); DT.lichDoi(); ve(); };
      if(!v.lap || v.lap==='mot') return app.dialog.confirm('Xóa việc "'+e(v.ten)+'"?', 'Xóa việc', het);
      app.dialog.create({title:'Xóa việc lặp', text:e(v.ten), buttons:[{text:'Chỉ ngày '+ng(H.chon).slice(0, 5), onClick:function(){ v.bo = (v.bo || []).concat([H.chon]); v.suaLuc = new Date().toISOString(); DT.lichDoi(); ve(); }},
        {text:'Cả chuỗi lặp', color:'red', onClick:het}, {text:'Thôi'}], verticalButtons:true}).open(); }; }
  /* 🗺 Địa bàn */
  function trDB(p){ var x = function(v){ return v && v!=='-' ? decodeURIComponent(v) : ''; }, loc = {xa:x(p.xa), diem:x(p.diem), hoi:x(p.hoi)}, to = x(p.to), g = DT.goi();
    if(!g) return trang('db', {tieu:'Địa bàn', than:rongSL()});
    var u = function(a, b, c, d){ return '/db/'+[a, b, c, d].map(function(v){ return encodeURIComponent(v || '-'); }).join('/')+'/'; };
    var ds = DT.dsTo(loc), tieu = 'Toàn PGD', cap = 'xa', ten = function(f){ var t = ds[0] || {}; return f==='xa' ? t.tenXa : f==='diem' ? (t.tt1 ? 'Vay trực tiếp' : t.tenDiem) : t.tenHoi; };
    if(to){ var t = g.to[to] || {}, kh = DT.khTo(to);
      return trang('db', {tieu:e(t.ten || to), than:the(DT.tong([t]))+'<div class="block-title">'+e([t.ap, t.tt ? 'TT '+t.tt : '', t.sdt].filter(Boolean).join(' · '))+'</div>'+
        '<div class="list media-list inset"><ul>'+kh.map(function(k){ var dn = k[10].reduce(function(a, m){ return a+(m[4]||0); }, 0), qh = k[10].reduce(function(a, m){ return a+(m[5]||0)+(m[6]||0); }, 0);
          return dong('/kh/'+encodeURIComponent(k[0])+'/', e(k[1]), e([k[2] ? 'sinh '+String(k[2]).slice(0, 4) : '', k[10].length+' món'].filter(Boolean).join(' · ')), dn ? tr(dn) : 'tất nợ', qh ? 'do' : ''); }).join('')+'</ul></div>'}, 1); }
    if(loc.hoi){ cap = 'to'; tieu = ten('hoi'); } else if(loc.diem){ cap = 'hoi'; tieu = ten('diem'); } else if(loc.xa){ cap = 'diem'; tieu = ten('xa'); }
    var nh = DT.nhom(loc, cap);
    return trang('db', {tieu:e(tieu || 'Địa bàn'), than:the(DT.tong(ds))+'<div class="block-title">'+{xa:'Xã', diem:'Điểm giao dịch', hoi:'Hội', to:'Tổ'}[cap]+' ('+nh.length+')</div><div class="list media-list inset"><ul>'+
      nh.map(function(n){ var s = n.s, href = cap==='xa' ? u(n.k) : cap==='diem' ? u(loc.xa, n.k) : cap==='hoi' ? u(loc.xa, loc.diem, n.k) : u(loc.xa, loc.diem, loc.hoi, n.k);
        var t0 = n.ds[0] || {}, phu = cap==='to' ? [t0.ap, t0.tt ? 'TT '+t0.tt : ''].filter(Boolean).join(' · ')+' · '+s.ho+' hộ' : s.to+' tổ · '+s.ho+' hộ';
        return dong(href, e(n.ten), e(phu)+(s.qh ? ' · <span class="do">QH '+tr(s.qh)+'</span>' : '')+(s.kn ? ' · K '+tr(s.kn) : ''), tr(s.dn)); }).join('')+'</ul></div>'}, !!loc.xa); }
  /* 📄 Văn bản · 📷 Scan — 3.344 (Đ2): chip năm · loại; bấm mục → trang xem trong app (PDF vẽ bằng pdf.js — iOS mở tab ngoài kém); danh sách cất máy.
     3.374 (anh 26/10 "chỉ xem khi có mạng"): bỏ 📌 Ghim xem không mạng — mở file luôn tải từ Drive. */
  var SC = {anh:[], pdf:null};
  function vbLoc(){ var x = DT.ch.vbLoc; return x && typeof x==='object' ? x : {}; }
  function locThem(loai, ds){ if(loai!=='vanban') return ds; var L = vbLoc();
    return ds.filter(function(m){ return (!L.nam || String(m.ngay || '').slice(0, 4)===L.nam) && (!L.loai || (m.loai || '')===L.loai); }); }
  function chipVB(){ var ds = DT.ds('vanban') || [], L = vbLoc(), nam = {}, loai = {};
    ds.forEach(function(m){ var y = String(m.ngay || '').slice(0, 4); if(/^\d{4}$/.test(y)) nam[y] = (nam[y]||0)+1; if(m.loai) loai[m.loai] = (loai[m.loai]||0)+1; });
    var c = function(k, v, chu, bat){ return '<a href="#" class="dt-chip dt-vbc'+(bat ? ' bat' : '')+'" data-k="'+k+'" data-v="'+e(v)+'">'+chu+'</a>'; };
    return '<div class="dt-theo">'+c('tat', '', 'Tất cả', !L.nam && !L.loai)+
      Object.keys(nam).sort().reverse().slice(0, 6).map(function(y){ return c('nam', y, y, L.nam===y); }).join('')+
      Object.keys(loai).sort(function(a, b){ return loai[b]-loai[a]; }).slice(0, 8).map(function(x){ return c('loai', x, e(x), L.loai===x); }).join('')+'</div>'; }
  function trDS(loai){ var vb = loai==='vanban', ds = DT.ds(loai);
    return trang(loai, {tieu:vb ? 'Văn bản' : 'Scan', phai:'<a href="#" class="link dt-tai" data-l="'+loai+'" title="Lấy danh sách mới">'+IC.dongbo+'</a>', than:
      (vb ? '' : '<div class="block"><a href="/sc/moi/" class="button button-fill button-large">📷 Chụp / chọn ảnh → PDF</a></div>')+
      (vb ? '<div class="block"><label class="button button-outline">＋ Gửi file vào app (khay chờ)<input type="file" id="dt-them" style="display:none"></label></div>' : '')+
      '<div class="dt-tim"><input type="search" id="dt-loc" data-l="'+loai+'" placeholder="'+(vb ? 'Số hiệu, trích yếu, loại' : 'Tên khách, mã KH, ấp, tổ')+'" autocomplete="off"></div>'+
      (vb ? '<div id="dt-vbc">'+(ds ? chipVB() : '')+'</div>' : '')+
      '<div id="dt-ds">'+(ds ? veDS(loai, '') : trong('Đang mở danh sách đã cất trong máy… (chưa có thì bấm ⟳ để lấy từ Drive)'))+'</div>'}); }
  function veDS(loai, q){ var ds = locThem(loai, DT.locDS(loai, q)), vb = loai==='vanban', it = ds.slice(0, 150);
    if(!ds.length) return trong('Không có mục khớp.');
    return '<div class="list media-list inset"><ul>'+it.map(function(m){ var ten = vb ? (m.soHieu || m.trichYeu || m.tenFile || 'Văn bản') : (m.ten || 'Scan');
      var phu = vb ? [ng(m.ngay), m.loai, m.trichYeu && m.soHieu ? m.trichYeu : ''].filter(Boolean).join(' · ') : [ng(m.ngay || String(m.taoLuc || '').slice(0, 10)), m.che==='tailieu' ? 'Tài liệu' : m.che ? 'CCCD / thẻ' : '', m.maKH, m.ap, m.to].filter(Boolean).join(' · ');
      return '<li><a href="/xem/'+loai+'/'+encodeURIComponent(m.id)+'/" class="item-link item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title">'+e(ten)+'</div><div class="item-after">'+(m.driveId ? '' : '<small>chưa lên Drive</small>')+'</div></div><div class="item-subtitle">'+e(phu)+'</div></div></a></li>'; }).join('')+'</ul></div>'+
      (ds.length>it.length ? '<div class="dt-ghi">… còn '+(ds.length-it.length)+' mục — gõ thêm để thu hẹp</div>' : ''); }
  function timMuc(loai, id){ return (DT.ds(loai) || []).filter(function(m){ return String(m.id)===String(id); })[0] || null; }
  function tenTep(m, bl){ return String((m && (m.soHieu || m.ten || m.trichYeu)) || 'tep').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 80)+(!bl.type || /pdf/.test(bl.type) ? '.pdf' : /png/.test(bl.type) ? '.png' : /jpe?g/.test(bl.type) ? '.jpg' : ''); }
  function trXem(loai, id){ var m = timMuc(loai, id), vb = loai==='vanban', ten = m ? (vb ? (m.soHieu || m.trichYeu || 'Văn bản') : (m.ten || 'Scan')) : 'Tệp';
    return trang('xem', {tieu:e(ten), than:(m && vb && m.trichYeu ? '<div class="dt-ghi">'+e([ng(m.ngay), m.loai, m.trichYeu].filter(Boolean).join(' · '))+'</div>' : '')+
      '<div class="block dt-xem-nut">'+'<a href="#" class="button button-small button-outline dt-gui">📤 Gửi · ⬇ Lưu máy</a></div>'+
      '<div id="dt-xem" class="dt-xem" data-l="'+loai+'" data-id="'+e(id)+'">'+trong('Đang mở…')+'</div>'}, 1); }
  var PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/';
  function napPDF(){ if(window.pdfjsLib && pdfjsLib.GlobalWorkerOptions.workerSrc) return Promise.resolve(window.pdfjsLib);
    return Promise.all([napMotTV({ten:'dtpdf-3.11.174', url:PDFJS+'pdf.min.js'}), napMotTV({ten:'dtpdfw-3.11.174', url:PDFJS+'pdf.worker.min.js', giuNguyen:true})]).then(function(){
      if(!window.pdfjsLib) throw new Error('Chưa tải được bộ xem PDF — kiểm tra mạng (lần đầu cần mạng, sau đó cất trong máy)');
      pdfjsLib.GlobalWorkerOptions.workerSrc = TV['dtpdfw-3.11.174'] ? URL.createObjectURL(new Blob([TV['dtpdfw-3.11.174']], {type:'text/javascript'})) : PDFJS+'pdf.worker.min.js';
      return window.pdfjsLib; }); }
  function vePDF(o, bl){ return napPDF().then(function(lib){ return bl.arrayBuffer().then(function(b){ return lib.getDocument({data:new Uint8Array(b)}).promise; }); }).then(function(pdf){
    o.innerHTML = '<div class="dt-ghi">'+pdf.numPages+' trang</div>'; var w = Math.min(o.clientWidth || 360, 900), tl = Math.min(2, window.devicePixelRatio || 1);
    var trang1 = function(i){ return pdf.getPage(i).then(function(pg){ var v0 = pg.getViewport({scale:1}), k = w/v0.width, v = pg.getViewport({scale:k*tl}), c = document.createElement('canvas');
      c.width = v.width; c.height = v.height; c.style.width = Math.round(v.width/tl)+'px'; c.className = 'dt-trang'; o.appendChild(c); return pg.render({canvasContext:c.getContext('2d'), viewport:v}).promise; }); };
    var p = Promise.resolve(); for(var i=1;i<=pdf.numPages;i++) (function(i){ p = p.then(function(){ return trang1(i); }); })(i); return p.then(function(){ return pdf.numPages; }); }); }
  var XEM = {bl:null, m:null};
  function veXem(page){ var o = page.el.querySelector('#dt-xem'); if(!o) return; var loai = o.getAttribute('data-l'), id = o.getAttribute('data-id'), m = timMuc(loai, id);
    XEM = {bl:null, m:m};
    Promise.resolve().then(function(){ if(!m || !m.driveId) throw new Error(m ? 'Mục này chưa lên Drive — mở ở máy tính đã quét / lưu.' : 'Không thấy mục — bấm ⟳ ở danh sách.'); return DT.taiFile(m.driveId); })
      .then(function(bl){ XEM.bl = bl;
        if(/^image\//.test(bl.type)){ var u = URL.createObjectURL(bl); o.innerHTML = '<img class="dt-trang" src="'+u+'" alt="">'; return; }
        if(bl.type && !/pdf/.test(bl.type)){ o.innerHTML = trong('Tệp '+e(bl.type)+' — bấm 📤 Gửi · ⬇ Lưu máy để mở bằng app khác.'); return; }
        return vePDF(o, bl); })
      .catch(function(er){ var mat = navigator.onLine===false || /fetch|network|mạng/i.test(er && er.message || '');   /* 3.374: chỉ xem khi có mạng */
        o.innerHTML = trong(mat ? 'Chưa có mạng — văn bản chỉ xem khi có mạng. Bật mạng rồi mở lại.' : e(er.message)); }); }
  function tacVu(bl, ten, vaoApp, boXem){   /* bảng nút chuẩn: Xem · (Lưu vào app) · Lưu vào máy · Gửi · Đóng — 3.344: boXem = đang ở trang xem trong app */
    var url = URL.createObjectURL(bl), f = new File([bl], ten, {type:bl.type || 'application/pdf'});
    var nut = boXem ? [] : [{text:'👁 Xem', onClick:function(){ window.open(url, '_blank'); }}];   /* thứ tự chuẩn: Xem · Lưu vào app · Lưu vào máy · Gửi */
    if(vaoApp) nut.push({text:'💾 Lưu vào app (khay chờ)', onClick:function(){ DT.guiKhay(bl, ten).then(function(){ app.toast.create({destroyOnClose:true, text:'Đã đưa vào khay _Chờ xử lý — máy tính Nạp khay chờ để khai báo', closeTimeout:3000}).open(); }, function(er){ app.dialog.alert(e(er.message)); }); }});
    nut.push({text:'⬇ Lưu vào máy', onClick:function(){ var a = document.createElement('a'); a.href = url; a.download = ten; document.body.appendChild(a); a.click(); a.remove(); }});
    if(navigator.canShare && navigator.canShare({files:[f]})) nut.push({text:'📤 Gửi (Zalo…)', onClick:function(){ navigator.share({files:[f], title:ten}).catch(function(){}); }});
    app.actions.create({buttons:[nut.concat([{text:'Đóng', color:'red'}])]}).open(); }
  function trSCMoi(){ return trang('scmoi', {tieu:'Chụp → PDF', than:'<div class="block"><label class="button button-fill button-large">📷 Chụp / chọn ảnh<input type="file" id="dt-anh" accept="image/*" capture="environment" multiple style="display:none"></label></div>'+
    '<div class="block"><input type="text" id="dt-tenpdf" class="dt-o" placeholder="Tên file (vd: Nguyễn Văn A - CCCD)"></div><div class="dt-anh" id="dt-dsanh">'+anhHTML()+'</div>'+
    '<div class="block"><button class="button button-fill button-large" id="dt-taopdf"'+(SC.anh.length ? '' : ' disabled')+'>📄 Tạo PDF ('+SC.anh.length+' trang)</button></div>'+
    '<div class="block dt-ghi">Ảnh được thu nhỏ (cạnh dài 1600 px) trước khi ghép, mỗi ảnh 1 trang A4.</div>'}, 1); }
  function anhHTML(){ return SC.anh.map(function(a, i){ return '<div class="dt-anh-o"><img src="'+a.url+'" alt=""><button data-i="'+i+'" class="dt-bo-anh">✕</button></div>'; }).join(''); }
  function nhoAnh(f){ return new Promise(function(ok, loi){ var img = new Image(); img.onload = function(){ var k = Math.min(1, 1600/Math.max(img.width, img.height)), c = document.createElement('canvas');
    c.width = Math.round(img.width*k); c.height = Math.round(img.height*k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); c.toBlob(function(b){ ok(b); }, 'image/jpeg', 0.82); }; img.onerror = loi; img.src = URL.createObjectURL(f); }); }
  function taoPDF(){ var nap = typeof PDFLib!=='undefined' ? Promise.resolve() : napMotTV({ten:'pdflib-1.17.1', url:'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'});
    return nap.then(function(){ if(typeof PDFLib==='undefined') throw new Error('Chưa tải được bộ tạo PDF — kiểm tra mạng'); return PDFLib.PDFDocument.create(); }).then(function(doc){
      return SC.anh.reduce(function(p, a){ return p.then(function(){ return a.bl.arrayBuffer(); }).then(function(b){ return doc.embedJpg(b); }).then(function(im){
        var W = 595.28, H = 841.89, k = Math.min((W-36)/im.width, (H-36)/im.height), pg = doc.addPage([W, H]); pg.drawImage(im, {x:(W-im.width*k)/2, y:(H-im.height*k)/2, width:im.width*k, height:im.height*k}); }); }, Promise.resolve())
      .then(function(){ return doc.save(); }); }).then(function(u){ return new Blob([u], {type:'application/pdf'}); }); }
  /* 🏢 Giao dịch xã (3.233) — bản mini của máy tính chạy trong khung */
  function trGDX(){ return trang('gdx', {tieu:'Giao dịch xã', phai:'<a href="#" class="link dt-taigdx" title="Lấy bản mới">'+IC.dongbo+'</a>', than:'<div id="dt-gdx" class="dt-gdx">'+trong('Đang mở…')+'</div>'}, 1); }   /* 3.342: mở từ ⚙ › Công cụ */
  function veGDX(page){ var o = page.el.querySelector('#dt-gdx'); if(!o) return;
    DT.docGDX().then(function(h){ if(!h){ o.innerHTML = trong('Bấm ⟳ để lấy bản Giao dịch xã từ Drive (04/TD, 12/GDX, Giấy lĩnh).'); return; }
      o.innerHTML = '<iframe class="dt-gdx-khung" title="Giao dịch xã"></iframe>'; o.firstChild.srcdoc = h; }); }
  /* 📄 Tài liệu = Văn bản | Scan */
  /* ⚙ Cài đặt */
  function trCD(){ var C = DT.ch;
    return trang('cd', {tieu:'Cài đặt', than:'<div class="list inset"><ul>'+
      '<li><a href="#" class="item-link item-content dt-dongbo"><div class="item-inner"><div class="item-title">⟳ Lấy số liệu mới từ Drive</div><div class="item-after">'+e(kyChu())+'</div></div></a></li>'+
      (DT.pinBat() ? '<li><a href="#" class="item-link item-content" id="dt-doipin"><div class="item-inner"><div class="item-title">🔑 Đổi mã PIN</div></div></a></li>'+
      '<li><a href="#" class="item-link item-content" id="dt-khoa"><div class="item-inner"><div class="item-title">🔒 Khóa ngay</div></div></a></li>' : '')+
      '<li><a href="#" class="item-link item-content dt-may"><div class="item-inner"><div class="item-title">🖥 Mở bản web (máy tính)</div></div></a></li></ul></div>'+
      '<div class="block-title">Công cụ</div><div class="list inset"><ul><li><a href="/gdx/" class="item-link item-content"><div class="item-inner"><div class="item-title">🏢 Giao dịch xã (04/TD, 12/GDX, Giấy lĩnh)</div></div></a></li></ul></div>'+
      '<div class="block-title">Drive</div><div class="list inset"><ul><li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Thư mục gốc trên Drive</div><div class="item-input-wrap"><input id="dt-tm" type="text" value="'+e(C.thuMuc || 'Tủ hồ sơ')+'"></div></div></li></ul></div>'+
      '<div class="list inset"><ul><li><a href="#" class="item-link item-content" id="dt-xoa"><div class="item-inner"><div class="item-title do">🗑 Xóa dữ liệu trên điện thoại này</div></div></a></li></ul></div>'+
      '<div class="block dt-ghi">'+(DT.pinBat() ? 'Số liệu khách lưu trên máy dạng mã hóa (khóa theo PIN); để yên 5 phút hoặc ẩn app 2 phút → tự khóa. Sai PIN 10 lần → xóa dữ liệu trên máy.' : 'Đang tạm tắt PIN (anh 24/10): mở thẳng, không tự khóa — số liệu trong máy vẫn mã hóa; bảo vệ bằng khóa màn hình / Face ID của điện thoại.')+'</div>'}); }
  function gan(page){ var $ = function(s){ return page.el.querySelector(s); };
    var tat = function(sel){ var r = [].slice.call(page.el.querySelectorAll(sel)); if(page.navbarEl) r = r.concat([].slice.call(page.navbarEl.querySelectorAll(sel))); return r; };   /* 3.342: thanh tiêu đề iOS nằm ngoài trang */
    tat('.dt-may').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); try { localStorage.setItem('tuhoso_ban', 'may'); } catch(er){} location.href = 'index.html'; }; });   /* 3.342: nút 🖥 mọi trang */
    tat('.dt-dongbo').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); dongBo(); }; });
    if($('#dt-tim')){ var hen; $('#dt-tim').oninput = function(){ var v = this.value; clearTimeout(hen); hen = setTimeout(function(){ veKQ(v); }, 200); }; }
    tat('.dt-chip[data-t]').forEach(function(c){ c.onclick = function(ev){ ev.preventDefault(); DT.ch.timTheo = c.getAttribute('data-t'); DT.chLuu(); var v = ($('#dt-tim') || {}).value || '';
      app.views.main.router.refreshPage(); setTimeout(function(){ var i = el('dt-tim'); if(i){ i.value = v; veKQ(v); } }, 50); }; });   /* 3.343: Tìm theo — nhớ lựa chọn */
    page.el.addEventListener('click', function(ev){ var a = ev.target.closest && ev.target.closest('.dt-sang-to'); if(!a) return; ev.preventDefault(); var v = ($('#dt-tim') || {}).value || '';
      DT.ch.timTheo = 'tt'; DT.chLuu(); app.views.main.router.refreshPage(); setTimeout(function(){ var i = el('dt-tim'); if(i){ i.value = v; veKQ(v); } }, 50); });
    page.el.addEventListener('click', function(ev){ var c = ev.target.closest && ev.target.closest('.dt-chep'); if(!c) return; var v = c.getAttribute('data-chep'); if(!v) return;   /* bấm mã / số để chép */
      (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function(){ app.toast.create({destroyOnClose:true, text:'Đã chép '+v, closeTimeout:1500}).open(); }, function(){}); });
    if(page.name==='tra' && DT.ch.timTheo==='tt') veKQ('');
    if(page.name==='hom') ganHom(page, $, tat);
    if(page.name==='viec') ganViec(page, $);
    tat('.dt-tai').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); var l = a.getAttribute('data-l'), t = app.toast.create({destroyOnClose:true, text:'Đang lấy danh sách…', position:'center'}); t.open();
      DT.taiKhoi(l).then(function(){ t.close(); var o = page.el.querySelector('#dt-ds'); if(o) o.innerHTML = veDS(l, ($('#dt-loc') || {}).value || ''); var c = page.el.querySelector('#dt-vbc'); if(c) c.innerHTML = chipVB(); }, function(er){ t.close(); app.dialog.alert(e(er.message)); }); }; });
    if($('#dt-loc')){ var hl; $('#dt-loc').oninput = function(){ var l = this.getAttribute('data-l'), v = this.value; clearTimeout(hl); hl = setTimeout(function(){ var o = page.el.querySelector('#dt-ds'); if(o && DT.ds(l)) o.innerHTML = veDS(l, v); }, 200); }; }
    page.el.addEventListener('click', function(ev){ var c = ev.target.closest && ev.target.closest('.dt-vbc'); if(!c) return; ev.preventDefault();   /* 3.344: chip lọc văn bản */
      var k = c.getAttribute('data-k'), v = c.getAttribute('data-v'), L = vbLoc(); if(k==='tat') L = {}; else if(L[k]===v) delete L[k]; else L[k] = v;
      DT.ch.vbLoc = L; DT.chLuu(); var o = $('#dt-vbc'); if(o) o.innerHTML = chipVB(); var d = $('#dt-ds'); if(d) d.innerHTML = veDS('vanban', ($('#dt-loc') || {}).value || ''); });
    if((page.name==='vanban' || page.name==='scan') && !DT.ds(page.name)) DT.dsNap(page.name).then(function(ds){ var d = $('#dt-ds'); if(!d) return;
      d.innerHTML = ds ? veDS(page.name, ($('#dt-loc') || {}).value || '') : trong('Bấm ⟳ để lấy danh sách từ Drive.'); var c = $('#dt-vbc'); if(c && ds) c.innerHTML = chipVB(); });   /* 3.344: danh sách cất máy */
    if(page.name==='xem'){ veXem(page);
      tat('.dt-gui').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); if(!XEM.bl) return app.dialog.alert('Đợi tệp mở xong.'); tacVu(XEM.bl, tenTep(XEM.m, XEM.bl), false, true); }; }); }
    if($('#dt-them')) $('#dt-them').onchange = function(){ var f = this.files[0]; if(f) tacVu(f, f.name, true); this.value = ''; };
    if($('#dt-anh')) $('#dt-anh').onchange = function(){ var fs = Array.prototype.slice.call(this.files); this.value = '';
      Promise.all(fs.map(nhoAnh)).then(function(bs){ bs.forEach(function(b){ SC.anh.push({bl:b, url:URL.createObjectURL(b)}); }); app.views.main.router.refreshPage(); }); };
    Array.prototype.forEach.call(page.el.querySelectorAll('.dt-bo-anh'), function(b){ b.onclick = function(){ SC.anh.splice(+b.getAttribute('data-i'), 1); app.views.main.router.refreshPage(); }; });
    if($('#dt-taopdf')) $('#dt-taopdf').onclick = function(){ var ten = (($('#dt-tenpdf') || {}).value || 'Scan '+new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')).replace(/[\\/:*?"<>|]+/g, '-')+'.pdf';
      taoPDF().then(function(bl){ SC.pdf = bl; tacVu(bl, ten, true); }, function(er){ app.dialog.alert(e(er.message)); }); };
    if($('#dt-gdx')) veGDX(page);
    tat('.dt-taigdx').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); var t = app.toast.create({destroyOnClose:true, text:'Đang lấy Giao dịch xã…', position:'center'}); t.open();
      DT.taiGDX().then(function(){ t.close(); veGDX(page); }, function(er){ t.close(); app.dialog.alert(e(er.message)); }); }; });
    if($('#dt-khoa')) $('#dt-khoa').onclick = function(ev){ ev.preventDefault(); DT.khoa(); };
    if($('#dt-tm')) $('#dt-tm').onchange = function(){ DT.ch.thuMuc = this.value.trim() || 'Tủ hồ sơ'; DT.chLuu(); };
    if($('#dt-doipin')) $('#dt-doipin').onclick = function(ev){ ev.preventDefault(); app.dialog.password('Mã PIN mới (4–8 số)', 'Đổi PIN', function(p){ DT.datPIN(p).then(function(){ DT.ch.dai = String(p).length; DT.chLuu(); app.toast.create({destroyOnClose:true, text:'Đã đổi PIN', closeTimeout:1500}).open(); }, function(er){ app.dialog.alert(e(er.message)); }); }); };
    if($('#dt-xoa')) $('#dt-xoa').onclick = function(ev){ ev.preventDefault(); app.dialog.confirm('Xóa số liệu và PIN trên điện thoại này?', 'Xóa dữ liệu', function(){ DT.xoaMay().then(function(){ location.reload(); }); }); };
  }
  var TUYEN = [
    {path:'/', async:function(c){ c.resolve({content:trHom()}); }, on:{pageInit:function(ev, page){ gan(page); }}},   /* 3.354: trang đầu = Hôm nay */
    {path:'/tra/', async:function(c){ c.resolve({content:trTra()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/viec/:id/', async:function(c){ c.resolve({content:trViec(decodeURIComponent(c.to.params.id))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/to/:ma/', async:function(c){ c.resolve({content:trTo(decodeURIComponent(c.to.params.ma))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/kh/:ma/', async:function(c){ c.resolve({content:trKH(decodeURIComponent(c.to.params.ma))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/db/:xa/:diem/:hoi/:to/', async:function(c){ c.resolve({content:trDB(c.to.params)}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/gdx/', async:function(c){ c.resolve({content:trGDX()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/vb/', async:function(c){ c.resolve({content:trDS('vanban')}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/sc/', async:function(c){ c.resolve({content:trDS('scan')}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/xem/:l/:id/', async:function(c){ c.resolve({content:trXem(c.to.params.l, decodeURIComponent(c.to.params.id))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/sc/moi/', async:function(c){ c.resolve({content:trSCMoi()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/cd/', async:function(c){ c.resolve({content:trCD()}); }, on:{pageInit:function(ev, page){ gan(page); }}}
  ];
  return {batDau:batDau, app:function(){ return app; }, veKQ:veKQ, dongBo:dongBo, sc:SC, taoPDF:taoPDF};
})();
if('serviceWorker' in navigator && location.protocol==='https:') navigator.serviceWorker.register('dt-sw.js').catch(function(){});   /* 3.233: chạy không mạng (chỉ giữ tệp của bản điện thoại) */
xongTV.then(function(){ if(typeof Framework7==='undefined'){ document.getElementById('khoa').innerHTML = '<div class="khoa-dau"><div class="khoa-tieu">Chưa tải được giao diện — kiểm tra mạng rồi mở lại.</div></div>'; return; } DTG.batDau(); });
