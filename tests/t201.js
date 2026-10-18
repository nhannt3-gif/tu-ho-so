// 3.252 (anh 17–18/10, ý 15 — "triển khai hết các mẫu khai báo riêng 1 lần"): KHAI BÁO RIÊNG mọi mẫu nền ô — chỉ chỗ chấm (câu chữ mẫu không sửa);
//   💾 Lưu đóng khung · ✕ Hủy / đóng mà chưa lưu → trả lại như lúc mở · ↺ mặc định từng ô · Lưu: ô gõ trong lần làm / tự gõ chưa có giá trị → tự ra cột trái · ô theo chương trình có nút ⚙ Thẻ chương trình. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:'')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; const L = hsoLuu(); delete L.cham; delete L.chamGT; delete L.chuMau; delete L.nhanh;
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const tv = hsoTVTo(TO_K.to[C.to]), ho = hmTuM31(tv[0].kh); hmLamHS(ho.id, '01td'); await w(400); hsoBo().ct = 'HSSV'; hsoBoLuu();
   /* 1. Hủy: đổi rồi ✕ Hủy → trả lại */
   omKBHop('01td', 'nhNgayLai'); await w(400);
   ok('khung khai báo riêng có 💾 Lưu, ✕ Hủy, ↺ Mặc định ô này', /💾 Lưu/.test(document.getElementById('hop-in').textContent) && /✕ Hủy/.test(document.getElementById('hop-in').textContent) && /↺ Mặc định ô này/.test(document.getElementById('om-kbt-phai').textContent));
   omDatCach('01td', 'nhNgayLai', 'kb'); omDatKB('01td', 'nhNgayLai', '25'); await w(200);
   ok('trong khung: xem trước đổi ngay', /vào ngày 25/.test(document.getElementById('om-kbt-khung').contentDocument.body.textContent));
   [...document.querySelectorAll('#hop-in button')].find(x=>/✕ Hủy/.test(x.textContent)).click(); await w(300);
   ok('✕ Hủy → trả lại như lúc mở (ô ngày trả lãi về chấm, giá trị không lưu)', omCachLuu('01td', 'nhNgayLai')==='cham' && !omKB('01td', 'nhNgayLai'), omCachLuu('01td', 'nhNgayLai')+'|'+omKB('01td', 'nhNgayLai'));
   omKBHop('01td', 'nhNgayLai'); await w(300); omDatCach('01td', 'nhNgayLai', 'kb'); omDatKB('01td', 'nhNgayLai', '25'); dongHop(); await w(300);
   ok('đóng khung mà chưa Lưu (Esc / ✕ góc) → cũng trả lại', omCachLuu('01td', 'nhNgayLai')==='cham' && !omKB('01td', 'nhNgayLai'));
   /* 2. Lưu */
   omKBHop('01td', 'nhNgayLai'); await w(300); omDatCach('01td', 'nhNgayLai', 'kb'); omDatKB('01td', 'nhNgayLai', '25'); omDatCach('01td', 'nhTra', 'go'); await w(200);
   [...document.querySelectorAll('#hop-in button')].find(x=>/💾 Lưu/.test(x.textContent)).click(); await w(400);
   ok('💾 Lưu → khung đóng, giữ khai báo, bản in có "vào ngày 25"', !document.getElementById('hop').classList.contains('hien') && omKB('01td', 'nhNgayLai')==='25' && /vào ngày 25/.test(hsoLap().h.replace(/<[^>]+>/g, '')), [document.getElementById('hop').classList.contains('hien'), omKB('01td', 'nhNgayLai'), (hsoLap().h.match(/vào ngày[^<]{0,40}/)||[''])[0]].join('|'));
   ok('Lưu: ô "gõ trong lần làm" (Số tiền trả nợ) tự ra cột trái để gõ', omNhanh('01td').indexOf('nhTra')>=0 && /Số tiền trả nợ/.test(document.getElementById('hso-tuy').textContent));
   /* 3. ↺ mặc định từng ô */
   omKBHop('01td', 'nhNgayLai'); await w(300); omKBMD1('01td', 'nhNgayLai'); omKBLuu(); await w(300);
   ok('↺ Mặc định ô này → ô về chấm, bỏ giá trị tự gõ; ô khác (nhTra) giữ', omCachLuu('01td', 'nhNgayLai')==='cham' && !omKB('01td', 'nhNgayLai') && omCachLuu('01td', 'nhTra')==='go');
   /* 4. ô theo chương trình → nút thẻ chương trình */
   omKBHop('01td', 'nhLai'); await w(300);
   ok('ô theo chương trình (lãi suất) có nút ⚙ Thẻ chương trình', /⚙ Thẻ chương trình/.test(document.getElementById('om-kbt-phai').textContent)); omKBLuu(); await w(200);
   /* 5. mọi mẫu nền ô đều có khung khai báo riêng như nhau */
   const ds = Object.keys(OM_MAU), thieu = [];
   for(const mk of ds){ omKBHop(mk); await w(250); const t = document.getElementById('hop-in').textContent; if(!/💾 Lưu/.test(t) || !/✕ Hủy/.test(t)) thieu.push(mk); dongHop(); await w(50); }
   ok('mọi mẫu nền ô ('+ds.length+' mẫu: '+ds.join(', ')+') có khai báo riêng 💾 Lưu / ✕ Hủy', ds.length>=14 && !thieu.length, thieu.join(','));
   omKBHop('09a'); await w(250); const o9 = OM_MAU['09a'].o[0]; omDatCach('09a', o9.k, 'cham'); dongHop(); await w(200);
   ok('mẫu khác (09A): đóng chưa lưu → trả lại', !((hsoLuu().cham||{})['09a']||{})[o9.k]);
   /* 6. cỡ chữ 13 / 13,5 / 14 (3.254) */
   ok('01/TD mặc định cỡ chữ thân 14 (anh 17/10); mẫu khác giữ như cũ (03/TD không bọc)', /class="om-co" style="font-size:14pt"/.test(omLap('01td', null, hsoBo()).h) && !/class="om-co"/.test(omLap('03td', null, hsoBo(), [], 'HSSV').h));
   hsoChonMau('01td'); await w(400); ok('khai báo riêng (cột trái) có chọn Cỡ chữ 13 · 13,5 · 14', /Cỡ chữ:\s*13\s*13,5\s*14/.test(document.getElementById('hso-tuy').textContent.replace(/\s+/g, ' ')));
   omCoDat('09a', 13.5); ok('chọn 13,5 cho 09A → bản in bọc cỡ 13,5; quốc hiệu giữ cỡ mẫu', /class="om-co" style="font-size:13.5pt"/.test(omLap('09a', KHO.to(hsoCH().to), hsoBo()).h) && /style="font-size:13pt">CỘNG HÒA/.test(omLap('09a', KHO.to(hsoCH().to), hsoBo()).h));
   omKBHop('09a'); await w(300); omCoDat('09a', 14); dongHop(); await w(200); ok('đổi cỡ chữ trong khung rồi đóng chưa lưu → trả lại 13,5', omCoChu('09a')===13.5);
   omCoDat('09a', 0); ok('bỏ chọn → về mặc định mẫu', omCoChu('09a')===0);
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
