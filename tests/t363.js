// 3.455 (anh 02/11 "khai báo riêng trực quan rất hay, nên bố trí cho mọi mẫu, ký hiệu tương đồng — chọn bên trong mẫu thì chỗ khai bên ngoài nổi bật; khai báo thường bị dồn chữ rất xấu")
//   — danh sách khai báo dùng chung (tên / nguồn / giá trị / Chọn nhanh, vạch màu theo nguồn), trực quan liên kết 2 chiều, bấm chữ trên bản xem trước, nút ⚙ cho mọi mẫu nền ô. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300); pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   hsoChonMau('10a'); await w(600);
   /* 1. ⚙ Khai báo riêng: không dồn chữ */
   document.querySelector('[data-lenh="omkb.ds"][data-mk="10a"]').click(); await w(400);
   const dong = [...document.querySelectorAll('#om-kbds-ds .om-ds-dong')], d0 = dong.find(d=>d.getAttribute('data-ok')==='gio') || dong[1];
   ok('hộp ⚙ Khai báo riêng: mỗi dòng 4 phần (tên · nguồn · giá trị · Chọn nhanh), đủ ô theo mẫu', dong.length===OM_MAU['10a'].o.length && dong.every(d=>d.querySelector('.om-ds-ten') && d.querySelector('.om-ds-nut') && d.querySelector('.om-ds-gt') && d.querySelector('.om-ds-nhanh')), dong.length+' dòng');
   const ten = d0.querySelector('.om-ds-ten'), hTen = ten.getBoundingClientRect(), lh = parseFloat(getComputedStyle(ten).lineHeight) || 18;
   ok('tên dòng không bị dồn (cột tên ≥ 140 px, "Thời gian bắt đầu" tối đa 2 dòng)', hTen.width>=140 && hTen.height <= lh*2.2+20, Math.round(hTen.width)+' × '+Math.round(hTen.height)+' px');
   ok('vạch màu theo nguồn (lớp om-ds-<nguồn>) + chú thích màu', dong.every(d=>/om-ds-(tu|kb|go|mau|cham)\b/.test(d.className)) && !!document.querySelector('#hop-in .om-ds-chu'));
   ok('tiêu đề hộp có tóm tắt số ô theo nguồn + chọn cỡ chữ', /ô:/.test(document.getElementById('om-kbds').textContent) && /Cỡ chữ/.test(document.getElementById('hop-in').textContent));
   /* 2. bấm tên dòng → trực quan, đúng dòng, viền đỏ trên mẫu */
   const kChon = 'thuKy'; document.querySelector('#om-kbds-ds .om-ds-ten[data-k="'+kChon+'"]').click(); await w(900);
   const f = document.getElementById('om-kbt-khung'), kd = f && f.contentDocument;
   ok('bấm tên dòng → mở 🖼 trực quan đúng dòng (mở rộng chi tiết), viền đỏ chỗ đó trên mẫu', !!document.getElementById('om-kbt') && OM_KBT.k===kChon && !!document.querySelector('#om-kbt-phai .om-ds-dong.chon[data-ok="'+kChon+'"] .om-ds-ct') && !!kd.querySelector('[data-o="'+kChon+'"].om-chon'));
   ok('trực quan bên phải = cả danh sách dòng', document.querySelectorAll('#om-kbt-phai .om-ds-dong').length===OM_MAU['10a'].o.length);
   /* 3. bấm chỗ khác trên mẫu → dòng tương ứng sáng */
   const s2 = kd.querySelector('[data-o="truongAp"]'); s2.click(); await w(400);
   ok('bấm chỗ trên mẫu → dòng bên phải chuyển theo, viền đỏ đổi chỗ', OM_KBT.k==='truongAp' && !!document.querySelector('#om-kbt-phai .om-ds-dong.chon[data-ok="truongAp"]') && !kd.querySelector('[data-o="'+kChon+'"].om-chon'));
   /* 4. đổi nguồn ngay trên dòng; gõ không mất con trỏ */
   const nutKb = [...document.querySelectorAll('#om-kbt-phai .om-ds-dong[data-ok="tk"] .om-ds-nut button')].find(x=>/⌨/.test(x.textContent)); nutKb && nutKb.click(); await w(400);
   const iTk = document.querySelector('#om-kbt-phai .om-ds-dong[data-ok="tk"] .om-ds-gt input');
   ok('đổi nguồn ✍ → ⌨ ngay trên dòng của danh sách', omCachLuu('10a', 'tk')==='kb' && !!iTk);
   iTk.focus(); iTk.value = '50000'; iTk.dispatchEvent(new Event('input', {bubbles:true})); await w(500);
   ok('gõ ở dòng danh sách → mẫu đổi, con trỏ vẫn ở ô', omKB('10a', 'tk')==='50000' && document.activeElement && document.activeElement.closest && !!document.activeElement.closest('[data-ok="tk"]'));
   omDatKB('10a', 'tk', ''); omDatCach('10a', 'tk', 'cham'); try{ dongHop(); }catch(e){} await w(300);
   /* 5. bản xem trước: bấm chữ app điền */
   hsoVe(); await w(1500);
   const xf = document.getElementById('hso-xem-khung'), xd = xf.contentDocument, nh = omNhanh('10a');
   ok('bản xem trước: chữ app điền bấm được (có viền khi rê chuột, chỉ trên màn hình)', !!xd.querySelector('style') && [...xd.querySelectorAll('style')].some(st=>/@media screen\{\[data-o\]\{cursor:pointer/.test(st.textContent)) && !/cursor:pointer/.test(HSO.x.trang||''));
   const kN = nh.find(k=>xd.querySelector('[data-o="'+k+'"]')); xd.querySelector('[data-o="'+kN+'"]').click(); await w(300);
   const rN = document.querySelector('#hso-tuy .hso-cham-o[data-ok="'+kN+'"]');
   ok('bấm chữ có ở Chọn nhanh → dòng cột trái sáng lên', !!rN && rN.classList.contains('nhay'), kN);
   const kK = OM_MAU['10a'].o.map(x=>x.k).find(k=>nh.indexOf(k)<0 && xd.querySelector('[data-o="'+k+'"]')); xd.querySelector('[data-o="'+kK+'"]').click(); await w(900);
   ok('bấm chữ không có ở Chọn nhanh → mở 🖼 trực quan đúng dòng', !!document.getElementById('om-kbt') && OM_KBT.k===kK, kK); try{ dongHop(); }catch(e){} await w(300);
   /* 6. mẫu nền ô khác: nút ⚙ cạnh Khai báo đơn vị, cột trái chỉ Chọn nhanh */
   slDoiTab('hsv'); await w(800); hsoChonMau('01td'); await w(800);
   ok('01/TD: nút ⚙ Khai báo riêng cạnh ⚙ Khai báo đơn vị; cột trái không còn khối thu gọn cũ', !!document.querySelector('[data-lenh="omkb.ds"][data-mk="01td"]') && !document.querySelector('#hso-tuy details.hso-kbr-d .hso-kbr-o') && /Chọn nhanh/.test(document.getElementById('hso-tuy').textContent));
   ok('Chọn nhanh cột trái có vạch màu nguồn (cùng ký hiệu danh sách)', [...document.querySelectorAll('#hso-tuy .hso-cham-o[data-ok]')].every(d=>/om-ds-(tu|kb|go|mau|cham)\b/.test(d.className)));
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t363 đạt'); await b.close(); process.exit(sai?1:0);
})();
