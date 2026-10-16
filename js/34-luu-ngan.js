/* ===== 3.223 M8 (anh chốt 16/10/2026 — KE_HOACH_BAN_LON, QUY_CHUAN mục 9.5): LƯU THEO NGĂN TRONG IndexedDB (bước B2) =====
   - Chỉ mục D (cauHinh, vanBan, duLieu, ghiChu, scan, rac, lich, bieuMau, kyAnh, boHS…) ghi vào IndexedDB 'tuhoso_ngan', MỖI NGĂN 1 KHÓA,
     mỗi lần lưu chỉ ghi NGĂN ĐỔI (so chuỗi đã ghi). localStorage 'tuhoso_v1' VẪN GHI như cũ khi còn chỗ (bản đọc nhanh lúc mở app + đường quay lại).
   - localStorage đầy (dữ liệu lớn) → không còn báo "không lưu được": dữ liệu nằm ở IndexedDB, app bỏ bản localStorage đã cũ và đánh dấu
     'tuhoso_ln_cho' → lần mở sau đọc IndexedDB TRƯỚC khi vẽ.
   - Lần đầu chạy: chép bản localStorage hiện có sang IndexedDB + GIỮ BẢN CŨ 30 NGÀY (file 'ln:banCu' trong kho file) — Sao lưu › ↩ Dùng lại.
   - Công tắc quay lại cách lưu cũ (chỉ localStorage) theo TỪNG MÁY: localStorage 'tuhoso_luu' = 'cu'. Dữ liệu quá lớn so với localStorage → không cho quay lại (báo rõ).
   - IndexedDB hỏng / bị chặn (trình duyệt riêng tư) → tự dùng localStorage như cũ, báo 1 lần.
   - Đồng bộ Drive: GIỮ NGUYÊN 2 đường hiện có (cauhinh.json + chỉ mục) — chưa tách theo ngăn (báo anh, để bản sau). */
