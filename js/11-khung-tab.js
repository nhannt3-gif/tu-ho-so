/* ==========================================================
   17. KHUNG CHUẨN CHO MỌI TAB
   Ba phần giống nhau ở mọi tab:
     1. Thời gian  — năm, rồi tháng trong năm
     2. Chương trình vay — cụ thể hoặc Dùng chung
     3. Tag thuộc tính — khai báo tự do trong Cài đặt
   Chỉ phần đặc thù của từng tab mới khác.
   ========================================================== */

var TAG_MAC_DINH = {
  vanBan : ['Tổ TK&VV','Giao dịch xã','Xử lý rủi ro','Huy động vốn',
            'Đổi tên hộ vay','Đổi chữ ký CCCD','HS khoanh','HS quá hạn',
            'HS 3 tháng KHĐ','Sắp xếp tổ','Phân bổ vốn'],
  bieuMau: ['Mẫu trắng','Mẫu hướng dẫn','Hồ sơ vay mới','Đổi tên hộ vay',
            'Đổi chữ ký CCCD','Xử lý rủi ro','Tổ TK&VV','Giao dịch xã'],
  duLieu : ['Cuối tháng','Cuối quý','Cuối năm','Đối chiếu'],
  ghiChu : ['Giao ban','Tập huấn','Hồ sơ - biểu mẫu','Cần xử lý','Lưu để nhớ'],
  scan   : ['CCCD','Sổ hộ khẩu','Giấy tờ nhà đất','Đơn vay đã ký',
            'Biên bản họp tổ','Đổi chữ ký CCCD','HS khoanh']
};

/* trạng thái lọc riêng cho từng tab */
var LOC = {};
function locCua(tab){
  if(!LOC[tab]) LOC[tab] = {nam:'', thang:'', ct:'', tag:'', mang:'', pham:'', hoi:'', xa:'', chua:'', hl:'', trung:''};
  return LOC[tab];
}
/* 3.77 (anh chốt: tối ưu nhưng KHÔNG để sót văn bản nào lọc không ra):
   mỗi nhóm lọc có chip "(chưa có)" gom các mục để trống thuộc tính đó; giá trị lạ (không còn trong danh mục) vẫn hiện chip */
var LOC_TRONG = '(chưa có)';
var NHAN_TRONG = {nam:'Chưa có ngày', mang:'Chưa gắn mảng', ct:'Chưa gắn CT', tag:'Chưa có tag', pham:'Chưa ghi', hoi:'Chưa ghi', xa:'Chưa khai xã'};
function locTrong(m, khoa, kn){
  switch(khoa){
    case 'nam':  return String(m[kn]||'').length<4;
    case 'mang': return !m.mang;
    case 'ct':   return !(m.ctrinh||[]).length;
    case 'tag':  return !(m.tag||[]).length && !(m.the||[]).length;
    case 'pham': return !m.phamVi;
    case 'hoi':  return !(m.hoi||[]).length;
    case 'xa':   return !m.xa;
  }
  return false;
}
function dsTag(tab){
  D.cauHinh.tagTab = D.cauHinh.tagTab || {};
  if(!D.cauHinh.tagTab[tab]) D.cauHinh.tagTab[tab] = (TAG_MAC_DINH[tab]||[]).slice();
  /* 3.31: bổ sung tag "Dùng chung" cho tab Biểu mẫu một lần (máy đã có danh sách tag cũ) */
  /* 3.40 (anh chốt): "Dùng chung" của Biểu mẫu chỉ nằm ở hàng Chương trình — bỏ khỏi danh sách tag MỘT lần (lọc y hệt nhau) */
  if(tab==='bieuMau' && !D.cauHinh.tagDCBo){
    D.cauHinh.tagDCBo = true;
    D.cauHinh.tagTab.bieuMau = D.cauHinh.tagTab.bieuMau.filter(function(x){ return x!=='Dùng chung'; });
  }
  return D.cauHinh.tagTab[tab];
}
function tagGanDay(tab){
  D.cauHinh.tagGan = D.cauHinh.tagGan || {};
  return D.cauHinh.tagGan[tab] || [];
}
function ghiTagGanDay(tab, ds){
  D.cauHinh.tagGan = D.cauHinh.tagGan || {};
  var cu = D.cauHinh.tagGan[tab] || [];
  (ds||[]).forEach(function(t){
    cu = [t].concat(cu.filter(function(x){ return x!==t; }));
  });
  D.cauHinh.tagGan[tab] = cu.slice(0,6);
}

/* khóa ngày dùng cho từng tab: văn bản theo ngày ban hành, còn lại theo ngày tạo */
function khoaNgay(tab){
  if(tab==='duLieu') return 'ky';
  return 'ngay';
}

/* ---- vẽ vùng đầu chuẩn: nút Thêm + ba dòng lọc ---- */
/* 3.27: dòng ghi rõ đang lọc theo gì — khỏi mở bộ lọc mới biết */
function chuDemLoc(tab){
  var dk = anLocNhanh(tab) ? dangLoc(tab) : [];
  return dk.length ? ' · '+coChuHTML(dk.join(' · '))+' <span class="xoa-loc" onclick="boLoc(\''+tab+'\')">bỏ lọc</span>' : '';
}
function dongDangLoc(tab, kho){
  var L = locCua(tab), ch = [], boQua = khoaTrenHangLoc(tab, kho);   /* 3.69 */
  var ten = {nam:'Năm', thang:'Tháng', mang:'Mảng', ct:'CT vay', tag:'Tag', pham:'Phạm vi', hoi:'Hội', xa:'Xã', chua:'Chưa khai', hl:'Hiệu lực'};
  Object.keys(ten).forEach(function(k){
    if(L[k] && boQua.indexOf(k)<0) ch.push('<span class="dl-chip" onclick="boMotLoc(\''+tab+'\',\''+k+'\')" title="Bấm để bỏ lọc này">'+
      ten[k]+': <b>'+coChuHTML(k==='ct' ? hienCT(String(L[k])) : String(L[k]))+'</b> ✕</span>');
  });
  if(!ch.length) return '';
  return '<div class="dang-loc">Đang lọc '+ch.join('')+
    '<button class="nho" onclick="boLoc(\''+tab+'\')">Bỏ hết lọc</button></div>';
}
function boMotLoc(tab, k){ var L = locCua(tab); L[k] = ''; ve(); }
/* 3.151 (anh chốt ý 6a, 9, 13 — docs/KE_HOACH_GON_GIAO_DIEN.md): THANH LỌC CHUNG mọi tab file — 1 hàng:
   ＋ Thêm · 🗑 Xóa · ⚲ Lọc (n) ▾ · ⇅ Sắp xếp ▾ · ☰ Kiểu xem ▾ · chip đang lọc ✕ · số mục · ⋯ việc riêng của tab · ❓.
   Bỏ hàng chip lọc nhanh, dòng "Đang lọc", hàng Sắp xếp / Xem riêng; kiểu xem ▦ Bảng thay ▤ Gọn. */
