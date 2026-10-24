// 3.358 (KE_HOACH_CHOT_SO đợt C2) — năm sau dùng sổ chốt 31/12: khách TƯ còn giữ (01/TV) mà Mẫu 31 năm nay không còn → tra sổ chốt tháng 12 năm trước (ngày tất nợ, CT), sổ tổ viên ghi "Tất nợ <năm> · còn TK 105", đối chiếu 01/TV ghi lý do đã biết. Bộ GIẢ tests/gianho31 + dòng 01/TV / sổ chốt giả.
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
   kyChungDoi('2026-08'); slDoiTab('to'); doiNgan(7); for(let i=0;i<120 && !(KHO.kyDung() && document.getElementById('to-cay'));i++) await w(250); await w(500);
   const K = KHO.kyDung(), t0 = KHO.dsToKy(K).find(t=>tvChuan(t, K));
   /* 1. chưa có Mẫu 31 tháng 12 năm trước → sổ = null, không lỗi */
   const m0 = await stvChotNap(2025);
   ok('3.358 chưa có Mẫu 31 tháng 12/2025 → không có sổ chốt (null), không lỗi', m0===null && STV_CHOT[2025]===null);
   /* 2. dựng sổ chốt thật từ 1 bộ số liệu (giả lập tháng 12 = bộ 08/2026) */
   const gocNap = KHO.nap; KHO.nap = function(k){ return gocNap(k==='2024-12' ? '2026-08' : k); }; SLM.bang['hstd|2024-12'] = {loai:'hstd', ky:'2024-12'};
   const m1 = await stvChotNap(2024); KHO.nap = gocNap; delete SLM.bang['hstd|2024-12'];
   const khong = KHO.dsToKy(K).map(t=>tvChuan(t, K)).filter(Boolean).reduce((a, r)=>a+r.ds.filter(x=>!(x.dn>0)).length, 0);
   ok('3.358 dựng sổ chốt từ bộ số liệu tháng 12: mỗi tổ viên dư nợ 0 có 1 mục (tổ, ngày tất nợ, CT)', !!m1 && Object.keys(m1).length===khong, Object.keys(m1||{}).length+'/'+khong);
   /* 3. năm sau: khách chỉ có ở 01/TV + có trong sổ chốt năm trước */
   STV_CHOT[2025] = {'9900000077':{to:t0.ma, ten:'Khách Giả', tat:'2025-11-15', ct:'HN, HSSV', t105:150000}, '9900000078':{to:t0.ma, ten:'Khách Giả 2', tat:'2025-06-02', ct:'NSVSMT', t105:0}};
   const B2 = Object.assign({}, K.B, {_tv:null, co:Object.assign({}, K.B.co, {tv01:[{kh:'9900000077', to:t0.ma, ten:'Khách Giả', dn:0, t105:150000}, {kh:'9900000078', to:t0.ma, ten:'Khách Giả 2', dn:0, t105:0}, {kh:'9900000079', to:t0.ma, ten:'Khách Lạ', dn:0, t105:5000}]}), nguon:Object.assign({}, K.B.nguon||{}, {tv01:'2026-01'})});
   const K1 = Object.assign(Object.create(Object.getPrototypeOf(K)), K, {ky:'2026-01', B:B2, _khMat:null});
   const r = tvChuan(t0, K1), x77 = r.ds.find(x=>x.kh==='9900000077'), x79 = r.ds.find(x=>x.kh==='9900000079');
   ok('3.358 tvChuan: khách bù theo 01/TV gắn sổ chốt năm trước (khách lạ không có → null)', !!x77 && x77.chot && x77.chot.tat==='2025-11-15' && !!x79 && x79.chot===null);
   const dk = DK_DS.sotv, kq = dk.du({K:K1, B:B2, S:{}, chon:{gom:['no', 'lai', '105', 'ra'], nhom:'to'}, ngay:'2026-01-31'}), d77 = kq.dong.find(x=>x.kh==='9900000077'), d79 = kq.dong.find(x=>x.kh==='9900000079');
   ok('3.358 sổ tổ viên: "Tất nợ 2025 · còn TK 105", ngày tất nợ + CT từ sổ chốt, nguồn "01/TV · sổ 2025"', !!d77 && d77.tt==='Tất nợ 2025 · còn TK 105' && d77.tat==='15/11/2025' && d77.ct==='HN, HSSV' && d77.nguon==='01/TV · sổ 2025', JSON.stringify(d77||{}).slice(0, 160));
   ok('3.358 khách 01/TV không có trong sổ chốt → giữ như cũ (Tất nợ · còn TK 105, nguồn 01/TV)', !!d79 && d79.tt==='Tất nợ · còn TK 105' && d79.nguon==='01/TV');
   /* 4. đối chiếu 01/TV */
   const dc = tvDoiChieu(Object.assign(B2, {_tv:null, ky:'2026-01'}));
   const ra78 = dc.ra.find(x=>x.kh==='9900000078');
   ok('3.358 đối chiếu: đếm khách "TƯ có, Mẫu 31 không" có trong sổ chốt năm trước', dc.namTruoc===2 && dc.thieu.length>=3, dc.namTruoc+' / '+dc.thieu.length);
   ok('3.358 cần cho ra (TG 0): lý do ghi "Tất nợ 2025 (02/06/2025) · NSVSMT (sổ chốt 31/12)"', !!ra78 && /Tất nợ 2025 \(02\/06\/2025\) · NSVSMT \(sổ chốt 31\/12\)/.test(ra78.ly), ra78 && ra78.ly);
   { const dong = []; tvKiem(B2, function(){ dong.push([].slice.call(arguments)); });
     ok('3.358 Kiểm tra số liệu: dòng thành viên tổ ghi "N khách tất nợ năm trước, có trong sổ chốt 31/12"', dong.some(d=>/2 khách tất nợ năm trước, có trong sổ chốt 31\/12/.test(d[3]))); }
   /* 5. stvHen: không có số liệu năm trước → không nạp, không lỗi */
   delete STV_CHOT[2023]; stvHen({ky:'2024-03'}); await w(100);
   ok('3.358 stvHen không có Mẫu 31 tháng 12 năm trước → bỏ qua', STV_CHOT[2023]===undefined && !STV_DANG[2023]);
   delete STV_CHOT[2025]; delete STV_CHOT[2024];
   return o; }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,3).join(' | '));
 const sai = R.filter(x=>x[0]==='✗').length+loi.length; console.log(sai ? '✗ '+sai+' sai' : '✓ t301 đạt'); await b.close(); process.exit(sai?1:0);
})();
