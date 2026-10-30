// 3.419 P1 (KE_HOACH_NANG_CAP_0111): bản máy tính chạy không mạng — dt-sw.js (chung bản ĐT) cất index.html + js/** + css/** khi có mạng (luôn lấy bản mới),
//   mất mạng vẫn mở được app. Chạy máy chủ tạm localhost (bộ đệm chỉ chạy trên https / localhost). Không dữ liệu thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path = require('path'), http = require('http'), fs = require('fs');
const GOC = path.resolve(__dirname, '..');
const sv = http.createServer((q, r)=>{ let f = decodeURIComponent(q.url.split('?')[0]); if(f.endsWith('/')) f += 'index.html'; const p = path.join(GOC, f);
  if(!p.startsWith(GOC) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ r.writeHead(404); return r.end(); }
  const t = {'.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json'}[path.extname(p)] || 'application/octet-stream';
  r.writeHead(200, {'Content-Type':t+'; charset=utf-8'}); fs.createReadStream(p).pipe(r); });
(async()=>{ await new Promise(r=>sv.listen(0, '127.0.0.1', r)); const port = sv.address().port, url = 'http://127.0.0.1:'+port+'/index.html';
 const b = await chromium.launch(); const ctx = await b.newContext(); const p = await ctx.newPage(); const o = [], ok = (t, d, c)=>o.push((d ? '✓ ' : '✗ ')+t+(c!==undefined ? ' — '+c : ''));
 await p.route(/accounts\.google|apis\.google|cdnjs/, r=>r.abort());
 await p.goto(url); await p.waitForTimeout(2500);
 const dk = await p.evaluate(async()=>{ const r = await navigator.serviceWorker.getRegistration(); return !!r; });
 ok('mở app có mạng → đăng ký bộ đệm', dk);
 await p.reload(); await p.waitForTimeout(2500);   /* lần 2: bộ đệm đã điều khiển trang → cất tệp */
 const n = await p.evaluate(async()=>{ const c = await caches.open('tuhoso-may'); return (await c.keys()).length; });
 ok('đã cất khung app (index.html + js + css)', n>50, n+' tệp');
 await ctx.setOffline(true); await p.reload(); await p.waitForTimeout(2500);
 const r = await p.evaluate(()=>({ban:typeof APP_BAN!=='undefined' ? APP_BAN : '', menu:!!document.querySelector('#tr0, #tr7')}));
 ok('MẤT MẠNG → vẫn mở được app đúng bản', !!r.ban && r.menu, JSON.stringify(r));
 await ctx.setOffline(false);
 o.forEach(x=>console.log(x)); const sai = o.filter(x=>x[0]==='✗').length; console.log((o.length-sai)+'/'+o.length+' đạt'); await b.close(); sv.close(); process.exit(sai ? 1 : 0);
})();
