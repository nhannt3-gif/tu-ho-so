// 3.390 (BAN_GIAO_TK3_2710 mục 3.1, anh duyệt hướng 27/10): bộ lọc chuẩn giống hệt mọi tab Số liệu —
// ô 🔎 tìm tổ ẩn, nút 🔎 trên dải LỌC ĐỊA BÀN bấm mới mở ô gõ (gõ → gợi ý, Enter chọn tổ → tự đóng, Esc đóng + xóa chữ);
// dòng cam nguồn số liệu (kỳ theo ngày) → 1 chip "📅 Số liệu dd/mm/yyyy · ⚠ n file lấy ngày trước" trên dải tiêu đề;
// Tra cứu KH không có 🔎 tìm tổ / chip trên dải (chip báo ở cạnh ô tìm khách); điện thoại: hàng lọc 1 dòng ở mọi tab.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
     kyChungDoi('2026-08'); doiNgan(7); }, files);
   await p.waitForTimeout(800); return p; };
 const p = await mo(1440, 900, false);
 for(const t of ['to','sk','th','kt','gdx']){ await p.evaluate(t=>slDoiTab(t), t); await p.waitForTimeout(700);
   const r = await p.evaluate(t=>{ const c=document.getElementById(t+'-cay'), n=c && c.querySelector('.pv-dau .pv-tim-nut'), i=document.getElementById(t+'-tim');
     return {nut:!!n, an:!!i && !i.offsetParent, trongHang:!!(i && i.closest('.pv-hang1'))}; }, t);
   ok(t+': nút 🔎 trên dải tiêu đề, ô tìm tổ ẩn (vẫn nằm trong hàng lọc)', r.nut && r.an && r.trongHang, JSON.stringify(r)); }
 await p.evaluate(()=>slDoiTab('to')); await p.waitForTimeout(600);
 await p.click('#to-cay .pv-tim-nut'); await p.waitForTimeout(200);
 let r = await p.evaluate(()=>({hien:!!document.getElementById('to-tim').offsetParent, fo:document.activeElement.id, bat:document.querySelector('#to-cay .pv-tim-nut').classList.contains('bat')}));
 ok('bấm 🔎 → ô gõ hiện, con trỏ trong ô, nút sáng', r.hien && r.fo==='to-tim' && r.bat, JSON.stringify(r));
 const t0 = await p.evaluate(()=>{ const K=KHO.kyDung(), m=Object.keys(K.to).find(k=>!toLaTT(K.to[k]) && K.to[k].ten); return {ma:m, ten:K.to[m].ten}; });
 await p.keyboard.type(t0.ten.toLowerCase()); await p.waitForTimeout(300);
 const gy = await p.evaluate(()=>document.querySelectorAll('#to-gy button').length);
 ok('gõ tên tổ → có gợi ý', gy>0, gy);
 await p.keyboard.press('Enter'); await p.waitForTimeout(500);
 r = await p.evaluate(()=>({to:toCH().to, q:TO_Q, mo:!!document.querySelector('#to-cay .loc-khoi.tim-mo'), an:!document.getElementById('to-tim').offsetParent}));
 ok('Enter chọn tổ → tổ được chọn, ô tìm tự đóng, chữ xóa', !!r.to && r.q==='' && !r.mo && r.an, JSON.stringify(r));
 await p.click('#to-cay .pv-tim-nut'); await p.keyboard.type('abc'); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
 r = await p.evaluate(()=>({q:TO_Q, v:document.getElementById('to-tim').value, an:!document.getElementById('to-tim').offsetParent}));
 ok('Esc → đóng ô tìm, xóa chữ', r.q==='' && r.v==='' && r.an, JSON.stringify(r));
 await p.evaluate(()=>{ slDoiTab('sk'); PV_Q.sk='x'; pvVeCay('sk'); }); await p.waitForTimeout(300);
 ok('đang có chữ tìm → vẽ lại vẫn mở ô', await p.evaluate(()=>!!document.getElementById('sk-tim').offsetParent && !!document.querySelector('#sk-cay .loc-khoi.tim-mo')));
 await p.evaluate(()=>pvTimMo('sk', 0));
 await p.evaluate(()=>slDoiTab('tra')); await p.waitForTimeout(700);
 r = await p.evaluate(()=>({nut:!!document.querySelector('#tc-cay .pv-tim-nut'), chip:!!document.querySelector('#tc-cay .pv-chip-o'), bao:!!document.querySelector('.tc-bao.pv-chip-o')}));
 ok('Tra cứu: không 🔎 tìm tổ, không chip trên dải; chip báo cạnh ô tìm khách', !r.nut && !r.chip && r.bao, JSON.stringify(r));
 // chip nguồn số liệu (kỳ theo ngày): giả bảng có Mẫu 31 đúng ngày, KHĐ lấy cuối tháng trước
 await p.evaluate(()=>slDoiTab('to')); await p.waitForTimeout(500);
 r = await p.evaluate(async()=>{ const B={ky:'2026-09-15', nguon:{hstd:'2026-09-15', khd:'2026-08'}}; kyGhiHTML(null); const ra=slNguonHTML(B); await new Promise(z=>setTimeout(z,50));
   const c=document.querySelector('#to-cay .pv-dau .pv-chip-o .sl-nguon-chip'); return {ra, chu:c ? c.textContent : '', tit:c ? c.title : '', cam:!!document.querySelector('.sl-nguon'), kt:slNguonHTML(B, true)}; });
 ok('kỳ theo ngày → chip "📅 Số liệu 15/09/2026 · ⚠ 1 file lấy ngày trước" trên dải tiêu đề, rê chuột thấy KHĐ lấy theo tháng trước; hết dòng cam', r.ra==='' && r.chu==='📅 Số liệu 15/09/2026 · ⚠ 1 file lấy ngày trước' && /KHĐ/.test(r.tit) && !r.cam, JSON.stringify(r));
 ok('KTGS giữ chip "⚠ Ngày 15/09" như cũ', /⚠ Ngày 15\/09/.test(r.kt), r.kt);
 await p.close();
 const d = await mo(390, 844, true);
 for(const t of ['to','sk','th','kt','tra']){ await d.evaluate(t=>slDoiTab(t), t); await d.waitForTimeout(800);
   const h = await d.evaluate(t=>{ const x=document.querySelector('#'+(t==='tra'?'tc':t)+'-cay .pv-hang1'); return x ? Math.round(x.getBoundingClientRect().height) : 0; }, t);
   ok('điện thoại '+t+': hàng lọc 1 dòng (≤ 42 px)', h>0 && h<=42, h); }
 await d.evaluate(()=>slDoiTab('sk')); await d.waitForTimeout(500); await d.click('#sk-cay .pv-tim-nut'); await d.waitForTimeout(200);
 r = await d.evaluate(()=>{ const i=document.getElementById('sk-tim').closest('.pv-tim').getBoundingClientRect(), s=document.querySelector('#sk-cay .pv-sel').getBoundingClientRect(); return {rong:Math.round(i.width), duoi:i.top>=s.bottom-1}; });
 ok('điện thoại: bấm 🔎 → ô tìm xuống hàng riêng, rộng', r.duoi && r.rong>250, JSON.stringify(r));
 await d.close();
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t312 đạt'); await b.close(); process.exit(sai?1:0);
})();
