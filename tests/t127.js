// 3.125 — giữ sẵn số liệu nhiều tháng trong phiên: nạp ngầm (mới nhất trước), chuyển tháng không nạp lại, bỏ tháng lâu không xem (giữ tháng mới nhất),
//        điện thoại chỉ tháng mới nhất, nạp lại 1 tháng thì bỏ bản đã dựng của tháng đó. Bộ GIẢ: tests/gia31 (Mẫu 31 T8 chép thành T5, T6 — số liệu giả).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const mk = (b64, n) => { const bin=atob(b64), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
   for(const f of files){ const kq = await slDocFile(mk(f.b, f.n)); if(!kq.loi) await slGhi(kq); }
   const m31 = files.find(f=>/31-08-2026\.XLSX$/.test(f.n));
   const b8 = await docFile(slIDB('hstd', '2026-08')); for(const k of ['2026-05', '2026-06']){ await luuFile(slIDB('hstd', k), b8); SLM.bang[slKhoa('hstd', k)] = Object.assign({}, SLM.bang[slKhoa('hstd', '2026-08')], {ky:k}); }   /* chép bảng T8 thành T5, T6 (giả) */
   const thang = Object.values(SLM.bang).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort(); if(thang.length<4){ ok('bộ giả có 4 tháng Mẫu 31', false, thang.join(', ')); return o; }
   ok('bộ giả có 4 tháng Mẫu 31', thang.length===4, thang.join(', '));
   ok('máy tính: mặc định giữ 12 tháng; điện thoại 2 (mới nhất + đang xem)', slGiuToiDa()===12 && (()=>{ const g = laDT; laDT = ()=>true; const v = slGiuToiDa(); laDT = g; return v===2; })());
   /* 1. nạp ngầm khi vào tab Số liệu */
   TO_KS = {}; SL_BO = {}; slNapSan.da = 0; D.cauHinh.slTab = 'nap'; doiNgan(7); await w(200);
   for(let i=0;i<120 && !(slNapSan.da && !SL_SAN_NAP.chay && SL_SAN_NAP.tong);i++) await w(250);
   ok('vào tab Số liệu → nạp ngầm đủ 4 tháng, chip ⚡ báo tiến độ', thang.every(k=>!!TO_KS[k]) && SL_SAN_NAP.xong===4 && /nạp sẵn/.test((document.getElementById('sl-san')||{}).textContent||''), Object.keys(TO_KS).join(', '));
   /* 2. chuyển tháng không nạp lại */
   let doc = 0; const goc = slDocBang; slDocBang = function(){ doc++; return goc.apply(this, arguments); };
   const t0 = performance.now(); for(const k of thang){ await toNap(k); await slBo(k); } const ms = performance.now()-t0;
   ok('chuyển qua lại 4 tháng: lấy sẵn, không đọc lại bảng nào', doc===0, Math.round(ms)+' ms');
   slDocBang = goc;
   /* 3. giới hạn + bỏ tháng lâu không xem, giữ tháng mới nhất */
   D.cauHinh.slGiu = '2'; await toNap(thang[1]); SL_DUNG[thang[1]] = Date.now()+5; slBot(TO_KS); slBot(SL_BO);
   ok('giới hạn 2 tháng → giữ tháng mới nhất + tháng vừa xem, bỏ tháng lâu không xem', Object.keys(TO_KS).sort().join()===[thang[1], thang[3]].join() && !!SL_BO[thang[3]], Object.keys(TO_KS).join(', '));
   D.cauHinh.slGiu = 'all'; ok('chọn "Tất cả" → không giới hạn', slGiuToiDa()>=999); delete D.cauHinh.slGiu;
   /* 4. nạp lại tháng → bỏ bản đã dựng của tháng đó */
   await toNap(thang[3]); await thNap(thang[3]); ok('đã có sẵn tháng mới nhất (cây tổ + tổng hợp)', !!TO_KS[thang[3]] && !!TH_KS[thang[3]]);
   const kq = await slDocFile(mk(m31.b, m31.n)); await slGhi(kq);
   ok('nạp lại Mẫu 31 tháng đó → bỏ bản đã dựng (cây tổ, tổng hợp) để lần sau dựng theo file mới', !TO_KS[thang[3]] && !SL_BO[thang[3]] && !TH_KS[thang[3]]);
   /* 5. điện thoại: chỉ nạp sẵn tháng mới nhất */
   const g = laDT; laDT = ()=>true; TO_KS = {}; SL_BO = {}; SL_SAN_NAP.chay = false; await slNapSan(); laDT = g;
   ok('điện thoại: nạp sẵn chỉ tháng mới nhất', Object.keys(TO_KS).join()===thang[3], Object.keys(TO_KS).join(', '));
   D.cauHinh.slTab = 'nap'; veSoLieu(); await w(150);
   ok('đầu tab Số liệu (máy tính) có ô "⚡ Giữ sẵn 12 tháng / Tất cả"', !!document.querySelector('.sl-giu select'));
   TO_KS = {}; SL_BO = {}; SL_SAN_NAP.chay = false; await slNapSan(); veSoLieu(); await w(150);
   ok('3.126: đầu tab Số liệu báo tháng đang giữ', /Đang giữ 4 tháng: T8, T7, T6, T5/.test((document.getElementById('sl-giu-ds')||{}).textContent||''), (document.getElementById('sl-giu-ds')||{}).textContent);
   slNapLai(); ok('3.126: ↻ Nạp lại → bỏ bản đang giữ rồi nạp lại ngầm', SL_SAN_NAP.chay && !TO_KS[thang[0]] && !!document.querySelector('button[onclick="slNapLai()"]'));
   for(let i=0;i<120 && SL_SAN_NAP.chay;i++) await w(250); ok('3.126: nạp lại xong đủ 4 tháng', thang.every(k=>!!TO_KS[k]));
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