var TL_KX = {vanBan:[['ds','☰ Danh sách'],['thang','🗂 Nhóm'],['bang','▦ Bảng']], bieuMau:[['ds','☰ Danh sách'],['bang','▦ Bảng']],
  scan:[['ds','☰ Danh sách'],['cay','🌳 Cây địa bàn'],['bang','▦ Bảng']], ghiChu:[['ds','☰ Danh sách']]};
function kxBang(tab){ return !laDT() && !!(D.cauHinh.bangTab||{})[tab] && !!TL_KX[tab] && TL_KX[tab].some(function(x){ return x[0]==='bang'; }); }
function kxCua(tab){
  if(kxBang(tab)) return 'bang';
  if(tab==='vanBan') return kieuXem==='thang' ? 'thang' : 'ds';
  if(tab==='scan') return D.cauHinh.scanXem==='cay' ? 'cay' : 'ds';
  if(tab==='duLieu') return kieuTh;
  return 'ds';
}
function datKX(tab, k){
  D.cauHinh.bangTab = D.cauHinh.bangTab || {};
  D.cauHinh.bangTab[tab] = k==='bang';
  if(k!=='bang'){
    if(tab==='vanBan') kieuXem = k;
    else if(tab==='scan'){ D.cauHinh.scanXem = k; if(k==='ds') HS.cay = null; }
    else if(tab==='duLieu') kieuTh = k;
  }
  luu(); dongMenu(); if(tab==='scan') veScan(); else ve();
}
/* 3.151: bản cũ có "▤ Gọn" đang bật → chuyển 1 lần sang ▦ Bảng ở tab Văn bản */
function tlChuyenGon(){
  if(!D.cauHinh.dongGon) return;
  D.cauHinh.bangTab = D.cauHinh.bangTab || {}; D.cauHinh.bangTab.vanBan = true; D.cauHinh.dongGon = false;
  if(typeof apDongGon==='function') apDongGon();
}
function soDangLoc(tab){
  var L = locCua(tab);
  return ['nam','thang','mang','ct','tag','pham','hoi','xa','chua','hl','sao','trung'].filter(function(k){ return !!L[k]; }).length +
    (tab==='scan' && HS.chuaDat ? 1 : 0) + (tab==='scan' && HS.cay ? 1 : 0);
}
function chipDangLoc(tab){
  var L = locCua(tab), ch = [];
  var ten = {nam:'Năm', thang:'Tháng', mang:'', ct:'', tag:'', pham:'', hoi:'Hội', xa:'Xã', chua:'', hl:'', sao:'', trung:''};
  var nhan = function(k){
    var v = String(L[k]);
    if(v===LOC_TRONG) return NHAN_TRONG[k] || 'Chưa có';
    if(k==='thang') return 'Tháng '+parseInt(v, 10);
    if(k==='ct') return hienCT(v);
    if(k==='chua') return '⚠ Chưa phân loại';
    if(k==='hl') return 'Gồm cả hết hiệu lực';
    if(k==='sao') return '★ Quan trọng';
    if(k==='trung') return '⚠ Trùng số hiệu';
    return (ten[k] ? ten[k]+' ' : '')+v;
  };
  Object.keys(ten).forEach(function(k){
    if(L[k]) ch.push('<span class="tl-chip" onclick="boMotLoc(\''+tab+'\',\''+k+'\')" title="Bấm để bỏ lọc này">'+coChuHTML(nhan(k))+' ✕</span>');
  });
  if(tab==='scan' && HS.chuaDat) ch.push('<span class="tl-chip" onclick="HS.chuaDat=false;veScan()" title="Bấm để bỏ lọc này">⚠ Chưa đạt ✕</span>');
  if(tab==='scan' && HS.cay) ch.push('<span class="tl-chip" onclick="HS.cay=null;veScan()" title="Bấm để bỏ lọc này">🌳 '+coChuHTML(nhanCayScan(HS.cay))+' ✕</span>');
  if(ch.length>1) ch.push('<span class="tl-chip bo" onclick="boLoc(\''+tab+'\')" title="Bỏ hết các lọc đang bật">Bỏ hết</span>');
  return ch.join('');
}
function nhanSapTab(tab){
  if(tab==='scan') return {ngay:'Ngày', tuan:'Tuần', thang:'Tháng'}[D.cauHinh.scanNhom||'ngay'] || 'Ngày';
  var c = (tab==='bieuMau' ? COT_SAP.concat(COT_SAP_BM) : COT_SAP).filter(function(x){ return x.ma===SAP.cot; })[0];
  return (c ? c.nhan : 'Ngày')+(SAP.xuoi ? ' ▲' : ' ▼');
}
function veDauTab(tab, opt){
  opt = opt || {};
  tlChuyenGon();
  var so = soDangLoc(tab), kx = kxCua(tab);
  var dsKX = opt.xem ? opt.xem : (TL_KX[tab]||[]);
  var nhanKX = (dsKX.filter(function(x){ return x[0]===kx; })[0] || dsKX[0] || ['', '☰ Danh sách'])[1];
  TL_OPT[tab] = opt;
  var h = '<div class="dau-tab tl-thanh">'+
    '<button class="nut-them" id="nut-them-'+tab+'" onclick="'+(opt.hamThem||'nutChinh()')+'" '+
      'ondragover="event.preventDefault();this.classList.add(\'keo\')" ondragleave="this.classList.remove(\'keo\')" '+
      'ondrop="this.classList.remove(\'keo\')" title="Bấm để chọn file, kéo thả file vào đây, hoặc copy file rồi dán (Ctrl+V)">'+
      '<span class="cong">+</span> '+coChuHTML(opt.nhanThem||'Thêm file')+'</button>'+nutBot(tab)+
    '<button class="phu tl-loc'+(so?' co':'')+'" onclick="moBoLoc(\''+tab+'\')" title="Lọc theo năm, mảng, chương trình vay, tag…">⚲ Lọc'+(so?' ('+so+')':'')+' ▾</button>'+
    '<button class="phu tl-sap" onclick="moSapTab(event,\''+tab+'\')" title="'+(tab==='scan'?'Nhóm theo ngày / tuần / tháng':'Sắp xếp')+'">⇅ '+coChuHTML(nhanSapTab(tab))+(tab==='scan' ? ' ▾' : '')+'</button>'+
    (laDT() ? '<button class="phu tl-xem" onclick="moXemTab(event,\''+tab+'\')" title="Kiểu xem">'+coChuHTML(nhanKX)+' ▾</button>' : tlKieuXemHTML(tab, opt, dsKX, kx))+
    '<span class="dau-phai">'+chipChoKhai(tab)+'<span class="dem-tab" data-tab="'+tab+'"></span>'+
      '<button class="phu tl-them" onclick="moThemTab(event,\''+tab+'\')" title="Việc khác của tab này">⋯</button>'+
      '<button class="phu nut-hd" onclick="moHuongDan(\''+tab+'\')" title="Hướng dẫn tab này">❓</button></span>'+
  '</div>';
  window.__khoTab = opt.kho || [];
  /* 3.157 (anh chốt — kiểu lọc FILE): ⚲ Lọc mở ngay dưới thanh (máy tính), dòng "Đang lọc" riêng khi có lọc */
  if(TL_LOC_MO[tab] && !laDT()) h += '<div class="tl-panel">'+boLocHTML(tab)+'<div class="hang-nut tl-panel-nut"><button class="nho" onclick="boLoc(\''+tab+'\')">Bỏ hết lọc</button><button class="nho" onclick="suaTagTab(\''+tab+'\')">Sửa tag</button><button class="nho" onclick="moBoLoc(\''+tab+'\')">▴ Đóng</button></div></div>';
  if(so) h += '<div class="tl-dang"><span class="tl-dang-nhan">Đang lọc:</span>'+chipDangLoc(tab)+(so<2 ? '<span class="tl-chip bo" onclick="boLoc(\''+tab+'\')">Bỏ lọc</span>' : '')+'</div>';
  return h + thanhBot(tab);
}
var TL_OPT = {}, TL_LOC_MO = {};
/* 3.157: kiểu xem thành chip liền nhau (máy tính) — khung xem bên phải đang mở thì chỉ biểu tượng, rê chuột thấy chữ */
function tlKieuXemHTML(tab, o, ds, kx){
  var ham = o.hamXem ? function(k){ return o.hamXem+'(\''+k+'\')'; } : function(k){ return 'datKX(\''+tab+'\',\''+k+'\')'; };
  var h = '<span class="tl-kx">'+ds.map(function(x){ var bt = x[1].split(' '), ico = /^[^\wÀ-ỹ]/.test(x[1]) ? bt[0] : '', chu = ico ? bt.slice(1).join(' ') : x[1];
    return '<button class="'+(kx===x[0] ? 'bat' : '')+'" onclick="'+ham(x[0])+'" title="'+coChuHTML(chu)+'">'+(ico ? ico+' ' : '')+'<span class="tl-chu">'+coChuHTML(chu)+'</span></button>'; }).join('')+'</span>';
  if(tab==='vanBan' && kx==='thang') h += '<button class="phu tl-bung" onclick="bungNhom(true)" title="Bung hết nhóm">⊞</button><button class="phu tl-bung" onclick="bungNhom(false)" title="Thu gọn hết nhóm">⊟</button>';
  if(tab!=='scan') h += '<button class="phu tl-pv'+(anPVCua(tenTabPV()) ? '' : ' bat')+'" onclick="batTatPV()" title="'+(anPVCua(tenTabPV()) ? 'Bật' : 'Tắt')+' khung xem bên phải">▣</button>';
  return h;
}
/* menu nhỏ thả xuống ngay dưới nút (dùng chung khung .menu của ⋯ từng dòng) */
function moMenuTL(ev, html){
  ev.stopPropagation();
  var e = document.getElementById('menu'); if(!e) return;
  e.innerHTML = html; e.classList.add('hien');
  e.onclick = function(x){ if(x.target && x.target.closest && x.target.closest('button') && !x.target.closest('[data-giu]')) dongMenu(); };
  var r = (ev.currentTarget || ev.target).getBoundingClientRect();
  e.style.left = Math.max(8, Math.min(r.left, window.innerWidth-e.offsetWidth-8))+'px';
  e.style.top = Math.max(8, Math.min(r.bottom+4, window.innerHeight-e.offsetHeight-8))+'px';
}
function moSapTab(ev, tab){
  var h;
  if(tab==='scan'){
    var n = D.cauHinh.scanNhom||'ngay';
    h = '<div class="menu-nhan">Nhóm theo</div>'+[['ngay','Ngày'],['tuan','Tuần'],['thang','Tháng']].map(function(x){
      return '<button class="'+(n===x[0]?'bat':'')+'" onclick="datXemScan(\'scanNhom\',\''+x[0]+'\')">'+(n===x[0]?'✓ ':'')+x[1]+'</button>'; }).join('');
  } else {
    h = '<div class="menu-nhan">Sắp xếp</div>'+(tab==='bieuMau' ? COT_SAP.concat(COT_SAP_BM) : COT_SAP).map(function(c){
      var dang = SAP.cot===c.ma;
      return '<button class="'+(dang?'bat':'')+'" onclick="doiSap(\''+c.ma+'\')">'+(dang?'✓ ':'')+c.nhan+(dang?(SAP.xuoi?' ▲':' ▼'):'')+'</button>'; }).join('')+
      '<div class="menu-ghi">Bấm lại để đảo chiều. Ở kiểu ▦ Bảng: bấm tiêu đề cột.</div>';
  }
  moMenuTL(ev, h);
}
function moXemTab(ev, tab){
  var o = TL_OPT[tab] || {}, kx = kxCua(tab);
  var ds = o.xem ? o.xem : (TL_KX[tab]||[]);
  var ham = o.hamXem ? function(k){ return o.hamXem+'(\''+k+'\')'; } : function(k){ return 'datKX(\''+tab+'\',\''+k+'\')'; };
  var h = '<div class="menu-nhan">Kiểu xem</div>'+ds.filter(function(x){ return !(x[0]==='bang' && laDT()); }).map(function(x){
    return '<button class="'+(kx===x[0]?'bat':'')+'" onclick="'+ham(x[0])+'">'+(kx===x[0]?'✓ ':'')+x[1]+'</button>'; }).join('');
  if(tab==='vanBan' && kx==='thang') h += '<button onclick="bungNhom(true)">⊞ Bung hết nhóm</button><button onclick="bungNhom(false)">⊟ Thu gọn hết nhóm</button>';
  if(!laDT() && tab!=='scan') h += '<div class="vach"></div><button onclick="batTatPV()">'+(anPVCua(tenTabPV())?'▣ Bật':'▣ Tắt')+' khung xem bên phải</button>';
  moMenuTL(ev, h);
}
function moThemTab(ev, tab){
  var o = TL_OPT[tab] || {};
  var h = (o.themPhu||'')+(o.nutThem||'')+(o.them||'');
  if(coCauNoi() && !laDT()) h += '<button onclick="batBot(\''+tab+'\',\'chep\')">☑ Chọn nhiều file để chép</button>';
  if(h) h += '<div class="vach"></div>';
  h += '<button onclick="chepDuongMay(thuMucTab(\''+tab+'\'))">📂 Chép đường dẫn thư mục ổ G</button>'+
    '<button onclick="moThuMucDrive(thuMucTab(\''+tab+'\'))">☁ Mở thư mục trên Drive</button>'+
    '<button onclick="suaTagTab(\''+tab+'\')">🏷 Sửa danh sách tag</button>';
  moMenuTL(ev, h);
}

