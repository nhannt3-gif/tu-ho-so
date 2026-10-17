// 3.236 (R3 phần 2): khuôn Word KTGS (js/khuon/kt-khuon.js) KHÔNG nạp lúc mở app, tải khi cần (ktKhuon) — 1 lần, giữ cờ in 1 / 2 mặt lúc gọi, Kế hoạch năm tự tải. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const ev = f=>p.evaluate(f);
 let r = await ev(async()=>{ await xongTV; try{dongHop()}catch(e){} return {co:typeof window.KT_KHUON, the:!!document.querySelector('script[src*="kt-khuon"]')}; });
 ok('mở app: chưa nạp khuôn Word KTGS (không có thẻ, KT_KHUON chưa có)', r.co==='undefined' && !r.the, JSON.stringify(r));
 r = await ev(async()=>{ let thay = 'chưa gọi'; const g = window.ktDocxLam; window.ktDocxLam = function(){ thay = ktHaiMat(); return Promise.resolve(new Blob(['x'])); };
   KT_HAI_EP = true; let pr; try { pr = ktDocx('m04', {}); } finally { KT_HAI_EP = null; } await pr; window.ktDocxLam = g; return {thay:thay, sauCung:KT_HAI_EP}; });
 ok('ktDocx khi khuôn chưa có: tự tải rồi làm, vẫn giữ cờ in 2 mặt của lúc gọi', r.thay===true && r.sauCung===null, JSON.stringify(r));
 r = await ev(async()=>{ const a = ktKhuon(), c = ktKhuon(); await a; return {cung:a===c || !!window.KT_KHUON, so:document.querySelectorAll('script[src*="kt-khuon"]').length, mau:Object.keys(KT_KHUON).sort().join()}; });
 ok('ktKhuon: tải đúng 1 lần, đủ khuôn m01 · m01b · m04 · m06', r.so===1 && /m01,m01b,m04,m06/.test(r.mau), JSON.stringify(r));
 /* trang mới: Kế hoạch năm tự tải khuôn trước khi xem */
 const p2=await b.newPage({viewport:{width:1440,height:900}}); p2.on('pageerror',e=>loi.push(e.message)); await require('./tv.js')(p2);
 await p2.goto('file://'+path.resolve(__dirname,'..','index.html')); await p2.waitForTimeout(1500);
 r = await p2.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} let goi = 0; const g = window.ktInHop; window.ktInHop = function(){ goi++; };
   ktKHXem(); const truoc = goi; for(let i=0;i<40 && !window.KT_KHUON;i++) await new Promise(r=>setTimeout(r,100)); await new Promise(r=>setTimeout(r,100)); window.ktInHop = g; return {truoc:truoc, sau:goi, co:!!window.KT_KHUON}; });
 ok('📅 Kế hoạch năm › Xem khi khuôn chưa có: tải khuôn rồi mở hộp chọn in (không lỗi)', r.truoc===0 && r.sau===1 && r.co, JSON.stringify(r));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
