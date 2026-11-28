// t419 (3.567 → 3.570 — anh 28/11 "đơn giản theo xã, điểm GD biến động từ đầu năm qua các tháng" · "mũi tên / màu tăng giảm, hiện tại so kỹ, đối chiếu KH tỉnh (VB 180)" ·
//   "chia 1 ô" · "bỏ luôn bên nợ cần xử lý" · "khuôn A4 ngang, cột cơ bản đến chi tiết" · "theo VB 180"): ô Sao kê "📉 Món vay 3 tháng KHĐ" (js/99d OKHD + bộ máy js/99c DBT).
//   Dữ liệu GIẢ gianho31 (Mẫu 31 T7, T8) + Mẫu 31 31/12/2025 (dựng lại từ T7 giả) + Mẫu 31 THEO NGÀY 10/09/2026 (từ T8 giả, sửa ngày GD 2 món ra / 2 món vào KHĐ).
//   Ý: ô mới sau "Nợ cần xử lý", ô cũ không còn KHĐ · B1 số món hiện tại / tháng trước / 31/12 đúng, chỉ tiêu −30% & lộ trình quý, đổi % thì đổi chỉ tiêu ·
//   B2 cột tháng (tháng chưa nạp "—"), ▲▼ · B3 so sánh theo tổ: tổng = KHĐ 2 kỳ, số món thoát / mới đúng · B5 nguy cơ: đúng luật KHĐ ngày tương lai ·
//   sổ theo dõi dùng lại · lọc xã · rút js/99d → sao kê KHĐ về ô Nợ cần xử lý.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99d-o-khd\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
   await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
     for(const f of files){ const s=atob(f.b), u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n));
       if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){}
         if(kq.loai==='hstd' && kq.ky==='2026-07'){ const k0 = await slDocFile(new File([u], 'mau31_dau.xlsx')); k0.ky = '2025-12'; k0.ngay = '2025-12-31'; k0.canKhai = false; const u0 = [...new Set(k0.rows.filter(o=>o.ku && (o.dn||0)>0 && !(o.qh>0) && !(o.kn>0) && ['01','02','05','06','07','18'].indexOf(String(o.ct||''))<0).map(o=>o.ku))].slice(0, 10); k0.rows.forEach(o=>{ if(u0.indexOf(o.ku)>=0){ o.ngdg = '2025-05-15'; o.ngn = '2024-01-15'; } }); try{ await slGhi(k0); }catch(e){ window.LOI_NGAY = String(e); } }
         if(kq.loai==='hstd' && kq.ky==='2026-08'){ const k2 = await slDocFile(new File([u], 'mau31_ngay.xlsx')); k2.ky = '2026-09-10'; k2.ngay = '2026-09-10'; k2.canKhai = false;
           const N = '2026-09-10', ku = (f)=>[...new Set(k2.rows.filter(f).map(o=>o.ku))].slice(0, 2), ra = ku(o=>o.ku && slKHDLy(o, N)===''), vao = ku(o=>o.ku && slKHDLy(o, N)==='gd' && (o.dn||0)>0 && String(o.ct||'')!=='02');
           k2.rows.forEach(o=>{ if(ra.indexOf(o.ku)>=0) o.ngdg = '2026-09-05'; if(vao.indexOf(o.ku)>=0) o.ngdg = '2026-01-10'; }); try{ await slGhi(k2); }catch(e){ window.LOI_NGAY = String(e); } } } }
     const ky = '2026-08'; D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
     for(let i=0;i<80 && !(SK_K && SK_K.ky===ky);i++) await new Promise(z=>setTimeout(z, 250)); }, files);
   return p; };
 const p = await mo(false);
 const mong = await p.evaluate(async()=>{ const r = {}; for(const ky of ['2025-12', '2026-07', '2026-08', '2026-09-10']){ const B = await KHO.bo(ky), u = {};
     slDsNo(B, 'khd').forEach(x=>{ if(x.ku && !(x.ku in u)) u[x.ku] = Math.round(x.dn||0); }); r[ky] = {n:Object.keys(u).length, ku:u}; } return r; });
 const xem = (k, cfg)=>p.evaluate(async([k, cfg])=>{ const C = skCH(); Object.assign(C, cfg||{}); C.bc = {}; C.bc[k] = 1; C.man = 'xem'; let goi = 0; const bo = KHO.bo; KHO.bo = function(){ goi++; return bo.apply(this, arguments); };
   try{ await skXem(); } finally { KHO.bo = bo; } await new Promise(z=>setTimeout(z, 300)); const x = [].concat(SK_XEM||[])[0] || {}; return {goi, tieu:x.tieuDe, aoa:x.aoa, html:x.html||'', loiNgay:window.LOI_NGAY||''}; }, [k, cfg]);
 /* 1. bố cục danh mục */
 let r = await p.evaluate(()=>({nhom:SK_NHOM.map(n=>n.k).join(), xl:SK_BC.filter(b=>b.nhom==='xl').map(b=>b.k).join(), o:SK_BC.filter(b=>b.nhom==='khd3').map(b=>b.k+':'+b.kho).join(), ten:(SK_NHOM.find(n=>n.k==='khd3')||{}).ten}));
 ok('Sao kê: ô "📉 Món vay 3 tháng KHĐ" đầu nhóm nợ (sau Nợ cần xử lý; 3.571 bỏ ô đó); 6 bảng (3.571 + phân nhóm A/B/C; sao kê dọc giữ nguyên); ô Nợ cần xử lý không còn mục KHĐ', /^(ct180,)?(xl,)?khd3,/.test(r.nhom) && r.o==='khd_tq:ngang,khd_db:ngang,khd_ss:ngang,khd:doc,khd_abc:ngang,khd_ng:ngang' && !/khd/.test(r.xl||'') && /Món vay 3 tháng KHĐ/.test(r.ten), JSON.stringify(r));
 /* 2. B1 tổng quan + chỉ tiêu */
 r = await xem('khd_tq'); const H = r.aoa[0], T = r.aoa[1], c = t=>H.indexOf(t), n0 = mong['2025-12'].n, nh = mong['2026-09-10'].n, n8 = mong['2026-08'].n;
 const quy = Math.floor(n0*(1-0.30*3/4)), nam = Math.floor(n0*0.7);
 ok('B1 Toàn PGD: 31/12/2025 · tháng trước (T8) · hiện tại 10/09/2026 = KHĐ tự tính từng kỳ; ± so tháng trước / 31/12', !r.loiNgay && T[1]==='TOÀN PGD' && T[c('Món 31/12')]===n0 && T[c('Món tháng trước')]===n8 && T[c('Món hiện tại')]===nh && T[c('± so tháng trước')]===nh-n8 && T[c('± so 31/12')]===nh-n0 && n0>0 && nh>0,
   JSON.stringify({T, n0, n8, nh, loi:r.loiNgay}).slice(0, 400));
 ok('B1 chỉ tiêu VB 180: năm = 31/12 × 70%, đến quý III = 31/12 × (1 − 22,5%); Đánh giá Đạt / Tiếp tục phấn đấu đúng', T[c('Chỉ tiêu năm')]===nam && T[c('Chỉ tiêu đến quý')]===quy && (nh<=quy ? T[c('Đánh giá')]==='Đạt' : /^Tiếp tục phấn đấu \(còn giảm \d+\)$/.test(T[c('Đánh giá')])) && /VB 180/.test(r.tieu),
   JSON.stringify({ct:[T[c('Chỉ tiêu năm')], T[c('Chỉ tiêu đến quý')], T[c('Đánh giá')]], mong:[nam, quy]}));
 const xa = r.aoa.slice(2).filter(d=>/^Xã /.test(d[1])), diem = r.aoa.slice(2).filter(d=>/^Điểm GD /.test(d[1])), s = (ds, j)=>ds.reduce((a, d)=>a+(+d[j]||0), 0);
 ok('B1 hàng Toàn PGD › Xã › Điểm GD: cộng các xã = cộng các điểm = Toàn PGD', xa.length>0 && diem.length>=xa.length && s(xa, c('Món hiện tại'))===nh && s(diem, c('Món hiện tại'))===nh, JSON.stringify({xa:xa.length, diem:diem.length}));
 await p.evaluate(()=>{ D.cauHinh.khdCT = {pt:50}; }); r = await xem('khd_tq'); const T2 = r.aoa[1]; r.sua = await p.evaluate(()=>SK_BC.find(b=>b.k==='khd_tq').tuyChon());
 ok('đổi mức giảm 50% → chỉ tiêu năm = 31/12 × 50% (ô sửa ở thanh công cụ báo cáo, không nằm trong bản in)', T2[c('Chỉ tiêu năm')]===Math.floor(n0*0.5) && /data-lenh="okhd.pt"/.test(r.sua) && !/<input/.test(r.html), JSON.stringify(T2[c('Chỉ tiêu năm')]));
 await p.evaluate(()=>{ D.cauHinh.khdCT = {}; });
 /* 3. B2 diễn biến */
 r = await xem('khd_db'); const H2 = r.aoa[0], T3 = r.aoa[1], j = t=>H2.findIndex(h=>String(h).indexOf(t)===0);
 ok('B2 cột 31/12 · T1…T8 · Hiện tại: tháng chưa nạp (T1–T6) trống, T7/T8/hiện tại đúng, ± so 31/12', T3[j('31/12')]===n0 && T3[j('T1')]==='' && T3[j('T6')]==='' && T3[j('T7')]===mong['2026-07'].n && T3[j('T8')]===n8 && T3[j('Hiện tại')]===nh && T3[j('± so 31/12')]===nh-n0,
   JSON.stringify({H2, T3}).slice(0, 300));
 ok('B2 mũi tên ▲ đỏ / ▼ xanh khi số món đổi so tháng liền trước', (n8!==nh || n8!==mong['2026-07'].n) ? /[▲▼]/.test(r.html) : true);
 /* 4. B3 so sánh */
 r = await xem('khd_ss'); const tc = r.aoa.find(d=>d[1]==='Tổng cộng') || [];
 const moi = Object.keys(mong['2026-09-10'].ku).filter(k=>!(k in mong['2026-08'].ku)).length, ra = Object.keys(mong['2026-08'].ku).filter(k=>!(k in mong['2026-09-10'].ku)).length;
 ok('B3 theo Hội / Tổ trưởng: Tổng cộng = KHĐ T8 và hiện tại, chênh lệch đúng', tc[4]===n8 && tc[6]===nh && tc[8]===nh-n8, JSON.stringify(tc));
 ok('B3 tóm tắt: số món đã GD lại / tất nợ và số món mới phát sinh = đúng tập KU', new RegExp('<b>'+ra+' món</b> đã giao dịch trở lại').test(r.html) && new RegExp('<b>'+moi+' món</b> mới phát sinh').test(r.html) && ra===2, JSON.stringify({ra, moi, h:r.html.slice(0, 300)}));
 /* 5. B5 nguy cơ */
 r = await xem('khd_ng'); const kt = await p.evaluate(async()=>{ const B = DBT.hienB, ngay = '2026-09-10', den = slCongThang(ngay, 2), da = {}, ds = [];
   kcGoc(B).forEach(o=>{ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; if((o.qh||0)>0 || (o.kn||0)>0 || slKHDLy(o, ngay)!=='gd') return; const moc = o.ngdg || o.ngn; if(!moc || slCongThang(moc, 3)>den || slKHDLy(o, den)!=='') return; ds.push(o.ku); });
   return {n:ds.length}; });
 const nNg = r.aoa.length-1-(r.aoa.some(d=>/^Tổng cộng/.test(d[1])) ? 1 : 0);
 ok('B5 món chậm nộp lãi sẽ thành KHĐ trong 2 tháng: đúng luật KHĐ ngày tương lai, không gồm món đã KHĐ / quá hạn / khoanh', nNg===kt.n && /nguy cơ|NGUY CƠ/.test(r.tieu), JSON.stringify({bc:nNg, mong:kt.n}));
 /* 5b. phân nhóm A/B/C */
 r = await xem('khd_abc'); const ab = r.aoa.filter(d=>typeof d[0]==='number');
 ok('phân nhóm A/B/C: đủ mọi món KHĐ hiện tại; nhóm A chỉ món mới (không có ở T8) lãi tồn < 6 tháng lãi, C ≥ 12 tháng lãi', ab.length===nh && ab.every(d=>['A', 'B', 'C', '?'].indexOf(d[10])>=0) &&
   ab.every(d=>d[10]!=='C' || d[9]>=12) && ab.every(d=>d[10]!=='A' || d[9]<6) && /PHÂN NHÓM/.test(r.tieu), JSON.stringify({n:ab.length, nh, nhom:ab.map(d=>d[10]+':'+d[9]).join(' ')}).slice(0, 300));
 /* 6. sổ theo dõi */
 await p.evaluate(()=>{ DBT.S = {}; }); r = await xem('khd_tq');
 ok('mở lại (bộ nhớ trống) → đọc sổ theo dõi trên máy: chỉ dựng lại bộ Mẫu 31 hiện tại (cho B5)', r.goi===1 && r.aoa[1][c('Món hiện tại')]===nh, JSON.stringify({goi:r.goi}));
 /* 7. lọc xã */
 const xa1 = await p.evaluate(()=>KHO.dsToKy(SK_K).find(x=>!x.trucTiep).xa); r = await xem('khd_tq', {xa:xa1}); const x2 = r.aoa.slice(2).filter(d=>/^Xã /.test(d[1]));
 ok('lọc Xã của Sao kê → 1 xã, Toàn PGD = xã đó', x2.length===1 && r.aoa[1][c('Món hiện tại')]===x2[0][c('Món hiện tại')], JSON.stringify(x2.length));
 await p.evaluate(()=>{ skCH().xa = ''; });
 r = await p.evaluate(()=>OKHD.thangLai({dn:12e6, ltTH:2e5}, 1.2));
 ok('3.576 QT-C-23: số tháng lãi = lãi tồn ÷ (dư nợ × lãi suất %/năm ÷ 100 ÷ 12), kể cả lãi suất ≤ 2', Math.abs(r-200000/12000)<1e-9, String(r));
 /* 8. rút js/99d */
 const q = await mo(true); r = await q.evaluate(()=>({k:typeof OKHD, nhom:SK_NHOM.some(n=>n.k==='khd3'), xl:SK_BC.filter(b=>b.nhom==='xl').map(b=>b.k).join()}));
 ok('rút js/99d: không còn ô KHĐ, sao kê KHĐ về lại ô Nợ cần xử lý', r.k==='undefined' && !r.nhom && /(^|,)khd(,|$)/.test(r.xl), JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t419 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
