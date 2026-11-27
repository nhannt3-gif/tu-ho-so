// t421 (3.571 — danh sách anh duyệt 28/11 mục 6 "bảng đối chiếu toàn bộ chỉ tiêu VB 180 theo xã / điểm GD"): ô Sao kê 🎯 Chỉ tiêu VB 180 (js/99f CT180).
//   Dữ liệu GIẢ như t419 / t420. Ý: ô đứng đầu, 1 bảng · Toàn PGD: KHĐ = số món hiện tại, tỷ lệ QH = Mẫu 31, tiết kiệm = tổ viên còn dư nợ có TK 105 ≥ 10.000 đ / tổ viên còn dư nợ ·
//   có đủ hàng Xã › Điểm (cả nơi không có KHĐ) · cột "Số chỉ tiêu đạt" · rút js/99f → mất ô, phần khác không đổi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99f-ct180\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
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
 const mong = await p.evaluate(async()=>{ const B = await KHO.bo('2026-09-10'), u = {}; slDsNo(B, 'khd').forEach(x=>{ if(x.ku) u[x.ku] = 1; });
   const da = {}; let qh = 0, dn = 0; kcGoc(B).forEach(o=>{ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; dn += Math.round(o.dn||0); if(o.qh>0) qh += Math.round(o.qh); });
   const B8 = SK_K.B, kh = {}, gap = {}; kcGoc(B8).concat((B8.lap||[]).filter(o=>!o._huy)).forEach(o=>{ if(!o.kh) return; const c = kh[o.kh] = kh[o.kh] || {dn:0, t:0, to:toMaCua(o)}; if(o.ku && o.dn>0) c.dn += o.dn; const s = String(o.stk==null ? '' : o.stk).trim(); if(s && !gap[s]){ gap[s] = 1; c.t += +o.t105||0; } });
   let n = 0, du = 0; const to = {}; KHO.dsToKy(SK_K).forEach(t=>{ if(!t.trucTiep) to[t.ma] = 1; }); Object.values(kh).forEach(c=>{ if(c.dn>0 && to[c.to]){ n++; if(c.t>=10000) du++; } });
   return {khd:Object.keys(u).length, tl:dn ? qh/dn*100 : 0, tk:n ? du/n*100 : null, diem:new Set(KHO.dsToKy(SK_K).filter(t=>!t.trucTiep).map(t=>t.xa+'|'+t.khoaDiem)).size}; });
 let r = await p.evaluate(async()=>{ const C = skCH(); C.bc = {ct180:1}; C.man = 'xem'; await skXem(); await new Promise(z=>setTimeout(z, 300)); const x = [].concat(SK_XEM||[])[0] || {};
   return {nhom:SK_NHOM[0].k, n:SK_BC.filter(b=>b.nhom==='ct180').length, tieu:x.tieuDe, aoa:x.aoa}; });
 const H = r.aoa[0], T = r.aoa[1], c = t=>H.indexOf(t), vn = v=>+String(v).replace(/[.%]/g, '').replace(',', '.');
 ok('ô 🎯 Chỉ tiêu VB 180 đứng đầu Sao kê, 1 bảng', r.nhom==='ct180' && r.n===1 && /CV 180/.test(r.tieu), JSON.stringify({nhom:r.nhom, n:r.n}));
 ok('Toàn PGD: món vay 3 tháng KHĐ = số món hiện tại (Mẫu 31 ngày gần nhất)', T[1]==='TOÀN PGD' && vn(T[c('Món vay 3 tháng KHĐ — kết quả')])===mong.khd, JSON.stringify({bc:T[c('Món vay 3 tháng KHĐ — kết quả')], mong:mong.khd}));
 ok('Toàn PGD: tỷ lệ nợ quá hạn = dư nợ QH / tổng dư nợ', Math.abs(vn(T[c('Tỷ lệ nợ quá hạn — kết quả')])-Math.round(mong.tl*100)/100)<0.006, JSON.stringify({bc:T[c('Tỷ lệ nợ quá hạn — kết quả')], mong:mong.tl}));
 ok('Toàn PGD: tổ viên gửi TK ≥ 10.000 đ / tổ viên còn dư nợ (kỳ Sao kê)', mong.tk==null ? T[c('Tổ viên gửi TK ≥ 10.000 đ — kết quả')]==='—' : Math.abs(vn(T[c('Tổ viên gửi TK ≥ 10.000 đ — kết quả')])-Math.round(mong.tk*10)/10)<0.06, JSON.stringify({bc:T[c('Tổ viên gửi TK ≥ 10.000 đ — kết quả')], mong:mong.tk}));
 const diem = r.aoa.slice(2).filter(d=>/^Điểm GD /.test(d[1])).length;
 ok('đủ hàng mọi điểm GD có tổ (không chỉ nơi có KHĐ); cột Số chỉ tiêu đạt dạng a/b', diem===mong.diem && /^\d+\/\d+$/.test(T[c('Số chỉ tiêu đạt')]), JSON.stringify({diem, mong:mong.diem, dat:T[c('Số chỉ tiêu đạt')]}));
 const q = await mo(true); r = await q.evaluate(()=>({k:typeof CT180, nhom:SK_NHOM.some(n=>n.k==='ct180'), khd:SK_NHOM.some(n=>n.k==='khd3')}));
 ok('rút js/99f: mất ô Chỉ tiêu VB 180, các ô khác vẫn còn', r.k==='undefined' && !r.nhom && r.khd, JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t421 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
