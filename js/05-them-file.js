/* ---------- 7. THÊM FILE & DUYỆT TÊN ---------- */
var dangDoc = false;

function veThem(){
  var tt = document.getElementById('tt-them');
  if(dangDoc){
    tt.innerHTML = '<div class="thanh-tt cho">Đang đọc file… <div class="tien"><i id="tienI"></i></div></div>';
  }else if(D.cho.length){
    var kho = D.cho.filter(function(c){ return !c.chac; }).length;
    tt.innerHTML = '<div class="thanh-tt">Đã đọc '+D.cho.length+' file · '+
      (D.cho.length-kho)+' file nhận chắc chắn'+(kho?', '+kho+' file cần anh xem':'')+'</div>';
  }else if(coTheNoiDrive()){
    tt.innerHTML = '<div class="thanh-tt">Chưa có file nào chờ. '+
      'Chọn hoặc kéo file vào ô dưới. <b>Nạp khay chờ</b> lấy file trong thư mục <b>_Chờ xử lý</b> trên Drive — '+
      'lưu ý Google chỉ cho app thấy file <b>do app đưa lên</b>; file anh tự chép vào ổ G thì kéo thả thẳng vào đây.</div>';
  }else{
    tt.innerHTML = '<div class="thanh-tt">Chưa có file nào chờ. Chọn hoặc kéo file vào ô dưới.</div>';
  }

  var ds = D.cho;
  if(tuKhoa) ds = ds.filter(function(c){ return boDau(c.tenMoi+c.tenCu).indexOf(tuKhoa)>=0; });
  ds = ds.slice().sort(function(a,b){ return (a.chac?1:0)-(b.chac?1:0); });

  document.getElementById('ds-cho').innerHTML = ds.map(function(c){
    return '<div class="hang-file'+(c.chac?'':' hoi')+'">'+
      '<div class="cu">'+coChuHTML(c.tenCu)+'</div>'+
      '<div class="moi">'+coChuHTML(c.tenMoi)+'</div>'+
      '<div class="duong">📁 '+coChuHTML(thuMucCua(c))+
        (c.duongTuy?' <b>(anh tự chọn)</b>':'')+'</div>'+
      thuocTinhHTML(c)+
      '<div class="can-cu">'+coChuHTML(c.canCu)+'</div>'+
      (c.canhBao ? '<div class="cb-lech">'+c.canhBao+'</div>' : '')+
      '<div class="hang-nut">'+
        '<button class="nho" onclick="deKhaiSau(\''+c.id+'\')" title="Chưa quyết xếp vào đâu — để lại khay chờ">⏳ Để khai sau</button>'+
        '<button class="nho chinh" onclick="duyet(\''+c.id+'\')">Duyệt</button>'+
        '<button class="nho" onclick="suaCho(\''+c.id+'\')">Chi tiết / Sửa</button>'+
        '<button class="nho" onclick="xemCho(\''+c.id+'\')">Xem</button>'+
        (coTheDocLai(c) ? '<button class="nho" onclick="docLaiGoiY(\''+c.id+'\')" title="Đọc số hiệu, ngày, trích yếu và so sánh với tên hiện tại">🔍 Đọc lại &amp; gợi ý tên</button>' : '')+
        '<button class="nho xau" onclick="boCho(\''+c.id+'\')">Bỏ</button>'+
      '</div></div>';
  }).join('');
}

/* tóm tắt thuộc tính hiện ngay trên hàng chờ */
function thuocTinhHTML(c){
  /* 3.40: ghi rõ file này thuộc tab nào (và thêm từ tab nào) — duyệt là vào đúng tab đó */
  var t = ['<span class="mini ct" title="Duyệt là lưu vào tab này — đổi ở Chi tiết / Sửa › Nhóm">→ Tab '+coChuHTML(TEN_NHOM[c.nhom]||'Văn bản')+'</span>'];
  if(c.tuTab && c.tuTab!==c.nhom) t.push('<span class="mini">thêm từ tab '+coChuHTML(TEN_NHOM[c.tuTab]||c.tuTab)+'</span>');
  if(c.nhom==='duLieu'){
    t.push('<span class="mini">'+coChuHTML(c.tenLoai||'Khác')+'</span>');
    t.push('<span class="mini">kỳ '+kyVN(c.ky)+'</span>');
  }else if(c.nhom==='ghiChu'){
    t.push('<span class="mini">'+ngayVN(c.ngay)+'</span>');
    (c.the||[]).forEach(function(x){ t.push('<span class="mini">'+coChuHTML(x)+'</span>'); });
  }else{
    if(c.loai) t.push('<span class="mini">'+coChuHTML(c.loai)+'</span>');
    if(c.soHieu) t.push('<span class="mini">'+coChuHTML(c.soHieu)+'</span>');
    t.push('<span class="mini">'+ngayVN(c.ngay)+'</span>');
    (c.the||[]).forEach(function(x){ t.push('<span class="mini">'+coChuHTML(x)+'</span>'); });
    (c.ctrinh||[]).forEach(function(x){ t.push('<span class="mini ct">'+coChuHTML(x)+'</span>'); });
  }
  if(c.co) t.push('<span class="mini">'+kichCo(c.co)+'</span>');
  if(c.soTrang) t.push('<span class="mini">'+c.soTrang+' trang</span>');
  return '<div class="goi-y" style="margin:6px 0 7px">'+t.join(' ')+'</div>';
}

/* nhận file vào */
function gioiThieuFile(dsFile){
  if(!dsFile || !dsFile.length) return;
  if(nganHienTai===7){   /* 3.85: kéo thả vào tab Số liệu → nạp cả bộ */
    var ex = Array.prototype.filter.call(dsFile, function(f){ return /\.(xlsx|xls|xlsm|csv)$/i.test(f.name||''); });
    if(ex.length){ slDocNhieu(ex); return; }
  }
  if(nganHienTai!==6) TAB_TRUOC = nganHienTai;   /* 3.34: kéo thả vào tab Tháng cũng nhớ tab để xếp đúng */
  var khoTab = TAB_KHO[nganHienTai!==6 ? nganHienTai : THEM_TU] || null;
  THEM_TU = null;
  /* 3.144 (anh chốt): bỏ tab Tháng — file Excel thêm ngoài tab Văn bản là file số liệu → sang tab 📥 Nạp & KT (xem trước, nhận loại theo nội dung) */
  var exSL = khoTab==='vanBan' ? [] : Array.prototype.filter.call(dsFile, function(f){ return laFileExcel(f.name||''); });
  if(exSL.length){
    dsFile = Array.prototype.filter.call(dsFile, function(f){ return exSL.indexOf(f)<0; });
    if(!dsFile.length){ moNapSL(); slDocNhieu(exSL); return; }
    bao(exSL.length+' file Excel sẽ nạp ở tab 📥 Nạp & KT sau khi đọc xong các file còn lại.', 5);
  }
  dangDoc = true; batChay(); doiNgan(6);
  var xong = 0, tong = dsFile.length;
  var lan = Array.prototype.slice.call(dsFile).map(function(f){
    return xuLyMotFile(f, khoTab).then(function(){
      xong++;
      var i = document.getElementById('tienI');
      if(i) i.style.width = Math.round(xong/tong*100)+'%';
      tienChay(Math.round(xong/tong*100));
    });
  });
  Promise.all(lan).then(function(){
    dangDoc = false; tatChay(); luu(); ve();
    if(exSL.length){ var nCho = D.cho.length; moNapSL(); slDocNhieu(exSL); if(nCho) bao('Các file khác đang ở khay chờ ('+nCho+') — duyệt sau.', 6); return; }   /* 3.144 */
    var trung = DS_TRUNG.splice(0);
    if(trung.length){
      if(!D.cho.some(function(x){ return !x.deSau; })) doiNgan(TAB_TRUOC||1);
      baoTrung(trung);
      if(D.cho.length) bao('Đã đọc xong '+(tong-trung.length)+' file mới. Xem rồi bấm Duyệt.', 4);
      return;
    }
    if(D.cho.length) bao('Đã đọc xong '+tong+' file. Xem rồi bấm Duyệt.', 4);
    else baoLoi('Không nhận được file nào. Thử tải file app về máy rồi mở trực tiếp.');
  }).catch(function(e){
    dangDoc = false; tatChay(); ve();
    baoLoi('Lỗi khi đọc file: '+(e&&e.message||e));
  });
}

