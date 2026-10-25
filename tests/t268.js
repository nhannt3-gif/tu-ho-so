// t268 (TK 3, 3.373 — anh 26/10 "báo chưa nối được drive gì tùm lum rối quá", "điện thoại và máy tính phải thống nhất, điện thoại chỉ gọn hơn"):
//   Drive báo ở 1 chip (máy tính đủ chữ · điện thoại chữ ngắn, chỉ hiện khi cần bấm), không thông báo nổi khi tự nối / hàng chờ, câu "chưa nối" thống nhất,
//   giữ quyền còn hạn khi mở lại app, xin lại ngầm bị chặn không làm mất quyền cũ, ⏱ ghi rõ nối được / không + lý do. Không gọi Google thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const mo = async(dt)=>{ const ctx = await b.newContext(dt ? {viewport:{width:390, height:844}, isMobile:true, hasTouch:true} : {viewport:{width:1440, height:900}});
   const p = await ctx.newPage(); p.on('pageerror', e=>loi.push(e.message)); await p.route(/accounts\.google|googleapis/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(2500);
   await p.evaluate(()=>{ try{ dongHop(); }catch(e){} coTheNoiDrive = ()=>true; window.__bao = []; const b0 = bao, l0 = baoLoi; bao = function(t){ __bao.push(String(t)); return b0.apply(this, arguments); }; baoLoi = function(t){ __bao.push('LỖI '+t); return l0.apply(this, arguments); }; });
   return p; };
 const m = await mo(0);
 /* mở lại app còn quyền cũ */
 let r = await m.evaluate(async()=>{ localStorage.setItem('tuhoso_drtk', JSON.stringify({t:'gia', h:Date.now()+40*60000})); DR.sanSang = false; DR.token = null; DR.daKeoCM = DR.daKeoCH = DR.daKeoLich = true;
   const t0 = performance.now(), v = await noiDrive(true); return {v, ms:Math.round(performance.now()-t0), san:DR.sanSang, cu:DR.quyenCu, chip:document.getElementById('chip-drive').textContent, bao:__bao.slice(), ds:DTD.ds.map(x=>x.t)}; });
 ok('mở lại app trong hạn quyền (còn 40 phút) → nối ngay, không hỏi Google, không báo nổi; ⏱ ghi "dùng lại quyền cũ"', r.v===true && r.san && r.cu && r.ms<200 && /🟢 Drive/.test(r.chip) && !r.bao.length && r.ds.some(x=>/dùng lại quyền cũ/.test(x)), JSON.stringify(r));
 /* quyền sắp hết (< 2 phút) → phải xin Google; Google bị chặn → chip vàng, không báo nổi, ⏱ ghi lý do */
 r = await m.evaluate(async()=>{ localStorage.setItem('tuhoso_drtk', JSON.stringify({t:'gia', h:Date.now()+60000})); DR.sanSang = false; DR.token = null; __bao = []; DTD.ds = [];
   const v = await noiDrive(true); capNhatChip(); return {v, san:DR.sanSang, ly:DR.lyDo, chip:document.getElementById('chip-drive').textContent, bao:__bao.slice(), ds:DTD.ds.map(x=>x.t)}; });
 ok('quyền cũ sắp hết → không dùng; tự nối không được → chip "🟡 Bấm để nối Drive", KHÔNG báo nổi; ⏱ ghi "CHƯA được: lý do"', r.v===false && !r.san && /🟡 Bấm để nối Drive/.test(r.chip) && !r.bao.length && r.ds.some(x=>/CHƯA được: .+/.test(x)), JSON.stringify(r));
 /* xin lại ngầm bị chặn khi quyền cũ còn hạn → vẫn nối */
 r = await m.evaluate(async()=>{ DR.token = 'gia'; DR.hetHan = Date.now()+20*60000; DR.sanSang = true; DR.quyenCu = false; window.google = undefined; const v = await noiDrive(true); capNhatChip(); return {v, san:DR.sanSang, chip:document.getElementById('chip-drive').textContent}; });
 ok('xin lại quyền ngầm bị chặn mà quyền cũ còn 20 phút → vẫn 🟢 (trước đây báo nối lỗi ngay)', r.v===true && r.san && /🟢/.test(r.chip), JSON.stringify(r));
 /* hàng chờ không báo nổi */
 r = await m.evaluate(async()=>{ __bao = []; DR.online = false; capNhatChip(); goiDrive('https://www.googleapis.com/drive/v3/files?q=x'); await new Promise(x=>setTimeout(x, 200)); const c = document.getElementById('chip-drive').textContent; DR.online = true; DR.hangCho = []; return {bao:__bao.slice(), chip:c}; });
 ok('mất mạng / việc vào hàng chờ → không còn thông báo nổi "Phiên Drive hết…"; chip 🔴', !r.bao.length && /🔴 Mất mạng/.test(r.chip), JSON.stringify(r));
 /* câu chưa nối thống nhất + chip gộp số bản chưa lên */
 r = await m.evaluate(()=>{ DR.sanSang = false; const a = drChuaNoi(); coTheNoiDrive = ()=>false; const c = drChuaNoi(); coTheNoiDrive = ()=>true;
   const g = scanCanDay; scanCanDay = ()=>[1, 2, 3]; DR.sanSang = true; capNhatChip(); const chip = document.getElementById('chip-drive').textContent, an = document.getElementById('chip-chua').classList.contains('an'); scanCanDay = g; return {a, c, chip, an}; });
 ok('câu "chưa nối" thống nhất (bấm chip 🟡 / chưa cài → ⚙); số bản chưa lên gộp vào chip, chip riêng cũ ẩn', /bấm chip 🟡 Nối Drive/.test(r.a) && /Chưa cài Drive — vào ⚙/.test(r.c) && /🟢 Drive.* · 3 chưa lên/.test(r.chip) && r.an, JSON.stringify(r));
 /* điện thoại */
 const d = await mo(1);
 r = await d.evaluate(()=>{ const vis = ()=>{ const e = document.getElementById('chip-drive'); return !!e.offsetParent && getComputedStyle(document.querySelector('.day')).display!=='none'; };
   DR.sanSang = false; DR.token = null; capNhatChip(); const vang = {t:document.getElementById('chip-drive').textContent, h:vis()};
   DR.token = 'gia'; DR.hetHan = Date.now()+3600e3; DR.sanSang = true; capNhatChip(); const xanh = {t:document.getElementById('chip-drive').textContent, h:vis()}; return {vang, xanh}; });
 ok('điện thoại: cùng chip, chữ ngắn — chưa nối hiện "🟡 Nối Drive" ở chân trang; đã nối 🟢 ẩn cho gọn', r.vang.t==='🟡 Nối Drive' && r.vang.h && /^🟢 Drive$/.test(r.xanh.t) && !r.xanh.h, JSON.stringify(r));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
