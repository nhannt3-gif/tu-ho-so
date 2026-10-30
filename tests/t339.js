// 3.416.1 (anh 31/10: "khi add 1 file lớn app đọc lâu nhưng không báo tiến độ") — Thêm file: báo từng bước (dò trùng · lưu vào máy · đọc chữ PDF trang i/n),
//   thanh tiến độ tăng theo bước (không đứng ở 0 khi chỉ 1 file), nhiều file ghi "file i/n". PDF giả tự dựng (không dữ liệu thật).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const pdf = (chu)=>{ const tr = chu.map((c, i)=>`${3+i*2} 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 300]/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>>>>>/Contents ${4+i*2} 0 R>>endobj\n${4+i*2} 0 obj<</Length ${('BT /F1 12 Tf 20 200 Td ('+c+') Tj ET').length}>>stream\nBT /F1 12 Tf 20 200 Td (${c}) Tj ET\nendstream endobj\n`).join('');
     return '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids['+chu.map((_, i)=>(3+i*2)+' 0 R').join(' ')+']/Count '+chu.length+'>>endobj\n'+tr+'trailer<</Root 1 0 R>>\n%%EOF'; };
   const ghi = [], pt = []; const g1 = window.dangLamChu, g2 = window.tienChay;
   window.dangLamChu = c=>{ ghi.push(c); g1(c); }; window.tienChay = x=>{ pt.push(x); g2(x); };
   const f1 = new File([pdf(['So 12/NHCS-GD ngay 01/10/2026', 'Trang hai'])], 'van-ban-gia-1.pdf', {type:'application/pdf'});
   gioiThieuFile([f1]); for(let i=0;i<100 && dangDoc;i++) await w(100);
   ok('1 file: báo dò trùng (kèm dung lượng) → lưu vào máy → đọc chữ PDF', ghi.some(c=>/van-ban-gia-1\.pdf · dò trùng \(\d+ KB\)/.test(c)) && ghi.some(c=>/lưu vào máy/.test(c)) && ghi.some(c=>/đọc chữ PDF/.test(c)), ghi.slice(0, 6).join(' | '));
   ok('đọc chữ PDF báo theo trang i/n', ghi.some(c=>/trang \d\/2/.test(c)), ghi.filter(c=>/trang/.test(c)).join(' | '));
   ok('1 file: thanh tiến độ tăng dần trước khi xong (không đứng 0 → 100)', pt.some(x=>x>0 && x<100) && pt[pt.length-1]===100, pt.join(','));
   ghi.length = 0; pt.length = 0;
   const f2 = new File(['ghi chu gia'], 'ghi-chu-gia.txt', {type:'text/plain'}), f3 = new File([pdf(['Trang mot'])], 'van-ban-gia-3.pdf', {type:'application/pdf'});
   gioiThieuFile([f2, f3]); for(let i=0;i<100 && dangDoc;i++) await w(100);
   ok('nhiều file: ghi "file i/n"', ghi.some(c=>/file 1\/2 · ghi-chu-gia\.txt/.test(c)) && ghi.some(c=>/file 2\/2 · van-ban-gia-3\.pdf/.test(c)), ghi.slice(0, 4).join(' | '));
   ok('đọc xong: hết trạng thái đang đọc, không treo', !dangDoc && THEM_TD===null);
   window.dangLamChu = g1; window.tienChay = g2;
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
