// 3.301 📈 DIỄN BIẾN PHÂN VỐN THEO KH (anh 21/10) — pbDienBien (js/47) + màn thẻ số / biểu đồ SVG / dòng thời gian / bảng xã (js/48), bộ GIẢ tests/gianho31 + QĐ giả.
//   ① KH hiệu lực theo ngày (bậc thang theo QĐ, trước QĐ đầu = Đã giao đầu) · KH cuối năm · còn phải TH · % · cộng theo xã / toàn bộ · lọc xã / nguồn / CT · mốc QĐ (± gộp nhiều xã)
//   ② màn: thẻ số, biểu đồ có đường KH + dư nợ, dòng thời gian, bảng xã bấm → chi tiết, lọc, bản in, Excel 4 sheet · thẻ số ở màn phân bổ / đối chiếu · không lỗi trang.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [], R = [];
 const ok = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined && !dk ? ' — '+chi : ''));
 const p = await b.newPage({viewport:{width:1440, height:900}}); p.on('pageerror', e => loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r => r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500); await p.evaluate(require('./pb_gia.js'));
 const dir = path.join(__dirname, 'gianho31'); const files = fs.readdirSync(dir).map(n => ({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const Q = (Id, So, Ngay, TenXa, ChiTiet, Nguon) => ({Id, SoQD:So, KyHieuVanBan:'/QĐ-GIẢ', NgayQD:Ngay+'T00:00:00', NguonVon:Nguon || 1, Loai:'Điều chỉnh', Dot:'', TenXa, NgayGhiNhan:Ngay+'T09:00:00', ChiTiet});
 const C = (Ma, dg, tg, den) => ({MaChuongTrinh:Ma, TenChuongTrinh:'', ChiTieuDaGiao:dg, GiaoTangGiam:tg, ChiTieuDen3112:den});
 const wpf = {DanhSachQD:[
   Q('a1', 'G100', '2026-07-20', 'Phường Gò Dầu', [C(3, 1000, 300, 1300), C(6, 800, -150, 650)]),
   Q('b1', 'G100', '2026-07-20', 'Xã Truông Mít', [C(3, 500, 200, 700)]),
   Q('a2', 'G101', '2026-08-10', 'Phường Gò Dầu', [C(3, 1300, 200, 1500)]),
   Q('a3', 'G102', '2026-08-25', 'Phường Gò Dầu', [C(1, 0, 100, 100)], 2)]};
 const r = await p.evaluate(async([files, wpf]) => { await xongTV; try { dongHop(); } catch(e){} const o = {}, w = t => new Promise(r => setTimeout(r, t));
   /* ① hàm thuần */
   const qd = [
     {id:'1', so:'1', kyHieu:'', ngay:'2026-02-10', luc:'1', nguon:1, xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1000, tangGiam:300, den3112:1300}]},
     {id:'2', so:'1', kyHieu:'', ngay:'2026-02-10', luc:'1', nguon:1, xa:'Y', tenXa:'Xã Y', ct:[{ma:'03', daGiao:400, tangGiam:100, den3112:500}]},
     {id:'3', so:'2', kyHieu:'', ngay:'2026-05-05', luc:'2', nguon:1, xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1300, tangGiam:-200, den3112:1100}]},
     {id:'4', so:'3', kyHieu:'', ngay:'2026-05-20', luc:'3', nguon:2, xa:'X', tenXa:'Xã X', ct:[{ma:'01', daGiao:0, tangGiam:50, den3112:null}]},
     {id:'5', so:'9', kyHieu:'', ngay:'2025-11-01', luc:'0', nguon:1, xa:'X', tenXa:'Xã X', ct:[{ma:'03', daGiao:1, tangGiam:1, den3112:2}]}];
   const fDN = {'2026-01':{X03:1010, Y03:390}, '2026-03':{X03:1150, Y03:450, X01:0}, '2026-06':{X03:1080, Y03:480, X01:40}};
   const f = ky => (xa, ma) => { const v = fDN[ky][xa+ma]; return v==null ? 0 : v; };
   const dn = {dau:(xa, ma) => xa==='X' ? (ma==='03' ? 990 : 0) : 380, kyDau:'2025-12', thang:['2026-01', '2026-03', '2026-06'].map(k => ({ky:k, f:f(k)}))};
   const d = pbDienBien(qd, 2026, {}, dn);
   o.nhom = d.nhom.map(n => n.tenXa+' '+n.ma+' '+n.nguon+': '+n.dgDau+'→'+n.khCuoi).join(' | ');
   o.thang = d.thang.map(t => t.ky+':'+t.kh+'/'+t.dn).join(' ');
   o.tong = JSON.stringify([d.tong.dgDau, d.tong.khCuoi, d.tong.tongTG, d.tong.hienTai, d.tong.conTH, d.tong.pct, d.tong.soQD, d.tong.dauNam]);
   o.moc = d.moc.map(m => m.so+':'+m.tg+'→'+m.kh+'('+m.soXa+')').join(' ');
   o.xa = d.theoXa.map(x => x.tenXa+':'+x.khCuoi+'/'+x.hienTai+'/'+x.pct).join(' ');
   const dL = pbDienBien(qd, 2026, {xa:'X', nguon:1, ct:'03'}, dn); o.loc = dL.nhom.length+' · '+dL.tong.khCuoi+' · '+dL.moc.map(m => m.so).join(',');
   o.khongDN = JSON.stringify(pbDienBien(qd, 2026, {}, {}).tong);
   /* 3.302: CT có dư nợ mà không có QĐ giao → dòng "không giao"; KH / % / biểu đồ không đổi, tổng dư nợ thực tế cộng thêm */
   fDN['2026-06'].X06 = 70;
   const dn2 = Object.assign({}, dn, {ds:[{xa:'X', tenXa:'Xã X', ct:'03', nguon:1}, {xa:'X', tenXa:'Xã X', ct:'06', nguon:1}, {xa:'Z', tenXa:'Xã Z', ct:'03', nguon:1}, {xa:'X', tenXa:'Xã X', ct:'07', nguon:1}]});
   const d2 = pbDienBien(qd, 2026, {}, dn2), t2 = d2.tong;
   o.kg = d2.nhom.filter(n => n.khongGiao).map(n => n.tenXa+' '+n.ma+':'+n.dauNam+'/'+n.hienTai).join(' | ')+' · '+JSON.stringify([t2.khCuoi, t2.hienTai, t2.pct, t2.hienTaiTatCa, t2.khongGiao, t2.dauNamTatCa, t2.dauNam])+
     ' · '+d2.thang.map(t => t.dn).join(',')+' · '+d2.theoXa.map(x => x.tenXa+':'+x.khCuoi+'/'+x.hienTaiTatCa).join(' ')+' · lọc 06: '+pbDienBien(qd, 2026, {ct:'06'}, dn2).nhom.map(n => n.ma+(n.khongGiao ? 'kg' : '')).join(',');
   /* ② màn hình */
   for(const fl of files){ const bin = atob(fl.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); await slGhi(await slDocFile(new File([u], fl.n))); }
   doiNgan(7); slDoiTab('pb'); for(let i=0;i<80 && !(PB.K && document.getElementById('pb-trai'));i++) await w(250);
   await pbNhapGia(wpf, 'de');   /* 3.439: nạp QĐ giả qua mẫu Excel (bỏ nhập file WPF) */
   for(let i=0;i<40 && pbDL().qd.length<4;i++) await w(100); dongHop(); await w(100);
   document.querySelector('[data-lenh="pb.db"]').click(); for(let i=0;i<40 && !document.querySelector('#pb-phai table.pb-mt');i++) await w(150);
   const ph = document.getElementById('pb-phai'), tx = ph.textContent;
   o.the = Array.from(ph.querySelectorAll('.pb-kpi .pb-the')).map(e => e.querySelector('span').textContent+'='+e.querySelector('b').textContent).join(' | ');
   const svg = ph.querySelector('svg.pb-db-svg'); o.svg = !!svg && !!svg.querySelector('path.pb-db-kh') && !!svg.querySelector('path.pb-db-dn') && svg.querySelectorAll('circle.pb-db-diem').length>=2 && /dư nợ/.test(svg.querySelector('circle title').textContent);
   o.moc2 = Array.from(ph.querySelectorAll('.pb-db-moc .pb-db-nut')).map(e => e.querySelector('span').textContent+' '+e.querySelector('.pb-db-chip').textContent.trim()).join(' | ');
   o.xaBang = ph.querySelectorAll('table.pb-mt [data-lenh="pb.dbXa"]').length;
   o.mt = (() => { const t = ph.querySelector('table.pb-mt'); return !!t && t.querySelectorAll('thead th').length>=6 && t.querySelectorAll('td.pb-mt-o').length>=6 && !!t.querySelector('svg.pb-mt-sp') && /Tổng/.test(t.textContent); })();
   Array.from(ph.querySelectorAll('[data-lenh="pb.dbXa"]')).find(x => /Gò Dầu/.test(x.textContent)).click(); await w(200);
   o.kgUI = /không giao/.test(ph.querySelector('table.pb-db-ct').textContent) && /CT có giao/.test(ph.querySelector('.pb-kpi').textContent);
   document.querySelector('[data-lenh="pb.dbMT"][data-f="xoay"][data-v="1"]').click(); await w(200); o.xoay = !!document.querySelector('#pb-phai table.pb-mt') && /Chương trình/.test(document.querySelector('#pb-phai table.pb-mt thead').textContent) && !document.querySelector('#pb-phai table.pb-mt [data-lenh="pb.dbXa"]');
   document.querySelector('[data-lenh="pb.dbMT"][data-f="tach"][data-v="1"]').click(); await w(200); o.tach = /TW/.test(document.querySelector('#pb-phai table.pb-mt tbody').textContent) && /ĐP/.test(document.querySelector('#pb-phai table.pb-mt tbody').textContent);
   document.querySelector('[data-lenh="pb.dbMT"][data-f="ty"][data-v="1"]').click(); await w(200); o.ty = /\d,\d/.test(document.querySelector('#pb-phai table.pb-mt tr.tong').textContent);
   ['xoay', 'tach', 'ty'].forEach(f => document.querySelector('[data-lenh="pb.dbMT"][data-f="'+f+'"][data-v=""]').click()); await w(200);
   o.chiTiet = !!ph.querySelector('table.pb-db-ct') && /QĐ G100/.test(ph.querySelector('table.pb-db-ct').textContent) && /\+300 → 1\.300/.test(ph.querySelector('table.pb-db-ct').textContent.replace(/\s+/g, ' '));
   const selN = ph.querySelector('select[data-f="nguon"]'); selN.value = '2'; selN.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   const bt = () => document.querySelector('#pb-phai table.pb-db-thang'); o.thangUI = !!bt() && bt().querySelectorAll('tr[data-lenh="pb.dbMoc"]').length; o.baoNap = /Chưa nạp Mẫu 31 kỳ 12\/2025/.test(document.getElementById('pb-phai').textContent);
   bt().querySelector('tr[data-lenh="pb.dbMoc"]').click(); await w(200); o.mocXa = bt().querySelectorAll('tr.pb-db-moc-xa').length;
   bt().querySelector('tr.pb-db-moc-xa').click(); await w(200); o.mocCT = bt().querySelectorAll('tr.pb-db-moc-ct').length; o.mocKG = /không giao — KH = dư nợ đầu năm/.test(bt().textContent);
   o.locNguon = (document.querySelector('#pb-phai .pb-kpi .pb-the b') ? 1 : 0)+' · '+Array.from(document.querySelectorAll('#pb-phai .pb-db-moc .pb-db-nut span')).map(e => e.textContent).join(',');
   const selN2 = document.querySelector('#pb-phai select[data-f="nguon"]'); selN2.value = '0'; selN2.dispatchEvent(new Event('change', {bubbles:true})); await w(300);
   o.nut = Array.from(document.querySelectorAll('#pb-phai .xuat-hang button')).map(x => x.textContent.trim()+(x.disabled ? '(mờ)' : '')).join(' ');
   const h = pbDBIn(); o.in = /DIỄN BIẾN PHÂN VỐN THEO KẾ HOẠCH NĂM 2026/.test(h) && /<svg/.test(h) && /table class="to-bang luoi pb-db-ct"/.test(h) && !/data-lenh/.test(h) && /A4 landscape/.test(h);
   let bl = null, ten = ''; const gf = window.giaoFile; window.giaoFile = (x, t) => { bl = x; ten = t; }; pbDBExcel(); for(let i=0;i<60 && !bl;i++) await w(100); window.giaoFile = gf;
   if(bl){ const wb = XLSX.read(new Uint8Array(await bl.arrayBuffer()), {type:'array'}); o.excel = ten+' · '+wb.SheetNames.join(',')+' · '+XLSX.utils.sheet_to_json(wb.Sheets['Theo xa'], {header:1}).length+' dòng xã'; }
   /* thẻ số ở màn phân bổ + đối chiếu */
   document.querySelector('[data-lenh="pb.db"]').click(); await w(200);
   Array.from(document.querySelectorAll('.pb-dong')).find(x => /Gò Dầu/.test(x.textContent)).click(); await w(100); document.querySelector('[data-lenh="pb.chay"]').click(); await w(400);
   o.thePB = Array.from(document.querySelectorAll('#pb-kq .pb-kpi .pb-the span')).map(e => e.textContent).join('|');
   document.querySelector('[data-lenh="pb.dc"]').click(); for(let i=0;i<40 && !document.querySelector('.pb-dc-tom');i++) await w(150);
   o.theDC = Array.from(document.querySelectorAll('#pb-phai .pb-kpi .pb-the span')).map(e => e.textContent).join('|');
   return o; }, [files, wpf]);
 ok('nhóm xã · CT · nguồn: Đã giao đầu → KH cuối năm (chuỗi QĐ; Đến 31/12 trống → Đã giao + ±)', r.nhom==='Xã X 01 2: 0→50 | Xã X 03 1: 1000→1100 | Xã Y 03 1: 400→500', r.nhom);
 ok('theo tháng: KH hiệu lực bậc thang (3.308: trước QĐ đầu = DƯ NỢ ĐẦU NĂM 1.370 (Đã giao QĐ 1.400 lệch chỉ ghi nhận) · T3 = 1.800 · T6 = 1.650) ↔ dư nợ; điểm 31/12 năm trước', r.thang==='2025-12:1370/1370 2026-01:1370/1400 2026-03:1800/1600 2026-06:1650/1600', r.thang);
 ok('tổng: Đã giao đầu 1.400 · KH cuối 1.650 · ± 250 · hiện tại 1.600 · còn 50 · 97 % · 3 QĐ · dư nợ đầu năm 1.370', r.tong==='[1400,1650,250,1600,50,97,3,1370]', r.tong);
 ok('mốc QĐ: ± gộp các xã cùng QĐ, KH sau mốc', r.moc==='1:400→1800(2) 2:-200→1600(1) 3:50→1650(1)', r.moc);
 ok('cộng theo xã + % đạt', r.xa==='Xã X:1150/1120/97.4 Xã Y:500/480/96', r.xa);
 ok('lọc xã / nguồn / CT', r.loc==='1 · 1100 · 1,2', r.loc);
 ok('3.302 – 3.305 CT không có QĐ giao nhưng có dư nợ → dòng không giao (X 06, Z 03; bỏ nhóm không có dư nợ); KH của CT không giao = dư nợ đầu năm (Z 03: 380, X 06: 0) → KH tổng 1.650 + 380 = 2.030; dư nợ thực tế, còn phải TH, %, biểu đồ cộng MỌI CT (1.670 / 2.030 = 82,3 %)', r.kg==='Xã X 06:0/70 | Xã Z 03:380/0 · [2030,1600,82.3,1670,70,1750,1370] · 1750,1400,1600,1670 · Xã X:1150/1190 Xã Y:500/480 Xã Z:380/0 · lọc 06: 06kg', r.kg);
 ok('không có Mẫu 31 → không lỗi, hiện tại để trống', /"hienTai":null/.test(r.khongDN) && /"khCuoi":1650/.test(r.khongDN), r.khongDN);
 ok('màn 📈: 4 thẻ số (đầu năm, KH cuối năm 2.950 — dữ liệu giả chưa có Mẫu 31 kỳ 12 năm trước → KH CT không giao để trống, không lấy số thay (3.308), dư nợ thực tế, còn phải TH) + 3.305 thẻ theo nguồn TW / ĐP', /KH cuối năm=2\.950/.test(r.the) && r.the.split(' | ').length===6 && /Nguồn TW — dư nợ thực tế/.test(r.the) && /Nguồn ĐP/.test(r.the), r.the);
 ok('biểu đồ SVG: đường KH bậc thang + dư nợ, điểm có số khi rê chuột', r.svg);
 ok('dòng thời gian: đầu năm + 3 QĐ, chip + / − màu (3.308 bỏ mũi tên)', /Đầu năm/.test(r.moc2) && /QĐ G100 \+350/.test(r.moc2) && /QĐ G101 \+200/.test(r.moc2) && /QĐ G102 \+100/.test(r.moc2), r.moc2);
 ok('3.308 bảng ma trận xã × CT (3 xã: 2 có QĐ + Phường Gia Lộc chỉ có dư nợ), ô dư nợ / KH, cột Tổng, đường diễn biến; bấm xã → chi tiết từng CT · QĐ', r.xaBang===3 && r.mt && r.chiTiet, r.xaBang+' · '+r.mt);
 ok('3.308 ma trận: xoay (hàng = chương trình), tách nguồn TW / ĐP, đơn vị tỷ', r.xoay && r.tach && r.ty, [r.xoay, r.tach, r.ty].join());
 ok('màn: chi tiết xã có dòng CT không giao; thẻ Dư nợ thực tế tách CT có giao / không giao', r.kgUI);
 ok('lọc nguồn ĐP → chỉ QĐ G102', r.locNguon==='1 · Đầu năm,QĐ G102', r.locNguon);
 ok('3.308 📅 bảng so theo mốc cuối tháng: 2 mốc (T7, T8), bấm mốc → xã, bấm xã → từng CT · nguồn (có dòng CT không giao)', r.thangUI===2 && r.mocXa===3 && r.mocCT>=1 && r.mocKG, [r.thangUI, r.mocXa, r.mocCT, r.mocKG].join());
 ok('3.308 chưa nạp Mẫu 31 kỳ 12 năm trước → báo anh nạp', r.baoNap);
 ok('bộ nút xuất: In · PDF · Excel bật', /🖨 In/.test(r.nut) && !/In\(mờ\)/.test(r.nut) && /Excel/.test(r.nut) && !/Excel\(mờ\)/.test(r.nut), r.nut);
 ok('bản in A4 ngang: biểu đồ + bảng chi tiết mọi xã, không dòng bấm', r.in);
 ok('Excel: 6 sheet (Theo xa, Theo nguon, Chi tiet, Theo thang, Thang x xa x CT, QD)', /\.xlsx · Theo xa,Theo nguon,Chi tiet,Theo thang,Thang x xa x CT,QD · 5 dòng xã/.test(r.excel || ''), r.excel);
 ok('màn phân bổ có thẻ số (Số giao QĐ, Khớp QĐ…)', /Số giao QĐ/.test(r.thePB) && /Khớp QĐ/.test(r.thePB), r.thePB);
 ok('màn đối chiếu có thẻ số (Khớp, Lệch…)', /Khớp/.test(r.theDC) && /Lệch/.test(r.theDC), r.theDC);
 ok('không lỗi trang', !loi.length, loi.slice(0, 3).join(' | '));
 R.forEach(x => console.log(x)); const dat = R.filter(x => x[0]==='✓').length; console.log(dat+'/'+R.length+' đạt');
 await b.close(); process.exit(dat===R.length ? 0 : 1);
})();
