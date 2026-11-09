// 3.505 (anh 09/11 "cần xuất nhanh ds tổ có xã, điểm theo ds lọc khi cần, A4 dọc, các cột cơ bản"): Tra cứu KH › danh sách tổ › 🖨 In DS tổ (js/58b)
//   ① nút ở đầu bảng tổ ② bản in A4 dọc, cột STT · Tổ trưởng · Mã tổ · Ấp · Hội · TV · Có DN ③ đúng danh sách đang hiện: tổ bị lọc cột (ẩn) không in, thứ tự theo bảng
//   ④ nhóm Xã → Điểm GD, cộng từng điểm, tổng = cộng dòng; TV / Có DN = KHO.tvChuan như bảng ⑤ đóng rồi mở lại được ⑥ không lỗi trang. Dữ liệu GIẢ (gianho31). T386_ANH=thư mục → ghi ảnh.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const p = await b.newPage({viewport:{width:1366, height:860}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1200);
 const r = await p.evaluate(async(files) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const s = atob(f.b), u = new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i] = s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) try { await slGhi(kq); } catch(e){} }
   kyChungDoi('2026-08'); dhSL('tra'); for(let i=0;i<60 && !TC_K;i++) await w(200);
   const c = [...document.querySelectorAll('.tc-theo [data-lenh], .tc-theo button, .tc-theo .chip')].find(x => /Tổ trưởng/.test(x.textContent) && x.offsetParent); c && c.click(); await w(800);
   const nut = document.querySelector('.tc-kq-dau [data-lenh="tcin.mo"]'); o.nut = !!nut;
   /* ẩn 2 dòng như lọc cột (js/77 đặt r.hidden) */
   const rows = [...document.querySelectorAll('.tc-to-ds tbody tr[data-to]')]; o.tong = rows.length; rows[0].hidden = true; rows[3].hidden = true;
   const an = [rows[0].getAttribute('data-to'), rows[3].getAttribute('data-to')], hien = rows.filter(x => !x.hidden).map(x => x.getAttribute('data-to'));
   nut.click(); await w(500);
   const h = MAU_IN.X && MAU_IN.X.trang || '', g = MAU_IN.X && MAU_IN.X.gts[0];
   o.hop = document.getElementById('hop').classList.contains('hien') && !!document.getElementById('mi-khung');
   o.doc = /size:A4 portrait/.test(h);
   o.cot = ['STT', 'Tổ trưởng', 'Mã tổ', 'Ấp / Khu phố', 'Hội', 'TV', 'Có DN'].every(x => h.indexOf('>'+x+'<')>=0);
   const ma = [].concat.apply([], g.d.nhom.map(n => n.dong.map(d => d.ma)));
   o.dung = ma.length===hien.length && an.every(m => ma.indexOf(m)<0) && hien.every(m => ma.indexOf(m)>=0);
   /* thứ tự trong mỗi nhóm theo bảng */
   o.thuTu = g.d.nhom.every(n => { const ix = n.dong.map(d => hien.indexOf(d.ma)); return ix.every((v, i) => !i || v>ix[i-1]); });
   const tv = hien.reduce((a, m) => a+((KHO.tvChuan(tcTo(m), TC_K) || {}).tong || 0), 0);
   o.tongDung = g.d.tong.to===hien.length && g.d.tong.tv===tv && g.d.nhom.reduce((a, n) => a+n.tv, 0)===tv;
   o.nhom = g.d.nhom.length>=1 && (h.match(/class="tcin-nhom"/g) || []).length===g.d.nhom.length && /Điểm GD/.test(h) && /Tổng cộng: \d+ tổ/.test(h);
   o.n = {nhom:g.d.nhom.length, to:g.d.tong.to};
   dongHop(); await w(150); nut.isConnected ? nut.click() : document.querySelector('.tc-kq-dau [data-lenh="tcin.mo"]').click(); await w(400);
   o.moLai = document.getElementById('hop').classList.contains('hien');
   return o; }, files);
 if(process.env.T386_ANH){ await p.screenshot({path:path.join(process.env.T386_ANH, 'hop.png')}); const h = await p.evaluate(() => MAU_IN.X.trang); fs.writeFileSync(path.join(process.env.T386_ANH, 'ds.html'), h); }
 ok('① Tra cứu › danh sách tổ: nút 🖨 In DS tổ ở đầu bảng', r.nut);
 ok('② mở hộp xem trước, A4 dọc, đủ 7 cột cơ bản', r.hop && r.doc && r.cot);
 ok('③ đúng danh sách đang hiện: tổ bị lọc cột không in, đủ tổ còn hiện', r.dung, JSON.stringify(r.n));
 ok('③ thứ tự trong nhóm theo bảng đang sắp', r.thuTu);
 ok('④ nhóm Xã → Điểm GD, tổng tổ / TV khớp cộng dòng (KHO.tvChuan)', r.nhom && r.tongDung, JSON.stringify(r.n));
 ok('⑤ đóng rồi bấm lại vẫn mở', r.moLai);
 ok('⑥ không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
