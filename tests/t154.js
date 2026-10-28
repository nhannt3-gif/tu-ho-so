// 3.158 — Khai báo Hội vừa 1 trang (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2): bỏ cột Xã (dòng nhóm "Xã · n Hội · m tổ"),
//   bỏ cột Tên Hội cấp xã + Số / Ngày KH Hội tỉnh (sang 📖 Chuẩn hóa: khai 1 lần / Hội + ngoại lệ riêng xã), 📋 Phân công cạnh tên Hội, bỏ ⇩ Chép;
//   dữ liệu cũ tự chuyển (KH nhiều xã khai nhất → chung của Hội, xã khác giữ làm ngoại lệ). Bộ GIẢ: tests/gia31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)==='11' && t.xa);
   const xas = [...new Set(ds.map(t=>t.xa))]; const tA = ds.find(t=>t.xa===xas[0]), tB = ds.find(t=>t.xa===xas[1]), tC = ds.find(t=>t.xa===xas[2]);
   const kA = ktHoiKhoa(tA), kB = ktHoiKhoa(tB), kC = tC && ktHoiKhoa(tC);
   /* 1. chuyển dữ liệu cũ: KH Hội tỉnh khai từng xã */
   delete D.cauHinh.ktChuan; delete D.cauHinh.ktKHChuan; D.cauHinh.ktHdt5 = 1; D.cauHinh.ktHdtDoi = 1;
   D.cauHinh.ktHoiKB = {}; D.cauHinh.ktHoiKB[kA] = {ten:'Hội Giả xã A', ct:'Nguyễn Văn Chủ', kh:'06-KH/HNDT', khNgay:'10/01/2026'};
   D.cauHinh.ktHoiKB[kB] = {kh:'06-KH/HNDT', khNgay:'10/01/2026'}; if(kC) D.cauHinh.ktHoiKB[kC] = {kh:'09-KH/KHAC', khNgay:'20/02/2026'};
   C.che = 'hdt'; C.hdtTab = 'hoi'; ktVeThe(); await w(200);
   ok('chuyển cũ: số / ngày KH nhiều xã khai nhất → chung của Hội (Chuẩn hóa)', D.cauHinh.ktChuan['11'].kh==='06-KH/HNDT' && D.cauHinh.ktChuan['11'].khNgay==='10/01/2026' && D.cauHinh.ktKHChuan===1);
   ok('xã khai trùng chung → bỏ ô riêng; xã khai khác → giữ làm ngoại lệ', !ktHoiKBGoc(kA).kh && !D.cauHinh.ktHoiKB[kB] && (!kC || ktHoiKBGoc(kC).kh==='09-KH/KHAC'));
   ok('khi in: xã thường lấy KH chung, xã ngoại lệ lấy KH riêng; tên Hội riêng giữ', ktHoiKB(kB).kh==='06-KH/HNDT' && ktHoiKB(kB).khNgay==='10/01/2026' && (!kC || ktHoiKB(kC).kh==='09-KH/KHAC') && ktHoiKB(kA).ten==='Hội Giả xã A');
   /* 2. bảng Khai báo Hội */
   const the = document.getElementById('kt-the'), bang = the.querySelector('.hkb-xls');
   const cot = [...bang.querySelectorAll('thead th')].map(x=>x.textContent).join('|');
   ok('cột: Hội (tổ) · CT · PCT · BTV 1–3 · Nhiệm kỳ · Số HĐUT · Ngày HĐ (bỏ Xã, Tên Hội, KH tỉnh, ⋯)', cot==='Hội (tổ)|Chủ tịch|Phó CT|BTV 1|BTV 2|BTV 3|Nhiệm kỳ|Số HĐUT|Ngày HĐ', cot);
   const nhom = [...bang.querySelectorAll('tr.hkb-nhom')];
   ok('dòng nhóm theo xã: "Xã · n Hội · m tổ"', nhom.length===new Set(ktHoiDs().map(x=>x.t.xa)).size && /· \d+ Hội · \d+ tổ/.test(nhom[0].textContent), nhom.length && nhom[0].textContent);
   ok('mỗi Hội – xã 1 dòng, 📋 Phân công cạnh tên Hội', bang.querySelectorAll('tbody tr[data-k]').length===ktHoiDs().length && [...bang.querySelectorAll('tbody tr[data-k]')].every(r=>r.querySelector('td.hkb-hoi .hkb-pc') && r.querySelector('.hkb-pc').textContent==='📋 Phân công'));
   ok('bỏ nút ⇩ Chép KH Hội tỉnh', !/Chép KH/.test(the.textContent) && typeof ktHoiKBChep==='undefined');
   C.xa = tA.xa; ktVeThe(); await w(150);
   const b2 = the.querySelector('.hkb-xls');
   ok('chọn 1 xã: bảng vừa ngang trang (không cuộn ngang)', b2.closest('.hkb-cuon').scrollWidth <= b2.closest('.hkb-cuon').clientWidth+1, b2.closest('.hkb-cuon').scrollWidth+' / '+b2.closest('.hkb-cuon').clientWidth);
   const id = kA.replace(/[^0-9a-z]/gi, '_'), oCT = document.getElementById('hkb-'+id+'-ct'); oCT.focus(); oCT.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true}));
   ok('gõ như Excel vẫn chạy (Enter → Phó CT)', document.activeElement.id==='hkb-'+id+'-pct');
   const nutPC = document.querySelector('tr[data-k="'+kA+'"] .hkb-pc'); nutPC.click(); await w(200);
   ok('📋 → hộp Phân công BTV của Hội – xã đó', /Phân công|phân công/.test(document.getElementById('hop-in').textContent)); dongHop();
   /* 3. Chuẩn hóa */
   C.hdtTab = 'chuan'; ktVeThe(); await w(150);
   ok('Chuẩn hóa: thêm 2 dòng Số / Ngày KH Hội tỉnh (4 Hội × 14 mục)', the.querySelectorAll('.kt-chuan tbody input').length===56 && /Số KH Hội tỉnh/.test(the.querySelector('.kt-chuan').textContent));
   const r = the.querySelector('.kt-rieng');
   ok('Riêng từng xã: Hội (tổ) · Tên Hội cấp xã · Số KH · Ngày KH, chữ mờ = theo quy tắc / KH chung', !!r && [...r.querySelectorAll('thead th')].map(x=>x.textContent).join('|')==='Hội (tổ)|Tên Hội cấp xã|Số KH Hội tỉnh|Ngày KH' &&
     document.getElementById('hkr-'+id+'-ten').value==='Hội Giả xã A' && document.getElementById('hkr-'+id+'-kh').value==='' && document.getElementById('hkr-'+id+'-kh').placeholder==='06-KH/HNDT');
   const tenB = [...r.querySelectorAll('tr[data-k]')].find(x=>x.getAttribute('data-k')!==kA);
   if(tenB){ const iT = tenB.querySelector('input[id$="-ten"]'); ok('ô tên trống: chữ mờ = tên theo quy tắc', iT.placeholder===ktHoiTenTD(KT_K.to[Object.keys(KT_K.to).find(m=>ktHoiKhoa(KT_K.to[m])===tenB.getAttribute('data-k'))])); }
   const iK = document.getElementById('hkr-'+id+'-kh'); iK.value = '11-KH/RIENG'; iK.dispatchEvent(new Event('change'));
   ok('gõ KH riêng 1 xã → xã đó dùng riêng, Hội khác / xã khác giữ chung', ktHoiKB(kA).kh==='11-KH/RIENG' && ktHoiKB(kB).kh==='06-KH/HNDT');
   iK.value = ''; iK.dispatchEvent(new Event('change'));
   ok('xóa ô riêng → về KH chung', ktHoiKB(kA).kh==='06-KH/HNDT');
   ktChuanSua('11', 'kh', '07-KH/MOI'); ok('sửa KH chung ở Chuẩn hóa → mọi xã (trừ ngoại lệ) đổi theo', ktHoiKB(kB).kh==='07-KH/MOI' && (!kC || ktHoiKB(kC).kh==='09-KH/KHAC'));
   const gK = (C.che='kh', C.khNam=2026, C.hoi=String(tA.dv), ktVeThe(), await w(150), ktKHGiaTri());
   ok('in Kế hoạch: căn cứ KH Hội tỉnh lấy từ Chuẩn hóa', gK.f.KH==='07-KH/MOI' && (!gK.f.KHT || /07-KH\/MOI/.test(gK.f.KHT)), gK.f.KH);
   C.che = 'dx'; C.hoi = ''; C.xa = '';
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
