// 3.361 (KE_HOACH_DIEN_THOAI_MAY Đ1) — bản máy tính trên điện thoại: css/dt-may.css chỉ nạp ở màn ≤ 600 px (cắm rút), đầu trang gọn 2 hàng, không tràn ngang, khung Lọc địa bàn gọn, hàng chip vuốt ngang; máy tính 1440 không đổi. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'?may=1'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const bin=atob(f.b),u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } } kyChungDoi('2026-08'); dhSL('tra'); }, files);
   await p.waitForTimeout(2500); return p; };
 const p = await mo(390, 844, true);
 const r = await p.evaluate(()=>{ const d=document.querySelector('.dau').getBoundingClientRect(), cay=document.querySelector('#tc-cay .loc-khoi'), th=document.querySelector('.tc-theo');
   return {dt:[...document.styleSheets].some(s=>/dt-may\.css/.test(s.href||'') && s.media.mediaText.indexOf('600')>=0), cao:Math.round(d.height), tran:document.documentElement.scrollWidth-innerWidth,
     ten:getComputedStyle(document.querySelector('.ten-app')).display, tien:getComputedStyle(document.querySelector('[data-lenh="dh.tien"]')).display, lui:getComputedStyle(document.querySelector('[data-lenh="dh.lui"]')).display,
     ky:Math.round(document.querySelector('.ky-chung').getBoundingClientRect().width), cay:cay ? Math.round(cay.getBoundingClientRect().height) : -1, thCuon:th ? getComputedStyle(th).overflowX : '',
     veDt:(e=>e ? getComputedStyle(e).left : 'khong')(document.getElementById('ve-dt'))}; });
 ok('3.361 điện thoại: css/dt-may.css nạp, có media ≤ 600 px', r.dt);
 ok('3.361 đầu trang gọn ≤ 110 px (trước 137 px), không tràn ngang', r.cao<=110 && r.tran<=1, r.cao+' px · tràn '+r.tran);
 ok('3.361 bỏ tên app + nút ➡, giữ ⬅ lùi; ô kỳ đủ rộng (≥ 120 px)', r.ten==='none' && r.tien==='none' && r.lui!=='none' && r.ky>=120, r.ky+' px');
 ok('3.361 khung Lọc địa bàn gọn (≤ 110 px)', r.cay>0 && r.cay<=110, r.cay+' px');
 ok('3.361 hàng chip Tìm theo vuốt ngang (overflow-x auto)', r.thCuon==='auto');
 await p.close();
 const m = await mo(1440, 900, false);
 const q = await m.evaluate(()=>({dt:[...document.styleSheets].filter(s=>/dt-may\.css/.test(s.href||'')).map(s=>matchMedia(s.media.mediaText).matches), ten:getComputedStyle(document.querySelector('.ten-app')).display, tien:getComputedStyle(document.querySelector('[data-lenh="dh.tien"]')).display}));
 ok('3.361 máy tính 1440: dt-may.css không áp dụng, nút ➡ như cũ (tên app thay bằng đường dẫn tab từ 3.373 — t269)', q.dt.length===1 && q.dt[0]===false && q.tien!=='none', JSON.stringify(q));
 await m.close();
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t303 đạt'); await b.close(); process.exit(sai?1:0);
})();
