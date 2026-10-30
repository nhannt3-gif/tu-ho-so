// 3.412 (anh 31/10 "tối ưu dựng trước kỳ mới nhất và tháng liền trước rồi chạy ngầm các tháng khác"): thứ tự dựng sẵn khi mở app (slNapSan)
//   ① kỳ đang dùng (kỳ chung — mặc định kỳ mới nhất) ② tháng liền trước ③ kỳ mới nhất + tháng liền trước nếu khác ④ các tháng còn lại (ngầm, nghỉ 1 giây). Vẫn giữ tới 12 tháng.
//   Bộ GIẢ tests/gianho31 (T7, T8) + bảng giả thêm (chỉ ghi chỉ mục) — toNap được thay bằng hàm ghi thứ tự.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const giuNap = toNap, giuKy = D.cauHinh.kyChung; let thu = [];
   const chay = async(bang, kyChung) => { Object.keys(SLM.bang).forEach(k=>delete SLM.bang[k]); bang.forEach(k=>SLM.bang[slKhoa('hstd', k)] = {loai:'hstd', ky:k});
     D.cauHinh.kyChung = kyChung || ''; TO_KS = {}; thu = []; window.toNap = ky=>{ thu.push(ky); TO_KS[ky] = {ky:ky}; return Promise.resolve(TO_KS[ky]); };
     SL_SAN_NAP.chay = false; slNapSan(); for(let i=0;i<200 && SL_SAN_NAP.chay;i++) await w(50); return thu.slice(); };
   let a = await chay(['2026-05','2026-06','2026-07','2026-08']);
   ok('chưa chọn kỳ: kỳ mới nhất (T8) → tháng liền trước (T7) → các tháng cũ hơn', a.join()==='2026-08,2026-07,2026-06,2026-05', a.join());
   a = await chay(['2026-05','2026-06','2026-07','2026-08','2026-09-15']);
   ok('có số liệu NGÀY mới hơn tháng: ngày 15/09 → chốt T8 → các tháng còn lại', a.join()==='2026-09-15,2026-08,2026-07,2026-06,2026-05', a.join());
   a = await chay(['2026-05','2026-06','2026-07','2026-08'], '2026-06');
   ok('đang dùng kỳ T6: T6 → T5 → kỳ mới nhất T8 → T7', a.join()==='2026-06,2026-05,2026-08,2026-07', a.join());
   const t0 = performance.now(); await chay(['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07','2026-08']);
   ok('các tháng ngoài ưu tiên dựng ngầm có nghỉ (không dồn một lúc)', performance.now()-t0 > 4000, Math.round(performance.now()-t0)+' ms');
   window.toNap = giuNap; D.cauHinh.kyChung = giuKy; Object.keys(SLM.bang).forEach(k=>delete SLM.bang[k]); TO_KS = {};
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
