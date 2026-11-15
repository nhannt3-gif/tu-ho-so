// 3.526 (anh 14/11 "tinh chỉnh lại tại sao chọn file tổ cũ"): dsChonKy chọn File Tổ trưởng theo NGÀY — bản chốt tháng (ky 'YYYY-MM') = cuối tháng,
// trùng ngày ưu tiên bản chốt; trước xếp chữ nên '2026-10' đứng trước '2026-10-25' → kỳ chốt T10 lấy nhầm bản ngày 30/10 → file đối chiếu bị chặn (QT-C-09).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
 const R = await p.evaluate(async()=>{ await xongTV; const o=[]; const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const giu = SLM.bang; const e = ky => ({loai:'dsto', ky, tong:{rieng:1}});
   SLM.bang = {a:e('2026-09'), b:e('2026-10-25'), c:e('2026-10-29'), d:e('2026-10-30'), f:e('2026-10')};
   ok('kỳ chốt T10 → bản chốt tháng 10 (không phải bản ngày 30/10)', dsChonKy('2026-10')==='2026-10', dsChonKy('2026-10'));
   ok('kỳ ngày 29/10 → bản ngày 29/10', dsChonKy('2026-10-29')==='2026-10-29', dsChonKy('2026-10-29'));
   ok('kỳ ngày 26/10 → bản ngày 25/10 (mới nhất ≤ ngày kỳ)', dsChonKy('2026-10-26')==='2026-10-25', dsChonKy('2026-10-26'));
   SLM.bang.g = e('2026-10-31'); ok('trùng ngày 31/10 (bản ngày + bản chốt) → bản chốt', dsChonKy('2026-10')==='2026-10', dsChonKy('2026-10'));
   delete SLM.bang.f; delete SLM.bang.g; ok('tháng chỉ có bản ngày → bản ngày mới nhất (30/10)', dsChonKy('2026-10')==='2026-10-30', dsChonKy('2026-10'));
   ok('kỳ chốt T9 → bản chốt T9', dsChonKy('2026-09')==='2026-09', dsChonKy('2026-09'));
   SLM.bang = giu; return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t399 đạt'); await b.close(); process.exit(sai?1:0);
})();
