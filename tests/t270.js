// t270 (TK 3, 3.376 — anh 26/10: "scan cccd … nắn cắt ảnh tương đối lâu, chữ hiện cảnh báo che nút", "chip trắng có khi che nút xem trước"):
//   chip báo (bao) khi đang mở hộp lên ĐẦU màn hình, không đè hàng nút cuối hộp, không chặn bấm; ⏱ Đo tốc độ ghi từng bước quét (thu gốc, cắt nắn lọc, tìm khung, nắn, lọc).
//   Ảnh GIẢ vẽ bằng canvas (thẻ màu xanh ngọc trên nền), không dùng ảnh thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 for(const [w, h, dt, ten] of [[1440, 900, 0, 'máy tính'], [390, 844, 1, 'điện thoại']]){
   const p = await b.newPage(Object.assign({viewport:{width:w, height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror', e=>loi.push(e.message)); await p.route(/accounts\.google|googleapis/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(2000);
   const r = await p.evaluate(()=>{ try{ dongHop(); }catch(e){} moHop('<div class="hop-tit">Hộp giả</div><div style="height:2000px"></div>'+GD.hang([GD.nut({chu:'Xem trước ›', lenh:'hop.dong', chinh:true})]), true);
     bao('Đã tự cắt, nắn và làm đẹp · ⏱ 14,5 giây', 7); const e = document.getElementById('bao'), r = e.getBoundingClientRect();
     return {top:Math.round(r.top), bottom:Math.round(r.bottom), h:innerHeight, pe:getComputedStyle(e).pointerEvents}; });
   ok(ten+': đang mở hộp → chip báo nằm đầu màn hình (không đè hàng nút cuối hộp), bấm xuyên qua được', r.top<80 && r.bottom<r.h/3 && r.pe==='none', JSON.stringify(r));
   if(!dt){
     const r2 = await p.evaluate(()=>{ const e = document.getElementById('bao'); e.innerHTML = 'Đã xóa 1 mục <button class="bao-ht">↩ Hoàn tác</button>'; e.classList.add('hien'); return getComputedStyle(e).pointerEvents; });
     ok('chip có nút (↶ Hoàn tác) vẫn bấm được', r2==='auto', r2);
     const s = await p.evaluate(async()=>{ const c=document.createElement('canvas'); c.width=2400; c.height=1800; const g=c.getContext('2d'); g.fillStyle='#6b4a32'; g.fillRect(0,0,2400,1800);
       g.save(); g.translate(1200,900); g.rotate(0.1); g.fillStyle='#7fd0c8'; g.fillRect(-700,-440,1400,880); g.fillStyle='#222'; for(let i=0;i<10;i++) g.fillRect(-300,-300+i*60,800,20); g.restore();
       const f = await new Promise(r=>c.toBlob(r,'image/jpeg',0.9)); DTD.ds = [];
       const bg = await thuGoc(f); await luuAnhHS('qt270_goc', bg); await xuLyAnhScan({id:'qt270', kieu:'anh', che:'the', xoay:0}, true);
       await new Promise(r=>setTimeout(r, 100)); return DTD.ds.map(x=>x.t); });
     ok('⏱ Đo tốc độ ghi các bước quét: thu ảnh gốc · cắt nắn lọc (trọn) · tìm khung thẻ · nắn phối cảnh · lọc màu', ['Scan · thu ảnh gốc 2000 px', 'Scan · cắt nắn lọc 1 ảnh (trọn)', 'Scan · tìm khung thẻ', 'Scan · nắn phối cảnh', 'Scan · lọc màu'].every(t=>s.indexOf(t)>=0), JSON.stringify(s));
   }
   await p.close(); }
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
