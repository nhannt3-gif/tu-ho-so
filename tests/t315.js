// 3.394 (BAN_GIAO_TK3_2710 mục 3.3 "Tổ TK&VV: chip DS · Nợ · TK · Chia tách lên hàng thao tác"): báo cáo của tab Tổ TK&VV nằm trên hàng thao tác của bảng —
// không còn khối "Báo cáo chuẩn mới" trên đầu / hàng "Báo cáo của tổ" riêng; 🧩 Sổ tổ viên luôn có; chọn 1 tổ: 4 chip bật / tắt (chọn nhiều như cũ) + 👁 Xem mở hộp đủ báo cáo đang bật;
// điện thoại: chọn sâu tới tổ (≥ 4 ô) → hàng lọc 2 dòng, ô đọc được chữ (3.390 bóp 1 dòng). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
     kyChungDoi('2026-08'); const C = toCH(); C.xa=''; C.diem=''; C.hoi=''; C.ap=''; C.to=''; C.bc = {ds:true}; doiNgan(7); slDoiTab('to'); }, files);
   await p.waitForTimeout(2000); return p; };
 const chonTo = p=>p.evaluate(()=>{ const K=KHO.kyDung(); const m=Object.keys(K.to).find(k=>!toLaTT(K.to[k]) && K.to[k].xa && (toTV(K.to[k])||[]).length); toChonTo(m); return m; });
 const p = await mo(1440, 900, false);
 let r = await p.evaluate(()=>({dau:!!document.querySelector('#tr7 .to-dau .dk-ds'), stv:!!document.querySelector('.to-bang-nut [data-lenh="dk.mo"][data-ma="sotv"]'), chip:document.querySelectorAll('.to-bc-chip .to-chip').length}));
 ok('bảng tổ: 🧩 Sổ tổ viên trên hàng thao tác, không còn khối "Báo cáo chuẩn mới" trên đầu, chưa chọn tổ → không chip báo cáo tổ', !r.dau && r.stv && r.chip===0, JSON.stringify(r));
 await chonTo(p); await p.waitForTimeout(1200);
 r = await p.evaluate(()=>({hang:!!document.querySelector('.to-bc-dau'), chip:[...document.querySelectorAll('.to-bang-nut .to-bc-chip .to-chip')].map(x=>x.textContent.trim()+(x.classList.contains('bat') ? '*' : '')).join('|'), xem:!!document.querySelector('.to-bang-nut .to-bc-chip button'), stv:!!document.querySelector('.to-bang-nut [data-ma="sotv"]')}));
 ok('chọn tổ: hàng thao tác có Báo cáo tổ DS hộ vay* · Nợ · TK 105 · Chia tách + 👁 Xem + Sổ tổ viên; không còn hàng "Báo cáo của tổ" riêng', !r.hang && r.chip==='DS hộ vay*|Nợ|TK 105|Chia tách' && r.xem && r.stv, JSON.stringify(r));
 await p.click('.to-bc-chip .to-chip:nth-of-type(2)'); await p.click('.to-bc-chip .to-chip:nth-of-type(3)'); await p.waitForTimeout(200);
 r = await p.evaluate(()=>({bc:JSON.stringify(toCH().bc), bat:document.querySelectorAll('.to-bc-chip .to-chip.bat').length}));
 ok('bấm chip Nợ, TK 105 → bật thêm (chọn nhiều, lưu cấu hình)', r.bc==='{"ds":true,"no":true,"tk":true}' && r.bat===3, JSON.stringify(r));
 await p.click('.to-bc-chip button'); await p.waitForTimeout(2500);
 r = await p.evaluate(()=>{ const f=document.getElementById('to-khung'); const h=f && (f.trGoc||''); return {hop:!!f, ds:/DANH SÁCH/.test(h), no:/NỢ CẦN XỬ LÝ/.test(h), tk:/105/.test(h)}; });
 ok('👁 Xem → hộp xem đủ 3 báo cáo đang bật (như trước)', r.hop && r.ds && r.no && r.tk, JSON.stringify(r));
 await p.evaluate(()=>{ try{ dongHop(); }catch(e){} }); await p.close();
 const d = await mo(390, 844, true); await chonTo(d); await d.waitForTimeout(1200);
 r = await d.evaluate(()=>{ const s=[...document.querySelectorAll('#to-cay .pv-hang1 select.pv-o')]; return {n:s.length, nho:Math.round(Math.min(...s.map(x=>x.getBoundingClientRect().width))), tran:document.documentElement.scrollWidth>innerWidth+1}; });
 ok('điện thoại chọn tới tổ: ≥ 4 ô chọn, ô hẹp nhất ≥ 100 px (đọc được), không tràn ngang', r.n>=4 && r.nho>=100 && !r.tran, JSON.stringify(r));
 await d.close();
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t315 đạt'); await b.close(); process.exit(sai?1:0);
})();
