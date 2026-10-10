/* ---------- HỘP THOẠI CHUNG ---------- */
var hamDong = null, khoaHop = false;
function moHop(html, rong){
  nhapGiu();   /* 3.68 (AD): đang điền dở mà mở hộp khác (vd Sửa danh sách tag) → giữ nháp */
  if(!/cd-dau/.test(html)) document.getElementById('hop').classList.remove('trang');
  var e = document.getElementById('hop-in');
  e.classList.remove('co-xem-ben', 'sua-gon', 'quet-gon', 'q-the', 'q-tl', 'phim-chung', 'xem-rong');
  e.innerHTML = html;
  e.classList.toggle('rong', !!rong);
  document.getElementById('hop').classList.add('hien');
  ganNutEsc(e);
  ganGoiYNhap(e);
}
/* 3.61 (việc T, anh chốt): mỗi ô nhập có chữ mờ mẫu + 1 dòng hướng dẫn nhỏ hiện khi bấm vào ô */
var NGAY_GY = ['dd/mm/yyyy', 'Ngày / tháng / năm — gõ liền 15092026, app tự thêm dấu /'];
var GOI_Y_O = {
  's-so':   ['4339/NHCS-TDNN', 'Số / loại-cơ quan ban hành — gõ 4339nhcs tdnn app tự thành 4339/NHCS-TDNN. Ví dụ: 70/QĐ-HĐQT · 125/TB-NHCS'],
  's-ngay': NGAY_GY, 'lc-s-ngay': NGAY_GY, 'lc-doi': NGAY_GY, 'dt-ngay': NGAY_GY, 'bm-hl': NGAY_GY,
  's-ty':   ['Triển khai thực hiện Quyết định 70/QĐ-HĐQT', 'Viết như dòng V/v — không ghi chữ "V/v", không dấu chấm cuối. Phần này vào tên file'],
  's-tom':  ['vd: thành lập, củng cố Tổ; bình xét cho vay', 'Không bắt buộc, không cần chép lại tên — chỉ ghi thêm ý chính để tìm'],
  's-ky':   ['2026-08', 'Năm-tháng của số liệu: 2026-08 là tháng 8/2026'],
  's-mota': ['Ví dụ: Biên bản họp tổ 5 Ấp 3 ngày 02/10', 'Một dòng để sau này nhớ ra bối cảnh'],
  's-ghi':  ['Không bắt buộc', 'Chỉ lưu trong app, không đưa lên Drive'],
  'k-ten':  ['Nguyễn Văn A', 'Họ tên khách đầy đủ, có dấu — dùng đặt tên file'],
  'ka-ten': ['Nguyễn Văn A', 'Họ tên khách đầy đủ, có dấu — dùng đặt tên file'],
  'ka-ten2':['Nguyễn Văn A', 'Họ tên khách đầy đủ, có dấu — dùng đặt tên file'],
  'bhs-khach':['Võ Văn Cường', 'Tên khách hoặc tên vụ việc — tên bộ sẽ là "Loại · Tên"'],
  'bm-so':  ['01/TD', 'Số hiệu in trên mẫu. Ví dụ: 01/TD · 01/UQ · 02/CLT'],
  'bm-ten': ['Giấy đề nghị vay vốn', 'Tên in trên đầu mẫu, có dấu'],
  'lc-s-ten':['Họp giao ban tổ 5', 'Ngắn gọn, bắt đầu bằng việc cần làm']
};
function ganGoiYNhap(root){
  Object.keys(GOI_Y_O).forEach(function(id){
    var el = (root||document).querySelector('#'+id); if(!el || el.getAttribute('data-gy')) return;
    var g = GOI_Y_O[id]; el.setAttribute('data-gy', '1');
    if(!el.getAttribute('placeholder')) el.setAttribute('placeholder', g[0]);
    var d = document.createElement('div'); d.className = 'goi-y-o'; d.textContent = '💡 '+g[1];
    el.insertAdjacentElement('afterend', d);
  });
}
/* 3.61 (anh chốt, việc L): nút đóng của hộp ghi "Đóng (Esc)" / "Thôi (Esc)" — bấm Esc = bấm đúng nút đó.
   Màn có thanh bước (‹ Lùi): Esc = Lùi, chỉ gắn nhãn cho nút làm đúng việc của Lùi */
function ganNutEsc(e){
  if(!e) return;
  var lui = e.querySelector('.buoc .b-lui'), luiOn = lui ? (lui.getAttribute('onclick')||'') : null;
  var ung = Array.prototype.filter.call(e.querySelectorAll('button'), function(b){
    if(!/^(Đóng|Thôi|Xong|Đóng \(Esc\))$/.test(b.textContent.trim())) return false;
    return !lui || (b.getAttribute('onclick')||'')===luiOn;
  });
  if(!ung.length) return;
  var chon = ung.find(function(b){ return (b.getAttribute('onclick')||'')==='dongHop()'; }) || ung[0];
  chon.textContent = (chon.textContent.trim()==='Thôi' ? 'Thôi' : 'Đóng')+' (Esc)';
  chon.setAttribute('data-esc', '1');
}
function dongHop(){ nhapGiu(); khoaHop = false; document.getElementById('hop').classList.remove('hien'); }
/* 3.68 (việc AD, anh chốt): hộp có ô nhập KHÔNG đóng khi lỡ nhấp ra ngoài — chỉ đóng bằng Đóng / Thôi (Esc) hoặc Lưu.
   Hộp chỉ để xem / thông báo vẫn nhấp ra ngoài là đóng. */
