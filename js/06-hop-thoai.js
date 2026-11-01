/* ---------- HỘP THOẠI CHUNG ---------- */
var hamDong = null, khoaHop = false;
function moHop(html, rong){
  nhapGiu(); HOP_KHI_DONG = null;   /* 3.68 (AD): đang điền dở mà mở hộp khác (vd Sửa danh sách tag) → giữ nháp */
  if(!/cd-dau/.test(html)) document.getElementById('hop').classList.remove('trang');
  var e = document.getElementById('hop-in');
  e.classList.remove('co-xem-ben', 'sua-gon', 'quet-gon', 'q-the', 'q-tl', 'phim-chung', 'xem-rong');
  e.innerHTML = html; e.style.width = '';   /* 3.383.5: bỏ bề rộng hộp trước đặt riêng (tcBangRong) */
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
var HOP_KHI_DONG = null;   /* 3.252: việc làm khi hộp đóng mà chưa Lưu (vd khai báo riêng mẫu → trả lại như trước khi mở) — mở hộp khác thì bỏ */
function dongHop(){ nhapGiu(); khoaHop = false; document.getElementById('hop').classList.remove('hien'); if(HOP_KHI_DONG){ var f = HOP_KHI_DONG; HOP_KHI_DONG = null; f(); } }
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
        '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Thôi</button>'+
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
  var r = (t && t.closest && (t.closest('.pv-cay') || t.closest('div.phim-chung'))) || document.querySelector('#hop-in.sua-gon .sua-trai') || document.querySelector('#hop-in.sua-gon') || document.querySelector('#hop-in.phim-chung'); if(!r) return [];
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
  var t = e.target; if(!t || !t.closest || !t.closest('#hop-in.sua-gon, #hop-in.phim-chung, .pv-cay, div.phim-chung')) return;   /* 3.242: + form trong tab (01/TD) */
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
    if(n>=0 && n<t.options.length){ t.selectedIndex = n; if(t.onchange) t.onchange(); else t.dispatchEvent(new Event('change', {bubbles:true})); }   /* 3.242: ô chọn theo data-lenh */
    return;
  }
  /* 3.75 (AP — quy tắc phím chung): → ← tiến / lùi 1 ô — CHỈ ở ô chọn.
     3.76 (anh chốt): ô gõ chữ thì ← → chỉ di con trỏ trong ô, không nhảy ô (an toàn khi sửa chữ) */
  if((e.key==='ArrowRight'||e.key==='ArrowLeft') && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey &&
     t.tagName==='SELECT' && sgO(t).indexOf(t)>=0){
    e.preventDefault(); e.stopPropagation(); sgSang(t, e.key==='ArrowLeft');
    return;
  }
  if(e.key==='Enter' && t.closest('.pv-tim')) return;   /* 3.390: ô 🔎 tìm tổ của khối lọc — Enter = chọn gợi ý đầu (js/22ga), không sang ô kế */
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
    nd += '<div class="o o-chu"><label for="s-ty">Tên văn bản <small>— vào tên file</small></label>'+chuDoiNut('s-ty')+'<input id="s-ty" autocomplete="off" value="'+
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
      '<button class="nho" data-lenh="hop.dong">Thôi</button>'+
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

function o(nhan,id,gt,hd){
  return '<div class="o"><label>'+coChuHTML(nhan)+'</label>'+
    '<input id="'+id+'" value="'+coChuHTML(gt)+'" oninput="xemTenTruoc()">'+
    (hd?'<div class="huong-dan">'+coChuHTML(hd)+'</div>':'')+'</div>';
}
/* 3.437 (anh 01/11, ảnh khai văn bản tên viết HOA hết): nút đổi chữ cho ô tên — thường · Hoa đầu câu · HOA hết · Hoa Đầu Từ.
   Giữ nguyên từ viết tắt / ký hiệu: có số, "/", "-" hoặc nằm trong danh sách (NHCSXH, HĐQT, QĐ, UBND…). Đổi xong cập nhật xem trước tên file. */
