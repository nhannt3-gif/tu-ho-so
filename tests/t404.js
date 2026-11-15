// t404 (3.548 đợt 2, anh 15/11 "code cả 2 và gộp" — docs/DANH_GIA_CHUYEN_GIA_1511.md A2 · A3 · 4c E1 · E2): máy thật ↔ AI.
//   A2 "Có gì mới" › ✓ Đạt / ✗ Chưa (+ ghi chú) · A3 lỗi che số dài / email · Drive giả: 2 máy cùng ghi _Hệ thống/may_that.json, mỗi máy 1 mục (không đè nhau)
//   E1 2 tab cùng máy → tab sau chỉ xem (không lưu), "Dùng tab này" đổi vai · E2 tự xin lưu bền. Chạy qua http (BroadcastChannel cần nguồn thật). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), http=require('http'), G=path.resolve(__dirname,'..'); const drive=require('./fakedrive.js')();
const LOAI = {'.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.wasm':'application/wasm', '.png':'image/png', '.svg':'image/svg+xml'};
(async()=>{
 const sv = http.createServer((q, r)=>{ const f = path.join(G, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html'));
   if(!f.startsWith(G) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ r.writeHead(404); return r.end(); }
   r.writeHead(200, {'Content-Type':LOAI[path.extname(f)] || 'application/octet-stream'}); fs.createReadStream(f).pipe(r); }).listen(0);
 const URL0 = 'http://127.0.0.1:'+sv.address().port+'/index.html';
 const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const ctxMoi = async (e1) => { const ctx = await b.newContext({viewport:{width:1366, height:800}, serviceWorkers:'block'}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   if(e1) await ctx.addInitScript(()=>{ try{ localStorage.setItem('tuhoso_e1_thu', '1'); }catch(e){} }); return ctx; };
 const mo = async (ctx) => { const p = await ctx.newPage(); p.on('pageerror', e=>loi.push(e.message)); p.on('dialog', d=>d.accept('nút 🧪 không thấy'));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await p.route(/kiem_ban=1/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto(URL0); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ';
     window.BAO = []; const c = bao; bao = function(t){ BAO.push(String(t)); return c.apply(this, arguments); }; });
   return p; };
 const fileMay = () => { const f = Object.values(drive.F).find(x=>x.name==='may_that.json' && !x.trashed); return f ? JSON.parse(f.body.toString('utf8')) : null; };
 /* ① che */
 const c1 = await ctxMoi(false), p1 = await mo(c1);
 let r = await p1.evaluate(()=>MTH.che('KU 6600000700000292 CCCD 072090001234 a.b@c.vn ngày 15/11 số 12345'));
 ok('A3 che: dãy ≥ 6 chữ số + email bị che, số ngắn / ngày giữ', !/\d{6,}/.test(r) && !/@/.test(r) && /15\/11/.test(r) && /12345/.test(r), r);
 /* ② Có gì mới: nút Đạt / Chưa */
 await p1.evaluate(()=>moHuongDan('moi')); await p1.waitForTimeout(400);
 r = await p1.evaluate(()=>({dong:document.querySelectorAll('#hop .mth-dong').length, thu:CO_GI_MOI.thu.length}));
 ok('A2 "Có gì mới" có khối Kết quả thử — mỗi việc thử 1 dòng ✓ Đạt / ✗ Chưa', r.dong===r.thu && r.thu>0, JSON.stringify(r));
 await p1.click('#hop .mth-dong[data-i="0"] [data-lenh="mth.dat"]'); await p1.waitForTimeout(200);
 if(r.thu>1){ await p1.click('#hop .mth-dong[data-i="1"] [data-lenh="mth.chua"]'); await p1.waitForTimeout(200); }
 r = await p1.evaluate(()=>({kq:MTH.kq(), bat:!!document.querySelector('#hop .mth-dong[data-i="0"] [data-lenh="mth.dat"].chinh')}));
 ok('bấm ✓ Đạt / ✗ Chưa (+ ghi chú) → lưu theo bản, nút sáng', r.kq[0] && r.kq[0].kq==='dat' && r.bat && (!r.kq[1] || (r.kq[1].kq==='chua' && /🧪/.test(r.kq[1].ghi))), JSON.stringify(r));
 /* ③ lỗi + đẩy Drive (máy 1) */
 await p1.evaluate(async()=>{ dongHop(); nklGhi('Lỗi giả KU 6600000700000292', 'js/99.js:1:1', ''); await MTH.day(); });
 let F = fileMay(); const may1 = await p1.evaluate(()=>maMayCua());
 const m1 = F && F.may[may1];
 ok('A2 + A3 + A4 → Drive _Hệ thống/may_that.json: mục máy này có bản, kết quả thử, lỗi đã che', !!m1 && m1.ban && m1.thu.length>=1 && m1.thu[0].viec && m1.loi.some(l=>/Lỗi giả/.test(l.msg) && !/\d{6,}/.test(l.msg)) && drive.duong(Object.values(drive.F).find(x=>x.name==='may_that.json').parents[0])==='Tủ hồ sơ/_Hệ thống', JSON.stringify(m1 || F).slice(0, 300));
 /* ④ máy 2 ghi → giữ mục máy 1 */
 const c2 = await ctxMoi(false), p2 = await mo(c2);
 await p2.evaluate(async()=>{ await MTH.day(); }); F = fileMay(); const may2 = await p2.evaluate(()=>maMayCua());
 ok('máy 2 đẩy → file có cả 2 máy (không đè mục máy 1)', may1!==may2 && !!F.may[may1] && !!F.may[may2] && F.may[may1].thu.length>=1, Object.keys(F.may).join(','));
 /* ⑤ E2 */
 r = await p2.evaluate(async()=>{ let goi = 0; navigator.storage.persisted = ()=>Promise.resolve(false); navigator.storage.persist = ()=>{ goi++; return Promise.resolve(true); }; const kq = await MTH.luuBen(); return {goi, kq}; });
 ok('E2 tự xin lưu bền khi chưa được', r.goi===1 && r.kq===true, JSON.stringify(r));
 await c1.close(); await c2.close();
 /* ⑥ E1: 2 tab cùng máy */
 const c3 = await ctxMoi(true), t1 = await mo(c3); await t1.waitForTimeout(1800); const t2 = await mo(c3); await t2.waitForTimeout(800);
 r = {t1:await t1.evaluate(()=>MTH.chiXem), t2:await t2.evaluate(()=>({cx:MTH.chiXem, dai:!!document.getElementById('dai-tab'), luu:luuNgay()}))};
 ok('E1 mở tab thứ 2 → tab sau chỉ xem (dải ⛔, không lưu), tab đầu vẫn chính', r.t1===false && r.t2.cx===true && r.t2.dai && r.t2.luu===false, JSON.stringify(r));
 await t2.click('#dai-tab [data-lenh="mth.dungTab"]'); await t2.waitForTimeout(500);
 r = {t1:await t1.evaluate(()=>({cx:MTH.chiXem, dai:!!document.getElementById('dai-tab')})), t2:await t2.evaluate(()=>({cx:MTH.chiXem, dai:!!document.getElementById('dai-tab')}))};
 ok('"Dùng tab này" → tab 2 thành chính, tab 1 chuyển chỉ xem', !r.t2.cx && !r.t2.dai && r.t1.cx && r.t1.dai, JSON.stringify(r));
 await c3.close();
 /* ⑦ phép thử tự động (không cờ) → không khóa */
 const c4 = await ctxMoi(false), u1 = await mo(c4), u2 = await mo(c4); await u2.waitForTimeout(800);
 ok('trình duyệt tự động không cờ thử → không khóa tab (phép thử cũ mở nhiều trang vẫn chạy)', !(await u2.evaluate(()=>MTH.chiXem)));
 await c4.close();
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t404 đạt hết');
 await b.close(); sv.close(); process.exit(sai ? 1 : 0);
})();
