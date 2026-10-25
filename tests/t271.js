// t271 (TK 3, 3.377 — anh 26/10 "code báo trùng", "đo tốc độ ở đâu", "nút mở đóng khung xem trước scan làm tương tự bên vb"):
//   js/70 báo trùng CCCD lúc đọc (tab Scan + Quét CCCD ở form) theo số CCCD / mã KH, chọn Thay (bản cũ vào 🗑) / Lưu thêm; ⏱ ở chân thanh bên; Scan có nút ▣ như Văn bản. Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const loi=[], o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e=>loi.push(e.message)); await p.route(/accounts\.google|googleapis/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(2500);
 const dat = ()=>p.evaluate(()=>{ try{ dongHop(); }catch(e){} D.rac = [];
   D.scan = [{id:'cu1', che:'the', ten:'Nguyễn Văn Giả', maKH:'4800000001', cccd:'072099000111', ngay:'2026-09-12', matTruoc:true},
     {id:'cu2', che:'the', ten:'cccd-Trần Thị Giả - 072099000222', khoaCCCD:'072099000222', ngay:'2026-08-01', matTruoc:true},
     {id:'tl1', che:'tailieu', ten:'Tài liệu giả', maKH:'4800000001', ngay:'2026-09-01'}]; HS.ds = D.scan; doiNgan(4); });
 await dat(); await p.waitForTimeout(600);
 /* tab Scan: đọc ra 2 người — 1 đã có (theo mã KH), 1 hộ mới đã có (theo số CCCD, chưa mã KH), 1 chưa có */
 const r = await p.evaluate(()=>{ SC.che = 'the'; let e = document.getElementById('sx-doc'); if(!e){ e = document.createElement('div'); e.id = 'sx-doc'; document.body.appendChild(e); }
   SX_DOC = [{cccd:'072099000111', nguon:'QR', tim:{ma:'4800000001', theo:'CCCD'}}, {cccd:'072099000222', nguon:'QR', tim:{}}, {cccd:'072099000333', nguon:'QR', tim:{}}]; sxVeDoc();
   return [...e.children].slice(0, 3).map(d=>{ const b = d.querySelector('.btc'); return b ? b.textContent.replace(/\s+/g, ' ').trim()+(b.querySelector('input[value="thay"]').checked ? ' [thay]' : '') : ''; }); });
 ok('tab Scan: đọc xong báo "⚠ Đã có CCCD này trong tủ (lưu ngày …)" — theo mã KH và theo số CCCD (hộ chưa có mã); thẻ mới không báo; mặc định Thay', /Đã có CCCD này trong tủ: 1 bản \(lưu 12\/09\/2026\).*\[thay\]/.test(r[0]) && /lưu 01\/08\/2026/.test(r[1]) && r[2]==='', JSON.stringify(r));
 const t = await p.evaluate(()=>{ HANG = [{id:'a1', kieu:'anh'}, {id:'a2', kieu:'anh'}]; SXK = [{ma:'4800000001', cccd:'072099000111'}]; SX_DOC = SX_DOC.slice(0, 1); BTC.scan = {};
   const thay = btcScanThay().map(k=>k.id); document.querySelector('#sx-doc input[value="them"]').click(); const them = btcScanThay().map(k=>k.id); return {thay, them, chon:BTC.scan[0]}; });
 ok('chọn Thay → bản cũ cùng khách (chỉ thẻ, không đụng tài liệu) sẽ vào 🗑; chọn Lưu thêm → giữ bản cũ', t.thay.join()==='cu1' && t.them.length===0 && t.chon==='them', JSON.stringify(t));
 const n = await p.evaluate(()=>{ BTC.scan = {}; const n = btcRac(btcScanThay(), 'thử'); return {n, con:D.scan.map(k=>k.id).join(), rac:D.rac.map(k=>k.id+':'+k.lyDoXoa).join()}; });
 ok('Thay: bản cũ vào 🗑 Thùng rác (lấy lại được), tủ còn bản khác', n.n===1 && n.con==='cu2,tl1' && /cu1:thử/.test(n.rac), JSON.stringify(n));
 /* Quét CCCD ở form */
 await dat();
 const q = await p.evaluate(()=>{ QC = Object.assign(QC || {}, {r:{cccd:'072099000222'}, G:{ma:''}, tu:'cam', cat:[], anh:[]}); BTC.qc = 'thay'; qcLuuTu(); return {con:D.scan.map(k=>k.id).join(), rac:D.rac.map(k=>k.id).join()}; });
 ok('Quét CCCD ở form (lưu vào tủ, chọn Thay) → bản cũ cùng số CCCD vào 🗑', q.con==='cu1,tl1' && q.rac==='cu2', JSON.stringify(q));
 await dat();
 const q2 = await p.evaluate(()=>{ QC.r = {cccd:'072099000222'}; BTC.qc = 'them'; qcLuuTu(); return D.scan.map(k=>k.id).join(); });
 ok('form chọn Lưu thêm → giữ bản cũ', q2==='cu1,cu2,tl1', q2);
 /* ⏱ ở chân thanh bên + Scan có ▣ */
 const u = await p.evaluate(()=>{ doiNgan(4); const a = document.querySelector('#thanh-ben .tb-chan [data-lenh="dtd.mo"]'); return {do:!!a && !!a.offsetParent, pv:!!document.querySelector('#tr4 .tl-pv')}; });
 await p.click('#thanh-ben .tb-chan [data-lenh="dtd.mo"]'); await p.waitForTimeout(400);
 ok('⏱ Đo tốc độ có nút ở chân thanh bên (máy tính), bấm mở hộp số đo', u.do && /Đo tốc độ/.test(await p.textContent('#hop-in')), JSON.stringify(u));
 ok('Scan có nút ▣ bật / tắt khung xem như Văn bản', u.pv);
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); console.log(o.filter(x=>x[0]==='✓').length+'/'+o.length+' đạt'); await b.close(); process.exit(o.some(x=>x[0]!=='✓') ? 1 : 0); })();
