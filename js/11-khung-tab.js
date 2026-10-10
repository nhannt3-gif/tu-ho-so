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
function veDauTab(tab, opt){
  opt = opt || {};
  var L = locCua(tab);
  var so = ['nam','thang','mang','ct','tag','pham','hoi','xa','chua','hl','trung']
    .filter(function(k){ return !!L[k]; }).length;

  /* một hàng gọn: nút Thêm + nút Bộ lọc + nút phụ */
  var h = '<div class="dau-tab">'+
    '<button class="nut-them" id="nut-them-'+tab+'" onclick="'+(opt.hamThem||'nutChinh()')+'" '+
      'ondragover="event.preventDefault();this.classList.add(\'keo\')" ondragleave="this.classList.remove(\'keo\')" '+
      'ondrop="this.classList.remove(\'keo\')" title="Bấm để chọn file, kéo thả file vào đây, hoặc copy file rồi dán (Ctrl+V)">'+
      '<span class="cong">+</span> Thêm file</button>'+nutBot(tab)+nutChepNhieu(tab)+
    '<button class="phu'+(so?' co':'')+'" onclick="moBoLoc(\''+tab+'\')">'+
      'Bộ lọc'+(so?(' · '+so):'')+' ▾</button>'+
    nutLocNhanh(tab, opt.kho||[])+(opt.themPhu||'')+(opt.nutThem||'')+
    '<button class="phu nut-hd" onclick="moHuongDan(\''+tab+'\')" title="Hướng dẫn tab này">❓</button>'+
    '<span class="dau-phai">'+chipChoKhai(tab)+'<span class="dem-tab" data-tab="'+tab+'"></span></span>'+
  '</div>'+ hangLocNhanh(tab, opt.kho||[]) + dongDangLoc(tab, opt.kho||[]) + thanhBot(tab);

  /* thẻ lọc đang bật hiện thành một hàng gọn */
  var chip = [];
  if(L.nam) chip.push(['nam','Năm '+L.nam]);
  if(L.thang) chip.push(['thang','Tháng '+parseInt(L.thang,10)]);
  if(L.mang) chip.push(['mang',L.mang]);
  if(L.ct) chip.push(['ct',hienCT(L.ct)]);
  if(L.tag) chip.push(['tag',L.tag]);
  if(L.pham) chip.push(['pham',L.pham]);
  if(L.hoi) chip.push(['hoi',L.hoi]);
  if(L.xa) chip.push(['xa',L.xa]);
  if(L.chua) chip.push(['chua','⚠ Chưa phân loại']);
  if(L.hl) chip.push(['hl','Gồm cả hết hiệu lực']);
  var boQ = khoaTrenHangLoc(tab, opt.kho||[]);   /* 3.69: chip đã hiện trên hàng lọc thì không nhắc lại */
  chip = chip.filter(function(c){ return boQ.indexOf(c[0])<0; });
  if(chip.length) h += '<div class="chip-hang">'+
    chip.map(function(c){
      return '<span class="chip-loc">'+coChuHTML(c[1])+
        '<b onclick="datLoc(\''+tab+'\',\''+c[0]+'\',\'\')">✕</b></span>';
    }).join('')+
    (chip.length>1?'<span class="chip-loc xoa" onclick="boLoc(\''+tab+'\')">Bỏ hết</span>':'')+
    '</div>';

  window.__khoTab = opt.kho || [];
  return h;
}

