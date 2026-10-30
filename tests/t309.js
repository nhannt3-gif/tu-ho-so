// 3.368 (anh 25/10 "ds tổ có cột bị khuất") — Tra cứu › Tổ trưởng: danh sách tổ chia cột theo tỷ lệ khung → đủ 6 cột (3.416.1 bỏ cột Xã) không cuộn ngang
// ở 1280 / 1366 / 1920; mã tổ hiện đủ; Hội viết tắt (title tên đủ). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
   kyChungDoi('2026-08'); dhSL('tra'); const w=t=>new Promise(r=>setTimeout(r,t)); for(let i=0;i<60&&!TC_K;i++) await w(200);
   const c=[...document.querySelectorAll('.tc-theo [data-lenh], .tc-theo button, .tc-theo .chip')].find(x=>/Tổ trưởng/.test(x.textContent)&&x.offsetParent); c&&c.click(); await w(800); }, files);
 for(const W of [1280, 1366, 1920]){ await p.setViewportSize({width:W, height:800}); await p.waitForTimeout(400);
   const r = await p.evaluate(()=>{ const t=document.querySelector('table.tc-to-ds'); if(!t) return {}; const k=t.closest('.tc-kq-cuon'), td=t.querySelector('tbody tr td:nth-child(2)'), h=t.querySelector('tbody tr td:nth-child(6)'), th=t.querySelectorAll('thead tr:first-child th');   /* 3.396: thead có thêm hàng lọc (js/77) */
     return {cot:th.length, du:k.scrollWidth-k.clientWidth, ma:td.scrollWidth-td.clientWidth, hoi:h.textContent, hoiT:h.title}; });
   ok('3.368 khổ '+W+': danh sách tổ đủ 6 cột (3.416.1 bỏ cột Xã), không cuộn ngang, mã tổ đủ', r.cot===6 && r.du<=1 && r.ma<=1, JSON.stringify(r)); }
 const r = await p.evaluate(()=>{ const h=document.querySelector('table.tc-to-ds tbody tr td:nth-child(6)'); return {hoi:h.textContent, t:h.title}; });
 ok('3.368 cột Hội viết tắt (HND/HPN/CCB/ĐTN), rê chuột thấy tên đủ', /^(HND|HPN|CCB|ĐTN)$/.test(r.hoi) && /^(Hội|Đoàn)/.test(r.t), JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t309 đạt'); await b.close(); process.exit(sai?1:0);
})();
