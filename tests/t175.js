// 3.214 (anh 15/10) — Sổ hộ vay: form nhập dạng lưới có tiêu đề cột (Enter / Tab sang ô, không mất con trỏ, Lưu & thêm hộ tiếp),
//   tab 📒 Sổ hộ vay (lọc, tìm, sắp xếp, sửa thẳng ô hộ mới, ↑ ↓, cần bổ sung, in đúng danh sách lọc, A4 ngang đủ cột). Dữ liệu GIẢ.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const w=t=>new Promise(r=>setTimeout(r,t)); window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); delete D.cauHinh.hoMoi; delete D.cauHinh.hsoBo; delete D.cauHinh.hoVayChuyen;
   slDoiTab('hsv'); doiNgan(7); await w(1200);
   const C = hsoCH(); C.xa=''; C.diem=''; C.to='';
   pvChon('hsv','xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(300); pvChon('hsv','to', pvLuaChon(TO_K.to, C, 'to', true)[0].k); await w(1000);
   hsoChonMau('homoi'); await w(300); }, files);
 const o=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined?' — '+c:''));
 const ev = f=>p.evaluate(f);
 /* 1. form lưới */
 await ev(()=>hmMo()); await p.waitForTimeout(200);
 let r = await ev(()=>({dau:[...document.querySelectorAll('#hop-in .hm-luoi-dau span')].map(x=>x.textContent).join('|'), pc:document.getElementById('hop-in').classList.contains('phim-chung'), fo:document.activeElement.getAttribute('data-hm'), to:HM.to}));
 ok('form hộ: dòng tiêu đề cột (Họ và tên · Ngày sinh · Số CCCD · Ngày cấp · SĐT · Quan hệ · Đứng tên · HSSV), phím chung, con trỏ ở ô Họ tên', /Họ và tên\|Ngày sinh\|Số CCCD\|Ngày cấp CCCD\|Số điện thoại\|Quan hệ\|Đứng tên\|HSSV/.test(r.dau) && r.pc && r.fo==='0:ten', r.fo);
 await p.keyboard.type('nguyễn thị giả'); await p.keyboard.press('Enter'); await p.keyboard.type('150378'); await p.keyboard.press('Tab'); await p.keyboard.type('072178000111'); await p.keyboard.press('Enter');
 r = await ev(()=>({fo:document.activeElement.getAttribute('data-hm'), ten:HM.tv[0].ten, ns:HM.tv[0].ns, cccd:HM.tv[0].cccd, oNs:document.querySelector('#hop-in [data-hm="0:ns"]').value, suy:document.getElementById('hm-suy-0').textContent}));
 ok('gõ liền: Enter / Tab sang ô kế, không mất con trỏ (đang ở Ngày cấp); tên viết hoa, ngày 150378 → 15/03/1978, dòng gợi ý cập nhật tại chỗ', r.fo==='0:ncap' && r.ten==='Nguyễn Thị Giả' && r.ns==='1978-03-15' && r.oNs==='15/03/1978' && /năm sinh theo CCCD 1978 ✓ khớp/.test(r.suy), JSON.stringify(r).slice(0, 160));
 await p.keyboard.press('Shift+Enter'); r = await ev(()=>document.activeElement.getAttribute('data-hm')); ok('Shift+Enter lùi về ô trước', r==='0:cccd', r);
 await ev(()=>hmThemNguoi()); await p.waitForTimeout(100); r = await ev(()=>({fo:document.activeElement.getAttribute('data-hm'), n:HM.tv.length, dau:document.querySelectorAll('#hop-in .hm-luoi-dau').length}));
 ok('＋ Thành viên → con trỏ vào ô Họ tên người mới; tiêu đề cột 1 lần', r.fo==='1:ten' && r.n===2 && r.dau===1, JSON.stringify(r));
 await p.keyboard.type('trần văn giả'); await ev(()=>document.querySelector('#hop-in [data-hm="xa"]').focus());
 await p.keyboard.press('Tab'); r = await ev(()=>document.activeElement.getAttribute('data-hm')); ok('ô chọn địa chỉ Enter/Tab sang ô kế (Điểm GD)', r==='diem', r);
 await ev(()=>{ const e = document.querySelector('#hop-in [data-hm="ap"]'); e.focus(); }); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(100);
 r = await ev(()=>({fo:document.activeElement.getAttribute('data-hm'), ten1:HM.tv[1].ten}));
 ok('↓ đổi ấp → vẽ lại hộp vẫn giữ con trỏ ở ô Ấp, không mất chữ đã gõ', r.fo==='ap' && r.ten1==='Trần Văn Giả', JSON.stringify(r));
 const db0 = await ev(()=>({xa:HM.xa, thon:HM.thon, to:HM.to}));
 await ev(()=>hmLuu(1)); await p.waitForTimeout(200);
 r = await ev(()=>({n:hmDs().length, moi:!HM.id && HM.tv.length===1 && !HM.tv[0].ten, xa:HM.xa, thon:HM.thon, to:HM.to, fo:document.activeElement.getAttribute('data-hm'), luu:hmDs()[0].tv.length}));
 ok('💾 Lưu & thêm hộ tiếp → hộ đã vào sổ (2 người), form trống mới giữ xã / ấp / tổ, con trỏ ở Họ tên', r.n===1 && r.luu===2 && r.moi && r.xa===db0.xa && r.thon===db0.thon && r.to===db0.to && r.fo==='0:ten', JSON.stringify(r));
 r = await ev(()=>{ const ds = sgO(); return /Lưu hộ/.test((document.querySelector('#hop-in .hang-nut .chinh')||{}).textContent||'') && ds.length>5; });
 ok('Ctrl+Enter / ô cuối → nút 💾 Lưu hộ (nút chính đầu tiên)', r);
 await ev(()=>{ dongHop(); HM = null; });
 /* 2. tab 📒 Sổ hộ vay */
 await ev(async()=>{ const w=t=>new Promise(r=>setTimeout(r,t)); const C = hsoCH(), t = TO_K.to[C.to]; hsoTVTo(t).slice(0, 3).forEach(k=>hmTuM31(k.kh));
   hmMo(); hmDat(0, 'ten', 'lê văn mới'); hmDat(0, 'cccd', '07208000022'); hmLuu(); hsoChonMau('sohv'); await w(400); });
 r = await ev(()=>({tab:[...document.querySelectorAll('#hso-tabm .hso-tm')].map(x=>x.textContent).join('|'), rong:document.querySelector('#tr7 .hso-bo').classList.contains('hso-rong'), dong:document.querySelectorAll('#hm-so-bang tbody tr[data-id]').length, inp:document.querySelectorAll('#hm-so-bang input[data-so]').length, m31:document.querySelectorAll('#hm-so-bang .hm-so-m31').length, ngang:hsoMau().ngang, th:[...document.querySelectorAll('#hm-so-bang th')].map(x=>x.textContent).join('|')}));
 ok('tab 📒 Sổ hộ vay cạnh 👪 Hộ vay, dùng hết bề ngang, 5 hộ; hộ mới sửa được ô (2 hộ × 5 ô), hộ cũ chữ xám theo Mẫu 31', /Hộ vay\|📒 Sổ hộ vay/.test(r.tab) && r.rong && r.dong===5 && r.inp===10 && r.m31===15 && r.ngang, JSON.stringify(r).slice(0, 200));
 ok('cột bảng: STT · Người đứng tên · Ngày sinh · Số CCCD · Ngày cấp · Hạn CCCD · SĐT · Mã KH · Tổ · địa chỉ · Người · HSSV · Cần bổ sung', /Người đứng tên vay.*Ngày sinh.*Số CCCD\|Ngày cấp\|Hạn CCCD\|Số điện thoại\|Mã KH\|Tổ · địa chỉ\|Người\|HSSV\|Cần bổ sung/.test(r.th), r.th);
 r = await ev(()=>{ const tr = [...document.querySelectorAll('#hm-so-bang tbody tr')].find(x=>/Lê Văn Mới/.test(x.querySelector('input[data-so="ten"]') ? x.querySelector('input[data-so="ten"]').value : '')); return tr ? tr.querySelector('.hm-so-lt').textContent : ''; });
 ok('hộ mới thiếu → cột Cần bổ sung ghi rõ (CCCD 11 số, ngày sinh, ngày cấp)', /CCCD 11 số/.test(r) && /ngày sinh/.test(r) && /ngày cấp/.test(r), r);
 /* sửa thẳng ô */
 await ev(()=>{ const tr = [...document.querySelectorAll('#hm-so-bang tbody tr')].find(x=>x.querySelector('input[data-so="ten"]') && /Lê Văn Mới/.test(x.querySelector('input[data-so="ten"]').value)); tr.querySelector('input[data-so="cccd"]').focus(); });
 await p.keyboard.press('Control+A'); await p.keyboard.type('072080000222'); await p.keyboard.press('Enter'); await p.keyboard.type('9112021'); await p.keyboard.press('Enter');
 r = await ev(()=>{ const o = hmDs().find(x=>x.tv[0].ten==='Lê Văn Mới'), tr = document.querySelector('#hm-so-bang tr[data-id="'+o.id+'"]'); return {cccd:o.tv[0].cccd, ncap:o.tv[0].ncap, noiCap:o.tv[0].noiCap, oNcap:tr.querySelector('input[data-so="ncap"]').value, fo:document.activeElement.getAttribute('data-so'), lt:tr.querySelector('.hm-so-lt').textContent, sua:!!o.sua, luu:JSON.parse(localStorage.getItem(KHOA)||'{}') }; });
 ok('sửa ô CCCD, Ngày cấp ngay trong bảng: Enter sang ô kế, ngày gõ liền → 09/11/2021, nơi cấp tự suy, Cần bổ sung cập nhật tại chỗ', r.cccd==='072080000222' && r.ncap==='2021-11-09' && !!r.noiCap && r.oNcap==='09/11/2021' && r.fo==='sdt' && /ngày sinh/.test(r.lt) && !/CCCD/.test(r.lt) && r.sua, JSON.stringify(r).slice(0, 200));
 await ev(()=>luuNgay()); r = await ev(()=>{ const j = JSON.parse(localStorage.getItem(KHOA)||'{}'); return ((j.cauHinh||{}).hoMoi||[]).some(o=>o.tv[0].cccd==='072080000222' && o.tv[0].ncap==='2021-11-09'); });
 ok('tự lưu vào bộ nhớ (cùng sổ hộ vay)', r);
 r = await ev(()=>{ const o = hmDs().find(x=>x.tv[0].ten==='Lê Văn Mới'), khac = hmDs().find(x=>x.tv[0].ten==='Nguyễn Thị Giả'), tr = document.querySelector('#hm-so-bang tr[data-id="'+o.id+'"]'), e = tr.querySelector('input[data-so="cccd"]'); e.value = khac.tv[0].cccd; hmSoSua(o.id, 'cccd', e); return {cccd:o.tv[0].cccd, o:e.value}; });
 ok('CCCD trùng hộ khác trong sổ → không đổi, trả lại số cũ', r.cccd==='072080000222' && r.o==='072080000222', JSON.stringify(r));
 r = await ev(()=>{ const ds = [...document.querySelectorAll('#hm-so-bang input[data-so="ten"]')]; ds[0].focus(); ds[0].dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true})); return document.activeElement===ds[1]; });
 ok('↓ sang cùng cột dòng dưới (bỏ qua dòng hộ cũ)', r);
 /* lọc, tìm, sắp xếp */
 await ev(()=>{ document.querySelector('#hm-so-tim').focus(); }); await p.keyboard.type('thị giả');
 r = await ev(()=>({n:document.querySelectorAll('#hm-so-bang tbody tr[data-id]').length, fo:document.activeElement.id, dem:document.getElementById('hm-so-dem').textContent}));
 ok('tìm "thị giả" (không dấu, gõ tới đâu lọc tới đó) — ô tìm giữ con trỏ, đếm 1 / 5', r.n===1 && r.fo==='hm-so-tim' && r.dem==='1 / 5 hộ', JSON.stringify(r));
 r = await ev(()=>HSO.x && /lọc: tìm/.test(HSO.x.trang||'') ? 1 : 0); await p.waitForTimeout(400); r = await ev(()=>{ const h = hsoLap().h || ''; return {loc:/lọc: tìm "thị giả"/.test(h), n:(h.match(/<tr>/g)||[]).length}; });
 ok('🖨 In = đúng danh sách đang lọc, ghi rõ bộ lọc trên bản in', r.loc && r.n===2, JSON.stringify(r));
 await ev(async()=>{ HM_SO.q=''; HM_SO.loai='moi'; hsoVe(); await new Promise(r=>setTimeout(r,200)); });
 r = await ev(()=>document.querySelectorAll('#hm-so-bang tbody tr[data-id]').length); ok('chip Hộ mới → 2 hộ', r===2, r);
 await ev(async()=>{ HM_SO.loai='thieu'; hsoVe(); await new Promise(r=>setTimeout(r,200)); });
 r = await ev(()=>[...document.querySelectorAll('#hm-so-bang tbody tr[data-id]')].every(tr=>/⚠/.test(tr.querySelector('.hm-so-lt').textContent))); ok('chip ⚠ Cần bổ sung → chỉ hộ còn thiếu', r);
 await ev(async()=>{ HM_SO.loai=''; hmSoSapXep('ten'); await new Promise(r=>setTimeout(r,200)); });
 r = await ev(()=>{ const ten = hmSoDs().map(x=>slChuan(x.n.ten).split(' ').pop()); return {ok:ten.every((t, i)=>!i || ten[i-1]<=t), sx:hsoLuu().soSX.k, th:(document.querySelector('#hm-so-bang th.on')||{}).textContent}; });
 ok('sắp xếp theo tên (chữ cuối) A → Z, nhớ lựa chọn, tiêu đề cột đánh dấu ▲', r.ok && r.sx==='ten' && /▲/.test(r.th||''), JSON.stringify(r));
 await ev(()=>hmSoSapXep('ten')); r = await ev(()=>hsoLuu().soSX.xuoi); ok('bấm lại → đảo chiều', r===0);
 /* bản in sổ */
 r = await ev(()=>{ const h = hmLapHTML(); return {cot:(h.match(/<td class="c b">/g)||[]).length, han:/Hạn CCCD/.test(h), m31:hmDs().filter(o=>o.kh).every(o=>h.indexOf(hmNguoiDung(o).n.ten)>=0)}; });
 ok('bản in SỔ HỘ VAY: 12 cột (thêm Ngày cấp, Hạn CCCD, SĐT, Tổ / Ấp · xã tách riêng), A4 ngang, hộ cũ theo Mẫu 31', r.cot===12 && r.han && r.m31, JSON.stringify(r));
 /* tab 👪 Hộ vay vẫn như cũ */
 await ev(async()=>{ hsoChonMau('homoi'); await new Promise(r=>setTimeout(r,300)); });
 r = await ev(()=>({rong:document.querySelector('#tr7 .hso-bo').classList.contains('hso-rong'), nut:/Lấy từ Mẫu 31/.test(document.getElementById('hso-tuy').textContent), ds:document.querySelectorAll('.hm-dong').length}));
 ok('tab 👪 Hộ vay giữ nguyên (danh sách + xem trước bên phải)', !r.rong && r.nut && r.ds===5, JSON.stringify(r));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = o.filter(x=>x[0]==='✗').length; console.log((o.length-sai)+'/'+o.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