var LN = (function(){
  var CACH = 'tuhoso_luu', CHO = 'tuhoso_ln_cho', TEN_DB = 'tuhoso_ngan', BAN_CU = 'ln:banCu', TRUOC = 'ln:truocDungLai', HAN = 30*864e5;
  var db = null, hong = false, tat = false, CU = {}, MOI = null, LUC = 0, LS_LUC = 0, HANG = Promise.resolve(), META = null, DEM = {ghi:0, ngan:0, lan:[]}, baoHong = false, baoDay = false, KIEM_R = {}, KIEM = new Promise(function(r){ KIEM_R.xong = r; });   /* KIEM: ghi IndexedDB chờ sauKD đọc xong dấu bản (không để lần lưu sớm làm sai bước chuyển lần đầu) */
  function kiemXong(){ if(KIEM_R.xong) KIEM_R.xong(); }
  function cach(){ try { return localStorage.getItem(CACH)==='cu' ? 'cu' : 'ngan'; } catch(e){ return 'ngan'; } }
  function lsDoc(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function mo(){
    return new Promise(function(ok, loi){
      if(db) return ok(db);
      if(hong || typeof indexedDB==='undefined') return loi(new Error('idb-hong'));
      var xong = false, canh = setTimeout(function(){ if(!xong){ xong = true; hong = true; loi(new Error('idb-cho-lau')); } }, 3000);
      try {
        var r = indexedDB.open(TEN_DB, 1);
        r.onupgradeneeded = function(e){ var d = e.target.result; if(!d.objectStoreNames.contains('n')) d.createObjectStore('n'); };
        r.onsuccess = function(e){ if(xong) return; xong = true; clearTimeout(canh); db = e.target.result; ok(db); };
        r.onerror = r.onblocked = function(){ if(xong) return; xong = true; clearTimeout(canh); hong = true; loi(r.error || new Error('idb-loi')); };
      } catch(e){ xong = true; clearTimeout(canh); hong = true; loi(e); }
    });
  }
  function docKhoa(ds){   /* → {khóa: chuỗi | undefined} */
    return mo().then(function(d){ return new Promise(function(ok, loi){
      try { var t = d.transaction('n', 'readonly'), st = t.objectStore('n'), r = {};
        ds.forEach(function(k){ var q = st.get(k); q.onsuccess = function(){ r[k] = q.result; }; });
        t.oncomplete = function(){ ok(r); }; t.onerror = t.onabort = function(){ loi(t.error); };
      } catch(e){ loi(e); } }); });
  }
  function dat(o, xoaHet){   /* ghi các khóa trong o (1 giao dịch) */
    return mo().then(function(d){ return new Promise(function(ok, loi){
      try { var t = d.transaction('n', 'readwrite'), st = t.objectStore('n'); if(xoaHet) st.clear();
        Object.keys(o).forEach(function(k){ st.put(o[k], k); });
        t.oncomplete = function(){ ok(true); }; t.onerror = t.onabort = function(){ loi(t.error || new Error('idb-ghi')); };
      } catch(e){ loi(e); } }); });
  }
  function lsLuc(){ var s = lsDoc(KHOA); if(!s) return -1; var m = /"luuLuc":(\d+)\}$/.exec(s.slice(-40)); return m ? +m[1] : 0; }   /* -1: không có bản · 0: bản trước M8 */
  function doiTuong(r){   /* chuỗi từng ngăn → đối tượng dạng tuhoso_v1 */
    var m = r._meta ? JSON.parse(r._meta) : null; if(!m || !m.ngan) return null;
    var j = {}; m.ngan.forEach(function(k){ if(r[k]!==undefined) j[k] = JSON.parse(r[k]); }); j.luuLuc = m.luc; return j;
  }
  var me = {
    /* bật lưu theo ngăn trên máy này? */
    bat: function(){ return !tat && !hong && cach()==='ngan'; },
    cach: cach,
    /* lần mở trước localStorage không giữ bản mới nhất → phải đọc IndexedDB trước khi vẽ */
    cho: function(){ return !!lsDoc(CHO); },
    /* gọi trong luuNgay(): chuỗi JSON ghép từ từng ngăn (giữ chuỗi từng ngăn để so) — đóng dấu luuLuc ở CUỐI */
    chuoi: function(o){
      LUC = Math.max(Date.now(), LUC+1); MOI = {}; var p = [];
      Object.keys(o).forEach(function(k){ if(o[k]===undefined) return; var v = JSON.stringify(o[k]); MOI[k] = v; p.push(JSON.stringify(k)+':'+v); });
      p.push('"luuLuc":'+LUC); return '{'+p.join(',')+'}';
    },
    /* gọi trong luuNgay() sau khi thử ghi localStorage: ghi IndexedDB các ngăn đổi (xếp hàng — đúng thứ tự) */
    ghi: function(lsOk){
      if(!MOI) return; var moi = MOI, luc = LUC, doi = {}, n = 0; MOI = null;
      if(lsOk){ LS_LUC = luc; if(lsDoc(CHO)) try { localStorage.removeItem(CHO); } catch(e){} }
      Object.keys(moi).forEach(function(k){ if(CU[k]!==moi[k]){ doi[k] = moi[k]; n++; } });
      var meta = {luc:luc, ban:typeof APP_BAN!=='undefined' ? APP_BAN : '', ngan:Object.keys(moi)}; doi._meta = JSON.stringify(meta);
      HANG = HANG.then(function(){ return KIEM; }).then(function(){ return dat(doi); }).then(function(){
        Object.keys(doi).forEach(function(k){ if(k!=='_meta') CU[k] = doi[k]; }); META = meta; DEM.ghi++; DEM.ngan = n; DEM.lan.push(n); if(DEM.lan.length>20) DEM.lan.shift();
        if(!lsOk && LS_LUC < luc){   /* localStorage đầy: bỏ bản cũ ở đó (đã cũ hơn IndexedDB) + đánh dấu đọc IndexedDB lần mở sau */
          try { localStorage.removeItem(KHOA); } catch(e){} try { localStorage.setItem(CHO, String(luc)); } catch(e){}
          if(!baoDay){ baoDay = true; bao('Bộ nhớ nhanh của trình duyệt đã đầy — app lưu dữ liệu ở IndexedDB (dung lượng lớn hơn). Dữ liệu vẫn đủ.', 8); } }
      }, function(e){
        if(!lsOk) baoLoi('Không lưu được — bộ nhớ trình duyệt đã đầy. Vào Cài đặt xuất dữ liệu ra file để giải phóng.');
        else if(!baoHong){ baoHong = true; bao('Không ghi được IndexedDB trên máy này — app vẫn lưu theo cách cũ (localStorage).', 6); }
      });
      return HANG;
    },
    xong: function(){ return HANG; },
    /* đọc toàn bộ từ IndexedDB → đối tượng dạng tuhoso_v1 (null nếu chưa có) */
    napIDB: function(){
      return mo().then(function(){ return docKhoa(['_meta']); }).then(function(r){
        var m = r._meta ? JSON.parse(r._meta) : null; if(!m) return null;
        return docKhoa(['_meta'].concat(m.ngan)).then(function(r2){ var j = doiTuong(r2); if(j){ CU = {}; m.ngan.forEach(function(k){ if(r2[k]!==undefined) CU[k] = r2[k]; }); META = m; } return j; });
      });
    },
    /* sau khi mở app: chuyển lần đầu / so bản / dọn bản cũ quá 30 ngày */
    sauKD: function(){
      if(!me.bat()){ kiemXong(); return Promise.resolve('tat'); }
      var l = lsLuc();
      return me.napMeta().then(function(m){
        kiemXong(); me.donCu(); if(m) me.dauPhien = null;
        if(!m){   /* lần đầu: giữ bản localStorage cũ 30 ngày rồi chép toàn bộ sang IndexedDB */
          var s = me.dauPhien || lsDoc(KHOA), giu = s ? luuFile(BAN_CU, new Blob([s], {type:'application/json'})).then(function(){ var bc = {luc:new Date().toISOString(), kb:Math.round(s.length/1024)}; return dat({_banCu:JSON.stringify(bc)}).then(function(){ me.banCu = bc; }); }) : Promise.resolve();
          me.dauPhien = null; return giu.then(function(){ CU = {}; luuNgay(); return HANG; }).then(function(){ return 'chuyen'; });
        }
        if(l > 0 && m.luc > l){   /* localStorage cũ hơn IndexedDB (ghi localStorage hỏng giữa chừng) → dùng bản IndexedDB */
          return me.napIDB().then(function(j){ if(!j) return 'giu'; window.LN_J = j; nap(); window.LN_J = null; if(typeof HS!=='undefined') HS.ds = D.scan;
            try { capNhatDau(); ve(); } catch(e){} luuNgay(); bao('Đã nạp bản mới hơn của dữ liệu từ IndexedDB.', 5); return 'napIDB'; });
        }
        if(l > m.luc || l===0){ CU = {}; luuNgay(); return 'ghiLai'; }   /* IndexedDB cũ hơn (từng tắt / ghi lỗi) → ghi lại đủ */
        return 'khop';
      }, function(){ kiemXong(); if(!baoHong){ baoHong = true; bao('Trình duyệt không cho dùng IndexedDB — app lưu theo cách cũ (localStorage).', 6); } return 'hong'; });
    },
    napMeta: function(){ return docKhoa(['_meta', '_banCu']).then(function(r){ var m = r._meta ? JSON.parse(r._meta) : null; META = m; me.banCu = r._banCu ? JSON.parse(r._banCu) : null; return m; }); },
    banCu: null, dauPhien: null,   /* chuỗi localStorage lúc mở app (trước mọi lần ghi) — để giữ đúng bản cũ khi chuyển lần đầu */
    donCu: function(){ var b = me.banCu; if(b && Date.now() - new Date(b.luc).getTime() > HAN){ xoaFile(BAN_CU); me.banCu = null; return dat({_banCu:''}).catch(function(){}); } },
    /* ↩ dùng lại bản trước khi chuyển (giữ 30 ngày) — chụp bản hiện tại trước (file 'ln:truocDungLai') */
    dungBanCu: function(){
      return docFile(BAN_CU).then(function(b){ if(!b) throw new Error('Không còn bản cũ (đã quá 30 ngày hoặc máy chưa từng chuyển).'); return b.text(); }).then(function(s){
        var j = JSON.parse(s), hien = me.chuoi({phienBan:PHIEN_BAN, cauHinh:D.cauHinh, vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu, ganDay:D.ganDay, cho:D.cho, bieuMau:D.bieuMau, rac:D.rac, scan:D.scan, lich:D.lich, daXoaHan:D.daXoaHan||[], nguonCau:D.nguonCau||null, kyAnh:D.kyAnh||[], boHS:D.boHS||[]});
        MOI = null;
        return luuFile(TRUOC, new Blob([hien], {type:'application/json'})).then(function(){ window.LN_J = j; nap(); window.LN_J = null; if(typeof HS!=='undefined') HS.ds = D.scan; CU = {}; luuNgay(); return HANG; });
      });
    },
    /* công tắc: 'cu' = quay lại chỉ localStorage · 'ngan' = lưu theo ngăn */
    datCach: function(c){
      if(c==='cu'){
        luuHuy(); var s = JSON.stringify({phienBan:PHIEN_BAN, cauHinh:D.cauHinh, vanBan:D.vanBan, duLieu:D.duLieu, ghiChu:D.ghiChu, ganDay:D.ganDay, cho:D.cho, bieuMau:D.bieuMau, rac:D.rac, scan:D.scan, lich:D.lich, daXoaHan:D.daXoaHan||[], nguonCau:D.nguonCau||null, kyAnh:D.kyAnh||[], boHS:D.boHS||[]});
        try { localStorage.setItem(KHOA, s); } catch(e){ return 'Dữ liệu ('+Math.round(s.length/1024)+' KB) lớn hơn chỗ của localStorage — không quay lại cách cũ được. Giữ lưu theo ngăn.'; }
        try { localStorage.removeItem(CHO); localStorage.setItem(CACH, 'cu'); } catch(e){ return 'Không ghi được công tắc.'; }
        return '';
      }
      try { localStorage.removeItem(CACH); } catch(e){} CU = {}; me.dauPhien = lsDoc(KHOA); me.sauKD(); return '';   /* so dấu bản như lúc mở app: IndexedDB cũ hơn → ghi lại đủ; chưa từng có → chuyển lần đầu */
    },
    /* xóa sạch máy: bỏ cả kho ngăn + dấu chờ */
    xoaHet: function(){ try { localStorage.removeItem(CHO); } catch(e){} CU = {}; return dat({}, true).catch(function(){}); },
    tt: function(){ return {cach:cach(), bat:me.bat(), hong:hong, cho:me.cho(), meta:META, dem:DEM, banCu:me.banCu}; },
    giu: false,   /* true: đang đọc IndexedDB lúc mở app (localStorage trống) — luuNgay() hoãn, không ghi đè */
    _tat: function(v){ tat = !!v; }
  };
  return me;
})();
window.LN_J = null;
if(LN.bat()) try { LN.dauPhien = localStorage.getItem(KHOA); } catch(e){}   /* bản localStorage lúc mở app, trước mọi lần ghi */
/* mở app: localStorage không giữ bản mới nhất (dấu chờ) HOẶC không có dữ liệu → đọc IndexedDB rồi mới khởi động; bình thường khởi động ngay như cũ rồi kiểm sau.
   Không có dữ liệu ở localStorage mà IndexedDB có = localStorage bị xóa / mất (Chromium có lúc xóa cả kho localStorage sau lần ghi quá chỗ) → KHÔNG coi là máy mới, không ghi đè IndexedDB. */
