// 3.443 (anh 02/11) — Mẫu 10A/TD: khung cố định 100 tổ viên, 3 cột × 34 dòng (đánh số dọc theo cột), nằm trang 1–2;
//   3.443.1 (anh 02/11): cả mẫu 4 trang, chừa chỗ ký — bỏ ngắt trang cứng (dòng khung cao cố định giữ bố cục), lề 15 mm, tên dài thu chữ.
//   Tích > 100 tổ viên → báo, chỉ in 100. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), os=require('os'), cp=require('child_process');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:860}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08');
   slDoiTab('hst'); doiNgan(7); for(let i=0;i<50 && !document.querySelector('#hst-cay .loc-khoi');i++) await w(200); await w(400);
   const C = hsoCH();
   pvChon('hst','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300);
   pvChon('hst','diem', pvLuaChon(TO_K.to, C, 'diem', true)[0].k); await w(300);
   pvChon('hst','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1200);
   const t = TO_K.to[C.to], tv = hsoTVTo(t);
   hsoChonMau('10a'); await w(400);
   const dem = () => { const d = new DOMParser().parseFromString(HSO.x.h, 'text/html'), tb = d.querySelector('table.tv100'); return {d, tb}; };
   let {d, tb} = dem();
   const o100 = tb ? [...tb.querySelectorAll('td')].map(x=>x.textContent.trim()).filter(x=>/^\d+\./.test(x)) : [];
   ok('khung 3 cột × 34 dòng, đủ 100 ô đánh số', tb && tb.rows.length===34 && tb.rows[0].cells.length===3 && o100.length===100, tb && (tb.rows.length+' dòng · '+o100.length+' ô'));
   ok('đánh số dọc theo cột: dòng 1 = 1 · 35 · 69; dòng 34 = 34 · 68 · Tổng số (3.448: cột cuối như gốc)', tb && /^1\./.test(tb.rows[0].cells[0].textContent) && /^35\./.test(tb.rows[0].cells[1].textContent) && /^69\./.test(tb.rows[0].cells[2].textContent) && /^68\./.test(tb.rows[33].cells[1].textContent) && /^Tổng số:/.test(tb.rows[33].cells[2].textContent.trim()) && !tb.rows[32].cells[2].textContent.trim() && /^100\./.test(tb.rows[31].cells[2].textContent));
   const daTich = hso10aDs(t).filter(k=>HSO.tv[k.kh || k.khoa]!==false);   /* 3.449: danh sách theo Mã KH + TT / TP */
   ok('tổ viên tích điền theo thứ tự, ô sau trống chấm; Tổng số đúng', daTich.length>0 && tb.rows[0].cells[0].textContent.indexOf(daTich[0].ten)>=0 && /\.{10}/.test(tb.rows[33].cells[1].textContent) && new RegExp('Tổng số: '+daTich.length+' ?tổ viên').test(d.body.textContent), daTich.length+' tổ viên');
   ok('3.446: khung chữ cỡ 13 (không lớp s12), dòng cao cố định (data-cao)', !/\bs12\b/.test(tb.className) && +tb.getAttribute('data-cao')>0);
   const pII = [...d.querySelectorAll('p')].find(x=>/II\. QUY ƯỚC/.test(x.textContent));
   ok('3.443.1: không ngắt trang cứng (khung cao cố định giữ bố cục)', pII && !pII.classList.contains('tr-sang') && !/tr-sang/.test(HSO.x.h));
   ok('3.443.1: lề trên / dưới 15 mm', hsoMauK('10a').mg[0]===15 && hsoMauK('10a').mg[2]===15, JSON.stringify(hsoMauK('10a').mg));
   /* xem trước = bản in: khung trang 1–2, cả mẫu 4 trang, chừa chỗ UBND ký */
   hsoXem(); await w(2500);
   const kd = document.getElementById('hso-xem-khung').contentDocument, tg = [...kd.querySelectorAll('.tr-tg')].map(x=>x.innerText.replace(/\s+/g, ' '));
   const i100 = tg.findIndex(x=>/\b100\./.test(x)), iII = tg.findIndex(x=>/II\. QUY ƯỚC/.test(x));
   ok('bản in: khung 1–100 + Tổng số ở trang 1–2, phần II nối sau ở trang 2', i100===1 && /Tổng số/.test(tg[1]||'') && iII===1, tg.length+' trang · 100 ở trang '+(i100+1)+' · II ở trang '+(iII+1));
   ok('cả mẫu đúng 4 trang', tg.length===4, tg.length+' trang');
   const nd = [...kd.querySelectorAll('.tr-nd')], Ln = nd[nd.length-1], rb = Ln.getBoundingClientRect().bottom, kb = [...Ln.querySelectorAll('p,td')].reduce((m,e)=>Math.max(m, e.getBoundingClientRect().bottom), 0), trong = (rb-kb)/(96/25.4);
   ok('trang 4: dưới chỗ UBND ký còn ≥ 25 mm', trong>=25, trong.toFixed(1)+' mm');
   const tieu = [...kd.querySelectorAll('.tr-tg')].map(x=>{ const ps = [...x.querySelectorAll('.tr-nd p')].filter(p=>p.textContent.trim()); return ps.length ? ps[ps.length-1].textContent.trim() : ''; });
   ok('tiêu đề mục II–IV không treo cuối trang', !tieu.some(t=>/^(II|III|IV)\. /.test(t)), tieu.map(t=>t.slice(0, 20)).join(' | '));
   /* Word */
   const x = hsoLap(); let b64 = '';
   try { const bl = await hsoDocx(x); b64 = await new Promise(r=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result.split(',')[1]); fr.readAsDataURL(bl); }); } catch(e){ b64 = ''; }
   window.__W = b64;
   /* tên dài → thu chữ trong ô (không xuống dòng) */
   { const g0 = window.hsoTVTo; window.hsoTVTo = tt => [{kh:'GD1', ten:'Nguyễn Thị Ngọc Phương Thảo', mon:[]}, {kh:'GD2', ten:'Lê Văn An', mon:[]}];
     hsoVe(); await w(500); const t2 = dem().tb; window.hsoTVTo = g0;
     ok('tên dài (5 chữ) thu cỡ 9–11, tên ngắn giữ cỡ 12', /\bs(9|10|11)\b/.test(t2.rows[0].cells[0].innerHTML) && !/class="s(9|10|11)"/.test(t2.rows[1].cells[0].innerHTML), t2.rows[0].cells[0].innerHTML.slice(0, 80)); }
   /* > 100 tổ viên: chỉ in 100, báo */
   const goc = window.hsoTVTo; window.hsoTVTo = tt => { const a = goc(tt).slice(); for(let i=a.length;i<105;i++) a.push({kh:'GIA'+i, ten:'Tổ Viên Giả '+i, mon:[]}); return a; };
   hsoVe(); await w(600); ({d, tb} = dem()); window.__TUY = document.getElementById('hso-tuy').textContent;
   ok('tích 105 → khung vẫn 100 ô, Tổng số 100, có cảnh báo', tb.querySelectorAll('td').length===102 && /Tổng số: 100 ?tổ viên/.test(d.body.textContent) && /tối đa 100/.test(window.__TUY), [tb.querySelectorAll('td').length, (d.body.textContent.match(/Tổng số: [^t]*/)||[''])[0], (window.__TUY.match(/⚠ Đang tích[^.]*/)||['không có cảnh báo'])[0]].join(' | '));
   window.hsoTVTo = goc; hsoVe(); await w(300);
   /* 3.446 (anh 02/11): cỡ 13 đều, tiêu đề 15; chữ điền liền + in thường; tên hoa đầu từ; ô chọn Về việc / họp tháng-quý; Chọn nhanh */
   { const h = HSO.x.h, d2 = new DOMParser().parseFromString(h, 'text/html');
     const co = [...d2.querySelectorAll('[style*="font-size"]')].map(e=>(e.getAttribute('style').match(/font-size:([\d.]+)pt/)||[])[1]).filter(Boolean);
     ok('3.448: cỡ chữ thân 14 (anh: chữ 14 vẫn vừa), tiêu đề BIÊN BẢN HỌP 15 (Quốc hiệu 13, ô Mẫu số 11 như gốc)', /om-goc" style="font-size:14pt/.test(h) && co.every(c=>['14','13','15','11'].indexOf(c)>=0) && /class="s15"[^>]*><b>BIÊN BẢN HỌP/.test(h), [...new Set(co)].join(','));
     const vals = [...d2.querySelectorAll('span.om')].filter(e=>!/om-cham/.test(e.className) && e.getAttribute('data-o')!=='vv');
     ok('chữ điền: liền (không khung inline-block), in thường', vals.length>0 && vals.every(e=>!/inline-block/.test(e.getAttribute('style')||'') && /font-weight:normal/.test(e.getAttribute('style')||'')), vals.length+' ô');
     const b = [...d2.querySelectorAll('b')].map(e=>e.textContent.trim());
     ok('đậm đúng gốc: nhãn "Thời gian bắt đầu:", "Địa điểm:" đậm; phần sau thường', b.indexOf('Thời gian bắt đầu:')>=0 && b.indexOf('Địa điểm:')>=0 && !b.some(x=>/^Thời gian bắt đầu:.+/.test(x))); }
   { const g0 = window.hsoTVTo; window.hsoTVTo = tt => [{kh:'GH1', ten:'LE VAN BINH', mon:[]}]; await w(400); const hTen = hsoLap().h; window.hsoTVTo = g0;
     { const h = HSO.x.h; ok('3.448: dòng PHÊ DUYỆT CỦA UBND in đậm', /<b>PHÊ DUYỆT CỦA ỦY BAN NHÂN DÂN CẤP XÃ<\/b>/.test(h));
     const t0 = TO_K.to[hsoCH().to], cap = /^thôn/i.test(t0.tenThon||'') ? 'thôn' : /^(kp|khu)/i.test(t0.tenThon||'') ? 'khu phố' : /^ấp/i.test(t0.tenThon||'') ? 'ấp' : hsoTo(t0).capAp, xaDu = hsoTo(t0).xaDu;
     const tx = h.replace(/<[^>]+>/g, '');
     ok('3.448: địa bàn theo đơn vị hành chính ('+cap+', '+xaDu+'); Trưởng '+cap, tx.indexOf(xaDu)>=0 && new RegExp('là Trưởng '+cap+', chứng kiến').test(tx) && new RegExp('TRƯỞNG '+cap.toUpperCase()).test(tx), (tx.match(/Địa điểm:.{0,70}/)||[''])[0]); }
   { const C0 = hsoCH(), giu = C0.to; C0.to = ''; hsoVe(); await w(300); const tx = HSO.x.h.replace(/<[^>]+>/g, '');
     ok('3.448: chưa chọn tổ (để chấm) → giữ gốc "Thôn…, xã…", "Trưởng thôn"', /Địa điểm: Thôn [.…]+, xã [.…]+/.test(tx) && /là Trưởng thôn/.test(tx)); C0.to = giu; hsoVe(); await w(400); }
   ok('3.448: khối Nhập liệu riêng 10A — Bản mẫu chỉ có Điền hết / Chừa phê duyệt UBND / Tùy chọn', (()=>{ OM_KIEU = 'mau'; const k = omKieuHTML('10a'); OM_KIEU = 'that'; return /Chừa phê duyệt UBND/.test(k) && !/Chừa phê duyệt NH/.test(k) && !/Chừa UBND \+ NH/.test(k); })());
   ok('3.448: chừa phê duyệt UBND → phần UBND để chấm, phần tổ vẫn điền', (()=>{ omMucDat('10a', 'chuaUB'); const r = !omPhanDien('10a', 'ub') && omPhanDien('10a', 'to'); omMucDat('10a', 'het'); return r; })());
   { const nut = [...document.querySelectorAll('[data-lenh="omkb.ds"]')]; ok('3.448: nút ⚙ Khai báo riêng cạnh ⚙ Khai báo đơn vị', nut.length===1 && /Khai báo riêng/.test(nut[0].textContent));
     nut[0] && nut[0].click(); await w(400); const ds = document.getElementById('om-kbds-ds');
     ok('3.448: hộp Khai báo riêng liệt kê đủ ô theo thứ tự mẫu, có Chọn nhanh', !!ds && ds.querySelectorAll('[data-lenh="omkb.nhanh"]').length===OM_MAU['10a'].o.length && /Về việc/.test(ds.textContent.slice(0, 200)));
     const cb = ds && ds.querySelector('[data-lenh="omkb.nhanh"][data-k="soNguoi"]'); if(cb){ cb.checked = true; cb.dispatchEvent(new Event('change', {bubbles:true})); } await w(300);
     ok('3.448: tích Chọn nhanh ở hộp → ra cột trái', omNhanh('10a').indexOf('soNguoi')>=0); omDatNhanh('10a', 'soNguoi', false); dongHop(); await w(300);
     ok('3.448: cột trái không còn khối thu gọn ⚙ Khai báo riêng, chỉ dòng Chọn nhanh', !document.querySelector('#hso-tuy details.hso-kbr-d') && /Chọn nhanh/.test(document.getElementById('hso-tuy').textContent)); }
   ok('tên viết hoa đầu từ (LE VAN BINH → Le Van Binh)', /Le Van Binh/.test(hTen) && !/LE VAN BINH/.test(hTen)); hsoVe(); await w(300); }
   ok('Chọn nhanh có Về việc, họp định kỳ, ngày, tiết kiệm', ['vv','dkKy','ngayDK','tk'].every(k=>omNhanh('10a').indexOf(k)>=0), omNhanh('10a').join(','));
   ok('cột trái không còn 2 ô cũ (Ngày họp định kỳ, Tiết kiệm tối thiểu) — thay bằng khai báo', !/hsoDatLuu\('ngayDK'/.test(document.getElementById('hso-tuy').innerHTML) && document.querySelectorAll('#hso-tuy [data-lenh="omc.chon"][data-k="vv"]').length===2);
   { const n0 = HSO.o.ngay; HSO.o.ngay = '2026-10-15'; omDatCach('10a', 'ngay', 'go'); hsoVe(); await w(300); const tx = HSO.x.h.replace(/<[^>]+>/g, '');
     ok('3.446.1: ngày họp in đúng 15/10/2026 (trước bị đè thành "1/0/2")', /ngày 15\/10\/2026/.test(tx), (tx.match(/Thời gian bắt đầu:.{0,60}/)||[''])[0]); HSO.o.ngay = n0; omDatCach('10a', 'ngay', 'cham'); omDatCach('10a', 'ngay', ''); hsoVe(); await w(300); }
   ok('mặc định Về việc = thành lập', /data-o="vv">Về việc thành lập Tổ Tiết kiệm và vay vốn/.test(HSO.x.h));
   (document.querySelectorAll('#hso-tuy [data-lenh="omc.chon"][data-k="vv"]')[1]||{click(){}}).click(); await w(400);
   ok('3.448 (VB 4336/HD-NHCS): bấm "Kiện toàn" → tiêu đề "Về việc kiện toàn hoạt động của Tổ TK&VV theo Quyết định số 70/QĐ-HĐQT" + nội dung "tự nguyện họp để kiện toàn hoạt động của Tổ Tiết kiệm và vay vốn"', /data-o="vv">Về việc kiện toàn hoạt động của Tổ TK&amp;VV[ <br>]+theo Quyết định số 70\/QĐ-HĐQT/.test(HSO.x.h) && /tự nguyện họp để kiện toàn hoạt động của Tổ Tiết kiệm và vay vốn/.test(HSO.x.h) && /Kiện toàn/.test(document.getElementById('hso-tuy').textContent));
   { omDatKB('10a', 'vv', 'củng cố Tổ Tiết kiệm và vay vốn'); hsoVe(); await w(300); ok('giá trị cũ "củng cố" (3.446) → in như Kiện toàn', /data-o="vv">Về việc kiện toàn hoạt động/.test(HSO.x.h)); }
   ok('họp định kỳ chưa chọn → giữ "hằng tháng (quý)"', /hằng tháng \(quý\) vào ngày/.test(HSO.x.h));
   (document.querySelectorAll('#hso-tuy [data-lenh="omc.chon"][data-k="dkKy"]')[1]||{click(){}}).click(); await w(400);
   ok('chọn "quý" → "Tổ họp định kỳ hằng quý vào ngày"', /hằng <span[^>]*>quý<\/span> vào ngày/.test(HSO.x.h));
   omDatKB('10a', 'vv', ''); omDatKB('10a', 'dkKy', ''); hsoVe(); await w(300);
   { const x = {k:'gia', chon:['a','b','c','d'], chonMD:0}; OM_MAU['10a'].oK.gia = x; const h = omChonHTML('10a', x, 1); delete OM_MAU['10a'].oK.gia;
     ok('ô chọn > 3 lựa chọn → danh sách sổ xuống; có ô ➕ thêm lựa chọn', /<select data-lenh="omc.chonDs"/.test(h) && /data-lenh="omc.them"/.test(h)); }
   /* 3.449 (anh 02/11): bảng hộ vay của tổ · TT / TP · họ tên ⇥ Chức vụ · Hội bỏ xã · tách ô · Về việc vừa dòng · kẻ dưới tiêu đề */
   { const t1 = TO_K.to[hsoCH().to], ds = hso10aDs(t1), tt0 = window.hsoTo;
     ok('3.449: danh sách sắp theo Mã KH', ds.filter(x=>x.kh).every((x, i, a)=>!i || String(a[i-1].kh).localeCompare(String(x.kh), 'vi', {numeric:true})<=0));
     ok('3.449: luôn có tổ trưởng (TT) trong danh sách', ds.some(x=>x.vai==='TT'), ds.filter(x=>x.vai).map(x=>x.vai+':'+x.ten).join(', '));
     /* tổ phó không vay (File Tổ trưởng MATP / TENTP) → thêm dòng, có nhãn TP */
     t1.ds = {ttKH:'', toTen:'', phoKH:'9990001234', phoTen:'NGUYEN VAN PHO GIA'}; const ds2 = hso10aDs(t1), tp = ds2.find(x=>x.vai==='TP');
     ok('3.449: tổ phó không vay vẫn có trong danh sách (mã KH File Tổ trưởng, không vay)', !!tp && tp.kh==='9990001234' && !tp.vay);
     hsoVe(); await w(500); const bg = document.querySelector('#hso-tuy table.hso-tv10a');
     ok('3.449: cột trái có bảng hộ vay (In · # · Mã KH · Họ tên · Dư nợ · Ghi chú), ghi kỳ số liệu, nhãn TT / TP', !!bg && /Mã KH/.test(bg.textContent) && /Dư nợ/.test(bg.textContent) && /Hộ vay của tổ — số liệu/.test(document.getElementById('hso-tuy').textContent) && /\bTP\b/.test(bg.textContent));
     ok('3.449: mặc định tích hết', [...bg.querySelectorAll('input[data-lenh="h10a.tich"]')].every(x=>x.checked));
     const gk = ds2.filter(x=>x.vay).slice(0, 1)[0]; if(gk) gk.k.dn = 0;   /* giả 1 hộ dư nợ 0 */
     const goc = window.hso10aDs; window.hso10aDs = tt => ds2.map(x=>x===gk ? Object.assign({}, x, {dn:0}) : x);
     hsoVe(); await w(400); const b0 = document.querySelector('[data-lenh="h10a.bo0"]');
     ok('3.449: có nút "Bỏ tích hộ dư nợ = 0"', !!b0); b0 && b0.click(); await w(400);
     ok('3.449: bỏ tích hộ dư nợ 0, giữ tổ phó (không vay)', HSO.tv[gk.kh]===false && HSO.tv['9990001234']!==false);
     const hIn = hsoLap().h; ok('3.449: hộ bỏ tích không in, tổ phó in', hIn.indexOf(tenHoaDau(gk.ten))<0 && /Nguyen Van Pho Gia/.test(hIn));
     window.hso10aDs = goc; HSO.tv = {}; delete t1.ds; hsoVe(); await w(400); }
   { const h = HSO.x.h, tx = h.replace(/<[^>]+>/g, '');
     ok('3.449: III a) "Ông (Bà): tên" ⇥ "Chức vụ: Tổ trưởng;" (có tab)', /a\) Ông \(Bà\): [^<]*<\/span>|a\) Ông \(Bà\): /.test(tx) && /<span class="tab"[^>]*><\/span>Chức vụ: Tổ trưởng;/.test(h));
     ok('3.449: dòng có tab mang điểm dừng (data-tab) cho Word', /<p data-tab="95"/.test(h));
     ok('3.449: kẻ dưới tiêu đề dài bằng "BIÊN BẢN HỌP"', new RegExp('<p class="ke" data-ke="'+omRong('BIÊN BẢN HỌP', 15, true).toFixed(1)+'"').test(h));
     ok('3.449: Hội bỏ xã / phường', (()=>{ return !/Hội [^<.]* (xã|phường) [^<.]*\./i.test(tx.match(/Chủ trì.{0,200}/)[0]); })(), (tx.match(/Chủ trì.{0,120}/)||[''])[0]);
     ok('3.449: tách ô — III a / b, UBND, địa bàn, chủ trì, chữ ký mỗi dòng 1 ô', ['bqlTT','bqlPho','ubDiaBan','ubTT','ubPho','diaBan2','chuTriCv','chuTriHoi','kyTA','kyCT'].every(k=>OM_MAU['10a'].oK[k]) && !['bql','ub','ky'].some(k=>OM_MAU['10a'].oK[k]));
     omDatCach('10a', 'bqlPho', 'cham'); hsoVe(); await w(300); const t2 = HSO.x.h.replace(/<[^>]+>/g, '');
     ok('3.449: chọn ✍ riêng dòng Tổ phó → dòng b) giữ form chấm, dòng a) vẫn điền', /b\) Ông \(Bà\) [.…]+ Chức vụ: Tổ phó\./.test(t2) && /a\) Ông \(Bà\): /.test(t2)); omDatCach('10a', 'bqlPho', 'tu'); hsoVe(); await w(300);
     omDatKB('10a', 'vv', 'kiện toàn hoạt động của Tổ TK&VV theo Quyết định số 70/QĐ-HĐQT'); hsoVe(); await w(300);
     const vv = HSO.x.h.match(/<p[^>]*>(?:(?!<\/p>).)*data-o="vv"/)[0];
     ok('3.449: Về việc dài → cỡ 13 vừa 1 dòng hoặc 2 dòng cân (không tràn)', /class="s13"/.test(vv) || /data-o="vv">[^<]*<br>/.test(HSO.x.h), vv.slice(0, 60)); omDatKB('10a', 'vv', ''); hsoVe(); await w(300); }
   /* mẫu khác không bị ảnh hưởng: 10B không có tr-sang / data-cao */
   hsoChonMau('10b'); await w(300);
   ok('10B không đổi (không dòng cố định)', !/data-cao/.test(HSO.x.h));
   return o; }, files);
 const b64 = await p.evaluate(()=>window.__W||''); let xml = '';
 if(b64){ const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't358-')), f = path.join(tmp, '10a.docx'); fs.writeFileSync(f, Buffer.from(b64, 'base64')); xml = cp.execSync('unzip -p '+f+' word/document.xml').toString(); }
 const okN = (ten, dk, chi) => R.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
 okN('Word: không ngắt trang cứng', !/<w:pageBreakBefore\/>/.test(xml));
 okN('Word: 34 dòng khung cao cố định (trHeight exact)', (xml.match(/w:hRule="exact"/g)||[]).length===34, (xml.match(/w:hRule="exact"/g)||[]).length);
 okN('3.449 Word: dòng họ tên có tab thật + điểm dừng tab', /<w:tabs><w:tab w:val="left" w:pos="\d+"\/><\/w:tabs>/.test(xml) && /<w:r><w:tab\/><\/w:r>/.test(xml));
 okN('Word: khung 3 cột chia đều', /<w:tblGrid>(<w:gridCol w:w="(\d+)"\/>){3}<\/w:tblGrid>/.test(xml));
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t358 đạt'); await b.close(); process.exit(sai?1:0);
})();
