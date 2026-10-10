/* ==========================================================
   21. CÀI ĐẶT 3.40 — MỌI DANH MỤC SỬA TRÊN GIAO DIỆN, TỰ LƯU
   Một bộ sửa dùng chung cho: Mảng · Chương trình vay · Loại văn bản · Tag từng tab · Nhãn ghi chú · Hội đoàn thể.
   Mỗi dòng: tên · (viết tắt / tên đầy đủ) · (từ khóa nhận dạng) · số file đang dùng · ↑ ↓ ✕.
   Đổi tên → file cũ đổi theo. Xóa mục đang có file → hỏi chuyển các file đó sang mục nào (hoặc bỏ trống).
   ========================================================== */
var TK_GOC = {mang:TU_KHOA_MANG, ct:TU_KHOA_CT, tag:TU_KHOA_TAG};
/* từ khóa = bộ gói sẵn trong app, anh sửa dòng nào thì dòng đó theo anh (D.cauHinh.tuKhoa) */
function tuKhoaCua(nhom){
  var goc = TK_GOC[nhom] || {}, rieng = (D.cauHinh.tuKhoa||{})[nhom] || {}, ra = {};
  Object.keys(goc).forEach(function(k){ ra[k] = goc[k]; });
  Object.keys(rieng).forEach(function(k){ ra[k] = rieng[k]; });
  return ra;
}
function vietTatLoai(loai){
  var r = (D.cauHinh.vtLoai||{})[loai];
  if(r) return r;
  return VIET_TAT_LOAI[loai] || 'VB';
}
function locMacDinh(che){
  var r = (D.cauHinh.scanLoc||{})[che];
  return (r && TEN_LOC[r]) ? r : (che==='the' ? 'magic' : 'giay');
}
/* cỡ in CCCD: thẻ rộng 80–(190−khe)/2 mm, khe giữa 2 mặt 2–15 mm; 4 người/A4 luôn vừa */
var IN_THE_MD = {rong:92, khe:6};
function cauHinhInThe(){
  var c = D.cauHinh.inThe || {};
  var khe = parseFloat(c.khe); if(!isFinite(khe)) khe = IN_THE_MD.khe;
  khe = Math.max(2, Math.min(15, khe));
  var toiDa = Math.min((190 - khe)/2, 97);
  var rong = parseFloat(c.rong); if(!isFinite(rong)) rong = IN_THE_MD.rong;
  rong = Math.max(80, Math.min(toiDa, rong));
  var cao = rong/(THE_MM.rong/THE_MM.cao), kheNguoi = (297 - 20 - 4*cao)/3;
  return {rong:Math.round(rong*10)/10, khe:khe, cao:Math.round(cao*10)/10, kheNguoi:Math.round(kheNguoi*10)/10, toiDa:Math.floor(toiDa*10)/10};
}

