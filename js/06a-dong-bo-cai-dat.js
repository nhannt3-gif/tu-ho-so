/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): đồng bộ mục lên file thật trên Drive · xóa / thùng rác / xóa hẳn · bỏ tab Tháng · chờ khai · ảnh ghi chú · ⚙ Cài đặt.
   Chép nguyên từ js/06-hop-thoai.js (không đổi tên hàm; "Có gì mới" CO_GI_MOI vẫn ở js/06 — tools/bump.py sửa thẳng); nạp ngay sau js/06 (tên 06a: thứ tự nạp = thứ tự tên file, t138). ===== */
/* ==========================================================
   ĐỒNG BỘ MỤC LÊN FILE THẬT TRÊN DRIVE (bản 3.6)
   Một lệnh PATCH: tên file + thư mục chứa + description + appProperties.
   appProperties = bản máy đọc, để quét kho khôi phục được khi mất chỉ mục.
   Ghi chú riêng của anh KHÔNG đưa lên Drive.
   ========================================================== */
function catByte(k, v){
  v = String(v==null?'':v);
  function soByte(x){ return unescape(encodeURIComponent(x)).length; }
  while(v && soByte(k+v)>124) v = v.slice(0,-1);
  return v;
}
/* "Xử lý rủi ro" → #XuLyRuiRo ; "HSSV" → #HSSV */
function hashTag(t){
  var x = String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/đ/g,'d').replace(/Đ/g,'D');
  var w = x.split(/[^A-Za-z0-9]+/).filter(Boolean);
  return w.length ? '#'+w.map(function(a){ return a.charAt(0).toUpperCase()+a.slice(1); }).join('') : '';
}
function laBieuMau(m){ return m && m.huongDan!==undefined; }
/* file hệ thống của app (chỉ mục, cấu hình) — không bao giờ là tài liệu, không bao giờ được đổi tên/dời */
function laFileHeThong(m){
  var re = /^(\d{4}-\d{2}-\d{2}[ _])?(chimuc(_\d{4}-\d{2}-\d{2})?|cauhinh|lich)\.json$/i;
  return !!m && (re.test(m.tenCu||'') || re.test(m.tenMoi||''));
}
/* chuyển các mục là file hệ thống lẫn trong tủ vào thùng rác của app
   (chỉ bỏ khỏi chỉ mục; file trên Drive giữ nguyên). Qua thùng rác nên lệnh bỏ đồng bộ sang máy khác */
function donFileHeThong(){
  var n = 0; D.rac = D.rac || [];
  ['vanBan','duLieu','ghiChu','bieuMau'].forEach(function(k){
    D[k] = (D[k]||[]).filter(function(m){
      if(!laFileHeThong(m)) return true;
      m.nhomCu = m.nhom; m.xoaLuc = new Date().toISOString(); m.lyDoXoa = 'File hệ thống lẫn vào tủ';
      delete m.choDB; D.rac.push(m); n++; return false;
    });
  });
  if(n){ luu(); console.info('Đã bỏ '+n+' file hệ thống khỏi tủ'); }
  return n;
}
function metaDrive(m, boRong){
  var ap = {}, laBM = laBieuMau(m);
  function K(k, v){
    if(v===undefined || v===null || v==='') { if(!boRong) ap[k] = null; return; }
    ap[k] = catByte(k, v);
  }
  function idDrive(id){ var x = id && timMuc(id); return x && x.driveId; }
  var ct = laBM ? m.nhom : (m.ctrinh||[])[0];
  K('th','3');
  K('nhom', laBM ? 'bieuMau' : (m.nhom||'vanBan'));
  K('so', m.soHieu); K('ngay', m.ngay); K('loai', laBM?'':m.loai);
  K('ten', laBM ? m.ten : (m.tenVB||m.trichYeu||m.moTa||''));
  K('mang', m.mang); K('ct', ct);
  K('vt', ''); K('het', m.hetHieuLuc?'1':'');
  K('goc', ''); K('thay', laBM ? idDrive(m.thayBoi) : ''); K('vbk', idDrive(m.vbKem));
  K('lq', laBM ? '' : (m.lienQuan||[]).map(idDrive).filter(Boolean).join(','));   /* 3.68: văn bản liên quan (dự phòng khi mất chỉ mục; dài quá thì cắt) */
  K('ky', m.ky); K('mau', m.maLoai); K('pham', m.phamVi); K('rac', m.xoaLuc?'1':'');
  for(var i=0;i<20;i++) K('t'+i, (m.the||[])[i]);
  for(var k=0;k<6;k++) K('h'+k, (m.hoi||[])[k]);
  var dong1 = [m.mang, ct].concat(m.the||[], m.hoi||[]).filter(Boolean).map(hashTag).filter(Boolean).join(' ');
  var dong2 = [m.soHieu, m.tomTat||m.tenVB||m.trichYeu||m.moTa||m.ten].filter(Boolean).join(' · ');
  return {appProperties:ap, description:[dong1, dong2].filter(Boolean).join('\n')};
}
/* chữ ký trạng thái — khác với lần đồng bộ trước thì cần đẩy lại */
function kyDrive(m){
  var md = metaDrive(m, true);
  return JSON.stringify([m.tenMoi, thuMucCua(m), md.description, md.appProperties]);
}
/* 3.50: bản scan / Chữ ký · CCCD — chỉ DỜI file (vào _ThungRac khi xóa, về chỗ cũ khi khôi phục), không ghi thuộc tính văn bản */
function laScanKA(m){ return !!(m && (m.che || m.khoCu==='scan' || m.khoCu==='kyAnh' || (/^ka/.test(m.id||'') && m.loai))); }
function doiChoScanKA(m){
  if(!m.driveId || !m.choDB || m.driveMat) return Promise.resolve({ok:true});
  var duong = m.xoaLuc ? D.cauHinh.thumuc+' / _ThungRac' : (m.che ? duongScan(m) : duongKA((m.ngay||ngayISO(nay())).slice(0,7)));
  var pCha = m.driveCha ? Promise.resolve(m.driveCha)
    : goiDrive('https://www.googleapis.com/drive/v3/files/'+m.driveId+'?fields=parents').then(function(r){ return (r.parents||[])[0]||''; });
  return Promise.all([pCha, baoDamDuong(duong)]).then(function(kq){
    var cu = kq[0], moi = kq[1];
    if(!moi || cu===moi) return {parents:[cu]};
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+m.driveId+'?fields=id,parents&addParents='+moi+(cu?'&removeParents='+cu:''),
      {method:'PATCH', headers:{'Content-Type':'application/json'}, body:'{}'});
  }).then(function(r){
    m.driveCha = (r && r.parents && r.parents[0]) || m.driveCha; delete m.choDB; luu(); capNhatChip();
    return {ok:true, doi:true, duong:duong};
  }).catch(function(e){
    if(/404/.test(e&&e.message||'')){ m.driveMat = true; delete m.choDB; luu(); return {ok:true}; }
    console.warn('Không dời được trên Drive', e); return {ok:false};
  });
}
function dongBoMotLenDrive(m){
  if(laScanKA(m)) return doiChoScanKA(m);
  if(laFileHeThong(m)){ delete m.choDB; delete m.choDoiTen; return Promise.resolve({ok:true}); }
  if(m.choDoiTen){ m.choDB = true; delete m.choDoiTen; }
  if(!m.driveId || !m.choDB || m.driveMat) return Promise.resolve({ok:true});
  var ky = kyDrive(m), md = metaDrive(m, false), duong = thuMucCua(m);
  var pCha = m.driveCha ? Promise.resolve(m.driveCha)
    : goiDrive('https://www.googleapis.com/drive/v3/files/'+m.driveId+'?fields=parents')
        .then(function(r){ return (r.parents||[])[0]||''; });
  var doi = false;
  return Promise.all([pCha, baoDamDuong(duong)]).then(function(kq){
    var cu = kq[0], moi = kq[1], q = '?fields=id,name,parents';
    if(moi && cu!==moi){ doi = true; q += '&addParents='+moi+(cu?'&removeParents='+cu:''); }
    return goiDrive('https://www.googleapis.com/drive/v3/files/'+m.driveId+q, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name:m.tenMoi, description:md.description, appProperties:md.appProperties})
    });
  }).then(function(r){
    m.driveCha = (r && r.parents && r.parents[0]) || m.driveCha;
    if(kyDrive(m)===ky){ delete m.choDB; m.driveKy = ky; }  /* anh sửa tiếp lúc đang gửi thì giữ cờ */
    luu(); capNhatChip();
    return {ok:true, doi:doi, duong:duong};
  }).catch(function(e){ console.warn('Không cập nhật được trên Drive', e); capNhatChip(); return {ok:false}; });
}
function demChoDB(){
  return D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[], D.rac||[], D.scan||[], D.kyAnh||[])
    .filter(function(m){ return (m.choDB || m.choDoiTen) && m.driveId; });
}
/* nối Drive xong: đẩy lần lượt các mục đang chờ */
function chayDongBoCho(){
  if(typeof dayFileBoCho==='function') setTimeout(dayFileBoCho, 500);   /* 3.51: file riêng của bộ hồ sơ */
  if(typeof dayFileNKCho==='function') setTimeout(dayFileNKCho, 900);   /* 3.52: ảnh / file ở tab Hôm nay */
  var ds = demChoDB(); if(!ds.length) return;
  var ok = 0;
  ds.reduce(function(p, m){
    return p.then(function(){ return dongBoMotLenDrive(m).then(function(k){ if(k.ok) ok++; }); });
  }, Promise.resolve()).then(function(){
    if(ok) bao('Đã cập nhật '+ok+' file trên Drive (việc chờ từ trước).', 5);
  });
}
/* gọi ngay sau khi Lưu một mục (văn bản, dữ liệu, ghi chú, biểu mẫu) */
function sauKhiLuu(m, laCho){
  if(laFileHeThong(m)){ delete m.choDB; bao('Đây là file hệ thống của app — chỉ lưu trong app, không đổi gì trên Drive.', 6); return; }
  if(laCho){ bao('Đã cập nhật · '+(m.tenMoi||m.ten||''), 4); return; }
  if(!m.driveId){ bao('Đã lưu trong app. File chưa có trên Drive nên chỉ đổi chỉ mục.', 5); return; }
  if(kyDrive(m)!==m.driveKy){ m.choDB = true; luu(); }
  if(!m.choDB){ bao('Đã cập nhật · '+(m.tenMoi||m.ten||''), 4); return; }
  if(!DR.sanSang || !DR.online){
    capNhatChip();
    bao('Mới đổi trong app, chờ Drive — nối lại là tự cập nhật lên Drive.', 6);
    return;
  }
  dongBoMotLenDrive(m).then(function(k){
    bao(k.ok ? 'Đã cập nhật trên Drive'+(k.doi?' · dời sang '+k.duong:'')
             : 'Mới đổi trong app, chờ Drive — sẽ tự thử lại.', 6);
  });
}
/* dựng lại một mục từ appProperties khi quét kho (mất chỉ mục vẫn khôi phục được) */
function tuMetaDrive(f){
  var a = f.appProperties||{}, nhom = a.nhom||'vanBan';
  var dong = String(f.description||'').split('\n'), d2 = dong.length>1 ? dong[1] : (dong[0]&&dong[0].charAt(0)!=='#'?dong[0]:'');
  if(a.so && d2.indexOf(a.so+' · ')===0) d2 = d2.slice(a.so.length+3);
  var the = [], hoi = [];
  for(var i=0;i<20;i++) if(a['t'+i]) the.push(a['t'+i]);
  for(var k=0;k<6;k++) if(a['h'+k]) hoi.push(a['h'+k]);
  var m = {id:idMoi(), driveId:f.id, tenCu:f.name, tenMoi:f.name, duoi:duoiFile(f.name),
    co:+(f.size||0), themLuc:f.modifiedTime||new Date().toISOString(), chiMucThoi:true,
    driveCha:(f.parents||[])[0]||'', soHieu:a.so||'', ngay:a.ngay||'', mang:a.mang||'',
    the:the, canCu:'Khôi phục từ thuộc tính trên Drive',
    _gocD:a.goc||'', _thayD:a.thay||'', _vbkD:a.vbk||'', _lqD:a.lq||''};
  if(nhom==='bieuMau'){
    m.ten = a.ten||f.name; m.nhom = a.ct||'Theo nghiệp vụ'; m.huongDan = false;
  }else if(nhom==='duLieu'){
    m.nhom = 'duLieu'; m.ky = a.ky||''; m.maLoai = a.mau||'KHAC'; m.phamVi = a.pham||''; m.hoi = hoi;
    var mau = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===m.maLoai; });
    m.tenLoai = mau ? mau.ten : 'Khác';
  }else if(nhom==='ghiChu'){
    m.nhom = 'ghiChu'; m.moTa = a.ten||'';
  }else{
    m.nhom = nhom; m.loai = a.loai||'Công văn'; m.tenVB = a.ten||''; m.trichYeu = m.tenVB;
    m.tomTat = d2; m.ctrinh = a.ct ? [a.ct] : [];
    m.hetHieuLuc = a.het==='1';
  }
  return m;
}
/* sau khi quét: nối lại văn bản liên quan / biểu mẫu kèm theo driveId (goc / thay của bản cũ → chuyenLienQuan) */
function noiLienKetSauQuet(){
  var tat = D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]), theoD = {};
  tat.forEach(function(m){ if(m.driveId) theoD[m.driveId] = m.id; });
  var nLQ = 0; tat.forEach(function(m){
    if(m._gocD!==undefined){
      if(m._gocD && theoD[m._gocD]) m.goc = theoD[m._gocD];
      if(m._thayD && theoD[m._thayD]) m.thayBoi = theoD[m._thayD];
      if(m._vbkD && theoD[m._vbkD]) m.vbKem = theoD[m._vbkD];
      if(m._lqD) m.lienQuan = m._lqD.split(',').map(function(d){ return theoD[d]; }).filter(Boolean);
      delete m._gocD; delete m._thayD; delete m._vbkD; delete m._lqD;
      m.driveKy = kyDrive(m); nLQ++;
    }
  });
  if(nLQ) chuyenLienQuan();
}
/* ==========================================================
   XÓA · THÙNG RÁC · XÓA HẲN (bản 3.10)
   Xóa 1 mục  → bỏ khỏi tủ, vào Thùng rác app; file Drive dời vào Tủ hồ sơ/_ThungRac
   Khôi phục  → về đúng tab cũ, file Drive dời về đúng thư mục cũ
   Xóa hẳn    → 3.32: chuyển file Drive vào THÙNG RÁC GOOGLE DRIVE (Google tự xóa sau 30 ngày, lấy lại được), xóa bản sao trong máy,
                ghi dấu daXoaHan (giữ 1 năm) để máy khác xóa theo, quét không hiện lại
   Mọi thao tác ghi suaLuc → gộp 2 máy: thao tác mới nhất thắng
   ========================================================== */
