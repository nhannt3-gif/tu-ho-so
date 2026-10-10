/* ==========================================================
   19. TÌM VÀ LỌC KIỂU FINDER (macOS) + SẮP XẾP KIỂU EXPLORER
   Gõ vào ô tìm → app gợi ý "Nghiệp vụ: Xử lý rủi ro", "Năm: 2026"…
   Chọn một gợi ý thì nó thành một THẺ LỌC. Nhiều thẻ cộng dồn với nhau.
   Phần chữ còn lại vẫn tìm tự do trong tên, trích yếu, ghi chú.
   ========================================================== */
var THE_LOC = [];          /* [{loai, gt, nhan}] */
var SAP = {cot:'ngay', xuoi:false};

var LOAI_LOC = {
  nghiepvu : {nhan:'Nghiệp vụ',   khoa:'the'},
  chuongtrinh:{nhan:'Chương trình',khoa:'ctrinh'},
  tag      : {nhan:'Tag',         khoa:'tag'},
  nam      : {nhan:'Năm',         khoa:'nam'},
  thang    : {nhan:'Tháng',       khoa:'thang'},
  loai     : {nhan:'Loại VB',     khoa:'loai'},
  coquan   : {nhan:'Cơ quan',     khoa:'coquan'},
  xa       : {nhan:'Xã/phường',   khoa:'xa'},
  ap       : {nhan:'Ấp/khu phố',  khoa:'ap'},
  to       : {nhan:'Tổ',          khoa:'to'},
  trangthai: {nhan:'Trạng thái',  khoa:'trangthai'}
};

/* gom mọi giá trị có thể lọc từ kho hiện tại */
function nguonLoc(tab, kho){
  var g = {nghiepvu:{}, chuongtrinh:{}, tag:{}, nam:{}, thang:{},
           loai:{}, xa:{}, ap:{}, to:{}, trangthai:{}};
  var kn = khoaNgay(tab);
  kho.forEach(function(m){
    if(m.mang) g.nghiepvu[m.mang]=1;
    (m.the||[]).forEach(function(t){ g.tag[t]=1; });
    (m.ctrinh||[]).forEach(function(t){ g.chuongtrinh[t]=1; });
    (m.tag||[]).forEach(function(t){ g.tag[t]=1; });
    var d = String(m[kn]||'');
    if(d.length>=4) g.nam[d.slice(0,4)]=1;
    if(d.length>=7) g.thang[d.slice(5,7)]=1;
    if(m.loai) g.loai[m.loai]=1;
    if(m.xa) g.xa[m.xa]=1;
    if(m.ap) g.ap[m.ap]=1;
    if(m.to) g.to[m.to]=1;
    if(m.hetHieuLuc) g.trangthai['Hết hiệu lực']=1;
    else g.trangthai['Còn hiệu lực']=1;
    if(m.daLenDrive) g.trangthai['Đã lên Drive']=1;
    if(m.chiMucThoi) g.trangthai['Chỉ mục, chưa tải']=1;
  });
  return g;
}

/* gợi ý khi anh gõ */
function goiYLoc(tab, kho, q){
  if(!q || q.length<1) return [];
  var g = nguonLoc(tab, kho), ra = [], qq = boDau(q);
  Object.keys(g).forEach(function(l){
    Object.keys(g[l]).forEach(function(v){
      if(ra.length>=9) return;
      var nhan = l==='thang' ? ('Tháng '+parseInt(v,10)) : v;
      if(boDau(nhan).indexOf(qq)>=0 && !coThe(l, v))
        ra.push({loai:l, gt:v, nhan:LOAI_LOC[l].nhan+': '+nhan});
    });
  });
  return ra;
}
function coThe(l, v){
  return THE_LOC.some(function(t){ return t.loai===l && t.gt===v; });
}
function themThe(l, v, nhan){
  if(coThe(l,v)) return;
  THE_LOC.push({loai:l, gt:v, nhan:nhan});
  var o = document.getElementById('otim');
  if(o) o.value = '';
  tuKhoa = '';
  dongGoiY();
  ve();
}
function boThe(i){ THE_LOC.splice(i,1); ve(); }
function boHetThe(){ THE_LOC = []; ve(); }

