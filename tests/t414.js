// t414 (3.562 chuẩn hóa — anh 22/11 "tiếp và gộp"): bỏ onclick / oninput / onchange viết thẳng ở js/19 (bộ sửa danh mục), js/22b (KTGS: 👁 Xem trước nhận HÀM,
//   bảng ngành, 2 mặt), js/06 (hỏi OK, tag, chip, ô số hiệu, Hôm nay, hướng dẫn), js/04b3 (lịch việc, kiểu chữ sổ, "Cần xử lý" fn là hàm).
//   Mỗi nút gọi đúng hàm cũ, đúng tham số. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 await p.evaluate(async()=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){}
   window.GOI = []; window.boc = (n, goi)=>{ const c = window[n]; window[n] = function(){ GOI.push(n+':'+[].slice.call(arguments).map(x=>x && x.nodeType ? 'el' : x).join('|')); if(goi) return c.apply(this, arguments); }; };
   window.the = (h)=>{ let d = document.getElementById('t414'); if(d) d.remove(); d = document.createElement('div'); d.id = 't414'; d.innerHTML = h; document.body.appendChild(d); return d; }; });
 /* 1. js/19 danh mục */
 let r = await p.evaluate(()=>{ ['dmDoiTen', 'dmDoiPhu', 'dmDoiTK', 'dmDoiCho', 'dmXoa', 'dmThem', 'dmMacDinh'].forEach(n=>boc(n)); GOI.length = 0;
   const d = the(dmHTML('mang')), q = s=>d.querySelector(s);
   q('[data-lenh="f19.doiCho"][data-a3="1"]').click(); q('[data-lenh="f19.xoa"]').click(); q('[data-lenh="f19.them"]').click(); q('[data-lenh="f19.macDinh"]').click();
   const o2 = q('[data-lenh="f19.doiTen"]'); o2.value = 'Tên mới'; o2.dispatchEvent(new Event('change', {bubbles:true}));
   return {g:GOI.splice(0), oc:d.querySelectorAll('[onclick],[onchange],[oninput]').length}; });
 ok('danh mục: ↓ / ✕ / + Thêm / mặc định / đổi tên → đúng hàm + (loại, vị trí số)', r.g.join()==='dmDoiCho:mang|0|1,dmXoa:mang|0,dmThem:mang,dmMacDinh:mang,dmDoiTen:mang|0|el' && r.oc===0, JSON.stringify(r));
 /* 2. js/22b */
 r = await p.evaluate(()=>{ GOI.length = 0; const d = the(ktInNutXem(function(){ GOI.push('xem1'); })+ktInNutXem(function(){ GOI.push('xem2'); })+
     '<input type="checkbox" id="hm" data-lenh="f22b.haiMat" data-su="change">');
   d.querySelectorAll('[data-lenh="f22b.xem"]')[1].click(); d.querySelectorAll('[data-lenh="f22b.xem"]')[0].click();
   const c = d.querySelector('#hm'); c.checked = true; c.dispatchEvent(new Event('change', {bubbles:true}));
   return {g:GOI.splice(0), hm:D.cauHinh.ktHaiMat}; });
 ok('KTGS: 👁 Xem trước gọi đúng hàm của từng nút (nơi gọi truyền hàm); ô 2 mặt lưu cấu hình', r.g.join()==='xem2,xem1' && r.hm===1, JSON.stringify(r));
 r = await p.evaluate(()=>[['js/22c', typeof ktGNXem], ['js/22d', typeof ktBCXem], ['js/22e', typeof ktKHXem], ['js/56', typeof ktDX04], ['js/80', typeof KTTO]].filter(x=>x[1]==='undefined').map(x=>x[0]));
 ok('6 nơi gọi ktInNutXem còn đủ hàm xem trước', r.length===0, JSON.stringify(r));
 /* 3. js/06 */
 r = await p.evaluate(async()=>{ GOI.length = 0; hoi('Hỏi giả', 'phụ', 'Đồng ý', function(){ GOI.push('ok'); });
   document.querySelector('#hop [data-lenh="f06.hoiOK"]').click(); const dong = !document.getElementById('hop').classList.contains('hien');
   boc('tgHd'); boc('bamChipGon', 1); boc('moHuongDan'); boc('dongCaiDat');
   const d = the(tgChipHTML('Tag giả')+oNgay('Ngày', 'o414', '2026-01-02')+oChonGon('Chọn', 'cg414', ['A', 'B'], ['A'], true)+tgC('T1', false, true, 3));
   d.querySelector('[data-lenh="f06.goTag"]').click(); const goTag = !d.querySelector('.sg-chip');
   d.querySelector('[data-lenh="f06.homNay"]').click(); const hn = document.getElementById('o414').value===ngayVN(ngayISO(nay()));
   d.querySelector('[data-lenh="f06.chipGon"][data-v="B"]').click();
   const t1 = d.querySelector('.tg-c'); t1.click();
   return {g:GOI.splice(0), dong, goTag, hn, t1:t1.className}; });
 ok('hộp hỏi: Đồng ý → đóng hộp rồi chạy hàm; ✕ gỡ tag; Hôm nay; chip gọn (1 lựa chọn); tag gợi ý bật / bỏ "goi"', r.g.join()==='ok,tgHd:,bamChipGon:el|1' && r.dong && r.goTag && r.hn && / bat/.test(r.t1) && !/goi/.test(r.t1), JSON.stringify(r));
 r = await p.evaluate(()=>{ GOI.length = 0; const d = the('<button data-lenh="f06.moHD" data-a1="moi">x</button><button data-lenh="f06.moHD">y</button>');
   d.querySelectorAll('button').forEach(x=>x.click()); try{dongHop()}catch(e){} return GOI.splice(0); });
 ok('Cài đặt › ❓ Hướng dẫn / ✨ Có gì mới → dongCaiDat + moHuongDan(đúng trang)', r.join()==='dongCaiDat:,moHuongDan:moi,dongCaiDat:,moHuongDan:', JSON.stringify(r));
 /* 4. js/04b3 */
 r = await p.evaluate(()=>{ GOI.length = 0; boc('lcXong'); boc('datPhongSo'); boc('doiNgan');
   HN_VIEC = [{fn:function(){ GOI.push('fn0'); }}, {di:3}];
   const d = the('<div data-lenh="f04b3.datGon" data-a1="x"><span class="gon-chip" data-lenh="f04b3.viec" data-a1="0">a</span><span class="gon-chip" data-lenh="f04b3.viec" data-a1="1">b</span></div>'+
     '<div data-lenh="f04b3.lcChonViec" data-a1="v9"><span class="lc-tick" data-lenh="f04b3.lcXong" data-a1="v9">✓</span></div><div data-lenh="f04b3.phong" data-a1="viet">p</div>');
   const cu = D.cauHinh.moCXL; d.querySelectorAll('.gon-chip').forEach(x=>x.click()); d.querySelector('.lc-tick').click(); d.querySelector('[data-lenh="f04b3.phong"]').click();
   return {g:GOI.splice(0), gon:D.cauHinh.moCXL===cu}; });
 ok('Hôm nay › Cần xử lý: chip chạy hàm fn / đi tab (không bật–tắt khung cha); ✓ xong việc không chọn dòng; kiểu chữ sổ', r.g.join()==='fn0,doiNgan:3,lcXong:v9,datPhongSo:viet' && r.gon, JSON.stringify(r));
 r = await p.evaluate(()=>{ const s = ['moChoKhai'].map(n=>typeof window[n]); return s.join(); });
 ok('hàm của việc "File chờ khai" còn', r==='function', r);
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t414 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
