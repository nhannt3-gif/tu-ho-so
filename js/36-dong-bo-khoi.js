/* ===== 3.225 (anh chốt 17/10/2026 — docs/KE_HOACH_3225_LUU.md): ĐỒNG BỘ DRIVE THEO KHỐI =====
   Khối (danh sách): vanban · lich (ghi chú) · scan (+ chữ ký · CCCD) · solieu (dữ liệu tháng) · hoso (bộ hồ sơ) · gdx (biểu mẫu) · chung (dấu xóa). Cài đặt: từ 3.226 theo khối (_Hệ thống/caidat/<khối>.json — xem cuối file). Trên Drive: _Hệ thống/khoi/<khối>__<lô>.json (thư mục phẳng).
   - Văn bản chia lô theo NĂM, Scan (+ chữ ký · CCCD) theo THÁNG, thùng rác theo khối gốc.
   - Kéo: mỗi phút 1 lệnh liệt kê thư mục (tên + giờ sửa) → file nào giờ sửa khác lần trước mới tải về, gộp.
   - Đẩy: chỉ file có nội dung đổi (so dấu băm lần đẩy trước); file trên Drive vừa bị máy khác sửa → tải về gộp trước rồi mới ghi.
   - KHÔNG có mục lục chung (2 máy ghi cùng lúc không đè nhau). Luật gộp GIỮ NGUYÊN: danh sách theo mục (bản sửa sau thắng, dấu xóa) — gopTuRemote;
     cài đặt theo khóa — chApDrive (mốc chBam chỉ đánh dấu đúng các khóa của file vừa đồng bộ).
   - Chuyển tiếp: vẫn đọc / ghi chimuc.json + cauhinh.json cho máy chưa cập nhật (chimuc.json ghi tối đa 1 lần / giờ);
     anh bật "Máy cũ đã cập nhật hết" (D.cauHinh.kdBoCu, đồng bộ) → thôi ghi chimuc.json. Tắt hẳn trên 1 máy: localStorage 'tuhoso_dbk' = 'tat'.
   - Lịch (lich.json), Số liệu (meta / khach_hang) giữ đường riêng như cũ. */
