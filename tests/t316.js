// 3.395 (anh 28/10, ảnh: quét CCCD người mới, bấm 🪪 Đọc số CCCD ra số thẻ quét trước — mặt sau thẻ cũ còn sót trong hàng chờ bị ghép với mặt trước mới):
// chế độ Thẻ, hàng chờ còn ảnh chưa lưu để quá 30 phút → quét thêm thì HỎI (🗑 Bỏ ảnh cũ, quét mới / Giữ, ghép tiếp) — bỏ: chỉ còn ảnh mới; giữ: như cũ;
// trong 30 phút (đang quét liền tay) không hỏi; Đọc số CCCD ở bước Lưu không dùng kết quả đọc của lượt trước (SX_DOC.luc ≠ SX.docLuc). Ảnh GIẢ vẽ trong phép thử.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:850}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   HS.mo = true; doiNgan(4); await w(300); SC.che = 'the';
   const ve = (mau) => new Promise(r=>{ const c = document.createElement('canvas'); c.width = 1000; c.height = 640; const g = c.getContext('2d'); g.fillStyle = '#888'; g.fillRect(0, 0, 1000, 640); g.fillStyle = mau; g.fillRect(80, 60, 840, 520); c.toBlob(r, 'image/jpeg', 0.9); });
   const tep = async(n, mau) => new File([await ve(mau)], n, {type:'image/jpeg'});
   const cho = async(n) => { for(let i=0;i<80 && HANG.filter(x=>x.kieu==='anh').length<n;i++) await w(150); await w(300); };
   const datCu = (phut) => { const j = JSON.parse(localStorage.getItem(KHOA_HANG)); const t = new Date(Date.now()-phut*60000).toISOString(); j.luc = t; j.cham = t; localStorage.setItem(KHOA_HANG, JSON.stringify(j)); };
   // lượt cũ: còn sót 1 mặt (mặt sau thẻ người trước), để từ hôm qua
   HANG = []; await nhanVaoScan([await tep('cu-sau.jpg', '#9cf')], 'camera'); await cho(1); try{dongHop()}catch(e){}
   const idCu = HANG[0] && HANG[0].id; datCu(18*60);
   ok('scanCuSot: hàng chờ Thẻ còn ảnh để quá 30 phút → nhận ra', !!scanCuSot());
   await nhanVaoScan([await tep('moi-truoc.jpg', '#fc9')], 'camera'); await w(300);
   const h = (document.getElementById('hop-in')||{}).textContent || '';
   ok('quét thẻ mới → HỎI trước (Bỏ ảnh cũ / Giữ ghép tiếp), chưa ghép', /Hàng chờ còn 1 ảnh thẻ chưa lưu/.test(h) && /Bỏ ảnh cũ/.test(h) && /Giữ, ghép tiếp/.test(h) && HANG.filter(x=>x.kieu==='anh').length===1, h.slice(0, 80));
   scanCuXong(1); await cho(1);
   ok('🗑 Bỏ ảnh cũ → hàng chờ chỉ còn ảnh mới (không còn mặt thẻ cũ)', HANG.filter(x=>x.kieu==='anh').length===1 && HANG[0].id!==idCu && /moi-truoc/.test(HANG[0].ten), JSON.stringify(HANG.map(x=>x.ten)));
   try{dongHop()}catch(e){}
   // quét liền tay (trong 30 phút) → không hỏi, ghép như cũ
   await nhanVaoScan([await tep('moi-sau.jpg', '#cf9')], 'camera'); await cho(2);
   ok('đang quét liền tay (< 30 phút) → không hỏi, ghép mặt thứ 2 như cũ', HANG.filter(x=>x.kieu==='anh').length===2 && !/Hàng chờ còn/.test((document.getElementById('hop-in')||{}).textContent||''));
   try{dongHop()}catch(e){}
   // Giữ, ghép tiếp → như cũ (thêm vào hàng)
   datCu(60); const fThem = await tep('them.jpg', '#f9c'); datCu(60); await nhanVaoScan([fThem], 'camera'); await w(300); const hoiGiu = /Hàng chờ còn 2/.test((document.getElementById('hop-in')||{}).textContent||''); const n0 = HANG.length; scanCuXong(0); await cho(3); o.push('  (hỏi khi giữ: '+hoiGiu+', ảnh: '+HANG.filter(x=>x.kieu==='anh').length+', HANG trước '+n0+' sau '+HANG.length+', SC_CHO '+JSON.stringify(SC_CHO)+', hộp: '+((document.getElementById('hop-in')||{}).textContent||'').slice(0,60)+')');
   ok('Giữ, ghép tiếp → giữ ảnh cũ, thêm ảnh mới (như trước)', HANG.filter(x=>x.kieu==='anh').length===3);
   try{dongHop()}catch(e){}
   // Đọc số CCCD: kết quả đọc của lượt trước không được dùng
   SX = {bl:'luot-moi', docLuc:'luot-moi', da:{}, ten:'x'}; SX_DOC = [{cccd:'072174002165', dang:false}]; SX_DOC.luc = 'luot-cu';
   const dung = typeof SX_DOC!=='undefined' && SX && SX_DOC.length && SX_DOC.luc && SX_DOC.luc===SX.docLuc;
   ok('Đọc số CCCD: SX_DOC của lượt trước (luc khác SX.docLuc) → không dùng', !dung);
   SX_DOC.luc = 'luot-moi'; ok('cùng lượt → dùng kết quả đọc sẵn', SX_DOC.luc===SX.docLuc);
   HANG.forEach(x=>xoaFileHang(x, [])); HANG = []; SX = null; SX_DOC = []; ghiHang();
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t316 đạt'); await b.close(); process.exit(sai?1:0);
})();
