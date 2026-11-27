// t420 (3.570 — anh 28/11 "tương tự em có ô Nợ quá hạn, nợ khoanh, nợ đến hạn" · "khuôn A4 ngang, cột cơ bản đến chi tiết" · "theo VB 180"): ô Sao kê 🔴 Nợ quá hạn + 🟠 Nợ khoanh (js/99e ONO).
//   Dữ liệu GIẢ như t419 (gianho31 + Mẫu 31 31/12/2025 + Mẫu 31 theo ngày 10/09/2026). Ý: 2 ô sau ô KHĐ, ô Nợ cần xử lý chỉ còn KU chưa giải ngân · B1 QH: dư nợ QH / tỷ lệ
//   = Mẫu 31 từng kỳ, chỉ tiêu min(tỷ lệ 31/12, 0,08%) · B3 tổng = 2 kỳ · B1 khoanh: chỉ tiêu −5% · món hết hạn khoanh 120 ngày đúng · rút js/99e → sao kê về ô cũ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99e-o-no\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
   await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const s=atob(f.b), u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n));
       if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){}
         if(kq.loai==='hstd' && kq.ky==='2026-07'){ const k0 = await slDocFile(new File([u], 'mau31_dau.xlsx')); k0.ky = '2025-12'; k0.ngay = '2025-12-31'; k0.canKhai = false; const u0 = [...new Set(k0.rows.filter(o=>o.ku && (o.dn||0)>0 && !(o.qh>0) && !(o.kn>0) && ['01','02','05','06','07','18'].indexOf(String(o.ct||''))<0).map(o=>o.ku))].slice(0, 10); k0.rows.forEach(o=>{ if(u0.indexOf(o.ku)>=0){ o.ngdg = '2025-05-15'; o.ngn = '2024-01-15'; } }); const q0 = [...new Set(k0.rows.filter(o=>o.ku && (o.dn||0)>5e6 && !(o.kn>0)).map(o=>o.ku))].slice(5, 6); k0.rows.forEach(o=>{ if(q0.indexOf(o.ku)>=0) o.qh = 5e6; }); try{ await slGhi(k0); }catch(e){ window.LOI_NGAY = String(e); } }
         if(kq.loai==='hstd' && kq.ky==='2026-08'){ const k2 = await slDocFile(new File([u], 'mau31_ngay.xlsx')); k2.ky = '2026-09-10'; k2.ngay = '2026-09-10'; k2.canKhai = false;
           const N = '2026-09-10', ku = (f)=>[...new Set(k2.rows.filter(f).map(o=>o.ku))].slice(0, 2), ra = ku(o=>o.ku && slKHDLy(o, N)===''), vao = ku(o=>o.ku && slKHDLy(o, N)==='gd' && (o.dn||0)>0 && String(o.ct||'')!=='02');
           k2.rows.forEach(o=>{ if(ra.indexOf(o.ku)>=0) o.ngdg = '2026-09-05'; if(vao.indexOf(o.ku)>=0) o.ngdg = '2026-01-10'; }); const q3 = [...new Set(k2.rows.filter(o=>o.ku && (o.dn||0)>5e6 && !(o.kn>0)).map(o=>o.ku))].slice(5, 8); k2.rows.forEach(o=>{ if(q3.indexOf(o.ku)>=0) o.qh = 5e6; }); try{ await slGhi(k2); }catch(e){ window.LOI_NGAY = String(e); } } } }
     const ky = '2026-08'; D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
     for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await new Promise(z=>setTimeout(z, 250)); }, files);
   return p; };
 const p = await mo(false);
 const mong = await p.evaluate(async()=>{ const r = {}; for(const ky of ['2025-12', '2026-08', '2026-09-10']){ const B = await KHO.bo(ky), da = {}; let qh = 0, kn = 0, nq = 0, nk = 0, dn = 0;
     kcGoc(B).forEach(o=>{ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; dn += Math.round(o.dn||0); if(o.qh>0){ qh += Math.round(o.qh); nq++; } if(o.kn>0){ kn += Math.round(o.kn); nk++; } });
     r[ky] = {qh, kn, nq, nk, dn}; }
   const B = await KHO.bo('2026-09-10'), da = {}, toi = new Date('2026-09-10'); toi.setDate(toi.getDate()+120); const t = toi.toISOString().slice(0, 10); let hh = 0;
   kcGoc(B).forEach(o=>{ if(!o.ku || da[o.ku] || !(o.kn>0)) return; da[o.ku] = 1; if(o.nhh && o.nhh>='2026-09-10' && o.nhh<=t) hh++; }); r.hh = hh; return r; });
 const xem = (k)=>p.evaluate(async(k)=>{ const C = skCH(); C.bc = {}; C.bc[k] = 1; C.man = 'xem'; await skXem(); await new Promise(z=>setTimeout(z, 300)); const x = [].concat(SK_XEM||[])[0] || {}; return {tieu:x.tieuDe, aoa:x.aoa, html:x.html||''}; }, k);
 let r = await p.evaluate(()=>({nhom:SK_NHOM.map(n=>n.k).join(), xl:SK_BC.filter(b=>b.nhom==='xl').map(b=>b.k).join(), qh:SK_BC.filter(b=>b.nhom==='qh3').map(b=>b.k).join(), kn:SK_BC.filter(b=>b.nhom==='kn3').map(b=>b.k).join()}));
 ok('Sao kê: ô 🔴 Nợ quá hạn, 🟠 Nợ khoanh sau ô KHĐ; sao kê QH / chuyển QH / khoanh chuyển hẳn sang; ô Nợ cần xử lý còn KU chưa giải ngân', /^xl,khd3,qh3,kn3,/.test(r.nhom) && r.xl==='cgn' && r.qh==='qh_tq,qh_db,qh_ss,qh,cqh' && r.kn==='kn_tq,kn_db,kn_ss,kn_hh,kh', JSON.stringify(r));
 r = await xem('qh_tq'); let H = r.aoa[0], T = r.aoa[1], c = t=>H.indexOf(t); const h = mong['2026-09-10'], a = mong['2025-12'], tl = x=>x.dn ? x.qh/x.dn*100 : 0;
 ok('B1 Quá hạn Toàn PGD: món / dư nợ QH / tỷ lệ hiện tại và 31/12 = Mẫu 31 từng kỳ', T[c('Món hiện tại')]===h.nq && T[c('Dư nợ QH hiện tại')]===h.qh && Math.abs(T[c('Tỷ lệ hiện tại (%)')]-tl(h))<1e-9 && T[c('Dư nợ QH 31/12')]===a.qh && h.qh>0, JSON.stringify({T, h, a}).slice(0, 400));
 const ct = Math.min(tl(a), 0.08), dg = T[c('Đánh giá')];
 ok('B1 Quá hạn chỉ tiêu = min(tỷ lệ 31/12, 0,08%); Đánh giá đúng', Math.abs(T[c('Chỉ tiêu tỷ lệ (%)')]-ct)<1e-9 && (tl(h)<=ct+1e-9 ? dg==='Đạt' : /^Chưa đạt/.test(dg)) && /VB 180/.test(r.tieu), JSON.stringify({ct:T[c('Chỉ tiêu tỷ lệ (%)')], dg}));
 r = await xem('qh_db'); H = r.aoa[0]; T = r.aoa[1];
 ok('B2 Quá hạn: diễn biến dư nợ QH theo tháng, hiện tại = dư nợ QH', T[H.findIndex(x=>/^Hiện tại/.test(x))]===h.qh && /DIỄN BIẾN NỢ QUÁ HẠN/.test(r.tieu), JSON.stringify(T));
 r = await xem('qh_ss'); let tc = r.aoa.find(d=>d[1]==='Tổng cộng') || [];
 ok('B3 Quá hạn theo tổ: Tổng cộng = món / dư nợ QH T8 và hiện tại', tc[4]===mong['2026-08'].nq && tc[6]===h.nq && tc[7]===h.qh, JSON.stringify(tc));
 r = await xem('kn_tq'); H = r.aoa[0]; T = r.aoa[1]; c = t=>H.indexOf(t);
 ok('B1 Khoanh Toàn PGD: dư nợ khoanh hiện tại / 31/12 đúng; chỉ tiêu năm = 31/12 × 95%', T[c('Dư nợ hiện tại')]===h.kn && T[c('Dư nợ khoanh 31/12')]===a.kn && T[c('Chỉ tiêu năm (≤ dư nợ)')]===Math.round(a.kn*0.95) && h.kn>0, JSON.stringify({T, h, a}).slice(0, 300));
 r = await xem('kn_hh'); const n = r.aoa.filter(d=>typeof d[0]==='number').length;
 ok('B4 Khoanh: món hết hạn khoanh trong 120 ngày tới (theo Mẫu 31 hiện tại) đúng số', n===mong.hh, JSON.stringify({bc:n, mong:mong.hh}));
 r = await xem('kn_ss'); tc = r.aoa.find(d=>d[1]==='Tổng cộng') || [];
 ok('B3 Khoanh theo tổ: Tổng cộng hiện tại = món / dư nợ khoanh', tc[6]===h.nk && tc[7]===h.kn, JSON.stringify(tc));
 /* ô Nợ đến hạn: kết quả thu nợ đến hạn tháng trước (ước tính 2 Mẫu 31 chốt) */
 await p.evaluate(()=>{ const C = skCH(); C.ky = '2026-08'; });
 const dhM = await p.evaluate(async()=>{ const Bp = await KHO.bo('2026-07'), Bm = await KHO.bo('2026-08'), mon = {}, da = {}; let n = 0, den = 0, thu = 0, gh = 0;
   kcGoc(Bm).forEach(o=>{ if(o.ku && !mon[o.ku]) mon[o.ku] = o; });
   kcGoc(Bp).forEach(o=>{ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; if(!(o.dn>0) || o.qh>0 || o.kn>0) return; if(String(o.dhgd || o.dhgh || o.dhg || '').slice(0, 7)!=='2026-08') return;
     const o2 = mon[o.ku], con = o2 ? Math.round(o2.dn||0) : 0; n++; den += Math.round(o.dn); thu += Math.round(o.dn)-con; if(con>0 && !(o2.qh>0) && (o2.dhgh||'')>(o.dhgh||o.dhg||'') && (o2.dhgh||'')>'2026-08-31') gh += con; });
   return {n, den, thu, gh, dau:SK_BC.filter(b=>b.nhom==='dh')[0].k}; });
 r = await xem('dh_kq'); H = r.aoa[0]; T = r.aoa[1]; c = t=>H.indexOf(t);
 const tlM = dhM.den-dhM.gh>0 ? dhM.thu/(dhM.den-dhM.gh)*100 : null;
 ok('ô Nợ đến hạn: đầu ô "Kết quả thu nợ đến hạn tháng trước" — món / số tiền đến hạn T8 (theo Mẫu 31 T7), đã thu, tỷ lệ thu = đã thu / (đến hạn − gia hạn), chỉ tiêu ≥ 99%',
   dhM.dau==='dh_kq' && T[c('Món đến hạn')]===dhM.n && T[c('Số tiền đến hạn')]===dhM.den && T[c('Số tiền đã thu')]===dhM.thu && (tlM==null ? T[c('Tỷ lệ thu (%)')]==null : Math.abs(T[c('Tỷ lệ thu (%)')]-tlM)<1e-9) && T[c('Chỉ tiêu (%)')]===99 && /Ước tính/.test(r.html),
   JSON.stringify({T, dhM}).slice(0, 400));
 const q = await mo(true); r = await q.evaluate(()=>({k:typeof ONO, nhom:SK_NHOM.map(n=>n.k).join(), xl:SK_BC.filter(b=>b.nhom==='xl').map(b=>b.k).join()}));
 ok('rút js/99e: không còn 2 ô, sao kê QH / chuyển QH / khoanh về ô Nợ cần xử lý', r.k==='undefined' && !/qh3|kn3/.test(r.nhom) && /(^|,)qh(,|$)/.test(r.xl) && /(^|,)kh(,|$)/.test(r.xl) && /cqh/.test(r.xl), JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t420 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
