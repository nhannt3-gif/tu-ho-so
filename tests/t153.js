// 3.157 — Khung xem bên phải + 2 kiểu lọc (anh chốt 11/10, docs/KE_HOACH_GON_GIAO_DIEN.md Gói 2):
//   khung xem sát trên dưới, đầu 1 dòng (nơi lưu, rê chuột thấy tên), ⊡ Vừa trang trọn 1 trang A4, nhớ chế độ;
//   lọc SỐ LIỆU: hàng chip có nhãn (Xã / Điểm GD · Hội · Tổ) chỉ con của cấp cha, Hội chọn ở mọi cấp, 🔎 tìm nhanh cuối hàng;
//   Tổng hợp: Nguồn vốn chip trên cùng, Chương trình dưới cây, danh sách báo cáo 1 dòng; KTGS Kế hoạch bỏ hàng chip Hội riêng. Dữ liệu GIẢ (gianho31 + PDF dựng bằng pdf-lib).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   /* 1. khung xem bên phải */
   const pdf = await PDFLib.PDFDocument.create(); const f = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
   for(let i=1;i<=2;i++){ const pg = pdf.addPage([595,842]); pg.drawText('VAN BAN GIA '+i, {x:60,y:780,size:18,font:f}); }
   const bl = new Blob([await pdf.save()], {type:'application/pdf'});
   D.vanBan = [{id:'vg', nhom:'vanBan', tenMoi:'2026-09-25 99-GIA Van ban gia.pdf', soHieu:'99/GIA', ngay:'2026-09-25', trichYeu:'Giả', co:bl.size, soTrang:2, mang:'Tín dụng'}];
   await luuFile('vg', bl); luu(); delete D.cauHinh.xemChe; doiNgan(1); await w(300); chonDong('vg'); await w(2000);
   const cp = document.getElementById('cotphai'), r = cp.getBoundingClientRect(), dau = cp.querySelector('.dau-p');
   ok('khung xem sát đáy màn (cách ≤ 12 px)', window.innerHeight - r.bottom <= 12, Math.round(window.innerHeight - r.bottom)+' px');
   ok('đầu khung 1 dòng: 📁 nơi lưu · trang · KB + ⛶ ✕ (cao ≤ 46 px), không còn tên 2 dòng / chip liên quan', dau.getBoundingClientRect().height<=46 && getComputedStyle(document.getElementById('cp-ten')).display==='none' && /📁/.test(document.getElementById('cp-phu').textContent), Math.round(dau.getBoundingClientRect().height)+' px');
   ok('rê chuột dòng nơi lưu → tên file đầy đủ', document.getElementById('cp-phu').title==='2026-09-25 99-GIA Van ban gia.pdf');
   ok('ô chọn trang + nhãn "Trang 1 / 2" nổi góc trang (không chiếm dòng)', [...document.querySelectorAll('#cp-than .o-trang .tick, #cp-than .o-trang .stt')].every(x=>getComputedStyle(x).position==='absolute'));
   const nutT = [...document.querySelectorAll('#cp-dk button')].find(x=>x.title==='Vừa trang'); nutT.click(); await w(1500);
   const o2 = document.getElementById('cp-than'), c = o2.querySelector('canvas'), cr = c.getBoundingClientRect(), orr = o2.getBoundingClientRect();
   ok('⊡ Vừa trang: trọn 1 trang A4 trong khung (không cần cuộn), đúng tỉ lệ A4', cr.height <= orr.height && cr.height > orr.height*0.8 && Math.abs(cr.height/cr.width - 842/595) < 0.03, Math.round(cr.width)+'×'+Math.round(cr.height)+' / khung '+Math.round(orr.height));
   ok('⊡ lật từng trang (cuộn dừng đúng trang)', o2.classList.contains('vua-trang') && getComputedStyle(o2).scrollSnapType.indexOf('mandatory')>=0);
   ok('nhớ chế độ ⊡ cho lần mở sau; các nút cơ bản vẫn còn (⏮ ‹ › ⏭ − + ↔ 📋 ↗)', D.cauHinh.xemChe==='trang' && ['Trang đầu','Trang trước','Trang sau','Trang cuối','Thu nhỏ','Phóng to','Vừa bề ngang'].every(t=>[...document.querySelectorAll('#cp-dk button')].some(x=>x.title===t)));
   /* 2. lọc số liệu */
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); await w(200);
   const C = ktCH(); C.xa=''; C.diem=''; C.hoi=''; C.to=''; C.che='dx'; slDoiTab('kt'); doiNgan(7); for(let i=0;i<60 && !document.querySelector('#kt-cay .pv-hang1');i++) await w(250); await w(300);
   const nhan = () => [...document.querySelectorAll('#kt-cay .pv-nhan')].map(x=>x.textContent.replace(/[①②③]/g,'')).join('|');
   ok('chưa chọn xã: hàng chip Xã (PGD + các xã) + Hội', /^Xã\|Hội$/.test(nhan()) || nhan()==='Hội', nhan());
   ok('🔎 tìm nhanh nằm cuối hàng ô chọn', !!document.querySelector('#kt-cay .pv-hang1 .pv-tim input#kt-tim'));
   const K = KT_K, xa = pvLuaChon(K.to, C, 'xa', true)[0].k; pvChon('kt', 'xa', xa); await w(200);
   ok('chọn xã: hàng Xã vẫn hiện + hàng Điểm GD (Cả xã + điểm của xã) │ Hội (3.162)', nhan()==='Xã|Điểm GD|Hội|Ấp / KP' && /Cả xã/.test(document.querySelector('#kt-cay .pv-hang2').textContent), nhan());
   const hoiXa = pvLuaChon(K.to, C, 'hoi', true)[0].k; pvChon('kt', 'hoi', hoiXa, 1); await w(200);
   ok('Hội chọn ngay ở cấp xã (đa chiều, chưa cần điểm GD)', C.hoi===String(hoiXa) && !C.diem && document.querySelectorAll('#kt-cay .pv-dan .pv-dan-o').length===3);   /* 3.206: + mắt 🏠 PGD */   /* 3.160: cấp đã chọn lên dòng 📍 */
   const diem = pvLuaChon(K.to, C, 'diem', true)[0].k; pvChon('kt', 'diem', diem); await w(200);
   ok('chọn điểm: giữ Hội, hàng Tổ chỉ tổ của điểm + Hội đó', C.hoi===String(hoiXa) && /Tổ/.test(nhan()) && [...document.querySelectorAll('#kt-cay .pv-hang2')].pop().querySelectorAll('.to-chip').length===Math.min(30, pvLuaChon(K.to, C, 'to', true).length), nhan());
   /* KTGS kế hoạch: không còn hàng chip Hội riêng */
   C.che = 'kh'; C.khNam = 2026; ktVeThe(); await w(200);
   ok('KTGS Kế hoạch: bỏ hàng chip Hội riêng (dùng hàng Hội chung)', !document.querySelector('#tr7 .kt-kh-hoi'));
   C.che = 'dx'; C.diem=''; C.hoi=''; C.to='';
   /* Sao kê: 🔎 tìm nhanh chung */
   slDoiTab('sk'); doiNgan(7); for(let i=0;i<60 && !document.querySelector('#sk-cay .pv-hang1');i++) await w(250); await w(300);
   const t0 = Object.values(SK_K.to).find(t=>!toLaTT(t) && t.ten);
   PV_Q.sk = t0.ten; pvTim('sk'); await w(50);
   const nb = document.querySelector('#sk-gy button');
   ok('Sao kê: 🔎 gõ tên tổ → gợi ý, chọn → tự điền Xã › Điểm › Hội › Tổ', !!nb && (nb.click(), true) && skCH().to===t0.ma && skCH().xa===t0.xa && skCH().diem===t0.khoaDiem);
   /* Tổng hợp */
   slDoiTab('th'); doiNgan(7); for(let i=0;i<60 && !document.querySelector('#tr7 .th-nguon');i++) await w(250); await w(300);
   const th = document.getElementById('tr7'), ng = th.querySelector('.th-nguon'), cay = th.querySelector('#th-cay');
   ok('Tổng hợp: Nguồn vốn là chip (Tất cả · Trung ương · Địa phương) đặt trên cây địa bàn', ng && [...ng.querySelectorAll('.to-chip')].map(x=>x.textContent).join('|')==='Tất cả|Trung ương|Địa phương' && ng.getBoundingClientRect().top < cay.getBoundingClientRect().top);
   [...ng.querySelectorAll('.to-chip')][1].click(); await w(400);
   ok('bấm Trung ương → lọc nguồn TW, chip sáng', thCH().nguon==='1' && document.querySelector('#tr7 .th-nguon .to-chip.bat').textContent==='Trung ương');
   ok('3.168: Chương trình cùng 1 dòng với Nguồn vốn, trên cây địa bàn (gọn chỗ)', Math.abs(document.querySelector('#tr7 .th-ct').getBoundingClientRect().top - document.querySelector('#tr7 .th-nguon').getBoundingClientRect().top) < 12 && document.querySelector('#tr7 .th-ct').getBoundingClientRect().top < document.querySelector('#th-cay').getBoundingClientRect().top);
   if(thCH().man==='xem') thVeDS(); for(let i=0;i<20 && !th.querySelector('.th-luoi');i++) await w(200);
   ok('danh sách báo cáo 1 dòng / báo cáo, chưa nạp → ⚠ (rê chuột xem thiếu file) — 3.393 lưới nút như Sao kê', th.querySelectorAll('.th-luoi .th-bc2').length>0 && [...th.querySelectorAll('.th-luoi .th-bc2')].every(x=>x.getBoundingClientRect().height<=30) && [...th.querySelectorAll('.th-luoi .th-mo')].every(x=>/Chưa nạp/.test(x.title)));
   thCH().nguon = '';
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
