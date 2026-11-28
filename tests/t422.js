// t422 (3.573 — anh 28/11 duyệt kế hoạch phần KQGD + "Code và gộp"): ô Sao kê 📋 Kết quả giao dịch (js/99g OKQ), khuôn mục 1, 6 "Nội dung họp giao ban".
//   Dữ liệu GIẢ như t419–t421 (Mẫu 31 chốt T7, T8). Ý: ô trước nhóm Thông tin tổ, gồm theo Hội · biến động · KQGD chi tiết (chuyển từ Thông tin tổ) · đối chiếu PDF ·
//   theo Hội: cộng các điểm = tổng dư nợ Mẫu 31 chốt T8, tỷ trọng Hội cộng 100%, số tổ đúng · biến động: tháng trước = Mẫu 31 T7, ± đúng · rút js/99g → 2 báo cáo về chỗ cũ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async (rut)=>{ const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/99g-o-kqgd\.js/, r=>r.fulfill({status:200, contentType:'text/javascript', body:''}));
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
 const mong = await p.evaluate(async()=>{ const tong = async ky=>{ const B = await KHO.bo(ky), da = {}; let dn = 0; kcGoc(B).forEach(o=>{ if(!o.ku || da[o.ku]) return; da[o.ku] = 1; dn += o.dn||0; }); return Math.round(dn); };
   return {t8:await tong('2026-08'), t7:await tong('2026-07'), to:KHO.dsToKy(SK_K).length}; });
 const xem = (k)=>p.evaluate(async(k)=>{ const C = skCH(); C.ky = '2026-08'; C.bc = {}; C.bc[k] = 1; C.man = 'xem'; await skXem(); await new Promise(z=>setTimeout(z, 300)); const x = [].concat(SK_XEM||[]); return {tieu:x[0] && x[0].tieuDe, aoa:x[0] && x[0].aoa, n:x.length, loi:x.some(y=>/lỗi/i.test(y.html||''))}; }, k);
 let r = await p.evaluate(()=>({nhom:SK_NHOM.map(n=>n.k).join(), kq:SK_BC.filter(b=>b.nhom==='kq3').map(b=>b.k).join(), tt:SK_BC.filter(b=>b.nhom==='tt').map(b=>b.k).join()}));
 ok('ô 📋 Kết quả giao dịch ngay trước Thông tin tổ: theo Hội · biến động · KQGD chi tiết + đối chiếu PDF (chuyển hẳn từ Thông tin tổ)', /kq3,tt/.test(r.nhom) && r.kq==='kq_hoi,kq_bd,kqgd,kqgd31' && !/kqgd/.test(r.tt), JSON.stringify(r));
 r = await xem('kq_hoi'); const cd = r.aoa.filter(d=>/^Cộng điểm /.test(d[1])), s = (ds, j)=>ds.reduce((a, d)=>a+(+d[j]||0), 0);
 ok('Theo Hội: cộng dư nợ các điểm = tổng dư nợ Mẫu 31 chốt T8; số tổ cộng = số tổ kỳ', cd.length>0 && Math.abs(s(cd, 6)-mong.t8)<2 && s(cd, 2)===mong.to, JSON.stringify({dn:s(cd, 6), mong:mong.t8, to:s(cd, 2), mto:mong.to}));
 /* trong 1 điểm: cộng Hội = Cộng điểm, tỷ trọng Hội ≈ 100% */
 let i0 = r.aoa.findIndex(d=>/^Điểm GD /.test(d[1])), i1 = r.aoa.findIndex((d, i)=>i>i0 && /^Cộng điểm /.test(d[1])), hoi = r.aoa.slice(i0+1, i1);
 ok('Trong 1 điểm: cộng các Hội = dòng Cộng điểm; tỷ trọng các Hội cộng ≈ 100%', hoi.length>0 && Math.abs(s(hoi, 6)-r.aoa[i1][6])<2 && Math.abs(s(hoi, 7)-100)<0.1, JSON.stringify({hoi:hoi.length, tt:s(hoi, 7)}));
 r = await xem('kq_bd'); const cb = r.aoa.filter(d=>/^Cộng điểm /.test(d[1]));
 ok('Biến động: dư nợ kỳ này = Mẫu 31 T8, tháng trước = Mẫu 31 T7, ± = chênh lệch', Math.abs(s(cb, 4)-mong.t8)<2 && Math.abs(s(cb, 5)-mong.t7)<2 && Math.abs(s(cb, 6)-(mong.t8-mong.t7))<4 && /BIẾN ĐỘNG/.test(r.tieu), JSON.stringify({kn:s(cb, 4), tt:s(cb, 5), mong}));
 r = await xem('kqgd');
 ok('KQGD chi tiết từng tổ (chuyển vào ô) vẫn lập được, mỗi điểm 1 trang', r.n>=1 && /KẾT QUẢ GIAO DỊCH/.test(r.tieu||'') && !r.loi, JSON.stringify({n:r.n, tieu:r.tieu}));
 const q = await mo(true); r = await q.evaluate(()=>({k:typeof OKQ, nhom:SK_NHOM.some(n=>n.k==='kq3'), tt:SK_BC.filter(b=>b.nhom==='tt').map(b=>b.k).join()}));
 ok('rút js/99g: mất ô, KQGD chi tiết + đối chiếu PDF về nhóm Thông tin tổ', r.k==='undefined' && !r.nhom && /(^|,)kqgd(,|$)/.test(r.tt) && /kqgd31/.test(r.tt), JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t422 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
