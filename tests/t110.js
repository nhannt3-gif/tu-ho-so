// 3.97 — KTGS: 🗓 kiểm tra định kỳ theo lịch (Mẫu 06 + 16, số liệu cuối tháng trước → tháng kiểm tra, ngày trống, ≥ 90% hộ, QH / khoanh không tích),
//        Mẫu 04 nhận tổ định kỳ, số liệu mặc định cuối tháng, BC0437 / BC0438 không theo khóa tháng, ↺ Gợi ý lại ra lượt hộ khác,
//        Kế hoạch khuôn ② (mẫu gọn, không tên riêng), khai báo theo thứ tự mẫu, bảng đầu trang / chữ ký không viền.
// Bộ GIẢ: tests/gia31. Tham số tùy chọn: thư mục lưu file Word mẫu để xem bằng LibreOffice.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R0 = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   const F = {}; giaoFile = function(bl, ten){ F[ten] = bl; }; const H = {}; inBlob = function(bl, ten){ H[ten] = bl; };
   const moZip = async (bl) => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); const g = n => { const f = XLSX.CFB.find(z, n) || XLSX.CFB.find(z, '/'+n); return f ? new TextDecoder().decode(f.content) : null; }; return {z, g, doc:g('word/document.xml')}; };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const b64 = async bl => { const a = new Uint8Array(await bl.arrayBuffer()); let s=''; for(let i=0;i<a.length;i++) s+=String.fromCharCode(a[i]); return btoa(s); };
   /* 1. số liệu mặc định cuối tháng */
   const ds0 = [{ky:'2026-09-05', chu:'ngày'}, {ky:'2026-08', chu:'T8'}, {ky:'2026-07', chu:'T7'}];
   const CC = {ky:''}; ok('kỳ mặc định = Mẫu 31 cuối tháng gần nhất (không lấy theo ngày)', toKyMacDinh(CC, ds0, 'x')==='2026-08');
   const CD = {ky:'2026-09-05'}; ok('kỳ theo ngày đã lưu từ lần mở trước → về cuối tháng', toKyMacDinh(CD, ds0, 'x')==='2026-08');
   KY_PHIEN.y = '2026-09-05'; const CE = {ky:'2026-09-05'}; ok('anh chọn theo ngày trong lần mở này → giữ', toKyMacDinh(CE, ds0, 'y')==='2026-09-05');
   const CF = {ky:'2026-07'}; ok('kỳ cuối tháng anh đã chọn → giữ', toKyMacDinh(CF, ds0, 'z')==='2026-07');
   const op = toKyOpt([{ky:'2026-08', chu:'T8'}, {ky:'2026-09-05', chu:'ngày'}], '2026-08'); ok('ô chọn chia nhóm Cuối tháng / Theo ngày — khi cần', /optgroup label="Cuối tháng/.test(op) && /optgroup label="Theo ngày/.test(op) && op.indexOf('2026-08')<op.indexOf('2026-09-05'));
   const ds1 = toDsKy(); ok('danh sách kỳ thật: cuối tháng lên trước', ds1.length>=2 && ds1.every((x, i)=>!i || !(x.ky.length===7 && ds1[i-1].ky.length>7)), ds1.map(x=>x.ky).join(','));
   /* 2. tách khóa */
   SLM.chot = SLM.chot || {}; SLM.chot['2026-08'] = {khoa:true, luc:new Date().toISOString()};
   ok('tháng đã chốt: file số liệu chính khóa, BC0437 / BC0438 KHÔNG khóa', slKhoaO('hstd', '2026-08') && !slKhoaO('k37', '2026-08') && !slKhoaO('k38', '2026-08') && slTrangThai({loai:'k37', ky:'2026-08', rows:[1], canhBao:[], hash:'x1'}).lop!=='loi' && slTrangThai({loai:'hstd', ky:'2026-08', rows:[1], canhBao:[], hash:'x2'}).lop==='loi');
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   ok('ma trận KTGS: tháng đã chốt vẫn nạp được (không ô khóa, không 🔒 ở tiêu đề tháng)', !document.querySelector('.kt-nap .sl-o.khoa') && ![...document.querySelectorAll('.kt-nap th')].some(th=>/🔒/.test(th.textContent)) && /không theo khóa tháng/.test(document.querySelector('.kt-nap').textContent));
   delete SLM.chot['2026-08'];
   /* 3. gợi ý lại */
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t)); let best = ds[0]; ds.forEach(t=>{ if(toKhach(t).length>toKhach(best).length) best = t; });
   ktChonTo(best.ma); await w(300); const bo = () => ktDaChon().map(h=>h.kh).sort().join(',');
   const g1 = bo(), bb = Object.keys(KT_CHON.chon).filter(k=>KT_CHON.chon[k].bb); ktGoiYLai(); await w(150); const g2 = bo(); ktGoiYLai(); await w(150); const g3 = bo();
   ok('↺ Gợi ý lại: mỗi lần ra lượt hộ khác', g1!==g2 && g2!==g3 && g1!==g3);
   ok('gợi ý lại vẫn giữ hộ bắt buộc, không gợi ý QH / khoanh', bb.every(k=>KT_CHON.chon[k]) && !ktDaChon().some(h=>h.loai && !KT_CHON.chon[h.kh].bb));
   ok('hiện số hộ theo nhóm (giải thích khi kiểu ra trùng)', /hộ tốt · .* hộ cần quan tâm/.test(document.querySelector('.kt-nhom-so').textContent));
   /* 4. khai báo theo thứ tự mẫu */
   KT_KB = {}; ktKhaiBao('m06'); await w(80); const id06 = [...document.querySelectorAll('.kt-kb-khung [id^=kb-]')].map(e=>e.id.slice(3)).join(',');
   ok('3.98: khai báo nằm trong tab (không hộp bật lên), theo thứ tự mẫu: Mẫu 06 (đơn vị → cán bộ → ngày → mục đích) rồi Mẫu 16 (đoàn → nhận xét)', !document.getElementById('hop-in') || !document.querySelector('#hop-in [id^=kb-]'), id06);
   ok('khung đột xuất đủ ô theo thứ tự', id06==='dv,cbtu,cb2,cv2,ngay,md,nx', id06);
   ok('⚙ Khai báo Hội: tên → cán bộ → KH Hội tỉnh → HĐUT → ký (3.106: bỏ ô đoàn)', KT_HKB_O.map(x=>x[0]).join(',')==='ten,cb,cbcv,kh,khNgay,hd,hdNgay,ky');
   /* 5. định kỳ theo lịch */
   const t0 = best; C.xa = t0.xa; C.diem = ''; C.hoi = String(t0.dv); C.to = '';
   const kKH = '2026|'+t0.xa+'|'+t0.dv; D.cauHinh.ktKH = D.cauHinh.ktKH || {}; const lich = {}; lich[t0.ma] = 9; D.cauHinh.ktKH[kKH] = {tu:2, den:10, to:lich};
   KT_DK_CHON = {}; KT_DK_BO = {}; KT_DK_THEM = {}; ktDoiCheDo('dk'); await w(300); const the = () => document.getElementById('kt-the').textContent;
   ok('số liệu 31/08/2026 → kiểm tra tháng 09/2026', ktDKThang()==='2026-09' && /Số liệu đến 31\/08\/2026.*kiểm tra tháng 09\/2026/.test(the()));
   const r0 = ktDKDs(); ok('tổ có lịch tháng 9 (Kế hoạch 01/KH) tích sẵn, tổ khác trong phạm vi chưa tích', r0[0].t.ma===t0.ma && r0[0].lich && r0[0].chon && r0.slice(1).every(r=>!r.chon));
   const x0 = ktDKTyLe(t0), ho = ktDKHo(t0);
   ok('Mẫu 06 định kỳ: chỉ món giải ngân trước 01/01/2026, tích sẵn 100% hộ không QH / khoanh', ho.length>0 && ho.every(y=>y.mon.every(m=>(m.ngn||m.nv)<'2026-01-01')) && x0.nChon===x0.nDung && x0.pt===100, x0.nChon+'/'+x0.nDung+' hộ · '+x0.monC+'/'+x0.monD+' món');
   ok('hộ QH / khoanh không tích', ho.filter(y=>y.h.loai).every(y=>!ktDKCo(t0.ma, y)));
   const dung = ho.filter(y=>!y.h.loai); dung.slice(0, Math.ceil(dung.length*0.2)).forEach(y=>{ KT_DK_BO[t0.ma+'|'+y.h.kh] = 1; }); ktVeThe(); await w(150);
   ok('bỏ tích → tỷ lệ < 90% báo đỏ', ktDKTyLe(t0).pt<90 && !!document.querySelector('.kt-dk-bang b.do'));
   KT_DK_BO = {}; const qh = ho.find(y=>y.h.loai); if(qh){ ktDKHoTich(t0.ma, qh.h.kh, 1, true); await w(100); ok('tích tay hộ QH / khoanh → thêm vào, không tính vào tỷ lệ', ktDKCo(t0.ma, qh) && ktDKTyLe(t0).pt===100 && ktDKTyLe(t0).nTong===ktDKTyLe(t0).nChon+1); }
   KT_KB = {}; ktDKKhaiBao(); await w(80); const idDK = [...document.querySelectorAll('.kt-kb-khung [id^=kb-]')].map(e=>e.id.slice(3)).join(',');
   ok('khung định kỳ: Mẫu 06 (đơn vị → cán bộ → mục đích) rồi Mẫu 16 (3.107: không còn ô đoàn); không hỏi ngày', idDK==='dv,cbtu,cb2,cv2,md,nx', idDK);
   ktDKXem(); await w(400); const X = KT_DK_XEM;
   ok('Mẫu 06: thời điểm "…../09/2026", ngày trống, tháng 09 năm 2026', X.g06[0].f.TD==='…../09/2026' && X.g06[0].f.ND==='' && X.g06[0].f.NM==='09' && X.g06[0].f.NY==='2026');
   ok('Mẫu 16: ngày trống, tháng 09 năm 26; số liệu đến 31/08/2026; số khách = số hộ chọn', X.g16[0].f.ND==='' && X.g16[0].f.NM==='09' && X.g16[0].f.NY==='26' && X.g16[0].f.SD==='31' && X.g16[0].f.SM==='08' && +X.g16[0].f.SKH===X.g06[0].dc.length);
   ktDKIn('word', '06'); await w(1000); ktDKXem(); await w(200); ktDKIn('word', '16'); await w(1000);
   const f06 = Object.keys(F).find(n=>/Mau 06 dinh ky/.test(n)), f16 = Object.keys(F).find(n=>/Mau 16 dinh ky/.test(n)); const z06 = await moZip(F[f06]), z16 = await moZip(F[f16]);
   const c06 = z06.doc.replace(/<[^>]+>/g, ''), c16 = z16.doc.replace(/<[^>]+>/g, '');
   ok('Word 06 + 16 hợp lệ, hết dấu {{', hopLe(z06.doc) && hopLe(z16.doc) && z06.doc.indexOf('{{')<0 && z16.doc.indexOf('{{')<0, f06+' · '+f16);
   ok('Word 06: thời điểm …../09/2026 + "tháng 09 năm 2026"', /…\.\.\/09\/2026/.test(c06) && /tháng 09/.test(c06) && /năm 2026/.test(c06));
   ok('Word 16: "tháng 09 năm 2026", đến thời điểm 31/08/2026', /tháng 09 năm 2026/.test(c16) && /thời điểm 31\/08\/2026/.test(c16));
   ok('3.98: không ghi nhật ký định kỳ (chỉ phục vụ in)', !((D.cauHinh.ktgsNK||{})[t0.ma]||[]).length);
   C.che = 'bc'; C.xa = t0.xa; C.diem = ''; C.hoi = ''; C.to = ''; KT_BC_CHON = {}; KT_BC_NGAY = {}; ktVeThe(); await w(200);
   ok('Mẫu 04 ① (3.98): chọn xã → chưa tích tổ nào, tổ chia nhóm theo ấp', ktBCGiaTri().length===0 && document.querySelectorAll('.kt-bc-bang tr.kt-kh-ap').length>0);
   ktBCTichAp(KT_BC_AP.indexOf(ktKHAp(t0)), true); await w(100);
   const g4 = ktBCGiaTri().find(g=>g.rows.some(r=>r.C3.indexOf(t0.ten)>=0));
   ok('Mẫu 04 ①: tích cả ấp → mọi tổ của ấp; thời gian = tháng sau tháng số liệu (3.106)', !!g4 && ktBCDs().filter(r=>ktKHAp(r.t)===ktKHAp(t0)).every(r=>r.chon) && g4.rows.find(r=>r.C3.indexOf(t0.ten)>=0).C2==='Tháng '+ktThangKT().slice(5)+'/'+ktThangKT().slice(0,4) && g4.f.SP==='');
   /* 6. Kế hoạch khuôn ② + không viền */
   C.che = 'kh'; C.khNam = 2026; C.xa = t0.xa; C.hoi = String(t0.dv); ktVeThe(); await w(200);
   ok('màn Kế hoạch có chọn khuôn ① / ②', /① Dự thảo HĐT cấp xã/.test(the()) && /② Mẫu gọn/.test(the()));
   KT_KH_M04 = {9:true}; const g4b = ktKH04();
   ok('Mẫu 04 ② theo kế hoạch tháng 9: tổ có lịch tháng 9, thời gian "Tháng 09/2026"', g4b.length>=1 && g4b.some(g=>g.rows.some(r=>r.C3.indexOf(t0.ten)>=0 && r.C2==='Tháng 09/2026')) && /Mẫu 04 theo kế hoạch/.test(the()));
   ktKHDoiMau('2'); await w(100); ok('chọn khuôn ② nhớ theo Hội', ktKHMau()==='m01b' && ktHoiKB(t0.xa+'|'+t0.dv).mauKH==='2');
   ktHoiKBSua(t0.xa+'|'+t0.dv, 'ky', 'Giả Văn Ký');
   ktKHXem(); await w(400); ktKHIn('word'); await w(1200);
   const fK = Object.keys(F).find(n=>/Ke hoach KTGS/.test(n)); const zK = await moZip(F[fK]); const cK = zK.doc.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   ok('Word khuôn ②: hợp lệ, hết dấu {{, TM. BAN THƯỜNG VỤ + người ký, bảng lịch "Tháng …"', hopLe(zK.doc) && zK.doc.indexOf('{{')<0 && /TM\. BAN THƯỜNG VỤ/.test(cK) && cK.indexOf('Giả Văn Ký')>=0 && /Tháng \d/.test(cK) && /Kiểm tra tại/.test(cK), fK);
   ok('khuôn ②: bảng lịch chỉ còn 1 dòng khuôn (các dòng mẫu có tên đã xóa)', (KT_KHUON.m01b.than.match(/\{\{@LICH\}\}/g)||[]).length===1 && !/Tháng [4-8]</.test(KT_KHUON.m01b.than) && /\{\{L3\|\}\}/.test(KT_KHUON.m01b.dong));
   ok('khuôn ②: điền tên Hội xã, ký hiệu KH, năm, chân trang số trang', cK.indexOf(ktChuanDauXa(t0))>=0 && /\/KH-(HND|HPN|CCB|ĐTN)/.test(cK) && /năm 2026/.test(cK) && !!zK.g('word/footer1.xml') && !zK.g('word/header1.xml'));
   const vien = x => (x.match(/<w:tblBorders><w:top w:val="nil"\/>/g)||[]).length;
   ok('bảng đầu trang / chữ ký không viền (04: 1 · KH ①: 2 · KH ②: 2); bảng số liệu giữ viền', vien(KT_KHUON.m04.than)===1 && vien(KT_KHUON.m01.than)===2 && vien(KT_KHUON.m01b.than)===2 && /w:val="single"/.test(KT_KHUON.m01b.than));
   ok('Quốc hiệu đủ chỗ: cột phải bảng đầu trang KH ① 5657, ② 5701 twip (3.108: nới cột trái; Quốc hiệu đậm 13 cần ≈ 5386 + lề 216)', /<w:gridCol w:w="5657"\/>/.test(KT_KHUON.m01.than) && /<w:gridCol w:w="5701"\/>/.test(KT_KHUON.m01b.than) && ktDoRong('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 26)+216 <= 5657);
   ktKHDoiMau('1'); await w(100); ktKHXem(); await w(300); ktKHIn('word'); await w(1200);
   const fK1 = Object.keys(F).filter(n=>/Ke hoach KTGS/.test(n)).pop(); const zK1 = await moZip(F[fK1]); ok('khuôn ① vẫn chạy (căn cứ 727)', hopLe(zK1.doc) && /727\/HD-NHCS/.test(zK1.doc));
   ktKHDoiMau('2'); ktKHXem(); await w(300); ktKHIn('in'); await w(300);
   const hK = await H[Object.keys(H).filter(n=>/Ke hoach KTGS/.test(n)).pop()].text(); ok('In khuôn ②: đủ chữ + bảng', /TM\. BAN THƯỜNG VỤ/.test(hK.replace(/<[^>]+>/g, '')) && /<table/.test(hK));
   const ra = {k2:await b64(F[fK]), d06:await b64(F[f06]), d16:await b64(F[f16])};
   C.che = 'dx'; C.xa=''; C.hoi=''; C.khHoi='';
   return {o, ra}; }, files).catch(e=>({o:['✗ LỖI '+e.message]}));
 const r = R0.o; r.forEach(x=>console.log(x));
 if(process.argv[2] && R0.ra) for(const k of Object.keys(R0.ra)) fs.writeFileSync(path.join(process.argv[2], 't110_'+k+'.docx'), Buffer.from(R0.ra[k], 'base64'));
 await p.screenshot({path:path.join(__dirname,'t110.png'), fullPage:true});
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
