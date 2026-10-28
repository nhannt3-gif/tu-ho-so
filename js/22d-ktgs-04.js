/* 3.235 (R3 — KE_HOACH_CHUAN_HOA): tách nguyên văn từ js/22-so-lieu.js (dòng 2252–2945 của bản 3.234), không đổi logic — 🛡 KTGS — Mẫu 04/BC-TH báo cáo tổng hợp kết quả kiểm tra */
/* ===================== 3.95: 📋 MẪU 04/BC-TH — BÁO CÁO TỔNG HỢP KẾT QUẢ KIỂM TRA (anh chốt) =====================
   727: chỉ lập khi kiểm tra HOẠT ĐỘNG của Tổ (Biên bản 16); lập 02 bản (01 lưu đơn vị kiểm tra, 01 gửi NHCSXH).
   - 3.98 (anh chốt, bỏ theo dõi): ① chọn xã / hội ở cây → tổ theo ấp, tích cả ấp / từng tổ (không tích sẵn), ngày tùy chọn;
     ② trong Kế hoạch 01/KH chọn tháng có lịch → tổ của tháng đó (ngày "…../mm/yyyy"). Dữ liệu cũ ktgsLS / ktgsNK / ktgsGN giữ nguyên, không dùng
   - mỗi Hội – xã 1 báo cáo (Đơn vị kiểm tra = Hội cấp xã); nhiều Hội – xã → nhiều báo cáo trong 1 file, mỗi báo cáo sang trang mới
   - app điền: Đơn vị kiểm tra, Đoàn kiểm tra (⚙ Khai báo Hội), bảng mục II (mỗi tổ 1 dòng); VI.1 số phiếu Mẫu 06 để dòng chấm (3.98);
     còn lại dòng chấm để ghi tay (I.1 đủ 4 dòng, I.2: 2, III: 4, mỗi mục IV: 3); bỏ khung "MẪU THAM KHẢO"
   - Khai báo Hội (D.cauHinh.ktHoiKB['xã|hội']): tên đơn vị, số / ngày Hợp đồng ủy thác, số / ngày Kế hoạch KTGS của Hội tỉnh, Đoàn kiểm tra, người ký
     — dùng chung cho Mẫu 04 và Kế hoạch 01/KH; ô trống → dòng chấm. Lưu máy + Drive cùng cấu hình, không vào repo. */
var KT_BC_CHON = {}, KT_BC_NGAY = {}, KT_BC_XEM = null, KT_BC_AP = [];
function ktXaChu(tenXa){ var s = String(tenXa||'').trim(); if(!s) return ''; return /^(xã|phường|thị trấn|đặc khu)\s/i.test(s) ? s.replace(/^(\S+(?:\s+trấn|\s+khu)?)/, function(a){ return a.toLowerCase(); }) : 'xã '+s; }
function ktHoiKhoa(t){ return (t.xa||'')+'|'+String(t.dv||''); }
function ktHoiKBGoc(k){ return ((D.cauHinh.ktHoiKB || {})[k]) || {}; }   /* 3.158: đúng chữ đã khai riêng cho Hội – xã */
function ktHoiKB(k){   /* 3.158 (anh chốt): số / ngày KH Hội tỉnh khai 1 lần cho mỗi Hội ở Chuẩn hóa; xã khai riêng (ngoại lệ) thì dùng của xã */
  var x = ktHoiKBGoc(k), c = (D.cauHinh.ktChuan || {})[String(k).split('|')[1]] || {};
  if((x.kh || !c.kh) && (x.khNgay || !c.khNgay)) return x;
  var r = Object.assign({}, x); if(!r.kh && c.kh) r.kh = c.kh; if(!r.khNgay && c.khNgay) r.khNgay = c.khNgay; return r;
}
function ktHoiTenTD(t){ var h = ktChuan(t).ten; return (h ? h+' ' : '')+ktXaChu(t.tenXa); }   /* tên đơn vị tự sinh: Hội … xã … (3.98: theo Bảng chuẩn hóa) */
/* ---------- 3.98: 📖 BẢNG CHUẨN HÓA HỘI – ĐOÀN (anh chốt: chữ đặc thù dùng chung mọi mẫu, sửa 1 chỗ) ----------
   Mặc định theo cách viết thông dụng của các tổ chức CT-XH (Đoàn: hướng dẫn thể thức 29-HD/TWĐTN-VP); anh sửa trong app → D.cauHinh.ktChuan[mã ĐVUT][trường].
   Riêng từng Hội – xã (⚙ Khai báo Hội): tên đơn vị in đầu trang. Hội cấp xã đều có Ban Thường vụ (anh chốt) → luôn "TM. BAN THƯỜNG VỤ".
   Quy tắc chung (không sửa): xã → ấp, phường → khu phố; trong câu viết thường; luôn "tỉnh Tây Ninh". */
var KT_CHUAN_O = [['ten','Tên trong câu'], ['gon','Tên gọn (khi thiếu chỗ)'], ['ngan','Gọi tắt trong câu'], ['tinh','Đầu trang cấp tỉnh'], ['nnTinh','Nơi nhận cấp tỉnh'], ['dauXa','Đầu trang cấp xã ({xa} = xã / phường …)'], ['tm','Ký thay mặt — dòng TM. ({xa} = XÃ / PHƯỜNG)'], ['ky','Chức danh người ký'], ['pho','Cấp phó'], ['uv','Chức danh ủy viên'], ['cap','Cấp trên (trong câu)'], ['vt','Viết tắt số văn bản'], ['kh','Số KH Hội tỉnh (chung các xã)'], ['khNgay','Ngày KH Hội tỉnh']];   /* 3.158: KH Hội tỉnh khai 1 lần / Hội */
var KT_CHUAN_PH = {kh:'vd: 06-KH/HNDT', khNgay:'dd/mm/yyyy'};
var KT_CHUAN = {
  '11':{ten:'Hội Nông dân', gon:'Hội Nông dân', ngan:'Hội', tinh:'HỘI NÔNG DÂN TỈNH TÂY NINH', nnTinh:'Hội ND tỉnh', dauXa:'HỘI NÔNG DÂN {xa}', tm:'BAN THƯỜNG VỤ', ky:'Chủ tịch', pho:'Phó Chủ tịch', uv:'Ủy viên Ban Thường vụ', cap:'Hội cấp trên', vt:'HND'},
  '12':{ten:'Hội Liên hiệp Phụ nữ', gon:'Hội LHPN', ngan:'Hội', tinh:'HỘI LHPN TỈNH TÂY NINH', nnTinh:'Hội LHPN tỉnh', dauXa:'HỘI LHPN {xa}', tm:'BAN THƯỜNG VỤ', ky:'Chủ tịch', pho:'Phó Chủ tịch', uv:'Ủy viên Ban Thường vụ', cap:'Hội cấp trên', vt:'HPN'},
  '13':{ten:'Hội Cựu chiến binh', gon:'Hội CCB', ngan:'Hội', tinh:'HỘI CỰU CHIẾN BINH TỈNH TÂY NINH', nnTinh:'Hội CCB tỉnh', dauXa:'HỘI CỰU CHIẾN BINH {xa}', tm:'BAN THƯỜNG VỤ', ky:'Chủ tịch', pho:'Phó Chủ tịch', uv:'Ủy viên Ban Thường vụ', cap:'Hội cấp trên', vt:'CCB'},
  '14':{ten:'Đoàn Thanh niên', gon:'Đoàn Thanh niên', ngan:'Đoàn', tinh:'TỈNH ĐOÀN TÂY NINH', nnTinh:'Tỉnh Đoàn', dauXa:'ĐTN {xa}', tm:'BAN THƯỜNG VỤ', ky:'Bí thư', pho:'Phó Bí thư', uv:'Ủy viên Ban Thường vụ', cap:'Đoàn cấp trên', vt:'ĐTN'}};