function dmMoTa(loai){
  var c = D.cauHinh, p = loai.split(':');
  if(p[0]==='tag') return {
    ten: p[1]==='ghiChu' ? 'Nhãn ghi chú' : 'Tag',
    lay: function(){ return dsTag(p[1]).slice(); },
    ghi: function(ds){ c.tagTab = c.tagTab || {}; c.tagTab[p[1]] = ds; },
    macDinh: (TAG_MAC_DINH[p[1]]||[]).slice(),
    tk: p[1]==='vanBan' ? 'tag' : ''};
  if(loai==='mang') return {ten:'Mảng nghiệp vụ', lay:function(){ return (c.nghiepVu||[]).slice(); },
    ghi:function(ds){ c.nghiepVu = ds; }, macDinh:MAC_DINH.nghiepVu.slice(), tk:'mang'};
  if(loai==='ct') return {ten:'Chương trình vay', lay:function(){ return (c.chuongTrinh||[]).slice(); },
    ghi:function(ds){ c.chuongTrinh = ds; }, macDinh:MAC_DINH.chuongTrinh.slice(), tk:'ct',
    phu:'Tên đầy đủ', layPhu:function(t){ return (c.ctTen||{})[t]||''; },
    ghiPhu:function(t, v){ c.ctTen = c.ctTen || {}; if(v) c.ctTen[t] = v; else delete c.ctTen[t]; }};
  if(loai==='loai') return {ten:'Loại văn bản', lay:function(){ return (c.loaiVB||[]).slice(); },
    ghi:function(ds){ c.loaiVB = ds; }, macDinh:MAC_DINH.loaiVB.slice(), tk:'',
    phu:'Viết tắt trong tên file', hep:true, layPhu:function(t){ return vietTatLoai(t); },
    ghiPhu:function(t, v){ c.vtLoai = c.vtLoai || {}; if(v) c.vtLoai[t] = v; else delete c.vtLoai[t]; }};
  if(loai==='hoi') return {ten:'Hội đoàn thể', lay:function(){ return dsHoiDoanThe().slice(); },
    ghi:function(ds){ c.hoiDoanThe = ds; }, macDinh:['HND','HPN','CCB','ĐTN'], tk:''};
  return null;
}
/* đếm (doi===undefined) hoặc đổi tên / bỏ (doi = tên mới, '' = bỏ trống) ở mọi file đang dùng */
function dmDung(loai, ten, doi){
  var sua = doi!==undefined, dem = 0, p = loai.split(':');
  function mot(m, k){ if(m && m[k]===ten){ dem++; if(sua) m[k] = doi; } }
  function nhieu(m, k){
    var a = m && m[k]; if(!a || !a.length) return false;
    var i = a.indexOf(ten); if(i<0) return false;
    if(sua){ a.splice(i, 1); if(doi && a.indexOf(doi)<0) a.splice(i, 0, doi); }
    return true;
  }
  var cho = D.cho || [];
  if(loai==='mang') [].concat(D.vanBan, D.bieuMau||[], cho).forEach(function(m){ mot(m, 'mang'); });
  else if(loai==='ct'){
    [].concat(D.vanBan, D.scan||[], cho).forEach(function(m){ if(nhieu(m, 'ctrinh')) dem++; });
    (D.bieuMau||[]).forEach(function(m){ mot(m, 'nhom'); });
  }
  else if(loai==='loai') [].concat(D.vanBan, cho).forEach(function(m){ mot(m, 'loai'); });
  else if(loai==='hoi') [].concat(D.duLieu, cho).forEach(function(m){ if(nhieu(m, 'hoi')) dem++; });
  else if(p[0]==='tag'){
    var kho = {vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu, scan:D.scan||[], bieuMau:D.bieuMau||[]}[p[1]] || [];
    kho.forEach(function(m){ var a = nhieu(m, 'the'), b = nhieu(m, 'tag'); if(a||b) dem++; });
  }
  if(sua){
    /* bộ lọc đang chọn tên cũ thì theo tên mới */
    Object.keys(LOC).forEach(function(t){ var L = LOC[t];
      Object.keys(L).forEach(function(k){ if(L[k]===ten) L[k] = doi||''; }); });
  }
  return dem;
}
function dmId(loai){ return 'dm-'+loai.replace(/[^a-zA-Z0-9]/g,'-'); }
function dmHTML(loai){
  var mt = dmMoTa(loai); if(!mt) return '';
  var ds = mt.lay(), tk = mt.tk ? tuKhoaCua(mt.tk) : null, q = '\''+loai+'\'';
  var h = '<div class="dm" id="'+dmId(loai)+'" data-loai="'+loai+'">'+
    '<div class="dm-dau"><span>Tên</span>'+(mt.phu?'<span class="'+(mt.hep?'dm-hep':'dm-phu')+'">'+mt.phu+'</span>':'')+
    (tk?'<span class="dm-tk">Từ khóa nhận dạng</span>':'')+'<span class="dm-cuoi"></span></div>';
  ds.forEach(function(ten, i){
    var so = dmDung(loai, ten);
    h += '<div class="dm-dong">'+
      '<input class="dm-ten" value="'+coChuHTML(ten)+'" onchange="dmDoiTen('+q+','+i+',this)" title="Sửa tên — file đang dùng đổi theo">'+
      (mt.phu?'<input class="'+(mt.hep?'dm-hep':'dm-phu')+'" value="'+coChuHTML(mt.layPhu(ten))+'" placeholder="'+mt.phu+'" onchange="dmDoiPhu('+q+','+i+',this.value)">':'')+
      (tk?'<input class="dm-tk" value="'+coChuHTML((tk[ten]||[]).join(', '))+'" placeholder="cách nhau dấu phẩy" onchange="dmDoiTK('+q+','+i+',this.value)">':'')+
      '<span class="dm-cuoi"><span class="dm-so">'+(so?so+' file':'')+'</span>'+
      '<button class="dm-n" onclick="dmDoiCho('+q+','+i+',-1)"'+(i?'':' disabled')+' title="Lên">↑</button>'+
      '<button class="dm-n" onclick="dmDoiCho('+q+','+i+',1)"'+(i<ds.length-1?'':' disabled')+' title="Xuống">↓</button>'+
      '<button class="dm-n xau" onclick="dmXoa('+q+','+i+')" title="Xóa">✕</button></span></div>'+
      '<div class="dm-hoi" id="'+dmId(loai)+'-h'+i+'"></div>';
  });
  h += '<div class="dm-them"><input id="'+dmId(loai)+'-moi" placeholder="Thêm '+mt.ten.toLowerCase()+' mới…" '+
      'onkeydown="if(event.key===\'Enter\'){event.preventDefault();dmThem('+q+');}">'+
    '<button class="nho" onclick="dmThem('+q+')">+ Thêm</button>'+
    '<button class="nho" onclick="dmMacDinh('+q+')" title="Đưa danh sách về như lúc mới cài app">Lấy lại mặc định</button></div></div>';
  return h;
}
function dmVe(loai){
  var e = document.getElementById(dmId(loai));
  if(e) e.outerHTML = dmHTML(loai);
}
function dmLuu(loai, ds){
  var mt = dmMoTa(loai); mt.ghi(ds);
  luu(); henDayCauHinh(); dmVe(loai); ve();
}
function dmDoiTen(loai, i, el){
  var mt = dmMoTa(loai), ds = mt.lay(), cu = ds[i], moi = el.value.trim();
  if(!moi || moi===cu){ el.value = cu; return; }
  if(ds.indexOf(moi)>=0 || (loai==='ct' && moi==='Dùng chung')){ el.value = cu; return baoLoi('“'+moi+'” đã có trong danh sách.'); }
  ds[i] = moi;
  /* từ khóa, tên đầy đủ, viết tắt đi theo tên mới */
  if(mt.tk){ var t = D.cauHinh.tuKhoa = D.cauHinh.tuKhoa || {}; t[mt.tk] = t[mt.tk] || {};
    t[mt.tk][moi] = (tuKhoaCua(mt.tk)[cu] || []).slice(); }
  if(mt.phu){ var ph = mt.layPhu(cu); if(loai==='loai'){ if((D.cauHinh.vtLoai||{})[cu] || VIET_TAT_LOAI[cu]) mt.ghiPhu(moi, ph); } else mt.ghiPhu(moi, ph); }
  if(loai==='ct' && D.cauHinh.ctTen) delete D.cauHinh.ctTen[cu];
  var so = dmDung(loai, cu, moi);
  dmLuu(loai, ds);
  bao('Đã đổi “'+cu+'” → “'+moi+'”'+(so?(' · cập nhật '+so+' file'):'')+'.', 5);
}
function dmDoiPhu(loai, i, v){
  var mt = dmMoTa(loai), ten = mt.lay()[i];
  mt.ghiPhu(ten, v.trim()); luu(); henDayCauHinh(); baoDaLuu();
}
function dmDoiTK(loai, i, v){
  var mt = dmMoTa(loai), ten = mt.lay()[i];
  var t = D.cauHinh.tuKhoa = D.cauHinh.tuKhoa || {}; t[mt.tk] = t[mt.tk] || {};
  t[mt.tk][ten] = v.split(',').map(function(x){ return x.trim(); }).filter(Boolean);
  luu(); henDayCauHinh(); baoDaLuu();
}
function dmDoiCho(loai, i, d){
  var ds = dmMoTa(loai).lay(), j = i + d;
  if(j<0 || j>=ds.length) return;
  var x = ds[i]; ds[i] = ds[j]; ds[j] = x;
  dmLuu(loai, ds);
}
function dmThem(loai){
  var e = document.getElementById(dmId(loai)+'-moi'), v = e ? e.value.trim() : '';
  if(!v) return;
  var ds = dmMoTa(loai).lay();
  if(ds.indexOf(v)>=0 || (loai==='ct' && v==='Dùng chung')) return baoLoi('“'+v+'” đã có trong danh sách.');
  ds.push(v); dmLuu(loai, ds);
  var e2 = document.getElementById(dmId(loai)+'-moi'); if(e2) e2.focus();
  bao('Đã thêm “'+v+'”.', 3);
}
function dmXoa(loai, i){
  var mt = dmMoTa(loai), ds = mt.lay(), ten = ds[i], so = dmDung(loai, ten);
  if(!so){ ds.splice(i, 1); dmLuu(loai, ds); return bao('Đã xóa “'+ten+'” (chưa file nào dùng).', 4); }
  var khac = ds.filter(function(x){ return x!==ten; });
  if(loai==='ct') khac = ['Dùng chung'].concat(khac);
  var q = '\''+loai+'\'';
  var e = document.getElementById(dmId(loai)+'-h'+i); if(!e) return;
  e.innerHTML = '<b>'+so+' file</b> đang dùng “'+coChuHTML(ten)+'”. Chuyển các file đó sang: '+
    '<select id="'+dmId(loai)+'-sang'+i+'"><option value="">— để trống —</option>'+
      khac.map(function(x){ return '<option value="'+coChuHTML(x)+'">'+coChuHTML(loai==='ct' ? hienCT(x) : x)+'</option>'; }).join('')+'</select> '+
    '<button class="nho xau" onclick="dmXoaXong('+q+','+i+')">Xóa</button> '+
    '<button class="nho" onclick="this.parentNode.innerHTML=\'\'">Thôi</button>';
}
function dmXoaXong(loai, i){
  var mt = dmMoTa(loai), ds = mt.lay(), ten = ds[i];
  var s = document.getElementById(dmId(loai)+'-sang'+i), sang = s ? s.value : '';
  var so = dmDung(loai, ten, sang);
  ds.splice(i, 1); dmLuu(loai, ds);
  bao('Đã xóa “'+ten+'” · '+so+' file '+(sang ? 'chuyển sang “'+sang+'”' : 'để trống mục này')+'.', 6);
}
function dmMacDinh(loai){
  var mt = dmMoTa(loai);
  if(!confirm('Đưa danh sách '+mt.ten.toLowerCase()+' về mặc định của app?\nFile đã gắn tên cũ vẫn giữ nguyên tên đó.')) return;
  dmLuu(loai, mt.macDinh.slice());
}

