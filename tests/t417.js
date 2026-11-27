// t417 (3.565 — anh 24/11 "liên kết bên giao ban cập nhật phần mẫu 10C mới scan kế bên cột CCCD trong tab Tra cứu KH" + "1 tổ có thể lưu nhiều bản 10C mới để lựa chọn khi dùng"):
//   Dữ liệu GIẢ (gianho31 + file "DANH SÁCH KIỂM TRA MẪU 10C ĐÃ SCAN" giả dựng đúng khuôn file giao ban: sheet Tong hop + Danh sach kiem tra, dòng tiêu đề, "Cập nhật: dd/mm/yyyy").
//   Ý: nhận loại ds10c theo nội dung, ngày theo "Cập nhật" · chưa nạp → bảng tổ không có cột (như cũ) · nạp → cột "10C mới" sau CCCD: Đã scan (n bản) / Thiếu, dòng Cộng ·
//   bấm ô 2 bản → hộp chọn từng bản (link Drive), không chọn dòng tổ · lọc cột · bản in có cột · ma trận món chuẩn có trường · nạp bản mới hơn → dùng bản mới.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path'), G=path.resolve(__dirname,'..');
(async()=>{ const b=await chromium.launch(); const o=[], loi=[]; const ok=(t,d,c)=>o.push((d?'✓ ':'✗ ')+t+(c!==undefined&&!d?' — '+c:''));
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const p = await (await b.newContext({viewport:{width:1366, height:800}})).newPage(); p.on('pageerror', e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+G+'/index.html'); await p.waitForTimeout(1500);
 const w = t=>p.waitForTimeout(t);
 await p.evaluate(async(files)=>{ await xongTV; D.cauHinh.daXemMoi = CO_GI_MOI.ban; try{dongHop()}catch(e){} window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const s=atob(f.b), u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky) try{ await slGhi(kq); }catch(e){} }
   kyChungDoi('2026-08'); dhSL('tra'); const w = t=>new Promise(r=>setTimeout(r, t)); for(let i=0;i<60 && !TC_K;i++) await w(200);
   const c = [...document.querySelectorAll('.tc-theo [data-lenh], .tc-theo button, .tc-theo .chip')].find(x=>/Tổ trưởng/.test(x.textContent) && x.offsetParent); c && c.click(); await w(800); }, files);
 const bang = ()=>p.evaluate(()=>{ const t = document.querySelector('table.tc-to-ds'); if(!t) return null; const th = [...t.querySelectorAll('thead tr:first-child th')].map(x=>x.textContent.trim());
   const j = th.indexOf('10C mới'); const dong = [...t.querySelectorAll('tbody tr[data-to]')].map(r=>({ma:r.getAttribute('data-to'), v:j>=0 ? r.cells[j].textContent.trim() : null, an:r.hidden}));
   return {th, j, dong, cong:j>=0 ? t.querySelector('tfoot tr').cells[t.querySelector('tfoot tr').cells.length-1].textContent.trim() : ''}; });
 let r = await bang();
 ok('chưa nạp DS 10C → bảng tổ không có cột 10C mới (như cũ)', r && r.dong.length>3 && r.j<0, JSON.stringify(r && r.th));
 const ma = r.dong.map(x=>x.ma);
 /* dựng file DS 10C giả: tổ 1 = 2 bản, tổ 2 = 1 bản, tổ 3 = Chưa; còn lại không có trong DS */
 const nap = async (ngay, ds)=>p.evaluate(async([ngay, ds])=>{ const wb = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['DANH SÁCH KIỂM TRA MẪU 10C ĐÃ SCAN – TỔ TK&VV GIẢ'], ['Cập nhật: '+ngay+'. Nhận diện file scan theo mã tổ 7 số trong tên file.'], ['Điểm GD', 'Tổng số tổ', '10C cũ đã scan', '10C cũ còn thiếu', '10C mới đã scan', '10C mới còn thiếu'], ['GL', 3, 0, 3, 2, 1]]), 'Tong hop');
   XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['STT', 'Xã/phường', 'Điểm GD', 'Ấp/khu phố', 'Hội (sau sắp xếp)', 'Mã tổ', 'Tổ trưởng', 'Số TV 30/09', 'Sắp xếp QĐ 70', 'Tên file chuẩn (gợi ý)', '10C cũ đã scan', 'File 10C cũ', '10C mới đã scan', 'File 10C mới', 'Trang 2 ký sẵn', 'Ghi chú', 'Cần lưu ý']].concat(ds)), 'Danh sach kiem tra');
   const u = new Uint8Array(XLSX.write(wb, {type:'array', bookType:'xlsx'})); const kq = await slDocFile(new File([u], 'Danh_sach_kiem_tra_10C_da_scan.xlsx'));
   const r = {loi:kq.loi||'', loai:kq.loai, ky:kq.ky, n:(kq.rows||[]).length}; if(!kq.loi) await slGhi(kq); M10C.ds = null; slTraTim(); await new Promise(z=>setTimeout(z, 900)); return r; }, [ngay, ds]);
 const dong = (i, m, co, f, sx)=>[i, 'Xã giả', 'GL', 'Ấp giả', 'HND', m, 'TỔ GIẢ', 40, sx, '10C_GL_Ap_HND_'+m+'-ToGia.pdf', 'Chưa', '', co, f, '', '', ''];
 r = await nap('21/11/2026', [dong(1, ma[0], 'Có', '10C_GL_Ap_HND_'+ma[0]+'-ToGia.pdf; 10C_GL_Ap_HND_'+ma[0]+'-ToGia_2.pdf', 'Nhận bàn giao'), dong(2, ma[1], 'Có', '10C_GL_Ap_HND_'+ma[1]+'-ToGia.pdf', 'Giữ nguyên'), dong(3, ma[2], 'Chưa', '', 'Giải thể')]);
 ok('nhận file theo nội dung → loại ds10c, ngày "Cập nhật" 21/11/2026, đủ 3 tổ', !r.loi && r.loai==='ds10c' && /^2026-11-21/.test(r.ky) && r.n===3, JSON.stringify(r));
 r = await bang();
 const v = m=>(r.dong.find(x=>x.ma===m)||{}).v;
 ok('cột "10C mới" ngay sau CCCD: 2 bản / 1 bản / Thiếu; tổ không có trong DS → Thiếu', r.j>=0 && r.th[r.j-1]==='CCCD' && /^Đã scan \(2 bản\)$/.test(v(ma[0])) && v(ma[1])==='Đã scan' && v(ma[2])==='Thiếu' && v(ma[3])==='Thiếu', JSON.stringify({th:r.th, a:v(ma[0]), b:v(ma[1]), c:v(ma[2]), d:v(ma[3])}));
 ok('dòng Cộng = số tổ đã scan / tổng', r.cong==='2/'+r.dong.length, r.cong);
 /* 3.568 (anh 27/11 "nạp rồi mà vẫn không thấy cột"): cột phải THẤY ĐƯỢC — trước CSS chỉ chia 7 cột, cột 10C mới rộng 0 px */
 r = await p.evaluate(()=>{ const t = document.querySelector('table.tc-to-ds'), th = [...t.querySelectorAll('thead tr:first-child th')], rows = [...t.querySelectorAll('tbody tr[data-to]')].slice(0, 8);
   return {lop:t.classList.contains('co10c'), w:th.map(h=>Math.round(h.getBoundingClientRect().width)), cat:th.map((h, j)=>rows.filter(x=>x.cells[j] && x.cells[j].scrollWidth>x.cells[j].clientWidth+1).length), tong:Math.round(t.getBoundingClientRect().width), khung:Math.round(t.parentElement.clientWidth)}; });
 ok('cột 10C mới THẤY ĐƯỢC: 8 cột chia đủ khung (mỗi cột ≥ 28 px, 10C mới ≥ 50 px), không cột nào bị cắt chữ, bảng không tràn khung', r.lop && r.w.length===8 && r.w.every(x=>x>=28) && r.w[7]>=50 && r.cat.every(x=>x===0) && r.tong<=r.khung+1, JSON.stringify(r));
 /* bấm ô 2 bản */
 r = await p.evaluate(async(m)=>{ const tr = document.querySelector('table.tc-to-ds tbody tr[data-to="'+m+'"]'), j = [...document.querySelectorAll('table.tc-to-ds thead tr:first-child th')].findIndex(x=>x.textContent.trim()==='10C mới');
   const chon = typeof TC_BANG!=='undefined' ? TC_BANG.chon : null; tr.cells[j].querySelector('[data-lenh="m10c.mo"]').click(); await new Promise(z=>setTimeout(z, 300));
   const h = document.getElementById('hop'), a = [...h.querySelectorAll('a[href]')].map(x=>x.getAttribute('href')); const kq = {mo:h.classList.contains('hien'), n:a.length, a, chonGiu:typeof TC_BANG==='undefined' || TC_BANG.chon===chon, tab:[...h.querySelectorAll('a')].every(x=>x.target==='_blank')}; try{dongHop()}catch(e){} return kq; }, ma[0]);
 ok('bấm ô 2 bản → hộp chọn từng bản (mở Drive, tab mới), không chọn dòng tổ', r.mo && r.n===2 && r.a.every(x=>/^https:\/\/drive\.google\.com\/drive\/search\?q=/.test(x)) && /ToGia_2\.pdf/.test(decodeURIComponent(r.a[1])) && r.tab && r.chonGiu, JSON.stringify(r).slice(0, 300));
 /* lọc cột */
 r = await p.evaluate(async()=>{ const t = document.querySelector('table.tc-to-ds'), j = [...t.querySelectorAll('thead tr:first-child th')].findIndex(x=>x.textContent.trim()==='10C mới'), s = t.querySelector('thead select[data-bl="'+j+'"]');
   s.value = 'Thiếu'; s.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(z=>setTimeout(z, 200)); const hien = [...t.querySelectorAll('tbody tr[data-to]')].filter(x=>!x.hidden).map(x=>x.cells[j].textContent.trim());
   s.value = ''; s.dispatchEvent(new Event('change', {bubbles:true})); return {n:hien.length, het:hien.every(x=>x==='Thiếu')}; });
 ok('lọc cột 10C mới = Thiếu → chỉ còn tổ thiếu', r.n>0 && r.het, JSON.stringify(r));
 /* bản in + ma trận */
 r = await p.evaluate(()=>{ const ds = TCIN.dsHien(), g = {d:TCIN.dl(ds, TC_K), pv:'giả', ky:'08/2026'}, h = TCIN.html(g);
   const c = MCH.ctx(TC_K), y = MCH.TRUONG.find(f=>f.k==='mc_10c'); return {in:/<td class="c b">10C mới<\/td>/.test(h) && /2\/\d+<\/td>/.test(h), mch:!!y && y.lay(c, {mato:ds[0].ma})!=null && BT_COT.to.some(x=>x.k==='mc_10c')}; });
 ok('🖨 In DS tổ có cột 10C mới + tổng; ma trận món chuẩn / 🧩 có trường "10C mới (tổ)"', r.in && r.mch, JSON.stringify(r));
 /* nạp bản mới hơn → dùng bản mới */
 r = await nap('24/11/2026', [dong(1, ma[0], 'Có', '10C_GL_Ap_HND_'+ma[0]+'-ToGia.pdf', 'Nhận bàn giao'), dong(2, ma[1], 'Có', '10C_GL_Ap_HND_'+ma[1]+'-ToGia.pdf', 'Giữ nguyên'), dong(3, ma[2], 'Có', '10C_GL_Ap_HND_'+ma[2]+'-ToGia.pdf', 'Giải thể')]);
 r = await bang();
 ok('nạp DS 10C ngày mới hơn → bảng dùng bản mới (3/n, tổ 1 còn 1 bản)', r.cong==='3/'+r.dong.length && v(ma[0])==='Đã scan' && v(ma[2])==='Đã scan', JSON.stringify({cong:r.cong, a:v(ma[0])}));
 o.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = o.filter(x=>x.startsWith('✗')).length + (loi.length ? 1 : 0); console.log(sai ? '✗ '+sai+' sai' : '✓ t417 đạt hết');
 await b.close(); process.exit(sai ? 1 : 0);
})();
