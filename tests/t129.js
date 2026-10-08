// 3.134 — Mẫu 06: mục đích cùng cỡ 8 pt, cột đúng / sai mục đích hẹp lại + Hiệu quả đầu tư rộng ra, tên Hội không đậm, "Mẫu số 06/TD" nhỏ + canh phải;
//        Mẫu 06 trắng ghi tay (dòng 0,8 cm): 1 mặt (4 dòng) / 1 tờ 2 mặt (21 dòng) — đếm trang PDF thật; Word hợp lệ. Bộ GIẢ: tests/gia31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const t = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa)[0]; C.xa = t.xa; ktChonTo(t.ma); await w(200);
   const g = ktGiaTri06(t, ktDaChon(), ktInV('m06'));
   ok('mục đích sử dụng vốn: mọi dòng cùng cỡ 8 pt (ngắn hay dài)', ktCo06Md('Chăn nuôi')===16 && ktCo06Md('Khai thác, cung cấp nước; Xử lý ô nhiễm, chất thải, cải tạo nhà vệ sinh')===16 && ktCo06Md('')===0);
   const d = await docx(await ktDocx('m06', g)), h = ktHTML06(g);
   ok('Word: lưới cột đúng / sai mục đích 807, Hiệu quả đầu tư 994 (tổng không đổi)', /<w:tblGrid>(<w:gridCol w:w="\d+"\/>){10}<w:gridCol w:w="807"\/><w:gridCol w:w="807"\/><w:gridCol w:w="994"\/>/.test(d) && hopLe(d));
   ok('Word: khối "Mẫu số 06/TD" cỡ 10 pt, canh phải, bỏ khoảng trắng đầu', /<w:jc w:val="right"\/>[\s\S]{0,200}<w:sz w:val="20"\/>[\s\S]{0,80}Mẫu số 06\/TD/.test(d) && !/>    Lập 0</.test(d));
   ok('bản In: cột 5,1% · 5,1% · Hiệu quả đầu tư 6,2%', /width:5\.1%">Số tiền sử dụng đúng mục đích/.test(h) && /width:5\.1%">Số tiền sử dụng sai mục đích/.test(h) && /width:6\.2%">Hiệu<br>quả đầu tư/.test(h));
   ok('bản In: tên Hội không in đậm (chỉ nhãn "Đơn vị kiểm tra:" đậm); "Mẫu số 06/TD" 10 pt canh phải', /<p><b>Đơn vị kiểm tra:<\/b> /.test(h) && /font-size:10pt;text-align:right"><p class="kt-b">Mẫu số 06\/TD/.test(h));
   /* mẫu trắng */
   ktTrang06('mot'); await w(300);
   ok('hộp Mẫu 06 trắng: 2 cách in (1 mặt / 2 mặt), In + Word, xem trước', /In 1 mặt \(4 dòng hộ\)/.test(document.getElementById('hop-in').textContent) && /In 2 mặt — 1 tờ \(21 dòng hộ\)/.test(document.getElementById('hop-in').textContent) && !!document.getElementById('kt-trang-khung'));
   dongHop();
   const g1 = ktTrang06GT('mot'), g2 = ktTrang06GT('hai'), dt = await docx(await ktDocx('m06', g2));
   ok('Word mẫu trắng hợp lệ, dòng hộ 0,8 cm (454), không còn {{', hopLe(dt) && dt.indexOf('{{')<0 && (dt.match(/<w:trHeight w:val="454"/g)||[]).length>=20);
   window.__h = [inChuan(ktHTML06(g1)), inChuan(ktHTML06(g2))];
   ok('bản In mẫu trắng: dòng 0,8 cm (22,7 pt), không tên tổ / tên hộ', /tbody tr\{height:22\.7pt/.test(ktHTML06(g1)) && g1.rows.length===4 && g2.rows.length===21);
   /* 3.135: file ghi ngày dạng chữ kiểu Mỹ (tháng/ngày/năm) — tự nhận, đọc đúng kỳ */
   { const H = ['Mã xã','Tên xã','Mã thôn','Tên thôn','Ngày GDXA','Mã điểm giao dịch','Tên điểm giao dịch','Mã tổ','Mã KH','Tên KH','Số khế ước','Tình trạng món vay','Tổng dư nợ','Ngày vay','Sổ tiết kiệm 105','Số dư tiền gửi 105','Ngày số liệu'];
     const mk = (nv, nsl, ten) => { const ws = XLSX.utils.aoa_to_sheet([H, ['540034','Xã Giả','01','Ấp 1','09','TXN1','Điểm 1','0000001','4800000001','Khách Giả','6600000000000001','OPEN',1000000, nv, '7000000001', 0, nsl], ['540034','Xã Giả','01','Ấp 1','09','TXN1','Điểm 1','0000001','4800000002','Khách Giả 2','6600000000000002','OPEN',2000000, nv, '7000000002', 0, nsl]]), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1'); return new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten); };
     const k1 = await slDocFile(mk('5/23/2026 12:00:00 AM', '10/7/2026 12:00:00 AM', '004820_DU_NO_CHI_TIET.xlsx'));
     ok('3.135: ngày kiểu Mỹ (có ô 5/23/2026) → "10/7/2026" đọc là 07/10/2026, có dòng báo', k1.ngay==='2026-10-07' && k1.canhBao.some(x=>/tháng\/ngày\/năm \(Mỹ\)/.test(x)), JSON.stringify({ngay:k1.ngay, loai:k1.loai, loi:k1.loi, nguon:k1.nguonKy, cb:k1.canhBao, r:(k1.rows||[]).length, nbc:k1.rows&&k1.rows[0]&&k1.rows[0].nbc}));
     const k2 = await slDocFile(mk('10/07/2026', '10/07/2026', '004820_DU_NO_CHI_TIET_DEN_07-10-2026.xlsx'));
     ok('3.135: mơ hồ (10/07/2026) mà tên file ghi 07-10-2026 → đọc theo tên file là 07/10/2026', k2.ngay==='2026-10-07', k2.ngay);
     const k3 = await slDocFile(mk('23/05/2026', '07/10/2026', '004820_DU_NO_CHI_TIET.xlsx'));
     /* ô tháng có cả bản cuối tháng + bản theo ngày → xóa riêng bản ngày */
     await slGhi(await slDocFile(mk('23/05/2026', '31/08/2026', '004820_DU_NO_CHI_TIET_A.xlsx'))); await slGhi(await slDocFile(mk('23/05/2026', '15/08/2026', '004820_DU_NO_CHI_TIET_B.xlsx')));
     slMoO('dnct', '2026-08'); await w(100); const hop1 = document.getElementById('hop-in');
     const dongNgay = [...hop1.querySelectorAll('.sl-ngay-dong')].find(x=>/15\/08\/2026/.test(x.getAttribute('onclick')+x.textContent) || /2026-08-15/.test(x.getAttribute('onclick')));
     ok('3.135: hộp ô tháng (cuối tháng) liệt kê bản theo ngày trong tháng, bấm được', /Bản theo ngày trong tháng \(1\)/.test(hop1.textContent) && !!dongNgay, hop1.textContent.slice(0, 120));
     if(dongNgay){ dongNgay.click(); await w(100); const nx = [...document.querySelectorAll('#hop-in button')].find(b=>/Xóa bản ngày 15\/08\/2026/.test(b.textContent)); ok('3.135: hộp bản ngày có nút "🗑 Xóa bản ngày 15/08/2026"', !!nx);
       if(nx){ nx.click(); await w(100); const xn = [...document.querySelectorAll('#hop-in button')].find(b=>b.textContent.trim()==='Xóa'); if(xn) xn.click(); await w(400);
         ok('3.135: xóa bản ngày — bản cuối tháng 31/08 còn nguyên', !SLM.bang[slKhoa('dnct', '2026-08-15')] && !!SLM.bang[slKhoa('dnct', '2026-08')]); } }
     try{ dongHop(); }catch(e){}
     ok('3.135: file kiểu Việt Nam (23/05/2026, 07/10/2026) đọc như cũ', k3.ngay==='2026-10-07' && !k3.canhBao.some(x=>/Mỹ/.test(x)) && tdnNgay('07/10/2026')==='2026-10-07', k3.ngay); }
   return o;
 }, files);
 const dem = async h => { const q = await b.newPage(); await q.setContent(h); for(let i=0;i<60 && !(await q.evaluate(()=>window.TR_XONG));i++) await q.waitForTimeout(100);
   const so = await q.evaluate(()=>window.TR_SO), pdf = await q.pdf({preferCSSPageSize:true}); await q.close(); return {so, n:await p.evaluate(async a=>(await PDFLib.PDFDocument.load(new Uint8Array(a))).getPageCount(), Array.from(pdf))}; };
 const H = await p.evaluate(()=>window.__h), a = await dem(H[0]), c = await dem(H[1]);
 R.push((a.n===1 && a.so===1 ? '✓ ' : '✗ ')+'mẫu trắng in 1 mặt: đủ phiếu (đầu, 4 dòng hộ, Cộng, nhận xét, ký) trên 1 trang PDF — '+JSON.stringify(a));
 R.push((c.n===2 && c.so===2 ? '✓ ' : '✗ ')+'mẫu trắng in 2 mặt: 21 dòng hộ đúng 2 trang PDF (mặt sau có nhận xét + ký) — '+JSON.stringify(c));
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
