// t412 (3.560 chuẩn hóa — anh 22/11 "code và gộp"): danh sách văn bản js/10 + 11 bỏ onclick viết thẳng → data-lenh (f10.* / f11.*), hành vi như cũ:
//   bấm dòng → chọn dòng (tô sáng) · bấm ⋯ / ⭐ / ✎ / ⚠ trùng / 🔗 trên dòng → KHÔNG chọn dòng (như event.stopPropagation cũ) · dạng bảng: bấm dòng mở, ⋯ không mở ·
//   tô sáng dòng đang chọn (dongVBChon) · không còn onclick ở dòng / nút dòng · thùng rác khôi phục 1 mục. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){}
   for(let i=1;i<=3;i++) D.vanBan.push({id:'vb'+i, nhom:'vanBan', tenMoi:'2026-10-0'+i+' '+i+'/NHCS-TD Van ban gia '+i+'.pdf', tenCu:'a'+i+'.pdf', duoi:'pdf', soHieu:i+'/NHCS-TD', ngay:'2026-10-0'+i, trichYeu:'Văn bản giả '+i, mang:'Tín dụng', lienQuan:i===1 ? ['vb2'] : []});
   D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} D.cauHinh.bangTab = {vanBan:false}; luu(); doiNgan(1); window.GOI = []; const c = chonDong; chonDong = function(id){ GOI.push(id); return c.apply(this, arguments); }; });
 await p.waitForTimeout(600);
 let r = await p.evaluate(()=>{ const d = document.querySelector('.d2[data-lenh="f10.chon"][data-a1="vb2"]'); return {co:!!d, oc:document.querySelectorAll('#tr1 .d2[onclick], #tr1 .d2 [onclick]').length}; });
 ok('dòng văn bản dùng data-lenh f10.chon; dòng + nút trên dòng không còn onclick', r.co && r.oc===0, JSON.stringify(r));
 await p.click('.d2[data-a1="vb2"] .ten'); await p.waitForTimeout(400);
 r = await p.evaluate(()=>({goi:GOI.slice(), chon:!!document.querySelector('.d2.chon[data-a1="vb2"]')}));
 ok('bấm dòng → chọn dòng + tô sáng', r.goi.join()==='vb2' && r.chon, JSON.stringify(r));
 await p.evaluate(()=>{ GOI.length = 0; });
 await p.click('.d2[data-a1="vb3"] [data-lenh="f10.menu"]'); await p.waitForTimeout(300);
 r = await p.evaluate(()=>({goi:GOI.length, menu:getComputedStyle(document.getElementById('menu')).display!=='none' && !!document.getElementById('menu').innerHTML}));
 ok('bấm ⋯ → mở menu, KHÔNG chọn dòng', r.goi===0 && r.menu, JSON.stringify(r));
 const don = ()=>p.evaluate(()=>{ try{dongHop()}catch(e){} const m = document.getElementById('menu'); if(m) m.style.display = 'none'; });
 await don();
 await p.evaluate(()=>{ GOI.length = 0; });
 await don(); const sao = await p.$('.d2[data-a1="vb3"] [data-lenh="f11.sao"]');
 if(sao){ await sao.click(); await p.waitForTimeout(300); }
 r = await p.evaluate(()=>({goi:GOI.length, sao:typeof laSao==='function' ? laSao(D.vanBan.find(x=>x.id==='vb3')) : null}));
 ok('bấm ⭐ → đổi sao, KHÔNG chọn dòng', !!sao && r.goi===0 && r.sao===true, JSON.stringify(r));
 await don(); const lq = await p.$('.d2[data-a1="vb1"] [data-lenh="f10.diToi"]');
 await p.evaluate(()=>{ GOI.length = 0; }); if(lq){ await lq.click(); await p.waitForTimeout(400); }
 r = await p.evaluate(()=>GOI.slice());
 ok('bấm 🔗 văn bản liên quan → đi tới vb2 (chọn vb2, không chọn vb1)', !!lq && r.indexOf('vb1')<0 && r.indexOf('vb2')>=0, JSON.stringify(r));
 /* dạng bảng */
 await p.evaluate(()=>{ D.cauHinh.bangTab = {vanBan:true}; luu(); ve(); GOI.length = 0; }); await p.waitForTimeout(500);
 await don(); const tr = await p.$('tr.bt-d[data-id="vb3"]');
 if(tr){ await p.click('tr.bt-d[data-id="vb3"] td.bt-ten'); await p.waitForTimeout(300); }
 const g1 = await p.evaluate(()=>GOI.slice()); await p.evaluate(()=>{ GOI.length = 0; });
 await don(); if(tr){ await p.click('tr.bt-d[data-id="vb3"] [data-lenh="f10.menu"]'); await p.waitForTimeout(300); }
 const g2 = await p.evaluate(()=>({goi:GOI.length, oc:document.querySelectorAll('tr.bt-d[onclick], tr.bt-d [onclick]').length}));
 ok('dạng bảng: bấm dòng mở (chonDong), bấm ⋯ không mở; không còn onclick', !!tr && g1.join()==='vb3' && g2.goi===0 && g2.oc===0, JSON.stringify({g1, g2}));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t412 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
