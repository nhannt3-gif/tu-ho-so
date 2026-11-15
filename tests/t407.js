// t407 (3.551 E3, anh 15/11 "gộp và tiếp tục" — docs/DANH_GIA_CHUYEN_GIA_1511.md mục 4d): CSP bản máy tính + dấu vân tay thư viện.
//   Ghi mọi vi phạm CSP (securitypolicyviolation) khi: mở app, nạp bộ Excel giả (luồng nền đọc Excel), dựng PDF + đọc PDF (pdf.js, luồng nền blob), đi qua các tab chính.
//   Không được có vi phạm nào ngoài 'eval' thử nghiệm của pdf.js (pdf.js tự thử eval rồi lùi — không lỗi chức năng).
//   Dấu vân tay: thư viện chính nạp từ jsDelivr đúng dấu; sửa 1 byte → tvKiemDau từ chối; CSP chặn script từ nguồn lạ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.addInitScript(()=>{ window.CSP_VI = []; document.addEventListener('securitypolicyviolation', e=>window.CSP_VI.push(e.effectiveDirective+' '+(e.blockedURI||'').slice(0, 80))); });
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 let r = await p.evaluate(async()=>{ await xongTV; return {san:Object.keys(TV.san).sort().join(','), loi:TV.loi.join(','), xlsx:typeof XLSX!=='undefined', pdf:typeof pdfjsLib!=='undefined', lib:typeof PDFLib!=='undefined', meta:!!document.querySelector('meta[http-equiv="Content-Security-Policy"]')}; });
 ok('thư viện chính nạp đủ từ jsDelivr qua kiểm dấu (pdf.js, pdf-lib, SheetJS), có thẻ CSP', r.meta && r.xlsx && r.pdf && r.lib && !r.loi, JSON.stringify(r));
 /* nạp Excel (luồng nền) + PDF */
 r = await p.evaluate(async(files)=>{ try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1; let n = 0;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); n++; }catch(e){} } }
   const d = await PDFLib.PDFDocument.create(); d.addPage([595, 842]); const by = await d.save();
   const doc = await pdfjsLib.getDocument({data:by}).promise; const pg = await doc.getPage(1); const c = document.createElement('canvas'); const v = pg.getViewport({scale:0.5}); c.width = v.width; c.height = v.height;
   await pg.render({canvasContext:c.getContext('2d'), viewport:v}).promise; return {n, trang:doc.numPages}; }, files);
 ok('nạp bộ Excel giả (luồng nền) + dựng / đọc / vẽ PDF chạy được dưới CSP', r.n>=3 && r.trang===1, JSON.stringify(r));
 for(const n of [0, 1, 2, 3, 4, 5, 6, 7]){ await p.evaluate(n=>{ try{ doiNgan(n); }catch(e){} }, n); await p.waitForTimeout(400); }
 await p.evaluate(()=>{ try{ moNapSL(); }catch(e){} }); await p.waitForTimeout(1500);
 const vi = await p.evaluate(()=>window.CSP_VI);
 const that = vi.filter(x=>!/^script-src eval|^script-src-elem eval/.test(x) && !/^script-src.* eval$/.test(x));
 ok('không vi phạm CSP nào khi mở app, nạp file, đọc PDF, qua 8 tab (trừ eval thử của pdf.js)', that.length===0, that.slice(0, 5).join(' | '));
 /* dấu vân tay */
 r = await p.evaluate(async()=>{ const u = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
   const dung = await fetch(u).then(x=>x.arrayBuffer()); const sai = new Uint8Array(dung.slice(0)); sai[10] = sai[10]^1;
   const a = await tvKiemDau(u, dung).then(()=>'nhận', e=>'từ chối'); const c = await tvKiemDau(u, sai.buffer).then(()=>'nhận', e=>'từ chối: '+e.message);
   return {a, c}; });
 ok('dấu vân tay: đúng bản npm → nhận; sửa 1 byte → từ chối', r.a==='nhận' && /^từ chối: sai dấu vân tay/.test(r.c), JSON.stringify(r));
 r = await p.evaluate(()=>new Promise(ok=>{ const s = document.createElement('script'); s.src = 'https://example.com/la.js'; s.onerror = ()=>ok('chặn'); s.onload = ()=>ok('chạy'); document.head.appendChild(s); setTimeout(()=>ok('?'), 3000); }));
 const vi2 = await p.evaluate(()=>window.CSP_VI.filter(x=>/example\.com/.test(x)).length);
 ok('CSP chặn script từ nguồn lạ (example.com)', r==='chặn' && vi2>=1, r+' · '+vi2);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t407 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
