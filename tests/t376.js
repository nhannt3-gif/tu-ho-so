// t376 (3.478, anh 05/11 "khi nhập KH cơ bản sẽ liền mạch nhưng đôi khi có vài chương trình bị đứt quãng, không khớp — nguyên tắc luôn theo QĐ mới nhất,
//   và báo bị đứt chênh ở QĐ nào, chương trình nào"): ⚠ ĐỨT CHUỖI QĐ.
//   ① lõi pbDutChuoi (js/47, node): đúng QĐ / chương trình / xã / nguồn / chênh, ngưỡng, QĐ trước không ghi Đến 31/12, khác năm không nối
//   ② màn: bảng ⚠ Đứt chuỗi ở Diễn biến + tab Quyết định, ⚠ đứt ở dòng bảng cơ bản, ô QĐ tô khi Tách từng QĐ, bấm dòng → ✎ sửa QĐ, KH vẫn theo QĐ mới nhất, Excel sheet Dut chuoi. QĐ GIẢ.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = vm.createContext({console}); vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', '47-phan-bo.js'), 'utf8'), ctx);
const o = [], ok = (t, d, c)=>o.push((d ? '✓ ' : '✗ ')+t+(c!==undefined && !d ? ' — '+c : ''));
const Q = (id, so, ngay, xa, ct, nguon)=>({id, so, kyHieu:'/QĐ-GIẢ', ngay, luc:ngay, nguon:nguon || 1, xa, tenXa:'Xã '+xa, ct});
const C = (ma, dg, tg, den)=>({ma, daGiao:dg, tangGiam:tg, den3112:den});
const qd = [
  Q('a', '100', '2026-02-01', 'X', [C('01', 1000, 100, 1100), C('03', 500, 0, 500)]),
  Q('b', '100', '2026-02-01', 'Y', [C('01', 300, 0, 300)]),
  Q('c', '101', '2026-05-01', 'X', [C('01', 1100, 50, 1150), C('03', 480, 20, 500)]),   /* 03: đứt −20 */
  Q('d', '101', '2026-05-01', 'Y', [C('01', 300.5, 0, 300.5)]),                         /* lệch 0,5 ≤ ngưỡng 1 → không báo */
  Q('e', '102', '2026-08-01', 'X', [C('01', 1200, -100, 1100)]),                        /* 01: đứt +50 */
  Q('f', '103', '2026-03-01', 'X', [C('01', 0, 200, null)], 2),                         /* ĐP: Đến 31/12 trống → Đã giao + tăng = 200 */
  Q('g', '104', '2026-09-01', 'X', [C('01', 150, 0, 150)], 2),                          /* ĐP: đứt −50 */
  Q('h', '9', '2025-12-01', 'X', [C('01', 0, 0, 999)])];                                /* năm trước — không nối sang 2026 */
