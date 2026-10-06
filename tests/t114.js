// 3.109 — Mẫu 04 / Mẫu 16: ngày tháng theo tháng kiểm tra, III. Nội dung kiểm tra ghi sẵn (727), nhận xét có lãi tồn,
//        kiến nghị nhẹ nhàng liệt kê hộ (món không giao dịch từ 3 tháng, lãi tồn trên 6 tháng lãi), tối đa 10 hộ mỗi tổ.
// Bộ GIẢ: tests/gia31 (lãi tồn / lãi suất cài thêm trên dữ liệu giả trong phép thử).
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
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const chu = x => x.replace(/<w:tab\/>/g, '⇥').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   /* 1. lãi 1 tháng theo lãi suất */
   ok('lãi 1 tháng: %/năm chia 12, ≤ 2 coi là %/tháng, không có lãi suất = 0', Math.round(ktLaiThang({dn:12000000, ls:6.6}))===66000 && Math.round(ktLaiThang({dn:10000000, ls:0.55}))===55000 && ktLaiThang({dn:1000000})===0);
   /* 2. tổ có nhiều hộ: cài lãi tồn cao cho 12 hộ (> 6 tháng lãi), 1 hộ lãi tồn thấp (< 6 tháng) */
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99'); let t = ds[0]; ds.forEach(x=>{ if(toKhach(x).length>toKhach(t).length) t = x; });
   const hs = ktHo(t); ok('có tổ đủ hộ để thử', hs.length>=14, hs.length+' hộ');
   hs.forEach((h, i)=>{ h.mon.forEach(m=>{ m.ls = 8.4; m.lt = i<12 ? Math.round((m.dn||0)*0.0075*9) : (i===12 ? Math.round((m.dn||0)*0.007*3) : 0); }); });
   const d = ktDsDon(t);
   ok('lãi tồn > 6 tháng lãi: đúng 12 hộ (hộ 3 tháng lãi không vào), có lãi suất', d.ltc.length===12 && d.coLS && d.nLT===13, d.ltc.length+' / '+d.nLT);
   ok('danh sách tối đa 10 hộ + "và n hộ khác"', /và 2 hộ khác$/.test(ktDsLTC(d.ltc)) && ktDsLTC(d.ltc).split('; ').length===10, ktDsLTC(d.ltc).slice(-60));
   ok('mỗi hộ ghi lãi tồn + số tháng lãi', /\(lãi tồn [\d.]+ đồng, khoảng 9 tháng lãi\)/.test(ktDsLTC(d.ltc)));
   /* 3. Mẫu 04 */
   const g = ktBC04([{t:t}])[0], th = ktThangKT();
   ok('Mẫu 04 dòng ngày: địa danh xã + tháng / năm kiểm tra (tháng sau số liệu)', g.f.NOI04===ktXaTen(t.tenXa) && g.f.TH04===th.slice(5) && g.f.NAM04===th.slice(0, 4), g.f.NOI04+' '+g.f.TH04+'/'+g.f.NAM04);
   ok('III nội dung kiểm tra ghi sẵn 2 ý (727, mẫu 06/TD)', g.nd.length===2 && /727\/HD-NHCS/.test(g.nd[0]) && /06\/TD/.test(g.nd[1]));
   ok('IV.1 nhận xét tổ có lãi tồn + số hộ lãi tồn trên 6 tháng lãi', /13 tổ viên còn lãi tồn [\d.]+ đồng, trong đó 12 hộ lãi tồn trên 6 tháng lãi/.test(g.nx[0]), g.nx[0].slice(0, 160));
   ok('IV.2 a) chỉ đạo đôn đốc; b) liệt kê hộ theo tổ; c) tổ viên', /Chỉ đạo Ban quản lý các Tổ TK&VV phối hợp đôn đốc/.test(g.kn.a[0]) && /đề nghị Ban quản lý Tổ phối hợp đôn đốc các hộ:$/.test(g.kn.b[0]) && g.kn.b.some(x=>/^\+ Còn lãi tồn trên 6 tháng lãi: .* và 2 hộ khác\.$/.test(x)) && /trả lãi hằng tháng đúng kỳ/.test(g.kn.c[0]), g.kn.b.length+' dòng b)');
   const d4 = await docx(await ktDocx('m04', g)), c4 = chu(d4);
   ok('Word 04 hợp lệ, hết dấu {{', !new DOMParser().parseFromString(d4, 'application/xml').getElementsByTagName('parsererror').length && d4.indexOf('{{')<0);
   ok('Word 04: dòng ngày "… , ngày ....... tháng mm năm yyyy"', new RegExp(ktXaTen(t.tenXa)+', ngày [.…]{4,} tháng '+th.slice(5)+' năm '+th.slice(0, 4)).test(c4)   /* 3.124: dòng chấm mịn (nhiều chấm hơn, cỡ nhỏ) */);
   ok('Word 04: III có nội dung, kiến nghị có danh sách hộ', /III\. NỘI DUNG KIỂM TRA1\. Kiểm tra hoạt động của Tổ TK&VV/.test(c4) && /Còn lãi tồn trên 6 tháng lãi: /.test(c4) && /d\) Đối với NHCSXH/.test(c4));
   const h4 = ktHTML04([g]);
   ok('bản In 04 cùng nội dung (ngày, III, kiến nghị)', h4.indexOf('tháng '+th.slice(5)+' năm '+th.slice(0, 4))>=0 && /Kiểm tra hoạt động của Tổ TK&amp;VV/.test(h4) && /Còn lãi tồn trên 6 tháng lãi/.test(h4));
   /* 4. Mẫu 16 */
   const g16 = ktGiaTri16(t, [], {nx:'so'});
   ok('Mẫu 16 chưa khai ngày: tháng / năm theo tháng kiểm tra, ngày để trống', g16.f.ND==='' && g16.f.NM===th.slice(5) && g16.f.NY===th.slice(2, 4), g16.f.NM+'/'+g16.f.NY);
   ok('Mẫu 16 đã khai ngày: giữ ngày khai', ktGiaTri16(t, [], {ngay:'2026-10-07', nx:'so'}).f.ND==='07');
   ok('Mẫu 16 tồn tại: liệt kê hộ lãi tồn trên 6 tháng lãi (tối đa 10)', g16.nx.tt.some(x=>/trong đó lãi tồn trên 6 tháng lãi: .* và 2 hộ khác\./.test(x)), g16.nx.tt.join(' | ').slice(0, 200));
   ok('Mẫu 16 kiến nghị nhẹ nhàng có tên hộ', g16.nx.kn.some(x=>/^Đề nghị Ban quản lý Tổ phối hợp đôn đốc các hộ còn lãi tồn trên 6 tháng lãi nộp lãi: /.test(x)));
   const d16 = await docx(await ktDocx('m16', g16));
   ok('Word 16 hợp lệ, hết dấu {{, có danh sách hộ', !new DOMParser().parseFromString(d16, 'application/xml').getElementsByTagName('parsererror').length && d16.indexOf('{{')<0 && /lãi tồn trên 6 tháng lãi/.test(chu(d16)));
   /* 5. tổ không có vấn đề → câu chung, không liệt kê */
   const t2 = ds.find(x=>x!==t && !ktDsDon(x).khd.length && !ktDsDon(x).ltc.length);
   if(t2){ const g2 = ktBC04([{t:t2}])[0]; ok('tổ không có món KHĐ / lãi tồn cao: kiến nghị câu chung', /^- Tiếp tục chỉ đạo các Tổ TK&VV duy trì/.test(g2.kn.a[0]) && /^- Duy trì sinh hoạt Tổ định kỳ/.test(g2.kn.b[0])); }
   else ok('có tổ không vấn đề để thử', true, 'bỏ qua — dữ liệu giả không có');
   /* 6. 3.110: khuôn Kế hoạch ① ② không còn chữ dính (3.105 xóa nhầm ô chỉ có dấu cách) */
   const txtK = x => (x.match(/<w:t(?: [^>]*)?>[^<]*<\/w:t>/g)||[]).map(y=>y.replace(/<[^>]+>/g, '')).join('');
   const k1 = txtK(KT_KHUON.m01.than), k2 = txtK(KT_KHUON.m01b.than);
   ok('Kế hoạch ① ② không còn chữ dính (Địa điểm: Văn phòng, xã giao, Hội nhận, hạn. Thực, giữ hồ, nghệ, đào, không? Có, giữ sổ)', /Địa điểm: Văn phòng/.test(k2) && /\{\{CXA\|xã\}\} giao đồng chí/.test(k2) && /Hội nhận ủy thác/.test(k2) && !/Hộinhận|điểm:Văn|\}\}giao/.test(k2) && !/hạn\.Thực|giữhồ|nghệ,đào|không\?Có|giữsổ/.test(k1));
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
