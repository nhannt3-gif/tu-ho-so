/* ===== 3.411 (A2 — tách file lớn, anh duyệt hướng 27/10): HÔM NAY — ghi chú 2 chế độ · sổ gạch dòng (to-do) · hoàn tác · đính kèm · 💾 bộ nhớ máy.
   Chép nguyên từ js/04b-hom-nay.js (không đổi tên hàm); nạp ngay sau phần trước. ===== */
/* ==========================================================
   GHI CHÚ 2 CHẾ ĐỘ (3.12) — cùng một kho dữ liệu, đổi qua lại không mất chữ
     Đơn giản: một ô chữ trên giấy vàng (giữ y như bản 3.11) = mẩu "Ghi chép chung" của ngày
     Note:     lưới mẩu giấy màu, ghim, sửa tại chỗ
   Mẩu: {id, ngay, nd, mau:'vang|do|cam|xanh|trang', ghim, taoLuc, suaLuc}
   ========================================================== */
var NT_MAU = {vang:'Giấy vàng', do:'Việc gấp', cam:'Quan trọng', xanh:'Lưu ý', trang:'Ghi chép chung'};
function ntData(){
  var L = lcData(); L.note = L.note || []; L.noteXoa = L.noteXoa || [];
  /* chuyển ghi chép cũ (nhatKy) thành mẩu Ghi chép chung, chỉ làm một lần cho mỗi ngày */
  var nk = L.nhatKy || {};
  Object.keys(nk).forEach(function(ng){
    var t = (nk[ng]||{}).text || '';
    if(!t.trim()) return;
    if(L.note.some(function(x){ return x.ngay===ng && x.chung; })) return;
    L.note.push({id:'nk_'+ng, ngay:ng, nd:t, mau:'trang', chung:true, ghim:false,
      taoLuc:nk[ng].suaLuc||new Date().toISOString(), suaLuc:nk[ng].suaLuc||new Date().toISOString()});
  });
  return L;
}
/* ==========================================================
   SỔ GẠCH DÒNG (3.18) — chế độ 'don' nay là TO-DO LIST tuần tự:
   mỗi dòng một mục, Enter xuống dòng mới, tick xong, đổi màu, xóa, đưa lên SCHEDULE
   Dùng chung kho với Note màu: mẩu có kieu:'dong'
   ========================================================== */
function dsDong(iso){
  return ntData().note.filter(function(x){ return x.ngay===iso && x.kieu==='dong'; })
    .sort(function(a,b){
      return ((a.thuTu===undefined?9999:a.thuTu) - (b.thuTu===undefined?9999:b.thuTu)) ||
             (a.taoLuc||'').localeCompare(b.taoLuc||'');
    });
}
/* ghi chép cũ (một khối chữ dài) → tách theo dòng xuống hàng thành các mục, không mất chữ */
function tachChungThanhDong(iso){
  var m = ntChung(iso); if(!m || !(m.nd||'').trim()) return 0;
  var L = ntData(), t = new Date().toISOString(), n = 0, i = 0;
  (m.nd||'').split('\n').forEach(function(d){
    if(!d.trim()) return;
    L.note.push({id:idMoi(), ngay:iso, nd:d.trim(), mau:'trang', kieu:'dong', xong:'',
      thuTu:i++, taoLuc:t, suaLuc:t});
    n++;
  });
  L.note = L.note.filter(function(x){ return x.id!==m.id; });
  L.noteXoa.push({id:m.id, luc:t});
  /* xóa chữ ở kho cũ để lần vẽ sau không dựng lại mẩu chung rồi tách thêm lần nữa */
  L.nhatKy = L.nhatKy || {};
  if(L.nhatKy[iso]) L.nhatKy[iso] = {text:'', suaLuc:t};
  if(n) luu();
  return n;
}
function dongThem(iso, chu, mau, choRong){
  if(!choRong && !(chu||'').trim()) return null;   /* 3.31: choRong — Enter giữa danh sách tạo dòng trống để gõ tiếp */
  var t = new Date().toISOString(), ds = dsDong(iso);
  var m = {id:idMoi(), ngay:iso, nd:chu.trim(), mau:mau||'trang', kieu:'dong', xong:'',
    thuTu:(ds.length?(ds[ds.length-1].thuTu||ds.length-1)+1:0), taoLuc:t, suaLuc:t};
  ntData().note.push(m); luu(); henDongBoLich();
  return m;
}
function dongGoThem(el, iso, ev){
  ev = ev || window.event;   /* 3.31: nút Thêm truyền {key:'Enter'} — trước đây bị bỏ qua nên bấm nút không có tác dụng */
  if(!ev || ev.key!=='Enter') return;
  if(ev.preventDefault) ev.preventDefault();
  var m = dongThem(iso, el.value); if(!m) return;
  el.value = '';
  veNhatKy();
  var o = document.getElementById('nk-dong-moi'); if(o) o.focus();
}
/* ==========================================================
   HOÀN TÁC (3.19) — giữ 20 bước gần nhất trong phiên: xóa dòng, xóa nhiều,
   tick xong, đổi màu, đưa lên SCHEDULE. Ctrl+Z hoặc nút ↶ ở đáy sổ.
   Dòng đã xóa vẫn nằm trong thùng rác của Lịch 30 ngày (lớp an toàn thứ hai).
   ========================================================== */
