/* ==========================================================
   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được
   Lần đầu có mạng: tải về và cất vào máy.
   Những lần sau: nạp thẳng từ máy, không cần mạng.
   ========================================================== */
var THU_VIEN = window.THU_VIEN_DT || [   /* 3.231: bản điện thoại (dt.html) đặt danh sách riêng trước khi nạp file này */
  {ten:'pdfjs',  url:'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js'},
  {ten:'pdfjsw', url:'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js', giuNguyen:true},
  {ten:'pdflib', url:'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'},
  {ten:'xlsx',   url:'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'}
];
var TV = {san:{}, loi:[]};
/* 3.551 E3 (DANH_GIA_CHUYEN_GIA_1511.md mục 4d): DẤU VÂN TAY THƯ VIỆN (như SRI) — tải mới từ mạng thì băm SHA-384 so bảng dưới; sai → không chạy, không cất (CDN bị sửa mã thì app không nạp).
   Thư viện chính chuyển cdnjs → jsDelivr npm cùng bản (byte đúng gói npm — đúng bản phép thử dùng ở tests/lib). Bản đã cất trong máy dùng tiếp như cũ.
   Thêm / nâng thư viện: tính lại bằng  openssl dgst -sha384 -binary <file npm> | base64  (tests/README.md mục Chuẩn bị). */
var TV_DAU = {
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js':'/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e',
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js':'SnzOobpRMLXZ52iJvZm/C0fYw0OQemTXzTjIsdsfMcrCtCEe9qgzxTd3RSklO5x2',
  'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js':'weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js':'vtjasyidUo0kW94K5MXDXntzOJpQgBKXmE7e2Ga4LG0skTTLeBi97eFAXsqewJjw',
  'https://cdn.jsdelivr.net/npm/heic-to@1.6.5/dist/iife/heic-to.js':'pztinaMu47Qnun2X85+8CYi3nu+Sz1aLjadtPyHxdG2G9otfa3kLoI1w+HiCVEjK',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js':'b5Ya4Bq3qCyz39m2ISh+4DxjAIljdeFwK/BsXLuj9gugaNwAcj/ia15fxNZL9Nlx'
};
function tvKiemDau(url, buf){   /* → Promise(chữ) hoặc lỗi khi sai dấu; trình duyệt không có crypto.subtle → bỏ qua kiểm */
  var can = TV_DAU[url], chu = new TextDecoder('utf-8').decode(buf);
  if(!can || !(window.crypto && crypto.subtle)) return Promise.resolve(chu);
  return crypto.subtle.digest('SHA-384', buf).then(function(h){
    var b = '', a = new Uint8Array(h); for(var i = 0; i < a.length; i++) b += String.fromCharCode(a[i]);
    if(btoa(b)!==can) throw new Error('sai dấu vân tay thư viện — không nạp (CDN trả về mã khác bản đã duyệt)');
    return chu; });
}

function khoTV(){
  return new Promise(function(ok,loi){
    try{
      var r = indexedDB.open('tuhoso_tv', 1);
      r.onupgradeneeded = function(e){
        var db = e.target.result;
        if(!db.objectStoreNames.contains('t')) db.createObjectStore('t');
      };
      r.onsuccess = function(e){ ok(e.target.result); };
      r.onerror = function(){ loi(r.error); };
    }catch(e){ loi(e); }
  });
}
function tvDoc(k){
  return khoTV().then(function(db){
    return new Promise(function(ok){
      var q = db.transaction('t','readonly').objectStore('t').get(k);
      q.onsuccess = function(){ ok(q.result||null); };
      q.onerror = function(){ ok(null); };
    });
  }).catch(function(){ return null; });
}
function tvGhi(k, v){
  return khoTV().then(function(db){
    return new Promise(function(ok){
      var t = db.transaction('t','readwrite');
      t.objectStore('t').put(v, k);
      t.oncomplete = function(){ ok(true); }; t.onerror = function(){ ok(false); };
    });
  }).catch(function(){ return false; });
}

function napMotTV(tv){
  return tvDoc(tv.ten).then(function(ma){
    if(ma) return {ma:ma, tuMay:true};
    return fetch(tv.url).then(function(r){
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.arrayBuffer();
    }).then(function(buf){ return tvKiemDau(tv.url, buf); }).then(function(ma2){
      tvGhi(tv.ten, ma2);
      return {ma:ma2, tuMay:false};
    });
  }).then(function(kq){
    if(tv.giuNguyen){ TV[tv.ten] = kq.ma; return; }
    if(tv.css){ var st = document.createElement('style'); st.textContent = kq.ma; document.head.appendChild(st); TV.san[tv.ten] = true; return; }   /* 3.231: thư viện CSS */
    var b = document.createElement('script');
    b.textContent = kq.ma;
    document.head.appendChild(b);
    TV.san[tv.ten] = true;
  }).catch(function(e){
    TV.loi.push(tv.ten);
    console.warn('Không nạp được thư viện '+tv.ten, e);
  });
}
var xongTV = Promise.all(THU_VIEN.map(napMotTV));
