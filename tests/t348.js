// 3.429 (anh chốt K4 / QT-C-15, 01/11) — kiểm tra 30 ngày sau giải ngân: chọn Tất cả (mặc định) / Lần 1 (Ngày GN đầu tiên trong tháng).
//   Dữ liệu GIẢ dựng tay vào KT_GN: 1 món lần 1 + 1 món HSSV lần 2 cùng tổ cùng tháng + 1 món thiếu ngày GN đầu.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const th = '2026-09', t = {ma:'9990000001', ten:'Tổ giả', tenThon:'Ấp giả', tenXa:'Xã giả', xa:'99999', dv:'12'};
   const mon = [{ku:'1000000001', kh:'100001', ten:'Khách A', ngn:'2026-09-10', gnT:50e6, dn:50e6},
                {ku:'1000000002', kh:'100002', ten:'Khách B', ngn:'2024-09-05', gnT:10e6, dn:30e6, ct:'HSSV'},
                {ku:'1000000003', kh:'100003', ten:'Khách C', ngn:'', gnT:5e6, dn:5e6}];
   window.KT_GN = {khoa:'gia', thang:[th], thieu:[], ds:{[th]:{[t.ma]:{t:t, mon:mon}}}, ngay:{}, kh:{}};
   window.ktGNTrongPV = () => true;
   const C = ktCH(), giu = C.gnLan; C.gnLan = '';
   const dem = ktGNDem(); ok('đếm: Tất cả 3 · Lần 1 1 · thiếu ngày 1', dem.tat===3 && dem.lan1===1 && dem.khong===1, JSON.stringify(dem));
   const soMon = () => ktGNTo().reduce((s, x)=>s+x.mon.length, 0);
   ok('mặc định (Tất cả) = mọi món GN như cũ: 3 món', soMon()===3, soMon());
   C.gnLan = '1'; ok('Lần 1 = chỉ món có Ngày GN đầu tiên trong tháng: 1 món', soMon()===1 && ktGNTo()[0].mon[0].ku==='1000000001');
   ok('ktGNLan1: HSSV lần 2 không tính', !ktGNLan1(mon[1], th) && ktGNLan1(mon[0], th) && !ktGNLan1(mon[2], th));
   const h = ktGNDsHTML();
   ok('màn có 2 chip Tất cả (3) / Lần 1 (1), Lần 1 đang bật', /Tất cả \(3\)/.test(h) && /gd-chip bat"[^>]*data-k="1"|bat" data-lenh="ktgn.lan" data-k="1"/.test(h), (h.match(/<button[^>]*ktgn\.lan[^>]*>[^<]*/g)||[]).join(' | '));
   ok('ghi chú theo lựa chọn Lần 1', /giải ngân LẦN 1/.test(h));
   ok('báo món thiếu Ngày GN đầu tiên', /1 món thiếu Ngày GN đầu tiên/.test(h));
   C.gnLan = ''; const h2 = ktGNDsHTML(); ok('Tất cả: ghi chú cũ (kể cả HSSV lần 2)', /kể cả HSSV nhận tiền lần 2/.test(h2));
   C.gnLan = '1'; window.KT_GN.ds[th][t.ma].mon = [mon[1]]; ok('Lần 1 mà tổ không có món lần 1 → không có phiếu', ktGNTo().length===0);
   C.gnLan = '1'; window.KT_GN.ds[th][t.ma].mon = mon; const dv = document.createElement('div'); dv.id = 'kt-gn'; document.body.appendChild(dv); dv.innerHTML = ktGNDsHTML();
   dv.querySelector('[data-lenh="ktgn.lan"][data-k="tat"]').click(); ok('bấm chip Tất cả (lệnh GD) → đổi lựa chọn + vẽ lại', C.gnLan==='' && /gd-chip bat"[^>]*data-k="tat"/.test(dv.innerHTML));
   dv.remove(); C.gnLan = giu; return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t348 đạt'); await b.close(); process.exit(sai?1:0);
})();
