// 3.335 (anh 24/10 — tham khảo app "Truy vấn thông tin") — Tra cứu KH: ô tìm + LỌC ĐỊA BÀN dải ngang toàn trang; chip "Tìm theo" (Tự nhận · Tên KH · Vợ/chồng · HSSV ·
//   CCCD · Mã KH · Mã món vay · SĐT · Số TK 105); danh sách kiểu bảng (máy tính mặc định) ↔ thẻ. Bộ GIẢ tests/gianho31 + Sao kê TK 105 giả gắn vào kỳ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1600,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); SL_TRA_Q = ''; slDoiTab('tra'); doiNgan(7);
   for(let i=0;i<60 && !(document.querySelector('#sl-kq .sl-kq-dong') && TC_K && SL_PHU.length);i++) await w(200); await w(500);
   const kq = () => [...document.querySelectorAll('#sl-kq .sl-kq-dong')], chip = k => document.querySelector('.tc-theo .gd-chip[data-k="'+k+'"]');
   const tim = async(theo, q) => { chip(theo).click(); const i = document.getElementById('sl-tim'); i.value = q; i.dispatchEvent(new Event('input', {bubbles:true})); await w(150); };
   /* bố cục */
   const dau = document.querySelector('#tr7 .tc-dau'), cot = document.querySelector('#tr7 .tc-2cot');
   ok('ô tìm + LỌC ĐỊA BÀN ở dải ngang trên 2 cột (không nằm trong cột trái)', !!dau && !!dau.querySelector('#sl-tim') && !!dau.querySelector('#tc-cay') && !cot.querySelector('#sl-tim') && dau.getBoundingClientRect().bottom <= cot.getBoundingClientRect().top+2);
   const sel = document.querySelector('#tc-cay select.pv-xa');
   ok('ô Xã ở dải ngang đủ rộng (không bị bóp)', !!sel && sel.getBoundingClientRect().width >= 140, sel && Math.round(sel.getBoundingClientRect().width)+' px');
   ok('10 chip "Tìm theo" (3.336 + Tổ trưởng), mặc định Tự nhận', document.querySelectorAll('.tc-theo .gd-chip').length===10 && chip('').classList.contains('bat'));
   /* kiểu bảng ↔ thẻ */
   ok('máy tính mặc định kiểu bảng: Tên KH (+ tình trạng chữ nhỏ — 3.337) · Mã KH · Xã · Ấp · Tổ trưởng', [...document.querySelectorAll('#sl-kq table.tc-kq-bang th')].map(x=>x.textContent).join('|')==='Tên khách hàng|Mã KH|Xã|Ấp|Tổ trưởng' && kq().length>0 && kq()[0].tagName==='TR' && !!kq()[0].querySelector('.tc-kq-ten .tc-tt-nho'));
   document.querySelector('#sl-kq [data-lenh="tc.kieu"]').click(); await w(150);
   ok('bấm ▦ Thẻ → danh sách thẻ 2 dòng như cũ, nhớ lựa chọn', !document.querySelector('#sl-kq table') && kq().length>0 && kq()[0].tagName==='DIV' && D.cauHinh.tcTim.kieu==='the');
   document.querySelector('#sl-kq [data-lenh="tc.kieu"]').click(); await w(150);
   /* bấm dòng bảng → chi tiết */
   kq()[0].click(); await w(600);
   const ten0 = KH_GY[0] && (SL_DB.kh[KH_GY[0].m]||{}).ten;
   ok('bấm 1 dòng bảng → khung phải mở khách đó', !!ten0 && document.getElementById('tc-ct').textContent.indexOf(ten0)>=0 && kq()[0].classList.contains('chon'), ten0);
   /* từng loại */
   const r0 = SL_TIM.find(r=>r.c && r.c.length>=9 && (SL_DB.kh[r.m]||{}).ku && SL_DB.kh[r.m].ku.length);
   await tim('ten', r0.ten.split(' ').slice(-1)[0]);
   ok('Tên KH: mọi dòng là người vay có chữ đó trong TÊN, không lẫn vợ/chồng', KH_GY.length>0 && KH_GY.every(r=>(' '+slChuan(r.ten)).indexOf(' '+slChuan(r0.ten.split(' ').slice(-1)[0]))>=0) && !document.querySelector('#sl-kq tr.phu'), KH_GY.length+' dòng');
   const vc = SL_PHU.find(p=>p.loai==='vc');
   if(vc){ await tim('vc', vc.ten); ok('Vợ/chồng: chỉ ra dòng 👫 vợ/chồng, không ra người vay', document.querySelectorAll('#sl-kq tr.phu').length>0 && !KH_GY.length && /👫/.test(document.querySelector('#sl-kq tr.phu').textContent), vc.ten); }
   else ok('bộ giả có vợ/chồng', false);
   await tim('cccd', r0.c.slice(-6));
   ok('CCCD (6 số cuối): có khách đó, mọi dòng CCCD chứa số gõ', KH_GY.some(r=>r.m===r0.m) && KH_GY.every(r=>r.c.indexOf(r0.c.slice(-6))>=0), KH_GY.length+' dòng');
   await tim('ma', r0.m.slice(0, 8));
   ok('Mã KH: mọi dòng mã chứa số gõ', KH_GY.length>0 && KH_GY.every(r=>r.m.indexOf(r0.m.slice(0, 8))>=0));
   const ku = String(SL_DB.kh[r0.m].ku[0]); await tim('ku', ku);
   ok('Mã món vay: ra đúng khách có khế ước', KH_GY.length>=1 && KH_GY.some(r=>r.m===r0.m), ku+' → '+KH_GY.length);
   await tim('ma', '12'); ok('gõ dưới 3 số → nhắc gõ thêm', /ít nhất 3 chữ số/.test(document.getElementById('sl-kq').textContent));
   /* Số TK 105 */
   const giu = TC_K.tk; TC_K.tk = {};
   await tim('tk', '7100'); ok('Số TK 105 chưa có Sao kê → báo nạp', /Chưa có Sao kê TK 105/.test(document.getElementById('sl-kq').textContent));
   TC_K.tk = {tk105:{ky:'2026-08-31', rows:[{kh:r0.m, stk:'7100998877', ten:r0.ten}, {kh:'khongco', stk:'7100998800'}]}};
   await tim('tk', '998877');
   ok('Số TK 105: ra đúng khách, có cột Số TK 105', KH_GY.length===1 && KH_GY[0].m===r0.m && [...document.querySelectorAll('#sl-kq th')].some(x=>x.textContent==='Số TK 105') && /7100998877/.test(document.querySelector('#sl-kq tbody').textContent));
   TC_K.tk = giu;
   ok('lựa chọn "Tìm theo" nhớ (D.cauHinh.tcTim)', D.cauHinh.tcTim.theo==='tk');
   await tim('', r0.ten); ok('Tự nhận: tìm như cũ', KH_GY.some(r=>r.m===r0.m));
   /* 3.336: tìm thẳng tổ (tổ trưởng / mã tổ) + thẻ tổ */
   const T = Object.keys(TC_K.to).map(m=>TC_K.to[m]).filter(t=>!t.trucTiep && !toLaTT(t)), t1 = T.find(t=>(KHO.tvChuan(t, TC_K)||{}).tong>=2) || T[0];
   await tim('tt', t1.ten);
   ok('Tổ trưởng: bảng tổ (Tổ trưởng · Mã tổ · Thành viên · Có dư nợ · Xã · Ấp · Hội — 3.351), có tổ cần tìm', [...document.querySelectorAll('#sl-kq th')].map(x=>x.textContent).join('|')==='Tổ trưởng|Mã tổ|Thành viên|Có dư nợ|Xã|Ấp|Hội' && kq().some(x=>x.getAttribute('data-to')===t1.ma), t1.ten+' → '+kq().length+' tổ');
   await tim('tt', t1.ma); await w(400);
   const r1 = KHO.tvChuan(t1, TC_K), ct = document.getElementById('tc-ct');
   ok('gõ mã tổ → 1 tổ, tự mở thẻ tổ: mã tổ, tổ trưởng, số TV đúng QT-18', kq().length===1 && !!ct.querySelector('.tc-the-to') && ct.textContent.indexOf(t1.ma)>=0 && ct.textContent.indexOf(t1.ten)>=0 && ct.querySelectorAll('table.tc-to-hang')[2].querySelector('td b').textContent===String(r1.tong), 'TV '+r1.tong);
   ok('thẻ tổ: danh sách thành viên đủ, nút Mở tổ / Tổ của điểm GD / Lập hồ sơ hộ mới', ct.querySelectorAll('.tc-to-tv-dong').length===r1.tong && !!ct.querySelector('[data-lenh="tc.moTo"]') && !!ct.querySelector('[data-lenh="tc.ketNap"]') && (!t1.khoaDiem || !!ct.querySelector('[data-lenh="tc.bangDiem"]')));
   /* 3.342: đầu thẻ 3 hàng có tên cột; bảng thành viên STT · mã KH (sắp theo mã) · dư nợ · ngày vay · hạn · lãi tồn · TK 105 */
   const H = [...ct.querySelectorAll('table.tc-to-hang')].map(t=>[...t.querySelectorAll('th')].map(x=>x.textContent).join('|'));
   ok('3.342 đầu thẻ 3 hàng: Tổ · Địa bàn · Số liệu (có 3 tháng KHĐ, TK 105)', H.length===3 && /^Tổ \(tổ trưởng\)\|Mã tổ\|Mã KH tổ trưởng\|☎ SĐT\|CCCD$/.test(H[0]) && H[1]==='Ấp · Xã|Điểm GD|Ngày GD|Hội quản lý' && H[2]==='Thành viên|Có dư nợ|Không dư nợ|Tổng dư nợ|Quá hạn|Lãi tồn|3 tháng KHĐ|Số dư TK 105', H.join(' / '));
   const thTV = [...ct.querySelectorAll('table.tc-to-tvb th')].map(x=>x.textContent).join('|'), mas = [...ct.querySelectorAll('.tc-to-tv-dong')].map(x=>x.children[2].textContent);
   ok('3.342 bảng thành viên đủ cột, STT 1..n, sắp theo mã KH', thTV==='#|Họ tên|Mã KH|CT|Dư nợ|Ngày vay|Hạn trả|Lãi tồn|TGTK' && ct.querySelector('.tc-to-tv-dong td').textContent==='1' && mas.join()===mas.slice().sort().join(), thTV);
   const coHan = [...ct.querySelectorAll('.tc-to-tv-dong')].filter(x=>x.children[6].querySelector('.tc-han'));
   ok('3.342 thành viên có dư nợ: có hạn trả (màu theo hạn), không còn dòng "còn N ngày"', coHan.length>0 && !ct.querySelector('.tc-to-tvb .tc-han-con'), coHan.length+' dòng có hạn');
   const nMon = [...ct.querySelectorAll('.tc-to-tv-dong')].reduce((a, x)=>a+(+x.children[1].getAttribute('rowspan')||1), 0), nDong = ct.querySelectorAll('.tc-to-tvb tbody tr').length;
   ok('3.342 nhiều món: mỗi món 1 dòng, họ tên gộp ô (rowspan)', nDong===nMon && ct.querySelectorAll('.tc-to-tv-mon').length===nDong-r1.tong, nDong+' dòng / '+r1.tong+' KH');
   const oCT = ct.querySelector('.tc-to-tvb td.ct[data-lenh="tc.hien"]'), ku0 = oCT && oCT.getAttribute('data-v'); if(oCT){ oCT.click(); await w(150); }
   const moR = ct.querySelector('.tc-to-ct-mo');
   ok('3.342 bấm ô CT → dòng nhỏ hiện mã món vay (chép được), không mở khách', !!moR && moR.textContent.indexOf(ku0)>=0 && !!moR.querySelector('.tc-chep') && !!document.querySelector('#tc-ct .tc-the-to'), ku0);
   if(oCT){ oCT.click(); await w(100); } ok('3.342 bấm lại ô CT → ẩn dòng mã món vay', !ct.querySelector('.tc-to-ct-mo'));
   const chipK = k => ct.querySelector('[data-lenh="tc.tvKieu"][data-k="'+k+'"]');
   chipK('gon').click(); await w(200);
   const hien = () => [...document.querySelectorAll('#tc-ct .tc-to-tvb tbody tr')].filter(x=>!x.hidden), mo1 = document.querySelector('#tc-ct .tc-to-mo');
   ok('3.342 kiểu Gọn: mỗi khách 1 dòng, khách nhiều món có ▸, nhớ lựa chọn', hien().length===r1.tong && D.cauHinh.tcTim.tvKieu==='gon' && (nDong===r1.tong || !!mo1), hien().length+' dòng');
   if(mo1){ mo1.click(); await w(100); const d = mo1.closest('tr').nextElementSibling;
     ok('3.342 Gọn: bấm ▸ → dòng nhỏ dưới hiện từng món (mã món chép được), không mở khách', !d.hidden && d.querySelectorAll('div').length>=2 && !!d.querySelector('.tc-chep') && !!document.querySelector('#tc-ct .tc-the-to'));
     mo1.click(); await w(100); ok('3.342 Gọn: bấm lại → ẩn', d.hidden); }
   document.querySelector('#tc-ct [data-lenh="tc.tvKieu"][data-k="du"]').click(); await w(200);
   ok('3.342 về kiểu Đủ: mỗi món 1 dòng', document.querySelectorAll('#tc-ct .tc-to-tvb tbody tr').length===nDong && !D.cauHinh.tcTim.tvKieu);
   const ct2 = document.getElementById('tc-ct'), wb = ct2.querySelector('table.tc-to-tvb').getBoundingClientRect().width, wk = ct2.querySelector('.tc-to-tv-ds').clientWidth;
   ok('3.342 bảng thành viên không tràn ngang khung', wb <= wk+1, Math.round(wb)+' / '+wk);
   const ct3 = document.getElementById('tc-ct'), wTen = ct3.querySelector('.tc-to-tvb th:nth-child(2)').getBoundingClientRect().width, wBang = ct3.querySelector('.tc-to-tvb').getBoundingClientRect().width;
   ok('3.344 cột Họ tên cân đối (≤ 30% bề ngang bảng)', wTen <= wBang*0.3, Math.round(wTen)+' / '+Math.round(wBang));
   const Bk = TC_K.B, giuTV = Bk.co.tv01; Bk.co.tv01 = (giuTV||[]).concat([{kh:'9900000001', to:t1.ma, ten:'Khách Giả Ra', dn:0, t105:0}, {kh:'9900000002', to:t1.ma, ten:'Khách Giả Gửi', dn:0, t105:500000}]);
   tcTheTo(t1.ma); await w(300);
   { const r2 = KHO.tvChuan(t1, TC_K), tt = [...document.querySelectorAll('#tc-ct .tc-to-tt')].map(x=>x.textContent);
     ok('3.344 khách không còn món: ghi rõ vẫn trong tổ / cần cho ra (khớp tvChuan)', r2.khongNo>=2 && tt.length===r2.khongNo && tt.filter(x=>/cần cho ra/.test(x)).length===r2.choRa && tt.some(x=>/còn TGTK — vẫn trong tổ/.test(x)) && tt.every(x=>/trong tổ|cho ra/.test(x)), tt.join(' | ')); }
   { const giuM = Bk.theoKH['9900000002']; Bk.theoKH['9900000002'] = [{ku:'6600000799999901', kh:'9900000002', dn:0, ttMon:'CLOSE', ngdg:'2026-05-12'}]; tcTheTo(t1.ma); await w(300);
     const tt2 = [...document.querySelectorAll('#tc-ct .tc-to-tt')].map(x=>x.textContent).join(' | ');
     ok('3.350 hộ tất nợ còn trong tổ: ghi ngày tất nợ (ngày GD gần nhất món đã tất toán)', /Tất nợ 12\/05\/2026 · còn TGTK — vẫn trong tổ/.test(tt2), tt2);
     if(giuM) Bk.theoKH['9900000002'] = giuM; else delete Bk.theoKH['9900000002']; }
   Bk.co.tv01 = giuTV; tcTheTo(t1.ma); await w(300);
   const tv1 = document.getElementById('tc-ct').querySelector('.tc-to-tv-dong[data-kh]'); if(tv1){ const kh = tv1.getAttribute('data-kh'); tv1.click(); await w(500); ok('bấm 1 thành viên → mở khách đó', document.getElementById('tc-ct').textContent.indexOf(kh)>=0); }
   await tim('tt', ''); ok('Tổ trưởng, chưa gõ → mọi tổ trong phạm vi', kq().length===T.length, kq().length+' / '+T.length);
   await tim('', t1.ten); const gy = document.querySelector('#sl-kq .tc-to-goiy');
   ok('Tự nhận: gõ tên tổ trưởng → có nút "🏘 n tổ khớp — xem tổ"', !!gy, gy && gy.textContent);
   if(gy){ gy.click(); await w(200); ok('bấm nút → chuyển Tìm theo Tổ trưởng, ra bảng tổ', chip('tt').classList.contains('bat') && kq().some(x=>x.getAttribute('data-to')===t1.ma)); }
   await tim('', r0.ten); kq()[0] && kq()[0].click(); await w(600);
   return o; }, files);
 await p.screenshot({path:path.join(__dirname,'t246.png')});
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t246 đạt'); await b.close(); process.exit(sai?1:0);
})();
