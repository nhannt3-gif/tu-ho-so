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
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   ok('có nút chế độ 📋 Mẫu 04', /Báo cáo tổng hợp · Mẫu 04/.test(document.querySelector('.kt-che').textContent));
   const ds = Object.keys(KT_K.to).map(m=>KT_K.to[m]).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99');
   const A = ds[0], A2 = ds.find(t=>t.xa===A.xa && String(t.dv)===String(A.dv) && t.ma!==A.ma), B = ds.find(t=>ktHoiKhoa(t)!==ktHoiKhoa(A));
   /* lập Biên bản 16 qua đường thật (ghi nhật ký) */
   ktChonTo(A.ma); await w(300); KT_KB = {ngay:'2026-09-05'}; ktKhaiBao('m16'); await w(50); ktXuat('m16', 'word'); await w(600);
   ok('xuất Biên bản 16 → ghi nhật ký tổ (ktgsNK)', ((D.cauHinh.ktgsNK||{})[A.ma]||[]).some(x=>x.mau==='16' && x.ngay==='2026-09-05'));
   ktKhaiBao('m06'); await w(50); ktXuat('m06', 'in'); await w(300);
   ok('xuất Mẫu 06 đột xuất → lịch sử ktgsLS', ((D.cauHinh.ktgsLS||{})[A.ma]||[]).some(x=>x.ngay==='2026-09-05'));
   ktGhiNK(A2, '16', '2026-09-12'); ktGhiNK(B, '06gn', '2026-09-20', '2026-08'); ktGhiNK(B, '06gn', '2026-09-20', '2026-08'); ktGhiNK(ds[5], '16', '2026-08-30');
   ok('nhật ký không trùng (cùng tổ, mẫu, ngày, tháng GN)', D.cauHinh.ktgsNK[B.ma].length===1);
   /* màn Mẫu 04 */
   C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.bcTh = '2026-09'; KT_BC_CHON = {}; KT_BC_NGAY = {}; ktDoiCheDo('bc'); await w(300);
   const hang = () => [...document.querySelectorAll('#kt-the .kt-bc-bang tbody tr')].filter(tr=>tr.querySelector('input[type=checkbox]'));
   ok('tháng 09/2026: 3 tổ có phiếu, tích sẵn (không lấy tổ tháng khác)', hang().length===3 && hang().every(tr=>tr.querySelector('input[type=checkbox]').checked), hang().length+' tổ');
   ok('ngày kiểm tra theo lịch sử, cột phiếu 06 + Biên bản 16', ktBCDs().find(r=>r.t.ma===A.ma).ngay==='2026-09-05' && ktBCNguon('2026-09')[A.ma].p06===1 && ktBCNguon('2026-09')[A.ma].bb16 && ktBCNguon('2026-09')[B.ma].pgn===1);
   ok('cảnh báo tổ chưa thấy Biên bản 16 (727: Mẫu 04 chỉ khi kiểm tra hoạt động Tổ)', /1 tổ chưa thấy Biên bản 16/.test(document.getElementById('kt-the').textContent));
   ok('mỗi Hội – xã 1 báo cáo', ktBCNhom(ktBCDs()).length===2 && /→ 2 báo cáo/.test(document.getElementById('kt-the').textContent));
   /* thêm tổ trong phạm vi */
   C.xa = A.xa; C.hoi = String(A.dv); pvVeCay('kt'); await w(300);
   const them = ds.find(t=>t.xa===A.xa && String(t.dv)===String(A.dv) && t.ma!==A.ma && t.ma!==A2.ma && pvLoc(C, t));
   ok('chọn phạm vi → hiện thêm tổ chưa có phiếu (chưa tích)', !!them && /Tổ khác trong phạm vi/.test(document.getElementById('kt-the').textContent) && ktBCDs().find(r=>r.t.ma===them.ma).chon===false);
   ktBCTich(them.ma, true); ktBCNgay(them.ma, '2026-09-18'); await w(100);
   ok('tích thêm tổ + sửa ngày', ktBCDs().find(r=>r.t.ma===them.ma).chon && ktBCDs().find(r=>r.t.ma===them.ma).ngay==='2026-09-18');
   ok('phạm vi xã/hội → chỉ tổ trong phạm vi (tổ Hội khác ẩn)', !ktBCDs().some(r=>r.t.ma===B.ma) && ktBCNhom(ktBCDs()).length===1);
   C.xa=''; C.diem=''; C.hoi=''; C.to=''; pvVeCay('kt'); await w(300);
   ok('về Toàn PGD: tổ có phiếu + tổ đã tích thêm vẫn giữ', ktBCDs().some(r=>r.t.ma===B.ma) && ktBCDs().find(r=>r.t.ma===them.ma).chon && ktBCNhom(ktBCDs()).length===2);
   C.xa = A.xa; C.hoi = String(A.dv); pvVeCay('kt'); await w(200);
   /* khai báo Hội */
   ktHoiKBHop(); await w(150); ok('⚙ Khai báo Hội: lọc theo xã đã chọn, đủ ô', document.querySelectorAll('.kt-hkb').length===ktHoiDs().length && ktHoiDs().every(x=>x.t.xa===A.xa) && document.querySelectorAll('.kt-hkb textarea').length===ktHoiDs().length);
   const kA = ktHoiKhoa(A); ktHoiKBSua(kA, 'doan', 'Ông Giả Văn Một – Chủ tịch Hội, Trưởng đoàn\n  \nBà Giả Thị Hai – Phó Chủ tịch'); ktHoiKBSua(kA, 'hd', ' 12/HĐUT '); dongHop();
   ok('lưu khai báo (bỏ dòng trống, gọn khoảng trắng)', D.cauHinh.ktHoiKB[kA].doan.split('\n').length===2 && D.cauHinh.ktHoiKB[kA].hd==='12/HĐUT');
   ok('tên đơn vị tự sinh Hội … xã …', /^(Hội|Đoàn)/.test(ktHoiTen(A)) && /(xã|phường) /i.test(ktHoiTen(A)), ktHoiTen(A));
   /* xem + Word */
   C.xa=''; C.diem=''; C.hoi=''; C.to=''; ktVeThe(); await w(200); ktBCXem(); await w(400);
   const G = KT_BC_XEM.gts, gA = G.find(g=>g.k===kA);
   ok('👁 xem trước: 2 báo cáo, Hội A có 3 tổ', !!document.getElementById('kt-bc-khung') && G.length===2 && gA.rows.length===3, G.map(g=>g.ten+':'+g.rows.length).join(' · '));
   ok('dòng mục II: ngày · Tổ TK&VV … · Tây Ninh, xã, ấp', gA.rows[0].C2==='05/09/2026' && gA.rows[0].C3.indexOf('Tổ TK&VV '+A.ten)===0 && /^Tây Ninh, (xã|phường) /i.test(gA.rows[0].C4), JSON.stringify(gA.rows[0]));
   ok('VI.1: số phiếu Mẫu 06 theo lịch sử (Hội A: 1 · Hội B: 1)', gA.f.SP===' 01' && G.find(g=>g.k!==kA).f.SP===' 01');
   ktBCIn('word'); await w(1200);
   const fn = Object.keys(F).find(n=>/Mau 04/.test(n)); const z = await moZip(F[fn]); const doc = z.doc, chu = doc.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   ok('Word: XML hợp lệ, hết dấu {{', hopLe(doc) && doc.indexOf('{{')<0, fn);
   ok('Word: bỏ khung MẪU THAM KHẢO, giữ Mẫu số 04/BC-TH + đường kẻ', doc.indexOf('MẪU THAM KHẢO')<0 && /Mẫu số 04\/BC/.test(chu) && /prst="line"/.test(doc));
   ok('Word: 2 báo cáo, ngắt trang, id hình không trùng', (doc.match(/w:type="page"/g)||[]).length===1 && (chu.match(/BÁO CÁO TỔNG HỢP/g)||[]).length===2 && (()=>{ const ids = doc.match(/<wp:docPr id="\d+"/g)||[]; return new Set(ids).size===ids.length; })());
   ok('Word: đơn vị in hoa + đoàn kiểm tra khai báo', chu.indexOf(ktHoiTen(A).toUpperCase())>=0 && chu.indexOf('Ông Giả Văn Một – Chủ tịch Hội, Trưởng đoàn')>=0);
   ok('Word: dòng chấm ghi tay (tab dẫn chấm): I.1 đủ 4 dòng, I.2 2, III 4, mỗi mục IV 3', (doc.match(/w:leader="dot"/g)||[]).length===(2+2+4+30)+(4+2+4+30), (doc.match(/w:leader="dot"/g)||[]).length+' dòng');
   ok('Word: bảng mục II lặp tiêu đề, dòng tổ không cắt', (doc.match(/<w:tblHeader\/>/g)||[]).length===2 && chu.indexOf('Tổ TK&VV '+them.ten)>=0);
   ok('Word: khối VI + Nơi nhận + Trưởng đoàn đi liền', /keepNext/.test(doc) && /TRƯỞNG ĐOÀN KIỂM TRA/.test(chu) && /:01phiếu/.test(chu.replace(/\s/g, '')));
   ok('Word: đủ phần (styles, header, theme…)', ['word/styles.xml','word/settings.xml','word/header1.xml','word/theme/theme1.xml','word/footnotes.xml'].every(n=>XLSX.CFB.find(z.z, n) || XLSX.CFB.find(z.z, '/'+n)));
   ktBCXem(); await w(200); ktBCIn('in'); await w(300);
   const hh = await H[Object.keys(H).find(n=>/Mau 04/.test(n))].text();
   ok('In / PDF: A4 dọc, 2 báo cáo trang mới, có bảng + dòng chấm', /size:A4;/.test(hh) && (hh.match(/break-before:page/g)||[]).length===1 && /kt-ch/.test(hh) && hh.indexOf(A.ten)>=0);
   /* 1 tổ không khai báo Hội → giữ dòng chấm */
   KT_BC_CHON = {}; KT_BC_NGAY = {}; KT_BC_CHON[A.ma] = false; KT_BC_CHON[A2.ma] = false; KT_BC_CHON[them.ma] = false; ktVeThe(); ktBCXem(); await w(200); ktBCIn('word'); await w(900);
   const fn2 = Object.keys(F).filter(n=>/Mau 04/.test(n)).pop(); const z2 = await moZip(F[fn2]);
   ok('Hội chưa khai báo: đơn vị tự sinh, Đoàn kiểm tra 4 dòng chấm', hopLe(z2.doc) && KT_BC_XEM.gts.length===1 && KT_BC_XEM.gts[0].doan.length===0 && (z2.doc.match(/w:leader="dot"/g)||[]).length===4+2+4+30);
   var ra = {doc:await (async()=>{ const a = new Uint8Array(await F[fn].arrayBuffer()); let s=''; for(let i=0;i<a.length;i++) s+=String.fromCharCode(a[i]); return btoa(s); })()};
   C.che = 'dx'; C.xa=''; C.hoi='';
   return {o, ra}; }, files).catch(e=>({o:['✗ LỖI '+e.message]}));
 const ra = R0.ra, r = R0.o; r.forEach(x=>console.log(x));
 if(process.argv[2] && ra) fs.writeFileSync(path.join(process.argv[2], 't108_m04.docx'), Buffer.from(ra.doc, 'base64'));
 await p.screenshot({path:path.join(__dirname,'t108.png'), fullPage:true});
 await p.setViewportSize({width:390,height:844}); await p.evaluate(()=>{ dongHop(); ktCH().che='bc'; ktVeThe(); }); await p.waitForTimeout(300); await p.screenshot({path:path.join(__dirname,'t108_dt.png'), fullPage:true});
 await p.evaluate(()=>{ ktCH().che='dx'; });
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
