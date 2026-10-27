/* 3.385 (anh 27/10): SAO KÊ THEO NHÀ ĐẦU TƯ — tab Sao kê (báo cáo 'ndt').
   Anh: "làm thêm 1 sao kê theo mã nhà đầu tư"; "mã NĐT có mấy loại nên em sổ sẵn ra"; "không cần (tra cứu), cần bên sao kê, theo chương trình, đến tổ";
   "có sao kê cho vay trực tiếp coi như 1 cấp lọc" (Hội = Trực tiếp / mục Vay trực tiếp ở ô Tổ — sẵn có ở bộ lọc).
   - Nguồn: Mẫu 31 qua kho chuẩn (kcGoc) — cột 136 "Mã nhà đầu tư" (ndt), "Nguồn vốn" (nguon 1 TW · 2 ĐP); mã trống = vốn TW không qua NĐT.
   - Ô chọn NĐT sổ sẵn mọi mã có trong Mẫu 31 kỳ đang xem (kèm nguồn · số món · dư nợ) — skCH().ndt: '' tất cả · '-' mã trống · mã.
   - Tên NĐT (không bắt buộc): anh gõ ở ✏ → D.cauHinh.slNdtTen {mã: tên} (đồng bộ khối Số liệu). Không ghi tên / mã vào repo.
   - Chia: Nhà đầu tư › Chương trình › Tổ (vay trực tiếp = nhóm "Vay trực tiếp (không qua tổ)") › món; cộng tổ · chương trình · NĐT · tổng. Món còn dư nợ. ES5. */
function ndtKhoa(o){ return String((o && o.ndt) || '').trim() || '-'; }
function ndtTen(k){ var t = (D.cauHinh.slNdtTen || {})[k]; return k==='-' ? 'Vốn TW (không qua nhà đầu tư)' : (t ? t+' ('+k+')' : 'Mã NĐT '+k); }
function ndtCoNo(o){ return o && o.ku && ((o.dn||0)>0 || (o.qh||0)>0 || (o.kn||0)>0); }
function ndtDs(K){   /* [{k, nguon, mon, kh, dn}] — mọi mã NĐT trong Mẫu 31 kỳ K (cả mã hết dư nợ), dư nợ lớn trước */
  var g = {}, B = K && K.B;
  (kcGoc(B)||[]).forEach(function(o){ if(!o.ku) return; var k = ndtKhoa(o), x = g[k] = g[k] || {k:k, nguon:{}, mon:0, kh:{}, dn:0};
    if(o.nguon) x.nguon[String(o.nguon)] = 1; if(ndtCoNo(o)){ x.mon++; x.kh[o.kh] = 1; x.dn += o.dn||0; } });
  return Object.keys(g).map(function(k){ var x = g[k]; x.kh = Object.keys(x.kh).length; x.nguon = Object.keys(x.nguon).map(function(n){ return SL_NGUON[n] || n; }).join('/'); return x; })
    .sort(function(a, b){ return b.dn-a.dn || (a.k<b.k ? -1 : 1); });
}
function ndtOHTML(){   /* dòng chọn NĐT dưới bộ lọc (chỉ khi đang chọn báo cáo ndt) */
  var C = skCH(), ds = ndtDs(SK_K), tr = function(n){ return (n/1e6).toLocaleString('vi-VN', {maximumFractionDigits:0}); };
  if(C.ndt && !ds.some(function(x){ return x.k===C.ndt; })) C.ndt = '';
  return '<div class="sk-ngay sk-ndt">Nhà đầu tư: <select id="sk-ndt" onchange="skCH().ndt=this.value;luu();skXemHen()"><option value="">— Tất cả nhà đầu tư ('+ds.length+') —</option>'+
    ds.map(function(x){ return '<option value="'+coChuHTML(x.k)+'"'+(x.k===C.ndt ? ' selected' : '')+'>'+coChuHTML(ndtTen(x.k)+(x.nguon ? ' · '+x.nguon : '')+' · '+x.mon+' món · '+tr(x.dn)+' tr')+'</option>'; }).join('')+
    '</select> <button class="nho" onclick="ndtSuaTen()" title="Gõ tên cho mã nhà đầu tư (không bắt buộc)">✏ Tên NĐT</button></div>';
}
function ndtSuaTen(){
  var ds = ndtDs(SK_K).filter(function(x){ return x.k!=='-'; }), T = D.cauHinh.slNdtTen || {};
  if(!ds.length) return bao('Mẫu 31 kỳ này không có mã nhà đầu tư.', 3);
  moHop('<div class="hop-tit">✏ Tên nhà đầu tư</div><p class="ghi">Mẫu 31 chỉ ghi mã. Gõ tên để sao kê dễ đọc (để trống = ghi mã).</p>'+
    ds.map(function(x){ return '<label class="ndt-ten"><span>'+coChuHTML(x.k)+' <small>'+coChuHTML(x.nguon)+' · '+x.mon+' món</small></span><input data-ma="'+coChuHTML(x.k)+'" value="'+coChuHTML(T[x.k]||'')+'" placeholder="vd: UBND tỉnh …"></label>'; }).join('')+
    '<div class="hang-nut"><button class="nho chinh" onclick="ndtLuuTen()">Lưu</button><button class="nho" data-lenh="hop.dong">Đóng (Esc)</button></div>');
}
function ndtLuuTen(){ var T = {};
  Array.prototype.forEach.call(document.querySelectorAll('#hop-in .ndt-ten input'), function(i){ var v = i.value.trim(); if(v) T[i.getAttribute('data-ma')] = v; });
  if(Object.keys(T).length) D.cauHinh.slNdtTen = T; else delete D.cauHinh.slNdtTen;
  luu(); dongHop(); veSaoKe(); bao('Đã lưu tên nhà đầu tư.', 2); }
