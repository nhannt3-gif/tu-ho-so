// 3.124 — dòng chấm mịn (cỡ ≈ 65%, đủ dài như cũ) cho Word + bản In mọi mẫu KTGS; in 2 mặt khi xuất nhiều bản
//        (Word: ngắt phần sang trang lẻ; In: chèn trang trắng sau bản lẻ trang — đếm trang PDF thật). Bộ GIẢ: tests/gia31.
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
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa); const t = ds[0];
   C.xa = t.xa; ktChonTo(t.ma); await w(200);
   /* 1. dòng chấm mịn — Word */
   const x1 = ktChamMin('<w:r><w:rPr><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">Ông (bà): ……………… Chức vụ</w:t></w:r>');
   ok('Word: đoạn chấm tách run riêng cỡ 18 (65% của 14pt), chữ giữ cỡ 14', /<w:sz w:val="18"\/>[\s\S]*?<w:t xml:space="preserve">…+\.*<\/w:t>/.test(x1) && /<w:sz w:val="28"\/>[\s\S]*?Ông \(bà\): <\/w:t>/.test(x1) && /Chức vụ<\/w:t>/.test(x1), x1.replace(/<[^>]+>/g, '|'));
   const nCham = (x1.match(/<w:sz w:val="18"\/>[\s\S]*?<w:t xml:space="preserve">([…\.]+)<\/w:t>/) || ['', ''])[1], bd = s => (s.match(/…/g)||[]).length*4+(s.match(/\./g)||[]).length;
   ok('Word: thêm chấm theo tỷ lệ — bề dài gần như cũ (không dài hơn)', bd(nCham)*18 <= bd('………………')*28 && bd(nCham)*18 >= bd('………………')*28*0.95, bd(nCham)+' đơn vị chấm');
   ok('Word: run không có chấm / không rPr giữ nguyên; số tiền 1.000.000 không đụng', ktChamMin('<w:r><w:t>1.000.000 đ</w:t></w:r>')==='<w:r><w:t>1.000.000 đ</w:t></w:r>' && /<w:rPr><w:sz w:val="17"\/>/.test(ktChamMin('<w:r><w:t>.........</w:t></w:r>')));
   const g16 = ktGiaTri16(t, ktDaChon(), ktInV('m16')), d16 = await docx(await ktDocx('m16', g16));
   ok('Word Mẫu 16 hợp lệ, có đoạn chấm cỡ nhỏ', hopLe(d16) && /<w:sz w:val="1[4-9]"\/>(?:<w:szCs w:val="\d+"\/>)?(?:(?!<\/w:rPr>)[\s\S])*<\/w:rPr><w:t xml:space="preserve">[…\.]{4,}/.test(d16));
   const g06 = ktGiaTri06(t, ktDaChon(), ktInV('m06')), d06 = await docx(await ktDocx('m06', g06));
   ok('Word Mẫu 06 hợp lệ', hopLe(d06));
   /* 2. bản In: span.kt-cham, CSS cỡ 65% */
   const h16 = ktHTML16(g16);
   ok('bản In Mẫu 16: đoạn chấm bọc .kt-cham (cỡ 65%), CSS không bị đụng', /<span class="kt-cham">[…\.]{4,}<\/span>/.test(h16) && /\.kt-cham\{font-size:65%/.test(h16) && !/<style>[^<]*kt-cham">/.test(h16));
   ok('bản In Mẫu 06 / Phân công cũng có chấm mịn; dòng kẻ chấm mảnh .6pt', /class="kt-cham"/.test(ktHTML06(g06)) && /\.kt-ld\{flex:1;border-bottom:\.6pt dotted/.test(KT_IN_CSS+ktHTML06(g06)));
   const hKH = (()=>{ C.che='kh'; C.khHoi = String(t.dv); C.khNam = 2026; const g = ktKHGiaTri(ktInV('kh')); return ktHTML01(g); })();
   ok('bản In Kế hoạch (đọc từ Word) có đoạn chấm cỡ nhỏ, không bọc 2 lần', !/kt-cham/.test(hKH) || !/kt-cham">[^<]*<span class="kt-cham/.test(hKH));
   C.che='dx';
   ok('3.126: gạch dưới tiêu ngữ / tên cơ quan mảnh 0,5 pt (Word + bản In)', !/a:ln w=\\?"(9525|9360)\\?"><a:solidFill><a:srgbClr val=\\?"000000/.test(d06) && /a:ln w="6350"><a:solidFill><a:srgbClr val="000000"/.test(d06) && /\.kt-gach\{border-top:\.5pt solid/.test(ktHTML16(g16)));
   /* 3.127: ô chọn vai trò kèm tên đã khai */
   const kH = ktHoiKhoa(t), kbCu = D.cauHinh.ktHoiKB; D.cauHinh.ktHoiKB = {}; D.cauHinh.ktHoiKB[kH] = {ct:'Nguyễn Văn Chủ', pct:'Trần Thị Phó', uv2:'Lê Văn Ủy'};
   ktInHop(['m16', 'kh'], '', ktHoiCuaTo([t])); await w(50);
   const opt = id => [...document.querySelectorAll('#'+id+' option')].map(x=>x.value+'='+x.textContent);
   const o1 = opt('ki-m16-ng1'), oK = opt('ki-kh-ky'), cC = ktChuan(t);
   ok('3.127: hộp chọn khi in — vai trò kèm tên đã khai', o1.indexOf('pct='+cC.pho+' — Trần Thị Phó')>=0 && o1.indexOf('ct='+cC.ky+' — Nguyễn Văn Chủ')>=0 && o1.some(x=>/^uv2=.*Lê Văn Ủy/.test(x)), o1.join(' | '));
   ok('3.127: ô chưa khai ẩn (Phó 2, Ủy viên 1…), giữ "Để trống"; người ký KH cũng kèm tên', !o1.some(x=>/^pct2=|^uv1=/.test(x)) && o1.some(x=>/^=Để trống/.test(x)) && oK.indexOf('ct='+cC.ky+' — Nguyễn Văn Chủ')>=0, oK.join(' | '));
   dongHop(); D.cauHinh.ktHoiKB = kbCu;
   /* 3. in 2 mặt */
   ok('mặc định bật in 2 mặt', ktHaiMat()===true);
   ktInHop(['m06']); await w(50); const cb = document.querySelector('.kt-hai-mat input');
   ok('hộp chọn khi in có ô "In 2 mặt", đang tích', cb && cb.checked);
   cb.checked = false; cb.dispatchEvent(new Event('change')); ok('bỏ tích → nhớ (đồng bộ Drive)', D.cauHinh.ktHaiMat===0 && !ktHaiMat() && !chRieng('ktHaiMat'));
   const dTat = await docx(await ktDocx('m06', [g06, g06]));
   ok('tắt: Word nhiều bản ngắt phần thường (3.128: mỗi bản đánh số trang riêng), không sang trang lẻ', !/oddPage/.test(dTat) && (dTat.match(/<w:sectPr/g)||[]).length===2 && /<w:pgNumType w:start="1"\/>/.test(dTat));
   cb.checked = true; cb.dispatchEvent(new Event('change')); dongHop();
   const dBat = await docx(await ktDocx('m06', [g06, g06, g06]));
   ok('bật: Word 3 bản → 3 phần "sang trang lẻ" (2 giữa + cuối), hợp lệ', (dBat.match(/<w:type w:val="oddPage"\/>/g)||[]).length===3 && hopLe(dBat) && !/<w:br w:type="page"\/>/.test(dBat.split('<w:body>')[1].split('<w:sectPr')[0].replace(/<w:tbl>[\s\S]*?<\/w:tbl>/g, '')));
   const d04 = await docx(await ktDocx('m04', ktBC04(ktBCDs().slice(0, 2).map(r=>({t:r.t, ngay:''}))).concat(ktBC04(ktBCDs().slice(0, 1).map(r=>({t:r.t, ngay:''}))))));
   ok('Mẫu 04 (khuôn có sẵn nextPage) → thay bằng oddPage, không trùng w:type', hopLe(d04) && !/nextPage/.test(d04) && /oddPage/.test(d04));
   /* bản In: dựng 06 với số hộ khác nhau để có bản 1 trang / 2 trang */
   const r0 = g06.rows.find(r=>r.gop!=='tiep') || g06.rows[0];
   const dung = k => Object.assign({}, g06, {rows:Array.from({length:k}, (_, i)=>Object.assign({}, r0, {R1:String(i+1), R2:'Khách Giả '+(i+1), gop:'', n:1}))});
   window.__mot = [1, 4, 1, 6, 2].map(k=>inChuan(ktHTML06(dung(k))));   /* 3.128: qua bộ in chuẩn (app tự chia trang, tự chèn trang trắng) */
   window.__ghep = inChuan(ktHTML06([1, 4, 1, 6, 2].map(dung)));
   ok('bản In nhiều phiếu: bỏ đoạn ước lượng cũ, bộ in chuẩn lo trang trắng (3.128)', !/kt-trang-trang\{/.test(ktHTML06([1, 2].map(dung))) && /TR_XONG/.test(window.__ghep));
   return o;
 }, files);
 /* đếm trang PDF thật: từng bản riêng → làm tròn lên số chẵn; bản ghép phải = tổng (trừ trang trắng cuối không cần) */
 const dem = async h => { const q = await b.newPage(); await q.setContent(h); for(let i=0;i<60 && !(await q.evaluate(()=>window.TR_XONG));i++) await q.waitForTimeout(100); const pdf = await q.pdf({preferCSSPageSize:true}); await q.close(); return p.evaluate(async a=>(await PDFLib.PDFDocument.load(new Uint8Array(a))).getPageCount(), Array.from(pdf)); };
 const mot = await p.evaluate(()=>window.__mot), so = []; for(const h of mot) so.push(await dem(h));
 const ky = so.reduce((a, n, i)=>a+(i<so.length-1 ? n+(n%2) : n), 0), thuc = await dem(await p.evaluate(()=>window.__ghep));
 R.push((thuc===ky ? '✓ ' : '✗ ')+'In 2 mặt (PDF thật): từng bản '+JSON.stringify(so)+' trang → bản ghép '+thuc+' trang (mong đợi '+ky+'), mỗi bản bắt đầu trang lẻ');
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
