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
  function P2(a, b, st, st2){ return P(a, st+W+TL+'margin-bottom:0;')+P(b, (st2||'')+W+';margin-top:0;'); }
  /* 3.449 (anh 02/11): Hội ở dòng Chủ trì chỉ ghi tên Hội, bỏ xã / phường */
  function hso10aDong(dau, vvCo){ var n = 0; dau.forEach(function(h){ var tx = String(h).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/[.…]{6,}/g, function(m){ return m.slice(0, Math.ceil(m.length*0.85)); });   /* 3.454: ước số dòng phần đầu trang 1 (chữ 14, rộng 160 mm, thụt 12,7; chuỗi chấm tính 85 % vì chấm co giãn) */
    n += /data-tab=/.test(h) && !/text-align:left/.test(h) ? 1 : Math.max(1, Math.ceil((12.7+omRong(tx, 14))/157)); }); return n+(vvCo ? 0 : 1); }
  /* 3.460 (anh 03/11 "đưa 10A về HST"): số tham dự / biểu quyết / tỷ lệ dùng chung HST (js/mau/0hst.js) — tỷ lệ nhớ hsoLuu().tlHop['10a'][du | bq];
     chuyển 1 lần từ chỗ cũ hsoLuu().tl10a / tl10aBq (3.456). Giữ tên hàm hso10aThamDu / hso10aBq / hso10aTlHTML cho chỗ gọi cũ. */
  function chuyenTl(){ var L = hsoLuu(); if(L.tl10aHST) return; L.tl10aHST = 1; var h = (L.tlHop = L.tlHop || {})[MK] = (L.tlHop || {})[MK] || {};
    if(L.tl10a!=null && h.du==null) h.du = L.tl10a; if(L.tl10aBq!=null && h.bq==null) h.bq = L.tl10aBq; delete L.tl10a; delete L.tl10aBq; }
  hso10aThamDu = function(n){ chuyenTl(); return n ? String(HST.so(n, HST.tl(MK, 'du'), 1/2)) : ''; };
  hso10aBq = function(yTu){ chuyenTl(); return HST.bq(MK, 'soNguoi', yTu); };
  hso10aTlHTML = function(k){ chuyenTl(); return HST.tlHTML(MK, k==='tl10aBq' ? 'bq' : 'du'); };
  function regUb(){ if(regUb.dk || typeof GD==='undefined') return; regUb.dk = 1; GD.dangKy('h10t', {ub:function(el){ hso10aUbDat(el.getAttribute('data-c')); }}); }
  hso10aTen = function(){ try { var t = KHO.to(hsoCH().to); return t ? hso10aDs(t).map(function(x){ return tenHoaDau(x.ten); }).filter(Boolean) : []; } catch(e){ return []; } };   /* III: chọn người được bầu trong tổ */
  var UB_TEN = ['ubTT', 'ubPho', 'ubNgay'];   /* 3.459 (anh 03/11 "đổi tên cả phần dễ hiểu nhầm"): nút chỉ áp tên Tổ trưởng, Tổ phó, ngày — địa chỉ phê duyệt chọn riêng từng dòng */
  hso10aUbNut = function(){ regUb(); var cham = UB_TEN.every(function(k){ return omCachLuu(MK, k)==='cham'; });
    return '<div class="hso-cham-o"><span class="hso-cham-nhan">Phê duyệt UBND — Tên Tổ trưởng, Tổ phó, ngày</span><span class="hso-sw"><button class="'+(cham ? 'bat' : '')+'" data-lenh="h10t.ub" data-c="cham" title="Để chấm tên Tổ trưởng, Tổ phó và ngày phê duyệt (UBND ghi tay)">✍ chấm</button>'+
      '<button class="'+(cham ? '' : 'bat')+'" data-lenh="h10t.ub" data-c="in" title="App điền tên Tổ trưởng / Tổ phó (theo III) và ngày">🤖 tự điền</button></span></div>'; };
  function hso10aUbDat(c){ var L = hsoLuu(); L.cham = L.cham || {}; var T = L.cham[MK] = L.cham[MK] || {}; UB_TEN.forEach(function(k){ var x = OM_MAU[MK].oK[k]; T[k] = c==='cham' ? 'cham' : (OM_LOAI[x.l] || ['cham'])[1] || 'cham'; }); luu(); hsoVe(); }
  /* 3.449 (anh 02/11 "mỗi dòng cho chọn tự động hay chấm ghi tay"): tách ô gộp — cách đã chọn ở ô cũ chuyển sang ô con (1 lần) */
  function hso10aTach(){ var L = hsoLuu(); if(L.tach10a3449) return; L.tach10a3449 = 1; var c = (L.cham||{})[MK] || {}, nh = (L.nhanh||{})[MK];
    var map = {diaDiem:['diaBan2'], chuTri:['chuTriCv', 'chuTriHoi'], bql:['bqlTT', 'bqlPho'], ub:['ubDiaBan', 'ubTT', 'ubPho'], ky:['kyTA', 'kyCT']};
    Object.keys(map).forEach(function(k){ map[k].forEach(function(z){ if(c[k] && !c[z]) c[z] = c[k]; if(Array.isArray(nh) && nh.indexOf(k)>=0 && nh.indexOf(z)<0 && k!=='diaDiem' && k!=='chuTri') nh.push(z); }); });
    if(Array.isArray(nh)) ['bql', 'ub', 'ky'].forEach(function(k){ var i = nh.indexOf(k); if(i>=0) nh.splice(i, 1); }); }
  /* 3.449 (anh 02/11 "chọn tổ hiện bảng danh sách hộ vay, theo mã KH, dư nợ — loại hộ dư nợ = 0; phải có tên tổ trưởng, tổ phó; in theo mã KH, mặc định tích hết")
     → 3.460: dùng chung HST.ds (tổ viên KHO + TT / TP theo File Tổ trưởng, sắp Mã KH, kèm ấp) */
  hso10aDs = function(t){ return HST.ds(t); };
  /* 3.449: bảng hộ vay của tổ ở cột trái — ☑ in vào 10A · Mã KH · họ tên (TT / TP) · dư nợ · ghi chú; mặc định tích hết
     → 3.460: dùng chung HST.bang như 10B / 10C (lọc ấp, tìm, Tích hết / Bỏ hết, bỏ tích hộ dư nợ = 0); giữ dòng tổng hộ đã tích + dư nợ */
  hso10aBang = function(t, ds){ ds.forEach(function(x){ var k = HST.khoa(x); if(HSO.tv[k]===undefined) HSO.tv[k] = true; });
    var chon = ds.filter(function(x){ return HSO.tv[HST.khoa(x)]!==false; }), tong = chon.reduce(function(a, x){ return a+(x.dn||0); }, 0);
    return HST.bang(t, ds, [{ma:'in', ten:'In', bang:HSO.tv, bo0:1}], {tieu:'Hộ vay của tổ', cuoi:'<div class="sl-phu"><b>'+chon.length+'</b>/'+ds.length+' hộ tích in vào 10A · dư nợ <b>'+tdnTien(tong)+'</b></div>'}); };
  var DON = {truongAp:1, chuTri:1, chuTriCv:1, chuTriHoi:1, thuKy:1, bqlTT:1, bqlPho:1, ubTT:1, ubPho:1, kyTA:1, kyCT:1, soNguoi:1, bq:1, tk:1, kyTK:1};   /* ô chỉ 1 giá trị (tự gõ được) */
  var VV = ['thành lập Tổ Tiết kiệm và vay vốn', 'kiện toàn hoạt động của Tổ TK&VV theo Quyết định số 70/QĐ-HĐQT'];   /* 3.446 (anh 02/11): Về việc · 3.448 (anh 02/11, VB 4336/HD-NHCS): "Củng cố" → "Kiện toàn": tiêu đề + câu nội dung cuộc họp */
  function vvKT(v){ return /^(kiện toàn|củng cố)/i.test(String(v||'')); }   /* giá trị cũ "củng cố …" (3.446–3.447) đọc như kiện toàn */
  omDangKy({k:MK, ma:'10A/TD', phan:['to', 'hoi', 'ub', 'ky'], co:14,
    dien:[['het', 'Điền hết'], ['chuaUB', 'Chừa phê duyệt UBND'], ['tuy', 'Tùy chọn']],   /* 3.448: khối Nhập liệu riêng 10A (không có phần Ngân hàng) */
    phanTen:{to:'Thông tin cuộc họp, tổ viên, quy ước, Ban quản lý', hoi:'Chủ trì (Hội)', ub:'Phê duyệt UBND', ky:'Ngày, họ tên dưới chữ ký'},
    o:[{k:'vv', n:'Về việc (dòng tiêu đề)', p:'to', l:'chon', md:'kb', chon:VV, chonMD:1, chonNgan:function(z){ return vvKT(z) ? 'Kiện toàn' : 'Thành lập'; }, nhanh:1},
      {k:'gio', n:'Thời gian bắt đầu: … giờ …', p:'to', l:'go', md:'cham'},
      {k:'ngay', n:'Ngày họp', p:'to', l:'go', md:'cham', ngay:1, nhanh:1, ui:function(){ return hsoIn('HSO.o.ngay=this.value;hsoHen()', HSO.o.ngay || '', '', 'date'); }},
      {k:'diaDiem', n:'Địa điểm: thôn · xã · tỉnh', p:'to', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh'},
      {k:'soNguoi', n:'- … người là đại diện hộ gia đình (số tham dự)', p:'to', l:'tu', md:'tu', ng:'số tổ viên × tỷ lệ tham dự (> 50%, mặc định 100%)', nhanh:1, tuUi:function(){ return hso10aTlHTML('tl10a'); }},
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
      {k:'bqlTT', n:'III.a) Ông (Bà) … Chức vụ: Tổ trưởng', p:'to', l:'tu', md:'tu', goiY:function(){ return hso10aTen(); }, ng:'tổ — Mẫu 31 / File Tổ trưởng'},
      {k:'bqlPho', n:'III.b) Ông (Bà) … Chức vụ: Tổ phó', p:'to', l:'tu', md:'tu', goiY:function(){ return hso10aTen(); }, ng:'File Tổ trưởng / ⚙ khai báo tổ phó'},
      {k:'bq', n:'IV. …/… tổ viên biểu quyết tán thành', p:'to', l:'tu', md:'tu', ng:'số tán thành / số tham dự (tán thành > 2/3, mặc định 100%)', nhanh:1, tuUi:function(){ return hso10aTlHTML('tl10aBq'); }},
      {k:'ketThuc', n:'Kết thúc vào … giờ … ngày …', p:'to', l:'go', md:'cham'},
      {k:'ubAp', n:'Phê duyệt UBND — Địa chỉ: thôn / ấp / khu phố', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31', nhanh:1},   /* 3.459 (anh 03/11 "chia ra, không làm chung cả cụm") */
      {k:'ubXa', n:'Phê duyệt UBND — Địa chỉ: xã / phường', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31', nhanh:1},
      {k:'ubTinh', n:'Phê duyệt UBND — Địa chỉ: tỉnh', p:'ub', l:'tu', md:'tu', ng:'tổ — Mẫu 31 / ⚙ PGD › tỉnh', nhanh:1},
      {k:'ubTT', n:'Phê duyệt UBND: Ông (Bà) … làm Tổ trưởng', p:'ub', l:'tu', md:'tu', ng:'theo III.a (người được bầu)'},
      {k:'ubPho', n:'Phê duyệt UBND: Ông (Bà) … làm Tổ phó', p:'ub', l:'tu', md:'tu', ng:'theo III.b (người được bầu)'},
      {k:'ubVv', n:'Phê duyệt UBND: "được thành lập" / "được kiện toàn"', p:'ub', l:'chon', md:'kb', chon:['Theo Về việc', 'Luôn "thành lập"'], chonMD:1, nhanh:1},   /* 3.458 (anh 03/11 "đổi luôn, hay cho nút bật đổi hay không") */
      {k:'ubNgay', n:'Phê duyệt UBND: ngày … tháng … năm', p:'ub', l:'go', md:'cham', ngay:1, ui:function(){ return hsoIn('HSO.o.ubNgay=this.value;hsoHen()', HSO.o.ubNgay || '', '', 'date'); }},
      {k:'kyTK', n:'Họ tên dưới chữ ký Thư ký', p:'ky', l:'tu', md:'tu', ng:'theo dòng Thư ký ở trên'},   /* 3.459 (anh 03/11): dưới chữ ký theo dòng trên — trên chấm → trống */
      {k:'kyTA', n:'Họ tên dưới chữ ký Trưởng thôn', p:'ky', l:'tu', md:'tu', ng:'theo dòng Trưởng ấp ở trên'},
      {k:'kyCT', n:'Họ tên dưới chữ ký Chủ trì', p:'ky', l:'tu', md:'tu', ng:'theo dòng Chủ trì ở trên'}],
    V:function(t){
      hso10aTach();
      var T = hsoTo(t), tv = hso10aDs(t).filter(function(k){ return HSO.tv[k.kh || k.khoa]!==false; }).map(function(k){ return Object.assign({}, k, {ten:tenHoaDau(k.ten)}); }),   /* 3.449: danh sách theo Mã KH, có tổ trưởng / tổ phó */
        N = hsoNguoiHoi(t), h = T.hoi || '', L = hsoLuu(), hd = function(x){ return x ? tenHoaDau(x) : x; };   /* 3.446 (anh 02/11): tên người viết hoa đầu từ */
      if(!L.nhanh10a3446){ var nh = omNhanh(MK); ['vv', 'dkKy', 'ngayDK', 'tk'].forEach(function(k){ if(nh.indexOf(k)<0) nh.push(k); }); L.nhanh10a3446 = 1; }
      if(!L.nhanh10a3456){ var nh2 = omNhanh(MK); ['soNguoi', 'bqlTT', 'bqlPho', 'bq'].forEach(function(k){ if(nh2.indexOf(k)<0) nh2.push(k); }); L.nhanh10a3456 = 1; }
      if(!L.tach10a3459){ var cc = (L.cham || {})[MK] || {}, nh4 = omNhanh(MK);   /* 3.459: ô cũ ubDiaBan → 3 ô; cách đã chọn giữ cho cả 3; vào Chọn nhanh */
        if(cc.ubDiaBan){ ['ubAp', 'ubXa', 'ubTinh'].forEach(function(k){ if(!cc[k]) cc[k] = cc.ubDiaBan; }); delete cc.ubDiaBan; }
        var iD = nh4.indexOf('ubDiaBan'); if(iD>=0) nh4.splice(iD, 1); ['ubAp', 'ubXa', 'ubTinh'].forEach(function(k){ if(nh4.indexOf(k)<0) nh4.push(k); }); L.tach10a3459 = 1; }
      if(!L.nhanh10a3458){ var nh3 = omNhanh(MK); if(nh3.indexOf('ubVv')<0) nh3.push('ubVv'); L.nhanh10a3458 = 1; }   /* 3.458: chữ phê duyệt theo Về việc ra Chọn nhanh */   /* 3.456: số tham dự, III, IV ra Chọn nhanh */   /* 3.446: ô mới vào Chọn nhanh (thay 2 ô cũ cột trái) */
      return {T:T, tv:tv, ngay:HSO.o.ngay, ap:T.ap, xa:T.xa, tinh:T.tinh, truongAp:hd(T.truongAp), cb:hd(N.cb), cv:N.cv, hoiLa:/^Hội\s/i.test(h) || !h, hoiTen:HST.hoi(/^Hội\s/i.test(h) || !h ? hsoBoHoi(h) : h),
        thuKy:hd(T.pho), tong:tv.length ? String(Math.min(tv.length, HSO_10A_TV)) : '', ngayDK:L.ngayDK, tk:L.tkMin ? tdnTien(hsoSo(L.tkMin)) : '', tt:hd(T.tt), pho:hd(T.pho), bqlTT:hd(T.tt), bqlPho:hd(T.pho), ubNgay:HSO.o.ubNgay, capAp:HST.capAp(t, T), gio:HSO.vay.gio, soNguoi:hso10aThamDu(Math.min(tv.length, HSO_10A_TV)), tuThang:HSO.vay.tuThang, bq:hso10aBq(hso10aThamDu(Math.min(tv.length, HSO_10A_TV))), ketThuc:HSO.vay.ketThuc,   /* 3.448: ô ✏ gõ trong lần làm (trước gõ ở khai báo không in) */
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
      var chamMM = function(mm){ var w = omRong('.', 14) || 1; return new Array(Math.max(6, Math.floor(mm/w))+1).join('.'); };   /* 3.459: dãy chấm dài mm */
      var chamDay = function(truoc, sau){ return chamMM(159.5-12.7-rongTx(truoc+' '+sau)-2.5); };   /* chấm kín dòng (dòng để ghi tay) */
      var vIII = Math.max(tabVi('a) '+ong('bqlTT', '', V.tt), 'Chức vụ: Tổ trưởng;'), tabVi('b) '+ong('bqlPho', '', V.pho), 'Chức vụ: Tổ phó.'));   /* III a / b cùng 1 điểm tab → thẳng hàng */
      var ngd = function(k, ds){ var x = hsoNg(G.gt(k)), p = x ? [x.d, x.m, x.y] : ['', '', '']; return ds.map(function(ch, i){ return o(k, ch, {gt:p[i], canh:'c'}); }); };
      var bqP = String(g('bq', V.bq) || '').split('/');   /* 3.456: IV "tán thành / tham dự" */
      var nd = ngd('ngay', ['….', '……', '………']), un = ngd('ubNgay', ['......', '........', '.....']);
      var tv = (C('tv') ? V.tv : []).slice(0, HSO_10A_TV), R = 'line-height:1.15;';   /* 3.443 (anh 02/11): khung cố định 100 tổ viên (QĐ 70), 3 cột × 34 dòng đánh số dọc theo cột, nằm trang 1–2 — sửa tên không đẩy trang 3–4 */
      var hoi = V.hoiLa ? 'Hội '+o('chuTriHoi', '..........', {gt:g('chuTriHoi', V.hoiTen)}) : o('chuTriHoi', 'Hội ..........', {gt:g('chuTriHoi', V.hoiTen)});
      var dau = [
        P('<b>Thời gian bắt đầu:</b> '+o('gio', '…….', {canh:'c'})+' giờ '+o('gio', '……', {gt:''})+', ngày '+nd[0]+'/'+nd[1]+'/'+nd[2], J+F+H15),
        P('<b>Địa điểm:</b> '+dvA('diaDiem', '………….……', '……….………', 1)+', tỉnh '+o('diaDiem', '…………...……', {gt:g('diaDiem', V.tinh)}), J+F+H15),
        P('<b>Thành phần tham dự: </b>', J+F+H15),
        P('- '+o('soNguoi', '………', {canh:'c'})+' người là đại diện hộ gia đình cùng cư trú tại địa bàn '+dvA('diaBan2', '…………...………...', '…………………….')+', tỉnh '+o('diaBan2', '………………………………', {gt:g('diaBan2', V.tinh)}), J+F+H15),
        (coTen('truongAp', V.truongAp) ? P('- '+ong('truongAp', '', V.truongAp)+' là Trưởng '+apL+', chứng kiến cuộc họp', J+F+H15)
          : P('- Ông (Bà) '+o('truongAp', chamDay('- Ông (Bà)', 'là Trưởng '+apL+', chứng kiến cuộc họp'), {gt:''})+' là Trưởng '+apL+', chứng kiến cuộc họp', J+F+H15+W+TL)),   /* 3.459 (anh 03/11): để chấm → chấm kín dòng */
        (coTen('chuTri', V.cb) ? tabP('<b>Chủ trì</b>: '+ong('chuTri', '...................................', V.cb), 'Chức vụ: '+o('chuTriCv', '..............................', {gt:g('chuTriCv', V.cv)})+' '+hoi+'.', H15)
          : P('<b>Chủ trì</b>: Ông (Bà) '+o('chuTri', '...................................', {gt:''})+' Chức vụ '+o('chuTriCv', '..............................', {gt:g('chuTriCv', V.cv)})+' '+hoi+'.', J+F+H15)),
        (coTen('thuKy', V.thuKy) ? P('<b>Thư ký:</b> '+ong('thuKy', '', V.thuKy)+' là đại diện hộ gia đình.', J+F+H15)
          : P('<b>Thư ký:</b> Ông (Bà) '+o('thuKy', chamDay('Thư ký: Ông (Bà)', 'là đại diện hộ gia đình.'), {gt:''})+' là đại diện hộ gia đình.', J+F+H15+W+TL)),
        P('<b>Nội dung cuộc họp:</b>', F+H15),
        P('Các đại diện hộ gia đình và cá nhân trực tiếp thuộc đối tượng vay vốn tự nguyện họp để '+
          (vvKT(G.gt('vv')) ? 'kiện toàn hoạt động của' : 'thành lập')+' Tổ Tiết kiệm và vay vốn (TK&amp;VV) theo quy định tại Quyết định số 70/QĐ-HĐQT ngày 27/8/2026 của Hội đồng quản trị Ngân hàng Chính sách xã hội (NHCSXH) về Quy chế hoạt động Tổ TK&amp;VV. Sau khi thảo luận, các thành viên dự họp thống nhất các nội dung sau:', J+F+H15)];
      /* 3.454 (anh 02/11 "khóa cứng trang 3–4; trang 1–2 dài ra thì bù, ít khi tổ đủ 100"): phần đầu trang 1 dư dòng (tên dài, địa bàn dài, Về việc 2 dòng) → bớt hàng khung tổ viên (còn đủ ô cho tổ);
         tổ gần đủ 100 / khung để chấm không bớt được → thu chiều cao hàng. Trang 3 luôn bắt đầu "b) Tổ phó", trang 4 luôn "III." — lớp tr-sang-in: khung chia trang bản in nhận (\btr-sang\b), Word bỏ qua
         (Word mẫu nền ô chưa theo canh / cỡ chữ của bản in → khóa ngắt trong Word thành 5 trang; giữ Word như cũ) */
      var DU = Math.max(0, hso10aDong(dau, vvCo)-HSO_10A_DAU), DONG = HSO_10A_DONG, CAO = HSO_10A_CAO, bot = C('tv') ? Math.max(0, Math.min(DU, HSO_10A_DONG-Math.ceil((tv.length+1)/3))) : 0;
      DONG -= bot; if(DU>bot){ CAO = Math.max(4.9, +(HSO_10A_CAO-(DU-bot)*6.1/DONG).toFixed(2)); if(CAO<5.7) R = 'line-height:1;'; }
      var ds = '';
      for(var i=0;i<DONG;i++){ ds += '<tr style="height:'+CAO+'mm">';
        for(var c=0;c<3;c++){ var j = c*DONG+i, a = tv[j]; var cx = a ? hso10aCo(a.ten) : 14, ndo = (j+1)+'. '+o('tv', '....................................', {gt:a ? a.ten : ''});
          ds += '<td style="padding:0 1.2mm;height:'+CAO+'mm;vertical-align:bottom;overflow:hidden;white-space:nowrap">'+(c===2 && i===DONG-1 ? P('<b>Tổng số:</b> '+o('tv', '..............', {gt:g('tv', V.tong), canh:'c'})+' <b>tổ viên</b>', R+W) : j<HSO_10A_TV ? P(cx<14 ? '<span class="s'+cx+'">'+ndo+'</span>' : ndo, R+W) : '')+'</td>'; }
        ds += '</tr>'; }
      var qu = [
        '1. Tổ TK&amp;VV là tập hợp hộ nghèo và các đối tượng chính sách khác theo quy định của pháp luật, có nhu cầu vay vốn, thực hành tiết kiệm và tham gia hoạt động khác do NHCSXH cung cấp.',
        '2. Tổ TK&amp;VV hoạt động theo nguyên tắc tập thể, biểu quyết theo đa số dưới sự điều hành của Ban quản lý Tổ. Tổ họp định kỳ hằng '+(G.gt('dkKy') ? o('dkKy', '', {}) : 'tháng (quý)')+' vào ngày '+o('ngayDK', '.......', {canh:'c'})+' hoặc đột xuất để giải quyết công việc phát sinh (nếu có). Nội dung họp Tổ do Tổ trưởng chuẩn bị và thống nhất trong Ban quản lý Tổ.',
        '3 Cuộc họp Tổ khi có các nội dung biểu quyết thì phải có sự tham gia chứng kiến của đại diện tổ chức chính trị - xã hội nhận ủy thác cấp xã và Trưởng thôn/Tổ trưởng Tổ dân phố, đồng thời phải có trên 1/2 số tổ viên của Tổ tham gia họp và có trên 2/3 số tổ viên tham gia họp biểu quyết tán thành mới có giá trị thực hiện. ',
        'Các nội dung họp Tổ phải biểu quyết bao gồm: Thành lập Tổ; bầu, thay đổi Tổ trưởng hoặc Tổ phó; sửa đổi Quy ước hoạt động của Tổ; kết nạp tổ viên; bình xét cho vay; bắt buộc tổ viên ra khỏi Tổ khi không thực hiện đúng Quy ước hoạt động của Tổ. Nội dung cuộc họp Tổ được lập thành biên bản và được thông qua trước khi kết thúc cuộc họp.',
        '4. Điều hành hoạt động của Tổ là Ban quản lý Tổ do các tổ viên trong Tổ bầu chọn. Ban quản lý Tổ gồm Tổ trưởng và Tổ phó, đáp ứng các tiêu chuẩn quy định tại khoản 2 Điều 8 Quyết định số 70/QĐ-HĐQT.',
        'Ban quản lý Tổ phối hợp, giám sát lẫn nhau để điều hành hoạt động của Tổ thực hiện nhiệm vụ quy định tại Quy chế hoạt động Tổ và Quy ước hoạt động được Tổ thông qua, thực hiện các nội dung công việc theo hợp đồng ủy nhiệm ký với NHCSXH. Trong đó, nhiệm vụ cụ thể như sau: ',
        'a) Tổ trưởng chịu trách nhiệm điều hành hoạt động của Tổ theo Quy ước hoạt động của Tổ và thực hiện nhiệm vụ, trách nhiệm của Ban quản lý Tổ; triệu tập và chủ trì các cuộc họp; ký hợp đồng ủy nhiệm với NHCSXH; giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch; có trách nhiệm thanh toán số tiền hoa hồng được NHCSXH chi trả cho thành viên Ban quản lý Tổ theo thống nhất trong Ban quản lý Tổ.',
        ['b) Tổ phó ghi chép biên bản các cuộc họp; giúp việc cho Tổ trưởng, điều hành và giải quyết các công việc của Tổ khi được Tổ trưởng phân công; thay mặt Tổ trưởng giao dịch với NHCSXH và tham gia họp giao ban tại điểm giao dịch khi Tổ trưởng vắng mặt. ', 'sang'],
        ['5. Các tổ viên trong Tổ cam kết thực hiện tốt các nội dung sau:', 1],
        ['a) Tham gia đầy đủ và biểu quyết tại các cuộc họp Tổ; tham dự các lớp tập huấn chuyển giao công nghệ, khuyến nông, khuyến lâm, khuyến ngư, tiêu thụ sản phẩm,... để nâng cao trình độ sản xuất kinh doanh.', 1],
        ['b) Sử dụng vốn vay đúng mục đích đề nghị vay, có hiệu quả. Có nghĩa vụ trả nợ (gốc, lãi) đầy đủ, đúng kỳ hạn đã thoả thuận với NHCSXH. ', 1],
        ['c) Thực hành tiết kiệm và gửi vào NHCSXH theo định kỳ hằng tháng với mức tối thiểu là '+o('tk', '......................', {gt:(function(v){ return /^[\d.,\s]+$/.test(v) && hsoSo(v) ? tdnTien(hsoSo(v)) : v; })(g('tk', V.tk))})+' đồng/tổ viên kể từ tháng '+
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
        dau.join('')+
        P('<b>I. DANH SÁCH TỔ VIÊN</b>', J+F+'margin-top:4pt')+
        '<table class="khung0 tv100" data-w="1,1,1" data-cao="'+CAO+'" style="width:161.5mm;table-layout:fixed"><colgroup><col style="width:33.33%"><col style="width:33.33%"><col style="width:33.34%"></colgroup>'+ds+'</table>'+
        P('<b>II. QUY ƯỚC HOẠT ĐỘNG CỦA TỔ TK&amp;VV</b>', J+F+H17).replace('<p ', '<p class="kt-b" ')+
        qu.map(function(x){ var c = Array.isArray(x) ? x[1] : 0, s = Array.isArray(x) ? x[0] : x, r = P(s, J+F+H17); return c==='sang' ? r.replace('<p ', '<p class="tr-sang-in" ') : r; }).join('')+
        P('<b>III. BẦU BAN QUẢN LÝ CỦA TỔ TK&amp;VV</b>', J+F+H17).replace('<p ', '<p class="kt-b tr-sang-in" ')+
        P('1. Các tổ viên dự họp thống nhất bầu Ban quản lý Tổ gồm các Ông (Bà) có tên dưới đây:', J+F+H17)+
        tabP(coTen('bqlTT', V.tt) ? 'a) '+ong('bqlTT', '', V.tt) : 'a) Ông (Bà) '+o('bqlTT', chamMM(vIII-12.7-rongTx('a) Ông (Bà) ')-2), {gt:''}), 'Chức vụ: Tổ trưởng;', H17, vIII)+   /* 3.459 (anh 03/11): để chấm → chấm đến điểm tab, "Chức vụ" thẳng cột như khi có chữ */
        tabP(coTen('bqlPho', V.pho) ? 'b) '+ong('bqlPho', '', V.pho) : 'b) Ông (Bà) '+o('bqlPho', chamMM(vIII-12.7-rongTx('b) Ông (Bà) ')-2), {gt:''}), 'Chức vụ: Tổ phó.', H17, vIII)+
        P('2. Ban quản lý Tổ thực hiện nhiệm vụ, quyền hạn của mình theo quy định tại Quyết định số 70/QĐ-HĐQT và các quy định liên quan của NHCSXH.', J+F+H17)+
        P('<b>IV. KẾT QUẢ BIỂU QUYẾT</b>', J+F+H17).replace('<p ', '<p class="kt-b" ')+
        P(o('bq', '......', {gt:bqP[0], canh:'c'})+'/'+o('bq', '......', {gt:bqP[1] || ''})+' tổ viên của Tổ tham dự họp biểu quyết tán thành các nội dung: Danh sách tổ viên, Quy ước hoạt động của Tổ TK&amp;VV và Bầu Ban quản lý Tổ TK&amp;VV. ', J+F+H17)+
        P('Biên bản này được lập thành 02 bản, được các tổ viên trong Tổ hoàn toàn nhất trí thông qua. Đề nghị UBND cấp xã chấp thuận hoạt động của Tổ TK&amp;VV tại địa phương.', J+F+H17)+
        P('Cuộc họp kết thúc vào '+o('ketThuc', '........', {canh:'c'})+' giờ '+o('ketThuc', '......', {gt:''})+', ngày '+o('ketThuc', '.....', {gt:''})+'/'+o('ketThuc', '.......', {gt:''})+'/'+o('ketThuc', '...........', {gt:''})+'/.', J+F+H17)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:50.6mm"><col style="width:52.8mm"><col style="width:56.6mm"></colgroup><tr style="height:11.2mm">'+
          [['THƯ KÝ', '(Ký, ghi rõ họ tên)', ''], ['TRƯỞNG '+apL.toUpperCase(), '(Ký, ghi rõ họ tên)', V.truongAp], ['CHỦ TRÌ', '(Ký tên, đóng dấu)', V.cb]].map(function(x){ return '<td style="padding:0 1.9mm;vertical-align:top">'+P('<b>'+x[0]+'</b>', 'text-align:center')+P('<i>'+x[1]+'</i>', 'text-align:center')+'</td>'; }).join('')+'</tr></table>'+
        [1, 2, 3, 4, 5, 6].map(function(i){ return i===5 ? '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:50.6mm"><col style="width:52.8mm"><col style="width:56.6mm"></colgroup><tr><td>'+P('<b>'+o('kyTK', '&nbsp;', {gt:g('kyTK', g('thuKy', V.thuKy)), rong:46, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td><td>'+P('<b>'+o('kyTA', '&nbsp;', {gt:g('kyTA', g('truongAp', V.truongAp)), rong:48, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td><td>'+P('<b>'+o('kyCT', '&nbsp;', {gt:g('kyCT', g('chuTri', V.cb)), rong:52, canh:'c'})+'</b>', 'text-align:center;line-height:18pt')+'</td></tr></table>' : P('&nbsp;', 'line-height:18pt'); }).join('')+
        P('<b>PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ</b>', 'text-align:center;line-height:18pt')+
        P('Chấp thuận cho Tổ TK&amp;VV tại '+(g('ubAp', V.ap) ? V.capAp+' '+o('ubAp', '', {gt:g('ubAp', V.ap)}) : 'thôn '+o('ubAp', '…....................................', {gt:''}))+', '+(g('ubXa', V.xa) ? V.capXa+' '+o('ubXa', '', {gt:g('ubXa', V.xa)}) : 'xã '+o('ubXa', '…..........................................', {gt:''}))+
          ', tỉnh '+o('ubTinh', '..........................................', {gt:g('ubTinh', V.tinh)})+
          ' do Ông (Bà) '+o('ubTT', '....................................................................…….', {gt:g('ubTT', g('bqlTT', V.tt) || V.tt)})+' làm Tổ trưởng và Ông (Bà) '+o('ubPho', '.............................................................................', {gt:g('ubPho', g('bqlPho', V.pho) || V.pho)})+' làm Tổ phó được '+(vvKT(G.gt('vv')) && !/^Luôn/.test(G.gt('ubVv') || '') ? 'kiện toàn' : 'thành lập')+', hoạt động theo Quy ước của Tổ đề ra và chịu trách nhiệm trước pháp luật về hoạt động của Tổ TK&amp;VV.', J+F+H15)+
        '<table class="khung0" style="width:160mm;table-layout:fixed"><colgroup><col style="width:45.7%"><col style="width:54.3%"></colgroup><tr><td></td><td style="padding:0 1.9mm">'+
          P('<i>Ngày'+un[0]+'tháng'+un[1]+'năm '+un[2]+'</i>', 'text-align:center')+P('<b>UBND CẤP XÃ</b>', 'text-align:center')+P('<i>(Ký tên, đóng dấu)</i>', 'text-align:center')+'</td></tr></table>'+'';   /* 3.443.1: chừa chỗ UBND ký, đóng dấu (cả mẫu vẫn 4 trang) */
      return {ma:'10A/TD', du:DU, dong:DONG, cao:CAO, h:'<div class="om-goc" style="font-size:14pt;line-height:1.15">'+h+'</div>'};
    }});
  hsoLap10a = function(t){ return omLap(MK, t); };
  var M = hsoMauK(MK); if(M) M.mg = omMg([15, 20, 15, 30]);   /* 3.443.1: tiêu đề mục II–IV class kt-b → bộ chia trang kéo theo đoạn sau (không treo cuối trang) · (anh 02/11 "giảm lề, giãn dòng dư" → 4 trang): lề trên / dưới 20 → 15 mm */
})();