var HOAN_TAC = [];
function ghiHoanTac(ten, ham){
  HOAN_TAC.push({ten:ten, ham:ham, luc:Date.now()});
  if(HOAN_TAC.length > 20) HOAN_TAC.shift();
}
function hoanTac(){
  var b = HOAN_TAC.pop();
  if(!b) return bao('Không còn bước nào để hoàn tác.', 3);
  try{ b.ham(); }catch(e){ console.warn(e); return baoLoi('Không hoàn tác được bước này.'); }
  luu(); henDongBoLich(); veLich();
  bao('Đã hoàn tác: '+b.ten+(HOAN_TAC.length?' · còn '+HOAN_TAC.length+' bước':''), 4);
}
function soHoanTac(){ return HOAN_TAC.length; }
function dongXong(id){
  var m = ntTim(id); if(!m) return;
  var cu = m.xong;
  m.xong = m.xong ? '' : new Date().toISOString();
  m.suaLuc = new Date().toISOString();
  ghiHoanTac(m.xong?'đánh dấu xong':'bỏ đánh dấu xong', function(){
    var x = ntTim(id); if(x) x.xong = cu;
  });
  luu(); henDongBoLich(); veNhatKy();
}
function dongDoiMau(id, mau){
  (function(){ var m0 = ntTim(id); if(m0) ghiHoanTac('đổi màu dòng', (function(cu){ return function(){ var x = ntTim(id); if(x) x.mau = cu; }; })(m0.mau)); })();
  var m = ntTim(id); if(!m) return;
  m.mau = mau; m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); dongHop(); veNhatKy();
}
/* xóa NGAY, không hỏi — có hoàn tác (anh chốt: ghi chú xóa thường xuyên, hỏi hoài rất rối) */
function dongXoa(ids){
  var L = ntData(), ds = (typeof ids==='string') ? [ids] : (ids||[]);
  var giu = L.note.filter(function(x){ return ds.indexOf(x.id)>=0; });
  if(!giu.length) return;
  L.note = L.note.filter(function(x){ return ds.indexOf(x.id)<0; });
  var luc = new Date().toISOString();
  giu.forEach(function(m){ L.noteXoa.push({id:m.id, luc:luc}); });
  var vaoRac = nkVaoRac(giu);   /* 3.52: dòng có ảnh / file riêng → thùng rác ngăn Hôm nay */
  ghiHoanTac('xóa '+giu.length+' dòng', function(){
    var K = ntData();
    if(vaoRac.length){ D.rac = (D.rac||[]).filter(function(x){ return vaoRac.indexOf(x.id)<0; }); capNhatDemRac(); }
    giu.forEach(function(m){ if(!K.note.some(function(x){ return x.id===m.id; })) K.note.push(m); });
    K.noteXoa = K.noteXoa.filter(function(x){ return ds.indexOf(x.id)<0; });
  });
  DONG_CHON = DONG_CHON.filter(function(x){ return ds.indexOf(x)<0; });
  luu(); henDongBoLich(); dongHop(); veNhatKy(); veLich();
  bao('Đã xóa '+giu.length+' dòng · bấm ↶ hoặc Ctrl+Z để lấy lại', 6);
}
/* chọn nhiều dòng bằng ô tick sẵn ở mỗi dòng */
var DONG_CHON = [];
function dongChon(id){
  var i = DONG_CHON.indexOf(id);
  if(i>=0) DONG_CHON.splice(i,1); else DONG_CHON.push(id);
  veNhatKy();
}
function dongChonHet(iso){
  var ds = dsDong(iso).map(function(m){ return m.id; });
  DONG_CHON = (DONG_CHON.length===ds.length) ? [] : ds;
  veNhatKy();
}
function dongBoChon(){ DONG_CHON = []; veNhatKy(); }
function dongMauNhieu(mau){
  var luc = new Date().toISOString(), cu = [];
  DONG_CHON.forEach(function(id){ var m = ntTim(id); if(m){ cu.push({id:id, mau:m.mau}); m.mau = mau; m.suaLuc = luc; } });
  ghiHoanTac('đổi màu '+cu.length+' dòng', function(){
    cu.forEach(function(x){ var m = ntTim(x.id); if(m) m.mau = x.mau; });
  });
  luu(); henDongBoLich(); veNhatKy();
}
function dongChuyen(id, huong){
  var m = ntTim(id); if(!m) return;
  var ds = dsDong(m.ngay), i = ds.findIndex(function(x){ return x.id===id; }), j = i+huong;
  if(i<0 || j<0 || j>=ds.length) return;
  ds.forEach(function(x,k){ x.thuTu = k; });
  var tmp = ds[i].thuTu; ds[i].thuTu = ds[j].thuTu; ds[j].thuTu = tmp;
  ds[i].suaLuc = ds[j].suaLuc = new Date().toISOString();
  luu(); henDongBoLich(); dongHop(); veNhatKy();
}
/* đưa một dòng lên SCHEDULE (việc theo lịch) */
function dongLenLich(id){
  var m = ntTim(id); if(!m) return;
  dongHop();
  moHop('<div class="hop-tit">Đưa lên SCHEDULE</div>'+
    '<div class="hop-phu">'+coChuHTML(m.nd||'')+'</div>'+
    '<div class="hai"><div class="o"><label>Ngày</label><input id="dl-ngay" inputmode="numeric" '+
      'value="'+ngayVN(m.ngay)+'" oninput="gonNgay(this)"></div>'+
    '<div class="o"><label>Lặp lại</label><select id="dl-lap">'+
      Object.keys(LC_LAP).map(function(k){ return '<option value="'+k+'">'+LC_LAP[k]+'</option>'; }).join('')+
      '</select></div></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
      '<button class="nho chinh" onclick="dongLenLichOK(\''+id+'\')">Đưa lên</button></div>');
}
function dongLenLichOK(id){
  var m = ntTim(id); if(!m) return;
  var iso = ngayISOo(gt('dl-ngay'));
  if(!iso) return baoLoi('Ngày chưa đúng, gõ dạng dd/mm/yyyy.');
  var t = new Date().toISOString();
  lcData().viec.push({id:idMoi(), ten:m.nd, ngay:iso, lap:gt('dl-lap')||'mot', luuY:false,
    xong:false, xongNgay:{}, bo:[], taoLuc:t, suaLuc:t});
  var L = ntData();
  L.note = L.note.filter(function(x){ return x.id!==id; });
  L.noteXoa.push({id:id, luc:t});
  luu(); henDongBoLich(); dongHop(); veLich(); veNhatKy();
  bao('Đã đưa lên SCHEDULE ngày '+lcDMY(iso)+'.', 5);
}
/* việc hôm qua chưa xong → chuyển sang hôm nay */
function dongChuaXongHomQua(iso){
  return dsDong(lcCong(iso,-1)).filter(function(x){ return !x.xong; });
}
function dongChuyenHomQua(iso){
  var ds = dongChuaXongHomQua(iso), t = new Date().toISOString();
  ds.forEach(function(m){ m.ngay = iso; m.suaLuc = t; });
  luu(); henDongBoLich(); veNhatKy(); veLich();
  bao('Đã chuyển '+ds.length+' việc chưa xong sang hôm nay.', 4);
}
function ntCheDo(){ return D.cauHinh.nkChe==='note' ? 'note' : 'don'; }
/* Enter ở giữa danh sách = thêm dòng mới ngay dưới; ô rỗng + Backspace = xóa dòng */
function dongPhim(ev, id, iso){
  if(ev.key==='Enter'){
    ev.preventDefault();
    var m = ntTim(id), ds = dsDong(iso);
    ds.forEach(function(x,k){ if(x.thuTu===undefined) x.thuTu = k; });
    var moi = dongThem(iso, '', null, true);
    if(moi && m){ moi.thuTu = (m.thuTu||0)+0.5; moi.nd=''; luu(); }
    veNhatKy();
    var o = document.querySelectorAll('.dong-o .dong-chu');
    for(var i=0;i<o.length;i++) if(!o[i].value.trim()){ o[i].focus(); break; }
  }else if(ev.key==='Backspace' && !ev.target.value){
    ev.preventDefault(); dongXoa(id);
  }
}
function dongCaoTuDong(el){ el.style.height='auto'; el.style.height=(el.scrollHeight)+'px'; }
function ntDatChe(che){
  if(ntCheDo()===che) return;
  D.cauHinh.nkChe = che; luu(); veNhatKy();
  bao(che==='note' ? 'Chế độ Note: mẩu giấy màu, ghim được. Chữ cũ vẫn còn nguyên.'
                   : 'Chế độ Đơn giản: một ô ghi chép như trước.', 4);
}
function ntNgay(iso){
  /* xếp ổn định: ghim trước, rồi theo thứ tự anh sắp (thuTu), rồi theo lúc tạo — KHÔNG theo lúc sửa
     (nếu theo lúc sửa thì mẩu nhảy chỗ ngay khi đang gõ) */
  return ntData().note.filter(function(x){ return x.ngay===iso; })
    .sort(function(a,b){
      return (b.ghim?1:0)-(a.ghim?1:0) ||
             ((a.thuTu===undefined?9999:a.thuTu) - (b.thuTu===undefined?9999:b.thuTu)) ||
             (a.taoLuc||'').localeCompare(b.taoLuc||'');
    });
}
function ntGhim(){ return ntData().note.filter(function(x){ return x.ghim; })
  .sort(function(a,b){ return (b.suaLuc||'').localeCompare(a.suaLuc||''); }); }
