// 3.416.1 (anh 31/10: "quét 1 lần nhiều CCCD cũng đọc xác nhận nhưng khi bấm lưu lại đưa vào hàng chờ khai lại từng cái")
//   🗄 Lưu vào tủ lượt nhiều người: ai đã xác định (Mẫu 31 / tổ trưởng) vào tủ đúng khách, ai chưa chắc → ⏳ Chờ sắp xếp (giữ số CCCD);
//   đang đọc CCCD mà bấm Lưu → chờ đọc xong tự lưu. Khách giả (không dữ liệu thật).
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   const giuNhom = window.scanNhom; window.scanNhom = ()=>[[null, null], [null, null], [null, null]]; SC.che = 'the';
   const kh = (ma, ten)=>({ma:ma, ten:ten, xa:'Xã Giả', ap:'Ấp Giả', maXa:'X1', maAp:'A1', cccd:''});
   /* ① đang đọc → bấm Lưu: chưa lưu, đánh dấu chờ */
   D.scan = []; window.SX = {ten:'x'}; SXK.length = 0; SXK[0] = kh('9000000001', 'Nguyễn Văn Giả');
   SX_DOC = [{dang:false, cccd:'072000000001', tim:{ma:'9000000001'}}, {dang:true}, {dang:false}];
   qlLuuTu(); await w(100);
   ok('đang đọc CCCD mà bấm Lưu → chưa lưu, đọc xong tự lưu', D.scan.length===0 && SX && SX.choLuu===true, D.scan.length);
   /* ② 2 người xác định + 1 chưa chắc → tách */
   window.SX = {ten:'x'}; SXK.length = 0; SXK[0] = kh('9000000001', 'Nguyễn Văn Giả'); SXK[2] = Object.assign(kh('9000000003', 'Trần Thị Giả'), {vaiTro:'tt'});
   SX_DOC = [{dang:false, cccd:'072000000001', tim:{ma:'9000000001'}}, {dang:false, cccd:'072000000002', ten:'LÊ VĂN CHƯA', tim:{goiY:'9000000009'}}, {dang:false, cccd:'072000000003', tim:{tt:{}}}];
   qlLuuTu(); await w(500);
   const vao = D.scan.filter(k=>!k.chuaKhai), cho = D.scan.filter(k=>k.chuaKhai);
   ok('2 người đã xác định vào tủ đúng khách', vao.length===2 && vao.map(k=>k.maKH).join()==='9000000001,9000000003', vao.map(k=>k.maKH).join());
   ok('tổ trưởng giữ vai trò tt', (vao[1]||{}).vaiTro==='tt');
   ok('1 người chưa chắc → Chờ sắp xếp, giữ số CCCD + tên đọc được', cho.length===1 && cho[0].cccd==='072000000002' && /LÊ VĂN CHƯA - 072000000002/.test(cho[0].ten) && !cho[0].maKH, cho[0] && cho[0].ten);
   ok('bản chờ đếm ở ⏳ Chờ sắp xếp', sxDemCho()>=1, sxDemCho());
   ok('đóng phiên quét sau khi lưu', !window.SX && SXK.length===0);
   /* ③ 1 người chưa chắc (lượt 1 người) → như cũ: Chờ sắp xếp qua Lưu tạm */
   window.scanNhom = ()=>[[null, null]]; window.SX = {ten:'cccd-x'}; SXK.length = 0; SX_DOC = [{dang:false, cccd:'072000000004', tim:{goiY:'1'}}];
   let goi = 0; const giuApp = window.scanLuuApp; window.scanLuuApp = ()=>{ goi++; }; qlLuuTu(); window.scanLuuApp = giuApp;
   ok('lượt 1 người chưa chắc → Lưu tạm như cũ', goi===1);
   /* ④ không ai xác định → như cũ (cả lượt vào Chờ) */
   window.scanNhom = ()=>[[null, null], [null, null]]; window.SX = {ten:'x'}; SXK.length = 0; SX_DOC = [{dang:false, tim:{}}, {dang:false, tim:{}}];
   goi = 0; window.scanLuuApp = ()=>{ goi++; }; qlLuuTu(); window.scanLuuApp = giuApp;
   ok('không ai xác định → Lưu tạm cả lượt như cũ', goi===1);
   window.scanNhom = giuNhom; window.SX = null;
   return o; });
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
