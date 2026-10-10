/* ---- danh mục địa bàn: Xã/phường → Điểm GD → Ấp/KP → Tổ ---- */
function dsXa(){
  return (D.cauHinh.diaBan||[]).map(function(x){ return x.xa; });
}
function dsDiem(xa){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  return x ? (x.diem||[]).map(function(d){ return d.ten; }) : [];
}
function ngayGD(xa, diem){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  if(!x) return '';
  var d = (x.diem||[]).find(function(z){ return z.ten===diem; });
  return d && d.ngay ? d.ngay : '';
}
function dsAp(xa, diem){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  if(!x) return [];
  var d = (x.diem||[]).find(function(z){ return z.ten===diem; });
  if(d) return (d.ap||[]).map(function(a){ return a.ten; });
  /* chưa chọn điểm thì gom hết ấp của xã */
  var ra = [];
  (x.diem||[]).forEach(function(z){ (z.ap||[]).forEach(function(a){ ra.push(a.ten); }); });
  return ra;
}
function dsTo(xa, diem, ap){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  if(!x) return [];
  var ra = [];
  (x.diem||[]).forEach(function(z){
    if(diem && z.ten!==diem) return;
    (z.ap||[]).forEach(function(a){
      if(ap && a.ten!==ap) return;
      (a.to||[]).forEach(function(t){
        var nhan = typeof t==='string' ? t : (t.ma+' — '+t.ten);
        if(ra.indexOf(nhan)<0) ra.push(nhan);
      });
    });
  });
  return ra;
}
function apToanPGD(){
  var ra = [];
  (D.cauHinh.diaBan||[]).forEach(function(x){
    (x.diem||[]).forEach(function(d){
      (d.ap||[]).forEach(function(a){ if(ra.indexOf(a.ten)<0) ra.push(a.ten); });
    });
  });
  return ra;
}
function diemCuaAp(xa, ap){
  var x = (D.cauHinh.diaBan||[]).find(function(y){ return y.xa===xa; });
  if(!x) return '';
  var ra = '';
  (x.diem||[]).forEach(function(z){
    (z.ap||[]).forEach(function(a){ if(a.ten===ap) ra = z.ten; });
  });
  return ra;
}