function khoCuaMuc(m){
  if(laBieuMau(m)) return 'bieuMau';
  return m.nhom==='duLieu' ? 'duLieu' : m.nhom==='ghiChu' ? 'ghiChu' : 'vanBan';
}
function chuyenVaoRac(ids, lyDo){
  var now = new Date().toISOString(), n = 0; D.rac = D.rac || [];
  /* 3.79.1 (SỬA LỖI MẤT DANH SÁCH SCAN): trước gán D.scan = HS.ds kể cả khi tab Scan CHƯA mở (HS.ds = [] lúc khởi động)
     → xóa / gộp văn bản trước khi vào tab Scan là danh sách Scan bị thay bằng danh sách trống. Nay chỉ lấy HS.ds khi tab đã mở. */
  if(typeof HS!=='undefined' && HS.mo && HS.ds && HS.ds!==D.scan) D.scan = HS.ds;
  /* 3.50 (anh chốt): cứ xóa là vào thùng rác — cả bản scan và Chữ ký · CCCD (ảnh giữ trong máy tới khi xóa hẳn) */
  setTimeout(function(){ if(typeof HS!=='undefined') HS.ds = D.scan; }, 0);   /* 3.79.1 */
  ['vanBan','duLieu','ghiChu','bieuMau','cho','scan','kyAnh','boHS'].forEach(function(k){
    D[k] = (D[k]||[]).filter(function(m){
      if(ids.indexOf(m.id)<0) return true;
      if(k==='cho'){
        /* 3.31: file lấy từ kho cũ bằng Picker (có tuKhayCha) chưa duyệt → không đụng file gốc trên Drive */
        if(m.tuKhay && !m.tuKhayCha){ m.driveId = m.tuKhay; } delete m.tuKhay; delete m.tuKhayCha; m.choKhai = true; }
      m.khoCu = (k==='cho') ? khoCuaMuc(m) : k; m.xoaLuc = now; m.suaLuc = now; if(lyDo) m.lyDoXoa = lyDo;
      if(m.driveId && !laFileHeThong(m) && !m.driveMat) m.choDB = true;
      D.rac.push(m); n++; return false;
    });
  });
  D.ganDay = D.ganDay.filter(function(x){ return ids.indexOf(x)<0; });
  if(typeof HS!=='undefined'){ HS.ds = D.scan; if(HS.chon) ids.forEach(function(i){ delete HS.chon[i]; }); }
  if(typeof BM!=='undefined' && BM.chon) ids.forEach(function(i){ delete BM.chon[i]; });
  if(mucDangXem && ids.indexOf(mucDangXem.id)>=0){ try{ dongXem(); }catch(e){} }
  luu();
  if(DR.sanSang && DR.online) chayDongBoCho(); else capNhatChip();
  return n;
}
/* 3.50 (anh chốt): bấm 🗑 là vào thùng rác ngay — không hỏi; báo kèm ↩ Hoàn tác. Xóa hẳn chỉ làm trong Thùng rác */
function xoaVaoRac(id){ return xoaNhieuVaoRac([id]); }
function xoaNhieuVaoRac(ids, sau){
  ids = (ids||[]).filter(Boolean); if(!ids.length) return 0;
  var n = chuyenVaoRac(ids, 'Anh xóa');
  if(typeof HS!=='undefined') HS.ds = D.scan;
  ve(); if(sau) sau();
  capNhatDemRac();
  baoHoanTac(n>1 ? 'Đã chuyển '+n+' file vào thùng rác.' : 'Đã chuyển vào thùng rác.', function(){
    khoiPhucRac(ids); ve(); if(sau) sau(); capNhatDemRac(); bao('Đã hoàn tác — file về chỗ cũ.', 3);
  });
  return n;
}
function khoiPhucRac(ids){
  var now = new Date().toISOString(), n = 0, slCho = [];
  D.rac = (D.rac||[]).filter(function(m){
    if(ids.indexOf(m.id)<0) return true;
    if(m.khoCu==='homNay'){ nkKhoiPhuc(m); n++; return false; }   /* 3.52: về đúng ngày ở tab Hôm nay */
    if(m.khoCu==='mucNho'){ mucNhoKhoiPhuc(m); n++; return false; }   /* 3.153 */
    if(m.khoCu==='soLieu'){ n++; slCho.push(m); return false; }   /* 3.153: ô Số liệu — chạy sau khi lọc xong D.rac */
    var k = m.khoCu || khoCuaMuc(m);
    delete m.xoaLuc; delete m.lyDoXoa; delete m.khoCu;
    m.suaLuc = now; m.khoiPhucLuc = now;
    if(m.driveId && !laFileHeThong(m) && !m.driveMat) m.choDB = true;
    D[k] = D[k]||[]; D[k].push(m); n++; return false;
  });
  /* 3.153: ô Số liệu — chép lại bản trong máy / lấy lại từ Thùng rác Drive (lần lượt, chạy ngầm) */
  slCho.reduce(function(p, m){ return p.then(function(){ return slKhoiPhucRac(m).then(function(t){ bao('Đã khôi phục '+t+' về tab Số liệu.', 4); if(nganHienTai===7) veSoLieu(); })
    .catch(function(er){ D.rac.push(m); luu(); capNhatDemRac(); if(DK.mo) ve(); baoLoi('Chưa khôi phục được '+(m.tenMoi||'')+': '+(er && er.message || er)); }); }); }, Promise.resolve());
  if(typeof HS!=='undefined') HS.ds = D.scan;
  luu();
  if(DR.sanSang && DR.online) chayDongBoCho(); else capNhatChip();
  return n;
}
/* 3.153 (anh chốt "thống nhất quy tắc xóa"): MỤC NHỎ không có file (việc lịch, lần làm việc, kế hoạch KTGS, bộ biểu mẫu)
   cũng vào 🗑 Thùng rác (ngăn Mục nhỏ) — xóa 1 mục không hỏi, khôi phục về đúng chỗ. */
