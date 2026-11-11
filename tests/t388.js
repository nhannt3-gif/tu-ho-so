// 3.512 (anh 11/11): Sao kê › Khách hàng › 'tk0' (js/76b) — TK 105 của khách vay trong tổ, 3 trường hợp suy ra từ Mẫu 31 (cột Sổ tiết kiệm 105 trên dòng món vay):
//   ① tổ đang vay trống sổ, không thấy TK 105 ở đâu → mở mới · ② trống sổ nhưng có TK 105 (Sao kê 105 / số dư 105 …) → gắn vào tổ · ③ trống sổ ở tổ A, sổ ghi ở dòng tổ B → chuyển về tổ A.
//   Bộ GIẢ gianho31, Mẫu 31 T7 + T8 sửa: P (①), Q (② — có trong Sao kê 105 giả), R (③ — thêm món ở tổ khác mang sổ), S (có sổ — không ra).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1400, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const R = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = [], w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
   let thu = null;
   for(const f of files){ const bin = atob(f.b); let u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i);
     if(/^Ho.so.tin.dung.chi.tiet/i.test(f.n)){
       const wb = XLSX.read(u, {type:'array'}), sh = wb.Sheets[wb.SheetNames[0]], a = XLSX.utils.sheet_to_json(sh, {header:1, defval:''}), N = c => String(c).trim();
       const h = a.findIndex(r => r.some(c => N(c)==='Mã tổ')), c = t => a[h].findIndex(x => N(x)===t);
       const cT = c('Mã tổ'), cK = c('Mã KH'), cKU = c('Số khế ước'), cS = c('Sổ tiết kiệm 105'), cD = c('Số dư tiền gửi 105'), cDN = c('Tổng dư nợ');
       const vay = a.slice(h+1).filter(r => N(r[cK]) && N(r[cKU]) && N(r[cT]) && +r[cDN]>0);
       if(!thu){ const coSo = [...new Set(vay.filter(r => N(r[cS])).map(r => N(r[cK])))]; const toCua = m => N(vay.find(r => N(r[cK])===m)[cT]);
         const B = [...new Set(vay.map(r => N(r[cT])))]; thu = {P:coSo[0], Q:coSo[1], R:coSo[2], S:coSo[3]}; thu.A = toCua(thu.R); thu.B = B.find(x => x!==thu.A); thu.toP = toCua(thu.P); thu.toQ = toCua(thu.Q); }
       for(let r=h+1;r<a.length;r++){ const m = N(a[r][cK]); if(m===thu.P){ a[r][cS] = ''; a[r][cD] = 0; } if(m===thu.Q){ a[r][cS] = ''; a[r][cD] = 0; } if(m===thu.R) a[r][cS] = ''; }
       const g = a.slice(h+1).find(r => N(r[cK])===thu.R && N(r[cKU])), r2 = g.slice(); r2[cKU] = N(g[cKU])+'9'; r2[cT] = thu.B; r2[cS] = '0010000077'; a.push(r2);   /* R: món ở tổ B mang sổ */
       wb.Sheets[wb.SheetNames[0]] = XLSX.utils.aoa_to_sheet(a); u = new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'})); }
     const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) await slGhi(kq); }
   const sk = (kh, stk, cuoi) => ['', '004820', '540034', '90000001', kh, 'Khách Giả', 'Giả', stk, cuoi, 0, '105', '01/01/2024', '31/08/2026'];
   const aoa = [[''],['', '9. Sao kê Tài khoản theo mã sản phẩm (DLNgày)'],[''],[''],['', 'Mã PGD','Mã xã','Mã thôn','Mã khách hàng','Tên khách hàng','Tên TK','Tài khoản','Số Dư Ngày báo cáo','Số dư tháng trước','Sản phẩm','Ngày đăng ký','Ngày BC']].concat([sk(thu.Q, '0010000066', 350000)]);
   const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY');
   const k5 = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], 'Sao_ke_TK_105_31-08-2026.XLSX')); if(!k5.loi) await slGhi(k5);
   kyChungDoi('2026-08'); const S = skCH(); S.xa = ''; S.diem = ''; S.hoi = ''; S.ap = ''; S.to = '';
   D.cauHinh.slTab = 'sk'; doiNgan(7); slDoiTab('sk'); for(let i=0;i<120 && !SK_K;i++) await w(250); await w(400);
   ok('danh mục Sao kê › Khách hàng có báo cáo TK 105 khách vay trong tổ (A4 ngang)', SK_BC.some(x => x.k==='tk0' && x.nhom==='kh') && skKhoCua('tk0')==='ngang');
   const r = skBaoCao('tk0'), dong = r.aoa.filter(x => typeof x[0]==='number' && x[0]>0), theo = m => dong.find(x => x[1]===m);
   const P = theo(thu.P), Q = theo(thu.Q), RR = theo(thu.R);
   ok('① P (tổ trống sổ, không thấy TK 105) → "Mở mới TK 105"', !!P && /^Mở mới TK 105/.test(P[7]) && /Không thấy TK 105/.test(P[6]), JSON.stringify(P));
   ok('② Q (trống sổ, có trong Sao kê 105) → "Gắn TK 105 vào tổ" + số sổ, số dư Sao kê', !!Q && /^Gắn TK 105 vào tổ/.test(Q[7]) && Q[7].indexOf('('+thu.toQ+')')>=0 && Q[4]==='0010000066' && Q[5]===350000 && /Sao kê TK 105/.test(Q[6]), JSON.stringify(Q));
   ok('③ R (tổ A trống sổ, sổ ở dòng tổ B) → "Chuyển TK 105 về tổ" A, căn cứ ghi tổ B', !!RR && /^Chuyển TK 105 về tổ/.test(RR[7]) && RR[7].indexOf('('+thu.A+')')>=0 && RR[6].indexOf(thu.B)>=0 && RR[4]==='0010000077', JSON.stringify(RR));
   ok('S (có sổ 105 ở tổ đang vay) không ra', !theo(thu.S));
   ok('3 phần ①②③ có tiêu đề, số khách', /① Có dư nợ trong tổ nhưng CHƯA CÓ TK 105 — \d+ khách/.test(r.html) && /② .* — \d+ khách/.test(r.html) && /③ .* — \d+ khách/.test(r.html));
   /* ① khớp luật chip "Chưa có TK 105" tab Tổ: mọi khách ① đều thuộc chip của tổ đó */
   KHO.datKy(SK_K);   /* tab Tổ (toKhach) đọc theo kỳ dùng chung — đặt = kỳ Sao kê để so cùng số liệu */
   const mo = dong.filter(x => /^Mở mới/.test(x[7])), chip = new Set(); Object.values(SK_K.to).forEach(t => { if(t.trucTiep) return; toKhach(t).forEach(k => { if(!k.stk.length && !k.coTK) chip.add(k.kh); }); });
   ok('① ⊆ chip "Chưa có TK 105" của tab Tổ (cùng luật)', mo.length>0 && mo.every(x => chip.has(x[1])), mo.filter(x => !chip.has(x[1])).map(x => x[1]).join(','));
   /* lọc đến tổ của P */
   const tP = SK_K.to[thu.toP]; S.xa = tP.xa; S.to = thu.toP; const rP = skBaoCao('tk0'); S.xa = ''; S.to = '';
   ok('lọc đến tổ của P → chỉ khách của tổ đó', rP.aoa.filter(x => typeof x[0]==='number' && x[0]>0).every(x => SK_K.to[thu.toP] && toKhach(SK_K.to[thu.toP]).some(k => k.kh===x[1])) && rP.aoa.some(x => x[1]===thu.P));
   SK_XEM = []; skChonBC('tk0'); await w(300); skXem(); for(let i=0;i<40 && !SK_XEM.length;i++) await w(150); try { dongHop(); } catch(e){}
   ok('👁 Xem: lập được bản in + Excel', SK_XEM.length===1 && /TIỀN GỬI 105 CỦA KHÁCH VAY TRONG TỔ/.test(SK_XEM[0].tieuDe) && (SK_XEM[0].aoa||[]).length>=3);
   return o; }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