var KD_TM = '_Hệ thống/khoi', KD_DANG = null, KD_HEN = null, KD_BAO = false;
CH_RIENG.push('kdBam', 'kdKeo');   /* mốc đồng bộ riêng từng máy — không lên Drive */
var KD_KHOI_DS = {vanBan:'vanban', ghiChu:'lich', scan:'scan', kyAnh:'scan', duLieu:'solieu', boHS:'hoso', bieuMau:'gdx'};
function kdBat(){ var t = ''; try { t = localStorage.getItem('tuhoso_dbk'); } catch(e){} return t!=='tat'; }
function kdLo(ngan, m){
  var k = KD_KHOI_DS[ngan], t = String(m.ngay || m.taoLuc || m.luc || m.suaLuc || '');
  if(k==='vanban') return k+'__'+(/^\d{4}/.test(t) ? t.slice(0, 4) : 'khac');
  if(k==='scan') return k+'__'+(/^\d{4}-\d{2}/.test(t) ? t.slice(0, 7) : 'khac');
  return k+'__ds';
}
/* gói toàn bộ phần đồng bộ của máy này thành các file theo khối / lô — thứ tự khóa cố định để so dấu băm */
function kdGoi(){
  var F = {}, them = function(ten, ngan, m){ var f = F[ten] = F[ten] || {loai:'tuhoso-khoi', ngan:{}}; (f.ngan[ngan] = f.ngan[ngan] || []).push(m); };
  Object.keys(KD_KHOI_DS).forEach(function(ng){ (D[ng] || []).forEach(function(m){ if(m && !(typeof laFileHeThong==='function' && laFileHeThong(m))) them(kdLo(ng, m), ng, m); }); });
  (D.rac || []).forEach(function(m){ if(!m) return; var ten = (KD_KHOI_DS[m.khoCu] || 'chung')+'__rac'; them(ten, 'rac', m);
    if(Date.now()-new Date(m.xoaLuc || 0).getTime() < 60*864e5) (F[ten].daXoa = F[ten].daXoa || []).push({id:m.id, xoaLuc:m.xoaLuc}); });   /* như chimuc.json: máy khác chuyển mục vào thùng rác theo dấu này */
  /* cài đặt: GIỮ đường cauhinh.json (gộp theo khóa, chFileId — đã thử kỹ sự cố 09/10); chạy song song 2 đường làm lẫn mốc chBam (t117, t136) → tách cài đặt theo khối để bước sau */
  F['chung__xoa'] = {loai:'tuhoso-khoi', xoa:(D.daXoaHan || []).filter(function(t){ return Date.now()-new Date(t.luc).getTime() < 366*864e5; })};
  return F;
}
function kdBam(o){ return chBamChu(JSON.stringify(o)); }
/* gộp 1 file khối từ Drive vào máy này — trả true nếu máy này có đổi */
function kdGop(j){
  if(!j || j.loai!=='tuhoso-khoi') return false;
  var doi = 0;
  if(j.ngan || j.xoa){ var r = {}; Object.keys(j.ngan || {}).forEach(function(k){ r[k] = j.ngan[k]; }); if(j.xoa) r.daXoaHan = j.xoa; if(j.daXoa) r.daXoa = j.daXoa;
    CM_DANG_KEO = true; try { var kq = gopTuRemote(r); doi += kq.them + kq.xoa; } finally { CM_DANG_KEO = false; } }
  return doi > 0;
}
function kdThuMuc(){ return baoDamDuong(D.cauHinh.thumuc+'/'+KD_TM); }
function kdDanhSach(id){ return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+id+"' in parents and trashed=false")+'&fields=files(id,name,modifiedTime)&pageSize=1000')
  .then(function(kq){ var R = {}; (kq.files || []).forEach(function(f){ if(/\.json$/.test(f.name)) R[f.name.replace(/\.json$/, '')] = f; }); return R; }); }
function kdTai(f){ return goiDrive('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media'); }
function kdMoc(){ var c = D.cauHinh; if(!chLaDT(c.kdBam)) c.kdBam = {}; if(!chLaDT(c.kdKeo)) c.kdKeo = {}; return c; }
/* ⬇ kéo các file khối máy khác vừa sửa */
function kdKeoVe(){
  if(!kdBat() || !coTheNoiDrive() || !DR.sanSang) return Promise.resolve(0);
  var c = kdMoc(), doi = 0, idTM = '';
  return kdThuMuc().then(function(id){ idTM = id; return kdDanhSach(id); }).then(function(R){
    return Object.keys(R).filter(function(n){ return R[n].modifiedTime!==c.kdKeo[n]; }).reduce(function(p, n){
      return p.then(function(){ return kdTai(R[n]); }).then(function(j){
        if(kdGop(j)) doi++;
        c.kdKeo[n] = R[n].modifiedTime;
        var moi = kdGoi()[n]; if(moi && kdBam(moi)===kdBam(j)) c.kdBam[n] = kdBam(moi);   /* máy này không có gì riêng → khỏi đẩy lại */
      });
    }, Promise.resolve());
  }).then(function(){ if(doi){ luu(); try { capNhatDau(); ve(); } catch(e){} } return doi; });
}
/* ⬆ đẩy file khối có đổi (Drive vừa đổi thì gộp trước) */
function kdDay(){
  if(!kdBat() || !coTheNoiDrive() || !DR.sanSang) return Promise.resolve(0);
  if(KD_DANG) return KD_DANG;
  var c = kdMoc(), F = kdGoi(), doi = Object.keys(F).filter(function(n){ return kdBam(F[n])!==c.kdBam[n]; }), so = 0, idTM = '';
  if(!doi.length) return Promise.resolve(0);
  KD_DANG = kdThuMuc().then(function(id){ idTM = id; return kdDanhSach(id); }).then(function(R){
    var dem = demChiMuc(goiChiMuc()), conTren = Object.keys(R).length;
    return doi.reduce(function(p, n){
      return p.then(function(){
        var f = R[n];
        return (f && f.modifiedTime!==c.kdKeo[n] ? kdTai(f).then(function(j){ kdGop(j); c.kdKeo[n] = f.modifiedTime; }) : Promise.resolve()).then(function(){
          var o = kdGoi()[n]; if(!o) return;
          if(dem===0 && conTren >= 3 && o.ngan){ if(!KD_BAO){ KD_BAO = true; baoLoi('Không ghi khối trống lên Drive (máy này đang trống, Drive còn dữ liệu). Vào 💾 Sao lưu để kiểm tra.'); } return; }   /* chặn ghi trống */
          return ghiJSONLenDrive(n+'.json', idTM, o, f ? {id:f.id} : null).then(function(r){ c.kdBam[n] = kdBam(o); if(r && r.modifiedTime) c.kdKeo[n] = r.modifiedTime; so++; });
        });
      });
    }, Promise.resolve());
  }).then(function(){ KD_DANG = null; if(so) luu(); return so; }, function(e){ KD_DANG = null; console.warn('Chưa đẩy được khối:', e); return 0; });
  return KD_DANG;
}
function kdHen(){ if(!kdBat() || !coTheNoiDrive() || !DR.sanSang || CM_DANG_KEO) return; clearTimeout(KD_HEN); KD_HEN = setTimeout(function(){ kdDay(); }, 5000); }

