/* ==========================================================
   3.170 (anh chốt 11/10/2026 — docs/KE_HOACH_HO_SO_TO.md): 📝 HỒ SƠ TỔ · 📄 HỒ SƠ VAY
   Hai tab con của Số liệu, cùng quy tắc các tab: khối LỌC ĐỊA BÀN → chọn mẫu ở cột trái → tùy chọn → xem A4 ngay khung phải
   → 🖨 In · 📄 PDF · 📝 Word (.docx đúng khổ) · 📤 Gửi.
   - Nguyên tắc (anh chốt): căn cứ số liệu điền tự động hết mức có thể; không có thì để chấm ghi tay.
   - Ô điền 3 màu (chỉ trên màn hình, in ra chữ đen): xanh lá = số liệu · vàng = khai báo 1 lần · chấm = ghi tay.
   - ⚙ Khai báo 1 lần (lưu cùng cài đặt, đồng bộ Drive): PGD · trưởng ấp · tổ phó thực tế · mục đích vay. Người của Hội cấp xã lấy ở 🏛 Khai báo Hội đoàn thể.
   - Quy tắc từng mẫu vay (thời hạn, kỳ hạn, mức vay) CHƯA đặt — anh bàn riêng từng mẫu; các ô đó để chấm.
   - Lời văn mẫu: mẫu công khai của ngành (QĐ 70/QĐ-HĐQT ngày 27/8/2026, QĐ 54); không có dữ liệu thật.
   ========================================================== */
var HSO_MAU = {
  hst: [
    {k:'10c',  ma:'10C/TD', ten:'Biên bản họp kết nạp, cho ra khỏi Tổ', ghi:'mẫu cũ (vào tổ đến 30/09/2026) · mẫu mới QĐ 70 (từ 01/10/2026) — tự chọn theo ngày họp', mg:[10, 20, 10, 30]},
    {k:'10a',  ma:'10A/TD', ten:'Biên bản họp thành lập Tổ', mg:[20, 20, 20, 30]},
    {k:'10b',  ma:'10B/TD', ten:'Biên bản họp kết nạp, thay đổi Ban quản lý Tổ', mg:[20, 20, 20, 30]},
    {k:'11',   ma:'11/TD',  ten:'Hợp đồng ủy nhiệm', mg:[20, 20, 20, 30]},
    {k:'01bg', ma:'01/BG',  ten:'Biên bản bàn giao hồ sơ Tổ', mg:[20, 20, 20, 30]},
    {k:'02bg', ma:'02/BG',  ten:'Bàn giao kiêm đối chiếu số dư tiền vay, tiền gửi', ngang:true, mg:[15, 10, 15, 12]}
  ],
  hsv: [
    {k:'01td', ma:'01/TD',  ten:'Giấy đề nghị vay vốn kiêm phương án sử dụng vốn vay', mg:[12, 18, 10, 22]},
    {k:'03td', ma:'03/TD',  ten:'Danh sách tổ viên đề nghị vay vốn', ngang:true, mg:[10, 15, 10, 20]},
    {k:'04td', ma:'04/TD',  ten:'Thông báo kết quả phê duyệt cho vay', mg:[20, 20, 20, 30]},
    {k:'09a',  ma:'09A/TD', ten:'Giấy đề nghị gia hạn nợ', mg:[15, 20, 15, 30]}
  ]
};
var HSO = {khoa:'', kn:{}, ra:{}, tv:{}, vay:{}, o:{}};   /* lựa chọn trong lần làm việc (đổi tổ / mẫu → làm lại) */
var HSO_TR = {};   /* tổ trưởng / tổ phó kỳ trước theo mã tổ (gợi ý bàn giao, bầu thay) */
var HSO_HEN = null;
function hsoCH(){ var C = D.cauHinh.hsoTK = D.cauHinh.hsoTK || {ky:'', hst:'10c', hsv:'01td'}; return pvGan(C); }
function hsoTab(){ return D.cauHinh.slTab==='hsv' ? 'hsv' : 'hst'; }
function hsoMau(p){ p = p || hsoTab(); var k = hsoCH()[p], ds = HSO_MAU[p]; return ds.find(function(m){ return m.k===k; }) || ds[0]; }
function hsoLuu(){ D.cauHinh.hsoO = D.cauHinh.hsoO || {}; return D.cauHinh.hsoO; }   /* lựa chọn nhớ cho lần sau (mức tiết kiệm, vai trò Hội…) */
PV_DUNG.hst = {S:function(){ return hsoCH(); }, K:function(){ return TO_K; }, sau:function(){ hsoVe(); }, toBatBuoc:true, daChieu:true};
PV_DUNG.hsv = {S:function(){ return hsoCH(); }, K:function(){ return TO_K; }, sau:function(){ hsoVe(); }, toBatBuoc:true, daChieu:true};

/* ---------- ⚙ khai báo 1 lần ---------- */
var HSO_PGD_O = [['ten','Tên trong câu','Phòng giao dịch NHCSXH Gò Dầu'], ['ngan','Chi nhánh / PGD NHCSXH (điền sau chữ "NHCSXH")','Gò Dầu'], ['kinhGui','Kính gửi (đơn vay)','Ngân hàng Chính sách xã hội Gò Dầu'],
  ['dau1','Đầu trang dòng 1','NHCSXH TỈNH TÂY NINH'], ['dau2','Đầu trang dòng 2','PGD GÒ DẦU'], ['noi','Nơi lập ("…, ngày")','Gò Dầu'], ['tinh','Tỉnh','Tây Ninh'],
  ['daiDien','Người đại diện (ký hợp đồng ủy nhiệm)',''], ['chucVu','Chức vụ người đại diện','Giám đốc'], ['diaChi','Địa chỉ PGD',''], ['dt','Số điện thoại PGD',''], ['cbtd','Cán bộ tín dụng (người lập)','']];
