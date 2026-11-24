// t415 (3.563 — anh 22/11 "các loại sao kê nợ quá hạn, nợ khoanh, món vay 3 tháng KHĐ em phải tính được từ Mẫu 31, còn các file … chỉ để tham khảo đối chiếu"
//   + "làm thêm chức năng nợ quá hạn đã chuyển trong tháng, ngày chuyển"). Dữ liệu GIẢ (gianho31: Mẫu 31 + file NQH, NK, mẫu 14 tháng 8).
//   Ý: QH / khoanh / KHĐ app dùng = tính từ Mẫu 31 (không lấy file) · khoanh lấy ngày hiệu lực + nguyên nhân từ file NK · sao kê ghi "tính từ Mẫu 31" + đối chiếu file ·
//   Kiểm tra có mục đối chiếu từng món NQH / NK · báo cáo Nợ chuyển QH trong tháng: món chuyển QH > 0, ngày chuyển, đã thu hết, "Mới" sau lần nạp trước, tóm tắt Xã › Hội.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } } }, files);
 let r = await p.evaluate(async()=>{ const w = t=>new Promise(z=>setTimeout(z, t));
   const ky = KHO.dsBang('hstd').filter(e=>e.ky.length===7).map(e=>e.ky).sort().pop();
   D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
   for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await w(250);
   const B = SK_K.B, hs = B.co.hstd, mot = {}; hs.forEach(x=>{ if(x.ku && !mot[x.ku]) mot[x.ku] = x; }); const M = Object.keys(mot).map(k=>mot[k]);
   /* gianho31 không có món QH → gán QH cho 2 món (trong bộ nhớ) rồi tính lại như lúc dựng kỳ */
   M.filter(x=>(x.dn||0)>0 && !(x.kn>0)).slice(0, 2).forEach((x, i)=>{ x.qh = 1000000*(i+1); x.c_ngay_cnqh_gan_nhat = ky+'-0'+(i+3); }); slNoGan(B);
   const qh = M.filter(x=>(x.qh||0)>0).map(x=>x.ku).sort().join(), kn = M.filter(x=>(x.kn||0)>0).map(x=>x.ku).sort().join();
   const ds = L=>slDsNo(B, L).map(x=>x.ku).sort().join();
   const fNK = {}; (B.co.nk||[]).forEach(x=>{ fNK[x.ku] = x; }); const chung = slDsNo(B, 'nk').filter(x=>fNK[x.ku] && fNK[x.ku].nhl);
   return {ky, tinh:!!B.tinh, coFile:!!(B.co.nqh && B.co.nk && B.co.khd), qhOK:ds('nqh')===qh && !!qh, knOK:ds('nk')===kn && !!kn, tinhLa:!!slDsNo(B, 'nqh')[0] && slDsNo(B, 'nqh')[0]._tinh===1 && slDsNo(B, 'nqh')[0].ncqh===ky+'-03',
     khdOK:slKHD(B)===B.khdTinh, mapOK:Object.keys(B.nqh).sort().join()===qh && Object.keys(B.khd).length===B.khdTinh.length,
     nhl:chung.length>0 && chung.every(x=>x.nhl===fNK[x.ku].nhl && (x.nn||'')===(fNK[x.ku].nn||'')), nChung:chung.length}; });
 ok('QH / khoanh / KHĐ app dùng = tính từ Mẫu 31 (kể cả khi có file NQH, NK, mẫu 14)', r.tinh && r.coFile && r.qhOK && r.knOK && r.tinhLa && r.khdOK && r.mapOK, JSON.stringify(r));
 ok('nợ khoanh: ngày hiệu lực + nguyên nhân lấy từ file Nợ khoanh (Mẫu 31 không có)', r.nhl, JSON.stringify(r));
 /* sao kê + kiểm tra đối chiếu */
 r = await p.evaluate(()=>{ const q = skBaoCao('qh'), k = skBaoCao('kh'), d = skBaoCao('khd'), it = [];
   slKTTW(SK_K.ky, SK_K.B, function(n, ten, dat, tom){ it.push(ten+' | '+tom); });
   return {q:q.ngay, qh:/Tính từ Mẫu 31 · đối chiếu file/.test(q.html), kh:/tính từ Mẫu 31/.test(k.ngay) && /đối chiếu file/.test(k.html), khd:/tính từ Mẫu 31/.test(d.ngay), rong:/Chưa nạp file/.test(q.html+k.html+d.html),
     it:it.filter(x=>/tính từ Mẫu 31 ↔ file/.test(x))}; });
 ok('sao kê QH / khoanh / KHĐ ghi "tính từ Mẫu 31" + dòng đối chiếu file; không còn "Chưa nạp file"', r.qh && r.kh && r.khd && !r.rong && /tính từ Mẫu 31/.test(r.q), JSON.stringify(r).slice(0, 300));
 ok('Nạp & KT › Kiểm tra: có mục đối chiếu từng món NQH và NK (tính · file · khớp)', r.it.length===2 && r.it.every(x=>/tính \d+ · file \d+ · khớp \d+ món/.test(x)), JSON.stringify(r.it));
 /* nợ chuyển QH trong tháng */
 r = await p.evaluate(()=>{ const B = SK_K.B, ng = KHO.bang('hstd', SK_K.thang).ngay, th = ng.slice(0, 7);
   const M = kcGoc(skMau31()).filter(x=>x.ku && (x.dn||0)>0 && skTrongPV(x)); const a = M[0], b2 = M[1], c = M[2];
   a.cqh = 5000000; a.qh = 5000000; a.c_ngay_cnqh_gan_nhat = th+'-05';
   b2.cqh = 3000000; b2.qh = 0; b2.c_ngay_cnqh_gan_nhat = th+'-20';
   c.cqh = 2000000; c.qh = 1000000; c.c_ngay_cnqh_gan_nhat = th+'-25';
   const g = KHO.dsBang; KHO.dsBang = function(l){ const d = g.apply(this, arguments); return l==='hstd' ? d.concat([{loai:'hstd', ky:th+'-15', ngay:th+'-15'}]) : d; };
   let t; try{ t = CQH.lap(); } finally { KHO.dsBang = g; }
   const R = CQH.ds(M, ng); return {coBC:SK_BC.some(x=>x.k==='cqh' && x.nhom==='xl'), n:R.ds.length, truoc:R.truoc, ku:R.ds.map(d=>d.ku), ngay:R.ds.map(d=>d.ncqh), ghi:R.ds.map(d=>d.ghi),
     abc:[a.ku, b2.ku, c.ku], html:t.html, tieu:t.tieuDe, aoa:t.aoa.length}; });
 ok('báo cáo "Nợ chuyển quá hạn trong tháng" ở nhóm Nợ cần xử lý, chỉ món chuyển QH > 0, xếp theo ngày chuyển', r.coBC && r.ku.join()===r.abc.join() && r.ngay[0]<r.ngay[1] && /NỢ CHUYỂN QUÁ HẠN TRONG THÁNG/.test(r.tieu), JSON.stringify(r).slice(0, 300));
 ok('món thu hết vẫn hiện "Đã thu hết"; thu bớt ghi số đã thu; cột Nguyên nhân + tóm tắt Xã › Hội', r.ghi[1]==='Đã thu hết' && /Đã thu 1\.000\.000/.test(r.ghi[2]) && /Nguyên nhân/.test(r.html) && /Xã \/ Hội/.test(r.html) && r.aoa>5, JSON.stringify(r.ghi));
 ok('"Mới" = chuyển QH sau ngày Mẫu 31 nạp liền trước trong tháng (2 món sau ngày 15 · tô nền)', /<b>2 món mới<\/b>/.test(r.html) && /Mới · Đã thu hết/.test(r.html) && (r.html.match(/class="nb"/g)||[]).length===2, (r.html.match(/\d+ món mới[^<]*/)||[''])[0]);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t415 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