var LN_KD = khoiDong;
khoiDong = function(){
  var cho = LN.cho(), trong = false; try { trong = !localStorage.getItem(KHOA); } catch(e){}
  if(LN.bat() && cho) return LN.napIDB().then(function(j){ window.LN_J = j; if(!j) LN._tat(1); }, function(){ LN._tat(1); }).then(function(){
    LN_KD(); window.LN_J = null;
    if(LN.bat()) LN.sauKD(); else baoLoi('Không đọc được dữ liệu ở IndexedDB — vào ⚙ Khai báo đơn vị › 💾 Sao lưu để lấy lại từ bản tự lưu / Drive.'); });
  if(LN.bat() && trong){   /* localStorage trống: khởi động ngay (máy mới) nhưng GIỮ mọi lần ghi tới khi đọc xong IndexedDB */
    LN.giu = true; LN_KD();
    return LN.napIDB().then(function(j){ return j; }, function(){ return null; }).then(function(j){
      var co = j && ['vanBan', 'duLieu', 'ghiChu', 'scan', 'bieuMau', 'kyAnh', 'boHS'].some(function(k){ return (j[k] || []).length; }) || j && j.cauHinh && Object.keys(j.cauHinh).some(function(k){ return !(k in MAC_DINH) && !(typeof chRieng==='function' && chRieng(k)); });   /* có văn bản / dữ liệu / khai báo thật (không chỉ mặc định) */
      if(co){ window.LN_J = j; nap(); window.LN_J = null; if(typeof HS!=='undefined') HS.ds = D.scan; try { capNhatDau(); ve(); } catch(e){} bao('Đã nạp dữ liệu từ IndexedDB (bản ở localStorage bị mất).', 6); }
      LN.giu = false; if(co) luuNgay(); return LN.sauKD(); });
  }
  LN_KD(); if(LN.bat()) setTimeout(function(){ LN.sauKD(); }, 50);
};

