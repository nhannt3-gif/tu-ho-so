// t269 (TK 3, 3.373 — RA_SOAT_BO_CUC_2510 Đợt A ① ② ③ ⑥, anh 26/10 "gom làm 1 lần"): js/69-bo-cuc-a.js (cắm rút) — khung xem phải thu khi chưa chọn mục,
//   bấm mục mở lại; đầu trang ghi đường dẫn tab; huy hiệu Nạp & KT đỏ chỉ khi đang trong kỳ phải nạp; chip lọc "N văn bản khai thiếu". Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e=>loi.push(e.message)); await p.route(/accounts\.google|googleapis/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(2500);
 await p.evaluate(()=>{ try{ dongHop(); }catch(e){} D.vanBan = []; for(let i=0;i<6;i++) D.vanBan.push({id:'v'+i, ten:'VB giả '+i, soHieu:i+'/QĐ-GIA', trichYeu:'Trích yếu giả '+i, ngay:'2026-09-0'+(i+1), nhom:'vanBan', mang:'Tín dụng', ctrinh:i<4 ? ['HN'] : [], the:i<4 ? ['giả'] : []}); doiNgan(1); });
 await p.waitForTimeout(800);
 const w = ()=>p.evaluate(()=>{ const ds = document.getElementById('ds-vb').getBoundingClientRect(), cp = document.getElementById('cotphai'); return {ds:Math.round(ds.width), cp:getComputedStyle(cp).visibility, gon:document.querySelector('.than').classList.contains('bca-pvgon')}; });
 let a = await w();
 ok('① chưa chọn văn bản → khung xem phải thu lại, danh sách rộng gần hết màn (> 1000 px)', a.gon && a.cp==='hidden' && a.ds>1000, JSON.stringify(a));
 await p.click('#ds-vb .d2'); await p.waitForTimeout(800); const b1 = await w();
 ok('① bấm 1 văn bản → khung xem mở ra như cũ (hiện tên mục)', !b1.gon && b1.cp==='visible' && b1.ds<1000 && /VB giả/.test(await p.textContent('#cp-ten')), JSON.stringify(b1));
 /* nút ▣ Xem trước góc trên phải khi khung xem ẩn (anh 26/10) */
 const nut = ()=>p.evaluate(()=>{ const b = document.getElementById('bca-pv-nut'), r = b && b.getBoundingClientRect(), cp = document.getElementById('cotphai');
   return {hien:!!b && getComputedStyle(b).display!=='none', x:r ? Math.round(r.right) : 0, y:r ? Math.round(r.top) : 0, cp:getComputedStyle(cp).visibility, an:document.querySelector('.than').classList.contains('an-preview')}; });
 const n1 = await nut();   /* đang mở khung (vừa bấm văn bản) */
 await p.evaluate(()=>anPreview()); await p.waitForTimeout(300); const n2 = await nut();
 await p.click('#bca-pv-nut'); await p.waitForTimeout(400); const n3 = await nut();
 await p.evaluate(()=>{ doiNgan(5); mucDangXem = null; doiNgan(1); }); await p.waitForTimeout(500); const n4 = await nut();   /* đổi tab → thu tự động lại */
 await p.click('#bca-pv-nut'); await p.waitForTimeout(400); const n5 = await nut();
 ok('nút "▣ Xem trước": khung đang mở → ẩn; anh tắt ✕ → hiện ở góc trên phải; bấm → mở khung (giữ mở tới khi đổi tab); đổi tab, chưa chọn mục → thu, nút hiện; bấm → mở khung', !n1.hien && n2.hien && n2.an && n2.x>1300 && n2.y<52 && !n3.hien && !n3.an && n4.hien && !n5.hien && n5.cp==='visible', JSON.stringify({n1, n2, n3, n4, n5}));
 await p.evaluate(()=>doiNgan(0)); await p.waitForTimeout(500);
 ok('① tab Hôm nay không bị đụng (không gắn pv-gon)', !(await p.evaluate(()=>document.querySelector('.than').classList.contains('bca-pvgon'))));
 await p.evaluate(()=>dhSL('to')); await p.waitForTimeout(1200);
 const duong = await p.evaluate(()=>{ const d = document.getElementById('dh-duong'); return {t:d && d.textContent, hien:d && getComputedStyle(d).display!=='none', ten:getComputedStyle(document.querySelector('.dau .ten-app')).display}; });
 ok('② đầu trang ghi đường dẫn "📊 Số liệu › 👥 Tổ TK&VV", ẩn khối "Tủ hồ sơ vX" trùng thanh bên', /Số liệu ›\s*👥 Tổ TK&VV/.test(duong.t) && duong.hien && duong.ten==='none', JSON.stringify(duong));
 const nap = await p.evaluate(()=>{ const m = DH_MUC.find(x=>x.k==='nap'); const g = slKyMoi; const d = new Date(); d.setDate(1); d.setMonth(d.getMonth()-1); const tt = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
   slKyMoi = ()=>tt; const moi = m.do; slKyMoi = ()=>'2025-01'; const cu = m.do; slKyMoi = g; return {moi, cu}; });
 ok('③ huy hiệu Nạp & KT: tháng mới nhất = tháng trước (đang kỳ nạp) → đỏ ⚠; kỳ cũ hơn → không đỏ', nap.moi===true && nap.cu===false, JSON.stringify(nap));
 await p.evaluate(()=>doiNgan(1)); await p.waitForTimeout(600);
 const c0 = await p.evaluate(()=>({chip:(document.getElementById('bca-thieu')||{}).textContent, canh:[...document.querySelectorAll('#ds-vb .tg.canh')].filter(e=>getComputedStyle(e).display!=='none').length}));
 await p.click('#bca-thieu'); await p.waitForTimeout(300);
 const c1 = await p.evaluate(()=>[...document.querySelectorAll('#ds-vb .d2')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.querySelector('.ten').textContent));
 await p.click('#bca-thieu'); await p.waitForTimeout(300);
 const c2 = await p.evaluate(()=>[...document.querySelectorAll('#ds-vb .d2')].filter(e=>getComputedStyle(e).display!=='none').length);
 ok('⑥ chip "⚠ 2 văn bản khai thiếu" thay chip lặp từng thẻ; bấm → chỉ 2 văn bản đó; bấm lại → hiện hết 6', /⚠ 2 văn bản khai thiếu/.test(c0.chip) && c0.canh===0 && c1.length===2 && c1.every(t=>/VB giả [45]/.test(t)) && c2===6, JSON.stringify({c0, c1, c2}));
 /* trùng tên lớp (3.373 lần đầu dùng .pv-gon — trùng nút gọn có sẵn, chữ không xuống dòng → tràn ngang) */
 await p.evaluate(()=>{ D.scan = []; doiNgan(4); }); await p.waitForTimeout(800);
 const ws = await p.evaluate(()=>({ws:getComputedStyle(document.querySelector('.than')).whiteSpace, tran:document.documentElement.scrollWidth>innerWidth+1}));
 const dt = await b.newPage({viewport:{width:390, height:844}, isMobile:true, hasTouch:true}); await require('./tv.js')(dt); await dt.goto('file://'+G+'/index.html'); await dt.waitForTimeout(2000);
 const tr = await dt.evaluate(()=>{ try{ dongHop(); }catch(e){} D.scan = []; doiNgan(4); return new Promise(r=>setTimeout(()=>r(document.documentElement.scrollWidth), 1000)); });
 ok('khung thu gọn không làm chữ mất xuống dòng (máy tính) · điện thoại Scan trống không tràn ngang (thanh dưới không bị đẩy ra ngoài)', ws.ws==='normal' && !ws.tran && tr<=391, JSON.stringify({ws, tr}));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
