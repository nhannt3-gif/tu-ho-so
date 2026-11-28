// t424 (3.577 — A1 bảng chia việc VIEC_CHUNG 28/11 "Sao kê toàn PGD nhanh lại, Excel / In vẫn đủ"): khung xem báo cáo dài chỉ dựng 20 trang đầu.
//   Dữ liệu GIẢ lớn tests/gia31 (25.057 món). Ý: Sao kê theo chương trình toàn PGD → khung xem ≤ 20 trang, báo "Xem nhanh … / khoảng N trang", nhanh hơn hẳn ·
//   bản đã cắt dòng (> 400 KB) — trang in báo bấm 🖨 In · 🖨 In trong khung → nạp lại bản đủ rồi mới in (đủ trang, trang 1 giống bản xem nhanh) · "Xem đủ" ra đủ trang ·
//   ước số trang sát số thật (± 5%) · khung in ẩn (inChuan không xem) không cắt · báo cáo ngắn không có dòng "Xem nhanh" · bản < 400 KB mà > 20 trang: In dựng đủ ngay trong khung.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gia31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const ctx = await b.newContext({viewport:{width:1366, height:800}});
 await ctx.addInitScript(()=>{ window.print = function(){ try{ (window.top.__in = window.top.__in || []).push(window.TR_SO); }catch(e){} }; });
 const p = await ctx.newPage(); p.on('pageerror', e=>loi.push(e.message)); await p.route(/accounts\.google|apis\.google/, r=>r.abort());
 await require('./tv.js')(p); await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1; let ky = '';
   for(const f of files){ const s=atob(f.b), u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} if(kq.loai==='hstd') ky = kq.ky; } }
   D.cauHinh.slTab = 'sk'; doiNgan(7); const C = skCH(); C.ky = ky; C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; veSaoKe();
   for(let i=0;i<120 && !(SK_K && SK_K.ky===ky);i++) await new Promise(z=>setTimeout(z, 250)); }, files);
 const w = ms=>p.waitForTimeout(ms);
 const xem = async k=>p.evaluate(async k=>{ const C = skCH(); C.bc = {}; C.bc[k] = 1; C.man = 'xem'; veSaoKe(); await new Promise(z=>setTimeout(z, 300));
   const f = document.getElementById('sk-xem-khung'), t0 = performance.now(); await skXem();
   for(let i=0;i<600 && !(f.contentWindow && f.contentWindow.TR_XONG);i++) await new Promise(z=>setTimeout(z, 50));
   const W = f.contentWindow, d = f.contentDocument; return {ms:Math.round(performance.now()-t0), so:W.TR_SO, cat:W.TR_CAT, uoc:W.TR_UOC, bao:(d.getElementById('tr-cat')||{}).textContent||'', rut:d.body.classList.contains('tr-rut'),
     t1:(d.querySelector('#tr-ds .tr-tg')||{}).textContent||'', goc:(f.trGoc||'').length}; }, k);
 const cho = async()=>{ for(let i=0;i<1200;i++){ const x = await p.evaluate(()=>{ const f = document.getElementById('sk-xem-khung'); return f && f.contentWindow && f.contentWindow.TR_XONG && !/Đang dựng/.test((f.contentDocument.getElementById('tr-cat')||{}).textContent||''); }); if(x) return; await w(100); } };
 const bam = async l=>{ await p.evaluate(l=>{ const d = document.getElementById('sk-xem-khung').contentDocument; d.querySelector('#tr-thanh [data-l="'+l+'"]').click(); }, l); await w(500); await cho(); await w(300); };
 const tt = async()=>p.evaluate(()=>{ const f = document.getElementById('sk-xem-khung'), W = f.contentWindow, d = f.contentDocument; return {so:W.TR_SO, cat:W.TR_CAT, t1:(d.querySelector('#tr-ds .tr-tg')||{}).textContent||'', in:window.__in||[]}; });
 /* 1. xem nhanh */
 const a = await xem('ct');
 ok('Sao kê theo CT toàn PGD (bộ giả 25k món): khung xem 20 trang đầu, báo "Xem nhanh … / khoảng N trang"', a.so===20 && a.cat===true && /Xem nhanh 20 trang đầu \/ khoảng \d+ trang/.test(a.bao), JSON.stringify(a).slice(0, 300));
 ok('bản dài (> 400 KB) cắt dòng trước khi nạp khung (tr-rut), dưới 8 s (trước 3.577 ≈ 25 s)', a.rut && a.goc>4e6 && a.ms<8000, JSON.stringify({rut:a.rut, goc:a.goc, ms:a.ms}));
 /* 2. In trong khung → nạp lại bản đủ rồi in */
 await bam('in'); const c = await tt();
 ok('🖨 In trong khung xem nhanh → nạp lại bản đủ rồi in (đủ trang, không còn xem nhanh)', c.in.length===1 && c.in[0]>20 && c.cat===false && c.so===c.in[0], JSON.stringify({in:c.in, so:c.so, cat:c.cat}));
 ok('ước số trang sát số thật (± 5%)', Math.abs(a.uoc-c.so)<=c.so*0.05, JSON.stringify({uoc:a.uoc, that:c.so}));
 ok('trang 1 bản đủ giống trang 1 bản xem nhanh', c.t1===a.t1 && c.t1.length>100, JSON.stringify([a.t1.slice(0, 80), c.t1.slice(0, 80)]));
 /* 3. Xem đủ */
 await xem('ct'); await bam('du'); const e = await tt();
 ok('"Xem đủ" → dựng đủ trang để xem, không in', e.so===c.so && e.cat===false && e.in.length===1, JSON.stringify({so:e.so, in:e.in.length}));
 /* 4. khung in ẩn không cắt, báo cáo ngắn không báo */
 const g = await p.evaluate(()=>{ const h = skHTMLIn(SK_XEM), x = inChuan(h); return {lech:Math.abs(x.length-h.length)<200000, rut:/"bot":/.test(x)}; });
 ok('khung in ẩn (inChuan không xem) giữ đủ dòng, không cắt', g.lech && !g.rut, JSON.stringify(g));
 const n = await xem('ct180');
 ok('báo cáo ngắn (VB 180): không cắt, không có dòng "Xem nhanh"', !n.cat && !n.rut && !n.bao, JSON.stringify(n).slice(0, 200));
 /* 5. bản < 400 KB mà > 20 trang: In dựng đủ ngay trong khung */
 const s = await p.evaluate(async()=>{ const f = document.getElementById('sk-xem-khung'); let r = ''; for(let i=1;i<=1300;i++) r += '<tr><td>'+i+'</td><td>Dòng giả '+i+'</td></tr>';
   const h = '<!doctype html><html><head><meta charset="utf-8"><style>@page{size:A4 portrait;margin:20mm 15mm 20mm 30mm}</style></head><body><div class="trang doc"><table><thead><tr><th>Stt</th><th>Nội dung</th></tr></thead><tbody>'+r+'</tbody></table></div></body></html>';
   window.__in = []; xemChuan(f, h); for(let i=0;i<400 && !(f.contentWindow && f.contentWindow.TR_XONG && f.contentDocument.getElementById('tr-cat'));i++) await new Promise(z=>setTimeout(z, 50)); await new Promise(z=>setTimeout(z, 300));
   const W = f.contentWindow, d = f.contentDocument, x = {len:h.length, so:W.TR_SO, cat:W.TR_CAT, rut:d.body.classList.contains('tr-rut')}; d.querySelector('#tr-thanh [data-l="in"]').click(); await new Promise(z=>setTimeout(z, 300));
   x.in = window.__in; x.so2 = W.TR_SO; return x; });
 ok('bản < 400 KB nhưng > 20 trang: xem 20 trang, không cắt dòng; 🖨 In dựng đủ ngay trong khung rồi in', s.so===20 && s.cat && !s.rut && s.in.length===1 && s.in[0]>20 && s.so2===s.in[0], JSON.stringify(s));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t424 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