/* ---------- giao diện: nhóm 🗄 Nơi lưu trong tab 💾 Sao lưu ---------- */
function lnHTML(){
  var t = LN.tt(), m = t.meta, b = t.banCu, ls = 0; try { ls = (localStorage.getItem(KHOA) || '').length; } catch(e){}
  return '<div class="hso-kb-nhom"><b>🗄 Nơi lưu dữ liệu trên máy này</b> <small>(3.223: lưu theo ngăn trong IndexedDB — chỉ ghi phần đổi; vẫn giữ bản localStorage khi còn chỗ)</small>'+
    '<div class="sl-phu">Cách đang dùng: <b>'+(t.bat ? 'theo ngăn (IndexedDB)' : t.hong ? 'cũ — trình duyệt không cho IndexedDB' : 'cũ (chỉ localStorage) — anh đã tắt')+'</b>'+
      ' · localStorage '+Math.round(ls/1024)+' KB'+(t.cho ? ' (đã đầy — dữ liệu đọc từ IndexedDB)' : '')+
      (m ? ' · IndexedDB ghi lần cuối '+kbGioVN(new Date(m.luc).toISOString())+' ('+m.ngan.length+' ngăn)' : '')+'</div>'+
    (b ? '<div class="sl-phu">Bản cũ lúc chuyển: '+kbGioVN(b.luc)+' · '+b.kb+' KB — giữ đến '+kbGioVN(new Date(new Date(b.luc).getTime()+30*864e5).toISOString()).slice(6)+'.</div>' : '')+
    '<div class="hang-nut">'+(t.bat ? '<button class="nho" onclick="lnDoiCach(\'cu\')">↩ Quay lại cách lưu cũ</button>' : t.hong ? '' : '<button class="nho chinh" onclick="lnDoiCach(\'ngan\')">🗄 Bật lưu theo ngăn</button>')+
      (b ? '<button class="nho" onclick="lnDungBanCu()">↩ Dùng lại dữ liệu lúc chuyển</button>' : '')+'</div></div>';
}
function lnDoiCach(c, khongHoi){
  var lam = function(){ var e = LN.datCach(c); if(e) return baoLoi(e); bao(c==='cu' ? 'Đã quay lại cách lưu cũ (localStorage) trên máy này.' : 'Đã bật lưu theo ngăn (IndexedDB).'); try { hsoKBHop('sl'); } catch(x){} };
  if(khongHoi) return lam();
  hoi(c==='cu' ? 'Quay lại cách lưu cũ?' : 'Bật lưu theo ngăn?', c==='cu' ? 'Máy này chỉ lưu ở localStorage như trước 3.223 (giới hạn ~5 MB). Dữ liệu hiện tại được ghi sang localStorage trước; bật lại lúc nào cũng được.' : 'Dữ liệu được chép sang IndexedDB, mỗi lần lưu chỉ ghi phần đổi.', c==='cu' ? 'Quay lại' : 'Bật', lam);
}
function lnDungBanCu(khongHoi){
  var lam = function(){ return LN.dungBanCu().then(function(){ bao('Đã dùng lại dữ liệu lúc chuyển. Bản ngay trước đó đã được giữ lại (ln:truocDungLai).'); try { capNhatDau(); ve(); hsoKBHop('sl'); } catch(e){} }, function(e){ baoLoi(e.message || String(e)); }); };
  if(khongHoi) return lam();
  hoi('Dùng lại dữ liệu lúc chuyển sang lưu theo ngăn?', 'Mọi văn bản, dữ liệu, cài đặt trên máy trở về như lúc chuyển — phần làm sau đó mất (app giữ bản hiện tại trước khi đổi). Chỉ dùng khi lưu theo ngăn bị lỗi.', 'Dùng lại', lam);
}
var LN_SL = kbSaoLuuHTML;
kbSaoLuuHTML = function(){ return lnHTML()+LN_SL(); };
