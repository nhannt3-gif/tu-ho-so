// t413 (3.561 chuẩn hóa — anh 22/11 "code và gộp"): bỏ onclick viết thẳng → data-lenh ở khung tab (js/11, 3 chỗ động), Khác / Quét rác (js/10),
//   Biểu mẫu (js/09), cây địa bàn (js/18), khung xem PDF (js/05). Hành vi như cũ: mỗi nút gọi đúng hàm cũ, đúng tham số. Dữ liệu GIẢ (PDF dựng bằng pdf-lib).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const bam = async (sel)=>{ await p.click(sel); await p.waitForTimeout(250); };
 /* 1. khung tab: + Thêm, kiểu xem, chip lọc */
 await p.evaluate(async()=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){}
   for(let i=1;i<=2;i++) D.vanBan.push({id:'vb'+i, nhom:'vanBan', tenMoi:'2026-10-0'+i+' '+i+'/NHCS-TD Van ban gia.pdf', duoi:'pdf', soHieu:i+'/NHCS-TD', ngay:'2026-10-0'+i, trichYeu:'Giả '+i, mang:i===1 ? 'Tín dụng' : 'Kế toán'});
   D.bieuMau = [{id:'bm1', nhom:'bieuMau', ten:'Mẫu giả 01', tenMoi:'Mau gia 01.docx', duoi:'docx'}];
   window.GOI = []; const boc = n=>{ const c = window[n]; window[n] = function(){ GOI.push(n+':'+[].slice.call(arguments).join('|')); if(n==='chonDong' || n==='doiChonBM') return c.apply(this, arguments); }; };
   ['chonDong', 'doiChonBM', 'moBangOffice', 'bmMoDocs', 'inMotMau', 'themBieuMau', 'datKX', 'datLocGiu', 'suaCho', 'moNhoAI', 'chonBoGui', 'xoaBo', 'batDB', 'suaNut', 'boNut', 'themAp', 'themDiem', 'suaTo'].forEach(boc);
   D.cauHinh.bangTab = {vanBan:false}; luu(); doiNgan(1); });
 await p.waitForTimeout(500);
 await bam('#nam-vb .tl-kx button[data-lenh="f11.kieuXem"][data-a2="bang"]');
 let r = await p.evaluate(()=>GOI.splice(0));
 ok('kiểu xem (chip) → datKX(tab, kiểu)', r.indexOf('datKX:vanBan|bang')>=0, JSON.stringify(r));
 await p.evaluate(()=>{ TL_LOC_MO.vanBan = true; ve(); GOI.length = 0; }); await p.waitForTimeout(300);
 const chip = await p.$('.tl-panel .the-loc[data-lenh="f11.datLoc"][data-a2="mang"][data-a3="Tín dụng"]');
 if(chip){ await chip.click(); await p.waitForTimeout(250); }
 r = await p.evaluate(()=>GOI.splice(0));
 ok('chip lọc → datLocGiu(tab, khóa, giá trị có dấu)', !!chip && r.indexOf('datLocGiu:vanBan|mang|Tín dụng')>=0, JSON.stringify(r));
 r = await p.evaluate(()=>document.querySelectorAll('.dau-tab [onclick], .tl-panel [onclick], #menu [onclick]').length);
 ok('thanh tab + tấm lọc không còn onclick (trừ 🗑 Xóa / 📋 Chép của js/06b)', await p.evaluate(()=>[...document.querySelectorAll('.dau-tab [onclick], .tl-panel [onclick]')].every(x=>/nut-bot|nut-chep/.test(x.className))), r);
 /* 2. Biểu mẫu */
 await p.evaluate(()=>{ TL_LOC_MO.vanBan = false; doiNgan(5); GOI.length = 0; }); await p.waitForTimeout(500);
 await bam('[data-lenh="f11.them"][data-a1="bieuMau"]');
 r = await p.evaluate(()=>GOI.splice(0));
 ok('+ Thêm (Biểu mẫu) → hamThem dạng hàm (themBieuMau)', r.indexOf('themBieuMau:')>=0, JSON.stringify(r));
 await bam('.d2[data-lenh="f10.chon"][data-a1="bm1"] .ten');
 await p.evaluate(()=>{ try{dongHop()}catch(e){} });
 await bam('.d2[data-a1="bm1"] [data-lenh="f09.office"]'); await bam('.d2[data-a1="bm1"] [data-lenh="f09.docs"]'); await bam('.d2[data-a1="bm1"] [data-lenh="f09.inMot"]');
 await bam('.d2[data-a1="bm1"] [data-lenh="f09.doiChon"]');
 r = await p.evaluate(()=>({g:GOI.splice(0), chon:!!BM.chon.bm1, oc:document.querySelectorAll('#tr5 .d2[onclick], #tr5 .d2 [onclick]').length}));
 ok('dòng biểu mẫu: bấm dòng → chonDong; W / G / 🖨 / ☐ gọi đúng hàm, KHÔNG chọn dòng; không còn onclick', r.g.join()==='chonDong:bm1,moBangOffice:bm1,bmMoDocs:bm1,inMotMau:bm1,doiChonBM:bm1' && r.chon && r.oc===0, JSON.stringify(r));
 const bo = await p.$('[data-lenh="f09.boChon"]'); if(bo){ await bo.click(); await p.waitForTimeout(250); }
 r = await p.evaluate(()=>Object.keys(BM.chon).length);
 ok('thanh chọn: Bỏ chọn → xóa hết đã chọn', !!bo && r===0, r);
 /* 3. Khác › Drive + Quét rác (danh sách hàm được phép) */
 r = await p.evaluate(()=>{ GOI.length = 0; const d = document.createElement('div'); d.innerHTML = veKhacDKHTML()+
     '<button id="x1" data-lenh="f10.suaQD" data-a1="suaCho" data-a2="vb1">Sửa</button><button id="x2" data-lenh="f10.suaQD" data-a1="alert" data-a2="1">x</button>';
   document.body.appendChild(d); d.querySelector('[data-lenh="f10.khacDK"][data-a1="moNhoAI"]').click(); d.querySelector('#x1').click(); d.querySelector('#x2').click();
   const oc = d.querySelectorAll('[onclick]').length; d.remove(); return {g:GOI.splice(0), oc}; });
 ok('Khác › Nhờ AI → moNhoAI; Quét rác Sửa → suaCho(id); tên hàm ngoài danh sách → bỏ qua', r.g.join()==='moNhoAI:,suaCho:vb1' && r.oc===0, JSON.stringify(r));
 /* 4. cây địa bàn */
 r = await p.evaluate(async()=>{ D.cauHinh.diaBan = [{xa:'Xã Giả', diem:[{ten:'Điểm A', ngay:'5', ap:[{ten:'Ấp 1', to:['T01 — Tổ giả']}]}]}]; moNhanh2 = {x0:1, x0d0:1, x0d0a0:1}; moCayDB();
   await new Promise(z=>setTimeout(z, 200)); GOI.length = 0; const q = s=>document.querySelector('#cay-db '+s);
   q('.tm-dau[data-lenh="f18.batDB"][data-a1="x0d0"]').click(); q('[data-lenh="f18.suaNut"][data-a1="0,0,0"]').click(); q('[data-lenh="f18.suaTo"][data-a1="0,0,0"]').click();
   q('[data-lenh="f18.boNut"][data-a1="0,0"]').click(); q('[data-lenh="f18.themAp"][data-a1="0,0"]').click(); q('[data-lenh="f18.themDiem"][data-a1="0"]').click();
   return {g:GOI.splice(0), oc:document.querySelectorAll('#cay-db [onclick]').length}; });
 ok('cây địa bàn: mở cấp, sửa tên, sửa tổ, bỏ điểm, thêm ấp, thêm điểm → đúng hàm + tham số số', r.g.join()==='batDB:x0d0,suaNut:0,0,0|ap,suaTo:0|0|0,boNut:0|0,themAp:0|0,themDiem:0' && r.oc===0, JSON.stringify(r));
 /* 5. khung xem PDF 3 trang */
 await p.evaluate(async()=>{ try{dongHop()}catch(e){}
   const pdf = await PDFLib.PDFDocument.create(); for(let i=1;i<=3;i++) pdf.addPage([595, 842]);
   const bl = new Blob([await pdf.save()], {type:'application/pdf'});
   D.vanBan.push({id:'vp', nhom:'vanBan', tenMoi:'2026-09-25 99-GIA Van ban gia.pdf', soHieu:'99/GIA', ngay:'2026-09-25', trichYeu:'Giả', co:bl.size, soTrang:3, mang:'Tín dụng'});
   await luuFile('vp', bl); luu(); D.cauHinh.bangTab = {vanBan:false}; doiNgan(1); await new Promise(z=>setTimeout(z, 300)); chonDong('vp'); await new Promise(z=>setTimeout(z, 2000)); });
 const S = ()=>p.evaluate(()=>{ const k = Object.keys(XEM).find(n=>XEM[n] && XEM[n].pdf && XEM[n].tong===3); const s = XEM[k]; return s ? {k, trang:s.trang, ty:s.tyLe, che:s.che} : null; });
 const s0 = await S();
 if(s0){ await bam('#cp-dk [data-lenh="f05.diTrang"][data-a2="1"]'); await p.waitForTimeout(400); }
 const s1 = await S();
 if(s0){ await bam('#cp-dk [data-lenh="f05.diTrang"][data-a2="cuoi"]'); await p.waitForTimeout(400); }
 const s2 = await S();
 if(s0){ await p.fill('#cp-dk input[data-lenh="f05.nhayTrang"]', '1'); await p.press('#cp-dk input[data-lenh="f05.nhayTrang"]', 'Enter'); await p.dispatchEvent('#cp-dk input[data-lenh="f05.nhayTrang"]', 'change'); await p.waitForTimeout(400); }
 const s3 = await S();
 if(s0){ await bam('#cp-dk [data-lenh="f05.zoom"][data-a2="1"]'); await p.waitForTimeout(600); }
 const s4 = await S();
 if(s0){ await bam('#cp-dk [data-lenh="f05.datChe2"][data-a2="trang"]'); await p.waitForTimeout(600); }
 const s5 = await S(), oc = await p.evaluate(()=>document.querySelectorAll('#cp-dk [onclick], #cp-dk [onchange]').length);
 ok('khung xem PDF: › trang sau, ⏭ cuối, ô số trang, + phóng to, ⊡ vừa trang — chạy như cũ; không còn onclick', !!s0 && s1.trang===2 && s2.trang===3 && s3.trang===1 && s4.ty>s3.ty && s5.che==='trang' && oc===0, JSON.stringify({s0, s1, s2, s3, s4, s5, oc}));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t413 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
