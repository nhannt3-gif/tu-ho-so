// 3.206 (anh chốt 14/10) — cây địa bàn ▾ Mở rộng / ▴ Thu gọn mọi tab (gọn 1 dòng, bấm mắt đường dẫn về cấp trên) · Giấy lĩnh ↺ Phiếu mới ·
//   Hồ sơ vay mỗi mẫu 1 tab con + dòng Số liệu · 09A/TD ô chấm tùy biến (✍ / 🖨, nhớ theo mẫu, lý do mặc định) · in kèm Mẫu 06/TD (gọi hàm KTGS, cán bộ trống, mục đích in / trống).
// Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.pvGon;
   /* 1. cây địa bàn — tab Tổ */
   slDoiTab('to'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#to-cay .loc-khoi');i++) await w(200); await w(400);
   const t = Object.values(TO_K.to).find(t=>!t.trucTiep && t.ten && t.khoaDiem && hsoTVTo(t).some(k=>k.mon.some(m=>m.dn>0)));
   ok('tab Tổ chưa chọn: không có nút thu gọn, khối mở', !document.querySelector('#to-cay .pv-gon') && !document.querySelector('#to-cay .loc-khoi.gon'));
   pvChonTo('to', t.ma); await w(400);
   const nut = () => (document.querySelector('#to-cay .pv-gon')||{}).textContent||'';
   ok('chọn tổ → tự gọn 1 dòng, nút "▾ Mở rộng"', !!document.querySelector('#to-cay .loc-khoi.gon') && /Mở rộng/.test(nut()), nut());
   const mat = [...document.querySelectorAll('#to-cay .pv-ve')].map(x=>x.textContent);
   ok('đường dẫn 🏠 PGD › Xã › Điểm … › Tổ — các mắt cấp trên bấm được', mat[0]==='🏠 PGD' && mat.length>=3, mat.join(' › '));
   pvGonDoi('to'); await w(300);
   ok('bấm Mở rộng → hiện Xã · Điểm · Hội · Tổ, nút "▴ Thu gọn"; nhớ theo tab', !document.querySelector('#to-cay .loc-khoi.gon') && /Thu gọn/.test(nut()) && D.cauHinh.pvGon.to===false);
   pvGonDoi('to'); await w(300);
   document.querySelectorAll('#to-cay .pv-ve')[1].click(); await w(300); let S = PV_DUNG.to.S();
   ok('bấm tên Xã → về cả xã (bỏ điểm, tổ)', !!S.xa && !S.diem && !S.to);
   document.querySelector('#to-cay .pv-ve').click(); await w(300); S = PV_DUNG.to.S();
   ok('bấm 🏠 PGD → về toàn PGD', !S.xa && !S.to);
   /* 2. Giấy lĩnh */
   slDoiTab('gdx'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#gdx-cay .loc-khoi');i++) await w(200); await w(400); gdxDoiMau('gl'); await w(300);
   ok('Giấy lĩnh: nút "↺ Phiếu mới" (không còn "Làm trống")', [...document.querySelectorAll('.gdx2-nut button')].some(x=>/↺ Phiếu mới/.test(x.textContent)) && ![...document.querySelectorAll('.gdx2-nut button')].some(x=>/Làm trống/.test(x.textContent)));
   /* 3. Hồ sơ vay */
   slDoiTab('hsv'); doiNgan(7); await w(1200); hsoChonMau('09a'); await w(500);
   ok('Hồ sơ vay: mỗi mẫu 1 tab con (7, có 01/TĐCK), 09A đang chọn, dòng "Số liệu: T8/2026"', document.querySelectorAll('#hso-tabm .hso-tm').length===7 && /09A\/TD/.test((document.querySelector('#hso-tabm .hso-tm.bat')||{}).textContent||'') && /Số liệu: T8\/2026/.test(document.getElementById('hso-tabm').textContent));
   pvChonTo('hsv', t.ma); await w(600); const k = hsoTVTo(t).find(k=>k.mon.some(m=>m.dn>0)); HSO.vay.kh = k.kh; hsoVe(); await w(400); hsoXem(); await w(500);
   const doc = () => document.getElementById('hso-xem-khung').contentDocument.body.textContent;
   ok('09A mặc định: lý do / thời gian / ngày ký để chấm; số tiền gia hạn in sẵn = dư nợ', !/Đang gặp khó khăn/.test(doc()) && /Đề nghị Ngân hàng xem xét cho gia hạn khoản nợ gốc\s*[\d.]+\s*đồng/.test(doc()) && /ngày\.+tháng/.test(doc()));
   hsoChamDat('09a', 'lyDo', 'in'); hsoChamDat('09a', 'thang', 'in'); HSO.vay.thang = '12'; hsoChamDat('09a', 'ngayKy', 'in'); await w(300); hsoXem(); await w(500);
   ok('🖨 In sẵn: lý do mặc định "Đang gặp khó khăn về kinh tế, tài chính", 12 tháng, ngày ký hôm nay', /Đang gặp khó khăn về kinh tế, tài chính/.test(doc()) && /Thời gian đề nghị:\s*12\s*tháng/.test(doc()) && /ngày \d\d tháng \d\d năm 20\d\d/.test(doc()));
   ok('lựa chọn ✍ / 🖨 nhớ theo mẫu (cài đặt)', hsoLuu().cham['09a'].lyDo==='in' && hsoLuu().cham['09a'].ngayKy==='in');
   HSO.vay.lyDo = 'Lý do giả mới'; hsoLyDoThem(); await w(200);
   ok('＋ thêm lý do vào danh sách (giữ lý do mặc định đầu)', hsoLyDoDs()[0]==='Đang gặp khó khăn về kinh tế, tài chính' && hsoLyDoDs().indexOf('Lý do giả mới')>0);
   ok('phần ý kiến Hội / UBND / phê duyệt NH vẫn chấm', /PHÊ DUYỆT CỦA NGÂN HÀNG CHÍNH SÁCH XÃ HỘI- Số tiền được gia hạn nợ là \.+đồng/.test(doc().replace(/\s+/g, ' ').replace('HỘI -', 'HỘI-')));
   /* 4b. Mẫu 06/TD kèm */
   hsoLuu().kem06 = true; hsoVe(); await w(400);
   ok('tích In kèm Mẫu 06/TD → nút 🖨 06/TD + In gọi in kèm', !!document.querySelector('#hso-xem-nut button[onclick="hsoIn06()"]') && !!document.querySelector('#hso-xem-nut button[onclick="hsoIn09Kem()"]'));
   let g = hso06Gt();
   ok('Mẫu 06/TD: 1 hộ = người vay, 1 món đang gia hạn; Hội quản lý điền sẵn; cán bộ kiểm tra trống; mục đích trống (mặc định)', !!g && g.rows.length===1 && g.rows[0].R2 && g.f.DV && !g.f.CB1 && !g.f.CV1 && !g.rows[0].R7, g && JSON.stringify({dv:g.f.DV, cb:g.f.CB1, md:g.rows[0].R7}));
   hsoLuu().md06 = 'in'; g = hso06Gt();
   ok('mục đích 🖨 in sẵn → ngành kinh tế theo Mẫu 31 (khi món có mã ngành)', g.rows[0].R7!==undefined && (g.rows[0].R7 || !ktCoNganh(hsoMonGH(t)[0])), g.rows[0].R7);
   const h06 = ktHTML06(g);
   ok('Mẫu 06/TD dựng bằng đúng hàm KTGS (ktHTML06), có tên hộ vay', /<html/i.test(h06) && h06.indexOf(tenHoaDau(g.rows[0].R2))>=0);
   /* 01/TĐCK — in kèm 09A (cùng khổ dọc → 1 tài liệu) + tab riêng */
   hsoLuu().kemTDCK = true; hsoVe(); await w(300); let x = hsoLap();
   const c = hsoKhachChon(t);
   ok('09A tích In kèm 01/TĐCK → 1 tài liệu 2 mẫu (09A + 01/TĐCK), có tên người vay + "thay đổi mẫu ký giao dịch"', x.ds.length===2 && x.ds[1].M.k==='01tdck' && x.trang.indexOf('Về việc thay đổi mẫu ký giao dịch với NHCSXH')>0 && x.ds[1].h.indexOf(c.ten)>0);
   ok('01/TĐCK: phần chấp thuận NH để chấm, ô chữ ký thứ nhất / thứ hai', /chấp thuận cho ông\/bà:\.+ có tên trên/.test(x.ds[1].h) && /Chữ ký thứ nhất/.test(x.ds[1].h) && /Chữ ký thứ hai/.test(x.ds[1].h));
   const wd = await hsoDocx(x); ok('Word 09A + 01/TĐCK tạo được', wd && wd.size>5000, wd && wd.size);
   hsoChonMau('01tdck'); await w(400); x = hsoLap();
   ok('tab 01/TĐCK riêng: chung người vay đang chọn', x.M.k==='01tdck' && x.h.indexOf(c.ten)>0);
   hsoChonMau('09a'); await w(300);
   const bl = await ktDocx('m06', g); ok('Word Mẫu 06/TD tạo được (ktDocx m06)', bl && bl.size>5000, bl && bl.size);
   return o;
 }, files);
 R.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.join(' | ') : ''));
 console.log(R.join('\n')); console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); })();