var MUC_NHO = {
  lich:{ten:'Việc lịch', kp:function(m){ var L = lcData(); L.viec.push(m.data); L.daXoa = (L.daXoa||[]).filter(function(x){ return x.id!==m.data.id; }); m.data.suaLuc = new Date().toISOString(); if(typeof henDongBoLich==='function') henDongBoLich(); }},
  ktKH:{ten:'Kế hoạch KTGS', kp:function(m){ var S = D.cauHinh.ktKH = D.cauHinh.ktKH || {}; var o = JSON.parse(JSON.stringify(m.data)); o.luc = new Date().toISOString(); S[m.khoa] = o; }},
  boBM:{ten:'Bộ biểu mẫu', kp:function(m){ dsBo().push(m.data); }}
};
function racMucNho(loai, ten, noi, data, them){
  var now = new Date().toISOString(), m = {id:'mn'+Date.now().toString(36)+Math.random().toString(36).slice(2, 6), khoCu:'mucNho', loaiNho:loai, tenMoi:ten, noiCuChu:noi, data:JSON.parse(JSON.stringify(data)), xoaLuc:now, suaLuc:now, lyDoXoa:'Anh xóa'};
  Object.keys(them||{}).forEach(function(k){ m[k] = them[k]; });
  D.rac = D.rac || []; D.rac.push(m); luu(); capNhatDemRac();
  bao('Đã chuyển '+(MUC_NHO[loai] ? MUC_NHO[loai].ten.toLowerCase() : 'mục')+' “'+String(ten).slice(0, 50)+'” vào 🗑 Thùng rác — cần thì khôi phục ở đó.', 4);
  return m;
}
function mucNhoKhoiPhuc(m){ var x = MUC_NHO[m.loaiNho]; if(x) x.kp(m); luu(); }
/* 3.32 (anh Nhân chốt): KHÔNG xóa vĩnh viễn nữa — chuyển vào thùng rác Google Drive (trashed:true).
   Google giữ 30 ngày rồi tự xóa; cần lấy lại thì vào Thùng rác của Drive. 404 = đã mất sẵn → coi như xong */
function xoaFileDrive(driveId){
  return canToken().then(function(co){
    if(!co) throw new Error('Chưa nối Drive');
    return fetch('https://www.googleapis.com/drive/v3/files/'+driveId+'?fields=id',
      {method:'PATCH', headers:{'Authorization':'Bearer '+DR.token, 'Content-Type':'application/json'},
       body:JSON.stringify({trashed:true})});
  }).then(function(r){
    if(r.ok || r.status===204 || r.status===404) return true;
    throw new Error('Drive báo lỗi '+r.status);
  });
}
function xoaHanRac(ids, tieuDe){
  var ds = (D.rac||[]).filter(function(m){ return ids.indexOf(m.id)>=0; });
  if(!ds.length) return bao('Chưa chọn mục nào.', 3);
  var canDrive = ds.some(function(m){ return m.driveId && !m.driveMat && !laFileHeThong(m); });
  if(canDrive && !(DR.sanSang && DR.online))
    return baoLoi('Cần nối Drive để xóa hẳn file trên Drive. Bấm chip Drive ở dải dưới để nối rồi làm lại.');
  var dl = ds.reduce(function(a,m){ return a+(+m.co||0); }, 0);
  moHop('<div class="hop-tit">'+coChuHTML(tieuDe||'Xóa hẳn')+' — '+ds.length+' file?</div>'+
    '<div class="bot-ds">'+ds.slice(0,30).map(function(m){ return '<div>• '+coChuHTML(m.tenMoi||m.ten||m.tenCu||'')+'</div>'; }).join('')+
      (ds.length>30?'<div>… và '+(ds.length-30)+' file nữa</div>':'')+'</div>'+
    '<div class="hop-phu">Bỏ khỏi app, bản sao trong máy cũng xóa'+(dl?' ('+kichCo(dl)+')':'')+'. '+
    (canDrive?'File trên Drive chuyển vào <b>thùng rác Google Drive</b> — Google giữ 30 ngày rồi tự xóa, trong thời gian đó vẫn lấy lại được ở drive.google.com › Thùng rác. ':'')+
    'Máy kia cũng bỏ theo khi đồng bộ.</div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
    '<button class="nho xau" onclick="thucHienXoaHan(['+ds.map(function(m){ return '\''+m.id+'\''; }).join(',')+'])">Xóa hẳn '+ds.length+' file</button></div>');
}
function thucHienXoaHan(ids, imLang){
  var ds = (D.rac||[]).filter(function(m){ return ids.indexOf(m.id)>=0; });
  if(!imLang){ dongHop(); batChay(true, 'Đang xóa hẳn…'); }
  var xong = 0, loi = 0, now = new Date().toISOString();
  D.daXoaHan = D.daXoaHan || [];
  return ds.reduce(function(p, m){
    return p.then(function(){
      var buoc = (m.driveId && !m.driveMat && !laFileHeThong(m)) ? xoaFileDrive(m.driveId) : Promise.resolve(true);
      return buoc.then(function(){
        xoaFile(m.id); xoaAnhMayCua(m); if(m.khoCu==='soLieu') slXoaHanRac(m);   /* 3.153 */
        D.rac = D.rac.filter(function(x){ return x.id!==m.id; });
        D.daXoaHan.push({id:m.id, driveId:m.driveId||'', luc:now});
        xong++;
      }).catch(function(e){ console.warn('Không xóa được', m.tenMoi, e); loi++; });
    });
  }, Promise.resolve()).then(function(){
    TU_DON_RAC = false;
    if(!imLang) tatChay();
    luu(); capNhatDemRac(); ve();
    if(imLang){ if(xong) bao('Đã tự xóa hẳn '+xong+' file rác cũ hơn 30 ngày.', 5); return; }
    bao('Đã xóa hẳn '+xong+' file'+(loi?' · '+loi+' file lỗi, còn trong thùng rác':'')+'.', 6);
  });
}
/* ==========================================================
   3.144 — BỎ TAB THÁNG (anh chốt Q5, Q12, 10/10/2026): xóa dữ liệu cũ của tab một lần, không sao lưu.
   - Mục Dữ liệu tháng (D.duLieu), mục nhóm duLieu trong khay chờ và thùng rác: bản trong máy xóa, file trên Drive vào
     THÙNG RÁC DRIVE (lấy lại được 30 ngày), ghi dấu daXoaHan để máy khác bỏ theo khi đồng bộ.
   - Thư mục "<thư mục gốc>/Dữ liệu tháng" trên Drive (cả file không có trong chỉ mục) → thùng rác Drive.
   - Chưa nối Drive: mục không có file trên Drive xóa ngay; còn lại chờ lần nối Drive sau. Xong cả thư mục thì đặt cờ boThang.
   ========================================================== */
var BO_THANG_CHAY = false;
function boThangMuc(){
  var la = function(m){ return m && (m.nhom==='duLieu' || m.khoCu==='duLieu'); };
  return (D.duLieu||[]).map(function(m){ return {m:m, kho:'duLieu'}; })
    .concat((D.cho||[]).filter(la).map(function(m){ return {m:m, kho:'cho'}; }))
    .concat((D.rac||[]).filter(la).map(function(m){ return {m:m, kho:'rac'}; }));
}
function boThangDon(){
  if(BO_THANG_CHAY || D.cauHinh.boThang==='xong') return Promise.resolve(0);
  var coDrive = !!(DR.sanSang && DR.online), ds = boThangMuc(), now = new Date().toISOString(), xong = 0, loi = 0;
  BO_THANG_CHAY = true; D.daXoaHan = D.daXoaHan || [];
  return ds.reduce(function(p, x){
    return p.then(function(){
      var m = x.m, coFile = m.driveId && !m.driveMat && !laFileHeThong(m);
      if(coFile && !coDrive) return;   /* chờ nối Drive */
      return (coFile ? xoaFileDrive(m.driveId) : Promise.resolve(true)).then(function(){
        try{ xoaFile(m.id); xoaAnhMayCua(m); }catch(e){}
        D[x.kho] = (D[x.kho]||[]).filter(function(y){ return y.id!==m.id; });
        if(!D.daXoaHan.some(function(t){ return t.id===m.id; })) D.daXoaHan.push({id:m.id, driveId:m.driveId||'', luc:now});
        xong++;
      }).catch(function(e){ loi++; console.warn('Bỏ tab Tháng: không xóa được', m.tenMoi, e); });
    });
  }, Promise.resolve()).then(function(){
    if(!coDrive || loi) return false;
    return baoDamDuong(D.cauHinh.thumuc).then(function(goc){ return timFileTrong('Dữ liệu tháng', goc); })
      .then(function(f){ return f ? xoaFileDrive(f.id) : true; })
      .then(function(){ return true; }, function(e){ console.warn('Bỏ tab Tháng: thư mục Drive', e); return false; });
  }).then(function(daTM){
    BO_THANG_CHAY = false;
    if(daTM && !boThangMuc().length) D.cauHinh.boThang = 'xong';
    if(xong || daTM){ luu(); capNhatDemRac(); ve(); }
    if(xong) bao('Đã bỏ tab Tháng: xóa '+xong+' mục dữ liệu cũ'+(daTM ? ', thư mục “Dữ liệu tháng” trên Drive vào thùng rác Drive (lấy lại được 30 ngày)' : '')+(loi ? ' · '+loi+' mục lỗi, sẽ thử lại' : '')+'.', 7);
    return xong;
  });
}
/* chọn nhanh trong thùng rác: tất cả / cũ hơn N ngày */
function idChonRac(){
  return Array.prototype.slice.call(document.querySelectorAll('#rac-ds input[type=checkbox]:checked'))
    .map(function(c){ return c.value; });
}
function demChonRac(){
  var ids = idChonRac(), e = document.getElementById('rac-chon');
  var dl = (D.rac||[]).filter(function(m){ return ids.indexOf(m.id)>=0; }).reduce(function(a,m){ return a+(+m.co||0); },0);
  if(e) e.textContent = ids.length ? 'Đã chọn '+ids.length+' mục · '+kichCo(dl) : 'Chưa chọn mục nào';
}
function capNhatDemRac(){
  var e = document.getElementById('dem-rac'), n = (D.rac||[]).length;
  if(e){ e.textContent = n ? (n>99?'99+':n) : ''; e.style.display = n ? '' : 'none'; }
}
function xoaMuc(id){ return xoaVaoRac(id); }

