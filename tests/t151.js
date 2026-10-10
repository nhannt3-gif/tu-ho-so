// 3.155 — Luồng Scan (anh chốt ý 7, 11 — docs/KE_HOACH_GON_GIAO_DIEN.md): quét → chỉnh → Xem → hộp chọn
//   💾 Lưu vào máy (PDF như bản in) · 📤 Gửi · 📋 Copy ảnh · 🗄 Lưu vào tủ (chọn khách: mã KH + tên + ấp → <Xã>/<Ấp>/<Mã KH> <Tên>.pdf);
//   không tự lưu tạm vào tủ; phiên quét dở giữ trong máy, quá 7 ngày tự bỏ. Dữ liệu GIẢ (ảnh vẽ bằng canvas, khách giả).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const ctx = await b.newContext({viewport:{width:1536,height:730}, permissions:['clipboard-read','clipboard-write']});
 const p=await ctx.newPage(); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const anh = async (id, mau) => { const c = document.createElement('canvas'); c.width = 400; c.height = 250; const g = c.getContext('2d'); g.fillStyle = mau; g.fillRect(0, 0, 400, 250); g.fillStyle = '#000'; g.fillText('THẺ GIẢ', 20, 40);
     const bl = await new Promise(r=>c.toBlob(r, 'image/png')); await luuAnhHS(id, bl); };
   doiNgan(4); await w(300); D.scan = []; HS.ds = D.scan; SC.che = 'the';
   await anh('qA', '#cde'); await anh('qB', '#edc');
   HANG = [{id:'qA', kieu:'anh', ten:'a.png', che:'the', xoay:0, mat:'truoc'}, {id:'qB', kieu:'anh', ten:'b.png', che:'the', xoay:0, mat:'sau'}]; ghiHang();
   XH = {bl:new Blob(['%PDF-1.4 giả'], {type:'application/pdf'})};
   tiepHang(); await w(200);
   const hop = document.getElementById('hop-in').textContent;
   ok('Tiếp → hộp chọn: 💾 Lưu vào máy · 📤 Gửi · 📋 Copy ảnh · 🗄 Lưu vào tủ', /Lưu vào máy/.test(hop) && /Gửi/.test(hop) && /Copy ảnh/.test(hop) && /Lưu vào tủ hồ sơ/.test(hop) && document.querySelectorAll('#hop-in .sx-o').length===4);
   ok('thẻ: Lưu vào máy ghi "4 người / A4" (PDF như bản in)', /4 người \/ A4/.test(hop));
   ok('không tự lưu tạm vào tủ (D.scan vẫn trống), phiên quét dở giữ trong máy', D.scan.length===0 && !!localStorage.getItem(KHOA_HANG));
   /* Lưu vào máy (máy tính → tải về) */
   let tai = null; const tx0 = taiXuongBlob; window.taiXuongBlob = (bl, ten) => { tai = ten; };
   scanLuuMay(); window.taiXuongBlob = tx0;
   ok('💾 Lưu vào máy: tải PDF, nút có ✓', /^CCCD \d\d-\d\d-\d\d \d\dh\d\d\.pdf$/.test(tai||'') && document.querySelector('.sx-o.da'), tai);
   /* Copy ảnh */
   scanCopyAnh(); await w(800);
   let kieu = ''; try{ const it = await navigator.clipboard.read(); kieu = it[0].types.join(','); }catch(e){ kieu = 'lỗi '+e.message; }
   ok('📋 Copy ảnh: bộ nhớ tạm có ảnh PNG (2 mặt ghép)', /image\/png/.test(kieu), kieu);
   const g = await scanAnhGhep(); ok('ảnh ghép đủ lớn', g && g.size>1000, g && g.size);
   /* Lưu vào tủ: chọn khách */
   SL_SAN = true; SL_DB = {luc:'', kh:{'KHGIA01':{ten:'Nguyễn Văn Giả', tenThon:'Ấp Giả Một', tenXa:'Xã Giả', xa:'901', thon:'902', cccd:'012345678901', ky:'2026-08'}}, to:{}}; slDungTim();
   scanLuuTuHop(); await w(200);
   const t0 = document.getElementById('sx-tim-0'); t0.value = 'giả'; scanTimKH(0); await w(50);
   const nut = document.querySelector('#sx-gy-0 button');
   ok('🗄 gõ tên → gợi ý khách theo danh bạ (mã KH, ấp, xã)', nut && /Nguyễn Văn Giả/.test(nut.textContent) && /KHGIA01/.test(nut.textContent) && /Ấp Giả Một/.test(nut.textContent));
   nut.click(); await w(50);
   ok('chọn khách → hiện mã KH · tên — ấp, xã', /KHGIA01 · Nguyễn Văn Giả/.test(document.getElementById('sx-chon-0').textContent));
   scanLuuTu(); await w(500);
   const k = D.scan[0];
   ok('lưu vào tủ: 1 bản, có mã KH + tên + ấp + xã, không "chưa khai", không tổ', D.scan.length===1 && k.maKH==='KHGIA01' && k.ten==='Nguyễn Văn Giả' && k.ap==='Ấp Giả Một' && k.xa==='Xã Giả' && !k.chuaKhai && !k.to && k.matTruoc && k.matSau, JSON.stringify({ma:k && k.maKH, ap:k && k.ap}));
   ok('thư mục Drive: CCCD / <Xã> / <Ấp>; tên file <Mã KH> <Tên>.pdf', duongScan(k)===D.cauHinh.thumuc+' / CCCD / Xã Giả / Ấp Giả Một' && /^KHGIA01 Nguy.*Gi.*\.pdf$/.test(tenScanDrive(k)), duongScan(k)+' · '+tenScanDrive(k));
   ok('trạng thái: đủ thông tin (chỉ còn chờ lên Drive), không đòi điểm GD / tổ', ttScan(k).thieu.join()==='Chưa lên Drive', ttScan(k).thieu.join());
   ok('ảnh mặt trước / sau đã gắn vào hồ sơ', !!(await docAnhHS(k.id+'_matTruoc')) && !!(await docAnhHS(k.id+'_matSau')));
   ok('lưu xong: bỏ phiên quét (hàng chờ trống, không còn trong máy)', HANG.length===0 && !localStorage.getItem(KHOA_HANG));
   /* Xong mà chưa làm gì → hỏi */
   HANG = [{id:'qC', kieu:'anh', ten:'c.png', che:'the', xoay:0}]; await anh('qC', '#ccc'); SX = null; tiepHang(); await w(100);
   scanXongBo(); await w(100);
   ok('✓ Xong khi chưa lưu / gửi → hỏi "Bỏ bản vừa quét?"', /Bỏ bản vừa quét\?/.test(document.getElementById('hop-in').textContent) && HANG.length===1); dongHop();
   /* phiên quá 7 ngày tự bỏ */
   HANG = []; localStorage.setItem(KHOA_HANG, JSON.stringify({che:'the', ds:[{id:'qC', kieu:'anh'}], luc:new Date(Date.now()-8*864e5).toISOString()}));
   napHangCu(); ok('phiên quét dở quá 7 ngày → tự bỏ', HANG.length===0 && !localStorage.getItem(KHOA_HANG));
   localStorage.setItem(KHOA_HANG, JSON.stringify({che:'the', ds:[{id:'qD', kieu:'anh'}], luc:new Date().toISOString()}));
   napHangCu(); ok('phiên còn mới → mở lại tiếp được', HANG.length===1 && HANG[0].id==='qD');
   HANG = []; ghiHang();
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
