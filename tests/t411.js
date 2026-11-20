// 3.557 (anh 20/11 "rà soát chuẩn hóa code cho gọn"): ① bộ đọc PDF chung PDFA (js/03) — mở, vẽ trang theo rộng / cạnh dài / tỉ lệ tối đa / xoay
//   ② nút đổi onclick → data-lenh (js/04b, 06a, 10, 11, 12) bấm vẫn chạy đúng hàm cũ · ③ hàm cũ bị thay hẳn đã xóa (bản thay vẫn chạy). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:850}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   /* ① PDF giả 2 trang A4 dọc (595 × 842) */
   const pdf = await PDFLib.PDFDocument.create(); pdf.addPage([595, 842]); pdf.addPage([842, 595]);
   const f = new File([await pdf.save()], 'gia.pdf', {type:'application/pdf'});
   const doc = await PDFA.mo(f), doc2 = await PDFA.mo(await f.arrayBuffer());
   ok('PDFA.mo: File và ArrayBuffer đều mở được', doc.numPages===2 && doc2.numPages===2);
   const c1 = await PDFA.veTrang(doc, 1, {rong:1190}), c2 = await PDFA.veTrang(doc, 1, {canh:2000, toiDa:2}), c3 = await PDFA.veTrang(doc, 1, {rong:595, xoay:90}), c4 = await PDFA.veTrang(doc, 2, {canh:1684});
   ok('rong 1190 → 1190 × 1684', c1.width===1190 && c1.height===1684, c1.width+'×'+c1.height);
   ok('canh 2000, toiDa 2 → bị chặn tỉ lệ 2 (1190 × 1684)', c2.width===1190 && c2.height===1684, c2.width+'×'+c2.height);
   ok('xoay 90 → ảnh nằm ngang (595 × 420)', c3.width===595 && c3.height===420, c3.width+'×'+c3.height);
   ok('trang ngang, canh 1684 → 1684 × 1190', c4.width===1684 && c4.height===1190, c4.width+'×'+c4.height);
   let tuChoi = ''; try{ await PDFA.mo(new File([new Uint8Array([1,2,3])], 'hong.pdf')); }catch(e){ tuChoi = 'lỗi'; }
   ok('PDF hỏng → báo lỗi (không treo)', tuChoi==='lỗi');
   const chu = await docChuPDF(f, 2); ok('docChuPDF (đọc chữ) vẫn chạy qua PDFA: đủ 2 trang', chu.trang===2, JSON.stringify(chu));
   /* ② data-lenh: bấm nút gọi đúng hàm */
   const nut = (html) => { const d = document.createElement('div'); d.innerHTML = html; document.body.appendChild(d); return d.firstChild; };
   let goi = []; const giu = {}; ['doiCD', 'batNhom', 'xoayHang', 'dichHang', 'ccMo', 'datHSDrive'].forEach(k=>{ giu[k] = window[k]; window[k] = function(){ goi.push(k+':'+JSON.stringify([].slice.call(arguments).map(x=>x && x.nodeType ? 'el' : x))); }; });
   nut('<button data-lenh="f06a.doiCD" data-a1="scan">x</button>').click();
   nut('<div data-lenh="f10.batNhom" data-a1="g2026">x</div>').click();
   nut('<button data-lenh="f12.xoayHang" data-a1="3" data-a2="180">x</button>').click();
   nut('<button data-lenh="f12.dichHang" data-a1="2" data-a2="-1">x</button>').click();
   nut('<button data-lenh="f04b.ccMo" data-a1="cc1">x</button>').click();
   nut('<button data-lenh="f06a.datHSDrive" data-a1="false">x</button>').click();
   Object.keys(giu).forEach(k=>{ window[k] = giu[k]; });
   ok('bấm nút data-lenh → gọi đúng hàm + tham số (số, chữ, đúng/sai)', goi.join('|')==='doiCD:["scan"]|batNhom:["g2026"]|xoayHang:[3,180]|dichHang:[2,-1]|ccMo:["cc1"]|datHSDrive:[false,"el"]', goi.join('|'));
   const t = nut('<span data-lenh="f11.bat">x</span>'); t.click(); const b1 = t.classList.contains('bat'); t.click();
   ok('f11.bat: bấm bật / bấm lại tắt', b1 && !t.classList.contains('bat'));
   const cu = D.cauHinh.thuGia; nut('<input type="checkbox" checked data-lenh="f06a.datBat" data-su="change" data-a1="thuGia">').dispatchEvent(new Event('change', {bubbles:true}));
   ok('f06a.datBat: ô tích ghi D.cauHinh theo khóa', D.cauHinh.thuGia===true); if(cu===undefined) delete D.cauHinh.thuGia; else D.cauHinh.thuGia = cu;
   /* ③ hàm cũ đã xóa: bản thay vẫn là bản đang dùng */
   ok('batDauScan / scanXongHop / moKyAnh / sxAnhDoc vẫn có (bản thay ở js/35, 51, 43)', ['batDauScan', 'scanXongHop', 'scanLuuMay', 'scanGui', 'moKyAnh', 'sxAnhDoc', 'tenTheCCCD', 'duongScan', 'ghiLuuTam'].every(k=>typeof window[k]==='function'));
   HS.mo = true; doiNgan(4); await w(300); batDauScan('cccd'); await w(100);
   ok('Scan › Quét gì? vẫn mở (batDauScan bản js/35 + lớp bọc)', !!document.querySelector('#hop-in .sc-loai') && !!document.querySelector('#hop-in [data-lenh="f35.scChonNguon"]'));
   try{dongHop()}catch(e){}
   return o;
 });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