/* ==========================================================
   CHỜ KHAI (3.11) — mọi file chưa đủ thông tin về MỘT danh sách, xem ở tab Văn bản
   Nguồn: khay (Thêm file) · mục trong tủ thiếu thông tin / mới quét (choKhai) · scan lưu tạm
   Khai xong (Lưu) là rời danh sách; mục ở khay thì Lưu = vào tủ luôn
   ========================================================== */
var CHO_KHAI = false;
function thieuThongTin(m){
  var t = [];
  if(laBieuMau(m)){ if(!m.mang) t.push('mảng'); return t; }
  if(m.nhom==='duLieu'){ if(!m.ky) t.push('kỳ'); if(!m.maLoai || m.maLoai==='KHAC') t.push('loại báo cáo'); return t; }
  if(m.nhom==='ghiChu'){ if(!m.moTa) t.push('mô tả'); return t; }
  if(!m.ngay) t.push('ngày');
  if(!(m.tenVB||m.trichYeu)) t.push('tên');
  if(m.nhom!=='khac'){ if(!m.mang) t.push('mảng'); }   /* 3.98 (anh chốt): CT vay không bắt buộc — có văn bản không liên quan chương trình vay (lọc "Chưa gắn CT" vẫn tìm được) */
  return t;
}
function dsChoKhai(){
  var g = {khay:[], vanBan:[], duLieu:[], ghiChu:[], bieuMau:[], scan:[]};
  (D.cho||[]).forEach(function(m){ g.khay.push({m:m, thieu:thieuThongTin(m),
    nguon:'Thêm file — chưa vào tủ · thuộc tab '+(TEN_NHOM[m.nhom]||'Văn bản')+(m.tuTab && m.tuTab!==m.nhom ? ' (thêm từ tab '+(TEN_NHOM[m.tuTab]||m.tuTab)+')' : '')}); });
  ['vanBan','duLieu','ghiChu','bieuMau'].forEach(function(k){
    (D[k]||[]).forEach(function(m){
      if(laFileHeThong(m)) return;
      var th = thieuThongTin(m);
      if(th.length || m.choKhai) g[k].push({m:m, thieu:th, nguon: m.lyDoKhai || (m.choKhai?'Mới quét từ Drive':'Trong tủ')});
    });
  });
  (D.scan||[]).forEach(function(k){ if(k.chuaKhai) g.scan.push({m:k, thieu:['tên, địa bàn'], nguon:'Scan lưu tạm'}); });
  return g;
}
function demChoKhai(){
  var g = dsChoKhai(); return Object.keys(g).reduce(function(a,k){ return a+g[k].length; }, 0);
}
var CK_TEN = {khay:'Khay — file vừa thêm', vanBan:'Văn bản', duLieu:'Dữ liệu tháng', ghiChu:'Ghi chú', bieuMau:'Biểu mẫu', scan:'Scan lưu tạm'};
function moChoKhai(){
  CHO_KHAI = true; window.__giuCK = true;
  try{ if(nganHienTai!==1) doiNgan(1); else ve(); } finally { window.__giuCK = false; }
  window.scrollTo(0,0);
}
function dongChoKhai(){ CHO_KHAI = false; ve(); }
function xoaChoKhai(id){
  var m0 = (D.cho||[]).find(function(x){ return x.id===id; });
  if(!m0) return xoaNhieuVaoRac([id], function(){ if(CHO_KHAI) ve(); });
  /* file ở khay (chưa vào tủ): Hoàn tác trả về đúng khay — khôi phục thường từ thùng rác thì vào tab như cũ */
  var goc = JSON.parse(JSON.stringify(m0));
  chuyenVaoRac([id], 'Anh xóa ở Chờ khai'); ve(); capNhatDemRac();
  baoHoanTac('Đã chuyển vào thùng rác.', function(){
    D.rac = (D.rac||[]).filter(function(x){ return x.id!==id; });
    if(!D.cho.some(function(x){ return x.id===id; })) D.cho.push(goc);
    luu(); capNhatDemRac(); ve(); bao('Đã hoàn tác — file về lại khay chờ.', 3);
  });
}
/* 3.54 (anh chốt): cảnh báo chờ khai thành chip vàng gọn bên phải dòng "+ Thêm file" — tab Văn bản đếm tất cả,
   tab khác đếm phần của tab đó; bấm mở danh sách Chờ khai */
function chipChoKhai(tab){
  if(CHO_KHAI) return '';
  var g = dsChoKhai(), n = tab==='vanBan' ? Object.keys(g).reduce(function(a,k){ return a+g[k].length; }, 0) : (g[tab]||[]).length;
  if(!n) return '';
  var ct = Object.keys(g).filter(function(k){ return g[k].length; }).map(function(k){ return CK_TEN[k].split(' — ')[0]+' '+g[k].length; }).join(' · ');
  return '<button class="chip-ck" onclick="moChoKhai()" title="File chờ khai thông tin: '+coChuHTML(ct)+' — bấm mở danh sách">📥 '+n+'<span class="ck-chu"> chờ khai ›</span></button>';
}
function tenKho(nhom){
  return {vanBan:'Văn bản', duLieu:'Dữ liệu tháng', ghiChu:'Ghi chú', bieuMau:'Biểu mẫu', scan:'Scan'}[nhom] || 'Văn bản';
}
function veChoKhai(){
  var g = dsChoKhai(), n = Object.keys(g).reduce(function(a,k){ return a+g[k].length; }, 0);
  var h = '<div class="ck-dau"><button class="nho" onclick="dongChoKhai()">‹ Danh sách văn bản</button>'+
    '<b>📥 Chờ khai thông tin ('+n+')</b></div>'+
    '<div class="huong-dan" style="margin:0 0 10px">File chưa đủ thông tin (số hiệu, ngày, tên, mảng, chương trình vay…) hoặc mới quét từ Drive. '+
    'Bấm <b>Khai</b> → điền → <b>Lưu</b> là rời danh sách; file ở khay thì Lưu là vào tủ luôn.</div>';
  if(!n) return h+'<div class="rong">Không còn file nào chờ khai. Kho đã gọn gàng.</div>';
  Object.keys(g).forEach(function(k){
    if(!g[k].length) return;
    h += '<div class="ck-nhom"><div class="nhan-nhom">'+CK_TEN[k]+' ('+g[k].length+')</div>'+
      g[k].map(function(x){
        var m = x.m, fn = k==='scan' ? 'themKhach' : (k==='bieuMau' ? 'suaBieuMau' : 'khaiTuDanhSach');
        var dich = (k==='khay') ? tenKho(m.nhom) : CK_TEN[k].split(' — ')[0];
        /* 3.50: bấm tên là xem thử (khung phải / khung lớn) + luôn hiện đường dẫn thật */
        var loaiX = k==='scan' ? 'scan' : (k==='khay' ? 'cho' : 'muc');
        return '<div class="ck-dong"><div class="ck-ten dk-ten" onclick="xemThu(\''+loaiX+'\',\''+m.id+'\')" title="Bấm để xem thử"><b>'+coChuHTML(m.tenMoi||m.ten||m.tenCu||'(chưa đặt tên)')+'</b>'+
          '<small><span class="ck-dich">→ '+coChuHTML(dich)+'</span> · '+coChuHTML(x.nguon)+
          (x.thieu.length?' · <span class="ck-thieu">thiếu '+coChuHTML(x.thieu.join(', '))+'</span>':' · cần xác nhận lại')+
          ' · <span class="ck-duong" title="'+coChuHTML(duongThat(m, k==='khay'?'cho':''))+'">'+coChuHTML(duongThat(m, k==='khay'?'cho':''))+'</span></small></div>'+
          '<span class="ck-nut"><button class="nho chinh" onclick="'+fn+'(\''+m.id+'\')">Khai</button>'+
          /* 3.56 (anh chốt): không cần thì bỏ luôn — theo quy tắc chung: vào thùng rác, có ↩ Hoàn tác */
          '<button class="nho xau" onclick="xoaChoKhai(\''+m.id+'\')" title="Không cần — bỏ vào thùng rác (có ↩ Hoàn tác)">🗑 Xóa</button></span></div>';
      }).join('')+'</div>';
  });
  return h;
}
function khaiTuDanhSach(id){ window.__tuChoKhai = id; suaCho(id); }

/* ---------- CHỤP / CHỌN ẢNH GHI CHÚ ---------- */
function chonAnh(){
  moHop('<div class="hop-tit">Thêm ghi chú</div>'+
    '<div class="hop-phu">Chụp thẳng để lưu lại lưu ý ngay tại chỗ, hoặc lấy ảnh đã có trong máy.</div>'+
    '<div class="hang-nut">'+
      '<button class="nho chinh" onclick="dongHop();layAnh(1)">Chụp ảnh</button>'+
      '<button class="nho" onclick="dongHop();layAnh(0)">Chọn từ máy</button>'+
    '</div>');
}
function layAnh(chup){
  var i = document.createElement('input');
  i.type = 'file'; i.accept = 'image/*';
  if(chup) i.capture = 'environment'; else i.multiple = true;
  i.onchange = function(){
    gioiThieuFile(i.files);
    if(chup) setTimeout(function(){ if(D.cho.length) suaCho(D.cho[D.cho.length-1].id); }, 900);
  };
  i.click();
}

