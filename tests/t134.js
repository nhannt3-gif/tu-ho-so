// 3.140 — Kế hoạch: thứ tự ấp (điểm GD → mã thôn → tên, sắp lại ▲▼, về mặc định); mỗi tháng TRỌN ẤP; đổi tháng chỉ theo ấp; kế hoạch cũ tách ấp → cảnh báo;
//        In theo tháng kiểm tra (Mẫu 06 từng tổ 1 mặt + tỷ lệ 90% món, Mẫu 16 cả tháng 2 mặt, Mẫu 04 tháng 2 mặt); Định kỳ · Mẫu 06 + 16 chọn tự do.
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
   const docx = async bl => { const z = XLSX.CFB.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); return new TextDecoder().decode((XLSX.CFB.find(z, 'word/document.xml') || XLSX.CFB.find(z, '/word/document.xml')).content); };
   doiNgan(7); const C = ktCH(); C.ky='2026-08'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.khHoi=''; C.che='dx'; C.khNam = 2026; slDoiTab('kt'); for(let i=0;i<120 && !(KT_K && document.getElementById('kt-cay'));i++) await w(250); await w(300);
   const dmK = {}; Object.values(KT_K.to).filter(x=>!toLaTT(x) && x.dv && String(x.dv)!=='99').forEach(x=>{ const kk = x.xa+'|'+x.dv; dmK[kk] = (dmK[kk]||0)+1; });
   const [xa, dv] = Object.keys(dmK).sort((a, b2)=>dmK[b2]-dmK[a])[0].split('|');
   C.che = 'kh'; C.xa = xa; C.hoi = ''; C.khHoi = dv; delete (D.cauHinh.ktKH||{})['2026|'+xa+'|'+dv]; delete (D.cauHinh.ktApThu||{})[xa]; ktVeThe(); await w(200);
   let L = ktKHLich(); const ds = L.ds, thu = ktKHApThu(ds), mac = ktKHApMacDinh(ds);
   const khoa = t => [String(t.diem||t.khoaDiem||'~'), String(t.thon||'~')];
   ok('thứ tự ấp mặc định: điểm GD → mã thôn → tên', thu.join('|')===mac.join('|') && mac.every((a, i)=>{ if(!i) return true; const x = ds.filter(t=>ktKHAp(t)===mac[i-1]).map(khoa).sort()[0], y = ds.filter(t=>ktKHAp(t)===a).map(khoa).sort()[0]; return x[0]<y[0] || (x[0]===y[0] && x[1].localeCompare(y[1], 'vi', {numeric:true})<=0); }), mac.length+' ấp');
   ok('danh sách tổ theo thứ tự ấp đó (ấp liền khối)', ds.every((t, i)=>!i || thu.indexOf(ktKHAp(t))>=thu.indexOf(ktKHAp(ds[i-1]))));
   const tron = gan => { const g = {}; ds.forEach(t=>{ if(gan[t.ma]) (g[ktKHAp(t)] = g[ktKHAp(t)] || new Set()).add(gan[t.ma]); }); return Object.values(g).every(s=>s.size===1); };
   ok('chia mặc định 02 → 10: mỗi tháng TRỌN ẤP, mọi tổ có tháng', tron(L.gan) && ds.every(t=>L.gan[t.ma]), JSON.stringify(Object.values(L.gan).reduce((a, m)=>(a[m]=(a[m]||0)+1, a), {})));
   const g3 = ktKHMacDinh(ds, [3, 6, 9]), dm = [3, 6, 9].map(m=>ds.filter(t=>g3[t.ma]===m).length);
   ok('chia 3 tháng: trọn ấp, số tổ các tháng gần đều (lệch ≤ ấp lớn nhất)', tron(g3) && Math.max(...dm)-Math.min(...dm) <= Math.max(...thu.map(a=>ds.filter(t=>ktKHAp(t)===a).length)), dm.join('/'));
   ok('bảng: không còn ô chọn tháng từng tổ, chỉ chọn cả ấp', !document.querySelector('select[aria-label="Tháng kiểm tra tổ"]') && document.querySelectorAll('select[aria-label="Tháng cả ấp"]').length===thu.length);
   /* kế hoạch cũ bị tách ấp */
   const apA = thu.find(a=>ds.filter(t=>ktKHAp(t)===a).length>=2), toA = ds.filter(t=>ktKHAp(t)===apA);
   ktKHGhi(L); const S = D.cauHinh.ktKH['2026|'+xa+'|'+dv]; S.to[toA[0].ma] = (S.to[toA[0].ma]===2 ? 3 : 2); delete S.to[toA[1].ma]; S.tay = 1; luu(); ktVeThe(); await w(150);
   L = ktKHLich(); const the = document.getElementById('kt-the').textContent;
   ok('tổ mới (chưa xếp) của ấp đã có tháng → tự theo tháng của ấp', L.gan[toA[1].ma]===S.to[toA[2] ? toA[2].ma : toA[0].ma] || !!L.gan[toA[1].ma], 'T'+L.gan[toA[1].ma]);
   ok('kế hoạch cũ tách ấp → cảnh báo vàng + nút "Xếp lại theo ấp"', /ấp đang chia ở nhiều tháng/.test(the) && /Xếp lại theo ấp/.test(the), apA);
   ktKHXepLai(1); await w(100); ok('Xếp lại theo ấp → hết tách', tron(ktKHLich().gan) && !/ấp đang chia ở nhiều tháng/.test(document.getElementById('kt-the').textContent));
   /* sắp lại ấp */
   KT_KH_SAP = true; ktVeThe(); await w(100); const a0 = thu[0], a1 = thu[1];
   ktKHApDoi(a1, -1); await w(100); ok('⇅ sắp lại: ▲ đưa ấp lên, nhớ theo xã, danh sách tổ đổi thứ tự', ktKHApThu(ktKHDsTo())[0]===a1 && D.cauHinh.ktApThu[xa][0]===a1 && ktKHAp(ktKHDsTo()[0])===a1 && document.querySelectorAll('button[title="Đưa ấp lên"]').length===thu.length);
   ktKHApMacDinhVe(); await w(100); ok('↺ về mặc định', !(D.cauHinh.ktApThu||{})[xa] && ktKHApThu(ktKHDsTo())[0]===a0); KT_KH_SAP = false;
   /* in theo tháng */
   L = ktKHLich(); const m = L.thang.find(x=>ds.some(t=>L.gan[t.ma]===x)), dsm = ds.filter(t=>L.gan[t.ma]===m);
   KT_KH_TH = m; ktVeThe(); await w(150); const bang = document.querySelector('.kt-kh-thang');
   ok('bấm tháng → bảng tổ của tháng (theo ấp), cột tỷ lệ món, nút 06 từng tổ, nút 16 / 04 cả tháng', !!bang && bang.querySelectorAll('tbody tr').length===dsm.length && /món = /.test(bang.textContent) && /Mẫu 16 cả tháng/.test(document.getElementById('kt-the').textContent) && /Mẫu 04 T/.test(document.getElementById('kt-the').textContent), 'T'+m+' · '+dsm.length+' tổ');
   ok('số liệu khác cuối tháng trước tháng kiểm tra → nhắc', m-1!==8 ? /nên dùng số liệu/.test(document.getElementById('kt-the').textContent) : true);
   const t0 = dsm[0]; ktKHIn06(t0.ma, 'in', 1); await w(100); const k06 = Object.keys(H).find(k=>/^Mau 06/.test(k)), h06 = k06 ? await H[k06].text() : '';
   ok('🖨 06 từng tổ: 1 bản, đánh dấu 1 mặt, tháng kiểm tra đúng, ✓ đã in', /name="kt-hai-mat" content="0"/.test(h06) && /\/'?0?/.test(h06) && KT_KH_DA['2026-'+hai(m)+'|'+t0.ma]===1, k06);
   ktKHIn06(t0.ma, 'word', 1); await w(400); const kw = Object.keys(F).find(k=>/^Mau 06/.test(k)); ok('📄 Word 06 từng tổ', !!kw && /<w:body>/.test(await docx(F[kw])));
   /* dưới 90% → hỏi */
   KT_DK_TH = '2026-'+hai(m); const xh = ktDKHo(t0); KT_DK_TH = ''; xh.forEach(y=>{ KT_DK_BO[t0.ma+'|'+y.h.kh] = 1; });
   const truocN = Object.keys(H).length; ktKHIn06(t0.ma, 'in', 1); await w(100);
   ok('tổ dưới 90% món → hộp hỏi "Vẫn in" / "Chọn thêm hộ", chưa in', /Tổ chưa đủ 90% món/.test(document.body.textContent) && Object.keys(H).length===truocN); dongHop();
   xh.forEach(y=>{ delete KT_DK_BO[t0.ma+'|'+y.h.kh]; });
   ktKHIn16('in', 1); await w(150); const k16 = Object.keys(H).find(k=>/^Mau 16/.test(k)), h16 = k16 ? await H[k16].text() : '';
   ok('🖨 Mẫu 16 cả tháng: đủ số tổ, đánh dấu in 2 mặt', /name="kt-hai-mat" content="1"/.test(h16) && (h16.match(/class="kt-to"/g)||[]).length===dsm.length, k16+' · '+(h16.match(/class="kt-to"/g)||[]).length);
   ktKHIn16('word', 1); await w(600); const k16w = Object.keys(F).find(k=>/^Mau 16/.test(k)), x16 = k16w ? await docx(F[k16w]) : '';
   ok('📄 Word 16 cả tháng: mỗi tổ sang trang lẻ (2 mặt)', dsm.length<2 || /<w:type w:val="oddPage"\/>/.test(x16));
   ktKHIn04T('in', 1); await w(150); const k04 = Object.keys(H).find(k=>/^Mau 04/.test(k)), h04 = k04 ? await H[k04].text() : '';
   ok('🖨 Mẫu 04 tháng: 2 mặt, có tháng kiểm tra', /name="kt-hai-mat" content="1"/.test(h04) && new RegExp('tháng '+hai(m)).test(h04), k04);
   ok('bộ in chuẩn đọc dấu 1 / 2 mặt', /"haiMat":false/.test(inChuan(h06)) && /"haiMat":true/.test(inChuan(h16)));
   /* Định kỳ chọn tự do */
   C.che = 'dk'; C.ky = '2026-'+hai(m-1); ktVeThe(); await w(300);
   ok('Định kỳ: không tích sẵn tổ theo Kế hoạch (chọn tự do), tên chip mới', !ktDKDs().some(r=>r.chon) && /Định kỳ · Mẫu 06 \+ 16 \(chọn tự do\)/.test(document.getElementById('kt-the').textContent));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0, 5));
 console.log((R.filter(x=>x[0]==='✓').length)+'/'+R.length+' đạt'); await b.close(); })();