/* panel bộ lọc — 3.151: nhóm theo từng tab (cùng nhóm hàng lọc nhanh cũ, kèm số mục), mở từ nút ⚲ Lọc của thanh chung */
function moBoLoc(tab){
  if(!laDT()){ TL_LOC_MO[tab] = !TL_LOC_MO[tab]; if(tab==='scan') veScan(); else ve(); return; }   /* 3.157: máy tính — tấm lọc ngay dưới thanh */
  moHop('<div class="hop-tit">⚲ Lọc</div>'+boLocHTML(tab)+'<div class="hang-nut" style="margin-top:14px">'+
    '<button class="nho" onclick="boLoc(\''+tab+'\');dongHop()">Bỏ hết lọc</button>'+
    '<button class="nho" onclick="suaTagTab(\''+tab+'\')">Sửa tag</button>'+
    '<button class="nho chinh" onclick="dongHop()">Xong</button></div>', true);
}
function tlLocLai(tab){ if(laDT()) moBoLoc(tab); }
function boLocHTML(tab){
  var L = locCua(tab), kn = khoaNgay(tab), kho = window.__khoTab || [];
  var dem = function(khoa, x){ var cu = L[khoa]; L[khoa] = x; var n = locTheoThe(tab, locChuan(tab, kho)).length; L[khoa] = cu; return n; };
  var the = function(khoa, x, nhan, so, ham){
    return '<span class="the-loc'+(L[khoa]===x?' bat':'')+(so===0 && L[khoa]!==x?' rong':'')+(x===LOC_TRONG?' loc-trong':'')+'" onclick="'+(ham||'datLocGiu')+'(\''+tab+'\',\''+khoa+'\',\''+
      String(x).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">'+coChuHTML(nhan)+(so!=null?' <small>'+so+'</small>':'')+'</span>';
  };
  var nhom = function(nhan, chips){ return chips ? '<div class="lg"><div class="lg-nhan">'+nhan+'</div><div class="lg-the">'+chips+'</div></div>' : ''; };
  var h = '';
  nhomLocNhanh(tab, kho).forEach(function(g){
    h += nhom(g[0], g[2].map(function(x){ return the(g[1], x, x===LOC_TRONG ? (NHAN_TRONG[g[1]]||'Chưa có') : (g[1]==='ct' ? hienCT(x) : x), dem(g[1], x)); }).join(''));
    if(g[1]==='nam' && L.nam && L.nam!==LOC_TRONG){
      var th = {}; kho.forEach(function(m){ var d = String(m[kn]||''); if(d.slice(0,4)===L.nam && d.slice(5,7)) th[d.slice(5,7)] = 1; });
      h += nhom('Tháng', Object.keys(th).sort().map(function(x){ return the('thang', x, 'Tháng '+parseInt(x,10), dem('thang', x)); }).join(''));
    }
  });
  var khac = '';
  if(tab==='vanBan'){
    khac += the('chua', '1', '⚠ Chưa phân loại') + the('hl', '1', 'Hiện cả VB hết hiệu lực');
    var soTrung = kho.filter(function(m){ return !!TRUNG_SH[m.id]; }).length;
    if(soTrung || L.trung) khac += the('trung', '1', '⚠ Trùng số hiệu', soTrung);
  }
  if(tab==='vanBan' || tab==='bieuMau'){ var soSao = kho.filter(laSao).length; if(soSao || L.sao) khac += the('sao', '1', '★ Quan trọng', soSao); }
  if(tab==='scan'){
    var soCD = kho.filter(function(k){ return !ttScan(k).dat; }).length;
    khac += '<span class="the-loc'+(HS.chuaDat?' bat':'')+'" onclick="HS.chuaDat=!HS.chuaDat;veScan();tlLocLai(\'scan\')">⚠ Chưa đạt <small>'+soCD+'</small></span>';
  }
  h += nhom(tab==='scan' ? 'Trạng thái' : 'Khác', khac);
  return h;
}
/* Phạm vi 3 cấp (PGD / xã-phường / điểm GD) — chỉ dùng cho tab Dữ liệu tháng */
function dsPhamVi(){
  var ra = ['Toàn PGD'];
  (D.cauHinh.diaBan||[]).forEach(function(x){
    ra.push(x.xa);
    (x.diem||[]).forEach(function(d){ ra.push(d.ten); });
  });
  return ra;
}
/* Tag Hội đoàn thể — chỉ dùng cho tab Dữ liệu tháng, sửa được ở Cài đặt */
function dsHoiDoanThe(){
  var ds = D.cauHinh.hoiDoanThe;
  return (ds && ds.length) ? ds : ['HND','HPN','CCB','ĐTN'];
}
function datLocGiu(tab, khoa, gt){
  var L = locCua(tab);
  L[khoa] = (L[khoa]===gt) ? '' : gt;
  if(khoa==='nam') L.thang = '';
  if(tab==='scan') veScan(); else ve();
  tlLocLai(tab);   /* 3.157: máy tính — tấm lọc vẫn mở (vẽ lại cùng thanh) */
}


