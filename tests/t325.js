// 3.405 (Tèo — KE_HOACH_KY_DOI_CHIEU mục 3): file đối chiếu DOI_CHIEU_APP_<ngày>.csv — đúng hợp đồng cột với giao ban (17 cột), dòng "#" ghi chú,
//   1 dòng 1 tổ + "TT|<mã thôn>" món vay trực tiếp, tổng dư nợ / quá hạn / khoanh = Mẫu 31; lưu Drive Số liệu/<tháng>/ (Drive giả); nút ở ⋯ Nạp & KT; 🧹 không coi là rác.
//   Bộ GIẢ tests/gianho31.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch(); const loi=[];
 const p=await b.newPage({viewport:{width:1366,height:900}}); p.on('pageerror',e=>loi.push(e.message));
 await p.route(/accounts\.google|apis\.google/, r=>r.abort()); await require('./tv.js')(p);
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')); await p.waitForTimeout(1500);
 const dir = path.join(__dirname,'gianho31'); const files = fs.readdirSync(dir).filter(n=>/31-08-2026\.XLSX$/.test(n)).map(n=>({n, b:fs.readFileSync(path.join(dir,n)).toString('base64')}));
 const R = await p.evaluate(async(files)=>{ await xongTV; try{dongHop()}catch(e){} const o=[], w=t=>new Promise(r=>setTimeout(r,t));
   const ok = (ten, dk, chi) => o.push((dk ? '✓ ' : '✗ ')+ten+(chi!==undefined ? ' — '+chi : ''));
   window.SL_KHONG_TU_KIEM = 1;
   for(const f of files){ const bin=atob(f.b), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); const k = await slDocFile(new File([u], f.n)); if(!k.loi && k.ky) await slGhi(k); }
   SL_BO = {}; TO_KS = {}; const K = await toNap('2026-08');
   const csv = slDCCsv(K), L = csv.replace(/\r\n$/, '').split('\r\n');
   ok('BOM + dòng 1 "#" ghi chú (bên APP, bản, ngày số liệu, K1/K5/K7)', csv.charCodeAt(0)===0xFEFF && /^﻿# bên=APP/.test(L[0]) && /bản=/.test(L[0]) && /ngày số liệu=2026-08-31/.test(L[0]) && /K1=QT-18/.test(L[0]) && /K7=/.test(L[0]), L[0].slice(0, 120));
   ok('3.525: dòng 1 ghi giờ xuất + File Tổ trưởng đã dùng (tên, ngày) hoặc "không có"', /xuất lúc=\d\d\/\d\d\/\d{4} \d\d:\d\d/.test(L[0]) && /File Tổ trưởng=(.+\(ngày \d\d\/\d\d\/\d{4}\)|không có)/.test(L[0]), (L[0].match(/xuất lúc=.*?ngày số liệu/)||[''])[0]);
   ok('dòng 2 = 17 cột đúng hợp đồng', L[1]==='khoa,ma_xa,ma_ap,ma_diem,hoi,so_tv,so_tv_du_no,du_no,nqh,khoanh,lai_ton,tien_gui,cho_vay,thu_no,so_mon_khd,so_mon_lech_ap,so_mon_den_han_thang_toi', L[1]);
   const rows = L.slice(2).map(l=>l.split(',')), to = rows.filter(r=>!/^TT\|/.test(r[0])), tt = rows.filter(r=>/^TT\|/.test(r[0]));
   const soTo = Object.keys(K.to).filter(m=>!K.to[m].trucTiep).length;
   ok('mỗi tổ 1 dòng (đủ số tổ của cây), mỗi dòng 17 ô', to.length===soTo && rows.every(r=>r.length===17), to.length+'/'+soTo);
   ok('Hội ghi HND / HPN / HCCB / ĐTN; dòng trực tiếp hoi = TT, khoa "TT|<mã thôn>"', to.every(r=>/^(HND|HPN|HCCB|ĐTN)$/.test(r[4]) || r[4]==='') && tt.every(r=>r[4]==='TT' && /^TT\|\d*$/.test(r[0])), JSON.stringify(tt.slice(0,2)));
   const cong = c => rows.reduce((a, r)=>a+(+r[c]||0), 0), T = slTong('hstd', K.hs, K.lap);
   const dnM = K.hs.filter(x=>x.ku && x.to!==TO_GIA).reduce((a, x)=>a+(x.dn||0), 0), qhM = K.hs.filter(x=>x.ku && x.to!==TO_GIA).reduce((a, x)=>a+(x.qh||0), 0);
   ok('tổng du_no file = tổng dư nợ Mẫu 31 (mỗi khế ước 1 lần)', Math.abs(cong(7)-Math.round(dnM))<=rows.length, cong(7)+' / '+Math.round(dnM));
   ok('tổng nqh file = tổng quá hạn Mẫu 31', Math.abs(cong(8)-Math.round(qhM))<=rows.length, cong(8)+' / '+Math.round(qhM));
   ok('3.540 (anh chốt 15/11 "mã điểm phải ghi đầy đủ TXN"): mã điểm ghi đủ mã hệ thống (không cắt 4 số)', rows.some(r=>/^TXN/.test(r[3])) || rows.every(r=>r[3]===''), JSON.stringify(rows.map(r=>r[3]).slice(0,3)));
   ok('3.540: slDCDiem giữ nguyên mã — TXN0543502 → TXN0543502, bỏ khoảng trắng thừa', slDCDiem('TXN0543502')==='TXN0543502' && slDCDiem(' TXN0548202 ')==='TXN0548202' && slDCDiem('')==='');
   ok('3.538 (khuôn 1.0 mục 5.2): dòng vay trực tiếp so_tv = số khách còn dư nợ (= so_tv_du_no)', tt.every(r=>r[5]===r[6]), JSON.stringify(tt.filter(r=>r[5]!==r[6]).slice(0,2)));
   ok('tiền đồng nguyên (không số lẻ)', rows.every(r=>[7,8,9,10,11,12,13].every(c=>/^-?\d+$/.test(r[c]))));
   /* 3.539 File 2 — danh sách món (khuôn 1.1 mục 3) */
   const c2 = slDCMonCsv(K), M = c2.replace(/\r\n$/, '').split('\r\n'), mr = M.slice(2).map(l=>l.split(','));
   ok('3.539 File 2: BOM + dòng 1 "#" (khuôn 1.1, ngày số liệu, đếm nhóm, không ghi họ tên)', c2.charCodeAt(0)===0xFEFF && /^\ufeff# bên=APP/.test(M[0]) && /khuôn=1\.1/.test(M[0]) && /ngày số liệu=2026-08-31/.test(M[0]) && /không ghi họ tên/.test(M[0]), M[0].slice(0,160));
   ok('3.539 File 2: dòng 2 = 19 cột đúng thứ tự khuôn', M[1]==='so_ku,ma_kh,khoa,hoi,ma_ap,ma_diem,chuong_trinh,du_no,nqh,khoanh,lai_ton,la_nqh,la_khoanh,la_khd,la_den_han,ngay_chuyen_qh,ngay_den_han,ngay_het_khoanh,so_thang_lai', M[1]);
   const ten = new Set(K.hs.map(x=>x.ten).filter(Boolean));
   ok('3.539 File 2: mỗi dòng 19 ô, mỗi khế ước 1 lần, mỗi món thuộc ≥ 1 nhóm, không có họ tên khách', mr.length>0 && mr.every(r=>r.length===19) && new Set(mr.map(r=>r[0])).size===mr.length && mr.every(r=>[11,12,13,14].some(c=>r[c]==='1')) && !mr.some(r=>r.some(v=>ten.has(v))), mr.length+' dòng');
   const dem = c=>mr.filter(r=>r[c]==='1').length, toR = rows.filter(r=>!/^TT\|/.test(r[0]) || true);
   ok('3.539 File 2: số món KHĐ / đến hạn tháng tới = tổng cột File 1 (so_mon_khd, so_mon_den_han_thang_toi)', dem(13)===cong(14) && dem(14)===cong(16), [dem(13), cong(14), dem(14), cong(16)].join('/'));
   const qhM2 = new Set(K.hs.filter(x=>x.ku && (x.qh||0)>0).map(x=>x.ku)).size;
   ok('3.539 File 2: số món quá hạn = số khế ước có dư nợ quá hạn trên Mẫu 31; món quá hạn có ngày chuyển QH dd/mm/yyyy hoặc trống', dem(11)===qhM2 && mr.filter(r=>r[11]==='1').every(r=>r[15]==='' || /^\d\d\/\d\d\/\d{4}$/.test(r[15])), dem(11)+'/'+qhM2);
   const f1m = {}; rows.forEach(r=>f1m[r[0]] = r);
   ok('3.539 File 2: hoi / ma_ap / ma_diem theo dòng tổ ở File 1', mr.every(r=>!f1m[r[2]] || (r[3]===f1m[r[2]][4] && r[4]===f1m[r[2]][2] && r[5]===f1m[r[2]][3])), JSON.stringify(mr.find(r=>f1m[r[2]] && r[3]!==f1m[r[2]][4])||''));
   ok('3.540 slDCMonThangLai (khuôn 1.1, như giao ban): 30 tr × 6% → 450.000 = "3.0"; lãi suất 0 → tháng lịch từ ngày GD (02/07 → 31/08 = "1.0"; 31/07 → 31/08 = "1.0"; 15/06 → 10/08 = "1.0"); không ngày GD → trống; không lãi → 0',
     slDCMonThangLai({lt:450000, dn:30e6, ls:6}, '2026-08-31')==='3.0' && slDCMonThangLai({lt:100000, dn:30e6, ls:0, ngdg:'2026-07-02'}, '2026-08-31')==='1.0' && slDCMonThangLai({lt:100000, dn:0, ls:6, ngdg:'2026-07-31'}, '2026-08-31')==='1.0'
     && slDCMonThangLai({lt:1, dn:0, ls:0, ngdg:'2026-06-15'}, '2026-08-10')==='1.0' && slDCMonThangLai({lt:1, dn:0, ls:0}, '2026-08-31')==='' && slDCMonThangLai({lt:0, dn:30e6, ls:6}, '2026-08-31')===0);
   /* lưu Drive giả */
   const ghi = []; window.coTheNoiDrive = ()=>true; DR.sanSang = true; window.baoDamDuong = d=>Promise.resolve('tm:'+d); window.timFileTrong = ()=>Promise.resolve(null);
   window.slGhiBlob = (ten, idTM, blob, cuId)=>{ ghi.push({ten, idTM}); return Promise.resolve({id:'x'}); };
   slDCXuat('2026-08'); for(let i=0;i<40 && ghi.length<2;i++) await w(150);
   ok('lưu Drive: Số liệu/2026-08/DOI_CHIEU_APP_2026-08-31.csv + 3.539 DOI_CHIEU_MON_APP_2026-08-31.csv cùng thư mục', ghi.length===2 && ghi[0].ten==='DOI_CHIEU_APP_2026-08-31.csv' && ghi[1].ten==='DOI_CHIEU_MON_APP_2026-08-31.csv' && ghi.every(g=>/\/Số liệu\/2026-08$/.test(g.idTM)), JSON.stringify(ghi));
   slNapThem('2026-08'); await w(200);
   ok('⋯ Nạp & KT có nút 📤 File đối chiếu giao ban', !!document.querySelector('[data-lenh="sldc.xuat"][data-ky="2026-08"]')); dongHop();
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
