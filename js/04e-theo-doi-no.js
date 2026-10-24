/* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 3881–5417 của bản 3.338), không đổi logic — ⚠ Theo dõi nợ (3.64) · 🏠 Hồ sơ hộ một trang (3.82) · 📝 Biên bản */
/* ==========================================================
   3.64 — ⚠ THEO DÕI NỢ (Thư viện): 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh (anh chốt 03/10/2026)
   Dữ liệu 3 lớp, KHÔNG BAO GIỜ XÓA khi cập nhật tháng:
     NO.ho[mãKH]   hồ sơ hộ vay (anh bổ sung: người vay & hộ, thừa kế, thực trạng, tài sản, sử dụng vốn, nguyên nhân, phương án)
                   + tài liệu (hồ sơ gốc, biên bản đã ký, ảnh) + vị trí nhà — dùng chung cho cả 3 danh sách
     NO.mon[sốKƯ]  món vay: số liệu TỪNG THÁNG của từng danh sách (mon.loai[khd|nqh|nk].ky['YYYY-MM'])
     NO.lan[]      lần làm việc (gắn hộ + món + loại) → biên bản Word theo mẫu, cam kết lên lịch Hôm nay
   Lưu IndexedDB (khóa 'tdn_du_lieu', không chiếm localStorage) · đồng bộ Drive _Hệ thống/theodoino.json (bản sửa sau thắng)
   Dữ liệu khách chỉ nằm trong máy + Drive của anh.
   ========================================================== */
var NO = {ho:{}, mon:{}, lan:[], lanXoa:[], nhap:{}, toAp:{}, suaLuc:''};
var NO_SAN = false;
var TDN = {loai:'nqh', xem:'ds', loc:'dang', tim:'', cay:null, mo:''};
var TDN_LOAI = {
  khd:{ten:'3 tháng KHD', ico:'⏳', dai:'Món vay 3 tháng trở lên không hoạt động'},
  nqh:{ten:'Nợ quá hạn',  ico:'🔴', dai:'Nợ quá hạn'},
  nk: {ten:'Nợ khoanh',   ico:'🔒', dai:'Nợ khoanh'}
};
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
var TDN_MUC = [
  {k:'nguoiVay', ten:'👤 Người vay & hộ', chon:['Bình thường','Ốm đau / tai nạn','Đã chết','Mất tích','Bỏ khỏi địa phương','Đi làm ăn xa','Đang chấp hành án'],
    o:[['sdt','SĐT liên hệ'],['thanhVien','Thành viên hộ / số lao động']]},
  {k:'thuaKe', ten:'👪 Thừa kế / người trả nợ thay', chon:['Đồng ý trả thay','Chưa đồng ý','Chưa xác định được người thừa kế'],
    o:[['hoTen','Họ tên'],['quanHe','Quan hệ với người vay'],['sdt','SĐT'],['noiO','Nơi ở'],['giayTo','Giấy tờ kèm (chứng tử, xác nhận UBND xã…)']]},
  {k:'thucTrang', ten:'🏠 Thực trạng kinh tế', chon:['Có khả năng trả nợ','Khó khăn tạm thời','Không có khả năng trả nợ','Hộ nghèo','Hộ cận nghèo','Ốm đau dài ngày'],
    o:[['nghe','Nghề / nguồn thu nhập chính'],['thuNhap','Thu nhập ước tính / tháng']]},
  {k:'taiSan', ten:'💰 Tài sản', chon:['Đất ở','Đất sản xuất','Nhà','Vật nuôi','Phương tiện','Không có tài sản đáng kể'],
    o:[['giaTri','Tổng giá trị ước tính']]},
  {k:'suDungVon', ten:'🐄 Tình hình sử dụng vốn', chon:['Đúng mục đích','Sai mục đích một phần','Sai mục đích toàn bộ','Vốn còn','Đã bán','Chết / mất','Hư hỏng'],
    o:[['mucDich','Mục đích vay (đối tượng đầu tư)'],['conLai','Giá trị còn lại']]},
  {k:'nguyenNhan', ten:'❓ Nguyên nhân không trả được nợ', chon:['Thiên tai','Dịch bệnh vật nuôi / cây trồng','Ốm đau, tai nạn','Người vay chết / mất tích','Giá cả, thị trường','Sử dụng vốn sai mục đích','Làm ăn thua lỗ','Chây ỳ','Bỏ khỏi địa phương'],
    o:[]},
  {k:'khaNang', ten:'⚖ Khả năng thu hồi', mot:true, chon:['Có khả năng thu hồi','Khó thu hồi','Không còn khả năng thu hồi'], o:[]},   /* 3.66 (AI): chọn 1 — bỏ chọn = chưa đánh giá */
  {k:'phuongAn', ten:'🧭 Phương án đề xuất', chon:['Đôn đốc thu hồi','Người thừa kế trả thay','Gia hạn / điều chỉnh kỳ hạn','Đề nghị khoanh','Đề nghị xử lý rủi ro','Phối hợp chính quyền, Hội đoàn thể'],
    o:[['han','Hạn thực hiện']]}
];
var TDN_HINH_THUC = ['Đến nhà khách hàng','Mời lên điểm giao dịch / UBND xã','Họp Tổ TK&VV','Điện thoại / Zalo','Cùng Hội đoàn thể'];
var TDN_TRANG_THAI = ['Chưa làm việc','Đang làm việc','KH cam kết trả','Đã thu một phần','Đã thu hồi hết','Đề nghị gia hạn / điều chỉnh kỳ hạn','Đề nghị khoanh','Đề nghị xử lý rủi ro','KH vắng mặt / bỏ địa phương'];

/* ---------- lưu / nạp ---------- */
function napNo(){
  return docFile('tdn_du_lieu').then(function(s){
    if(s){ try{ var j = typeof s==='string' ? JSON.parse(s) : null; if(j) NO = tdnChuan(j); }catch(e){ console.warn('Không đọc được dữ liệu Theo dõi nợ', e); } }
    NO_SAN = true;
    if(typeof nganHienTai!=='undefined' && nganHienTai===3 && tvPhan()==='no') veGhiChu();
    if(typeof nganHienTai!=='undefined' && nganHienTai===0 && tdnViecCan().n) veHomNay();
  }).catch(function(){ NO_SAN = true; });
}
function tdnChuan(j){
  return {ho:j.ho||{}, mon:j.mon||{}, lan:j.lan||[], lanXoa:j.lanXoa||[], nhap:j.nhap||{}, toAp:j.toAp||{}, suaLuc:j.suaLuc||''};
}
var NO_HEN = null;
function luuNo(){
  /* 3.81: chưa nạp xong dữ liệu nợ trong máy thì không ghi (tránh ghi đè bằng dữ liệu trống) — đợi nạp xong rồi lưu */
  if(typeof NO_SAN!=='undefined' && !NO_SAN){ setTimeout(luuNo, 600); return Promise.resolve(false); }
  NO.suaLuc = new Date().toISOString();
  var p = luuFile('tdn_du_lieu', JSON.stringify(NO));
  if(coTheNoiDrive() && DR.sanSang){ clearTimeout(NO_HEN); NO_HEN = setTimeout(dayNoLenDrive, 5000); }
  return p;
}
function dayNoLenDrive(){
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){
    return timFileTrong('theodoino.json', idTM).then(function(cu){
      if(cu && !Object.keys(NO.mon||{}).length && !Object.keys(NO.ho||{}).length){ console.warn('Chặn ghi Theo dõi nợ trống lên Drive'); return null; }   /* 3.81 */
      return ghiJSONLenDrive('theodoino.json', idTM, {xuatLuc:new Date().toISOString(), may:maMayCua(), no:NO}, cu);
    });
  }).then(function(){ dayFileNoCho(); }).catch(function(e){ console.warn('Không đẩy được Theo dõi nợ', e); });
}
/* gộp dữ liệu máy khác: hộ / món / lần làm việc — bản sửa sau thắng; lần đã xóa thì bỏ */
function gopNo(r){
  var doi = 0;
  ['ho','mon'].forEach(function(k){
    Object.keys(r[k]||{}).forEach(function(id){
      var a = NO[k][id], b = r[k][id];
      if(!a || (b.suaLuc||'') > (a.suaLuc||'')){
        if(k==='mon' && a){   /* số liệu tháng: gộp cả hai, không mất tháng nào */
          Object.keys(a.loai||{}).forEach(function(L){ b.loai = b.loai||{}; b.loai[L] = b.loai[L]||{ky:{}}; Object.keys(a.loai[L].ky||{}).forEach(function(ky){ if(!b.loai[L].ky[ky]) b.loai[L].ky[ky] = a.loai[L].ky[ky]; }); });
        }
        NO[k][id] = b; doi++;
      }
    });
  });
  var xoa = {}; NO.lanXoa.concat(r.lanXoa||[]).forEach(function(x){ if(!xoa[x.id] || x.luc>xoa[x.id]) xoa[x.id] = x.luc; });
  NO.lanXoa = Object.keys(xoa).map(function(k){ return {id:k, luc:xoa[k]}; });
  var theo = {}; NO.lan.forEach(function(l){ theo[l.id] = l; });
  (r.lan||[]).forEach(function(l){ var c = theo[l.id]; if(!c || (l.suaLuc||'') > (c.suaLuc||'')){ theo[l.id] = l; doi++; } });
  NO.lan = Object.keys(theo).map(function(k){ return theo[k]; }).filter(function(l){ return !(xoa[l.id] && xoa[l.id] >= (l.suaLuc||'')); });
  Object.keys(r.nhap||{}).forEach(function(L){ var a = NO.nhap[L], b = r.nhap[L]; if(!a || (b.ky||'') > (a.ky||'') || ((b.ky===a.ky) && (b.luc||'') > (a.luc||''))){ NO.nhap[L] = b; doi++; } });
  Object.keys(r.toAp||{}).forEach(function(t){ if(!NO.toAp[t]) NO.toAp[t] = r.toAp[t]; });
  return doi;
}
function taiNoTuDrive(){
  if(!coTheNoiDrive()) return Promise.resolve(0);
  var duong = D.cauHinh.thumuc+'/_Hệ thống';
  return baoDamDuong(duong).then(function(idTM){ return timFileTrong('theodoino.json', idTM); })
  .then(function(f){
    if(!f){ if(Object.keys(NO.mon).length) dayNoLenDrive(); return null; }
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media');
  }).then(function(r){
    if(!r || !r.no) return 0;
    var n = gopNo(tdnChuan(r.no));
    if(n){ luuFile('tdn_du_lieu', JSON.stringify(NO)); if(nganHienTai===3 && tvPhan()==='no') veGhiChu(); }
    dayNoLenDrive();
    return n;
  }).catch(function(e){ console.warn('Không tải được Theo dõi nợ', e); return 0; });
}

/* ---------- tiện ích ---------- */
function tdnSo(v){ var n = typeof v==='number' ? v : parseFloat(String(v||'').replace(/[^\d.\-]/g,'')); return isFinite(n) ? n : 0; }
var TDN_MD = false;   /* 3.135: file đang đọc ghi ngày chữ kiểu tháng/ngày/năm (Mỹ) — slDocFile tự nhận rồi bật trong lúc đọc */
function tdnNgay(v){   /* ô ngày Excel: dd/mm/yyyy (hoặc mm/dd/yyyy khi TDN_MD) hoặc số serial → yyyy-mm-dd */
  if(v===''||v==null) return '';
  if(typeof v==='number' && v>20000 && v<80000){ var d = new Date(Math.round((v-25569)*864e5)); return d.getUTCFullYear()+'-'+hai(d.getUTCMonth()+1)+'-'+hai(d.getUTCDate()); }
  var m = String(v).trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/); if(m) return TDN_MD ? m[3]+'-'+hai(+m[1])+'-'+hai(+m[2]) : m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  m = String(v).trim().match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[0] : '';
}
function tdnTien(n){ return Math.round(n||0).toLocaleString('vi-VN').replace(/,/g,'.'); }
function tdnTr(n){ n = n||0; return n>=1e9 ? (n/1e9).toFixed(2).replace('.',',')+' tỷ' : (n>=1e6 ? (Math.round(n/1e5)/10).toString().replace('.',',')+' tr' : tdnTien(n)); }
function tdnKyVN(ky){ return ky ? ky.slice(5,7)+'/'+ky.slice(0,4) : ''; }
function tdnCuoiKy(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7); return ky+'-'+hai(new Date(y, m, 0).getDate()); }
function tdnSoNgay(a, b){ if(!a||!b) return 0; return Math.round((Date.UTC(+b.slice(0,4),+b.slice(5,7)-1,+b.slice(8,10)) - Date.UTC(+a.slice(0,4),+a.slice(5,7)-1,+a.slice(8,10)))/864e5); }
function tdnHoi(dvut){ return TDN_DVUT[String(dvut||'').trim()] || (dvut ? 'ĐVUT '+dvut : ''); }
function tdnCT(m){ var c = TDN_CT[String(m.ct||'')]; return m.ctTen || (c ? c[0] : (m.ct||'')); }
function tdnCTDai(m){ var c = TDN_CT[String(m.ct||'')]; return m.ctDai || (c ? c[1] : tdnCT(m)); }
/* địa bàn theo mã (danh mục Cài đặt › Địa bàn) */
function tdnDiaBan(maXa, maDiem, maAp){
  var ra = {xa:'', diem:'', ap:''};
  (D.cauHinh.diaBan||[]).forEach(function(x){
    if(maXa && String(x.ma)===String(maXa)) ra.xa = x.xa;
    (x.diem||[]).forEach(function(z){
      if(maDiem && String(z.ma)===String(maDiem)){ ra.diem = z.ten; if(!ra.xa) ra.xa = x.xa; }
      (z.ap||[]).forEach(function(a){ if(maAp && String(a.ma)===String(maAp)){ ra.ap = a.ten; if(!ra.diem) ra.diem = z.ten; if(!ra.xa) ra.xa = x.xa; } });
    });
  });
  return ra;
}
function tdnDB(m){
  var h = NO.ho[m.maKH]||{}, maAp = m.maAp || NO.toAp[m.maTo] || h.maAp || '';
  var db = tdnDiaBan(m.maXa || (maAp ? String(maAp).slice(0,6) : ''), m.maDiem, maAp);
  return {xa:db.xa || m.tenXa || '(chưa rõ xã)', diem:db.diem || m.tenDiem || '(chưa rõ điểm)', ap:db.ap || (maAp ? 'Ấp '+maAp : 'Chưa rõ ấp'), maAp:maAp,
    to:m.toTen ? m.toTen : (m.maTo||''), maTo:m.maTo||''};
}
function tdnApCau(ap){ ap = String(ap||''); return /^(ấp|khu phố|kp|thôn|tổ)\b/i.test(ap) ? ap.charAt(0).toLowerCase()+ap.slice(1) : 'ấp '+ap; }
function tdnXaCau(xa){ return String(xa||'').replace(/^Phường /,'phường ').replace(/^Xã /,'xã '); }
function tdnKyMoi(L){ return (NO.nhap[L]||{}).ky || ''; }
function tdnSL(m, L, ky){ var x = m.loai && m.loai[L]; return x && x.ky ? x.ky[ky || tdnKyMoi(L)] : null; }
function tdnCacKy(m, L){ var x = m.loai && m.loai[L]; return x && x.ky ? Object.keys(x.ky).sort() : []; }
function tdnDangCo(m, L){ return !!tdnSL(m, L); }
function tdnSoChinh(L, s){ return !s ? 0 : L==='khd' ? s.dn : L==='nqh' ? s.qh : s.kh; }
/* phát sinh lại: số lần món quay lại danh sách sau khi đã ra khỏi */
function tdnPhatSinhLai(m, L){
  var ds = tdnCacKy(m, L), n = 0;
  for(var i=1;i<ds.length;i++){ if(tdnThangSau(ds[i-1])!==ds[i]) n++; }
  return n;
}
function tdnThangSau(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7)+1; if(m>12){ m = 1; y++; } return y+'-'+hai(m); }
function tdnThangTruoc(ky){ var y = +ky.slice(0,4), m = +ky.slice(5,7)-1; if(m<1){ m = 12; y--; } return y+'-'+hai(m); }
function tdnLanCua(kuoc, L){ return NO.lan.filter(function(l){ return l.kuoc===kuoc && (!L || l.loai===L); }).sort(function(a,b){ return (b.ngay||'').localeCompare(a.ngay||'') || (b.taoLuc||'').localeCompare(a.taoLuc||''); }); }
function tdnTrangThai(kuoc, L){ var l = tdnLanCua(kuoc, L)[0]; return l ? (l.trangThai||'Đang làm việc') : 'Chưa làm việc'; }

