/* ===== 3.399 (anh 28/10: "theo dõi nợ tạm thời bỏ, xóa code rác, sẽ phát triển sau cho gọn" · "gỡ luôn cho gọn code"): GỠ ⚠ Theo dõi nợ (3.64) — thẻ món, hồ sơ hộ,
   lần làm việc, biên bản làm việc, phiếu thông tin món vay, in danh sách, nhắc Hôm nay, gợi ý tên có dấu ở Scan. File này (trước: js/04e-theo-doi-no.js) chỉ còn
   PHẦN DÙNG CHUNG của app giữ nguyên tên / nội dung: danh mục Hội (TDN_DVUT) · mã chương trình (TDN_CT, CT_APP_MA) · tiện ích tiền / ngày / cuối kỳ (tdn*) ·
   bỏ dấu tên · xmlEsc · giaoFile · tab Thư viện (veGhiChu: Bộ hồ sơ · Ghi chú ảnh) · dải đáy · tìm mục · nút chính.
   Dữ liệu Theo dõi nợ cũ KHÔNG xóa: IndexedDB khóa "tdn_du_lieu" + Drive _Hệ thống/theodoino.json vẫn còn — làm lại sau đọc được. ===== */
var TDN_DVUT = {'11':'Hội Nông dân','12':'Hội Phụ nữ','13':'Hội Cựu chiến binh','14':'Đoàn Thanh niên'};
/* 3.71: đủ danh mục mã chương trình theo hệ thống (MACT · TENVT · TENCT) — nguồn: Danh mục chương trình vay (xls) anh gửi */
var TDN_CT = {'01':['HONGHEO','Cho vay ưu đãi hộ nghèo'],'02':['HSSV','Cho vay học sinh, sinh viên có hoàn cảnh khó khăn'],
  '03':['GQVL','Cho vay giải quyết việc làm'],'04':['XKLD','Cho vay ĐTCS đi lao động có thời hạn ở nước ngoài'],
  '05':['NVLSCL','Cho vay trả chậm nhà ở cho hộ dân ĐB sông Cửu Long và Tây Nguyên'],'06':['NSVSMT','Cho vay nước sạch và vệ sinh môi trường nông thôn'],
  '07':['HN_QD167','Cho vay hộ nghèo về nhà ở'],'08':['KFW','Cho vay doanh nghiệp vừa và nhỏ (KFW)'],'09':['MOI_TNGHEO','Cho vay hộ mới thoát nghèo theo QĐ 28'],
  '10':['HSXVKK','Cho vay hộ gia đình SXKD tại vùng khó khăn'],'11':['DTTS_DBKK','Cho vay hộ dân tộc thiểu số đặc biệt khó khăn theo QĐ 32, QĐ 54'],
  '12':['CVNHA100','Cho vay nhà ở xã hội theo Nghị định số 100'],'13':['SDLDCN','Cho vay hộ, cơ sở SX sử dụng lao động sau cai nghiện ma túy'],
  '14':['DTTSNSCL','Cho vay hộ dân tộc thiểu số nghèo ĐB sông Cửu Long theo QĐ 74, QĐ 29'],'15':['T.NHAN_VKK','Cho vay thương nhân vùng khó khăn'],
  '16':['XKLD_QD71','Cho vay người lao động thuộc huyện nghèo đi XKLĐ'],'17':['DTTSQD1592','Cho vay hộ đồng bào DTTS nghèo, đời sống khó khăn theo QĐ 755'],
  '18':['HNXDCHOI','Cho vay hộ nghèo xây dựng chòi tránh lũ, lụt theo QĐ 716, QĐ 48'],'19':['HCN_QD15','Cho vay hộ cận nghèo theo QĐ 15'],
  '20':['CVPTTRCN','Cho vay trồng rừng sản xuất, phát triển chăn nuôi theo Nghị định số 75'],'21':['DTTS_2085','Cho vay hộ Dân tộc thiểu số QĐ 2085/2016'],
  '22':['CV_TNXP','Cho vay đối với thanh niên xung phong'],'23':['NSDLDTLNVNLD','Cho vay người sử dụng lao động để trả lương ngừng việc đối với người lao động do Covid-19'],
  '24':['CVCSGDMNTHNCL','Cho vay cơ sở giáo dục mầm non, tiểu học ngoài công lập'],'25':['CVDTTSMN','Cho vay vùng dân tộc thiểu số và miền núi'],
  '26':['NCHXAPT','Cho vay người chấp hành xong án phạt tù'],'91':['DAPTLNWB','Cho vay theo chương trình dự án phát triển Lâm nghiệp (WB)'],
  '92':['IFAD','Cho vay theo dự án IFAD'],'93':['RIDP','Cho vay theo dự án RIDP'],'94':['CWPD','Cho vay theo dự án CWDP'],
  '96':['NIPPON','Cho vay theo dự án NIPPON'],'99':['KHAC','Cho vay khác']};
