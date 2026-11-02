/* ===== 3.223 M6 — MẪU 10A/TD Biên bản họp thành lập Tổ TK&VV (QĐ 70) trên nền ô — dựng theo file gốc tests/mau_goc/10a.docx =====
   3.446 (anh 02/11): cả mẫu cỡ 13, tiêu đề 15; chữ điền liền như gõ tay, in thường; tên hoa đầu từ; ô chọn Về việc / họp tháng-quý · (gốc: lề 20 / 20 / 20 / 30 mm · Times New Roman 14 · thân bài dòng cố định 17 pt), cách 6 pt, thụt 12,7 mm · danh sách: 3.443 khung cố định 100 tổ viên 3 cột × 34 dòng (trang 1–2), phần II luôn sang trang 3 (anh 02/11).
   Ngày họp / ngày UBND mặc định chấm (anh chốt). Ô "Mẫu số" của gốc nằm trên lề trên (hộp chữ) → app đặt góc phải đầu trang. Bỏ file này → app dùng lại hsoLap10a cũ. */
(function(){
  var MK = '10a';
  function mm(s, k){ var m = new RegExp(k+':(-?[\\d.]+)mm').exec(s); return m ? +m[1] : 0; }
  function P(noi, s){ s = s || ''; if(s && !/;$/.test(s)) s += ';';
    if(/nowrap/.test(s) && noi.indexOf('<br>')<0){
      var w = 0, h = noi.replace(/<span[^>]*display:inline-block;width:([\d.]+)mm[^>]*>[\s\S]*?<\/span>/g, function(_, x){ w += +x; return ''; }), tx = h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
      var R = 159.5 - mm(s, 'text-indent') - mm(s, 'margin-left'), n = (tx.match(/ /g) || []).length; w += omRong(tx, 14, /^<b>/.test(noi));
      if(w > R){ if(n && (w-R)/n <= 0.8) s += 'word-spacing:'+(-(w-R)/n).toFixed(2)+'mm;';
        else { s += 'letter-spacing:'+(-(w-R)/tx.length).toFixed(3)+'mm;'; noi = noi.replace(/display:inline-block;/g, 'display:inline-block;letter-spacing:normal;'); } } }
    else if(/justify/.test(s) && !/word-spacing/.test(s)) s += 'word-spacing:-0.25mm;';
    if(/text-align-last:justify/.test(s)) noi = noi.replace(/display:inline-block;/g, 'display:inline-block;text-align-last:auto;word-spacing:normal;');
    return '<p style="margin:0;'+s+'">'+noi+'</p>'; }
  var J = 'text-align:justify;', W = 'white-space:nowrap;', TL = 'text-align-last:justify;', F = 'text-indent:12.7mm;', H15 = 'margin:4pt 0;line-height:17pt;', H17 = 'margin:0 0 4pt;line-height:17pt;'   /* cách 6 pt dồn về sau đoạn: đầu trang không thêm khoảng (như Word) */;
  function hso10aCo(ten){ var r = 161.5/3 - 2.4 - omRong('100. ', 14), c = [14, 13, 12, 11].find(function(pt){ return omRong(String(ten||''), pt) <= r; }); return c || 11; }   /* 3.443.1 / 3.446: tên dài hơn ô → thu chữ 12 / 11 / 10 (ô cao cố định, không xuống dòng) */
  function dvAp(t, T){ var m = /^(ấp|ap|khu phố|kp|thôn|tổ dân phố)\.?\s/i.exec(String((t && t.tenThon) || ''));
    return m ? (/^(kp|khu)/i.test(m[1]) ? 'khu phố' : /^ap$/i.test(m[1]) ? 'ấp' : m[1].toLowerCase()) : (T.capAp || 'thôn'); }   /* 3.448 (anh 02/11 "xã ấp tự đổi theo đơn vị hành chính"): ấp / khu phố / thôn theo tên ấp, không có tiền tố → theo xã / phường */
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }
  /* 3.449 (anh 02/11): Hội ở dòng Chủ trì chỉ ghi tên Hội, bỏ xã / phường */
  function hso10aHoi(h){ return String(h||'').replace(/\s+(xã|phường|thị trấn|đặc khu)\s+.*$/i, '').trim(); }
  /* 3.449 (anh 02/11 "mỗi dòng cho chọn tự động hay chấm ghi tay"): tách ô gộp — cách đã chọn ở ô cũ chuyển sang ô con (1 lần) */
  function hso10aTach(){ var L = hsoLuu(); if(L.tach10a3449) return; L.tach10a3449 = 1; var c = (L.cham||{})[MK] || {}, nh = (L.nhanh||{})[MK];
    var map = {diaDiem:['diaBan2'], chuTri:['chuTriCv', 'chuTriHoi'], bql:['bqlTT', 'bqlPho'], ub:['ubDiaBan', 'ubTT', 'ubPho'], ky:['kyTA', 'kyCT']};
    Object.keys(map).forEach(function(k){ map[k].forEach(function(z){ if(c[k] && !c[z]) c[z] = c[k]; if(Array.isArray(nh) && nh.indexOf(k)>=0 && nh.indexOf(z)<0 && k!=='diaDiem' && k!=='chuTri') nh.push(z); }); });
    if(Array.isArray(nh)) ['bql', 'ub', 'ky'].forEach(function(k){ var i = nh.indexOf(k); if(i>=0) nh.splice(i, 1); }); }
  /* 3.449 (anh 02/11 "chọn tổ hiện bảng danh sách hộ vay, theo mã KH, dư nợ — loại hộ dư nợ = 0; phải có tên tổ trưởng, tổ phó; in theo mã KH, mặc định tích hết"):
     tổ viên (KHO) + tổ trưởng / tổ phó theo File Tổ trưởng (MATT / MATP) dù không vay; sắp Mã KH */
  hso10aDs = function(t){ if(!t) return []; var ds = hsoTVTo(t).map(function(k){ return {kh:String(k.kh||''), ten:k.ten, dn:k.dn||0, vay:true, k:k, vao:k.vao, chuaGN:k.chuaGN}; }), co = {}, T = hsoTo(t), d = t.ds || {}, b = KHO.bangTo(t.ma) || {};
    ds.forEach(function(x){ if(x.kh) co[x.kh] = x; });
    var sx = function(s){ return typeof sxChuan==='function' ? sxChuan(s||'') : String(s||'').toLowerCase(); };
    var them = function(kh, ten, vai){ kh = String(kh||'').trim(); var x = kh ? co[kh] : null;
      if(!x && ten) x = ds.find(function(z){ return z.vay && sx(z.ten)===sx(ten); }) || null;
      if(x){ x.vai = vai; return; } if(!kh && !ten) return; var y = {kh:kh, khoa:kh ? '' : vai, ten:ten, dn:0, vay:false, vai:vai}; ds.push(y); if(kh) co[kh] = y; };
    them(d.ttKH || b.kh, d.toTen || T.tt, 'TT'); them(d.phoKH, T.phoKB ? T.pho : (d.phoTen || T.pho), 'TP');
    return ds.sort(function(a, c){ if(!a.kh !== !c.kh) return a.kh ? -1 : 1; return String(a.kh).localeCompare(String(c.kh), 'vi', {numeric:true}); }); };
  /* 3.449: bảng hộ vay của tổ ở cột trái — ☑ in vào 10A · Mã KH · họ tên (TT / TP) · dư nợ · ghi chú; mặc định tích hết; bấm tiêu đề để sắp; bỏ tích nhanh hộ dư nợ = 0 (trừ TT / TP) */
  hso10aBang = function(t, ds){ if(!hso10aBang.dk && typeof GD!=='undefined'){ hso10aBang.dk = 1;
      GD.dangKy('h10a', {tich:function(el){ HSO.tv[el.getAttribute('data-k')] = el.checked; hsoVe(); }, sap:function(el){ HSO.tvSap = el.getAttribute('data-s'); hsoVe(); },
        bo0:function(){ var t = KHO.to(hsoCH().to); (hso10aDs(t)||[]).forEach(function(x){ if(!(x.dn>0) && !x.vai) HSO.tv[x.kh || x.khoa] = false; }); hsoVe(); },
        het:function(){ var t = KHO.to(hsoCH().to); (hso10aDs(t)||[]).forEach(function(x){ HSO.tv[x.kh || x.khoa] = true; }); hsoVe(); }}); }
    ds.forEach(function(x){ var k = x.kh || x.khoa; if(HSO.tv[k]===undefined) HSO.tv[k] = true; });
    var sap = HSO.tvSap==='dn' ? ds.slice().sort(function(a, b){ return (a.dn||0)-(b.dn||0) || String(a.kh).localeCompare(String(b.kh), 'vi', {numeric:true}); }) : ds;
    var n0 = ds.filter(function(x){ return !(x.dn>0) && !x.vai && HSO.tv[x.kh || x.khoa]!==false; }).length, chon = ds.filter(function(x){ return HSO.tv[x.kh || x.khoa]!==false; });
    var tong = chon.reduce(function(a, x){ return a+(x.dn||0); }, 0), e = coChuHTML, ky = KHO.coKy() ? slKyChu(KHO.ky().ky) : '';
    var ghi = function(x){ return !x.vay ? (x.vai ? 'không có món vay' : '') : !(x.dn>0) ? (x.chuaGN ? 'chưa giải ngân' : 'dư nợ = 0') : (x.vao ? 'mới vào tổ' : ''); };
    var th = function(s, chu){ return '<th><button class="nho'+((HSO.tvSap||'kh')===s ? ' bat' : '')+'" data-lenh="h10a.sap" data-s="'+s+'" title="Sắp theo '+chu+'">'+chu+((HSO.tvSap||'kh')===s ? ' ▲' : '')+'</button></th>'; };
    var dsTT = ds.filter(function(x){ return x.vai; }).map(function(x){ return x.vai; });
    return '<div class="nhan-nhom">👥 Hộ vay của tổ — '+(ky ? 'số liệu '+e(ky) : 'chưa có số liệu')+' <small>(in vào 10A theo thứ tự Mã KH)</small></div>'+
      (dsTT.indexOf('TT')<0 ? '<div class="sl-phu hso-canh">⚠ Chưa rõ tổ trưởng (File Tổ trưởng / Mẫu 31).</div>' : '')+(dsTT.indexOf('TP')<0 ? '<div class="sl-phu hso-canh">⚠ Chưa rõ tổ phó (File Tổ trưởng chưa có / chưa nạp).</div>' : '')+
      '<div class="hang-nut">'+(n0 ? '<button class="nho" data-lenh="h10a.bo0" title="Bỏ tích các hộ dư nợ = 0 (giữ tổ trưởng, tổ phó)">Bỏ tích hộ dư nợ = 0 ('+n0+')</button>' : '')+(chon.length<ds.length ? '<button class="nho" data-lenh="h10a.het">Tích hết</button>' : '')+'</div>'+
      '<div class="bang-cuon"><table class="bang hso-tv10a"><thead><tr><th>In</th><th>#</th>'+th('kh', 'Mã KH')+'<th>Họ tên</th>'+th('dn', 'Dư nợ')+'<th>Ghi chú</th></tr></thead><tbody>'+
      sap.map(function(x, i){ var k = x.kh || x.khoa, co = HSO.tv[k]!==false;
        return '<tr class="'+(!(x.dn>0) && x.vay ? 'vang' : '')+(co ? '' : ' mo')+'">'+
          '<td><input type="checkbox" data-lenh="h10a.tich" data-su="change" data-k="'+e(k)+'"'+(co ? ' checked' : '')+'></td><td>'+(i+1)+'</td><td>'+e(x.kh || '—')+'</td><td>'+e(tenHoaDau(x.ten||''))+(x.vai ? ' <span class="tc-vt'+(x.vai==='TP' ? ' tp' : '')+'">'+x.vai+'</span>' : '')+'</td><td class="s">'+(x.vay ? tdnTien(x.dn||0) : '—')+'</td><td><small>'+e(ghi(x))+'</small></td></tr>'; }).join('')+
      '</tbody><tfoot><tr><td colspan="3"><b>'+chon.length+'</b>/'+ds.length+' hộ</td><td>tích in vào 10A</td><td class="s"><b>'+tdnTien(tong)+'</b></td><td></td></tr></tfoot></table></div>'; };
  var DON = {truongAp:1, chuTri:1, chuTriCv:1, chuTriHoi:1, thuKy:1, bqlTT:1, bqlPho:1, ubTT:1, ubPho:1, kyTA:1, kyCT:1};   /* ô chỉ 1 giá trị (tự gõ được) */
  var VV = ['thành lập Tổ Tiết kiệm và vay vốn', 'kiện toàn hoạt động của Tổ TK&VV theo Quyết định số 70/QĐ-HĐQT'];   /* 3.446 (anh 02/11): Về việc · 3.448 (anh 02/11, VB 4336/HD-NHCS): "Củng cố" → "Kiện toàn": tiêu đề + câu nội dung cuộc họp */
  function vvKT(v){ return /^(kiện toàn|củng cố)/i.test(String(v||'')); }   /* giá trị cũ "củng cố …" (3.446–3.447) đọc như kiện toàn */
  omDangKy({k:MK, ma:'10A/TD', phan:['to', 'hoi', 'ub', 'ky'], co:14,
    dien:[['het', 'Điền hết'], ['chuaUB', 'Chừa phê duyệt UBND'], ['tuy', 'Tùy chọn']],   /* 3.448: khối Nhập liệu riêng 10A (không có phần Ngân hàng) */
    phanTen:{to:'Thông tin cuộc họp, tổ viên, quy ước, Ban quản lý', hoi:'Chủ trì (Hội)', ub:'Phê duyệt UBND', ky:'Ngày, họ tên dưới chữ ký'},
    o:[{k:'vv', n:'Về việc (dòng tiêu đề)', p:'to', l:'chon', md:'kb', chon:VV, chonMD:1, chonNgan:function(z){ return vvKT(z) ? 'Kiện toàn' : 'Thành lập'; }, nhanh:1},
      {k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1, ui:function(){ return hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay || '', '', 'date'); }},
      {k:'diaDiem', n:'Địa điểm: thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'soNguoi', n:'- … người là đại diện hộ gia đình', p:'to', l:'go', md:'cham'},
      {k:'diaBan2', n:'… cùng cư trú tại địa bàn thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'truongAp', n:'Trưởng thôn chứng kiến', p:'to', l:'tu', md:'tu', ng:'⚙ khai báo ấp / tổ'},
      {k:'chuTri', n:'Chủ trì: Ông (Bà) — họ tên', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'chuTriCv', n:'Chủ trì: Chức vụ', p:'hoi', l:'tu', md:'tu', ng:'⚙ khai báo Hội (người dự họp)'},
      {k:'chuTriHoi', n:'Chủ trì: Hội (không ghi xã / phường)', p:'hoi', l:'tu', md:'tu', ng:'Hội quản lý tổ'},
      {k:'thuKy', n:'Thư ký: Ông (Bà) (đại diện hộ gia đình)', p:'to', l:'tu', md:'cham', ng:'tổ phó'},
      {k:'tv', n:'I. Danh sách tổ viên · Tổng số', p:'to', l:'tu', md:'tu', ng:'tổ viên của tổ (bỏ tích ở cột trái)'},
      {k:'dkKy', n:'II.2 Tổ họp định kỳ hằng tháng / quý', p:'to', l:'chon', md:'kb', chon:['tháng', 'quý'], nhanh:1},
      {k:'ngayDK', n:'II.2 … vào ngày', p:'to', l:'tukb', md:'tu', ng:'ô cũ "Ngày họp định kỳ" (đã gõ trước 3.446)', nhanh:1},
      {k:'tk', n:'II.5c Tiết kiệm tối thiểu (đồng/tổ viên)', p:'to', l:'tukb', md:'tu', ng:'ô cũ "Tiết kiệm tối thiểu" (đã gõ trước 3.446)', nhanh:1},
      {k:'tuThang', n:'II.5c … kể từ tháng …/…', p:'to', l:'go', md:'cham'},
      {k:'bqlTT', n:'III.a) Ông (Bà) … Chức vụ: Tổ trưởng', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / File Tổ trưởng'},
      {k:'bqlPho', n:'III.b) Ông (Bà) … Chức vụ: Tổ phó', p:'to', l:'tu', md:'tu', ng:'File Tổ trưởng / ⚙ khai báo tổ phó'},
      {k:'bq', n:'IV. …/… tổ viên biểu quyết tán thành', p:'to', l:'go', md:'cham'},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ubDiaBan', n:'Phê duyệt UBND: thôn · xã · tỉnh', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ubTT', n:'Phê duyệt UBND: Ông (Bà) … làm Tổ trưởng', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ubPho', n:'Phê duyệt UBND: Ông (Bà) … làm Tổ phó', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31'},
      {k:'ubNgay', n:'Phê duyệt UBND: ngày … tháng … năm', p:'ub', l:'go', md:'cham', ngay:1, ui:function(){ return hsoIn('HSO.o.ubNgay=this.value;hsoHen()', HSO.o.ubNgay || '', '', 'date'); }},
      {k:'kyTA', n:'Họ tên dưới chữ ký Trưởng thôn', p:'ky', l:'tu', md:'tu', ng:'⚙ khai báo ấp'},
      {k:'kyCT', n:'Họ tên dưới chữ ký Chủ trì', p:'ky', l:'tu', md:'tu', ng:'⚙ khai báo Hội'}],
    V:function(t){
      hso10aTach();
      var T = hsoTo(t), tv = hso10aDs(t).filter(function(k){ return HSO.tv[k.kh || k.khoa]!==false; }).map(function(k){ return Object.assign({}, k, {ten:tenHoaDau(k.ten)}); }),   /* 3.449: danh sách theo Mã KH, có tổ trưởng / tổ phó */
        N = hsoNguoiHoi(t), h = T.hoi || '', L = hsoLuu(), hd = function(x){ return x ? tenHoaDau(x) : x; };   /* 3.446 (anh 02/11): tên người viết hoa đầu từ */
      if(!L.nhanh10a3446){ var nh = omNhanh(MK); ['vv', 'dkKy', 'ngayDK', 'tk'].forEach(function(k){ if(nh.indexOf(k)<0) nh.push(k); }); L.nhanh10a3446 = 1; }   /* 3.446: ô mới vào Chọn nhanh (thay 2 ô cũ cột trái) */
      return {T:T, tv:tv, ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, truongAp:hd(T.truongAp), cb:hd(N.cb), cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:hso10aHoi(/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h),
        thuKy:hd(T.pho), tong:tv.length ? String(Math.min(tv.length, HSO_10A_TV)) : '', ngayDK:L.ngayDK, tk:L.tkMin ? tdnTien(hsoSo(L.tkMin)) : '', tt:hd(T.tt), pho:hd(T.pho), ubNgay:HSO.o.ubNgay, capAp:dvAp(t, T), gio:HSO.vay.gio, soNguoi:HSO.vay.soNguoi, tuThang:HSO.vay.tuThang, bq:HSO.vay.bq, ketThuc:HSO.vay.ketThuc,   /* 3.448: ô ✏ gõ trong lần làm (trước gõ ở khai báo không in) */
         capXa:T.xaDu && T.xa ? T.xaDu.slice(0, T.xaDu.length-T.xa.length).trim() || 'xã' : 'xã'};
    },
    lap:function(t){
      var V = this.V(t), G = omG(MK, V, 14), o = function(k, ch, op){ var r = G.o(k, ch, Object.assign({lien:1}, op || {})); return /om-cham/.test(r) ? r : r.replace('<span ', '<span style="font-weight:normal" '); },   /* 3.446 (anh 02/11): có chữ → liền như gõ tay, in thường; trống → giữ chấm */ C = function(k){ return omCach(MK, k)!=='cham'; }, g = function(k, v){ var c = omCach(MK, k); if(c==='cham') return ''; if(DON[k] && (c==='kb' || c==='mau')){ var x = G.gt(k); if(x) return x; } return v!=null ? String(v) : ''; };   /* 3.449.1: ô 1 giá trị — ⌨ tự gõ / 📝 chữ mẫu đè số liệu tự động */
      var hoa = function(x){ return x.charAt(0).toUpperCase()+x.slice(1); }, apL = V.ap ? V.capAp : 'thôn';
      var dvA = function(k, chA, chX, dau){ var ap = g(k, V.ap), xa = g(k, V.xa);   /* có chữ → "Ấp Cây Trắc, xã …" / "Khu phố 3, phường …"; để chấm → giữ gốc "Thôn……, xã……" */
        return (ap ? (dau ? hoa(V.capAp) : V.capAp)+' '+o(k, chA, {gt:ap}) : (dau ? 'Thôn' : 'thôn')+' '+o(k, chA, {gt:''}))+', '+(xa ? V.capXa+' '+o(k, chX, {gt:xa}) : 'xã '+o(k, chX, {gt:''})); };
      /* 3.449.1 (anh 02/11 "chủ trì bị thụt vào"): khung tên text-indent:0 (trước thừa hưởng thụt đầu dòng → thụt gấp đôi); dòng dài → điểm tab lùi về sát tên cho vừa 1 dòng, vẫn dài thì canh trái (không giãn chữ) */
      var TABMM = 95, rongTx = function(h){ return omRong(String(h).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'), 14); };
      var tabVi = function(truoc, sau){ var w1 = 12.7+rongTx(truoc), w2 = rongTx(sau); if(Math.max(w1+4, TABMM)+w2<=159) return Math.max(w1+4, TABMM); return w1+4+w2<=159 ? Math.ceil(w1+4) : TABMM; };
      var tab = function(truoc, sau, v){ v = v || tabVi(truoc, sau); return '<span style="display:inline-block;text-indent:0;min-width:'+(v-12.7).toFixed(1)+'mm">'+truoc+'</span><span class="tab" style="display:inline-block;width:3mm"></span>'+sau; };
      var tabP = function(truoc, sau, st, v0){ var v = v0 || tabVi(truoc, sau), dai = Math.max(v, 12.7+rongTx(truoc)+4)+rongTx(sau) > 159; return P(tab(truoc, sau, v), F+st+(dai ? 'text-align:left;' : J)).replace('<p ', '<p data-tab="'+Math.round(v)+'" '); };   /* 3.449 (anh 02/11): app điền họ tên → "Ông (Bà): tên" ⇥ "Chức vụ: …" */
      var ong = function(k, ch, v){ var gt = g(k, v); return gt ? 'Ông (Bà): '+o(k, ch, {gt:gt}) : 'Ông (Bà) '+o(k, ch, {gt:''}); }, coTen = function(k, v){ return !!g(k, v); };
      var vvTx = 'Về việc '+(vvKT(G.gt('vv')) ? VV[1] : VV[0]), vvCo = omRong(vvTx, 14, true) <= 158 ? 14 : omRong(vvTx, 13, true) <= 158 ? 13 : 0;   /* 3.449: dòng Về việc dài → thu 1 cấp, không vừa → 2 dòng cân */
      var vvHTML = function(){ var x = coChuHTML(vvTx), w = vvTx.split(' '), cat = vvTx.indexOf(' theo ');
        if(!vvCo){ var tu = cat>0 ? vvTx.slice(0, cat).split(' ').length : Math.ceil(w.length/2); x = coChuHTML(w.slice(0, tu).join(' '))+'<br>'+coChuHTML(w.slice(tu).join(' ')); }
        return '<b><span class="om om-kb" data-o="vv">'+x+'</span></b>'; };
      var keW = omRong('BIÊN BẢN HỌP', 15, true).toFixed(1);
      var vIII = Math.max(tabVi('a) '+ong('bqlTT', '', V.tt), 'Chức vụ: Tổ trưởng;'), tabVi('b) '+ong('bqlPho', '', V.pho), 'Chức vụ: Tổ phó.'));   /* III a / b cùng 1 điểm tab → thẳng hàng */
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var nd = ngd('ngay', ['….', '……', '………']), un = ngd('ubNgay', ['......', '........', '.....']);
      var tv = (C('tv') ? V.tv : []).slice(0, HSO_10A_TV), ds = '', R = 'line-height:1.15;';   /* 3.443 (anh 02/11): khung cố định 100 tổ viên (QĐ 70), 3 cột × 34 dòng đánh số dọc theo cột, nằm trang 1–2 — sửa tên không đẩy trang 3–4 */
      for(var i=0;i<HSO_10A_DONG;i++){ ds += '<tr style="height:'+HSO_10A_CAO+'mm">';
        for(var c=0;c<3;c++){ var j = c*HSO_10A_DONG+i, a = tv[j]; var cx = a ? hso10aCo(a.ten) : 14, ndo = (j+1)+'. '+o('tv', '....................................', {gt:a ? a.ten : ''});
          ds += '<td style="padding:0 1.2mm;vertical-align:bottom;overflow:hidden;white-space:nowrap">'+(c===2 && i===HSO_10A_DONG-1 ? P('<b>Tổng số:</b> '+o('tv', '..............', {gt:g('tv', V.tong), canh:'c'})+' <b>tổ viên</b>', R+W) : j<HSO_10A_TV ? P(cx<14 ? '<span class="s'+cx+'">'+ndo+'</span>' : ndo, R+W) : '')+'</td>'; }
        ds += '</tr>'; }
      var hoi = V.hoiLa ? 'Hội '+o('chuTriHoi', '..........', {gt:g('chuTriHoi', V.hoiTen)}) : o('chuTriHoi', 'Hội ..........', {gt:g('chuTriHoi', V.hoiTen)});
      var qu = [
        '1. Tổ TK&amp;VV là tập hợp hộ nghèo và các đối tượng chính sách khác theo quy định của pháp luật, có nhu cầu vay vốn, thực hành tiết kiệm và tham gia hoạt động khác do NHCSXH cung cấp.',
        '2. Tổ TK&amp;VV hoạt động theo nguyên tắc tập thể, biểu quyết theo đa số dưới sự điều hành của Ban quản lý Tổ. Tổ họp định kỳ hằng '+(G.gt('dkKy') ? o('dkKy', '', {}) : 'tháng (quý)')+' vào ngày '+o('ngayDK', '.......', {canh:'c'})+' hoặc đột xuất để giải quyết công việc phát sinh (nếu có). Nội dung họp Tổ do Tổ trưởng chuẩn bị và thống nhất trong Ban quản lý Tổ.',
        '3 Cuộc họp Tổ khi có các nội dung biểu quyết thì phải có sự tham gia chứng kiến của đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã và Trưởng thôn/Tổ trưởng Tổ dân phố, đồng thời phải có trên 1/2 số tổ viên của Tổ tham gia họp và có trên 2/3 số tổ viên tham gia họp biểu quyết tán thành mới có giá trị thực hiện. ',
        'Các nội dung họp Tổ phải biểu quyết bao gồm: Thành lập Tổ; bầu, thay đổi Tổ trưởng hoặc Tổ phó; sửa đổi Quy ước hoạt động của Tổ; kết nạp tổ viên; bình xét cho vay; bắt buộc tổ viên ra khỏi Tổ khi không thực hiện đúng Quy ước hoạt động của Tổ. Nội dung cuộc họp Tổ được lập thành biên bản và được thông qua trước khi kết thúc cuộc họp.',
        '4. Điều hành hoạt động của Tổ là Ban quản lý Tổ do các tổ viên trong Tổ bầu chọn. Ban quản lý Tổ gồm Tổ trưởng và Tổ phó, đáp ứng các tiêu chuẩn quy định tại khoản 2 Điều 8 Quyết định số 70/QĐ-HĐQT.',
        'Ban quản lý Tổ phối hợp, giám sát lẫn nhau để điều hành hoạt động của Tổ thực hiện nhiệm vụ quy định tại Quy chế hoạt động Tổ và Quy ước hoạt động được Tổ thông qua, thực hiện các nội dung công việc theo hợp đồng ủy nhiệm ký với NHCSXH. Trong đó, nhiệm vụ cụ thể như sau: ',
        'a) Tổ trưởng chịu trách nhiệm điều hành hoạt động của Tổ theo Quy ước hoạt động của Tổ và thực hiện nhiệm vụ, trách nhiệm của Ban quản lý Tổ; triệu tập và chủ trì các cuộc họp; ký hợp đồng ủy nhiệm với NHCSXH; giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch; có trách nhiệm thanh toán số tiền hoa hồng được NHCSXH chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.',
        'b) Tổ phó ghi chép biên bản các cuộc họp; giúp việc cho Tổ trưởng, điều hành và giải quyết các công việc của Tổ khi được Tổ trưởng phân công; thay mặt Tổ trưởng giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch khi Tổ trưởng vắng mặt. ',
        ['5. Các tổ viên trong Tổ cam kết thực hiện tốt các nội dung sau:', 1],
        ['a) Tham gia đầy đủ và biểu quyết tại các cuộc họp Tổ; tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm,... để nâng cao trình độ sản xuất kinh doanh.', 1],
        ['b) Sử dụng vốn vay đúng mục đích đề nghị vay, có hiệu quả. Có nghĩa vụ trả nợ (gốc, lãi) đầy đủ, đúng kỳ hạn đã thoả thuận với NHCSXH. ', 1],
        ['c) Thực hành tiết kiệm và gửi vào NHCSXH theo định kỳ hằng tháng với mức tối thiểu là '+o('tk', '......................')+' đồng/tổ viên kể từ tháng '+
          o('tuThang', '.......', {canh:'c'})+'/'+o('tuThang', '..........', {gt:''})+' hoặc khi Tổ họp thống nhất thay đổi. Trường hợp tổ viên gặp khó khăn không thực hiện được theo mức tối thiểu thì thực hiện theo nhu cầu và khả năng thực tế.', 1],
        ['d) Mỗi tổ viên cam kết tương trợ giúp đỡ nhau, trao đổi kinh nghiệm trong sản xuất, kinh doanh và đời sống; có trách nhiệm giám sát lẫn nhau trong việc vay vốn, sử dụng vốn vay, trả nợ (gốc, lãi) NHCSXH và thực hiện nghiêm túc Quy ước hoạt động của Tổ.', 1],
        'đ) Trường hợp Ban quản lý Tổ được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên trong Tổ hoàn toàn nhất trí để Ban quản lý Tổ thu tiền để nộp cho NHCSXH. Riêng việc trả nợ gốc, tổ viên phải thực hiện trả nợ gốc trực tiếp cho Ngân hàng tại điểm giao dịch hoặc trụ sở NHCSXH nơi cho vay; hoặc trả nợ gốc bằng chuyển khoản vào tài khoản thanh toán của tổ viên mở tại NHCSXH để Ngân hàng thu nợ theo quy định.',
        'Mỗi lần nộp tiền cho Tổ trưởng, tổ viên ký vào Bảng kê thu tiền ngay khi nộp tiền cho Tổ trưởng; đồng thời, nhận lại Biên lai thu tiền, tiến hành kiểm tra, đối chiếu về số tiền gốc, số tiền lãi còn nợ, số dư tài khoản Tổ viên đã được in trên Biên lai và thông báo cho NHCSXH nếu có chênh lệch. ',
        ['e) Trường hợp Ban quản lý Tổ không được NHCSXH ủy nhiệm thu tiền lãi, tiền gửi của các tổ viên, toàn bộ tổ viên có trách nhiệm chuyển khoản, nộp tiền vào tài khoản thanh toán của tổ viên mở tại NHCSXH nơi cho vay, bảo đảm số dư trước ngày đến hạn để Ngân hàng thu nợ theo quy định và đối chiếu kết quả giao dịch, thông báo nợ đến hạn kỳ tiếp theo do NHCSXH gửi đến. ', 2],
        'g) Tổ viên phải lưu giữ đầy đủ các loại sổ sách, giấy tờ sau:', ['- Sổ vay vốn/Hợp đồng tín dụng.  ', 1],
        '- Biên lai thu tiền có chữ ký của Tổ trưởng (người thu tiền) để làm cơ sở chứng minh cho số tiền đã nộp (trường hợp nộp tiền cho Ban quản lý Tổ). ',
        '- Cài đặt ứng dụng do NHCSXH cung cấp để theo dõi biến động số dư tiền gửi, tiền vay, kết quả giao dịch trong kỳ và nợ đến hạn kỳ tiếp theo được Ngân hàng gửi đến.'];
      var h = '<div style="position:relative;height:0"><div style="position:absolute;right:0;top:0;line-height:1.15">'+P('<b><i>Mẫu số: 10A/TD</i></b>', 'text-align:right;font-size:11pt')+P('<i>Lập 02 liên:</i>', 'text-align:right;font-size:11pt')+
          P('<i>- 01 liên lưu NH </i>', 'text-align:right;font-size:11pt')+P('<i> - 01 liên lưu Tổ</i>', 'text-align:right;font-size:11pt')+'</div></div>'+   /* gốc: hộp chữ nằm trên lề trên */
        P('<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>', 'text-align:center;font-size:13pt;padding-right:6mm')+P('<b>Độc lập - Tự do - Hạnh phúc</b>', 'text-align:center')+
        '<p class="ke" data-ke="60" style="width:60mm;margin:0.5pt auto 0"></p>'+P('&nbsp;', 'line-height:1.15;height:6mm')+
        P('<b>BIÊN BẢN HỌP</b>', 'text-align:center;font-size:15pt').replace('<p ', '<p class="s15" ')+P(vvHTML(), 'text-align:center'+(vvCo===13 ? ';font-size:13pt' : '')).replace('<p ', vvCo===13 ? '<p class="s13" ' : '<p ')+'<p class="ke" data-ke="'+keW+'" style="width:'+keW+'mm;margin:4pt auto 0"></p>'+P('&nbsp;', 'line-height:10pt')+
        P('<b>Thời gian bắt đầu:</b> '+o('gio', '…….', {canh:'c'})+' giờ '+o('gio', '……', {gt:''})+', ngày '+nd[0]+'/'+nd[1]+'/'+nd[2], J+F+H15)+
        P('<b>Địa điểm:</b> '+dvA('diaDiem', '………….……', '……….………', 1)+', tỉnh '+o('diaDiem', '…………...……', {gt:g('diaDiem', V.tinh)}), J+F+H15)+
        P('<b>Thành phần tham dự: </b>', J+F+H15)+
        P('- '+o('soNguoi', '………', {canh:'c'})+' người là đại diện hộ gia đình cùng cư trú tại địa bàn '+dvA('diaBan2', '…………...………...', '…………………….')+', tỉnh '+o('diaBan2', '………………………………', {gt:g('diaBan2', V.tinh)}), J+F+H15)+
        P('- '+ong('truongAp', '....................................', V.truongAp)+' là Trưởng '+apL+', chứng kiến cuộc họp', J+F+H15)+
        (coTen('chuTri', V.cb) ? tabP('<b>Chủ trì</b>: '+ong('chuTri', '...................................', V.cb), 'Chức vụ: '+o('chuTriCv', '..............................', {gt:g('chuTriCv', V.cv)})+' '+hoi+'.', H15)
          : P('<b>Chủ trì</b>: Ông (Bà) '+o('chuTri', '...................................', {gt:''})+' Chức vụ '+o('chuTriCv', '..............................', {gt:g('chuTriCv', V.cv)})+' '+hoi+'.', J+F+H15))+
        P('<b>Thư ký:</b> '+ong('thuKy', '............................................', V.thuKy)+' là đại diện hộ gia đình.', J+F+H15)+
        P('<b>Nội dung cuộc họp:</b>', F+H15)+
        P('Các đại diện hộ gia đình và cá nhân trực tiếp thuộc đối tượng vay vốn tự nguyện họp để '+
          (vvKT(G.gt('vv')) ? 'kiện toàn hoạt động của' : 'thành lập')+' Tổ Tiết kiệm và vay vốn (TK&amp;VV) theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị Ngân hàng Chính sách xã hội (NHCSXH) về Quy chế hoạt động Tổ TK&amp;VV. Sau khi thảo luận, các thành viên dự họp thống nhất các nội dung sau:', J+F+H15)+
        P('<b>I. DANH SÁCH TỔ VIÊN</b>', J+F+'margin-top:4pt')+
        '<table class="khung0 tv100" data-w="1,1,1" data-cao="'+HSO_10A_CAO+'" style="width:161.5mm;table-layout:fixed"><colgroup><col style="width:33.33%"><col style="width:33.33%"><col style="width:33.34%"></colgroup>'+ds+'</table>'+
        P('<b>II. QUY ƯỚC HOẠT ĐỘNG CỦA TỔ TK&amp;VV</b>', J+F+H17).replace('<p ', '<p class="kt-b" ')+
        qu.map(function(x){ var c = Array.isArray(x) ? x[1] : 0, s = Array.isArray(x) ? x[0] : x; return P(s, J+F+H17); }).join('')+
        P('<b>III. BẦU BAN QUẢN LÝ CỦA TỔ TK&amp;VV</b>', J+F+H17).replace('<p ', '<p class="kt-b" ')+
        P('1. Các tổ viên dự họp thống nhất bầu Ban quản lý Tổ gồm các Ông (Bà) có tên dưới đây:', J+F+H17)+
        (coTen('bqlTT', V.tt) ? tabP('a) '+ong('bqlTT', '', V.tt), 'Chức vụ: Tổ trưởng;', H17, vIII) : P('a) Ông (Bà) '+o('bqlTT', '..................................................................', {gt:''})+' Chức vụ: Tổ trưởng;', J+F+H17))+
        (coTen('bqlPho', V.pho) ? tabP('b) '+ong('bqlPho', '', V.pho), 'Chức vụ: Tổ phó.', H17, vIII) : P('b) Ông (Bà) '+o('bqlPho', '..................................................................', {gt:''})+' Chức vụ: Tổ phó.', J+F+H17))+
        P('2. Ban quản lý Tổ thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT và các quy định liên quan của NHCSXH.', J+F+H17)+
        P('<b>IV. KẾT QUẢ BIỂU QUYẾT</b>', J+F+H17).replace('<p ', '<p class="kt-b" ')+
        P(o('bq', '......', {canh:'c'})+'/'+o('bq', '......', {gt:''})+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung: Danh sách tổ viên, Quy ước hoạt động của Tổ TK&amp;VV và Bầu Ban quản lý Tổ TK&amp;VV. ', J+F+H17)+
        P('Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận hoạt động của Tổ TK&amp;VV tại địa phương.', J+F+H17)+
        P('Cuộc họp kết thúc vào '+o('ketThuc', '........', {canh:'c'})+' giờ '+o('ketThuc', '......', {gt:''})+', ngày '+o('ketThuc', '.....', {gt:''})+'/'+o('ketThuc', '.......', {gt:''})+'/'+o('ketThuc', '...........', {gt:''})+'/.', J+F+H17)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:50.6mm"><col style="width:52.8mm"><col style="width:56.6mm"></colgroup><tr style="height:11.2mm">'+
          [['THƯ KÝ', '(Ký, ghi rõ họ tên)', ''], ['TRƯỞNG '+apL.toUpperCase(), '(Ký, ghi rõ họ tên)', V.truongAp], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', V.cb]].map(function(x){ return '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>'+x[0]+'</b>', 'text-align:center')+P('<i>'+x[1]+'</i>', 'text-align:center')+'</td>'; }).join('')+'</tr></table>'+
        [1, 2, 3, 4, 5, 6].map(function(i){ return i===5 ? '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:50.6mm"><col style="width:52.8mm"><col style="width:56.6mm"></colgroup><tr><td></td><td>'+P('<b>'+o('kyTA', '&nbsp;', {gt:g('kyTA', V.truongAp), rong:48, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td><td>'+P('<b>'+o('kyCT', '&nbsp;', {gt:g('kyCT', V.cb), rong:52, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td></tr></table>' : P('&nbsp;', 'line-height:18pt'); }).join('')+
        P('<b>PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ</b>', 'text-align:center;line-height:18pt')+
        P('Chấp thuận cho Tổ TK&amp;VV tại '+dvA('ubDiaBan', '…....................................', '…..........................................')+', tỉnh '+o('ubDiaBan', '..........................................', {gt:g('ubDiaBan', V.tinh)})+
          ' do Ông (Bà) '+o('ubTT', '....................................................................…….', {gt:g('ubTT', V.tt)})+' làm Tổ trưởng và Ông (Bà) '+o('ubPho', '.............................................................................', {gt:g('ubPho', V.pho)})+' làm Tổ phó được thành lập, hoạt động theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV.', J+F+H15)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:45.7%"><col style="width:54.3%"></colgroup><tr><td></td><td style="padding:0 1.9mm">'+
          P('<i>Ngày'+un[0]+'tháng'+un[1]+'năm '+un[2]+'</i>', 'text-align:center')+P('<b>UBND CẤP XÃ</b>', 'text-align:center')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center')+'</td></tr></table>'+'';   /* 3.443.1: chừa chỗ UBND ký, đóng dấu (cả mẫu vẫn 4 trang) */
      return {ma:'10A/TD', h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10a = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([15, 20, 15, 30]);   /* 3.443.1: tiêu đề mục II–IV class kt-b → bộ chia trang kéo theo đoạn sau (không treo cuối trang) · (anh 02/11 "giảm lề, giãn dòng dư" → 4 trang): lề trên / dưới 20 → 15 mm */
})();
