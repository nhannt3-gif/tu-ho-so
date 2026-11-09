/* ===== js/74b-sk-ct.js — 3.506 (anh 09/11/2026 "thêm chức năng sao kê danh sách theo chương trình vay"): SAO KÊ THEO CHƯƠNG TRÌNH VAY =====
   Anh chốt: ô chọn 1 chương trình hoặc Tất cả (sổ sẵn CT có trong Mẫu 31 kỳ đang xem, kèm số món · dư nợ) · chia Chương trình › Tổ › món
   (vay trực tiếp = nhóm riêng) · cột STT · Mã KH · Họ tên · Số KU · Ngày vay · Hạn trả · Dư nợ · Quá hạn · Khoanh · Lãi tồn · món còn dư nợ · A4 ngang.
   Theo cây lọc địa bàn của tab Sao kê (skTrongPV). Nguồn: Mẫu 31 qua kho chuẩn (kcGoc). Tên CT: ctNgan + CT_VT_TEN như các sao kê khác.
   Gói 1 không gian tên SKCT (QUY_CHUAN mục 13) · cắm rút: tự đăng ký vào SK_BC — bỏ dòng <script> là mất báo cáo, phần khác không đổi. ===== */
var SKCT = {
  khoa: function(o){ return ctNgan(o.ct, o) || '(chưa rõ CT)'; },
  ten: function(k){ return k+(CT_VT_TEN[k] && CT_VT_TEN[k]!==k ? ' — '+CT_VT_TEN[k] : ''); },
  coNo: function(o){ return !!(o && o.ku && ((o.dn||0)>0 || (o.qh||0)>0 || (o.kn||0)>0)); },
  /* mọi CT còn dư nợ trong phạm vi: [{k, mon, dn}] — dư nợ lớn trước */
  ds: function(rows){ var g = {};
    rows.forEach(function(o){ if(!SKCT.coNo(o)) return; var k = SKCT.khoa(o), x = g[k] = g[k] || {k:k, mon:0, dn:0}; x.mon++; x.dn += o.dn||0; });
    return Object.keys(g).map(function(k){ return g[k]; }).sort(function(a, b){ return b.dn-a.dn || (a.k<b.k ? -1 : 1); }); },
  rows: function(){ var M = skMau31(); return M ? (kcGoc(M)||[]).filter(skTrongPV) : []; },
  /* ô chọn chương trình (dưới bộ lọc, chỉ khi đang chọn báo cáo này) */
  oHTML: function(){ var C = skCH(), ds = SKCT.ds(SKCT.rows()), tr = function(n){ return (n/1e6).toLocaleString('vi-VN', {maximumFractionDigits:0}); };
    if(C.ctLoc && !ds.some(function(x){ return x.k===C.ctLoc; })) C.ctLoc = '';
    return '<div class="sk-ngay sk-ct">Chương trình: <select id="sk-ct" data-lenh="skct.chon" data-su="change"><option value="">— Tất cả chương trình ('+ds.length+') —</option>'+
      ds.map(function(x){ return '<option value="'+coChuHTML(x.k)+'"'+(x.k===C.ctLoc ? ' selected' : '')+'>'+coChuHTML(SKCT.ten(x.k)+' · '+x.mon+' món · '+tr(x.dn)+' tr')+'</option>'; }).join('')+'</select></div>'; },
  /* NGHIỆP VỤ + bản in: rows (đã lọc địa bàn) → bảng chia CT › Tổ › món, cộng tổ · CT · tổng */
  lap: function(rows, ngay, chon, K, theoTo){
    var ds = rows.filter(function(o){ return SKCT.coNo(o) && (!chon || SKCT.khoa(o)===chon); });
    var ten = 'Sao kê theo chương trình vay', tde = 'SAO KÊ DƯ NỢ THEO CHƯƠNG TRÌNH VAY'+(chon ? ' — '+SKCT.ten(chon).toUpperCase() : '');
    if(!ds.length) return {ten:ten, tieuDe:tde, ngay:ngay, html:'<div class="bc-rong">Không có món còn dư nợ'+(chon ? ' chương trình '+coChuHTML(SKCT.ten(chon)) : '')+' trong phạm vi chọn.</div>', aoa:[['Không có']]};
    var cot = ['STT','Mã KH','Họ tên','Số KU','Ngày vay','Hạn trả','Dư nợ','Quá hạn','Khoanh','Lãi tồn'], so = [6, 7, 8, 9], n = cot.length;
    var dong = function(o, i){ return [i, o.kh||'', o.ten||'', o.ku||'', ngayVNsl(o.nv||o.ngn), ngayVNsl(o.dhgh||o.dhg), o.dn||0, o.qh||0, o.kn||0, laiTon(o)]; };
    var tTo = function(k){ return (K && K.to || {})[k] || {}; };
    var toChu = function(k){ var t = tTo(k); return t.trucTiep ? 'Vay trực tiếp (không qua tổ)'+(t.tenDiem ? ' · điểm '+String(t.tenDiem).trim() : '')+(t.tenXa ? ' · '+t.tenXa : '')
        : 'Tổ '+(t.ten||k)+' ('+k+')'+(t.tenThon ? ' · ấp '+pvApNgan(t.tenThon) : '')+(t.tenXa ? ' · '+t.tenXa : ''); };
    var khoaTo = function(k){ var t = tTo(k); return [t.trucTiep ? '1' : '0', t.tenXa||'', t.tenDiemDu||'', t.ten||'', k].join('|'); };
    var nhom = function(L, f){ var g = {}, thu = []; L.forEach(function(o){ var k = f(o); if(!g[k]){ g[k] = []; thu.push(k); } g[k].push(o); }); return {g:g, thu:thu}; };
    var cong = function(L){ var t = [0, 0, 0, 0]; L.forEach(function(o){ var r = dong(o, 0); so.forEach(function(j, i){ t[i] += r[j]||0; }); }); return t; };
    var oSo = function(t){ return t.map(function(v){ return '<td class="s">'+tdnTien(v)+'</td>'; }).join(''); };
    var h = '', aoa = [cot], stt = 0, tom = [];
    var dCong = function(nhan, L, lop){ var t = cong(L); aoa.push(['', '', nhan, '', '', ''].concat(t)); return '<tr class="'+lop+'"><td colspan="6"><b>'+coChuHTML(nhan)+'</b></td>'+oSo(t)+'</tr>'; };
    var NEN = {'skct-c':'background:#dbeafe;font-weight:800'};   /* bản in không có CSS app → tô ngay trong ô */
    var tieu = function(chu, lop){ aoa.push([chu]); return '<tr class="'+lop+'"><td colspan="'+n+'"'+(NEN[lop] ? ' style="'+NEN[lop]+'"' : '')+'>'+coChuHTML(chu)+'</td></tr>'; };
    var gC = nhom(ds, SKCT.khoa), dnC = function(k){ return cong(gC.g[k])[0]; };
    gC.thu.sort(function(a, b){ return dnC(b)-dnC(a) || a.localeCompare(b, 'vi'); });
    gC.thu.forEach(function(kC){ var LC = gC.g[kC], khC = {};
      h += tieu('Chương trình '+SKCT.ten(kC)+' — '+LC.length+' món', 'skct-c');
      var gT = nhom(LC, function(o){ return toMaCua(o) || ''; }); gT.thu.sort(function(a, b){ return khoaTo(a).localeCompare(khoaTo(b), 'vi'); });
      gT.thu.forEach(function(kT){ var LT = gT.g[kT].slice().sort(function(a, b){ return String(a.ten||'').localeCompare(String(b.ten||''), 'vi'); });
        if(!theoTo || gT.thu.length>1) h += tieu(toChu(kT)+' — '+LT.length+' món', 'nhom');
        LT.forEach(function(o){ var r = dong(o, ++stt); aoa.push(r); khC[o.kh] = 1;
          h += '<tr>'+r.map(function(v, j){ return '<td'+(typeof v==='number' ? ' class="s"' : j===0 ? ' class="c"' : '')+'>'+(typeof v==='number' && j ? tdnTien(v) : coChuHTML(String(v)))+'</td>'; }).join('')+'</tr>'; });
        if(gT.thu.length>1) h += dCong('Cộng tổ', LT, 'tong');
      });
      h += dCong('Cộng chương trình '+kC, LC, 'tong skct-cc');
      tom.push(SKCT.ten(kC)+': '+LC.length+' món · '+Object.keys(khC).length+' khách · '+tdnTien(cong(LC)[0])+' đ');
    });
    if(gC.thu.length>1) h += dCong('TỔNG CỘNG ('+stt+' món)', ds, 'tong');
    return {ten:ten, tieuDe:tde, ngay:ngay, aoa:aoa,
      html:'<div class="bc-tom">'+tom.map(coChuHTML).join('<br>')+'</div><table class="bc-bang skct-bang"><thead><tr>'+cot.map(function(c){ return '<th>'+c+'</th>'; }).join('')+'</tr></thead><tbody>'+h+'</tbody></table>'};
  }
};
SK_BC.push({k:'ct', ten:'Sao kê theo chương trình vay — chia chương trình › tổ (Mẫu 31, món còn dư nợ)', nhom:'tt', kho:'ngang', tuyChon:SKCT.oHTML,
  lap:function(){ var M = skMau31(); if(!M) return skCan31('Sao kê theo chương trình vay'); var th = SK_K.thang, e31 = KHO.bang('hstd', th);
    return SKCT.lap((kcGoc(M)||[]).filter(skTrongPV), 'Số liệu đến ngày '+ngayVNsl(e31.ngay)+' (Mẫu 31 '+kyVN(th)+')', skCH().ctLoc || '', SK_K, !!skCH().to); }});
GD.dangKy('skct', {chon:function(el){ skCH().ctLoc = el.value || ''; luu(); skXemHen(); }});
