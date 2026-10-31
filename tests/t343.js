// 3.423 (TK 1 thử đối chiếu kỳ 29/10 — hộp thư TEO_PHOI_HOP 31/10): file đối chiếu DOI_CHIEU_APP —
//   ① thu_no = Thu nợ TH + QH + khoanh tháng của MỌI khế ước Mẫu 31 (kể cả món tất nợ trong tháng), theo tổ; tổ đã đóng còn thu nợ vẫn có dòng có số;
//   ② thiếu mã xã → 6 số đầu mã ấp; ③ bỏ dòng vay trực tiếp TT| không còn dư nợ / lãi tồn / thu nợ. Bộ GIẢ gianho31 + dòng giả thêm.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; const K = await toNap('2026-08');
   const A = Object.keys(K.to).find(m=>!K.to[m].trucTiep && !toLaTT(K.to[m])), tA = K.to[A];
   const tnA0 = K.hs.filter(x=>x.to===A && x.ku).reduce((a, x)=>a+(x.tnTH||0)+(x.tnQH||0)+(x.tnK||0), 0);
   K.hs.push({ku:'6600000799990001', kh:'9900009991', to:A, xa:tA.xa, thon:tA.thon, dn:0, qh:0, kn:0, tnTH:12000000, ttMon:'CLOSE'});   /* món tất nợ trong tháng ở tổ đang hoạt động */
   K.hs.push({ku:'6600000799990002', kh:'9900009992', to:'0999999', xa:'', thon:'54007901', dn:0, qh:0, kn:0, tnTH:3000000, ttMon:'CLOSE'});   /* tổ đã đóng, còn thu nợ, thiếu mã xã */
   K.toAn = K.toAn || {}; K.toAn['0999999'] = {ma:'0999999', xa:'', thon:'54007901', dv:'12'};
   K.hs.push({ku:'6600000799990003', kh:'9900009993', to:'', xa:'540035', thon:'54009998', dn:0, qh:0, kn:0, tnTH:0});   /* vay trực tiếp toàn 0 */
   K.hs.push({ku:'6600000799990004', kh:'9900009994', to:'', xa:'', thon:'54009997', dn:0, qh:0, kn:0, tnQH:2000000});   /* vay trực tiếp còn thu nợ, thiếu mã xã */
   const d = slDCTeoTinh(K).dong, dong = k=>d.find(r=>r[0]===k);
   ok('① tổ đang hoạt động: thu_no gồm cả món tất nợ trong tháng (Mẫu 31, 1 lần / khế ước)', dong(A) && dong(A)[13]===Math.round(tnA0+12000000), dong(A) && dong(A)[13]+' / '+(tnA0+12000000));
   ok('① tổ đã đóng (bỏ khỏi cây) còn thu nợ → có dòng, thu_no 3.000.000', dong('0999999') && dong('0999999')[13]===3000000 && dong('0999999')[4]==='HPN', JSON.stringify(dong('0999999')));
   ok('② thiếu mã xã → 6 số đầu mã ấp (tổ + vay trực tiếp)', dong('0999999') && dong('0999999')[1]==='540079' && dong('TT|54009997') && dong('TT|54009997')[1]==='540099', JSON.stringify(dong('TT|54009997')));
   ok('③ bỏ dòng vay trực tiếp không còn dư nợ / lãi tồn / thu nợ; giữ dòng còn thu nợ', !dong('TT|54009998') && dong('TT|54009997') && dong('TT|54009997')[13]===2000000);
   ok('mọi dòng 17 ô, tiền đồng nguyên', d.every(r=>r.length===17 && [7,8,9,10,11,12,13].every(c=>Number.isInteger(r[c]))));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
