// 3.365 (KE_HOACH_DIEN_THOAI_MAY Đ4) — Số liệu › Tổ TK&VV: bảng vuốt ngang, ô tiêu đề góc (cột tên đứng yên) nằm trên các ô tiêu đề khác
// (trước cùng z-index → tiêu đề lệch cột khi vuốt, cả máy tính khung hẹp); điện thoại: cột tên ≤ 42% bề ngang, tên dài xuống dòng. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'?may=1'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const bin=atob(f.b),u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky){ try{await slGhi(kq);}catch(e){} } } kyChungDoi('2026-08'); slDoiTab('to'); doiNgan(7); }, files);
   await p.waitForTimeout(3000);
   const r = await p.evaluate(()=>{ const t=document.querySelector('#tr7 table.to-bang'), k=t && t.parentElement; if(!t) return {};
     t.scrollIntoView({block:'center'}); k.scrollLeft = 200; const th=t.querySelector('thead th'), rc=th.getBoundingClientRect(), e=document.elementFromPoint(rc.left+rc.width/2, rc.top+rc.height/2);
     return {cuon:k.scrollLeft, goc:!!e && (e===th || th.contains(e)), che:e ? e.textContent.trim().slice(0, 12) : '', rong:Math.round(rc.width), vw:innerWidth, tran:document.documentElement.scrollWidth-innerWidth}; });
   await p.close(); return r; };
 const d = await mo(390, 844, true);
 ok('3.365 điện thoại: vuốt ngang bảng tổ, ô góc "Xã / Điểm GD" không bị tiêu đề cột khác đè', d.cuon>0 && d.goc, JSON.stringify([d.cuon, d.che]));
 ok('3.365 điện thoại: cột tên ≤ 42% bề ngang (thấy thêm cột số), trang không tràn ngang', d.rong>0 && d.rong<=Math.ceil(d.vw*0.42)+16 && d.tran<=1, JSON.stringify([d.rong, d.vw, d.tran]));
 const m = await mo(700, 800, false);
 ok('3.365 máy tính khung hẹp 700: ô góc không bị đè khi cuộn ngang', m.cuon>0 ? m.goc : true, JSON.stringify([m.cuon, m.che]));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t307 đạt'); await b.close(); process.exit(sai?1:0);
})();