/* nối vào đường cũ: mỗi lần lưu → hẹn đẩy khối; chimuc.json (máy cũ) tối đa 1 lần / giờ, thôi hẳn khi anh bật "Máy cũ đã cập nhật hết" */
var KD_HEN_CM_CU = henDongBoChiMuc;
henDongBoChiMuc = function(){
  if(!kdBat()) return KD_HEN_CM_CU();
  kdHen(); if(D.cauHinh.kdBoCu) return;
  var t = Date.parse(D.cauHinh.chiMucThoi || 0) || 0; if(Date.now()-t > 36e5) KD_HEN_CM_CU();
};
/* kéo về (mỗi phút / quay lại app / mở app): đẩy phần máy này đang chờ → kéo khối → rồi đọc chimuc.json (máy cũ có thể vừa ghi) */
var KD_TAI_CM_CU = taiChiMucTuDrive;
taiChiMucTuDrive = function(imLang){
  if(!kdBat()) return KD_TAI_CM_CU(imLang);
  return kdDay().then(kdKeoVe).then(function(){ return KD_TAI_CM_CU(imLang); }, function(){ return KD_TAI_CM_CU(imLang); });
};
/* giao diện: thêm vào nhóm 🗄 Nơi lưu (💾 Sao lưu) */
var KD_SL = kbSaoLuuHTML;
kbSaoLuuHTML = function(){
  var bat = kdBat(), n = Object.keys(kdMoc().kdKeo).length;
  return '<div class="hso-kb-nhom"><b>☁ Đồng bộ Drive theo khối</b> <small>(3.225: văn bản theo năm, scan theo tháng, cài đặt theo khối — chỉ gửi / tải phần đổi)</small>'+
    '<div class="sl-phu">'+(bat ? 'Đang bật'+(n ? ' · '+n+' file khối đã đồng bộ' : '') : 'Đã tắt trên máy này (chỉ dùng chimuc.json / cauhinh.json như cũ)')+
      ' · Máy cũ (chưa cập nhật): '+(D.cauHinh.kdBoCu ? '<b>đã cập nhật hết</b> — thôi ghi chimuc.json' : 'vẫn ghi chimuc.json mỗi giờ để máy cũ đọc')+'</div>'+
    '<div class="hang-nut"><button class="nho" onclick="kdDoi()">'+(bat ? 'Tắt trên máy này' : 'Bật trên máy này')+'</button>'+
      '<button class="nho" onclick="D.cauHinh.kdBoCu=!D.cauHinh.kdBoCu;luu();hsoKBHop(\'sl\')">'+(D.cauHinh.kdBoCu ? 'Ghi lại chimuc.json cho máy cũ' : 'Máy cũ đã cập nhật hết')+'</button>'+
      (bat && coTheNoiDrive() ? '<button class="nho" onclick="batChay(true);kdDay().then(kdKeoVe).then(function(){tatChay();bao(\'Đã đồng bộ khối.\',3);hsoKBHop(\'sl\')},function(e){tatChay();baoLoi(String(e))})">☁ Đồng bộ ngay</button>' : '')+'</div></div>'+KD_SL();
};
function kdDoi(){ try { if(kdBat()) localStorage.setItem('tuhoso_dbk', 'tat'); else localStorage.removeItem('tuhoso_dbk'); } catch(e){} bao(kdBat() ? 'Đã bật đồng bộ theo khối.' : 'Đã tắt đồng bộ theo khối trên máy này.', 4); try { hsoKBHop('sl'); } catch(e){} }