/* viết tắt dùng trong app (phân loại văn bản, biểu mẫu) ↔ mã chương trình hệ thống — giữ viết tắt cũ để không đổi dữ liệu đã lưu */
var CT_APP_MA = {'HN':'01','HCN':'19','HMTN':'09','NS&VSMT':'06','GQVL':'03','HSSV':'02','NO-HN':'07','NOXH':'12','SXKD-VKK':'10','XKLĐ':'04','NCHXAPT':'26'};
function ctMaCua(vt){ return CT_APP_MA[vt] || ''; }
function ctVTAppCua(ma){ for(var k in CT_APP_MA) if(CT_APP_MA[k]===ma) return k; return ''; }
/* 8 mục hồ sơ hộ vay (3.66 thêm Khả năng thu hồi) — mỗi mục: chọn nhanh (chip) + các ô + ghi thêm; lưu ngày cập nhật + lịch sử */

/* ---------- tiện ích ---------- */
var TDN_MD = false;   /* 3.135: file đang đọc ghi ngày chữ kiểu tháng/ngày/năm (Mỹ) — slDocFile tự nhận rồi bật trong lúc đọc */
function tdnNgay(v){   /* ô ngày Excel: dd/mm/yyyy (hoặc mm/dd/yyyy khi TDN_MD) hoặc số serial → yyyy-mm-dd */
  if(v===''||v==null) return '';
  if(typeof v==='number' && v>20000 && v<80000){ var d = new Date(Math.round((v-25569)*864e5)); return d.getUTCFullYear()+'-'+hai(d.getUTCMonth()+1)+'-'+hai(d.getUTCDate()); }
  var m = String(v).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/); if(m) return TDN_MD ? m[3]+'-'+hai(+m[1])+'-'+hai(+m[2]) : m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  m = String(v).trim().match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[0] : '';
}
function tdnTien(n){ return Math.round(n||0).toLocaleString('vi-VN').replace(/,/g,'.'); }
function tdnTr(n){ n = n||0; return n>=1e9 ? (n/1e9).toFixed(2).replace('.',',')+' tỷ' : (n>=1e6 ? (Math.round(n/1e5)/10).toString().replace('.',',')+' tr' : tdnTien(n)); }
function tdnCuoiKy(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7); return ky+'-'+hai(new Date(y, m, 0).getDate()); }
function tdnSoNgay(a, b){ if(!a||!b) return 0; return Math.round((Date.UTC(+b.slice(0,4),+b.slice(5,7)-1,+b.slice(8,10)) - Date.UTC(+a.slice(0,4),+a.slice(5,7)-1,+a.slice(8,10)))/864e5); }
function tdnHoi(dvut){ return TDN_DVUT[String(dvut||'').trim()] || (dvut ? 'ĐVUT '+dvut : ''); }
function tdnCT(m){ var c = TDN_CT[String(m.ct||'')]; return m.ctTen || (c ? c[0] : (m.ct||'')); }

function boDauTen(t){ return boDau(t||'').replace(/[^a-z0-9 ]/gi,'').replace(/\s+/g,' ').trim().replace(/\b\w/g, function(c){ return c.toUpperCase(); }); }
function xmlEsc(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function giaoFile(bl, ten){
  var f = new File([bl], ten, {type:bl.type});
  if(!laMayBan() && navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
  var a = document.createElement('a'), u = URL.createObjectURL(bl); a.href = u; a.download = ten; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(u); }, 5000);
}

