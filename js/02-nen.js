/* ==========================================================
   TỦ HỒ SƠ — bản 1.0  (giai đoạn 1)
   Cấu trúc file:
     1. Hằng số & cấu hình mặc định
     2. Lưu trữ (localStorage + IndexedDB cho file)
     3. Tiện ích chung (bỏ dấu, ngày tháng, thông báo)
     4. Đọc PDF & rút thông tin
     5. Sinh tên chuẩn
     6. Vẽ từng ngăn
     7. Xem trước / In / Gửi
     8. Cài đặt
   ========================================================== */

/* ---------- 1. HẰNG SỐ ---------- */
var PHIEN_BAN = '1.0';
var KHOA = 'tuhoso_v1';
var APP_BAN = '3.147', APP_LUC = '10/10/2026 23:09';   /* số bản + giờ cập nhật, hiện ở Cài đặt và Hướng dẫn */

var MO_APP_LAN = Math.floor(Math.random()*997);   /* đổi câu mỗi lần mở app */
var MAC_DINH = {
  donvi: 'PGD NHCSXH Gò Dầu',
  thumuc: 'Tủ hồ sơ',
  coChu: 1,
  tuTai: true,
  tuLenDrive: true,
  hsTuDrive: true,   /* 3.32: lưu hồ sơ CCCD là đưa PDF lên Drive */
  clientId: '',
  giaoDien: 'auto',
  soTrangDoc: 2,
  kieuTen: 'codau',
  nghiepVu: ['Tín dụng','Kế hoạch - Nguồn vốn','Kế toán - Ngân quỹ','Kiểm tra - Giám sát',
             'Hành chính - Tổ chức','Tin học','Khác'],
  chuongTrinh: ['HN','HCN','HMTN','NS&VSMT','GQVL','HSSV','NO-HN','NOXH','SXKD-VKK','XKLĐ','NCHXAPT'],
  ctTen: {'HN':'Cho vay hộ nghèo','HCN':'Cho vay hộ cận nghèo','HMTN':'Cho vay hộ mới thoát nghèo',
    'NS&VSMT':'Cho vay nước sạch và vệ sinh môi trường nông thôn',
    'GQVL':'Cho vay giải quyết việc làm, duy trì và mở rộng việc làm',
    'HSSV':'Cho vay học sinh, sinh viên có hoàn cảnh khó khăn','NO-HN':'Cho vay hộ nghèo về nhà ở',
    'NOXH':'Cho vay nhà ở xã hội','SXKD-VKK':'Cho vay hộ gia đình sản xuất, kinh doanh tại vùng khó khăn',
    'XKLĐ':'Cho vay người lao động đi làm việc ở nước ngoài theo hợp đồng',
    'NCHXAPT':'Cho vay người chấp hành xong án phạt tù'},
  loaiVB: ['Công văn','Quyết định','Kế hoạch','Hướng dẫn','Thông báo','Báo cáo','Tờ trình'],
  nhanGhiChu: ['Giao ban','Tập huấn','Hồ sơ - biểu mẫu','Cần xử lý','Lưu để nhớ'],
  /* 3.31: địa bàn anh quản lý — ma trận mặc định chỉ hiện và chỉ báo thiếu cho các xã này (sửa ở Cài đặt › Địa bàn) */
  xaQuanLy: ['Phường Gia Lộc','Xã Truông Mít'],
  /* 3.31: danh sách tổ (mã tổ, tên tổ trưởng) KHÔNG để trong mã nguồn công khai —
     anh nhập tay ở Cài đặt › Địa bàn › Sửa danh sách tổ; máy đã có dữ liệu thì giữ nguyên */
  diaBan: [
    {xa:'Phường Gò Dầu', ma:'540035', diem:[
      {ten:'Phường Gò Dầu', ma:'TXN0543502', ngay:'05', ap:[
        {ten:'Thanh Bình',ma:'54003508',to:[]},
        {ten:'Nội Ô',ma:'54003511',to:[]},
        {ten:'Rạch Sơn',ma:'54003510',to:[]},
        {ten:'Thanh Hà',ma:'54003507',to:[]}
      ]},
      {ten:'Gia Bình', ma:'TXN0543501', ngay:'12', ap:[
        {ten:'Gia Bình',ma:'54003503',to:[]},
        {ten:'Bình Nguyên',ma:'54003505',to:[]},
        {ten:'Khu Phố Chánh',ma:'54003501',to:[]}
      ]},
      {ten:'Thanh Phước', ma:'TXN0543503', ngay:'18', ap:[
        {ten:'Thanh Phước',ma:'54003516',to:[]},
        {ten:'Trâm Vàng',ma:'54003519',to:[]},
        {ten:'Cây Xoài',ma:'54003517',to:[]},
        {ten:'Xóm Mới',ma:'54003518',to:[]},
        {ten:'Trâm Vàng 2',ma:'54003514',to:[]}
      ]}
    ]},
    {xa:'Xã Phước Thạnh', ma:'540079', diem:[
      {ten:'Phước Trạch', ma:'TXN0547901', ngay:'06', ap:[
        {ten:'Bàu Vừng',ma:'54007901',to:[]},
        {ten:'Cây Nính',ma:'54007902',to:[]},
        {ten:'Xóm Mía',ma:'54007903',to:[]}
      ]},
      {ten:'Phước Thạnh', ma:'TXN0547902', ngay:'10', ap:[
        {ten:'Đá Hàng',ma:'54007907',to:[]},
        {ten:'Xóm Bố',ma:'54007908',to:[]},
        {ten:'Giữa',ma:'54007906',to:[]},
        {ten:'Tầm Lanh',ma:'54007909',to:[]},
        {ten:'Cây Da',ma:'54007904',to:[]}
      ]},
      {ten:'Phước Thạnh 2', ma:'TXN0547903', ngay:'21', ap:[
        {ten:'Phước Đông',ma:'54007912',to:[]},
        {ten:'Phước Bình',ma:'54007914',to:[]},
        {ten:'Phước Hội',ma:'54007910',to:[]},
        {ten:'Phước Tây',ma:'54007916',to:[]}
      ]}
    ]},
    {xa:'Phường Gia Lộc', ma:'540034', diem:[
      {ten:'Gia Lộc 2', ma:'TXN0543404', ngay:'07', ap:[
        {ten:'Gia Lâm',ma:'54003402',to:[]},
        {ten:'Lộc Trát',ma:'54003403',to:[]},
        {ten:'Lộc Khê',ma:'54003404',to:[]},
        {ten:'Gia Tân',ma:'54003401',to:[]},
        {ten:'Tân Lộc',ma:'54003405',to:[]}
      ]},
      {ten:'Gia Lộc', ma:'TXN0543405', ngay:'23', ap:[
        {ten:'Phước Đức',ma:'54003407',to:[]},
        {ten:'Phước Lộc',ma:'54003408',to:[]},
        {ten:'Suối Cao',ma:'54003409',to:[]},
        {ten:'Phước Đông',ma:'54003406',to:[]},
        {ten:'Cây Trắc',ma:'54003410',to:[]}
      ]}
    ]},
    {xa:'Xã Thạnh Đức', ma:'540082', diem:[
      {ten:'Thạnh Đức', ma:'TXN0548201', ngay:'13', ap:[
        {ten:'Bông Trang',ma:'54008205',to:[]},
        {ten:'Bến Chò',ma:'54008208',to:[]},
        {ten:'Bến Đình',ma:'54008203',to:[]},
        {ten:'Đường Long',ma:'54008209',to:[]},
        {ten:'Bến Mương',ma:'54008202',to:[]},
        {ten:'Rộc A',ma:'54008210',to:[]},
        {ten:'Bến Rộng',ma:'54008206',to:[]},
        {ten:'Trà Võ',ma:'54008204',to:[]},
        {ten:'Rộc B',ma:'54008201',to:[]}
      ]},
      {ten:'Cẩm Giang', ma:'TXN0548202', ngay:'15', ap:[
        {ten:'Cẩm Bình',ma:'54008212',to:[]},
        {ten:'Cẩm An',ma:'54008211',to:[]},
        {ten:'Cẩm Long',ma:'54008213',to:[]},
        {ten:'Cẩm Thắng',ma:'54008214',to:[]}
      ]}
    ]},
    {xa:'Xã Truông Mít', ma:'540083', diem:[
      {ten:'Truông Mít 2', ma:'TXN0548301', ngay:'19', ap:[
        {ten:'Thuận Tân',ma:'54008305',to:[]},
        {ten:'Thuận Bình',ma:'54008303',to:[]},
        {ten:'Thuận An',ma:'54008304',to:[]},
        {ten:'Thuận Phước',ma:'54008302',to:[]},
        {ten:'Thuận Hòa',ma:'54008301',to:[]}
      ]},
      {ten:'Truông Mít', ma:'TXN0548302', ngay:'25', ap:[
        {ten:'Ấp 6',ma:'54008311',to:[]},
        {ten:'Ấp 1',ma:'54008306',to:[]},
        {ten:'Ấp 2',ma:'54008307',to:[]},
        {ten:'Ấp 4',ma:'54008309',to:[]},
        {ten:'Ấp 7',ma:'54008312',to:[]},
        {ten:'Ấp 3',ma:'54008308',to:[]},
        {ten:'Ấp 5',ma:'54008310',to:[]}
      ]}
    ]}
  ],
  /* 3.23: 10 loại anh Nhân liệt kê. theoNgay = báo cáo chạy theo ngày giao dịch (tên file có thêm ngày)
     gopPGD = một file gộp cả PGD, không cần chọn đơn vị */
  mauBaoCao: [
    {ten:'Kết quả giao dịch xã',                ma:'KQGD',      tuKhoa:['kết quả giao dịch','ket qua giao dich'], cap:['xa','diem'], theoNgay:true},
    {ten:'Kết quả giao dịch toàn phòng',        ma:'KQGD_PGD',  tuKhoa:['kết quả giao dịch toàn phòng','toan phong'], cap:['pgd'], theoNgay:true},
    {ten:'Nợ đến hạn cuối năm (31/12)',         ma:'NDH_CN',    tuKhoa:['đến hạn cuối năm','den han cuoi nam','đến hạn 31/12']},
    {ten:'Nợ đến hạn trong tháng',              ma:'NDH_TT',    tuKhoa:['đến hạn trong tháng','nợ đến hạn','den han']},
    {ten:'Nợ quá hạn',                          ma:'NQH',       tuKhoa:['nợ quá hạn','no qua han','món vay nợ quá hạn']},
    {ten:'Nợ khoanh',                           ma:'NK',        tuKhoa:['nợ khoanh','no khoanh']},
    {ten:'Món vay 3 tháng không hoạt động',     ma:'3TKHD',     tuKhoa:['3 tháng','không hoạt động','khd']},
    {ten:'Chất lượng Tổ TK&VV hàng tháng',      ma:'CLTO_T',    tuKhoa:['chất lượng tổ','tổ tk&vv','chat luong to']},
    {ten:'Chất lượng Tổ TK&VV định kỳ',         ma:'CLTO_DK',   tuKhoa:['chất lượng tổ định kỳ','định kỳ']},
    {ten:'THHĐ theo đơn vị hành chính',         ma:'THHD_DVHC', coExcel:true, tuKhoa:['đơn vị hành chính','don vi hanh chinh'], cap:['pgd'], gopPGD:true},
    {ten:'THHĐ theo nguồn vốn',                 ma:'THHD_NV', coExcel:true,   tuKhoa:['nguồn vốn','nguon von'],                 cap:['pgd'], gopPGD:true},
    {ten:'THHĐ theo hội đoàn thể',              ma:'THHD_HOI', coExcel:true,  tuKhoa:['hội đoàn thể','ủy thác','uy thac'],      cap:['pgd'], gopPGD:true},
    {ten:'THHĐ theo ấp, khu phố',               ma:'THHD_AP', coExcel:true,   tuKhoa:['ấp, khu phố','khu phố','ap khu pho'],    cap:['pgd'], gopPGD:true},
    /* nhóm sao kê thuần Excel — chỉ một ô Toàn PGD, không tách xã/điểm */
    {ten:'Sao kê tín dụng chi tiết',             ma:'SK_TD',   thuanXLS:true, tuKhoa:['sao kê tín dụng','sao ke tin dung']},
    {ten:'Sao kê khách hàng',                    ma:'SK_KH',   thuanXLS:true, tuKhoa:['sao kê khách hàng','sao ke khach hang']},
    {ten:'Sao kê nợ khoanh',                     ma:'SK_NK',   thuanXLS:true, tuKhoa:['sao kê nợ khoanh']},
    {ten:'Sao kê nợ quá hạn',                    ma:'SK_NQH',  thuanXLS:true, tuKhoa:['sao kê nợ quá hạn']},
    {ten:'Tổng dư nợ theo chương trình vay',     ma:'TDN_CTV', thuanXLS:true, tuKhoa:['theo chương trình vay','chuong trinh vay']},
    {ten:'Thông tin tổ trưởng',                  ma:'TT_TO',   thuanXLS:true, tuKhoa:['thông tin tổ trưởng','to truong']},
    {ten:'Số liệu báo cáo họp giao ban',         ma:'SL_GB',   cap:['diem'], tuKhoa:['họp giao ban','giao ban']}
  ]
};

