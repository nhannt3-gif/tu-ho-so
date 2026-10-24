/* 3.233 — bản điện thoại chạy không mạng: chỉ giữ tệp của dt.html (không đụng bản máy tính). Mạng có → lấy bản mới, cất lại; mất mạng → dùng bản đã cất. */
var KHO = 'tuhoso-dt-3.343';
var TEP = ['dt.html', 'css/dt.css', 'js/01-thu-vien.js', 'js/dt/dt-nen.js', 'js/dt/dt-giao-dien.js'];
self.addEventListener('install', function(e){ self.skipWaiting(); e.waitUntil(caches.open(KHO).then(function(c){ return c.addAll(TEP).catch(function(){}); })); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ds){ return Promise.all(ds.filter(function(k){ return /^tuhoso-dt-/.test(k) && k!==KHO; }).map(function(k){ return caches.delete(k); })); })); });
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url); if(e.request.method!=='GET' || u.origin!==location.origin) return;
  var ten = u.pathname.split('/').slice(-2).join('/'), co = TEP.some(function(t){ return u.pathname.slice(-t.length)===t || ten===t; });
  if(!co) return;   /* tệp khác (bản máy tính) đi thẳng mạng như cũ */
  e.respondWith(fetch(e.request).then(function(r){ if(r.ok){ var b = r.clone(); caches.open(KHO).then(function(c){ c.put(e.request, b); }); } return r; })
    .catch(function(){ return caches.match(e.request, {ignoreSearch:true}); }));
});
