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
   /* 3.569: SĐT tổ trưởng + tổ phó lên bản in (gán chắc cho 1 tổ đang hiện) */
   const t1 = tcTo(hien[0]); t1.sdt = t1.sdt || '0909000111'; t1.pho = t1.pho || 'Phó Giả Một'; o.t1 = {ma:t1.ma, sdt:t1.sdt, pho:t1.pho};
   nut.click(); await w(500);
   const h = MAU_IN.X && MAU_IN.X.trang || '', g = MAU_IN.X && MAU_IN.X.gts[0];
   o.hop = document.getElementById('hop').classList.contains('hien') && !!document.getElementById('mi-khung');
   o.doc = /size:A4 portrait/.test(h);
   o.cot = ['STT', 'Tổ trưởng', 'SĐT tổ trưởng', 'Tổ phó', 'Mã tổ', 'Ấp / Khu phố', 'TV', 'Có DN'].every(x => h.indexOf('>'+x+'<')>=0) && h.indexOf('>Hội<')<0 && h.indexOf('>10C mới<')<0;
   const HOI = [].concat.apply([], g.d.xa.map(X => [].concat.apply([], X.diem.map(D => D.dsHoi)))), DIEM = [].concat.apply([], g.d.xa.map(X => X.diem));
   const ma = [].concat.apply([], HOI.map(H => H.dong.map(d => d.ma)));
   o.dung = ma.length===hien.length && an.every(m => ma.indexOf(m)<0) && hien.every(m => ma.indexOf(m)>=0);
   /* thứ tự trong mỗi nhóm theo bảng */
   o.thuTu = HOI.every(n => { const ix = n.dong.map(d => hien.indexOf(d.ma)); return ix.every((v, i) => !i || v>ix[i-1]); });
   /* nhóm Hội: dòng nhóm ghi đúng số tổ; STT đánh lại từ 1 mỗi Hội, số cuối = số tổ; thứ tự Hội HND → HPN → HCCB → ĐTN */
   const div = document.createElement('div'); div.innerHTML = h; const tr = [...div.querySelectorAll('table.luoi tbody tr')];
   let cur = null, sai = 0, nHoi = 0; tr.forEach(r => { if(r.classList.contains('tcin-hoi')){ if(cur && cur.n!==cur.ghi) sai++; nHoi++; const m = /— (\d+) tổ/.exec(r.textContent); cur = {ghi:m ? +m[1] : -1, n:0}; }
     else if(!r.className && cur){ cur.n++; if(+r.cells[0].textContent!==cur.n) sai++; } else if(r.className && !r.classList.contains('tcin-hoi') && cur){ if(cur.n!==cur.ghi) sai++; cur = null; } });
   o.hoi = nHoi===HOI.length && nHoi>=2 && !sai && DIEM.every(D => D.dsHoi.map(H => ['11', '12', '13', '14'].indexOf(H.dv)).every((v, i, a) => !i || v>a[i-1]));
   o.chia = /Cộng điểm [^<]*: \d+ tổ \((HND|HPN|HCCB|ĐTN) \d+/.test(h) && DIEM.every(D => Object.keys(D.c.hoi).reduce((a, k) => a+D.c.hoi[k], 0)===D.c.to);
   o.sdt = h.indexOf('>'+o.t1.sdt+'<')>=0 && h.indexOf('>'+o.t1.pho+'<')>=0;
   const tv = hien.reduce((a, m) => a+((KHO.tvChuan(tcTo(m), TC_K) || {}).tong || 0), 0);
   o.tongDung = g.d.tong.to===hien.length && g.d.tong.tv===tv && DIEM.reduce((a, n) => a+n.c.tv, 0)===tv && HOI.reduce((a, H) => a+H.c.to, 0)===hien.length;
   o.nhom = DIEM.length>=1 && (h.match(/class="tcin-nhom"/g) || []).length===DIEM.length && /Điểm GD/.test(h) && (g.d.xa.length<2 || /TỔNG CỘNG: \d+ tổ/.test(h));
   o.n = {diem:DIEM.length, hoi:HOI.length, to:g.d.tong.to, xa:g.d.xa.length};
   dongHop(); await w(150); nut.isConnected ? nut.click() : document.querySelector('.tc-kq-dau [data-lenh="tcin.mo"]').click(); await w(400);
   o.moLai = document.getElementById('hop').classList.contains('hien');
   return o; }, files);
 if(process.env.T386_ANH){ await p.screenshot({path:path.join(process.env.T386_ANH, 'hop.png')}); const h = await p.evaluate(() => MAU_IN.X.trang); fs.writeFileSync(path.join(process.env.T386_ANH, 'ds.html'), h); }
 ok('① Tra cứu › danh sách tổ: nút 🖨 In DS tổ ở đầu bảng', r.nut);
 ok('② mở hộp xem trước, A4 dọc, 8 cột: STT · Tổ trưởng · SĐT tổ trưởng · Tổ phó · Mã tổ · Ấp · TV · Có DN (3.569: bỏ cột Hội, không cột 10C)', r.hop && r.doc && r.cot);
 ok('③ đúng danh sách đang hiện: tổ bị lọc cột không in, đủ tổ còn hiện', r.dung, JSON.stringify(r.n));
 ok('③ thứ tự trong nhóm theo bảng đang sắp', r.thuTu);
 ok('④ nhóm Xã → Điểm GD → Hội, tổng tổ / TV khớp cộng dòng (KHO.tvChuan)', r.nhom && r.tongDung, JSON.stringify(r.n));
 ok('④b (3.569) dòng nhóm Hội ghi đúng số tổ, STT đánh lại từ 1 mỗi Hội (số cuối = số tổ), Hội theo thứ tự HND → HPN → HCCB → ĐTN', r.hoi, JSON.stringify(r.n));
 ok('④c (3.569) Cộng điểm / xã chia số tổ theo Hội; in SĐT tổ trưởng + tổ phó', r.chia && r.sdt, JSON.stringify({chia:r.chia, sdt:r.sdt}));
 ok('⑤ đóng rồi bấm lại vẫn mở', r.moLai);
 ok('⑥ không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); console.log((R.length-R.filter(x => x[0]==='✗').length)+'/'+R.length+' đạt');
 await b.close(); })();
