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
      app.views.create('.view-main', {url:'/'}); }
    else app.views.main.router.navigate('/', {reloadAll:true, ignoreCache:true});
    if(!DT.goi()) dongBo(true);
  }
  function dongBo(dau){
    if(!app) return;
    var t = app.toast.create({destroyOnClose:true, text:'Đang lấy số liệu từ Drive…', position:'center'}); t.open();
    return DT.taiGoi().then(function(kq){ t.close(); app.toast.create({destroyOnClose:true, text:kq.moi ? 'Đã cập nhật số liệu '+kyChu() : 'Số liệu đã mới nhất', closeTimeout:2000}).open(); app.views.main.router.refreshPage(); },
      function(er){ t.close(); app.dialog.alert(e(er.message), dau ? 'Chưa có số liệu' : 'Chưa cập nhật được'); });
  }
  function kyChu(){ var g = DT.goi(); return g ? 'Mẫu 31 '+ng(g.ngay || g.ky) : 'chưa có số liệu'; }
  function trang(ten, noi, lui){ return '<div class="page" data-name="'+ten+'"><div class="navbar"><div class="navbar-bg"></div><div class="navbar-inner sliding">'+
    (lui ? '<div class="left"><a href="#" class="link back"><i class="icon icon-back"></i><span class="if-not-md">Lùi</span></a></div>' : '')+
    '<div class="title">'+noi.tieu+'</div><div class="right">'+(noi.phai || '')+'<a href="#" class="link dt-may" title="Mở bản web (máy tính)">🖥</a></div>'+'</div></div><div class="page-content">'+noi.than+'</div></div>'; }
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
    return trang('tra', {tieu:'Khách', phai:'<a href="/db/-/-/-/-/" class="link" title="Lọc theo địa bàn">📍</a><a href="#" class="link dt-dongbo">⟳</a>', than:
      '<div class="dt-tim"><input type="search" id="dt-tim" placeholder="'+e(t==='tt' ? 'Tên tổ trưởng, mã tổ, SĐT' : t==='tu' ? 'Tên (không dấu được), CCCD, mã KH, SĐT, khế ước' : 'Gõ '+TIM_THEO.filter(function(x){ return x[0]===t; })[0][1])+'" autocomplete="off"></div>'+
      '<div class="dt-theo">'+TIM_THEO.map(function(x){ return '<a href="#" class="dt-chip'+(x[0]===t ? ' bat' : '')+'" data-t="'+x[0]+'">'+x[1]+'</a>'; }).join('')+'</div>'+
      '<div class="dt-ghi dt-ky">'+e(kyChu())+(g ? ' · '+g.kh.length.toLocaleString('vi-VN')+' khách · '+Object.keys(g.to).length+' tổ' : '')+'</div><div id="dt-kq">'+(g ? vuaXemHTML() : trong('Chưa có số liệu — bấm ⟳ để lấy từ Drive.'))+'</div>'}); }
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
    if(v.length<2){ o.innerHTML = vuaXemHTML(); return; }
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
  /* 🗺 Địa bàn */
  function trDB(p){ var x = function(v){ return v && v!=='-' ? decodeURIComponent(v) : ''; }, loc = {xa:x(p.xa), diem:x(p.diem), hoi:x(p.hoi)}, to = x(p.to), g = DT.goi();
    if(!g) return trang('db', {tieu:'Địa bàn', than:trong('Chưa có số liệu — vào 🔎 Tra cứu bấm ⟳.')});
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
  /* 📄 Văn bản · 📷 Scan (3.232) */
  var SC = {anh:[], pdf:null};
  function trDS(loai){ var vb = loai==='vanban', ds = DT.ds(loai);
    return trang(loai, {tieu:vb ? 'Văn bản' : 'Scan', phai:'<a href="#" class="link dt-tai" data-l="'+loai+'">⟳</a>', than:
      (vb ? '' : '<div class="block"><a href="/sc/moi/" class="button button-fill button-large">📷 Chụp / chọn ảnh → PDF</a></div>')+
      (vb ? '<div class="block"><label class="button button-outline">＋ Gửi file vào app (khay chờ)<input type="file" id="dt-them" style="display:none"></label></div>' : '')+
      '<div class="dt-tim"><input type="search" id="dt-loc" data-l="'+loai+'" placeholder="'+(vb ? 'Số hiệu, trích yếu, loại' : 'Tên khách, mã KH, ấp, tổ')+'" autocomplete="off"></div>'+
      '<div id="dt-ds">'+(ds ? veDS(loai, '') : trong('Bấm ⟳ để lấy danh sách từ Drive.'))+'</div>'}); }
  function veDS(loai, q){ var ds = DT.locDS(loai, q), vb = loai==='vanban', it = ds.slice(0, 150);
    if(!ds.length) return trong('Không có mục khớp.');
    return '<div class="list media-list inset"><ul>'+it.map(function(m, i){ var ten = vb ? (m.soHieu || m.trichYeu || m.tenFile || 'Văn bản') : (m.ten || 'Scan');
      var phu = vb ? [ng(m.ngay), m.loai, m.trichYeu && m.soHieu ? m.trichYeu : ''].filter(Boolean).join(' · ') : [ng(m.ngay || String(m.taoLuc || '').slice(0, 10)), m.che==='tailieu' ? 'Tài liệu' : m.che ? 'CCCD / thẻ' : '', m.maKH, m.ap, m.to].filter(Boolean).join(' · ');
      return '<li><a href="#" class="item-link item-content dt-mo" data-l="'+loai+'" data-i="'+i+'"><div class="item-inner"><div class="item-title-row"><div class="item-title">'+e(ten)+'</div><div class="item-after">'+(m.driveId ? '' : '<small>chưa lên Drive</small>')+'</div></div><div class="item-subtitle">'+e(phu)+'</div></div></a></li>'; }).join('')+'</ul></div>'+
      (ds.length>it.length ? '<div class="dt-ghi">… còn '+(ds.length-it.length)+' mục — gõ thêm để thu hẹp</div>' : ''); }
  function moMuc(loai, i, q){ var m = DT.locDS(loai, q)[i]; if(!m) return; if(!m.driveId) return app.dialog.alert('Mục này chưa lên Drive — mở ở máy tính đã quét / lưu.');
    var t = app.toast.create({destroyOnClose:true, text:'Đang tải…', position:'center'}); t.open();
    DT.taiFile(m.driveId).then(function(bl){ t.close(); var ten = (m.soHieu || m.ten || 'tep').replace(/[\\/:*?"<>|]+/g, '-')+(/pdf/.test(bl.type) || !bl.type ? '.pdf' : ''); tacVu(bl, ten, false); }, function(er){ t.close(); app.dialog.alert(e(er.message)); }); }
  function tacVu(bl, ten, vaoApp){   /* bảng nút chuẩn: Xem · (Lưu vào app) · Lưu vào máy · Gửi · Đóng */
    var url = URL.createObjectURL(bl), f = new File([bl], ten, {type:bl.type || 'application/pdf'});
    var nut = [{text:'👁 Xem', onClick:function(){ window.open(url, '_blank'); }}];   /* thứ tự chuẩn: Xem · Lưu vào app · Lưu vào máy · Gửi */
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
  function trGDX(){ return trang('gdx', {tieu:'Giao dịch xã', phai:'<a href="#" class="link dt-taigdx">⟳</a>', than:'<div id="dt-gdx" class="dt-gdx">'+trong('Đang mở…')+'</div>'}, 1); }   /* 3.342: mở từ ⚙ › Công cụ */
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
    tat('.dt-chip').forEach(function(c){ c.onclick = function(ev){ ev.preventDefault(); DT.ch.timTheo = c.getAttribute('data-t'); DT.chLuu(); var v = ($('#dt-tim') || {}).value || '';
      app.views.main.router.refreshPage(); setTimeout(function(){ var i = el('dt-tim'); if(i){ i.value = v; veKQ(v); } }, 50); }; });   /* 3.343: Tìm theo — nhớ lựa chọn */
    page.el.addEventListener('click', function(ev){ var a = ev.target.closest && ev.target.closest('.dt-sang-to'); if(!a) return; ev.preventDefault(); var v = ($('#dt-tim') || {}).value || '';
      DT.ch.timTheo = 'tt'; DT.chLuu(); app.views.main.router.refreshPage(); setTimeout(function(){ var i = el('dt-tim'); if(i){ i.value = v; veKQ(v); } }, 50); });
    page.el.addEventListener('click', function(ev){ var c = ev.target.closest && ev.target.closest('.dt-chep'); if(!c) return; var v = c.getAttribute('data-chep'); if(!v) return;   /* bấm mã / số để chép */
      (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function(){ app.toast.create({destroyOnClose:true, text:'Đã chép '+v, closeTimeout:1500}).open(); }, function(){}); });
    if(page.name==='tra' && DT.ch.timTheo==='tt') veKQ('');
    tat('.dt-tai').forEach(function(a){ a.onclick = function(ev){ ev.preventDefault(); var l = a.getAttribute('data-l'), t = app.toast.create({destroyOnClose:true, text:'Đang lấy danh sách…', position:'center'}); t.open();
      DT.taiKhoi(l).then(function(){ t.close(); var o = page.el.querySelector('#dt-ds'); if(o) o.innerHTML = veDS(l, ($('#dt-loc') || {}).value || ''); }, function(er){ t.close(); app.dialog.alert(e(er.message)); }); }; });
    if($('#dt-loc')){ var hl; $('#dt-loc').oninput = function(){ var l = this.getAttribute('data-l'), v = this.value; clearTimeout(hl); hl = setTimeout(function(){ var o = page.el.querySelector('#dt-ds'); if(o && DT.ds(l)) o.innerHTML = veDS(l, v); }, 200); }; }
    page.el.addEventListener('click', function(ev){ var a = ev.target.closest && ev.target.closest('.dt-mo'); if(!a) return; ev.preventDefault(); moMuc(a.getAttribute('data-l'), +a.getAttribute('data-i'), ($('#dt-loc') || {}).value || ''); });
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
    {path:'/', async:function(c){ c.resolve({content:trTra()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/to/:ma/', async:function(c){ c.resolve({content:trTo(decodeURIComponent(c.to.params.ma))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/kh/:ma/', async:function(c){ c.resolve({content:trKH(decodeURIComponent(c.to.params.ma))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/db/:xa/:diem/:hoi/:to/', async:function(c){ c.resolve({content:trDB(c.to.params)}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/gdx/', async:function(c){ c.resolve({content:trGDX()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/vb/', async:function(c){ c.resolve({content:trDS('vanban')}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/sc/', async:function(c){ c.resolve({content:trDS('scan')}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/sc/moi/', async:function(c){ c.resolve({content:trSCMoi()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/cd/', async:function(c){ c.resolve({content:trCD()}); }, on:{pageInit:function(ev, page){ gan(page); }}}
  ];
  return {batDau:batDau, app:function(){ return app; }, veKQ:veKQ, dongBo:dongBo, sc:SC, taoPDF:taoPDF};
})();
if('serviceWorker' in navigator && location.protocol==='https:') navigator.serviceWorker.register('dt-sw.js').catch(function(){});   /* 3.233: chạy không mạng (chỉ giữ tệp của bản điện thoại) */
xongTV.then(function(){ if(typeof Framework7==='undefined'){ document.getElementById('khoa').innerHTML = '<div class="khoa-dau"><div class="khoa-tieu">Chưa tải được giao diện — kiểm tra mạng rồi mở lại.</div></div>'; return; } DTG.batDau(); });