/* ---- 3.61: trạng thái & cách xem danh sách Scan ---- */
/* Đạt (anh chốt): tên khách (không phải tên tạm) + đủ 2 mặt (tài liệu ≥ 1 trang) + đủ Xã › Điểm › Ấp › Tổ + đã lên Drive đúng thư mục tổ */
function ttScan(k){
  var th = [];
  if(!k.ten || k.chuaKhai || /^Scan[\s_-]*\d/i.test(k.ten)) th.push('Tên tạm');
  if(k.che==='tailieu'){ if(!(k.trang||[]).length && !k.driveId) th.push('Chưa có trang'); }   /* 3.80.1: có PDF trên Drive thì không báo thiếu trang */
  else { if(!k.matTruoc) th.push('Thiếu mặt trước'); if(!k.matSau) th.push('Thiếu mặt sau'); }
  var thieu = [!k.xa&&'xã', !k.diem&&'điểm', !k.ap&&'ấp', !k.to&&'tổ'].filter(Boolean);
  if(thieu.length===4) th.push('Chưa khai địa bàn'); else if(thieu.length) th.push('Thiếu '+thieu.join(', '));
  if(!(k.driveId && !k.canDay && !k.chuaKhai)) th.push(k.dbLoi ? 'Lỗi lên Drive' : (k.may && k.may!==maMayCua() && !k.driveId ? 'Ở máy khác, chưa lên Drive' : 'Chưa lên Drive'));
  return {dat:!th.length, thieu:th};
}
function mocScan(k){ return String(k.gioQuet || k.taoLuc || k.suaLuc || ((k.ngay||'')+'T00:00')); }
function khoaNhomScan(k, nhom){
  var iso = mocScan(k).slice(0,10), hn = lcISO(nay());
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return {k:'?', nhan:'Không rõ ngày'};
  if(nhom==='thang') return {k:iso.slice(0,7), nhan:'Tháng '+(+iso.slice(5,7))+'/'+iso.slice(0,4)};
  if(nhom==='tuan'){
    var d = lcNgay(iso), t2 = lcCong(iso, -((d.getDay()+6)%7)), cn = lcCong(t2, 6);
    return {k:t2, nhan:'Tuần '+lcTuan(iso)+' ('+lcDM(t2)+' – '+lcDMY(cn)+')'};
  }
  var nhan = iso===hn ? 'Hôm nay · '+lcDMY(iso) : (iso===lcCong(hn,-1) ? 'Hôm qua · '+lcDMY(iso) : LC_THU[lcNgay(iso).getDay()]+' · '+lcDMY(iso));
  return {k:iso, nhan:nhan};
}
/* 3.61 (việc O, anh chốt): bấm một bản → xem ở khung bên phải trước (như PDF văn bản); cần chỉnh / lưu & gửi đủ thì ⛶ Mở lớn */
function xemScanCP(id){
  var k = timScan(id); if(!k) return;
  var cp = document.getElementById('cotphai');
  if(!(cp && cp.offsetParent && !anPV)) return moXemPDF([id]);
  xemThu('scan', id);
  var t = ttScan(k), e = document.getElementById('cp-phu');
  if(e) e.innerHTML = (t.dat ? '<b class="tt-dat">✓ Đạt</b>' : '<b class="tt-thieu">⚠ '+coChuHTML(t.thieu.join(' · '))+'</b>')+' · '+e.innerHTML;
  Array.prototype.forEach.call(document.querySelectorAll('#tr4 .sc-d.dang-xem'), function(x){ x.classList.remove('dang-xem'); });
  var d = document.querySelector('#tr4 .sc-d[onclick="xemScanCP(\''+id+'\')"]'); if(d) d.classList.add('dang-xem');
}
function laScanMuc(m){ return !!(m && (m.che || (D.scan||[]).indexOf(m)>=0)); }
function laKAMuc(m){ return !!(m && (D.kyAnh||[]).indexOf(m)>=0); }
function datXemScan(k, v){ D.cauHinh[k] = v; if(k==='scanXem' && v==='ds') HS.cay = null; luu(); veScan(); }
function khopCayScan(k, C){
  if(C.chua) return !k.xa;
  return (!C.xa || k.xa===C.xa) && (!C.diem || k.diem===C.diem) && (!C.ap || k.ap===C.ap) && (!C.to || String(k.to)===String(C.to));
}
function nhanCayScan(C){ return C.chua ? 'Chưa khai địa bàn' : [C.xa, C.diem, C.ap, C.to ? 'Tổ '+C.to : ''].filter(Boolean).join(' › '); }
function veCayScan(ds){
  var cay = {}, chua = [];
  ds.forEach(function(k){
    if(!k.xa){ chua.push(k); return; }
    var x = cay[k.xa] = cay[k.xa] || {ds:[], con:{}}; x.ds.push(k);
    var d = x.con[k.diem||'(chưa rõ điểm)'] = x.con[k.diem||'(chưa rõ điểm)'] || {ds:[], con:{}}; d.ds.push(k);
    var a = d.con[k.ap||'(chưa rõ ấp)'] = d.con[k.ap||'(chưa rõ ấp)'] || {ds:[], con:{}}; a.ds.push(k);
    var t = a.con[k.to||''] = a.con[k.to||''] || {ds:[]}; t.ds.push(k);
  });
  var C = HS.cay || {};
  var dem = function(ds){ var c = ds.filter(function(k){ return !ttScan(k).dat; }).length; return '<small>'+ds.length+(c ? ' · <b class="cd">'+c+' ⚠</b>' : '')+'</small>'; };
  var nut = function(nhan, loc, ds, bat){ return '<span class="cay-nut'+(bat?' bat':'')+'" onclick="event.preventDefault();event.stopPropagation();HS.cay='+coChuHTML(JSON.stringify(loc)).replace(/"/g,'&quot;')+';veScan()">'+coChuHTML(nhan)+' '+dem(ds)+'</span>'; };
  var h = '<div class="sc-cay">';
  Object.keys(cay).sort().forEach(function(xa){
    var X = cay[xa], moX = C.xa===xa;
    h += '<details'+(moX?' open':'')+'><summary>'+nut('🏘 '+xa, {xa:xa}, X.ds, moX && !C.diem)+'</summary>';
    Object.keys(X.con).sort().forEach(function(di){
      var Dd = X.con[di], moD = moX && C.diem===di;
      h += '<details class="c2"'+(moD?' open':'')+'><summary>'+nut('📍 '+di, {xa:xa, diem:di}, Dd.ds, moD && !C.ap)+'</summary>';
      Object.keys(Dd.con).sort().forEach(function(ap){
        var A = Dd.con[ap], moA = moD && C.ap===ap;
        h += '<details class="c3"'+(moA?' open':'')+'><summary>'+nut('🏡 '+ap, {xa:xa, diem:di, ap:ap}, A.ds, moA && !C.to)+'</summary><div class="c4">';
        Object.keys(A.con).sort(function(p,q){ return (parseInt(p,10)||0)-(parseInt(q,10)||0); }).forEach(function(to){
          h += nut(to ? '👥 Tổ '+to : '(chưa rõ tổ)', {xa:xa, diem:di, ap:ap, to:to}, A.con[to].ds, moA && C.to===to);
        });
        h += '</div></details>';
      });
      h += '</details>';
    });
    h += '</details>';
  });
  if(chua.length) h += '<div class="c1">'+nut('❔ Chưa khai địa bàn', {chua:1}, chua, !!C.chua)+'</div>';
  if(!Object.keys(cay).length && !chua.length) h += '<div class="huong-dan">Chưa có bản quét nào.</div>';
  return h+'</div>';
}
/* một bản = 2 dòng: ① ☐ · biểu tượng · tên · ấp · tổ ······ ngày [nút]  ② trạng thái · nơi lưu (bấm mở thư mục) · nhãn */
function dongScanHTML(k){
  var t = ttScan(k), chon = HS.chon[k.id];
  var dbNgan = [k.xa, k.diem, k.ap, k.to ? 'Tổ '+k.to : ''].filter(Boolean).join(' › ');
  var noi = '<span class="duong-dong" onclick="event.stopPropagation();moNoiLuu(\'scan\',\''+k.id+'\')" title="'+coChuHTML(duongThat(k,''))+' — bấm để mở thư mục">'+
    (k.driveId ? '☁ ' : '💻 ')+coChuHTML(dbNgan || (k.chuaKhai ? 'Hồ sơ scan › Chưa khai' : 'chưa gán địa bàn'))+'</span>';
  var nhan = (k.tag||[]).filter(function(x){ return !(x==='CCCD' && k.che!=='tailieu'); }).slice(0,2).map(function(x){ return '<span class="tg">'+coChuHTML(x)+'</span>'; }).join('')+
    (k.ctrinh||[]).slice(0,1).map(function(x){ return '<span class="tg ct">'+coChuHTML(x)+'</span>'; }).join('')+
    (k.che==='tailieu' ? '<span class="tg xam">'+((k.trang||[]).length || !k.driveId ? (k.trang||[]).length+' trang' : '☁ PDF trên Drive')+'</span>' : '');
  return '<div class="d2 sc-d'+(chon?' chon':'')+(mucDangXem&&mucDangXem.id===k.id?' dang-xem':'')+'"'+botAt(k.id)+' onclick="xemScanCP(\''+k.id+'\')"'+(k.ghi ? ' title="'+coChuHTML(k.ghi)+'"' : '')+'>'+
    '<div class="h1">'+
      '<span class="o-chon'+(chon?' bat':'')+'" onclick="event.stopPropagation();doiChonHS(\''+k.id+'\')" title="Tích để in chung nhiều người">'+(chon?'✓':'')+'</span>'+
      '<span class="ico">'+(k.che==='tailieu'?'📑':'🪪')+'</span>'+
      '<span class="ten">'+toSang(k.ten||'(chưa đặt tên)', tuKhoa)+'</span>'+
      '<span class="ty">'+coChuHTML([k.ap, k.to?('Tổ '+k.to):''].filter(Boolean).join(' · '))+'</span>'+
      '<span class="sc-ngay">'+ngayVN(mocScan(k).slice(0,10))+'</span>'+
      '<div class="nut">'+
        '<button onclick="event.stopPropagation();moHoSoTuScan(\''+k.id+'\')" title="Hồ sơ hộ 1 trang: CCCD, hồ sơ quét, món vay, lần làm việc">🏠</button>'+
        '<button onclick="event.stopPropagation();inGhep([\''+k.id+'\'])" title="In">🖨</button>'+
        '<button onclick="event.stopPropagation();themKhach(\''+k.id+'\')" title="Sửa / khai">✎</button>'+
        '</div></div>'+   /* 3.148 (anh chốt): bỏ 🗑 cuối dòng — xóa bằng nút 🗑 Xóa file chung đầu tab */
    '<div class="h2 sc-tt">'+(t.dat ? '<span class="tt-dat">✓ Đạt</span>' : '<span class="tt-thieu">⚠ '+coChuHTML(t.thieu.join(' · '))+'</span>')+
      '<span class="sc-sep">·</span>'+noi+nhan+'</div></div>';
}

/* ---- giao diện ngăn Hồ sơ ---- */
function datXa(v){ HS.locXa=v; HS.locAp=''; HS.locTo=''; veScan(); }
function datAp(v){ HS.locAp=v; HS.locTo=''; veScan(); }
function datTo(v){ HS.locTo=v; veScan(); }
function doiChonHS(id){
  if(HS.chon[id]) delete HS.chon[id]; else HS.chon[id]=1;
  veScan();
}
function boChonHS(){ HS.chon = {}; veScan(); }

/* ---- thêm / sửa một khách ---- */
function themKhach(id){
  var k = id ? HS.ds.find(function(x){ return x.id===id; })
             : {id:idMoi(), che:'the', ten:'', ngay:ngayISO(nay()),
                xa:D.cauHinh.hsXaCuoi||'', diem:D.cauHinh.hsDiemCuoi||'',
                ap:D.cauHinh.hsApCuoi||'', to:D.cauHinh.hsToCuoi||'', ghi:'',
                tag:['CCCD'], ctrinh:[], taoLuc:new Date().toISOString()};
  window.__k = k;



  if(k.che==='tailieu') return scanTaiLieu(id);
  /* 3.75 (AP): gọn 1 màn hình như hộp sửa văn bản — trái ô nhập, phải xem 2 mặt thẻ; phím Enter / Tab / ← → / ↑ ↓ */
  moHop('<div class="sua-trai">'+
    '<div class="hop-tit" title="Chụp hai mặt CCCD. App tự tìm thẻ, cắt sát, nắn thẳng, tự lật khi ngược và làm sáng màu cho rõ khi in. Ảnh không bị gửi đi đâu.">'+(id?'Sửa bản quét CCCD':'Quét thẻ CCCD')+'</div>'+
    '<div class="sg-hd" id="sg-hd"><span class="sg-goi">💡 Bấm vào ô để xem hướng dẫn và ví dụ</span></div>'+
    '<div class="sg-khoi">'+
      '<div class="o"><label>Họ và tên khách</label><input id="k-ten" value="'+coChuHTML(k.ten)+'" placeholder="Nguyễn Văn A" autocomplete="off"></div>'+
      '<div id="k-diaban" class="q-db">'+veDiaBan(k)+'</div>'+
      '<div class="o"><label>Ghi chú <small>(không bắt buộc)</small></label><input id="k-ghi" value="'+coChuHTML(k.ghi||'')+'" placeholder="Ví dụ: hồ sơ vay NS&VSMT" autocomplete="off"></div>'+
    '</div>'+
    '<div class="sg-khoi q-chup">'+
      '<div><span class="q-mat" id="nn-truoc">Mặt trước'+(k.matTruoc?' — đã có':'')+'</span>'+
        '<button class="nho sg-ico" onclick="chupThe(1,1)" title="Chụp mặt trước">📷 Chụp</button><button class="nho sg-ico" onclick="chupThe(1,0)" title="Chọn ảnh có sẵn (chọn 2 ảnh một lần: app tự nhận mặt trước, mặt sau)">🖼 Ảnh</button></div>'+
      '<div><span class="q-mat" id="nn-sau">Mặt sau'+(k.matSau?' — đã có':'')+'</span>'+
        '<button class="nho sg-ico" onclick="chupThe(0,1)" title="Chụp mặt sau">📷 Chụp</button><button class="nho sg-ico" onclick="chupThe(0,0)" title="Chọn ảnh có sẵn">🖼 Ảnh</button></div>'+
    '</div>'+
    '<div class="day-form">'+(id?'<span class="xoa-nho" onclick="xoaKhach(\''+id+'\')">🗑 Xóa hồ sơ</span>':'')+
      '<button class="nho" onclick="dongHop()">Đóng (Esc)</button>'+
      '<button class="nho chinh" onclick="luuKhach()">Lưu hồ sơ <small>Ctrl+Enter</small></button></div>'+
    '</div>'+
    '<div class="sua-xem q-xem"><div class="q-xem-tit">🪪 Bản quét · 2 mặt thẻ</div><div id="k-xem"></div></div>');
  quetGon('the');
  veAnhKhach();
}
/* 3.75 (AP): bố cục hộp sửa bản quét — dùng chung khung + phím của hộp sửa văn bản (sua-gon) */
function quetGon(kieu){
  var e = document.getElementById('hop-in'); if(!e) return;
  e.classList.add('sua-gon', 'co-xem-ben', 'quet-gon', kieu==='tl' ? 'q-tl' : 'q-the');
  setTimeout(sgMoDau, 30);
}
/* bốn ô địa bàn lọc tầng — chọn xã thì điểm/ấp/tổ lọc theo */
function veDiaBan(k){
  function oC(nhan, id, gtri, ds, hd, ham){
    var t = ds.slice();
    if(gtri && t.indexOf(gtri)<0) t.unshift(gtri);
    return '<div class="o"><label>'+nhan+'</label>'+
      '<select id="'+id+'" onchange="'+ham+'">'+
      '<option value="">— chọn —</option>'+
      t.map(function(x){ return '<option'+(gtri===x?' selected':'')+'>'+coChuHTML(x)+'</option>'; }).join('')+
      '<option value="__go">+ Gõ giá trị khác…</option></select>'+
      (gtri && ds.indexOf(gtri)<0 ? '<div class="huong-dan"><b>Giá trị anh tự gõ</b></div>' : '')+
      '<div class="huong-dan">'+hd+'</div></div>';
  }
  var xa = k.xa||'', diem = k.diem||'', ap = k.ap||'', to = k.to||'';
  if(ap && !diem) diem = diemCuaAp(xa, ap);
  return oC('Xã / phường','k-xa',xa, dsXa(),
      'Khai danh mục địa bàn trong Cài đặt để danh sách đầy đủ.','doiDB(1)') +
    oC('Điểm giao dịch','k-diem',diem, dsDiem(xa),
      'Chọn xã trước, danh sách điểm sẽ lọc theo.'+
      (ngayGD(xa,diem)?(' Ngày giao dịch: <b>'+ngayGD(xa,diem)+'</b> hằng tháng.'):''),
      'doiDB(2)') +
    oC('Ấp / khu phố','k-ap',ap, dsAp(xa, diem),
      'Lọc theo điểm giao dịch đang chọn.','doiDB(3)') +
    oC('Tổ TK&VV','k-to',to, dsTo(xa, diem, ap),
      'Lọc theo ấp / khu phố. Chưa khai tổ thì chọn “Gõ giá trị khác”.','doiDB(4)');
}
function doiDB(cap){
  var k = window.__k;
  function lay(id){
    var e = document.getElementById(id); if(!e) return '';
    if(e.value==='__go'){
      var v = prompt('Gõ giá trị:', '');
      e.value = v||''; return v||'';
    }
    return e.value;
  }
  k.xa = lay('k-xa');
  if(cap<=1){ k.diem=''; k.ap=''; k.to=''; }
  else k.diem = lay('k-diem');
  if(cap<=2){ k.ap=''; k.to=''; }
  else k.ap = lay('k-ap');
  if(cap<=3){ k.to=''; }
  else k.to = lay('k-to');
  var e = document.getElementById('k-diaban');
  var dang = document.activeElement && document.activeElement.id;   /* 3.75: vẽ lại vẫn giữ con trỏ ở ô đang chọn */
  if(e) e.innerHTML = veDiaBan(k);
  if(dang && /^k-(xa|diem|ap|to)$/.test(dang)){ var f = document.getElementById(dang); if(f) f.focus(); }
}

function capNhatNutThe(){
  var k = window.__k;
  var a = document.getElementById('nn-truoc'), b = document.getElementById('nn-sau');
  if(a) a.textContent = 'Mặt trước'+(k.matTruoc?' — đã có':'');
  if(b) b.textContent = 'Mặt sau'+(k.matSau?' — đã có':'');
}
function veAnhKhach(){
  var k = window.__k, e = document.getElementById('k-xem');
  if(!e) return;
  e.innerHTML = (k.matTruoc || k.matSau) ? '' : '<div class="rong">Chưa có ảnh thẻ.<br>Bấm <b>📷 Chụp</b> hoặc <b>🖼 Ảnh</b> ở bên trái.</div>';
  ['matTruoc','matSau'].forEach(function(mt){
    if(!k[mt]) return;
    var d = document.createElement('div');
    d.style.cssText = 'margin-bottom:8px';
    d.innerHTML = '<div class="huong-dan" style="margin:0 0 4px">'+
      (mt==='matTruoc'?'Mặt trước':'Mặt sau')+'</div>';
    var i = document.createElement('img');
    i.style.cssText = 'width:100%;border-radius:9px;border:1px solid var(--vien)';
    d.appendChild(i); e.appendChild(d);
    docAnhHS(k.id+'_'+mt).then(function(b){ if(b) i.src = URL.createObjectURL(b); });
  });
}
function chupThe(truoc, chup){
  /* giữ lại phần anh đã gõ, tránh mất khi quay lại từ màn chọn ảnh */
  var k0 = window.__k;
  if(k0 && document.getElementById('k-ten')){
    k0.ten = gt('k-ten'); k0.xa = gt('k-xa'); k0.diem = gt('k-diem');
    k0.ap = gt('k-ap'); k0.to = gt('k-to'); k0.ghi = gt('k-ghi');
    k0.ctrinh = layThe('k-ct'); k0.tag = layThe('k-tag');
  }
  var i = document.createElement('input');
  i.type='file'; i.accept='image/*';
  if(chup) i.capture='environment'; else i.multiple = true;
  i.onchange = function(){
    var fs = Array.prototype.slice.call(i.files);
    if(!fs.length) return;
    var k = window.__k;
    /* chọn 2 ảnh một lần: ảnh đầu mặt trước, ảnh sau mặt sau */
    var cap = fs.length>1 && !chup
      ? [{f:fs[0], mt:'matTruoc'}, {f:fs[1], mt:'matSau'}]
      : [{f:fs[0], mt: truoc?'matTruoc':'matSau'}];
    bao('Đang cắt, nắn và làm đẹp…', 3);
    /* 3.35: xử lý hết rồi mới ghi — chọn 2 ảnh mà app nhận ra mặt ngược thứ tự thì tự đổi chỗ */
    var kq = [];
    cap.reduce(function(p, x){
      return p.then(function(){ return chuanAnhCT(x.f, 'the').then(function(r){ kq.push({mt:x.mt, r:r}); }); });
    }, Promise.resolve()).then(function(){
      if(kq.length===2 && kq[0].r.mat==='sau' && kq[1].r.mat==='truoc'){ kq[0].mt = 'matSau'; kq[1].mt = 'matTruoc'; }
      return kq.reduce(function(p, y){
        return p.then(function(){ return luuAnhHS(k.id+'_'+y.mt, y.r.blob).then(function(){ k[y.mt] = true; }); });
      }, Promise.resolve());
    }).then(function(){
      /* KHÔNG vẽ lại cả hộp — vẽ lại sẽ làm mất những ô anh đang gõ dở */
      window.__k = k;
      capNhatNutThe(); veAnhKhach();
      bao('Đã lưu '+cap.length+' mặt thẻ.', 3);
    }).catch(function(e){
      console.warn(e);
      baoLoi('Không xử lý được ảnh: '+(e&&e.message||e));
    });
  };
  i.click();
}
function luuKhach(){
  var k = window.__k;
  k.ten = gt('k-ten'); k.xa = gt('k-xa'); k.diem = gt('k-diem');
  k.ap = gt('k-ap'); k.to = gt('k-to'); k.ghi = gt('k-ghi');
  if(!k.ten) return baoLoi('Chưa nhập tên khách.');
  /* 3.33: KHÔNG tự điền địa bàn của lần trước khi để trống (dễ gắn sai khách) — hộp khai đã điền sẵn lần trước,
     anh xóa trống là giữ trống. Chỉ suy điểm giao dịch từ ấp đã chọn (chắc chắn đúng). */
  if(!k.diem && k.xa && k.ap) k.diem = diemCuaAp(k.xa, k.ap) || '';
  delete k.chuaKhai; k.suaLuc = new Date().toISOString(); if(k.driveId) k.canDay = true;
  D.cauHinh.hsXaCuoi = k.xa; D.cauHinh.hsDiemCuoi = k.diem;
  D.cauHinh.hsApCuoi = k.ap; D.cauHinh.hsToCuoi = k.to;
  var i = HS.ds.findIndex(function(x){ return x.id===k.id; });
  if(i>=0) HS.ds[i] = k; else HS.ds.push(k);
  luuHoSo(); dongHop(); veScan();
  if(D.cauHinh.hsTuDrive!==false && k.matTruoc && coTheNoiDrive()){
    bao('Đã lưu. Đang đưa bản PDF lên Drive…', 4);
    dayScanNhieu([k.id]);
  }else{
    bao('Đã lưu hồ sơ '+k.ten+'.', 3);
  }
}
/* ảnh trong máy của bản scan / Chữ ký · CCCD (khi xóa hẳn) */
function xoaAnhMayCua(m){
  if(!m) return;
  if(m.khoCu==='homNay'){   /* 3.52: ảnh / file riêng của dòng ở Hôm nay — xóa trong máy và trên Drive */
    nkFileCuaRac(m).forEach(function(f){ if(f.k!=='rieng') return; xoaFile(f.id); xoaFile(f.id+'_nho');
      if(f.driveId && coTheNoiDrive()) xoaFileDrive(f.driveId).catch(function(){}); });
    return;
  }
  if(m.khoCu==='boHS'){   /* bộ hồ sơ: xóa hẳn cả file riêng của bộ (file gắn từ tab khác giữ nguyên) */
    (m.file||[]).forEach(function(f){ if(f.k!=='rieng') return; xoaFile(f.id); if(f.driveId && coTheNoiDrive()) xoaFileDrive(f.driveId).catch(function(){}); });
    return;
  }
  if(m.khoCu==='kyAnh' || (/^ka/.test(m.id||'') && m.loai)){ xoaFile('hs_'+m.id); return; }
  if(m.khoCu==='scan' || m.che){
    (m.trang||[]).forEach(function(t){ xoaFile('hs_'+(laTrangPDF(t) ? tachTrangPDF(t).nguon : t)); });
    xoaFile('hs_'+m.id+'_matTruoc'); xoaFile('hs_'+m.id+'_matSau');
  }
}
function xoaScanIm(id){
  HS.ds = (HS.mo && HS.ds) ? HS.ds : (D.scan || []);   /* 3.79.1: tab Scan chưa mở thì làm trên D.scan, không trên [] */
  var m = HS.ds.find(function(x){ return x.id===id; });
  if(m && m.trang) m.trang.forEach(function(t){ xoaFile('hs_'+(laTrangPDF(t) ? tachTrangPDF(t).nguon : t)); });
  HS.ds = HS.ds.filter(function(x){ return x.id!==id; });
  D.scan = HS.ds;
  /* 3.31: ghi dấu đã xóa để máy khác / chimuc.json cũ không đưa bản scan này quay lại */
  D.daXoaHan = D.daXoaHan || [];
  if(m && !D.daXoaHan.some(function(t){ return t.id===id; })) D.daXoaHan.push({id:id, driveId:'', luc:new Date().toISOString()});
  xoaFile('hs_'+id+'_matTruoc'); xoaFile('hs_'+id+'_matSau');
  if(HS.chon) delete HS.chon[id];
}
function xoaKhach(id){ xoaNhieuVaoRac([id], function(){ if(document.getElementById('hop').classList.contains('hien') && !document.querySelector('#hop-in .buoc')) dongHop(); }); }
function xemHS(id){
  var k = HS.ds.find(function(x){ return x.id===id; });
  if(!k) return;
  window.__k = k;
  var tl = k.che==='tailieu';
  moHop('<div class="hop-tit">'+coChuHTML(k.ten)+'</div>'+
    '<div class="hop-phu">'+coChuHTML([k.xa,k.diem,k.ap,k.to?('Tổ '+k.to):''].filter(Boolean).join(' · ')||'Chưa khai địa bàn')+
    (k.ghi?(' · '+coChuHTML(k.ghi)):'')+
    /* 3.33: cho biết bản PDF đang nằm đâu trên Drive */
    '<br><small>'+(k.driveId ? '☁ Trên Drive: '+coChuHTML(duongScan(k)) : 'Chưa lên Drive')+'</small></div>'+
    '<div id="k-xem"></div>'+
    '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho chinh" onclick="inGhep([\''+id+'\'])">'+(tl?'In':'In thẻ này')+'</button>'+
      '<button class="nho" onclick="luuTheRaMay([\''+id+'\'])">Lưu PDF</button>'+
      (k.driveId ? '<button class="nho" onclick="window.open(\'https://drive.google.com/file/d/'+k.driveId+'/view\',\'_blank\')">☁ Mở trên Drive</button>'+
                   '<button class="nho" onclick="lenDriveThe([\''+id+'\'])">Cập nhật Drive</button>'
                 : '<button class="nho" onclick="lenDriveThe([\''+id+'\'])">Lên Drive</button>')+
      '<button class="nho" onclick="'+(tl?'scanTaiLieu':'themKhach')+'(\''+id+'\')">Sửa</button>'+
      '<button class="nho" onclick="dongHop()">Đóng</button></div>');
  if(tl) veTrangXem(k); else veAnhKhach();
}
/* 3.33: xem các trang của bản Tài liệu (trước đây hộp xem trống vì chỉ hiện 2 mặt thẻ) */
function veTrangXem(k){
  var e = document.getElementById('k-xem'); if(!e) return;
  e.innerHTML = '';
  (k.trang||[]).forEach(function(idT, i){
    var d = document.createElement('div'); d.style.cssText = 'margin-bottom:8px';
    d.innerHTML = '<div class="huong-dan" style="margin:0 0 4px">Trang '+(i+1)+'/'+k.trang.length+(laTrangPDF(idT)?' · PDF':'')+'</div>';
    var im = document.createElement('img');
    im.style.cssText = 'width:100%;border-radius:9px;border:1px solid var(--vien)';
    d.appendChild(im); e.appendChild(d);
    anhTrangHS(idT, im);
  });
}

/* ---- IN GHÉP NHIỀU KHÁCH TRÊN MỘT TRANG A4 ---- */
function inGhep(dsId){ dungTrangThe(dsId, 'in'); }

/* dựng PDF A4 từ các trang đã quét ở chế độ Tài liệu */
function dungTaiLieu(ds, viec){
  if(!window.PDFLib){ if(viec==='blob') return Promise.reject(new Error('Chưa tải được bộ tạo PDF')); return baoLoi('Chưa tải được bộ tạo PDF.'); }
  if(viec==='drive') return dayScanNhieu(ds.map(function(k){ return k.id; }));   /* 3.33: mỗi bản một file đúng thư mục */
  batChay(true);
  /* 3.35: dùng chung bộ dựng — trang PDF gốc được chép nguyên trang, ảnh ngang ra trang ngang */
  var tatCa = []; ds.forEach(function(k){ (k.trang||[]).forEach(function(t){ tatCa.push(t); }); });
  return dungPDFTaiLieu(tatCa).then(function(bytes){
    tatChay();
    var bl = new Blob([bytes], {type:'application/pdf'});
    if(viec==='blob') return bl;
    var ten = (ds.length===1 ? sachTen(ds[0].ten||'Tai lieu') : 'Tai lieu quet')+
      ' '+ngayISO(nay())+'.pdf';
    if(viec==='in'){ inBlob(bl, ten); bao('Đã dựng '+pdf0(ds)+' trang A4.', 5); return; }
    var f = new File([bl], ten, {type:'application/pdf'});
    if(navigator.canShare && navigator.canShare({files:[f]}))
      navigator.share({files:[f], title:ten}).catch(function(){});
    else {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(bl); a.download = ten;
      document.body.appendChild(a); a.click(); a.remove();
      bao('Đã lưu '+ten, 6);
    }
  }).catch(function(e){
    tatChay(); console.warn(e);
    if(viec==='blob') throw e;
    baoLoi('Không dựng được: '+(e&&e.message||e));
  });
}
function pdf0(ds){
  return ds.reduce(function(a,k){ return a + (k.trang||[]).length; }, 0);
}
function lenDriveThe(dsId){ return dungTrangThe(dsId, 'drive'); }   /* 3.32: Drive của anh là nơi lưu bảo mật — không hỏi lại */

/* tên chuẩn và nơi lưu cho hồ sơ CCCD */
function tenTheCCCD(k){
  return 'CCCD_'+slug(k.ten,5)+
    (k.to?('_To-'+slug(k.to,2)):'')+
    (k.ap?('_'+slug(k.ap,3)):'')+'.pdf';
}
function duongTheCCCD(k){
  return [D.cauHinh.thumuc, 'CCCD', k.xa||'Chưa rõ xã',
          k.diem||'Chưa rõ điểm', k.ap||'Chưa rõ ấp',
          k.to?('Tổ '+k.to):'Chưa rõ tổ'].join(' / ');
}
function luuTheRaMay(dsId){ return dungTrangThe(dsId, 'luu'); }

function dungTrangThe(dsId, viec){
  var ids = dsId || Object.keys(HS.chon);
  if(!ids.length) return bao('Chưa chọn bản nào.', 3);
  if(viec==='drive') return dayScanNhieu(ids);   /* 3.33: mỗi hồ sơ một file, đúng thư mục xã/điểm/ấp/tổ */
  var tl = ids.map(function(id){ return HS.ds.find(function(x){ return x.id===id; }); })
    .filter(function(m){ return m && m.che==='tailieu'; });
  if(tl.length){
    /* 3.31: chọn lẫn Thẻ + Tài liệu — trước đây bản Thẻ bị bỏ qua không báo */
    if(tl.length < ids.length) setTimeout(function(){
      bao('Đang dựng '+tl.length+' bản Tài liệu. '+(ids.length-tl.length)+' bản Thẻ (CCCD) khác khổ giấy — chọn riêng rồi bấm lại.', 8); }, 400);
    return dungTaiLieu(tl, viec);
  }
  if(!window.PDFLib){ if(viec==='blob') return Promise.reject(new Error('Chưa tải được bộ tạo PDF')); return baoLoi('Chưa tải được bộ tạo PDF. Có mạng một lần rồi thử lại.'); }
  var ds = ids.map(function(id){
    return HS.ds.find(function(x){ return x.id===id; }); }).filter(Boolean);
  if(viec!=='blob') bao('Đang dựng trang cho '+ds.length+' khách…', 4);

  /* 3.35: dùng chung bộ dựng — 4 khách mỗi A4, trước | sau cạnh nhau, thẻ phóng to vừa trang, xếp từ trên xuống, tên khách dưới mỗi cặp */
  return dungPDFThe(ds.map(function(k){
    return {truoc:k.matTruoc ? k.id+'_matTruoc' : '', sau:k.matSau ? k.id+'_matSau' : '',
      nhan:boDau(k.ten).toUpperCase()+'   '+boDau([k.ap, k.to?('TO '+k.to):''].filter(Boolean).join(' - ')).toUpperCase()};
  }), 'NHCSXH - ban sao CCCD phuc vu ho so vay von - in ngay '+ngayVN(ngayISO(nay())))
  .then(function(bytes){
    var bl = new Blob([bytes], {type:'application/pdf'});
    if(viec==='blob') return bl;
    var mot = ds.length===1 ? ds[0] : null;
    var ten = mot ? tenTheCCCD(mot)
      : ('CCCD_'+(HS.locTo?('To-'+slug(HS.locTo,2)+'_'):'')+ngayISO(nay())+'.pdf');
    mucDangXem = null;
    if(viec==='in'){
      inBlob(bl, ten);
      bao('Đã dựng '+ds.length+' khách, 4 khách mỗi trang A4. '+NHAC_IN_THE, 9);
      return;
    }
    var f = new File([bl], ten, {type:'application/pdf'});
    if(navigator.canShare && navigator.canShare({files:[f]})){
      navigator.share({files:[f], title:ten}).catch(function(){});
      bao('Chọn “Lưu vào Tệp” để cất vào máy.', 6);
    }else{
      var a = document.createElement('a');
      a.href = URL.createObjectURL(bl); a.download = ten;
      document.body.appendChild(a); a.click(); a.remove();
      bao('Đã lưu '+ten+' vào thư mục Tải về.', 6);
    }
  }).catch(function(e){
    console.warn(e);
    if(viec==='blob') throw e;
    baoLoi('Không dựng được trang: '+(e&&e.message||e));
  });
}
/* ==========================================================
   3.33 — ĐƯA HỒ SƠ SCAN LÊN DRIVE
   - Mỗi hồ sơ một file PDF, đúng thư mục: Tủ hồ sơ/CCCD (thẻ) hoặc Tủ hồ sơ/Hồ sơ scan (tài liệu) / xã / điểm / ấp / tổ
   - Đã có trên Drive (driveId) thì CẬP NHẬT ĐÈ file cũ (không sinh file trùng); đổi địa bàn thì dời file theo
   - File Drive đã bị xóa tay (404) thì tải lên file mới
   ========================================================== */
function duongScan(k){
  /* 3.46: bản lưu tạm (chưa khai) cũng lên Drive cho an toàn — thư mục chờ theo tháng; khai đầy đủ thì app dời về đúng xã, ấp, tổ */
  if(k.chuaKhai) return [D.cauHinh.thumuc, 'Hồ sơ scan', 'Chưa khai', String(k.ngay||ngayISO(nay())).slice(0,7)].join(' / ');
  if(k.che!=='tailieu') return duongTheCCCD(k);
  return [D.cauHinh.thumuc, 'Hồ sơ scan', k.xa||'Chưa rõ xã', k.diem||'Chưa rõ điểm', k.ap||'Chưa rõ ấp',
          k.to?('Tổ '+k.to):'Chưa rõ tổ'].join(' / ');
}
function tenScanDrive(k){
  if(k.chuaKhai) return sachTen(k.ten||'Scan')+'.pdf';
  if(k.che!=='tailieu') return tenTheCCCD(k);
  return 'HS_'+slug(k.ten||'Tai-lieu',7)+(k.to?('_To-'+slug(k.to,2)):'')+(k.ap?('_'+slug(k.ap,3)):'')+'.pdf';
}
function taoPDFScan(k){ return k.che==='tailieu' ? dungTaiLieu([k], 'blob') : dungTrangThe([k.id], 'blob'); }
/* 3.47: ảnh của bản scan có nằm trong MÁY NÀY không (bản quét ở máy khác chỉ có dòng chỉ mục, không có ảnh) */
var CO_ANH = {};
function coAnhTrongMay(k){
  if(!k) return Promise.resolve(false);
  if(CO_ANH[k.id]===true) return Promise.resolve(true);
  var id = k.che==='tailieu' ? (function(t){ return t ? (laTrangPDF(t) ? tachTrangPDF(t).nguon : t) : ''; })((k.trang||[])[0])
                             : (k.matTruoc ? k.id+'_matTruoc' : '');
  if(!id) return Promise.resolve(false);
  return docFile('hs_'+id).then(function(b){ var co = !!(b && b.size); if(co) CO_ANH[k.id] = true; return co; }).catch(function(){ return false; });
}
/* tải file PDF đã lên Drive về (để máy không có ảnh vẫn xem / in / gửi được) */
function taiPDFDrive(driveId, kieu){
  return canToken().then(function(co){
    if(!co) throw new Error('Chưa nối Drive');
    return fetch('https://www.googleapis.com/drive/v3/files/'+driveId+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}});
  }).then(function(r){ if(!r.ok) throw new Error('Drive báo lỗi '+r.status); return r.blob(); })
    .then(function(b){ return new Blob([b], {type:kieu||'application/pdf'}); });
}
/* máy có ảnh → dựng PDF và gửi lên; máy KHÔNG có ảnh → chỉ đổi tên / dời thư mục file có sẵn (không ghi đè nội dung bằng bản trắng) */
function dayMotScan(k){
  return coAnhTrongMay(k).then(function(co){
    if(co) return taoPDFScan(k).then(function(bl){ return dayHoSoLenDrive(k, bl); }, function(e){
      if(k.driveId) return dayMetaScan(k);   /* 3.91: không dựng lại được PDF (ảnh thiếu / đã xóa) mà đã có file trên Drive → chỉ đổi tên / dời thư mục, không báo lỗi "không có trang" */
      throw e; });
    if(!k.driveId) throw new Error('ảnh nằm ở máy khác, chưa lên Drive');
    return dayMetaScan(k);
  });
}
function dayMetaScan(k){
  var duong = duongScan(k), ten = tenScanDrive(k);
  return baoDamDuong(duong).then(function(idTM){
    var u = 'https://www.googleapis.com/drive/v3/files/'+k.driveId+'?fields=id,parents'+
      (k.driveCha && k.driveCha!==idTM ? '&addParents='+idTM+'&removeParents='+k.driveCha : '');
    return goiDrive(u, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:ten})}).then(function(){
      k.driveCha = idTM; k.suaLuc = new Date().toISOString(); delete k.canDay; return ten;
    });
  });
}
function dayHoSoLenDrive(k, bl){
  var duong = duongScan(k), ten = tenScanDrive(k);
  return baoDamDuong(duong).then(function(idTM){
    var bien = '----tuhoso'+Date.now();
    var goiLen = function(moi){
      var meta = moi ? {name:ten, parents:[idTM]} : {name:ten};
      var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify(meta)+
        '\r\n--'+bien+'\r\nContent-Type: application/pdf\r\n\r\n';
      var body = new Blob([dau, bl, '\r\n--'+bien+'--'], {type:'multipart/related; boundary='+bien});
      var u = moi ? 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,parents'
                  : 'https://www.googleapis.com/upload/drive/v3/files/'+k.driveId+'?uploadType=multipart&fields=id,parents'+
                    (k.driveCha && k.driveCha!==idTM ? '&addParents='+idTM+'&removeParents='+k.driveCha : '');
      return goiDrive(u, {method:moi?'POST':'PATCH', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:body});
    };
    return (k.driveId ? goiLen(false).catch(function(e){
      if(/404/.test(e&&e.message||'')){ delete k.driveId; return goiLen(true); }   /* file cũ đã mất → tải mới */
      throw e;
    }) : goiLen(true)).then(function(r){
      k.driveId = (r && r.id) || k.driveId; k.driveCha = idTM; k.daLenDrive = true; k.driveLuc = k.suaLuc = new Date().toISOString(); delete k.canDay;
      return ten;
    });
  });
}
/* đưa lần lượt nhiều hồ sơ — mỗi bản một file */
function dayScanNhieu(ids){
  if(!coTheNoiDrive()) return Promise.resolve(baoLoi('Chưa nối Drive. Vào Cài đặt › Google Drive để nối.'));
  var ds = ids.map(function(id){ return (HS.ds||D.scan||[]).find(function(x){ return x.id===id; }); })
    .filter(function(k){ return k && ((k.che==='tailieu' ? (k.trang||[]).length : k.matTruoc) || k.driveId); });   /* 3.91: có PDF trên Drive → đổi tên / dời được */
  var boQua = ids.length - ds.length;
  if(!ds.length) return Promise.resolve(baoLoi('Chưa có bản nào đủ để đưa lên.'));
  batChay(true, 'Đang đưa '+ds.length+' hồ sơ lên Drive…');
  var xong = 0, loi = 0;
  return ds.reduce(function(p, k){
    return p.then(function(){
      dangLamChu('Đang đưa lên Drive '+(xong+loi+1)+'/'+ds.length+' · '+(k.ten||''));
      return dayMotScan(k)
        .then(function(){ xong++; delete k.canDay; }).catch(function(e){ loi++; console.warn('Không đưa lên được', k.ten, e); });
    });
  }, Promise.resolve()).then(function(){
    tatChay(); luuHoSo(); veScan(); ghiDongBo();
    bao('Đã lưu lên Drive '+xong+' hồ sơ'+(loi?' · lỗi '+loi:'')+(boQua?' · bỏ qua '+boQua+' bản chưa đủ':'')+'.', 6);
  });
}