function laFileExcel(ten){ return /\.(xlsx|xls|xlsm|csv)$/i.test(ten||''); }
/* 3.34: file trùng nội dung — báo rõ đã nằm ở tab nào; thêm từ ô ma trận thì cho chuyển mục cũ vào ô đó */
var DS_TRUNG = [], TRUNG = [];
function tenTabMuc(m){
  if(D.cho.indexOf(m)>=0) return 'Chờ khai';
  return {vanBan:'Văn bản', duLieu:'Tháng', ghiChu:'Ghi chú', bieuMau:'Biểu mẫu'}[khoCuaMuc(m)] || 'Văn bản';
}
function timMucCaCho(id){
  return timMuc(id) || (D.cho||[]).find(function(x){ return x.id===id; }) || null;
}
function baoTrung(ds){
  TRUNG = ds;
  var h = '<div class="hop-tit">'+ds.length+' file trùng nội dung — không lưu thêm bản sao</div>'+
    '<div class="hop-phu">Nội dung giống hệt file đã có trong tủ. Anh xem file đó đang nằm ở đâu:</div>';
  ds.forEach(function(x, i){
    var m = timMucCaCho(x.id); if(!m) return;
    var dungO = x.o && m.nhom==='duLieu' && m.ky===x.o.ky && m.maLoai===x.o.ma && (m.phamVi||'')===x.o.pham;
    h += '<div class="trung-dong"><div class="trung-chu"><b>'+coChuHTML(x.ten)+'</b><br>'+
      '<small>Đã có ở tab <b>'+tenTabMuc(m)+'</b> · '+coChuHTML(m.tenMoi||m.tenCu||'')+
      (dungO?' · <b>đã đúng ô này</b>':'')+'</small></div><div class="hang-nut">'+
      (x.o && !dungO ? '<button class="nho chinh" onclick="chuyenVaoO('+i+')">Chuyển vào ô '+kyVN(x.o.ky)+' · '+
        coChuHTML(x.o.ten)+' · '+coChuHTML(x.o.pham)+'</button>' : '')+
      (D.cho.indexOf(m)>=0 ? '<button class="nho" onclick="dongHop();doiNgan(6)">Mở khay chờ</button>'
                           : '<button class="nho" onclick="dongHop();moXem(\''+m.id+'\')">Mở</button>')+
      '</div></div>';
  });
  moHop(h+'<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button></div>', true);
}
/* dời mục đã có (Văn bản / Ghi chú / ô khác) vào ô ma trận anh bấm — không tạo bản sao, tên và thư mục Drive đổi theo */
function chuyenVaoO(i){
  var x = TRUNG[i]; if(!x || !x.o) return;
  var m = timMucCaCho(x.id); if(!m) return;
  var trongCho = D.cho.indexOf(m)>=0;
  if(!trongCho){
    ['vanBan','ghiChu','duLieu'].forEach(function(k){ D[k] = D[k].filter(function(y){ return y!==m; }); });
  }
  m.nhom = 'duLieu'; m.ky = x.o.ky; m.maLoai = x.o.ma; m.tenLoai = x.o.ten; m.phamVi = x.o.pham;
  m.chac = true; m.banPhu = false;
  m.canCu = 'Anh chuyển vào ô ma trận: '+kyVN(x.o.ky)+' · '+x.o.ten+' · '+x.o.pham;
  m.tenMoi = tenDuLieu(m, m.duoi);
  m.suaLuc = new Date().toISOString();
  if(!trongCho) D.duLieu.push(m);
  D.cauHinh.kyBang = x.o.ky;
  luu(); dongHop();
  if(trongCho){ doiNgan(6); return bao('Đã gán ô '+kyVN(x.o.ky)+' · '+x.o.ten+' cho file trong khay chờ — bấm Duyệt.', 6); }
  if(m.driveId && !laFileHeThong(m) && !m.driveMat){ m.choDB = true; luu(); }
  doiNgan(2);
  bao('Đã chuyển vào ô '+kyVN(x.o.ky)+' · '+x.o.ten+' · '+x.o.pham+' trên ma trận'+
      (m.choDB ? ' — tên và thư mục trên Drive đổi theo' : ''), 6);
  if(m.choDB && DR.sanSang && DR.online) dongBoMotLenDrive(m).then(function(){ capNhatChip(); });
}
/* nhận mẫu báo cáo từ TÊN file: ưu tiên mã ở đầu tên (SK_TD_ToanPGD_2026_09.xlsx), rồi tới từ khóa */
function khopMaTenFile(ten){
  var t = String(ten||'').replace(/\.[^.]+$/,'').toUpperCase(), ds = D.cauHinh.mauBaoCao||[], tot = null;
  ds.forEach(function(m){
    var ma = String(m.ma||'').toUpperCase();
    if(ma && (t===ma || t.indexOf(ma+'_')===0 || t.indexOf(ma+'-')===0 || t.indexOf(ma+' ')===0) &&
       (!tot || ma.length > tot.ma.length)) tot = m;
  });
  return tot;
}
function khopMauTenFile(ten){
  return khopMaTenFile(ten) || khopMau(String(ten||'').replace(/[_\-.]+/g,' '));
}
/* đọc kỳ (và ngày số liệu nếu có) trong tên file: 2026_09, 2026-09-25, T9-2026, 30.09.2026 */
function kyTuTenFile(ten){
  var t = String(ten||'').replace(/\.[^.]+$/,'');
  var m = t.match(/(20\d{2})[_\-. ](\d{1,2})(?:[_\-. ](\d{1,2}))?(?!\d)/);
  if(m && +m[2]>=1 && +m[2]<=12) return {ky:m[1]+'-'+hai(+m[2]), ngay:(m[3] && +m[3]<=31) ? m[1]+'-'+hai(+m[2])+'-'+hai(+m[3]) : ''};
  m = t.match(/(\d{1,2})[_\-.\/](\d{1,2})[_\-.\/](20\d{2})/);
  if(m && +m[2]>=1 && +m[2]<=12) return {ky:m[3]+'-'+hai(+m[2]), ngay:m[3]+'-'+hai(+m[2])+'-'+hai(+m[1])};
  m = t.match(/\bT(?:hang)?\s*(\d{1,2})[_\-.\/ ](20\d{2})\b/i);
  if(m && +m[1]>=1 && +m[1]<=12) return {ky:m[2]+'-'+hai(+m[1]), ngay:''};
  return null;
}
/* đơn vị trong tên file: Phuong_Gia_Loc → Phường Gia Lộc, Gia_Loc_2 → Gia Lộc 2 (tên dài nhất khớp trước) */
function phamViTuTenFile(ten){
  var t = ' '+boDau(String(ten||'').replace(/\.[^.]+$/,'')).replace(/[^a-z0-9]+/g,' ')+' ';
  if(/ toan ?pgd | toan don vi /.test(t)) return 'Toàn PGD';
  var ds = dsDonVi('xa').concat(dsDonVi('diem')).map(function(x){ return {x:x, k:' '+boDau(x).replace(/[^a-z0-9]+/g,' ').trim()+' '}; })
    .sort(function(a,b){ return b.k.length-a.k.length; });
  for(var i=0;i<ds.length;i++) if(ds[i].k.trim() && t.indexOf(ds[i].k)>=0) return ds[i].x;
  return '';
}
/* mục Dữ liệu tháng dựng từ tên file (Excel không đọc nội dung khi thêm) — không đoán: thiếu gì thì để anh xem */
function duLieuTuTenFile(id, van, f, duoi){
  var mau = khopMauTenFile(f.name), kt = kyTuTenFile(f.name), pv = phamViTuTenFile(f.name);
  if(mau && mau.thuanXLS && !pv) pv = 'Toàn PGD';
  /* 3.34: tên không có kỳ mà đang thêm từ tab Tháng → lấy kỳ đang xem trên ma trận (trước lấy tháng hiện tại nên lệch ô) */
  var kyXem = (!kt && TAB_TRUOC===2) ? kyBang() : '';
  var d = {id:id, van:van, nhom:'duLieu', tenCu:f.name, duoi:duoi, co:f.size,
    ky:kt ? kt.ky : (kyXem || ngayISO(nay()).slice(0,7)), maLoai:mau ? mau.ma : 'KHAC', tenLoai:mau ? mau.ten : 'Khác',
    phamVi:pv||'', nsl:kt ? kt.ngay : '', banPhu:false, ghiThem:'',
    chac:!!(mau && kt && pv),
    canCu:'File Excel — app lấy thông tin từ tên file'+(mau?' · khớp “'+mau.ten+'”':' · chưa nhận ra loại báo cáo — anh chọn loại')+
      (kt?' · kỳ '+kyVN(kt.ky):(kyXem?' · tên không có kỳ, tạm lấy kỳ đang xem '+kyVN(kyXem)+' — anh xem lại'
                                      :' · KHÔNG đọc được kỳ trong tên — anh xem lại'))};
  d.tenMoi = tenDuLieu(d, duoi);
  return d;
}
/* 3.40 (anh Nhân chốt): THÊM TỪ TAB NÀO THÌ MẶC ĐỊNH LƯU VÀO TAB ĐÓ — app không tự chuyển sang tab khác.
   App vẫn đọc nội dung để điền sẵn; thấy giống loại khác thì chỉ ghi chú, anh đổi nhóm ở khay chờ nếu cần.
   Thêm từ Hôm nay hoặc thả vào khay chờ thì app tự xếp như cũ. */
var TAB_KHO = {1:'vanBan', 3:'ghiChu'};   /* 3.144: bỏ tab Tháng */
var THEM_TU = null;   /* tab vừa bấm nút Thêm file (bấm xong mới sang khay chờ chọn file) */
function theoTabGoc(dsMoi, kho){
  dsMoi.forEach(function(m){
    if(!m || m.nhom===kho) return;
    var cu = m.nhom;
    chuyenNhom(m, kho);
    m.canCu = 'Thêm từ tab '+TEN_NHOM[kho]+' nên lưu vào '+TEN_NHOM[kho]+
      ' (nội dung giống '+(TEN_NHOM[cu]||cu)+' — đổi nhóm ở trên nếu cần)'+(m.canCu?' · '+m.canCu:'');
    m.chac = false;
  });
}
function xuLyMotFile(f, khoTab){
  /* khoTab: chỉ có khi anh bấm Thêm file / thả file ở một tab. Thả vào khay chờ, quét Drive, Picker thì app tự xếp như cũ */
  var kho = !CHO_O && khoTab, truoc = D.cho.length;
  if(kho) return xuLyMotFile0(f, kho).then(function(){
    var moi = D.cho.slice(truoc);
    theoTabGoc(moi, kho);
    moi.forEach(function(m){ m.tuTab = kho; });
  });
  return xuLyMotFile0(f);
}
function xuLyMotFile0(f, khoTab){
  var duoi = duoiFile(f.name);
  var laAnh = /\.(jpg|jpeg|png|heic|webp)$/i.test(f.name);
  var laPDF = /\.pdf$/i.test(f.name);
  var id = idMoi();
  var oLuc = CHO_O ? {ky:CHO_O.ky, ma:CHO_O.ma, ten:CHO_O.ten, pham:CHO_O.pham} : null;

  return vanTay(f).then(function(van){
    var tr = timTrung(van);
    if(tr){
      /* 3.34: không bỏ qua lặng lẽ — gom lại, đọc xong hiện hộp ghi rõ file đã nằm ở đâu (và cho chuyển vào ô ma trận) */
      DS_TRUNG.push({ten:f.name, id:tr.id, o:oLuc});
      if(oLuc) CHO_O = null;
      return null;
    }
    return luuFile(id, f).then(function(){ return {van:van}; });
  }).then(function(kq){
    if(!kq) return;
    var van = kq.van;

    if(laAnh){
      var g = {id:id, van:van, nhom:'ghiChu', tenCu:f.name, duoi:duoi, co:f.size,
               ngay:ngayISO(nay()), moTa:'', the:[], chac:false,
               canCu:'Ảnh — hãy ghi một dòng mô tả để sau này dễ nhớ'};
      g.tenMoi = tenGhiChu(g, duoi);
      D.cho.push(CHO_O ? apChoO(g, f.name) : g); return;
    }
    /* 3.31: file Excel/CSV — bấm ô ma trận, tên file khớp mẫu báo cáo, hoặc thêm từ tab Tháng
       thì vào Dữ liệu tháng (trước đây mọi file không phải PDF đều bị xếp vào Văn bản) */
    /* 3.40: thêm từ tab Văn bản thì tôn trọng tab anh chọn — Excel chỉ sang Dữ liệu tháng khi tên bắt đầu đúng mã báo cáo
       (KQGD_…, NQH_…), không đoán theo từ khóa trong tên (công văn có chữ "nợ quá hạn", "giao ban" bị xếp nhầm) */
    var tuVB = (khoTab==='vanBan');
    if(false && laFileExcel(f.name) && !tuVB && (CHO_O || TAB_TRUOC===2 || khopMauTenFile(f.name))){   /* 3.144: bỏ tab Tháng — không tạo mục Dữ liệu tháng nữa */
      D.cho.push(apChoO(duLieuTuTenFile(id, van, f, duoi), f.name)); return;
    }
    if(!laPDF){
      var tfw = tuTenFile(f.name);
      var v = {id:id, van:van, nhom:'vanBan', tenCu:f.name, duoi:duoi, co:f.size,
               soHieu:tfw.soHieu||'', ngay:tfw.ngay||ngayISO(nay()),
               loai:tfw.loai||doanLoai(f.name, tfw.soHieu), the:[], ctrinh:[],
               chac:!!(tfw.soHieu && tfw.ngay),
               trichYeu:tfw.trichYeu||f.name.replace(/\.[^.]+$/,''),
               canCu:'Không phải PDF — app lấy thông tin từ tên file'};
      v.tenMoi = tenVanBan(v, duoi);
      D.cho.push(CHO_O ? apChoO(v, f.name) : v); return;
    }
    return docChuPDF(f, D.cauHinh.soTrangDoc||2).then(function(r){
      var chu = r.chu||'';
      var mau = khopMauNoiDung(chu);
      /* 3.40: PDF thêm từ tab Văn bản chỉ sang Dữ liệu tháng khi nội dung rõ là BẢNG số liệu */
      if(mau && khoTab==='vanBan') mau = null;   /* thêm từ tab Văn bản → đọc như văn bản */
      mau = null;   /* 3.144: bỏ tab Tháng — PDF bảng số liệu vào Văn bản (số liệu nạp bằng Excel ở tab 📥 Nạp & KT) */
      if(mau){
        /* 3.20: ngày số liệu quyết định bản cuối tháng hay dữ liệu phụ */
        var nsl = docNgaySoLieu(chu), xl = loaiBanThang(nsl, mau && mau.ma);
        var ky = (xl.ky) || rutKy(chu) || ngayISO(nay()).slice(0,7);
        var pv = docPhamVi(chu, f.name);
        var d = {id:id, van:van, nhom:'duLieu', tenCu:f.name, duoi:duoi, co:f.size,
                 soTrang:r.trang, ky:ky, maLoai:mau.ma, tenLoai:mau.ten, phamVi:pv||'',
                 nsl:nsl?nsl.iso:'', banPhu:(xl.loai==='phu'), banChuaRo:(xl.loai==='chuaro'),
                 ghiThem:'', chac:(xl.loai==='cuoi' && !!pv),
                 canCu:'Khớp mẫu “'+mau.ten+'” · kỳ '+kyVN(ky)+
                   (xl.loai==='cuoi' ? ' · số liệu đến '+ngayVN(nsl.iso)+' (bản cuối tháng)'
                    : xl.loai==='phu' ? ' · số liệu đến '+ngayVN(nsl.iso)+', chưa hết tháng — chờ bản '+
                        ('0'+xl.cuoi).slice(-2)+'/'+ky.slice(5)+'/'+ky.slice(0,4)
                    : ' · KHÔNG đọc được ngày số liệu — anh xem lại')};
        d.tenMoi = tenDuLieu(d, duoi);
        D.cho.push(apChoO(d, chu)); return;
      }
      if(!chu){
        var tf0 = tuTenFile(f.name);
        /* 3.46 (mục K): PDF chụp không có chữ — KHÔNG tự điền ngày hôm nay (dễ sai); gắn nhãn, thiếu gì thì bấm 🔍 Đọc chữ */
        var x = {id:id, van:van, nhom:'vanBan', tenCu:f.name, duoi:duoi, co:f.size, anhPDF:true,
                 soTrang:r.trang, soHieu:tf0.soHieu||'',
                 ngay:tf0.ngay||'',
                 loai:tf0.loai||doanLoai(f.name, tf0.soHieu),
                 the:[], ctrinh:[], chac:!!(tf0.soHieu && tf0.ngay && tf0.trichYeu),
                 trichYeu:tf0.trichYeu||f.name.replace(/\.[^.]+$/,''),
                 canCu:'PDF ảnh — chưa đọc được chữ. App lấy thông tin từ tên file'+
                       (tf0.soHieu?(': số '+tf0.soHieu):'')+
                       (tf0.ngay?(', ngày '+ngayVN(tf0.ngay)):'')+(!(tf0.soHieu && tf0.ngay && tf0.trichYeu) ? ' · thiếu thì bấm 🔍 Đọc chữ' : '')};
        x.tenMoi = tenVanBan(x, duoi); D.cho.push(apChoO(x, chu)); return;
      }
      var dauVB = docDauVB(chu), so = dauVB.so, ng = dauVB.ngay;   /* 3.53: chỉ phần đầu văn bản */
      var ty = rutTyVB(chu), loiFont = false;
      if(ty && chuLoiFont(ty)){ ty = null; loiFont = true; }   /* 3.61 */
      /* thiếu gì thì lấy nốt từ chính tên file anh đặt */
      var tf = tuTenFile(f.name), tuTen = [], lech = [];
      if(so && tf.soHieu && chuanSoHieu(so)!==chuanSoHieu(tf.soHieu)) lech.push('tên file ghi số '+tf.soHieu);
      if(ng && tf.ngay && ng!==tf.ngay) lech.push('tên file ghi ngày '+ngayVN(tf.ngay));
      if(!so && tf.soHieu){ so = tf.soHieu; tuTen.push('số hiệu'); }
      if(!ng && tf.ngay){ ng = tf.ngay; tuTen.push('ngày'); }
      if(!ty && tf.trichYeu){ ty = tf.trichYeu; tuTen.push('nội dung'); }
      var loai = doanLoai(chu+' '+f.name, so);
      var cc = [];
      cc.push(so?('số '+so):'chưa có số hiệu');
      cc.push(ng?('ngày '+ngayVN(ng)):'chưa có ngày');
      cc.push(ty?'có trích yếu':'chưa có trích yếu');
      if(tuTen.length) cc.push('lấy '+tuTen.join(', ')+' từ tên file (phần đầu văn bản không đọc được)');
      if(dauVB.kem) cc.push(dauVB.kem+' lấy từ dòng "ban hành kèm theo…"');
      if(loiFont) cc.push('⚠ chữ trong PDF bị lỗi font — trích yếu lấy theo tên file, anh kiểm tra bằng khung xem');
      if(lech.length) cc.push('⚠ '+lech.join(', ')+' — anh xem lại');
      var v2 = {id:id, van:van, nhom:'vanBan', tenCu:f.name, duoi:duoi, co:f.size,
        soTrang:r.trang, soHieu:so||'', ngay:ng||ngayISO(nay()), loai:loai,
        trichYeu:ty||f.name.replace(/\.[^.]+$/,''),
        mang:doanMang(chu),
        the:goiYThe(chu, tuKhoaCua('tag'), dsTag('vanBan')),
        ctrinh:ctGoiY(chu),
        chac:!!(so && ng && ty) && !lech.length && !loiFont && tuTen.indexOf('số hiệu')<0 && tuTen.indexOf('ngày')<0, canCu:'Đọc được: '+cc.join(' · ')};
      v2.tenMoi = tenVanBan(v2, duoi);
      D.cho.push(v2);
    });
  }).catch(function(e){
    console.warn(e);
    var id2 = idMoi();
    var v3 = {id:id2, nhom:'vanBan', tenCu:f.name, duoi:duoiFile(f.name), co:f.size,
      ngay:ngayISO(nay()), loai:'Công văn', the:[], ctrinh:[], chac:false,
      trichYeu:f.name.replace(/\.[^.]+$/,''),
      canCu:'Chưa đọc được nội dung ('+(e&&e.message||'lỗi')+') — anh nhập giúp'};
    v3.tenMoi = tenVanBan(v3, v3.duoi);
    khoTam[id2] = f; D.cho.push(CHO_O ? apChoO(v3, f.name) : v3);
  });
}

