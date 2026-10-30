// 3.409 (anh 30/10 "Ko ghép nếu khác ngày, lưu ý KH có từ 2 số TK 105 em có báo sao kê ra chưa"):
//   ① Sao kê "Khách có từ 2 TK 105" (js/76, nhóm Khách hàng): mỗi sổ 1 dòng, số dư từng sổ + ngày mở, tổng 105 cộng sổ (QT-C-01), sổ số dư 0 tô nền;
//   ② slT105Them: số dư 105 của khách = cộng các sổ (mỗi sổ lấy 1 lần); ③ File Tổ trưởng khác ngày Mẫu 31 → vẫn ghép như cũ nhưng Mẫu 31 là chính (ấp theo Mẫu 31), báo Kiểm tra kỳ + 🗺 Địa bàn (anh 30/10); ④ tên xã theo đa số Mẫu 31.
//   Bộ GIẢ tests/gianho31 + Sao kê TK 105 giả.
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
   /* ② cộng sổ */
   const m = {}; slT105Them(m, {stk:'1050000001', t105:300}, 'A'); slT105Them(m, {stk:'1050000001', t105:300}, 'A'); const tA = slT105Them(m, {stk:'1050000002', t105:200}, 'A');
   const tB = slT105Them(m, {stk:'', t105:500}, 'B'), tB2 = slT105Them(m, {stk:'', t105:400}, 'B');
   ok('slT105Them: 2 sổ cộng (300 + 200), cùng sổ lặp dòng tính 1 lần; không có số sổ → lấy lớn nhất', tA===500 && tB===500 && tB2===500, [tA, tB, tB2].join());
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   const K0 = await KHO.nap('2026-08'), vay = K0.B.co.hstd.filter(x=>x.ku && x.to && (x.dn||0)>0), a = vay[0].kh, c = vay.find(x=>x.kh!==a).kh;
   const sk = (kh, stk, cuoi, ndk) => ['', '004820', '900000', '90000001', kh, 'Khách Giả', 'Giả', stk, cuoi, 0, '105', ndk, '31/08/2026'];
   const aoa = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC']]
     .concat([sk(a, '0010000091', 700000, '02/01/2024'), sk(a, '0010000092', 0, '04/03/2025'), sk(c, '0010000093', 100000, '05/06/2023')]);
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const k5 = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_31-08-2026.XLSX')); if(!k5.loi) await slGhi(k5);
   for(const k in TO_KS) delete TO_KS[k];
   /* ① báo cáo */
   const S = skCH(); S.ky = '2026-08'; S.xa = ''; S.diem = ''; S.hoi = ''; S.to = ''; SK_K = null; D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   const bc = SK_BC.find(x=>x.k==='tk2');
   ok('danh mục Sao kê có "Khách có từ 2 TK 105" (nhóm Khách hàng)', !!bc && bc.nhom==='kh');
   const r = bc.lap(), txt = r.html.replace(/<[^>]+>/g, ' ');
   const dongA = r.aoa.filter(x=>x[3]==='0010000091' || x[3]==='0010000092');
   ok('khách a: 2 dòng sổ, sổ mở trước lên trước, số dư từng sổ, ngày mở', dongA.length>=2 && dongA[0][3]==='0010000091' && dongA[0][4]===700000 && dongA[1][4]===0 && dongA[0][5]==='02/01/2024', JSON.stringify(dongA));
   ok('dòng đầu ghi Mã KH + Tổng 105 của khách (cộng sổ, có sổ khác ở Mẫu 31 / danh bạ thì cộng thêm)', dongA[0][1]===a && dongA[0][7]>=700000 && dongA[1][1]==='', JSON.stringify(dongA[0]));
   ok('sổ số dư 0 → ghi chú "nên đóng", tô nền', /Số dư 0 — nên đóng/.test(txt) && /class="nb"/.test(r.html));
   const coC = r.aoa.some(x=>x[3]==='0010000093'), sC = slStk((KHO.danhBa(c)||{}).stk).concat((K0.B.co.hstd.filter(x=>x.kh===c).map(x=>slStk(x.stk)).flat()));
   ok('khách 1 sổ không vào báo cáo (trừ khi Mẫu 31 / danh bạ có thêm sổ khác)', coC === new Set(sC.concat(['0010000093'])).size>=2, sC.join());
   ok('tóm tắt: số khách · số sổ · sổ số dư 0', /khách có từ 2 TK 105/.test(txt) && /sổ số dư 0/.test(txt), txt.slice(0, 160));
   /* ③ File Tổ trưởng khác ngày */
   const C = ['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'];
   const t0 = vay[0].to, wb2 = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet([['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'], [''], C, ['25/08/2026','D1','Điểm Giả','540035','Phường Giả','Ấp Giả','11','HND',t0,'1','Tổ Trưởng Giả','','','','','30','0','0','','','']]), 'BCQUERY');
   const kT = await slDocFile(new File([XLSX.write(wb2, {type:'array', bookType:'xlsx'})], 'baocao_20260825_000000.xlsx')); if(!kT.loi && kT.ky) await slGhi(kT);
   SL_BO = {}; TO_KS = {}; const K = await toNap('2026-08');
   ok('File Tổ trưởng 25/08 ≠ Mẫu 31 31/08 → K.dsLech (báo) nhưng VẪN ghép như cũ (anh 30/10)', !!K.dsLech && K.dsLech.ds==='2026-08-25' && !!(K.to[t0] && K.to[t0].ds), JSON.stringify(K.dsLech));
   ok('khác ngày: Mẫu 31 là chính — ấp của tổ giữ theo Mẫu 31, không đè bằng File Tổ trưởng', String(K.to[t0].thon)===String(vay[0].thon) && !K.to[t0].thonTT, K.to[t0].thon+' / '+vay[0].thon);
   const kq = []; slKTAp(K, function(n, ten, okk, chu){ kq.push({ten, okk, chu}); });
   ok('Kiểm tra kỳ: mục QT-C-09 báo khác ngày, Mẫu 31 là chính', kq.some(x=>/QT-C-09/.test(x.ten) && !x.okk && /25\/08\/2026/.test(x.chu)), JSON.stringify(kq.map(x=>x.ten)));
   ok('🗺 Địa bàn: dòng nguồn ghi ⚠ khác ngày — Mẫu 31 là chính', /khác ngày Mẫu 31 — Mẫu 31 là chính/.test(dbslNguon(K)), dbslNguon(K));
   /* ④ tên xã theo đa số Mẫu 31 (anh 30/10: 3 xã hiện "Vay trực tiếp") */
   const Kx = {hs:[{xa:'X9', tenXa:'Xã Đúng'}, {xa:'X9', tenXa:'Xã Đúng'}, {xa:'X9', tenXa:'Vay trực tiếp'}], to:{A:{ma:'A', xa:'X9', tenXa:'Vay trực tiếp'}, B:{ma:'B', xa:'X8', tenXa:'Vay trực tiếp'}}};
   const dmGiu = D.cauHinh.diaBan; D.cauHinh.diaBan = [{ma:'X8', xa:'Xã Danh Mục', diem:[]}]; toTenXa(Kx); D.cauHinh.diaBan = dmGiu;
   ok('toTenXa: tên xã = đa số Mẫu 31 (bỏ tên "trực tiếp"); không có → danh mục Cài đặt', Kx.to.A.tenXa==='Xã Đúng' && Kx.to.B.tenXa==='Xã Danh Mục', JSON.stringify(Kx.to));
   ok('cây 🗺 Địa bàn: không xã nào mang tên "trực tiếp"', !dbslCay(K).some(x=>/trực tiếp/i.test(x.xa)), dbslCay(K).map(x=>x.xa).join());
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
