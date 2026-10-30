// 3.415 (anh 31/10, ảnh hộp "Đạt · 1 người — làm gì với bản này?": "sau khi đọc được CCCD và xác định được thì phải lưu theo tên kiểu đã xác nhận nhưng app chỉ lưu theo tên"):
//   CCCD khớp TỔ TRƯỞNG (bảng tổ, có CIF — tổ trưởng không vay nên không có trong Mẫu 31) → coi như đã xác định người: tên file chuẩn "CIF - Họ tên - CCCD"
//   (Lưu vào máy / In / Gửi dùng tên này), Lưu vào tủ gắn mã = CIF (không vào Chờ sắp xếp). Bộ GIẢ gianho31 + Danh sách tổ giả (CMT, MATT).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   let K = await KHO.nap('2026-08'); const tA = Object.values(K.to).find(x=>!x.trucTiep);
   const C = ['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'];
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'], [''], C, ['31/08/2026', 'D9', 'Điểm Giả', tA.thon||'', tA.tenXa||'', tA.tenThon||'', String(tA.dv||'11'), 'Hội Giả', tA.ma, '7139999918', 'Trịnh Thị Tổ Trưởng Giả', '072159999945', '01/02/2022', '0900000000', '01/01/1970', 10, 100000000, '1049999999', '', '', '']]), 'BCQUERY');
   const kD = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'baocao_20260831_000000.xlsx')); if(!kD.loi && kD.ky) await slGhi(kD);
   SL_BO = {}; TO_KS = {}; K = await KHO.nap('2026-08'); KHO.datKy(K); TO_K = K;
   const tt = trTimTT('072159999945');
   ok('CCCD tổ trưởng (không có trong Mẫu 31) khớp bảng tổ, có CIF', !!tt && tt.ma===tA.ma && tt.b.kh==='7139999918', tt && JSON.stringify({ma:tt.ma, cif:tt.b.kh}));
   const c = sxKhachTT(tt, '072159999945');
   ok('thông tin lưu: mã = CIF, họ tên, xã / ấp / tổ của tổ', c.ma==='7139999918' && /Tổ Trưởng Giả/i.test(c.ten) && !!c.xa && c.maTo===tA.ma, JSON.stringify(c));
   ok('tên chuẩn: "CIF - Họ tên - CCCD"', /^7139999918 - .*Tổ Trưởng Giả - CCCD$/i.test(sxTenTT(c, 'CCCD')), sxTenTT(c, 'CCCD'));
   /* hộp Lưu sau quét (noi 'luu'): gõ / đọc số CCCD ở ô Tên file → 🔎 Tra Mẫu 31 */
   const e = document.createElement('input'); e.id = 'sx-ten'; e.value = '072159999945'; document.body.appendChild(e);
   const kq = document.createElement('div'); kq.id = 'tr-kq-sx-ten'; document.body.appendChild(kq);
   window.SX = {ten:'072159999945', bl:null}; SXK.length = 0; const giuNhom = window.scanNhom; window.scanNhom = ()=>[[{}]]; SC.che = 'the';
   trChay('sx-ten'); await w(300);
   ok('🔎 Tra Mẫu 31 ở hộp Lưu: báo tổ trưởng + ô Tên file thành tên chuẩn', /^7139999918 - .* - CCCD$/i.test(e.value) && /Tổ trưởng/.test(kq.textContent), e.value);
   ok('SX.ten = tên chuẩn → Lưu vào máy / In / Gửi đặt tên này', /^7139999918 - .* - CCCD\.pdf$/i.test(scanTenFile()), scanTenFile());
   ok('Lưu vào tủ: khách đã xác định (mã CIF) — không rơi vào Chờ sắp xếp', SXK[0] && SXK[0].ma==='7139999918', SXK[0] && SXK[0].ma);
   const k = {che:'the', maKH:SXK[0].ma, ten:SXK[0].ten, tag:['CCCD']};
   ok('tên trên Drive khi lưu vào tủ = tên chuẩn', /^7139999918 - .* - CCCD\.pdf$/i.test(tenScanDrive(k)), tenScanDrive(k));
   window.scanNhom = giuNhom; window.SX = null; e.remove(); kq.remove();
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
