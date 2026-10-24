// 3.364 (KE_HOACH_DIEN_THOAI_MAY Đ3) — bản máy tính trên điện thoại, tab Hôm nay gọn 1 cột: ô lịch thấp, sổ ngày lên trong màn hình đầu,
// không tràn ngang, đủ nút (Hôm nay / Danh sách / Tính ngày / công cụ); máy tính 1440 không đổi. Không cần dữ liệu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'?may=1'); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} doiNgan(0); }); await p.waitForTimeout(800);
   return p.evaluate(()=>{ const r=s=>{ const e=document.querySelector(s); return e ? e.getBoundingClientRect() : null; }, o=r('#lich .lc-o'), nk=r('.nk-trang');
     return {o:o?Math.round(o.height):0, nk:nk?Math.round(nk.top):0, tran:document.documentElement.scrollWidth-innerWidth,
       nut:document.querySelectorAll('#lich .lc-nut, #lich .lc-mui').length, cc:document.querySelectorAll('#lich .cc-nut').length, ngay:document.querySelectorAll('#lich .lc-o').length}; }).then(async x=>{ await p.close(); return x; }); };
 const d = await mo(390, 844, true);
 ok('3.364 điện thoại: ô lịch thấp (≤ 36 px)', d.o>0 && d.o<=36, d.o);
 ok('3.364 điện thoại: sổ ngày bắt đầu trong màn hình đầu (≤ 620 px, trước 692)', d.nk>0 && d.nk<=620, d.nk);
 ok('3.364 điện thoại: không tràn ngang', d.tran<=1, d.tran);
 ok('3.364 điện thoại: đủ nút lịch + công cụ + 42 ô ngày', d.nut>=5 && d.cc>=3 && d.ngay===42, JSON.stringify([d.nut, d.cc, d.ngay]));
 const m = await mo(1440, 900, false);
 ok('3.364 máy tính 1440: lịch như cũ (ô 34 px, đủ ô, không tràn)', m.o>=33 && m.o<=40 && m.ngay===42 && m.tran<=1, JSON.stringify([m.o, m.ngay, m.tran]));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t306 đạt'); await b.close(); process.exit(sai?1:0);
})();
