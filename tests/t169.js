// 3.203 (kế hoạch B1) — GOM LƯU: luu() hẹn ghi 300 ms (nhiều lần gọi → 1 lần ghi), luuNgay() ghi ngay; rời trang / ẩn app / tải lại không mất;
//   bộ nhớ đầy vẫn báo như cũ; xóa sạch máy không bị ghi lại; dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], R=[];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const ctx=await b.newContext(); const p=await ctx.newPage({viewport:{width:1366,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 const url='file://'+path.resolve(__dirname,'..','index.html');
 await p.goto(url); await p.waitForTimeout(1500);
 const X = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); const o={};
   luuNgay(); const ls = () => JSON.parse(localStorage.getItem('tuhoso_v1')||'{}');
   let dem = 0; const goc = Storage.prototype.setItem; Storage.prototype.setItem = function(k, v){ if(k==='tuhoso_v1') dem++; return goc.apply(this, arguments); };
   for(let i=0;i<10;i++){ D.cauHinh.thuGom = i; luu(); }
   o.chuaGhi = dem===0 && ls().cauHinh.thuGom===undefined; await w(450);
   o.gom = dem; o.giaTri = ls().cauHinh.thuGom;
   D.cauHinh.thuNgay = 'x'; luuNgay(); o.ngay = ls().cauHinh.thuNgay==='x' && !LUU_HEN;
   dem = 0; D.cauHinh.thuAn = 1; luu(); Object.defineProperty(document, 'visibilityState', {value:'hidden', configurable:true}); document.dispatchEvent(new Event('visibilitychange'));
   o.an = dem===1 && ls().cauHinh.thuAn===1; delete document.visibilityState;
   let chDem = 0; const chGoc = window.chTheoDoi; window.chTheoDoi = function(){ chDem++; return chGoc.apply(this, arguments); };
   for(let i=0;i<5;i++) luu(); await w(450); o.chTheoDoi = chDem; window.chTheoDoi = chGoc;
   Storage.prototype.setItem = function(k){ if(k==='tuhoso_v1'){ const e = new Error('đầy'); e.name='QuotaExceededError'; throw e; } return goc.apply(this, arguments); };
   let baoL = ''; const bl = window.baoLoi; window.baoLoi = function(t){ baoL = t; };
   o.dayNgan = luuNgay()===true && !baoL; await LN.xong(); await w(50); o.dayNgan = o.dayNgan && !baoL && localStorage.getItem('tuhoso_ln_cho')!==null;   /* 3.223 M8: lưu theo ngăn → dữ liệu ở IndexedDB, không báo lỗi */
   goc.call(localStorage, 'tuhoso_luu', 'cu'); o.day = luuNgay()===false && /bộ nhớ trình duyệt đã đầy/.test(baoL); localStorage.removeItem('tuhoso_luu'); window.baoLoi = bl;   /* cách cũ: báo như trước */
   Storage.prototype.setItem = goc;
   D.cauHinh.thuRoi = 'roi'; luu(); await w(400); o.hetCho = localStorage.getItem('tuhoso_ln_cho')===null && JSON.parse(localStorage.getItem('tuhoso_v1')).cauHinh.thuRoi==='roi'; D.cauHinh.thuRoi = 'roi'; luu(); return o; });
 ok('10 lần gọi luu() sát nhau → chưa ghi ngay, sau 300 ms ghi đúng 1 lần, giá trị cuối', X.chuaGhi && X.gom===1 && X.giaTri===9, X.gom+' lần · '+X.giaTri);
 ok('luuNgay() ghi ngay, hủy hẹn', X.ngay);
 ok('ẩn app (visibilitychange) khi còn hẹn → ghi ngay', X.an);
 ok('chTheoDoi (so cài đặt đồng bộ Drive) chạy 1 lần cho 5 lần gọi', X.chTheoDoi===1, X.chTheoDoi);
 ok('3.223 M8 — bộ nhớ đầy, lưu theo ngăn → không báo lỗi, dữ liệu ở IndexedDB, đánh dấu đọc IndexedDB lần mở sau', X.dayNgan);
 ok('bộ nhớ đầy, cách lưu cũ (công tắc quay lại) → vẫn báo "bộ nhớ trình duyệt đã đầy", trả false', X.day);
 ok('localStorage có chỗ lại → ghi lại bản đủ, bỏ dấu chờ', X.hetCho);
 await p.reload(); await p.waitForTimeout(1500);
 const roi = await p.evaluate(async()=>{ await xongTV; return D.cauHinh.thuRoi; });
 ok('đổi xong tải lại trang ngay (chưa tới 300 ms) → không mất (ghi khi rời trang)', roi==='roi', roi);
 const xs = await p.evaluate(async()=>{ D.cauHinh.thuXoa = 1; luu(); luuHuy(); window.LUU_KHOA_XOA = 1; localStorage.removeItem('tuhoso_v1'); luu(); luuNgay(); return localStorage.getItem('tuhoso_v1'); });
 ok('đang xóa sạch máy → không ghi lại dữ liệu', xs===null);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
