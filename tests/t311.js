// 3.372 (KE_HOACH_DIEN_THOAI_MAY Đ6, anh 25/10: "Hôm nay, Văn bản, Tra cứu KH là 3 tab chính", ô 4 = Scan) — bản máy tính trên điện thoại:
// thanh dưới Hôm nay · Tra cứu · Văn bản · Scan · Thêm (bấm đúng tab, tô sáng đúng nút); đầu trang không còn ❓🧰🗑⚙; Tra cứu ẩn hàng tab con,
// Lọc địa bàn 1 hàng; Văn bản tên 2 dòng, không nút ✎; ☰ Thêm có 📱 Bản điện thoại gọn + ⏱ Đo tốc độ (ghi số đo dựng kỳ); máy tính 1440 / 900 không đổi.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const mo = async(w, h, dt)=>{ const p=await b.newPage(Object.assign({viewport:{width:w,height:h}}, dt ? {isMobile:true, hasTouch:true} : {})); p.on('pageerror',e=>loi.push(e.message));
   await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p); await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
   await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM=1; for(const f of files){ const s=atob(f.b),u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq=await slDocFile(new File([u],f.n)); if(!kq.loi&&kq.ky) try{await slGhi(kq);}catch(e){} }
     kyChungDoi('2026-08'); D.vanBan.push({id:'vbt', ten:'Công văn số 100/NHCS-TD về việc hướng dẫn cho vay chương trình học sinh sinh viên năm học 2026', so:'100/NHCS-TD', ngay:'2026-10-01', loai:'Công văn', mang:'Tín dụng', tag:['HSSV']}); doiNgan(0); }, files);
   await p.waitForTimeout(800); return p; };
 const p = await mo(390, 844, true);
 const nut = await p.$$eval('#thanh-duoi a .chu', x=>x.map(e=>e.textContent)); ok('3.372 điện thoại: thanh dưới Hôm nay · Tra cứu · Văn bản · Scan · Thêm', nut.join('|')==='Hôm nay|Tra cứu|Văn bản|Scan|Thêm', nut.join('|'));
 ok('3.372 đầu trang không còn ❓ 🧰 🗑 ⚙ (vào ☰ Thêm)', await p.evaluate(()=>[...document.querySelectorAll('.dau-hang .nut-cd')].every(x=>!x.offsetParent)));
 await p.click('#thanh-duoi a[data-d="tra"]'); await p.waitForTimeout(1200);
 const tra = await p.evaluate(()=>{ const c=document.querySelector('#tr7 > .sl-con'), h=document.querySelector('#tc-cay .pv-hang1'); return {tab:dhDang(), bat:document.querySelector('#thanh-duoi a.bat').getAttribute('data-d'), con:c ? getComputedStyle(c).display : '', hang:h ? Math.round(h.getBoundingClientRect().height) : 0}; });
 ok('3.372 bấm Tra cứu → mở Tra cứu KH, nút Tra cứu sáng, ẩn hàng tab con, Lọc địa bàn 1 hàng (≤ 42 px, 2 hàng ≈ 65)', tra.tab==='tra' && tra.bat==='tra' && tra.con==='none' && tra.hang>0 && tra.hang<=42, JSON.stringify(tra));
 await p.click('#thanh-duoi a[data-d="1"]'); await p.waitForTimeout(900);
 const vb = await p.evaluate(()=>{ const d=document.querySelector('#tr1 .d2'), t=d && d.querySelector('.ten'), s=d && d.querySelector('.nut button[title="Sửa"]'); return {tab:dhDang(), bat:document.querySelector('#thanh-duoi a.bat').getAttribute('data-d'), dong:t ? Math.round(t.getBoundingClientRect().height/parseFloat(getComputedStyle(t).lineHeight)) : 0, sua:s ? getComputedStyle(s).display : ''}; });
 ok('3.372 bấm Văn bản → tab Văn bản, nút Văn bản sáng (thẻ gọn: TK 3 css/dt-may-vbsc.css — không nút ✎)', vb.tab==='1' && vb.bat==='1' && vb.sua==='none', JSON.stringify(vb));
 await p.click('#thanh-duoi a[data-d="4"]'); await p.waitForTimeout(700);
 ok('3.372 bấm Scan → tab Scan', await p.evaluate(()=>dhDang()==='4' && document.querySelector('#thanh-duoi a.bat').getAttribute('data-d')==='4'));
 await p.click('#thanh-duoi a[data-d="them"]'); await p.waitForTimeout(500);
 const th = await p.evaluate(()=>({gon:!!document.querySelector('.dt-them [data-lenh="dtm.banGon"]'), do:!!document.querySelector('.dt-them [data-lenh="dtd.mo"]'), cd:/Cài đặt/.test(document.querySelector('.dt-them').textContent), gd:/Giao dịch xã/.test(document.querySelector('.dt-them').textContent)}));
 ok('3.372 ☰ Thêm: có Giao dịch xã, Cài đặt, 📱 Bản điện thoại gọn, ⏱ Đo tốc độ', th.gon && th.do && th.cd && th.gd, JSON.stringify(th));
 await p.click('.dt-them [data-lenh="dtd.mo"]'); await p.waitForTimeout(500);
 const d = await p.evaluate(()=>({hop:/Đo tốc độ/.test((document.querySelector('.hop-tit')||{}).textContent||''), dung:DTD.ds.some(x=>/Dựng kỳ/.test(x.t)), luu:!!localStorage.getItem('tuhoso_do')}));
 ok('3.372 ⏱ Đo tốc độ: mở hộp số đo, có bước "Dựng kỳ", lưu trên máy', d.hop && d.dung && d.luu, JSON.stringify(d));
 await p.close();
 for(const W of [1440, 900]){ const m = await mo(W, 900, false);
   const r = await m.evaluate(()=>({nut:[...document.querySelectorAll('#thanh-duoi a .chu')].map(e=>e.textContent).join('|'), cd:[...document.querySelectorAll('.nut-cd')].some(x=>!!x.offsetParent), dtm:document.body.hasAttribute('data-dtm'), day:getComputedStyle(document.querySelector('.day')).display}));
   ok('3.372 màn '+W+': không đổi (không gắn chế độ điện thoại'+(W<1100 ? ', còn nút ❓🧰🗑⚙, chân trạng thái, thanh dưới cũ Hôm nay · GD xã · Số liệu · Hồ sơ · Thêm' : '')+')', !r.dtm && (W>=1100 || (r.cd && r.day!=='none' && r.nut==='Hôm nay|GD xã|Số liệu|Hồ sơ|Thêm')), JSON.stringify(r)); await m.close(); }
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t311 đạt'); await b.close(); process.exit(sai?1:0);
})();
