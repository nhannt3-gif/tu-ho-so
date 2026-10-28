// 3.334 (RA_SOAT_BO_CUC_2410 Đợt 1) — bố cục máy tính: dải chip mẫu cuộn ngang + nút ‹ ›, 📅 Số liệu / ⚙ Khai báo dời xuống dòng tên mẫu,
//   tiêu đề không lặp chữ, nút xuất mờ chỉ còn biểu tượng, chip BC0437/0438 KTGS ở thanh khối, Tra cứu KH hiện sẵn danh sách, ô Xã bỏ chữ "Phường". Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1280,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   const mo = async(tab, sel)=>{ slDoiTab(tab); doiNgan(7); for(let i=0;i<60 && !document.querySelector(sel);i++) await w(200); await w(500); };
   /* ① Hồ sơ vay: dải chip cuộn ngang, nút › hiện khi còn mẫu khuất, bấm › cuộn */
   await mo('hsv', '#tr7 .cn-khung');
   let k = document.querySelector('#tr7 .hso-dau .cn-khung'), r = k && k.querySelector('.gdx2-mau');
   ok('Hồ sơ vay: dải chip mẫu trong khung cuộn ngang (1 hàng)', !!r && getComputedStyle(r).flexWrap==='nowrap' && /auto|scroll/.test(getComputedStyle(r).overflowX));
   const tran = r && r.scrollWidth > r.clientWidth+2;
   ok('Hồ sơ vay: còn mẫu bị khuất → nút › hiện, ‹ ẩn', !tran || (getComputedStyle(k.querySelector('.cn-phai')).display!=='none' && getComputedStyle(k.querySelector('.cn-trai')).display==='none'), 'tràn: '+tran);
   if(tran){ r.style.scrollBehavior = 'auto'; const x0 = r.scrollLeft; k.querySelector('.cn-phai').click(); await w(300); cnSoat(k);
     ok('bấm › → dải cuộn sang phải, nút ‹ hiện', r.scrollLeft > x0 && getComputedStyle(k.querySelector('.cn-trai')).display!=='none', x0+' → '+r.scrollLeft); }
   ok('Hồ sơ vay: dải chip không còn 📅 Số liệu / ⚙ Khai báo (dời xuống dòng tên mẫu)', !/Số liệu|Khai báo đơn vị/.test(document.querySelector('#tr7 .hso-dau').textContent) &&
     !!document.querySelector('#hso-ds .hso-dau-ds .hso-ky') && /Khai báo đơn vị/.test(document.querySelector('#hso-ds .hso-dau-ds').textContent));
   hsoChonMau('sohv'); await w(600);
   const tieu = (document.querySelector('#hso-ds .hso-tieu')||{}).textContent || '';
   ok('Sổ hộ vay: tiêu đề không lặp chữ "Sổ hộ vay Sổ hộ vay"', /Sổ hộ vay/i.test(tieu) && !/Sổ hộ vay\s+Sổ hộ vay/i.test(tieu), tieu.slice(0, 60));
   const dd = document.querySelector('#hso-ds .hso-dau-ds');
   ok('dòng tên mẫu 1 dòng (không xuống hàng) ở máy tính', !!dd && dd.getBoundingClientRect().height < 40, dd && Math.round(dd.getBoundingClientRect().height)+' px');
   /* ② nút xuất mờ: giữ chỗ, chỉ còn biểu tượng (chữ vẫn trong nút) */
   await w(800); const ex = document.querySelector('#hso-xem-nut .xuat-excel');
   ok('nút 📊 Excel mờ: vẫn có (3.234 không ẩn), hẹp ≤ 44 px, chữ vẫn trong nút', !!ex && ex.disabled && ex.getBoundingClientRect().width <= 44 && /Excel/.test(ex.textContent), ex && Math.round(ex.getBoundingClientRect().width)+' px');
   /* ③ Hồ sơ Tổ: nút 📤 Gửi cùng hàng với 🖨 In */
   await mo('hst', '#tr7 .cn-khung'); await w(800);
   const gui = document.querySelector('#hso-xem-nut .xuat-gui'), inn = document.querySelector('#hso-xem-nut .xuat-in');
   ok('Hồ sơ Tổ: 📤 Gửi không rớt dòng riêng', !!gui && !!inn && Math.abs(gui.getBoundingClientRect().top - inn.getBoundingClientRect().top) < 6);
   /* ④ Giao dịch xã: dải chip cùng khung cuộn */
   await mo('gdx', '#gdx-trai .cn-khung');
   ok('Giao dịch xã: dải chip mẫu trong khung cuộn có nút ‹ ›', !!document.querySelector('#gdx-trai .cn-khung .cn-phai') && document.querySelectorAll('#gdx-trai .cn-khung .gdx-c').length===GDX_MAU.length);
   /* ⑤ KTGS: chip BC0437 / BC0438 ở thanh 3 khối, không còn ở hàng lọc */
   await mo('kt', '#tr7 .kt-khoi'); await w(800);
   ok('KTGS: chip BC0437 / BC0438 trên dải LỌC ĐỊA BÀN như mọi tab (3.395 — trước: cuối thanh khối)', [...document.querySelectorAll('#kt-cay .pv-dau .pv-chip-o .sl-chip')].filter(x=>/BC043[78]/.test(x.textContent)).length===2 && !document.querySelector('#tr7 .kt-khoi .sl-chip'));
   ok('KTGS: hàng ô chọn lọc không có chip BC0437 / BC0438 (chip ở dải tiêu đề — ô chọn không bị bóp)', ![...document.querySelectorAll('#kt-cay .pv-hang1 .sl-chip')].some(x=>/BC043[78]/.test(x.textContent)));
   /* ⑥ Tra cứu KH: mở tab là có danh sách khách theo lọc; ô Xã bỏ chữ "Phường / Xã" */
   SL_TRA_Q = ''; await mo('tra', '#sl-kq .sl-kq-dong');
   const n0 = document.querySelectorAll('#sl-kq .sl-kq-dong').length;
   ok('Tra cứu KH: chưa gõ vẫn hiện danh sách khách (toàn PGD)', n0 > 0, n0+' dòng');
   const ox = [...(document.getElementById('tc-xa')||{options:[]}).options].slice(1).map(x=>x.textContent);
   ok('ô Xã: nhãn bỏ chữ "Phường / Xã" đầu tên, còn số tổ', ox.length>0 && ox.every(t=>!/^(Xã|Phường|Thị trấn)\s/i.test(t) && /tổ\)|vay trực tiếp/.test(t)), ox.slice(0, 2).join(' | '));
   const xa = ox.length && document.getElementById('tc-xa').options[1].value;
   if(xa){ pvChon('tc', 'xa', xa); await w(800); const n1 = document.querySelectorAll('#sl-kq .sl-kq-dong').length, lech = [...document.querySelectorAll('#sl-kq .sl-kq-dong')].length && KH_GY.every(x=>(SL_DB.kh[x.m]||{}).xa===xa);
     ok('chọn 1 xã → danh sách chỉ còn khách xã đó', n1>0 && lech, n1+' dòng'); }
   SL_TRA_Q = 'zzzkhongco'; slTraTim(); ok('gõ tìm vẫn chạy như cũ (không khớp → báo)', /Không thấy khách hàng khớp/.test(document.getElementById('sl-kq').textContent));
   SL_TRA_Q = ''; slTraTim();
   return o; }, files);
 await p.screenshot({path:path.join(__dirname,'t245.png')});
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t245 đạt'); await b.close(); process.exit(sai?1:0);
})();