function ktChuanGoc(dv){ dv = String(dv||''); return KT_CHUAN[dv] || {ten:tdnHoi(dv), gon:tdnHoi(dv), ngan:'Hội', tinh:(tdnHoi(dv)+' tỉnh '+KT_TINH).toUpperCase(), nnTinh:tdnHoi(dv)+' tỉnh', dauXa:tdnHoi(dv).toUpperCase()+' {xa}', tm:'BAN THƯỜNG VỤ', ky:'Chủ tịch', pho:'Phó Chủ tịch', uv:'Ủy viên Ban Thường vụ', cap:'Hội cấp trên', vt:''}; }
function ktChuan(t){   /* chữ đặc thù của 1 Hội – xã: bảng chuẩn (đã sửa) + khai báo riêng + xã / phường */
  var dv = String(t.dv||''), g = ktChuanGoc(dv), s = (D.cauHinh.ktChuan || {})[dv] || {}, kb = t.xa ? ktHoiKB(ktHoiKhoa(t)) : {}, r = {};
  KT_CHUAN_O.forEach(function(o){ r[o[0]] = s[o[0]] || g[o[0]] || ''; });
  r.btv = true; r.ld = 'Ban Thường vụ'; r.doan = dv==='14';   /* Hội cấp xã đều có Ban Thường vụ */
  r.xa = (String(t.tenXa||'').trim().match(/^(xã|phường|thị trấn|đặc khu)\s/i) || [0, 'xã'])[1].toLowerCase(); r.ap = ktCapAp(t.tenXa);
  return r;
}
function ktDonVi(t, v, toiDa){   /* 3.98 (anh chốt): Đơn vị kiểm tra Mẫu 06 / 16 = Hội cấp xã của tổ — "Hội Nông dân xã …", "Hội Liên hiệp Phụ nữ phường …", "Đoàn Thanh niên xã …";
     viết đủ nếu đủ chỗ, quá toiDa ký tự thì tên gọn ("Hội LHPN xã …"); anh gõ ở khai báo thì dùng chữ anh gõ; gõ "-" = để dòng chấm ghi tay */
  var g = String(v && v.dv || '').trim(); if(g==='-') return ''; if(g) return g; if(!t || !t.dv || String(t.dv)==='99') return '';
  var kb = t.xa ? ktHoiKB(ktHoiKhoa(t)) : {}; if(kb.ten) return kb.ten;
  var du = ktHoiTenTD(t); if(!toiDa || du.length<=toiDa) return du;
  var c = ktChuan(t); return (c.gon || c.ten)+' '+ktXaChu(t.tenXa);
}
function ktDonVi16(t, v){   /* đầu trang Mẫu 16 (chữ in hoa, cột trái hẹp): ≤ 24 ký tự 1 dòng; dài hơn → xuống dòng trước "XÃ / PHƯỜNG …"; vẫn dài → tên gọn */
  var n = ktDonVi(t, v, 0).toUpperCase(); if(!n) return {DVA:'', DVB:''}; if(n.length<=24) return {DVA:n, DVB:''};
  var tach = function(x){ var m = x.match(/^(.*?)\s+((?:XÃ|PHƯỜNG|THỊ TRẤN|ĐẶC KHU)\s.*)$/); return m && m[1].length<=26 && m[2].length<=26 ? {DVA:m[1], DVB:m[2]} : null; };
  var r = tach(n); if(r) return r;
  var g = ktDonVi(t, v, 1).toUpperCase(); return g.length<=24 ? {DVA:g, DVB:''} : (tach(g) || {DVA:g, DVB:''});
}
function ktChuanDauXa(t){ var c = ktChuan(t); return c.dauXa.replace('{xa}', ktXaChu(t.tenXa)).toUpperCase(); }
function ktChuanHop(){ var C = ktCH(); C.che = 'hdt'; C.hdtTab = 'chuan'; luu(); try{ dongHop(); }catch(e){} if(KT_K) ktVeThe(); }   /* 3.113: thành tab nhỏ trong 🏛 Khai báo Hội đoàn thể */
function ktChuanHTML(){   /* 3.113: ô đã sửa tô xanh + ↺ từng ô; ô trống = mặc định (chữ mờ) */
  var S = D.cauHinh.ktChuan || {}, dvs = ['11','12','13','14'];
  return '<p class="ghi">Chữ đặc thù dùng chung cho Mẫu 04, 06, 16 và Kế hoạch — sửa 1 chỗ, mọi mẫu và mọi xã của Hội đó đổi theo (tên cấp tỉnh, đầu trang, chức danh…). Ô trống = mặc định (chữ mờ); ô đã sửa tô xanh, ↺ để về mặc định.</p>'+
    '<div class="to-bang-cuon"><table class="to-bang kt-chuan"><thead><tr><th>Mục</th>'+dvs.map(function(dv){ return '<th>'+coChuHTML(ktChuanGoc(dv).ten)+'</th>'; }).join('')+'</tr></thead><tbody>'+
    KT_CHUAN_O.map(function(o){ return '<tr><td>'+coChuHTML(o[1])+'</td>'+dvs.map(function(dv){ var v = (S[dv]||{})[o[0]]||'';
      return '<td><div class="kt-chuan-o"><input class="'+(v ? 'da' : '')+'" value="'+coChuHTML(v)+'" placeholder="'+coChuHTML(ktChuanGoc(dv)[o[0]] || KT_CHUAN_PH[o[0]] || '')+'" onchange="ktChuanSua(\''+dv+'\',\''+o[0]+'\',this.value);this.classList.toggle(\'da\',!!this.value.trim())" aria-label="'+coChuHTML(o[1])+'">'+
        (v ? '<button class="hkb-ve" onclick="ktChuanSua(\''+dv+'\',\''+o[0]+'\',\'\');ktVeThe()" title="Về mặc định">↺</button>' : '')+'</div></td>'; }).join('')+'</tr>'; }).join('')+
    '</tbody></table></div>'+
    '<div class="sl-phu"><b>Quy tắc chung:</b> xã → <b>ấp</b>, phường → <b>khu phố</b> (tên gõ sẵn "Ấp…", "KP…", "Khu phố…" được bỏ tiền tố rồi ghép lại) · trong câu viết thường: "khu phố Lộc Khê, phường Gia Lộc, tỉnh Tây Ninh" · quốc hiệu giữ đúng mẫu của Ngân hàng.</div>'+
    '<div class="hang-nut kt-in"><button class="nho" onclick="if(confirm(\'Trả toàn bộ bảng về mặc định?\')){delete D.cauHinh.ktChuan;luu();ktVeThe();}">↺ Cả bảng về mặc định</button></div>'+
    ktChuanRiengHTML();
}
/* 3.158 (anh chốt): ngoại lệ riêng từng xã — tên Hội cấp xã (trống = theo quy tắc "Đầu trang cấp xã") + số / ngày KH Hội tỉnh (trống = chung của Hội) */
var KT_RIENG_COT = ['ten','kh','khNgay'];
function ktChuanRiengHTML(){
  var ds = ktHoiDs(), C = ktCH(), xa0 = null, n = 0; if(!ds.length) return '';
  var dem = {}; ds.forEach(function(x){ var a = dem[x.t.xa] = dem[x.t.xa] || {h:0, to:0}; a.h++; a.to += x.n; });
  return '<h4 class="kt-rieng-dau">Riêng từng xã <small>— chỉ gõ khi xã khác quy tắc / khác KH chung của Hội'+(C.xa ? '' : ' · chọn 1 xã ở cây để gọn')+'</small></h4>'+
    '<div class="hkb-cuon"><table class="hkb-xls kt-rieng"><thead><tr><th>Hội (tổ)</th><th>Tên Hội cấp xã</th><th>Số KH Hội tỉnh</th><th>Ngày KH</th></tr></thead><tbody>'+ds.map(function(x){
      var kb = ktHoiKBGoc(x.k), c = ktChuan(x.t), id = x.k.replace(/[^0-9a-z]/gi, '_'), h = '';
      if(x.t.xa!==xa0){ xa0 = x.t.xa; h = '<tr class="hkb-nhom"><td colspan="4">'+coChuHTML(x.t.tenXa || x.t.xa)+' <small>· '+dem[xa0].h+' Hội · '+dem[xa0].to+' tổ</small></td></tr>'; }
      var ph = {ten:ktHoiTenTD(x.t), kh:c.kh || 'chung của Hội (chưa khai)', khNgay:c.khNgay || 'dd/mm/yyyy'}, r = n++;
      return h+'<tr data-k="'+coChuHTML(x.k)+'"><td class="hkb-hoi">'+coChuHTML(c.ten)+' <small>('+x.n+')</small></td>'+KT_RIENG_COT.map(function(o, cI){ var v = kb[o] || '';
        return '<td><input id="hkr-'+id+'-'+o+'" class="hkb-o hkr-o'+(ktHkbNgaySai(o, v) ? ' sai' : '')+'" data-r="'+r+'" data-c="'+cI+'" value="'+coChuHTML(v)+'" placeholder="'+coChuHTML(ph[o])+'" aria-label="'+coChuHTML(o)+'" onchange="ktHkbDoi(this,\''+x.k+'\',\''+o+'\')"></td>'; }).join('')+'</tr>';
    }).join('')+'</tbody></table></div>';
}
function ktChuanSua(dv, k, v){ var S = D.cauHinh.ktChuan = D.cauHinh.ktChuan || {}, x = S[dv] = S[dv] || {}; v = String(v||'').replace(/\s+/g, ' ').trim(); if(v) x[k] = v; else delete x[k]; if(!Object.keys(x).length) delete S[dv]; if(!Object.keys(S).length) delete D.cauHinh.ktChuan; luu(); }
function ktHoiTen(t){ var kb = ktHoiKB(ktHoiKhoa(t)); return kb.ten || ktHoiTenTD(t); }
function ktBCDs(){   /* 3.98 ① tổ trong phạm vi cây (xã / hội) — theo ấp → hội → tên; mặc định chưa tích (không còn theo dõi phiếu đã lập) */
  var C = ktCH(); if(!KT_K || !C.xa) return [];
  return Object.keys(KT_K.to).map(function(m){ return KT_K.to[m]; }).filter(function(t){ return !toLaTT(t) && String(t.dv||'')!=='99' && pvLoc(C, t); })
    .map(function(t){ return {t:t, chon:!!KT_BC_CHON[t.ma], ngay:KT_BC_NGAY[t.ma]||''}; })
    .sort(function(a, b){ return (ktKHAp(a.t)+'|'+String(a.t.dv||'')+'|'+(a.t.ten||'')).localeCompare(ktKHAp(b.t)+'|'+String(b.t.dv||'')+'|'+(b.t.ten||''), 'vi', {numeric:true}); });
}
function ktBCNhom(ds){   /* tổ đã chọn → báo cáo theo Hội – xã */
  var g = {}, thu = [];
  ds.filter(function(r){ return r.chon; }).forEach(function(r){ var k = ktHoiKhoa(r.t); if(!g[k]){ g[k] = {k:k, t:r.t, ds:[]}; thu.push(g[k]); } g[k].ds.push(r); });
  return thu.sort(function(a, b){ return ((a.t.tenXa||'')+'|'+a.t.dv).localeCompare((b.t.tenXa||'')+'|'+b.t.dv, 'vi'); });
}
function ktBCVe(o){ var th = ktNguonThangKT(); return ktNguonVe(o, th, function(){ ktBCVeG(o, th); }); }   /* 3.328: Mẫu 04 theo tháng kiểm tra (số liệu cuối tháng liền trước) */
function ktBCVeG(o, th){   /* 3.98 ①: chọn xã / hội ở cây → tổ chia nhóm theo ấp; tích cả ấp hoặc từng tổ; ngày nhập tùy chọn (chỉ cho lần in này) */
  var C = ktCH(), ds = ktBCDs(), nh = ktBCNhom(ds);
  var h = ktCheDoHTML()+ktAThangHTML(th)+'<div class="kt-gn-dau"><span class="sl-phu">Phạm vi: <b>'+coChuHTML(pvChu(C, KT_K))+'</b> — chọn xã (hoặc hội) ở cây, tích cả ấp hoặc từng tổ. Lập theo tháng của kế hoạch: thẻ 🗓 Lịch năm.</span></div>';
  if(!C.xa){ o.innerHTML = h+'<div class="rong">Chọn <b>xã</b> (hoặc hội) ở cây phía trên để chọn ấp / tổ lập Mẫu 04.</div>'+ktBCGhi(); return; }
  if(!ds.length){ o.innerHTML = h+'<div class="rong">Không có tổ trong phạm vi đã chọn.</div>'; return; }
  var soChon = ds.filter(function(r){ return r.chon; }).length;
  h += ktBCTheoKHHTML(ds);   /* 3.123 */
  h += '<div class="to-the-so">Đã chọn <b>'+soChon+'</b>/'+ds.length+' tổ → <b>'+nh.length+'</b> báo cáo (mỗi Hội – xã 1 báo cáo)</div>';
  h += '<div class="to-bang-cuon"><table class="to-bang kt-bc-bang"><thead><tr><th>Chọn</th><th>Ấp / Tổ (mã)</th><th>Xã</th><th>Hội</th><th>Ngày kiểm tra (tùy chọn)</th></tr></thead><tbody>';
  KT_BC_AP = []; var apTruoc = null;
  ds.forEach(function(r){ var t = r.t, m = t.ma, ap = ktKHAp(t);
    if(ap!==apTruoc){ apTruoc = ap; KT_BC_AP.push(ap); var cua = ds.filter(function(x){ return ktKHAp(x.t)===ap; }), nc = cua.filter(function(x){ return x.chon; }).length;
      h += '<tr class="kt-kh-ap"><td class="c"><input type="checkbox"'+(nc===cua.length ? ' checked' : '')+' onchange="ktBCTichAp('+(KT_BC_AP.length-1)+',this.checked)" aria-label="Chọn cả ấp"></td><td colspan="4"><b>'+coChuHTML(ap)+'</b> <small>('+nc+'/'+cua.length+' tổ)</small></td></tr>'; }
    h += '<tr class="'+(r.chon ? 'kt-co' : 'kt-loai')+'"><td class="c"><input type="checkbox"'+(r.chon ? ' checked' : '')+' onchange="ktBCTich(\''+m+'\',this.checked)" aria-label="Chọn tổ"></td>'+
      '<td class="to-ten">&nbsp;&nbsp;<b>'+coChuHTML(t.ten||'Tổ '+m)+'</b> ('+m+')</td><td>'+coChuHTML(t.tenXa||'')+'</td><td>'+coChuHTML(tdnHoi(t.dv))+'</td>'+
      '<td><input type="date" value="'+coChuHTML(r.ngay)+'" onchange="ktBCNgay(\''+m+'\',this.value)" aria-label="Ngày kiểm tra"></td></tr>'; });
  h += '</tbody></table></div>';
  h += ktHdtNhac(ktHoiDs(), ['pct'])+   /* 3.113: khai ở 🏛 Khai báo Hội đoàn thể */   /* 3.106: Đoàn kiểm tra Mẫu 04 = cán bộ kiểm tra 06 / 16 */
    '<div class="hang-nut kt-in"><button class="nho chinh" onclick="ktBCXem()"'+(nh.length ? '' : ' disabled')+'>👁 Xem '+nh.length+' báo cáo Mẫu 04</button></div>'+ktBCGhi();
  o.innerHTML = h;
}
function ktBCKH(){   /* 3.123: kế hoạch đã lưu của xã đang chọn (năm kế hoạch) → [{k, dv, to:{mã: tháng}}]; chọn hội ở cây → chỉ hội đó */
  var C = ktCH(), S = D.cauHinh.ktKH || {}, nam = String(ktKHNam()); if(!C.xa) return [];
  return Object.keys(S).filter(function(k){ var p = k.split('|'); return p[0]===nam && p[1]===String(C.xa) && (!C.hoi || p[2]===String(C.hoi)) && S[k] && !S[k].xoa && S[k].to; })
    .map(function(k){ return {k:k, dv:k.split('|')[2], to:(typeof ktKHBanDung==='function' ? ktKHBanDung(S[k]) : S[k]).to || {}}; });   /* 3.398: bản chốt mới nhất */
}
function ktBCTheoKHHTML(ds){   /* 3.123 (anh chốt): hàng "Theo kế hoạch" — bấm tháng = tích sẵn các tổ của tháng đó (anh vẫn sửa) */
  var kh = ktBCKH(); if(!kh.length) return ''; var nam = ktKHNam(), thNay = nay().getFullYear()===nam ? nay().getMonth()+1 : 0;
  return kh.map(function(x){ var dem = {}, t0 = ds.filter(function(r){ return String(r.t.dv)===x.dv; })[0];
    Object.keys(x.to).forEach(function(ma){ var m = +x.to[ma]; if(m) dem[m] = (dem[m]||0)+1; });
    return '<div class="kt-che kt-bc-kh"><span class="sl-phu">📅 Theo kế hoạch '+nam+' · <b>'+coChuHTML(t0 ? ktHoiTenTD(t0.t) : tdnHoi(x.dv))+'</b>:</span>'+
      Object.keys(dem).map(Number).sort(function(a, b){ return a-b; }).map(function(m){ return '<button class="to-loc'+(m===thNay ? ' bat' : '')+'" onclick="ktBCTheoKH(\''+x.k+'\','+m+')" title="Tích sẵn các tổ có lịch tháng '+m+'">T'+m+' · '+dem[m]+' tổ</button>'; }).join('')+'</div>'; }).join('');
}
function ktBCTheoKH(k, m){ var S = (D.cauHinh.ktKH || {})[k]; if(S && typeof ktKHBanDung==='function') S = ktKHBanDung(S); if(!S || !S.to) return;   /* 3.398: bản chốt mới nhất */ var ds = ktBCDs(), co = {}, mat = 0;
  ds.forEach(function(r){ co[r.t.ma] = 1; }); KT_BC_CHON = {};
  Object.keys(S.to).forEach(function(ma){ if(+S.to[ma]!==m) return; if(co[ma]) KT_BC_CHON[ma] = true; else mat++; });
  ktVeThe(); bao('Đã tích '+Object.keys(KT_BC_CHON).length+' tổ có lịch tháng '+m+(mat ? ' · '+mat+' tổ không còn trong số liệu (không tích)' : '')+'.', 5);
}
function ktBCGhi(){ return '<p class="ghi">App điền: Đơn vị kiểm tra, Đoàn kiểm tra (Phó Chủ tịch theo 🏛 Khai báo Hội đoàn thể), bảng mục II (mỗi tổ 1 dòng: ngày · Tổ TK&amp;VV · Tây Ninh, xã / phường, ấp / khu phố). '+
  'Ngày để trống = dòng chấm; số phiếu Mẫu 06 ở mục VI và các phần còn lại để dòng chấm ghi tay; xuất Word để sửa. App không theo dõi phiếu đã lập.</p>'; }
function ktBCTich(m, v){ KT_BC_CHON[m] = !!v; ktVeThe(); }
function ktBCTichAp(i, v){ var ap = KT_BC_AP[i]; ktBCDs().forEach(function(r){ if(ktKHAp(r.t)===ap) KT_BC_CHON[r.t.ma] = !!v; }); ktVeThe(); }
function ktBCNgay(m, v){ if(v) KT_BC_NGAY[m] = v; else delete KT_BC_NGAY[m]; ktVeThe(); }
function ktBC04(ds, th, v){ v = v || ktInV('m04');   /* 3.114: v = lựa chọn in (nhận xét, người kiểm tra 1 / 2) */   /* ds = [{t, ngay}] → mỗi Hội – xã 1 báo cáo {k, ten, f:{DV, SP}, doan, rows:[{C1..C4}]}; th = tháng kế hoạch (ngày "…../mm/yyyy") */
  return ktBCNhom(ds.map(function(r){ return {t:r.t, ngay:r.ngay||'', chon:true}; })).map(function(g){
    var kb = ktHoiKB(g.k);
    var rows = g.ds.sort(function(a, b){ return (a.ngay||'9').localeCompare(b.ngay||'9') || (ktKHAp(a.t)+'|'+(a.t.ten||'')).localeCompare(ktKHAp(b.t)+'|'+(b.t.ten||''), 'vi', {numeric:true}); }).map(function(r, i){
      var t = r.t, thg = r.ngay ? String(r.ngay).slice(0, 7) : (th || ktThangKT());   /* 3.106 (anh chốt): chỉ ghi tháng, mặc định tháng sau tháng số liệu */
      return {ngay:r.ngay||'', C1:String(i+1), C2:thg ? 'Tháng '+thg.slice(5, 7)+'/'+thg.slice(0, 4) : '', C3:'Tổ TK&VV '+(t.ten||t.ma)+(t.ten ? ' (mã '+t.ma+')' : ''), C4:ktDiaDiem04(t), t:t};
    });
    var thg = th || rows.reduce(function(a, r){ var m = r.ngay ? String(r.ngay).slice(0, 7) : ''; return m>a ? m : a; }, '') || ktThangKT();   /* 3.109: dòng ngày đầu báo cáo theo tháng kiểm tra */
    var bc = {k:g.k, ten:ktHoiTen(g.t), f:Object.assign(ktDV04(ktHoiTen(g.t).toUpperCase()), {SP:'', NOI04:ktXaTen(g.t.tenXa), TH04:thg ? thg.slice(5, 7) : '', NAM04:thg ? thg.slice(0, 4) : '', NN04:ktNoiNhanNH()}),
      doan:ktDoan04(g.t, v), nx:!ktNxCo(v, 'to') ? [] : rows.map(function(x){ return ktNxTo04(x.t, g.t); }), nd:KT_ND04.slice(), rows:rows};
    bc.f.TD04 = ktNguoi(g.t, v.ng1).cb;   /* 3.114: tên người 1 dưới TRƯỞNG ĐOÀN KIỂM TRA */
    bc.kn = !ktNxCo(v, 'kn') ? {a:[], b:[], c:[]} : ktKN04(bc);   /* 3.378: Nhận xét / Kiến nghị chọn riêng */ return bc;
  });
}
function ktLaiThang(m){ var ls = +m.ls || 0; if(!ls) return 0; return (m.dn||0)*(ls>2 ? ls/1200 : ls/100); }   /* 3.109: lãi 1 tháng của món — cột Lãi suất (%/năm; ≤ 2 coi là %/tháng) */
var KT_DS_TOI = 10;   /* 3.109 (anh chốt): mỗi tổ liệt kê tối đa 10 hộ */
function ktDsDon(t){   /* 3.109: hộ cần đôn đốc của 1 tổ — món không giao dịch từ 3 tháng, lãi tồn > 6 tháng lãi (không tính lãi tồn ân hạn); coLS = có lãi suất để xét */
  var r = {khd:[], ltc:[], qh:[], kn:[], nLT:0, lt:0, coLS:false}, hs = [];   /* 3.114: + hộ nợ quá hạn, nợ khoanh */
  try { hs = ktHo(t); } catch(e){ return r; }
  hs.forEach(function(h){
    if(h.khd.length) r.khd.push({ten:tenHoaDau(h.ten), dn:h.khd.reduce(function(a, m){ return a+(m.dn||0); }, 0), n:h.khd.length});
    if(h.lt>0){ r.nLT++; r.lt += h.lt; }
    if(h.qh>0) r.qh.push({ten:tenHoaDau(h.ten), tien:h.qh}); if(h.kn>0) r.kn.push({ten:tenHoaDau(h.ten), tien:h.kn});
    var th = 0; h.mon.forEach(function(m){ var l = laiTon(m), lm = ktLaiThang(m); if(lm>0) r.coLS = true; if(l>0 && lm>0 && l>6*lm) th = Math.max(th, l/lm); });
    if(th) r.ltc.push({ten:tenHoaDau(h.ten), lt:h.lt, th:Math.floor(th)});   /* 3.111: tên người vay hoa đầu từ trên mẫu in */
  });
  r.ltc.sort(function(a, b){ return b.lt-a.lt; }); r.qh.sort(function(a, b){ return b.tien-a.tien; }); r.kn.sort(function(a, b){ return b.tien-a.tien; });
  return r;
}
function ktDsChu(L, f){ var a = L.slice(0, KT_DS_TOI).map(f); return a.join('; ')+(L.length>KT_DS_TOI ? ' và '+(L.length-KT_DS_TOI)+' hộ khác' : ''); }
function ktDsQH(L){ return ktDsChu(L, function(x){ return x.ten+' (quá hạn '+ktTr(x.tien, 2)+' triệu đồng)'; }); }   /* 3.114 */
function ktDsKN(L){ return ktDsChu(L, function(x){ return x.ten+' (nợ khoanh '+ktTr(x.tien, 2)+' triệu đồng)'; }); }
function ktDsTen(L){ return ktDsChu(L, function(x){ return x.ten; }); }
/* 3.134 (anh chốt): tính vẫn theo số tháng (không giao dịch từ 3 tháng, lãi tồn > 6 tháng lãi) để phân nặng nhẹ; hành văn nhóm chung "Món vay không có giao dịch từ 3 tháng trở lên, lãi tồn cao" */
function ktDsGop(d){
  var m = {}, ds = [], lay = function(ten){ if(!m[ten]){ m[ten] = {ten:ten, dn:0, n:0, lt:0, th:0}; ds.push(m[ten]); } return m[ten]; };
  d.khd.forEach(function(x){ var o = lay(x.ten); o.dn = x.dn; o.n = x.n; });
  d.ltc.forEach(function(x){ var o = lay(x.ten); o.lt = x.lt; o.th = x.th; });
  return ds.sort(function(a, b){ return ((b.n ? 1 : 0)+(b.lt ? 1 : 0))-((a.n ? 1 : 0)+(a.lt ? 1 : 0)) || b.th-a.th || b.dn-a.dn; });   /* nặng trước: vừa không giao dịch vừa lãi tồn cao, rồi nhiều tháng lãi */
}
function ktDsGopChu(L){ return ktDsChu(L, function(x){ return x.ten+' ('+[x.n ? 'dư nợ '+ktTr(x.dn, 2)+' triệu đồng'+(x.n>1 ? ', '+x.n+' món' : '') : '', x.lt ? 'lãi tồn '+tdnTien(x.lt)+' đồng' : ''].filter(Boolean).join('; ')+')'; }); }
var KT_ND04 = ['1. Kiểm tra hoạt động của Tổ TK&VV và Ban quản lý Tổ: việc thành lập, kiện toàn Tổ; thực hiện các nhiệm vụ theo Hợp đồng ủy nhiệm (sinh hoạt Tổ, bình xét cho vay, đôn đốc trả nợ, thu lãi, lưu giữ hồ sơ) theo khoản 3 Phụ lục I văn bản số 727/HD-NHCS.',
  '2. Kiểm tra việc sử dụng vốn vay, đối chiếu dư nợ, lãi tồn, tiền gửi tiết kiệm đến hộ vay (Phiếu mẫu 06/TD).'];   /* 3.109 (anh duyệt): III. Nội dung kiểm tra Mẫu 04 */