function hopCoONhap(){
  var e = document.getElementById('hop-in'); if(!e) return false;
  return Array.prototype.some.call(e.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([readonly]),textarea:not([readonly]),select'), function(x){ return x.offsetParent!==null && !x.disabled; });
}
function bamNgoaiHop(){
  if(!hopCoONhap()) return dongHop();
  var n = document.querySelector('#hop-in [data-esc]') || document.querySelector('#hop-in .day-form button, #hop-in .hang-nut:last-child button');
  if(n){ n.classList.remove('nhay'); void n.offsetWidth; n.classList.add('nhay'); }
  bao('Đang điền — bấm Lưu, hoặc Đóng (Esc) để đóng (phần đang điền được giữ lại).', 3);
}
/* bản nháp: bấm Đóng / Esc khi đang điền → giữ nguyên hộp (cả ô, chip đã chọn); mở lại đúng hộp đó → còn nguyên. Lưu thì bỏ nháp.
   Chỉ giữ trong lần mở app này (không ghi vào máy). */
var NHAP = {}, HOP_NHAP = '';
function nhapDat(key){ HOP_NHAP = key; }
function nhapXong(){ if(HOP_NHAP) delete NHAP[HOP_NHAP]; HOP_NHAP = ''; }
function nhapGiu(){
  if(!HOP_NHAP) return;
  var e = document.getElementById('hop-in'), f = document.createDocumentFragment();
  if(e && e.firstChild){
    while(e.firstChild) f.appendChild(e.firstChild);
    NHAP[HOP_NHAP] = {f:f, cls:e.className, g:{sua:window.__sua, mds:mucDangSua, lq:LQ_SUA, lt:LOAI_TAY, cho:window.__tuChoKhai}};
  }
  HOP_NHAP = '';
}
function nhapMo(key){
  var n = NHAP[key]; if(!n) return false;
  nhapGiu();
  var e = document.getElementById('hop-in');
  e.innerHTML = ''; e.appendChild(n.f); e.className = n.cls;
  window.__sua = n.g.sua; mucDangSua = n.g.mds; LQ_SUA = n.g.lq; LOAI_TAY = n.g.lt; if(n.g.cho) window.__tuChoKhai = n.g.cho;
  document.getElementById('hop').classList.remove('trang');
  document.getElementById('hop').classList.add('hien');
  delete NHAP[key]; HOP_NHAP = key;
  bao('Mở lại phần đang điền dở.', 3);
  return true;
}
function hoi(tit, phu, nhanOK, ham){
  hamDong = ham; khoaHop = false;
  moHop('<div class="hop-tit">'+coChuHTML(tit)+'</div>'+
        '<div class="hop-phu">'+coChuHTML(phu)+'</div>'+
        '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
        '<button class="nho chinh" onclick="dongHop();hamDong&&hamDong()">'+
        coChuHTML(nhanOK)+'</button></div>');
}

/* ---------- SỬA MỘT MỤC ---------- */
function suaMuc(){
  if(!mucDangXem) return;
  if(laScanMuc(mucDangXem)) return mucDangXem.che==='tailieu' ? scanTaiLieu(mucDangXem.id) : themKhach(mucDangXem.id);   /* 3.61 */
  if(laKAMuc(mucDangXem)) return bao('Chữ ký · CCCD: mở 📁 Chữ ký · CCCD để đổi tên hoặc xóa.', 4);
  suaCho(mucDangXem.id);
}
/* 3.61: ⛶ ở khung xem — bản quét mở màn Lưu & gửi đầy đủ, file khác mở khung xem lớn */
function moLonCP(){
  var m = mucDangXem; if(!m) return;
  if(laScanMuc(m)) return moXemPDF([m.id]);
  if(laKAMuc(m)) return kaXong(m);
  if(timMuc(m.id)) return moXem(m.id);
  moXem(null, m);
}

/* ==========================================================
   PHÂN LOẠI 3 CẤP (bản 3.4): Mảng (1) · CT vay (1 hoặc Dùng chung) · Tag (nhiều)
   Một bộ duy nhất cho form khai, Bộ lọc, Cài đặt.
   ========================================================== */
function dsMang(){ return (D.cauHinh.nghiepVu||[]).slice(); }
function dsCTChon(){ return ['Dùng chung'].concat(D.cauHinh.chuongTrinh||[]); }
function ctTenDay(vt){
  if(vt==='Dùng chung') return 'Tất cả CT — áp dụng từ 2 chương trình trở lên hoặc tất cả';
  return (D.cauHinh.ctTen||{})[vt] || '';
}
/* đọc nội dung → gợi ý đúng 1 chương trình; khớp từ 2 trở lên thì Dùng chung */
function ctGoiY(chu){
  var ra = goiYThe(chu, tuKhoaCua('ct'), D.cauHinh.chuongTrinh||[]);
  if(!ra.length) return [];
  return ra.length===1 ? ra : ['Dùng chung'];
}
/* văn bản còn thiếu cấp nào — trả danh sách để hiện nhãn ⚠ */
function chuaPhanLoai(m){
  var t = [];
  if(!m.mang) t.push('Chưa có mảng');
  var ct = (m.nhom && m.huongDan!==undefined) ? m.nhom : (m.ctrinh||[])[0];
  if(!ct) t.push('Chưa có CT vay');
  if(m.huongDan===undefined && !(m.the||[]).length) t.push('Chưa có tag');
  return t;
}
/* đếm số lần dùng để xếp nút thường dùng lên trước */
function ghiDung(loai, gtri){
  if(!gtri) return;
  var d = D.cauHinh.demDung = D.cauHinh.demDung || {};
  d[loai] = d[loai] || {}; d[loai][gtri] = (d[loai][gtri]||0) + 1;
}
function xepTheoDung(loai, ds){
  var d = ((D.cauHinh.demDung||{})[loai])||{};
  return ds.map(function(x,i){ return {x:x, i:i}; })
    .sort(function(a,b){ return ((d[b.x]||0)-(d[a.x]||0)) || (a.i-b.i); })
    .map(function(o){ return o.x; });
}
/* ô chọn gọn: một hàng nút thường dùng, phần dư gom vào nút "+n ▾" */
function oChonGon(nhan, idO, ds, dangCo, mot, loaiDem, phuHTML){
  var xep = loaiDem ? xepTheoDung(loaiDem, ds) : ds.slice();
  /* mục đang chọn luôn đứng đầu để không bị ẩn */
  xep = xep.filter(function(x){ return dangCo.indexOf(x)>=0; })
    .concat(xep.filter(function(x){ return dangCo.indexOf(x)<0; }));
  return '<div class="o"><label>'+coChuHTML(nhan)+(mot?'':' — chọn được nhiều')+
    (loaiDem==='ct' ? ' <span class="ten-ct" id="'+idO+'-ten">'+coChuHTML(tenCTChon(dangCo[0]))+'</span>' : '')+'</label>'+
    '<div class="chip-gon'+(mot?' mot':'')+'" id="'+idO+'">'+
    xep.map(function(t){
      var day = loaiDem==='ct' ? ctTenDay(t) : '';
      return '<span class="the-loc'+(dangCo.indexOf(t)>=0?' bat':'')+'" data-v="'+coChuHTML(t)+'"'+
        (day?' title="'+coChuHTML(day)+'"':'')+
        ' onclick="bamChipGon(this,'+(mot?1:0)+')">'+coChuHTML(loaiDem==='ct' ? hienCT(t) : t)+
'</span>';
    }).join('')+
    '<span class="them-n" onclick="moChipGon(this)"></span></div>'+
    (phuHTML||'')+'</div>';
}
/* dòng nhỏ dưới hàng nút CT vay: "HN · Cho vay hộ nghèo" — chạy cả trên iPhone (không cần rê chuột) */
function tenCTChon(vt){ return vt ? hienCT(vt)+' · '+(ctTenDay(vt)||'chưa khai tên đầy đủ') : 'Chưa chọn chương trình vay'; }
function capNhatTenCT(idO){
  var e = document.getElementById(idO+'-ten'); if(!e) return;
  e.textContent = tenCTChon(layGon(idO)[0]);
}
function bamChipGon(el, mot){
  if(mot){
    var dang = el.classList.contains('bat');
    Array.prototype.forEach.call(el.parentNode.querySelectorAll('.the-loc'),
      function(x){ x.classList.remove('bat'); });
    if(!dang) el.classList.add('bat');
  }else el.classList.toggle('bat');
  capNhatTenCT(el.parentNode.id);
  if(el.parentNode.id==='s-ct' || el.parentNode.id==='s-mang') xemTenTruoc();
}
function moChipGon(el){
  var p = el.parentNode; p.classList.toggle('mo'); thuGonChip(p);
}
function thuGonChip(e){
  var cs = Array.prototype.slice.call(e.querySelectorAll('.the-loc'));
  var btn = e.querySelector('.them-n');
  cs.forEach(function(c){ c.style.display=''; });
  if(!btn || !cs.length) return;
  btn.style.display = 'none';
  if(window.innerWidth>=900) return;   /* máy tính: cột đủ rộng, hiện hết */
  if(e.classList.contains('mo')){ btn.style.display='inline-flex'; btn.textContent='Thu gọn ▴'; return; }
  var top = cs[0].offsetTop;
  var an = cs.filter(function(c){ return c.offsetTop>top+2; });
  if(!an.length) return;
  an.forEach(function(c){ c.style.display='none'; });
  btn.style.display='inline-flex';
  btn.textContent = '+'+an.length+' ▾';
  var hien = cs.filter(function(c){ return c.style.display!=='none'; });
  while(btn.offsetTop>top+2 && hien.length>1){
    var x = hien.pop(); x.style.display='none'; an.push(x);
    btn.textContent = '+'+an.length+' ▾';
  }
}
function thuGonTatCa(){
  Array.prototype.forEach.call(document.querySelectorAll('.chip-gon'), thuGonChip);
}
window.addEventListener('resize', function(){
  clearTimeout(window.__tgc); window.__tgc = setTimeout(thuGonTatCa, 150);
});
function layGon(id){
  var e = document.getElementById(id); if(!e) return [];
  if(e.tagName==='SELECT') return e.value ? [e.value] : [];   /* 3.69: Mảng / CT vay là ô chọn */
  return Array.prototype.slice.call(e.querySelectorAll('.the-loc.bat'))
    .map(function(x){ return x.getAttribute('data-v')||x.textContent; });
}
/* Loại văn bản tự gợi ý theo ký hiệu, trừ khi anh đã chọn tay */
var LOAI_TAY = false;
function goiYLoaiTuSo(){
  if(LOAI_TAY) return;
  var so = gt('s-so'), e = document.getElementById('s-loai');
  if(!e || so.indexOf('/')<0) return;
  var l = doanLoai('', so.split('/').slice(1).join('/'));
  if((D.cauHinh.loaiVB||[]).indexOf(l)>=0) e.value = l;
}
/* ---- quan hệ văn bản ---- */
/* 3.68 (việc AF, anh chốt): BỎ VAI TRÒ (độc lập / chính / sửa đổi / hướng dẫn) — mỗi văn bản chỉ có danh sách
   🔗 VĂN BẢN LIÊN QUAN (m.lienQuan = [id…]), liên kết 2 chiều, thêm bằng cách gõ số hiệu.
   Dòng thời gian chỉ gồm văn bản đó + các văn bản liên kết TRỰC TIẾP (không bắt cầu A–B–C). Giữ "Hết hiệu lực". */
function lqCua(m){ return (m && m.lienQuan || []).map(timMuc).filter(function(v){ return v && v.id!==m.id; }); }
function lqNoi(a, b, now){
  if(!a || !b || a.id===b.id) return false;
  var doi = false;
  [[a, b], [b, a]].forEach(function(x){ var ds = x[0].lienQuan = x[0].lienQuan || []; if(ds.indexOf(x[1].id)<0){ ds.push(x[1].id); x[0].suaLuc = now; doi = true; } });
  return doi;
}
function lqGo(a, b, now){
  [[a, b], [b, a]].forEach(function(x){ if(!x[0] || !x[1] || !x[0].lienQuan) return; var i = x[0].lienQuan.indexOf(x[1].id); if(i>=0){ x[0].lienQuan.splice(i, 1); x[0].suaLuc = now; } });
}
/* dữ liệu cũ: "sửa đổi / hướng dẫn cho" (goc) và "thay thế bởi" (thayBoi) → liên kết 2 chiều; bỏ vai trò. Chạy khi mở app và sau khi gộp từ máy khác. */
function chuyenLienQuan(){
  var now = new Date().toISOString(), n = 0;
  (D.vanBan||[]).concat(D.rac||[]).forEach(function(m){
    if(laBieuMau(m)) return;
    ['goc','thayBoi'].forEach(function(k){
      if(!m[k]) return;
      var v = timMuc(m[k]); if(!v) return;   /* văn bản kia chưa về máy (đang đồng bộ) → giữ, lần sau chuyển */
      lqNoi(m, v, now); delete m[k]; m.suaLuc = now; n++;
    });
    if(m.vaiTro!==undefined){ delete m.vaiTro; n++; }
  });
  return n;
}
/* 3.65 (việc AA): chọn văn bản bằng cách GÕ SỐ HIỆU — tìm trong mọi văn bản của app (mọi loại); app không tự đoán */
function oTimVB(id, nhan, gtri, boQua){
  var v = gtri && timMuc(gtri);
  return '<div class="o tvb"><label>'+nhan+'</label><div class="tvb-o"><input id="'+id+'-tim" autocomplete="off" placeholder="Gõ số hiệu, vd 70/QĐ" value="'+coChuHTML(v?tenNganVB(v):'')+'" '+
    'oninput="tvbGoi(\''+id+'\',\''+(boQua||'')+'\')" onfocus="tvbGoi(\''+id+'\',\''+(boQua||'')+'\')">'+
    '<button class="nho" type="button" title="Bỏ chọn" onclick="tvbChon(\''+id+'\',\'\')">✕</button></div>'+
    '<input type="hidden" id="'+id+'" value="'+coChuHTML(v?v.id:'')+'"><div class="tvb-ds" id="'+id+'-ds"></div></div>';
}
function tvbSo(t){ return boDau(String(t||'')).replace(/[^a-z0-9]/g,''); }
function tvbGoi(id, boQua){
  var e = document.getElementById(id+'-tim'), ds = document.getElementById(id+'-ds'); if(!e || !ds) return;
  var q = tvbSo(e.value), qc = boDau(e.value||'').trim();
  if(!q){ ds.innerHTML = ''; return; }
  var kq = D.vanBan.filter(function(v){ return v.id!==boQua && (tvbSo(v.soHieu).indexOf(q)>=0 || (qc.length>=3 && boDau(tenNganVB(v)).indexOf(qc)>=0)); })
    .sort(function(a,b){ var x = tvbSo(a.soHieu).indexOf(q)===0, y = tvbSo(b.soHieu).indexOf(q)===0; return (y-x) || (b.ngay||'').localeCompare(a.ngay||''); }).slice(0, 8);
  ds.innerHTML = kq.length ? kq.map(function(v, i){
    return '<div class="tvb-dong'+(i===0?' chon':'')+'" onmousedown="event.preventDefault();tvbChon(\''+id+'\',\''+v.id+'\')"><b>'+coChuHTML(v.soHieu||'(chưa có số)')+'</b> '+coChuHTML((v.tenVB||v.trichYeu||v.tenMoi||'').slice(0,80))+
      ' <small>'+ngayVN(v.ngay||'')+(v.hetHieuLuc?' · hết hiệu lực':'')+'</small></div>'; }).join('')
    : '<div class="tvb-dong rong-tvb">Không thấy văn bản số "'+coChuHTML(e.value)+'" trong app.</div>';
}
function tvbChon(id, vid){
  var h = document.getElementById(id), e = document.getElementById(id+'-tim'), ds = document.getElementById(id+'-ds');
  var v = vid && timMuc(vid);
  if(h) h.value = v ? v.id : ''; if(e) e.value = v ? tenNganVB(v) : ''; if(ds) ds.innerHTML = '';
  if(id==='s-lq' && v) lqThemSua(v);
}
/* hộp sửa: danh sách liên kết đang sửa (lưu khi bấm Lưu) */
var LQ_SUA = {id:'', ds:[]};
function lqSuaHTML(){
  var ds = LQ_SUA.ds.map(timMuc).filter(Boolean).sort(function(a, b){ return (a.ngay||'').localeCompare(b.ngay||''); });
  return ds.length ? ds.map(function(v){ return '<span class="lq-chip'+(v.hetHieuLuc?' het':'')+'" title="'+coChuHTML((v.soHieu?v.soHieu+' — ':'')+(v.tenVB||v.trichYeu||v.tenMoi||'')+(v.ngay?' · '+ngayVN(v.ngay):''))+'">'+coChuHTML(v.soHieu || tenNganVB(v).slice(0, 24))+   /* 3.80: chip chỉ số hiệu — rê chuột thấy tên + ngày */
    '<button type="button" tabindex="-1" title="Xem văn bản này ở khung bên cạnh (không đóng hộp)" onclick="lqXemBen(\''+v.id+'\')">↗</button>'+
    '<button type="button" tabindex="-1" title="Gỡ liên kết" onclick="lqBoSua(\''+v.id+'\')">✕</button></span>'; }).join('') : '';
}
/* 3.70 (AM): xem văn bản liên quan ở khung cạnh hộp sửa — hộp giữ nguyên */
function lqXemBen(vid){
  var v = timMuc(vid), x = document.querySelector('#hop-in .sua-xem'); if(!v) return;
  if(!x || !XEM.sua || !document.getElementById(XEM.sua.id)) return bao('Mở văn bản này sau khi Lưu / Đóng hộp: '+tenNganVB(v), 4);
  veVaoKhung(v, 'sua');
  var b = document.getElementById('sua-lq-bao');
  if(!b){ b = document.createElement('div'); b.id = 'sua-lq-bao'; b.className = 'sua-lq-bao'; x.insertBefore(b, x.firstChild.tagName==='SUMMARY' ? x.firstChild.nextSibling : x.firstChild); }
  b.innerHTML = 'Đang xem văn bản liên quan: <b>'+coChuHTML(tenNganVB(v))+'</b> <a class="lk" onclick="lqVeVBSua()">↩ Về văn bản đang sửa</a>';
  if(x.tagName==='DETAILS') x.open = true;
}
function lqVeVBSua(){ var b = document.getElementById('sua-lq-bao'); if(b) b.remove(); if(mucDangSua) veVaoKhung(mucDangSua, 'sua'); }
function lqVeSua(){ var e = document.getElementById('lq-ds'); if(e) e.innerHTML = lqSuaHTML(); }
function lqThemSua(v){
  if(LQ_SUA.ds.indexOf(v.id)<0) LQ_SUA.ds.push(v.id);
  var e = document.getElementById('s-lq-tim'); if(e){ e.value = ''; setTimeout(function(){ e.focus(); }, 0); } var h = document.getElementById('s-lq'); if(h) h.value = '';
  if(!layGon('s-mang').length) datChipTheo('s-mang', v.mang);   /* văn bản mới chưa phân loại → lấy Mảng + CT vay của văn bản liên quan (vẫn sửa được) */
  if(!layGon('s-ct').length) datChipTheo('s-ct', (v.ctrinh||[])[0]);
  lqVeSua();
}
function lqBoSua(vid){ LQ_SUA.ds = LQ_SUA.ds.filter(function(x){ return x!==vid; }); lqVeSua(); }
/* ==========================================================
   3.69 (việc AJ, anh chốt) — HỘP SỬA GỌN: ô chọn, Tag gợi ý, phím nhập nhanh, dòng 💡 hướng dẫn chung
   Enter / Tab: ô kế · Shift+Enter / Shift+Tab: ô trước · ↑ ↓: đổi lựa chọn tại ô / chọn gợi ý · Ctrl+Enter: Lưu
   ========================================================== */
/* "Dùng chung" (giá trị lưu, tên thư mục Drive giữ nguyên) → hiển thị "Tất cả CT" */
function hienCT(x){ return x==='Dùng chung' || /^Dùng chung cho mọi chương trình$/.test(x||'') ? 'Tất cả CT' : x; }
function sgChon(nhan, id, ds, gtri, trong, laCT){
  if(gtri && ds.indexOf(gtri)<0) ds = [gtri].concat(ds);
  return '<div class="o"><label>'+coChuHTML(nhan)+'</label><select id="'+id+'">'+
    '<option value="">'+coChuHTML(trong)+'</option>'+
    ds.map(function(x){ var day = laCT && x!=='Dùng chung' ? ctTenDay(x) : '';
      return '<option value="'+coChuHTML(x)+'"'+(x===gtri?' selected':'')+'>'+coChuHTML(laCT ? hienCT(x) : x)+(day?' — '+coChuHTML(day):'')+'</option>'; }).join('')+
    '</select></div>';
}
/* ---- Tag: chip + ô gõ; gợi ý theo nội dung + gần đây; ↓ xem cả danh sách (dùng nhiều trước, kèm số VB) ---- */
function tgChipHTML(t){
  return '<span class="the-loc bat sg-chip" data-v="'+coChuHTML(t)+'">'+coChuHTML(t)+
    '<button type="button" tabindex="-1" title="Gỡ tag" onclick="this.parentNode.remove();tgHd()">✕</button></span>';
}
function tgDem(){ var d = {}; D.vanBan.forEach(function(v){ (v.the||[]).forEach(function(t){ d[t] = (d[t]||0)+1; }); }); return d; }
function tgGoi(tatCa){
  var go = document.getElementById('s-tag-go'), ds = document.getElementById('s-tag-goi'); if(!go || !ds) return;
  var q = boDau(go.value.trim()), co = layGon('s-nv'), dem = tgDem();
  var tat = dsTag('vanBan').concat(Object.keys(dem)).filter(function(x, i, a){ return x && a.indexOf(x)===i && co.indexOf(x)<0; });
  if(!q && !tatCa){ ds.innerHTML = ''; return; }
  var kq = tat.filter(function(x){ return !q || boDau(x).indexOf(q)>=0; })
    .sort(function(a, b){ return ((dem[b]||0)-(dem[a]||0)) || a.localeCompare(b, 'vi'); });
  if(q) kq = kq.slice(0, 8);
  var moi = q && !tat.concat(co).some(function(x){ return boDau(x)===q; });
  var dong = function(v, nhan, i){ return '<div class="tvb-dong'+(i===0?' chon':'')+'" data-v="'+coChuHTML(v)+'" onmousedown="event.preventDefault();tgThem(this.getAttribute(\'data-v\'))">'+nhan+'</div>'; };
  ds.innerHTML = (!kq.length && !moi) ? '' :
    (!q ? '<div class="tvb-dong rong-tvb"><small>Tag đã có — dùng nhiều trước · ↑ ↓ chọn · gõ để lọc (không dấu cũng được)</small></div>' : '')+
    kq.map(function(x, i){ return dong(x, coChuHTML(x)+' <small>· '+(dem[x]||0)+' VB</small>', i); }).join('')+
    (moi ? dong(go.value.trim(), '＋ Tạo tag mới: <b>'+coChuHTML(go.value.trim())+'</b>', kq.length ? 1 : 0) : '');
}
function tgThem(t){
  t = String(t||'').trim(); var go = document.getElementById('s-tag-go'); if(!t || !go) return;
  if(layGon('s-nv').indexOf(t)<0) go.insertAdjacentHTML('beforebegin', tgChipHTML(t));
  go.value = ''; var ds = document.getElementById('s-tag-goi'); if(ds) ds.innerHTML = '';
  tgHd(); go.focus();
}
/* 3.72 (anh chốt): hộp còn chỗ → hiện sẵn MỌI tag dạng chip nhỏ; đang chọn xanh đứng đầu, rồi dùng nhiều; gợi ý theo nội dung viền xanh lá đứt */
function tgHangHTML(chon, chu){
  var dem = tgDem(), goi = goiYThe(chu||'', tuKhoaCua('tag'), dsTag('vanBan'));
  var tat = chon.concat(dsTag('vanBan'), Object.keys(dem)).filter(function(x, i, a){ return x && a.indexOf(x)===i; });
  tat.sort(function(a, b){ return ((chon.indexOf(b)>=0)-(chon.indexOf(a)>=0)) || ((goi.indexOf(b)>=0)-(goi.indexOf(a)>=0)) || ((dem[b]||0)-(dem[a]||0)) || a.localeCompare(b, 'vi'); });
  return tat.map(function(t){ return tgC(t, chon.indexOf(t)>=0, goi.indexOf(t)>=0, dem[t]||0); }).join('');
}
function tgC(t, bat, goi, so){
  return '<span class="the-loc tg-c'+(bat?' bat':'')+(goi && !bat?' goi':'')+'" data-v="'+coChuHTML(t)+'" title="'+(goi?'Gợi ý theo nội dung · ':'')+so+' văn bản đang dùng" '+
    'onclick="this.classList.toggle(\'bat\');this.classList.remove(\'goi\')">'+coChuHTML(t)+'</span>';
}
function tgLoc(){
  var go = document.getElementById('s-tag-go'); if(!go) return;
  var q = boDau(go.value.trim());
  Array.prototype.forEach.call(document.querySelectorAll('#s-nv .tg-c'), function(c){
    c.style.display = (!q || c.classList.contains('bat') || boDau(c.getAttribute('data-v')).indexOf(q)>=0) ? '' : 'none'; });
}
function tgEnter(){   /* Enter ở ô ＋: khớp đúng 1 chip → chọn; không khớp → tạo tag mới */
  var go = document.getElementById('s-tag-go'), t = go.value.trim(); if(!t) return false;
  var q = boDau(t), ds = Array.prototype.filter.call(document.querySelectorAll('#s-nv .tg-c'), function(c){ return !c.classList.contains('bat'); });
  var dung = ds.filter(function(c){ return boDau(c.getAttribute('data-v'))===q; })[0], gan = ds.filter(function(c){ return boDau(c.getAttribute('data-v')).indexOf(q)>=0; });
  var c = dung || (gan.length===1 ? gan[0] : null);
  if(c) c.classList.add('bat');
  else if(!Array.prototype.some.call(document.querySelectorAll('#s-nv .tg-c'), function(x){ return boDau(x.getAttribute('data-v'))===q; })) go.insertAdjacentHTML('beforebegin', tgC(t, true, false, 0));
  go.value = ''; tgLoc(); return true;
}
/* dòng 💡 khi đứng ở ô Tag: gợi ý bấm được (theo nội dung + gần đây) */
function tgGoiY(){
  var co = layGon('s-nv'), chu = [gt('s-ty'), gt('s-tom'), gt('s-so')].join(' ');
  return goiYThe(chu, tuKhoaCua('tag'), dsTag('vanBan')).concat(tagGanDay('vanBan'))
    .filter(function(x, i, a){ return x && a.indexOf(x)===i && co.indexOf(x)<0; }).slice(0, 5);
}
function tgHd(){
  var e = document.getElementById('sg-hd'); if(!e || !document.getElementById('s-tag-go')) return;
  var g = tgGoiY();
  e.innerHTML = '💡 <b>Tag</b> — '+(g.length ? 'gợi ý: '+g.map(function(t){ return '<button type="button" class="sg-goi-nhanh" data-v="'+coChuHTML(t)+'" onmousedown="event.preventDefault();tgThem(this.getAttribute(\'data-v\'))">＋ '+coChuHTML(t)+'</button>'; }).join(' ') : 'gõ vài chữ để tìm')+
    ' <span class="sg-vd">· <kbd>↓</kbd> xem cả '+dsTag('vanBan').length+' tag đã có · ô trống Enter sang ô kế</span>';
}
/* 3.72 (anh chốt): gõ số hiệu nhanh — 4336hd → 4336/HD, "nhcs tdnn" sau dấu / → NHCS-TDNN */
function soHieuGo(el){
  var v = el.value, cu = v, cuoi = el.selectionStart===cu.length;
  if(v.indexOf('/')<0) v = v.replace(/^(\d+)\s*([A-Za-zÀ-ỹĐđ])/, '$1/$2');
  var i = v.indexOf('/');
  if(i>=0) v = v.slice(0, i+1)+v.slice(i+1).replace(/\s+/g, '-').toUpperCase();
  if(v!==cu){ el.value = v; if(cuoi) el.setSelectionRange(v.length, v.length); }
}
function sgSuaDuong(){ var e = document.getElementById('s-duong'); if(!e) return; e.readOnly = false; e.focus(); e.select(); }
/* hướng dẫn từng ô — hiện ở 1 dòng 💡 dưới cùng (thay dòng dưới từng ô) */
var SG_HD = {
  's-loai':['Tự chọn theo số hiệu; đổi bằng ↑ ↓ hoặc gõ chữ đầu.','HD → Hướng dẫn · QĐ → Quyết định'],
  's-mang':['↑ ↓ để chọn, hoặc gõ chữ đầu để nhảy nhanh. Mảng hay dùng xếp trước.','Tổ TK&VV · Tín dụng'],
  's-ct':['↑ ↓ để chọn. "Tất cả CT" = áp dụng mọi chương trình (trước gọi Dùng chung).','HSSV — Cho vay HSSV có hoàn cảnh khó khăn'],
  's-het':['Hết hiệu lực thì dòng thời gian gạch ngang văn bản này.','Còn hiệu lực'],
  's-lq-tim':['Gõ số hiệu văn bản đã có trong tủ, ↑ ↓ chọn, Enter thêm. Liên kết 2 chiều.','70/QĐ → 70/QĐ-HĐQT'],
  's-tom':['Không bắt buộc, không cần chép lại tên — tên đã tìm được rồi. Chỉ ghi thêm ý chính bên trong văn bản.','thành lập, củng cố Tổ; bình xét cho vay'],
  's-ghi':['Chỉ lưu trong app, không đưa lên Drive.','Đã phổ biến ở giao ban tháng 10'],
  's-duong':['Sửa dòng này thì bấm Lưu sẽ dời file trên Drive theo.','Tủ hồ sơ / Văn bản / 2026'],
  /* 3.75: hộp sửa bản quét */
  'k-ten':['Họ tên đầy đủ, có dấu (bản CCCD) — hoặc tên tài liệu.','Nguyễn Văn A'],
  'k-xa':['↑ ↓ chọn xã. Chọn xã trước thì điểm / ấp / tổ mới lọc theo.','Thanh Phước'],
  'k-diem':['↑ ↓ chọn điểm giao dịch (lọc theo xã).',''],
  'k-ap':['↑ ↓ chọn ấp / khu phố (lọc theo điểm).',''],
  'k-to':['↑ ↓ chọn Tổ TK&VV.','05 — Nguyễn Văn A'],
  'k-ghi':['Không bắt buộc.','hồ sơ vay NS&VSMT']
};
/* 3.75 (AP — quy tắc phím chung): ô gốc của cây (cha) để trống thì không cho sang ô con */
var SG_CAY = {'k-xa':'Xã / phường', 'k-diem':'Điểm giao dịch', 'k-ap':'Ấp / khu phố'};
/* 3.72 (anh chốt): hướng dẫn + ví dụ hiện ngay trên ô đang gõ */
function sgBong(el){   /* 3.78: không dùng nữa (bong bóng nổi che ô) — giữ tên cho chỗ cũ gọi */
  var cu = document.getElementById('sg-bong'); if(cu) cu.remove(); return;
  var r = el && el.closest && el.closest('.sua-trai'); if(!r || !el.id) return;
  var g = SG_HD[el.id] || GOI_Y_O[el.id], nd = '';
  if(el.id==='s-tag-go'){ var gy = tgGoiY(); nd = 'Bấm chip để chọn / bỏ · gõ để lọc · Enter tạo tag mới'+(gy.length?' · <span class="sg-vd">gợi ý: '+gy.map(coChuHTML).join(', ')+'</span>':''); }
  else if(g) nd = coChuHTML(SG_HD[el.id] ? g[0] : (g[1]||g[0]))+(SG_HD[el.id] && g[1] ? ' · <span class="sg-vd">Ví dụ: '+coChuHTML(g[1])+'</span>' : (!SG_HD[el.id] && g[0] && !/Ví dụ|vd:/i.test(g[1]||'') ? ' · <span class="sg-vd">Mẫu: '+coChuHTML(g[0])+'</span>' : ''));
  if(!nd) return;
  var b = document.createElement('div'); b.id = 'sg-bong'; b.className = 'sg-bong'; b.innerHTML = '💡 '+nd;
  r.appendChild(b);
  var o = el.closest('.chip-o, .tg-hang') || el, ro = o.getBoundingClientRect(), rr = r.getBoundingClientRect();
  var trai = Math.max(4, Math.min(ro.left - rr.left, rr.width - b.offsetWidth - 6));
  b.style.left = trai+'px'; b.style.top = (ro.top - rr.top + r.scrollTop - b.offsetHeight - 6)+'px';
}
/* 3.78 (anh chốt): bỏ bong bóng nổi (che các ô phía trên) → hướng dẫn + ví dụ hiện ở DẢI CHIP XANH CỐ ĐỊNH đầu hộp (#sg-hd);
   dải giữ chỗ sẵn nên không xô lệch ô; phím tắt chữ nhỏ cuối dải */
function sgNoiDungHd(el){
  if(!el || !el.id) return '';
  if(el.id==='s-tag-go'){ var gy = tgGoiY(); return 'Bấm chip để chọn / bỏ · gõ để lọc · Enter tạo tag mới'+(gy.length?' · <span class="sg-vd">gợi ý: '+gy.map(coChuHTML).join(', ')+'</span>':''); }
  var g = SG_HD[el.id] || GOI_Y_O[el.id]; if(!g) return '';
  if(SG_HD[el.id]) return coChuHTML(g[0])+(g[1] ? ' · <span class="sg-vd">Ví dụ: '+coChuHTML(g[1])+'</span>' : '');
  return coChuHTML(g[1]||g[0])+(g[0] && !/Ví dụ|vd:/i.test(g[1]||'') && g[1] ? ' · <span class="sg-vd">Mẫu: '+coChuHTML(g[0])+'</span>' : '');
}
function sgHd(el){
  var cu = document.getElementById('sg-bong'); if(cu) cu.remove();
  var e = document.getElementById('sg-hd'); if(!e) return;
  if(!el || !el.id){ e.innerHTML = ''; return; }
  var lb0 = el.closest('.o') && el.closest('.o').querySelector('label'), ten0 = lb0 ? lb0.childNodes[0].textContent.trim() : '';
  var nd = sgNoiDungHd(el);
  e.innerHTML = '<span class="sg-goi">💡 <b>'+coChuHTML(ten0||'Ô đang gõ')+'</b>'+(nd ? ' — '+nd : '')+'</span>'+
    (nd ? '' : '<span class="sg-phim">⌨ Enter / Tab ô kế · Shift lùi'+(el.tagName==='SELECT' ? ' · ← → qua ô · ↑ ↓ chọn' : '')+' · Ctrl+Enter Lưu</span>');   /* 3.80: có hướng dẫn thì bỏ phím tắt cho đủ chỗ */
  return;
  var g = SG_HD[el.id] || GOI_Y_O[el.id], lb = el.closest('.o') && el.closest('.o').querySelector('label');
  var ten = lb ? lb.childNodes[0].textContent.trim() : '';
  e.innerHTML = g ? '💡 <b>'+coChuHTML(ten)+'</b> — '+coChuHTML(g[1]||g[0])+(SG_HD[el.id] && g[1] ? ' <span class="sg-vd">Ví dụ: '+coChuHTML(g[1])+'</span>' : '')
    : (ten ? '💡 <b>'+coChuHTML(ten)+'</b> <span class="sg-vd">· Enter sang ô kế · Shift+Enter ô trước · Ctrl+Enter Lưu</span>' : '');
  if(SG_HD[el.id]) e.innerHTML = '💡 <b>'+coChuHTML(ten)+'</b> — '+coChuHTML(SG_HD[el.id][0])+' <span class="sg-vd">Ví dụ: '+coChuHTML(SG_HD[el.id][1])+'</span>';
}
function sgO(t){   /* các ô nhập theo thứ tự gõ · 3.88: t trong cây chọn phạm vi (.pv-cay) thì lấy các ô của cây */
  var r = (t && t.closest && t.closest('.pv-cay')) || document.querySelector('#hop-in.sua-gon .sua-trai') || document.querySelector('#hop-in.sua-gon') || document.querySelector('#hop-in.phim-chung'); if(!r) return [];
  return Array.prototype.filter.call(r.querySelectorAll('input,select,textarea'), function(x){
    return x.type!=='hidden' && x.type!=='checkbox' && x.type!=='radio' && !x.readOnly && !x.disabled && x.offsetParent!==null; });
}
function sgSang(t, lui){
  var ds = sgO(t), i = ds.indexOf(t), j = i + (lui ? -1 : 1);
  if(i<0) return;
  if(!lui && SG_CAY[t.id] && !t.value){   /* 3.75: ô cha trống → báo, đứng lại */
    bao('Chưa có dữ liệu — chọn '+SG_CAY[t.id]+' trước rồi mới sang ô kế.', 3);
    t.classList.add('sg-thieu'); setTimeout(function(){ t.classList.remove('sg-thieu'); }, 1500);
    return;
  }
  if(j<0) return;
  if(j>=ds.length && t.closest && t.closest('.pv-cay')) return;   /* 3.88: ô cuối của cây chọn phạm vi */
  if(j>=ds.length){ var b = document.querySelector('#hop-in .day-form .chinh, #hop-in .hang-nut .chinh'); if(b) b.focus();
    var e = document.getElementById('sg-hd'); if(e) e.innerHTML = '✅ Đã tới ô cuối — <b>Enter</b> hoặc <b>Ctrl+Enter</b> để Lưu · Shift+Tab quay lại'; return; }
  ds[j].focus(); if(ds[j].select && ds[j].tagName==='INPUT') ds[j].select();
}
function sgMoDau(){   /* mở hộp: con trỏ ở ô đầu tiên còn trống (máy tính) */
  if(window.innerWidth<900 || !document.querySelector('#hop-in.sua-gon')) return;
  var ds = sgO(), o = ds.find(function(x){ return x.tagName==='INPUT' && !x.value && !/^(s-tag-go|s-lq-tim|s-ghi|k-ghi)$/.test(x.id); });
  if(o) o.focus();
}
function sgPhim(e){
  var t = e.target; if(!t || !t.closest || !t.closest('#hop-in.sua-gon, #hop-in.phim-chung, .pv-cay')) return;
  /* 3.84: hộp phim-chung (hồ sơ hộ, lần làm việc, lịch) — ô nhiều dòng giữ Enter để xuống dòng (Tab vẫn sang ô kế) */
  if(t.tagName==='TEXTAREA' && e.key==='Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey && !t.closest('#hop-in.sua-gon')) return;
  if(e.key==='Enter' && (e.ctrlKey||e.metaKey) && t.closest('#hop-in')){ e.preventDefault(); e.stopPropagation(); var b = document.querySelector('#hop-in .day-form .chinh, #hop-in .hang-nut .chinh'); if(b) b.click(); return; }
  if(e.shiftKey && (e.key==='Enter'||e.key==='Tab') && t.matches && t.matches('.day-form .chinh, .hang-nut .chinh')){   /* ở nút Lưu: lùi về ô cuối, không lưu */
    e.preventDefault(); e.stopPropagation(); var os = sgO(); if(os.length) os[os.length-1].focus(); return; }
  if(t.id==='s-tag-go' && e.key==='Enter' && !e.shiftKey && t.value.trim()){ e.preventDefault(); e.stopPropagation(); tgEnter(); return; }   /* 3.72 */
  var ds = t.id==='s-lq-tim' ? document.getElementById('s-lq-ds') : null;
  var mo = ds ? ds.querySelectorAll('.tvb-dong:not(.rong-tvb)') : [];
  if(ds && (e.key==='ArrowDown'||e.key==='ArrowUp')){
    if(!mo.length && e.key==='ArrowDown' && t.id==='s-tag-go'){ e.preventDefault(); tgGoi(true); return; }
    if(mo.length){ e.preventDefault();
      var i = Array.prototype.findIndex.call(mo, function(x){ return x.classList.contains('chon'); });
      i = (i + (e.key==='ArrowDown'?1:-1) + mo.length) % mo.length;
      Array.prototype.forEach.call(mo, function(x, k){ x.classList.toggle('chon', k===i); if(k===i && x.scrollIntoView) x.scrollIntoView({block:'nearest'}); });
      return; }
  }
  if(e.key==='Enter' && ds && !e.shiftKey && (t.value.trim() || mo.length)){
    e.preventDefault(); e.stopPropagation();
    var c = ds.querySelector('.tvb-dong.chon:not(.rong-tvb)') || mo[0];
    if(c && c.onmousedown) c.onmousedown({preventDefault:function(){}});
    else if(t.id==='s-tag-go') tgThem(t.value);
    else bao('Không thấy văn bản số "'+t.value+'" trong tủ.', 3);
    return;
  }
  if(t.tagName==='SELECT' && (e.key==='ArrowDown'||e.key==='ArrowUp') && !e.altKey){
    e.preventDefault(); var n = t.selectedIndex + (e.key==='ArrowDown'?1:-1);
    while(n>=0 && n<t.options.length && t.options[n].value==='__go') n += (e.key==='ArrowDown'?1:-1);   /* 3.75: lướt qua "+ Gõ giá trị khác…" */
    if(n>=0 && n<t.options.length){ t.selectedIndex = n; if(t.onchange) t.onchange(); }
    return;
  }
  /* 3.75 (AP — quy tắc phím chung): → ← tiến / lùi 1 ô — CHỈ ở ô chọn.
     3.76 (anh chốt): ô gõ chữ thì ← → chỉ di con trỏ trong ô, không nhảy ô (an toàn khi sửa chữ) */
  if((e.key==='ArrowRight'||e.key==='ArrowLeft') && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey &&
     t.tagName==='SELECT' && sgO(t).indexOf(t)>=0){
    e.preventDefault(); e.stopPropagation(); sgSang(t, e.key==='ArrowLeft');
    return;
  }
  if((e.key==='Enter' || e.key==='Tab') && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName) && sgO(t).indexOf(t)>=0){
    e.preventDefault(); e.stopPropagation(); sgSang(t, e.shiftKey);
  }
}
document.addEventListener('keydown', sgPhim, true);
document.addEventListener('focusout', function(e){ if(e.target && e.target.closest && e.target.closest('#hop-in.sua-gon')) setTimeout(function(){ var a = document.activeElement; if(!(a && a.closest && a.closest('#hop-in.sua-gon') && /^(INPUT|SELECT|TEXTAREA)$/.test(a.tagName))){ var b = document.getElementById('sg-bong'); if(b) b.remove(); } }, 0); });
document.addEventListener('focusin', function(e){
  var t = e.target; if(!t || !t.closest || !t.closest('#hop-in.sua-gon')) return;
  if(/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) sgHd(t);
  var k = t.closest('.sg-khoi'), kk = k ? k.getAttribute('data-k') : '';
  Array.prototype.forEach.call(document.querySelectorAll('#hop-in .sg-khoi'), function(x){ x.classList.toggle('dang', x===k); });
  var qua = true;
  Array.prototype.forEach.call(document.querySelectorAll('#sg-buoc span'), function(x){
    var bat = x.getAttribute('data-k')===kk; if(bat) qua = false;
    x.classList.toggle('bat', bat); x.classList.toggle('xong', qua && !bat && !!kk);
  });
});

function tenNganVB(v){
  return ((v.soHieu||'')+(v.soHieu?' — ':'')+(v.tenVB||v.trichYeu||v.tenMoi||'')).slice(0,70);
}
function datChipTheo(idO, gtri){
  var e = document.getElementById(idO); if(!e || !gtri) return;
  if(e.tagName==='SELECT'){ if([].some.call(e.options, function(o){ return o.value===gtri; })) e.value = gtri; return; }
  Array.prototype.forEach.call(e.querySelectorAll('.the-loc'), function(x){
    x.classList.toggle('bat', (x.getAttribute('data-v')||x.textContent)===gtri);
  });
  thuGonChip(e); capNhatTenCT(idO);
}
/* các liên kết của một văn bản — hiện ở khung xem
   3.68 (AF): 🕘 DÒNG THỜI GIAN = văn bản đang xem + các văn bản liên kết TRỰC TIẾP, xếp theo ngày ban hành;
   văn bản đang xem in đậm, hết hiệu lực gạch ngang; bấm dòng nào mở dòng đó. Không bắt cầu. */
function lienQuanHTML(m){
  if(!m || m.nhom!=='vanBan' && m.huongDan===undefined && !m.soHieu) return '';
  function ten(v){ return coChuHTML(tenNganVB(v)); }
  function lk(v){ return '<a class="lk" onclick="diToiVB(\''+v.id+'\')">'+ten(v)+'</a>'; }
  if(m.huongDan!==undefined){
    var vb = m.vbKem && timMuc(m.vbKem);
    return vb ? '<div class="lien-quan">Ban hành kèm: '+lk(vb)+'</div>' : '';
  }
  var h = '', mot = [];
  var truoc = XEM_LS.length && timMuc(XEM_LS[XEM_LS.length-1]);   /* 3.70 (AM) */
  if(truoc && truoc.id!==m.id) mot.push('<a class="lk lq-lui" onclick="quayLaiVB()" title="Quay lại văn bản vừa xem">‹ '+coChuHTML(truoc.soHieu || tenNganVB(truoc))+'</a>');
  var lq = lqCua(m);
  if(m.hetHieuLuc){
    var moi = lq.filter(function(v){ return !v.hetHieuLuc && (v.ngay||'') > (m.ngay||''); });
    h += '<div class="cl-dai">⛔ Văn bản này đã hết hiệu lực'+(moi.length ? ' — xem văn bản mới hơn: '+moi.map(lk).join(', ') : '')+'</div>';
  }
  /* 3.78 (anh chốt): bỏ khối "Dòng thời gian" (tốn chỗ) — văn bản liên quan thành 1 dòng chip số hiệu dưới tên, xếp theo ngày;
     rê chuột thấy ngày + tên đầy đủ, bấm là đi tới */
  if(lq.length) mot.push('🔗 '+lq.sort(function(a, b){ return (a.ngay||'').localeCompare(b.ngay||''); }).map(function(v){
    return '<a class="lk lq-c'+(v.hetHieuLuc?' het':'')+'" onclick="diToiVB(\''+v.id+'\')" title="'+coChuHTML((ngayVN(v.ngay||'')||'—')+' · '+tenNganVB(v)+(v.hetHieuLuc?' · hết hiệu lực':'')+' — bấm để đi tới')+'">'+
      coChuHTML(v.soHieu || tenNganVB(v).slice(0, 28))+'</a>'; }).join(''));
  if(mot.length) h += '<div class="lq-mot">'+mot.join('')+'</div>';
  var bm = (D.bieuMau||[]).filter(function(x){ return x.vbKem===m.id; });
  if(bm.length) h += '<div class="lien-quan">Biểu mẫu kèm: '+bm.map(function(b){
    return '<a class="lk" onclick="chonDong(\''+b.id+'\')">'+coChuHTML((b.soHieu?b.soHieu+' ':'')+(b.ten||''))+'</a>';
  }).join(' · ')+'</div>';
  return h;
}
/* đổi danh mục một lần sang bộ phân loại mới (dữ liệu cũ là thử nghiệm) */
function napPhanLoai(){
  var c = D.cauHinh;
  if(c.plPhienBan===2) return;
  c.nghiepVu = MAC_DINH.nghiepVu.slice();
  c.chuongTrinh = MAC_DINH.chuongTrinh.slice();
  c.ctTen = JSON.parse(JSON.stringify(MAC_DINH.ctTen));
  c.plPhienBan = 2;
  luu();
}

function khung(loai, tieuDe, noiDung){
  return noiDung ? '<div class="kh-form '+loai+'"><div class="kh-tit">'+tieuDe+'</div>'+noiDung+'</div>' : '';
}
function suaCho(id){
  var m = D.cho.find(function(c){ return c.id===id; }) || timMuc(id);
  if(!m) return;
  if(nhapMo('sua:'+id)){   /* 3.68 (AD) — 3.69: vừa chọn gợi ý 🔍 thì áp vào bản đang điền */
    if(GOI_Y_SUA && GOI_Y_SUA.id===id && GOI_Y_SUA.moi) apGoiYSua(id);
    return;
  }
  window.__sua = m; mucDangSua = m;
  if(window.__tuChoKhai && window.__tuChoKhai!==id) window.__tuChoKhai = null;
  var laCho = !!D.cho.find(function(c){ return c.id===id; });
  var nd = '', pl = '', qh = '', lt = '';   /* nhận dạng · phân loại · quan hệ · lưu trữ */

  if(m.nhom==='duLieu'){
    nd += o('Kỳ báo cáo','s-ky',m.ky||'','Dạng 2026-09');
    nd += '<div class="o"><label>Loại báo cáo</label><select id="s-loai" onchange="xemTenTruoc()">'+
      (D.cauHinh.mauBaoCao||[]).map(function(x){
        return '<option value="'+x.ma+'"'+(m.maLoai===x.ma?' selected':'')+'>'+coChuHTML(x.ten)+'</option>';
      }).join('')+
      '<option value="KHAC"'+(m.maLoai==='KHAC'?' selected':'')+'>Khác — chưa phân loại</option></select></div>';
    nd += o('Ghi thêm (không bắt buộc)','s-ghithem',m.ghiThem||'','Ví dụ: Truong-Mit');
    pl += '<div class="o"><label>Phạm vi</label><select id="s-pham">'+
      '<option value="">— chưa chọn —</option>'+
      dsPhamVi().map(function(x){
        return '<option'+(m.phamVi===x?' selected':'')+'>'+coChuHTML(x)+'</option>';
      }).join('')+'</select></div>';
    pl += theChon('Hội đoàn thể','s-hoi', dsHoiDoanThe(), m.hoi||[]);
  }else if(m.nhom==='ghiChu'){
    nd += oNgay('Ngày','s-ngay',m.ngay||'');
    nd += ta('Mô tả — một dòng để sau này nhớ ra bối cảnh','s-mota',m.moTa||'');
    pl += theChon('Nhãn','s-nhan',dsTag('ghiChu'),m.the||[]);   /* 3.39: một nguồn với hàng lọc Nhãn */
    qh += '<div class="o"><label>Gắn vào văn bản (không bắt buộc)</label><select id="s-goc">'+
      '<option value="">— không gắn —</option>'+
      D.vanBan.map(function(v){
        return '<option value="'+v.id+'"'+(m.gocVB===v.id?' selected':'')+'>'+coChuHTML(tenNganVB(v))+'</option>';
      }).join('')+'</select></div>';
  }else if(m.nhom==='khac'){
    nd += oNgay('Ngày','s-ngay',m.ngay||'');
    nd += ta('Tên tài liệu — vào tên file','s-ty',m.trichYeu||m.tenCu||'');
    qh += ta('Ghi chú riêng','s-ghi',m.ghiChu||'');
  }else{
    /* 3.69 (việc AJ, anh chốt): gọn 1 màn hình — ① Nhận dạng ② Phân loại ③ Liên quan & lưu; ô chọn thay dãy chip;
       Tag / Văn bản liên quan = chip + ô gõ chung 1 ô; trích yếu không chép lại tên */
    var loaiDS = D.cauHinh.loaiVB||[];
    nd += '<div class="sg-3">'+
      '<div class="o"><label>Số, ký hiệu</label><input id="s-so" autocomplete="off" value="'+coChuHTML(m.soHieu||'')+
        '" placeholder="4339/NHCS-TDNN" oninput="soHieuGo(this);goiYLoaiTuSo();xemTenTruoc()"></div>'+
      '<div class="o"><label>Ngày ban hành</label><input id="s-ngay" inputmode="numeric" autocomplete="off" '+
        'placeholder="25/09/2026" value="'+ngayVN(m.ngay||'')+'" oninput="gonNgay(this)"></div>'+
      '<div class="o"><label>Loại</label><select id="s-loai" onchange="LOAI_TAY=true;xemTenTruoc()">'+
        loaiDS.map(function(x){ return '<option'+(m.loai===x?' selected':'')+'>'+coChuHTML(x)+'</option>'; }).join('')+
      '</select></div></div>';
    nd += '<div id="canh-trung"></div>';
    nd += '<div class="o"><label>Tên văn bản <small>— vào tên file</small></label><input id="s-ty" autocomplete="off" value="'+
      coChuHTML(m.tenVB||m.trichYeu||'')+'" placeholder="Triển khai thực hiện Quyết định 70/QĐ-HĐQT" oninput="xemTenTruoc()"></div>';
    nd += '<div class="o"><label>Trích yếu <small>— không bắt buộc, chỉ ghi thêm ý chính để tìm (không lặp lại tên)</small></label>'+
      '<textarea id="s-tom" rows="1" placeholder="vd: thành lập, củng cố Tổ; bình xét cho vay">'+coChuHTML(m.tomTat||'')+'</textarea></div>';

    pl += '<div class="sg-3">'+
      sgChon('Mảng nghiệp vụ', 's-mang', xepTheoDung('mang', dsMang()), m.mang||'', '— chọn mảng —')+
      sgChon('Chương trình vay', 's-ct', xepTheoDung('ct', dsCTChon()), (m.ctrinh||[])[0]||'', '— chọn CT vay —', true)+
      '<div class="o"><label>Hiệu lực</label><select id="s-het"><option value="">Còn hiệu lực</option>'+
        '<option value="1"'+(m.hetHieuLuc?' selected':'')+'>Hết hiệu lực</option></select></div></div>';
    pl += '<div class="o"><label>Tag <small>— bấm chip để chọn / bỏ · ô ＋ gõ để lọc, Enter tạo tag mới · '+
        '<span class="nhan-lk" onclick="suaTagTab(\'vanBan\')">Sửa danh sách tag</span></small></label>'+
      '<div class="tg-hang" id="s-nv">'+tgHangHTML(m.the||[], [m.tenVB||m.trichYeu||'', m.tomTat||'', m.soHieu||''].join(' '))+
        '<input id="s-tag-go" autocomplete="off" placeholder="＋ tag / lọc" oninput="tgLoc()"></div></div>';

    LQ_SUA = {id:m.id, ds:lqCua(m).map(function(v){ return v.id; })};
    qh += '<div class="sg-2"><div class="o"><label>🔗 Văn bản liên quan <small>— gõ số hiệu, Enter thêm</small></label>'+   /* 3.80: liên quan + ghi chú chung 1 hàng */
      '<div class="chip-o tvb" id="lq-o"><span class="lq-ds" id="lq-ds">'+lqSuaHTML()+'</span>'+
        '<input id="s-lq-tim" autocomplete="off" placeholder="vd: 70/QĐ" oninput="tvbGoi(\'s-lq\',\''+m.id+'\')" onfocus="tvbGoi(\'s-lq\',\''+m.id+'\')" '+
          'onblur="setTimeout(function(){ var d = document.getElementById(\'s-lq-ds\'); if(d) d.innerHTML = \'\'; }, 150)">'+
        '<input type="hidden" id="s-lq"><div class="tvb-ds" id="s-lq-ds"></div></div></div>';
    qh += '<div class="o"><label>Ghi chú riêng <small>— chỉ trong app</small></label>'+
      '<input id="s-ghi" autocomplete="off" value="'+coChuHTML(m.ghiChu||'')+'" placeholder="vd: Đã phổ biến ở giao ban tháng 10"></div></div>';
  }

  var duongHT = thuMucCua(m);   /* 3.69: 1 dòng, đủ 5 nút; ✎ mới cho sửa */
  lt += '<div class="sg-luu"><span>📁</span><input id="s-duong" readonly value="'+coChuHTML(duongHT)+'" data-dau="'+coChuHTML(duongHT)+'" '+
      'title="Đổi năm, đổi nhóm hoặc sửa dòng này thì bấm Lưu sẽ dời file trên Drive theo">'+
    '<button class="nho sg-ico" type="button" onclick="sgSuaDuong()" title="Sửa nơi lưu trên Drive">✎</button>'+
    '<button class="nho" type="button" onclick="traDuongMacDinh(\''+id+'\')" title="Trả về nơi lưu mặc định">Mặc định</button>'+
    '<button class="nho sg-ico" type="button" onclick="chepDuongMay(gt(\'s-duong\'))" title="Chép đường dẫn ổ G — dán vào Explorer">📂</button>'+
    '<button class="nho sg-ico" type="button" onclick="moThuMucMuc(\''+id+'\')" title="Mở thư mục trên Drive web">☁</button>'+
    (m.driveId?'<button class="nho sg-ico" type="button" onclick="moTrenDrive(\''+id+'\')" title="Mở file trên Drive">↗</button>':'')+
    '</div>';

  var nhomHTML = '<div class="co-chu nhom-gon" id="s-nhom" title="Xếp vào nhóm">'+
    ['vanBan','duLieu','ghiChu','khac'].map(function(k){
      return '<button'+((m.nhom||'vanBan')===k?' class="bat"':'')+
             ' onclick="doiNhom(\''+id+'\',\''+k+'\')">'+TEN_NHOM[k]+'</button>';
    }).join('')+'</div>';
  var laVB = !m.nhom || m.nhom==='vanBan';
  var than = laVB
    ? '<div class="sg-buoc" id="sg-buoc"><span data-k="nd">① Nhận dạng</span><span data-k="pl">② Phân loại</span><span data-k="qh">③ Liên quan &amp; lưu</span></div>'+
      '<div class="kh-form k-nd sg-khoi" data-k="nd">'+nd+'</div>'+
      '<div class="kh-form k-pl sg-khoi" data-k="pl">'+pl+'</div>'+
      '<div class="kh-form k-qh sg-khoi" data-k="qh">'+qh+lt+'</div>'
    : '<div class="cot2"><div class="cot-a">'+khung('k-nd','Nhận dạng', nd)+khung('k-qh','Quan hệ, hiệu lực & ghi chú', qh)+'</div>'+
      '<div class="cot-b">'+khung('k-pl','Phân loại', pl)+khung('k-lt','Lưu trữ', lt)+'</div></div>';
  var h = '<div class="sg-dau"><div class="sg-ten">'+
      '<div><span class="ic">Tên cũ</span><i>'+coChuHTML(m.tenCu||'—')+'</i><small id="ten-dai">'+
        [m.co?kichCo(m.co):'', m.soTrang?m.soTrang+' trang':'', m.driveId?'☁ trên Drive':'chưa có trên Drive', m.choDB?'đang chờ cập nhật Drive':''].filter(Boolean).join(' · ')+'</small></div>'+
      '<div><span class="ic">Tên mới</span><b id="ten-truoc">'+coChuHTML(m.tenMoi||'')+'</b></div></div>'+
      ((m.nhom==='vanBan' && !laCho) ? saoSuaHTML(m, true) : '')+
      (coTheDocLai(m) ? '<button class="nho sg-ico" type="button" onclick="docLaiGoiY(\''+id+'\', true)" title="Đọc lại &amp; gợi ý tên — đọc chữ trang 1 (lớp chữ của PDF, hoặc OCR nếu là PDF chụp / ảnh) để gợi ý số hiệu, ngày, tên văn bản">🔍</button>' : '')+
    '</div>'+
    '<div class="dau-nhom sg-nhom"><span>Nhóm</span>'+nhomHTML+'</div>'+
    '<div class="sg-hd" id="sg-hd"><span class="sg-goi">💡 Bấm vào ô để xem hướng dẫn · <span class="sg-vd">⌨ Enter / Tab ô kế · Shift lùi · Ctrl+Enter Lưu · Esc đóng</span></span></div>'+
    than+
    '<div class="day-form">'+
      (laCho?'':'<a class="xoa-nho" onclick="xoaMuc(\''+id+'\')">Xóa khỏi tủ</a>')+
      '<button class="nho" onclick="dongHop()">Thôi</button>'+
      '<button class="nho chinh" onclick="luuSua(\''+id+'\')">Lưu <small>(Ctrl+Enter)</small></button></div>';
  moHop(h, true); nhapDat('sua:'+id);
  document.getElementById('hop-in').classList.add('sua-gon');   /* 3.69 (AJ) */
  ganXemBen(m);   /* 3.61 (việc R): văn bản hiện ngay cạnh để nhìn mà chuẩn hóa tên */
  LOAI_TAY = !!(m.loai && m.soHieu && m.loai!==doanLoai('', (m.soHieu||'').split('/').slice(1).join('/')));
  setTimeout(function(){ thuGonTatCa(); apGoiYSua(id); xemTenTruoc(); sgMoDau(); }, 0);
}
/* 3.61 (việc R, anh chốt): hộp sửa / so sánh chia đôi — trái là ô nhập, phải là văn bản (lật trang, phóng to).
   Điện thoại: văn bản ở trên, thu gọn được. */
function ganXemBen(m){
  var e = document.getElementById('hop-in'); if(!e || !m) return;
  var trai = document.createElement('div'); trai.className = 'sua-trai';
  while(e.firstChild) trai.appendChild(e.firstChild);
  var hep = window.innerWidth < 900;
  var xem = document.createElement(hep ? 'details' : 'div'); xem.className = 'sua-xem';
  xem.innerHTML = (hep ? '<summary>📄 Xem văn bản</summary>' : '')+'<div class="dk" id="sua-dk"></div><div class="than-p" id="sua-than"></div>';
  if(hep){ xem.open = true; e.appendChild(xem); e.appendChild(trai); }
  else { e.appendChild(trai); e.appendChild(xem); }
  e.classList.add('co-xem-ben');
  veVaoKhung(m, 'sua');
}
function doiNhom(id, k){
  var m = D.cho.find(function(c){ return c.id===id; }) || timMuc(id);
  if(!m || m.nhom===k) return;
  chuyenNhom(m, k);
  doiNhomVe(id, k);
}
/* giữ lại những gì đang có, chỉ đổi nhóm và tính lại tên */
function chuyenNhom(m, k){
  m.nhom = k;
  delete m.duongTuy;
  if(k==='duLieu'){
    if(!m.ky) m.ky = (m.ngay||ngayISO(nay())).slice(0,7);
    if(!m.maLoai){ m.maLoai = 'KHAC'; m.tenLoai = 'Khác'; }
    m.tenMoi = tenDuLieu(m, m.duoi);
  }else if(k==='ghiChu'){
    if(!m.moTa) m.moTa = m.trichYeu||'';
    m.tenMoi = tenGhiChu(m, m.duoi);
  }else if(k==='khac'){
    m.tenMoi = tenKhac(m, m.duoi);
  }else{
    if(!m.loai) m.loai = 'Công văn';
    if(!m.trichYeu) m.trichYeu = m.moTa||(m.tenCu||'').replace(/\.[^.]+$/,'');
    m.tenMoi = tenVanBan(m, m.duoi);
  }
}
function doiNhomVe(id, k){
  luu(); suaCho(id);
}
function traDuongMacDinh(id){
  var m = D.cho.find(function(c){ return c.id===id; }) || timMuc(id);
  if(!m) return;
  delete m.duongTuy;
  var e = document.getElementById('s-duong');
  if(e) e.value = thuMucCua(m);
  bao('Đã trả về nơi lưu mặc định.', 3);
}

/* ngày hiển thị dd/mm/yyyy, lưu lại yyyy-mm-dd */
function ngayVNo(iso){
  if(!iso) return '';
  var p = String(iso).split('-');
  return p.length===3 ? p[2]+'/'+p[1]+'/'+p[0] : iso;
}
function ngayISOo(vn){
  if(!vn) return '';
  var t = String(vn).replace(/[^\d]/g,'');
  if(t.length===8) return t.slice(4)+'-'+t.slice(2,4)+'-'+t.slice(0,2);
  var p = String(vn).split(/[\/.-]/);
  if(p.length===3){
    if(p[0].length===4) return p[0]+'-'+hai(+p[1])+'-'+hai(+p[2]);
    return p[2]+'-'+hai(+p[1])+'-'+hai(+p[0]);
  }
  return '';
}

function goNgay(e){
  var v = e.value.replace(/[^\d]/g,'').slice(0,8);
  if(v.length>4) e.value = v.slice(0,2)+'/'+v.slice(2,4)+'/'+v.slice(4);
  else if(v.length>2) e.value = v.slice(0,2)+'/'+v.slice(2);
  else e.value = v;
}
function homNay(id){
  var e = document.getElementById(id);
  if(e){ e.value = ngayVN(ngayISO(nay())); xemTenTruoc(); }
}
/* đổi dd/mm/yyyy về yyyy-mm-dd */
function ngayISOtu(v){
  if(!v) return '';
  var m = v.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
  if(m) return m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  if(/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  return '';
}
/* ô ngày: anh gõ dd/mm/yyyy, app lưu ngược yyyy-mm-dd để sắp đúng thời gian */
function oNgay(nhan, id, gtri){
  return '<div class="o"><label>'+coChuHTML(nhan)+'</label>'+
    '<div style="display:flex;gap:7px">'+
    '<input id="'+id+'" style="flex:1" inputmode="numeric" placeholder="dd/mm/yyyy" '+
    'value="'+ngayVN(gtri)+'" oninput="gonNgay(this)">'+
    '<button class="nho" style="flex:0 0 auto;max-width:90px" '+
    'onclick="document.getElementById(\''+id+'\').value=ngayVN(ngayISO(nay()))">Hôm nay</button>'+
    '</div><div class="huong-dan">Gõ liền cũng được: 20092026 tự thành 20/09/2026</div></div>';
}
function gonNgay(el){
  var v = el.value.replace(/[^0-9\/]/g,'');
  var so = v.replace(/\//g,'');
  if(so.length>8) so = so.slice(0,8);
  if(so.length>4) v = so.slice(0,2)+'/'+so.slice(2,4)+'/'+so.slice(4);
  else if(so.length>2) v = so.slice(0,2)+'/'+so.slice(2);
  else v = so;
  el.value = v;
  if(typeof xemTenTruoc==='function') xemTenTruoc();
}
/* đổi dd/mm/yyyy anh gõ thành yyyy-mm-dd để lưu */
function ngayVao(t){
  t = (t||'').trim();
  var m = t.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
  if(m) return m[3]+'-'+hai(+m[2])+'-'+hai(+m[1]);
  if(/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  return '';
}
function themLoaiVB(){
  var v = prompt('Tên loại văn bản mới:','');
  if(!v) return;
  v = v.trim();
  D.cauHinh.loaiVB = D.cauHinh.loaiVB||[];
  if(D.cauHinh.loaiVB.indexOf(v)<0) D.cauHinh.loaiVB.push(v);
  luu();
  var e = document.getElementById('s-loai');
  if(e){
    var op = document.createElement('option');
    op.textContent = v; e.appendChild(op); e.value = v;
  }
  bao('Đã thêm loại "'+v+'".', 3);
}

function o(nhan,id,gt,hd){
  return '<div class="o"><label>'+coChuHTML(nhan)+'</label>'+
    '<input id="'+id+'" value="'+coChuHTML(gt)+'" oninput="xemTenTruoc()">'+
    (hd?'<div class="huong-dan">'+coChuHTML(hd)+'</div>':'')+'</div>';
}
function ta(nhan,id,gt){
  return '<div class="o">'+(nhan?'<label>'+coChuHTML(nhan)+'</label>':'')+
    '<textarea id="'+id+'" oninput="xemTenTruoc()">'+coChuHTML(gt)+'</textarea></div>';
}
function theChon(nhan,id,ds,dangCo){
  return '<div class="o"><label>'+coChuHTML(nhan)+' — chọn được nhiều</label>'+
    '<div class="goi-y" id="'+id+'">'+ds.map(function(t){
      return '<span class="the-loc'+(dangCo.indexOf(t)>=0?' bat':'')+
             '" onclick="this.classList.toggle(\'bat\')">'+coChuHTML(t)+'</span>';
    }).join('')+'</div></div>';
}
function layThe(id){
  var e = document.getElementById(id); if(!e) return [];
  return Array.prototype.slice.call(e.querySelectorAll('.the-loc.bat'))
    .map(function(x){ return x.getAttribute('data-v') || x.textContent; });
}
function gt(id){ var e = document.getElementById(id); return e ? e.value.trim() : ''; }

/* ghép sẵn tên file, cập nhật ngay khi anh gõ */
var mucDangSua = null;
function xemTenTruoc(){
  var m = mucDangSua;
  if(!m) return;
  var tam = {};
  for(var k in m) tam[k] = m[k];
  if(document.getElementById('s-so')) tam.soHieu = gt('s-so');
  if(document.getElementById('s-ngay')) tam.ngay = ngayVao(gt('s-ngay')) || tam.ngay;
  if(document.getElementById('s-loai')) tam.loai = gt('s-loai');
  if(document.getElementById('s-ty')) tam.trichYeu = gt('s-ty');
  if(document.getElementById('s-ky')) tam.ky = gt('s-ky');
  if(document.getElementById('s-ghithem')) tam.ghiThem = gt('s-ghithem');
  var t = tam.nhom==='duLieu' ? tenDuLieu(tam, tam.duoi)
        : tam.nhom==='ghiChu' ? tenGhiChu(tam, tam.duoi)
        : tam.nhom==='khac'   ? tenKhac(tam, tam.duoi)
        : tenVanBan(tam, tam.duoi);
  var e = document.getElementById('ten-truoc');
  if(e) e.textContent = t;
  var dd = document.getElementById('ten-dai');
  if(dd && t.length>90) dd.textContent = t.length+' ký tự — hơi dài, viết gọn tên văn bản lại';
  /* cảnh báo trùng số văn bản */
  var c = document.getElementById('canh-trung');
  if(c){
    var so = (tam.soHieu||'').trim();
    var tr = so ? D.vanBan.filter(function(v){
      return v.id!==m.id && (v.soHieu||'').trim()===so; }) : [];
    c.innerHTML = tr.length
      ? '<div class="trung">Số văn bản này đã có trong tủ: <b>'+
        coChuHTML(tr[0].trichYeu||tr[0].tenMoi||'')+'</b>. Kiểm lại kẻo lưu trùng.</div>'
      : '';
  }
}
function giuTenGoc(id){
  var m = D.cho.find(function(c){ return c.id===id; }) || timMuc(id);
  if(!m) return;
  m.giuTen = true;
  m.tenMoi = m.tenCu;
  var e = document.getElementById('ten-truoc');
  if(e) e.textContent = m.tenCu;
  bao('Giữ nguyên tên gốc. App chỉ ghi vào chỉ mục.', 4);
}

function luuSua(id){
  var m = D.cho.find(function(c){ return c.id===id; }) || timMuc(id);
  if(!m) return;
  if(m.nhom==='duLieu'){
    m.ky = gt('s-ky'); m.maLoai = gt('s-loai'); m.ghiThem = gt('s-ghithem');
    m.phamVi = gt('s-pham'); m.hoi = layThe('s-hoi');
    var mau = (D.cauHinh.mauBaoCao||[]).find(function(x){ return x.ma===m.maLoai; });
    m.tenLoai = mau ? mau.ten : 'Khác';
    m.tenMoi = tenDuLieu(m, m.duoi);
  }else if(m.nhom==='ghiChu'){
    m.ngay = ngayISOo(gt('s-ngay')) || m.ngay;
    m.moTa = gt('s-mota');
    m.the = layThe('s-nhan'); m.gocVB = gt('s-goc');
    m.tenMoi = tenGhiChu(m, m.duoi);
  }else if(m.nhom==='khac'){
    m.ngay = ngayISOo(gt('s-ngay')) || m.ngay;
    m.trichYeu = gt('s-ty'); m.ghiChu = gt('s-ghi');
    m.tenMoi = tenKhac(m, m.duoi);
  }else{
    var hetCu = !!m.hetHieuLuc;
    m.soHieu = gt('s-so');
    m.ngay = ngayISOo(gt('s-ngay')) || m.ngay;
    m.loai = gt('s-loai');
    m.tenVB = chuanTenVB(gt('s-ty'), gt('s-loai'));   /* phần vào tên file · 3.65: chữ đầu sau tên loại viết thường */
    m.trichYeu = m.tenVB;              /* giữ tương thích: thẻ, tìm kiếm, tên file cũ */
    m.tomTat = gt('s-tom');            /* trích yếu đầy đủ — chỉ để tìm */
    m.mang = layGon('s-mang')[0] || '';
    m.ctrinh = layGon('s-ct').slice(0,1);
    m.the = layGon('s-nv');
    var dsT = dsTag('vanBan'); m.the.forEach(function(t){ if(dsT.indexOf(t)<0) dsT.push(t); });   /* 3.69: "＋ Tạo tag mới" */
    m.ghiChu = gt('s-ghi');
    m.hetHieuLuc = !!gt('s-het');
    if(LQ_SUA.id===m.id){   /* 3.68 (AF): ghi liên kết 2 chiều — thêm mới, gỡ cái đã bỏ */
      var nowLQ = new Date().toISOString(), cuLQ = (m.lienQuan||[]).slice();
      LQ_SUA.ds.forEach(function(x){ lqNoi(m, timMuc(x), nowLQ); });
      cuLQ.filter(function(x){ return LQ_SUA.ds.indexOf(x)<0; }).forEach(function(x){ lqGo(m, timMuc(x), nowLQ); if(m.lienQuan) m.lienQuan = m.lienQuan.filter(function(y){ return y!==x; }); });
      LQ_SUA.ds.concat(cuLQ).map(timMuc).forEach(function(v){ if(v && v.driveId && !v.driveMat && kyDrive(v)!==v.driveKy) v.choDB = true; });   /* văn bản kia: cập nhật thuộc tính dự phòng trên Drive */
    }
    delete m.nvChinh;
    ghiTagGanDay('vanBan', m.the);
    ghiDung('mang', m.mang); ghiDung('ct', m.ctrinh[0]);
    m.tenMoi = tenVanBan({ngay:m.ngay, soHieu:m.soHieu, loai:m.loai,
                          trichYeu:m.tenVB}, m.duoi);
  }
  /* chỉ coi là anh chọn nơi lưu riêng khi anh thật sự sửa ô này;
     không sửa thì để app tự xếp theo nhóm + năm (đổi năm là dời theo) */
  var eD = document.getElementById('s-duong');
  if(eD){
    var dg = eD.value.trim(), dau = eD.getAttribute('data-dau')||'';
    if(dg !== dau){ if(dg && dg !== thuMucCuaGoc(m)) m.duongTuy = dg; else delete m.duongTuy; }
  }
  m.chac = true;
  m.canCu = 'Anh đã sửa tay';
  delete m.giuTen;   /* anh đã sửa tên lại thì bỏ cờ giữ tên gốc */
  delete m.choKhai; delete m.lyDoKhai;
  m.suaLuc = new Date().toISOString();
  var laCho = !!D.cho.find(function(c){ return c.id===id; });
  var tuDS = window.__tuChoKhai===id; window.__tuChoKhai = null;
  luu(); nhapXong(); dongHop();
  if(laCho){ duyet(id); ve(); return; }   /* 3.72 (anh chốt): file đang chờ duyệt — sửa xong bấm Lưu là duyệt vào tủ luôn */
  ve();
  sauKhiLuu(m, laCho);
}
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
function lienKetDen(id){
  var ra = [];
  D.vanBan.forEach(function(v){
    if((v.lienQuan||[]).indexOf(id)>=0) ra.push('Văn bản liên quan: '+tenNganVB(v));
  });
  (D.bieuMau||[]).forEach(function(b){ if(b.vbKem===id) ra.push('Biểu mẫu ban hành kèm: '+(b.ten||b.tenMoi||'')); });
  D.ghiChu.forEach(function(g){ if(g.gocVB===id) ra.push('Ghi chú gắn vào: '+(g.moTa||g.tenMoi||'')); });
  return ra;
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
  var now = new Date().toISOString(), n = 0;
  D.rac = (D.rac||[]).filter(function(m){
    if(ids.indexOf(m.id)<0) return true;
    if(m.khoCu==='homNay'){ nkKhoiPhuc(m); n++; return false; }   /* 3.52: về đúng ngày ở tab Hôm nay */
    var k = m.khoCu || khoCuaMuc(m);
    delete m.xoaLuc; delete m.lyDoXoa; delete m.khoCu;
    m.suaLuc = now; m.khoiPhucLuc = now;
    if(m.driveId && !laFileHeThong(m) && !m.driveMat) m.choDB = true;
    D[k] = D[k]||[]; D[k].push(m); n++; return false;
  });
  if(typeof HS!=='undefined') HS.ds = D.scan;
  luu();
  if(DR.sanSang && DR.online) chayDongBoCho(); else capNhatChip();
  return n;
}
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
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
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
        xoaFile(m.id); xoaAnhMayCua(m);
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
function chonRac(kieu){
  var han = kieu==='tat' ? Infinity : Date.now()-kieu*864e5;
  Array.prototype.forEach.call(document.querySelectorAll('#rac-ds input[type=checkbox]'), function(c){
    var luc = new Date(c.getAttribute('data-luc')||0).getTime();
    c.checked = kieu==='bo' ? false : (kieu==='tat' ? true : luc < han);
  });
  demChonRac();
}
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
function daiChoKhaiHTML(){
  var g = dsChoKhai(), n = Object.keys(g).reduce(function(a,k){ return a+g[k].length; }, 0);
  if(!n || CHO_KHAI) return '';
  return '<div class="dai-ck" onclick="moChoKhai()"><b>📥 '+n+' file chờ khai thông tin</b>'+
    Object.keys(g).filter(function(k){ return g[k].length; }).map(function(k){
      return '<span>'+CK_TEN[k].split(' — ')[0]+' '+g[k].length+'</span>'; }).join('')+
    '<em>Mở danh sách ›</em></div>';
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
      nut('<b>Xóa</b>: 🗑 cuối mỗi file · 🗑 Xóa file (nhiều file) ở đầu tab → vào Thùng rác. <b>Cài đặt → Dữ liệu</b>: 🔄 Reset dữ liệu thử · Xóa sạch máy','nhat')
    ])+'</div></div>';
}
/* ==========================================================
   3.50: ❓ HƯỚNG DẪN TRỰC QUAN — chia theo tab, sơ đồ luồng dữ liệu, các bước theo logic.
   Mở từ nút ❓ trên thanh trên cùng, nút ❓ ở đầu mỗi tab / Dọn kho, và hộp "Có gì mới".
   ========================================================== */
var HD_PHAN = [
  ['tong','🧭 Tổng quan'],['homNay','📅 Hôm nay'],['vanBan','📄 Văn bản'],['bieuMau','📋 Biểu mẫu'],['ghiChu','🖼 Thư viện'],
  ['scan','🪪 Scan'],['kyAnh','✍ Chữ ký·CCCD'],['xoa','🗑 Xóa & Thùng rác'],['donkho','🧰 Dọn kho'],['phim','⌨ Phím & mẹo'],['moi','✨ Có gì mới']];
function hdNut(t, lop){ return '<span class="hd-nut'+(lop?' '+lop:'')+'">'+t+'</span>'; }
function hdBuoc(ds){ return '<ol class="hd-buoc">'+ds.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ol>'; }
function hdLuong(ds){ return '<div class="hd-luong">'+ds.map(function(x){ return '<div class="hd-o">'+x+'</div>'; }).join('<div class="hd-mui">➜</div>')+'</div>'; }
function noiDungHD(p){
  var T = D.cauHinh.thumuc||'Tủ hồ sơ';
  if(p==='tong') return '<h3>App làm gì</h3><p>Tủ hồ sơ là <b>tủ thư viện</b> của anh: mọi file (văn bản, báo cáo tháng, biểu mẫu, ghi chú, hồ sơ scan, chữ ký · CCCD) có <b>một chỗ duy nhất</b>, tên chuẩn, tìm là ra, 2 máy (điện thoại + máy tính) luôn khớp nhau qua Google Drive.</p>'+
    '<h3>Luồng dữ liệu</h3>'+
    hdLuong([hdNut('+ Thêm file')+'<br>'+hdNut('📷 Quét'), '📥 <b>Khay chờ</b><br><small>app đọc, đề xuất tên</small>', '✎ <b>Khai</b><br><small>số hiệu, ngày, mảng…</small>', '📂 <b>Tab</b><br><small>Văn bản · Tháng · Biểu mẫu · Thư viện · Scan</small>', '☁ <b>Drive</b><br><small>'+coChuHTML(T)+' / …</small>'])+
    hdLuong([hdNut('🗑 Xóa'), '🗑 <b>Thùng rác</b><br><small>chia ngăn theo tab</small>', '↩ <b>Khôi phục</b> về đúng tab<br>hoặc <b>Xóa hẳn</b>'])+
    hdLuong([hdNut('🧰 Dọn kho'), '🗂 <b>Lập chỉ mục</b><br><small>không sót file nào</small>', '🧹 <b>Quét rác</b><br><small>hỏng, rỗng, trùng, thiếu thông tin</small>'])+
    '<h3>Thanh trên cùng</h3><p>'+hdNut('❓')+' hướng dẫn này · '+hdNut('🧰')+' Dọn kho · '+hdNut('🗑')+' Thùng rác (số đỏ = số file rác) · '+hdNut('⚙')+' Cài đặt · ô 🔍 tìm mọi thứ (gõ không dấu vẫn ra).</p>'+
    '<h3>Đồng bộ 2 máy</h3><p>App tự đẩy lên Drive khi mở app, khi rời app và ngay sau khi lưu. Chấm Drive ở chân màn hình: xanh = đã khớp; bấm vào để xem hàng đợi hoặc <b>☁ Đồng bộ ngay</b>.</p>';
  if(p==='vanBan') return '<h3>Tab Văn bản — công văn, quyết định, kế hoạch…</h3>'+
    hdBuoc([hdNut('+ Thêm file')+' (hoặc kéo thả file vào) → app đọc số hiệu, ngày, trích yếu, đề xuất tên chuẩn.',
      'Vào <b>📥 Chờ khai</b>: xem lại, bổ sung mảng / chương trình vay → <b>Lưu</b> = vào tủ, lên Drive đúng thư mục <i>'+coChuHTML(T)+' / Văn bản / năm</i>.',
      'Bấm một dòng → xem ở khung bên phải. Nút dưới khung: '+hdNut('Gửi cả file')+hdNut('In')+hdNut('Sửa')+' và (máy đã cài cầu nối) '+hdNut('🖥 Mở máy')+hdNut('📋 Chép')+hdNut('📂')+'.',
      'Tên chưa chuẩn / thiếu thông tin: '+hdNut('Sửa')+' → '+hdNut('🔍 Đọc lại')+' để app đọc lại tiêu đề, số hiệu và đề xuất tên.'])+
    '<p>'+hdNut('🗂 Lập chỉ mục')+' ở đầu tab: đi hết thư mục Tủ hồ sơ, file nào chưa có trong app thì xếp vào đúng tab. '+hdNut('Bộ lọc ▾')+' và hàng lọc nhanh: năm, mảng, chương trình vay, tag.</p>';
  if(p==='homNay') return '<h3>Tab Hôm nay — sổ việc trong ngày</h3>'+
    hdBuoc(['Bấm một ngày trên lịch. <b>SCHEDULE</b> là việc theo lịch (lặp tuần, tháng…); bấm một việc → '+hdNut('✎ Sửa')+' tên, ngày, lặp lại, lưu ý (nhấp đúp cũng mở).',
      '<b>TO-DO LIST</b>: gõ ở ô dưới cùng rồi Enter. Mỗi việc 1 dòng; chạm vào dòng để hiện đủ chữ, sửa (tự lưu) và đổi màu.',
      hdNut('📷')+' <b>chụp nhanh</b> (nút 📷 ở ô gõ dưới cùng sổ): mở camera, chụp xong tự thành dòng <i>📷 Ảnh 14:32</i> — thay vì gõ.',
      hdNut('📎')+' trên mỗi dòng / mẩu: 📷 chụp thêm · 📁 chọn file trong máy · 🔗 gắn file có sẵn trong tủ (chỉ liên kết).',
      'Bấm ảnh nhỏ → xem lớn, vuốt / ‹ › qua lại, ⬇ Tải về. ✕ trên ảnh: file riêng vào thùng rác (ngăn 📅 Hôm nay), file liên kết chỉ gỡ.'])+
    '<p><b>Dung lượng:</b> ảnh tự thu nhỏ cạnh dài 1600 px (khoảng 200–400 KB), danh sách chỉ nạp ảnh nhỏ nên vẫn nhẹ. File trên 15 MB app hỏi trước. '+
    'Có nối Drive thì file lên <i>'+coChuHTML(T)+' / Nhật ký / tháng</i>; máy kia thấy ảnh sau khi đồng bộ.</p>'+
    '<p>Xóa dòng có ảnh → dòng và ảnh vào 🗑 thùng rác ngăn <b>📅 Hôm nay</b>, khôi phục về đúng ngày; lỡ tay thì ↶ Hoàn tác (Ctrl+Z).</p>'+
    '<h3>🧰 Công cụ (cột bên phải lịch)</h3>'+
    hdBuoc(['Bấm một nút → ô công cụ mở ngay dưới lịch; bấm lại hoặc Esc / Đóng (Esc) để đóng. Điện thoại: hàng nút trên lịch, ô mở thành hộp.',
      '<b>🎓 Hạn trả HSSV</b> — gõ ngày vay (món đầu), ngày ra trường, ngày GDX, số tiền (triệu). Mặc định <b>Trên 12 tháng</b>; khóa học đến 1 năm / SV Y khoa thì đổi ô chọn trên tiêu đề (ô đổi màu cam) — phân loại theo thời gian khóa học, không theo thời gian phát tiền vay. '+
        'Trên 12 tháng: hạn cuối = ra trường + số ngày phát tiền vay + 12 tháng; đến 12 tháng / Y khoa: ra trường + (tháng × 2 + 12). Mọi ngày trả đưa về <b>ngày GDX trước đó</b> (trùng ngày GDX thì lùi 1 tháng). '+
        'Thời hạn cho vay = tháng × 2 + 12 (trên 12 tháng) hoặc × 3 + 12. Kỳ trả 12 tháng/lần từ ra trường + 12 tháng; tiền chia đều, làm tròn xuống trăm nghìn, dư dồn kỳ cuối. '+
        'Bấm dòng <b>câu chốt</b> (hoặc 📋 Chép) để dán hồ sơ; ▸ Cách tính ghi từng bước có số thật để kiểm.',
      '<b>🗺 Địa bàn</b> — cây Xã › Điểm GD (ngày GD) › Ấp/KP kèm mã, xếp theo mã. Gõ tên / mã (không dấu) để tìm; bấm mã để chép; 📋 Chép bảng dán Excel; ấp/KP gộp, tách thì ✎ Sửa danh mục (Cài đặt › Địa bàn).',
      'Công cụ 3, 4, 5 đang chờ — anh gửi nghiệp vụ là làm tiếp.']);
  if(p==='duLieu') return '<h3>Tab Tháng — dữ liệu báo cáo hằng tháng</h3>'+
    hdBuoc(['<b>Ma trận</b>: mỗi hàng một báo cáo, mỗi cột một đơn vị (PGD / xã / điểm). Ô '+hdNut('+')+' = chưa có file → bấm để thêm đúng ô đó.',
      'Ô đủ hiện ✓; xã có 2 điểm thì hiện 2/2, 1/2…',
      hdNut('+ Thêm file')+' ở đầu tab: Excel không ghi kỳ thì app lấy <b>kỳ đang xem</b>.',
      hdNut('✎ Danh mục')+': thêm, bớt, đổi thứ tự báo cáo; ⚙ từng báo cáo: tính theo cấp nào, chu kỳ.'])+
    '<p>File nằm ở <i>'+coChuHTML(T)+' / Dữ liệu tháng / năm / Tn</i>.</p>';
  if(p==='bieuMau') return '<h3>Tab Biểu mẫu — mẫu đơn trắng để in cho khách</h3>'+
    hdBuoc([hdNut('+ Thêm file')+' → chọn nhóm (chương trình vay / Tất cả CT).',
      'Bấm ✓ ở đầu dòng để chọn nhiều mẫu → '+hdNut('In cả bộ')+'.',
      hdNut('📚 Bộ biểu mẫu')+': lưu sẵn bộ mẫu hay dùng (ví dụ bộ hồ sơ vay HN).',
      'Word: máy đã cài cầu nối thì '+hdNut('🖥 Mở máy')+' mở thẳng bằng Word.']);
  if(p==='ghiChu') return '<h3>Tab Thư viện — 📁 Bộ hồ sơ · 🖼 Ghi chú ảnh · ⚠ Theo dõi nợ</h3>'+
    '<p><b>Bộ hồ sơ</b> là một vụ việc gom đủ giấy tờ một chỗ, ví dụ <i>Rủi ro · Võ Văn Cường</i>: ghi chú tự do + biên bản rủi ro, giấy chứng tử, bản scan HĐ lưu…</p>'+
    hdLuong([hdNut('+ Tạo bộ hồ sơ'), '🏷 <b>Loại + tên khách</b><br><small>Rủi ro · Hồ sơ vay · Gia hạn…</small>', '📍 <b>Địa bàn</b><br><small>Xã › Điểm GD › Ấp/KP › Tổ (Hội tự điền)</small>', '📝 <b>Ghi chú</b> + 📎 <b>File</b>'])+
    hdBuoc(['Bên trái là <b>cây địa bàn</b> Xã › Điểm GD › Ấp/KP › Tổ (kèm Hội của tổ) và danh sách Hội — bấm để lọc các bộ; số bên cạnh là số bộ.',
      'Trong một bộ: chọn Xã → Điểm → Ấp → Tổ; <b>Hội tự điền theo tổ</b> (sửa được). Ô ghi chú tự lưu khi gõ.',
      hdNut('🔗 Gắn file có sẵn')+': tìm và tích file ở bất kỳ tab nào (văn bản, scan, chữ ký·CCCD…) — chỉ liên kết, file vẫn ở chỗ cũ.',
      hdNut('📎 Thêm file mới')+': file riêng của bộ, tự lên Drive <i>'+coChuHTML(T)+' / Bộ hồ sơ / tên bộ</i>.',
      'Bấm tên file để xem thử. ✕ = gỡ khỏi bộ (file gắn) hoặc bỏ vào thùng rác (file riêng). '+hdNut('🗑 Xóa bộ','xau')+' → thùng rác, ngăn Bộ hồ sơ.',
      'Xem một văn bản ở tab khác: khung xem ghi "📁 Thuộc bộ: …", bấm là mở bộ.'])+
    '<p><b>Ghi chú ảnh</b>: chụp / chọn ảnh ghi chú (bảng phân bổ vốn, thông báo…), gõ mô tả.</p>'+
    '<h3>⚠ Theo dõi nợ — 3 danh sách riêng: ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh</h3>'+
    hdLuong([hdNut('📥 Cập nhật tháng'), '📊 <b>Chọn file sao kê</b><br><small>xuất từ hệ thống, app tự nhận loại + kỳ</small>', '👁 <b>Xem trước</b><br><small>mới · phát sinh lại · tăng/giảm · ra khỏi DS</small>', '✓ <b>Cập nhật</b>'])+
    hdBuoc(['Mỗi tháng bấm '+hdNut('📥 Cập nhật tháng')+', chọn file trên máy hoặc file đã lưu ở tab Tháng (chọn được cả 3 file một lần). App nhận món theo <b>số khế ước</b>, hộ theo <b>mã khách hàng</b>.',
      '<b>Không bao giờ xóa:</b> món không còn trong danh sách chỉ chuyển sang lọc "Đã ra khỏi DS"; tháng sau có lại thì ghi <b>↻ phát sinh lại</b>. Thông tin anh bổ sung, nhật ký, tài liệu giữ nguyên. Nhập lại cùng tháng = thay số liệu tháng đó; file cũ hơn chỉ bổ sung lịch sử.',
      'Danh sách xếp theo nghiệp vụ: 3T KHD theo số tháng không giao dịch; quá hạn — mới phát sinh lên đầu, số ngày quá hạn; khoanh — sắp hết hạn khoanh (≤ 6 tháng). '+hdNut('🌳 Cây địa bàn')+' Xã › Điểm › Ấp › Tổ có số món + tổng tiền, bấm để lọc.',
      'Bấm một món → thẻ món: số liệu, lịch sử từng tháng, món này ở danh sách khác, món khác cùng hộ.',
      '<b>🗂 Hồ sơ hộ vay</b> (dùng chung 3 danh sách): người vay & hộ · thừa kế / người trả nợ thay · thực trạng · tài sản · sử dụng vốn · nguyên nhân · phương án — bấm ✎ chọn nhanh + ghi thêm; mỗi lần sửa giữ lịch sử 🕘.',
      hdNut('➕ Ghi lần làm việc')+': ngày, địa điểm (mặc định ấp của khách), hình thức, thành phần + mục 2–5 đúng biên bản (điền sẵn từ hồ sơ hộ). Hạn cam kết tự lên lịch Hôm nay. '+hdNut('📝 Biên bản')+' → file Word điền sẵn để sửa, in, ký.',
      hdNut('📎 Thêm tài liệu')+' (chụp / chọn file: hồ sơ gốc, biên bản đã ký, ảnh, giấy tờ thừa kế) · '+hdNut('🔗 Gắn file có sẵn')+' (bản scan ở tab Scan…) · '+hdNut('📍 Vị trí nhà')+' (lấy GPS tại nhà khách hoặc dán link Google Maps → 🧭 Chỉ đường).',
      'Tab Hôm nay › ⚠ Cần xử lý nhắc: cam kết trả nợ đến hạn, nợ khoanh sắp hết hạn. Dữ liệu đồng bộ các máy qua Drive (_Hệ thống/theodoino.json).']);
  if(p==='scan') return '<h3>Tab Scan — CCCD và hồ sơ giấy</h3>'+
    '<p><b>Danh sách (3.61):</b> mỗi bản 2 dòng — dòng 2 ghi <b style="color:var(--luc)">✓ Đạt</b> (tên khách, đủ 2 mặt, đủ Xã › Điểm › Ấp › Tổ, đã lên Drive đúng thư mục tổ) hoặc <b style="color:var(--vang)">⚠ thiếu gì</b>. '+
    'Chip '+hdNut('⚠ Chưa đạt (n)')+' lọc bản cần xử lý. Xem '+hdNut('☰ Danh sách')+' (mới lưu lên trước, nhóm Ngày / Tuần / Tháng) hoặc '+hdNut('🌳 Cây địa bàn')+' (bấm tổ để lọc). '+
    'Máy tính: bấm một bản → xem ở khung bên phải; '+hdNut('⛶')+' mở màn Lưu & gửi. Tích ☐ nhiều bản → 🖨 In chung 4 người / A4.</p>'+
    '<p>Hai chế độ: <b>Thẻ</b> (CCCD 2 mặt, in 4 người / A4 có đường cắt) và <b>Tài liệu</b> (nhiều trang thành 1 PDF).</p>'+
    hdLuong(['📷 <b>Quét</b><br><small>⚡ tự chụp khi khung xanh đứng yên, hoặc ✋ thủ công</small>','① <b>Chỉnh</b><br><small>kéo 4 góc, đổi chỗ, xoay</small>','② <b>Xem</b><br><small>đúng bản PDF sẽ lưu</small>','③ <b>Lưu & gửi</b><br><small>lưu tạm ngay, lên Drive</small>'])+
    hdBuoc(['Mọi bước có thanh '+hdNut('‹ Lùi')+' ① ② ③ '+hdNut('Tiếp ›','chinh')+'; bấm số bước đã qua để quay lại. Máy tính: <b>Esc = Lùi, Enter = Tiếp</b>.',
      '① Chỉnh: chạm 1 ảnh rồi chạm ảnh khác để đổi chỗ (máy tính kéo thả) · ▲▼ dời cả người · ⇄ đổi mặt · '+hdNut('✂ Chỉnh viền')+' kéo 4 góc có kính lúp.',
      '③ Lưu & gửi: điện thoại '+hdNut('📤 Gửi')+' (Zalo, Drive, Tệp); máy bàn '+hdNut('💾 Lưu nhanh')+' (ghi thẳng vào thư mục cố định) + '+hdNut('📋 Copy')+'.',
      'Bản lưu tạm nằm ở <i>Hồ sơ scan / Chưa khai / tháng</i>; '+hdNut('✎ Khai đầy đủ')+' (tên, xã, ấp, tổ) thì app dời về <i>CCCD / xã / điểm / ấp / tổ</i>.']);
  if(p==='kyAnh') return '<h3>Chữ ký · CCCD — ảnh nhỏ dưới 200 KB để nhập hệ thống</h3>'+
    '<p>Mở bằng '+hdNut('📁 Chữ ký · CCCD')+' ở tab Scan. Cùng luồng ① ② ③ và <b>cùng màn chỉnh tay với Scan</b>.</p>'+
    hdBuoc(['Gõ <b>tên khách</b> (app nhớ 30 phút) → '+hdNut('✍ Chụp chữ ký')+' hoặc '+hdNut('🪪 Chụp CCCD')+'.',
      '① Chỉnh: app tự khoanh vùng chữ ký / tìm khung thẻ và nắn thẳng. Chưa vừa: '+hdNut('✂ Chỉnh viền')+' kéo 4 góc (kính lúp), '+hdNut('⟲ Trái')+hdNut('⟳ Phải')+hdNut('⇅ Lật')+hdNut('📐 Làm thẳng')+'. CCCD chọn mức Nhỏ / Vừa / Nét.',
      '② Xem: ảnh cuối cùng + dung lượng (✓ dưới 200 KB) + tên file <i>2026-09-28 Nguyen Van A CK.jpg</i>.',
      '③ Lưu: lên Drive <i>Chữ ký - CCCD / tháng</i>; máy bàn '+hdNut('💾 Lưu nhanh')+hdNut('📋 Copy')+', điện thoại '+hdNut('📤 Gửi')+'.']);
  if(p==='xoa') return '<h3>Xóa & Thùng rác — một quy tắc</h3>'+
    hdLuong([hdNut('🗑')+' cuối mỗi file<br>hoặc '+hdNut('🗑 Xóa file')+' (nhiều file)', '🗑 <b>Thùng rác</b><br><small>ngăn theo tab</small>', '↩ <b>Khôi phục</b> về đúng chỗ<br>hoặc <b>Xóa hẳn</b>'])+
    hdBuoc(['<b>Cứ xóa là vào thùng rác</b> — cả bản scan và Chữ ký · CCCD. Ngay sau khi xóa có nút '+hdNut('↩ Hoàn tác')+'.',
      hdNut('🗑 Xóa file')+' ở đầu mỗi tab: bấm vào file để tích (hoặc '+hdNut('Chọn tất cả đang lọc')+', '+hdNut('Thêm vào tủ trước ngày…')+') → '+hdNut('Xóa N file','xau')+'.',
      'Mở '+hdNut('🗑')+': dòng đầu cho biết bao nhiêu file ở ngăn nào. Bấm tên file để <b>xem thử</b>. Khôi phục từng file, cả ngăn đã chọn, hoặc '+hdNut('Làm trống ngăn này','xau')+' / '+hdNut('Làm trống cả thùng','xau')+'.',
      '<b>Xóa hẳn</b>: file trên Drive vào thùng rác Google Drive (Google giữ thêm 30 ngày). Bật '+hdNut('☐ Tự xóa hẳn rác cũ hơn 30 ngày')+' nếu muốn app tự dọn.',
      'Reset toàn bộ dữ liệu thử (giữ cài đặt): '+hdNut('⚙ Cài đặt')+' › Dữ liệu › '+hdNut('🔄 Reset dữ liệu thử','xau')+'.']);
  if(p==='donkho') return '<h3>🧰 Dọn kho — một nơi cho mọi việc dọn dẹp</h3>'+
    '<p>Trang nằm bên trái, <b>bấm tên file bất kỳ là xem thử ở khung bên phải</b>; dưới mỗi tên luôn có <b>đường dẫn thật</b> (☁ trên Drive, 💻 chỉ trong máy, 📥 khay chờ).</p>'+
    hdBuoc([hdNut('🗑 Thùng rác')+': như phần Xóa & Thùng rác.',
      hdNut('🗂 Lập chỉ mục')+': đi hết thư mục <i>'+coChuHTML(T)+'</i> trên Drive. File chưa có trong app được xếp vào tab <b>theo thư mục đang chứa file</b> (Văn bản, Dữ liệu tháng / năm / tháng, Biểu mẫu, Ghi chú, CCCD / xã / điểm / ấp / tổ, Hồ sơ scan, Chữ ký - CCCD). Đủ thông tin thì vào thẳng tab, thiếu thì vào Chờ khai. Không dời, không đổi tên file.',
      hdNut('🧹 Quét rác')+': tìm file hỏng / rỗng, mục mất file, bản scan không còn ảnh, mục thiếu thông tin ('+hdNut('Sửa')+hdNut('🔍 Đọc lại')+'), file trùng (chọn bản giữ), thư mục trống. Tích rồi '+hdNut('Dọn mục đã tích','xau')+' → vào thùng rác.',
      hdNut('⋯ Khác')+': lấy file từ kho Drive cũ (Picker), đẩy / lấy chỉ mục, nhờ AI chuẩn hóa tên.'])+
    '<p class="huong-dan">Google chỉ cho app thấy file do app tạo hoặc anh chọn qua Picker — file chép tay vào ổ G thì đưa vào bằng + Thêm file.</p>';
  if(p==='phim') return '<h3>Phím tắt (máy tính)</h3>'+
    '<table class="hd-bang"><tr><td><b>Esc</b></td><td>Lùi ra 1 cấp: màn kéo góc → hộp đang mở (bước ② về ①…) → khung xem lớn → chế độ chọn xóa → Chờ khai / Dọn kho</td></tr>'+
    '<tr><td><b>Enter</b></td><td>Tiếp ở các bước Scan, Chữ ký · CCCD; Xong ở màn kéo góc</td></tr>'+
    '<tr><td><b>Phím cách</b></td><td>Chụp khi đang mở camera / webcam</td></tr>'+
    '<tr><td><b>Ctrl+Z</b></td><td>Hoàn tác ở Hôm nay</td></tr></table>'+
    '<h3>Mẹo</h3><ul class="hd-buoc"><li>Máy tính cài <b>cầu nối</b> (⚙ › Google Drive) để mở thẳng Word / Excel và chép file dán Zalo.</li>'+
    '<li>Kéo vạch giữa 2 cột để đổi độ rộng khung xem.</li><li>Nút ❓ ở đầu mỗi tab mở đúng phần hướng dẫn của tab đó.</li></ul>';
  if(p==='moi') return noiDungCoGiMoi();
  return '';
}
function moHuongDan(p){
  p = p || (typeof nganHienTai!=='undefined' && nganHienTai===0 ? 'homNay' : 'tong');   /* 3.52: đang ở Hôm nay thì mở đúng phần */
  if(p==='scan' || p==='the') p = 'scan';
  var h = '<div class="hop-tit">❓ Hướng dẫn</div>'+
    '<div class="hd-nav">'+HD_PHAN.map(function(x){ return '<button class="'+(x[0]===p?'bat':'')+'" onclick="moHuongDan(\''+x[0]+'\')">'+x[1]+'</button>'; }).join('')+'</div>'+
    '<div class="hd-than">'+noiDungHD(p)+'</div>'+
    '<div class="hang-nut" style="margin-top:12px"><button class="nho chinh" onclick="dongHop()">Đóng (Esc)</button></div>';
  moHop(h, true);
  var t = document.querySelector('#hop-in .hd-than'); if(t) t.scrollTop = 0;
}
/* ✨ CÓ GÌ MỚI — hiện 1 lần khi mở bản mới; bấm dòng nào thì app dẫn tới đúng chỗ đó */
var CO_GI_MOI = {ban:'3.147', ds:[
  ['🧭 Máy tính: thanh bên trái thay thanh tab — Hôm nay · Văn bản · Nạp & KT · 5 màn Số liệu · Biểu mẫu · Scan · Thư viện · Công cụ; bấm 1 lần là tới, đầu trang còn 1 hàng nên bảng / danh sách cao hơn', "dongHop();doiNgan(0)"],
  ['« Thu gọn thanh bên còn biểu tượng (rê chuột hiện tên) — app nhớ; màn nhỏ hơn 1280 px tự thu. Alt+1…9 mở nhanh từng mục. Điện thoại giữ thanh tab ngang như cũ', "dongHop();doiNgan(0)"],
  ['🔢 Số nhắc cạnh mục: Văn bản = file chờ duyệt · Nạp & KT ⚠ = file bắt buộc còn thiếu tháng mới nhất · 🗑 = số mục thùng rác', "dongHop();moNapSL()"],
  ['✅ Kiểm tra kỳ: bấm 🔍 Kiểm tra kỳ → app báo ✓ Đạt khi đủ 9 file (Ⓑ 3 + Ⓐ 6), đúng kỳ, đúng cấu trúc. Chênh lệch giữa các file chỉ ghi nhận để biết — không ảnh hưởng Đạt, không sửa số', "dongHop();moNapSL()"],
  ['🔓 Bỏ hẳn chốt / khóa tháng: tháng từng chốt tự mở, nạp / thay / xóa bình thường (dữ liệu giữ nguyên)', "dongHop();moNapSL()"],
  ['📋 Kiểm tra kỳ ghi rõ báo cáo nào dùng được: Tổ · Sao kê · Tra cứu / Tổng hợp tổng quan / KTGS (thiếu file gì); tháng có BC0437 / BC0438 thì kiểm luôn phần KTGS', "dongHop();moNapSL()"],
  ['📋 Bộ file mới: Ⓑ bắt buộc 3 file (Mẫu 31, Dư nợ chi tiết, DSTO) · Ⓐ chuẩn TW 6 file (01.1, 01.2, 4 LEN_31) · Ⓓ phụ (KHĐ mẫu 14, quá hạn, khoanh, phân kỳ, Tổng dư nợ, Thông tin tổ trưởng). Nút “📋 File cần xuất” ở tab Nạp & KT nhắc mẫu cần chọn khi xuất', "dongHop();moNapSL()"],
  ['🔢 Ô ma trận hiện số chính + mũi tên so tháng trước: dư nợ tăng ▲ xanh / giảm ▼ đỏ; quá hạn, khoanh, KHĐ ngược lại; tổ chỉ hiện số tổ', "dongHop();moNapSL()"],
  ['🖱 Bấm ô trống = nạp file vào ô đó; bấm ô đã có file → hỏi “Thay bằng file mới?” (nút nhỏ xem / tải / xóa); thay rồi vẫn ↩ Hoàn tác được 1 lần trong 30 ngày', "dongHop();moNapSL()"],
  ['🗑 Bỏ hẳn B32, Mẫu 10, Mẫu 7, Sao kê khách hàng, KHĐ mẫu 08: bảng đã nạp tự xóa (file trên Drive vào Thùng rác Drive). Doanh số + nguồn vốn TW / ĐP lấy từ Mẫu 31 (Tổng hợp › Theo nguồn vốn)', "dongHop();moBCSL()"],
  ['⏱ KHĐ 3 tháng: app tự tính từ Mẫu 31 (tháng không có file KHĐ vẫn có số); có file mẫu 14 thì dùng file và Kiểm tra đối chiếu với số app tính', "dongHop();moNapSL()"],
  ['⚠ Tổ dư nợ 0 còn trên DSTO / LEN_31 → vẫn hiện, ghi “Dư nợ 0 — cần đóng tổ” (chip liệt kê ở Tổ TK&VV); không còn ở cả hai thì ẩn khỏi cây (vẫn tìm được). SĐT tổ trưởng, tổ phó lấy theo DSTO', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📥 Tab mới “Nạp & KT” thay chỗ tab Tháng — nơi duy nhất nạp file Excel hệ thống và kiểm tra dữ liệu; nạp BC0437 / BC0438 của KTGS cũng ở đây', "dongHop();moNapSL()"],
  ['📊 Tab “Số liệu” chỉ còn báo cáo: Tổng hợp, Sao kê, Tổ TK&VV, KTGS Hội, Tra cứu KH (nhớ tab con anh mở gần nhất)', "dongHop();moBCSL()"],
  ['🗑 Bỏ tab Tháng: dữ liệu cũ của tab tự xóa một lần; thư mục “Dữ liệu tháng” trên Drive vào thùng rác Drive (lấy lại được 30 ngày). Thêm file Excel → sang tab Nạp & KT', "dongHop();moNapSL()"],
  ['🧰 Cột Công cụ: tạm bỏ Giao ban và Buổi GD (sẽ làm lại sau)', "dongHop();doiNgan(0)"],
  ['📅 Nạp số liệu: ngày số liệu lấy theo NỘI DUNG file. File không ghi ngày (vd KHĐ, Nợ khoanh, Thông tin tổ trưởng) → dòng báo “Cần khai ngày”, anh chọn ngày ở ô Kỳ hoặc bấm “Tên file: … — dùng”; chưa khai thì không ghi nhận', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🧱 Kiến trúc mới (đợt A): app tách thành nhiều file nhỏ (css / js) — dùng như cũ, không đổi chức năng; cửa sổ nổi HSSV vẫn đủ kiểu chữ. Tải app về máy thì tải cả thư mục', "dongHop();moCaiDat()"],
  ['🗓 Kế hoạch › In theo tháng kiểm tra: Mẫu 06 / 16 / 04 tự lấy số liệu cuối tháng liền trước (Mẫu 31 + BC0437 đã nạp) — không cần đổi kỳ; thiếu tháng đó → tháng gần nhất trước, ghi ⚠', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🛟 Sửa lỗi mất cài đặt (khai báo Hội…) khi đồng bộ Drive: app nhớ đúng file cài đặt, gặp file khác luôn lấy về gộp trước — không ghi đè; không còn tạo thư mục "undefined" trên Drive', "dongHop();moCaiDat()"],
  ['🧹 Báo cáo app lập (Tổ, Sao kê, Tổng hợp): bỏ dòng “PGD NHCSXH GÒ DẦU” cuối trang in — chỉ còn ở góc trên trái', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📤 Nút PDF gửi Hội (Mẫu 06, 16 từng tổ · 16 cả tháng · 04 · Kế hoạch): hộp in chọn “Lưu dưới dạng PDF”, tên file điền sẵn theo cây địa bàn Xã_Hội_Ấp_Tổ_Mẫu_Tháng_SL ngày số liệu (vd TruongMit_HND_Ap06_VoVanTao_M06_T10-26_SL30-09-26); file Word cùng tên', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🖨 Kế hoạch › In theo tháng: mỗi dòng tổ thêm 🖨 In / PDF 16 · 📄 Word 16 (biên bản của riêng tổ, in 2 mặt); nút Mẫu 06 ghi rõ "In / PDF"', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🔧 Mẫu 06: số tiền 2 số lẻ (nợ lãi dưới 5.000 đ giữ 3 số lẻ), canh phải, luôn nằm 1 dòng — dòng Cộng không còn bị xuống dòng (1.178,4)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch: mỗi tháng kiểm tra TRỌN ẤP (chia ấp vào tháng, số tổ gần đều); đổi tháng theo cả ấp; kế hoạch cũ bị tách ấp có cảnh báo + nút Xếp lại theo ấp', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⇅ Thứ tự ấp mặc định theo điểm GD → mã thôn → tên; sắp lại ▲▼ (nhớ theo xã), ↺ về mặc định', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🖨 Kế hoạch › bấm tháng → in theo tháng: Mẫu 06 từng tổ (1 mặt, hiện tỷ lệ món, dưới 90% hỏi lại, ✎ chọn hộ ngay), Mẫu 16 cả tháng + Mẫu 04 tháng (2 mặt)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Định kỳ · Mẫu 06 + 16 nay chọn tổ tự do (không tích sẵn theo Kế hoạch)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🔧 Sửa bản In / PDF Kế hoạch: bảng đầu trang không còn hiện khung kẻ; Quốc hiệu không bị xuống dòng', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['✂️ Tab Tổ TK&VV › báo cáo “Dự kiến chia tách tổ” (A4 ngang, tối đa 2 trang): mỗi hộ 1 dòng theo mã KH, cột Tổ mới (1/2/3) để tổ trưởng ghi, tên vợ/chồng, SĐT, QH / khoanh in đậm sau tên; dòng dự kiến chia tối đa 3 tổ; ký Tổ trưởng', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🏢 Các báo cáo app lập (Tổ, Sao kê, Tổng hợp): góc trên trái ghi “PGD NHCSXH GÒ DẦU” in đậm', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🔧 Sửa: “đã mở TK” chỉ ghi cho khách đang vay (còn dư nợ / nợ lãi) hoặc KU chưa giải ngân — khách đã tất nợ (kể cả trước 2026) không còn bị ghi nhầm', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🚪 Tổ TK&VV: hộ đã tất nợ mà TK 105 không còn gắn tổ (tách dòng riêng hoặc đã đóng) = đã ra khỏi tổ trên hệ thống → không tính tổ viên, hiện ở chip “Ra khỏi tổ” kèm lý do; ② Kiểm tra số liệu ghi số hộ', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📝 Mẫu 06: ngắt trang tự nhiên ở mọi phiếu — trang 1 đầy trước, chỉ “Biện pháp xử lý” + dòng ngày + chữ ký đi liền sang trang sau; kẻ trên dòng Cộng nét đen; mẫu trắng chừa thêm chỗ cho Word (giữ chú thích cuối trang)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⟳ Cạnh ô “Số liệu” (Tổ TK&VV, Sao kê, KTGS) có nút ⟳ Làm mới — đọc lại theo kỳ đang chọn, cả 3 tab cùng dùng kỳ đó; chip “📌 Đang dùng: …” cho biết máy đang lấy số liệu kỳ nào (vàng = khác kỳ đã chọn, bấm Làm mới)', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🔢 TK 105: khách có số tài khoản 105 trên Mẫu 31 (kể cả số dư 0) không còn bị báo “chưa có TK 105”; ô Số TK 105 ghi “đã mở TK” khi chưa có số sổ', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🚫 KU hủy / nhập nhầm tổ (Đã đóng, tổng giải ngân = 0) không còn tính vào tổ viên, tất nợ, mới vào / ra khỏi tổ; ② Kiểm tra số liệu ghi số KU đã loại', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['⏳ KU đã nhập máy chưa giải ngân (còn mở, giải ngân 0): không tính tất nợ; Sao kê › Nợ cần xử lý có báo cáo riêng — quá 1 tháng (từ ngày vay đến ngày số liệu) tô nền, ghi “Cần đóng KU”, xếp đầu', "dongHop();D.cauHinh.slTab='sk';doiNgan(7)"],
  ['📅 Chip “Đến hạn tháng sau”: 2 cột ĐH theo HĐ (gia hạn) và ĐH theo GDXA, ghi rõ “đã quá ĐH HĐ — chưa chuyển QH do ngày GD xã” / “chuyển QH ngày …” (cả In / Excel)', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📝 Mẫu 06: dòng chấm nhạt (không đậm, xám); kẻ ngang giữa các dòng hộ mảnh xám; tiêu đề cột cỡ 11; “Biện pháp xử lý” 1 dòng rưỡi, ngày ký đưa lên; chừa chỗ ký; phiếu 1–2 hộ gọn 1 trang; mẫu trắng 3 cột Họ tên · Mục đích · Vào việc bằng nhau, 1 mặt đúng 1 trang, 2 mặt đúng 2 trang (cả Word)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 04: kiến nghị 2d, 2đ, 3a, 3b tùy chọn trong hộp “Chọn khi in” (mặc định 1 dòng chấm; tích để in câu gợi ý, sửa được); bản In không còn đường kẻ lòi lề phải; tên Trưởng đoàn thẳng giữa dưới chức danh; gạch dưới tên đơn vị', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch: gạch dưới tên cơ quan dài theo tên (1/3–1/2 dòng chữ), cân giữa, cách chữ vừa phải; bản In có gạch như Word', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['💰 Tổ TK&VV: chip “Tất nợ · còn TK 105” (thay Không dư nợ; bỏ 2 chip còn 105 / đề xuất cho ra) — TK 105 trên 100.000 đ in đậm; không tô màu sặc sỡ, nền nhạt xen kẽ theo tổ; cột “Nợ lãi” sau “Dư nợ”; còn nợ lãi = chưa tất nợ (tính như còn dư nợ); cột Gợi ý đổi thành “Ghi chú” (màn hình ghi ngắn, In / Excel để trống ghi tay); cột Tổ in trước Họ tên', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📅 Số liệu theo NGÀY: chọn kỳ ngày ở ô “Số liệu” (Tổ, KTGS, Sao kê) → mỗi loại file lấy bản đúng ngày, thiếu thì lấy cuối tháng trước; đầu tab có dòng ghi rõ lấy theo ngày nào (KTGS chỉ cảnh báo trên màn hình). Mới vào / Ra khỏi tổ so ngày đó với cuối tháng trước', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📥 KHĐ, Nợ quá hạn, Nợ khoanh, Thông tin tổ trưởng, DSTO, Tổng dư nợ nay nạp được theo ngày (như Mẫu 31, Dư nợ chi tiết); ngày chỉ có Dư nợ chi tiết cũng chọn được', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🗂 Ma trận có cột “📅 Theo ngày” sau tháng mới nhất (bấm ngày để xem / xóa) + nút 🗑 Xóa ngày cũ (giữ ngày mới nhất, cho nhẹ máy); nạp ngày mới app hỏi xóa ngày cũ', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['⚡ Mở app là dựng sẵn số liệu (tháng + ngày mới nhất) chạy ngầm, có tiến độ từng kỳ; nút 🧹 Làm sạch & nạp lại (không xóa file). Nạp file có tiến độ từng file', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🛡 Sau giải ngân (30 ngày): tháng chưa có Mẫu 31 cuối tháng dùng Mẫu 31 ngày mới nhất — in phiếu đi kiểm kịp thời', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📅 Mọi ô chọn ngày ghi rõ kiểu: cạnh ô có dòng “= 07/10/2026 (ngày/tháng/năm)”, đổi ngày là đổi theo — máy đặt tiếng Anh ô ngày hiện tháng trước, nhìn dòng này để khỏi nhầm', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📅 Sửa: file ghi ngày kiểu Mỹ (tháng/ngày, vd “10/7/2026 12:00:00 AM”) bị đọc nhầm thành 10/07 — nay app tự nhận kiểu ngày của file. File đã vào nhầm ô tháng thì xóa ô đó rồi nạp lại', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📄 Mẫu 06 trắng để ghi tay (nút cạnh “Xem phiếu Mẫu 06”): in 1 mặt (4 dòng hộ) hoặc 1 tờ 2 mặt (21 dòng hộ), dòng 0,8 cm — In / Word', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📝 Mẫu 06: mục đích sử dụng vốn cùng cỡ chữ nhỏ; cột đúng / sai mục đích hẹp lại, Hiệu quả đầu tư rộng ra; tên Hội không in đậm; “Mẫu số 06/TD” nhỏ, canh phải', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📝 Mẫu 16 / 04: không ghi số tháng lãi — nhóm chung “Món vay không có giao dịch từ 3 tháng trở lên, lãi tồn cao” (vẫn tính theo số tháng để xếp nặng nhẹ)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🔀 Tab Tổ chọn đa chiều: Hội lọc độc lập với địa bàn — Xã + Hội (cả xã, không cần chọn điểm), PGD + Hội (toàn PGD); đổi xã vẫn giữ Hội', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📅 Biến động cả năm: thêm bảng chi tiết kiểu báo cáo tổ — STT, Mã KH, Họ tên hộ vay, Vào (ngày), Ra (ngày), Ghi chú; cấp Hội thêm cột Tổ, cấp xã thêm Điểm GD; In / Excel theo bảng này', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['👥 Tổ TK&VV: chọn Hội / điểm GD / xã / PGD (chưa chọn tổ) cũng có dòng tóm tắt + chip lọc như của tổ (đề xuất cho ra, CCCD hết hạn, mới vào, ra khỏi tổ…) — danh sách có cột Tổ, In / Excel', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🏢 Hàng chip xã có chip PGD; bảng toàn PGD: dòng Cộng PGD trên đầu, từng xã → các điểm GD (bấm để xuống bảng các tổ)', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['0️⃣ Vay trực tiếp không tính là tổ: STT 0, đầu nhóm điểm GD; số tổ không tính, khách và số tiền vẫn cộng; bảng các tổ có In / Excel', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🆕 Mới vào tổ chia 3 nhóm: hộ mới (CIF mới) · CIF cũ dùng lại · chuyển tổ — dòng tóm tắt và Biến động cả năm', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📅 Dư nợ chi tiết: lấy kỳ theo cột “Ngày số liệu” trong file (tên file ghi ngày xuất có thể khác) — file đã nạp sai ô tháng thì nạp lại', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🔢 Số TK 105 khách đã tất nợ: nạp thêm file Dư nợ chi tiết các tháng trước (vd đến 31/12/2025) — app lấy số sổ của tháng khách còn vay; khách đang vay giữ số mới nhất', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🔧 Tổ TK&VV: sửa dòng tóm tắt bị lệch số (“không dư nợ còn 105”, “đề xuất cho ra”, “CCCD hết hạn”) — nay khớp đúng với các chip', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🔧 Sửa: số TK 105 (theo file Dư nợ chi tiết) không hiện khi file này được nạp trước Mẫu 31 — nay tự gắn lại, máy đã nạp rồi cũng tự sửa khi mở app', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🖨 Bộ in chuẩn: mọi bản In / Xem trước do app tự chia trang A4 — xem sao in vậy; hết dòng ngày giờ, đường dẫn ở đầu / cuối trang; lặp tiêu đề bảng, không cắt dòng; báo cáo nhanh tự chọn dọc / dọc gọn / ngang', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🔎 Khung xem trước mới: lật trang ⏮ ‹ n/N › ⏭, thu phóng − + ↔ ⊡, Khổ, In, PDF, Word, toàn màn hình', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🔢 Số trang: Mẫu 06 “Trang x/y” từng tổ; Kế hoạch, 04, 16, Phân công, báo cáo số trang góc dưới phải từ trang 2 (cả Word và bản In); in 2 mặt chèn trang trắng chính xác', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📝 Mẫu 06 theo mẫu chuẩn: lề rộng tối đa, Họ tên 1 dòng, Mục đích tối đa 2 dòng, chương trình ghi viết tắt hệ thống, dòng chấm tới cuối dòng', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['👥 Tổ TK&VV: chip “Có dư nợ · chưa có TK 105”, ngày tất nợ, Mới vào tổ / Ra khỏi tổ (so tháng trước), 📅 Biến động cả năm', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🖨 Hộp “Chọn khi in”: ô người kiểm tra / người ký hiện kèm tên đã khai (vd “Phó Chủ tịch — Trần Thị B”), ô chưa khai tên thì ẩn bớt', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⚡ Tab Số liệu: hiện các tháng đang giữ sẵn (vd “Đang giữ 9 tháng: T9, T8, …”) + nút ↻ Nạp lại', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🖨 Mẫu 06 / 16 / 04 / Kế hoạch / Phân công: gạch dưới tiêu ngữ và tên cơ quan mảnh lại (0,5 pt) — cả Word và bản In', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⚡ Số liệu: máy tính giữ sẵn 12 tháng gần nhất (chọn “Tất cả” ở đầu tab Số liệu), điện thoại giữ tháng mới nhất — lần đầu vào tab Số liệu app nạp ngầm các tháng, sau đó chuyển tháng / in / đổi tab không phải nạp lại', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🖨 Mẫu 06 / 16 / 04 / Kế hoạch / Phân công: dòng chấm in mịn hơn (cỡ nhỏ, đủ dài như cũ) — cả Word và bản In', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🖨 In 2 mặt (mặc định bật, ô trong hộp “Chọn khi in”): xuất nhiều tổ / nhiều bản — mỗi bản bắt đầu tờ mới, bản lẻ trang tự thêm 1 trang trắng (Word chắc chắn; In từ trình duyệt là ước lượng)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📝 Mẫu 16: mục III ghi “Qua kiểm tra tại Tổ và kiểm tra thực tế tổ viên, Đoàn có nhận xét như sau:” — bỏ số khách hàng (không khớp số tổ viên của tổ)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📄 Phân công BTV: tích chọn người phân công; bỏ tích Chủ tịch = khuyết → chọn Phó đôn lên phụ trách (nhận đủ nhiệm vụ CT); không còn Phó → Chủ tịch kiêm; ô “Kiểm tra đủ nhiệm vụ” (ấp thiếu / trùng, Kế toán, Thủ quỹ); chỗ ký mặc định ghi chung CHỦ TỊCH, chọn người ký nếu muốn in tên', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['✍ Khai báo Hội – xã: rà chính tả tên Ban Thường vụ (khoảng trắng, viết hoa, chưa dấu, 2 dấu thanh, trùng tên) — báo ⚠ + nút “Sửa theo gợi ý”, không tự sửa', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch năm: thêm cách “Chọn tháng” bằng chip (vd T3, T5, T7) + Chọn nhanh Cuối quý / Tháng lẻ / Tháng chẵn; Xem / In là lưu kế hoạch, có 🗑 Xóa kế hoạch; Báo cáo tổ (Mẫu 04) có hàng “Theo kế hoạch” bấm tháng là tích sẵn tổ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📥 Nạp số liệu: ô Danh sách tổ TK&VV (DSTO) báo số tổ (vd 369 tổ) thay cho số dòng', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🔍 Kiểm tra tháng: bảng đối chiếu thêm cột “Dư nợ CT” (dư nợ, quá hạn, khoanh, cho vay / thu nợ tháng, tiền gửi 105, số KH) cạnh Mẫu 31; mục mới “Mẫu 31 ↔ Dư nợ chi tiết” báo khớp / lệch + danh sách món lệch (chỉ báo, không sửa). File Dư nợ chi tiết nạp ở 3.120 cần nạp lại 1 lần', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📥 Nạp số liệu: thêm dòng riêng “Dư nợ chi tiết” ngay dưới Mẫu 31 — file này chỉ dùng tham chiếu số TK 105 (10 chữ số) và điểm giao dịch xã; mọi số dư nợ, lãi, số dư 105 vẫn lấy từ Mẫu 31. Thả file vào “Nạp nhiều file” app tự nhận dòng', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🌳 Chọn tổ: chip và danh sách tổ xếp theo ấp (cùng ấp theo tên tổ trưởng), hết lộn xộn', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🗑 Bỏ hẳn Mẫu 10: không nhận file Mẫu 10 nữa; bản Mẫu 10 đã nạp tự bỏ (file trên Drive vào Thùng rác, lấy lại được 30 ngày) — hết số TK 105 sai dạng 1482…', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📄 Phân công BTV: tên Hội dài ở đầu văn bản xuống dòng trước "XÃ / PHƯỜNG …" (như Kế hoạch), không còn ngắt giữa tên xã', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📄 Phân công BTV: lấy đủ ấp / khu phố của xã theo thứ tự cây, mở lần đầu tự chia sẵn (Chủ tịch / Bí thư ít hơn, rồi Phó, Ủy viên — mỗi người 1 đoạn liền nhau), nút ⇄ Chia lại đều; hộp có ô Nhiệm kỳ, Số HĐ ủy thác, Ngày ký HĐ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Rà mẫu chung 06 / 16 / 04: "Chức vụ:" có hai chấm; chữ sau dòng chấm cách 1 khoảng; tên đơn vị dài xuống dòng trước "xã / phường"; chức vụ dài viết tắt BTV / BCH; Mẫu 16 "(tỷ lệ 0%)" hết dính', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 06: Cán bộ chứng kiến ngang hàng Cán bộ kiểm tra, số tiền dòng Cộng in đậm, số dài tự thu chữ không rớt dòng · Mẫu 16 / 04: có tên đơn vị thì bỏ dòng "ĐƠN VỊ KIỂM TRA" · Mẫu 04: nơi nhận ghi "PGD NHCSXH Gò Dầu"', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📄 Thông báo phân công nhiệm vụ Ban Thường vụ (Hội / Đoàn): ở 🏛 Khai báo Hội đoàn thể, nút 📄 Phân công BTV cạnh tên mỗi Hội — tích ấp mỗi người phụ trách kiểm tra (hoặc ⇄ Gợi ý chia đều), kiêm kế toán / thủ quỹ; xuất Word hoặc In. Thẻ thêm ô Phó Chủ tịch 2, 3 và Nhiệm kỳ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 06 phân trang: 1 mặt chứa tối đa 3 dòng khế ước (lề trên / dưới 1 cm); nhiều hơn thì 1 khách nhiều khế ước không bị cắt đôi, hộ cuối sang trang cùng dòng Cộng + nhận xét + ký (Word và bản In)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 16 Bảng II (khi chọn điền): bỏ chữ "đầy đủ" — ghi "Có thực hiện", "Có tham gia", "Đảm bảo đúng thành phần", "Có lưu giữ"; điều cấm vẫn ghi rõ "Không"', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 06: dòng "Thời điểm · Địa bàn · Tổ TK&VV" không rớt dòng — thu khoảng cách, dài thì bỏ "tỉnh Tây Ninh", vẫn dài thì viết tắt KP / P. / X.; cột Chương trình canh giữa ô; tên cán bộ kiểm tra in dưới khối ký', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 16: tên Trưởng đoàn và Tổ trưởng in dưới khối ký; Bảng II (khi chọn điền) ghi như mẫu tham khảo: "Theo cụm dân cư liền kề", "Tại văn phòng ấp, định kỳ theo quý", "Thực hiện đầy đủ"…', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch ①: sửa 2 chỗ dính chữ (")? Các hình thức", "Lưu: VT")', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🖨 KTGS: bấm In / Word / Xem của mẫu nào thì hiện hộp chọn của mẫu đó — Mẫu 06: mục đích in / trống, người kiểm tra; Mẫu 16: nhận xét gợi ý / trống, Bảng II trống / theo 727, 2 người kiểm tra; Mẫu 04: nhận xét, 2 người; Kế hoạch: người ký. Nút ✚ Điền đầy đủ; app nhớ lựa chọn', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['👤 Người kiểm tra chọn theo vai trò (Phó Chủ tịch mặc định / Chủ tịch / ủy viên BTV / để trống) — tên lấy theo Khai báo Hội của từng tổ; Mẫu 04 in tên Trưởng đoàn; Kế hoạch chọn người ký, chức danh luôn CHỦ TỊCH', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Nhận xét Mẫu 16 / 04 liệt kê thêm hộ nợ quá hạn, nợ khoanh (tối đa 10 hộ) kèm đề xuất nhẹ nhàng: xây dựng kế hoạch trả nợ, trả dần; động viên trả khi có điều kiện', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📅 Kiểm tra đột xuất: ô Ngày kiểm tra nằm cạnh nút In; các tab mẫu bỏ khung ✎ Khai báo', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['☁ Toàn bộ cài đặt lên Drive (bảng khai báo Hội, chuẩn hóa, lịch kế hoạch, bảng ngành, lựa chọn in…): mở app là tự lấy phần máy khác vừa sửa rồi mới đẩy phần máy này đổi; 2 máy cùng sửa thì gộp, không đè. Độ rộng khung, đang xem, camera… vẫn riêng từng máy', "dongHop();moCaiDat('drive')"],
  ['🏛 KTGS Hội › Khai báo Hội đoàn thể — 1 nơi khai cho Mẫu 06, 16TD, 04, Kế hoạch: tên Hội cấp xã (trống = tên chuẩn), Chủ tịch, Phó Chủ tịch, tối đa 5 ủy viên BTV, số / ngày HĐUT, KH Hội tỉnh; tab nhỏ 📖 Chuẩn hóa quy tắc (ô đã sửa tô xanh, ↺ từng ô)', "dongHop();D.cauHinh.slTab='kt';ktCH().che='hdt';doiNgan(7)"],
  ['👤 Người kiểm tra Mẫu 06 / 16 / 04 mặc định = Phó Chủ tịch; người ký Kế hoạch = Chủ tịch (khai báo cũ tự chuyển sang). Các tab mẫu chỉ còn dòng nhắc Hội nào chưa khai', "dongHop();D.cauHinh.slTab='kt';ktCH().che='hdt';doiNgan(7)"],
  ['🗓 Kế hoạch KTGS ① ②: chọn căn cứ 727 (từ 11/02/2026) hoặc hướng dẫn cũ 10566 (kế hoạch lập trước 727) — chỉ thay dòng căn cứ đầu, nội dung giữ nguyên; nhớ theo Hội', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 06 theo mẫu gốc: dòng "Thời điểm · Địa bàn · Tổ TK&VV" (dài thì Tổ xuống dòng), "Đơn vị tính" dòng riêng, "Đơn vị kiểm tra" canh trái; tiêu đề xích xuống; tên người vay viết hoa đầu từ; 1 món 2 dòng; cột tiền thực tế gọn, Vào việc rộng; chương trình / mục đích dài nhỏ 1 cỡ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 06: cột Nợ lãi (kiểm tra thực tế) điền sẵn lãi tồn (triệu đồng), dòng Cộng có tổng; tổng giải ngân / dư nợ không rớt chữ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 16: "ĐƠN VỊ KIỂM TRA" canh giữa; Bảng II điền sẵn theo 727 (x / Không / Định kỳ theo quý) — chọn "Để trống" ở khung khai báo nếu muốn ghi tay', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📷 Ảnh scan khôi phục không còn ngày tương lai (vd 2036) — lấy hôm nay', "dongHop()"],
  ['🗓 Kế hoạch KTGS ① ②: sửa chữ dính ("Địa điểm: Văn phòng", "xã giao đồng chí", "Hội nhận ủy thác"… 10 chỗ)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 04: dòng ngày "Gia Lộc, ngày … tháng mm năm yyyy" theo tháng kiểm tra; III. Nội dung kiểm tra ghi sẵn theo văn bản 727; nhận xét từng tổ có lãi tồn; kiến nghị a) b) c) ghi nhẹ nhàng, liệt kê hộ có món không giao dịch từ 3 tháng và lãi tồn trên 6 tháng lãi (tối đa 10 hộ mỗi tổ)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 16: chưa khai ngày thì tháng / năm theo tháng kiểm tra; Tồn tại / Kiến nghị ghi tên hộ có món không giao dịch từ 3 tháng, lãi tồn trên 6 tháng lãi', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⚙ Bảng khai báo Hội – xã: dòng "In ra" xuống dòng gọn trong ô (không đè ô bên), rê chuột xem đủ; số KH dạng 06-KH/HNDT không còn bị nhắc cam', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch KTGS ② (và ①): gạch dưới tên cơ quan màu đen, xích lên; gạch dưới tiêu ngữ xích xuống; tên Hội dài tự xuống cỡ 12 (quá dài thì 2 dòng gọn trước "PHƯỜNG / XÃ"); bỏ gạch đầu dòng câu "Hội … xây dựng kế hoạch"', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Nạp thêm "Danh sách tổ TK&VV" (file …_DSTO.xlsx, loại phụ) cùng Thông tin tổ trưởng: tổ thiếu trong file tổ trưởng lấy điểm GD theo DSTO; ② Kiểm tra đối chiếu 2 danh sách với Mẫu 31 (tổ thiếu, tổ không còn món, lệch điểm GD, Hội, tổ trưởng / SĐT)', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['✍ Tên tổ trưởng / tổ phó hiện và in "Nguyễn Văn A": bỏ "Ông / Bà" đầu tên, tên không dấu lấy lại tên có dấu theo Mẫu 31, viết hoa chữ đầu mỗi từ — tên hộ vay giữ nguyên như hệ thống', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🧾 Đọc đủ dòng file Excel khai sai vùng dữ liệu (DSTO hệ thống khai tới dòng 14 dù có 380 dòng)', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📍 Tổ không có trong file Thông tin tổ trưởng tháng này (file hệ thống xuất thiếu): lấy điểm GD theo bảng tổ tháng gần nhất → danh bạ tổ → ấp → ngày GDXA; dòng báo vàng ở KTGS Hội ghi rõ số tổ thiếu và bảng từng tổ kèm căn cứ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📍 Vay trực tiếp (không qua tổ) xếp vào điểm GD theo ấp của món, rồi mới theo ngày GDXA; xã chỉ 1 điểm thì lấy luôn — hết mục "(chưa rõ điểm GD)" do món trực tiếp', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🛡 KTGS Hội: cây chọn không còn mục "Trực tiếp" / "Vay trực tiếp" (kiểm tra theo tổ); các tab khác giữ nguyên', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 16: dòng "ĐOÀN KIỂM TRA:" tự in tên Hội cấp xã của tổ (Hội Nông dân xã …, Đoàn Thanh niên phường …); bỏ ô khai Đoàn kiểm tra', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Chép file: nút 📋 trên từng dòng văn bản (1 file) · ☑ Chọn chép nhiều file rồi Ctrl+V một lần vào Zalo / email / thư mục (tối đa 20 file mỗi lần, có Chép tiếp) — cần cài lại cầu nối 1 lần (bản 2)', "dongHop();doiNgan(1)"],
  ['📋 Mẫu 04: Đoàn kiểm tra lấy cán bộ Mẫu 06 / 16 + 2 dòng Ông (bà) in sẵn; thời gian "Tháng mm/yyyy" (tháng sau số liệu); địa điểm ấp, xã, tỉnh; nhận xét từng tổ theo số liệu (văn bản 727); kiến nghị để ghi tay; thêm dòng ghi tài liệu', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch ①: thành phần ghi chung "… thành lập đoàn kiểm tra gồm: Các đồng chí Chủ tịch, Phó Chủ tịch, Ủy viên Ban Thường vụ …" · Kế hoạch ②: đủ 3 căn cứ như ① (chưa khai thì để chấm)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⚙ Bảng khai báo Hội – xã: dưới mỗi ô có dòng "In ra:" (chữ sẽ in, tự lấy / đã gõ, ↺ về chuẩn, nhắc cam khi nghi gõ sai); bỏ ô Đoàn kiểm tra; dọn dữ liệu cũ không dùng', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 Kế hoạch KTGS ① ②: gạch đầu dòng chuẩn — mọi dòng "- …" / "+ …" thụt đầu dòng đều nhau, bỏ dấu cách thừa (mục Ban quản lý Tổ TK&VV…)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['✍ Ghi tên tác giả NhanNT (chữ xanh lá nhỏ) ở dải trạng thái dưới cùng, Cài đặt, Hướng dẫn, cửa sổ nổi HSSV và HanTraHSSV.exe — không gắn vào biểu mẫu in', "dongHop()"],
  ['🔎 Tra cứu KH: tên hộ vay + mã KH luôn nổi bật (danh sách và đầu thẻ)', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['🔎 Tra cứu KH: cột trái / phải 40 / 60 (danh sách không còn mất chữ); dòng HSSV tô màu tên trường + khóa học, ngày nhập học → ra trường để đối chiếu khi cho vay năm mới', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['📌 Cửa sổ nổi HSSV: mặc định thu gọn (5 khối + câu chốt), ▾ Chi tiết mới hiện bảng / kỳ trả / cách tính, ▁ thu nhỏ còn 1 dải (ô ra trường, tiền vay, 1 dòng kết quả); nút ☀ / 🌙 đổi nền sáng / tối riêng cửa sổ nổi; khối HSSV đẹp hơn ở nền tối', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['📌 Hạn trả HSSV có nút Nổi: cửa sổ nhỏ luôn nằm trên trình duyệt / chương trình nghiệp vụ (Chrome, Edge) để vừa nhìn vừa nhập; dùng chung số liệu với ô trong app, ↩ đưa về. Máy không dùng được thì có công cụ riêng HanTraHSSV.exe (thư mục tools/hssv)', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['🎓 Hạn trả HSSV: tiền vay gợi ý tính theo năm học (từ tháng 9) — ra trường tháng 6–8 tròn năm, tháng 2–5 nửa năm, tháng 9 – tháng 1 tính vào năm trước; vay tháng 1–5 năm đầu tính nửa năm; ô Cách tính liệt kê từng năm học', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['🎓 Hạn trả HSSV: ô Ngày vay tự gợi ý ngày giải ngân = ngày giao dịch (GDX) gần nhất kể từ hôm nay (hôm nay đúng GDX thì lấy hôm nay); đổi GDX thì gợi ý lại; gõ đè nếu khác', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['🎓 Hạn trả HSSV: app tự gợi ý tiền vay theo thời gian phát tiền vay (mỗi nửa năm = 5 tháng = 20 triệu, năm = 40 triệu, không tính lẻ) — ô Tiền vay điền sẵn, gõ đè nếu cần; kết quả 3 khối lớn (số tiền vay + số tháng vay, thời hạn, hạn cuối) + 2 khối phụ nhỏ (trả mỗi lần, lần đầu)', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['📄 Mẫu 06 gọn hơn: đã điền Đơn vị thì bỏ dòng chấm thứ 2; chữ “Chức vụ” 2 dòng cán bộ thẳng cột; địa bàn “ấp / khu phố …, xã / phường …, tỉnh Tây Ninh” rồi Tổ TK&VV; cột Mục đích rộng (~3,7 cm), dòng cao 1,5 cm (ghi được 3 dòng); 1 khách nhiều khế ước chỉ ghi tên, ô ký 1 lần; hộ xếp theo mã KH; món có 2 mục đích (PNKT52, vd nước sạch + vệ sinh) in đủ cả 2', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🧹 KTGS chỉ phục vụ in mẫu: bỏ theo dõi “đã lập phiếu”, lịch sử / lần kiểm tra trước, nhật ký gửi sang Mẫu 04 (dữ liệu cũ vẫn giữ, không dùng)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📋 Mẫu 04 có 2 chỗ lập: ① chọn xã / hội ở cây → tích cả ấp hoặc từng tổ (không tích sẵn, ngày tùy chọn) · ② trong 🗓 Kế hoạch năm: chọn tháng có lịch → Mẫu 04 theo đúng tổ của tháng đó, in cùng Kế hoạch', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📅 Sau giải ngân: mỗi tổ 1 phiếu cho cả lần kiểm tra (gom các tháng đã chọn); xem trước mỗi phiếu là 1 tờ riêng (không còn nối đuôi)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['👥 Danh sách chọn hộ (đột xuất, sau giải ngân, định kỳ) chung 1 kiểu: mã KH, món (mã KV, số KU, CT, dư nợ, ngày GN), lãi tồn, số dư 105, ghi chú tình trạng — xếp theo mã KH', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📖 Bảng chuẩn hóa Hội – Đoàn (trong khung ✎ Khai báo của Kế hoạch / Mẫu 04): tên, đầu trang, chức danh ký, cấp trên… sửa 1 chỗ cho mọi mẫu; Đoàn: Tỉnh Đoàn, Bí thư; ký TM. BAN THƯỜNG VỤ; phường → “phường”, “khu phố” trong Kế hoạch, Mẫu 16', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['✎ KTGS: khai báo nằm ngay trong tab của mẫu (khung thu gọn được, không còn hộp bật lên); cán bộ kiểm tra khai 1 bảng theo Hội – xã (4 người / xã), phiếu tự lấy đúng người của Hội phụ trách tổ — khi in chọn "Để trống" nếu muốn điền tay; khai báo được nhớ lần sau', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📄 Văn bản không liên quan chương trình vay không còn bị kẹt ở Chờ khai (CT vay không bắt buộc); sắp xếp thêm kiểu "Vừa thêm" — file mới đưa vào tủ lên đầu', "dongHop();doiNgan(1)"],
  ['🏷 Đơn vị kiểm tra Mẫu 06 / 16 tự điền Hội cấp xã của từng tổ (Hội Nông dân xã …, Hội Liên hiệp Phụ nữ phường …, Đoàn Thanh niên xã …) — đủ chỗ viết đủ, thiếu chỗ viết gọn; gõ "-" để chừa dòng chấm. Đầu trang Kế hoạch: Đoàn "ĐTN XÃ …", Hội LHPN "HỘI LHPN XÃ …"', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📝 Mẫu 16: chữ in sẵn “thôn/tổ dân phố, xã/phường/đặc khu” thành đúng chữ; tên Hội đầy đủ (hết lỗi “Hội Đoàn Thanh niên”); Chức vụ thẳng cột; gợi ý nhận xét theo số liệu (ô kết quả số tổ viên / lãi tồn / quá hạn, ưu điểm – tồn tại – kiến nghị) — chọn “Để trống” nếu muốn ghi tay', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📍 Tổ chưa có trong file Thông tin tổ trưởng (tổ mới / tách) không còn “(chưa rõ điểm GD)”: app suy điểm GD theo danh mục địa bàn của ấp → tổ cùng ấp → tổ cùng xã cùng ngày GDXA, có dòng báo để anh biết', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🗓 KTGS Hội › Định kỳ theo lịch · Mẫu 06 + 16: chọn số liệu cuối tháng (vd 30/09) → kiểm tra tháng sau (10/2026), ngày để trống; tổ gợi ý theo lịch Kế hoạch 01/KH (chọn thêm / bỏ tự do); Mẫu 06 = hộ có món giải ngân các năm trước, tích sẵn 100%, báo ≥ 90%; hộ quá hạn / khoanh không tích (tích tay khi cần); Mẫu 16 kèm theo; Mẫu 04 tự nhận các tổ này', "dongHop();D.cauHinh.slTab='kt';ktCH().che='dk';doiNgan(7)"],
  ['📆 Ô Số liệu (Tổ TK&VV, Sao kê, KTGS) mặc định Mẫu 31 cuối tháng gần nhất; số liệu theo ngày nằm nhóm riêng, chỉ dùng khi anh chọn (mở lại app về cuối tháng)', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🔓 BC0437 / BC0438 bên KTGS không theo khóa tháng của số liệu — tháng đã chốt vẫn nạp / thay được', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['↺ Gợi ý lại (kiểm tra đột xuất) mỗi lần bấm ra lượt hộ khác, ưu tiên hộ chưa kiểm lần trước; hiện số hộ tốt / cần quan tâm để biết vì sao 2 kiểu ra giống nhau', "dongHop();D.cauHinh.slTab='kt';ktCH().che='dx';doiNgan(7)"],
  ['🗓 Kế hoạch 01/KH thêm khuôn ② mẫu gọn (theo bản kế hoạch mẫu của Hội xã) — chọn ① / ② trên màn Kế hoạch; khai báo xếp theo thứ tự trên mẫu; bảng đầu trang / chữ ký không viền, Quốc hiệu không rớt dòng', "dongHop();D.cauHinh.slTab='kt';ktCH().che='kh';doiNgan(7)"],
  ['🗓 KTGS Hội › Kế hoạch năm · 01/KH: chọn năm → xã → hội → app lấy 100% tổ của Hội tại xã, gom theo ấp, xếp sẵn tháng 02 → 10 (đổi được cả ấp / từng tổ, nhắc nếu còn tổ chưa xếp) → 👁 Xem → Word / In; khuôn theo dự thảo HĐT cấp xã, căn cứ 727, tối thiểu 90%, không ghi số hộ', "dongHop();D.cauHinh.slTab='kt';ktCH().che='kh';doiNgan(7)"],
  ['📋 KTGS Hội › Báo cáo tổng hợp · Mẫu 04/BC-TH: chọn tháng → các tổ đã lập phiếu trong tháng tích sẵn (thêm tổ bằng cây, sửa ngày) → mỗi Hội – xã 1 báo cáo → 👁 Xem → Word để sửa / In; Word đúng khuôn mẫu gốc, bỏ khung MẪU THAM KHẢO, chỗ ghi tay để dòng chấm (I.1: 4 dòng, III: 4, mỗi mục IV: 3)', "dongHop();D.cauHinh.slTab='kt';ktCH().che='bc';doiNgan(7)"],
  ['⚙ Khai báo Hội: tên đơn vị, số / ngày Hợp đồng ủy thác, Kế hoạch KTGS của Hội tỉnh, Đoàn kiểm tra, người ký — khai 1 lần, Mẫu 04 (và Kế hoạch 01/KH sắp làm) tự điền', "dongHop();D.cauHinh.slTab='kt';ktCH().che='bc';doiNgan(7)"],
  ['👤 Tra cứu KH gọn: danh sách 2 dòng/khách (điện thoại 50 dòng + Xem thêm, ↑ ↓ Enter); thẻ chia nhóm — số tóm tắt (dư nợ, QH, khoanh, lãi tồn, 105) · nhân thân (CCCD + ngày cấp, cảnh báo hết / sắp hết hạn) · liên hệ & địa bàn · tiết kiệm · món vay có mục đích vay vốn; món HSSV ghi đủ tên SV, CCCD SV, trường, hệ, ngành, khóa', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['📋 Bấm vào giá trị (CCCD, mã KH, SĐT, khế ước, số TK…) là chép — bỏ các nút 📋 riêng; bỏ nút Hồ sơ hộ ở thẻ khách, thêm 👥 Mở tổ', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['🔍 Kiểm trùng 2 ô (CCCD + họ tên): trùng CCCD người vay · trùng CCCD HSSV · TRÙNG TÊN VỢ/CHỒNG của người đang vay = người thừa kế · trùng họ tên — báo rõ trùng với ai, món nào, dư nợ, địa bàn', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['📋 Thêm file bằng cách dán: copy file (vd văn bản cũ trong thư mục) rồi bấm Ctrl+V trong app — nhận như kéo thả, xếp vào tab đang mở', "dongHop();doiNgan(1)"],
  ['📅 KTGS Hội › Sau giải ngân (30 ngày): chọn tháng (hoặc từ tháng → đến tháng) → chọn địa bàn → 👁 Xem → In / Word Mẫu 06 — mỗi tổ, mỗi tháng 1 phiếu (gồm cả HSSV nhận tiền lần 2 trở đi); chọn đến tổ thì tích / bỏ tích từng món', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['⚙ Bảng ngành kinh tế gọn: ngành nhiều món lên trên, ẩn ngành dưới 10 món (nút Hiện thêm / Thu gọn); cột Mục đích ghi “In mục đích vay vốn (theo hệ thống, rút gọn)”', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🛡 Số liệu có tab con mới KTGS Hội: nạp BC0437 (tổ TK&VV do HĐT quản lý) + BC0438 (ủy thác theo xã · hội) theo chuẩn tab Nạp — ma trận loại × tháng, nạp nhiều file (xem trước → ghi nhận), 🔍 kiểm tra BC0437 ↔ BC0438 ↔ Mẫu 31 ↔ KHĐ; xếp loại tổ tự tính theo công thức của file khi cột = 0; bảng các tổ có điểm, xếp loại', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['🧾 Chọn hộ kiểm tra đột xuất (Mẫu 06): gợi ý 6–8 hộ theo số tổ viên · Hộ tốt / Cần quan tâm / Trung hòa (6 tốt + 2 KHĐ) · bỏ hộ quá hạn, khoanh · có HSSV thì ≥ 1 món · món giải ngân dưới 30 ngày tự vào · tích thêm / bỏ được, có lý do từng hộ', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📄 Mẫu 06/TD Phiếu kiểm tra sử dụng vốn vay + Mẫu 16/TD Biên bản kiểm tra tổ: Word đúng 100% khuôn mẫu gốc (chỉ điền số liệu có sẵn, thiếu thì giữ dòng chấm; ngày + đoàn khai khi in; cột Mục đích chọn Để trống / In ngành kinh tế rút gọn — tên ngành anh sửa ở ⚙ Bảng ngành kinh tế; dòng cao ≥ 1,2 cm có chỗ ghi thực tế), In / PDF cùng bố cục, sang trang lặp tiêu đề bảng', "dongHop();D.cauHinh.slTab='kt';doiNgan(7)"],
  ['📑 Sao kê bố cục mới: chọn 1 báo cáo (2 cột theo nhóm), thanh trên có Khổ Ngang / Dọc + 👁 Xem; in mỗi món 1 dòng, dọc bỏ Số KU, tràn thì bỏ SĐT rồi co chữ', "dongHop();D.cauHinh.slTab='sk';doiNgan(7)"],
  ['👥 Tổ TK&VV: chọn tổ hiện ngay toàn bộ tổ viên (Mã KH, dư nợ, 105, số TK 105, CCCD còn / hết hạn) + nút lọc Đề xuất cho ra · Không dư nợ còn 105…; chưa chọn tổ thì ra bảng các tổ (tổ viên, mới vào, cho ra, KQGD tháng)', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['🏷 Vay trực tiếp (không qua tổ) nằm đúng xã / điểm GD, hội “Trực tiếp”; bỏ chip xã giả', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📊 Tổng hợp in theo khuôn 01.1: A4 ngang lề 7 mm, tiêu đề 2 tầng, hàng số cột, triệu đồng 2 số lẻ · 👤 Tra cứu KH 2 cột (trái danh sách, phải chi tiết + hạn CCCD)', "dongHop();D.cauHinh.slTab='th';doiNgan(7)"],
  ['👤 Kiểm trùng CCCD ghi rõ “Chưa vay vốn, có thể nhập máy” / “Trùng — đang vay vốn”', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['🔍 Kiểm tra tháng: tháng chưa có file Ⓐ chuẩn TW / Ⓑ chi tiết nào thì không kiểm, không còn hiện kết quả kiểm cũ (lưu từ bản trước)', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🏠 Sao kê nợ đến hạn kỳ con (CV 597): nhà ở xã hội + cho vay trực tiếp + ủy thác vay từ 01/03/2026 — kỳ đã đến hạn chưa trả, kỳ tới, hạn nộp 08/TD; danh sách nợ gốc đến hạn phân kỳ theo tổ gửi tổ trưởng; nạp file “Nợ đến hạn phân kỳ” để có đúng số tiền kỳ', "dongHop();D.cauHinh.slTab='sk';doiNgan(7)"],
  ['🛠 Scan: bản chỉ có PDF trên Drive (quét ở máy khác) đổi tên không còn báo “Chưa lên Drive” / “không có trang” — app chỉ đổi tên, dời file trên Drive', "dongHop();doiNgan(4)"],
  ['📅 Nợ đến hạn tính đúng theo hạn hợp đồng + kỳ GDXA chuyển quá hạn, chia 3 khung (quá hạn HĐ chưa chuyển QH · chuyển QH trong kỳ · chuyển QH kỳ sau), có Mã KH, SĐT, NV, lãi tồn, số dư 105, nút chọn nhanh Tháng sau / Đến cuối quý / Đến hết năm, in A4 dọc', "dongHop();D.cauHinh.slTab='sk';doiNgan(7)"],
  ['🔒 Kiểm tra & chốt tháng: đủ file + đã kiểm = Đạt → Chốt (khóa, không nạp đè / thay / xóa; mở khóa có xác nhận) — chỉ để biết và chốt, không sửa số', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📋 Ma trận: mỗi nhóm Ⓐ Ⓑ Ⓒ Ⓓ bấm sổ / gọn, thu gọn thì hiện chip 7/7 ✓; chọn tháng bằng chữ Việt; máy tính chia 2 cột, điện thoại vuốt ngang 2 khung', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🏷 Chương trình ghi tên viết tắt thống nhất (HN, HSSV, HSSVSTEM, GQVL, NSVSMT, MTN, HCN, APT, XKLD, NOXH…), cuối báo cáo có chú thích', "dongHop();D.cauHinh.slTab='sk';doiNgan(7)"],
  ['📥 Số liệu gọn lại: ma trận file theo tháng là màn chính (mỗi loại 1 dòng, chấm tròn = nhóm), ① tình trạng tháng còn 1 dòng (Ⓐ x/7 · Ⓑ y/3 · file thiếu bấm để nạp)', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🔍 Kiểm tra có bảng đối chiếu chéo: chỉ tiêu × nguồn (BCDHTD · LEN_31 · B32 · Mẫu 31 · Mẫu 10), xanh khớp / đỏ lệch / vàng lưu ý, chọn toàn PGD hay từng xã, bấm ô xem chi tiết; mục đạt gom 1 dòng', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['⬇ Tải file gốc (bản sao Excel để dùng việc khác) từng ô hoặc cả tháng · 🧹 Tìm file rác của Số liệu (riêng phần Số liệu, tích rồi xóa)', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📥 Số liệu nạp thêm 7 file chuẩn TW mỗi tháng (BCDHTD 01.1, 01.2 · B32 · LEN_31 XAPUONG / DONVIUT / CHTRINH / TO_TRUONG); file chia nhóm Ⓐ chuẩn TW · Ⓑ chi tiết · Ⓒ theo ngày · Ⓓ phụ; bỏ Mẫu 7 và Sao kê KH; 3 tháng KHĐ chỉ nhận mẫu 14 (DL Tháng)', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📊 Tab con mới Tổng hợp: tích tiêu chí (theo xã, chương trình, đơn vị hành chính, hội, tổ trưởng, tiền gửi, nguồn vốn TW/ĐP) + bộ lọc phạm vi → Xem → In A4 ngang / Excel; lọc sâu hơn tính từ Mẫu 31 ghi “tham khảo” và tự đối chiếu số chuẩn', "dongHop();D.cauHinh.slTab='th';doiNgan(7)"],
  ['🔍 Kiểm tra tháng thêm: số chuẩn TW khớp nhau (BCDHTD ↔ LEN_31 ↔ B32) và Mẫu 31 ↔ số chuẩn TW (từng xã, nguồn vốn, từng tổ), KHĐ ↔ Mẫu 31, tổ trưởng ↔ LEN_31', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🗂 Mẫu 31 / file TW xuất giữa tháng: app tự đọc ngày trong file — cuối tháng vào ô tháng, ngày khác vào ô theo ngày · 🔁 Thay file 1 ô (phải đúng loại, đúng kỳ) · 🗑 Xóa cả bộ tháng · ♻ Làm mới toàn bộ số liệu', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🖨 Mọi báo cáo in theo lề chuẩn: trên 2 · dưới 2 · trái 3 · phải 2 cm, có số trang, cuối báo cáo ghi “PGD NHCSXH GÒ DẦU”; thẻ tổ có chỉ tiêu chuẩn TW từ LEN_31', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📑 Số liệu có thêm tab con Sao kê: chọn phạm vi (xã → điểm GD → hội → tổ) → tích → Xem → In / Excel: nợ quá hạn · nợ khoanh · KHĐ · số điện thoại (đánh dấu số trống / không đạt) · nợ đến hạn từ ngày đến ngày (ngày GDXA + hợp đồng, còn được gia hạn) · giải ngân trong tháng · món thay đổi dư nợ · khách cần mở TK 105', "dongHop();D.cauHinh.slTab='sk';doiNgan(7)"],
  ['👤 Tra cứu KH: gõ CCCD là kiểm trùng ngay (khách đang vay + CMND HSSV → “chưa vay vốn, có thể nhập máy” hoặc trùng với ai) · gõ tên tìm cả vợ/chồng, HSSV, hiện xã · ấp · tổ · tình trạng · chọn 📍 phạm vi để thu hẹp', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['🛠 Tổ TK&VV: máy chưa có bảng số liệu (lưu trên Drive, chưa tải về) thì cây tổ vẫn hiện (lấy từ danh bạ) và báo rõ, có nút ☁ Nối Drive và tải / ⟳ Thử lại — trước đây cây trống, không báo', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['👥 Số liệu có thêm tab con Tổ TK&VV (cạnh Tra cứu KH): chọn tổ theo cây Xã → Điểm GD → Hội → Tổ (phím như các hộp khác, chip chọn nhanh) hoặc gõ tên tổ trưởng; tích báo cáo → Xem → In / Excel: Danh sách hộ vay · Nợ cần xử lý (quá hạn, khoanh, KHĐ trên 1 trang A4) · TK 105 của tổ', "dongHop();D.cauHinh.slTab='to';doiNgan(7)"],
  ['📈 Số liệu theo tháng: chọn tháng → ① file của tháng (đủ / thiếu, nạp ngay) → ② 🔍 Kiểm tra (đủ file, toàn vẹn, khớp giữa các file, với tháng trước, Mẫu 31 ↔ Mẫu 10, theo từng tổ với Mẫu 7) — kết quả lưu lại, dữ liệu đổi thì báo kiểm lại; bảng nhiều tháng thu gọn được', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📈 Số liệu: tách Mẫu 31 (chốt tháng) và Mẫu 10 (dư nợ theo ngày, nạp ngày nào cũng được) — app tự nhận loại theo cột, tự đọc ngày số liệu; Mẫu 10 đã nạp trước đây tự chuyển sang dòng mới, không mất dữ liệu', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['🧾 Khách có nhiều sổ 105: dòng lặp giữ nguyên như file (không gộp), dư nợ không cộng trùng, số dư 105 lấy 1 lần mỗi khách (sửa lỗi cộng thừa ở 3.86) · thêm loại Mẫu 7 Kiểm tra Tổ TK&VV; file xuất sau ngày số liệu thì cảnh báo', "dongHop();D.cauHinh.slTab='nap';doiNgan(7)"],
  ['📈 Số liệu: đọc Mẫu 31 "Hồ sơ tín dụng chi tiết theo kỳ số liệu" (175 cột, thay Mẫu 10) — giữ đủ mọi cột, gộp khế ước trùng (khách 2 sổ 105), lưu cả món đã tất toán và khách chỉ gửi tiết kiệm; đối chiếu dư nợ tháng trước + phát sinh', "dongHop();doiNgan(7)"],
  ['👤 Tab Số liệu chia 2 tab con: 📥 Nạp số liệu · 👤 Tra cứu KH (ô tìm riêng: tên, CCCD, mã KH, SĐT, số khế ước kể cả món đã tất toán, ngày sinh) · ô tìm chung không còn tra khách hàng — ở tab Số liệu thì gợi ý nhảy sang tab Văn bản / Scan… có kết quả', "dongHop();D.cauHinh.slTab='tra';doiNgan(7)"],
  ['📈 Tab mới Số liệu: nạp bộ file Excel hằng tháng (cả bộ hoặc từng file) — app tự nhận loại theo cột trong file, lấy đúng dòng dữ liệu, kỳ theo ngày trong file; lưu dạng đọc nhanh trên Drive; đối chiếu tổng dư nợ, quá hạn, khoanh', "dongHop();doiNgan(7)"],
  ['👤 Tra khách hàng ở ô tìm: gõ tên (không dấu), CCCD, mã KH hoặc năm sinh → thẻ khách hàng có CCCD, ngày cấp, địa chỉ, nút chép, các món vay · Tab Tháng: bỏ 7 dòng sao kê thuần Excel, dòng XLS không còn tính thiếu', "dongHop();doiNgan(7)"],
  ['✍ Tab Scan: bản tên không dấu (từ Lập chỉ mục) → đề xuất tên có dấu theo khách Theo dõi nợ, anh tích rồi mới đổi · ⌨ phím chung cho hộp hồ sơ hộ, lần làm việc, lịch · 📥 chip chờ khai gọn trên điện thoại', "dongHop();doiNgan(4)"],
  ['📊 Công cụ Giao ban: Theo dõi nợ kỳ này so kỳ trước theo xã, điểm GD, tổ tăng / giảm, món mới vào / đã ra + nhận định gợi ý · 📅 Buổi GD: cam kết đến hạn, món cần đôn đốc, hồ sơ thiếu ở điểm — In / Chép gửi Zalo', "dongHop();doiNgan(0);ccMo('giaoban')"],
  ['🏠 Hồ sơ hộ 1 trang: CCCD, hồ sơ quét, Chữ ký·CCCD, bộ hồ sơ, mọi món vay, lần làm việc, tóm tắt hồ sơ hộ — gõ tên ở ô tìm, nút 🏠 trên dòng Scan hoặc thẻ món vay', "dongHop();doiNgan(4)"],
  ['🛟 An toàn dữ liệu: luôn gộp với Drive trước khi ghi, chặn ghi trống, giữ bản dự phòng đầu ngày · Dọn kho › 🛟 Sao lưu: 7 bản trong máy + Drive, lấy lại mục bị thiếu', "dongHop();moDonKho('saoluu')"],
  ['☁ Bản scan tài liệu có PDF trên Drive không còn báo nhầm "Chưa có trang" · ♻ Khôi phục gắn ảnh vào đúng bản đã có, không tạo trùng', "dongHop();doiNgan(4)"],
  ['🔗 Hộp sửa: văn bản liên quan chỉ ghi số hiệu (rê chuột thấy tên), chung 1 hàng với Ghi chú riêng; Trích yếu 1 dòng — vừa 1 khung cả màn 1280', "dongHop();doiNgan(1)"],
  ['🛠 Sửa lỗi mất danh sách Scan (xóa / gộp văn bản trước khi mở tab Scan) · tab Scan có nút ♻ Khôi phục từ ảnh còn trong máy', "dongHop();doiNgan(4)"],
  ['▭ Hộp sửa gọn trong 1 khung: chip tag nhỏ (3 hàng, cuộn trong khối), ô ＋ tag đứng đầu, hàng nút Lưu / Thôi thấp lại', "dongHop();doiNgan(1)"],
  ['💡 Hộp sửa: hướng dẫn + ví dụ hiện ở dải chip xanh cố định đầu hộp — không còn bong bóng che ô', "dongHop();doiNgan(1)"],
  ['🔗 Khung xem: văn bản liên quan gọn 1 dòng chip số hiệu dưới tên (bỏ khối dòng thời gian)', "dongHop();doiNgan(1)"],
  ['⚠ Văn bản trùng số hiệu: chip ⚠ trùng trên dòng + chip lọc "Trùng số hiệu"; bấm để Gộp (giữ 1 bản, gộp liên quan, tag, ⭐; bản kia vào thùng rác)', "dongHop();doiNgan(1)"],
  ['📥 Lưu file mới trùng số hiệu + năm với văn bản đã có → hỏi Bỏ file mới / Giữ cả 2 / Lưu rồi gộp', "dongHop();doiNgan(1)"],
  ['🔎 Lọc không sót: mỗi nhóm có chip Chưa gắn… (chưa có ngày, mảng, CT, tag); lọc 1 CT ra cả văn bản Tất cả CT', "dongHop();doiNgan(1)"],
  ['⌨ Ô gõ chữ: ← → chỉ di chuyển trong ô (không nhảy ô) · ô chọn (Xã, Ấp, Tổ…) vẫn ← → qua lại ô', "dongHop();doiNgan(4)"],
  ['📷 Tự chụp nhanh hơn: giữ yên 0,5 giây (trước 1 giây), đỡ run tay; app lấy khung hình nét nhất · nút ⏱ đổi Nhanh / Vừa / Chắc', "dongHop();doiNgan(4)"],
  ['🪪 Hộp sửa bản quét gọn 1 màn hình: trái ô nhập, phải xem bản quét — giống hộp sửa văn bản', "dongHop();doiNgan(4)"],
  ['⌨ Phím chung: Enter / Tab sang ô kế, Shift lùi, ↑ ↓ chọn; Xã / Điểm / Ấp còn trống thì báo, chưa cho sang ô con', "dongHop();doiNgan(4)"],
  ['📋 Khung xem PDF: bôi đen, Ctrl+C chép chữ được như PDF thường · nút 📋 chép cả trang · trang ảnh có 🔍 Đọc chữ (OCR)', "dongHop();doiNgan(1)"],
  ['↑ Danh sách lên cao hơn: số kết quả nằm đầu hàng Sắp xếp, bỏ khoảng trống dưới hàng lọc · 📂 Ổ G / ☁ Drive thành nút nhỏ', "dongHop();doiNgan(1)"],
  ['🔒 Chép sang AI: bảng có họ tên / CCCD / điện thoại thì cảnh báo và che sẵn (KH1, KH2…, ***), số tiền giữ nguyên · cộng thử đọc đúng số kiểu 1,234,567', "dongHop();doiNgan(2)"],
  ['▤ Gọn: mỗi file 1 dòng (ẩn tag, CT vay) · 🗂 Nhóm có ⊞ bung hết / ⊟ thu hết — nút nằm trên hàng Sắp xếp', "dongHop();doiNgan(1)"],
  ['📥 File trong khay chờ: sửa xong bấm Lưu là vào tủ luôn · gõ số hiệu 4336hd nhcs tự thành 4336/HD-NHCS', "dongHop();doiNgan(1)"],
  ['🏷 Hộp sửa: tag hiện sẵn dạng chip nhỏ, bấm chọn / bỏ · gợi ý hiện ngay trên ô đang gõ', "dongHop();doiNgan(1)"],
  ['📋 Công cụ CT vay: tóm tắt 9 chương trình đang cho vay (lãi suất, thời hạn, mức vay, đối tượng, kỳ hạn trả nợ) và danh mục 32 mã chương trình', "dongHop();doiNgan(0);ccMo('ctvay')"],
  ['🔗 Văn bản liên quan hiện số hiệu ngay trên dòng — bấm là đi tới, có ‹ Quay lại; trong hộp sửa bấm ↗ để xem bên cạnh', "dongHop();doiNgan(1)"],
  ['✎ Hộp sửa văn bản gọn 1 màn hình: Enter / Tab sang ô kế, Shift lùi lại, ↑ ↓ chọn, Ctrl+Enter Lưu; tên cũ / tên mới 2 dòng; trích yếu không chép lại tên', "dongHop();doiNgan(1)"],
  ['🏷 Tag có gợi ý: đứng ở ô Tag thấy gợi ý bấm được, ↓ xem cả danh sách tag đã có, gõ không dấu vẫn ra', "dongHop();doiNgan(1)"],
  ['🔎 Hàng lọc gọn 2 dòng, bỏ chip "Tất cả" (bấm lại để bỏ lọc); "Dùng chung" đổi tên hiển thị thành "Tất cả CT"; tìm hiểu chữ viết tắt', "dongHop();doiNgan(1)"],
  ['🔗 Văn bản liên quan thay cho vai trò VB chính / sửa đổi: sửa văn bản → gõ số hiệu để liên kết (2 chiều); khung xem có 🕘 dòng thời gian', "dongHop();doiNgan(1)"],
  ['✎ Hộp nhập không còn đóng khi lỡ nhấp ra ngoài; Đóng (Esc) khi đang điền dở thì mở lại còn nguyên; nút Lưu luôn ở đáy hộp', "dongHop();doiNgan(1)"],
  ['↩ Khung Hoàn tác nhỏ ở góc, tắt sau 3 giây · Lịch: nút Hôm nay mờ khi đang ở hôm nay', "dongHop();doiNgan(0)"],
  ['🖨 Theo dõi nợ › Danh sách: in / xuất Excel danh sách chi tiết theo lọc đang xem (gom Xã › Điểm › Ấp, có dòng cộng) và bảng tổng hợp 3 danh sách theo xã, điểm GD', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['🧾 Theo dõi nợ › thẻ món › In phiếu: phiếu thông tin món vay — trang đầu tóm tắt, dòng thời gian, I–VI chi tiết; in A4 hoặc ra Word', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['🧾 In phiếu (n) ở thanh Theo dõi nợ: in cả nhánh đang lọc (vd cả một tổ), mỗi món một phiếu', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['✓ / ✗ Cam kết trả nợ: đánh dấu giữ đúng / thất hứa ở từng lần làm việc — đếm "Thất hứa x/y lần"; ⚖ mục mới Khả năng thu hồi trong hồ sơ hộ', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['★ Đánh dấu văn bản / biểu mẫu quan trọng (bấm ☆ trên dòng) — chip lọc "★ Quan trọng"; ở Biểu mẫu thay cho nút 📌 ghim', "dongHop();doiNgan(1)"],
  ['✎ Hộp khai văn bản: tên file không còn cắt dở ("…của.pdf"), "Hướng dẫn thực hiện…" viết thường đúng, trích yếu tự mở rộng viết tắt, ô Nhóm gọn 1 dòng', "dongHop();doiNgan(1)"],
  ['⚠ Thư viện › Theo dõi nợ: 3 danh sách riêng ⏳ 3 tháng KHD · 🔴 Nợ quá hạn · 🔒 Nợ khoanh — mỗi tháng 📥 Cập nhật từ file sao kê, không bao giờ xóa, món quay lại ghi ↻ phát sinh lại', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['🗂 Hồ sơ hộ vay: người vay & hộ, thừa kế, thực trạng, tài sản, sử dụng vốn, nguyên nhân, phương án — có lịch sử thay đổi', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['📝 Ghi lần làm việc → Biên bản Word điền sẵn theo mẫu PGD; cam kết trả nợ tự lên lịch Hôm nay; 📍 vị trí nhà + chỉ đường', "dongHop();doiNgan(3);D.cauHinh.tvPhan='no';veGhiChu()"],
  ['🎓 Hạn trả HSSV: bỏ nút Tự chọn; ô chọn nhỏ trên tiêu đề, mặc định Trên 12 tháng; chọn Đến 12 tháng · Y khoa thì ô đổi màu cam kèm lưu ý (không bật hộp)', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['🧰 Tab Hôm nay: lịch gọn lại (70%), bên phải là cột Công cụ — bấm để mở ngay dưới lịch', "dongHop();doiNgan(0)"],
  ['🎓 Công cụ Hạn trả HSSV: hạn cuối theo ngày GDX, thời hạn cho vay (tháng), kỳ đầu, số tiền mỗi kỳ, câu chốt bấm là chép', "dongHop();doiNgan(0);ccMo('hssv')"],
  ['🗺 Công cụ Địa bàn: cây Xã › Điểm GD › Ấp/KP kèm mã, xếp theo mã; gõ tìm ấp/KP (không dấu); bấm mã để chép', "dongHop();doiNgan(0);ccMo('diaban')"],
  ['👁 Khung xem kéo sát đáy màn hình, nút gọn lại; file 1 trang bỏ nút lật trang; CCCD hiện 2 mặt thẻ to vừa khung', "dongHop();doiNgan(4)"],
  ['🖥 Bỏ dòng nhắc cầu nối dưới khung xem — máy chưa cài chỉ hỏi khi anh bấm 🖥 Mở máy / 📋 Copy; "Để sau" thì không nhắc nữa', "dongHop();doiNgan(1)"],
  ['📄 Dòng danh sách mỏng hơn ~25–30% (Văn bản, Scan, các tab): thấy nhiều file hơn, tên dài hiện đủ hơn', "dongHop();doiNgan(1)"]],
  thu:['Văn bản: ✎ sửa một văn bản → gõ rồi Enter liên tục qua các ô → Ctrl+Enter lưu.',
    'Văn bản: ✎ sửa một văn bản → 🔗 Thêm văn bản liên quan (gõ số hiệu) → Lưu → bấm văn bản kia xem dòng thời gian.',
    '⚠ Theo dõi nợ → 🖨 Danh sách → ☰ Chi tiết / Σ Tổng hợp → 🖨 In hoặc 📊 Xuất Excel.',
    'Mở một món ở ⚠ Theo dõi nợ → 🧾 In phiếu → xem trước → 🖨 In hoặc 📄 Ra Word.',
    'Ở lần làm việc có cam kết: bấm ✓ Giữ đúng hoặc ✗ Thất hứa; ✎ Khả năng thu hồi chọn 1 mức — in lại phiếu thấy trên trang đầu.',
    'Thư viện › ⚠ Theo dõi nợ › 📥 Cập nhật tháng: chọn cùng lúc 3 file sao kê tháng (3 tháng KHD, nợ quá hạn, nợ khoanh) → xem trước → Cập nhật.',
    'Bấm ô 🔴 Nợ quá hạn → món mới phát sinh ở đầu; đổi sang 🌳 Cây địa bàn, bấm một tổ.',
    'Mở một món → ✎ Bổ sung "Nguyên nhân", "Thừa kế"… → ➕ Ghi lần làm việc (có hạn cam kết) → 📝 Biên bản mở bằng Word.',
    'Tháng sau cập nhật file mới: món vắng mặt chuyển "Đã ra khỏi DS", quay lại thì ghi ↻ phát sinh lại; thông tin đã bổ sung còn nguyên.']};
function noiDungCoGiMoi(){
  return '<h3>Bản '+CO_GI_MOI.ban+' có gì mới</h3><div class="hd-moi">'+CO_GI_MOI.ds.map(function(x){
      return '<button class="hd-moi-dong" onclick="'+x[1]+'">'+coChuHTML(x[0])+' <span>›</span></button>'; }).join('')+'</div>'+
    '<h3>Thử nhanh (5 phút)</h3>'+hdBuoc(CO_GI_MOI.thu.map(coChuHTML));
}
function moCoGiMoi(){ moHuongDan('moi'); }
function kiemCoGiMoi(){
  if(D.cauHinh.daXemMoi===CO_GI_MOI.ban) return;
  if(document.getElementById('hop').classList.contains('hien')) return setTimeout(kiemCoGiMoi, 5000);
  D.cauHinh.daXemMoi = CO_GI_MOI.ban; luu();
  moHuongDan('moi');
}
function huongDanNhanh(){
  return '<div class="ban-app">Tủ hồ sơ · <b>Bản '+APP_BAN+'</b> · cập nhật '+APP_LUC+' · <span class="tac-gia">NhanNT</span></div>'+
  '<div class="hang-nut" style="margin:0 0 10px"><button class="nho chinh" onclick="dongCaiDat();moHuongDan()">❓ Mở hướng dẫn trực quan (theo tab)</button>'+
    '<button class="nho" onclick="dongCaiDat();moHuongDan(\'moi\')">✨ Có gì mới</button></div>'+
  '<h3>Dữ liệu lưu ở đâu</h3>'+soDoLuuTru()+
  '<div class="huong-dan" style="line-height:1.75">'+
  '<b>Cách tìm</b><br>'+
  'Gõ vào ô tìm trên cùng — tìm cả số hiệu, tên, trích yếu, ghi chú, tag, mảng, chương trình vay; gõ không dấu vẫn ra. '+
  'Bộ lọc ▾: Năm · Mảng nghiệp vụ · Chương trình vay · Tag (tab Tháng có thêm Phạm vi, Hội đoàn thể). '+
  'Lọc đang bật hiện thành nhãn dưới ô tìm, bấm ✕ để bỏ. Mặc định ẩn văn bản hết hiệu lực.<br><br>'+
  '<b>Kiểu xem</b><br>'+
  '☰ Danh sách · 🗂 Nhóm theo năm tháng · <b>▣ bật/tắt khung xem nhanh</b> (nhớ riêng từng tab; tab Hôm nay mặc định tắt) · '+
  '📂 chép đường dẫn thư mục ổ G (dán vào Explorer) · ☁ mở thư mục trên Drive. '+
  'Khung xem không thấy? Bấm <b>▣</b>, hoặc Cài đặt → Chung → <b>Đặt lại bố cục</b> (app cũng tự sửa khi mở nếu độ rộng cột bị kéo hỏng). '+
  'Hàng Sắp xếp đổi theo Tên, Ngày, Loại, Dung lượng.<br><br>'+
  '<b>Thêm và khai file</b><br>'+
  'Nút Thêm ở mỗi tab. App đọc PDF lấy số hiệu, ngày, trích yếu. File nào <b>chưa đủ thông tin</b> — vừa thêm, mới quét từ Drive, '+
  'scan lưu tạm — đều về một danh sách <b>📥 Chờ khai</b> (dải vàng đầu tab Văn bản, thẻ “File chờ khai thông tin” ở tab Hôm nay), '+
  'chia nhóm và ghi rõ còn thiếu gì. Bấm <b>Khai</b> → điền → Lưu là rời danh sách, về đúng tab. 🔍 Quét tủ xong tự mở danh sách này. '+
  'Hộp khai: Tên gốc / Tên mới trên cùng, bên trái Nhận dạng + Quan hệ, bên phải Phân loại + Lưu trữ. '+
  'Bấm Lưu là cập nhật luôn tên, thư mục và phân loại lên file trên Drive.<br><br>'+
  '<b>Tab Hôm nay — bàn làm việc</b><br>'+
  'Máy tính 2 cột: trái là Lịch + việc cần xử lý, phải là <b>Nhật ký</b> trên giấy vàng — việc trong ngày và ghi chép tự do, '+
  'tự lưu theo từng ngày, đồng bộ giữa các máy. Ngày có ghi chép có chấm nâu trên lịch.<br>'+
  'Ghi chép có <b>2 chế độ</b>, đổi bằng nút ở dòng “Ghi chép”, chữ không mất: <b>Đơn giản</b> một ô như cũ · '+
  '<b>Note màu</b> lưới mẩu giấy (đỏ việc gấp, cam quan trọng, xanh lưu ý), <b>📌 ghim</b> thì mẩu luôn hiện dù đổi ngày.<br><br>'+
  '<b>Câu chữ trên cuốn sổ</b><br>'+
  'Góc trên phải sổ có <b>Ngày này năm xưa</b> (lịch sử Việt Nam và thế giới) và một <b>câu ca dao, tục ngữ, danh ngôn</b> kèm tác giả. '+
  'Bấm <b>⟳</b> để đổi câu. Cài đặt → Lịch & ngày chay: chọn khi nào đổi câu (theo ngày · mỗi lần mở app · chỉ khi bấm · tắt) và bật/tắt từng nhóm.<br>'+
  '<b>Anh tự thêm câu:</b> tạo file <b>nguon-cau.json</b> bỏ vào <b>Tủ hồ sơ / _Hệ thống /</b> trên Drive (hoặc ổ G), rồi bấm '+
  '<b>Nạp nguồn của anh từ Drive</b>. Mẫu nội dung:<br>'+
  '<code class="mau-json">{<br>'+
  '&nbsp;"cauChu": [<br>'+
  '&nbsp;&nbsp;{"c": "Có công mài sắt, có ngày nên kim.", "t": "Tục ngữ Việt Nam", "n": "cadao"},<br>'+
  '&nbsp;&nbsp;{"c": "Học để làm việc, làm người, làm cán bộ.", "t": "Hồ Chí Minh", "n": "danhngon"},<br>'+
  '&nbsp;&nbsp;"Câu ngắn gọn không cần tác giả cũng được"<br>'+
  '&nbsp;],<br>'+
  '&nbsp;"ngayXua": {<br>'+
  '&nbsp;&nbsp;"23-09": [{"y": 1977, "c": "Việt Nam gia nhập Liên Hợp Quốc"}],<br>'+
  '&nbsp;&nbsp;"04-10": [{"y": 2002, "c": "Thành lập Ngân hàng Chính sách xã hội"}]<br>'+
  '&nbsp;}<br>}</code>'+
  '<b>c</b> = câu · <b>t</b> = tác giả (bỏ trống được) · <b>n</b> = nhóm: <b>cadao</b> · <b>danhngon</b> · <b>kienthuc</b>. '+
  'Khóa của <b>ngayXua</b> là <b>ngày-tháng</b> dạng <b>23-09</b>; <b>y</b> = năm. Gõ file bằng Notepad, lưu kiểu UTF-8.<br><br>'+
  '<b>Lịch</b><br>'+
  'Ngày chay theo đạo Cao Đài: mặc định <b>thập trai</b> (1, 8, 14, 15, 18, 23, 24, 28, 29, 30; tháng thiếu ăn 27 thay 30), '+
  'đổi sang lục trai hoặc chỉ mùng 1 & rằm ở Cài đặt → Lịch & ngày chay. Ngày chay hiện số âm màu vàng đất; app tự biết tháng âm thiếu hay đủ. '+
  'Mùng 1, rằm và ngày lễ âm (Tết, Vu lan, Trung thu…) ghi ở dòng ngày.<br><br>'+
  'Âm dương lịch, số tuần. Bấm ngày → thêm việc (một lần / hằng tuần / tháng / năm), Dời ngày, Lưu ý, Xóa. '+
  'Danh sách: việc quá hạn và sắp tới. Tính ngày: cộng trừ ngày, ngày làm việc.<br><br>'+
  '<b>Tab Scan — máy scan trong app</b><br>'+
  'Bấm Quét bản mới, chọn Camera / Photo / File. '+
  'Chế độ <b>Thẻ</b> cắt đúng tỉ lệ CCCD, in 4 khách một trang A4 (phóng to vừa trang). '+
  'Chế độ <b>Tài liệu</b> ghép nhiều trang thành một PDF A4.<br>'+
  'Quét xong có ba lối: <b>In ngay</b> không lưu · <b>Lưu tạm</b> để khai sau · '+
  '<b>Khai đầy đủ</b> rồi lưu. Bản lưu tạm tự đặt tên theo ngày giờ quét, '+
  'lúc rảnh bấm <b>Khai hàng loạt</b> để khai một lượt.<br><br>'+

  '<b>Tab Biểu mẫu</b><br>'+
  'Kho mẫu đơn trắng. Tích nhiều mẫu rồi bấm <b>In cả bộ</b> để in một lượt.<br><br>'+

  '<b>Vuốt và bấm nhanh</b><br>'+
  'Trên điện thoại: vuốt trái một dòng để Gửi, vuốt phải để Sửa. '+
  'Cuối mỗi dòng có ✎ Sửa · 🗑 Xóa · ⋯ thêm lệnh.<br><br>'+

  '<b>Xóa an toàn</b><br>'+
  'Xóa là vào thùng rác chứ không mất, lấy lại được trong Cài đặt → Dữ liệu app. '+
  'File trên Drive dời vào thư mục _ThungRac và dời về chỗ cũ khi khôi phục. Bấm <b>Xóa hẳn</b> thì file chuyển vào thùng rác Google Drive, Google giữ 30 ngày rồi tự xóa.'+
  '</div>';
}

function batMuc(id){
  var e = document.getElementById('muc-'+id);
  if(!e) return;
  var dang = e.classList.contains('mo');
  var ds = document.querySelectorAll('.muc');
  for(var i=0;i<ds.length;i++) ds[i].classList.remove('mo');
  if(!dang) e.classList.add('mo');
  window.__mucMo = dang ? '' : id;
}

function datKieuTen(v, el){
  D.cauHinh.kieuTen = v;
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.toggle('bat', b[i]===el);
  luu();
  bao('Đã đổi kiểu đặt tên. Dùng cho file thêm mới từ giờ.', 4);
}
function datCo(v, el){
  D.cauHinh.coChu = v;
  document.documentElement.style.setProperty('--co', v);
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.toggle('bat', b[i]===el);
  luu();
}
function datGiaoDien(v, el){
  D.cauHinh.giaoDien = v;
  apGiaoDien();
  var b = el.parentNode.children;
  for(var i=0;i<b.length;i++) b[i].classList.toggle('bat', b[i]===el);
  luu();
}
function apGiaoDien(){
  var v = D.cauHinh.giaoDien;
  if(v==='auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', v);
}
function dong(id){
  return gt(id).split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
}
function luuCaiDat(noiLuon, ngam){
  var c = D.cauHinh;
  function co(id){ return !!document.getElementById(id); }
  if(co('cd-donvi')) c.donvi = gt('cd-donvi')||MAC_DINH.donvi;
  if(co('cd-thumuc')) c.thumuc = gt('cd-thumuc')||MAC_DINH.thumuc;
  if(co('cd-cid')) c.clientId = (gt('cd-cid')===CLIENT_ID_MAC_DINH) ? '' : gt('cd-cid');
  if(co('cd-gocmay')) c.gocMay = gt('cd-gocmay') || 'G:\\My Drive';
  if(co('cd-apikey')) c.apiKey = gt('cd-apikey');
  if(co('cd-chay')) c.cheChay = gt('cd-chay');
  if(co('cd-checau')) c.cheCau = gt('cd-checau');
  if(document.querySelector('.cd-nhomcau')){
    c.nhomCau = {};
    Array.prototype.forEach.call(document.querySelectorAll('.cd-nhomcau'), function(x){ c.nhomCau[x.value] = x.checked; });
  }
  if(co('cd-sotrang')){
    var n = parseInt(gt('cd-sotrang'),10);
    c.soTrangDoc = (n>=1 && n<=8) ? n : 2;
  }
  if(co('cd-tenct')) c.tenCauTruc = layTenCauTruc();
  if(co('cd-nv')) c.nghiepVu = dong('cd-nv');
  if(co('cd-ct')){
    c.chuongTrinh = []; c.ctTen = {};
    dong('cd-ct').forEach(function(d){
      var p = d.split('|'), vt = p[0].trim(), ten = (p[1]||'').trim();
      if(!vt || vt==='Dùng chung') return;
      c.chuongTrinh.push(vt); if(ten) c.ctTen[vt] = ten;
    });
  }
  if(co('cd-lvb')) c.loaiVB = dong('cd-lvb');
  if(TAB_CD.some(function(t){ return t.ma===CD_MO; }) && co('cd-noi')) luuCDTab(CD_MO, true);
  if(!(c.nghiepVu||[]).length) c.nghiepVu = MAC_DINH.nghiepVu.slice();
  if(!(c.loaiVB||[]).length) c.loaiVB = MAC_DINH.loaiVB.slice();
  luu(); capNhatDau(); ve();
  if(ngam){ baoDaLuu(); henDayCauHinh(); return; }
  if(noiLuon){
    if(!layClientId()) return baoLoi('Chưa nhập Client ID.');
    if(location.protocol!=='https:')
      return baoLoi('App phải chạy ở địa chỉ https mới nối được Drive.');
    noiDrive();
    return;
  }
  bao('Đã lưu cài đặt.', 3);
  if(DR.sanSang) dayCauHinh(true);
}

/* bản dự phòng ĐẦY ĐỦ: chỉ mục 4 tab + scan + khay + thùng rác + lịch + cài đặt
   (bỏ khóa mã hóa ảnh CCCD và dấu PIN — không bao giờ rời khỏi máy) */
function xuatDuPhong(phu, chiGom){
  var ch = JSON.parse(JSON.stringify(D.cauHinh||{}));
  delete ch.hsKhoa; delete ch.hsMuoi; delete ch.hsThu;
  var goi = chiGom ? Object.assign({phienBan:PHIEN_BAN, ban:APP_BAN, xuatLuc:new Date().toISOString(), loai:'du-phong-mot-phan'}, chiGom)
    : {phienBan:PHIEN_BAN, ban:APP_BAN, xuatLuc:new Date().toISOString(), loai:'du-phong-day-du', cauHinh:ch,
       vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu, bieuMau:D.bieuMau||[], scan:D.scan||[],
       cho:D.cho||[], rac:D.rac||[], lich:D.lich||{}, daXoaHan:D.daXoaHan||[]};
  var ten = 'TuHoSo_duphong_'+(phu?phu+'_':'')+ngayISO(nay())+'_'+String(new Date().getHours()).padStart(2,'0')+
            String(new Date().getMinutes()).padStart(2,'0')+'.json';
  try{
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(goi, null, 1)], {type:'application/json'}));
    a.download = ten; document.body.appendChild(a); a.click(); a.remove();
    return ten;
  }catch(e){
    console.warn('Không tải được bản dự phòng', e);
    return '(KHÔNG tải được bản dự phòng — trình duyệt chặn tải xuống)';
  }
}
function xuatDL(){
  var ten = xuatDuPhong('');
  bao('Đã xuất bản dự phòng đầy đủ: '+ten+'. Cất file này vào Drive.', 5);
}
function napDL(){
  var i = document.createElement('input');
  i.type='file'; i.accept='.json';
  i.onchange = function(){
    var fr = new FileReader();
    fr.onload = function(){
      try{
        var j = JSON.parse(fr.result);
        var dem = 0;
        /* 3.31: nạp ĐỦ bản dự phòng — trước đây chỉ 3 tab, mất Biểu mẫu, Scan, Thùng rác, Lịch/sổ ghi chép.
           Vẫn là GỘP: mục đã có (cùng id) giữ nguyên, không xóa gì của máy này */
        ['vanBan','duLieu','ghiChu','bieuMau','scan','rac'].forEach(function(k){
          D[k] = D[k] || [];
          (j[k]||[]).forEach(function(x){
            if(!D[k].some(function(y){ return y.id===x.id; })){ D[k].push(x); dem++; }
          });
        });
        if((j.daXoaHan||[]).length){
          var co = {}; (D.daXoaHan||[]).forEach(function(t){ co[t.id] = 1; });
          D.daXoaHan = (D.daXoaHan||[]).concat(j.daXoaHan.filter(function(t){ return !co[t.id]; }));
        }
        if(j.lich && (j.lich.viec || j.lich.note || j.lich.nhatKy)) dem += gopLich(j.lich);
        if(j.cauHinh) for(var k in j.cauHinh) D.cauHinh[k] = j.cauHinh[k];
        HS.ds = D.scan;
        luu(); dongHop(); capNhatDau(); ve(); if(typeof veLich==='function') veLich();
        bao('Đã nạp thêm '+dem+' mục (gồm cả lịch, ghi chép, biểu mẫu, scan, thùng rác nếu có). '+
            'Ảnh CCCD không nằm trong file dự phòng.', 7);
      }catch(e){ baoLoi('File không đúng định dạng chỉ mục.'); }
    };
    fr.readAsText(i.files[0]);
  };
  i.click();
}
/* ==========================================================
   3.49: XÓA NHIỀU FILE (lúc đầu tên "− Bớt file", 3.49b đổi tên theo anh). Bấm "🗑 Xóa file" ở đầu tab → tích dòng (hoặc chọn tất cả đang lọc,
   chọn theo ngày thêm vào tủ) → Xóa N file. 3.50 (anh chốt): cứ xóa là VÀO THÙNG RÁC (cả scan, Chữ ký·CCCD), có ↩ Hoàn tác;
   xóa hẳn chỉ làm trong Thùng rác (ngăn / cả thùng) hoặc Reset ở Cài đặt. Xóa hẳn ghi dấu daXoaHan → máy kia bỏ theo.
   ========================================================== */
var BOT = {tab:'', chon:{}}, BOT_DS = {};
function botAt(id){ return BOT.tab ? ' data-bot="'+id+'"'+(BOT.chon[id]?' data-botc="1"':'') : ''; }
function nutChepNhieu(tab){   /* 3.106: chọn nhiều file để chép (cầu nối) */
  if(!coCauNoi() || laDT()) return '';
  var bat = BOT.tab===tab && BOT.muc==='chep';
  return '<button class="nut-bot'+(bat?' bat':'')+'" onclick="'+(bat?'thoiBot()':'batBot(\''+tab+'\',\'chep\')')+'" title="Chọn nhiều file rồi chép một lần — Ctrl+V vào Zalo / email / thư mục">☑ Chọn chép</button>';
}
function nutBot(tab){
  var bat = BOT.tab===tab && BOT.muc!=='chep';
  return '<button class="nut-bot'+(bat?' bat':'')+'" onclick="'+(bat?'thoiBot()':'batBot(\''+tab+'\')')+'" '+
    'title="Chọn nhiều file để xóa một lần (vào thùng rác hoặc xóa hẳn)">🗑 Xóa file</button>';
}
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
function botXacNhan(){ if(BOT.muc==='chep') return chepNhieu(Object.keys(BOT.chon).map(mucBot).filter(Boolean)); thucHienBot(); }
function thucHienBot(){
  var ids = Object.keys(BOT.chon), tab = BOT.tab;
  var ds = ids.map(mucBot).filter(Boolean);
  if(!ds.length) return bao('Chưa chọn file nào.', 3);
  BOT.chon = {};
  var kaMo = tab==='kyAnh';
  thoiBot();
  xoaNhieuVaoRac(ds.map(function(m){ return m.id; }), function(){ if(kaMo) moKyAnh(); });
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
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
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
    '<div class="hang-nut"><button class="nho" onclick="dongHop()">Thôi</button>'+
    '<button class="nho xau" onclick="xoaSachMay()">Xóa sạch</button></div>');
}
function xoaSachMay(){
  if((gt('xs-go')||'').trim().toUpperCase()!=='XOA') return baoLoi('Gõ đúng chữ XOA để xác nhận.');
  hoi('Chắc chắn xóa sạch?', 'Lần hỏi cuối. Sau khi xóa, app tải lại như mới cài trên máy này.', 'Xóa sạch', function(){
    var ten = xuatDuPhong('truoc-xoa-sach');
    localStorage.removeItem(KHOA);
    moKho().then(function(db){
      var t = db.transaction('f','readwrite');
      t.objectStore('f').clear();
      t.oncomplete = function(){ setTimeout(function(){ location.reload(); }, 600); };
    }).catch(function(){ location.reload(); });
    bao('Đã tải bản dự phòng '+ten+'. Đang xóa…', 5);
  });
}
function xoaHet(){ return moXoaSachMay(); }
/* ==========================================================
   10. GOOGLE DRIVE  (tùy chọn — không có vẫn chạy bình thường)
   Cần: app đặt ở một địa chỉ https cố định + Client ID của Google.
   ========================================================== */
var DR = {
  sanSang:false, token:null, hetHan:0, dangNoi:false,
  thuMuc:{},            // đường dẫn -> id thư mục
  trangThai:'Chưa nối', // hiện ở chip dải đáy
  online: (typeof navigator==='undefined' || navigator.onLine!==false),
  hangCho: []           // {duong, tuyChon, giaiQuyet, tuChoi} — việc chờ khi mất mạng/phiên
};
var DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

window.addEventListener('online', function(){
  DR.online = true; capNhatChip();
  if(DR.hangCho.length) chayHangCho();
});
window.addEventListener('offline', function(){ DR.online = false; capNhatChip(); });

/* mỗi 4 phút, nếu đang nối thì âm thầm xin phiên mới trước khi hết hạn — không hiện popup */
setInterval(function(){
  if(DR.sanSang && DR.online && Date.now() > DR.hetHan - 10*60000) noiDrive(true);
}, 4*60000);

function chayHangCho(){
  if(!DR.hangCho.length) return;
  var viec = DR.hangCho.slice(); DR.hangCho = []; capNhatChip();
  viec.forEach(function(v){
    goiDrive(v.duong, v.tuyChon).then(v.giaiQuyet).catch(v.tuChoi);
  });
}

/* Client ID của anh gắn sẵn: mất bộ nhớ trình duyệt / đổi máy / Safari tự xóa vẫn nối được.
   Client ID của ứng dụng web không phải mật khẩu — Google chỉ nhận đăng nhập từ trang nhannt3-gif.github.io */
var CLIENT_ID_MAC_DINH = '365646961906-j476flafsqdgnl7cbbfr59kimf0t8t5c.apps.googleusercontent.com';
function layClientId(){ return (D.cauHinh.clientId||'').trim() || CLIENT_ID_MAC_DINH; }
function chepClientId(){ chepChu(layClientId(), 'Đã chép Client ID.'); }
function coTheNoiDrive(){
  return location.protocol==='https:' && !!layClientId();
}

function napGIS(){
  if(window.google && google.accounts) return Promise.resolve(true);
  return new Promise(function(ok){
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.onload = function(){ ok(true); };
    s.onerror = function(){ ok(false); };
    document.head.appendChild(s);
  });
}

function noiDrive(imLang){
  if(!coTheNoiDrive()){
    if(!imLang) baoLoi('Chưa nối được. Cần đặt app ở địa chỉ https và khai Client ID trong Cài đặt.');
    return Promise.resolve(false);
  }
  DR.dangNoi = true; capNhatChip();
  return napGIS().then(function(co){
    if(!co){ throw new Error('Không tải được thư viện Google (mất mạng?)'); }
    return new Promise(function(ok, loi){
      try{
        var tc = google.accounts.oauth2.initTokenClient({
          client_id: layClientId(),
          scope: DRIVE_SCOPE,
          callback: function(kq){
            if(kq && kq.access_token){
              DR.token = kq.access_token;
              DR.hetHan = Date.now() + (kq.expires_in||3500)*1000;
              DR.sanSang = true; DR.trangThai = 'Đã nối';
              DR.dongBoLuc = hai(nay().getHours())+':'+hai(nay().getMinutes());
              luu(); capNhatChip(); ok(true);
            }else loi(new Error('Không nhận được quyền'));
          },
          error_callback: function(){ loi(new Error('Anh đã hủy hoặc bị chặn')); }
        });
        tc.requestAccessToken({prompt: imLang ? '' : 'consent'});
      }catch(e){ loi(e); }
    });
  }).then(function(){
    DR.dangNoi = false; capNhatChip();
    if(!imLang) bao('Đã nối Google Drive.', 4);
    if(DR.hangCho.length) chayHangCho();
    chayDongBoCho();
    if(!DR.daKeoCM){ DR.daKeoCM = true; taiChiMucTuDrive(true); }
    if(!DR.daKeoCH){ DR.daKeoCH = true; setTimeout(function(){ dongBoCauHinh('tu'); }, 800); }   /* 3.113: mở app → lấy cài đặt máy khác vừa sửa, rồi đẩy phần máy này đổi */
    if(D.cauHinh.dbMoApp!==false) setTimeout(function(){ dongBoScan(false); }, 1500);   /* 3.46: mở app → đẩy bản còn chờ */
    if(D.cauHinh.boThang!=='xong') setTimeout(boThangDon, 7000);   /* 3.144: sau khi kéo chỉ mục — bỏ dữ liệu tab Tháng */
    if(!DR.daKeoLich){ DR.daKeoLich = true; taiLichTuDrive(); taiNguonCauTuDrive(); setTimeout(taiNoTuDrive, 2500); setTimeout(function(){ (SL_SAN ? Promise.resolve() : slNap()).then(slTaiTuDrive); }, 4000); }
    return true;
  }).catch(function(e){
    DR.dangNoi = false; DR.sanSang = false;
    DR.trangThai = 'Nối lỗi'; capNhatChip();
    if(!imLang) baoLoi('Không nối được Drive: '+(e&&e.message||e));
    return false;
  });
}

function canToken(){
  if(DR.sanSang && Date.now() < DR.hetHan-60000) return Promise.resolve(true);
  return noiDrive(true);
}

function xepHangCho(duong, tuyChon){
  var moi = !DR.hangCho.length;
  return new Promise(function(ok, loi){
    DR.hangCho.push({duong:duong, tuyChon:tuyChon, giaiQuyet:ok, tuChoi:loi});
    capNhatChip();
    if(moi) bao((DR.online?'Phiên Drive hết, đang nối lại':'Mất mạng')+
      ' — việc này đã lưu tạm, sẽ tự gửi khi xong.', 5);
  });
}
function goiDrive(duong, tuyChon){
  if(!DR.online) return xepHangCho(duong, tuyChon);
  return canToken().then(function(co){
    if(!co) throw new Error('Chưa nối Drive');
    var t = tuyChon||{};
    t.headers = t.headers||{};
    t.headers['Authorization'] = 'Bearer '+DR.token;
    return fetch(duong, t);
  }).then(function(r){
    if(r.status===401){ DR.sanSang=false; throw new Error('Phiên hết hạn, nối lại giúp'); }
    if(!r.ok) return r.text().then(function(t){ throw new Error('Drive báo lỗi: '+r.status); });
    return r.json();
  }).catch(function(e){
    /* mất mạng giữa chừng, hoặc phiên hết mà nối lại im lặng cũng không được:
       xếp vào hàng chờ, không mất việc đang làm — chạy lại khi nối lại / có mạng */
    if(!DR.online || !DR.sanSang) return xepHangCho(duong, tuyChon);
    throw e;
  });
}

/* tìm hoặc tạo một thư mục con */
function thuMucCon(ten, cha){
  var q = "name='"+ten.replace(/'/g,"\\'")+"' and mimeType='application/vnd.google-apps.folder'"+
          " and trashed=false and '"+(cha||'root')+"' in parents";
  return goiDrive('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
                  '&fields=files(id,name)&pageSize=1')
  .then(function(kq){
    if(kq.files && kq.files.length) return kq.files[0].id;
    return goiDrive('https://www.googleapis.com/drive/v3/files?fields=id', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name:ten, mimeType:'application/vnd.google-apps.folder',
                            parents:[cha||'root']})
    }).then(function(r){ return r.id; });
  });
}

/* bảo đảm cả đường dẫn "A / B / C" tồn tại, trả id thư mục cuối */
function baoDamDuong(duong){
  if(!D.cauHinh.thumuc) D.cauHinh.thumuc = MAC_DINH.thumuc;   /* 3.140.4: không bao giờ tạo thư mục "undefined" / "null" trên Drive */
  duong = String(duong).replace(/^\s*(undefined|null)?\s*(?=\/|$)/, function(m, x){ return x ? D.cauHinh.thumuc : m; });
  if(DR.thuMuc[duong]) return Promise.resolve(DR.thuMuc[duong]);
  var phan = duong.split('/').map(function(x){ return x.trim(); }).filter(Boolean);
  return phan.reduce(function(p, ten){
    return p.then(function(cha){ return thuMucCon(ten, cha); });
  }, Promise.resolve('root')).then(function(id){
    DR.thuMuc[duong] = id; return id;
  });
}

/* tạo cả bộ thư mục chuẩn */
function taoBoThuMuc(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive.');
  var g = D.cauHinh.thumuc, n = nay().getFullYear();
  var ds = [g, g+'/_Chờ xử lý', g+'/Văn bản/'+n, g+'/Dữ liệu tháng/'+n,
            g+'/Ghi chú/'+n, g+'/Khác', g+'/_Hệ thống'];
  bao('Đang tạo thư mục trên Drive…', 4);
  ds.reduce(function(p, d){ return p.then(function(){ return baoDamDuong(d); }); },
            Promise.resolve())
  .then(function(){ bao('Đã tạo xong bộ thư mục trong Drive.', 5); })
  .catch(function(e){ baoLoi('Không tạo được: '+(e&&e.message||e)); });
}

/* đưa một file lên Drive đúng tên chuẩn, đúng thư mục */
function dayLenDrive(m){
  return layNoiDung(m).then(function(b){
    if(!b) throw new Error('Không có nội dung file');
    return baoDamDuong(thuMucCua(m)).then(function(idTM){
      var md = metaDrive(m, true);
      var meta = {name: m.tenMoi, parents:[idTM], description:md.description, appProperties:md.appProperties};
      m.driveCha = idTM;
      var bien = '----tuhoso'+Date.now();
      var dau = '--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+
                JSON.stringify(meta)+'\r\n--'+bien+
                '\r\nContent-Type: '+(b.type||'application/octet-stream')+'\r\n\r\n';
      var cuoi = '\r\n--'+bien+'--';
      var body = new Blob([dau, b, cuoi], {type:'multipart/related; boundary='+bien});
      return goiDrive('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',
        {method:'POST', headers:{'Content-Type':'multipart/related; boundary='+bien}, body:body});
    });
  }).then(function(r){
    m.driveId = r.id; m.daLenDrive = true; delete m.choDB; m.driveKy = kyDrive(m); luu();
    return r;
  });
}

function dayLenNhieu(ds){
  var xong = 0, hong = 0;
  bao('Đang đưa '+ds.length+' file lên Drive…', 5);
  return ds.reduce(function(p, m){
    return p.then(function(){
      return dayLenDrive(m).then(function(){ xong++; })
        .catch(function(e){ hong++; console.warn(m.tenMoi, e); });
    });
  }, Promise.resolve()).then(function(){
    ve();
    bao('Đã đưa lên Drive '+xong+' file'+(hong?', lỗi '+hong+' file':'')+'.', 6);
  });
}

/* đọc khay _Chờ xử lý trên Drive */
function napKhayCho(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Vào Cài đặt để khai Client ID.');
  batChay(true);
  var duong = D.cauHinh.thumuc+'/_Chờ xử lý';
  bao('Đang xem khay chờ trên Drive…', 4);
  baoDamDuong(duong).then(function(id){
    var q = "'"+id+"' in parents and trashed=false";
    return layHetTrang('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+
                    '&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=200');
  }).then(function(kq){
    var ds = (kq.files||[]).filter(function(f){
      return f.mimeType!=='application/vnd.google-apps.folder'; });
    if(!ds.length){ bao('Khay chờ đang trống.', 4); return; }
    bao('Có '+ds.length+' file trong khay — đang tải về để đọc…', 5);
    return ds.reduce(function(p, f){
      return p.then(function(){
        return canToken().then(function(){
          return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media',
                       {headers:{'Authorization':'Bearer '+DR.token}});
        }).then(function(r){ return r.blob(); })
        .then(function(b){
          var file = new File([b], f.name, {type:f.mimeType});
          file.driveId = f.id;
          var n0 = D.cho.length;
          return xuLyMotFile(file).then(function(){
            /* 3.31: chỉ gắn khi file thật sự vào khay (file trùng bị bỏ qua thì trước đây gắn nhầm vào file trước đó) */
            var c = D.cho.length>n0 ? D.cho[D.cho.length-1] : null;
            if(c) c.tuKhay = f.id;
          });
        }).catch(function(e){ console.warn('bỏ qua', f.name, e); });
      });
    }, Promise.resolve()).then(function(){
      luu(); tatChay(); doiNgan(6);
      bao('Đã nạp '+ds.length+' file từ khay chờ. Xem rồi bấm Duyệt.', 6);
    });
  }).catch(function(e){
    tatChay();
    baoLoi('Không đọc được khay chờ: '+(e&&e.message||e));
  });
}

/* file lấy từ khay: duyệt xong thì đổi tên và dời luôn trên Drive */
function doiTenTrenDrive(m){
  if(!m.tuKhay) return Promise.resolve(false);
  return baoDamDuong(thuMucCua(m)).then(function(idMoi){
    var duong = D.cauHinh.thumuc+'/_Chờ xử lý';
    var idCu = m.tuKhayCha || DR.thuMuc[duong];   /* 3.31: file chọn bằng Picker nằm ở thư mục cũ của nó */
    var u = 'https://www.googleapis.com/drive/v3/files/'+m.tuKhay+
            '?addParents='+idMoi+(idCu?('&removeParents='+idCu):'')+'&fields=id,name';
    var md = metaDrive(m, true); m.driveCha = idMoi;
    return goiDrive(u, {method:'PATCH', headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({name:m.tenMoi, description:md.description, appProperties:md.appProperties})});
  }).then(function(){
    m.driveId = m.tuKhay; m.daLenDrive = true; delete m.tuKhay; delete m.tuKhayCha; m.driveKy = kyDrive(m); luu();
    return true;
  });
}

/* ==========================================================
   3.31 (mục 10 bàn giao) — GOOGLE PICKER: quét kho Drive cũ
   Nạp thư viện Picker của Google khi anh bấm (không nạp sẵn). File chọn → tải về đọc → vào khay chờ,
   gắn tuKhay + thư mục cũ (tuKhayCha); chỉ khi Duyệt mới đổi tên và dời vào đúng thư mục của tủ.
   ========================================================== */
function napPicker(){
  if(window.google && google.picker) return Promise.resolve(true);
  return new Promise(function(ok, loi){
    var lay = function(){ gapi.load('picker', {callback:function(){ ok(true); }, onerror:function(){ loi(new Error('Không nạp được Google Picker')); }}); };
    if(window.gapi) return lay();
    var sc = document.createElement('script');
    sc.src = 'https://apis.google.com/js/api.js';
    sc.onload = lay; sc.onerror = function(){ loi(new Error('Không tải được thư viện Google (mất mạng?)')); };
    document.head.appendChild(sc);
  });
}
function moPicker(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Nối Drive trước ở mục này.');
  var key = (D.cauHinh.apiKey||'').trim();
  if(!key) return baoLoi('Chưa có API key của Google Picker — dán vào ô phía trên rồi bấm lại.');
  canToken().then(function(co){
    if(!co) throw new Error('Chưa nối được Drive');
    return napPicker();
  }).then(function(){
    var P = google.picker;
    var xem = new P.DocsView(P.ViewId.DOCS).setIncludeFolders(true).setSelectFolderEnabled(true).setMode(P.DocsViewMode.LIST);
    new P.PickerBuilder().addView(xem).enableFeature(P.Feature.MULTISELECT_ENABLED)
      .setOAuthToken(DR.token).setDeveloperKey(key).setAppId(layClientId().split('-')[0])
      .setTitle('Chọn thư mục hoặc file trong kho cũ').setCallback(ketQuaPicker).build().setVisible(true);
  }).catch(function(e){ baoLoi('Không mở được Google Picker: '+(e&&e.message||e)); });
}
function ketQuaPicker(data){
  var P = google.picker;
  if(data[P.Response.ACTION]!==P.Action.PICKED) return;
  var ds = data[P.Response.DOCUMENTS]||[], THU_MUC = 'application/vnd.google-apps.folder';
  var file = [], thuMuc = [];
  ds.forEach(function(d){
    var f = {id:d[P.Document.ID], name:d[P.Document.NAME], mimeType:d[P.Document.MIME_TYPE], cha:d[P.Document.PARENT_ID]||''};
    if(f.mimeType===THU_MUC) thuMuc.push(f); else file.push(f);
  });
  dongHop(); batChay(true, 'Đang đọc danh sách file đã chọn…');
  /* thư mục: gom file bên trong (đệ quy, tối đa 500 file) */
  var gomTM = function(id, han){
    var ra = [], hang = [id];
    var tiep = function(){
      if(!hang.length || ra.length>=han) return Promise.resolve(ra);
      var cha = hang.shift();
      return layHetTrang('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent("'"+cha+"' in parents and trashed=false")+
        '&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=200').then(function(kq){
        (kq.files||[]).forEach(function(f){
          if(f.mimeType===THU_MUC) hang.push(f.id); else if(ra.length<han) ra.push({id:f.id, name:f.name, mimeType:f.mimeType, cha:cha});
        });
        return tiep();
      });
    };
    return tiep();
  };
  thuMuc.reduce(function(p, t){ return p.then(function(){ return gomTM(t.id, 500).then(function(r){ file = file.concat(r); }); }); }, Promise.resolve())
  .then(function(){
    var docDuoc = file.filter(function(f){ return !/^application\/vnd\.google-apps\./.test(f.mimeType||''); });
    var boGoogle = file.length - docDuoc.length;
    if(!docDuoc.length){
      tatChay();
      return baoLoi(thuMuc.length ? 'Google không cho app đọc bên trong thư mục đã chọn. Mở lại và chọn trực tiếp các file (giữ Ctrl/Shift để chọn nhiều).'
                                  : 'Không có file nào đọc được (file Google Docs/Sheets gốc chưa hỗ trợ).');
    }
    var xong = 0, trung = 0;
    return docDuoc.reduce(function(p, f){
      return p.then(function(){
        if(QUET.dung) return;
        dangLamChu('Đang đọc '+(xong+1)+'/'+docDuoc.length+' · '+f.name);
        return canToken().then(function(){
          return fetch('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', {headers:{'Authorization':'Bearer '+DR.token}});
        }).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.blob(); })
        .then(function(b){
          var n0 = D.cho.length;
          return xuLyMotFile(new File([b], f.name, {type:f.mimeType||b.type})).then(function(){
            var c = D.cho.length>n0 ? D.cho[D.cho.length-1] : null;
            if(c){ c.tuKhay = f.id; if(f.cha) c.tuKhayCha = f.cha; c.canCu = (c.canCu||'')+' · từ kho Drive cũ'; xong++; }
            else trung++;
          });
        }).catch(function(e){ console.warn('bỏ qua', f.name, e); });
      });
    }, Promise.resolve()).then(function(){
      tatChay(); luu(); doiNgan(6);
      bao('Đã đưa '+xong+' file vào khay chờ'+(trung?' · bỏ '+trung+' file trùng':'')+(boGoogle?' · bỏ '+boGoogle+' file Google Docs gốc':'')+
        '. Xem tên đề xuất rồi bấm Duyệt — lúc đó app mới đổi tên và dời file.', 9);
    });
  }).catch(function(e){ tatChay(); baoLoi('Không đọc được: '+(e&&e.message||e)); });
}
function capNhatChip(){
  if(typeof capNhatDaiDrive==='function') setTimeout(capNhatDaiDrive, 0);
  var e = document.getElementById('chip-drive');
  if(!e) return;
  var nTen = ((typeof demChoDB==='function') ? demChoDB().length : 0) + scanCanDay().length + kaCanDay().length +
             (typeof nkChuaLen==='function' ? nkChuaLen() : 0);
  var nLoi = (D.scan||[]).concat(D.kyAnh||[]).filter(function(k){ return k.dbLoi; }).length;
  var dangGui = DR.hangCho.length ? ' · đang gửi '+DR.hangCho.length : '';
  /* 3.53: chip Drive chỉ báo trạng thái nối; số bản chưa lên và lỗi có chip riêng */
  var ec = document.getElementById('chip-chua'), el = document.getElementById('chip-loi');
  if(ec){ ec.textContent = nTen ? '☁ '+nTen+' chưa lên Drive' : ''; ec.classList.toggle('an', !nTen || !coTheNoiDrive()); }
  if(el){ el.textContent = nLoi ? '⚠ '+nLoi+' lỗi đẩy lên' : ''; el.classList.toggle('an', !nLoi); }
  if(typeof capNhatBoNho==='function') capNhatBoNho();
  if(!DR.online){ e.textContent='🔴 Mất mạng · lưu tạm trong máy'; e.className='chip do'; return; }
  if(DR.dangNoi){ e.textContent='🟡 Đang nối Drive…'; e.className='chip vang'; return; }
  if(DR.sanSang){
    e.textContent = '🟢 Drive'+(DR.dongBoLuc?' · '+DR.dongBoLuc:' · đã nối')+dangGui;
    e.className = 'chip luc'; return;
  }
  if(DR.trangThai==='Nối lỗi' || coTheNoiDrive()){ e.textContent='🟡 Drive · bấm để nối lại'; e.className='chip vang'; return; }
  e.textContent = '⚪ Chưa cài Drive';
  e.className = 'chip';
}

/* ==========================================================
   11. LẬP CHỈ MỤC
   a) Quét kho cũ trên Drive — chỉ đọc, KHÔNG đổi tên, KHÔNG dời file
   b) Đọc lại những mục còn thiếu thông tin
   c) Dọn chỉ mục — bỏ mục hỏng, gộp mục trùng
   ========================================================== */
var QUET = {chay:false, dung:false, xong:0, tong:0, them:0, bo:0, dang:''};


function mucThieu(){
  return D.vanBan.filter(function(m){
    return !m.soHieu || !m.trichYeu || m.trichYeu===(m.tenCu||'').replace(/\.[^.]+$/,'');
  }).concat(D.duLieu.filter(function(m){ return m.maLoai==='KHAC'; }));
}

/* --- 1. QUÉT DRIVE --- */
/* gọi danh sách file Drive và gom đủ mọi trang; trả {files:[…]} như một lần gọi */
function layHetTrang(url){
  var tat = [];
  function trang(tok){
    return goiDrive(url+(tok?'&pageToken='+encodeURIComponent(tok):'')).then(function(kq){
      tat = tat.concat(kq.files||[]);
      return (kq.nextPageToken && !QUET.dung) ? trang(kq.nextPageToken) : {files:tat};
    });
  }
  return trang('');
}

function veQuet(){
  var e = document.getElementById('hop-quet');
  if(!e){
    moHop('<div class="hop-tit">Đang quét Drive</div>'+
      '<div class="hop-phu">Chỉ đọc để lập chỉ mục. Không đổi tên, không dời, không xóa file nào. '+
      'Anh có thể dừng bất cứ lúc nào rồi chạy tiếp sau.</div>'+
      '<div class="quet" id="hop-quet"></div>'+
      '<div class="tien"><i id="quet-tien"></i></div>'+
      '<div class="hang-nut" style="margin-top:14px">'+
      '<button class="nho xau" onclick="dungQuet()">Dừng</button>'+
      '<button class="nho" onclick="dongHop()">Ẩn đi</button></div>');
    e = document.getElementById('hop-quet');
  }
  var pt = QUET.tong ? Math.round(QUET.xong/QUET.tong*100) : 0;
  e.innerHTML = '<div class="dong"><b>'+QUET.xong+'</b>'+(QUET.tong?(' / '+QUET.tong):'')+
    ' file · thêm '+QUET.them+' · bỏ qua '+QUET.bo+'</div>'+
    '<div class="nho-chu">'+coChuHTML(QUET.dang)+'</div>';
  var t = document.getElementById('quet-tien');
  if(t) t.style.width = pt+'%';
}
function dungQuet(){ QUET.dung = true; bao('Đang dừng…', 3); }
/* tên hiện tại có đúng quy tắc đặt tên của app không */
function tenDungChuan(m){
  if(m.giuTen || laBieuMau(m) || laFileHeThong(m)) return true;
  var t = m.nhom==='duLieu' ? tenDuLieu(m, m.duoi)
        : m.nhom==='ghiChu' ? tenGhiChu(m, m.duoi)
        : m.nhom==='khac'   ? tenKhac(m, m.duoi)
        : tenVanBan({ngay:m.ngay, soHieu:m.soHieu, loai:m.loai, trichYeu:m.tenVB||m.trichYeu}, m.duoi);
  return t===m.tenMoi;
}
/* QUÉT TỦ — chỉ trong thư mục Tủ hồ sơ; tìm file mới + tên lệch/chưa chuẩn rồi báo */
function quetTu(){ return lapChiMuc(); }   /* 3.50: "Quét tủ" đổi tên thành Lập chỉ mục */
/* ==========================================================
   3.50: 🗂 LẬP CHỈ MỤC — đi hết thư mục Tủ hồ sơ trên Drive để MỌI file đều được app quản lý.
   Gặp file chưa có chỉ mục thì xác định thuộc tab nào theo thứ tự: dấu app ghi trên file → THƯ MỤC chứa file → tên/nội dung.
   File đủ thông tin nhờ đường dẫn thì vào thẳng tab; thiếu thì vào Chờ khai (ghi rõ thuộc tab, lấy từ thư mục nào).
   Chỉ thấy file do app tạo / anh chọn qua Picker (quyền Drive hiện tại).
   ========================================================== */
function phanTheoDuong(duong, ten){
  var p = String(duong||'').split(' / ').map(function(x){ return x.trim(); }).filter(Boolean), a = p[0]||'';
  var bo = function(x){ return (!x || /^Chưa rõ/.test(x)) ? '' : x; };
  if(a==='Văn bản') return {tab:'vanBan'};
  if(a==='Dữ liệu tháng'){ var t = parseInt(String(p[2]||'').replace(/^T/i,''), 10); return {tab:'duLieu', ky: /^\d{4}$/.test(p[1]||'') && t ? p[1]+'-'+hai(t) : ''}; }
  if(a==='Biểu mẫu') return {tab:'bieuMau', nhom:p[1]||'Dùng chung'};
  if(a==='Ghi chú') return {tab:'ghiChu'};
  if(a==='CCCD') return {tab:'scan', che:'the', xa:bo(p[1]), diem:bo(p[2]), ap:bo(p[3]), to:bo(p[4]).replace(/^Tổ\s*/,'')};
  if(a==='Hồ sơ scan'){
    if(p[1]==='Chưa khai') return {tab:'scan', che:/ - người \d/.test(ten||'') ? 'the' : 'tailieu', chuaKhai:true};
    return {tab:'scan', che:'tailieu', xa:bo(p[1]), diem:bo(p[2]), ap:bo(p[3]), to:bo(p[4]).replace(/^Tổ\s*/,'')};
  }
  if(a==='Chữ ký - CCCD') return {tab:'kyAnh', thang:p[1]||''};
  if(a==='_ThungRac') return {tab:'rac'};
  if(a==='_Chờ xử lý') return {tab:'cho'};
  return {tab:'khac'};
}
var TEN_PHAN = {vanBan:'Văn bản', duLieu:'Dữ liệu tháng', bieuMau:'Biểu mẫu', ghiChu:'Thư viện · Ghi chú', scan:'Scan', kyAnh:'Chữ ký · CCCD', rac:'Thùng rác', cho:'Khay chờ', khac:'Chưa rõ phần'};
function tenKhachTuFile(ten){
  var t = String(ten||'').replace(/\.[^.]+$/,'');
  var m = t.match(/^(?:CCCD|HS)\x5F([^\x5F]+)/); if(m) return m[1].replace(/-/g,' ');
  return t;
}
function lapChiMuc(){
  if(!coTheNoiDrive()) return baoLoi('Chưa nối Drive. Bấm chip Drive ở dải dưới để nối rồi làm lại.');
  if(QUET.chay) return bao('Đang chạy rồi, anh chờ chút.', 3);
  if(!DK.mo || DK.phan!=='lcm') moDonKho('lcm');
  QUET = {chay:true, dung:false, xong:0, tong:0, them:0, bo:0, dang:''};
  batChay(true, 'Đang lập chỉ mục — đi qua thư mục Tủ hồ sơ…', true);
  var now = new Date().toISOString();
  var kq = {luc:now, xem:0, daCo:0, moi:{}, khay:[], canKhai:[], lech:[], mat:[], saiCho:[], boQua:[]};
  Object.keys(TEN_PHAN).forEach(function(k){ kq.moi[k] = []; });
  var tu = function(){ return D.vanBan.concat(D.duLieu, D.ghiChu, D.bieuMau||[]); };
  var biet = {};
  tu().concat(D.rac||[], D.scan||[], D.kyAnh||[]).forEach(function(m){ if(m.driveId) biet[m.driveId] = m; });
  (D.cho||[]).forEach(function(m){ if(m.driveId) biet[m.driveId] = m; if(m.tuKhay) biet[m.tuKhay] = m; });
  (D.boHS||[]).forEach(function(b){ (b.file||[]).forEach(function(f){ if(f.driveId) biet[f.driveId] = {boFile:true}; }); });
  nkDriveIds().forEach(function(d){ biet[d] = {boFile:true}; });   /* 3.52: ảnh / file ở tab Hôm nay */
  (D.daXoaHan||[]).forEach(function(t){ if(t.driveId) biet[t.driveId] = {daXoa:true}; });
  timThuMucKhongTao(D.cauHinh.thumuc).then(function(id){
    if(!id) throw new Error('Chưa có thư mục '+D.cauHinh.thumuc+' trên Drive');
    return gomTatCaDon(id);
  }).then(function(g){
    var coTrenDrive = {};
    g.files.forEach(function(f){ coTrenDrive[f.id] = 1; });
    kq.xem = g.files.length;
    g.files.forEach(function(f, i){
      if(QUET.dung) return;
      if(i%25===0){ dangLamChu('Lập chỉ mục · '+(i+1)+'/'+g.files.length+' file'); tienChay(Math.round(i/g.files.length*100)); }
      if(laFileHeThong({tenCu:f.name})) return;
      var phan = phanTheoDuong(f.duong, f.name), m = biet[f.id];
      if(m){
        kq.daCo++;
        if(m.daXoa || m.boFile) return;
        var laTu = tu().indexOf(m)>=0;
        if(laTu){
          if(f.name!==m.tenMoi){ kq.lech.push({id:m.id, ly:'Tên trên Drive khác trong app'}); delete m.driveKy; m.choKhai = true; m.lyDoKhai = 'Tên trên Drive khác trong app'; }
          if(/^(vanBan|duLieu|ghiChu|bieuMau)$/.test(phan.tab) && khoCuaMuc(m)!==phan.tab && !m.duongTuy)
            kq.saiCho.push({id:m.id, duong:f.duong, tab:phan.tab});
        }
        return;
      }
      if(/^application\/vnd\.google-apps\./.test(f.mimeType||'')){ kq.boQua.push(f.name+' (Google Docs gốc)'); return; }
      var r = taoMucTuDrive(f, phan, now);
      if(r && r.khay){ kq.khay.push(f); return; }
      if(r){ kq.moi[r.tab].push(r.m.id); if(r.canKhai) kq.canKhai.push(r.m.id); QUET.them++; }
    });
    tu().forEach(function(m){ if(m.driveId && !m.driveMat && !laFileHeThong(m) && !coTrenDrive[m.driveId]) kq.mat.push(m.id); });
    if(typeof HS!=='undefined') HS.ds = D.scan;
    noiLienKetSauQuet();
    DK.lcm = kq; QUET.chay = false; tatChay(); luu(); ve();
    var tongMoi = Object.keys(kq.moi).reduce(function(a,k){ return a+kq.moi[k].length; }, 0);
    if(kq.khay.length){ bao('Đã lập chỉ mục '+tongMoi+' file · đang đưa '+kq.khay.length+' file chưa rõ phần vào khay chờ…', 6); lapChiMucQD(kq.khay, true); }
    else bao('Lập chỉ mục xong: xem '+kq.xem+' file · '+tongMoi+' file mới vào tủ'+(kq.canKhai.length?' · '+kq.canKhai.length+' cần khai':'')+'.', 7);
  }).catch(function(e){ QUET.chay = false; tatChay(); baoLoi('Lập chỉ mục dừng: '+(e&&e.message||e)); });
}
/* dựng bản ghi cho một file Drive chưa có chỉ mục — theo dấu app hoặc theo thư mục */
function taoMucTuDrive(f, phan, now){
  if(phan.tab==='duLieu' || (f.appProperties && f.appProperties.th && tuMetaDrive(f).nhom==='duLieu')) return null;   /* 3.144: bỏ tab Tháng — không dựng lại mục Dữ liệu tháng */
  var canCu = 'Lập chỉ mục — nằm trong '+D.cauHinh.thumuc+(f.duong?' / '+f.duong:'');
  var co = function(m){
    m.driveId = f.id; m.driveCha = (f.parents||[])[0]||''; m.tenCu = f.name; m.duoi = duoiFile(f.name);
    m.co = +(f.size||0); m.themLuc = f.modifiedTime||now; m.chiMucThoi = true; m.canCu = m.canCu || canCu; return m;
  };
  /* 1. file app đã ghi dấu → khôi phục đúng tab, đủ phân loại */
  if(f.appProperties && f.appProperties.th){
    var km = tuMetaDrive(f); km.canCu = 'Khôi phục từ dấu app trên file · '+canCu;
    var k0 = laBieuMau(km) ? 'bieuMau' : (km.nhom==='duLieu' ? 'duLieu' : (km.nhom==='ghiChu' ? 'ghiChu' : 'vanBan'));
    if(phan.tab==='rac'){ km.xoaLuc = f.modifiedTime||now; km.suaLuc = now; km.khoCu = k0; D.rac.push(km); return {tab:'rac', m:km}; }
    D[k0] = D[k0]||[]; D[k0].push(km);
    var th0 = thieuThongTin(km).length; if(th0){ km.choKhai = true; km.lyDoKhai = 'Mới lập chỉ mục từ Drive'; }
    return {tab:k0, m:km, canKhai:!!th0};
  }
  var ten = f.name.replace(/\.[^.]+$/,''), laAnh = /^image\//.test(f.mimeType||'') || /\.(jpe?g|png|webp)$/i.test(f.name);
  var ngTen = rutNgay(ten) || ((ten.match(/\b20\d{2}-\d{2}-\d{2}\b/)||[])[0]) || '';
  var tab = phan.tab, m;
  /* 2. theo thư mục */
  if(tab==='vanBan'){
    var so = rutSoHieu(ten) || rutSoHieu(ten.replace(/-/g,'/'));
    m = co({id:idMoi(), nhom:'vanBan', ngay:ngTen || (f.modifiedTime||now).slice(0,10), soHieu:so||'', loai:doanLoai(ten, so),
      trichYeu:ten.replace(/^\d{4}-\d{2}(-\d{2})?[_ ]/,'').replace(/[_-]/g,' '), the:[], ctrinh:[], tenMoi:f.name});
    if(khopMauTenQuet(f.name)) m.canCu += ' · tên giống Dữ liệu tháng — kiểm lại?';
    D.vanBan.push(m);
  }else if(tab==='duLieu'){
    var mau = khopMauTenQuet(f.name), ky = phan.ky || ((ten.match(/\b(20\d{2})-(\d{2})\b/)||[])[0]) || (f.modifiedTime||now).slice(0,7);
    m = co({id:idMoi(), nhom:'duLieu', ky:ky, maLoai:mau?mau.ma:'KHAC', tenLoai:mau?mau.ten:'Khác', ghiThem:'', tenMoi:f.name});
    D.duLieu.push(m);
  }else if(tab==='ghiChu'){
    m = co({id:idMoi(), nhom:'ghiChu', ngay:ngTen || (f.modifiedTime||now).slice(0,10), moTa:ten.replace(/^\d{4}-\d{2}-\d{2}[_ ](GHI-CHU_|Ghi chú )?/,'').replace(/[_-]/g,' '), the:[], tenMoi:f.name});
    D.ghiChu.push(m);
  }else if(tab==='bieuMau'){
    m = co({id:idMoi(), ten:ten, nhom:phan.nhom, huongDan:false, soLanDung:0, tenMoi:f.name});
    D.bieuMau = D.bieuMau||[]; D.bieuMau.push(m);
  }else if(tab==='scan'){
    var t0 = f.modifiedTime||now;
    m = {id:idMoi(), che:phan.che, ten:tenKhachTuFile(f.name), xa:phan.xa||'', diem:phan.diem||'', ap:phan.ap||'', to:phan.to||'',
      ngay:t0.slice(0,10), taoLuc:t0, suaLuc:now, driveId:f.id, driveCha:(f.parents||[])[0]||'', may:'drive', tuDrive:true,
      tag:[], ctrinh:[], trang:[], co:+(f.size||0), canCu:canCu};
    if(phan.che==='the'){ m.matTruoc = true; m.matSau = true; }
    if(phan.chuaKhai) m.chuaKhai = true;
    D.scan = D.scan||[]; D.scan.push(m);
    return {tab:'scan', m:m, canKhai:!!(m.chuaKhai || !m.xa)};
  }else if(tab==='kyAnh'){
    var t1 = f.modifiedTime||now, loai = /\bCK\.(jpe?g|png)$/i.test(f.name) ? 'ky' : 'anh';
    var khach = f.name.replace(/\.[^.]+$/,'').replace(/^\d{4}-\d{2}-\d{2}\s*/,'').replace(/\s*(CK|CCCD)$/i,'');
    m = {id:'ka'+idMoi(), loai:loai, ten:f.name, khach:khach, co:+(f.size||0), ngay:ngTen || (phan.thang ? phan.thang+'-01' : t1.slice(0,10)),
      luc:t1, suaLuc:now, driveId:f.id, driveCha:(f.parents||[])[0]||'', may:'drive'};
    D.kyAnh = D.kyAnh||[]; D.kyAnh.push(m);
    return {tab:'kyAnh', m:m};
  }else if(tab==='rac'){
    m = co({id:idMoi(), tenMoi:f.name, nhom:'khac', khoCu:'vanBan', xoaLuc:f.modifiedTime||now, suaLuc:now, lyDoXoa:'Nằm sẵn trong _ThungRac (lập chỉ mục)'});
    D.rac.push(m);
    return {tab:'rac', m:m};
  }else{
    f.tuKhayDuong = f.duong;
    return {khay:true};
  }
  var th = thieuThongTin(m).length;
  if(th || /kiểm lại/.test(m.canCu)){ m.choKhai = true; m.lyDoKhai = 'Mới lập chỉ mục từ Drive'; }
  return {tab:tab, m:m, canKhai:!!(th || m.choKhai)};
}
function veLapChiMucHTML(){
  var h = '<div class="dk-mo-ta"><b>Lập chỉ mục</b> đi hết thư mục <b>'+coChuHTML(D.cauHinh.thumuc||'Tủ hồ sơ')+'</b> trên Drive để <b>mọi file đều được app quản lý</b>. '+
    'File chưa có trong app được xếp vào đúng tab theo <b>thư mục đang chứa file</b> (Văn bản, Dữ liệu tháng / năm / tháng, Biểu mẫu, Ghi chú, CCCD / xã / điểm / ấp / tổ, Hồ sơ scan, Chữ ký - CCCD). '+
    'Đủ thông tin thì vào thẳng tab, thiếu thì vào <b>Chờ khai</b>. App không dời, không đổi tên file nào.</div>'+
    '<div class="dk-hang"><button class="nho chinh" onclick="lapChiMuc()"'+(coTheNoiDrive()?'':' disabled')+'>🗂 Bắt đầu lập chỉ mục</button>'+
    (coTheNoiDrive() ? '' : '<span class="huong-dan">Cần nối Drive.</span>')+'</div>'+
    '<div class="huong-dan" style="margin:0 0 10px">Lưu ý: Google chỉ cho app thấy file do app tạo hoặc anh chọn qua “Lấy từ kho Drive cũ”. File chép tay vào ổ G thì đưa vào bằng <b>+ Thêm file</b>.</div>';
  var k = DK.lcm; if(!k) return h;
  var tongMoi = Object.keys(k.moi).reduce(function(a,x){ return a+k.moi[x].length; }, 0);
  h += '<div class="dk-khoi"><h4>Kết quả lần gần nhất · '+coChuHTML(k.luc.replace('T',' ').slice(0,16))+'</h4>'+
    '<div class="dk-tong">Đã xem <b>'+k.xem+'</b> file · đã có sẵn <b>'+k.daCo+'</b> · mới vào tủ <b>'+tongMoi+'</b>'+
    (k.canKhai.length?' · cần khai <b>'+k.canKhai.length+'</b>':'')+(k.khay.length?' · chưa rõ phần <b>'+k.khay.length+'</b> (vào khay chờ)':'')+
    (k.mat.length?' · <span class="ck-thieu">mất file '+k.mat.length+'</span>':'')+'</div>';
  Object.keys(TEN_PHAN).forEach(function(tab){
    var ids = k.moi[tab]||[]; if(!ids.length) return;
    h += '<details class="dk-ngan"><summary><b>'+TEN_PHAN[tab]+'</b> <span>'+ids.length+' mới</span></summary>'+
      ids.map(function(id){
        var m = timMuc(id) || timScan(id) || (D.kyAnh||[]).find(function(x){ return x.id===id; }) || (D.rac||[]).find(function(x){ return x.id===id; });
        if(!m) return '';
        var loai = tab==='scan' ? 'scan' : tab==='kyAnh' ? 'ka' : tab==='rac' ? 'rac' : 'muc';
        return '<div class="dk-dong"><div class="dk-ten" onclick="xemThu(\''+loai+'\',\''+id+'\')"><b>'+coChuHTML(m.tenMoi||m.ten||m.tenCu||'')+'</b>'+
          '<small>'+coChuHTML(duongThat(m, loai==='ka'?'ka':''))+'</small>'+
          (k.canKhai.indexOf(id)>=0 ? '<small class="ck-thieu">cần khai thêm</small>' : '')+'</div></div>';
      }).join('')+'</details>';
  });
  if(k.saiCho.length) h += '<details class="dk-ngan"><summary><b>Nằm khác thư mục của tab</b> <span>'+k.saiCho.length+' file — app tin theo chỉ mục, không dời</span></summary>'+
    k.saiCho.map(function(x){ var m = timMuc(x.id); if(!m) return '';
      return '<div class="dk-dong"><div class="dk-ten" onclick="xemThu(\'muc\',\''+x.id+'\')"><b>'+coChuHTML(m.tenMoi||'')+'</b>'+
        '<small>đang ở ☁ '+coChuHTML(D.cauHinh.thumuc+' / '+x.duong)+' · trong app thuộc '+coChuHTML(TEN_PHAN[khoCuaMuc(m)]||'')+'</small></div></div>'; }).join('')+'</details>';
  if(k.mat.length) h += '<details class="dk-ngan"><summary><b>Mất file trên Drive</b> <span>'+k.mat.length+' mục — dọn ở 🧹 Quét rác</span></summary>'+
    k.mat.map(function(id){ var m = timMuc(id); return m ? '<div class="dk-dong"><div class="dk-ten"><b>'+coChuHTML(m.tenMoi||'')+'</b><small>'+coChuHTML(thuMucCua(m))+'</small></div></div>' : ''; }).join('')+'</details>';
  if(k.boQua.length) h += '<div class="huong-dan">Bỏ qua: '+coChuHTML(k.boQua.join(' · '))+'</div>';
  var nCK = demChoKhai();
  h += '<div class="dk-hang" style="margin-top:8px">'+(nCK?'<button class="nho chinh" onclick="DK.mo=false;moChoKhai()">📥 Mở Chờ khai ('+nCK+')</button>':'')+'</div></div>';
  return h;
}
function moBaoCaoQuet(){
  var chua = D.vanBan.filter(function(m){ return chuaPhanLoai(m).length; }).length;
  function dongBC(id, ly){
    var m = timMuc(id); if(!m) return '';
    return '<div class="bc-dong"><div class="bc-ten">'+coChuHTML(m.tenMoi||m.tenCu||'')+
      '<small>'+coChuHTML(ly+' · '+thuMucCua(m))+'</small></div>'+
      '<button class="nho" onclick="'+(laBieuMau(m)?'suaBieuMau':'suaCho')+'(\''+id+'\')">Sửa</button></div>';
  }
  var h = '<div class="hop-tit">Kết quả quét Tủ hồ sơ</div>'+
    '<div class="hop-phu">Đã xem '+QUET.xong+' file. Chỉ đọc — không đổi tên, không dời file nào. '+
    'Bấm <b>Sửa</b> để cập nhật; bấm Lưu trong hộp sửa thì app mới đổi trên Drive.</div>';
  h += '<div class="nhan-nhom">File mới vào tủ ('+QUET.moi.length+')'+
    (QUET.khoiPhuc?' · '+QUET.khoiPhuc+' khôi phục đủ phân loại từ Drive':'')+'</div>'+
    (QUET.moi.length ? QUET.moi.map(function(id){ return dongBC(id, 'Mới thêm'); }).join('')
                     : '<div class="huong-dan">Không có file mới.</div>');
  h += '<div class="nhan-nhom">Tên cần xem lại ('+QUET.lech.length+')</div>'+
    (QUET.lech.length ? QUET.lech.map(function(x){ return dongBC(x.id, x.ly); }).join('')
                      : '<div class="huong-dan">Tên file đều đúng chuẩn.</div>');
  h += '<div class="huong-dan" style="margin-top:10px">File anh copy tay vào ổ G thì app không thấy '+
    '(Google chỉ cho app thấy file do app tạo) — đưa file vào bằng nút Thêm của app.</div>';
  h += '<div class="hang-nut" style="margin-top:12px">'+
    (chua?'<button class="nho" onclick="dongHop();locCua(\'vanBan\').chua=\'1\';ve()">Lọc '+chua+' VB chưa phân loại</button>':'')+
    '<button class="nho chinh" onclick="dongHop()">Xong</button></div>';
  moHop(h);
}
function ketQuet(t){
  QUET.chay = false; tatChay();
  luu(); capNhatDau(); ve(); dongHop();
  bao(t, 8);
}

/* --- 2. ĐỌC LẠI MỤC THIẾU --- */
function docLai(){
  var ds = mucThieu();
  if(!ds.length) return;
  dongHop();
  QUET = {chay:true, dung:false, xong:0, tong:ds.length, them:0, bo:0, dang:''};
  veQuet();
  ds.reduce(function(p, m){
    return p.then(function(){
      if(QUET.dung) return;
      QUET.xong++; QUET.dang = m.tenMoi||m.tenCu||''; veQuet();
      return docFile(m.id).then(function(b){
        if(!b) return;
        var f = new File([b], m.tenCu||'f.pdf', {type:b.type||'application/pdf'});
        return docChuPDF(f, D.cauHinh.soTrangDoc||2).then(function(kq){
          var chu = kq.chu||''; if(!chu) return;
          var mau = khopMau(chu);
          if(m.nhom==='duLieu'){
            if(mau){ m.maLoai = mau.ma; m.tenLoai = mau.ten; }
            m.ky = rutKy(chu)||m.ky;
            m.tenMoi = tenDuLieu(m, m.duoi);
            m.canCu = 'Đọc lại — khớp mẫu '+(mau?mau.ten:'Khác');
            QUET.them++;
            return;
          }
          var dauVB = docDauVB(chu), so = dauVB.so, ng = dauVB.ngay;   /* 3.53: chỉ phần đầu văn bản */
          var ty = rutTyVB(chu); if(ty && chuLoiFont(ty)) ty = null;
          if(so) m.soHieu = so;
          if(ng) m.ngay = ng;
          if(ty) m.trichYeu = ty;
          m.loai = doanLoai(chu, m.soHieu);
          if(!m.mang) m.mang = doanMang(chu);
          if(!(m.the||[]).length) m.the = goiYThe(chu, tuKhoaCua('tag'), dsTag('vanBan'));
          if(!(m.ctrinh||[]).length) m.ctrinh = ctGoiY(chu);
          m.tenMoi = tenVanBan(m, m.duoi);
          m.canCu = 'Đọc lại nội dung file';
          QUET.them++;
        });
      }).catch(function(e){ console.warn(e); });
    });
  }, Promise.resolve()).then(function(){
    ketQuet('Đọc lại xong. Cập nhật được '+QUET.them+' / '+ds.length+' mục.');
  });
}

/* --- 3. DỌN CHỈ MỤC --- */
/* 3.31 (mục 8 bàn giao): GOM FILE TRÙNG THEO DẤU VÂN (SHA-256, trường van)
   Mỗi nhóm cùng nội dung một khối; anh chọn bản giữ lại (mặc định: tên đúng chuẩn nhất, rồi bản mới nhất);
   bản còn lại vào THÙNG RÁC (khôi phục được), KHÔNG xóa hẳn. Thay cho nút "Dọn" cũ (xóa thẳng khỏi chỉ mục). */
function nhomTrungVan(){
  var nhom = {};
  ['vanBan','duLieu','ghiChu','bieuMau'].forEach(function(k){
    (D[k]||[]).forEach(function(m){ if(m.van && !laFileHeThong(m)) (nhom[m.van] = nhom[m.van]||[]).push({m:m, k:k}); });
  });
  return Object.keys(nhom).filter(function(v){ return nhom[v].length>1; }).map(function(v){
    var ds = nhom[v].slice().sort(function(a,b){
      return (tenDungChuan(b.m)?1:0)-(tenDungChuan(a.m)?1:0) ||
             String(b.m.themLuc||b.m.suaLuc||'').localeCompare(String(a.m.themLuc||a.m.suaLuc||''));
    });
    return {van:v, ds:ds};
  });
}

