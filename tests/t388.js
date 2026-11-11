// 3.512 (anh 11/11 "thêm liền sao kê hộ vay có TK105 nhưng chưa gán mã tổ"): tab Sao kê › nhóm Khách hàng › báo cáo 'tk0' (js/76b).
//   Bộ GIẢ gianho31: Mẫu 31 sửa 1 khách đang vay về mã tổ 0000000 (có sổ 105) + Sao kê TK 105 giả: khách có tổ (không được ra), khách không có trong Mẫu 31 (phải ra).
//   Kiểm: đúng khách, tình trạng (đang vay không qua tổ · không có trong Mẫu 31), số sổ / số dư, lọc theo xã, khách có tổ không ra, danh mục, 👁 Xem, không lỗi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1400, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   let khSua = '', xaSua = '', stkSua = '0010000099';
   for(const f of files){ const bin = atob(f.b); let u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i);
     if(/^Ho_so.*31-08-2026/i.test(f.n)){   /* 1 khách đang vay: mọi dòng → mã tổ 0000000, có sổ 105 */
       const wb = XLSX.read(u, {type:'array'}), sh = wb.Sheets[wb.SheetNames[0]], a = XLSX.utils.sheet_to_json(sh, {header:1, defval:''}), N = c => String(c).trim();
       const h = a.findIndex(r => r.some(c => N(c)==='Mã tổ')), c = t => a[h].findIndex(x => N(x)===t), cT = c('Mã tổ'), cK = c('Mã KH'), cS = c('Sổ tiết kiệm 105'), cX = c('Mã xã');
       const d = a.slice(h+1).find(r => N(r[cK]) && N(r[cT])); khSua = N(d[cK]); xaSua = N(d[cX]);
       for(let r=h+1;r<a.length;r++) if(N(a[r][cK])===khSua){ a[r][cT] = '0000000'; if(cS>=0) a[r][cS] = stkSua; }
       wb.Sheets[wb.SheetNames[0]] = XLSX.utils.aoa_to_sheet(a); u = new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'})); }
     const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   const K0 = await KHO.nap('2026-08'), coTo = K0.B.co.hstd.find(x => x.ku && x.to && x.to!=='0000000' && x.kh!==khSua);
   const sk = (kh, xa, stk, cuoi) => ['', '004820', xa, '90000001', kh, 'Khách Giả', 'Giả', stk, cuoi, 0, '105', '01/01/2024', '31/08/2026'];
   const aoa = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC']]
     .concat([sk(coTo.kh, coTo.xa, '0010000011', 500000), sk('4899999999', xaSua, '0010000012', 300000), sk(khSua, xaSua, stkSua, 200000)]);
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const k5 = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_31-08-2026.XLSX')); if(!k5.loi) await slGhi(k5);
   kyChungDoi('2026-08'); const S = skCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.ap = ''; S.to = '';
   D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   ok('danh mục Sao kê › Khách hàng có "TK 105 chưa gán mã tổ"', SK_BC.some(x => x.k==='tk0' && x.nhom==='kh'));
   const r = skBaoCao('tk0'), dong = r.aoa.slice(1).filter(x => typeof x[0]==='number'), theo = m => dong.find(x => x[1]===m);
   const a1 = theo(khSua), a2 = theo('4899999999');
   ok('khách đang vay có sổ 105 mà mã tổ 0000000 → ra, "Đang vay không qua tổ", dư nợ > 0, số sổ, số dư Sao kê', !!a1 && a1[8]==='Đang vay không qua tổ' && a1[7]>0 && String(a1[4]).indexOf(stkSua)>=0 && a1[5]===200000 && a1[9]==='Cần gán mã tổ', JSON.stringify(a1));
   ok('khách có trong Sao kê 105 mà không có trong Mẫu 31 → ra, "Không có trong Mẫu 31"', !!a2 && a2[8]==='Không có trong Mẫu 31' && a2[5]===300000, JSON.stringify(a2));
   ok('khách có tổ (có TK 105) không ra', !theo(coTo.kh));
   ok('mọi dòng đều là khách không có tổ thật trong Mẫu 31', dong.every(x => !K0.B.co.hstd.some(y => y.kh===x[1] && y.to && !/^0+$/.test(y.to))));
   /* lọc theo xã */
   const xaKhac = Object.values(SK_K.to).map(t => t.xa).find(x => x && x!==xaSua); S.xa = xaKhac; const rX = skBaoCao('tk0'); S.xa = xaSua; const rY = skBaoCao('tk0');
   const has = (rr, m) => rr.aoa.slice(1).some(x => x[1]===m);
   ok('lọc xã: xã khác không có 2 khách thử · xã của khách có đủ', !has(rX, khSua) && !has(rX, '4899999999') && has(rY, khSua) && has(rY, '4899999999'));
   S.xa = '';
   SK_XEM = []; skChonBC('tk0'); await w(300); skXem(); for(let i=0;i<40 && !SK_XEM.length;i++) await w(150); try { dongHop(); } catch(e){}
   ok('👁 Xem: lập được bản in + Excel', SK_XEM.length===1 && /CHƯA GÁN MÃ TỔ/.test(SK_XEM[0].tieuDe) && (SK_XEM[0].aoa||[]).length>=3);
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
