// 3.138 — In ấn: Mẫu 06 (chấm nhạt, kẻ dòng hộ mảnh, tiêu đề cỡ 11, ngày lên dòng chấm Biện pháp, chỗ ký, mẫu trắng 3 cột chữ bằng nhau, số trang PDF thật),
//        Mẫu 04 (kiến nghị tùy chọn, bảng không tràn lề, Trưởng đoàn cùng điểm canh, gạch tên đơn vị), Kế hoạch (gạch theo chữ, bỏ hình đường thẳng cố định).
// Bộ GIẢ: tests/gia31.
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
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.che='gn'; C.xa=''; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(500);
   for(let i=0;i<60 && !KT_GN;i++) await w(250); await w(300);
   /* Mẫu 06 có số liệu, 1 hộ */
   const ch = ktGNChon(), p1 = ch.find(x=>x.mon.length===1); KT_GN_BO = {}; ch.forEach(x=>{ if(x!==p1) x.mon.forEach(m=>{ KT_GN_BO[x.th+'|'+m.ku] = 1; }); }); KT_KB = {dv:'PGD Giả'};
   const g1 = ktGNGiaTri(KT_KB)[0], x1 = await docx(await ktDocx('m06', g1));
   ok('Mẫu 06 Word hợp lệ, hết dấu {{', hopLe(x1) && !/\{\{/.test(x1));
   ok('chấm nhạt: run chấm / tab chấm màu xám, không đậm', /<w:r><w:rPr>(?:(?!<\/w:rPr>).)*<w:color w:val="808080"\/><\/w:rPr><w:t xml:space="preserve">[.…]{4,}/.test(x1) && !/<w:b\/>(?:(?!<\/w:rPr>).)*<w:color w:val="808080"\/>/.test(x1));
   ok('kẻ dòng hộ mảnh xám (sz 2, A6A6A6)', /<w:bottom w:val="single" w:sz="2" w:space="0" w:color="A6A6A6"\/>/.test(x1));
   const iB = x1.indexOf('Biện pháp xử lý:'), iN = x1.indexOf('Ngày ', iB), iK = x1.indexOf('CÁN BỘ KIỂM TRA');
   ok('ngày ký nằm trên dòng chấm thứ 2 của Biện pháp (trước khối ký), có tab giữa 11805', iB>0 && iN>iB && iN<iK && /<w:tab w:val="center" w:pos="11805"\/>/.test(x1) && (x1.match(/Ngày /g)||[]).length===1);
   ok('tiêu đề cột cỡ 11 (không còn cỡ 12 trong bảng hộ), bỏ phông "Times New Roman Bold"', !/Times New Roman Bold/.test(x1.slice(x1.indexOf('PHẦN GHI THEO'))) && !/<w:sz w:val="24"\/>/.test(x1.slice(x1.indexOf('PHẦN GHI THEO'), x1.indexOf('Cộng'))));
   /* mẫu trắng */
   const xt = await docx(await ktDocx('m06', ktTrang06GT('mot')));
   ok('mẫu trắng: lưới Họ tên = Mục đích = Vào việc (1953/1952/1953), cột tiền giữ 737', /<w:gridCol w:w="397"\/><w:gridCol w:w="1953"\/><w:gridCol w:w="1020"\/><w:gridCol w:w="1134"\/><w:gridCol w:w="737"\/><w:gridCol w:w="737"\/><w:gridCol w:w="1952"\/><w:gridCol w:w="737"\/><w:gridCol w:w="737"\/><w:gridCol w:w="1953"\/>/.test(xt));
   ok('mẫu trắng: chừa dòng ký (đoạn trống sau "(Ký, ghi rõ họ tên)")', /\(Ký, ghi rõ họ tên\)<\/w:t><\/w:r><\/w:p><w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="2[68]0"/.test(xt));
   const h1 = ktHTML06(g1), ht = ktHTML06(ktTrang06GT('mot'));
   ok('bản In: nét 0,5 pt, dòng hộ kẻ xám, dòng chấm 2 có ngày', /\.kt-bg th,\.kt-bg td\{border:\.5pt solid #000/.test(h1) && /border-top:\.4pt solid #a6a6a6/.test(h1) && /class="kt-nx2"><i class="kt-ld"[^>]*><\/i><span>Ngày/.test(h1));
   ok('bản In mẫu trắng: 3 cột chữ 12,33% + chỗ ký', (ht.match(/width:12\.3[34]%/g)||[]).length===3 && /height:40pt/.test(ht));
   window.__h = [inChuan(h1), inChuan(ht), inChuan(ktHTML06(ktTrang06GT('hai')))];
   /* Mẫu 04 */
   C.che='bc'; const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99'); C.xa = ds[0].xa; KT_BC_CHON = {}; ktDoiCheDo('bc'); await w(400); ktBCTich(ktBCDs()[0].t.ma, true); await w(100);
   delete D.cauHinh.ktKN04; let gts = ktBCGiaTri(); gts.forEach(g=>{ g.f.TD04 = 'Trưởng Đoàn Giả'; });
   let x4 = await docx(await ktDocx('m04', gts)), h4 = ktHTML04(gts);
   ok('Mẫu 04 Word hợp lệ; không còn phông "Times New Roman Bold"', hopLe(x4) && !/\{\{/.test(x4) && !/Times New Roman Bold/.test(x4));
   ok('Trưởng đoàn: chức danh và tên cùng tab giữa 6900', (x4.match(/<w:tab w:val="center" w:pos="6900"\/>/g)||[]).length===2 && /<w:tab\/><\/w:r><w:r><w:rPr>(?:(?!<\/w:rPr>).)*<\/w:rPr><w:t>TRƯỞNG ĐOÀN KIỂM TRA<\/w:t>/.test(x4));
   ok('gạch dưới tên đơn vị (đoạn viền dưới, thụt 2 bên) trước Quốc hiệu', /<w:pBdr><w:bottom w:val="single" w:sz="6"[^>]*\/><\/w:pBdr>(?:(?!<\/w:p>).)*<w:ind w:left="\d+" w:right="\d+"/.test(x4.slice(0, x4.indexOf('CỘNG HO'))));
   const sauKN = s => { const i = x4.indexOf(s); return x4.slice(i, x4.indexOf('</w:p>', x4.indexOf('</w:p>', i)+6)+6); };
   ok('kiến nghị mặc định: 2d, 2đ, 3a, 3b mỗi mục 1 dòng chấm (không có câu gợi ý)', !/Tiếp tục phối hợp với Hội cấp xã/.test(x4) && !/tạo điều kiện thuận lợi cho tổ viên/.test(x4) && /leader="dot"/.test(sauKN('d) Đối với NHCSXH')));
   ok('bản In 04: bảng 97,3% (không tràn lề phải), có gạch tên đơn vị', /\.kt-bg\{width:97\.3%;margin-left:2\.7%/.test(h4) && /<\/p><div class="kt-gach" style="width:[\d.]+mm"><\/div><\/td>/.test(h4));
   C.to = ''; ktInHop(['m04'], '', ktHoiDs()); await w(150);
   ok('hộp Chọn khi in (Mẫu 04) có 4 ô tích kiến nghị, mặc định không tích', document.querySelectorAll('.kt-kn04 input[type=checkbox]').length===4 && ![...document.querySelectorAll('.kt-kn04 input')].some(i=>i.checked));
   ktKN04Doi('d', true); ktKN04Doi('a3', true); await w(100); ktKN04Chu('a3', 'Đề nghị giả sửa tay cho tổ viên.'); await w(50);
   ok('tích 2d → hiện ô chữ câu gợi ý; sửa 3a → nhớ', !!document.querySelector('.kt-kn04 textarea') && D.cauHinh.ktKN04.a3.chu==='Đề nghị giả sửa tay cho tổ viên.' && D.cauHinh.ktKN04.d.bat===1);
   gts = ktBCGiaTri(); x4 = await docx(await ktDocx('m04', gts)); h4 = ktHTML04(gts);
   ok('Word + In: 2d in câu gợi ý, 3a in câu đã sửa, 2đ / 3b vẫn 1 dòng chấm', /Tiếp tục phối hợp với Hội cấp xã tập huấn nghiệp vụ/.test(x4) && /Đề nghị giả sửa tay cho tổ viên\./.test(x4) && !/tạo điều kiện để Hội cấp xã hoàn thành/.test(x4) && /Tiếp tục phối hợp với Hội cấp xã/.test(h4) && /Đề nghị giả sửa tay/.test(h4) && hopLe(x4));
   ktKN04Chu('a3', '', 1); ok('↺ về câu gợi ý: bỏ câu đã sửa', !D.cauHinh.ktKN04.a3.chu); dongHop(); delete D.cauHinh.ktKN04;
   /* Kế hoạch */
   const dmK = {}; Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99').forEach(x=>{ const kk = x.xa+'|'+x.dv; dmK[kk] = (dmK[kk]||0)+1; });
   const [xa, dv] = Object.keys(dmK).sort((a, b2)=>dmK[b2]-dmK[a])[0].split('|'); C.che='kh'; C.xa=xa; C.hoi=''; C.khHoi=dv; ktVeThe(); await w(300);
   const gK = ktKHGiaTri(ktInV('kh'));
   for(const m of ['m01', 'm01b']){ gK.mau = m; const xk = await docx(await ktDocx(m, gK)), dau = xk.slice(0, xk.indexOf('</w:tbl>')), hk = ktHTML01(gK);
     ok('Kế hoạch '+m+': hợp lệ; đầu trang không còn hình đường thẳng; 2 gạch theo chữ (tên cơ quan, Tiêu ngữ)', hopLe(xk) && !/<w:drawing>/.test(dau) && (dau.match(/<w:pBdr><w:bottom /g)||[]).length===2);
     const L = [...dau.matchAll(/<w:ind w:left="(\d+)" w:right="(\d+)"/g)].map(a=>[+a[1], +a[2]]);
     ok('Kế hoạch '+m+': gạch cân giữa (thụt trái = phải), gạch tên cơ quan ngắn hơn gạch Tiêu ngữ', L.length===2 && L.every(a=>a[0]===a[1]) && L[0][0]>L[1][0], JSON.stringify(L));
     ok('Kế hoạch '+m+' bản In: có 2 gạch', (hk.match(/border-top:\.6pt solid #000;margin:1\.5pt/g)||[]).length===2); }
   return o; }, files);
 const dem = async h => { const q = await b.newPage(); await q.setContent(h); for(let i=0;i<60 && !(await q.evaluate(()=>window.TR_XONG));i++) await q.waitForTimeout(100);
   const so = await q.evaluate(()=>window.TR_SO); await q.close(); return so; };
 const H = await p.evaluate(()=>window.__h), n1 = await dem(H[0]), n2 = await dem(H[1]), n3 = await dem(H[2]);
 R.push((n1===1 ? '✓ ' : '✗ ')+'bản In Mẫu 06 phiếu 1 hộ: 1 trang — '+n1);
 R.push((n2===1 ? '✓ ' : '✗ ')+'bản In mẫu trắng 1 mặt: 1 trang — '+n2);
 R.push((n3===2 ? '✓ ' : '✗ ')+'bản In mẫu trắng 2 mặt: 2 trang — '+n3);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0, 5));
 console.log((R.filter(x=>x[0]==='✓').length)+'/'+R.length+' đạt'); await b.close(); })();
