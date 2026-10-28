// 3.397 (anh 28/10 duyệt demo D1–D4 KTGS "em làm luôn") — js/78-ktgs-gon.js (cắm rút, chỉ sắp xếp lại phần đã vẽ):
// D1 thẻ con Bắt buộc vào hàng 3 khối (nhãn ngắn, đủ chữ ở title) · D2 Tháng kiểm tra + số liệu + Đã chọn n tổ gom 1 hàng thao tác, bỏ dòng "Phạm vi" ·
// D3 nút 👁 Xem / 📋 Tóm tắt lên hàng thao tác · D4 ghi chú dài → ⓘ bấm mở; tích tổ (vẽ lại) vẫn 1 hàng, số đếm đúng; Sau giải ngân giữ ô tháng GN;
// Mẫu 04 có "Đã chọn"; rút js/78 → như cũ, không lỗi. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(rut)=>{ const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); if(rut) await p.route(/78-ktgs-gon\.js/, r=>r.abort()); await require('./tv.js')(p);
   await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
     kyChungDoi('2026-08'); doiNgan(7); const C=ktCH(); C.che='dk'; C.xa=''; C.diem=''; C.hoi=''; C.to=''; slDoiTab('kt'); }, files);
   await p.waitForTimeout(3000); await p.evaluate(()=>{ pvChon('kt','xa',String(Object.values(KT_K.to).find(t=>!toLaTT(t)&&t.xa).xa)); }); await p.waitForTimeout(2500); return p; };
 const xem = p=>p.evaluate(()=>{ const T=document.getElementById('kt-the'), h=T.querySelectorAll('.kt-thao');
   return {thao:h.length, conTrongKhoi:!!T.querySelector('.kt-khoi .kt-con'), nhan:[...T.querySelectorAll('.kt-con .gd-chip')].map(x=>x.textContent.trim()).join('|'), nhanThay:[...T.querySelectorAll('.kt-con .gd-chip')].map(x=>x.innerText.trim()).join('|'), tit:(T.querySelector('.kt-con .gd-chip')||{}).title||'',
     thang:!!T.querySelector('.kt-thao select[data-lenh="kta.th"]'), sl:/Số liệu in/.test((T.querySelector('.kt-thao .to-the-so')||{}).textContent||''), pham:[...T.querySelectorAll('.sl-phu')].some(x=>/^Phạm vi:/.test(x.textContent.trim()) && !!x.offsetParent),
     chon:((T.querySelector('.kt-thao-phai .to-the-so')||{}).textContent||''), nut:[...T.querySelectorAll('.kt-thao .hang-nut.kt-in button')].map(x=>x.textContent.trim()).join('|'),
     cuoi:!!T.querySelector(':scope > .hang-nut.kt-in'), ghi:!!T.querySelector('details.kt-ghi p.ghi'), truocBang:(()=>{ const a=T.querySelector('.kt-thao'), t=T.querySelector('.to-bang-cuon'); return !!(a && t && (a.compareDocumentPosition(t) & 4)); })()}; });
 const p = await mo(false);
 let r = await xem(p);
 ok('D1: thẻ con Bắt buộc trong hàng 3 khối, nhãn ngắn, đủ chữ ở title', r.conTrongKhoi && r.nhanThay==='🗓 Định kỳ|📅 Sau giải ngân|📋 Báo cáo tổng hợp|🗓 Lịch năm' && /Mẫu 06 \+ 16/.test(r.tit), r.nhan);
 ok('D2: 1 hàng thao tác có Tháng kiểm tra + số liệu + Đã chọn; bỏ dòng "Phạm vi:"', r.thao===1 && r.thang && r.sl && /đã chọn 0 tổ/i.test(r.chon) && !r.pham, JSON.stringify(r));
 ok('D3: 👁 Xem + 📋 Tóm tắt lên hàng thao tác, trên bảng; cuối trang không còn hàng nút', /Xem 0 tổ/.test(r.nut) && /Tóm tắt/.test(r.nut) && !r.cuoi && r.truocBang, r.nut);
 ok('D4: ghi chú dài thu vào ⓘ (bấm mở)', r.ghi);
 await p.evaluate(()=>document.querySelector('#kt-the input[data-lenh="ktk.dkTich"]').click()); await p.waitForTimeout(1500); r = await xem(p);
 ok('tích 1 tổ (vẽ lại) → vẫn 1 hàng thao tác, Đã chọn 1 tổ, nút Xem 1 tổ bấm được', r.thao===1 && /đã chọn 1 tổ/i.test(r.chon) && /Xem 1 tổ/.test(r.nut) && await p.evaluate(()=>!document.querySelector('.kt-thao .hang-nut.kt-in button.chinh').disabled), r.chon);
 await p.evaluate(()=>document.querySelector('.kt-thao .hang-nut.kt-in button.chinh').click()); await p.waitForTimeout(2500);
 ok('bấm 👁 Xem trên hàng thao tác → mở hộp xem Mẫu 06 + 16', await p.evaluate(()=>/Mẫu 06|Mẫu 16/.test((document.getElementById('hop-in')||{}).textContent||'')));
 await p.evaluate(()=>{ try{dongHop()}catch(e){} });
 await p.evaluate(()=>{ ktCH().che='gn'; ktVeThe(); }); await p.waitForTimeout(2500); r = await xem(p);
 ok('Sau giải ngân: ô tháng GN + nút Xem phiếu Mẫu 06 trên hàng thao tác', r.thao===1 && await p.evaluate(()=>document.querySelectorAll('.kt-thao select').length>=2) && /Xem \d+ phiếu Mẫu 06/.test(r.nut), r.nut);
 await p.evaluate(()=>{ ktCH().che='bc'; ktVeThe(); }); await p.waitForTimeout(2500); r = await xem(p);
 ok('Mẫu 04: Tháng kiểm tra + Đã chọn n/… tổ + nút Xem báo cáo Mẫu 04 trên 1 hàng', r.thao===1 && r.thang && /đã chọn 0\/\d+ tổ/i.test(r.chon) && /Xem 0 báo cáo Mẫu 04/.test(r.nut), r.chon+' · '+r.nut);
 await p.close();
 const q = await mo(true); r = await xem(q);
 ok('rút js/78 → như cũ (không hàng thao tác, nút Xem cuối trang, còn dòng Phạm vi)', r.thao===0 && r.cuoi && r.pham && !r.conTrongKhoi); await q.close();
 ok('không lỗi trang', !loi.length, loi.slice(0, 2).join(' | '));
 o.forEach(x=>console.log(x)); const sai = o.filter(x=>x[0]==='✗').length; console.log(sai ? '✗ '+sai+' sai' : '✓ t318 đạt'); await b.close(); process.exit(sai?1:0);
})();
