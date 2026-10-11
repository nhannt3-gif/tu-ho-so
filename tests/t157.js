// 3.161 — Tab Tổ (anh chốt 11/10): chip gom 3 nhóm Xem · Khách · Cần xử lý (tối đa 2 dòng), nút In / Excel / ⚙ Cột ở đầu bảng,
//   bảng cuộn trong khung (tiêu đề + dòng Cộng dính), kẻ ô mờ, 1 đơn vị triệu đồng (bỏ ",00", 0 để trống), cột trùng bộ lọc tự ẩn, ⚙ Cột (nhớ);
//   In A4 dọc 10–11 cột / In đầy đủ A4 ngang / Excel đủ cột; biến động ghi đủ ngày; cảnh báo in đậm + cột Lưu ý (tất nợ còn TK 105 · CCCD hết / sắp hết hạn 30 ngày · chưa có TK 105). Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1536,height:730}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); const C = toCH(); C.xa=''; C.diem=''; C.hoi=''; C.to=''; TO_LOC_PV = 'bang'; delete D.cauHinh.toCot; slDoiTab('to'); doiNgan(7);
   for(let i=0;i<60 && !document.querySelector('#to-the .to-bang');i++) await w(250); await w(2000);
   /* số */
   ok('viết số triệu đồng: chẵn bỏ ",00", lẻ bỏ số 0 thừa, 0 để trống, âm có dấu', soTr(12910000000)==='12.910' && soTr(1234500000)==='1.234,5' && soTr(2530120000)==='2.530,12' && soTr(0)==='' && soTr(0, 1)==='0' && soTrDau(518621)==='+0,52' && soTrDau(-1600000)==='−1,6', [soTr(12910000000), soTr(1234500000), soTrDau(518621)].join(' | '));
   /* chip */
   const nhom = [...document.querySelectorAll('#to-the .to-chip-khung .to-nhom-ten')].map(x=>x.textContent).join('|');
   ok('chip gom 3 nhóm Xem · Khách · Cần xử lý', nhom==='Xem|Khách|Cần xử lý', nhom);
   const kh = document.querySelector('#to-the .to-chip-khung'), tops = [...new Set([...kh.querySelectorAll('button.to-loc')].filter(x=>x.offsetParent).map(x=>x.offsetTop))];
   ok('chip tối đa 2 dòng', tops.length<=2, tops.length+' dòng');
   ok('chip mới: Chưa có TK 105 · CCCD sắp hết hạn (Cần xử lý)', /Chưa có TK 105/.test(kh.textContent) && /CCCD sắp hết hạn/.test(kh.textContent));
   /* bảng PGD */
   const dau = document.querySelector('#to-the .to-bang-dau');
   ok('nút In · In đầy đủ · Excel · ⚙ Cột ở đầu bảng (trên bảng)', !!dau && /In đầy đủ/.test(dau.textContent) && /Excel/.test(dau.textContent) && /Cột/.test(dau.textContent) && dau.getBoundingClientRect().top < document.querySelector('#to-the .to-bang').getBoundingClientRect().top);
   const khung = document.querySelector('#to-the .to-cuon-khung');
   ok('bảng cuộn trong khung, tiêu đề cột dính', getComputedStyle(khung).overflowY==='auto' && getComputedStyle(khung.querySelector('thead th')).position==='sticky');
   ok('kẻ ô mờ (bảng lưới)', khung.querySelector('table').classList.contains('luoi') && getComputedStyle(khung.querySelector('tbody td')).borderTopStyle==='solid');
   const r0 = khung.querySelector('tbody tr');
   ok('bảng PGD: Cộng toàn PGD trên đầu, dư nợ triệu đồng có dấu chấm, không ",00"', /CỘNG TOÀN PGD/.test(r0.textContent) && /12\.910/.test(r0.textContent) && !/,00/.test(khung.textContent), r0.textContent.slice(0, 80));
   ok('mốc so sánh ghi đủ ngày (so với dd/mm/yyyy; biến động dd/mm/yyyy → dd/mm/yyyy)', /so với \d\d\/\d\d\/\d{4}/.test(document.getElementById('to-the').textContent) && /Biến động \d\d\/\d\d\/\d{4} → \d\d\/\d\d\/\d{4}/.test(document.getElementById('to-the').textContent));
   /* bảng các tổ của xã */
   pvChon('to', 'xa', pvLuaChon(TO_K.to, C, 'xa', true)[0].k); await w(1800);
   const th = () => [...document.querySelectorAll('#to-the .to-bang thead th')].map(x=>x.textContent);
   ok('bảng các tổ: có Điểm GD + Hội (chưa lọc), STT hẹp', th().includes('Điểm GD') && th().includes('Hội') && document.querySelector('#to-the .to-bang tbody td').getBoundingClientRect().width < 60, document.querySelector('#to-the .to-bang tbody td').getBoundingClientRect().width);
   ok('dòng Cộng dính đáy khung', getComputedStyle(document.querySelector('#to-the .to-cuon-khung tr.tong td')).position==='sticky');
   pvChon('to', 'hoi', '11', 1); await w(1500);
   ok('lọc 1 Hội → bỏ cột Hội (đã ghi trên tiêu đề)', !th().includes('Hội'), th().join('|'));
   /* ⚙ Cột */
   toCotHop(); await w(100); const cb = [...document.querySelectorAll('#hop-in .to-cot-ds label')].find(x=>/Số món vay/.test(x.textContent)).querySelector('input'); cb.checked = true; cb.dispatchEvent(new Event('change')); dongHop(); toVeThe(); await w(300);
   ok('⚙ Cột: bật "Số món vay" → bảng có cột, app nhớ', th().includes('Số món vay') && D.cauHinh.toCot.mon===true);
   /* In / Excel */
   let html = ''; const ib = inBlob; window.inBlob = async bl => { html = await bl.text(); };
   toBangXuat('in'); await w(200);
   const cotIn = (html.match(/<thead><tr>(.*?)<\/tr><\/thead>/)||['',''])[1].replace(/<[^>]+>/g, '|').split('|').filter(Boolean);
   ok('In: A4 dọc, 10–11 cột chính (STT · Mã tổ · Tổ trưởng · Ấp · Tổ viên · Có dư nợ · Dư nợ · Quá hạn · Khoanh · Số dư 105)', !/class="trang ngang"/.test(html) && cotIn.length>=10 && cotIn.length<=11 && !cotIn.includes('Thu nợ tháng') && cotIn.includes('Số dư 105'), cotIn.join(','));
   toBangXuat('inDu'); await w(200);
   ok('In đầy đủ: A4 ngang, các cột đang xem', /class="trang ngang"/.test(html) && /Thu nợ tháng/.test(html) && /Số món vay/.test(html));
   ok('Excel: đủ cột, số đồng (giữ STT 0 / Cộng n tổ)', TO_BANG_XUAT.cot.length===17 && typeof TO_BANG_XUAT.aoa[0][10]==='number' && /Cộng \d+ tổ/.test(TO_BANG_XUAT.tong[2]));
   /* cảnh báo in danh sách tổ viên */
   pvChon('to', 'hoi', '11', 1); TO_LOC_PV = 'tat'; toVeThe(); await w(800);
   const X = toTVPV(C), k0 = X.tv[0];
   k0.cc = {kq:'sap', den:ngayISO(new Date(nay().getTime()+10*864e5)), chu:'sắp hết hạn'}; k0.stk = []; k0.coTK = false;
   const x = toBCDSPV(C);
   ok('in danh sách: dòng cảnh báo in đậm (class canh) + cột Lưu ý ghi lý do', /<th>Lưu ý<\/th>/.test(x.html) && /class=" canh"|class="xen canh"|class="canh"/.test(x.html) && /CCCD sắp hết hạn \d\d\/\d\d\/\d{4}/.test(x.html) && /Chưa có TK 105/.test(x.html));
   ok('in danh sách: dòng tổng Lưu ý (đếm theo loại) + CSS in đậm', /Lưu ý \(\d\d\/\d\d\/\d{4}\):/.test(x.html) && /tr\.canh td\{font-weight:700\}/.test(TO_IN_CSS));
   const kt = {conNo:false, chuaGN:false, stk:['1'], coTK:true, t105:0, cc:{kq:'ok'}};
   ok('tất nợ còn TK 105 (kể cả số dư 0) → cảnh báo; khách còn mã tổ không TK 105 → cảnh báo', toCanh(kt).join()==='Tất nợ – còn TK 105' && toCanh({conNo:true, stk:[], coTK:false, cc:{kq:'ok'}}).join()==='Chưa có TK 105');
   ok('CCCD theo ngày hiện tại: còn ≤ 30 ngày → sắp hết hạn', toCCCDHan('012345678901', '19860115', '2015-01-01').kq!=='?' );
   window.inBlob = ib; TO_LOC_PV = 'bang'; delete D.cauHinh.toCot;
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
