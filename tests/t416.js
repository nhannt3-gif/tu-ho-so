// t416 (3.564 — anh 22/11 "ma trận dữ liệu đa chiều lấy Mẫu 31 làm chuẩn, dữ liệu nào Mẫu 31 không có thì thu thập từ các mẫu khác"): 🧮 ma trận món chuẩn (js/98 MCH).
//   Dữ liệu GIẢ gianho31. Ý: Sao kê › Bảng món chuẩn mỗi món 1 dòng, dòng 2 Excel ghi nguồn từng cột · KHĐ đúng số tự tính · tiền gửi 105 cộng mọi sổ của khách (mỗi sổ 1 lần) ·
//   khoanh lấy hiệu lực / nguyên nhân từ file Nợ khoanh · 🧩 Báo cáo của tôi có thêm cột ở cả 3 kiểu gộp và điền đúng · rút js/98 thì 🧩 vẫn chạy (cột cũ không đổi).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/98-mon-chuan\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
   await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
     const ky = KHO.dsBang('hstd').filter(e=>e.ky.length===7).map(e=>e.ky).sort().pop();
     D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
     for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await new Promise(z=>setTimeout(z, 250)); }, files);
   return p; };
 const p = await mo(false);
 let r = await p.evaluate(()=>{ const t = MCH.lap(), H = t.aoa[0], N = t.aoa[1], d = t.aoa.slice(2), B = SK_K.B, col = ten=>H.indexOf(ten);
   const mot = {}; kcGoc(B).forEach(x=>{ if(x.ku) mot[x.ku] = 1; });
   const khd = d.filter(x=>x[col('KHĐ ≥ 3 tháng')]==='Có').map(x=>x[col('Số KU')]).sort().join();
   /* khách 2 sổ 105: cộng 2 sổ */
   const so = {}; (B.hsGoc || kcGoc(B)).concat(B.lap||[]).forEach(x=>{ if(x.kh && x.stk) (so[x.kh] = so[x.kh] || {})[x.stk] = +x.t105||0; });
   const k2 = Object.keys(so).find(k=>Object.keys(so[k]).length>1), tong = k2 ? Object.values(so[k2]).reduce((a, v)=>a+v, 0) : 0;
   const dong2 = k2 ? d.find(x=>x[col('Mã KH')]===k2) : null;
   const nk = Object.keys(B.nk).map(k=>B.nk[k]).find(x=>x.nhl), dnk = nk ? d.find(x=>x[col('Số KU')]===nk.ku) : null;
   return {coBC:SK_BC.some(x=>x.k==='mch' && x.nhom==='kh'), n:d.length, nMon:Object.keys(mot).length, nguon:N[0]==='Nguồn' && N[col('Hiệu lực khoanh')]==='file Nợ khoanh' && N[col('Dư nợ')]==='Mẫu 31',
     khd, khdTinh:Object.keys(B.khd).sort().join(), k2:!!k2, t105:dong2 ? dong2[col('Tiền gửi 105 (khách)')] : null, tong,
     nhl:dnk ? dnk[col('Hiệu lực khoanh')]===ngayVNsl(nk.nhl) && dnk[col('Nguyên nhân khoanh')]===(nk.nn||'') : false, tieu:t.tieuDe}; });
 ok('Sao kê › Khách hàng: Bảng món chuẩn — mỗi món 1 dòng, dòng 2 Excel ghi nguồn từng cột', r.coBC && r.n===r.nMon && r.n>0 && r.nguon && /BẢNG MÓN CHUẨN/.test(r.tieu), JSON.stringify({n:r.n, nMon:r.nMon, nguon:r.nguon}));
 ok('cột KHĐ ≥ 3 tháng = đúng các món app tự tính từ Mẫu 31', !!r.khdTinh && r.khd===r.khdTinh, r.khd+' | '+r.khdTinh);
 ok('tiền gửi 105 của khách = cộng mọi sổ (mỗi sổ 1 lần)', r.k2 && r.t105===r.tong && r.tong>0, JSON.stringify({t105:r.t105, tong:r.tong}));
 ok('khoanh: hiệu lực + nguyên nhân lấy từ file Nợ khoanh (khóa Số KU)', r.nhl);
 /* 🧩 Báo cáo của tôi */
 r = await p.evaluate(()=>{ const ctx = {S:skCH(), K:SK_K, B:SK_K.B}, ra = {};
   ['mon', 'kh', 'to'].forEach(g=>{ const ds = btDong({gop:g, loc:['conNo'], cot:[]}, ctx); ra[g] = {n:ds.length, cot:BT_COT[g].filter(c=>/^mc_/.test(c.k)).map(c=>c.k), co:ds.length && BT_COT[g].filter(c=>/^mc_/.test(c.k)).every(c=>c.k in ds[0])}; });
   const ds = btDong({gop:'mon', loc:['conNo'], cot:[]}, ctx), khd = ds.filter(x=>x.mc_khd==='Có').length;
   const kh = btDong({gop:'kh', loc:['conNo'], cot:[]}, ctx).filter(x=>x.mc_khd).length;
   return {ra, khd, kh, nKHD:Object.keys(SK_K.B.khd).length}; });
 ok('🧩 Báo cáo của tôi: thêm cột bổ sung ở cả 3 kiểu gộp (món · khách · tổ), dòng có đủ trường', ['mon', 'kh', 'to'].every(g=>r.ra[g].cot.length>0 && r.ra[g].co) && r.ra.mon.cot.length===11 && r.ra.to.cot.length===3, JSON.stringify(r.ra));
 ok('🧩 cột KHĐ: từng món "Có" đúng số món KHĐ; từng khách ghi số món', r.khd===r.nKHD && r.kh>0 && r.kh<=r.khd, JSON.stringify(r));
 /* rút js/98 */
 const q = await mo(true);
 r = await q.evaluate(()=>{ const ds = btDong({gop:'mon', loc:['conNo'], cot:[]}, {S:skCH(), K:SK_K, B:SK_K.B}); return {mch:typeof MCH, n:ds.length, cot:BT_COT.mon.some(c=>/^mc_/.test(c.k)), bc:SK_BC.some(x=>x.k==='mch')}; });
 ok('rút js/98: 🧩 Báo cáo của tôi vẫn chạy, không còn cột / báo cáo mới', r.mch==='undefined' && r.n>0 && !r.cot && !r.bc, JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t416 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
