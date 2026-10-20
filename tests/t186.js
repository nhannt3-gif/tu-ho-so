// 3.224 (anh chốt 17/10) — QUY TRÌNH SCAN MỚI: ① chọn loại (CCCD / Tài liệu / Chữ ký / Ảnh khách) — loại quyết định số mặt (Tài liệu không ghép mặt sau);
//   Tài liệu mặc định lọc "Văn bản rõ"; chữ ký giữ nguyên mẫu chụp (không ép trắng / ép đen), khử bóng góc, ≤ 200 KB; Lưu vào app → Chờ khai báo, KHÔNG lên Drive khi chưa khai;
//   bộ nút chuẩn ở chữ ký. Ảnh GIẢ vẽ trong phép thử.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:850}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   HS.mo = true; doiNgan(4); await w(300);
   const ve = (W, H, f) => new Promise(r=>{ const c = document.createElement('canvas'); c.width = W; c.height = H; f(c.getContext('2d'), W, H); c.toBlob(r, 'image/jpeg', 0.95); });
   // ① chọn loại
   batDauScan(); await w(100); const h1 = document.getElementById('hop-in').textContent;
   ok('① hộp chọn loại: CCCD · Tài liệu · Chữ ký · Ảnh khách + nguồn', /CCCD/.test(h1) && /Tài liệu/.test(h1) && /Chữ ký/.test(h1) && /Ảnh khách/.test(h1) && /Lấy từ đâu/.test(h1) && document.querySelectorAll('#hop-in .sc-loai button').length===4);
   // Tài liệu: chọn loại → chế độ tài liệu dù trước đó đang nhớ Thẻ; 2 ảnh → 2 trang, không ghép cặp
   SC.che = 'the'; D.cauHinh.scanChe = 'the'; batDauScan('tailieu'); const goc = window.chonNguon; let nguon = ''; window.chonNguon = n => { nguon = n; }; scChonNguon('photo'); window.chonNguon = goc;
   ok('Tài liệu: chọn loại → chế độ tài liệu (không theo chế độ Thẻ đang nhớ)', SC.che==='tailieu' && nguon==='photo' && D.cauHinh.scanLoai==='tailieu', SC.che);
   HANG = []; const giay = (n) => ve(1200, 1600, (g, W, H)=>{ g.fillStyle = '#c9c3b5'; g.fillRect(0, 0, W, H); g.fillStyle = '#f2eee4'; g.fillRect(100, 100, 1000, 1400); g.fillStyle = '#222'; g.font = '40px serif'; for(let y=200;y<1400;y+=80) g.fillText('Văn bản giả '+n+' dòng '+y, 160, y); });
   await nhanVaoScan([new File([await giay(1)], 'a.jpg', {type:'image/jpeg'}), new File([await giay(2)], 'b.jpg', {type:'image/jpeg'})], 'photo'); for(let i=0;i<60 && HANG.filter(x=>x.kieu==='anh').length<2;i++) await w(200); await w(300);
   const tr = HANG.filter(x=>x.kieu==='anh');
   ok('Tài liệu 2 ảnh → 2 trang 1 mặt (không ghép mặt trước | mặt sau), lọc mặc định "Văn bản rõ"', tr.length===2 && tr.every(x=>x.che==='tailieu' && x.loc==='vanban') && !document.querySelector('#hc-anh.the'), JSON.stringify(tr.map(x=>[x.che, x.loc])));
   // Lưu vào app → Chờ khai báo, không lên Drive
   let henDB = 0; const hd = window.henDongBoScan; window.henDongBoScan = () => { henDB++; };
   XH = {bl:new Blob(['%PDF-1.4 giả'], {type:'application/pdf'})}; tiepHang(); await w(100);
   const h3 = document.getElementById('hop-in').textContent;
   ok('⑤ bộ nút chuẩn: In · Lưu vào máy · Lưu vào app · Gửi Zalo · Bỏ', /In/.test(h3) && /Lưu vào máy/.test(h3) && /Lưu vào app/.test(h3) && /Gửi Zalo/.test(h3) && /Bỏ/.test(h3));
   document.getElementById('sx-ten').value = 'Ho so gia A'; scanLuuApp(); await w(600); window.henDongBoScan = hd;
   const k = (D.scan||[]).slice(-1)[0] || {};
   ok('🗂 Lưu vào app → mục Chờ khai báo, đúng tên file anh sửa, KHÔNG hẹn đưa lên Drive', k.chuaKhai && k.ten==='Ho so gia A' && henDB===0 && (k.trang||[]).length===2, JSON.stringify({ten:k.ten, ck:k.chuaKhai, henDB}));
   ok('3.264 (anh chốt): bản chưa khai lên Drive vào thư mục "Scan chờ sắp xếp"', scanCanDay().indexOf(k)>=0 && duongScan(k)===D.cauHinh.thumuc+' / Scan chờ sắp xếp', duongScan(k));
   k.chuaKhai = false; ok('khai xong → Drive nhận', scanCanDay().indexOf(k)>=0);
   // Chữ ký: giữ nguyên mẫu — nền tối góc (bóng) được cân lại, nét mực xanh giữ màu, không ép trắng / đen; ≤ 200 KB
   const kyB = await ve(1400, 700, (g, W, H)=>{ const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#8a8a8a'); gr.addColorStop(1, '#efefef'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
     g.strokeStyle = 'rgb(30,50,140)'; g.lineWidth = 9; g.beginPath(); g.moveTo(200, 400); g.bezierCurveTo(400, 100, 700, 600, 1200, 300); g.stroke(); });
   KA.loai = 'ky'; KA.im = await createImageBitmap(kyB); KA.r = {x:0, y:0, w:1400, h:700}; KA.kyLoc = '';
   const bl = await dungKA(), bm = await createImageBitmap(bl), c = document.createElement('canvas'); c.width = bm.width; c.height = bm.height; const g = c.getContext('2d'); g.drawImage(bm, 0, 0);
   const px = (x, y) => Array.from(g.getImageData(Math.round(x*c.width), Math.round(y*c.height), 1, 1).data).slice(0, 3);
   const g1 = px(0.03, 0.05), g2 = px(0.97, 0.95), lech = Math.abs(g1[0]-g2[0]), net = px(200/1400, 400/700);
   ok('chữ ký: khử bóng — nền góc tối và góc sáng gần bằng nhau (lệch < 40), không ép trắng tinh', lech < 40 && g1[0] < 254 && g2[0] < 254, JSON.stringify([g1, g2]));
   ok('chữ ký: nét mực xanh giữ màu (không ép đen / xám)', net[2] > net[0] + 40, JSON.stringify(net));
   ok('chữ ký: JPG dưới 200 KB', bl.type==='image/jpeg' && bl.size <= 200*1024, Math.round(bl.size/1024)+' KB');
   KA.kyLoc = 'goc'; const blG = await dungKA(); const bmG = await createImageBitmap(blG); g.drawImage(bmG, 0, 0, c.width, c.height);
   ok('chữ ký: tùy chọn Gốc — không khử bóng (góc tối giữ tối)', px(0.03, 0.05)[0] < 160, JSON.stringify(px(0.03, 0.05)));
   KA.kyLoc = ''; KA.bl = null; xemKA2(); await w(400); const hk = document.getElementById('hop-in').textContent;
   ok('✍ xem chữ ký: bộ nút chuẩn Lưu vào máy · Gửi Zalo · Lưu vào app · Bỏ', /Lưu vào máy/.test(hk) && /Gửi Zalo/.test(hk) && /Lưu vào app/.test(hk) && /Bỏ/.test(hk) && /dưới 200 KB/.test(hk));
   // Ảnh khách = 1 mặt CCCD → đi luồng ảnh (chupKA 'anh'), không vào hàng chờ thẻ
   let ka = ''; const ck = window.chupKA; window.chupKA = (l, n) => { ka = l+'|'+n; }; batDauScan('anhkh'); scChonNguon('camera'); window.chupKA = ck;
   ok('🧑 Ảnh khách → luồng 1 mặt CCCD (chupKA anh), không ghép mặt sau', ka==='anh|camera', ka);
   return o; });
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