function ktKN04(g){   /* 3.109: IV.2 kiến nghị a) b) c) — ghi nhẹ nhàng, liệt kê hộ cần đôn đốc theo từng tổ */
  var b = [], co = false;
  g.rows.forEach(function(r){ var d = ktDsDon(r.t); if(!d.khd.length && !d.ltc.length && !d.qh.length && !d.kn.length) return; co = true;   /* 3.114: + nợ quá hạn, nợ khoanh */
    var ten = 'Tổ TK&VV '+(r.t.ten||r.t.ma)+(ktKHAp(r.t) && String(r.t.ten||'').indexOf(ktKHAp(r.t))<0 ? ' ('+ktKHAp(r.t)+')' : '');
    b.push('- '+ten+': đề nghị Ban quản lý Tổ phối hợp đôn đốc các hộ:');
    if(d.khd.length || d.ltc.length) b.push('+ Món vay không có giao dịch từ 3 tháng trở lên, lãi tồn cao: '+ktDsGopChu(ktDsGop(d))+'.');   /* 3.134: nhóm chung */
    if(d.qh.length) b.push('+ Có nợ quá hạn (xây dựng kế hoạch trả nợ, trả dần; hộ khó khăn thì xác minh nguyên nhân, đề xuất xử lý theo quy định): '+ktDsQH(d.qh)+'.');
    if(d.kn.length) b.push('+ Có nợ khoanh (động viên trả nợ khi có điều kiện; rà soát hồ sơ, đề nghị xử lý theo quy định): '+ktDsKN(d.kn)+'.'); });
  return {a:[co ? '- Chỉ đạo Ban quản lý các Tổ TK&VV phối hợp đôn đốc tổ viên trả lãi đúng kỳ; rà soát, xử lý các món vay không có giao dịch từ 3 tháng trở lên, các hộ còn lãi tồn cao, nợ quá hạn, nợ khoanh nêu tại điểm b.'
             : '- Tiếp tục chỉ đạo các Tổ TK&VV duy trì sinh hoạt định kỳ, đôn đốc tổ viên trả nợ, trả lãi đúng kỳ.'],
    b:co ? b : ['- Duy trì sinh hoạt Tổ định kỳ, đôn đốc tổ viên trả nợ, trả lãi đúng kỳ.'],
    c:['- Sử dụng vốn vay đúng mục đích, trả lãi hằng tháng đúng kỳ, trả nợ gốc đúng hạn; tham gia gửi tiết kiệm thường xuyên.']};
}
function ktThangKT(){ var m = KT_K && KT_K.thang; if(!m) return ''; var y = +m.slice(0, 4), t = +m.slice(5, 7)+1; if(t>12){ t = 1; y++; } return y+'-'+hai(t); }   /* số liệu tháng 9 → kiểm tra tháng 10 */
function ktDiaDiem04(t){   /* 3.106: ấp → xã → tỉnh; dài quá 40 ký tự thì bỏ tỉnh */
  var a = [ktApChu(t.tenThon, t.tenXa, 1), ktXaChu(t.tenXa)].filter(Boolean), d = a.concat(['tỉnh '+KT_TINH]).join(', ');
  return d.length>40 && a.length ? a.join(', ') : d;
}
function ktDoan04(t, v){   /* 3.114: Đoàn kiểm tra = người kiểm tra 1 / 2 chọn khi in (vai trò → tên theo Hội); người 2 để trống thì dùng ô gõ tay */
  v = v || ktInV('m04'); var ds = [];
  [v.ng1, v.ng2].forEach(function(vt){ if(vt) ds.push(ktNguoi(t, vt)); });
  if(!v.ng2 && v.cb2) ds.push({cb:v.cb2, cv:v.cv2||''});
  return ds.map(function(x){ return {cb:x.cb, cv:ktCVGon(x.cv, 3543, 27)}; });   /* 3.118: chức vụ dài → viết tắt cho đủ dòng */
}
function ktNxTo04(t, t0){   /* 3.106: nhận xét chung từng tổ theo số liệu (văn bản 727) — gộp tình hình như Mẫu 16, đề nghị nhẹ nhàng */
  var s = ktSoTo(t), tr = function(x){ return ktTr(x, 2)+' triệu đồng'; }, nQH = 0, khd = 0;
  try { toKhach(t).forEach(function(k){ if(k.qh>0) nQH++; }); } catch(e){}
  try { ktHo(t).forEach(function(h){ khd += h.khd.length; }); } catch(e){}
  var ten = 'Tổ TK&VV '+(t.ten||t.ma)+(ktKHAp(t) && String(t.ten||'').indexOf(ktKHAp(t))<0 ? ' ('+ktKHAp(t)+')' : ''), tt = [];
  if(s.qh) tt.push('nợ quá hạn '+tr(s.qh)+(nQH ? ' ('+(nQH<10 ? '0' : '')+nQH+' tổ viên)' : ''));
  if(s.kn) tt.push('nợ khoanh '+tr(s.kn));
  if(khd) tt.push((khd<10 ? '0' : '')+khd+' món vay không có giao dịch từ 3 tháng trở lên');
  var d = ktDsDon(t); if(d.nLT) tt.push((d.nLT<10 ? '0' : '')+d.nLT+' tổ viên còn lãi tồn '+tdnTien(d.lt)+' đồng'+(d.ltc.length ? ', trong đó '+(d.ltc.length<10 ? '0' : '')+d.ltc.length+' hộ lãi tồn cao' : ''));   /* 3.109 */
  if(!tt.length) return '- '+ten+': dư nợ '+tr(s.dn)+', không phát sinh nợ quá hạn, nợ khoanh, lãi tồn.';
  return '- '+ten+': dư nợ '+tr(s.dn)+'; '+tt.join('; ')+'. Đề nghị Ban quản lý Tổ phối hợp '+ktHoiTen(t0||t)+' đôn đốc, có kế hoạch xử lý.';
}
function ktBCGiaTri(){ var th = ktNguonThangKT(); return ktNguonVoi(th, function(){ return ktBC04(ktBCDs().filter(function(r){ return r.chon; })); }); }   /* 3.328 */
function ktBCXem(ok){ return ktNguonVoi(ktNguonThangKT(), function(){ return ktBCXemG(ok); }); }   /* 3.328 */
function ktBCXemG(ok){
  if(!ok){ if(!ktBCDs().some(function(r){ return r.chon; })) return bao('Chưa chọn tổ nào.', 3); return ktInHop(['m04'], ktInNutXem('ktBCXem(1)'), ktHoiCuaTo(ktBCDs().filter(function(r){ return r.chon; }).map(function(r){ return r.t; }))); }   /* 3.114 */
  var gts = ktBCGiaTri(); if(!gts.length) return bao('Chưa chọn tổ nào.', 3);
  KT_BC_XEM = {gts:gts, tenFile:'Mau 04 Bao cao tong hop KT - '+boDauTen(gts.length>1 ? gts.length+' bao cao' : gts[0].ten).slice(0, 60)};
  ktBCHop('');
}
function ktBCHop(tit){   /* hộp xem trước Mẫu 04 dùng chung ① (cây) và ② (theo tháng kế hoạch) */
  var gts = KT_BC_XEM.gts;
  moHop('<div class="hop-tit">👁 Mẫu 04/BC-TH · Báo cáo tổng hợp'+(tit ? ' '+coChuHTML(tit) : '')+' — '+gts.length+' báo cáo</div>'+
    '<div class="hop-phu">'+gts.map(function(g){ return coChuHTML(g.ten)+(g.nhan ? ' ('+coChuHTML(g.nhan)+')' : '')+': '+g.rows.length+' tổ'; }).join(' · ')+' — Đoàn kiểm tra theo người kiểm tra đã chọn + 2 dòng ghi tay; tháng kiểm tra = tháng sau tháng số liệu.</div>'+
    '<iframe id="kt-bc-khung" class="to-khung" title="Xem trước"></iframe>'+
    xuatHang({truoc:'<button class="nho" onclick="dongHop();'+(KT_BC_XEM.tu==='kh' ? 'ktKH04Xem()' : KT_BC_XEM.tu==='dx' ? 'ktDX04()' : 'ktBCXem()')+'">‹ Đổi lựa chọn in</button>', html:function(){ return ktHTML04(KT_BC_XEM.gts); }, in:'ktBCIn(\'in\')', pdf:'ktBCIn(\'pdf\')', word:'ktBCIn(\'word\')'}), true);   /* 3.152 */
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
  var f = document.getElementById('kt-bc-khung'); xemChuan(f, ktHTML04(gts));
}
function ktBCIn(cach){
  var X = KT_BC_XEM; if(!X || !X.gts.length) return;
  var ten = X.tenFile;
  dongHop();
  if(cach==='word') return ktDocx('m04', X.gts).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx'+(X.gts.length>1 ? ' ('+X.gts.length+' báo cáo, mỗi báo cáo 1 trang mới)' : '')+' — khuôn đúng mẫu gốc, chỉ lưu trên máy / Drive của anh.', 7); })
    .catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  if(cach==='pdf') return inPDF(ktHTML04(X.gts), ten);   /* 3.152 */
  inBlob(new Blob([ktHTML04(X.gts)], {type:'text/html'}), ten+'.html');
}
/* 3.138 (anh chốt): Mẫu 04 (Hội cấp xã kiểm tra Tổ TK&VV) — kiến nghị 2d, 2đ, 3a, 3b tùy chọn: mặc định KHÔNG in (1 dòng chấm để gọn báo cáo);
   tích → in câu gợi ý (sửa được, app nhớ câu đã sửa) */
var KT_KN04 = [['d', '2d) Đoàn kiểm tra → NHCSXH', 'Tiếp tục phối hợp với Hội cấp xã tập huấn nghiệp vụ cho Ban quản lý Tổ TK&VV; bố trí nguồn vốn kịp thời, đáp ứng nhu cầu vay vốn của hội viên.'],
  ['dd', '2đ) Đoàn kiểm tra → tổ chức CT-XH cấp trên', 'Tiếp tục quan tâm chỉ đạo, hướng dẫn nghiệp vụ, tạo điều kiện thuận lợi để Hội cấp xã hoàn thành tốt nhiệm vụ nhận ủy thác.'],
  ['a3', '3a) Tổ TK&VV → NHCSXH', 'Đề nghị NHCSXH tiếp tục bố trí nguồn vốn kịp thời, đáp ứng nhu cầu vay vốn của tổ viên; tạo điều kiện thuận lợi cho tổ viên trả nợ, trả lãi.'],
  ['b3', '3b) Tổ TK&VV → tổ chức CT-XH cấp trên', 'Đề nghị Hội cấp xã tiếp tục quan tâm, hướng dẫn, hỗ trợ Ban quản lý Tổ trong đôn đốc thu lãi, thu nợ và củng cố hoạt động của Tổ.']];
function ktKNIn04(){ var S = D.cauHinh.ktKN04 || {}, r = {}; KT_KN04.forEach(function(x){ var v = S[x[0]] || {}; r[x[0]] = v.bat ? (String(v.chu||'').trim() || x[2]) : ''; }); return r; }
function ktKN04HTML(){
  var S = D.cauHinh.ktKN04 || {};
  return '<details class="kt-in-khac" open><summary>Mẫu 04 · Kiến nghị 2d, 2đ, 3a, 3b — không tích = 1 dòng chấm (gọn báo cáo)</summary>'+KT_KN04.map(function(x){ var v = S[x[0]] || {};
    return '<div class="kt-kn04"><label><input type="checkbox"'+(v.bat ? ' checked' : '')+' onchange="ktKN04Doi(\''+x[0]+'\',this.checked)"> In kiến nghị '+coChuHTML(x[1])+'</label>'+
      (v.bat ? '<textarea rows="2" style="width:100%" onchange="ktKN04Chu(\''+x[0]+'\',this.value)">'+coChuHTML(String(v.chu||'').trim() || x[2])+'</textarea>'+(v.chu && String(v.chu).trim()!==x[2] ? '<button class="nho" onclick="ktKN04Chu(\''+x[0]+'\',\'\',1)">↺ Về câu gợi ý</button>' : '') : '')+'</div>'; }).join('')+'</details>';
}
function ktKN04Doi(k, bat){ var S = D.cauHinh.ktKN04 = D.cauHinh.ktKN04 || {}; S[k] = S[k] || {}; S[k].bat = bat ? 1 : 0; luu(); if(KT_IN_X){ if(KT_IN_X.tab) ktVeThe(); else ktInHop(KT_IN_X.ds, KT_IN_X.nut, KT_IN_X.hoi, 0, 1); } }   /* 3.329: + màn Bộ khai báo */
function ktKN04Chu(k, v, ve){ var S = D.cauHinh.ktKN04 = D.cauHinh.ktKN04 || {}; S[k] = S[k] || {}; var g = (KT_KN04.find(function(x){ return x[0]===k; }) || [])[2]; v = String(v||'').replace(/\s+/g, ' ').trim();
  if(v && v!==g) S[k].chu = v; else delete S[k].chu; luu(); if(ve && KT_IN_X){ if(KT_IN_X.tab) ktVeThe(); else ktInHop(KT_IN_X.ds, KT_IN_X.nut, KT_IN_X.hoi, 0, 1); } }
