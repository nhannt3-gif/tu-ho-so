// 3.239: nút khung app (index.html) theo data-lenh — thanh bên đổi tab + tô sáng, ô tìm ✕, cài đặt / hướng dẫn / thùng rác, khung xem file (Gửi file → menu đúng chỗ, bấm nền đóng),
//   bấm nền hộp đóng hộp · trả bộ nhớ ảnh tạm (xoayAnh, anhTam, tải file). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const w = t=>p.waitForTimeout(t), ev = f=>p.evaluate(f);
 await ev(async()=>{ await xongTV; try{dongHop()}catch(e){} });
 ok('index.html không còn onclick (nút khung app theo data-lenh)', !/onclick=/.test(require('fs').readFileSync(path.resolve(__dirname,'..','index.html'),'utf8')));
 /* thanh bên cũ (#hangngan) — đổi tab + tô sáng */
 r = await ev(()=>{ const n = document.querySelector('#hangngan [data-lenh="khung.ngan"][data-n="1"]'); if(!n) return 'không có nút'; n.click(); return {ngan:nganHienTai, chon:n.classList.contains('chon')}; });
 ok('nút tab (data-lenh khung.ngan) → đổi tab + tô sáng', r.ngan===1 && r.chon, JSON.stringify(r));
 r = await ev(()=>{ const t = document.getElementById('otim'); if(!t) return 'không có ô tìm'; t.value = 'abc'; document.querySelector('[data-lenh="khung.xoaTim"]').click(); return t.value; });
 ok('✕ ô tìm xóa chữ', r==='', r);
 await ev(()=>document.querySelector('[data-lenh="khung.moRac"]').click()); await w(300);
 ok('🗑 thùng rác → mở Dọn kho phần thùng rác', await ev(()=>DK.mo && DK.phan==='rac'));
 await ev(()=>{ DK.mo = false; moHop('<div class="hop-tit">Thử</div><div class="hang-nut"><button class="nho" onclick="dongHop()">Đóng</button></div>'); }); await w(200);
 /* bấm nền hộp (ngoài khung) → đóng; bấm trong khung → không đóng */
 await ev(()=>{ document.getElementById('hop-in').click(); }); await w(200);
 const con = await ev(()=>document.getElementById('hop').classList.contains('hien'));
 await ev(()=>{ document.getElementById('hop').dispatchEvent(new MouseEvent('click', {bubbles:true})); }); await w(300);
 ok('bấm trong hộp không đóng · bấm nền hộp → đóng', con && !(await ev(()=>document.getElementById('hop').classList.contains('hien'))));
 await ev(()=>document.querySelector('[data-lenh="khung.caiDat"][data-k="hd"]').click()); await w(300);
 ok('số bản → mở Cài đặt / Hướng dẫn', await ev(()=>!!document.querySelector('.cai-dat, #cd, .hop-tit, #caidat') || document.getElementById('hop').classList.contains('hien')));
 await ev(()=>{ try{ dongCaiDat(); }catch(e){} try{ dongHop(); }catch(e){} }); await w(200);
 /* khung xem file: Gửi file → menu đặt theo nút (trước dùng currentTarget của onclick) */
 r = await ev(()=>{ window.mucDangXem = {id:'x', tenMoi:'a.pdf'}; const n = document.querySelector('[data-lenh="khung.guiFileMenu"]'); const m = document.getElementById('menu'); try { n.click(); } catch(e){ return 'lỗi '+e.message; } return {hien:m && m.classList.contains('hien'), trai:m && m.style.left}; });
 ok('📤 Gửi file (khung xem) → menu hiện, không lỗi', r && r.hien, JSON.stringify(r));
 await ev(()=>{ try{ dongMenu(); }catch(e){} window.mucDangXem = null; });
 /* trả bộ nhớ ảnh tạm */
 r = await ev(async()=>{ let tao = 0, tra = 0; const c = URL.createObjectURL, v = URL.revokeObjectURL; URL.createObjectURL = function(x){ tao++; return c.call(URL, x); }; URL.revokeObjectURL = function(u){ tra++; return v.call(URL, u); };
   const cv = document.createElement('canvas'); cv.width = 40; cv.height = 20; const bl = await new Promise(r=>cv.toBlob(r, 'image/png'));
   const xo = await xoayAnh(bl); const im = new Image(); anhTam(im, bl); await new Promise(r=>setTimeout(r, 300));
   URL.createObjectURL = c; URL.revokeObjectURL = v; return {tao:tao, tra:tra, xoay:!!xo && xo.size>0}; });
 ok('xoayAnh + anhTam: tạo bao nhiêu ảnh tạm trả bấy nhiêu', r.xoay && r.tao===2 && r.tra===2, JSON.stringify(r));
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); })();
let r;
