/* ===== 3.223 M1 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): CỬA LƯU KHO1 + LƯU AN TOÀN B1 =====
   - Bước B1: CHƯA đổi chỗ lưu (vẫn localStorage + đồng bộ Drive như cũ) — chỉ thêm lưới an toàn:
     ① 📸 tự chụp cài đặt / khai báo (phần đồng bộ, như cauhinh.json) vào IndexedDB: mỗi ngày 1 lần + trước khi nhận cài đặt từ Drive
        + trước khi khôi phục / nạp file khai báo; trùng nội dung bản mới nhất thì bỏ qua; giữ 10 bản gần nhất.
     ② ↩ khôi phục 1 bản chụp (chụp bản hiện tại trước, nên khôi phục nhầm vẫn quay lại được).
     ③ ⬆ xuất / ⬇ nạp khai báo ra file .json theo nhóm (chuyển máy, gửi đồng nghiệp) — nhóm có số liệu khách mặc định không tích.
   - Tab mới chỉ gọi KHO1.*, không tự đụng localStorage / IndexedDB (bước B2 đổi bên trong cửa, tab không phải sửa). */
var KHO1 = (function(){
  var DS = 'tuhoso_chup', TOI_DA = 10, SO = 0;
  function ds(){ try { var a = JSON.parse(localStorage.getItem(DS) || '[]'); return Array.isArray(a) ? a : []; } catch(e){ return []; } }
  function ghiDs(a){ try { localStorage.setItem(DS, JSON.stringify(a)); } catch(e){} }
  function goi(){ return typeof goiCauHinh==='function' ? goiCauHinh() : {loai:'cau-hinh-tu-ho-so', cauHinh:D.cauHinh}; }
  return {
    /* KHO1.doc(khóa) / KHO1.ghi(khóa, giá trị) → cài đặt (bước B1: D.cauHinh + luu(); B2: ngăn IndexedDB) */
    doc: function(k){ return D.cauHinh[k]; },
    ghi: function(k, v){ D.cauHinh[k] = v; luu(); },
    /* KHO1.chup(lý do) → Promise<bản ghi | null> — chụp NGAY lúc gọi (đồng bộ), ghi IndexedDB sau */
    chup: function(ly){
      var o = goi(), s = JSON.stringify(o), sb = JSON.stringify(o, function(k, v){ return k==='ghiLuc' ? undefined : v; }), bam = typeof chBamChu==='function' ? chBamChu(sb) : String(sb.length), a = ds();
      if(a.length && a[0].bam===bam) return Promise.resolve(null);
      var r = {id:'chup:'+new Date().toISOString()+':'+(++SO)+Math.random().toString(36).slice(2, 6), luc:new Date().toISOString(), ly:ly || 'chụp tay', bam:bam, khoa:Object.keys(o).filter(function(k){ return k!=='loai' && k!=='ban' && k!=='ghiLuc'; }).length, kb:Math.round(s.length/1024)};
      return luuFile(r.id, new Blob([s], {type:'application/json'})).then(function(){
        a = ds(); a.unshift(r); a.slice(TOI_DA).forEach(function(x){ xoaFile(x.id); }); ghiDs(a.slice(0, TOI_DA)); return r; });
    },
    dsChup: function(){ return ds(); },
    /* chụp hằng ngày (gọi lúc mở app) */
    chupNgay: function(){ var a = ds(), hom = new Date().toISOString().slice(0, 10); if(!a.length || a[0].luc.slice(0, 10)!==hom) return this.chup('tự lưu hằng ngày'); return Promise.resolve(null); },
    /* KHO1.docChup(id) → Promise<đối tượng cài đặt | null> */
    docChup: function(id){ return docFile(id).then(function(b){ return b ? b.text() : null; }).then(function(s){ try { return s ? JSON.parse(s) : null; } catch(e){ return null; } }); },
    /* KHO1.khoiPhuc(id) → Promise<số khóa đã đặt lại> — chụp bản hiện tại trước; chỉ đặt lại các khóa có trong bản chụp (khóa mới hơn giữ nguyên) */
    khoiPhuc: function(id){ var me = this;
      return me.docChup(id).then(function(j){ if(!j) throw new Error('Không đọc được bản chụp.');
        return me.chup('trước khi khôi phục').then(function(){ var n = 0;
          Object.keys(j).forEach(function(k){ if(k==='loai' || k==='ban' || k==='ghiLuc' || (typeof chRieng==='function' && chRieng(k))) return; D.cauHinh[k] = j[k]; n++; });
          luu(); return n; }); }); }
  };
})();
window.addEventListener('load', function(){ setTimeout(function(){ try { if(D && D.cauHinh) KHO1.chupNgay(); } catch(e){} }, 6000); });

