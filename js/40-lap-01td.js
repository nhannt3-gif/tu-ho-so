/* ===== 3.242 (anh 17/10 — KE_HOACH_CHUAN_HOA mục Hồ sơ vay hướng B, ý 1–19): FORM LẬP 01/TD =====
   Cột trái tab 01/TD đi ĐÚNG THỨ TỰ tờ 01/TD: Chương trình → Kính gửi → 1. Người vay (họ tên, năm sinh, CCCD, ngày cấp, nơi cấp tự tính;
   địa chỉ chọn Xã → Thôn → Tổ, xã anh quản lý lên đầu; tổ trưởng, Hội tự theo tổ; chọn Hội trước thì chỉ còn tổ của Hội) → 2. Đề nghị vay (phương án theo thẻ chương trình)
   → phần UBND, NH chấm. Thanh nút: Làm trống · 💾 Lưu · 🖨 In · 📤 Gửi · 📄 Mẫu 03. Bản đã lưu hiện ngay dưới form (tên không dấu + tổ + ấp).
   Một nguồn: người vay, địa chỉ lưu vào hộ của 📒 Sổ hộ vay (hộ cũ có mã KH đọc Mẫu 31, không sửa ở đây); số liệu đề nghị lưu ở phiếu hồ sơ của hộ (hsoBo).
   Phím chung: Tab / Enter sang ô kế · ↑↓ chọn trong danh sách · ← → đi trong chữ · ngày gõ liền số (QUY_CHUAN mục 11). */