/* ===== 3.226 (bàn giao 3.225 mục "Việc tiếp" a): CÀI ĐẶT THEO KHỐI — chia CHÍNH cơ chế cauhinh.json thành file theo khối =====
   _Hệ thống/caidat/<khối>.json: mỗi file chỉ chứa khóa của khối đó; luật gộp GIỮ NGUYÊN (chApDrive theo khóa, chBam là dấu từng khóa — mỗi khóa thuộc đúng 1 file
   nên chỉ đánh dấu khóa của file vừa đồng bộ); mốc riêng từng file D.cauHinh.chKhoi[khối] = {keo: giờ sửa, id: mã file} (giống chKeoLuc / chFileId).
   cauhinh.json (máy cũ) KHÔNG còn là đường thứ 2 cùng luật: chỉ để máy cũ đọc / ghi — mốc riêng chCuBam (dấu từng khóa của bản cauhinh.json máy này thấy / ghi gần nhất):
   khóa nào trong cauhinh.json khác chCuBam = máy cũ vừa sửa → áp vào (theo luật chApDrive); máy này ghi lại cauhinh.json đầy đủ khi nội dung đổi — đến khi anh bật "Máy cũ đã cập nhật hết". */
CH_RIENG.push('chKhoi', 'chCuBam', 'chCuKeo', 'chCuNoi');
var CH_KHOI_LUAT = [[/^kt/, 'ktgs'], [/^(hoMoi|hso[A-Z]|loaiBoHS|boMau)$/, 'hoso'], [/^gdx/, 'gdx'],
  [/^(ccNho|kyChot|kyChung|pvChung|pvGon|pvGhim|pvKieu|sl[A-Z]|slgb|tk104Tay|tkChon|toCot|toNguong|mauBaoCao|maDaBo)/, 'solieu'],
  [/^(scan[A-Z]|ka[A-Z]|hsDS|hsKhoa|hsTuDrive)/, 'scan'], [/^(nhanGhiChu|nhanGCDaGop|nkChe|taNhacKhac)$/, 'lich'],
  [/^(loaiVB|tag[A-Z]|tuKhoa|kieuTen|vtLoai|nghiepVu|chuongTrinh|ctTen|phongSo|phongGanDay|tenCauTruc|soTrangDoc)/, 'vanban']];