function boLoc(tab){
  LOC[tab] = {nam:'', thang:'', ct:'', tag:'', mang:'', pham:'', hoi:'', xa:'', chua:'', hl:'', trung:''};
  if(tab==='scan' && typeof HS!=='undefined'){ HS.chuaDat = false; HS.cay = null; }   /* 3.151 */
  ve();
}
function dangLoc(tab){
  var L = locCua(tab), d = [];
  if(L.nam) d.push('năm '+L.nam);
  if(L.thang) d.push('tháng '+parseInt(L.thang,10));
  if(L.ct) d.push(hienCT(L.ct));
  if(L.tag) d.push(L.tag);
  if(L.mang) d.push(L.mang);
  if(L.pham) d.push(L.pham);
  if(L.hoi) d.push(L.hoi);
  if(L.xa) d.push(L.xa);
  if(L.chua) d.push('chưa phân loại');
  if(L.hl) d.push('gồm cả hết hiệu lực');
  if(L.trung) d.push('trùng số hiệu');
  return d;
}
/* áp bộ lọc chuẩn lên một danh sách */
function locChuan(tab, ds){
  var L = locCua(tab), kn = khoaNgay(tab);
  ['nam','mang','ct','tag','pham','hoi','xa'].forEach(function(k){   /* 3.77: chip "(chưa có)" */
    if(L[k]===LOC_TRONG && !(tab==='bieuMau' && (k==='ct' || k==='tag'))) ds = ds.filter(function(m){ return locTrong(m, k, kn); });
  });
  if(L.trung) ds = ds.filter(function(m){ return !!TRUNG_SH[m.id]; });   /* 3.77: văn bản trùng số hiệu */
  if(L.nam && L.nam!==LOC_TRONG) ds = ds.filter(function(m){ return String(m[kn]||'').slice(0,4)===L.nam; });
  if(L.thang) ds = ds.filter(function(m){ return String(m[kn]||'').slice(5,7)===L.thang; });
  if(L.ct && (L.ct!==LOC_TRONG || tab==='bieuMau')) ds = ds.filter(function(m){
    if(tab==='bieuMau'){
      /* 3.31: biểu mẫu lưu chương trình ở m.nhom (trước lọc theo ctrinh nên luôn ra rỗng);
         lọc một chương trình thì vẫn kèm nhóm Dùng chung */
      if(L.ct==='Dùng chung') return laDungChungBM(m);
      if(L.ct==='Theo nghiệp vụ') return m.nhom==='Theo nghiệp vụ';
      return m.nhom===L.ct || laDungChungBM(m);
    }
    /* 3.77: lọc 1 chương trình thì kèm văn bản "Tất cả CT" (áp dụng cho mọi CT) */
    return (m.ctrinh||[]).indexOf(L.ct)>=0 || (L.ct!=='Dùng chung' && (m.ctrinh||[]).indexOf('Dùng chung')>=0); });
  if(L.chua) ds = ds.filter(function(m){ return chuaPhanLoai(m).length>0; });
  if(tab==='vanBan' && !L.hl) ds = ds.filter(function(m){ return !m.hetHieuLuc; });
  if(L.tag && L.tag!==LOC_TRONG) ds = ds.filter(function(m){ return coTagLoc(tab, m, L.tag); });
  if(L.mang && L.mang!==LOC_TRONG) ds = ds.filter(function(m){ return m.mang===L.mang; });
  if(L.sao) ds = ds.filter(laSao);   /* 3.65 (việc AC): chỉ văn bản / mẫu đánh dấu ⭐ */
  if(L.pham && L.pham!==LOC_TRONG) ds = ds.filter(function(m){ return m.phamVi===L.pham; });
  if(L.hoi && L.hoi!==LOC_TRONG) ds = ds.filter(function(m){ return (m.hoi||[]).indexOf(L.hoi)>=0; });
  if(L.xa && L.xa!==LOC_TRONG) ds = ds.filter(function(m){ return m.xa===L.xa; });
  return ds;
}

