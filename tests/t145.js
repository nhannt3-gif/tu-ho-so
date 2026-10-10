// 3.149 — Kỳ + phạm vi CHUNG (anh chốt ý 6b, 6c — docs/KE_HOACH_GON_GIAO_DIEN.md):
//   1 ô Kỳ ở đầu trang phủ mọi tab (Tổ, Sao kê, KTGS, Tổng hợp, Nạp & KT); bỏ ô "Số liệu" + ⟳ Làm mới + chip "Đang dùng" từng tab;
//   phạm vi xã › điểm › hội › tổ dùng chung; cây chọn 2 hàng (hàng chip chỉ của cấp kế tiếp); bỏ cảnh báo "Thông tin tổ trưởng thiếu tổ";
//   KTGS: bỏ dòng "Nạp và kiểm tra … ở tab", chip BC thiếu có nút 📥 nạp. Bộ GIẢ tests/gianho31 (Mẫu 31 T7 + T8…).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await w(300); kyChungVe();
   const sel = document.getElementById('ky-chung-o');
   ok('đầu trang có ô Kỳ chung (cạnh ô tìm), có T8 và T7', !!sel && !!sel.closest('.dau') && [...sel.options].some(x=>x.value==='2026-08') && [...sel.options].some(x=>x.value==='2026-07'), sel && [...sel.options].map(x=>x.value).join(','));
   /* các tab không còn ô chọn kỳ riêng */
   const coRieng = {};
   for(const t of ['to','sk','kt','th']){ slDoiTab(t); doiNgan(7); for(let i=0;i<40 && !document.querySelector('#tr7 .pv-cay .pv-hang1');i++) await w(250); await w(300);
     coRieng[t] = !!document.querySelector('#tr7 select[data-ky]') || /Đang dùng:/.test(document.getElementById('tr7').textContent) || [...document.querySelectorAll('#tr7 label')].some(l=>/^Số liệu/.test(l.textContent.trim())); }
   ok('Tổ, Sao kê, KTGS, Tổng hợp: không còn ô "Số liệu [kỳ]" / chip "Đang dùng" riêng', !Object.values(coRieng).some(Boolean), JSON.stringify(coRieng));
   /* đổi kỳ chung → mọi tab theo */
   kyChungDoi('2026-07'); await w(300);
   ok('đổi kỳ chung T7 → Tổ, Sao kê, KTGS, Tổng hợp cùng T7; ma trận Nạp chọn T7', toCH().ky==='2026-07' && skCH().ky==='2026-07' && ktCH().ky==='2026-07' && thCH().ky==='2026-07' && SL_KY==='2026-07');
   slDoiTab('to'); doiNgan(7); for(let i=0;i<60 && !(TO_K && TO_K.ky==='2026-07');i++) await w(250);
   ok('tab Tổ mở số liệu T7', TO_K && TO_K.ky==='2026-07');
   kyChungDoi('2026-08'); await w(300);
   /* phạm vi chung */
   slDoiTab('to'); doiNgan(7); for(let i=0;i<60 && !(TO_K && TO_K.ky==='2026-08' && document.getElementById('to-xa'));i++) await w(250); await w(300);
   const xa = pvLuaChon(TO_K.to, toCH(), 'xa')[0].k; pvChon('to', 'xa', xa); await w(300);
   ok('chọn xã ở tab Tổ → Sao kê, KTGS, Tổng hợp, Tra cứu cùng xã đó', skCH().xa===xa && ktCH().xa===xa && thCH().xa===xa && tcCH().xa===xa, xa);
   ok('dữ liệu lưu: phạm vi chung ở D.cauHinh.pvChung', D.cauHinh.pvChung && D.cauHinh.pvChung.xa===xa);
   /* cây chọn 2 hàng */
   const cay = document.getElementById('to-cay');
   ok('cây chọn: hàng 1 (ô chọn nối ›) + hàng 2 chip của cấp kế tiếp (điểm GD), không còn chip xã', !!cay.querySelector('.pv-hang1') && cay.querySelectorAll('.pv-hang2').length===1 && ![...cay.querySelectorAll('.pv-hang2 .to-chip')].some(c=>c.textContent==='PGD'), [...cay.querySelectorAll('.pv-hang2 .to-chip')].map(c=>c.textContent).slice(0, 3).join(' | '));
   ok('cây chọn tối đa 2 hàng (cao ≤ 80 px)', cay.getBoundingClientRect().height <= 80, Math.round(cay.getBoundingClientRect().height)+' px');
   const diem = pvLuaChon(TO_K.to, toCH(), 'diem')[0].k; pvChon('to', 'diem', diem); await w(200);
   const to = pvLuaChon(TO_K.to, toCH(), 'to')[0].k; pvChon('to', 'to', to); await w(300);
   ok('chọn tới tổ → hết hàng chip', !document.querySelector('#to-cay .pv-hang2'));
   pvChon('to', 'xa', ''); await w(200);
   ok('bỏ chọn xã → về Toàn PGD, hàng chip là các xã (có PGD)', toCH().xa==='' && toCH().to==='' && [...document.querySelectorAll('#to-cay .pv-hang2 .to-chip')][0].textContent==='PGD');
   /* KTGS */
   slDoiTab('kt'); doiNgan(7); for(let i=0;i<60 && !document.getElementById('kt-cay');i++) await w(250); await w(500);
   const kt = document.getElementById('tr7').textContent;
   ok('KTGS: không còn dòng "Nạp và kiểm tra BC0437 / BC0438 ở tab"; chip BC thiếu có nút 📥 nạp', !/Nạp và kiểm tra BC0437/.test(kt) && !!document.querySelector('.kt-bc-nap'));
   ok('KTGS: không còn cảnh báo "File Thông tin tổ trưởng … thiếu … tổ"', !/Thông tin tổ trưởng[^.]*thiếu/.test(kt));
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
