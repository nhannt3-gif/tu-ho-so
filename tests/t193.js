// 3.231 (anh duyệt 17/10) — BẢN ĐIỆN THOẠI: gói số liệu xem (máy tính) · tự chuyển trên điện thoại · PIN + mã hóa · tra cứu khách · địa bàn theo cấp · khóa / mở lại. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 /* 1. máy tính: lập gói */
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push('máy tính: '+e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const M = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); const ky = gxKyMoi(), K = await KHO.nap(ky), g = gxLapTu(K);
   const bl = await gxNen(g), u = new Uint8Array(await new Response(bl.stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()), g2 = JSON.parse(new TextDecoder().decode(u));
   const tTo = Object.keys(g.to).reduce((a, m)=>a+g.to[m].dn, 0), tKH = g.kh.reduce((a, k)=>a+k[10].reduce((x, m)=>x+m[4], 0), 0);
   hsoKBHop('sl'); const kb = /📱 Bản điện thoại/.test(document.getElementById('hop-in').textContent); dongHop();
   return {g:g, ky:ky, nTo:Object.keys(g.to).length, nKH:g.kh.length, tTo:tTo, tKH:tKH, nen:bl.size, tron:JSON.stringify(g2)===JSON.stringify(g), kb:kb, ct:Object.keys(g.ct).length, tamTT:typeof TO_K!=='undefined' && TO_K && TO_K.ky}; }, files);
 ok('máy tính: gói số liệu xem theo Mẫu 31 mới nhất (tổ + khách + món), tổng dư nợ tổ = tổng món', M.nTo>10 && M.nKH>50 && M.tTo===M.tKH && M.ky==='2026-08', M.nTo+' tổ · '+M.nKH+' khách · '+M.tTo);
 ok('máy tính: nén gzip ↔ giải nén nguyên vẹn; có tên chương trình', M.tron && M.nen>0 && M.ct>0, M.nen+' byte');
 ok('máy tính: ⚙ Khai báo › 💾 Sao lưu có 📱 Bản điện thoại', M.kb);
 ok('tổ trưởng ghi bằng chữ (tên)', Object.keys(M.g.to).every(m=>typeof M.g.to[m].tt==='string') && Object.keys(M.g.to).some(m=>M.g.to[m].tt), JSON.stringify(Object.values(M.g.to)[0].tt));
 /* 2. điện thoại: index.html tự chuyển */
 const ctx = await b.newContext({viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2}); await ctx.addInitScript(()=>{ try{ localStorage.setItem('tuhoso_dt_pin','1'); }catch(e){} });   /* 3.342: PIN tạm tắt mặc định — phép thử này kiểm phần PIN nên bật cờ */
 const d = await ctx.newPage(); d.on('pageerror',e=>loi.push('điện thoại: '+e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 await d.goto('file://'+G+'/index.html'); await d.waitForTimeout(2500);
 ok('3.367: điện thoại mở index.html → ở lại bản chính, có nút 📱 sang bản gọn', /index\.html$/.test(d.url()) && !!(await d.$('#ve-dt')), d.url().split('/').pop());
 await d.click('#ve-dt'); await d.waitForTimeout(2500);
 const w = t=>d.waitForTimeout(t), phim = async s=>{ for(const k of s){ await d.click('#khoa [data-k="'+k+'"]'); } };
 ok('lần đầu: màn đặt PIN', /đặt mã PIN/i.test(await d.textContent('#khoa')));
 await phim('1357'); await d.click('#khoa [data-k="ok"]'); await phim('1357'); await d.click('#khoa [data-k="ok"]'); await w(1500);
 ok('đặt PIN 2 lần khớp → vào app (Framework7, kiểu iOS)', await d.evaluate(()=>getComputedStyle(document.getElementById('khoa')).display==='none' && !!DTG.app() && document.documentElement.classList.contains('ios')));
 ok('chưa có số liệu → trang đầu ghi "chưa có số liệu", không tự bật đăng nhập Google (3.354: iPhone chặn — dùng nút Tải)', /chưa có số liệu/.test(await d.textContent('.page-current')) && !(await d.$('.dialog.modal-in'))); await d.evaluate(g=>{ DTG.app().dialog.close(); return DT.napGoi(g); }, M.g); await w(500);
 const ma = await d.evaluate(async()=>{ const x = await new Promise(ok=>{ const r = indexedDB.open('tuhoso_dt'); r.onsuccess = e=>{ const q = e.target.result.transaction('k').objectStore('k').get('goi'); q.onsuccess = ()=>ok(q.result); }; }); return {co:!!x, chu:new TextDecoder().decode(x.c).indexOf(DT.goi().kh[0][1])>=0}; });
 ok('số liệu cất trong máy dạng mã hóa (không đọc được tên khách)', ma.co && !ma.chu);
 /* 3. tra cứu */
 const ten = M.g.kh.find(k=>k[10].some(m=>m[4]>0))[1];
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/tra/', {reloadAll:true})); await w(600);
 await d.fill('#dt-tim', ten.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()); await w(500);
 const kq = await d.$$eval('#dt-kq li', x=>x.map(e=>e.textContent));
 ok('🔎 tìm tên không dấu → danh sách khách (năm sinh · ấp · tổ · dư nợ)', kq.length>=1 && kq.some(t=>t.indexOf(ten)>=0), kq.length+' dòng');
 await d.click('#dt-kq li a'); await w(900);
 const kh = await d.textContent('.page-current');
 ok('👤 thẻ khách: nhân thân + tổ + món vay', /Nhân thân/.test(kh) && /CCCD/.test(kh) && /Tổ trưởng|Tổ/.test(kh) && /Món vay/.test(kh) && /Dư nợ/.test(kh));
 await d.click('.navbar-current .link.back'); await w(800);
 ok('⬅ Lùi về danh sách tìm', !!(await d.$('.page-current #dt-tim')));
 /* 4. địa bàn theo cấp */
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/db/-/-/-/-/', {reloadAll:true})); await w(700);
 const pgd = await d.evaluate(()=>{ const s = DT.tong(DT.dsTo({})); return {dn:s.dn, chu:document.querySelector('.page-current .dt-dn').textContent, dong:document.querySelectorAll('.page-current li').length}; });
 ok('🗺 Toàn PGD: tổng dư nợ = tổng gói, danh sách xã', pgd.dn===M.tTo && pgd.dong>=1, pgd.chu+' · '+pgd.dong+' xã');
 let cap = 0, tieu = [];
 for(let i=0;i<5;i++){ const a = await d.$('.page-current li a'); if(!a) break; await a.click(); await w(800); cap++; tieu.push(await d.textContent('.navbar-current .title')); if(await d.$('.page-current .dt-kv')) break; }
 ok('🗺 bấm xuống từng cấp Xã → Điểm GD → Hội → Tổ → Khách', cap>=5 && !!(await d.$('.page-current .dt-kv')), tieu.join(' › '));
 /* 5. khóa / mở lại */
 await d.evaluate(()=>DT.khoa()); await w(300);
 ok('🔒 khóa → màn PIN, số liệu đang mở xóa khỏi bộ nhớ', await d.evaluate(()=>getComputedStyle(document.getElementById('khoa')).display!=='none' && !DT.goi()));
 await d.reload(); await w(2500);
 await phim('2468'); await w(800);
 ok('PIN sai → báo sai, không mở', /chưa đúng/.test(await d.textContent('#khoa')) && await d.evaluate(()=>!DT.goi()));
 await phim('1357'); await w(1500);
 ok('mở lại bằng PIN đúng → số liệu giải mã từ máy (không cần Drive)', await d.evaluate(()=>!!DT.goi() && DT.goi().kh.length>50 && getComputedStyle(document.getElementById('khoa')).display==='none'));
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/cd/', {reloadAll:true})); await w(600);
 ok('⚙ Cài đặt: lấy số liệu mới · đổi PIN · khóa · bản máy tính · xóa dữ liệu', /Lấy số liệu mới/.test(await d.textContent('.page-current')) && /Mở bản web/.test(await d.textContent('.page-current')) && !!(await d.$('.navbar-current .dt-may')));   /* 3.342: nút 🖥 có ở mọi trang */
 await d.click('.navbar-current .dt-may'); await w(2500);
 ok('🖥 Mở bản máy tính → ở lại index.html (không tự chuyển nữa)', /index\.html$/.test(d.url()) && await d.evaluate(()=>typeof veSoLieu==='function'));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
