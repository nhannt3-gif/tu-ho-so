/* ==========================================================
   13. BIỂU MẪU — kho mẫu đơn trắng để in cho khách điền
   Xếp theo chương trình vay; có nhóm dùng chung và theo nghiệp vụ.
   Mỗi mẫu có thể kèm một bản "đã điền mẫu" làm hướng dẫn.
   ========================================================== */
var BM = {locNhom:'', locKieu:'', chon:{}};

function nhomBieuMau(){
  var ra = ['Dùng chung cho mọi chương trình'];
  (D.cauHinh.chuongTrinh||[]).forEach(function(x){ ra.push(x); });
  ra.push('Theo nghiệp vụ');
  return ra;
}

function veBieuMau(){
  var e = document.getElementById('tr5'); if(!e) return;
  D.bieuMau = D.bieuMau || [];
  var ds = D.bieuMau.slice();
  if(tuKhoa) ds = ds.filter(function(m){
    return boDau(m.ten+' '+m.nhom+' '+(m.ghi||'')+' '+(m.soHieu||'')).indexOf(tuKhoa)>=0; });
  ds = locTheoThe('bieuMau', locChuan('bieuMau', ds)); BOT_DS.bieuMau = ds;

  var h = veDauTab('bieuMau', {kho:D.bieuMau, hamThem:'themBieuMau()',
    nutThem:'<button class="phu" onclick="moDsBo()">📚 Bộ biểu mẫu'+(dsBo().length?' · '+dsBo().length:'')+'</button>'});
  h += veThanhSap('bieuMau', null, null, null, '<b>'+ds.length+'</b> biểu mẫu'+chuDemLoc('bieuMau'));

  var soChon = Object.keys(BM.chon).length;
  /* 3.61 (việc M, anh chốt): tích ☐ nhiều mẫu → 📤 Gửi N file một lần (Zalo…) · 🗜 Nén .zip · 🖨 In cả bộ */
  if(soChon){
    var coChon = Object.keys(BM.chon).reduce(function(a, id){ var m = bmTim(id); return a+(m && +m.co || 0); }, 0);
    h += '<div class="thanh-chon thanh-in"><span>Đã chọn <b>'+soChon+'</b> mẫu'+(BM.boTen ? ' · bộ “'+coChuHTML(BM.boTen)+'”' : '')+(coChon ? ' ('+kichCo(coChon)+')' : '')+'</span>'+
      (coChiaSeNhieu() ? '<button class="in-chinh" onclick="guiNhieuBM()">📤 Gửi '+soChon+' file</button>' : '')+
      '<button class="'+(coChiaSeNhieu()?'':'in-chinh')+'" onclick="nenZipBM()">🗜 Nén .zip</button>'+
      '<button onclick="inBoMau()">🖨 In cả bộ</button>'+
      '<button onclick="BM.chon={};BM.boTen=\'\';veBieuMau()">Bỏ chọn</button></div>';
  }


  if(!ds.length){
    h += '<div class="rong">'+(D.bieuMau.length
      ? 'Không có mẫu nào khớp.'
      : 'Chưa có biểu mẫu nào.<br>Bấm <b>Thêm biểu mẫu</b> ở dưới để đưa mẫu đơn trắng vào.<br>'+
        'Ví dụ: đơn 01/TD, giấy ủy quyền 01/UQ, biên bản họp tổ.')+'</div>';
    e.innerHTML = h; return;
  }

  /* gom theo nhóm cho dễ nhìn */
  var gom = {};
  var GHIM = '\u0001ghim';   /* 3.31: mẫu ghim gom thành nhóm riêng trên cùng — ghim luôn đứng đầu, rồi tới Dùng chung */
  bmSapXep(ds).forEach(function(m){ var k = m.ghim ? GHIM : m.nhom; (gom[k]=gom[k]||[]).push(m); });
  /* 3.31: nhóm Dùng chung luôn hiện đầu (kể cả khi lọc theo một chương trình vay), mỗi nhóm có số mẫu */
  Object.keys(gom).sort(function(a,b){
    return (b===GHIM)-(a===GHIM) || (/^Dùng chung/.test(b)?1:0)-(/^Dùng chung/.test(a)?1:0) || a.localeCompare(b);
  }).forEach(function(n){
    h += '<div class="nhan-nhom bm-nhom-dau">'+coChuHTML(n===GHIM?'★ Quan trọng':(/^Dùng chung/.test(n)?'Tất cả CT':n))+' · '+gom[n].length+' mẫu</div>';
    h += gom[n].map(function(m){
      return '<div class="d2'+(BM.chon[m.id]?' chon':'')+'"'+botAt(m.id)+' onclick="chonDong(\''+m.id+'\')">'+
        '<div class="h1">'+
          '<span class="o-chon'+(BM.chon[m.id]?' bat':'')+'" onclick="event.stopPropagation();doiChonBM(\''+m.id+'\')" title="Tích để gửi / nén / in nhiều mẫu một lần">'+(BM.chon[m.id]?'✓':'')+'</span>'+
          saoHTML(m)+'<span class="ico">'+(m.huongDan?'📝':'📄')+'</span>'+
          '<span class="ten">'+toSang(m.ten, tuKhoa)+'</span>'+
          (m.ghi?'<span class="ty">'+coChuHTML(m.ghi)+'</span>':'')+'</div>'+
        '<div class="h2"><div class="the">'+
          /* 3.32: bỏ nhãn "ghim" (đã có nhóm 📌), tên nhóm (đã có tiêu đề nhóm), "Mẫu trắng" (mặc định) */
          (m.soHieu?'<span class="tg">'+coChuHTML(m.soHieu)+'</span>':'')+
          (m.huongDan?'<span class="tg phu">Mẫu hướng dẫn</span>':'')+
          (m.driveId?'':'<span class="tg xam" title="Chưa có trên Drive — bấm G hoặc W để đưa lên">chưa lên Drive</span>')+
          (m.soLanDung?'<span class="tg xam">dùng '+m.soLanDung+' lần</span>':'')+
          (m.vbKem && timMuc(m.vbKem) ? '<span class="tg" title="Văn bản ban hành mẫu này">📎 '+
             coChuHTML((timMuc(m.vbKem).soHieu||'văn bản'))+'</span>' : '')+
        '</div><div class="nut">'+
          '<button onclick="event.stopPropagation();moBangOffice(\''+m.id+'\')" title="Mở thẳng bằng Word hoặc Excel trên máy tính">W</button>'+
          '<button onclick="event.stopPropagation();bmMoDocs(\''+m.id+'\')" title="Mở trên Google Docs">G</button>'+
          '<button onclick="event.stopPropagation();inMotMau(\''+m.id+'\')" title="In">🖨</button>'+
          '<button onclick="moMenu(event,\''+m.id+'\')" title="Thêm lệnh">⋯</button>'+
        '</div></div>'+
        (m.cachDung?'<div class="bm-cach">💡 '+coChuHTML(m.cachDung)+'</div>':'')+
        (m.thayBoi && bmTim(m.thayBoi) ? '<div class="bm-cu">Đã thay bằng <b>'+coChuHTML(bmTim(m.thayBoi).ten)+'</b>'+
          (m.hieuLucTu?' — hiệu lực từ '+ngayVN(m.hieuLucTu):'')+'</div>' : '')+
        '</div>';
    }).join('');
  });
  h += '<p class="ghi">Biểu tượng 📝 là bản đã điền mẫu để hướng dẫn, 📄 là mẫu trắng. '+
       'Bấm 🖨 để in ngay một mẫu, hoặc tích chọn nhiều mẫu rồi bấm <b>In cả bộ</b>.</p>';
  e.innerHTML = h;
}
function datNhomBM(t){ BM.locNhom = (BM.locNhom===t)?'':t; veBieuMau(); }
/* ==========================================================
   BIỂU MẪU 3.24 — như một thư mục: ghim · đếm lần dùng · ghi chú cách dùng ·
   bản cũ ghi đã thay bằng bản mới (hiệu lực từ ngày) · gắn văn bản sinh ra mẫu ·
   mở bằng Word trên máy hoặc Google Docs
   ========================================================== */