/* panel bộ lọc: ba phần xếp dọc, thấy hết không phải kéo ngang */
function moBoLoc(tab){
  var L = locCua(tab), kn = khoaNgay(tab), kho = window.__khoTab || [];
  var nams = {}, thangs = {};
  kho.forEach(function(m){
    var d = String(m[kn]||'');
    if(d.length>=4){
      nams[d.slice(0,4)] = 1;
      if(!L.nam || d.slice(0,4)===L.nam){ var t = d.slice(5,7); if(t) thangs[t]=1; }
    }
  });
  function nhom(nhan, ds, khoa, doiNhan, themTatCa){
    if(!ds.length) return '';
    return '<div class="lg"><div class="lg-nhan">'+nhan+'</div><div class="lg-the">'+
      '<span class="the-loc ca'+(L[khoa]===''?' bat':'')+'" onclick="datLocGiu(\''+tab+
        '\',\''+khoa+'\',\'\')">Tất cả</span>'+
      ds.map(function(x){
        return '<span class="the-loc'+(L[khoa]===x?' bat':'')+'" onclick="datLocGiu(\''+tab+
          '\',\''+khoa+'\',\''+String(x).replace(/'/g,"\\'")+'\')">'+
          coChuHTML(doiNhan?doiNhan(x):x)+'</span>';
      }).join('')+'</div></div>';
  }
  var h = '<div class="hop-tit">Bộ lọc</div>'+
    '<div class="hop-phu">Chọn kết hợp tự do. Mặc định chỉ hiện văn bản còn hiệu lực.</div>';
  h += nhom('1. Năm', Object.keys(nams).sort().reverse(), 'nam');
  h += nhom('Tháng', Object.keys(thangs).sort(), 'thang',
            function(x){ return 'Tháng '+parseInt(x,10); }, 'Cả năm');
  h += nhom('2. Mảng nghiệp vụ', dsMang(), 'mang');
  h += nhom('3. Chương trình vay', dsCTChon(), 'ct');
  h += nhom('4. Tag', dsTag(tab), 'tag');
  if(tab==='vanBan'){
    h += '<div class="lg"><div class="lg-nhan">Khác</div><div class="lg-the">'+
      '<span class="the-loc'+(L.chua?' bat':'')+'" onclick="datLocGiu(\'vanBan\',\'chua\',\'1\')">⚠ Chưa phân loại</span>'+
      '<span class="the-loc'+(L.hl?' bat':'')+'" onclick="datLocGiu(\'vanBan\',\'hl\',\'1\')">Hiện cả VB hết hiệu lực</span>'+
      '</div></div>';
  }
  if(tab==='duLieu'){
    h += nhom('5. Phạm vi', dsPhamVi(), 'pham', null, 'Tất cả');
    h += nhom('6. Hội đoàn thể', dsHoiDoanThe(), 'hoi', null, 'Tất cả');
  }
  h += '<div class="hang-nut" style="margin-top:14px">'+
    '<button class="nho" onclick="boLoc(\''+tab+'\');dongHop()">Bỏ hết lọc</button>'+
    '<button class="nho" onclick="suaTagTab(\''+tab+'\')">Sửa tag</button>'+
    '<button class="nho chinh" onclick="dongHop()">Xong</button></div>';
  moHop(h, true);
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
  ve();
  moBoLoc(tab);
}

function hangLoc(nhan, ds, dangChon, hamMo, nhanTatCa, doiNhan){
  if(!ds.length) return '';
  return '<div class="nam">'+(nhan?'<span class="nhan-loc">'+nhan+'</span>':
      '<span class="nhan-loc"></span>')+
    '<button'+(dangChon===''?' class="bat"':'')+' onclick="'+hamMo+"'')\">"+
      coChuHTML(nhanTatCa)+'</button>'+
    ds.map(function(x){
      return '<button'+(dangChon===x?' class="bat"':'')+' onclick="'+hamMo+"'"+
        String(x).replace(/'/g,"\\'")+"')\">"+
        coChuHTML(doiNhan?doiNhan(x):x)+'</button>';
    }).join('')+'</div>';
}

function datLoc(tab, khoa, gt){
  var L = locCua(tab);
  L[khoa] = (L[khoa]===gt) ? '' : gt;
  if(khoa==='nam') L.thang = '';
  ve();
}
function boLoc(tab){
  LOC[tab] = {nam:'', thang:'', ct:'', tag:'', mang:'', pham:'', hoi:'', xa:'', chua:'', hl:'', trung:''};
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
function batLocNhanh(tab){
  var k = laDT() ? 'moLocDT' : 'anLocNhanh';
  D.cauHinh[k] = D.cauHinh[k] || {};
  D.cauHinh[k][tab] = !D.cauHinh[k][tab];
  luu(); ve();
}
/* nút "Lọc nhanh ▾" chỉ hiện khi anh đã ẩn hàng lọc (lúc đang hiện thì nút ẩn nằm cuối dòng lọc đầu) — đỡ tốn một nút */
function nutLocNhanh(tab, kho){
  if(!anLocNhanh(tab) || !nhomLocNhanh(tab, kho).length) return '';
  return '<button class="phu" onclick="batLocNhanh(\''+tab+'\')" title="Hiện hàng lọc nhanh — app nhớ riêng cho tab này">Lọc nhanh ▾</button>';
}
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
function hangLocNhanh(tab, kho){
  if(anLocNhanh(tab)) return '';
  kho = kho||[];
  var nhom = nhomLocNhanh(tab, kho);
  var L = locCua(tab);
  var soSao = (tab==='vanBan'||tab==='bieuMau') ? kho.filter(laSao).length : 0;
  if(!nhom.length && !soSao && !L.sao && !(tab==='vanBan' && D.vanBan.some(function(m){ return TRUNG_SH[m.id]; })) && !L.trung) return '';
  var dem = function(khoa, x){   /* số mục nếu chọn chip này (giữ các lọc khác) */
    var cu = L[khoa]; L[khoa] = x;
    var n = locTheoThe(tab, locChuan(tab, kho)).length; L[khoa] = cu; return n;
  };
  var chip = function(khoa, x, nhan, so){
    return '<span class="the-loc'+(L[khoa]===x?' bat':'')+(so===0 && L[khoa]!==x?' rong':'')+(x===LOC_TRONG?' loc-trong':'')+(khoa==='trung'?' loc-trung':'')+'" onclick="datLoc(\''+tab+'\',\''+khoa+'\',\''+
      String(x).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')" title="'+(L[khoa]===x?'Bấm để bỏ lọc này':'Lọc theo '+coChuHTML(nhan))+'">'+
      coChuHTML(nhan)+(so!=null?' <small>'+so+'</small>':'')+'</span>';
  };
  var nhomHTML = function(g){ return '<span class="ln-nhan">'+g[0]+'</span>'+g[2].map(function(x){
    return chip(g[1], x, x===LOC_TRONG ? (NHAN_TRONG[g[1]]||'Chưa có') : (g[1]==='ct' ? hienCT(x) : x), dem(g[1], x)); }).join(''); };
  var ngan = nhom.filter(function(g){ return g[1]!=='tag'; }), dai = nhom.filter(function(g){ return g[1]==='tag'; });
  var so = ['nam','thang','mang','ct','tag','pham','hoi','xa','chua','hl','sao','trung'].filter(function(k){ return !!L[k]; }).length;
  var soTrung = tab==='vanBan' ? kho.filter(function(m){ return !!TRUNG_SH[m.id]; }).length : 0;
  var phai = '<span class="ln-phai">'+(so ? '<span class="ln-bo" onclick="boLoc(\''+tab+'\')" title="Bỏ hết các lọc đang bật">✕ Bỏ lọc ('+so+')</span>' : '')+
    ((soTrung || L.trung) ? chip('trung', '1', '⚠ Trùng số hiệu', soTrung) : '')+   /* 3.77 */
    ((soSao || L.sao) ? chip('sao', '1', '★ Quan trọng', soSao) : '')+
    '<span class="ln-an" onclick="batLocNhanh(\''+tab+'\')" title="Ẩn hàng lọc nhanh của tab này — bấm Lọc nhanh ▾ để hiện lại">ẩn ▴</span></span>';
  var h1 = ngan.map(nhomHTML).join('<span class="ln-gach"></span>');
  var dong = [];
  if(h1 || !dai.length) dong.push('<div class="ln-hang">'+h1+phai+'</div>');
  dai.forEach(function(g, i){ dong.push('<div class="ln-hang">'+nhomHTML(g)+(!h1 && i===0 ? phai : '')+'</div>'); });
  return '<div class="loc-nhanh gon">'+dong.join('')+'</div>';
}
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
function oChonNV(dangCo, idO){
  var nv = D.cauHinh.nghiepVu||[];
  return '<div class="o"><label>Mảng nghiệp vụ — chọn một</label>'+
    '<div class="goi-y mot" id="'+idO+'">'+
    nv.map(function(t){
      return '<span class="the-loc'+(dangCo===t?' bat':'')+
        '" onclick="chonMot(this)">'+coChuHTML(t)+'</span>';
    }).join('')+'</div>'+
    '<div class="huong-dan">Mảng lớn, ít khi đổi. Việc cụ thể thì dùng Tag bên dưới.</div></div>';
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
