// 3.396 (anh 28/10, ảnh Tra cứu KH › Tìm theo Tổ trưởng: "làm bộ lọc và sắp xếp của các cột này") — js/77-bang-loc.js (cắm rút):
// bấm tiêu đề cột sắp xếp ▲ / ▼ / về gốc; hàng lọc dưới tiêu đề (Tổ trưởng · Mã tổ gõ; TV · Có DN mức = 0 · > 0 · ngưỡng; Xã · Ấp · Hội chọn);
// dòng Cộng tính theo dòng đang hiện; vẽ lại bảng (gõ tìm) vẫn giữ lọc / xếp; rút js/77 → bảng như cũ, không lỗi. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(rut)=>{ const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/77-bang-loc\.js/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
     kyChungDoi('2026-08'); doiNgan(7); slDoiTab('tra'); }, files);
   await p.waitForTimeout(1500); await p.evaluate(()=>{ const c=document.querySelector('.tc-theo [data-k="tt"]'); if(c) c.click(); }); await p.waitForTimeout(1200); return p; };
 const bang = p=>p.evaluate(()=>{ const t=document.querySelector('.tc-to-ds'); if(!t) return null; const r=[...t.tBodies[0].rows].filter(x=>!x.hidden);
   return {n:r.length, tong:t.tBodies[0].rows.length, ten:r.map(x=>x.cells[0].textContent.trim()), tv:r.map(x=>+x.cells[2].textContent.trim()), xa:r.map(x=>x.cells[4].textContent.trim()), dau:(document.querySelector('.tc-to-dau')||{}).textContent||'', hoi:r.map(x=>x.cells[5].textContent.trim()),
     cong:t.tFoot.rows[0].cells[0].textContent, congTV:+t.tFoot.rows[0].cells[2].textContent, loc:!!t.querySelector('tr.bl-loc')}; });
 const p = await mo(false);
 let r = await bang(p);
 ok('bảng tổ có hàng lọc dưới tiêu đề (6 cột — 3.416.1 bỏ cột Xã)', r && r.loc && r.n===r.tong && r.n>10, r && r.n);
 ok('3.416.1 đầu khung ghi phạm vi + số tổ "… (n tổ)"', /\(\d+ tổ\)/.test(r.dau), r.dau);
 await p.click('.tc-to-ds thead tr:first-child th:nth-child(3)'); r = await bang(p);
 ok('bấm tiêu đề TV → xếp tăng ▲', r.tv.every((v, i, a)=>!i || a[i-1]<=v) && await p.evaluate(()=>document.querySelector('.tc-to-ds thead th:nth-child(3)').classList.contains('bl-tang')), r.tv.slice(0, 5).join(','));
 await p.click('.tc-to-ds thead tr:first-child th:nth-child(3)'); r = await bang(p);
 ok('bấm lần 2 → giảm ▼', r.tv.every((v, i, a)=>!i || a[i-1]>=v));
 await p.click('.tc-to-ds thead tr:first-child th:nth-child(3)'); const goc = await bang(p);
 ok('bấm lần 3 → về thứ tự gốc (Xã › Ấp › Tên)', !await p.evaluate(()=>!!document.querySelector('.tc-to-ds thead .bl-tang, .tc-to-ds thead .bl-giam')));
 await p.click('.tc-to-ds thead tr:first-child th:nth-child(1)'); r = await bang(p);
 ok('xếp theo tên tổ trưởng (chữ Việt)', r.ten.every((v, i, a)=>!i || a[i-1].localeCompare(v, 'vi', {numeric:true})<=0));
 const xa0 = goc.xa[0]; await p.selectOption('.tc-to-ds tr.bl-loc th:nth-child(5) select', xa0); r = await bang(p);
 ok('lọc Ấp → chỉ dòng của ấp đó; Cộng n tổ + tổng TV theo dòng đang hiện', r.n>0 && r.n<r.tong && r.xa.every(x=>x===xa0) && r.cong==='Cộng '+r.n+' tổ' && r.congTV===r.tv.reduce((a, x)=>a+x, 0), JSON.stringify({n:r.n, cong:r.cong, tv:r.congTV}));
 const hoi0 = r.hoi[0]; await p.selectOption('.tc-to-ds tr.bl-loc th:nth-child(6) select', hoi0); r = await bang(p);
 ok('lọc thêm Hội → kết hợp Ấp + Hội', r.n>0 && r.xa.every(x=>x===xa0) && r.hoi.every(x=>x===hoi0), r.n);
 await p.selectOption('.tc-to-ds tr.bl-loc th:nth-child(6) select', ''); await p.selectOption('.tc-to-ds tr.bl-loc th:nth-child(5) select', '');
 await p.selectOption('.tc-to-ds tr.bl-loc th:nth-child(3) select', 'duoi'); r = await bang(p);
 ok('lọc TV "< 20 (dưới ngưỡng)"', r.tv.every(x=>x<20) && r.n===goc.tv.filter(x=>x<20).length, r.n);
 await p.selectOption('.tc-to-ds tr.bl-loc th:nth-child(3) select', ''); await p.fill('.tc-to-ds tr.bl-loc th:nth-child(1) input', goc.ten[0].split(' ').pop().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')); r = await bang(p);
 ok('ô lọc Tổ trưởng gõ không dấu → khớp', r.n>0 && r.ten.includes(goc.ten[0]), r.n);
 await p.evaluate(()=>{ const i=document.getElementById('sl-tim'); i.value = ''; i.dispatchEvent(new Event('input', {bubbles:true})); }); await p.waitForTimeout(800); r = await bang(p);
 ok('vẽ lại bảng (gõ ô tìm) → vẫn giữ lọc', r && r.n>0 && r.n<r.tong && await p.evaluate(()=>!!document.querySelector('.tc-to-ds tr.bl-loc th:nth-child(1) input').value));
 await p.close();
 const q = await mo(true); r = await bang(q);
 ok('rút js/77 → bảng như cũ (không hàng lọc), không lỗi', r && !r.loc && r.n===r.tong && r.n>10, r && r.n); await q.close();
 ok('không lỗi trang', !loi.length, loi.slice(0, 2).join(' | '));
 o.forEach(x=>console.log(x)); const sai = o.filter(x=>x[0]==='✗').length; console.log(sai ? '✗ '+sai+' sai' : '✓ t317 đạt'); await b.close(); process.exit(sai?1:0);
})();
