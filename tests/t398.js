// 3.524 (anh 14/11 "code hết 1 lần và gộp"): ① thanh Nạp & KT 1 hàng · ② chip Nguồn vốn Tổng hợp nhỏ (giữ vị trí anh chốt) · ③ chữ gợi ý Tra cứu ngắn
// · ④ khung LỌC ĐỊA BÀN 1 hàng (nhãn · số · 3 ô chọn · nút) trên màn ≥ 1100px; màn hẹp giữ như cũ. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const dir = path.join(__dirname,'gianho31'), files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w) => { const p = await b.newPage({viewport:{width:w, height:768}}); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
     kyChungDoi('2026-08'); doiNgan(7); }, files); return p; };
 const hang = (p) => p.evaluate(() => { const k = document.querySelector('#tr7 .loc-khoi'); if(!k) return null; const t = s => { const e = k.querySelector(s); return e && e.offsetParent ? Math.round(e.getBoundingClientRect().top+e.getBoundingClientRect().height/2) : null; };
   return {nhan:t('.pv-dau-nhan'), o:t('.pv-hang1 select.pv-xa'), nut:t('.pv-dau-nut'), cao:Math.round(k.getBoundingClientRect().height)}; });
 let p = await mo(1366);
 for(const t of ['to', 'tra', 'kt', 'th', 'sk']){ await p.evaluate(t => slDoiTab(t), t); await p.waitForTimeout(2500); const h = await hang(p);
   ok('④ '+t+': LỌC ĐỊA BÀN 1 hàng (nhãn · ô chọn · nút cùng hàng, khung ≤ 46px)', h && Math.abs(h.nhan-h.o)<=6 && Math.abs(h.nut-h.o)<=6 && h.cao<=46, JSON.stringify(h)); }
 await p.evaluate(() => { slDoiTab('tra'); }); await p.waitForTimeout(1500);
 const ph = await p.evaluate(() => { const i = document.getElementById('sl-tim'); return i ? {ph:i.placeholder, vua:i.scrollWidth<=i.clientWidth+2} : null; });
 ok('③ Tra cứu: chữ gợi ý ngắn (Tự nhận)', ph && ph.ph==='Tên, CCCD, mã KH, SĐT…', ph && ph.ph);
 const ttl = await p.evaluate(() => [...document.querySelectorAll('.tc-theo .gd-chip')].map(e => e.title)[0]);
 ok('③ chip Tìm theo vẫn giữ chú thích đầy đủ (title)', /vợ-chồng/.test(ttl||''), ttl);
 await p.evaluate(() => { slDoiTab('th'); }); await p.waitForTimeout(1500);
 const th = await p.evaluate(() => { const c = document.querySelector('.th-loc-hang .th-nguon .to-chip'), l = document.querySelector('#tr7 .loc-khoi'); return c && l ? {cao:Math.round(c.getBoundingClientRect().height), tren:c.getBoundingClientRect().top < l.getBoundingClientRect().top} : null; });
 ok('② Tổng hợp: chip Nguồn vốn nhỏ (≤ 24px), vẫn nằm trên khung lọc (anh chốt 3.157)', th && th.cao<=24 && th.tren, JSON.stringify(th));
 await p.evaluate(() => moNapSL()); await p.waitForTimeout(2000);
 const nap = await p.evaluate(() => { const n = [...document.querySelectorAll('.sl-thanh-nap > button, .sl-thanh-nap .sl-mt-k')].filter(e => e.offsetParent); const tops = new Set(n.map(e => Math.round(e.getBoundingClientRect().top/8))); return {n:n.length, hang:tops.size, cao:Math.max(...n.map(e => Math.round(e.getBoundingClientRect().height)))}; });
 ok('① Nạp & KT: thanh công cụ 1 hàng, nút 28px', nap.hang===1 && nap.cao<=28, JSON.stringify(nap));
 await p.close();
 p = await mo(600); await p.evaluate(t => slDoiTab(t), 'to'); await p.waitForTimeout(2500);
 const hep = await p.evaluate(() => { const d = document.querySelector('#tr7 .loc-khoi .pv-dau'); return d ? getComputedStyle(d).position : null; });
 ok('màn hẹp (600px): khung lọc giữ kiểu cũ (nhãn nổi trên viền)', hep==='absolute', hep);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t398 đạt'); await b.close(); process.exit(sai?1:0);
})();
