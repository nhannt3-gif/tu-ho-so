// t377 (3.482, anh 05/11 "làm chip lọc các loại Nợ quá hạn, Nợ khoanh, 3 tháng KHĐ riêng, hiện tại chung 1 chip"): tab Tổ — nhóm Cần xử lý
//   tách chip "Có nợ cần xử lý (QH · khoanh · KHĐ)" thành 3 chip riêng; dùng được ở phạm vi PGD / xã / Hội và 1 tổ; số trên chip = số khách lọc ra. Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs = require('fs'), path = require('path');
(async()=>{ const b = await chromium.launch(); const loi = [];
 const p = await b.newPage({viewport:{width:1536, height:900}}); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname, '..', 'index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname, 'gianho31'), files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir, n)).toString('base64')}));
 const o = await p.evaluate(async(files)=>{ await xongTV; try{ dongHop(); }catch(e){} const o = [], w = t=>new Promise(r=>setTimeout(r, t)), ok = (t, d, c)=>o.push((d ? '✓ ' : '✗ ')+t+(c!==undefined && !d ? ' — '+c : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin = atob(f.b), u = new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i] = bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); const C = toCH(); C.xa = ''; C.diem = ''; C.hoi = ''; C.to = ''; TO_LOC_PV = 'tat'; slDoiTab('to'); doiNgan(7);
   for(let i=0;i<60 && !document.querySelector('#to-the .to-chip-khung');i++) await w(250); await w(1500);
   const chip = k => document.querySelector('#to-the .to-chip-khung button[data-k="'+k+'"]'), so = k => { const c = chip(k); return c ? +c.querySelector('b').textContent : -1; };
   const tv = TO_PVC.tv, dem = f => tv.filter(f).length, eQ = dem(k=>k.qh>0), eK = dem(k=>k.kn>0), eH = dem(k=>!!k.khd);
   const xl = [...document.querySelectorAll('#to-the .to-nhom')].find(x=>/Cần xử lý/.test(x.textContent));
   ok('toàn PGD: nhóm Cần xử lý có 3 chip riêng Nợ quá hạn · Nợ khoanh · 3 tháng KHĐ, không còn chip gộp "Có nợ cần xử lý"', !!xl && ['qh', 'kn', 'khd'].every(k=>xl.contains(chip(k))) && !chip('xl') && !/Có nợ cần xử lý/.test(document.getElementById('to-the').textContent));
   ok('số trên chip đúng số khách (QH '+eQ+' · khoanh '+eK+' · KHĐ '+eH+'), dữ liệu giả có khoanh + KHĐ (QH = 0 → chip mờ)', so('qh')===eQ && so('kn')===eK && so('khd')===eH && eK>0 && eH>0, [so('qh'), so('kn'), so('khd')].join(','));
   for(const [k, n] of [['qh', eQ], ['kn', eK], ['khd', eH]]){ chip(k).click(); await w(700);
     const d = document.querySelector('#to-the .to-bang-dau'), sd = document.querySelectorAll('#to-the .to-bang tbody tr').length;
     ok('bấm chip '+k+' → danh sách đúng '+n+' khách', TO_LOC_PV===k && !!d && new RegExp('^\\s*'+n+' khách').test(d.textContent) && sd>=Math.min(n, 1), d ? d.textContent.slice(0, 80) : 'không thấy đầu bảng'); }
   /* 1 tổ có nợ khoanh */
   const k0 = tv.find(k=>k.kn>0); C.to = k0.to.ma || k0.to; TO_LOC_MO = 'tat'; toVeThe(); await w(1200);
   const t = TO_K.to[C.to], tvT = toTV(t), nT = tvT.filter(k=>k.kn>0).length;
   ok('1 tổ: có 3 chip, chip Nợ khoanh = '+nT, !!chip('qh') && !!chip('khd') && so('kn')===nT && nT>0, so('kn'));
   chip('kn').click(); await w(600); ok('1 tổ: bấm Nợ khoanh → lọc đúng', TO_LOC_MO==='kn' && document.querySelectorAll('#to-the .to-bang tbody tr').length>=nT);
   /* 3.483: liên kết BBLV / 06A — danh sách nhiều tổ → hộp chọn tổ; 1 tổ → mở thẳng; tích sẵn đúng món */
   C.to = ''; TO_LOC_PV = 'kn'; toVeThe(); await w(1200);
   const nB = document.querySelector('#to-the .to-bang-dau [data-lenh^="to.hsn"][data-mk="bblv"]'), n6 = document.querySelector('#to-the .to-bang-dau [data-lenh^="to.hsn"][data-mk="06a"]');
   ok('3.483 chip Nợ khoanh (nhiều tổ): đầu danh sách có 📄 BBLV · 📄 06A', !!nB && !!n6 && nB.getAttribute('data-l')==='kn', nB && nB.outerHTML);
   const soTo = new Set(tv.filter(k=>k.kn>0).map(k=>k.to.ma)).size; nB.click(); await w(400);
   const nutTo = [...document.querySelectorAll('#hop-in [data-lenh="to.hsn"]')];
   if(soTo>1) ok('nhiều tổ → hộp chọn tổ ('+soTo+' tổ, có số hộ)', nutTo.length===soTo && nutTo.every(x=>/\d+ hộ/.test(x.textContent)), nutTo.length);
   const maTo = soTo>1 ? nutTo[0].getAttribute('data-to') : nB.getAttribute('data-to'); (soTo>1 ? nutTo[0] : nB).click && soTo>1 && nutTo[0].click(); await w(1500);
   const tT = KHO.to(maTo), monKN = HSN.ds(tT).flatMap(h=>h.mon).filter(x=>x.m.kn>0).map(x=>x.m.ku).sort(), selB = Object.keys(HSN.sel('bblv')).filter(k=>HSN.sel('bblv')[k]).sort();
   ok('→ Hồ sơ vay · BBLV · đúng tổ, tích sẵn đúng các món nợ khoanh ('+monKN.length+')', hsoTab()==='hsv' && hsoCH().hsv==='bblv' && hsoCH().to===maTo && monKN.length>0 && selB.join()===monKN.join(), hsoTab()+' '+hsoCH().hsv+' '+selB.join());
   /* 3.484: in 1 lần cả danh sách (Hội / xã…) — chip 3 tháng KHĐ toàn PGD (nhiều tổ) → 1 bản in BBLV đủ hộ của mọi tổ */
   slDoiTab('to'); await w(800); { const C2 = toCH(); C2.xa = ''; C2.diem = ''; C2.hoi = ''; C2.to = ''; } TO_LOC_PV = 'khd'; toVeThe(); await w(1200);
   document.querySelector('#to-the .to-bang-dau [data-mk="bblv"]').click(); await w(400);
   const ca = document.querySelector('#hop-in [data-lenh="to.hsnCa"]'), toKHD = [...new Set(tv.filter(k=>k.khd).map(k=>k.to.ma))], hoKHD = tv.filter(k=>k.khd).length;
   ok('3.484 hộp có nút "🖨 In 1 lần cả danh sách" ('+toKHD.length+' tổ · '+hoKHD+' hộ)', !!ca && new RegExp(toKHD.length+' tổ · '+hoKHD+' hộ').test(ca.textContent), ca && ca.textContent);
   ca.click(); await w(1800);
   const N = HSO.nhieu, tr = document.getElementById('hso-tuy');
   ok('→ Hồ sơ vay BBLV chế độ nhiều tổ: khung tóm tắt từng tổ + "Về từng tổ"', hsoTab()==='hsv' && hsoCH().hsv==='bblv' && !!N && N.ds.length===toKHD.length && !!tr.querySelector('.hsn-nhieu') && !!tr.querySelector('[data-lenh="hsn.boNhieu"]'), N && N.ds.join());
   const xN = hsoLap(), soBB = (xN.ds||[]).length;
   ok('bản in gộp: mỗi hộ 1 biên bản — '+hoKHD+' biên bản từ '+toKHD.length+' tổ (thứ tự xã › Hội › tổ)', soBB===hoKHD && xN.ds.every(u=>/BIÊN BẢN LÀM VIỆC/.test(u.h)), soBB);
   ok('tên file theo phạm vi (không theo 1 hộ)', /Toan PGD|PGD|to/i.test(xN.ten), xN.ten);
   document.querySelector('[data-lenh="hsn.boNhieu"]').click(); await w(800);
   ok('↩ Về từng tổ → bảng chọn món 1 tổ như cũ', !HSO.nhieu && !!document.querySelector('#hso-tuy .hsn-bang thead') && !document.querySelector('#hso-tuy .hsn-nhieu'));
   /* 1 tổ, chip 3 tháng KHĐ → 06A */
   const kH = tv.find(k=>k.khd); slDoiTab('to'); await w(800); C.to = kH.to.ma; TO_LOC_MO = 'khd'; toVeThe(); await w(1200);
   const n6b = document.querySelector('#to-the .to-bang-dau [data-lenh="to.hsn"][data-mk="06a"]');
   ok('1 tổ, chip 3 tháng KHĐ: nút 📄 06A mở thẳng (không hộp)', !!n6b && n6b.getAttribute('data-to')===kH.to.ma);
   n6b.click(); await w(1500);
   const monH = HSN.ds(KHO.to(kH.to.ma)).flatMap(h=>h.mon).filter(x=>x.f.khd).map(x=>x.m.ku).sort(), sel6 = Object.keys(HSN.sel('06a')).filter(k=>HSN.sel('06a')[k]).sort();
   ok('→ Hồ sơ vay · 06A · tích sẵn đúng các món 3 tháng KHĐ ('+monH.length+')', hsoTab()==='hsv' && hsoCH().hsv==='06a' && monH.length>0 && sel6.join()===monH.join(), sel6.join());
   slDoiTab('to'); await w(800); TO_LOC_MO = 'tat'; TO_LOC_PV = 'tat'; toVeThe(); await w(800);
   { const c = document.querySelector('#to-the [data-lenh^="to.hsn"]'); ok('chip khác (Tất cả): không hiện nút 📄 BBLV / 06A', !c, c && (c.outerHTML+' MO='+TO_LOC_MO+' PV='+TO_LOC_PV+' to='+toCH().to)); }
   return o; }, files);
 o.push((loi.length ? '✗ ' : '✓ ')+'không lỗi trang'+(loi.length ? ' — '+loi.slice(0, 3).join(' | ') : ''));
 console.log(o.join('\n')); const sai = o.filter(x=>x.startsWith('✗')).length; console.log(sai ? '✗ t377 SAI '+sai : '✓ t377 đạt '+o.length); await b.close(); process.exit(sai ? 1 : 0); })();
