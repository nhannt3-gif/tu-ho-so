// 3.280 — CCCD cũ chỉ có PDF (không ảnh trong máy, không ảnh trên Drive): mở xem → tự tách 2 mặt thẻ, hiện 2 mặt; dò không ra → ghi catHong, xem PDF;
// 🔎 Rà gồm cả bản cũ đã đọc ở bản trước nhưng chưa tách; tài liệu cùng loại 1 khách (đánh số 1, 2, 3) không báo trùng — chỉ báo khi giống hệt. Drive giả, ảnh thẻ GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'); const drive=require('./fakedrive.js')();
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async()=>{ const ctx = await b.newContext({viewport:{width:1366,height:850}}); await ctx.route(/googleapis\.com\/(upload\/)?drive/, drive.xuLy);
   const p = await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google\.com\/js/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.coTheNoiDrive=()=>true; DR.sanSang=true; DR.online=true; DR.token='x'; DR.hetHan=Date.now()+36e5; D.cauHinh.thumuc='Tủ hồ sơ';
     for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
     await slNap(); }, files);
   return p; };
 const A = await mo();
 const rA = await A.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t));
   const the = mau => new Promise(r=>{ const c=document.createElement('canvas'); c.width=856; c.height=540; const g=c.getContext('2d'); g.fillStyle=mau; g.fillRect(0,0,856,540); g.fillStyle='#fff'; g.fillRect(40,40,200,260); c.toBlob(r,'image/jpeg',0.92); });
   const DB = KHO.dsKhach(), ma = Object.keys(DB).filter(m=>DB[m].ten)[0], bay = new Date().toISOString();
   await luuAnhHS('t217a_matTruoc', await the('#c33')); await luuAnhHS('t217a_matSau', await the('#36c'));
   const k = {id:'t217a', che:'the', tag:['CCCD'], matTruoc:true, matSau:true, ten:DB[ma].ten, maKH:ma, ngay:bay.slice(0,10), suaLuc:bay, taoLuc:bay, may:maMayCua(), canDay:true};
   D.scan = D.scan || []; D.scan.push(k); HS.ds = D.scan; await dongBoScan(true); await w(400);
   return {ma, k:JSON.parse(JSON.stringify(k))}; });
 /* máy B: bản CCCD cũ — chỉ có PDF trên Drive, đã đọc số ở bản trước (raDoc), chưa có ảnh mặt thẻ */
 const B = await mo();
 const rB = await B.evaluate(async(kA)=>{ const w=t=>new Promise(r=>setTimeout(r,t));
   const cu = k0 => { const k = JSON.parse(JSON.stringify(kA)); Object.assign(k, k0); delete k.anhDrive; delete k.matTruoc; delete k.matSau; delete k.canDay; k.may = 'mayKhac'; k.raDoc = {cccd:'079000000111', nguon:'QR'}; D.scan.push(k); return k; };
   D.scan = D.scan || []; const k = cu({id:'t217o'}); HS.ds = D.scan;
   const canRa = sxCanCat(k);
   veVaoKhung(k, 'lon'); let dang = ''; for(let i=0;i<40 && !/đang tách/.test(dang);i++){ await w(25); dang = document.getElementById('x-than').textContent; }
   for(let i=0;i<40 && !document.querySelector('#x-than .the-xem img');i++) await w(200);
   const hai = document.querySelectorAll('#x-than .the-xem img').length;
   /* PDF không dò ra thẻ (trang trắng) → catHong, xem PDF */
   const k2 = cu({id:'t217h'});
   const goc = sxTrangPDF; sxTrangPDF = function(){ const c = document.createElement('canvas'); c.width = 1240; c.height = 1754; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); return Promise.resolve(c); };
   veVaoKhung(k2, 'lon'); for(let i=0;i<30 && !k2.catHong;i++) await w(100); sxTrangPDF = goc; await w(300);
   const hong = !!k2.catHong, conCat = sxCanCat(k2);
   const tt = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
   const ttOk = tt(sxTTCat(k)), ttHong = tt(sxTTCat(k2)), coLai = /sx\.catLai/.test(sxTTCat(k2)), phu = (document.getElementById('x-phu')||{}).textContent||'';
   const k3 = cu({id:'t217l'}); const wc = window.coTheNoiDrive; window.coTheNoiDrive = ()=>false; const ttDrive = tt(sxTTCat(k3)); window.coTheNoiDrive = wc;
   const goc2 = sxTrangPDF; sxTrangPDF = ()=>Promise.resolve(null); await sxCatMot(k3); sxTrangPDF = goc2; const ttLoi = tt(sxTTCat(k3));
   const kA0 = {id:'z', che:'the', matTruoc:true}; const ttGoc = tt(sxTTCat(kA0));
   /* ↻ Thử tách lại: xóa ghi nhận hỏng, tăng lần cắt */
   const lan0 = k2.catLan||0;
   const btn = document.createElement('div'); btn.innerHTML = sxTTCat(k2); document.body.appendChild(btn); const sTr = sxTrangPDF; sxTrangPDF = ()=>Promise.resolve(null); btn.querySelector('[data-lenh="sx.catLai"]').click(); await w(300); sxTrangPDF = sTr; btn.remove();
   const lai = {catLan:k2.catLan||0, hong:!!k2.catHong, loi:k2.catLoi||''};
   return {canRa, dang:/đang tách 2 mặt/.test(dang), hai, cat:!!k.catTuPDF, anh:!!(k.anhDrive && k.anhDrive.truoc), hong, conCat, khongAnh:!document.querySelector('#x-than .the-xem'), ttOk, ttHong, coLai, phu, ttDrive, ttLoi, ttGoc, lan0, lai}; }, rA.k).catch(e=>({loi:e.message}));
 ok('CCCD cũ chỉ có PDF, đã đọc số ở bản trước → vẫn thuộc diện tách 2 mặt', rB.canRa, JSON.stringify(rB));
 ok('mở xem → báo "đang tách 2 mặt thẻ", xong hiện 2 mặt (không còn trang A4 PDF)', rB.dang && rB.hai===2 && rB.cat);
 ok('2 ảnh cắt đưa lên Drive cạnh PDF (máy khác dùng luôn)', rB.anh);
 ok('PDF không dò ra 2 mặt thẻ → ghi lại, lần sau xem PDF luôn (không tải lại)', rB.hong && !rB.conCat && rB.khongAnh);
 ok('3.281 dòng trạng thái: đã tách → "Đã tách 2 mặt từ PDF — chưa duyệt"; không dò ra → "Không tách được" + lý do + ↻ Thử tách lại', /Đã tách 2 mặt từ PDF — chưa duyệt/.test(rB.ttOk) && /Không tách được 2 mặt: không dò ra 2 khung thẻ/.test(rB.ttHong) && rB.coLai, JSON.stringify([rB.ttOk, rB.ttHong]));
 ok('3.281 dòng trạng thái hiện dưới tên ở khung xem', /Không tách được|Đã tách/.test(rB.phu), rB.phu);
 ok('3.281 chưa nối Drive → "nối Drive để app tải PDF về tách"; không tải được PDF → báo lý do; bản quét có ảnh → "Ảnh 2 mặt thẻ lúc quét"', /nối Drive/.test(rB.ttDrive) && /Không tách được 2 mặt: không tải/.test(rB.ttLoi) && /lúc quét/.test(rB.ttGoc), JSON.stringify([rB.ttDrive, rB.ttLoi, rB.ttGoc]));
 ok('3.281 ↻ Thử tách lại → bỏ ghi nhận hỏng, thử lần cắt khác (vẫn hỏng thì báo lý do mới)', rB.lai.catLan===rB.lan0+1 && !rB.lai.hong && /không tải/.test(rB.lai.loi), JSON.stringify(rB.lai));
 /* 🔎 Rà: bản cũ đã có raDoc nhưng chưa tách → vẫn đưa vào đọc lại (tách 2 mặt) */
 const rR = await B.evaluate(async(kA)=>{ const k = JSON.parse(JSON.stringify(kA)); k.id = 't217r'; delete k.anhDrive; delete k.matTruoc; delete k.matSau; k.raDoc = {cccd:'079000000111', nguon:'QR'}; D.scan.push(k);
   const w=t=>new Promise(r=>setTimeout(r,t)); D.scan.forEach(x=>{ if(x.id!=='t217r'){ x.raDoc = x.raDoc || {khong:1, ban:9}; x.catHong = x.catHong || (x.id!=='t217r' && !x.catTuPDF ? 1 : 0); } });
   RS = null; moRaSoat(false); for(let i=0;i<80 && !(RS && RS.nhom);i++) await w(250); await w(300); const ht = document.getElementById('hop-in').textContent; dongHop();
   return {hong:/Không tách được 2 mặt thẻ/.test(ht) && /không dò ra 2 khung thẻ/.test(ht), cat:!!k.catTuPDF, ds:(RS.catDs||[]).some(x=>x.id==='t217r')||!!k.catDuyet}; }, rA.k);
 ok('🔎 Rà: khối "Không tách được 2 mặt thẻ" liệt kê bản hỏng + lý do', rR.hong, JSON.stringify(rR));
 ok('🔎 Rà: bản cũ đã đọc số ở bản trước nhưng chưa tách → Rà tách 2 mặt, đưa vào khối "Ảnh cắt từ PDF"', rR.cat && rR.ds, JSON.stringify(rR));
 /* tài liệu: 1 khách nhiều tài liệu cùng loại → đánh số 1, 2, 3; Rà chỉ báo trùng khi giống hệt */
 const rT = await B.evaluate((ma)=>{ const t = id => ({id, che:'tailieu', tag:[], maKH:ma, ten:'Khach', taoLuc:'2026-10-0'+id.slice(-1)});
   const a = t('tl1'), b2 = t('tl2'), c = t('tl3'); D.scan.push(a, b2, c);
   const so = [a, b2, c].map(k=>sxSoThu(k)), ten = tenScanDrive(c);
   const khac = rsLap([], {}, [{ma, loai:'Tài liệu', ds:[{k:a, vt:{bam:'1'}}, {k:b2, vt:{bam:'2'}}, {k:c, vt:{bam:'3'}}]}], null, false).trung.length;
   const giong = rsLap([], {}, [{ma, loai:'Tài liệu', ds:[{k:a, vt:{bam:'1'}}, {k:b2, vt:{bam:'1'}}, {k:c, vt:{bam:'3'}}]}], null, false).trung;
   const cccd = rsLap([], {}, [{ma, loai:'CCCD', ds:[{k:{id:'x1', che:'the', maKH:ma}, vt:{bam:'1'}}, {k:{id:'x2', che:'the', maKH:ma}, vt:{bam:'2'}}]}], null, false).trung.length;
   return {so, ten, khac, giong:giong.length ? giong[0].bo.length : 0, cccd}; }, rA.k.maKH);
 ok('tài liệu cùng loại 1 khách: tên đánh số theo thứ tự lưu (bản 2 " (2)", bản 3 " (3)")', rT.so[0]==='' && rT.so[1]===' (2)' && rT.so[2]===' (3)' && / - Tài liệu \(3\)\.pdf$/.test(rT.ten), JSON.stringify(rT));
 ok('🔎 Rà: tài liệu khác nội dung → không báo trùng; giống hệt từng byte → vẫn báo', rT.khac===0 && rT.giong===1);
 ok('CCCD 2 bản cùng khách → vẫn báo trùng như cũ', rT.cccd===1);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