/* ---------- 9. CÀI ĐẶT ---------- */
var TAB_CD = [
  {ma:'vanBan',  ten:'Văn bản',       ico:'📄'},
  {ma:'ghiChu',  ten:'Ghi chú',       ico:'🖼'},
  {ma:'scan',    ten:'Scan hồ sơ',    ico:'🪪'},
  {ma:'bieuMau', ten:'Biểu mẫu',      ico:'📋'}
];
var CD_MO = 'vanBan';

function moCaiDat(mucMo){
  if(mucMo) CD_MO = mucMo;
  document.getElementById('hop').classList.add('trang');
  /* 3.40: tự lưu — bỏ nút Lưu, chỉ còn Đóng */
  var h = '<div class="cd-dau"><span class="t">Cài đặt</span><span class="cd-tuluu">Tự lưu mỗi thay đổi</span>'+
    '<button onclick="dongCaiDat()">Đóng (Esc)</button></div>'+
    '<div class="cd-khung">'+
      '<nav class="cd-ben">'+ veMenuCD() +'</nav>'+
      '<div class="cd-than" id="cd-noi">'+ veNoiCD(CD_MO) +'</div>'+
    '</div>';
  moHop(h, true);
  khoaHop = true;
  ganTuLuuCD();
}
function veMenuCD(){
  var nhom1 = TAB_CD.map(function(t){
    return '<button'+(CD_MO===t.ma?' class="bat"':'')+' onclick="doiCD(\''+t.ma+'\')">'+
      '<span class="ic">'+t.ico+'</span>'+t.ten+'</button>';
  }).join('');
  var nhom2 = [
    ['chung','⚙','Chung'], ['drive','☁','Google Drive'],
    ['diaban','🗺','Địa bàn'], ['chimuc','🧰','Bảo trì kho'],
    ['lich','📅','Lịch & ngày chay'], ['dulieu','💾','Dữ liệu app'], ['hd','❓','Hướng dẫn']
  ].map(function(x){
    return '<button'+(CD_MO===x[0]?' class="bat"':'')+' onclick="doiCD(\''+x[0]+'\')">'+
      '<span class="ic">'+x[1]+'</span>'+x[2]+'</button>';
  }).join('');
  return '<div class="cd-nhan">Từng tab</div>'+nhom1+
         '<div class="cd-nhan">Cài chung</div>'+nhom2+
         '<div class="ban-app nho-gon">Bản '+APP_BAN+'<br>'+APP_LUC+'<br><span class="tac-gia">NhanNT</span></div>';
}
function doiCD(k){
  CD_MO = k;
  var e = document.getElementById('cd-noi');
  if(e) e.innerHTML = veNoiCD(k);
  var b = document.querySelectorAll('.cd-ben button');
  for(var i=0;i<b.length;i++)
    b[i].classList.toggle('bat', b[i].getAttribute('onclick').indexOf("'"+k+"'")>=0);
}

