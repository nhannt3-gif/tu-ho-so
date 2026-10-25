// t262 (TK 3, 3.342 — KE_HOACH_DIEN_THOAI_2 bước Đ0, anh chốt 24/10): bản điện thoại tạm bỏ PIN (mở thẳng, không tự khóa, số liệu vẫn mã hóa trong máy),
//   thanh dưới 4 nút Khách · Văn bản · Scan · Cài đặt, nút 🖥 sang bản web ở mọi trang, 📍 Địa bàn trong Khách, Giao dịch xã trong ⚙ › Công cụ,
//   dòng kỳ cập nhật ngay khi có số liệu; bản web trên điện thoại có nút 📱 về lại. Dữ liệu GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const g = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); return gxLapTu(await KHO.nap(gxKyMoi())); }, files);
 ok('máy tính: không hiện nút 📱 (chỉ điện thoại)', !(await p.$('#ve-dt'))); await p.close();
 const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2});
 const d = await ctx.newPage(); d.on('pageerror', e=>loi.push(e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 const w = t=>d.waitForTimeout(t);
 await d.goto('file://'+G+'/index.html'); await w(2500);
 ok('3.367: điện thoại mở index.html → ở lại bản chính (anh 25/10), có nút 📱', /index\.html$/.test(d.url()) && !!(await d.$('#ve-dt')));
 await d.goto('file://'+G+'/index.html?dt=1'); await w(2500);
 ok('?dt=1 → bản gọn dt.html', /dt\.html$/.test(d.url()));
 ok('mở thẳng, không màn PIN (tạm tắt)', await d.evaluate(()=>getComputedStyle(document.getElementById('khoa')).display==='none' && !!DTG.app() && !DT.pinBat()));
 await d.evaluate(()=>{ try{ DTG.app().dialog.close(); }catch(e){} }); await w(300);
 ok('chưa có số liệu: dòng kỳ ghi "chưa có số liệu"', /chưa có số liệu/.test(await d.textContent('.page-current')));
 await d.evaluate(g=>DT.napGoi(g), g); await w(800);
 ok('có số liệu → trang Khách tự cập nhật dòng kỳ (Mẫu 31 …, số khách)', /Mẫu 31 \d\d\/\d\d\/\d{4}/.test(await d.textContent('.page-current')) && !/chưa có số liệu/.test(await d.textContent('.page-current')), (await d.textContent('.page-current .dt-homsl')||'').trim());
 const ma = await d.evaluate(async()=>{ const x = await new Promise(ok=>{ const r = indexedDB.open('tuhoso_dt'); r.onsuccess = e=>{ const q = e.target.result.transaction('k').objectStore('k').get('goi'); q.onsuccess = ()=>ok(q.result); }; });
   return {co:!!x, chu:x ? /Nguy/.test(new TextDecoder().decode(x.c || new Uint8Array())) : false}; });
 ok('số liệu cất trong máy vẫn mã hóa (không đọc được tên khách)', ma.co && !ma.chu);
 ok('thanh dưới 5 nút: Hôm nay · Khách · Văn bản · Scan · Cài đặt (3.354)', (await d.$$eval('.dt-tab .tabbar-label', x=>x.map(e=>e.textContent))).join('|')==='Hôm nay|Khách|Văn bản|Scan|Cài đặt');
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/tra/', {reloadAll:true})); await w(700);
 ok('Khách: có nút 📍 Địa bàn + 🖥 bản web ở thanh tiêu đề', !!(await d.$('.navbar-current a[href="/db/-/-/-/-/"]')) && !!(await d.$('.navbar-current .dt-may')));
 await d.click('.navbar-current a[href="/db/-/-/-/-/"]'); await w(900);
 ok('📍 → Địa bàn theo cấp (Toàn PGD › Xã), có nút Lùi + 🖥', /Toàn PGD/.test(await d.textContent('.navbar-current')) && /Xã \(/.test(await d.textContent('.page-current')) && !!(await d.$('.navbar-current .dt-may')));
 for(const [u, ten] of [['/vb/', 'Văn bản'], ['/sc/', 'Scan']]){ await d.evaluate(u=>DTG.app().views.main.router.navigate(u, {reloadAll:true}), u); await w(700);
   ok(ten+': tiêu đề riêng + 🖥', (await d.textContent('.navbar-current .title')).trim()===ten && !!(await d.$('.navbar-current .dt-may'))); }
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/cd/', {reloadAll:true})); await w(700);
 const cd = await d.textContent('.page-current');
 ok('⚙ Cài đặt: không còn Đổi PIN / Khóa ngay; có ⚙ Công cụ › 🏢 Giao dịch xã; ghi rõ đang tắt PIN', !/Đổi mã PIN/.test(cd) && !/Khóa ngay/.test(cd) && /Giao dịch xã \(04\/TD/.test(cd) && /tạm tắt PIN/.test(cd));
 await d.click('.page-current a[href="/gdx/"]'); await w(900);
 ok('Giao dịch xã mở từ ⚙, có nút Lùi', /Giao dịch xã/.test(await d.textContent('.navbar-current')) && !!(await d.$('.navbar-current .back')));
 await d.evaluate(()=>{ DTG.app().views.main.router.navigate('/', {reloadAll:true}); }); await w(700);
 await d.click('.navbar-current .dt-may'); await w(2500);
 ok('🖥 → bản web index.html (không tự chuyển lại)', /index\.html$/.test(d.url()) && await d.evaluate(()=>typeof doiNgan==='function'));
 ok('bản web trên điện thoại có nút 📱 về bản điện thoại', !!(await d.$('#ve-dt')));
 await d.click('#ve-dt'); await w(2500);
 ok('bấm 📱 → bản gọn dt.html', /dt\.html$/.test(d.url()));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
