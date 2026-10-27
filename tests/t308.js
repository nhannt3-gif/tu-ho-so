// 3.366 (KE_HOACH_DIEN_THOAI_MAY Đ5) — khung xem trước bản in: điện thoại — thanh 1 hàng vuốt ngang, nút ≥ 34 px, bỏ ⏮ ⏭;
// chụm 2 ngón trên trang → đổi mức phóng (không phóng cả màn hình); máy tính 1440 thanh như cũ. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'?may=1'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const bin=atob(f.b),u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } } kyChungDoi('2026-08'); slDoiTab('sk'); doiNgan(7); }, files);
   await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ skChonBC(skChon()); await new Promise(r=>setTimeout(r,800)); skPhongTo(); });   /* 3.386: Sao kê 2 màn — mở hộp xem lớn bằng ⤢ Phóng to */ await p.waitForTimeout(3000);
   const f = p.frames().find(f=>f!==p.mainFrame() && f.url().indexOf('google')<0);
   const r = f ? await f.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); for(let i=0;i<30&&!document.getElementById('tr-thanh');i++) await w(150);
     const t=document.getElementById('tr-thanh'); if(!t) return {};
     const nut=[...t.querySelectorAll('button')].filter(b=>b.offsetParent), dau=t.querySelector('[data-l=dau]'), pt=()=>document.getElementById('tr-pt').textContent;
     const r={cao:Math.round(t.getBoundingClientRect().height), nutMin:Math.min.apply(0, nut.map(b=>Math.round(b.getBoundingClientRect().height))), dau:dau?getComputedStyle(dau).display:'', pt0:pt()};
     const tr=document.getElementById('tr-ds') || document.body, mk=(id,x,y)=>new Touch({identifier:id, target:tr, clientX:x, clientY:y});
     const gui=(ten,ts)=>tr.dispatchEvent(new TouchEvent(ten, {touches:ts, targetTouches:ts, changedTouches:ts, bubbles:true, cancelable:true}));
     try { gui('touchstart', [mk(1,150,300), mk(2,200,300)]); const ev = new TouchEvent('touchmove', {touches:[mk(1,100,300), mk(2,250,300)], bubbles:true, cancelable:true}); tr.dispatchEvent(ev); r.chan = ev.defaultPrevented; gui('touchend', []); } catch(e){ r.loiCham = e.message; }
     r.pt1 = pt(); return r; }) : {};
   await p.close(); return r; };
 const d = await mo(390, 844, true);
 ok('3.366 điện thoại: thanh xem trước 1 hàng (≤ 48 px), nút ≥ 34 px, ẩn ⏮ ⏭', d.cao>0 && d.cao<=48 && d.nutMin>=34 && d.dau==='none', JSON.stringify([d.cao, d.nutMin, d.dau]));
 ok('3.366 điện thoại: chụm 2 ngón → mức phóng tăng ~3 lần, chặn phóng cả màn hình', parseInt(d.pt1)>=parseInt(d.pt0)*2.5 && d.chan===true, JSON.stringify([d.pt0, d.pt1, d.chan, d.loiCham]));
 const m = await mo(1440, 900, false);
 ok('3.366 máy tính 1440: thanh như cũ (có ⏮, nút 28 px)', m.dau && m.dau!=='none' && m.nutMin<34, JSON.stringify([m.cao, m.nutMin, m.dau]));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t308 đạt'); await b.close(); process.exit(sai?1:0);
})();
