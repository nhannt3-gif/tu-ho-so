// 3.456 (anh 02/11 "số tv tham dự tối thiểu 50% số thành viên tổ, chọn theo số tv tổ, tỷ lệ điều chỉnh được nhưng > 50% <= 100%; để sẵn 100%, tăng giảm được; mục III, IV và phần phê duyệt cũng cho chọn linh hoạt")
//   — 10A: số tham dự = tổ viên × tỷ lệ, IV tán thành / tham dự (> 2/3), III gõ / chọn tên trong tổ, UBND theo III, phê duyệt cả phần ✍ / 🤖. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300); pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   hsoChonMau('10a'); await w(600);
   const tx = () => HSO.x.h.replace(/<[^>]+>/g, ''), n = Math.min(OM_MAU['10a'].V(KHO.to(hsoCH().to)).tv.length, 100), L = hsoLuu();
   delete L.tl10a; delete L.tl10aBq; hsoVe(); await w(300);
   ok('mặc định 100%: số tham dự = số tổ viên', new RegExp('- '+n+' người là đại diện').test(tx()), n+' tổ viên');
   ok('IV mặc định: '+n+'/'+n+' tổ viên … tán thành', new RegExp(n+'/'+n+' tổ viên của Tổ tham dự họp biểu quyết').test(tx()));
   ok('Chọn nhanh có số tham dự (− / + tỷ lệ), III a / b, IV', ['soNguoi', 'bqlTT', 'bqlPho', 'bq'].every(k=>omNhanh('10a').indexOf(k)>=0) && !!document.querySelector('#hso-tuy [data-lenh="h10t.cong"][data-k="tl10a"]'));
   /* giảm 5% */
   const bt = document.querySelector('#hso-tuy [data-lenh="h10t.cong"][data-k="tl10a"][data-d="-5"]'); if(!bt) return o; bt.click(); await w(400);
   const y95 = Math.max(Math.floor(n/2)+1, Math.ceil(n*0.95-1e-9));
   ok('bấm − → 95%: số tham dự = làm tròn lên', L.tl10a===95 && new RegExp('- '+y95+' người là đại diện').test(tx()), y95);
   ok('IV theo số tham dự mới', new RegExp(y95+'/'+y95+' tổ viên của Tổ').test(tx()));
   /* gõ 40% → chặn về 51% */
   const ip = document.querySelector('#hso-tuy input[data-lenh="h10t.go"][data-k="tl10a"]'); ip.value = '40'; ip.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   const y51 = Math.max(Math.floor(n/2)+1, Math.ceil(n*0.51-1e-9));
   ok('gõ 40% → không nhận, đặt 51%; số tham dự > 1/2 số tổ viên', L.tl10a===51 && new RegExp('- '+y51+' người là đại diện').test(tx()) && y51>n/2, y51+' / '+n);
   /* IV tỷ lệ tán thành: chặn ≤ 2/3 */
   const ib = document.querySelector('#hso-tuy input[data-lenh="h10t.go"][data-k="tl10aBq"]'); ib.value = '60'; ib.dispatchEvent(new Event('change', {bubbles:true})); await w(400);
   const x67 = Math.max(Math.floor(y51*2/3)+1, Math.ceil(y51*0.67-1e-9));
   ok('IV gõ 60% → đặt 67%; tán thành > 2/3 số tham dự', L.tl10aBq===67 && new RegExp(x67+'/'+y51+' tổ viên của Tổ').test(tx()) && x67>y51*2/3, x67+'/'+y51);
   /* tự gõ số tham dự → IV theo số gõ */
   omDatCach('10a', 'soNguoi', 'kb'); omDatKB('10a', 'soNguoi', '9'); await w(300); hsoVe(); await w(300);
   ok('⌨ gõ số tham dự 9 → in 9, IV tán thành / 9', /- 9 người là đại diện/.test(tx()) && new RegExp(Math.max(Math.floor(18/3)+1, Math.ceil(9*0.67-1e-9))+'/9 tổ viên').test(tx()));
   omDatCach('10a', 'soNguoi', 'cham'); hsoVe(); await w(300);
   ok('✍ số tham dự để chấm → IV cũng để chấm', !/\d+\/\d+ tổ viên của Tổ/.test(tx()));
   omDatKB('10a', 'soNguoi', ''); omDatCach('10a', 'soNguoi', 'tu'); delete L.tl10a; delete L.tl10aBq;
   /* III chọn tên trong tổ → UBND theo */
   omDatCach('10a', 'bqlTT', 'kb'); hsoVe(); await w(400);
   const iTT = document.querySelector('#hso-tuy .hso-cham-o[data-ok="bqlTT"] input'), dl = iTT && document.getElementById(iTT.getAttribute('list'));
   ok('III a) ⌨: ô gõ có danh sách tên trong tổ', !!dl && dl.options.length>0, dl ? dl.options.length+' tên' : '');
   omDatKB('10a', 'bqlTT', 'Nguyễn Văn Bầu Giả'); hsoVe(); await w(300);
   ok('III a) tên mới → Phê duyệt UBND "do Ông (Bà) Nguyễn Văn Bầu Giả làm Tổ trưởng"', /a\) Ông \(Bà\): Nguyễn Văn Bầu Giả/.test(tx()) && /do Ông \(Bà\) Nguyễn Văn Bầu Giả làm Tổ trưởng/.test(tx()));
   omDatKB('10a', 'bqlTT', ''); omDatCach('10a', 'bqlTT', 'tu');
   /* phê duyệt cả phần */
   document.querySelector('#hso-tuy [data-lenh="h10t.ub"][data-c="cham"]').click(); await w(400);
   ok('Phê duyệt UBND ✍ cả phần → để chấm (giữ form)', /Chấp thuận cho Tổ TK(&amp;|&)VV tại [Tt]hôn [.…]+/.test(tx()) && /do Ông \(Bà\) [.…]+ làm Tổ trưởng/.test(tx()) && document.querySelector('#hso-tuy [data-lenh="h10t.ub"][data-c="cham"]').classList.contains('bat'));
   document.querySelector('#hso-tuy [data-lenh="h10t.ub"][data-c="in"]').click(); await w(400);
   ok('🤖 tự điền cả phần → điền lại', !/do Ông \(Bà\) [.…]+ làm Tổ trưởng/.test(tx()));
   hsoXem(); await w(2500); ok('vẫn 4 trang', document.getElementById('hso-xem-khung').contentDocument.querySelectorAll('.tr-tg').length===4);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t364 đạt'); await b.close(); process.exit(sai?1:0);
})();
