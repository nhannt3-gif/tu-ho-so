// 3.240 (anh 17/10, đối chiếu 2 file 01/TD anh gửi): bảng đối tượng đúng số dòng có số liệu, chữ dài xuống dòng (HSSV không thu nhỏ); bản trắng 3 dòng chấm như gốc;
//   chừa chỗ Chủ tịch UBND ký; luôn vừa 1 trang A4 (HSSV tên dài + UBND); ⚙ Khai báo riêng có nút mở / tắt, mặc định tắt; phiếu chưa gắn sổ tự gắn vào Sổ hộ vay. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const w = t=>p.waitForTimeout(t), ev = f=>p.evaluate(f);
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; D.cauHinh.hsoO = {}; }, files);
 const trang = async(h)=>{ const q = await b.newPage(); await q.setContent(h); const pdf = await q.pdf({preferCSSPageSize:true, printBackground:true}); await q.close(); return (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)||[]).length; };
 /* 1. HSSV tên dài + UBND */
 await ev(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const tv = hsoTVTo(TO_K.to[C.to]), ho = hmTuM31(tv[0].kh); hmLamHS(ho.id, '01td'); await w(300); const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Nguyễn Hoàng Bảo Giả Tên Rất Dài Để Thử', soThang:'15'}); B.tien = '60000000'; B.tuCo = '20000000'; hsoBoLuu(); hsoVe(); await w(1200); });
 let r = await ev(()=>{ const d = document.createElement('div'); d.innerHTML = hsoLap().h; const bang = [...d.querySelectorAll('table')].find(t=>/Đối tượng/.test(t.textContent)); const hang = bang ? [...bang.querySelectorAll('tr')].slice(1) : [];
   const o1 = hang[0] && hang[0].querySelector('.om'); return {n:hang.length, cham:hang.some(h=>/……/.test(h.textContent)), nho:o1 ? (o1.getAttribute('style')||'') : '', chu:hang[0] ? hang[0].textContent : ''}; });
 ok('HSSV: bảng chỉ dòng số liệu, bỏ dòng chấm thừa (3.247 anh 18/10)', r.n===1 && !r.cham && /Tên Rất Dài/.test(r.chu), JSON.stringify(r));
 ok('HSSV: dòng sinh viên chữ thường (không thu nhỏ cỡ chữ, không ép 1 dòng)', !/font-size|nowrap|width/.test(r.nho) && /Tên Rất Dài Để Thử/.test(r.chu), r.nho);
 r = await ev(()=>{ const h = hsoLap().h, i = h.indexOf('(ký tên, đóng dấu)'); return (h.slice(i, i+400).match(/&nbsp;/g)||[]).length; });
 ok('UBND: chừa ≥ 5 dòng chỗ Chủ tịch ký + đóng dấu', r>=5, r);
 r = await ev(()=>{ const d = document.createElement('div'); d.innerHTML = hsoLap().h; const t = d.textContent.replace(/\s+/g, ' ');
   return {t:t.slice(0, 900), cc:/- Số CC\/CCCD: \d{9,12}, ngày cấp: \d\d\/\d\d\/\d{4}, nơi cấp: \S/.test(t), dc:/- Địa chỉ cư trú: (ấp|khu phố) [^,]+, (xã|phường) [^,]+, tỉnh Tây Ninh\./.test(t),
     tien:/số tiền: 60\.000\.000 đồng/.test(t) && /\(Bằng chữ: Sáu mươi triệu đồng\)/.test(t) && /Vốn tự có tham gia: 20\.000\.000 đồng\./.test(t) && /Vốn vay NHCSXH: 60\.000\.000 đồng để/.test(t),
     ky:/Kỳ hạn trả nợ: 12 tháng\/lần/.test(t), hoi:/Thuộc tổ chức (Hội (Nông dân|Cựu chiến binh|Liên hiệp phụ nữ)|Đoàn thanh niên) quản lý/.test(t), ctGiua:/text-align:center/.test((d.innerHTML.match(/<p[^>]*><b>Chương trình cho vay/)||[''])[0]),
     ngayDam:/<p class="c b i">Ngày/.test(d.innerHTML), co14:OM_MAU['01td'].co===14}; });
 ok('3.247 (anh 18/10) có số liệu → in liền như đánh máy: CCCD, ngày cấp, nơi cấp cách dấu phẩy; địa chỉ "ấp / khu phố …, xã / phường …, tỉnh Tây Ninh."; tiền sát chữ "đồng"; kỳ hạn 12 tháng/lần', r.cc && r.dc && r.tien && r.ky, JSON.stringify(r));
 ok('3.247: tổ chức quản lý "Hội Nông dân / Cựu chiến binh / Liên hiệp phụ nữ / Đoàn thanh niên" (không ghi xã); Chương trình canh giữa; ngày của đơn không đậm; chữ 14', r.hoi && r.ctGiua && !r.ngayDam && r.co14, JSON.stringify({hoi:r.hoi, ct:r.ctGiua, dam:r.ngayDam, co:r.co14}));
 r = await ev(()=>[hsoHoiNgan('Hội Nông dân xã Truông Mít'), hsoHoiNgan('Hội Cựu chiến binh phường Gia Lộc'), hsoHoiNgan('Hội Liên hiệp Phụ nữ xã A'), hsoHoiNgan('Đoàn Thanh niên xã Truông Mít')].join('|'));
 ok('hsoHoiNgan: tên tổ chức in trên đơn', r==='Hội Nông dân|Hội Cựu chiến binh|Hội Liên hiệp phụ nữ|Đoàn thanh niên', r);
 let n = await trang(await ev(()=>HSO.x.trang));
 ok('HSSV tên dài + khối UBND: vừa 1 trang A4 (chỗ ký NH không tràn)', n===1, n+' trang');
 /* 2. NSVSMT 2 công trình */
 await ev(async()=>{ const B = hsoBo(); B.ct = 'NSVSMT'; B.pa = Object.assign(B.pa||{}, {nuoc:true, vs:true}); B.tien = ''; hsoBoLuu(); hsoVe(); await new Promise(r=>setTimeout(r, 1200)); });
 r = await ev(()=>{ const d = document.createElement('div'); d.innerHTML = hsoLap().h; const bang = [...d.querySelectorAll('table')].find(t=>/Đối tượng/.test(t.textContent)); return bang ? [...bang.querySelectorAll('tr')].slice(1).map(h=>h.textContent.replace(/\s+/g, ' ').trim()) : []; });
 ok('NSVSMT tích cấp nước + vệ sinh: đúng 2 dòng số liệu (3.247: không dòng chấm)', r.length===2 && /Công trình cấp nước/.test(r[0]) && /Công trình vệ sinh/.test(r[1]), JSON.stringify(r));
 n = await trang(await ev(()=>HSO.x.trang)); ok('NSVSMT: 1 trang A4', n===1, n+' trang');
 /* 3. bản trắng: 3 dòng chấm như gốc */
 r = await ev(()=>{ omKieuDat('trang'); const d = document.createElement('div'); d.innerHTML = hsoLap().h; const bang = [...d.querySelectorAll('table')].find(t=>/Đối tượng/.test(t.textContent)); const x = bang ? [...bang.querySelectorAll('tr')].slice(1).filter(h=>/…|\.\.\./.test(h.textContent)).length : -1; omKieuDat('that'); return x; });
 ok('📄 Bản trắng: bảng đối tượng 2 dòng chấm (3.247 anh 18/10 bỏ bớt 1 — chữ 14 vừa 1 trang)', r===2, r);
 /* 3b. 03/TD theo file anh gửi (HSSV): 1 hộ = 1 dòng số liệu + 2 dòng trống, mục đích chữ thường xuống dòng, số tiền theo 01/TD; bản trắng 5 dòng */
 r = await ev(async()=>{ const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Cù Thị Giả Ngọc'}); B.tien = '100000000'; hsoBoLuu(); const D3 = hsoD03(); D3.ct = 'HSSV'; D3.ds = []; luu(); hsoChonMau('03td'); await new Promise(r=>setTimeout(r, 1200));
   const d = document.createElement('div'); d.innerHTML = hsoLap().h; const bang = [...d.querySelectorAll('table')].find(t=>/Mục đích sử dụng vốn/.test(t.textContent)); const hang = [...bang.querySelectorAll('tr')].filter(t=>!/Mục đích|Số tiền|Cộng|^\s*1\s*2\s*3/.test(t.textContent) && t.querySelectorAll('td').length===8);
   const md = hang[0] && hang[0].querySelectorAll('td')[4].querySelector('.om'); return {n:hang.length, ten:hang[0] ? hang[0].textContent : '', mdSt:md ? md.getAttribute('style') : '', tien:/100\.000\.000/.test(hang[0] ? hang[0].textContent : '')}; });
 ok('03/TD 1 hộ: 3 dòng (1 số liệu + 2 trống), số tiền theo 01/TD, mục đích chữ thường xuống dòng', r.n===3 && r.tien && /Cù Thị Giả Ngọc/.test(r.ten) && !/font-size|nowrap|width/.test(r.mdSt), JSON.stringify(r));
 r = await ev(()=>{ omKieuDat('trang'); const d = document.createElement('div'); d.innerHTML = hsoLap().h; omKieuDat('that'); const bang = [...d.querySelectorAll('table')].find(t=>/Mục đích sử dụng vốn/.test(t.textContent)); return [...bang.querySelectorAll('tr')].filter(t=>t.querySelectorAll('td').length===8 && !/Mục đích|Số tiền|Cộng/.test(t.textContent) && !/^\s*1\s*2/.test(t.textContent)).length; });
 ok('03/TD bản trắng: 5 dòng', r===5, r);
 await ev(()=>{ hsoChonMau('01td'); }); await w(800);
 /* 4. khai báo riêng: nút mở / tắt, mặc định tắt */
 await w(500);
 r = await ev(()=>{ const d = document.querySelector('#hso-tuy details.hso-kbr-d'); return d ? {mo:d.open, nut:getComputedStyle(d.querySelector('summary'), '::after').content} : null; });
 ok('⚙ Khai báo riêng mặc định TẮT, có nút "▸ Mở"', r && !r.mo && /Mở/.test(r.nut), JSON.stringify(r));
 await p.click('#hso-tuy details.hso-kbr-d > summary'); await w(400);
 r = await ev(()=>{ hsoVe(); const d = document.querySelector('#hso-tuy details.hso-kbr-d'); return {mo:d.open, nho:hsoKBRDangMo('01td'), nut:getComputedStyle(d.querySelector('summary'), '::after').content}; });
 ok('bấm → mở, nhớ khi vẽ lại, nút đổi "▾ Tắt"', r.mo && r.nho && /Tắt/.test(r.nut), JSON.stringify(r));
 await p.click('#hso-tuy details.hso-kbr-d > summary'); await w(400);
 ok('bấm lần nữa → tắt', await ev(()=>!hsoKBRDangMo('01td')));
 /* 5. phiếu chưa gắn sổ tự gắn */
 r = await ev(async()=>{ const B = hsoBoMoi(); B.nv = {ten:'Người Phiếu Cũ', cccd:'079099009999', ns:'1990-01-01'}; B.hoId = ''; hsoCH().boId = B.id; luu(); hsoVe(); await new Promise(r=>setTimeout(r, 800));
   const o = hmDs().find(x=>(x.tv[0]||{}).cccd==='079099009999'); return {hoId:B.hoId, coSo:!!o, khop:!!o && o.id===B.hoId, trang:/Chưa chọn hộ/.test(document.getElementById('hso-tuy').textContent)}; });
 ok('phiếu cũ chưa gắn sổ → tự thêm vào Sổ hộ vay và gắn, mẫu hiện đúng hộ (không ra mẫu trắng)', r.coSo && r.khop && !r.trang, JSON.stringify(r));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