function ktGach04(x){   /* gạch dưới tên đơn vị (ô trái đầu trang) + Trưởng đoàn: chức danh và tên cùng 1 điểm canh giữa */
  x = x.replace(/w:ascii="Times New Roman Bold" w:hAnsi="Times New Roman Bold"/g, 'w:ascii="Times New Roman" w:hAnsi="Times New Roman"');
  x = ktGachSau(x, '', 0.4, 3341, 'CỘNG HO');
  var i = x.indexOf('Nơi nhận:'), a = i>=0 ? ktDauP(x, i) : -1, e = a>=0 ? x.indexOf('</w:p>', a)+6 : -1;
  if(a>=0 && x.slice(a, e).indexOf('OÀN KIỂM TRA')>0){
    var p = x.slice(a, e), rT = ((p.match(/<w:r>(<w:rPr>(?:(?!<\/w:rPr>)[\s\S])*<\/w:rPr>)<w:t>TRƯỞNG Đ<\/w:t><\/w:r>/) || [])[1]) || '<w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr>';
    var nn = (p.match(/<w:r>(?:(?!<w:r>)[\s\S])*?Nơi nhận:<\/w:t><\/w:r>/) || [''])[0], pp = (p.match(/<w:pPr>[\s\S]*?<\/w:pPr>/) || ['<w:pPr></w:pPr>'])[0];
    pp = pp.replace(/<w:tabs>[\s\S]*?<\/w:tabs>/, '').replace(/^<w:pPr>(<w:keepNext\/>)?/, function(m){ return m+'<w:tabs><w:tab w:val="center" w:pos="'+KT04_TD+'"/></w:tabs>'; });
    x = x.slice(0, a)+'<w:p>'+pp+nn+'<w:r>'+rT+'<w:tab/></w:r><w:r>'+rT+'<w:t>TRƯỞNG ĐOÀN KIỂM TRA</w:t></w:r></w:p>'+x.slice(e);
  }
  return x;
}
var KT04_TD = 6900;   /* điểm canh giữa khối Trưởng đoàn (twip từ lề trái) */
function ktBung04(K, g){   /* khuôn Mẫu 04: bung dòng Đoàn kiểm tra, dòng chấm, dòng bảng mục II rồi điền dấu {{…}} */
  var cham = function(n){ return Array(n+1).join(K.cham); };
  /* 3.106: Đoàn kiểm tra "- Ông (bà): … ⇥ Chức vụ: …" (như Mẫu 06 / 16) + 2 dòng in sẵn để ghi tay */
  var rp = '<w:rPr><w:sz w:val="27"/><w:szCs w:val="27"/></w:rPr>', ru = function(x){ return '<w:r>'+rp+'<w:t xml:space="preserve">'+xmlEsc(x)+'</w:t></w:r>'; }, tab = '<w:r>'+rp+'<w:tab/></w:r>';
  var pp = function(cham){ return '<w:pPr><w:tabs><w:tab w:val="left"'+(cham ? ' w:leader="dot"' : '')+' w:pos="5670"/>'+(cham ? '<w:tab w:val="right" w:leader="dot" w:pos="9213"/>' : '')+'</w:tabs><w:spacing w:before="60" w:after="60" w:line="320" w:lineRule="exact"/><w:ind w:firstLine="567"/>'+rp+'</w:pPr>'; };
  var doan = (g.doan||[]).map(function(x){ return x.cb ? '<w:p>'+pp(false)+ru('- Ông (bà): '+x.cb)+tab+ru('Chức vụ: '+(x.cv||''))+'</w:p>'
      : '<w:p>'+pp(true)+ru('- Ông (bà): ')+tab+ru(' Chức vụ: '+(x.cv||''))+(x.cv ? '' : tab)+'</w:p>'; }).join('')+   /* 3.114: vai trò chưa khai tên → tên dòng chấm */
    Array(3).join('<w:p>'+pp(true)+ru('- Ông (bà): ')+tab+ru(' Chức vụ: ')+tab+'</w:p>');
  var nx = (g.nx||[]).length ? g.nx.map(function(s){ return ktDien(K.chu, {X:s}); }).join('') : cham(3);
  var doanC = function(L, n){ return (L||[]).length ? L.map(function(s){ return ktDien(K.chu, {X:s}); }).join('') : cham(n); }, kn = g.kn || {};   /* 3.109: III nội dung + IV.2 a) b) c) */
  var R = g.rows.length ? g.rows : [{}, {}], KN = ktKNIn04(), th = K.than;
  var cKN = function(v){ return v ? ktDien(K.chu, {X:v}) : cham(1); };
  var dat = function(x, tu, v){ var i = x.indexOf('{{@CHAM3}}', tu); return i<0 ? x : x.slice(0, i)+'{{@KN'+v+'}}'+x.slice(i+10); };   /* 3.138: 2d, 2đ, 3a, 3b tùy chọn */
  var i3 = th.indexOf('. Kiến nghị của Đơn vị được kiểm tra');
  if(i3>0){ th = dat(th, th.indexOf('d) Đối với NHCSXH'), 'd'); th = dat(th, th.indexOf('đ) Đối với tổ chức CT-XH cấp trên'), 'dd'); i3 = th.indexOf('. Kiến nghị của Đơn vị được kiểm tra'); th = dat(th, i3, 'a3'); th = dat(th, i3, 'b3');
    ['d','dd','a3','b3'].forEach(function(k){ th = th.replace('{{@KN'+k+'}}', function(){ return cKN(KN[k]); }); }); }
  var x = ktDien(th.replace('{{@DOAN}}', doan).replace('{{@NXTO}}', nx).replace('{{@ND}}', doanC(g.nd, 2)).replace('{{@KNA}}', doanC(kn.a, 3)).replace('{{@KNB}}', doanC(kn.b, 3)).replace('{{@KNC}}', doanC(kn.c, 3)).replace(/\{\{@CHA[M]([0-9])\}\}/g, function(m, n){ return cham(+n); })
    .replace('{{@DONG}}', R.map(function(r){ return ktDien(K.dong, r); }).join('')), g.f);
  if(g.f.TD04){   /* 3.114: tên người kiểm tra 1 dưới TRƯỞNG ĐOÀN KIỂM TRA (sau đoạn "Lưu: …") */
    var a = x.indexOf('OÀN KIỂM TRA</w:t>'), l = a>=0 ? x.indexOf('Lưu', a) : -1, e = l>=0 ? x.indexOf('</w:p>', l) : -1;
    if(e>=0){ var rr = '<w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr>';
      x = x.slice(0, e+6)+Array(4).join('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>')+'<w:p><w:pPr><w:keepNext/><w:tabs><w:tab w:val="center" w:pos="'+KT04_TD+'"/></w:tabs><w:spacing w:after="0"/></w:pPr><w:r>'+rr+'<w:tab/></w:r><w:r>'+rr+'<w:t xml:space="preserve">'+xmlEsc(g.f.TD04)+'</w:t></w:r></w:p>'+x.slice(e+6); } }
  return x;
}
function ktHTML04(gt){ return Array.isArray(gt) ? ktHTML04Goc(gt) : ktChamHTML(ktHTML04Goc(gt)); }   /* 3.124: dòng chấm mịn */
function ktHTML04Goc(gt){
  if(Array.isArray(gt)) return ktGhepTo(gt.map(function(g){ return ktHTML04(g); }), 210, gt.map(function(g, i){ return 'Báo cáo '+(i+1)+'/'+gt.length+' · '+(g.ten||'')+(g.nhan ? ' · '+g.nhan : ''); }));   /* 3.98 */
  var f = gt.f, c = function(n){ return Array(n+1).join('<div class="kt-ch"></div>'); };
  var muc = function(t, n){ return '<p class="kt-p">'+t+'</p>'+c(n); };
  var pp = function(L, n){ return (L||[]).length ? L.map(function(s){ return '<p class="kt-p" style="text-align:justify">'+coChuHTML(s)+'</p>'; }).join('') : c(n); }, kn = gt.kn || {};   /* 3.109 */
  var R = gt.rows.length ? gt.rows : [{}, {}], KN = ktKNIn04();
  var mucKN = function(t, v){ return v ? '<p class="kt-p">'+t+'</p><p class="kt-p" style="text-align:justify">'+coChuHTML(v)+'</p>' : muc(t, 1); };   /* 3.138 */
  var dvG = String(f.DV0 ? f.DV : '').trim(), gachDV = '<div class="kt-gach" style="width:'+(Math.min(ktDoChu(dvG || 'ĐƠN VỊ KIỂM TRA', 26, true), 3341)*0.4/56.7).toFixed(1)+'mm"></div>';   /* gạch dưới tên đơn vị 1/3–1/2 dòng chữ */
  return '<!doctype html><html><head><meta charset="utf-8"><title>Mau 04/BC-TH</title><style>@page{size:A4;margin:20mm 20mm 18mm 27.5mm}'+KT_IN_CSS+
    'body{font-size:13.5pt}.kt-ob{display:flex;padding-left:10mm;margin:3pt 0;line-height:16pt}.kt-ob .a{width:93mm;flex:0 0 auto}.kt-ob span{display:flex;flex:1}.kt-ob.trong i{flex:1;border-bottom:.5pt dotted #555;margin:0 4pt 4pt}.kt-p{text-indent:10mm;margin:3pt 0;line-height:16pt}.kt-h{font-size:12pt;font-weight:bold}.kt-ch{border-bottom:.5pt dotted #555;height:21pt}.kt-ch1{display:flex;gap:2pt;align-items:flex-end;height:21pt;padding-left:10mm}.kt-ch1 span{flex:1;border-bottom:.5pt dotted #555;height:14pt}'+
    '.kt-bg{width:97.3%;margin-left:2.7%;border-collapse:collapse;font-size:13pt}.kt-bg th,.kt-bg td{border:.5pt solid #000;padding:2pt 4pt;vertical-align:middle}.kt-bg th{font-weight:normal;text-align:center}.kt-bg td{height:24pt}.kt-bg tr{break-inside:avoid}.kt-bg thead{display:table-header-group}.kt-giu{break-inside:avoid}</style></head><body>'+
    '<div style="text-align:right;font-size:11pt"><p class="kt-b kt-i">Mẫu số 04/BC-TH</p><p class="kt-i">01 liên lưu đơn vị kiểm tra;</p><p class="kt-i">01 liên gửi NHCSXH.</p></div>'+
    '<table class="kt-dau" style="margin-top:4pt"><tr><td class="kt-c" style="width:36.3%">'+(f.DV0 ? '<p class="kt-b">'+coChuHTML(f.DV0)+'</p><p class="kt-b">'+(String(f.DV||'').trim() ? coChuHTML(f.DV) : '&nbsp;')+'</p>'+gachDV : '<p class="kt-b">ĐƠN VỊ KIỂM TRA</p><p class="kt-b">'+ktC(f.DV, 40)+'</p>'+gachDV)+'</td>'+
    '<td class="kt-c"><p class="kt-b">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="kt-b">Độc lập - Tự do - Hạnh phúc</p><div class="kt-gach" style="width:57mm"></div></td></tr></table>'+
    '<p class="kt-i" style="text-align:right;margin:8pt 0">'+(f.NOI04 ? coChuHTML(f.NOI04) : '......')+', ngày ....... tháng '+(f.TH04 || '.......')+' năm '+(f.NAM04 || '20............')+'</p>'+
    '<p class="kt-c kt-b">BÁO CÁO TỔNG HỢP</p><p class="kt-c kt-b">Kết quả kiểm tra hoạt động nhận ủy thác cho vay</p><div class="kt-gach" style="width:45mm;margin-bottom:6pt"></div>'+
    '<p class="kt-p kt-h">I. THÀNH PHẦN</p><p class="kt-p">1. Đoàn kiểm tra</p>'+(gt.doan||[]).map(function(x){ return (x.cb ? '<div class="kt-ob"><span class="a">- Ông (bà): '+coChuHTML(x.cb)+'</span><span>Chức vụ: '+coChuHTML(x.cv||'')+'</span></div>' : '<div class="kt-ob trong"><span class="a">- Ông (bà):<i></i></span><span>Chức vụ: '+coChuHTML(x.cv||'')+(x.cv ? '' : '<i></i>')+'</span></div>'); }).join('')+
    Array(3).join('<div class="kt-ob trong"><span class="a">- Ông (bà): <i></i></span><span>Chức vụ: <i></i></span></div>')+
    muc('2. Cấp ủy, chính quyền địa phương (nếu có)', 2)+
    '<p class="kt-p kt-h">II. THỜI GIAN, ĐỊA ĐIỂM, ĐƠN VỊ ĐƯỢC KIỂM TRA</p>'+
    '<table class="kt-bg"><thead><tr><th style="width:7%">Stt</th><th style="width:18.7%">Thời gian</th><th style="width:49%">Đơn vị được kiểm tra<br>(Tên tổ chức CT-XH cấp tỉnh/ Tên tổ chức CT-XH cấp xã/ Tên Tổ TK&amp;VV được kiểm tra)</th><th>Địa điểm<br>(tỉnh, xã, thôn)</th></tr></thead><tbody>'+
    R.map(function(r){ return '<tr><td class="kt-c">'+coChuHTML(r.C1||'')+'</td><td class="kt-c">'+coChuHTML(r.C2||'')+'</td><td>'+coChuHTML(r.C3||'')+'</td><td>'+coChuHTML(r.C4||'')+'</td></tr>'; }).join('')+'</tbody></table>'+
    '<p class="kt-p kt-h">III. NỘI DUNG KIỂM TRA</p>'+pp(gt.nd, 2)+c(1)+
    '<p class="kt-p kt-h">IV. KẾT QUẢ KIỂM TRA</p><p class="kt-p kt-b">1. Đánh giá, nhận xét của Đoàn kiểm tra</p>'+
    '<p class="kt-p">Đối với Tổ TK&amp;VV:</p>'+((gt.nx||[]).length ? gt.nx.map(function(s){ return '<p class="kt-p" style="text-align:justify">'+coChuHTML(s)+'</p>'; }).join('') : c(3))+
    '<p class="kt-p kt-b">2. Kiến nghị của Đoàn kiểm tra</p><p class="kt-p">a) Đối với tổ chức CT-XH được kiểm tra</p>'+pp(kn.a, 3)+'<p class="kt-p">b) Đối với Tổ TK&amp;VV</p>'+pp(kn.b, 3)+'<p class="kt-p">c) Đối với tổ viên Tổ TK&amp;VV</p>'+pp(kn.c, 3)+
    mucKN('d) Đối với NHCSXH', KN.d)+mucKN('đ) Đối với tổ chức CT-XH cấp trên', KN.dd)+
    '<p class="kt-p kt-b">3. Kiến nghị của Đơn vị được kiểm tra</p>'+mucKN('a) Đối với NHCSXH', KN.a3)+mucKN('b) Đối với tổ chức CT-XH cấp trên', KN.b3)+
    '<div class="kt-giu"><p class="kt-p"><b style="font-size:12pt">VI. TÀI LIỆU KÈM THEO</b> <i>(nếu có)</i></p>'+
    '<p class="kt-p">1. Phiếu kiểm tra sử dụng vốn vay (mẫu 06/TD, 06A/TD):'+ktC(f.SP, 15)+' phiếu.</p><p class="kt-p">2. Danh sách đối chiếu (mẫu 15/TD):...................... danh sách.</p>'+c(2)+
    '<table class="kt-dau" style="margin-top:6pt"><tr><td style="width:50%;font-size:11pt"><p class="kt-b kt-i" style="font-size:12pt">Nơi nhận:</p><p>- '+(f.NN04 ? coChuHTML(f.NN04) : 'NHCSXH .....')+';</p><p>- Lưu: Hồ sơ kiểm tra.</p></td>'+
    '<td class="kt-c"><p class="kt-b" style="font-size:12pt">TRƯỞNG ĐOÀN KIỂM TRA</p>'+(f.TD04 ? '<p class="kt-b" style="margin-top:58pt">'+coChuHTML(f.TD04)+'</p>' : '')+'</td></tr></table></div>'+
    '</body></html>';
}
/* ---------- ⚙ Khai báo Hội (mỗi Hội – xã 1 khối) ---------- */
var KT_HKB_O = [['ten','Tên Hội cấp xã'], ['ct','Chủ tịch'], ['pct','Phó Chủ tịch'], ['uv1','BTV 1'], ['uv2','BTV 2'], ['uv3','BTV 3'], ['nk','Nhiệm kỳ'],
  ['hd','Số HĐ ủy thác'], ['hdNgay','Ngày HĐ'], ['kh','Số KH Hội tỉnh'], ['khNgay','Ngày KH']];   /* 3.154 (anh chốt): 1 bảng như Excel — 1 CT, 1 PCT, 3 BTV */
