// 3.275 — 🔎 Tra Mẫu 31 cạnh ô tên (tab Scan): hộp Sửa bản quét · Lưu mới (Tên file) · Chữ ký / Ảnh; gõ CCCD / mã KH / họ tên → tên chuẩn;
// trùng tên ưu tiên tổ đang chọn; không có → giữ tên; hộp Sửa máy không có ảnh → lấy ảnh. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   await slNap(); await w(200);
   const DB = KHO.dsKhach(), ma = Object.keys(DB).find(m=>/^\d{12}$/.test(String(DB[m].cccd||'')) && DB[m].ten), c = DB[ma], bay = new Date().toISOString();
   HS.mo = true; doiNgan(4); await w(300);
   /* 1. hộp Sửa bản quét: gõ số CCCD → tra → gắn khách, địa bàn, tên chuẩn */
   const k = {id:'t214a', che:'the', ten:'Nguyen Gia', tag:['CCCD'], matTruoc:false, ngay:bay.slice(0,10), suaLuc:bay, chuaKhai:true}; D.scan.push(k); HS.ds = D.scan;
   themKhach('t214a'); await w(300);
   const nut = document.querySelector('#hop-in [data-lenh="tr.tra"][data-o="k-ten"]');
   ok('hộp Sửa bản quét: nút 🔎 Tra Mẫu 31 cạnh ô Họ và tên khách', !!nut && nut.closest('.tr-o') && nut.closest('.tr-o').querySelector('#k-ten'));
   document.getElementById('k-ten').value = c.cccd; nut.click(); await w(200);
   const kq = document.getElementById('tr-kq-k-ten').textContent;
   ok('gõ số CCCD → khớp 1 khách: ô tên = họ tên Mẫu 31, gắn mã KH, báo tên file chuẩn + thư mục CCCD', k.maKH===ma && document.getElementById('k-ten').value===c.ten && /Lưu thành/.test(kq) && kq.indexOf(ma+' - '+c.ten+' - CCCD.pdf')>=0 && /CCCD/.test(kq), kq);
   ok('địa bàn tự chọn theo Mẫu 31 (xã, ấp, tổ)', (document.getElementById('k-xa')||{}).value===sxKhach(ma).xa && (document.getElementById('k-ap')||{}).value===sxKhach(ma).ap && (k.to||'').indexOf(c.to)===0, [(document.getElementById('k-xa')||{}).value, (document.getElementById('k-ap')||{}).value, k.to].join(' | '));
   luuKhach(); await w(300);
   ok('Lưu hồ sơ → bản gắn mã KH, hết "chờ khai", tên Drive chuẩn ở thư mục CCCD', k.maKH===ma && !k.chuaKhai && tenScanDrive(k)===ma+' - '+c.ten+' - CCCD.pdf' && duongScan(k)===D.cauHinh.thumuc+' / CCCD', tenScanDrive(k));
   /* 2. gõ mã KH → nhận luôn; gõ tên trùng → danh sách, ưu tiên tổ đang chọn; không có → giữ tên */
   const tT = 'Trần Thị Giả Trùng'; DB['9990000201'] = {ten:tT, to:'TX1', tenXa:'Xã A'}; DB['9990000202'] = {ten:tT, to:'0062354', tenXa:'Xã B'}; SX_CHI = null;
   ok('gõ đúng mã KH → nhận luôn', trTim(ma).ma===ma);
   const T1 = trTim('tran thi gia trung', {to:'Mai Văn Giả', maTo:'0062354', ap:''}), T0 = trTim('tran thi gia trung');
   ok('gõ tên trùng 2 khách → danh sách chọn; tổ đang chọn lên đầu', T0.ds && T0.ds.length===2 && T1.ds && T1.ds[0]==='9990000202', JSON.stringify([T0, T1]));
   ok('gõ tên không có trên Mẫu 31 → không gắn', !trTim('Người Không Có Xyzw').ma && !(trTim('Người Không Có Xyzw').ds||[]).length);
   /* Enter trong ô cũng tra */
   const k2 = {id:'t214b', che:'the', ten:'', tag:['CCCD'], ngay:bay.slice(0,10), suaLuc:bay}; D.scan.push(k2); dongHop(); themKhach('t214b'); await w(300);
   const e2 = document.getElementById('k-ten'); e2.value = tT; e2.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await w(200);
   const r2 = document.querySelectorAll('#tr-kq-k-ten input[data-lenh="tr.chon"]');
   ok('Enter trong ô → tra; trùng tên → nút tròn chọn (kèm CCCD / ngày sinh Mẫu 31)', r2.length===2 && /Mẫu 31 chưa có CCCD/.test(document.getElementById('tr-kq-k-ten').textContent), r2.length);
   if(!r2[1]){ o.push('✗ (dò) kq: '+(document.getElementById('tr-kq-k-ten')||{}).innerHTML+' · data-tr '+e2.getAttribute('data-tr')); return o; } r2[1].click(); await w(150);
   ok('chọn 1 khách → gắn mã KH khách đó', k2.maKH===r2[1].getAttribute('data-ma'), k2.maKH);
   dongHop();
   /* 3. Lưu mới (ô Tên file) và Chữ ký / Ảnh */
   SC.che = 'the'; HANG = [{kieu:'anh', id:'x1'}, {kieu:'anh', id:'x2'}]; SX = {bl:null, da:{}, ten:'Scan'}; SXK = [];
   moHop('<label class="xp-ten">Tên file <input id="sx-ten" value="'+c.cccd+'"></label>'); await w(100);
   document.querySelector('#hop-in [data-lenh="tr.tra"][data-o="sx-ten"]').click(); await w(150);
   ok('Lưu mới: gõ số CCCD ở Tên file → tên chuẩn "MãKH - Họ tên - CCCD", chọn sẵn khách, nút 🗄 Lưu đúng khách này', SX.ten===ma+' - '+c.ten+' - CCCD' && SXK[0] && SXK[0].ma===ma && document.querySelector('#hop-in [data-lenh="tr.luuTu"]'), SX.ten);
   dongHop(); HANG = []; SX = null; SXK = [];
   KA.ten = ''; moHop('<div class="o"><label>Tên khách</label><input id="ka-ten" value="" oninput="KA.ten=this.value"></div>'); await w(100);
   document.getElementById('ka-ten').value = ma; document.querySelector('#hop-in [data-lenh="tr.tra"][data-o="ka-ten"]').click(); await w(150);
   const kb = sxBoc(KA.ten), kx = sxXacDinh({cccd:kb.cccd, ma:kb.ma, ten:kb.ten});
   ok('Chữ ký / Ảnh: gõ mã KH → ô tên "MãKH - Họ tên" → lưu ra mã KH chắc (tên chuẩn)', KA.ten===ma+' - '+c.ten && kx.ma===ma, KA.ten);
   dongHop();
   /* 3.279: tài liệu chỉ có PDF trên Drive (máy chưa có trang) → Tra Mẫu 31 rồi Lưu được; ☁ Tải trang từ Drive */
   const tl = {id:'t214c', che:'tailieu', ten:'Vo Gia Cuong don vay', tag:[], trang:[], driveId:'drvTL', ngay:bay.slice(0,10), suaLuc:bay}; D.scan.push(tl); HS.ds = D.scan;
   scanTaiLieu('t214c'); await w(300);
   ok('hộp Sửa tài liệu: có nút Tra Mẫu 31; ô Các trang báo "trang trong PDF trên Drive" + nút Tải trang', !!document.querySelector('#hop-in [data-lenh="tr.tra"][data-o="k-ten"]') && /PDF trên Drive/.test(document.getElementById('k-xem').textContent) && !!document.querySelector('#hop-in [data-lenh="tl.taiTrang"]'));
   document.getElementById('k-ten').value = c.cccd; document.querySelector('#hop-in [data-lenh="tr.tra"][data-o="k-ten"]').click(); await w(200);
   const cuDay = dayScanNhieu; let day = []; dayScanNhieu = ids => { day = ids; return Promise.resolve(); }; const cuN = coTheNoiDrive; coTheNoiDrive = () => true;
   let loiBao = ''; const cuLoi = baoLoi; baoLoi = t => { loiBao = t; };
   luuScanTL(); await w(200); baoLoi = cuLoi; dayScanNhieu = cuDay; coTheNoiDrive = cuN;
   ok('bấm Lưu: không còn báo "Chưa có trang nào" — lưu tên chuẩn + mã KH, đưa Drive đổi tên / dời', !loiBao && tl.maKH===ma && tenScanDrive(tl)===ma+' - '+c.ten+' - Tài liệu.pdf' && day[0]==='t214c' && tl.canDay, loiBao || tenScanDrive(tl));
   const pdf = await PDFLib.PDFDocument.create(); pdf.addPage([595, 842]); pdf.addPage([595, 842]); const pb = await pdf.save();
   const cuT = taiPDFDrive, cuN2 = coTheNoiDrive; taiPDFDrive = () => Promise.resolve(new Blob([pb], {type:'application/pdf'})); coTheNoiDrive = () => true;
   window.__k = tl; tlTaiTrang(); for(let i=0;i<30 && !(tl.trang||[]).length;i++) await w(200); taiPDFDrive = cuT; coTheNoiDrive = cuN2;
   ok('☁ Tải trang từ Drive → bản có đủ trang PDF (xem / thêm trang được)', (tl.trang||[]).length===2 && laTrangPDF(tl.trang[0]), JSON.stringify(tl.trang));
   try{ dongHop(); }catch(e){}
   D.scan = D.scan.filter(x=>!/^t214/.test(x.id)); ['9990000201', '9990000202'].forEach(m=>delete DB[m]); SX_CHI = null; luu();
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
