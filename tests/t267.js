// t267 (TK 3, 3.371 — PHOI_HOP mục 6 G3, anh 25/10 "làm tiếp văn bản và scan"): tab Văn bản + Scan của bản máy tính trên điện thoại (css/dt-may-vbsc.css, cắm rút):
//   Văn bản hàng nút 1 dòng không cắt chữ, thẻ trích yếu 2 dòng, bớt nút ít dùng; Scan phần đầu gọn, thẻ bỏ chữ lặp; MÁY TÍNH KHÔNG ĐỔI. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
const gia = ()=>{ try{ dongHop(); }catch(e){} const L=['Quyết định','Công văn','Hướng dẫn','Thông báo']; D.vanBan = [];
  for(let i=0;i<14;i++) D.vanBan.push({id:'vbgia'+i, ten:'VB giả '+i, soHieu:(100+i)+'/QĐ-GIA', trichYeu:'Về việc hướng dẫn nghiệp vụ cho vay hộ nghèo và các đối tượng chính sách khác số '+i, loai:L[i%4], ngay:'2026-0'+(1+i%9)+'-1'+(i%9), nhom:'vanBan'});
  D.scan = []; for(let i=0;i<8;i++) D.scan.push({id:'s'+i, ten:'Nguyễn Văn Giả '+i, maKH:'48000000'+i, che:i%2?'the':'tailieu', xa:'Xã Giả', diem:'Điểm A', ap:'Ấp '+(i%3+1), to:String(i%5+1), matTruoc:'a', matSau:'b', gioQuet:'2026-10-0'+(i+1)+'T08:00', driveId:'q'+i}); HS.ds = D.scan; };
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const mo = async(vp, dt)=>{ const ctx = await b.newContext(dt ? {viewport:vp, isMobile:true, hasTouch:true, deviceScaleFactor:2} : {viewport:vp}); const p = await ctx.newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(2500); await p.evaluate(gia); return p; };
 const VB = p=>p.evaluate(()=>{ doiNgan(1); const vw = innerWidth, an = e=>!e || getComputedStyle(e).display==='none';
   const nut = [...document.querySelectorAll('#nam-vb .dau-tab button')].filter(e=>getComputedStyle(e).display!=='none' && e.offsetParent);
   const cat = nut.filter(e=>{ const r = e.getBoundingClientRect(); return r.right>vw+1 || r.left<-1 || e.scrollWidth>e.clientWidth+2; }).map(e=>e.textContent.trim());
   const t = document.querySelector('#ds-vb .d2'), ty = t.querySelector('.ty'), lh = parseFloat(getComputedStyle(ty).lineHeight) || 17;
   const day = [...document.querySelectorAll('#ds-vb .d2')].filter(e=>e.getBoundingClientRect().bottom<=innerHeight).length;
   return {cat:cat, sap:an(document.querySelector('#nam-vb .tl-sap')), bot:an(document.querySelector('#nam-vb .nut-bot')), xem:an(document.querySelector('#nam-vb .tl-xem')), sua:an(t.querySelector('button[title="Sửa"]')),
     tyDong:Math.round(ty.getBoundingClientRect().height/lh), canh:an(t.querySelector('.tg.canh')), day:day, tran:document.documentElement.scrollWidth>vw+1}; });
 const SC = p=>p.evaluate(async()=>{ doiNgan(4); await new Promise(r=>setTimeout(r, 1200)); const an = e=>!e || getComputedStyle(e).display==='none', t = document.querySelector('#tr4 .sc-d');
   return {ty:an(t.querySelector('.ty')), ngay:an(t.querySelector('.sc-ngay')), dau:Math.round(t.getBoundingClientRect().top), tran:document.documentElement.scrollWidth>innerWidth+1}; });
 /* điện thoại */
 const d = await mo({width:390, height:844}, 1), v = await VB(d), s = await SC(d);
 ok('ĐT · Văn bản: hàng nút 1 dòng, không nút nào cắt chữ / thò mép; không tràn ngang', !v.cat.length && !v.tran, JSON.stringify(v.cat));
 ok('ĐT · Văn bản: bớt nút ít dùng (Xóa nhiều · Sắp xếp · Kiểu xem) + ✎ Sửa (còn trong menu ⋯)', v.sap && v.bot && v.xem && v.sua);
 ok('ĐT · Văn bản: trích yếu đọc được 2 dòng, bỏ chip "Thiếu mảng…"; ≥ 5 văn bản / màn hình', v.tyDong===2 && v.canh && v.day>=5, JSON.stringify({dong:v.tyDong, day:v.day}));
 ok('ĐT · Scan: thẻ bỏ "Ấp · Tổ" + ngày lặp lại; thẻ đầu lên trong nửa màn hình đầu; không tràn ngang', s.ty && s.ngay && s.dau<450 && !s.tran, JSON.stringify(s));
 /* máy tính không đổi */
 const m = await mo({width:1440, height:900}), vm = await VB(m), sm = await SC(m);
 ok('MÁY TÍNH không đổi: nút Sắp xếp / Xóa / ✎ vẫn hiện; trích yếu 1 dòng; Scan còn "Ấp · Tổ" + ngày (chip "Thiếu…" từng thẻ gom thành 1 chip lọc từ 3.373 — t269)', !vm.sap && !vm.bot && !vm.sua && vm.tyDong===1 && !sm.ty && !sm.ngay, JSON.stringify({vm, sm}));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
