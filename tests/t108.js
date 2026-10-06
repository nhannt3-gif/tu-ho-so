// 3.95 — tab con 🛡 KTGS Hội: 📋 Mẫu 04/BC-TH (Báo cáo tổng hợp kết quả kiểm tra) + ⚙ Khai báo Hội.
//        Tổ có phiếu trong tháng (Mẫu 06 đột xuất · Biên bản 16 · Mẫu 06 sau giải ngân) tích sẵn, thêm tổ trong phạm vi, sửa ngày,
//        mỗi Hội – xã 1 báo cáo, Word đúng khuôn (XML hợp lệ, bỏ MẪU THAM KHẢO, dòng chấm, bảng mục II, số phiếu VI), In / PDF.
// Bộ GIẢ: tests/gia31 (taogia.py 25000 tests/gia31 m31). Tham số tùy chọn: thư mục lưu file Word mẫu để xem bằng LibreOffice.
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
   const moZip = async (bl) => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); const f = XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml'); return {z, doc:new TextDecoder().decode(f.content)}; };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   D.cauHinh.ktHaiMat = 0;   /* 3.124: phép này kiểm ngắt trang thường — in 2 mặt kiểm ở t126 */
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   ok('có nút chế độ 📋 Mẫu 04', /Báo cáo tổng hợp · Mẫu 04/.test(document.querySelector('.kt-che').textContent));
   const ds = Object.keys(KT_K.to).map(m=>KT_K.to[m]).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99');
   const A = ds[0], A2 = ds.find(t=>t.xa===A.xa && String(t.dv)===String(A.dv) && t.ma!==A.ma), B = ds.find(t=>ktHoiKhoa(t)!==ktHoiKhoa(A));
   const B2 = ds.find(t=>t.xa===A.xa && String(t.dv)!==String(A.dv)) || B;
   /* 3.98: không theo dõi — xuất 16 / 06 không ghi nhật ký, lịch sử */
   ktChonTo(A.ma); await w(300); KT_KB = {ngay:'2026-09-05'}; ktKhaiBao('m16'); await w(50); ktXuat('m16', 'word', 1); await w(600);
   ktKhaiBao('m06'); await w(50); ktXuat('m06', 'in', 1); await w(300);
   ok('3.98: xuất Biên bản 16 / Mẫu 06 không ghi nhật ký, lịch sử', !((D.cauHinh.ktgsNK||{})[A.ma]||[]).length && !((D.cauHinh.ktgsLS||{})[A.ma]||[]).length);
   /* màn Mẫu 04 ① — chọn theo cây địa bàn */
   C.xa=''; C.diem=''; C.hoi=''; C.to=''; KT_BC_CHON = {}; KT_BC_NGAY = {}; ktDoiCheDo('bc'); await w(300);
   ok('Toàn PGD: nhắc chọn xã, chưa có tổ', !ktBCDs().length && /Chọn xã/.test(document.getElementById('kt-the').textContent));
   C.xa = A.xa; pvVeCay('kt'); await w(300);
   const hang = () => [...document.querySelectorAll('#kt-the .kt-bc-bang tbody tr:not(.kt-kh-ap)')].filter(tr=>tr.querySelector('input[type=checkbox]'));
   ok('chọn xã: tổ của xã chia nhóm theo ấp, chưa tích tổ nào', hang().length===ktBCDs().length && hang().length>0 && hang().every(tr=>!tr.querySelector('input[type=checkbox]').checked) && document.querySelectorAll('#kt-the tr.kt-kh-ap').length>0 && ktBCDs().every(r=>r.t.xa===A.xa), hang().length+' tổ');
   const apA = ktKHAp(A); ktBCTichAp(KT_BC_AP.indexOf(apA), true); await w(100);
   const cuaAp = ktBCDs().filter(r=>ktKHAp(r.t)===apA);
   ok('tích dòng ấp → chọn mọi tổ của ấp', cuaAp.length>0 && cuaAp.every(r=>r.chon) && ktBCDs().filter(r=>r.chon).length===cuaAp.length, cuaAp.length+' tổ');
   ktBCTichAp(KT_BC_AP.indexOf(apA), false); await w(50); ok('bỏ tích dòng ấp → bỏ cả ấp', !ktBCDs().some(r=>r.chon));
   [A, A2, B2].forEach(t=>ktBCTich(t.ma, true)); ktBCNgay(A.ma, '2026-09-05'); await w(100);
   ok('tích từng tổ + ngày (tùy chọn)', ktBCDs().find(r=>r.t.ma===A.ma).chon && ktBCDs().find(r=>r.t.ma===A.ma).ngay==='2026-09-05' && ktBCDs().find(r=>r.t.ma===A2.ma).chon);
   const nhom = ktBCNhom(ktBCDs()).length; ok('mỗi Hội – xã 1 báo cáo', nhom===(String(B2.dv)!==String(A.dv) && B2.xa===A.xa ? 2 : 1) && new RegExp('→ '+nhom+' báo cáo').test(document.getElementById('kt-the').textContent), nhom+' báo cáo');
   C.hoi = String(A.dv); pvVeCay('kt'); await w(200);
   ok('chọn đến hội → chỉ tổ của hội', ktBCDs().every(r=>String(r.t.dv)===String(A.dv)));
   C.hoi = ''; pvVeCay('kt'); await w(200);
   /* khai báo Hội */
   ktHoiKBHop(); await w(150); ok('3.113 🏛 Khai báo Hội đoàn thể: tab riêng, lọc theo xã đã chọn, mỗi Hội – xã 1 thẻ, có In ra + đường sang Chuẩn hóa', ktCheDo()==='hdt' && document.querySelectorAll('#kt-the .kt-hdt-the').length===ktHoiDs().length && ktHoiDs().every(x=>x.t.xa===A.xa) && document.querySelectorAll('#kt-the .kt-hdt-the .hkb-in').length===ktHoiDs().length*5 && /Chuẩn hóa/.test(document.getElementById('kt-the').textContent));
   const kA = ktHoiKhoa(A); ktHoiKBSua(kA, 'cb', '  Giả Văn   Một '); ktHoiKBSua(kA, 'cbcv', 'Chủ tịch Hội'); ktHoiKBSua(kA, 'hd', ' 12/HĐUT '); dongHop();
   ok('lưu khai báo (gọn khoảng trắng); 3.106: không còn ô Đoàn kiểm tra', D.cauHinh.ktHoiKB[kA].doan===undefined && D.cauHinh.ktHoiKB[kA].cb==='Giả Văn Một' && D.cauHinh.ktHoiKB[kA].hd==='12/HĐUT');
   ok('tên đơn vị tự sinh Hội … xã …', /^(Hội|Đoàn)/.test(ktHoiTen(A)) && /(xã|phường) /i.test(ktHoiTen(A)), ktHoiTen(A));
   /* xem + Word */
   ktVeThe(); await w(200); ktBCXem(1); await w(400);
   const G = KT_BC_XEM.gts, gA = G.find(g=>g.k===kA);
   ok('👁 xem trước: '+nhom+' báo cáo, Hội A có 2 tổ', !!document.getElementById('kt-bc-khung') && G.length===nhom && gA.rows.length===2, G.map(g=>g.ten+':'+g.rows.length).join(' · '));
   ok('dòng mục II (3.106): chỉ ghi tháng · Tổ TK&VV … · ấp, xã, tỉnh (tổ không nhập ngày → tháng sau tháng số liệu)', gA.rows[0].C2==='Tháng 09/2026' && gA.rows[0].C3.indexOf('Tổ TK&VV '+A.ten)===0 && /^(Ấp|Khu phố) .+, (xã|phường) /.test(gA.rows[0].C4) && gA.rows[1].C2==='Tháng '+ktThangKT().slice(5)+'/'+ktThangKT().slice(0,4), JSON.stringify(gA.rows.map(r=>[r.C2,r.C4])));
   ok('VI.1: số phiếu Mẫu 06 để dòng chấm (không theo dõi)', G.every(g=>g.f.SP===''));
   const them = A2;
   ktBCIn('word'); await w(1200);
   const fn = Object.keys(F).find(n=>/Mau 04/.test(n)); const z = await moZip(F[fn]); const doc = z.doc, chu = doc.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   ok('Word: XML hợp lệ, hết dấu {{', hopLe(doc) && doc.indexOf('{{')<0, fn);
   ok('Word: bỏ khung MẪU THAM KHẢO, giữ Mẫu số 04/BC-TH + đường kẻ', doc.indexOf('MẪU THAM KHẢO')<0 && /Mẫu số 04\/BC/.test(chu) && /prst="line"/.test(doc));
   ok('Word: '+nhom+' báo cáo, ngắt trang, id hình không trùng', (doc.match(/w:type="page"/g)||[]).length===nhom-1 && (chu.match(/BÁO CÁO TỔNG HỢP/g)||[]).length===nhom && (()=>{ const ids = doc.match(/<wp:docPr id="\d+"/g)||[]; return new Set(ids).size===ids.length; })());
   ok('Word: đơn vị in hoa + đoàn kiểm tra dạng "- Ông (bà): … Chức vụ: …" (3.106: 2 dòng in sẵn) + nhận xét từng tổ', (o=>chu.indexOf(o.DV0)>=0 && chu.indexOf(o.DV.trim())>=0 && chu.indexOf('ĐƠN VỊ KIỂM TRA')<0)(ktDV04(ktHoiTen(A).toUpperCase())) && /PGD NHCSXH /.test(chu) && (chu.match(/- Ông \(bà\): /g)||[]).length>=4 && /Đối với Tổ TK&VV:/.test(chu) && /- Tổ TK&VV [^:]+: dư nợ [\d.,]+ triệu đồng/.test(chu) && !/a\) Đối với tổ chức CT-XH được kiểm tra[\s\S]*b\) Đối với Tổ TK&VV[\s\S]*2\. Kiến nghị/.test(chu.slice(0, chu.indexOf('2. Kiến nghị')+12)));
   ok('Word: dòng chấm ghi tay (3.109): I.1 2 dòng Ông (bà) × 2 chấm, I.2 2, III 1 (nội dung ghi sẵn), kiến nghị d) đ) 3.a 3.b × 3 (a b c ghi sẵn), VI 2', (doc.match(/w:leader="dot"/g)||[]).length===2*(4+2+1+12+2)+KT_BC_XEM.gts.reduce((a,g)=>a+g.doan.filter(x=>!x.cb).length*2,0), (doc.match(/w:leader="dot"/g)||[]).length+' dòng');
   ok('Word: bảng mục II lặp tiêu đề, dòng tổ không cắt', (doc.match(/<w:tblHeader\/>/g)||[]).length===2 && chu.indexOf('Tổ TK&VV '+them.ten)>=0);
   ok('Word: khối VI + Nơi nhận + Trưởng đoàn đi liền', /keepNext/.test(doc) && /TRƯỞNG ĐOÀN KIỂM TRA/.test(chu) && /\(mẫu06\/TD,06A\/TD\):\.{5,}phiếu/.test(chu.replace(/\s/g, '')));
   ok('Word: đủ phần (styles, header, theme…)', ['word/styles.xml','word/settings.xml','word/header1.xml','word/theme/theme1.xml','word/footnotes.xml'].every(n=>XLSX.CFB.find(z.z, n) || XLSX.CFB.find(z.z, '/'+n)));
   ktBCXem(1); await w(200); ktBCIn('in'); await w(300);
   const hh = await H[Object.keys(H).find(n=>/Mau 04/.test(n))].text();
   ok('In / PDF: A4 dọc, 2 báo cáo trang mới, có bảng + dòng chấm', /size:A4;/.test(hh) && (hh.match(/break-before:page/g)||[]).length===nhom-1 && /kt-ch/.test(hh) && hh.indexOf(A.ten)>=0);
   /* 1 tổ không khai báo Hội → giữ dòng chấm */
   KT_BC_CHON = {}; KT_BC_NGAY = {}; KT_BC_CHON[B2.ma] = true; ktVeThe(); ktBCXem(1); await w(200); ktBCIn('word'); await w(900);
   const fn2 = Object.keys(F).filter(n=>/Mau 04/.test(n)).pop(); const z2 = await moZip(F[fn2]);
   ok('Hội chưa khai báo: đơn vị tự sinh; 3.114: Đoàn kiểm tra = dòng Phó Chủ tịch (tên dòng chấm) + 2 dòng in sẵn', hopLe(z2.doc) && KT_BC_XEM.gts.length===1 && KT_BC_XEM.gts[0].doan.length===1 && !KT_BC_XEM.gts[0].doan[0].cb && KT_BC_XEM.gts[0].doan[0].cv==='Phó Chủ tịch' && (z2.doc.match(/w:leader="dot"/g)||[]).length===4+2+1+12+2+2);
   var ra = {doc:await (async()=>{ const a = new Uint8Array(await F[fn].arrayBuffer()); let s=''; for(let i=0;i<a.length;i++) s+=String.fromCharCode(a[i]); return btoa(s); })()};
   C.che = 'dx'; C.xa=''; C.hoi='';
   return {o, ra}; }, files).catch(e=>({o:['✗ LỖI '+e.message]}));
 const ra = R0.ra, r = R0.o; r.forEach(x=>console.log(x));
 if(process.argv[2] && ra) fs.writeFileSync(path.join(process.argv[2], 't108_m04.docx'), Buffer.from(ra.doc, 'base64'));
 await p.screenshot({path:path.join(__dirname,'t108.png'), fullPage:true});
 await p.setViewportSize({width:390,height:844}); await p.evaluate(()=>{ dongHop(); ktCH().che='bc'; ktVeThe(); }); await p.waitForTimeout(300); await p.screenshot({path:path.join(__dirname,'t108_dt.png'), fullPage:true});
 await p.evaluate(()=>{ ktCH().che='dx'; });
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
