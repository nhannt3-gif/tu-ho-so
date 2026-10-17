/* ===== 3.231 BẢN ĐIỆN THOẠI — GIAO DIỆN (Framework7, kiểu iOS) =====
   Màn khóa PIN (tự viết) → app Framework7: 🔎 Tra cứu khách · 🗺 Địa bàn theo cấp (PGD → Xã → Điểm GD → Hội → Tổ → Khách) · ⚙ Cài đặt.
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
  function batDau(){ DT.khiKhoa = function(){ PIN = {nhap:'', buoc:'mo', dau:''}; el('app').style.visibility = 'hidden'; veKhoa('Đã khóa — nhập mã PIN'); };
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
    var t = app.toast.create({text:'Đang lấy số liệu từ Drive…', position:'center'}); t.open();
    return DT.taiGoi().then(function(kq){ t.close(); app.toast.create({text:kq.moi ? 'Đã cập nhật số liệu '+kyChu() : 'Số liệu đã mới nhất', closeTimeout:2000}).open(); app.views.main.router.refreshPage(); },
      function(er){ t.close(); app.dialog.alert(e(er.message), dau ? 'Chưa có số liệu' : 'Chưa cập nhật được'); });
  }
  function kyChu(){ var g = DT.goi(); return g ? 'Mẫu 31 '+ng(g.ngay || g.ky) : 'chưa có số liệu'; }
  function trang(ten, noi, lui){ return '<div class="page" data-name="'+ten+'"><div class="navbar"><div class="navbar-bg"></div><div class="navbar-inner sliding">'+
    (lui ? '<div class="left"><a href="#" class="link back"><i class="icon icon-back"></i><span class="if-not-md">Lùi</span></a></div>' : '')+
    '<div class="title">'+noi.tieu+'</div>'+(noi.phai ? '<div class="right">'+noi.phai+'</div>' : '')+'</div></div><div class="page-content">'+noi.than+'</div></div>'; }
  function the(s, ds){ var g = DT.goi(); return '<div class="dt-the"><div class="dt-dn">'+tr(s.dn)+'</div><div class="dt-so">'+
    [[s.ho, 'hộ'], [s.to, 'tổ'], [s.mon, 'món']].map(function(x){ return '<span><b>'+x[0].toLocaleString('vi-VN')+'</b> '+x[1]+'</span>'; }).join('')+'</div>'+
    '<div class="dt-qh"><span class="'+(s.qh ? 'do' : '')+'">Quá hạn <b>'+tr(s.qh)+'</b> ('+pt(s.qh, s.dn)+')</span><span>Khoanh <b>'+tr(s.kn)+'</b></span></div>'+
    '<div class="dt-ghi">'+e(kyChu())+(g && g.pgd ? ' · '+e(g.pgd) : '')+'</div></div>'; }
  function dong(href, ten, phu, so, lop){ return '<li><a href="'+href+'" class="item-link item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title'+(lop ? ' '+lop : '')+'">'+ten+'</div><div class="item-after">'+so+'</div></div>'+(phu ? '<div class="item-subtitle">'+phu+'</div>' : '')+'</div></a></li>'; }
  function trong(chu){ return '<div class="block block-strong inset dt-trong">'+chu+'</div>'; }
  /* 🔎 Tra cứu */
  function trTra(){ var g = DT.goi();
    return trang('tra', {tieu:'Tra cứu khách', phai:'<a href="#" class="link dt-dongbo">⟳</a>', than:
      '<div class="dt-tim"><input type="search" id="dt-tim" placeholder="Tên (không dấu được), CCCD, mã KH, SĐT, ấp" autocomplete="off"></div>'+
      '<div class="dt-ghi dt-ky">'+e(kyChu())+(g ? ' · '+g.kh.length.toLocaleString('vi-VN')+' khách' : '')+'</div><div id="dt-kq">'+(g ? '' : trong('Chưa có số liệu — bấm ⟳ để lấy từ Drive.'))+'</div>'}); }
  function veKQ(q){ var o = el('dt-kq'); if(!o) return; if(String(q||'').trim().length<2){ o.innerHTML = ''; return; }
    var r = DT.timKH(q, 80), g = DT.goi();
    o.innerHTML = r.ds.length ? '<div class="list media-list inset"><ul>'+r.ds.map(function(k){ var t = g.to[k[7]] || {}, dn = k[10].reduce(function(a, m){ return a+(m[4]||0); }, 0);
        return dong('/kh/'+encodeURIComponent(k[0])+'/', e(k[1]), e([k[2] ? 'sinh '+String(k[2]).slice(0, 4) : '', k[6], t.ten].filter(Boolean).join(' · ')), dn ? tr(dn) : 'tất nợ'); }).join('')+'</ul></div>'+
        (r.du>r.ds.length ? '<div class="dt-ghi">… còn '+(r.du-r.ds.length)+' khách — gõ thêm để thu hẹp</div>' : '')
      : trong('Không thấy khách khớp "'+e(q)+'".'); }
  /* 👤 Khách */
  function trKH(ma){ var k = DT.kh(ma), g = DT.goi(); if(!k) return trang('kh', {tieu:'Khách', than:trong('Không thấy khách.')}, 1);
    var t = g.to[k[7]] || {}, mon = k[10], dn = mon.reduce(function(a, m){ return a+(m[4]||0); }, 0);
    var o = function(nhan, gt){ return gt ? '<li><div class="item-content"><div class="item-inner"><div class="item-title">'+nhan+'</div><div class="item-after">'+gt+'</div></div></div></li>' : ''; };
    return trang('kh', {tieu:e(k[1]), than:
      '<div class="block-title">Nhân thân</div><div class="list inset dt-kv"><ul>'+o('Mã KH', e(k[0]))+o('Ngày sinh', ng(k[2]))+o('CCCD', e(k[3]))+o('Ngày cấp', ng(k[4]))+
        o('Điện thoại', k[5] ? '<a class="link external" href="tel:'+e(String(k[5]).replace(/[^\d+]/g, ''))+'">'+e(k[5])+'</a>' : '')+o('Ấp', e(k[6]))+o('Vợ / chồng', e(k[8]))+o('TK 105', k[9] ? dg(k[9]) : '')+'</ul></div>'+
      '<div class="block-title">Tổ</div><div class="list inset dt-kv"><ul>'+o('Tổ', e(t.ten))+o('Tổ trưởng', e(t.tt))+o('ĐT tổ trưởng', t.sdt ? '<a class="link external" href="tel:'+e(String(t.sdt).replace(/[^\d+]/g, ''))+'">'+e(t.sdt)+'</a>' : '')+
        o('Hội', e(t.tenHoi))+o('Điểm GD', e(t.tenDiem))+o('Xã', e(t.tenXa))+'</ul></div>'+
      '<div class="block-title">Món vay ('+mon.length+') · dư nợ '+tr(dn)+'</div>'+mon.map(function(m){
        return '<div class="dt-the dt-mon'+((m[5]||0)>0 || (m[6]||0)>0 ? ' canh' : '')+'"><div class="dt-mon-dau"><b>'+e((g.ct||{})[m[0]] || m[0])+'</b><span>'+e(m[1])+'</span></div>'+
          '<div class="dt-mon-ct"><span>Vay '+ng(m[2])+'</span><span>Giải ngân '+dg(m[3])+'</span><span>Dư nợ <b>'+dg(m[4])+'</b></span>'+(m[7] ? '<span>Hạn '+ng(m[7])+'</span>' : '')+
          (m[5] ? '<span class="do">Quá hạn '+dg(m[5])+'</span>' : '')+(m[6] ? '<span class="do">Khoanh '+dg(m[6])+'</span>' : '')+'</div></div>'; }).join('')}, 1); }
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
  /* ⚙ Cài đặt */
  function trCD(){ var C = DT.ch;
    return trang('cd', {tieu:'Cài đặt', than:'<div class="list inset"><ul>'+
      '<li><a href="#" class="item-link item-content dt-dongbo"><div class="item-inner"><div class="item-title">⟳ Lấy số liệu mới từ Drive</div><div class="item-after">'+e(kyChu())+'</div></div></a></li>'+
      '<li><a href="#" class="item-link item-content" id="dt-doipin"><div class="item-inner"><div class="item-title">🔑 Đổi mã PIN</div></div></a></li>'+
      '<li><a href="#" class="item-link item-content" id="dt-khoa"><div class="item-inner"><div class="item-title">🔒 Khóa ngay</div></div></a></li>'+
      '<li><a href="#" class="item-link item-content" id="dt-may"><div class="item-inner"><div class="item-title">🖥 Mở bản máy tính</div></div></a></li></ul></div>'+
      '<div class="block-title">Drive</div><div class="list inset"><ul><li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Thư mục gốc trên Drive</div><div class="item-input-wrap"><input id="dt-tm" type="text" value="'+e(C.thuMuc || 'Tủ hồ sơ')+'"></div></div></li></ul></div>'+
      '<div class="list inset"><ul><li><a href="#" class="item-link item-content" id="dt-xoa"><div class="item-inner"><div class="item-title do">🗑 Xóa dữ liệu trên điện thoại này</div></div></a></li></ul></div>'+
      '<div class="block dt-ghi">Số liệu khách lưu trên máy dạng mã hóa (khóa theo PIN); để yên 5 phút hoặc ẩn app 2 phút → tự khóa. Sai PIN 10 lần → xóa dữ liệu trên máy.</div>'}); }
  function gan(page){ var $ = function(s){ return page.el.querySelector(s); };
    Array.prototype.forEach.call(page.el.querySelectorAll('.dt-dongbo'), function(a){ a.onclick = function(ev){ ev.preventDefault(); dongBo(); }; });
    if($('#dt-tim')){ var hen; $('#dt-tim').oninput = function(){ var v = this.value; clearTimeout(hen); hen = setTimeout(function(){ veKQ(v); }, 200); }; }
    if($('#dt-khoa')) $('#dt-khoa').onclick = function(ev){ ev.preventDefault(); DT.khoa(); };
    if($('#dt-may')) $('#dt-may').onclick = function(ev){ ev.preventDefault(); try { localStorage.setItem('tuhoso_ban', 'may'); } catch(er){} location.href = 'index.html'; };
    if($('#dt-tm')) $('#dt-tm').onchange = function(){ DT.ch.thuMuc = this.value.trim() || 'Tủ hồ sơ'; DT.chLuu(); };
    if($('#dt-doipin')) $('#dt-doipin').onclick = function(ev){ ev.preventDefault(); app.dialog.password('Mã PIN mới (4–8 số)', 'Đổi PIN', function(p){ DT.datPIN(p).then(function(){ DT.ch.dai = String(p).length; DT.chLuu(); app.toast.create({text:'Đã đổi PIN', closeTimeout:1500}).open(); }, function(er){ app.dialog.alert(e(er.message)); }); }); };
    if($('#dt-xoa')) $('#dt-xoa').onclick = function(ev){ ev.preventDefault(); app.dialog.confirm('Xóa số liệu và PIN trên điện thoại này?', 'Xóa dữ liệu', function(){ DT.xoaMay().then(function(){ location.reload(); }); }); };
  }
  var TUYEN = [
    {path:'/', async:function(c){ c.resolve({content:trTra()}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/kh/:ma/', async:function(c){ c.resolve({content:trKH(decodeURIComponent(c.to.params.ma))}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/db/:xa/:diem/:hoi/:to/', async:function(c){ c.resolve({content:trDB(c.to.params)}); }, on:{pageInit:function(ev, page){ gan(page); }}},
    {path:'/cd/', async:function(c){ c.resolve({content:trCD()}); }, on:{pageInit:function(ev, page){ gan(page); }}}
  ];
  return {batDau:batDau, app:function(){ return app; }, veKQ:veKQ, dongBo:dongBo};
})();
xongTV.then(function(){ if(typeof Framework7==='undefined'){ document.getElementById('khoa').innerHTML = '<div class="khoa-dau"><div class="khoa-tieu">Chưa tải được giao diện — kiểm tra mạng rồi mở lại.</div></div>'; return; } DTG.batDau(); });
