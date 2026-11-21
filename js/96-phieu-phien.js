/* ===== 3.558 C2 (docs/DANH_GIA_CHUYEN_GIA_1511.md mục 4 nhóm C — anh 21/11 "làm C2 … code và gộp"): 📋 PHIẾU CHUẨN BỊ PHIÊN GIAO DỊCH =====
   Tab 📑 Sao kê › nhóm Nợ đến hạn: mỗi điểm GD trong phạm vi 1 trang A4 dọc để in mang đi phiên kế tiếp của điểm.
   I.  Tóm tắt điểm: số tổ, hộ, dư nợ, quá hạn, khoanh, lãi tồn (như Kết quả GD tại điểm — ttDuLieu).
   II–III. Món đến hạn / sẽ chuyển quá hạn: GỌI LẠI đúng hàm "Sao kê nợ đến hạn" (skBCDH, nhóm ① ② ③ QT-C-12, cột Còn GH QT-C-20) — chỉ món của tổ thuộc điểm,
       khoảng từ ngày sau ngày số liệu đến ngày phiên → số trên phiếu khớp sao kê gốc.
   IV. Tổ cần chú ý: có món lãi tồn ≥ 3 tháng lãi (QT-C-23) · CLT02 xếp loại TB / Yếu (js/95) · tổ viên đề xuất cho ra (QT-C-14 / tvChuan).
   Phiên kế tiếp = ngày GDXA của điểm (d.ngayGD) gần nhất từ hôm nay. Không ghi dữ liệu, chỉ đọc.
   Chuẩn hóa (QUY_CHUAN mục 10, mẫu docs/mau-giao-dien.html): dùng khung báo cáo SK_BC + skBang + khuôn in chung; không onclick, không màu cứng.
   Cắm rút: bỏ dòng <script> là báo cáo biến mất, phần khác không đổi. ES5. */