/* áp các thẻ lọc lên danh sách */
function locTheoThe(tab, ds){
  var kn = khoaNgay(tab);
  THE_LOC.forEach(function(t){
    ds = ds.filter(function(m){
      switch(t.loai){
        case 'nghiepvu':    return m.mang===t.gt;
        case 'chuongtrinh': return (m.ctrinh||[]).indexOf(t.gt)>=0 || (t.gt!=='Dùng chung' && (m.ctrinh||[]).indexOf('Dùng chung')>=0);   /* 3.77 */
        case 'tag':         return (m.tag||[]).indexOf(t.gt)>=0 || (m.the||[]).indexOf(t.gt)>=0;
        case 'nam':         return String(m[kn]||'').slice(0,4)===t.gt;
        case 'thang':       return String(m[kn]||'').slice(5,7)===t.gt;
        case 'loai':        return m.loai===t.gt;
        case 'xa':          return m.xa===t.gt;
        case 'ap':          return m.ap===t.gt;
        case 'to':          return m.to===t.gt;
        case 'trangthai':
          if(t.gt==='Hết hiệu lực') return !!m.hetHieuLuc;
          if(t.gt==='Còn hiệu lực') return !m.hetHieuLuc;
          if(t.gt==='Đã lên Drive') return !!m.daLenDrive;
          if(t.gt==='Chỉ mục, chưa tải') return !!m.chiMucThoi;
          return true;
      }
      return true;
    });
  });
  return ds;
}

/* thanh thẻ lọc hiện dưới ô tìm */
function veTheLoc(){
  if(!THE_LOC.length) return '';
  return '<div class="the-hang">'+
    THE_LOC.map(function(t, i){
      return '<span class="the-chip">'+coChuHTML(t.nhan)+
        '<b onclick="boThe('+i+')">✕</b></span>';
    }).join('')+
    (THE_LOC.length>1?'<span class="the-chip xoa" onclick="boHetThe()">Bỏ hết</span>':'')+
    '</div>';
}

