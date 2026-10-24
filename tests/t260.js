// t260 (TK 3, 24/10 — RA_SOAT_BO_CUC_2410 mục 8 việc 1): PHÉP THỬ ẢNH BỐ CỤC — mở từng tab ở 2 cỡ màn máy tính (1366, 1440) + bản điện thoại dt.html (iPhone 390),
//   tự báo: trang tràn ngang · nút / chip / ô chọn bị cắt chữ hoặc thò ra ngoài màn (không nằm trong khung cuộn) · ô chọn hẹp hơn 60 px. Bộ GIẢ tests/gianho31.
//   Chụp ảnh từng màn vào tests/anh260/ (đã .gitignore theo tests/*.png? — thư mục ảnh không commit). Chạy: node tests/t260.js [tab,tab…]
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..'), ANH=path.join(__dirname,'anh260');
const CHI = (process.argv[2]||'').split(',').filter(Boolean);
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 fs.mkdirSync(ANH, {recursive:true});
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const napGia = async p => p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); }, files);
 /* đo trong trang: trả danh sách lỗi bố cục của màn đang hiện */
 const DO = () => { const W = innerWidth, loi = [], ten = e => (e.getAttribute('aria-label') || e.title || e.textContent || e.value || e.tagName).replace(/\s+/g, ' ').trim().slice(0, 30);
   const hien = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none' && !e.closest('[hidden],#hop:not(.hien)'); };
   const trongCuon = e => { for(let x = e.parentElement; x && x!==document.body; x = x.parentElement){ const s = getComputedStyle(x); if(/(auto|scroll|hidden)/.test(s.overflowX) && x.scrollWidth > x.clientWidth+1) return true; } return false; };
   if(document.documentElement.scrollWidth > W+1) loi.push('trang tràn ngang '+document.documentElement.scrollWidth+'/'+W);
   document.querySelectorAll('button, select, .gd-chip, .to-loc, .sl-chip, a.nho').forEach(e => { if(!hien(e) || trongCuon(e)) return; const r = e.getBoundingClientRect();
     if(r.right > W+1 && r.left < W) loi.push('thò ra mép phải: '+ten(e));
     if(e.tagName==='SELECT' && r.width < 60) loi.push('ô chọn hẹp '+Math.round(r.width)+' px: '+ten(e));
     else if(e.tagName!=='SELECT' && getComputedStyle(e).overflow!=='visible' && e.scrollWidth > e.clientWidth+2) loi.push('cắt chữ: '+ten(e)); });
   return loi; };
 /* 1. máy tính */
 const TAB = ['0','gdx','nap','th','sk','to','tra','kt','pb','hsv','hst','1','5','4','3'].filter(k=>!CHI.length || CHI.indexOf(k)>=0);
 for(const W of [1366, 1440]){
   const p = await b.newPage({viewport:{width:W, height:900}}); p.on('pageerror', e=>loi.push(W+': '+e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500); await napGia(p);
   if(W===1366){ const L0 = await p.evaluate(DO), Lm = await p.evaluate(()=>{ const z = document.createElement('div'); z.id = 'thu260'; z.style.cssText = 'position:fixed;top:300px;left:400px;z-index:9';
       z.innerHTML = '<button style="width:40px;overflow:hidden;white-space:nowrap">Một nút có chữ rất dài bị cắt</button><select style="width:40px"><option>Phường Gia Lộc</option></select><button style="position:fixed;left:1340px;top:350px;white-space:nowrap">Nút thò ra ngoài mép phải</button>';
       document.body.appendChild(z); return null; }) || await p.evaluate(DO); await p.evaluate(()=>document.getElementById('thu260').remove());
     ok('bộ dò tự kiểm: chèn tạm 1 nút cắt chữ + 1 ô chọn 40 px + 1 nút thò mép → báo đủ 3', Lm.length-L0.length>=3 && Lm.some(x=>/cắt chữ/.test(x)) && Lm.some(x=>/ô chọn hẹp/.test(x)) && Lm.some(x=>/thò ra mép/.test(x)), Lm.join(' · ')); }
   for(const k of TAB){
     const ds = await p.evaluate(async(k)=>{ try{dongHop()}catch(e){} const m = dhMuc(k); if(!m) return ['không có mục '+k]; m.mo(); await new Promise(r=>setTimeout(r,2200)); window.scrollTo(0, 0); return null; }, k);
     const L = ds || await p.evaluate(DO); await p.screenshot({path:path.join(ANH, 'mt'+W+'_'+k+'.png')});
     ok('máy tính '+W+' · '+k+': không tràn, không cắt chữ, ô chọn đủ rộng', !L.length, L.slice(0, 4).join(' · ')+(L.length>4 ? ' … +'+(L.length-4) : '')); }
   await p.close(); }
 /* 2. điện thoại thật: dt.html (iPhone 390) — gói số liệu giả lập từ máy tính */
 if(!CHI.length || CHI.indexOf('dt')>=0){
   const pm = await b.newPage({viewport:{width:1440, height:900}}); await pm.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(pm);
   await pm.goto('file://'+G+'/index.html'); await pm.waitForTimeout(1500); await napGia(pm);
   const g = await pm.evaluate(async()=>gxLapTu(await KHO.nap(gxKyMoi()))); await pm.close();
   const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2,
     userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'});
   const d = await ctx.newPage(); d.on('pageerror', e=>loi.push('dt: '+e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
   await d.goto('file://'+G+'/dt.html'); await d.waitForTimeout(2500);
   const coPin = await d.$('#khoa [data-k="1"]');
   if(coPin){ const phim = async s=>{ for(const c of s) await d.click('#khoa [data-k="'+c+'"]'); }; await phim('1357'); await d.click('#khoa [data-k="ok"]'); await phim('1357'); await d.click('#khoa [data-k="ok"]'); await d.waitForTimeout(1500); }
   await d.evaluate(g=>{ try{ DTG.app().dialog.close(); }catch(e){} return DT.napGoi(g); }, g); await d.waitForTimeout(400);
   for(const [u, k] of [['/', 'hom'], ['/tra/', 'tra'], ['/db/-/-/-/-/', 'db'], ['/vb/', 'vb'], ['/sc/', 'sc'], ['/sc/moi/', 'scmoi'], ['/cd/', 'cd']]){
     await d.evaluate(u=>DTG.app().views.main.router.navigate(u, {reloadAll:true}), u); await d.waitForTimeout(900);
     if(k==='tra'){ await d.fill('#dt-tim', 'nguyen'); await d.waitForTimeout(500); }
     const L = await d.evaluate(DO); await d.screenshot({path:path.join(ANH, 'dt_'+k+'.png')});
     ok('điện thoại (iPhone 390) · '+k+': không tràn, không cắt chữ', !L.length, L.slice(0, 4).join(' · ')); }
   await ctx.close(); }
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log('ảnh: tests/anh260/'); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
