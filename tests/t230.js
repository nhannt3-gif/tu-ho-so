// 3.310 (anh 21/10): 07b giữ nguyên mẫu chuẩn; lịch trả gốc tự phân kỳ (≤ 60 tháng: 24 tháng/lần, vay/3 làm tròn xuống trăm nghìn, kỳ cuối phần còn lại)
// tính từ ngày giải ngân; phương án tự tính theo hệ số k (🎲 đổi được, ô gõ tay giữ); trang "Phê duyệt của Ngân hàng" in riêng / in kèm 01/GQVL. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1600,height:1000}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t)); const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:'')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo;
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   const tv = hsoTVTo(TO_K.to[C.to]), h1 = hmTuM31(tv[0].kh); hmLamHS(h1.id, '01gqvl'); await w(400);
   const B = hsoBo(); B.ct = 'GQVL'; B.pa = {dong:[{md:'Trồng cây giả', sl:'0,5', dv:'ha', tien:'50000000'}], k:1}; B.th = '60'; B.ky = ''; B.tuCo = ''; B.ngayHD = '2026-09-24'; B.ngayGN = '2026-09-25'; hsoBoLuu();
   const G = hsoGQ(B), L = G.lich.map(k=>k.ngay+' '+k.tien).join(' | ');
   ok('kỳ trống + 60 tháng → phân kỳ 24 tháng: 25/09/2028 16,6 tr · 25/09/2030 16,6 tr · 25/09/2031 16,8 tr (gốc lịch = ngày giải ngân)', L==='2028-09-25 16600000 | 2030-09-25 16600000 | 2031-09-25 16800000' && G.ky===24, L);
   B.th = '36'; const L36 = hsoGQ(B).lich.map(k=>k.thang+':'+k.tien).join(' '); B.th = '84'; const L84 = hsoGQ(B).lich.map(k=>k.thang).join(','); B.th = '12'; const L12 = hsoGQ(B).lich.length; B.th = '60';
   ok('36 tháng → 2 kỳ (24, 36); 84 tháng → 36 tháng/lần (36, 72, 84); 12 tháng → trả 1 lần', L36==='24:25000000 36:25000000' && L84==='36,72,84' && L12===1, [L36, L84, L12].join(' · '));
   B.ngayGN = ''; ok('chưa có ngày giải ngân → gốc lịch theo ngày ký HĐ', hsoGQ(B).lich[0].ngay==='2028-09-24'); B.ngayGN = '2026-09-25';
   /* phương án k = 1 (như Excel): tự có 20 tr, chi phí = max(vay + 40 tr, (vốn + lãi) × 1,05), lợi nhuận = vốn − 10 tr */
   const Q = hsoGQ(B), cpMin = Math.ceil(Math.max(90e6, (70e6+Q.lai)*1.05)/1e6)*1e6;
   ok('phương án tự tính (k = 1): vốn tự có 20 tr, vốn 70 tr, chi phí ≥ vốn + lãi (chú thích 7), doanh thu = chi phí + 60 tr; không cảnh báo', Q.tuCo===20e6 && Q.von===70e6 && Q.cp===cpMin && Q.dt===Q.cp+60e6 && !Q.canh.length && Q.tu.tuCo && Q.tu.cp && Q.tu.dt, JSON.stringify({tuCo:Q.tuCo, cp:Q.cp, dt:Q.dt, lai:Q.lai, canh:Q.canh}));
   const k0 = B.pa.k; hsoGQDoiK(); await w(200); const Q2 = hsoGQ(B);
   ok('🎲 Đổi số → k khác (0,85–1,25), số phương án đổi theo, k lưu trong phiếu', B.pa.k!==k0 && B.pa.k>=0.85 && B.pa.k<=1.25 && Q2.tuCo===Math.round(20e6*B.pa.k/1e6)*1e6, B.pa.k+' · '+Q2.tuCo);
   B.pa.cp = '150000000'; const Q3 = hsoGQ(B); ok('ô chi phí gõ tay giữ nguyên; doanh thu vẫn tự tính theo chi phí gõ tay', Q3.cp===150e6 && !Q3.tu.cp && Q3.tu.dt && Q3.dt>150e6, Q3.cp+' · '+Q3.dt); delete B.pa.cp;
   delete B.pa.k; hsoGQ(B); ok('phiếu chưa có k → tự gán k ngẫu nhiên và lưu', B.pa.k>=0.85 && B.pa.k<=1.25); B.pa.k = 1; hsoBoLuu();
   /* bản in 07b, 01/GQVL */
   const inTxt = () => (HSO.x.ds||[{h:HSO.x.h}]).map(u=>u.h).join(' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
   hsoChonMau('07b'); await w(700); let t = inTxt();
   ok('07b in lịch trả gốc tự tính + hạn trả nợ cuối cùng 25/09/2031', /25\s*\/\s*09\s*\/\s*2028/.test(t) && /16\.600\.000/.test(t) && /16\.800\.000/.test(t) && /25\s*\/\s*09\s*\/\s*2031/.test(t), (t.match(/Kỳ hạn trả nợ gốc.{0,200}/)||[''])[0]);
   ok('07b giữ nguyên chữ mẫu chuẩn (4 căn cứ, "duy trì, mở rộng việc làm cho", "Lưu giữ và cung cấp, xuất trình")', !/597\/NHCS/.test(t) && /duy trì, mở rộng việc làm cho/.test(t) && /Lưu giữ và cung cấp, xuất trình/.test(t));
   hsoChonMau('01gqvl'); await w(700); t = inTxt();
   ok('01/GQVL in vốn tự có, tổng doanh thu, tổng chi phí tự tính', /20\.000\.000/.test(t) && t.indexOf(tdnTien(hsoGQ(B).dt))>=0 && t.indexOf(tdnTien(hsoGQ(B).cp))>=0);
   const tuy = document.getElementById('hso-tuy').innerText;
   ok('③ phương án: ô trống ghi "tự tính", có 🎲 Đổi số, ô Ngày giải ngân, In kèm "Trang Phê duyệt của Ngân hàng"', /tự tính/.test(document.getElementById('hso-tuy').innerHTML) && /Đổi số/.test(tuy) && /Ngày giải ngân/.test(tuy) && /Trang Phê duyệt của Ngân hàng/.test(tuy));
   /* trang Phê duyệt: in riêng */
   hsoChonMau('pdnh'); await w(700); t = inTxt();
   ok('Phê duyệt NH in riêng: số tiền + bằng chữ, lãi suất 7,9248 / quá hạn 10,30224, 60 tháng, 24 tháng/lần, 16,6 tr/lần, kỳ cuối 16,8 tr, hạn cuối 25/09/2031, 3 chữ ký', /PHÊ DUYỆT CỦA NGÂN HÀNG/.test(t) && /50\.000\.000/.test(t) && /Năm mươi triệu/.test(t) && /7,9248/.test(t) && /10,30224/.test(t) && /60 tháng/.test(t) && /24 tháng\/lần/.test(t) && /16\.600\.000 đồng\/lần/.test(t) && /kỳ cuối 16\.800\.000/.test(t) && /25\s*\/\s*09\s*\/\s*2031/.test(t) && /Cán bộ tín dụng/.test(t) && /Giám đốc/.test(t), t.slice(0, 400));
   ok('Phê duyệt NH in riêng: chỉ 1 trang (không kèm 01/GQVL)', (HSO.x.ds||[1]).length===1 && !/PHƯƠNG ÁN SỬ DỤNG VỐN VAY/.test(t));
   /* in chung */
   B.kem = {pd:1}; hsoBoLuu(); hsoChonMau('01gqvl'); await w(700);
   const ds = (HSO.x.ds||[]).map(u=>u.M && u.M.k);
   ok('tích In kèm "Phê duyệt" → 01/GQVL rồi trang Phê duyệt NH (in chung)', ds.join(',')==='01gqvl,pdnh', ds.join(','));
   B.kem = {}; hsoBoLuu();
   return o; }, files);
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
