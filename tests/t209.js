// 3.269 — đọc CCCD ảnh cả tờ (2 thẻ trên 1 trang), thẻ Căn cước mẫu mới (QR mặt sau, nội dung khác mẫu), đọc lại bản cũ đọc hỏng,
// trùng tên → ngày sinh trên thẻ phân biệt, màn Sắp xếp hiện số CCCD Mẫu 31 + ảnh thẻ. Tesseract chạy trong máy (tests/lib).
// Dữ liệu GIẢ: bộ tests/gianho31 + số CCCD / tên tự đặt — không ảnh CCCD thật.
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
   const DB = KHO.dsKhach();
   eval(qrLib); qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
   const veQR = (g, txt, x, y, z) => { const qr = qrcode(0, 'M'); qr.addData(txt); qr.make(); const n = qr.getModuleCount(); g.fillStyle = '#fff'; g.fillRect(x, y, (n+8)*z, (n+8)*z); g.fillStyle = '#000';
     for(let r=0;r<n;r++) for(let q=0;q<n;q++) if(qr.isDark(r, q)) g.fillRect(x+(q+4)*z, y+(r+4)*z, z, z); };
   const blob = c => new Promise(r=>c.toBlob(r, 'image/jpeg', 0.92));
   /* mặt sau thẻ mẫu mới (giả): QR góc trên phải + 3 dòng mã máy đọc */
   const mSau = (so, ns, ten, qrTxt) => { const sd = so.slice(-9), hn = '44'+ns.slice(2), L = ['IDVNM'+sd+icaoSo(sd)+so+'<<1', ns+icaoSo(ns)+'F'+hn+icaoSo(hn)+'VNM<<<<<<<<<<<0', ten];
     const c = document.createElement('canvas'); c.width = 856; c.height = 540; const g = c.getContext('2d'); g.fillStyle = '#e8eee0'; g.fillRect(0, 0, 856, 540); g.fillStyle = '#222'; g.font = '22px sans-serif'; g.fillText('Nơi cư trú: Ấp Giả, Xã Thử', 30, 80);
     if(qrTxt) veQR(g, qrTxt, 640, 20, 3);
     g.font = 'bold 34px "Courier New", monospace'; L.forEach((l, i)=>g.fillText(l, 30, 410+i*42)); return c; };
   /* 1. mặt sau đã cắt → mã máy đọc (Tesseract trong máy) */
   const s1 = mSau('072184000901', '841006', 'NGUYEN<<THI<BICH<GIA<<<<<<<<<<', '');
   const r1 = await docCCCD(null, await blob(s1));
   ok('mặt sau thẻ → đọc 3 dòng mã máy đọc: số, ngày sinh, hạn, tên', r1 && r1.cccd==='072184000901' && r1.ns==='1984-10-06' && r1.nguon==='mã máy đọc', JSON.stringify(r1));
   /* 2. ảnh cả tờ A4, 2 thẻ trên cùng (như khung xem) — trước đây không đọc được */
   const A = document.createElement('canvas'); A.width = 1240; A.height = 1754; const a = A.getContext('2d'); a.fillStyle = '#fff'; a.fillRect(0, 0, 1240, 1754); a.fillStyle = '#ccd'; a.fillRect(40, 60, 560, 353);
   a.drawImage(mSau('072184000902', '841006', 'NGUYEN<<THI<BICH<GIA<<<<<<<<<<', ''), 640, 60, 560, 353);
   const r2 = await docCCCD(await blob(A), null);
   ok('ảnh cả tờ có 2 thẻ (mã máy đọc không nằm ở đáy ảnh) → đọc từng góc phóng to ra số', r2 && r2.cccd==='072184000902', JSON.stringify(r2));
   /* 3. QR nhỏ trên ảnh cả tờ (thẻ mẫu mới: QR mặt sau) */
   const B = document.createElement('canvas'); B.width = 1240; B.height = 1754; const bg = B.getContext('2d'); bg.fillStyle = '#fff'; bg.fillRect(0, 0, 1240, 1754);
   bg.fillStyle = '#ccd'; bg.fillRect(40, 60, 560, 353); bg.fillStyle = '#e8eee0'; bg.fillRect(640, 60, 560, 353); veQR(bg, '072184000903|184000903|Nguyễn Thị Giả Ba|06101984|Nữ|Ấp Giả|01072024', 1060, 70, 2);
   const r3 = await docCCCD(await blob(B), null);
   ok('QR nhỏ trên ảnh cả tờ → tìm theo góc, phóng to → đọc được', r3 && r3.cccd==='072184000903' && r3.nguon==='QR', JSON.stringify(r3));
   ok('QR nội dung khác mẫu (thẻ Căn cước mới…) → vẫn lấy số 12 chữ số + họ tên', (cccdQR('https://x?vn=1|072184000904|Nguyễn Thị Giả Bốn|xyz')||{}).cccd==='072184000904' && cccdQR('072184000904 abc').cccd==='072184000904' && cccdQR('khong co so')===null, JSON.stringify(cccdQR('https://x?vn=1|072184000904|Nguyễn Thị Giả Bốn|xyz')));
   /* 4. trùng tên → ngày sinh trên thẻ phân biệt */
   const tT = 'Nguyễn Thị Giả Trùng'; DB['9990000091'] = {ten:tT, ns:'1984-10-06', tenXa:'Xã A'}; DB['9990000092'] = {ten:tT, ns:'1970-01-01', tenXa:'Xã B'}; SX_CHI = null;
   const X = sxXacDinh({ten:tT, ns:'1984-10-06'}), X0 = sxXacDinh({ten:tT});
   ok('trùng tên 2 khách, ngày sinh trên thẻ khớp 1 → gợi ý đúng khách đó (anh tích ✓), không ngày sinh → vẫn trùng', X.goiY==='9990000091' && /ngày sinh/.test(X.ly) && X0.ds && X0.ds.length===2, JSON.stringify(X));
   /* 5. bản đọc hỏng ở bộ đọc cũ (cccdKhong = 1) → đọc lại; màn Sắp xếp hiện số Mẫu 31 + ảnh thẻ */
   const bay = new Date().toISOString();
   const k1 = {id:'t209a', che:'the', ten:'Nguyen Thi Gia Trung', tag:['CCCD'], matTruoc:true, matSau:true, cccdKhong:1, suaLuc:bay};
   await luuAnhHS('t209a_matTruoc', await blob((()=>{ const c=document.createElement('canvas'); c.width=856; c.height=540; const g=c.getContext('2d'); g.fillStyle='#ccd'; g.fillRect(0,0,856,540); return c; })()));
   await luuAnhHS('t209a_matSau', await blob(mSau('072184000905', '841006', 'NGUYEN<<THI<GIA<TRUNG<<<<<<<<', '')));
   const k2 = {id:'t209b', che:'the', ten:'Nguyen Thi Gia Trung', tag:['CCCD'], matTruoc:true, cccdKhong:2, suaLuc:bay};
   D.scan = D.scan || []; D.scan.push(k1, k2);
   moSapXep(); for(let i=0;i<80 && !/Sắp xếp hồ sơ scan/.test((document.getElementById('hop-in')||{}).textContent||'');i++) await w(250); await w(400);
   ok('bản cũ đọc hỏng (bộ đọc trước) → đọc lại, ra số + ngày sinh', k1.cccd==='072184000905' && k1.cccdDoc && k1.cccdDoc.ns==='1984-10-06' && !k1.cccdKhong, JSON.stringify([k1.cccd, k1.cccdDoc]));
   ok('bản đã đọc hỏng ở bộ đọc mới → không đọc lại', k2.cccdKhong===2 && !k2.cccd);
   ok('ngày sinh trên thẻ khớp 1 trong 2 khách trùng tên → khối Gợi ý (không còn ở Trùng tên)', SXP.goiY.some(x=>x.k===k1 && x.ma==='9990000091') && !SXP.trung.some(x=>x.k===k1), JSON.stringify(SXP.goiY.filter(x=>x.k===k1).map(x=>x.ly)));
   const ht = document.getElementById('hop-in').textContent;
   ok('dòng gợi ý / trùng hiện số đọc được trên thẻ + CCCD / ngày sinh Mẫu 31 từng khách', /Thẻ đọc được: 072184000905/.test(ht) && /Mẫu 31 chưa có CCCD · sinh 06\/10\/1984/.test(ht), '');
   ok('bản trùng chưa đọc được → báo "Chưa đọc được số trên thẻ — xem ảnh"', /Chưa đọc được số trên thẻ/.test(ht) && SXP.trung.some(x=>x.k===k2));
   await w(500);
   ok('có ảnh nhỏ mặt thẻ để anh nhìn (2 mặt; bản không còn ảnh thì bỏ)', document.querySelectorAll('#hop-in img.sx-nho').length===2, document.querySelectorAll('#hop-in img.sx-nho').length+' ảnh');
   dongHop();
   /* dọn */
   D.scan = D.scan.filter(k=>!/^t209/.test(k.id)); ['9990000091', '9990000092'].forEach(m=>delete DB[m]); SX_CHI = null; luu();
   return o;
 }, [files, qrLib]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