/* ---------- giao diện: tab 💾 Sao lưu trong ⚙ Khai báo đơn vị ---------- */
var KB_NHOM = [['hso', 'Hồ sơ Tổ / Hồ sơ vay — PGD, logo, trưởng ấp, tổ phó, chương trình vay, ô tùy biến từng mẫu', ['hsoKB', 'hsoO'], 1],
  ['gdx', 'Giao dịch xã — cán bộ, tên đơn vị, khai báo riêng từng mẫu', ['gdx'], 1],
  ['kt', 'KTGS — khai báo Hội, bảng chuẩn hóa, lựa chọn in', ['ktHoiKB', 'ktChuan', 'ktKBLuu', 'ktPC', 'ktIn', 'ktMucDich', 'ktNhanXet'], 1],
  ['tk', 'TK 104 / 105 anh đã chọn · CCCD, TK 104 anh gõ tay — có số liệu khách, cẩn thận khi gửi người khác', ['tkChon', 'ccNho', 'tk104Tay'], 0],
  ['so', 'Sổ hộ vay — có họ tên, CCCD khách; chỉ dùng chuyển sang máy của anh', ['hoMoi'], 0]];
var KB_NAP = null;   /* file khai báo vừa chọn để nạp (chưa ghi) */
function kbGioVN(iso){ var d = new Date(iso); if(isNaN(d)) return ''; var p = function(x){ return (x<10 ? '0' : '')+x; }; return p(d.getHours())+':'+p(d.getMinutes())+' '+p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear(); }
function kbSaoLuuHTML(){
  var dem = function(g){ return g[2].filter(function(k){ return D.cauHinh[k]!=null; }).length; }, a = KHO1.dsChup();
  return '<div class="hso-kb-nhom"><b>📸 Tự lưu trên máy này — '+a.length+' / 10 bản gần nhất</b> <small>(tự chụp mỗi ngày, trước khi nhận cài đặt từ Drive, trước khi khôi phục / nạp file)</small>'+
    (a.length ? '<div class="to-bang-cuon"><table class="to-bang luoi"><thead><tr><th>Lúc</th><th>Lý do</th><th>Số mục</th><th></th></tr></thead><tbody>'+a.map(function(x){
      return '<tr><td>'+kbGioVN(x.luc)+'</td><td>'+coChuHTML(x.ly)+'</td><td class="so">'+x.khoa+' · '+x.kb+' KB</td><td><button class="nho" onclick="kbKhoiPhuc(\''+x.id+'\')">↩ Khôi phục</button></td></tr>'; }).join('')+'</tbody></table></div>' : '<div class="sl-phu">Chưa có bản chụp.</div>')+
    '<div class="hang-nut"><button class="nho" onclick="KHO1.chup(\'chụp tay\').then(function(r){ bao(r ? \'Đã chụp.\' : \'Không đổi so với bản mới nhất.\'); hsoKBHop(\'sl\'); })">📸 Chụp ngay</button></div></div>'+
    '<div class="hso-kb-nhom"><b>⬆ Xuất khai báo ra file</b> <small>(chuyển sang máy khác, gửi đồng nghiệp — chỉ khai báo, không có file Mẫu 31)</small>'+
    KB_NHOM.map(function(g){ return '<label class="hso-o2"><input type="checkbox" class="kb-xuat" value="'+g[0]+'"'+(g[3] ? ' checked' : '')+(dem(g) ? '' : ' disabled')+'> '+coChuHTML(g[1])+(dem(g) ? '' : ' <small>(chưa có)</small>')+'</label>'; }).join('')+
    '<div class="hang-nut"><button class="nho chinh" onclick="kbXuat()">⬆ Xuất file khai báo</button></div></div>'+
    '<div class="hso-kb-nhom"><b>⬇ Nạp khai báo từ file</b> <small>(ghi đè nhóm đã tích; app tự chụp bản hiện tại trước khi nạp)</small>'+
    '<div class="hang-nut"><label class="nut-tep nho">📂 Chọn file khai báo (.json)<input type="file" accept=".json,application/json" style="display:none" onchange="kbChonFile(this)"></label></div>'+
    (KB_NAP ? '<div class="sl-phu">File: <b>'+coChuHTML(KB_NAP.ten)+'</b> · xuất từ bản '+coChuHTML(KB_NAP.d.ban || '?')+(KB_NAP.d.luc ? ' lúc '+kbGioVN(KB_NAP.d.luc) : '')+'</div>'+
      KB_NHOM.filter(function(g){ return KB_NAP.d.nhom[g[0]]; }).map(function(g){ return '<label class="hso-o2"><input type="checkbox" class="kb-nap" value="'+g[0]+'"'+(g[3] ? ' checked' : '')+'> '+coChuHTML(g[1])+'</label>'; }).join('')+
      '<div class="hang-nut"><button class="nho" onclick="KB_NAP=null;hsoKBHop(\'sl\')">Bỏ</button><button class="nho chinh" onclick="kbNap()">⬇ Nạp các nhóm đã tích</button></div>' : '')+'</div>';
}
function kbKhoiPhuc(id, khongHoi){
  var lam = function(){ return KHO1.khoiPhuc(id).then(function(n){ bao('Đã khôi phục '+n+' mục cài đặt. Bản trước khi khôi phục đã được chụp lại.'); try{ capNhatDau(); }catch(e){} hsoKBHop('sl'); return n; }, function(e){ baoLoi(e.message || String(e)); }); };
  if(khongHoi) return lam();
  hoi('Khôi phục bản chụp này?', 'Cài đặt / khai báo trên máy được đặt lại như lúc chụp. App chụp bản hiện tại trước, nên vẫn quay lại được.', 'Khôi phục', lam);
}
function kbDuLieu(ds){   /* {loai, ban, luc, nhom:{mã nhóm:{khóa cài đặt: giá trị}}} */
  var r = {loai:'tuhoso-khaibao', ban:APP_BAN, luc:new Date().toISOString(), nhom:{}};
  KB_NHOM.forEach(function(g){ if(ds.indexOf(g[0])<0) return; var o = {}; g[2].forEach(function(k){ if(D.cauHinh[k]!=null) o[k] = JSON.parse(JSON.stringify(D.cauHinh[k])); }); if(Object.keys(o).length) r.nhom[g[0]] = o; });
  return r;
}
function kbXuat(){
  var ds = Array.prototype.map.call(document.querySelectorAll('#hop-in .kb-xuat:checked'), function(e){ return e.value; });
  if(!ds.length) return bao('Tích ít nhất 1 nhóm để xuất.');
  var d = kbDuLieu(ds), n = ngayISO(nay()).split('-');
  giaoFile(new Blob([JSON.stringify(d, null, 1)], {type:'application/json'}), 'KhaiBao_TuHoSo_'+n[2]+'-'+n[1]+'-'+n[0]+'.json');
  bao('Đã xuất '+Object.keys(d.nhom).length+' nhóm khai báo.');
}
function kbDocChuoi(s, ten){   /* kiểm file → KB_NAP; lỗi → thông báo, không ghi gì */
  var d = null; try { d = JSON.parse(s); } catch(e){}
  if(!d || d.loai!=='tuhoso-khaibao' || !d.nhom || typeof d.nhom!=='object') { bao('File không phải file khai báo của Tủ hồ sơ.'); return false; }
  var nhom = {}; KB_NHOM.forEach(function(g){ var x = d.nhom[g[0]]; if(x && typeof x==='object'){ var o = {}; g[2].forEach(function(k){ if(x[k]!=null) o[k] = x[k]; }); if(Object.keys(o).length) nhom[g[0]] = o; } });   /* chỉ nhận khóa đã biết */
  if(!Object.keys(nhom).length){ bao('File không có nhóm khai báo nào dùng được.'); return false; }
  KB_NAP = {ten:ten || 'khai báo', d:{ban:d.ban, luc:d.luc, nhom:nhom}}; return true;
}
function kbChonFile(inp){ var f = inp.files && inp.files[0]; if(!f) return; var r = new FileReader(); r.onload = function(){ if(kbDocChuoi(String(r.result||''), f.name)) hsoKBHop('sl'); }; r.readAsText(f); }
function kbNap(ds, khongHoi){
  if(!KB_NAP) return;
  ds = ds || Array.prototype.map.call(document.querySelectorAll('#hop-in .kb-nap:checked'), function(e){ return e.value; });
  ds = ds.filter(function(k){ return KB_NAP.d.nhom[k]; }); if(!ds.length) return bao('Tích ít nhất 1 nhóm để nạp.');
  var ghi = function(){ return KHO1.chup('trước khi nạp file khai báo').then(function(){
    ds.forEach(function(g){ var o = KB_NAP.d.nhom[g]; Object.keys(o).forEach(function(k){ D.cauHinh[k] = JSON.parse(JSON.stringify(o[k])); }); });
    KB_NAP = null; luu(); bao('Đã nạp '+ds.length+' nhóm khai báo.'); hsoKBHop('sl'); }); };
  if(khongHoi) return ghi();
  hoi('Nạp '+ds.length+' nhóm khai báo từ file?', 'Khai báo hiện tại của các nhóm này trên máy sẽ được thay bằng nội dung file (app chụp bản hiện tại trước).', 'Nạp', ghi);
}
