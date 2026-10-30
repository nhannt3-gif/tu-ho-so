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
 await p.waitForFunction(()=>Object.keys(SLM.bang).length>=7 && document.querySelector('#tr7 .sl-mt-k'), null, {timeout:120000});   // 3.150: dòng trạng thái tab Nạp & KT · t260 (TK 3): .sl-tt-1 bỏ từ 3.230 → chờ ô ma trận
 const r = await p.evaluate(async()=>{ const o={}; const w=t=>new Promise(r=>setTimeout(r,t));
   const t = SLM.bang['hstd|2026-08'].tong; o.tong = 'món '+t.mon+' · tất toán '+t.tatToan+' · chỉ TK '+t.chiTK+' · dn '+tdnTien(t.dn)+' · GN tháng '+tdnTien(t.gnT)+' ('+t.monGN+')';
   const dcR = slDoiChieu(await slBo('2026-08')); o.dc = dcR.map(x=>(x.ok?'✅':'⚠')+x.ten+' — '+(x.chu||'').slice(0,90)).join('\n      '); o._dc = dcR.map(x=>({ok:!!x.ok, ten:x.ten})); o._t = {mon:t.mon, tatToan:t.tatToan, chiTK:t.chiTK, dn:t.dn};
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
 for(const k in r) if(k[0]!=='_') console.log(k.padEnd(11), r[k]);
 /* 3.411.2 (RA_SOAT_HOI_QUY D1 — anh duyệt 31/10 "chốt làm tuần tự"): thêm câu kiểm thật (trước chỉ in số, luôn "đạt") */
 const kq = [], ok = (ten, dk, chi) => kq.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 const dcOk = ten => (r._dc.find(x=>x.ten.indexOf(ten)>=0)||{}).ok;
 ok('Mẫu 31 giả: đủ món (gộp khế ước trùng), có món tất toán, có khách chỉ gửi TK, dư nợ > 0', r._t.mon>25000 && r._t.tatToan>=1 && r._t.chiTK>=1 && r._t.dn>0, JSON.stringify(r._t));
 ok('đối chiếu: Nợ QH, Nợ khoanh, dư nợ tháng trước + phát sinh, món QH / khoanh / KHĐ có trong Mẫu 31 — đều khớp', ['Nợ quá hạn — Sao kê', 'Nợ khoanh — Sao kê', 'Dư nợ tháng trước + phát sinh', 'Nợ quá hạn có trong Mẫu 31', 'Nợ khoanh có trong Mẫu 31', 'Món vay 3 tháng KHĐ'].every(x=>r._dc.some(d=>d.ten.indexOf(x.split(' — ')[0])>=0)) && r._dc.filter(d=>/Nợ quá hạn|Nợ khoanh|tháng trước \+ phát sinh|KHĐ/.test(d.ten)).every(d=>d.ok), r._dc.filter(d=>!d.ok).map(d=>d.ten).join(', '));
 ok('Tra cứu KH: tìm theo SĐT, theo khế ước đã tất toán, theo tên đều ra kết quả', r.timSDT>=1 && r.timTatToan>=1 && r.timTen>=1, [r.timSDT, r.timTatToan, r.timTen].join(' / '));
 ok('thẻ khách: bảng món vay có dòng (ngày vay, đến hạn)', /vay \d\d\/\d\d\/\d{4}/.test(r.the||''), (r.the||'').slice(0, 80));
 ok('ô tìm chung ở tab Số liệu: gợi ý "Tìm ở tab khác"', /Tìm ở tab khác/.test(r.oTimSoLieu||''), r.oTimSoLieu);
 ok('không lỗi trang', !loi.length, loi.slice(0, 2).join(' | '));
 kq.forEach(x=>console.log(x)); const sai = kq.filter(x=>x[0]==='✗').length; console.log((kq.length-sai)+'/'+kq.length+' đạt');
 await p.screenshot({path:__dirname+'/t100.png'}); await b.close(); process.exit(sai ? 1 : 0); })();