/* 3.31: tag của biểu mẫu có 3 tag "ảo" suy từ dữ liệu sẵn có, không cần gắn tay */
function laDungChungBM(m){ return /^Dùng chung/.test(m.nhom||''); }
function coTagLoc(tab, m, tg){
  if(tab==='bieuMau'){
    if(tg==='Dùng chung') return laDungChungBM(m);
    if(tg==='Mẫu trắng') return !m.huongDan;
    if(tg==='Mẫu hướng dẫn') return !!m.huongDan;
  }
  return (m.tag||[]).indexOf(tg)>=0 || (m.the||[]).indexOf(tg)>=0;
}
/* ---- 3.31: hàng lọc hiện sẵn (mục 4 bàn giao) ----
   Biểu mẫu: hiện hết (chương trình vay + tag). Văn bản: chỉ hàng tag, tầng khác vẫn ở nút Bộ lọc ▾.
   Dưới 900px thu hết vào nút Bộ lọc (CSS .loc-nhanh) */
/* 3.34: mở rộng cho mọi tab — mỗi nhóm một dòng, chip nhỏ, dòng dài thì vuốt ngang (không xuống nhiều hàng).
   Mảng, CT vay, Phạm vi, Hội, Xã chỉ hiện giá trị đang có file cho gọn; Năm hiện khi có từ 2 năm.
   Ẩn/hiện nhớ riêng từng tab (D.cauHinh.anLocNhanh). Điện thoại vẫn hiện, vuốt ngang. */
