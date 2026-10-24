// t264 (TK 3, 3.344 — KE_HOACH_DIEN_THOAI_2 bước Đ2): Văn bản trên điện thoại — chip Tất cả · 📌 Đã ghim · năm · loại (nhớ lựa chọn),
//   bấm văn bản → trang xem trong app (PDF vẽ bằng pdf.js, không mở tab ngoài), 📌 Ghim = cất file mã hóa trong máy xem không mạng (≤ 200 MB),
//   danh sách cất máy mở lại không cần ⟳. Danh sách + PDF GIẢ, tải Drive giả lập.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
function pdfGia(){ const ob = ['<</Type/Catalog/Pages 2 0 R>>', '<</Type/Pages/Kids[3 0 R 4 0 R]/Count 2>>',
  '<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 5 0 R>>', '<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 5 0 R>>', null];
  const nd = '0 0 1 rg 50 600 300 200 re f'; ob[4] = '<</Length '+nd.length+'>>stream\n'+nd+'\nendstream';
  let s = '%PDF-1.4\n', vt = []; ob.forEach((o, i)=>{ vt.push(s.length); s += (i+1)+' 0 obj\n'+o+'\nendobj\n'; });
  const x = s.length; s += 'xref\n0 '+(ob.length+1)+'\n0000000000 65535 f \n'+vt.map(v=>String(v).padStart(10, '0')+' 00000 n \n').join('')+'trailer\n<</Size '+(ob.length+1)+'/Root 1 0 R>>\nstartxref\n'+x+'\n%%EOF';
  return Buffer.from(s, 'latin1').toString('base64'); }