/* ---- trang cài đặt của một TAB ---- */
function veNoiCD(k){
  var c = D.cauHinh;
  var t = TAB_CD.find(function(x){ return x.ma===k; });
  if(t) return veCDTab(t);

  if(k==='chung'){
    return '<h3>Hiển thị</h3>'+
      '<div class="o"><label>Cỡ chữ</label><div class="co-chu" id="cd-co">'+
      [['Nhỏ',.9],['Vừa',1],['To',1.12]].map(function(x){
        return '<button'+(Math.abs(c.coChu-x[1])<.01?' class="bat"':'')+
          ' onclick="datCo('+x[1]+',this)">'+x[0]+'</button>';
      }).join('')+'</div></div>'+
      '<div class="o"><label>Giao diện</label><div class="co-chu" id="cd-gd">'+
      [['Theo máy','auto'],['Sáng','light'],['Tối','dark']].map(function(x){
        return '<button'+(c.giaoDien===x[1]?' class="bat"':'')+
          ' onclick="datGiaoDien(\''+x[1]+'\',this)">'+x[0]+'</button>';
      }).join('')+'</div></div>'+
      /* 3.39: dời từ trang Google Drive sang đây cho đúng chỗ */
      '<h3>Bố cục</h3><div class="hang-nut">'+
      '<button class="nho chinh" onclick="kiemTraKhungXem()">Kiểm tra &amp; sửa khung xem</button>'+
      '<button class="nho" onclick="datLaiBoCuc()">Đặt lại bố cục 2 cột</button></div>'+
      '<div class="huong-dan">Đưa độ rộng 2 cột và khung xem nhanh của mọi tab về mặc định (danh sách 60% · khung xem 40%, tab Tháng 65/35). Kéo vạch ⠿ giữa 2 cột để chỉnh, app nhớ riêng từng tab; bấm đúp vạch để trả về mặc định.<br>'+chanDoanBoCuc()+'</div>'+
      '<h3>Đơn vị</h3>'+
      o('Tên đơn vị','cd-donvi',c.donvi,'Hiện trên thanh tiêu đề')+
      o('Thư mục gốc trên Drive','cd-thumuc',c.thumuc,'App xếp file theo tên này')+
      '<h3>Đặt tên file</h3>'+
      '<div class="o"><div class="co-chu" id="cd-kt">'+
      [['Có dấu, dễ đọc','codau'],['Không dấu','khongdau']].map(function(x){
        return '<button'+((c.kieuTen||'codau')===x[1]?' class="bat"':'')+
          ' onclick="datKieuTen(\''+x[1]+'\',this)">'+x[0]+'</button>';
      }).join('')+'</div>'+
      '<div class="huong-dan">Có dấu: <b>2026-09-07 4079-NHCS-TDNN Hướng dẫn rà soát.pdf</b>'+
      '<br>Không dấu: <b>2026-09-07_CV-4079_Huong-dan-ra-soat.pdf</b></div></div>'+
      '<div class="o"><label>Cấu trúc tên (kiểu có dấu) — bật/tắt, đổi thứ tự</label>'+
      '<div id="cd-tenct">'+veTenCauTruc()+'</div>'+
      '<div class="huong-dan">Vẫn chỉ 3 thành phần gốc: Ngày · Số hiệu · Tên văn bản. '+
      'Tắt bớt hoặc đổi thứ tự tùy anh, không đổi thêm dữ liệu.</div></div>'+
      o('Số trang đọc để lấy thông tin','cd-sotrang',String(c.soTrangDoc),
        'Mặc định 2. Tăng nếu trích yếu nằm sâu hơn')+
      '<h3>Danh mục dùng chung</h3>'+
      '<div class="huong-dan" style="margin-bottom:8px">Sửa thẳng trong ô, rời ô là lưu. <b>Đổi tên</b> thì file đang dùng đổi theo; '+
      '<b>xóa</b> mục đang có file thì app hỏi chuyển các file đó sang mục nào. <b>Từ khóa</b> giúp app tự nhận ra khi đọc văn bản mới '+
      '(gõ có dấu hay không dấu đều được).</div>'+
      '<h3>Mảng nghiệp vụ <small>văn bản chọn đúng 1</small></h3>'+dmHTML('mang')+
      '<h3>Chương trình vay</h3>'+dmHTML('ct')+
      '<div class="huong-dan">“Tất cả CT” (trước gọi Dùng chung) luôn có sẵn, không cần khai. Nút bấm hiện tên viết tắt, rê chuột thấy tên đầy đủ.</div>'+
      '<h3>Loại văn bản</h3>'+dmHTML('loai')+
      '<div class="huong-dan">Viết tắt dùng khi đặt tên file kiểu không dấu (ví dụ CV-4079). Chỉ áp cho file lưu từ nay; file cũ giữ tên.</div>'+
      '<div class="huong-dan">Tag riêng của từng tab (và Hội đoàn thể, nhãn ghi chú) sửa ở trang của tab đó bên trái.</div>';
  }

  if(k==='drive'){
    var tt = coTheNoiDrive()
      ? (DR.sanSang ? '<b style="color:var(--luc)">Đang nối bình thường</b>'
                    : '<b style="color:var(--vang)">Đã khai Client ID, chưa nối phiên này</b>')
      : (location.protocol!=='https:'
          ? '<b style="color:var(--vang)">App chạy không qua https nên chưa nối được</b>'
          : '<b style="color:var(--chu-phu)">Chưa khai Client ID</b>');
    return '<h3>Kết nối</h3>'+
      '<div class="huong-dan" style="margin-bottom:9px">Trạng thái: '+tt+
      '<br>Địa chỉ app: <b>'+coChuHTML(location.origin+location.pathname)+'</b></div>'+
      o('Google Client ID','cd-cid',c.clientId||'','Để trống = dùng Client ID gắn sẵn của anh. Chỉ điền khi đổi sang Client ID khác.')+
      '<div class="hang-nut" style="margin:-4px 0 10px"><button class="nho" onclick="chepClientId()">Chép Client ID đang dùng</button></div>'+
      o('Thư mục Drive trên máy (ổ G)','cd-gocmay',c.gocMay||'G:\\My Drive',
        'Dùng cho nút 📂 chép đường dẫn. Máy cài tiếng Việt có thể là G:\\Drive của tôi')+
      '<div class="hang-nut">'+
        '<button class="nho chinh" onclick="luuCaiDat(1)">Lưu rồi nối Drive</button>'+
        '<button class="nho" onclick="taoBoThuMuc()">Tạo bộ thư mục</button>'+
        '<button class="nho" onclick="xemCay()">Xem cây</button></div>'+
      '<h3>Cầu nối máy tính (Windows)</h3>'+
      '<div class="huong-dan" style="margin-bottom:6px">Cài một lần trên mỗi máy tính để bấm là <b>mở thẳng file trên ổ Google Drive</b> (Word, Excel, PDF), '+
        '<b>📋 chép file</b> rồi Ctrl+V vào Zalo, <b>👁 xem nhanh</b> bằng bản tạm (tự xóa), <b>📂 mở thư mục</b>. App tự dò ổ Drive (My Drive / Drive của tôi).<br>'+
        '1) Bấm <b>Tải bộ cài</b> · 2) mở thư mục Tải về, bấm đúp file <b>cai-cau-noi-tu-ho-so.reg</b> → Yes → OK · 3) bấm <b>Mở thử</b> — trình duyệt hỏi "Mở Tủ hồ sơ?" thì tích <i>Luôn cho phép</i> → Mở. '+
        'Hiện hộp "Cầu nối đã chạy" là xong.</div>'+
      '<label class="tl-chon"><input type="checkbox"'+(coCauNoi()?' checked':'')+' onchange="datCauNoi(this.checked)"'+(laDT()?' disabled':'')+'> Máy này đã cài cầu nối</label>'+
      '<div class="hang-nut" style="margin:6px 0 10px"><button class="nho chinh" onclick="taiBoCaiCauNoi()">⬇ Tải bộ cài</button>'+
        '<button class="nho" onclick="moThuCauNoi()">Mở thử</button>'+
        '<button class="nho" onclick="taiBoCaiCauNoi(true)">Gỡ cầu nối</button></div>'+
      '<h3>Tự đồng bộ</h3>'+
      '<div class="huong-dan" style="margin-bottom:6px">Đẩy bản scan, chữ ký, CCCD và chỉ mục lên Drive để không mất dữ liệu. Lúc nào cũng bấm được <b>☁ Đồng bộ ngay</b> (hoặc bấm chấm Drive ở chân màn hình).</div>'+
      [['dbMoApp','Khi mở app',true],['dbRoiApp','Khi rời app (chuyển app khác, khóa máy, đóng)',true],
       ['dbSauLuu','Ngay sau khi lưu',true],['db5p','Mỗi 5 phút khi app đang mở',false]].map(function(x){
        var bat = x[2] ? c[x[0]]!==false : c[x[0]]===true;
        return '<label class="tl-chon"><input type="checkbox"'+(bat?' checked':'')+' onchange="D.cauHinh.'+x[0]+'=this.checked;luu()"> '+x[1]+'</label>';
      }).join('')+
      '<div class="hang-nut" style="margin:6px 0 10px"><button class="nho chinh" onclick="dongBoNgay()">☁ Đồng bộ ngay</button></div>'+
      /* 3.31 (mục 10 bàn giao): Google Picker — quét kho Drive cũ (quyền drive.file chỉ thấy file app tạo) */
      '<h3>Quét kho Drive cũ (Google Picker)</h3>'+
      o('API key của Google Picker','cd-apikey',c.apiKey||'','Tạo trong Google Cloud (cùng dự án với Client ID), bật Google Picker API, giới hạn key cho trang app. Chỉ lưu trong máy này.')+
      '<div class="hang-nut" style="margin:-4px 0 6px"><button class="nho chinh" onclick="luuCaiDat();moPicker()">Chọn thư mục / file cũ trên Drive…</button></div>'+
      '<div class="huong-dan">Anh tự chọn thư mục hoặc file trong kho cũ. App đọc nội dung, đề xuất tên chuẩn và đưa cả xấp vào <b>khay chờ</b>. '+
      '<b>Không đổi tên, không dời file</b> nào cho tới khi anh bấm Duyệt. Nếu chọn thư mục mà app không đọc được bên trong, '+
      'mở lại và chọn trực tiếp các file (giữ Ctrl/Shift để chọn nhiều).</div>'+
      '<h3>Khi duyệt file</h3>'+
      '<div class="o"><div class="co-chu" id="cd-len">'+
      [['Đưa thẳng lên Drive',true],['Chỉ lưu vào máy',false]].map(function(x){
        return '<button'+((c.tuLenDrive!==false)===x[1]?' class="bat"':'')+
          ' onclick="datLenDrive('+x[1]+',this)">'+x[0]+'</button>';
      }).join('')+'</div></div>'+
      '<h3>Cài đặt trên Drive</h3>'+
      '<div class="hang-nut">'+
        '<button class="nho" onclick="dayCauHinh()">Lưu lên Drive</button>'+
        '<button class="nho" onclick="keoCauHinh()">Lấy từ Drive</button></div>'+
      '<div class="huong-dan">Cất ở <b>_Hệ thống/cauhinh.json</b> — toàn bộ cài đặt (danh mục, khai báo Hội, chuẩn hóa, lịch kế hoạch, lựa chọn in…), trừ phần riêng từng máy (độ rộng khung, đang xem). '+
      'Tự đồng bộ khi mở app, khi quay lại app và vài giây sau mỗi lần sửa; 2 máy cùng sửa thì gộp. Nút trên dùng khi cần làm ngay.'+
      (c.chGhiLuc?('<br>Lần lưu gần nhất: '+ngayVN(c.chGhiLuc.slice(0,10))+
        ' '+c.chGhiLuc.slice(11,16)):'')+'</div>';
  }

  if(k==='diaban'){
    var dm = demDiaBan();
    return '<h3>Danh mục địa bàn</h3>'+
      '<div class="huong-dan" style="margin-bottom:9px">Đang có <b>'+dm.xa+'</b> xã/phường · <b>'+
      dm.diem+'</b> điểm giao dịch · <b>'+dm.ap+'</b> ấp/khu phố · <b>'+dm.to+'</b> tổ.</div>'+
      '<div class="hang-nut"><button class="nho chinh" onclick="moCayDB()">Mở cây địa bàn</button></div>'+
      /* 3.31: địa bàn quản lý — ma trận tab Tháng mặc định chỉ hiện và chỉ báo thiếu cho các xã này */
      '<h3>Địa bàn quản lý</h3>'+
      '<div class="o">'+dsDonVi('xa').map(function(x){
        return '<label class="dt-dong xql-dong"><input type="checkbox" value="'+coChuHTML(x)+'"'+
          ((D.cauHinh.xaQuanLy||[]).indexOf(x)>=0?' checked':'')+' onchange="datXaQuanLy(this.value, this.checked)"> '+
          coChuHTML(x)+' <small>'+diemCuaXa(x).length+' điểm giao dịch</small></label>';
      }).join('')+
      '<div class="huong-dan">Tick xã, phường anh phụ trách. Ma trận tab Tháng mặc định chỉ hiện các xã này và <b>chỉ báo thiếu</b> '+
      'cho PGD và các xã này; xã khác có file vẫn hiện, không có thì bỏ qua. Nút 👁 trên ma trận vẫn bật thêm xã khác được.</div></div>'+
      '<div class="hang-nut" style="margin-top:7px">'+
        '<button class="nho" onclick="xuatExcel()">Xuất Excel</button>'+
        '<button class="nho" onclick="napExcel()">Nạp Excel</button>'+
        '<button class="nho" onclick="xuatDB()">Xuất JSON</button>'+
        '<button class="nho" onclick="napDB()">Nạp JSON</button></div>'+
      '<div class="huong-dan">Xuất Excel để sửa hàng loạt hoặc nhờ AI chuẩn lại, xong nạp lại.</div>';
  }

  if(k==='lich'){
    return '<h3>Ngày chay (đạo Cao Đài)</h3>'+
      '<div class="o"><label>Hiện ngày chay trên lịch</label><select id="cd-chay">'+
      [['thap','Thập trai — 10 ngày: 1, 8, 14, 15, 18, 23, 24, 28, 29, 30 (tháng thiếu: 27 thay 30)'],
       ['luc','Lục trai — 6 ngày: 1, 8, 14, 15, 23, 30 (tháng thiếu: 29 thay 30)'],
       ['socvong','Chỉ mùng 1 và rằm'],['khong','Không hiện']].map(function(x){
        return '<option value="'+x[0]+'"'+((D.cauHinh.cheChay||'thap')===x[0]?' selected':'')+'>'+coChuHTML(x[1])+'</option>';
      }).join('')+'</select>'+
      '<div class="huong-dan">Theo Cao Đài Tự Điển (Tòa Thánh Tây Ninh). Phật giáo tính lục trai khác '+
      '(8, 14, 15, 23, 29, 30) — app dùng bản Cao Đài. App tự biết tháng âm thiếu hay đủ để đổi ngày thay thế.</div></div>'+
      '<h3>Cuốn sổ ghi chép</h3>'+
      '<div class="o"><label>Kiểu chữ</label><div class="co-chu">'+
        Object.keys(PHONG_SO).map(function(k){
          return '<button'+((D.cauHinh.phongSo||'codien')===k?' class="bat"':'')+' onclick="datPhongSo(\''+k+'\')">'+PHONG_SO[k].ten+'</button>';
        }).join('')+'</div>'+
      '<div class="huong-dan">Cả ba kiểu đều dùng phông có sẵn trong máy và đủ dấu tiếng Việt.</div></div>'+
      '<h3>Câu chữ trên cuốn sổ</h3>'+
      '<div class="o"><label>Khi nào đổi câu</label><select id="cd-checau">'+
        [['ngay','Cố định theo ngày — cả 2 máy giống nhau'],['moi','Đổi mỗi lần mở app'],
         ['bam','Chỉ đổi khi bấm nút ⟳'],['tat','Tắt, không hiện']].map(function(x){
          return '<option value="'+x[0]+'"'+(cheCau()===x[0]?' selected':'')+'>'+coChuHTML(x[1])+'</option>';
        }).join('')+'</select></div>'+
      '<div class="o"><label>Nhóm câu chữ</label>'+
        [['cadao','Ca dao · tục ngữ · thành ngữ'],['danhngon','Danh ngôn có tác giả'],['kienthuc','Kiến thức lịch sử, địa lý']]
          .map(function(x){
            var b = (D.cauHinh.nhomCau||{})[x[0]]!==false;
            return '<label class="dt-dong"><input type="checkbox" class="cd-nhomcau" value="'+x[0]+'"'+(b?' checked':'')+'> '+x[1]+'</label>';
          }).join('')+
      '<div class="huong-dan">“Ngày này năm xưa” chạy riêng, luôn hiện nếu ngày đó có sự kiện. '+
      'App gói sẵn '+CAU_GOI.length+' câu và '+Object.keys(NGAY_XUA).length+' ngày có sự kiện'+
      ((nguonCau().cauChu||[]).length?', cộng '+nguonCau().cauChu.length+' câu của anh trên Drive':'')+'.</div></div>'+
      '<div class="hang-nut"><button class="nho" onclick="taiNguonCauTuDrive().then(function(n){ bao(n?(\'Đã nạp \'+n+\' câu từ Drive.\'):\'Chưa thấy file nguon-cau.json trên Drive.\',5); })">Nạp nguồn của anh từ Drive</button></div>'+
      '<div class="huong-dan">Bỏ file <b>nguon-cau.json</b> vào <b>Tủ hồ sơ/_Hệ thống/</b> trên Drive (xem mẫu trong Hướng dẫn).</div>'+
      '<h3>Ngày lễ âm</h3><div class="huong-dan">App tự ghi: Tết, Rằm tháng Giêng, Giỗ Tổ, Phật đản, Đoan ngọ, Vu lan, Trung thu, Trùng cửu, Ông Táo, Giao thừa.</div>';
  }

  /* 3.42: BẢO TRÌ KHO — gom mọi việc quét / dọn / đồng bộ về một chỗ, mỗi việc ghi rõ làm gì và đụng tới gì */
  if(k==='chimuc'){
    /* 3.50 (anh chốt): Bảo trì kho gộp vào 🧰 Dọn kho — ở đây chỉ còn lối dẫn, không còn bản thứ hai */
    var loi = function(ic, ten, lam, phan){
      return '<div class="bt-the"><div class="bt-dau"><span class="bt-ic">'+ic+'</span><b>'+ten+'</b></div><div class="bt-lam">'+lam+'</div>'+
        '<div class="hang-nut"><button class="nho chinh" onclick="dongCaiDat();moDonKho(\''+phan+'\')">Mở</button></div></div>';
    };
    return '<h3>🧰 Dọn kho</h3>'+
      '<div class="huong-dan" style="margin-bottom:10px">Bảo trì kho đã gộp vào <b>🧰 Dọn kho</b> (nút trên thanh trên cùng, cạnh 🗑). Mọi việc xóa, rác, lập chỉ mục nằm một chỗ.</div>'+
      loi('🗑','Thùng rác','File anh đã xóa, chia ngăn theo tab — khôi phục về đúng chỗ, làm trống từng ngăn hoặc cả thùng, tự xóa sau 30 ngày (tùy chọn).','rac')+
      loi('🗂','Lập chỉ mục','Đi hết thư mục Tủ hồ sơ trên Drive, file nào chưa có trong app thì xếp vào đúng tab theo thư mục chứa file.','lcm')+
      loi('🧹','Quét rác','Tìm file hỏng, rỗng, trùng, thiếu thông tin, thư mục trống — anh tích rồi mới dọn.','quet')+
      loi('🛟','Sao lưu & khôi phục','7 bản gần nhất trong máy và trên Drive — so với máy hiện tại, lấy lại mục bị thiếu (không ghi đè).','saoluu')+
      loi('⋯','Khác','Lấy file từ kho Drive cũ (Picker) · đẩy / lấy chỉ mục giữa các máy · nhờ AI chuẩn hóa.','khac');
  }

  if(k==='dulieu'){
    return '<h3>Sao lưu chỉ mục</h3>'+
      '<div class="hang-nut">'+
        '<button class="nho" onclick="xuatDL()">Xuất ra file</button>'+
        '<button class="nho" onclick="napDL()">Nạp từ file</button></div>'+
      '<div class="huong-dan">Đang lưu <b>'+
      (D.vanBan.length+D.duLieu.length+D.ghiChu.length+(D.scan||[]).length+
       (D.bieuMau||[]).length)+'</b> mục. Nạp sẽ gộp thêm, không xóa cái đang có.</div>'+
      '<h3>Thùng rác · Dọn kho</h3>'+
      '<div class="hang-nut"><button class="nho" onclick="dongCaiDat();moRac()">🗑 Mở thùng rác'+
      ((D.rac||[]).length?(' ('+D.rac.length+')'):'')+'</button>'+
      '<button class="nho" onclick="dongCaiDat();moDonKho()">🧰 Mở Dọn kho</button></div>'+
      '<h3>🔄 Reset dữ liệu thử (giữ cài đặt)</h3>'+
      '<div class="huong-dan">Xóa hàng loạt dữ liệu nhập thử để bắt đầu dùng chính thức. <b>Giữ nguyên toàn bộ cài đặt</b>: địa bàn, danh mục, tag, mẫu báo cáo, Client ID, cách đặt tên, giao diện. '+
        'Máy kia xóa theo khi đồng bộ. Xóa vài file thì dùng <b>🗑 Xóa file</b> ở đầu mỗi tab.</div>'+
      '<div class="hang-nut"><button class="nho xau" onclick="moDonThu()">🔄 Reset dữ liệu thử…</button></div>'+
      '<details class="vung-nguy"><summary>⚠ Vùng nguy hiểm</summary>'+
      '<div class="huong-dan">Xóa sạch <b>mọi thứ của app trên máy này</b> — cả dữ liệu lẫn cài đặt, cả ảnh CCCD. '+
      '<b>Không đụng gì trên Drive</b>: nối Drive lại là lấy về chỉ mục (chimuc.json) và cài đặt (Cài đặt → Google Drive → Lấy từ Drive). '+
      'Dùng khi cho mượn máy, đổi máy hoặc app lỗi nặng.</div>'+
      '<div class="hang-nut"><button class="nho xau" onclick="moXoaSachMay()">Xóa sạch cả cài đặt trên máy này…</button></div>'+
      '</details>';
  }

  if(k==='hd') return huongDanNhanh();
  return '';
}

