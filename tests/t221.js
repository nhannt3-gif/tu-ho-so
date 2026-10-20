// 3.291 — lưới "Bản vừa quét" chế độ Thẻ: mỗi mặt dời 4 chiều (◀ ▶ ▲ ▼), chọn ảnh rồi bấm phím mũi tên, nút 🔄 Lật. Ảnh GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const anh = await new Promise(r=>{ const c=document.createElement('canvas'); c.width=300; c.height=190; c.getContext('2d').fillRect(0,0,10,10); c.toBlob(r,'image/jpeg',0.9); });
   doiNgan(4); await w(200); SC.che = 'the'; HANG = [];
   for(let i=0;i<6;i++){ const id = 't221_'+i; await luuAnhHS(id, anh); HANG.push({id, kieu:'anh', che:'the', ten:'a'+i}); }
   moHangCho(); await w(300);
   const ten = () => HANG.map(x=>x.ten).join(',');
   const nut = (i, d) => document.querySelector('#hc-anh [data-lenh="hc.dich"][data-i="'+i+'"][data-d="'+d+'"]');
   ok('mỗi mặt có ◀ ▶ ▲ ▼; mép lưới thì nút tắt', !!nut(0, 2) && nut(0, -2).disabled && nut(0, -1).disabled && !nut(3, -2).disabled && nut(5, 2).disabled && nut(5, 1).disabled);
   nut(0, 2).click(); await w(100);
   ok('▼ mặt trước người 1 → xuống người 2 (cùng cột, đổi chỗ)', ten()==='a2,a1,a0,a3,a4,a5', ten());
   nut(3, -2).click(); await w(100);
   ok('▲ mặt sau người 2 → lên người 1', ten()==='a2,a3,a0,a1,a4,a5', ten());
   nut(4, 1).click(); await w(100);
   ok('▶ đổi với ảnh liền sau (trước ↔ sau trong cùng người)', ten()==='a2,a3,a0,a1,a5,a4', ten());
   /* chọn ảnh + phím mũi tên */
   chamHang(1); await w(100); const ph = k => document.dispatchEvent(new KeyboardEvent('keydown', {key:k, bubbles:true, cancelable:true}));
   ph('ArrowDown'); await w(100); ph('ArrowDown'); await w(100); ph('ArrowLeft'); await w(100);
   ok('chọn ảnh rồi ↓ ↓ ← → ảnh đi theo, vẫn đang chọn', ten()==='a2,a1,a0,a4,a3,a5' && HC_CHON===4 && HANG[HC_CHON].ten==='a3', ten()+' chọn '+HC_CHON);
   ok('nút 🔄 Lật (180°) hiện rõ ở mỗi mặt thẻ', document.querySelectorAll('#hc-anh button[onclick^="xoayHang"]').length===6 && /🔄 Lật/.test(document.querySelector('#hc-anh button[onclick^="xoayHang"]').textContent));
   dongHop(); HANG = []; HC_CHON = -1;
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5).join(' | '));
 console.log(R.filter(x=>x[0]==='✓').length+'/'+R.length+' đạt'); await b.close(); process.exit(R.some(x=>x[0]!=='✓') || loi.length ? 1 : 0);
})();
