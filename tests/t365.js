// 3.457 (anh 02/11 "làm luôn" — 10B, 10C như 10A 3.456): "…/… tổ viên dự họp" = số tham dự (tổ viên trước họp × tỷ lệ, > 50%, mặc định 100%) / số tổ viên;
//   biểu quyết "tán thành / tham dự" (> 2/3); − / + tỷ lệ ở Chọn nhanh, nhớ riêng từng mẫu. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300); pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const tx = () => HSO.x.h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'), L = hsoLuu(); delete L.tlHop;
   for(const mk of ['10b', '10c']){
     hsoChonMau(mk); await w(700); const n = +String(OM_MAU[mk].V(KHO.to(hsoCH().to)).du || '0/0').split('/')[1];
     const duRe = y => new RegExp('- '+y+'/'+n+' tổ viên'), bqRe = (x, y) => new RegExp(x+'/'+y+' tổ viên của Tổ tham dự họp biểu quyết');
     ok(mk+': mặc định 100% — "'+n+'/'+n+' tổ viên" dự họp, biểu quyết '+n+'/'+n, n>0 && duRe(n).test(tx()) && bqRe(n, n).test(tx()), n+' tổ viên');
     ok(mk+': Chọn nhanh có − / + tỷ lệ tham dự và tán thành', ['du', 'bq'].every(k=>omNhanh(mk).indexOf(k)>=0) && !!document.querySelector('#hso-tuy [data-lenh="hstl.cong"][data-mk="'+mk+'"][data-k="du"]') && !!document.querySelector('#hso-tuy [data-lenh="hstl.cong"][data-mk="'+mk+'"][data-k="bq"]'));
     const ip = document.querySelector('#hso-tuy input[data-lenh="hstl.go"][data-mk="'+mk+'"][data-k="du"]'); ip.value = '30'; ip.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
     const y = Math.max(Math.floor(n/2)+1, Math.ceil(n*0.51-1e-9));
     ok(mk+': gõ 30% → đặt 51%, số tham dự > 1/2, biểu quyết theo số tham dự', HST.tl(mk, 'du')===51 && duRe(y).test(tx()) && bqRe(y, y).test(tx()) && y>n/2, y+'/'+n);
     const ib = document.querySelector('#hso-tuy input[data-lenh="hstl.go"][data-mk="'+mk+'"][data-k="bq"]'); ib.value = '50'; ib.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
     const x = Math.max(Math.floor(y*2/3)+1, Math.ceil(y*0.67-1e-9));
     ok(mk+': tán thành gõ 50% → đặt 67%, > 2/3 số tham dự', HST.tl(mk, 'bq')===67 && bqRe(x, y).test(tx()) && x>y*2/3, x+'/'+y);
     omDatCach(mk, 'du', 'cham'); hsoVe(); await w(300);
     ok(mk+': số dự họp để chấm → biểu quyết cũng để chấm', !/\d+\/\d+ tổ viên của Tổ tham dự/.test(tx()) && !duRe('\\d+').test(tx()));
     omDatCach(mk, 'du', 'tu'); hsoVe(); await w(200);
   }
   ok('tỷ lệ nhớ riêng từng mẫu, 10A không bị đổi', L.tlHop['10b'].du===51 && L.tlHop['10c'].du===51 && !L.tl10a);
   delete L.tlHop; hsoChonMau('10b'); await w(500); hsoXem(); await w(2500); const nb = document.getElementById('hso-xem-khung').contentDocument.querySelectorAll('.tr-tg').length; try{ dongHop(); }catch(e){}
   hsoChonMau('10c'); await w(500); hsoXem(); await w(2500); const nc = document.getElementById('hso-xem-khung').contentDocument.querySelectorAll('.tr-tg').length;
   ok('10B, 10C vẫn 2 trang', nb===2 && nc===2, nb+' / '+nc);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t365 đạt'); await b.close(); process.exit(sai?1:0);
})();
