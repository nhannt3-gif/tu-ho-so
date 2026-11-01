/* 3.233 — bản điện thoại chạy không mạng: chỉ giữ tệp của dt.html (không đụng bản máy tính). Mạng có → lấy bản mới, cất lại; mất mạng → dùng bản đã cất. */
var KHO = 'tuhoso-dt-3.436';
var TEP = ['dt.html', 'css/dt.css', 'js/01-thu-vien.js', 'js/dt/dt-lich.js', 'js/dt/dt-nen.js', 'js/dt/dt-giao-dien.js'];
self.addEventListener('install', function(e){ self.skipWaiting(); e.waitUntil(caches.open(KHO).then(function(c){ return c.addAll(TEP).catch(function(){}); })); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ds){ return Promise.all(ds.filter(function(k){ return /^tuhoso-dt-/.test(k) && k!==KHO; }).map(function(k){ return caches.delete(k); })); })); });
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url); if(e.request.method!=='GET' || u.origin!==location.origin) return;
  var ten = u.pathname.split('/').slice(-2).join('/'), co = TEP.some(function(t){ return u.pathname.slice(-t.length)===t || ten===t; });
  if(!co){   /* 3.419 P1 (KE_HOACH_NANG_CAP_0111): bản máy tính — index.html + js/** + css/** : có mạng lấy bản mới rồi cất (kho cố định 'tuhoso-may', khóa = URL đủ ?v=), mất mạng → bản đã cất đúng ?v=, không có thì bản gần nhất */
    var may = /\/(index\.html)?$/.test(u.pathname) || /\/(js|css)\/.+\.(js|css)$/.test(u.pathname);
    if(!may) return;
    e.respondWith(fetch(e.request).then(function(r){ if(r.ok && r.type==='basic'){ var b = r.clone(); caches.open('tuhoso-may').then(function(c){ c.put(e.request, b); }); } return r; })
      .catch(function(){ return caches.open('tuhoso-may').then(function(c){ return c.match(e.request).then(function(x){ return x || c.match(e.request, {ignoreSearch:true}); }); }); }));
    return;
  }
  e.respondWith(fetch(e.request).then(function(r){ if(r.ok){ var b = r.clone(); caches.open(KHO).then(function(c){ c.put(e.request, b); }); } return r; })
    .catch(function(){ return caches.match(e.request, {ignoreSearch:true}); }));
});