/* bảng gợi ý nổi dưới ô tìm */
function veGoiY(tab, kho){
  var q = document.getElementById('otim').value.trim();
  var e = document.getElementById('goiy');
  if(!e) return;
  var ds = goiYLoc(tab, kho, q), hoDs = timHo(q);   /* 3.82: kèm hồ sơ hộ khớp tên */
  var khH = nganHienTai===7 ? slNhayTabHTML(q) : '';   /* 3.86: ô tìm chung không tra khách hàng (tab con Tra cứu KH có ô riêng); đang ở tab Số liệu thì gợi ý nhảy sang tab có kết quả */
  if(!ds.length && !hoDs.length && !khH){ e.classList.remove('hien'); return; }
  HO_GY = hoDs;
  e.innerHTML = (ds.length ? '<div class="gy-dau">Lọc nhanh</div>'+
    ds.map(function(x){
      return '<button onclick="themThe(\'' +x.loai+ '\',\'' +
        String(x.gt).replace(/'/g,"\\'")+ '\',\'' +
        x.nhan.replace(/'/g,"\\'")+ '\')">'+coChuHTML(x.nhan)+'</button>';
    }).join('') : '')+
    (hoDs.length ? '<div class="gy-dau">🏠 Hồ sơ hộ</div>'+hoDs.map(function(x, i){
      return '<button onclick="dongGoiY();moHoSoHo(HO_GY['+i+'])">🏠 '+coChuHTML(x.ten)+(x.phu?' <small>'+coChuHTML(x.phu)+'</small>':'')+'</button>'; }).join('') : '')+khH;
  e.classList.add('hien');
}
var HO_GY = [];
function dongGoiY(){
  var e = document.getElementById('goiy');
  if(e) e.classList.remove('hien');
}

/* ---- sắp xếp kiểu Explorer ---- */
var COT_SAP = [
  {ma:'ten',  nhan:'Tên'},
  {ma:'ngay', nhan:'Ngày'},
  {ma:'loai', nhan:'Loại'},
  {ma:'co',   nhan:'Dung lượng'},
  {ma:'them', nhan:'Vừa thêm'}   /* 3.98: file mới đưa vào tủ gần nhất lên đầu */
];
function lucThemMuc(m){ return String(m.themLuc || m.taoLuc || m.luc || m.suaLuc || ''); }
/* 3.74 (AK-2): "n kết quả" nằm đầu hàng Sắp xếp — bỏ dòng đếm riêng, danh sách lên cao hơn */
function veThanhSap(tab, kieuRieng, dangChon, hamDoi, dem){
  return '<div class="sap">'+(dem ? '<span class="sap-dem">'+dem+'</span>' : '')+
    (kieuRieng ? '<span class="nhan-loc">Xem</span>'+kieuRieng.map(function(x){
        return '<button'+(dangChon===x[0]?' class="bat"':'')+' onclick="'+hamDoi+'(\''+x[0]+'\')">'+x[1]+'</button>';
      }).join('')+'<span class="sap-ngan"></span>' : '')+
    '<span class="nhan-loc">Sắp xếp</span>'+
    (tab==='bieuMau' ? COT_SAP.concat(COT_SAP_BM) : COT_SAP).map(function(c){
      var dang = SAP.cot===c.ma;
      return '<button'+(dang?' class="bat"':'')+' onclick="doiSap(\'' +c.ma+ '\')">'+
        c.nhan+(dang?(SAP.xuoi?' ▲':' ▼'):'')+'</button>';
    }).join('')+
    '<span style="flex:1"></span>'+
    '<button onclick="datKieu(\'ds\')"'+(kieuXem==='ds'?' class="bat"':'')+
      ' title="Xem dạng danh sách, mỗi file một dòng">☰ Danh sách</button>'+
    '<button onclick="datKieu(\'thang\')"'+(kieuXem==='thang'?' class="bat"':'')+
      ' title="Gom file theo năm rồi theo tháng">🗂 Nhóm</button>'+
    (kieuXem==='thang' ? '<button class="sap-ico" onclick="bungNhom(true)" title="Bung hết các năm, tháng">⊞</button><button class="sap-ico" onclick="bungNhom(false)" title="Thu gọn hết các năm, tháng">⊟</button>' : '')+
    '<button onclick="batDongGon()"'+(D.cauHinh.dongGon?' class="bat"':'')+' title="'+(D.cauHinh.dongGon?'Đang gọn: mỗi file 1 dòng — bấm để hiện lại dòng tag, CT vay':'Gọn: ẩn dòng tag, CT vay — mỗi file 1 dòng, thấy được nhiều file hơn')+'">▤ Gọn</button>'+
    '<button class="chi-may'+(anPVCua(tenTabPV())?'':' bat')+'" onclick="batTatPV()" title="'+
      (anPVCua(tenTabPV())?'Bật khung xem nhanh bên phải để đọc file ngay':'Tắt khung xem nhanh cho danh sách rộng hơn')+
      ' — nhớ riêng cho tab này">▣ Khung xem</button>'+
    '<button class="sap-ico" onclick="chepDuongMay(thuMucTab(\''+tab+'\'))" title="Ổ G — chép đường dẫn thư mục trên ổ G, dán vào Explorer là mở đúng thư mục">📂</button>'+
    '<button class="sap-ico" onclick="moThuMucDrive(thuMucTab(\''+tab+'\'))" title="Drive — mở thư mục này trên Drive web bằng trình duyệt">☁</button>'+
    '</div>';
}
/* 3.31: 2 cột sắp riêng của tab Biểu mẫu */
var COT_SAP_BM = [{ma:'dung', nhan:'Số lần dùng'}, {ma:'namvb', nhan:'Năm VB gốc'}];
function doiSap(c){
  if(SAP.cot===c) SAP.xuoi = !SAP.xuoi;
  else { SAP.cot = c; SAP.xuoi = false; }
  ve();
}
function sapXep(ds, tab){
  var kn = khoaNgay(tab), d = SAP.xuoi ? 1 : -1;
  return ds.slice().sort(function(a,b){
    var x, y;
    if(SAP.cot==='ten'){ x = boDau(a.tenMoi||a.ten||a.tenCu||''); y = boDau(b.tenMoi||b.ten||b.tenCu||''); }
    else if(SAP.cot==='loai'){ x = boDau(a.loai||''); y = boDau(b.loai||''); }
    else if(SAP.cot==='co'){ x = a.co||0; y = b.co||0; }
    else if(SAP.cot==='them'){ x = lucThemMuc(a); y = lucThemMuc(b); }
    else { x = String(a[kn]||''); y = String(b[kn]||''); }
    if(x<y) return -d;
    if(x>y) return d;
    return 0;
  });
}
