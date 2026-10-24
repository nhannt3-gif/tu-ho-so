// t265 (TK 3, 3.354 — anh 24/10: "tối ưu tab hôm nay bao gồm lịch và ghi chú trước"; "giao diện tương tự máy tính nhưng lược bỏ các chức năng phức tạp"):
//   bản điện thoại — tab 📅 Hôm nay (trang đầu): lịch tháng âm lịch như máy tính, việc của ngày (thêm / tick / lặp / lưu ý / xóa), ghi chú dòng (thêm / tick / xóa), sắp tới 7 ngày,
//   cất máy mã hóa, gộp 2 chiều với Lịch máy tính (cùng dạng lich.json — thử chéo bằng gopLich của máy tính); trang Khách chưa có số liệu có nút Tải (không tự bật đăng nhập Google).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2});
 const d = await ctx.newPage(); d.on('pageerror', e=>loi.push(e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 const w = t=>d.waitForTimeout(t);
 await d.goto('file://'+G+'/dt.html'); await w(2500);
 const nay = await d.evaluate(()=>DTL.iso(new Date()));
 ok('trang đầu = Hôm nay, không tự bật hộp đăng nhập / lỗi', (await d.textContent('.navbar-current .title')).trim()==='Hôm nay' && !(await d.$('.dialog.modal-in')));
 ok('thanh dưới 5 nút, Hôm nay đang chọn', (await d.$$eval('.dt-tab .tabbar-label', x=>x.map(e=>e.textContent))).join('|')==='Hôm nay|Khách|Văn bản|Scan|Cài đặt' && /Hôm nay/.test(await d.textContent('.dt-tab .tab-link-active')));
 ok('âm lịch đúng thuật toán máy tính (24/10/2026 = 15/9; 17/10/2026 = 8/9; Tết 17/02/2026 = 1/1)', await d.evaluate(()=>{ const f = s=>{ const a = DTL.am(s); return a.ngay+'/'+a.thang; }; return f('2026-10-24')==='15/9' && f('2026-10-17')==='8/9' && f('2026-02-17')==='1/1'; }));
 const o1 = await d.evaluate(nay=>{ const c = document.querySelector('.page-current .dt-ng.nay'), a = DTL.am(nay); return {iso:c && c.getAttribute('data-iso'), am:c && c.querySelector('i').textContent, mong:a.ngay===1 ? '1/'+a.thang : String(a.ngay),
   o:document.querySelectorAll('.page-current .dt-ng').length, do:[...document.querySelectorAll('.page-current .dt-ng.cn b')].every(b=>getComputedStyle(b).color!==getComputedStyle(document.querySelector('.page-current .dt-ng:not(.cn):not(.t7):not(.nay) b')).color)}; }, nay);
 ok('lịch tháng: ô hôm nay tô xanh + ghi ngày âm; đủ tuần (35 / 42 ô); CN tô đỏ', o1.iso===nay && o1.am===o1.mong && (o1.o===35 || o1.o===42 || o1.o===28) && o1.do, JSON.stringify(o1));
 await d.click('.page-current .dt-thang[data-d="1"]'); await w(300); const t2 = await d.textContent('.page-current .dt-lich-dau b');
 await d.click('.page-current .dt-vehomnay'); await w(300);
 ok('‹ › đổi tháng, "Hôm nay" quay về', t2!==(await d.textContent('.page-current .dt-lich-dau b')) && !!(await d.$('.page-current .dt-ng.nay.chon')));
 /* thêm việc lặp tuần + lưu ý */
 await d.click('.page-current a[href="/viec/moi/"]'); await w(800);
 await d.fill('#dt-vten', 'Giao ban tổ GIẢ 042'); await d.selectOption('#dt-vlap', 'tuan'); await d.evaluate(()=>{ document.getElementById('dt-vluuy').checked = true; });
 await d.click('.page-current .dt-vluu'); await w(1000);
 let v = await d.$$eval('.page-current .dt-viec li', x=>x.map(e=>e.textContent.replace(/\s+/g, ' ').trim()));
 ok('＋ Thêm việc (lặp hằng tuần, lưu ý) → về Hôm nay, hiện ★ + "Hằng tuần", ô lịch chấm đỏ', v.some(x=>/★ Giao ban tổ GIẢ 042/.test(x) && /Hằng tuần/.test(x)) && !!(await d.$('.page-current .dt-ng.nay s.luuy')), v.join(' ; '));
 const t7 = await d.evaluate(nay=>DTL.cong(nay, 7), nay);
 ok('việc lặp tuần hiện ở "Sắp tới 7 ngày"', /Giao ban tổ GIẢ 042/.test(await d.textContent('.page-current #dt-hom')) && (await d.$$('.page-current .dt-sangngay')).length>=1);
 await d.click('.page-current .dt-tick'); await w(400);
 ok('tick ✓ → gạch ngang, chỉ ngày hôm nay (việc lặp lưu xongNgay)', !!(await d.$('.page-current .dt-viec li.xong')) && await d.evaluate(([nay, t7])=>{ const v = DT.lich().viec[0]; return v.xongNgay[nay]===true && !DTL.xong(v, t7); }, [nay, t7]));
 /* ghi chú dòng */
 await d.fill('#dt-dongmoi', 'Gọi chị GIẢ nhắc nộp lãi'); await d.keyboard.press('Enter'); await w(400);
 await d.fill('#dt-dongmoi', 'Mang hồ sơ 01/TD'); await d.click('.page-current .dt-themdong'); await w(400);
 let gc = await d.$$eval('.page-current .dt-dong .dt-nd', x=>x.map(e=>e.textContent));
 ok('ghi chú: Enter / nút Thêm → 2 dòng theo thứ tự, ô nhập vẫn sẵn để gõ tiếp', gc.join('|')==='Gọi chị GIẢ nhắc nộp lãi|Mang hồ sơ 01/TD' && await d.evaluate(()=>document.activeElement && document.activeElement.id==='dt-dongmoi'), gc.join('|'));
 await d.click('.page-current .dt-tickd'); await w(300); await d.click('.page-current .dt-dong li:nth-child(2) .dt-xoad'); await w(400);
 gc = await d.$$eval('.page-current .dt-dong li.xong .dt-nd', x=>x.map(e=>e.textContent));
 ok('tick dòng → xong; ✕ xóa dòng (ghi sổ xóa để máy tính cũng xóa)', gc.join('|')==='Gọi chị GIẢ nhắc nộp lãi' && (await d.$$('.page-current .dt-dong .dt-nd')).length===1 && await d.evaluate(()=>DT.lich().noteXoa.length===1));
 ok('dạng dòng giống sổ gạch dòng máy tính (kieu dong, ngay, thuTu, suaLuc)', await d.evaluate(nay=>{ const m = DT.lich().note[0]; return m.kieu==='dong' && m.ngay===nay && m.thuTu===0 && !!m.suaLuc && !!m.xong; }, nay));
 /* cất máy mã hóa, mở lại còn nguyên */
 await w(500); const ma = await d.evaluate(async()=>{ const x = await new Promise(ok=>{ const r = indexedDB.open('tuhoso_dt'); r.onsuccess = e=>{ const q = e.target.result.transaction('k').objectStore('k').get('lich'); q.onsuccess = ()=>ok(q.result); }; });
   return {co:!!x, chu:x ? /GIẢ|Giao ban/.test(new TextDecoder().decode(x.c || new Uint8Array())) : true}; });
 ok('lịch cất trong máy dạng mã hóa', ma.co && !ma.chu);
 await d.reload(); await w(2500);
 ok('mở lại app: việc + ghi chú còn nguyên, báo "có thay đổi chưa đẩy lên Drive"', /Giao ban tổ GIẢ 042/.test(await d.textContent('.page-current')) && /Gọi chị GIẢ/.test(await d.textContent('.page-current')) && /chưa đẩy lên Drive/.test(await d.textContent('.page-current')));
 /* sửa / xóa việc lặp chỉ 1 ngày */
 await d.click('.page-current .dt-viec a.item-inner'); await w(800);
 ok('bấm việc → trang Sửa việc điền sẵn', (await d.inputValue('#dt-vten'))==='Giao ban tổ GIẢ 042' && (await d.inputValue('#dt-vlap'))==='tuan');
 await d.click('.page-current .dt-vxoa'); await w(500); await d.click('.dialog.modal-in .dialog-button:first-child'); await w(1000);
 ok('xóa việc lặp → chọn "Chỉ ngày này": hôm nay hết, tuần sau vẫn còn', !/Giao ban tổ GIẢ 042/.test(await d.textContent('.page-current .dt-viec, .page-current .dt-trongnho')) && await d.evaluate(t7=>DTL.viecNgay(DT.lich(), t7).length===1, t7));
 /* gộp 2 chiều với máy tính */
 const day = await d.evaluate(()=>JSON.parse(JSON.stringify(DTL.goiDay(DT.lich()))));
 const may = await b.newPage({viewport:{width:1440, height:900}}); may.on('pageerror', e=>loi.push('máy tính: '+e.message)); await may.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(may);
 await may.goto('file://'+G+'/index.html'); await may.waitForTimeout(1500);
 const kq = await may.evaluate(([r, nay, t7])=>{ try{ dongHop(); }catch(e){} lcData().viec.push({id:'mt1', ten:'Họp chi bộ GIẢ', ngay:nay, lap:'mot', taoLuc:'2026-01-01T00:00:00Z', suaLuc:'2026-01-01T00:00:00Z'});
   const n = gopLich(r); return {n:n, tuan:lcViecNgay(t7).map(v=>v.ten), dong:dsDong(nay).map(m=>m.nd+(m.xong ? '✓' : '')), giu:lcViecNgay(nay).map(v=>v.ten), ra:JSON.parse(JSON.stringify({viec:lcData().viec, note:lcData().note, daXoa:lcData().daXoa, noteXoa:lcData().noteXoa, nhatKy:{}}))}; }, [day, nay, t7]);
 ok('máy tính gộp lich.json của điện thoại (gopLich): thấy việc lặp tuần + dòng ghi chú đã tick, giữ việc riêng máy tính', kq.n>=2 && kq.tuan.indexOf('Giao ban tổ GIẢ 042')>=0 && kq.dong.join('|')==='Gọi chị GIẢ nhắc nộp lãi✓' && kq.giu.indexOf('Họp chi bộ GIẢ')>=0, JSON.stringify({n:kq.n, tuan:kq.tuan, dong:kq.dong}));
 await may.close();
 const n2 = await d.evaluate(r=>{ const n = DTL.gop(DT.lich(), r); return {n:n, ten:DT.lich().viec.map(v=>v.ten).sort().join('|'), dong:DT.lich().note.length}; }, kq.ra);
 ok('điện thoại gộp lại bản máy tính (DTL.gop): nhận việc của máy tính, dòng đã xóa không sống lại', n2.ten==='Giao ban tổ GIẢ 042|Họp chi bộ GIẢ' && n2.dong===1, JSON.stringify(n2));
 /* Khách chưa có số liệu */
 await d.click('.dt-tab .tab-link[data-tab="tra"]'); await w(800);
 ok('Khách chưa có số liệu: thẻ hướng dẫn + nút "Tải số liệu từ Drive" (không tự bật đăng nhập)', /Chưa có số liệu khách hàng/.test(await d.textContent('.page-current')) && !!(await d.$('.page-current .dt-rong .dt-dongbo')) && /Khách/.test(await d.textContent('.dt-tab .tab-link-active')) && !(await d.$('.dialog.modal-in')));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