const DS = [{id:'v1', soHieu:'123/QĐ-NHCS', trichYeu:'Quy định cho vay hộ nghèo', loai:'Quyết định', ngay:'2026-05-02', driveId:'d1'},
  {id:'v2', soHieu:'45/HD-NHCS', trichYeu:'Hướng dẫn nghiệp vụ', loai:'Hướng dẫn', ngay:'2026-03-10', driveId:'d2'},
  {id:'v3', soHieu:'7/CV-NHCS', trichYeu:'Công văn đôn đốc', loai:'Công văn', ngay:'2025-11-20', driveId:'d3'},
  {id:'v4', soHieu:'9/QĐ-NHCS', trichYeu:'Quyết định lãi suất', loai:'Quyết định', ngay:'2025-07-01'}];
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2});
 const d = await ctx.newPage(); d.on('pageerror', e=>loi.push(e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 const w = t=>d.waitForTimeout(t), pdf = pdfGia();
 const gia = async(coMang)=>d.evaluate(([pdf, coMang])=>{ window.TAI = 0; DT.taiFile = function(id){ TAI++; if(!coMang) return Promise.reject(new Error('Không có mạng'));
   const s = atob(pdf), u = new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i] = s.charCodeAt(i); return Promise.resolve(new Blob([u], {type:'application/pdf'})); }; }, [pdf, coMang]);
 await d.goto('file://'+G+'/dt.html'); await w(2500); await d.evaluate(()=>{ try{ DTG.app().dialog.close(); }catch(e){} });
 /* danh sách giả như vừa ⟳ từ Drive (taiKhoi đặt DS rồi cất máy) */
 await d.evaluate(ds=>DT.datDS('vanban', ds), DS);
 await gia(true);
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/vb/', {reloadAll:true})); await w(800);
 const chip = ()=>d.$$eval('.page-current .dt-vbc', x=>x.map(e=>e.textContent+(e.classList.contains('bat') ? '*' : '')));
 const ds = ()=>d.$$eval('#dt-ds li', x=>x.map(e=>e.textContent.replace(/\s+/g, ' ').trim()));
 ok('chip: Tất cả · 📌 Đã ghim · năm (mới trước) · loại (nhiều trước)', (await chip()).join('|')==='Tất cả*|📌 Đã ghim|2026|2025|Quyết định|Hướng dẫn|Công văn', (await chip()).join('|'));
 await d.click('.page-current .dt-vbc[data-v="2025"]'); await w(300);
 ok('chip năm 2025 → 2 văn bản', (await ds()).length===2 && (await ds()).every(x=>/2025/.test(x)), (await ds()).join(' ; '));
 await d.click('.page-current .dt-vbc[data-v="Quyết định"]'); await w(300);
 ok('thêm chip loại Quyết định → chỉ 9/QĐ (năm + loại cùng lúc)', (await ds()).length===1 && /9\/QĐ/.test((await ds())[0]), (await ds()).join(' ; '));
 await d.click('.page-current .dt-vbc[data-k="tat"]'); await w(300);
 ok('Tất cả → bỏ lọc, 4 văn bản', (await ds()).length===4);
 /* xem trong app */
 await d.click('#dt-ds li a[href*="/v1/"]'); await w(3500);
 const xem = await d.evaluate(()=>({url:location.href, c:document.querySelectorAll('.page-current canvas.dt-trang').length, chu:document.querySelector('.page-current #dt-xem').textContent,
   w:(document.querySelector('.page-current canvas.dt-trang') || {}).clientWidth || 0}));
 ok('bấm văn bản → trang xem trong app, PDF vẽ đủ 2 trang (canvas), không mở tab ngoài', xem.c===2 && /2 trang/.test(xem.chu) && /dt\.html/.test(xem.url) && ctx.pages().length===1, JSON.stringify(xem));
 ok('trang vẽ vừa ngang màn điện thoại', xem.w>300 && xem.w<=390, xem.w+'px');
 ok('có nút 📌 Ghim + 📤 Gửi · ⬇ Lưu máy', /Ghim — xem không mạng/.test(await d.textContent('.page-current .dt-ghim')) && !!(await d.$('.page-current .dt-gui')));
 await d.click('.page-current .dt-ghim'); await w(1200);
 const g1 = await d.evaluate(()=>({o:DT.off(), dung:DT.offDung(), nut:document.querySelector('.page-current .dt-ghim').textContent}));
 ok('📌 Ghim → cất file trong máy, nút đổi Bỏ ghim', !!g1.o.v1 && g1.dung>0 && /Bỏ ghim/.test(g1.nut), JSON.stringify(g1));
 const ma = await d.evaluate(async()=>{ const x = await new Promise(ok=>{ const r = indexedDB.open('tuhoso_dt'); r.onsuccess = e=>{ const q = e.target.result.transaction('k').objectStore('k').get('vb:v1'); q.onsuccess = ()=>ok(q.result); }; });
   return {co:!!x, pdf:x ? /%PDF/.test(new TextDecoder('latin1').decode(x.c || new Uint8Array())) : true}; });
 ok('file ghim cất mã hóa (không đọc được %PDF)', ma.co && !ma.pdf);
 const tran = await d.evaluate(async()=>{ try{ await DT.offLuu({id:'to'}, new Blob([new Uint8Array(201*1024*1024)])); return 'lọt'; }catch(e){ return e.message; } });
 ok('quá 200 MB → từ chối, báo bỏ ghim bớt', /200 MB/.test(tran) && !DT_offCo(await d.evaluate(()=>DT.off()), 'to'), tran);
 /* mở lại không mạng */
 await d.reload(); await w(2500); await d.evaluate(()=>{ try{ DTG.app().dialog.close(); }catch(e){} }); await gia(false);
 await d.evaluate(()=>DTG.app().views.main.router.navigate('/vb/', {reloadAll:true})); await w(1200);
 ok('mở lại: danh sách cất máy hiện ngay, không cần ⟳; văn bản đã ghim có 📌', (await ds()).length===4 && /📌/.test((await ds()).find(x=>/123\/QĐ/.test(x)) || ''), (await ds()).join(' ; '));
 ok('chip 📌 Đã ghim đếm 1', (await chip()).indexOf('📌 Đã ghim 1')>=0, (await chip()).join('|'));
 await d.click('.page-current .dt-vbc[data-k="ghim"]'); await w(300);
 ok('chip Đã ghim → chỉ văn bản đã ghim', (await ds()).length===1 && /123\/QĐ/.test((await ds())[0]));
 await d.click('#dt-ds li a'); await w(3500);
 ok('không mạng: văn bản đã ghim vẫn xem được (không tải Drive)', (await d.$$('.page-current canvas.dt-trang')).length===2 && await d.evaluate(()=>TAI===0));
 await d.evaluate(()=>DTG.app().views.main.router.back()); await w(700);
 await d.click('.page-current .dt-vbc[data-k="tat"]'); await w(300); await d.click('#dt-ds li a[href*="/v2/"]'); await w(2000);
 ok('không mạng: văn bản chưa ghim báo lỗi rõ', /Không có mạng/.test(await d.textContent('.page-current #dt-xem')));
 await d.evaluate(()=>DTG.app().views.main.router.back()); await w(700);
 await d.click('#dt-ds li a[href*="/v4/"]'); await w(1500);
 ok('văn bản chưa lên Drive → báo rõ', /chưa lên Drive/.test(await d.textContent('.page-current #dt-xem')));
 await d.evaluate(()=>DTG.app().views.main.router.back()); await w(700); await d.click('#dt-ds li a[href*="/v1/"]'); await w(3000);
 await d.click('.page-current .dt-ghim'); await w(800);
 ok('Bỏ ghim → xóa file trong máy', await d.evaluate(()=>!DT.off().v1 && DT.offDung()===0));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
function DT_offCo(o, k){ return !!(o && o[k]); }
