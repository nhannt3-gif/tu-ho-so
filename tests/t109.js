// 3.96 — tab con 🛡 KTGS Hội: 🗓 Kế hoạch KTGS năm của Hội cấp xã (01/KH) — khuôn dự thảo HĐT cấp xã (căn cứ 727, 90%, bỏ MẪU THAM KHẢO, A4),
//        100% tổ của Hội tại xã gom theo ấp, mặc định xếp tháng 02 → 10, đổi cả ấp / từng tổ, đổi khoảng tháng, tổ chưa xếp → nhắc, lưu theo năm + xã + hội,
//        Khai báo Hội điền HĐUT / KH Hội tỉnh / đoàn / người ký, Word (XML hợp lệ, có chân trang số trang, không đầu trang), In / PDF.
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
   const moZip = async (bl) => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); const g = n => { const f = XLSX.CFB.find(z, n) || XLSX.CFB.find(z, '/'+n); return f ? new TextDecoder().decode(f.content) : null; }; return {z, g, doc:g('word/document.xml')}; };
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.khHoi=''; C.che='kh'; C.khNam = 2026; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   ok('có nút chế độ 🗓 Kế hoạch năm · 01/KH, chưa chọn hội thì nhắc', /Kế hoạch năm · 01\/KH/.test(document.querySelector('.kt-che').textContent) && /Chọn xã ở cây phía trên rồi chọn hội/.test(document.getElementById('kt-the').textContent));
   /* chọn Hội – xã nhiều tổ nhất */
   const dem = {}; Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99').forEach(t=>{ const k = t.xa+'|'+t.dv; dem[k] = (dem[k]||0)+1; });
   const kMax = Object.keys(dem).sort((a, b)=>dem[b]-dem[a])[0], [xa, dv] = kMax.split('|');
   C.xa = xa; C.diem=''; C.hoi=''; C.to=''; pvVeCay('kt'); await w(300);
   ok('chọn xã → chip hội của xã (không cần điểm GD)', document.querySelectorAll('.kt-kh-hoi button').length>=2); [...document.querySelectorAll('.kt-kh-hoi button')].find(b=>b.getAttribute('onclick').indexOf("'"+dv+"'")>=0).click(); await w(200);
   const L = ktKHLich(), N = L.ds.length;
   ok('100% tổ của Hội tại xã, gom theo ấp', N===dem[kMax] && N>=3 && L.ds.every(t=>t.xa===xa && String(t.dv)===dv), N+' tổ');
   ok('mặc định xếp sẵn 02 → 10, đủ 100% tổ, chia đều', L.tu===2 && L.den===10 && Object.keys(L.gan).length===N && Object.values(L.gan).every(m=>m>=2 && m<=10) && (()=>{ const c = {}; Object.values(L.gan).forEach(m=>c[m]=(c[m]||0)+1); const v = Object.values(c); return Math.max(...v)-Math.min(...v)<=1; })());
   ok('thứ tự theo ấp: tháng không giảm theo danh sách', L.ds.every((t, i)=>!i || L.gan[t.ma]>=L.gan[L.ds[i-1].ma]));
   ok('chưa đổi thì chưa lưu (ghi "app xếp sẵn")', !L.luu && /app xếp sẵn/.test(document.getElementById('kt-the').textContent));
   /* đổi cả ấp + từng tổ */
   const ap0 = ktKHAp(L.ds[0]); ktKHDoiThang('', 7, ap0); await w(100);
   const L2 = ktKHLich(); ok('đổi tháng cả ấp → mọi tổ của ấp sang tháng 7, đã lưu', L2.luu && L2.ds.filter(t=>ktKHAp(t)===ap0).every(t=>L2.gan[t.ma]===7) && !!D.cauHinh.ktKH['2026|'+xa+'|'+dv]);
   const tB = L2.ds[N-1]; ktKHDoiThang(tB.ma, 3); await w(100); ok('đổi tháng 1 tổ', ktKHLich().gan[tB.ma]===3);
   ktKHDoiThang(tB.ma, ''); await w(100); const L3 = ktKHLich();
   ok('bỏ tháng 1 tổ → nhắc chưa đủ 100% tổ', L3.thieu.length===1 && L3.thieu[0].ma===tB.ma && /1 tổ chưa xếp tháng/.test(document.getElementById('kt-the').textContent));
   ktKHDoiThang(tB.ma, 9); await w(100);
   ktKHDoiKhoang(3, 8); await w(100); const L4 = ktKHLich(); ok('đổi khoảng tháng 03 → 08: xếp lại trong khoảng', L4.tu===3 && L4.den===8 && Object.values(L4.gan).every(m=>m>=3 && m<=8) && Object.keys(L4.gan).length===N);
   ktKHDoiKhoang(2, 10); await w(100);
   C.khNam = 2027; ktVeThe(); await w(100); ok('năm khác = lịch riêng (chưa lưu)', !ktKHLich().luu); C.khNam = 2026; ktVeThe(); await w(100);
   /* khai báo Hội + giá trị */
   const k = xa+'|'+dv; ktHoiKBSua(k, 'hd', '07'); ktHoiKBSua(k, 'hdNgay', '15/01/2026'); ktHoiKBSua(k, 'kh', '05/KH-CCB'); ktHoiKBSua(k, 'doan', 'Ông Giả Một – Chủ tịch\nBà Giả Hai – Phó Chủ tịch'); ktHoiKBSua(k, 'ky', 'Giả Văn Ký');
   const g = ktKHGiaTri();
   ok('giá trị: Hội tỉnh / Hội xã in hoa, năm, năm trước, tháng', g.f.HT===(String(dv)==='14' ? 'ĐOÀN THANH NIÊN TỈNH TÂY NINH' : (tdnHoi(dv)+' tỉnh Tây Ninh').toUpperCase()) && g.f.HX===ktHoiTenTD(L.ds[0]).toUpperCase() && g.f.NAM==='2026' && g.f.NT==='2025' && g.f.TU==='02/2026' && g.f.DEN==='10/2026', g.f.HT+' · '+g.f.HX);
   ok('số HĐUT tự thêm /HĐUT, NHCSXH Gò Dầu', g.f.HD==='07/HĐUT' && g.f.NH==='Gò Dầu', g.f.HD+' · '+g.f.NH);
   ok('bảng lịch: mỗi tháng có tổ 1 dòng "Ấp …: tổ…", không ghi số hộ, dòng Cộng 100%', g.rows.length>=2 && g.rows.slice(0, -1).every(r=>/^\d\d$/.test(r.L1) && /^(Ấp|Thôn|Khu phố|Tổ dân phố|\(chưa)/.test(r.L2) && r.L3==='Tối thiểu 90% món vay') && /100% tổ do Hội quản lý/.test(g.rows[g.rows.length-1].L2), g.rows.map(r=>r.L1).join(','));
   /* Word */
   ktDoiCheDo('kh'); await w(100); ktKHXem(1); await w(500); ok('👁 xem trước', !!document.getElementById('kt-kh-khung'));
   ktKHIn('word'); await w(1200);
   const fn = Object.keys(F).find(n=>/Ke hoach KTGS/.test(n)); const z = await moZip(F[fn]); const doc = z.doc, chu = doc.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   ok('Word: XML hợp lệ, hết dấu {{', hopLe(doc) && doc.indexOf('{{')<0, fn);
   ok('Word: căn cứ 727, không còn 10566 / 75% / MẪU THAM KHẢO', /727\/HD-NHCS ngày 11\/02\/2026/.test(chu) && chu.indexOf('10566')<0 && chu.indexOf('75%')<0 && chu.indexOf('MẪU THAM KHẢO')<0 && /tối thiểu 90% khoản vay đang còn dư nợ được giải ngân từ các năm trước\./.test(chu));
   ok('Word: tên Hội xã, năm, căn cứ HĐUT + KH Hội tỉnh điền đủ', chu.indexOf(g.f.HX)>=0 && /NĂM 2026/.test(chu) && /số 07\/HĐUT ngày 15\/01\/2026 giữa NHCSXH Gò Dầu/.test(chu) && /số 05\/KH-CCB/.test(chu) && /Năm 2025 đến thời điểm/.test(chu) && /từ tháng 02\/2026 đến tháng 10\/2026/.test(chu));
   ok('Word: thành phần 1 câu chung theo Bảng chuẩn hóa, không dòng chấm (3.106)', /thành lập đoàn kiểm tra gồm: Các đồng chí Chủ tịch, Phó Chủ tịch, Ủy viên Ban Thường vụ Hội /.test(chu) && chu.indexOf('Giả Một')<0 && (doc.match(/w:leader="dot"/g)||[]).length===0, (chu.match(/[^.]*thành lập đoàn[^.]*./)||[''])[0]+' · chấm '+(doc.match(/w:leader="dot"/g)||[]).length);
   ok('Word: bảng lịch lặp tiêu đề, xuống dòng trong ô, người ký', /<w:tblHeader\/>/.test(doc) && (g.rows.some(r=>/\n/.test(r.L2)) ? /<w:br\/>/.test(doc) : true) && chu.indexOf('Giả Văn Ký')>=0 && /(CHỦ TỊCH|BÍ THƯ)/.test(chu));
   ok('Word: A4, chân trang số trang, không đầu trang / chú thích, không chữ đỏ / tô vàng', /w:w="11907" w:h="16840"/.test(doc) && !!z.g('word/footer1.xml') && !z.g('word/header1.xml') && /footer1\.xml/.test(z.g('word/_rels/document.xml.rels')) && /rId11/.test(doc) && !/w:highlight/.test(doc) && !/w:color w:val="(?!000000)/.test(doc));
   ok('Word: phần III nội dung kiểm tra giữ nguyên dự thảo', /III\. NỘI DUNG KIỂM TRA, GIÁM SÁT/.test(chu) && /Kiểm tra tại khách hàng vay vốn/.test(chu) && /Có phải nộp lệ phí trong quá trình làm hồ sơ vay vốn không/.test(chu));
   /* Mẫu 06 / 16 / 04 vẫn đủ phần sau khi đổi ktDocx */
   const z4 = await moZip(await ktDocx('m04', [{f:{DV:'X', SP:''}, doan:[], rows:[]}])); ok('khuôn cũ (Mẫu 04) vẫn có đầu trang + chú thích, không chân trang', !!z4.g('word/header1.xml') && !!z4.g('word/footnotes.xml') && !z4.g('word/footer1.xml') && hopLe(z4.doc));
   ktKHXem(1); await w(300); ktKHIn('in'); await w(300);
   const hh = await H[Object.keys(H).find(n=>/Ke hoach KTGS/.test(n))].text();
   ok('In / PDF: A4, đủ chữ (căn cứ 727, bảng lịch, phần III, người ký)', /size:A4;/.test(hh) && /727\/HD-NHCS/.test(hh) && /Tối thiểu 90% món vay/.test(hh) && /Có phải nộp lệ phí/.test(hh) && hh.indexOf('Giả Văn Ký')>=0 && /<table/.test(hh));
   const xu = Object.keys(F).find(n=>/Ke hoach KTGS/.test(n)); var ra = await (async()=>{ const a = new Uint8Array(await F[xu].arrayBuffer()); let s=''; for(let i=0;i<a.length;i++) s+=String.fromCharCode(a[i]); return btoa(s); })();
   C.che = 'dx'; C.xa=''; C.hoi=''; C.khHoi='';
   return {o, ra}; }, files).catch(e=>({o:['✗ LỖI '+e.message]}));
 const r = R0.o; r.forEach(x=>console.log(x));
 if(process.argv[2] && R0.ra) fs.writeFileSync(path.join(process.argv[2], 't109_kh.docx'), Buffer.from(R0.ra, 'base64'));
 await p.screenshot({path:path.join(__dirname,'t109.png'), fullPage:true});
 await p.setViewportSize({width:390,height:844}); await p.evaluate(()=>{ dongHop(); const C = ktCH(); C.che='kh'; ktVeThe(); }); await p.waitForTimeout(300); await p.screenshot({path:path.join(__dirname,'t109_dt.png'), fullPage:true});
 await p.evaluate(()=>{ ktCH().che='dx'; });
 const sai = r.filter(x=>!x.startsWith('✓')).length; console.log((r.length-sai)+'/'+r.length+' đạt'); console.log('lỗi', loi); await b.close(); })();
