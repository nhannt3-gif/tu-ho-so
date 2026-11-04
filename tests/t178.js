// 3.222 (anh 16/10, phương án B + bổ sung 1–3) — ⚙ KHAI BÁO ĐƠN VỊ dùng chung mọi tab; bố cục A cột trái Hồ sơ vay
//   (✎ Nhập liệu đầu · ⚙ Khai báo riêng cuối, thu gọn được); chương trình vay 1 lối vào; 09A + 01/TĐCK cùng khung;
//   📎 nguồn số liệu ô 🖨 · ↺ về mặc định · ⚠ nhắc thiếu trước khi in. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : '')); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete (D.cauHinh.hsoO||{}).cham; delete (D.cauHinh.hsoO||{}).chamGT; delete (D.cauHinh.hsoO||{}).kbrDong;
   D.cauHinh.ktHoiKB = {'PN|X1':{ten:'Hội Phụ nữ xã Giả', ct:'Trần Thị Giả', pct:'Lê Thị Phó'}};
   /* 1. Khai báo đơn vị — 1 cửa sổ cho mọi tab */
   slDoiTab('gdx'); await w(600); gdxKBChung(); await w(200); let hop = document.getElementById('hop-in');
   ok('Giao dịch xã › ⚙ Khai báo đơn vị → cùng cửa sổ, mở ở tab 👤 Cán bộ', /Khai báo đơn vị — dùng chung mọi tab/.test(hop.textContent) && hop.querySelector('.hso-kbp[data-kb="cb"]').style.display==='' && !!hop.querySelector('#gdx-cbmoi'));
   ok('đủ tab: PGD · Cán bộ · Hội · Trưởng ấp · Tổ phó · Chương trình vay · TK 104 / 105 · 🔎 Kiểm tra hộ vay (3.228) · 💾 Sao lưu (3.223)', [...hop.querySelectorAll('.hso-kbt')].map(e=>e.getAttribute('data-kb')).join(',')==='pgd,cb,hoi,ap,pho,ct,tk,kiem,sl');
   const nCB = gdxC().danhSachCanBo.length; document.getElementById('gdx-cbmoi').value = 'Cán Bộ Giả'; gdxThemCanBo(); await w(150); hop = document.getElementById('hop-in');
   ok('thêm cán bộ trong cửa sổ chung → lưu đúng chỗ cũ (gdxC), cửa sổ vẫn ở tab Cán bộ', gdxC().danhSachCanBo.length===nCB+1 && hop.querySelector('.hso-kbp[data-kb="cb"]').style.display==='');
   gdxBoCanBo(gdxC().danhSachCanBo.length-1);
   hsoKBTab('pgd'); const inGL = [...hop.querySelectorAll('.kb-tenm input')];
   ok('tab PGD có tên đơn vị từng mẫu Giao dịch xã (04/TD, 12/GDX, Giấy lĩnh, Bảng kê) — 10 ô', inGL.length===10 && /04\/TD/.test(hop.textContent) && /Giấy lĩnh/.test(hop.textContent) && /Bảng kê/.test(hop.textContent));
   const cu = gdxC().glPGD; const iGL = hop.querySelector('.kb-tenm input[oninput*="glPGD"]'); iGL.value = 'PGD Giả'; iGL.dispatchEvent(new Event('input', {bubbles:true}));
   ok('sửa tên PGD Giấy lĩnh ở đây → cùng chỗ lưu gdxC().glPGD', gdxC().glPGD==='PGD Giả'); gdxC().glPGD = cu;
   hsoKBTab('hoi'); ok('tab 🤝 Hội: liệt kê Hội đã khai ở KTGS + nút sang KTGS (không chép dữ liệu)', /Hội Phụ nữ xã Giả/.test(hop.textContent) && /Trần Thị Giả/.test(hop.textContent) && /Sửa ở KTGS/.test(hop.textContent) && Object.keys(D.cauHinh.ktHoiKB).length===1);
   hsoKBTab('tk'); ok('tab TK 104 / 105 = khối cũ của Giao dịch xã', hop.querySelector('.hso-kbp[data-kb="tk"]').textContent.length>50);
   dongHop();
   /* 2. Bố cục A cột trái Hồ sơ vay */
   slDoiTab('hsv'); doiNgan(7); await w(1200); const C = hsoCH(); C.xa=''; C.diem=''; C.to='';
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(800);
   ok('nút Hồ sơ vay: "⚙ Khai báo đơn vị" (3.334: ở dòng tên mẫu)', /⚙ Khai báo đơn vị/.test(document.querySelector('#hso-ds .hso-dau-ds').textContent) && !/Khai báo chung/.test(document.getElementById('tr7').textContent));
   const ho = hmTuM31(hsoTVTo(TO_K.to[C.to])[0].kh); ho.kh = ''; ho.tv[ho.dung||0].ncap = '';   /* hộ mới (không đọc lại Mẫu 31) thiếu ngày cấp */
   hmLamHS(ho.id, '01td'); await w(300); const B = hsoBo(); B.ct = 'HSSV'; B.pa = Object.assign(B.pa||{}, {sv:'Con Giả', soThang:'12'}); B.tien = '40000000'; hsoBoLuu(); hsoVe(); await w(300);
   let tuy = document.getElementById('hso-tuy'), dau = tuy.querySelector('.nhan-nhom');
   ok('01/TD: đầu cột trái "✎ Nhập liệu — Mẫu 01/TD"; ⚙ Khai báo riêng = nút cạnh ⚙ Khai báo đơn vị, cuối cột trái Chọn nhanh (3.455 thay khối thu gọn 3.240)', /✎ Nhập liệu — Mẫu 01\/TD/.test(dau.textContent) && !tuy.querySelector('details.hso-kbr-d') && !!document.querySelector('[data-lenh="omkb.ds"][data-mk="01td"]') && /Chọn nhanh/.test(tuy.textContent));
   const nCT = tuy.innerHTML.split("hsoKBHop(\\'ct\\')").length - 1 + tuy.innerHTML.split("hsoKBHop('ct')").length - 1 + tuy.innerHTML.split('data-lenh="l01.kb" data-k="ct"').length - 1;   /* 3.242: form 01/TD dùng lệnh GD */
   ok('chương trình vay chỉ 1 lối vào (① ⚙ khai báo chương trình)', nCT===1, nCT);
   const h0 = hsoLap().h; omKBDsHop('01td'); await w(200); dongHop(); hsoVe(); await w(100);
   ok('mở / đóng ⚙ Khai báo riêng → bản in không đổi', hsoLap().h===h0);
   /* bổ sung 3: nhắc thiếu */
   tuy = document.getElementById('hso-tuy'); let th = tuy.querySelector('.hso-thieu');
   ok('⚠ Trước khi in: người vay thiếu ngày cấp CCCD (đầu cột trái)', !!th && /thiếu[^]*ngày cấp CCCD/.test(th.textContent) && [...tuy.children].indexOf(tuy.querySelector('.hso-thieu'))<=2);
   hsoChamDat('01td', 'ngayKy', 'in'); hsoChamDat('01td', 'nhLai', 'in'); await w(200); th = document.querySelector('#hso-tuy .hso-thieu');
   ok('bật 🖨 ngày ký (chưa gõ) + lãi suất (chưa khai) → nhắc 2 ô sẽ in chấm', /Ngày tháng \(người vay ký\)[^]*in chấm/.test(th.textContent) && /Lãi suất[^]*in chấm/.test(th.textContent));
   HSO.vay.ngayKy = '2026-10-20'; hsoChamKBDat('01td', 'nhLai', '6,6'); hsoVe(); await w(200); th = document.querySelector('#hso-tuy .hso-thieu');
   ok('gõ ngày + khai lãi → hết nhắc 2 ô (còn nhắc ngày cấp)', !/người vay ký/.test(th.textContent) && !/Lãi suất/.test(th.textContent) && /ngày cấp/.test(th.textContent));
   HSO_GM = true; hsoVe(); await w(100); ok('bản ghi mẫu: không nhắc ô chấm', !/Ô 🖨/.test((document.querySelector('#hso-tuy .hso-thieu')||{}).textContent||'')); HSO_GM = false;
   /* bổ sung 1: nguồn */
   hsoChamDat('01td', 'nhTien', 'in'); await w(150); const ng = [...document.querySelectorAll('#hso-tuy .hso-cham-ng')].map(e=>e.textContent).join(' | ');
   ok('📎 nguồn ô 🖨: lãi theo chương trình HSSV, số tiền theo ③ Phương án, ngày gõ trong lần làm; ô ✍ không ghi nguồn', /theo chương trình HSSV/.test(ng) && /③ Phương án/.test(ng) && /gõ trong lần làm/.test(ng) && document.querySelectorAll('#hso-tuy .hso-cham-ng').length===3, ng);
   hsoChonMau('01tgtv'); await w(300); hsoChamDat('01tgtv', 'cif', 'in'); await w(150);
   ok('01/TGTV: nút ⚙ Khai báo riêng (3.455), cột trái Chọn nhanh; nguồn CIF = "Mẫu 31 kỳ …"', !!document.querySelector('[data-lenh="omkb.ds"][data-mk="01tgtv"]') && [...document.querySelectorAll('#hso-tuy .hso-cham-ng')].some(e=>/Mẫu 31 kỳ/.test(e.textContent)));
   /* bổ sung 2: về mặc định */
   hsoChonMau('01td'); await w(300);
   ok('nút "↺ Về mặc định (3 ô đã đổi)" (3.455: trong hộp ⚙ Khai báo riêng)', (()=>{ omKBDsHop('01td'); const t = document.getElementById('hop-in').textContent; dongHop(); return /↺ Về mặc định \(3 ô đã đổi\)/.test(t); })());
   delete HSO.vay.ngayKy; hsoChamVeMD('01td', 1); await w(200);
   ok('↺ → mọi ô về ✍ (bản in = mặc định, giữ giá trị đã khai lãi 6,6), hết nút', !(hsoLuu().cham||{})['01td'] && hsoLuu().chamGT['01td']['nhLai|HSSV']==='6,6' && omMDChu('01td')==='↺ Về mặc định' && /Lãi suất: [.…]+ ?%\/năm/.test(hsoLap().h.replace(/<[^>]+>/g, '')));
   /* 09A + 01/TĐCK cùng khung */
   hsoChonMau('09a'); await w(300); const tv = hsoTVTo(TO_K.to[C.to]).filter(k=>k.mon.some(m=>(m.dn||0)>0)); HSO.vay.kh = tv[0].kh; hsoLuu().kemTDCK = true; hsoVe(); await w(300);
   const d9 = [...document.querySelectorAll('[data-lenh="omkb.ds"]')].map(e=>e.getAttribute('data-mk'));
   ok('09A: "✎ Nhập liệu — Mẫu 09A" + nút ⚙ Khai báo riêng 09A (cạnh Khai báo đơn vị) và 01/TĐCK (ở Chọn nhanh mẫu kèm)', /✎ Nhập liệu — Mẫu 09A/.test(document.querySelector('#hso-tuy .nhan-nhom').textContent) && d9.indexOf('09a')>=0 && !!document.querySelector('#hso-tuy [data-lenh="omkb.ds"][data-mk="01tdck"]') && /01\/TĐCK/.test(document.getElementById('hso-tuy').textContent), d9.join(' | '));
   hsoLuu().kemTDCK = false; hsoChonMau('01tdck'); await w(300);
   ok('01/TĐCK riêng: nút ⚙ Khai báo riêng như mọi mẫu', !!document.querySelector('[data-lenh="omkb.ds"][data-mk="01tdck"]'));
   ok('không lỗi trang', true);
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5)); const dat = R.filter(x=>x[0]==='✓').length;
 console.log(dat+'/'+R.length+' đạt'+(loi.length ? ' · có lỗi trang' : '')); await b.close(); process.exit(dat===R.length && !loi.length ? 0 : 1); })();
