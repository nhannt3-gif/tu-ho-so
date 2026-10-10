// 3.147 — Thanh bên điều hướng (đợt F, anh duyệt 10/10/2026): máy tính ≥ 1100 px có thanh bên, ẩn thanh tab ngang + tab con Số liệu;
//        mỗi mục mở đúng màn + tô đúng (cả lối cũ doiNgan / slDoiTab); thu gọn 60 px nhớ qua lần mở; < 1280 px tự thu; < 1100 px giữ tab ngang;
//        số đếm (chờ duyệt, file bắt buộc thiếu, thùng rác); Alt+số; in không có thanh bên; nền tối. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const ctx = await b.newContext({viewport:{width:1536,height:730}});
 const mo = async (vp) => { const p = await ctx.newPage(); if(vp) await p.setViewportSize(vp); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500); await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} }); return p; };
 const p = await mo();
 const r = await p.evaluate(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)), o={};
   try{ localStorage.removeItem('tb_gon'); }catch(e){} dhVe();
   const tb = document.getElementById('thanh-ben'), hien = e => !!e && getComputedStyle(e).display!=='none' && e.getBoundingClientRect().width>0;
   o.coTB = hien(tb) && Math.round(tb.getBoundingClientRect().width); o.anTab = !hien(document.getElementById('hangngan'));
   o.muc = Array.from(tb.querySelectorAll('.tb-ds > a .chu')).map(x=>x.textContent).join(',');
   const bam = async k => { tb.querySelector('a[data-m="'+k+'"]').click(); await w(500); return {ngan:nganHienTai, sl:D.cauHinh.slTab, bat:(tb.querySelector('a.bat')||{}).getAttribute ? tb.querySelector('a.bat').getAttribute('data-m') : ''}; };
   o.van = await bam('1'); o.nap = await bam('nap'); o.to = await bam('to'); o.tc = await bam('th'); o.bm = await bam('5'); o.hn = await bam('0');
   slDoiTab('sk'); doiNgan(7); await w(400); o.cuSK = tb.querySelector('a.bat').getAttribute('data-m');
   o.anCon = !hien(document.querySelector('#tr7 .sl-con'));
   doiNgan(2); await w(300); o.cuThang = tb.querySelector('a.bat').getAttribute('data-m');
   /* số đếm */
   D.cho = [{id:'c1', nhom:'vanBan'}, {id:'c2', nhom:'vanBan'}]; D.rac = [{id:'r1', nhom:'vanBan', xoaLuc:new Date().toISOString()}];
   const K = '2026-09'; ['hstd','dnct','dsto'].forEach(l=>{ SLM.bang[slKhoa(l, K)] = {loai:l, ky:K, ngay:'2026-09-30', soDong:1, luc:'2026-10-01T00:00:00Z', tong:{n:1, dn:1}}; });
   dhTo(); o.demVB = (tb.querySelector('a[data-m="1"] .so')||{}).textContent; o.demNap = (tb.querySelector('a[data-m="nap"] .so')||{}).textContent; o.demRac = (tb.querySelector('.tb-chan .so')||{}).textContent;
   /* công cụ */
   doiNgan(1); await w(200); tb.querySelector('.tb-cc a').click(); await w(400); o.cc = nganHienTai+'|'+CC.mo;
   /* Alt+3 → Nạp & KT */
   document.dispatchEvent(new KeyboardEvent('keydown', {key:'3', altKey:true, bubbles:true})); await w(400); o.alt = nganHienTai+'|'+D.cauHinh.slTab;
   /* thu gọn */
   tb.querySelector('.tb-gon-nut').click(); await w(200); o.gon = Math.round(tb.getBoundingClientRect().width)+'|'+localStorage.getItem('tb_gon')+'|'+!hien(tb.querySelector('a .chu'));
   o.dauCao = Math.round(document.querySelector('.dau').getBoundingClientRect().height);
   return o; });
 await p.emulateMedia({media:'print'}); r.inAn = await p.evaluate(()=>getComputedStyle(document.getElementById('thanh-ben')).display==='none' && getComputedStyle(document.body).paddingLeft==='0px'); await p.emulateMedia({media:'screen'});
 ok('màn 1536: có thanh bên 216 px, ẩn thanh tab ngang', r.coTB===216 && r.anTab, r.coTB+' · '+r.anTab);
 ok('thanh bên đủ mục: 3 mục chính + 5 Số liệu + 3 Hồ sơ', r.muc==='Hôm nay,Văn bản,Nạp & KT,Tổng hợp,Sao kê,Tổ TK&VV,KTGS Hội,Tra cứu KH,Biểu mẫu,Scan,Thư viện', r.muc);
 ok('bấm Văn bản / Nạp & KT / Tổ / Tổng hợp / Biểu mẫu / Hôm nay → đúng màn + tô đúng', r.van.ngan===1 && r.van.bat==='1' && r.nap.ngan===7 && r.nap.sl==='nap' && r.nap.bat==='nap' && r.to.sl==='to' && r.to.bat==='to' && r.tc.bat==='th' && r.bm.ngan===5 && r.bm.bat==='5' && r.hn.ngan===0 && r.hn.bat==='0', JSON.stringify([r.van, r.nap, r.to, r.tc, r.bm, r.hn]));
 ok('lối cũ (slDoiTab + doiNgan) vẫn tô đúng mục; tab con Số liệu ẩn', r.cuSK==='sk' && r.anCon);
 ok('lối cũ doiNgan(2) (tab Tháng cũ) → tô Nạp & KT', r.cuThang==='nap');
 ok('số đếm: Văn bản 2 chờ duyệt · Nạp & KT ⚠ 6 file bắt buộc thiếu · Thùng rác 1', r.demVB==='2' && /6/.test(r.demNap||'') && r.demRac==='1', [r.demVB, r.demNap, r.demRac].join(' · '));
 ok('Công cụ trên thanh bên → mở ở cột Công cụ của Hôm nay', r.cc==='0|hssv', r.cc);
 ok('Alt+3 → Nạp & KT', r.alt==='7|nap', r.alt);
 ok('bấm « → thu 60 px, nhớ (tb_gon=1), ẩn chữ', /^60\|1\|true$/.test(r.gon), r.gon);
 ok('đầu trang 1 hàng (≤ 60 px)', r.dauCao<=60, r.dauCao+' px');
 ok('in: thanh bên ẩn, nội dung không lề trái', r.inAn);
 /* mở lại app: nhớ thu gọn */
 const p2 = await mo(); const g2 = await p2.evaluate(()=>document.body.classList.contains('tb-gon') && Math.round(document.getElementById('thanh-ben').getBoundingClientRect().width));
 ok('mở lại app: vẫn thu gọn', g2===60, g2);
 await p2.evaluate(()=>{ localStorage.removeItem('tb_gon'); }); await p2.close();
 /* 1200 px: chưa chọn → tự thu */
 const p3 = await mo({width:1200, height:700}); const g3 = await p3.evaluate(()=>Math.round(document.getElementById('thanh-ben').getBoundingClientRect().width)); ok('màn 1200 (chưa chọn): tự thu 60 px', g3===60, g3); await p3.close();
 /* 1000 px + iPhone: không thanh bên, tab ngang còn, không tràn ngang */
 for(const [vp, ten] of [[{width:1000, height:700}, '1000 px'], [{width:390, height:844}, 'iPhone 390']]){
   const q = await mo(vp); const x = await q.evaluate(()=>({tb:getComputedStyle(document.getElementById('thanh-ben')).display, tab:getComputedStyle(document.getElementById('hangngan')).display, tran:document.documentElement.scrollWidth>window.innerWidth+1, pad:getComputedStyle(document.body).paddingLeft}));
   ok(ten+': không thanh bên, còn thanh tab ngang, không tràn ngang', x.tb==='none' && x.tab!=='none' && !x.tran && x.pad==='0px', JSON.stringify(x)); await q.close(); }
 /* nền tối */
 const pt = await b.newPage({viewport:{width:1536,height:730}, colorScheme:'dark'}); await pt.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(pt);
 await pt.goto('file://'+path.resolve(__dirname,'..','index.html')); await pt.waitForTimeout(1500);
 const nen = await pt.evaluate(()=>getComputedStyle(document.getElementById('thanh-ben')).backgroundColor); ok('nền tối (máy tự chọn): thanh bên màu tối', nen==='rgb(18, 41, 62)', nen);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = o.filter(x=>x[0]==='✗').length; console.log((o.length-sai)+'/'+o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
