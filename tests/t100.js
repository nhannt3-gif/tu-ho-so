// 3.86 — Mẫu 31 (175 cột, GIẢ: tests/gia31 = taogia.py 25000 tests/gia31 m31): nhận đúng loại, gộp khế ước trùng, món tất toán, khách chỉ gửi TK,
// công thức dư nợ tháng trước + phát sinh, tab con Tra cứu KH (SĐT, khế ước đã tất toán), ô tìm chung ở tab Số liệu → nhảy tab
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1366,height:800}}); const loi=[]; p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const ten = fs.readdirSync(dir);
 await p.evaluate(()=>{ const i=document.createElement('input'); i.type='file'; i.multiple=true; i.id='xx'; document.body.appendChild(i); });
 await p.setInputFiles('#xx', ten.map(n=>path.join(dir,n)));
 const t0=Date.now();
 await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} D.vanBan.push({id:'vgia',nhom:'vanBan',soHieu:'99/CV-GIA',trichYeu:'Văn bản giả nguyen gia thu',ngay:'2026-09-01',tenMoi:'vb.pdf'}); doiNgan(7); slDocNhieu(Array.from(document.getElementById('xx').files)); });
 await p.waitForSelector('.sl-xt', {timeout:300000});
 console.log('đọc bộ', ((Date.now()-t0)/1000).toFixed(1)+'s');
 (await p.evaluate(()=>SL_NAP.map(k=>[k.ten, k.loai, k.ky, k.mau31?'mẫu31':'', k.rows&&k.rows.length, JSON.stringify(k.bo), slTrangThai(k).chu.slice(0,70)].join(' | ')))).forEach(x=>console.log('  ',x));
 await p.evaluate(()=>slGhiDaTich());
 await p.waitForFunction(()=>Object.keys(SLM.bang).length>=7 && document.querySelector('#sl-ky .sl-dc'), null, {timeout:120000});
 const r = await p.evaluate(async()=>{ const o={}; const w=t=>new Promise(r=>setTimeout(r,t));
   const t = SLM.bang['hstd|2026-08'].tong; o.tong = 'món '+t.mon+' · tất toán '+t.tatToan+' · chỉ TK '+t.chiTK+' · dn '+tdnTien(t.dn)+' · GN tháng '+tdnTien(t.gnT)+' ('+t.monGN+')';
   o.dc = Array.from(document.querySelectorAll('.sl-dc-dong')).map(x=>x.textContent.slice(0,110)).join('\n      ');
   // tab con Tra cứu KH
   slDoiTab('tra'); await w(200);
   const c0 = Object.keys(SL_DB.kh).map(k=>[k,SL_DB.kh[k]]).find(x=>x[1].sdt);
   const tim = q => { const i=document.getElementById('sl-tim'); i.value=q; SL_TRA_Q=q; slTraTim(); return document.querySelectorAll('#sl-kq .sl-kq-dong').length; };
   o.timSDT = tim(c0[1].sdt.slice(-7)); o.timTatToan = tim('6600009900000002'); o.timTen = tim('khach gui tk gia 1');
   tim('6600009900000001'); document.querySelector('#sl-kq .sl-kq-dong').click(); for(let i=0;i<40 && !document.querySelector('.kh-mon tbody tr');i++) await w(250); o.theCho = document.getElementById('kh-mon') && document.getElementById('kh-mon').textContent.slice(0,80);
   o.the = Array.from(document.querySelectorAll('.kh-mon tbody tr')).map(x=>x.textContent.slice(0,140)).join(' || ');
   dongHop();
   // ô tìm chung
   document.getElementById('otim').value='nguyen gia'; veGoiY(tenTab(), khoTab());
   o.oTimSoLieu = Array.from(document.querySelectorAll('#goiy .gy-dau, #goiy button')).map(x=>x.textContent).slice(0,4).join(' / ');
   dongGoiY(); doiNgan(1); await w(200); veGoiY(tenTab(), khoTab());
   o.oTimVB_coKH = /Khách hàng/.test(document.getElementById('goiy').textContent);
   document.getElementById('otim').value=''; dongGoiY(); doiNgan(7);
   return o; });
 for(const k in r) console.log(k.padEnd(11), r[k]);
 await p.screenshot({path:__dirname+'/t100.png'}); console.log('lỗi', loi); await b.close(); })();
