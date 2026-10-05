// 3.113 — 🏛 Khai báo Hội đoàn thể: 1 nơi khai cho Mẫu 06 / 16TD / 04 / Kế hoạch (thẻ Hội – xã + tab nhỏ Chuẩn hóa),
//        lãnh đạo (CT · PCT · 5 ủy viên BTV), chuyển khai báo cũ, người kiểm tra = Phó CT, người ký KH = CT, dòng nhắc thiếu trong từng tab.
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
   const chu = x => x.replace(/<w:tab\/>/g, '⇥').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa);
   const tA = ds.find(t=>String(t.dv)==='11') || ds[0], tB = ds.find(t=>t.xa===tA.xa && String(t.dv)!==String(tA.dv)), tC = ds.find(t=>t.xa!==tA.xa && String(t.dv)===String(tA.dv));
   const kA = ktHoiKhoa(tA), kB = ktHoiKhoa(tB), kC = tC && ktHoiKhoa(tC);
   /* 1. chuyển khai báo cũ */
   D.cauHinh.ktHoiKB = {}; D.cauHinh.ktHoiKB[kA] = {cb:'Giả Văn Phó', cbcv:'Phó Chủ tịch Hội', ky:'Giả Thị Chủ'}; D.cauHinh.ktHoiKB[kB] = {cb:'Giả Văn Ủy', cbcv:'Ủy viên BTV'};
   delete D.cauHinh.ktHdtDoi; ktVeThe(); await w(100);
   const a = D.cauHinh.ktHoiKB[kA], bb = D.cauHinh.ktHoiKB[kB];
   ok('chuyển cũ: cán bộ chức vụ Phó… → Phó CT; người ký → Chủ tịch (bỏ ô cũ)', a.pct==='Giả Văn Phó' && a.ct==='Giả Thị Chủ' && !a.cb && !a.ky, JSON.stringify(a));
   ok('chuyển cũ: cán bộ chức vụ khác → ủy viên, vẫn in như trước khi chưa khai Phó CT', bb.uv1==='Giả Văn Ủy' && bb.cb==='Giả Văn Ủy' && ktCanBo(tB, {}).cb==='Giả Văn Ủy' && ktCanBo(tB, {}).cv==='Ủy viên BTV', JSON.stringify(bb));
   ok('chuyển chỉ 1 lần', D.cauHinh.ktHdtDoi===1);
   /* 2. tab khai báo */
   C.xa = tA.xa; C.che = 'hdt'; ktVeThe(); await w(200);
   const the = document.getElementById('kt-the');
   ok('nút 🏛 Khai báo Hội đoàn thể đứng đầu hàng chọn loại', /^🏛 Khai báo Hội đoàn thể/.test(the.querySelector('.kt-che button').textContent.trim()) && the.querySelector('.kt-che button').classList.contains('bat'));
   ok('mỗi Hội – xã của xã chọn 1 thẻ: tên, CT, PCT, 5 ủy viên, HĐUT, KH tỉnh', the.querySelectorAll('.kt-hdt-the').length===ktHoiDs().length && the.querySelectorAll('.kt-hdt-the input').length===ktHoiDs().length*15);
   ok('tên Hội cấp xã: trống = tên chuẩn theo cây (chữ mờ)', document.getElementById('hkb-'+kA.replace(/[^0-9a-z]/gi,'_')+'-ten').placeholder===ktHoiTenTD(tA));
   const tD = ds.find(t=>String(t.dv)==='14' && t.xa===tA.xa);
   if(tD){ const thD = [...the.querySelectorAll('.kt-hdt-the')].find(x=>/Đoàn/.test(x.querySelector('.kt-hdt-dau').textContent)); ok('Đoàn: Bí thư / Phó Bí thư', !!thD && /Bí thư/.test(thD.textContent) && /Phó Bí thư/.test(thD.textContent)); }
   ok('thẻ ghi rõ người kiểm tra / người ký khi in', /Giả Văn Phó — Phó Chủ tịch/.test(the.textContent) && /người ký Kế hoạch Giả Thị Chủ/.test(the.textContent));
   /* 3. sửa ô → lưu, In ra đổi */
   const iP = document.getElementById('hkb-'+kA.replace(/[^0-9a-z]/gi,'_')+'-pct'); iP.value = '  Trần  Văn Giả '; iP.dispatchEvent(new Event('input')); iP.dispatchEvent(new Event('change'));
   ok('sửa Phó CT: lưu gọn khoảng trắng, dòng In ra đổi ngay', D.cauHinh.ktHoiKB[kA].pct==='Trần Văn Giả' && /Trần\s+Văn Giả/.test(document.getElementById('hkbi-'+kA.replace(/[^0-9a-z]/gi,'_')+'-pct').textContent));
   /* 4. dùng khi in */
   const g6 = ktGiaTri06(tA, [], {}), g16 = ktGiaTri16(tA, [], {nx:''});
   ok('Mẫu 06 / 16: người kiểm tra = Phó CT + chức vụ theo Chuẩn hóa', g6.f.CB1==='Trần Văn Giả' && g6.f.CV1==='Phó Chủ tịch' && g16.f.CB1==='Trần Văn Giả');
   ok('"Để trống" ở khung in vẫn để dòng chấm', ktGiaTri06(tA, [], {cbtu:'trong'}).f.CB1==='');
   const g4 = ktBC04([{t:tA}])[0]; ok('Mẫu 04: đoàn kiểm tra có Phó CT', JSON.stringify(g4).indexOf('Trần Văn Giả')>=0);
   C.che = 'kh'; C.khNam = 2026; C.hoi = String(tA.dv); ktVeThe(); await w(150);
   const gK = ktKHGiaTri(), dK = chu(await docx(await ktDocx(gK.mau, gK)));
   ok('Kế hoạch: người ký = Chủ tịch đã khai', gK.f.KY==='Giả Thị Chủ' && dK.indexOf('Giả Thị Chủ')>=0);
   ok('tab Kế hoạch: dòng nhắc thiếu số HĐUT / KH tỉnh + nút sang khai báo (không còn khung ✎ cũ)', /Chưa khai: .*số HĐUT/.test(the.textContent) && !!the.querySelector('.kt-hdt-nhac button') && !the.querySelector('.kt-hkb-bang'));
   ['hd','hdNgay','kh','khNgay'].forEach((k, i)=>ktHoiKBSua(kA, k, ['01/HĐUT','02/01/2025','06-KH/HNDT','10/01/2026'][i])); ktVeThe(); await w(100);
   ok('khai đủ → dòng nhắc xanh "Đã khai báo đủ"', /Đã khai báo đủ cho 1 Hội – xã/.test(the.textContent), (the.querySelector('.kt-hdt-nhac')||{}).textContent);
   C.che = 'bc'; ktVeThe(); await w(150); ok('tab Mẫu 04: dòng nhắc khai báo Hội thay khung ✎ cũ', !!the.querySelector('.kt-hdt-nhac') && !the.querySelector('.kt-hkb-bang'));
   /* 5. chép KH Hội tỉnh cùng Hội */
   if(kC){ C.xa = ''; C.che = 'hdt'; ktVeThe(); await w(100); ktHoiKBChep(); await w(100); ok('⇩ chép số / ngày KH Hội tỉnh sang xã khác cùng Hội', ktHoiKB(kC).kh==='06-KH/HNDT' && ktHoiKB(kC).khNgay==='10/01/2026' && !ktHoiKB(kB).kh); }
   /* 6. tab nhỏ Chuẩn hóa */
   C.che = 'hdt'; C.hdtTab = 'chuan'; ktVeThe(); await w(100);
   ok('Chuẩn hóa thành tab nhỏ: 4 Hội × 12 mục (thêm chức danh ủy viên)', the.querySelectorAll('.kt-chuan tbody input').length===48 && /Chức danh ủy viên/.test(the.textContent));
   ktChuanSua('11', 'pho', 'Phó Chủ tịch Hội giả'); ktVeThe(); await w(50);
   const daSua = the.querySelectorAll('.kt-chuan input.da').length, coVe = !!the.querySelector('.kt-chuan .hkb-ve');
   ok('ô đã sửa tô xanh + ↺; chức vụ in theo chuẩn mới', daSua===1 && coVe && ktGiaTri06(tA, [], {}).f.CV1===(String(tA.dv)==='11' ? 'Phó Chủ tịch Hội giả' : 'Phó Chủ tịch'));
   the.querySelector('.kt-chuan .hkb-ve').click(); await w(50); ok('↺ về mặc định', !D.cauHinh.ktChuan);
   ktHoiKBHop(); ok('nút "⚙ Bảng khai báo" cũ mở tab Hội – xã', ktCH().che==='hdt' && ktCH().hdtTab==='hoi');
   ok('khai báo Hội lên Drive (không phải khóa riêng máy)', !chRieng('ktHoiKB') && !chRieng('ktChuan') && !chRieng('ktHdtDoi') && chRieng('ktgs'));
   C.che = 'dx'; C.xa = '';
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
