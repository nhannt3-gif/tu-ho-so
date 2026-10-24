// 3.348 (RA_SOAT_BO_CUC_2410 mục 8 việc 6) — 📜 Nhật ký đã lập / in: hàng nút xuất chung ghi dòng (mẫu, cách, khách, tổ, kỳ), lấy tiêu đề khi thiếu tên, thẻ khách / thẻ tổ / hộp lọc, gộp máy khác theo id, giữ 13 tháng, còn sau tải lại. Bộ GIẢ tests/gianho31.
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
   kyChungDoi('2026-08'); dhSL('tra'); for(let i=0;i<60 && !TC_K;i++) await w(200); await w(800);
   const r0 = KHO.chiMuc()[0], kh = r0.m, c = KHO.danhBa(kh), to = c.to;
   D.nkIn = []; const dem = () => (D.nkIn||[]).length;
   /* 1. hàng nút xuất chung ghi nhật ký (Word / Excel không mở hộp in) */
   moHop('<div id="nk-thu">'+xuatHang({ten:'Mau thu', nk:{mau:'Mẫu thử 01/TD', kh:[kh], to:[to], ky:'2026-08'}, html:function(){ return '<html><head><title>Tieu de</title></head><body>x</body></html>'; }, word:'void 0', excel:'void 0'})+'</div>', true);
   document.querySelector('#nk-thu .xuat-word').click(); await w(100);
   const x1 = (D.nkIn||[])[0];
   ok('3.348 bấm 📝 Word → ghi 1 dòng nhật ký (mẫu, cách, khách, tổ, kỳ)', dem()===1 && x1.mau==='Mẫu thử 01/TD' && x1.cach==='word' && x1.kh[0]===kh && x1.to[0]===to && x1.ky==='2026-08', JSON.stringify(x1).slice(0, 160));
   dongHop();
   moHop('<div id="nk-thu2">'+xuatHang({html:function(){ return '<html><head><title>Mau 06 - To A</title></head><body>x</body></html>'; }, excel:'void 0'})+'</div>', true);
   document.querySelector('#nk-thu2 .xuat-excel').click(); await w(100); dongHop();
   ok('3.348 nơi gọi chưa đặt tên → lấy tiêu đề trang in', dem()===2 && D.nkIn[1].mau==='Mau 06 - To A' && D.nkIn[1].cach==='excel', D.nkIn[1] && D.nkIn[1].mau);
   /* 2. xem lại ở thẻ khách / thẻ tổ */
   slTheKH(kh); await w(500);
   const kk = document.querySelector('.nk-khoi');
   ok('3.348 thẻ khách: khối 📜 Đã lập / in có Mẫu thử 01/TD', !!kk && /Mẫu thử 01\/TD/.test(kk.textContent), kk && kk.textContent.slice(0, 80));
   if(KHO.toKy(TC_K, to)){ tcTheTo(to); await w(300); const kt = document.querySelector('#tc-ct .nk-khoi, .tc-the-to .nk-khoi');
     ok('3.348 thẻ tổ: khối 📜 có mẫu đã in cho tổ', !!kt && /Mẫu thử/.test(kt.textContent)); }
   nkHop('kh', kh); await w(100);
   ok('3.348 hộp 📜 Nhật ký theo khách: 1 dòng', document.querySelectorAll('.nk-bang tbody tr').length===1);
   dongHop();
   /* 3. gộp từ máy khác (chỉ mục Drive) — theo id, không trùng */
   const kia = {id:'nkMayKia1', taoLuc:new Date().toISOString(), mau:'Máy kia in', cach:'in', kh:[], to:[to], ky:'', tab:'hst'};
   gopTuRemote({nkIn:[kia]}); gopTuRemote({nkIn:[kia]});
   ok('3.348 gộp nhật ký máy khác theo id (2 lần vẫn 1 dòng)', D.nkIn.filter(x=>x.id==='nkMayKia1').length===1 && dem()===3, dem());
   /* 4. dòng quá 13 tháng tự bỏ */
   D.nkIn.push({id:'nkCu', taoLuc:'2024-01-01T00:00:00.000Z', mau:'Cũ', cach:'in', kh:[], to:[]}); nkDon();
   ok('3.348 dòng quá 13 tháng tự bỏ', !D.nkIn.some(x=>x.id==='nkCu'));
   /* 3.349: nút Đóng / Thôi đổi sang data-lenh="hop.dong" vẫn đóng hộp */
   moHop('<div class="hop-tit">Thử</div><div class="hang-nut"><button class="nho" id="nk-dong-thu" data-lenh="hop.dong">Thôi</button></div>'); await w(100);
   document.getElementById('nk-dong-thu').click(); await w(200);
   ok('3.349 nút data-lenh="hop.dong" đóng hộp (thay onclick="dongHop()")', !document.getElementById('hop').classList.contains('hien'));
   { const giu = KT_GN_XEM; KT_GN_XEM = {gts:[{p:{x:{t:{ma:'0000001'}}, mon:[{kh:'9900000101'}, {kh:'9900000102'}, {kh:'9900000101'}]}}, {p:{x:{t:{ma:'0000002'}}, mon:[{kh:'9900000103'}]}}]};
     const r = ktGNNk(); KT_GN_XEM = giu;
     ok('3.353 KTGS Mẫu 06 sau GN: nhật ký ghi đủ tổ + hộ của các phiếu (không trùng)', r.to.join()==='0000001,0000002' && r.kh.join()==='9900000101,9900000102,9900000103' && /Mẫu 06/.test(r.mau), JSON.stringify(r)); }
   luuNgay(); await w(800);
   return o; }, files);
 /* 5. tải lại trang vẫn còn nhật ký */
 await p.reload(); await p.waitForTimeout(2500);
 const sau = await p.evaluate(async()=>{ await xongTV; return (D.nkIn||[]).length; });
 R.push((sau===3 ? '✓ ' : '✗ ')+'3.348 tải lại trang: nhật ký còn (lưu theo ngăn) — '+sau);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t258 đạt'); await b.close(); process.exit(sai?1:0);
})();
