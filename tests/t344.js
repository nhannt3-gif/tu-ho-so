// 3.424 (GIAO_BAN_KY_NANG — TK 1 bàn giao 31/10): 📐 bộ số chuẩn (js/87) — chỉ tiêu so_lieu_tong_hop theo điểm × Hội + trực tiếp, kiểm tầng A,
//   CSV dạng dài ky,diem,hoi,chi_tieu,gia_tri (như tools/dap_an_giao_ban.py), so với file đáp án (sai số 0,05). Bộ GIẢ gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const TEO = JSON.parse(fs.readFileSync(path.join(__dirname,'chung','truong_hop_mau.json'),'utf-8')), C21 = TEO.truong_hop.find(c=>c.id==='C21-1');
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async([files, C21, BO])=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; const K = await toNap('2026-08'); const B = bcTinh(K, null), ds = Object.keys(B.diem);
   const dnM = K.hs.filter(x=>x.ku).reduce((a, x)=>a+(x.dn||0), 0);
   const congDn = ds.reduce((a, d)=>a+Object.keys(B.diem[d].so).reduce((s, h)=>s+B.diem[d].so[h].du_no, 0), 0);
   ok('có điểm, khóa không dấu (vd GiaLoc2, không kèm ngày GD), Hội HND/HPN/HCCB/DTN/TT', ds.length>0 && ds.every(d=>/^[A-Za-z0-9]+$/.test(B.diem[d].khoa) && !/Ngay/.test(B.diem[d].khoa)) && ds.every(d=>Object.keys(B.diem[d].so).every(h=>/^(HND|HPN|HCCB|DTN|TT)$/.test(h))), ds.map(d=>B.diem[d].khoa).join(','));
   ok('Σ dư nợ mọi điểm × Hội = Σ dư nợ Mẫu 31 (triệu, 1 lần / khế ước)', Math.abs(congDn - dnM/1e6)<0.01, congDn.toFixed(3)+' / '+(dnM/1e6).toFixed(3));
   ok('kiểm tầng A: mọi dòng Đạt (không lặp dòng trên bộ giả)', B.kiem.length>0 && B.kiem.every(r=>r[2]==='Đạt'), JSON.stringify(B.kiem.filter(r=>r[2]!=='Đạt')));
   const x = B.diem[ds[0]].so.HND || B.diem[ds[0]].so[Object.keys(B.diem[ds[0]].so)[0]];
   ok('so_ho = so_kh_du_no + so_kh_tat_no_con_tg (anh chốt 28/10)', x.so_ho===x.so_kh_du_no+x.so_kh_tat_no_con_tg, JSON.stringify(x));
   ok('không có kỳ trước → không có du_no_truoc / tăng giảm', x.du_no_truoc===undefined && x.du_no_tang===undefined);
   const csv = bcCsv(B), L = csv.replace(/^﻿/, '').trim().split('\r\n');
   ok('CSV dạng dài: tiêu đề ky,diem,hoi,chi_tieu,gia_tri; kỳ dd/mm/yyyy; có CONG + danh sách', L[0]==='ky,diem,hoi,chi_tieu,gia_tri' && /^31\/08\/2026,/.test(L[1]) && L.some(l=>/,CONG,du_no,/.test(l)) && L.some(l=>/,,nqh_list\.tong,/.test(l)), L[1]);
   let kq = bcSo(B, csv);
   ok('so với chính CSV của app → khớp hết', kq.so>0 && kq.dat===kq.so && !kq.lech.length, kq.dat+'/'+kq.so);
   const L2 = L.slice(); const i = L2.findIndex(l=>/,du_no,\d/.test(l) && !/,CONG,/.test(l)); const c = L2[i].split(','); c[4] = String(+c[4]+1); L2[i] = c.join(',');
   kq = bcSo(B, L2.join('\r\n'));
   ok('đáp án lệch 1 số (1 triệu) → báo đúng 1 lệch', kq.lech.length===1 && kq.lech[0][2]==='du_no', JSON.stringify(kq.lech));
   ok('file sai dạng → báo lỗi', !!bcSo(B, 'a,b,c\n1,2,3').loi);
   /* nút 📐 cạnh 📤 File đối chiếu giao ban, mở hộp */
   const h = slDCNut('2026-08'); ok('nút 📐 Bộ số chuẩn cạnh 📤 File đối chiếu giao ban', /bc\.mo/.test(h) && /File đối chiếu/.test(h));
   bcMo('2026-08'); for(let j=0;j<40 && !document.querySelector('.bc-bang');j++) await w(100);
   { const hoi = []; const g = KHO.coBang; KHO.coBang = function(l, k){ if(l==='hstd') hoi.push(k); return g.apply(this, arguments); }; dongHop(); bcMo('2026-08'); await w(1500); KHO.coBang = g; dongHop();
     ok('3.425: kỳ so sánh của nút 📐 = cuối THÁNG TRƯỚC 2026-07 (3.424 lấy nhầm tháng sau — kyLui(kỳ, n) cộng n tháng)', hoi.indexOf('2026-07')>=0 && hoi.indexOf('2026-09')<0, hoi.join(',')); }
   ok('mở hộp 📐: bảng chỉ tiêu × Hội + kiểm tầng A + nút CSV / So đáp án', !!document.querySelector('.bc-bang') && /Kiểm tầng A/.test(document.getElementById('hop-in').textContent) && !!document.querySelector('[data-lenh="bc.so"]'));
   /* có kỳ trước — dữ liệu giả C21-1 (truong_hop_mau, TK 1): tổ cũ đóng, tổ viên sang tổ mới cùng ấp */
   dongHop(); const vn = s => { const m = String(s||'').match(/^(\d\d)\/(\d\d)\/(\d{4})$/); return m ? m[3]+'-'+m[2]+'-'+m[1] : ''; };
   const nap = async(aoa, ten) => { const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'BCQUERY'); const k = await slDocFile(new File([XLSX.write(wb, {type:'array', bookType:'xlsx'})], ten)); if(!k.loi && k.ky) await slGhi(k); return k; };
   const m31 = async(ds, ngay, ten) => { const d = ds.map(x=>{ const z = Object.assign({}, BO.mac_dinh_mau31, x, {'Ngày số liệu':ngay}); if(z['Sổ tiết kiệm 105']) z['Sổ tiết kiệm 105'] = '1050000001'; return z; });   /* app nhận số sổ 10 chữ số */ const cot = []; d.forEach(x=>Object.keys(x).forEach(c=>{ if(cot.indexOf(c)<0) cot.push(c); }));
     return nap([['31 - Tạo hồ sơ tín dụng chi tiết theo kỳ số liệu'], [], cot].concat(d.map(x=>cot.map(c=>x[c]===undefined ? '' : x[c]))), ten); };
   await m31(C21.ky_truoc.mau31, C21.ky_truoc.ngay, 'mau31 truoc.xlsx'); await m31(C21.mau31, BO.ngay_so_lieu, 'mau31 nay.xlsx');
   const CT = ['NGAYBC','MADGD','TENDGD','MADP','TENXA','TENTHON','DVUT','TENDVUT','MATO','MATT','TENTT','CMT','NGAYCAP','MOBILE','NGAYSINHTT','SOTV','DUNO','TK104','MATP','TENTP','MOBILETP'];
   await nap([['DANH SÁCH TỔ TIẾT KIỆM VÀ VAY VỐN'], [''], CT].concat(C21.to_truong.map(x=>{ const z = Object.assign({}, BO.mac_dinh_to_truong, x, {NGAYBC:BO.ngay_so_lieu, TENXA:BO.mac_dinh_mau31['Tên xã']}); return CT.map(c=>z[c]===undefined ? '' : z[c]); })), 'baocao_'+vn(BO.ngay_so_lieu).replace(/-/g,'')+'_000000.xlsx');
   SL_BO = {}; TO_KS = {}; const kn = slThang(vn(BO.ngay_so_lieu)), Kp = await toNap(slThang(vn(C21.ky_truoc.ngay))), K2 = await toNap(kn), B2 = bcTinh(K2, Kp);
   const D2 = B2.diem[Object.keys(B2.diem).find(d=>B2.diem[d].so.HPN)], y = D2 && D2.so.HPN;
   ok('kỳ trước theo QT-C-21: Hội HPN tổ mới nhận cả khế ước tổ đóng — du_no_truoc 60, du_no 58, tăng −2 (triệu)', y && y.du_no_truoc===60 && y.du_no===58 && y.du_no_tang===-2, JSON.stringify(y));
   ok('tiền gửi kỳ trước theo sổ: tien_gui_tang = 1,2 − 1,0', y && Math.abs(y.tien_gui_tang-0.2)<1e-9, y && y.tien_gui_tang);
   ok('số tổ kỳ trước = số tổ thật, theo điểm hiện nay (HPN 1)', y && y.so_to_truoc===1, y && y.so_to_truoc);
   ok('tầng A: đầu kỳ + cho vay − thu nợ = cuối kỳ (60 + 0 − 2 = 58) → không báo lệch', !B2.kiem.some(r=>/đầu kỳ/.test(r[1])), JSON.stringify(B2.kiem.filter(r=>r[2]!=='Đạt')));
   return o; }, [files, C21, {mac_dinh_mau31:TEO.mac_dinh_mau31, mac_dinh_to_truong:TEO.mac_dinh_to_truong, ngay_so_lieu:TEO.ngay_so_lieu}]);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
