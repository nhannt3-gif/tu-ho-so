// 3.328 (anh chốt 23/10) — cây địa bàn dùng chung: mặc định kiểu ☰ Gọn mọi nơi (1 dòng ô sổ xuống Xã › Điểm › Hội › Tổ), đổi ▦ Chip;
//   mở lại app về Toàn PGD + kiểu gọn; 📌 Ghim (chung mọi tab) giữ địa bàn + kiểu khi mở lại. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const moTab = async(tab)=>p.evaluate(async(tab)=>{ const w=t=>new Promise(r=>setTimeout(r,t)); slDoiTab(tab); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#'+tab+'-cay .loc-khoi');i++) await w(200); await w(400); }, tab);
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); D.cauHinh.pvGhim = {to:true, kt:true}; D.cauHinh.pvGon = {to:false};   /* thiết lập cũ (3.227) — không còn tác dụng */
   const hien = el => !!el && el.offsetParent!==null && getComputedStyle(el).display!=='none';
   for(const tab of ['to','sk','th','hsv','gdx']){
     slDoiTab(tab); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#'+tab+'-cay .loc-khoi');i++) await w(200); await w(400);
     const k = document.querySelector('#'+tab+'-cay .loc-khoi');
     ok(tab+': mặc định kiểu gọn — ô chọn Xã hiện, chip ẩn, nút "▦ Chip"', !!k && k.classList.contains('gon') && hien(k.querySelector('select.pv-xa')) && !hien(k.querySelector('.pv-nhom.cap-xa')) && /Chip/.test((k.querySelector('.pv-gon')||{}).textContent||''));
   }
   slDoiTab('to'); doiNgan(7); await w(600);
   const t = Object.values(TO_K.to).find(t=>!t.trucTiep && t.ten && t.khoaDiem);
   pvChonTo('to', t.ma); await w(400); let k = document.querySelector('#to-cay .loc-khoi');
   ok('chọn tổ → vẫn kiểu gọn, các ô Xã › Điểm › Tổ có giá trị, chip tổ ẩn', k.classList.contains('gon') && document.getElementById('to-xa').value===t.xa && document.getElementById('to-to').value===t.ma && !hien(k.querySelector('.pv-hang2.cap-to')));
   ok('có ⬆ Lên 1 cấp + 📌', !!k.querySelector('.pv-len') && !!k.querySelector('.pv-ghim-nut'));
   pvLen('to'); await w(300); ok('⬆ Lên 1 cấp → bỏ tổ, giữ điểm, vẫn gọn', !PV_DUNG.to.S().to && !!PV_DUNG.to.S().diem && document.querySelector('#to-cay .loc-khoi').classList.contains('gon'));
   pvGonDoi('to'); await w(300); k = document.querySelector('#to-cay .loc-khoi');
   ok('bấm ▦ Chip → kiểu chip (chip hiện), nút "☰ Gọn"', !k.classList.contains('gon') && hien(k.querySelector('.pv-hang2')) && /Gọn/.test(k.querySelector('.pv-gon').textContent));
   ok('3.383.7: kiểu luôn nhớ cho lần mở sau (D.cauHinh.pvKieu)', D.cauHinh.pvKieu && D.cauHinh.pvKieu.to==='chip');
   ok('địa bàn dùng chung: tab Sao kê cùng xã / điểm', PV_DUNG.sk.S().xa===t.xa && PV_DUNG.sk.S().diem===t.khoaDiem);
   ok('3.383.7: địa bàn luôn nhớ (D.cauHinh.pvChung)', D.cauHinh.pvChung && D.cauHinh.pvChung.diem===t.khoaDiem);
   luuNgay(); return o; }, files);
 /* 3.383.7 (anh 27/10): mở lại app — chưa ghim ô nào → giữ địa bàn + kiểu phiên trước */
 await p.reload(); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} kyChungDoi('2026-08'); }); await moTab('to');
 R.push(...await p.evaluate(async()=>{ const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(ten,dk,chi)=>o.push((dk?'✓ ':'✗ ')+ten+(chi!==undefined?' — '+chi:''));
   const S = PV_DUNG.to.S(), t = Object.values(TO_K.to).find(t=>!t.trucTiep && t.ten && t.khoaDiem && t.khoaDiem===S.diem);
   ok('mở lại app (chưa ghim): giữ địa bàn phiên trước + kiểu chip', !!t && !!S.xa && !pvGonCua('to') && !document.querySelector('#to-cay .loc-khoi').classList.contains('gon'), S.xa+'|'+S.diem);
   pvChonTo('to', t.ma); await w(300); pvGhimODoi('to', 'xa'); await w(300);
   ok('📌 nhỏ cạnh ô Xã → ghim xã (sáng), nút 📌 Về ghim đã có', D.cauHinh.pvGhimO.xa===t.xa && !!document.querySelector('#to-cay .pv-gh.bat') && !document.querySelector('#to-cay .pv-ghim-nut').disabled);
   ok('ghim lưu theo khối Số liệu (đồng bộ)', chKhoiCua('pvGhimO')==='solieu' && chKhoiCua('pvKieu')==='solieu');
   const x2 = (Object.values(TO_K.to).find(z=>z.xa && z.xa!==t.xa && !z.trucTiep)||{}).xa;
   pvChon('to', 'hoi', String(t.dv)); await w(200); if(x2){ pvChon('to', 'xa', x2); await w(300); }
   ok('3.383.7 đổi Xã (cấp cao) → Điểm · Hội · Ấp · Tổ về Tất cả', !!x2 && S.xa===x2 && !S.diem && !S.hoi && !S.ap && !S.to, JSON.stringify({xa:S.xa, diem:S.diem, hoi:S.hoi, to:S.to}));
   luuNgay(); window.__t = t.ma; return o; }));
 await p.reload(); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} kyChungDoi('2026-08'); }); await moTab('to');
 R.push(...await p.evaluate(async()=>{ const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(ten,dk,chi)=>o.push((dk?'✓ ':'✗ ')+ten+(chi!==undefined?' — '+chi:''));
   const S = PV_DUNG.to.S(), g = D.cauHinh.pvGhimO.xa;
   ok('mở lại app: ô ghim (Xã) về giá trị ghim — ưu tiên cao nhất, phiên trước ở xã khác', S.xa===g && !S.diem && !S.to, S.xa+'|'+g);
   const t = Object.values(TO_K.to).find(z=>z.xa===g && !z.trucTiep && z.khoaDiem); pvChonTo('to', t.ma); await w(300);
   pvVeGhim('to'); await w(300);
   ok('📌 Về ghim: ô ghim → giá trị ghim, ô khác → Tất cả; nút sáng', S.xa===g && !S.diem && !S.hoi && !S.to && document.querySelector('#to-cay .pv-ghim-nut').classList.contains('bat'));
   pvGhimODoi('to', 'xa'); await w(300);
   ok('bấm lại 📌 nhỏ → bỏ ghim', !D.cauHinh.pvGhimO && !pvGhimCua() && document.querySelector('#to-cay .pv-ghim-nut').disabled);
   pvChonTo('to', t.ma); await w(300); luuNgay(); return o; }));
 await p.reload(); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} kyChungDoi('2026-08'); }); await moTab('to');
 R.push(...await p.evaluate(async()=>{ const o=[], ok=(ten,dk)=>o.push((dk?'✓ ':'✗ ')+ten);
   const S = PV_DUNG.to.S(); ok('mở lại sau bỏ ghim: giữ địa bàn phiên trước (đến tổ)', !!S.xa && !!S.to); if(!pvGonCua('to')) pvGonDoi('to'); return o; }));
 /* điện thoại */
 await p.setViewportSize({width:390, height:800}); await p.waitForTimeout(500); await moTab('to');
 R.push(...await p.evaluate(()=>{ const o=[], ok=(ten,dk)=>o.push((dk?'✓ ':'✗ ')+ten); const k = document.querySelector('#to-cay .loc-khoi');
   ok('điện thoại: gọn — ô chọn Xã hiện, không chip', k.classList.contains('gon') && document.getElementById('to-xa').offsetParent!==null && !document.querySelector('#to-cay .pv-hang2:not([style*="none"])')?.offsetParent); return o; }));
 await p.screenshot({path:path.join(__dirname,'t241.png')});
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t241 đạt'); await b.close(); process.exit(sai?1:0);
})();