/* ---- một trang cài đặt cho một tab (3.40: chỉ tùy chọn có tác dụng, danh mục sửa trực tiếp, tự lưu) ---- */
function veCDTab(t){
  var k = t.ma, c = D.cauHinh;
  c.tabCD = c.tabCD || {};
  var ct = c.tabCD[k] || {};
  var kho = {vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu,
             scan:(D.scan||[]), bieuMau:(D.bieuMau||[])}[k] || [];
  var nut = function(id, ds, dang){
    return '<div class="o"><div class="co-chu" id="'+id+'">'+ds.map(function(x){
      return '<button'+(dang===x[1]?' class="bat"':'')+' onclick="chonMotNut(this)" data-v="'+x[1]+'">'+x[0]+'</button>';
    }).join('')+'</div></div>';
  };
  var h = '<h3>'+t.ico+' Tab '+t.ten+'</h3>'+
    '<div class="huong-dan" style="margin-bottom:12px">Đang có <b>'+kho.length+
    '</b> mục. Sửa là lưu và dùng được ngay bên tab.</div>';

  if(k==='vanBan') h += '<div class="huong-dan">Mảng nghiệp vụ, Chương trình vay, Loại văn bản (kèm từ khóa, viết tắt) nằm ở '+
    '<a class="lk" onclick="doiCD(\'chung\')">Cài đặt › Chung</a> vì dùng chung cho nhiều tab.</div>';

  h += '<h3>'+(k==='ghiChu' ? 'Nhãn ghi chú' : 'Tag của tab này')+'</h3>'+dmHTML('tag:'+k);
  if(k==='vanBan') h += '<div class="huong-dan">Từ khóa của tag để app gợi ý tag khi đọc văn bản mới.</div>';
  if(k==='bieuMau') h += '<div class="huong-dan">Ngoài các tag này, hàng lọc còn có sẵn <b>Mẫu trắng</b> và <b>Mẫu hướng dẫn</b> '+
    '(app tự biết theo ô “mẫu hướng dẫn”); <b>Tất cả CT</b> nằm ở hàng Chương trình.</div>';

  if(k==='vanBan'){
    h += '<h3>Kiểu xem mặc định</h3>'+nut('cdt-kieu', [['Danh sách','ds'],['Năm · tháng','thang']], ct.kieu||'ds');
  }
  if(k!=='scan'){
    var sap = [['Ngày','ngay'],['Tên','ten'],['Loại','loai'],['Dung lượng','co']];
    if(k==='bieuMau') sap = sap.concat([['Số lần dùng','dung'],['Năm VB gốc','namvb']]);
    h += '<h3>Sắp xếp mặc định</h3>'+nut('cdt-sap', sap, ct.sap||(k==='bieuMau'?'dung':'ngay'));
  }

  if(k==='duLieu'){
    h += '<h3>Mẫu báo cáo tháng</h3>'+
      '<div class="huong-dan" style="margin-bottom:6px">Bấm <b>⚙</b> để sửa tên, từ khóa nhận dạng, cấp tính thiếu, dạng hiển thị, chu kỳ. '+
      'Thêm, bỏ, đổi thứ tự báo cáo: bật <b>✎ Danh mục</b> trên ma trận tab Tháng.</div>'+
      dsMauCDHTML()+
      '<div class="hang-nut"><button class="nho" onclick="dongCaiDat();D.cauHinh.suaDM=true;luu();doiNgan(2)">Mở ✎ Danh mục trên ma trận</button></div>';
    h += '<h3>Hội đoàn thể</h3>'+dmHTML('hoi')+
      '<div class="huong-dan">Phạm vi (PGD / xã / điểm GD) lấy từ Cài đặt › Địa bàn.</div>';
    h += '<h3>Nhắc giao ban (tab Hôm nay)</h3>'+
      '<div class="ba"><div class="o"><label>Việc trên lịch có chữ</label><input id="cd-gb-tu" value="'+coChuHTML(c.gbTuKhoa||'giao ban')+'"></div>'+
      '<div class="o"><label>Báo trước (ngày)</label><input id="cd-gb-ngay" type="number" min="1" max="30" value="'+(parseInt(c.gbSoNgay,10)||7)+'"></div></div>'+
      '<div class="huong-dan">Tới gần ngày họp giao ban (việc trên lịch có chữ này, nhiều chữ cách nhau dấu phẩy) mà còn thiếu báo cáo thì tab Hôm nay nhắc.</div>';
  }

  if(k==='scan'){
    var inT = cauHinhInThe();
    h += '<h3>Chế độ quét mặc định</h3>'+nut('cdt-che', [['Thẻ — CCCD','the'],['Tài liệu — A4','tailieu']], c.scanChe||'the');
    var locNut = function(che){ return Object.keys(TEN_LOC).map(function(x){ return [TEN_LOC_NGAN[x]||TEN_LOC[x], x]; }); };
    h += '<h3>Kiểu màu mặc định</h3>'+
      '<div class="o"><label>Thẻ CCCD</label></div>'+nut('cd-loc-the', locNut('the'), locMacDinh('the'))+
      '<div class="o"><label>Tài liệu</label></div>'+nut('cd-loc-tl', locNut('tailieu'), locMacDinh('tailieu'))+
      '<div class="huong-dan">Ảnh mới vào hàng chờ dùng kiểu này; từng ảnh vẫn đổi được bằng nút màu.</div>';
    h += '<h3>Cỡ in CCCD (4 người / A4)</h3>'+
      '<div class="ba"><div class="o"><label>Bề ngang thẻ (mm)</label><input id="cd-in-rong" type="number" step="0.5" min="80" max="'+inT.toiDa+'" value="'+inT.rong+'"></div>'+
      '<div class="o"><label>Khe giữa 2 mặt (mm)</label><input id="cd-in-khe" type="number" step="0.5" min="2" max="15" value="'+inT.khe+'"></div></div>'+
      '<div class="huong-dan" id="cd-in-kq">Thẻ <b>'+inT.rong+' × '+inT.cao+' mm</b> (thẻ thật 85,6 × 54) · khe giữa 2 mặt '+inT.khe+' mm · '+
      'khe giữa các người ≈ '+inT.kheNguoi+' mm để cắt, ghi tên. Bề ngang tối đa '+inT.toiDa+' mm để 2 mặt vừa khổ A4. '+
      '<a class="lk" onclick="D.cauHinh.inThe=null;luu();doiCD(\'scan\')">Về mặc định (92 × 6)</a></div>';
    h += '<h3>Sau khi lưu hồ sơ</h3>'+
      '<div class="o"><div class="co-chu" id="cd-hsdr">'+
      [['Tự đưa PDF lên Drive',true],['Chỉ giữ trong máy',false]].map(function(x){
        return '<button'+((!!c.hsTuDrive)===x[1]?' class="bat"':'')+
          ' onclick="datHSDrive('+x[1]+',this)">'+x[0]+'</button>';
      }).join('')+'</div>'+
      '<div class="huong-dan">Hồ sơ lưu trong máy và bản PDF đưa lên Drive của anh (Tủ hồ sơ/CCCD/xã/điểm/ấp/tổ). '+
      'Ảnh CCCD không bao giờ gửi tới AI.</div></div>';
  }
  return h;
}
function chonMotNut(el){
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.remove('bat');
  el.classList.add('bat');
}
function layNutChon(id){
  var e = document.getElementById(id);
  if(!e) return '';
  var x = e.querySelector('button.bat');
  return x ? (x.dataset.v||'') : '';
}
function luuCDTab(k, ngam){
  var c = D.cauHinh;
  c.tabCD = c.tabCD || {};
  var ct = c.tabCD[k] = c.tabCD[k] || {};
  if(document.getElementById('cdt-tag')){
    c.tagTab = c.tagTab || {};
    c.tagTab[k] = gt('cdt-tag').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  }
  if(document.getElementById('cdt-nhan')) ct.nhanThem = gt('cdt-nhan');
  var kv = layNutChon('cdt-kieu'); if(kv) ct.kieu = kv;
  var sv = layNutChon('cdt-sap'); if(sv) ct.sap = sv;
  var cv = layNutChon('cdt-che'); if(cv){ c.scanChe = cv; SC.che = cv; }
  if(document.getElementById('cdt-mau')){
    c.mauBaoCao = gopMauBaoCao(gt('cdt-mau').split('\n').map(function(x){ return x.trim(); })
      .filter(Boolean).map(function(d){
        var p = d.split('|').map(function(x){ return x.trim(); });
        var cap = (p[3]||'').toLowerCase().split(',').map(function(x){ return x.trim(); })
          .filter(function(x){ return ['pgd','xa','diem'].indexOf(x)>=0; });
        return {ten:p[0]||'Báo cáo', ma:(p[1]||slug(p[0]||'bao-cao',4)).toUpperCase(),
          tuKhoa:(p[2]||'').split(',').map(function(x){ return x.trim(); }).filter(Boolean),
          cap:cap};
      }));
  }
  if(document.getElementById('cdt-hoi')){
    c.hoiDoanThe = gt('cdt-hoi').split('\n').map(function(x){ return x.trim(); }).filter(Boolean);
  }
  /* 3.40 */
  if(document.getElementById('cd-gb-tu')){ c.gbTuKhoa = gt('cd-gb-tu') || 'giao ban';
    var sn = parseInt(gt('cd-gb-ngay'),10); c.gbSoNgay = (sn>=1 && sn<=30) ? sn : 7; }
  var lt = layNutChon('cd-loc-the'), ll = layNutChon('cd-loc-tl');
  if(lt || ll){ c.scanLoc = c.scanLoc || {}; if(lt) c.scanLoc.the = lt; if(ll) c.scanLoc.tailieu = ll; }
  if(document.getElementById('cd-in-rong')){
    c.inThe = {rong:parseFloat(gt('cd-in-rong')), khe:parseFloat(gt('cd-in-khe'))};
    var it = cauHinhInThe(); c.inThe = {rong:it.rong, khe:it.khe};
    var kq = document.getElementById('cd-in-kq');
    if(kq){ document.getElementById('cd-in-rong').value = it.rong; document.getElementById('cd-in-khe').value = it.khe;
      kq.innerHTML = 'Thẻ <b>'+it.rong+' × '+it.cao+' mm</b> (thẻ thật 85,6 × 54) · khe giữa 2 mặt '+it.khe+' mm · khe giữa các người ≈ '+
        it.kheNguoi+' mm để cắt, ghi tên. Bề ngang tối đa '+it.toiDa+' mm để 2 mặt vừa khổ A4. '+
        '<a class="lk" onclick="D.cauHinh.inThe=null;luu();doiCD(\'scan\')">Về mặc định (92 × 6)</a>'; }
  }
  /* áp ngay cho tab đang mở */
  if(ct.kieu && ((k==='vanBan' && nganHienTai===1))) kieuXem = ct.kieu;
  if(ct.sap && tenTab()===k) SAP.cot = ct.sap;   /* 3.40: chỉ áp cho tab đang mở */
  luu(); ve();
  if(ngam) return;
  bao('Đã lưu cài đặt tab. Dùng được ngay.', 4);
  if(DR.sanSang) dayCauHinh(true);
}

