// 3.405 (Tèo — TEO_KE_HOACH_KY_3110 mục 3): file đối chiếu DOI_CHIEU_APP_<ngày>.csv — đúng hợp đồng cột với giao ban (17 cột), dòng "#" ghi chú,
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
   ok('dòng 2 = 17 cột đúng hợp đồng', L[1]==='khoa,ma_xa,ma_ap,ma_diem,hoi,so_tv,so_tv_du_no,du_no,nqh,khoanh,lai_ton,tien_gui,cho_vay,thu_no,so_mon_khd,so_mon_lech_ap,so_mon_den_han_thang_toi', L[1]);
   const rows = L.slice(2).map(l=>l.split(',')), to = rows.filter(r=>!/^TT\|/.test(r[0])), tt = rows.filter(r=>/^TT\|/.test(r[0]));
   const soTo = Object.keys(K.to).filter(m=>!K.to[m].trucTiep).length;
   ok('mỗi tổ 1 dòng (đủ số tổ của cây), mỗi dòng 17 ô', to.length===soTo && rows.every(r=>r.length===17), to.length+'/'+soTo);
   ok('Hội ghi HND / HPN / HCCB / ĐTN; dòng trực tiếp hoi = TT, khoa "TT|<mã thôn>"', to.every(r=>/^(HND|HPN|HCCB|ĐTN)$/.test(r[4]) || r[4]==='') && tt.every(r=>r[4]==='TT' && /^TT\|\d*$/.test(r[0])), JSON.stringify(tt.slice(0,2)));
   const cong = c => rows.reduce((a, r)=>a+(+r[c]||0), 0), T = slTong('hstd', K.hs, K.lap);
   const dnM = K.hs.filter(x=>x.ku && x.to!==TO_GIA).reduce((a, x)=>a+(x.dn||0), 0), qhM = K.hs.filter(x=>x.ku && x.to!==TO_GIA).reduce((a, x)=>a+(x.qh||0), 0);
   ok('tổng du_no file = tổng dư nợ Mẫu 31 (mỗi khế ước 1 lần)', Math.abs(cong(7)-Math.round(dnM))<=rows.length, cong(7)+' / '+Math.round(dnM));
   ok('tổng nqh file = tổng quá hạn Mẫu 31', Math.abs(cong(8)-Math.round(qhM))<=rows.length, cong(8)+' / '+Math.round(qhM));
   ok('tiền đồng nguyên (không số lẻ)', rows.every(r=>[7,8,9,10,11,12,13].every(c=>/^-?\d+$/.test(r[c]))));
   /* lưu Drive giả */
   const ghi = []; window.coTheNoiDrive = ()=>true; DR.sanSang = true; window.baoDamDuong = d=>Promise.resolve('tm:'+d); window.timFileTrong = ()=>Promise.resolve(null);
   window.slGhiBlob = (ten, idTM, blob, cuId)=>{ ghi.push({ten, idTM}); return Promise.resolve({id:'x'}); };
   slDCXuat('2026-08'); for(let i=0;i<40 && !ghi.length;i++) await w(150);
   ok('lưu Drive: Số liệu/2026-08/DOI_CHIEU_APP_2026-08-31.csv', ghi.length===1 && ghi[0].ten==='DOI_CHIEU_APP_2026-08-31.csv' && /\/Số liệu\/2026-08$/.test(ghi[0].idTM), JSON.stringify(ghi));
   slNapThem('2026-08'); await w(200);
   ok('⋯ Nạp & KT có nút 📤 File đối chiếu Tèo', !!document.querySelector('[data-lenh="sldc.xuat"][data-ky="2026-08"]')); dongHop();
   return o;
 }, files);
 R.forEach(x=>console.log(x)); if(loi.length) console.log('LỖI TRANG:', loi.slice(0,5));
 const sai = R.filter(x=>x[0]==='✗').length; console.log((R.length-sai)+'/'+R.length+' đạt'); await b.close(); process.exit(sai||loi.length ? 1 : 0);
})();
