// 3.274 — anh: "bản mới up đọc CCCD bị lỗi cắt không chuẩn" (ảnh gốc chỉ còn nửa thẻ): ô "Bản photo 2 mặt trên 1 tờ" nhớ cả phiên → ảnh chụp 1 mặt thẻ bị chia đôi.
// Sửa: mỗi lần quét mới bỏ tích; ảnh có 1 thẻ to (chụp 1 mặt) → không chia dù đang tích; tờ photo 2 thẻ → vẫn chia. Ảnh GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const the = (g, x, y, W, H) => { g.fillStyle = '#a8d8e0'; g.fillRect(x, y, W, H); g.fillStyle = '#5a8a96'; for(let i=0;i<6;i++) g.fillRect(x+W*0.4, y+H*(0.15+i*0.12), W*0.5, H*0.04); g.fillStyle = '#c99'; g.fillRect(x+W*0.06, y+H*0.25, W*0.25, H*0.45); };
   const anh = (W, H, ve) => new Promise(r=>{ const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); ve(g); c.toBlob(r, 'image/jpeg', 0.92); });
   const f1 = new File([await anh(1600, 1100, g=>{ g.fillStyle = '#3a3530'; g.fillRect(0, 0, 1600, 1100); the(g, 180, 150, 1240, 782); })], 'mot-the.jpg', {type:'image/jpeg'});
   const f2 = new File([await anh(2000, 1300, g=>{ g.fillStyle = '#f4f4f0'; g.fillRect(0, 0, 2000, 1300); the(g, 120, 300, 820, 518); the(g, 1060, 300, 820, 518); })], 'to-photo.jpg', {type:'image/jpeg'});
   const im1 = await anhTuBlob(f1), im2 = await anhTuBlob(f2);
   ok('ảnh chụp 1 mặt thẻ (thẻ to) → nhận ra 1 thẻ', sxMotTheLon(im1)===true);
   ok('tờ photo có 2 thẻ → không phải 1 thẻ to', sxMotTheLon(im2)===false, JSON.stringify((timKhungThe(im2)||{}).goc));
   const h1 = await sxChiaDoi(f1), h2 = await sxChiaDoi(f2);
   ok('đang tích "photo 2 mặt" mà ảnh chỉ 1 thẻ → KHÔNG chia đôi (giữ nguyên ảnh để cắt khung như thường)', h1.length===1 && h1[0]===f1, h1.length+' ảnh');
   ok('tờ photo 2 thẻ → vẫn chia 2 nửa', h2.length===2, h2.length+' ảnh');
   HS.mo = true; SC.photo2 = true; batDauScan('cccd'); await w(200);
   const cb = document.querySelector('#hop-in [data-lenh="sx.photo2"]');
   ok('quét bản mới → ô "Bản photo 2 mặt trên 1 tờ" về không tích (không nhớ từ lần trước)', SC.photo2===false && cb && !cb.checked);
   dongHop();
   /* 3.274: Magic khử ám vàng / xanh, giữ màu thật của thẻ */
   const giay = (mau) => { const c = document.createElement('canvas'); c.width = 600; c.height = 800; const g = c.getContext('2d'); g.fillStyle = mau; g.fillRect(0, 0, 600, 800); g.fillStyle = '#222'; for(let y=60;y<760;y+=40) g.fillRect(50, y, 480, 10); return c; };
   const tb = c => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let r=0, g=0, b=0, n=0; for(let i=0;i<d.length;i+=4){ if(d[i]+d[i+1]+d[i+2]<450) continue; r+=d[i]; g+=d[i+1]; b+=d[i+2]; n++; } return [r/n, g/n, b/n].map(Math.round); };
   const lech = a => Math.max(...a)-Math.min(...a);
   const vang = tb(locMagic(giay('rgb(215,195,140)'))), xanh = tb(locMagic(giay('rgb(170,190,225)')));
   ok('Magic: giấy trắng chụp dưới đèn vàng → nền về trắng trung tính (lệch kênh ≤ 12)', lech(vang)<=12, JSON.stringify(vang));
   ok('Magic: giấy ám xanh → nền về trung tính (lệch kênh ≤ 12)', lech(xanh)<=12, JSON.stringify(xanh));
   const the2 = (()=>{ const c = document.createElement('canvas'); c.width = 856; c.height = 540; const g = c.getContext('2d'); g.fillStyle = 'rgb(168,216,224)'; g.fillRect(0, 0, 856, 540); g.fillStyle = 'rgb(245,245,240)'; g.fillRect(40, 40, 220, 280); g.fillStyle = '#c33'; g.fillRect(600, 300, 120, 120); return c; })();
   const kt = locMagic(the2), px = (x, y) => Array.from(kt.getContext('2d').getImageData(x, y, 1, 1).data.slice(0, 3));
   const nen = px(500, 100), do_ = px(660, 360);
   ok('Magic trên thẻ CCCD: nền xanh nhạt của thẻ vẫn xanh, dấu đỏ vẫn đỏ', nen[2]-nen[0]>=25 && do_[0]-do_[2]>=60, JSON.stringify([nen, do_]));
   /* 3.276: khung công cụ (Hạn trả HSSV) cao tới đáy cửa sổ — dải dưới ẩn trên máy tính */
   doiNgan(0); await w(300); CC.mo = 'hssv'; veCC(); await w(300);
   const cc = document.getElementById('cc-o'), rc = cc.getBoundingClientRect();
   ok('khung Hạn trả HSSV cao tới gần đáy cửa sổ (không còn bị cắt 200 px)', parseInt(cc.style.maxHeight)>=Math.round(innerHeight-rc.top-10) && parseInt(cc.style.maxHeight)>200, cc.style.maxHeight+' · đỉnh '+Math.round(rc.top)+' / cửa sổ '+innerHeight);
   ccDong && ccDong();
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
