// t261 (TK 3, 3.338): 🩺 Sức khỏe sao lưu — thẻ đầu ⚙ Khai báo đơn vị › 💾 Sao lưu: từng khối đã lên Drive lúc nào, phần đổi chưa đẩy, cài đặt, bản tự lưu trên máy;
//   đỏ khi chưa nối Drive mà có dữ liệu / chưa đẩy quá 7 ngày / bản tự lưu cũ quá 7 ngày. Chỉ đọc mốc có sẵn (không đổi luồng lưu). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const R = await p.evaluate(async()=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   D.vanBan.push({id:'vb-gia-1', nhom:'vanBan', soHieu:'01/GIA', trichYeu:'Văn bản giả', ngay:'2026-10-01', tenMoi:'a.pdf'});
   D.ghiChu = D.ghiChu || []; D.ghiChu.push({id:'gc-gia-1', nhom:'ghiChu', noiDung:'Ghi chú giả', ngay:'2026-10-02'});
   const coNoi = coTheNoiDrive; const the = () => document.querySelector('#hop-in .sk-the');
   /* 1. chưa nối Drive */
   window.coTheNoiDrive = () => false; hsoKBHop('sl'); await w(200);
   const kd = [...document.querySelectorAll('#hop-in .hso-kb-nhom')].find(x=>/Đồng bộ Drive theo khối/.test(x.textContent));
   ok('thẻ 🩺 Sức khỏe sao lưu ở tab 💾 Sao lưu, đứng trước các phần cũ (☁ Đồng bộ theo khối…)', !!the() && !!kd && !!(the().compareDocumentPosition(kd) & Node.DOCUMENT_POSITION_FOLLOWING));
   const dVB = () => [...the().querySelectorAll('tbody tr')].find(r=>/Văn bản/.test(r.textContent));
   ok('chưa nối Drive + có văn bản → dòng Văn bản đỏ "chưa nối Drive", báo mục cần xử lý', !!dVB() && dVB().classList.contains('sk-do') && /chưa nối Drive/.test(dVB().textContent) && /cần xử lý/.test(the().textContent), dVB() && dVB().textContent);
   dongHop();
   /* 2. đã nối, đã đẩy hôm nay → xanh */
   window.coTheNoiDrive = () => true; const c = kdMoc(), F = kdGoi(), nay = new Date().toISOString();
   Object.keys(F).forEach(n=>{ c.kdBam[n] = kdBam(F[n]); c.kdKeo[n] = nay; });
   await KHO1.chup('phép thử'); hsoKBHop('sl'); await w(200);
   ok('đã đẩy hết hôm nay + bản tự lưu mới → mọi dòng xanh, "đã lên Drive"', skDo()===0 && dVB().classList.contains('sk-xanh') && /đã lên Drive/.test(dVB().textContent) && /✓ Dữ liệu đã lên Drive/.test(the().textContent), skDo());
   ok('ghi giờ đồng bộ gần nhất', /\d\d:\d\d \d\d\/\d\d\/\d{4}/.test(dVB().textContent), dVB().textContent);
   dongHop();
   /* 3. đổi văn bản, chưa đẩy, mốc cũ 10 ngày → đỏ; mốc hôm nay → vàng chờ */
   D.vanBan.push({id:'vb-gia-2', nhom:'vanBan', soHieu:'02/GIA', trichYeu:'Văn bản giả 2', ngay:'2026-10-03', tenMoi:'b.pdf'});
   const nVB = Object.keys(kdGoi()).filter(n=>/^vanban__/.test(n)), cu = new Date(Date.now()-10*864e5).toISOString();
   nVB.forEach(n=>{ c.kdKeo[n] = nay; }); hsoKBHop('sl'); await w(200);
   ok('có phần đổi chưa đẩy, mới đồng bộ hôm nay → vàng "chờ đẩy"', dVB().classList.contains('sk-vang') && /chờ đẩy/.test(dVB().textContent), dVB().textContent);
   dongHop(); nVB.forEach(n=>{ c.kdKeo[n] = cu; }); hsoKBHop('sl'); await w(200);
   ok('chưa đẩy và lần đồng bộ cuối quá 7 ngày → đỏ', dVB().classList.contains('sk-do') && /quá 7 ngày/.test(dVB().textContent), dVB().textContent);
   dongHop();
   /* 4. không đổi luồng lưu: các nút cũ của tab Sao lưu vẫn còn */
   hsoKBHop('sl'); await w(200);
   ok('tab Sao lưu giữ nguyên phần cũ (☁ Đồng bộ theo khối, 📸 Tự lưu, ⬆ Xuất khai báo)', /Đồng bộ Drive theo khối/.test(document.getElementById('hop-in').textContent) && /Tự lưu trên máy này/.test(document.getElementById('hop-in').textContent) && /Xuất khai báo/.test(document.getElementById('hop-in').textContent));
   dongHop(); window.coTheNoiDrive = coNoi;
   return o; });
 R.forEach(x=>o.push(x)); o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
