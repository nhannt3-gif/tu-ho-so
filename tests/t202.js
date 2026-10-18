// 3.253 (anh chốt 17–18/10, ý 12–14): MẪU 06/TD trong Hồ sơ vay — gọi hàm Mẫu 06 KTGS (khóa mẫu); hộ chung danh sách 03/TD;
//   phần ghi theo hồ sơ điền sẵn đủ (họ tên, chương trình, giải ngân = dư nợ = số vay 01/TD, mục đích); nhiều hộ / phiếu; 01/TD In kèm 06/TD; Word. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:'')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; const S0 = hsoCH(); delete S0.d03;
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const tv = hsoTVTo(TO_K.to[C.to]);
   ok('tab Hồ sơ vay có mẫu 06/TD', HSO_MAU.hsv.some(m=>m.k==='06td') && /06\/TD/.test(document.getElementById('hso-tabm').textContent));
   /* 1 hộ từ 01/TD */
   const h1 = hmTuM31(tv[0].kh); hmLamHS(h1.id, '01td'); await w(400); const B = hsoBo(); B.ct = 'HSSV'; B.pa = {sv:'Con Giả Một', soThang:'12'}; B.tien = '40000000'; hsoBoLuu();
   hsoChonMau('06td'); await w(1200); let tr = HSO.x.trang.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
   ok('06/TD từ hộ đang lập 01/TD: tên, chương trình HSSV, giải ngân = dư nợ = 40 (triệu), mục đích', tr.indexOf(tenHoaDau(B.nv.ten))>=0 && /Học sinh sinh viên/.test(tr) && (hso06GtHS()[0].rows[0].R5==='40' && hso06GtHS()[0].rows[0].R6==='40') && /Chi phí học tập/.test(tr), tr.slice(tr.indexOf('(9)'), tr.indexOf('(9)')+400)+' || '+JSON.stringify(hso06GtHS().map(g=>g.rows)));
   ok('dùng đúng khuôn Mẫu 06 KTGS (tiêu đề, 2 nhóm cột)', /PHIẾU KIỂM TRA SỬ DỤNG VỐN VAY/.test(tr) && /PHẦN GHI THEO HỒ SƠ CHO VAY/.test(tr) && /PHẦN KIỂM TRA THỰC TẾ/.test(tr));
   ok('cột trái 06/TD: danh sách hộ + ＋ Thêm hộ từ sổ', /Thêm hộ từ sổ/.test(document.getElementById('hso-tuy').textContent) && document.getElementById('hso-tuy').textContent.indexOf(hmTen(h1))>=0);
   /* nhiều hộ: thêm 2 hộ cùng tổ qua 03/TD */
   const h2 = hmTuM31(tv[1].kh), h3 = hmTuM31(tv[2].kh); hsoChonMau('03td'); await w(500); hsoD03Them(h2.id); hsoD03Them(h3.id); const D3 = hsoD03(); D3.ds.forEach(r=>{ if(!r.tien) r.tien = '30000000'; }); luu(); hsoChonMau('06td'); await w(1200);
   const g = hso06GtHS(); tr = HSO.x.trang.replace(/<[^>]+>/g, ' ');
   ok('nhiều hộ / phiếu: 3 hộ cùng tổ → 1 phiếu 3 dòng, dòng Cộng = tổng', g.length===1 && g[0].rows.length===3 && g[0].f.TGN===ktTr(40000000+30000000*2, 2), g.length+' phiếu · '+(g[0]||{rows:[]}).rows.length+' dòng · Cộng '+(g[0]||{f:{}}).f.TGN);
   /* Word */
   let wd = null; try { wd = await ktDocx('m06', g[0]); } catch(e){ wd = e; } ok('xuất Word 06/TD (khuôn KTGS)', wd && wd.size>3000, wd && (wd.size || wd.message));
   /* 01/TD In kèm 06/TD */
   hmLamHS(h1.id, '01td'); await w(500); hsoBoDat('kem.k06', 1, 1); await w(500);
   ok('01/TD In kèm có ô 06/TD; tích → nút 🖨 06/TD cạnh nút In', /06\/TD phiếu kiểm tra/.test(document.getElementById('hso-tuy').textContent) && hsoKem06() && /🖨 06\/TD/.test(document.getElementById('hso-xem-nut').textContent));
   hsoBoDat('kem.k06', 0, 1);
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
