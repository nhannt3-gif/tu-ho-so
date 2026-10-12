// 3.173 (anh duyệt 12/10) — KHĐ tự tính theo ĐÚNG luật hệ thống (câu 14 "Sao kê món vay N tháng không hoạt động", N = 3):
//   MONTHS_BETWEEN kiểu Oracle, ngày GD gần nhất → ngày GN đầu khi chưa GD, dư nợ TH + QH, CT 02, khoanh + gia hạn tháng, ân hạn CT 05/07/18 · 01 SP C2 · 06, lãi suất 0;
//   bảng Kiểm tra số liệu: so với file KHĐ + liệt kê món bị loại kèm lý do. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1400,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* MONTHS_BETWEEN / ADD_MONTHS như Oracle */
   ok('MONTHS_BETWEEN: 2 ngày cuối tháng → số nguyên; cùng ngày → nguyên; khác ngày → phần /31',
     slThangGiua('2026-09-30', '2026-06-30')===3 && slThangGiua('2026-10-31', '2026-07-31')===3 && slThangGiua('2026-10-15', '2026-07-15')===3 &&
     Math.abs(slThangGiua('2026-10-31', '2026-07-30') - (3 + 1/31)) < 1e-9 && Math.abs(slThangGiua('2026-11-30', '2026-08-30') - 3) < 1e-9);
   ok('ADD_MONTHS: ngày cuối tháng → cuối tháng đích; 31/01 + 1 → 28/02', slCongThang('2026-01-31', 1)==='2026-02-28' && slCongThang('2026-06-30', 1)==='2026-07-31' && slCongThang('2026-03-15', 63)==='2031-06-15');
   const m = (ku, x) => Object.assign({ku:ku, kh:'k'+ku, ten:'Khách Giả '+ku, dn:10e6, th:10e6, qh:0, kn:0, ct:'03', ls:0.0066, ngn:'2024-01-10', ngdg:'2026-05-10', ttMon:'OPEN'}, x);
   const K = '2026-09';   /* ngày báo cáo 30/09/2026 */
   const ly = x => slKHDLy(m('X', x), K);
   ok('món quá 3 tháng không GD, còn dư nợ → vào danh sách', ly({})==='');
   ok('ngày GD gần nhất đúng 3 tháng (30/06 ↔ 30/09, cùng cuối tháng) → chưa tính', ly({ngdg:'2026-06-30'})==='gd');
   ok('chưa GD lần nào → tính từ ngày GN đầu tiên (trước 3.173 bị sót)', ly({ngdg:'', ngn:'2026-05-01'})==='' && ly({ngdg:'', ngn:'2026-07-01'})==='gd');
   ok('món đã CLOSE → loại', ly({ttMon:'CLOSE'})==='dong');
   ok('chỉ còn nợ khoanh (TH + QH = 0) → loại', ly({th:0, kn:10e6})==='du');
   ok('có nợ khoanh + gia hạn trong tháng → loại; có khoanh nhưng không gia hạn tháng → vẫn tính (đúng câu hệ thống)',
     ly({th:5e6, kn:5e6, c_gia_han_trong_thang:1e6})==='khoanh' && ly({th:5e6, kn:5e6, c_gia_han_trong_thang:0})==='');
   ok('CT 02 (HSSV) → loại', ly({ct:'02'})==='hssv');
   ok('CT 05 / 07 / 18 chưa qua 60 + 3 tháng từ ngày GN đầu → ân hạn, loại; quá → tính',
     ly({ct:'05', ngn:'2022-01-10'})==='anhan' && ly({ct:'18', ngn:'2021-06-10'})==='' && ly({ct:'07', ngn:'2021-07-10'})==='anhan');
   ok('CT 01 sản phẩm 011MC2 chưa qua 24 + 3 tháng → loại; sản phẩm khác → tính',
     ly({ct:'01', c_ma_san_pham_cu_the:'011MC2', ngn:'2024-08-01'})==='anhan' && ly({ct:'01', c_ma_san_pham_cu_the:'011MC1', ngn:'2024-08-01'})==='');
   ok('CT 06 chưa qua 6 + 3 tháng → loại', ly({ct:'06', ngn:'2026-01-05', ngdg:''})==='anhan' && ly({ct:'06', ngn:'2025-12-05', ngdg:''})==='');
   ok('lãi suất 0 → loại; file không có cột lãi suất → không xét', ly({ls:0})==='ls0' && ly({ls:undefined})==='');
   ok('kỳ theo ngày: mốc = đúng ngày số liệu', slKHDLy(m('X', {ngdg:'2026-06-15'}), '2026-09-15')==='gd' && slKHDLy(m('X', {ngdg:'2026-06-14'}), '2026-09-15')==='');
   const hs = [m('A'), m('A'), m('B', {ct:'05', ngn:'2023-01-01'}), m('C', {ngdg:'', ngn:'2026-04-01'}), m('D', {ttMon:'CLOSE', dn:0, th:0})];
   const kd = slKHDTinh(hs, K);
   ok('danh sách tự tính: không trùng món, ngày GD gần nhất thay bằng ngày GN đầu khi chưa GD', kd.map(x=>x.ku).join()==='A,C' && kd[1].ngdg==='2026-04-01', kd.map(x=>x.ku).join());
   /* bảng Kiểm tra số liệu */
   const kq = []; const them = (nhom, ten, ok2, chu, chi, cot, ds, muc) => kq.push({ten, ok:ok2, chu, ds});
   slKTTW(K, {hsTen:'Mẫu 31', co:{hstd:hs, khd:[{ku:'A', ten:'Khách Giả A', dn:10e6, qh:0}, {ku:'B', ten:'Khách Giả B', dn:10e6, qh:0}]}}, them);
   const k1 = kq.find(x=>/KHĐ app tự tính/.test(x.ten)), k2 = kq.find(x=>/được loại theo luật/.test(x.ten));
   ok('Kiểm tra số liệu: so tự tính ↔ file KHĐ, ghi lý do lệch từng món', k1 && !k1.ok && k1.ds.some(r=>r[0]==='B' && /ân hạn/.test(r[6])) && k1.ds.some(r=>r[0]==='C' && /app tính ra/.test(r[6])), k1 && k1.chu);
   ok('Kiểm tra số liệu: liệt kê món quá 3 tháng bị loại theo luật (ân hạn…)', k2 && k2.ds.length===1 && /1 món còn trong thời gian ân hạn/.test(k2.chu), k2 && k2.chu);
   return o;
 });
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