function dongCaiDat(){
  /* ô đang gõ dở chưa rời chuột → rời để kịp tự lưu */
  var a = document.activeElement; if(a && a.blur && document.getElementById('cd-noi') && document.getElementById('cd-noi').contains(a)) a.blur();
  document.getElementById('hop').classList.remove('trang');
  dongHop();
}
function soDoLuuTru(){
  function nut(t, l){ return '<div class="sd-nut '+(l?'sd-'+l:'')+'">'+t+'</div>'; }
  function nhanh(tieu, lop, con){ return '<div class="sd-nhanh sd-'+lop+'">'+nut(tieu,'goc')+'<div class="sd-con">'+con.join('')+'</div></div>'; }
  var g = coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ');
  return '<div class="so-do"><div class="sd-tam">🗄 Tủ hồ sơ<small>dữ liệu nằm ở đâu, xóa đi đâu</small></div><div class="sd-ba">'+
    nhanh('💻 Trong máy (mỗi trình duyệt một bản)', 'may', [
      nut('<b>Dữ liệu</b> — chỉ mục 4 tab · Scan · khay chờ duyệt · thùng rác · Lịch · vừa xem'),
      nut('<b>Cài đặt</b> — địa bàn (xã · điểm · ấp · tổ) · danh mục mảng / CT vay / loại / tag / hội · mẫu báo cáo · cách đặt tên · Client ID · giao diện'),
      nut('<b>Bản sao file</b> — PDF, ảnh để xem nhanh không cần mạng · ảnh CCCD (bản PDF hồ sơ lên Drive, không gửi tới AI)'),
      nut('<b>Thư viện đọc PDF</b> — tải 1 lần, không phải dữ liệu của anh','nhat')
    ])+
    nhanh('☁ Trên Drive — '+g, 'drive', [
      nut('<b>Tài liệu thật</b> — Văn bản/năm · Dữ liệu tháng/năm/tháng · Ghi chú/năm · Biểu mẫu/CT vay · Khác'),
      nut('<b>_Chờ xử lý</b> — file chưa duyệt tên'),
      nut('<b>_Hệ thống</b> — cauhinh.json (bản sao cài đặt) · chimuc.json (bản sao chỉ mục, đồng bộ các máy) · du_phong (7 bản gần nhất) · lich.json'),
      nut('<b>_ThungRac</b> — file đã xóa, chờ xóa hẳn')
    ])+
    nhanh('🗑 Khi xóa', 'xoa', [
      nut('<b>1. Xóa</b> (🗑 trên dòng) → mục vào Thùng rác app, file Drive dời vào _ThungRac'),
      nut('<b>2. Khôi phục</b> → về đúng tab, đúng thư mục cũ'),
      nut('<b>3. Xóa hẳn</b> (trong 🗑, chọn / cũ hơn 7-14-30 ngày) → bỏ khỏi app, file Drive vào <b>thùng rác Google Drive</b> (Google giữ 30 ngày rồi tự xóa)'),
      nut('<b>🧹 Quét dọn</b> → tìm file thừa, trùng, mục gãy, thư mục trống → cho vào Thùng rác'),
      nut('<b>Xóa</b>: 🗑 Xóa file ở đầu tab → bấm file để tích → xóa → vào Thùng rác (lấy lại ở 🗑 Thùng rác → Khôi phục). <b>Cài đặt → Dữ liệu</b>: 🔄 Reset dữ liệu thử · Xóa sạch máy','nhat')
    ])+'</div></div>';
}
