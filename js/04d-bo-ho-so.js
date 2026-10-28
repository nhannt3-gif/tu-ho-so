/* 3.339 (RA_SOAT_BO_CUC_2410 mục 8 việc 7): tách nguyên văn từ js/04-giao-dien.js (dòng 3609–3880 của bản 3.338), không đổi logic — 📁 Bộ hồ sơ (3.51) */
/* ==========================================================
   3.51: 📁 BỘ HỒ SƠ — mỗi bộ là một vụ việc (vd "Rủi ro · Võ Văn Cường"): ghi chú tự do + các file liên quan
   (biên bản, giấy chứng tử, bản scan HĐ…). Gắn file CÓ SẴN ở mọi tab (chỉ liên kết, không chép) hoặc thêm file MỚI riêng của bộ
   (lưu Drive: Tủ hồ sơ / Bộ hồ sơ / <tên bộ>). Mỗi bộ gắn địa bàn theo cây Xã → Điểm GD → Ấp/KP → Tổ (tổ thuộc Hội).
   Đồng bộ 2 máy qua chỉ mục; xóa bộ → thùng rác (ngăn Bộ hồ sơ).
   ========================================================== */
var BO = {mo:'', loc:{}, tim:''};
var LOAI_BO_MD = ['Rủi ro','Hồ sơ vay','Gia hạn · điều chỉnh','Thu hồi nợ','Khác'];
function dsLoaiBo(){ return (D.cauHinh.loaiBoHS && D.cauHinh.loaiBoHS.length) ? D.cauHinh.loaiBoHS : LOAI_BO_MD; }
function timBo(id){ return (D.boHS||[]).find(function(b){ return b.id===id; }); }
function nhanTo(t){ return typeof t==='string' ? t : ((t.ma?t.ma+' — ':'')+(t.ten||'')); }
/* hội của tổ (cột "ut" trong danh mục địa bàn) */
function hoiCuaTo(xa, diem, ap, to){
  var kq = '';
  (D.cauHinh.diaBan||[]).forEach(function(x){ if(x.xa!==xa) return;
    (x.diem||[]).forEach(function(z){ if(diem && z.ten!==diem) return;
      (z.ap||[]).forEach(function(a){ if(ap && a.ten!==ap) return;
        (a.to||[]).forEach(function(t){ if(nhanTo(t)===to && typeof t!=='string') kq = t.ut||''; }); }); }); });
  return kq;
}
function duongBo(b){ return [b.xa, b.diem, b.ap, b.to ? 'Tổ '+b.to : ''].filter(Boolean).join(' › '); }
function taoBoHS(){
  moHop('<div class="hop-tit">📁 Tạo bộ hồ sơ</div>'+
    '<div class="hop-phu">Ví dụ: loại <b>Rủi ro</b>, khách <b>Võ Văn Cường</b>. Tạo xong gắn địa bàn, ghi chú và thêm file.</div>'+
    '<div class="o"><label>Loại</label><select id="bhs-loai">'+dsLoaiBo().map(function(x){ return '<option>'+coChuHTML(x)+'</option>'; }).join('')+'</select></div>'+
    '<div class="o"><label>Tên khách / vụ việc</label><input id="bhs-khach" placeholder="Võ Văn Cường" onkeydown="if(event.key===\'Enter\')xongTaoBo()"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="xongTaoBo()">Tạo</button></div>');
  setTimeout(function(){ var e = document.getElementById('bhs-khach'); if(e) e.focus(); }, 50);
}
function xongTaoBo(){
  var loai = gt('bhs-loai'), khach = gt('bhs-khach');
  if(!khach) return baoLoi('Nhập tên khách hoặc tên vụ việc.');
  var now = new Date().toISOString(), L = BO.loc||{};
  var b = {id:'bo'+idMoi(), loai:loai, khach:khach, ten:loai+' · '+khach, ghiChu:'', xa:L.xa||'', diem:L.diem||'', ap:L.ap||'', to:L.to||'', hoi:'',
    file:[], trangThai:'dang', taoLuc:now, suaLuc:now, may:maMayCua()};
  if(b.to) b.hoi = hoiCuaTo(b.xa, b.diem, b.ap, b.to);
  D.boHS = D.boHS||[]; D.boHS.unshift(b); luu();
  dongHop(); if(nganHienTai!==3) doiNgan(3); D.cauHinh.tvPhan = 'bo'; BO.mo = b.id; veGhiChu();
}
function suaBoHS(id, k, v){
  var b = timBo(id); if(!b) return;
  b[k] = v; b.suaLuc = new Date().toISOString();
  if(k==='loai' || k==='khach') b.ten = (b.loai||'')+' · '+(b.khach||'');
  if(k==='xa'){ b.diem = ''; b.ap = ''; b.to = ''; b.hoi = ''; }
  if(k==='diem'){ b.ap = ''; b.to = ''; b.hoi = ''; }
  if(k==='ap'){ b.to = ''; b.hoi = ''; }
  if(k==='to') b.hoi = hoiCuaTo(b.xa, b.diem, b.ap, v) || b.hoi;
  clearTimeout(suaBoHS.hen); suaBoHS.hen = setTimeout(luu, 600);
  if(k!=='ghiChu') veGhiChu();
}
/* ---- danh sách + cây địa bàn ---- */
function veBoHS(){
  if(BO.mo && timBo(BO.mo)) return veMotBo(timBo(BO.mo));
  BO.mo = '';
  var ds = (D.boHS||[]).slice(), L = BO.loc||{};
  var dem = function(xa, diem, ap, to){ return ds.filter(function(b){ return b.xa===xa && (diem==null || b.diem===diem) && (ap==null || b.ap===ap) && (to==null || b.to===to); }).length; };
  var loc = ds.filter(function(b){
    if(L.chua) return !b.xa;
    if(L.xa && b.xa!==L.xa) return false; if(L.diem && b.diem!==L.diem) return false;
    if(L.ap && b.ap!==L.ap) return false; if(L.to && b.to!==L.to) return false;
    if(L.hoi && b.hoi!==L.hoi) return false;
    if(tuKhoa && boDau([b.ten, b.khach, b.ghiChu, duongBo(b), b.hoi].join(' ')).indexOf(tuKhoa)<0) return false;
    return true;
  }).sort(function(a,c){ return (c.suaLuc||'').localeCompare(a.suaLuc||''); });
  var nut = function(nhan, loc2, so, lop){
    var bat = JSON.stringify(loc2)===JSON.stringify(L);
    return '<span class="bhs-nut'+(bat?' bat':'')+(so?' co':'')+(lop?' '+lop:'')+'" onclick=\'BO.loc='+JSON.stringify(loc2).replace(/'/g,"&#39;")+';veGhiChu()\'>'+coChuHTML(nhan)+(so?' <b>'+so+'</b>':'')+'</span>';
  };
  var cay = '<div class="bhs-cay"><div class="bhs-cay-dau">Địa bàn</div>'+nut('Tất cả', {}, ds.length)+
    (ds.some(function(b){ return !b.xa; }) ? nut('Chưa gắn địa bàn', {chua:1}, ds.filter(function(b){ return !b.xa; }).length) : '');
  (D.cauHinh.diaBan||[]).forEach(function(x){
    var nx = dem(x.xa);
    cay += '<details'+(L.xa===x.xa?' open':'')+'><summary>'+nut(x.xa, {xa:x.xa}, nx, 'xa')+'</summary><div class="bhs-con">';
    (x.diem||[]).forEach(function(z){
      cay += '<details'+(L.diem===z.ten && L.xa===x.xa?' open':'')+'><summary>'+nut('📍 '+z.ten, {xa:x.xa, diem:z.ten}, dem(x.xa, z.ten))+'</summary><div class="bhs-con">';
      (z.ap||[]).forEach(function(a){
        cay += '<details'+(L.ap===a.ten && L.diem===z.ten?' open':'')+'><summary>'+nut('🏘 '+a.ten, {xa:x.xa, diem:z.ten, ap:a.ten}, dem(x.xa, z.ten, a.ten))+'</summary><div class="bhs-con">'+
          (a.to||[]).map(function(t){ var tn = nhanTo(t), hoi = typeof t==='string' ? '' : (t.ut||'');
            return nut('👥 Tổ '+tn+(hoi?' · '+hoi:''), {xa:x.xa, diem:z.ten, ap:a.ten, to:tn}, dem(x.xa, z.ten, a.ten, tn)); }).join('')+'</div></details>';
      });
      cay += '</div></details>';
    });
    cay += '</div></details>';
  });
  if(!(D.cauHinh.diaBan||[]).length) cay += '<div class="huong-dan">Chưa có danh mục địa bàn — khai ở ⚙ Cài đặt › Địa bàn.</div>';
  var hoi = dsHoiDoanThe();
  cay += '<div class="bhs-cay-dau" style="margin-top:8px">Hội</div>'+hoi.map(function(h){ return nut(h, {hoi:h}, ds.filter(function(b){ return b.hoi===h; }).length); }).join('')+'</div>';
  var h = '<div class="dau-tab"><button class="nut-them" onclick="taoBoHS()"><span class="cong">+</span> Tạo bộ hồ sơ</button></div>'+
    '<div class="bhs-khung">'+cay+'<div class="bhs-ds">'+
    '<div class="nhan-nhom">'+loc.length+' bộ'+(L.xa||L.hoi||L.chua?' · '+coChuHTML(L.chua?'chưa gắn địa bàn':[L.xa,L.diem,L.ap,L.to?'Tổ '+L.to:'',L.hoi].filter(Boolean).join(' › '))+' <span class="xoa-loc" onclick="BO.loc={};veGhiChu()">bỏ lọc</span>':'')+'</div>'+
    (loc.length ? loc.map(function(b){
      return '<div class="bhs-the" onclick="BO.mo=\''+b.id+'\';veGhiChu()">'+
        '<div class="bhs-the-dau"><span class="tg '+(b.loai==='Rủi ro'?'phu':'')+'">'+coChuHTML(b.loai||'')+'</span><b>'+coChuHTML(b.khach||b.ten)+'</b>'+
        (b.trangThai==='xong'?'<span class="tg xam">✓ Xong</span>':'')+'</div>'+
        '<small>'+coChuHTML(duongBo(b)||'chưa gắn địa bàn')+(b.hoi?' · '+coChuHTML(b.hoi):'')+' · '+(b.file||[]).length+' file · sửa '+ngayVN((b.suaLuc||'').slice(0,10))+'</small>'+
        (b.ghiChu ? '<div class="bhs-trich">'+coChuHTML(b.ghiChu.slice(0,140))+(b.ghiChu.length>140?'…':'')+'</div>' : '')+'</div>';
    }).join('') : '<div class="rong">'+((D.boHS||[]).length ? 'Không có bộ nào khớp.' : 'Chưa có bộ hồ sơ nào.<br>Bấm <b>+ Tạo bộ hồ sơ</b> — ví dụ "Rủi ro · Võ Văn Cường" rồi gom biên bản, giấy chứng tử, bản scan HĐ vào một chỗ.')+'</div>')+
    '</div></div>';
  return h;
}
/* ---- một bộ ---- */
function tenFileBo(f){
  var m = fileBoMuc(f);
  return m ? (m.tenMoi||m.ten||m.tenCu||'') : (f.ten||'(file không còn)');
}
function fileBoMuc(f){
  if(f.k==='scan') return timScan(f.id);
  if(f.k==='ka') return (D.kyAnh||[]).find(function(x){ return x.id===f.id; });
  if(f.k==='rieng') return null;
  return timMuc(f.id);
}
function veMotBo(b){
  var chon = function(id, ds, gtri, k){
    return '<select onchange="suaBoHS(\''+b.id+'\',\''+k+'\',this.value)"><option value="">— chọn —</option>'+
      ds.map(function(x){ return '<option'+(x===gtri?' selected':'')+'>'+coChuHTML(x)+'</option>'; }).join('')+'</select>';
  };
  var h = '<div class="dk-dau"><button class="nho" onclick="BO.mo=\'\';veGhiChu()">‹ Danh sách bộ</button><b>📁 '+coChuHTML(b.ten)+'</b>'+
      '<button class="nho" onclick="moHuongDan(\'ghiChu\')">❓</button></div>'+
    '<div class="bhs-o">'+
      '<label>Loại '+chon('', dsLoaiBo(), b.loai, 'loai')+'</label>'+
      '<label>Khách / vụ việc <input value="'+coChuHTML(b.khach||'')+'" onchange="suaBoHS(\''+b.id+'\',\'khach\',this.value.trim())"></label>'+
      '<label>Trạng thái <select onchange="suaBoHS(\''+b.id+'\',\'trangThai\',this.value)"><option value="dang"'+(b.trangThai!=='xong'?' selected':'')+'>Đang xử lý</option><option value="xong"'+(b.trangThai==='xong'?' selected':'')+'>Xong</option></select></label></div>'+
    '<div class="bhs-o"><label>Xã '+chon('', dsXa(), b.xa, 'xa')+'</label>'+
      '<label>Điểm GD '+chon('', b.xa?dsDiem(b.xa):[], b.diem, 'diem')+'</label>'+
      '<label>Ấp / KP '+chon('', b.xa?dsAp(b.xa, b.diem):[], b.ap, 'ap')+'</label>'+
      '<label>Tổ '+chon('', b.xa?dsTo(b.xa, b.diem, b.ap):[], b.to, 'to')+'</label>'+
      '<label>Hội '+chon('', dsHoiDoanThe(), b.hoi, 'hoi')+'</label></div>'+
    '<div class="bhs-duong">📍 '+coChuHTML(duongBo(b)||'Chưa gắn địa bàn')+(b.hoi?' · Hội '+coChuHTML(b.hoi):'')+'</div>'+
    '<div class="o"><label>Ghi chú tự do (tự lưu)</label><textarea class="bhs-ghi" rows="7" placeholder="Diễn biến, việc cần làm, số liệu, người liên hệ…" oninput="suaBoHS(\''+b.id+'\',\'ghiChu\',this.value)">'+coChuHTML(b.ghiChu||'')+'</textarea></div>'+
    '<div class="nhan-nhom">File trong bộ ('+(b.file||[]).length+') — bấm tên để xem thử</div>'+
    '<div class="hang-nut" style="margin:0 0 8px"><button class="nho chinh" onclick="moGanFileBo(\''+b.id+'\')">🔗 Gắn file có sẵn</button>'+
      '<button class="nho" onclick="themFileBo(\''+b.id+'\')">📎 Thêm file mới</button></div>'+
    ((b.file||[]).length ? (b.file||[]).map(function(f, i){
      var m = fileBoMuc(f), con = f.k==='rieng' || !!m;
      var ic = f.k==='scan' ? '🪪' : f.k==='ka' ? '✍' : f.k==='rieng' ? '📎' : '📄';
      var duong = f.k==='rieng' ? (f.driveId ? '☁ '+D.cauHinh.thumuc+' / Bộ hồ sơ / '+sachTen(b.ten) : '💻 Chỉ trong máy này (chưa lên Drive) · file riêng của bộ')
        : m ? duongThat(m, f.k==='ka'?'ka':'')+' · '+(f.k==='scan'?'tab Scan':f.k==='ka'?'Chữ ký·CCCD':'tab '+coChuHTML(TEN_PHAN[khoCuaMuc(m)]||'')) : 'File gốc đã bị xóa / đang ở thùng rác';
      return '<div class="dk-dong"><span>'+ic+'</span><div class="dk-ten" onclick="xemFileBo(\''+b.id+'\','+i+')"><b>'+coChuHTML(tenFileBo(f))+'</b><small>'+coChuHTML(duong)+'</small></div>'+
        '<button class="nho" onclick="goFileBo(\''+b.id+'\','+i+')" title="'+(f.k==='rieng'?'Bỏ file riêng này (vào thùng rác)':'Gỡ khỏi bộ — file gốc giữ nguyên')+'">✕</button></div>';
    }).join('') : '<div class="huong-dan">Chưa có file. Gắn file có sẵn (biên bản, bản scan HĐ lưu…) hoặc thêm file mới.</div>')+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho xau" onclick="xoaBoHS(\''+b.id+'\')">🗑 Xóa bộ</button></div>';
  return h;
}
function xemFileBo(bid, i){
  var b = timBo(bid), f = b && b.file[i]; if(!f) return;
  if(f.k==='rieng'){
    var m = {id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), driveId:f.driveId, co:f.co};
    var cp = document.getElementById('cotphai');
    if(cp && cp.offsetParent && !anPV){ mucDangXem = m; cp.classList.remove('pv-trong'); document.getElementById('cp-ten').textContent = f.ten;
      document.getElementById('cp-phu').textContent = f.driveId ? '☁ '+D.cauHinh.thumuc+' / Bộ hồ sơ / '+sachTen(b.ten) : '💻 Chỉ trong máy này'; veNutCN(null); veNoiDung(m, 'phai'); }
    else moXem(null, m);
    return;
  }
  xemThu(f.k==='scan'?'scan':f.k==='ka'?'ka':'muc', f.id);
}
function goFileBo(bid, i){
  var b = timBo(bid), f = b && b.file[i]; if(!f) return;
  var bo = function(){ b.file.splice(i, 1); b.suaLuc = new Date().toISOString(); luu(); veGhiChu(); };
  if(f.k!=='rieng'){ bo(); return baoHoanTac('Đã gỡ khỏi bộ — file gốc vẫn ở chỗ cũ.', function(){ b.file.splice(i, 0, f); luu(); veGhiChu(); }); }
  /* file riêng của bộ: theo quy tắc chung → vào thùng rác (ngăn Khác), khôi phục về tab Văn bản */
  var now = new Date().toISOString();
  D.rac = D.rac||[]; D.rac.push({id:f.id, tenCu:f.ten, tenMoi:f.ten, duoi:duoiFile(f.ten), co:f.co||0, driveId:f.driveId||'', driveCha:f.driveCha||'',
    nhom:'khac', khoCu:'vanBan', xoaLuc:now, suaLuc:now, lyDoXoa:'Bỏ khỏi bộ '+b.ten, choDB:!!f.driveId, ngay:now.slice(0,10), trichYeu:f.ten});
  bo(); capNhatDemRac(); if(DR.sanSang && DR.online) chayDongBoCho();
  baoHoanTac('Đã chuyển file vào thùng rác.', function(){ D.rac = D.rac.filter(function(x){ return x.id!==f.id; }); b.file.splice(i, 0, f); luu(); capNhatDemRac(); veGhiChu(); });
}
function xoaBoHS(id){
  xoaNhieuVaoRac([id], function(){ BO.mo = ''; veGhiChu(); });
}
/* ---- gắn file có sẵn ở mọi tab ---- */
var GAN = {bo:'', nk:'', tim:''};
/* 3.52: danh sách file đích của hộp Gắn file — một bộ hồ sơ hoặc một dòng ở Hôm nay */
function ganDich(){
  if(GAN.nk){ var m = ntTim(GAN.nk); if(!m) return null; m.dinh = m.dinh||[]; return m.dinh; }
  var b = timBo(GAN.bo); return b ? b.file : null;
}
function moGanFileBo(bid){
  var b = timBo(bid); if(!b) return;
  GAN = {bo:bid, nk:'', tim:b.khach||''};
  moHop('<div class="hop-tit">🔗 Gắn file có sẵn vào bộ</div>'+
    '<div class="hop-phu">Chỉ liên kết — file vẫn nằm ở tab của nó, không chép, không dời. Tìm theo tên khách, số hiệu, tên file.</div>'+
    '<div class="o"><input id="gan-tim" value="'+coChuHTML(GAN.tim)+'" placeholder="Gõ để tìm…" oninput="GAN.tim=this.value;veGanDS()"></div>'+
    '<div id="gan-ds" class="gan-ds"></div>'+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button><button class="nho chinh" onclick="xongGanFile()">Gắn các file đã tích</button></div>', true);
  veGanDS();
}
function dsGanDuoc(){
  var ra = [];
  D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]).forEach(function(m){ ra.push({k:'muc', id:m.id, ten:m.tenMoi||m.ten||m.tenCu||'', phu:TEN_PHAN[khoCuaMuc(m)]||'', tim:[m.tenMoi,m.tenCu,m.ten,m.soHieu,m.trichYeu,m.moTa].join(' ')}); });
  (D.scan||[]).forEach(function(k){ ra.push({k:'scan', id:k.id, ten:k.ten||'(bản quét)', phu:'Scan'+(k.xa?' · '+k.xa:''), tim:[k.ten,k.xa,k.ap,k.to].join(' ')}); });
  (D.kyAnh||[]).forEach(function(k){ ra.push({k:'ka', id:k.id, ten:k.ten, phu:'Chữ ký·CCCD', tim:[k.ten,k.khach].join(' ')}); });
  return ra;
}
function veGanDS(){
  var e = document.getElementById('gan-ds'); if(!e) return;
  var co = {}; (ganDich()||[]).forEach(function(f){ co[f.k+':'+f.id] = 1; });
  var q = boDau(GAN.tim||'').trim(), tu = q ? q.split(/\s+/) : [];
  var ds = dsGanDuoc().filter(function(x){ var t = boDau(x.tim); return tu.every(function(w){ return t.indexOf(w)>=0; }); }).slice(0, 80);
  e.innerHTML = ds.length ? ds.map(function(x){
    var da = co[x.k+':'+x.id];
    return '<label class="rac-dong"><input type="checkbox" class="gan-o" value="'+x.k+':'+x.id+'"'+(da?' checked disabled':'')+'>'+
      '<span class="rac-ten">'+coChuHTML(x.ten)+'<small>'+coChuHTML(x.phu)+(da?(GAN.nk?' · đã gắn':' · đã có trong bộ'):'')+'</small></span></label>';
  }).join('') : '<div class="huong-dan">Không thấy file nào khớp.</div>';
}
function xongGanFile(){
  if(GAN.nk){   /* 3.52: gắn vào dòng ở Hôm nay — giữ kèm tên để máy kia / file đã xóa vẫn biết là file gì */
    var dich = ganDich(), m = ntTim(GAN.nk), ten = {}, k = 0; if(!dich || !m) return;
    dsGanDuoc().forEach(function(x){ ten[x.k+':'+x.id] = x.ten; });
    Array.prototype.forEach.call(document.querySelectorAll('.gan-o:checked:not(:disabled)'), function(c){
      var p = c.value.split(':'); dich.push({k:p[0], id:p.slice(1).join(':'), ten:ten[c.value]||''}); k++;
    });
    m.suaLuc = new Date().toISOString(); luu(); henDongBoLich(); dongHop(); veLich();
    return bao(k ? 'Đã gắn '+k+' file vào dòng.' : 'Chưa tích file nào.', 3);
  }
  var b = timBo(GAN.bo); if(!b) return;
  var n = 0;
  Array.prototype.forEach.call(document.querySelectorAll('.gan-o:checked:not(:disabled)'), function(c){
    var p = c.value.split(':'); b.file.push({k:p[0], id:p.slice(1).join(':')}); n++;
  });
  b.suaLuc = new Date().toISOString(); luu(); dongHop(); veGhiChu();
  bao(n ? 'Đã gắn '+n+' file vào bộ.' : 'Chưa tích file nào.', 3);
}
/* ---- thêm file mới riêng của bộ: lưu trong máy + đưa lên Drive: Tủ hồ sơ / Bộ hồ sơ / <tên bộ> ---- */
function themFileBo(bid){
  var i = document.createElement('input'); i.type = 'file'; i.multiple = true;
  i.onchange = function(){
    var b = timBo(bid); if(!b || !i.files.length) return;
    var ds = Array.prototype.slice.call(i.files);
    Promise.all(ds.map(function(f){
      var id = 'bf'+idMoi();
      return luuFile(id, f).then(function(){ b.file.push({k:'rieng', id:id, ten:f.name, co:f.size, loai:f.type||'', themLuc:new Date().toISOString()}); });
    })).then(function(){
      b.suaLuc = new Date().toISOString(); luu(); veGhiChu();
      bao('Đã thêm '+ds.length+' file vào bộ.'+(coTheNoiDrive()?' Đang đưa lên Drive…':''), 4);
      dayFileBoCho();
    });
  };
  i.click();
}
function dayFileBoCho(){
  if(!coTheNoiDrive() || !(DR.sanSang && DR.online) || dayFileBoCho.dang) return Promise.resolve();
  var viec = [];
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.k==='rieng' && !f.driveId && !(f.may && f.may!==maMayCua())) viec.push([b, f]); }); });
  if(!viec.length) return Promise.resolve();
  dayFileBoCho.dang = true;
  return viec.reduce(function(p, x){
    return p.then(function(){
      var b = x[0], f = x[1], duong = D.cauHinh.thumuc+' / Bộ hồ sơ / '+sachTen(b.ten);
      return Promise.all([docFile(f.id), baoDamDuong(duong)]).then(function(r){
        var bl = r[0], idTM = r[1]; if(!bl) return;
        return dayBlobLenDrive(f.ten, f.loai, bl, idTM)
          .then(function(r2){ f.driveId = r2 && r2.id; f.driveCha = idTM; b.suaLuc = new Date().toISOString(); });
      }).catch(function(e){ console.warn('Chưa đưa file bộ lên Drive', f.ten, e); });
    });
  }, Promise.resolve()).then(function(){ dayFileBoCho.dang = false; luu(); if(nganHienTai===3) veGhiChu(); });
}
/* file nào đang nằm trong bộ nào — hiện ở khung xem */
function boCuaFileHTML(id){
  var ds = (D.boHS||[]).filter(function(b){ return (b.file||[]).some(function(f){ return f.id===id; }); });
  if(!ds.length) return '';
  return '<div class="lien-quan">📁 Thuộc bộ: '+ds.map(function(b){ return '<a class="lk" onclick="doiNgan(3);D.cauHinh.tvPhan=\'bo\';BO.mo=\''+b.id+'\';veGhiChu()">'+coChuHTML(b.ten)+'</a>'; }).join(', ')+'</div>';
}
