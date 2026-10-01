// 3.75 — AP: hộp sửa bản quét gọn + phím chung + tốc độ tự chụp (dữ liệu giả)
const { chromium, devices } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const loi=[];
 for(const may of [['pc',{viewport:{width:1366,height:768}}],['ip',devices['iPhone 13']]]){
 const ctx=await b.newContext(may[1]); const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(may[0]+': '+e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(1300);
 const r=await p.evaluate(async(may)=>{ await xongTV; try{dongHop()}catch(e){} document.getElementById('bao').style.opacity='0'; const w=t=>new Promise(r=>setTimeout(r,t)); const o={};
   const anh=async(c,t,W,H)=>{ const cv=document.createElement('canvas'); cv.width=W||860; cv.height=H||540; const g=cv.getContext('2d'); g.fillStyle=c; g.fillRect(0,0,cv.width,cv.height); g.fillStyle='#fff'; g.font='60px sans-serif'; g.fillText(t,60,280); return await new Promise(r=>cv.toBlob(r,'image/jpeg',0.8)); };
   await luuFile('hs_s1_matTruoc', await anh('#2a6','TRUOC')); await luuFile('hs_s1_matSau', await anh('#a52','SAU'));
   for(let i=1;i<=3;i++) await luuFile('hs_t'+i, await anh('#eee','TRANG '+i,600,850));
   D.scan=[{id:'s1', che:'the', ten:'Khach Gia Thu', xa:'', ap:'', to:'', ngay:'2026-09-29', matTruoc:true, matSau:true, tag:['CCCD'], ctrinh:[]},
           {id:'s2', che:'tailieu', ten:'Tai lieu gia', xa:'', ngay:'2026-09-29', trang:['t1','t2','t3'], tag:[], ctrinh:[]}]; HS.ds=D.scan; doiNgan(4); await w(200);
   themKhach('s1'); await w(600);
   const h=document.getElementById('hop-in'), r0=h.getBoundingClientRect();
   o.lop=h.className; o.cao=Math.round(r0.height)+'/'+innerHeight; o.cuon=h.querySelector('.sua-trai').scrollHeight+'/'+h.querySelector('.sua-trai').clientHeight;
   o.anh=document.querySelectorAll('#k-xem img').length; o.focus=document.activeElement.id;
   o.oNhap=sgO().map(x=>x.id).join(',');
   const key=(el,k,sh)=>el.dispatchEvent(new KeyboardEvent('keydown',{key:k,shiftKey:!!sh,bubbles:true,cancelable:true}));
   const ten=document.getElementById('k-ten'); ten.focus(); ten.setSelectionRange(ten.value.length,ten.value.length);
   key(ten,'ArrowRight'); o.phai=document.activeElement.id+' (ô chữ: → không nhảy)'; key(ten,'Enter');
   key(document.activeElement,'Enter'); o.xaTrong=document.activeElement.id+' (vẫn ở xa vì trống)';
   key(document.activeElement,'ArrowDown'); await w(50); o.chonXa=document.getElementById('k-xa').value+' · focus '+document.activeElement.id;
   key(document.activeElement,'Tab'); o.tab=document.activeElement.id;
   key(document.activeElement,'ArrowLeft'); o.trai=document.activeElement.id;
   const g=document.getElementById('k-ghi'); g.focus(); key(g,'ArrowLeft'); o.ghiTrai=document.activeElement.id+' (ô chữ trống: ← không nhảy)';
   if(may==='pc') document.body.dataset.chup='the';
   await w(200); window.__sh1=1;
   return o; }, may[0]);
 for(const k in r) console.log(may[0], k.padEnd(8), r[k]);
 await p.screenshot({path:__dirname+'/t87_the_'+may[0]+'.png'});
 const r2=await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); dongHop(); await w(100); scanTaiLieu('s2'); await w(800); const h=document.getElementById('hop-in'); const o={};
   o.lop=h.className; o.cao=Math.round(h.getBoundingClientRect().height)+'/'+innerHeight; o.cuon=h.querySelector('.sua-trai').scrollHeight+'/'+h.querySelector('.sua-trai').clientHeight;
   o.trang=document.querySelectorAll('#k-xem img').length+' · '+document.getElementById('nn-trang').textContent;
   o.camGiu=[camGiu(), (doiGiuCam(), camGiu()), (doiGiuCam(), camGiu()), (doiGiuCam(), camGiu())].join('→');
   return o; });
 for(const k in r2) console.log(may[0], 'TL '+k.padEnd(5), r2[k]);
 await p.screenshot({path:__dirname+'/t87_tl_'+may[0]+'.png'});
 await ctx.close(); }
 console.log('lỗi', loi); await b.close(); })();
