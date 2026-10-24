// 3.357 (KE_HOACH_CHOT_SO đợt C1) — Sổ tổ viên / chốt sổ 31/12: nút ở tab Tổ TK&VV, dòng = tổ viên tvChuan (Mẫu 31 + bù Mẫu 01/TV cùng tháng), kỳ tháng 12 → tiêu đề chốt 31/12, chip Gồm, hỏi trước khi xóa ô tháng 12 (Mẫu 31 / 01/TV). Bộ GIẢ tests/gianho31 + dòng 01/TV giả.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const kq = await slDocFile(new File([u], f.n)); if(!kq.loi && kq.ky){ try{ await slGhi(kq); }catch(e){} } }
   kyChungDoi('2026-08'); slDoiTab('to'); doiNgan(7); for(let i=0;i<120 && !(KHO.kyDung() && document.getElementById('to-cay'));i++) await w(250); await w(600);
   ok('3.357 tab Tổ TK&VV có nút 👁 Sổ tổ viên', !!document.querySelector('.to-dau [data-lenh="dk.mo"][data-ma="sotv"]'));
   const K = KHO.kyDung(); D.cauHinh.dkChon = {};
   const tos = KHO.dsToKy(K).map(t=>tvChuan(t, K)).filter(Boolean), tong = tos.reduce((a, r)=>a+r.ds.length, 0);
   let L = dkLap('sotv');
   ok('3.357 số dòng = tổng tổ viên tvChuan các tổ (toàn PGD)', L.kq.dong.length===tong && tong>0, L.kq.dong.length+'/'+tong);
   ok('3.357 dòng có trạng thái + nguồn Mẫu 31, kỳ 08 không phải sổ chốt', L.kq.dong.every(x=>!!x.tt && x.nguon==='Mẫu 31') && L.kq.tieuDe==='Danh sách tổ viên Tổ TK&VV');
   ok('3.357 chưa có 01/TV cùng tháng → ghi chú cảnh báo', /Chưa có Mẫu 01\/TV cùng tháng/.test(L.kq.ghi));
   /* kỳ tháng 12 + 01/TV giả có khách tất nợ năm trước (chỉ còn TK 105) */
   const t0 = KHO.dsToKy(K).find(t=>tvChuan(t, K)), B2 = Object.assign({}, K.B, {co:Object.assign({}, K.B.co, {tv01:[{kh:'9900000077', to:t0.ma, ten:'Khách Giả Tất Nợ Năm Trước', dn:0, t105:150000}]}), nguon:Object.assign({}, K.B.nguon||{}, {tv01:'2026-12'})});
   const K12 = Object.assign(Object.create(Object.getPrototypeOf(K)), K, {ky:'2026-12', B:B2, _khMat:null});
   const dk = DK_DS.sotv, ctx = {K:K12, B:B2, S:{}, pv:'Toàn PGD', chon:{gom:['no', 'lai', '105', 'ra'], nhom:'to'}, ngay:'2026-12-31'}, kq = dk.du(ctx);
   const gia = kq.dong.find(x=>x.kh==='9900000077');
   ok('3.357 kỳ 12: tiêu đề "Sổ tổ viên Tổ TK&VV — chốt 31/12/2026"', kq.tieuDe==='Sổ tổ viên Tổ TK&VV — chốt 31/12/2026', kq.tieuDe);
   ok('3.357 khách chỉ có ở 01/TV (tất nợ, còn TK 105) vào sổ: nguồn 01/TV, trạng thái Tất nợ · còn TK 105', !!gia && gia.nguon==='01/TV' && gia.tt==='Tất nợ · còn TK 105' && gia.t105===150000, JSON.stringify(gia||{}).slice(0, 120));
   ok('3.357 ghi chú: đã đối chiếu 01/TV, bù 1 khách', /Đã đối chiếu Mẫu 01\/TV .*bù 1 khách/.test(kq.ghi), kq.ghi.slice(0, 90));
   ok('3.357 bản in: tiêu đề chốt + logo + A4 dọc', (h=>/SỔ TỔ VIÊN|Sổ tổ viên Tổ TK&amp;VV — chốt 31\/12\/2026/.test(h) && /size:A4 portrait/.test(h) && /NGÂN HÀNG CHÍNH SÁCH XÃ HỘI/.test(h))(dkHTML(dk, kq, ctx)));
   /* chip Gồm: bỏ Còn nợ */
   dkMo('sotv'); await w(400); document.querySelector('[data-lenh="dk.chon"][data-k="gom"][data-v="no"]').click(); await w(400);
   L = dkLap('sotv');
   ok('3.357 chip Gồm bỏ "Còn nợ" → không còn dòng Còn nợ', L.kq.dong.length>0 ? !L.kq.dong.some(x=>x.tt==='Còn nợ') : true, L.kq.dong.length);
   dongHop();
   /* ngày tất nợ */
   { const r105 = (dk.du({K:K, B:K.B, S:{}, chon:{gom:['105'], nhom:''}, ngay:''}).dong);
     ok('3.357 tổ viên tất nợ (Mẫu 31) có ngày tất nợ từ món đã tất toán', !r105.length || r105.some(x=>/^\d{2}\/\d{2}\/\d{4}$/.test(x.tat)), r105.length+' dòng'); }
   { const Kg = {B:{theoKH:{X1:[{ku:'1', ct:'01', dn:0, ngdg:'2026-05-03'}, {ku:'2', ct:'02', dn:0, ngdg:'2026-07-09'}], X2:[{ku:'3', ct:'01', dn:5e6, ngdg:'2026-08-01'}, {ku:'4', ct:'02', dn:0, ngdg:'2026-06-01'}]}}};
     const a1 = stvMon(Kg, 'X1'), a2 = stvMon(Kg, 'X2');
     ok('3.357 ngày tất nợ = ngày GD gần nhất của món đã tất toán; còn món nợ → không ghi', a1.tat==='2026-07-09' && a2.tat==='' && a1.ct.split(', ').length===2, JSON.stringify([a1, a2])); }
   /* bảo vệ ô tháng 12 */
   ok('3.357 slSoChot: Mẫu 31 / 01/TV tháng 12 = ô sổ chốt; tháng khác / loại khác không', slSoChot('hstd', '2026-12') && slSoChot('tv01', '2025-12') && !slSoChot('hstd', '2026-11') && !slSoChot('nqh', '2026-12') && !slSoChot('hstd', '2026-12-15'));
   SLM.bang['hstd|2026-12'] = {loai:'hstd', ky:'2026-12'}; slXoa('hstd', '2026-12'); await w(200);
   ok('3.357 xóa ô Mẫu 31 tháng 12 → hỏi trước (chưa xóa)', /chốt sổ tổ viên 31\/12/.test(document.getElementById('hop').textContent) && !!SLM.bang['hstd|2026-12']);
   dongHop(); delete SLM.bang['hstd|2026-12'];
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t300 đạt'); await b.close(); process.exit(sai?1:0);
})();
