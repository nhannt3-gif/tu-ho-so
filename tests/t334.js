// 3.413 R1 (anh 31/10 "vẽ lại giao diện có làm giật lag, có cách tối ưu không" — đo B3: tab Tổ toàn PGD 2,2 s, 1 s là nạp tháng trước rồi vẽ lại cả màn):
//   cấp phạm vi (chưa chọn tổ) KHÔNG nạp tháng trước khi mở tab; chip "Ra khỏi tổ" hiện "…" → bấm mới nạp + hiện danh sách. Cấp tổ + Hồ sơ tổ giữ như cũ. Bộ GIẢ gianho31 (T7, T8).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; TO_MAP = {}; TO_BDT = null; TO_PVC = null; D.cauHinh.kyChung = '2026-08';
   doiNgan(7); slDoiTab('to'); for(let i=0;i<80 && !document.getElementById('to-cay');i++) await w(250);
   const C = toCH(); C.xa = ''; C.diem = ''; C.hoi = ''; C.ap = ''; C.to = ''; TO_LOC_PV = 'bang'; pvVeCay('to'); toVeThe(); await w(1500);
   const chip = () => [...document.querySelectorAll('#to-the .to-loc')].find(x=>/Ra khỏi tổ/.test(x.textContent));
   ok('mở tab Tổ (toàn PGD): chưa nạp tháng trước', !TO_BDT && !TO_MAP['2026-07'], 'TO_BDT '+!!TO_BDT);
   ok('chip "Ra khỏi tổ" hiện "…" + gợi ý bấm để so', !!chip() && /…/.test(chip().textContent) && /so với tháng trước/.test(chip().title||''), chip() && chip().textContent);
   chip().click(); for(let i=0;i<80 && !(TO_BDT && document.querySelector('#to-the table'));i++) await w(100); await w(300);
   ok('bấm chip → nạp tháng trước, hiện danh sách ra khỏi tổ (cột Đi đâu)', !!TO_BDT && TO_BDT.co && /Đi đâu/.test(document.getElementById('to-the').textContent), TO_BDT && TO_BDT.ky+' / '+TO_BDT.tr);
   ok('chip đếm số thật sau khi nạp', !!chip() && /\d+\s*$/.test(chip().textContent.trim()), chip() && chip().textContent);
   /* cấp tổ giữ như cũ: chọn 1 tổ → nạp TO_BD cho thẻ tổ */
   TO_LOC_PV = 'bang'; const t = Object.values(KHO.kyDung().to).find(x=>!x.trucTiep); C.xa = t.xa; C.diem = t.khoaDiem; C.to = t.ma; TO_BD = null; pvVeCay('to'); toVeThe(); for(let i=0;i<60 && !(TO_BD && TO_BD.to===t.ma);i++) await w(100);
   ok('cấp tổ (thẻ tổ, Hồ sơ tổ): vẫn nạp so tháng trước như cũ', !!TO_BD && TO_BD.to===t.ma);
   C.xa = ''; C.diem = ''; C.to = '';
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