var CHU_TAT = ['NHCSXH','NHCS','HĐQT','HĐND','UBND','QĐ','TW','TƯ','CP','TTG','TTg','BĐD','KTGS','TK','TK&VV','CCCD','HSSV','GQVL','NSVSMT','NOXH','XKLĐ','PGD','CBTD','BCĐ','HĐ','NĐ','TT','CV','KH','TB','BC','VB','HND','HPN','HCCB','ĐTN','MTTQ','CT','TCTD','CNTT','QH','TDNN','VBSP'];
function chuGiu(w){ var g = w.replace(/^[^\wÀ-ỹĐđ]+|[^\wÀ-ỹĐđ&]+$/g, ''); return /[\d\/-]/.test(g) || CHU_TAT.indexOf(g.toLocaleUpperCase('vi'))>=0 && g===g.toLocaleUpperCase('vi'); }
function chuDoi(s, kieu){
  s = String(s||'').replace(/\s+/g, ' ').trim(); if(!s) return s;
  if(kieu==='hoa') return s.toLocaleUpperCase('vi');
  var w = s.split(' ').map(function(x){ if(chuGiu(x)) return x; var t = x.toLocaleLowerCase('vi'); return kieu==='tu' ? t.charAt(0).toLocaleUpperCase('vi')+t.slice(1) : t; });
  if(kieu==='cau'){ var i = 0; while(i<w.length && chuGiu(w[i])) i++; if(i<w.length) w[i] = w[i].charAt(0).toLocaleUpperCase('vi')+w[i].slice(1); }
  return w.join(' ');
}
function chuDoiNut(id){
  if(!chuDoiNut.dk && typeof GD!=='undefined'){ chuDoiNut.dk = 1; GD.dangKy('chu', {doi:function(el){ var o = document.getElementById(el.getAttribute('data-o')); if(!o) return; o.value = chuDoi(o.value, el.getAttribute('data-k')); o.dispatchEvent(new Event('input', {bubbles:true})); o.focus(); }}); }
  return ' <span class="chu-doi">'+[['thuong','aa','chữ thường'], ['cau','Aa.','Viết hoa đầu câu'], ['hoa','AA','VIẾT HOA HẾT'], ['tu','Aa Aa','Viết Hoa Đầu Mỗi Từ (như tên)']].map(function(x){
    return '<button type="button" class="nho" data-lenh="chu.doi" data-o="'+id+'" data-k="'+x[0]+'" title="'+x[2]+' — giữ nguyên ký hiệu, từ viết tắt (NHCSXH, 54/QĐ-HĐQT…)">'+x[1]+'</button>'; }).join('')+'</span>';
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
      'Bấm một dòng → xem ở khung bên phải. Nút dưới khung: '+hdNut("🖨 In")+hdNut("✎ Sửa")+hdNut("📤 Gửi")+' và (máy đã cài cầu nối) '+hdNut('🖥 Mở máy')+hdNut('📋 Chép')+hdNut('📂')+'.',
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
  if(p==='ghiChu') return '<h3>Tab Thư viện — 📁 Bộ hồ sơ · 🖼 Ghi chú ảnh</h3>'+
    '<p><b>Bộ hồ sơ</b> là một vụ việc gom đủ giấy tờ một chỗ, ví dụ <i>Rủi ro · Võ Văn Cường</i>: ghi chú tự do + biên bản rủi ro, giấy chứng tử, bản scan HĐ lưu…</p>'+
    hdLuong([hdNut('+ Tạo bộ hồ sơ'), '🏷 <b>Loại + tên khách</b><br><small>Rủi ro · Hồ sơ vay · Gia hạn…</small>', '📍 <b>Địa bàn</b><br><small>Xã › Điểm GD › Ấp/KP › Tổ (Hội tự điền)</small>', '📝 <b>Ghi chú</b> + 📎 <b>File</b>'])+
    hdBuoc(['Bên trái là <b>cây địa bàn</b> Xã › Điểm GD › Ấp/KP › Tổ (kèm Hội của tổ) và danh sách Hội — bấm để lọc các bộ; số bên cạnh là số bộ.',
      'Trong một bộ: chọn Xã → Điểm → Ấp → Tổ; <b>Hội tự điền theo tổ</b> (sửa được). Ô ghi chú tự lưu khi gõ.',
      hdNut('🔗 Gắn file có sẵn')+': tìm và tích file ở bất kỳ tab nào (văn bản, scan, chữ ký·CCCD…) — chỉ liên kết, file vẫn ở chỗ cũ.',
      hdNut('📎 Thêm file mới')+': file riêng của bộ, tự lên Drive <i>'+coChuHTML(T)+' / Bộ hồ sơ / tên bộ</i>.',
      'Bấm tên file để xem thử. ✕ = gỡ khỏi bộ (file gắn) hoặc bỏ vào thùng rác (file riêng). '+hdNut('🗑 Xóa bộ','xau')+' → thùng rác, ngăn Bộ hồ sơ.',
      'Xem một văn bản ở tab khác: khung xem ghi "📁 Thuộc bộ: …", bấm là mở bộ.'])+
    '<p><b>Ghi chú ảnh</b>: chụp / chọn ảnh ghi chú (bảng phân bổ vốn, thông báo…), gõ mô tả.</p>'+
    '';
  if(p==='scan') return '<h3>Tab Scan — CCCD và hồ sơ giấy</h3>'+
    '<p>Ảnh xử lý trong máy, không gửi tới AI · lưu hồ sơ là bản PDF lên Drive: <b>Tủ hồ sơ/CCCD</b> (thẻ) và <b>Tủ hồ sơ/Hồ sơ scan</b> (tài liệu), chia theo xã › điểm › ấp › tổ.</p>'+
    '<p><b>Thanh lọc chung (3.151):</b> '+hdNut('⚲ Lọc')+' Xã / Tag / ⚠ Chưa đạt · '+hdNut('⇅')+' nhóm theo Ngày / Tuần / Tháng · '+hdNut('☰ ▾')+' Danh sách / Cây địa bàn / ▦ Bảng · '+hdNut('⋯')+' Chế độ quét, Webcam, Chữ ký·CCCD.</p>'+
    '<p><b>Danh sách (3.61):</b> mỗi bản 2 dòng — dòng 2 ghi <b style="color:var(--luc)">✓ Đạt</b> (tên khách, đủ 2 mặt, đủ Xã › Điểm › Ấp › Tổ, đã lên Drive đúng thư mục tổ) hoặc <b style="color:var(--vang)">⚠ thiếu gì</b>. '+
    'Chip '+hdNut('⚠ Chưa đạt (n)')+' lọc bản cần xử lý. Xem '+hdNut('☰ Danh sách')+' (mới lưu lên trước, nhóm Ngày / Tuần / Tháng) hoặc '+hdNut('🌳 Cây địa bàn')+' (bấm tổ để lọc). '+
    'Máy tính: bấm một bản → xem ở khung bên phải; '+hdNut('⛶')+' mở màn Lưu & gửi. Tích ☐ nhiều bản → 🖨 In chung 4 người / A4.</p>'+
    '<p>Hai chế độ: <b>Thẻ</b> (CCCD 2 mặt, in 4 người / A4 có đường cắt) và <b>Tài liệu</b> (nhiều trang thành 1 PDF).</p>'+
    hdLuong(['📷 <b>Quét</b><br><small>⚡ tự chụp khi khung xanh đứng yên, hoặc ✋ thủ công</small>','① <b>Chỉnh</b><br><small>kéo 4 góc, đổi chỗ, xoay</small>','② <b>Xem</b><br><small>đúng bản PDF sẽ lưu</small>','③ <b>Lưu & gửi</b><br><small>lưu máy · gửi · copy · lưu tủ</small>'])+
    hdBuoc(['Mọi bước có thanh '+hdNut('‹ Lùi')+' ① ② ③ '+hdNut('Tiếp ›','chinh')+'; bấm số bước đã qua để quay lại. Máy tính: <b>Esc = Lùi, Enter = Tiếp</b>.',
      '① Chỉnh: chạm 1 ảnh rồi chạm ảnh khác để đổi chỗ (máy tính kéo thả) · ▲▼ dời cả người · ⇄ đổi mặt · '+hdNut('✂ Chỉnh viền')+' kéo 4 góc có kính lúp.',
      '③ (3.155) hộp chọn: '+hdNut('💾 Lưu vào máy')+' (PDF như bản in — thẻ 4 người / A4) · '+hdNut('📤 Gửi')+' · '+hdNut('📋 Copy ảnh')+' · '+hdNut('🗄 Lưu vào tủ')+'. Không tự lưu tạm vào tủ nữa.',
      '🗄 Lưu vào tủ: gõ tên / mã KH / CCCD → chọn khách trong danh bạ Mẫu 31, app tự điền xã + ấp; lưu <i>CCCD (hoặc Hồ sơ scan) / Xã / Ấp / Mã KH Tên.pdf</i> — không theo tổ (khách có thể chuyển tổ). Thẻ nhiều người: mỗi người chọn 1 khách.',
      'Đóng hộp mà chưa xong: bản quét giữ trong máy (dải vàng đầu tab → Mở lại), quá 7 ngày tự bỏ. Bản lưu tạm cũ (trước 3.155) vẫn khai được như trước.']);
  if(p==='kyAnh') return '<h3>Chữ ký · CCCD — ảnh nhỏ dưới 200 KB để nhập hệ thống</h3>'+
    '<p>Mở bằng '+hdNut('📁 Chữ ký · CCCD')+' ở tab Scan. Cùng luồng ① ② ③ và <b>cùng màn chỉnh tay với Scan</b>.</p>'+
    hdBuoc(['Gõ <b>tên khách</b> (app nhớ 30 phút) → '+hdNut('✍ Chụp chữ ký')+' hoặc '+hdNut('🪪 Chụp CCCD')+'.',
      '① Chỉnh: app tự khoanh vùng chữ ký / tìm khung thẻ và nắn thẳng. Chưa vừa: '+hdNut('✂ Chỉnh viền')+' kéo 4 góc (kính lúp), '+hdNut('⟲ Trái')+hdNut('⟳ Phải')+hdNut('⇅ Lật')+hdNut('📐 Làm thẳng')+'. CCCD chọn mức Nhỏ / Vừa / Nét.',
      '② Xem: ảnh cuối cùng + dung lượng (✓ dưới 200 KB) + tên file <i>2026-09-28 Nguyen Van A CK.jpg</i>.',
      '③ Lưu: lên Drive <i>Chữ ký - CCCD / tháng</i>; máy bàn '+hdNut('💾 Lưu nhanh')+hdNut('📋 Copy')+', điện thoại '+hdNut('📤 Gửi')+'.']);
  if(p==='xoa') return '<h3>Xóa & Thùng rác — một quy tắc</h3>'+
    hdLuong([hdNut('🗑 Xóa file')+' ở đầu tab<br>bấm file để tích', '🗑 <b>Thùng rác</b><br><small>ngăn theo tab</small>', '↩ <b>Khôi phục</b> về đúng chỗ<br>hoặc <b>Xóa hẳn</b>'])+
    hdBuoc(['<b>Cứ xóa là vào thùng rác</b> (3.153: mọi tab — file, ô Số liệu, bản cũ khi thay file, việc lịch, lần làm việc, kế hoạch KTGS, bộ biểu mẫu). Xóa 1 mục không hỏi; xóa nhiều hỏi 1 lần. Không còn nút Hoàn tác — cần lấy lại thì vào 🗑 Thùng rác → Khôi phục.',
      hdNut('🗑 Xóa file')+' ở đầu mỗi tab: bấm vào file để tích (hoặc '+hdNut('Chọn tất cả đang lọc')+', '+hdNut('Thêm vào tủ trước ngày…')+') → '+hdNut('Xóa N file','xau')+'.',
      'Mở '+hdNut('🗑')+': dòng đầu cho biết bao nhiêu file ở ngăn nào. Bấm tên file để <b>xem thử</b>. Khôi phục từng file, cả ngăn đã chọn, hoặc '+hdNut('Làm trống ngăn này','xau')+' / '+hdNut('Làm trống cả thùng','xau')+'.',
      '<b>Xóa hẳn</b>: file trên Drive vào thùng rác Google Drive (Google giữ thêm 30 ngày). Thùng rác app giữ 30 ngày rồi tự xóa hẳn ('+hdNut('☑ Tự xóa hẳn rác cũ hơn 30 ngày')+' bật sẵn, bỏ tích nếu muốn giữ lâu hơn).',
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
    '<div class="hang-nut" style="margin-top:12px"><button class="nho chinh" data-lenh="hop.dong">Đóng (Esc)</button></div>';
  moHop(h, true);
  var t = document.querySelector('#hop-in .hd-than'); if(t) t.scrollTop = 0;
}
/* ✨ CÓ GÌ MỚI — hiện 1 lần khi mở bản mới; bấm dòng nào thì app dẫn tới đúng chỗ đó */
var CO_GI_MOI = {ban:'3.438', ds:[
  ["🏷 Văn bản: tự gắn tag nguồn theo số hiệu — VB Trung ương · NHCSXH Trung ương · Chỉ đạo của Tỉnh", ""],
  ["🔤 Khai văn bản: nút đổi chữ ô Tên — thường · Hoa đầu câu · HOA · Hoa Đầu Từ", ""],
  ["💰 Lãi tồn số liệu theo ngày: món đã trả lãi ở phiên gần nhất không còn lãi tồn (QT-C-03)", ""],
  ["📅 Tra cứu theo ô kỳ góc phải (mặc định mới nhất), thẻ khách ghi rõ kỳ số liệu", ""],
  ["🔍 Tra cứu khách: khối Tổ & địa bàn trọn trong ô, không phải cuộn", ""],
  ["🏷 Sửa: tên xã không còn hiện \"Vay trực tiếp\" (Tra cứu khách, danh sách, địa chỉ trên mẫu hồ sơ)", ""],
  ["✨ Có gì mới: thêm hướng dẫn thử (nút mới ở đâu) và mục Đã bỏ / thay thế", "moHuongDan('moi')"],
  ["📅 Mẫu 06A: số liệu mặc định cuối tháng trước (hoặc gần nhất có được)", ""],
  ["📄 Mẫu 06A/TD (727) — kiểm tra từng hộ, mỗi món 1 phiếu; nút 06A ở Mẫu 06 KTGS", ""],
  ["🧾 Mẫu 06 kiểm tra sau giải ngân: chọn Tất cả / Lần 1 (727)", ""],
  ["🏷 Bỏ tên \"Tèo\": gọi App · Giao ban · TK 1, 2, 3 · Gemini; nút \"📤 File đối chiếu giao ban\"", ""],
  ["🔎 So file giao ban: app tự so DOI_CHIEU_GB với số app, tự phân loại lệch A–D (⋯ Nạp & KT)", ""],
  ["📋 Bảng trạng thái chung tự sinh mỗi bản (docs/TRANG_THAI_CHUNG.md) · luật chỉ chốt khi có phép thử chung", ""],
  ["📄 Nháp Thông báo kết luận theo phiên (08/GDX, Word) từ bộ số chuẩn — để đối chiếu với bản giao ban", ""],
  ["📝 Nháp Nội dung họp mẫu 08 (Word) từ bộ số chuẩn — để đối chiếu với bản giao ban", ""]],   /* 3.230: chỉ giữ 15 dòng gần nhất — đủ lịch sử ở docs/CHANGELOG.md (tools/bump.py tự cắt) */
  thu:[   /* 3.432 (anh 01/11): HƯỚNG DẪN THỬ — nút mới ở đâu, mới nhất trên cùng (tools/bump.py thêm theo spec 'thu', giữ 20 dòng) */
    "3.438 · Văn bản › ＋ Thêm file PDF Nghị định (Số: 54/2026/NĐ-CP) hoặc tên file 54_2026_NĐ-CP → app tự nhận số hiệu đủ, loại Nghị định, tag VB Trung ương",
    "3.438 · Văn bản › khai văn bản số 54/2026/NĐ-CP → Loại tự chọn Nghị định, tự thêm chip tag \"VB Trung ương\"; số …/NHCS-KHTD → tag \"Chỉ đạo của Tỉnh\"; …/NHCS-TDNN, …/QĐ-HĐQT → \"NHCSXH Trung ương\"",
    "3.438 · Văn bản › đầu tab nút 🏷 Gắn tag nguồn (n) → gắn tag cho văn bản cũ (hỏi trước, chỉ thêm tag)",
    "3.438 · Văn bản › bộ lọc tag: chọn \"Chỉ đạo của Tỉnh\" / \"VB Trung ương\" để xem riêng",
    "3.437 · Văn bản › khai / sửa 1 văn bản → ô Tên văn bản, góc phải có 4 nút aa · Aa. · AA · Aa Aa → bấm thử, ký hiệu (NHCSXH, 54/QĐ-HĐQT) giữ nguyên, xem trước tên file đổi theo",
    "3.436 · Góc phải chọn ngày 30/10 → Tra cứu › thẻ tổ: cột Lãi tồn chỉ còn người chưa trả lãi phiên gần nhất / có lãi quá hạn; chọn T9 → như tab Tổ (chốt tháng)",
    "3.435 · Góc phải chọn T9/2026 → Tra cứu › mở 1 khách: đầu thẻ ghi 📅 T9/2026, \"Món vay — T9/2026\", dư nợ / lãi tồn / số dư 105 theo T9; đổi lại kỳ mới nhất → số đổi theo",
    "3.435 · Tra cứu › thẻ tổ (Tổ trưởng): \"Số liệu …\" theo kỳ đang chọn",
    "3.434 · Tra cứu › mở 1 khách → khối Tổ & địa bàn: mã tổ + nút 🏘 Tổ của điểm GD ở dòng tiêu đề, ghi chú số liệu ở ⓘ cuối dòng Thành viên, không thanh cuộn",
    "3.433 · Tra cứu › mở khách có món vay trực tiếp (vd GQVL) → khối Liên hệ, dòng Ấp · xã ghi đúng tên xã (không còn \"Vay trực tiếp\")",
    "3.432 · ⚙ Cài đặt › ✨ Có gì mới (hoặc ❓ › Có gì mới): xem 2 mục \"Thử trên máy — nút mới ở đâu\" và \"Đã bỏ / thay thế\"",
    "3.431 · Hồ sơ vay › bấm 06A/TD: kỳ số liệu tự về Mẫu 31 cuối tháng trước, báo \"📅 06A: số liệu đến …\"",
    "3.430 · Hồ sơ vay › 06A/TD: chọn tổ → người vay → món → phiếu 2 trang mẫu 727, ô tự điền",
    "3.430 · KTGS › Mẫu 06 sau giải ngân › chọn đến 1 tổ → nút 📄 06A ở từng món → sang Hồ sơ vay đúng người vay, món",
    "3.429 · KTGS › Mẫu 06 sau giải ngân: chip Tất cả (n) / Lần 1 (m)",
    "3.427 · ⋯ Nạp & KT › 🔎 So file giao ban: nạp DOI_CHIEU_GB_<ngày>.csv → bảng lệch A–D, 📥 CSV lệch",
    "3.426 · ⋯ Nạp & KT › 📐 Bộ số chuẩn › 📄 Nháp TB kết luận (Word)",
    "3.425 · ⋯ Nạp & KT › 📐 Bộ số chuẩn › 📝 Nháp Nội dung họp mẫu 08 (Word)",
    "3.424 · ⋯ Nạp & KT › 📐 Bộ số chuẩn: chỉ tiêu theo điểm × Hội, 📥 CSV, 📂 So với file đáp án",
    "3.420 · Ở bất kỳ đâu bấm Ctrl+K → gõ tên tab / công cụ / khách / tổ (không dấu) → Enter"],
  bo:[   /* 3.432 (anh 01/11): CHỨC NĂNG ĐÃ BỎ / THAY THẾ — mới nhất trên cùng (spec 'bo', giữ 20 dòng) */
    "3.435 · Tra cứu: bỏ luật \"luôn lấy số liệu mới nhất\" (3.347) → theo ô kỳ góc phải, chưa chọn thì vẫn mới nhất",
    "3.434 · Thẻ tổ (Tra cứu): bỏ nút 👪 Lập hồ sơ hộ mới vào tổ (anh đã bỏ 29/10, 3.410 trả lại nhầm) — vẫn lập được ở 🏘 Tổ của điểm GD",
    "3.434 · Khối Tổ & địa bàn: bỏ dòng \"Mã tổ\" riêng (lên dòng tiêu đề) và dòng ghi chú số liệu dài (thành ⓘ rê chuột)",
    "3.416.4 · Thẻ tổ: bỏ chip \"n còn lãi tồn\" dưới bảng → ô Lưu ý ghi \"n không dư nợ · m hết gốc còn lãi\"",
    "3.416.2 · Thẻ tổ: bỏ 3 hàng ô kẻ (17 ô) và ô CCCD ghi nhầm căn cứ → đầu thẻ gọn",
    "3.416.1 · Danh sách tổ (Tra cứu): bỏ cột Xã (xã ghi ở đầu khung)",
    "3.416.1 · 👑 Kiểm CCCD: tạm bỏ tổ phó (chỉ kiểm tổ trưởng)",
    "3.410 · Tab Tổ: gỡ 📉 Diễn biến tổ, 📅 Biến động tổ viên cả năm, dòng \"Biến động +x vào · −y ra\", cột Mới vào / 105 tăng giảm, chip Mới vào tổ, ⚖ So cách cũ / mới (giữ chip Ra khỏi tổ) — làm lại đơn giản sau (C11)"]};
function noiDungCoGiMoi(){
  return '<h3>Bản '+CO_GI_MOI.ban+' có gì mới</h3><div class="hd-moi">'+CO_GI_MOI.ds.map(function(x){
      return '<button class="hd-moi-dong" onclick="'+x[1]+'">'+coChuHTML(x[0])+' <span>›</span></button>'; }).join('')+'</div>'+
    '<p class="sl-phu">Lịch sử đầy đủ các bản: <a href="https://github.com/nhannt3-gif/tu-ho-so/blob/main/docs/CHANGELOG.md" target="_blank" rel="noopener">docs/CHANGELOG.md</a></p>'+
    '<h3>Thử trên máy — nút mới ở đâu</h3>'+hdBuoc(CO_GI_MOI.thu.map(coChuHTML))+
    ((CO_GI_MOI.bo||[]).length ? '<h3>Đã bỏ / thay thế</h3>'+hdBuoc(CO_GI_MOI.bo.map(coChuHTML)) : '');   /* 3.432 (anh 01/11) */
}
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
    a.download = ten; document.body.appendChild(a); a.click(); thuHoiSau(a.href); a.remove();
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
