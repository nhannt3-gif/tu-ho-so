// 3.141 — Kế hoạch › In theo tháng kiểm tra TỰ LẤY số liệu cuối tháng liền trước (Mẫu 31 + BC0437 đã nạp), không đổi kỳ anh đang chọn;
//        thiếu tháng đó → tháng gần nhất trước, ghi ⚠; tên file SL theo đúng ngày số liệu. Bộ GIẢ: tests/gia31 (Mẫu 31 T7 + T8).
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
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.khHoi=''; C.che='dx'; C.khNam = 2026; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const dmK = {}; Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99').forEach(x=>{ const kk = x.xa+'|'+x.dv; dmK[kk] = (dmK[kk]||0)+1; });
   const [xa, dv] = Object.keys(dmK).sort((a, b2)=>dmK[b2]-dmK[a])[0].split('|');
   C.che = 'kh'; C.xa = xa; C.khHoi = dv; delete (D.cauHinh.ktKH||{})['2026|'+xa+'|'+dv]; ktVeThe(); await w(200);
   /* xếp mọi tổ vào T8 và T9 (trọn ấp) để có tháng kiểm tra dùng số liệu T7 (đã nạp) và T8 (= kỳ đang chọn) */
   let L = ktKHLich(); const g = ktKHMacDinh(L.ds, [8, 9]); const S0 = {tu:8, den:9, to:g, tay:1}; D.cauHinh.ktKH = D.cauHinh.ktKH || {}; D.cauHinh.ktKH['2026|'+xa+'|'+dv] = S0; luu();
   const kyTruoc = KT_K.ky;
   KT_KH_TH = 8; ktVeThe(); await w(50); for(let i=0;i<60 && !document.querySelector('.kt-kh-thang');i++) await w(100);
   const the = document.getElementById('kt-the').textContent;
   ok('T8 → tự dùng số liệu cuối 07/2026 (Mẫu 31 T7 đã nạp), ghi rõ trên bảng', /Số liệu in T8:\s*T7\/2026/.test(the) && !/nên dùng số liệu/.test(the), (the.match(/Số liệu in T8:[^·]*/)||[''])[0]);
   ok('kỳ anh đang chọn giữ nguyên (ô Số liệu, KT_K)', C.ky==='2026-08' && KT_K.ky===kyTruoc && KT_KH_SL && KT_KH_SL.ky==='2026-07');
   const t8 = Object.keys(S0.to).find(ma=>S0.to[ma]===8);
   ktKHIn06(t8, 'in', 1); await w(300); const k06 = Object.keys(H).find(k=>/_M06_T08-26_/.test(k));
   ok('🖨 Mẫu 06 T8: tên file SL31-07-26 (số liệu T7), in xong vẫn kỳ 08', !!k06 && /_SL31-07-26\.html$/.test(k06) && KT_K.ky==='2026-08', k06);
   const h06 = k06 ? await H[k06].text() : ''; const g7 = await (async()=>{ const S = KT_KH_SL; return S.K.to[t8] ? 1 : 0; })();
   ok('phiếu 06 lấy tổ / món từ số liệu T7', g7===1 && h06.length>1000);
   ktKHIn16('in', 1); ktKHIn04T('in', 1); await w(300);
   ok('🖨 Mẫu 16 cả tháng + Mẫu 04 T8: SL31-07-26', Object.keys(H).some(k=>/_M16_T08-26_\d+to_SL31-07-26/.test(k)) && Object.keys(H).some(k=>/_M04_T08-26_SL31-07-26/.test(k)), Object.keys(H).filter(k=>/T08-26/.test(k)).join(' · '));
   KT_KH_TH = 9; ktVeThe(); await w(50); for(let i=0;i<60 && !/Số liệu in T9/.test(document.getElementById('kt-the').textContent);i++) await w(100);
   const the9 = document.getElementById('kt-the').textContent;
   ok('T9 → số liệu cuối 08/2026 = kỳ đang chọn (📌, không ⚠)', /📌\s*Số liệu in T9:\s*T8\/2026/.test(the9) && !/⚠ Chưa nạp/.test(the9), (the9.match(/Số liệu in T9:[^·]*/)||[''])[0]);
   /* tháng kiểm tra quá sớm (T3 → cần 02/2026, chưa nạp) */
   const g2 = ktKHMacDinh(L.ds, [3, 9]); D.cauHinh.ktKH['2026|'+xa+'|'+dv] = {tu:3, den:9, to:g2, tay:1}; luu();
   KT_KH_TH = 3; ktVeThe(); await w(50); for(let i=0;i<60 && !/Số liệu in T3|Chưa nạp/.test(document.getElementById('kt-the').textContent);i++) await w(100);
   const the3 = document.getElementById('kt-the').textContent;
   ok('T3 chưa nạp số liệu 02/2026 → ⚠, dùng kỳ đang chọn', /⚠ Chưa nạp Mẫu 31 cuối T2\/2026/.test(the3), (the3.match(/⚠[^.]*/)||[''])[0]);
   ok('KT_K sau cùng vẫn là kỳ đang chọn', KT_K.ky==='2026-08' && C.ky==='2026-08');
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