var TEN_NHOM = {vanBan:'Văn bản', duLieu:'Dữ liệu tháng', ghiChu:'Ghi chú', khac:'Khác'};

var VIET_TAT_LOAI = {
  'Công văn':'CV','Quyết định':'QD','Kế hoạch':'KH','Hướng dẫn':'HD',
  'Thông báo':'TB','Báo cáo':'BC','Tờ trình':'TTr'
};

/* ---------- 2. LƯU TRỮ ---------- */
var D = {cauHinh:{}, vanBan:[], duLieu:[], ghiChu:[], cho:[], ganDay:[], bieuMau:[], rac:[], scan:[], kyAnh:[], boHS:[]};

function nap(){
  try{
    var s = localStorage.getItem(KHOA);
    if(s){
      var j = JSON.parse(s);
      D.vanBan = j.vanBan||[]; D.duLieu = j.duLieu||[];
      D.ghiChu = j.ghiChu||[]; D.ganDay = j.ganDay||[]; D.cho = j.cho||[]; D.bieuMau = j.bieuMau||[]; D.rac = j.rac||[]; D.scan = j.scan||j.cauHinh&&j.cauHinh.hsDS||[];
      if(typeof HS!=='undefined') HS.ds = D.scan;   /* 3.79.1 */
      D.lich = j.lich||{viec:[], daXoa:[]};
      D.daXoaHan = j.daXoaHan||[];
      D.kyAnh = j.kyAnh||[];   /* 3.51: sửa lỗi — trước đây danh sách Chữ ký·CCCD không lưu trong máy (chỉ lấy lại qua Drive) */
      D.boHS = j.boHS||[];
      D.nguonCau = j.nguonCau||{cauChu:[], ngayXua:{}};
      D.cauHinh = j.cauHinh||{};
    }
  }catch(e){ console.warn('Không đọc được dữ liệu cũ', e); }
  for(var k in MAC_DINH){ if(D.cauHinh[k]===undefined) D.cauHinh[k]=MAC_DINH[k]; }
}