function veGhiChu(){
  if(tvPhan()==='bo'){
    document.getElementById('loc-gc').innerHTML = thanhTV();
    document.getElementById('ds-gc').innerHTML = veBoHS();
    return;
  }
  document.getElementById('loc-gc').innerHTML = thanhTV() +
    veDauTab('ghiChu', {kho:D.ghiChu, nhanThem:'Chụp / thêm ghi chú',
                        hamThem:'chonAnh()'});
  var ds = locTheoThe('ghiChu', locChuan('ghiChu', loc(D.ghiChu, tuKhoa))); BOT_DS.ghiChu = ds;
  ds.sort(function(a,b){ return (b.ngay+b.id).localeCompare(a.ngay+a.id); });
  document.getElementById('loc-gc').innerHTML += veThanhSap('ghiChu', null, null, null, '<b>'+ds.length+'</b> ghi chú'+chuDemLoc('ghiChu'));   /* 3.27: hàng 2 như các tab khác · 3.74: kèm số */

  if(!ds.length){
    document.getElementById('ds-gc').innerHTML =
      '<div class="rong">'+(D.ghiChu.length?'Không có ghi chú nào khớp.'
       :'Chưa có ghi chú nào.<br>Bấm <b>+ Thêm file</b> ở góc trên bên trái để chụp hoặc chọn ảnh.')+'</div>';
    return;
  }
  var h = '', ngayTruoc = '';
  ds.forEach(function(m){
    if(m.ngay!==ngayTruoc){
      if(ngayTruoc) h += '</div>';
      var dem = ds.filter(function(x){ return x.ngay===m.ngay; }).length;
      var nhan = m.ngay===ngayISO(nay()) ? 'Hôm nay' : ngayVN(m.ngay);
      h += '<div class="moc"><span class="cham"></span><span class="ngay">'+nhan+
           '</span><span class="p">'+dem+' ảnh</span></div><div class="doc">';
      ngayTruoc = m.ngay;
    }
    h += anhHTML(m, tuKhoa);
  });
  h += '</div>';
  document.getElementById('ds-gc').innerHTML = h;
  ds.forEach(function(m){ napAnh(m.id); });
}

function anhHTML(m, q){
  var gan = '';
  if(m.gocVB){
    var g = timMuc(m.gocVB);
    if(g) gan = ' <span class="mini ct">gắn vào '+coChuHTML(g.soHieu||'văn bản')+'</span>';
  }
  return '<div class="anh"'+botAt(m.id)+' onclick="moXem(\''+m.id+'\')">'+
    '<img id="anh-'+m.id+'" alt="">'+
    '<div class="duoi"><div class="mo-ta">'+toSang(m.moTa||'(chưa ghi chú)', q)+'</div>'+
    (m.the||[]).map(function(t){ return '<span class="mini">'+coChuHTML(t)+'</span>'; }).join(' ')+
    gan+'</div></div>';
}
function napAnh(id){
  var e = document.getElementById('anh-'+id);
  if(!e || e.dataset.xong) return;
  docFile(id).then(function(b){
    if(b && e){ anhTam(e, b); e.dataset.xong='1'; }   /* 3.352: trả bộ nhớ ảnh tạm khi ảnh hiện xong */
  }).catch(function(){});
}

/* vuốt trái hiện Gửi, vuốt phải hiện Sửa */
function ganVuot(){
  var ds = document.querySelectorAll('.vuot-bao');
  for(var i=0;i<ds.length;i++){
    (function(bao){
      if(bao.dataset.gan) return; bao.dataset.gan='1';
      var the = bao.querySelector('.the-vb');
      var x0=0, dx=0, keo=false;
      bao.addEventListener('touchstart', function(e){
        x0 = e.touches[0].clientX; dx = 0; keo = true;
      }, {passive:true});
      bao.addEventListener('touchmove', function(e){
        if(!keo) return;
        dx = e.touches[0].clientX - x0;
        if(Math.abs(dx)>10) the.style.transform = 'translateX('+Math.max(-96,Math.min(96,dx))+'px)';
      }, {passive:true});
      bao.addEventListener('touchend', function(){
        keo = false;
        if(dx < -50) the.style.transform = 'translateX(-96px)';
        else if(dx > 50) the.style.transform = 'translateX(96px)';
        else the.style.transform = '';
      });
      the.addEventListener('click', function(e){
        if(the.style.transform){ e.stopPropagation(); the.style.transform=''; }
      }, true);
    })(ds[i]);
  }
}

function timMuc(id){
  var a = D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]);
  for(var i=0;i<a.length;i++) if(a[i].id===id) return a[i];
  return null;
}

