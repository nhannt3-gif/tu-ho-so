// 3.264 — 🗂 Lưu scan tập trung · 🧹 Sắp xếp · 📊 Kiểm tra · 📇 đọc CCCD (QR giả / 3 dòng mã máy đọc giả) · bản photo 2 mặt.
// Dữ liệu GIẢ: bộ tests/gianho31 (khách giả), thẻ + mã QR tự vẽ trong phép thử — không ảnh CCCD thật.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const qrLib = fs.readFileSync(path.join(__dirname,'lib','qrcode-generator-1.4.4','package','qrcode.js'),'utf8');
 const R = await p.evaluate(async([files, qrLib])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   const DB = KHO.dsKhach(), mas = Object.keys(DB).filter(m=>DB[m].ten);
   const coSo = mas.filter(m=>/^\d{12}$/.test(String(DB[m].cccd||''))), k1 = coSo[0], k2 = mas.find(m=>m!==k1), c1 = DB[k1], c2 = DB[k2];
   /* 1. tên + nơi lưu */
   const a = {che:'the', ten:'cccd-Khách Thử', tag:['CCCD']}, bk = {che:'the', ten:c1.ten, maKH:k1, tag:['CCCD']}, tl = {che:'tailieu', ten:c1.ten, maKH:k1, tag:['01TD']};
   ok('chưa rõ khách → thư mục "Scan chờ sắp xếp", tên anh gõ', duongScan(a)===D.cauHinh.thumuc+' / Scan chờ sắp xếp' && tenScanDrive(a)==='cccd-Khách Thử.pdf', duongScan(a)+' · '+tenScanDrive(a));
   ok('đã rõ khách → CCCD / "MãKH - Họ tên - CCCD.pdf" (phẳng, không thư mục con)', duongScan(bk)===D.cauHinh.thumuc+' / CCCD' && tenScanDrive(bk)===k1+' - '+c1.ten+' - CCCD.pdf', duongScan(bk)+' · '+tenScanDrive(bk));
   ok('tài liệu → Hồ sơ scan / "MãKH - Họ tên - 01TD.pdf"', duongScan(tl)===D.cauHinh.thumuc+' / Hồ sơ scan' && tenScanDrive(tl)===k1+' - '+c1.ten+' - 01TD.pdf', tenScanDrive(tl));
   ok('chữ ký: chưa rõ → "ck-Tên.jpg" ở thư mục chờ; rõ → Chữ ký - Ảnh khách / "MãKH - Tên - Chữ ký.jpg"', sxTenKA({loai:'ky', khach:'ck-Khách Thử'})==='ck-Khách Thử.jpg' && sxDuongKA({loai:'ky'})===D.cauHinh.thumuc+' / Scan chờ sắp xếp'
     && sxTenKA({loai:'ky', khach:c1.ten, maKH:k1})===k1+' - '+c1.ten+' - Chữ ký.jpg' && sxDuongKA({maKH:k1})===D.cauHinh.thumuc+' / Chữ ký - Ảnh khách');
   /* 2. bóc tên + tra Mẫu 31 */
   const bb = sxBoc('cccd-'+c1.ten+'.pdf');
   ok('bóc tên: chữ đầu cccd- / ck- / anh- / 01td-', bb.loai==='cccd' && bb.ten===c1.ten && sxBoc('ck-A B').loai==='ky' && sxBoc('anh-A B').loai==='anh' && sxBoc('01td-A B').loai==='tl:01td', JSON.stringify(bb));
   /* 3.265 (anh chốt): xác định chắc = khớp ≥ 2 trong 3 (CCCD · mã KH · tên) */
   const X1 = sxXacDinh({cccd:c1.cccd, ten:boDau(c1.ten).toUpperCase()}), X2 = sxXacDinh({ten:c1.ten}), X3 = sxXacDinh({cccd:c1.cccd}), X4 = sxXacDinh({cccd:c1.cccd, ten:'Tên Khác Hẳn'}), X5 = sxXacDinh({ma:k1, ten:c1.ten}), X6 = sxXacDinh({ma:k1});
   ok('CCCD + tên (không dấu, hoa) khớp → chắc, xếp được', X1.ma===k1, JSON.stringify(X1));
   ok('chỉ khớp tên → chưa chắc (gợi ý), không tự xếp', !X2.ma && X2.goiY===k1 && /chỉ khớp tên/.test(X2.ly), JSON.stringify(X2));
   ok('anh: số CCCD chuẩn nhất — chỉ có số CCCD (khớp 1 khách) → chắc', X3.ma===k1, JSON.stringify(X3));
   const tenSai = c1.ten.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').slice(0, -1), X7 = sxXacDinh({cccd:c1.cccd, ten:tenSai});
   ok('tên bỏ dấu / thiếu 1 chữ cái + CCCD → vẫn chắc (tên so gần đúng)', X7.ma===k1 && sxTenGan('Nguyễn Văn Hoàng', 'nguyen van hoang') && sxTenGan('Nguyễn Văn Hoàng', 'Nguyen Van Hong') && !sxTenGan('Nguyễn Văn Hoàng', 'Trần Thị Mai'), JSON.stringify(X7));
   ok('CCCD khớp mà tên khác hẳn Mẫu 31 → chưa chắc, ghi rõ lý do', !X4.ma && X4.goiY===k1 && /tên khác hẳn Mẫu 31/.test(X4.ly), JSON.stringify(X4));
   ok('mã KH + tên → chắc; chỉ mã KH → chưa chắc', X5.ma===k1 && !X6.ma && X6.goiY===k1, JSON.stringify([X5, X6]));
   ok('bóc tên có số CCCD + mã KH: "cccd-Tên - 0721… " / "4800…-Tên"', sxBoc('cccd-'+c1.ten+' - '+c1.cccd).cccd===c1.cccd && sxBoc(k1+'-'+c1.ten).ma===k1, JSON.stringify([sxBoc('cccd-'+c1.ten+' - '+c1.cccd), sxBoc(k1+'-'+c1.ten)]));
   /* 3. mã QR / mã máy đọc (dữ liệu GIẢ) */
   const qrTxt = '079000000123|123456789|NGUYỄN VĂN GIẢ|01011980|Nam|Ấp Giả, Xã Thử, Tây Ninh|20082021';
   const q = cccdQR(qrTxt);
   ok('đọc chữ QR: số CCCD, họ tên có dấu, ngày sinh, ngày cấp', q && q.cccd==='079000000123' && q.ten==='NGUYỄN VĂN GIẢ' && q.ns==='1980-01-01' && q.ncap==='2021-08-20' && q.dc.indexOf('Ấp Giả')===0, JSON.stringify(q));
   const sd = '000000123', ck = icaoSo(sd), ns = '800101', nsk = icaoSo(ns);
   const mrz = 'IDVNM'+sd+ck+'079000000123<<9\n'+ns+nsk+'M3601017VNM<<<<<<<<<<<4\nNGUYEN<<VAN<GIA<<<<<<<<<<<<<<<<<';
   const m = cccdMRZ(mrz);
   ok('đọc 3 dòng mã máy đọc: CCCD 12 số, tên không dấu, ngày sinh, giới tính', m && m.cccd==='079000000123' && m.ten==='NGUYEN VAN GIA' && m.ns==='1980-01-01' && m.gt==='Nam', JSON.stringify(m));
   ok('số kiểm sai (đọc nhầm) → bỏ, không đoán', cccdMRZ(mrz.replace('IDVNM'+sd+ck, 'IDVNM'+sd+((ck+1)%10)))===null);
   ok('OCR lẫn O ↔ 0 vẫn đọc đúng', (cccdMRZ(mrz.replace('079000000123', 'O79OOOOOO123'))||{}).cccd==='079000000123');
   /* QR thật trên ảnh thẻ giả → jsQR */
   eval(qrLib);
   qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8']; const qr = qrcode(0, 'M'); qr.addData(qrTxt); qr.make();
   const the = document.createElement('canvas'); the.width = 856; the.height = 540; const g = the.getContext('2d'); g.fillStyle = '#eee'; g.fillRect(0, 0, 856, 540);
   g.fillStyle = '#333'; g.font = '30px sans-serif'; g.fillText('CĂN CƯỚC CÔNG DÂN (GIẢ)', 200, 80);
   const n = qr.getModuleCount(), o4 = 4; const qc = document.createElement('canvas'); qc.width = qc.height = (n+8)*o4; const qg = qc.getContext('2d'); qg.fillStyle = '#fff'; qg.fillRect(0, 0, qc.width, qc.height); qg.fillStyle = '#000';
   for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(qr.isDark(r, c)) qg.fillRect((c+4)*o4, (r+4)*o4, o4, o4);
   g.drawImage(qc, 856-qc.width-20, 20);
   const blT = await new Promise(r=>the.toBlob(r, 'image/jpeg', 0.92));
   const d = await docCCCD(blT, null);
   ok('ảnh mặt trước giả có QR → docCCCD ra số CCCD + tên có dấu (jsQR, không cần mạng sau lần đầu)', d && d.cccd==='079000000123' && d.ten==='NGUYỄN VĂN GIẢ' && d.nguon==='QR', JSON.stringify(d));
   /* 4. bản photo 2 mặt → chia đôi */
   const to = document.createElement('canvas'); to.width = 2000; to.height = 900; const tg = to.getContext('2d'); tg.fillStyle = '#fff'; tg.fillRect(0, 0, 2000, 900); tg.drawImage(the, 1080, 180); tg.drawImage(the, 80, 180);
   const blTo = await new Promise(r=>to.toBlob(r, 'image/jpeg', 0.9));
   const hai = await sxChiaDoi(new File([blTo], 'photo.jpg', {type:'image/jpeg'}));
   const kt = await Promise.all(hai.map(f=>anhTuBlob(f).then(im=>[im.naturalWidth||im.width, im.naturalHeight||im.height])));
   ok('tờ photo ngang → 2 nửa trái / phải (chồng mép 4%), mỗi nửa 1 thẻ', hai.length===2 && kt.every(x=>Math.abs(x[0]-1080)<=2 && x[1]===900), JSON.stringify(kt));
   HS.mo = true; batDauScan('cccd'); await w(200);
   ok('hộp "Quét gì?" (CCCD) có ô "Bản photo 2 mặt trên 1 tờ"', /Bản photo 2 mặt trên 1 tờ/.test(document.getElementById('hop-in').textContent));
   dongHop();
   /* 5. 🧹 Sắp xếp: bản chờ (tên anh gõ) → khớp Mẫu 31 → tên chuẩn + thư mục CCCD; trùng tên → anh chọn; chưa có → giữ chờ */
   D.scan = D.scan || []; D.kyAnh = D.kyAnh || []; const bay = new Date().toISOString();
   const s1 = {id:'t207a', che:'the', ten:'cccd-'+c1.ten+' - '+c1.cccd, chuaKhai:true, tag:['CCCD'], ngay:bay.slice(0,10), suaLuc:bay, matTruoc:true};
   const s2 = {id:'t207b', che:'the', ten:'cccd-Người Không Có Thật Xyz', chuaKhai:true, tag:['CCCD'], ngay:bay.slice(0,10), suaLuc:bay, matTruoc:true};
   const ka = {id:'kat207', loai:'ky', khach:'ck-'+c2.ten, ten:'x.jpg', ngay:bay.slice(0,10), suaLuc:bay};
   D.scan.push(s1, s2); D.kyAnh.push(ka);
   /* trùng tên giả: 2 khách cùng tên */
   const tTrung = 'Trùng Tên Giả Abc'; DB['9990000001'] = {ten:tTrung, tenXa:'Xã A'}; DB['9990000002'] = {ten:tTrung, tenXa:'Xã B'}; SX_CHI = null;
   const s3 = {id:'t207c', che:'tailieu', ten:'01td-'+tTrung, tag:['01TD'], trang:['x'], suaLuc:bay};
   D.scan.push(s3);
   doiNgan(4); await w(400);
   ok('tab Scan: dòng "⏳ n bản chờ sắp xếp" + 🧹 Sắp xếp + 📊 Kiểm tra', /bản chờ sắp xếp/.test(document.getElementById('tr4').textContent) && document.querySelector('#tr4 [data-lenh="sx.sapXep"]') && document.querySelector('#tr4 [data-lenh="sx.kiem"]'));
   document.querySelector('#tr4 [data-lenh="sx.sapXep"]').click(); await w(300);
   const ht = document.getElementById('hop-in').textContent;
   ok('kế hoạch: CCCD + tên → chắc; chữ ký chỉ có tên → gợi ý chờ xác nhận; trùng tên; chưa có Mẫu 31', SXP.khop.some(x=>x.k===s1) && SXP.goiY.some(x=>x.k===ka) && SXP.trung.some(x=>x.k===s3 && x.ds.length===2) && SXP.chua.some(x=>x.k===s2), [SXP.khop.length, SXP.goiY.length, SXP.trung.length, SXP.chua.length].join('/'));
   ok('hộp Sắp xếp ghi quy tắc "khớp ít nhất 2 trong 3"', /ít nhất 2 trong 3/.test(ht));
   const iG = SXP.goiY.findIndex(x=>x.k===ka); document.querySelector('#hop-in [data-lenh="sx.xn"][data-i="'+iG+'"]').click(); await w(150);
   const iT = SXP.trung.findIndex(x=>x.k===s3); document.querySelector('#hop-in [data-lenh="sx.chon"][data-i="'+iT+'"][data-ma="9990000002"]').click(); await w(150);
   document.querySelector('#hop-in [data-lenh="sx.apDung"]').click(); await w(400);
   ok('áp dụng: bản CCCD gắn mã KH, tên theo Mẫu 31, hết "chưa khai", nơi lưu CCCD', s1.maKH===k1 && s1.ten===c1.ten && !s1.chuaKhai && duongScan(s1)===D.cauHinh.thumuc+' / CCCD' && tenScanDrive(s1)===k1+' - '+c1.ten+' - CCCD.pdf', tenScanDrive(s1));
   ok('chữ ký "ck-Tên" → gắn mã KH, tên file chuẩn', ka.maKH===k2 && sxTenKA(ka)===k2+' - '+c2.ten+' - Chữ ký.jpg', sxTenKA(ka));
   ok('trùng tên: theo khách anh chọn', s3.maKH==='9990000002' && tenScanDrive(s3)==='9990000002 - '+tTrung+' - 01TD.pdf', tenScanDrive(s3));
   ok('chưa có trên Mẫu 31 → vẫn ở thư mục chờ', !s2.maKH && duongScan(s2)===D.cauHinh.thumuc+' / Scan chờ sắp xếp');
   /* 6. 📊 Kiểm tra */
   moKiemScan(); for(let i=0;i<30 && !SXK_BANG;i++) await w(200); await w(300);
   const T = SXK_BANG, toCo = T && [].concat(...T.ds.map(x=>x.to)).find(t=>t.ho.some(h=>h.ma===k1));
   ok('Kiểm tra: theo Xã › điểm › tổ; hộ đã có CCCD đánh ✓', T && T.ds.length && toCo && toCo.ho.find(h=>h.ma===k1).cccd===true, toCo ? toCo.ten : 'không thấy tổ của khách');
   ok('bảng Kiểm tra có cột Số hộ / CCCD / Chữ ký / Ảnh / Thiếu', /Số hộ.*CCCD.*Chữ ký.*Ảnh.*Thiếu/.test(document.getElementById('hop-in').textContent.replace(/\s+/g, ' ')));
   if(toCo){ document.querySelector('#hop-in [data-lenh="sx.moTo"][data-to="'+toCo.ma+'"]').click(); await w(200); }
   ok('bấm tổ → danh sách từng hộ ✓ / ✗', toCo && document.querySelectorAll('#hop-in .sx-ho span').length===toCo.ho.length);
   dongHop();
   /* 7. ảnh khách từ mặt trước CCCD — JPG ≤ 200 KB */
   const to2 = document.createElement('canvas'); to2.width = 2400; to2.height = 1500; const g2 = to2.getContext('2d'); for(let i=0;i<4000;i++){ g2.fillStyle = 'hsl('+(i%360)+',60%,50%)'; g2.fillRect(Math.random()*2400, Math.random()*1500, 40, 40); }
   const blTo2 = await new Promise(r=>to2.toBlob(r, 'image/jpeg', 0.98));
   await luuAnhHS(s1.id+'_matTruoc', blTo2);
   const an = await sxAnhTuCCCD(s1);
   ok('lưu CCCD → tự tạo Ảnh khách từ mặt trước, nén ≤ 200 KB, tên "MãKH - Tên - Ảnh.jpg"', an && an.loai==='anh' && an.co<=200*1024 && an.ten===k1+' - '+c1.ten+' - Ảnh.jpg', an ? an.ten+' '+Math.round(an.co/1024)+' KB (gốc '+Math.round(blTo2.size/1024)+' KB)' : 'không tạo');
   ok('khách đã có ảnh → không tạo trùng', (await sxAnhTuCCCD(s1))===null);
   /* dọn */
   D.scan = D.scan.filter(k=>!/^t207/.test(k.id)); D.kyAnh = D.kyAnh.filter(k=>k.id!=='kat207' && !(an && k.id===an.id)); delete DB['9990000001']; delete DB['9990000002']; luu();
   return o;
 }, [files, qrLib]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