function chKhoiCua(k){ for(var i=0;i<CH_KHOI_LUAT.length;i++) if(CH_KHOI_LUAT[i][0].test(k)) return CH_KHOI_LUAT[i][1]; return 'chung'; }   /* khóa chưa có trong bảng → Chung (không mất) */
function chKhoaCua(kh){ return chKhoa().filter(function(k){ return chKhoiCua(k)===kh; }); }
function chGoiKhoi(kh){ var o = {loai:'cau-hinh-khoi', khoi:kh, ban:1, ghiLuc:new Date().toISOString()}; chKhoaCua(kh).forEach(function(k){ o[k] = D.cauHinh[k]; }); return o; }
function chLoc(j, ds){ var r = {}; ds.forEach(function(k){ if(j && j[k]!==undefined) r[k] = j[k]; }); return r; }
function chDanhDauKhoa(ds){ var b = chLaDT(D.cauHinh.chBam) ? D.cauHinh.chBam : {}; ds.forEach(function(k){ if(D.cauHinh[k]!==undefined) b[k] = chBamKhoa(k); }); D.cauHinh.chBam = b; }
function chMayDoiKhoa(j, ds){ var b = D.cauHinh.chBam;
  return ds.some(function(k){ return j ? (j[k]===undefined || chBamChu(JSON.stringify(j[k]))!==chBamKhoa(k)) : (!chLaDT(b) || b[k]!==chBamKhoa(k)); }); }
function chNoiDungCu(o){ var r = {}; Object.keys(o).forEach(function(k){ if(k!=='ghiLuc') r[k] = o[k]; }); return chBamChu(JSON.stringify(r)); }
function chTaiJ(f){ return canToken().then(function(){ return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}}); })
  .then(function(r){ if(!r.ok) throw new Error('Drive báo lỗi: '+r.status); return r.json(); }); }
