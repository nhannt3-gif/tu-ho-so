// t266 (TK 3, 3.367 — anh 25/10): ① "mã điểm giao dịch ghi đầy đủ có TXN" — tab Giao dịch xã, mẫu 12/GDX, bản mini lấy mã đủ TXN… từ danh mục địa bàn khi số liệu ghi mã ngắn;
//   ② "bản chính như máy tính, điện thoại là bản phụ cho gọn" — điện thoại mở index.html ở lại bản chính, nút 📱 sang dt.html, ?dt=1 mở bản gọn. Dữ liệu GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror', e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const r = await p.evaluate(()=>{ try{ dongHop(); }catch(e){} window.DB0 = JSON.parse(JSON.stringify(D.cauHinh.diaBan || []));
   D.cauHinh.diaBan = [{xa:'Xã Giả', ma:'90001', diem:[{ten:'Điểm Giả A', ma:'TXN0548302', ngay:'25', ap:[]}, {ten:'Điểm Giả B', ma:'TXN0543501', ngay:'12', ap:[]}]},
     {xa:'Xã Giả 2', ma:'90002', diem:[{ten:'Điểm Giả C', ma:'TXN0998302', ngay:'3', ap:[]}]}];
   return {ngan:gdxMaDu('8302', '90001'), xa2:gdxMaDu('8302', '90002'), du:gdxMaDu('TXN0543501'), la:gdxMaDu('7777'), rong:gdxMaDu('')}; });
 ok('mã ngắn 8302 → TXN0548302 (ưu tiên đúng xã); xã khác → mã của xã đó', r.ngan==='TXN0548302' && r.xa2==='TXN0998302', JSON.stringify(r));
 ok('mã đã đủ TXN giữ nguyên; không có trong danh mục → giữ nguyên (không tự ghép); trống → trống', r.du==='TXN0543501' && r.la==='7777' && r.rong==='');
 /* số liệu giả: mã điểm từ Mẫu 31 */
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const s = await p.evaluate(async(files)=>{ window.SL_KHONG_TU_KIEM = 1; let s0; D.cauHinh.diaBan = DB0;   /* danh mục địa bàn mặc định (có mã TXN đủ) */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); await KHO.nap(gxKyMoi()); const ds = await KHO.voiKy(await KHO.nap(gxKyMoi()), function(){ return gdxDsDiem(); });
   const K = await KHO.nap(gxKyMoi()), d = ds.find(x=>/^TXN\d{4,}/.test(x.maDiem)); if(!d) return {khong:1};
   const ngan = d.maDiem.slice(-4);   /* giả lập số liệu ghi mã ngắn (như 8302 anh gặp) */
   const ds2 = KHO.voiKy(K, function(){ KHO.maTo().forEach(m=>{ const t = KHO.to(m); if(t && t.diem===d.maDiem) t.diem = ngan; }); return gdxDsDiem(); }), d2 = ds2.find(x=>x.k===d.k);
   const goc = ngan; s0 = d.maDiem;
   const h = gdxHTML12({}, d2); return {goc:goc, du:s0, moi:d2 && d2.maDiem, k:!!d2, in12:new RegExp('Mã điểm giao dịch: <b>'+s0).test(h)}; }, files).catch(e=>({loi:e.message}));
 ok('Giao dịch xã: điểm lấy từ số liệu mã ngắn → hiện mã đủ TXN, khóa điểm giữ nguyên (điểm đã chọn vẫn nhớ), mẫu 12/GDX in mã đủ', !s.khong && s.moi===s.du && s.goc.length===4 && s.k && s.in12, JSON.stringify(s));
 await p.close();
 /* điện thoại */
 const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2});
 const d = await ctx.newPage(); d.on('pageerror', e=>loi.push(e.message)); await d.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(d);
 await d.goto('file://'+G+'/index.html'); await d.waitForTimeout(2500);
 ok('điện thoại mở index.html → ở lại bản chính (không tự chuyển dt.html), có nút 📱 bản gọn', /index\.html$/.test(d.url()) && !!(await d.$('#ve-dt')), d.url().split('/').pop());
 await d.evaluate(()=>{ try{ localStorage.setItem('tuhoso_ban', 'may'); }catch(e){} }); await d.reload(); await d.waitForTimeout(2000);
 ok('máy còn cờ cũ (tuhoso_ban = may) vẫn mở bản chính bình thường, có 📱', /index\.html$/.test(d.url()) && !!(await d.$('#ve-dt')));
 await d.click('#ve-dt'); await d.waitForTimeout(2500);
 ok('bấm 📱 → dt.html; 🖥 ở dt.html về bản chính', /dt\.html$/.test(d.url()) && !!(await d.$('.navbar-current .dt-may')));
 await d.click('.navbar-current .dt-may'); await d.waitForTimeout(2500);
 ok('🖥 → index.html, ở lại', /index\.html$/.test(d.url()));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
