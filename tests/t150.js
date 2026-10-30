// 3.154 — Khai báo Hội = 1 bảng như Excel (anh chốt ý 8 — docs/KE_HOACH_GON_GIAO_DIEN.md): 1 Hội = 1 CT, 1 PCT, 3 BTV;
//   dữ liệu cũ tự chuyển (PCT = người đầu PCT → PCT2 → PCT3; BTV 1–3 = 3 người đầu ủy viên 1 → 5; người dư giữ ở du + ⓘ),
//   phân công BTV đổi vai theo; gõ như Excel (Enter / Tab / ↑↓), dán cả khối, ngày sai tô đỏ, bỏ "In ra" / ↺. Bộ GIẢ: tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const ctx = await b.newContext({viewport:{width:1536,height:730}, permissions:['clipboard-read','clipboard-write']});
 const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi) await slGhi(kq); }
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const ds = Object.values(KT_K.to).filter(t=>!toLaTT(t) && t.dv && String(t.dv)!=='99' && t.xa);
   const tA = ds.find(t=>String(t.dv)==='11') || ds[0], tB = ds.find(t=>t.xa===tA.xa && String(t.dv)!==String(tA.dv));
   const kA = ktHoiKhoa(tA), kB = ktHoiKhoa(tB);
   /* 1. dữ liệu cũ đủ 9 vai (bản ≤ 3.153) */
   D.cauHinh.ktHoiKB = {}; D.cauHinh.ktHoiKB[kA] = {ten:'Hội Giả xã A', ct:'Nguyễn Văn Chủ', pct:'', pct2:'Trần Văn Phó Hai', pct3:'Lê Thị Phó Ba', nk:'2023 – 2028',
     uv1:'', uv2:'Phạm Văn Một', uv3:'Võ Thị Hai', uv4:'Đỗ Văn Ba', uv5:'Bùi Thị Bốn', hd:'05/HĐUT', hdNgay:'15/03/2024', kh:'06-KH/HNDT', khNgay:'10/01/2026'};
   D.cauHinh.ktHoiKB[kB] = {ct:'Hồ Văn Chủ', pct:'Mai Thị Phó', uv1:'Lý Văn Ủy'};
   D.cauHinh.ktPC = {}; D.cauHinh.ktPC[kA] = {p:{pct2:{ap:['Ấp X'], kt:1}, uv4:{ap:['Ấp Y']}, pct:{ap:['Ấp rác']}}, chon:{pct3:0}, ky:'pct2', phuTrach:'pct2'};
   D.cauHinh.ktIn = {m06:{ng1:'pct2'}, m16:{ng1:'uv5', ng2:'pct'}};
   delete D.cauHinh.ktHdt5; D.cauHinh.ktHdtDoi = 1; ktVeThe(); await w(100);
   const a = ktHoiKB(kA), bb = ktHoiKB(kB);
   ok('chuyển cũ: Phó CT = người đầu có tên trong PCT → PCT2 → PCT3', a.pct==='Trần Văn Phó Hai', a.pct);
   ok('chuyển cũ: BTV 1–3 = 3 người đầu trong ủy viên 1 → 5 (dồn lên)', a.uv1==='Phạm Văn Một' && a.uv2==='Võ Thị Hai' && a.uv3==='Đỗ Văn Ba', [a.uv1, a.uv2, a.uv3].join(' | '));
   ok('tên Hội, CT, nhiệm kỳ, HĐUT, KH tỉnh giữ nguyên', a.ten==='Hội Giả xã A' && a.ct==='Nguyễn Văn Chủ' && a.nk==='2023 – 2028' && a.hd==='05/HĐUT' && a.hdNgay==='15/03/2024' && a.kh==='06-KH/HNDT' && a.khNgay==='10/01/2026');
   ok('không còn ô PCT 2–3, BTV 4–5; người dư giữ ở du', !a.pct2 && !a.pct3 && !a.uv4 && !a.uv5 && JSON.stringify(a.du)===JSON.stringify([{vt:'pct3', ten:'Lê Thị Phó Ba'}, {vt:'uv5', ten:'Bùi Thị Bốn'}]), JSON.stringify(a.du));
   ok('Hội không dư người: không có du, không đổi', !bb.du && bb.pct==='Mai Thị Phó' && bb.uv1==='Lý Văn Ủy');
   const pc = D.cauHinh.ktPC[kA];
   ok('phân công BTV đổi vai theo người (PCT2 → PCT, ủy viên 4 → BTV 3), bỏ vai không tên', pc.p.pct && pc.p.pct.ap[0]==='Ấp X' && pc.p.uv3 && pc.p.uv3.ap[0]==='Ấp Y' && !pc.p.pct2 && !pc.p.uv4 && pc.ky==='pct' && pc.phuTrach==='pct' && !('pct3' in (pc.chon||{})), JSON.stringify(pc));
   ok('chọn người in cũ (Phó 2 / Ủy viên 5) → Phó CT / để trống', D.cauHinh.ktIn.m06.ng1==='pct' && D.cauHinh.ktIn.m16.ng1==='' && D.cauHinh.ktIn.m16.ng2==='pct');
   ok('chỉ chuyển 1 lần', D.cauHinh.ktHdt5===1);
   ok('danh sách vai: CT, PCT, 3 BTV (in và phân công)', KT_PC_VT.join()==='ct,pct,uv1,uv2,uv3' && !KT_IN_VT.some(x=>/pct2|pct3|uv4|uv5/.test(x[0])));
   /* 2. bảng */
   C.xa = tA.xa; C.che = 'hdt'; ktCH().hdtTab = 'hoi'; ktVeThe(); await w(200);
   const bang = document.querySelector('#kt-the .hkb-xls');
   const cot = bang ? [...bang.querySelectorAll('thead th')].map(x=>x.textContent).filter(Boolean).join('|') : '';
   ok('1 bảng (3.158): Hội (tổ) · CT · PCT · BTV 1–3 · Nhiệm kỳ · HĐUT · Ngày HĐ', cot==='Hội (tổ)|Chủ tịch|Phó CT|BTV 1|BTV 2|BTV 3|Nhiệm kỳ|Số HĐUT|Ngày HĐ', cot);
   ok('mỗi Hội – xã 1 dòng, dòng cao ≤ 34 px', bang.querySelectorAll('tbody tr[data-k]').length===ktHoiDs().length && bang.querySelector('tbody tr[data-k]').getBoundingClientRect().height<=34, Math.round(bang.querySelector('tbody tr[data-k]').getBoundingClientRect().height)+' px');
   ok('không còn "In ra", ↺, chữ diễn giải dài', !/In ra/.test(document.getElementById('kt-the').textContent) && !document.querySelector('#kt-the .hkb-ve') && !document.querySelector('#kt-the p.ghi'));
   const id = kA.replace(/[^0-9a-z]/gi, '_'), dongA = document.getElementById('hkb-'+id+'-ct').closest('tr');
   ok('Hội có người dư: dấu ⓘ, rê chuột thấy tên', !!dongA.querySelector('.hkb-du') && /Lê Thị Phó Ba/.test(dongA.querySelector('.hkb-du').title) && /Bùi Thị Bốn/.test(dongA.querySelector('.hkb-du').title));
   ok('ô trống tô nhạt (chữ mờ = chức danh)', document.getElementById('hkb-'+kB.replace(/[^0-9a-z]/gi,'_')+'-uv2').placeholder.length>0 && document.getElementById('hkb-'+kB.replace(/[^0-9a-z]/gi,'_')+'-uv2').value==='');
   /* 3. phím như Excel */
   const oCT = document.getElementById('hkb-'+id+'-ct'); oCT.focus(); oCT.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true}));
   ok('Enter → sang ô kế (Phó CT)', document.activeElement.id==='hkb-'+id+'-pct', document.activeElement.id);
   document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab', bubbles:true}));
   ok('Tab → ô kế (BTV 1)', document.activeElement.id==='hkb-'+id+'-uv1', document.activeElement.id);
   const r0 = +document.activeElement.getAttribute('data-r'), nDong = bang.querySelectorAll('tbody tr[data-k]').length;
   document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true}));
   ok('↓ → cùng cột dòng dưới', nDong<2 || (+document.activeElement.getAttribute('data-r')===r0+1 && /-uv1$/.test(document.activeElement.id)), document.activeElement.id);
   /* 4. dán cả khối */
   const oNK = document.getElementById('hkb-'+id+'-nk'); const dt = new DataTransfer(); dt.setData('text/plain', '2025 – 2030\t09/HĐUT\t01/02/2025\n');
   oNK.dispatchEvent(new ClipboardEvent('paste', {clipboardData:dt, bubbles:true, cancelable:true})); await w(200);
   const a2 = ktHoiKB(kA);
   ok('dán 1 dòng 3 cột từ Excel → điền Nhiệm kỳ · Số HĐUT · Ngày HĐ', a2.nk==='2025 – 2030' && a2.hd==='09/HĐUT' && a2.hdNgay==='01/02/2025', [a2.nk, a2.hd, a2.hdNgay].join(' | '));
   /* 5. ngày sai dạng tô đỏ */
   const oN = document.getElementById('hkb-'+id+'-hdNgay'); oN.value = '2026/01/10'; oN.dispatchEvent(new Event('change'));
   ok('ngày sai dạng → ô tô đỏ (không thêm chữ giải thích)', oN.classList.contains('sai') && getComputedStyle(oN).color!==getComputedStyle(document.getElementById('hkb-'+id+'-hd')).color);
   oN.value = '01/02/2025'; oN.dispatchEvent(new Event('change')); ok('sửa đúng dạng → hết đỏ', !oN.classList.contains('sai'));
   /* 6. Đoàn TN */
   const tD = ds.find(t=>String(t.dv)==='14' && t.xa===tA.xa);
   if(tD){ const kD = ktHoiKhoa(tD).replace(/[^0-9a-z]/gi, '_'); ok('Đoàn TN: ô ghi Bí thư / Phó Bí thư', /^Bí thư/.test(document.getElementById('hkb-'+kD+'-ct').placeholder) && /^Phó Bí thư/.test(document.getElementById('hkb-'+kD+'-pct').placeholder)); }
   else ok('Đoàn TN: bộ giả không có tổ Đoàn ở xã này — bỏ qua', true);
   /* 7. dùng khi in */
   ok('Mẫu 06: người kiểm tra = Phó CT đã chuyển', ktGiaTri06(tA, [], {}).f.CB1==='Trần Văn Phó Hai');
   C.che = 'dx'; C.xa = '';
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
