// 3.257 (anh 18/10 "rà soát lại form của mẫu nào không lọt mẫu khác, ví dụ trong mẫu 01TG mà có GQVL là không đúng"):
//   mỗi mẫu chỉ hiện / in đúng phần của mẫu đó, dù hộ đang chọn chương trình nào (HSSV / GQVL). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:'')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo;
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const tv = hsoTVTo(TO_K.to[C.to]), h1 = hmTuM31(tv[0].kh); hmLamHS(h1.id, '01td'); await w(400);
   const B = hsoBo(); B.ct = 'HSSV'; B.pa = {sv:'Sinh Viên Giả Lọt', soThang:'10'}; B.tien = '40000000'; hsoBoLuu();
   const tuy = async mk => { hsoChonMau(mk); await w(600); return document.getElementById('hso-tuy').innerText.replace(/\s+/g, ' '); };
   const inTxt = () => (HSO.x.ds||[{h:HSO.x.h}]).map(u=>u.h).join(' ').replace(/<[^>]+>/g, ' ');
   let t = await tuy('01gqvl');
   ok('01/GQVL khi hộ đang HSSV: không chip chương trình khác, không phương án HSSV, không In kèm 01/UQ / 06/TD; có nút chuyển sang GQVL', !/HSSV NSVSMT/.test(t) && !/Phương án — HSSV/.test(t) && !/In kèm/.test(t) && /Chuyển hộ sang chương trình GQVL/.test(t), t.slice(0, 300));
   ok('bản in 01/GQVL khi hộ đang HSSV: không lọt phương án HSSV (tên SV, chi phí học tập)', !/Sinh Viên Giả Lọt|Chi phí học tập/.test(inTxt()));
   t = await tuy('07b'); ok('07b/GQVL khi hộ đang HSSV: không phương án HSSV', !/Phương án — HSSV/.test(t) && !/HSSV NSVSMT/.test(t) && !/Sinh Viên Giả Lọt|Chi phí học tập/.test(inTxt()));
   t = await tuy('01uq'); ok('01/UQ: không chương trình / phương án / In kèm', !/Chương trình|Phương án|In kèm/.test(t));
   t = await tuy('01tgtv'); ok('01/TGTV: không ghi chương trình vay (HSSV / GQVL)', !/HSSV|GQVL|NSVSMT/.test(t), t.slice(0, 200));
   t = await tuy('06td'); ok('06/TD: không chip chương trình, không In kèm', !/HSSV NSVSMT|In kèm/.test(t));
   t = await tuy('01tdck'); ok('01/TĐCK: không chương trình / phương án vay', !/Chương trình vay|Phương án/.test(t));
   B.ct = 'GQVL'; hsoBoLuu();
   t = await tuy('01td'); ok('01/TD khi hộ đang GQVL: chỉ nhắc mở 01/GQVL, không phương án GQVL', /dùng mẫu riêng/.test(t) && !/Phương án GQVL/.test(t) && !/③ Phương án/.test(t));
   t = await tuy('01tgtv'); ok('01/TGTV khi hộ đang GQVL: không chữ GQVL', !/GQVL/.test(t));
   t = await tuy('01gqvl'); ok('01/GQVL khi hộ đang GQVL: phương án GQVL + In kèm GQVL (03/TD, 10C, 07b, 01/TGTV), không 01/UQ', /Phương án GQVL/.test(t) && /07b\/GQVL hợp đồng/.test(t) && !/01\/UQ/.test(t));
   /* 3.258: thứ tự chip Hồ sơ vay + 01/TD tách theo chương trình */
   hsoChonMau('sohv'); await w(500); const chip = [...document.querySelectorAll('#hso-tabm .hso-tm')].map(x=>x.textContent.trim());
   ok('thứ tự chip Hồ sơ vay: Sổ · 01/UQ · 01/TD HSSV · 01/TD NSVSMT · 03/TD · 06A/TD (3.430) · 06/TD · 01/GQVL · 07b/GQVL · Phê duyệt NH (3.310) · 01/TGTV · 09A · 01/TĐCK', chip.join('|')==='📒 Sổ hộ vay|01/UQ|01/TD HSSV|01/TD NSVSMT|03/TD|06A/TD|06/TD|01/GQVL|07b/GQVL|Phê duyệt NH|01/TGTV|09A/TD|01/TĐCK', chip.join('|'));
   hsoChon01CT('NSVSMT'); await w(600);
   ok('bấm "01/TD NSVSMT" → mở 01/TD, phiếu đang mở sang NSVSMT, chip NSVSMT sáng', hsoMau().k==='01td' && hsoBo().ct==='NSVSMT' && /01\/TD NSVSMT/.test((document.querySelector('#hso-tabm .hso-tm.bat')||{}).textContent||''), (document.querySelector('#hso-tabm .hso-tm.bat')||{}).textContent);
   B.ct = 'HSSV'; hsoBoLuu();
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