/* ----- dải đáy ----- */
var CUON_TRUOC = 0;
function anDayKhiCuon(){
  var d = document.querySelector('.day'); if(!d) return;
  var y = window.scrollY || document.documentElement.scrollTop || 0;
  d.classList.toggle('an-di', y > CUON_TRUOC + 8 && y > 80);
  CUON_TRUOC = y;
}
function veDay(){
  capNhatDemRac();
  /* 3.39: khung xem cố định; chưa chọn mục thì 3 nút Gửi · In · Sửa mờ đi, không bấm nhầm */
  var cpx = document.getElementById('cotphai'); if(cpx) cpx.classList.toggle('pv-trong', !mucDangXem);
  var s = document.getElementById('so-lieu');
  /* 3.53 (anh chốt): thanh đáy chỉ còn thông báo HỆ THỐNG, một dòng: Drive · chưa lên Drive · lỗi đẩy · bộ nhớ máy */
  var chip = '<span class="chip" id="chip-drive" onclick="bamChip()">● Trong máy</span>'+
    '<span class="chip vang an" id="chip-chua" onclick="bamChipChua()"></span>'+
    '<span class="chip do an" id="chip-loi" onclick="moHangDoiDrive()"></span>'+
    '<span class="chip" id="chip-bn" onclick="moBoNho()">💾 …</span>';
  var btnPV = document.getElementById('btn-mo-preview');
  if(btnPV) btnPV.style.display = (anPV && nganHienTai!==0) ? '' : 'none';
  if(typeof dhDay==='function') dhDay();
  var t = ['<b>'+(D.cho.length||0)+'</b> việc chờ'+chip,
           '<b>'+D.vanBan.length+'</b> văn bản<br>'+chip,
           '<b>'+D.duLieu.length+'</b> file dữ liệu<br>'+chip,
           '<b>'+D.ghiChu.length+'</b> ghi chú<br>'+chip,
           ('<b>'+(D.scan||[]).length+'</b> bản quét<br>'+chip),
           ('<b>'+(D.bieuMau||[]).length+'</b> biểu mẫu<br>'+chip),
           '<b>'+D.cho.length+'</b> file chờ duyệt<br>'+chip];
  /* số đếm từng tab chuyển lên dòng nút "+ Thêm file" của tab đó (capNhatDemTab); khay chờ duyệt (6) giữ số ở đây */
  s.innerHTML = nganHienTai===6 ? t[6].replace('<br>', ' ') : chip;
  capNhatDemTab();
  if(nganHienTai===0) setTimeout(canCaoSo, 0);

  setTimeout(capNhatChip, 0);
  /* 3.23: mỗi tab có nút "+ Thêm file" ở góc trên trái (kiêm vùng kéo thả) → bỏ nút dải đáy */
  var nc = document.getElementById('nut-chinh');
  nc.textContent = (nganHienTai===6) ? 'Chọn file' : 'Thêm file';
  nc.style.display = (nganHienTai===6) ? '' : 'none';
  var ph = document.getElementById('nut-phu-cho');
  if(nganHienTai===6 && D.cho.length)
    ph.innerHTML = '<button class="nut-phu" onclick="moDanAI()">Dán từ AI</button>'+
                   '<button class="nut-phu" onclick="duyetTatCa()">Duyệt tất cả</button>'+
                   '<button class="nut-phu" onclick="dongKhai()" title="Về tab trước (phím Esc)">✕ Đóng</button>';
  else if(nganHienTai===6 && coTheNoiDrive())
    ph.innerHTML = '<button class="nut-phu" onclick="napKhayCho()">Nạp khay chờ</button>';
  else ph.innerHTML = '';
}
/* ghép toàn bộ PDF của một kỳ thành 1 bản tạm để đọc liền mạch */
function ghepKy(){
  var kys = {};
  D.duLieu.forEach(function(x){ if(x.ky) kys[x.ky]=1; });
  var ds = Object.keys(kys).sort().reverse();
  if(!ds.length) return bao('Chưa có dữ liệu kỳ nào.', 3);
  moHop('<div class="hop-tit">Ghép cả bộ để xem</div>'+
    '<div class="hop-phu">App tạo một bản PDF tạm gộp các báo cáo trong kỳ để anh đọc liền mạch. '+
    'File gốc trên Drive giữ nguyên, không bị đụng tới.</div>'+
    '<div class="o"><label>Chọn kỳ</label><select id="gk-ky">'+
      ds.map(function(k){
        var n = D.duLieu.filter(function(x){ return x.ky===k; }).length;
        return '<option value="'+k+'">'+kyVN(k)+' — '+n+' file</option>';
      }).join('')+'</select></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
    '<button class="nho chinh" onclick="lamGhep()">Ghép</button></div>');
}
function lamGhep(){
  var ky = gt('gk-ky'); dongHop();
  if(!window.PDFLib) return baoLoi('Chưa tải được bộ ghép PDF. Kiểm tra mạng rồi thử lại.');
  var ds = D.duLieu.filter(function(x){ return x.ky===ky && /\.pdf$/i.test(x.tenCu||''); });
  if(!ds.length) return bao('Kỳ này không có file PDF nào để ghép.', 4);
  ds.sort(function(a,b){ return (a.tenLoai||'').localeCompare(b.tenLoai||''); });
  bao('Đang ghép '+ds.length+' file…', 4);
  PDFLib.PDFDocument.create().then(function(moi){
    return ds.reduce(function(p, m){
      return p.then(function(){
        return layNoiDung(m).then(function(b){
          if(!b) return;
          return b.arrayBuffer().then(function(buf){
            return PDFLib.PDFDocument.load(buf).then(function(g){
              return moi.copyPages(g, g.getPageIndices()).then(function(tr){
                tr.forEach(function(t){ moi.addPage(t); });
              });
            });
          });
        }).catch(function(e){ console.warn('bỏ qua', m.tenCu, e); });
      });
    }, Promise.resolve()).then(function(){
      if(moi.getPageCount()===0) throw new Error('rong');
      return moi.save();
    });
  }).then(function(bytes){
    var ten = 'TuHoSo_'+ky+'_ca-bo.pdf';
    var bl = new Blob([bytes], {type:'application/pdf'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(bl); a.download = ten; a.click(); thuHoiSau(a.href);
    bao('Đã ghép xong bản tạm '+kyVN(ky)+'. Xem xong có thể xóa.', 5);
  }).catch(function(e){
    console.warn(e); baoLoi('Không ghép được — có thể vài file không phải PDF chữ.');
  });
}

/* 3.53: số đếm của tab — cùng dòng nút "+ Thêm file"; đang lọc thì "đang hiện / tổng" */
function capNhatDemTab(){
  var TEN = {vanBan:['văn bản', D.vanBan], duLieu:['file dữ liệu', D.duLieu], ghiChu:['ghi chú', D.ghiChu],
             scan:['bản quét', D.scan||[]], bieuMau:['biểu mẫu', D.bieuMau||[]]};
  Array.prototype.forEach.call(document.querySelectorAll('.dem-tab'), function(e){
    var tab = e.getAttribute('data-tab'), x = TEN[tab]; if(!x) return;
    var tong = x[1].length, hien = BOT_DS[tab] ? BOT_DS[tab].length : tong;
    e.innerHTML = (hien!==tong ? '<b>'+hien+'</b> / '+tong : '<b>'+tong+'</b>')+' '+x[0];
  });
}
function bamChipChua(){
  if(!coTheNoiDrive()) return moCaiDat('drive');
  if(DR.sanSang) return moHangDoiDrive();
  dongBoNgay();
}
function bamChip(){
  if(!DR.online) return bao('Đang mất mạng. Việc đang chờ sẽ tự gửi khi có mạng lại.', 4);
  if(!coTheNoiDrive()) return moCaiDat();
  if(DR.sanSang) return (scanCanDay().length + kaCanDay().length) ? moHangDoiDrive() : dongBoNgay();
  noiDrive();
}

function nutChinh(){
  if(nganHienTai===0) return doiNgan(1);   /* 3.28: tab Hôm nay là bàn làm việc — khai file ở tab Văn bản */
  if(nganHienTai!==6) TAB_TRUOC = nganHienTai;
  if(nganHienTai===3) return chonAnh();
  if(nganHienTai===4){ if(!HS.mo) return moHoSo(); return batDauScan(); }
  if(nganHienTai===5) return themBieuMau();
  var tu = TAB_KHO[nganHienTai] ? nganHienTai : null;
  doiNgan(6);
  THEM_TU = tu;   /* 3.40: nhớ tab vừa bấm Thêm file (sau doiNgan vì doiNgan xóa cờ) */
  document.getElementById('chon-file').click();
}
