// 3.230 (R1 — KE_HOACH_CHUAN_HOA mục 4): ĐO BỐ CỤC — mỗi tab ở 4 cỡ màn hình: tràn ngang, nút / ô nhập bị giãn quá rộng. Dữ liệu GIẢ.
// Chạy: node tests/do_bo_cuc.js [thư mục ảnh] → in bảng Markdown (dán vào docs/KIEM_KE_GIAO_DIEN.md); có thư mục → chụp ảnh từng trang (không đưa vào repo).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), ANH = process.argv[2] || '';
const RONG = [1440, 1024, 768, 390];
const TRANG = [['Hôm nay', 'doiNgan(0)'], ['Văn bản', 'doiNgan(1)'], ['Mẫu biểu', 'doiNgan(3)'], ['Scan', 'doiNgan(4)'], ['Thư viện', 'doiNgan(5)'], ['Lịch', 'doiNgan(6)'],
  ['Nạp & KT', "slDoiTab('nap');doiNgan(7)"], ['Tra cứu', "slDoiTab('tra');doiNgan(7)"], ['Tổ TK&VV', "slDoiTab('to');doiNgan(7)"], ['Sao kê', "slDoiTab('sk');doiNgan(7)"],
  ['Tổng hợp', "slDoiTab('th');doiNgan(7)"], ['KTGS', "slDoiTab('kt');doiNgan(7)"], ['Hồ sơ Tổ', "slDoiTab('hst');doiNgan(7)"], ['Hồ sơ vay · 01/TD', "slDoiTab('hsv');doiNgan(7);hsoChonMau('01td')"],
  ['Sổ hộ vay (không khung xem)', "slDoiTab('hsv');doiNgan(7);hsoChonMau('sohv')"], ['Giao dịch xã', "slDoiTab('gdx');doiNgan(7)"], ['⚙ Khai báo đơn vị (hộp)', "slDoiTab('hst');doiNgan(7);hsoKBHop('pgd')"]];
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); }, files);
 const kq = [];
 for(const [ten, js] of TRANG) for(const w of RONG){
   await p.setViewportSize({width:w, height:w<500 ? 820 : 900}); await p.evaluate(js=>{ try{dongHop()}catch(e){} try{ eval(js); }catch(e){} }, js); await p.waitForTimeout(1300);
   const r = await p.evaluate(()=>{ const W = innerWidth, vis = e=>{ const s = getComputedStyle(e), r = e.getBoundingClientRect(); return s.display!=='none' && s.visibility!=='hidden' && r.width>0 && r.height>0; };
     const tran = document.documentElement.scrollWidth > W+1;
     const nut = [...document.querySelectorAll('button')].filter(vis).filter(e=>e.getBoundingClientRect().width > (W<500 ? W*0.92 : 360));
     const o = [...document.querySelectorAll('input:not([type=checkbox]):not([type=radio]),select,textarea')].filter(vis).filter(e=>e.getBoundingClientRect().width > (W<500 ? W*0.95 : 520));
     const ra = [...document.querySelectorAll('button,input,select')].filter(vis).filter(e=>e.getBoundingClientRect().right > W+2 && !e.closest('[style*="overflow"],.to-cuon-khung,.hm-so-khung,table'));
     const v = e=>(e.textContent||e.placeholder||e.name||e.tagName).trim().replace(/\s+/g,' ').slice(0, 28);
     return {tran, nut:nut.length, nutVD:nut.slice(0,2).map(v), o:o.length, oVD:o.slice(0,2).map(v), ra:ra.length, raVD:ra.slice(0,2).map(v)}; });
   if(ANH){ fs.mkdirSync(ANH, {recursive:true}); await p.screenshot({path:path.join(ANH, ten.replace(/[^\wÀ-ỹ]+/g,'_')+'_'+w+'.png')}); }
   kq.push(Object.assign({ten, w}, r)); }
 console.log('| Trang | Cỡ | Tràn ngang | Nút giãn | Ô giãn | Lòi ra ngoài | Ví dụ |\n|---|---|---|---|---|---|---|');
 kq.forEach(x=>{ const vd = [].concat(x.nutVD, x.oVD, x.raVD).filter(Boolean).slice(0, 3).join(' · ');
   console.log('| '+x.ten+' | '+x.w+' | '+(x.tran ? '⚠ có' : '—')+' | '+(x.nut || '—')+' | '+(x.o || '—')+' | '+(x.ra || '—')+' | '+vd.replace(/\|/g, '/')+' |'); });
 if(loi.length) console.log('\nLỗi trang: '+loi.slice(0, 3).join(' | '));
 await b.close(); })();