function nhomLocNhanh(tab, kho){
  var L = locCua(tab), kn = khoaNgay(tab), ra = [];
  var coDung = function(ds, khoa, lay){
    var co = {}; kho.forEach(function(m){ [].concat(lay(m)||[]).forEach(function(v){ if(v) co[v] = 1; }); });
    /* 3.77: giá trị đang có trên file nhưng không còn trong danh mục vẫn hiện chip — không để file bị lạc */
    return ds.filter(function(x){ return co[x] || L[khoa]===x; }).concat(Object.keys(co).filter(function(x){ return ds.indexOf(x)<0; }));
  };
  var nam = function(){
    var n = {}; kho.forEach(function(m){ var d = String(m[kn]||''); if(d.length>=4) n[d.slice(0,4)] = 1; });
    var ds = Object.keys(n).sort().reverse();
    var thieu = kho.some(function(m){ return locTrong(m, 'nam', kn); });
    if(ds.length>1 || L.nam || (ds.length && thieu)) ra.push(['Năm','nam',ds]);
  };
  var tagCo = function(ds){   /* tag đang gắn trên file mà không có trong danh sách tag */
    var co = {}; kho.forEach(function(m){ (m.tag||[]).concat(m.the||[]).forEach(function(v){ if(v) co[v] = 1; }); });
    return ds.concat(Object.keys(co).filter(function(x){ return ds.indexOf(x)<0; }));
  };
  if(tab==='vanBan'){
    nam();
    ra.push(['Mảng','mang', coDung(dsMang(), 'mang', function(m){ return m.mang; })]);
    ra.push(['CT vay','ct', coDung(dsCTChon(), 'ct', function(m){ return m.ctrinh; })]);
    ra.push(['Tag','tag', tagCo(dsTag(tab))]);
  }else if(tab==='duLieu'){
    nam();
    ra.push(['Phạm vi','pham', coDung(dsPhamVi(), 'pham', function(m){ return m.phamVi; })]);
    ra.push(['Hội','hoi', coDung(dsHoiDoanThe(), 'hoi', function(m){ return m.hoi; })]);
  }else if(tab==='bieuMau'){
    ra.push(['Chương trình','ct', ['Dùng chung'].concat(D.cauHinh.chuongTrinh||[], ['Theo nghiệp vụ'])]);
    ra.push(['Tag','tag', dsTag(tab)]);
  }else if(tab==='ghiChu'){
    nam();
    ra.push(['Nhãn','tag', tagCo(dsTag(tab))]);
  }else if(tab==='scan'){
    ra.push(['Xã','xa', coDung(dsDonVi('xa'), 'xa', function(m){ return m.xa; })]);
    ra.push(['Tag','tag', tagCo(dsTag(tab))]);
  }
  /* 3.77: chip "(chưa có)" cuối mỗi nhóm khi có mục để trống — mọi mục đều lọc ra được */
  ra.forEach(function(g){
    if(tab==='bieuMau' && (g[1]==='ct' || g[1]==='tag')) return;
    if(L[g[1]]===LOC_TRONG || kho.some(function(m){ return locTrong(m, g[1], kn); }))
      g[2] = g[1]==='tag' ? [LOC_TRONG].concat(g[2]) : g[2].concat([LOC_TRONG]);   /* hàng tag dài, cuộn ngang → để chip "Chưa có tag" lên đầu cho thấy */
  });
  return ra.filter(function(g){ return g[2].length; });
}
/* 3.39: điện thoại (dưới 700px) mặc định GỌN — hàng lọc nhanh ẩn, bấm "Lọc nhanh ▾" mới hiện; nhớ riêng cho điện thoại
   (D.cauHinh.moLocDT), không đụng lựa chọn ẩn/hiện của máy tính */
function laDT(){ return !!(window.matchMedia && window.matchMedia('(max-width:699px)').matches); }
function anLocNhanh(tab){
  if(laDT()) return !(D.cauHinh.moLocDT||{})[tab];
  return !!(D.cauHinh.anLocNhanh||{})[tab];
}
/* nút "Lọc nhanh ▾" chỉ hiện khi anh đã ẩn hàng lọc (lúc đang hiện thì nút ẩn nằm cuối dòng lọc đầu) — đỡ tốn một nút */
/* 3.65 (việc AC, anh chốt): ⭐ đánh dấu văn bản / biểu mẫu quan trọng — không cần quan tâm nữa thì bỏ sao.
   Biểu mẫu dùng chung cờ "ghim" có sẵn (khỏi 2 nút cùng việc) */
function laSao(m){ return !!(m && (m.huongDan!==undefined ? m.ghim : m.sao)); }
function saoHTML(m){ var b = laSao(m); return '<span class="sao'+(b?' bat':'')+'" onclick="event.stopPropagation();doiSao(\''+m.id+'\')" title="'+(b?'Bỏ đánh dấu quan trọng':'Đánh dấu quan trọng')+'">'+(b?'★':'☆')+'</span>'; }
function doiSao(id){
  var m = timMuc(id) || (typeof bmTim==='function' && bmTim(id)); if(!m) return;
  if(m.huongDan!==undefined) m.ghim = !m.ghim; else m.sao = !m.sao;
  m.suaLuc = new Date().toISOString(); luu(); ve();
  var e = document.getElementById('sao-sua'); if(e) e.outerHTML = saoSuaHTML(m, e.classList.contains('sg-ico'));
}
function saoSuaHTML(m, gon){ var b = laSao(m); return '<button class="nho sao-nut'+(b?' bat':'')+(gon?' sg-ico':'')+'" type="button" id="sao-sua" onclick="doiSao(\''+m.id+'\')"'+(gon?' title="'+(b?'Đang đánh dấu quan trọng — bấm để bỏ':'Đánh dấu quan trọng')+'"':'')+'>'+(gon?(b?'★':'☆'):(b?'★ Quan trọng':'☆ Đánh dấu quan trọng'))+'</button>'; }
/* 3.69 (việc AJ, anh chốt: vẫn chip nhưng gọn): các nhóm ngắn (Năm · Mảng · CT vay · Phạm vi · Hội · Xã) chung 1 dòng, Tag / Nhãn 1 dòng;
   bỏ chip "Tất cả" — bấm chip để lọc (xanh có ✕), bấm lại để bỏ; đang lọc hiện "✕ Bỏ lọc (n)"; chip kèm số mục nếu chọn nó */
