// 3.277 — sửa nhanh tab Scan sau rà soát: chữ hướng dẫn đúng cách lưu mới; gộp thanh "chưa khai" vào "Chờ sắp xếp"; 1 khách nhiều bản cùng loại → " (2)";
// ảnh cắt từ PDF chưa duyệt → in PDF gốc. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   const DB = KHO.dsKhach(), ma = Object.keys(DB).find(m=>DB[m].ten), c = DB[ma];
   const k1 = {id:'t215a', che:'the', ten:c.ten, maKH:ma, tag:['CCCD'], taoLuc:'2026-10-01T00:00:00Z'}, k2 = {id:'t215b', che:'the', ten:c.ten, maKH:ma, tag:['CCCD'], taoLuc:'2026-10-05T00:00:00Z'};
   const t1 = {id:'t215c', che:'tailieu', ten:c.ten, maKH:ma, tag:['01TD'], trang:[], taoLuc:'2026-10-06T00:00:00Z'};
   const kc = {id:'t215d', che:'the', ten:'cccd-Gia Cho', tag:['CCCD'], chuaKhai:true, taoLuc:'2026-10-06T00:00:00Z'};
   D.scan = D.scan || []; D.scan.push(k1, k2, t1, kc); HS.ds = D.scan;
   ok('1 khách 2 bản CCCD → bản lưu sau thêm " (2)", ảnh 2 mặt cũng vậy; bản đầu và tài liệu khác loại giữ nguyên', tenScanDrive(k1)===ma+' - '+c.ten+' - CCCD.pdf' && tenScanDrive(k2)===ma+' - '+c.ten+' - CCCD (2).pdf' && sxTenAnh(k2, 'sau')===ma+' - '+c.ten+' - Mặt sau (2).jpg' && tenScanDrive(t1)===ma+' - '+c.ten+' - 01TD.pdf', [tenScanDrive(k2), sxTenAnh(k2, 'sau')].join(' | '));
   /* thanh tab Scan */
   HS.mo = true; doiNgan(4); await w(400);
   const tr = document.getElementById('tr4').textContent;
   ok('tab Scan: bỏ thanh vàng "bản lưu tạm chưa khai", gộp vào thanh ⏳ Chờ sắp xếp (có nút ✎ Khai hàng loạt)', !/bản lưu tạm chưa khai/.test(tr) && /bản chờ sắp xếp/.test(tr) && !!document.querySelector('#tr4 [data-lenh="ql.mo"]'));   /* 3.278: Khai hàng loạt dời vào thẻ Chờ sắp xếp */
   const dong = document.querySelector('#tr4 .sc-d[onclick*="t215d"]');
   ok('dòng bản chưa khai ghi nơi lưu "Scan chờ sắp xếp" (trước "Hồ sơ scan › Chưa khai")', !dong || /Scan chờ sắp xếp/.test(dong.textContent), dong ? dong.textContent.slice(0, 120) : 'không thấy dòng');
   /* hộp Chữ ký: chữ đúng cách lưu */
   moKyAnh(); await w(200); const hk = document.getElementById('hop-in').textContent;
   ok('hộp Chữ ký · CCCD: ghi "Chữ ký - Ảnh khách" (không còn "mỗi tháng một thư mục")', /Chữ ký - Ảnh khách/.test(hk) && !/mỗi tháng một thư mục/.test(hk) && !/Mở thư mục tháng/.test(hk));
   dongHop();
   /* ảnh cắt từ PDF chưa duyệt → in PDF gốc */
   const kp = {id:'t215e', che:'the', ten:c.ten, maKH:ma, tag:['CCCD'], matTruoc:true, matSau:true, catTuPDF:true, driveId:'drvP', taoLuc:'2026-10-07T00:00:00Z'}; D.scan.push(kp);
   const cu = {n:coTheNoiDrive, t:taiPDFDrive, i:inBlob, d:SX_DUNG_THE_CU}; let lay = '', inn = '', dung = 0;
   coTheNoiDrive = () => true; taiPDFDrive = id => { lay = id; return Promise.resolve(new Blob(['%PDF goc'], {type:'application/pdf'})); }; inBlob = (bl, ten) => { inn = ten; }; SX_DUNG_THE_CU = () => { dung++; return Promise.resolve(); };
   await dungTrangThe(['t215e'], 'in');
   ok('ảnh cắt từ PDF chưa duyệt → In dùng PDF gốc trên Drive (không dựng lại từ ảnh cắt)', lay==='drvP' && /CCCD/.test(inn) && dung===0, lay+' · '+inn);
   kp.catDuyet = true; lay = ''; await dungTrangThe(['t215e'], 'in');
   ok('đã duyệt (Đúng) → in bình thường từ ảnh', lay==='' && dung===1);
   coTheNoiDrive = cu.n; taiPDFDrive = cu.t; inBlob = cu.i; SX_DUNG_THE_CU = cu.d;
   D.scan = D.scan.filter(k=>!/^t215/.test(k.id)); luu();
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
