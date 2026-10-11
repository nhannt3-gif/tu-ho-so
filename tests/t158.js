// 3.163 (anh chốt 11/10) — Nạp & KT: dải lịch ●◐○ + ⦿ Gần nhất, cột từng ngày có dữ liệu (mới nhất bên phải) + cột chốt tháng, ⇔ Tổng quan, ▾ Thu gọn ↔ ▴ Bung ra,
//   bỏ dòng vàng trạng thái · Tab Tổ: cột vừa nội dung, cột Tự động tự hiện khi còn chỗ (không tràn ngang), ⚙ Cột 3 chế độ, In đầy đủ / Excel đủ cột ·
//   chip báo số liệu cuối hàng Xã · chip tổ kèm ấp · tiền triệu đồng 2 số lẻ. Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:800}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   const tep = n => { const f = files.find(x=>x.n===n), bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return new File([u], n); };
   for(const f of files){ const kq = await slDocFile(tep(f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   const k9 = await slDocFile(tep(files.find(f=>/31-08-2026/.test(f.n)).n)); k9.ky='2026-09-07'; k9.ngay='2026-09-07'; await slGhi(k9);
   /* ---- Nạp & KT ---- */
   D.cauHinh.slMt=''; moNapSL(); await w(600);
   const nut = [...document.querySelectorAll('.sl-thanh-nap button')].map(x=>x.textContent.trim()).join('|');
   ok('dải lịch 6 tháng có dấu ●◐○ + ⦿ Gần nhất; bỏ nút "2 tháng"', /(T\d+[●◐○]\|){6}/.test(nut) && /⦿ Gần nhất/.test(nut) && !/2 tháng/.test(nut), nut);
   ok('⦿ Gần nhất mặc định: mở tab → tháng có số liệu mới nhất (T9 vì có Mẫu 31 ngày 07/09)', SL_KY==='2026-09', SL_KY);
   const th = [...document.querySelectorAll('.sl-bang thead th')].map(x=>x.textContent.trim());
   ok('cột: chốt T8 · ngày 07/09/2026 · chốt T9 (mới nhất bên phải, ghi đủ ngày/tháng/năm)', /31\/08\/2026.*T8 · chốt/.test(th[1]) && th.some(x=>x==='07/09/2026') && /30\/09\/2026.*T9 · chốt/.test(th[th.length-1]), th.join(' | '));
   ok('bỏ dòng vàng trạng thái tháng (trạng thái ở rê chuột dải lịch)', !document.querySelector('#tr7 .sl-tt-1') && /T9\/2026/.test(document.querySelector('.sl-dai .sl-dl.bat').title));
   slTongQuan(); await w(300);
   const thq = [...document.querySelectorAll('.sl-bang thead th')].filter(x=>/\d{4}/.test(x.textContent));
   ok('⇔ Tổng quan: chỉ cột chốt tháng', thq.length>=2 && thq.every(x=>/chốt/.test(x.textContent)), thq.length);
   slTongQuan(); slThuGon(); await w(300);
   ok('▾ Thu gọn → 1 dòng, nút thành ▴ Bung ra; bấm lại mở bảng', !document.querySelector('#tr7 .sl-bang') && /Bung ra/.test(document.querySelector('.sl-thanh-nap').textContent));
   slThuGon(); await w(300); ok('▴ Bung ra → có bảng', !!document.querySelector('#tr7 .sl-bang'));
   ok('tên báo cáo ngắn trong ma trận (bỏ phần " · …" mô tả)', slTenNgan({ten:'Mẫu 31 · Hồ sơ tín dụng chi tiết'})==='Mẫu 31');
   /* ---- số ---- */
   ok('tiền triệu đồng luôn 2 số lẻ (3.679,00), 0 để trống', soTr(3679000000)==='3.679,00' && soTr(0)==='' && soTrDau(-1600000)==='−1,60');
   ok('tên ấp ngắn cho chip tổ: bỏ "Ấp"/"KP" khi là chữ, giữ khi là số', pvApNgan('Ấp Thuận An')==='Thuận An' && pvApNgan('Ấp 1')==='ấp 1' && pvApNgan('KP 2')==='KP 2' && pvApNgan('Khu phố Lộc Khê')==='Lộc Khê' && pvApNgan('3')==='ấp 3');
   /* ---- Tổ ---- */
   kyChungDoi('2026-08'); const C = toCH(); C.xa=''; C.diem=''; C.hoi=''; C.to=''; TO_LOC_PV='bang'; delete D.cauHinh.toCot; delete D.cauHinh.toCotKH; slDoiTab('to'); doiNgan(7);
   for(let i=0;i<60 && !document.querySelector('#to-the .to-bang');i++) await w(250); await w(1200);
   pvChon('to', 'xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(1800);
   const khung = () => document.querySelector('#to-the .to-cuon-khung');
   ok('bảng các tổ: không tràn ngang, đã tự thêm cột Tự động theo ưu tiên (Số món vay đầu tiên)', khung().scrollWidth<=khung().clientWidth+1 && (TO_TU_HIEN.bang||[])[0]==='mon', khung().scrollWidth+'/'+khung().clientWidth+' · '+(TO_TU_HIEN.bang||[]).join(','));
   ok('cột thêm mới của bảng tổ có trong danh mục: Nợ lãi · Món ĐH tháng sau · CCCD hết/sắp hết · chưa có TK 105', ['lt','dhs','cch','ctk'].every(m=>TO_COT.some(c=>c[0]===m && !c[2])));
   toCotHop(); await w(100); const sel = document.querySelector('#hop-in .to-cot-ds select');
   ok('⚙ Cột: mỗi cột 3 lựa chọn Tự động / Luôn hiện / Ẩn', !!sel && [...sel.options].map(x=>x.textContent).join('|')==='Tự động|Luôn hiện|Ẩn'); dongHop();
   D.cauHinh.toCot = {hoi:false}; toVeThe(); await w(800);
   ok('dữ liệu cũ (false = ẩn) vẫn đọc được: cột Hội ẩn', ![...document.querySelectorAll('#to-the .to-bang thead th')].some(x=>x.textContent==='Hội')); delete D.cauHinh.toCot;
   pvChon('to', 'hoi', pvLuaChon(TO_K.to, C, 'hoi', true)[0].k, 1); await w(1500);
   const chipTo = document.querySelector('[data-cap="to"] .to-chip');
   ok('chip tổ kèm tên ấp chữ nhỏ + rê chuột "Tổ … · Ấp … · mã … · n tổ viên"', !!chipTo && !!chipTo.querySelector('.pv-ap') && !/Ấp Thôn/.test(chipTo.title) && pvApNgan('Thôn 01')==='thôn 01' && /· mã \d+ · \d+ tổ viên/.test(chipTo.title), chipTo && chipTo.title);
   TO_LOC_PV='tat'; toVeThe(); await w(1200);
   ok('danh sách khách: không tràn ngang, cột Tự động đầu tiên = Ngày vay gần nhất', khung().scrollWidth<=khung().clientWidth+1 && (TO_TU_HIEN.ds||[])[0]==='nvm', (TO_TU_HIEN.ds||[]).join(','));
   ok('danh sách khách: nút In danh sách · In đầy đủ · Excel · ⚙ Cột', /In danh sách.*In đầy đủ.*Excel.*Cột/.test(document.querySelector('#to-the .to-bang-nut').textContent));
   let html=''; const ib = inBlob; window.inBlob = async bl => { html = await bl.text(); };
   toInDuDS(1); await w(200); const cin = (html.match(/<thead><tr>(.*?)<\/tr><\/thead>/)||['',''])[1];
   ok('In đầy đủ danh sách: A4 ngang, các cột đang hiện (kể cả cột Tự động đang hiện)', /class="trang ngang"/.test(html) && /Ngày vay gần nhất/.test(cin), cin.replace(/<[^>]+>/g,'|').replace(/\|+/g,'|').slice(0, 160));
   window.inBlob = ib;
   const x = toBCDSPV(C);
   ok('Excel danh sách: đủ cột (thêm Ngày vay gần nhất · Ngày đến hạn · Ấp · Ngày sinh · Số món · QH / khoanh)', ['Ngày vay gần nhất','Ngày đến hạn','Hạn CCCD (ngày)','Ấp','Ngày sinh','Số món','QH / khoanh'].every(h=>x.aoa[0].includes(h)) && x.aoa.every(r=>r.length===x.aoa[0].length));
   /* ---- chip báo số liệu ---- */
   kyChungDoi('2026-09'); TO_LOC_PV='bang'; await w(300); toVeThe(); await w(1500);
   const chip = document.querySelector('.pv-chip-o .sl-chip');
   ok('chip "⚠ Dùng T8/2026" cuối hàng Xã (trước 📍), rê chuột đủ câu; bỏ dòng vàng riêng', !!chip && /⚠ Dùng T8\/2026/.test(chip.textContent) && /chưa có số liệu cho tab này/.test(chip.title) && chip.closest('.pv-hang1') && !document.querySelector('#tr7 .ky-ghi'), chip && chip.textContent);
   ok('ô kỳ đầu trang có ⚠ khi tháng chọn chưa có số liệu cho tab', !!document.querySelector('#ky-chung .ky-canh'));
   chip.click(); await w(500);
   ok('bấm chip → mở 📥 Nạp & KT đúng tháng T9', D.cauHinh.slTab==='nap' && SL_KY==='2026-09', D.cauHinh.slTab+' '+SL_KY);
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