function hsoKB(){
  var k = D.cauHinh.hsoKB = D.cauHinh.hsoKB || {}; k.pgd = k.pgd || {}; k.ap = k.ap || {}; k.pho = k.pho || {}; if(typeof k.md!=='string') k.md = '';
  return k;
}
function hsoPGD(f){ var v = hsoKB().pgd[f], o = HSO_PGD_O.find(function(x){ return x[0]===f; }); return v!==undefined && v!=='' ? v : (o ? o[2] : ''); }
function hsoKBHop(){
  var K = TO_K, kb = hsoKB(), S = hsoCH(), ap = {}, to = [];
  if(K) Object.keys(K.to).forEach(function(m){ var t = K.to[m]; if(toLaTT(t) || !t.tenThon) return;
    if(S.xa && t.xa!==S.xa) return; var k = hsoApKhoa(t); if(!ap[k]) ap[k] = {k:k, xa:t.tenXa||'', ap:hsoApTen(t)};
    if(!S.diem || t.khoaDiem===S.diem) to.push(t); });
  var dsAp = Object.keys(ap).map(function(k){ return ap[k]; }).sort(function(a, b){ return (a.xa+a.ap).localeCompare(b.xa+b.ap, 'vi', {numeric:true}); });
  to.sort(function(a, b){ return (a.tenThon+a.ten).localeCompare(b.tenThon+b.ten, 'vi', {numeric:true}); });
  var o = function(id, nhan, gt, ph, js){ return '<label class="kt-kb"><span>'+nhan+'</span><input id="'+id+'" value="'+coChuHTML(gt||'')+'" placeholder="'+coChuHTML(ph||'')+'" oninput="'+js+'"></label>'; };
  moHop('<div class="hop-tit">⚙ Khai báo 1 lần — hồ sơ Tổ, hồ sơ vay</div><div class="hop-phu">Lưu cùng cài đặt (đồng bộ Drive). Ô có khai báo in nền vàng ở khung xem. Người của Hội cấp xã (Chủ tịch, Phó Chủ tịch…) lấy ở '+
      '<a href="#" onclick="event.preventDefault();dongHop();ktCH().che=\'hdt\';ktCH().hdtTab=\'hoi\';slDoiTab(\'kt\')">🏛 Khai báo Hội đoàn thể</a>.</div>'+
    '<details open class="hso-kb-nhom"><summary>🏦 Phòng giao dịch</summary><div class="hso-kb-luoi">'+HSO_PGD_O.map(function(x){ return o('hso-kb-'+x[0], x[1], kb.pgd[x[0]], x[2] || 'chưa khai → chấm', 'hsoKB().pgd[\''+x[0]+'\']=this.value.trim();luu()'); }).join('')+'</div></details>'+
    '<details'+(dsAp.length ? ' open' : '')+' class="hso-kb-nhom"><summary>🏘 Trưởng ấp / khu phố'+(S.xa ? ' (xã đang lọc)' : '')+' — '+dsAp.length+' ấp</summary>'+
      (dsAp.length ? '<div class="hso-kb-luoi">'+dsAp.map(function(a){ return o('', a.ap+(S.xa ? '' : ' · '+a.xa), kb.ap[a.k], 'họ tên trưởng ấp', 'hsoKB().ap[\''+a.k.replace(/'/g, "\\'")+'\']=this.value.trim();luu()'); }).join('')+'</div>'
        : '<div class="sl-phu">Chưa có số liệu tổ — nạp Mẫu 31 ở 📥 Nạp &amp; KT.</div>')+'</details>'+
    '<details'+(S.xa ? ' open' : '')+' class="hso-kb-nhom"><summary>👥 Tổ phó thực tế (tổ trên máy chưa khớp) — '+to.length+' tổ'+(S.xa ? '' : ' · chọn xã để rút gọn')+'</summary>'+
      (to.length ? '<div class="hso-kb-luoi">'+to.slice(0, 200).map(function(t){ return o('', 'Tổ '+(t.ten||t.ma)+' · '+pvApNgan(t.tenThon)+' — máy: '+(t.pho||'chưa có'), kb.pho[t.ma], 'trống = theo máy', 'hsoKB().pho[\''+t.ma+'\']=this.value.trim();luu()'); }).join('')+'</div>' : '')+'</details>'+
    '<details class="hso-kb-nhom"><summary>🎯 Mục đích vay (danh mục chọn ở đơn vay)</summary><div class="sl-phu">Mỗi dòng 1 mục. Gắn chương trình: ghi mã viết tắt trước dấu hai chấm, vd <code>HSSV: Chi phí học tập, sinh hoạt</code>; không ghi = dùng cho mọi chương trình.</div>'+
      '<textarea id="hso-kb-md" rows="6" style="width:100%" oninput="hsoKB().md=this.value;luu()">'+coChuHTML(kb.md)+'</textarea></details>'+
    '<div class="hang-nut"><button class="nho chinh" onclick="dongHop();hsoVe()">Xong</button></div>', true);
}
function hsoApTen(t){ return String((t && t.tenThon) || '').replace(/^(ấp|ap|thôn|khu phố|kp)\.?\s+/i, '').trim(); }
function hsoApKhoa(t){ return (t.xa||'')+'|'+(t.thon || hsoApTen(t)); }
function hsoXaTen(tenXa){ return String(tenXa||'').trim().replace(/^(xã|phường|thị trấn|đặc khu)\s+/i, ''); }
function hsoMucDich(ct){   /* danh mục mục đích vay đã khai (theo chương trình + dùng chung) */
  var r = []; String(hsoKB().md||'').split(/\n/).forEach(function(d){ d = d.trim(); if(!d) return; var m = d.match(/^([A-Za-z]{2,10})\s*:\s*(.+)$/);
    if(m){ if(ct && m[1].toUpperCase()===ct) r.push(m[2].trim()); } else r.push(d); });
  if(!r.length && /^HSSV/.test(ct||'')) r.push('Chi phí học tập, sinh hoạt');
  return r;
}

/* ---------- thông tin tổ / khách dùng cho mẫu ---------- */
function hsoTo(t){
  var kb = hsoKB(), r = {tinh:hsoPGD('tinh')};
  if(!t) return r;
  r.ma = t.ma; r.tt = t.ten || ''; r.phoMay = t.pho || ''; r.pho = kb.pho[t.ma] || t.pho || ''; r.phoKB = !!kb.pho[t.ma];
  r.ap = hsoApTen(t); r.xa = hsoXaTen(t.tenXa); r.xaDu = ktXaChu(t.tenXa); r.capAp = ktCapAp(t.tenXa); r.truongAp = kb.ap[hsoApKhoa(t)] || '';
  var co = String(t.dv||'') && String(t.dv)!=='99';
  r.hoiNgan = co ? (ktChuan(t).ten || tdnHoi(t.dv)) : ''; r.hoi = co ? (ktHoiKB(ktHoiKhoa(t)).ten || ktHoiTenTD(t)) : '';
  r.diem = String(t.tenDiem||'').trim(); r.ngayGD = t.ngayGD || '';
  return r;
}
function hsoBoHoi(s){ return String(s||'').replace(/^(Hội|Đoàn)\s+/i, ''); }
function hsoHoiO(T, n){ var h = T.hoi || ''; return /^Hội\s/i.test(h) || !h ? 'Hội '+hsoO(hsoBoHoi(h), 'sl', n) : hsoO(h, 'sl', n); }   /* mẫu ghi "Hội ……": Hội → "Hội " + tên; Đoàn TN → tên đầy đủ (không thành "Hội Đoàn…") */
function hsoNguoiHoi(t){ var vt = hsoLuu().hoiVT; if(vt===undefined) vt = 'pct'; return t && vt ? ktNguoi(t, vt) : {cb:'', cv:''}; }
function hsoKhach(kh, t){   /* nhân thân khách: danh bạ (Mẫu 31 các kỳ) + dòng Mẫu 31 kỳ đang xem */
  var c = (SL_DB && SL_DB.kh && SL_DB.kh[kh]) || {}, r0 = ((TO_K && t && TO_K.kh[t.ma]) || []).find(function(o){ return o.kh===kh && o.cccd; }) || {};
  var g = function(f){ return c[f] || r0[f] || ''; };
  return {kh:kh, ten:g('ten'), ns:g('ns'), cccd:g('cccd'), ncap:g('ncap'), noiCap:g('noiCap'), ap:hsoApTen({tenThon:g('tenThon')}) || (t ? hsoApTen(t) : ''), tenXa:g('tenXa') || (t ? t.tenXa : '')};
}
function hsoTTKH(t){   /* mã KH của tổ trưởng: DSTO / Thông tin tổ trưởng; không có → tổ viên trùng tên (chỉ 1 người) */
  var m = (t.ds && t.ds.ttKH) || (t.tt && t.tt.ttKH) || ''; if(m) return {kh:m, cc:'mã KH tổ trưởng trên DSTO'};
  var ds = {}; ((TO_K && TO_K.kh[t.ma]) || []).forEach(function(o){ if(o.kh && slChuan(o.ten)===slChuan(t.ten)) ds[o.kh] = 1; });
  var k = Object.keys(ds); return k.length===1 ? {kh:k[0], cc:'tổ viên trùng tên tổ trưởng'} : {kh:'', cc:''};
}
function hsoTVTo(t){ if(!t || !TO_K) return []; try { return toTV(t); } catch(e){ return []; } }
function hsoTruoc(t){   /* tổ trưởng, tổ phó kỳ trước (Mẫu 31 tháng trước) — gợi ý Bên giao / Bên nhận, bầu thay */
  if(!t || !TO_K) return null; var tr = kyLui(TO_K.thang, -1), k = tr+'|'+t.ma;
  if(HSO_TR[k]!==undefined) return HSO_TR[k];
  if(!SLM.bang[slKhoa('hstd', tr)]){ HSO_TR[k] = null; return null; }
  HSO_TR[k] = null; var cu = TO_K;
  toNap(tr).then(function(K2){ TO_K = cu; slDung(cu.ky); var x = K2.to[t.ma]; HSO_TR[k] = x ? {ten:x.ten||'', pho:x.pho||''} : null; if(HSO_TR[k] && document.getElementById('hso-ds')) hsoVe(); }).catch(function(){ TO_K = cu; });
  return null;
}

/* ---------- ô điền ---------- */
function hsoCham(n){ return Array((n||14)+1).join('.'); }
function hsoO(v, loai, n){ v = v==null ? '' : String(v).trim(); return v ? '<span class="o-'+(loai||'sl')+'">'+coChuHTML(v)+'</span>' : '<span class="o-tay">'+hsoCham(n)+'</span>'; }
function hsoNg(iso){ var m = String(iso||'').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? {d:m[3], m:m[2], y:m[1]} : null; }
function hsoNgayO(iso, loai){ var n = hsoNg(iso); return n ? hsoO(n.d+'/'+n.m+'/'+n.y, loai||'kb') : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8); }
function hsoNTN(iso, loai){ var n = hsoNg(iso); return n ? 'ngày '+hsoO(n.d, loai||'kb')+' tháng '+hsoO(n.m, loai||'kb')+' năm '+hsoO(n.y, loai||'kb') : 'ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(7); }
function hsoTien(n){ return n ? tdnTien(n) : ''; }
function hsoDoc3(n, du){
  var cs = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'], tr = Math.floor(n/100), ch = Math.floor(n%100/10), dv = n%10, r = [];
  if(tr || du) r.push(cs[tr]+' trăm');
  if(ch===0){ if(dv && (tr || du)) r.push('linh'); }
  else r.push(ch===1 ? 'mười' : cs[ch]+' mươi');
  if(dv) r.push(dv===1 && ch>1 ? 'mốt' : dv===5 && ch>0 ? 'lăm' : cs[dv]);
  return r.join(' ');
}
function hsoChuSo(n){   /* 80000000 → "Tám mươi triệu đồng" */
  n = Math.round(Math.abs(+n||0)); if(!n) return 'Không đồng';
  var nhom = [], ten = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ'], r = [];
  while(n>0){ nhom.push(n%1000); n = Math.floor(n/1000); }
  for(var i=nhom.length-1;i>=0;i--) if(nhom[i]) r.push(hsoDoc3(nhom[i], i<nhom.length-1)+(ten[i]||''));
  var s = r.join(' ')+' đồng';
  return s.charAt(0).toUpperCase()+s.slice(1);
}
function hsoSo(v){ return +String(v||'').replace(/[^\d]/g, '') || 0; }
function hsoCTTen(ma){ return ma ? (CT_VT_TEN[ma] || ma) : ''; }
function hsoCTMon(m){ var v = ctNgan(m.ct, m); return CT_VT_TEN[v] || v; }

/* ---------- khối dựng chung ---------- */
function hsoQH(){ return '<p class="c b">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="c b"><u>Độc lập - Tự do - Hạnh phúc</u></p>'; }
function hsoMauSo(ma, lap){ return '<p class="r b s11">Mẫu số: '+ma+'</p>'+(lap||[]).map(function(x){ return '<p class="r i s11">'+x+'</p>'; }).join(''); }
function hsoBang(lop, w, rows){ return '<table class="'+lop+'" data-w="'+w.join(',')+'"><colgroup>'+w.map(function(x){ var t = w.reduce(function(a, b){ return a+b; }, 0); return '<col style="width:'+(x/t*100).toFixed(2)+'%">'; }).join('')+'</colgroup>'+rows+'</table>'; }
function hsoKy(ds){   /* [[tiêu đề, dòng phụ, tên, loại]] */
  return hsoBang('khung0 hso-ky', ds.map(function(){ return 1; }), '<tr>'+ds.map(function(k){
    return '<td class="c"><p class="c b">'+k[0]+'</p><p class="c i s12">'+(k[1]===undefined ? '(Ký, ghi rõ họ tên)' : k[1])+'</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c b">'+(k[2] ? hsoO(k[2], k[3]||'sl') : '&nbsp;')+'</p></td>'; }).join('')+'</tr>');
}
function hsoTrang(M, than, ten){
  var mg = M.mg || [20, 20, 20, 30];
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+coChuHTML(ten||M.ma)+'</title><style>@page{size:A4 '+(M.ngang ? 'landscape' : 'portrait')+';margin:'+mg.map(function(x){ return x+'mm'; }).join(' ')+'}'+
    'body{font-family:"Times New Roman",Times,serif;font-size:13pt;color:#000;line-height:1.3;margin:0}p{margin:0 0 2pt}'+
    '.c{text-align:center}.r{text-align:right}.j{text-align:justify}.b{font-weight:bold}.i{font-style:italic}.thut{text-indent:10mm}.tr{margin-top:6pt}.sau{margin-bottom:6pt}'+
    '.s10{font-size:10pt}.s11{font-size:11pt}.s12{font-size:12pt}.s13{font-size:13pt}.s14{font-size:14pt}.s15{font-size:15pt}'+
    'table{border-collapse:collapse;width:100%;table-layout:fixed}table.luoi td{border:1px solid #000;padding:1pt 3pt;vertical-align:middle}table.luoi.s11 td,table.luoi.s10 td{padding:0 2pt}'+
    'table.khung0 td{vertical-align:top;padding:0 2pt}table.luoi td p{margin:0}.hso-ky{margin-top:6pt}'+
    '.o-sl{background:#d9f0d3}.o-kb{background:#fff0b3}@media print{.o-sl,.o-kb{background:none}}</style></head><body><div class="kt-to">'+than+'</div></body></html>';
}

/* ---------- 10C/TD ---------- */
function hso10cMoi(ngay){ var c = hsoLuu().mau10c || 'tu'; return c==='moi' ? true : c==='cu' ? false : (ngay || ngayISO(nay())) >= '2026-10-01'; }
function hsoKNRa(t, tv){   /* danh sách kết nạp / cho ra theo tích chọn + số tổ viên trước / sau họp */
  var kn = tv.filter(function(k){ return HSO.kn[k.kh]; }).map(function(k){ return {kh:k.kh, ten:k.ten}; });
  Object.keys(HSO.kn).forEach(function(kh){ if(HSO.kn[kh] && !kn.some(function(x){ return x.kh===kh; })){ var c = hsoKhach(kh, t); kn.push({kh:kh, ten:c.ten||kh}); } });
  var ra = [], co = {};
  (TO_BD && TO_BD.to===t.ma && TO_BD.co ? TO_BD.ra : []).forEach(function(r){ if(HSO.ra[r.kh]){ ra.push({kh:r.kh, ten:r.ten}); co[r.kh] = 1; } });
  tv.forEach(function(k){ if(HSO.ra[k.kh] && !co[k.kh]){ ra.push({kh:k.kh, ten:k.ten}); co[k.kh] = 1; } });
  var tap = {}; tv.forEach(function(k){ tap[k.kh] = 1; });
  kn.forEach(function(x){ delete tap[x.kh]; }); ra.forEach(function(x){ tap[x.kh] = 1; });
  var truoc = Object.keys(tap).length; kn.forEach(function(x){ tap[x.kh] = 1; }); ra.forEach(function(x){ delete tap[x.kh]; });
  return {kn:kn, ra:ra, truoc:truoc, sau:Object.keys(tap).length};
}
function hsoBangTen2(ds, nhan, toiThieu){   /* STT · Họ tên │ STT · Họ tên — chia đôi danh sách */
  var n = Math.max(toiThieu||5, Math.ceil(ds.length/2)), h = '<tr><td class="c b">STT</td><td class="c b">'+nhan+'</td><td class="c b">STT</td><td class="c b">'+nhan+'</td></tr>';
  for(var i=0;i<n;i++){ var a = ds[i], b = ds[i+n];
    h += '<tr><td class="c">'+(a ? i+1 : '')+'</td><td>'+(a ? hsoO(a.ten) : '')+'</td><td class="c">'+(b ? i+n+1 : '')+'</td><td>'+(b ? hsoO(b.ten) : '')+'</td></tr>'; }
  return hsoBang('luoi', [8, 42, 8, 42], h);
}
function hsoLap10c(t, X){
  var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, ng = HSO.o.ngay || '', moi = hso10cMoi(ng), N = hsoNguoiHoi(t), tk = hsoLuu().tkMin || '';
  var gioNgay = 'Thời gian bắt đầu: '+hsoCham(6)+' giờ '+hsoCham(6)+', '+(ng ? 'ngày '+hsoNgayO(ng) : 'ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8));
  var h;
  if(!moi){
    h = hsoMauSo('10C/TD')+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c b">Về việc kết nạp bổ sung tổ viên, cho tổ viên ra khỏi Tổ TK&amp;VV</p>'+
      '<p class="tr">'+gioNgay+'</p><p>- Địa điểm: Ấp (kp) '+hsoO(T.ap)+', xã (phường) '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p><p>- Thành phần tham dự:</p>'+
      '<p>+ Có '+hsoCham(6)+'/'+hsoO(t ? String(L.truoc) : '', 'sl', 6)+' tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) '+hsoO(T.tt)+' thuộc '+hsoHoiO(T)+'</p>'+
      '<p>+ Ông (bà) '+hsoO(T.truongAp, 'kb', 25)+' là Trưởng ấp chứng kiến cuộc họp.</p>'+
      '<p>+ Ông (bà) '+hsoO(N.cb, 'kb', 25)+', chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+', chứng kiến cuộc họp.</p>'+
      '<p>Chủ trì: Ông (bà) '+hsoO(T.tt, 'sl', 25)+', chức vụ: Tổ trưởng Tổ TK&amp;VV.</p><p>Thư ký: Ông (bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 25)+', chức vụ: Tổ phó Tổ TK&amp;VV.</p>'+
      '<p class="c b tr">NỘI DUNG</p><p class="j">1. Kết nạp bổ sung tổ viên vào Tổ TK&amp;VV: Tổng số '+hsoCham(6)+'/'+hsoCham(6)+' tổ viên dự họp tán thành kết nạp bổ sung các tổ viên sau:</p>'+hsoBangTen2(L.kn, 'Họ và tên', 3)+
      '<p class="j tr">2. Đối với việc cho tổ viên ra khỏi Tổ TK&amp;VV: Số tổ viên dự họp '+hsoCham(6)+'/'+hsoCham(6)+' tán thành cho ra khỏi tổ đối với các tổ viên sau:</p>'+hsoBangTen2(L.ra, 'Họ và tên', 3)+
      '<p class="j tr">3. Tổng số tổ viên của Tổ sau kỳ họp này là: '+hsoO(t ? String(L.sau) : '', 'sl', 8)+'. Các tổ viên mới được kết nạp cam kết thực hiện tốt quy ước hoạt động của Tổ. Cam kết thực hiện gửi tiền tiết kiệm hàng tháng với mức tối thiểu là '+hsoO(tk ? tdnTien(hsoSo(tk)) : '', 'kb', 12)+' đồng, kể từ tháng '+hsoCham(5)+'/'+hsoCham(8)+'.</p>'+
      '<p>4. Nội dung khác (nếu có): '+hsoCham(70)+'</p><p>'+hsoCham(110)+'</p>'+
      '<p class="j">Nội dung Biên bản được thông qua và các thành phần dự họp đều tán thành.</p><p>Cuộc họp kết thúc vào '+hsoCham(5)+' giờ '+hsoCham(5)+', ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'</p>'+
      hsoKy([['THƯ KÝ', '', T.pho, T.phoKB ? 'kb' : 'sl'], ['HỘI, ĐOÀN THỂ CẤP XÃ (PHƯỜNG)', '(Ký tên, đóng dấu)', N.cb, 'kb']])+hsoKy([['CHỦ TRÌ', '', T.tt], ['TRƯỞNG ẤP (KP)', '', T.truongAp, 'kb']]);
    return {ma:'10C/TD (mẫu cũ)', h:h};
  }
  var vv = L.kn.length || L.ra.length ? 'kết nạp, cho tổ viên ra khỏi Tổ' : '';
  var hang = '', n = Math.max(5, L.kn.length, L.ra.length);
  for(var i=0;i<n;i++) hang += '<tr><td class="c">'+(i+1)+'</td><td>'+(L.kn[i] ? hsoO(L.kn[i].ten) : '')+'</td><td class="c">'+(i+1)+'</td><td>'+(L.ra[i] ? hsoO(L.ra[i].ten) : '')+'</td></tr>';
  var vay = '<tr><td class="c b">Stt</td><td class="c b">Họ và tên</td><td class="c b">Chương trình vay</td><td class="c b">Số tiền đề nghị cho vay</td><td class="c b">Mục đích sử dụng vốn vay</td><td class="c b">Thời hạn đề nghị cho vay (tháng)</td></tr>';
  for(var j=0;j<8;j++) vay += '<tr><td class="c">'+(j+1)+'</td><td></td><td></td><td></td><td></td><td></td></tr>';
  h = hsoMauSo('10C/TD', ['(đóng thành quyển)'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c">Về việc '+hsoO(vv, 'sl', 40)+'</p>'+
    '<p class="tr">'+gioNgay+'</p><p>Địa điểm: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p>'+
    '<p>Hình thức họp: ☐ Trực tiếp &nbsp; ☐ Trực tuyến &nbsp; ☐ Trực tiếp kết hợp trực tuyến.</p><p class="thut">Thông qua ứng dụng: '+hsoCham(50)+'</p>'+
    '<p>Thành phần tham dự:</p><p>- Chủ trì: Ông (bà) '+hsoO(T.tt, 'sl', 25)+'. Chức vụ: Tổ trưởng.</p><p>- Thư ký: Ông (bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 25)+'. Chức vụ: Tổ phó.</p>'+
    '<p>- '+hsoCham(6)+'/'+hsoO(t ? String(L.truoc) : '', 'sl', 6)+' tổ viên thuộc Tổ TK&amp;VV.</p><p>- Ông (bà) '+hsoO(T.truongAp, 'kb', 25)+' là Trưởng thôn chứng kiến cuộc họp.</p>'+
    '<p>- Ông (bà) '+hsoO(N.cb, 'kb', 22)+'. Chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+' chứng kiến cuộc họp.</p>'+
    '<p class="b tr">Nội dung cuộc họp:</p><p>1. Thống nhất danh sách tổ viên được kết nạp, tổ viên cho ra khỏi Tổ</p>'+
    hsoBang('luoi', [8, 42, 8, 42], '<tr><td class="c b">I</td><td class="c b">Tổ viên được kết nạp</td><td class="c b">II</td><td class="c b">Tổ viên cho ra khỏi Tổ</td></tr>'+hang)+
    '<p class="tr">Tổng số tổ viên sau khi kết nạp, cho ra khỏi Tổ: '+hsoO(t ? String(L.sau) : '', 'sl', 12)+' tổ viên.</p>'+
    '<p class="tr">2. Thống nhất danh sách tổ viên đề nghị vay vốn NHCSXH</p><p class="r i s12">Đơn vị tính: triệu đồng</p>'+hsoBang('luoi s12', [6, 26, 16, 14, 24, 14], vay)+
    '<p class="tr">3. Nội dung khác (nếu có)</p><p>'+hsoCham(110)+'</p><p>'+hsoCham(110)+'</p>'+
    '<p>4. Kết quả biểu quyết</p><p class="j">'+hsoCham(6)+'/'+hsoCham(6)+' tổ viên của Tổ tham dự họp biểu quyết tán thành thông qua các nội dung nêu trên.</p>'+
    '<p class="j">Nội dung biên bản được các tổ viên và thành phần tham dự cuộc họp hoàn toàn nhất trí thông qua.</p><p>Cuộc họp kết thúc vào '+hsoCham(5)+' giờ '+hsoCham(5)+' ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+'</p>'+
    hsoKy([['THƯ KÝ', '', T.pho, T.phoKB ? 'kb' : 'sl'], ['TỔ CHỨC CT-XH CẤP XÃ', '', N.cb, 'kb']])+hsoKy([['CHỦ TRÌ', '', T.tt], ['TRƯỞNG THÔN', '', T.truongAp, 'kb']]);
  return {ma:'10C/TD (mẫu mới QĐ 70)', h:h};
}

/* ---------- 10A/TD ---------- */
function hsoLap10a(t){
  var T = hsoTo(t), tv = hsoTVTo(t).filter(function(k){ return HSO.tv[k.kh]!==false; }), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', L = hsoLuu(), n = Math.max(20, Math.ceil(tv.length/2)), ds = '';
  for(var i=0;i<n;i++){ var a = tv[i], b = tv[i+n]; ds += '<tr><td>'+(i+1)+'. '+(a ? hsoO(a.ten) : hsoCham(45))+'</td><td>'+(i+n+1)+'. '+(b ? hsoO(b.ten) : hsoCham(45))+'</td></tr>'; }
  var qu = [
    '1. Tổ TK&amp;VV là tập hợp hộ nghèo và các đối tượng chính sách khác theo quy định của pháp luật, có nhu cầu vay vốn, thực hành tiết kiệm và tham gia hoạt động khác do NHCSXH cung cấp.',
    '2. Tổ TK&amp;VV hoạt động theo nguyên tắc tập thể, biểu quyết theo đa số dưới sự điều hành của Ban quản lý Tổ. Tổ họp định kỳ hằng tháng (quý) vào ngày '+hsoO(L.ngayDK, 'kb', 10)+' hoặc đột xuất để giải quyết công việc phát sinh (nếu có). Nội dung họp Tổ do Tổ trưởng chuẩn bị và thống nhất trong Ban quản lý Tổ.',
    '3. Cuộc họp Tổ khi có các nội dung biểu quyết thì phải có sự tham gia chứng kiến của đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã và Trưởng thôn/Tổ trưởng Tổ dân phố, đồng thời phải có trên 1/2 số tổ viên của Tổ tham gia họp và có trên 2/3 số tổ viên tham gia họp biểu quyết tán thành mới có giá trị thực hiện.',
    'Các nội dung họp Tổ phải biểu quyết bao gồm: Thành lập Tổ; bầu, thay đổi Tổ trưởng hoặc Tổ phó; sửa đổi Quy ước hoạt động của Tổ; kết nạp tổ viên; bình xét cho vay; bắt buộc tổ viên ra khỏi Tổ khi không thực hiện đúng Quy ước hoạt động của Tổ. Nội dung cuộc họp Tổ được lập thành biên bản và được thông qua trước khi kết thúc cuộc họp.',
    '4. Điều hành hoạt động của Tổ là Ban quản lý Tổ do các tổ viên trong Tổ bầu chọn. Ban quản lý Tổ gồm Tổ trưởng và Tổ phó, đáp ứng các tiêu chuẩn quy định tại khoản 2 Điều 8 Quyết định số 70/QĐ-HĐQT.',
    'Ban quản lý Tổ phối hợp, giám sát lẫn nhau để điều hành hoạt động của Tổ thực hiện nhiệm vụ quy định tại Quy chế hoạt động Tổ và Quy ước hoạt động được Tổ thông qua, thực hiện các nội dung công việc theo hợp đồng ủy nhiệm ký với NHCSXH. Trong đó, nhiệm vụ cụ thể như sau:',
    'a) Tổ trưởng chịu trách nhiệm điều hành hoạt động của Tổ theo Quy ước hoạt động của Tổ và thực hiện nhiệm vụ, trách nhiệm của Ban quản lý Tổ; triệu tập và chủ trì các cuộc họp; ký hợp đồng ủy nhiệm với NHCSXH; giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch; có trách nhiệm thanh toán số tiền hoa hồng được NHCSXH chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.',
    'b) Tổ phó ghi chép biên bản các cuộc họp; giúp việc cho Tổ trưởng, điều hành và giải quyết các công việc của Tổ khi được Tổ trưởng phân công; thay mặt Tổ trưởng giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch khi Tổ trưởng vắng mặt.',
    '5. Các tổ viên trong Tổ cam kết thực hiện tốt các nội dung sau:',
    'a) Tham gia đầy đủ và biểu quyết tại các cuộc họp Tổ; tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm,... để nâng cao trình độ sản xuất kinh doanh.',
    'b) Sử dụng vốn vay đúng mục đích đề nghị vay, có hiệu quả. Có nghĩa vụ trả nợ (gốc, lãi) đầy đủ, đúng kỳ hạn đã thoả thuận với NHCSXH.',
    'c) Thực hành tiết kiệm và gửi vào NHCSXH theo định kỳ hằng tháng với mức tối thiểu là '+hsoO(L.tkMin ? tdnTien(hsoSo(L.tkMin)) : '', 'kb', 18)+' đồng/tổ viên kể từ tháng '+hsoCham(5)+'/'+hsoCham(8)+' hoặc khi Tổ họp thống nhất thay đổi. Trường hợp tổ viên gặp khó khăn không thực hiện được theo mức tối thiểu thì thực hiện theo nhu cầu và khả năng thực tế.',
    'd) Mỗi tổ viên cam kết tương trợ giúp đỡ nhau, trao đổi kinh nghiệm trong sản xuất, kinh doanh và đời sống; có trách nhiệm giám sát lẫn nhau trong việc vay vốn, sử dụng vốn vay, trả nợ (gốc, lãi) NHCSXH và thực hiện nghiêm túc Quy ước hoạt động của Tổ.',
    'đ) Trường hợp Ban quản lý Tổ được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên trong Tổ hoàn toàn nhất trí để Ban quản lý Tổ thu tiền để nộp cho NHCSXH. Riêng việc trả nợ gốc, tổ viên phải thực hiện trả nợ gốc trực tiếp cho Ngân hàng tại điểm giao dịch hoặc trụ sở NHCSXH nơi cho vay; hoặc trả nợ gốc bằng chuyển khoản vào tài khoản thanh toán của tổ viên mở tại NHCSXH để Ngân hàng thu nợ theo quy định.',
    'Mỗi lần nộp tiền cho Tổ trưởng, tổ viên ký vào Bảng kê thu tiền ngay khi nộp tiền cho Tổ trưởng; đồng thời, nhận lại Biên lai thu tiền, tiến hành kiểm tra, đối chiếu về số tiền gốc, số tiền lãi còn nợ, số dư tài khoản Tổ viên đã được in trên Biên lai và thông báo cho NHCSXH nếu có chênh lệch.',
    'e) Trường hợp Ban quản lý Tổ không được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên có trách nhiệm chuyển khoản, nộp tiền vào tài khoản thanh toán của tổ viên mở tại NHCSXH nơi cho vay, bảo đảm số dư trước ngày đến hạn để Ngân hàng thu nợ theo quy định và đối chiếu kết quả giao dịch, thông báo nợ đến hạn kỳ tiếp theo do NHCSXH gửi đến.',
    'g) Tổ viên phải lưu giữ đầy đủ các loại sổ sách, giấy tờ sau:', '- Sổ vay vốn/Hợp đồng tín dụng.',
    '- Biên lai thu tiền có chữ ký của Tổ trưởng (người thu tiền) để làm cơ sở chứng minh cho số tiền đã nộp (trường hợp nộp tiền cho Ban quản lý Tổ).',
    '- Cài đặt ứng dụng do NHCSXH cung cấp để theo dõi biến động số dư tiền gửi, tiền vay, kết quả giao dịch trong kỳ và nợ đến hạn kỳ tiếp theo được Ngân hàng gửi đến.'];
  var h = hsoMauSo('10A/TD', ['Lập 02 liên:', '- 01 liên lưu NH', '- 01 liên lưu Tổ'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c b">Về việc thành lập Tổ Tiết kiệm và vay vốn</p>'+
    '<p class="tr">Thời gian bắt đầu: '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+(ng ? hsoNgayO(ng) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+'</p>'+
    '<p>Địa điểm: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'</p><p>Thành phần tham dự:</p>'+
    '<p class="j">- '+hsoCham(8)+' người là đại diện hộ gia đình cùng cư trú tại địa bàn thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'</p>'+
    '<p>- Ông (Bà) '+hsoO(T.truongAp, 'kb', 30)+' là Trưởng thôn, chứng kiến cuộc họp</p>'+
    '<p>Chủ trì: Ông (Bà) '+hsoO(N.cb, 'kb', 22)+' Chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+'</p><p>Thư ký: Ông (Bà) '+hsoCham(40)+' là đại diện hộ gia đình.</p>'+
    '<p class="b tr">Nội dung cuộc họp:</p><p class="j thut">Các đại diện hộ gia đình và cá nhân trực tiếp thuộc đối tượng vay vốn tự nguyện họp để thành lập Tổ Tiết kiệm và vay vốn (TK&amp;VV) theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị Ngân hàng Chính sách xã hội (NHCSXH) về Quy chế hoạt động Tổ TK&amp;VV. Sau khi thảo luận, các thành viên dự họp thống nhất các nội dung sau:</p>'+
    '<p class="b tr">I. DANH SÁCH TỔ VIÊN</p>'+hsoBang('khung0', [1, 1], ds)+'<p class="tr">Tổng số: '+hsoO(tv.length ? String(tv.length) : '', 'sl', 10)+' tổ viên</p>'+
    '<p class="b tr">II. QUY ƯỚC HOẠT ĐỘNG CỦA TỔ TK&amp;VV</p>'+qu.map(function(x){ return '<p class="j thut">'+x+'</p>'; }).join('')+
    '<p class="b tr">III. BẦU BAN QUẢN LÝ CỦA TỔ TK&amp;VV</p><p class="j thut">1. Các tổ viên dự họp thống nhất bầu Ban quản lý Tổ gồm các Ông (Bà) có tên dưới đây:</p>'+
    '<p class="thut">a) Ông (Bà) '+hsoO(T.tt, 'sl', 40)+' Chức vụ: Tổ trưởng;</p><p class="thut">b) Ông (Bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 40)+' Chức vụ: Tổ phó.</p>'+
    '<p class="j thut">2. Ban quản lý Tổ thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT và các quy định liên quan của NHCSXH.</p>'+
    '<p class="b tr">IV. KẾT QUẢ BIỂU QUYẾT</p><p class="j thut">'+hsoCham(6)+'/'+hsoCham(6)+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung: Danh sách tổ viên, Quy ước hoạt động của Tổ TK&amp;VV và Bầu Ban quản lý Tổ TK&amp;VV.</p>'+
    '<p class="j thut">Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận hoạt động của Tổ TK&amp;VV tại địa phương.</p>'+
    '<p class="thut">Cuộc họp kết thúc vào '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'./.</p>'+
    hsoKy([['THƯ KÝ'], ['TRƯỞNG THÔN', '', T.truongAp, 'kb'], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', N.cb, 'kb']])+
    '<p class="c b tr">PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ</p><p class="j thut">Chấp thuận cho Tổ TK&amp;VV tại thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+' do Ông (Bà) '+hsoO(T.tt, 'sl', 30)+' làm Tổ trưởng và Ông (Bà) '+hsoO(T.pho, T.phoKB ? 'kb' : 'sl', 30)+' làm Tổ phó được thành lập, hoạt động theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td></td><td class="c"><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(6)+'</p><p class="c b">UBND CẤP XÃ</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'10A/TD', h:h};
}

/* ---------- 10B/TD ---------- */
function hsoBau(t){   /* gợi ý bầu thay: tổ trưởng / tổ phó kỳ trước khác kỳ này */
  var tr = hsoTruoc(t), T = hsoTo(t), o = HSO.o, r = {tt:o.ttMoi, ttCu:o.ttCu, pho:o.phoMoi, phoCu:o.phoCu};
  if(tr){ if(r.tt===undefined && tr.ten && slChuan(tr.ten)!==slChuan(T.tt)){ r.tt = T.tt; r.ttCu = tr.ten; }
    if(r.pho===undefined && tr.pho && T.pho && slChuan(tr.pho)!==slChuan(T.pho)){ r.pho = T.pho; r.phoCu = tr.pho; } }
  ['tt','ttCu','pho','phoCu'].forEach(function(k){ r[k] = r[k] || ''; });
  return r;
}
function hsoLap10b(t){
  var T = hsoTo(t), tv = hsoTVTo(t), L = t ? hsoKNRa(t, tv) : {kn:[], ra:[], truoc:0, sau:0}, N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', B = hsoBau(t);
  var vv = [L.kn.length ? 'kết nạp tổ viên' : '', B.tt || B.pho ? 'bầu thay đổi thành viên Ban quản lý Tổ' : ''].filter(Boolean).join(', ');
  var kn = (L.kn.length ? L.kn : [null, null]).map(function(x){ return '<p class="thut">- Ông (Bà): '+(x ? hsoO(x.ten) : hsoCham(70))+'</p>'; }).join('');
  var bau = function(moi, cv, cu){ return '<p class="thut">- Ông (Bà) '+hsoO(moi, 'kb', 25)+' Chức vụ: '+(moi ? hsoO(cv, 'kb') : hsoCham(25))+'</p><p class="thut">thay Ông (Bà): '+hsoO(cu, 'kb', 50)+'</p>'; };
  var h = hsoMauSo('10B/TD', ['Lập 02 liên:', '- 01 liên lưu NH', '- 01 liên lưu Tổ'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN HỌP</p><p class="c">Về việc '+hsoO(vv, 'sl', 50)+'</p>'+
    '<p class="tr">Thời gian bắt đầu: '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+(ng ? hsoNgayO(ng) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+'</p>'+
    '<p>Địa điểm: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p><p>Thành phần tham dự:</p>'+
    '<p class="j">- '+hsoCham(6)+'/'+hsoO(t ? String(L.truoc) : '', 'sl', 6)+' tổ viên Tổ Tiết kiệm và vay vốn (TK&amp;VV) tại thôn '+hsoO(T.ap)+' thuộc '+hsoHoiO(T, 30)+'</p>'+
    '<p>- Ông (bà) '+hsoO(T.truongAp, 'kb', 30)+' là Trưởng thôn, chứng kiến cuộc họp.</p>'+
    '<p>Chủ trì: Ông (bà) '+hsoO(N.cb, 'kb', 22)+' chức vụ '+hsoO(N.cv, 'kb')+' '+hsoHoiO(T)+'</p><p>Thư ký: Ông (bà) '+hsoCham(60)+'</p>'+
    '<p class="b tr">Nội dung cuộc họp:</p><p>1. Chủ trì cuộc họp tuyên bố lý do tổ chức cuộc họp</p><p>'+hsoCham(110)+'</p><p>'+hsoCham(110)+'</p>'+
    '<p>2. Sau khi thảo luận, các tổ viên trong Tổ TK&amp;VV thống nhất:</p><p class="thut">a) Kết nạp các Ông (Bà) có tên sau là tổ viên của Tổ TK&amp;VV:</p>'+kn+
    '<p class="thut">- Tổng số tổ viên của tổ sau kỳ họp là: '+hsoO(t ? String(L.sau) : '', 'sl', 10)+' tổ viên.</p>'+
    '<p class="thut">b) Bầu thành viên mới tham gia Ban quản lý Tổ</p>'+bau(B.tt, 'Tổ trưởng', B.ttCu)+bau(B.pho, 'Tổ phó', B.phoCu)+
    '<p class="j">3. Kết quả biểu quyết: '+hsoCham(6)+'/'+hsoCham(6)+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung kết nạp tổ viên; bầu tham gia Ban quản lý Tổ và giữ chức vụ Tổ trưởng đối với Ông (Bà) '+hsoO(B.tt, 'kb', 25)+', giữ chức vụ Tổ phó đối với Ông (Bà) '+hsoO(B.pho, 'kb', 25)+'</p>'+
    '<p class="j thut">Ban quản lý Tổ TK&amp;VV thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về Quy chế hoạt động của Tổ TK&amp;VV và các quy định liên quan của NHCSXH.</p>'+
    '<p class="j thut">Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận cho Ban quản lý Tổ TK&amp;VV được tiếp tục quản lý hoạt động của Tổ.</p>'+
    '<p class="thut">Cuộc họp kết thúc vào '+hsoCham(6)+' giờ '+hsoCham(6)+', ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+'./.</p>'+
    hsoKy([['THƯ KÝ'], ['TRƯỞNG THÔN', '', T.truongAp, 'kb'], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', N.cb, 'kb']])+
    '<p class="c b tr">PHÊ DUYỆT CỦA UỶ BAN NHÂN DÂN CẤP XÃ</p><p class="j thut">Chấp thuận kết quả cuộc họp bầu thay đổi thành viên Ban Quản lý Tổ của Tổ TK&amp;VV tại thôn '+hsoO(T.ap)+', do '+hsoHoiO(T)+' quản lý, bầu Ông (Bà) '+hsoO(B.tt, 'kb', 25)+' giữ chức vụ '+(B.tt ? hsoO('Tổ trưởng', 'kb') : hsoCham(15))+' và Ông (Bà) '+hsoO(B.pho, 'kb', 25)+' chức vụ '+(B.pho ? hsoO('Tổ phó', 'kb') : hsoCham(15))+' theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV./.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td></td><td class="c"><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(6)+'</p><p class="c b">UBND CẤP XÃ</p><p class="c i s12">(Ký tên, đóng dấu)</p></td></tr>');
  return {ma:'10B/TD', h:h};
}

/* ---------- 11/TD ---------- */
function hsoLap11(t){
  var T = hsoTo(t), K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {}, ng = HSO.o.ngay || '';
  var dieu = [
    ['b', 'Điều 1. Bên A ủy nhiệm cho Bên B thực hiện các công việc sau'],
    ['', '1. Quản lý toàn bộ hoạt động của Tổ TK&amp;VV (sau đây viết tắt là Tổ) theo Quy chế hoạt động của Tổ được Hội đồng quản trị NHCSXH ban hành và triển khai thực hiện Quy ước hoạt động của Tổ.'],
    ['', '2. Thực hiện tiếp nhận đề nghị vay vốn của tổ viên, tổ chức họp Tổ để bình xét cho vay, hoàn thiện và chuyển hồ sơ đề nghị vay vốn cho Bên A; phối hợp với Bên A thông báo kết quả phê duyệt cho vay và phối hợp giải ngân cho vay đến tổ viên vay vốn.'],
    ['', '3. Giám sát, đôn đốc tổ viên sử dụng vốn vay đúng mục đích; trả nợ đầy đủ, đúng hạn theo thoả thuận; tham gia, chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay đến các tổ viên của cơ quan, tổ chức có thẩm quyền khi được yêu cầu.'],
    ['', '4. Bên A uỷ nhiệm cho Bên B thu tiền lãi, tiền gửi của các tổ viên trong Tổ theo quy định của NHCSXH. Bên B phải nộp số tiền đã thu của các tổ viên trong tháng cho NHCSXH vào ngày giao dịch tại xã.'],
    ['i', '(Bên A không uỷ nhiệm cho Bên B thu tiền lãi, tiền gửi của tổ viên trong Tổ. Bên B có trách nhiệm đôn đốc các tổ viên trả nợ gốc, nợ lãi đầy đủ, đúng hạn cho NHCSXH theo thỏa thuận.)'],
    ['', '5. Phối hợp quản lý và xử lý các vấn đề phát sinh trong hoạt động của Tổ, bao gồm: đôn đốc, xử lý các trường hợp gia hạn nợ, điều chỉnh kỳ hạn trả nợ, nợ quá hạn, nợ bị rủi ro; người vay sử dụng vốn vay sai mục đích, chết, mất tích, đi khỏi nơi cư trú và các trường hợp khác ảnh hưởng đến hoạt động của Tổ.'],
    ['', '6. Quản lý, cung cấp, lưu trữ hồ sơ liên quan đến hoạt động của Tổ theo quy định của NHCSXH; lưu giữ, bảo mật thông tin, dữ liệu của tổ viên theo quy định của pháp luật về bảo vệ dữ liệu cá nhân.'],
    ['', '7. Phối hợp với Bên A thực hiện các công việc khác liên quan đến hoạt động tín dụng chính sách xã hội theo nội dung được hai bên thống nhất.'],
    ['b', 'Điều 2. Trách nhiệm và quyền hạn của Bên A'],
    ['', '1. Phối hợp với UBND và tổ chức chính trị - xã hội nhận ủy thác cấp xã để tổ chức tập huấn nghiệp vụ có liên quan đến hoạt động của Tổ, thủ tục, quy trình cho vay cho Bên B.'],
    ['', '2. Thanh toán tiền hoa hồng đầy đủ cho Bên B theo quy định của NHCSXH, cụ thể:'],
    ['', 'a) Chi trả hoa hồng theo dư nợ có thu được lãi khi phát sinh lãi thực thu của các tổ viên thuộc Tổ.'],
    ['c', 'Tiền hoa hồng = Mức hoa hồng được hưởng × Dư nợ có thu được lãi'],
    ['', 'Trong đó:'], ['', '- Mức hoa hồng theo thông báo của NHCSXH từng thời kỳ'],
    ['i', '(Hiện nay, tại địa bàn cấp xã thuộc vùng có điều kiện khó khăn mức hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu tiền là 0,085%, đối với Tổ TK&amp;VV không được ủy nhiệm thu tiền là 0,075%; tại địa bàn cấp xã không thuộc vùng có điều kiện khó khăn mức hoa hồng đối với Tổ TK&amp;VV được ủy nhiệm thu tiền là 0,071%, đối với Tổ TK&amp;VV không được ủy nhiệm thu tiền là 0,062%).'],
    ['', '- Dư nợ có thu được lãi xác định bằng công thức:'], ['c', 'Dư nợ có thu được lãi = Số tiền lãi thực thu / Lãi suất cho vay'],
    ['', '+ Số tiền lãi thực thu là số tiền lãi NHCSXH nhận được trong tháng của các tổ viên thuộc Tổ TK&amp;VV.'],
    ['', '+ Lãi suất cho vay là lãi suất theo thông báo của NHCSXH trong từng thời kỳ và theo từng chương trình tín dụng.'],
    ['', 'b) Chi trả hoa hồng theo dư nợ bình quân vào ngày cuối cùng của tháng.'], ['c', 'Tiền hoa hồng = Dư nợ trong hạn bình quân tháng × Mức hoa hồng'],
    ['', 'Trong đó:'], ['c', '- Dư nợ trong hạn bình quân tháng = (Dư nợ trong hạn đầu ngày 01 của tháng + Dư nợ trong hạn cuối ngày cuối cùng của tháng) / 2'],
    ['', '- Mức hoa hồng: Theo thông báo của NHCSXH theo từng thời kỳ.'],
    ['i', '(Hiện nay, mức hoa hồng trả theo dư nợ trong hạn bình quân là 0,05%/tháng/dư nợ trong hạn bình quân tháng. Riêng chương trình cho vay nhà ở xã hội, mức hoa hồng chi trả cho Ban quản lý Tổ là 0,005%/tháng/dư nợ trong hạn bình quân tháng).'],
    ['', 'c) Chi trả tiền hoa hồng vào tài khoản thanh toán của Tổ trưởng Tổ TK&amp;VV mở tại NHCSXH '+hsoO(hsoPGD('ngan'), 'kb', 25)+', số tài khoản: '+hsoCham(30)],
    ['', '3. Theo dõi, giám sát, đôn đốc Bên B trong việc thực hiện Hợp đồng ủy nhiệm. Thực hiện kiểm tra định kỳ hoặc đột xuất về các nội dung công việc mà Bên B được ủy nhiệm. Trường hợp, phát hiện Bên B vi phạm các điều khoản đã thỏa thuận thì Bên A có quyền đơn phương chấm dứt Hợp đồng và đề nghị xử lý theo quy định của pháp luật.'],
    ['b', 'Điều 3. Nhiệm vụ, quyền hạn và quyền lợi của Bên B'], ['', '1. Nhiệm vụ, quyền hạn'],
    ['', 'a) Triển khai thực hiện Quy ước hoạt động của Tổ; tuyên truyền, hướng dẫn tổ viên về chủ trương, chính sách của Đảng, Nhà nước về tín dụng chính sách xã hội, các chương trình tín dụng và thủ tục vay vốn tại NHCSXH. Tuyên truyền, vận động tổ viên thực hành tiết kiệm, nâng cao ý thức trong việc vay vốn và trả nợ ngân hàng.'],
    ['', 'b) Tiếp nhận đề nghị vay vốn của tổ viên và tổ chức họp Tổ để bình xét cho vay bảo đảm công khai, minh bạch, dân chủ với sự giám sát, chứng kiến của Trưởng thôn, Tổ trưởng tổ dân phố và đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã; đồng thời, quán triệt cho tổ viên về ý thức vay vốn, sử dụng vốn vay đúng mục đích, trả nợ gốc, lãi đầy đủ, đúng hạn.'],
    ['', 'Nội dung bình xét cho vay công khai bao gồm: (i) Tổ viên thuộc đối tượng, đáp ứng điều kiện vay vốn theo quy định của cấp có thẩm quyền; (ii) Thảo luận, thống nhất đề nghị mức vay phù hợp với nhu cầu sử dụng vốn để thực hiện phương án vay vốn của tổ viên và không vượt quá mức cho vay tối đa; (iii) Thảo luận, thống nhất đề nghị thời hạn vay phù hợp với khả năng trả nợ của tổ viên và không vượt quá thời hạn cho vay tối đa theo quy định của từng chương trình tín dụng.'],
    ['', 'Sau khi Tổ họp thống nhất và biểu quyết thông qua danh sách Tổ viên đề nghị vay vốn với mức vay, thời hạn vay cụ thể, hướng dẫn tổ viên hoàn thiện hồ sơ vay vốn theo quy định của từng chương trình tín dụng gửi Bên A xem xét, quyết định mức cho vay, thời hạn cho vay.'],
    ['', 'c) Nhận kết quả phê duyệt cho vay của Bên A, thông báo cho tổ viên biết lịch giải ngân và chứng kiến việc Bên A giải ngân trực tiếp đến người vay.'],
    ['', 'd) Đôn đốc, giám sát tổ viên trong Tổ thực hiện Quy ước hoạt động của Tổ; sử dụng vốn vay đúng mục đích; trả nợ gốc, lãi đầy đủ, đúng hạn. Tham gia và chứng kiến việc kiểm tra sử dụng vốn vay, đối chiếu nợ vay của tổ viên của các tổ chức, cơ quan có thẩm quyền khi được yêu cầu.'],
    ['', 'đ) Trường hợp được ủy nhiệm thu tiền, hằng tháng, Bên B thực hiện thu tiền lãi, tiền gửi của tổ viên và nộp đầy đủ cho NHCSXH theo quy định.'],
    ['', 'e) Hướng dẫn tổ viên đối chiếu kết quả giao dịch, nợ đến hạn kỳ tiếp theo với thông báo do NHCSXH gửi đến thông qua Ban quản lý Tổ hoặc thông qua ứng dụng do NHCSXH cung cấp.'],
    ['', 'g) Không được thu phí, thu nợ gốc của tổ viên.'],
    ['', 'h) Thông báo kịp thời và phối hợp với tổ chức chính trị - xã hội nhận ủy thác, chính quyền địa phương, NHCSXH để xử lý nợ đối với các trường hợp sử dụng vốn vay sai mục đích, nợ bị rủi ro và các trường hợp khác ảnh hưởng đến hoạt động của Tổ và chất lượng tín dụng. Phối hợp với Trưởng thôn, Tổ trưởng tổ dân phố, tổ chức CT-XH nhận ủy thác thực hiện kiểm tra, xác minh và có ý kiến về việc tổ viên đề nghị gia hạn nợ, điều chỉnh kỳ hạn nợ, xử lý nợ bị rủi ro để trình cấp có thẩm quyền xem xét, quyết định; thu thập thông tin của tổ viên đi khỏi nơi cư trú.'],
    ['', 'i) Chịu sự kiểm tra, giám sát của Trưởng thôn, Tổ trưởng tổ dân phố, tổ chức chính trị - xã hội nhận uỷ thác, UBND cấp xã và Bên A.'],
    ['', 'k) Lưu giữ đầy đủ hồ sơ của Tổ và các giấy tờ khác liên quan đến hoạt động của Tổ do Bên A quy định. Tham gia đầy đủ các phiên giao dịch, các buổi họp giao ban với Bên A, các lớp tập huấn nghiệp vụ, lĩnh hội và phổ biến đầy đủ các thông tin đến tổ viên. Sử dụng các ứng dụng của NHCSXH để nâng cao hiệu quả thực hiện các nội dung công việc được ủy nhiệm.'],
    ['', 'l) Vận động tổ viên tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm… để nâng cao trình độ sản xuất, kinh doanh, sử dụng vốn vay đúng mục đích, có hiệu quả.'],
    ['', 'm) Đề xuất, kiến nghị và khiếu nại với chính quyền địa phương, NHCSXH và các cơ quan liên quan về việc triển khai thực hiện tín dụng chính sách xã hội trên địa bàn.'],
    ['', 'n) Tổ trưởng Tổ TK&amp;VV có trách nhiệm thanh toán số tiền hoa hồng được Bên A chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.'],
    ['', 'o) Sử dụng đúng mục đích, bảo mật thông tin, dữ liệu do Bên A cung cấp hoặc do Ban quản lý Tổ thu thập, tiếp nhận, lưu giữ trong quá trình hoạt động; không cung cấp cho bên thứ ba trái quy định và thực hiện bàn giao đầy đủ khi chấm dứt hoặc thay thế Hợp đồng.'],
    ['', '2. Quyền lợi'], ['', 'a) Được NHCSXH đào tạo, tập huấn nghiệp vụ quản lý, điều hành hoạt động của Tổ.'],
    ['', 'b) Được Bên A chi trả hoa hồng cho việc thực hiện các công việc được ủy nhiệm trên cơ sở quy định của cấp có thẩm quyền từng thời kỳ.'], ['', 'c) Được NHCSXH xem xét khen thưởng theo định kỳ hoặc đột xuất.'],
    ['b', 'Điều 4. Điều khoản thi hành'],
    ['', '1. Các bên có trách nhiệm thực hiện đúng nội dung đã thỏa thuận trong Hợp đồng này. Mọi sửa đổi, bổ sung nội dung của Hợp đồng phải được sự thỏa thuận của hai bên bằng văn bản.'],
    ['', '2. Khi thay đổi Tổ trưởng, Tổ trưởng cũ có trách nhiệm bàn giao hồ sơ của Tổ và việc quản lý điều hành hoạt động của Tổ cho Tổ trưởng mới. Tổ trưởng mới có trách nhiệm tiếp tục chỉ đạo thực hiện hoạt động của Tổ theo Quy chế hoạt động của Tổ và các quy định hiện hành của NHCSXH.'],
    ['', '3. Trong quá trình thực hiện, nếu có tranh chấp xảy ra thì hai bên thống nhất giải quyết trên tinh thần hợp tác. Trường hợp không hoà giải được thì yêu cầu cơ quan có thẩm quyền giải quyết hoặc khởi kiện ra tòa án.'],
    ['', '4. Hợp đồng này hết hiệu lực kể từ ngày Bên A ký Hợp đồng uỷ nhiệm với đại diện Ban quản lý Tổ là Tổ trưởng mới được Tổ bầu ra.'],
    ['', 'Hợp đồng này có hiệu lực kể từ ngày ký, thay thế các Hợp đồng, Phụ lục Hợp đồng đã ký trước đây (nếu có); được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản để tổ chức thực hiện./.']];
  var h = hsoMauSo('11/TD', ['Lập 02 liên:', '- 01 liên lưu NH;', '- 01 liên lưu Tổ TK&amp;VV.'])+hsoQH()+'<p class="c b s14 tr">HỢP ĐỒNG ỦY NHIỆM</p><p class="c b">Về việc thực hiện một số nội dung công việc trong quy trình cho vay của Ngân hàng Chính sách xã hội</p>'+
    '<p class="j thut i tr">Căn cứ Nghị định số 06/2026/NĐ-CP ngày 10/01/2026 của Chính phủ quy định về tổ chức và hoạt động của Ngân hàng Chính sách xã hội (NHCSXH);</p>'+
    '<p class="j thut i">Căn cứ Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị NHCSXH về quy chế hoạt động của Tổ Tiết kiệm và vay vốn (TK&amp;VV);</p>'+
    '<p class="j thut i">Căn cứ Biên bản họp Tổ TK&amp;VV ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+' về việc thành lập Tổ TK&amp;VV đã được UBND xã '+hsoO(T.xa)+' chấp thuận cho phép hoạt động;</p>'+
    '<p class="j thut i">Căn cứ Biên bản họp Tổ TK&amp;VV ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+' về việc thay đổi Ban quản lý Tổ TK&amp;VV đã được UBND xã '+hsoO(T.xa)+' chấp thuận (nếu có).</p>'+
    '<p class="thut">Hôm nay, ngày '+(ng ? hsoNgayO(ng) : hsoCham(4)+'/'+hsoCham(5)+'/'+hsoCham(6))+', tại '+hsoCham(45)+'</p><p class="thut">Chúng tôi gồm có:</p>'+
    '<p class="b">I. BÊN ỦY NHIỆM (Bên A)</p><p class="thut">- Chi nhánh/Phòng giao dịch Ngân hàng Chính sách xã hội '+hsoO(hsoPGD('ngan'), 'kb')+'</p>'+
    '<p class="thut">- Đại diện Ông (Bà): '+hsoO(hsoPGD('daiDien'), 'kb', 25)+' Chức vụ: '+hsoO(hsoPGD('daiDien') ? hsoPGD('chucVu') : '', 'kb', 18)+'</p>'+
    '<p class="thut">- Địa chỉ: '+hsoO(hsoPGD('diaChi'), 'kb', 60)+'</p><p class="thut">- Số điện thoại: '+hsoO(hsoPGD('dt'), 'kb', 50)+'</p>'+
    '<p class="b">II. BÊN NHẬN ỦY NHIỆM (Bên B)</p><p class="thut">- Ban quản lý Tổ TK&amp;VV: '+hsoO(T.tt, 'sl', 30)+' thuộc Hội: '+hsoO(T.hoi)+'</p>'+
    '<p class="thut">- Đại diện Ông (Bà): '+hsoO(T.tt, 'sl', 30)+' Chức vụ: Tổ trưởng</p>'+
    '<p class="thut">- Số Thẻ căn cước: '+hsoO(c.cccd, 'sl', 16)+'; Ngày cấp '+(c.ncap ? hsoO(ngayVNsl(c.ncap)) : hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(5))+'; Nơi cấp: '+hsoO(c.noiCap, 'sl', 12)+'</p>'+
    '<p class="thut">- Địa chỉ: Thôn '+hsoO(T.ap)+', xã '+hsoO(T.xa)+', tỉnh '+coChuHTML(T.tinh)+'.</p><p class="thut">Hai bên nhất trí thỏa thuận các nội dung sau:</p>'+
    dieu.map(function(d){ return '<p class="j thut'+(d[0]==='b' ? ' b tr' : d[0]==='i' ? ' i' : d[0]==='c' ? ' c i' : '')+'">'+d[1]+'</p>'; }).join('')+
    hsoKy([['ĐẠI DIỆN BÊN B', '', T.tt], ['ĐẠI DIỆN BÊN A', '(Ký tên, đóng dấu)', hsoPGD('daiDien'), 'kb']]);
  return {ma:'11/TD', h:h, cc:K.cc};
}

/* ---------- 01/BG · 02/BG ---------- */
function hsoGiaoNhan(t){   /* Bên giao / Bên nhận: anh sửa ở tùy chọn; chưa sửa → so tổ trưởng kỳ trước */
  var T = hsoTo(t), tr = hsoTruoc(t), o = HSO.o, g = o.giao, n = o.nhan;
  if(g===undefined && n===undefined){ if(tr && tr.ten && slChuan(tr.ten)!==slChuan(T.tt)){ g = tr.ten; n = T.tt; } else { g = T.tt; n = ''; } }
  return {giao:g||'', nhan:n||''};
}
function hsoLap01bg(t){
  var T = hsoTo(t), G = hsoGiaoNhan(t), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', n = hsoNg(ng);
  var h = hsoMauSo('01/BG', ['Lập 02 bản.'])+hsoQH()+'<p class="c b s14 tr">BIÊN BẢN</p><p class="c b">Về việc bàn giao hồ sơ Tổ và các nội dung liên quan đến hoạt động của Tổ TK&amp;VV</p>'+
    '<p class="j thut i tr">Căn cứ Biên bản họp Tổ Tiết kiệm và vay vốn (TK&amp;VV) ngày '+hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8)+' về việc thay đổi thành viên Ban quản lý Tổ đã được UBND xã '+hsoO(T.xa)+' chấp thuận,</p>'+
    '<p class="thut">Hôm nay, vào hồi '+hsoCham(5)+' h '+hsoCham(5)+', '+hsoNTN(ng)+'</p>'+
    '<p class="thut">Tại thôn: '+hsoO(T.ap)+' xã: '+hsoO(T.xa)+' tỉnh/thành phố: '+coChuHTML(T.tinh)+'.</p><p class="thut">Chúng tôi gồm có:</p>'+
    '<p class="b">I. BÊN BÀN GIAO</p><p class="j thut">Ông/Bà: '+hsoO(G.giao, 'sl', 30)+', nguyên Tổ trưởng của Tổ TK&amp;VV tại thôn: '+hsoO(T.ap)+' thuộc tổ chức CT-XH '+hsoO(T.hoi, 'sl', 30)+' quản lý.</p>'+
    '<p class="b">II. BÊN NHẬN BÀN GIAO</p><p class="j thut">Ông/Bà: '+hsoO(G.nhan, 'kb', 30)+' Chức vụ: Tổ trưởng Tổ TK&amp;VV tại thôn: '+hsoO(T.ap)+' thuộc tổ chức CT-XH '+hsoO(T.hoi, 'sl', 30)+' quản lý.</p>'+
    '<p class="b">III. THÀNH PHẦN CHỨNG KIẾN (nếu có)</p><p class="thut">1. Ông/Bà: '+hsoO(N.cb, 'kb', 25)+' Chức vụ: '+hsoO(N.cv, 'kb', 15)+' đại diện '+hsoO(N.cb ? T.hoi : '', 'kb', 35)+'</p>'+
    '<p class="thut">2. Ông/Bà: '+hsoCham(30)+' Chức vụ: '+hsoCham(18)+' đại diện '+hsoCham(40)+'</p>'+
    '<p class="j thut tr">Thực hiện bàn giao hồ sơ, giấy tờ và các nội dung công việc liên quan đến hoạt động của Tổ TK&amp;VV, cụ thể như sau:</p>'+
    '<p class="b thut">1. Hồ sơ của Tổ TK&amp;VV</p><p class="thut">a) Biên bản họp Tổ mẫu số 10A/TD: '+hsoCham(6)+' bản</p><p class="thut">b) Biên bản họp Tổ mẫu số 10B/TD: '+hsoCham(6)+' bản</p>'+
    '<p class="thut">c) Biên bản họp Tổ mẫu số 10C/TD: '+hsoCham(6)+' quyển (từ tháng '+hsoCham(3)+' năm '+hsoCham(4)+' đến tháng '+hsoCham(3)+' năm '+hsoCham(4)+').</p>'+
    '<p class="thut">d) Danh sách Tổ viên đề nghị vay vốn mẫu số 03/TD: '+hsoCham(6)+' bản</p><p class="thut">đ) Các hồ sơ khác</p><p class="thut">- '+hsoCham(10)+'</p><p class="thut">- '+hsoCham(10)+'</p>'+
    '<p class="b thut">2. Các công việc đang thực hiện</p><p class="thut">a) Số hồ sơ vay vốn đã nhận, chưa gửi cho ngân hàng: '+hsoCham(6)+' bộ.</p><p class="thut">b) Số hồ sơ đã được phê duyệt, chưa giải ngân: '+hsoCham(6)+' bộ.</p><p class="thut">c) '+hsoCham(10)+'</p>'+
    '<p class="b thut">3. Ý kiến của Bên bàn giao, Bên nhận bàn giao</p><p class="thut">a) Bên bàn giao</p><p>'+hsoCham(110)+'</p><p class="thut">b) Bên nhận bàn giao</p><p>'+hsoCham(110)+'</p>'+
    '<p class="j thut tr">Biên bản được lập 02 bản mỗi bên giữ 01 bản.</p><p class="j thut">Biên bản được đọc cho các bên cùng nghe, thống nhất thông qua và cùng nhất trí ký tên dưới đây./.</p>'+
    hsoKy([['BÊN GIAO', '', G.giao], ['BÊN NHẬN', '', G.nhan, 'kb'], ['THÀNH PHẦN CHỨNG KIẾN', '', N.cb, 'kb']]);
  return {ma:'01/BG', h:h};
}
function hsoLap02bg(t){
  var T = hsoTo(t), G = hsoGiaoNhan(t), N = hsoNguoiHoi(t), ng = HSO.o.ngay || '', ngSL = TO_K && t ? TO_K.ngay : '', ca = !!hsoLuu().bgCa;
  var tv = hsoTVTo(t).filter(function(k){ return ca || k.conNo || k.lt>0 || k.t105>0; });
  var th = function(x, cs, rs){ return '<td class="c b"'+(cs ? ' colspan="'+cs+'"' : '')+(rs ? ' rowspan="'+rs+'"' : '')+'>'+x+'</td>'; };
  var r = '<tr>'+th('Stt', 0, 2)+th('Họ tên khách hàng/ Chương trình', 0, 2)+th('Mã khoản vay', 0, 2)+th('Số liệu tại NHCSXH', 3)+th('Số liệu đối chiếu với khách hàng', 3)+th('Chênh lệch (+,-)', 3)+th('Nguyên nhân chênh lệch', 0, 2)+th('Chữ ký của khách hàng', 0, 2)+'</tr>'+
    '<tr>'+[1, 2, 3].map(function(){ return th('Nợ gốc')+th('Nợ lãi')+th('Số dư tiền gửi'); }).join('')+'</tr>'+
    '<tr>'+['1','2','3','4','5','6','7','8','9','10=4-7','11=5-8','12=6-9','13','14'].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr>';
  var o = function(v, l){ return '<td class="r'+(l ? ' '+l : '')+'">'+(v ? hsoO(tdnTien(v)) : '')+'</td>'; }, rong = '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
  var tong = {dn:0, lt:0, t105:0}, qh = {n:0, s:0}, kn = {n:0, s:0};
  tv.forEach(function(k, i){ tong.dn += k.dn||0; tong.lt += k.lt||0; tong.t105 += k.t105||0;
    r += '<tr><td class="c b">'+(i+1)+'</td><td class="b">'+hsoO(k.ten)+'</td><td class="c b">x</td>'+o(k.dn, 'b')+o(k.lt, 'b')+o(k.t105, 'b')+rong+'</tr>';
    k.mon.forEach(function(m){ if((m.qh||0)>0){ qh.n++; qh.s += m.qh; } if((m.kn||0)>0){ kn.n++; kn.s += m.kn; }
      r += '<tr><td></td><td class="i">'+hsoO(hsoCTMon(m))+'</td><td class="c">'+hsoO(m.ku)+'</td>'+o(m.dn)+o(laiTon(m))+'<td></td>'+rong+'</tr>'; }); });
  if(!tv.length) for(var i=0;i<6;i++) r += '<tr><td class="c">'+(i ? '' : '1')+'</td><td></td><td></td><td></td><td></td><td></td>'+rong+'</tr>';
  r += '<tr><td></td><td class="c b">Tổng cộng</td><td></td>'+o(tong.dn, 'b')+o(tong.lt, 'b')+o(tong.t105, 'b')+rong+'</tr>';
  var dong = function(ten, ten2, cv){ return '<p>- Ông (bà): '+hsoO(ten, 'kb', 35)+' '+cv+': '+hsoO(ten2, 'kb', 35)+'</p>'; };
  var h = hsoBang('khung0', [1, 1], '<tr><td><p class="b">XÃ: '+hsoO(T.xa ? T.xa.toUpperCase() : '', 'sl', 40)+'</p></td><td class="r"><p class="r b s11">Mẫu số 02/BG</p><p class="r i s11">- Lập 01 liên lưu NH</p><p class="r i s11">- Tổ trưởng Tổ TKVV bên nhận lưu 01 bản photo</p></td></tr>')+
    '<p class="c b s14 tr">BIÊN BẢN BÀN GIAO KIÊM ĐỐI CHIẾU SỐ DƯ TIỀN VAY, TIỀN GỬI</p><p class="c b">Đến ngày '+(ngSL ? hsoO(ngayVNsl(ngSL)) : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(8))+'</p>'+
    '<p class="thut tr">Hôm nay, '+hsoNTN(ng)+', tại '+hsoCham(60)+', chúng tôi gồm có:</p>'+
    dong(N.cb, N.cb ? T.hoi : '', 'Hội')+dong('', '', 'Hội')+
    '<p>- Ông (bà): '+hsoO(G.giao, 'sl', 35)+' Tổ trưởng bên giao thuộc Hội: '+hsoO(T.hoi, 'sl', 30)+'</p>'+
    '<p>- Ông (bà): '+hsoO(G.nhan, 'kb', 35)+' Tổ trưởng bên nhận thuộc Hội: '+hsoO(G.nhan ? T.hoi : '', 'kb', 30)+'</p><p>- '+hsoCham(110)+'</p>'+
    '<p class="j thut">Đã tiến hành đối chiếu thực tế và bàn giao Danh sách tổ viên, dư nợ, số dư tiền gửi tổ viên đến ngày '+(ngSL ? hsoO(ngayVNsl(ngSL)) : hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6))+' của các tổ viên như sau:</p>'+
    '<p class="r i s11">Đơn vị tính: đồng</p>'+hsoBang('luoi s10', [4, 17, 10, 8.5, 6.5, 7, 6, 5, 6, 6, 5, 6, 7, 6.5], r)+
    '<p class="tr">- Số tổ viên chưa đối chiếu được: '+hsoCham(10)+' người; số thứ tự: '+hsoCham(25)+'; số tiền: '+hsoCham(25)+' đồng</p>'+
    '<p>- Nợ quá hạn: '+hsoO(t ? String(qh.n) : '', 'sl', 10)+' món; số tiền: '+hsoO(t ? tdnTien(qh.s) : '', 'sl', 20)+' đồng;</p>'+
    '<p>- Nợ khoanh: '+hsoO(t ? String(kn.n) : '', 'sl', 10)+' món; số tiền: '+hsoO(t ? tdnTien(kn.s) : '', 'sl', 20)+' đồng;</p>'+
    hsoBang('khung0 hso-ky', [1, 1, 1, 1], '<tr><td colspan="2" class="c b">BÊN GIAO</td><td colspan="2" class="c b">BÊN NHẬN</td></tr><tr>'+
      [['Hội/Đoàn thể', N.cb, 'kb'], ['Tổ trưởng Tổ TK&amp;VV', G.giao, 'sl'], ['Tổ trưởng Tổ TK&amp;VV', G.nhan, 'kb'], ['Hội/Đoàn thể', '', 'kb']].map(function(x){
        return '<td class="c"><p class="c b">'+x[0]+'</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c">&nbsp;</p><p class="c b">'+(x[1] ? hsoO(x[1], x[2]) : '&nbsp;')+'</p></td>'; }).join('')+'</tr>');
  return {ma:'02/BG', h:h};
}

/* ---------- HỒ SƠ VAY: 01/TD · 03/TD · 04/TD · 09A/TD ---------- */
function hsoKhachChon(t){ var kh = HSO.vay.kh; if(!kh || kh==='moi' || !t) return null; var c = hsoKhach(kh, t); return c.ten ? c : null; }
function hsoDiaChi(c, t){ var tenXa = (c && c.tenXa) || (t && t.tenXa) || '', ap = (c && c.ap) || (t ? hsoApTen(t) : '');
  return [ap ? ktCapAp(tenXa)+' '+ap : '', tenXa ? ktXaChu(tenXa) : '', 'tỉnh '+hsoPGD('tinh')].filter(Boolean).join(', '); }
function hsoLap01td(t){
  var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, ct = V.ct || '', tien = hsoSo(V.tien), tuCo = hsoSo(V.tuCo), md = V.md || '', dt = V.dt!==undefined ? V.dt : (/^HSSV/.test(ct) ? 'Chi phí học tập, sinh hoạt cho sinh viên' : '');
  var bang = '<tr><td class="c b">Đối tượng</td><td class="c b">Số lượng</td><td class="c b">Thành tiền</td></tr><tr><td>'+hsoO(dt, 'kb', 30)+'</td><td class="c">'+hsoCham(10)+'</td><td class="r">'+(tien ? hsoO(tdnTien(tien)+' đồng', 'kb') : hsoCham(15))+'</td></tr><tr><td>&nbsp;</td><td></td><td></td></tr><tr><td>&nbsp;</td><td></td><td></td></tr>';
  var h = hsoBang('khung0', [1, 1], '<tr><td></td><td class="r"><p class="r b s11">Mẫu số 01/TD</p></td></tr>')+hsoQH()+'<p class="c b s14 tr">GIẤY ĐỀ NGHỊ VAY VỐN KIÊM PHƯƠNG ÁN SỬ DỤNG VỐN VAY</p>'+
    '<p class="c b">Chương trình cho vay: '+hsoO(hsoCTTen(ct), 'kb', 40)+'</p><p class="c tr">Kính gửi: '+hsoO(hsoPGD('kinhGui'), 'kb')+'.</p>'+
    '<p class="tr">1. Họ tên người vay: '+hsoO(c && c.ten, 'sl', 35)+' &nbsp; Năm sinh: '+hsoO(c && c.ns ? ngayVNsl(c.ns) : '', 'sl', 12)+'</p>'+
    '<p>- Số CC\\CCCD: '+hsoO(c && c.cccd, 'sl', 16)+' ngày cấp: '+hsoO(c && c.ncap ? ngayVNsl(c.ncap) : '', 'sl', 12)+', nơi cấp: '+hsoO(c && c.noiCap, 'sl', 15)+'.</p>'+
    '<p>- Địa chỉ cư trú: '+hsoO(c || t ? hsoDiaChi(c, t) : '', 'sl', 70)+'.</p>'+
    '<p>- Là thành viên Tổ TK&amp;VV do ông (bà): '+hsoO(T.tt, 'sl', 30)+' làm tổ trưởng.</p><p>- Thuộc tổ chức '+hsoO(T.hoiNgan, 'sl', 30)+' quản lý.</p>'+
    '<p class="tr">2. Đề nghị NHCSXH cho vay số tiền: '+(tien ? hsoO(tdnTien(tien), 'kb') : hsoCham(25))+' đồng</p><p>(Bằng chữ: '+(tien ? hsoO(hsoChuSo(tien), 'kb') : hsoCham(70))+')</p>'+
    '<p>Để thực hiện phương án: '+hsoO(md, 'kb', 70)+'.</p>'+
    '<p>Tổng nhu cầu vốn: '+(tien ? hsoO(tdnTien(tien+tuCo), 'kb') : hsoCham(25))+' đồng. Trong đó:</p><p class="thut">+ Vốn tự có tham gia: '+(tien ? hsoO(tdnTien(tuCo), 'kb') : hsoCham(25))+' đồng.</p>'+
    '<p class="thut">+ Vốn vay NHCSXH: '+(tien ? hsoO(tdnTien(tien), 'kb') : hsoCham(25))+' đồng để dùng vào việc:</p>'+hsoBang('luoi', [55, 20, 25], bang)+
    '<p class="thut tr">- Thời hạn xin vay: '+hsoCham(10)+' tháng; Kỳ hạn trả nợ: '+hsoCham(8)+' tháng/lần.</p><p class="thut">- Hạn trả nợ cuối cùng: Ngày '+hsoCham(4)+'/'+hsoCham(5)+'/'+hsoCham(8)+'</p>'+
    '<p class="j thut">Chúng tôi cam kết: sử dụng vốn vay đúng mục đích, trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai trái, tôi hoàn toàn chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0', [1, 1], '<tr><td></td><td class="c"><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(6)+'</p></td></tr>')+
    hsoBang('khung0', [1, 1], '<tr><td class="c"><p class="c b">XÁC NHẬN CỦA '+(T.hoiNgan ? coChuHTML(T.hoiNgan.toUpperCase()) : 'TỔ CHỨC CT-XH')+'</p><p>Ông/bà '+hsoCham(45)+'</p><p>'+hsoCham(55)+'</p><p>'+hsoCham(55)+'</p><p class="c b">'+coChuHTML(t ? ktChuan(t).ky : 'Chủ tịch')+'</p><p class="c i s12">(Ký tên, đóng dấu)</p><p>&nbsp;</p><p>&nbsp;</p></td>'+
      '<td class="c"><p class="c b">Người vay</p><p class="c i s12">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+(c ? hsoO(c.ten) : '&nbsp;')+'</p></td></tr>')+
    '<p class="c b tr">PHÊ DUYỆT CỦA NGÂN HÀNG</p><p>1. Số tiền cho vay: '+hsoCham(20)+' đồng (Bằng chữ: '+hsoCham(40)+')</p><p>2. Lãi suất: '+hsoCham(6)+' %/năm. Lãi suất nợ quá hạn: '+hsoCham(6)+' % lãi suất khi cho vay.</p>'+
    '<p>3. Thời hạn cho vay: '+hsoCham(10)+' tháng; Kỳ hạn trả nợ: '+hsoCham(10)+' tháng/lần.</p><p>4. Số tiền trả nợ: '+hsoCham(20)+' đồng/lần. Hạn trả nợ cuối cùng: Ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+'</p>'+
    '<p>5. Lãi tiền vay được trả định kỳ hàng tháng, vào ngày '+hsoCham(30)+'</p>'+
    hsoKy([['Cán bộ tín dụng', '', hsoPGD('cbtd'), 'kb'], ['Trưởng phòng (Tổ trưởng) TD'], ['Ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(5)+'<br>Giám đốc', '(Ký tên, đóng dấu)']]);
  return {ma:'01/TD', h:h};
}
function hsoLap03td(t){
  var T = hsoTo(t), V = HSO.vay, ct = V.ct || '', tv = hsoTVTo(t).filter(function(k){ return V.chon && V.chon[k.kh]; }), ng = HSO.o.ngay || '', capAp = T.capAp || 'ấp', xaCap = (String((t && t.tenXa) || '').match(/^(phường)/i) ? 'Phường' : 'Xã');
  var r = '<tr><td class="c b" rowspan="2">STT</td><td class="c b" rowspan="2">Họ và tên</td><td class="c b" rowspan="2">Đối tượng thụ hưởng</td><td class="c b" colspan="3">Đề nghị của Tổ TK&amp;VV</td><td class="c b" colspan="2">Phê duyệt của Ngân hàng</td></tr>'+
    '<tr><td class="c b">Số tiền</td><td class="c b">Mục đích sử dụng vốn</td><td class="c b">Thời hạn</td><td class="c b">Số tiền</td><td class="c b">Thời hạn</td></tr><tr>'+[1,2,3,4,5,6,7,8].map(function(x){ return '<td class="c i">'+x+'</td>'; }).join('')+'</tr>';
  var n = Math.max(5, tv.length);
  for(var i=0;i<n;i++) r += '<tr><td class="c">'+(i+1)+'</td><td>'+(tv[i] ? hsoO(tv[i].ten) : '&nbsp;')+'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  r += '<tr><td></td><td class="c b">Cộng:</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  var h = hsoBang('khung0', [55, 45], '<tr><td><p>Tên tổ TK&amp;VV: '+hsoO(T.tt, 'sl', 30)+'</p><p>'+(capAp==='khu phố' ? 'Khu phố' : 'Ấp')+': '+hsoO(T.ap, 'sl', 30)+'</p><p>'+xaCap+': '+hsoO(T.xa, 'sl', 30)+'</p></td>'+
      '<td class="r"><p class="r b s11">Mẫu số: 03/TD</p><p class="r i s10">Lập 02 liên chính (01 liên lưu hồ sơ Tổ tại NH, 01 liên lưu tại Tổ)</p><p class="r i s10">02 liên phôtô: 01 liên đóng C.từ tại NH; 01 liên lưu Hội đoàn thể</p></td></tr>')+
    '<p class="c b s14 tr">DANH SÁCH TỔ VIÊN</p><p class="c b">ĐỀ NGHỊ VAY VỐN NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p class="c b">Chương trình cho vay: '+hsoO(hsoCTTen(ct), 'kb', 40)+'</p>'+
    '<p class="j thut tr">Tại cuộc họp Tổ Tiết kiệm và vay vốn ngày '+(ng ? hsoNgayO(ng) : hsoCham(6)+'/'+hsoCham(6)+'/'+hsoCham(10))+' đã bình xét các tổ viên đề nghị vay vốn Ngân hàng Chính sách xã hội. Toàn tổ nhất trí đề xuất những tổ viên có tên dưới đây đang cư trú tại địa phương, đủ điều kiện và thuộc đối tượng vay vốn đợt này:</p>'+
    '<p class="r i s11">Đơn vị: đồng</p>'+hsoBang('luoi s12', [5, 20, 17, 12, 20, 8, 11, 7], r)+
    hsoBang('khung0 hso-ky', [1, 1, 1], '<tr><td class="c"><p class="c b">Tổ trưởng</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+(T.tt ? hsoO(T.tt) : '&nbsp;')+'</p></td>'+
      '<td class="c"><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p><p class="c b">Phần xác nhận của UBND '+xaCap.toLowerCase()+'</p><p>'+hsoCham(50)+'</p><p>'+hsoCham(50)+'</p><p class="c b">UBND '+xaCap.toLowerCase()+'</p><p class="c i s12">(Ký tên, đóng dấu)</p></td>'+
      '<td><p class="c i">Ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(8)+'</p><p class="c b">Phê duyệt của Ngân hàng</p><p>Số người được vay vốn đợt này: '+hsoCham(12)+' người.</p><p>Tổng số tiền cho vay: '+hsoCham(20)+' đồng.</p><p>Số người chưa được vay đợt này: '+hsoCham(6)+' người, có số thứ tự trong danh sách là: '+hsoCham(20)+'</p></td></tr>')+
    hsoKy([['Cán bộ tín dụng', '', hsoPGD('cbtd'), 'kb'], ['Trưởng phòng<br>(Tổ trưởng) TD'], ['Giám đốc', '(Ký tên, đóng dấu)']]);
  return {ma:'03/TD', h:h};
}
function hsoNgayGDToi(ngay){   /* ngày giao dịch kế tiếp (ngày trong tháng của điểm GD) từ hôm nay */
  var d = +String(ngay||'').replace(/\D/g, ''); if(!d || d>31) return '';
  var h = nay(), x = new Date(h.getFullYear(), h.getMonth(), d); if(x < new Date(h.getFullYear(), h.getMonth(), h.getDate())) x = new Date(h.getFullYear(), h.getMonth()+1, d);
  return ngayISO(x);
}
function hsoDiemXa(){   /* các điểm GD của xã đang lọc: [{k, ten, ngay}] */
  var S = hsoCH(), r = {}; if(!TO_K || !S.xa) return [];
  Object.keys(TO_K.to).forEach(function(m){ var t = TO_K.to[m]; if(t.xa!==S.xa || !t.tenDiem) return; var k = t.khoaDiem; if(!r[k]) r[k] = {k:k, ten:String(t.tenDiem).trim(), ngay:t.ngayGD||'', tenXa:t.tenXa||''}; });
  return Object.keys(r).map(function(k){ return r[k]; }).sort(function(a, b){ return a.ten.localeCompare(b.ten, 'vi', {numeric:true}); });
}
function hsoLap04td(t){
  var V = HSO.vay, S = hsoCH(), ds = hsoDiemXa(), dk = V.diem || S.diem || (ds.length===1 ? ds[0].k : ''), d = ds.find(function(x){ return x.k===dk; }) || null;
  var tenXa = d ? d.tenXa : (t ? t.tenXa : ''), xa = tenXa ? ktXaChu(tenXa) : '', n = hsoSo(V.soNguoi), tien = hsoSo(V.tien), ngPhat = V.ngayPhat!==undefined ? V.ngayPhat : (d ? hsoNgayGDToi(d.ngay) : ''), np = hsoNg(ngPhat), nl = hsoNg(V.ngayLap || ngayISO(nay()));
  var h = hsoBang('khung0', [38, 62], '<tr><td class="c"><p class="c">'+hsoO(hsoPGD('dau1'), 'kb')+'</p><p class="c b"><u>'+hsoO(hsoPGD('dau2'), 'kb')+'</u></p></td><td class="c"><p class="c b s12">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="c b"><u>Độc lập - Tự do - Hạnh phúc</u></p></td></tr>')+
    '<p class="r b s11 tr">Mẫu số 04/TD</p><p class="r i s11">Lập 02 liên: - 01 liên lưu tổ - 01 liên lưu NH</p>'+
    '<p class="r i">'+coChuHTML(hsoPGD('noi'))+', ngày '+hsoO(nl.d, 'kb')+' tháng '+hsoO(nl.m, 'kb')+' năm '+hsoO(nl.y, 'kb')+'</p>'+
    '<p class="c b s14 tr">THÔNG BÁO</p><p class="c b">KẾT QUẢ PHÊ DUYỆT CHO VAY</p><p class="c tr">Kính gửi: Ủy ban nhân dân '+hsoO(xa, 'sl', 30)+'.</p>'+
    '<p class="j thut tr">Căn cứ hồ sơ cho vay đã được phê duyệt, '+coChuHTML(hsoPGD('ten'))+' thông báo kết quả phê duyệt cho vay như sau:</p>'+
    '<p class="j thut">1. Tổng số người được vay vốn đợt này (kèm danh sách mẫu 03/TD nếu có): '+(n ? hsoO(hai(n), 'kb') : hsoCham(10))+' người. Số tiền: '+(tien ? hsoO(tdnTien(tien), 'kb') : hsoCham(20))+' đồng. Bằng chữ: '+(tien ? hsoO(hsoChuSo(tien), 'kb') : hsoCham(40))+'.</p>'+
    '<p class="thut">2. Số người chưa được vay vốn đợt này: '+hsoCham(25)+' người.</p><p class="thut">- Có số thứ tự trong danh sách là: '+hsoCham(40)+'</p><p class="thut">- Số tiền: '+hsoCham(50)+' đồng.</p>'+
    '<p class="j thut">3. Lịch phát tiền vay vào '+hsoO(V.gio, 'kb', 15)+', '+(np ? 'ngày '+hsoO(np.d, 'kb')+' tháng '+hsoO(np.m, 'kb')+' năm '+hsoO(np.y, 'kb') : 'ngày '+hsoCham(5)+' tháng '+hsoCham(5)+' năm '+hsoCham(7))+', tại địa điểm: Điểm giao dịch '+hsoO(d ? d.ten : '', 'sl', 25)+(xa ? ' ('+coChuHTML(xa)+')' : '')+'.</p>'+
    '<p class="j thut">Đề nghị UBND '+hsoO(xa, 'sl', 25)+' thông báo cho những người được vay vốn đến địa điểm và thời gian nêu trên để nhận tiền vay.</p>'+
    hsoKy([['Người lập', '', hsoPGD('cbtd'), 'kb'], ['Giám đốc', '(Ký tên, đóng dấu)', /giám đốc/i.test(hsoPGD('chucVu')) ? hsoPGD('daiDien') : '', 'kb']]);
  return {ma:'04/TD', h:h};
}
function hsoMonGH(t){   /* món còn dư nợ của khách đang chọn (09A) */
  var kh = HSO.vay.kh; if(!t || !kh || kh==='moi') return [];
  var k = hsoTVTo(t).find(function(x){ return x.kh===kh; }); return k ? k.mon.filter(function(m){ return (m.dn||0)>0; }) : [];
}
function hsoLap09a(t){
  var T = hsoTo(t), c = hsoKhachChon(t), V = HSO.vay, mon = hsoMonGH(t), m = mon.find(function(x){ return x.ku===V.ku; }) || mon[0] || null, han = m ? skHL(m) : '', tien = V.tienGH!==undefined ? hsoSo(V.tienGH) : (m ? m.dn : 0);
  var h = hsoBang('khung0', [62, 38], '<tr><td class="c"><p class="c b">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="c b"><u>Độc lập - Tự do - Hạnh phúc</u></p></td><td class="r"><p class="r b s11">Mẫu số: 09A/TD</p><p class="r i s11">Lập 01 liên lưu NH</p></td></tr>')+
    '<p class="c b s14 tr">GIẤY ĐỀ NGHỊ GIA HẠN NỢ</p><p class="c tr">Kính gửi: '+hsoO(hsoPGD('kinhGui'), 'kb')+'</p>'+
    '<p class="tr">Họ và tên khách hàng: '+hsoO(c && c.ten, 'sl', 40)+' Năm sinh: '+hsoO(c && c.ns ? c.ns.slice(0, 4) : '', 'sl', 12)+'</p>'+
    '<p>Nơi cư trú: '+hsoO(c || t ? hsoDiaChi(c, t) : '', 'sl', 80)+'</p>'+
    '<p class="j">Là tổ viên Tổ tiết kiệm và vay vốn do ông (bà): '+hsoO(T.tt, 'sl', 30)+' làm Tổ trưởng, thuộc tổ chức Hội, đoàn thể: '+hsoO(T.hoi, 'sl', 25)+' quản lý.</p>'+
    '<p>Hiện nay, tôi đang vay vốn Ngân hàng Chính sách xã hội, cụ thể như sau:</p>'+
    '<p class="thut">- Mã khoản vay '+hsoO(m && m.ku, 'sl', 30)+' thuộc chương trình cho vay '+hsoO(m ? hsoCTMon(m) : '', 'sl', 20)+'</p>'+
    '<p class="thut">- Số tiền: gốc: '+hsoO(m ? tdnTien(m.dn) : '', 'sl', 25)+' đồng; số tiền nợ lãi: '+hsoO(m && laiTon(m)>0 ? tdnTien(laiTon(m)) : '', 'sl', 20)+' đồng.</p>'+
    '<p class="j">Theo thỏa thuận đã ký với Ngân hàng, tôi phải trả số tiền trên vào ngày '+(han ? hsoO(ngayVNsl(han)) : hsoCham(5)+'/'+hsoCham(5)+'/'+hsoCham(8))+' nhưng chưa trả được vì lý do: '+hsoO(V.lyDo, 'kb', 50)+'</p><p>'+hsoCham(110)+'</p>'+
    '<p class="j">Đề nghị Ngân hàng xem xét cho gia hạn khoản nợ gốc '+(tien ? hsoO(tdnTien(tien), 'kb') : hsoCham(30))+' đồng;</p>'+
    '<p class="j">Thời gian đề nghị: '+hsoCham(8)+' tháng; kế hoạch trả nợ '+hsoCham(8)+' tháng/kỳ với số tiền '+hsoCham(30)+' đồng/kỳ, số tiền trả nợ kỳ cuối '+hsoCham(30)+' đồng.</p>'+
    '<p class="j thut">Tôi xin cam kết sử dụng vốn vay đúng mục đích; trả nợ gốc và lãi đầy đủ, đúng hạn. Nếu sai tôi xin chịu trách nhiệm trước pháp luật.</p>'+
    hsoBang('khung0 hso-ky', [1, 1], '<tr><td class="c"><p>&nbsp;</p><p class="c b">Tổ TK&amp;VV</p><p class="c i s12">(Ký, ghi rõ họ tên)</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+(T.tt ? hsoO(T.tt) : '&nbsp;')+'</p></td>'+
      '<td class="c"><p class="c i">'+hsoO(T.xa, 'sl', 15)+', ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(6)+'</p><p class="c b">Người vay</p><p class="c i s12">(Ký, ghi rõ họ tên hoặc điểm chỉ)</p><p>&nbsp;</p><p>&nbsp;</p><p class="c b">'+(c ? hsoO(c.ten) : '&nbsp;')+'</p></td></tr>')+
    hsoBang('khung0 hso-ky', [1, 1], '<tr><td class="c"><p class="c b">Ý kiến của tổ chức chính trị - xã hội nhận ủy thác cấp xã (phường)</p><p>'+hsoCham(55)+'</p><p class="c i">Ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(6)+'</p><p class="c b">'+coChuHTML(t ? ktChuan(t).ky : 'Chủ tịch/Bí thư')+'</p><p class="c i s12">(Ký tên, đóng dấu)</p><p>&nbsp;</p><p>&nbsp;</p></td>'+
      '<td class="c"><p class="c b">Xác nhận của UBND cấp xã (phường)</p><p>'+hsoCham(55)+'</p><p class="c i">Ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(6)+'</p><p class="c b">Chủ tịch</p><p class="c i s12">(Ký tên, đóng dấu)</p><p>&nbsp;</p><p>&nbsp;</p></td></tr>')+
    '<p class="c b tr">PHÊ DUYỆT CỦA NGÂN HÀNG CHÍNH SÁCH XÃ HỘI</p><p>- Số tiền được gia hạn nợ là '+hsoCham(35)+' đồng.</p><p>- Thời gian gia hạn nợ: Từ ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+' đến ngày '+hsoCham(4)+'/'+hsoCham(4)+'/'+hsoCham(6)+'</p>'+
    hsoKy([['CÁN BỘ TÍN DỤNG', '', hsoPGD('cbtd'), 'kb'], ['TRƯỞNG PHÒNG KH-NVTD<br>(TỔ TRƯỞNG KH-NV)'], ['Ngày '+hsoCham(4)+' tháng '+hsoCham(4)+' năm '+hsoCham(5)+'<br>GIÁM ĐỐC', '(Ký tên, đóng dấu)']]);
  return {ma:'09A/TD', h:h};
}

/* ---------- lập mẫu đang chọn ---------- */
function hsoLap(){
  var p = hsoTab(), M = hsoMau(p), S = hsoCH(), t = TO_K && S.to ? TO_K.to[S.to] : null; if(t && toLaTT(t)) t = null;
  var f = {'10c':hsoLap10c, '10a':hsoLap10a, '10b':hsoLap10b, '11':hsoLap11, '01bg':hsoLap01bg, '02bg':hsoLap02bg, '01td':hsoLap01td, '03td':hsoLap03td, '04td':hsoLap04td, '09a':hsoLap09a}[M.k];
  var x = f(t);
  var ai = M.k==='01td' || M.k==='09a' ? ((hsoKhachChon(t)||{}).ten || '') : '';
  x.M = M; x.t = t;
  var pv = ai || (t ? 'To '+t.ten : M.k==='04td' ? hsoXaTen((hsoDiemXa()[0] || {}).tenXa) : '') || 'Trang';
  x.ten = xuatTen('Mau '+M.ma.replace(/\//g, ' '), pv, HSO.o.ngay || ngayISO(nay()));
  x.trang = hsoTrang(M, x.h, x.ten);
  return x;
}

/* ---------- WORD: HTML của mẫu → .docx (đoạn, bảng có gộp ô, đậm / nghiêng / gạch chân, ngắt trang) ---------- */
function hsoDocx(x){
  var M = x.M, mg = M.mg || [20, 20, 20, 30], TW = Math.round(((M.ngang ? 297 : 210) - mg[1] - mg[3])*56.7);
  var d = new DOMParser().parseFromString('<div id="hso-goc">'+x.h+'</div>', 'text/html'), goc = d.getElementById('hso-goc');
  var co = function(el, f){ var m = (' '+(el.className||'')+' ').match(/ s(\d+) /); return m ? +m[1]*2 : f; };
  var lop = function(el, k){ return (' '+(el.className||'')+' ').indexOf(' '+k+' ')>=0; };
  var chay = function(t, f){ return '<w:r><w:rPr>'+(f.b ? '<w:b/>' : '')+(f.i ? '<w:i/>' : '')+'<w:sz w:val="'+f.sz+'"/><w:szCs w:val="'+f.sz+'"/>'+(f.u ? '<w:u w:val="single"/>' : '')+'</w:rPr><w:t xml:space="preserve">'+xmlEsc(t)+'</w:t></w:r>'; };
  var chu = function(node, f){ var r = [];
    Array.prototype.forEach.call(node.childNodes, function(n){
      if(n.nodeType===3){ var t = n.nodeValue.replace(/[ \t\r\n]+/g, ' '); if(t) r.push(chay(t, f)); return; }
      if(n.nodeType!==1 || /^(COLGROUP|COL|TABLE|P)$/.test(n.tagName)) return;
      if(n.tagName==='BR'){ r.push('<w:r><w:br/></w:r>'); return; }
      var g = Object.assign({}, f); if(/^(B|STRONG)$/.test(n.tagName) || lop(n, 'b')) g.b = 1; if(/^(I|EM)$/.test(n.tagName) || lop(n, 'i')) g.i = 1; if(n.tagName==='U') g.u = 1; g.sz = co(n, g.sz);
      r = r.concat(chu(n, g)); });
    return r; };
  var doan = function(el, f){
    var jc = lop(el, 'c') ? 'center' : lop(el, 'r') ? 'right' : lop(el, 'j') ? 'both' : 'left', g = Object.assign({}, f);
    if(lop(el, 'b')) g.b = 1; if(lop(el, 'i')) g.i = 1; g.sz = co(el, g.sz);
    return '<w:p><w:pPr><w:spacing w:before="'+(lop(el, 'tr') ? 120 : 0)+'" w:after="'+(lop(el, 'sau') ? 120 : 20)+'" w:line="'+(f.bang ? 240 : 276)+'" w:lineRule="auto"/>'+(lop(el, 'thut') ? '<w:ind w:firstLine="567"/>' : '')+'<w:jc w:val="'+jc+'"/></w:pPr>'+chu(el, g).join('')+'</w:p>';
  };
  var vien = function(v){ return '<w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(function(b){ return '<w:'+b+' w:val="'+(v ? 'single' : 'nil')+'" w:sz="4" w:space="0" w:color="000000"/>'; }).join('')+'</w:tblBorders>'; };
  var bang = function(tb, f){
    var w = String(tb.getAttribute('data-w')||'1').split(',').map(Number), tong = w.reduce(function(a, b){ return a+b; }, 0) || 1, cw = w.map(function(v){ return Math.round(TW*v/tong); });
    var rong = function(i, n){ var s = 0; for(var j=i;j<i+n && j<cw.length;j++) s += cw[j]; return s; }, g = Object.assign({}, f, {sz:co(tb, f.sz), bang:1}), luoi = lop(tb, 'luoi'), keo = [];
    var x = '<w:tbl><w:tblPr><w:tblW w:w="'+TW+'" w:type="dxa"/>'+vien(luoi)+'<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="57" w:type="dxa"/><w:right w:w="57" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+cw.map(function(v){ return '<w:gridCol w:w="'+v+'"/>'; }).join('')+'</w:tblGrid>';
    Array.prototype.forEach.call(tb.rows, function(row){
      var cot = 0, h = '<w:tr><w:trPr><w:cantSplit/></w:trPr>';
      var noi = function(){ while(keo[cot] && keo[cot].n>0){ var k = keo[cot]; k.n--; h += '<w:tc><w:tcPr><w:tcW w:w="'+rong(cot, k.s)+'" w:type="dxa"/>'+(k.s>1 ? '<w:gridSpan w:val="'+k.s+'"/>' : '')+'<w:vMerge/></w:tcPr><w:p/></w:tc>'; cot += k.s; } };
      noi();
      Array.prototype.forEach.call(row.cells, function(c){
        var cs = c.colSpan || 1, rs = c.rowSpan || 1, nd = c.querySelector('p,table') ? khoi(c, g) : [doan(c, g)];
        h += '<w:tc><w:tcPr><w:tcW w:w="'+rong(cot, cs)+'" w:type="dxa"/>'+(cs>1 ? '<w:gridSpan w:val="'+cs+'"/>' : '')+(rs>1 ? '<w:vMerge w:val="restart"/>' : '')+'<w:vAlign w:val="'+(luoi ? 'center' : 'top')+'"/></w:tcPr>'+(nd.join('') || '<w:p/>')+'</w:tc>';
        if(rs>1) keo[cot] = {n:rs-1, s:cs};
        cot += cs; noi();
      });
      x += h+'</w:tr>';
    });
    return x+'</w:tbl>';
  };
  var khoi = function(el, f){ var r = [], truoc = '';
    Array.prototype.forEach.call(el.children, function(n){
      if(n.tagName==='P'){ r.push(doan(n, f)); truoc = 'p'; }
      else if(n.tagName==='TABLE'){ if(truoc==='t') r.push('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>'); r.push(bang(n, f)); truoc = 't'; }
      else if(n.tagName==='DIV'){ r = r.concat(khoi(n, f)); } });
    if(truoc==='t' && el===goc) r.push('<w:p/>');
    return r; };
  var than = khoi(goc, {sz:26}).join('');
  var tw = function(mm){ return Math.round(mm*56.7); };
  var sect = '<w:sectPr><w:pgSz w:w="'+(M.ngang ? 16838 : 11906)+'" w:h="'+(M.ngang ? 11906 : 16838)+'"'+(M.ngang ? ' w:orient="landscape"' : '')+'/><w:pgMar w:top="'+tw(mg[0])+'" w:right="'+tw(mg[1])+'" w:bottom="'+tw(mg[2])+'" w:left="'+tw(mg[3])+'" w:header="510" w:footer="510" w:gutter="0"/></w:sectPr>';
  return taoDocx(than, sect);
}
function hsoWord(){ var x = hsoLap(); hsoDocx(x).then(function(bl){ giaoFile(bl, x.ten+'.docx'); bao('Đã tạo '+x.ten+'.docx — ô app điền sẵn là chữ thường, sửa thoải mái trong Word.', 6); }).catch(function(er){ baoLoi('Chưa tạo được Word: '+(er && er.message || er)); }); }

/* ---------- giao diện tab ---------- */
function veHoSo(){
  var e = document.getElementById('tr7'); if(!e) return;
  if(!SL_SAN){ e.innerHTML = '<div class="rong">Đang mở số liệu…</div>'; slNap().then(veHoSo); return; }
  var C = hsoCH(), dsKy = toDsKy(), p = hsoTab();
  if(!dsKy.length){ TO_K = TO_K || null; hsoKhung(null); return; }   /* chưa có số liệu → vẫn in được mẫu trắng */
  toKyMacDinh(C, dsKy, 'hs');
  e.innerHTML = slTabConHTML()+'<div class="rong">Đang mở số liệu '+slKyChu(C.ky)+'…</div>';
  toNap(C.ky).then(function(K){ TO_K = K; if(nganHienTai===7 && hsoTab()===p && (D.cauHinh.slTab==='hst' || D.cauHinh.slTab==='hsv')) hsoKhung(K); })
    .catch(function(er){ var o = document.getElementById('tr7'); if(o) o.innerHTML = slTabConHTML()+'<div class="sl-bao do">Chưa mở được số liệu: '+coChuHTML(er && er.message || er)+' — vẫn in được mẫu trắng.</div>'; hsoKhung(null, 1); });
}
function hsoKhung(K, giu){
  var e = document.getElementById('tr7'), p = hsoTab(); if(!e) return;
  var dau = giu ? e.innerHTML : slTabConHTML()+(K ? kyGhiHTML(K) : '');
  e.innerHTML = dau+(K ? '<div id="'+p+'-cay" class="to-cay pv-cay"></div>' : '<div class="sl-bao vang">Chưa có số liệu món vay (Mẫu 31) — mẫu in ra để trống, ghi tay. Nạp ở <b>📥 Nạp &amp; KT</b> để app điền sẵn.</div>')+
    '<div class="th-bo th-bo2 hso-bo"><div class="th-cot hso-trai"><div class="to-bc th-bc-gon" id="hso-ds"></div><div id="hso-tuy" class="hso-tuy"></div></div>'+
    '<div class="th-cot th-xem"><div id="hso-xem-nut"></div><iframe id="hso-xem-khung" class="to-khung th-khung" title="Xem trước"></iframe></div></div>';
  if(K) pvVeCay(p); else hsoVe();
}
function hsoDsHTML(){
  var p = hsoTab(), M = hsoMau(p);
  return '<div class="th-nhom-ten hso-dau-ds">'+(p==='hst' ? '📝 Hồ sơ Tổ TK&amp;VV' : '📄 Hồ sơ vay')+'<button class="nho" onclick="hsoKBHop()" title="PGD, trưởng ấp, tổ phó thực tế, mục đích vay — khai 1 lần">⚙ Khai báo 1 lần</button></div>'+
    HSO_MAU[p].map(function(m){ return '<label class="to-bc-dong'+(m.k===M.k ? ' bat' : '')+'"'+(m.ghi ? ' title="'+coChuHTML(m.ghi)+'"' : '')+'><input type="radio" name="hso-mau"'+(m.k===M.k ? ' checked' : '')+' onchange="hsoChonMau(\''+m.k+'\')"> <b>'+m.ma+'</b> '+coChuHTML(m.ten)+(m.ngang ? ' <span class="th-cap">[A4 ngang]</span>' : '')+'</label>'; }).join('')+
    '<div class="hso-chu"><span class="hso-chu-sl">số liệu</span><span class="hso-chu-kb">khai báo 1 lần</span><span class="hso-chu-tay">…… ghi tay</span></div>';
}
function hsoChonMau(k){ hsoCH()[hsoTab()] = k; luu(); hsoVe(); }
function hsoKhoa(){ var S = hsoCH(); return [hsoTab(), hsoMau().k, S.to||'', TO_K ? TO_K.ky : ''].join('|'); }
function hsoVe(){
  var ds = document.getElementById('hso-ds'); if(!ds) return;
  var S = hsoCH(), t = TO_K && S.to ? TO_K.to[S.to] : null, M = hsoMau(), k = hsoKhoa();
  if(t && toLaTT(t)) t = null;
  if(HSO.khoa!==k){   /* đổi tổ / mẫu / kỳ → tích mặc định */
    var giuNgay = HSO.o.ngay; HSO = {khoa:k, kn:{}, ra:{}, tv:{}, vay:{ct:HSO.vay && HSO.vay.ct || '', md:HSO.vay && HSO.vay.md || '', chon:{}}, o:{ngay:giuNgay}};
    if(t){ var tv = hsoTVTo(t);
      tv.forEach(function(x){ if(x.vao) HSO.kn[x.kh] = true; if(!x.conNo && !x.chuaGN && !(x.t105>0)) HSO.ra[x.kh] = true; });
      if(TO_BD && TO_BD.to===t.ma && TO_BD.co) TO_BD.ra.forEach(function(r){ HSO.ra[r.kh] = true; }); }
  }
  if(t && (M.k==='10c' || M.k==='10b') && !(TO_BD && TO_BD.to===t.ma && TO_BD.ky===TO_K.ky)){ TO_BD = null; toBDNap(t).then(function(){ HSO.khoa = ''; if(document.getElementById('hso-ds')) hsoVe(); }); }
  ds.innerHTML = hsoDsHTML();
  var tu = document.getElementById('hso-tuy'); if(tu) tu.innerHTML = hsoTuyHTML(M, t);
  hsoXem();
}
function hsoXem(){
  clearTimeout(HSO_HEN);
  var f = document.getElementById('hso-xem-khung'), n = document.getElementById('hso-xem-nut'); if(!f) return;
  var x; try { x = hsoLap(); } catch(er){ f.srcdoc = '<p style="font-family:sans-serif;color:#b00">Lập mẫu lỗi: '+coChuHTML(er && er.message || er)+'</p>'; return; }
  HSO.x = x;
  if(n) n.innerHTML = xuatHang({ten:x.ten, html:function(){ return HSO.x.trang; }, word:'hsoWord()', dong:'thXemRong(\'hso-xem-khung\')', dongChu:'⤢ Phóng to'});
  xemChuan(f, x.trang); thVuaKhung();
}
function hsoHen(){ clearTimeout(HSO_HEN); HSO_HEN = setTimeout(hsoXem, 250); }
function hsoDat(nhom, k, v, ve){ HSO[nhom][k] = v; if(ve) hsoVe(); else hsoHen(); }
function hsoDatLuu(k, v){ hsoLuu()[k] = v; luu(); hsoHen(); }
function hsoTick(nhom, kh, v){ var T = nhom==='vay' ? HSO.vay.chon : HSO[nhom]; T[kh] = v; hsoHen(); var o = document.getElementById('hso-dem-'+nhom); if(o) o.textContent = Object.keys(T).filter(function(k){ return T[k]; }).length; }
function hsoDocO(){ ['ttMoi','ttCu','phoMoi','phoCu','giao','nhan'].forEach(function(k){ var e = document.getElementById('hso-o-'+k); if(e) HSO.o[k] = e.value; }); hsoHen(); }   /* ô Bên giao / nhận, bầu thay: sửa 1 ô → giữ cả nhóm */

/* ---------- cột tùy chọn của từng mẫu ---------- */
function hsoTuyO(nhan, html, ghi){ return '<label class="kt-kb hso-o"><span>'+nhan+'</span>'+html+'</label>'+(ghi ? '<div class="sl-phu">'+ghi+'</div>' : ''); }
function hsoIn(js, gt, ph, kieu, id){ return '<input'+(id ? ' id="'+id+'"' : '')+(kieu ? ' type="'+kieu+'"' : '')+' value="'+coChuHTML(gt==null ? '' : gt)+'" placeholder="'+coChuHTML(ph||'')+'" oninput="'+js+'">'; }
function hsoChon(js, gt, ops){ return '<select onchange="'+js+'">'+ops.map(function(o){ return '<option value="'+coChuHTML(o[0])+'"'+(String(o[0])===String(gt) ? ' selected' : '')+'>'+coChuHTML(o[1])+'</option>'; }).join('')+'</select>'; }
function hsoDsTick(nhom, ds, tieu, rong){
  var n = ds.filter(function(x){ return HSO[nhom][x.kh]; }).length;
  return '<details class="hso-tick"'+(ds.length && ds.length<=15 ? ' open' : '')+'><summary>'+tieu+' — <b id="hso-dem-'+nhom+'">'+n+'</b>/'+ds.length+'</summary>'+
    (ds.length ? '<div class="hso-tick-ds">'+ds.map(function(x){ return '<label><input type="checkbox"'+(HSO[nhom][x.kh] ? ' checked' : '')+' onchange="hsoTick(\''+nhom+'\',\''+x.kh+'\',this.checked)"> '+coChuHTML(x.ten)+(x.ghi ? ' <small>'+coChuHTML(x.ghi)+'</small>' : '')+'</label>'; }).join('')+'</div>' : '<div class="sl-phu">'+(rong||'Không có ai.')+'</div>')+'</details>';
}
function hsoNgayTuy(nhan, ghi){ return hsoTuyO(nhan || 'Ngày họp', hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay||'', '', 'date'), ghi || 'Để trống = chấm, ghi tay.'); }
function hsoHoiTuy(t){ var vt = hsoLuu().hoiVT; if(vt===undefined) vt = 'pct';
  return hsoTuyO('Đại diện Hội', hsoChon('hsoDatLuu(\'hoiVT\',this.value)', vt, ktInVTTen(KT_IN_VT, t ? [{t:t}] : [], vt))); }
function hsoTuyHTML(M, t){
  var S = hsoCH(), T = hsoTo(t), L = hsoLuu(), h = '<div class="nhan-nhom">Tùy chọn · '+M.ma+'</div>', can = !t && ['04td'].indexOf(M.k)<0;
  if(can) h += '<div class="sl-bao vang hso-nhac">Chọn <b>1 tổ</b> ở khối LỌC ĐỊA BÀN để app điền sẵn — chưa chọn thì khung phải là mẫu trắng (in được ngay).</div>';
  if(t && T.phoKB && T.phoMay && slChuan(T.phoMay)!==slChuan(T.pho)) h += '<div class="sl-phu hso-canh">⚠ Tổ phó theo khai báo: <b>'+coChuHTML(T.pho)+'</b> (trên máy: '+coChuHTML(T.phoMay)+')</div>';
  else if(t && !T.pho) h += '<div class="sl-phu hso-canh">Tổ chưa có tổ phó trên máy — <a href="#" onclick="event.preventDefault();hsoKBHop()">⚙ khai tổ phó thực tế</a>.</div>';
  if(t && !T.truongAp && ['10c','10a','10b'].indexOf(M.k)>=0) h += '<div class="sl-phu hso-canh">Chưa khai trưởng ấp '+coChuHTML(T.ap)+' — <a href="#" onclick="event.preventDefault();hsoKBHop()">⚙ khai báo</a>.</div>';
  var tv = hsoTVTo(t);
  if(M.k==='10c'){
    var raBD = TO_BD && t && TO_BD.to===t.ma && TO_BD.co ? TO_BD.ra : [];
    h += hsoNgayTuy('Ngày họp', 'Chọn mẫu theo ngày họp: đến 30/09/2026 mẫu cũ, từ 01/10/2026 mẫu mới (QĐ 70). Trống = chấm, mẫu theo hôm nay.')+
      hsoTuyO('Mẫu', hsoChon('hsoDatLuu(\'mau10c\',this.value)', L.mau10c || 'tu', [['tu','Tự theo ngày họp'], ['cu','Mẫu cũ (vào tổ đến 30/09/2026)'], ['moi','Mẫu mới QĐ 70 (từ 01/10/2026)']]))+hsoHoiTuy(t)+
      hsoTuyO('Tiết kiệm tối thiểu (đ)', hsoIn('hsoDatLuu(\'tkMin\',this.value)', L.tkMin||'', 'trống = chấm'))+
      (t ? hsoDsTick('kn', tv.filter(function(k){ return k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.vao.tu}; }).concat(tv.filter(function(k){ return !k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:'tổ viên hiện có'}; })), '➕ Kết nạp (mới vào tích sẵn)')+
        hsoDsTick('ra', raBD.map(function(r){ return {kh:r.kh, ten:r.ten, ghi:'đã ra khỏi tổ — '+r.di}; }).concat(tv.filter(function(k){ return !k.conNo && !k.chuaGN; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.t105>0 ? 'tất nợ, còn 105' : 'tất nợ, 105 = 0'}; })), '➖ Cho ra (ra khỏi tổ + tất nợ 105 = 0 tích sẵn)', TO_BD ? 'Không có.' : 'Đang so Mẫu 31 tháng trước…') : '');
  }
  else if(M.k==='10a'){
    h += hsoNgayTuy()+hsoHoiTuy(t)+hsoTuyO('Ngày họp định kỳ', hsoIn('hsoDatLuu(\'ngayDK\',this.value)', L.ngayDK||'', 'vd 15 hằng tháng'))+hsoTuyO('Tiết kiệm tối thiểu (đ)', hsoIn('hsoDatLuu(\'tkMin\',this.value)', L.tkMin||'', 'trống = chấm'));
    if(t){ tv.forEach(function(k){ if(HSO.tv[k.kh]===undefined) HSO.tv[k.kh] = true; }); h += hsoDsTick('tv', tv.map(function(k){ return {kh:k.kh, ten:k.ten}; }), '👥 Danh sách tổ viên in vào biên bản'); }
  }
  else if(M.k==='10b'){
    var B = t ? hsoBau(t) : {tt:'', ttCu:'', pho:'', phoCu:''};
    h += hsoNgayTuy()+hsoHoiTuy(t)+
      (t ? hsoDsTick('kn', tv.filter(function(k){ return k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten, ghi:k.vao.tu}; }).concat(tv.filter(function(k){ return !k.vao; }).map(function(k){ return {kh:k.kh, ten:k.ten}; })), '➕ Kết nạp (mới vào tích sẵn)') : '')+
      '<div class="nhan-nhom">Bầu thay Ban quản lý'+(t && hsoTruoc(t) ? ' <small>(gợi ý so Mẫu 31 tháng trước)</small>' : '')+'</div>'+
      hsoTuyO('Tổ trưởng mới', hsoIn('hsoDocO()', B.tt, 'trống = chấm', '', 'hso-o-ttMoi'))+hsoTuyO('thay Ông (Bà)', hsoIn('hsoDocO()', B.ttCu, '', '', 'hso-o-ttCu'))+
      hsoTuyO('Tổ phó mới', hsoIn('hsoDocO()', B.pho, 'trống = chấm', '', 'hso-o-phoMoi'))+hsoTuyO('thay Ông (Bà)', hsoIn('hsoDocO()', B.phoCu, '', '', 'hso-o-phoCu'));
  }
  else if(M.k==='11'){
    var K = t ? hsoTTKH(t) : {kh:''}, c = K.kh ? hsoKhach(K.kh, t) : {};
    h += hsoNgayTuy('Ngày ký', 'Trống = chấm.')+'<div class="sl-phu">Bên A (PGD) lấy ở <a href="#" onclick="event.preventDefault();hsoKBHop()">⚙ Khai báo 1 lần</a>'+(hsoPGD('daiDien') ? '' : ' — <b>chưa khai người đại diện</b>')+'.</div>'+
      (t ? '<div class="sl-phu">'+(c.cccd ? 'CCCD tổ trưởng: '+coChuHTML(c.cccd)+' — căn cứ: '+coChuHTML(K.cc) : '⚠ Chưa khớp được tổ trưởng với khách trong Mẫu 31 → số căn cước để chấm.')+'</div>' : '');
  }
  else if(M.k==='01bg' || M.k==='02bg'){
    var G = t ? hsoGiaoNhan(t) : {giao:'', nhan:''};
    h += hsoNgayTuy('Ngày lập')+hsoHoiTuy(t)+hsoTuyO('Bên giao (tổ trưởng cũ)', hsoIn('hsoDocO()', G.giao, 'trống = chấm', '', 'hso-o-giao'))+
      hsoTuyO('Bên nhận (tổ trưởng mới)', hsoIn('hsoDocO()', G.nhan, 'trống = chấm', '', 'hso-o-nhan'),
        t && hsoTruoc(t) && slChuan(hsoTruoc(t).ten)!==slChuan(T.tt) ? 'Tổ trưởng đổi so với tháng trước ('+coChuHTML(hsoTruoc(t).ten)+' → '+coChuHTML(T.tt)+') — đã điền sẵn.' : '');
    if(M.k==='02bg') h += '<label class="hso-o2"><input type="checkbox"'+(L.bgCa ? ' checked' : '')+' onchange="hsoDatLuu(\'bgCa\',this.checked)"> Gồm cả tổ viên không còn số dư (tất nợ, 105 = 0)</label>'+
      (TO_K ? '<div class="sl-phu">Số liệu đến ngày '+ngayVNsl(TO_K.ngay)+' ('+coChuHTML(TO_K.hsoTen||'')+'). Đổi kỳ ở 📅 đầu trang.</div>' : '');
  }
  else h += hsoTuyVay(M, t, tv);
  return h;
}
function hsoTuyVay(M, t, tv){
  var V = HSO.vay, h = '', cts = [['', '— chọn chương trình —']].concat(Object.keys(CT_VT_TEN).map(function(k){ return [k, CT_VT_TEN[k]+' ('+k+')']; }));
  var khach = function(chiCoNo){ var ds = tv.filter(function(k){ return !chiCoNo || k.mon.some(function(m){ return (m.dn||0)>0; }); });
    return hsoTuyO('Người vay', hsoChon('HSO.vay.kh=this.value;HSO.vay.ku=\'\';delete HSO.vay.tienGH;hsoVe()', V.kh||'', [['', t ? '— chọn tổ viên ('+ds.length+') —' : '— chọn tổ trước —'], ['moi', '✎ Khách mới (ghi tay)']].concat(ds.map(function(k){ return [k.kh, k.ten+' · '+k.kh]; })))); };
  if(M.k==='01td'){
    var md = hsoMucDich(V.ct);
    h += khach()+hsoTuyO('Chương trình', hsoChon('HSO.vay.ct=this.value;HSO.vay.md=\'\';delete HSO.vay.dt;hsoVe()', V.ct||'', cts))+
      hsoTuyO('Mục đích vay', md.length ? hsoChon('HSO.vay.md=this.value;hsoHen()', V.md||'', [['', '— chọn —']].concat(md.map(function(x){ return [x, x]; }))) : '<span class="sl-phu">chưa khai — <a href="#" onclick="event.preventDefault();hsoKBHop()">⚙ khai danh mục</a></span>')+
      hsoTuyO('Số tiền đề nghị (đ)', hsoIn('HSO.vay.tien=this.value;hsoHen()', V.tien||'', 'trống = chấm'))+hsoTuyO('Vốn tự có (đ)', hsoIn('HSO.vay.tuCo=this.value;hsoHen()', V.tuCo||'', '0'))+
      hsoTuyO('Đối tượng (bảng phương án)', hsoIn('HSO.vay.dt=this.value;hsoHen()', V.dt!==undefined ? V.dt : (/^HSSV/.test(V.ct||'') ? 'Chi phí học tập, sinh hoạt cho sinh viên' : ''), 'gợi ý theo CT, sửa được'))+
      '<div class="sl-phu">Thời hạn, kỳ hạn trả, phê duyệt: để chấm — quy tắc từng chương trình anh sẽ chốt riêng.</div>';
  }
  else if(M.k==='03td'){
    if(!V.chon) V.chon = {};
    h += hsoNgayTuy('Ngày họp bình xét')+hsoTuyO('Chương trình', hsoChon('HSO.vay.ct=this.value;hsoHen()', V.ct||'', cts))+
      (t ? '<details class="hso-tick" open><summary>👥 Tổ viên đề nghị vay — <b id="hso-dem-vay">'+Object.keys(V.chon).filter(function(k){ return V.chon[k]; }).length+'</b>/'+tv.length+'</summary><div class="hso-tick-ds">'+
        tv.map(function(k){ return '<label><input type="checkbox"'+(V.chon[k.kh] ? ' checked' : '')+' onchange="hsoTick(\'vay\',\''+k.kh+'\',this.checked)"> '+coChuHTML(k.ten)+(k.conNo ? ' <small>đang vay '+coChuHTML(k.ct)+'</small>' : '')+'</label>'; }).join('')+'</div></details>' : '')+
      '<div class="sl-phu">Chưa tích ai = danh sách trống 5 dòng. Số tiền, mục đích, thời hạn: ghi tay (chưa có hồ sơ đề nghị vay trong app).</div>';
  }
  else if(M.k==='04td'){
    var ds = hsoDiemXa();
    h += (hsoCH().xa ? '' : '<div class="sl-bao vang hso-nhac">Chọn <b>xã</b> ở khối LỌC ĐỊA BÀN — thông báo gửi UBND xã.</div>')+
      hsoTuyO('Ngày lập', hsoIn('HSO.vay.ngayLap=this.value;hsoHen()', V.ngayLap || ngayISO(nay()), '', 'date'))+
      hsoTuyO('Điểm giao dịch', hsoChon('HSO.vay.diem=this.value;delete HSO.vay.ngayPhat;hsoVe()', V.diem || hsoCH().diem || '', [['', ds.length ? '— chọn điểm —' : '— chọn xã trước —']].concat(ds.map(function(d){ return [d.k, d.ten+(d.ngay ? ' · ngày '+d.ngay : '')]; }))))+
      hsoTuyO('Số người được vay', hsoIn('HSO.vay.soNguoi=this.value;hsoHen()', V.soNguoi||'', 'trống = chấm'))+hsoTuyO('Tổng số tiền (đ)', hsoIn('HSO.vay.tien=this.value;hsoHen()', V.tien||'', 'bằng chữ tự đổi'))+
      hsoTuyO('Ngày phát tiền', hsoIn('HSO.vay.ngayPhat=this.value;hsoHen()', V.ngayPhat!==undefined ? V.ngayPhat : '', 'theo ngày GD của điểm', 'date'), 'Trống = ngày giao dịch kế tiếp của điểm (nếu biết ngày GD).')+
      hsoTuyO('Giờ phát tiền', hsoIn('HSO.vay.gio=this.value;hsoHen()', V.gio||'', 'vd 9 giờ 30 phút'));
  }
  else if(M.k==='09a'){
    var mon = hsoMonGH(t);
    h += khach(true)+(mon.length ? hsoTuyO('Món vay', hsoChon('HSO.vay.ku=this.value;delete HSO.vay.tienGH;hsoVe()', V.ku || mon[0].ku, mon.map(function(m){ return [m.ku, m.ku+' · '+ctNgan(m.ct, m)+' · '+tdnTien(m.dn)+' đ · ĐH '+ngayVNsl(skHL(m))]; }))) : '')+
      (mon.length ? hsoTuyO('Số tiền đề nghị gia hạn (đ)', hsoIn('HSO.vay.tienGH=this.value;hsoHen()', V.tienGH!==undefined ? V.tienGH : (mon.find(function(m){ return m.ku===V.ku; }) || mon[0]).dn, '')) : '')+
      hsoTuyO('Lý do chưa trả', hsoIn('HSO.vay.lyDo=this.value;hsoHen()', V.lyDo||'', 'trống = chấm'))+
      '<div class="sl-phu">Thời gian gia hạn, kế hoạch trả: để chấm — quy tắc gia hạn anh sẽ chốt riêng.</div>';
  }
  return h;
}
