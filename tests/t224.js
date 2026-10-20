// 3.297 (bước 3 kế hoạch tên + lưu) — tài liệu là mẫu hồ sơ vay → thư mục Hồ sơ vay, tên chuẩn; hộ mới khóa số CCCD;
// 📷 Quét bản đã ký (scanChoKhach): khách + loại điền sẵn ở bước lưu → 🗄 Lưu vào tủ ra tên chuẩn. Dữ liệu GIẢ.
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
   await slNap(); await w(200); D.cauHinh.thumuc = 'Tủ hồ sơ';
   const DB = KHO.dsKhach(), ma = Object.keys(DB).find(m=>DB[m].ten), ten = DB[ma].ten;
   /* 1. quy tắc thư mục + tên */
   const a = {che:'tailieu', maKH:ma, ten, tag:['01GQVL']}, b2 = {che:'tailieu', maKH:ma, ten, tag:['Giấy xác nhận']}, c = {che:'tailieu', maKH:'', khoaCCCD:'079078001234', ten:'Nguyễn Văn Giả', tag:['01TD']}, d = {che:'tailieu', maKH:'', ten:'x', tag:['01TD']};
   ok('tài liệu loại 01GQVL (mẫu hồ sơ vay) → thư mục Hồ sơ vay; loại khác → Hồ sơ scan', duongScan(a)==='Tủ hồ sơ / Hồ sơ vay' && duongScan(b2)==='Tủ hồ sơ / Hồ sơ scan' && tenScanDrive(a)===ma+' - '+ten+' - 01GQVL.pdf', [duongScan(a), duongScan(b2), tenScanDrive(a)].join(' | '));
   ok('hộ mới (chưa mã KH) có số CCCD → Hồ sơ vay, tên "số CCCD - Họ tên - 01TD"; không khóa → Chờ sắp xếp', duongScan(c)==='Tủ hồ sơ / Hồ sơ vay' && tenScanDrive(c)==='079078001234 - Nguyễn Văn Giả - 01TD.pdf' && duongScan(d)==='Tủ hồ sơ / Scan chờ sắp xếp', [duongScan(c), tenScanDrive(c), duongScan(d)].join(' | '));
   /* 2. Quét bản đã ký: điền sẵn ở bước lưu → Lưu vào tủ */
   const anh = await new Promise(r=>{ const cv=document.createElement('canvas'); cv.width=620; cv.height=877; const g=cv.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,620,877); g.fillStyle='#000'; g.fillRect(60,60,300,20); cv.toBlob(r,'image/jpeg',0.9); });
   HS.mo = true; doiNgan(4); await w(200);
   const chay = async (dat) => { scanChoKhach(dat); await w(200); try{dongHop()}catch(e){} SC.che = 'tailieu'; HANG = []; await luuAnhHS('t224p', anh); HANG.push({id:'t224p', kieu:'anh', che:'tailieu', khung:null});
     SX = null; scanXongHop(new Blob(['%PDF'], {type:'application/pdf'})); await w(300);
     const e = document.getElementById('sx-ten'), ghi = (document.querySelector('#hop-in .ql-dat')||{}).textContent||'';
     const n0 = D.scan.length; henDongBoScan = function(){}; qlLuuTu(); for(let i=0;i<30 && D.scan.length===n0;i++) await w(150); await w(200);
     return {ten:e && e.value, ghi, k:D.scan.slice(n0)[0]}; };
   const r1 = await chay({ma, ten, loai:'01TD'});
   ok('hộ cũ: bước lưu điền sẵn tên chuẩn + dòng 📌; Lưu vào tủ → tag 01TD, mã KH, thư mục Hồ sơ vay', r1.ten===ma+' - '+ten+' - 01TD' && /Hồ sơ vay/.test(r1.ghi) && r1.k && r1.k.maKH===ma && r1.k.tag[0]==='01TD' && duongScan(r1.k)==='Tủ hồ sơ / Hồ sơ vay' && !SC_DAT, JSON.stringify({ten:r1.ten, k:r1.k && {ma:r1.k.maKH, tag:r1.k.tag}}));
   const r2 = await chay({ma:'', ten:'Nguyễn Văn Giả', cccd:'079078001234', loai:'01TD', ap:'Thôn 01'});
   ok('hộ mới: lưu với khóa số CCCD → tên "số CCCD - Họ tên - 01TD", thư mục Hồ sơ vay (không vào Chờ sắp xếp)', r2.k && r2.k.khoaCCCD==='079078001234' && tenScanDrive(r2.k)==='079078001234 - Nguyễn Văn Giả - 01TD.pdf' && duongScan(r2.k)==='Tủ hồ sơ / Hồ sơ vay', JSON.stringify(r2.k && {khoa:r2.k.khoaCCCD, ten:tenScanDrive(r2.k)}));
   ok('"Hồ sơ của khách" (khung phải) liệt kê bản 01TD vừa lưu', /01TD/.test(sxHoSoKhach(ma, '')), sxHoSoKhach(ma, '').replace(/<[^>]+>/g, ' ').slice(0, 200));
   /* hộ mới không đếm vào Chờ sắp xếp; khi Mẫu 31 có mã KH cho số CCCD đó → Sắp xếp đề nghị đổi khóa sang mã KH */
   const cho = sxDangCho(r2.k), cc = DB[ma].cccd; r2.k.khoaCCCD = String(cc||''); r2.k.ten = DB[ma].ten; const KH = sxKeHoach(), khop = KH.khop.find(x=>x.k===r2.k);
   ok('hồ sơ vay hộ mới không tính là "Chờ sắp xếp"; Mẫu 31 có mã KH cho số CCCD → Sắp xếp nhận ra, đổi khóa sang mã KH', !cho && (!/^\d{12}$/.test(String(cc||'')) || (khop && khop.ma===ma)), JSON.stringify({cho, cc, khop:khop && khop.ma}));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
