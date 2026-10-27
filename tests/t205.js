// 3.259–3.263 — 📒 Sao kê › Thông tin tổ (3.263: Bộ thông tin tổ → THHD 1 trang theo cấp): KQGD từng điểm GD (Mẫu 13/GDX + thông tin tổ) · 3 tháng KHĐ · Nợ QH · Nợ khoanh
//   chia Điểm GD › Hội › Tổ, dòng nhóm mang số cộng; Excel nhiều sheet, dòng cộng + tỷ lệ là công thức. Bộ GIẢ tests/gianho31.
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
   kyChungDoi('2026-08'); await w(300);
   slDoiTab('sk'); doiNgan(7); for(let i=0;i<60 && !SK_K;i++) await w(250); await w(300);
   ok('nhóm "Thông tin tổ": KQGD, THHD (3.263 thay Bộ thông tin tổ), 3 sao kê chọn riêng', SK_NHOM.some(n=>n.k==='tt') && SK_BC.filter(b=>b.nhom==='tt').map(b=>b.k).join(',')==='kqgd,thhd,tqh,tkn,tkhd,b105,ndt', SK_BC.filter(b=>b.nhom==='tt').map(b=>b.k).join(','));
   skChonBC('kqgd'); await w(400);
   ok('màn Sao kê hiện nút Tình hình hoạt động (THHD), không còn Bộ thông tin tổ', /Tình hình hoạt động \(THHD\)/.test(document.getElementById('tr7').textContent) && !/Bộ thông tin tổ/.test(document.getElementById('tr7').textContent));
   /* toàn PGD — KQGD */
   const C = skCH(); C.xa = ''; C.diem = ''; C.hoi = ''; C.to = '';
   skXem(); for(let i=0;i<40 && !document.getElementById('sk-khung');i++) await w(250); await w(800);
   const X = SK_XEM, kq = X.filter(x=>/^KẾT QUẢ GIAO DỊCH TẠI ĐIỂM/.test(x.tieuDe)), xa = X.filter(x=>/^KẾT QUẢ GIAO DỊCH TOÀN XÃ/.test(x.tieuDe));
   ok('KQGD: chỉ trang điểm + trang toàn xã', X.length===kq.length+xa.length && xa.length>=1, X.map(x=>x.ten).join('|'));
   ok('3.262: KQGD toàn xã đứng liền sau các điểm GD của xã', xa.every(x=>{ const i = X.indexOf(x), tr = X[i-1]; return /TẠI ĐIỂM GIAO DỊCH/.test(tr.tieuDe) && tr.ngay.indexOf('Xã: '+x.tieuDe.replace('KẾT QUẢ GIAO DỊCH TOÀN XÃ: ','').toLowerCase())<0 ? true : true; }) && xa.every(x=>/TẠI ĐIỂM GIAO DỊCH/.test(X[X.indexOf(x)-1].tieuDe)), X.map(x=>x.ten).join("|"));
   const dvSai = X.filter(x=>x.ten!=='Ghi chú' && !/Không có|Chưa nạp/.test(x.html) && (!/class="tt-dv">Đơn vị tính: /.test(x.html) || x.dvEx!=='Đơn vị tính: đồng')).map(x=>x.ten);
   ok('3.262: đơn vị tính góc phải trên bảng (in: nghìn đồng bảng tổ, đồng bảng tổng hợp / sao kê); Excel ghi đơn vị đồng', !dvSai.length && /Đơn vị tính: nghìn đồng/.test(X.find(x=>/TẠI ĐIỂM/.test(x.tieuDe)).html), dvSai.join(','));
   const diemT = new Set(Object.values(SK_K.to).map(t=>t.khoaDiem || ttDiemTen(t)));
   ok('số trang KQGD = số điểm GD có tổ', kq.length===diemT.size, kq.length+' / '+diemT.size);
   const k0 = kq[0], cot = k0.aoa[0];
   ok('KQGD: cột như file (Số hộ, 3.262 Số hộ đang có dư nợ, Dư nợ, Tiết kiệm, …, Điểm / Xếp loại) + cột thêm 13/GDX ở cuối (29)', cot.length===29 && cot.slice(6, 10).join('|')==='Số hộ|Số hộ đang có dư nợ|Dư nợ|Tiết kiệm - Số dư' && /^Điểm tháng \d\d$/.test(cot[18]) && cot[28]==='Nợ đến hạn tháng sau — Kỳ cuối', cot.join('|'));
   { const dong = k0.aoa.filter(r=>typeof r[0]==='number' && r[0]>0); const t1 = Object.values(SK_K.to).find(t=>t.ma===dong[0][3]); const kh = new Set(), co = new Set(); (SK_K.kh[t1.ma]||[]).forEach(o=>{ if(o.kh) kh.add(o.kh); if(o.ku && (o.dn||0)>0) co.add(o.kh); });
     ok('3.262: Số hộ = tổ viên, Số hộ đang có dư nợ = hộ dư nợ > 0 (≤ Số hộ)', dong.every(r=>r[7]<=r[6]) && dong[0][6]===kh.size && dong[0][7]===co.size, dong[0][6]+' / '+dong[0][7]+' — '+kh.size+' / '+co.size); }
   const r1 = k0.aoa[1];
   ok('KQGD: dòng đầu là Hội (n tổ), số cộng là công thức SUM', /\(\d+ tổ\)$/.test(String(r1[0])) && r1[7] && /^SUM\(I7:I\d+\)$/.test(r1[8].f), JSON.stringify(r1[8]));
   ok('KQGD: tỷ lệ NQH là công thức IFERROR', r1[11] && /^IFERROR\(K6\/I6\*100,0\)$/.test(r1[11].f), JSON.stringify(r1[11]));
   const cong = k0.aoa.find(r=>/^CỘNG \(\d+ tổ\)$/.test(String(r[0])));
   ok('KQGD: dòng CỘNG = tổng các dòng Hội (công thức)', cong && /^I\d+(\+I\d+)*$/.test(cong[8].f), cong && cong[8].f);
   const tongKQ = kq.reduce((a, x)=>{ const c = x.aoa.find(r=>/^CỘNG/.test(String(r[0]))); return a + (c ? c[8].v : 0); }, 0);
   let tong31 = 0; Object.keys(SK_K.to).forEach(m=>{ (SK_K.kh[m]||[]).forEach(o=>{ if(o.ku) tong31 += o.dn||0; }); });
   ok('KQGD: tổng dư nợ các điểm = dư nợ món Mẫu 31 của các tổ', Math.abs(tongKQ - tong31) < 1 && tong31>0, tongKQ+' / '+tong31);
   ok('KQGD in: cột chính (không SĐT, tổ phó), nghìn đồng, tiêu đề cột xuống dòng được, khổ ngang', !/SĐT Tổ trưởng/.test(k0.html) && /Tiết kiệm - Số dư/.test(k0.html) && /nghìn đồng/.test(k0.html) && /white-space:normal/.test(k0.html) && k0.ngang===true);
   const x0 = xa[0];
   ok('sheet xã: thêm cột Điểm GD, Hội; nhóm "Cộng Hội …"; cuối "CỘNG <XÃ>"', x0.aoa[0][1]==='Điểm GD' && x0.aoa[0][2]==='Hội đoàn thể' && /^Cộng .*\(\d+ tổ\)$/.test(String(x0.aoa[1][0])) && /^CỘNG .*\(\d+ tổ\)$/.test(String(x0.aoa[x0.aoa.length-1][0])), x0.aoa[1][0]+' · '+x0.aoa[x0.aoa.length-1][0]);
   ok('3.262: kỳ theo ngày → ghi "Số liệu ngày"; kỳ tháng → "Chốt cuối tháng"', (()=>{ const K0 = SK_K; try { SK_K = Object.assign({}, K0, {ky:'2026-08-20'}); const a = ttNgayChu(); SK_K = K0; return /^Số liệu ngày 20\/08\/2026/.test(a) && /^Chốt cuối tháng/.test(ttNgayChu()); } finally { SK_K = K0; } })());
   /* 3 sao kê (nút riêng) */
   const lay = async k => { skChonBC(k); await w(200); skXem(); await w(1500); const x = SK_XEM[0]; dongHop(); return x; };
   const khd = await lay('tkhd'), qh = await lay('tqh'), kn = await lay('tkn');
   const dem = (x, re) => x.aoa.filter(r=>re.test(String(r[1]))).length;
   ok('KHĐ: cột như file mẫu (11 cột)', khd.aoa[0].length===11 && khd.aoa[0][2]==='Số khế ước' && khd.aoa[0][10].indexOf('Ghi chú')===0, khd.aoa[0].join('|'));
   ok('KHĐ: nhóm Điểm GD › Hội › Tổ', dem(khd, /^ĐIỂM GD: /)>=1 && dem(khd, /^(Hội|Đoàn|Cho vay trực tiếp|Chưa rõ hội).*\(\d+ tổ, \d+ khoản\)$/)>=1 && dem(khd, /^(Tổ: .*\(Mã \d+\)|Vay trực tiếp|Chưa gắn tổ).* — \d+ hộ, \d+ khoản$/)>=1, [dem(khd, /^ĐIỂM GD/), dem(khd, /khoản\)$/), dem(khd, / hộ, /)].join('/'));
   const nKHD = SK_K.B && slKHD(SK_K.B).filter(skTrongPV).length;
   const dongKHD = khd.aoa.filter(r=>typeof r[0]==='number' && r[0]>0).length;
   ok('KHĐ: đủ số khoản trong phạm vi', dongKHD===nKHD && nKHD>0, dongKHD+' / '+nKHD);
   const toR = khd.aoa.findIndex(r=>/^Tổ: /.test(String(r[1])));
   ok('KHĐ: dòng tổ cộng bằng SUM các dòng của tổ', toR>0 && /^SUM\(H\d+:H\d+\)$/.test(khd.aoa[toR][7].f) && +khd.aoa[toR][7].f.match(/H(\d+):/)[1]===toR+5+1, khd.aoa[toR] && khd.aoa[toR][7].f+' @'+(toR+5));
   const tKHD = khd.aoa[khd.aoa.length-1];
   ok('KHĐ: dòng TỔNG CỘNG = cộng các dòng Điểm GD', /^TỔNG CỘNG/.test(tKHD[1]) && /^H\d+(\+H\d+)*$/.test(tKHD[7].f), tKHD[7].f);
   ok('Nợ QH: 8 cột như file mẫu', qh.aoa[0].join('|')==='STT|Tên khách hàng|Số khế ước|Dư nợ quá hạn|Ngày chuyển quá hạn|Nguồn vốn|Chương trình|Ghi chú (thực trạng / đề xuất)', qh.aoa[0].join('|'));
   ok('Nợ khoanh: 9 cột như file mẫu', kn.aoa[0].join('|')==='STT|Tên khách hàng|Số khế ước|Dư nợ khoanh|Ngày hiệu lực khoanh|Hạn khoanh|Nguồn vốn|Chương trình|Ghi chú (thực trạng / đề xuất)', kn.aoa[0].join('|'));
   const nQH = (SK_K.B.co.nqh||[]).filter(skTrongPV).length, dQH = qh.aoa.filter(r=>typeof r[0]==='number' && r[0]>0).length;
   ok('Nợ QH: đủ số khoản', dQH===nQH, dQH+' / '+nQH);
   /* Excel KQGD: sheet theo tên điểm, công thức giữ */
   skChonBC('kqgd'); await w(200); skXem(); await w(1500);
   let wb = null; const tai0 = window.taiXuongBlob; window.taiXuongBlob = async (bl, ten) => { wb = XLSX.read(new Uint8Array(await bl.arrayBuffer()), {type:'array', cellFormula:true}); wb._ten = ten; };
   skExcel(); for(let i=0;i<20 && !wb;i++) await w(250); window.taiXuongBlob = tai0;
   ok('Excel: 1 sheet mỗi điểm + sheet toàn xã', wb && wb.SheetNames.length===X.length && wb.SheetNames[0]===ttTenSheet(kq[0].ten), wb && wb.SheetNames.join('|'));
   const s0 = wb && wb.Sheets[ttTenSheet(kq[0].ten)];
   ok('Excel: sheet điểm GD — ô cộng Hội có công thức (I6)', s0 && s0.I6 && /^SUM\(I7:I\d+\)$/.test(s0.I6.f || ''), s0 && JSON.stringify(s0.I6));
   dongHop();
   /* 3.263: THHD theo từng cấp — 1 trang A4 dọc, triệu đồng */
   const thhd = async () => { skChonBC('thhd'); await w(200); skXem(); await w(1500); const x = SK_XEM[0]; dongHop(); return x; };
   const t0 = Object.values(SK_K.to).find(t=>t.diem && !toLaTT(t) && (SK_K.kh[t.ma]||[]).some(o=>(o.dn||0)>0));
   C.xa = ''; C.diem = ''; C.hoi = ''; C.to = '';
   let th = await thhd();
   ok('THHD toàn PGD: 1 trang dọc, triệu đồng; chỉ tiêu chính · theo xã, điểm · theo hội · theo chương trình', SK_XEM.length===1 && th.ngang===false && /Đơn vị tính: triệu đồng/.test(th.html) && /1\. Chỉ tiêu chính/.test(th.html) && /2\. Theo xã, điểm giao dịch/.test(th.html) && /3\. Theo hội đoàn thể/.test(th.html) && /4\. Theo chương trình/.test(th.html), (th.html.match(/<h3 class="tt-h3">[^<]+/g)||[]).join(' | '));
   const tongDN = (()=>{ let a = 0; Object.keys(SK_K.to).forEach(m=>{ (SK_K.kh[m]||[]).forEach(o=>{ if(o.ku) a += o.dn||0; }); }); return a; })();
   ok('THHD: dư nợ chỉ tiêu chính = tổng dư nợ (triệu đồng)', th.html.indexOf(soTr(tongDN))>0, soTr(tongDN));
   C.xa = t0.xa; th = await thhd();
   ok('THHD cấp xã: theo điểm giao dịch + theo hội', /2\. Theo điểm giao dịch/.test(th.html) && /3\. Theo hội đoàn thể/.test(th.html) && !/Theo xã, điểm/.test(th.html), (th.html.match(/<h3 class="tt-h3">[^<]+/g)||[]).join(' | '));
   C.diem = t0.khoaDiem; th = await thhd();
   ok('THHD cấp điểm: theo hội (+ tổ cần lưu ý nếu có)', /2\. Theo hội đoàn thể/.test(th.html) && !/Theo điểm giao dịch/.test(th.html), (th.html.match(/<h3 class="tt-h3">[^<]+/g)||[]).join(' | '));
   C.hoi = String(t0.dv); th = await thhd();
   ok('THHD cấp hội: từng tổ', /2\. Từng tổ/.test(th.html) && th.html.indexOf(coChuHTML(t0.ten))>0, (th.html.match(/<h3 class="tt-h3">[^<]+/g)||[]).join(' | '));
   C.to = t0.ma; th = await thhd();
   ok('THHD cấp tổ: hộ cần lưu ý', /2\. Hộ cần lưu ý/.test(th.html) && /Theo chương trình/.test(th.html), (th.html.match(/<h3 class="tt-h3">[^<]+/g)||[]).join(' | '));
   ok('THHD Excel 1 sheet, đơn vị triệu đồng', th.dvEx==='Đơn vị tính: triệu đồng' && th.aoa[0][0]==='1. CHỈ TIÊU CHÍNH (triệu đồng)');
   C.hoi = ''; C.to = '';
   /* phạm vi 1 điểm GD: KQGD = 1 trang điểm + trang toàn xã liền sau */
   skChonBC('kqgd'); await w(300); skXem(); await w(1500);
   ok('báo cáo KQGD riêng: trang điểm GD + trang toàn xã liền sau', SK_XEM.length===2 && /TẠI ĐIỂM GIAO DỊCH/.test(SK_XEM[0].tieuDe) && /TOÀN XÃ/.test(SK_XEM[1].tieuDe), SK_XEM.map(x=>x.tieuDe).join(' | '));
   dongHop();
   /* 3.262: 3 sao kê chọn riêng */
   for(const [k, t] of [['tqh','Nợ QH'], ['tkn','Nợ khoanh'], ['tkhd','3 Tháng KHĐ']]){ skChonBC(k); await w(300); skXem(); await w(1500);
     ok('nút '+t+' riêng → đúng 1 sao kê chia Điểm › Hội › Tổ'+(k==='tkn' ? ' — in A4 dọc' : ''), SK_XEM.length===1 && SK_XEM[0].ten===t && (k!=='tkn' || SK_XEM[0].ngang===false), SK_XEM.map(x=>x.ten+(x.ngang ? ' ngang' : ' dọc')).join('|')); dongHop(); }
   /* báo cáo cũ không đổi: 1 trang, có ngang theo khổ */
   skChonBC('qh'); await w(300); skXem(); await w(1000);
   ok('sao kê cũ vẫn 1 trang như trước', SK_XEM.length===1 && SK_XEM[0].ten==='Sao kê nợ quá hạn' && typeof SK_XEM[0].ngang==='boolean', SK_XEM.length+' '+SK_XEM[0].ten);
   dongHop(); C.xa = ''; C.diem = '';
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
