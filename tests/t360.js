// 3.448 (anh 02/11 ảnh cây lọc: kỳ T10 cả 5 xã hiện "Vay trực tiếp") — tên xã của tổ: Mẫu 31 → File Tổ trưởng (TENXA theo mã tổ) → danh bạ khách → danh mục;
//   không bao giờ để tên dạng "… trực tiếp", không ra tên → "Mã xã …". Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); const K = await KHO.nap('2026-08');
   const T = K.to, ma = Object.keys(T).filter(m=>!T[m].trucTiep), t0 = T[ma[0]], xa0 = t0.xa, goc = t0.tenXa;
   const laTT = s => /tr[ựu]c ti[ếe]p/i.test(String(s||''));
   /* giả lập file T10: cột Tên xã của Mẫu 31 ghi "Vay trực tiếp" cho mọi dòng xã này */
   const hsGoc = K.hs.map(x=>x.tenXa); K.hs.forEach(x=>{ if(x.xa===xa0) x.tenXa = 'Vay trực tiếp'; }); ma.forEach(m=>{ if(T[m].xa===xa0) T[m].tenXa = 'Vay trực tiếp'; });
   toTenXa(K); ok('① Mẫu 31 hỏng → lấy lại tên xã từ danh bạ khách', ma.filter(m=>T[m].xa===xa0).every(m=>T[m].tenXa===goc), goc+' / '+t0.tenXa);
   /* ② File Tổ trưởng (TENXA) được ưu tiên hơn danh bạ */
   ma.forEach(m=>{ if(T[m].xa===xa0) T[m].tenXa = 'Vay trực tiếp'; }); const dsGoc = K.dsDung; K.dsDung = ma.filter(m=>T[m].xa===xa0).map(m=>({to:m, tenXa:'Phường Giả Theo File Tổ Trưởng'}));
   toTenXa(K); ok('② có File Tổ trưởng → tên xã theo cột TENXA', t0.tenXa==='Phường Giả Theo File Tổ Trưởng', t0.tenXa);
   /* ③ không nguồn nào có tên thật → "Mã xã …", không để "Vay trực tiếp" */
   const db = SL_DB.kh; SL_DB.kh = {}; const dm = D.cauHinh.diaBan; D.cauHinh.diaBan = []; K.dsDung = [];
   ma.forEach(m=>{ if(T[m].xa===xa0) T[m].tenXa = 'Vay trực tiếp'; }); toTenXa(K);
   ok('③ không ra tên → "Mã xã …" (không hiện "Vay trực tiếp")', t0.tenXa==='Mã xã '+xa0 && !Object.keys(T).some(m=>laTT(T[m].tenXa)), t0.tenXa);
   SL_DB.kh = db; D.cauHinh.diaBan = dm; K.dsDung = dsGoc; K.hs.forEach((x, i)=>{ x.tenXa = hsGoc[i]; }); toTenXa(K);
   ok('trả lại số liệu → tên xã như cũ', t0.tenXa===goc, t0.tenXa);
   /* cây lọc: chip xã không có "trực tiếp" */
   const ch = pvLuaChon(T, {}, 'xa', true); ok('cây lọc: chip xã không còn "Vay trực tiếp"', ch.length>0 && !ch.some(x=>laTT(x.chu)), ch.map(x=>x.chu).join(' | '));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t360 đạt'); await b.close(); process.exit(sai?1:0);
})();
