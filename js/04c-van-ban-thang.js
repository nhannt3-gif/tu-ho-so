/* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 2634–3608 của bản 3.338), không đổi logic — ngăn 1 Văn bản · ngăn 2 Tháng (bảng đối chiếu, ma trận) · ngăn 3 Ghi chú */
/* ----- ngăn 1: VĂN BẢN ----- */
function veVanBan(){
  tinhTrungSH();   /* 3.77 */
  document.getElementById('nam-vb').innerHTML =
    veDauTab('vanBan', {kho:D.vanBan, 
      themPhu:'<button onclick="lapChiMuc()" title="Lập chỉ mục: đi hết thư mục Tủ hồ sơ, file nào chưa có trong app thì xếp vào đúng tab">🗂 Lập chỉ mục</button>',
                        hamThem:"TAB_TRUOC=1;doiNgan(6);THEM_TU=1;document.getElementById('chon-file').click()"});   /* 3.40: nhớ đúng tab Văn bản — trước sang khay chờ trước nên giữ tab cũ (vd Tháng) → file vào Dữ liệu tháng */
  document.getElementById('loc-vb').innerHTML = '';

  if(kieuXem==='cay') kieuXem = 'ds';   /* kiểu xem cây đã bỏ (3.7) */
  if(false){
    document.getElementById('dem-vb').textContent = 'Theo thư mục lưu trữ';
    document.getElementById('ds-vb').innerHTML = veThanhSap('vanBan');
    veCay(true);
    return;
  }

  if(typeof DK!=='undefined' && DK.mo){
    document.getElementById('nam-vb').innerHTML = '';
    document.getElementById('dem-vb').innerHTML = '';
    document.getElementById('ds-vb').innerHTML = veDonKho();
    return;
  }
  if(CHO_KHAI){
    document.getElementById('nam-vb').innerHTML = '';
    document.getElementById('dem-vb').innerHTML = '';
    document.getElementById('ds-vb').innerHTML = veChoKhai();
    return;
  }
  var ds = locTheoThe('vanBan', locChuan('vanBan', loc(D.vanBan, tuKhoa)));
  ds = sapXep(ds, 'vanBan');
  if(locCua('vanBan').trung) ds = ds.slice().sort(function(a, b){ return khoaTrungVB(a).localeCompare(khoaTrungVB(b)); });   /* 3.77: các bản trùng đứng cạnh nhau */
  BOT_DS.vanBan = ds;
  if(kieuXem==='ds') ds = xepChaCon(ds); else CON_ID = {};
  /* đếm VB hết hiệu lực đang bị ẩn (cùng điều kiện lọc, tạm bật "hiện cả hết hiệu lực") */
  var L0 = locCua('vanBan'), anHet = 0;
  if(!L0.hl){
    L0.hl = '1';
    anHet = locTheoThe('vanBan', locChuan('vanBan',
      loc(D.vanBan.filter(function(x){ return x.hetHieuLuc; }), tuKhoa))).length;
    L0.hl = '';
  }

  var demVB = (ds.length ? '<b>'+ds.length+'</b> kết quả' : 'Không có kết quả')+
    (anHet ? ' · <span class="xoa-loc" style="color:var(--chu-phu)" onclick="datLocGiu(\'vanBan\',\'hl\',\'1\');dongHop()" title="Bấm để hiện cả văn bản hết hiệu lực">ẩn '+anHet+' hết HL</span>' : '')+
    chuDemLoc('vanBan');
  document.getElementById('dem-vb').innerHTML = '';

  document.getElementById('ds-vb').innerHTML = veThanhSap('vanBan', null, null, null, demVB) + (ds.length
    ? (kxBang('vanBan') ? bangTabHTML('vanBan', ds) : kieuXem==='thang' ? nhomTheoThang(ds,'ngay')
       : ds.map(function(m){ return dongHTML(m, tuKhoa); }).join(''))
    : '<div class="rong">'+(D.vanBan.length
        ? 'Không tìm thấy văn bản nào khớp.<br>Thử bỏ bớt điều kiện lọc.'
        : 'Chưa có văn bản nào.<br>Bấm <b>+ Thêm file</b> ở góc trên bên trái, hoặc kéo thả file vào.')+'</div>');
}
var CON_ID = {};
function xepChaCon(ds){ CON_ID = {}; return ds; }   /* 3.68 (AF): bỏ VB chính / VB treo dưới — giữ tên hàm cho chỗ gọi cũ */
var kieuXem = 'ds', moThuMuc = {};
function moTM(id){
  moThuMuc[id] = !moThuMuc[id];
  var e = document.getElementById('tm-'+id);
  if(e) e.classList.toggle('mo', moThuMuc[id]);
}

/* Duyệt nhanh theo đúng cây thư mục lưu trữ trên Drive */
function veCay(them){
  var tat = D.vanBan.concat(D.duLieu, D.ghiChu);
  if(tuKhoa) tat = loc(tat, tuKhoa);
  if(!tat.length){
    document.getElementById('ds-vb').innerHTML =
      '<div class="rong">Chưa có mục nào để xếp vào thư mục.</div>';
    return;
  }
  var nhom = {};
  tat.forEach(function(m){
    var d = thuMucCua(m);
    (nhom[d] = nhom[d] || []).push(m);
  });
  var khoa = Object.keys(nhom).sort();
  var h = '';
  khoa.forEach(function(d, k){
    var id = 'tm'+k;
    var ds = nhom[d].slice().sort(function(a,b){
      return (b.tenMoi||'').localeCompare(a.tenMoi||''); });
    var mo = moThuMuc[id] || !!tuKhoa;
    h += '<div class="tm'+(mo?' mo':'')+'" id="tm-'+id+'">'+
      '<div class="tm-dau" onclick="moTM(\''+id+'\')">'+
        '<span class="mui">›</span>'+
        '<span class="ten">'+coChuHTML(d)+'</span>'+
        '<span class="dem">'+ds.length+'</span>'+
      '</div><div class="tm-than">'+
      ds.map(function(m){
        return '<div class="tm-file" onclick="moXem(\''+m.id+'\')">'+
          '<span class="ico">'+(m.nhom==='ghiChu'?'🖼':'📄')+'</span>'+
          '<span>'+toSang(m.tenMoi||m.tenCu||'', tuKhoa)+'</span></div>';
      }).join('')+'</div></div>';
  });
  document.getElementById('ds-vb').innerHTML =
    (them ? veThanhSap('vanBan') : '') + h;
}

function guiNhanh(id){ var m = timMuc(id); if(m){ mucDangXem = m; taiFile(); } }


/* ----- ngăn 2: THÁNG ----- */
var kieuTh = 'ky';   /* 3.20: ky | donvi | cay | bang */
function datKieuTh(k){ kieuTh = k; dongMenu(); ve(); }
/* ---------- BẢNG ĐỐI CHIẾU (3.20) — nhìn là biết kỳ nào thiếu gì, ở cấp nào ---------- */
function capDang(){ return D.cauHinh.capThang || 'xa'; }
function datCap(c){ D.cauHinh.capThang = c; luu(); veThang(); }
function soKyBang(){ return D.cauHinh.soKyBang || 6; }
function gonBang(){ D.cauHinh.anBangDC = !D.cauHinh.anBangDC; luu(); veThang(); }
/* ---------- MA TRẬN THÁNG (3.21) — màn chính của tab Tháng ----------
   Cột: Báo cáo | PGD | 5 xã (bấm xã → bung các điểm giao dịch của xã đó)
   Nối thêm kỳ cuối năm trước để đối chiếu đầu năm.
   Danh mục báo cáo thêm, bớt, đổi thứ tự ngay trên bảng.
   ------------------------------------------------------------------ */
