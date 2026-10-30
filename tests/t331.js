// 3.410 (anh 31/10 "các theo dõi về tổ gỡ dọn rác, làm lại từ đầu đơn giản hơn" + "số TK 105 / thông tin tổ chỉ cần rà dữ liệu gần nhất có"):
//   ① đã gỡ: 📉 Diễn biến tổ (js/80) · 📅 Biến động tổ viên cả năm · dòng "Biến động +x vào −y ra" · cột Mới vào / 105 tăng giảm + chip Mới vào tổ · ⚖ So cách cũ / mới (js/84)
//   ② giữ: chip Ra khỏi tổ, cột Đề xuất cho ra, biên bản Hồ sơ tổ (k.vao), cần đóng tổ
//   ③ cột Số TK 105 tab Tổ: Mẫu 31 / danh bạ trống → lấy Sao kê TK 105 bản gần nhất. Bộ GIẢ tests/gianho31 + Sao kê giả.
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
   ok('① đã gỡ hàm: Diễn biến tổ, Biến động cả năm, dòng biến động, nạp tháng trước cho Mới vào, So cách', ['dbtNut','toBDNam','toBDChu','toBDDem','toTruocNap','socTinh'].every(f=>typeof window[f]==='undefined'));
   ok('① cột bảng tổ không còn Mới vào / 105 tăng giảm; vẫn có Đề xuất cho ra', !TO_COT.concat(TO_COT_PGD).some(c=>c[0]==='moi' || c[0]==='d105') && TO_COT.some(c=>c[0]==='ra') && TO_COT_PGD.some(c=>c[0]==='ra'));
   ok('① chip Mới vào tổ bỏ, chip Ra khỏi tổ giữ', !TO_LOC.some(l=>l[0]==='moi') && TO_LOC.some(l=>l[0]==='rk'));
   ok('② giữ máy so tháng trước cho biên bản Hồ sơ tổ + chip Ra khỏi tổ', typeof toBDNap==='function' && typeof toBienDong==='function' && typeof toBDTNap==='function');
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; let K = await KHO.nap('2026-08'); KHO.datKy(K);
   const kh0 = '4800999999';   /* khách giả tất nợ từ lâu: không có trong Mẫu 31 / danh bạ kỳ này */
   ok('khách giả chưa có số TK ở Mẫu 31 / danh bạ', !slStkKH(kh0, []).length);
   const sk = (kh, stk) => ['', '004820', '900000', '90000001', kh, 'Khách Giả', 'Giả', stk, 50000, 50000, '105', '01/01/2020', '31/08/2026'];
   const aoa = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC']].concat([sk(kh0, '0010000777')]);
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const k5 = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_31-08-2026.XLSX')); if(!k5.loi) await slGhi(k5);
   SL_BO = {}; TO_KS = {}; K = await KHO.nap('2026-08'); KHO.datKy(K); TO_K = K;
   const st = slStkKH(kh0, []);
   ok('③ Số TK 105 trống ở Mẫu 31 / danh bạ → lấy Sao kê TK 105 gần nhất', st.indexOf('0010000777')>=0, JSON.stringify(st));
   const kx = Object.values(K.to).map(t=>toKhach(t)).flat().find(k=>k.stk.length);
   ok('③ khách đã có số sổ ở Mẫu 31 → giữ nguyên (Sao kê chỉ bù chỗ trống)', !!kx && slStkKH(kx.kh, kx.stk).join()===kx.stk.join(), kx && kx.stk.join());
   /* ① giao diện tab Tổ */
   const C = toCH(); Object.assign(C, {xa:'', diem:'', hoi:'', ap:'', to:''}); doiNgan(7); try{ slDoiTab('to'); }catch(e){} await w(800);
   const h = toBangPGDHTML();
   ok('① bảng tổ PGD: không còn cột / chữ Mới vào, 105 tăng/giảm, Biến động cả năm', !/Mới vào|105 tăng\/giảm|Biến động cả năm/.test(h), '');
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
