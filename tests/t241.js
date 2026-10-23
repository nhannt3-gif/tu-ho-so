// 3.326 (anh chốt 23/10) — cây địa bàn dùng chung: mặc định kiểu ☰ Gọn mọi nơi (1 dòng ô sổ xuống Xã › Điểm › Hội › Tổ), đổi ▦ Chip;
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
   ok('chưa ghim: kiểu chỉ nhớ trong phiên, không ghi vào cài đặt', !D.cauHinh.pvKieu && !D.cauHinh.pvGhimBat);
   ok('địa bàn dùng chung: tab Sao kê cùng xã / điểm', PV_DUNG.sk.S().xa===t.xa && PV_DUNG.sk.S().diem===t.khoaDiem);
   ok('chưa ghim: địa bàn không ghi vào cài đặt', !(D.cauHinh.pvChung && D.cauHinh.pvChung.xa));
   luuNgay(); return o; }, files);
 /* mở lại app — chưa ghim → về Toàn PGD, kiểu gọn */
 await p.reload(); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} kyChungDoi('2026-08'); }); await moTab('to');
 R.push(...await p.evaluate(async()=>{ const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(ten,dk,chi)=>o.push((dk?'✓ ':'✗ ')+ten+(chi!==undefined?' — '+chi:''));
   const S = PV_DUNG.to.S(); ok('mở lại app (chưa ghim): về Toàn PGD + kiểu gọn', !S.xa && !S.diem && !S.to && pvGonCua('to') && document.querySelector('#to-cay .loc-khoi').classList.contains('gon'));
   const t = Object.values(TO_K.to).find(t=>!t.trucTiep && t.ten && t.khoaDiem); pvChonTo('to', t.ma); await w(300); pvGonDoi('to'); await w(300);
   pvGhimDoi('to'); await w(300);
   ok('📌 ghim → lưu địa bàn + kiểu đang chọn', D.cauHinh.pvGhimBat===true && D.cauHinh.pvChung.to===t.ma && D.cauHinh.pvKieu.to==='chip' && /Đã ghim/.test(document.querySelector('#to-cay .pv-ghim-nut').textContent));
   ok('ghim chung mọi tab', pvGhimCua('sk') && pvGhimCua('gdx'));
   ok('cài đặt ghim / kiểu đồng bộ theo khối Số liệu', chKhoiCua('pvGhimBat')==='solieu' && chKhoiCua('pvKieu')==='solieu');
   luuNgay(); window.__t = t.ma; return o; }));
 await p.reload(); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} kyChungDoi('2026-08'); }); await moTab('to');
 R.push(...await p.evaluate(async()=>{ const o=[], w=t=>new Promise(r=>setTimeout(r,t)), ok=(ten,dk,chi)=>o.push((dk?'✓ ':'✗ ')+ten+(chi!==undefined?' — '+chi:''));
   const S = PV_DUNG.to.S(), k = document.querySelector('#to-cay .loc-khoi');
   ok('mở lại app (đã ghim): giữ tổ + kiểu chip', !!S.to && S.to===D.cauHinh.pvChung.to && !k.classList.contains('gon') && !pvGonCua('to'));
   ok('tab khác vẫn kiểu gọn mặc định', pvGonCua('sk'));
   pvGhimDoi('to'); await w(300);
   ok('bỏ ghim: địa bàn + kiểu đang dùng giữ trong phiên', PV_DUNG.to.S().to===S.to && !pvGonCua('to') && !D.cauHinh.pvGhimBat);
   luuNgay(); return o; }));
 await p.reload(); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} kyChungDoi('2026-08'); }); await moTab('to');
 R.push(...await p.evaluate(async()=>{ const o=[], ok=(ten,dk)=>o.push((dk?'✓ ':'✗ ')+ten);
   const S = PV_DUNG.to.S(); ok('mở lại sau bỏ ghim: về Toàn PGD + gọn', !S.xa && !S.to && pvGonCua('to')); return o; }));
 /* điện thoại */
 await p.setViewportSize({width:390, height:800}); await p.waitForTimeout(500); await moTab('to');
 R.push(...await p.evaluate(()=>{ const o=[], ok=(ten,dk)=>o.push((dk?'✓ ':'✗ ')+ten); const k = document.querySelector('#to-cay .loc-khoi');
   ok('điện thoại: gọn — ô chọn Xã hiện, không chip', k.classList.contains('gon') && document.getElementById('to-xa').offsetParent!==null && !document.querySelector('#to-cay .pv-hang2:not([style*="none"])')?.offsetParent); return o; }));
 await p.screenshot({path:path.join(__dirname,'t241.png')});
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t241 đạt'); await b.close(); process.exit(sai?1:0);
})();
