// t402 (3.545 A4, anh 15/11 "code A4" — docs/DANH_GIA_CHUYEN_GIA_1511.md): biết máy đang chạy bản nào + nhắc cập nhật.
//   Chạy app qua http (máy chủ tĩnh tại chỗ); giả máy chủ trả js/02-nen.js?kiem_ban=1 với bản MỚI hơn / BẰNG / lỗi mạng.
//   Ý: so số bản theo đoạn · dải nhắc hiện đúng bản · Để sau ẩn trong phiên · 📤 File đối chiếu bị chặn khi bản cũ, chạy như cũ khi bằng / mất mạng · file:// không hỏi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), http=require('http'), G=path.resolve(__dirname,'..');
const LOAI = {'.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.wasm':'application/wasm', '.png':'image/png', '.svg':'image/svg+xml'};
(async()=>{
 const sv = http.createServer((q, r)=>{ const f = path.join(G, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html'));
   if(!f.startsWith(G) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ r.writeHead(404); return r.end(); }
   r.writeHead(200, {'Content-Type':LOAI[path.extname(f)] || 'application/octet-stream'}); fs.createReadStream(f).pipe(r); }).listen(0);
 const URL0 = 'http://127.0.0.1:'+sv.address().port+'/index.html';
 const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const mo = async (che, url) => { const ctx = await b.newContext({viewport:{width:1366, height:800}, serviceWorkers:'block'}); const p = await ctx.newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort());
   await p.route(/kiem_ban=1/, r=>{ const m = che(); if(m==='loi') return r.abort(); r.fulfill({status:200, contentType:'application/javascript', body:"var APP_BAN = '"+m+"', APP_LUC = 'x';"}); });
   await require('./tv.js')(p); await p.goto(url || URL0); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.BAO = []; const c = bao; bao = function(t){ BAO.push(String(t)); return c.apply(this, arguments); }; });
   return {p, ctx}; };
 let ban = 'x';
 const {p, ctx} = await mo(()=>ban);
 const cur = await p.evaluate(()=>APP_BAN); const tang = s=>{ const x = s.split('.'); x[x.length-1] = String(+x[x.length-1]+1); return x.join('.'); };
 /* ① so số bản */
 const s = await p.evaluate(()=>[BMN.so('3.545','3.544'), BMN.so('3.544','3.544'), BMN.so('3.90.1','3.90.2'), BMN.so('4.0','3.999'), BMN.so('3.544',''), BMN.docBan("var APP_BAN = '3.600', APP_LUC")].join(','));
 ok('so số bản theo đoạn (3.545>3.544 · bằng · 3.90.1<3.90.2 · 4.0>3.999 · có > chưa biết) + đọc APP_BAN', s==='1,0,-1,1,1,3.600', s);
 /* ② máy chủ có bản mới → dải */
 ban = tang(cur);
 let r = await p.evaluate(async()=>{ await BMN.kiem(); const e = document.getElementById('dai-ban'); return {co:!!e, chu:e ? e.textContent : '', dau:e ? e===document.body.firstElementChild : false, nut:!!document.querySelector('#dai-ban [data-lenh="bmn.capNhat"]')}; });
 ok('máy chủ có bản mới → dải trên cùng "đang chạy bản '+cur+' — đã có bản '+ban+'" + nút ⟳ Cập nhật ngay', r.co && r.dau && r.nut && r.chu.includes('bản '+cur) && r.chu.includes('bản '+ban), JSON.stringify(r));
 /* ③ chặn xuất */
 r = await p.evaluate(async()=>{ BAO.length = 0; await slDCXuat('2026-08'); return BAO.join(' | '); });
 ok('📤 File đối chiếu khi máy chạy bản cũ → không xuất, báo cập nhật (QT so cùng cách tính)', /Chưa lập file đối chiếu: máy này đang chạy bản/.test(r) && !/chưa có Mẫu 31/.test(r), r);
 /* ④ Để sau → ẩn trong phiên; lần kiểm sau cùng bản vẫn ẩn */
 await p.click('#dai-ban [data-lenh="bmn.deSau"]'); await p.waitForTimeout(200);
 r = await p.evaluate(async()=>{ const a = !!document.getElementById('dai-ban'); await BMN.kiem(); return {a, b:!!document.getElementById('dai-ban')}; });
 ok('Để sau → dải ẩn, kiểm lại cùng bản vẫn ẩn trong phiên', !r.a && !r.b, JSON.stringify(r));
 /* ⑤ bấm xuất khi đã Để sau → vẫn chặn, dải hiện lại */
 r = await p.evaluate(async()=>{ BAO.length = 0; await slDCXuat('2026-08'); return {bao:BAO.join(' | '), dai:!!document.getElementById('dai-ban')}; });
 ok('đã Để sau mà bấm xuất → vẫn chặn, dải hiện lại', /máy này đang chạy bản/.test(r.bao) && r.dai, JSON.stringify(r));
 /* ⑥ máy chủ bằng bản → không dải, xuất chạy như cũ */
 ban = cur;
 r = await p.evaluate(async()=>{ BAO.length = 0; await slDCXuat('2026-08'); await new Promise(x=>setTimeout(x,300)); return {bao:BAO.join(' | '), dai:!!document.getElementById('dai-ban')}; });
 ok('máy chủ cùng bản → hết dải, 📤 chạy như cũ (chưa có Mẫu 31 → báo nạp trước)', !r.dai && /chưa có Mẫu 31/.test(r.bao), JSON.stringify(r));
 /* ⑦ mất mạng → xuất như cũ */
 ban = 'loi';
 r = await p.evaluate(async()=>{ BAO.length = 0; BMN.moi = ''; await slDCXuat('2026-08'); await new Promise(x=>setTimeout(x,300)); return BAO.join(' | '); });
 ok('không hỏi được máy chủ (mất mạng) → 📤 chạy như cũ', /chưa có Mẫu 31/.test(r) && !/máy này đang chạy/.test(r), r);
 /* ⑧ Cập nhật ngay → tải lại trang */
 ban = tang(cur); await p.evaluate(async()=>{ try{ sessionStorage.clear(); }catch(e){} await BMN.kiem(); });
 const nav = p.waitForNavigation({timeout:8000}).then(()=>true, ()=>false); await p.click('#dai-ban [data-lenh="bmn.capNhat"]');
 ok('⟳ Cập nhật ngay → tải lại trang', await nav);
 await ctx.close();
 /* ⑨ tự hỏi sau 5 giây khi mở */
 const {p:p2, ctx:c2} = await mo(()=>tang(cur)); await p2.waitForTimeout(5500);
 ok('mở app → sau 5 giây tự hỏi, có bản mới thì hiện dải', await p2.evaluate(()=>!!document.getElementById('dai-ban'))); await c2.close();
 /* ⑩ file:// không hỏi */
 let hoi = 0; const {p:p3, ctx:c3} = await mo(()=>{ hoi++; return tang(cur); }, 'file://'+G+'/index.html'); await p3.waitForTimeout(5500);
 const r3 = await p3.evaluate(async()=>{ const x = await BMN.kiem(); return {x, dai:!!document.getElementById('dai-ban')}; });
 ok('mở bằng file:// → không hỏi máy chủ, không dải', hoi===0 && r3.x==='' && !r3.dai, JSON.stringify({hoi, ...r3})); await c3.close();
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t402 đạt hết');
 await b.close(); sv.close(); process.exit(sai ? 1 : 0);
})();