ctx.v = qd; const d = vm.runInContext('pbDutChuoi(v, 2026)', ctx);
ok('lõi: 3 chỗ đứt, xếp theo ngày QĐ', d.length===3 && d.map(x=>x.q.so).join(',')==='101,102,104', d.map(x=>x.q.so+':'+x.ma+':'+x.chenh).join(' '));
ok('QĐ 101 · CT 03 · Xã X · TW: Đã giao 480 ≠ Đến 31/12 QĐ 100 = 500 (−20)', d[0].ma==='03' && d[0].xa==='X' && d[0].nguon===1 && d[0].daGiao===480 && d[0].denTruoc===500 && d[0].chenh===-20 && d[0].qTruoc.so==='100');
ok('QĐ 102 · CT 01: 1.200 ≠ 1.150 của QĐ 101 (+50)', d[1].ma==='01' && d[1].chenh===50 && d[1].qTruoc.so==='101');
ok('nguồn ĐP tách riêng; QĐ trước không ghi Đến 31/12 → Đã giao + Tăng/giảm (200) → QĐ 104 −50', d[2].nguon===2 && d[2].denTruoc===200 && d[2].chenh===-50);
ok('lệch ≤ ngưỡng (0,5 triệu) không báo; QĐ năm trước không nối sang năm nay', !d.some(x=>x.xa==='Y') && !d.some(x=>x.qTruoc.so==='9'));
ctx.v = qd; ok('ngưỡng 30 → chỉ còn 2 chỗ (±50)', vm.runInContext('pbDutChuoi(v, 2026, 30)', ctx).length===2);
/* ② màn hình */
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b = await chromium.launch(); const loi = []; const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const r = await p.evaluate(async([files, qd])=>{ await xongTV; try{ dongHop(); }catch(e){} const o = {}, w = t=>new Promise(r=>setTimeout(r, t)); window.SL_KHONG_TU_KIEM = 1; window.confirm = ()=>true;
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('pb'); doiNgan(7); for(let i=0;i<40 && !(PB.dsXa||[]).length;i++) await w(200);
   const ma = PB.dsXa.map(x=>x.ma), map = {X:ma[0], Y:ma[1]};
   const dl = pbDL(); dl.qd = qd.map(q=>Object.assign({}, q, {xa:map[q.xa], tenXa:(PB.xa[map[q.xa]]||{}).ten || q.tenXa, ct:q.ct.map(c=>Object.assign({ten:''}, c))})); dl.qdKhong = []; pbGhi(dl);
   pbDoiMuc('qd'); await w(500);
   const trai = document.getElementById('pb-trai');
   o.qdTab = !!trai.querySelector('table.pb-dut-bang') && trai.querySelectorAll('table.pb-dut-bang tbody tr').length===3 && /Đứt chuỗi QĐ: 3 dòng ở 3 QĐ/.test(trai.textContent);
   pbDoiMuc('db'); for(let i=0;i<40 && !document.querySelector('#pb-phai table.pb-b');i++) await w(150);
   const ph = document.getElementById('pb-phai'), dut = ph.querySelector('table.pb-dut-bang');
   const dong = dut ? [...dut.querySelectorAll('tbody tr')].map(t=>t.textContent.replace(/\s+/g, ' ')) : [];
   o.db = dong.length===3 && /101/.test(dong[0]) && /\(03\)/.test(dong[0]) && /−20|-20/.test(dong[0]) && /QĐ 100/.test(dong[0]); o.dbChu = dong.join(' | ').slice(0, 300);
   const hang = [...ph.querySelectorAll('table.pb-b tbody tr')].find(t=>/\(03\)/.test(t.cells[1].textContent) && t.classList.contains('pb-b-c1'));
   o.co = !!hang && /⚠ đứt −20|⚠ đứt -20/.test(hang.textContent);
   const x1 = [...ph.querySelectorAll('table.pb-b tbody tr')].find(t=>/\(01\)/.test(t.cells[1].textContent) && t.classList.contains('pb-b-c1'));
   o.kh = !!x1 && x1.cells[5].textContent.trim()!=='' ; o.khChu = x1 ? [...x1.cells].map(c=>c.textContent.trim()).join(' | ') : '';
   const r0 = PB.db.r, n01 = r0.nhom.find(n=>n.xa===map.X && n.ma==='01' && n.nguon===1); o.moiNhat = !!n01 && n01.khCuoi===1100;   /* KH = Đến 31/12 QĐ 102 (mới nhất) dù đứt */
   document.querySelector('[data-lenh="pb.dbTachQD"]').click(); await w(300);
   const oD = [...document.querySelectorAll('#pb-phai table.pb-b td.pb-dut-o')]; o.oTo = oD.some(c=>/Đứt chuỗi: Đã giao 480 ≠ Đến 31\/12 QĐ 100 500/.test(c.title)) && oD.some(c=>/Có đứt chuỗi ở QĐ này/.test(c.title));   /* dòng con ghi chênh, dòng tổng báo có đứt */
   document.querySelector('[data-lenh="pb.dbTachQD"]').click(); await w(200);
   document.querySelector('#pb-phai table.pb-dut-bang tbody tr').click(); await w(300);
   o.sua = !!PB.F && PB.F.so==='101' && !!document.querySelector('#hop.hien #pb-f'); dongHop(); PB.F = null; await w(100);
   let bl = null; const gf = window.giaoFile; window.giaoFile = (x)=>{ bl = x; }; pbDBExcel(); for(let i=0;i<60 && !bl;i++) await w(100); window.giaoFile = gf;
   if(bl){ const wb = XLSX.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}), a = XLSX.utils.sheet_to_json(wb.Sheets['Dut chuoi'], {header:1}); o.xls = a.length===4 && /101/.test(a[1][0]) && a[1][10]===-20; }
   o.in = /Đứt chuỗi QĐ/.test(pbDBIn()) && /pb-dut-bang/.test(pbDBIn());
   return o; }, [files, qd]);
 ok('tab 📋 Quyết định: bảng ⚠ Đứt chuỗi QĐ — 3 dòng ở 3 QĐ', r.qdTab);
 ok('📈 Diễn biến: bảng ⚠ Đứt chuỗi — QĐ 101 · CT 03 · Đến 31/12 QĐ 100 · chênh −20', r.db, r.dbChu);
 ok('bảng cơ bản: dòng chương trình 03 ghi "⚠ đứt −20"', r.co);
 ok('KH vẫn theo QĐ mới nhất (CT 01 Xã X: Đến 31/12 QĐ 102 = 1.100)', r.moiNhat && r.kh, r.khChu);
 ok('Tách từng QĐ: ô QĐ bị đứt tô màu — dòng xã rê chuột ghi chênh, dòng tổng báo có đứt', r.oTo);
 ok('bấm dòng ⚠ → mở ✎ sửa đúng QĐ 101', r.sua);
 ok('Excel: sheet "Dut chuoi" đủ 3 dòng, cột chênh −20 · bản in có bảng đứt chuỗi', r.xls && r.in);
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); const sai = o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t376 SAI '+sai : '✓ t376 đạt '+o.length); await b.close(); process.exit(sai ? 1 : 0); })();
