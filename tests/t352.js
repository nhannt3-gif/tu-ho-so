// 3.436 QT-C-03 (anh chốt 01/11): Mẫu 31 THEO NGÀY — món đã giao dịch ở phiên gần nhất của điểm → lãi tồn chỉ còn phần QH (bỏ lãi TH tính dồn); chốt tháng không đổi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
 const R = await p.evaluate(async()=>{ await xongTV; const o=[]; const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   ok('phiên gần nhất: 30/10, GD ngày 07 → 07/10', toPhienGan('2026-10-30', '7')==='2026-10-07');
   ok('phiên gần nhất: 05/10, GD ngày 07 → 07/09 (chưa tới phiên tháng này)', toPhienGan('2026-10-05', '7')==='2026-09-07');
   ok('phiên gần nhất: ngày 30 tháng 2 → cuối tháng', toPhienGan('2026-03-01', '30')==='2026-02-28' && toPhienGan('2026-03-31', '30')==='2026-03-30');
   const r = () => [
     {ku:'1', _ngGD:'7', ngdg:'2026-10-07', ltTH:205151, ltQH:0},        // trả đúng phiên 07/10 → 0
     {ku:'2', _ngGD:'7', ngdg:'2026-09-07', ltTH:410301, ltQH:0},        // không GD phiên 07/10 → giữ
     {ku:'3', _ngGD:'7', ngdg:'2026-10-07', ltTH:92055, ltQH:24215045},  // trả phiên nhưng có lãi QH → còn QH
     {ku:'4', _ngGD:'', ngdg:'2026-10-07', ltTH:50000, ltQH:0},          // trực tiếp (không ngày GD điểm) → giữ
     {ku:'5', _ngGD:'7', ngdg:'2026-10-07', ltTH:0, ltQH:0, lt:777}];    // Mẫu 10 có cột lt → giữ
   const K = {ky:'2026-10-30', ngay:'2026-10-30', hs:r()}; toLaiTonNgay(K); const L = K.hs.map(laiTon);
   ok('theo ngày: trả đúng phiên → lãi tồn 0', L[0]===0, L[0]);
   ok('theo ngày: không giao dịch ở phiên → giữ TH + QH', L[1]===410301, L[1]);
   ok('theo ngày: trả phiên nhưng có lãi quá hạn → còn phần QH', L[2]===24215045, L[2]);
   ok('món trực tiếp / dòng có cột lãi tồn riêng → không đổi', L[3]===50000 && L[4]===777);
   ok('đếm số món đã bỏ lãi dồn', K.ltNgay===2, K.ltNgay);
   toLaiTonNgay(K); ok('chạy lại không đổi thêm', K.hs.map(laiTon).join()===L.join());
   const K2 = {ky:'2026-09', ngay:'2026-09-30', hs:r()}; toLaiTonNgay(K2);
   ok('chốt tháng: 3.522 (anh chốt 14/11) cũng bỏ lãi dồn — trả phiên → 0, có QH → còn QH', laiTon(K2.hs[0])===0 && laiTon(K2.hs[2])===24215045);
   /* 3.527 (TK 1 so TW BC0438): chốt tháng THẬT (món đã GD ở phiên hầu hết lãi TH = 0) → không bỏ gì; ngày phiên theo cột Ngày GDXA của dòng */
   const c = () => [{ku:'a', _ngGD:'7', ngdg:'2026-09-07', ltTH:0, ltQH:0}, {ku:'b', _ngGD:'7', ngdg:'2026-09-07', ltTH:0, ltQH:0}, {ku:'c', _ngGD:'7', ngdg:'2026-09-07', ltTH:55000, ltQH:0}, {ku:'d', _ngGD:'7', ngdg:'2026-08-07', ltTH:410301, ltQH:0}];
   const K3 = {ky:'2026-09', ngay:'2026-09-30', hs:c()}; toLaiTonNgay(K3);
   ok('3.527 chốt tháng thật (1/3 món đã GD còn TH) → giữ nguyên, không bỏ lãi dồn', laiTon(K3.hs[2])===55000 && K3.ltNgay===0 && K3.ltDon && !K3.ltDon.theoNgay, JSON.stringify(K3.ltDon));
   const K4 = {ky:'2026-10', ngay:'2026-10-31', hs:[{ku:'x', ngayGD:'15', _ngGD:'13', ngdg:'2026-10-14', ltTH:30000, ltQH:0}, {ku:'y', ngayGD:'15', _ngGD:'13', ngdg:'2026-10-15', ltTH:20000, ltQH:0}, {ku:'z', ngayGD:'15', _ngGD:'13', ngdg:'2026-10-16', ltTH:9000, ltQH:0}]};
   toLaiTonNgay(K4);
   ok('3.527 ngày phiên theo Ngày GDXA của dòng (15) — GD 14/10 (trước phiên 15) giữ TH; GD 15, 16/10 → bỏ', laiTon(K4.hs[0])===30000 && laiTon(K4.hs[1])===0 && laiTon(K4.hs[2])===0, K4.hs.map(laiTon).join());
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t352 đạt'); await b.close(); process.exit(sai?1:0);
})();