function luu(){
  try{
    localStorage.setItem(KHOA, JSON.stringify({
      phienBan:PHIEN_BAN, cauHinh:D.cauHinh, vanBan:D.vanBan,
      duLieu:D.duLieu, ghiChu:D.ghiChu, ganDay:D.ganDay, cho:D.cho, bieuMau:D.bieuMau, rac:D.rac, scan:D.scan, lich:D.lich, daXoaHan:D.daXoaHan||[], nguonCau:D.nguonCau||null,
      kyAnh:D.kyAnh||[], boHS:D.boHS||[]
    }));
    if(typeof henDongBoChiMuc==='function') henDongBoChiMuc();
    if(typeof chTheoDoi==='function') chTheoDoi();   /* 3.113: cài đặt đổi → tự đẩy lên Drive */
    return true;
  }catch(e){
    baoLoi('Không lưu được — bộ nhớ trình duyệt đã đầy. Vào Cài đặt xuất dữ liệu ra file để giải phóng.');
    return false;
  }
}

/* File thật lưu trong IndexedDB (tách khỏi chỉ mục cho nhẹ) */
var kho = null, khoHong = false, khoTam = {};
function moKho(){
  return new Promise(function(ok,loi){
    if(kho) return ok(kho);
    if(khoHong) return loi(new Error('kho-hong'));
    var xong = false;
    var canh = setTimeout(function(){
      if(!xong){ xong = true; khoHong = true; loi(new Error('kho-cho-lau')); }
    }, 3000);
    try{
      var r = indexedDB.open('tuhoso_file', 1);
      r.onupgradeneeded = function(e){
        var db = e.target.result;
        if(!db.objectStoreNames.contains('f')) db.createObjectStore('f');
      };
      r.onsuccess = function(e){
        if(xong) return; xong = true; clearTimeout(canh);
        kho = e.target.result; ok(kho);
      };
      r.onerror = r.onblocked = function(){
        if(xong) return; xong = true; clearTimeout(canh);
        khoHong = true; loi(r.error||new Error('kho-loi'));
      };
    }catch(e){
      xong = true; clearTimeout(canh); khoHong = true; loi(e);
    }
  });
}
function canhBaoKhoTam(){
  if(!window.__daBaoKhoTam){
    window.__daBaoKhoTam = true;
    bao('Trình duyệt không cho lưu file ở đây, app đang giữ tạm trong bộ nhớ. Đóng app là mất file (chỉ mục vẫn còn). Nên tải file HTML về máy rồi mở trực tiếp.', 9);
  }
}
function luuFile(id, blob){
  return moKho().then(function(db){
    return new Promise(function(ok,loi){
      try{
        var t = db.transaction('f','readwrite');
        t.objectStore('f').put(blob, id);
        t.oncomplete = function(){ ok(true); };
        t.onerror = function(){ loi(t.error); };
      }catch(e){ loi(e); }
    });
  }).catch(function(){
    khoTam[id] = blob; canhBaoKhoTam(); return true;
  });
}
function docFile(id){
  if(khoTam[id]) return Promise.resolve(khoTam[id]);
  return moKho().then(function(db){
    return new Promise(function(ok,loi){
      try{
        var t = db.transaction('f','readonly');
        var q = t.objectStore('f').get(id);
        q.onsuccess = function(){ ok(q.result||null); };
        q.onerror = function(){ loi(q.error); };
      }catch(e){ loi(e); }
    });
  }).catch(function(){ return khoTam[id]||null; });
}
function xoaFile(id){
  delete khoTam[id];
  return moKho().then(function(db){
    return new Promise(function(ok){
      try{
        var t = db.transaction('f','readwrite');
        t.objectStore('f').delete(id); t.oncomplete = function(){ ok(true); };
      }catch(e){ ok(true); }
    });
  }).catch(function(){ return true; });
}

