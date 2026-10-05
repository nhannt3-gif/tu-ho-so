// 3.115 — Mẫu 06: dòng Thời điểm · Địa bàn · Tổ không rớt dòng (thu khoảng cách, bỏ tỉnh, viết tắt KP / P. / X.), cột Chương trình canh giữa,
//        tên cán bộ kiểm tra dưới khối ký · Mẫu 16: tên Trưởng đoàn + Tổ trưởng dưới khối ký, Bảng II ghi như mẫu tham khảo · Kế hoạch ① hết 2 chỗ dính chữ.
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
   const hopLe = x => !new DOMParser().parseFromString(x, 'application/xml').getElementsByTagName('parsererror').length;
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   /* 1. địa bàn gọn */
   ok('địa bàn gọn: bỏ tỉnh; viết tắt KP / P. / X.', ktDbGon('khu phố Suối Giả, phường Gia Giả, tỉnh Tây Ninh', 1)==='khu phố Suối Giả, phường Gia Giả' && ktDbGon('khu phố Suối Giả, phường Gia Giả, tỉnh Tây Ninh', 2)==='KP Suối Giả, P. Gia Giả' && ktDbGon('ấp Bàu Giả, xã Phước Giả, tỉnh Tây Ninh', 2)==='ấp Bàu Giả, X. Phước Giả');
   const f1 = {TD:'…../10/2026', DB:'khu phố Suối Giả, phường Gia Giả, tỉnh Tây Ninh', TO:'Trần Đức Giả'}, d1 = ktDong3_06(f1);
   ok('địa bàn phường + tên tổ trưởng thường → 1 dòng', d1.mot, JSON.stringify(d1));
   const f2 = {TD:'…../10/2026', DB:'khu phố Ninh Thạnh Giả Đông, phường Gia Lộc Giả Trung, tỉnh Tây Ninh', TO:'Lê Thị Giả'}, d2 = ktDong3_06(f2);
   ok('… và khi chỉ vừa sau khi gọn: in bản gọn (viết tắt KP / P.)', d2.mot && /^KP /.test(d2.db) && /P\. /.test(d2.db), d2.db+' · a='+d2.a+' b='+d2.b);
   const f3 = {TD:'…../10/2026', DB:f2.DB, TO:'Nguyễn Thị Giả Một Hai Ba Bốn Năm Sáu Bảy Tám Chín Mười'}, d3 = ktDong3_06(f3);
   ok('vẫn quá dài → Tổ xuống dòng, địa bàn giữ đủ', !d3.mot && d3.db===f3.DB);
   /* 2. Mẫu 06 Word */
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa); const t = ds[0];
   D.cauHinh.ktHoiKB = D.cauHinh.ktHoiKB || {}; D.cauHinh.ktHoiKB[ktHoiKhoa(t)] = {ct:'Nguyễn Văn Chủ', pct:'Trần Thị Phó'};
   C.xa = t.xa; ktChonTo(t.ma); await w(200);
   const g6 = ktGiaTri06(t, ktDaChon(), ktInV('m06')), d6 = await docx(await ktDocx('m06', g6)), c6 = chu(d6);
   ok('Word 06 hợp lệ', hopLe(d6) && d6.indexOf('{{')<0);
   ok('Word 06: tên cán bộ kiểm tra in dưới "CÁN BỘ KIỂM TRA (Ký, ghi rõ họ tên)"', c6.lastIndexOf('Trần Thị Phó')>c6.lastIndexOf('CÁN BỘ KIỂM TRA'));
   const tr = d6.match(/<w:tr[ >][\s\S]*?<\/w:tr>/g).filter(x=>/w:val="567" w:hRule="atLeast"/.test(x)), o3 = x => x.match(/<w:tc>[\s\S]*?<\/w:tc>/g)[3];
   ok('cột Chương trình canh giữa ngang + dọc', tr.length>0 && tr.every(x=>/<w:vAlign w:val="center"\/>/.test(o3(x)) && /<w:jc w:val="center"\/>/.test(o3(x)) && !/<w:jc w:val="left"\/>/.test(o3(x))));
   const h6 = ktHTML06(g6); ok('bản In 06: tên cán bộ kiểm tra + cột CT canh giữa dọc', /CÁN BỘ KIỂM TRA<\/p><p class="kt-i">\(Ký, ghi rõ họ tên\)<\/p><p class="kt-b" style="margin-top:42pt">Trần Thị Phó/.test(h6) && /c nho giua/.test(h6));
   /* 3. Mẫu 16 */
   const g16 = ktGiaTri16(t, ktDaChon(), Object.assign(ktInV('m16'), {b2:'dien'})), d16 = await docx(await ktDocx('m16', g16)), c16 = chu(d16);
   ok('Word 16 hợp lệ; tên Trưởng đoàn và Tổ trưởng dưới khối ký', hopLe(d16) && c16.lastIndexOf('Trần Thị Phó')>c16.indexOf('TRƯỞNG ĐOÀN KIỂM TRA') && c16.lastIndexOf(t.ten)>c16.indexOf('TỔ TRƯỞNG TỔ'));
   ok('Bảng II (3.116): như mẫu tham khảo, bỏ chữ "đầy đủ", điều cấm ghi "Không"', /Theo cụm dân cư liền kề/.test(c16) && new RegExp('Tại văn phòng '+ktCapAp(t.tenXa)+', định kỳ theo quý').test(c16) && g16.b2.filter(x=>x==='Không').length===4 && !g16.b2.some(x=>/đầy đủ/.test(x)) && g16.b2.indexOf('Đảm bảo đúng thành phần')>=0);
   const h16 = ktHTML16(g16); ok('bản In 16: tên Trưởng đoàn + Tổ trưởng', h16.indexOf('Trần Thị Phó</p>')>h16.indexOf('TRƯỞNG ĐOÀN KIỂM TRA') && h16.lastIndexOf(t.ten)>h16.indexOf('TỔ TRƯỞNG TỔ TK'));
   const g16t = ktGiaTri16(t, ktDaChon(), {ng1:'', nx:''}); ok('người kiểm tra để trống → không in tên dưới khối ký', chu(await docx(await ktDocx('m16', g16t))).indexOf('Trần Thị Phó')<0);
   /* 4. Kế hoạch ① */
   const txt = x => (x.match(/<w:t(?: [^>]*)?>[^<]*<\/w:t>/g)||[]).map(y=>y.replace(/<[^>]+>/g, '')).join('');
   ok('Kế hoạch ①: hết dính chữ ")?Các", "Lưu:VT"', /\)\? Các hình thức/.test(txt(KT_KHUON.m01.than)) && /- Lưu: VT/.test(txt(KT_KHUON.m01.than)) && !/\)\?Các|Lưu:VT/.test(txt(KT_KHUON.m01.than)));
   C.che='dx'; C.xa=''; C.to='';
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
