// 3.117 — Mẫu 06 phân trang: 1–3 hộ gọn 1 mặt; nhiều hộ thì không cắt đôi hộ, hộ cuối đi cùng dòng Cộng + nhận xét + ký;
//        Thông báo phân công nhiệm vụ Ban Thường vụ (Hội / Đoàn): nội dung theo khai báo, chia ấp, kế toán / thủ quỹ, Word hợp lệ, bản In.
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
   const chu = x => x.replace(/<w:tab\/>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa); const t = ds[0];
   C.xa = t.xa; ktChonTo(t.ma); await w(200);
   /* 1. Mẫu 06: dựng 1 → 6 hộ (hộ thứ 2 có 2 khế ước) */
   const g0 = ktGiaTri06(t, ktDaChon(), ktInV('m06')), r0 = g0.rows.find(r=>r.gop!=='tiep') || g0.rows[0];
   const mot = (i, n) => { const a = Object.assign({}, r0, {R1:String(i), R2:'Khách Giả '+i}); if(n<2) return [Object.assign(a, {gop:'', n:1})]; return [Object.assign(a, {gop:'dau', n:n})].concat(Array.from({length:n-1}, ()=>Object.assign({}, r0, {R1:'', R2:'', gop:'tiep'}))); };
   const dung = (k, hai) => { const rows = []; for(let i=1;i<=k;i++) rows.push.apply(rows, mot(i, i===2 && hai!==0 ? 2 : 1)); return Object.assign({}, g0, {rows:rows}); };
   const d6 = await docx(await ktDocx('m06', dung(4)));
   ok('Word 06 hợp lệ; lề trên / dưới 567 (1 cm)', hopLe(d6) && /<w:pgMar w:top="567"[^>]*w:bottom="567"/.test(d6.match(/<w:pgMar [^>]*>/)[0].replace(/w:right="\d+" /, '')) || /w:top="567"/.test(d6) && /w:bottom="567"/.test(d6));
   const tr = d6.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g).filter(x=>/w:val="567" w:hRule="atLeast"/.test(x)), giu = x => /<w:keepNext\/>/.test(x);
   ok('Word 06: dòng đầu hộ nhiều khế ước giữ với dòng sau (không cắt đôi hộ)', tr.length===5 && giu(tr[1]) && !giu(tr[0]) && !giu(tr[2]), tr.map(x=>giu(x)?1:0).join(''));
   ok('Word 06: hộ cuối giữ với dòng Cộng + nhận xét + ký', giu(tr[4]));
   window.__in06 = {}; [1,2,3,4,6].forEach(k=>{ window.__in06[k] = ktHTML06(dung(k, 0)); }); window.__in06['2b'] = ktHTML06(dung(2)); window.__in06['3b'] = ktHTML06(dung(3));
   const h4 = ktHTML06(dung(4));
   ok('bản In 06: mỗi hộ (trừ hộ cuối) 1 khối không cắt; hộ cuối cùng khối Cộng', (h4.match(/<tbody class="kt-ho">/g)||[]).length===3 && /\.kt-ho\{break-inside:avoid/.test(h4) && /<tbody class="kt-giu">[\s\S]*Khách Giả 4[\s\S]*Cộng/.test(h4));
   /* 2. Phân công Ban Thường vụ */
   const k = ktHoiKhoa(t); D.cauHinh.ktHoiKB = D.cauHinh.ktHoiKB || {};
   D.cauHinh.ktHoiKB[k] = {ten:'', ct:'Nguyễn Văn Chủ', pct:'Trần Thị Phó', pct2:'Lê Văn Phó Hai', nk:'2023 - 2028', uv1:'Phạm Thị Ủy', uv2:'Võ Văn Viên', hd:'05', hdNgay:'15/3/2024'};
   ktPCHop(k); await w(150);
   const hop = document.getElementById('hop-in'), ap = ktPCAp(k);
   ok('hộp phân công: 1 dòng / người (CT + 2 Phó + 2 ủy viên), ô ấp theo tổ của Hội', hop.querySelectorAll('.kt-pc-bang tbody tr').length===5 && hop.querySelectorAll('.kt-pc-bang tbody tr')[1].querySelectorAll('.kt-pc-chip').length===ap.length && ap.length>0, ap.join(' | '));
   ktPCChiaDeu(k); await w(100); const x = ktPCLay(k).p;
   ok('gợi ý chia đều: hết ấp, không trùng, Chủ tịch không nhận ấp', ['pct','pct2','uv1','uv2'].reduce((s,v)=>s+(x[v].ap||[]).length, 0)===ap.length && !(x.ct && x.ct.ap && x.ct.ap.length));
   ktPCDoi(k, 'uv1', 'tq', 0, true); ktPCDoi(k, 'pct2', 'kt', 0, true);
   const g = ktPCNoiDung(k), noi = g.khoi.map(y=>y.s).join('\n'), c = ktChuan(t), ten = ktHoiTenTD(t);
   ok('đầu văn bản Hội: tên đơn vị / BAN THƯỜNG VỤ / Số …/TB-BTV + quốc hiệu', g.dau.a2==='BAN THƯỜNG VỤ' && /TB-BTV/.test(g.dau.so) && /CỘNG HÒA/.test(g.dau.b1) && /Độc lập/.test(g.dau.b2));
   ok('căn cứ: Điều lệ, HĐUT số + ngày dài, Quy chế nhiệm kỳ', /Căn cứ Điều lệ /.test(noi) && /05\/HĐUT, ngày 15 tháng 03 năm 2024/.test(noi) && /nhiệm kỳ 2023 - 2028/.test(noi));
   ok('mỗi người: "Đồng chí … , chức vụ + tên Hội"', ['1. Đồng chí Nguyễn Văn Chủ, '+c.ky+' '+ten+':', '2. Đồng chí Trần Thị Phó, '+c.pho+' '+ten, '4. Đồng chí Phạm Thị Ủy, '+c.uv+' '+ten].every(s=>noi.indexOf(s)>=0));
   ok('ấp đã chia ghi vào nhiệm vụ kiểm tra của từng người', x.pct.ap.every(a=>noi.indexOf(a)>=0) && !/\{[a-zA-Z]+\}/.test(noi));
   ok('kế toán / thủ quỹ chỉ ghi cho người được tích', (noi.match(/Phụ trách kế toán/g)||[]).length===1 && (noi.match(/Làm cán bộ thủ quỹ/g)||[]).length===1 && noi.indexOf('Làm cán bộ thủ quỹ')>noi.indexOf('Đồng chí Phạm Thị Ủy'));
   ok('ký (3.123 anh chốt): TM. BAN THƯỜNG VỤ / CHỦ TỊCH, mặc định để trống tên', g.ky.tm==='TM. BAN THƯỜNG VỤ' && g.ky.cv===c.ky.toUpperCase() && g.ky.ten==='');
   ktPCDoiKy(k, 'ct'); const gK = ktPCNoiDung(k); ktPCDoiKy(k, ''); dongHop();
   ok('chọn người ký = Chủ tịch → in tên Chủ tịch', gK.ky.cv===c.ky.toUpperCase() && gK.ky.ten==='Nguyễn Văn Chủ');
   ktPCLay(k).p.uv2.ap = []; const g2 = ktPCNoiDung(k);
   ok('người chưa tích ấp → "các ấp / khu phố do Hội quản lý"', g2.khoi.map(y=>y.s).join('\n').indexOf('các '+c.ap+' do '+ten+' quản lý')>=0);
   const dpc = await docx(await ktDocx('pc', g)); const cpc = chu(dpc);
   ok('Word phân công hợp lệ, đủ nội dung', hopLe(dpc) && cpc.indexOf('THÔNG BÁO')>=0 && cpc.indexOf('Đồng chí Võ Văn Viên')>=0 && cpc.indexOf('Nơi nhận:')>=0 && cpc.indexOf('{{')<0);
   const hpc = ktHTMLPC(g); window.__inPC = hpc;
   ok('bản In phân công: đầu, tiêu đề, ký', /THÔNG BÁO/.test(hpc) && hpc.indexOf('TM. BAN THƯỜNG VỤ')>0 && hpc.indexOf(c.ky.toUpperCase()+'</p>')>0 && hpc.indexOf('Nguyễn Văn Chủ</p></td>')<0);   /* 3.123: mặc định không in tên người ký */
   /* Đoàn */
   const td = ds.find(y=>String(y.dv)==='14');
   if(td){ const kd = ktHoiKhoa(td); D.cauHinh.ktHoiKB[kd] = {ct:'Bí Thư Giả', pct:'Phó Bí Giả'}; const gd = ktPCNoiDung(kd);
     ok('Đoàn: BCH ĐOÀN …, Số -TB/ĐTN, ĐOÀN TNCS HỒ CHÍ MINH, ký BÍ THƯ', /^BCH ĐOÀN /.test(gd.dau.a2) && /TB\/ĐTN/.test(gd.dau.so) && gd.dau.b1==='ĐOÀN TNCS HỒ CHÍ MINH' && gd.ky.cv==='BÍ THƯ' && /Điều lệ Đoàn TNCS/.test(gd.khoi[0].s)); }
   else ok('Đoàn: bộ giả không có tổ Đoàn — bỏ qua', true);
   ok('thẻ Hội: ô Phó CT 2, 3 + nhiệm kỳ + nút phân công', KT_HKB_O.map(y=>y[0]).join(',').indexOf('pct,pct2,pct3,nk')>=0);
   dongHop(); C.che='dx'; C.xa=''; C.to='';
   return o;
 }, files);
 /* 3. số trang khi in (Chromium → PDF) */
 const so = {};
 for(const k of [1,2,3,4,6,'2b','3b']){ const h = await p.evaluate(k=>window.__in06[k], k); const q = await b.newPage(); await q.setContent(h); const pdf = await q.pdf({preferCSSPageSize:true}); await q.close();
   so[k] = await p.evaluate(async a=>(await PDFLib.PDFDocument.load(new Uint8Array(a))).getPageCount(), Array.from(pdf)); }
 R.push((so[1]===1 && so[2]===1 && so[3]===1 && so['2b']===1 ? '✓ ' : '✗ ')+'In 06: 1, 2, 3 hộ (tối đa 3 dòng khế ước) gọn 1 mặt — '+JSON.stringify(so));
 R.push((so['3b']===2 ? '✓ ' : '✗ ')+'In 06: 3 hộ / 4 dòng khế ước → 2 trang (hộ cuối sang trang cùng dòng Cộng)');
 R.push((so[4]===2 && so[6]===2 ? '✓ ' : '✗ ')+'In 06: 4, 6 hộ → 2 trang');
 { const q = await b.newPage(); await q.setContent(await p.evaluate(()=>window.__inPC)); const pdf = await q.pdf({preferCSSPageSize:true}); await q.close();
   const n = await p.evaluate(async a=>(await PDFLib.PDFDocument.load(new Uint8Array(a))).getPageCount(), Array.from(pdf)); R.push((n>=1 && n<=5 ? '✓ ' : '✗ ')+'In phân công: '+n+' trang'); }
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