/* ---------- 3. TIỆN ÍCH ---------- */
function boDau(s){
  if(!s) return '';
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
          .replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
}
function slug(s, gioiHan){
  var t = boDau(s).replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim();
  if(gioiHan){ t = t.split(' ').slice(0, gioiHan).join(' '); }
  t = t.split(' ').map(function(w){ return w.charAt(0).toUpperCase()+w.slice(1); }).join('-');
  return t;
}
function hai(n){ return (n<10?'0':'')+n; }
function ngayISO(d){ return d.getFullYear()+'-'+hai(d.getMonth()+1)+'-'+hai(d.getDate()); }
function ngayVN(s){
  if(!s) return '';
  var p = s.split('-');
  return p.length===3 ? p[2]+'/'+p[1]+'/'+p[0] : s;
}
function kyVN(s){
  if(!s) return '';
  var p = s.split('-');
  return p.length>=2 ? 'T'+parseInt(p[1],10)+'/'+p[0] : s;
}
function nay(){ return new Date(); }
function idMoi(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function coChuHTML(s){ var d=document.createElement('div'); d.textContent=s||''; return d.innerHTML; }

var tBao;
function bao(t, giay){
  var e = document.getElementById('bao');
  e.textContent = t; e.classList.remove('goc'); e.classList.add('hien');
  clearTimeout(tBao);
  tBao = setTimeout(function(){ e.classList.remove('hien'); }, (giay||3)*1000);
}
function baoLoi(t){ bao(t, 6); }
/* 3.50: báo kèm nút Hoàn tác (xóa vào thùng rác lỡ tay) */
var BAO_HT = null;
function baoHoanTac(t, ham, giay){
  var e = document.getElementById('bao'); BAO_HT = ham;
  e.innerHTML = coChuHTML(t)+' <button class="bao-ht" onclick="event.stopPropagation();var h=BAO_HT;BAO_HT=null;document.getElementById(\'bao\').classList.remove(\'hien\');if(h)h()">↩ Hoàn tác</button>';
  e.classList.add('hien'); e.classList.toggle('goc', window.innerWidth>=700);   /* 3.68 (AE): nhỏ ở góc, 3 giây — lỡ tay sau đó vẫn ↶ / Ctrl+Z */
  clearTimeout(tBao);
  tBao = setTimeout(function(){ e.classList.remove('hien'); BAO_HT = null; }, 3000);
}

function vanTay(file){
  if(!(window.crypto && crypto.subtle)) return Promise.resolve(null);
  return file.arrayBuffer().then(function(b){
    return crypto.subtle.digest('SHA-256', b);
  }).then(function(h){
    return Array.prototype.map.call(new Uint8Array(h), function(x){
      return ('0'+x.toString(16)).slice(-2); }).join('').slice(0,24);
  }).catch(function(){ return null; });
}
function timTrung(van){
  if(!van) return null;
  var a = D.vanBan.concat(D.duLieu, D.ghiChu, D.cho);
  for(var i=0;i<a.length;i++) if(a[i].van===van) return a[i];
  return null;
}

function kichCo(b){
  if(b<1024) return b+' B';
  if(b<1048576) return (b/1024).toFixed(0)+' KB';
  return (b/1048576).toFixed(1)+' MB';
}
