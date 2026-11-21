// t410 (3.558 C2, anh 21/11 "làm C2 … code và gộp"): 📋 Phiếu chuẩn bị phiên GD — Sao kê, mỗi điểm 1 trang.
//   Dữ liệu GIẢ (gianho31). Ý: có trong danh sách báo cáo nhóm Nợ đến hạn · mỗi điểm trong phạm vi 1 trang dọc · ngày phiên đúng ngày GDXA kế tiếp ·
//   mục II–III KHỚP sao kê nợ đến hạn gốc (cùng khoảng, lọc đúng tổ của điểm — tổng số món các điểm = sao kê toàn PGD) · mục IV có / "Không có" · không đổi C.tu / C.den của anh.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const w = t=>new Promise(r=>setTimeout(r, t));
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } } }, files);
 const r = await p.evaluate(async()=>{ const w = t=>new Promise(r=>setTimeout(r, t));
   const ky = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd' && e.ky.length===7).map(e=>e.ky).sort().pop();
   D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.tu = '2000-01-01'; C.den = '2000-01-02'; veSaoKe();
   for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await w(250);
   const coBC = SK_BC.some(b=>b.k==='pph' && b.nhom==='dh');
   let ts = PPH.lap(); const ns = KHO.bang('hstd', SK_K.thang).ngay, hom = ngayISO(nay());
   /* dữ liệu giả không có món đến hạn trong khoảng → cho 3 món của điểm đầu đến hạn 2 ngày trước phiên (sửa trong bộ nhớ, không ghi kho) */
   const d0 = ttDuLieu()[0], set0 = {}; d0.hoi.forEach(g=>g.to.forEach(z=>{ if(z.t) set0[z.t.ma] = 1; }));
   const ngP0 = ts[0].ngP, han = PPH.sau(ngP0, -2) < PPH.sau(ns) ? PPH.sau(ns) : PPH.sau(ngP0, -2);
   kcGoc(skMau31()).filter(o=>set0[toMaCua(o)] && o.ku && (o.dn||0)>0 && !(o.qh>0) && !(o.kn>0)).slice(0, 3).forEach(o=>{ o.dhg = han; o.dhgh = ''; });
   ts = PPH.lap();
   const dsDiem = ttDuLieu();
   /* sao kê gốc: cùng khoảng của trang 1, toàn phạm vi, không lọc điểm */
   const t0 = ts[0], tu = PPH.sau(ns), den = t0.ngP;
   C.tu = tu; C.den = den; const N = skNen31('dh'); const goc = skBCDH(N.rows, N.lapKH, N.M, N.e31, N.ngay); C.tu = '2000-01-01'; C.den = '2000-01-02';
   const dem = h=>(h.match(/— (\d+) món<\/div>/g)||[]).reduce((s, x)=>s+(+x.match(/(\d+) món/)[1]), 0);
   /* tổng món các điểm (chỉ điểm cùng ngày phiên với trang 1) = sao kê gốc lọc theo tổ các điểm đó */
   const cung = ts.filter(t=>t.ngP===den), set = {}; dsDiem.filter((d, i)=>ts[i].ngP===den).forEach(d=>d.hoi.forEach(g=>g.to.forEach(z=>{ if(z.t) set[z.t.ma] = 1; })));
   C.tu = tu; C.den = den; const goc2 = skBCDH(N.rows.filter(o=>set[toMaCua(o)]), N.lapKH, N.M, N.e31, N.ngay); C.tu = '2000-01-01'; C.den = '2000-01-02';
   return {coBC, n:ts.length, nDiem:dsDiem.length, ngP:ts.map(t=>t.ngP), gd:dsDiem.map(d=>d.ngayGD), hom, ns, tieu:t0.tieuDe, html4:/IV\. Tổ cần chú ý/.test(t0.html), demCung:cung.reduce((s, t)=>s+dem(t.html), 0), demGoc2:dem(goc2.html), demGoc:dem(goc.html), giuC:C.tu==='2000-01-01' && C.den==='2000-01-02', motTrangAoa:Array.isArray(t0.aoa) && t0.aoa.length>1}; });
 ok('báo cáo "Phiếu chuẩn bị phiên GD" ở nhóm Nợ đến hạn; mỗi điểm 1 trang', r.coBC && r.n===r.nDiem && r.n>0 && /PHIẾU CHUẨN BỊ PHIÊN GIAO DỊCH — ĐIỂM GD/.test(r.tieu), JSON.stringify({n:r.n, nDiem:r.nDiem, tieu:r.tieu}));
 const dungNgay = r.ngP.every((n, i)=>{ const d = parseInt(r.gd[i], 10); if(!d) return n===''; const goc = r.hom > r.ns ? r.hom : null; return n && +n.slice(8)===Math.min(d, new Date(+n.slice(0,4), +n.slice(5,7), 0).getDate()) && (!goc || n>=goc); });
 ok('ngày phiên = ngày GDXA kế tiếp của điểm (≥ hôm nay / sau ngày số liệu)', dungNgay, JSON.stringify({ngP:r.ngP, gd:r.gd, hom:r.hom, ns:r.ns}));
 ok('mục II–III khớp sao kê nợ đến hạn gốc (có món: tổng món các điểm cùng phiên = sao kê gốc lọc đúng tổ các điểm đó, ≤ toàn PGD)', r.demCung>=3 && r.demCung===r.demGoc2 && r.demCung<=r.demGoc, JSON.stringify({cung:r.demCung, goc2:r.demGoc2, goc:r.demGoc}));
 ok('có mục IV Tổ cần chú ý; xuất Excel có dòng; không đổi khoảng ngày anh đang chọn', r.html4 && r.motTrangAoa && r.giuC, JSON.stringify(r).slice(0, 200));
 /* màn xem */
 const xem = await p.evaluate(async()=>{ skChonBC('pph'); await new Promise(z=>setTimeout(z, 1500)); const f = document.getElementById('sk-xem-khung'); const d = f && (f.contentDocument || {}); return {co:!!f, trang:d.querySelectorAll ? d.querySelectorAll('.trang').length : -1}; });
 ok('chọn báo cáo → màn xem hiện các trang phiếu', xem.co && xem.trang>=1, JSON.stringify(xem));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t410 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
