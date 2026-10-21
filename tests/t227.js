// 3.306 — chữ ký / lăn tay (anh 21/10): nhận dạng chữ ký · lăn tay · ảnh CCCD · ảnh trắng; lưu chữ ký là ảnh CCCD bị chặn; ✍ Rà chữ ký (tích sẵn
// mục nhầm → Thùng rác); không tạo ảnh khách từ CCCD, xuất Ảnh = mặt trước CCCD; "Quét gì?" bỏ Ảnh khách, thêm Bản photo CCCD; tờ photo 2 thẻ tách đúng 2 khung.
// Dữ liệu GIẢ: ảnh tự vẽ (nét ký, vòng vân, thẻ có QR giả) — không ảnh CCCD thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const qrLib = fs.readFileSync(path.join(__dirname,'lib','qrcode-generator-1.4.4','package','qrcode.js'),'utf8');
 const R = await p.evaluate(async(qrLib)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const raBlob = c => new Promise(r=>c.toBlob(r, 'image/jpeg', 0.92)), cv = (W, H, nen) => { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.fillStyle = nen||'#fff'; g.fillRect(0, 0, W, H); return [c, g]; };
   /* chữ ký: vài nét cong mực xanh trên giấy hơi xám */
   const kyAnh = async () => { const [c, g] = cv(700, 260, '#f2f2ef'); g.strokeStyle = '#1b2a8a'; g.lineWidth = 3; g.lineCap = 'round';
     g.beginPath(); g.moveTo(60, 170); g.bezierCurveTo(120, 30, 180, 220, 240, 120); g.bezierCurveTo(290, 40, 330, 210, 400, 140); g.bezierCurveTo(460, 80, 520, 200, 620, 110); g.stroke();
     g.beginPath(); g.moveTo(150, 200); g.lineTo(560, 185); g.stroke(); return raBlob(c); };
   /* lăn tay: vòng vân dày màu tím */
   const lanTay = async () => { const [c, g] = cv(420, 320); g.strokeStyle = '#5b2a86'; g.lineWidth = 3;
     for(let r=6;r<110;r+=7){ g.beginPath(); g.ellipse(210, 160, r*0.75, r, 0.2, 0, Math.PI*2); g.stroke(); } return raBlob(c); };
   /* thẻ giả: nền xanh nhạt, dấu đỏ, dòng chữ, ảnh chân dung, QR (số CCCD giả) */
   eval(qrLib); qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
   const theGia = async (x0, y0, c0, g0) => { const [c, g] = c0 ? [c0, g0] : cv(856, 540, '#cfe3ee'); x0 = x0||0; y0 = y0||0;
     g.fillStyle = '#cfe3ee'; g.fillRect(x0, y0, 856, 540); g.fillStyle = '#c62828'; g.beginPath(); g.arc(x0+90, y0+80, 50, 0, Math.PI*2); g.fill();
     g.fillStyle = '#5a6b78'; g.fillRect(x0+40, y0+170, 200, 260); g.fillStyle = '#1a1a1a'; g.font = 'bold 34px sans-serif';
     ['CĂN CƯỚC CÔNG DÂN', 'Số: 079000002271', 'Họ tên: NGUYEN VAN GIA', 'Ngày sinh: 01/01/1980'].forEach((t, i) => g.fillText(t, x0+270, y0+90+i*70));
     const qr = qrcode(0, 'M'); qr.addData('079000002271|111222333|NGUYEN VAN GIA|01011980|Nam|Ấp Giả|01012021'); qr.make(); const n = qr.getModuleCount(), z = 4;
     g.fillStyle = '#fff'; g.fillRect(x0+856-(n+8)*z-20, y0+20, (n+8)*z, (n+8)*z); g.fillStyle = '#000';
     for(let r=0;r<n;r++) for(let q=0;q<n;q++) if(qr.isDark(r, q)) g.fillRect(x0+856-(n+8)*z-20+(q+4)*z, y0+20+(r+4)*z, z, z);
     return c0 ? null : raBlob(c); };
   const trang = async () => { const [c] = cv(600, 300, '#f6f6f4'); return raBlob(c); };
   const bKy = await kyAnh(), bLT = await lanTay(), bThe = await theGia(), bTr = await trang();
   const dt = [], pl = async bl => { const r = await kyPhanLoai(bl); dt.push(r.loai+' '+JSON.stringify(r.f, (k, v)=>typeof v==='number' ? +v.toFixed(3) : v)); return r.loai; };
   const lk = [await pl(bKy), await pl(bLT), await pl(bThe), await pl(bTr)];
   ok('nhận dạng: nét ký → Chữ ký, vòng vân → Lăn tay, thẻ có QR → Ảnh CCCD, giấy trống → Ảnh trắng', JSON.stringify(lk)==='["ky","lantay","the","trong"]', dt.join(' | '));
   /* lưu chữ ký: ảnh CCCD bị chặn; chữ ký thật lưu được; lăn tay ghi kieuKy */
   let baoL = ''; const blCu = bao; window.bao = function(m){ baoL += ' '+m; return blCu.apply(this, arguments); };
   D.kyAnh = []; const n0 = D.kyAnh.length;
   KA.loai = 'ky'; KA.bl = bThe; KA.ten = 'Nguyễn Văn Giả'; KA.tenLuc = Date.now(); KA.xet = null; luuKA(); await w(2500);
   ok('lưu chữ ký mà ảnh là CCCD → không lưu, báo quét ở 🪪 CCCD', D.kyAnh.length===n0 && /là CCCD/.test(baoL), baoL.slice(-120));
   KA.loai = 'ky'; KA.bl = bKy; KA.xet = null; KA.ten = 'Nguyễn Văn Giả'; luuKA(); await w(1200);
   const k1 = D.kyAnh[D.kyAnh.length-1];
   ok('chữ ký thật → lưu, ghi đã xét là chữ ký', D.kyAnh.length===n0+1 && k1.kyXet==='ky' && !k1.kieuKy, JSON.stringify(k1 && {kyXet:k1.kyXet, kieu:k1.kieuKy}));
   try{ dongHop(); }catch(e){}
   KA.loai = 'ky'; KA.bl = bLT; KA.xet = null; KA.ten = 'Trần Thị Lăn Tay'; luuKA(); await w(1200);
   const k2 = D.kyAnh[D.kyAnh.length-1];
   ok('lăn tay → lưu, ghi kieuKy = lăn tay', D.kyAnh.length===n0+2 && k2.kieuKy==='lantay', JSON.stringify(k2 && {kyXet:k2.kyXet, kieu:k2.kieuKy}));
   try{ dongHop(); }catch(e){}
   KA.loai = 'ky'; KA.bl = bTr; KA.xet = null; KA.ten = 'Ảnh Trắng Giả'; luuKA(); await w(800);
   ok('ảnh trắng → hỏi "vẫn lưu?" (chưa lưu)', D.kyAnh.length===n0+2 && /Vẫn lưu/.test((document.querySelector('#hop.hien')||{}).textContent||''));
   try{ dongHop(); }catch(e){}
   /* ✍ Rà chữ ký: chữ ký nhầm CCCD + ảnh khách lưu sẵn → tích sẵn; chữ ký đúng không hiện */
   const bay = new Date().toISOString(), them = async (id, loai, bl, khach) => { await luuAnhHS(id, bl); D.kyAnh.push({id, loai, khach, ten:khach+'.jpg', ngay:bay.slice(0,10), luc:bay}); };
   await them('kat227the', 'ky', bThe, 'Ky Nham The'); await them('kat227anh', 'anh', bThe, 'Anh Luu San'); await them('kat227ky', 'ky', bKy, 'Ky Dung');
   D.cauHinh.kyRa = ''; await kyRaChay(false); await w(300);
   const hop = document.querySelector('#hop.hien'), tich = id => { const x = hop && hop.querySelector('[data-k="'+id+'"]'); return x ? x.checked : null; };
   ok('✍ Rà chữ ký: chữ ký thật ra là CCCD + ảnh khách lưu sẵn → hiện, tích sẵn; chữ ký đúng không hiện; có thẻ ✍ Rà chữ ký ở Quản lý', tich('kat227the')===true && tich('kat227anh')===true && tich('kat227ky')===null && !!hop.querySelector('.ql-the [data-lenh="ky.ra"].bat'),
     JSON.stringify([tich('kat227the'), tich('kat227anh'), tich('kat227ky')]));
   hop.querySelector('[data-lenh="ky.bo"]').click(); await w(500);
   const con = D.kyAnh.map(a=>a.id), rac = (D.rac||[]).map(a=>a.id);
   ok('bấm Bỏ → 2 mục vào 🗑 Thùng rác, chữ ký đúng còn', con.indexOf('kat227the')<0 && con.indexOf('kat227anh')<0 && con.indexOf('kat227ky')>=0 && rac.indexOf('kat227the')>=0, JSON.stringify({con, rac:rac.filter(x=>/227/.test(x))}));
   ok('rà xong ghi mốc (không tự rà lại); chữ ký đúng ghi đã xét', D.cauHinh.kyRa==='3.306' && D.kyAnh.find(a=>a.id==='kat227ky').kyXet==='ky');
   try{ dongHop(); }catch(e){}
   /* không tạo ảnh khách từ CCCD; xuất Ảnh = mặt trước CCCD ≤ 200 KB */
   const sc = {id:'t227s', che:'the', ten:'Nguyễn Văn Giả', maKH:'9990002271', tag:['CCCD'], matTruoc:true, matSau:true, ngay:bay.slice(0,10), taoLuc:bay};
   await luuAnhHS('t227s_matTruoc', bThe); await luuAnhHS('t227s_matSau', bThe); D.scan.push(sc);
   const nAnh = D.kyAnh.filter(a=>a.loai==='anh').length; await sxAnhTuCCCD(sc);
   ok('không còn tự tạo ảnh khách lưu sẵn từ CCCD', D.kyAnh.filter(a=>a.loai==='anh').length===nAnh);
   const ghi = {}, tm = {name:'Xuat Gia', queryPermission:async()=>'granted', getFileHandle:async(ten)=>({createWritable:async()=>({write:async(bl)=>{ ghi[ten] = bl; }, close:async()=>{}})})};
   window.showDirectoryPicker = async()=>tm; const docCu = docFile, luuCu = luuFile, kho = {};
   window.docFile = k => /^ln_tm_/.test(k) ? Promise.resolve(kho[k]||null) : docCu(k); window.luuFile = (k, v) => /^ln_tm_/.test(k) ? (kho[k] = v, Promise.resolve()) : luuCu(k, v);
   xkMo('t227s'); await w(100);
   const oAnh = document.querySelector('#hop [data-xk="anh"]');
   ok('hộp Xuất: 🧑 Ảnh khách luôn chọn được (mặt trước CCCD), mặc định không tích', !!oAnh && !oAnh.disabled && !oAnh.checked);
   document.querySelector('#hop [data-xk="cccd"]').checked = false; oAnh.checked = true; document.querySelector('#hop [data-lenh="xk.xuat"]').click();
   for(let i=0;i<40 && !Object.keys(ghi).length;i++) await w(100);
   const fa = ghi['9990002271 - Nguyễn Văn Giả - Ảnh.jpg'];
   ok('xuất Ảnh = mặt trước CCCD, JPG ≤ 200 KB, tên chuẩn', !!fa && fa.size<=200*1024, JSON.stringify(Object.keys(ghi)));
   /* "Quét gì?": không còn Ảnh khách; có Bản photo CCCD → chế độ thẻ + tách tờ */
   HS.mo = true; batDauScan('cccd'); await w(100);
   const nut = Array.prototype.map.call(document.querySelectorAll('#hop .sc-loai button b'), x=>x.textContent.trim());
   ok('"Quét gì?": bỏ 🧑 Ảnh khách, có 🗎 Bản photo CCCD; bỏ ô tích photo cũ dưới CCCD', !nut.some(t=>/Ảnh khách/.test(t)) && nut.some(t=>/Bản photo CCCD/.test(t)) && !document.querySelector('#hop .sx-photo2'), JSON.stringify(nut));
   let nguon = ''; const cnCu = chonNguon; window.chonNguon = n => { nguon = n; };
   batDauScan('photo'); scChonNguon('photo'); window.chonNguon = cnCu;
   ok('chọn Bản photo → chế độ thẻ + tách tờ 2 mặt', SC.che==='the' && SC.photo2===true && nguon==='photo', JSON.stringify({che:SC.che, p2:SC.photo2, nguon}));
   try{ dongHop(); }catch(e){}
   /* tờ photo A4 có 2 thẻ chồng dọc → tách đúng 2 khung (mỗi mảnh gần tỉ lệ thẻ) */
   const [cT, gT] = cv(1240, 1754, '#fafafa'); await theGia(190, 220, cT, gT); await theGia(190, 960, cT, gT);
   const f = new File([await raBlob(cT)], 'to_photo.jpg', {type:'image/jpeg'}), hai = await sxChiaDoi(f);
   const tl = await Promise.all(hai.map(async x => { const im = await anhTuBlob(x); return (im.naturalWidth||im.width)/(im.naturalHeight||im.height); }));
   ok('tờ photo 2 thẻ → 2 mảnh đúng khung thẻ (tỉ lệ ~1,5–1,7, không chia đôi tờ)', hai.length===2 && tl.every(r=>r>1.4 && r<1.8), JSON.stringify(tl.map(r=>r.toFixed(2))));
   return o; }, qrLib);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
