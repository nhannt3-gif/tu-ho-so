// 3.87 → 3.120: Mẫu 10 (sao kê chi tiết theo ngày) ĐÃ BỎ HẲN từ bản 3.120 (anh chốt) — dùng Mẫu 31 (số liệu chính) + Dư nợ chi tiết (tham chiếu số TK 105 · điểm GD).
// Phép thử cũ của chức năng Mẫu 10 giữ ở tests/t101_mau10_cu.js (chỉ chạy được với bản ≤ 3.119). Phép này kiểm Mẫu 10 đã bỏ đúng cách; chi tiết ở t123.js.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const r = await p.evaluate(async()=>{ await xongTV;
   const L = slLoai('m10');
   return {bo:!!(L && L.bo && L.nhom==='X'), hs:slLaHS('m10'), dnct:!!slLoai('dnct'), bang:Object.keys(SLM.bang).filter(k=>/^m10\|/.test(k)).length};
 });
 const ok = r.bo && !r.hs && r.dnct && !r.bang;
 console.log((ok ? '✓' : '✗')+' Mẫu 10 đã bỏ (loại X, không tính là bảng món vay, có dòng Dư nợ chi tiết, không còn bảng Mẫu 10) — '+JSON.stringify(r));
 console.log('lỗi', loi); await b.close(); process.exit(ok && !loi.length ? 0 : 1); })();
