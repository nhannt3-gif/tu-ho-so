// 3.152 — Xuất chung (anh chốt ý 2, 4 — docs/KE_HOACH_GON_GIAO_DIEN.md): mọi khung xem báo cáo cùng 1 hàng nút, cùng thứ tự
//   Đóng · 🖨 In · 📄 PDF · 📝 Word · 📊 Excel · 📤 Gửi (ẩn định dạng không có); 📤 Gửi = menu Gửi file PDF / Word / Excel + 📋 Copy ảnh / chữ;
//   tên file Loại_Phạm vi_Kỳ; khung xem file: 🖨 In · ✎ Sửa · 📤 Gửi. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const ctx = await b.newContext({viewport:{width:1536,height:730}, permissions:['clipboard-read','clipboard-write']});
 const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); await w(300);
   ok('tên file Loại_Phạm vi_Kỳ, không dấu', xuatTen('Tổng hợp', 'Xã Truông Mít', '2026-10')==='TongHop_XaTruongMit_T10-26', xuatTen('Tổng hợp', 'Xã Truông Mít', '2026-10'));
   /* Tổng hợp */
   slDoiTab('th'); doiNgan(7); for(let i=0;i<60 && !TH_K;i++) await w(250); await w(300);
   thXem(); for(let i=0;i<40 && !document.getElementById('th-khung');i++) await w(250); await w(800);
   const nut = () => [...document.querySelectorAll('#hop-in .xuat-hang button')].map(x=>x.textContent.trim());
   ok('Tổng hợp: Đóng · 🖨 In · 📄 PDF · 📝 Word (mờ — 3.234 không ẩn) · 📊 Excel · 📤 Gửi', nut().join('|')==='Đóng (Esc)|🖨 In|📄 PDF|📝 Word|📊 Excel|📤 Gửi' && document.querySelector('#hop-in .xuat-word').disabled, nut().join('|'));
   const bs = [...document.querySelectorAll('#hop-in .xuat-hang button')], x0 = b => Math.round(b.getBoundingClientRect().left);
   ok('Đóng bên trái, 📤 Gửi bên phải cùng', x0(bs[0]) < x0(bs[1]) && x0(bs[bs.length-1]) === Math.max.apply(null, bs.map(x0)));
   ok('tên PDF: TongHop_… _T08-26', /_T08-26$/.test(XUAT.ten), XUAT.ten);
   let pdf = null; const inPDF0 = inPDF; window.inPDF = (h, t) => { pdf = {dai:h.length, ten:t}; };
   document.querySelector('#hop-in .xuat-pdf').click(); await w(100); window.inPDF = inPDF0;
   ok('📄 PDF → hộp in "Lưu dưới dạng PDF" với tên điền sẵn', pdf && pdf.ten===XUAT.ten && pdf.dai>1000, JSON.stringify(pdf));
   document.querySelector('#hop-in .xuat-gui').click(); await w(150);
   const menu = document.getElementById('menu').textContent;
   ok('📤 Gửi: Gửi file PDF · Excel + 📋 Copy ảnh · 📋 Copy chữ', document.getElementById('menu').classList.contains('hien') && /PDF/.test(menu) && /Excel/.test(menu) && /Copy ảnh/.test(menu) && /Copy chữ/.test(menu) && !/Word/.test(menu), menu.slice(0, 120));
   dongMenu();
   dongHop();
   /* Sao kê, Tổ: cùng hàng */
   slDoiTab('sk'); doiNgan(7); for(let i=0;i<60 && !SK_K;i++) await w(250); await w(300);
   const C = skCH(); C.bc = {}; C.bc[SK_BC[0].k] = true; skXem(); await w(1200);
   ok('Sao kê: cùng hàng Đóng · In · PDF · Excel · Gửi', nut().join('|')==='Đóng (Esc)|🖨 In|📄 PDF|📊 Excel|📤 Gửi', nut().join('|')+' · '+(document.querySelector('#hop-in .hop-tit')||{}).textContent);
   const xuat0 = XUAT; XUAT = {html:()=>'<html><body><div class="trang"><div class="bc-dau"><div>PGD GIẢ</div><div>T8/2026</div></div><h1>BÁO CÁO GIẢ</h1><table><tr><th>Xã</th><th>Dư nợ</th></tr><tr><td>Xã A</td><td>1.000</td></tr><tr><td>Xã B</td><td>2.000</td></tr><tr><td>Cộng</td><td>3.000</td></tr></table></div></body></html>'};
   const x = xuatChuTuHTML(xuatHTML());
   ok('Copy chữ: đầu trang tách dòng (PGD / kỳ / tiêu đề)', /^PGD GIẢ\nT8\/2026\nBÁO CÁO GIẢ/.test(x.chu), JSON.stringify(x.chu.slice(0, 40)));
   ok('Copy chữ: bảng → dòng có tab giữa ô', x.chu.split('\n').filter(l=>l.indexOf('\t')>0).length === 4, x.chu.split('\n').length+' dòng');
   await xuatChepChu(); await w(300);
   let clip = ''; try{ clip = await navigator.clipboard.readText(); }catch(e){ clip = 'lỗi '+e.message; }
   ok('Copy chữ: bộ nhớ tạm có chữ báo cáo', clip.indexOf('\t')>0, clip.slice(0, 60));
   let anh = null; try{ anh = await xuatAnhBlob(xuatHTML()); }catch(e){ anh = {loi:e.message}; }
   ok('Copy ảnh: vẽ được trang báo cáo thành ảnh PNG', anh && anh.type==='image/png' && anh.size>2000, anh && (anh.type+' '+anh.size+(anh.loi||''))); XUAT = xuat0;
   dongHop();
   /* KTGS: có Word, nút ‹ quay lại giữ bên trái */
   ok('hàng có Word: Đóng · ‹ … · 🖨 In · 📄 PDF · 📝 Word · 📤 Gửi', (()=>{ const d = document.createElement('div'); d.innerHTML = xuatHang({truoc:'<button class="nho">‹ Đổi lựa chọn in</button>', html:()=>'<html><body>x</body></html>', in:'x()', pdf:'y()', word:'z()'}); return [...d.querySelectorAll('button')].map(x=>x.textContent).join('|')==='Đóng (Esc)|‹ Đổi lựa chọn in|🖨 In|📄 PDF|📝 Word|📤 Gửi'; })());
   ok('KTGS: các hàm xuất nhận cách "pdf"', ['ktGNIn','ktTrang06Xuat','ktBCIn','ktPCXuat','ktKHIn'].every(f=>/cach==='pdf'/.test(String(window[f]))));
   /* khung xem file */
   D.vanBan = [{id:'v1', nhom:'vanBan', tenMoi:'2026-10-01 12_HD-NHCS Thử.pdf', soHieu:'12/HD-NHCS', ngay:'2026-10-01', trichYeu:'Hướng dẫn giả', mang:'Tín dụng', ctrinh:['HN']}]; luu();
   doiNgan(1); await w(300); mucDangXem = D.vanBan[0];
   const day = [...document.querySelectorAll('#cotphai .day-p button')].filter(b=>b.style.display!=='none').map(b=>b.textContent.trim());
   ok('khung xem file: 🖨 In · ✎ Sửa · 📤 Gửi', day.join('|')==='🖨 In|✎ Sửa|📤 Gửi', day.join('|'));
   [...document.querySelectorAll('#cotphai .day-p button')].find(b=>/📤 Gửi/.test(b.textContent)).click(); await w(150);
   const m2 = document.getElementById('menu').textContent;
   ok('📤 Gửi file: tải / gửi file + Copy số hiệu + trích yếu', /Tải file về|Gửi file/.test(m2) && /số hiệu \+ trích yếu/.test(m2), m2.slice(0, 100));
   [...document.querySelectorAll('#menu button')].find(b=>/số hiệu/.test(b.textContent)).click(); await w(300);
   let c2 = ''; try{ c2 = await navigator.clipboard.readText(); }catch(e){}
   ok('Copy số hiệu + trích yếu', c2==='12/HD-NHCS · 01/10/2026 · Hướng dẫn giả', c2);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