var PPH = (function(){
  var M = {NG_LAI:3, TEN:'Phiếu chuẩn bị phiên GD — mỗi điểm 1 trang (đến hạn · sắp chuyển QH · tổ cần chú ý)'};
  M.ngayPhien = function(ngayGD, tu){   /* ngày GDXA (số ngày trong tháng) → ngày phiên gần nhất ≥ tu ('YYYY-MM-DD') */
    var d = parseInt(String(ngayGD||'').replace(/\D.*$/, ''), 10); if(!(d>=1 && d<=31)) return '';
    var y = +tu.slice(0, 4), m = +tu.slice(5, 7);
    for(var i = 0; i < 3; i++){ var cuoi = new Date(y, m, 0).getDate(), n = y+'-'+('0'+m).slice(-2)+'-'+('0'+Math.min(d, cuoi)).slice(-2);
      if(n>=tu) return n; m++; if(m>12){ m = 1; y++; } }
    return '';
  };
  M.sau = function(iso, n){ var t = new Date(iso+'T00:00:00'); t.setDate(t.getDate()+(n||1)); return ngayISO(t); };
  /* tổ cần chú ý của 1 điểm */
  M.toChuY = function(d, rows, K){
    var ds = [];
    d.hoi.forEach(function(g){ g.to.forEach(function(z){ var t = z.t; if(!t || toLaTT(t)) return;
      var mon = rows.filter(function(o){ return toMaCua(o)===t.ma; }), lai = mon.filter(function(o){ return typeof HSN!=='undefined' && HSN.thangLai(o)>=M.NG_LAI; });
      var clt = typeof CLT!=='undefined' && K ? CLT.cua(t, K.B) : null, xl = [];
      if(clt && clt.T && /^(TB|Yếu)$/.test(clt.T.xl)) xl.push('tháng '+clt.T.xl); if(clt && clt.DK && /^(TB|Yếu)$/.test(clt.DK.xl)) xl.push('định kỳ '+clt.DK.xl);
      var R = typeof tvChuan==='function' ? tvChuan(t, K) : null, ra = R ? R.choRa : 0;
      if(lai.length || xl.length || ra) ds.push({hoi:g.ten, ten:t.ten||'', ma:t.ma, lai:lai.length, laiTien:lai.reduce(function(s, o){ return s+laiTon(o); }, 0), xl:xl.join(' · '), ra:ra}); }); });
    return ds;
  };
  M.trang = function(d, N, K, homNay){
    var C = skCH(), giu = {tu:C.tu, den:C.den}, ns = N.e31.ngay, x = coChuHTML;
    var ngP = M.ngayPhien(d.ngayGD, homNay > ns ? homNay : M.sau(ns)), tu = M.sau(ns);
    var toSet = {}; d.hoi.forEach(function(g){ g.to.forEach(function(z){ if(z.t) toSet[z.t.ma] = 1; }); });
    var rows = N.rows.filter(function(o){ return toSet[toMaCua(o)]; });
    var r;
    C.tu = tu; C.den = ngP || tu;
    try{ r = skBCDH(rows, N.lapKH, N.M, N.e31, N.ngay); } finally { C.tu = giu.tu; C.den = giu.den; }
    var dn = 0, qh = 0, kn = 0, lt = 0, kh = {}; rows.forEach(function(o){ if((o.dn||0)>0){ dn += o.dn||0; kh[o.kh] = 1; } qh += o.qh||0; kn += o.kn||0; lt += laiTon(o); });
    var chuY = M.toChuY(d, N.rows, K);
    var bChuY = chuY.length ? skBang(['STT', 'Hội', 'Tổ', 'Món lãi tồn ≥ '+M.NG_LAI+' tháng', 'Lãi tồn các món đó', 'CLT02', 'Tổ viên đề xuất cho ra'], chuY,
        function(o, i){ return [i, o.hoi, o.ten, o.lai || '', o.laiTien || '', o.xl, o.ra || '']; }, [4], '', true) : {html:'<div class="bc-rong">Không có.</div>', aoa:[['Không có']]};
    var tom = '<div class="bc-tom"><b>I.</b> '+d.s.soTo+' tổ · '+Object.keys(kh).length+' hộ có dư nợ · dư nợ <b>'+tdnTien(dn)+'</b> · quá hạn <b>'+tdnTien(qh)+'</b> · khoanh <b>'+tdnTien(kn)+'</b> · lãi tồn <b>'+tdnTien(lt)+'</b></div>';
    var html = tom+'<div class="bc-khung"><div class="bc-khung-ten">II–III. Món đến hạn / sẽ chuyển quá hạn — từ '+ngayVNsl(tu)+' đến phiên '+(ngP ? ngayVNsl(ngP) : '?')+'</div>'+r.html+'</div>'+
      '<div class="bc-khung"><div class="bc-khung-ten">IV. Tổ cần chú ý — '+chuY.length+' tổ</div>'+bChuY.html+'</div>'+
      '<div class="bc-ghi">Ghi chú phiên: ……………………………………………………………………………………………………</div><div class="bc-ghi">Cán bộ tín dụng ký: ……………………</div>';
    var aoa = [['PHIẾU CHUẨN BỊ PHIÊN — '+d.ten+(ngP ? ' — phiên '+ngayVNsl(ngP) : '')]].concat(r.aoa || []).concat([[''], ['IV. Tổ cần chú ý']]).concat(bChuY.aoa || []);
    return {ten:'Phieu phien '+String(d.ten||'').slice(0, 20), tieuDe:'PHIẾU CHUẨN BỊ PHIÊN GIAO DỊCH — ĐIỂM GD '+String(d.ten||'').toUpperCase(),
      ngay:'Xã: '+(d.tenXa||'')+(ngP ? ' · phiên ngày '+ngayVNsl(ngP) : ' · chưa có ngày GDXA')+' · '+N.ngay, html:html, aoa:aoa, ngP:ngP};
  };
  M.lap = function(){
    if(!skMau31()) return skCan31(M.TEN);
    var N = skNen31('pph'); if(N.can) return N.can;
    var ds = ttDuLieu(), K = typeof SK_K!=='undefined' ? SK_K : null, hom = ngayISO(nay());
    if(!ds.length) return [{ten:'Phieu phien', tieuDe:'PHIẾU CHUẨN BỊ PHIÊN GIAO DỊCH', ngay:'', aoa:[['Không có tổ trong phạm vi']], html:'<div class="bc-rong">Không có tổ trong phạm vi.</div>'}];
    return ds.map(function(d){ return M.trang(d, N, K, hom); });
  };
  if(typeof SK_BC!=='undefined') SK_BC.push({k:'pph', ten:M.TEN, nhom:'dh', kho:'doc', lap:function(){ return M.lap(); }});
  return M;
})();
