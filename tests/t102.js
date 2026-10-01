// 3.88 — tab Số liệu: luồng theo tháng (file của tháng, ② Kiểm tra lưu kết quả, dữ liệu đổi → báo kiểm lại, bảng nhiều tháng thu gọn)
//        tab 👥 Tổ TK&VV: cây xã → điểm GD → hội → tổ (phím chung + chip), gõ tên tổ, 3 báo cáo (Danh sách hộ vay · Nợ cần xử lý · TK 105) → Xem → In / Excel
// Bộ GIẢ: tests/gia31 (taogia.py 25000 tests/gia31 m31)
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 for(const [ten,vp] of [['may',{width:1366,height:900}],['dt',{width:390,height:844}]]){
 const p=await b.newPage({viewport:vp}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const r = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o={}, w=t=>new Promise(r=>setTimeout(r,t));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], f.n))); }
   doiNgan(7); SL_KY='2026-08'; veSoLieu(); await w(400);
   o.buoc = Array.from(document.querySelectorAll('.sl-buoc span')).map(x=>x.textContent).join(' | ');
   o.file = document.querySelectorAll('.sl-ft-dong.co').length+' có · '+document.querySelectorAll('.sl-ft-dong.thieu').length+' thiếu';
   o.chuaKiem = /Chưa kiểm/.test(document.getElementById('sl-kt').textContent);
   await slKiemTra('2026-08'); await w(300);
   const k = SLM.kt['2026-08']; o.kiem = k.dem; o.muc = k.kq.map(x=>x.nhom+'.'+x.kq+' '+x.ten);
   o.giuKetQua = 'mở lại không chạy lại: '+(document.querySelector('.sl-kt-dau').textContent.indexOf('Đã kiểm')>=0);
   // thay 1 file → kết quả cũ, báo kiểm lại
   SLM.bang['nk|2026-08'].luc = new Date(Date.now()+1000).toISOString(); veSoLieu(); await w(200);
   o.cu = slKTCu('2026-08')+' · '+!!document.querySelector('#sl-kt .sl-bao.vang');
   // thu gọn bảng nhiều tháng
   const d = document.querySelector('details.sl-tq'); d.open = false; d.dispatchEvent(new Event('toggle')); await w(50); o.tq = 'thu gọn nhớ: '+(D.cauHinh.slTQ===false);
   // tab Tổ
   doiNgan(8); for(let i=0;i<60 && !document.getElementById('to-cay');i++) await w(250);
   o.ky = toDsKy().map(x=>x.chu).join(' / '); o.soTo = Object.keys(TO_K.to).length;
   // phím: Enter ở ô Xã trống → báo, đứng lại; chọn xã bằng ↓ rồi Enter → sang ô Điểm GD
   const xa = document.getElementById('to-xa'); xa.focus();
   xa.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await w(50); o.phimTrong = document.activeElement.id;
   xa.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true})); await w(100);
   const xa2 = document.getElementById('to-xa'); xa2.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await w(100);
   o.phim = 'xã='+toCH().xa+' → ô đang đứng: '+document.activeElement.id;
   o.chip = document.querySelectorAll('.to-chip').length;
   // gõ tên tổ
   const t0 = Object.keys(TO_K.to).map(k=>TO_K.to[k]).sort((a,b)=>(TO_K.kh[b.ma]||[]).length-(TO_K.kh[a.ma]||[]).length)[0];
   const tim = document.getElementById('to-tim'); tim.value = t0.ten.toLowerCase(); TO_Q = tim.value; toTim();
   o.tim = document.querySelectorAll('#to-gy button').length; document.querySelector('#to-gy button').click(); await w(100);
   o.chon = Array.from(document.querySelectorAll('#to-cay select')).map(s=>(s.options[s.selectedIndex]||{}).text).join(' › ');
   o.the = document.querySelector('.to-the').textContent.replace(/\s+/g,' ').slice(0,160);
   toCH().bc = {ds:true, no:true, tk:true}; toVeThe(); toXem();
   for(let i=0;i<60 && !document.getElementById('to-khung');i++) await w(250); await w(1000);
   const dd = document.getElementById('to-khung').contentDocument;
   o.bc = Array.from(dd.querySelectorAll('h1')).map(x=>x.textContent).join(' / ')+' · dòng '+Array.from(dd.querySelectorAll('.trang')).map(x=>x.querySelectorAll('tbody tr').length).join(',');
   o.khung = Array.from(dd.querySelectorAll('.bc-khung-ten')).map(x=>x.textContent.slice(0,60)).join(' / ');
   o.tk105 = Array.from(dd.querySelectorAll('.bc-kpi')).pop().textContent.replace(/\s+/g,' ');
   o.ct = /Giải quyết việc làm|Hộ nghèo|Nước sạch/.test(dd.body.textContent) ? 'tên CT ngắn ✓' : 'thiếu tên CT';
   o.excel = typeof toExcel; 
   return o; }, files);
 console.log('=== '+ten); for(const k in r) console.log(k.padEnd(10), typeof r[k]==='object' ? JSON.stringify(r[k]) : r[k]);
 await p.screenshot({path:__dirname+'/t102_'+ten+'_xem.png'});
 await p.evaluate(()=>dongHop()); await p.screenshot({path:__dirname+'/t102_'+ten+'_to.png', fullPage:true});
 await p.evaluate(()=>doiNgan(7)); await p.waitForTimeout(800); await p.screenshot({path:__dirname+'/t102_'+ten+'_sl.png', fullPage:true});
 await p.close(); }
 console.log('lỗi', loi); await b.close(); })();
