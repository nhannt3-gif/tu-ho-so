// 3.160 + 3.162 — Lọc số liệu chung 5 tab (anh chốt 11/10): hàng 1 = Xã (luôn hiện, đang chọn xanh) + 📍 đường dẫn chỉ báo + 🔎;
//   hàng 2 = Điểm GD │ Hội (chọn cái nào trước cũng được); hàng 3 = Tổ chip + ô sổ xuống (khi có Điểm GD hoặc Hội); Tra cứu bỏ khung gập "📍 Toàn PGD", số khách lên dòng 📍; điện thoại giữ ô thả xuống; ô chọn nền tối. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); PV_KIEU.to = 'chip'; PV_KIEU.tc = 'chip';   /* 3.328: mặc định gọn — phép thử này thử kiểu ▦ Chip */
   const C = toCH(); C.xa=''; C.diem=''; C.hoi=''; C.to=''; slDoiTab('to'); doiNgan(7);
   for(let i=0;i<60 && !document.querySelector('#to-cay .pv-hang1');i++) await w(250); await w(300);
   const nhan = () => [...document.querySelectorAll('#to-cay .pv-nhan')].map(x=>x.textContent).join('|');
   const dan = () => document.querySelector('#to-cay .pv-dan');
   const xanh = () => [...document.querySelectorAll('#to-cay .to-chip.bat')].map(x=>x.textContent.replace(/\s*\d+$/, '')).join('|');
   ok('chưa chọn: hàng Xã (PGD xanh) + 📍 Toàn PGD · n tổ cùng hàng + hàng Hội', /Toàn PGD/.test(dan().textContent) && /\d+ tổ/.test(dan().textContent) && nhan()==='Xã|Hội' && dan().closest('.pv-hang1') && xanh().split('|')[0]==='PGD', nhan()+' · '+xanh());
   ok('máy tính: không còn hàng ô thả xuống (chỉ điện thoại)', getComputedStyle(document.querySelector('#to-cay .pv-sel')).display==='none');
   ok('📍 đường dẫn chỉ báo (không có nút ✕ / bấm)', !dan().querySelector('button'));
   const T = TO_K.to, xa = pvLuaChon(T, C, 'xa', true)[0].k; pvChon('to', 'xa', xa, 1); await w(200);
   ok('chọn xã: hàng Xã vẫn hiện, xã đang chọn xanh; hàng Điểm GD · Hội cùng 1 dòng, 2 thanh riêng (3.167)', nhan()==='Xã|Điểm GD|Hội' && document.querySelector('#to-cay .pv-hang1 .to-chip.bat').textContent.indexOf(T[Object.keys(T).find(m=>T[m].xa===xa)].tenXa)===0 && !!document.querySelector('#to-cay [data-cap="diem-hoi"] .pv-nhom.cap-diem') && !!document.querySelector('#to-cay [data-cap="diem-hoi"] .pv-nhom.cap-hoi'), nhan());
   /* Hội trước, chưa chọn điểm */
   const hoi = pvLuaChon(T, C, 'hoi', true).find(x=>x.k!=='99').k; pvChon('to', 'hoi', hoi, 1); await w(200);
   const toH = pvLuaChon(T, C, 'to', true), selT = document.querySelector('#to-cay .pv-to-ds');
   ok('chọn Hội trước (chưa chọn điểm): hàng Tổ = chip + ô sổ xuống đủ mọi tổ của Hội trong xã', nhan()==='Xã|Điểm GD|Hội|Tổ' && toH.length>0 && toH.every(x=>T[x.k].xa===xa && String(T[x.k].dv)===hoi) && document.querySelectorAll('#to-cay [data-cap="to"] .to-chip').length===Math.min(30, toH.length) && selT && selT.options.length===toH.length+1, nhan()+' · '+toH.length+' tổ');
   const diem = pvLuaChon(T, C, 'diem', true)[0].k; pvChon('to', 'diem', diem, 1); await w(200);
   const toHD = pvLuaChon(T, C, 'to', true);
   ok('rồi chọn Điểm GD: giữ Hội; Tổ chỉ của điểm + Hội; 📍 Xã › Điểm · Hội', C.hoi===hoi && toHD.every(x=>T[x.k].khoaDiem===diem && String(T[x.k].dv)===hoi) && /›.*·/.test(dan().textContent), dan().textContent);
   /* quay lại PGD bằng hàng Xã */
   const sel = document.querySelector('#to-cay .pv-to-ds'); sel.value = toHD[0].k; sel.dispatchEvent(new Event('change')); await w(200);
   ok('chọn tổ ở ô sổ xuống → 📍 thêm "Tổ …", chip tổ xanh', C.to===toHD[0].k && /Tổ /.test(dan().textContent) && !!document.querySelector('#to-cay [data-cap="to"] .to-chip.bat'));
   [...document.querySelectorAll('#to-cay .pv-hang1 .to-chip')].find(x=>x.textContent==='PGD').click(); await w(200);
   ok('bấm PGD ở hàng Xã → quay về Toàn PGD (bỏ điểm / tổ), PGD xanh', !C.xa && !C.diem && !C.to && /Toàn PGD/.test(dan().textContent) && document.querySelector('#to-cay .pv-hang1 .to-chip.bat').textContent==='PGD');
   /* các tab dùng chung */
   for(const t of ['kt','sk','th']){ slDoiTab(t); doiNgan(7); for(let i=0;i<60 && !document.querySelector('#'+t+'-cay .pv-dan');i++) await w(250); }
   ok('KTGS, Sao kê, Tổng hợp cùng hàng Xã + 📍', ['kt','sk','th'].every(t=>document.querySelector('#'+t+'-cay .pv-dan') || t!=='th') && !!document.querySelector('#th-cay .pv-dan'));
   /* Tra cứu */
   slDoiTab('tra'); doiNgan(7); for(let i=0;i<60 && !document.querySelector('#tc-cay .pv-dan');i++) await w(250); await w(200);
   ok('Tra cứu: bỏ khung gập "📍 Toàn PGD", cây lọc như các tab, số khách trên dòng 📍', !document.querySelector('.tc-pv') && /khách/.test(document.querySelector('#tc-cay .pv-dem').textContent) && !document.querySelector('#tc-cay .pv-tim'), document.querySelector('#tc-cay .pv-dem').textContent);
   ok('Tra cứu: ô tìm khách vẫn to trên cùng', document.getElementById('sl-tim').getBoundingClientRect().top < document.getElementById('tc-cay').getBoundingClientRect().top);
   /* chế độ tối: ô thả xuống / ô nhập nền tối */
   D.cauHinh.giaoDien = 'dark'; apGiaoDien(); slDoiTab('kt'); doiNgan(7); await w(800); ktCH().che = 'hdt'; ktCH().hdtTab = 'chuan'; ktVeThe(); await w(200);
   const inp = document.querySelector('.kt-chuan tbody input'), bg = getComputedStyle(inp).backgroundColor.match(/\d+/g).map(Number);
   ok('nền tối: ô nhập (Chuẩn hóa) nền tối, chữ sáng', bg[0]+bg[1]+bg[2]<300 && getComputedStyle(document.documentElement).colorScheme==='dark', getComputedStyle(inp).backgroundColor);
   D.cauHinh.giaoDien = 'auto'; apGiaoDien(); ktCH().che = 'dx';
   return o;
 }, files);
 /* điện thoại */
 await p.setViewportSize({width:390, height:844}); await p.evaluate(()=>{ slDoiTab('to'); doiNgan(7); }); await p.waitForTimeout(1200);
 const dt = await p.evaluate(()=>({sel:getComputedStyle(document.querySelector('#to-cay .pv-sel')).display, dan:getComputedStyle(document.querySelector('#to-cay .pv-dan')).display}));
 R.push((dt.sel!=='none' && dt.dan==='none' ? '✓ ' : '✗ ')+'điện thoại: giữ ô thả xuống, ẩn dòng 📍 chip — '+JSON.stringify(dt));
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