function ktHoiDs(){   /* các cặp Hội – xã có trong dữ liệu (bỏ vay trực tiếp) — theo phạm vi xã đang chọn nếu có */
  var C = ktCH(), g = {}; if(!KT_K) return [];
  Object.keys(KT_K.to).forEach(function(m){ var t = KT_K.to[m]; if(toLaTT(t) || !t.xa || !t.dv || String(t.dv)==='99') return; if(C.xa && t.xa!==C.xa) return;
    var k = ktHoiKhoa(t); if(!g[k]) g[k] = {k:k, t:t, n:0}; g[k].n++; });
  return Object.keys(g).map(function(k){ return g[k]; }).sort(function(a, b){ return ((a.t.tenXa||'')+'|'+a.t.dv).localeCompare((b.t.tenXa||'')+'|'+b.t.dv, 'vi'); });
}
function ktHoiDsXa(xas){   /* các cặp Hội – xã của những xã trong xas ({mã xã:1}); xas rỗng → theo phạm vi xã đang chọn (ktHoiDs) */
  if(!xas) return ktHoiDs(); var g = {}; if(!KT_K) return [];
  Object.keys(KT_K.to).forEach(function(m){ var t = KT_K.to[m]; if(toLaTT(t) || !t.xa || !t.dv || String(t.dv)==='99' || !xas[t.xa]) return;
    var k = ktHoiKhoa(t); if(!g[k]) g[k] = {k:k, t:t, n:0}; g[k].n++; });
  return Object.keys(g).map(function(k){ return g[k]; }).sort(function(a, b){ return ((a.t.tenXa||'')+'|'+a.t.dv).localeCompare((b.t.tenXa||'')+'|'+b.t.dv, 'vi'); });
}
/* 3.106 (anh chốt): dưới mỗi ô — "In ra:" đúng chữ sẽ in (lấy cùng công thức tạo Word); trống = (tự lấy) nghiêng; đã gõ = đậm + ↺ về chuẩn; nghi sai = cam */
function ktHkbIn(t, kb, o, id){
  var c = ktChuan(t), capTinh = c.doan ? 'Tỉnh Đoàn '+KT_TINH : c.ten+' tỉnh '+KT_TINH, v = String(kb[o]||''), cham = '…', ngay = /^\d{2}\/\d{2}\/\d{4}$/;
  var hd = kb.hd ? (/HĐUT/i.test(kb.hd) ? kb.hd : kb.hd+'/HĐUT') : '', canh = '', chu = '';
  if(o==='ten'){ var tn = v || ktHoiTenTD(t); chu = 'Đầu trang: '+(v ? v.toUpperCase() : ktChuanDauXa(t))+' · trong câu: '+tn;
    if(/^h[ộo]i\s+h[ộo]i\b/i.test(v)) canh = 'Lặp chữ "Hội"'; }
  else if(o==='cb' || o==='cbcv'){ chu = 'Mẫu 06 / 16 / 04: - Ông (bà): '+(kb.cb || cham)+'  Chức vụ: '+(kb.cbcv || cham); }
  else if(o==='kh' || o==='khNgay'){ chu = 'Căn cứ Kế hoạch … số '+(kb.kh || cham)+', ngày '+(kb.khNgay || cham)+' của '+capTinh+';';
    if(o==='kh' && v && !/KH/i.test(v)) canh = 'Số kế hoạch thường có chữ "KH" (vd 06-KH/HNDT)';   /* 3.108: "06-KH/HNDT" không có "/KH" vẫn đúng */
    if(o==='khNgay' && v && !ngay.test(v)) canh = 'Ngày nên dạng dd/mm/yyyy'; }
  else if(o==='hd' || o==='hdNgay'){ chu = 'Căn cứ Hợp đồng ủy thác số '+(hd || cham)+' ngày '+(kb.hdNgay || cham)+' …';
    if(o==='hdNgay' && v && !ngay.test(v)) canh = 'Ngày nên dạng dd/mm/yyyy'; }
  else if(o==='ky' || o==='ct'){ chu = 'Ký Kế hoạch: TM. '+c.tm.replace('{xa}', c.xa).toUpperCase()+' / '+c.ky.toUpperCase()+' / '+(v || '(để trống, ký tay)'); }
  else if(o==='pct'){ chu = 'Người kiểm tra Mẫu 06 / 16 / 04: Ông (bà) '+(v || cham)+' — Chức vụ: '+c.pho; }
  else if(/^uv\d$/.test(o)){ chu = v ? v+' — '+c.uv : c.uv+' (nếu có)'; }
  var ve = v ? '<button class="hkb-ve" onclick="ktHkbVe(\''+ktHoiKhoa(t)+'\',\''+o+'\',\''+id+'\')" title="Xóa chữ đã gõ, về giá trị chuẩn / dòng chấm">↺</button>' : '';
  return '<span class="'+(canh ? 'cam' : (v ? 'da' : 'tu'))+'" title="'+coChuHTML('In ra: '+chu+(canh ? ' — ⚠ '+canh : ''))+'">In ra: '+(v ? '' : '<i>(tự lấy)</i> ')+coChuHTML(chu)+(canh ? ' — ⚠ '+coChuHTML(canh) : '')+'</span>'+ve;
}
function ktHkbXem(k, id){   /* gõ tới đâu cập nhật dòng "In ra" của cả dòng Hội – xã tới đó (chưa lưu — lưu khi rời ô như cũ) */
  var x = ktHoiDs().find(function(z){ return z.k===k; }); if(!x) return;
  var kb = Object.assign({}, ktHoiKB(k));
  KT_HKB_O.forEach(function(o){ var e = document.getElementById('hkb-'+id+'-'+o[0]); if(e) kb[o[0]] = String(e.value||'').replace(/\s+/g, ' ').trim(); });
  KT_HKB_O.forEach(function(o){ var e = document.getElementById('hkbi-'+id+'-'+o[0]); if(e) e.innerHTML = ktHkbIn(x.t, kb, o[0], id); });
}
function ktHkbVe(k, o, id){ ktHoiKBSua(k, o, ''); var e = document.getElementById('hkb-'+id+'-'+o); if(e) e.value = ''; ktHkbXem(k, id); }
function ktHoiKBHop(){ var C = ktCH(); C.che = 'hdt'; C.hdtTab = 'hoi'; luu(); try{ dongHop(); }catch(e){} if(KT_K) ktVeThe(); }   /* 3.113: bảng khai báo → tab 🏛 Khai báo Hội đoàn thể */
/* ---------- 3.113 (anh chốt): 🏛 KHAI BÁO HỘI ĐOÀN THỂ — 1 nơi khai cho mọi mẫu (06, 16TD, 04, Kế hoạch); tab nhỏ Hội – xã · Chuẩn hóa quy tắc ----------
   Hội – xã: tên Hội cấp xã (trống = tên chuẩn theo cây) · Chủ tịch · Phó Chủ tịch · tối đa 5 ủy viên BTV · số / ngày HĐUT · số / ngày KH Hội tỉnh.
   Người kiểm tra mặc định = Phó Chủ tịch; người ký Kế hoạch = Chủ tịch (bản 3.114: chọn khi in). Tên Hội cấp tỉnh sửa ở Chuẩn hóa (chung mọi xã). */
/* ---------- 3.117 (anh gửi mẫu tham khảo + bản Đoàn thật, anh: "làm mẫu luôn"): 📄 THÔNG BÁO PHÂN CÔNG NHIỆM VỤ BAN THƯỜNG VỤ trong công tác nhận ủy thác ----------
   Người = lãnh đạo đã khai ở 🏛 Khai báo Hội đoàn thể (Chủ tịch / tối đa 3 Phó / tối đa 5 ủy viên); mỗi người chọn ấp phụ trách kiểm tra + kiêm kế toán / thủ quỹ;
   nhiệm vụ chuẩn theo vai trò (chữ của mẫu tham khảo, sửa lỗi gõ: "tháo gỡ", "các ban liên quan"); Đoàn dùng đầu trang Tỉnh Đoàn / BCH Đoàn xã.
   Lưu D.cauHinh.ktPC['xã|hội'] = {so, p:{vai trò:{ap:[…], kt, tq}}} (đồng bộ Drive). */
var KT_PC_VT = ['ct','pct','uv1','uv2','uv3'];   /* 3.154: 1 CT, 1 PCT, 3 BTV */
var KT_PC_CT = ['Quản lý, theo dõi và chịu trách nhiệm toàn bộ công tác; chỉ đạo, tổ chức triển khai, thực hiện đầy đủ, hiệu quả các nội dung nhận ủy thác cho vay đối với hộ nghèo và các đối tượng chính sách khác với NHCSXH trên địa bàn {xa}.',
  'Hằng năm, xây dựng Kế hoạch kiểm tra, giám sát hoạt động Tổ Tiết kiệm và vay vốn (TK&VV), kiểm tra việc sử dụng vốn vay và chấp hành nghĩa vụ trả nợ của các tổ viên do {ten} quản lý đảm bảo đúng quy định; trực tiếp thực hiện kiểm tra tại {ap} (kiểm tra định kỳ, kiểm tra trong vòng 30 ngày sau giải ngân, kiểm tra món vay 3 tháng không hoạt động). Thông báo kết quả kiểm tra, giám sát đến NHCSXH nơi cho vay.',
  'Hằng tháng, trực tiếp đôn đốc Ban quản lý Tổ TK&VV tham gia đầy đủ các phiên giao dịch, giao ban với Bên ủy thác; hướng dẫn tổ viên Tổ TK&VV thực hiện giao dịch với Bên ủy thác; chứng kiến toàn bộ phiên giao dịch của NHCSXH, tham dự họp giao ban cùng ngân hàng tại các điểm giao dịch để nắm bắt kết quả thực hiện hoạt động ủy thác, kịp thời tháo gỡ những khó khăn, vướng mắc phát sinh tại cơ sở.',
  'Trực tiếp tham dự các cuộc họp Tổ TK&VV để giám sát, chỉ đạo các nội dung: họp thành lập Tổ TK&VV, xây dựng Quy ước hoạt động của Tổ TK&VV và bầu mới Ban quản lý Tổ TK&VV; họp thay đổi Ban quản lý Tổ; họp kết nạp tổ viên và bình xét cho vay vốn tại {ap}.',
  'Trực tiếp tham gia làm thành viên của Tổ đôn đốc thu nợ khó đòi, Tổ hỗ trợ rà soát, xử lý nợ {cxa}, Ban chỉ đạo đối chiếu, phân loại nợ tại {cxa} và các ban liên quan đến hoạt động tín dụng chính sách xã hội trên địa bàn {cxa} để xử lý các trường hợp khách hàng có nợ quá hạn, có khả năng trả nợ nhưng cố tình không trả, khách hàng đi khỏi nơi cư trú; phối hợp kiểm tra và hướng dẫn khách hàng đủ điều kiện xử lý nợ lập hồ sơ đề nghị xử lý nợ bị rủi ro do nguyên nhân khách quan.',
  'Hằng năm, phối hợp với NHCSXH nơi cho vay tổ chức tập huấn cho 100% Ban quản lý Tổ TK&VV về nghiệp vụ ủy nhiệm; {CTc}, {PCT} và Ủy viên Ban Thường vụ của Bên nhận ủy thác về nghiệp vụ ủy thác, cơ chế, chính sách và văn bản mới liên quan đến hoạt động tín dụng chính sách xã hội.',
  'Phối hợp NHCSXH tham mưu UBND {cxa} xây dựng kế hoạch tín dụng hằng năm và triển khai hiệu quả tín dụng chính sách xã hội; tổ chức giao dịch tại các điểm giao dịch; báo cáo kết quả hoạt động ủy thác, khó khăn, vướng mắc và đề xuất, kiến nghị.',
  'Đôn đốc Ban quản lý Tổ TK&VV, khách hàng khắc phục tồn tại, sai sót theo thông báo/kết luận/biên bản kiểm tra/kiến nghị của cấp có thẩm quyền (nếu có).',
  'Phối hợp cùng NHCSXH thực hiện đánh giá chất lượng hoạt động của Tổ TK&VV và hoạt động ủy thác của Bên nhận ủy thác; thực hiện các giải pháp nâng cao chất lượng hoạt động tín dụng, hoạt động ủy thác, hoạt động Tổ TK&VV.',
  'Thực hiện các nhiệm vụ phát sinh khác có liên quan đến công tác ủy thác.'];
var KT_PC_PHO = ['Tham mưu cho {CT} {ten} trong công tác chỉ đạo, tổ chức thực hiện đầy đủ, hiệu quả các nội dung nhận ủy thác cho vay đối với hộ nghèo và các đối tượng chính sách khác với NHCSXH trên địa bàn {xa}.',
  'Tham mưu cho {CT} {ten} xây dựng, ban hành Kế hoạch kiểm tra, giám sát hoạt động Tổ TK&VV, kiểm tra việc sử dụng vốn vay và chấp hành nghĩa vụ trả nợ của các tổ viên do {ten} quản lý và trực tiếp thực hiện kiểm tra tại {ap} (kiểm tra định kỳ, kiểm tra trong vòng 30 ngày sau giải ngân, kiểm tra món vay 3 tháng không hoạt động).',
  'Trực tiếp tham dự các cuộc họp Tổ TK&VV để giám sát, chỉ đạo các nội dung: họp thành lập Tổ TK&VV, xây dựng Quy ước hoạt động của Tổ TK&VV và bầu mới Ban quản lý Tổ TK&VV; họp thay đổi Ban quản lý Tổ; họp kết nạp tổ viên và bình xét cho vay vốn tại {ap}.',
  'Nhận và thông báo kết quả phê duyệt Danh sách khách hàng được vay vốn cho Tổ trưởng Tổ TK&VV để thông báo đến từng khách hàng.',
  'Trực tiếp giám sát và đôn đốc Ban quản lý Tổ TK&VV thực hiện đúng Quy ước hoạt động của Tổ và các nhiệm vụ được ủy nhiệm theo Hợp đồng ủy nhiệm đã ký với NHCSXH.',
  'Phối hợp với Trưởng {capAp} thông báo kịp thời cho UBND {cxa} và NHCSXH nơi cho vay về các trường hợp khách hàng gặp rủi ro do nguyên nhân khách quan (thiên tai, dịch bệnh, hỏa hoạn, chết, mất tích,…), rủi ro do nguyên nhân chủ quan (sử dụng vốn vay sai mục đích, chiếm dụng vốn,…), khách hàng đi khỏi nơi cư trú để có biện pháp xử lý thích hợp.'];
var KT_PC_UV = ['Vận động thành lập Tổ TK&VV và hướng dẫn hoạt động theo quy định của NHCSXH; vận động tổ viên chấp hành Quy ước hoạt động của Tổ TK&VV; thực hành tiết kiệm; giúp đỡ nhau, cùng chia sẻ kinh nghiệm trong việc sử dụng vốn vay đúng mục đích, có hiệu quả; thực hiện trả nợ gốc, trả lãi tiền vay đúng kỳ hạn đã cam kết với Bên ủy thác; sử dụng ứng dụng công nghệ, chuyển đổi số trong quy trình cho vay, sản phẩm dịch vụ; tham gia các hoạt động khác của NHCSXH; trực tiếp thực hiện kiểm tra tại {ap} (kiểm tra định kỳ, kiểm tra trong vòng 30 ngày sau giải ngân, kiểm tra món vay 3 tháng không hoạt động).'];
var KT_PC_CTAP = 'Trực tiếp thực hiện kiểm tra tại {ap} (kiểm tra định kỳ, kiểm tra trong vòng 30 ngày sau giải ngân, kiểm tra món vay 3 tháng không hoạt động).';
var KT_PC_KT = 'Phụ trách kế toán, phụ trách thu chi phí ủy thác.', KT_PC_TQ = 'Làm cán bộ thủ quỹ, phụ trách công tác thu – chi nguồn phí ủy thác của {ngan} theo quy định của {cap} và theo quy định của pháp luật.';
function ktPCLay(k){ var S = D.cauHinh.ktPC = D.cauHinh.ktPC || {}; var x = S[k] = S[k] || {}; x.p = x.p || {}; return x; }
function ktPCTo(k){ return KT_K ? Object.keys(KT_K.to).map(function(m){ return KT_K.to[m]; }).filter(function(t){ return !toLaTT(t) && ktHoiKhoa(t)===k; }) : []; }
function ktPCAp(k){   /* 3.118 (anh chốt): đủ ấp / khu phố của xã (mọi tổ, mọi Hội), xếp theo thứ tự cây: điểm GD (như cây) → ấp */
  if(!KT_K) return []; var xa = String(k).split('|')[0], g = {}, ra = [];
  Object.keys(KT_K.to).map(function(m){ return KT_K.to[m]; }).filter(function(t){ return !toLaTT(t) && t.xa===xa; }).forEach(function(t){ var a = ktApChu(t.tenThon, t.tenXa); if(!a) return; var d = String(t.tenDiemDu||'');
    if(!g[a] || d.localeCompare(g[a], 'vi')<0) g[a] = d; });
  return Object.keys(g).sort(function(a, b){ return g[a].localeCompare(g[b], 'vi') || a.localeCompare(b, 'vi', {numeric:true}); });
}
function ktPCNguoi(k, t, tatCa){   /* 3.123 (anh chốt): chỉ người được tích "Phân công" (mặc định tích hết); bỏ tích Chủ tịch = khuyết → Phó được chọn đôn lên phụ trách (loai 'pt', đứng đầu) · tatCa = mọi người có tên (kèm cờ chon) */
  var kb = ktHoiKB(k), c = ktChuan(t), ch = ktPCLay(k).chon || {};
  var ds = KT_PC_VT.filter(function(v){ return kb[v]; }).map(function(v){ return {vt:v, ten:kb[v], cv:v==='ct' ? c.ky : (/^pct/.test(v) ? c.pho : c.uv), loai:v==='ct' ? 'ct' : (/^pct/.test(v) ? 'pho' : 'uv'), chon:ch[v]!==0}; });
  if(tatCa) return ds;
  ds = ds.filter(function(n){ return n.chon; });
  if(!ds.some(function(n){ return n.loai==='ct'; })){ var pt = ktPCPhuTrach(k, ds);
    if(pt){ ds.splice(ds.indexOf(pt), 1); ds.unshift(Object.assign({}, pt, {loai:'pt', cv:c.pho+' phụ trách'})); } }
  return ds;
}
function ktPCPhuTrach(k, ds){ var pho = ds.filter(function(n){ return n.loai==='pho'; }), v = ktPCLay(k).phuTrach;   /* 3.123: Phó đôn lên khi khuyết Chủ tịch — theo lựa chọn, mặc định Phó đầu tiên */
  return pho.filter(function(n){ return n.vt===v; })[0] || pho[0] || null; }
function ktPCChia(n, m, deu){   /* 3.118: n ấp, m người sau Chủ tịch → [số ấp Chủ tịch, người 1, …]; Chủ tịch ≈ nửa phần (≥ 1 khi đủ ấp), dư dồn người trước · deu = không có Chủ tịch, chia đều m người */
  var r = [], i; if(deu){ for(i=0;i<m;i++) r.push(Math.floor(n/m)+(i<n%m ? 1 : 0)); return r; } if(!m) return [n]; if(n<=m){ r.push(0); for(i=0;i<m;i++) r.push(i<n ? 1 : 0); return r; }
  var ct = Math.max(1, Math.round(n/(m+0.5)/2)), con = n-ct, co = Math.floor(con/m), du = con%m;
  r.push(ct); for(i=0;i<m;i++) r.push(co+(i<du ? 1 : 0)); return r;
}
function ktPCChiaDeu(k, im){   /* 3.118 (anh chốt): chia sẵn theo thứ tự cây — Chủ tịch / Bí thư ít hơn, rồi Phó 1–3, Ủy viên 1–5, mỗi người 1 đoạn ấp liền nhau */
  var t = (ktPCNoiDung(k) || {}).t; if(!t) return; var x = ktPCLay(k), ng = ktPCNguoi(k, t), ap = ktPCAp(k); if(!ng.length) return im ? 0 : bao('Chưa khai tên Ban Thường vụ.', 3);
  var ct = ng[0].loai==='ct' || ng[0].loai==='pt', sl = ct ? ktPCChia(ap.length, ng.length-1) : ktPCChia(ap.length, ng.length, 1), d = 0;   /* 3.123: Phó phụ trách (khuyết CT) ít ấp như Chủ tịch */
  ng.forEach(function(n, i){ (x.p[n.vt] = x.p[n.vt] || {}).ap = ap.slice(d, d+sl[i]); d += sl[i]; });
  delete x.tay; x.chia = 1; luu(); if(!im) ktPCHop(k);
}
function ktPCDoi(k, vt, loai, gt, bat){ var x = ktPCLay(k), p = x.p[vt] = x.p[vt] || {};
  if(loai==='ap'){ p.ap = (p.ap||[]).filter(function(a){ return a!==gt; }); if(bat) p.ap.push(gt); x.tay = 1; } else p[loai] = bat ? 1 : 0; luu(); if(document.getElementById('kt-pc-kiem')) ktPCKiemVe(k); }
