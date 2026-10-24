// 3.359 (KE_HOACH_CHOT_SO đợt C3) — 📅 dòng thời gian khách / tổ trong năm: tóm Mẫu 31 từng tháng (qua KHO), sự kiện vào / ra / chuyển tổ, tất nợ, vay thêm, QH / khoanh, đổi tổ trưởng; khối ở thẻ khách + thẻ tổ (bấm mới đọc). Bộ GIẢ tests/gianho31 + chuỗi tháng giả.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   /* 1. tháng có Mẫu 31 */
   ok('3.359 năm có Mẫu 31: 2026; tháng của năm 2026 = 07, 08', dtgNamCo()[0]==='2026' && dtgThangNam(2026).join()==='2026-07,2026-08', dtgThangNam(2026).join());
   const T = await dtgNap(2026);
   ok('3.359 tóm Mẫu 31 từng tháng qua KHO (2 tháng, có khách + tổ trưởng)', T.length===2 && Object.keys(T[1].t.kh).length>0, T.map(x=>Object.keys(x.t.kh).length).join('/'));
   /* 2. sự kiện khách — chuỗi tháng giả */
   const G = [{ky:'2025-12', t:{kh:{A:{to:'0026001', ten:'A', dn:20e6, qh:0, kn:0, mon:1}, C:{to:'0026001', ten:'C', dn:5e6, qh:0, kn:0, mon:1}}, tt:{'0026001':'Trần Văn Một'}}},
     {ky:'2026-01', t:{kh:{A:{to:'0026002', ten:'A', dn:20e6, qh:3e6, kn:0, mon:1}, B:{to:'0026001', ten:'B', dn:30e6, qh:0, kn:0, mon:1}, C:{to:'0026001', ten:'C', dn:0, qh:0, kn:0, mon:0}}, tt:{'0026001':'Nguyễn Thị Hai', '0026002':'X'}}},
     {ky:'2026-02', t:{kh:{B:{to:'0026001', ten:'B', dn:50e6, qh:0, kn:0, mon:2}, C:{to:'0026001', ten:'C', dn:0, qh:0, kn:0, mon:0}}, tt:{'0026001':'Nguyễn Thị Hai'}}}];
   const eA = dtgKH('A', G).map(e=>e.chu), eB = dtgKH('B', G).map(e=>e.chu), eC = dtgKH('C', G).map(e=>e.chu);
   ok('3.359 khách A: mốc 12/2025 → chuyển tổ + phát sinh QH (T1) → không còn trong Mẫu 31 (T2)', /^Mốc/.test(eA[0]) && eA.some(x=>/Chuyển tổ 0026001 → 0026002/.test(x)) && eA.some(x=>/Phát sinh quá hạn/.test(x)) && /Không còn trong Mẫu 31/.test(eA[eA.length-1]), eA.join(' | '));
   ok('3.359 khách B: vào tổ (T1) → vay thêm món (T2); khách C: tất nợ (T1)', /Vào tổ 0026001/.test(eB[0]) && eB.some(x=>/Vay thêm món \(1 → 2 món/.test(x)) && eC.some(x=>x==='Tất nợ'), eB.join(' | ')+' // '+eC.join(' | '));
   { const L = [{ky:'2026-01', t:{kh:{D:{to:'1', dn:5e6, qh:0, kn:0, lt:0, mon:1}}, tt:{}}}, {ky:'2026-02', t:{kh:{D:{to:'1', dn:0, qh:0, kn:0, lt:2e5, mon:0}}, tt:{}}}, {ky:'2026-03', t:{kh:{D:{to:'1', dn:0, qh:0, kn:0, lt:0, mon:0}}, tt:{}}}];
     const eD = dtgKH('D', L).map(e=>e.chu);
     ok('3.359 còn lãi tồn = chưa tất nợ: T2 "Hết gốc · còn lãi tồn", T3 mới "Tất nợ"', eD.length===3 && /^Hết gốc · còn lãi tồn 200\.000/.test(eD[1]) && eD[2]==='Tất nợ', eD.join(' | ')); }
   const eT = dtgTo('0026001', G).map(e=>e.chu);
   ok('3.359 tổ 0026001: mốc, vào B, đổi tổ trưởng Trần Văn Một → Nguyễn Thị Hai, A không còn món vay ở tổ', /^Mốc 12\/2025|^Mốc T12\/2025|^Mốc/.test(eT[0]) && eT.some(x=>/^Vào 1: B/.test(x)) && eT.some(x=>/Đổi tổ trưởng: Trần Văn Một → Nguyễn Thị Hai/.test(x)) && eT.some(x=>/Không còn món vay ở tổ 1: A/.test(x)), eT.join(' | '));
   /* 3. giao diện: thẻ khách + thẻ tổ */
   kyChungDoi('2026-08'); dhSL('tra'); for(let i=0;i<60 && !TC_K;i++) await w(200); await w(600);
   const kh = KHO.chiMuc()[0].m; slTheKH(kh); await w(400);
   const k1 = document.querySelector('.dtg-khoi');
   ok('3.367 khối 📅 Dòng thời gian mặc định thu gọn (bấm tiêu đề mới mở)', !!k1 && k1.tagName==='DETAILS' && !k1.open, k1 && k1.tagName+' '+k1.open);
   ok('3.359 thẻ khách có khối 📅 Dòng thời gian + nút Xem năm 2026 (chưa đọc sẵn)', !!k1 && !!k1.querySelector('[data-lenh="dtg.mo"][data-nam="2026"]') && !k1.querySelector('.dtg-ul'));
   k1.querySelector('[data-lenh="dtg.mo"]').click(); for(let i=0;i<30 && !/Theo Mẫu 31/.test(k1.textContent);i++) await w(150);
   ok('3.359 bấm Xem năm → hiện danh sách sự kiện theo Mẫu 31 07 · 08 (có mốc tháng đầu)', /Theo Mẫu 31/.test(k1.textContent) && (!!k1.querySelector('.dtg-ul li') || /Không có thay đổi/.test(k1.textContent)), k1.textContent.slice(0, 140));
   const to = KHO.danhBa(kh).to; if(KHO.toKy(TC_K, to)){ tcTheTo(to); await w(400); const k2 = document.querySelector('.dtg-khoi[id^="dtg-to-"]');
     ok('3.359 thẻ tổ có khối 📅 Dòng thời gian, bấm xem được', !!k2); if(k2){ k2.querySelector('[data-lenh="dtg.mo"]').click(); for(let i=0;i<30 && !/Theo Mẫu 31/.test(k2.textContent);i++) await w(150);
       ok('3.359 thẻ tổ: mốc "N khách có món vay"', /khách có món vay/.test(k2.textContent), k2.textContent.slice(0, 120)); } }
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t302 đạt'); await b.close(); process.exit(sai?1:0);
})();