function kyBang(){
  if(D.cauHinh.kyBang) return D.cauHinh.kyBang;
  var ky = D.duLieu.map(function(x){ return x.ky; }).filter(Boolean).sort();
  return ky.length ? ky[ky.length-1] : ngayISO(nay()).slice(0,7);
}
function datKyBang(k){ D.cauHinh.kyBang = k; luu(); veThang(); }
function doiKyBang(n){
  var p = kyBang().split('-'), d = new Date(+p[0], +p[1]-1+n, 1);
  datKyBang(d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2));
}
/* 3.22: kỳ cuối năm trước coi như một kỳ bình thường — bấm ‹ lùi tới là thấy */
/* 3.31: xã hiện trên ma trận — anh bật/tắt ở nút 👁 thì theo anh; chưa chỉnh thì mặc định chỉ hiện xã quản lý */
function xaHien(xa){
  var m = D.cauHinh.xaHien||{};
  if(m[xa]!==undefined) return m[xa]!==false;
  var q = dsXaQuanLy();
  return q.length ? q.indexOf(xa)>=0 : true;
}
function dsXaQuanLy(){
  var tat = dsDonVi('xa');
  return (D.cauHinh.xaQuanLy||[]).filter(function(x){ return tat.indexOf(x)>=0; });
}
function laXaQuanLy(xa){ var q = dsXaQuanLy(); return !q.length || q.indexOf(xa)>=0; }
function datXaQuanLy(xa, bat){
  var q = (D.cauHinh.xaQuanLy||[]).filter(function(x){ return x!==xa; });
  if(bat) q.push(xa);
  D.cauHinh.xaQuanLy = dsDonVi('xa').filter(function(x){ return q.indexOf(x)>=0; });   /* giữ thứ tự như cây địa bàn */
  delete D.cauHinh.xaHien;   /* ma trận hiện lại theo địa bàn quản lý mới */
  luu();
  bao(D.cauHinh.xaQuanLy.length ? 'Địa bàn quản lý: '+D.cauHinh.xaQuanLy.map(vietTatDV).join(', ')+'. Ma trận chỉ báo thiếu cho các xã này.'
                                : 'Chưa chọn xã nào — ma trận báo thiếu cho tất cả xã.', 6);
}
/* cấp của một cột ma trận */
function capCot(c){ return c.lop==='pgd' ? 'pgd' : (c.lop.indexOf('xa')===0 ? 'xa' : 'diem'); }
/* ô có được tính đủ/thiếu không: cấp áp dụng của báo cáo + cột thuộc PGD hoặc xã quản lý */
function oTinhThieu(m, c){ return mauApCap(m, capCot(c)) && (c.lop==='pgd' || laXaQuanLy(c.xa)); }
/* danh sách thiếu của một kỳ, theo đúng quy tắc của ma trận: PGD + xã quản lý (xã áp dụng cấp điểm thì xét từng điểm) */
function thieuTheoKy(ky){
  var ra = [];
  (D.cauHinh.mauBaoCao||[]).forEach(function(m){
    if(m.an || laMaSoLieu(m) || !toiKy(m, ky)) return;
    var xet = function(dv, ten){
      var o = oDoiChieu(ky, m.ma, dv);
      if(o.tt!=='du' && o.tt!=='phu') ra.push({dv:ten, bc:m.ten, ghi:o.tt==='mot-phan'?o.chu+' điểm':''});
    };
    if(mauApCap(m,'pgd')) xet('Toàn PGD', 'PGD');
    if(laThuanXLS(m)) return;
    dsXaQuanLy().forEach(function(xa){
      if(mauApCap(m,'xa')) xet(xa, vietTatDV(xa));
      else if(mauApCap(m,'diem')) diemCuaXa(xa).forEach(function(d){ xet(d, vietTatDV(d)); });
    });
  });
  return ra;
}
/* "Gia Lộc: Nợ quá hạn, Chấm điểm tổ · Truông Mít: Nợ đến hạn" */
function chuoiThieu(ds){
  var nhom = {}, thuTu = [];
  ds.forEach(function(x){ if(!nhom[x.dv]){ nhom[x.dv] = []; thuTu.push(x.dv); } nhom[x.dv].push(x.bc+(x.ghi?' ('+x.ghi+')':'')); });
  thuTu.sort(function(a,b){ return (b==='PGD')-(a==='PGD'); });   /* PGD đứng đầu, xã giữ thứ tự */
  return thuTu.map(function(k){ return k+': '+nhom[k].join(', '); }).join(' · ');
}
function moThieuChiTiet(ky){
  var ds = thieuTheoKy(ky), nhom = {}, thuTu = [];
  ds.forEach(function(x){ if(!nhom[x.dv]){ nhom[x.dv] = []; thuTu.push(x.dv); } nhom[x.dv].push(x); });
  moHop('<div class="hop-tit">'+kyVN(ky)+' · còn thiếu '+ds.length+' báo cáo</div>'+
    '<div class="hop-phu">Chỉ tính cấp PGD và địa bàn quản lý: '+coChuHTML(dsXaQuanLy().map(vietTatDV).join(', ')||'tất cả xã')+'.</div>'+
    thuTu.map(function(k){
      return '<div class="nhan-nhom">'+coChuHTML(k)+' ('+nhom[k].length+')</div><div class="huong-dan">'+
        nhom[k].map(function(x){ return coChuHTML(x.bc+(x.ghi?' ('+x.ghi+')':'')); }).join('<br>')+'</div>';
    }).join('')+
    '<div class="hang-nut"><button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>');
}
function batXa(xa, hien){
  D.cauHinh.xaHien = D.cauHinh.xaHien || {};
  D.cauHinh.xaHien[xa] = !!hien; luu(); veThang();
}
function moChonXa(){
  var xas = dsDonVi('xa');
  moHop('<div class="hop-tit">Hiện xã, phường nào trên bảng</div>'+
    '<div class="hop-phu">Bỏ tick xã anh không quản lý cho bảng gọn. Bấm tên xã trên bảng vẫn sổ ra điểm giao dịch như thường.</div>'+
    '<div class="chon-xa">'+xas.map(function(x){
      return '<label class="dt-dong"><input type="checkbox" class="cx-o" value="'+coChuHTML(x)+'"'+(xaHien(x)?' checked':'')+
        ' onchange="batXa(this.value, this.checked)"> '+coChuHTML(x)+
        '<small>'+diemCuaXa(x).length+' điểm giao dịch</small></label>';
    }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="hetXa(true)">Hiện hết</button>'+
    '<button class="nho" onclick="hetXa(false)">Ẩn hết</button>'+
    '<button class="nho chinh" data-lenh="hop.dong">Xong</button></div>');
}
function hetXa(hien){
  D.cauHinh.xaHien = {};
  dsDonVi('xa').forEach(function(x){ D.cauHinh.xaHien[x] = !!hien; });
  luu(); veThang(); moChonXa();
}
function diemCuaXa(xa){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  return x ? (x.diem||[]).map(function(d){ return d.ten; }) : [];
}
function xaDangMo(xa){ return !!(D.cauHinh.xaMo||{})[xa]; }
function moXa(xa){
  D.cauHinh.xaMo = D.cauHinh.xaMo || {};
  D.cauHinh.xaMo[xa] = !D.cauHinh.xaMo[xa]; luu(); veThang();
}
function suaDanhMuc(){ D.cauHinh.suaDM = !D.cauHinh.suaDM; luu(); veThang(); }
/* thêm, bớt, đổi thứ tự báo cáo ngay trên bảng */
function themBaoCao(){
  var e = document.getElementById('bdc-them'), ten = (e && e.value || '').trim();
  if(!ten) return bao('Gõ tên báo cáo rồi bấm Thêm.', 3);
  var mau = D.cauHinh.mauBaoCao = D.cauHinh.mauBaoCao || [];
  var ma = slug(ten, 4).toUpperCase().replace(/_/g,'-');
  if(mau.some(function(m){ return m.ma===ma; })) ma += '-' + (mau.length+1);
  mau.push({ten:ten, ma:ma, tuKhoa:[boDau(ten)], cap:[]});
  boMaDaBo([ma]);
  luu(); veThang();
  moThietLapBC(ma);   /* 3.34: thêm xong mở luôn hộp thiết lập (từ khóa, cấp, dạng, chu kỳ) */
}
/* 3.28: KHÔNG bao giờ bỏ dòng báo cáo — chỉ ẩn cho gọn, bật lại lúc nào cũng được */
function anBaoCao(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  m.an = !m.an; luu(); veThang();
  bao(m.an ? 'Đã ẩn “'+m.ten+'” cho gọn — bấm “Hiện lại báo cáo đã ẩn” để lấy lại.' : 'Đã hiện lại “'+m.ten+'”.', 5);
}
function soAn(){ return (D.cauHinh.mauBaoCao||[]).filter(function(x){ return x.an; }).length; }
function hienHetAn(){
  (D.cauHinh.mauBaoCao||[]).forEach(function(x){ delete x.an; });
  luu(); veThang(); bao('Đã hiện lại tất cả báo cáo.', 4);
}
/* 3.34: THIẾT LẬP TỪNG BÁO CÁO NGAY TRÊN GIAO DIỆN — cấp tính thiếu, dạng hiển thị, chu kỳ, dòng Excel.
   Ma trận, tính thiếu, đặt tên file đều đọc các cờ này (cap, thuanXLS, chuKy, theoNgay, coExcel) nên không phải sửa code.
   Mã giữ nguyên: file đã lưu gắn với mã, đổi mã sẽ làm file cũ rời khỏi dòng báo cáo. */
function moThietLapBC(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  var cap = m.cap || [], ck = chuKy(m);
  var hop = function(v, nhan){
    return '<label class="tl-chon"><input type="checkbox" class="tl-cap" value="'+v+'"'+(cap.indexOf(v)>=0?' checked':'')+'> '+nhan+'</label>';
  };
  var nut = function(id, ds, dang){
    return '<div class="co-chu" id="'+id+'">'+ds.map(function(x){
      return '<button'+(dang===x[0]?' class="bat"':'')+' data-v="'+x[0]+'" onclick="chonMotNut(this)">'+x[1]+'</button>';
    }).join('')+'</div>';
  };
  var so = D.duLieu.filter(function(x){ return (x.maLoai||'')===ma; }).length;
  moHop('<div class="hop-tit">⚙ Thiết lập báo cáo</div>'+
    '<div class="hop-phu">Mã <b>'+coChuHTML(m.ma)+'</b> · '+so+' file đã lưu. Đổi ở đây là ma trận và phần báo thiếu theo ngay, không cần sửa code.</div>'+
    '<div class="o"><label>Tên báo cáo</label><input id="tl-ten" value="'+coChuHTML(m.ten)+'"></div>'+
    '<div class="o"><label>Từ khóa nhận dạng — mỗi dòng một từ</label>'+
      '<textarea id="tl-tk" rows="3">'+coChuHTML((m.tuKhoa||[]).join('\n'))+'</textarea></div>'+
    '<div class="o"><label>Nhóm trên ma trận</label>'+
      nut('tl-dang', [['bang','Báo cáo chuẩn'],['mot','Sao kê thuần Excel']], laThuanXLS(m)?'mot':'bang')+
      '<div class="huong-dan">Từ 3.43 mọi báo cáo đều hiện đủ các cột. Sao kê thuần Excel không tích cấp nào thì chỉ tính thiếu ở Toàn PGD.</div></div>'+
    '<div class="o"><label>Tính thiếu ở cấp</label>'+
      '<div class="tl-hang">'+hop('pgd','Toàn PGD')+hop('xa','Xã, phường')+hop('diem','Điểm giao dịch')+'</div>'+
      '<div class="huong-dan">Không tích ô nào = tính ở mọi cấp. Ví dụ số liệu họp giao ban chia theo điểm: chỉ tích Điểm giao dịch.</div></div>'+
    '<div class="o"><label>Chu kỳ</label>'+
      nut('tl-ky', [['thang','Hằng tháng'],['ngay','Theo ngày giao dịch'],['quy','Quý'],['sau','6 tháng'],['nam','Năm']], ck)+'</div>'+
    '<label class="tl-chon"><input type="checkbox" id="tl-xls"'+(m.coExcel?' checked':'')+'> Có thêm dòng bản Excel cấp PGD</label>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop();veLaiCDNeuCan()">Thôi</button>'+
    '<button class="nho chinh" onclick="luuThietLapBC(\''+ma+'\')">Lưu</button></div>', true);
}
function luuThietLapBC(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  var ten = gt('tl-ten') || m.ten;
  if(ten!==m.ten){ m.ten = ten; D.duLieu.forEach(function(x){ if((x.maLoai||'')===ma) x.tenLoai = ten; }); }
  m.tuKhoa = gt('tl-tk').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  m.thuanXLS = layNutChon('tl-dang')==='mot';
  m.cap = Array.prototype.slice.call(document.querySelectorAll('.tl-cap:checked')).map(function(c){ return c.value; });
  var ck = layNutChon('tl-ky') || 'thang';
  m.chuKy = ck; m.theoNgay = (ck==='ngay');
  var e = document.getElementById('tl-xls'); m.coExcel = !!(e && e.checked);
  luu(); dongHop(); veThang(); veLaiCDNeuCan();
  if(DR.sanSang) dayCauHinh(true);
  bao('Đã lưu thiết lập “'+m.ten+'”: tính thiếu ở '+capChu(m)+
    ' · '+{thang:'hằng tháng',ngay:'theo ngày',quy:'quý',sau:'6 tháng',nam:'năm'}[ck], 6);
}
/* ==========================================================
   QUÉT ĐỔI TÊN (3.26) — đổi tên báo cáo xong, muốn đổi tên file đã lưu thì bấm nút này.
   Bảng tên cũ → tên mới, tick từng dòng + Chọn tất cả, có hoàn tác.
   ========================================================== */
function dsDoiTen(ma){
  return D.duLieu.filter(function(x){ return !ma || (x.maLoai||'')===ma; })
    .map(function(m){ return {m:m, cu:m.tenMoi||m.tenCu||'', moi:tenDuLieu(m, m.duoi||'.pdf')}; })
    .filter(function(x){ return x.cu !== x.moi; });
}
function moQuetDoiTen(ma){
  var ds = dsDoiTen(ma);
  if(!ds.length) return bao('Tên file đang khớp chuẩn, không có gì phải đổi.', 5);
  moHop('<div class="hop-tit">Quét đổi tên file</div>'+
    '<div class="hop-phu">'+ds.length+' file có tên khác chuẩn hiện tại. Tích file muốn đổi. '+
    'Đổi cả tên thật trên Drive, xong vẫn hoàn tác được.</div>'+
    '<div class="qdt-nut"><button class="nho" onclick="tickDoiTen(true)">Chọn tất cả</button>'+
    '<button class="nho" onclick="tickDoiTen(false)">Bỏ chọn</button>'+
    '<span id="qdt-dem" class="bdc-chu"></span></div>'+
    '<div class="qdt-ds" id="qdt-ds">'+ds.map(function(x,i){
      return '<label class="rac-dong"><input type="checkbox" class="qdt-o" value="'+x.m.id+'" onchange="demDoiTen()">'+
        '<span class="rac-ten"><s>'+coChuHTML(x.cu)+'</s><small>→ <b>'+coChuHTML(x.moi)+'</b></small></span></label>';
    }).join('')+'</div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
    '<button class="nho chinh" onclick="chayDoiTen()">Đổi tên file đã tích</button></div>', true);
  demDoiTen();
}
function tickDoiTen(b){
  Array.prototype.forEach.call(document.querySelectorAll('.qdt-o'), function(c){ c.checked = b; });
  demDoiTen();
}
function demDoiTen(){
  var n = document.querySelectorAll('.qdt-o:checked').length, e = document.getElementById('qdt-dem');
  if(e) e.textContent = n ? 'đã tích '+n+' file' : 'chưa tích file nào';
}
function chayDoiTen(){
  var ids = Array.prototype.slice.call(document.querySelectorAll('.qdt-o:checked')).map(function(c){ return c.value; });
  if(!ids.length) return bao('Chưa tích file nào.', 3);
  var cu = [];
  ids.forEach(function(id){
    var m = D.duLieu.find(function(x){ return x.id===id; }); if(!m) return;
    cu.push({id:id, ten:m.tenMoi});
    m.tenMoi = tenDuLieu(m, m.duoi||'.pdf');
    m.suaLuc = new Date().toISOString();
    if(m.driveId) m.choDB = true;   /* đổi luôn tên thật trên Drive qua hàng chờ */
  });
  ghiHoanTac('đổi tên '+cu.length+' file', function(){
    cu.forEach(function(x){
      var m = D.duLieu.find(function(y){ return y.id===x.id; });
      if(m){ m.tenMoi = x.ten; if(m.driveId) m.choDB = true; }
    });
  });
  luu(); dongHop(); ve();
  if(DR.sanSang && DR.online) chayDongBoCho();
  bao('Đã đổi tên '+cu.length+' file · bấm ↶ ở sổ hoặc Ctrl+Z để trả lại tên cũ', 7);
}
function doiTenBaoCao(ma, ten){
  ten = (ten||'').trim(); if(!ten) return veThang();
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; });
  if(!m || m.ten===ten) return;
  var cu = m.ten; m.ten = ten;
  /* mã giữ nguyên nên file cũ không ảnh hưởng — chỉ cập nhật tên hiển thị đã lưu trong file */
  D.duLieu.forEach(function(x){ if((x.maLoai||'')===ma) x.tenLoai = ten; });
  luu(); veThang();
  var so = dsDoiTen(ma).length;
  bao('Đã đổi tên báo cáo: “'+cu+'” → “'+ten+'”. Mã giữ nguyên nên file cũ không ảnh hưởng.'+
    (so?' · '+so+' file có tên khác chuẩn — bấm ✎ Danh mục → Quét đổi tên nếu muốn đổi theo.':''), 8);
}
function batExcel(ma){
  var m = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; }); if(!m) return;
  m.coExcel = !m.coExcel; luu(); veThang();
  bao(m.coExcel ? 'Đã thêm dòng Excel cấp PGD cho “'+m.ten+'”.' : 'Đã bỏ dòng Excel.', 4);
}
function chuyenBaoCao(ma, huong){
  var mau = D.cauHinh.mauBaoCao || [], i = mau.findIndex(function(x){ return x.ma===ma; });
  var j = i + huong;
  if(i<0 || j<0 || j>=mau.length) return;
  var t = mau[i]; mau[i] = mau[j]; mau[j] = t;
  luu(); veThang();
}
function bangDoiChieuHTML(){
  if(D.cauHinh.anBangDC)
    return '<div class="bdc-gon"><b>📊 Bảng đối chiếu</b> đang thu gọn '+
      '<button class="nho" onclick="gonBang()">Mở ra</button></div>';
  var mau = D.cauHinh.mauBaoCao || [];
  if(!mau.length) return '<div class="bdc-gon">Chưa khai danh mục báo cáo — bấm '+
    '<button class="nho" onclick="suaDanhMuc()">Sửa danh mục</button> để thêm.</div>';
  var ky = kyBang(), xas = dsDonVi('xa').filter(xaHien), tatXa = dsDonVi('xa'), sua = !!D.cauHinh.suaDM;

  /* ---- cột ---- 3.31: nút cấp Toàn PGD / Xã, phường / Điểm giao dịch */
  var capMT = capDang();
  var cot = [{ma:'Toàn PGD', ten:'PGD', lop:'pgd'}];
  if(capMT!=='pgd') xas.forEach(function(xa){
    var mo = capMT==='diem' || xaDangMo(xa), dm = diemCuaXa(xa);
    cot.push({ma:xa, ten:vietTatDV(xa), lop:'xa'+(mo?' mo':''), xa:xa, co:dm.length});
    if(mo) dm.forEach(function(d){ cot.push({ma:d, ten:vietTatDV(d), lop:'diem', xa:xa}); });
  });

  var du=0, phu=0, thieu=0, dsThieu=[];
  /* 3.34: thanh nút chia 2 dòng, nút gọn 28px — trước dồn một hàng nên bị che, phải cuộn ngang */
  var h = '<div class="bdc"><div class="bdc-dau"><div class="bdc-hang">'+
    '<b>📊 Bộ dữ liệu</b>'+
    '<span class="bdc-ky-chon">'+
      '<button class="nho" onclick="doiKyBang(-1)" title="Kỳ trước">‹</button>'+
      '<b class="bdc-ky-ten">'+kyVN(ky)+'</b>'+
      '<button class="nho" onclick="doiKyBang(1)" title="Kỳ sau">›</button>'+
    '</span>'+
    /* 3.31 (mục 11a, 11b) */
    '<button class="nho'+(laKyChot(ky)?' bat':'')+'" onclick="batChotKy(\''+ky+'\')" title="'+
      (laKyChot(ky)?'Kỳ đã chốt — bấm để mở chốt':'Chốt kỳ khi đã đủ bộ — thêm file sau đó phải xác nhận')+'">'+
      (laKyChot(ky)?'🔒 Đã chốt':'Chốt kỳ '+kyVN(ky))+'</button>'+
    '<button class="nho" onclick="moSoSanhKy(\''+ky+'\')" title="Chép 2 kỳ sang AI để so sánh">⇄ So 2 kỳ</button>'+
    '<button class="nho bdc-gon-nut" onclick="gonBang()" title="Thu gọn bảng">▴</button></div><div class="bdc-hang">'+
    '<button class="nho" onclick="moChonXa()" title="Chọn xã, phường hiện trên bảng">👁 Xã ('+xas.length+'/'+tatXa.length+')</button>'+
    /* 3.31: bỏ 3 nút Theo kỳ/Theo đơn vị/Dạng cây (trùng thanh kiểu xem bên dưới) → 3 nút chọn cấp */
    '<span class="bdc-kieu bdc-cap">'+dsCap().map(function(x){
      return '<button class="nho'+(capMT===x[0]?' bat':'')+'" onclick="datCap(\''+x[0]+'\')">'+x[1]+'</button>';
    }).join('')+'</span>'+
    '<button class="nho'+(sua?' bat':'')+'" onclick="suaDanhMuc()" title="Thêm, bớt, đổi thứ tự, sửa tên báo cáo">✎ Danh mục</button>'+
    (sua?'<button class="nho" onclick="moQuetDoiTen()" title="Đổi tên các file đã lưu cho khớp chuẩn hiện tại">🔤 Quét đổi tên</button>':'')+
    '</div></div>';

  h += '<div class="bdc-cuon"><table class="bdc-bang"><thead><tr>'+
    '<th class="bdc-goc">Báo cáo</th>'+
    cot.map(function(c){
      if(c.lop.indexOf('xa')===0)
        return '<th class="'+c.lop+(laXaQuanLy(c.xa)?'':' ngoai-db')+'" onclick="moXa(\''+c.xa+'\')" title="'+coChuHTML(c.xa)+
          (laXaQuanLy(c.xa)?'':' — ngoài địa bàn quản lý, không tính thiếu')+' — bấm để '+
          (c.lop.indexOf(' mo')>0?'gộp lại':'tách '+c.co+' điểm giao dịch')+'">'+
          (c.lop.indexOf(' mo')>0?'▾ ':'▸ ')+coChuHTML(c.ten)+'</th>';
      return '<th class="'+c.lop+'" title="'+coChuHTML(c.ma)+'">'+coChuHTML(c.ten)+'</th>';
    }).join('')+
    (sua?'<th class="bdc-sua">Sửa</th>':'')+'</tr></thead><tbody>';

  var hangExcel = function(m){
    var hh = '<tr class="bdc-xls"><td class="bdc-ten bdc-ten-xls" title="Bản Excel cấp PGD — bấm 📋 để chép sang AI">'+
      '<span class="xls-nhan">XLS</span> '+coChuHTML(m.ten)+'</td>';
    cot.forEach(function(c){
      var o = oDoiChieu(ky, m.ma, c.ma, false, true);
      hh += (o.tt==='du')
        ? '<td class="bdc-o xls du" title="'+coChuHTML(o.ds[0].tenMoi||'')+'">'+
            '<span onclick="moXem(\''+o.ds[0].id+'\')">✓</span>'+
            '<i class="xls-ai" title="Chép sang AI" onclick="event.stopPropagation();moChepAI(\''+o.ds[0].id+'\')">📋</i></td>'
        : '<td class="bdc-o xls trong" title="Chưa có bản Excel — không bắt buộc, không tính thiếu" onclick="themChoO(\''+ky+'\',\''+m.ma+'\',\''+String(c.ma).replace(/'/g,'')+'\')">+</td>';
    });
    if(sua) hh += '<td class="bdc-sua"></td>';
    return hh+'</tr>';
  };
  var veHang = function(m, i, mangMau){
    var h = '<tr><td class="bdc-ten" title="'+coChuHTML(m.ma)+'">'+
      (sua ? '<input class="bdc-ten-o" value="'+coChuHTML(m.ten)+'" onchange="doiTenBaoCao(\''+m.ma+'\',this.value)" '+
             'onkeydown="if(event.key===\'Enter\')this.blur()" title="Sửa tên rồi bấm Enter">'
           : coChuHTML(m.ten))+(toiKy(m, ky)?'':' <small class="bdc-chuaky">chưa tới kỳ</small>')+'</td>';
    /* 3.43: mọi báo cáo hiện ĐỦ các cột, cùng một kiểu ô (anh Nhân chốt) — bỏ ô gộp ngang của sao kê và của "chưa tới kỳ".
       Ô không tính thiếu (khác cấp áp dụng, ngoài địa bàn, chưa tới kỳ) vẫn là dấu + để thêm file, chỉ nhạt màu */
    var denKy = toiKy(m, ky);
    cot.forEach(function(c){
      var o = oDoiChieu(ky, m.ma, c.ma);
      /* 3.31: chỉ đếm ô thuộc PGD/xã quản lý và đúng cấp áp dụng của báo cáo; ô khác có file vẫn hiện, không có thì không tính thiếu */
      if(!denKy || !oTinhThieu(m, c)){
        h += oHTML(o, ky, m, c.ma, c.lop, !denKy ? 'Báo cáo '+({quy:'theo quý',sau:'6 tháng',nam:'theo năm'}[chuKy(m)]||'')+' — kỳ này chưa tới hạn'
          : (mauApCap(m, capCot(c)) ? 'Ngoài địa bàn quản lý' : 'Báo cáo này chỉ tính ở cấp '+capChu(m)));
        return;
      }
      if(o.tt==='du') du++; else if(o.tt==='phu') phu++;
      else { thieu++; dsThieu.push({dv:c.ten, bc:m.ten, ghi:o.tt==='mot-phan'?o.chu+' điểm':''}); }
      h += oHTML(o, ky, m, c.ma, c.lop);
    });
    if(sua) h += '<td class="bdc-sua">'+
      '<button onclick="moThietLapBC(\''+m.ma+'\')" title="Thiết lập: cấp tính thiếu, dạng hiển thị, chu kỳ, từ khóa">⚙</button>'+
      '<button onclick="chuyenBaoCao(\''+m.ma+'\',-1)" title="Lên trên"'+(i===0?' disabled':'')+'>↑</button>'+
      '<button onclick="chuyenBaoCao(\''+m.ma+'\',1)" title="Xuống dưới"'+(i===mau.length-1?' disabled':'')+'>↓</button>'+
      '<button class="'+(m.coExcel?'bat':'')+'" onclick="batExcel(\''+m.ma+'\')" title="Có thêm bản Excel cấp PGD (dòng riêng)">XLS</button>'+
      '<button onclick="moQuetDoiTen(\''+m.ma+'\')" title="Chuẩn lại tên các file đã lưu của dòng này">🔤</button>'+
      '<button onclick="anBaoCao(\''+m.ma+'\')" title="Ẩn dòng này cho gọn — không xóa, bật lại lúc nào cũng được">'+
        (m.an?'👁':'🙈')+'</button></td>';
    h += '</tr>';
    if(m.coExcel) h += hangExcel(m);
    return h;
  };
  /* 3.27: chia 2 khối gập được — Báo cáo chuẩn · Sao kê thuần Excel */
  var hien = mau.filter(function(m){ return (!m.an || sua) && !laMaSoLieu(m); });   /* 3.85: 7 dòng sao kê thuần Excel → tab Số liệu */
  var chuan = hien.filter(function(m){ return !laThuanXLS(m); });
  var xls   = hien.filter(laThuanXLS);
  var hangKhoi = function(k, ten, so){
    return '<tr class="bdc-khoi"><td colspan="'+(cot.length+2)+'" onclick="batKhoi(\''+k+'\')">'+
      (khoiMo(k)?'▾ ':'▸ ')+ten+' <small>'+so+' báo cáo</small></td></tr>';
  };
  h += hangKhoi('chuan','Báo cáo chuẩn', chuan.length);
  if(khoiMo('chuan')) chuan.forEach(function(m,i){ h += veHang(m, i, chuan); });
  if(xls.length){
    h += hangKhoi('xls','Sao kê thuần Excel · toàn PGD', xls.length);
    if(khoiMo('xls')) xls.forEach(function(m,i){ h += veHang(m, i, xls); });
  }
  if(sua) h += '<tr class="bdc-them-hang"><td colspan="'+(cot.length+2)+'">'+
    '<input id="bdc-them" placeholder="Tên báo cáo mới…" onkeydown="if(event.key===\'Enter\')themBaoCao()">'+
    '<button class="nho chinh" onclick="themBaoCao()">+ Thêm báo cáo</button>'+
    '<span class="bdc-chu">Bấm ⚙ ở cột Sửa để chọn cấp tính thiếu, dạng hiển thị, chu kỳ, từ khóa</span></td></tr>';
  h += '</tbody></table></div>';

  h += '<div class="bdc-chan">'+kyVN(ky)+' · <b class="bdc-du">'+du+' đủ</b>'+
    (soAn()?' · <a class="bdc-an" onclick="hienHetAn()">Hiện lại '+soAn()+' báo cáo đã ẩn</a>':'')+
    (phu?' · <b class="bdc-phu">'+phu+' mới có dữ liệu phụ</b>':'')+
    (thieu?' · <b class="bdc-thieu">'+thieu+' thiếu</b>':' · <b class="bdc-du">không thiếu gì</b>')+
    (thieu ? (function(){
      /* 3.31: ghi rõ đơn vị nào thiếu gì — dài quá thì rút gọn, bấm xem đủ */
      var ct = chuoiThieu(dsThieu), gon = ct.length>150 ? ct.slice(0,150).replace(/[,·]?\s*\S*$/,'')+'…' : ct;
      return ' <span class="bdc-thieu-ct">— '+coChuHTML(gon)+
        (gon!==ct?' <a class="bdc-an" onclick="moThieuChiTiet(\''+ky+'\')">xem đủ</a>':'')+'</span>';
    })() : '')+
    '<span class="bdc-chu">Bấm ô thiếu để thêm file · ô xanh để mở file · bấm tên xã để tách điểm giao dịch'+
      (dsXaQuanLy().length?' · chỉ tính thiếu cho PGD và '+coChuHTML(dsXaQuanLy().map(vietTatDV).join(', ')):'')+'</span></div></div>';
  return h;
}
/* ==========================================================
   3.31 (mục 11 bàn giao) — CHỐT KỲ · SO SÁNH 2 KỲ · NHẮC GIAO BAN
   ========================================================== */
function laKyChot(ky){ return !!ky && (D.cauHinh.kyChot||[]).indexOf(ky)>=0; }
function batChotKy(ky){
  if(laKyChot(ky))
    return hoi('Mở chốt '+kyVN(ky)+'?', 'Mở chốt thì thêm file vào kỳ này không cần xác nhận nữa.', 'Mở chốt', function(){
      D.cauHinh.kyChot = (D.cauHinh.kyChot||[]).filter(function(x){ return x!==ky; }); luu(); veThang();
    });
  var thieu = thieuTheoKy(ky);
  var lam = function(){
    D.cauHinh.kyChot = (D.cauHinh.kyChot||[]).concat([ky]); luu(); veThang();
    bao('Đã chốt '+kyVN(ky)+'. Thêm file vào kỳ này sẽ phải xác nhận.', 5);
  };
  if(thieu.length) return hoi('Kỳ '+kyVN(ky)+' còn thiếu '+thieu.length+' báo cáo',
    chuoiThieu(thieu).slice(0,300)+(chuoiThieu(thieu).length>300?'…':'')+' — vẫn chốt?', 'Vẫn chốt', lam);
  lam();
}
/* kỳ lùi n tháng: '2026-08', -1 → '2026-07' */
function kyLui(ky, n){ var p = String(ky).split('-'), d = new Date(+p[0], +p[1]-1+n, 1); return d.getFullYear()+'-'+hai(d.getMonth()+1); }
function moSoSanhKy(ky){
  var kys = {}; D.duLieu.forEach(function(x){ if(x.ky) kys[x.ky] = 1; }); kys[ky] = 1;
  var dsKy = Object.keys(kys).sort().reverse();
  var t = +ky.slice(5,7), dauQuy = kyLui(ky, -(((t-1)%3)+1)), dauNam = (+ky.slice(0,4)-1)+'-12';
  var mauX = (D.cauHinh.mauBaoCao||[]).filter(function(m){
    return D.duLieu.some(function(x){ return x.maLoai===m.ma && laExcel(x); }); });
  var chonKy = function(id, gt0){ return '<select id="'+id+'">'+dsKy.concat(dsKy.indexOf(gt0)<0?[gt0]:[]).map(function(k){
    return '<option value="'+k+'"'+(k===gt0?' selected':'')+'>'+kyVN(k)+'</option>'; }).join('')+'</select>'; };
  moHop('<div class="hop-tit">So sánh 2 kỳ</div>'+
    '<div class="hop-phu">Chép bảng Excel của hai kỳ sang AI dạng Markdown, kèm câu hỏi sẵn. Số liệu giữ nguyên, không sửa.</div>'+
    '<div class="hai"><div class="o"><label>Kỳ gốc</label>'+chonKy('ss-ky1', ky)+'</div>'+
    '<div class="o"><label>Kỳ so</label>'+chonKy('ss-ky2', kyLui(ky,-1))+'</div></div>'+
    '<div class="hang-nut">'+
      '<button class="nho" onclick="datSSKy(\''+kyLui(ky,-1)+'\')">So tháng trước</button>'+
      '<button class="nho" onclick="datSSKy(\''+dauQuy+'\')">So đầu quý ('+kyVN(dauQuy)+')</button>'+
      '<button class="nho" onclick="datSSKy(\''+dauNam+'\')">So đầu năm ('+kyVN(dauNam)+')</button></div>'+
    '<div class="o"><label>Báo cáo (bản Excel)</label><select id="ss-mau">'+
      (mauX.length ? mauX.map(function(m){ return '<option value="'+m.ma+'">'+coChuHTML(m.ten)+'</option>'; }).join('')
                   : '<option value="">— chưa có báo cáo nào lưu bản Excel —</option>')+'</select></div>'+
    '<div class="o"><label>Phạm vi</label><select id="ss-pham">'+dsPhamVi().map(function(x){
      return '<option>'+coChuHTML(x)+'</option>'; }).join('')+'</select></div>'+
    '<div class="huong-dan">Báo cáo sao kê có tên, số CCCD khách hàng — cân nhắc trước khi dán sang AI bên ngoài.</div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
      '<button class="nho chinh" onclick="chepSoSanh()">Chép sang AI</button></div>');
}
function datSSKy(k){
  var e = document.getElementById('ss-ky2'); if(!e) return;
  if(![].some.call(e.options, function(o){ return o.value===k; })){ var o = document.createElement('option'); o.value = k; o.textContent = kyVN(k); e.appendChild(o); }
  e.value = k;
}
function chepSoSanh(){
  var k1 = gt('ss-ky1'), k2 = gt('ss-ky2'), ma = gt('ss-mau'), pv = gt('ss-pham');
  if(!ma) return baoLoi('Chưa có báo cáo nào lưu bản Excel để so.');
  if(k1===k2) return baoLoi('Hai kỳ đang giống nhau.');
  var tim = function(k){ var o = oDoiChieu(k, ma, pv, false, true); return (o.ds||[]).filter(laExcel)[0]; };
  var f1 = tim(k1), f2 = tim(k2);
  if(!f1 || !f2) return baoLoi('Thiếu bản Excel của '+(!f1?kyVN(k1):kyVN(k2))+' · '+pv+'.');
  dangLam('Đang đọc 2 bảng…');
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    var XL = window.XLSX; if(!XL) throw new Error('Chưa tải được bộ đọc Excel — cần có mạng một lần');
    var doc = function(m){ return layNoiDung(m).then(function(b){
      if(!b) throw new Error('Chưa có nội dung file '+(m.tenMoi||''));
      return b.arrayBuffer(); }).then(function(ab){
        var wb = XL.read(new Uint8Array(ab), {type:'array'}); return bangTuSheet(wb.Sheets[wb.SheetNames[0]], XL); }); };
    return Promise.all([doc(f1), doc(f2)]);
  }).then(function(bs){
    hetLam();
    var t = 'So sánh hai kỳ, chỉ ra thay đổi lớn (tăng, giảm, chỉ tiêu bất thường) và nguyên nhân có thể.\n\n'+
      '## Kỳ gốc — '+boiCanh(f1)+'\n\n'+sangMarkdown(bs[0])+'\n\n## Kỳ so — '+boiCanh(f2)+'\n\n'+sangMarkdown(bs[1]);
    chepChu(t, 'Đã chép 2 bảng ('+kyVN(k1)+' và '+kyVN(k2)+') · ước '+uocToken(t)+' token. Dán thẳng vào cửa sổ AI.');
    dongHop();
  }).catch(function(e){ hetLam(); baoLoi('Không so được: '+(e&&e.message||e)); });
}
/* 11c: lần giao ban tới (việc lặp trong Lịch có chữ "giao ban") trong 7 ngày → số ngày còn lại, -1 nếu không có */
function ngayToiGiaoBan(){
  var hn = lcISO(nay());
  /* 3.40: chữ nhận ra việc giao ban và số ngày báo trước sửa được ở Cài đặt › Dữ liệu tháng */
  var tu = String(D.cauHinh.gbTuKhoa||'giao ban').split(',').map(function(x){ return boDau(x.trim()); }).filter(Boolean);
  var soNgay = Math.max(1, Math.min(30, parseInt(D.cauHinh.gbSoNgay,10) || 7));
  var gb = lcData().viec.filter(function(v){ var t = boDau(v.ten||''); return tu.some(function(x){ return t.indexOf(x)>=0; }); });
  for(var i=0;i<=soNgay;i++){
    var iso = lcCong(hn, i);
    if(gb.some(function(v){ return lcCo(v, iso) && !lcXongNgay(v, iso); })) return i;
  }
  return -1;
}
/* gom theo đơn vị (phạm vi) */
function nhomTheoDonVi(ds){
  var nhom = {}, thuTu = [];
  ds.forEach(function(m){
    var k = m.phamVi || '(chưa rõ đơn vị)';
    if(!nhom[k]){ nhom[k] = []; thuTu.push(k); }
    nhom[k].push(m);
  });
  thuTu.sort();
  return thuTu.map(function(k){
    return '<div class="nhan-nhom">'+coChuHTML(k)+' · '+nhom[k].length+' file</div>'+
      nhom[k].sort(function(a,b){ return (b.ky||'').localeCompare(a.ky||''); })
             .map(function(m){ return dongHTML(m, tuKhoa); }).join('');
  }).join('');
}
/* dạng cây: Năm → Tháng → Đơn vị → file */
function moGap(k, macDinh){
  D.cauHinh.cayMo = D.cauHinh.cayMo || {};
  D.cauHinh.cayMo[k] = !dangMo(k, macDinh===undefined ? true : macDinh);
  luu(); veThang();
}
function dangMo(k, macDinh){
  var c = (D.cauHinh.cayMo||{})[k];
  return (c===undefined) ? !!macDinh : !!c;
}
function cayDuLieu(ds){
  var cay = {};
  ds.forEach(function(m){
    var nam = (m.ky||'????').slice(0,4), thang = m.ky||'?', dv = m.phamVi || '(chưa rõ đơn vị)';
    cay[nam] = cay[nam] || {};
    cay[nam][thang] = cay[nam][thang] || {};
    (cay[nam][thang][dv] = cay[nam][thang][dv] || []).push(m);
  });
  var h = '<div class="cay">';
  Object.keys(cay).sort().reverse().forEach(function(nam){
    var kN = 'n'+nam, moN = dangMo(kN, true), soN = 0;
    Object.keys(cay[nam]).forEach(function(t){ Object.keys(cay[nam][t]).forEach(function(d){ soN += cay[nam][t][d].length; }); });
    h += '<div class="cay-nhanh"><div class="cay-dau" onclick="moGap(\''+kN+'\')">'+
      '<span class="cay-mui">'+(moN?'▾':'▸')+'</span>📅 Năm '+nam+'<small>'+soN+' file</small></div>';
    if(moN) Object.keys(cay[nam]).sort().reverse().forEach(function(thang){
      var kT = 't'+thang, moT = dangMo(kT, true), soT = 0;
      Object.keys(cay[nam][thang]).forEach(function(d){ soT += cay[nam][thang][d].length; });
      h += '<div class="cay-nhanh c2"><div class="cay-dau" onclick="moGap(\''+kT+'\')">'+
        '<span class="cay-mui">'+(moT?'▾':'▸')+'</span>'+kyVN(thang)+'<small>'+soT+' file</small></div>';
      if(moT) Object.keys(cay[nam][thang]).sort().forEach(function(dv){
        var kD = 'd'+thang+dv, moD = dangMo(kD, true), ml = cay[nam][thang][dv];
        h += '<div class="cay-nhanh c3"><div class="cay-dau" onclick="moGap(\''+kD.replace(/'/g,'')+'\')">'+
          '<span class="cay-mui">'+(moD?'▾':'▸')+'</span>'+coChuHTML(dv)+'<small>'+ml.length+' file</small></div>'+
          (moD ? '<div class="cay-la">'+ml.map(function(m){ return dongHTML(m, tuKhoa); }).join('')+'</div>' : '')+
        '</div>';
      });
      h += '</div>';
    });
    h += '</div>';
  });
  return h+'</div>';
}
function vietTatDV(x){
  return x.replace(/^(Phường|Xã|Thị trấn)\s+/i,'').replace(/Điểm giao dịch\s*/i,'');
}
/* 3.43: MỘT QUY TẮC CHO MỌI Ô (anh Nhân chốt) — có file ✓ · chưa có + (bấm thêm) · ô xã của báo cáo tính theo điểm: n/n.
   nhat = lý do ô này KHÔNG tính thiếu → cùng dấu + nhưng nhạt màu, để phần báo thiếu vẫn đúng */
function capChu(m){
  var c = (m.cap && m.cap.length) ? m.cap : (m.thuanXLS ? ['pgd'] : ['pgd','xa','diem']);
  return c.map(function(x){ return {pgd:'Toàn PGD', xa:'xã', diem:'điểm giao dịch'}[x]; }).join(', ');
}
function oHTML(o, ky, mau, dv, lop, nhat){
  var l = 'bdc-o '+(lop||'');
  var them = 'onclick="themChoO(\''+ky+'\',\''+mau.ma+'\',\''+dv.replace(/'/g,"")+'\')"';
  var oCong = function(ghiThem){
    return nhat
      ? '<td class="'+l+' khong-ap" title="'+coChuHTML(nhat)+' — không tính thiếu. Bấm nếu vẫn muốn thêm file" '+them+'>+'+(ghiThem||'')+'</td>'
      : '<td class="'+l+' thieu" title="Chưa có — bấm để thêm file" '+them+'>+'+(ghiThem||'')+'</td>';
  };
  /* ô XÃ: dấu chính là file riêng của xã; báo cáo có tính ở cấp điểm thì kèm n/n điểm (bấm để tách cột) */
  var laXa = dsDonVi('xa').indexOf(dv)>=0;
  if(laXa){
    var dm = demDiemCua(ky, mau.ma, dv);
    var coXa = (o.tt==='du' || o.tt==='phu') && o.ds.length && (o.ds[0].phamVi===dv);
    if(dm.tong && mauApCap(mau, 'diem')){
      var loaiN = dm.co===dm.tong ? ' du' : (dm.co ? ' mot' : '');
      if(!mauApCap(mau, 'xa') && !coXa)   /* báo cáo chỉ tính theo điểm → ô xã chính là n/n, như cũ */
        return '<td class="'+l+(dm.co===dm.tong?' du':(dm.co?' mot-phan':(nhat?' khong-ap':' thieu')))+'" title="'+dm.co+'/'+dm.tong+
          ' điểm giao dịch đã có file — bấm để tách cột điểm" onclick="moXa(\''+dv.replace(/'/g,"")+'\')">'+dm.co+'/'+dm.tong+'</td>';
      var pDiem = '<i class="o-diem'+loaiN+'" title="'+dm.co+'/'+dm.tong+
        ' điểm giao dịch đã có file — bấm để tách cột điểm" onclick="event.stopPropagation();moXa(\''+dv.replace(/'/g,"")+'\')">'+
        dm.co+'/'+dm.tong+'</i>';
      if(coXa) return '<td class="'+l+' du co-diem" title="File riêng của xã: '+coChuHTML(o.ds[0].tenMoi||'')+
        '" onclick="moXem(\''+o.ds[0].id+'\')">✓'+pDiem+'</td>';
      if(o.tt==='du') return '<td class="'+l+' du co-diem" title="Đủ file của các điểm giao dịch" onclick="moXa(\''+dv.replace(/'/g,"")+'\')">✓'+pDiem+'</td>';
      return oCong(pDiem).replace('class="'+l, 'class="'+l+' co-diem');
    }
  }
  if(o.tt==='mot-phan')
    return '<td class="'+l+' mot-phan" title="Đã có '+o.so+'/'+o.tong+' điểm giao dịch của '+coChuHTML(dv)+
      ' — bấm tên xã để xem từng điểm" onclick="moXa(\''+dv.replace(/'/g,"")+'\')">'+o.chu+'</td>';
  if(o.tt==='du'){
    var nhieuPhien = mau && mauTheoNgay(mau.ma) && o.ds.length>1;
    return '<td class="'+l+' du'+(nhieuPhien?' phien':'')+'" title="'+
      (nhieuPhien ? o.ds.length+' phiên giao dịch trong kỳ' : coChuHTML(o.ds[0].tenMoi||''))+
      '" onclick="moXem(\''+o.ds[0].id+'\')">'+(nhieuPhien ? o.ds.length+' phiên' : '✓')+
      (!nhieuPhien && o.ds.length>1?'<i>'+o.ds.length+'</i>':'')+'</td>';
  }
  if(o.tt==='phu')
    return '<td class="'+l+' phu" title="Mới có dữ liệu phụ, chưa có bản cuối tháng" '+them+'>⚠</td>';
  return oCong();
}
/* bấm ô thiếu → mở màn thêm file, nhớ sẵn kỳ + loại + phạm vi để điền cho file vừa thêm */
var CHO_O = null;
function themChoO(ky, ma, dv, daXacNhan){
  if(laKyChot(ky) && !daXacNhan)
    return hoi('Kỳ '+kyVN(ky)+' đã chốt', 'Kỳ này anh đã chốt đủ bộ. Vẫn thêm file vào ô này?', 'Vẫn thêm',
      function(){ themChoO(ky, ma, dv, true); });
  TAB_TRUOC = 2;
  var mau = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===ma; });
  CHO_O = {ky:ky, ma:ma, ten:(mau?mau.ten:ma), pham:(dv==='Toàn PGD'?'Toàn PGD':dv), luc:Date.now()};
  bao('Thêm file cho: '+kyVN(ky)+' · '+(mau?mau.ten:ma)+' · '+dv+' — app điền sẵn 3 mục này.', 6);
  doiNgan(6);   /* 3.25: sang màn duyệt, trước đây ở lại tab Tháng nên bấm xong không thấy gì */
  var o = document.getElementById('chon-file'); if(o) o.click();
}
/* áp thông tin của ô ma trận cho mục vừa thêm — chạy cả khi app KHÔNG nhận ra loại báo cáo */
/* 3.28: cảnh báo khi file có vẻ không khớp ô anh chọn (khác đơn vị / khác loại) */
function canhBaoLech(d, chu){
  if(!CHO_O) return '';
  var t = boDau((chu||'')+' '+(d.tenCu||'')), ra = [];
  var dv = (dsDonVi('diem').concat(dsDonVi('xa'))).filter(function(x){
    return boDau(x) && t.indexOf(boDau(x))>=0 && x!==CHO_O.pham; });
  if(dv.length && CHO_O.pham!=='Toàn PGD' && t.indexOf(boDau(CHO_O.pham))<0)
    ra.push('file có vẻ của <b>'+coChuHTML(dv[0])+'</b> nhưng anh chọn ô <b>'+coChuHTML(CHO_O.pham)+'</b>');
  var mo = (D.cauHinh.mauBaoCao||[]).find(function(x){
    return x.ma!==CHO_O.ma && (x.tuKhoa||[]).some(function(k){ return k && t.indexOf(boDau(k))>=0; }); });
  if(mo) ra.push('nội dung giống <b>'+coChuHTML(mo.ten)+'</b> nhưng anh chọn ô <b>'+coChuHTML(CHO_O.ten)+'</b>');
  return ra.length ? ('⚠ Kiểm lại: '+ra.join(' · ')) : '';
}
function apChoO(d, chu){
  if(CHO_O && Date.now()-CHO_O.luc > 180000) CHO_O = null;   /* quá 3 phút thì bỏ, tránh dính sang file sau */
  if(!CHO_O) return d;
  d.nhom = 'duLieu';
  d.ky = CHO_O.ky;
  d.maLoai = CHO_O.ma;
  d.tenLoai = CHO_O.ten;
  if(!d.phamVi) d.phamVi = CHO_O.pham;
  d.chac = true;
  var cb = canhBaoLech(d, chu);
  d.canCu = 'Anh chọn từ ô ma trận: '+kyVN(CHO_O.ky)+' · '+CHO_O.ten+' · '+CHO_O.pham;
  if(cb){ d.canhBao = cb; d.chac = false; }
  d.tenMoi = tenDuLieu(d, d.duoi);
  CHO_O = null;   /* dùng xong bỏ ngay, file kế tiếp khai bình thường */
  return d;
}
/* ==========================================================
   CHÉP SANG AI (3.25) — anh hay dán số liệu Excel vào cửa sổ AI
   Markdown là dạng AI đọc chuẩn nhất; kèm nút Nguyên bản để chắc chắn tuyệt đối.
   GIỮ NGUYÊN SỐ, không làm gọn — chỉ bỏ dòng/cột trống. Có kiểm đếm ô và cộng thử dòng tổng.
   ========================================================== */
function bangTuSheet(ws, XL){
  var a = XL.utils.sheet_to_json(ws, {header:1, raw:false, defval:''});
  /* bỏ dòng trống và cột trống, giữ nguyên mọi ô có chữ */
  a = a.filter(function(r){ return r.some(function(c){ return String(c).trim()!==''; }); });
  var soCot = Math.max.apply(null, a.map(function(r){ return r.length; }).concat([0]));
  var giu = [];
  for(var c=0;c<soCot;c++) if(a.some(function(r){ return String(r[c]===undefined?'':r[c]).trim()!==''; })) giu.push(c);
  return a.map(function(r){ return giu.map(function(c){ return String(r[c]===undefined?'':r[c]).trim(); }); });
}
function demO(b){ var n=0; b.forEach(function(r){ r.forEach(function(c){ if(c!=='') n++; }); }); return n; }
/* 3.74 (việc I): đọc được cả số kiểu Việt (1.234.567,5) và kiểu Anh (1,234,567.5 — bộ đọc Excel hay trả về kiểu này).
   Có cả chấm và phẩy → dấu đứng sau cùng là thập phân; chỉ một loại dấu mà lặp nhiều lần → ngăn nghìn;
   một dấu (chấm hoặc phẩy) + đúng 3 chữ số sau → ngăn nghìn (3,000 · 1.234); còn lại → thập phân (12,5 · 12.5) */
function soTu(x){
  var t = String(x||'').replace(/[^\d,.\-]/g,'');
  if(!t || !/\d/.test(t)) return null;
  var c = t.lastIndexOf(','), d = t.lastIndexOf('.');
  if(c>=0 && d>=0){
    if(c>d) t = t.replace(/\./g,'').replace(',', '.');
    else t = t.replace(/,/g,'');
  } else if(c>=0){
    t = (t.split(',').length>2 || /^-?\d{1,3},\d{3}$/.test(t)) ? t.replace(/,/g,'') : t.replace(',', '.');
  } else if(d>=0){
    if(t.split('.').length>2 || /^-?\d{1,3}\.\d{3}$/.test(t)) t = t.replace(/\./g,'');
  }
  var v = parseFloat(t); return isFinite(v) ? v : null;
}
/* cộng thử: dòng có chữ "tổng cộng" phải bằng tổng các dòng con của cùng cột */
function congThu(b){
  var iT = -1;
  b.forEach(function(r,i){ if(iT<0 && /tổng cộng|tong cong|cộng chung/i.test(r.join(' '))) iT = i; });
  if(iT<1) return {co:false};
  var lech = [], soCot = b[iT].length;
  for(var c=1;c<soCot;c++){
    var dich = soTu(b[iT][c]); if(dich===null) continue;
    var tong = 0, dem = 0;
    for(var r=1;r<iT;r++){ var v = soTu(b[r][c]); if(v!==null){ tong += v; dem++; } }
    if(!dem) continue;
    if(Math.abs(tong-dich) > Math.max(1, Math.abs(dich)*0.005)) lech.push('cột '+(c+1));
  }
  return {co:true, khop:!lech.length, lech:lech};
}
function sangMarkdown(b){
  if(!b.length) return '';
  var h = '| '+b[0].join(' | ')+' |\n|'+b[0].map(function(){ return '---'; }).join('|')+'|\n';
  return h + b.slice(1).map(function(r){ return '| '+r.join(' | ')+' |'; }).join('\n');
}
function sangNguyenBan(b){ return b.map(function(r){ return r.join('\t'); }).join('\n'); }
function uocToken(t){ return Math.round(t.length/3.2); }
function moChepAI(id){
  var m = timMuc(id) || (D.duLieu||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  if(!/\.(xlsx|xls|csv)$/i.test(m.tenMoi||m.tenCu||'')) return baoLoi('Chỉ chép được từ file Excel hoặc CSV.');
  dangLam('Đang đọc bảng…');
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; })))
  .then(function(){
    var XL = window.XLSX;
    if(!XL) throw new Error('Chưa tải được bộ đọc Excel — cần có mạng một lần');
    return docFile(m.id).then(function(bl){
      if(!bl) throw new Error('Chưa có bản sao file trong máy — mở file một lần rồi thử lại.');
      return bl.arrayBuffer();
    }).then(function(ab){
      var wb = XL.read(new Uint8Array(ab), {type:'array'});
      var ten = wb.SheetNames[0], b = bangTuSheet(wb.Sheets[ten], XL);
      hetLam(); veChepAI(m, b, wb.SheetNames.length);
    });
  }).catch(function(e){ hetLam(); baoLoi('Không đọc được bảng: '+(e&&e.message||e)); });
}
/* 3.74 (việc H — R4): dò dữ liệu khách trong bảng trước khi chép sang AI
   (cột họ tên / CCCD / điện thoại / địa chỉ, hoặc ô có số CCCD 12 số, CMND 9 số bắt đầu 0, số điện thoại 10 số) */
var KHACH_COT = [
  ['ten', /họ\s*(và)?\s*tên|tên\s*(khách|hộ|người)|chủ\s*hộ|người\s*vay|khách\s*hàng|ho\s*(va)?\s*ten|chu\s*ho|nguoi\s*vay/i],
  ['so', /cccd|cmnd|căn\s*cước|can\s*cuoc|chứng\s*minh|số\s*định\s*danh|định\s*danh|điện\s*thoại|dien\s*thoai|\bsđt\b|\bsdt\b|số\s*đt/i],
  ['dc', /địa\s*chỉ|dia\s*chi|nơi\s*ở|thường\s*trú/i]
];
var SO_KHACH = /(^|[^\d])0\d{9}(\d{2})?(?!\d)/;
function doKhach(b){
  var cot = {}, soO = 0, dauBang = -1;
  b.slice(0, 8).forEach(function(r, i){
    r.forEach(function(c, j){ KHACH_COT.forEach(function(k){ if(String(c).length<40 && k[1].test(c)){ cot[j] = k[0]; if(dauBang<0 || i<dauBang) dauBang = i; } }); });
  });
  b.forEach(function(r){ r.forEach(function(c){ if(SO_KHACH.test(String(c).replace(/[\s.]/g,''))) soO++; }); });
  var loai = {}; Object.keys(cot).forEach(function(j){ loai[cot[j]] = 1; });
  return {cot:cot, dau:dauBang, soO:soO, co: !!(Object.keys(cot).length || soO),
    ten: [loai.ten?'họ tên':'', loai.so||soO?'CCCD / số điện thoại':'', loai.dc?'địa chỉ':''].filter(Boolean).join(', ')};
}
/* che: họ tên → KH1, KH2…; CCCD / điện thoại → ***; địa chỉ → (đã che) — giữ nguyên mọi số liệu tiền */
function cheKhach(b, k){
  var stt = {}, n = 0;
  return b.map(function(r, i){ return r.map(function(c, j){
    if(c==='' || i<=k.dau) return c;
    var l = k.cot[j];
    if(/^(tổng|cộng|tong|cong)\b/i.test(String(c).trim())) return c;   /* dòng Tổng cộng */
    if((k.cot[j]==='ten' || k.cot[j]==='dc') && !/[A-Za-zÀ-ỹĐđ]/.test(c)) return c;   /* ô số trong cột tên / địa chỉ */
    if(l==='ten'){ var kh = boDau(c); if(!stt[kh]) stt[kh] = 'KH'+(++n); return stt[kh]; }
    if(l==='so') return '***';
    if(l==='dc') return '(đã che)';
    return String(c).replace(/0\d{9}(\d{2})?(?!\d)/g, '***');
  }); });
}
function veChepAI(m, b, soSheet){
  CHEP = {m:m, b:b, khach:doKhach(b)};
  var kh = CHEP.khach, kiem = congThu(b), md = boiCanh(m)+'\n\n'+sangMarkdown(kh.co ? cheKhach(b, kh) : b);
  moHop('<div class="hop-tit">Chép sang AI</div>'+
    '<div class="hop-phu">'+coChuHTML(m.tenMoi||m.tenCu||'')+' · '+b.length+' dòng · '+
      (b[0]||[]).length+' cột · '+demO(b)+' ô có số liệu'+(soSheet>1?' · lấy sheet đầu':'')+'</div>'+
    '<div class="ca-kiem '+(kiem.co ? (kiem.khop?'dat':'canh') : 'thuong')+'">'+
      (kiem.co ? (kiem.khop ? '✓ Đã cộng thử: các cột khớp dòng Tổng cộng'
                            : '⚠ Cộng thử lệch ở '+kiem.lech.join(', ')+' — kiểm lại file gốc trước khi dùng')
               : 'Không thấy dòng Tổng cộng để cộng thử — số liệu chép nguyên, không sửa gì')+'</div>'+
    (kh.co ? '<div class="ca-kiem canh ca-khach">⚠ Bảng có <b>dữ liệu khách</b> ('+kh.ten+(kh.soO?' · '+kh.soO+' ô có số CCCD / điện thoại':'')+'). '+
      'Chỉ dán vào công cụ AI được phép dùng dữ liệu khách hàng. '+
      '<label class="ca-che"><input type="checkbox" id="ca-che" checked onchange="xemChepAI()"> Che dữ liệu khách khi chép (họ tên → KH1, KH2…; CCCD, điện thoại → ***; số liệu tiền giữ nguyên)</label></div>' : '')+
    '<div class="o"><label>Xem trước (Markdown) · ước '+uocToken(md)+' token</label>'+
      '<textarea id="ca-xem" rows="9" readonly>'+coChuHTML(md)+'</textarea></div>'+
    '<div class="huong-dan">Số giữ nguyên như trong file, chỉ bỏ dòng và cột trống. Hai dòng đầu ghi bối cảnh để AI hiểu đang đọc gì.</div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
    '<button class="nho" onclick="chepAI(\'thuong\')">Chép nguyên bản</button>'+
    '<button class="nho chinh" onclick="chepAI(\'md\')">Chép Markdown</button></div>', true);
}
var CHEP = null;
function boiCanh(m){
  var mau = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===m.maLoai; });
  return (mau?mau.ten:(m.tenLoai||'Số liệu'))+' · '+(m.phamVi||'Toàn PGD')+' · '+(D.cauHinh.donvi||'PGD')+
    (m.ky?'\nSố liệu kỳ '+kyVN(m.ky):'')+(m.nsl?' (đến '+ngayVN(m.nsl)+')':'');
}
function bangChepAI(){
  var o = document.getElementById('ca-che');
  return (CHEP.khach && CHEP.khach.co && (!o || o.checked)) ? cheKhach(CHEP.b, CHEP.khach) : CHEP.b;
}
function xemChepAI(){
  var e = document.getElementById('ca-xem'); if(e && CHEP) e.value = boiCanh(CHEP.m)+'\n\n'+sangMarkdown(bangChepAI());
}
function chepAI(kieu){
  if(!CHEP) return;
  var b = bangChepAI(), che = b!==CHEP.b;
  var t = boiCanh(CHEP.m)+'\n\n'+(kieu==='md' ? sangMarkdown(b) : sangNguyenBan(b));
  chepChu(t, 'Đã chép '+(kieu==='md'?'dạng Markdown':'nguyên bản')+(che?' (đã che dữ liệu khách)':'')+' · '+b.length+' dòng · ước '+uocToken(t)+' token. Dán thẳng vào cửa sổ AI.');
  dongHop();
}
function veThang(){
  var kt = document.getElementById('kieu-th');
  var dt = document.getElementById('dau-th');
  if(dt) dt.innerHTML = veDauTab('duLieu', {kho:D.duLieu, 
    hamThem:"CHO_O=null;nutChinh()",   /* 3.34: qua nutChinh để nhớ TAB_TRUOC=2 → Excel vào Dữ liệu tháng */
    xem:[['ky','Theo kỳ'],['donvi','Theo đơn vị'],['cay','Dạng cây']], hamXem:'datKieuTh',   /* 3.151: kiểu xem vào ☰ ▾ */
    themPhu: D.duLieu.length?'<button onclick="ghepKy()">Ghép để xem</button>':''});
  var ds = locTheoThe('duLieu', locChuan('duLieu', loc(D.duLieu, tuKhoa))); BOT_DS.duLieu = ds;
  /* 3.27: hàng 2 của tab Tháng gộp đủ như các tab khác — kiểu xem + sắp xếp + khung xem + ổ G */
  var thanhXem = veThanhSap('duLieu', [['ky','Theo kỳ'],['donvi','Theo đơn vị'],['cay','Dạng cây']], kieuTh, 'datKieuTh', '<b>'+ds.length+'</b> file'+chuDemLoc('duLieu'));
  if(!ds.length){
    document.getElementById('tit-thang').textContent = 'Chưa có dữ liệu';
    document.getElementById('bang-thang').innerHTML = bangDoiChieuHTML()+
      '<div class="rong">Chưa có bộ dữ liệu nào.<br>Bấm ô <b>+</b> trong ma trận, hoặc <b>+ Thêm file</b> ở góc trên bên trái.</div>';
    return;
  }
  if(kieuTh!=='bang'){
    document.getElementById('tit-thang').textContent = '';   /* 3.74: số file nằm đầu hàng Sắp xếp */
    var than = (kieuTh==='donvi') ? nhomTheoDonVi(ds) : (kieuTh==='cay' ? cayDuLieu(ds) : nhomTheoThang(ds,'ky'));
    document.getElementById('bang-thang').innerHTML = bangDoiChieuHTML() + thanhXem + than;
    return;
  }
  var kys = {};
  ds.forEach(function(x){ if(x.ky) kys[x.ky]=1; });
  var dsKy = Object.keys(kys).sort();
  var hienKy = dsKy.slice(-6);

  var loai = [];
  (D.cauHinh.mauBaoCao||[]).forEach(function(m){ loai.push({ma:m.ma, ten:m.ten}); });
  var coKhac = ds.some(function(x){ return x.maLoai==='KHAC'; });
  if(coKhac) loai.push({ma:'KHAC', ten:'Khác — chưa phân loại'});

  var h = '<div class="cuon"><table><thead><tr><th>Báo cáo</th>'+
    hienKy.map(function(k){ return '<th>'+kyVN(k)+'</th>'; }).join('')+'</tr></thead><tbody>';
  loai.forEach(function(l){
    h += '<tr><td>'+coChuHTML(l.ten)+'</td>';
    hienKy.forEach(function(k){
      var c = ds.filter(function(x){ return x.ky===k && x.maLoai===l.ma; });
      if(c.length===0) h += '<td class="trong">—</td>';
      else if(c.length===1) h += '<td class="co" onclick="moXem(\''+c[0].id+'\')">✓</td>';
      else h += '<td class="co" onclick="moXem(\''+c[0].id+'\')">'+c.length+'</td>';
    });
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  var kMoi = dsKy[dsKy.length-1];
  var thieu = kyThieu();
  h += '<div class="nhan-nhom">'+kyVN(kMoi)+' · '+
       ds.filter(function(x){return x.ky===kMoi;}).length+' file'+
       (thieu.length?' · thiếu '+thieu.join(', '):' · đủ bộ')+'</div>';
  document.getElementById('tit-thang').textContent =
    'Năm '+(kMoi||'').slice(0,4)+' · kéo ngang xem kỳ cũ';
  document.getElementById('bang-thang').innerHTML = bangDoiChieuHTML() + thanhXem + h;
  nhacKhac();
}
function nhacKhac(){
  var k = D.duLieu.filter(function(x){ return x.maLoai==='KHAC'; });
  if(k.length>=5 && !D.cauHinh.taNhacKhac){
    bao('Mục Khác đã có '+k.length+' file. Vào Cài đặt để khai thành loại chính thức.', 5);
    D.cauHinh.taNhacKhac = true; luu();
  }
}

/* ----- ngăn 3: GHI CHÚ ----- */
/* 3.43 (anh duyệt phương án a): tab Ghi chú đổi thành THƯ VIỆN — 2 phần Ghi chú · Bảo trì kho.
   Kho là thư viện dữ liệu, bảo trì chuẩn hóa làm thường xuyên nên để ngoài, không giấu trong Cài đặt (Cài đặt vẫn còn lối vào). */
/* 3.51 (anh chốt): Thư viện = 📁 Bộ hồ sơ (ghi chú tự do + gom file liên quan theo từng vụ việc) · 🖼 Ghi chú ảnh.
   Bảo trì kho đã gộp vào 🧰 Dọn kho (nút trên thanh trên cùng). */
function tvPhan(){ return D.cauHinh.tvPhan==='gc' ? 'gc' : (D.cauHinh.tvPhan==='no' ? 'no' : 'bo'); }
function datTvPhan(k){ D.cauHinh.tvPhan = k; BO.mo = ''; luu(); veGhiChu(); }
function thanhTV(){
  var p = tvPhan();
  return '<div class="tv-chon">'+
    '<button class="'+(p==='bo'?'bat':'')+'" onclick="datTvPhan(\'bo\')">📁 Bộ hồ sơ <small>'+(D.boHS||[]).length+'</small></button>'+
    '<button class="'+(p==='gc'?'bat':'')+'" onclick="datTvPhan(\'gc\')">🖼 Ghi chú ảnh <small>'+D.ghiChu.length+'</small></button>'+
    '<button class="'+(p==='no'?'bat':'')+'" onclick="TDN.mo=\'\';datTvPhan(\'no\')">⚠ Theo dõi nợ <small>'+(NO_SAN?Object.keys(NO.mon).length:'')+'</small></button>'+
    '<button class="nho nut-hd" onclick="moHuongDan(\'ghiChu\')" title="Hướng dẫn">❓</button></div>';
}