function ktPCSauDoiNguoi(k){ var x = ktPCLay(k); if(x.tay) ktPCHop(k); else ktPCChiaDeu(k); }   /* 3.123: đổi người / người phụ trách → chưa chỉnh ấp tay thì chia lại đều; đã chỉnh tay thì giữ, ô kiểm tra báo ấp thiếu */
function ktPCChon(k, vt, bat){ var x = ktPCLay(k); x.chon = x.chon || {}; if(bat) delete x.chon[vt]; else { x.chon[vt] = 0; if(x.p[vt]) x.p[vt].ap = []; } luu(); ktPCSauDoiNguoi(k); }   /* bỏ tích → trả ấp của người đó (tích lại không mang ấp cũ gây trùng) */
function ktPCDoiPT(k, vt){ ktPCLay(k).phuTrach = vt; luu(); ktPCSauDoiNguoi(k); }
function ktPCDoiKy(k, v){ var x = ktPCLay(k); if(v) x.ky = v; else delete x.ky; luu(); ktPCHop(k); }
function ktPCKiem(k){   /* 3.123: ô "Kiểm tra đủ nhiệm vụ" → [{ok, chu}] */
  var g = ktPCNoiDung(k); if(!g) return []; var c = g.c, x = ktPCLay(k), ng = ktPCNguoi(k, g.t), tc = ktPCNguoi(k, g.t, 1), ra = [], dong = function(ok, chu){ ra.push({ok:ok, chu:chu}); };
  if(!tc.length) return [{ok:false, chu:'Chưa khai tên Ban Thường vụ ở 🏛 Khai báo Hội đoàn thể.'}];
  if(!ng.length) return [{ok:false, chu:'Chưa tích người nào để phân công.'}];
  var dau = ng[0].loai==='ct' || ng[0].loai==='pt' ? ng[0] : null, pho = ng.filter(function(n){ return n.loai==='pho'; }), uv = ng.filter(function(n){ return n.loai==='uv'; });
  dong(!!dau, dau ? (dau.loai==='ct' ? 'Nhiệm vụ '+c.ky+': '+dau.ten : 'Khuyết '+c.ky+' — '+dau.ten+' ('+c.pho+') đôn lên phụ trách, nhận đủ nhiệm vụ '+c.ky) : 'Khuyết '+c.ky+' nhưng chưa tích '+c.pho+' nào để đôn lên — nhiệm vụ '+c.ky+' chưa có người nhận.');
  dong(!!(pho.length || dau), pho.length ? 'Nhiệm vụ '+c.pho+': '+pho.map(function(n){ return n.ten; }).join(', ') : dau ? 'Không còn '+c.pho+' — '+dau.ten+' kiêm nhiệm vụ riêng của '+c.pho : 'Nhiệm vụ '+c.pho+' chưa có người nhận.');
  var nhanUV = uv.length ? null : (pho[0] || dau);
  dong(!!(uv.length || nhanUV), uv.length ? 'Nhiệm vụ Ủy viên: '+uv.length+' người' : nhanUV ? 'Không có Ủy viên — '+nhanUV.ten+' nhận nhiệm vụ của Ủy viên' : 'Nhiệm vụ Ủy viên chưa có người nhận.');
  var ap = ktPCAp(k), dem = {}; ng.forEach(function(n){ ((x.p[n.vt] || {}).ap || []).forEach(function(a){ if(ap.indexOf(a)>=0) dem[a] = (dem[a]||0)+1; }); });
  var thieu = ap.filter(function(a){ return !dem[a]; }), trung = ap.filter(function(a){ return dem[a]>1; });
  if(ap.length) dong(!thieu.length && !trung.length, c.ap.charAt(0).toUpperCase()+c.ap.slice(1)+': '+(ap.length-thieu.length)+'/'+ap.length+' có người kiểm tra'+(thieu.length ? ' · chưa ai nhận: '+thieu.join(', ') : '')+(trung.length ? ' · giao trùng: '+trung.join(', ') : ''));
  var coKT = ng.some(function(n){ return (x.p[n.vt] || {}).kt; }), coTQ = ng.some(function(n){ return (x.p[n.vt] || {}).tq; });
  dong(coKT && coTQ, coKT && coTQ ? 'Đã giao Kế toán, Thủ quỹ' : 'Chưa giao '+[coKT ? '' : 'Kế toán', coTQ ? '' : 'Thủ quỹ'].filter(Boolean).join(', '));
  ktTenLoiDs(g.kb, c).forEach(function(s){ dong(false, s); });
  return ra;
}
function ktPCKiemHTML(k){ var ds = ktPCKiem(k), sai = ds.filter(function(r){ return !r.ok; }).length;
  return '<div class="kt-pc-kiem'+(sai ? ' vang' : '')+'"><b>Kiểm tra đủ nhiệm vụ</b>'+(sai ? ' — <b>'+sai+'</b> mục ⚠' : ' — đủ')+'<ul>'+ds.map(function(r){ return '<li>'+(r.ok ? '✓ ' : '⚠ ')+coChuHTML(r.chu)+'</li>'; }).join('')+'</ul></div>'; }
