// 3.417 D4 — chụp các màn chính (bộ GIẢ gianho31) để so giao diện trước / sau 1 bản: node tools/chup_man.js <thư mục app> <thư mục ảnh> [rộng=1366]
// So 2 lần chụp: node tools/chup_man.js --so <thư mục ảnh A> <thư mục ảnh B> → % điểm ảnh khác từng màn (> 0,5% thì mở ảnh xem). Không dữ liệu thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
const MAN = [['homnay', 'doiNgan(0)'], ['vanban', 'doiNgan(1)'], ['scan', 'doiNgan(4)'], ['tab3', 'doiNgan(3)'], ['tab5', 'doiNgan(5)'], ['tab6', 'doiNgan(6)'],
  ['sl-nap', "doiNgan(7);slDoiTab('nap')"], ['sl-tra', "doiNgan(7);slDoiTab('tra')"], ['sl-to', "doiNgan(7);slDoiTab('to')"], ['sl-sk', "doiNgan(7);slDoiTab('sk')"],
  ['sl-th', "doiNgan(7);slDoiTab('th')"], ['sl-kt', "doiNgan(7);slDoiTab('kt')"], ['sl-pb', "doiNgan(7);slDoiTab('pb')"], ['sl-gdx', "doiNgan(7);slDoiTab('gdx')"],
  ['sl-hst', "doiNgan(7);slDoiTab('hst')"], ['sl-hsv', "doiNgan(7);slDoiTab('hsv')"]];
(async()=>{ const b = await chromium.launch();
 if(process.argv[2]==='--so'){ const [A, B] = [process.argv[3], process.argv[4]], p = await b.newPage(); let kq = [];
   for(const [ten] of MAN){ const fa = path.join(A, ten+'.png'), fb = path.join(B, ten+'.png'); if(!fs.existsSync(fa) || !fs.existsSync(fb)){ kq.push(ten+': thiếu ảnh'); continue; }
     const pt = await p.evaluate(async([a, bb])=>{ const nap = s=>new Promise(r=>{ const i = new Image(); i.onload = ()=>r(i); i.src = 'data:image/png;base64,'+s; });
       const [x, y] = await Promise.all([nap(a), nap(bb)]); if(x.width!==y.width || x.height!==y.height) return 100;
       const c = document.createElement('canvas'); c.width = x.width; c.height = x.height; const g = c.getContext('2d'); g.drawImage(x, 0, 0); const d1 = g.getImageData(0, 0, c.width, c.height).data; g.drawImage(y, 0, 0); const d2 = g.getImageData(0, 0, c.width, c.height).data;
       let n = 0; for(let i = 0; i<d1.length; i += 4) if(Math.abs(d1[i]-d2[i])+Math.abs(d1[i+1]-d2[i+1])+Math.abs(d1[i+2]-d2[i+2])>30) n++; return n*100/(d1.length/4); }, [fs.readFileSync(fa).toString('base64'), fs.readFileSync(fb).toString('base64')]);
     kq.push((pt>0.5 ? '⚠ ' : '✓ ')+ten+': '+pt.toFixed(2)+'%'); }
   console.log(kq.join('\n')); await b.close(); return; }
 const goc = path.resolve(process.argv[2]), ra = path.resolve(process.argv[3]), W = +(process.argv[4]||1366); fs.mkdirSync(ra, {recursive:true});
 const p = await b.newPage({viewport:{width:W, height:820}}); const loi = []; p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require(path.join(goc, 'tests', 'tv.js'))(p);
 await p.goto('file://'+path.join(goc, 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(goc, 'tests', 'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 await p.evaluate(async(files)=>{ await xongTV; try{ dongHop(); }catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const s = atob(f.b), u = new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i] = s.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; if(typeof kyChungDoi==='function') kyChungDoi('2026-08');
   const st = document.createElement('style'); st.textContent = '*{animation:none!important;transition:none!important;caret-color:transparent!important}'; document.head.appendChild(st); }, files);
 for(const [ten, lenh] of MAN){ try{ await p.evaluate(l=>{ try{ dongHop(); }catch(e){} return eval(l); }, lenh); }catch(e){ loi.push(ten+': '+e.message); }
   await p.waitForTimeout(1500); await p.evaluate(()=>{ document.querySelectorAll('.dong-ho, #gio, .gio').forEach(x=>x.style.visibility = 'hidden'); });
   await p.screenshot({path:path.join(ra, ten+'.png')}); }
 console.log('đã chụp '+MAN.length+' màn → '+ra+(loi.length ? '\nLỖI: '+loi.slice(0, 5).join(' | ') : '')); await b.close();
})();
