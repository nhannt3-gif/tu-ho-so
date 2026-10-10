/* ==========================================================
   BỘ NẠP THƯ VIỆN — có bộ nhớ đệm để offline vẫn dùng được
   Lần đầu có mạng: tải về và cất vào máy.
   Những lần sau: nạp thẳng từ máy, không cần mạng.
   ========================================================== */
var THU_VIEN = [
  {ten:'pdfjs',  url:'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'},
  {ten:'pdfjsw', url:'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js', giuNguyen:true},
  {ten:'pdflib', url:'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'},
  {ten:'xlsx',   url:'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'}
];
var TV = {san:{}, loi:[]};

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
      return r.text();
    }).then(function(ma2){
      tvGhi(tv.ten, ma2);
      return {ma:ma2, tuMay:false};
    });
  }).then(function(kq){
    if(tv.giuNguyen){ TV[tv.ten] = kq.ma; return; }
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
