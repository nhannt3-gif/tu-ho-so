// 3.114 — Hộp chọn khi in (Mẫu 06 / 16 / 04 / Kế hoạch): người kiểm tra / người ký theo vai trò, nhớ lựa chọn, Điền đầy đủ,
//        Bảng II Mẫu 16 mặc định để trống, Mẫu 04 có tên Trưởng đoàn, nhận xét 16 / 04 liệt kê hộ nợ quá hạn, nợ khoanh.
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
   const F = {}; giaoFile = function(bl, ten){ F[ten] = bl; }; const H = {}; inBlob = function(bl, ten){ H[ten] = bl; };
   const chu = x => x.replace(/<w:tab\/>/g, '⇥').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   const chon = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('change')); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   delete D.cauHinh.ktIn;
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa); let t = ds[0]; ds.forEach(x=>{ if(toKhach(x).length>toKhach(t).length) t = x; });
   const k = ktHoiKhoa(t); D.cauHinh.ktHoiKB = {}; D.cauHinh.ktHoiKB[k] = {ct:'Nguyễn Văn Chủ', pct:'Trần Thị Phó', uv2:'Lê Văn Ủy'};
   /* 1. vai trò → tên + chức vụ */
   const n = vt => ktNguoi(t, vt), c = ktChuan(t);
   ok('vai trò: PCT / CT / ủy viên / ủy viên chưa khai / để trống', n('pct').cb==='Trần Thị Phó' && n('pct').cv===c.pho && n('ct').cb==='Nguyễn Văn Chủ' && n('ct').cv===c.ky && n('uv2').cb==='Lê Văn Ủy' && n('uv2').cv===c.uv && n('uv3').cb==='' && n('uv3').cv===c.uv && !n('').cb && !n('').cv);
   /* 2. đột xuất: bấm Word → hộp chọn, mặc định PCT; đổi CT → Word ghi CT; ngày cạnh nút In */
   C.xa = t.xa; ktChonTo(t.ma); await w(300);
   ok('đột xuất: ô Ngày kiểm tra nằm cạnh nút In, không còn khung ✎', !!document.querySelector('#kt-the .kt-in #kb-ngay') && !document.querySelector('#kt-the .kt-kb-khung'));
   ktXuat('m06', 'word'); await w(100);
   ok('bấm Word Mẫu 06 → hộp chọn khi in, chưa xuất file; mặc định Phó Chủ tịch, mục đích để trống', !!document.querySelector('#hop-in .kt-in-luoi') && !Object.keys(F).length && document.getElementById('ki-m06-ng1').value==='pct' && document.getElementById('ki-m06-md').value==='');
   chon('ki-m06-ng1', 'ct'); await w(50);
   ok('đổi người kiểm tra → nhớ lựa chọn (đồng bộ Drive)', D.cauHinh.ktIn.m06.ng1==='ct' && document.getElementById('ki-m06-ng1').value==='ct' && !chRieng('ktIn'));
   [...document.querySelectorAll('#hop-in button')].find(x=>/Word/.test(x.textContent)).click(); await w(800);
   const f6 = Object.keys(F).find(x=>/Mau 06/.test(x)), c6 = chu(await docx(F[f6]));
   ok('Word Mẫu 06: người kiểm tra = Chủ tịch đã khai (chức danh theo Chuẩn hóa)', c6.indexOf('Nguyễn Văn Chủ⇥Chức vụ: '+c.ky)>=0, (c6.match(/1\. Ông \(bà\)[^⇥]*⇥[^⇥]{0,30}/)||[''])[0]);
   /* 3. Mẫu 16: mặc định Bảng II trống, nhận xét gợi ý; người 2 = ủy viên */
   ktXuat('m16', 'word'); await w(80);
   ok('hộp Mẫu 16: nhận xét gợi ý, Bảng II để trống (mặc định)', document.getElementById('ki-m16-nx').value==='so' && document.getElementById('ki-m16-b2').value==='' && document.getElementById('ki-m16-ng2').value==='');
   chon('ki-m16-ng2', 'uv2'); await w(50);
   [...document.querySelectorAll('#hop-in button')].find(x=>/Word/.test(x.textContent)).click(); await w(800);
   const c16 = chu(await docx(F[Object.keys(F).find(x=>/Mau 16/.test(x))]));
   ok('Word Mẫu 16: người 1 PCT, người 2 ủy viên BTV, Bảng II trống', c16.indexOf('Trần Thị Phó')>=0 && c16.indexOf('Lê Văn Ủy')>=0 && (c16.indexOf(c.uv)>=0 || c16.indexOf(ktCVGon(c.uv, 1, 27))>=0) && !/định kỳ theo quý/.test(c16));
   ktXuat('m16', 'in'); await w(50); document.querySelector('#hop-in button[onclick^="ktInDayDu"]').click(); await w(50);
   ok('✚ Điền đầy đủ: Bảng II theo 727 + gợi ý nhận xét', D.cauHinh.ktIn.m16.b2==='dien' && D.cauHinh.ktIn.m16.nx==='so' && document.getElementById('ki-m16-b2').value==='dien');
   ok('Mẫu 16 điền đầy đủ → Bảng II ghi như mẫu (định kỳ theo quý…)', /định kỳ theo quý/.test(ktGiaTri16(t, [], ktInV('m16')).b2.join('|'))); dongHop();
   /* 4. Mẫu 04: 2 người, tên Trưởng đoàn, nhận xét để trống */
   const g4 = ktBC04([{t:t}], '', {nx:'so', ng1:'pct', ng2:'ct'})[0];
   ok('Mẫu 04: Đoàn kiểm tra = người 1 (PCT) + người 2 (CT); tên Trưởng đoàn = người 1', g4.doan.length===2 && g4.doan[0].cb==='Trần Thị Phó' && g4.doan[1].cb==='Nguyễn Văn Chủ' && g4.f.TD04==='Trần Thị Phó');
   const d4 = await docx(await ktDocx('m04', g4)), c4 = chu(d4);
   ok('Word 04 hợp lệ; tên Trưởng đoàn in dưới "TRƯỞNG ĐOÀN KIỂM TRA"', hopLe(d4) && d4.indexOf('{{')<0 && c4.indexOf('TRƯỞNG ĐOÀN KIỂM TRA')>=0 && c4.lastIndexOf('Trần Thị Phó')>c4.indexOf('TRƯỞNG ĐOÀN KIỂM TRA'));
   ok('bản In 04 cũng có tên Trưởng đoàn', /TRƯỞNG ĐOÀN KIỂM TRA<\/p><p class="kt-b" style="margin-top:58pt">Trần Thị Phó/.test(ktHTML04(g4)));
   const g4t = ktBC04([{t:t}], '', {nx:'', ng1:'', ng2:''})[0];
   ok('Mẫu 04 nhận xét "Để trống" → không nhận xét / kiến nghị; người để trống → không tên', !g4t.nx.length && !(g4t.kn.a||[]).length && !(g4t.kn.b||[]).length && !g4t.doan.length && !g4t.f.TD04);
   /* 5. nhận xét: nợ quá hạn, nợ khoanh có tên hộ + đề xuất */
   const hoGoc = ktHo, h0 = hoGoc(t); const tenQH = tenHoaDau(h0[0].ten), tenKN = tenHoaDau(h0[1].ten); ktHo = function(x){ const r = hoGoc(x); if(x===t){ r[0].qh = 5000000; r[1].kn = 8000000; } return r; };   /* giả: hộ 1 quá hạn, hộ 2 khoanh */
   const dd = ktDsDon(t);
   ok('danh sách hộ nợ quá hạn / nợ khoanh', dd.qh.some(x=>x.ten===tenQH) && dd.kn.some(x=>x.ten===tenKN), dd.qh.length+' / '+dd.kn.length);
   const s = Object.assign({}, ktSoTo(t), {qh:5000000, kn:8000000, tlQH:0.1, tlKN:0.2});
   const nx = ktNhanXet16(t, s, {nx:'so'});
   ok('Mẫu 16 tồn tại: nợ quá hạn / nợ khoanh ghi tên hộ', nx.tt.some(x=>/^Nợ quá hạn .*: .*\(quá hạn 5 triệu đồng\)/.test(x) && x.indexOf(tenQH)>=0) && nx.tt.some(x=>/^Nợ khoanh .*\(nợ khoanh 8 triệu đồng\)/.test(x) && x.indexOf(tenKN)>=0), nx.tt.join(' | ').slice(0, 300));
   ok('Mẫu 16 kiến nghị nhẹ nhàng: kế hoạch trả nợ, trả dần; động viên trả nợ khi có điều kiện', nx.kn.some(x=>/xây dựng kế hoạch trả nợ, trả dần nợ quá hạn/.test(x) && x.indexOf(tenQH)>=0) && nx.kn.some(x=>/^Theo dõi, động viên các hộ .* trả nợ khi có điều kiện/.test(x)));
   const kn4 = ktKN04(ktBC04([{t:t}], '', {nx:'so', ng1:'pct', ng2:''})[0]);
   ok('Mẫu 04 kiến nghị b): liệt kê hộ nợ quá hạn, nợ khoanh', kn4.b.some(x=>/^\+ Có nợ quá hạn .*: /.test(x) && x.indexOf(tenQH)>=0) && kn4.b.some(x=>/^\+ Có nợ khoanh .*: /.test(x) && x.indexOf(tenKN)>=0) && /nợ quá hạn, nợ khoanh nêu tại điểm b/.test(kn4.a[0]));
   ktHo = hoGoc;
   /* 6. Kế hoạch: người ký */
   C.che = 'kh'; C.khNam = 2026; C.hoi = String(t.dv); ktVeThe(); await w(150);
   ok('Kế hoạch: người ký mặc định Chủ tịch; chọn PCT → tên PCT; để trống → trống; chức danh luôn CHỦ TỊCH', ktKHGiaTri(ktInV('kh')).f.KY==='Nguyễn Văn Chủ' && ktKHGiaTri({ky:'pct'}).f.KY==='Trần Thị Phó' && ktKHGiaTri({ky:''}).f.KY==='' && ktKHGiaTri({ky:'pct'}).f.CT===c.ky.toUpperCase());
   ktKHXem(); await w(80); ok('bấm Xem Kế hoạch → hộp chọn người ký trước', !!document.getElementById('ki-kh-ky') && !document.getElementById('kt-kh-khung'));
   chon('ki-kh-ky', 'pct'); await w(50); [...document.querySelectorAll('#hop-in button')].find(x=>/Xem trước/.test(x.textContent)).click(); await w(300);
   ok('Xem trước Kế hoạch theo người ký đã chọn', !!document.getElementById('kt-kh-khung') && KT_KH_XEM.f.KY==='Trần Thị Phó' && /Đổi lựa chọn in/.test(document.getElementById('hop-in').textContent)); dongHop();
   /* 7. các luồng khác đều hỏi trước */
   C.che = 'bc'; ktVeThe(); await w(100); KT_BC_CHON = {}; KT_BC_CHON[t.ma] = true; ktVeThe(); await w(100); ktBCXem(); await w(80);
   ok('Mẫu 04 → hộp chọn (nhận xét, 2 người)', !!document.getElementById('ki-m04-nx') && !!document.getElementById('ki-m04-ng2')); dongHop();
   C.che = 'dk'; ktVeThe(); await w(150); ktDKXem(); await w(80);
   ok('định kỳ → hộp chọn có cả 06 và 16', !!document.getElementById('ki-m06-md') && !!document.getElementById('ki-m16-b2')); dongHop();
   C.che = 'dx'; C.xa = ''; C.to = '';
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