/* ---------- ĐỌC FILE SAO KÊ THÁNG ---------- */
var TDN_COT = {   /* tên cột trong file hệ thống → trường */
  maKH:['Mã khách hàng'], ten:['Tên khách hàng'], kuoc:['Số khế ước'], maTo:['Mã tổ'], toTen:['Tên tổ trưởng'],
  maAp:['Mã thôn/ấp','Thôn'], maDiem:['Mã điểm GDX','Mã điểm GD','Điểm GDXA'], tenDiem:['Tên điểm GDX','Tên điểm GD','Tên điểm GDXA'],
  maXa:['Mã xã'], tenXa:['Tên xã'], dvut:['ĐVUT'], ct:['Chương trình'], ctTen:['Chương trình VT'], ctDai:['Tên chương trình','Tên Chương trình'],
  ngayBC:['Ngày báo cáo'], ngayGDX:['Ngày GDXA'],
  /* 3T KHD */ dn:['Tổng dư nợ'], th:['Dư nợ trong hạn'], qhK:['Dư nợ quá hạn'], khK:['Dư nợ khoanh'], ngd:['Ngày giao dịch gần nhất'], lt:['Lãi tồn'], ldt:['Lãi đã thu'],
  nv:['Ngày giải ngân đầu tiên'], dk:['Ngày đăng ký khoản vay'], dh:['Ngày đến hạn gốc'], dhgh:['Ngày đến hạn GH'], dhgd:['Ngày đến hạn GDXA'], sp:['Mã sản phẩm'],
  /* quá hạn */ cqh:['Chuyển QH trong tháng'], ncq:['Ngày chuyển quá hạn'], tk105:['Số dư 105'],
  /* khoanh */ nhl:['Ngày hiệu lực'], nhh:['Ngày hết hạn khoanh'], nn:['Nguyên nhân']
};
function tdnDocFile(bl, tenFile){
  if(!window.XLSX) return Promise.reject(new Error('Chưa tải được bộ đọc Excel — có mạng một lần rồi thử lại.'));
  return bl.arrayBuffer().then(function(ab){
    var wb = XLSX.read(new Uint8Array(ab), {type:'array'});
    var ten = wb.SheetNames.slice().sort(function(a,b){ return (b==='BCQUERY')-(a==='BCQUERY'); });
    for(var s=0;s<ten.length;s++){
      var a = XLSX.utils.sheet_to_json(wb.Sheets[ten[s]], {header:1, defval:'', raw:true});
      for(var r=0;r<Math.min(25, a.length);r++){
        var dong = a[r].map(function(x){ return String(x).trim(); });
        if(dong.indexOf('Số khế ước')>=0 && (dong.indexOf('Mã khách hàng')>=0 || dong.indexOf('Tên khách hàng')>=0)) return tdnPhanTich(a, r, tenFile, a.slice(0, r).map(function(x){ return x.join(' '); }).join(' '));
      }
    }
    throw new Error('Không thấy bảng có cột "Số khế ước" — file này không phải sao kê 3 tháng KHD / nợ quá hạn / nợ khoanh.');
  });
}
function tdnPhanTich(a, r, tenFile, tieuDe){
  var dau = a[r].map(function(x){ return String(x).trim(); }), cot = {};
  Object.keys(TDN_COT).forEach(function(k){ for(var i=0;i<TDN_COT[k].length;i++){ var j = dau.indexOf(TDN_COT[k][i]); if(j>=0){ cot[k] = j; break; } } });
  var co = function(t){ return dau.indexOf(t)>=0; };
  var loai = (co('Dư nợ khoanh') && co('Ngày hết hạn khoanh')) ? 'nk'
    : (co('Ngày chuyển quá hạn') || co('Chuyển QH trong tháng')) ? 'nqh'
    : (co('Ngày giao dịch gần nhất') && co('Tổng dư nợ')) ? 'khd' : '';
  if(!loai) throw new Error('Không nhận ra loại danh sách (cần cột của sao kê 3 tháng KHD, nợ quá hạn hoặc nợ khoanh).');
  if(loai==='khd'){ cot.qh = cot.qhK; cot.kh = cot.khK; }
  if(loai==='nqh'){ cot.qh = dau.indexOf('Dư nợ quá hạn'); }
  if(loai==='nk'){ cot.kh = dau.indexOf('Dư nợ khoanh'); }
  var g = function(row, k){ return cot[k]===undefined || cot[k]<0 ? '' : row[cot[k]]; };
  var ds = [], ky = '';
  a.slice(r+1).forEach(function(row){
    var kuoc = String(g(row,'kuoc')||'').trim(); if(!/^\d{6,}$/.test(kuoc)) return;
    var x = {kuoc:kuoc, maKH:String(g(row,'maKH')||'').trim(), ten:String(g(row,'ten')||'').trim(), maTo:String(g(row,'maTo')||'').trim(), toTen:String(g(row,'toTen')||'').trim(),
      maAp:String(g(row,'maAp')||'').trim(), maDiem:String(g(row,'maDiem')||'').trim(), tenDiem:String(g(row,'tenDiem')||'').trim(),
      maXa:String(g(row,'maXa')||'').trim(), tenXa:String(g(row,'tenXa')||'').trim(), dvut:String(g(row,'dvut')||'').trim(),
      ct:String(g(row,'ct')||'').trim(), ctTen:String(g(row,'ctTen')||'').trim(), ctDai:String(g(row,'ctDai')||'').trim()};
    var s = {};
    if(loai==='khd'){ s.dn = tdnSo(g(row,'dn')); s.th = tdnSo(g(row,'th')); s.qh = tdnSo(g(row,'qh')); s.kh = tdnSo(g(row,'kh')); s.ngd = tdnNgay(g(row,'ngd')); s.lt = tdnSo(g(row,'lt')); s.ldt = tdnSo(g(row,'ldt'));
      s.nv = tdnNgay(g(row,'nv')); s.dk = tdnNgay(g(row,'dk')); s.dh = tdnNgay(g(row,'dh')); s.dhgh = tdnNgay(g(row,'dhgh')); s.dhgd = tdnNgay(g(row,'dhgd')); s.sp = String(g(row,'sp')||''); }
    if(loai==='nqh'){ s.qh = tdnSo(g(row,'qh')); s.cqh = tdnSo(g(row,'cqh')); s.ncq = tdnNgay(g(row,'ncq')); s.tk105 = tdnSo(g(row,'tk105')); var nb = tdnNgay(g(row,'ngayBC')); if(nb && nb.slice(0,7) > ky) ky = nb.slice(0,7); }
    if(loai==='nk'){ s.kh = tdnSo(g(row,'kh')); s.nhl = tdnNgay(g(row,'nhl')); s.nhh = tdnNgay(g(row,'nhh')); s.nn = String(g(row,'nn')||'').trim(); }
    x.s = s; ds.push(x);
  });
  if(!ky) ky = tdnKyTuChu(tenFile) || tdnKyTuChu(tieuDe);
  return {loai:loai, ky:ky, ds:ds, tenFile:tenFile||''};
}
/* kỳ từ tên file / tiêu đề: 2026-08-31 · 31-08-2026 · 31_08_2026 · "ĐẾN NGÀY 31/08/2026" */
function tdnKyTuChu(t){
  t = String(t||'');
  var m = t.match(/(20\d\d)[\-_.](\d{2})[\-_.](\d{2})/); if(m) return m[1]+'-'+m[2];
  m = t.match(/(\d{1,2})[\-_.\/](\d{1,2})[\-_.\/](20\d\d)/); if(m) return m[3]+'-'+hai(+m[2]);
  return '';
}
/* so với dữ liệu đang có → xem trước */
function tdnSoSanh(kq){
  var L = kq.loai, ky = kq.ky, truoc = tdnThangTruoc(ky), co = {}, ra = {moi:[], lai:[], tang:[], giam:[], giu:[], ra:[], tong:0};
  kq.ds.forEach(function(x){
    co[x.kuoc] = 1; ra.tong += tdnSoChinh(L, x.s);
    var m = NO.mon[x.kuoc], cacKy = m ? tdnCacKy(m, L) : [];
    if(!cacKy.length) return ra.moi.push(x);
    var truocDo = cacKy.filter(function(k){ return k<ky; });
    if(truocDo.length && truocDo[truocDo.length-1]!==truoc && !(m.loai[L].ky[ky])) return ra.lai.push(x);
    var cu = truocDo.length ? m.loai[L].ky[truocDo[truocDo.length-1]] : null, a = tdnSoChinh(L, cu), b = tdnSoChinh(L, x.s);
    if(!cu) ra.giu.push(x); else if(b>a) ra.tang.push(x); else if(b<a) ra.giam.push(x); else ra.giu.push(x);
  });
  /* món có ở tháng liền trước (hoặc đang có ở kỳ mới nhất) mà file này không có → ra khỏi DS */
  Object.keys(NO.mon).forEach(function(k){
    var m = NO.mon[k]; if(co[k]) return;
    if(tdnSL(m, L, truoc) || (ky===tdnKyMoi(L) && tdnSL(m, L, ky))) ra.ra.push(m);
  });
  return ra;
}
function tdnChonFile(){
  var tu = (D.duLieu||[]).filter(function(m){ return ['NQH','NK','3TKHD','SK_NQH','SK_NK'].indexOf(m.maLoai)>=0 && /\.(xlsx|xls|xlsm)$/i.test(m.tenMoi||m.tenCu||''); })
    .sort(function(a,b){ return (b.ky||'').localeCompare(a.ky||''); }).slice(0, 12);
  moHop('<div class="hop-tit">📥 Cập nhật danh sách tháng</div>'+
    '<div class="hop-phu">Chọn file sao kê xuất từ hệ thống (3 tháng KHD, nợ quá hạn hoặc nợ khoanh). App tự nhận loại và kỳ, cho anh <b>xem trước</b> rồi mới ghi. Món không còn trong danh sách <b>không bị xóa</b> — thông tin đã bổ sung giữ nguyên.</div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="tdnChonTuMay()">📂 Chọn file trên máy…</button></div>'+
    (tu.length ? '<div class="nhan-nhom" style="margin-top:10px">Hoặc file đã lưu ở tab Tháng</div>'+tu.map(function(m){
      return '<div class="dk-dong" style="cursor:pointer" onclick="tdnDocTuMuc(\''+m.id+'\')"><span>📊</span><div class="dk-ten"><b>'+coChuHTML(m.tenMoi||m.tenCu)+'</b><small>'+coChuHTML(kyVN(m.ky)||'')+' · '+coChuHTML(m.tenLoai||m.maLoai)+'</small></div></div>'; }).join('') : '')+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button></div>', true);
}
function tdnChonTuMay(){
  var i = document.createElement('input'); i.type = 'file'; i.accept = '.xlsx,.xls,.xlsm'; i.multiple = true;
  i.onchange = function(){ var fs = Array.prototype.slice.call(i.files); if(fs.length) tdnDocNhieu(fs.map(function(f){ return {b:f, ten:f.name}; })); };
  i.click();
}
function tdnDocTuMuc(id){
  var m = timMuc(id); if(!m) return;
  layNoiDung(m).then(function(b){ if(!b) return baoLoi('File này chưa có trong máy — nối Drive để tải về rồi thử lại.'); tdnDocNhieu([{b:b, ten:m.tenCu||m.tenMoi}]); });
}
var TDN_CHO = [];
function tdnDocNhieu(ds){
  bao('Đang đọc '+ds.length+' file…', 3);
  Promise.all(ds.map(function(x){ return tdnDocFile(x.b, x.ten).then(function(k){ return k; }, function(e){ return {loi:e.message||String(e), tenFile:x.ten}; }); }))
  .then(function(kq){ TDN_CHO = kq; tdnXemTruoc(); });
}
function tdnXemTruoc(){
  var loi = TDN_CHO.filter(function(k){ return k.loi; }), ok = TDN_CHO.filter(function(k){ return !k.loi; });
  var h = '<div class="hop-tit">📥 Xem trước khi cập nhật</div>';
  loi.forEach(function(k){ h += '<div class="hs-loi">⚠ '+coChuHTML(k.tenFile)+': '+coChuHTML(k.loi)+'</div>'; });
  ok.forEach(function(k, i){
    var T = TDN_LOAI[k.loai], ss = k.ky ? tdnSoSanh(k) : null, moi = tdnKyMoi(k.loai);
    h += '<div class="tdn-xt"><div class="tdn-xt-dau">'+T.ico+' <b>'+T.dai+'</b> · '+coChuHTML(k.tenFile)+'</div>'+
      '<div class="o" style="display:flex;gap:8px;align-items:center;margin:4px 0"><label style="margin:0">Kỳ (tháng)</label><input id="tdn-ky-'+i+'" value="'+(k.ky?tdnKyVN(k.ky):'')+'" placeholder="mm/yyyy" style="width:110px" onchange="tdnDoiKy('+i+',this.value)"></div>'+
      (!k.ky ? '<div class="hs-loi">⚠ Không đọc được kỳ trong file — gõ tháng (vd 08/2026).</div>' :
        (moi && k.ky<moi ? '<div class="hs-loi">⚠ File kỳ '+tdnKyVN(k.ky)+' cũ hơn kỳ đã nhập ('+tdnKyVN(moi)+') — chỉ bổ sung lịch sử, không đổi danh sách đang theo dõi.</div>' : '')+
        (moi && k.ky===moi ? '<div class="huong-dan">Kỳ '+tdnKyVN(k.ky)+' đã nhập trước đây — lần này <b>thay số liệu</b> của kỳ đó (không nhân đôi).</div>' : '')+
        '<div class="tdn-xt-so">'+k.ds.length+' món · '+tdnTr(ss.tong)+'</div>'+
        '<div class="tdn-xt-ds"><span class="tg ct">+ '+ss.moi.length+' món mới</span><span class="tg phu">↻ '+ss.lai.length+' phát sinh lại</span>'+
        '<span class="tg">↑ '+ss.tang.length+' tăng</span><span class="tg">↓ '+ss.giam.length+' giảm</span><span class="tg xam">= '+ss.giu.length+' giữ nguyên</span>'+
        '<span class="tg xam">⇥ '+ss.ra.length+' ra khỏi DS</span></div>')+'</div>';
  });
  h += '<div class="hang-nut" style="margin-top:12px"><button class="nho" data-lenh="hop.dong">Thôi (Esc)</button>'+
    (ok.length ? '<button class="nho chinh" onclick="tdnGhi()">✓ Cập nhật '+ok.length+' danh sách</button>' : '')+'</div>';
  moHop(h, true);
}
function tdnDoiKy(i, v){
  var m = String(v||'').match(/(\d{1,2})\s*[\/\-.]\s*(\d{4})/); var k = TDN_CHO.filter(function(x){ return !x.loi; })[i];
  if(!k) return; k.ky = m ? m[2]+'-'+hai(+m[1]) : ''; tdnXemTruoc();
}
function tdnGhi(){
  var ok = TDN_CHO.filter(function(k){ return !k.loi; });
  if(ok.some(function(k){ return !k.ky; })) return baoLoi('Còn file chưa có kỳ — gõ tháng rồi bấm lại.');
  var now = new Date().toISOString(), tong = 0;
  ok.forEach(function(k){
    var L = k.loai, co = {};
    k.ds.forEach(function(x){
      co[x.kuoc] = 1; tong++;
      var m = NO.mon[x.kuoc] || (NO.mon[x.kuoc] = {kuoc:x.kuoc, loai:{}, taoLuc:now});
      ['maKH','ten','maTo','toTen','maAp','maDiem','tenDiem','maXa','tenXa','dvut','ct','ctTen','ctDai'].forEach(function(f){ if(x[f]) m[f] = x[f]; });
      m.loai[L] = m.loai[L] || {ky:{}};
      m.loai[L].ky[k.ky] = x.s; m.suaLuc = now;
      if(x.maTo && x.maAp) NO.toAp[x.maTo] = x.maAp;
      var h = NO.ho[x.maKH] || (NO.ho[x.maKH] = {ma:x.maKH, tt:{}, ls:[], file:[], taoLuc:now});
      h.ten = x.ten || h.ten; if(x.maAp) h.maAp = x.maAp; h.suaLuc = h.suaLuc || now;
    });
    /* nhập lại cùng kỳ: món không còn trong file thì bỏ số liệu kỳ đó (file thay thế), thông tin khác giữ nguyên */
    Object.keys(NO.mon).forEach(function(kk){ var m = NO.mon[kk]; if(!co[kk] && m.loai[L] && m.loai[L].ky[k.ky]){ delete m.loai[L].ky[k.ky]; m.suaLuc = now; } });
    if(!NO.nhap[L] || k.ky >= NO.nhap[L].ky) NO.nhap[L] = {ky:k.ky, luc:now, ten:k.tenFile, so:k.ds.length};
    TDN.loai = L;
  });
  luuNo().then(function(){ dongHop(); TDN.mo = ''; veGhiChu(); bao('Đã cập nhật '+ok.length+' danh sách ('+tong+' món). Thông tin bổ sung, nhật ký giữ nguyên.', 6); });
}

/* ---------- GIAO DIỆN: danh sách + cây ---------- */
function tdnDSLoai(L){
  var ky = tdnKyMoi(L), q = boDau(TDN.tim||'').trim(), tu = q ? q.split(/\s+/) : [];
  return Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).filter(function(m){
    if(!(m.loai && m.loai[L] && Object.keys(m.loai[L].ky||{}).length)) return false;
    var dang = !!(ky && m.loai[L].ky[ky]);
    if(TDN.loc==='dang' && !dang) return false;
    if(TDN.loc==='ra' && dang) return false;
    if(tu.length){ var t = boDau([m.ten, m.maKH, m.kuoc, m.toTen, tdnDB(m).ap].join(' ')); if(!tu.every(function(w){ return t.indexOf(w)>=0; })) return false; }
    if(TDN.cay){ var db = tdnDB(m), C = TDN.cay;
      if(C.xa && db.xa!==C.xa) return false; if(C.diem && db.diem!==C.diem) return false; if(C.ap && db.ap!==C.ap) return false; if(C.to && db.maTo!==C.to) return false; }
    return true;
  });
}
function tdnNhom(L, ds){   /* nhóm + xếp theo nghiệp vụ từng loại */
  var ky = tdnKyMoi(L), cuoi = ky ? tdnCuoiKy(ky) : ngayISO(nay()), g = {};
  var them = function(k, m, khoa){ (g[k] = g[k]||[]).push([m, khoa]); };
  ds.forEach(function(m){
    var s = tdnSL(m, L);
    if(!s){ var cc = tdnCacKy(m, L); them('⇥ Đã ra khỏi danh sách', m, '-'+cc[cc.length-1]); return; }
    if(L==='khd'){ var th = s.ngd ? Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44) : 99;
      them(th>12 ? 'Không giao dịch trên 12 tháng' : th>6 ? 'Không giao dịch 6–12 tháng' : 'Không giao dịch 3–6 tháng', m, -th); }
    else if(L==='nqh'){ var nqh = s.ncq ? tdnSoNgay(s.ncq, cuoi) : 9999;
      them(s.cqh>0 ? '🆕 Mới phát sinh tháng này' : nqh>180 ? 'Quá hạn trên 6 tháng' : 'Quá hạn đến 6 tháng', m, -nqh); }
    else { var con = s.nhh ? tdnSoNgay(cuoi, s.nhh) : 9999;
      them(con<0 ? 'Đã quá thời hạn khoanh' : con<=183 ? '⏰ Sắp hết hạn khoanh (≤ 6 tháng)' : 'Còn thời hạn khoanh', m, con); }
  });
  var thu = L==='khd' ? ['Không giao dịch trên 12 tháng','Không giao dịch 6–12 tháng','Không giao dịch 3–6 tháng']
    : L==='nqh' ? ['🆕 Mới phát sinh tháng này','Quá hạn trên 6 tháng','Quá hạn đến 6 tháng'] : ['Đã quá thời hạn khoanh','⏰ Sắp hết hạn khoanh (≤ 6 tháng)','Còn thời hạn khoanh'];
  thu.push('⇥ Đã ra khỏi danh sách');
  return thu.filter(function(k){ return g[k]; }).map(function(k){ return {ten:k, ds:g[k].sort(function(a,b){ return a[1]<b[1]?-1:a[1]>b[1]?1:0; }).map(function(x){ return x[0]; })}; });
}
function tdnDongHTML(m, L){
  var s = tdnSL(m, L), db = tdnDB(m), ky = tdnKyMoi(L), cuoi = ky ? tdnCuoiKy(ky) : '', chip = [];
  var cc = tdnCacKy(m, L), sCuoi = s || m.loai[L].ky[cc[cc.length-1]];
  if(L==='khd' && s){ var th = s.ngd ? Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44) : 0; chip.push(['do', (s.ngd?th+' tháng không GD':'chưa có ngày GD')]);
    if(s.lt) chip.push(['', 'lãi tồn '+tdnTr(s.lt)]); var dh = s.dhgd||s.dh; if(dh && tdnSoNgay(cuoi, dh)<=92) chip.push(['vg', (tdnSoNgay(cuoi, dh)<0?'đã đến hạn ':'sắp đến hạn ')+ngayVN(dh)]); }
  if(L==='nqh' && s){ chip.push(['do', (s.cqh>0?'🆕 ':'')+'QH '+(s.ncq? tdnSoNgay(s.ncq, cuoi)+' ngày':'')]); if(s.tk105) chip.push(['', 'TK105 '+tdnTr(s.tk105)]); }
  if(L==='nk' && s){ var con = s.nhh ? tdnSoNgay(cuoi, s.nhh) : null; chip.push([con!=null && con<=183 ? 'vg' : '', 'hết hạn khoanh '+ngayVN(s.nhh)]); }
  if(!s) chip.push(['xam', 'ra khỏi DS từ '+tdnKyVN(tdnThangSau(cc[cc.length-1]))]);
  chip.push(['', tdnCT(m)]); if(m.dvut) chip.push(['', tdnHoi(m.dvut)]);
  var psl = tdnPhatSinhLai(m, L); if(psl) chip.push(['vg', '↻ phát sinh lại '+(psl>1?'lần '+(psl+1):'')]);
  if(s && cc.length>1){ var i = cc.indexOf(ky), tr = i>0 ? m.loai[L].ky[cc[i-1]] : null; if(tr && cc[i-1]===tdnThangTruoc(ky)){ var d = tdnSoChinh(L, s)-tdnSoChinh(L, tr); if(d) chip.push(['', (d>0?'↑ tăng ':'↓ giảm ')+tdnTr(Math.abs(d))]); } }
  var khac = ['khd','nqh','nk'].filter(function(x){ return x!==L && tdnDangCo(m, x); }); if(khac.length) chip.push(['', '↔ cũng trong DS '+khac.map(function(x){ return TDN_LOAI[x].ten; }).join(', ')]);
  var tt = tdnTrangThai(m.kuoc, L), l0 = tdnLanCua(m.kuoc, L)[0];
  var cho = l0 ? tdnSoNgay(l0.ngay, ngayISO(nay())) : null;
  chip.push([tt==='Chưa làm việc' ? 'vg' : 'xa', tt+(l0?' · '+ngayVN(l0.ngay):'')]);
  if(s && l0 && cho>30) chip.push(['vg', '⚠ '+cho+' ngày chưa làm việc']);
  return '<div class="d2 tdn-d'+(TDN.mo===m.kuoc?' chon':'')+'" onclick="tdnMo(\''+m.kuoc+'\')">'+
    '<div class="h1"><span class="ten">'+coChuHTML(m.ten||m.maKH)+'</span><span class="ty">'+coChuHTML(db.ap+' · Tổ '+(m.toTen||m.maTo))+'</span>'+
    '<span class="sc-ngay tdn-tien">'+tdnTien(tdnSoChinh(L, sCuoi))+'</span></div>'+
    '<div class="h2 sc-tt">'+chip.map(function(c){ return '<span class="tg '+(c[0]==='do'?'phu tdn-do':c[0]==='vg'?'phu':c[0]==='xa'?'ct':c[0])+'">'+coChuHTML(c[1])+'</span>'; }).join('')+'</div></div>';
}
function tdnCayHTML(L, ds){
  var cay = {}, C = TDN.cay||{};
  ds.forEach(function(m){ var db = tdnDB(m), v = tdnSoChinh(L, tdnSL(m, L));
    var x = cay[db.xa] = cay[db.xa]||{n:0,t:0,con:{}}; x.n++; x.t+=v;
    var d = x.con[db.diem] = x.con[db.diem]||{n:0,t:0,con:{}}; d.n++; d.t+=v;
    var a = d.con[db.ap] = d.con[db.ap]||{n:0,t:0,con:{}}; a.n++; a.t+=v;
    var t = a.con[db.maTo] = a.con[db.maTo]||{n:0,t:0,ten:m.toTen}; t.n++; t.t+=v; });
  var nut = function(nhan, loc, o, bat){ return '<span class="cay-nut'+(bat?' bat':'')+'" onclick="event.preventDefault();event.stopPropagation();TDN.cay='+coChuHTML(JSON.stringify(loc)).replace(/"/g,'&quot;')+';veGhiChu()">'+coChuHTML(nhan)+' <small>'+o.n+' · '+tdnTr(o.t)+'</small></span>'; };
  var h = '<div class="sc-cay">'+(TDN.cay ? '<div class="sc-loc-cay">Đang lọc: '+coChuHTML([C.xa,C.diem,C.ap,C.to?'Tổ '+C.to:''].filter(Boolean).join(' › '))+' <span class="xoa-loc" onclick="TDN.cay=null;veGhiChu()">bỏ lọc</span></div>' : '');
  Object.keys(cay).sort().forEach(function(xa){ var X = cay[xa];
    h += '<details'+(C.xa===xa?' open':'')+'><summary>'+nut('🏘 '+xa, {xa:xa}, X, C.xa===xa && !C.diem)+'</summary><div class="c2">';
    Object.keys(X.con).sort().forEach(function(dm){ var Dm = X.con[dm];
      h += '<details'+(C.diem===dm?' open':'')+'><summary>'+nut('📍 '+dm, {xa:xa, diem:dm}, Dm, C.diem===dm && !C.ap)+'</summary><div class="c3">';
      Object.keys(Dm.con).sort().forEach(function(ap){ var A = Dm.con[ap];
        h += '<details'+(C.ap===ap?' open':'')+'><summary>'+nut('🏠 '+ap, {xa:xa, diem:dm, ap:ap}, A, C.ap===ap && !C.to)+'</summary><div class="c4">'+
          Object.keys(A.con).sort().map(function(t){ return nut('👥 '+(A.con[t].ten||t), {xa:xa, diem:dm, ap:ap, to:t}, A.con[t], C.to===t); }).join('')+'</div></details>';
      });
      h += '</div></details>';
    });
    h += '</div></details>';
  });
  return h+'</div>';
}
function veTheoDoiNo(){
  if(!NO_SAN) return '<div class="rong">Đang mở dữ liệu Theo dõi nợ…</div>';
  if(TDN.mo && NO.mon[TDN.mo]) return tdnTheHTML(NO.mon[TDN.mo], TDN.loai);
  TDN.mo = '';
  var L = TDN.loai;
  var o = function(k){ var T = TDN_LOAI[k], ky = tdnKyMoi(k), dang = Object.keys(NO.mon).map(function(x){ return NO.mon[x]; }).filter(function(m){ return tdnDangCo(m, k); });
    var t = dang.reduce(function(a, m){ return a+tdnSoChinh(k, tdnSL(m, k)); }, 0), phu = '';
    if(k==='nqh') phu = dang.filter(function(m){ return tdnSL(m, k).cqh>0; }).length+' mới';
    if(k==='nk') phu = dang.filter(function(m){ var s = tdnSL(m, k); return s.nhh && tdnSoNgay(tdnCuoiKy(ky), s.nhh)<=183; }).length+' sắp hết hạn';
    if(k==='khd') phu = dang.filter(function(m){ var s = tdnSL(m, k); return !s.ngd || Math.floor(tdnSoNgay(s.ngd, tdnCuoiKy(ky))/30.44)>12; }).length+' trên 12 tháng';
    return '<button class="tdn-o'+(L===k?' bat':'')+' tdn-'+k+'" onclick="TDN.loai=\''+k+'\';TDN.cay=null;veGhiChu()"><b>'+T.ico+' '+T.ten+'</b>'+
      '<small>'+(ky ? dang.length+' món · '+tdnTr(t)+' · '+phu+' · kỳ '+tdnKyVN(ky) : 'chưa nhập danh sách')+'</small></button>'; };
  var ds = tdnDSLoai(L), h = '<div class="tdn-3">'+o('khd')+o('nqh')+o('nk')+'</div>';
  h += '<div class="tdn-thanh"><button class="nho chinh" onclick="tdnChonFile()">📥 Cập nhật tháng</button>'+
    '<span class="tdn-seg">'+[['dang','Đang có'],['ra','Đã ra khỏi DS'],['tat','Tất cả']].map(function(x){ return '<button class="'+(TDN.loc===x[0]?'bat':'')+'" onclick="TDN.loc=\''+x[0]+'\';veGhiChu()">'+x[1]+'</button>'; }).join('')+'</span>'+
    '<span class="tdn-seg">'+[['ds','☰ Danh sách'],['cay','🌳 Cây địa bàn']].map(function(x){ return '<button class="'+(TDN.xem===x[0]?'bat':'')+'" onclick="TDN.xem=\''+x[0]+'\';veGhiChu()">'+x[1]+'</button>'; }).join('')+'</span>'+
    (Object.keys(NO.nhap).length ? '<button class="nho" onclick="tdnInDS()" title="Danh sách chi tiết theo lọc đang xem · Tổng hợp theo xã, điểm GD — in hoặc xuất Excel">🖨 Danh sách</button>' : '')+
    (tdnKyMoi(L) && ds.length ? '<button class="nho" onclick="tdnPhieuNhanh()" title="In phiếu thông tin cho các món đang hiện (theo lọc, nhánh cây, ô tìm)">🧾 In phiếu ('+ds.length+')</button>' : '')+
    '<input class="tdn-tim" id="tdn-tim" value="'+coChuHTML(TDN.tim||'')+'" placeholder="Tìm tên, mã KH, số khế ước…" oninput="TDN.tim=this.value;tdnVeDS()"></div>';
  h += '<div id="tdn-ds">'+tdnDSHTML(L, ds)+'</div>';
  return h;
}
function tdnDSHTML(L, ds){
  if(!tdnKyMoi(L)) return '<div class="rong">Chưa có danh sách '+TDN_LOAI[L].dai.toLowerCase()+'.<br>Bấm <b>📥 Cập nhật tháng</b> để đọc file sao kê xuất từ hệ thống.</div>';
  var h = TDN.xem==='cay' ? tdnCayHTML(L, ds) : '';
  if(!ds.length) return h+'<div class="rong">Không có món nào khớp.</div>';
  tdnNhom(L, ds).forEach(function(g){
    var t = g.ds.reduce(function(a, m){ return a+tdnSoChinh(L, tdnSL(m, L)); }, 0);
    h += '<div class="nhan-nhom">'+coChuHTML(g.ten)+' · '+g.ds.length+' món'+(t?' · '+tdnTr(t):'')+'</div>'+g.ds.map(function(m){ return tdnDongHTML(m, L); }).join('');
  });
  return h;
}
function tdnVeDS(){ var e = document.getElementById('tdn-ds'); if(e) e.innerHTML = tdnDSHTML(TDN.loai, tdnDSLoai(TDN.loai)); }
function tdnMo(kuoc){ TDN.mo = kuoc; veGhiChu(); var t = document.getElementById('ds-gc'); if(t && t.scrollIntoView) window.scrollTo(0, 0); }

/* ==========================================================
   3.82 — 🏠 HỒ SƠ HỘ MỘT TRANG: gom mọi thứ của 1 hộ đang nằm rải ở nhiều tab
   CCCD + hồ sơ scan (tab Scan) · Chữ ký·CCCD · Bộ hồ sơ · món vay + lần làm việc + hồ sơ hộ (Theo dõi nợ)
   Ghép theo TÊN (không dấu) + MÃ TỔ (nếu cả 2 bên có) — chỉ ĐỌC, không sửa / không gắn gì vào dữ liệu.
   ========================================================== */
function tenChuanHo(t){ return boDau(String(t||'')).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }
/* tên hộ có nằm trọn trong tên kia không (tên file scan hay kèm đuôi: "Vo Van Cuong Hdtd") */
function khopTenHo(tenHo, tenKhac){
  var a = tenChuanHo(tenHo), b = tenChuanHo(tenKhac);
  if(!a || !b) return false;
  if(a===b) return true;
  return a.split(' ').length>=2 && (' '+b+' ').indexOf(' '+a+' ')>=0;
}
function maToTu(s){ var m = String(s||'').match(/\d{5,}/); return m ? m[0] : ''; }
function thuThapHo(q){
  var mons = [], ten = q.ten||'', maTo = q.maTo||'', maKH = q.maKH||'';
  if(maKH) mons = Object.keys(NO.mon||{}).map(function(k){ return NO.mon[k]; }).filter(function(m){ return m.maKH===maKH; });
  else if(ten) mons = Object.keys(NO.mon||{}).map(function(k){ return NO.mon[k]; }).filter(function(m){
    return tenChuanHo(m.ten)===tenChuanHo(ten) && (!maTo || !m.maTo || m.maTo===maTo); });
  if(mons.length){ maKH = maKH || mons[0].maKH; ten = ten || mons[0].ten; maTo = maTo || mons[0].maTo || ''; }
  var hopTo = function(s){ var t = maToTu(s); return !maTo || !t || t===maTo; };
  var scan = (D.scan||[]).filter(function(k){ return khopTenHo(ten, k.ten) && hopTo(k.to); });
  var ka = (D.kyAnh||[]).filter(function(k){ return khopTenHo(ten, k.khach || k.ten); });
  var bo = (D.boHS||[]).filter(function(b){ return khopTenHo(ten, b.khach) && hopTo(b.to); });
  var ho = maKH ? (NO.ho||{})[maKH] : null;
  var lan = (NO.lan||[]).filter(function(l){ var m = NO.mon[l.kuoc]; return m && mons.indexOf(m)>=0; }).sort(function(a, b){ return String(b.ngay||'').localeCompare(String(a.ngay||'')); });
  var sc0 = scan.filter(function(k){ return k.xa || k.ap; })[0];
  var db = mons.length ? tdnDB(mons[0]) : (sc0 ? {xa:sc0.xa, diem:sc0.diem, ap:sc0.ap, to:sc0.to} : {});
  if(sc0 && /^\(chưa rõ|^Chưa rõ/.test(db.xa||'')) db = {xa:sc0.xa||db.xa, diem:sc0.diem||db.diem, ap:sc0.ap||db.ap, to:db.to||sc0.to};   /* sao kê chưa rõ địa bàn → lấy theo bản quét */
  return {ten:ten, maKH:maKH, maTo:maTo, mons:mons, scan:scan, ka:ka, bo:bo, ho:ho, lan:lan, db:db};
}
var HO1 = null;
function moHoSoHo(q){
  if(typeof q==='string') q = {maKH:q};
  var H = thuThapHo(q); HO1 = H;
  if(!H.ten) return bao('Không tìm thấy hộ này.', 3);
  var dong = function(ic, ten, phu, bam){ return '<div class="h1-dong"'+(bam?' onclick="'+bam+'"':'')+'><span>'+ic+'</span><div><b>'+ten+'</b>'+(phu?'<small>'+phu+'</small>':'')+'</div></div>'; };
  var dbChu = [H.db.xa, H.db.diem, H.db.ap, H.db.to ? 'Tổ '+H.db.to : ''].filter(Boolean).map(coChuHTML).join(' › ');
  var sdt = H.ho && H.ho.tt && H.ho.tt.nguoiVay && H.ho.tt.nguoiVay.sdt;
  var the = H.scan.filter(function(k){ return k.che!=='tailieu'; }), tl = H.scan.filter(function(k){ return k.che==='tailieu'; });
  var h = '<div class="hop-tit">🏠 Hồ sơ hộ · '+coChuHTML(H.ten)+'</div>'+
    '<div class="hop-phu">'+(dbChu || 'chưa rõ địa bàn')+(H.maKH ? ' · KH '+coChuHTML(H.maKH) : '')+(sdt ? ' · ☎ '+coChuHTML(sdt) : '')+'</div>'+
    '<div class="h1-luoi">';
  /* cột trái: giấy tờ */
  h += '<div class="h1-cot"><div class="nhan-nhom">🪪 CCCD ('+the.length+')</div>'+
    (the.length ? '<div class="h1-the">'+the.map(function(k){ return '<figure onclick="dongHop();xemScanCP(\''+k.id+'\')" title="Xem bản quét"><img id="h1a-'+k.id+'" alt=""><figcaption>'+coChuHTML(k.ten||'')+' · '+ngayVN(mocScan(k).slice(0,10))+'</figcaption></figure>'; }).join('')+'</div>'
      : '<div class="huong-dan">Chưa thấy bản quét CCCD trùng tên.</div>')+
    '<div class="nhan-nhom">📑 Hồ sơ đã quét ('+tl.length+')</div>'+
    (tl.length ? tl.map(function(k){ return dong('📑', coChuHTML(k.ten||'(bản quét)'), ((k.trang||[]).length ? (k.trang||[]).length+' trang' : (k.driveId?'☁ PDF trên Drive':''))+' · '+ngayVN(mocScan(k).slice(0,10)), 'dongHop();xemScanCP(\''+k.id+'\')'); }).join('') : '<div class="huong-dan">Chưa có.</div>')+
    (H.ka.length ? '<div class="nhan-nhom">✍ Chữ ký · CCCD ('+H.ka.length+')</div>'+H.ka.map(function(k){ return dong(k.loai==='ky'?'✍':'🪪', coChuHTML(k.ten||''), ngayVN(k.ngay||''), 'dongHop();xemThu(\'ka\',\''+k.id+'\')'); }).join('') : '')+
    (H.bo.length ? '<div class="nhan-nhom">📁 Bộ hồ sơ ('+H.bo.length+')</div>'+H.bo.map(function(b){ return dong('📁', coChuHTML(b.ten||''), (b.file||[]).length+' file', 'dongHop();doiNgan(3);D.cauHinh.tvPhan=\'bo\';BO.mo=\''+b.id+'\';veGhiChu()'); }).join('') : '')+
    '</div>';
  /* cột phải: món vay, làm việc, hồ sơ hộ */
  h += '<div class="h1-cot"><div class="nhan-nhom">💰 Món vay đang theo dõi ('+H.mons.length+')</div>'+
    (H.mons.length ? H.mons.map(function(m){
      var L = ['nqh','khd','nk'].filter(function(x){ return m.loai && m.loai[x]; })[0] || 'nqh', s = tdnSL(m, L);
      return dong(TDN_LOAI[L].ico, coChuHTML(tdnCT(m))+' · '+TDN_LOAI[L].ten, (s ? tdnTien(tdnSoChinh(L, s))+(tdnDangCo(m, L)?'':' (đã ra khỏi DS)') : 'đã ra khỏi danh sách')+' · KƯ '+coChuHTML(m.kuoc)+' · '+coChuHTML(tdnTrangThai(m.kuoc, L)),
        'dongHop();doiNgan(3);D.cauHinh.tvPhan=\'no\';TDN.loai=\''+L+'\';tdnMo(\''+m.kuoc+'\')'); }).join('')
      : '<div class="huong-dan">Hộ không có trong danh sách Theo dõi nợ (3 tháng KHD · quá hạn · khoanh).</div>')+
    (H.lan.length ? '<div class="nhan-nhom">📈 Làm việc gần đây ('+H.lan.length+')</div>'+H.lan.slice(0, 3).map(function(l){
      return dong('📝', ngayVN(l.ngay||'')+' · '+coChuHTML(l.trangThai||'Đang làm việc'), coChuHTML([l.camKet ? 'cam kết: '+l.camKet : '', l.camKetHan ? 'hạn '+ngayVN(l.camKetHan) : '', l.ketQua==='giu' ? '✓ giữ đúng' : l.ketQua==='that' ? '✗ thất hứa' : ''].filter(Boolean).join(' · ')), ''); }).join('') : '')+
    (H.ho ? '<div class="nhan-nhom">🗂 Hồ sơ hộ (tóm tắt)</div>'+TDN_MUC.map(function(M){ var v = (H.ho.tt||{})[M.k]; var t = v ? tdnTomMuc(M, v) : '';
      return t ? '<div class="h1-muc"><b>'+M.ten+'</b> '+coChuHTML(t)+'</div>' : ''; }).join('') +
      ((H.ho.file||[]).length ? '<div class="h1-muc"><b>📎 Tài liệu của hộ</b> '+H.ho.file.length+' file</div>' : '') : '')+
    '</div></div>'+
    '<div class="day-form">'+
      (H.scan.length ? '<button class="nho" onclick="var ids=HO1.scan.map(function(k){return k.id;});dongHop();moXemPDF(ids)" title="Ghép CCCD + hồ sơ quét thành 1 file để in / gửi">🖨 In / gửi bộ giấy tờ ('+H.scan.length+')</button>' : '')+
      (H.mons.length ? '<button class="nho" onclick="dongHop();tdnPhieu(\''+H.mons[0].kuoc+'\')" title="Phiếu thông tin món vay">🧾 Phiếu món vay</button>' : '')+
      '<button class="nho chinh" data-lenh="hop.dong">Đóng (Esc)</button></div>';
  moHop(h, true);
  the.forEach(function(k){ docAnhHS(k.id+'_matTruoc').then(function(b){ var i = document.getElementById('h1a-'+k.id); if(i && b) anhTam(i, b); else if(i) i.replaceWith(Object.assign(document.createElement('div'), {className:'h1-khong', textContent:k.driveId ? '☁ ảnh trên Drive' : 'chưa có ảnh'})); }).catch(function(){}); });
}
/* 3.84: bản scan tên KHÔNG dấu (vd lấy từ tên file khi Lập chỉ mục) → đề xuất tên có dấu theo danh sách khách Theo dõi nợ.
   Khớp: tên không dấu bắt đầu bằng tên khách (đuôi như "Hdtd" giữ nguyên) + cùng mã tổ nếu cả 2 có. Anh tích rồi mới đổi. */
function coDauViet(t){ return /[À-ỹĐđ]/.test(String(t||'').normalize('NFC').replace(/[A-Za-z0-9\s\-_.,()]/g, '')); }
function goiYTenCoDau(){
  var khach = {}; Object.keys(NO.mon||{}).forEach(function(k){ var m = NO.mon[k]; if(coDauViet(m.ten)) (khach[tenChuanHo(m.ten)] = khach[tenChuanHo(m.ten)] || []).push(m); });
  var ra = [];
  (D.scan||[]).forEach(function(k){
    if(!k.ten || coDauViet(k.ten)) return;
    var tu = String(k.ten).trim().split(/\s+/), a = tenChuanHo(k.ten).split(' ');
    for(var n = Math.min(a.length, 6); n >= 2; n--){
      var ds = (khach[a.slice(0, n).join(' ')] || []).filter(function(m){ var t = maToTu(k.to); return !t || !m.maTo || m.maTo===t; });
      var ten = ds.map(function(m){ return m.ten; }).filter(function(x, i, b){ return b.indexOf(x)===i; });
      if(ten.length===1){ ra.push({k:k, moi:[ten[0]].concat(tu.slice(n)).join(' ')}); return; }
      if(ten.length > 1) return;   /* nhiều người cùng tên → không đoán */
    }
  });
  return ra;
}
var TDAU = [];
function moTenCoDau(){
  TDAU = goiYTenCoDau();
  if(!TDAU.length) return bao('Không có bản scan nào cần đổi tên có dấu.', 3);
  moHop('<div class="hop-tit">✍ Đổi tên có dấu cho bản scan</div>'+
    '<div class="hop-phu">Tên lấy theo danh sách khách hàng trong Theo dõi nợ (khớp tên không dấu, cùng tổ nếu có). Anh tích bản muốn đổi — bản đã lên Drive sẽ đổi tên file trên Drive theo.</div>'+
    '<div class="ten-dau-ds">'+TDAU.map(function(x, i){ return '<label><input type="checkbox" class="tdau" value="'+i+'" checked> <s>'+coChuHTML(x.k.ten)+'</s> → <b>'+coChuHTML(x.moi)+'</b> <small>'+coChuHTML([x.k.ap, x.k.to?'Tổ '+x.k.to:''].filter(Boolean).join(' · '))+'</small></label>'; }).join('')+'</div>'+
    '<div class="day-form"><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button><button class="nho chinh" onclick="apTenCoDau()">Đổi tên các bản đã tích</button></div>', true);
}
function apTenCoDau(){
  var bay = new Date().toISOString(), n = 0;
  Array.prototype.forEach.call(document.querySelectorAll('.tdau:checked'), function(c){
    var x = TDAU[+c.value]; if(!x) return;
    x.k.ten = x.moi; x.k.suaLuc = bay; if(x.k.driveId) x.k.canDay = true; n++;
  });
  HS.ds = D.scan; luu(); dongHop(); veScan();
  if(n && typeof henDongBoScan==='function') henDongBoScan();
  bao('Đã đổi tên có dấu cho '+n+' bản scan.', 5);
}
function moHoSoTuScan(id){ var k = (D.scan||[]).find(function(x){ return x.id===id; }); if(k) moHoSoHo({ten:k.ten, maTo:maToTu(k.to)}); }
/* các hộ khớp với chữ đang gõ — dùng cho ô tìm (gợi ý) */
function timHo(q){
  q = tenChuanHo(q); if(q.length < 3) return [];
  var ra = [], co = {};
  Object.keys(NO.mon||{}).forEach(function(k){ var m = NO.mon[k]; if(co['kh'+m.maKH] || tenChuanHo(m.ten).indexOf(q)<0) return; co['kh'+m.maKH] = 1; co['t'+tenChuanHo(m.ten)] = 1; ra.push({maKH:m.maKH, ten:m.ten, phu:'Tổ '+(m.toTen||m.maTo||'')}); });
  (D.scan||[]).forEach(function(k){ if(k.che==='tailieu' || !k.ten || tenChuanHo(k.ten).indexOf(q)<0 || co['t'+tenChuanHo(k.ten)]) return; co['t'+tenChuanHo(k.ten)] = 1; ra.push({ten:k.ten, maTo:maToTu(k.to), phu:[k.ap, k.to?'Tổ '+k.to:''].filter(Boolean).join(' · ')}); });
  return ra.slice(0, 6);
}

/* ---------- THẺ MÓN: số liệu · hồ sơ hộ · nhật ký · tài liệu · vị trí ---------- */
function tdnTheHTML(m, L){
  if(!m.loai[L]){ L = ['nqh','khd','nk'].filter(function(x){ return m.loai[x]; })[0]; TDN.loai = L; }
  var h0 = NO.ho[m.maKH] || (NO.ho[m.maKH] = {ma:m.maKH, ten:m.ten, tt:{}, ls:[], file:[]});
  var db = tdnDB(m), s = tdnSL(m, L), cc = tdnCacKy(m, L), T = TDN_LOAI[L];
  var h = '<div class="dk-dau"><button class="nho" onclick="TDN.mo=\'\';veGhiChu()">‹ Danh sách</button><b>'+coChuHTML(m.ten)+' — '+T.ico+' '+T.ten+'</b></div>'+
    '<div class="tdn-duong">📍 '+coChuHTML([db.xa, db.diem, db.ap, 'Tổ '+(m.toTen||m.maTo)].join(' › '))+' · KH '+coChuHTML(m.maKH)+' · KƯ '+coChuHTML(m.kuoc)+'</div>'+
    '<div class="hang-nut tdn-nut"><button class="nho chinh" onclick="tdnLanMoi(\''+m.kuoc+'\')">➕ Ghi lần làm việc</button>'+
      '<button class="nho" onclick="tdnThemFile(\''+m.maKH+'\')">📎 Thêm tài liệu</button>'+
      '<button class="nho" onclick="tdnGanFile(\''+m.maKH+'\')">🔗 Gắn file có sẵn</button>'+
      '<button class="nho" onclick="tdnViTri(\''+m.maKH+'\')">📍 Vị trí nhà</button>'+
      '<button class="nho" onclick="tdnPhieu(\''+m.kuoc+'\')" title="Phiếu thông tin món vay — in hoặc ra Word">🧾 In phiếu</button>'+
      '<button class="nho" onclick="moHoSoHo(\''+m.maKH+'\')" title="Hồ sơ hộ 1 trang: CCCD, hồ sơ quét, mọi món vay, lần làm việc">🏠 Hồ sơ 1 trang</button></div>';
  /* số liệu */
  var r = function(a, b){ return b==='' || b==null ? '' : '<tr><td>'+a+'</td><td>'+b+'</td></tr>'; };
  var sx = s || m.loai[L].ky[cc[cc.length-1]] || {};
  h += '<div class="nhan-nhom">Món vay · sao kê '+(s ? tdnKyVN(tdnKyMoi(L)) : 'tháng '+tdnKyVN(cc[cc.length-1])+' (đã ra khỏi DS)')+'</div><table class="tdn-bang">'+
    r('Chương trình', coChuHTML(tdnCTDai(m)))+r('Hội đoàn thể', coChuHTML(tdnHoi(m.dvut)))+r('Tổ trưởng', coChuHTML(m.toTen||m.maTo))+
    (L==='khd' ? r('Tổng dư nợ', '<b>'+tdnTien(sx.dn)+'</b> (trong hạn '+tdnTien(sx.th)+(sx.qh?' · quá hạn '+tdnTien(sx.qh):'')+(sx.kh?' · khoanh '+tdnTien(sx.kh):'')+')')+
      r('Ngày giao dịch gần nhất', ngayVN(sx.ngd))+r('Lãi tồn / đã thu', tdnTien(sx.lt)+' / '+tdnTien(sx.ldt))+r('Ngày giải ngân', ngayVN(sx.nv))+r('Ngày đến hạn', ngayVN(sx.dh)+(sx.dhgd && sx.dhgd!==sx.dh?' · hạn GDX '+ngayVN(sx.dhgd):'')) : '')+
    (L==='nqh' ? r('Dư nợ quá hạn', '<b>'+tdnTien(sx.qh)+'</b>'+(sx.cqh?' · chuyển QH trong tháng '+tdnTien(sx.cqh):''))+r('Ngày chuyển quá hạn', ngayVN(sx.ncq))+r('Số dư TK105', tdnTien(sx.tk105)) : '')+
    (L==='nk' ? r('Dư nợ khoanh', '<b>'+tdnTien(sx.kh)+'</b>')+r('Hiệu lực khoanh', ngayVN(sx.nhl)+' → '+ngayVN(sx.nhh))+r('Nguyên nhân (sao kê)', coChuHTML(sx.nn)) : '')+
    '</table>';
  h += '<div class="tdn-ls">Lịch sử: '+cc.map(function(k){ return '<span>'+tdnKyVN(k)+' <b>'+tdnTr(tdnSoChinh(L, m.loai[L].ky[k]))+'</b></span>'; }).join(' · ')+
    (tdnPhatSinhLai(m, L) ? ' · <b class="tt-thieu">↻ phát sinh lại '+tdnPhatSinhLai(m, L)+' lần</b>' : '')+'</div>';
  var khac = ['khd','nqh','nk'].filter(function(x){ return x!==L && m.loai[x] && tdnCacKy(m, x).length; });
  var monKhac = Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).filter(function(x){ return x.maKH===m.maKH && x.kuoc!==m.kuoc; });
  if(khac.length || monKhac.length) h += '<div class="tdn-ls">'+khac.map(function(x){ return '<a class="lk" onclick="TDN.loai=\''+x+'\';veGhiChu()">'+TDN_LOAI[x].ico+' Món này trong DS '+TDN_LOAI[x].ten+(tdnDangCo(m, x)?'':' (đã ra)')+'</a>'; }).join(' · ')+
    (monKhac.length ? (khac.length?' · ':'')+'Hộ còn '+monKhac.length+' món khác: '+monKhac.map(function(x){ var l = ['nqh','khd','nk'].filter(function(y){ return x.loai[y]; })[0];
      return '<a class="lk" onclick="TDN.loai=\''+l+'\';tdnMo(\''+x.kuoc+'\')">'+coChuHTML(tdnCT(x))+' · '+TDN_LOAI[l].ten+'</a>'; }).join(', ') : '')+'</div>';
  /* nhật ký */
  var lan = tdnLanCua(m.kuoc, L), lanKhac = NO.lan.filter(function(l){ return NO.mon[l.kuoc] && NO.mon[l.kuoc].maKH===m.maKH && !(l.kuoc===m.kuoc && l.loai===L); });
  h += '<div class="nhan-nhom">📈 Nhật ký làm việc ('+lan.length+') · trạng thái: <b>'+coChuHTML(tdnTrangThai(m.kuoc, L))+'</b>'+(function(hc){ return hc ? ' · <b class="'+(tdnHua(m.kuoc).that?'tt-thieu':'')+'">'+coChuHTML(hc)+'</b>' : ''; })(tdnHuaChu(tdnHua(m.kuoc)))+'</div>';
  h += lan.length ? lan.map(function(l){ return tdnLanHTML(l); }).join('') : '<div class="huong-dan">Chưa có lần làm việc nào. Bấm <b>➕ Ghi lần làm việc</b> — ghi xong bấm <b>📝 Biên bản</b> để ra file Word điền sẵn.</div>';
  if(lanKhac.length) h += '<details class="hs-ct"><summary>Lần làm việc ở danh sách / món khác của hộ ('+lanKhac.length+')</summary>'+lanKhac.map(function(l){ return tdnLanHTML(l); }).join('')+'</details>';
  /* hồ sơ hộ */
  h += '<div class="nhan-nhom">🗂 Hồ sơ hộ vay — dùng chung cho cả 3 danh sách</div>';
  TDN_MUC.forEach(function(M){ h += tdnMucHTML(h0, M, m, L); });
  /* vị trí + tài liệu */
  var vt = h0.viTri;
  h += '<div class="nhan-nhom">📍 Vị trí nhà</div>'+(vt ? '<div class="tdn-ls">'+(vt.lat ? vt.lat.toFixed(6)+', '+vt.lng.toFixed(6)+' ' : '')+(vt.ghi?coChuHTML(vt.ghi)+' ':'')+'· cập nhật '+ngayVN((vt.luc||'').slice(0,10))+
      ' · <a class="lk" onclick="tdnChiDuong(\''+m.maKH+'\')">🧭 Chỉ đường</a> · <a class="lk" onclick="tdnViTri(\''+m.maKH+'\')">sửa</a></div>' : '<div class="huong-dan">Chưa có — bấm 📍 Vị trí nhà (đứng ở nhà khách bấm "Lấy vị trí tại đây", hoặc dán link Google Maps).</div>');
  h += '<div class="nhan-nhom">📎 Tài liệu của hộ ('+(h0.file||[]).length+') — hồ sơ gốc, biên bản đã ký, ảnh, giấy tờ</div>'+
    ((h0.file||[]).length ? h0.file.map(function(f, i){
      var mm = f.k && f.k!=='rieng' ? fileBoMuc(f) : null;
      var duong = f.k && f.k!=='rieng' ? (mm ? 'file ở '+(f.k==='scan'?'tab Scan':f.k==='ka'?'Chữ ký·CCCD':'tab '+coChuHTML(TEN_PHAN[khoCuaMuc(mm)]||'')) : 'file gốc đã bị xóa')
        : (f.driveId ? '☁ '+D.cauHinh.thumuc+' / Theo dõi nợ / '+coChuHTML(tdnThuMuc(h0).split(' / ').slice(1).join(' / ')) : '💻 Chỉ trong máy này (chưa lên Drive)');
      return '<div class="dk-dong"><span>'+(f.nhom==='bb'?'📝':f.nhom==='anh'?'🖼':'📄')+'</span><div class="dk-ten" onclick="tdnXemFile(\''+m.maKH+'\','+i+')"><b>'+coChuHTML(f.k && f.k!=='rieng' ? tenFileBo(f) : f.ten)+'</b><small>'+(f.nhom?coChuHTML(TDN_NHOM_FILE[f.nhom]||'')+' · ':'')+duong+'</small></div>'+
        '<button class="nho" onclick="tdnBoFile(\''+m.maKH+'\','+i+')" title="Gỡ khỏi hồ sơ hộ">✕</button></div>';
    }).join('') : '<div class="huong-dan">Chưa có tài liệu. 📎 Thêm tài liệu (chụp / chọn file) hoặc 🔗 Gắn file có sẵn (bản scan hồ sơ gốc ở tab Scan…).</div>');
  return h;
}
var TDN_NHOM_FILE = {goc:'Hồ sơ gốc', bb:'Biên bản đã ký', anh:'Ảnh hiện trạng', giay:'Giấy tờ thừa kế / xác nhận', khac:'Khác'};
function tdnMucHTML(ho, M, m, L){
  var v = ho.tt[M.k] || {}, co = (v.chon||[]).length || v.ghi || M.o.some(function(o){ return v[o[0]]; });
  var tom = co ? [(v.chon||[]).join(', ')].concat(M.o.filter(function(o){ return v[o[0]]; }).map(function(o){ return o[1]+': '+v[o[0]]; })).concat(v.ghi?[v.ghi]:[]).filter(Boolean).join(' · ') : '';
  var ls = (ho.ls||[]).filter(function(x){ return x.muc===M.k; });
  var goiY = (M.k==='nguyenNhan' && L==='nk') ? ((tdnSL(m,'nk')||{}).nn || '') : '';
  return '<div class="tdn-muc'+(co?'':' chua-co')+'"><div class="tdn-muc-dau"><b>'+M.ten+'</b>'+(v.luc?'<small>cập nhật '+ngayVN(v.luc.slice(0,10))+(v.nguon?' · '+coChuHTML(v.nguon):'')+'</small>':'')+
    '<button class="nho" onclick="tdnSuaMuc(\''+ho.ma+'\',\''+M.k+'\')">✎ '+(co?'Sửa':'Bổ sung')+'</button></div>'+
    (co ? '<div class="tdn-muc-nd">'+coChuHTML(tom)+'</div>' : '<div class="tdn-muc-nd huong-dan">Chưa có thông tin.'+(goiY?' Sao kê ghi: "'+coChuHTML(goiY)+'"':'')+'</div>')+
    (ls.length ? '<details class="tdn-lsm"><summary>🕘 '+ls.length+' lần thay đổi trước</summary>'+ls.slice().reverse().map(function(x){ return '<div>'+ngayVN((x.luc||'').slice(0,10))+': '+coChuHTML(x.tom||'(trống)')+'</div>'; }).join('')+'</details>' : '')+'</div>';
}
function tdnTomMuc(M, v){ return [(v.chon||[]).join(', ')].concat(M.o.filter(function(o){ return v[o[0]]; }).map(function(o){ return o[1]+': '+v[o[0]]; })).concat(v.ghi?[v.ghi]:[]).filter(Boolean).join(' · '); }
function tdnSuaMuc(maKH, k){
  var ho = NO.ho[maKH], M = TDN_MUC.find(function(x){ return x.k===k; }); if(!ho || !M) return;
  if(nhapMo('muc:'+maKH+':'+k)) return;
  var v = ho.tt[k] || {};
  moHop('<div class="hop-tit">'+M.ten+' — '+coChuHTML(ho.ten||maKH)+'</div>'+
    '<div class="hop-phu">'+(M.mot?'Chọn một mức (bấm lại để bỏ = chưa đánh giá)':'Bấm chọn nhanh (chọn được nhiều)')+', gõ thêm nếu cần. Bản cũ được giữ trong lịch sử.</div>'+
    '<div class="tdn-chip" id="tdn-chip">'+M.chon.map(function(c){ return '<span class="'+((v.chon||[]).indexOf(c)>=0?'bat':'')+'" onclick="'+(M.mot?'var b=!this.classList.contains(\'bat\');Array.prototype.forEach.call(this.parentNode.children,function(x){x.classList.remove(\'bat\')});if(b)':'')+'this.classList.toggle(\'bat\')">'+coChuHTML(c)+'</span>'; }).join('')+'</div>'+
    M.o.map(function(o){ return '<div class="o"><label>'+o[1]+'</label><input id="tdn-o-'+o[0]+'" value="'+coChuHTML(v[o[0]]||'')+'"></div>'; }).join('')+
    '<div class="o"><label>Ghi thêm</label><textarea id="tdn-o-ghi" rows="4">'+coChuHTML(v.ghi||'')+'</textarea></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi (Esc)</button><button class="nho chinh" onclick="tdnLuuMuc(\''+maKH+'\',\''+k+'\')">✓ Lưu</button></div>', true);
  nhapDat('muc:'+maKH+':'+k);  document.getElementById('hop-in').classList.add('phim-chung');   /* 3.84: phím chung Enter / Tab / Shift / ↑ ↓ */
}
function tdnLuuMuc(maKH, k, nguon){
  var ho = NO.ho[maKH], M = TDN_MUC.find(function(x){ return x.k===k; }); if(!ho || !M) return;
  var cu = ho.tt[k] || {}, moi = {chon:Array.prototype.map.call(document.querySelectorAll('#tdn-chip span.bat'), function(e){ return e.textContent; })};
  M.o.forEach(function(o){ moi[o[0]] = gt('tdn-o-'+o[0]); }); moi.ghi = (document.getElementById('tdn-o-ghi')||{}).value || '';
  nhapXong();
  if(tdnTomMuc(M, cu)===tdnTomMuc(M, moi)) return dongHop();
  if(cu.luc) (ho.ls = ho.ls||[]).push({muc:k, luc:cu.luc, tom:tdnTomMuc(M, cu), v:cu});
  if(ho.ls.length>200) ho.ls = ho.ls.slice(-200);
  moi.luc = new Date().toISOString(); moi.nguon = nguon || 'anh bổ sung'; ho.tt[k] = moi; ho.suaLuc = moi.luc;
  luuNo(); dongHop(); veGhiChu();
}
/* ---------- lần làm việc ---------- */
function tdnLanHTML(l){
  var m = NO.mon[l.kuoc], T = TDN_LOAI[l.loai]||{};
  return '<div class="tdn-lan"><div class="tdn-lan-dau"><b>'+ngayVN(l.ngay)+' · '+coChuHTML(l.hinhThuc||'')+'</b>'+
    (m && TDN.mo!==l.kuoc ? '<small>'+coChuHTML(tdnCT(m))+' · '+(T.ten||'')+'</small>' : '')+'<span class="tg '+(/thu hồi hết/.test(l.trangThai||'')?'ct':'')+'">'+coChuHTML(l.trangThai||'')+'</span>'+
    '<span class="cc-gian"></span><button class="nho chinh" onclick="tdnBienBan(\''+l.id+'\')" title="Tạo biên bản Word điền sẵn">📝 Biên bản</button>'+
    '<button class="nho" onclick="tdnLanMoi(\''+l.kuoc+'\',\''+l.id+'\')">✎</button><button class="nho" onclick="tdnXoaLan(\''+l.id+'\')" title="Xóa lần này">🗑</button></div>'+
    '<div class="tdn-lan-nd">'+[['Địa điểm',l.diaDiem],['Nguyên nhân',l.nguyenNhan],['Thực trạng',l.thucTrang],['Cam kết',l.camKet+(l.camKetTien?' · '+tdnTien(l.camKetTien)+' đ':'')+(l.camKetHan?' · hạn '+ngayVN(l.camKetHan):'')],['Kiến nghị',l.kienNghi],['Đã thu',l.thu?tdnTien(l.thu)+' đ':'']]
      .filter(function(x){ return x[1] && String(x[1]).replace(/[·\s]/g,''); }).map(function(x){ return '<div><i>'+x[0]+':</i> '+coChuHTML(x[1])+'</div>'; }).join('')+'</div>'+
    (tdnCoCamKet(l) ? '<div class="tdn-kq"><i>Kết quả cam kết:</i> <button class="nho'+(l.ketQua==='giu'?' bat giu':'')+'" onclick="tdnDatKQ(\''+l.id+'\',\'giu\')">✓ Giữ đúng</button>'+
      '<button class="nho'+(l.ketQua==='that'?' bat that':'')+'" onclick="tdnDatKQ(\''+l.id+'\',\'that\')">✗ Thất hứa</button>'+(l.ketQua?'':'<small>đang chờ — bấm lại nút đã chọn để bỏ</small>')+'</div>' : '')+'</div>';
}
function tdnLanMoi(kuoc, id){
  var m = NO.mon[kuoc]; if(!m) return;
  if(nhapMo('lan:'+kuoc+':'+(id||''))) return;
  var ho = NO.ho[m.maKH]||{tt:{}}, db = tdnDB(m), l = id ? NO.lan.find(function(x){ return x.id===id; }) : null;
  var tt = function(k){ var M = TDN_MUC.find(function(x){ return x.k===k; }); return ho.tt[k] ? tdnTomMuc(M, ho.tt[k]) : ''; };
  var L = l ? l.loai : TDN.loai;
  var v = l || {ngay:ngayISO(nay()), diaDiem:tdnApCau(db.ap)+', '+tdnXaCau(db.xa), hinhThuc:TDN_HINH_THUC[0], thanhPhan:'',
    nguyenNhan:tt('nguyenNhan') || (L==='nk' ? ((tdnSL(m,'nk')||{}).nn||'') : ''), thucTrang:[tt('nguoiVay'), tt('thucTrang'), tt('suDungVon')].filter(Boolean).join('; '),
    camKet:'', camKetTien:'', camKetHan:'', kienNghi:tt('phuongAn'), thu:'', trangThai:'Đang làm việc'};
  var o = function(k, nhan, goiY){ return '<div class="o"><label>'+nhan+'</label><input id="tl-'+k+'" value="'+coChuHTML(v[k]||'')+'" placeholder="'+(goiY||'')+'"></div>'; };
  var t = function(k, nhan){ return '<div class="o"><label>'+nhan+'</label><textarea id="tl-'+k+'" rows="3">'+coChuHTML(v[k]||'')+'</textarea></div>'; };
  moHop('<div class="hop-tit">'+(l?'✎ Sửa':'➕ Ghi')+' lần làm việc — '+coChuHTML(m.ten)+' · '+TDN_LOAI[L].ten+'</div>'+
    '<div class="hop-phu">Các mục 2–5 đúng theo biên bản làm việc; app điền sẵn từ hồ sơ hộ, anh sửa câu chữ. Có hạn cam kết → tự lên lịch Hôm nay để nhắc.</div>'+
    '<div class="cot2">'+'<div class="o"><label>Ngày làm việc</label><input id="tl-ngay" inputmode="numeric" value="'+ngayVN(v.ngay)+'" oninput="goNgay(this)" placeholder="dd/mm/yyyy"></div>'+
      o('diaDiem','Địa điểm (tại…)','ấp …, xã …')+'</div>'+
    '<div class="o"><label>Hình thức</label><select id="tl-hinhThuc">'+TDN_HINH_THUC.map(function(x){ return '<option'+(x===v.hinhThuc?' selected':'')+'>'+x+'</option>'; }).join('')+'</select></div>'+
    t('thanhPhan','Thành phần (để trống thì biên bản để chấm cho ghi tay)')+
    t('nguyenNhan','2. Nguyên nhân không trả được nợ')+t('thucTrang','3. Thực trạng kinh tế và khả năng trả nợ')+
    t('camKet','4. Cam kết của khách hàng (hoặc người trả nợ thay)')+
    '<div class="cot2">'+o('camKetTien','Số tiền cam kết (đồng)','vd 5000000')+'<div class="o"><label>Hạn cam kết</label><input id="tl-camKetHan" inputmode="numeric" value="'+ngayVN(v.camKetHan)+'" oninput="goNgay(this)" placeholder="dd/mm/yyyy"></div></div>'+
    t('kienNghi','5. Kiến nghị biện pháp xử lý nợ')+
    '<div class="cot2">'+o('thu','Số tiền đã thu lần này (đồng)','')+'<div class="o"><label>Trạng thái sau lần này</label><select id="tl-trangThai">'+TDN_TRANG_THAI.map(function(x){ return '<option'+(x===v.trangThai?' selected':'')+'>'+x+'</option>'; }).join('')+'</select></div></div>'+
    '<label class="tl-chon"><input type="checkbox" id="tl-capNhat" checked> Cập nhật "Nguyên nhân", "Phương án" vào hồ sơ hộ nếu hồ sơ còn trống</label>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi (Esc)</button><button class="nho chinh" onclick="tdnLuuLan(\''+kuoc+'\',\''+(id||'')+'\')">✓ Lưu</button>'+
    '<button class="nho" onclick="tdnLuuLan(\''+kuoc+'\',\''+(id||'')+'\',true)">✓ Lưu &amp; 📝 Biên bản</button></div>', true);
  nhapDat('lan:'+kuoc+':'+(id||''));  document.getElementById('hop-in').classList.add('phim-chung');   /* 3.84: phím chung Enter / Tab / Shift / ↑ ↓ */
}
function tdnLuuLan(kuoc, id, bb){
  var m = NO.mon[kuoc]; if(!m) return;
  var now = new Date().toISOString(), l = id ? NO.lan.find(function(x){ return x.id===id; }) : null;
  var ngay = ngayISOtu(gt('tl-ngay')); if(!ngay) return baoLoi('Ngày làm việc chưa đúng (dd/mm/yyyy).');
  var han = gt('tl-camKetHan') ? ngayISOtu(gt('tl-camKetHan')) : ''; if(gt('tl-camKetHan') && !han) return baoLoi('Hạn cam kết chưa đúng (dd/mm/yyyy).');
  if(!l){ l = {id:'tl'+idMoi(), kuoc:kuoc, maKH:m.maKH, loai:TDN.loai, taoLuc:now}; NO.lan.push(l); }
  ['diaDiem','hinhThuc','thanhPhan','nguyenNhan','thucTrang','camKet','kienNghi','trangThai'].forEach(function(k){ var e = document.getElementById('tl-'+k); l[k] = e ? e.value.trim() : ''; });
  l.ngay = ngay; l.camKetHan = han; l.camKetTien = tdnSo(gt('tl-camKetTien')) || ''; l.thu = tdnSo(gt('tl-thu')) || ''; l.suaLuc = now;
  /* hạn cam kết → một việc trong lịch Hôm nay (sửa lần làm việc thì sửa theo) */
  var Lc = lcData(), v = l.viecId ? Lc.viec.find(function(x){ return x.id===l.viecId; }) : null;
  if(han){
    var ten = '💰 Cam kết trả nợ: '+m.ten+(l.camKetTien?' '+tdnTien(l.camKetTien)+' đ':'')+' ('+TDN_LOAI[l.loai].ten+')';
    if(!v){ v = {id:idMoi(), ten:ten, ngay:han, lap:'mot', luuY:true, xong:false, xongNgay:{}, bo:[], taoLuc:now, suaLuc:now, tdn:l.id}; Lc.viec.push(v); l.viecId = v.id; }
    else { v.ten = ten; v.ngay = han; v.suaLuc = now; }
    lcDoiLich();
  } else if(v){ Lc.viec = Lc.viec.filter(function(x){ return x.id!==v.id; }); Lc.daXoa.push({id:v.id, luc:now}); l.viecId = ''; lcDoiLich(); }
  var ho = NO.ho[m.maKH];
  if(ho && (document.getElementById('tl-capNhat')||{}).checked){
    if(l.nguyenNhan && !ho.tt.nguyenNhan) ho.tt.nguyenNhan = {chon:[], ghi:l.nguyenNhan, luc:now, nguon:'lần làm việc '+ngayVN(ngay)};
    if(l.kienNghi && !ho.tt.phuongAn) ho.tt.phuongAn = {chon:[], ghi:l.kienNghi, luc:now, nguon:'lần làm việc '+ngayVN(ngay)};
    ho.suaLuc = now;
  }
  luuNo(); nhapXong(); dongHop(); veGhiChu();
  if(bb) tdnBienBan(l.id); else bao('Đã lưu lần làm việc'+(han?' — hạn cam kết '+ngayVN(han)+' đã lên lịch Hôm nay':'')+'.', 4);
}
function tdnXoaLan(id){
  var l = NO.lan.find(function(x){ return x.id===id; }); if(!l) return;
  (function(){   /* 3.153: không hỏi — lần làm việc (kèm việc cam kết trong lịch) vào Thùng rác */
    var now = new Date().toISOString(), vc = l.viecId ? lcTim(l.viecId) : null;
    racMucNho('lanLV', 'Lần làm việc '+ngayVN(l.ngay)+(l.ten || l.maKH ? ' · '+(l.ten || l.maKH) : ''), 'Theo dõi nợ › nhật ký làm việc', l, vc ? {viec:JSON.parse(JSON.stringify(vc))} : null);
    NO.lan = NO.lan.filter(function(x){ return x.id!==id; }); NO.lanXoa.push({id:id, luc:now});
    if(l.viecId){ var Lc = lcData(); Lc.viec = Lc.viec.filter(function(x){ return x.id!==l.viecId; }); Lc.daXoa.push({id:l.viecId, luc:now}); lcDoiLich(); }
    luuNo(); veGhiChu();
  })();
}

/* ---------- vị trí nhà ---------- */
function tdnViTri(maKH){
  var ho = NO.ho[maKH]; if(!ho) return; var vt = ho.viTri || {};
  moHop('<div class="hop-tit">📍 Vị trí nhà — '+coChuHTML(ho.ten||maKH)+'</div>'+
    '<div class="hop-phu">Đứng ở nhà khách bấm <b>Lấy vị trí tại đây</b> (điện thoại bật định vị), hoặc dán link Google Maps / tọa độ.</div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="tdnLayGPS(\''+maKH+'\')">📡 Lấy vị trí tại đây</button></div>'+
    '<div class="o"><label>Link Google Maps hoặc tọa độ (vĩ độ, kinh độ)</label><input id="tdn-vt" value="'+coChuHTML(vt.lat?vt.lat+', '+vt.lng:(vt.link||''))+'" placeholder="10.98, 106.26 hoặc https://maps.app.goo.gl/…"></div>'+
    '<div class="o"><label>Ghi chú đường đi</label><input id="tdn-vt-ghi" value="'+coChuHTML(vt.ghi||'')+'" placeholder="vd: hẻm cạnh chợ, nhà mái tôn xanh"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi (Esc)</button><button class="nho chinh" onclick="tdnLuuViTri(\''+maKH+'\')">✓ Lưu</button></div>', true);
}
function tdnLayGPS(maKH){
  if(!navigator.geolocation) return baoLoi('Máy này không hỗ trợ định vị.');
  bao('Đang lấy vị trí…', 3);
  navigator.geolocation.getCurrentPosition(function(p){
    var e = document.getElementById('tdn-vt'); if(e) e.value = p.coords.latitude.toFixed(6)+', '+p.coords.longitude.toFixed(6);
    bao('Đã lấy vị trí (sai số khoảng '+Math.round(p.coords.accuracy)+' m) — bấm Lưu.', 5);
  }, function(er){ baoLoi('Không lấy được vị trí: '+(er && er.message || 'chưa cho phép định vị')); }, {enableHighAccuracy:true, timeout:20000});
}
function tdnLuuViTri(maKH){
  var ho = NO.ho[maKH]; if(!ho) return;
  var t = gt('tdn-vt'), m = t.match(/(-?\d{1,2}\.\d+)\s*,\s*(-?\d{2,3}\.\d+)/) || t.match(/@(-?\d{1,2}\.\d+),(-?\d{2,3}\.\d+)/);
  var vt = {ghi:gt('tdn-vt-ghi'), luc:new Date().toISOString()};
  if(m){ vt.lat = +m[1]; vt.lng = +m[2]; } else if(/^https?:\/\//.test(t)) vt.link = t; else if(t) return baoLoi('Chưa nhận ra tọa độ hoặc link.');
  ho.viTri = (vt.lat || vt.link || vt.ghi) ? vt : null; ho.suaLuc = vt.luc; luuNo(); dongHop(); veGhiChu();
}
function tdnChiDuong(maKH){
  var vt = (NO.ho[maKH]||{}).viTri; if(!vt) return;
  window.open(vt.lat ? 'https://www.google.com/maps/dir/?api=1&destination='+vt.lat+','+vt.lng : vt.link, '_blank');
}
/* ---------- tài liệu của hộ ---------- */
function tdnThuMuc(ho){
  var m = Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).find(function(x){ return x.maKH===ho.ma; });
  var db = m ? tdnDB(m) : {xa:'Chưa rõ xã'};
  return D.cauHinh.thumuc+' / Theo dõi nợ / '+sachTen(db.xa)+' / '+sachTen((ho.ten||'')+' - '+ho.ma);
}
function tdnThemFile(maKH){
  var ho = NO.ho[maKH]; if(!ho) return;
  moHop('<div class="hop-tit">📎 Thêm tài liệu — '+coChuHTML(ho.ten||maKH)+'</div>'+
    '<div class="o"><label>Loại tài liệu</label><select id="tdn-nf">'+Object.keys(TDN_NHOM_FILE).map(function(k){ return '<option value="'+k+'">'+TDN_NHOM_FILE[k]+'</option>'; }).join('')+'</select></div>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="tdnChonFileHo(\''+maKH+'\',true)">📷 Chụp ảnh</button><button class="nho" onclick="tdnChonFileHo(\''+maKH+'\')">📂 Chọn file (ảnh / PDF / Word)</button>'+
    '<button class="nho" data-lenh="hop.dong">Thôi (Esc)</button></div>'+
    '<div class="huong-dan">Hồ sơ gốc nhiều trang: quét ở tab <b>Scan</b> (chế độ Tài liệu) cho ra PDF đẹp, rồi quay lại bấm <b>🔗 Gắn file có sẵn</b>.</div>', true);
}
function tdnChonFileHo(maKH, chup){
  var nhom = gt('tdn-nf') || 'khac', i = document.createElement('input'); i.type = 'file'; i.multiple = !chup;
  i.accept = chup ? 'image/*' : 'image/*,.pdf,.doc,.docx,.xls,.xlsx'; if(chup) i.setAttribute('capture', 'environment');
  i.onchange = function(){
    var ho = NO.ho[maKH]; if(!ho || !i.files.length) return;
    var ds = Array.prototype.slice.call(i.files);
    Promise.all(ds.map(function(f){ var id = 'nf'+idMoi(); return luuFile(id, f).then(function(){ (ho.file = ho.file||[]).push({k:'rieng', id:id, ten:f.name, co:f.size, loai:f.type||'', nhom:nhom, themLuc:new Date().toISOString(), may:maMayCua()}); }); }))
    .then(function(){ ho.suaLuc = new Date().toISOString(); luuNo(); dongHop(); veGhiChu(); bao('Đã thêm '+ds.length+' tài liệu.'+(coTheNoiDrive()?' Đang đưa lên Drive…':''), 4); dayFileNoCho(); });
  };
  i.click();
}
function dayFileNoCho(){
  if(!coTheNoiDrive() || !(DR.sanSang && DR.online) || dayFileNoCho.dang) return Promise.resolve();
  var viec = [];
  Object.keys(NO.ho).forEach(function(k){ var ho = NO.ho[k]; (ho.file||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) viec.push([ho, f]); }); });
  if(!viec.length) return Promise.resolve();
  dayFileNoCho.dang = true;
  return viec.reduce(function(p, x){
    return p.then(function(){
      var ho = x[0], f = x[1];
      return Promise.all([docFile(f.id), baoDamDuong(tdnThuMuc(ho))]).then(function(r){
        if(!r[0]) return;
        return dayBlobLenDrive(f.ten, f.loai, r[0], r[1]).then(function(r2){ f.driveId = r2 && r2.id; f.driveCha = r[1]; ho.suaLuc = new Date().toISOString(); });
      }).catch(function(e){ console.warn('Chưa đưa tài liệu lên Drive', f.ten, e); });
    });
  }, Promise.resolve()).then(function(){ dayFileNoCho.dang = false; luuNo(); if(nganHienTai===3 && tvPhan()==='no') veGhiChu(); });
}
function tdnXemFile(maKH, i){
  var ho = NO.ho[maKH], f = ho && ho.file[i]; if(!f) return;
  if(f.k && f.k!=='rieng') return xemThu(f.k==='scan'?'scan':f.k==='ka'?'ka':'muc', f.id);
  var m = {id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), driveId:f.driveId, co:f.co};
  var cp = document.getElementById('cotphai');
  if(cp && cp.offsetParent && !anPV){ mucDangXem = m; cp.classList.remove('pv-trong'); document.getElementById('cp-ten').textContent = f.ten;
    document.getElementById('cp-phu').textContent = (TDN_NHOM_FILE[f.nhom]||'')+' · '+(ho.ten||''); veNutCN(null); veNoiDung(m, 'phai'); }
  else moXem(null, m);
}
function tdnBoFile(maKH, i){
  var ho = NO.ho[maKH], f = ho && ho.file[i]; if(!f) return;
  hoi('Gỡ "'+(f.ten||'file')+'" khỏi hồ sơ hộ?', f.k && f.k!=='rieng' ? 'Chỉ gỡ liên kết — file gốc vẫn ở chỗ cũ.' : 'File riêng của hộ: gỡ khỏi danh sách (file trên Drive giữ nguyên để anh tự xử lý).', 'Gỡ', function(){
    ho.file.splice(i, 1); ho.suaLuc = new Date().toISOString(); luuNo(); veGhiChu();
  });
}
function tdnGanFile(maKH){
  var ho = NO.ho[maKH]; if(!ho) return;
  GAN = {bo:'', nk:'', tdn:maKH, tim:ho.ten||''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào hồ sơ hộ</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó (vd bản scan hồ sơ gốc ở tab Scan). Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" value="'+coChuHTML(GAN.tim)+'" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi (Esc)</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
  veGanDS();
}

/* ---------- 📝 BIÊN BẢN — danh mục mẫu (thêm mẫu sau không sửa phần khác) ---------- */
var MAU_BB = [
  {id:'xacMinhNo', ten:'Biên bản làm việc — xác minh khoản nợ', ve:function(c){ return bbXacMinhNo(c); }}
];
function tdnBienBan(lanId, mauId){
  var l = NO.lan.find(function(x){ return x.id===lanId; }), m = l && NO.mon[l.kuoc]; if(!m) return;
  var mau = MAU_BB.find(function(x){ return x.id===(mauId||'xacMinhNo'); }) || MAU_BB[0];
  var ten = 'BB lam viec - '+boDauTen(m.ten)+' - '+ngayVN(l.ngay).replace(/\//g,'-')+'.docx';
  taoDocx(mau.ve(tdnNguCanh(l, m))).then(function(bl){
    giaoFile(bl, ten);
    bao('Đã tạo '+ten+' — mở bằng Word để sửa, in, ký. Bản ký xong chụp lại: 📎 Thêm tài liệu › Biên bản đã ký.', 9);
  });
}
function boDauTen(t){ return boDau(t||'').replace(/[^a-z0-9 ]/gi,'').replace(/\s+/g,' ').trim().replace(/\b\w/g, function(c){ return c.toUpperCase(); }); }
function tdnNguCanh(l, m){
  var db = tdnDB(m), L = l.loai, s = tdnSL(m, L) || {}, ky = tdnKyMoi(L), sk = tdnSL(m, 'khd', ky) || {};
  var hoTT = (NO.ho[m.maKH]||{tt:{}}).tt;
  var goc = L==='khd' ? s.dn : (sk.dn || (L==='nqh' ? s.qh : s.kh));
  return {ngay:l.ngay, diaDiem:l.diaDiem, thanhPhan:l.thanhPhan, ten:m.ten, diaChi:tdnApCau(db.ap)+', '+tdnXaCau(db.xa)+', tỉnh Tây Ninh',
    ct:tdnCTDai(m), soTien:'', mucDich:(hoTT.suDungVon||{}).mucDich||'', ngayVay:L==='khd'?s.nv:(sk.nv||''), ngayDenHan:L==='khd'?s.dh:(sk.dh||''),
    denNgay:ky ? tdnCuoiKy(ky) : '', noGoc:goc||'', noLai:L==='khd'?s.lt:(sk.lt||''),
    nguyenNhan:l.nguyenNhan, thucTrang:l.thucTrang, camKet:[l.camKet, l.camKetTien?'số tiền '+tdnTien(l.camKetTien)+' đồng':'', l.camKetHan?'trước ngày '+ngayVN(l.camKetHan):''].filter(Boolean).join(', '), kienNghi:l.kienNghi,
    hoi:tdnHoi(m.dvut)};
}
/* ---- dựng file Word (.docx) — dùng lại bộ nén ZIP có sẵn ---- */
function xmlEsc(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function wR(t, o){ o = o||{}; return '<w:r><w:rPr>'+(o.b?'<w:b/>':'')+(o.i?'<w:i/>':'')+(o.sz?'<w:sz w:val="'+o.sz+'"/>':'')+'</w:rPr><w:t xml:space="preserve">'+xmlEsc(t)+'</w:t></w:r>'; }
function wP(runs, o){ o = o||{}; return '<w:p><w:pPr>'+(o.jc?'<w:jc w:val="'+o.jc+'"/>':'')+'<w:spacing w:before="'+(o.tr||0)+'" w:after="'+(o.sau!=null?o.sau:60)+'" w:line="'+(o.line||300)+'" w:lineRule="auto"/>'+(o.thut?'<w:ind w:firstLine="'+o.thut+'"/>':'')+'</w:pPr>'+(typeof runs==='string'?wR(runs, o):runs.join(''))+'</w:p>'; }
function wBangKy(cot){
  var w = Math.floor(9600/cot.length);
  return '<w:tbl><w:tblPr><w:tblW w:w="9600" w:type="dxa"/><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders></w:tblPr><w:tblGrid>'+
    cot.map(function(){ return '<w:gridCol w:w="'+w+'"/>'; }).join('')+'</w:tblGrid><w:tr>'+cot.map(function(c){ return '<w:tc><w:tcPr><w:tcW w:w="'+w+'" w:type="dxa"/></w:tcPr>'+wP([wR(c,{b:1})],{jc:'center'})+'</w:tc>'; }).join('')+'</w:tr></w:tbl>';
}
function bbCham(v, n){ return v ? String(v) : Array(n||20).join('.'); }
function bbXacMinhNo(c){
  var d = c.ngay ? c.ngay.split('-') : ['','',''], tp = String(c.thanhPhan||'').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  var dong = [
    ['Đại diện: ……………………………'],['Đại diện: ……………………………'],['Đại diện: Tổ TK&VV'],['Đại diện: Khách hàng vay vốn']];
  var P = [];
  P.push(wP([wR('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',{b:1})],{jc:'center',sau:0}));
  P.push(wP([wR('Độc lập – Tự do – Hạnh phúc',{b:1})],{jc:'center',sau:0}));
  P.push(wP([wR('--------------------------------')],{jc:'center',sau:120}));
  P.push(wP([wR('BIÊN BẢN LÀM VIỆC',{b:1,sz:30})],{jc:'center',tr:120,sau:120}));
  P.push(wP([wR('Hôm nay, ngày '+(d[2]||'……')+'/'+(d[1]||'……')+'/'+(d[0]||'……')+', tại '+bbCham(c.diaDiem, 30)+', tỉnh Tây Ninh.')],{thut:567}));
  P.push(wP([wR('Chúng tôi gồm:')],{thut:567}));
  for(var i=0;i<4;i++) P.push(wP([wR((i+1)+'. '+(tp[i] ? tp[i] : 'Ông (bà) ............................................... '+dong[i][0]))],{thut:567}));
  P.push(wP([wR('Đã tiến hành xác minh và đánh giá khoản nợ của ông (bà): '),wR(c.ten,{b:1})],{thut:567}));
  P.push(wP([wR('Địa chỉ: '+bbCham(c.diaChi, 60))],{thut:567}));
  P.push(wP([wR('1. Thông tin về món vay',{b:1})],{thut:567}));
  P.push(wP([wR('- Tên chương trình vay: '+bbCham(c.ct, 30)+'; - Số tiền vay: '+(c.soTien?tdnTien(c.soTien):'……………')+' đồng;')],{thut:567}));
  P.push(wP([wR('- Mục đích sử dụng vốn vay: '+bbCham(c.mucDich, 60))],{thut:567}));
  P.push(wP([wR('- Ngày vay: '+(c.ngayVay?ngayVN(c.ngayVay):'……/……/………')+'          - Ngày đến hạn: '+(c.ngayDenHan?ngayVN(c.ngayDenHan):'……/……/………'))],{thut:567}));
  P.push(wP([wR('Tổng số nợ phải trả ngân hàng đến ngày '+(c.denNgay?ngayVN(c.denNgay):'……/……/………'))],{thut:567}));
  P.push(wP([wR('- Nợ gốc: '+(c.noGoc?tdnTien(c.noGoc):'………………')+' đồng;          - Nợ lãi: '+(c.noLai?tdnTien(c.noLai):'………………')+' đồng;')],{thut:567}));
  var muc = function(so, tit, nd){ P.push(wP([wR(so+'. '+tit+': ',{b:1}), wR(nd || '')],{thut:567})); if(!nd){ P.push(wP([wR(Array(130).join('.'))])); P.push(wP([wR(Array(130).join('.'))])); } };
  muc(2, 'Nguyên nhân không trả được nợ', c.nguyenNhan);
  muc(3, 'Thực trạng tình hình kinh tế và khả năng trả nợ của khách hàng', c.thucTrang);
  muc(4, 'Cam kết của khách hàng (hoặc người trả nợ thay)', c.camKet);
  muc(5, 'Kiến nghị biện pháp xử lý nợ', c.kienNghi);
  P.push(wP([wR('Buổi làm việc kết thúc cùng ngày, đã được đọc lại cho những người có tên nghe, thống nhất với các nội dung trong Biên bản và cùng ký tên dưới đây.')],{thut:567,sau:240}));
  P.push(wBangKy(['KH vay vốn','Tổ TK&VV','Đại diện '+(c.hoi||'………'),'Đại diện ………']));
  return P.join('');
}
function taoDocx(than, sect){   /* 3.170: sect = <w:sectPr> riêng (khổ ngang, lề theo mẫu) */
  var enc = function(t){ return new Blob([t], {type:'application/xml'}); };
  var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+than+(sect ||
    '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1701" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr>')+'</w:body></w:document>';
  var kieu = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'+
    '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman" w:eastAsia="Times New Roman"/><w:sz w:val="26"/><w:szCs w:val="26"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault>'+
    '<w:pPrDefault><w:pPr><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>';
  return taoZip([
    {ten:'[Content_Types].xml', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'+
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>')},
    {ten:'_rels/.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')},
    {ten:'word/_rels/document.xml.rels', b:enc('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>')},
    {ten:'word/document.xml', b:enc(doc)},
    {ten:'word/styles.xml', b:enc(kieu)}
  ]).then(function(z){ return new Blob([z], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); });
}
/* ---------- 🧾 PHIẾU THÔNG TIN MÓN VAY (3.66 · việc AI) — "sơ yếu lý lịch" món nợ xấu ----------
   Trang đầu tóm tắt đọc 30 giây (số chính · nhãn tình trạng · khả năng thu · hướng xử lý · việc tiếp theo · dòng thời gian),
   sau đó I–VI chi tiết. Chỉ dựng từ dữ liệu đã có — mục nào trống in "chưa có". In thẳng hoặc ra Word (.docx). */
var TDN_KQ = {giu:'✓ giữ đúng', that:'✗ thất hứa'};
function tdnCoCamKet(l){ return !!(l.camKet || l.camKetTien || l.camKetHan); }
function tdnHua(kuoc){
  var ds = NO.lan.filter(function(l){ return l.kuoc===kuoc && tdnCoCamKet(l); });
  var giu = ds.filter(function(l){ return l.ketQua==='giu'; }).length, that = ds.filter(function(l){ return l.ketQua==='that'; }).length;
  return {tong:ds.length, giu:giu, that:that, cho:ds.length-giu-that};
}
function tdnHuaChu(h){ return !h.tong ? '' : (h.giu+h.that ? 'Thất hứa '+h.that+'/'+(h.giu+h.that)+' lần' : '')+(h.cho ? (h.giu+h.that?' · ':'')+h.cho+' cam kết đang chờ' : ''); }
function tdnDatKQ(id, v){
  var l = NO.lan.find(function(x){ return x.id===id; }); if(!l) return;
  l.ketQua = l.ketQua===v ? '' : v; l.suaLuc = new Date().toISOString();
  luuNo(); veGhiChu();
}
/* bản số liệu mới nhất của món trong 1 danh sách (kể cả đã ra khỏi DS) */
function tdnSLCuoi(m, L){ var cc = tdnCacKy(m, L); if(!cc.length) return null; var k = cc[cc.length-1]; return {ky:k, s:m.loai[L].ky[k], dang:tdnDangCo(m, L)}; }
function tdnViecTiep(m){
  var hn = ngayISO(nay());
  var ck = NO.lan.filter(function(l){ return l.kuoc===m.kuoc && l.camKetHan && !l.ketQua; }).sort(function(a,b){ return a.camKetHan<b.camKetHan?-1:1; })[0];
  if(ck) return (ck.camKetHan<hn ? 'Đã quá hạn cam kết — ' : '')+'Thu theo cam kết'+(ck.camKetTien?' '+tdnTien(ck.camKetTien)+' đ':'')+', hạn '+ngayVN(ck.camKetHan);
  var pa = ((NO.ho[m.maKH]||{}).tt||{}).phuongAn;
  if(pa && pa.han) return 'Thực hiện phương án'+((pa.chon||[]).length?' ('+pa.chon.join(', ')+')':'')+', hạn '+pa.han;
  var l0 = tdnLanCua(m.kuoc)[0];
  if(!l0) return 'Chưa làm việc lần nào — cần lên lịch làm việc với hộ';
  return 'Chưa có hẹn mới — lần làm việc gần nhất '+ngayVN(l0.ngay)+' ('+tdnSoNgay(l0.ngay, hn)+' ngày trước)';
}
function tdnBoIco(t){ return String(t||'').replace(/^[^\wÀ-ỹĐđ]+\s*/, ''); }
function tdnNgayDL(d){ return !d ? '' : d.length===7 ? tdnKyVN(d) : ngayVN(d); }

/* dữ liệu phiếu — dùng chung cho bản in (HTML) và bản Word */
function tdnPhieuDL(m){
  var hn = ngayISO(nay()), ho = NO.ho[m.maKH] || {tt:{}, file:[]}, tt = ho.tt || {}, db = tdnDB(m), C = {};
  ['khd','nqh','nk'].forEach(function(k){ var c = tdnSLCuoi(m, k); if(c) C[k] = c; });
  var sk = C.khd ? C.khd.s : {}, KC = '(chưa có)';
  var tom = function(k){ var M = TDN_MUC.find(function(x){ return x.k===k; }); return tt[k] ? tdnTomMuc(M, tt[k]) : ''; };
  /* số chính: giá trị + kỳ số liệu */
  var soDS = function(L, f, fKhd){
    if(C[L]) return C[L].dang ? [tdnTien(C[L].s[f])+' đ', tdnKyVN(C[L].ky)] : ['0 đ', 'đã ra DS từ '+tdnKyVN(tdnThangSau(C[L].ky))];
    if(C.khd && fKhd) return [tdnTien(sk[fKhd])+' đ', tdnKyVN(C.khd.ky)];
    return [KC, ''];
  };
  var so = [['Dư nợ'].concat(C.khd ? [tdnTien(sk.dn)+' đ', tdnKyVN(C.khd.ky)] : [KC, 'chỉ có ở DS 3 tháng KHD']),
    ['Nợ quá hạn'].concat(soDS('nqh', 'qh', 'qh')), ['Nợ khoanh'].concat(soDS('nk', 'kh', 'kh')),
    ['Lãi tồn'].concat(C.khd ? [tdnTien(sk.lt)+' đ', tdnKyVN(C.khd.ky)] : [KC, ''])];
  /* nhãn tình trạng */
  var nhan = [];
  if(C.nqh && C.nqh.dang){ var q = C.nqh.s; var nq = q.ncq ? Math.max(0, tdnSoNgay(q.ncq, tdnCuoiKy(C.nqh.ky))) : -1;
    nhan.push(['do', 'QUÁ HẠN'+(nq<0 ? '' : nq<60 ? ' '+nq+' ngày' : ' '+Math.floor(nq/30.44)+' tháng')]); }
  if(C.nk && C.nk.dang) nhan.push(['do', 'NỢ KHOANH'+(C.nk.s.nhh ? ' đến '+ngayVN(C.nk.s.nhh) : '')]);
  if(C.khd && C.khd.dang) nhan.push(['vg', sk.ngd ? Math.floor(tdnSoNgay(sk.ngd, tdnCuoiKy(C.khd.ky))/30.44)+' THÁNG KHÔNG GIAO DỊCH' : 'KHÔNG GIAO DỊCH']);
  ['khd','nqh','nk'].forEach(function(k){ if(C[k] && !C[k].dang) nhan.push(['xam', 'Đã ra DS '+TDN_LOAI[k].ten+' từ '+tdnKyVN(tdnThangSau(C[k].ky))]);
    var p = tdnPhatSinhLai(m, k); if(p) nhan.push(['vg', '↻ Phát sinh lại DS '+TDN_LOAI[k].ten+' '+p+' lần']); });
  var hua = tdnHua(m.kuoc), hc = tdnHuaChu(hua); if(hc) nhan.push([hua.that ? 'do' : 'xa', hc]);
  /* dòng thời gian */
  var ev = [], da = {};
  var ad = function(d, t, k){ if(d && !da[d+t]){ da[d+t] = 1; ev.push({d:d, t:t, k:k||''}); } };
  if(sk.nv) ad(sk.nv, 'Giải ngân món vay '+tdnCT(m));
  if(sk.dh) ad(sk.dh, sk.dh<=hn ? 'Đến hạn trả nợ gốc' : 'Hạn trả nợ gốc (sắp tới)', sk.dh>hn ? 'toi' : '');
  if(sk.ngd) ad(sk.ngd, 'Giao dịch gần nhất (theo sao kê)');
  ['khd','nqh','nk'].forEach(function(L){
    var cc = tdnCacKy(m, L), ten = TDN_LOAI[L].ten; if(!cc.length) return;
    cc.forEach(function(k, i){
      var s = m.loai[L].ky[k];
      if(L==='nqh' && s.ncq) ad(s.ncq, 'Chuyển nợ quá hạn', 'do');
      if(L==='nk'){ if(s.nhl) ad(s.nhl, 'Khoanh nợ có hiệu lực'+(s.nn?' — '+s.nn:''), 'do'); if(s.nhh) ad(s.nhh, s.nhh>hn ? 'Hết hạn khoanh (sắp tới)' : 'Hết hạn khoanh', s.nhh>hn ? 'toi' : ''); }
      if(i===0) ad(k, 'Vào DS '+ten, 'do');
      else if(tdnThangSau(cc[i-1])!==k) ad(k, '↻ Phát sinh lại DS '+ten, 'do');
      if(i<cc.length-1 && tdnThangSau(k)!==cc[i+1]) ad(tdnThangSau(k), 'Ra khỏi DS '+ten, 'xanh');
    });
    if(!C[L].dang) ad(tdnThangSau(cc[cc.length-1]), 'Ra khỏi DS '+ten, 'xanh');
  });
  var lan = tdnLanCua(m.kuoc).slice().reverse(), tongThu = 0;
  lan.forEach(function(l){
    tongThu += +l.thu || 0;
    ad(l.ngay, 'Làm việc ('+(l.hinhThuc||'')+')'+(l.thu ? ' · thu '+tdnTien(l.thu)+' đ' : '')+(l.trangThai ? ' · '+l.trangThai : ''), l.thu ? 'xanh' : '');
    if(tdnCoCamKet(l)) ad(l.camKetHan || l.ngay, 'Hạn cam kết'+(l.camKetTien?' '+tdnTien(l.camKetTien)+' đ':'')+' — '+(l.ketQua ? TDN_KQ[l.ketQua] : (l.camKetHan && l.camKetHan>hn ? 'sắp tới' : 'chưa đánh giá')),
      l.ketQua==='that' ? 'do' : l.ketQua==='giu' ? 'xanh' : 'toi');
  });
  ev.sort(function(a, b){ return a.d<b.d ? -1 : a.d>b.d ? 1 : 0; });
  /* II. tình trạng ở 3 danh sách */
  var dsTT = ['khd','nqh','nk'].map(function(L){
    var cc = tdnCacKy(m, L), T = TDN_LOAI[L];
    if(!cc.length) return [T.ten, 'Không có trong danh sách'];
    var c = C[L], s = c.s, cuoi = tdnCuoiKy(c.ky), them = [];
    if(L==='khd' && s.ngd) them.push(Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44)+' tháng không GD');
    if(L==='nqh' && s.ncq) them.push('quá hạn '+tdnSoNgay(s.ncq, cuoi)+' ngày', 'TK105 '+tdnTien(s.tk105)+' đ');
    if(L==='nk') them.push('hiệu lực '+ngayVN(s.nhl)+' → '+ngayVN(s.nhh), s.nn ? 'nguyên nhân: '+s.nn : '');
    var p = tdnPhatSinhLai(m, L);
    return [T.ten, (c.dang ? 'Đang có (kỳ '+tdnKyVN(c.ky)+')' : 'Đã ra từ '+tdnKyVN(tdnThangSau(c.ky)))+' · có mặt từ '+tdnKyVN(cc[0])+(p ? ' · phát sinh lại '+p+' lần' : '')+
      (them.filter(Boolean).length ? ' · '+them.filter(Boolean).join(' · ') : '')];
  });
  /* bảng số dư qua các tháng — 12 kỳ gần nhất */
  var ky = {}; ['khd','nqh','nk'].forEach(function(L){ tdnCacKy(m, L).forEach(function(k){ ky[k] = 1; }); });
  var dsKy = Object.keys(ky).sort(), bot = dsKy.length>12 ? dsKy.length-12 : 0;
  var o = function(L, k, f){ var s = m.loai[L] && m.loai[L].ky && m.loai[L].ky[k]; return s ? tdnTien(s[f]) : '—'; };
  var bangKy = dsKy.slice(bot).map(function(k){ return [tdnKyVN(k), o('khd', k, 'dn'), o('nqh', k, 'qh'), o('nk', k, 'kh')]; });
  /* VI. món khác cùng hộ */
  var monKhac = Object.keys(NO.mon).map(function(k){ return NO.mon[k]; }).filter(function(x){ return x.maKH===m.maKH && x.kuoc!==m.kuoc; }).map(function(x){
    return [x.kuoc, tdnCT(x), ['khd','nqh','nk'].filter(function(L){ return x.loai && x.loai[L]; }).map(function(L){ return TDN_LOAI[L].ten+(tdnDangCo(x, L)?'':' (đã ra)'); }).join(', ')]; });
  var vt = ho.viTri, nv = tt.nguoiVay || {}, kn = (tt.khaNang||{}).chon || [];
  return {
    ten:m.ten||m.maKH, ngayLap:ngayVN(hn), kuoc:m.kuoc,
    so:so, nhan:nhan, khaNang:kn[0] || 'Chưa đánh giá', huong:tom('phuongAn') || 'Chưa có', viecTiep:tdnViecTiep(m), ev:ev,
    kh:[['Họ tên', m.ten||KC], ['Mã khách hàng', m.maKH||KC], ['Địa chỉ', [db.ap, db.xa].join(', ')], ['Điểm giao dịch', db.diem],
      ['Tổ TK&VV', (m.toTen ? 'Tổ trưởng '+m.toTen : '')+(m.maTo ? ' (mã '+m.maTo+')' : '') || KC], ['Hội đoàn thể', tdnHoi(m.dvut) || KC], ['SĐT liên hệ', nv.sdt || KC],
      ['Vị trí nhà', vt ? [vt.lat ? vt.lat.toFixed(6)+', '+vt.lng.toFixed(6) : (vt.link||''), vt.ghi||''].filter(Boolean).join(' · ') : KC]],
    mon:[['Số khế ước', m.kuoc], ['Chương trình', tdnCTDai(m)], ['Ngày giải ngân', sk.nv ? ngayVN(sk.nv) : KC],
      ['Ngày đến hạn', sk.dh ? ngayVN(sk.dh)+(sk.dhgd && sk.dhgd!==sk.dh ? ' · hạn GDX '+ngayVN(sk.dhgd) : '') : KC],
      ['Dư nợ / quá hạn / khoanh', so.slice(0,3).map(function(x){ return x[1]; }).join(' / ')], ['Lãi tồn / đã thu', C.khd ? tdnTien(sk.lt)+' / '+tdnTien(sk.ldt)+' đ' : KC],
      ['Ngày giao dịch gần nhất', sk.ngd ? ngayVN(sk.ngd) : KC]],
    dsTT:dsTT, bangKy:bangKy, bangKyBot:bot,
    muc:TDN_MUC.map(function(M){ var v = tt[M.k]; return [tdnBoIco(M.ten), v ? tdnTomMuc(M, v) : '', v && v.luc ? ngayVN(v.luc.slice(0,10)) : '']; }),
    lan:lan.map(function(l){ return [ngayVN(l.ngay), l.hinhThuc||'', [l.thucTrang, l.kienNghi ? 'Kiến nghị: '+l.kienNghi : ''].filter(Boolean).join('. '),
      tdnCoCamKet(l) ? [l.camKet, l.camKetTien ? tdnTien(l.camKetTien)+' đ' : '', l.camKetHan ? 'hạn '+ngayVN(l.camKetHan) : ''].filter(Boolean).join(', ')+' — '+(l.ketQua ? TDN_KQ[l.ketQua] : 'chờ') : '',
      l.thu ? tdnTien(l.thu) : '', l.trangThai||'']; }),
    tongThu:tongThu,
    file:(ho.file||[]).map(function(f){ return [TDN_NHOM_FILE[f.nhom] || 'Khác', f.k && f.k!=='rieng' ? tenFileBo(f) : f.ten]; }),
    monKhac:monKhac, nhanXet:tom('phuongAn')
  };
}

/* ---- bản in (HTML A4) ---- */
var PHIEU_CSS = '@page{size:A4;margin:14mm 14mm 14mm 18mm}body{font-family:"Times New Roman",serif;font-size:12.5pt;color:#000;margin:0}'+
  '.phieu+.phieu{page-break-before:always}h1{font-size:15pt;text-align:center;margin:0 0 2px}.phu{text-align:center;font-size:11pt;margin-bottom:8px}'+
  '.tom{border:.9px solid #000;padding:6px 9px;margin-bottom:8px}.tom-ten{font-size:13.5pt;font-weight:bold}.tom-dc{font-size:11pt;margin-bottom:4px}'+
  '.so{display:flex;border:1px solid #777;margin:4px 0}.so div{flex:1;padding:3px 5px;border-left:1px solid #777}.so div:first-child{border-left:0}'+
  '.so small{display:block;font-size:9.5pt;color:#444}.so b{font-size:12.5pt}.nhan{margin:5px 0}.nhan span{display:inline-block;border:1px solid #000;border-radius:3px;padding:0 5px;margin:0 4px 3px 0;font-size:10.5pt;font-weight:bold}'+
  '.nhan .do{background:#fde2df}.nhan .vg{background:#fff1c2}.nhan .xa{background:#e6f0fb}.nhan .xam{background:#eee;font-weight:normal}'+
  '.dong{margin:2px 0}.tiep{border-top:1px dashed #777;margin-top:4px;padding-top:3px;font-weight:bold}'+
  'h2{font-size:12.5pt;margin:10px 0 3px;text-transform:uppercase}table{width:100%;border-collapse:collapse;font-size:11pt}'+
  'td,th{border:1px solid #777;padding:2px 5px;vertical-align:top;text-align:left}th{background:#eee}.kv td:first-child{width:30%;color:#333}'+
  '.tg td:first-child{width:17%;white-space:nowrap}.tg .do td{color:#b3261e}.tg .xanh td{color:#1b6e2a}.tg .toi td{font-style:italic;color:#555}'+
  '.so-p{text-align:right;white-space:nowrap}.chua{color:#666;font-style:italic}.ky{display:flex;justify-content:flex-end;margin-top:14px}.ky div{text-align:center;width:45%}'+
  '.cham{border-bottom:.7px dotted #333;height:18px}';
function tdnPhieuHTML(d){
  var e = coChuHTML, kc = function(v){ return v ? e(v) : '<span class="chua">chưa có</span>'; };
  var kv = function(ds){ return '<table class="kv">'+ds.map(function(r){ return '<tr><td>'+e(r[0])+'</td><td>'+(/^\(chưa có\)$/.test(r[1]) ? kc('') : e(r[1]))+'</td></tr>'; }).join('')+'</table>'; };
  var bang = function(dau, ds, soCot){ return '<table><tr>'+dau.map(function(x){ return '<th>'+e(x)+'</th>'; }).join('')+'</tr>'+ds.map(function(r){
    return '<tr>'+r.map(function(c, i){ return '<td'+((soCot||[]).indexOf(i)>=0?' class="so-p"':'')+'>'+e(c)+'</td>'; }).join('')+'</tr>'; }).join('')+'</table>'; };
  var h = '<div class="phieu"><h1>PHIẾU THÔNG TIN MÓN VAY</h1><div class="phu">Khế ước số '+e(d.kuoc)+' · lập ngày '+e(d.ngayLap)+'</div>';
  h += '<div class="tom"><div class="tom-ten">'+e(d.ten)+'</div><div class="tom-dc">'+e(d.kh[1][1]+' · '+d.kh[2][1]+' · '+d.kh[4][1])+'</div>'+
    '<div class="so">'+d.so.map(function(x){ return '<div><small>'+e(x[0])+(x[2]?' · '+e(x[2]):'')+'</small><b>'+e(x[1])+'</b></div>'; }).join('')+'</div>'+
    (d.nhan.length ? '<div class="nhan">'+d.nhan.map(function(x){ return '<span class="'+x[0]+'">'+e(x[1])+'</span>'; }).join('')+'</div>' : '')+
    '<div class="dong"><b>Khả năng thu hồi:</b> '+e(d.khaNang)+'</div><div class="dong"><b>Hướng xử lý:</b> '+e(d.huong)+'</div>'+
    '<div class="tiep">▶ Việc tiếp theo: '+e(d.viecTiep)+'</div></div>';
  h += '<h2>Dòng thời gian</h2>'+(d.ev.length ? '<table class="tg">'+d.ev.map(function(x){ return '<tr class="'+x.k+'"><td>'+e(tdnNgayDL(x.d))+'</td><td>'+e(x.t)+'</td></tr>'; }).join('')+'</table>' : '<div class="chua">chưa có</div>');
  h += '<h2>I. Khách hàng</h2>'+kv(d.kh);
  h += '<h2>II. Món vay</h2>'+kv(d.mon)+'<div style="height:4px"></div>'+bang(['Danh sách','Tình trạng'], d.dsTT)+
    (d.bangKy.length ? '<div style="height:4px"></div>'+bang(['Kỳ','Dư nợ (3T KHD)','Quá hạn','Khoanh'], d.bangKy, [1,2,3])+(d.bangKyBot?'<div class="chua">(chỉ in 12 kỳ gần nhất)</div>':'') : '');
  h += '<h2>III. Hồ sơ hộ vay</h2>'+'<table class="kv">'+d.muc.map(function(r){ return '<tr><td>'+e(r[0])+(r[2]?'<br><small>cập nhật '+e(r[2])+'</small>':'')+'</td><td>'+kc(r[1])+'</td></tr>'; }).join('')+'</table>';
  h += '<h2>IV. Quá trình làm việc</h2>'+(d.lan.length ? bang(['Ngày','Hình thức','Nội dung chính','Cam kết','Đã thu','Trạng thái'], d.lan, [4])+
    '<div class="dong" style="text-align:right"><b>Tổng đã thu: '+tdnTien(d.tongThu)+' đ</b></div>' : '<div class="chua">chưa có lần làm việc nào</div>');
  h += '<h2>V. Tài liệu đã có</h2>'+(d.file.length ? bang(['Loại','Tên tài liệu'], d.file) : '<div class="chua">chưa có</div>');
  h += '<h2>VI. Món khác cùng hộ</h2>'+(d.monKhac.length ? bang(['Số khế ước','Chương trình','Danh sách'], d.monKhac) : '<div>Không có</div>');
  h += '<h2>Nhận xét, đề xuất</h2>'+(d.nhanXet ? '<div>'+e(d.nhanXet)+'</div>' : '')+'<div class="cham"></div><div class="cham"></div><div class="cham"></div>'+
    '<div class="ky"><div><i>Ngày …… tháng …… năm ……</i><br><b>NGƯỜI LẬP</b><br><br><br><br></div></div></div>';
  return h;
}
function tdnPhieuTrang(than, tieuDe){
  return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>'+coChuHTML(tieuDe)+'</title><style>'+PHIEU_CSS+'</style></head><body>'+than+'</body></html>';
}

/* ---- bản Word ---- */
function wBang(dau, ds, rong, o){
  o = o||{}; var tong = o.tong||9071, w = rong.map(function(x){ return Math.round(tong*x); });
  var vien = '<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(function(k){ return '<w:'+k+' w:val="single" w:sz="4" w:space="0" w:color="777777"/>'; }).join('')+'</w:tblBorders>';
  var o1 = function(t, j, dam, nen){ return '<w:tc><w:tcPr><w:tcW w:w="'+w[j]+'" w:type="dxa"/>'+(nen?'<w:shd w:val="clear" w:color="auto" w:fill="'+nen+'"/>':'')+'</w:tcPr>'+
    String(t==null?'':t).split('\n').map(function(x){ return wP([wR(x, {b:dam, sz:o.sz||22})], {sau:0, line:260, jc:(o.phai||[]).indexOf(j)>=0 ? 'right' : 'left'}); }).join('')+'</w:tc>'; };
  return '<w:tbl><w:tblPr><w:tblW w:w="'+tong+'" w:type="dxa"/>'+vien+'<w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+
    w.map(function(x){ return '<w:gridCol w:w="'+x+'"/>'; }).join('')+'</w:tblGrid>'+
    (dau ? '<w:tr>'+dau.map(function(t, j){ return o1(t, j, 1, 'EEEEEE'); }).join('')+'</w:tr>' : '')+
    ds.map(function(r){ return '<w:tr>'+r.map(function(t, j){ return o1(t, j, o.dam0 && j===0); }).join('')+'</w:tr>'; }).join('')+'</w:tbl>';
}
function tdnPhieuDocx(d){
  var P = [], h2 = function(t){ P.push(wP([wR(t.toUpperCase(), {b:1})], {tr:160, sau:60})); };
  var chua = function(v){ return v || 'chưa có'; };
  P.push(wP([wR('PHIẾU THÔNG TIN MÓN VAY', {b:1, sz:30})], {jc:'center', sau:0}));
  P.push(wP([wR('Khế ước số '+d.kuoc+' · lập ngày '+d.ngayLap, {i:1, sz:22})], {jc:'center', sau:120}));
  /* khung tóm tắt: bảng 1 ô */
  var tom = [wP([wR(d.ten, {b:1, sz:28})], {sau:0}), wP([wR(d.kh[1][1]+' · '+d.kh[2][1]+' · '+d.kh[4][1], {sz:22})], {sau:60})].join('')+
    wBang(null, [d.so.map(function(x){ return x[0]+(x[2]?' · '+x[2]:'')+'\n'+x[1]; })], [.25,.25,.25,.25], {sz:22, tong:8780})+
    (d.nhan.length ? wP([wR('Tình trạng: ', {b:1}), wR(d.nhan.map(function(x){ return '['+x[1]+']'; }).join('  '))], {tr:60, sau:0}) : '')+
    wP([wR('Khả năng thu hồi: ', {b:1}), wR(d.khaNang)], {sau:0})+wP([wR('Hướng xử lý: ', {b:1}), wR(d.huong)], {sau:0})+
    wP([wR('▶ Việc tiếp theo: '+d.viecTiep, {b:1})], {tr:60, sau:0});
  P.push('<w:tbl><w:tblPr><w:tblW w:w="9071" w:type="dxa"/><w:tblBorders>'+['top','left','bottom','right'].map(function(k){ return '<w:'+k+' w:val="single" w:sz="12" w:space="0" w:color="000000"/>'; }).join('')+
    '</w:tblBorders><w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>'+
    '<w:tblGrid><w:gridCol w:w="9071"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="9071" w:type="dxa"/></w:tcPr>'+tom+'<w:p/></w:tc></w:tr></w:tbl>');
  h2('Dòng thời gian');
  P.push(d.ev.length ? wBang(null, d.ev.map(function(x){ return [tdnNgayDL(x.d), x.t]; }), [.17,.83]) : wP('chưa có'));
  h2('I. Khách hàng'); P.push(wBang(null, d.kh.map(function(r){ return [r[0], r[1]==='(chưa có)' ? 'chưa có' : r[1]]; }), [.3,.7]));
  h2('II. Món vay'); P.push(wBang(null, d.mon.map(function(r){ return [r[0], r[1]==='(chưa có)' ? 'chưa có' : r[1]]; }), [.3,.7]));
  P.push(wP('', {sau:0})); P.push(wBang(['Danh sách','Tình trạng'], d.dsTT, [.22,.78]));
  if(d.bangKy.length){ P.push(wP('', {sau:0})); P.push(wBang(['Kỳ','Dư nợ (3T KHD)','Quá hạn','Khoanh'], d.bangKy, [.16,.28,.28,.28], {phai:[1,2,3]})); if(d.bangKyBot) P.push(wP([wR('(chỉ in 12 kỳ gần nhất)', {i:1, sz:22})])); }
  h2('III. Hồ sơ hộ vay'); P.push(wBang(null, d.muc.map(function(r){ return [r[0]+(r[2]?'\ncập nhật '+r[2]:''), chua(r[1])]; }), [.3,.7]));
  h2('IV. Quá trình làm việc');
  if(d.lan.length){ P.push(wBang(['Ngày','Hình thức','Nội dung chính','Cam kết','Đã thu','Trạng thái'], d.lan, [.11,.14,.32,.2,.1,.13], {phai:[4], sz:20}));
    P.push(wP([wR('Tổng đã thu: '+tdnTien(d.tongThu)+' đ', {b:1})], {jc:'right'})); }
  else P.push(wP([wR('chưa có lần làm việc nào', {i:1})]));
  h2('V. Tài liệu đã có'); P.push(d.file.length ? wBang(['Loại','Tên tài liệu'], d.file, [.28,.72]) : wP([wR('chưa có', {i:1})]));
  h2('VI. Món khác cùng hộ'); P.push(d.monKhac.length ? wBang(['Số khế ước','Chương trình','Danh sách'], d.monKhac, [.2,.3,.5]) : wP('Không có'));
  h2('Nhận xét, đề xuất'); if(d.nhanXet) P.push(wP(d.nhanXet));
  for(var i=0;i<3;i++) P.push(wP([wR(Array(130).join('.'))]));
  P.push(wBangKy(['', 'NGƯỜI LẬP']));
  return P.join('');
}
var W_NGAT_TRANG = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
function giaoFile(bl, ten){
  var f = new File([bl], ten, {type:bl.type});
  if(!laMayBan() && navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
  var a = document.createElement('a'), u = URL.createObjectURL(bl); a.href = u; a.download = ten; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(u); }, 5000);
}

/* ---- mở phiếu: 1 món (xem trước trong hộp) hoặc cả nhánh đang lọc ---- */
var PHIEU = {ds:[], ten:''};
function tdnPhieu(kuoc){
  var m = NO.mon[kuoc]; if(!m) return;
  PHIEU = {ds:[kuoc], ten:'Phieu TT mon vay - '+boDauTen(m.ten)+' - '+kuoc};
  var trang = tdnPhieuTrang(tdnPhieuHTML(tdnPhieuDL(m)), 'Phiếu thông tin món vay — '+m.ten);
  moHop('<div class="hop-tit">🧾 Phiếu thông tin món vay — '+coChuHTML(m.ten)+'</div>'+
    '<iframe class="phieu-xem" id="phieu-xem"></iframe>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button><button class="nho" onclick="tdnPhieuWord()">📄 Ra Word</button><button class="nho chinh" onclick="tdnPhieuIn()">🖨 In</button></div>', true);
  var f = document.getElementById('phieu-xem'); xemChuan(f, trang);
}
function tdnPhieuNhanh(){
  var L = TDN.loai, ds = tdnDSLoai(L); if(!ds.length) return bao('Không có món nào đang hiện để in.', 4);
  var C = TDN.cay, nhanh = C ? [C.xa, C.diem, C.ap, C.to ? 'Tổ '+C.to : ''].filter(Boolean).join(' › ') : 'toàn bộ danh sách';
  ds.sort(function(a, b){ var x = tdnDB(a), y = tdnDB(b); return (x.xa+x.diem+x.ap+x.maTo+(a.ten||'')).localeCompare(y.xa+y.diem+y.ap+y.maTo+(b.ten||''), 'vi'); });
  PHIEU = {ds:ds.map(function(m){ return m.kuoc; }), ten:'Phieu TT mon vay - '+boDauTen(TDN_LOAI[L].ten+' '+(C ? nhanh : ''))+' - '+ds.length+' mon'};
  moHop('<div class="hop-tit">🧾 In phiếu thông tin — '+ds.length+' món</div>'+
    '<div class="hop-phu">'+coChuHTML(TDN_LOAI[L].ten)+' · '+coChuHTML(nhanh)+' · '+(TDN.loc==='dang'?'đang có':TDN.loc==='ra'?'đã ra khỏi DS':'tất cả')+(TDN.tim?' · tìm "'+coChuHTML(TDN.tim)+'"':'')+
      '. Mỗi món 1 phiếu (sang trang mới), xếp theo Xã › Điểm › Ấp › Tổ. Muốn in ít hơn: chọn một nhánh ở 🌳 Cây địa bàn hoặc gõ tìm trước.</div>'+
    (ds.length>40 ? '<div class="huong-dan">⚠ '+ds.length+' phiếu — khá nhiều giấy, nên chọn một nhánh nhỏ hơn.</div>' : '')+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi (Esc)</button><button class="nho" onclick="tdnPhieuWord()">📄 Ra Word</button><button class="nho chinh" onclick="tdnPhieuIn()">🖨 In '+ds.length+' phiếu</button></div>', true);
}
function tdnPhieuMon(){ return PHIEU.ds.map(function(k){ return NO.mon[k]; }).filter(Boolean); }
function tdnPhieuIn(){
  var ds = tdnPhieuMon(); if(!ds.length) return;
  var html = tdnPhieuTrang(ds.map(function(m){ return tdnPhieuHTML(tdnPhieuDL(m)); }).join(''), 'Phiếu thông tin món vay');
  inBlob(new Blob([html], {type:'text/html'}), PHIEU.ten+'.html');
}
function tdnPhieuWord(){
  var ds = tdnPhieuMon(); if(!ds.length) return;
  var ten = PHIEU.ten+'.docx';
  taoDocx(ds.map(function(m){ return tdnPhieuDocx(tdnPhieuDL(m)); }).join(W_NGAT_TRANG)).then(function(bl){
    giaoFile(bl, ten);
    bao('Đã tạo '+ten+' — mở bằng Word để sửa, in.', 7);
  });
}
/* ---------- 🖨 DANH SÁCH CHI TIẾT + TỔNG HỢP THEO XÃ, ĐIỂM GD (3.67 · việc AH) ----------
   Chi tiết: đúng lọc đang xem (loại, Đang có / Đã ra / Tất cả, nhánh cây, ô tìm), gom Xã › Điểm GD › Ấp, xếp theo tổ; dòng cộng từng nhóm + tổng cộng.
   Tổng hợp: 3 danh sách cạnh nhau (món đang có ở kỳ mới nhất), theo Xã › Điểm GD + tổng PGD. In A4 ngang hoặc Xuất Excel. */
var TDN_IN = {kieu:'ct'};
var TDN_TIEN = {khd:'Dư nợ', nqh:'Dư nợ quá hạn', nk:'Dư nợ khoanh'};
var TDN_MOC = {khd:'Ngày GD gần nhất', nqh:'Ngày chuyển QH', nk:'Ngày hết hạn khoanh'};
function tdnMocMon(m, L, s){
  if(!s) return '';
  var cuoi = tdnCuoiKy(tdnKyMoi(L) || tdnCacKy(m, L).slice(-1)[0]);
  if(L==='khd') return s.ngd ? ngayVN(s.ngd)+' ('+Math.floor(tdnSoNgay(s.ngd, cuoi)/30.44)+' th)' : '';
  if(L==='nqh') return s.ncq ? ngayVN(s.ncq)+' ('+tdnSoNgay(s.ncq, cuoi)+' ngày)' : '';
  return s.nhh ? ngayVN(s.nhh) : '';
}
/* dữ liệu chi tiết: [{xa, diem, ap, ds:[dòng]}] đã xếp */
function tdnInCT(){
  var L = TDN.loai, ds = tdnDSLoai(L), nhom = {};
  ds.forEach(function(m){
    var db = tdnDB(m), cc = tdnCacKy(m, L), s = tdnSL(m, L), sx = s || m.loai[L].ky[cc[cc.length-1]];
    var k = db.xa+'\u0001'+db.diem+'\u0001'+db.ap;
    (nhom[k] = nhom[k] || {xa:db.xa, diem:db.diem, ap:db.ap, ds:[]}).ds.push({m:m, to:m.toTen||m.maTo||'', maTo:db.maTo, tien:tdnSoChinh(L, sx),
      moc:tdnMocMon(m, L, sx), tt:tdnTrangThai(m.kuoc, L)+(s ? '' : ' · đã ra DS từ '+tdnKyVN(tdnThangSau(cc[cc.length-1])))});
  });
  var so = function(a, b){ return a.localeCompare(b, 'vi'); };
  return Object.keys(nhom).map(function(k){ return nhom[k]; }).sort(function(a, b){ return so(a.xa, b.xa) || so(a.diem, b.diem) || so(a.ap, b.ap); })
    .map(function(g){ g.ds.sort(function(a, b){ return so(a.maTo, b.maTo) || so(a.m.ten||'', b.m.ten||''); }); return g; });
}
function tdnInMoTa(){
  var C = TDN.cay;
  return [TDN.loc==='dang' ? 'đang có trong DS' : TDN.loc==='ra' ? 'đã ra khỏi DS' : 'tất cả (đang có + đã ra)',
    C ? [C.xa, C.diem, C.ap, C.to ? 'Tổ '+C.to : ''].filter(Boolean).join(' › ') : '', TDN.tim ? 'tìm "'+TDN.tim+'"' : ''].filter(Boolean).join(' · ');
}
/* dữ liệu tổng hợp: [{xa, t:{L:{n,t,c}}, diem:[{ten, t}]}] + tổng */
function tdnInTH(){
  var xa = {}, tong = {};
  var cong = function(o, L, v, chua){ var x = o[L] = o[L] || {n:0, t:0, c:0}; x.n++; x.t += v; if(chua) x.c++; };
  ['khd','nqh','nk'].forEach(function(L){
    if(!tdnKyMoi(L)) return;
    Object.keys(NO.mon).forEach(function(k){
      var m = NO.mon[k], s = tdnSL(m, L); if(!s) return;
      var db = tdnDB(m), v = tdnSoChinh(L, s), chua = tdnTrangThai(m.kuoc, L)==='Chưa làm việc';
      var X = xa[db.xa] = xa[db.xa] || {xa:db.xa, t:{}, dm:{}}, Dm = X.dm[db.diem] = X.dm[db.diem] || {ten:db.diem, t:{}};
      cong(X.t, L, v, chua); cong(Dm.t, L, v, chua); cong(tong, L, v, chua);
    });
  });
  var so = function(a, b){ return a.localeCompare(b, 'vi'); };
  return {tong:tong, xa:Object.keys(xa).sort(so).map(function(k){ var X = xa[k]; X.diem = Object.keys(X.dm).sort(so).map(function(d){ return X.dm[d]; }); return X; })};
}
function tdnInKyChu(){ return ['khd','nqh','nk'].map(function(L){ return tdnKyMoi(L) ? TDN_LOAI[L].ten+' kỳ '+tdnKyVN(tdnKyMoi(L)) : ''; }).filter(Boolean).join(' · '); }

/* ---- bản in ---- */
var TDN_IN_CSS = '@page{size:A4 landscape;margin:10mm 10mm 12mm 12mm}body{font-family:"Times New Roman",serif;font-size:11pt;color:#000;margin:0}'+
  'h1{font-size:14pt;text-align:center;margin:0}.phu{text-align:center;font-size:10.5pt;margin:2px 0 8px}'+
  'table{width:100%;border-collapse:collapse}th,td{border:1px solid #666;padding:2px 4px;vertical-align:top}th{background:#eee;font-size:10pt}'+
  'td.s{text-align:right;white-space:nowrap}td.c{text-align:center}tr.x td{background:#dfe8f3;font-weight:bold}tr.d td{background:#eef3f9;font-weight:bold}tr.a td{background:#f6f6f6;font-style:italic}'+
  'tr.tc td{background:#ddd;font-weight:bold}tr.dm td:first-child{padding-left:16px}thead{display:table-header-group}tr{page-break-inside:avoid}'+
  '.ky{display:flex;justify-content:space-between;margin-top:14px}.ky div{text-align:center;width:40%}';
function tdnInHTML(kieu){
  var e = coChuHTML, t = tdnTien, h = '';
  if(kieu==='ct'){
    var L = TDN.loai, G = tdnInCT(), ky = tdnKyMoi(L), n = 0, tong = 0;
    h += '<h1>DANH SÁCH '+e(TDN_LOAI[L].dai.toUpperCase())+(ky ? ' ĐẾN NGÀY '+ngayVN(tdnCuoiKy(ky)) : '')+'</h1><div class="phu">'+e(tdnInMoTa())+'</div>';
    h += '<table><thead><tr><th>STT</th><th>Họ tên khách hàng</th><th>Mã KH</th><th>Số khế ước</th><th>Tổ trưởng</th><th>Chương trình</th><th>'+TDN_TIEN[L]+'</th><th>'+TDN_MOC[L]+'</th><th>Trạng thái</th><th style="width:15%">Ghi chú</th></tr></thead><tbody>';
    var cXa = '', cDm = '', sum = function(f){ return G.filter(f).reduce(function(a, g){ return [a[0]+g.ds.length, a[1]+g.ds.reduce(function(b, r){ return b+r.tien; }, 0)]; }, [0, 0]); };
    G.forEach(function(g){
      if(g.xa!==cXa){ cXa = g.xa; cDm = ''; var sx = sum(function(z){ return z.xa===g.xa; }); h += '<tr class="x"><td colspan="6">'+e(g.xa)+' — '+sx[0]+' món</td><td class="s">'+t(sx[1])+'</td><td colspan="3"></td></tr>'; }
      if(g.diem!==cDm){ cDm = g.diem; var sd = sum(function(z){ return z.xa===g.xa && z.diem===g.diem; }); h += '<tr class="d"><td colspan="6">Điểm GD '+e(g.diem)+' — '+sd[0]+' món</td><td class="s">'+t(sd[1])+'</td><td colspan="3"></td></tr>'; }
      var sa = g.ds.reduce(function(b, r){ return b+r.tien; }, 0);
      h += '<tr class="a"><td colspan="6">'+e(g.ap)+' — '+g.ds.length+' món</td><td class="s">'+t(sa)+'</td><td colspan="3"></td></tr>';
      g.ds.forEach(function(r){ n++; tong += r.tien;
        h += '<tr><td class="c">'+n+'</td><td>'+e(r.m.ten||'')+'</td><td>'+e(r.m.maKH||'')+'</td><td>'+e(r.m.kuoc)+'</td><td>'+e(r.to)+'</td><td>'+e(tdnCT(r.m))+'</td><td class="s">'+t(r.tien)+'</td><td>'+e(r.moc)+'</td><td>'+e(r.tt)+'</td><td></td></tr>'; });
    });
    h += '<tr class="tc"><td colspan="6">TỔNG CỘNG — '+n+' món</td><td class="s">'+t(tong)+'</td><td colspan="3"></td></tr></tbody></table>';
  } else {
    var T = tdnInTH(), LS = ['khd','nqh','nk'].filter(function(L){ return tdnKyMoi(L); });
    var o3 = function(x){ return LS.map(function(L){ var v = x[L] || {n:0, t:0, c:0}; if(!v.n) return '<td class="s">—</td><td></td><td></td>'; return '<td class="s">'+v.n+'</td><td class="s">'+t(v.t)+'</td><td class="s">'+(v.c||'')+'</td>'; }).join(''); };
    h += '<h1>TỔNG HỢP MÓN VAY CẦN THEO DÕI THEO XÃ, ĐIỂM GIAO DỊCH</h1><div class="phu">'+e(tdnInKyChu())+' · món đang có trong danh sách</div>';
    h += '<table><thead><tr><th rowspan="2">Xã, phường / Điểm giao dịch</th>'+LS.map(function(L){ return '<th colspan="3">'+e(TDN_LOAI[L].ten)+' ('+tdnKyVN(tdnKyMoi(L))+')</th>'; }).join('')+'</tr>'+
      '<tr>'+LS.map(function(){ return '<th>Món</th><th>Số tiền</th><th>Chưa LV</th>'; }).join('')+'</tr></thead><tbody>';
    T.xa.forEach(function(X){
      h += '<tr class="x"><td>'+e(X.xa)+'</td>'+o3(X.t)+'</tr>';
      X.diem.forEach(function(Dm){ h += '<tr class="dm"><td>'+e(Dm.ten)+'</td>'+o3(Dm.t)+'</tr>'; });
    });
    h += '<tr class="tc"><td>TỔNG CỘNG PGD</td>'+o3(T.tong)+'</tr></tbody></table><div class="phu" style="text-align:left">Số tiền: '+
      LS.map(function(L){ return TDN_LOAI[L].ten+' = '+TDN_TIEN[L].toLowerCase(); }).join('; ')+'. "Chưa LV": số món chưa ghi lần làm việc nào. Một món có thể nằm ở nhiều danh sách.</div>';
  }
  h += '<div class="ky"><div></div><div><i>Ngày …… tháng …… năm ……</i><br><b>NGƯỜI LẬP</b></div></div>';
  return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Danh sách</title><style>'+TDN_IN_CSS+'</style></head><body>'+h+'</body></html>';
}
/* ---- Excel ---- */
function tdnInAOA(kieu){
  var a = [];
  if(kieu==='ct'){
    var L = TDN.loai, G = tdnInCT(), ky = tdnKyMoi(L), n = 0, tong = 0, cXa = '', cDm = '';
    a.push(['DANH SÁCH '+TDN_LOAI[L].dai.toUpperCase()+(ky ? ' ĐẾN NGÀY '+ngayVN(tdnCuoiKy(ky)) : '')], [tdnInMoTa()], []);
    a.push(['STT','Xã, phường','Điểm GD','Ấp','Họ tên khách hàng','Mã KH','Số khế ước','Tổ trưởng','Mã tổ','Chương trình',TDN_TIEN[L],TDN_MOC[L],'Trạng thái','Ghi chú']);
    var sum = function(f){ return G.filter(f).reduce(function(x, g){ return [x[0]+g.ds.length, x[1]+g.ds.reduce(function(b, r){ return b+r.tien; }, 0)]; }, [0, 0]); };
    G.forEach(function(g){
      if(g.xa!==cXa){ cXa = g.xa; cDm = ''; var sx = sum(function(z){ return z.xa===g.xa; }); a.push(['', g.xa, '', '', 'Cộng xã: '+sx[0]+' món', '', '', '', '', '', sx[1]]); }
      if(g.diem!==cDm){ cDm = g.diem; var sd = sum(function(z){ return z.xa===g.xa && z.diem===g.diem; }); a.push(['', g.xa, g.diem, '', 'Cộng điểm: '+sd[0]+' món', '', '', '', '', '', sd[1]]); }
      a.push(['', g.xa, g.diem, g.ap, 'Cộng ấp: '+g.ds.length+' món', '', '', '', '', '', g.ds.reduce(function(b, r){ return b+r.tien; }, 0)]);
      g.ds.forEach(function(r){ n++; tong += r.tien; a.push([n, g.xa, g.diem, g.ap, r.m.ten||'', r.m.maKH||'', r.m.kuoc, r.to, r.maTo, tdnCT(r.m), r.tien, r.moc, r.tt, '']); });
    });
    a.push(['', '', '', '', 'TỔNG CỘNG: '+n+' món', '', '', '', '', '', tong]);
  } else {
    var T = tdnInTH(), LS = ['khd','nqh','nk'].filter(function(L){ return tdnKyMoi(L); });
    var o3 = function(x){ var r = []; LS.forEach(function(L){ var v = x[L] || {n:0, t:0, c:0}; r.push(v.n, v.t, v.c); }); return r; };
    a.push(['TỔNG HỢP MÓN VAY CẦN THEO DÕI THEO XÃ, ĐIỂM GIAO DỊCH'], [tdnInKyChu()], []);
    var d1 = ['Xã, phường', 'Điểm giao dịch']; LS.forEach(function(L){ d1.push(TDN_LOAI[L].ten+' — món', TDN_LOAI[L].ten+' — số tiền', TDN_LOAI[L].ten+' — chưa LV'); }); a.push(d1);
    T.xa.forEach(function(X){ a.push([X.xa, 'Cộng xã'].concat(o3(X.t))); X.diem.forEach(function(Dm){ a.push([X.xa, Dm.ten].concat(o3(Dm.t))); }); });
    a.push(['TỔNG CỘNG PGD', ''].concat(o3(T.tong)));
  }
  return a;
}
function tdnInExcel(){
  var kieu = TDN_IN.kieu;
  Promise.resolve(window.XLSX || napMotTV(THU_VIEN.find(function(x){ return x.ten==='xlsx'; }))).then(function(){
    if(!window.XLSX) throw new Error('Chưa tải được bộ Excel — có mạng một lần rồi thử lại.');
    var ws = XLSX.utils.aoa_to_sheet(tdnInAOA(kieu)), wb = XLSX.utils.book_new();
    ws['!cols'] = kieu==='ct' ? [5,16,16,16,24,11,15,20,8,12,14,18,22,18].map(function(w){ return {wch:w}; }) : [18,20,8,14,8,8,14,8,8,14,8].map(function(w){ return {wch:w}; });
    XLSX.utils.book_append_sheet(wb, ws, kieu==='ct' ? 'Chi tiet' : 'Tong hop');
    var ten = (kieu==='ct' ? 'DS '+{khd:'3T KHD', nqh:'No qua han', nk:'No khoanh'}[TDN.loai]+' - '+tdnKyVN(tdnKyMoi(TDN.loai)).replace('/', '-') : 'Tong hop theo xa diem GD - '+ngayVN(ngayISO(nay())).replace(/\//g, '-'))+'.xlsx';
    var u = XLSX.write(wb, {type:'array', bookType:'xlsx'});
    giaoFile(new Blob([u], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), ten);
    bao('Đã xuất '+ten, 5);
  }).catch(function(e){ baoLoi(e.message || String(e)); });
}
function tdnInDS(kieu){
  if(kieu) TDN_IN.kieu = kieu;
  var k = TDN_IN.kieu, n = k==='ct' ? tdnDSLoai(TDN.loai).length : 0;
  moHop('<div class="hop-tit">🖨 Danh sách — Theo dõi nợ</div>'+
    '<div class="hang-nut tdn-in-chon"><span class="tdn-seg">'+[['ct','☰ Chi tiết · '+TDN_LOAI[TDN.loai].ten],['th','Σ Tổng hợp theo xã, điểm GD']].map(function(x){
      return '<button class="'+(k===x[0]?'bat':'')+'" onclick="tdnInDS(\''+x[0]+'\')">'+coChuHTML(x[1])+'</button>'; }).join('')+'</span></div>'+
    '<div class="hop-phu">'+(k==='ct' ? n+' món · '+coChuHTML(tdnInMoTa())+'. Theo đúng lọc đang xem — muốn khác thì đóng hộp, đổi lọc / chọn nhánh 🌳 rồi mở lại.'
      : 'Cả 3 danh sách, món đang có ở kỳ mới nhất (không theo lọc). '+coChuHTML(tdnInKyChu()))+'</div>'+
    '<iframe class="phieu-xem" id="tdn-in-xem"></iframe>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button><button class="nho" onclick="tdnInExcel()">📊 Xuất Excel</button><button class="nho chinh" onclick="tdnInIn()">🖨 In</button></div>', true);
  var f = document.getElementById('tdn-in-xem'); xemChuan(f, tdnInHTML(k));
}
function tdnInIn(){ inBlob(new Blob([tdnInHTML(TDN_IN.kieu)], {type:'text/html'}), 'Danh sach.html'); }
/* ---------- nhắc ở Hôm nay ---------- */
function tdnViecCan(){
  if(!NO_SAN) return {n:0, p:''};
  var hn = ngayISO(nay()), ck = 0, kh = 0;
  NO.lan.forEach(function(l){ if(l.camKetHan && l.camKetHan<=hn && !l.ketQua && !/thu hồi hết/.test(l.trangThai||'') && tdnLanCua(l.kuoc, l.loai)[0]===l) ck++; });
  var ky = tdnKyMoi('nk');
  if(ky) Object.keys(NO.mon).forEach(function(k){ var s = tdnSL(NO.mon[k], 'nk'); if(s && s.nhh && tdnSoNgay(hn, s.nhh)<=183 && tdnSoNgay(hn, s.nhh)>=0) kh++; });
  return {n:ck+kh, p:[ck?ck+' cam kết đến hạn':'', kh?kh+' sắp hết hạn khoanh':''].filter(Boolean).join(' · ')};
}
function veGhiChu(){
  if(tvPhan()==='no'){   /* 3.64: ⚠ Theo dõi nợ */
    document.getElementById('loc-gc').innerHTML = thanhTV();
    document.getElementById('ds-gc').innerHTML = veTheoDoiNo();
    return;
  }
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
