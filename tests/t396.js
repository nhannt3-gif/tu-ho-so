// 3.522 (anh chốt 14/11 + TK 1 so 2 mốc): A — lãi tồn trừ lãi dồn cả Mẫu 31 cuối tháng ("món đã trả lãi đến ngày GD coi như không có lãi tồn"), KTGS giải ngân cũng vậy;
// B — sổ TK 105 trên dòng KU hủy vẫn cộng vào tiền gửi (mỗi sổ 1 lần), KU hủy vẫn không thành món / tổ viên.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), fs=require('fs');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1280,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[];
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* A1: hàm — kỳ chốt tháng cũng trừ lãi dồn */
   const r = () => [{ku:'1', _ngGD:'7', ngdg:'2026-10-07', ltTH:205151, ltQH:0, ls:6.6, th:50e6}, {ku:'2', _ngGD:'7', ngdg:'2026-09-07', ltTH:410301, ltQH:0, ls:6.6, th:50e6}, {ku:'3', _ngGD:'7', ngdg:'2026-10-07', ltTH:92055, ltQH:24215045, ls:6.6, th:50e6}];
   const K = {ky:'2026-10', ngay:'2026-10-31', hs:r()}; toLaiTonNgay(K); const L = K.hs.map(laiTon);
   ok('chốt tháng 31/10: trả đúng phiên → 0; không GD → giữ; có QH → còn QH', L[0]===0 && L[1]===410301 && L[2]===24215045, L.join());
   /* dữ liệu giả */
   const tep = n => { const f = files.find(x=>x.n===n), bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
   const M8 = 'Ho_so_tin_dung_chi_tiet_31-08-2026.XLSX';
   for(const f of files){ if(f.n===M8) continue; const kq = await slDocFile(tep(f.n)); if(!kq.loi) await slGhi(kq); }
   const kq = await slDocFile(tep(M8)); const vay = kq.rows.filter(x=>x.ku && x.to && x.to!==TO_GIA && (x.dn||0)>0 && x.kh);
   const a = vay[0], mau = Object.assign({}, a);
   const moi = (x) => Object.assign({}, mau, {t105:0, stk:'', lt:undefined, ltTH:0, ltQH:0, qh:0, kn:0, th:0, gnT:0, dn:0, gn:0}, x);
   kq.rows.push(moi({kh:a.kh, ten:a.ten, to:a.to, ku:'9900000000000011', ttMon:'CLOSE', stk:'4800099991', t105:2000000}));   /* sổ riêng chỉ nằm trên dòng KU hủy */
   kq.rows.push(moi({kh:a.kh, ten:a.ten, to:a.to, ku:'9900000000000012', ttMon:'CLOSE', stk:'4800099991', t105:2000000}));   /* cùng sổ lặp lại → 1 lần */
   kq.rows.push(moi({kh:'4899999981', ten:'Khách Giả Chỉ Hủy', to:a.to, ku:'9900000000000013', ttMon:'CLOSE', stk:'4800099992', t105:700000}));
   const m = vay.find(x=>x.kh!==a.kh && x.to===a.to && !(x.qh>0)) || vay[1]; kq.rows.filter(x=>x.ku===m.ku).forEach(x=>{ x.ngdg = '2026-08-31'; x.ltTH = 123456; x.ltQH = 0; delete x.lt; });
   await slGhi(kq);
   TO_KS = {}; SL_BO = {}; const B = await slBo('2026-08');
   ok('KU hủy vẫn bị loại khỏi món', !B.co.hstd.some(x=>/^99000000000000(11|12|13)$/.test(x.ku)));
   const lh = (B.lap||[]).filter(x=>x._huy);
   ok('sổ trên dòng KU hủy giữ thành dòng lặp (không mã KU, không dư nợ)', lh.length>=3 && lh.every(x=>!x.ku && !x.dn), lh.length);
   const K8 = await toNap('2026-08'); TO_K = K8; const tv = toKhach(K8.to[a.to] || {ma:a.to}); const ka = tv.find(k=>k.kh===a.kh);
   const goc = kq.rows.filter(x=>x.kh===a.kh && x.stk!=='4800099991'); const so = {}; goc.concat(kq.lap||[]).filter(x=>x.kh===a.kh).forEach(x=>{ const s = slStk(x.stk)[0] || '_'; so[s] = Math.max(so[s]||0, +x.t105||0); });
   const truoc = Object.keys(so).filter(s=>s!=='_' || Object.keys(so).length===1).reduce((t, s)=>t+so[s], 0);
   ok('tiền gửi khách có KU hủy: cộng thêm sổ trên dòng hủy đúng 1 lần (+2.000.000)', ka && ka.t105===truoc+2000000, ka && (ka.t105+' / trước '+truoc));
   ok('khách chỉ có KU hủy: không thành tổ viên', !tv.some(k=>k.kh==='4899999981'));
   /* A2: KTGS giải ngân đọc lãi tồn đã trừ lãi dồn */
   const mm = B.co.hstd.find(x=>x.ku===m.ku), lt1 = mm && laiTon(mm); ok('thẻ tổ: món đã xét lãi dồn (3.530 xét từng món theo lãi suất)', mm && !!mm._ltNgay, mm && (mm._ltNgay+' / '+lt1));
   TO_KS = {}; SL_BO = {}; await KHO.monGN('2026-08'); const B2 = await slBo('2026-08'); const m2 = B2.co.hstd.find(x=>x.ku===m.ku);
   ok('KHO.monGN (KTGS) chạy qua toNap → lãi tồn cùng số thẻ tổ', m2 && !!m2._ltNgay && laiTon(m2)===lt1, m2 && (m2._ltNgay+' / '+laiTon(m2)+' / thẻ tổ '+lt1));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t396 đạt'); await b.close(); process.exit(sai?1:0);
})();
