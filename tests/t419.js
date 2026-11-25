// t419 (3.567 — anh 25/11 "báo cáo theo dõi món vay 3 tháng KHĐ theo xã, điểm giao dịch, hội đoàn thể diễn biến theo từng tháng, đầu năm, riêng hiện tại lấy dữ liệu ngày gần nhất"
//   · "chức năng quan trọng có thể theo dõi nhiều sau này"): 📈 bộ máy diễn biến theo tháng (js/99c DBT), chỉ tiêu KHĐ.
//   Dữ liệu GIẢ gianho31 (Mẫu 31 T7, T8) + 1 bản Mẫu 31 THEO NGÀY 10/09/2026 (dựng lại từ file T8 giả). Ý: cột Đầu năm / T1…T8 / Hiện tại (ngày gần nhất) — tháng chưa nạp "—";
//   số món + dư nợ từng kỳ = KHĐ tự tính từ Mẫu 31 kỳ đó · Tổng = cộng các xã = cộng các Hội · Mới / Thoát so T8 đúng tập KU · sổ theo dõi: mở lại không dựng lại Mẫu 31,
//   đổi Mẫu 31 (mã băm) → tự tính lại · lọc Xã · Excel 2 dòng tiêu đề · rút js/99c → Sao kê như cũ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99c-dien-bien\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
   await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const s=atob(f.b), u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n));
       if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){}
         if(kq.loai==='hstd' && kq.ky==='2026-08'){ const k2 = await slDocFile(new File([u], 'mau31_ngay.xlsx')); k2.ky = '2026-09-10'; k2.ngay = '2026-09-10'; k2.canKhai = false;
           /* bản ngày 10/09: 2 món KHĐ có giao dịch lại (→ thoát), 2 món đang hoạt động thành KHĐ (→ mới) */
           const N = '2026-09-10', ku = (f)=>[...new Set(k2.rows.filter(f).map(o=>o.ku))].slice(0, 2), ra = ku(o=>o.ku && slKHDLy(o, N)===''), vao = ku(o=>o.ku && slKHDLy(o, N)==='gd' && (o.dn||0)>0 && String(o.ct||'')!=='02');
           k2.rows.forEach(o=>{ if(ra.indexOf(o.ku)>=0) o.ngdg = '2026-09-05'; if(vao.indexOf(o.ku)>=0) o.ngdg = '2026-01-10'; }); window.DOI = {ra, vao}; try{ await slGhi(k2); }catch(e){ window.LOI_NGAY = String(e); } } } }
     const ky = '2026-08'; D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
     for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await new Promise(z=>setTimeout(z, 250)); }, files);
   return p; };
 const p = await mo(false);
 /* mong đợi tính độc lập: KHĐ từng kỳ từ Mẫu 31 kỳ đó */
 const mong = await p.evaluate(async()=>{ const r = {}; for(const ky of ['2026-07', '2026-08', '2026-09-10']){ const B = await KHO.bo(ky), ds = slDsNo(B, 'khd'), u = {};
     ds.forEach(x=>{ if(x.ku && !(x.ku in u)) u[x.ku] = Math.round(x.dn||0); }); r[ky] = {n:Object.keys(u).length, dn:Object.values(u).reduce((a, v)=>a+v, 0), ku:u}; }
   return r; });
 const xem = (cfg)=>p.evaluate(async(cfg)=>{ const C = skCH(); Object.assign(C, cfg||{}); C.bc = {db_khd:1}; C.man = 'xem'; let goi = 0; const bo = KHO.bo; KHO.bo = function(){ goi++; return bo.apply(this, arguments); };
   try{ await skXem(); } finally { KHO.bo = bo; } await new Promise(z=>setTimeout(z, 300));
   const x = [].concat(SK_XEM||[]).find(y=>/DIỄN BIẾN/.test(y.tieuDe||'')) || {}; return {goi, tieu:x.tieuDe, aoa:x.aoa, html:(x.html||'').length, coBC:SK_BC.some(b=>b.k==='db_khd' && b.nhom==='xl'), ngay:x.ngay, loiNgay:window.LOI_NGAY||''}; }, cfg);
 let r = await xem();
 const H = r.aoa ? r.aoa[0] : [], T = r.aoa ? r.aoa[2] : [], col = t=>H.findIndex(h=>String(h).indexOf(t)===0);
 ok('Sao kê › Nợ cần xử lý: "Diễn biến món vay 3 tháng KHĐ" — cột Đầu năm · T1…T8 · Hiện tại (Mẫu 31 ngày 10/09/2026) · Tăng/giảm · Mới · Thoát',
   r.coBC && /NĂM 2026/.test(r.tieu||'') && col('Đầu năm')===1 && col('T8 ')>0 && col('Hiện tại (10/09/2026)')>0 && col('Mới KHĐ')>0 && col('Thoát KHĐ')>0 && !r.loiNgay, JSON.stringify({H, loi:r.loiNgay}).slice(0, 400));
 const v = (t, d)=>T[col(t)+(d||0)];
 ok('tháng chưa nạp Mẫu 31 (Đầu năm, T1…T6) → ô trống ("—"), không đoán', v('Đầu năm')==='' && v('T1 ')==='' && v('T6 ')==='', JSON.stringify([v('Đầu năm'), v('T1 '), v('T6 ')]));
 ok('Tổng: số món + dư nợ T7 / T8 / Hiện tại = KHĐ tự tính từ Mẫu 31 từng kỳ', v('T7 ')===mong['2026-07'].n && v('T7 ', 1)===mong['2026-07'].dn && v('T8 ')===mong['2026-08'].n && v('T8 ', 1)===mong['2026-08'].dn && v('Hiện tại')===mong['2026-09-10'].n && v('Hiện tại', 1)===mong['2026-09-10'].dn && mong['2026-09-10'].n>0,
   JSON.stringify({bc:[v('T7 '), v('T8 '), v('Hiện tại')], mong:[mong['2026-07'].n, mong['2026-08'].n, mong['2026-09-10'].n]}));
 const mM = Object.keys(mong['2026-09-10'].ku).filter(k=>!(k in mong['2026-08'].ku)), mT = Object.keys(mong['2026-08'].ku).filter(k=>!(k in mong['2026-09-10'].ku));
 ok('Mới / Thoát KHĐ (hiện tại so T8) = đúng tập số KU', v('Mới KHĐ')===mM.length && v('Mới KHĐ', 1)===mM.reduce((a, k)=>a+mong['2026-09-10'].ku[k], 0) && v('Thoát KHĐ')===mT.length && mT.length===2 && mM.length>=1, JSON.stringify({bc:[v('Mới KHĐ'), v('Thoát KHĐ')], mong:[mM.length, mT.length]}));
 ok('Tăng/giảm so đầu năm: đầu năm chưa nạp → "—"', v('Tăng/giảm')==='', v('Tăng/giảm'));
 /* cộng dọc: Tổng = cộng các xã = cộng các Hội */
 const dong = r.aoa.slice(3), xa = dong.filter(d=>/^Xã /.test(d[0])), hoi = dong.filter(d=>!/^(Xã |Điểm |TỔNG)/.test(d[0])), i = col('Hiện tại'), s = (ds, j)=>ds.reduce((a, d)=>a+(+d[j]||0), 0);
 ok('cây Xã › Điểm GD › Hội: Tổng = cộng các xã = cộng các dòng Hội (món + dư nợ)', xa.length>0 && hoi.length>xa.length && s(xa, i)===T[i] && s(hoi, i)===T[i] && s(hoi, i+1)===T[i+1], JSON.stringify({xa:xa.length, hoi:hoi.length, t:T[i], sx:s(xa, i), sh:s(hoi, i)}));
 /* sổ theo dõi */
 r = await p.evaluate(()=>{ DBT.S = {}; return 1; }); r = await xem();
 ok('mở lại (bộ nhớ trống) → đọc sổ theo dõi trên máy, không dựng lại Mẫu 31', r.goi===0 && r.aoa[2][col('Hiện tại')]===T[col('Hiện tại')], JSON.stringify({goi:r.goi}));
 r = await p.evaluate(()=>{ DBT.S = {}; KHO.bang('hstd', '2026-08').hash = 'doi-file'; return 1; }); r = await xem();
 ok('đổi Mẫu 31 T8 (mã băm khác) → chỉ tính lại kỳ T8', r.goi===1, JSON.stringify({goi:r.goi}));
 /* lọc xã */
 const xa1 = await p.evaluate(()=>{ const t = KHO.dsToKy(SK_K).find(x=>!x.trucTiep); return t.xa; });
 r = await xem({xa:xa1}); const T2 = r.aoa[2], x2 = r.aoa.slice(3).filter(d=>/^Xã /.test(d[0]));
 ok('lọc Xã của Sao kê → chỉ 1 xã, Tổng = xã đó, nhỏ hơn toàn PGD', x2.length===1 && T2[i]===x2[0][i] && T2[i]<T[i], JSON.stringify({n:x2.length, t:T2[i], T:T[i]}));
 await p.evaluate(()=>{ const C = skCH(); C.xa = ''; });
 /* rút */
 const q = await mo(true);
 r = await q.evaluate(()=>({k:typeof DBT, bc:SK_BC.some(b=>b.k==='db_khd'), khd:SK_BC.some(b=>b.k==='khd')}));
 ok('rút js/99c: không còn báo cáo diễn biến, sao kê KHĐ cũ vẫn còn', r.k==='undefined' && !r.bc && r.khd, JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t419 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
