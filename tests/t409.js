// t409 (3.554 + 3.555 nút 🗑 trên tiêu đề cột ngày cũ, anh 16/11 "code xóa dữ liệu cũ không phải cuối tháng và có sao kê mới"): 🗑 Xóa bản theo ngày cũ gồm cả sao kê theo ngày (TK 104 / 105 / phân kỳ)
//   KHÔNG phải cuối tháng mà đã có bản mới hơn cùng loại; bản cuối tháng + bản mới nhất mỗi loại giữ nguyên. Kho giả (chỉ mục SLM, không cần file).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const r = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){}
   const them = (loai, ky)=>{ SLM.bang[slKhoa(loai, ky)] = {loai, ky, ngay:ky, luc:'2026-11-01T00:00:00Z', soDong:1, tong:{n:1, rieng:1, du:0}}; };
   [['tk104','2026-10-25'],['tk104','2026-10-31'],['tk105','2026-09-20'],['tk105','2026-10-25'],['tk105','2026-10-31'],['pk','2026-09-30'],['pk','2026-10-31'],['tk104','2026-11-05']].forEach(x=>them(x[0], x[1]));
   const cu = slDsSkCu().map(e=>e.loai+'|'+e.ky).join(',');
   const nut = /Xóa bản theo ngày cũ/.test((slNapThem('2026-10'), document.getElementById('hop').textContent)); dongHop();
   const cuHoi = hoi; let tieuDe = ''; hoi = function(t, phu, nhan, ham){ tieuDe = t; ham(); };
   slXoaNgayCu(); await new Promise(z=>setTimeout(z, 1500)); hoi = cuHoi;
   const con = Object.keys(SLM.bang).map(k=>SLM.bang[k]).filter(e=>/^(tk10[45]|pk)$/.test(e.loai)).map(e=>e.loai+'|'+e.ky).sort().join(',');
   return {cu, nut, tieuDe, con}; });
 ok('chọn đúng sao kê thừa: không phải cuối tháng + có bản mới hơn cùng loại (tk104 25/10, tk105 20/09 + 25/10)', r.cu==='tk105|2026-09-20,tk104|2026-10-25,tk105|2026-10-25', r.cu);
 ok('⋯ Nạp & KT hiện nút "Xóa bản theo ngày cũ" khi chỉ còn sao kê cũ', r.nut);
 ok('xóa xong: còn bản cuối tháng (30/09, 31/10) + bản mới nhất (tk104 05/11); hỏi không ghi "giữ ngày" rỗng', r.con==='pk|2026-09-30,pk|2026-10-31,tk104|2026-10-31,tk104|2026-11-05,tk105|2026-10-31' && /^Xóa 3 bản theo ngày cũ\?$/.test(r.tieuDe), r.con+' · '+r.tieuDe);
 /* 3.555: nút 🗑 trên tiêu đề cột ngày cũ */
 const r2 = await p.evaluate(async()=>{
   const them = (loai, ky)=>{ SLM.bang[slKhoa(loai, ky)] = {loai, ky, ngay:ky, luc:'2026-11-01T00:00:00Z', soDong:1, tong:{n:1, rieng:1, du:0}}; };
   [['tk104','2026-10-25'],['tk105','2026-10-25']].forEach(x=>them(x[0], x[1]));
   D.cauHinh.slTab = 'nap'; SL_KY = '2026-10'; doiNgan(7); veSoLieu(); await new Promise(z=>setTimeout(z, 800));
   const n = document.querySelector('.sl-xoa-cot[data-a="2026-10-25"]'), n31 = document.querySelector('.sl-xoa-cot[data-a="2026-10-31"]');
   if(!n) return {co:false, th:[...document.querySelectorAll('.sl-luoi thead th')].map(x=>x.textContent).join('|')};
   const cuHoi = hoi; let t = ''; hoi = function(tt, phu, nhan, ham){ t = tt; ham(); }; n.click(); await new Promise(z=>setTimeout(z, 1500)); hoi = cuHoi;
   return {co:true, k31:!!n31, t, con:['tk104|2026-10-25','tk105|2026-10-25'].filter(k=>SLM.bang[k]).length, giu:!!SLM.bang['tk104|2026-11-05'] && !!SLM.bang['tk105|2026-10-31']}; });
 ok('3.555 cột ngày 25/10 có nút 🗑 trên tiêu đề (cột cuối tháng không có) → bấm xóa đúng 2 bản của ngày đó, bản khác giữ', r2.co && !r2.k31 && /^Xóa 2 bản theo ngày cũ\?$/.test(r2.t) && r2.con===0 && r2.giu, JSON.stringify(r2));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t409 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