/* mẩu "Ghi chép chung" của ngày — CHỈ tạo khi thật sự có chữ, để không đẻ mẩu rỗng */
function ntChung(iso, tao){
  var L = ntData(), m = L.note.find(function(x){ return x.ngay===iso && x.chung; });
  if(!m && tao){ var t = new Date().toISOString();
    m = {id:idMoi(), ngay:iso, nd:'', mau:'trang', chung:true, ghim:false, taoLuc:t, suaLuc:t};
    L.note.push(m); }
  return m || null;
}
/* gõ ở chế độ Đơn giản: tạo mẩu chung ngay lần gõ đầu */
function ntTim(id){ return ntData().note.find(function(x){ return x.id===id; }); }
/* 3.18: lưu KHÔNG vẽ lại gì — trước đây vẽ lại lịch + sổ nên ô đang gõ bị thay,
   mất chỗ nhập, phải bấm lại mỗi chữ */
function ntLuuO(id, giaTri){
  var m = ntTim(id); if(!m) return;
  m.nd = giaTri; m.suaLuc = new Date().toISOString();
  luu();
  var t = document.getElementById('nt-luu-'+id) || document.getElementById('nk-luu');
  if(t) t.textContent = 'đã lưu '+m.suaLuc.slice(11,16);
  capNhatChamNgay(m.ngay);     /* chỉ sửa đúng 1 ô ngày trên lịch */
}
/* đổi chấm của một ngày trên lịch mà không vẽ lại cả lịch */
function capNhatChamNgay(iso){
  var o = document.querySelector('.lc-o[data-iso="'+iso+'"]'); if(!o) return;
  var vs = lcViecNgay(iso), co = vs.length || ntData().note.some(function(x){ return x.ngay===iso && (x.nd||'').trim(); });
  var mau = vs.some(function(v){ return v.luuY; }) ? 'cam' : (vs.length ? 'xanh' : 'nau');
  var i = o.querySelector('.lc-cham');
  if(!co){ if(i) i.remove(); return; }
  if(!i){ i = document.createElement('i'); o.appendChild(i); }
  i.className = 'lc-cham '+mau;
}
/* rời ô mới đẩy lên Drive — gõ tới đâu đồng bộ tới đó là thừa */
function ntRoiO(id){ henDongBoLich(); }
var NT_HEN = {};
function ntGo(id, el){
  var t = document.getElementById('nt-luu-'+id) || document.getElementById('nk-luu');
  if(t) t.textContent = 'đang gõ…';
  clearTimeout(NT_HEN[id]);
  NT_HEN[id] = setTimeout(function(){ ntLuuO(id, el.value); }, 400);
}
function ntThem(mau){
  var t = new Date().toISOString();
  ntData().note.push({id:idMoi(), ngay:LICH.chon, nd:'', mau:mau||'vang', ghim:false, taoLuc:t, suaLuc:t});
  luu(); henDongBoLich(); veNhatKy();
  setTimeout(function(){
    var o = document.querySelector('#nt-luoi .nt-o textarea'); if(o) o.focus();
  }, 30);
}
function ntDoiMau(id, mau){
  var m = ntTim(id); if(!m) return;
  m.mau = mau; m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veNhatKy();
}
function ntDoiGhim(id){
  var m = ntTim(id); if(!m) return;
  m.ghim = !m.ghim; m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veNhatKy();
  bao(m.ghim ? 'Đã ghim — mẩu này luôn hiện dù đổi ngày.' : 'Đã bỏ ghim.', 3);
}
function ntXoa(id){
  var m = ntTim(id); if(!m) return;
  (function(){   /* 3.153: không hỏi — mẩu vào 🗑 Thùng rác (ngăn Hôm nay), khôi phục được */
    var L = ntData();
    L.note = L.note.filter(function(x){ return x.id!==id; });
    L.noteXoa.push({id:id, luc:new Date().toISOString()});
    nkVaoRac([m]);
    luu(); henDongBoLich(); veNhatKy(); veLich(); bao('Đã chuyển mẩu ghi chú vào 🗑 Thùng rác — cần thì khôi phục ở đó.', 4);
  })();
}
/* đổi chỗ (điện thoại dùng nút, máy bàn kéo thả) */
function ntChuyen(id, huong){
  var ds = ntNgay(LICH.chon), i = ds.findIndex(function(x){ return x.id===id; });
  var j = i + huong; if(i<0 || j<0 || j>=ds.length) return;
  ds.forEach(function(x,k){ x.thuTu = k; });
  var a = ds[i], b = ds[j]; var tmp = a.thuTu; a.thuTu = b.thuTu; b.thuTu = tmp;
  a.suaLuc = b.suaLuc = new Date().toISOString();
  luu(); henDongBoLich(); veNhatKy();
}
var NT_KEO = null;
function ntKeoBatDau(id){ NT_KEO = id; }
function ntKeoTha(id){
  if(!NT_KEO || NT_KEO===id) return;
  var ds = ntNgay(LICH.chon);
  ds.forEach(function(x,k){ if(x.thuTu===undefined) x.thuTu = k; });
  var a = ntTim(NT_KEO), b = ntTim(id);
  if(a && b){ var t = a.thuTu; a.thuTu = b.thuTu; b.thuTu = t;
    a.suaLuc = b.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veNhatKy(); }
  NT_KEO = null;
}
/* ==========================================================
   ĐÍNH KÈM Ở TAB HÔM NAY (3.52) — 📷 chụp nhanh một chạm, 📎 gắn file vào dòng To-do / mẩu Note
   m.dinh = [{k:'rieng'|'muc'|'scan'|'ka', id, ten, co, loai, anh, driveId, driveCha, may, themLuc}]
   Ảnh chụp thu về cạnh dài 1600 px (JPEG ~300 KB) + ảnh nhỏ 240 px (id+'_nho') để danh sách nhẹ.
   File riêng: IndexedDB 'nf…', lên Drive: Tủ hồ sơ / Nhật ký / YYYY-MM. lich.json chỉ giữ tên + mã file.
   Xóa dòng có file riêng → thùng rác ngăn 📅 Hôm nay (khoCu:'homNay'), khôi phục về đúng ngày.
   ========================================================== */
