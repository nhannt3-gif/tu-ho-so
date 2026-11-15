// t406 (3.550 đợt 3, anh 15/11 "code tiếp" — docs/DANH_GIA_CHUYEN_GIA_1511.md mục 4d): E6 cài như phần mềm · F5 dvh · F2 trang mẫu giao diện.
//   E6: manifest hợp lệ (tên, start_url, standalone, biểu tượng 192 / 512 tồn tại đúng cỡ), index.html có <link rel="manifest">, icon, apple-touch-icon.
//   F5: không còn "100vh" trần trong css/app.css; --vh = 100dvh khi trình duyệt hỗ trợ; khung cao theo --vh.
//   F2: docs/mau-giao-dien.html mở được, mảnh GD.* trên trang KHỚP mảnh app sinh ra lúc này (đổi GD mà chưa sinh lại trang → trượt).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 /* E6 */
 const mf = JSON.parse(fs.readFileSync(path.join(G, 'manifest.webmanifest'), 'utf8')), idx = fs.readFileSync(path.join(G, 'index.html'), 'utf8');
 const coIcon = mf.icons.every(i=>fs.existsSync(path.join(G, i.src)));
 ok('E6 manifest: tên Tủ hồ sơ, start_url index.html, standalone, biểu tượng 192 + 512 có file', mf.name==='Tủ hồ sơ' && /index\.html$/.test(mf.start_url) && mf.display==='standalone' && coIcon && mf.icons.some(i=>i.sizes==='192x192') && mf.icons.some(i=>i.sizes==='512x512'), JSON.stringify(mf).slice(0, 200));
 ok('E6 index.html có <link rel="manifest">, icon, apple-touch-icon, theme-color', /<link rel="manifest" href="manifest\.webmanifest">/.test(idx) && /rel="icon"/.test(idx) && /rel="apple-touch-icon" href="img\/tuhoso-180\.png"/.test(idx) && /name="theme-color"/.test(idx) && fs.existsSync(path.join(G, 'img/tuhoso-180.png')));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const sz = await p.evaluate(async()=>{ const do_ = s=>new Promise(r=>{ const i = new Image(); i.onload = ()=>r(i.naturalWidth+'x'+i.naturalHeight); i.onerror = ()=>r('loi'); i.src = s; }); return [await do_('img/tuhoso-192.png'), await do_('img/tuhoso-512.png'), await do_('img/tuhoso-180.png')].join(','); });
 ok('E6 biểu tượng đúng cỡ 192 / 512 / 180', sz==='192x192,512x512,180x180', sz);
 /* F5 */
 const css = fs.readFileSync(path.join(G, 'css/app.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
 const tran = (css.match(/[^,(]100vh/g) || []).filter(x=>!/var\(--vh,$/.test(x)).length, conLai = css.split('100vh').length-1, quaBien = (css.match(/var\(--vh,100vh\)/g) || []).length;
 ok('F5 css/app.css: mọi 100vh đi qua --vh (dự phòng 100vh)', conLai===quaBien+1 && quaBien>=20, 'còn '+conLai+' · qua biến '+quaBien);
 const vh = await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--vh').trim());
 ok('F5 --vh = 100dvh trên trình duyệt có dvh', vh==='100dvh', vh);
 /* F2 */
 const ga = await p.evaluate(async()=>{ await xongTV; return [GD.nut({chu:'🔍 Kiểm lại', lenh:'khoi.lenh'}), GD.nut({chu:'📤 Xuất', lenh:'khoi.lenh', chinh:true}), GD.o({loai:'ngay', id:'mau-ngay'}), GD.kv('Dư nợ', '12,91 tỷ')]; });
 const mau = fs.readFileSync(path.join(G, 'docs/mau-giao-dien.html'), 'utf8');
 ok('F2 trang mẫu chứa đúng HTML mảnh GD.* app đang sinh (nút, nút chính, ô ngày, nhãn – giá trị)', ga.every(h=>mau.includes(h)), ga.filter(h=>!mau.includes(h)).join(' | ').slice(0, 200));
 const q = await b.newPage(); q.on('pageerror', e=>loi.push('mẫu: '+e.message));
 await q.goto('file://'+G+'/docs/mau-giao-dien.html'); await q.waitForTimeout(300);
 const r = await q.evaluate(()=>({dong:document.querySelectorAll('.mgd-dong').length, nut:getComputedStyle(document.querySelector('.gd-nut')).cursor, bang:document.querySelectorAll('table.tc-to-tvb').length, css:[...document.styleSheets].some(s=>/app\.css/.test(s.href||''))}));
 ok('F2 trang mẫu mở được, nạp css/app.css, ≥ 15 mảnh có bảng mẫu', r.dong>=15 && r.css && r.bang===1 && r.nut==='pointer', JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t406 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