/* ---- tự lưu: mọi ô trong Cài đặt đổi là lưu ngay, báo "✓ Đã lưu"; lên Drive gom sau 4 giây ---- */
var H_DAY_CH = null;
function henDayCauHinh(){
  clearTimeout(H_DAY_CH);
  H_DAY_CH = setTimeout(function(){ if(DR.sanSang) dongBoCauHinh('tu'); }, 4000);
}
function baoDaLuu(){ bao('✓ Đã lưu', 1.6); }
function ganTuLuuCD(){
  var e = document.getElementById('cd-noi'); if(!e || e.dataset.tuLuu) return;
  e.dataset.tuLuu = '1';
  e.addEventListener('change', function(ev){
    if(ev.target.closest && ev.target.closest('.dm, .dm-hoi')) return;   /* bộ sửa danh mục tự lo */
    luuCaiDat(false, true);
  });
  e.addEventListener('click', function(ev){
    var b = ev.target.closest && ev.target.closest('.co-chu button[data-v]');
    if(b) setTimeout(function(){ luuCaiDat(false, true); }, 0);
  });
}
/* Cài đặt › Dữ liệu tháng: danh sách mẫu báo cáo, mỗi dòng một nút ⚙ (sửa đủ: tên, từ khóa, cấp, dạng, chu kỳ) */
var TL_VE_CD = false;
function dsMauCDHTML(){
  var mau = (D.cauHinh.mauBaoCao || []).filter(function(m){ return !laMaSoLieu(m); });   /* 3.85: sao kê thuần Excel nạp ở tab Số liệu */
  return '<div class="dm dm-mau">'+mau.map(function(m){
    var so = D.duLieu.filter(function(x){ return (x.maLoai||'')===m.ma; }).length;
    var mo = laThuanXLS(m) ? 'một ô Toàn PGD' : ('bảng · '+((m.cap&&m.cap.length) ? m.cap.map(function(c){ return {pgd:'PGD',xa:'xã',diem:'điểm GD'}[c]; }).join(', ') : 'mọi cấp'));
    return '<div class="dm-dong"><span class="dm-ten-chu">'+coChuHTML(m.ten)+' <small>'+coChuHTML(m.ma)+' · '+mo+
      ' · '+({thang:'hằng tháng',ngay:'theo ngày',quy:'quý',sau:'6 tháng',nam:'năm'}[chuKy(m)]||'')+'</small></span>'+
      '<span class="dm-cuoi"><span class="dm-so">'+(so?so+' file':'')+'</span>'+
      '<button class="dm-n" onclick="TL_VE_CD=true;dongCaiDat();moThietLapBC(\''+m.ma+'\')" title="Thiết lập báo cáo">⚙</button></span></div>';
  }).join('')+'</div>';
}
function veLaiCDNeuCan(){
  if(!TL_VE_CD) return;
  TL_VE_CD = false;
  setTimeout(function(){ moCaiDat('duLieu'); }, 0);
}
