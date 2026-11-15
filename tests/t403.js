// t403 (3.546 A1, anh 15/11 "code cả 2" — docs/DANH_GIA_CHUYEN_GIA_1511.md đợt 1): 🧪 Kiểm mốc vàng.
//   Dữ liệu GIẢ (tests/gianho31). Đáp án vàng = file đối chiếu app tự lập lúc thử (thay cho file thật trên Drive) → so khớp tuyệt đối;
//   sửa 1 ô / bớt 1 dòng đáp án → ❌ đúng số chỗ lệch; ngày không có trong kho → báo nạp; tên file đáp án → đúng mốc; nút 🧪 cạnh 📤.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } } }, files);
 let r = await p.evaluate(()=>({tach:JSON.stringify(MVG.tach('a,"b,c","""d"""," e "')), gom:JSON.stringify(MVG.gom([{ten:'VANG_DOI_CHIEU_APP_2026-10-31.csv', chu:'x'}, {ten:'VANG_DOI_CHIEU_MON_APP_2026-10-31.csv', chu:'y'}, {ten:'khac.csv', chu:'z'}])), nut:/mvg\.mo/.test(slDCNut('2026-08')) && /sldc\.xuat/.test(slDCNut('2026-08'))}));
 ok('tách CSV có ngoặc kép · gom tên file đáp án theo ngày · nút 🧪 nằm cạnh 📤', r.tach==='["a","b,c","\\"d\\"","e"]' && r.gom==='[{"ngay":"2026-10-31","f1":"x","f2":"y"}]' && r.nut, JSON.stringify(r));
 const ky = await p.evaluate(()=>Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>e.loai==='hstd').map(e=>e.ky).sort().pop());
 const T = await p.evaluate(async(ky)=>{ const K = await toNap(ky); const t = await MVG.tinh(K.ngay); return {ngay:K.ngay, f1:t && t.f1, f2:t && t.f2}; }, ky);
 ok('tính lại File 1 + File 2 đúng ngày mốc từ kho ('+T.ngay+')', !!T.f1 && !!T.f2 && T.f1.split('\n').length>3, T.ngay);
 /* ① khớp tuyệt đối (dòng # khác giờ xuất vẫn khớp) */
 r = await p.evaluate(async(T)=>{ const f1 = T.f1.replace(/xuất lúc=[^·]*/, 'xuất lúc=khác '); const kq = await MVG.chay([{ngay:T.ngay, f1, f2:T.f2}]); const h = document.getElementById('hop').textContent; dongHop(); return {lech:kq[0].lech.length, n1:kq[0].n1, n2:kq[0].n2, xanh:/✅ Mốc .*: khớp/.test(h)}; }, T);
 ok('đáp án = bản này → ✅ khớp tuyệt đối (bỏ qua dòng # giờ xuất)', r.lech===0 && r.n1>0 && r.xanh, JSON.stringify(r));
 /* ② sửa 1 ô dư nợ + bớt 1 dòng món */
 r = await p.evaluate(async(T)=>{ const L = T.f1.split('\r\n'), c = MVG.tach(L[1]), i = c.indexOf('du_no'); const d = MVG.tach(L[2]); d[i] = String(+d[i]+1000); L[2] = d.join(',');
   const M2 = T.f2.split('\r\n'); const bo = M2.length>3 ? M2.splice(2, 1) : [];
   const kq = await MVG.chay([{ngay:T.ngay, f1:L.join('\r\n'), f2:M2.join('\r\n')}]); const h = document.getElementById('hop').textContent; dongHop();
   return {lech:kq[0].lech.map(l=>l.bang+'/'+l.cot+'/'+l.vang+'/'+l.nay), bo:bo.length, do:(/2 chỗ lệch/.test(h) || (bo.length===0 && /1 chỗ lệch/.test(h))) && !!document.querySelector('#hop details')}; }, T);
 ok('sửa 1 ô dư nợ tổ + bớt 1 món ở đáp án → ❌ đúng 2 chỗ (tổ/du_no · món/(dòng) thừa)', r.do && r.lech.length===(1+r.bo) && /^tổ\/du_no\//.test(r.lech[0]) && (r.bo===0 || /^món\/\(dòng\)\/không có\/có$/.test(r.lech[1])), JSON.stringify(r));
 /* ③ ngày không có trong kho */
 r = await p.evaluate(async()=>{ const kq = await MVG.chay([{ngay:'2020-01-31', f1:'# x\r\nkhoa\r\n', f2:''}]); const h = document.getElementById('hop').textContent; dongHop(); return {thieu:kq[0].thieuKho, bao:/chưa có số liệu ngày này/.test(h)}; });
 ok('mốc không có trong kho máy → báo nạp Mẫu 31 ngày đó (không báo khớp)', r.thieu && r.bao, JSON.stringify(r));
 /* ④ không có đáp án */
 r = await p.evaluate(async()=>{ const c = bao; let t = ''; bao = x=>{ t = x; }; await MVG.chay([]); bao = c; return t; });
 ok('chưa có đáp án → báo chỗ đặt file VANG_DOI_CHIEU_APP_<ngày>.csv', /Mốc vàng/.test(r), r);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t403 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
