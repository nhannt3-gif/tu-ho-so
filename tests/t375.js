// t375 (3.476, Đ4 kế hoạch dọn — tools/doi_onclick.py chuyển onclick → data-lenh): LƯỚI AN TOÀN — đi qua các tab / tab con chính, mọi nút / ô data-lenh đang hiện phải có lệnh đăng ký (GD.coLenh).
//   Bộ GIẢ tests/gianho31. Báo tên lệnh thiếu + tab.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const o = await p.evaluate(async(files)=>{ await xongTV; try{ dongHop(); }catch(e){} const o = [], w = t=>new Promise(r=>setTimeout(r, t)), ok = (t, d, c)=>o.push((d ? '✓ ' : '✗ ')+t+(c!==undefined && !d ? ' — '+c : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   const thieu = {}, dem = {n:0};
   const soat = ten => { document.querySelectorAll('[data-lenh]').forEach(e=>{ const k = e.getAttribute('data-lenh'); dem.n++; if(!GD.coLenh(k)) (thieu[k] = thieu[k] || new Set()).add(ten); }); };
   for(const i of [0, 1, 3, 4, 5, 6]){ try{ doiNgan(i); }catch(e){} await w(600); soat('ngăn '+i); }
   doiNgan(7); await w(500);
   for(const t of ['nap', 'th', 'sk', 'to', 'tra', 'kt', 'gdx', 'hst', 'hsv', 'pb']){ try{ slDoiTab(t); }catch(e){} await w(900); soat('Số liệu › '+t); }
   const ds = Object.keys(thieu).map(k=>k+' ('+[...thieu[k]].join(', ')+')');
   ok('mọi data-lenh đang hiện có lệnh đăng ký ('+dem.n+' phần tử, 16 tab)', !ds.length && dem.n>200, ds.slice(0, 12).join(' · '));
   return o; }, files);
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); const sai = o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t375 SAI '+sai : '✓ t375 đạt '+o.length); await b.close(); process.exit(sai ? 1 : 0); })();
