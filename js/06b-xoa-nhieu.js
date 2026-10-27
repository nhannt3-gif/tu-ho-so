/* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/06-hop-thoai.js (dòng 2218–2421 của bản 3.338), không đổi logic — 🗑 Xóa nhiều file (3.49) */
/* ==========================================================
   3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc chọn tất cả đang lọc,
   chọn theo ngày thêm vào tủ) → Xóa N file. 3.50 (anh chốt): cứ xóa là VÀO THÙNG RÁC (cả scan, Chữ ký·CCCD), có ↩ Hoàn tác;
   xóa hẳn chỉ làm trong Thùng rác (ngăn / cả thùng) hoặc Reset ở Cài đặt. Xóa hẳn ghi dấu daXoaHan → máy kia bỏ theo.
   ========================================================== */
var BOT = {tab:'', chon:{}}, BOT_DS = {};
function botAt(id){ return BOT.tab ? ' data-bot="'+id+'"'+(BOT.chon[id]?' data-botc="1"':'') : ''; }
function nutBot(tab){
  var bat = BOT.tab===tab && BOT.muc!=='chep';
  return '<button class="nut-bot'+(bat?' bat':'')+'" onclick="'+(bat?'thoiBot()':'batBot(\''+tab+'\')')+'" '+
    'title="Chọn nhiều file để xóa một lần (vào thùng rác)">🗑 Xóa</button>'+(laDT() || tab==='kyAnh' ? '' : nutChep(tab));
}
/* 3.389 (anh 27/10 "để sẵn 1 nút copy trên mỗi khung, khi cần sẽ chọn như chức năng xóa"): 📋 Chép cạnh 🗑 Xóa — bấm → tick file → 📋 Chép n file → Ctrl+V vào thư mục / Zalo (qua cầu nối máy tính) */
function nutChep(tab){
  var bat = BOT.tab===tab && BOT.muc==='chep';
  return '<button class="phu nut-chep'+(bat?' bat':'')+'" onclick="'+(bat?'thoiBot()':'chepBat(\''+tab+'\')')+'" title="Chọn nhiều file để chép, rồi Ctrl+V vào thư mục trên máy hoặc Zalo (cần cầu nối máy tính)">📋 Chép</button>';
}
function chepBat(tab){ if(!coCauNoi()){ window.__cnDuPhong = null; return hoiCaiCauNoi(function(){ if(coCauNoi()) batBot(tab, 'chep'); else bao('Cần cài cầu nối máy tính để chép file thật: ⚙ Cài đặt › Cầu nối máy tính (Windows).', 8); }); } batBot(tab, 'chep'); }
function batBot(tab, muc){
  BOT = {tab:tab, chon:{}, muc:muc==='chep' ? 'chep' : 'xoa'}; CN_CHEP_CON = []; document.body.classList.add('dang-bot');
  if(tab==='kyAnh') moKyAnh(); else ve();
}
function thoiBot(){
  var t = BOT.tab; BOT = {tab:'', chon:{}}; CN_CHEP_CON = []; document.body.classList.remove('dang-bot');
  if(t==='kyAnh'){ if(document.querySelector('.ka-nut')) moKyAnh(); } else ve();
}
/* bấm vào dòng khi đang chọn: chỉ tích/bỏ tích, không mở file (chặn ở pha capture — mọi onclick bên trong đều bỏ qua) */
document.addEventListener('click', function(e){
  if(!BOT.tab || !e.target || !e.target.closest) return;
  if(e.target.closest('.thanh-bot')) return;
  var el = e.target.closest('[data-bot]'); if(!el) return;
  e.preventDefault(); e.stopPropagation();
  var id = el.getAttribute('data-bot');
  if(BOT.chon[id]){ delete BOT.chon[id]; el.removeAttribute('data-botc'); }
  else { BOT.chon[id] = 1; el.setAttribute('data-botc','1'); }
  capNhatBot();
}, true);
function dsBotTab(tab){
  if(tab==='kyAnh') return (D.kyAnh||[]).slice();
  return (BOT_DS[tab] || []).slice();
}
function lucThemBot(m){ return String(m.themLuc || m.taoLuc || m.luc || m.ngay || '').slice(0,10); }
function thanhBot(tab){
  if(BOT.tab!==tab) return '';
  setTimeout(capNhatBot, 0);   /* danh sách đang lọc tính xong sau khi vẽ đầu tab */
  if(BOT.muc==='chep') return '<div class="thanh-bot" id="thanh-bot">'+   /* 3.106: thanh chọn để chép */
    '<b class="bot-dem">Chưa chọn file nào — bấm vào file để chọn</b>'+
    '<button onclick="botTatCa()" class="bot-tat">Chọn tất cả đang lọc</button>'+
    '<button onclick="botBoChon()">Bỏ chọn</button>'+
    '<button class="chinh bot-nut" onclick="botXacNhan()" disabled>📋 Chép 0 file</button>'+
    '<button class="bot-tiep" onclick="chepTiep()" style="display:none">📋 Chép tiếp</button>'+
    '<button onclick="thoiBot()">Thôi</button></div>';
  return '<div class="thanh-bot" id="thanh-bot">'+
    '<b class="bot-dem">Chưa chọn file nào — bấm vào file để chọn</b>'+
    '<button onclick="botTatCa()" class="bot-tat">Chọn tất cả đang lọc</button>'+
    '<span class="tb-nhom">Thêm vào tủ trước ngày <input class="bot-ngay" inputmode="numeric" placeholder="dd/mm/yyyy" oninput="gonNgay(this)">'+
      '<button onclick="botTruocNgay(this)">Chọn</button></span>'+
    '<button onclick="botBoChon()">Bỏ chọn</button>'+
    '<button class="chinh bot-chep" onclick="botChep()" disabled title="'+(laDT() ? 'Gửi các file đã chọn (Zalo…)' : 'Chép các file đã chọn — Ctrl+V vào Zalo / email / thư mục (cầu nối); chưa cài cầu nối: hộp chia sẻ Windows')+'">'+(laDT() ? '📤 Gửi 0 file' : '📋 Chép 0 file')+'</button>'+   /* 3.166 (anh chốt): chép + xóa chung 1 thanh chọn */
    '<button class="bot-tiep" onclick="chepTiep()" style="display:none">📋 Chép tiếp</button>'+
    '<button class="xau bot-nut" onclick="botXacNhan()" disabled>Xóa 0 file</button>'+
    '<button onclick="thoiBot()">Thôi</button></div>';
}
function capNhatBot(){
  var n = Object.keys(BOT.chon).length;
  /* 3.49b: cập nhật theo lớp, mọi thanh đang có — trước dùng id, thanh cũ còn ẩn ở tab trước "giành" mất nút → nút Xóa đứng ở 0 */
  var tat = BOT.tab ? dsBotTab(BOT.tab).length : 0;
  Array.prototype.forEach.call(document.querySelectorAll('.thanh-bot'), function(th){
    var d = th.querySelector('.bot-dem'), b = th.querySelector('.bot-nut'), t = th.querySelector('.bot-tat');
    if(d) d.textContent = n ? 'Đã chọn '+n+' file' : 'Chưa chọn file nào — bấm vào file để chọn';
    if(b){ b.textContent = BOT.muc==='chep' ? '📋 Chép '+Math.min(n, 20)+' file'+(n>20 ? ' đầu' : '') : 'Xóa '+n+' file'; b.disabled = !n; }
    var cp = th.querySelector('.bot-chep'); if(cp){ cp.textContent = (laDT() ? '📤 Gửi ' : '📋 Chép ')+(coCauNoi() && !laDT() ? Math.min(n, 20) : n)+' file'+(coCauNoi() && !laDT() && n>20 ? ' đầu' : ''); cp.disabled = !n; }
    var tp = th.querySelector('.bot-tiep'); if(tp){ tp.style.display = CN_CHEP_CON.length ? '' : 'none'; tp.textContent = '📋 Chép tiếp '+Math.min(CN_CHEP_CON.length, 20)+' file'; }
    if(t && BOT.tab) t.textContent = 'Chọn tất cả đang lọc ('+tat+')';
  });
}
function apChonBot(){
  Array.prototype.forEach.call(document.querySelectorAll('[data-bot]'), function(el){
    if(BOT.chon[el.getAttribute('data-bot')]) el.setAttribute('data-botc','1'); else el.removeAttribute('data-botc');
  });
  capNhatBot();
}
function botTatCa(){ dsBotTab(BOT.tab).forEach(function(m){ BOT.chon[m.id] = 1; }); apChonBot(); }
function botBoChon(){ BOT.chon = {}; apChonBot(); }
function botTruocNgay(nut){
  var o = nut && nut.parentNode ? nut.parentNode.querySelector('.bot-ngay') : document.querySelector('.thanh-bot .bot-ngay');
  var han = ngayISOo(o ? o.value.trim() : '');
  if(!han) return bao('Gõ ngày dạng dd/mm/yyyy.', 3);
  var n = 0;
  dsBotTab(BOT.tab).forEach(function(m){ var l = lucThemBot(m); if(l && l < han){ BOT.chon[m.id] = 1; n++; } });
  apChonBot();
  bao(n ? 'Đã chọn thêm '+n+' file thêm vào tủ trước '+ngayVN(han)+'.' : 'Không có file nào thêm vào tủ trước '+ngayVN(han)+'.', 4);
}
function mucBot(id){
  if(BOT.tab==='scan') return (D.scan||[]).find(function(x){ return x.id===id; });
  if(BOT.tab==='kyAnh') return (D.kyAnh||[]).find(function(x){ return x.id===id; });
  return timMuc(id) || (D.bieuMau||[]).find(function(x){ return x.id===id; });
}
/* 3.50 (anh chốt): Xóa N file → vào thùng rác ngay, không hỏi mức; có ↩ Hoàn tác. Xóa hẳn làm trong Thùng rác */
/* 3.166 (anh chốt): 📋 Chép n file — có cầu nối → chép (Ctrl+V dán hết); chưa có → hộp chia sẻ (Windows 11 Chrome / Edge có nút Sao chép); không có hộp chia sẻ → tải về. Điện thoại: 📤 Gửi */
function botChep(){
  var ds = Object.keys(BOT.chon).map(mucBot).filter(Boolean); if(!ds.length) return bao('Chưa chọn file nào.', 3);
  if(coCauNoi() && !laDT()) return chepNhieu(ds);
  Promise.all(ds.map(function(m){ return docFile(m.id).then(function(b){ return b ? new File([b], m.tenMoi||m.ten||m.tenCu||'file', {type:b.type||'application/octet-stream'}) : null; }).catch(function(){ return null; }); })).then(function(fs){
    fs = fs.filter(Boolean); var thieu = ds.length-fs.length, ghi = thieu ? ' · '+thieu+' file chưa có trên máy này (mở file một lần hoặc ☁ Đồng bộ) nên bỏ qua.' : '';
    if(!fs.length) return baoLoi('Các file đã chọn chưa có trên máy này — mở từng file một lần (tải từ Drive) hoặc ☁ Đồng bộ rồi thử lại.');
    if(navigator.canShare && navigator.canShare({files:fs})) return navigator.share({files:fs, title:fs.length+' file'}).then(function(){ bao((laDT() ? 'Đã gửi ' : 'Đã mở hộp chia sẻ — bấm Sao chép rồi Ctrl+V vào Zalo. ')+(laMayBan() ? 'Mẹo: cài cầu nối máy tính để chép thẳng.' : '')+ghi, 7); }).catch(function(){});
    fs.forEach(function(f, i){ setTimeout(function(){ taiXuongBlob(f, f.name); }, i*300); });
    bao('Máy này không có hộp chia sẻ — đã tải '+fs.length+' file về thư mục Tải xuống (kéo vào Zalo).'+ghi, 8);
  });
}
function botXacNhan(){ if(BOT.muc==='chep') return chepNhieu(Object.keys(BOT.chon).map(mucBot).filter(Boolean)); thucHienBot(); }
function thucHienBot(){
  var ids = Object.keys(BOT.chon), tab = BOT.tab;
  var ds = ids.map(mucBot).filter(Boolean);
  if(!ds.length) return bao('Chưa chọn file nào.', 3);
  BOT.chon = {};
  var kaMo = tab==='kyAnh', chay = function(){ thoiBot(); xoaNhieuVaoRac(ds.map(function(m){ return m.id; }), function(){ if(kaMo) moKyAnh(); }); };
  if(ds.length===1) return chay();   /* 3.153 (anh chốt): xóa 1 mục không hỏi; nhiều mục hỏi 1 lần, ghi rõ số mục */
  hoi('Xóa '+ds.length+' file?', ds.slice(0, 8).map(function(m){ return m.tenMoi||m.ten||m.tenCu||''; }).join(' · ')+(ds.length>8 ? ' … và '+(ds.length-8)+' file nữa' : '')+'. Vào 🗑 Thùng rác — khôi phục được trong 30 ngày.', 'Xóa '+ds.length+' file', chay);
}
/* 3.50: 🔄 RESET DỮ LIỆU THỬ (giữ cài đặt) — ở Cài đặt › Dữ liệu. Chọn nhóm + phạm vi; mức: vào thùng rác hoặc xóa hẳn luôn */
var NHOM_RESET = [['vanBan','Văn bản'],['duLieu','Dữ liệu tháng'],['bieuMau','Biểu mẫu'],['ghiChu','Ghi chú'],['scan','Scan'],['kyAnh','Chữ ký · CCCD'],['cho','Khay chờ']];
function moDonThu(){
  moHop('<div class="hop-tit">🔄 Reset dữ liệu thử</div>'+
    '<div class="hop-phu">Xóa hàng loạt dữ liệu nhập thử. <b>Cài đặt giữ nguyên</b> (địa bàn, danh mục, tag, mẫu báo cáo, Client ID…). Máy kia xóa theo khi đồng bộ.</div>'+
    '<div class="o"><label>Phạm vi</label>'+
      '<label class="dt-dong"><input type="radio" name="dt-pv" value="tat" checked onchange="demDonThu()"> Tất cả</label>'+
      '<label class="dt-dong"><input type="radio" name="dt-pv" value="ngay" onchange="demDonThu()"> Thêm vào tủ trước ngày '+
        '<input id="dt-ngay" inputmode="numeric" placeholder="dd/mm/yyyy" value="'+ngayVN(ngayISO(nay()))+'" oninput="gonNgay(this);demDonThu()" style="width:120px"></label></div>'+
    '<div class="o"><label>Nhóm cần xóa</label><div class="dt-2cot">'+
      NHOM_RESET.map(function(x){ return '<label class="dt-dong"><input type="checkbox" class="dt-tab" value="'+x[0]+'" checked onchange="demDonThu()"> '+x[1]+' ('+(D[x[0]]||[]).length+')</label>'; }).join('')+
      '<label class="dt-dong"><input type="checkbox" id="dt-lich" onchange="demDonThu()"> Lịch ('+lcData().viec.length+' việc + nhật ký)</label></div></div>'+
    '<div class="o"><label>Mức</label>'+
      '<label class="dt-dong"><input type="radio" name="dt-muc" value="rac" checked onchange="demDonThu()"> Vào thùng rác — còn khôi phục được</label>'+
      '<label class="dt-dong"><input type="radio" name="dt-muc" value="han" onchange="demDonThu()"> <b>Xóa hẳn luôn</b> — file Drive vào thùng rác Google Drive (30 ngày); cần nối Drive</label></div>'+
    '<div class="dt-kq" id="dt-kq"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
    '<button class="nho xau" onclick="thucHienDonThu()">🔄 Reset</button></div>');
  demDonThu();
}
function idDonThu(){
  var pv = (document.querySelector('input[name=dt-pv]:checked')||{}).value||'tat';
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.dt-tab:checked')).map(function(c){ return c.value; });
  var han = ngayISOo(gt('dt-ngay')), ra = [];
  tabs.forEach(function(k){
    (D[k]||[]).forEach(function(m){
      if(pv==='ngay' && !(han && lucThemBot(m) && lucThemBot(m) < han)) return;
      ra.push(m.id);
    });
  });
  return ra;
}
function demDonThu(){
  var e = document.getElementById('dt-kq'); if(!e) return;
  var ids = idDonThu(), han = (document.querySelector('input[name=dt-muc]:checked')||{}).value==='han';
  var lich = !!(document.getElementById('dt-lich')||{}).checked;
  var tat = [].concat(D.vanBan, D.duLieu, D.ghiChu, D.bieuMau||[], D.scan||[], D.kyAnh||[], D.cho||[]);
  var soDrive = tat.filter(function(m){ return ids.indexOf(m.id)>=0 && (m.driveId || m.tuKhay); }).length;
  e.innerHTML = (ids.length || lich)
    ? 'Sẽ '+(han?'<b>xóa hẳn</b>':'đưa vào thùng rác')+' <b>'+ids.length+'</b> mục'+(soDrive?' (trong đó <b>'+soDrive+'</b> file trên Drive)':'')+(lich?' · xóa việc + nhật ký trong Lịch':'')+'. <b>Cài đặt giữ nguyên.</b>'
    : 'Chưa chọn gì.';
}
function thucHienDonThu(){
  var ids = idDonThu(), han = (document.querySelector('input[name=dt-muc]:checked')||{}).value==='han';
  var lich = !!(document.getElementById('dt-lich')||{}).checked;
  if(!ids.length && !lich) return bao('Chưa chọn gì.', 3);
  var tat = [].concat(D.vanBan, D.duLieu, D.ghiChu, D.bieuMau||[], D.scan||[], D.kyAnh||[], D.cho||[]);
  var canDrive = han && tat.some(function(m){ return ids.indexOf(m.id)>=0 && m.driveId; });
  if(canDrive && !(DR.sanSang && DR.online))
    return baoLoi('“Xóa hẳn luôn” cần nối Drive để xóa file trên Drive. Nối Drive (chip ở dải dưới) rồi làm lại, hoặc chọn “Vào thùng rác”.');
  hoi('Reset dữ liệu thử?', (han ? 'XÓA HẲN '+ids.length+' mục — file trên Drive vào thùng rác Google Drive (30 ngày). '
      : ids.length+' mục vào thùng rác, vẫn khôi phục được. ')+(lich?'Xóa việc + nhật ký trong Lịch. ':'')+'Cài đặt giữ nguyên.', han?'Xóa hẳn':'Reset', function(){
    var n = ids.length ? chuyenVaoRac(ids, 'Reset dữ liệu thử') : 0;
    if(lich){
      var L = lcData(), now = new Date().toISOString();
      L.viec.forEach(function(v){ L.daXoa.push({id:v.id, luc:now}); });
      L.viec = [];
      Object.keys(L.nhatKy||{}).forEach(function(ng){ L.nhatKy[ng] = {text:'', suaLuc:now}; });
      (L.note||[]).forEach(function(m){ (L.noteXoa = L.noteXoa||[]).push({id:m.id, luc:now}); });
      L.note = [];
      luu(); henDongBoLich();
    }
    ve(); if(typeof veLich==='function') veLich(); capNhatDemRac();
    if(han && n) thucHienXoaHan(ids);
    else bao('Đã reset '+n+' mục'+(lich?', lịch':'')+'. Cài đặt giữ nguyên.'+(n?' Các mục đang ở 🗑 — khôi phục hoặc xóa hẳn khi cần.':''), 8);
  });
}
function moXoaSachMay(){
  moHop('<div class="hop-tit">⚠ Xóa sạch cả cài đặt trên máy này</div>'+
    '<div class="hop-phu">Mất trên máy này: toàn bộ chỉ mục, thùng rác, lịch, <b>cài đặt</b> (địa bàn, danh mục, tag…), '+
    'bản sao file và <b>ảnh CCCD</b>. <b>Drive giữ nguyên</b>. App tự tải một bản dự phòng đầy đủ trước khi xóa.</div>'+
    '<div class="o"><label>Gõ chữ <b>XOA</b> để xác nhận</label><input id="xs-go" autocomplete="off"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
    '<button class="nho xau" onclick="xoaSachMay()">Xóa sạch</button></div>');
}
function xoaSachMay(){
  if((gt('xs-go')||'').trim().toUpperCase()!=='XOA') return baoLoi('Gõ đúng chữ XOA để xác nhận.');
  hoi('Chắc chắn xóa sạch?', 'Lần hỏi cuối. Sau khi xóa, app tải lại như mới cài trên máy này.', 'Xóa sạch', function(){
    var ten = xuatDuPhong('truoc-xoa-sach');
    luuHuy(); window.LUU_KHOA_XOA = 1; localStorage.removeItem(KHOA); if(typeof LN!=='undefined') LN.xoaHet();   /* 3.223 M8: bỏ cả kho theo ngăn */
    moKho().then(function(db){
      var t = db.transaction('f','readwrite');
      t.objectStore('f').clear();
      t.oncomplete = function(){ setTimeout(function(){ location.reload(); }, 600); };
    }).catch(function(){ location.reload(); });
    bao('Đã tải bản dự phòng '+ten+'. Đang xóa…', 5);
  });
}
function xoaHet(){ return moXoaSachMay(); }