var NK_CANH = 1600, NK_NHO = 240, NK_TRAN = 15*1024*1024, NK_URL = {}, NK_DANG = {};
/* thu nhỏ ảnh: cạnh dài tối đa `canh`, nền trắng, JPEG chất lượng cl */
function nkAnhRa(file, canh, cl){
  return new Promise(function(ok, loi){
    var u = URL.createObjectURL(file), im = new Image();
    im.onload = function(){
      var w = im.naturalWidth, h = im.naturalHeight, r = Math.min(1, canh/Math.max(w, h));
      var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w*r)); c.height = Math.max(1, Math.round(h*r));
      var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(u);
      c.toBlob(function(b){ if(b) ok(b); else loi(new Error('Không nén được ảnh')); }, 'image/jpeg', cl);
    };
    im.onerror = function(){ URL.revokeObjectURL(u); loi(new Error('Không đọc được ảnh')); };
    im.src = u;
  });
}
function nkGioChu(d){ return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }
function tenAnhNK(){
  var d = new Date();
  return lcDMY(lcISO(d)).replace(/\//g, '-')+' '+('0'+d.getHours()).slice(-2)+'h'+('0'+d.getMinutes()).slice(-2)+'m'+('0'+d.getSeconds()).slice(-2)+'.jpg';
}
/* lưu một file vào mục m (ảnh thì nén + làm ảnh nhỏ) */
function nkLuuFile(m, file, chup){
  var id = 'nf'+idMoi(), anh = /^image\//.test(file.type||'');
  var buoc = anh ? nkAnhRa(file, NK_CANH, 0.72).then(function(b){
      return (b.size >= file.size && /jpe?g/i.test(file.type)) ? file : b;   /* ảnh vốn đã nhẹ thì giữ bản gốc */
    }).catch(function(){ return file; }) : Promise.resolve(file);
  return buoc.then(function(b){
    var viec = [luuFile(id, b)];
    if(anh) viec.push(nkAnhRa(b, NK_NHO, 0.6).then(function(n){ return luuFile(id+'_nho', n); }).catch(function(){}));
    return Promise.all(viec).then(function(){
      var ten = chup ? tenAnhNK() : (file.name || tenAnhNK());
      if(anh && b!==file) ten = /\.[a-z0-9]{2,5}$/i.test(ten) ? ten.replace(/\.[a-z0-9]{2,5}$/i, '.jpg') : ten+'.jpg';
      m.dinh = m.dinh || [];
      m.dinh.push({k:'rieng', id:id, ten:ten, co:b.size, loai:b.type||file.type||'', anh:anh, may:maMayCua(), themLuc:new Date().toISOString()});
      return b.size;
    });
  });
}
/* mở camera (chup) hoặc hộp chọn file — phải gọi ngay trong lần bấm */
function nkChonFile(chup, cb){
  var i = document.createElement('input'); i.type = 'file';
  if(chup){ i.accept = 'image/*'; i.capture = 'environment'; } else i.multiple = true;
  i.onchange = function(){ var ds = Array.prototype.slice.call(i.files||[]); if(ds.length) cb(ds); };
  i.click();
}
function nkThemVao(id, ds, chup){
  var m = ntTim(id); if(!m) return Promise.resolve();
  var nang = ds.filter(function(f){ return f.size > NK_TRAN && !/^image\//.test(f.type||''); });
  var lam = function(){
    bao(chup ? 'Đang lưu ảnh…' : 'Đang lưu '+ds.length+' file…', 2);
    return ds.reduce(function(p, f){ return p.then(function(){ return nkLuuFile(m, f, chup); }); }, Promise.resolve()).then(function(){
      m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); veLich();
      var co = (m.dinh||[]).slice(-ds.length).reduce(function(a, f){ return a+(+f.co||0); }, 0);
      bao((chup ? 'Đã lưu ảnh' : 'Đã gắn '+ds.length+' file')+' ('+kichCo(co)+')'+(coTheNoiDrive() ? ' · đang đưa lên Drive…' : '')+'.', 3);
      dayFileNKCho();
    }).catch(function(e){ baoLoi('Không lưu được: '+(e && e.message || e)); });
  };
  if(nang.length){
    hoi('File nặng', nang.map(function(f){ return f.name+' ('+kichCo(f.size)+')'; }).join(', ')+
      ' — trên 15 MB, lưu vào máy và đưa lên Drive sẽ lâu. Vẫn gắn?', 'Vẫn gắn', lam);
    return Promise.resolve();
  }
  return lam();
}
/* 📷 một chạm: chụp xong tự tạo dòng "📷 Ảnh 14:32" (chế độ Note màu: một mẩu) của ngày đang chọn */
function nkChupNhanh(){
  nkChonFile(true, function(ds){ nkTaoDongAnh(ds, true); });
}
function nkTaoDongAnh(ds, chup){
  lcDau();
  var iso = LICH.chon || lcISO(nay()), nd = (chup ? '📷 Ảnh ' : '📎 File ')+nkGioChu(new Date()), m;
  if(ntCheDo()==='note'){
    var t = new Date().toISOString();
    m = {id:idMoi(), ngay:iso, nd:nd, mau:'vang', ghim:false, taoLuc:t, suaLuc:t};
    ntData().note.push(m);
  } else m = dongThem(iso, nd);
  return nkThemVao(m.id, ds, chup);
}
/* 📎 trên một dòng / mẩu: chụp thêm · chọn file trong máy · file có sẵn trong tủ */
function nkMenuDinh(id){
  var m = ntTim(id); if(!m) return;
  moHop('<div class="hop-tit">📎 Gắn vào dòng này</div>'+
    '<div class="hop-phu">'+coChuHTML((m.nd||'(dòng trống)').slice(0,90))+'</div>'+
    '<div class="nk-chon3">'+
      '<button class="nho chinh" onclick="dongHop();nkChonFile(true,function(d){nkThemVao(\''+id+'\',d,true)})">📷 Chụp ảnh</button>'+
      '<button class="nho" onclick="dongHop();nkChonFile(false,function(d){nkThemVao(\''+id+'\',d,false)})">📁 Chọn file trong máy</button>'+
      '<button class="nho" onclick="moGanFileNK(\''+id+'\')">🔗 File có sẵn trong tủ</button></div>'+
    '<div class="hop-phu">Ảnh tự thu nhỏ (cạnh dài 1600 px, khoảng 200–400 KB) — vẫn đọc rõ giấy tờ. PDF, Word giữ nguyên. '+
      'Có nối Drive thì file lên <i>'+coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ')+' / Nhật ký / tháng</i>.</div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button></div>');
}
function moGanFileNK(id){
  GAN = {bo:'', nk:id, tim:''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào dòng</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó. Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
  veGanDS();
  setTimeout(function(){ var o = document.getElementById('gan-tim'); if(o) o.focus(); }, 30);
}
function tenFileNK(f){
  if(f.k==='rieng') return f.ten||'';
  var m = fileBoMuc(f);
  return m ? (m.tenMoi||m.ten||m.tenCu||f.ten||'') : (f.ten||'(file)')+' — không còn';
}
function nkDinhHTML(m){
  var ds = m.dinh||[]; if(!ds.length) return '';
  return '<div class="nk-dinh">'+ds.map(function(f, i){
    var go = '<button class="nk-go" title="'+(f.k==='rieng'?'Bỏ file này (vào thùng rác)':'Gỡ liên kết — file gốc giữ nguyên')+'" '+
      'onclick="event.stopPropagation();nkGo(\''+m.id+'\','+i+')">✕</button>';
    if(f.k==='rieng' && f.anh) return '<span class="nk-anh" onclick="nkXem(\''+m.id+'\','+i+')" title="'+coChuHTML(f.ten+(f.co?' · '+kichCo(f.co):''))+'">'+
      '<img data-nk="'+f.id+'" alt="">'+go+'</span>';
    var ic = f.k==='scan' ? '🪪' : f.k==='ka' ? '✍' : f.k==='rieng' ? '📎' : '📄';
    return '<span class="nk-tep" onclick="nkXem(\''+m.id+'\','+i+')" title="Bấm để xem">'+ic+' <span>'+coChuHTML(tenFileNK(f))+'</span>'+
      (f.co ? '<small>'+kichCo(f.co)+'</small>' : '')+go+'</span>';
  }).join('')+'</div>';
}
function nkTimFile(fid){
  var ra = null;
  ntData().note.some(function(m){ return (m.dinh||[]).some(function(f){ if(f.id===fid){ ra = f; return true; } }); });
  return ra;
}
/* ảnh nhỏ: có sẵn trong máy thì dùng; máy kia chưa có thì tải bản lớn từ Drive một lần rồi làm ảnh nhỏ */
function nkLayAnhNho(fid){
  if(NK_DANG[fid]) return NK_DANG[fid];
  NK_DANG[fid] = docFile(fid+'_nho').then(function(b){
    if(b) return b;
    var f = nkTimFile(fid); if(!f) return null;
    return layNoiDung({id:f.id, driveId:f.driveId, co:f.co}).then(function(to){
      if(!to) return null;
      return nkAnhRa(to, NK_NHO, 0.6).then(function(n){ luuFile(fid+'_nho', n); return n; }).catch(function(){ return to; });
    });
  }).then(function(b){
    delete NK_DANG[fid];
    if(b && !NK_URL[fid]) NK_URL[fid] = URL.createObjectURL(b);
    return NK_URL[fid] || null;
  }, function(){ delete NK_DANG[fid]; return null; });
  return NK_DANG[fid];
}
function nkNapAnhNho(){
  Array.prototype.forEach.call(document.querySelectorAll('img[data-nk]'), function(im){
    var fid = im.getAttribute('data-nk');
    if(NK_URL[fid]){ im.src = NK_URL[fid]; return; }
    nkLayAnhNho(fid).then(function(u){
      Array.prototype.forEach.call(document.querySelectorAll('img[data-nk="'+fid+'"]'), function(e){
        if(u) e.src = u; else if(e.parentNode) e.parentNode.classList.add('mat');
      });
    });
  });
}
/* xem: ảnh → khung xem lớn, vuốt / ‹ › qua lại; file khác → khung xem như các tab */
var NK_XEM = {nid:'', ds:[], i:0, x0:null};
function nkXem(nid, i){
  var m = ntTim(nid), f = m && (m.dinh||[])[i]; if(!f) return;
  if(f.k!=='rieng') return xemThu(f.k==='scan' ? 'scan' : f.k==='ka' ? 'ka' : 'muc', f.id);
  if(!f.anh){
    var t = {id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), driveId:f.driveId, co:f.co, khoCu:'homNay'};
    moXem(null, t);
    document.getElementById('x-phu').innerHTML = coChuHTML(nkDuong(m, f)+(f.co?' · '+kichCo(f.co):''));
    return;
  }
  var ds = []; (m.dinh||[]).forEach(function(x){ if(x.k==='rieng' && x.anh) ds.push(x); });
  NK_XEM = {nid:nid, ds:ds, i:Math.max(0, ds.indexOf(f)), x0:null};
  moHop('<div class="nk-lb" ontouchstart="NK_XEM.x0=event.touches[0].clientX" ontouchend="nkVuot(event)">'+
      '<button class="nk-lb-nut trai" onclick="nkLat(-1)">‹</button><img id="nk-lb-anh" alt="">'+
      '<button class="nk-lb-nut phai" onclick="nkLat(1)">›</button></div>'+
    '<div class="hop-phu" id="nk-lb-ten"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="nkTaiVe()">⬇ Tải về</button><button class="nho chinh" data-lenh="hop.dong">Đóng (Esc)</button></div>', true);
  nkVeLB();
}
function nkDuong(m, f){
  return f.driveId ? '☁ '+(D.cauHinh.thumuc||'Tủ hồ sơ')+' / Nhật ký / '+(m.ngay||'').slice(0,7) : '💻 Chỉ trong máy này (chưa lên Drive)';
}
function nkVeLB(){
  var f = NK_XEM.ds[NK_XEM.i], im = document.getElementById('nk-lb-anh'); if(!f || !im) return;
  var m = ntTim(NK_XEM.nid) || {};
  document.getElementById('nk-lb-ten').innerHTML = (NK_XEM.ds.length>1 ? '<b>'+(NK_XEM.i+1)+'/'+NK_XEM.ds.length+'</b> · ' : '')+
    coChuHTML(f.ten+(f.co?' · '+kichCo(f.co):'')+' · '+nkDuong(m, f));
  im.removeAttribute('src'); if(NK_URL[f.id]) im.src = NK_URL[f.id];   /* hiện ảnh nhỏ trước, bản lớn thay vào sau */
  layNoiDung({id:f.id, driveId:f.driveId, co:f.co}).then(function(b){
    if(!b || NK_XEM.ds[NK_XEM.i]!==f) return;
    var u = URL.createObjectURL(b), e = document.getElementById('nk-lb-anh');
    if(e){ e.onload = function(){ setTimeout(function(){ URL.revokeObjectURL(u); }, 1000); }; e.src = u; }
  });
  Array.prototype.forEach.call(document.querySelectorAll('.nk-lb-nut'), function(b){ b.style.visibility = NK_XEM.ds.length>1 ? '' : 'hidden'; });
}
function nkLat(n){
  if(NK_XEM.ds.length<2) return;
  NK_XEM.i = (NK_XEM.i + n + NK_XEM.ds.length) % NK_XEM.ds.length; nkVeLB();
}
function nkVuot(ev){
  if(NK_XEM.x0===null) return;
  var dx = ev.changedTouches[0].clientX - NK_XEM.x0; NK_XEM.x0 = null;
  if(Math.abs(dx) > 40) nkLat(dx < 0 ? 1 : -1);
}
function nkTaiVe(){
  var f = NK_XEM.ds[NK_XEM.i]; if(!f) return;
  layNoiDung({id:f.id, driveId:f.driveId, co:f.co}).then(function(b){
    if(!b) return baoLoi('Chưa lấy được ảnh.');
    var a = document.createElement('a'), u = URL.createObjectURL(b);
    a.href = u; a.download = f.ten; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(u); }, 3000);
  });
}
/* ✕ trên một file: liên kết → chỉ gỡ (Hoàn tác); file riêng → thùng rác ngăn 📅 Hôm nay */
function nkGo(nid, i){
  var m = ntTim(nid), f = m && (m.dinh||[])[i]; if(!f) return;
  var now = new Date().toISOString();
  m.dinh.splice(i, 1); m.suaLuc = now;
  var tra = function(){ var x = ntTim(nid); if(x){ x.dinh = x.dinh||[]; x.dinh.splice(Math.min(i, x.dinh.length), 0, f); x.suaLuc = new Date().toISOString(); } };
  if(f.k!=='rieng'){
    luu(); henDongBoLich(); veLich();
    return baoHoanTac('Đã gỡ liên kết — file gốc vẫn ở chỗ cũ.', function(){ tra(); luu(); henDongBoLich(); veLich(); });
  }
  D.rac = D.rac||[];
  D.rac.push(nkBanRac({id:f.id, ngay:m.ngay, nd:m.nd, nkNote:nid, nkFile:f, tenMoi:f.ten, co:f.co}, now));
  luu(); henDongBoLich(); veLich(); capNhatDemRac();
  baoHoanTac('Đã chuyển file vào thùng rác.', function(){
    D.rac = D.rac.filter(function(x){ return x.id!==f.id; }); tra(); luu(); henDongBoLich(); veLich(); capNhatDemRac();
  });
}
function nkBanRac(r, now){
  r.khoCu = 'homNay'; r.nhom = 'homNay'; r.tenCu = r.tenCu || r.tenMoi; r.duoi = duoiFile(r.tenMoi||'');
  r.xoaLuc = now; r.suaLuc = now; r.lyDoXoa = 'Xóa ở tab Hôm nay';
  return r;
}
/* dòng / mẩu có file riêng bị xóa → một mục trong thùng rác giữ nguyên dòng + file để khôi phục */
function nkVaoRac(ds){
  var now = new Date().toISOString(), ids = [];
  ds.forEach(function(m){
    var co = (m.dinh||[]).filter(function(f){ return f.k==='rieng'; });
    if(!co.length) return;
    D.rac = D.rac||[];
    D.rac.push(nkBanRac({id:m.id, ngay:m.ngay, nd:m.nd, note:JSON.parse(JSON.stringify(m)),
      tenMoi:(m.nd||'Dòng ghi chép').slice(0,60)+' ('+co.length+' file)', co:co.reduce(function(a, f){ return a+(+f.co||0); }, 0)}, now));
    ids.push(m.id);
  });
  if(ids.length) capNhatDemRac();
  return ids;
}
function nkKhoiPhuc(r){
  var L = ntData(), now = new Date().toISOString();
  if(r.note){
    var m = r.note; m.suaLuc = now;
    if(!L.note.some(function(x){ return x.id===m.id; })) L.note.push(m);
    L.noteXoa = L.noteXoa.filter(function(x){ return x.id!==m.id; });
  } else if(r.nkFile){
    var dich = ntTim(r.nkNote);
    if(!dich){ dich = {id:idMoi(), ngay:r.ngay||lcISO(nay()), nd:'📎 '+(r.nkFile.ten||'File'), mau:'trang', kieu:'dong', xong:'', taoLuc:now}; L.note.push(dich); }
    dich.dinh = dich.dinh||[]; dich.dinh.push(r.nkFile); dich.suaLuc = now;
  }
  henDongBoLich();
}
function nkFileCuaRac(r){ return r.note ? (r.note.dinh||[]) : (r.nkFile ? [r.nkFile] : []); }
/* driveId các file riêng ở Hôm nay (kể cả đang ở thùng rác) — Lập chỉ mục / Quét rác coi là file của app */
function nkDriveIds(){
  var ra = [];
  ntData().note.forEach(function(m){ (m.dinh||[]).forEach(function(f){ if(f.driveId) ra.push(f.driveId); }); });
  (D.rac||[]).forEach(function(r){ if(r.khoCu==='homNay') nkFileCuaRac(r).forEach(function(f){ if(f.driveId) ra.push(f.driveId); }); });
  return ra;
}
/* đưa file riêng lên Drive: Tủ hồ sơ / Nhật ký / YYYY-MM (chỉ máy đã tạo file mới đẩy) */
function dayFileNKCho(){
  if(!coTheNoiDrive() || !(DR.sanSang && DR.online) || dayFileNKCho.dang) return Promise.resolve();
  var viec = [];
  ntData().note.forEach(function(m){ (m.dinh||[]).forEach(function(f){
    if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) viec.push([m, f]); }); });
  if(!viec.length) return Promise.resolve();
  dayFileNKCho.dang = true;
  return viec.reduce(function(p, x){
    return p.then(function(){
      var m = x[0], f = x[1], duong = D.cauHinh.thumuc+' / Nhật ký / '+(m.ngay||lcISO(nay())).slice(0,7);
      return Promise.all([docFile(f.id), baoDamDuong(duong)]).then(function(r){
        if(!r[0]) return;
        return dayBlobLenDrive(f.ten, f.loai, r[0], r[1]).then(function(r2){
          if(!r2 || !r2.id) return;
          f.driveId = r2.id; f.driveCha = r[1]; m.suaLuc = new Date().toISOString();
        });
      }).catch(function(e){ console.warn('Chưa đưa file Hôm nay lên Drive', f.ten, e); });
    });
  }, Promise.resolve()).then(function(){ dayFileNKCho.dang = false; luu(); henDongBoLich(); if(nganHienTai===0) veLich(); });
}
/* tải một blob lên thư mục Drive (multipart) — dùng chung cho file riêng của Bộ hồ sơ và Hôm nay */
function dayBlobLenDrive(ten, loai, bl, idTM){
  var bien = '----tuhoso'+Date.now();
  var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify({name:ten, parents:[idTM]})+
    '\r\n--'+bien+'\r\nContent-Type: '+(loai||bl.type||'application/octet-stream')+'\r\n\r\n';
  return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,parents',
    {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:new Blob([dau, bl, '\r\n--'+bien+'--'])});
}
/* ✎ Sửa việc SCHEDULE: tên, ngày, lặp lại, lưu ý */
function lcSua(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  if(nhapMo('lc:'+v.id)) return;
  moHop('<div class="hop-tit">✎ Sửa việc</div>'+
    '<div class="o"><label>Việc</label><textarea id="lc-s-ten" rows="2">'+coChuHTML(v.ten||'')+'</textarea></div>'+
    '<div class="o"><label>Ngày'+(v.lap && v.lap!=='mot' ? ' bắt đầu' : '')+'</label><input id="lc-s-ngay" inputmode="numeric" placeholder="dd/mm/yyyy" value="'+lcDMY(v.ngay)+'" oninput="gonNgay(this)"></div>'+
    '<div class="o"><label>Lặp lại</label><select id="lc-s-lap">'+Object.keys(LC_LAP).map(function(k){
      return '<option value="'+k+'"'+((v.lap||'mot')===k ? ' selected' : '')+'>'+LC_LAP[k]+'</option>'; }).join('')+'</select></div>'+
    '<label class="nk-tich"><input type="checkbox" id="lc-s-luuy"'+(v.luuY ? ' checked' : '')+'> ⚑ Lưu ý (đưa lên đầu, tô đậm)</label>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="lcSuaXong()">Lưu</button></div>');
  nhapDat('lc:'+v.id);  document.getElementById('hop-in').classList.add('phim-chung');   /* 3.84: phím chung Enter / Tab / Shift / ↑ ↓ */
  setTimeout(function(){ var o = document.getElementById('lc-s-ten'); if(o){ o.focus(); o.selectionStart = o.value.length; } }, 30);
}
function lcSuaXong(){
  var v = lcTim(LICH.viecChon); if(!v) return;
  var ten = gt('lc-s-ten'), iso = ngayISOo(gt('lc-s-ngay'));
  if(!ten) return baoLoi('Tên việc đang trống.');
  if(!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return baoLoi('Ngày chưa đúng, gõ dạng dd/mm/yyyy.');
  var cu = JSON.parse(JSON.stringify(v));
  v.ten = ten; v.ngay = iso; v.lap = gt('lc-s-lap') || 'mot';
  v.luuY = !!(document.getElementById('lc-s-luuy')||{}).checked; v.suaLuc = new Date().toISOString();
  ghiHoanTac('sửa việc', function(){ var x = lcTim(cu.id); if(x) Object.keys(cu).forEach(function(k){ x[k] = cu[k]; }); });
  nhapXong(); dongHop();
  if(!lcCo(v, LICH.chon)){ var d = lcNgay(iso); LICH.chon = iso; LICH.nam = d.getFullYear(); LICH.thang = d.getMonth(); }
  lcDoiLich(); bao('Đã sửa việc.', 3);
}
/* ==========================================================
   💾 BỘ NHỚ MÁY (3.53) — chip luôn hiện ở thanh đáy: app đang chiếm bao nhiêu trong phần trình duyệt cấp.
   Bấm → chi tiết theo loại, số file chưa lên Drive (sẽ mất thật nếu máy tự dọn), Dọn kho, xin giữ dữ liệu lâu dài.
   ========================================================== */
var BN = {luc:0, dung:0, toi:0, giu:null};
function nkChuaLen(){
  var n = 0;
  ntData().note.forEach(function(m){ (m.dinh||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) n++; }); });
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) n++; }); });
  return n;
}
function kichCoNgan(b){
  if(b >= 1073741824) return (b/1073741824).toFixed(b>=10737418240?0:1).replace('.', ',')+' GB';
  if(b >= 1048576) return Math.round(b/1048576)+' MB';
  return Math.max(1, Math.round(b/1024))+' KB';
}
function capNhatBoNho(ep){
  var e = document.getElementById('chip-bn'); if(!e) return;
  var ve = function(){
    if(!BN.toi){ e.textContent = '💾 '+(BN.dung ? kichCoNgan(BN.dung) : '—'); e.className = 'chip'; return; }
    var pt = Math.round(BN.dung/BN.toi*100);
    e.textContent = '💾 '+kichCoNgan(BN.dung)+' / '+kichCoNgan(BN.toi);
    e.className = 'chip '+(pt>80 ? 'do' : pt>=60 ? 'vang' : 'luc');
    e.title = 'Bộ nhớ trình duyệt app đang dùng: '+pt+'%'+(BN.giu===true ? ' · đã được giữ lâu dài' : '');
  };
  ve();
  if(!ep && Date.now()-BN.luc < 15000) return;   /* hỏi trình duyệt tối đa 15 giây một lần */
  BN.luc = Date.now();
  if(!(navigator.storage && navigator.storage.estimate)) return;
  navigator.storage.estimate().then(function(u){ BN.dung = u.usage||0; BN.toi = u.quota||0; ve(); }).catch(function(){});
  if(navigator.storage.persisted) navigator.storage.persisted().then(function(g){ BN.giu = g; }).catch(function(){});
}
/* dung lượng file trong máy chia theo loại — đọc kích thước từng file trong IndexedDB (không đọc nội dung) */
function demKhoTheoLoai(){
  var rac = {}; (D.rac||[]).forEach(function(m){ rac[m.id] = 1; nkFileCuaRac(m).forEach(function(f){ rac[f.id] = 1; }); });
  var nhom = {tu:0, scan:0, ka:0, homNay:0, bo:0, rac:0, khac:0};
  return moKho().then(function(db){
    return new Promise(function(ok){
      try{
        var r = db.transaction('f','readonly').objectStore('f').openCursor();
        r.onsuccess = function(ev){
          var c = ev.target.result; if(!c){ ok(nhom); return; }
          var k = String(c.key), v = c.value, co = (v && (v.size || v.byteLength || (v.length||0))) || 0;
          var goc = k.replace(/^hs_/, '').replace(/[_](nho|matTruoc|matSau|t\d+.*)$/, '');
          if(rac[goc] || rac[k]) nhom.rac += co;
          else if(/^nf/.test(k)) nhom.homNay += co;
          else if(/^bf/.test(k)) nhom.bo += co;
          else if(/^hs_ka/.test(k)) nhom.ka += co;
          else if(/^hs_/.test(k)) nhom.scan += co;
          else if(timMuc(k)) nhom.tu += co;
          else nhom.khac += co;
          c.continue();
        };
        r.onerror = function(){ ok(nhom); };
      }catch(e){ ok(nhom); }
    });
  }).catch(function(){ return nhom; });
}
function moBoNho(){
  capNhatBoNho(true);
  var chuaLen = ((typeof demChoDB==='function') ? demChoDB().length : 0) + scanCanDay().length + kaCanDay().length + nkChuaLen();
  moHop('<div class="hop-tit">💾 Bộ nhớ máy</div><div id="bn-than"><div class="rong">Đang tính…</div></div>', true);
  Promise.all([demKhoTheoLoai(), navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().catch(function(){ return {}; }) : Promise.resolve({})])
  .then(function(r){
    var nhom = r[0], u = r[1] || {}; BN.dung = u.usage||BN.dung; BN.toi = u.quota||BN.toi;
    var pt = BN.toi ? Math.round(BN.dung/BN.toi*100) : 0;
    var hang = [['📄 Văn bản · Tháng · Biểu mẫu · Thư viện', nhom.tu], ['🪪 Bản scan', nhom.scan], ['✍ Chữ ký · CCCD', nhom.ka],
      ['📅 Ảnh, file ở Hôm nay', nhom.homNay], ['📁 File riêng Bộ hồ sơ', nhom.bo], ['🗑 Thùng rác', nhom.rac], ['Khác (bộ nhớ tạm)', nhom.khac]];
    var iOS = /iPhone|iPad|iPod/.test(navigator.userAgent), cai = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    var e = document.getElementById('bn-than'); if(!e) return;
    e.innerHTML =
      '<div class="bn-thanh"><i style="width:'+Math.min(100, pt)+'%" class="'+(pt>80?'do':pt>=60?'vang':'luc')+'"></i></div>'+
      '<div class="hop-phu">App đang dùng <b>'+kichCoNgan(BN.dung)+'</b>'+(BN.toi ? ' trong khoảng <b>'+kichCoNgan(BN.toi)+'</b> trình duyệt cho phép ('+pt+'%)' : '')+'.'+
        (iOS ? ' Trên iPhone con số tối đa chỉ gần đúng.' : '')+'</div>'+
      '<table class="bn-bang">'+hang.filter(function(x){ return x[1]>0; }).map(function(x){
        return '<tr><td>'+x[0]+'</td><td>'+kichCoNgan(x[1])+'</td></tr>'; }).join('')+'</table>'+
      (chuaLen ? '<div class="bn-canh">⚠ <b>'+chuaLen+' file chưa lên Drive</b> — nếu máy tự dọn bộ nhớ thì các file này mất thật. '+
          '<button class="nho chinh" onclick="dongHop();dongBoNgay()">☁ Đồng bộ ngay</button></div>'
        : '<div class="hop-phu">✓ Mọi file đã có trên Drive — máy có tự dọn thì app tải lại được.</div>')+
      '<div class="hop-phu">'+(BN.giu===true ? '🔒 Máy này <b>đã được giữ dữ liệu lâu dài</b> — trình duyệt không tự xóa khi thiếu chỗ.'
        : '🔓 Chưa được giữ lâu dài — khi máy thiếu chỗ hoặc lâu không mở app, trình duyệt có thể tự xóa bản trong máy.'+
          (iOS && !cai ? ' iPhone: bấm Chia sẻ › <b>Thêm vào MH chính</b>, mở app từ biểu tượng đó rồi bấm nút dưới.' : ''))+'</div>'+
      '<div class="hang-nut">'+(BN.giu===true ? '' : '<button class="nho" onclick="xinGiuDuLieu()">🔒 Xin giữ dữ liệu lâu dài</button>')+
        (nhom.rac ? '<button class="nho" onclick="dongHop();moDonKho(\'rac\')">🗑 Thùng rác ('+kichCoNgan(nhom.rac)+')</button>' : '')+
        '<button class="nho" onclick="dongHop();moDonKho()">🧰 Dọn kho</button>'+
        '<button class="nho chinh" data-lenh="hop.dong">Đóng</button></div>';
  });
}
function xinGiuDuLieu(){
  if(!(navigator.storage && navigator.storage.persist)) return baoLoi('Trình duyệt này không hỗ trợ giữ dữ liệu lâu dài.');
  navigator.storage.persist().then(function(ok){
    BN.giu = ok;
    if(ok) bao('🔒 Đã được giữ dữ liệu lâu dài trên máy này.', 5);
    else bao('Trình duyệt chưa đồng ý. iPhone: thêm app vào Màn hình chính rồi mở từ biểu tượng; Chrome: dùng app thường xuyên sẽ được cho phép.', 9);
    moBoNho();
  });
}
function ntOHTML(m, ghimRieng){
  var mau = Object.keys(NT_MAU).map(function(k){
    return '<span class="nt-cham nt-'+k+(m.mau===k?' chon':'')+'" title="'+NT_MAU[k]+'" onclick="ntDoiMau(\''+m.id+'\',\''+k+'\')"></span>';
  }).join('');
  return '<div class="nt-o nt-'+(m.mau||'vang')+(m.ghim?' ghim':'')+'" draggable="true" '+
    'ondragstart="ntKeoBatDau(\''+m.id+'\')" ondragover="event.preventDefault()" ondrop="ntKeoTha(\''+m.id+'\')">'+
    '<div class="nt-dau">'+
      (ghimRieng?'<span class="nt-ngay">'+lcDM(m.ngay)+'</span>':'')+
      '<span class="nt-mau">'+mau+'</span>'+
      '<span class="nt-luu" id="nt-luu-'+m.id+'"></span>'+
      '<button class="nt-nut'+(m.ghim?' bat':'')+'" onclick="ntDoiGhim(\''+m.id+'\')" title="Ghim — luôn hiện dù đổi ngày">📌</button>'+
      (ghimRieng?'':'<button class="nt-nut chi-may" onclick="ntChuyen(\''+m.id+'\',-1)" title="Lên trước">↑</button>'+
      '<button class="nt-nut chi-may" onclick="ntChuyen(\''+m.id+'\',1)" title="Xuống sau">↓</button>')+
      '<button class="nt-nut" onclick="nkMenuDinh(\''+m.id+'\')" title="Gắn ảnh / file">📎</button>'+
      '<button class="nt-nut xau" onclick="ntXoa(\''+m.id+'\')" title="Xóa mẩu">✕</button>'+
    '</div>'+
    '<textarea placeholder="Ghi ở đây…" oninput="ntGo(\''+m.id+'\',this)" onblur="ntRoiO(\''+m.id+'\')">'+coChuHTML(m.nd||'')+'</textarea>'+nkDinhHTML(m)+'</div>';
}