function skBCNDT(rows, ngay){
  var C = skCH(), K = SK_K, chon = C.ndt || '', ds = rows.filter(function(o){ return ndtCoNo(o) && (!chon || ndtKhoa(o)===chon); });
  var ten = 'Sao kê theo nhà đầu tư', tde = 'SAO KÊ DƯ NỢ THEO NHÀ ĐẦU TƯ' + (chon ? ' — '+ndtTen(chon).toUpperCase() : '');
  if(!ds.length) return {ten:ten, tieuDe:tde, ngay:ngay, html:'<div class="bc-rong">Không có món còn dư nợ'+(chon ? ' của '+coChuHTML(ndtTen(chon)) : '')+' trong phạm vi chọn.</div>', aoa:[['Không có']]};
  var cot = ['STT','Mã KH','Họ tên','Số KU','Ngày vay','Hạn trả','Dư nợ','Quá hạn','Khoanh','Lãi tồn'], so = [6, 7, 8, 9], n = cot.length;
  var dong = function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ngayVNsl(o.nv||o.ngn), ngayVNsl(o.dhgh||o.dhg), o.dn||0, o.qh||0, o.kn||0, laiTon(o)]; };
  var tTo = function(k){ return (K.to||{})[k] || {}; };
  var toChu = function(k){ var t = tTo(k); return t.trucTiep ? 'Vay trực tiếp (không qua tổ)'+(t.tenDiem ? ' · điểm '+String(t.tenDiem).trim() : '')+(t.tenXa ? ' · '+t.tenXa : '')
      : 'Tổ '+(t.ten||k)+' ('+k+')'+(t.tenThon ? ' · ấp '+pvApNgan(t.tenThon) : '')+(t.tenXa ? ' · '+t.tenXa : ''); };
  var khoaTo = function(k){ var t = tTo(k); return [t.trucTiep ? '1' : '0', t.tenXa||'', t.tenDiemDu||'', t.ten||'', k].join('|'); };
  var nhom = function(L, f){ var g = {}, thu = []; L.forEach(function(o){ var k = f(o); if(!g[k]){ g[k] = []; thu.push(k); } g[k].push(o); }); return {g:g, thu:thu}; };
  var cong = function(L){ var t = [0, 0, 0, 0]; L.forEach(function(o){ var r = dong(o, 0); so.forEach(function(j, i){ t[i] += r[j]||0; }); }); return t; };
  var oSo = function(t){ return t.map(function(v){ return '<td class="s">'+tdnTien(v)+'</td>'; }).join(''); };
  var dCong = function(nhan, L, lop){ var t = cong(L); aoa.push(['', '', nhan, '', '', ''].concat(t));
    return '<tr class="'+lop+'"><td colspan="6"><b>'+coChuHTML(nhan)+'</b></td>'+oSo(t)+'</tr>'; };
  var NEN = {'ndt-n':'background:#dbeafe;font-weight:800', 'ndt-c':'background:#eef2ff;font-weight:700;font-style:italic'};   /* bản in không có CSS app → tô ngay trong ô */
  var tieu = function(chu, lop){ aoa.push([chu]); return '<tr class="'+lop+'"><td colspan="'+n+'"'+(NEN[lop] ? ' style="'+NEN[lop]+'"' : '')+'>'+coChuHTML(chu)+'</td></tr>'; };
  var h = '', aoa = [cot], stt = 0, tom = [];
  var gN = nhom(ds, ndtKhoa), dnN = function(k){ return cong(gN.g[k])[0]; };
  gN.thu.sort(function(a, b){ return dnN(b)-dnN(a); });
  gN.thu.forEach(function(kN){ var LN = gN.g[kN], ng = {}; LN.forEach(function(o){ if(o.nguon) ng[SL_NGUON[o.nguon]||o.nguon] = 1; });
    var chuN = 'Nhà đầu tư: '+ndtTen(kN)+(Object.keys(ng).length ? ' · nguồn '+Object.keys(ng).join('/') : '');
    h += tieu(chuN+' — '+LN.length+' món', 'ndt-n');
    var gC = nhom(LN, function(o){ return ctNgan(o.ct, o) || '(chưa rõ CT)'; }); gC.thu.sort(function(a, b){ return a.localeCompare(b, 'vi'); });
    gC.thu.forEach(function(kC){ var LC = gC.g[kC];
      h += tieu('Chương trình '+kC+(CT_VT_TEN[kC] ? ' — '+CT_VT_TEN[kC] : '')+' — '+LC.length+' món', 'ndt-c');
      var gT = nhom(LC, function(o){ return toMaCua(o) || ''; }); gT.thu.sort(function(a, b){ return khoaTo(a).localeCompare(khoaTo(b), 'vi'); });
      gT.thu.forEach(function(kT){ var LT = gT.g[kT].slice().sort(function(a, b){ return String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); });
        if(!C.to || gT.thu.length>1) h += tieu(toChu(kT)+' — '+LT.length+' món', 'nhom');
        LT.forEach(function(o){ var r = dong(o, ++stt); aoa.push(r);
          h += '<tr>'+r.map(function(v, j){ return '<td'+(typeof v==='number' ? ' class="s"' : j===0 ? ' class="c"' : '')+'>'+(typeof v==='number' && j ? tdnTien(v) : coChuHTML(String(v)))+'</td>'; }).join('')+'</tr>'; });
        if(gT.thu.length>1) h += dCong('Cộng tổ', LT, 'tong');
      });
      h += dCong('Cộng chương trình '+kC, LC, 'tong ndt-cc');
    });
    h += dCong('Cộng '+ndtTen(kN), LN, 'tong ndt-cn');
    var khN = {}; LN.forEach(function(o){ khN[o.kh] = 1; }); tom.push(ndtTen(kN)+': '+LN.length+' món · '+Object.keys(khN).length+' khách · '+tdnTien(cong(LN)[0])+' đ');
  });
  if(gN.thu.length>1) h += dCong('TỔNG CỘNG ('+stt+' món)', ds, 'tong');
  return {ten:ten, tieuDe:tde, ngay:ngay, aoa:aoa,
    html:'<div class="bc-tom">'+tom.map(coChuHTML).join('<br>')+'</div><table class="bc-bang ndt-bang"><thead><tr>'+cot.map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>'};
}
