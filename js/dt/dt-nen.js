/* ===== 3.231 (anh duyệt 17/10/2026 — KE_HOACH_CHUAN_HOA mục 8–9): BẢN ĐIỆN THOẠI — LÕI (không giao diện) =====
   - Khóa PIN: PIN → PBKDF2 (SHA-256, 150.000 vòng, muối ngẫu nhiên) → khóa AES-GCM 256; dữ liệu trong máy chỉ lưu dạng mã hóa (IndexedDB "tuhoso_dt").
     Sai 5 lần → chờ 1 phút; sai 10 lần → xóa dữ liệu trong máy (tải lại từ Drive được). Để yên / ẩn app quá DT_KHOA_SAU → khóa, xóa dữ liệu đang mở khỏi bộ nhớ.
   - Drive CHỈ ĐỌC: đăng nhập Google (cùng Client ID, quyền drive.file như bản máy tính) → tải `<thư mục>/_Hệ thống/xem/xem.json.gz` (máy tính tự đẩy — js/38-goi-xem.js).
   - Hộp riêng DT (chuẩn mới QUY_CHUAN mục 10): chỉ để lộ hàm cửa. */
var DT = (function(){
  var KHO_TEN = 'tuhoso_dt', CID = '365646961906-j476flafsqdgnl7cbbfr59kimf0t8t5c.apps.googleusercontent.com';   /* = CLIENT_ID_MAC_DINH bản máy tính */
  var S = {khoa:null, goi:null, token:'', hetHan:0, cho:0, hen:null};
  var CH = (function(){ try { return JSON.parse(localStorage.getItem('tuhoso_dt_ch') || '{}'); } catch(e){ return {}; } })();
  function chLuu(){ try { localStorage.setItem('tuhoso_dt_ch', JSON.stringify(CH)); } catch(e){} }
  /* ---------- kho trong máy (IndexedDB, chỉ chứa bản mã hóa) ---------- */
  function db(){ return new Promise(function(ok, loi){ var r = indexedDB.open(KHO_TEN, 1); r.onupgradeneeded = function(e){ e.target.result.createObjectStore('k'); }; r.onsuccess = function(e){ ok(e.target.result); }; r.onerror = function(){ loi(r.error); }; }); }
  function doc(k){ return db().then(function(d){ return new Promise(function(ok){ var q = d.transaction('k').objectStore('k').get(k); q.onsuccess = function(){ ok(q.result || null); }; q.onerror = function(){ ok(null); }; }); }); }
  function ghi(k, v){ return db().then(function(d){ return new Promise(function(ok, loi){ var t = d.transaction('k', 'readwrite'); if(v===null) t.objectStore('k').delete(k); else t.objectStore('k').put(v, k); t.oncomplete = function(){ ok(true); }; t.onerror = function(){ loi(t.error); }; }); }); }
  /* ---------- mã hóa ---------- */
  var MA = new TextEncoder(), GIAI = new TextDecoder();
  function ngauNhien(n){ var a = new Uint8Array(n); crypto.getRandomValues(a); return a; }
  function khoaTuPIN(pin, muoi){ return crypto.subtle.importKey('raw', MA.encode(String(pin)), 'PBKDF2', false, ['deriveKey']).then(function(k){
    return crypto.subtle.deriveKey({name:'PBKDF2', salt:muoi, iterations:150000, hash:'SHA-256'}, k, {name:'AES-GCM', length:256}, false, ['encrypt', 'decrypt']); }); }
  function maHoa(khoa, du){ var iv = ngauNhien(12); return crypto.subtle.encrypt({name:'AES-GCM', iv:iv}, khoa, du instanceof Uint8Array ? du : MA.encode(du)).then(function(c){ return {iv:iv, c:new Uint8Array(c)}; }); }
  function giaiMa(khoa, x){ return crypto.subtle.decrypt({name:'AES-GCM', iv:x.iv}, khoa, x.c).then(function(b){ return new Uint8Array(b); }); }
  function nenGzip(u8, giai){ var s = new Blob([u8]).stream().pipeThrough(giai ? new DecompressionStream('gzip') : new CompressionStream('gzip')); return new Response(s).arrayBuffer().then(function(b){ return new Uint8Array(b); }); }
  /* ---------- PIN ---------- */
  function coPIN(){ return doc('kiem').then(function(x){ return !!x; }); }
  function datPIN(pin){   /* lần đầu / đổi PIN: muối mới, mã hóa lại gói đang mở */
    if(!/^\d{4,8}$/.test(String(pin))) return Promise.reject(new Error('PIN 4–8 chữ số'));
    var muoi = ngauNhien(16);
    return khoaTuPIN(pin, muoi).then(function(k){ S.khoa = k; return maHoa(k, 'tuhoso-ok'); }).then(function(x){ return ghi('muoi', muoi).then(function(){ return ghi('kiem', x); }); })
      .then(function(){ CH.sai = 0; CH.cho = 0; chLuu(); return S.goi ? cat(S.goi) : true; });
  }
  function moKhoa(pin){
    var cho = (CH.cho || 0) - Date.now(); if(cho>0) return Promise.reject(new Error('Sai nhiều lần — chờ '+Math.ceil(cho/1000)+' giây'));
    return Promise.all([doc('muoi'), doc('kiem')]).then(function(a){
      if(!a[0] || !a[1]) throw new Error('Chưa đặt PIN');
      return khoaTuPIN(pin, a[0]).then(function(k){ return giaiMa(k, a[1]).then(function(){ return k; }); });
    }).then(function(k){ S.khoa = k; CH.sai = 0; chLuu(); henKhoa(); return docGoi(); }, function(e){
      if(/Chưa đặt PIN/.test(e.message)) throw e;
      CH.sai = (CH.sai || 0)+1; if(CH.sai>=5) CH.cho = Date.now()+60000; chLuu();
      if(CH.sai>=10) return xoaMay().then(function(){ throw new Error('Sai PIN 10 lần — đã xóa dữ liệu trong máy. Đặt PIN mới và tải lại từ Drive.'); });
      throw new Error('PIN chưa đúng'+(CH.sai>=3 ? ' (sai '+CH.sai+' lần)' : '')); });
  }
  function khoa(){ S.khoa = null; S.goi = null; DS.vanban = null; DS.scan = null; GDX = null; clearTimeout(S.hen); if(DT.khiKhoa) DT.khiKhoa(); }
  function henKhoa(){ clearTimeout(S.hen); S.hen = setTimeout(khoa, DT_KHOA_SAU); }
  var DT_KHOA_SAU = 5*60000, AN_LUC = 0;
  document.addEventListener('visibilitychange', function(){ if(document.hidden) AN_LUC = Date.now(); else if(S.khoa && AN_LUC && Date.now()-AN_LUC > 2*60000) khoa(); });
  ['touchstart', 'keydown', 'click'].forEach(function(ev){ document.addEventListener(ev, function(){ if(S.khoa) henKhoa(); }, {passive:true}); });
  function xoaMay(){ S.goi = null; S.khoa = null; GDX = null; return Promise.all([ghi('goi', null), ghi('kiem', null), ghi('muoi', null), ghi('gdx', null)]).then(function(){ CH = {}; chLuu(); }); }
  /* ---------- gói số liệu (mã hóa trong máy) ---------- */
  function cat(g){ return nenGzip(MA.encode(JSON.stringify(g))).then(function(z){ return maHoa(S.khoa, z); }).then(function(x){ return ghi('goi', x); }); }
  function docGoi(){ return doc('goi').then(function(x){ if(!x || !S.khoa) return null; return giaiMa(S.khoa, x.c ? x : x).then(function(z){ return nenGzip(z, true); }).then(function(u){ S.goi = lapChiMuc(JSON.parse(GIAI.decode(u))); return S.goi; }); }); }
  function napGoi(g){   /* gói mới (tải từ Drive / phép thử) → giữ trong bộ nhớ + cất mã hóa */
    if(!g || g.v!==1 || !g.to || !Array.isArray(g.kh)) return Promise.reject(new Error('Gói số liệu không đúng dạng'));
    S.goi = lapChiMuc(g); CH.ky = g.ky; CH.luc = g.luc; chLuu(); return S.khoa ? cat(g).then(function(){ return S.goi; }) : Promise.resolve(S.goi);
  }
  function boDau(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function lapChiMuc(g){ g.kh.forEach(function(k){ k.q = ' '+boDau([k[1], k[0], k[3], k[5], k[6]].join(' '))+' '; }); return g; }
  /* ---------- Drive chỉ đọc ---------- */
  function napGIS(){ if(window.google && google.accounts) return Promise.resolve(); return new Promise(function(ok, loi){ var s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.onload = ok; s.onerror = function(){ loi(new Error('Không tải được đăng nhập Google (mất mạng?)')); }; document.head.appendChild(s); }); }
  function dangNhap(im){
    if(S.token && Date.now() < S.hetHan-60000) return Promise.resolve(true);
    if(location.protocol!=='https:') return Promise.reject(new Error('Cần mở app qua đường dẫn https'));
    return napGIS().then(function(){ return new Promise(function(ok, loi){
      var tc = google.accounts.oauth2.initTokenClient({client_id:CH.cid || CID, scope:'https://www.googleapis.com/auth/drive.file',
        callback:function(kq){ if(kq && kq.access_token){ S.token = kq.access_token; S.hetHan = Date.now()+(kq.expires_in || 3500)*1000; ok(true); } else loi(new Error('Không nhận được quyền')); },
        error_callback:function(){ loi(new Error('Đã hủy đăng nhập')); }});
      tc.requestAccessToken({prompt:im ? '' : 'consent'}); }); });
  }
  function goi(url, nhi){ return fetch(url, {headers:{Authorization:'Bearer '+S.token}}).then(function(r){ if(!r.ok) throw new Error('Drive báo lỗi '+r.status); return nhi ? r.arrayBuffer() : r.json(); }); }
  function tim(ten, cha, thuMuc){ var q = "name='"+String(ten).replace(/'/g, "\\'")+"' and trashed=false and '"+cha+"' in parents"+(thuMuc ? " and mimeType='application/vnd.google-apps.folder'" : '');
    return goi('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+'&fields=files(id,modifiedTime)&pageSize=1').then(function(k){ return (k.files || [])[0] || null; }); }
  function taiGoi(){   /* Drive → gói mới nhất (bỏ qua nếu không đổi) */
    var duong = [CH.thuMuc || 'Tủ hồ sơ', '_Hệ thống', 'xem'];
    return dangNhap(true).catch(function(){ return dangNhap(false); }).then(function(){
      return duong.reduce(function(p, ten){ return p.then(function(cha){ if(!cha) return null; return tim(ten, cha, true).then(function(f){ return f && f.id; }); }); }, Promise.resolve('root'));
    }).then(function(idTM){ if(!idTM) throw new Error('Chưa có số liệu cho điện thoại trên Drive — trên máy tính bật ⚙ Khai báo đơn vị › 💾 Sao lưu › 📱 Bản điện thoại');
      return tim('xem.json.gz', idTM); })
    .then(function(f){ if(!f) throw new Error('Chưa có gói số liệu — máy tính chưa đẩy');
      if(S.goi && CH.drive===f.modifiedTime) return {moi:false, goi:S.goi};
      return goi('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', true).then(function(b){ return nenGzip(new Uint8Array(b), true); })
        .then(function(u){ return napGoi(JSON.parse(GIAI.decode(u))); }).then(function(g){ CH.drive = f.modifiedTime; chLuu(); return {moi:true, goi:g}; }); });
  }
  /* ---------- truy vấn số liệu ---------- */
  function tong(ds){ var r = {dn:0, qh:0, kn:0, ho:0, mon:0, to:0}; ds.forEach(function(t){ r.dn += t.dn; r.qh += t.qh; r.kn += t.kn; r.ho += t.ho; r.mon += t.mon; if(!t.tt1) r.to++; }); return r; }
  function dsTo(loc){ var g = S.goi; if(!g) return []; return Object.keys(g.to).map(function(m){ var t = g.to[m]; t.ma = m; return t; }).filter(function(t){
    return (!loc.xa || t.xa===loc.xa) && (!loc.diem || (t.diem||'_')===loc.diem) && (!loc.hoi || (t.hoi||'_')===loc.hoi); }); }
  function nhom(loc, cap){   /* nhóm tổ của cấp dưới: cap = xa | diem | hoi | to */
    var ds = dsTo(loc), m = {}, k = function(t){ return cap==='xa' ? t.xa : cap==='diem' ? (t.diem||'_') : cap==='hoi' ? (t.hoi||'_') : t.ma;   /* '_' = nhóm trống (vay trực tiếp…); '-' trên đường dẫn = chưa chọn */ };
    var ten = function(t){ return cap==='xa' ? t.tenXa : cap==='diem' ? (t.tt1 ? 'Vay trực tiếp' : t.tenDiem || 'Chưa rõ điểm') : cap==='hoi' ? (t.tenHoi || 'Chưa rõ hội') : t.ten; };
    ds.forEach(function(t){ var x = m[k(t)] = m[k(t)] || {k:k(t), ten:ten(t), ds:[]}; x.ds.push(t); });
    return Object.keys(m).map(function(x){ var n = m[x]; n.s = tong(n.ds); return n; }).sort(function(a, b){ return String(a.ten).localeCompare(String(b.ten), 'vi', {numeric:true}); });
  }
  function timKH(q, n){ var g = S.goi; if(!g) return {ds:[], du:0}; var t = boDau(q).split(' ').filter(Boolean); if(!t.length) return {ds:[], du:0};
    var ra = g.kh.filter(function(k){ return t.every(function(w){ return k.q.indexOf(' '+w)>=0 || (w.length>=4 && k.q.indexOf(w)>=0); }); }); return {ds:ra.slice(0, n || 100), du:ra.length}; }
  function kh(ma){ var g = S.goi; return g ? g.kh.find(function(k){ return k[0]===ma; }) || null : null; }
  function khTo(ma){ var g = S.goi; return g ? g.kh.filter(function(k){ return k[7]===ma; }) : []; }
  /* ---------- 3.232: Văn bản · Scan (đọc danh sách theo khối trên Drive, tải file, gửi file vào khay chờ) ---------- */
  var DS = {vanban:null, scan:null};
  function thuMuc(ten, cha, tao){ return tim(ten, cha, true).then(function(f){ if(f || !tao) return f && f.id;
    return fetch('https://www.googleapis.com/drive/v3/files?fields=id', {method:'POST', headers:{Authorization:'Bearer '+S.token, 'Content-Type':'application/json'}, body:JSON.stringify({name:ten, mimeType:'application/vnd.google-apps.folder', parents:[cha]})})
      .then(function(r){ if(!r.ok) throw new Error('Drive báo lỗi '+r.status); return r.json(); }).then(function(x){ return x.id; }); }); }
  function duong(ds, tao){ return dangNhap(true).catch(function(){ return dangNhap(false); }).then(function(){
    return [CH.thuMuc || 'Tủ hồ sơ'].concat(ds).reduce(function(p, ten){ return p.then(function(cha){ return cha ? thuMuc(ten, cha, tao) : null; }); }, Promise.resolve('root')); }); }
  function taiKhoi(loai){   /* loai = vanban | scan → [mục] (gộp các lô năm / tháng, bỏ mục đã xóa) */
    var ngan = loai==='vanban' ? ['vanBan'] : ['scan', 'kyAnh'];
    return duong(['_Hệ thống', 'khoi']).then(function(id){ if(!id) throw new Error('Chưa có danh sách trên Drive (máy tính chưa đồng bộ theo khối)');
      var q = "'"+id+"' in parents and trashed=false and name contains '"+loai+"__'";
      return goi('https://www.googleapis.com/drive/v3/files?q='+encodeURIComponent(q)+'&fields=files(id,name,modifiedTime)&pageSize=200'); })
    .then(function(k){ return Promise.all((k.files || []).filter(function(f){ return !/__rac/.test(f.name); }).map(function(f){ return goi('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media'); })); })
    .then(function(ds){ var ra = []; ds.forEach(function(j){ ngan.forEach(function(n){ ((j && j.ngan && j.ngan[n]) || []).forEach(function(m){ if(m && !m.daXoa) ra.push(m); }); }); });
      ra.sort(function(a, b){ return String(b.ngay || b.taoLuc || '').localeCompare(String(a.ngay || a.taoLuc || '')); }); DS[loai] = ra; return ra; });
  }
  function taiFile(id){ return dangNhap(true).catch(function(){ return dangNhap(false); }).then(function(){
    return fetch('https://www.googleapis.com/drive/v3/files/'+id+'?alt=media', {headers:{Authorization:'Bearer '+S.token}}); }).then(function(r){ if(!r.ok) throw new Error('Không tải được file ('+r.status+')'); return r.blob(); }); }
  function guiKhay(bl, ten){   /* 💾 Lưu vào app = đưa vào khay _Chờ xử lý trên Drive → máy tính "Nạp khay chờ" để khai báo */
    return duong(['_Chờ xử lý'], true).then(function(id){ var bien = '----tuhosodt'+Date.now();
      var body = new Blob(['--'+bien+'\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'+JSON.stringify({name:ten, parents:[id]})+'\r\n--'+bien+'\r\nContent-Type: '+(bl.type || 'application/octet-stream')+'\r\n\r\n', bl, '\r\n--'+bien+'--'], {type:'multipart/related; boundary='+bien});
      return fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {method:'POST', headers:{Authorization:'Bearer '+S.token, 'Content-Type':'multipart/related; boundary='+bien}, body:body}); })
      .then(function(r){ if(!r.ok) throw new Error('Chưa gửi được ('+r.status+')'); return true; }); }
  /* 3.233: 🏢 Giao dịch xã — bản mini máy tính đẩy kèm (gdx.html.gz), cất mã hóa như gói số liệu */
  var GDX = null;
  function napGDX(html){ GDX = String(html || ''); return S.khoa ? nenGzip(MA.encode(GDX)).then(function(z){ return maHoa(S.khoa, z); }).then(function(x){ return ghi('gdx', x); }).then(function(){ return GDX; }) : Promise.resolve(GDX); }
  function docGDX(){ if(GDX) return Promise.resolve(GDX); return doc('gdx').then(function(x){ if(!x || !S.khoa) return ''; return giaiMa(S.khoa, x).then(function(z){ return nenGzip(z, true); }).then(function(u){ GDX = GIAI.decode(u); return GDX; }); }); }
  function taiGDX(){ return duong(['_Hệ thống', 'xem']).then(function(id){ if(!id) throw new Error('Chưa có trên Drive — máy tính bật 📱 Bản điện thoại');
      return tim('gdx.html.gz', id); }).then(function(f){ if(!f) throw new Error('Chưa có bản Giao dịch xã — máy tính chưa đẩy (cần có điểm GD)');
      return goi('https://www.googleapis.com/drive/v3/files/'+f.id+'?alt=media', true); }).then(function(b){ return nenGzip(new Uint8Array(b), true); }).then(function(u){ return napGDX(GIAI.decode(u)); }); }
  function locDS(loai, q){ var ds = DS[loai] || [], t = boDau(q).split(' ').filter(Boolean); if(!t.length) return ds;
    return ds.filter(function(m){ var c = ' '+boDau([m.soHieu, m.trichYeu, m.ten, m.maKH, m.loai, m.ap, m.to, m.coQuan].join(' '))+' '; return t.every(function(w){ return c.indexOf(w)>=0; }); }); }
  return {coPIN:coPIN, datPIN:datPIN, moKhoa:moKhoa, khoa:khoa, xoaMay:xoaMay, napGoi:napGoi, taiGoi:taiGoi, goi:function(){ return S.goi; }, moi:function(){ return !!S.khoa; },
    tong:tong, dsTo:dsTo, nhom:nhom, taiKhoi:taiKhoi, ds:function(l){ return DS[l]; }, datDS:function(l, ds){ DS[l] = ds; }, napGDX:napGDX, docGDX:docGDX, taiGDX:taiGDX, locDS:locDS, taiFile:taiFile, guiKhay:guiKhay, timKH:timKH, kh:kh, khTo:khTo, boDau:boDau, ch:CH, chLuu:chLuu, khiKhoa:null};
})();