function bmTim(id){ return (D.bieuMau||[]).find(function(x){ return x.id===id; }); }
/* ---- BỘ BIỂU MẪU THEO VIỆC (3.26): gom nhiều mẫu thành một bộ, mở hoặc in cả bộ ---- */
function dsBo(){ D.cauHinh.boMau = D.cauHinh.boMau || []; return D.cauHinh.boMau; }
function moDsBo(){
  var bo = dsBo();
  moHop('<div class="hop-tit">Bộ biểu mẫu theo việc</div>'+
    '<div class="hop-phu">Gom sẵn các mẫu hay dùng cùng nhau, ví dụ “Hồ sơ cho vay hộ nghèo”. Bấm một cái là in hoặc gửi cả bộ.</div>'+
    (bo.length ? '<div class="bo-ds">'+bo.map(function(b,i){
      return '<div class="bo-o"><div class="bo-ten">'+coChuHTML(b.ten)+'<small>'+(b.mau||[]).length+' mẫu</small></div>'+
        '<div class="bo-mau">'+(b.mau||[]).map(function(id){ var m = bmTim(id);
          return '<span>'+coChuHTML(m?m.ten:'(mẫu đã xóa)')+'</span>'; }).join('')+'</div>'+
        '<div class="hang-nut"><button class="nho chinh" onclick="chonBoGui('+i+')" title="Tích sẵn các mẫu của bộ để Gửi / Nén / In">📤 Chọn cả bộ để gửi</button>'+
        '<button class="nho" onclick="inBo('+i+')">🖨 In cả bộ</button>'+
        '<button class="nho" onclick="suaBo('+i+')">Sửa bộ</button>'+
        '<button class="nho xau" onclick="xoaBo('+i+')">Xóa bộ</button></div></div>';
    }).join('')+'</div>' : '<div class="rong">Chưa có bộ nào.</div>')+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button>'+
    '<button class="nho chinh" onclick="suaBo(-1)">+ Tạo bộ mới</button></div>', true);
}
function suaBo(i){
  var bo = dsBo(), b = (i>=0) ? bo[i] : {ten:'', mau:[]};
  moHop('<div class="hop-tit">'+(i>=0?'Sửa bộ':'Bộ biểu mẫu mới')+'</div>'+
    '<div class="o"><label>Tên bộ</label><input id="bo-ten" value="'+coChuHTML(b.ten||'')+'" placeholder="Ví dụ: Hồ sơ cho vay hộ nghèo"></div>'+
    '<div class="o"><label>Chọn mẫu trong bộ</label><div class="bo-chon">'+
      (D.bieuMau||[]).map(function(m){
        return '<label class="dt-dong"><input type="checkbox" class="bo-o-chon" value="'+m.id+'"'+
          ((b.mau||[]).indexOf(m.id)>=0?' checked':'')+'> '+coChuHTML(m.ten)+
          '<small>'+coChuHTML(m.nhom||'')+'</small></label>';
      }).join('')+'</div></div>'+
    '<div class="hang-nut"><button class="nho" onclick="moDsBo()">Thôi</button>'+
    '<button class="nho chinh" onclick="luuBo('+i+')">Lưu bộ</button></div>', true);
}
function luuBo(i){
  var ten = (gt('bo-ten')||'').trim();
  if(!ten) return baoLoi('Đặt tên cho bộ đã.');
  var mau = Array.prototype.slice.call(document.querySelectorAll('.bo-o-chon:checked')).map(function(c){ return c.value; });
  if(!mau.length) return baoLoi('Chọn ít nhất một mẫu.');
  var bo = dsBo();
  if(i>=0) bo[i] = {ten:ten, mau:mau}; else bo.push({ten:ten, mau:mau});
  luu(); moDsBo();
  bao('Đã lưu bộ “'+ten+'” · '+mau.length+' mẫu.', 5);
}
function xoaBo(i){
  var bo = dsBo(), b = bo[i]; if(!b) return;
  hoi('Xóa bộ "'+b.ten+'"?', 'Chỉ xóa cách gom nhóm, các biểu mẫu vẫn còn nguyên trong tủ.', 'Xóa bộ', function(){
    bo.splice(i,1); luu(); moDsBo();
  });
}
function chonBoGui(i){
  var b = dsBo()[i]; if(!b) return;
  BM.chon = {}; BM.boTen = b.ten;
  (b.mau||[]).forEach(function(id){ if(bmTim(id)) BM.chon[id] = true; });
  dongHop(); veBieuMau(); window.scrollTo(0, 0);
  bao('Đã tích '+Object.keys(BM.chon).length+' mẫu của bộ “'+b.ten+'” — bấm 📤 Gửi hoặc 🗜 Nén .zip ở thanh trên.', 6);
}
function inBo(i){
  var b = dsBo()[i]; if(!b) return;
  BM.chon = {}; BM.boTen = b.ten;
  (b.mau||[]).forEach(function(id){ if(bmTim(id)){ BM.chon[id] = true; bmDungThem(id); } });
  dongHop(); veBieuMau();
  if(typeof inBoMau==='function') inBoMau();
  else bao('Đã chọn '+Object.keys(BM.chon).length+' mẫu của bộ “'+b.ten+'” — bấm In cả bộ.', 6);
}
function bmGhim(id){
  var m = bmTim(id); if(!m) return;
  m.ghim = !m.ghim; m.suaLuc = new Date().toISOString(); luu(); veBieuMau();
  bao(m.ghim?'Đã đánh dấu ★ quan trọng — lên đầu danh sách.':'Đã bỏ dấu ★.', 3);
}
function bmDungThem(id){
  var m = bmTim(id); if(!m) return;
  m.soLanDung = (m.soLanDung||0) + 1; m.dungCuoi = new Date().toISOString(); luu();
}
/* 3.31: sắp theo thanh Sắp xếp (SAP) — mẫu ghim LUÔN đứng đầu bất kể sắp theo gì */
function namVBGoc(m){ var v = m.vbKem && timMuc(m.vbKem); return v && v.ngay ? String(v.ngay).slice(0,4) : ''; }
function bmSapXep(ds){
  var d = SAP.xuoi ? 1 : -1;
  var khoa = function(m){
    if(SAP.cot==='ten')   return boDau(m.ten||m.tenMoi||'');
    if(SAP.cot==='loai')  return (m.huongDan?'1':'0')+boDau(m.soHieu||'');
    if(SAP.cot==='co')    return +m.co||0;
    if(SAP.cot==='namvb') return namVBGoc(m);
    if(SAP.cot==='ngay')  return String(m.themLuc||'');
    if(SAP.cot==='them')  return lucThemMuc(m);
    return m.soLanDung||0;   /* 'dung' — mặc định */
  };
  return ds.slice().sort(function(a,b){
    var g = (b.ghim?1:0)-(a.ghim?1:0); if(g) return g;
    var x = khoa(a), y = khoa(b);
    if(x<y) return -d; if(x>y) return d;
    return (a.ten||'').localeCompare(b.ten||'');
  });
}
function bmGhiChu(id){
  var m = bmTim(id); if(!m) return;
  moHop('<div class="hop-tit">Ghi chú cách dùng</div>'+
    '<div class="hop-phu">'+coChuHTML(m.ten)+'</div>'+
    '<div class="o"><textarea id="bm-gc" rows="3" placeholder="Ví dụ: điền phần II, tổ trưởng ký trước khi nộp">'+
      coChuHTML(m.cachDung||'')+'</textarea></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    '<button class="nho chinh" onclick="bmLuuGhiChu(\''+id+'\')">Lưu</button></div>');
}
function bmLuuGhiChu(id){
  var m = bmTim(id); if(!m) return;
  m.cachDung = (gt('bm-gc')||'').trim(); m.suaLuc = new Date().toISOString();
  luu(); dongHop(); veBieuMau();
}
/* đánh dấu bản cũ đã bị thay, ghi ngày hiệu lực của bản mới */
function bmThayBan(id){
  var m = bmTim(id); if(!m) return;
  var khac = (D.bieuMau||[]).filter(function(x){ return x.id!==id; });
  moHop('<div class="hop-tit">Bản mới thay cho mẫu này</div>'+
    '<div class="hop-phu">'+coChuHTML(m.ten)+'</div>'+
    '<div class="o"><label>Bản mới</label><select id="bm-moi">'+
      '<option value="">— chọn biểu mẫu đã có —</option>'+
      khac.map(function(x){ return '<option value="'+x.id+'"'+(m.thayBoi===x.id?' selected':'')+'>'+coChuHTML(x.ten)+'</option>'; }).join('')+
    '</select></div>'+
    '<div class="o"><label>Bản mới có hiệu lực từ ngày</label>'+
      '<input id="bm-hl" inputmode="numeric" placeholder="dd/mm/yyyy" value="'+(m.hieuLucTu?ngayVN(m.hieuLucTu):'')+'" oninput="gonNgay(this)"></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    (m.thayBoi?'<button class="nho" onclick="bmBoThay(\''+id+'\')">Bỏ đánh dấu</button>':'')+
    '<button class="nho chinh" onclick="bmLuuThay(\''+id+'\')">Lưu</button></div>');
}
function bmLuuThay(id){
  var m = bmTim(id); if(!m) return;
  m.thayBoi = gt('bm-moi') || '';
  m.hieuLucTu = ngayISOo(gt('bm-hl')) || '';
  m.suaLuc = new Date().toISOString(); luu(); dongHop(); veBieuMau();
  bao(m.thayBoi?'Đã đánh dấu bản cũ, vẫn giữ để tra.':'Đã lưu.', 5);
}
function bmBoThay(id){
  var m = bmTim(id); if(!m) return;
  delete m.thayBoi; delete m.hieuLucTu; m.suaLuc = new Date().toISOString();
  luu(); dongHop(); veBieuMau();
}
/* ==========================================================
   3.31 — MỞ FILE WORD/EXCEL KHÔNG PHẢI TẢI VỀ (tránh rác trong thư mục Tải xuống)
   1. Google Docs/Sheets trên web — sửa, in ngay; file .docx gốc trên Drive giữ nguyên định dạng
   2. Máy có ổ G (Google Drive cho máy tính) — chép đường dẫn đúng file đang đồng bộ, dán vào Explorer là Word mở thẳng
   3. Tải về — chỉ khi anh chọn, có báo rõ là sẽ tạo file trong Tải xuống
   ========================================================== */
function tenBieuMau(m){ return 'MAU_'+(m.soHieu?slug(m.soHieu,3)+'_':'')+slug(m.ten||'Bieu-mau',7)+(m.duoi||''); }
/* bảo đảm mục đã có trên Drive — chưa có thì đưa lên (một lần) */
function bmDamBaoDrive(m){
  if(m.driveId) return Promise.resolve(m.driveId);
  if(!coTheNoiDrive()) return Promise.reject(new Error('Chưa nối Drive'));
  if(!m.tenMoi) m.tenMoi = laBieuMau(m) ? tenBieuMau(m) : (m.tenCu||'file');
  bao('Đang đưa “'+m.tenMoi+'” lên Drive…', 4);
  return dayLenDrive(m).then(function(){ ve(); return m.driveId; });
}
/* đường link mở trên web theo loại file */
function linkMoDrive(m){
  var t = (m.tenMoi||m.tenCu||'').toLowerCase();
  if(/\.(docx?|rtf|odt)$/.test(t)) return 'https://docs.google.com/document/d/'+m.driveId+'/edit?rtpof=true';
  if(/\.(xlsx?|xlsm|csv|ods)$/.test(t)) return 'https://docs.google.com/spreadsheets/d/'+m.driveId+'/edit?rtpof=true';
  return 'https://drive.google.com/file/d/'+m.driveId+'/view';
}
/* đường dẫn file trên ổ G: G:\My Drive\Tủ hồ sơ\Biểu mẫu\HN\MAU_….docx */
function duongFileMay(m){ return duongMay(thuMucCua(m)) + '\\' + (m.tenMoi||m.tenCu||''); }
function timMucMo(id){ return timMuc(id) || bmTim(id) || (mucDangXem && mucDangXem.id===id ? mucDangXem : null); }
function moBangOffice(id, ung){
  var m = timMucMo(id); if(!m) return;
  var ten = (m.tenMoi || m.tenCu || '').toLowerCase();
  var ud = ung || (/\.(xlsx|xls|csv)$/.test(ten) ? 'excel' : 'word');
  var tenUD = ud==='excel' ? 'Excel' : 'Word';
  moHop('<div class="hop-tit">Mở bằng '+tenUD+'</div>'+
    '<div class="hop-phu">'+coChuHTML(m.tenMoi||m.tenCu||'')+'</div>'+
    '<div class="hang-nut" style="flex-direction:column;align-items:stretch">'+
      (coCauNoi() ? '<button class="nho chinh" onclick="dongHop();moOfficeCN(\''+id+'\',\'mo\')">📝 Mở bằng '+tenUD+' trên máy — file thật, sửa xong tự lên Drive</button>'+
        '<button class="nho" onclick="dongHop();moOfficeCN(\''+id+'\',\'xem\')">👁 Xem nhanh — bản tạm, không đụng file gốc</button>' : '')+
      '<button class="nho'+(coCauNoi()?'':' chinh')+'" onclick="dongHop();bmMoDocs(\''+id+'\')">☁ Mở trên Google '+(ud==='excel'?'Sheets':'Docs')+' — không tải về</button>'+
      '<button class="nho" onclick="dongHop();moOfficeHop(\''+id+'\',\'may\')">📂 Mở bằng '+tenUD+' trên máy tính (ổ G) — chép đường dẫn</button>'+
      '<button class="nho" onclick="dongHop();moOfficeHop(\''+id+'\',\'tai\')">⬇ Tải về máy (tạo file trong Tải xuống)</button>'+
    '</div>'+
    '<div class="huong-dan">Google Docs mở và in được ngay; file .docx gốc trên Drive giữ nguyên định dạng. '+
    'Ổ G: dán đường dẫn vào thanh địa chỉ Explorer rồi Enter — '+tenUD+' mở thẳng file đang đồng bộ, sửa xong lưu là cập nhật lên Drive.</div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button></div>');
}
function moOfficeCN(id, hanh){
  var m = timMucMo(id); if(!m) return;
  if(bmTim(id)) bmDungThem(id);
  if(m.driveId) return goiCauNoi(hanh, relCua(m));
  if(!coTheNoiDrive()) return baoLoi('File chưa có trên Drive nên ổ G chưa có.');
  bmDamBaoDrive(m).then(function(){ bao('Đã đưa lên Drive — chờ ổ G chép về vài giây…', 5); setTimeout(function(){ goiCauNoi(hanh, relCua(m)); }, 6000); })
    .catch(function(e){ baoLoi('Chưa đưa lên Drive được: '+(e&&e.message||e)); });
}
function moOfficeHop(id, cach){
  var m = timMucMo(id); if(!m) return;
  if(bmTim(id)) bmDungThem(id);
  if(cach==='may'){
    if(!m.driveId && coTheNoiDrive())
      return bmDamBaoDrive(m).then(function(){
        chepChu(duongFileMay(m), 'Đã đưa lên Drive và chép đường dẫn. Chờ ổ G đồng bộ vài giây rồi dán vào Explorer, Enter.');
      }).catch(function(e){ baoLoi('Chưa đưa lên Drive được: '+(e&&e.message||e)); });
    if(!m.driveId) return baoLoi('File chưa có trên Drive nên ổ G chưa có. Nối Drive rồi thử lại, hoặc chọn Tải về.');
    return chepChu(duongFileMay(m), 'Đã chép: '+duongFileMay(m)+' — bấm vào thanh địa chỉ Explorer, Ctrl+V, Enter.');
  }
  docFile(m.id).then(function(b){
    if(b) return b;
    return layNoiDung(m);
  }).then(function(b){
    if(!b) return baoLoi('Chưa có bản sao file trong máy — nối Drive rồi thử lại.');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = m.tenMoi || m.tenCu || 'tai_lieu';
    document.body.appendChild(a); a.click(); a.remove();
    bao('Đã tải về thư mục Tải xuống. Dùng xong nên xóa để khỏi rác.', 6);
  }).catch(function(e){ baoLoi('Không mở được: '+(e&&e.message||e)); });
}
function bmMoWord(id){ moBangOffice(id, 'word'); }
function bmMoExcel(id){ moBangOffice(id, 'excel'); }
function bmMoDocs(id){
  var m = timMucMo(id); if(!m) return;
  if(bmTim(id)) bmDungThem(id);
  if(m.driveId){ window.open(linkMoDrive(m), '_blank'); return; }
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive — vào Cài đặt › Google Drive để nối, hoặc chọn Tải về.');
  var w = window.open('about:blank', '_blank');   /* mở trước để trình duyệt không chặn cửa sổ */
  bmDamBaoDrive(m).then(function(){ if(w) w.location = linkMoDrive(m); else window.open(linkMoDrive(m), '_blank'); })
    .catch(function(e){ if(w) w.close(); baoLoi('Chưa đưa lên Drive được: '+(e&&e.message||e)); });
}
/* biểu mẫu sinh ra từ văn bản nào (dùng lại trường vbKem đã có) */
function bmGanVB(id){
  var m = bmTim(id); if(!m) return;
  var vb = D.vanBan.filter(function(x){ return x.nhom==='vanBan'; })
    .sort(function(a,b){ return (b.ngay||'').localeCompare(a.ngay||''); }).slice(0,60);
  moHop('<div class="hop-tit">Văn bản ban hành mẫu này</div>'+
    '<div class="hop-phu">'+coChuHTML(m.ten)+'</div>'+
    '<div class="o"><select id="bm-vb2"><option value="">— không gắn —</option>'+
      vb.map(function(x){ return '<option value="'+x.id+'"'+(m.vbKem===x.id?' selected':'')+'>'+
        coChuHTML((x.soHieu?x.soHieu+' · ':'')+(x.tenVB||x.tenMoi||''))+'</option>'; }).join('')+
    '</select></div>'+
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    '<button class="nho chinh" onclick="bmLuuVB(\''+id+'\')">Lưu</button></div>');
}
function bmLuuVB(id){
  var m = bmTim(id); if(!m) return;
  m.vbKem = gt('bm-vb2') || ''; m.suaLuc = new Date().toISOString();
  luu(); dongHop(); veBieuMau();
}
function datKieuBM(k){ BM.locKieu = k; veBieuMau(); }
function doiChonBM(id){
  if(BM.chon[id]) delete BM.chon[id]; else BM.chon[id]=1;
  if(!Object.keys(BM.chon).length) BM.boTen = '';
  veBieuMau();
}
/* ==========================================================
   3.61 (việc M): GỬI NHIỀU BIỂU MẪU · NÉN .ZIP
   - Điện thoại: bảng chia sẻ của máy với cả N file (Zalo nhận đủ một lần, giữ tên chuẩn)
   - Máy tính / máy không chia sẻ nhiều file: nén .zip (tự nén trong app, không cần mạng) rồi tải về, kéo vào Zalo
   ========================================================== */
function coChiaSeNhieu(){
  if(laMayBan() || !navigator.canShare) return false;
  try{ return navigator.canShare({files:[new File(['a'], 'a.txt', {type:'text/plain'}), new File(['b'], 'b.txt', {type:'text/plain'})]}); }catch(e){ return false; }
}
function layFileBM(){
  var ds = Object.keys(BM.chon).map(bmTim).filter(Boolean), kq = [], i = 0;
  if(!ds.length){ bao('Chưa chọn mẫu nào.', 3); return Promise.resolve(null); }
  batChay(true, 'Đang lấy file 0/'+ds.length+'…');
  return ds.reduce(function(p, m){
    return p.then(function(){
      i++; dangLamChu('Đang lấy file '+i+'/'+ds.length+'…');
      return layNoiDung(m).then(function(b){
        if(b) kq.push({ten:m.tenMoi||m.tenCu||m.ten||('mau-'+i), b:b});
      }).catch(function(){});
    });
  }, Promise.resolve()).then(function(){
    tatChay();
    if(kq.length < ds.length) bao('Có '+(ds.length-kq.length)+' mẫu chưa lấy được (chưa có trong máy, Drive chưa nối) — bỏ qua mẫu đó.', 6);
    return kq.length ? kq : null;
  }, function(e){ tatChay(); throw e; });
}
function guiNhieuBM(){
  layFileBM().then(function(ds){
    if(!ds) return;
    var fs = ds.map(function(x){ return new File([x.b], x.ten, {type:x.b.type||'application/octet-stream'}); });
    if(navigator.canShare && navigator.canShare({files:fs})) return navigator.share({files:fs, title:BM.boTen||'Biểu mẫu'}).catch(function(){});
    bao('Máy này không gửi được nhiều file cùng lúc — app nén thành .zip.', 4);
    return taoVaGiaoZip(ds);
  });
}
function nenZipBM(){ layFileBM().then(function(ds){ if(ds) taoVaGiaoZip(ds); }); }
function tenZipBM(){
  var khongDau = function(t){ return String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').replace(/[\\\/:*?"<>|]+/g,' ').replace(/\s+/g,' ').trim(); };
  return 'Bieu mau'+(BM.boTen ? ' - '+khongDau(BM.boTen) : '')+' - '+lcDMY(lcISO(nay())).replace(/\//g,'-')+'.zip';
}
function taoVaGiaoZip(ds){
  return taoZip(ds).then(function(z){
    var ten = tenZipBM(), f = new File([z], ten, {type:'application/zip'});
    if(!laMayBan() && navigator.canShare && navigator.canShare({files:[f]})) return navigator.share({files:[f], title:ten}).catch(function(){});
    var a = document.createElement('a'), u = URL.createObjectURL(z);
    a.href = u; a.download = ten; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(u); }, 5000);
    bao('Đã nén '+ds.length+' mẫu thành '+ten+' ('+kichCo(z.size)+') — kéo file này vào Zalo để gửi.', 8);
  });
}
/* ZIP kiểu "lưu nguyên" (không nén thêm — Word / Excel / PDF vốn đã nén sẵn), tên tiếng Việt UTF-8 */
var CRC_BANG = null;
function crc32(u8){
  if(!CRC_BANG){ CRC_BANG = new Uint32Array(256); for(var n=0;n<256;n++){ var c = n; for(var k=0;k<8;k++) c = c&1 ? 0xEDB88320^(c>>>1) : c>>>1; CRC_BANG[n] = c>>>0; } }
  var crc = 0xFFFFFFFF; for(var i=0;i<u8.length;i++) crc = CRC_BANG[(crc^u8[i])&0xFF]^(crc>>>8);
  return (crc^0xFFFFFFFF)>>>0;
}
function taoZip(ds){
  var trung = {};
  return Promise.all(ds.map(function(x){ return x.b.arrayBuffer(); })).then(function(bufs){
    var enc = new TextEncoder(), phan = [], dmuc = [], off = 0, d = new Date();
    var gio = (d.getHours()<<11)|(d.getMinutes()<<5)|(Math.floor(d.getSeconds()/2)), ngay = ((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate();
    ds.forEach(function(x, i){
      var ten = x.ten, n = 2; while(trung[ten]){ ten = x.ten.replace(/(\.[^.]+)?$/, ' ('+(n++)+')$1'); } trung[ten] = 1;
      var tb = enc.encode(ten), dl = new Uint8Array(bufs[i]), crc = crc32(dl);
      var h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, gio, true); h.setUint16(12, ngay, true); h.setUint32(14, crc, true);
      h.setUint32(18, dl.length, true); h.setUint32(22, dl.length, true); h.setUint16(26, tb.length, true); h.setUint16(28, 0, true);
      phan.push(h.buffer, tb, dl);
      var c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
      c.setUint16(12, gio, true); c.setUint16(14, ngay, true); c.setUint32(16, crc, true); c.setUint32(20, dl.length, true); c.setUint32(24, dl.length, true);
      c.setUint16(28, tb.length, true); c.setUint16(30, 0, true); c.setUint16(32, 0, true); c.setUint16(34, 0, true); c.setUint16(36, 0, true);
      c.setUint32(38, 0, true); c.setUint32(42, off, true);
      dmuc.push(c.buffer, tb);
      off += 30 + tb.length + dl.length;
    });
    var coDM = dmuc.reduce(function(a, x){ return a+(x.byteLength||x.length); }, 0);
    var e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, ds.length, true); e.setUint16(10, ds.length, true);
    e.setUint32(12, coDM, true); e.setUint32(16, off, true);
    return new Blob(phan.concat(dmuc, [e.buffer]), {type:'application/zip'});
  });
}

function themBieuMau(){
  var i = document.createElement('input');
  i.type='file'; i.multiple=true; i.accept='.pdf,.doc,.docx,.xls,.xlsx';
  i.onchange = function(){
    var fs = Array.prototype.slice.call(i.files);
    if(!fs.length) return;
    bao('Đang đưa '+fs.length+' mẫu vào kho…', 3);
    var moi = [];
    fs.reduce(function(p, f){
      return p.then(function(){
        var id = idMoi();
        return luuFile(id, f).then(function(){
          D.bieuMau = D.bieuMau || [];
          var m = {id:id, nhom:BM.locNhom||'Dùng chung cho mọi chương trình',
            ten:f.name.replace(/\.[^.]+$/,''), tenCu:f.name, duoi:duoiFile(f.name),
            co:f.size, soHieu:'', ghi:'', huongDan:false,
            themLuc:new Date().toISOString()};
          m.tenMoi = tenBieuMau(m);
          D.bieuMau.push(m); moi.push(m);
        });
      });
    }, Promise.resolve()).then(function(){
      luu(); veBieuMau(); veDay();
      bao('Đã thêm '+fs.length+' mẫu. Bấm vào từng mẫu để đặt tên và xếp nhóm.', 6);
      /* 3.31: biểu mẫu tự đưa lên Drive (Tủ hồ sơ/Biểu mẫu/<nhóm>) để mở thẳng bằng Google Docs hoặc ổ G, không phải tải về */
      if(DR.sanSang && D.cauHinh.tuLenDrive!==false) dayLenNhieu(moi);
      if(D.bieuMau.length) suaBieuMau(D.bieuMau[D.bieuMau.length-1].id);
    });
  };
  i.click();
}

function suaBieuMau(id){
  var m = (D.bieuMau||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  moHop('<div class="hop-tit">Biểu mẫu</div>'+
    '<div class="hop-phu">Đặt tên gọn cho dễ tìm, xếp vào chương trình vay hoặc nhóm nghiệp vụ.</div>'+
    o('Tên biểu mẫu','bm-ten',m.ten,'Ví dụ: Giấy đề nghị vay vốn kiêm phương án sử dụng vốn')+
    o('Số hiệu mẫu','bm-so',m.soHieu||'','Ví dụ: 01/TD, 01/UQ, 02/CLT')+
    '<div class="o"><label>Ban hành kèm văn bản</label><select id="bm-vb" onchange="chonVBKemBM()">'+
      '<option value="">— chưa gắn —</option>'+
      D.vanBan.map(function(v){
        return '<option value="'+v.id+'"'+(m.vbKem===v.id?' selected':'')+'>'+coChuHTML(tenNganVB(v))+'</option>';
      }).join('')+'</select>'+
      '<div class="huong-dan">Chọn VB thì Mảng và Chương trình vay tự lấy theo VB đó.</div></div>'+
    oChonGon('Mảng nghiệp vụ','bm-mang', dsMang(), m.mang?[m.mang]:[], true, 'mang')+
    '<div class="o"><label>Chương trình vay</label><select id="bm-nhom">'+
      nhomBieuMau().map(function(t){
        return '<option value="'+coChuHTML(t)+'"'+(m.nhom===t?' selected':'')+'>'+coChuHTML(hienCT(t))+'</option>';
      }).join('')+'</select>'+
      '<div class="huong-dan">Mẫu dùng cho mọi chương trình thì chọn “Tất cả CT”. '+
      'Mẫu cho một việc cụ thể như đổi tên người vay thì chọn “Theo nghiệp vụ”.</div></div>'+
    oChonTag('bieuMau', (m.the||[]), 'bm-tag')+
    '<div class="huong-dan" style="margin-top:-6px">Tag “Dùng chung”, “Mẫu trắng”, “Mẫu hướng dẫn” app tự suy từ nhóm và ô tích bên dưới — không cần chọn.</div>'+
    o('Ghi chú','bm-ghi',m.ghi||'','Ví dụ: in 2 bản, khách ký cả hai')+
    '<div class="o"><label><input type="checkbox" id="bm-hd" style="width:auto;min-height:0;margin-right:7px"'+
      (m.huongDan?' checked':'')+'>Đây là bản đã điền mẫu để hướng dẫn</label>'+
      '<div class="huong-dan">Bản đã điền dùng để đưa khách xem cách ghi, không in cho khách điền.</div></div>'+
    '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" onclick="luuBieuMau(\''+id+'\')">Lưu</button></div>'+
    '<div class="hang-nut"><button class="nho xau" onclick="xoaBieuMau(\''+id+'\')">Xóa mẫu</button></div>');
  setTimeout(thuGonTatCa, 0);
}
function chonVBKemBM(){
  var v = timMuc(gt('bm-vb')); if(!v) return;
  datChipTheo('bm-mang', v.mang);
  var ct = (v.ctrinh||[])[0], e = document.getElementById('bm-nhom');
  if(e && ct) e.value = (ct==='Dùng chung') ? 'Dùng chung cho mọi chương trình' : ct;
}
function luuBieuMau(id){
  var m = (D.bieuMau||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  m.ten = gt('bm-ten')||m.ten; m.soHieu = gt('bm-so');
  m.nhom = gt('bm-nhom'); m.ghi = gt('bm-ghi');
  m.vbKem = gt('bm-vb'); m.mang = layGon('bm-mang')[0] || ''; m.suaLuc = new Date().toISOString();
  if(document.getElementById('bm-tag')){
    m.the = layThe('bm-tag').filter(function(t){ return ['Dùng chung','Mẫu trắng','Mẫu hướng dẫn'].indexOf(t)<0; });
    ghiTagGanDay('bieuMau', m.the);
  }
  delete m.choKhai; delete m.lyDoKhai;
  ghiDung('mang', m.mang);
  var c = document.getElementById('bm-hd');
  m.huongDan = c ? c.checked : false;
  m.tenMoi = tenBieuMau(m);
  luu(); dongHop(); veBieuMau();
  sauKhiLuu(m, false);
}
function xoaBieuMau(id){ dongHop(); return xoaVaoRac(id); }
function inMotMau(id){
  var m = (D.bieuMau||[]).find(function(x){ return x.id===id; });
  if(!m) return;
  layNoiDung(m).then(function(b){
    if(!b) return baoLoi('Không tìm thấy nội dung mẫu.');
    if(!/\.pdf$/i.test(m.tenCu||'')){
      mucDangXem = m; taiFile();
      return bao('Mẫu Word phải mở bằng ứng dụng khác để in.', 5);
    }
    inBlob(b, m.tenMoi||m.tenCu);
  });
}

/* in cả bộ: ghép các mẫu PDF đã chọn thành một file rồi đưa vào hộp thoại in */
function inBoMau(){
  var ids = Object.keys(BM.chon);
  if(!ids.length) return bao('Chưa chọn mẫu nào.', 3);
  var ds = ids.map(function(id){
    return (D.bieuMau||[]).find(function(x){ return x.id===id; }); }).filter(Boolean);
  var word = ds.filter(function(m){ return !/\.pdf$/i.test(m.tenCu||''); });
  var pdf = ds.filter(function(m){ return /\.pdf$/i.test(m.tenCu||''); });
  if(!pdf.length) return baoLoi('Bộ này không có mẫu PDF nào để ghép. Mẫu Word phải in riêng.');
  if(!window.PDFLib) return baoLoi('Chưa tải được bộ ghép PDF. Có mạng một lần rồi thử lại.');
  bao('Đang ghép '+pdf.length+' mẫu…', 4);
  PDFLib.PDFDocument.create().then(function(moi){
    return pdf.reduce(function(p, m){
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
        }).catch(function(e){ console.warn('bỏ qua', m.ten, e); });
      });
    }, Promise.resolve()).then(function(){
      if(moi.getPageCount()===0) throw new Error('không ghép được trang nào');
      return moi.save();
    });
  }).then(function(bytes){
    inBlob(new Blob([bytes],{type:'application/pdf'}),
           'BoMau_'+(BM.locNhom?slug(BM.locNhom,3):'Tong-hop')+'.pdf');
    bao('Đã ghép '+pdf.length+' mẫu'+(word.length?(', còn '+word.length+' mẫu Word phải in riêng'):'')+'.', 7);
  }).catch(function(e){
    console.warn(e); baoLoi('Không ghép được: '+(e&&e.message||e));
  });
}
