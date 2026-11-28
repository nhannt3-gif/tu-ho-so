// t423 (3.574 — anh 28/11 "duyệt tự quét"): 🔄 tự quét hộp đến (js/99h TUQ). Drive / Google GIẢ (chặn mạng, thay noiDrive / goiDrive / fetch).
//   Ý: chưa bật → ⋯ có nút "Bật tự quét", không dòng báo · bật: xin quyền drive.readonly (DRIVE_SCOPE thêm, tokeninfo có quyền) → bật; tokeninfo thiếu quyền → không bật, báo cách khai ·
//   quét thư mục hộp đến + thư mục thêm: chỉ PDF / Excel, bỏ file khác · dòng báo dưới thanh công cụ Nạp & KT (thanh vẫn 1 hàng) · Nạp → chỉ GET, đưa vào xem trước, đánh dấu đã thấy ·
//   quét lại → không báo lại; file đổi nội dung (md5) → báo lại · rút js/99h → không nút.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99h-tu-quet\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
   await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async()=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} D.cauHinh.slTab = 'nap'; doiNgan(7); await new Promise(z=>setTimeout(z, 800)); });
   return p; };
 const p = await mo(false);
 let r = await p.evaluate(async()=>{ slNapThem(SL_KY || '2026-08'); await new Promise(z=>setTimeout(z, 200)); const h = document.getElementById('hop').innerHTML; try{ dongHop(); }catch(e){}
   return {nut:/data-lenh="tuq.bat"/.test(h), bao:!!document.querySelector('.tuq-bao')}; });
 ok('chưa bật: menu ⋯ Nạp & KT có "🔄 Bật tự quét hộp đến", không có dòng báo', r.nut && !r.bao, JSON.stringify(r));
 /* giả Drive */
 await p.evaluate(()=>{ window.GOI = []; window.Q = 'co'; window.MD5 = {f1:'a', f2:'b', f3:'c', f4:'d'};
   coTheNoiDrive = ()=>true; noiDrive = ()=>{ DR.token = 'gia'; DR.sanSang = true; DR.hetHan = Date.now()+3e6; return Promise.resolve(true); }; canToken = ()=>Promise.resolve(true);
   goiDrive = (u)=>{ GOI.push('GET '+u); const id = /'([^']+)' in parents/.exec(decodeURIComponent(u))[1];
     const f = id==='HOP' ? [{id:'f1', name:'KQGD_GiaLoc_2026_11_20.pdf'}, {id:'f2', name:'CLT02_T11.xlsx'}, {id:'f3', name:'ghi chu.docx'}] : (id==='TM2' ? [{id:'f4', name:'KQGD_TruongMit_2026_11_19.pdf'}] : []);
     return Promise.resolve({files:f.map(x=>Object.assign({md5Checksum:MD5[x.id]}, x))}); };
   const f0 = window.fetch; window.fetch = (u, opt)=>{ u = String(u); GOI.push(((opt && opt.method) || 'GET')+' '+u);
     if(/tokeninfo/.test(u)) return Promise.resolve(new Response(JSON.stringify({scope:Q==='co' ? 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly' : 'https://www.googleapis.com/auth/drive.file'})));
     if(/alt=media/.test(u)) return Promise.resolve(new Response(new Blob(['gia'])));
     return f0(u, opt); };
   window.NHAN = null; slDocNhieu = fs=>{ NHAN = fs.map(f=>f.name); }; D.cauHinh.hopDenId = 'HOP'; });
 r = await p.evaluate(async()=>{ Q = 'khong'; TUQ.batQuet(); await new Promise(z=>setTimeout(z, 400)); return {bat:!!D.cauHinh.tqBat}; });
 ok('tokeninfo thiếu quyền chỉ đọc → không bật (báo cách khai quyền ở Google Cloud)', !r.bat, JSON.stringify(r));
 r = await p.evaluate(async()=>{ Q = 'co'; TUQ.batQuet(); await new Promise(z=>setTimeout(z, 600)); veSoLieu(); await new Promise(z=>setTimeout(z, 600));
   const t = document.querySelector('.sl-thanh-nap'), bao = document.querySelector('.tuq-bao'), btn = t ? [...t.querySelectorAll('button')] : [];
   const hang = new Set(btn.filter(x=>x.offsetParent).map(x=>Math.round(x.getBoundingClientRect().top))).size;
   return {bat:!!D.cauHinh.tqBat, scope:DRIVE_SCOPE.indexOf('drive.readonly')>=0, moi:TUQ.moi.map(f=>f.name), bao:bao ? bao.textContent : '', sau:!!(t && bao && t.nextElementSibling===bao), hang}; });
 ok('bật: xin thêm quyền drive.readonly, tokeninfo có quyền → bật; quét thư mục hộp đến: 2 file mới (PDF + Excel), bỏ file .docx', r.bat && r.scope && r.moi.join()==='KQGD_GiaLoc_2026_11_20.pdf,CLT02_T11.xlsx', JSON.stringify(r));
 ok('dòng "🔄 Hộp đến có 2 file mới — Nạp" ngay dưới thanh công cụ Nạp & KT, thanh công cụ vẫn 1 hàng', /2 file mới/.test(r.bao) && r.sau && r.hang===1, JSON.stringify({bao:r.bao, sau:r.sau, hang:r.hang}));
 r = await p.evaluate(async()=>{ GOI = []; TUQ.nap(); await new Promise(z=>setTimeout(z, 500)); const sau = await TUQ.quet(true);
   return {nhan:NHAN, goi:GOI, conBao:!!document.querySelector('.tuq-bao'), sau:sau.length}; });
 ok('Nạp: chỉ tải (GET), đưa 2 file vào xem trước; quét lại không báo lại; không có lệnh dời / xóa', r.nhan && r.nhan.length===2 && r.goi.every(x=>/^GET /.test(x)) && !r.goi.some(x=>/DELETE|PATCH|POST/.test(x)) && r.sau===0 && !r.conBao, JSON.stringify(r).slice(0, 400));
 r = await p.evaluate(async()=>{ MD5.f1 = 'a2'; D.cauHinh.tqThuMuc = ['TM2']; const ds = await TUQ.quet(true); return ds.map(f=>f.name).sort().join(); });
 ok('file trên Drive đổi nội dung (md5 khác) → báo lại; thư mục thêm (Picker) cũng được quét', r==='KQGD_GiaLoc_2026_11_20.pdf,KQGD_TruongMit_2026_11_19.pdf', r);
 r = await p.evaluate(async()=>{ slNapThem(SL_KY || '2026-08'); await new Promise(z=>setTimeout(z, 200)); const h = document.getElementById('hop').innerHTML; try{ dongHop(); }catch(e){} return {quetLai:/tuq.quetLai/.test(h), them:/tuq.themTM/.test(h), tat:/tuq.tat/.test(h)}; });
 ok('đã bật: menu ⋯ có Quét lại từ đầu · Thêm thư mục tự quét · Tắt tự quét', r.quetLai && r.them && r.tat, JSON.stringify(r));
 const q = await mo(true); r = await q.evaluate(async()=>{ slNapThem(SL_KY || '2026-08'); await new Promise(z=>setTimeout(z, 200)); return {k:typeof TUQ, nut:/tuq\./.test(document.getElementById('hop').innerHTML)}; });
 ok('rút js/99h: không còn nút tự quét', r.k==='undefined' && !r.nut, JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t423 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
