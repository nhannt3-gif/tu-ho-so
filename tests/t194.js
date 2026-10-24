// 3.232 — BẢN ĐIỆN THOẠI phần 2: 📄 Văn bản · 📷 Scan (danh sách theo khối Drive, lọc không dấu, mở file → bảng nút Xem / Lưu vào máy / Gửi / Lưu vào app; chụp ảnh → PDF). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const ctx = await b.newContext({viewport:{width:390,height:844}, isMobile:true, hasTouch:true}); await ctx.addInitScript(()=>{ try{ localStorage.setItem('tuhoso_dt_pin','1'); }catch(e){} });   /* 3.342: PIN tạm tắt mặc định — phép thử này kiểm phần PIN nên bật cờ */
 const d = await ctx.newPage(); d.on('pageerror',e=>loi.push(e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 await d.goto('file://'+G+'/dt.html'); await d.waitForTimeout(2500); const w = t=>d.waitForTimeout(t);
 const phim = async s=>{ for(const k of s) await d.click('#khoa [data-k="'+k+'"]'); };
 await phim('2580'); await d.click('#khoa [data-k="ok"]'); await phim('2580'); await d.click('#khoa [data-k="ok"]'); await w(1500); await d.evaluate(()=>DTG.app().dialog.close()); await w(300);
 ok('3.342: thanh tab dưới 4 mục: Khách · Văn bản · Scan · Cài đặt (Địa bàn = 📍 trong Khách, Giao dịch xã trong ⚙ › Công cụ)', (await d.$$eval('.dt-tab .tabbar-label', x=>x.map(e=>e.textContent))).join('|')==='Khách|Văn bản|Scan|Cài đặt');
 await d.evaluate(()=>{ DT.datDS('vanban', [{id:'v1', soHieu:'123/QĐ-NHCS', ngay:'2026-09-01', loai:'Quyết định', trichYeu:'Về việc điều chỉnh lãi suất cho vay', driveId:''},
   {id:'v2', soHieu:'45/CV-PGD', ngay:'2026-08-15', loai:'Công văn', trichYeu:'Hướng dẫn hồ sơ vay HSSV', driveId:'x'}]);
   DT.datDS('scan', [{id:'s1', ten:'Nguyễn Văn Giả', maKH:'4800000001', che:'cccd', ap:'Ấp 1', ngay:'2026-10-01', driveId:''}]);
   DTG.app().views.main.router.navigate('/vb/', {reloadAll:true}); }); await w(700);
 ok('📄 Văn bản: danh sách (số hiệu · ngày · loại · trích yếu), nút gửi file vào app', (await d.$$('.page-current #dt-ds li')).length===2 && /Gửi file vào app/.test(await d.textContent('.page-current')));
 await d.fill('#dt-loc', 'hssv'); await w(400);
 const loc = await d.$$eval('.page-current #dt-ds li', x=>x.map(e=>e.textContent));
 ok('lọc không dấu "hssv" → 1 văn bản', loc.length===1 && /45\/CV-PGD/.test(loc[0]), loc.length);
 await d.fill('#dt-loc', ''); await w(300); await d.click('.page-current #dt-ds li a[href*="/v1/"]'); await w(900);   /* 3.352: mở trang xem trong app */
 ok('mục chưa lên Drive → báo mở ở máy tính', /chưa lên Drive/.test(await d.textContent('.page-current #dt-xem')||''));
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/sc/', {reloadAll:true})); await w(700);
 ok('📷 Scan: danh sách + nút Chụp / chọn ảnh → PDF (3.342: Văn bản, Scan là 2 nút riêng ở thanh dưới)', /Nguyễn Văn Giả/.test(await d.textContent('.page-current')) && /Chụp \/ chọn ảnh/.test(await d.textContent('.page-current')));
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/sc/moi/')); await w(700);
 await d.evaluate(async()=>{ for(const mau of ['#c33', '#36c']){ const c = document.createElement('canvas'); c.width = 1200; c.height = 1600; const g = c.getContext('2d'); g.fillStyle = mau; g.fillRect(0, 0, 1200, 1600);
   const bl = await new Promise(r=>c.toBlob(r, 'image/jpeg', 0.8)); DTG.sc.anh.push({bl:bl, url:URL.createObjectURL(bl)}); } DTG.app().views.main.router.refreshPage(); }); await w(700);
 ok('chụp 2 ảnh → 2 ô xem trước, nút Tạo PDF (2 trang)', (await d.$$('.page-current .dt-anh-o')).length===2 && /Tạo PDF \(2 trang\)/.test(await d.textContent('.page-current #dt-taopdf')));
 const pdf = await d.evaluate(async()=>{ const bl = await DTG.taoPDF(), t = new TextDecoder().decode(new Uint8Array(await bl.arrayBuffer())); const doc = await PDFLib.PDFDocument.load(await bl.arrayBuffer()), p0 = doc.getPage(0).getSize(); return {dau:t.slice(0, 5), trang:doc.getPageCount(), a4:Math.round(p0.width)===595 && Math.round(p0.height)===842, kich:bl.size}; });
 ok('ghép PDF A4 từ ảnh (pdf-lib)', pdf.dau==='%PDF-' && pdf.trang===2 && pdf.a4, JSON.stringify(pdf));
 await d.click('.page-current #dt-taopdf'); await w(1500);
 const nut = await d.$$eval('.actions-modal.modal-in .actions-button', x=>x.map(e=>e.textContent.trim()));
 ok('bảng nút chuẩn: Xem · Lưu vào máy · (Gửi) · Lưu vào app · Đóng', nut.some(t=>/Xem/.test(t)) && nut.some(t=>/Lưu vào máy/.test(t)) && nut.some(t=>/Lưu vào app/.test(t)) && nut.some(t=>/Đóng/.test(t)), nut.join(' | '));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
