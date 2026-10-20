// 3.293 (bước 0) — tải ảnh từ Drive tối đa 2 cùng lúc · 🧹 dọn ảnh tải về · 🔎 Rà: file thả tay trên Drive → Nhận vào app
// (PDF + 2 ảnh cùng khách = 1 bản, tên chuẩn; chỉ có ảnh → app dựng PDF; PDF lạ → Chờ sắp xếp; ảnh lạ chỉ báo). Drive giả, dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const ctx = await b.newContext({viewport:{width:1366,height:850}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
 const p = await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google\.com\/js/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ';
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); }, files);
 const ten = id => (drive.F[id]||{}).name, cha = id => drive.duong(((drive.F[id]||{}).parents||[])[0]||'');
 const r = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t));
   const the = mau => new Promise(r=>{ const c=document.createElement('canvas'); c.width=856; c.height=540; const g=c.getContext('2d'); g.fillStyle=mau; g.fillRect(0,0,856,540); c.toBlob(r,'image/jpeg',0.92); });
   const DB = KHO.dsKhach(), ds = Object.keys(DB).filter(m=>DB[m].ten && /^0\d{11}$/.test(String(DB[m].cccd||''))), m1 = ds[0], m2 = ds[1];
   const idTM = await baoDamDuong('Tủ hồ sơ / CCCD');
   const dpdf = await PDFLib.PDFDocument.create(); dpdf.addPage([595, 842]); const bpdf = new Blob([await dpdf.save()], {type:'application/pdf'});
   /* thả tay: khách 1 có PDF + 2 ảnh; khách 2 chỉ có 2 ảnh (theo số CCCD); 1 PDF lạ; 1 ảnh lạ */
   await sxTaiLen(bpdf, m1+' - '+DB[m1].ten+' - CCCD.pdf', idTM, 'application/pdf');
   await sxTaiLen(await the('#c33'), m1+' - '+DB[m1].ten+' - Mặt trước.jpg', idTM);
   await sxTaiLen(await the('#36c'), m1+' - '+DB[m1].ten+' - Mặt sau.jpg', idTM);
   await sxTaiLen(await the('#c33'), DB[m2].cccd+' mat truoc.jpg', idTM);
   await sxTaiLen(await the('#36c'), DB[m2].cccd+' mat sau.jpg', idTM);
   await sxTaiLen(bpdf, 'scan la.pdf', idTM, 'application/pdf');
   await sxTaiLen(await the('#999'), 'IMG_0001.jpg', idTM);
   const dr = await rsDrive(); RS = rsLap([], {}, [], dr, false);
   const nh = dr.nhan, g1 = nh.find(g=>g.ma===m1), g2 = nh.find(g=>g.ma===m2), gla = nh.find(g=>!g.ma && g.pdf), ganh = nh.find(g=>!g.nhan);
   rsVe(); await w(200); const html = document.getElementById('hop-in').textContent, soNut = document.querySelectorAll('#hop-in [data-lenh="rs.nhan"]').length;
   nh.forEach((g, i)=>{ if(g.nhan) RS.nhan[i] = true; }); const n0 = D.scan.length;
   henDongBoScan = function(){ dongBoScan(true); };
   rsApDung(); for(let i=0;i<60;i++){ await w(250); if(D.scan.slice(n0).every(k=>k.driveId && !k.canDay)) break; } await w(500);
   const moi = D.scan.slice(n0).map(k=>JSON.parse(JSON.stringify(k)));
   return {m1, m2, ten1:DB[m1].ten, ten2:DB[m2].ten, nhom:{g1:!!(g1 && g1.pdf && g1.truoc && g1.sau), g2:!!(g2 && !g2.pdf && g2.truoc && g2.sau), gla:!!gla, ganh:!!ganh}, html:/Nhận vào app/.test(html), soNut, moi}; });
 ok('Rà Drive: nhóm file thả tay theo khách — PDF + 2 ảnh = 1 nhóm; khách chỉ có 2 ảnh = 1 nhóm; PDF lạ riêng; ảnh lạ chỉ báo', r.nhom.g1 && r.nhom.g2 && r.nhom.gla && r.nhom.ganh && r.html && r.soNut===3, JSON.stringify(r.nhom)+' nút '+r.soNut);
 const k1 = r.moi.find(k=>k.maKH===r.m1), k2 = r.moi.find(k=>k.maKH===r.m2), kla = r.moi.find(k=>!k.maKH);
 ok('Nhận vào app: khách 1 → 1 bản, PDF + 2 ảnh tên chuẩn, đúng thư mục CCCD', k1 && ten(k1.driveId)===r.m1+' - '+r.ten1+' - CCCD.pdf' && ten(k1.anhDrive.truoc.id)===r.m1+' - '+r.ten1+' - Mặt trước.jpg' && ten(k1.anhDrive.sau.id)===r.m1+' - '+r.ten1+' - Mặt sau.jpg' && cha(k1.driveId)==='Tủ hồ sơ/CCCD', k1 && [ten(k1.driveId), ten(k1.anhDrive.truoc.id)].join(' | '));
 ok('khách chỉ có 2 ảnh → app dựng PDF từ 2 ảnh (tải về), tên chuẩn; ảnh đổi tên theo', k2 && k2.driveId && ten(k2.driveId)===r.m2+' - '+r.ten2+' - CCCD.pdf' && ten(k2.anhDrive.truoc.id)===r.m2+' - '+r.ten2+' - Mặt trước.jpg', k2 && JSON.stringify({pdf:ten(k2.driveId), a:ten(k2.anhDrive && k2.anhDrive.truoc.id)}));
 ok('PDF lạ → 1 bản ⏳ Chờ sắp xếp (dời về thư mục chờ)', kla && cha(kla.driveId)==='Tủ hồ sơ/Scan chờ sắp xếp', kla && cha(kla.driveId));
 /* ảnh tải về: tải tối đa 2 cùng lúc + dọn */
 const r2 = await p.evaluate(async(id)=>{ const w=t=>new Promise(r=>setTimeout(r,t)); const k = D.scan.find(x=>x.id===id);
   xoaFile('hs_'+k.id+'_matTruoc'); xoaFile('hs_'+k.id+'_matSau'); delete k.anhTai; await w(100);
   let max = 0; const goc = sxTaiVe1; sxTaiVe1 = function(x){ max = Math.max(max, SX_TAI_DANG); return new Promise(r=>setTimeout(r, 150)).then(()=>goc(x)); };
   const ids = ['a','b','c','d','e'].map(()=>k.anhDrive.truoc.id); await Promise.all(ids.map(x=>sxTaiVe(x))); sxTaiVe1 = goc;
   const b = await docAnhHS(k.id+'_matTruoc'), tai = !!k.anhTai, n = sxDsAnhTai().length;
   sxDonAnhTai(); const con = await SX_DOC_ANH_CU(k.id+'_matTruoc');
   const lai = await docAnhHS(k.id+'_matTruoc');
   return {max, b:!!b, tai, n, con:!!con, conCo:!!k.anhTai===false, lai:!!lai}; }, k2 && k2.id);
 ok('tải ảnh từ Drive: tối đa 2 file cùng lúc', r2.max<=2 && r2.max>=1, r2.max);
 ok('🧹 Dọn ảnh tải về: xóa bản trong máy (Drive giữ), xem lại thì tự tải lại', r2.b && r2.tai && r2.n>=1 && !r2.con && r2.lai, JSON.stringify(r2));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