function chKhoiDongBo(cheDo){
  if(!coTheNoiDrive()) return Promise.resolve({loi:'Chưa nối Drive.'});
  if(CH_DANG) return CH_DANG.then(function(){ return dongBoCauHinh(cheDo); });
  var c = D.cauHinh, idHT = '', idCD = '', fCu = null, R = {}, doi = 0, day = false, daChup = false;
  if(!chLaDT(c.chKhoi)) c.chKhoi = {};
  if(!chLaDT(c.chCuBam)) c.chCuBam = chLaDT(c.chBam) ? JSON.parse(JSON.stringify(c.chBam)) : null;   /* nâng cấp: chBam cũ = dấu bản cauhinh.json lần đồng bộ trước */
  var chup = function(){ if(!daChup && typeof KHO1!=='undefined'){ daChup = true; KHO1.chup('trước khi nhận cài đặt từ Drive'); } };
  CH_DANG = baoDamDuong(c.thumuc+'/_Hệ thống').then(function(id){ idHT = id;
    return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("name='"+TEN_CH+"' and trashed=false and '"+idHT+"' in parents")+'&fields=files(id,modifiedTime)&pageSize=1');
  }).then(function(kq){ fCu = kq && kq.files && kq.files[0] || null;
    return baoDamDuong(c.thumuc+'/_Hệ thống/caidat');
  }).then(function(id){ idCD = id; return kdDanhSach(id); }).then(function(ds){ R = ds;
    /* ① cauhinh.json: chỉ nhận khóa máy cũ vừa sửa (khác chCuBam); lần đầu trên máy trống / bấm Lấy từ Drive → áp cả bản */
    var keo = !!fCu && (cheDo!=='tu' || fCu.modifiedTime!==c.chCuKeo || c.chFileId!==fCu.id);
    if(!keo) return null;
    return chTaiJ(fCu).then(function(j){ if(!j || j.loai!=='cau-hinh-tu-ho-so') return;
      var cu = c.chCuBam, lay = {};
      Object.keys(j).forEach(function(k){ if(k==='loai' || k==='ban' || k==='ghiLuc' || chRieng(k) || j[k]===undefined || j[k]===null) return;
        if(cheDo==='lay' || !chLaDT(cu) || cu[k]!==chBamChu(JSON.stringify(j[k]))) lay[k] = j[k]; });
      if(Object.keys(lay).length){ chup(); doi += chApDrive(lay, cheDo==='lay'); }
      var b = {}; Object.keys(j).forEach(function(k){ if(!chRieng(k) && k!=='loai' && k!=='ban' && k!=='ghiLuc' && j[k]!==undefined && j[k]!==null) b[k] = chBamChu(JSON.stringify(j[k])); });
      c.chCuBam = b; c.chCuKeo = fCu.modifiedTime; c.chFileId = fCu.id; c.chCuNoi = chNoiDungCu(j);
    });
  }).then(function(){
    /* ② từng khối: kéo nếu Drive mới hơn / khác file → áp (luật cũ) → đẩy nếu máy này có khóa khác */
    var ten = {}; Object.keys(R).forEach(function(n){ ten[n] = 1; }); chKhoa().forEach(function(k){ ten[chKhoiCua(k)] = 1; });
    return Object.keys(ten).sort().reduce(function(p, kh){ return p.then(function(){
      var f = R[kh], m = c.chKhoi[kh] || {}, j = null;
      var keo = !!f && (cheDo!=='tu' || f.modifiedTime!==m.keo || m.id!==f.id);
      return (keo ? chTaiJ(f) : Promise.resolve(null)).then(function(x){
        if(x && x.loai==='cau-hinh-khoi'){ j = x; var lay = chLoc(j, Object.keys(j).filter(function(k){ return !chRieng(k) && k!=='loai' && k!=='ban' && k!=='ghiLuc' && k!=='khoi'; }));
          if(Object.keys(lay).length){ chup(); doi += chApDrive(lay, cheDo==='lay'); } c.chKhoi[kh] = {keo:f.modifiedTime, id:f.id}; }
        var ds = chKhoaCua(kh);
        if(!ds.length && !f) return;
        if(!(!f || cheDo==='day' || chMayDoiKhoa(j, ds))){ chDanhDauKhoa(ds); return; }
        return ghiJSONLenDrive(kh+'.json', idCD, chGoiKhoi(kh), f ? {id:f.id} : null).then(function(r){ chDanhDauKhoa(ds); day = true;
          c.chKhoi[kh] = {keo:r && r.modifiedTime || '', id:r && r.id || (f && f.id) || ''}; });
      });
    }); }, Promise.resolve());
  }).then(function(){
    /* ③ cauhinh.json cho máy cũ: ghi lại khi nội dung đổi (đến khi anh bật "Máy cũ đã cập nhật hết") */
    if(c.kdBoCu) return;
    var o = goiCauHinh(), nd = chNoiDungCu(o);
    if(fCu && nd===c.chCuNoi && cheDo!=='day') return;
    return ghiJSONLenDrive(TEN_CH, idHT, o, fCu ? {id:fCu.id} : null).then(function(r){ day = true; c.chCuNoi = nd;
      var b = {}; chKhoa().forEach(function(k){ b[k] = chBamKhoa(k); }); c.chCuBam = b;
      if(r && r.modifiedTime) c.chCuKeo = r.modifiedTime; if(r && r.id) c.chFileId = r.id; c.chKeoLuc = c.chCuKeo; });
  }).then(function(){
    if(day) c.chGhiLuc = new Date().toISOString(); CH_CHU = chChuHienTai(); luu(); CH_DANG = null;
    if(doi){ try{ capNhatDau(); ve(); if(c.slTab==='kt' && typeof ktVeThe==='function' && KT_K) ktVeThe(); }catch(e){} }
    return {doi:doi, day:day};
  }, function(e){ CH_DANG = null; return {loi:(e && e.message) || String(e)}; });
  return CH_DANG;
}
var CH_DB_CU = dongBoCauHinh;
dongBoCauHinh = function(cheDo){ return kdBat() ? chKhoiDongBo(cheDo) : CH_DB_CU(cheDo); };