/* khóa lọc đang có chip trên hàng lọc nhanh — dòng "Đang lọc" không nhắc lại */
function khoaTrenHangLoc(tab, kho){
  if(anLocNhanh(tab)) return [];
  return nhomLocNhanh(tab, kho||[]).map(function(g){ return g[1]; }).concat(['sao', 'trung']);
}
/* ---- sửa danh sách tag của một tab ---- */
function suaTagTab(tab){
  var ten = {vanBan:'Văn bản', duLieu:'Dữ liệu tháng', ghiChu:'Ghi chú',
             bieuMau:'Biểu mẫu', scan:'Scan hồ sơ'}[tab] || tab;
  moHop('<div class="hop-tit">Tag thuộc tính — '+ten+'</div>'+
    '<div class="hop-phu">Mỗi dòng một tag. Đây là danh sách riêng của tab này, '+
    'sửa lúc nào cũng được; tag đã gán cho file cũ không bị mất khi anh bỏ khỏi danh sách.</div>'+
    ta('','tg-ds', dsTag(tab).join('\n'))+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho" onclick="tagMacDinh(\''+tab+'\')">Lấy lại mặc định</button>'+
      '<button class="nho chinh" onclick="luuTagTab(\''+tab+'\')">Lưu</button></div>');
}
function luuTagTab(tab){
  var ds = gt('tg-ds').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  D.cauHinh.tagTab = D.cauHinh.tagTab || {};
  D.cauHinh.tagTab[tab] = ds;
  luu(); dongHop(); ve();
  bao('Đã lưu '+ds.length+' tag cho tab này.', 4);
  if(DR.sanSang) dayCauHinh(true);
}
function tagMacDinh(tab){
  D.cauHinh.tagTab = D.cauHinh.tagTab || {};
  D.cauHinh.tagTab[tab] = (TAG_MAC_DINH[tab]||[]).slice();
  luu(); dongHop(); suaTagTab(tab);
}

/* ---- ô chọn tag khi khai một mục ---- */
function oChonTag(tab, dangCo, idO){
  var tags = dsTag(tab), gan = tagGanDay(tab);
  var xep = gan.filter(function(t){ return tags.indexOf(t)>=0; })
    .concat(tags.filter(function(t){ return gan.indexOf(t)<0; }));
  return '<div class="o"><label>Tag thuộc tính — chọn được nhiều</label>'+
    '<div class="goi-y" id="'+idO+'">'+
    xep.map(function(t){
      return '<span class="the-loc'+(dangCo.indexOf(t)>=0?' bat':'')+
        '" onclick="this.classList.toggle(\'bat\')">'+coChuHTML(t)+'</span>';
    }).join('')+'</div>'+
    '<div class="huong-dan">Tag gần dùng xếp lên đầu. '+
    '<b onclick="suaTagTab(\''+tab+'\')" style="cursor:pointer;text-decoration:underline">'+
    'Sửa danh sách tag</b></div></div>';
}
function chonMot(el){
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.remove('bat');
  el.classList.add('bat');
}
function layMot(id){
  var e = document.getElementById(id); if(!e) return '';
  var c = e.querySelector('.the-loc.bat');
  return c ? c.textContent : '';
}

function oChonCT(dangCo, idO){
  var ct = ['Dùng chung'].concat(D.cauHinh.chuongTrinh||[]);
  return '<div class="o"><label>Chương trình vay</label>'+
    '<div class="goi-y" id="'+idO+'">'+
    ct.map(function(t){
      return '<span class="the-loc ctr'+(dangCo.indexOf(t)>=0?' bat':'')+
        '" data-v="'+coChuHTML(t)+'" onclick="this.classList.toggle(\'bat\')">'+coChuHTML(hienCT(t))+'</span>';
    }).join('')+'</div>'+
    '<div class="huong-dan">Áp dụng mọi chương trình thì chọn <b>Tất cả CT</b>.</div></div>';
}

/* 3.151 (anh đề xuất ý 9, "dùng chung hết"): KIỂU XEM ▦ BẢNG — cột cố định, dòng ~30 px, bấm tiêu đề cột để sắp ▲▼,
   cột đầu ô tích (Văn bản: chọn để xóa · Biểu mẫu: gửi / nén / in · Scan: in ghép), bấm dòng = xem như danh sách. Điện thoại vẫn dùng Danh sách. */
var BANG_SAP = {};
function bangCot(tab){
  var tt = function(ds){ return ds.filter(Boolean).map(function(x){ return '<span class="bt-tt" title="'+coChuHTML(x[1])+'">'+x[0]+'</span>'; }).join(''); };
  if(tab==='vanBan') return [
    {ma:'sh', nhan:'Số hiệu', k:function(m){ return m.soHieu||''; }},
    {ma:'ngay', nhan:'Ngày ký', k:function(m){ return m.ngay||''; }, o:function(m){ return m.ngay ? ngayVN(m.ngay) : ''; }},
    {ma:'ten', nhan:'Tên văn bản & Trích yếu', lop:'bt-ten', k:function(m){ return m.tenVB||m.trichYeu||m.tenMoi||m.tenCu||''; }},
    {ma:'mang', nhan:'Mảng NV', k:function(m){ return m.mang||''; }},
    {ma:'ct', nhan:'CT vay', k:function(m){ return (m.ctrinh||[]).map(hienCT).join(', '); }},
    {ma:'tt', nhan:'Trạng thái', k:function(m){ return (laSao(m)?'0':'1')+(chuaPhanLoai(m).length?'0':'1'); }, o:function(m){
      var c = chuaPhanLoai(m);
      return tt([laSao(m) && ['★','Quan trọng'], c.length && ['⚠', c.join(', ')], !m.driveId && ['☁','Chưa lên Drive'],
        m.hetHieuLuc && ['⛔','Hết hiệu lực'], TRUNG_SH[m.id] && ['⧉','Trùng số hiệu với '+(TRUNG_SH[m.id].length-1)+' bản']]); }}];
  if(tab==='bieuMau') return [
    {ma:'ten', nhan:'Tên mẫu', lop:'bt-ten', k:function(m){ return (m.soHieu ? m.soHieu+' · ' : '')+(m.ten||''); }},
    {ma:'ct', nhan:'Chương trình', k:function(m){ return /^Dùng chung/.test(m.nhom||'') ? 'Tất cả CT' : (m.nhom||''); }},
    {ma:'loai', nhan:'Loại', k:function(m){ return m.huongDan ? 'Mẫu hướng dẫn' : 'Mẫu trắng'; }},
    {ma:'dung', nhan:'Số lần dùng', lop:'s', k:function(m){ return +m.soLanDung||0; }},
    {ma:'tt', nhan:'Trạng thái', k:function(m){ return (laSao(m)?'0':'1')+(m.driveId?'1':'0'); }, o:function(m){
      return tt([laSao(m) && ['★','Quan trọng'], !m.driveId && ['☁','Chưa lên Drive'], m.thayBoi && ['↻','Đã có bản mới']]); }}];
  if(tab==='scan'){
    var cot = [];
    if((D.scan||[]).some(function(k){ return k.maKH; })) cot.push({ma:'ma', nhan:'Mã KH', k:function(k){ return k.maKH||''; }});
    return cot.concat([
      {ma:'ten', nhan:'Tên', lop:'bt-ten', k:function(k){ return k.ten||''; }},
      {ma:'ap', nhan:'Ấp', k:function(k){ return k.ap||''; }},
      {ma:'to', nhan:'Tổ trưởng', lop:'bt-to', k:function(k){ return toTruongScan(k); }, o:function(k){ return coChuHTML(toTruongScan(k).replace(/^[\d\s]+[—–-]\s*/, '')); }},   /* 3.292 (anh): cột tổ trưởng; 3.299: chỉ tên tổ trưởng (bỏ mã tổ), cột gọn để tên khách là chính */
      {ma:'loai', nhan:'Loại giấy tờ', k:function(k){ return k.che==='tailieu' ? ((k.tag||[]).filter(function(x){ return x!=='CCCD'; })[0] || 'Tài liệu') : 'CCCD'; }},
      {ma:'ngay', nhan:'Ngày', k:function(k){ return mocScan(k); }, o:function(k){ return ngayVN(mocScan(k).slice(0,10)); }},
      {ma:'tt', nhan:'Trạng thái', k:function(k){ return ttScan(k).dat ? '1' : '0'; }, o:function(k){
        var t = ttScan(k); return t.dat ? '<span class="bt-tt dat" title="Đạt">✓</span>' : '<span class="bt-tt" title="'+coChuHTML(t.thieu.join(' · '))+'">⚠</span>'; }}]);
  }
  return [];
}
/* tổ trưởng của bản scan: tổ đã khai trên bản; chưa có thì theo khách (mã KH) trên Mẫu 31 */
function toTruongScan(k){
  if(k.to) return String(k.to);
  if(k.maKH && typeof sxKhach==='function'){ try{ return sxKhach(k.maKH).to || ''; }catch(e){} }
  return '';
}
function bangSap(tab, ma){
  var s = BANG_SAP[tab];
  BANG_SAP[tab] = (s && s.cot===ma) ? {cot:ma, xuoi:!s.xuoi} : {cot:ma, xuoi:true};
  if(tab==='scan') veScan(); else ve();
}
function bangChon(tab, id, ev){
  if(ev) ev.stopPropagation();
  if(tab==='bieuMau') return doiChonBM(id);
  if(tab==='scan') return doiChonHS(id);
  /* Văn bản: tích = chọn để xóa (quy tắc xóa chung — thanh 🗑 Xóa N file) */
  if(BOT.tab!==tab){ BOT = {tab:tab, chon:{}, muc:'xoa'}; CN_CHEP_CON = []; document.body.classList.add('dang-bot'); }
  if(BOT.chon[id]) delete BOT.chon[id]; else BOT.chon[id] = 1;
  ve();
}
function bangDaChon(tab, id){
  if(tab==='bieuMau') return !!BM.chon[id];
  if(tab==='scan') return !!HS.chon[id];
  return BOT.tab===tab && !!BOT.chon[id];
}
function bangTabHTML(tab, ds){
  var cot = bangCot(tab), s = BANG_SAP[tab];
  if(s){ var c = cot.filter(function(x){ return x.ma===s.cot; })[0];
    if(c) ds = ds.slice().sort(function(a, b){ var x = c.k(a), y = c.k(b);
      if(typeof x==='string'){ x = boDau(x).toLowerCase(); y = boDau(String(y)).toLowerCase(); }
      return (x<y ? -1 : x>y ? 1 : 0)*(s.xuoi ? 1 : -1); }); }
  BOT_DS[tab] = ds;
  var mo = tab==='scan' ? 'xemScanCP' : 'chonDong';
  var dang = typeof mucDangXem!=='undefined' && mucDangXem ? mucDangXem.id : '';
  return '<div class="bang-tab-cuon"><table class="bang-tab bt-'+tab+'"><thead><tr><th class="bt-o"></th>'+
    cot.map(function(c){ var d = s && s.cot===c.ma;
      return '<th class="'+(c.lop||'')+(d?' dang':'')+'" onclick="bangSap(\''+tab+'\',\''+c.ma+'\')" title="Bấm để sắp xếp theo cột này">'+c.nhan+(d ? (s.xuoi?' ▲':' ▼') : '')+'</th>'; }).join('')+
    '<th class="bt-n"></th></tr></thead><tbody>'+
    ds.map(function(m){
      var chon = bangDaChon(tab, m.id);
      return '<tr class="bt-d'+(chon?' chon':'')+(dang===m.id?' dang-xem':'')+(m.hetHieuLuc?' mo':'')+'" data-id="'+m.id+'"'+botAt(m.id)+' onclick="'+mo+'(\''+m.id+'\')">'+
        '<td class="bt-o"><span class="o-chon'+(chon?' bat':'')+'" onclick="bangChon(\''+tab+'\',\''+m.id+'\',event)" title="Tích để chọn">'+(chon?'✓':'')+'</span></td>'+
        cot.map(function(c){ var v = c.k(m), o = c.o ? c.o(m) : coChuHTML(String(v));
          return '<td class="'+(c.lop||'')+'"'+(c.lop==='bt-ten' || c.lop==='bt-to' ? ' title="'+coChuHTML(String(v))+'"' : '')+'>'+(c.lop==='bt-ten' ? toSang(String(v), tuKhoa) : o)+'</td>'; }).join('')+
        '<td class="bt-n">'+(tab==='scan' ? '<button onclick="event.stopPropagation();themKhach(\''+m.id+'\')" title="Sửa / khai">✎</button>'
          : '<button onclick="event.stopPropagation();moMenu(event,\''+m.id+'\')" title="Thêm lệnh">⋯</button>')+'</td></tr>';
    }).join('')+'</tbody></table></div>';
}
/* ↑ ↓ chuyển dòng trong bảng, khung xem theo */
document.addEventListener('keydown', function(e){
  if(e.key!=='ArrowDown' && e.key!=='ArrowUp') return;
  var t = e.target || {}, tag = (t.tagName||'').toUpperCase();
  if(tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT' || t.isContentEditable) return;
  if(document.querySelector('#hop.hien')) return;
  var trang = document.querySelector('.trang.hien') || document;
  var ds = Array.prototype.slice.call(trang.querySelectorAll('.bang-tab tr.bt-d')); if(!ds.length) return;
  var dang = mucDangXem ? mucDangXem.id : '';
  var i = ds.findIndex(function(r){ return dang ? r.getAttribute('data-id')===dang : r.classList.contains('dang-xem'); });
  if(i<0 && !dang) return;
  e.preventDefault();
  i = e.key==='ArrowDown' ? Math.min(ds.length-1, i+1) : Math.max(0, i-1);
  ds.forEach(function(r){ r.classList.remove('dang-xem'); }); ds[i].classList.add('dang-xem');
  ds[i].scrollIntoView({block:'nearest'}); ds[i].click();
});