var L01 = (function(){
  var HOI = '';   /* Hội đang lọc danh sách tổ (chỉ trong lần làm) */
  function e(s){ return coChuHTML(s==null ? '' : String(s)); }
  function ho(B){ return B && B.hoId ? hmTim(B.hoId) : null; }
  function nguoi(o){ return o ? (o.tv[o.dung||0] || (o.tv[0] = {})) : {}; }
  function ve(){   /* vẽ lại mà con trỏ ở yên ô đang đứng — ô thay đổi khi rời ô (Tab / Enter): đợi con trỏ sang ô kế xong mới vẽ, rồi đặt lại vào ô đó */
    setTimeout(function(){ var a = document.activeElement, k = a && a.getAttribute && a.getAttribute('data-l01'), gt = k && a.tagName==='INPUT' ? a.value : null, d0 = gt!=null ? a.selectionStart : 0, d1 = gt!=null ? a.selectionEnd : 0;
      hsoVe(); if(!k) return; var x = document.querySelector('[data-l01="'+k+'"]'); if(!x) return; if(gt!=null && x.value!==gt) x.value = gt; x.focus();
      if(gt!=null) try{ x.setSelectionRange(d0, d1); }catch(e){} }, 0); }   /* giữ nguyên chữ + vị trí con trỏ đang gõ dở ở ô kế (gõ nhanh không mất ký tự) */
  function hoMoi(){   /* lập 01/TD cho người chưa có trong sổ → thêm hộ mới vào Sổ hộ vay + phiếu hồ sơ */
    var o = {id:'hm'+Date.now().toString(36)+Math.random().toString(36).slice(2, 5), tao:new Date().toISOString(), kh:'', to:'', xa:'', tenXa:'', diem:'', tenDiem:'', thon:'', tenThon:'',
      tv:[{ten:'', ns:'', cccd:'', ncap:'', noiCap:'', qh:'', sdt:''}], dung:0, sv:[]};
    hmDs().unshift(o); var B = hmBo(o); B.ct = B.ct || HSO.vay.ct01 || (hsoCTVDs().find(function(c){ return c.bat!==false && c.kieu!=='gqvl'; }) || {}).ma || 'HSSV'; luu(); return B; }
  function canBo(){ return hsoBo() || hoMoi(); }
  function tenBan(B){ var o = ho(B), n = nguoi(o), T = hsoBoT(B);
    return [boDauTen(n.ten || 'Chua ten'), o && hmToTen(o) ? boDauTen(hmToTen(o)) : '', o && o.tenThon ? boDauTen(o.tenThon) : (T.ap ? boDauTen(T.ap) : '')].filter(Boolean).join(' - '); }   /* tên không dấu + tổ + ấp */
  /* ---------- địa bàn: Xã → Thôn → Tổ (Hội lọc tổ) ---------- */
  function dsXa(){ var X = hmDiaBan(), ql = D.cauHinh.xaQuanLy || [];
    return Object.keys(X).sort(function(a, b){ var qa = ql.indexOf(X[a].tenXa), qb = ql.indexOf(X[b].tenXa); if((qa<0)!==(qb<0)) return qa<0 ? 1 : -1; return String(X[a].tenXa).localeCompare(String(X[b].tenXa), 'vi'); }).map(function(k){ return X[k]; }); }
  function dsTo(o){ if(!KHO.coKy() || !o.xa) return [];
    return KHO.maTo().map(function(m){ return KHO.to(m); }).filter(function(t){ return t && !toLaTT(t) && t.xa===o.xa && (!(o.thon||o.tenThon) || t.thon===o.thon || t.tenThon===o.tenThon) && (!HOI || String(t.dv||'')===HOI); })
      .sort(function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi', {numeric:true}); }); }
  function dsHoi(o){ var r = {}; if(KHO.coKy() && o.xa) KHO.maTo().forEach(function(m){ var t = KHO.to(m); if(t && !toLaTT(t) && t.xa===o.xa && t.dv) r[t.dv] = tdnHoi(t.dv) || 'Hội '+t.dv; }); return r; }
  /* ---------- lệnh ---------- */
  GD.dangKy('l01', {
    chon:function(el){ var id = el.value; if(!id){ hsoCH().boId = ''; luu(); return hsoVe(); } hmLamHS(id, '01td'); },
    m31:function(){ hmM31Hop(); },
    trong:function(){ hsoCH().boId = ''; HOI = ''; luu(); hsoVe(); bao('Form trống — gõ họ tên người vay để lập 01/TD mới.', 3); },
    ng:function(el){ var B = canBo(), o = ho(B); if(!o || o.kh) return; var f = el.getAttribute('data-f'), n = nguoi(o);
      hmChuan(n, f, el.value); if(f==='ncap' && n.ncap) n.noiCap = hsoNoiCapGY(n.ncap); o.sua = B.sua = new Date().toISOString(); luu(); ve(); },
    xa:function(el){ var B = canBo(), o = ho(B); if(!o) return; var x = hmDiaBan()[el.value];
      o.xa = el.value; o.tenXa = x ? x.tenXa : ''; o.thon = ''; o.tenThon = ''; o.to = ''; o.diem = ''; o.tenDiem = ''; HOI = ''; luu(); ve(); },
    thon:function(el){ var B = canBo(), o = ho(B); if(!o) return; var x = hmDiaBan()[o.xa], a = x && x.ap[el.value];
      o.thon = a ? a.thon : ''; o.tenThon = a ? a.tenThon : ''; if(o.to){ var t = KHO.to(o.to); if(!t || (t.thon!==o.thon && t.tenThon!==o.tenThon)) o.to = ''; } luu(); ve(); },
    hoi:function(el){ HOI = el.value; var B = hsoBo(), o = ho(B); if(o && o.to){ var t = KHO.to(o.to); if(t && HOI && String(t.dv||'')!==HOI) o.to = ''; } luu(); ve(); },
    to:function(el){ var B = canBo(), o = ho(B); if(!o) return; var t = el.value ? KHO.to(el.value) : null; o.to = el.value || '';
      if(t){ o.xa = t.xa; o.tenXa = t.tenXa || o.tenXa; o.thon = t.thon || ''; o.tenThon = t.tenThon || o.tenThon; o.diem = t.khoaDiem || ''; o.tenDiem = t.tenDiem || ''; }
      if(B) B.to = o.to; luu(); ve(); },
    luu:function(){ var B = hsoBo(); if(!B || !String(nguoi(ho(B)).ten||'').trim()) return bao('Chưa có người vay — gõ họ tên trước.', 3);
      B.luu = new Date().toISOString(); B.tenBan = tenBan(B); luu(); hsoVe(); bao('💾 Đã lưu: '+B.tenBan, 4); },
    in:function(){ hoiLuu(function(){ xuatIn(); }); },
    gui:function(el, ev){ hoiLuu(function(){ xuatGui({currentTarget:el, target:el, stopPropagation:function(){}}); }); },
    m03:function(){ hoiLuu(function(){ hsoChonMau('03td'); }); },
    ct:function(el){ var B = canBo(); B.ct = el.getAttribute('data-ma'); hsoBoLuu(); hsoVe(); },
    kb:function(el){ hsoKBHop(el.getAttribute('data-k')); },
    gq:function(){ hsoChonMau('01gqvl'); },
    mo:function(el){ hsoCH().boId = el.getAttribute('data-id'); HOI = ''; luu(); hsoVe(); },
    bo:function(el){ var B = hsoBoDs().find(function(b){ return b.id===el.getAttribute('data-id'); }); if(!B) return;
      hoi('Bỏ "'+(B.tenBan||'bản này')+'" khỏi danh sách đã lưu?', 'Hộ vẫn còn trong 📒 Sổ hộ vay; chỉ bỏ khỏi danh sách bản 01/TD.', 'Bỏ khỏi danh sách', function(){ delete B.luu; luu(); hsoVe(); }); } });
  function hoiLuu(f){   /* anh 17/10: gõ xong hỏi có lưu không → lưu, in, gửi */
    var B = hsoBo(); if(!B || B.luu && (!B.sua || B.sua<=B.luu) || !String(nguoi(ho(B)).ten||'').trim()) return f();
    hoi('Lưu bản 01/TD này trước?', 'Lưu để mở lại, in lại sau (tên: '+tenBan(B)+').', '💾 Lưu rồi tiếp', function(){ B.luu = new Date().toISOString(); B.tenBan = tenBan(B); luu(); hsoVe(); f(); }); }
  /* ---------- vẽ ---------- */
  function o1(nhan, html){ return '<label class="kt-kb hso-o l01-o"><span>'+nhan+'</span>'+html+'</label>'; }
  function oNg(f, gt, ph, khoa){ return '<input data-l01="ng-'+f+'" data-lenh="l01.ng" data-su="change" data-f="'+f+'" value="'+e(gt)+'" placeholder="'+e(ph)+'"'+(khoa ? ' disabled title="Hộ cũ — theo Mẫu 31 mới nhất (sửa ở hệ thống, nạp lại Mẫu 31)"' : '')+' autocomplete="off">'; }
  function sel(k, gt, ops){ return '<select data-l01="'+k+'" data-lenh="l01.'+k+'" data-su="change">'+ops.map(function(x){ return '<option value="'+e(x[0])+'"'+(String(x[0])===String(gt) ? ' selected' : '')+'>'+e(x[1])+'</option>'; }).join('')+'</select>'; }
  function form(M, t){
    var B = hsoBo(), o = ho(B); if(B && !o) B = null; if(o) hmDongBo(o, B);
    var n = nguoi(o), khoa = !!(o && o.kh), C = B ? (hsoCTV(B.ct) || {}) : {}, h = '';
    /* thanh bản + nút */
    h += '<div class="l01-thanh"><span class="l01-ban">'+(B ? (B.luu ? '📄 <b>'+e(B.tenBan || tenBan(B))+'</b>'+(B.sua && B.sua>B.luu ? ' <i class="hso-canh">· chưa lưu thay đổi</i>' : '') : '📝 <b>Bản mới</b> <i>(chưa lưu)</i>') : '📝 <b>Form trống</b>')+'</span>'+
      GD.hang([GD.nut({chu:'Làm trống', lenh:'l01.trong', tit:'Bắt đầu 01/TD mới'}), GD.nut({chu:'💾 Lưu', lenh:'l01.luu', chinh:1, tit:'Lưu bản — tên tự đặt: tên không dấu + tổ + ấp'}),
        GD.nut({chu:'🖨 In', lenh:'l01.in'}), GD.nut({chu:'📤 Gửi', lenh:'l01.gui'}), GD.nut({chu:'📄 Mẫu 03', lenh:'l01.m03', tit:'Sang 03/TD — điền sẵn từ 01/TD này'})])+'</div>';
    /* Chương trình · Kính gửi */
    h += '<div class="l01-phan">'+o1('Chương trình cho vay', '<span class="hang-nut">'+hsoCTVDs().filter(function(c){ return c.kieu!=='gqvl' && (c.bat!==false || (B && c.ma===B.ct)); }).map(function(c){ return GD.chip('<b>'+e(c.ma)+'</b>', !!B && B.ct===c.ma, 'l01.ct', {ma:c.ma}, c.ten).replace('gd-chip', 'gd-chip hso-ct'); }).join('')+
        ' <a href="#" class="hso-nho" data-lenh="l01.kb" data-k="ct" title="Thêm / sửa chương trình">⚙</a></span>')+
      o1('Kính gửi', '<span class="l01-tu">'+e(hsoPGD('kinhGui') || '— chưa khai —')+' <a href="#" class="hso-nho" data-lenh="l01.kb" data-k="pgd" title="Khai báo tên Ngân hàng (Kính gửi)">⚙</a></span>')+'</div>';
    /* 1. Người vay */
    h += '<div class="nhan-nhom">1. Người vay</div><div class="l01-phan">'+
      o1('Chọn từ 📒 Sổ hộ vay', sel('chon', o ? o.id : '', [['', hmDs().length ? '— gõ mới ở dưới, hoặc chọn hộ trong sổ ('+hmDs().length+') —' : '— sổ trống: gõ mới ở dưới —']].concat(hmDs().map(function(x){ var m = x.tv[x.dung||0] || {}; return [x.id, (m.ten||'(chưa tên)')+(x.kh ? ' · '+x.kh : ' · hộ mới')+(hmToTen(x) ? ' · '+hmToTen(x) : '')]; })))+
        ' '+GD.nut({chu:'📊 Lấy từ Mẫu 31', lenh:'l01.m31'}))+
      (khoa ? '<div class="sl-phu">Hộ cũ (mã KH '+e(o.kh)+') — nhân thân theo Mẫu 31 mới nhất, không sửa ở đây.</div>' : '')+
      o1('Họ tên người vay', '<span class="qc-o">'+oNg('ten', n.ten, 'gõ họ tên', khoa)+(khoa || typeof qcNut!=='function' ? '' : qcNut('l01'))+'</span>')+   /* 3.273: 🪪 Quét CCCD điền */
      o1('Năm sinh', oNg('ns', n.ns ? ngayVNsl(n.ns) : '', 'gõ liền số 150378', khoa))+
      o1('Số CC / CCCD', oNg('cccd', n.cccd, '12 số', khoa))+
      o1('Ngày cấp', oNg('ncap', n.ncap ? ngayVNsl(n.ncap) : '', 'gõ liền số 9112021', khoa))+
      o1('Nơi cấp', '<span class="l01-tu">'+e(n.noiCap || hsoNoiCapGY(n.ncap) || 'tự điền theo ngày cấp')+'</span>');
    var X = hmDiaBan(), x = o && X[o.xa], dsAp = x ? Object.keys(x.ap).map(function(k){ return x.ap[k]; }).sort(function(a, b){ return String(a.tenThon).localeCompare(String(b.tenThon), 'vi', {numeric:true}); }) : [];
    if(Object.keys(X).length){ var Ho = o ? dsHoi(o) : {}, To = o ? dsTo(o) : [];
      h += o1('Địa chỉ — Xã', sel('xa', o ? o.xa : '', [['', '— Xã / phường —']].concat(dsXa().map(function(z){ return [z.xa, z.tenXa]; }))))+
        o1('Thôn (ấp)', sel('thon', o ? (o.thon || o.tenThon) : '', [['', x ? '— Thôn / ấp / khu phố —' : '— chọn xã trước —']].concat(dsAp.map(function(a){ return [a.thon || a.tenThon, a.tenThon || a.thon]; }))))+
        o1('Hội (lọc tổ)', sel('hoi', HOI, [['', '— mọi Hội —']].concat(Object.keys(Ho).map(function(k){ return [k, Ho[k]]; }))))+
        o1('Tổ TK&amp;VV', sel('to', o ? o.to : '', [['', x ? '— Tổ ('+To.length+') —' : '— chọn xã trước —']].concat(To.map(function(z){ return [z.ma, 'Tổ '+(z.ten||z.ma)+(z.tenThon ? ' · '+pvApNgan(z.tenThon) : '')]; }))));
    } else h += '<div class="sl-phu">Chưa có cây địa bàn (nạp Mẫu 31) — địa chỉ, tổ chọn được sau khi nạp.</div>';
    if(B){ var T = hsoBoT(B); h += o1('Tổ trưởng · Hội', '<span class="l01-tu">'+(T.tt ? e(T.tt) : '— theo tổ —')+' · '+(hsoBoHoiTen(T) ? e(hsoBoHoiTen(T)) : '— theo tổ —')+'</span>'); }
    h += '</div>';
    /* 2. Đề nghị vay */
    if(B && C.kieu==='gqvl') h += '<div class="sl-bao vang hso-nhac">Hộ đang chọn chương trình <b>GQVL</b> — GQVL dùng mẫu riêng <b>01/GQVL</b> + <b>07b/GQVL</b> (01/TD không lập GQVL). '+GD.nut({chu:'Mở 01/GQVL', lenh:'l01.gq', chinh:1})+' — hoặc chọn chương trình khác ở trên.</div>';   /* 3.257: không hiện phương án GQVL trong 01/TD */
    else if(B){ var A = hsoPA(B), tuCo = hsoTuCo(B);
      if(C.kieu==='hssv' && o) h += hsoTuySV(B, o);   /* hộ nhiều SV: chip chọn SV (mỗi SV 1 đơn) */
      h += String(hsoTuyPA(B)).replace(/<div class="nhan-nhom">③ Phương án — /, '<div class="nhan-nhom">2. Đề nghị vay — ')+
        '<div class="sl-phu l01-tinh">Tự tính: đề nghị vay <b>'+(A.tien ? tdnTien(A.tien)+' đ' : '…')+'</b>'+(A.tien ? ' ('+e(hsoChuSo(A.tien))+')' : '')+' · tổng nhu cầu <b>'+(A.tien ? tdnTien(A.tien+tuCo)+' đ' : '…')+'</b></div>';
      if(o) h += hsoTuyKem(B, o, false);   /* in kèm 03/TD · 10C · 01/UQ · 01/TGTV (như cột cũ) */
    } else h += '<div class="sl-phu">Gõ họ tên người vay (hoặc chọn hộ trong sổ) → hiện phần <b>2. Đề nghị vay</b>. Chưa có người vay thì khung phải là mẫu trắng (in được ngay).</div>';
    h += '<div class="sl-phu">Phần UBND xác nhận, Ngân hàng phê duyệt: để chấm, ghi tay.</div>';
    /* bản đã lưu */
    var ds = hsoBoDs().filter(function(b){ return b.luu && b.hoId && hmTim(b.hoId); }).sort(function(a, b){ return a.luu<b.luu ? 1 : -1; });
    h += '<div class="nhan-nhom">📂 Bản 01/TD đã lưu ('+ds.length+')</div>'+(ds.length ? '<div class="l01-ds">'+ds.slice(0, 30).map(function(b){
        return '<div class="l01-dong'+(B && b.id===B.id ? ' bat' : '')+'"><a href="#" data-lenh="l01.mo" data-id="'+b.id+'">'+e(b.tenBan || tenBan(b))+'</a><small>'+ngayVNsl(b.luu.slice(0, 10))+' · '+e(b.ct||'')+'</small>'+
          GD.nut({chu:'✕', lenh:'l01.bo', du:{id:b.id}, tit:'Bỏ khỏi danh sách (hộ vẫn còn trong sổ)'})+'</div>'; }).join('')+'</div>' : '<div class="sl-phu">Chưa có — gõ xong bấm 💾 Lưu.</div>');
    return '<div class="phim-chung l01">'+h+'</div>'+hsoKBRieng('01td', B ? {ubOng:(B.nv||{}).ten} : null);
  }
  return {form:form, tenBan:tenBan, hoMoi:hoMoi};
})();