/* mục cùng kỳ + cùng loại + cùng phạm vi đã có bản cuối tháng chưa */
function banCuoiTrung(m){
  return D.duLieu.filter(function(x){
    return x.id!==m.id && x.ky===m.ky && (x.maLoai||'KHAC')===(m.maLoai||'KHAC') &&
           (x.phamVi||'')===(m.phamVi||'') && !x.banPhu;
  });
}
function hoiTrungBanCuoi(m, tiep){
  var cu = banCuoiTrung(m);
  if(!cu.length) return tiep();
  moHop('<div class="hop-tit">Đã có bản cuối tháng của kỳ này</div>'+
    '<div class="hop-phu">'+kyVN(m.ky)+' · '+coChuHTML(m.tenLoai||'')+(m.phamVi?' · '+coChuHTML(m.phamVi):'')+
    '<br>Bản đang có: <b>'+coChuHTML(cu[0].tenMoi||cu[0].tenCu||'')+'</b></div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho" onclick="dongHop();thucHienDuyet(\''+m.id+'\',false)">Giữ cả hai</button>'+
      '<button class="nho chinh" onclick="dongHop();thucHienDuyet(\''+m.id+'\',true)">Thay bản cũ</button>'+
    '</div>');
}
function thucHienDuyet(id, thay){
  var m = (D.cho||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  if(thay){
    var cu = banCuoiTrung(m).map(function(x){ return x.id; });
    if(cu.length) chuyenVaoRac(cu, 'Bị thay bởi bản cuối tháng mới');
  }
  duyetThat(id);
}
/* cho phép lưu một file dữ liệu phụ (anh bấm "Vẫn lưu") */
function vanLuuBanPhu(id){
  var m = (D.cho||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  m.chapNhanPhu = true; m.tenMoi = tenDuLieu(m, m.duoi);
  luu(); duyet(id);
}
function duyet(id, imLang){
  var m0 = (D.cho||[]).find(function(x){ return x.id===id; });
  /* 3.31 (mục 11a): kỳ đã chốt — thêm file phải xác nhận */
  if(m0 && m0.nhom==='duLieu' && laKyChot(m0.ky) && !m0.xacNhanChot && !imLang)
    return hoi('Kỳ '+kyVN(m0.ky)+' đã chốt', 'Kỳ này anh đã chốt đủ bộ. Vẫn lưu thêm “'+(m0.tenMoi||'')+'” vào kỳ này?',
      'Vẫn lưu', function(){ m0.xacNhanChot = true; duyet(id); });
  /* 3.77: văn bản trùng số hiệu + năm với bản đã có → hỏi Giữ cả 2 / Bỏ file mới / Lưu rồi gộp */
  if(m0 && m0.nhom!=='duLieu' && m0.nhom!=='ghiChu' && !imLang && !m0.xacNhanTrung){
    var trVB = vbTrungVoi(m0); if(trVB.length) return hoiTrungVB(m0, trVB);
  }
  /* 3.23: app KHÔNG còn chặn theo nội dung đọc được — chỉ gợi ý, anh quyết */
  if(m0 && m0.nhom==='duLieu' && !imLang && !m0.banPhu)
    return hoiTrungBanCuoi(m0, function(){ duyetThat(id, imLang); });
  return duyetThat(id, imLang);
}
/* 3.27: thoát màn thêm file cho rõ ràng */
var TAB_TRUOC = 1;
function dongKhai(){
  if(D.cho.length && !D.cho.every(function(x){ return x.deSau; })){
    return hoi('Còn '+D.cho.length+' file chưa khai', 'Để lại trong khay chờ? Vào 📥 Chờ khai lúc nào cũng khai tiếp được.',
      'Để lại khay chờ', function(){ D.cho.forEach(function(x){ x.deSau = true; }); luu(); doiNgan(TAB_TRUOC||1); });
  }
  doiNgan(TAB_TRUOC||1);
}
function deKhaiSau(id){
  var m = (D.cho||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  m.deSau = true; m.luDo = 'chưa quyết xếp vào đâu'; m.vaoKhayLuc = new Date().toISOString();
  luu(); ve();
  bao('Đã để lại khay chờ — vào 📥 Chờ khai khi cần khai tiếp.', 6);
  if(!D.cho.some(function(x){ return !x.deSau; })) doiNgan(TAB_TRUOC||1);
}
function duyetThat(id, imLang){
  var i = D.cho.findIndex(function(c){ return c.id===id; });
  if(i<0) return;
  var c = D.cho.splice(i,1)[0];
  /* 3.23: chốt chặn — mục nào chưa có tên mới thì ghép ngay, không để lưu thiếu tên */
  if(!c.tenMoi) c.tenMoi = (c.nhom==='duLieu') ? tenDuLieu(c, c.duoi) : xemTenTruoc(c);
  c.themLuc = new Date().toISOString();
  if(c.nhom==='duLieu') D.duLieu.push(c);
  else if(c.nhom==='ghiChu') D.ghiChu.push(c);
  else D.vanBan.push(c);   /* gồm cả nhóm Khác */
  luu(); ve();
  /* 3.27: khai xong file cuối thì tự quay về đúng tab chứa file vừa lưu */
  if(nganHienTai===6 && !D.cho.some(function(x){ return !x.deSau; })){
    /* 3.31: ghi chú về tab Ghi chú (trước nhầm sang tab 5 = Biểu mẫu);
       dữ liệu tháng thì ma trận nhảy tới đúng kỳ và báo rõ ô vừa lưu */
    var dich = (c.nhom==='duLieu') ? 2 : (c.nhom==='ghiChu' ? 3 : 1);
    if(dich===2 && c.ky) D.cauHinh.kyBang = c.ky;
    setTimeout(function(){
      if(dich===3) D.cauHinh.tvPhan = 'gc';   /* 3.43: vừa lưu ghi chú → mở phần Ghi chú của tab Thư viện */
      doiNgan(dich);
      bao(dich===2 ? ('Đã lưu vào ô '+kyVN(c.ky)+' · '+(c.tenLoai||'Khác')+' · '+(c.phamVi||'chưa rõ đơn vị')+' trên ma trận')
                   : ('Đã lưu vào '+({1:'Văn bản',3:'Ghi chú'}[dich])+' · '+c.tenMoi), 7);
    }, 120);
  }
  if(c.tuKhay){
    if(imLang) return;   /* 3.31: "Duyệt tất cả" tự đổi tên lần lượt ở lamDuyetHet — không gọi 2 lần */
    doiTenTrenDrive(c).then(function(){
      ve(); if(!imLang) bao('Đã đổi tên và xếp chỗ ngay trên Drive · '+c.tenMoi, 5);
    }).catch(function(e){
      baoLoi('Lưu vào tủ rồi nhưng chưa đổi được tên trên Drive: '+(e&&e.message||e));
    });
    return;
  }
  if(DR.sanSang && D.cauHinh.tuLenDrive!==false && !imLang){
    dayLenDrive(c).then(function(){
      ve(); bao('Đã đưa lên Drive · '+c.tenMoi, 5);
    }).catch(function(e){
      baoLoi('Chưa đưa lên Drive được: '+(e&&e.message||e));
    });
    return;
  }
  if(D.cauHinh.tuTai!==false && !imLang){
    mucDangXem = c; taiFile(true);
  }else bao('Đã lưu · '+c.tenMoi, 3);
}
function duyetTatCa(){
  var n = D.cho.length;
  if(!n) return;
  var vaoChot = D.cho.filter(function(c){ return c.nhom==='duLieu' && laKyChot(c.ky) && !c.xacNhanChot; });
  if(vaoChot.length) return hoi('Có '+vaoChot.length+' file vào kỳ đã chốt',
    'Kỳ '+vaoChot.map(function(c){ return kyVN(c.ky); }).filter(function(x,i,a){ return a.indexOf(x)===i; }).join(', ')+
    ' đã chốt. Vẫn duyệt hết?', 'Vẫn duyệt', function(){ vaoChot.forEach(function(c){ c.xacNhanChot = true; }); duyetTatCa(); });
  var kho = D.cho.filter(function(c){ return !c.chac; }).length;
  if(kho){
    hoi('Duyệt tất cả '+n+' file?',
        'Trong đó có '+kho+' file app chưa chắc chắn (nền vàng). Anh nên xem lại trước khi duyệt.',
        'Vẫn duyệt hết', function(){ lamDuyetHet(); });
  }else lamDuyetHet();
}
function lamDuyetHet(){
  var n = D.cho.length;
  var ds = D.cho.slice();
  while(D.cho.length) duyet(D.cho[0].id, true);
  var tuKhay = ds.filter(function(m){ return m.tuKhay; });
  if(tuKhay.length){
    bao('Đang đổi tên '+tuKhay.length+' file ngay trên Drive…', 5);
    tuKhay.reduce(function(p,m){
      return p.then(function(){ return doiTenTrenDrive(m).catch(function(e){
        console.warn(m.tenMoi, e); }); });
    }, Promise.resolve()).then(function(){
      ve(); bao('Đã đổi tên và xếp chỗ '+tuKhay.length+' file trên Drive.', 6);
    });
    return;
  }
  if(DR.sanSang && D.cauHinh.tuLenDrive!==false) return dayLenNhieu(ds);
  if(D.cauHinh.tuTai!==false) taiLanLuot(ds);
  else bao('Đã duyệt và lưu '+n+' file.', 3);
}
/* tải lần lượt, cách nhau một nhịp để trình duyệt không chặn */
function taiLanLuot(ds){
  if(navigator.canShare){
    bao('Đã duyệt '+ds.length+' file. Máy này chỉ gửi được từng file một — '+
        'mở từng mục rồi bấm Lưu / Gửi để giữ đúng tên chuẩn.', 8);
    return;
  }
  bao('Đang lưu '+ds.length+' file đã đổi tên…', 4);
  ds.reduce(function(p, m, i){
    return p.then(function(){
      return new Promise(function(ok){
        mucDangXem = m; taiFile(true);
        setTimeout(ok, 700);
      });
    });
  }, Promise.resolve()).then(function(){
    bao('Đã lưu xong '+ds.length+' file đã đổi tên.', 4);
  });
}
function boCho(id){
  var i = D.cho.findIndex(function(c){ return c.id===id; });
  if(i<0) return;
  hoi('Bỏ file này?','File sẽ không được đưa vào tủ. File gốc của anh không bị ảnh hưởng.',
      'Bỏ', function(){
    var c = D.cho.splice(i,1)[0];
    xoaFile(c.id); luu(); ve(); bao('Đã bỏ.', 2);
  });
}
function xemCho(id){
  var c = D.cho.find(function(x){ return x.id===id; });
  if(c) moXem(id, c);
}

/* ---------- 8. XEM TRƯỚC / IN / GỬI ---------- */
var mucDangXem = null;

/* Lấy nội dung một mục: ưu tiên kho trong máy, không có thì tải từ Drive */
function layNoiDung(m){
  /* 3.50: bản scan → dựng PDF từ ảnh trong máy, không có thì lấy PDF trên Drive; Chữ ký · CCCD → ảnh JPG */
  if(m && (m.che || m.khoCu==='scan')) return coAnhTrongMay(m).then(function(co){
    if(co) return pdfCuaScan(m);
    return m.driveId ? taiPDFDrive(m.driveId).catch(function(){ return null; }) : null;
  });
  if(m && (m.khoCu==='kyAnh' || (/^ka/.test(m.id||'') && m.loai))) return layAnhKA(m);
  var dId = m.driveId || m.tuKhay;   /* 3.50: file lấy từ kho cũ / file lạc (tuKhay) cũng tải được */
  var baoTai = function(){ ['x-than','cp-than'].forEach(function(k){ var e = document.getElementById(k); if(e && /Đang mở/.test(e.textContent)) e.innerHTML = '<div class="rong">☁ Đang tải từ Drive'+(m.co?' ('+kichCo(m.co)+')':'')+'… lần sau mở sẽ nhanh.</div>'; }); };
  return (m.khongLuu ? Promise.resolve(null) : docFile(m.id)).then(function(b){
    if(b) return b;
    if(!dId || !coTheNoiDrive()) return null;
    baoTai();
    return canToken().then(function(co){
      if(!co) return null;
      return fetch('https://www.googleapis.com/drive/v3/files/'+dId+'?alt=media',
                   {headers:{'Authorization':'Bearer '+DR.token}})
        .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.blob(); })
        .then(function(bl){ if(!m.khongLuu) luuFile(m.id, bl); return bl; });
    }).catch(function(e){ console.warn(e); return null; });
  });
}
/* PDF của một bản scan dựng thẳng từ bản ghi (kể cả bản đang nằm thùng rác) */
function pdfCuaScan(k){
  if(k.che==='tailieu') return dungTaiLieu([k], 'blob');
  if(!window.PDFLib) return Promise.resolve(null);
  return dungPDFThe([{truoc:k.matTruoc ? k.id+'_matTruoc' : '', sau:k.matSau ? k.id+'_matSau' : '', nhan:''}], '')
    .then(function(bytes){ return new Blob([bytes], {type:'application/pdf'}); });
}
/* 3.50: XEM THỬ một file bất kỳ từ các danh sách (thùng rác, chờ khai, lập chỉ mục, quét rác) — máy tính hiện ở khung
   bên phải, điện thoại mở khung xem lớn. Luôn ghi đường dẫn thật. */
function xemThu(loai, id, i){
  var m = null, kieu = loai;
  if(loai==='rac') m = (D.rac||[]).find(function(x){ return x.id===id; });
  else if(loai==='scan') m = timScan(id);
  else if(loai==='ka') m = (D.kyAnh||[]).find(function(x){ return x.id===id; });
  else if(loai==='cho') m = (D.cho||[]).find(function(x){ return x.id===id; });
  else if(loai==='qd'){
    var x = ((QD.kq||{})[id]||[])[i]; if(!x) return;
    if(x.m){ m = x.m; kieu = x.loai==='ka' ? 'ka' : (x.loai==='scan' ? 'scan' : (x.loai==='cho' ? 'cho' : 'muc')); }
    else if(x.che || (/^ka/.test(x.id||'') && x.loai) || x.nhom || x.tenMoi){ m = x; kieu = 'muc'; }
    else { m = {id:'dx_'+x.id, driveId:x.id, tenCu:x.name, tenMoi:x.name, duoi:duoiFile(x.name), co:+(x.size||0), khongLuu:true, duong:x.duong}; kieu = 'drive'; }
  }
  else m = timMuc(id) || (D.cho||[]).find(function(x){ return x.id===id; }) || timScan(id) || (D.kyAnh||[]).find(function(x){ return x.id===id; });
  if(!m) return bao('Không tìm thấy file này nữa.', 3);
  if(kieu==='muc' && (D.cho||[]).indexOf(m)>=0) kieu = 'cho';
  var ten = m.tenMoi||m.ten||m.tenCu||'(chưa đặt tên)';
  var duong = duongThat(m, kieu==='drive'?'drive':(kieu==='ka'?'ka':(kieu==='cho'?'cho':'')));
  var cp = document.getElementById('cotphai');
  if(cp && cp.offsetParent && !anPV){
    mucDangXem = m; cp.classList.remove('pv-trong');
    document.getElementById('cp-ten').textContent = ten;
    document.getElementById('cp-phu').innerHTML = coChuHTML(duong + (m.co ? ' · '+kichCo(m.co) : ''));
    trangChon = {}; veNutCN(m);
    veNoiDung(m, 'phai');
  } else {
    moXem(null, m);
    document.getElementById('x-ten').textContent = ten;
    document.getElementById('x-phu').innerHTML = coChuHTML(duong);
  }
}

function moXem(id, tam){
  var m = tam || timMuc(id);
  if(!m) return;
  mucDangXem = m;
  if(!tam){
    D.ganDay = [id].concat(D.ganDay.filter(function(x){ return x!==id; })).slice(0,8);
    luu();
  }
  var ten = m.tenMoi||m.tenCu||'';
  var phu = [];
  phu.push('📁 '+thuMucCua(m));
  if(m.soTrang) phu.push(m.soTrang+' trang');
  if(m.co) phu.push(kichCo(m.co));
  document.getElementById('x-ten').textContent = ten;
  document.getElementById('x-phu').innerHTML = coChuHTML(phu.join(' · ')) + lienQuanHTML(m);
  trangChon = {}; veNutCN(m);
  document.getElementById('xem').classList.add('hien');
  veNoiDung(m, 'lon');
}

/* ==========================================================
   TRÌNH XEM DÙNG CHUNG cho khung lớn (#x-than) và cột phải (#cp-than)
   Mỗi nơi có bộ điều khiển riêng nhưng dùng chung mã.
   ========================================================== */
var XEM = {
  lon: {id:'x-than', dk:'x-dk', pdf:null, trang:1, tong:1, tyLe:1, che:'ngang', m:null, khung:null},
  phai:{id:'cp-than', dk:'cp-dk', pdf:null, trang:1, tong:1, tyLe:1, che:'ngang', m:null, khung:null},
  sua: {id:'sua-than', dk:'sua-dk', pdf:null, trang:1, tong:1, tyLe:1, che:'ngang', m:null, khung:null}   /* 3.61: khung xem cạnh hộp sửa */
};

function veNoiDung(m, noi){
  /* noi: 'lon' | 'phai' | undefined = cả hai nơi đang hiện */
  var ds = [];
  if(noi) ds = [noi];
  else {
    if(document.getElementById('xem').classList.contains('hien')) ds.push('lon');
    var cp = document.getElementById('cotphai');
    if(cp && cp.offsetParent && !anPV) ds.push('phai');
    if(!ds.length) ds = ['lon'];
  }
  ds.forEach(function(n){ veVaoKhung(m, n); });
}

function veVaoKhung(m, n){
  var S = XEM[n];
  var o = document.getElementById(S.id);
  if(!o) return;
  S.m = m; S.pdf = null; S.trang = 1; S.tong = 1; S.tyLe = 1; S.khung = null; S.chuTrang = null;
  o.innerHTML = '<div class="rong">Đang mở…</div>';
  veDieuKhien(n);
  /* 3.62 (việc U): bản scan CCCD (thẻ) → hiện thẳng 2 mặt thẻ vừa khung, to hơn nhiều so với cả trang A4 */
  if(n!=='sua' && m.che==='the' && m.matTruoc && laScanMuc(m)){
    Promise.all([docAnhHS(m.id+'_matTruoc'), m.matSau ? docAnhHS(m.id+'_matSau') : null]).then(function(a){
      if(S.m!==m) return;
      if(!a[0]) return veVaoKhungPDF(m, n, S, o);
      o.innerHTML = '<div class="the-xem">'+a.filter(Boolean).map(function(b, i){
        return '<figure><img src="'+URL.createObjectURL(b)+'" alt=""><figcaption>'+(i?'Mặt sau':'Mặt trước')+'</figcaption></figure>'; }).join('')+'</div>';
    }).catch(function(){ if(S.m===m) veVaoKhungPDF(m, n, S, o); });
    return;
  }
  veVaoKhungPDF(m, n, S, o);
}
function veVaoKhungPDF(m, n, S, o){

  layNoiDung(m).then(function(b){
    if(!b){
      o.innerHTML = '<div class="rong">'+(m.chiMucThoi
        ? 'Mục này mới có trong chỉ mục, nội dung vẫn nằm trên Drive.<br>Nối Drive để xem ngay tại đây.'
        : 'Không tìm thấy nội dung file.')+'</div>';
      veDieuKhien(n); return;
    }
    var tenF = [m.tenCu, m.tenMoi, m.ten, m.duoi].filter(Boolean).join(' ');
    var laAnh = /^image\//.test(b.type) || /\.(jpg|jpeg|png|webp)(\s|$)/i.test(tenF);
    if(laAnh){
      var u = URL.createObjectURL(b);
      o.innerHTML = '<img src="'+u+'" alt="">'+
        (m.moTa?('<div class="ghi">'+coChuHTML(m.moTa)+'</div>'):'');
      veDieuKhien(n); apZoomKhung(n); return;
    }
    /* 3.50: Excel xem dạng bảng, Word (.docx) xem phần chữ — trước báo "không xem được" */
    if(/\.(xlsx|xlsm|xls|csv)(\s|$)/i.test(tenF) || /spreadsheet|ms-excel|csv/.test(b.type||'')){ xemExcel(b, o, n); return; }
    if(/\.docx(\s|$)/i.test(tenF) || /wordprocessingml/.test(b.type||'')){ xemWord(b, o, n); return; }
    var laPDF = /pdf/.test(b.type||'') || /\.pdf(\s|$)/i.test(tenF) || m.che || m.khoCu==='scan';
    if(!laPDF || !sanSangPDF()){
      o.innerHTML = '<div class="rong">'+(/\.doc(\s|$)/i.test(tenF) ? 'File Word cũ (.doc) chỉ mở được bằng Word.<br>Máy đã cài cầu nối: bấm <b>🖥 Mở máy</b>.'
        : 'Định dạng này không xem được trực tiếp.')+'<br>Bấm <b>Gửi cả file</b> để mở bằng ứng dụng khác.</div>';
      veDieuKhien(n); return;
    }
    moPDFNho(m.id+'|'+b.size, b).then(function(pdf){
      if(S.m!==m) return;   /* anh đã bấm file khác trong lúc chờ */
      S.pdf = pdf; S.tong = pdf.numPages; S.trang = 1;
      veTrang(n);
    }).catch(function(){
      o.innerHTML = '<div class="rong">Không mở được nội dung PDF này.</div>';
      veDieuKhien(n);
    });
  });
}
/* 3.51: MỞ PDF NHANH
   - nhớ 6 tài liệu vừa mở (mở lại gần như tức thì)
   - khởi động sẵn bộ đọc PDF một lần khi app rảnh (lần mở đầu không phải chờ)
   - rê chuột lên một dòng là tải trước (máy tính) */
var PDF_MO = {}, PDF_MO_THU = [];
function moPDFNho(khoa, b){
  if(PDF_MO[khoa]){ PDF_MO_THU = PDF_MO_THU.filter(function(k){ return k!==khoa; }).concat([khoa]); return PDF_MO[khoa]; }
  if(!sanSangPDF()) return Promise.reject(new Error('Chưa tải được bộ đọc PDF'));
  hamNongPDF();
  var p = b.arrayBuffer().then(function(ab){ return pdfjsLib.getDocument({data:new Uint8Array(ab)}).promise; });
  PDF_MO[khoa] = p; PDF_MO_THU.push(khoa);
  p.catch(function(){ delete PDF_MO[khoa]; });
  while(PDF_MO_THU.length>6){
    var cu = PDF_MO_THU.shift(), pc = PDF_MO[cu]; delete PDF_MO[cu];
    if(pc) pc.then(function(d){ setTimeout(function(){ try{ d.destroy(); }catch(e){} }, 3000); }, function(){});
  }
  return p;
}
/* một bộ đọc PDF (worker) dùng chung, khởi động sẵn */
var PDF_NONG = false;
function hamNongPDF(){
  if(PDF_NONG || !window.pdfjsLib || !sanSangPDF()) return;
  PDF_NONG = true;
  try{
    var src = pdfjsLib.GlobalWorkerOptions.workerSrc;
    if(src && !pdfjsLib.GlobalWorkerOptions.workerPort && window.Worker) pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(src);
  }catch(e){ console.warn('Không khởi động sẵn được bộ đọc PDF', e); }
}
var TAI_TRUOC = {hen:0, id:''};
function taiTruocMuc(id){
  if(!id || TAI_TRUOC.id===id) return;
  TAI_TRUOC.id = id;
  var m = timMuc(id); if(!m) return;
  var ten = [m.tenCu, m.tenMoi, m.duoi].join(' ');
  if(!/\.pdf/i.test(ten)) return;
  layNoiDung(m).then(function(b){ if(b && /pdf/.test(b.type||'pdf')) moPDFNho(m.id+'|'+b.size, b).catch(function(){}); }).catch(function(){});
}
document.addEventListener('mouseover', function(e){
  var el = e.target && e.target.closest && e.target.closest('[onclick^="chonDong("]'); if(!el) return;
  var mm = (el.getAttribute('onclick')||'').match(/chonDong\('([^']+)'/); if(!mm) return;
  clearTimeout(TAI_TRUOC.hen);
  TAI_TRUOC.hen = setTimeout(function(){ taiTruocMuc(mm[1]); }, 150);
});

function xemExcel(b, o, n){
  if(!window.XLSX){ o.innerHTML = '<div class="rong">Chưa tải được bộ đọc Excel — có mạng một lần rồi thử lại.</div>'; return veDieuKhien(n); }
  b.arrayBuffer().then(function(ab){
    var wb = XLSX.read(new Uint8Array(ab), {type:'array'});
    var ten = wb.SheetNames||[], h = '';
    ten.slice(0, 6).forEach(function(t, i){
      var ws = wb.Sheets[t]; if(!ws) return;
      var r = ws['!ref'] ? XLSX.utils.decode_range(ws['!ref']) : null;
      if(r && (r.e.r - r.s.r) > 300){ r.e.r = r.s.r + 300; ws = Object.assign({}, ws, {'!ref': XLSX.utils.encode_range(r)}); }
      h += '<div class="xl-ten">📊 '+coChuHTML(t)+(i===0?'':'')+'</div><div class="xl-bang">'+XLSX.utils.sheet_to_html(ws, {header:'', footer:''})+'</div>';
    });
    if(ten.length>6) h += '<div class="huong-dan">… và '+(ten.length-6)+' trang tính nữa.</div>';
    o.innerHTML = h || '<div class="rong">File Excel trống.</div>';
    o.querySelectorAll('.xl-bang table').forEach(function(t){ t.removeAttribute('style'); });
    veDieuKhien(n);
  }).catch(function(){ o.innerHTML = '<div class="rong">Không đọc được file Excel này.</div>'; veDieuKhien(n); });
}
function xemWord(b, o, n){
  if(!window.XLSX || !XLSX.CFB){ o.innerHTML = '<div class="rong">Chưa tải được bộ đọc — có mạng một lần rồi thử lại.</div>'; return veDieuKhien(n); }
  b.arrayBuffer().then(function(ab){
    var z = XLSX.CFB.read(new Uint8Array(ab), {type:'array'});
    var f = XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml');
    if(!f) throw new Error('không có nội dung');
    var xml = typeof f.content==='string' ? f.content : new TextDecoder('utf-8').decode(f.content);
    var doan = xml.split(/<\/w:p>/).map(function(p){
      return (p.match(/<w:t[^>]*>[^<]*<\/w:t>|<w:tab\/>/g)||[]).map(function(t){ return t==='<w:tab/>' ? '\t' : t.replace(/<[^>]+>/g,''); }).join('');
    }).map(function(t){ return t.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&'); });
    o.innerHTML = '<div class="word-xem"><div class="huong-dan">Xem phần chữ (không giữ định dạng). Xem đúng định dạng: 🖥 Mở máy hoặc Gửi cả file.</div>'+
      doan.map(function(t){ return t.trim() ? '<p>'+coChuHTML(t)+'</p>' : ''; }).join('')+'</div>';
    veDieuKhien(n);
  }).catch(function(){ o.innerHTML = '<div class="rong">Không đọc được file Word này. Máy đã cài cầu nối: bấm 🖥 Mở máy.</div>'; veDieuKhien(n); });
}
/* Vẽ TOÀN BỘ tài liệu để cuộn liên tục, trang nào vào tầm nhìn mới vẽ.
   Nhờ vậy số trang khớp với chỗ đang cuộn, nút ‹ › nhảy đúng một trang. */
function veTrang(n){
  var S = XEM[n], o = document.getElementById(S.id);
  if(!S.pdf || !o) return;
  o.innerHTML = '';
  S.khung = []; S.chuoi = null;
  var tyLeCS = tinhTyLe(S, o);
  for(var i=1;i<=S.tong;i++){
    var box = document.createElement('div');
    box.className = 'o-trang';
    box.dataset.trang = i;
    if(trangChon[i]) box.classList.add('chon');
    box.style.minHeight = Math.round((o.clientWidth||520) * 1.414 * tyLeCS) + 'px';
    if(S.tong>1){   /* 3.62: 1 trang thì không cần ô tích chọn trang / nhãn "Trang 1/1" */
      var tk = document.createElement('div');
      tk.className = 'tick'; tk.textContent = '✓';
      (function(b, k){ tk.onclick = function(ev){ ev.stopPropagation(); doiChonTrang(b, k); }; })(box, i);
      box.appendChild(tk);
      var st = document.createElement('div');
      st.className = 'stt'; st.textContent = 'Trang '+i+' / '+S.tong;
      box.appendChild(st);
    }
    o.appendChild(box);
    S.khung.push(box);
  }
  veTamNhin(n);
  if(!S.daGan){
    S.daGan = true;
    o.addEventListener('scroll', function(){
      clearTimeout(S.tCuon);
      S.tCuon = setTimeout(function(){ veTamNhin(n); doiSoTrang(n); }, 90);
    });
  }
  veDieuKhien(n);
}
function tinhTyLe(S, o){
  if(S.che==='ngang') return 1;
  return S.tyLe;
}
/* chỉ vẽ những trang đang ở gần tầm nhìn */
function veTamNhin(n){
  var S = XEM[n], o = document.getElementById(S.id);
  if(!S.pdf || !o || !S.khung) return;
  var tren = o.scrollTop - o.clientHeight;
  var duoi = o.scrollTop + o.clientHeight*2;
  S.khung.forEach(function(box, k){
    var y = box.offsetTop, h = box.offsetHeight;
    if(y+h < tren || y > duoi){ return; }
    if(box.dataset.xong) return;
    box.dataset.xong = '1';
    var i = k+1, pdfNay = S.pdf;
    /* 3.51: vẽ lần lượt từng trang (trang 1 xong mới tới trang 2) — trước vẽ cùng lúc nên trang đầu hiện chậm */
    S.chuoi = (S.chuoi || Promise.resolve()).then(function(){ if(S.pdf!==pdfNay) return; return pdfNay.getPage(i).then(function(pg){
      var rong = Math.max(240, (o.clientWidth||520) - 24);
      var vp0 = pg.getViewport({scale:1});
      var ty = (rong/vp0.width) * S.tyLe;
      if(S.che==='trang'){
        var cao = o.clientHeight - 24;
        ty = Math.min(rong/vp0.width, cao/vp0.height) * S.tyLe;
      }
      var vp = pg.getViewport({scale:ty});
      /* 3.27: vẽ theo độ phân giải THẬT của màn (máy anh 125% thì dpr=1.25) — chữ nét như trình đọc trên máy */
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var c = document.createElement('canvas');
      c.width = Math.round(vp.width * dpr);
      c.height = Math.round(vp.height * dpr);
      c.style.width = Math.round(vp.width) + 'px';
      c.style.height = Math.round(vp.height) + 'px';
      box.style.minHeight = '';
      box.insertBefore(c, box.firstChild);
      var ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      if(dpr !== 1) ctx.scale(dpr, dpr);
      return pg.render({canvasContext:ctx, viewport:vp}).promise.then(function(){ return lopChuTrang(S, pdfNay, pg, vp, box, c, i, n); });
    }); }).catch(function(){ box.dataset.xong = ''; });
  });
}
/* 3.74 (AL): lớp chữ trong suốt đè lên trang PDF → bôi đen, Ctrl+C, chuột phải Chép như mở PDF thường.
   Trang không có chữ (bản chụp / ảnh) → nhãn nhỏ "Trang ảnh · 🔍 Đọc chữ" (OCR). */
function lopChuTrang(S, pdfNay, pg, vp, box, c, i, n){
  return pg.getTextContent().then(function(tc){
    if(S.pdf!==pdfNay || !box.isConnected) return;
    S.chuTrang = S.chuTrang || {};
    var chu = ghepDong(tc.items).trim();
    S.chuTrang[i] = chu;
    var cu = box.querySelector('.lop-chu, .trang-anh'); if(cu) cu.remove();
    if(chu.replace(/\s+/g,'').length < 20){
      var a = document.createElement('div'); a.className = 'trang-anh';
      a.innerHTML = 'Trang ảnh — không có lớp chữ · <a onclick="event.stopPropagation();ocrTrang(\''+n+'\','+i+')">🔍 Đọc chữ</a>';
      box.appendChild(a); return;
    }
    if(!pdfjsLib.renderTextLayer) return;
    var l = document.createElement('div'); l.className = 'lop-chu textLayer';
    l.style.left = c.offsetLeft+'px'; l.style.top = c.offsetTop+'px';
    l.style.width = Math.round(vp.width)+'px'; l.style.height = Math.round(vp.height)+'px';
    l.style.setProperty('--scale-factor', vp.scale);
    box.appendChild(l);
    try{ return pdfjsLib.renderTextLayer({textContentSource:tc, container:l, viewport:vp, textDivs:[]}).promise.catch(function(){}); }
    catch(e){ l.remove(); }
  }).catch(function(){});
}
/* 📋 chép chữ cả trang đang xem */
function chepChuTrang(n){
  var S = XEM[n]; if(!S || !S.pdf) return;
  var t = S.trang, chu = S.chuTrang && S.chuTrang[t];
  var xong = function(chu){
    if(chu.replace(/\s+/g,'').length < 20) return hoiOCRTrang(n, t);
    chepHoacHien(chu, 'Đã chép chữ trang '+t+(S.tong>1?' / '+S.tong:'')+' · '+chu.length+' ký tự'+
      (chuLoiFont(chu) ? ' — ⚠ PDF gõ bằng font cũ (TCVN3 / VNI), chữ dán ra có thể sai dấu' : ''), 'Chữ trang '+t);
  };
  if(chu!=null) return xong(chu);   /* có sẵn → chép ngay trong lần bấm (iPhone cần) */
  S.pdf.getPage(t).then(function(pg){ return pg.getTextContent(); }).then(function(tc){
    var c2 = ghepDong(tc.items).trim(); (S.chuTrang = S.chuTrang || {})[t] = c2; xong(c2);
  }).catch(function(){ baoLoi('Không đọc được chữ trang này.'); });
}
/* chép vào bộ nhớ tạm; trình duyệt chặn (iPhone sau khi chờ) → hiện hộp chữ để bôi đen / bấm Chép */
function chepHoacHien(t, baoXong, tieuDe){
  var hien = function(){
    moHop('<div class="hop-tit">'+coChuHTML(tieuDe||'Chữ đã đọc')+'</div>'+
      '<div class="o"><textarea id="chep-o" rows="14" style="width:100%;font-size:13px">'+coChuHTML(t)+'</textarea></div>'+
      '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng (Esc)</button>'+
      '<button class="nho chinh" onclick="var o=document.getElementById(\'chep-o\');chepChu(o.value,\'Đã chép \'+o.value.length+\' ký tự\')">📋 Chép</button></div>');
    var o = document.getElementById('chep-o'); if(o){ o.focus(); o.select(); }
  };
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function(){ bao(baoXong, 6); }, hien);
  else hien();
}
function hoiOCRTrang(n, t){
  moHop('<div class="hop-tit">Trang '+t+' là ảnh</div>'+
    '<div class="hop-phu">Trang này là bản chụp / scan — không có lớp chữ để chép. Bấm <b>🔍 Đọc chữ</b> để app nhận chữ từ ảnh (OCR; lần đầu cần mạng để tải bộ đọc tiếng Việt), đọc xong anh xem lại rồi chép.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button><button class="nho chinh" onclick="dongHop();ocrTrang(\''+n+'\','+t+')">🔍 Đọc chữ</button></div>');
}
/* OCR 1 trang PDF → hộp chữ để xem lại và chép (OCR có thể sai vài chữ) */
function ocrTrang(n, t){
  var S = XEM[n]; if(!S || !S.pdf) return;
  QUET.dung = false;
  batChay(true, 'Đang dựng ảnh trang '+t+'…', true);
  S.pdf.getPage(t).then(function(pg){
    var vp0 = pg.getViewport({scale:1}), vp = pg.getViewport({scale:Math.min(3, 2200/Math.max(vp0.width, vp0.height))});
    var c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
    return pg.render({canvasContext:c.getContext('2d'), viewport:vp}).promise.then(function(){ return docDongOCR(c); });
  }).then(function(r){
    tatChay();
    var chu = String(r && r.chu || '').trim();
    if(!chu) return bao('Không nhận ra chữ nào trên trang '+t+'.', 4);
    (S.chuTrang = S.chuTrang || {})[t] = chu;
    var a = S.khung && S.khung[t-1] && S.khung[t-1].querySelector('.trang-anh');
    if(a) a.innerHTML = 'Đã đọc chữ (OCR) · <a onclick="event.stopPropagation();chepChuTrang(\''+n+'\')">📋 Chép</a>';
    chepHoacHien(chu, 'Đã chép chữ đọc được trang '+t+' (OCR — anh soát lại vài chữ có thể sai)', 'Chữ đọc từ ảnh trang '+t+' (OCR — soát lại trước khi dùng)');
  }).catch(function(e){
    tatChay();
    if(QUET.dung) return bao('Đã dừng đọc chữ.', 3);
    baoLoi('Chưa đọc được chữ: '+(e&&e.message||e)+' — cần mạng lần đầu để tải bộ đọc tiếng Việt.');
  });
}
/* ô số trang chạy theo chỗ đang cuộn */
function doiSoTrang(n){
  var S = XEM[n], o = document.getElementById(S.id);
  if(!S.khung || !o) return;
  var giua = o.scrollTop + o.clientHeight/2, t = 1;
  for(var i=0;i<S.khung.length;i++){
    var b = S.khung[i];
    if(b.offsetTop <= giua) t = i+1; else break;
  }
  if(t!==S.trang){
    S.trang = t;
    var e = document.getElementById(S.dk+'-o');
    if(e && document.activeElement!==e) e.value = t;
  }
}

/* thanh điều khiển: trang đầu / lùi / số trang / tiến / trang cuối / zoom / mở ngoài */
function veDieuKhien(n){
  var S = XEM[n];
  var e = document.getElementById(S.dk);
  if(!e) return;
  if(!S.pdf){ e.innerHTML = ''; return; }
  /* 3.62 (việc U): file 1 trang thì bỏ cụm lật trang cho gọn */
  e.innerHTML = (S.tong>1 ?
    '<button onclick="diTrang(\'' +n+ '\',\'dau\')" title="Trang đầu">⏮</button>'+
    '<button onclick="diTrang(\'' +n+ '\',-1)" title="Trang trước">‹</button>'+
    '<span class="so-trang">'+
      '<input id="'+S.dk+'-o" value="'+S.trang+'" inputmode="numeric" '+
      'onchange="nhayTrang(\'' +n+ '\',this.value)"> / '+S.tong+'</span>'+
    '<button onclick="diTrang(\'' +n+ '\',1)" title="Trang sau">›</button>'+
    '<button onclick="diTrang(\'' +n+ '\',\'cuoi\')" title="Trang cuối">⏭</button>'+
    '<span class="ngan-cach"></span>' : '<span class="so-trang">1 trang</span>')+
    '<button onclick="zoomKhung(\'' +n+ '\',-1)" title="Thu nhỏ">−</button>'+
    '<span class="tl">'+Math.round(S.tyLe*100)+'%</span>'+
    '<button onclick="zoomKhung(\'' +n+ '\',1)" title="Phóng to">+</button>'+
    '<button'+(S.che==='ngang'?' class="bat"':'')+
      ' onclick="datChe2(\'' +n+ '\',\'ngang\')" title="Vừa bề ngang">↔</button>'+
    '<button'+(S.che==='trang'?' class="bat"':'')+
      ' onclick="datChe2(\'' +n+ '\',\'trang\')" title="Vừa trang">⊡</button>'+
    '<span class="ngan-cach"></span>'+
    '<button onclick="chepChuTrang(\'' +n+ '\')" title="Chép chữ cả trang đang xem (bôi đen từng đoạn rồi Ctrl+C cũng được). Trang ảnh thì đọc chữ (OCR)">📋</button>'+
    '<button onclick="moBangMay()" title="Mở bằng trình xem của máy">↗</button>';
}
function diTrang(n, h){
  var S = XEM[n];
  if(!S.pdf) return;
  var t;
  if(h==='dau') t = 1;
  else if(h==='cuoi') t = S.tong;
  else t = Math.max(1, Math.min(S.tong, S.trang + h));
  cuonToiTrang(n, t);
}
function nhayTrang(n, v){
  var S = XEM[n];
  var t = parseInt(v,10);
  if(!S.pdf || isNaN(t)) return;
  cuonToiTrang(n, Math.max(1, Math.min(S.tong, t)));
}
function cuonToiTrang(n, t){
  var S = XEM[n], o = document.getElementById(S.id);
  if(!S.khung || !S.khung[t-1] || !o) return;
  S.trang = t;
  o.scrollTop = S.khung[t-1].offsetTop - 6;
  veTamNhin(n);
  veDieuKhien(n);
}
function zoomKhung(n, h){
  var S = XEM[n];
  S.tyLe = h===0 ? 1 : Math.max(.4, Math.min(4, S.tyLe + h*0.2));
  if(S.pdf){ var t = S.trang; veTrang(n); setTimeout(function(){ cuonToiTrang(n, t); }, 60); }
  else apZoomKhung(n);
}
function datChe2(n, c){
  var S = XEM[n];
  S.che = (S.che===c) ? '' : c;
  S.tyLe = 1;
  if(S.pdf){ var t = S.trang; veTrang(n); setTimeout(function(){ cuonToiTrang(n, t); }, 60); }
}
function apZoomKhung(n){
  var S = XEM[n], o = document.getElementById(S.id);
  if(!o) return;
  var ds = o.querySelectorAll('img, .o-trang');
  for(var i=0;i<ds.length;i++){
    ds[i].style.width = (S.tyLe*100)+'%';
    ds[i].style.maxWidth = 'none';
  }
  o.style.overflowX = S.tyLe>1 ? 'auto' : 'hidden';
}
/* mở bằng trình xem PDF của máy — iPhone dùng Quick Look, máy tính mở tab mới */
function moBangMay(){
  var m = mucDangXem; if(!m) return;
  layNoiDung(m).then(function(b){
    if(!b) return baoLoi('Không tìm thấy nội dung file.');
    var u = URL.createObjectURL(b);
    var w = window.open(u, '_blank');
    if(!w){
      var f = new File([b], m.tenMoi||m.tenCu||'file.pdf', {type:b.type||'application/pdf'});
      if(navigator.canShare && navigator.canShare({files:[f]}))
        navigator.share({files:[f], title:m.tenMoi}).catch(function(){});
      else baoLoi('Trình duyệt chặn mở cửa sổ mới.');
    }
  });
}

/* giữ tên cũ cho các chỗ đang gọi */
function zoom(h){ zoomKhung('lon', h); }
function apZoom(){ apZoomKhung('lon'); }

function dongXem(){
  document.getElementById('xem').classList.remove('hien');
  document.getElementById('xem').classList.remove('to');
}
function toanManHinh(){
  var e = document.getElementById('xem');
  e.classList.toggle('to');
  if(e.classList.contains('to') && document.documentElement.requestFullscreen){
    document.documentElement.requestFullscreen().catch(function(){});
  }else if(document.exitFullscreen && document.fullscreenElement){
    document.exitFullscreen().catch(function(){});
  }
  setTimeout(function(){ if(XEM.lon.pdf) veTrang('lon'); }, 220);
}

var trangChon = {};
function doiChonTrang(box, i){
  if(trangChon[i]){ delete trangChon[i]; box.classList.remove('chon'); }
  else { trangChon[i] = 1; box.classList.add('chon'); }
  capNhatThanhChon();
}
function chonHetTrang(){
  var ds = document.querySelectorAll('.o-trang');
  for(var i=0;i<ds.length;i++){ trangChon[+ds[i].dataset.trang]=1; ds[i].classList.add('chon'); }
  capNhatThanhChon();
}
function boChonTrang(){
  trangChon = {};
  var ds = document.querySelectorAll('.o-trang');
  for(var i=0;i<ds.length;i++) ds[i].classList.remove('chon');
  capNhatThanhChon();
}
function capNhatThanhChon(){
  var n = Object.keys(trangChon).length;
  var e = document.getElementById('tc-chu');
  if(e) e.textContent = n ? ('Đã chọn '+n+' trang — bấm “Gửi trang chọn” ở dưới')
                          : 'Tích vào trang để gửi riêng phần cần thiết';
  var b = document.getElementById('nut-gui-trang');
  if(b) b.style.display = n ? '' : 'none';
  var b2 = document.getElementById('cp-guitrang');
  if(b2) b2.style.display = n ? '' : 'none';
  var bi = document.getElementById('nut-in');
  if(bi) bi.textContent = n ? ('In '+n+' trang') : 'In';
}

/* tách các trang đã chọn thành file PDF mới rồi gửi */
function tachTrang(m, ds){
  return layNoiDung(m).then(function(b){ return b.arrayBuffer(); })
  .then(function(buf){ return PDFLib.PDFDocument.load(buf); })
  .then(function(goc){
    return PDFLib.PDFDocument.create().then(function(moi){
      return moi.copyPages(goc, ds.map(function(x){ return x-1; })).then(function(tr){
        tr.forEach(function(t){ moi.addPage(t); });
        return moi.save();
      });
    });
  }).then(function(bytes){
    return {blob:new Blob([bytes], {type:'application/pdf'}),
            ten:(m.tenMoi||'file').replace(/\.pdf$/i,'')+'_trang-'+ds.join('-')+'.pdf'};
  });
}
function guiTrangChon(){
  var m = mucDangXem; if(!m) return;
  var ds = Object.keys(trangChon).map(Number).sort(function(a,b){ return a-b; });
  if(!ds.length) return bao('Chưa chọn trang nào.', 3);
  if(!window.PDFLib) return baoLoi('Chưa tải được bộ ghép PDF. Kiểm tra mạng rồi thử lại.');
  bao('Đang tách '+ds.length+' trang…', 3);
  tachTrang(m, ds).then(function(r){
    var f = new File([r.blob], r.ten, {type:'application/pdf'});
    if(navigator.canShare && navigator.canShare({files:[f]}))
      return navigator.share({files:[f], title:r.ten});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(r.blob); a.download = r.ten;
    document.body.appendChild(a); a.click(); a.remove();
    bao('Đã tách '+ds.length+' trang thành file riêng.', 4);
  }).catch(function(e){
    console.warn(e); baoLoi('Không tách được trang từ file này.');
  });
}

/* Lưu / Gửi: dùng bảng chia sẻ của máy (Zalo, Mail…), không được thì tải về */
function taiFile(imLang){
  var m = mucDangXem; if(!m) return;
  layNoiDung(m).then(function(b){
    if(!b) return baoLoi('Không tìm thấy nội dung file.');
    var tenF = m.tenMoi||m.tenCu||(laScanMuc(m) ? tenScanDrive(m) : (m.ten||'file'));   /* 3.61: bản quét gửi đúng tên */
    var f = new File([b], tenF, {type:b.type||'application/pdf'});
    /* Safari trên iPhone bỏ qua thuộc tính download nên file giữ tên cũ.
       Vì vậy ưu tiên bảng chia sẻ — cách duy nhất giữ đúng tên chuẩn trên iOS. */
    if(navigator.canShare && navigator.canShare({files:[f]})){
      navigator.share({files:[f], title:m.tenMoi, text:thuMucCua(m)})
        .then(function(){ if(!imLang) bao('Bỏ vào: '+thuMucCua(m), 5); })
        .catch(function(){});
    }else{
      var a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = tenF;
      document.body.appendChild(a); a.click(); a.remove();
      if(!imLang) bao('Đã lưu: '+(m.tenMoi||'')+' — bỏ vào '+thuMucCua(m), 6);
    }
  });
}
function inFile(){
  var m = mucDangXem; if(!m) return;
  var ds = Object.keys(trangChon).map(Number).sort(function(a,b){ return a-b; });
  if(ds.length) return inTrangChon(ds);
  layNoiDung(m).then(function(b){
    if(!b) return baoLoi('Không tìm thấy nội dung file.');
    inBlob(b, m.tenMoi||m.tenCu||(laScanMuc(m) ? tenScanDrive(m) : m.ten));
  });
}

/* In không mở cửa sổ mới — dùng khung ẩn để trình duyệt không chặn */
function inBlob(b, ten, tb){   /* tb: lời nhắc thay "Đã mở hộp thoại in" (3.140.2: PDF gửi Hội) */
  if(b && /^text\/html/.test(b.type||'') && !b.trChuan && b.text) return b.text().then(function(t){ var c = new Blob([inChuan(t)], {type:'text/html'}); c.trChuan = 1; inBlob(c, ten, tb); });   /* 3.128: bộ in chuẩn */
  var u = URL.createObjectURL(b);
  var cu = document.getElementById('khung-in');
  if(cu) cu.remove();
  var f = document.createElement('iframe');
  f.id = 'khung-in';
  f.style.cssText = 'position:fixed;width:0;height:0;border:0;left:-9999px';
  f.src = u;
  f.onload = function(){
    var cho = 0, inNgay = function(){ try{ if(b.trChuan && !f.contentWindow.TR_XONG && cho++<80) return setTimeout(inNgay, 100); }catch(e){}   /* 3.128: chờ chia trang xong */
      try{
        f.contentWindow.focus();
        f.contentWindow.print();
        bao(tb || 'Đã mở hộp thoại in.', tb ? 12 : 3);
      }catch(e){
        /* iPhone không in được từ khung ẩn → chuyển sang bảng chia sẻ, chọn In */
        var file = new File([b], ten||'in.pdf', {type:b.type||'application/pdf'});
        if(navigator.canShare && navigator.canShare({files:[file]})){
          navigator.share({files:[file], title:ten}).catch(function(){});
          bao('Chọn “In” trong bảng vừa mở.', 5);
        }else baoLoi('Máy không cho in trực tiếp. Bấm Lưu / Gửi rồi in từ ứng dụng đọc PDF.');
      }
    };
    setTimeout(inNgay, 700);
  };
  document.body.appendChild(f);
}

/* ==========================================================
   3.128 — BỘ IN CHUẨN (anh chốt): app tự chia trang A4 → xem trước = bản in
   - @page lề 0 → trình duyệt không in dòng đầu / cuối trang (ngày giờ, đường dẫn); lề thật là khoảng đệm trong từng trang
   - lặp tiêu đề bảng, không cắt dòng, nhóm hộ (kt-ho / kt-giu) không tách; tiêu đề mục đi liền nội dung
   - báo cáo nhanh (.trang): tự khổ — dọc → dọc gọn (bỏ cột SĐT, chữ 9) → ngang; lề dọc 20/15/20/30, ngang 15/15/15/20
   - số trang: Mẫu 06 "Trang x/y" mỗi tổ; văn bản khác góc dưới phải từ trang 2
   - in 2 mặt (nhiều bản): bản lẻ trang thêm đúng 1 trang trắng (thay cách ước lượng 3.124)
   - khung xem: ⏮ ‹ n/N › ⏭ · − % + · ↔ · ⊡ · Khổ · In · PDF · Word · toàn màn hình
   ========================================================== */
var TR_CSS = '@page{size:A4 portrait;margin:0}@page tr-ngang{size:A4 landscape;margin:0}'+
  'html,body{background:#8d939b!important}body{margin:0!important;padding:0!important}'+
  '#tr-ds{padding:12px 0 24px}.tr-xem #tr-ds{padding-top:52px}'+
  '.tr-tg{position:relative;width:210mm;height:297mm;background:#fff;margin:0 auto 12px;box-shadow:0 2px 6px rgba(0,0,0,.45);overflow:hidden;box-sizing:border-box}'+
  '.tr-tg.ngang{width:297mm;height:210mm;page:tr-ngang}.tr-nd{position:absolute;overflow:hidden;display:flow-root;box-sizing:border-box;padding:0 1.5px}'+
  '.tr-tg *{page:auto!important;break-before:auto!important;break-after:auto!important;page-break-before:auto!important;page-break-after:auto!important}'+
  '.tr-tg .kt-to,.tr-tg .trang,.tr-tg .phieu{padding:0!important;margin:0!important;box-shadow:none!important;max-width:none!important;width:auto!important;background:none!important}'+
  '.tr-gon .c-sdt{display:none}.tr-so{position:absolute;font-family:"Times New Roman",Times,serif;color:#000;text-align:right;white-space:nowrap}'+
  '.tr-nhan{font:bold 12px Arial,sans-serif;color:#fff;text-align:center;margin:4px auto 4px}.tr-tt{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:italic 14px Arial,sans-serif;color:#9aa}'+
  '#tr-thanh{position:fixed;top:0;left:0;right:0;z-index:9;display:flex;flex-wrap:wrap;align-items:center;gap:3px;padding:5px 8px;background:#2f343b;color:#fff;font:13px Arial,sans-serif;box-shadow:0 1px 4px rgba(0,0,0,.4)}'+
  '#tr-thanh button,#tr-thanh select{font:13px Arial,sans-serif;background:#454c55;color:#fff;border:1px solid #5d6670;border-radius:5px;padding:3px 8px;cursor:pointer;min-height:28px}'+
  '#tr-thanh button:hover{background:#5a636e}#tr-thanh input{width:34px;text-align:center;font:13px Arial,sans-serif;border-radius:4px;border:1px solid #5d6670;padding:3px}'+
  '#tr-thanh .tr-gach{width:1px;height:20px;background:#5d6670;margin:0 4px}#tr-thanh .tr-chinh{background:#1a5fb4;border-color:#1a5fb4}#tr-bao{margin-left:6px;color:#ffd479;font-size:12px}'+
  '@media print{html,body{background:#fff!important}#tr-thanh,.tr-nhan,.tr-tt{display:none!important}#tr-ds{padding:0!important;zoom:1!important}'+
  '.tr-tg{margin:0!important;box-shadow:none!important;height:296.5mm;break-after:page!important}.tr-tg.ngang{height:209.5mm}.tr-tg:last-child{break-after:auto!important}}';
var trDan = function(C){   /* chạy TRONG trang in (khung xem / khung in ẩn) — không dùng biến của app */
  var d = document, MM = 96/25.4, goc = null, loai = '', nhan = [], ds = null, kho = 'tu', zm = 1, vua = 'ngang', TH = null;
  var px = function(mm){ return mm*MM; };
  var tieuDe = function(e){ return e.nodeType===1 && (/^H[1-6]$/.test(e.tagName) || /\b(bc-khung-ten|nhan-nhom)\b/.test(e.className) || (e.tagName==='P' && /\bkt-b\b/.test(e.className)) || (e.tagName==='TR' && e.cells.length && /\bkt-b\b/.test(e.cells[0].className))); };
  var giu = function(e){ var s = getComputedStyle(e); return s.breakInside==='avoid' || s.pageBreakInside==='avoid' || /\b(kt-ho|kt-giu)\b/.test(e.className) || e.tagName==='TR'; };
  var chiaDuoc = function(e){ return e.nodeType===1 && /^(TABLE|TBODY|DIV|SECTION|UL|OL|BLOCKQUOTE|TD)$/.test(e.tagName) && e.children.length>0 && (e.tagName!=='DIV' || !/flex|grid|inline/.test(getComputedStyle(e).display)) && e.tagName!=='TD'; };
  var dauBang = function(e){ return e.nodeType===1 && /^(THEAD|COLGROUP|CAPTION)$/.test(e.tagName); };
  var rong = function(n){ return n.nodeType===3 ? !/\S/.test(n.nodeValue) : n.nodeType!==1; };
  function khoi(){   /* lần đầu: tách các bản (đơn vị chia trang), giữ bản gốc để dựng lại khi đổi khổ */
    var sel = ['.kt-to', '.trang', '.phieu'], u = [];
    for(var i=0;i<sel.length && !u.length;i++){ loai = sel[i]; u = [].slice.call(d.querySelectorAll(sel[i])).filter(function(x){ return !x.parentNode.closest || !x.parentNode.closest(sel[i]); }); }
    if(!u.length){ loai = ''; var w = d.createElement('div'); [].slice.call(d.body.childNodes).forEach(function(n){ if(!(n.nodeType===1 && /^(STYLE|SCRIPT)$/.test(n.tagName))) w.appendChild(n); }); u = [w]; }
    goc = u.map(function(x){ var c = x.cloneNode(true), n = c.querySelector('.kt-to-nhan'); nhan.push(n ? n.textContent : ''); if(n) n.parentNode.removeChild(n); return c; });
    [].slice.call(d.body.childNodes).forEach(function(n){ if(!(n.nodeType===1 && /^(STYLE|SCRIPT)$/.test(n.tagName))) d.body.removeChild(n); });
    ds = d.createElement('div'); ds.id = 'tr-ds'; d.body.appendChild(ds);
    if(C.xem) thanh();
  }
  function bac(u){   /* các bậc thử khổ: [ngang, lề t r b l, gọn, cỡ chữ pt] */
    if(loai!=='.trang') return [[C.ngang, C.mg, 0, 0]];
    var ng = /\bngang\b/.test(u.className), L = C.le, B = [];
    if(L) { var m = [L, L, L, L], n0 = kho==='tu' ? ng : kho==='ngang'; return [[n0, m, 0, 0], [n0, m, 1, 9], [n0, m, 1, 8.5], [n0, m, 1, 8]]; }
    var doc = [[0, [20, 15, 20, 30], 0, 0], [0, [20, 15, 20, 30], 1, 9], [0, [15, 15, 15, 20], 1, 9], [0, [15, 15, 15, 20], 1, 8]], nga = [[1, [15, 15, 15, 20], 0, 0], [1, [15, 15, 15, 20], 1, 9], [1, [15, 15, 15, 20], 1, 8.5], [1, [10, 10, 10, 15], 1, 8]];
    if(kho==='doc') return doc; if(kho==='ngang') return nga;
    return ng ? nga : [doc[0], doc[1]].concat(nga);
  }
  function trang(b){   /* 1 trang trống theo bậc b → {tg, nd} */
    var tg = d.createElement('div'), nd = d.createElement('div');
    tg.className = 'tr-tg'+(b[0] ? ' ngang' : ''); var W = b[0] ? 297 : 210, H = b[0] ? 210 : 297, m = b[1];
    nd.className = 'tr-nd'; nd.style.cssText = 'top:'+m[0]+'mm;left:'+m[3]+'mm;width:'+(W-m[1]-m[3])+'mm;height:'+(H-m[0]-m[2])+'mm';
    tg.appendChild(nd); ds.appendChild(tg); return {tg:tg, nd:nd, b:b};
  }
  function apBac(u, b){ u.classList.toggle('tr-gon', !!b[2]); u.style.fontSize = u.getAttribute('data-tr-co') || ''; if(b[3]){ var cu = parseFloat(getComputedStyle(u).fontSize); if(b[3]*96/72<cu-0.1) u.style.fontSize = b[3]+'pt'; } }
  function coDinhCot(u){   /* cột bảng giữ nguyên bề rộng ở mọi trang (đo 1 lần trên bản liền) */
    [].slice.call(u.querySelectorAll('table')).forEach(function(t){
      if(!t.tHead || t.querySelector('colgroup') || t.rows.length<3) return;
      var n = 0, r0 = t.rows[0], i, r = null; for(i=0;i<r0.cells.length;i++) n += r0.cells[i].colSpan;
      for(i=0;i<t.rows.length && i<60 && !r;i++){ var c = t.rows[i].cells; if(c.length===n && [].every.call(c, function(x){ return x.colSpan===1; })) r = t.rows[i]; }
      if(!r) return; var w = [].map.call(r.cells, function(x){ return x.getBoundingClientRect().width; }), g = d.createElement('colgroup');
      w.forEach(function(x){ var c = d.createElement('col'); c.style.width = x+'px'; g.appendChild(c); });
      t.style.width = t.getBoundingClientRect().width+'px'; t.style.tableLayout = 'fixed'; t.insertBefore(g, t.firstChild);
    });
  }
  function chia(u, b){   /* rót nội dung bản u vào các trang; trả về danh sách trang */
    var ra = [], hien = null, soMoi = 0, xich = [];
    var moi = function(){ hien = trang(b); ra.push(hien); soMoi = 0; };
    var vuaTrang = function(){ return hien.nd.scrollHeight <= hien.nd.clientHeight+1; };
    var vo = function(e){ var s = e.cloneNode(false); s.removeAttribute('id'); return s; };
    function sangTrang(k){   /* hết chỗ ở cấp k: bỏ vỏ rỗng trang cũ, kéo tiêu đề mục theo, dựng lại vỏ các cấp 0..k ở trang mới */
      var j, keo = [], cap = -1;
      for(j=k;j>=1;j--){ if(xich[j].n) break; var p = xich[j].d.parentNode; if(p) p.removeChild(xich[j].d); }
      cap = j; var cu = xich[cap].d;
      while(cu.lastChild && rong(cu.lastChild)) cu.removeChild(cu.lastChild);
      while(keo.length<2 && cu.lastChild && tieuDe(cu.lastChild) && soMoi>keo.length+1){ keo.unshift(cu.lastChild); cu.removeChild(cu.lastChild); }
      for(j=cap;keo.length && j>=1 && ![].some.call(xich[j].d.childNodes, function(x){ return !rong(x) && !dauBang(x); });j--) xich[j].d.parentNode.removeChild(xich[j].d);   /* kéo tiêu đề đi rồi vỏ còn rỗng (chỉ tiêu đề bảng) → bỏ */
      moi();
      for(j=0;j<=k;j++){ var s = vo(xich[j].s); xich[j].lap.forEach(function(x){ s.appendChild(x.cloneNode(true)); }); if(j) xich[j-1].d.appendChild(s); else hien.nd.appendChild(s); xich[j].d = s; xich[j].n = 0; }
      if(keo.length){ var dich = xich[cap].d, truoc = cap<k ? xich[cap+1].d : null; keo.forEach(function(x){ dich.insertBefore(x, truoc); }); soMoi += keo.length; for(j=0;j<=cap;j++) xich[j].n += keo.length; }
    }
    function dem(k){ soMoi++; for(var j=0;j<=k;j++) xich[j].n++; }
    function tach(c, k){
      var s = vo(c); c.parentNode.replaceChild(s, c);
      var lap = c.tagName==='TABLE' ? [].filter.call(c.children, dauBang).map(function(x){ return x.cloneNode(true); }) : [];
      xich.push({s:c, d:s, n:0, lap:lap}); rot(k+1); xich.pop();
    }
    function rot(k){
      var src = xich[k].s;
      while(src.firstChild){
        var c = src.firstChild; xich[k].d.appendChild(c);
        if(rong(c) || dauBang(c)) continue;
        if(vuaTrang()){ dem(k); continue; }
        if(c.nodeType===1 && chiaDuoc(c) && !giu(c)){ tach(c, k); continue; }
        if(soMoi){ c.parentNode.removeChild(c); sangTrang(k); xich[k].d.appendChild(c); if(vuaTrang()){ dem(k); continue; } }
        if(c.nodeType===1 && chiaDuoc(c)){ tach(c, k); continue; }   /* 1 nhóm dài hơn 1 trang → buộc tách */
        dem(k);   /* không tách được: để nguyên (tràn) */
      }
    }
    moi(); var s0 = vo(u); hien.nd.appendChild(s0); xich = [{s:u, d:s0, n:0, lap:[]}]; rot(0);
    return ra;
  }
  function dung(){
    ds.style.zoom = 1; ds.innerHTML = ''; TH = []; var tong = 0;
    goc.forEach(function(g, i){
      var u = g.cloneNode(true), B = bac(u), b = B[B.length-1], t; if(u.style.fontSize) u.setAttribute('data-tr-co', u.style.fontSize);
      if(C.xem && nhan[i]){ var nh = d.createElement('div'); nh.className = 'tr-nhan'; nh.textContent = nhan[i]; ds.appendChild(nh); }
      for(var j=0;j<B.length;j++){ t = trang(B[j]); apBac(u, B[j]); t.nd.appendChild(u); var tran = u.scrollWidth>u.clientWidth+2; t.nd.removeChild(u); ds.removeChild(t.tg); if(!tran){ b = B[j]; break; } }
      t = trang(b); apBac(u, b); t.nd.appendChild(u); coDinhCot(u); t.nd.removeChild(u); ds.removeChild(t.tg);
      var P = chia(u, b), N = P.length;
      P.forEach(function(p, k){ if(C.so!=='xy' && !k) return; var s = d.createElement('div'); s.className = 'tr-so'; s.textContent = C.so==='xy' ? 'Trang '+(k+1)+'/'+N : String(k+1);
        s.style.cssText = 'right:'+b[1][1]+'mm;bottom:'+Math.max(3, b[1][2]*0.4)+'mm;font-size:'+(C.so==='xy' ? '8pt;font-style:italic' : '9pt'); p.tg.appendChild(s); });
      TH = TH.concat(P.map(function(p){ return p.tg; })); tong += N;
      if(C.haiMat && loai==='.kt-to' && goc.length>1 && i<goc.length-1 && N%2){ var tt = trang(b); tt.tg.classList.add('tr-trang-trang'); tt.tg.innerHTML = '<div class="tr-tt">Trang trắng — để bản sau bắt đầu mặt trước khi in 2 mặt</div>'; TH.push(tt.tg); tong++; }
    });
    window.TR_SO = tong; window.TR_XONG = true;
    if(C.xem){ thu(); trangHien(); }
  }
  /* ---- khung xem ---- */
  var $ = function(id){ return d.getElementById(id); };
  function thu(){   /* thu phóng theo chế độ đang chọn */
    var rw = 0, rh = 0; TH.forEach(function(t){ var ng = t.classList.contains('ngang'); rw = Math.max(rw, px(ng ? 297 : 210)); rh = Math.max(rh, px(ng ? 210 : 297)); });
    var W = d.documentElement.clientWidth-24, Hh = window.innerHeight-$('tr-thanh').offsetHeight-24;
    if(vua==='ngang') zm = Math.min(1.6, W/rw); else if(vua==='trang') zm = Math.min(W/rw, Hh/rh);
    zm = Math.max(0.2, Math.min(4, zm)); ds.style.zoom = zm; $('tr-pt').textContent = Math.round(zm*100)+'%';
  }
  function trangHien(){ var top = $('tr-thanh').offsetHeight+8, i = 0; for(var k=0;k<TH.length;k++){ if(TH[k].getBoundingClientRect().bottom*1>top+20){ i = k; break; } } $('tr-o').value = i+1; $('tr-n').textContent = TH.length; return i; }
  function den(i){ i = Math.max(0, Math.min(TH.length-1, i)); var y = TH[i].getBoundingClientRect().top+window.pageYOffset-$('tr-thanh').offsetHeight-8; window.scrollTo(0, y); setTimeout(trangHien, 30); }
  function nutWord(){ try{ var b = [].filter.call(parent.document.querySelectorAll('#hop-in .hang-nut button'), function(x){ return /Word/.test(x.textContent); }); return b[0] || null; }catch(e){ return null; } }
  function thanh(){
    var t = d.createElement('div'); t.id = 'tr-thanh'; d.body.classList.add('tr-xem');
    t.innerHTML = '<button data-l="dau" title="Trang đầu">⏮</button><button data-l="truoc" title="Trang trước">‹</button><input id="tr-o" value="1"> / <span id="tr-n">…</span><button data-l="sau" title="Trang sau">›</button><button data-l="cuoi" title="Trang cuối">⏭</button><span class="tr-gach"></span>'+
      '<button data-l="nho" title="Thu nhỏ">−</button><span id="tr-pt">100%</span><button data-l="to" title="Phóng to">+</button><button data-l="ngang" title="Vừa chiều ngang">↔</button><button data-l="trang" title="Vừa 1 trang">⊡</button><span class="tr-gach"></span>'+
      (loai==='.trang' ? '<select id="tr-kho" title="Khổ giấy"><option value="tu">Khổ: Tự động</option><option value="doc">Dọc</option><option value="ngang">Ngang</option></select><span class="tr-gach"></span>' : '')+
      '<button data-l="in" class="tr-chinh">🖨 In</button><button data-l="pdf" title="Lưu PDF: ở hộp in chọn Máy in = Lưu dưới dạng PDF">💾 PDF</button>'+(nutWord() ? '<button data-l="word">📄 Word</button>' : '')+'<button data-l="tm" title="Toàn màn hình">⤢</button><span id="tr-bao"></span>';
    d.body.insertBefore(t, d.body.firstChild);
    t.onclick = function(e){ var b = e.target.closest('button'); if(!b) return; var l = b.getAttribute('data-l'), i = trangHien();
      if(l==='dau') den(0); else if(l==='truoc') den(i-1); else if(l==='sau') den(i+1); else if(l==='cuoi') den(TH.length-1);
      else if(l==='nho' || l==='to'){ vua = ''; zm = l==='to' ? zm*1.15 : zm/1.15; thu(); den(i); }
      else if(l==='ngang' || l==='trang'){ vua = l; thu(); den(i); }
      else if(l==='in') window.print();
      else if(l==='pdf'){ $('tr-bao').textContent = 'Ở hộp in, chọn Máy in = “Lưu dưới dạng PDF”.'; setTimeout(function(){ window.print(); }, 50); }
      else if(l==='word'){ var w = nutWord(); if(w) w.click(); }
      else if(l==='tm'){ var fe = d.fullscreenElement ? d.exitFullscreen() : (d.documentElement.requestFullscreen ? d.documentElement.requestFullscreen() : null); if(fe && fe.catch) fe.catch(function(){ $('tr-bao').textContent = 'Máy không cho toàn màn hình.'; }); }
    };
    $('tr-o').onchange = function(){ den((parseInt(this.value, 10) || 1)-1); };
    if($('tr-kho')) $('tr-kho').onchange = function(){ kho = this.value; dung(); };
    window.addEventListener('scroll', function(){ if(TH) trangHien(); });
    window.addEventListener('resize', function(){ if(TH && vua) thu(); });
    d.addEventListener('keydown', function(e){ if(e.target.tagName==='INPUT') return; var i = trangHien();
      if(e.key==='PageDown' || e.key==='ArrowRight'){ den(i+1); e.preventDefault(); } else if(e.key==='PageUp' || e.key==='ArrowLeft'){ den(i-1); e.preventDefault(); }
      else if(e.key==='Home'){ den(0); e.preventDefault(); } else if(e.key==='End'){ den(TH.length-1); e.preventDefault(); } });
  }
  var chay = function(){ khoi(); dung(); };
  if(d.fonts && d.fonts.ready) d.fonts.ready.then(chay, chay); else chay();
};
function trLe(s){ var m = String(s||'').trim().split(/\s+/).map(parseFloat).filter(function(x){ return !isNaN(x); });   /* lề CSS (1–4 giá trị, mm) → [trên, phải, dưới, trái] */
  return !m.length ? null : m.length===1 ? [m[0], m[0], m[0], m[0]] : m.length===2 ? [m[0], m[1], m[0], m[1]] : m.length===3 ? [m[0], m[1], m[2], m[1]] : m.slice(0, 4); }
function inChuan(h, xem){   /* trang in (HTML) → trang tự chia A4 (+ khung xem nếu xem) */
  if(typeof h!=='string' || !/<\/body>/.test(h) || h.indexOf('id="tr-ds"')>=0 || /TR_XONG/.test(h)) return h;
  var st = (h.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join(''), m = st.match(/@page\s*\{([^{}]*)/), pg = m ? m[1] : '';
  var le = (h.match(/B=\[\["([^"]+)"/) || [])[1];   /* lề bậc đầu của skInTu (khuôn 01.1 dùng 7 mm) */
  var C = {xem:!!xem, ngang:/landscape/.test(pg), mg:trLe((pg.match(/margin:\s*([\d.\smm]+)/) || [])[1]) || [20, 15, 20, 30], so:/<title>Mau 06/.test(h) ? 'xy' : 'so', haiMat:/name="kt-hai-mat" content="1"/.test(h) ? true : /name="kt-hai-mat" content="0"/.test(h) ? false : ktHaiMat(), le:le && le!=='20mm 20mm 20mm 30mm' ? parseFloat(le) : 0};
  h = h.replace(/<style>\.kt-trang-trang[^<]*<\/style>/g, '').replace(/<script>[\s\S]*?<\/script>/g, '');
  return h.replace(/<\/body>(?![\s\S]*<\/body>)/, function(){ return '<style>'+TR_CSS+'</style><script>('+trDan.toString()+')('+JSON.stringify(C)+');<\/script></body>'; });
}
function xemChuan(f, h){ if(!f) return; f.setAttribute('allowfullscreen', ''); f.setAttribute('allow', 'fullscreen'); f.trGoc = h; f.srcdoc = inChuan(h, 1); }   /* trGoc: bản liền (chưa chia trang) — phép thử đọc nội dung */

/* ===== 2. IN RIÊNG CÁC TRANG ĐÃ CHỌN ===== */
function inTrangChon(ds){
  var m = mucDangXem; if(!m) return;
  if(!window.PDFLib) return baoLoi('Chưa tải được bộ tách PDF. Kiểm tra mạng rồi thử lại.');
  bao('Đang chuẩn bị in '+ds.length+' trang…', 3);
  tachTrang(m, ds).then(function(r){
    inBlob(r.blob, r.ten);
  }).catch(function(e){
    console.warn(e); baoLoi('Không tách được trang để in.');
  });
}
