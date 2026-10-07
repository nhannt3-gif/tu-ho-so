// 3.128 — Tổ TK&VV: chip "Có dư nợ · chưa có TK 105", ngày tất nợ, Mới vào / Ra khỏi tổ (so Mẫu 31 tháng trước), biến động cả năm.
// Bộ GIẢ: tests/gia31 (Mẫu 31 T7, T8 — số liệu giả); dựng thêm biến động bằng cách sửa bảng T8 trong bộ nhớ.
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
   doiNgan(7); slDoiTab('to'); for(let i=0;i<80 && !document.getElementById('to-cay');i++) await w(250);
   const C = toCH(); C.ky = '2026-08'; TO_KS = {}; TO_K = await toNap('2026-08');
   /* chọn tổ đông nhất có ở cả T7 và T8 */
   const M8 = await toMapKy('2026-08'), M7 = await toMapKy('2026-07');
   ok('bản đồ khách → tổ 2 tháng', !!M8 && !!M7 && Object.keys(M8).length>10, Object.keys(M8).length+' / '+Object.keys(M7).length);
   const t = Object.values(TO_K.to).filter(x=>!toLaTT(x)).sort((a, b)=>(TO_K.kh[b.ma]||[]).length-(TO_K.kh[a.ma]||[]).length)[0];
   /* tạo biến động giả: 1 khách tổ khác chuyển vào tổ t, 1 khách tổ t chuyển đi, 1 khách mới hoàn toàn */
   const khT = Object.keys(M8).filter(k=>M8[k].to===t.ma), khKhac = Object.keys(M8).filter(k=>M8[k].to!==t.ma && M7[k] && M7[k].to===M8[k].to);
   const kVao = khKhac[0], kDi = khT[0], toKhac = M8[kVao].to;
   M7[kVao] = Object.assign({}, M7[kVao]); M8[kVao] = Object.assign({}, M8[kVao], {to:t.ma});   /* từ tổ khác sang */
   M8[kDi] = Object.assign({}, M8[kDi], {to:toKhac});                                             /* sang tổ khác */
   M8['4899999999'] = {to:t.ma, ten:'KHÁCH GIẢ MỚI', dn:10000000, t105:0, nv:'2026-08-12'};      /* kết nạp mới */
   const B = toBienDong(t.ma, M8, M7);
   ok('Mới vào: kết nạp mới (ngày vay) + từ tổ khác', B.vao['4899999999'] && B.vao['4899999999'].tu==='kết nạp mới' && B.vao['4899999999'].ngay==='2026-08-12' && B.vao[kVao] && /^từ tổ /.test(B.vao[kVao].tu), JSON.stringify(B.vao[kVao]));
   ok('Ra khỏi tổ: chuyển sang tổ khác ghi rõ', B.ra.some(r=>r.kh===kDi && /^sang tổ /.test(r.di)));
   delete M8['4899999999']; M8[kDi] = Object.assign({}, M8[kDi], {to:t.ma}); M8[kVao] = Object.assign({}, M8[kVao], {to:toKhac});
   const kMat = khT[1]; delete M8[kMat];
   const B2 = toBienDong(t.ma, M8, M7); ok('khách không còn trong Mẫu 31 → "không còn trong Mẫu 31"', B2.ra.some(r=>r.kh===kMat && r.di==='không còn trong Mẫu 31'));
   TO_MAP = {}; TO_BD = null;
   /* giao diện tổ */
   C.xa = t.xa; C.diem = t.khoaDiem; C.hoi = ''; C.to = t.ma; TO_LOC_MO = 'tat'; toVeThe(); await w(600);
   const the = document.getElementById('to-the');
   ok('dòng tóm tắt tổ có "Biến động T8/2026: +n vào · −n ra"', /Biến động T0?8\/2026: \+\d+ vào · −\d+ ra/.test(the.textContent), (the.querySelector('.to-the-so')||{}).textContent);
   const chip = [...the.querySelectorAll('.to-loc')].map(x=>x.textContent);
   ok('nút 📅 Biến động cả năm', chip.some(x=>/Biến động cả năm/.test(x)));
   const tv = toTV(t), nCTK = tv.filter(k=>k.conNo && !k.stk.length).length;
   ok('chip "Có dư nợ · chưa có TK 105" đếm đúng (có dư nợ, không số TK)', TO_LOC.some(l=>l[0]==='ctk') && (nCTK===0 || chip.some(x=>x.indexOf('Có dư nợ · chưa có TK 105 '+nCTK)>=0)), nCTK+' khách');
   /* ngày tất nợ: khách không còn dư nợ */
   const ko = tv.filter(k=>!k.conNo);
   if(ko.length){ TO_LOC_MO = 'ko'; toVeThe(); await w(200);
     ok('chip Không dư nợ có cột "Ngày tất nợ" (ngày GD gần nhất của món tất toán, hoặc "trước năm")', /Ngày tất nợ/.test(the.querySelector('thead').textContent) && [...the.querySelectorAll('tbody tr')].every(tr=>/\d{2}\/\d{2}\/\d{4}|trước 2026/.test(tr.textContent))); }
   else ok('không có khách hết dư nợ trong tổ giả (bỏ qua ngày tất nợ)', true);
   TO_LOC_MO = 'rk'; toVeThe(); await w(200);
   ok('chip Ra khỏi tổ: bảng Đi đâu (lấy từ tháng trước)', /Đi đâu/.test(the.textContent));
   TO_LOC_MO = 'moi'; toVeThe(); await w(200);
   ok('chip Mới vào tổ: cột Ngày kết nạp (≈ ngày vay)', /Ngày kết nạp/.test(the.textContent) || !/Mới vào tổ/.test(the.textContent));
   const xBC = toBCDS(t); ok('In / Excel danh sách đang lọc theo chip mới', Array.isArray(xBC.aoa) && /DANH SÁCH TỔ VIÊN/.test(xBC.tieuDe));
   TO_LOC_MO = 'tat';
   /* biến động cả năm */
   toBDNam(); for(let i=0;i<40 && !(TO_BDN && TO_BDN.t===t);i++) await w(200); await w(200);
   const hop = document.getElementById('hop-in');
   ok('Biến động cả năm: bảng T1 … T8, có hàng Vào / Ra, tháng thiếu ghi "—"', /T1/.test(hop.textContent) && /T8/.test(hop.textContent) && /Vào/.test(hop.textContent) && /—/.test(hop.textContent), TO_BDN.ds.map(x=>x.ky+':'+(x.bd ? 'có' : '—')).join(' '));
   ok('T8 so được với T7 (có số liệu)', !!TO_BDN.ds.find(x=>x.ky==='2026-08').bd);
   dongHop();
   return o;
 }, files);
 R.concat(loi.map(e=>'✗ lỗi trang: '+e)).forEach(x=>console.log(x));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log((R.length-sai+loi.length)+'/'+R.length+' đạt'+(sai ? ' · '+sai+' ✗' : ''));
 await b.close(); process.exit(sai ? 1 : 0);
})();
