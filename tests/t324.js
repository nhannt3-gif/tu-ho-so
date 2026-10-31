// 3.404 (anh chốt 28/10 — Tèo QT-C-12): ngày chuyển quá hạn theo phiên của điểm GD — ưu tiên cột hệ thống "Ngày ĐH theo GDXA";
//   trống → món qua tổ = phiên đầu tiên của điểm KỂ TỪ ngày đến hạn (sau gia hạn), món trực tiếp = ngay sau ngày đến hạn; hệ thống lệch lịch điểm → ⚠ báo.
//   Ví dụ trong QUY_TAC_SO_LIEU: ĐH 10, điểm ngày 05 → 05 tháng sau; tổ Gia Lộc 2 sang Gia Lộc (ngày 23), ĐH 10/11 → 23/11; HĐ 10/06 gia hạn 10/12, điểm 05 → 05/01.
//   Bộ GIẢ tests/gianho31 (gắn o._ngGD khi dựng cây).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   ok('ĐH 10/11, điểm ngày 05 → 05/12', skPhienTu('2026-11-10', 5)==='2026-12-05');
   ok('gộp điểm: ĐH 10/11, Gia Lộc ngày 23 → 23/11', skPhienTu('2026-11-10', 23)==='2026-11-23');
   ok('trùng ngày phiên → chính phiên đó (23/11 → 23/11)', skPhienTu('2026-11-23', 23)==='2026-11-23');
   ok('điểm ngày 30, tháng 2 → ngày cuối tháng 2', skPhienTu('2026-02-10', 30)==='2026-02-28' && skPhienTu('2026-01-31', 30)==='2026-02-28', skPhienTu('2026-01-31', 30));
   const m = (x) => Object.assign({ku:'K', to:'0900001', dhg:'2026-06-10', _ngGD:'5'}, x);
   ok('gia hạn: HĐ 10/06 gia hạn 10/12, điểm 05 → 05/01 năm sau (tính)', JSON.stringify(skCQH(m({dhgh:'2026-12-10'})))==='{"d":"2027-01-05","cach":"tinh"}', JSON.stringify(skCQH(m({dhgh:'2026-12-10'}))));
   ok('có cột hệ thống → dùng cột hệ thống', skCQH(m({dhgd:'2026-07-05'})).d==='2026-07-05' && skCQH(m({dhgd:'2026-07-05'})).cach==='ht' && !skCQH(m({dhgd:'2026-07-05'})).lech);
   const L = skCQH(m({dhg:'2026-11-10', dhgd:'2026-12-07', _ngGD:'23'}));
   ok('hệ thống ghi ngày 07 (điểm cũ) nhưng điểm hiện tại ngày 23 → ⚠ lệch, giữ ngày hệ thống, gợi ý 23/11', L.d==='2026-12-07' && L.lech && L.tinh==='2026-11-23' && /⚠ điểm hiện tại: 23\/11\/2026/.test(skCQHChu(m({dhg:'2026-11-10', dhgd:'2026-12-07', _ngGD:'23'}))), JSON.stringify(L));
   ok('món vay trực tiếp (không tổ) → ngay sau ngày đến hạn', JSON.stringify(skCQH({ku:'T', to:'', dhg:'2026-11-30'}))==='{"d":"2026-12-01","cach":"tt"}' && /\(trực tiếp\)/.test(skCQHChu({ku:'T', to:'', dhg:'2026-11-30'})));
   ok('không có ngày GD điểm, cột trống → chưa có', skCQH(m({_ngGD:''})).d==='' && skCQHChu(m({_ngGD:''}))==='(chưa có)');
   /* nhóm Sao kê nợ đến hạn: ĐH 20/11, điểm 05 → chuyển QH 05/12 = kỳ sau (khung ③) khi xem tháng 11 */
   ok('nhóm đến hạn: tính được ngày → khung ③ "chuyển QH kỳ sau" (trước: chưa có ngày → khung ②)', skNhomDH(m({dhg:'2026-11-20'}), '2026-11-01', '2026-11-30', '2026-10-31')===3 && skNhomDH(m({dhg:'2026-11-20', _ngGD:'25'}), '2026-11-01', '2026-11-30', '2026-10-31')===2);
   /* dựng cây gianho31: món có tổ được gắn ngày GD điểm */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; const K = await toNap('2026-08');
   const coTo = K.hs.filter(x=>x.to && x.to!==TO_GIA && K.to[x.to] && K.to[x.to].ngayGD), gan = coTo.filter(x=>x._ngGD===String(+K.to[x.to].ngayGD));
   ok('toNap gắn o._ngGD = ngày GD điểm của tổ cho mọi món có tổ', coTo.length>0 && gan.length===coTo.length, gan.length+'/'+coTo.length);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
