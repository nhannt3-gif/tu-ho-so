// 3.445 (anh 02/11 "t/h là tổ trưởng nhưng không nhận ấp") — bản CCCD đã gắn mã KH mà trống ấp → bổ sung ấp (chỉ điền ô trống):
//   tổ → File Tổ trưởng mọi kỳ → Mẫu 31 (khách / ấp đa số của tổ) → mã thôn; lúc lưu tự gọi; bản cũ: nút 🔧 Bổ sung ấp ở tab Scan. Dữ liệu GIẢ.
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
   kyChungDoi('2026-08'); const K = await KHO.nap('2026-08'); toGanNeuTrong(K);
   const t = KHO.dsTo()[0], dk = KHO.dsKhach(), kh0 = Object.keys(dk).find(m=>dk[m].tenThon && dk[m].to && dk[m].to!==t.ma);
   /* ① có mã tổ → ấp của tổ */
   let k = {maKH:'9990000001', maTo:t.ma, ap:''}; ok('① có mã tổ → ấp của tổ', await ttApBu(k) && k.ap===t.tenThon && /tổ/.test(k.apTu), k.ap+' · '+k.apTu);
   /* ② không mã tổ, mã KH là khách Mẫu 31 → ấp của khách */
   k = {maKH:kh0, ap:''}; ok('③ mã KH có trên Mẫu 31 → ấp của khách', await ttApBu(k) && k.ap===dk[kh0].tenThon, k.ap+' · '+k.apTu);
   /* ③ chỉ có mã thôn (Sao kê TK 104) → tên ấp */
   k = {maKH:'9990000002', maAp:String(t.thon), ap:''}; ok('④ chỉ có mã thôn (TK 104) → tên ấp theo tổ / danh mục', await ttApBu(k) && k.ap===t.tenThon && /mã thôn/.test(k.apTu), k.ap+' · '+k.apTu);
   /* ④ không có gì → để trống, không đoán */
   k = {maKH:'9990000003', ap:''}; ok('không tìm ra → để trống (không đoán)', !(await ttApBu(k)) && k.ap==='');
   /* ⑤ đã có ấp → không đụng */
   k = {maKH:kh0, ap:'Ấp Cũ Giả'}; ok('đã có ấp → giữ nguyên', !(await ttApBu(k)) && k.ap==='Ấp Cũ Giả');
   /* ⑥ nút 🔧 ở tab Scan + bổ sung hàng loạt */
   const goc = D.scan; D.scan = [{id:'g1', che:'the', ten:'A', maKH:'9990000001', maTo:t.ma, ap:''}, {id:'g2', che:'the', ten:'B', maKH:'9990000003', ap:''}, {id:'g3', che:'the', ten:'C', maKH:kh0, ap:'Ấp Có'}];
   doiNgan(4); await w(800); if(typeof HS!=='undefined') HS.mo = true; veScan(); await w(400);
   const nut = document.querySelector('#tr4 .sx-thanh [data-lenh="ttap.bu"]');
   ok('tab Scan: nút 🔧 Bổ sung ấp (2)', !!nut && /\(2\)/.test(nut.textContent), nut ? nut.textContent : 'không có nút');
   const hoiGoc = window.hoi; window.hoi = (a, b, c, f) => f(); ttApBuHet(); await w(800); window.hoi = hoiGoc;
   ok('bổ sung hàng loạt: bản tìm được ấp → điền, bản không ra → giữ trống, bản có ấp → không đổi', D.scan[0].ap===t.tenThon && D.scan[1].ap==='' && D.scan[2].ap==='Ấp Có', D.scan.map(x=>x.ap||'∅').join(' | '));
   D.scan = goc;
   return o; }, files);
 { const src = fs.readFileSync(path.join(__dirname,'..','js','41-scan-sap-xep.js'),'utf8'); R.push((/ttApBu\(k\)/.test(src) && /k\.maTo = String\(c\.maTo\)/.test(src) ? '✓ ' : '✗ ')+'lúc lưu (scanLuuTu) gọi bổ sung ấp + giữ mã tổ'); }
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t359 đạt'); await b.close(); process.exit(sai?1:0);
})();