function ktPCKiemVe(k){ var e = document.getElementById('kt-pc-kiem'); if(e) e.innerHTML = ktPCKiemHTML(k); }
function ktPCNgayDai(x){ var m = String(x||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); return m ? 'ngày '+hai(+m[1])+' tháng '+hai(+m[2])+' năm '+m[3] : 'ngày …… tháng …… năm ……'; }
function ktPCNoiDung(k){   /* → {t, c, kb, ten, dau:{…}, khoi:[{s, b, i, ind, jc}], ky:{…}} — dùng chung cho Word và bản In */
  var t = ktPCTo(k)[0] || (ktHoiDs().find(function(x){ return x.k===k; }) || {}).t; if(!t) return null;
  var kb = ktHoiKB(k), c = ktChuan(t), x = ktPCLay(k), ten = kb.ten || ktHoiTenTD(t), xa = ktXaChu(t.tenXa), nh = String(D.cauHinh.donvi || MAC_DINH.donvi || '').replace(/^(PGD\s+)?NHCSXH\s*/i, '');
  var apTat = 'các '+c.ap+' do '+ten+' quản lý';
  var thay = function(s, ap){ return s.replace(/\{xa\}/g, xa).replace(/\{ten\}/g, ten).replace(/\{cxa\}/g, c.xa).replace(/\{CT\}/g, c.ky).replace(/\{PCT\}/g, c.pho).replace(/\{capAp\}/g, c.ap)
    .replace(/\{ngan\}/g, c.ngan).replace(/\{cap\}/g, c.cap).replace(/\{ap\}/g, ap && ap.length ? ap.join(', ') : apTat); };
  var khoi = [], p = function(s, o){ khoi.push(Object.assign({s:s}, o||{})); };
  p(c.doan ? 'Căn cứ Điều lệ Đoàn TNCS Hồ Chí Minh;' : 'Căn cứ Điều lệ '+c.ten+' Việt Nam;', {i:1, ind:567, gach:1});
  p('Căn cứ Hợp đồng ủy thác số '+(kb.hd ? (/HĐUT/i.test(kb.hd) ? kb.hd : kb.hd+'/HĐUT') : '……/HĐUT')+', '+ktPCNgayDai(kb.hdNgay)+' giữa Phòng giao dịch Ngân hàng Chính sách xã hội (NHCSXH) '+(nh || '……')+' và '+ten+' về việc thực hiện ủy thác cho vay đối với hộ nghèo và các đối tượng chính sách khác;', {i:1, ind:567, gach:1});
  p('Căn cứ Quy chế làm việc của Ban Chấp hành '+ten+', nhiệm kỳ '+(kb.nk || '……………')+';', {i:1, ind:567, gach:1});
  p('Ban Thường vụ '+ten+' phân công nhiệm vụ các thành viên trong Ban Thường vụ thực hiện các nội dung liên quan đến công tác nhận ủy thác cho vay với NHCSXH, cụ thể như sau:', {ind:567});
  /* 3.123 (anh chốt): khuyết Chủ tịch → Phó đôn lên phụ trách nhận đủ nhiệm vụ CT, câu "tham mưu / phân công của {CT}" chỉ người phụ trách;
     không còn Phó → người đứng đầu kiêm 3 nhiệm vụ riêng của Phó (4–6; 1–3 đã nằm trong nhiệm vụ CT); không có Ủy viên → Phó đầu tiên (không có thì người đứng đầu) nhận nhiệm vụ Ủy viên */
  var ng = ktPCNguoi(k, t), dauNg = ng[0] && (ng[0].loai==='ct' || ng[0].loai==='pt') ? ng[0] : null, coPho = ng.some(function(n){ return n.loai==='pho'; }), coUV = ng.some(function(n){ return n.loai==='uv'; });
  var nhanUV = coUV ? null : (ng.filter(function(n){ return n.loai==='pho'; })[0] || dauNg), ld = dauNg && dauNg.loai==='pt' ? c.pho+' phụ trách' : c.ky;
  thay = (function(cu){ return function(s, ap){ return cu(s.replace(/\{CTc\}/g, c.ky).replace(/\{CT\}/g, ld), ap); }; })(thay);
  ng.forEach(function(n, i){ var q = x.p[n.vt] || {}, ap = q.ap || [], la = n===dauNg;
    p((i+1)+'. Đồng chí '+n.ten+', '+n.cv+' '+ten+(la ? ':' : ', thực hiện các nội dung, nhiệm vụ cụ thể như sau:'), {b:1, ind:567});
    if(la) p('Phụ trách chung và thực hiện một số nhiệm vụ cụ thể như sau:', {ind:567});
    var ds = la ? KT_PC_CT.slice() : (n.loai==='pho' ? KT_PC_PHO.slice() : KT_PC_UV.slice()), them = [];
    if(la && !coPho) them = them.concat(KT_PC_PHO.slice(3));
    if(nhanUV===n) them = them.concat(KT_PC_UV);
    if(them.length){ if(la) Array.prototype.splice.apply(ds, [ds.length-1, 0].concat(them)); else ds = ds.concat(them); }   /* người đứng đầu: chèn trước "nhiệm vụ phát sinh khác" */
    if(la && ap.length) ds.push(KT_PC_CTAP);   /* 3.118 */
    if(q.kt) ds.push(KT_PC_KT); if(q.tq) ds.push(KT_PC_TQ);
    if(!la) ds.push('Một số nhiệm vụ khác theo sự phân công của {CT} {ten}.');
    ds.forEach(function(s){ p(thay(s, ap), {ind:567, gach:1}); }); });
  if(!ng.length) p(ktPCNguoi(k, t, 1).length ? '(Chưa tích người phân công)' : '(Chưa khai tên Ban Thường vụ ở 🏛 Khai báo Hội đoàn thể)', {i:1, ind:567});
  p('Thông báo này có hiệu lực từ ngày ký, yêu cầu các thành viên Ban Thường vụ thực hiện đầy đủ theo các nội dung phân công./.', {ind:567});
  var nam = String(nay().getFullYear());
  return {t:t, c:c, kb:kb, ten:ten, khoi:khoi,
    dau:c.doan ? {a1:c.tinh, a2:'BCH ĐOÀN '+ktXaChu(t.tenXa).toUpperCase(), a3:'***', so:'Số:        -TB/ĐTN', b1:'ĐOÀN TNCS HỒ CHÍ MINH', b2:'', ngay:ktXaTen(t.tenXa)+', ngày       tháng       năm '+nam}
      : {a1:ktHXCo(kb.ten ? kb.ten.toUpperCase() : ktChuanDauXa(t), 4344).HX, a1z:ktHXCo(kb.ten ? kb.ten.toUpperCase() : ktChuanDauXa(t), 4344).HXZ, a2:'BAN THƯỜNG VỤ', a3:'', so:'Số:        /TB-BTV', b1:'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', b2:'Độc lập - Tự do - Hạnh phúc', ngay:ktXaTen(t.tenXa)+', ngày       tháng       năm '+nam},
    tieu:'Phân công nhiệm vụ của '+(ng.length ? [ng.some(function(n){ return n.loai==='ct'; }) ? c.ky : '', dauNg && dauNg.loai==='pt' || coPho ? c.pho : '', coUV ? 'Ủy viên Ban Thường vụ' : ''].filter(Boolean).join(', ') : c.ky+', '+c.pho+', Ủy viên Ban Thường vụ')+' '+ten+' trong tham gia thực hiện các nội dung ủy thác với Ngân hàng Chính sách xã hội',   /* 3.123: chỉ chức danh có phân công */
    noiNhan:['- TT. Đảng ủy, HĐND '+c.xa+';', '- Chủ tịch, các PCT UBND '+c.xa+';', '- Chủ tịch UBMTTQ '+c.xa+';', '- PGD NHCSXH '+(nh || '……')+';', '- Các Tổ TK&VV;', '- Lưu: VT.'],
    ky:ktPCKy(k, ng, c)};
}
function ktPCKy(k, ng, c){   /* 3.123 (anh chốt): mặc định ghi chung CHỦ TỊCH / BÍ THƯ, để trống tên (ai ký đóng dấu, Phó ghi thêm "P"); chọn người ký → in chức vụ + tên người đó */
  var v = ktPCLay(k).ky, n = v ? ng.filter(function(x){ return x.vt===v && x.loai!=='uv'; })[0] : null;
  return {tm:'TM. BAN THƯỜNG VỤ', cv:(n && n.vt!=='ct' ? c.pho : c.ky).toUpperCase(), ten:n ? n.ten : ''};
}
function ktBungPC(g){   /* Word: A4 dọc, Times New Roman 14 */
  var E = xmlEsc, rr = function(s, o){ o = o||{}; return '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>'+(o.b ? '<w:b/>' : '')+(o.i ? '<w:i/>' : '')+(o.u ? '<w:u w:val="single"/>' : '')+'<w:sz w:val="'+(o.sz||28)+'"/><w:szCs w:val="'+(o.sz||28)+'"/></w:rPr><w:t xml:space="preserve">'+E(s).replace(/\n/g, '</w:t><w:br/><w:t xml:space="preserve">')+'</w:t></w:r>'; };
  var pp = function(s, o){ o = o||{}; return '<w:p><w:pPr><w:spacing w:before="'+(o.tr||0)+'" w:after="'+(o.sau!==undefined ? o.sau : 60)+'" w:line="'+(o.line||300)+'" w:lineRule="'+(o.line ? 'exact' : 'auto')+'"/>'+(o.ind ? '<w:ind w:firstLine="'+o.ind+'"/>' : '')+'<w:jc w:val="'+(o.jc||'both')+'"/></w:pPr>'+(s ? rr(s, o) : '')+'</w:p>'; };
  var tc = function(w, ps){ return '<w:tc><w:tcPr><w:tcW w:w="'+w+'" w:type="dxa"/></w:tcPr>'+ps+'</w:tc>'; };
  var bang = function(w1, w2, c1, c2){ return '<w:tbl><w:tblPr><w:tblW w:w="'+(w1+w2)+'" w:type="dxa"/><w:tblInd w:w="-612" w:type="dxa"/><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="'+w1+'"/><w:gridCol w:w="'+w2+'"/></w:tblGrid><w:tr>'+tc(w1, c1)+tc(w2, c2)+'</w:tr></w:tbl>'; };
  var d = g.dau, ca = {jc:'center', sau:0};
  var dau = bang(4560, 5701,
    pp(d.a1, Object.assign({sz:+d.a1z || 26}, ca))   /* 3.119: tên dài → cỡ 12, xuống dòng trước XÃ / PHƯỜNG (như Kế hoạch) */+pp(d.a2, Object.assign({sz:26, b:1}, ca))+(d.a3 ? pp(d.a3, Object.assign({sz:26}, ca)) : pp('', Object.assign({line:120}, ca)))+pp(d.so, Object.assign({sz:26}, ca)),
    pp(d.b1, Object.assign({sz:26, b:1, u:!d.b2}, ca))+(d.b2 ? pp(d.b2, Object.assign({sz:28, b:1, u:1}, ca)) : '')+pp('', Object.assign({line:120}, ca))+pp(d.ngay, Object.assign({i:1}, ca)));
  var than = pp('THÔNG BÁO', {b:1, jc:'center', tr:240, sau:0})+pp(g.tieu, {b:1, jc:'center', sau:240})+
    g.khoi.map(function(x){ return pp(x.gach ? '- '+x.s : x.s, {b:x.b, i:x.i, ind:x.ind}); }).join('');
  var ky = bang(4560, 5701, pp('Nơi nhận:', {b:1, i:1, sz:24, sau:0, jc:'left'})+g.noiNhan.map(function(s){ return pp(s, {sz:22, sau:0, jc:'left'}); }).join(''),
    pp(g.ky.tm, Object.assign({b:1}, ca))+pp(g.ky.cv, Object.assign({b:1}, ca))+Array(5).join(pp('', ca))+pp(g.ky.ten, Object.assign({b:1}, ca)));
  return dau+than+pp('', {sau:120})+ky;
}
function ktHTMLPC(g){ return ktChamHTML(ktHTMLPCGoc(g)); }   /* 3.124 */
function ktHTMLPCGoc(g){
  var h = function(s){ return coChuHTML(s).replace(/\n/g, '<br>'); }, d = g.dau;
  return '<!doctype html><html><head><meta charset="utf-8"><title>Phan cong nhiem vu BTV</title><style>@page{size:A4;margin:20mm 19.5mm 20mm 30mm}'+KT_IN_CSS+'body{font-size:14pt}.kt-c{text-align:center}.kt-b{font-weight:bold}.kt-i{font-style:italic}.kt-u{text-decoration:underline}'+
    'table{width:100%;border-collapse:collapse}td{vertical-align:top;padding:0}.kt-p{text-align:justify;text-indent:10mm;margin:0 0 3pt;line-height:1.3}</style></head><body>'+
    '<table><tr><td class="kt-c" style="width:44%;font-size:13pt"><p'+(d.a1z ? ' style="font-size:'+(d.a1z/2)+'pt"' : '')+'>'+h(d.a1)+'</p><p class="kt-b">'+h(d.a2)+'</p><p>'+(d.a3 ? h(d.a3) : '&nbsp;')+'</p><p>'+h(d.so)+'</p></td>'+
    '<td class="kt-c" style="font-size:13pt"><p class="kt-b'+(d.b2 ? '' : ' kt-u')+'">'+h(d.b1)+'</p>'+(d.b2 ? '<p class="kt-b kt-u" style="font-size:14pt">'+h(d.b2)+'</p>' : '')+'<p class="kt-i" style="margin-top:6pt">'+h(d.ngay)+'</p></td></tr></table>'+
    '<p class="kt-c kt-b" style="margin-top:12pt">THÔNG BÁO</p><p class="kt-c kt-b" style="margin-bottom:12pt">'+h(g.tieu)+'</p>'+
    g.khoi.map(function(x){ return '<p class="kt-p'+(x.b ? ' kt-b' : '')+(x.i ? ' kt-i' : '')+'">'+h(x.gach ? '- '+x.s : x.s)+'</p>'; }).join('')+
    '<table style="margin-top:8pt"><tr><td style="width:44%"><p class="kt-b kt-i" style="font-size:12pt">Nơi nhận:</p>'+g.noiNhan.map(function(s){ return '<p style="font-size:11pt">'+h(s)+'</p>'; }).join('')+'</td>'+
    '<td class="kt-c"><p class="kt-b">'+h(g.ky.tm)+'</p><p class="kt-b">'+h(g.ky.cv)+'</p><p class="kt-b" style="margin-top:64pt">'+h(g.ky.ten)+'</p></td></tr></table></body></html>';
}
function ktPCHop(k){
  var g = ktPCNoiDung(k); if(!g) return bao('Chưa có dữ liệu tổ của Hội này.', 3);
  if(!ktPCLay(k).chia && ktPCNguoi(k, g.t).length){ ktPCChiaDeu(k, 1); g = ktPCNoiDung(k); }   /* 3.118: lần đầu mở → chia sẵn */
  var x = ktPCLay(k), ng = ktPCNguoi(k, g.t), tc = ktPCNguoi(k, g.t, 1), ap = ktPCAp(k), id = k.replace(/[^0-9a-z]/gi, '_'), c = g.c;
  var dauNg = ng[0] && (ng[0].loai==='ct' || ng[0].loai==='pt') ? ng[0] : null, pho = ng.filter(function(n){ return n.loai==='pho' || n.loai==='pt'; });
  var dong = tc.map(function(n){ var q = x.p[n.vt] || {}, co = q.ap || [], tat = n.chon ? '' : ' disabled', cv = dauNg && dauNg.vt===n.vt ? dauNg.cv : n.cv;   /* 3.123: cột tích "Phân công" — bỏ tích = không phân công (bỏ Chủ tịch = khuyết) */
    return '<tr class="'+(n.chon ? '' : 'kt-loai')+'"><td class="c"><input type="checkbox"'+(n.chon ? ' checked' : '')+' onchange="ktPCChon(\''+k+'\',\''+n.vt+'\',this.checked)" aria-label="Phân công '+coChuHTML(n.ten)+'"></td><td><b>'+coChuHTML(n.ten)+'</b><div><small>'+coChuHTML(cv)+'</small></div></td><td class="kt-pc-ap">'+ap.map(function(a){ return '<label class="kt-pc-chip"><input type="checkbox"'+(co.indexOf(a)>=0 ? ' checked' : '')+tat+' onchange="ktPCDoi(\''+k+'\',\''+n.vt+'\',\'ap\','+JSON.stringify(a).replace(/"/g, '&quot;')+',this.checked)"> '+coChuHTML(a)+'</label>'; }).join('')+'</td>'+
      '<td class="c"><input type="checkbox"'+(q.kt ? ' checked' : '')+tat+' onchange="ktPCDoi(\''+k+'\',\''+n.vt+'\',\'kt\',0,this.checked)" aria-label="Kế toán"></td><td class="c"><input type="checkbox"'+(q.tq ? ' checked' : '')+tat+' onchange="ktPCDoi(\''+k+'\',\''+n.vt+'\',\'tq\',0,this.checked)" aria-label="Thủ quỹ"></td></tr>'; }).join('');
  var ctCo = ng.some(function(n){ return n.loai==='ct'; }), vt = '';
  if(tc.length && !ctCo) vt += '<div class="kt-pc-vt">Khuyết <b>'+coChuHTML(c.ky)+'</b> → '+(pho.length ? '<label>Đôn lên phụ trách: <select onchange="ktPCDoiPT(\''+k+'\',this.value)">'+pho.map(function(n){ return '<option value="'+n.vt+'"'+(dauNg && dauNg.vt===n.vt ? ' selected' : '')+'>'+coChuHTML(n.ten)+'</option>'; }).join('')+'</select></label> <small>(nhận đủ nhiệm vụ '+coChuHTML(c.ky)+')</small>' : '<b class="do-chu">chưa tích '+coChuHTML(c.pho)+' nào để đôn lên</b>')+'</div>';
  if(tc.length && dauNg && !ng.some(function(n){ return n.loai==='pho'; })) vt += '<div class="kt-pc-vt">Không có '+coChuHTML(c.pho)+' phân công → <b>'+coChuHTML(dauNg.ten)+'</b> kiêm nhiệm vụ riêng của '+coChuHTML(c.pho)+'</div>';
  var kyCo = ng.filter(function(n){ return n.loai!=='uv'; });
  if(tc.length) vt += '<div class="kt-pc-vt"><label>Người ký: <select onchange="ktPCDoiKy(\''+k+'\',this.value)"><option value="">Để trống — ghi chung "'+coChuHTML(c.ky.toUpperCase())+'"</option>'+kyCo.map(function(n){ return '<option value="'+n.vt+'"'+(x.ky===n.vt ? ' selected' : '')+'>'+coChuHTML((n.vt==='ct' ? c.ky : c.pho)+' — '+n.ten)+'</option>'; }).join('')+'</select></label> <small>để trống: ai ký đóng dấu, '+coChuHTML(c.pho)+' ký ghi thêm "P"</small></div>';
  moHop('<div class="hop-tit">📄 Phân công nhiệm vụ Ban Thường vụ — '+coChuHTML(g.ten)+'</div>'+
    '<div class="hop-phu">Người lấy theo 🏛 Khai báo Hội đoàn thể (Chủ tịch, tối đa 3 Phó, 5 ủy viên). Ấp đã chia sẵn theo thứ tự cây ('+coChuHTML(g.c.ky)+' ít hơn) — tích để chỉnh; Phó / ủy viên để trống = "các '+coChuHTML(g.c.ap)+' do Hội quản lý". Nhiệm vụ ghi sẵn theo mẫu tham khảo; xuất Word để sửa thêm.</div>'+
    '<div class="kt-pc-kb">'+[['nk', 'Nhiệm kỳ Ban Chấp hành', 'vd: 2025 – 2030'], ['hd', 'Số HĐ ủy thác', '…/HĐUT'], ['hdNgay', 'Ngày ký HĐ', 'dd/mm/yyyy']].map(function(o){ var hid = 'hkb-'+k.replace(/[^0-9a-z]/gi, '_')+'-'+o[0];
      return '<label><span>'+o[1]+'</span><input value="'+coChuHTML(g.kb[o[0]]||'')+'" placeholder="'+o[2]+'" onchange="ktHoiKBSua(\''+k+'\',\''+o[0]+'\',this.value);var e=document.getElementById(\''+hid+'\');if(e)e.value=this.value"></label>'; }).join('')+'</div>'+
    (tc.length ? vt+'<div class="to-bang-cuon"><table class="to-bang kt-pc-bang"><thead><tr><th>Phân công</th><th>Người</th><th>'+coChuHTML(g.c.ap.charAt(0).toUpperCase()+g.c.ap.slice(1))+' phụ trách kiểm tra</th><th>Kế toán</th><th>Thủ quỹ</th></tr></thead><tbody>'+dong+'</tbody></table></div>'+
        (x.tay ? '<div class="sl-phu">Ấp đang theo lần anh chỉnh tay — đổi người phân công thì bấm ⇄ Chia lại đều nếu muốn chia lại.</div>' : '')+'<div id="kt-pc-kiem">'+ktPCKiemHTML(k)+'</div>'
      : '<div class="sl-bao vang">Chưa khai tên Ban Thường vụ — khai ở thẻ Hội – xã trước.</div>')+
    '<div class="hang-nut"><button class="nho" data-lenh="hop.dong">Đóng</button>'+(ng.length ? '<button class="nho" onclick="ktPCChiaDeu(\''+k+'\')" title="Chia lại từ đầu theo thứ tự cây: Chủ tịch ít hơn, rồi Phó, ủy viên — mỗi người 1 đoạn liền nhau">⇄ Chia lại đều</button>' : '')+
    '<button class="nho" onclick="ktPCXuat(\''+k+'\',\'xem\')">👁 Xem trước</button><button class="nho" onclick="ktPCXuat(\''+k+'\',\'in\')">🖨 In / PDF</button><button class="nho chinh" onclick="ktPCXuat(\''+k+'\',\'word\')">📄 Word</button></div>', true);
  var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong');
}
function ktPCXuat(k, cach, ok){
  var g = ktPCNoiDung(k); if(!g) return;
  if(cach!=='xem' && !ok){ var sai = ktPCKiem(k).filter(function(r){ return !r.ok; });   /* 3.123: còn mục ⚠ → nhắc trước khi xuất, vẫn cho xuất */
    if(sai.length) return hoi('Còn '+sai.length+' mục chưa đủ', sai.map(function(r){ return '⚠ '+r.chu; }).join(' · '), cach==='word' ? 'Vẫn xuất Word' : 'Vẫn in', function(){ ktPCXuat(k, cach, 1); }); }
  var ten = 'Thong bao phan cong nhiem vu BTV - '+boDauTen(g.ten).slice(0, 60);
  if(cach==='xem'){ moHop('<div class="hop-tit">👁 Thông báo phân công — '+coChuHTML(g.ten)+'</div><iframe id="kt-pc-khung" class="to-khung" title="Xem trước"></iframe>'+xuatHang({truoc:'<button class="nho" onclick="ktPCHop(\''+k+'\')">‹ Sửa phân công</button>', html:function(){ return ktHTMLPC(g); }, in:'ktPCXuat(\''+k+'\',\'in\')', pdf:'ktPCXuat(\''+k+'\',\'pdf\')', word:'ktPCXuat(\''+k+'\',\'word\')'}), true);   /* 3.152 */
    var hi = document.getElementById('hop-in'); if(hi) hi.classList.add('xem-rong'); var f = document.getElementById('kt-pc-khung'); xemChuan(f, ktHTMLPC(g)); return; }
  if(cach==='word') return ktDocx('pc', g).then(function(bl){ giaoFile(bl, ten+'.docx'); bao('Đã tạo '+ten+'.docx — chỉ lưu trên máy / Drive của anh.', 6); }).catch(function(er){ baoLoi('Tạo Word lỗi: '+(er && er.message || er)); });
  if(cach==='pdf') return inPDF(ktHTMLPC(g), ten);   /* 3.152 */
  inBlob(new Blob([ktHTMLPC(g)], {type:'text/html'}), ten+'.html');
}
function ktHdtChuyen(){   /* chuyển khai báo cũ 1 lần: cán bộ kiểm tra (chức vụ Phó…) → Phó CT; Chủ tịch / Bí thư → CT; khác → ủy viên; người ký → CT */
  ktHdtChuyen1(); ktHdt5(); ktHdtKH();
}
/* 3.158 (anh chốt a): số / ngày KH Hội tỉnh → Chuẩn hóa theo Hội (giá trị nhiều xã khai nhất); xã khai khác giữ làm ngoại lệ — chuyển 1 lần */
function ktHdtKH(){
  if(D.cauHinh.ktKHChuan) return; var S = D.cauHinh.ktHoiKB || {}, dem = {};
  Object.keys(S).forEach(function(k){ var x = S[k], dv = k.split('|')[1]; if(!x.kh && !x.khNgay) return;
    var g = dem[dv] = dem[dv] || {}, c = (x.kh||'')+'\u0001'+(x.khNgay||''); g[c] = (g[c]||0)+1; });
  Object.keys(dem).forEach(function(dv){ var g = dem[dv], tot = Object.keys(g).sort(function(a, b){ return g[b]-g[a]; })[0].split('\u0001'), Ch = (D.cauHinh.ktChuan || {})[dv] || {};
    if(Ch.kh || Ch.khNgay) return;
    if(tot[0]) ktChuanSua(dv, 'kh', tot[0]); if(tot[1]) ktChuanSua(dv, 'khNgay', tot[1]);
    Object.keys(S).forEach(function(k){ if(k.split('|')[1]!==dv) return; var x = S[k];
      if(x.kh && x.kh===tot[0]) delete x.kh; if(x.khNgay && x.khNgay===tot[1]) delete x.khNgay; if(!Object.keys(x).length) delete S[k]; }); });
  D.cauHinh.ktKHChuan = 1; luu();
}
/* 3.154 (anh chốt: app tự lấy số liệu đã khai, anh không nhập lại): 1 Hội = 1 CT, 1 PCT, 3 BTV — chuyển 1 lần.
   PCT = người đầu tiên có tên trong PCT → PCT 2 → PCT 3; BTV 1–3 = 3 người đầu trong ủy viên 1 → 5 (dồn lên).
   Người dư không mất: giữ ở kb.du = [{vt, ten}] (bảng hiện ⓘ). Phân công BTV (ktPC) đổi vai theo. */
function ktHdt5(){
  if(D.cauHinh.ktHdt5) return; var S = D.cauHinh.ktHoiKB || {}, P = D.cauHinh.ktPC || {};
  Object.keys(S).forEach(function(k){ var x = S[k], doi = {}, coTen = {}, du = (x.du || []).slice();
    var xep = function(cu, moi){ var co = cu.filter(function(v){ return x[v]; }), ten = co.map(function(v){ return x[v]; });
      co.forEach(function(v, i){ coTen[v] = 1; if(i<moi.length) doi[v] = moi[i]; else du.push({vt:v, ten:x[v]}); });
      cu.forEach(function(v){ delete x[v]; }); moi.forEach(function(v, i){ if(ten[i]) x[v] = ten[i]; }); };
    xep(['pct','pct2','pct3'], ['pct']); xep(['uv1','uv2','uv3','uv4','uv5'], ['uv1','uv2','uv3']); if(x.ct) coTen.ct = 1, doi.ct = 'ct';
    if(du.length) x.du = du;
    var pc = P[k]; if(pc){ var p2 = {}, c2 = {};
      Object.keys(pc.p || {}).forEach(function(v){ if(coTen[v] && doi[v]) p2[doi[v]] = pc.p[v]; }); pc.p = p2;
      if(pc.chon){ Object.keys(pc.chon).forEach(function(v){ if(coTen[v] && doi[v]) c2[doi[v]] = pc.chon[v]; }); pc.chon = c2; }
      if(pc.ky) pc.ky = doi[pc.ky] || ''; if(!pc.ky) delete pc.ky;
      if(pc.phuTrach) pc.phuTrach = doi[pc.phuTrach] || ''; if(!pc.phuTrach) delete pc.phuTrach; }
  });
  var I = D.cauHinh.ktIn || {}; Object.keys(I).forEach(function(m){ ['ng1','ng2','ky'].forEach(function(f){ var v = I[m] && I[m][f]; if(/^pct\d$/.test(v||'')) I[m][f] = 'pct'; else if(/^uv[45]$/.test(v||'')) I[m][f] = ''; }); });
  D.cauHinh.ktHdt5 = 1; luu();
}
function ktHdtChuyen1(){
  if(D.cauHinh.ktHdtDoi) return; var S = D.cauHinh.ktHoiKB || {};
  Object.keys(S).forEach(function(k){ var x = S[k];
    if(x.cb){ var cv = String(x.cbcv||'').trim();
      if(/^ph[óo]/i.test(cv)){ if(!x.pct) x.pct = x.cb; if(x.pct===x.cb){ delete x.cb; delete x.cbcv; } }
      else if(/^(ch[ủu] t[ịi]ch|b[íi] th[ưu])/i.test(cv)){ if(!x.ct) x.ct = x.cb; }
      else if([1,2,3,4,5].every(function(i){ return x['uv'+i]!==x.cb; })){ for(var i=1;i<=5;i++) if(!x['uv'+i]){ x['uv'+i] = x.cb; break; } } }
    if(x.ky){ if(!x.ct) x.ct = x.ky; if(x.ct===x.ky) delete x.ky; } });
  D.cauHinh.ktHdtDoi = 1; luu();
}
function ktHdtNhac(ds, can){   /* dòng nhắc trong tab mẫu: Hội – xã còn thiếu ô mẫu đó cần → cam; đủ → 1 dòng xanh; nút sang tab khai báo */
  if(!ds || !ds.length) return '';
  var nhan = {hd:'số HĐUT', hdNgay:'ngày HĐUT', kh:'số KH Hội tỉnh', khNgay:'ngày KH Hội tỉnh'};
  var thieu = ds.map(function(x){ var kb = ktHoiKB(x.k), c = ktChuan(x.t);
    var m = can.filter(function(k){ return !(k==='pct' ? (kb.pct || kb.cb) : k==='ct' ? (kb.ct || kb.ky) : kb[k]); }).map(function(k){ return k==='ct' ? c.ky : k==='pct' ? c.pho : nhan[k]; });
    return m.length ? (kb.ten || ktHoiTenTD(x.t))+' ('+m.join(', ')+')' : ''; }).filter(Boolean);
  var nut = ' <button class="nho" onclick="ktHoiKBHop()">🏛 Khai báo Hội đoàn thể</button>';
  return thieu.length ? '<div class="sl-bao vang kt-hdt-nhac">⚠ Chưa khai: '+coChuHTML(thieu.slice(0, 4).join('; ')+(thieu.length>4 ? ' và '+(thieu.length-4)+' Hội – xã khác' : ''))+' — in ra dòng chấm.'+nut+'</div>'
    : '<div class="sl-phu kt-hdt-nhac">✓ Đã khai báo đủ cho '+ds.length+' Hội – xã.'+nut+'</div>';
}
function ktHDTVe(o){
  var C = ktCH(), tab = C.hdtTab==='chuan' || C.hdtTab==='bo' ? C.hdtTab : 'hoi', ds = ktHoiDs();
  var h = ktCheDoHTML()+'<div class="kt-che">'+[['hoi', '🏛 Hội – xã'], ['chuan', '📖 Chuẩn hóa quy tắc'], ['bo', '🧩 Bộ khai báo mẫu']].map(function(x){ return GD.chip(x[1], tab===x[0], 'ktk.hdt', {t:x[0]}); }).join('')+'</div>';   /* 3.329: + 🧩 Bộ khai báo mẫu */
  if(tab==='bo') return ktBoVe(o, h);
  if(tab==='chuan') h += ktChuanHTML();
  else h += '<div class="hang-nut kt-in hkb-dau"><span class="sl-phu" title="Gõ thẳng như Excel: Enter / Tab sang ô kế, ↑ ↓ đổi dòng; dán được cả khối chép từ Excel / Zalo. Ô trống in dòng chấm.">'+ds.length+' Hội – xã'+(C.xa ? '' : ' · chọn 1 xã ở cây để gọn')+
      ' · tên Hội cấp xã, số / ngày KH Hội tỉnh: <a href="#" onclick="event.preventDefault();ktChuanHop()">📖 Chuẩn hóa</a></span></div>'+
    (ds.length ? ktHdtBang(ds) : '<div class="rong">Chưa có dữ liệu tổ — nạp Mẫu 31 trước.</div>');   /* 3.154: 1 bảng như Excel */
  o.innerHTML = h;
}
/* 3.154 (anh chốt ý 8): KHAI BÁO HỘI = 1 BẢNG NHƯ EXCEL — mỗi dòng 1 Hội cấp xã (app tự lấy từ số liệu, kèm số tổ).
   Cột: Xã · Hội (tổ) · Tên Hội cấp xã · CT · PCT · BTV 1–3 · Nhiệm kỳ · Số HĐUT · Ngày HĐ · Số KH Hội tỉnh · Ngày KH · ⋯
   Gõ thẳng: Enter / Tab sang ô kế, ↑↓ đổi dòng; dán cả khối từ Excel / Zalo; ô trống tô nhạt; ngày sai dạng tô đỏ; Đoàn TN: Bí thư / Phó BT (chữ mờ trong ô).
   Bỏ dòng "In ra", ↺ từng ô, PCT 2–3, BTV 4–5 (người dư giữ ở kb.du, ⓘ rê chuột xem). */
var KT_HKB_COT = ['ct','pct','uv1','uv2','uv3','nk','hd','hdNgay'];   /* 3.158: tên Hội cấp xã + KH Hội tỉnh sang Chuẩn hóa */
function ktHkbNgaySai(o, v){ return /Ngay$/.test(o) && !!v && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(v); }
function ktHdtBang(ds){
  var dau = '<tr><th>Hội (tổ)</th><th>Chủ tịch</th><th>Phó CT</th><th>BTV 1</th><th>BTV 2</th><th>BTV 3</th><th>Nhiệm kỳ</th><th>Số HĐUT</th><th>Ngày HĐ</th></tr>', xa0 = null, dem = {};
  ds.forEach(function(x){ var a = dem[x.t.xa] = dem[x.t.xa] || {h:0, to:0}; a.h++; a.to += x.n; });
  return '<div class="hkb-cuon"><table class="hkb-xls"><thead>'+dau+'</thead><tbody>'+ds.map(function(x, r){
    var nhom = ''; if(x.t.xa!==xa0){ xa0 = x.t.xa; nhom = '<tr class="hkb-nhom"><td colspan="'+(KT_HKB_COT.length+1)+'">'+coChuHTML(x.t.tenXa || x.t.xa)+' <small>· '+dem[xa0].h+' Hội · '+dem[xa0].to+' tổ</small></td></tr>'; }   /* 3.158: dòng nhóm thay cột Xã */
    var kb = ktHoiKB(x.k), c = ktChuan(x.t), id = x.k.replace(/[^0-9a-z]/gi, '_');
    var ph = {ct:c.ky, pct:c.pho, uv1:c.uv+' 1', uv2:c.uv+' 2', uv3:c.uv+' 3', nk:'2025 – 2030', hd:'…/HĐUT', hdNgay:'dd/mm/yyyy', kh:'06-KH/…', khNgay:'dd/mm/yyyy'};
    var du = (kb.du || []).map(function(d){ return ktTenNhan(d.vt, c)+': '+d.ten; });
    return nhom+'<tr data-k="'+coChuHTML(x.k)+'"><td class="hkb-hoi"><button class="nho hkb-pc" onclick="ktPCHop(\''+x.k+'\')" title="Thông báo phân công nhiệm vụ Ban Thường vụ (Word / In)">📋 Phân công</button> '+coChuHTML(ktChuan(x.t).ten)+' <small>('+x.n+')</small>'+(du.length ? ' <span class="hkb-du" title="'+coChuHTML('Còn giữ (bản cũ có nhiều hơn 1 PCT / 3 BTV):\n'+du.join('\n'))+'">ⓘ</span>' : '')+'</td>'+
      KT_HKB_COT.map(function(o, cI){ var v = kb[o] || '', loi = KT_PC_VT.indexOf(o)>=0 && v ? ktTenLoiO(kb, o, c) : {loi:[]};
        return '<td><input id="hkb-'+id+'-'+o+'" class="hkb-o'+(ktHkbNgaySai(o, v) ? ' sai' : '')+(loi.loi.length ? ' canh' : '')+'" data-r="'+r+'" data-c="'+cI+'" value="'+coChuHTML(v)+'" placeholder="'+coChuHTML(ph[o]||'')+'" aria-label="'+coChuHTML(ph[o]||o)+'"'+
          (loi.loi.length ? ' title="'+coChuHTML('⚠ '+loi.loi.join('; ')+(loi.goiY ? ' → '+loi.goiY+' (bấm đúp để sửa theo gợi ý)' : ''))+'" ondblclick="ktTenSua(\''+x.k+'\',\''+o+'\',\''+id+'\')"' : '')+
          ' onchange="ktHkbDoi(this,\''+x.k+'\',\''+o+'\')" onkeydown="ktHkbPhim(event,this)" onpaste="ktHkbDan(event,this)"></td>'; }).join('')+'</tr>';
  }).join('')+'</tbody></table></div>';
}
function ktHkbDoi(el, k, o){ ktHoiKBSua(k, o, el.value); var v = ktHoiKBGoc(k)[o] || ''; if(el.value!==v) el.value = v; el.classList.toggle('sai', ktHkbNgaySai(o, v)); }
function ktHkbO(r, c){ return document.querySelector('.hkb-xls:not(.kt-rieng) input.hkb-o[data-r="'+r+'"][data-c="'+c+'"]'); }
function ktHkbPhim(e, el){   /* Enter / Tab → ô kế (hết dòng xuống dòng sau); Shift lùi; ↑ ↓ đổi dòng */
  var r = +el.getAttribute('data-r'), c = +el.getAttribute('data-c'), n = KT_HKB_COT.length, t = null;
  if(e.key==='Enter' || e.key==='Tab'){ var lui = e.shiftKey, i = r*n+c+(lui ? -1 : 1); t = ktHkbO(Math.floor(i/n), ((i%n)+n)%n); }
  else if(e.key==='ArrowDown') t = ktHkbO(r+1, c); else if(e.key==='ArrowUp') t = ktHkbO(r-1, c);
  else return;
  e.preventDefault(); if(el.value!==el.defaultValue) el.dispatchEvent(new Event('change'));
  if(t){ t.focus(); t.select(); }
}
function ktHkbDan(e, el){   /* dán khối nhiều dòng × nhiều cột (Excel / Zalo: tab giữa ô, xuống dòng giữa dòng) — điền từ ô đang đứng sang phải, xuống dưới */
  var tx = (e.clipboardData || window.clipboardData).getData('text'); if(!tx || !/[\t\n]/.test(tx.replace(/\n$/, ''))) return;
  e.preventDefault();
  var r0 = +el.getAttribute('data-r'), c0 = +el.getAttribute('data-c'), n = 0;
  tx.replace(/\r/g, '').replace(/\n$/, '').split('\n').forEach(function(dong, i){ dong.split('\t').forEach(function(v, j){ var o = ktHkbO(r0+i, c0+j); if(!o) return;
    var tr = o.closest('tr'), k = tr && tr.getAttribute('data-k'), f = KT_HKB_COT[c0+j]; if(!k || !f) return; ktHoiKBSua(k, f, v); n++; }); });
  ktVeThe(); bao('Đã dán '+n+' ô.', 3);
}
/* 3.123 (anh chốt): rà soát chính tả tên Ban Thường vụ — chỉ báo ⚠ + gợi ý, anh bấm "Sửa theo gợi ý" mới sửa; không biết được tên thật đúng hay sai */
var KT_TEN_CHU = /^[a-zA-Z\u00C0-\u00C3\u00C8-\u00CA\u00CC\u00CD\u00D2-\u00D5\u00D9\u00DA\u00DD\u00E0-\u00E3\u00E8-\u00EA\u00EC\u00ED\u00F2-\u00F5\u00F9\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9 ]+$/;
function ktTenKiem(s){   /* → {loi:[…], goiY} — goiY = bỏ khoảng trắng thừa + viết hoa đầu mỗi chữ */
  s = String(s||''); var n = s.normalize ? s.normalize('NFC') : s, gon = n.replace(/\s+/g, ' ').trim(), loi = []; if(!gon) return {loi:[], goiY:''};
  var hoa = gon.split(' ').map(function(w){ return w.charAt(0).toLocaleUpperCase('vi')+w.slice(1).toLocaleLowerCase('vi'); }).join(' '), chu = gon.split(' ');
  if(gon!==n) loi.push('khoảng trắng thừa');
  if(hoa!==gon) loi.push('viết hoa chưa đúng');
  if(!KT_TEN_CHU.test(gon)) loi.push('có số / ký tự lạ');
  else if(chu.length>1 && /^[A-Za-z ]+$/.test(gon)) loi.push('chưa có dấu');
  chu.forEach(function(w){ var d = (w.normalize ? w.normalize('NFD') : w).match(/[\u0300\u0301\u0303\u0309\u0323]/g); if(d && d.length>1) loi.push('chữ "'+w+'" có 2 dấu thanh'); });
  if(chu.length<2) loi.push('chỉ có 1 chữ (thiếu họ hoặc tên)');
  return {loi:loi, goiY:hoa!==s ? hoa : ''};
}
function ktTenNhan(v, c){ c = c || {ky:'Chủ tịch', pho:'Phó Chủ tịch'}; return v==='ct' ? c.ky : /^pct/.test(v) ? c.pho+(v.length>3 ? ' '+v.slice(3) : '') : 'Ủy viên BTV '+v.slice(2); }
function ktTenLoiO(kb, v, c){   /* lỗi tên của 1 ô (kèm trùng với ô đứng trước) */
  var r = ktTenKiem(kb[v]), loi = r.loi.slice(), kh = String(kb[v]||'').replace(/\s+/g, ' ').trim().toLowerCase(), i = KT_PC_VT.indexOf(v);
  if(kh) KT_PC_VT.slice(0, i).forEach(function(u){ if(String(kb[u]||'').replace(/\s+/g, ' ').trim().toLowerCase()===kh) loi.push('trùng tên với '+ktTenNhan(u, c)); });
  return {loi:loi, goiY:r.goiY};
}
function ktTenLoiDs(kb, c){ return KT_PC_VT.filter(function(v){ return kb[v]; }).map(function(v){ var r = ktTenLoiO(kb, v, c); return r.loi.length ? 'Tên "'+kb[v]+'" ('+ktTenNhan(v, c)+'): '+r.loi.join(', ') : ''; }).filter(Boolean); }
function ktTenCanhHTML(k, v, id){ var kb = ktHoiKB(k), r = kb[v] ? ktTenLoiO(kb, v) : {loi:[]}; if(!r.loi.length) return '';
  return '⚠ '+coChuHTML(r.loi.join('; '))+(r.goiY ? ' → <b>'+coChuHTML(r.goiY)+'</b><button class="nho" onclick="ktTenSua(\''+k+'\',\''+v+'\',\''+id+'\')">Sửa theo gợi ý</button>' : ''); }
function ktTenVe(k, id){ KT_PC_VT.forEach(function(v){ var e = document.getElementById('hkbt-'+id+'-'+v); if(e) e.innerHTML = ktTenCanhHTML(k, v, id); }); }
function ktTenSua(k, v, id){ var r = ktTenKiem(ktHoiKB(k)[v]); if(!r.goiY) return; ktHoiKBSua(k, v, r.goiY);
  var e = document.getElementById('hkb-'+id+'-'+v); if(e) e.value = ktHoiKB(k)[v] || ''; ktTenVe(k, id); try { ktHkbXem(k, id); } catch(er){} bao('Đã sửa tên: '+(ktHoiKB(k)[v]||''), 3); }
function ktHoiKBSua(k, o, v){
  var S = D.cauHinh.ktHoiKB = D.cauHinh.ktHoiKB || {}, x = S[k] = S[k] || {};
  v = String(v||''); if(v.normalize) v = v.normalize('NFC');   /* 3.123: chuẩn bảng mã dựng sẵn (gõ tổ hợp in Word lệch dấu) — chữ nhìn thấy không đổi */
  v = v.replace(/\s+/g, ' ').trim();
  if(v) x[o] = v; else delete x[o];
  if(!Object.keys(x).length) delete S[k];
  luu();
}

