// 3.271 — CCCD lưu 3 file lên Drive (PDF + Mặt trước.jpg + Mặt sau.jpg, chung thư mục), đổi tên / dời / thùng rác đi theo PDF,
// bản cũ còn ảnh → đưa ảnh lên (không dựng lại PDF); máy B không có ảnh → tải ảnh từ Drive; bản chỉ có PDF → cắt 2 thẻ (PDF gốc giữ nguyên),
// 🔎 Rà "Ảnh cắt từ PDF" (Bỏ ảnh cắt); bảng đối chiếu đọc được ↔ Mẫu 31; CMND 9 số. Drive giả (tests/fakedrive.js), ảnh thẻ GIẢ.
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
 const ten = id => (drive.F[id]||{}).name, cha = id => drive.duong(((drive.F[id]||{}).parents||[])[0]||''), xoa = id => !!(drive.F[id]||{}).trashed;
 const A = await mo();
 /* máy A: quét 2 bản thẻ (ảnh giả: mặt trước đỏ, mặt sau xanh) → đồng bộ */
 const rA = await A.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t));
   const the = mau => new Promise(r=>{ const c=document.createElement('canvas'); c.width=856; c.height=540; const g=c.getContext('2d'); g.fillStyle=mau; g.fillRect(0,0,856,540); g.fillStyle='#fff'; g.fillRect(40,40,200,260); c.toBlob(r,'image/jpeg',0.92); });
   const DB = KHO.dsKhach(), ma = Object.keys(DB).filter(m=>DB[m].ten)[0], bay = new Date().toISOString();
   const mk = (id, them) => Object.assign({id, che:'the', tag:['CCCD'], matTruoc:true, matSau:true, ngay:bay.slice(0,10), suaLuc:bay, taoLuc:bay, may:maMayCua(), canDay:true}, them);
   for(const id of ['t210a', 't210b', 't210c']){ await luuAnhHS(id+'_matTruoc', await the('#c33')); await luuAnhHS(id+'_matSau', await the('#36c')); }
   const kA = mk('t210a', {ten:DB[ma].ten, maKH:ma}), kB = mk('t210b', {ten:'cccd-Khach Cho Gia'}), kC = mk('t210c', {ten:DB[ma].ten, maKH:ma});
   D.scan = D.scan || []; D.scan.push(kA, kB, kC); HS.ds = D.scan;
   await dongBoScan(true); await w(500);
   return {ma, ten:DB[ma].ten, kA:JSON.parse(JSON.stringify(kA)), kB:JSON.parse(JSON.stringify(kB)), kC:JSON.parse(JSON.stringify(kC))}; });
 const kA = rA.kA, ad = kA.anhDrive||{};
 ok('bản thẻ đã rõ khách → Drive 3 file chung thư mục CCCD: PDF + Mặt trước.jpg + Mặt sau.jpg', kA.driveId && ad.truoc && ad.sau && cha(kA.driveId)==='Tủ hồ sơ/CCCD' && cha(ad.truoc.id)==='Tủ hồ sơ/CCCD' && cha(ad.sau.id)==='Tủ hồ sơ/CCCD'
   && ten(ad.truoc.id)===rA.ma+' - '+rA.ten+' - Mặt trước.jpg' && ten(ad.sau.id)===rA.ma+' - '+rA.ten+' - Mặt sau.jpg', [ten(kA.driveId), ten(ad.truoc && ad.truoc.id), ten(ad.sau && ad.sau.id)].join(' | '));
 const kB = rA.kB;
 ok('bản chưa rõ khách → 3 file ở Scan chờ sắp xếp, ảnh tên "cccd-… - Mặt trước.jpg"', cha(kB.driveId)==='Tủ hồ sơ/Scan chờ sắp xếp' && kB.anhDrive && ten(kB.anhDrive.truoc.id)==='cccd-Khach Cho Gia - Mặt trước.jpg' && cha(kB.anhDrive.sau.id)==='Tủ hồ sơ/Scan chờ sắp xếp', ten(kB.anhDrive && kB.anhDrive.truoc.id));
 /* Sắp xếp gắn khách → 3 file dời + đổi tên cùng lúc */
 await A.evaluate(async(ma)=>{ const k = D.scan.find(x=>x.id==='t210b'); sxGan(k, ma, false); await sxDoiDrive([k], []); }, rA.ma);
 const kB2 = await A.evaluate(()=>JSON.parse(JSON.stringify(D.scan.find(x=>x.id==='t210b'))));
 ok('🧹 Sắp xếp: PDF + 2 ảnh cùng dời về CCCD, đổi tên chuẩn (khách đã có 1 bản → " (2)", 3.277)', cha(kB2.driveId)==='Tủ hồ sơ/CCCD' && cha(kB2.anhDrive.truoc.id)==='Tủ hồ sơ/CCCD' && ten(kB2.anhDrive.sau.id)===rA.ma+' - '+rA.ten+' - Mặt sau (2).jpg', ten(kB2.anhDrive.sau.id));
 /* bản cũ: PDF đã lên, ảnh chưa lên, còn ảnh trong máy → lần đồng bộ tới đưa ảnh lên, không gửi lại PDF */
 const nd0 = drive.F[rA.kC.driveId].nhanNoiDung||0;
 await A.evaluate(async()=>{ const k = D.scan.find(x=>x.id==='t210c'); for(const m of Object.keys(k.anhDrive||{})) await xoaFileDrive(k.anhDrive[m].id); delete k.anhDrive; delete k.canDay; await dongBoScan(true); });
 const kC2 = await A.evaluate(()=>JSON.parse(JSON.stringify(D.scan.find(x=>x.id==='t210c'))));
 ok('bản cũ còn ảnh trong máy → đồng bộ tự đưa 2 ảnh lên, PDF không gửi lại', kC2.anhDrive && kC2.anhDrive.truoc && kC2.anhDrive.sau && !xoa(kC2.anhDrive.truoc.id) && (drive.F[kC2.driveId].nhanNoiDung||0)===nd0, JSON.stringify(kC2.anhDrive));
 /* thùng rác: PDF + 2 ảnh vào _ThungRac; xóa hẳn → 2 ảnh vào thùng rác Drive */
 await A.evaluate(async()=>{ chuyenVaoRac(['t210c'], 'thử'); await new Promise(r=>setTimeout(r, 300)); await Promise.all((D.rac||[]).filter(m=>m.id==='t210c').map(m=>doiChoScanKA(m))); });
 ok('vào thùng rác app → PDF + 2 ảnh dời vào _ThungRac', cha(kC2.driveId)==='Tủ hồ sơ/_ThungRac' && cha(kC2.anhDrive.truoc.id)==='Tủ hồ sơ/_ThungRac' && cha(kC2.anhDrive.sau.id)==='Tủ hồ sơ/_ThungRac', [cha(kC2.driveId), cha(kC2.anhDrive.truoc.id)].join(' | '));
 await A.evaluate(async()=>{ await thucHienXoaHan(['t210c'], true); await new Promise(r=>setTimeout(r, 300)); });
 ok('xóa hẳn → 2 ảnh cũng vào thùng rác Drive', xoa(kC2.anhDrive.truoc.id) && xoa(kC2.anhDrive.sau.id));
 /* máy B: không có ảnh → tải từ Drive */
 const B = await mo();
 const rB = await B.evaluate(async([kA])=>{ const w=t=>new Promise(r=>setTimeout(r,t)); D.scan = D.scan || []; const k = JSON.parse(JSON.stringify(kA)); delete k.may; k.may = 'mayKhac'; delete k.canDay; D.scan.push(k); HS.ds = D.scan;
   const truoc = await SX_DOC_ANH_CU(k.id+'_matTruoc'), b = await docAnhHS(k.id+'_matTruoc'), sau = await docAnhHS(k.id+'_matSau'), con = await SX_DOC_ANH_CU(k.id+'_matTruoc');
   const co = await coAnhTrongMay(k);
   const mau = async bl => { const im = await anhTuBlob(bl), c = document.createElement('canvas'); c.width = 20; c.height = 20; const g = c.getContext('2d'); g.drawImage(im, 0, 0, 20, 20); const d = g.getImageData(15, 15, 1, 1).data; return [d[0], d[1], d[2]]; };
   return {truoc:!!truoc, b:!!b, sau:!!sau, con:!!con, co, m1:b ? await mau(b) : null, m2:sau ? await mau(sau) : null}; }, [kA]);
 ok('máy B (chưa có ảnh) → tự tải 2 ảnh từ Drive, giữ lại trong máy; khung xem / hộp Sửa dùng được như máy A', !rB.truoc && rB.b && rB.sau && rB.con && rB.co && rB.m1[0]>150 && rB.m2[2]>150, JSON.stringify(rB));
 /* bản cũ chỉ có PDF (không ảnh trên Drive, không ảnh trong máy) → cắt 2 thẻ từ PDF */
 const rP = await B.evaluate(async([kA])=>{ const w=t=>new Promise(r=>setTimeout(r,t));
   const k = JSON.parse(JSON.stringify(kA)); k.id = 't210p'; delete k.anhDrive; k.may = 'mayKhac'; delete k.canDay; D.scan.push(k);
   const nd = 0; const bs = await sxAnhDoc(k); await w(600);
   const kt = async bl => { const im = await anhTuBlob(bl), W = im.naturalWidth||im.width, H = im.naturalHeight||im.height, c = document.createElement('canvas'); c.width = 20; c.height = 20; const g = c.getContext('2d'); g.drawImage(im, 0, 0, 20, 20); const d = g.getImageData(15, 15, 1, 1).data; return {tl:W/H, mau:[d[0], d[1], d[2]]}; };
   return {n:bs.filter(Boolean).length, a:bs[0] ? await kt(bs[0]) : null, b:bs[1] ? await kt(bs[1]) : null, cat:!!k.catTuPDF, anh:JSON.parse(JSON.stringify(k.anhDrive||null)), pdf:k.driveId}; }, [kA]);
 ok('bản chỉ có PDF → cắt đúng 2 khung thẻ (tỉ lệ 85,6 × 54, mặt trước đỏ / mặt sau xanh), đánh dấu "cắt từ PDF"', rP.n===2 && rP.cat && Math.abs(rP.a.tl-1.585)<0.08 && Math.abs(rP.b.tl-1.585)<0.08 && rP.a.mau[0]>150 && rP.b.mau[2]>150, JSON.stringify(rP));
 ok('ảnh cắt đưa lên Drive cạnh PDF; PDF gốc giữ nguyên', rP.anh && rP.anh.truoc && cha(rP.anh.truoc.id)===cha(rP.pdf) && !xoa(rP.pdf));
 const nd1 = drive.F[rP.pdf].nhanNoiDung||0;
 await B.evaluate(async()=>{ const k = D.scan.find(x=>x.id==='t210p'); k.canDay = true; k.ghi = 'sửa'; await dayMotScan(k); });
 ok('bản cắt từ PDF đồng bộ lại → không dựng lại PDF từ ảnh cắt (PDF gốc không bị ghi đè)', (drive.F[rP.pdf].nhanNoiDung||0)===nd1);
 /* 🔎 Rà: khối "Ảnh cắt từ PDF — anh xem lại" → Bỏ ảnh cắt */
 const rR = await B.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); D.scan.forEach(k=>{ if(k.id!=='t210p') k.raDoc = {khong:1, ban:9}; });
   RS = null; moRaSoat(false); for(let i=0;i<80 && !(RS && RS.nhom);i++) await w(250); await w(300);
   const ht = document.getElementById('hop-in').textContent, co = (RS.catDs||[]).some(k=>k.id==='t210p');
   const el = document.querySelector('#hop-in [data-lenh="rs.cat"][data-k="t210p"][data-v="bo"]'); if(el) el.click(); await w(100);
   const nut = document.querySelector('#hop-in [data-lenh="rs.apDung"]').textContent; document.querySelector('#hop-in [data-lenh="rs.apDung"]').click(); await w(800);
   const k = D.scan.find(x=>x.id==='t210p'); return {co, ht:/Ảnh cắt từ PDF — anh xem lại/.test(ht), nut, bo:!!k.catBo && !k.catTuPDF && !k.anhDrive, local:!!(await SX_DOC_ANH_CU('t210p_matTruoc'))}; });
 ok('🔎 Rà: khối "Ảnh cắt từ PDF — anh xem lại" có bản vừa cắt', rR.co && rR.ht, JSON.stringify(rR));
 ok('chọn "Bỏ ảnh cắt" → xóa ảnh cắt (máy + Drive), lần sau dùng PDF, không cắt lại tự động', rR.bo && !rR.local && xoa(rP.anh.truoc.id), rR.nut);
 /* bảng đối chiếu + CMND 9 số */
 const rD = await A.evaluate(async(ma)=>{ const DB = KHO.dsKhach(), c = DB[ma];
   const r = {cccd:c.cccd && String(c.cccd).length===12 ? c.cccd : '079000000111', cmnd:'111222333', ten:boDau(c.ten).toUpperCase(), ns:c.ns||'1980-01-01', gt:'Nam', dc:'Ấp Giả', nguon:'QR'};
   const h = sxBangDoc(r, ma), div = document.createElement('div'); div.innerHTML = h;
   const k = D.scan.find(x=>x.id==='t210a'); k.cmnd = '111222333';
   DB['9990000101'] = {ten:'Khách Cmnd Giả', cccd:'987654321'}; SX_CHI = null; const X = sxXacDinh({cccd:'079000000999', cmnd:'987654321'}); delete DB['9990000101']; SX_CHI = null;
   SXK_BANG = null; moKiemScan(); for(let i=0;i<40 && !SXK_BANG;i++) await new Promise(r=>setTimeout(r,200));
   const to = [].concat(...SXK_BANG.ds.map(x=>x.to)).find(t=>t.ho.some(h=>h.ma===ma)); if(to) document.querySelector('#hop-in [data-lenh="sx.moTo"][data-to="'+to.ma+'"]').click(); await new Promise(r=>setTimeout(r,200));
   const kt = document.getElementById('hop-in').textContent; dongHop();
   return {rows:div.querySelectorAll('tbody tr').length, ten:/Họ tên/.test(div.textContent) && /✓/.test(div.textContent), cmndCot:/CMND cũ \(9 số\)/.test(div.textContent), cmnd:sxCmndCua(ma), X, kt:/CMND cũ 111222333/.test(kt)}; }, rA.ma);
 ok('bảng đối chiếu: đọc được gì hiện hết (Số CCCD, CMND cũ, Họ tên, Ngày sinh, Giới tính, Nơi thường trú…), so Mẫu 31 ✓ / ✗', rD.rows>=6 && rD.ten && rD.cmndCot, JSON.stringify(rD));
 ok('CMND 9 số đọc từ thẻ lưu theo mã KH, hiện ở 📊 Kiểm tra (từng hộ)', rD.cmnd==='111222333' && rD.kt);
 ok('Mẫu 31 còn số CMND 9 số → tra theo CMND cũ đọc từ thẻ ra đúng khách', rD.X && rD.X.ma==='9990000101' && rD.X.theo==='số CMND cũ', JSON.stringify(rD.X));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
