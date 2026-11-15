// 3.523 (anh 14/11): KTGS › Kiểm tra sau 30 ngày — bảng tổ: ô tích chọn tổ + chọn hết, ấp theo danh sách tổ (không còn "chưa rõ ấp"),
// cột Ngày GN, Hạn KT (GN sớm nhất + 30 ngày, quá hạn tô đỏ), Mục đích (ngành, gom ×n), cột số căn phải thẳng tiêu đề. Dữ liệu GIẢ dựng trong phép thử.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1200);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const mon = (ku, kh, ngn, gnT, nganh) => ({ku, kh, ten:'Khách Giả '+kh, ngn, gnT, dn:gnT, c_ten_pnkt51:nganh, _th:'2026-10'});
   window.KT_GN = {khoa:'gia', thang:['2026-10'], thieu:[], ngay:{}, kh:{}, ds:{'2026-10':{
     '9000001':{t:{ma:'9000001', ten:'Tổ Giả Một', tenThon:'', tenXa:'Xã Thử', xa:'999001'}, mon:[mon('K1','H1','2026-10-05',30e6,'Chăn nuôi bò'), mon('K2','H2','2026-10-20',40e6,'Chăn nuôi bò'), mon('K3','H2','2026-10-20',10e6,'Trồng cây ăn quả')]},
     '9000002':{t:{ma:'9000002', ten:'Tổ Giả Hai', tenThon:'', tenXa:'Xã Thử', xa:'999001'}, mon:[mon('K4','H4','2099-12-01',50e6,'Buôn bán')]}}}};
   window.KT_K = {to:{'9000001':{ma:'9000001', ten:'Tổ Giả Một', tenThon:'Ấp Một', tenXa:'Xã Thử'}, '9000002':{ma:'9000002', ten:'Tổ Giả Hai', tenThon:'Ấp Hai', tenXa:'Xã Thử'}}};
   window.ktGNTrongPV = () => true; const C = ktCH(); C.to = ''; C.gnLan = ''; KT_GN_BO_TO = {}; KT_GN_BO = {};
   let d = document.getElementById('kt-gn'); if(!d){ let the = document.getElementById('kt-the'); if(!the){ the = document.createElement('div'); the.id = 'kt-the'; document.body.appendChild(the); } d = document.createElement('div'); d.id = 'kt-gn'; the.appendChild(d); } d.innerHTML = ktGNDsHTML();
   const tb = d.querySelector('table.kt-gn-bang'), th = [...tb.querySelectorAll('thead th')].map(x=>x.textContent.trim());
   ok('cột: ☐ · Tổ · Ấp · Ngày GN · Hạn KT · Số hộ · Số món · GN · Mục đích (bỏ Tháng GN)', JSON.stringify(th)===JSON.stringify(['','Tổ (mã)','Ấp','Ngày GN','Hạn KT','Số hộ','Số món','GN (tr)','Mục đích']), th.join('|'));
   const r1 = [...tb.querySelectorAll('tbody tr')].find(x=>/9000001/.test(x.textContent)), c = r1 ? [...r1.cells].map(x=>x.textContent.trim()) : [];
   ok('ấp theo danh sách tổ (không "chưa rõ ấp")', c[2] && /Ấp Một/.test(c[2]) && !/chưa rõ/.test(tb.textContent), c[2]);
   ok('Ngày GN: các ngày trong tháng, không trùng', c[3]==='05/10, 20/10', c[3]);
   ok('Hạn KT = ngày GN sớm nhất + 30 ngày, quá hạn tô đỏ', c[4]==='04/11' && r1.cells[4].classList.contains('do'), c[4]);
   const r2 = [...tb.querySelectorAll('tbody tr')].find(x=>/9000002/.test(x.textContent));
   ok('chưa tới hạn → không tô đỏ', r2 && !r2.cells[4].classList.contains('do'));
   ok('số hộ / số món / GN đúng', c[5]==='2' && c[6]==='3' && c[7]===ktTr(80e6), c.slice(5, 8).join('|'));
   ok('Mục đích: gom ngành ×n', c[8]==='Chăn nuôi bò ×2 · Trồng cây ăn quả', c[8]);
   const cs = getComputedStyle(tb.querySelector('thead th:nth-child(6)')).textAlign, ct = getComputedStyle(r1.cells[1]).textAlign;
   ok('tiêu đề cột số căn phải, tên tổ căn trái', cs==='right' && ct==='left', cs+' / '+ct);
   ok('mặc định tích hết: 2 phiếu', ktGNChon().length===2 && /Xem 2 phiếu/.test(d.textContent));
   /* bỏ tích tổ 2 */
   const cb2 = r2.querySelector('input[data-lenh="ktgn.to"]'); cb2.checked = false; cb2.dispatchEvent(new Event('change', {bubbles:true})); await w(100);
   ok('bỏ tích 1 tổ → 1 phiếu, dòng mờ, ô chọn hết bỏ', ktGNChon().length===1 && /Xem 1 phiếu/.test(d.textContent) && d.querySelector('tr.kt-gn-bo') && !d.querySelector('input[data-lenh="ktgn.toHet"]').checked);
   const het = d.querySelector('input[data-lenh="ktgn.toHet"]'); het.checked = true; het.dispatchEvent(new Event('change', {bubbles:true})); await w(100);
   ok('Chọn hết → lại 2 phiếu', ktGNChon().length===2);
   const h2 = d.querySelector('input[data-lenh="ktgn.toHet"]'); h2.checked = false; h2.dispatchEvent(new Event('change', {bubbles:true})); await w(100);
   ok('Bỏ hết → 0 phiếu, nút Xem tắt', ktGNChon().length===0 && d.querySelector('.kt-in button.chinh').disabled);
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t397 đạt'); await b.close(); process.exit(sai?1:0);
})();
